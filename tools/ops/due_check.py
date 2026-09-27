#!/usr/bin/env python3
"""Due-soon / overdue check for the daily summary (box output, not committed).

  python3 tools/ops/due_check.py [--days 3]

Looks at every open issue in the sync repos (public config + private config.local.json):
due = board "Due" field (boards listed in tools/sync/config.json "boards") > milestone due date.
Also lists open milestones that are overdue or due soon (e.g. launch M5), and Notion-only
tasks (no GitHub issue, e.g. the trainee's client-prep tasks) that are not Done (needs NOTION_TOKEN).
Issues: GH_AGENCY_TOKEN. Boards: gh login (fine-grained PATs can't read user Projects).
Exit code is always 0 (informational). Never prints tokens.
"""
import argparse, datetime as dt, json, os, subprocess, sys

HERE = os.path.dirname(os.path.abspath(__file__))
SYNC = os.path.join(os.path.dirname(HERE), "sync")
sys.path.insert(0, SYNC)


def load_env(path=os.environ.get("AGENCY_ENV", "/home/box/.agency.env")):
    try:
        for line in open(path):
            line = line.strip().removeprefix("export ")
            if "=" in line and not line.startswith("#"):
                k, v = line.split("=", 1)
                os.environ.setdefault(k.strip(), v.strip().strip("'\""))
    except FileNotFoundError:
        pass


def cfg():
    c = json.load(open(os.path.join(SYNC, "config.json")))
    loc = os.environ.get("AGENCY_SYNC_LOCAL") or os.path.join(SYNC, "config.local.json")
    if os.path.exists(loc):
        c["repos"] = list(dict.fromkeys(c["repos"] + json.load(open(loc)).get("repos", [])))
    return c


def gh(args, board=False):
    env = dict(os.environ); env.pop("GH_TOKEN", None)
    if not board and os.environ.get("GH_AGENCY_TOKEN"):
        env["GH_TOKEN"] = os.environ["GH_AGENCY_TOKEN"]
    r = subprocess.run(["gh", *args], capture_output=True, text=True, env=env)
    if r.returncode:
        raise RuntimeError(r.stderr.strip()[:160])
    out = r.stdout.strip()
    return json.loads("[" + out.replace("][", "],[") + "]") if args[0] == "api" else json.loads(out)


def notion_only(c):
    """Open Notion Tasks rows without a GitHub issue that have a Due date: [(date, line)]."""
    tok = os.environ.get("NOTION_TOKEN")
    if not tok:
        return None
    import urllib.request
    n = c.get("notion", {})
    url = f"https://api.notion.com/v1/data_sources/{n['tasks_data_source_id']}/query"
    body = {"filter": {"and": [{"property": "GitHub issue", "url": {"is_empty": True}},
                               {"property": "Due", "date": {"is_not_empty": True}},
                               {"property": "Status", "select": {"does_not_equal": "Done"}}]}, "page_size": 100}
    req = urllib.request.Request(url, data=json.dumps(body).encode(), method="POST", headers={
        "Authorization": "Bearer " + tok, "Notion-Version": n.get("api_version", "2025-09-03"),
        "Content-Type": "application/json"})
    out = []
    for r in json.load(urllib.request.urlopen(req, timeout=30))["results"]:
        pr = r["properties"]
        title = "".join(x["plain_text"] for x in pr["Title"]["title"])
        who = (pr.get("Assignee", {}).get("select") or {}).get("name", "?")
        st = (pr.get("Status", {}).get("select") or {}).get("name", "")
        d = pr["Due"]["date"]["start"][:10]
        out.append((dt.date.fromisoformat(d), f"Notion: {title[:70]} ({who}, due {d}, {st})"))
    return out


def main():
    load_env()
    ap = argparse.ArgumentParser(); ap.add_argument("--days", type=int, default=3); a = ap.parse_args()
    c = cfg(); owner = c["owner"]
    today = dt.datetime.now(dt.timezone(dt.timedelta(hours=6))).date()
    soon = today + dt.timedelta(days=a.days)
    board_due = {}
    for n in c.get("boards", []):
        try:
            for it in gh(["project", "item-list", str(n), "--owner", owner, "--format", "json", "--limit", "300"], board=True)["items"]:
                u = (it.get("content") or {}).get("url")
                if u and it.get("due"):
                    board_due[u] = (it["due"], it.get("status", ""))
        except RuntimeError as e:
            print(f"WARN: board {n} unreadable: {e}")
    over, due_soon, ms_lines = [], [], []
    for repo in c["repos"]:
        for page in gh(["api", "--paginate", f"repos/{owner}/{repo}/issues?state=open&per_page=100"]):
            for i in page:
                if "pull_request" in i:
                    continue
                d, st = board_due.get(i["html_url"], (None, ""))
                if not d and i.get("milestone") and i["milestone"].get("due_on"):
                    d = i["milestone"]["due_on"][:10]
                if not d:
                    continue
                dd = dt.date.fromisoformat(d)
                line = f"{repo}#{i['number']} {i['title'][:70]} (due {d}{', ' + st if st else ''})"
                if dd < today:
                    over.append((dd, line))
                elif dd <= soon:
                    due_soon.append((dd, line))
        for page in gh(["api", "--paginate", f"repos/{owner}/{repo}/milestones?state=open&per_page=100"]):
            for m in page:
                if m.get("due_on"):
                    dd = dt.date.fromisoformat(m["due_on"][:10])
                    if dd <= soon:
                        tag = "OVERDUE" if dd < today else "due soon"
                        ms_lines.append((dd, f"{repo} milestone {m['title']} ({tag} {dd}, {m['open_issues']} open)"))
    try:
        nrows = notion_only(c)
    except Exception as e:  # informational only; never fail the morning run on this
        print(f"WARN: Notion tasks unreadable: {type(e).__name__}"); nrows = None
    for dd, line in nrows or []:
        if dd < today:
            over.append((dd, line))
        elif dd <= soon:
            due_soon.append((dd, line))
    print(f"== Due check {today} (window {a.days} days, Asia/Dhaka)")
    print(f"-- OVERDUE ({len(over)})"); [print("  ! " + l) for _, l in sorted(over)]
    print(f"-- DUE within {a.days} days ({len(due_soon)})"); [print("  > " + l) for _, l in sorted(due_soon)]
    print(f"-- Milestones overdue/due soon ({len(ms_lines)})"); [print("  # " + l) for _, l in sorted(ms_lines)]


if __name__ == "__main__":
    main()
