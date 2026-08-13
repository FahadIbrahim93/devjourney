---
name: ta_backtester
description: Backtest trading strategies on historical data. Win rate, max drawdown, Sharpe ratio.
version: 1.0.0
triggers:
  - "backtest this"
  - "test strategy"
  - "historical performance"
  - "would this have worked"
tags: [crypto, backtest, strategy, statistics]
---

# TA Backtester

## Purpose
Test trading strategies against historical data to validate viability before risking real capital.

## Trigger Conditions
- New strategy proposed
- User asks "would this have worked?"
- User asks "is this strategy viable?"
- On-demand via `/ta_backtester <strategy>`

## Required Inputs
- **Strategy rules** (entry, exit, position sizing)
- **Asset** (BTC, ETH, etc.)
- **Time period** (1Y, 3Y, 5Y, full history)
- **Initial capital**

## Steps

### 1. Define Strategy Rules
- **Entry conditions:** Specific TA signal (e.g., "Golden cross on 4H + RSI < 40")
- **Exit conditions:** Take profit, stop loss, time-based
- **Position sizing:** Fixed %, Kelly criterion, volatility-adjusted
- **Filters:** Volume, time of day, regime (bull/bear)
- **Max concurrent positions**

### 2. Pull Historical Data
- OHLCV data for the period
- Source: Binance, Coinbase, Bybit (whichever has cleanest data)
- Granularity: Match strategy timeframe

### 3. Simulate Trades
- For each candle, check entry conditions
- If entry triggered and no open position, enter
- Track position until exit
- Log: entry price, exit price, P&L, holding time, max drawdown during trade

### 4. Calculate Statistics
- **Total trades**
- **Win rate** (% profitable)
- **Avg win / Avg loss**
- **Profit factor** (gross profit / gross loss)
- **Max drawdown** (peak-to-trough)
- **Sharpe ratio** (return / volatility, annualized)
- **Sortino ratio** (return / downside volatility)
- **Expectancy** (avg $ per trade)
- **CAGR** (compound annual growth rate)
- **Time in market** (% of period with open position)

### 5. Validate Strategy
- **Viable:** Sharpe > 1, win rate > 50%, profit factor > 1.5, max DD < 20%
- **Marginal:** Sharpe 0.5-1, mixed signals
- **Skip:** Sharpe < 0.5, win rate < 40%, profit factor < 1

### 6. Reality Check
- **Slippage:** Add 0.05-0.1% per trade
- **Fees:** Add 0.1% maker/taker
- **Funding:** For perpetuals, add funding cost
- **Survivorship bias:** Test on multiple assets, not just BTC

## Output Format

```markdown
📊 **BACKTEST: RSI Divergence + 200 EMA Strategy**

**Strategy Rules:**
- Entry: Price bounces off 200 EMA + bullish RSI divergence
- Exit: 2:1 R:R (target 2x stop)
- Stop: Below recent swing low
- Position: 2% of capital
- Time period: 2021-01-01 to 2026-06-01 (5.4 years)
- Asset: BTC/USDT

**Results:**
- Total trades: 87
- Win rate: 58.6% (51W / 36L)
- Avg win: +6.2%
- Avg loss: -3.1%
- Profit factor: 2.0
- Max drawdown: -14.2%
- Sharpe ratio: 1.45
- Sortino ratio: 1.89
- CAGR: +28.4%
- Time in market: 32%

**Verdict: ✅ VIABLE**

**Strengths:**
- 2:1 R:R drives profitability even with 58% win rate
- Low time in market (32%) = less stress
- Sharpe > 1.5 = good risk-adjusted return

**Weaknesses:**
- Max DD -14.2% is tolerable but real
- Strategy worked better in 2021-2022 bull, less in 2023-2024 chop

**Reality Check (with fees/slippage):**
- Net Sharpe: 1.21 (still good)
- Net CAGR: +22.1%
- After all costs, still beats buy & hold (which was 14% CAGR in same period)

**Recommendation: DEPLOY with these tweaks:**
- Add volume filter (only enter on >1.5x avg volume)
- Skip signals in low-volatility regime
- Position size 1.5% (not 2%) to reduce DD

**Watch:**
- Track live performance for 3 months
- If live Sharpe < 0.8, pause and re-evaluate
```

## Example Invocation

User: "Backtest a strategy: enter when RSI < 30 on 4H, exit at RSI > 50 or 3% stop"
Assistant: [Defines strategy, runs backtest, returns formatted results]

User: "/ta_backtester MACD crossover 3Y BTC"
Assistant: [Backtests specific strategy]

## Verification
- [ ] Data is clean (no missing candles)
- [ ] Strategy rules are unambiguous
- [ ] Fees + slippage included
- [ ] Max DD calculated correctly
- [ ] Sharpe ratio annualized properly
- [ ] Honest verdict (not always "viable")

## Common Pitfalls
- **Overfitting:** Strategy works on 1 timeframe only = likely overfit
- **Look-ahead bias:** Using future data in entry/exit = invalid
- **Survivorship bias:** Only testing winners = inflated results
- **Ignoring fees:** 0.1% × 2 sides × 50 trades = 10% drag

## Related Skills
- `chart_pattern_recognition` — Strategies use TA patterns
- `sentiment_tracker` — Add sentiment filter to strategy
- `onchain_flow_analysis` — On-chain filter for entries
