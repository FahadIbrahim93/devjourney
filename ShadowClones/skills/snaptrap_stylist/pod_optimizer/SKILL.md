---
name: pod_optimizer
description: Optimize print-on-demand for streetwear. Quality, cost, lead time, supplier selection.
version: 1.0.0
triggers:
  - "print on demand"
  - "POD supplier"
  - "dropship t-shirts"
  - "low-inventory drop"
tags: [snaptrap, pod, print-on-demand, dropshipping, manufacturing]
---

# POD Optimizer

## Purpose
Optimize print-on-demand (POD) operations for streetwear: supplier selection, quality control, cost reduction, lead time.

## Trigger Conditions
- New SKU planned
- Quality issues with current POD
- User asks "should I use POD or bulk?"
- New POD supplier evaluation
- On-demand via `/pod_optimizer <need>`

## Required Inputs
- **Product type** (tee, hoodie, hat, accessory)
- **Volume** (units per drop, per month)
- **Quality requirements** (low, medium, premium)
- **Lead time tolerance** (days)
- **Budget per unit**

## Steps

### 1. Decide: POD vs Bulk
| Factor | POD | Bulk |
|--------|-----|------|
| Upfront cost | $0 | $1K-10K+ |
| Per-unit cost | $20-40 | $5-15 |
| Lead time | 5-15 days | 4-8 weeks |
| Quality | Variable | Consistent |
| Customization | Easy | Hard (MOQ) |
| Risk | Low | High |
| Best for | Test designs, low volume | Proven designs, high volume |

**Recommendation:**
- **Test phase:** POD (low risk)
- **Proven product (3+ sales):** Switch to bulk

### 2. POD Supplier Selection

**Top POD Suppliers (streetwear-friendly):**
- **Printful:** Premium quality, 5-7 day production, $15-30 blanks
- **Printify:** Lower cost, more supplier options, variable quality
- **Gooten:** Mid-tier, good for basics
- **SPOD:** Fast (2-3 day production), competitive pricing
- **CustomCat:** Good for all-over-print

**Quality tiers:**
- **Premium:** Bella+Canvas, AS Colour, Independent Trading (hoodies)
- **Mid:** Gildan, Next Level, Hanes
- **Budget:** Generic blanks (avoid for premium brand)

**For SnapTrap aesthetic, recommend:**
- Tees: AS Colour or Bella+Canvas (heavyweight, modern fit)
- Hoodies: Independent Trading (premium fleece, oversized)
- Hats: Yupoong or Richardson

### 3. Cost Calculation

**Example: 50 unit tee drop**
- Blank: $8 (AS Colour Staple Tee, wholesale)
- Print: $5 (DTG, front + back)
- Total cost: $13
- Retail: $55
- Margin: $42 (76%)

**vs bulk:**
- Blank: $4 (100-unit order, AS Colour)
- Print setup: $50 (screen printing setup)
- Print per unit: $2
- Total cost: $6
- Retail: $55
- Margin: $49 (89%)

**Difference:** Bulk makes $7 more per unit. At 100 units = $700. At 1,000 units = $7,000.

**Break-even:** Bulk starts making sense at 50+ units of same design.

### 4. Quality Control
- Order samples from 3 suppliers (always)
- Check: Print quality, fabric feel, stitching, sizing
- Test wash: Does print crack? Does fabric shrink?
- Customer feedback: Track "quality" mentions in reviews

### 5. Lead Time Management
- **Drop day:** Pre-produce if possible (bulk + hold)
- **POD only:** Use a "pre-order" model
  - Open pre-orders for 7 days
  - Order from POD at close
  - Ship in 10-14 days
  - Communicate timeline clearly

### 6. Mockup Generation
- Use: Placeit, Smartmockups, Mockup World (free)
- Lifestyle mockups: Looka, Renderforest
- Custom: Photoshop (replace blank in real photo)

### 7. Shipping + Returns
- POD suppliers ship directly to customer (blind drop-ship)
- Set your own return policy (most POD doesn't accept returns easily)
- Customer service: Handle directly (don't blame POD)
- Tracking: Sync via Shopify + supplier app

### 8. Switch to Bulk (When Ready)
- Sign of success: 50+ units of same design
- Get bulk samples (3-5 suppliers)
- Negotiate MOQ (start with 50-unit minimum)
- Plan cash flow (deposit + balance on delivery)

## Output Format

```markdown
🎨 **POD STRATEGY — DRIP 003 (MUDCLOTH)**

**Decision: HYBRID**
- Pre-orders for new designs (POD)
- Bulk for proven sellers (last 2 designs that hit 50+ units)

**Recommended Suppliers:**

| Product | Supplier | Blank Cost | Print Cost | Lead Time | Quality |
|---------|----------|-----------|-----------|-----------|---------|
| Tee | Printful + AS Colour | $9 | $5 | 6 days | ⭐⭐⭐⭐⭐ |
| Hoodie | Printful + Independent | $22 | $7 | 7 days | ⭐⭐⭐⭐⭐ |
| Hat | Printify + Yupoong | $8 | $3 | 5 days | ⭐⭐⭐⭐ |

**Sample order plan:**
- Order 1 of each (3 pieces total) for quality check
- Test wash + wear
- Decision: ship samples, get team feedback

**Cost model (50 units):**

| Piece | Cost | Retail | Margin | Margin % |
|-------|------|--------|--------|----------|
| Mudcloth Tee | $14 | $55 | $41 | 75% |
| Mudcloth Hoodie | $29 | $115 | $86 | 75% |
| Mudcloth Hat | $11 | $45 | $34 | 76% |

**Total cost: $1,250 (50 units)**
**Total revenue: $5,375**
**Net: $4,125**

**Drop strategy:**
- Open pre-orders July 25 - Aug 1
- Aug 1: Close pre-orders, place POD order
- Aug 8-10: First units ship
- Aug 15: Most customers received
- Communicate clearly: "Ships within 14 days"

**Quality safeguards:**
- Order 5% extra (for replacements, samples)
- Inspect 10% of orders before shipping
- Track quality complaints (target <2%)
- Switch suppliers if quality drops
```

## Example Invocation

User: "Should I POD or bulk for my next drop?"
Assistant: [Analyzes, recommends, calculates costs]

## Verification
- [ ] POD vs bulk trade-off clear
- [ ] Multiple suppliers considered
- [ ] Cost per unit accurate
- [ ] Lead time communicated
- [ ] Quality control plan
- [ ] Shipping + returns addressed
- [ ] Switch-to-bulk path planned

## Common Pitfalls
- ❌ Using cheapest supplier (quality kills brand)
- ❌ No samples ordered (surprise on first order)
- ❌ POD forever (lower margins)
- ❌ Bulk too early (unsold inventory)
- ❌ No QC process
- ❌ Forgetting to communicate lead time to customers
- ❌ Bad mockups (looks different in person)

## Related Skills
- `drop_planner` — POD is part of drop execution
- `visual_identity_guard` — Mockups must match brand
- `inventory_forecaster` — POD = no inventory tracking needed
