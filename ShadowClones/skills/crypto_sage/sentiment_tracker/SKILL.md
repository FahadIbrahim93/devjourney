---
name: sentiment_tracker
description: Track social sentiment, funding rates, fear/greed index. Translation: market mood.
version: 1.0.0
triggers:
  - "market sentiment"
  - "fear and greed"
  - "are people bullish"
  - "funding rate"
tags: [crypto, sentiment, social, funding-rates]
---

# Sentiment Tracker

## Purpose
Read the market's emotional temperature across social, derivatives, and on-chain signals.

## Trigger Conditions
- Daily cron at market open
- User asks "what's the vibe?"
- User asks "is everyone bullish?"
- On-demand via `/sentiment_tracker`

## Required Inputs
- **Asset** (default: BTC + general market)
- **Time horizon** (24h, 7d, 30d)

## Steps

### 1. Fear & Greed Index
- Current value (0-100)
- Yesterday
- Last week
- Trend: rising, falling, stable
- Translation: 0-25 extreme fear, 25-45 fear, 45-55 neutral, 55-75 greed, 75-100 extreme greed

### 2. Funding Rates (Perpetuals)
- BTC funding (8h)
- ETH funding (8h)
- Top altcoins
- Positive = longs pay shorts (greed)
- Negative = shorts pay longs (fear)
- Extreme positive (>0.1%) = overleveraged long, correction likely
- Extreme negative (<-0.05%) = overleveraged short, squeeze likely

### 3. Social Sentiment
- Twitter/X mentions (24h, % change)
- Reddit activity (r/bitcoin, r/ethfinance, r/cryptocurrency)
- Google Trends (search interest)
- Trending tickers on CT
- Tone analysis: bullish %, bearish %, neutral %

### 4. Open Interest
- Total OI (BTC, ETH, all)
- 24h change
- High OI + rising price = strong trend
- High OI + falling price = cascade risk
- Low OI + rising price = weak rally

### 5. Liquidations (24h)
- Total longs liquidated
- Total shorts liquidated
- Largest single liquidation
- Pattern: which side getting wrecked

### 6. Composite Sentiment
Weight all signals into single score:
- **Extreme Fear (contrarian buy):** 0-20
- **Fear:** 20-40
- **Neutral:** 40-60
- **Greed:** 60-80
- **Extreme Greed (contrarian sell):** 80-100

## Output Format

```markdown
😱🤑 **MARKET SENTIMENT — BTC + Total Crypto**

**Fear & Greed Index:**
- Current: 72 (Greed)
- 24h: 70
- 7d: 65
- Trend: ↗️ Rising

**Funding Rates (8h):**
- BTC: +0.045% (slightly elevated)
- ETH: +0.038%
- SOL: +0.092% (high)

**Social Sentiment:**
- X mentions: 245K (24h) +12% vs 7d avg
- Bullish %: 64%
- Bearish %: 22%
- Neutral %: 14%
- Trending: $BTC, $SOL, $DOGE, halving

**Open Interest:**
- Total: $32B (+3% 24h)
- BTC OI: $18B
- ETH OI: $8B
- Trend: Rising OI + rising price = strong trend, but watch for cascades

**Liquidations (24h):**
- Longs: $45M
- Shorts: $128M
- Net: short squeeze continuing

**Composite Sentiment: 🟡 GREED (72/100)**
- Market is leaning bullish but not euphoric
- Funding rates are normal (not extreme)
- OI rising with price = healthy trend
- Watch: If F&G > 80 and funding > 0.1%, start trimming

**Contrarian signal:** No (yet). F&G is high but not extreme. Don't fade the trend.

**Watch:**
- Funding rate spike > 0.1% = overheated
- F&G > 80 = potential top
- OI drop with rising price = weak hands exiting
```

## Example Invocation

User: "What's the market sentiment today?"
Assistant: [Pulls data, returns formatted analysis]

User: "/sentiment_tracker ETH"
Assistant: [ETH-focused]

## Verification
- [ ] All metrics from current sources
- [ ] Funding rate interpretation correct
- [ ] Fear & Greed trend noted
- [ ] Composite is honest (not always bullish)
- [ ] Contrarian signal only flagged at extremes

## Related Skills
- `chart_pattern_recognition` — TA vs sentiment divergence
- `onchain_flow_analysis` — On-chain vs social sentiment
- `ta_backtester` — Backtest "fade the crowd" strategy
