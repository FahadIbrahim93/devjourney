# CODER_AGENTS.md — Hope Theory (agency hub): guidelines for any AI coder

General guidelines for **any AI coding agent** (Hermes, Freebuff, Cursor, Claude Code, Codex, …) working on Hope Theory repos. Each client repo has its own `AGENTS.md` with the same rules plus its stack; the client repo's file wins if the two differ. In this repo the root `AGENTS.md` is Hermes' personal system config; for `CODER` issues, this file takes precedence.

**Roles:** Hope = owner and final approver. Chief of Web Agency bot (Grok) = project manager: writes issues, moves cards, reviews, maintains `STATUS.md`. AI coders = implement `CODER` issues and deliver via PR.

**Where work lives:** Notion Tasks DB (business + task board) → GitHub issues (work items). Coding tasks carry the `CODER` label and sit on the **Web Agency - CODER Board**. Non-code work uses the *Work item* template.

## 1. Picking a task
- Work only on issues that are labelled **`CODER`** **and** sit in **Ready** on the **Web Agency - CODER Board**: https://github.com/users/FahadIbrahim93/projects (project **"Web Agency - CODER Board"**)
  - No board access? Treat an open `CODER` issue with no `claimed by` comment and no `blocked` label, whose dependencies are closed, as available, and say so in your claim comment.
- Read the whole issue first: Goal, Scope (in/out), Acceptance criteria, Tests/verification, Constraints, Depends on.
- **Claim it:** comment `claimed by <agent>` (e.g. `claimed by Claude Code`) and move the card to **In progress**. Set the board's **Agent** field to your name. If you can't edit the board, the claim comment is enough and the Chief of Web Agency bot moves the card.
- One agent per issue. If someone already claimed it, pick another one.

## 2. Branch & commits
- Branch from up-to-date `main`: **`coder/<issue#>-<slug>`**, e.g. `coder/9-home-page`.
- **Never push to `main`.** Never force-push over someone else's branch.
- Small **Conventional Commits** that reference the issue: `feat: add hero section (#9)`, `fix: …`, `docs: …`, `chore: …`, `test: …`.
- Keep each PR **under ~400 changed lines** (lockfiles/generated files excluded). Bigger? Split it and say so on the issue.

## 3. Before opening the PR
- Run the repo's **build, lint and tests** (see the stack section below) and fix failures. Paste the commands and results into the PR.
- Do every step under *Tests / verification steps* in the issue.
- For UI: check about 375px mobile, tablet and desktop widths, and take screenshots.

## 4. Pull request
- **Title:** `feat(#N): short summary` (or `fix(#N):`, `docs(#N):`, `chore(#N):`).
- **Body:** `Closes #N`, then fill in `.github/pull_request_template.md`:
  - a checklist mirroring the issue's acceptance criteria (ticked only when verified)
  - verification commands and results, plus the preview URL if there is one
  - **screenshots for any UI change** (desktop + mobile)
  - **what was NOT done**, assumptions made, follow-ups
- Move the card to **In review** (or comment `ready for review`).
- **Never merge your own PR.** Hope or the Chief of Web Agency bot reviews and merges. Address review comments with new commits on the same branch.

## 5. When blocked
- Stop guessing. Comment on the issue: what is blocking you, what you tried, and the exact question.
- Add the `blocked` label and move the card to **Blocked**. If there is no Blocked column, leave it in In progress with the `blocked` label.
- Commit and push work-in-progress to your branch; open a **draft** PR if it helps the discussion.

## 6. Hard rules
- **No secrets:** never commit `.env`, API keys, tokens or credentials. Use `.env.example` with dummy values.
- **No new dependencies** without a one-line justification in the PR.
- **Don't touch unrelated files**: no drive-by refactors, reformatting or renames outside the issue scope.
- **No invented facts:** phone numbers, emails, addresses, awards, testimonials, client or project names. If content is missing, use a clearly marked placeholder and list it under *Not done*.
- Don't change repo settings, visibility, secrets, hosting or DNS. Don't message clients.
- Don't delete issues, branches or files you didn't create for this task.

## 7. Flow at a glance
Notion task → `CODER` issue (**Ready** on the board) → agent claims it (**In progress**) → PR `feat(#N)…` / `Closes #N` (**In review**) → review by Hope / Chief of Web Agency → merge → issue closes → **Done** (Notion task set to Done, STATUS updated by the Chief of Web Agency bot).

## 8. Stack conventions
- This repo (`devjourney`) is mostly docs and templates, plus some JS tooling (`package.json`). Follow existing patterns, keep Markdown links relative, and run whatever lint/test/build scripts exist for the files you touch (see the quality gates in the root `AGENTS.md`).
- Client repos: follow that repo's `AGENTS.md` §8 (framework, commands, design tokens). If a repo has no stack yet, the scaffold issue decides it; don't invent one in another issue.
