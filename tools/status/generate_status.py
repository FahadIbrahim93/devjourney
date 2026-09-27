#!/usr/bin/env python3
"""
Generate STATUS.md for the PUBLIC devjourney repo, anonymised.

  python3 tools/status/generate_status.py            # writes STATUS.md (refuses if hygiene check fails)
  python3 tools/status/generate_status.py --stdout   # preview

Inputs
  STATUS.template.md   hand-written sections (public, already anonymised). Placeholders:
                       {{UPDATED}} {{CLIENTS}} {{CLIENT_ISSUES}} {{HUB_ISSUES}} {{TRAINEE}}
  status.local.json    PRIVATE (gitignored) or $AGENCY_STATUS_LOCAL:
                       {"clients":[{"code":"Client A","slug":"client-a","repo":"<real-repo>",
                                    "tracking_issue":7,"stage":"Onboarding · Discovery"}]}
Rules: client repos are shown only as "<slug>#N" (no links: the real repo name would leak via the URL);
money, invoice numbers, bank, phone/email never appear (Notion Invoices is the source); every line is
passed through tools/public_hygiene.py scrub + check.
"""
import datetime as dt, json, os, subprocess, sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(HERE))
sys.path.insert(0, os.path.dirname(HERE))
import public_hygiene as hy  # noqa: E402

OWNER, HUB = "FahadIbrahim93", "devjourney"
LOCAL = os.environ.get("AGENCY_STATUS_LOCAL") or os.path.join(HERE, "status.local.json")
CLIENTS = json.load(open(LOCAL))["clients"] if os.path.exists(LOCAL) else []


def gh_json(*a):
    out = subprocess.run(["gh", *a], capture_output=True, text=True, check=True).stdout.strip()
    return json.loads("[" + out.replace("][", "],[") + "]") if a[0] == "api" else json.loads(out)


def issues(repo):
    pages = gh_json("api", "--paginate", f"repos/{OWNER}/{repo}/issues?state=open&per_page=100")
    return [i for p in pages for i in p if "pull_request" not in i]


def labels(i):
    return ", ".join(l["name"] for l in i["labels"])


def ms(i):
    return (i.get("milestone") or {}).get("title", "").split(" ")[0]


def build():
    hub = issues(HUB)
    link = lambda n: f"[#{n}](https://github.com/{OWNER}/{HUB}/issues/{n})"
    trainee = [i for i in hub if any(l["name"] == "Business/Marketing_Tasks" for l in i["labels"])]
    other = [i for i in hub if i not in trainee]
    T = ["| # | Task | Labels |", "|---|---|---|"] + [f"| {link(i['number'])} | {i['title']} | {labels(i)} |" for i in trainee]
    H = ["| # | Title | Labels |", "|---|---|---|"] + [f"| {link(i['number'])} | {i['title']} | {labels(i)} |" for i in other]
    C = ["| Client | Tracking issue | Repo | Stage |", "|---|---|---|---|"]
    CI = []
    for c in CLIENTS:
        C.append(f"| {c['code']} | {link(c['tracking_issue'])} | {c['slug']} (private repo) | {c.get('stage','')} |")
        rows = sorted(issues(c["repo"]), key=lambda i: (ms(i) or "Z", i["number"]))
        CI += [f"### {c['code']} ({c['slug']}, private repo; details in Notion)", "| # | Title | Labels | Milestone |", "|---|---|---|---|"]
        CI += [f"| {c['slug']}#{i['number']} | {i['title']} | {labels(i)} | {ms(i)} |" for i in rows] + [""]
    now = dt.datetime.now(dt.timezone(dt.timedelta(hours=6))).strftime("%Y-%m-%d %H:%M")
    tpl = open(os.path.join(HERE, "STATUS.template.md"), encoding="utf-8").read()
    out = (tpl.replace("{{UPDATED}}", f"{now} (Asia/Dhaka)").replace("{{CLIENTS}}", "\n".join(C))
              .replace("{{CLIENT_ISSUES}}", "\n".join(CI) or "_No client repos configured (status.local.json)._")
              .replace("{{HUB_ISSUES}}", "\n".join(H)).replace("{{TRAINEE}}", "\n".join(T)))
    return hy.scrub(out)


if __name__ == "__main__":
    text = build()
    bad = [(n, m.group(0)) for n, line in enumerate(text.splitlines(), 1) for m in hy.findings(line)]
    if "--stdout" in sys.argv:
        sys.stdout.write(text)
    if bad:
        sys.exit(f"REFUSING to write STATUS.md: {len(bad)} hygiene finding(s) on lines {sorted({n for n, _ in bad})}")
    if not hy.PRIV_DENY:
        print("WARN: private denylist not loaded; only generic rules applied", file=sys.stderr)
    if "--stdout" not in sys.argv:
        open(os.path.join(ROOT, "STATUS.md"), "w", encoding="utf-8").write(text)
        print("STATUS.md written (anonymised, hygiene check passed)")
