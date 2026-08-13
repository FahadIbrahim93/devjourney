---
name: innovation_scout
description: Find new construction tech, materials, methods. Apply to your projects for competitive edge.
version: 1.0.0
triggers:
  - "new construction tech"
  - "innovative materials"
  - "modern building methods"
  - "what's new in [category]"
tags: [build, innovation, tech, materials, methods]
---

# Innovation Scout

## Purpose
Identify and apply new construction technologies, materials, and methods. Stay ahead of competitors, deliver better outcomes to clients.

## Trigger Conditions
- User asks "what's new in [category]?"
- Project planning phase (evaluate new options)
- Quarterly innovation review
- On-demand via `/innovation_scout <category>`

## Required Inputs
- **Category** (materials, methods, software, equipment, sustainability)
- **Use case** (what problem to solve)
- **Budget** (premium, standard, value-engineering)
- **Risk tolerance** (proven, early adopter, experimental)

## Steps

### 1. Define Innovation Horizon

**Tier 1 — Proven (low risk):**
- Used in industry 5+ years
- Multiple manufacturers
- Code-approved
- Long-term performance data

**Tier 2 — Emerging (medium risk):**
- Used 2-5 years
- Growing adoption
- May need special approval
- Some early data

**Tier 3 — Cutting-edge (high risk):**
- Used < 2 years
- Few projects, mostly pilots
- May not be code-approved everywhere
- Performance unproven

**Default:** Tier 1-2. Tier 3 only for R&D or visionary clients.

### 2. Scan Sources

**Industry publications:**
- Engineering News-Record (ENR)
- Construction Dive
- Architect Magazine
- BD specific: Construction World BD, The Independent BD real estate section

**Tech sources:**
- BuiltWorlds
- Construction Technology Quarterly
- Autodesk Construction Cloud blog
- Procore blog

**Sustainability:**
- US Green Building Council (LEED)
- BD Green Building Council
- Living Building Challenge

**Conferences:**
- ENR FutureTech
- AIA Conference
- Greenbuild
- BD specific: BIDA events

**YouTube / podcasts:**
- The B1M (construction YouTube)
- Construction Revolution podcast
- The ConTech Crew

**Local:**
- Material supplier reps (visit their showrooms)
- Trade shows (CONEXPO, BAUMA, locally: BUILD EXPO BD)

### 3. Categories to Scout

**Materials:**
- Self-healing concrete
- Cross-laminated timber (CLT) — sustainable alternative
- Transparent wood (emerging)
- Graphene-enhanced concrete
- Recycled plastic bricks
- Mycelium insulation
- Aerogel insulation
- Phase-change materials (PCM) in walls

**Methods:**
- Modular / prefab construction
- 3D-printed buildings
- Robotic brick-laying (SAM, Hadrian X)
- Drone surveying + layout
- BIM-driven design (Building Information Modeling)
- Lean construction (pull planning, takt time)
- Integrated Project Delivery (IPD)

**Software:**
- BIM (Autodesk Revit, ArchiCAD)
- Project management (Procore, Buildertrend, PlanGrid)
- Estimation (RSMeans, ProEst)
- Drone software (DroneDeploy, Pix4D)
- AI-powered scheduling (Alice, nPlan)
- AR/VR for client walkthroughs (IrisVR, Enscape)

**Sustainability:**
- Net-zero building design
- Passive House standards
- Solar-integrated roofing
- Greywater systems
- Rainwater harvesting
- Geothermal HVAC
- Living walls / green roofs
- Mass timber construction

**Equipment:**
- Autonomous / semi-autonomous heavy equipment
- Exoskeletons for workers (reduces injury)
- Electric construction equipment
- Drones for inspection + progress monitoring
- Robotics for rebar tying, demolition

### 4. Evaluate Fit

For each innovation, score:

**Technical fit (1-10):**
- Does it solve the problem?
- Is the quality acceptable?
- Compatible with existing methods?

**Economic fit (1-10):**
- Cost vs traditional method
- ROI timeline
- Lifecycle cost (not just first cost)

**Risk (1-10):**
- Code-approved?
- Performance proven?
- Manufacturer stability?
- Insurance implications?

**Local availability (1-10):**
- Available in your market?
- Local supplier support?
- Local labor familiar?

**Total score:** (Technical + Economic + Local) - Risk

**Adopt if:** Score > 25, Risk < 6, Tier 1-2

### 5. Pilot Before Full Adoption
For Tier 2-3 innovations:
- **Small pilot:** 1 project, 1 application
- **Measure:** Cost, time, quality, client satisfaction
- **Document:** Lessons learned
- **Decide:** Scale, iterate, or drop

## Output Format

```markdown
🔬 **INNOVATION SCOUT: Sustainable Building Materials**

**Scout date:** June 6, 2026
**Category:** Wall systems (for upcoming residential project)
**Tier preference:** 1-2 (proven to emerging)

---

**Top 3 Innovations:**

### 1. Cross-Laminated Timber (CLT) Panels
- **What:** Engineered wood panels (5-7 layers, glued crosswise)
- **Tier:** 1 (proven in EU, growing in US, emerging in BD)
- **Pros:**
  - 30% faster construction (panels arrive pre-cut)
  - Carbon-negative (locks CO2)
  - Lighter than concrete (less foundation cost)
  - Beautiful exposed wood (premium aesthetic)
- **Cons:**
  - Premium cost (15-25% over concrete)
  - Limited suppliers in BD (2 currently)
  - Code updates needed for high-rise
  - Acoustic treatment required for some uses
- **Cost premium:** +20% over concrete block
- **Tier 1 score:** 28/40 (Technical 9, Economic 6, Risk 4, Local 9)
- **Recommendation:** ✅ Specify for 3-story project, monitor for high-rise

### 2. Hempcrete (Hemp + Lime Composite)
- **What:** Bio-composite wall material (hemp shiv + lime binder)
- **Tier:** 2 (proven in EU, emerging in US, unknown in BD)
- **Pros:**
  - Carbon-negative
  - Excellent insulation (R-20+)
  - Vapor-permeable (healthy indoor air)
  - Fire-resistant
- **Cons:**
  - Not load-bearing (needs frame)
  - Long cure time (8+ weeks)
  - Premium cost (3x concrete block)
  - No local hemp supply chain
- **Cost premium:** +200% over concrete block
- **Tier 2 score:** 22/40
- **Recommendation:** ⚠️ Skip for now, monitor

### 3. AAC (Autoclaved Aerated Concrete) Blocks
- **What:** Lightweight, pre-cast concrete blocks (bubbles in concrete)
- **Tier:** 1 (proven globally, available in BD)
- **Pros:**
  - 25% lighter than standard block
  - 4x better insulation
  - Faster install (larger blocks)
  - Fire-resistant (4+ hour rating)
- **Cons:**
  - Premium cost (15% over standard)
  - Special mortar required
  - Cutting requires special tools
- **Cost premium:** +15%
- **Tier 1 score:** 34/40
- **Recommendation:** ✅✅ STRONGLY RECOMMEND for next project

---

**ADOPTION PLAN:**

1. **Immediate (next project):** AAC blocks — proven, available, premium-feeling
2. **Quarter 3:** Pilot CLT on a 3-story residential (verify local supply)
3. **Quarter 4:** Evaluate performance, expand if successful
4. **Skip:** Hempcrete (no local supply, not yet proven in BD)

**Stay informed:**
- Subscribe to: Construction World BD, BD Green Building Council
- Attend: BIDA Tech Summit (October)
- Follow: 5 material supplier LinkedIn pages
- Quarterly: Re-run this scout

**Knowledge sharing:** Document pilot results in [Notion] for team learning
```

## Example Invocation

User: "What's new in sustainable building materials?"
Assistant: [Scans sources, ranks by fit, recommends adoption plan]

## Verification
- [ ] Multiple sources checked
- [ ] Tier 1-3 classification applied
- [ ] Pros AND cons listed
- [ ] Cost premium calculated
- [ ] Local availability checked
- [ ] Pilot plan for emerging tech
- [ ] Update cadence (quarterly)

## Common Pitfalls
- ❌ Adopting Tier 3 tech without pilot
- ❌ Ignoring local availability (US tech not always in BD)
- ❌ Cost-first evaluation (ignore lifecycle savings)
- ❌ "Cool" factor over client needs
- ❌ Not training team on new methods
- ❌ No measurement (can't prove ROI)

## Related Skills
- `proposal_writer` — Use innovation in proposals (differentiator)
- `cost_estimator` — Innovation affects estimate
- `project_scoper` — Innovation can change scope
