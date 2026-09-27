#!/usr/bin/env bash
# new-client.sh — onboard a client in one idempotent pass. DRY-RUN by default; nothing is ever deleted.
#
#   ./new-client.sh <slug> "<Client Name>" --code "Client B" [--launch YYYY-MM-DD] [--apply]
#   e.g. ./new-client.sh acme-bakery "Acme Bakery" --code "Client B" --launch 2026-11-30          # shows the plan
#        ./new-client.sh acme-bakery "Acme Bakery" --code "Client B" --launch 2026-11-30 --apply  # does it
#   devjourney is PUBLIC: the real name/slug stay in the private repo, private board and Notion; the public
#   tracking issue only uses --code. Record the code<->name mapping in Notion Clients (+ local private configs).
#
# Creates (skipping anything that already exists):
#   1. private repo FahadIbrahim93/<slug> from template FahadIbrahim93/agency-client-template
#      (AGENTS.md, CONTRIBUTING, 3 issue templates, PR template, coder-pr-handoff workflow, docs/)
#   2. placeholder fill-in commit (__CLIENT_NAME__, __REPO__, __PROJECT_URL__, __TRACKING_ISSUE__)
#   3. labels  4. milestones M1–M6 (dated back from --launch)
#   5. project board "Client: <Name>" (Status Backlog/Ready/In progress/In review/Done; Client, Priority, Due, Agent), linked to repo
#   6. devjourney tracking issue "<Code> - website v1" (anonymised: no name, no repo name) (labels client, website), added to the board
#   7. prints the Notion rows + sync config lines + Hope's UI steps
# Auth: repo creation uses your gh login (needs Administration, which GH_AGENCY_TOKEN deliberately lacks).
#       Labels/milestones/issues prefer GH_AGENCY_TOKEN; boards prefer GH_AGENCY_PROJECT_TOKEN (see docs/SECURITY_TOKENS.md).
set -euo pipefail
O=FahadIbrahim93; TPL=$O/agency-client-template; HUB=$O/devjourney
APPLY=0; LAUNCH=""; CODE=""; ARGS=()
while [ $# -gt 0 ]; do case "$1" in
  --apply) APPLY=1;; --launch) LAUNCH="$2"; shift;; --code) CODE="$2"; shift;; -h|--help) sed -n 2,20p "$0"; exit 0;; *) ARGS+=("$1");; esac; shift; done
[ ${#ARGS[@]} -eq 2 ] && [ -n "$CODE" ] || { echo "usage: $0 <slug> \"<Client Name>\" --code \"Client B\" [--launch YYYY-MM-DD] [--apply]"; exit 2; }
SLUG="${ARGS[0]}"; NAME="${ARGS[1]}"; R=$O/$SLUG; TITLE="Client: $NAME"; TRACK="$CODE - website v1"
[[ "$SLUG" =~ ^[a-z0-9][a-z0-9-]{1,60}$ ]] || { echo "slug must be lowercase letters, digits, dashes"; exit 2; }
[ -n "$LAUNCH" ] || LAUNCH=$(date -d "+30 days" +%F)
d(){ date -d "$LAUNCH $1 days" +%F; }
MODE=$([ $APPLY = 1 ] && echo APPLY || echo DRY-RUN)
echo "== new-client.sh [$MODE] repo=$R name=\"$NAME\" launch=$LAUNCH"

gh_repo(){ env -u GH_TOKEN gh "$@"; }                                          # your login
gh_work(){ if [ -n "${GH_AGENCY_TOKEN:-}" ]; then GH_TOKEN="$GH_AGENCY_TOKEN" gh "$@"; else gh "$@"; fi; }
gh_proj(){ if [ -n "${GH_AGENCY_PROJECT_TOKEN:-}" ]; then GH_TOKEN="$GH_AGENCY_PROJECT_TOKEN" gh "$@"; else env -u GH_TOKEN gh "$@"; fi; }
step(){ echo; echo "-- $*"; }
do_(){ if [ $APPLY = 1 ]; then "$@"; else echo "   [dry-run] would run: $*"; fi; }
skip(){ echo "   = exists, skip: $*"; }

# 1. repo
step "1. repo $R (private, from $TPL)"
gh_repo repo view "$TPL" --json isTemplate -q .isTemplate | grep -q true || { echo "template $TPL missing or not a template"; exit 1; }
if gh_repo repo view "$R" >/dev/null 2>&1; then skip "$R"; REPO_EXISTS=1; else
  REPO_EXISTS=0; do_ gh_repo repo create "$R" --private --template "$TPL" --description "$NAME website (Hope Theory)"
  if [ $APPLY = 1 ]; then for i in $(seq 1 20); do gh_repo api "repos/$R/contents/AGENTS.md" >/dev/null 2>&1 && break; sleep 3; done; REPO_EXISTS=1; fi
fi
step "1b. security baseline for $R (free tier: Dependabot alerts + security updates, read-only Actions token)"
do_ gh_repo api -X PUT "repos/$R/vulnerability-alerts" --silent
do_ gh_repo api -X PUT "repos/$R/automated-security-fixes" --silent
do_ gh_repo api -X PUT "repos/$R/actions/permissions/workflow" -f default_workflow_permissions=read -F can_approve_pull_request_reviews=false --silent
echo "   note: rulesets/branch protection, secret scanning and private vulnerability reporting need GitHub Pro (or a public repo) for private repos"

# 5 (early, need URL). board
step "5. project board \"$TITLE\""
NUM=$(gh_proj project list --owner $O --format json -q ".projects[]|select(.title==\"$TITLE\")|.number" | head -1)
if [ -n "$NUM" ]; then skip "board #$NUM"; else do_ gh_proj project create --owner $O --title "$TITLE" --format json >/dev/null
  [ $APPLY = 1 ] && NUM=$(gh_proj project list --owner $O --format json -q ".projects[]|select(.title==\"$TITLE\")|.number" | head -1); fi
PURL=${NUM:+https://github.com/users/$O/projects/$NUM}; PURL=${PURL:-"(board URL after --apply)"}
if [ -n "$NUM" ]; then
  do_ gh_proj project edit "$NUM" --owner $O --description "$NAME: CODER issues for AI coders (pick only Ready; rules in AGENTS.md) + client work. Flow: CODER issue (Ready) -> PR 'Closes #N' -> review -> merge -> Done."
  SF=$(gh_proj project field-list "$NUM" --owner $O --format json -q '.fields[]|select(.name=="Status")|.id')
  HAVE_OPTS=$(gh_proj project field-list "$NUM" --owner $O --format json -q '.fields[]|select(.name=="Status")|[.options[].name]|join(",")')
  if [ "$HAVE_OPTS" = "Backlog,Ready,In progress,In review,Done" ]; then skip "Status options"; else
    do_ gh_proj api graphql -f query='mutation($f:ID!){updateProjectV2Field(input:{fieldId:$f,singleSelectOptions:[
     {name:"Backlog",color:GRAY,description:"Not ready yet"},{name:"Ready",color:BLUE,description:"Ready for an AI coder to claim"},
     {name:"In progress",color:YELLOW,description:"Claimed; agent working"},{name:"In review",color:PURPLE,description:"PR open, awaiting review"},
     {name:"Done",color:GREEN,description:"Merged / closed"}]}){projectV2Field{... on ProjectV2SingleSelectField{id}}}}' -f f="$SF"; fi
  have(){ gh_proj project field-list "$NUM" --owner $O --format json -q ".fields[]|select(.name==\"$1\")|.id"; }
  [ -n "$(have Client)" ]   && skip "field Client"   || do_ gh_proj project field-create "$NUM" --owner $O --name Client --data-type TEXT
  [ -n "$(have Priority)" ] && skip "field Priority" || do_ gh_proj project field-create "$NUM" --owner $O --name Priority --data-type SINGLE_SELECT --single-select-options "High,Medium,Low"
  [ -n "$(have Due)" ]      && skip "field Due"      || do_ gh_proj project field-create "$NUM" --owner $O --name Due --data-type DATE
  [ -n "$(have Agent)" ]    && skip "field Agent"    || do_ gh_proj project field-create "$NUM" --owner $O --name Agent --data-type TEXT
else echo "   [dry-run] would set Status options Backlog/Ready/In progress/In review/Done and create fields Client(text) Priority(High/Medium/Low) Due(date) Agent(text)"; fi

# 6. tracking issue (early, need URL)
step "6. devjourney tracking issue \"$TRACK\""
TNUM=$(gh_work issue list -R $HUB --state all --search "\"$TRACK\" in:title" --json number,title -q ".[]|select(.title==\"$TRACK\")|.number" | head -1)
if [ -n "$TNUM" ]; then skip "$HUB#$TNUM"; else
  BODY="Tracking issue for **$CODE** (private repo + private board; real name, contacts and amounts in Notion Clients). Launch target: $LAUNCH.

Checklist: see [docs/NEW_CLIENT.md](https://github.com/$HUB/blob/main/docs/NEW_CLIENT.md).
- [ ] Notion Clients row filled (price, deposit status, target launch, links)
- [ ] Proposal + deposit invoice drafted (Hope sends)
- [ ] docs/SPEC.md + docs/CLIENT.md filled
- [ ] First CODER issue (scaffold + previews) in Ready"
  do_ gh_work issue create -R $HUB -t "$TRACK" -l client -l website -b "$BODY"
  [ $APPLY = 1 ] && TNUM=$(gh_work issue list -R $HUB --state all --search "\"$TRACK\" in:title" --json number,title -q ".[]|select(.title==\"$TRACK\")|.number" | head -1); fi
TURL=${TNUM:+https://github.com/$HUB/issues/$TNUM}; TURL=${TURL:-"(tracking issue URL after --apply)"}

# 2. personalise placeholders
step "2. fill template placeholders in $R"
if [ "$REPO_EXISTS" = 1 ] && gh_repo api "repos/$R/contents/README.md" -q .content 2>/dev/null | base64 -d 2>/dev/null | grep -q "__CLIENT_NAME__"; then
  if [ $APPLY = 1 ]; then TMP=$(mktemp -d); gh_repo repo clone "$R" "$TMP/r" -- -q
    ( cd "$TMP/r" && grep -rl "__CLIENT_NAME__\|__REPO__\|__PROJECT_URL__\|__TRACKING_ISSUE__" . --exclude-dir=.git | while read -r f; do
        sed -i "s|__CLIENT_NAME__|$NAME|g; s|__REPO__|$SLUG|g; s|__PROJECT_URL__|$PURL|g; s|__TRACKING_ISSUE__|$TURL|g" "$f"; done
      git add -A && git -c user.name="$(git config --global user.name || echo FahadIbrahim93)" commit -qm "chore: personalise template for $NAME" && git push -q )
    echo "   personalised (tmp clone at $TMP/r, left in place)"
  else echo "   [dry-run] would replace __CLIENT_NAME__/__REPO__/__PROJECT_URL__/__TRACKING_ISSUE__ and commit"; fi
elif [ "$REPO_EXISTS" = 1 ]; then skip "already personalised"; else echo "   [dry-run] would personalise after repo creation"; fi

# 3. labels
step "3. labels"
LABELS=( "client|0e8a16|Client project work" "website|1d76db|Design/build/launch work" "admin|c5def5|Client coordination, domain, assets, handoff"
  "bug|d73a4a|Something is broken" "CODER|5319e7|Coding task for AI coder agents (pick only when Ready)"
  "Business/Marketing_Tasks|f9a8d4|Trainee business/marketing task (Hope verifies)" "status:in-review|fbca04|A PR claims to close this issue; waiting for Hope review"
  "blocked|b60205|Blocked; see latest comment" "client-waiting|fef2c0|Waiting on the client"
  "type:feature|a2eeef|" "type:bug|d73a4a|" "type:content|bfdadc|" "type:design|d4c5f9|"
  "phase:discovery|ededed|" "phase:design|ededed|" "phase:build|ededed|" "phase:review|ededed|" "phase:launch|ededed|" "phase:handoff|ededed|" )
EXIST=""; [ "$REPO_EXISTS" = 1 ] && EXIST=$(gh_work label list -R "$R" --limit 200 --json name -q '.[].name')
for l in "${LABELS[@]}"; do IFS='|' read -r n c desc <<<"$l"
  if grep -qxF "$n" <<<"$EXIST"; then skip "label $n"; else do_ gh_work label create "$n" -R "$R" --color "$c" --description "$desc"; fi; done

# 4. milestones
step "4. milestones M1–M6 (launch $LAUNCH)"
MS=( "M1 Discovery|$(d -26)" "M2 Design|$(d -19)" "M3 Build|$(d -8)" "M4 Review|$(d -3)" "M5 Launch|$LAUNCH" "M6 Handoff|$LAUNCH" )
EXM=""; [ "$REPO_EXISTS" = 1 ] && EXM=$(gh_work api "repos/$R/milestones?state=all&per_page=100" -q '.[].title' 2>/dev/null || true)
for m in "${MS[@]}"; do IFS='|' read -r t due <<<"$m"
  if grep -qxF "$t" <<<"$EXM"; then skip "milestone $t"; else do_ gh_work api -X POST "repos/$R/milestones" -f title="$t" -f due_on="${due}T12:00:00Z"; fi; done

# 5b. link board + add tracking issue
step "5b. link board to repo + add tracking issue to board"
if [ -n "$NUM" ] && [ "$REPO_EXISTS" = 1 ]; then do_ gh_proj project link "$NUM" --owner $O --repo "$R" || true
  [ -n "$TNUM" ] && do_ gh_proj project item-add "$NUM" --owner $O --url "$TURL" >/dev/null || true
else echo "   [dry-run] would link board to $R and add the tracking issue"; fi

cat <<TXT

== Notion rows to add (Chief bot via Notion connector, or Hope) ==
Clients DB (collection://48be6125-677c-4902-a795-3ec7d5f033fc):
  Name="$NAME" | Phase=Discovery | Price (BDT)=<Hope sets> | Target launch=$LAUNCH | Deposit status=Not invoiced
  Tracking issue=$TURL | Project board=$PURL | Repo=https://github.com/$R
Tasks DB: nothing by hand. Run  python3 /workspace/agency/sync/sync_github_to_notion.py  after adding to the PRIVATE tools/sync/config.local.json:
  "repos": [..., "$SLUG"]      "clients": { "$SLUG": "<Clients page id>", "$NAME": "<Clients page id>" }
STATUS.md: add {"code":"$CODE","slug":"<code-slug>","repo":"$SLUG","tracking_issue":<N>} to the PRIVATE tools/status/status.local.json
Invoices DB: draft rows (Status=Draft, Client=$NAME) for deposit / design / final. Hope sends; only Hope marks Paid after checking the bank statement.

== Hope, in the UI (can't be done by API) ==
  1. Board $PURL → … → Workflows: enable "Item closed" → Done, "Pull request merged" → Done, "Item added to project" → Backlog.
  2. Board → add views: "CODER Ready" (filter label:CODER status:Ready), "By milestone" (group by Milestone).
  3. github.com/settings/personal-access-tokens → edit agency-bot token → add repo $SLUG.
  4. Connect the repo to Cloudflare Pages for per-PR previews (commercial use OK on free tier).
TXT
echo "== done [$MODE]"
