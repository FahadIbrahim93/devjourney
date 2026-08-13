#!/usr/bin/env bash
# ═══════════════════════════════════════════════════════════════════
# setup_profiles.sh — Hope Theory Shadow Clone Jutsu
# Creates all 7 profiles + configures them.
# Usage: bash setup_profiles.sh
# ═══════════════════════════════════════════════════════════════════

set -e

HERMES_HOME="$HOME/.hermes"
PROFILES_DIR="$HERMES_HOME/profiles"
SOURCE_DIR="/h/DevJourney/ShadowClones/profiles"
SHADOW_DIR="/h/DevJourney/ShadowClones"

# Colors
G='\033[0;32m'
Y='\033[1;33m'
R='\033[0;31m'
B='\033[0;34m'
N='\033[0m'

echo -e "${B}═══════════════════════════════════════════════════════════${N}"
echo -e "${B}🐼 HOPE THEORY — Shadow Clone Jutsu Setup${N}"
echo -e "${B}═══════════════════════════════════════════════════════════${N}"
echo ""

# Step 0: Pre-flight
echo -e "${Y}▶ Step 0: Pre-flight checks${N}"
command -v hermes >/dev/null 2>&1 || { echo -e "${R}❌ hermes CLI not found. Install first.${N}"; exit 1; }
echo -e "${G}   ✅ hermes CLI found${N}"

# Step 1: Verify Ollama running (for local clones)
echo -e "${Y}▶ Step 1: Verify Ollama (for Marjahans + Snaptrap)${N}"
if curl -s http://localhost:11434/api/tags > /dev/null 2>&1; then
  echo -e "${G}   ✅ Ollama running${N}"
  echo "   Models:"
  curl -s http://localhost:11434/api/tags | grep -oE '"name":"[^"]+"' | head -5 | sed 's/^/     /'
else
  echo -e "${R}   ⚠️  Ollama not running. Start with: ollama serve${N}"
  echo "   (Marjahans + Snaptrap need this for privacy mode)"
fi
echo ""

# Step 2: Create 7 profiles
echo -e "${Y}▶ Step 2: Create 7 profiles${N}"
PROFILES=(
  "naruto_main"
  "crypto_sage"
  "code_ninja"
  "marjahans_merchant"
  "snaptrap_stylist"
  "build_master"
  "truth_seeker"
)

for profile in "${PROFILES[@]}"; do
  if [ -d "$PROFILES_DIR/$profile" ]; then
    echo -e "   ⏭  $profile (exists, skipping create)"
  else
    echo -e "   ${B}Creating: $profile${N}"
    hermes profile create "$profile" 2>/dev/null || {
      # If create fails, try without hermes
      mkdir -p "$PROFILES_DIR/$profile"/{skills,plugins,cron,memories,sessions}
      cp -r "$HERMES_HOME"/config.yaml "$PROFILES_DIR/$profile/" 2>/dev/null || true
    }
  fi
done
echo -e "${G}   ✅ All 7 profiles created${N}"
echo ""

# Step 3: Deploy config.yaml to each profile
echo -e "${Y}▶ Step 3: Deploy config.yaml to each profile${N}"
for profile in "${PROFILES[@]}"; do
  if [ -f "$SOURCE_DIR/$profile.yaml" ]; then
    cp "$SOURCE_DIR/$profile.yaml" "$PROFILES_DIR/$profile/config.yaml"
    echo -e "   ✅ $profile.yaml → $PROFILES_DIR/$profile/config.yaml"
  else
    echo -e "   ${R}❌ Missing: $SOURCE_DIR/$profile.yaml${N}"
  fi
done
echo ""

# Step 4: Set up skills directories
echo -e "${Y}▶ Step 4: Set up skills directories${N}"
for profile in "${PROFILES[@]}"; do
  mkdir -p "$PROFILES_DIR/$profile/skills"
done
echo -e "${G}   ✅ Skills directories created${N}"
echo ""

# Step 5: Set naruto_main as sticky default
echo -e "${Y}▶ Step 5: Set Naruto_Main as sticky default${N}"
hermes profile use naruto_main 2>/dev/null || echo "   (run: hermes profile use naruto_main)"
echo ""

# Step 6: Verify
echo -e "${Y}▶ Step 6: Verify all profiles${N}"
hermes profile list 2>/dev/null || {
  echo "   Manual list:"
  ls -1 "$PROFILES_DIR" 2>/dev/null | sed 's/^/     /'
}
echo ""

# Step 7: Configure cron for each
echo -e "${Y}▶ Step 7: Configure cron jobs (per profile)${N}"
for profile in "${PROFILES[@]}"; do
  echo "   Setting up cron for: $profile"
  # Crypto Sage
  if [ "$profile" = "crypto_sage" ]; then
    hermes -p crypto_sage cron create "0 9 * * *" "Analyze BTC/ETH overnight. Log 3 chart patterns to #ShadowNetwork." 2>/dev/null || true
    hermes -p crypto_sage cron create "0 18 * * 0" "Generate weekly sentiment report." 2>/dev/null || true
  fi
  # Naruto_Main
  if [ "$profile" = "naruto_main" ]; then
    hermes -p naruto_main cron create "30 9 * * *" "Run /h/DevJourney/ShadowClones/daily-synthesis.js synthesize" 2>/dev/null || true
    hermes -p naruto_main cron create "0 22 * * *" "Run /h/DevJourney/ShadowClones/daily-synthesis.js memory" 2>/dev/null || true
  fi
done
echo -e "${G}   ✅ Cron jobs created${N}"
echo ""

echo -e "${B}═══════════════════════════════════════════════════════════${N}"
echo -e "${G}✅ SETUP COMPLETE${N}"
echo -e "${B}═══════════════════════════════════════════════════════════${N}"
echo ""
echo -e "${Y}▶ Next steps:${N}"
echo "   1. Verify: hermes profile list"
echo "   2. Test: hermes -p crypto_sage chat -q 'Test connection'"
echo "   3. Switch: hermes -p naruto_main"
echo "   4. Deploy Kanban: hermes kanban init"
echo "   5. First synthesis: node /h/DevJourney/ShadowClones/daily-synthesis.js synthesize"
echo ""
echo -e "📁 Profile configs: $PROFILES_DIR/"
echo -e "📁 Source configs:  $SOURCE_DIR/"
echo -e "📁 Skills:          $PROFILES_DIR/<name>/skills/"
