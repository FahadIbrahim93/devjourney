# DEPLOY CHECKLIST — Before Any Production Deploy

Run this before every deploy — internal tools, client projects, and own products.

---

## Pre-Deploy Gates

- [ ] `npm run lint` → exit 0
- [ ] `npm test -- --run` → all pass
- [ ] `npm run build` → exit 0, clean output
- [ ] No console.error or unhandled rejections
- [ ] No hardcoded secrets (API keys, tokens)
- [ ] .env.example updated if new variables added

---

## Pre-Deploy Review

- [ ] New features tested manually (at least smoke test)
- [ ] Mobile responsive (if applicable)
- [ ] No broken links or missing assets
- [ ] Error states handled (404, 500, network failure)
- [ ] Loading states visible

---

## Deployment Steps

### Vercel (Standard)
```bash
# Push to main — Vercel auto-deploys
git push origin main

# Or trigger manually:
vercel --prod
```

### Vercel (New Project)
```bash
cd /mnt/h/DevJourney/Projects/<project-name>
vercel login
vercel link
vercel --prod
```

### GitHub Only (manual deploy needed)
```bash
npm run build
# Upload dist/ to hosting
```

---

## Post-Deploy Verification

- [ ] Live URL loads
- [ ] Core user flow works (signup/login → main action)
- [ ] No console errors in DevTools
- [ ] Mobile view correct
- [ ] Performance acceptable (Lighthouse score)
- [ ] Analytics / tracking fires (if applicable)
- [ ] Discord/Telegram alert (if monitoring set up)

---

## Rollback Plan

```bash
# Vercel: revert in dashboard or
vercel rollback

# GitHub Pages: git revert + rebuild
git revert <commit>
git push origin main
```

---

## For BugSmasher Specifically

- [ ] Game starts, bugs spawn
- [ ] Click kills bugs, score increases
- [ ] Wave escalation works
- [ ] Game over screen shows stats
- [ ] Share button generates card
- [ ] Leaderboard loads (check Supabase connection)
- [ ] No console errors on death/restart

---
*Hermes COO Deploy Checklist · Hope Theory*
