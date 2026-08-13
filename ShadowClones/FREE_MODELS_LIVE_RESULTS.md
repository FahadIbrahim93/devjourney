# 🆓 FREE MODELS — LIVE TEST RESULTS
**Date:** June 8, 2026 (2:00 AM)
**Method:** `hermes chat -q "reply with just: OK" -Q` against each model

---

## ✅ VERIFIED WORKING (Configured & Ready)

| # | Provider | Model | Type | Notes |
|---|----------|-------|------|-------|
| 1 | `google` | `gemini-2.5-flash-lite` | Free (250 req/day) | **✅ PRIMARY** — Fast, reliable, vision-capable |
| 2 | `opencode-zen` | `nemotron-3-ultra-free` | Free | **✅ FALLBACK 1** — Nemotron Ultra quality |
| 3 | `opencode-zen` | `nemotron-3-super-free` | Free | **✅ AVAILABLE** — Nemotron Super quality |
| 4 | `opencode-zen` | `deepseek-v4-flash-free` | Free | **✅ FALLBACK 2** — DeepSeek V4 Flash, fast |
| 5 | `opencode-zen` | `mimo-v2.5-free` | Free | **✅ AVAILABLE** — Xiaomi MiMo V2.5 |

## ❌ NOT WORKING (Need Action)

| # | Provider | Model | Error | Fix Needed |
|---|----------|-------|-------|------------|
| 6 | `openrouter` | `:free` models (all) | 404: privacy restrictions | Go to openrouter.ai/settings/privacy, adjust data policy |
| 7 | `openrouter` | Paid models | 402: insufficient credits | Purchase credits at openrouter.ai/settings/credits |
| 8 | `xai` | `grok-4.3`, `grok-build-0.1` | 403: no credits | Add credits at console.x.ai/team/... |
| 9 | `kimi-coding` | `kimi-k2.6`, `moonshot-v1-auto` | 429: account suspended | Recharge Moonshot/Kimi account |
| 10 | `opencode-zen` | `minimax-m3-free` | 401: promotion ended | Promotion expired |
| 11 | `opencode-zen` | `qwen3.6-plus-free` | 401: promotion ended | Promotion expired |
| 12 | `opencode-zen` | Non-free models | 401: no payment | Add payment method |

---

## 🔧 CURRENT CONFIGURATION

### Fallback Chain (set via `hermes fallback list`):
```
Primary:   gemini-2.5-flash-lite  (via google)    ✅ Working
Fallback 1: nemotron-3-ultra-free  (via opencode-zen) ✅ Working
Fallback 2: deepseek-v4-flash-free  (via opencode-zen) ✅ Working
```

### Naruto Main Profile Config:
- Model: `gemini-2.5-flash-lite`
- Provider: `google`
- Fallback chain: OpenCode Zen (Nemotron Ultra → DeepSeek V4 Flash)

---

## 🎯 BEST FREE MODELS PER USE CASE

| Use Case | Best Free Model | Via | Tested? |
|----------|----------------|-----|---------|
| **General daily driver** | `gemini-2.5-flash-lite` | Google | ✅ Yes |
| **Complex reasoning** | `nemotron-3-ultra-free` | OpenCode Zen | ✅ Yes |
| **Fast coding** | `deepseek-v4-flash-free` | OpenCode Zen | ✅ Yes |
| **Vision/charts** | `gemini-2.5-flash-lite` (has vision) | Google | ✅ Yes |
| **General (backup)** | `mimo-v2.5-free` | OpenCode Zen | ✅ Yes |
| **Super quality (backup)** | `nemotron-3-super-free` | OpenCode Zen | ✅ Yes |

---

## 🚀 NEXT STEPS (In Priority Order)

### Step 1: Fix OpenRouter (5 min)
Go to https://openrouter.ai/settings/privacy and adjust guardrail/data policy settings.
After that, test:
```bash
hermes chat --provider openrouter -m nvidia/nemotron-3-super-120b-a12b:free -q "ping" -Q
```
If it works, add to fallback:
```yaml
fallback_providers:
  - {provider: opencode-zen, model: nemotron-3-ultra-free}
  - {provider: opencode-zen, model: deepseek-v4-flash-free}
  - {provider: openrouter, model: nvidia/nemotron-3-super-120b-a12b:free}  # ADD THIS
```

### Step 2: Sign Up for Groq (no CC)
https://console.groq.com → Get API key → Add to `.env` as `GROQ_API_KEY`
Then 14,400 req/day free: Llama 3.3 70B, DeepSeek R1, Mixtral

### Step 3: Sign Up for Cloudflare Workers AI (no CC)
https://ai.cloudflare.com → Get API key → Add to `.env`
Then 10,000 req/day free: Llama 3.3 70B, Qwen Coder, DeepSeek

### Step 4: Test All Working Models
```bash
# Quick verification script
hermes chat --provider google -m gemini-2.5-flash-lite -q "reply with just: OK" -Q
hermes chat --provider opencode-zen -m nemotron-3-ultra-free -q "reply with just: OK" -Q
hermes chat --provider opencode-zen -m deepseek-v4-flash-free -q "reply with just: OK" -Q
hermes chat --provider opencode-zen -m mimo-v2.5-free -q "reply with just: OK" -Q
hermes chat --provider opencode-zen -m nemotron-3-super-free -q "reply with just: OK" -Q
```

---

## 💰 Cost Summary

| Provider | Monthly Cost | Requests/Day | Quality |
|----------|-------------|-------------|---------|
| Google Gemini | **$0** | 250 req/day | ⭐⭐⭐⭐ |
| OpenCode Zen (free models) | **$0** | Unknown (likely 100-500) | ⭐⭐⭐⭐⭐ |
| Groq (if added) | **$0** | 14,400 req/day | ⭐⭐⭐⭐ |
| Cloudflare (if added) | **$0** | 10,000 req/day | ⭐⭐⭐ |

**Total monthly AI cost: $0** with 3 verified working providers.
