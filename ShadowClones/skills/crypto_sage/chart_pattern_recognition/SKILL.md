---
name: chart_pattern_recognition
description: Identify classic TA patterns in BTC/ETH charts with confidence, implication, and risk.
version: 1.0.0
triggers:
  - "upload chart image"
  - "what's the chart saying"
  - "pattern analysis"
  - "TA on BTC"
  - "TA on ETH"
tags: [crypto, ta, charts, technical-analysis]
---

# Chart Pattern Recognition

## Purpose
Identify classic technical analysis patterns in cryptocurrency charts and provide actionable trading context.

## Trigger Conditions
- User uploads a chart image (candlestick, line, or Heikin Ashi)
- User asks "what does the chart say?" or "pattern?"
- Daily cron at 9 AM market open
- On-demand via `/chart_pattern_recognition <asset>`

## Required Inputs
- **Asset** (BTC, ETH, or specific ticker)
- **Timeframe** (15m, 1H, 4H, 1D, 1W)
- **Chart image** (optional but preferred)
- **Risk tolerance** (conservative, moderate, aggressive)

## Steps

### 1. Parse Visual or Data Input
- If image: use vision_analyze to extract OHLC + identify visible structure
- If text description: build mental model from price points provided
- If no input: query TradingView / CoinGecko for current chart

### 2. Identify Pattern (Priority Order)
1. **Reversal patterns:** Head & Shoulders, Double Top/Bottom, Triple Top/Bottom, Rounding Bottom
2. **Continuation patterns:** Ascending/Descending Triangle, Bull/Bear Flag, Pennant, Wedge
3. **Candlestick patterns (1-3 candle):** Doji, Hammer, Engulfing, Morning/Evening Star
4. **Volume confirmation:** Check if pattern has supporting volume

### 3. Assign Confidence (1-10)
- **9-10:** Textbook pattern, volume confirms, multi-timeframe alignment
- **7-8:** Clear pattern, partial confirmation
- **5-6:** Pattern forming, not complete
- **3-4:** Ambiguous, multiple interpretations
- **1-2:** Probably not a pattern (noise)

### 4. Determine Implication
- **Bullish:** Expect upward move
- **Bearish:** Expect downward move
- **Neutral:** Choppy, wait for breakout

### 5. Action Recommendation
- **Entry:** Specific price level + condition
- **Stop loss:** Below/above structure
- **Targets:** T1, T2, T3 with risk:reward
- **Position size:** 1-2% of portfolio (default conservative)
- **Time horizon:** Intraday / swing / position

### 6. Risk Level
- **Low:** Established pattern, volume confirms, multiple TFs align
- **Medium:** Pattern forming, partial confirmation
- **High:** Ambiguous, single TF, no volume confirmation

## Output Format

```markdown
📊 **PATTERN: [Name]**
- **Asset:** BTC
- **Timeframe:** 4H
- **Confidence:** 8/10
- **Implication:** Bullish
- **Entry:** $66,500 (breakout confirmation)
- **Stop loss:** $64,200 (-3.4%)
- **Targets:** T1 $69,000 (+3.8%), T2 $72,000 (+8.3%), T3 $75,000 (+12.8%)
- **Risk/Reward:** 1:2.5
- **Position size:** 1.5% of portfolio
- **Time horizon:** Swing (3-7 days)
- **Risk level:** Medium
- **Invalidation:** Close below $64,000

**Why this matters:** [1-2 sentence narrative tying pattern to broader market structure]
```

## Example Invocation

User: "BTC chart on 4H, what do you see?"
Assistant: [Runs vision_analyze on chart, applies pattern logic, returns formatted output]

User: "/chart_pattern_recognition BTC 1D"
Assistant: [Fetches daily chart, identifies pattern, returns output]

## Verification
- [ ] Pattern correctly identified (not false positive)
- [ ] Confidence matches visual clarity
- [ ] Entry/stop/targets have valid R:R (> 1:1.5)
- [ ] Risk level matches setup quality
- [ ] No fabricated data — all from real chart

## Common Pitfalls
- **Don't** call a pattern before it's complete (wait for confirmation candle)
- **Don't** ignore volume (many patterns fail without volume)
- **Don't** trade against the trend (downtrend triangles usually break down)
- **Don't** over-size (1-2% max per trade, no exceptions)

## Related Skills
- `onchain_flow_analysis` — Use on-chain data to confirm/deny TA signal
- `ta_backtester` — Backtest this pattern historically before trading
- `sentiment_tracker` — Check if sentiment supports the direction
