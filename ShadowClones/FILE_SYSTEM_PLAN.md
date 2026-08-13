# 📂 HOPE THEORY — STRUCTURED FILE SYSTEM v1
**Goal:** Clean, intuitive, venture-based organization for all 6 ventures
**Date:** June 7, 2026
**Current state:** 30+ scattered dirs → Clean hierarchy

---

## REPLACEMENT PLAN

### `/HopeTheory/` — MASTER ROOT (Everything lives here)

```
H:\HopeTheory\
├── 00_CORE\              # Identity, brand, master docs
│   ├── BRAND.md
│   ├── SOUL.md
│   └── MANIFESTO.md
│
├── 01_VENTURES\          # 6 venture folders — each is a mini-company
│   ├── CRYPTO\
│   ├── CODE\
│   ├── MARJAHANS\        # FROZEN until reactivated
│   ├── SNAPTRAP\         # FROZEN until reactivated
│   ├── BUILD\
│   └── PHILO\
│
├── 02_CLONES\            # AI clone profiles, skills, memories
│   ├── naruto_main\
│   ├── crypto_sage\
│   ├── code_ninja\
│   ├── build_master\
│   └── truth_seeker\
│   (marjahans_merchant + snaptrap_stylist when unfrozen)
│
├── 03_FREELANCE\         # CODE venture's freelance system
│   ├── Proposals\
│   ├── Contracts\
│   ├── Portfolio\
│   ├── Automation\
│   └── Clients\
│
├── 04_CONTENT\           # Content for ALL ventures (cross-venture)
│   ├── Scripts\
│   ├── Posts\
│   ├── Videos\
│   ├── Brand_Strategy\
│   └── Calendar\
│
├── 05_KNOWLEDGE\         # Wiki, research, second brain
│   ├── Wiki\
│   ├── Research\
│   ├── Quran_Timeline\
│   └── Cross_Venture\
│
├── 06_CODE_PROJECTS\     # Active projects
│   ├── Portfolio_Site\
│   ├── Insectiles\
│   ├── RollON\
│   ├── hope-theory-hq\
│   └── SnapTrap_Landing\
│
├── 07_SYSTEM\            # Infrastructure (Hermes, cron, dashboards)
│   ├── ShadowClones\
│   ├── CLI_Tools\
│   ├── Dashboard\
│   └── Scripts\
│
├── 08_ASSETS\            # Raw assets: images, designs, templates
│   ├── Logos\
│   ├── Templates\
│   └── Stock\
│
├── 09_ARCHIVE\           # Everything old, preserved
│
├── .env                  # Central env vars (single source of truth)
└── README.md             # Index of everything
```

---

## MIGRATION PLAN (How To Get There)

### Phase 1: Create the structure (15 min)
```bash
# Create the tree
mkdir -p H:/HopeTheory/{00_CORE,01_VENTURES/{CRYPTO,CODE,MARJAHANS,SNAPTRAP,BUILD,PHILO},02_CLONES/{naruto_main,crypto_sage,code_ninja,build_master,truth_seeker},03_FREELANCE/{Proposals,Contracts,Portfolio,Automation,Clients},04_CONTENT/{Scripts,Posts,Videos,Brand_Strategy,Calendar},05_KNOWLEDGE/{Wiki,Research,Quran_Timeline,Cross_Venture},06_CODE_PROJECTS/{Portfolio_Site,Insectiles,RollON,hope-theory-hq,SnapTrap_Landing},07_SYSTEM/{ShadowClones,CLI_Tools,Dashboard,Scripts},08_ASSETS/{Logos,Templates,Stock},09_ARCHIVE}
```

### Phase 2: Move by category (guided, safe)

**Do NOT move anything yet.** First I'll generate a move plan that:
- Copies files (doesn't delete originals until you confirm)
- Preserves git histories
- Updates all relative paths in configs
- Keeps Hermes working (it reads from its own profile dirs, not our structure)

**Key moves:**
| From | To | What |
|------|----|------|
| `H:/DevJourney/Ventures/` | → `01_VENTURES/*/` | Split by venture |
| `H:/DevJourney/Freelancing/` | → `03_FREELANCE/` | Keep structure |
| `H:/DevJourney/Social_Media/` | → `04_CONTENT/` | Merge both Social_Media + Social_Media_v2 |
| `H:/DevJourney/wiki/` | → `05_KNOWLEDGE/Wiki/` | Wiki files |
| `H:/DevProjects/quran-timeline/` | → `05_KNOWLEDGE/Quran_Timeline/` | Research project |
| `H:/DevJourney/Projects/` | → `06_CODE_PROJECTS/*/` | Split by project |
| `H:/DevJourney/ShadowClones/` | → `07_SYSTEM/ShadowClones/` | As-is |
| `H:/DevJourney/PORTFOLIO_SITE/` | → `06_CODE_PROJECTS/Portfolio_Site/` |
| `H:/HopeTheory/` (current) | → `08_ASSETS/` + `01_VENTURES/` | Raw assets sorted |

### Phase 3: Symlinks for backward compatibility (5 min)
Create directory junctions so nothing breaks:
```cmd
mklink /J H:\DevJourney H:\HopeTheory\07_SYSTEM\DevJourney_symlink
```

### Phase 4: Verify nothing broke (10 min)
- Run `node test-system.cjs`
- Check `hermes model` works
- Verify all paths in configs still resolve

---

## WHAT DOESN'T MOVE

These must stay where they are (Hermes reads from fixed paths):
- `C:\Users\fhdib\AppData\Local\hermes\` — Hermes config, profiles, skills, memories
- `H:\DevJourney\ShadowClones\` → Keep but also link to 07_SYSTEM
- Any `.git` repos → move with full git history preserved

---

## READY TO EXECUTE?

**Say "Migrate" when you're ready** and I'll:
1. Create the full tree
2. Generate a copy-command script (no deletions)
3. Show you the diff before anything runs
4. Run it with your approval
