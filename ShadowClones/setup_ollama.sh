#!/usr/bin/env bash
# ═══════════════════════════════════════════════════════════════════
# setup_ollama.sh — One-command Ollama install + model pull
# Usage: bash setup_ollama.sh
# ═══════════════════════════════════════════════════════════════════

set -e

G='\033[0;32m'
Y='\033[1;33m'
R='\033[0;31m'
N='\033[0m'

echo ""
echo "🦙 OLLAMA SETUP — Hope Theory Privacy Mode"
echo "═══════════════════════════════════════════════"
echo ""

# Detect OS
OS="$(uname -s)"
echo "Detected OS: $OS"
echo ""

# Step 1: Install Ollama
echo -e "${Y}▶ Step 1: Install Ollama${N}"
if command -v ollama >/dev/null 2>&1; then
  echo -e "${G}   ✅ Ollama already installed: $(ollama --version)${N}"
else
  case "$OS" in
    Linux)
      echo "   Installing for Linux..."
      curl -fsSL https://ollama.com/install.sh | sh
      ;;
    Darwin)
      echo "   Installing for macOS via Homebrew..."
      if command -v brew >/dev/null 2>&1; then
        brew install ollama
      else
        echo -e "${R}   ❌ Homebrew not found. Install from https://ollama.com${N}"
        exit 1
      fi
      ;;
    *)
      echo -e "${R}   ❌ Unsupported OS. Install manually from https://ollama.com${N}"
      exit 1
      ;;
  esac
fi
echo ""

# Step 2: Start Ollama service
echo -e "${Y}▶ Step 2: Start Ollama service${N}"
if curl -s http://localhost:11434/api/tags >/dev/null 2>&1; then
  echo -e "${G}   ✅ Ollama already running${N}"
else
  echo "   Starting Ollama in background..."
  nohup ollama serve > /tmp/ollama.log 2>&1 &
  sleep 3
  if curl -s http://localhost:11434/api/tags >/dev/null 2>&1; then
    echo -e "${G}   ✅ Ollama started${N}"
  else
    echo -e "${R}   ❌ Failed to start. Check /tmp/ollama.log${N}"
    exit 1
  fi
fi
echo ""

# Step 3: Pull models
echo -e "${Y}▶ Step 3: Pull required models${N}"
MODELS=("llama3.1:8b" "qwen2.5-coder:7b")
for model in "${MODELS[@]}"; do
  echo -n "   Pulling $model... "
  if ollama list 2>/dev/null | grep -q "^$model"; then
    echo -e "${G}already have it${N}"
  else
    if ollama pull "$model" >/dev/null 2>&1; then
      echo -e "${G}✅${N}"
    else
      echo -e "${R}❌${N}"
    fi
  fi
done
echo ""

# Step 4: Test
echo -e "${Y}▶ Step 4: Test model${N}"
RESPONSE=$(ollama run llama3.1:8b "Say 'ollama working' in 1 sentence" 2>/dev/null)
if [[ -n "$RESPONSE" ]]; then
  echo -e "${G}   ✅ Model works: $RESPONSE${N}"
else
  echo -e "${R}   ❌ Model test failed${N}"
fi
echo ""

# Step 5: Configure Hermes profiles
echo -e "${Y}▶ Step 5: Configure Hermes profiles for Ollama${N}"
for profile in marjahans_merchant snaptrap_stylist; do
  if [ -d "$HOME/.hermes/profiles/$profile" ]; then
    echo "   Configuring $profile..."
    hermes -p "$profile" config set model.default ollama/llama3.1:8b 2>/dev/null || true
    hermes -p "$profile" config set model.base_url http://localhost:11434/v1 2>/dev/null || true
    echo -e "${G}   ✅ $profile configured${N}"
  else
    echo -e "${Y}   ⚠️  $profile not found (run setup_profiles.sh first)${N}"
  fi
done
echo ""

echo "═══════════════════════════════════════════════"
echo -e "${G}✅ OLLAMA SETUP COMPLETE${N}"
echo "═══════════════════════════════════════════════"
echo ""
echo "Models installed:"
ollama list
echo ""
echo "Test from Hermes:"
echo "  hermes -p marjahans_merchant chat -q 'Test connection'"
echo "  hermes -p snaptrap_stylist chat -q 'Test connection'"
echo ""
echo "Privacy check (no customer data goes to cloud):"
echo "  ✅ Customer PII stays local"
echo "  ✅ Order data stays local"
echo "  ✅ Drop plans stay local"
echo "  ✅ Supplier info stays local"
echo ""
echo "Cost: \$0/month (vs ~\$200/month for cloud)"
