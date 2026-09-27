# RUNBOOK: GitHub → Notion Tasks sync

**Rule:** GitHub issues are the single source of truth for work items. The Notion **Tasks** DB is a read-mostly mirror, keyed by its `GitHub issue` URL. Never create work in Notion first. Create the GitHub issue, then sync.

Owner: **Chief of Web Agency** bot (`7eb04faf-93d6-4168-951f-cd615510031f`). Cadence: **Sun–Thu 09:10 Dhaka** (Bangladesh workweek), plus after any batch of issue changes.

## Path A: script (preferred, deterministic)
**Morning run (Chief bot, Sun–Thu 09:10 Dhaka):** `/workspace/agency/bin/agency-daily.sh` (copy: `tools/agency-daily.sh`) = source env → token pre-flight → sync `--apply` → regenerate STATUS.md → commit only on real change → drift summary → `due_check.py --days 3`.

```bash
cd /workspace/agency/sync
python3 sync_github_to_notion.py            # dry-run: plan + drift report
python3 sync_github_to_notion.py --apply    # writes (needs NOTION_TOKEN)
```
* Reads GitHub via `gh`: issues with `GH_AGENCY_TOKEN` (else `gh` login), board fields with `GH_AGENCY_PROJECT_TOKEN` (else `gh` login). See devjourney `docs/SECURITY_TOKENS.md`.
* **Live since 27 Sep 2026.** The script sources `/home/box/.agency.env` itself (NOTION_TOKEN, GH_AGENCY_TOKEN). Issues are read with `GH_AGENCY_TOKEN`, board fields with the `gh` login (fine-grained PATs can't read user Projects). Updates send only the changed fields. Trainee (Business/Marketing_Tasks) rows are Notion-authoritative: only the title is kept in step and blanks filled; Notion-only trainee rows without a GitHub issue are not drift.
* Writes to Notion via the REST API with `NOTION_TOKEN` (version 2025-09-03, data source `ffff5aa0-ab35-4898-bb78-d476427d6404`).
* Without `NOTION_TOKEN` it stays in dry-run and diffs against the newest `notion_snapshot_*.json`. Refresh that file with Path A0 below.
* It never deletes or archives. It never touches `Notes`, `Verified by Hope` or `Scope (legacy)`.
* Add a repo: append it to `config.json` → `repos` and map it in `clients`. `new-client.sh` prints the exact lines.

### Enable live writes (done 27 Sep 2026; kept for re-setup)
1. Open https://www.notion.so/profile/integrations → **New integration** → name `Agency Sync`, type **Internal**, workspace = Hope Theory's → Save.
2. Capabilities: Read content ✔, Update content ✔, Insert content ✔. No user information is needed.
3. Copy the **Internal Integration Secret** (`ntn_…`).
4. In Notion open **Hope Theory HQ** → `•••` (top right) → **Connections** → **Connect to** → `Agency Sync`. This grants access to HQ and every child DB.
5. On the box: `echo 'export NOTION_TOKEN=ntn_xxx' >> ~/.agency.env && chmod 600 ~/.agency.env`, then `source ~/.agency.env` before running. Never commit it.
6. Test: `python3 sync_github_to_notion.py` should say `Notion rows from: live Notion API`. Then run `--apply`.

## Path A0: refresh the snapshot via the Notion connector (no token)
Run this SQL with the Notion connector (`notion-query-data-sources`), then save the rows to `notion_snapshot_YYYY-MM-DD.json` in the same shape as the existing file:
```sql
SELECT url, "GitHub issue" g, Title, Status, Priority, Type, Assignee, "date:Due:start" due, Client, "Verified by Hope" v
FROM "collection://ffff5aa0-ab35-4898-bb78-d476427d6404"
```

## Path B: Chief bot via the Notion connector (when no shell/token)
1. **Read GitHub.** For each repo in `config.json`, run `gh issue list -R FahadIbrahim93/<repo> --state all --limit 200 --json number,title,url,state,closedAt,labels,milestone`. Skip closed issues older than 30 days and issues with no agency label.
2. **Read project fields.** For boards 3 and 4, run `gh project item-list <n> --owner FahadIbrahim93 --format json` to get Status, Priority, Due and Agent.
3. **Read Notion.** Run the SQL in A0.
4. **Map** each issue with the table below and compare it to its row. Match on the `GitHub issue` URL.
5. **Write.** Missing row → `notion-create-pages` in the Tasks data source with all mapped fields plus the `GitHub issue` URL. Changed field → `notion-update-page` with only that field. Never clear a field because GitHub is blank.
6. **Report** a drift summary to Hope, in the format of `drift_report_*.txt`: created, updated, rows without an issue, unverified trainee closes.

## Field mapping
| Notion field | Source (in priority order) |
|---|---|
| Title | issue title |
| Status | issue closed → **Done**; board Status: Backlog/Ready → **Backlog**, In progress/In review → **Doing**, Done → **Done** |
| Priority | board Priority (High/Medium/Low) |
| Due | board Due; else milestone due date (only fills a blank) |
| Type | first label hit: `Business/Marketing_Tasks`→Business/Marketing, `bug`→Bug, `client`→Client, `website`→Website, `admin`→Admin, `type:bug`→Bug, `documentation`→Admin |
| Assignee | `CODER`→AI coder; `Business/Marketing_Tasks`→Trainee; board Agent; `client-waiting`/`admin`→Hope; else keep |
| Client | board Client text or repo name → Clients page (via `config.json` → `clients`) |
| GitHub issue | issue URL (the key) |

## Logs, errors, extras
* Log: `/workspace/agency/logs/agency-daily.log` (rotated at 256 KB, keeps 7). Last sync plan: `logs/last-sync.txt`.
* Exit codes: 0 ok · 2 env/token problem (message says which; no values printed) · 3 already running · 4 git · 5 sync · 6 STATUS/commit.
* Due-soon/overdue: `python3 tools/ops/due_check.py [--days N]`: `--days 3` inside the morning run, `--days 2` in the Chief's evening summary (with invoice Sent+5 reminder drafts and Sent+8 Overdue flags), `--days 7` in the Sunday review.
* Monthly (1st): invoice rollup into the Notion STATUS page (private; never in this repo). From 12 Dec: remind Hope to rotate `GH_AGENCY_TOKEN` (the morning run warns at ≤ 14 days).
* Extra Notion rows that link an issue already mirrored (e.g. a trainee helper task) are reported as INFO and left untouched; the issue stays keyed to its non-trainee row.
* Sunday review: `python3 tools/ops/weekly_summary.py` (+ `due_check.py --days 7`) → `logs/weekly-YYYY-MM-DD.md` (private, mode 600), then refresh the Notion STATUS page.

## Guardrails
* **Trainee tasks.** A closed `Business/Marketing_Tasks` issue whose row lacks **Verified by Hope** is flagged. Only Hope ticks Verified, and the bot must not.
* A **row without an issue** is drift, **except** Notion-only trainee rows (Type = Business/Marketing or Assignee = Trainee), which are by design. Otherwise create the issue (or ask Hope); never delete the row.
* **Trainee rows are Notion-authoritative:** the sync keeps titles in step and fills blanks only.
* Out of scope for sync: Invoices, Clients (maintained by hand / by the Chief bot).
