---
name: project_scoper
description: Define project scope clearly. Avoid scope creep. Set expectations.
version: 1.0.0
triggers:
  - "define project scope"
  - "what's included"
  - "scope creep"
  - "project boundaries"
tags: [build, scope, project-management, construction]
---

# Project Scoper

## Purpose
Define project scope so clearly that scope creep becomes obvious. Set client expectations. Get sign-off before work starts.

## Trigger Conditions
- New project kickoff
- User asks "what should this include?"
- Scope creep detected
- Contract review
- On-demand via `/project_scoper <project>`

## Required Inputs
- **Project description** (what the client wants)
- **Client's wishlist** (everything they mentioned)
- **Budget** (what they want to spend)
- **Timeline** (when they want it done)
- **Site conditions** (constraints, unknowns)

## Steps

### 1. Discovery (Before Scoping)
- **Walk the site:** Look for red flags (soil issues, access, utilities)
- **Interview the client:** Ask 10+ questions about their vision
- **Pull documents:** Plans, surveys, previous reports
- **Identify stakeholders:** Decision-makers, end-users, neighbors
- **List constraints:** Zoning, building codes, budget limits, timeline

### 2. Scope Categories (The "In/Out" List)

For each category, specify:
- **In scope:** What we WILL do
- **Out of scope:** What we WILL NOT do
- **Assumptions:** What we're assuming is true
- **Dependencies:** What needs to happen first / by others

**Common categories:**
- Design (architectural, structural, MEP)
- Permits (which, by whom, when)
- Site work (demolition, excavation, grading)
- Foundation
- Structure (concrete, steel, framing)
- Envelope (roof, walls, windows)
- Interior (partitions, finishes, fixtures)
- MEP (mechanical, electrical, plumbing)
- Exterior (landscaping, hardscape, lighting)
- Equipment (elevators, specialty)
- Project management (PM, supervision)
- Permits and inspections
- Cleanup
- Warranty period

### 3. Scope Document (Standard Format)

```markdown
# PROJECT SCOPE: [Project Name]

## Overview
[1-paragraph project summary]

## In Scope (What we'll do)
- [Item 1]
- [Item 2]
- [Item 3]

## Out of Scope (What we won't do)
- [Item 1]
- [Item 2]
- [Item 3]

## Assumptions
- [Assumption 1]
- [Assumption 2]

## Dependencies (Client responsibilities)
- [Item 1]
- [Item 2]

## Deliverables
- [Deliverable 1]
- [Deliverable 2]

## Schedule Milestones
- [Milestone 1]: [Date]
- [Milestone 2]: [Date]

## Change Order Process
- Verbal change → written change order (within 48h)
- Client approval required before work begins
- Pricing impact reviewed before commitment
```

### 4. Avoid Scope Creep
- **Document everything:** Every verbal agreement → email follow-up
- **Stick to the scope:** "That's outside the scope" is a complete sentence
- **Charge for changes:** If it's not in scope, it's a change order
- **Educate the client:** "Did you want this in the original scope, or as an addition?"
- **Track changes:** Log every change with $, time impact, schedule impact

### 5. Common Scope Creep Patterns
- "While you're at it, can you also..."
- "I thought that was included..."
- "Can you just do this small thing..."
- "Why isn't this part of the project?"
- "I assumed you'd handle that..."

**Counter:** Reference the signed scope document. Be polite but firm.

### 6. Client Meeting (Set Expectations)
Before contract signing, walk through the scope document:
- "This is what we'll do. Any questions?"
- "This is what we won't do. Are you okay with that?"
- "These are the things you need to do. Understand?"
- "This is the change order process. Fair?"
- Get explicit sign-off (signature, not verbal)

### 7. Tools
- **Scope template:** Use consistently (every project)
- **Change order form:** Standardized
- **Daily log:** Track what's being done (catches creep early)
- **Photo documentation:** Visual record
- **Client portal:** Share progress, get approvals

## Output Format

```markdown
📋 **SCOPE DOCUMENT: Gulshan Heights Renovation**

**Client:** Northshore Development
**Project:** Interior renovation, 5,000 sq ft office space
**Estimated cost:** $180,000
**Timeline:** 12 weeks

**IN SCOPE (we will do):**
- Demolition of existing drywall partitions
- New drywall layout (4 offices, 1 conference room, 1 reception)
- Electrical: 30 new outlets, 4 data drops
- Lighting: 24 LED panel lights, dimmer controls
- HVAC: Re-balance for new layout
- Flooring: LVT throughout, carpet in offices
- Painting: All walls, accent wall in reception
- New ceiling: Drop ceiling with acoustic tiles

**OUT OF SCOPE (we will NOT do):**
- Furniture (desk, chairs, etc.)
- IT equipment / cabling
- Window treatments
- Security system
- Server room build-out
- Elevator modernization
- Exterior work

**ASSUMPTIONS:**
- Site access during business hours (8 AM - 6 PM)
- Existing electrical panel has capacity for additional load
- Walls are non-load-bearing (architect to confirm)
- Flooring is over acceptable substrate

**DEPENDENCIES (client provides):**
- Furniture layout (for electrical planning) — by June 15
- Branding guidelines (for accent wall) — by June 20
- Approval on material samples — within 48h of submission

**DELIVERABLES:**
- Permitted drawings
- Weekly progress photos
- Final walkthrough
- 1-year warranty on workmanship

**SCHEDULE:**
- Week 1-2: Permits, mobilization
- Week 3-4: Demolition, framing
- Week 5-6: Electrical, HVAC
- Week 7-8: Drywall, painting
- Week 9-10: Flooring, ceiling
- Week 11: Fixtures, finishes
- Week 12: Punch list, walkthrough

**CHANGE ORDER PROCESS:**
1. Verbal change request from client
2. Within 24h: written estimate (cost + schedule impact)
3. Client signs off
4. Work begins
5. Added to final invoice

**ACCEPTED BY:**
- Client: ____________ Date: ______
- Contractor: ____________ Date: ______
```

## Example Invocation

User: "Help me define scope for a bathroom renovation"
Assistant: [Asks questions, identifies in/out, creates document]

## Verification
- [ ] In scope is specific, itemized
- [ ] Out of scope is explicit (not implicit)
- [ ] Assumptions are stated
- [ ] Client dependencies are clear
- [ ] Schedule is realistic
- [ ] Change order process is documented
- [ ] Both parties sign

## Common Pitfalls
- ❌ Vague scope ("renovate the kitchen")
- ❌ No out-of-scope list (assumes everything is included)
- ❌ Assumptions not stated (warranty claims later)
- ❌ Client responsibilities not documented
- ❌ No change order process (creep inevitable)
- ❌ Verbal-only sign-off (deniability later)

## Related Skills
- `proposal_writer` — Scope is part of the proposal
- `cost_estimator` — Scope drives cost
- `permit_navigator` — Permits often determine what's in scope
