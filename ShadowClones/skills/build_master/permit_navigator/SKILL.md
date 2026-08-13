---
name: permit_navigator
description: Get permits, navigate bureaucracy, avoid delays. BD and US permit systems.
version: 1.0.0
triggers:
  - "do I need a permit"
  - "permit process"
  - "building approval"
  - "rajuk approval"
tags: [build, permits, regulatory, construction, compliance]
---

# Permit Navigator

## Purpose
Get the right permits, navigate bureaucracy, avoid delays. Know the process before you start.

## Trigger Conditions
- New project, permit question
- User asks "do I need a permit?"
- Pre-construction planning
- Inspection scheduled
- On-demand via `/permit_navigator <project>`

## Required Inputs
- **Project type** (new build, renovation, addition, repair)
- **Location** (city, country)
- **Scope** (what's being done)
- **Building classification** (residential, commercial, industrial)
- **Project size** (height, area, occupancy)

## Steps

### 1. Determine Required Permits

**Almost always required:**
- **Building permit** (any structural work)
- **Electrical permit** (new circuits, panels, service changes)
- **Plumbing permit** (new lines, fixtures)
- **Mechanical permit** (HVAC changes)

**Often required:**
- **Demolition permit** (tearing down walls, structures)
- **Zoning approval** (change of use, density)
- **Site plan approval** (grading, drainage, parking)
- **Environmental permit** (wetlands, protected areas)

**Sometimes required:**
- **Signage permit**
- **Right-of-way permit** (work in public space)
- **Stormwater permit**
- **Fire department approval** (commercial, high-occupancy)
- **Health department** (food service, healthcare)

**Quick check:** "If the work affects structure, systems, or use → permit likely required."

### 2. Bangladesh-Specific Permits (RAJUK + Local)

**For Dhaka projects:**

**Rajuk (Capital Development Authority):**
- **Building approval:** Required for any new construction, additions, structural changes
- **Process:** Submit plans → 30-90 day review → approval
- **Cost:** Based on plot size, building height, use
- **For high-rises (>10 floors):** BNBC (Bangladesh National Building Code) compliance
- **Recent:** Online submission system (some types)

**Other permits (Dhaka):**
- **DPDC/DESCO:** Electrical connection/upgrade
- **DWASA:** Water/sewer connection
- **Fire Service:** For commercial, high-rise
- **Environment:** For projects > certain size
- **Local ward council:** Sometimes required for small projects

**For other Bangladesh cities:**
- **Chittagong:** CDA (Chittagong Development Authority)
- **Khulna:** KDA
- **Rajshahi:** RDA
- **Other cities:** Local Pourashava/Municipality

**Cost-saving tip:** Hire a "RAJUK dakhal" (middleman) — knows the system, charges 1-3% of project cost, but saves months of delays. **Note:** This is how the system works, even if not ideal.

### 3. US Permits (Generic)

**Most US cities:**
- Building department (city or county)
- Submit online or in person
- Review: 1-4 weeks for residential, longer for commercial
- Inspections: Multiple stages (footing, framing, electrical, plumbing, final)

**Federal (rare for construction):**
- Army Corps of Engineers (wetlands)
- EPA (large projects, environmental)
- Historic preservation (in historic districts)

**State (varies):**
- State environmental (CEQA in CA, SEQRA in NY)
- State building (CA Title 24, FL Building Code)
- Coastal (FL, CA, etc.)

### 4. Permit Process (Standard)

**Step 1: Pre-application meeting** (recommended)
- Meet with building department
- Discuss scope, get feedback
- Identify issues before formal submission
- **Saves time, prevents rejection**

**Step 2: Prepare submission**
- Architectural drawings (stamped by licensed architect/engineer)
- Structural calculations
- Site plan, survey
- MEP drawings
- Title, owner info, contractor info
- Fees

**Step 3: Submit**
- Online portal (most US cities) or in-person
- Pay review fee
- Get application number
- **Track** the application (don't just wait)

**Step 4: Review**
- Plans examiner checks code compliance
- May request corrections (resubmit, no extra fee usually)
- **Cycle:** Submit → corrections → resubmit → approval

**Step 5: Permit issued**
- Post permit on site (visible from street)
- Schedule inspections
- Don't deviate from approved plans without resubmission

**Step 6: Inspections**
- Footing (before pouring)
- Foundation
- Framing
- Rough-in (MEP before closing walls)
- Insulation
- Drywall
- Final
- **Schedule ahead, be ready when inspector arrives**

### 5. Common Permit Pitfalls
- ❌ Starting work without permit (fines, stop-work orders, demolition orders)
- ❌ Wrong drawings (architect vs engineer stamp)
- ❌ Missing signatures (owner, contractor, designer)
- ❌ Incomplete submission (rejected, restart clock)
- ❌ No response to corrections (application abandoned)
- ❌ Permit expired (must renew)
- ❌ Not posting permit on site

### 6. Tips for Faster Approvals
- **Hire architect/engineer familiar with local code** (saves months)
- **Pre-application meeting** (catches issues early)
- **Be responsive to corrections** (turnaround in days, not weeks)
- **Build relationships** (becomes a routine, not adversarial)
- **Use expedited review** (if available, 2x cost for 2x speed)
- **Hire permit expediter** (in big cities, worth the cost)

## Output Format

```markdown
📋 **PERMIT CHECKLIST: Gulshan Heights Renovation**

**Project:** 5,000 sq ft office renovation
**Location:** Dhaka, Bangladesh
**Building type:** Commercial (existing high-rise, 8th floor)

**Permits required:**

| Permit | Authority | Lead Time | Cost | Status |
|--------|-----------|-----------|------|--------|
| RAJUK approval (interior) | RAJUK | 30-60 days | ৳50K | NOT NEEDED (interior, no structural) |
| BNBC compliance | BNBC | N/A | N/A | N/A (not high-rise work) |
| Electrical permit | DPDC | 7-14 days | ৳5K | NEEDED |
| Plumbing permit | DWASA | 7-14 days | ৳3K | NEEDED |
| Fire safety | Fire Service | 14-30 days | ৳8K | NEEDED (commercial) |
| Building interior (ward) | Local Ward | 14-21 days | ৳2K | NEEDED |

**Total permit lead time:** 30 days (parallel applications)
**Total permit cost:** ৳68K

**Critical path:**
1. Hire architect for stamped drawings (1 week)
2. Submit all permits in parallel (Day 8)
3. Follow up weekly (don't wait for them to call you)
4. Electrical + plumbing + fire in hand by Day 30
5. Ward permit by Day 35
6. Construction can start: Day 35

**Risk areas:**
- Fire Service has been slow (backlog of 60+ days)
  - **Mitigation:** Hire fire safety consultant who knows the system
- DPDC requires site visit (5+ day delay possible)
  - **Mitigation:** Schedule visit for Day 9 (right after submission)

**Exemptions check:**
- Interior work only? (Yes)
- No structural changes? (Yes — verified by structural engineer)
- No change of use? (No — was office, stays office)
- **Conclusion:** No RAJUK approval needed (would otherwise be 60-90 day delay)

**Checklist before starting work:**
- [ ] All permits in hand
- [ ] Permits posted on site
- [ ] Architect's drawings match approved plans
- [ ] Contractor has insurance (required for permit issuance)
- [ ] Inspection schedule confirmed

**Document tracking:** [Notion link]
```

## Example Invocation

User: "Do I need a permit to renovate a bathroom in Gulshan?"
Assistant: [Identifies project type, lists required permits, estimates timeline + cost]

## Verification
- [ ] All required permits identified
- [ ] Lead time accurate
- [ ] Cost estimate realistic
- [ ] Risk areas flagged
- [ ] Critical path mapped
- [ ] Pre-application meeting recommended
- [ ] No work started before permits

## Common Pitfalls
- ❌ "It's just a small job, no permit needed" (often wrong)
- ❌ "The contractor will handle it" (you own the property, you own the violation)
- ❌ Not budgeting time for permits (causes project delays)
- ❌ Skipping inspections (problems caught later = expensive)
- ❌ Working without permit (fines, stop-work, demolition)
- ❌ Not following approved plans (revoked permit)

## Related Skills
- `project_scoper` — Permits affect scope
- `cost_estimator` — Permit costs in estimate
- `proposal_writer` — Timeline must include permits
