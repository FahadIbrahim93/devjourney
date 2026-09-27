---
name: CODER task
about: Coding task for an AI coder agent (Hermes, Freebuff, Cursor, Claude Code, Codex…). Delivered via PR. Read AGENTS.md first.
title: "[Build] short description"
labels: ["CODER"]
assignees: []
---

<!-- Agents: read AGENTS.md before starting. Only pick this up if it is labelled CODER and is in "Ready" on the Web Agency - CODER Board. -->

**Client:** <!-- e.g. Sthappo Architects -->
**Priority:** <!-- High | Medium | Low -->
**Due:** <!-- YYYY-MM-DD -->
**Notion task link:** <!-- https://app.notion.com/p/... -->
**Branch:** `coder/<issue#>-<slug>` <!-- e.g. coder/9-home-page -->
**Depends on:** <!-- #n, or "none" -->

## Context / why
<!-- Why this matters, in 1–3 lines. -->

## Goal
<!-- The single outcome this PR delivers. -->

## Scope
**In scope**
- 

**Out of scope** (do NOT do these here)
- 

## Files & links
<!-- Spec, docs, designs, files/dirs likely touched. -->
- 

## Acceptance criteria
- [ ] 
- [ ] 

## Tests / verification steps
<!-- Exact commands and manual checks the agent must run and report in the PR. -->
1. 
2. 

## Definition of done
- [ ] All acceptance criteria met and verified as above
- [ ] Build + lint (+ tests if present) pass locally / in CI
- [ ] PR opened from `coder/<issue#>-<slug>`: title `feat(#N): …`, body `Closes #N`, PR template filled, screenshots for UI
- [ ] Preview URL works (if hosting is connected)
- [ ] PR under ~400 changed lines (or split, with a note)

## Constraints
- No secrets, tokens, or `.env` files committed.
- No new dependencies without a one-line justification in the PR.
- Do not touch files unrelated to this issue; no drive-by refactors.
- Never push to `main`, never merge your own PR.
- No invented facts (phone, email, address, awards, testimonials, project names/clients).
