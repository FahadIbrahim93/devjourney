#!/usr/bin/env python3
"""Weekly summary for the Chief of Web Agency's Sunday review (PRIVATE output: box only, never committed).

  python3 tools/ops/weekly_summary.py            # prints + writes /workspace/agency/logs/weekly-YYYY-MM-DD.md

Sections: GitHub activity last 7 days (opened/closed issues, merged PRs) · due in the next 7 days + overdue
(due_check.py) · sync drift (dry-run) · Notion: task counts, trainee items awaiting "Verified by Hope",
invoices by status + outstanding · open questions for Hope.
"""
import datetime as dt, json, os, subprocess, sys, urllib.request

HERE = os.path.dirname(os.path.abspath(__file__))
TOOLS = os.path.dirname(HERE)
sys.path.insert(0, HERE)
import due_check as dc  # noqa: E402

LOGS = os.environ.get("AGENCY_LOGS", "/workspace/agency/logs")
TASKS_DS, INV_DS = "ffff5aa0-ab35-4898-bb78-d476427d6404", "06fd198a-29c8-4fa6-ae1f-f73179640575"


def notion_query(ds):
    rows, cur = [], None
    while True:
        body = {"page_size": 100, **({"start_cursor": cur} if cur else {})}
        req = urllib.request.Request(f"https://api.notion.com/v1/data_sources/{ds}/query", method="POST",
                                     data=json.dumps(body).encode(),
                                     headers={"Authorization": "Bearer " + os.environ["NOTION_TOKEN"],
                                              "Notion-Version": "2025-09-03", "Content-Type": "application/json"})
        d = json.loads(urllib.request.urlopen(req, timeout=30).read())
        rows += d["results"]
        if not d.get("has_more"):
            return rows
        cur = d["next_cursor"]


def sel(p, k):
    return ((p.get(k) or {}).get("select") or {}).get("name")


def title(p):
    for v in p.values():
        if v["type"] == "title":
            return "".join(t["plain_text"] for t in v["title"])


def main():
    dc.load_env()
    c = dc.cfg(); owner = c["owner"]
    now = dt.datetime.now(dt.timezone(dt.timedelta(hours=6)))
    since = (now - dt.timedelta(days=7)).astimezone(dt.timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")
    out = [f"# Weekly summary {now:%Y-%m-%d} (last 7 days, Asia/Dhaka)", ""]
    out.append("## GitHub activity")
    for repo in c["repos"]:
        items = [i for p in dc.gh(["api", "--paginate", f"repos/{owner}/{repo}/issues?state=all&since={since}&per_page=100"]) for i in p]
        opened = [i for i in items if i["created_at"] >= since and "pull_request" not in i]
        closed = [i for i in items if (i.get("closed_at") or "") >= since and "pull_request" not in i]
        merged = [i for i in items if "pull_request" in i and (i["pull_request"].get("merged_at") or "") >= since]
        out.append(f"- **{repo}**: {len(opened)} opened · {len(closed)} closed · {len(merged)} PRs merged")
        out += [f"  - closed #{i['number']} {i['title'][:70]}" for i in closed[:10]]
    out += ["", "## Due / overdue (next 7 days)", "```"]
    out += subprocess.run([sys.executable, os.path.join(HERE, "due_check.py"), "--days", "7"],
                          capture_output=True, text=True).stdout.strip().splitlines()
    out += ["```", "", "## Sync drift (dry-run)", "```"]
    s = subprocess.run([sys.executable, os.path.join(TOOLS, "sync", "sync_github_to_notion.py")], capture_output=True, text=True)
    out += [l for l in (s.stdout + s.stderr).splitlines() if l.startswith(("Issues", "-- CREATE", "-- UPDATE", "-- DRIFT", "-- FLAG", "WARN"))]
    out += ["```", "", "## Notion"]
    try:
        tasks = [t["properties"] for t in notion_query(TASKS_DS)]
        by = {}
        for p in tasks:
            by[sel(p, "Status") or "(none)"] = by.get(sel(p, "Status") or "(none)", 0) + 1
        out.append("- Tasks by status: " + ", ".join(f"{k} {v}" for k, v in sorted(by.items())))
        unver = [title(p) for p in tasks if sel(p, "Type") == "Business/Marketing" and sel(p, "Status") == "Done"
                 and not (p.get("Verified by Hope") or {}).get("checkbox")]
        out.append(f"- Trainee tasks Done but not Verified by Hope: {len(unver)}")
        out += [f"  - {t}" for t in unver]
        inv = [i["properties"] for i in notion_query(INV_DS)]
        ib = {}
        for p in inv:
            ib[sel(p, "Status") or "(none)"] = ib.get(sel(p, "Status") or "(none)", 0) + 1
        outstanding = sum(((p.get("Outstanding (BDT)") or {}).get("formula") or {}).get("number") or 0
                          for p in inv if sel(p, "Status") in ("Sent", "Overdue"))
        remind = [title(p) for p in inv if ((p.get("Reminder action") or {}).get("formula") or {}).get("string")]
        out.append("- Invoices by status: " + ", ".join(f"{k} {v}" for k, v in sorted(ib.items())))
        out.append(f"- Outstanding on sent/overdue invoices: BDT {outstanding:,.0f}")
        out.append(f"- Invoices needing a reminder draft: {len(remind)}" + ("".join(f"\n  - {t}" for t in remind)))
    except Exception as e:  # keep the summary useful even if Notion is down
        out.append(f"- Notion unavailable: {type(e).__name__}")
    out += ["", "## For Hope", "- Review the items above; anything blocked on a client or on money goes to Hope (drafts only; the bot sends nothing)."]
    text = "\n".join(out) + "\n"
    os.makedirs(LOGS, exist_ok=True)
    path = os.path.join(LOGS, f"weekly-{now:%Y-%m-%d}.md")
    open(path, "w").write(text)
    os.chmod(path, 0o600)
    print(text + f"(written to {path})")


if __name__ == "__main__":
    main()
