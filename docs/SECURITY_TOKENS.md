# Tokens for agency scripts and bots (least privilege)

Scripts (`sync_github_to_notion.py`, `new-client.sh`) read these environment variables. They **prefer the agency tokens** and fall back to the current `gh` login only when none is set. Nothing here changes the existing `gh` login.

| Env var | Type | Used for | Required? |
|---|---|---|---|
| `GH_AGENCY_TOKEN` | GitHub **fine-grained** PAT | issues, labels, milestones, PR comments, file commits in agency repos | recommended |
| `GH_AGENCY_PROJECT_TOKEN` | GitHub **classic** PAT, scopes `read:project` (sync) or `project` (new-client) + `repo` | reading/writing **user-owned** Project boards | only if you want bots to touch boards without your login |
| `NOTION_TOKEN` | Notion internal integration secret | writing the Tasks mirror | for live sync |

## 1. `GH_AGENCY_TOKEN` (fine-grained) — create it
1. https://github.com/settings/personal-access-tokens/new
2. **Token name:** `agency-bot` · **Expiration:** 90 days (put a reminder in Notion) · **Resource owner:** `FahadIbrahim93`
3. **Repository access → Only select repositories:** `devjourney`, `sthappo-architects` (+ each new client repo, + `agency-client-template`). Edit the token to add a repo when you onboard a client.
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
