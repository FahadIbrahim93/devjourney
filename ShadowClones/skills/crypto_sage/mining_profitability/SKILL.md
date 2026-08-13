---
name: mining_profitability
description: Calculate ROI on mining hardware, electricity costs, break-even analysis.
version: 1.0.0
triggers:
  - "is mining profitable"
  - "mining ROI"
  - "rig profitability"
  - "should I keep mining"
tags: [crypto, mining, hardware, ROI]
---

# Mining Profitability Calculator

## Purpose
Calculate ROI and break-even for crypto mining hardware, with current network conditions.

## Trigger Conditions
- Monthly mining audit cron
- User asks "is mining still profitable?"
- User asks "should I buy a new rig?"
- On-demand via `/mining_profitability <rig_id>`

## Required Inputs
- **Rig specs** (hashrate, power consumption, purchase cost)
- **Electricity rate** ($/kWh)
- **Coin** (BTC, LTC, KAS, etc.)

## Steps

### 1. Pull Network Conditions
- Current network hashrate
- Block reward
- Block time
- Difficulty (next adjustment)
- Current coin price

### 2. Calculate Daily Output
```
daily_revenue = (rig_hashrate / network_hashrate) * blocks_per_day * block_reward * coin_price
```

### 3. Calculate Daily Costs
```
daily_electricity_cost = (rig_power_watts / 1000) * 24 * electricity_rate
```

### 4. Net Daily Profit
```
net_daily = daily_revenue - daily_electricity_cost
```

### 5. Break-Even Analysis
```
days_to_breakeven = rig_cost / net_daily
roi_12_months = (net_daily * 365) / rig_cost * 100  # %
```

### 6. Recommendation
- **Continue:** ROI positive, room to grow
- **Upgrade:** Old rig, new model more efficient
- **Exit:** Negative ROI, sell hardware
- **Switch coin:** Current coin unprofitable, altcoin better

## Output Format

```markdown
⛏️ **MINING AUDIT — Rig #1: Antminer S21**

**Specs:**
- Hashrate: 200 TH/s
- Power: 3,500W
- Purchase cost: $5,000
- Age: 8 months

**Network Conditions:**
- BTC price: $67,500
- Network hashrate: 620 EH/s
- Block reward: 3.125 BTC
- Difficulty: next +2.1%

**Daily Numbers:**
- Gross revenue: $13.40
- Electricity cost: $8.40 ($0.10/kWh × 84 kWh)
- Net profit: $5.00/day
- Monthly net: $150

**ROI Analysis:**
- Days to break-even (from purchase): 1,000 days (33 months)
- Current ROI: -20% (price dropped since purchase)
- 12-month forward ROI: +18% (if conditions stable)

**Recommendation:** ⚠️ **MARGINAL**
- Hardware still working, but ROI is thin
- Electricity rate is the killer — if you can get to $0.06/kWh, ROI jumps to 35%
- Difficulty keeps rising — expect 2-3% monthly revenue decline
- Consider: (a) negotiate better electricity, (b) switch to Kaspa (lower difficulty), (c) exit

**Watch:**
- BTC price > $80K = profitable at current difficulty
- Difficulty +10% in 30 days = break-even pushed out 1 month
- Halving impact (April 2028): block reward 1.5625 BTC, daily revenue halves
```

## Example Invocation

User: "Should I buy an Antminer S21 at $5K with $0.10/kWh electricity?"
Assistant: [Calculates, recommends based on conditions]

User: "/mining_profitability"
Assistant: [Audits all rigs in user's portfolio]

## Verification
- [ ] All numbers from real network data
- [ ] Electricity rate accurate
- [ ] Difficulty adjustment considered
- [ ] Honest about break-even timeline
- [ ] Halving impact noted (if BTC)

## Related Skills
- `defi_yield_optimizer` — Compare mining vs DeFi yields
- `onchain_flow_analysis` — Hashrate trends
- `sentiment_tracker` — Sentiment on mining stocks
