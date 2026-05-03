# COMMIT FORMAT — Hope Theory

## Format
```
<type>(<scope>): <short description>

[optional body — explain WHY, not WHAT]

[optional footer — BREAKING CHANGE, issue #]
```

## Types

| Type | When to Use |
|------|-------------|
| `feat` | New user-facing feature |
| `fix` | Bug fix |
| `docs` | Documentation only |
| `style` | Formatting, whitespace (no code change) |
| `refactor` | Code change that neither fixes a bug nor adds a feature |
| `perf` | Performance improvement |
| `test` | Adding or fixing tests |
| `chore` | Build scripts, dependency updates, tooling |
| `wip` | Work in progress — will be amended/continued |

## Examples

### Good
```
feat(BugSmasher): Add persistent upgrade system with 8 upgrade types

- Crystals persist in localStorage between sessions
- 8 upgrades: Click Power, Crit Chance, Starting Health, Auto-Clicker,
  Crystal Find, Score Multiplier, Shield Start, Extra Lives
- Exponential cost curve prevents early over-purchase

Closes #47
```

```
fix(GameOver): Prevent prestige screen on score < 50K

The prestige button was clickable even when score was below the
50,000 threshold. Now it only appears when conditions are met.
```

```
docs(SESSION): Add v1.6.0 sprint log

- P1-1 Persistent upgrades: DONE
- P1-2 Biome mechanics: DONE
- P1-3 Death cards: IN PROGRESS
```

### Bad
```
fixed stuff
updated
wip
fixes
changes
```

## Rules
1. **Subject line ≤ 72 characters**
2. **Use imperative mood:** "Add feature" not "Added feature"
3. **No period at end of subject line**
4. **Reference issues:** `Closes #N` or `Refs #N`
5. **Breaking changes:** `BREAKING CHANGE:` in footer

## Validation
```bash
# Check last commit message
git log -1 --pretty=format:"%s"
```

## Amending
```bash
# Fix last commit message
git commit --amend -m "feat(scope): correct description"

# Add forgotten files to last commit
git add .
git commit --amend --no-edit
```

---
*Hermes COO Commit Standard · Hope Theory*
