# GIT WORKFLOW — Hope Theory

## Branch Strategy

```
main          ← production, always deployable
  └── feat/<name>    ← feature branches
  └── fix/<name>     ← bug fix branches  
  └── hotfix/<name>  ← emergency production fixes
```

## Day-to-Day Workflow

### Starting a new task
```bash
cd /mnt/h/DevJourney/Projects/<project>
git checkout main && git pull origin main
git checkout -b feat/my-feature
```

### During development
```bash
# Commit often with good messages
git add <files> && git commit -m "feat(scope): description"

# Push branch to GitHub
git push -u origin feat/my-feature
```

### Finishing a task
```bash
# 1. Pull latest main (rebase preferred)
git fetch origin && git rebase origin/main

# 2. Run quality gates
npm run lint && npm test -- --run && npm run build

# 3. Push and merge
git push && git checkout main && git pull && git merge feat/my-feature
git push origin main && git branch -d feat/my-feature
```

## Hotfix Process (Production Bug)
```bash
git checkout main && git pull
git checkout -b hotfix/urgent-fix
# Fix + test + build
git checkout main && git merge hotfix/urgent-fix --no-ff
git push origin main && git branch -d hotfix/urgent-fix
```

## Git Config
```bash
git config --global user.name "Fahad Ibrahim"
git config --global user.email "rimon@hopetheory.dev"
git config --global pull.rebase true  # clean history
```

## SSH Key
- Key: `~/.ssh/id_ed25519`
- Added to: github.com/FahadIbrahim93
- Key type: Ed25519

## Common Commands Reference
```bash
git status              # what changed
git log --oneline -10  # recent commits
git diff               # unstaged changes
git stash              # save work-in-progress
git stash pop          # restore stashed work
git checkout -b <branch>  # create + switch
```

---
*Hermes COO Git Workflow · Hope Theory*
