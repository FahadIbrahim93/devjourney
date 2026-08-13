---
name: onchain_flow_analysis
description: Track exchange reserves, whale movements, network activity. Translation layer: on-chain → market signal.
version: 1.0.0
triggers:
  - "on-chain analysis"
  - "whale movement"
  - "exchange reserves"
  - "are whales accumulating"
  - "is supply drying up"
tags: [crypto, onchain, whales, flow-analysis]
---

# On-Chain Flow Analysis

## Purpose
Read on-chain data (exchange reserves, whale wallets, network activity) and translate it into actionable market signals.

## Trigger Conditions
- Daily cron at market open
- User asks "what are whales doing?"
- User asks "is supply drying up?"
- On-demand via `/onchain_flow_analysis <asset>`

## Required Inputs
- **Asset** (default: BTC, ETH)
- **Time horizon** (24h, 7d, 30d)

## Steps

### 1. Pull Current On-Chain Data
- **Exchange BTC reserves** (Glassnode, CryptoQuant, CoinGecko)
- **Whale wallet changes** (1K+ BTC, 10K+ ETH)
- **Exchange netflow** (inflow vs outflow 24h, 7d)
- **Network activity** (active addresses, transaction count, hashrate)
- **Stablecoin supply** (USDT, USDC minting/burning)
- **Long-term holder behavior** (LTH SOPR, spent output age bands)

### 2. Identify Trends (vs 7d, 30d averages)
- Exchange reserves: increasing = selling pressure, decreasing = accumulation
- Whale wallets: +N wallets = accumulation, -N = distribution
- Netflow: positive = exchanges receiving (sell), negative = leaving (buy/hold)
- Active addresses: increasing = adoption, decreasing = disengagement
- Stablecoin supply: increasing = dry powder, decreasing = deployed

### 3. Cross-Reference Signals
- **Bullish combo:** Reserves ↓ + Whales ↑ + Netflow negative + Active addresses ↑
- **Bearish combo:** Reserves ↑ + Whales ↓ + Netflow positive + Active addresses ↓
- **Conflicting signals:** Note explicitly, weight by strength

### 4. Translate to Market Signal
- **Strong bullish:** 4/4 signals bullish
- **Bullish:** 3/4 bullish
- **Neutral:** 2/2 or conflicting
- **Bearish:** 3/4 bearish
- **Strong bearish:** 4/4 bearish

### 5. Output with Context
- Always provide the "why" — what does this mean for price?
- Note any unusual activity (single large transaction, exchange hack rumors, etc.)
- Reference historical analogs if relevant

## Output Format

```markdown
🔗 **ON-CHAIN: BTC**

**Exchange Reserves:**
- Current: 2.1M BTC (lowest since 2018)
- 7d change: -12,400 BTC
- 30d change: -38,000 BTC
- Signal: 🟢 Bullish (supply drying up)

**Whale Wallets (1K+ BTC):**
- Current: 2,143
- 7d change: +47 wallets
- 30d change: +128 wallets
- Signal: 🟢 Bullish (accumulation)

**Netflow (24h):**
- Inflow: 8,200 BTC
- Outflow: 14,500 BTC
- Net: -6,300 BTC (outflow)
- Signal: 🟢 Bullish (withdrawals)

**Network Activity:**
- Active addresses (7d): 1.1M (+5% vs avg)
- Hashrate: 620 EH/s (ATH)
- Signal: 🟢 Bullish (organic demand)

**Composite Signal: 🟢🟢🟢🟢 STRONG BULLISH**

**Translation:** Supply is drying up faster than expected. Whales are accumulating. Hashrate at ATH = miners confident. This is a structural setup for higher prices.

**Watch:** If reserves suddenly jump +20K BTC in 1 day, that would signal distribution. Otherwise, the trend supports accumulation.
```

## Example Invocation

User: "/onchain_flow_analysis BTC 7d"
Assistant: [Pulls data, analyzes, outputs formatted analysis]

User: "What are ETH whales doing?"
Assistant: [Runs on ETH, returns formatted output]

## Verification
- [ ] All data is from real on-chain sources (no fabrication)
- [ ] Time horizons are clear
- [ ] Signals are weighted, not binary
- [ ] Output includes "what to watch" (next triggers)
- [ ] Translation is honest (don't oversell weak signals)

## Related Skills
- `chart_pattern_recognition` — Combine with TA for confluence
- `sentiment_tracker` — On-chain vs social sentiment
- `defi_yield_optimizer` — Use on-chain TVL data for DeFi yields
