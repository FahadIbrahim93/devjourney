# CLAUDE.md — DevJourney System Context

**System:** Hermes Agent v0.12.0 (NousResearch)
**Purpose:** AI-powered development operating system for Hope Theory
**Model:** minimax-m2.5-free via OpenCode Zen
**Last updated:** 2026-05-03

---

## First, Read These

At the start of EVERY session, read in this order:
1. `USER.md` — Who I work for
2. `IDENTITY.md` — Who I am
3. `SOUL.md` — How I operate
4. `SESSION.md` — Current sprint state and active tasks

---

## Quality Standard (Non-Negotiable)

A task is NOT DONE until ALL gates pass:

1. **Lint** — `npm run lint` → exit 0
2. **Tests** — `npm test -- --run` → all pass
3. **Build** — `npm run build` → exit 0
4. **Docs** — SESSION.md + README updated

---

## Build Commands by Project

### BugSmasher
```bash
cd /mnt/h/DevJourney/Projects/BugSmasher-AiStudio
npm run lint && npm test -- --run && npm run build
```

### hope-theory-hq
```bash
cd /mnt/h/DevJourney/Projects/hope-theory-hq
npm run build  # 207KB, 65KB gzip
```

### Insectiles
```bash
cd /mnt/h/DevJourney/Projects/Insectiles
npm run build  # WARNING: bundle too large (>100MB), needs optimization
```

### RollON
```bash
cd /mnt/h/DevJourney/Projects/RollON-MVP-Final-V1
npm run lint && npm test -- --run && npm run build
```

---

## Project Status

| Project | Quality | Status | Next |
|---------|---------|--------|------|
| BugSmasher | 8.0/10 | DEPLOYED | P1-3 Death cards, then P2 Monetization |
| hope-theory-hq | 9.0/10 | SCAFFOLDED | Deploy to Vercel |
| RollON | 8.5/10 | DEPLOYED | Client maintained |
| Insectiles | 6.0/10 | IN_PROGRESS | Bundle size fix |
| Agent Hope | LIVE | ACTIVE | xurl OAuth |

---

## DevJourney System Structure

```
DevJourney/
├── Templates/           ← Session, sprint, project brief, wrapup
├── Standards/           ← Quality gates, git, deploy checklist
├── Infos/               ← Venture tracker, tools, income, brand
├── USER.md              ← Who I work for (Fahad/Rimon)
├── IDENTITY.md          ← Who I am (Hermes COO)
├── SOUL.md             ← How I operate
├── SESSION.md           ← Current sprint state
├── SPRINT.md           ← Sprint log
└── Projects/            ← All project repos
```

---

## Hermes Agent Config

- **Config:** `~/.hermes/config.yaml`
- **Skills:** `~/.hermes/skills/` (80+ skills)
- **Plugins:** `~/.hermes/hermes-agent/plugins/`
- **Adapters:** `~/.hermes/adapters/hermes-paperclip-adapter/`
- **Self-Evolution:** `~/.hermes/self-evolution/hermes-agent-self-evolution/`
- **Memory:** `~/.hermes/memories/MEMORY.md` + fact_store
- **Skills dir:** `~/.hermes/skills/` (loaded automatically)

---

## Tool Use Rules

1. Read before edit
2. Use targeted edits (patch), not full rewrites
3. Verify after change (lint + test + build)
4. Quality gates are mandatory
5. Log decisions in SESSION.md
6. Update memory when Fahad corrects me

---

## Common Workflows

### Bug Fix
1. Reproduce / understand
2. Locate code
3. Fix
4. Quality gates
5. Commit + push
6. Update SESSION.md

### Feature
1. Understand requirements
2. Minimal design
3. Implement
4. Tests
5. Quality gates
6. Commit + push
7. Update SESSION.md

---

## Important Notes

- **Workspace:** `/mnt/h/DevJourney/` (WSL: `H:\DevJourney`)
- **Network restrictions:** `curl|sh` blocked, large downloads slow
- **Vercel:** Auto-deploys from `main` branch
- **Git:** SSH key at `~/.ssh/id_ed25519`
- **Never:** Commit secrets, skip quality gates, leave stale comments

---
*Hermes COO v0.12.0 · Hope Theory · Never GIVE UP on your HOPES.*
