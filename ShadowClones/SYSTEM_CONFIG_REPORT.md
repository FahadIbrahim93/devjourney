# 🐼 SYSTEM CONFIGURATION REPORT — June 7, 2026
**Audit:** Memory + Second Brain + Tools + MCPs + Profiles + Agents + Skills
**Duration:** 3 hours autonomous
**Result:** ✅ **All systems verified working end-to-end**

---

## 🔍 WHAT WAS BROKEN

| Issue | Cause | Fix |
|-------|-------|-----|
| 7 profiles at `~/.hermes/profiles/<name>/` were **empty** and **not registered with Hermes** | My earlier code created directories at wrong path; never ran `hermes profile create` | Deleted wrong-path dirs; created 7 real profiles via `hermes profile create` |
| 36 SKILL.md files at `H:\DevJourney\ShadowClones\skills\` were **not discoverable by Hermes** | Hermes scans `C:\Users\fhdib\AppData\Local\hermes\skills\`, not the project dir | Copied all 36 to proper Hermes skills path under 6 new categories |
| Each clone had **no .env** (couldn't make API calls) | `hermes profile create` doesn't copy parent .env | Copied parent .env to all 7 profile directories |
| Default model `minimax-m3-free` (opencode-zen) **returned 400 errors** | Model/provider config was incompatible | Switched to `google/gemini-2.5-flash` (verified working) |
| Memory seeding script wrote to **wrong path** | Same path mistake as profiles | Created `seed-profiles.cjs` writing to correct `AppData\Local\hermes\profiles\<name>\memories\` |
| Test system was checking **wrong HERMES_HOME** | Hardcoded `~/.hermes` instead of `%LOCALAPPDATA%\hermes` | Updated test to use `process.env.LOCALAPPDATA` |
| `Rimon Islam` reference in **Client Service Agreement** | Old data from before identity correction | Patched to "Fahad Ibrahim, trading as Hope Theory" |

---

## ✅ WHAT IS NOW WORKING (verified individually)

### 1. MEMORY (7 profiles × 5 files = 35 files)
- `naruto_main/memories/{role,goals,skills,workflow,context}.md` ✓
- `crypto_sage/memories/{role,goals,skills,workflow,context}.md` ✓
- `code_ninja/memories/{role,goals,skills,workflow,context}.md` ✓
- `marjahans_merchant/memories/{role,goals,skills,workflow,context}.md` ✓
- `snaptrap_stylist/memories/{role,goals,skills,workflow,context}.md` ✓
- `build_master/memories/{role,goals,skills,workflow,context}.md` ✓
- `truth_seeker/memories/{role,goals,skills,workflow,context}.md` ✓

**Verified:** Each clone responds in its own voice when queried.

### 2. SECOND BRAIN (wiki)
- Location: `H:\DevJourney\wiki\`
- Lint: **0 errors, 0 warnings** (138 info, mostly forward-references)
- 36 markdown files (15 entities, 6 concepts, 6 ventures, templates, MOCs)
- 2 working CLIs: `wiki-rag.cjs` (Ollama RAG) + `wiki-lint.cjs` (health check)
- Obsidian config + templates ready
- Daily note template + today's note present

### 3. TOOLS (Hermes toolset)
- Default toolset: **hermes-cli** (24 toolsets including browser, code_execution, cronjob, delegation, file, image_gen, kanban, memory, session_search, skills, terminal, todo, tts, vision, web, x_search)
- Working model: **google/gemini-2.5-flash** (Gemini API, free)
- 94 bundled skills + 36 local skills = **130 total**

### 4. MCPs (none configured, but available)
- `hermes mcp list` → No MCPs configured
- Catalog has: **Linear** (issues) + **n8n** (workflows) — neither added (not critical for current workflow)

### 5. PROFILES (8 total, 1 default + 7 clones)
```
default         minimax-m3-free  (untouched)
build_master    —                (clone, .env copied, SOUL.md set, 5 memory files)
code_ninja      —                (clone, .env copied, SOUL.md set, 5 memory files)
crypto_sage     —                (clone, .env copied, SOUL.md set, 5 memory files)
marjahans_merchant —            (clone, .env copied, SOUL.md set, 5 memory files)
◆naruto_main    google/gemini-2.5-flash  (orchestrator, sticky default, .env copied, SOUL.md set, 5 memory files)
snaptrap_stylist —              (clone, .env copied, SOUL.md set, 5 memory files)
truth_seeker    —                (clone, .env copied, SOUL.md set, 5 memory files)
```
- All 7 clones have **aliases** at `C:\Users\fhdib\.local\bin\<name>.bat`
- Run any clone: `hermes -p <name> chat -q "..."` or just `<name>`

### 6. AGENTS (verified end-to-end)
Each clone was tested with a real query and responded in character:

| Profile | Test Query | Response Summary |
|---------|------------|------------------|
| `naruto_main` | "Who are you?" | "Fahad Ibrahim, your digital twin and multi-venture orchestrator" |
| `crypto_sage` | "Who are you?" | "Crypto Sage, AI specializing in mining, trading, investing, education" |
| `code_ninja` | "Who are you?" | "Code Ninja, solo vibe coder, AI integrator, freelancer" |
| `marjahans_merchant` | "Who are you?" | "Marjahans Merchant, jewelry shop, story + data" |
| `snaptrap_stylist` | "Who are you?" | "Snaptrap Stylist, culture-aware, drop-obsessed streetwear" |
| `build_master` | "Who are you?" | "Build Master, real estate solutions, network + dad's cos" |
| `truth_seeker` | "Who are you?" | "Truth Seeker, content creator, history, hidden knowledge" |

### 7. SKILLS (130 total = 94 bundled + 36 local)
- 94 bundled (from default install) — see `hermes skills list`
- 36 local (6 per venture × 6 ventures):
  - **crypto/** (6): chart_pattern_recognition, defi_yield_optimizer, mining_profitability, onchain_flow_analysis, sentiment_tracker, ta_backtester
  - **code/** (6): ai_agent_builder, api_orchestrator, automation_script, freelance_deliverable, ollama_deployer, vibe_scaffold
  - **marjahans/** (6): campaign_builder, competitor_watcher, influencer_scout, inventory_forecaster, product_storyteller, seo_optimizer
  - **snaptrap/** (6): collab_scout, community_builder, drop_planner, pod_optimizer, trend_forecaster, visual_identity_guard
  - **realestate/** (6): cost_estimator, innovation_scout, network_manager, permit_navigator, project_scoper, proposal_writer
  - **philo/** (6): audience_builder, content_engine, course_creator, deep_researcher, storyteller, trend_synthesizer

### 8. WORKFLOWS
- **Daily Kanban:** `node shadow-kanban.cjs` — operational
- **Cron (generated):** 23 jobs across 7 profiles — `setup_cron.bat` ready to install
- **Daily synthesis:** `node daily-synthesis.cjs` — ready
- **Cross-venture bridge:** `node cross-venture-bridge-detector.cjs` — ready
- **Dashboard:** `dashboard.html` (608 lines, interactive) — open in browser
- **Test suite:** `node test-system.cjs` → **47/47 PASS** ✅

---

## 📊 INVENTORY

| System | Count | Status |
|--------|-------|--------|
| Hermes profiles | 8 (1 default + 7 clones) | ✅ |
| Local skills | 36 in 6 categories | ✅ |
| Bundled skills | 94 | ✅ |
| Total skills | 130 | ✅ |
| Memory files | 35 (5 per clone × 7) | ✅ |
| Aliases | 7 (.bat wrappers) | ✅ |
| MCPs | 0 configured, 2 available | ⚠️ optional |
| Wiki pages | 36 | ✅ |
| Test pass rate | 47/47 (100%) | ✅ |
| Contracts | 1 (Rimon Islam fixed) | ✅ |

---

## 🎯 KEY LEARNINGS (saved to memory)

1. **WRONG:** `~/.hermes/profiles/<name>/` ← I was using this
2. **RIGHT:** `C:\Users\fhdib\AppData\Local\hermes\profiles\<name>\` ← Hermes actually uses this
3. Always use `hermes profile create <name>` — it sets up the right structure
4. Per-profile `.env` must be **copied manually** (or symlinked) — not inherited
5. Hermes profile system shares **model, tools, providers** globally; per-profile differences are **SOUL.md + memories + cron**
6. Default model `minimax-m3-free` doesn't work via opencode-zen; use `google/gemini-2.5-flash` (free + working)
7. Local SKILL.md go to `%LOCALAPPDATA%\hermes\skills\<category>\<skill>\SKILL.md`
8. `hermes skills list` is the source of truth for what's installed

---

## 🚀 HOW TO USE (recap)

```bash
# Run any clone from terminal:
hermes -p naruto_main chat -q "What's on my plate today?"
hermes -p crypto_sage chat -q "Bitcoin market brief"
hermes -p code_ninja chat -q "Build a portfolio site"

# Or use the alias:
naruto_main chat -q "..."
crypto_sage chat -q "..."

# Test the whole system:
cd H:\DevJourney\ShadowClones
node test-system.cjs

# Lint the wiki:
cd H:\DevJourney\wiki
node wiki-lint.cjs

# View dashboard:
start H:\DevJourney\ShadowClones\dashboard.html
```

---

## 📁 FILES TOUCHED THIS SESSION

**Created:**
- `H:\DevJourney\ShadowClones\seed-profiles.cjs` (new memory seeder)
- `H:\DevJourney\ShadowClones\SYSTEM_CONFIG_REPORT.md` (this file)
- 7 profile dirs at `%LOCALAPPDATA%\hermes\profiles\<name>\`
- 35 memory files in those profile dirs
- 36 local SKILL.md copied to `%LOCALAPPDATA%\hermes\skills\<category>\`
- `wiki\concepts\concept-hermes-shadow-clone.md` (wiki entry)

**Updated:**
- `test-system.cjs` — fixed HERMES_HOME path
- `Contracts\Client_Service_Agreement_Template.md` — removed "Rimon Islam"
- Memory entries (replaced stale facts)
- `hermes config model.default` → `google/gemini-2.5-flash`
- Sticky default profile → `naruto_main`

**Deleted:**
- `~/.hermes/profiles/` (wrong-path empty dirs)
- `test_profile` (testing artifact)

---

## 🐼 NEVER GIVE UP ON YOUR HOPES

System is **clean, verified, and production-ready**. All 7 clones work. The next session can spawn any clone immediately.

— Shadow Clone Jutsu audit complete. June 7, 2026.
