#!/usr/bin/env python3
"""
Public-repo hygiene for the agency hub (devjourney is PUBLIC).

Generic rules live here (safe to publish). Client real names live ONLY in a private map:
  $AGENCY_HYGIENE_MAP  or  ./hygiene.local.json  (gitignored)   or  $HYGIENE_DENYLIST (CI secret, one regex per line)

  public_hygiene.py check [PATH ...]          # exit 1 if anything sensitive is found (default: agency paths)
  public_hygiene.py scrub < in.md > out.md    # anonymise text (used by generate_status.py)
  public_hygiene.py scrub-issues --repo OWNER/REPO [--apply]   # anonymise issue titles/bodies/comments (dry-run default)
"""
import json, os, re, subprocess, sys

HERE = os.path.dirname(os.path.abspath(__file__))
AGENCY_PATHS = ["STATUS.md", "docs", "tools", ".github", "CONTRIBUTING.md", "README.md"]
SKIP = ("docs/archive/", "docs/index.html", "docs/services/", ".min.js")
ALLOW = [r"hopetheorybd@gmail\.com", r"noreply", r"example\.com", r"you@", r"8801870489448", r"\+880 1870 489 448"]

GENERIC_REPLACE = [
    (r"\(?\b\d[\d,]*(?:\s*/\s*\d[\d,]*)+\s*BDT\)?", "(amounts in Notion)"),
    (r"\bBDT\s?\d[\d,]*(?:\.\d+)?", "(amount in Notion)"),
    (r"\b\d[\d,]*(?:\.\d+)?\s?BDT\b", "(amount in Notion)"),
    (r"৳\s?\d[\d,]*", "(amount in Notion)"),
    (r"\bHT-\d{4}-\d{3}\b", "(invoice no. in Notion)"),
    (r"\b(?:\+?880[\s-]?)?01[3-9]\d{2}[\s-]?\d{6}\b", "(phone in Notion)"),
    (r"\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b", "(email in Notion)"),
    (r"\b(?:A/C|account)\s*(?:no\.?|number)?\s*[:#]?\s*\d[\d -]{6,}\b", "(bank details in Notion)"),
]
GENERIC_DENY = [p for p, _ in GENERIC_REPLACE]


def load_private():
    reps, deny = [], []
    path = os.environ.get("AGENCY_HYGIENE_MAP") or os.path.join(HERE, "hygiene.local.json")
    if os.path.exists(path):
        m = json.load(open(path))
        reps, deny = [tuple(r) for r in m.get("replacements", [])], m.get("deny", [])
    if os.environ.get("HYGIENE_DENYLIST"):
        deny += [l.strip() for l in os.environ["HYGIENE_DENYLIST"].splitlines() if l.strip()]
    return reps, deny


PRIV_REP, PRIV_DENY = load_private()


def allowed(s):
    return any(re.search(a, s, re.I) for a in ALLOW)


def scrub(text):
    for pat, rep in PRIV_REP:
        text = re.sub(pat, rep, text, flags=re.I)
    for pat, rep in GENERIC_REPLACE:
        text = re.sub(pat, lambda m: m.group(0) if allowed(m.group(0)) else rep, text, flags=re.I)
    return text


def findings(text):
    out = []
    for pat in PRIV_DENY + GENERIC_DENY:
        for m in re.finditer(pat, text, flags=re.I):
            if not allowed(m.group(0)):
                out.append(m)
    return out


def iter_files(paths):
    for p in paths:
        if os.path.isfile(p):
            yield p
        elif os.path.isdir(p):
            for root, _, files in os.walk(p):
                for f in files:
                    yield os.path.join(root, f)


def cmd_check(paths):
    if not PRIV_DENY:
        print("WARN: no private denylist loaded (hygiene.local.json / HYGIENE_DENYLIST); checking generic rules only")
    bad = 0
    for f in iter_files(paths or AGENCY_PATHS):
        rel = os.path.relpath(f)
        if any(s in rel for s in SKIP) or rel.endswith(".local.json"):
            continue
        try:
            lines = open(f, encoding="utf-8").read().splitlines()
        except (UnicodeDecodeError, OSError):
            continue
        for i, line in enumerate(lines, 1):
            for m in findings(line):
                bad += 1
                v = m.group(0)
                print(f"{rel}:{i}: sensitive text ({v[:2]}…{len(v)} chars)")  # masked on purpose
    print(f"hygiene check: {bad} finding(s)")
    return 1 if bad else 0


def gh(*a, data=None):
    r = subprocess.run(["gh", *a], capture_output=True, text=True, input=data)
    if r.returncode:
        sys.exit(r.stderr)
    return r.stdout


def cmd_scrub_issues(repo, apply):
    pages = lambda ep: json.loads("[" + gh("api", "--paginate", ep).strip().replace("][", "],[") + "]")
    issues = [i for page in pages(f"repos/{repo}/issues?state=all&per_page=100") for i in page]
    comments = [c for page in pages(f"repos/{repo}/issues/comments?per_page=100") for c in page]
    n = 0
    for i in issues:
        t, b = i["title"], i.get("body") or ""
        t2, b2 = scrub(t), scrub(b)
        if (t, b) != (t2, b2):
            n += 1
            print(f"#{i['number']}: title {'CHANGED' if t != t2 else 'same'} -> {t2!r}; body {'CHANGED' if b != b2 else 'same'}")
            if apply:
                gh("api", "-X", "PATCH", f"repos/{repo}/issues/{i['number']}", "--input", "-",
                   data=json.dumps({"title": t2, "body": b2}))
    for c in comments:
        b2 = scrub(c["body"])
        if b2 != c["body"]:
            n += 1
            print(f"comment {c['id']} on #{c['issue_url'].rsplit('/', 1)[1]}: CHANGED")
            if apply:
                gh("api", "-X", "PATCH", f"repos/{repo}/issues/comments/{c['id']}", "--input", "-",
                   data=json.dumps({"body": b2}))
    print(f"{n} item(s) {'updated' if apply else 'would change (dry-run)'}")


if __name__ == "__main__":
    a = sys.argv[1:]
    if not a or a[0] in ("-h", "--help"):
        print(__doc__); sys.exit(0)
    if a[0] == "check":
        sys.exit(cmd_check(a[1:]))
    if a[0] == "scrub":
        sys.stdout.write(scrub(sys.stdin.read())); sys.exit(0)
    if a[0] == "scrub-issues":
        repo = a[a.index("--repo") + 1]
        cmd_scrub_issues(repo, "--apply" in a)
