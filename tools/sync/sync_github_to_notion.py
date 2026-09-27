#!/usr/bin/env python3
"""
GitHub -> Notion Tasks mirror (GitHub issues are the single source of truth).

  python3 sync_github_to_notion.py            # dry-run: plan + drift report (default)
  python3 sync_github_to_notion.py --apply    # write to Notion (needs NOTION_TOKEN)
  python3 sync_github_to_notion.py --json out.json   # also dump the plan

Reads:  gh CLI (uses GH_AGENCY_TOKEN if set, else the current gh login).
Writes: Notion REST API with NOTION_TOKEN (internal integration secret).
Rules (deterministic, idempotent, never deletes/archives anything):
  * key = Notion "GitHub issue" URL == issue URL
  * scope = issues in config repos that carry >=1 agency label, open or closed within lookback
  * sets Title, Status, Priority, Due, Type, Assignee, Client; blank GitHub values never wipe Notion
  * never touches Notes, "Verified by Hope", "Scope (legacy)"
  * trainee (Business/Marketing) issues closed on GitHub but not "Verified by Hope" are flagged
"""
import argparse, datetime as dt, json, os, subprocess, sys, urllib.request, urllib.error

HERE = os.path.dirname(os.path.abspath(__file__))
CFG = json.load(open(os.path.join(HERE, "config.json")))
NOTION = "https://api.notion.com/v1"

GQL = """query($owner:String!,$name:String!,$cursor:String){repository(owner:$owner,name:$name){
 issues(first:50,after:$cursor,states:[OPEN,CLOSED],orderBy:{field:UPDATED_AT,direction:DESC}){
  pageInfo{hasNextPage endCursor}
  nodes{number title url state closedAt updatedAt milestone{title dueOn}
   labels(first:30){nodes{name}}
   projectItems(first:10){nodes{project{number title}
    fieldValues(first:30){nodes{__typename
     ... on ProjectV2ItemFieldSingleSelectValue{name field{... on ProjectV2FieldCommon{name}}}
     ... on ProjectV2ItemFieldDateValue{date field{... on ProjectV2FieldCommon{name}}}
     ... on ProjectV2ItemFieldTextValue{text field{... on ProjectV2FieldCommon{name}}}}}}}}}}}"""


GQL_NO_PROJECTS = """query($owner:String!,$name:String!,$cursor:String){repository(owner:$owner,name:$name){
 issues(first:50,after:$cursor,states:[OPEN,CLOSED],orderBy:{field:UPDATED_AT,direction:DESC}){
  pageInfo{hasNextPage endCursor}
  nodes{number title url state closedAt updatedAt milestone{title dueOn} labels(first:30){nodes{name}}}}}}"""
AUTH = "current gh login"
USE_PROJECTS = True


def gh_env():
    """Token precedence: GH_AGENCY_PROJECT_TOKEN (classic, read:project+repo; needed because
    fine-grained PATs cannot read user-owned Projects) > GH_AGENCY_TOKEN (fine-grained) > gh login."""
    global AUTH
    env = dict(os.environ)
    for k in ("GH_AGENCY_PROJECT_TOKEN", "GH_AGENCY_TOKEN"):
        if env.get(k):
            env["GH_TOKEN"], AUTH = env[k], k
            break
    return env


def gh_graphql(variables):
    global USE_PROJECTS
    env = gh_env()
    args = ["gh", "api", "graphql", "-f", "query=" + (GQL if USE_PROJECTS else GQL_NO_PROJECTS)]
    for k, v in variables.items():
        if v is not None:
            args += ["-f", f"{k}={v}"]
    out = subprocess.run(args, capture_output=True, text=True, env=env)
    if out.returncode != 0 and USE_PROJECTS:
        print("WARN: project fields unreadable with this token (" + out.stderr.strip()[:160] +
              ") -> continuing without Priority/Due/Status from boards. Set GH_AGENCY_PROJECT_TOKEN.")
        USE_PROJECTS = False
        return gh_graphql(variables)
    if out.returncode != 0:
        sys.exit("gh failed: " + out.stderr.strip())
    return json.loads(out.stdout)


def fetch_issues():
    cutoff = dt.datetime.now(dt.timezone.utc) - dt.timedelta(days=CFG["closed_lookback_days"])
    agency = set(CFG["agency_labels"])
    issues, ignored = [], []
    for repo in CFG["repos"]:
        cursor = None
        while True:
            d = gh_graphql({"owner": CFG["owner"], "name": repo, "cursor": cursor})["data"]["repository"]["issues"]
            for n in d["nodes"]:
                labels = [l["name"] for l in n["labels"]["nodes"]]
                if n["state"] == "CLOSED" and n["closedAt"] and \
                        dt.datetime.fromisoformat(n["closedAt"].replace("Z", "+00:00")) < cutoff:
                    continue
                if not agency.intersection(labels):
                    ignored.append(f'{repo}#{n["number"]} ({",".join(labels) or "no labels"})')
                    continue
                n["repo"], n["labels"] = repo, labels
                issues.append(n)
            if not d["pageInfo"]["hasNextPage"]:
                break
            cursor = d["pageInfo"]["endCursor"]
    return issues, ignored


def project_fields(issue):
    f = {}
    for item in issue["projectItems"]["nodes"]:
        for v in item["fieldValues"]["nodes"]:
            name = (v.get("field") or {}).get("name")
            if not name:
                continue
            val = v.get("name") or v.get("date") or v.get("text")
            if val and name not in f:
                f[name] = val
    return f


def desired(issue):
    pf, labels = (project_fields(issue) if "projectItems" in issue else {}), issue["labels"]
    if issue["state"] == "CLOSED":
        status = "Done"
    else:
        status = CFG["status_map"].get(pf.get("Status", ""), "Backlog" if pf else None)
    typ = next((t for lab, t in CFG["type_map"] if lab in labels), None)
    if "CODER" in labels:
        assignee = "AI coder"
    elif "Business/Marketing_Tasks" in labels:
        assignee = "Trainee"
    elif pf.get("Agent") in CFG["agent_map"]:
        assignee = CFG["agent_map"][pf["Agent"]]
    elif "client-waiting" in labels or "admin" in labels:
        assignee = "Hope"
    else:
        assignee = None  # keep whatever Notion has
    due = pf.get("Due")
    due_fill_only = False
    if not due and (issue.get("milestone") or {}).get("dueOn"):
        due, due_fill_only = issue["milestone"]["dueOn"][:10], True  # milestone date only fills blanks
    prio = pf.get("Priority") if pf.get("Priority") in ("High", "Medium", "Low") else None
    client = CFG["clients"].get(pf.get("Client", "")) or CFG["clients"].get(issue["repo"])
    return {"Title": issue["title"], "Status": status, "Priority": prio, "Due": due,
            "Type": typ, "Assignee": assignee, "Client": client, "_due_fill_only": due_fill_only,
            "_trainee": "Business/Marketing_Tasks" in labels, "_closed": issue["state"] == "CLOSED"}


# ---------------- Notion ----------------
def notion(method, path, body=None):
    req = urllib.request.Request(NOTION + path, method=method,
                                 data=json.dumps(body).encode() if body is not None else None,
                                 headers={"Authorization": "Bearer " + os.environ["NOTION_TOKEN"],
                                          "Notion-Version": CFG["notion"]["api_version"],
                                          "Content-Type": "application/json"})
    try:
        with urllib.request.urlopen(req) as r:
            return json.loads(r.read())
    except urllib.error.HTTPError as e:
        sys.exit(f"Notion {method} {path} -> {e.code}: {e.read().decode()[:500]}")


def notion_rows():
    rows, cursor = [], None
    while True:
        body = {"page_size": 100}
        if cursor:
            body["start_cursor"] = cursor
        d = notion("POST", f'/data_sources/{CFG["notion"]["tasks_data_source_id"]}/query', body)
        for p in d["results"]:
            pr = p["properties"]
            sel = lambda k: ((pr.get(k) or {}).get("select") or {}).get("name")
            rows.append({"id": p["id"], "url_key": (pr.get("GitHub issue") or {}).get("url"),
                         "Title": "".join(t["plain_text"] for t in pr["Title"]["title"]),
                         "Status": sel("Status"), "Priority": sel("Priority"), "Type": sel("Type"),
                         "Assignee": sel("Assignee"),
                         "Due": ((pr.get("Due") or {}).get("date") or {}).get("start"),
                         "Client": [r["id"].replace("-", "") for r in (pr.get("Client") or {}).get("relation", [])],
                         "Verified": (pr.get("Verified by Hope") or {}).get("checkbox", False)})
        if not d.get("has_more"):
            return rows
        cursor = d["next_cursor"]


def snapshot_rows():
    """Offline fallback for dry-run: last snapshot taken via the Notion connector."""
    import glob
    files = sorted(glob.glob(os.path.join(HERE, "notion_snapshot_*.json")))
    if not files:
        return None, None
    s = json.load(open(files[-1]))
    return s["rows"], os.path.basename(files[-1])


def to_props(d, url):
    p = {"Title": {"title": [{"text": {"content": d["Title"][:2000]}}]},
         "GitHub issue": {"url": url}}
    for k in ("Status", "Priority", "Type", "Assignee"):
        if d[k]:
            p[k] = {"select": {"name": d[k]}}
    if d["Due"] and not d["_due_fill_only"]:
        p["Due"] = {"date": {"start": d["Due"]}}
    if d["Client"]:
        p["Client"] = {"relation": [{"id": d["Client"]}]}
    return p


def diff(row, d):
    ch = {}
    for k in ("Title", "Status", "Priority", "Type", "Assignee", "Due"):
        if d[k] and row.get(k) != d[k]:
            if k == "Due" and d["_due_fill_only"] and row.get("Due"):
                continue
            ch[k] = (row.get(k), d[k])
    if d["Client"] and d["Client"].replace("-", "") not in (row.get("Client") or []):
        ch["Client"] = (row.get("Client"), d["Client"])
    return ch


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--apply", action="store_true")
    ap.add_argument("--json")
    a = ap.parse_args()
    token = bool(os.environ.get("NOTION_TOKEN"))
    if a.apply and not token:
        print("NOTION_TOKEN not set -> falling back to DRY-RUN. See RUNBOOK.md 'Enable live writes'.")
        a.apply = False
    issues, ignored = fetch_issues()
    want = {i["url"]: desired(i) for i in issues}

    if token:
        rows, src = notion_rows(), "live Notion API"
    else:
        rows, src = snapshot_rows()
        src = f"snapshot {src} (no NOTION_TOKEN)" if rows is not None else "none"
        rows = rows or []
    by_url = {r["url_key"]: r for r in rows if r.get("url_key")}

    creates = [u for u in want if u not in by_url]
    updates = {u: diff(by_url[u], want[u]) for u in want if u in by_url}
    updates = {u: c for u, c in updates.items() if c}
    rows_no_issue = [r.get("Title") or r["id"] for r in rows if not r.get("url_key")]
    rows_unknown = [u for u in by_url if u not in want]
    unverified = [u for u, d in want.items() if d["_trainee"] and d["_closed"]
                  and not (by_url.get(u) or {}).get("Verified")]

    print(f"== GitHub -> Notion sync ({'APPLY' if a.apply else 'DRY-RUN'}) "
          f"{dt.datetime.now().astimezone():%Y-%m-%d %H:%M %Z}")
    print(f"GitHub auth: {AUTH} (project fields: {'yes' if USE_PROJECTS else 'NO'}); "
          f"Notion rows from: {src}")
    print(f"Issues in scope: {len(want)}  | Notion rows: {len(rows)}")
    print(f"\n-- CREATE ({len(creates)}) = issues missing in Notion")
    for u in creates:
        print(f"  + {u}  {want[u]['Title']!r} [{want[u]['Status']}/{want[u]['Type']}/{want[u]['Assignee']}]")
    print(f"\n-- UPDATE ({len(updates)})" + ("" if token else "  (diffed against snapshot; re-snapshot or set NOTION_TOKEN for live)"))
    for u, c in updates.items():
        print(f"  ~ {u}  " + "; ".join(f"{k}: {o!r}->{n!r}" for k, (o, n) in c.items()))
    print(f"\n-- DRIFT: Notion rows with no GitHub issue ({len(rows_no_issue)})")
    for t in rows_no_issue:
        print("  ! " + str(t))
    print(f"-- DRIFT: Notion rows pointing at issues outside scope/closed>lookback ({len(rows_unknown)})")
    for u in rows_unknown:
        print("  ? " + u)
    print(f"-- FLAG: trainee issues closed on GitHub but not 'Verified by Hope' ({len(unverified)})")
    for u in unverified:
        print("  * " + u)
    print(f"-- Ignored (no agency label): {', '.join(ignored) or 'none'}")

    if a.apply:
        for u in creates:
            notion("POST", "/pages", {"parent": {"type": "data_source_id",
                                                 "data_source_id": CFG["notion"]["tasks_data_source_id"]},
                                      "properties": to_props(want[u], u)})
        for u in updates:
            if by_url[u].get("id") in (None, "snapshot"):
                continue
            notion("PATCH", f'/pages/{by_url[u]["id"]}', {"properties": to_props(want[u], u)})
        print(f"\nApplied: {len(creates)} created, {len(updates)} updated, 0 deleted.")
    if a.json:
        json.dump({"creates": creates, "updates": updates, "rows_no_issue": rows_no_issue,
                   "rows_unknown": rows_unknown, "unverified": unverified, "want": want},
                  open(a.json, "w"), indent=2, default=str)


if __name__ == "__main__":
    main()
