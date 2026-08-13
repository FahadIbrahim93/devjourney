# 🐼 Hope Theory — Shadow Clone Jutsu
**Master index for the 6-venture AI army**

---

## 📑 START HERE

| Doc | Purpose |
|-----|---------|
| **[SESSION_WRAP.md](SESSION_WRAP.md)** | Session end report + handoff for next session |
| **[MANAGER_REPORT_3HR_V5.md](MANAGER_REPORT_3HR_V5.md)** | Full 3-hour build report |
| **[dashboard.html](dashboard.html)** | Visual interface (open in browser) |
| **[PROFILE_SETUP_GUIDE.md](PROFILE_SETUP_GUIDE.md)** | How the 7 profiles work |
| [OLLAMA_SETUP.md](OLLAMA_SETUP.md) | Privacy mode setup |
| [CRON_DAILY_RHYTHM.md](CRON_DAILY_RHYTHM.md) | 23-job daily schedule |
| **[FREE_MODELS_REFERENCE.md](FREE_MODELS_REFERENCE.md)** | **🆓 Best free models + fallback chains per profile** |
| **[90_DAY_ROADMAP.md](90_DAY_ROADMAP.md)** | 90-day plan to $5K/mo |

---

## 🚀 DEPLOY IN 4 COMMANDS

```cmd
cd H:\DevJourney\ShadowClones
setup_profiles.bat       :: Create 7 profiles
deploy_skills.bat        :: Deploy 36 skills
setup_ollama.bat         :: Privacy mode (2 clones)
setup_cron.bat           :: Schedule 23 jobs
```

Verify: `node test-system.cjs` → 47/47 pass

---

## 🦊 THE 7 CLONES

| Profile | Venture | Model | Privacy |
|---------|---------|-------|---------|
| naruto_main | Orchestrator | Claude 3.5 Sonnet | Cloud |
| crypto_sage | [CRYPTO] | Gemini 2.5 Flash | Cloud |
| code_ninja | [CODE] | Claude + Ollama | Hybrid |
| marjahans_merchant | [MARJAHANS] | Ollama 8B | **🔒 LOCAL** |
| snaptrap_stylist | [SNAPTRAP] | Ollama 8B | **🔒 LOCAL** |
| build_master | [BUILD] | Kimi 128K | Cloud |
| truth_seeker | [PHILO] | xAI Grok 2 | Cloud |

**Total:** 7 profiles · 36 skills · 23 cron jobs · 47 e2e tests · 0 privacy leaks for customer data

---

## 🔧 THE 7 CLIs

```bash
# Cross-clone task coordination
node shadow-kanban.cjs init
node shadow-kanban.cjs create "Daily BTC analysis" --venture CRYPTO --assigned crypto_sage
node shadow-kanban.cjs list --status todo
node shadow-kanban.cjs stats

# Daily state synthesis
node daily-synthesis.cjs
node daily-synthesis.cjs --mode=morning

# Find cross-venture patterns
node cross-venture-bridge-detector.cjs

# Main orchestrator
node shadow-orchestrator.cjs morning
node shadow-orchestrator.cjs evening

# Generate / regenerate files
node seed-memory.cjs          # Re-seed profile memory
node cron-setup.cjs all       # Regenerate cron config

# Test everything
node test-system.cjs          # 47 tests, 100% pass expected
```

---

## 🐼 THE 6 VENTURES

| Venture | Clone | Goal (90 days) |
|---------|-------|----------------|
| [CRYPTO] | crypto_sage | 1K YouTube subs, education channel |
| [CODE] | code_ninja | $5K/mo freelance, 5+ clients |
| [MARJAHANS] | marjahans_merchant | 5K IG, ৳5L sales, brand |
| [SNAPTRAP] | snaptrap_stylist | 1K IG, 3 drops, ৳4L sales |
| [BUILD] | build_master | 1 paid proposal, $10K+ |
| [PHILO] | truth_seeker | 1K Substack, course launch |

---

## 🔐 PRIVACY MODEL

| Tier | Profiles | Where Data Goes |
|------|----------|-----------------|
| Orchestrator | naruto_main | Claude API |
| Specialized (cloud) | crypto, build, truth | Various APIs |
| **Customer-facing** | **marjahans, snaptrap** | **🔒 Ollama LOCAL** |

**Customer PII, orders, drop plans: never leave your machine.**

---

## 📂 FOLDER MAP

```
H:\DevJourney\ShadowClones\
│
├── 📁 profiles/              7 YAML configs
├── 📁 skills/                36 SKILL.md (6/clone)
│
├── 🔧 setup_*.sh / .bat      12 deploy scripts
├── ⚙️ *.cjs                  7 working CLIs
├── 📚 *.md                   7 docs
├── 🎨 dashboard.html         Visual UI
└── 📊 ShadowKanban.json      Live task board
```

---

## ⏭️ NEXT SESSION

See **[SESSION_WRAP.md](SESSION_WRAP.md)** for Day 7 priorities and known limitations.

---

🐼 Hope Theory · Never GIVE UP on your HOPES
