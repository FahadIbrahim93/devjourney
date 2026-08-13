# 🚀 DEPLOYMENT SOURCE OF TRUTH
## Hope Theory — Single Repo, Live Site

**Live canonical site:** `FahadIbrahim93/FahadIbrahim93.github.io`
**Live URL:** https://fahadibrahim93.github.io
**Source branch:** `gh-pages`
**Path:** `/`

**Internal repo:** `FahadIbrahim93/devjourney`
**GitHub Pages target:** disabled
**Purpose:** canonical source, drafts, assets, docs

---

## WHY THIS STRUCTURE

- `devjourney` is not configured as a live Pages deploy target
- `FahadIbrahim93.github.io` is the active live site
- `docs/` inside `devjourney` is a draft/staging folder, not the live source
- This avoids duplicate repos, broken `/devjourney/` URLs, and drift

---

## DEPLOY WORKFLOW

1. Edit pages in `devjourney/docs/`
2. Copy final files to `FahadIbrahim93.github.io/`
3. Commit and push to `gh-pages`
4. Verify https://fahadibrahim93.github.io

---

## REPO ROLES

| Repo | Role | Deploy |
|------|------|--------|
| `FahadIbrahim93/devjourney` | Canonical source / drafts | No |
| `FahadIbrahim93/FahadIbrahim93.github.io` | Live site | Yes, `gh-pages` |

---

## FILES

```
FahadIbrahim93.github.io/
├── index.html
└── services/
    ├── fullstack.html
    ├── ai-agents.html
    └── bengali-ai.html
```

*Never GIVE UP on your HOPES.* ☤
