---
title: Lightning Network
created: 2026-06-07
updated: 2026-06-07
type: entity
tags: [crypto, product, technical]
sources: []
confidence: medium
---

# Lightning Network

> Layer 2 scaling solution for Bitcoin. Enables fast, cheap, near-instant payments. The path to Bitcoin as everyday money.

## How It Works
- **Payment channels** — two parties lock BTC in a multisig
- **Off-chain transactions** — instant, free
- **On-chain settlement** — only when channel closes
- **Network routing** — pay anyone via hops

## Why It Matters
- **Speed** — instant vs 10 min confirmation
- **Cost** — fractions of a cent vs $1-5 on-chain
- **Scale** — millions of TPS vs 7 TPS on-chain
- **Use cases** — micropayments, streaming, tipping

## Current State (2026)
- **Capacity:** 5,000+ BTC locked
- **Channels:** 80,000+
- **Nodes:** 16,000+
- **Wallets:** Phoenix, Breez, Wallet of Satoshi, Zeus

## Trade-offs
- **Liquidity** — needs inbound + outbound
- **Routing** — complex, fails if no path
- **Custodial risk** — many wallets hold keys for you
- **Still experimental** — UX issues, not mainnet-easy

## Related
- [[concept-bitcoin-halving]]
- [[person-satoshi-nakamoto]]
