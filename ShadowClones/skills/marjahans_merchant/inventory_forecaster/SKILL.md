---
name: inventory_forecaster
description: Predict stock needs, identify slow movers, optimize reorder timing.
version: 1.0.0
triggers:
  - "inventory check"
  - "what to reorder"
  - "slow moving stock"
  - "demand forecast"
tags: [marjahans, inventory, forecasting, ecommerce]
---

# Inventory Forecaster

## Purpose
Predict stock needs, identify slow movers, optimize reorder timing. Avoid stockouts and dead stock.

## Trigger Conditions
- Daily cron (10 AM)
- User asks "what should I reorder?"
- Quarterly inventory review
- Before/after sales events
- On-demand via `/inventory_forecaster`

## Required Inputs
- **Sales history** (last 90 days minimum, 365 ideal)
- **Current stock levels**
- **Lead time** (how long from order to restock)
- **Seasonality** (Bangladeshi wedding seasons, Eid, Pohela Boishakh)
- **Marketing calendar** (planned campaigns, drops)

## Steps

### 1. Pull Current Inventory
- All SKUs and quantities
- Days of inventory remaining (DOH = stock / avg daily sales)
- Categorize:
  - **Out of stock:** 0 units
  - **Low stock:** < 14 DOH
  - **Healthy:** 14-90 DOH
  - **Overstock:** > 90 DOH
  - **Dead stock:** No sales in 90+ days

### 2. Sales Velocity Analysis
- **Average daily sales** (last 30, 60, 90 days)
- **Trend:** Growing, stable, declining
- **Velocity tier:**
  - Hot: > 5 sales/day
  - Warm: 1-5 sales/day
  - Cold: 0.1-1 sales/day
  - Frozen: 0 sales/day

### 3. Demand Forecasting
For each SKU:
- **30-day forecast:** Recent velocity × 30
- **Seasonality adjustment:** +X% for wedding season, Eid, etc.
- **Confidence interval:** ±25% (if limited data) to ±5% (if 365+ days)

### 4. Reorder Calculation
- **Reorder point:** (avg daily sales × lead time) + safety stock
- **Safety stock:** 7-14 days of inventory (buffer)
- **Reorder quantity:** Forecast demand for next 60-90 days - current stock
- **MOQ consideration:** Order at least Minimum Order Quantity

### 5. Slow Mover Strategy
For SKUs with declining or zero sales:
- **Bundle:** Pair with hot seller
- **Discount:** 20-40% off
- **Repurpose:** Melt down for new design (if applicable)
- **Donate:** Tax write-off, brand goodwill
- **Hold:** Wait for right season (e.g., wedding jewelry in off-season)

### 6. Output Action Plan
- **URGENT REORDER:** X SKUs, $Y total
- **PLAN REORDER:** X SKUs, $Y total (in 2-4 weeks)
- **BUNDLE:** X SKUs (slow movers to pair with hot)
- **DISCOUNT:** X SKUs (clearance)
- **MONITOR:** X SKUs (stable, no action)

## Output Format

```markdown
📦 **INVENTORY REPORT — June 6, 2026**

**Summary:**
- Total SKUs: 142
- Out of stock: 8 (5.6%)
- Low stock: 23 (16.2%)
- Healthy: 89 (62.7%)
- Overstock: 14 (9.9%)
- Dead stock: 8 (5.6%)

**🔥 URGENT REORDER (Lead time > stock):**

| SKU | Product | Current | Daily Sales | DOH | Order Qty | Cost |
|-----|---------|---------|-------------|-----|-----------|------|
| BC-001 | Brass Cuff | 3 | 1.2 | 2.5 | 50 | $400 |
| NE-022 | Gold Necklace | 0 | 0.8 | 0 | 30 | $900 |
| RE-015 | Resin Earrings | 5 | 0.5 | 10 | 40 | $200 |

**Total urgent: 9 SKUs, $2,100**

**📋 PLAN REORDER (next 2-4 weeks):**
- 14 SKUs approaching reorder point
- Total: $3,200
- Most urgent: Wedding bangles (season starts in 6 weeks)

**📉 SLOW MOVERS (> 60 DOH, declining sales):**
- SS-003 (Silver Studs): 90 units, 0.1 sales/day → BUNDLE with hot earring set
- BK-007 (Bracelet): 65 units, 0 sales in 30 days → 30% off clearance
- PD-002 (Pendant): 50 units, 0.2 sales/day → Repurpose for new design

**💀 DEAD STOCK (no sales in 90+ days):**
- 8 SKUs, $1,200 cost → Consider donation + tax write-off

**📈 UPCOMING DEMAND:**
- Wedding season starts in 6 weeks (Bangladesh peak: Nov-Feb, but Nov bookings start now)
- Eid ul-Fitr 2027: ~3 months out, but pre-orders start in 2 months
- Pohela Boishakh: 10 months out

**Recommendations:**
1. Order wedding bangles NOW (lead time is 4-6 weeks)
2. Pair slow earrings with hot cuff for bundle promotion
3. 30% off clearance on dead-stock bracelets
4. Re-evaluate pricing on overstocked silver studs
5. Plan Eid 2027 collection: start sketches next month
```

## Example Invocation

User: "What should I reorder this week?"
Assistant: [Pulls inventory, calculates reorder, outputs action plan]

## Verification
- [ ] All SKUs accounted for
- [ ] Sales data is current (last 7 days)
- [ ] Lead times are accurate
- [ ] Seasonality is considered
- [ ] Reorder quantities are realistic
- [ ] Slow movers have action plan
- [ ] Total cost is calculated

## Common Pitfalls
- ❌ Ignoring lead time (stockout before restock arrives)
- ❌ Reordering too much (cash flow tied up in stock)
- ❌ Not accounting for seasonality
- ❌ Letting dead stock accumulate (warehouse cost)
- ❌ Forgetting minimum order quantities
- ❌ No buffer / safety stock

## Related Skills
- `product_storyteller` — Revive slow movers with new story
- `campaign_builder` — Email campaign for overstocked items
- `seo_optimizer` — Boost organic traffic to product pages
