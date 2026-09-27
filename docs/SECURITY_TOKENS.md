# Tokens for agency scripts and bots (least privilege)

> **Status 27 Sep 2026:** `NOTION_TOKEN` (integration *Agency Sync*, shared with Hope Theory HQ) and `GH_AGENCY_TOKEN` (fine-grained, 90 days, devjourney + client repo + template; Contents/Issues/PRs RW, no Projects) are **live** in `/home/box/.agency.env` (mode 600). All scripts source that file. Board reads still use the `gh` login. Rotate `GH_AGENCY_TOKEN` before expiry (~26 Dec 2026).

Scripts (`sync_github_to_notion.py`, `new-client.sh`) read these environment variables. They **prefer the agency tokens** and fall back to the current `gh` login only when none is set. Nothing here changes the existing `gh` login.

| Env var | Type | Used for | Required? |
|---|---|---|---|
| `GH_AGENCY_TOKEN` | GitHub **fine-grained** PAT | issues, labels, milestones, PR comments, file commits in agency repos | recommended |
| `GH_AGENCY_PROJECT_TOKEN` | GitHub **classic** PAT, scopes `read:project` (sync) or `project` (new-client) + `repo` | reading/writing **user-owned** Project boards | only if you want bots to touch boards without your login |
| `NOTION_TOKEN` | Notion internal integration secret | writing the Tasks mirror | for live sync |

## 1. `GH_AGENCY_TOKEN` (fine-grained) — create it
1. https://github.com/settings/personal-access-tokens/new
2. **Token name:** `agency-bot` · **Expiration:** 90 days (put a reminder in Notion) · **Resource owner:** `FahadIbrahim93`
3. **Repository access → Only select repositories:** `devjourney` + each client repo (names in Notion Clients) ( + `agency-client-template`). Edit the token to add a repo when you onboard a client.
4. **Repository permissions:**
   - Contents: **Read and write**
   - Issues: **Read and write**
   - Pull requests: **Read and write**
   - Metadata: **Read-only** (mandatory, auto-selected)
   - *Everything else: No access.* In particular **Administration: No access** (so the token can't create, delete or rename repos or change settings), no Secrets, no Workflows.
5. **Account permissions:** none. See the *Projects* note below.
6. Generate → copy once → store on the box: `echo 'export GH_AGENCY_TOKEN=github_pat_xxx' >> ~/.agency.env && chmod 600 ~/.agency.env`. Load with `source ~/.agency.env`.
7. Never paste it into Notion, issues, chat or a repo. Rotate at expiry; revoke immediately if leaked (same settings page).

### ⚠ Projects limitation (verified against GitHub docs, Sep 2026)
GitHub's docs list "access Projects owned by a user account" as something **fine-grained PATs cannot do**. Only *organization* Projects have a fine-grained permission. Your boards are user-owned, so choose one of these:
- **A (simplest):** leave board edits to your own `gh` login and the Chief bot. `GH_AGENCY_TOKEN` handles everything else. The sync still runs: it warns and skips board fields if it can't read them.
- **B:** create a **classic** PAT `GH_AGENCY_PROJECT_TOKEN` with `read:project` (plus `repo` because client repos are private) for the sync only. Note that `repo` is broad, which is why it's optional.
- **C (cleanest long-term):** create a free GitHub **organization** (e.g. `hope-theory`), move the boards (and optionally the repos) there, then give `GH_AGENCY_TOKEN` *Organization permissions → Projects: Read and write*.

Also note: **creating a repo** (in `new-client.sh`) needs *Administration: write*, which we deliberately do not grant. Run `new-client.sh --apply` with your own login. The token covers day-to-day bot work.

## 2. `NOTION_TOKEN`
See `/workspace/agency/sync/RUNBOOK.md` → *Enable live writes*: create an internal integration at https://www.notion.so/profile/integrations, then **share the Hope Theory HQ page** with it (`•••` → Connections).

## 3. Rules
- One token per purpose, shortest practical expiry, no admin/delete scopes.
- Bots never print tokens in logs, issues or Notion.
- The GitHub Actions workflow in client repos uses the built-in `GITHUB_TOKEN` (issues: write only), so it needs no PAT.

## 4. devjourney is PUBLIC: hygiene rules (decided by Hope, 27 Sep 2026)
- **Clients appear only as codes** (`Client A`, `Client B`…), in files, issue titles/bodies, comments and PRs. Private repos are written as `client-a#N (private repo)` with **no link** (the URL would reveal the real repo name).
- **Never in devjourney:** client names or legal names, client phone/email/address/social links, domains before launch, amounts, invoice numbers, bank names/details, referral/family notes. These live in **Notion** (Clients, Invoices & Payments) and the client's **private repo** (`docs/CLIENT.md`).
- Hope's own public business contact (portfolio email/WhatsApp) and the agency's public price tiers are fine.
- **Tooling:**
  - `tools/public_hygiene.py check` flags invoice numbers, BDT amounts, non-allowlisted phones/emails and anything in the private denylist. `scrub` anonymises text; `scrub-issues --repo … [--apply]` anonymises issues/comments.
  - The private name map lives in the gitignored `tools/hygiene.local.json` (box master: `/workspace/agency/hygiene/`) and in the repo secret `HYGIENE_DENYLIST` for CI.
  - `.github/workflows/public-hygiene.yml` runs the check on every push/PR.
  - `tools/status/generate_status.py` builds STATUS.md from GitHub with client codes and refuses to write if the check fails. The client code → repo map is in the gitignored `tools/status/status.local.json`.
  - `tools/sync/config.json` holds no client names; client repos + Notion mapping are in the gitignored `tools/sync/config.local.json`.
  - `tools/new-client.sh` requires `--code "Client B"` and uses only the code in the public tracking issue.
- **Not rewritten:** git history still contains the old client name, amounts and invoice numbers in commits made before 27 Sep 2026 (see the commit list in Notion Agency OS → Security). GitHub also keeps **issue/comment edit history** visible to anyone: Hope can delete old revisions in the UI (issue → "edited" → select revision → *Delete revision*). Full removal would need a history rewrite + GitHub Support cache purge. Not done (Hope's call).

## 5. GitHub security settings (applied 27 Sep 2026)
| Setting | devjourney (public) | Private repos (client repos, agency-client-template) |
|---|---|---|
| Secret scanning + push protection | ✅ on | ❌ not available on free tier |
| Dependabot alerts + security updates | ✅ on | ✅ on (`new-client.sh` enables it for new repos) |
| Private vulnerability reporting | ✅ on (see `SECURITY.md`) | ❌ public repos only |
| Ruleset `protect-main` (block force-push + deletion; **no** PR requirement so the Chief bot can commit STATUS.md) | ✅ active | ❌ needs GitHub Pro (rulesets and classic branch protection both 403) |
| Actions default `GITHUB_TOKEN` = read-only, can't approve PRs | ✅ | ✅ (`new-client.sh` sets it) |
| Fork PR workflows need approval | ✅ all external contributors | n/a (private, no outside collaborators) |

Workflows that need more declare it explicitly (`coder-pr-handoff.yml`: `issues: write`, `pull-requests: read`; `public-hygiene.yml`: `contents: read`).

**Remaining risks:**
- The `gh` login on the box keeps its full scopes (`repo`, `delete_repo`, `admin:org`, `workflow`, `project`). **Hope explicitly accepted this risk on 28 Sep 2026: do not refresh or remove scopes.** Mitigation: day-to-day issue/PR/file work and STATUS pushes use `GH_AGENCY_TOKEN`; the login is used only for board (Project) reads/edits, repo creation in `new-client.sh`, and settings changes Hope approves; bots never delete (archive/close only).
- Old client text in git history and in issue edit history.
- Private repos have no force-push/deletion protection (GitHub Pro, about $4/month, would add rulesets + branch protection).
