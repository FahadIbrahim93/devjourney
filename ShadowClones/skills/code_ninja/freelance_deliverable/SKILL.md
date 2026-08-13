---
name: freelance_deliverable
description: Package code, write docs, client handoff. Cleaned, tested, deployable.
version: 1.0.0
triggers:
  - "client handoff"
  - "package for delivery"
  - "finalize the project"
  - "freelance deliverable"
tags: [code, freelance, handoff, client-work]
---

# Freelance Deliverable

## Purpose
Package completed code projects for client handoff: cleaned code, documentation, deployment, demo.

## Trigger Conditions
- Project completion
- User asks "package for client"
- Final deliverable before payment
- On-demand via `/freelance_deliverable <project>`

## Required Inputs
- **Project description** (what was built)
- **Client tech savviness** (developer, business owner, non-technical)
- **Deployment target** (Vercel, AWS, their server, etc.)

## Steps

### 1. Code Cleanup
- Remove `console.log`, debug statements, commented code
- Remove unused imports, dead code
- Add meaningful comments where intent isn't obvious
- Format with Prettier/Black
- Run linter (ESLint, Ruff) and fix all warnings
- No TODOs left in production code

### 2. Final Test Suite
- All tests pass (unit, integration)
- Add tests for any untested code paths
- Coverage > 80% on critical paths
- E2E test for user flows
- Run tests in CI (GitHub Actions)

### 3. Environment Setup
- `.env.example` with all required vars (no real values)
- README with setup steps
- `docker-compose.yml` (if applicable) — `docker compose up` and it works
- One-command setup: `npm install && npm run setup`

### 4. Documentation
```markdown
# [Project Name]

## What is it?
[2-3 sentence description for non-technical reader]

## Features
- [Feature 1]
- [Feature 2]
- [Feature 3]

## Quick Start
1. Clone this repo
2. Run `npm install`
3. Copy `.env.example` to `.env` and fill in values
4. Run `npm run dev`
5. Open http://localhost:3000

## Architecture
[Link to architecture diagram or inline description]

## Deployment
[Step-by-step to deploy to production]

## Support
- Email: support@example.com
- Slack channel: #project-name
- Documentation: https://docs.example.com

## License
[MIT / Proprietary / etc.]
```

### 5. Deployment
- Deploy to staging first
- Run smoke tests on staging
- Get client approval (if applicable)
- Deploy to production
- Verify all features work
- Set up monitoring (Sentry, LogRocket, etc.)

### 6. Demo Video
- 5-10 minute walkthrough
- Cover: setup, main features, edge cases
- Record with Loom or similar
- Share via unlisted YouTube or Loom link

### 7. Client-Facing Summary
```markdown
# Project: [Name]
**Delivered:** [Date]
**Status:** ✅ Production-ready

## What's been built
- [Feature 1] — [status]
- [Feature 2] — [status]
- [Feature 3] — [status]

## Live URL
https://[production-url]

## Demo Video
[Loom/YouTube link]

## Repository
https://github.com/[org]/[repo] (private, you've been added)

## What's included
- [x] Source code
- [x] Documentation
- [x] Tests
- [x] Deployment
- [x] 30 days of bug fixes (per agreement)

## What's NOT included (would be a separate engagement)
- Feature X
- Feature Y
- Ongoing maintenance (post-30 days)

## To get started
1. Check out the live URL
2. Watch the demo video
3. Read the README
4. Reach out with any questions
```

### 8. Invoice + Payment
- Send invoice (FreshBooks, Wave, etc.)
- Note payment terms (Net 15, Net 30)
- Include late payment terms
- Follow up on day 1, 3, 7 if unpaid

## Output Format

```markdown
📦 **DELIVERABLE PACKAGED: [project]**

**Client:** [name]
**Live URL:** https://[url]
**Repository:** https://github.com/[org]/[repo]

**Code quality:**
- Files: 47
- Lines: 4,213
- Tests: 67 passing
- Coverage: 87%
- Lint: 0 warnings
- TypeScript: 0 errors

**Documentation:**
- README: ✅
- API docs: ✅
- Architecture diagram: ✅
- Demo video: ✅ (8 min)

**Deployment:**
- Production: ✅ Live
- Monitoring: ✅ Sentry + LogRocket
- Backups: ✅ Daily

**Handed off:**
- [x] GitHub access
- [x] Hosting credentials
- [x] Domain access
- [x] Third-party API keys
- [x] 30 days of support

**Invoice:** $5,000 (sent, due Net 15)
```

## Example Invocation

User: "Package my SaaS app for client handoff"
Assistant: [Cleans, tests, docs, deploys, demo video, invoice]

## Verification
- [ ] No debug code in production
- [ ] All tests pass
- [ ] README is clear for non-developer
- [ ] Demo video covers key features
- [ ] Client can run it locally with one command
- [ ] Production is deployed + monitored
- [ ] Invoice is professional + sent

## Related Skills
- `vibe_scaffold` — For new projects
- `api_orchestrator` — Clean up API code
- `automation_script` — Set up monitoring/automation
