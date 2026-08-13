# 🆓 FREE AI MODELS — COMPLETE REFERENCE
**All platforms, all free tiers, best models per task**
**Date:** June 7, 2026
**Status:** Live research from Hermes model caches + training data

---

## 🔑 YOUR EXISTING API KEYS

From your `.env`:

| Key | Status | Provider |
|-----|--------|----------|
| `GEMINI_API_KEY` | ✅ **Working** | Google Gemini (250+ req/day free) |
| `OPENROUTER_API_KEY` | ✅ Has key | OpenRouter (free models work with $0 balance) |
| `OPENCODE_ZEN_API_KEY` | ✅ Has key | OpenCode Zen (free tier available) |
| `KIMI_API_KEY` | ✅ Has key | Moonshot/Kimi (free tier) |
| `XAI_API_KEY` | ✅ Has key | xAI/Grok (limited free) |
| `GOOGLE_API_KEY` | ✅ Has key | Google AI Studio |
| `GITHUB_TOKEN` | ✅ Has key | GitHub Copilot API / Models |

---

## 📋 ALL FREE MODELS (By Provider)

### 1️⃣ OPENROUTER (`:free` suffix models)
**API Base:** `https://openrouter.ai/api/v1`
**Auth:** Your OPENROUTER_API_KEY (works at $0 balance for `:free` models)
**Rate limits:** Varies by model. ~20-60 RPM for free tier.

#### Best Free Models via OpenRouter:

| Model ID | Parameters | Best For | Quality |
|----------|-----------|----------|---------|
| `nvidia/nemotron-3-super-120b-a12b:free` | 120B | **General reasoning, coding, analysis** | ⭐⭐⭐⭐⭐ |
| `meta-llama/llama-3.3-70b-instruct:free` | 70B | General tasks, writing | ⭐⭐⭐⭐ |
| `google/gemini-2.5-flash-lite:free` | - | **Fast, cheap, vision-capable** | ⭐⭐⭐⭐ |
| `deepseek/deepseek-r1:free` | 671B (MoE) | **Complex reasoning, math, logic** | ⭐⭐⭐⭐⭐ |
| `qwen/qwen-2.5-coder-32b-instruct:free` | 32B | **Code generation** | ⭐⭐⭐⭐⭐ |
| `qwen/qwen2.5-vl-72b-instruct:free` | 72B | **Vision + code** | ⭐⭐⭐⭐ |
| `qwen/qwen3-next-80b-a3b-instruct:free` | 80B | Next-gen Qwen | ⭐⭐⭐⭐⭐ |
| `qwen/qwen3-coder:free` | - | Coding (newest) | ⭐⭐⭐⭐⭐ |
| `nousresearch/hermes-3-llama-3.1-405b:free` | 405B | **Highest quality free** | ⭐⭐⭐⭐⭐ |
| `nvidia/nemotron-3-ultra-550b-a55b:free` | 550B | Ultra-quality | ⭐⭐⭐⭐⭐ |
| `google/gemma-4-31b-it:free` | 31B | Google open model | ⭐⭐⭐⭐ |
| `google/gemma-4-26b-a4b-it:free` | 26B | Lightweight task | ⭐⭐⭐⭐ |
| `openai/gpt-oss-120b:free` | 120B | OpenAI's open model | ⭐⭐⭐⭐ |
| `z-ai/glm-4.5-air:free` | - | Chinese + English | ⭐⭐⭐⭐ |
| `moonshotai/kimi-k2.6:free` | - | Long context (128K+) | ⭐⭐⭐⭐ |
| `liquid/lfm-2.5-1.2b-thinking:free` | 1.2B | **Ultra fast tiny model** | ⭐⭐ |

**⚠️ Issue with OpenRouter free models:** Since you said your OpenRouter key may have $0 credits, the `:free` models should still work — OpenRouter allows free models even with $0 balance. But `nvidia/nemotron-3-super-120b-a12b:free` is the safest bet (it's in the cache as working).

---

### 2️⃣ OPENCODE ZEN (Your API key exists)
**API Base:** `https://api.opencode-zen.com/v1`
**Models available (46 total in cache):**

#### Free-tier models (suffix: `-free`):

| Model ID | Best For | Quality |
|----------|----------|---------|
| `minimax-m3-free` | **General, reasoning** | ⭐⭐⭐⭐ |
| `deepseek-v4-flash-free` | **Fast reasoning** | ⭐⭐⭐⭐ |
| `mimo-v2.5-free` | General tasks | ⭐⭐⭐ |
| `qwen3.6-plus-free` | Qwen latest | ⭐⭐⭐⭐⭐ |
| `nemotron-3-ultra-free` | **Top-tier quality** | ⭐⭐⭐⭐⭐ |
| `nemotron-3-super-free` | **Super quality** | ⭐⭐⭐⭐⭐ |

**Your main config already uses:** `minimax-m3-free` via OpenCode Zen

**Tip:** OpenCode Zen's free models with suffix `-free` are the best starting point. Try `nemotron-3-ultra-free` if you need higher quality.

---

### 3️⃣ GOOGLE GEMINI (✅ **Confirmed Working — 250 req/day free**)
**API Base:** `https://generativelanguage.googleapis.com/v1beta`
**Auth:** GEMINI_API_KEY (or GOOGLE_API_KEY)

#### Free Tier Models:

| Model | Rate Limits | Best For |
|-------|------------|----------|
| `gemini-2.5-flash-lite` | 250 req/day, 1M TPM | **Daily driver — good enough for 80% of tasks** 🏆 |
| `gemini-2.5-flash` | 250 req/day, 1M TPM | Better reasoning + vision |
| `gemini-2.5-pro` | 50 req/day, 1M TPM | Maximum quality (rate limited) |
| `gemini-3-flash-preview` | Preview tier | Latest Gemini (may change) |
| `gemini-3.1-flash-lite` | 250 req/day | Newer flash-lite |

**This is your most reliable API.** Use it as the primary for all clones.

---

### 4️⃣ XAI / GROK (Your XAI_API_KEY exists)
**API Base:** `https://api.x.ai/v1`
**Auth:** XAI_API_KEY

**Free tier:** X provides limited free API usage. Known models:
| Model | Best For |
|-------|----------|
| `grok-4.3` | General reasoning |
| `grok-build-0.1` | Code/build tasks |
| `grok-4.20-0309-reasoning` | Deep reasoning (if available) |

**Limitation:** Free tier may have very low rate limits. ~20 requests/day.

---

### 5️⃣ KIMI / MOONSHOT (Your KIMI_API_KEY exists)
**API Base:** `https://api.moonshot.cn/v1`
**Auth:** KIMI_API_KEY

**Free tier:** Moonshot offers up to 100K tokens/day free with their models.
| Model | Context | Best For |
|-------|---------|----------|
| `kimi-k2.6` | 128K | **Long documents, research** |
| `kimi-k2.5` | 128K | Long context tasks |
| `moonshot-v1-128k` | 128K | Max context |
| `moonshot-v1-auto` | Auto | Smart routing |

---

### 6️⃣ GROQ (No key yet — should add)
**Website:** `https://console.groq.com`
**Free tier:** No credit card required. 30 RPM, 14,400 RPD.

| Model | Best For | Notes |
|-------|----------|-------|
| `llama-3.3-70b-versatile` | General, reasoning | Very fast |
| `llama-3.1-8b-instant` | Fast/light tasks | 800+ tok/s |
| `mixtral-8x7b-32768` | Strong Mixtral | 32K context |
| `gemma2-9b-it` | Google Gemma | Compact |
| `deepseek-r1-distill-llama-70b` | Reasoning | Distilled |

**Recommendation:** Sign up for Groq — it's the 2nd most reliable free tier after Gemini.

---

### 7️⃣ CLOUDFLARE WORKERS AI (No key yet)
**Website:** `https://ai.cloudflare.com`
**Free tier:** 10,000 requests/day, no credit card needed.

| Model | Best For |
|-------|----------|
| `@cf/meta/llama-3.3-70b-instruct-fp8` | General |
| `@cf/deepseek/deepseek-r1-distill-qwen-32b` | Reasoning |
| `@cf/qwen/qwen2.5-coder-32b-instruct` | Code |
| `@cf/google/gemma-2-27b-it` | General |

**Recommendation:** Sign up — 10K/day is generous.

---

### 8️⃣ HUGGING FACE INFERENCE API (Free tier)
**Website:** `https://huggingface.co/inference-api`
**Free tier:** 30K input characters/month (limited, but useful for small tasks)

| Model | Best For |
|-------|----------|
| `meta-llama/Llama-3.3-70B-Instruct` | General |
| `mistralai/Mistral-7B-Instruct-v0.3` | Small tasks |

---

### 9️⃣ DEEPSEEK DIRECT API (No key yet)
**Website:** `https://platform.deepseek.com`
**Free tier:** 5M tokens one-time for new users (promotional)

| Model | Best For |
|-------|----------|
| `deepseek-chat` | General reasoning |
| `deepseek-reasoner` | Math, logic, complex |

---

### 🔟 TOGETHER AI (No key yet, limited free)
**Website:** `https://api.together.xyz`
**Free tier:** $1 free credits one-time (not ongoing)

---

## 🏆 THE BEST FREE MODELS PER TASK

| Task | Best Model (Free) | Via | Why |
|------|-------------------|-----|-----|
| **General reasoning** | `gemini-2.5-flash-lite` | Google | 250 req/day, working now |
| **Complex reasoning** | `deepseek/deepseek-r1:free` | OpenRouter | Chain-of-thought specialist |
| **Code generation** | `qwen/qwen3-coder` or `qwen-2.5-coder-32b-instruct:free` | OpenRouter | Top coding benchmarks |
| **Vision / Image** | `gemini-2.5-flash` | Google | Native vision, works great |
| **Long context** | `moonshotai/kimi-k2.6:free` (128K) | OpenRouter | Best free long-context |
| **Ultra quality** | `nousresearch/hermes-3-llama-3.1-405b:free` | OpenRouter | 405B, highest quality |
| **Super fast** | `gemini-2.5-flash-lite` | Google | Sub-second responses |
| **Privacy (local)** | `llama3.1:8b` | Ollama (once installed) | No data leaves your PC |
| **Writing/creative** | `meta-llama/llama-3.3-70b-instruct:free` | OpenRouter | Creative writing specialist |
| **Crypto analysis** | `google/gemini-2.5-flash-lite` | Google | Chart vision + analysis |

---

## ⚡ API SETUP PLAN

### Step 1: What You Already Have Working
```yaml
# In naruto_main config
model:
  default: gemini-2.5-flash-lite
  provider: google   # ✅ Confirmed working
```

### Step 2: Add OpenRouter Free Models as Fallback
```yaml
# Add to config.yaml
fallback_providers:
  - openrouter   # Will use :free models when Gemini rate-limited
```

### Step 3: Test OpenRouter Free Models
```bash
# Quick test — these should work even with $0 balance
hermes -P openrouter -m nvidia/nemotron-3-super-120b-a12b:free -q "ping"
hermes -P openrouter -m deepseek/deepseek-r1:free -q "ping"
hermes -P openrouter -m qwen/qwen-2.5-coder-32b-instruct:free -q "ping"
```

### Step 4: Test OpenCode Zen Free Models
```bash
# Test the free tier
hermes -P opencode-zen -m minimax-m3-free -q "ping"
hermes -P opencode-zen -m nemotron-3-super-free -q "ping"
```

### Step 5: Test xAI Free
```bash
hermes -P xai -m grok-build-0.1 -q "ping"
```

### Step 6: Add New Platforms (Recommended)
```bash
# Sign up for these — no credit card needed:
# 1. Groq (groq.com) → 14,400 req/day free
# 2. Cloudflare Workers AI → 10,000 req/day free
# 3. DeepSeek (platform.deepseek.com) → 5M tokens welcome
```

---

## 🔄 RECOMMENDED MODEL ARCHITECTURE

After testing which free models work, set up this priority chain:

```
┌──────────────────────────────────────────────────┐
│                  CLONE's MODEL                    │
├──────────────────────────────────────────────────┤
│                                                   │
│  1st choice:  Primary model (per clone's task)    │
│       ↓ (rate limited or down)                    │
│  2nd choice:  gemini-2.5-flash-lite (reliable)    │
│       ↓ (rate limited)                            │
│  3rd choice:  OpenRouter :free model              │
│       ↓ (rate limited)                            │
│  4th choice:  OpenCode Zen free model             │
│       ↓ (all cloud down)                          │
│  5th choice:  Ollama local (once installed)       │
│                                                   │
└──────────────────────────────────────────────────┘
```

### Proposed Assignment Per Clone:

| Clone | Primary | Fallback 1 | Fallback 2 |
|-------|---------|-----------|------------|
| **naruto_main** (orchestrator) | Gemini 2.5 flash lite | OpenRouter `nemotron:free` | OpenCode Zen `minimax-m3-free` |
| **crypto_sage** (charts) | Gemini 2.5 flash lite (has vision) | Gemini 2.5 flash | OpenRouter `qwen3-coder:free` |
| **code_ninja** (code) | OpenRouter `qwen-2.5-coder-32b-instruct:free` | Gemini 2.5 flash lite | OpenCode Zen `nemotron-3-ultra-free` |
| **build_master** (proposals) | Gemini 2.5 flash lite | OpenRouter `deepseek-r1:free` | OpenCode Zen `mimo-v2.5-free` |
| **truth_seeker** (deep research) | OpenRouter `deepseek-r1:free` | Gemini 2.5 flash lite | OpenRouter `llama-3.3-70b:free` |
| **marjahans_merchant** 🧊 | [FROZEN] Ollama (when unfrozen) | - | - |
| **snaptrap_stylist** 🧊 | [FROZEN] Ollama (when unfrozen) | - | - |

---

## 🎯 FIRST STEPS (To Test + Activate)

1. **Test all 3 API keys** you already have:
   ```bash
   hermes -P google -m gemini-2.5-flash-lite -q "ping"  # should work
   hermes -P openrouter -m nvidia/nemotron-3-super-120b-a12b:free -q "ping"
   hermes -P opencode-zen -m minimax-m3-free -q "ping"
   hermes -P xai -m grok-build-0.1 -q "ping"
   hermes -P kimi-coding -m kimi-k2.6 -q "ping"
   ```

2. **Sign up for Groq** (no CC needed): `https://console.groq.com`
3. **Sign up for Cloudflare Workers AI** (no CC needed): `https://ai.cloudflare.com`
4. **Add their API keys** to your `.env`
5. **Update fallback chains** in each profile's `config.yaml`

---

## ⚠️ IMPORTANT NOTES

- **Only Gemini is verified working right now.** OpenRouter, OpenCode Zen, xAI, and Kimi might work or might need key refills.
- **The `:free` suffix on OpenRouter** should work at $0 balance. If not, test with `nvidia/nemotron-3-super-120b-a12b:free` first.
- **OpenCode Zen free models** have `-free` suffix (e.g., `nemotron-3-ultra-free`). Your current default `minimax-m3-free` may or may not work — needs testing.
- **xAI free tier** is very limited. Don't rely on it.
- **Install Ollama** for the privacy clones when unfrozen.
