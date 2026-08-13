#!/usr/bin/env bash
# ═══════════════════════════════════════════════════════════════════
# deploy_skills.sh — Deploy all 36 clone skills to Hermes profiles
# ═══════════════════════════════════════════════════════════════════

set -e

HERMES_HOME="$HOME/.hermes"
SOURCE_DIR="/h/DevJourney/ShadowClones/skills"

G='\033[0;32m'
Y='\033[1;33m'
R='\033[0;31m'
N='\033[0m'

echo ""
echo "🐼 HOPE THEORY — Skill Deployment (36 skills)"
echo "═══════════════════════════════════════════════"
echo ""

# Map: clone name → list of skills
declare -A CLONE_SKILLS=(
  ["crypto_sage"]="chart_pattern_recognition onchain_flow_analysis defi_yield_optimizer mining_profitability sentiment_tracker ta_backtester"
  ["code_ninja"]="vibe_scaffold api_orchestrator ai_agent_builder automation_script freelance_deliverable ollama_deployer"
  ["marjahans_merchant"]="product_storyteller seo_optimizer inventory_forecaster campaign_builder influencer_scout competitor_watcher"
  ["snaptrap_stylist"]="trend_forecaster drop_planner community_builder visual_identity_guard collab_scout pod_optimizer"
  ["build_master"]="proposal_writer project_scoper network_manager cost_estimator permit_navigator innovation_scout"
  ["truth_seeker"]="deep_researcher content_engine audience_builder course_creator trend_synthesizer storyteller"
)

deployed=0
errors=0

for clone in "${!CLONE_SKILLS[@]}"; do
  echo "─── $clone ───"
  for skill in ${CLONE_SKILLS[$clone]}; do
    target="$HERMES_HOME/profiles/$clone/skills/$skill"
    source="$SOURCE_DIR/$clone/$skill"
    
    if [ -d "$source" ]; then
      mkdir -p "$target"
      cp -r "$source/"* "$target/"
      echo -e "  ${G}✅${N} $skill"
      deployed=$((deployed + 1))
    else
      echo -e "  ${R}❌${N} $skill (source not found: $source)"
      errors=$((errors + 1))
    fi
  done
done

echo ""
echo "═══════════════════════════════════════════════"
echo -e "Deployed: ${G}$deployed${N} / 36"
echo -e "Errors:   ${R}$errors${N}"
echo "═══════════════════════════════════════════════"
echo ""

if [ $errors -eq 0 ]; then
  echo -e "${G}✅ All 36 skills deployed!${N}"
  echo ""
  echo "Verify:"
  echo "  ls ~/.hermes/profiles/crypto_sage/skills/"
  echo "  ls ~/.hermes/profiles/code_ninja/skills/"
  echo "  ls ~/.hermes/profiles/marjahans_merchant/skills/"
  echo "  ls ~/.hermes/profiles/snaptrap_stylist/skills/"
  echo "  ls ~/.hermes/profiles/build_master/skills/"
  echo "  ls ~/.hermes/profiles/truth_seeker/skills/"
else
  echo -e "${R}⚠️  Some skills failed. Check source directory.${N}"
fi
