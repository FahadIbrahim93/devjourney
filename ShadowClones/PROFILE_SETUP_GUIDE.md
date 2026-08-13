# 🐼 SHADOW CLONE JUTSU — Profile Setup Guide
**For:** Fahad Ibrahim
**Date:** June 6, 2026
**Status:** Ready to deploy

---

## 🎯 WHAT YOU'RE BUILDING

7 isolated Hermes profiles, each with:
- Custom model (right tool for the job)
- Custom toolsets (least privilege)
- Custom skills (6 per clone, 36 total)
- Custom memory (isolated by default)
- Custom cron (per-clone daily rhythm)
- Privacy mode (Ollama local for customer data)

---

## 📦 FILES IN THIS DIRECTORY

```
H:\DevJourney\ShadowClones\profiles\
├── naruto_main.yaml            # Digital twin (your main profile)
├── crypto_sage.yaml            # [CRYPTO] - Gemini Flash
├── code_ninja.yaml             # [CODE] - Claude 3.5 + Ollama hybrid
├── marjahans_merchant.yaml     # [MARJAHANS] - Ollama 100% local
├── snaptrap_stylist.yaml       # [SNAPTRAP] - Ollama 100% local
├── build_master.yaml           # [BUILD] - Kimi 128K
└── truth_seeker.yaml           # [PHILO] - xAI Grok 2

H:\DevJourney\ShadowClones\
├── setup_profiles.sh           # Linux/Mac/WSL one-shot setup
├── setup_profiles.bat          # Windows one-shot setup
└── test_profiles.sh            # Verify all 7 work
```

---

## 🚀 3-MIN DEPLOYMENT

### Option 1: Windows (Recommended for you)
```cmd
cd H:\DevJourney\ShadowClones
setup_profiles.bat
```

### Option 2: Git-bash / WSL
```bash
cd /h/DevJourney/ShadowClones
bash setup_profiles.sh
```

This will:
1. Create all 7 profiles
2. Deploy config.yaml to each
3. Create skills/memories directories
4. Set naruto_main as sticky default
5. Configure cron jobs

---

## 🧪 VERIFY

```bash
bash test_profiles.sh
```

---

## 🎯 THE 7 PROFILES (CHEAT SHEET)

| Profile | Model | Privacy | Use For |
|---------|-------|---------|---------|
| `naruto_main` | Claude 3.5 Sonnet | None (orchestrator) | Coordination, complex tasks |
| `crypto_sage` | Gemini 2.5 Flash | None | Market analysis, charts |
| `code_ninja` | Claude 3.5 + Ollama | None | Code, AI, freelance |
| `marjahans_merchant` | Ollama Llama 3.1 8B | **STRICT** | Customer data, jewelry |
| `snaptrap_stylist` | Ollama Llama 3.1 8B | **STRICT** | Drop plans, streetwear |
| `build_master` | Kimi 128K | None | Proposals, real estate |
| `truth_seeker` | xAI Grok 2 | None | Content, philosophy |

---

## 🔐 PRIVACY MODEL (Why This Matters)

**3 tiers:**

1. **Orchestrator (Naruto_Main)** — Full access, sees everything
2. **Specialized (Crypto, Code, Build, Truth)** — Cloud models, OK
3. **Customer-facing (Marjahans + Snaptrap)** — **LOCAL ONLY**

For Marjahans + Snaptrap, the model NEVER sends:
- Customer PII
- Order details
- Revenue data
- Supplier info
- Pricing strategy
- Design files

If Ollama isn't running, those profiles will **fall back** to Gemini Flash with a warning.

---

## 💰 MONTHLY COST (Estimated)

| Profile | Model | Cost/Month |
|---------|-------|-----------|
| naruto_main | Claude 3.5 Sonnet | $30-50 |
| crypto_sage | Gemini Flash | $0-5 (free tier) |
| code_ninja | Hybrid (Sonnet + Ollama) | $20-40 |
| marjahans_merchant | Ollama LOCAL | **$0** |
| snaptrap_stylist | Ollama LOCAL | **$0** |
| build_master | Kimi 128K | $5-15 |
| truth_seeker | Grok 2 | $10-20 |
| **TOTAL** | | **$65-130** |

If budget is tight, switch naruto_main to Ollama too (free).

---

## ⚙️ CRON SCHEDULE (The Daily Rhythm)

```
9:00 AM  - crypto_sage:  Market check, log 3 chart patterns
9:30 AM  - naruto_main:  Run daily synthesis
10:00 AM - marjahans:    Inventory check
11:00 AM - snaptrap:     Culture scan
12:00 PM - truth_seeker: Post thread
2:00 PM  - marjahans:    IG engagement
6:00 PM  - crypto_sage:  Weekly sentiment (Sun)
9:00 PM  - snaptrap:     Weekly community (Wed)
10:00 PM - naruto_main:  Memory consolidation
```

---

## 🐛 TROUBLESHOOTING

| Issue | Fix |
|-------|-----|
| `hermes: command not found` | Reinstall: `curl -fsSL https://hermes-agent.nousresearch.com/install.sh \| bash` |
| Profile creation fails | Make sure no spaces in profile names |
| Ollama not responding | `ollama serve` in another terminal |
| Cron not firing | `hermes cron list` to check, then `hermes cron run <id>` to test |
| Skills missing | `hermes -p <name> skills install <skill>` |
| Memory not isolated | Verify config has `memory_path` per profile |

---

## 🚀 FIRST 30 MINUTES AFTER SETUP

```bash
# 1. Verify install
hermes doctor

# 2. Test each profile (5 min)
hermes -p crypto_sage chat -q "Test"
hermes -p marjahans_merchant chat -q "Test"
hermes -p naruto_main chat -q "Test"

# 3. Initialize Kanban board (5 min)
hermes kanban init
hermes kanban create "First BTC analysis" --assign crypto_sage

# 4. Start Ollama (5 min)
ollama serve
ollama pull llama3.1:8b

# 5. First synthesis (10 min)
hermes -p naruto_main
# Then: "Run /h/DevJourney/ShadowClones/daily-synthesis.js synthesize"
```

---

## 🎯 90-DAY EVOLUTION

| Week | Action |
|------|--------|
| 1-2 | Spawn all 7, test daily rhythm, refine skills |
| 3-4 | Add MCP servers, build first cross-profile task |
| 5-8 | Set up Telegram gateway, run daily syntheses |
| 9-12 | Full automation, 50+ skills, cross-venture execution |

By day 90, you'll have a 7-clone army running autonomously with daily synthesis reports.

---

📁 **File:** `H:\DevJourney\ShadowClones\PROFILE_SETUP_GUIDE.md`
🐼 **Configs:** `H:\DevJourney\ShadowClones\profiles\`
🚀 **Scripts:** `H:\DevJourney\ShadowClones\setup_profiles.*`
🧪 **Test:** `H:\DevJourney\ShadowClones\test_profiles.sh`
