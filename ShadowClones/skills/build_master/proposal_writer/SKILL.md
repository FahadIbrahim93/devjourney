---
name: proposal_writer
description: Write winning proposals for real estate / construction / development projects.
version: 1.0.0
triggers:
  - "write a proposal"
  - "RFP response"
  - "project pitch"
  - "BD proposal"
tags: [build, proposal, RFP, real-estate, business-development]
---

# Proposal Writer

## Purpose
Write winning proposals for real estate, construction, and development projects. From RFP to signed contract.

## Trigger Conditions
- New RFP / tender opportunity
- User asks "help me write a proposal"
- Inbound lead needs pitch
- On-demand via `/proposal_writer <project>`

## Required Inputs
- **Project / opportunity** (description)
- **Client** (name, type, decision-maker)
- **Scope** (what are you proposing to do?)
- **Budget** (your costs, your price)
- **Timeline** (your proposed schedule)
- **Competition** (who else is bidding?)

## Steps

### 1. Discovery (Before Writing)
- Read the RFP/tender thoroughly (every line)
- Visit the site (if possible)
- Talk to the client (in-person or video)
- Identify: decision criteria, hot buttons, risk concerns
- Find: 3-5 past projects similar to theirs
- Research: client, their business, their values

### 2. Win Theme Development
Every great proposal has 1-2 "win themes" — the recurring message that says "we're the right choice."

**Examples:**
- "20 years of heritage projects in Gulshan"
- "5-star rated by 47 clients"
- "BD Green Building Council certified"
- "On-time, on-budget track record"

Your win theme should be:
- Specific (not "quality service")
- Differentiable (not what everyone claims)
- Evidence-backed (proof points)

### 3. Proposal Structure (Standard)

**Section 1: Executive Summary (1 page)**
- The client's problem (in their words)
- Your solution (1 sentence)
- Why you (1-2 sentences)
- Key differentiators (3-4 bullets)
- Total price + timeline (1 line)

**Section 2: Understanding of the Project (1-2 pages)**
- Restate the requirements
- Identify the key challenges
- Show you understand their business context
- Demonstrate insight (they should think "this team gets it")

**Section 3: Our Approach / Methodology (2-4 pages)**
- Phase 1: Discovery & Design
- Phase 2: Pre-construction & Permits
- Phase 3: Construction
- Phase 4: Handover & Warranty
- For each phase: what, how, when, who, deliverables

**Section 4: Team & Experience (1-2 pages)**
- Key personnel (org chart, CVs)
- Past projects (3-5 most relevant)
- Testimonials / case studies
- Certifications, awards

**Section 5: Schedule (1 page)**
- Gantt chart
- Key milestones
- Critical path
- Buffer / risk

**Section 6: Pricing (1-2 pages)**
- Itemized cost breakdown
- Payment schedule
- What's included / not included
- Optional upgrades

**Section 7: Why Us / Differentiators (1 page)**
- 3-5 specific reasons
- Each with proof point
- Address potential objections

**Section 8: Terms & Conditions (1-2 pages)**
- Legal terms
- Insurance, warranties
- Change order process
- Dispute resolution

### 4. Writing Style
- **Tone:** Confident, not arrogant
- **Length:** As short as possible, as long as necessary
- **Active voice:** "We will build" not "It will be built"
- **Specific:** "20 years" not "extensive experience"
- **Visual:** Diagrams, photos, mockups
- **Scannable:** Headings, bullets, tables
- **Proof:** Every claim has evidence

### 5. Pricing Strategy
- **Cost-plus:** Your costs + margin
- **Fixed price:** Single number (less risk for client, more for you)
- **Time & materials:** Hourly + materials
- **Guaranteed max price (GMP):** Won't exceed X

**Recommendation:** GMP for clients who need budget certainty. Higher margin for fixed price (risk premium).

### 6. Review Process
- **Author:** You (or assigned writer)
- **Reviewer 1:** Subject matter expert (technical accuracy)
- **Reviewer 2:** Sales / BD lead (positioning, win themes)
- **Reviewer 3:** Senior management (sign-off, pricing)
- **Reviewer 4:** Compliance (if public tender)

### 7. Submission
- **Format:** PDF (not Word, not editable)
- **File name:** `[ClientName]_[Project]_[YourCompany]_[Date].pdf`
- **Cover page:** Branded, professional
- **Table of contents:** Yes
- **Page numbers:** Yes
- **Submit on time:** Even 1 min late = disqualified

## Output Format

```markdown
📄 **PROPOSAL: Gulshan Heights — 8-Story Residential**

**Client:** Northshore Development Ltd.
**Submission date:** June 8, 2026
**Bid value:** $4.2M
**Timeline:** 18 months

**Win theme:** "Heritage meets modern — building Gulshan's next landmark with 20 years of local expertise and a 5-star track record."

**Section outline:**
1. Executive Summary
2. Understanding of Northshore's Vision
3. Our Approach (4 phases)
4. Team: [PM], [Architect], [Engineer], [Foreman]
5. Schedule (Gantt: 18 months, with buffer)
6. Pricing: $4.2M (GMP)
7. Why Us: 5 differentiators
8. Terms & Conditions

**Key proof points:**
- 47 5-star reviews on Google
- 12 similar Gulshan projects completed
- BD Green Building Council certified
- 0% change orders in last 5 projects

**Pricing breakdown:**
- Pre-construction & permits: $400K
- Foundation & structure: $1.5M
- Mechanical, electrical, plumbing: $1M
- Interior finishes: $800K
- Exterior & landscaping: $300K
- Project management: $200K

**Differentiation from competitors:**
- Our team has worked with [architect] on 3 prior projects
- We use BIM modeling (most bidders don't)
- 18-month guarantee on all work (industry: 12 months)

**Risks addressed:**
- Permit delays → we have pre-approved relationships with Gulshan City Corp
- Material cost spikes → GMP locks price for client
- Weather delays → 1-month buffer built in
```

## Example Invocation

User: "Help me write a proposal for a 5-story commercial building in Gulshan"
Assistant: [Asks clarifying questions, drafts structure, fills in content]

## Verification
- [ ] Win theme is clear, recurring
- [ ] All sections present
- [ ] Every claim has proof
- [ ] Pricing is itemized
- [ ] Schedule is realistic
- [ ] Risks addressed
- [ ] Reviewed by 2+ people
- [ ] Submitted on time

## Common Pitfalls
- ❌ Generic template (everyone can tell)
- ❌ No site visit (proves you don't care)
- ❌ Pricing buried (transparency matters)
- ❌ No proof points (claims without evidence)
- ❌ Vague schedule ("will be done in 12 months")
- ❌ Submitting late (auto-disqualification)

## Related Skills
- `project_scoper` — Define accurate scope first
- `cost_estimator` — Accurate cost data
- `network_manager` — Who else knows the client?
