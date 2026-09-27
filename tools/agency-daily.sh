#!/usr/bin/env bash
# agency-daily.sh: Chief of Web Agency morning routine (Sun-Thu 09:10 Asia/Dhaka, Bangladesh workweek). Idempotent, safe to re-run any time.
#   1 pre-flight (env file, tokens -> HTTP 200)  2 git pull  3 GitHub->Notion sync --apply
#   4 regenerate anonymised STATUS.md, commit+push only on a real change  5 due-soon/overdue check  6 summary
# Log: /workspace/agency/logs/agency-daily.log (rotated at 256 KB, keeps .1-.7). Never prints token values.
# Exit: 0 ok · 2 env/token problem · 3 already running · 4 git · 5 sync · 6 STATUS/commit
set -uo pipefail
AGENCY_ENV=${AGENCY_ENV:-/home/box/.agency.env}; DJ=${DJ:-/workspace/agency/merge/dj}
LOGDIR=${AGENCY_LOGS:-/workspace/agency/logs}; LOG=$LOGDIR/agency-daily.log; SYNCLOG=$LOGDIR/last-sync.txt
mkdir -p "$LOGDIR"; chmod 700 "$LOGDIR"
if [ -f "$LOG" ] && [ "$(stat -c %s "$LOG")" -gt 262144 ]; then
  for i in 6 5 4 3 2 1; do [ -f "$LOG.$i" ] && mv -f "$LOG.$i" "$LOG.$((i+1))"; done; mv -f "$LOG" "$LOG.1"; fi
redact(){ sed -E 's/(ntn_|secret_|github_pat_|ghp_|gho_)[A-Za-z0-9_]+/\1<redacted>/g'; }
exec > >(redact | tee -a "$LOG") 2>&1
echo; echo "===== agency-daily $(date '+%F %T %Z') ====="
die(){ echo "ERROR: $2"; echo "===== exit $1 ====="; exit "$1"; }
exec 9>/tmp/agency-daily.lock; flock -n 9 || die 3 "another agency-daily run is in progress"

# 1. pre-flight
[ -r "$AGENCY_ENV" ] || die 2 "env file $AGENCY_ENV missing or unreadable (see docs/SECURITY_TOKENS.md)"
[ "$(stat -c %a "$AGENCY_ENV")" = 600 ] || echo "WARN: $AGENCY_ENV should be mode 600"
set -a; . "$AGENCY_ENV"; set +a
for v in NOTION_TOKEN GH_AGENCY_TOKEN; do [ -n "${!v:-}" ] || die 2 "$v is not set in $AGENCY_ENV"; done
n=$(curl -s -m 20 -o /dev/null -w '%{http_code}' https://api.notion.com/v1/users/me -H "Authorization: Bearer $NOTION_TOKEN" -H "Notion-Version: 2025-09-03")
[ "$n" = 200 ] || die 2 "NOTION_TOKEN rejected (HTTP $n): recreate/share the 'Agency Sync' integration"
g=$(curl -s -m 20 -o /dev/null -w '%{http_code}' https://api.github.com/repos/FahadIbrahim93/devjourney -H "Authorization: Bearer $GH_AGENCY_TOKEN")
[ "$g" = 200 ] || die 2 "GH_AGENCY_TOKEN rejected (HTTP $g): expired or revoked? (expires ~26 Dec 2026)"
exp=$(curl -sI -m 20 https://api.github.com/user -H "Authorization: Bearer $GH_AGENCY_TOKEN" | tr -d '\r' | awk -F': ' 'tolower($1)=="github-authentication-token-expiration"{print $2}')
[ -n "$exp" ] && { left=$(( ( $(date -d "$exp" +%s) - $(date +%s) ) / 86400 )); echo "tokens: Notion 200 · GitHub 200 (GH_AGENCY_TOKEN expires in $left days)"; [ "$left" -le 14 ] && echo "WARN: rotate GH_AGENCY_TOKEN now (escalate to Hope)"; }
env -u GH_TOKEN gh auth status >/dev/null 2>&1 || echo "WARN: gh login unavailable -> board fields skipped"

# 2. repo
cd "$DJ" && git pull -q --ff-only || die 4 "git pull failed in $DJ (local changes or divergence; fix by hand)"

# 3. sync
python3 tools/sync/sync_github_to_notion.py --apply > "$SYNCLOG" 2>&1 || { cat "$SYNCLOG"; die 5 "sync failed (details above)"; }

# 4. STATUS.md
python3 tools/status/generate_status.py >/dev/null || die 6 "generate_status.py failed or hygiene check blocked it"
if git diff -U0 -- STATUS.md | grep -E '^[+-][^+-]' | grep -qv 'Last updated'; then
  git add STATUS.md && git commit -qm "status: daily refresh $(date +%F)" && GH_TOKEN="$GH_AGENCY_TOKEN" git push -q || die 6 "commit/push of STATUS.md failed"
  echo "STATUS.md: committed $(git rev-parse --short HEAD)"
else git checkout -- STATUS.md; echo "STATUS.md: no change"; fi

# 5-6. summary
grep -E '^(==|GitHub auth|Issues|-- |Applied|WARN)|^  [~+!?*] ' "$SYNCLOG"
python3 tools/ops/due_check.py --days 3
echo "===== exit 0 ====="
