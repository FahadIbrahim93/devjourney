---
name: defi_yield_optimizer
description: Compare DeFi yield opportunities across protocols. Risk-adjusted ranking with IL considerations.
version: 1.0.0
triggers:
  - "best yield"
  - "DeFi yields"
  - "where to farm"
  - "yield comparison"
tags: [crypto, defi, yield, farming, liquidity]
---

# DeFi Yield Optimizer

## Purpose
Find and rank the best risk-adjusted yield opportunities across DeFi protocols.

## Trigger Conditions
- Weekly portfolio review
- User asks "where should I put my stables?"
- User asks "best yield on USDC?"
- On-demand via `/defi_yield_optimizer <amount> <asset>`

## Required Inputs
- **Capital amount** (default: 10,000 USDC)
- **Asset** (USDC, USDT, DAI, ETH, BTC, altcoin)
- **Risk tolerance** (low, medium, high, degen)

## Steps

### 1. Pull Current Yields
Sources: DefiLlama, Revert, individual protocol dashboards
- **Lending:** Aave, Compound, Morpho, Spark
- **DEX LP:** Uniswap V3/V4, Curve, Balancer
- **Yield aggregators:** Yearn, Beefy, Convex
- **Liquid staking:** Lido, Rocket Pool, Frax
- **Restaking:** EigenLayer, Symbiotic, Karak
- **Perps basis:** Ethena, Hyperliquid
- **Pendle:** PT/YT strategies

### 2. Calculate Net APY
- Gross APY (from protocol)
- Protocol fees
- Gas costs (entry + exit)
- Impermanent loss risk (for LP)
- Smart contract risk (audit status, TVL, age)

### 3. Risk Score (1-10)
- **1-2:** Battle-tested, high TVL, audited, low IL
- **3-4:** Established, some risk
- **5-6:** Newer, smaller TVL, higher IL
- **7-8:** Experimental, unaudited, very high APY
- **9-10:** Likely scam, unsustainable APY

### 4. Risk-Adjusted Ranking
```
risk_adjusted_yield = (gross_apy - gas - IL) / risk_score
```

### 5. Top 5 Opportunities
- Best risk-adjusted (e.g., Aave USDC at 4% risk 2)
- Highest absolute (with risk warning)
- Stablecoin-focused
- ETH/BTC-focused
- Diversified (mix of strategies)

### 6. Allocation Recommendation
- If amount < $50K: 1-2 strategies max
- If amount $50K-$500K: 3-4 strategies
- If amount > $500K: 5+ strategies, multi-chain

## Output Format

```markdown
🌾 **DEFI YIELDS — USDC $50K**

**Top 5 Risk-Adjusted:**

| Rank | Protocol | Strategy | APY | Risk | Net APY | TVL |
|------|----------|----------|-----|------|---------|-----|
| 1 | Aave V3 | Supply USDC | 4.2% | 2/10 | 4.0% | $5.2B |
| 2 | Morpho | Supply USDC (Steakhouse) | 5.8% | 3/10 | 5.5% | $850M |
| 3 | Pendle | PT-sUSDe (Jun 2025) | 11.2% | 4/10 | 10.5% | $1.1B |
| 4 | Curve | 3pool LP | 3.5% | 3/10 | 3.2% | $1.8B |
| 5 | Ethena | USDe staking | 12.5% | 5/10 | 11.8% | $2.4B |

**Recommended Allocation:**
- 50% Aave V3 ($25K @ 4.0% net) — Safety foundation
- 30% Morpho ($15K @ 5.5% net) — Slight yield boost
- 20% Pendle PT-sUSDe ($10K @ 10.5% net) — Yield tier

**Blended APY:** 5.6% (after diversification discount)
**Total 1Y return:** $2,800

**Risks:**
- Smart contract: All audited, but DeFi has hacks
- Pendle PT: Fixed yield, but principal is locked until expiry
- IL: None for lending strategies, applicable for LPs

**Watch:**
- If Aave borrow demand spikes, supply APY rises
- Pendle: roll to new PT at expiry
- Re-balance monthly
```

## Example Invocation

User: "Best yield for 50K USDC, medium risk"
Assistant: [Pulls data, ranks, outputs]

User: "/defi_yield_optimizer 100 ETH"
Assistant: [ETH-focused strategies]

## Verification
- [ ] All APYs from current sources (not stale)
- [ ] Risk scores honest (no hiding IL)
- [ ] Gas costs included
- [ ] No promotion of unaudited/yield-farming scams
- [ ] Disclaimer: DeFi has smart contract risk

## Related Skills
- `onchain_flow_analysis` — TVL trends for protocol health
- `sentiment_tracker` — Sentiment around specific protocols
- `mining_profitability` — Compare DeFi vs mining returns
