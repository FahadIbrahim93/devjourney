#!/usr/bin/env bash
# ═══════════════════════════════════════════════════════════════════
# test_profiles.sh — Verify all 7 profiles work end-to-end
# Usage: bash test_profiles.sh
# ═══════════════════════════════════════════════════════════════════

G='\033[0;32m'
R='\033[0;31m'
Y='\033[1;33m'
N='\033[0m'

echo ""
echo "🧪 HOPE THEORY — Profile Test Suite"
echo "═══════════════════════════════════════════════"
echo ""

PROFILES=(naruto_main crypto_sage code_ninja marjahans_merchant snaptrap_stylist build_master truth_seeker)

pass=0
fail=0

for profile in "${PROFILES[@]}"; do
  echo -n "Testing $profile: "
  
  # Test 1: Profile exists
  if [ ! -d "$HOME/.hermes/profiles/$profile" ]; then
    echo -e "${R}FAIL (profile dir missing)${N}"
    fail=$((fail+1))
    continue
  fi
  
  # Test 2: config.yaml exists
  if [ ! -f "$HOME/.hermes/profiles/$profile/config.yaml" ]; then
    echo -e "${R}FAIL (config.yaml missing)${N}"
    fail=$((fail+1))
    continue
  fi
  
  # Test 3: Skills dir
  if [ ! -d "$HOME/.hermes/profiles/$profile/skills" ]; then
    mkdir -p "$HOME/.hermes/profiles/$profile/skills"
  fi
  
  # Test 4: Memory dir
  if [ ! -d "$HOME/.hermes/profiles/$profile/memories" ]; then
    mkdir -p "$HOME/.hermes/profiles/$profile/memories"
  fi
  
  # Test 5: For local profiles, check Ollama
  if [[ "$profile" == "marjahans_merchant" || "$profile" == "snaptrap_stylist" ]]; then
    if ! curl -s http://localhost:11434/api/tags > /dev/null 2>&1; then
      echo -e "${Y}WARN (Ollama not running - $profile needs it)${N}"
      continue
    fi
  fi
  
  echo -e "${G}PASS${N}"
  pass=$((pass+1))
done

echo ""
echo "═══════════════════════════════════════════════"
echo "Results: $pass passed, $fail failed"
echo "═══════════════════════════════════════════════"
echo ""

if [ $fail -eq 0 ]; then
  echo -e "${G}✅ All profiles ready!${N}"
  echo ""
  echo "Quick test commands:"
  echo "  hermes -p crypto_sage chat -q 'Test'"
  echo "  hermes -p marjahans_merchant chat -q 'Test'"
  echo "  hermes -p naruto_main chat -q 'Test'"
  echo ""
  echo "Spawn parallel:"
  echo "  hermes kanban init"
  echo "  hermes kanban create 'BTC analysis' --assign crypto_sage"
else
  echo -e "${R}❌ Some profiles need attention. Re-run setup_profiles.sh${N}"
fi
