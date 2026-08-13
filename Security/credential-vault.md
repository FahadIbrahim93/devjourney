# 🔐 Hermes Agent — Credential Vault

**Profile:** code_ninja  
**Created:** 2026-06-12  
**Purpose:** Central reference for all API keys/tokens across the AI agent ecosystem.

---

## 🟢 WORKING CREDENTIALS

### 1. GitHub — Keyring Auth
- **Token:** gho_*** (keyring, via `gh` CLI)
- **Status:** ✅ Active — repo, workflow, gist scopes

### 2. Nous Research — OAuth Device Code
- **Access Token:** ✅ Full 1437-char JWT (short-lived ~hourly)
- **Config:** `auth.json → providers.nous`

### 3. xAI / Grok — OAuth PKCE
- **User:** shafkatkarim777@gmail.com  
- **Status:** ⚠️ Refresh token shows `invalid_grant` — may need relogin
- **Config:** `auth.json → providers.xai-oauth`

### 4. Ollama — Local LLMs (No Auth)
- qwen3.5:2b, qwen3.5:4b, qwen3.5:0.8b, qwen2.5-coder:3b

---

## 🟡 PARTIAL / NEEDS ATTENTION

### 5. OpenRouter API Key
- `sk-or-...ad5a` (truncated in OpenClaude profile)
- Base: `https://openrouter.ai/api/v1`
- Slot: `auth.json → credential_pool.openrouter`

### 6. Tavily API Key
- `tvly-d...WbSH` (partially visible in `.env`)

---

## 🔴 BROKEN / MISSING

| Provider | Issue |
|----------|-------|
| OpenCode Zen | 401 — free promotion ended |
| Gemini API Key | Stored as `***` placeholder |
| xAI Refresh | Token revoked — needs manual OAuth relogin |
| Supabase Anon Key | Truncated in `.env` |

---

## ⚙️ RECOMMENDED PROVIDER CHAIN
1. **openrouter** → `nemotron-3-super-120b-a12b:free` (primary)
2. **ollama** → `qwen3.5:4b` (local fallback)
3. **google** → `gemini-2.5-flash` (if key restored)

---

**⚠️ Masked reference only. Full keys in OS keychain.**
