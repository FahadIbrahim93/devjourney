# QUALITY GATES — Hope Theory Development Standard

**Every task is NOT DONE until all gates pass.**

A task can skip a gate only if that gate doesn't apply (e.g., no tests for a config-only change). But skipping requires stating why explicitly.

---

## The 4 Gates

### Gate 1 — Lint ✅
```
npm run lint
```
**Pass:** Exit code 0, zero errors
**Fail:** Fix lint errors before proceeding

### Gate 2 — Tests ✅
```
npm test -- --run
```
**Pass:** All tests pass, no flaky behavior
**Fail:** Fix test failures before proceeding

### Gate 3 — Build ✅
```
npm run build
```
**Pass:** Exit code 0, no runtime warnings
**Fail:** Fix build errors before proceeding

### Gate 4 — Docs ✅
- README updated with new/changed functionality
- SESSION.md updated with session log
- PROJECT_BRIEF.md updated with quality/version changes
- Changelog updated (if public project)

---

## Quality Tiers

| Tier | Gates Required | When |
|------|---------------|------|
| **Internal** (new module, refactor, internal tool) | 1 + 3 | Every save |
| **Feature** (user-facing feature) | 1 + 2 + 3 | Before commit |
| **Release** (version bump, deploy) | 1 + 2 + 3 + 4 | Before push |

---

## What Gets Tested

| Category | Coverage Target | Why |
|----------|---------------|-----|
| Game logic / business logic | 80%+ | Bugs here = money lost |
| State transitions | 100% | Death, level-up, prestige |
| Save/load | 100% | User data loss = rage quit |
| Leaderboard | 80%+ | Reputation damage |
| UI components | smoke only | E2E tests elsewhere |

---

## Anti-Patterns That Fail Gates

- **Skipping tests** because "it's a small change" → a small change that breaks is always a bad time
- **Committing with lint warnings** → lint warnings are always technical debt
- **Deploying without a build check** → always verify production build works
- **Not updating docs** → future-you will hate present-you

---

*Hermes COO Quality Standard · Hope Theory*
