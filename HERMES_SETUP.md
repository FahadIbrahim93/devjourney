# Hermes Zero-Effort Tools Setup Guide
> Last updated: 2026-05-02 | Hermes v0.12.0 | Hope Theory Brand

---

## What's Installed / Configured

### DONE ✅
| Tool | Status | Location |
|------|--------|----------|
| xurl CLI | ✅ v1.0.3 installed via npm | `~/.local/bin/xurl` |
| GitHub MCP | ✅ Added to config.yaml | npx zero-install |
| Filesystem MCP | ✅ Added to config.yaml | npx zero-install |
| Time MCP | ✅ Already in config | uvx zero-install |
| Camoufox Browser | ✅ Configured in config.yaml | `/home/hope/.cache/camoufox/camoufox-bin` |
| Holographic Memory | ✅ Set in config.yaml | SQLite, no API key |
| Curator (v0.12.0) | ✅ Auto-enabled | Runs after each session |

### BLOCKED — Needs User Action
| Tool | What You Need | Action |
|------|---------------|--------|
| xurl Auth | X Developer account | Create app at developer.x.com |
| GitHub MCP | GitHub Personal Access Token | Generate at github.com/settings/tokens |
| Image Gen (xAI) | xAI API key | Get at console.x.ai |
| Image Gen (OpenAI) | OpenAI API key | Get at platform.openai.com |
| Ollama | Run install script | `curl -fsSL https://ollama.com/install.sh \| sh` |

---

## Manual Setup Steps

### 1. xurl — X/Twitter CLI (CRITICAL)

**Step 1:** Go to https://developer.x.com and create a project + app

**Step 2:** Get your Client ID and Client Secret from the X Developer Portal

**Step 3:** Run these commands:
```bash
~/.local/bin/xurl auth apps add hopetheory \
  --client-id YOUR_CLIENT_ID \
  --client-secret YOUR_CLIENT_SECRET \
  --redirect-uri http://localhost:8080/callback

~/.local/bin/xurl auth login hopetheory
```

**Step 4:** Authorize in browser, then test:
```bash
~/.local/bin/xurl whoami
~/.local/bin/xurl post "Never GIVE UP on your HOPES. 🚀 @hopetheory__"
```

---

### 2. GitHub MCP — Full Git Integration

**Step 1:** Generate a GitHub Personal Access Token:
- Go to https://github.com/settings/tokens
- Click "Generate new token (classic)"
- Scopes: `repo`, `read:user`, `workflow`
- Copy the token

**Step 2:** Add to `~/.hermes/.env`:
```
GITHUB_TOKEN=ghp_your_token_here
```

**Step 3:** Restart Hermes:
```bash
# In the hermes session
/restart
```

---

### 3. Image Generation — xAI (Recommended)

xAI's grok-imagine-image is fast, capable, and has a free tier.

**Step 1:** Get API key at https://console.x.ai/

**Step 2:** Add to `~/.hermes/.env`:
```
XAI_API_KEY=xai-your-key-here
```

**Step 3:** Test:
```bash
hermes tools  # Should show image_gen available
```

---

### 4. Ollama — Local AI (RTX 3070 Ti)

**Step 1:** Install:
```bash
curl -fsSL https://ollama.com/install.sh | sh
```

**Step 2:** Pull models (choose based on VRAM):
```bash
# For RTX 3070 Ti (8GB VRAM) — recommended:
ollama pull qwen2.5-coder:3b
ollama pull llama3.2:3b
ollama pull mistral:7b

# Smaller models for fast tasks:
ollama pull phi:2.7b
ollama pull codellama:7b
```

**Step 3:** Start service:
```bash
ollama serve
```

---

### 5. Ollama — Alt Install (if curl|sh is blocked)

Download binary directly and extract:
```bash
# Download (~2GB)
curl -fSL "https://github.com/ollama/ollama/releases/latest/download/ollama-linux-amd64.tar.zst" \
  -o /tmp/ollama.tar.zst

# Extract (needs zstd)
sudo apt-get install -y zstd
mkdir -p ~/bin
zstd -d /tmp/ollama.tar.zst | tar -xf - -C ~/bin
chmod +x ~/bin/ollama
export PATH="$HOME/bin:$PATH"
```

---

## Adding PATH to Shell

Add to your `~/.bashrc` or `~/.zshrc`:
```bash
export PATH="$HOME/.local/bin:$PATH"
```

Then reload:
```bash
source ~/.bashrc
```

---

## Config Files Modified

| File | Changes |
|------|---------|
| `~/.hermes/config.yaml` | mcp_servers (github, filesystem, time), browser (camoufox), memory (holographic) |
| `~/.hermes/.env` | Needs: GITHUB_TOKEN, XAI_API_KEY (user must add) |

---

## Skills Installed

- `hope-theory-orchestrator` — CEO orchestrator for all ventures
- 81 other skills across: autonomous-ai-agents, creative, data-science, github, mlops, productivity, media, social-media, software-development, research, note-taking, email, smart-home, gaming, red-teaming, devops

---

## Philosophy

> "Never GIVE UP on your HOPES."

We operate with **zero slop** — only state-of-the-art output. Copy-paste formats, verify facts, flag uncertainty. Execute autonomously to completion.
