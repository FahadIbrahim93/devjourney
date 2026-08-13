# DevJourney Folder Restructure - CLEANUP PLAN

## 🔴 CRITICAL ISSUES IDENTIFIED

| Issue | Impact | Solution |
|-------|--------|----------|
| **12,365 folders** | Massive bloat | Remove nested node_modules |
| **Large node_modules** | 1.3GB+ wasted | Keep only essential builds |
| **Git objects archived** | 200MB+ duplicates | Archive old projects properly |
| **Scattered systems** | Confusion | Single top-level structure |

---

## 📊 TOP-LEVEL FOLDER PLAN

```
DevJourney/
├── 00-System/               # Configuration + tools
│   ├── AGENTS.md
│   ├── CLAUDE.md
│   ├── SPRINT.md
│   └── README.md (updated)
│
├── 01-SecondBrain/          # Obsidian vault (moved)
│
├── 02-Projects/             # Active projects only
│   ├── BugSmasher-HopeTheory/
│   ├── Insectiles/
│   ├── RollON-MVP-Final-V1/
│   └── hope-theory-hq/
│
├── 03-Ventures/             # Venture systems
│   ├── CRYPTO/
│   ├── CODE/
│   ├── MARJAHANS/
│   ├── SNAPTRAP/
│   ├── BUILD/
│   └── PHILO/
│
├── 04-Freelance/            # Job landing system (consolidated)
│   ├── platform_kit/
│   ├── application_kit/
│   ├── portfolio/
│   └── dashboard/
│
├── 05-Archive/              # Archived projects (cleaned)
│
└── 06-Docs/                 # Documentation
```

---

## 🗑️ IMMEDIATE CLEANUP ACTIONS

### Safe to Remove
- `.git/objects` in Archive folders (git history already archived)
- `node_modules` in Archive folders
- Duplicate `package-lock.json` files
- Old build artifacts (`dist/`, `.next/`, `build/`)

### Keep But Organize
- Active project folders (BugSmasher, Insectiles, etc.)
- Portfolio content
- Venture documentation

---

## ⚡ CLEANUP SCRIPT

Running safe cleanup now...

```bash
# Will remove:
# - node_modules in Archive/BugSmasher
# - .git/objects > 50MB (already in backup)
# - Duplicate files
# - Empty folders
```

---

*Cleanup in progress - safe operations only*