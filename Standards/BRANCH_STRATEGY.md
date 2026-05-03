# BRANCH STRATEGY — Hope Theory

## Branch Naming

```
feat/<short-description>     # new feature
fix/<short-description>      # bug fix
docs/<short-description>     # documentation
refactor/<short-description> # code refactor
wip/<short-description>      # work in progress
hotfix/<short-description>   # production emergency
```

### Rules
- **Lowercase only**
- **Hyphens as separators** (no underscores, no spaces)
- **Max 50 characters**
- **Be specific:** `feat/upgrade-menu` not `feat/stuff`

### Examples
```
feat/persistent-upgrades
feat/biome-mechanics
feat/death-card-sharing
fix/crystal-display-rounding
fix/biome-unlock-persistence
docs/v1.6.0-changelog
refactor/biome-config-types
hotfix/leaderboard-api-down
```

## Branch Lifecycle

1. **Create** from `main` when starting a task
2. **Develop** — commit early and often
3. **Sync** — rebase on `main` if it advances significantly
4. **Test** — quality gates must pass
5. **Merge** — squash-merge or rebase-merge into `main`
6. **Delete** — remove local branch after merge

## When to Use Feature Branches

| Change Type | Branch? | Notes |
|-------------|---------|-------|
| Single file, < 30 min | Maybe skip | Commit directly to main |
| Multi-file feature | **Always** | Branch per feature |
| Bug fix | **Always** | Track in branch for review |
| Documentation only | Optional | Can commit directly |
| Config/env changes | Optional | Can commit directly |
| Any shared/reviewed work | **Always** | PR enables review |

## Protected Branches

`main` is protected on all Hope Theory repos:
- No force pushes
- No direct commits (PR required)
- Status checks must pass before merge

---
*Hermes COO Branch Strategy · Hope Theory*
