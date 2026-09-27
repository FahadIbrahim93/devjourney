# STATUS — Hope Theory agency

**Last updated:** 2026-09-27 21:10 (Asia/Dhaka) · **Maintained by:** the Chief of Web Agency bot. AI coders never edit this file.

## How the system works (final)
- **Chain of command:** Hope ↔ **Chief of Web Agency** bot (the only bot Hope talks to) → sub-bots (**Management & Marketing Department**, more later). **AI coders** (Hermes, Freebuff, Cursor, Claude Code, Codex…) take `CODER` issues and deliver via PR. The **trainee** does `Business/Marketing_Tasks`, reports to Hope, and Hope verifies.
- **Single source of truth for work = GitHub issues.** The Notion [Tasks](https://app.notion.com/p/0051fdf55f41491baa23613e51e6efe2) DB is a mirror keyed by the issue URL, kept in step by [`tools/sync/`](tools/sync/RUNBOOK.md) (dry-run until `NOTION_TOKEN` exists; the Chief bot runs the same procedure via the Notion connector). Last drift check 2026-09-27: **28 issues ↔ 28 rows, 0 drift.**
- **Notion = business view:** [HQ](https://app.notion.com/p/3e770e6cd20a812fa02bcea25d8e3ec4) · [Clients](https://app.notion.com/p/1be4131f7f6c4e51a13b35a37ca0aa0e) (one row per client incl. price, phase, deposit, links; the old Projects DB is archived) · [Invoices & Payments](https://app.notion.com/p/4b273b828d4a4d189884fafdd3e041d2) (monthly rollup + outstanding views) · [Agency OS](https://app.notion.com/p/3e870e6cd20a81af90dcc38f849da98c).
- **Handoff:** `CODER` + **Ready** on the client board = pickup signal. A PR with `Closes #N` triggers the `coder-pr-handoff` Action (comment + `status:in-review`), tested live 2026-09-27.
- **Consistency:** new clients via [`tools/new-client.sh`](tools/new-client.sh) + [docs/NEW_CLIENT.md](docs/NEW_CLIENT.md), from the private template [agency-client-template](https://github.com/FahadIbrahim93/agency-client-template). Labels ↔ Notion: [docs/LABELS.md](docs/LABELS.md). Tokens: [docs/SECURITY_TOKENS.md](docs/SECURITY_TOKENS.md).

## Waiting on Hope
1. Decide on / merge [sthappo PR #17](https://github.com/FahadIbrahim93/sthappo-architects/pull/17). Until then AGENTS.md, templates and the handoff workflow are **not active** in the Sthappo repo.
2. Enable built-in board workflows (UI only) on [Project 3](https://github.com/users/FahadIbrahim93/projects/3) and [Project 4](https://github.com/users/FahadIbrahim93/projects/4): *Item closed → Done*, *Pull request merged → Done*.
3. Create `NOTION_TOKEN` (Notion internal integration shared with HQ) and `GH_AGENCY_TOKEN` (fine-grained PAT). Steps: [docs/SECURITY_TOKENS.md](docs/SECURITY_TOKENS.md).
4. Client details from Sadia (legal name, address, email, phone) → then send proposal + HT-2026-001 ([#15](https://github.com/FahadIbrahim93/devjourney/issues/15)).

## CODER board: [Client: Sthappo Architects](https://github.com/users/FahadIbrahim93/projects/3)
Flow: **`CODER` issue (Ready) → AI coder claims → PR `feat(#N)` + `Closes #N` (auto `status:in-review`) → Hope / Chief bot review → merge → Done.** Rules: [docs/CODER_AGENTS.md](docs/CODER_AGENTS.md) and the client repo's `AGENTS.md` (in PR #17).

| Status | Issues (sthappo-architects, label `CODER`) |
|---|---|
| **Ready** | [#8](https://github.com/FahadIbrahim93/sthappo-architects/issues/8) Scaffold + previews (due 2 Oct, do first) · [#6](https://github.com/FahadIbrahim93/sthappo-architects/issues/6) Visual direction (due 8 Oct) |
| Backlog | [#7](https://github.com/FahadIbrahim93/sthappo-architects/issues/7) Homepage design · [#9](https://github.com/FahadIbrahim93/sthappo-architects/issues/9) Home · [#10](https://github.com/FahadIbrahim93/sthappo-architects/issues/10) Work grid · [#11](https://github.com/FahadIbrahim93/sthappo-architects/issues/11) Services + Process · [#12](https://github.com/FahadIbrahim93/sthappo-architects/issues/12) About + Contact · [#13](https://github.com/FahadIbrahim93/sthappo-architects/issues/13) QA · [#15](https://github.com/FahadIbrahim93/sthappo-architects/issues/15) Launch checklist (blocked) |
| In progress / In review / Done | none yet |

## Business / Marketing (trainee): [Agency: Business & Marketing](https://github.com/users/FahadIbrahim93/projects/4)
Chain: **Hope assigns → trainee delivers → trainee reports to Hope → Hope verifies ("Verified by Hope" in Notion) → Hope forwards to the Chief bot (Management & Marketing Department) → next tasks via Hope.** No bot access for the trainee; drafts only. Handbook: [docs/TRAINEE_HANDBOOK.md](docs/TRAINEE_HANDBOOK.md).

| # | Task | Due | Board status |
|---|---|---|---|
| [#8](https://github.com/FahadIbrahim93/devjourney/issues/8) | Sthappo content brief | 30 Sep | Ready |
| [#9](https://github.com/FahadIbrahim93/devjourney/issues/9) | Competitor scan: 10 Dhaka studios | 4 Oct | Ready |
| [#10](https://github.com/FahadIbrahim93/devjourney/issues/10) | Agency brand basics + 3-tier BDT price draft | 8 Oct | Backlog |
| [#11](https://github.com/FahadIbrahim93/devjourney/issues/11) | Lead list: 30 Dhaka small businesses | 12 Oct | Backlog |
| [#12](https://github.com/FahadIbrahim93/devjourney/issues/12) | Outreach drafts (Bangla + English) | 15 Oct | Backlog |
| [#13](https://github.com/FahadIbrahim93/devjourney/issues/13) | Sthappo launch plan (GBP, FB/IG posts, testimonial request) | 22 Oct | Backlog |
| [#14](https://github.com/FahadIbrahim93/devjourney/issues/14) | Sthappo case study outline | 31 Oct | Backlog |

## Deadlines
| Date | What |
|---|---|
| **1 Oct 2026** | Sthappo M1 Discovery: domain + legal name, assets, agreement signed, deposit BDT 5,000 (HT-2026-001) |
| 8 Oct 2026 | Sthappo M2 Design approved → invoice BDT 2,500 (HT-2026-002) |
| 19 Oct 2026 | Sthappo M3 Build: all 6 pages on preview |
| 24 Oct 2026 | Sthappo M4 Review: up to 3 rounds closed |
| **27 Oct 2026** | **Sthappo launch + handoff** → final invoice BDT 2,500 (HT-2026-003) before DNS switch |

## Current priorities (this week)
1. [sthappo#3](https://github.com/FahadIbrahim93/sthappo-architects/issues/3) Confirm domain + legal studio name (Hope, client-waiting, due 1 Oct)
2. [sthappo#4](https://github.com/FahadIbrahim93/sthappo-architects/issues/4) Gather brand assets + project photos (Hope, client-waiting, due 1 Oct)
3. [devjourney#15](https://github.com/FahadIbrahim93/devjourney/issues/15) Send proposal/agreement + deposit invoice HT-2026-001 (Hope sends; blocked on client details)
4. [sthappo#8](https://github.com/FahadIbrahim93/sthappo-architects/issues/8) Scaffold + previews (CODER, Ready, due 2 Oct)
5. [devjourney#16](https://github.com/FahadIbrahim93/devjourney/issues/16) Hope: decide on sthappo PR #17
6. Trainee: [#8](https://github.com/FahadIbrahim93/devjourney/issues/8) content brief (30 Sep), [#9](https://github.com/FahadIbrahim93/devjourney/issues/9) competitor scan (4 Oct)

## Clients
| Client | Tracking issue | Repo | Stage |
|---|---|---|---|
| Sthappo Architects (Sadia Alam Epshi) | [devjourney#7](https://github.com/FahadIbrahim93/devjourney/issues/7) | [sthappo-architects](https://github.com/FahadIbrahim93/sthappo-architects) (private) | Won/Onboarding · Discovery |

## Open issues — sthappo-architects
| # | Title | Labels | Milestone |
|---|---|---|---|
| [3](https://github.com/FahadIbrahim93/sthappo-architects/issues/3) | Confirm domain + legal studio name | admin, client-waiting | M1 |
| [4](https://github.com/FahadIbrahim93/sthappo-architects/issues/4) | Gather brand assets + project photos | admin, client-waiting | M1 |
| [6](https://github.com/FahadIbrahim93/sthappo-architects/issues/6) | Visual direction: palette, type, spacing, components | website | M2 |
| [7](https://github.com/FahadIbrahim93/sthappo-architects/issues/7) | Homepage design on preview | website, client-waiting | M2 |
| [5](https://github.com/FahadIbrahim93/sthappo-architects/issues/5) | Ship v1 website (umbrella) | website | M3 |
| [8](https://github.com/FahadIbrahim93/sthappo-architects/issues/8) | Scaffold site + preview deployments per PR | website | M3 |
| [9](https://github.com/FahadIbrahim93/sthappo-architects/issues/9) | Home page | website | M3 |
| [10](https://github.com/FahadIbrahim93/sthappo-architects/issues/10) | Work page: project grid | website | M3 |
| [11](https://github.com/FahadIbrahim93/sthappo-architects/issues/11) | Services + Process pages | website | M3 |
| [12](https://github.com/FahadIbrahim93/sthappo-architects/issues/12) | About + Contact pages | website | M3 |
| [13](https://github.com/FahadIbrahim93/sthappo-architects/issues/13) | Internal QA pass | website | M4 |
| [14](https://github.com/FahadIbrahim93/sthappo-architects/issues/14) | Client review rounds (max 3) | website, client-waiting | M4 |
| [15](https://github.com/FahadIbrahim93/sthappo-architects/issues/15) | Launch checklist | website, blocked | M5 |
| [16](https://github.com/FahadIbrahim93/sthappo-architects/issues/16) | Handoff doc + ownership transfer | admin | M6 |

Open PR: [sthappo#17](https://github.com/FahadIbrahim93/sthappo-architects/pull/17) WORKFLOW.md, AGENTS.md, CONTRIBUTING, issue/PR templates, `coder-pr-handoff` workflow (mergeable; **Hope decides**).

## Open issues — devjourney
| # | Title | Labels |
|---|---|---|
| [7](https://github.com/FahadIbrahim93/devjourney/issues/7) | Client: Sthappo Architects - website v1 | client, website |
| [15](https://github.com/FahadIbrahim93/devjourney/issues/15) | Send proposal/agreement + deposit invoice HT-2026-001 (blocked on client details) | admin, client |
| [16](https://github.com/FahadIbrahim93/devjourney/issues/16) | Review/merge sthappo PR #17 | admin |
| [8](https://github.com/FahadIbrahim93/devjourney/issues/8)–[14](https://github.com/FahadIbrahim93/devjourney/issues/14) | Business/Marketing trainee tasks (see above) | Business/Marketing_Tasks |
| [4](https://github.com/FahadIbrahim93/devjourney/issues/4) | docs: add revenue action tracker template | documentation |
| [3](https://github.com/FahadIbrahim93/devjourney/issues/3) | docs: add revenue asset index to devjourney README | documentation |
| [2](https://github.com/FahadIbrahim93/devjourney/issues/2) | docs: Publish JG Mart case study for portfolio | documentation |
| [1](https://github.com/FahadIbrahim93/devjourney/issues/1) | docs: Create ARCHITECTURE.md for all Hope Theory projects | documentation |

## Invoices due
Rules: [Agency OS → Invoice rules](https://app.notion.com/p/3e870e6cd20a81af90dcc38f849da98c) (day 0 send · day 5 reminder draft · day 8 Overdue · only Hope marks Paid after checking EBL).

| Invoice | Amount | Due | Status |
|---|---|---|---|
| HT-2026-001 Deposit | BDT 5,000 | on signing (target by 1 Oct) | Draft |
| HT-2026-002 Design approval | BDT 2,500 | after design approval (~8 Oct) | Draft |
| HT-2026-003 Before launch | BDT 2,500 | before DNS switch (~25–27 Oct) | Draft |
