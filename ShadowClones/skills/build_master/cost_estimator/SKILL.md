---
name: cost_estimator
description: Build accurate project cost estimates. Materials, labor, permits, contingency.
version: 1.0.0
triggers:
  - "estimate cost"
  - "price this project"
  - "what should I charge"
  - "budget breakdown"
tags: [build, cost-estimate, pricing, construction]
---

# Cost Estimator

## Purpose
Build accurate project cost estimates. Materials, labor, permits, overhead, profit, contingency. The right price, not a guess.

## Trigger Conditions
- New project estimate needed
- User asks "what should I charge?"
- Pre-proposal pricing
- On-demand via `/cost_estimator <project>`

## Required Inputs
- **Project description** (what's being built/renovated)
- **Scope** (from project_scoper)
- **Quantity takeoff** (areas, lengths, counts)
- **Quality tier** (economy, standard, premium, luxury)
- **Location** (BD, US, UK — labor + materials vary)
- **Timeline** (faster = more expensive)

## Steps

### 1. Quantity Takeoff
For each line item, calculate quantity:
- **Area:** Square feet / square meters (floor, wall, ceiling, roof)
- **Length:** Linear feet / meters (pipe, wire, trim)
- **Count:** Number of items (outlets, fixtures, doors)
- **Volume:** Cubic yards (concrete, excavation)
- **Weight:** Tons (steel, fill)

**Sources:**
- Architectural drawings
- Site measurements
- Historical data from past projects

### 2. Material Costs
For each material:
- **Unit cost:** Current market price (per sq ft, linear ft, each, cubic yard)
- **Quantity:** From takeoff
- **Subtotal:** Unit × Quantity
- **Waste factor:** Add 5-15% (depending on material)
- **Delivery:** Often 5-10% of material cost
- **Total material cost**

**Sources for current pricing:**
- Local supplier quotes (preferred)
- RSMeans (industry standard, US)
- Online catalogs
- Past invoices

### 3. Labor Costs
For each trade:
- **Hours per unit** (e.g., 0.05 hr/sq ft for drywall install)
- **Hourly rate** (varies by location, skill)
- **Quantity** (from takeoff)
- **Total hours × rate = labor cost**
- **Add:** Supervision, benefits, payroll taxes (typically 30-40% on top of base wage)

**Sources:**
- Past project data
- Industry standards (RSMeans)
- Local labor surveys
- Subcontractor quotes

### 4. Subcontractor Costs
For specialty work (electrical, plumbing, HVAC, etc.):
- **Get 3 quotes minimum** (always)
- **Itemized:** Materials + labor + overhead + profit
- **Verify scope:** What's included / not
- **Mark-up:** Add 10-20% for coordination/management
- **Total subcontract cost**

### 5. Permits + Inspections
- **Building permit:** Usually % of project cost (1-3% in BD, 0.5-2% in US)
- **Specialty permits:** Demolition, electrical, plumbing
- **Impact fees:** New construction, in some cities
- **Inspections:** Often included in permit cost

### 6. Equipment Costs
- **Owned equipment:** Depreciation + maintenance
- **Rented equipment:** Daily/weekly rate × duration
- **Crane, scaffolding, etc.:** Specialty
- **Total equipment cost**

### 7. Overhead + General Conditions
- **Office staff:** Project manager, accountant, etc. (allocate %)
- **Insurance:** General liability, workers' comp
- **Vehicles:** Trucks, fuel, maintenance
- **Storage:** Job site trailer, security
- **Utilities:** Temporary power, water
- **Cleanup:** Daily + final
- **Total overhead:** Typically 8-15% of direct costs

### 8. Profit Margin
- **Small projects (<$50K):** 15-25%
- **Medium projects ($50K-$500K):** 10-18%
- **Large projects ($500K+):** 5-12%
- **Competitive bids:** Lower (5-8%)
- **Preferred clients:** Higher (15-20%)
- **Risk premium:** Add 3-5% for risky projects

### 9. Contingency
- **New construction:** 8-12% contingency
- **Renovation:** 12-20% (more unknowns)
- **Repair / emergency:** 20-30%
- **Includes:** Unforeseen conditions, change orders, price escalation

### 10. Final Estimate Summary

```
Direct Costs:
  Materials:           $X
  Labor:               $X
  Subcontractors:      $X
  Permits:             $X
  Equipment:           $X
  ─────────────────────────
  Direct subtotal:     $X

Indirect Costs:
  Overhead (12%):      $X
  Profit (15%):        $X
  Contingency (10%):   $X
  ─────────────────────────
  TOTAL BID PRICE:     $X
```

## Output Format

```markdown
💰 **COST ESTIMATE: Gulshan Heights — 5,000 sq ft Office Renovation**

**Quality tier:** Standard
**Location:** Dhaka, Bangladesh
**Timeline:** 12 weeks

**MATERIALS:**
| Item | Quantity | Unit Cost | Subtotal |
|------|----------|-----------|----------|
| Drywall (4x8 sheets) | 120 | $14 | $1,680 |
| Joint compound | 50 gal | $8 | $400 |
| LVT flooring | 5,200 sq ft | $4.50 | $23,400 |
| LED panels | 24 | $45 | $1,080 |
| Paint | 80 gal | $25 | $2,000 |
| Subtotal materials | | | $32,400 |
| Waste (10%) | | | $3,240 |
| Delivery (5%) | | | $1,620 |
| **Total materials** | | | **$37,260** |

**LABOR:**
| Trade | Hours | Rate | Subtotal |
|-------|-------|------|----------|
| Drywall hangers | 200 | $3.50/hr | $700 |
| Painters | 320 | $3.00/hr | $960 |
| Flooring installers | 130 | $4.00/hr | $520 |
| Electricians (sub) | — | — | $8,000 |
| HVAC (sub) | — | — | $5,000 |
| **Total labor** | | | **$15,180** |

**OTHER:**
- Permits: $1,500
- Equipment (scaffolding, etc.): $2,000
- **Subtotal other: $3,500**

**DIRECT COSTS: $55,940**

**INDIRECT COSTS:**
- Overhead (12%): $6,713
- Profit (15%): $8,391
- Contingency (12%): $6,713
- **Subtotal indirect: $21,817**

**TOTAL BID PRICE: $77,757**

(Round to: $78,000)

**Pricing comparison:**
- Low bid (if 3 bids): $85K - $95K
- Average: $80K - $90K
- This estimate: $78K (slightly under average, room for value-engineering)

**Risk factors:**
- Material prices volatile (cement + steel up 8% YoY)
- Skilled labor shortage (electrician availability)
- Client requested fast timeline (8 weeks vs 12 = 20% labor premium)

**Recommendation:** Submit at $82K (with 5% buffer for negotiation)
```

## Example Invocation

User: "What should I charge for a 2,000 sq ft kitchen renovation?"
Assistant: [Asks questions, builds takeoff, calculates estimate, recommends price]

## Verification
- [ ] Quantity takeoff is accurate
- [ ] Material costs are current
- [ ] Labor rates are local
- [ ] 3+ subcontractor quotes obtained
- [ ] Permits included
- [ ] Overhead + profit reasonable
- [ ] Contingency appropriate
- [ ] Total is competitive but profitable

## Common Pitfalls
- ❌ "Gut feel" pricing (always underbid)
- ❌ Not including waste factor (5-15% material loss)
- ❌ No subcontractor quotes (guessing)
- ❌ Skipping permits (clients don't want surprises)
- ❌ Low overhead (you go out of business)
- ❌ No contingency (1 surprise = negative margin)
- ❌ Forgetting mobilization, cleanup, supervision

## Related Skills
- `proposal_writer` — Estimate drives the proposal price
- `project_scoper` — Scope determines what to estimate
- `permit_navigator` — Permit costs and timeline
