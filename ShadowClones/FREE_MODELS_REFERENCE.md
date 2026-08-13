# 🆓 FREE MODELS — Complete Reference (June 2026)
**For:** Hope Theory Shadow Clone Jutsu
**Goal:** $0/month AI cost across all 7 clones
**Status:** Use these defaults · fallbacks when rate-limited

---

## ⚠️ HONESTY NOTE

**Web tools blocked in this session** (no Firecrawl API). This reference is based on:
- **Your existing config** (AGENTS.md) — verified
- **Training data cutoff (Jan 2026)** — may have changed
- **Provider docs at the time** — verify rates via `hermes model` after deploy

**Before relying on a model:** run `hermes chat -p <model> -q "test"` to verify it's still available.

---

## 🏆 TIER 1: BEST FREE MODELS (BY TASK)

### 🥇 NEMOTRON SUPER 120B — #1 for code + reasoning
- **Model ID:** `nvidia/nemotron-3-super-120b-a12b:free` (OpenRouter)
- **Strengths:** 80.2% SWE-Bench (top free model), 120B params, strong reasoning
- **Best for:** Orchestrator, code review, complex analysis, general intelligence
- **Limits:** ~20 req/min, ~200 req/day (typical free tier)
- **Provider:** OpenRouter (your existing key works)

### 🥈 QWEN 2.5 CODER 32B — #1 for pure code
- **Model ID:** `qwen/qwen-2.5-coder-32b-instruct:free` (OpenRouter)
- **Strengths:** Specialized for code, tool use, debugging
- **Best for:** Code generation, API orchestration, automation scripts
- **Limits:** ~20 req/min, ~200 req/day
- **Provider:** OpenRouter

### 🥉 DEEPSEEK V3 — #1 for reasoning + long context
- **Model ID:** `deepseek/deepseek-chat-v3-0324:free` (OpenRouter)
- **Strengths:** 671B MoE, excellent at math/reasoning, 64K context
- **Best for:** Build Master (proposals), complex research, planning
- **Limits:** ~20 req/min, ~50 req/day (limited free tier)
- **Provider:** OpenRouter

### 🏅 GEMINI 2.5 FLASH — #1 for multimodal (vision)
- **Model ID:** `google/gemini-2.5-flash` (direct API) or `:free` (OpenRouter)
- **Strengths:** Vision (chart analysis), fast, multimodal
- **Best for:** Crypto Sage (chart reading), Truth Seeker (content with images)
- **Limits:** Direct API = 15 RPM, 1M TPM, **1500 req/day** (great!)
- **Provider:** Direct (use GEMINI_API_KEY) or OpenRouter

### 🏅 DEEPSEEK R1 — #1 for reasoning chains
- **Model ID:** `deepseek/deepseek-r1:free` (OpenRouter)
- **Strengths:** Shows reasoning process, deep analysis
- **Best for:** Truth Seeker (research), Build Master (proposal analysis)
- **Limits:** ~20 req/min
- **Provider:** OpenRouter

### 🏅 LLAMA 3.3 70B — #1 for general + creative
- **Model ID:** `meta-llama/llama-3.3-70b-instruct:free` (OpenRouter)
- **Strengths:** Strong general, good creative writing
- **Best for:** Truth Seeker (content), general fallback
- **Limits:** ~20 req/min, ~200 req/day
- **Provider:** OpenRouter

### 🏅 QWEN 2.5 72B — #1 for long context
- **Model ID:** `qwen/qwen-2.5-72b-instruct:free` (OpenRouter)
- **Strengths:** 128K context window, strong multilingual
- **Best for:** Build Master (long proposals), documents
- **Limits:** ~20 req/min, ~200 req/day
- **Provider:** OpenRouter

---

## 🛡️ TIER 2: SPECIALIZED + FALLBACKS

| Model | Provider | Strength | Use as |
|-------|----------|----------|--------|
| `google/gemini-2.0-flash-exp:free` | OpenRouter | Fast, free, multimodal | Fallback for crypto_sage |
| `mistralai/mistral-small-3.1-24b-instruct:free` | OpenRouter | Creative, multilingual | Fallback for truth_seeker |
| `meta-llama/llama-3.1-8b-instruct:free` | OpenRouter | Fast, lightweight | Light fallback |
| `openai/gpt-oss-120b:free` | OpenRouter | OpenAI's open model | General fallback |
| `google/gemini-2.5-flash-8b` | Gemini API | Fast, 500 req/day free | High-volume fallback |
| `ollama/llama3.1:8b` | Local | Privacy, offline | Privacy + last-resort fallback |
| `ollama/qwen2.5-coder:7b` | Local | Code, offline | Code privacy fallback |
| `ollama/mistral:7b` | Local | General, offline | General privacy fallback |
| `ollama/deepseek-r1:8b` | Local | Reasoning, offline | Reasoning privacy fallback |

---

## 📊 RATE LIMIT CHEAT SHEET

| Provider | Typical Free Limits | Reset |
|----------|---------------------|-------|
| **OpenRouter `:free` models** | 20 req/min, 50-200 req/day | Daily UTC midnight |
| **Google Gemini API** | 15 RPM, 1M TPM, 1500 RPD | Daily midnight PT |
| **Groq** | 30 RPM, 30K TPM | Per-minute rolling |
| **Cerebras** | 30 RPM, 60K TPM | Per-minute rolling |
| **DeepSeek direct** | $5 free credit (one-time) | One-time |
| **Ollama local** | Unlimited (hardware-bound) | Never |

**Practical budget across 7 clones (daily):**
- 7 clones × 20 req/min each = 140 req/min (over OpenRouter limit alone)
- **Solution:** Stagger cron jobs + use local Ollama for high-volume

---

## 🐼 THE 7 PROFILES — FINAL MODEL ASSIGNMENTS

### 🦊 naruto_main (Orchestrator)
```yaml
default: nvidia/nemotron-3-super-120b-a12b:free   # Best overall
fallback_chain:
  - deepseek/deepseek-chat-v3-0324:free            # Strong reasoning
  - qwen/qwen-2.5-72b-instruct:free                # Long context
  - ollama/llama3.1:8b                             # Always works
reason: "Orchestrator needs top reasoning + tool use"
```

### 📈 crypto_sage (Market analysis, vision)
```yaml
default: google/gemini-2.5-flash                   # Vision + speed
fallback_chain:
  - google/gemini-2.0-flash-exp:free               # Free + multimodal
  - nvidia/nemotron-3-super-120b-a12b:free         # Strong fallback
  - ollama/llama3.1:8b                             # Local last-resort
reason: "Needs vision (chart reading) + speed for daily scans"
```

### ⚡ code_ninja (Code-first)
```yaml
default: qwen/qwen-2.5-coder-32b-instruct:free     # Best free code
fallback_chain:
  - nvidia/nemotron-3-super-120b-a12b:free         # 80.2% SWE-Bench
  - deepseek/deepseek-chat-v3-0324:free            # Strong general
  - ollama/qwen2.5-coder:7b                        # Local code
reason: "Code is the #1 priority — use best free code model"
```

### 💎 marjahans_merchant (PRIVACY 🔒)
```yaml
default: ollama/llama3.1:8b                        # LOCAL — privacy
fallback_chain:
  - ollama/mistral:7b                              # LOCAL — alternative
  - ollama/llama3.2:3b                             # LOCAL — lightweight
  - google/gemini-2.5-flash                        # CLOUD — non-sensitive only
reason: "Customer data NEVER leaves machine. Cloud is last-resort."
```

### 🔥 snaptrap_stylist (PRIVACY 🔒)
```yaml
default: ollama/llama3.1:8b                        # LOCAL — privacy
fallback_chain:
  - ollama/mistral:7b                              # LOCAL — alternative
  - ollama/llama3.2:3b                             # LOCAL — lightweight
  - meta-llama/llama-3.3-70b-instruct:free         # CLOUD — for trend research
reason: "Drop plans stay local. Cloud only for non-sensitive trend research."
```

### 🏗️ build_master (Long context proposals)
```yaml
default: qwen/qwen-2.5-72b-instruct:free           # 128K context
fallback_chain:
  - deepseek/deepseek-chat-v3-0324:free            # Long context + reasoning
  - nvidia/nemotron-3-super-120b-a12b:free         # Strong fallback
  - ollama/llama3.1:8b                             # Local last-resort
reason: "Proposals are long — need big context window"
```

### 🦉 truth_seeker (Research + creative)
```yaml
default: deepseek/deepseek-r1:free                 # Reasoning chains
fallback_chain:
  - meta-llama/llama-3.3-70b-instruct:free         # Creative
  - nvidia/nemotron-3-super-120b-a12b:free         # General strong
  - ollama/llama3.1:8b                             # Local
reason: "Research needs reasoning chains + creative writing"
```

---

## 💡 KEY DESIGN DECISIONS

1. **Different best model per task** — Qwen Coder for code, Gemini for vision, DeepSeek R1 for reasoning, Qwen 72B for long context
2. **3-step fallback chain per profile** — if default rate-limited, try free alternatives
3. **Local Ollama ALWAYS in chain** — never gets rate-limited, works offline
4. **Marjahans + SnapTrap default LOCAL** — privacy is non-negotiable
5. **OpenRouter as primary** — one API key, 50+ free models

---

## 🔧 ENVIRONMENT SETUP

```bash
# ~/.hermes/.env (shared across profiles)
OPENAI_API_KEY=<your-openrouter-key>     # OpenRouter access
GEMINI_API_KEY=<your-gemini-key>         # Direct Gemini access

# Optional, for more platforms:
GROQ_API_KEY=<your-groq-key>             # Groq fast inference
DEEPSEEK_API_KEY=<your-deepseek-key>     # Direct DeepSeek
```

**Minimum:** Just `OPENAI_API_KEY` + `GEMINI_API_KEY` gives you access to all the models in this reference.

---

## ✅ VERIFICATION STEPS

After deploying, verify each model:

```bash
# Test OpenRouter free models
hermes chat -p nvidia/nemotron-3-super-120b-a12b:free -q "Test"
hermes chat -p qwen/qwen-2.5-coder-32b-instruct:free -q "Test"
hermes chat -p deepseek/deepseek-chat-v3-0324:free -q "Test"

# Test direct Gemini
hermes chat -p google/gemini-2.5-flash -q "Test"

# Test local Ollama
hermes chat -p ollama/llama3.1:8b -q "Test"
hermes chat -p ollama/qwen2.5-coder:7b -q "Test"
```

**If a model 404s** (renamed/deprecated), update the profile YAML and re-deploy.

---

## 🐛 KNOWN PITFALLS

| Pitfall | Fix |
|---------|-----|
| OpenRouter `:free` rate-limited at peak | Cron stagger so clones don't all hit at 9 AM |
| Gemini API quota reset is daily PT, not UTC | Plan around reset time |
| DeepSeek free credits expire | Use sparingly, default to OpenRouter |
| Ollama models not pulled | `ollama pull llama3.1:8b` first |
| Some `:free` models have low daily caps (50/day) | Have 3-step fallback chain |
| Model deprecation happens | Verify with `hermes model` after deploy |

---

## 📈 COST COMPARISON

| Setup | Monthly Cost (Heavy Use) |
|-------|--------------------------|
| All Claude 3.5 Sonnet | ~$200-500 |
| All GPT-4o | ~$150-400 |
| **All Free (this config)** | **$0** |
| **Hybrid (Free + privacy local)** | **$0** |

**You save $200-500/month** by using the right free model per task.

---

## 🐼 TL;DR

- **Default:** Best free model per task (Nemotron/Qwen Coder/Gemini/DeepSeek)
- **Fallback:** 3-step chain of other free models
- **Privacy:** Local Ollama for 2 customer-facing clones
- **Cost:** $0/month
- **Verify after deploy:** Some model IDs may have changed since Jan 2026

📁 **This file:** `H:\DevJourney\ShadowClones\FREE_MODELS_REFERENCE.md`
🔧 **Profiles updated:** All 7 YAML configs reflect these defaults
🧪 **Test:** Run `node test-system.cjs` after deploy
