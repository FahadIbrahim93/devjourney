# NEW-CLIENT CHECKLIST

Same steps for every client, in order. The Chief of Web Agency bot runs it; Hope does the steps marked **(Hope)**. Mirror page in Notion: *Agency OS → New-client checklist*.

## 0. Before anything (Hope)
- [ ] Discovery call done; scope, price (BDT) and launch date agreed verbally.
- [ ] Client's legal/public name and preferred domain noted (unconfirmed = say so).

## 1. GitHub (one command, idempotent, never deletes)
```bash
tools/new-client.sh <slug> "<Client Name>" --code "Client B" --launch YYYY-MM-DD            # dry-run: read the plan
tools/new-client.sh <slug> "<Client Name>" --code "Client B" --launch YYYY-MM-DD --apply    # Hope's gh login (repo creation needs admin)
```
It creates, skipping whatever already exists:
- [ ] private repo `FahadIbrahim93/<slug>` from [`agency-client-template`](https://github.com/FahadIbrahim93/agency-client-template), with AGENTS.md, CONTRIBUTING, issue templates (coder-task, work-item, business-marketing-task), PR template, `coder-pr-handoff` workflow and docs/WORKFLOW.md, placeholders filled
- [ ] labels: `client` `website` `admin` `bug` `CODER` `Business/Marketing_Tasks` `status:in-review` `blocked` `client-waiting` `type:*` `phase:*`
- [ ] milestones M1 Discovery → M6 Handoff, dated back from launch (−26/−19/−8/−3/0/0 days)
- [ ] project board **Client: <Name>** (Status Backlog/Ready/In progress/In review/Done; fields Client, Priority, Due, Agent), linked to the repo
- [ ] devjourney tracking issue **Client: <Name> - website v1** (labels `client`, `website`), added to the board

## 2. Hope, in the GitHub UI (no API exists)
- [ ] Board → `…` → **Workflows**: enable *Item closed → Done*, *Pull request merged → Done*, *Item added → Backlog*.
- [ ] Board views: *CODER Ready* (`label:CODER status:Ready`), *By milestone*.
- [ ] Fine-grained token `GH_AGENCY_TOKEN` → add the new repo (see [SECURITY_TOKENS.md](SECURITY_TOKENS.md)).
- [ ] Cloudflare Pages → connect repo → per-PR previews.

## 3. Notion (Chief bot via connector; the script prints exact values)
- [ ] **Clients** row: Name, Phase=Discovery, Price (BDT), Target launch, Deposit status=Not invoiced, Tracking issue, Project board, Repo.
- [ ] **Invoices & Payments**: Draft rows (deposit / design / final), each linked to the client. Numbering `HT-YYYY-NNN`.
- [ ] Proposal page + client status page (copy Client A's structure) linked from the Clients row.
- [ ] PRIVATE `tools/sync/config.local.json`: add the repo to `repos` and map it in `clients`; add the board number to `boards` in `tools/sync/config.json`; add the client to the PRIVATE `tools/status/status.local.json` and the hygiene denylist (`tools/hygiene.local.json` + repo secret `HYGIENE_DENYLIST`). Then run `/workspace/agency/bin/agency-daily.sh` (Tasks rows appear automatically).

## 4. Content & first work
- [ ] Fill `docs/SPEC.md` and `docs/CLIENT.md` in the new repo (verified facts only).
- [ ] First `CODER` issue: *Scaffold site + preview deployments* → **Ready**.
- [ ] Trainee: Hope creates the content brief + competitor scan tasks in the Notion **Tasks** DB (Type = Business/Marketing, Assignee = Trainee, brief on the page). Trainee work is Notion-only; no GitHub issue needed.

## 5. Money gates (Hope only)
- [ ] Proposal/agreement + deposit invoice **sent by Hope** (Invoices: Status=Sent, Sent date = today).
- [ ] No design work until the deposit is **Paid**. Only Hope marks Paid, after checking the bank statement and ticking the bank-check box in Notion.
