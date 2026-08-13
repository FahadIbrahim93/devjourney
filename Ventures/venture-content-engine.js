#!/usr/bin/env node
/**
 * venture-content-engine.js — Per-Venture Content Generator
 * Real, actionable content for all 6 ventures.
 *
 * Usage:
 *   node venture-content-engine.js <venture> <type> [count]
 *
 * Ventures: crypto, code, marjahans, snaptrap, build, philo
 * Types: tweet, thread, linkedin, instagram, video-script, newsletter
 */

const CONTENT = {
  crypto: {
    tweets: [
      "📊 BTC 4H analysis:\n\n- Support: $65K (tested 3x, holding)\n- Resistance: $69K (rejected 2x)\n- Pattern: Ascending triangle\n- Volume: declining (coiling)\n\nBreakout above $69K = continuation to $73K-$75K.\nRejection = retest $63K low.\n\nPosition sizing: 2% max. Always. 🎯\n\n#Bitcoin #CryptoTrading",
      "🔗 On-chain insight:\n\nExchange BTC reserves: 2.1M (lowest since 2018)\nWhale wallets (1K+ BTC): +47 this month\n\nTranslation: supply is drying up. Whales are accumulating.\n\nWhen supply ↓ and demand stays = price ↑.\n\nWhen chart and on-chain disagree, on-chain wins. 💎\n\n#Bitcoin #OnChain",
      "⛏️ Mining profitability check (June 2026):\n\nS19 XP at 140 TH/s:\n- Power: 0.06 $/kWh\n- BTC price: $X\n- Daily revenue: ~$8-12\n- Daily cost: ~$5-7\n- Net: $3-5/day per rig\n\nROI: 14-18 months at current prices.\n\nBest alt-mine: LTC + DOGE merge mining. +20% effective hashrate.\n\n#BTCMining #Crypto",
      "5 crypto terms every trader must know:\n\n1. RSI — Relative Strength Index (0-100, >70 overbought, <30 oversold)\n2. Support/Resistance — Price floor/ceiling\n3. Stop-loss — Auto-sell at loss limit\n4. DCA — Dollar Cost Averaging (regular buys)\n5. Bagholder — Someone holding a losing position\n\nLearn these. Then trade. 📚\n\n#CryptoEducation",
      "The chart is telling us a story.\n\nBTC's 4H just painted a hammer candle at $65K support. Buyers stepped in. Volume spike.\n\nThe story: smart money accumulating while retail panics.\n\nHammers at support = bullish reversal signal. Wait for confirmation (next candle close > $66K).\n\n#Bitcoin #TA",
    ],
    threads: [
      "🧵 7 lessons from 3 years of crypto trading:\n\n1. Bull markets test discipline, not intelligence\n2. On-chain > TA, but use both\n3. DCA through fear. Always.\n4. Position sizing is sacred. Never >2% per trade.\n5. Bear markets build wealth, bull markets test it\n6. The best trade is often no trade\n7. Mistakes are tuition. Tag them, learn, share.\n\n(1/8) #CryptoTrading",
    ],
    videoScripts: [
      "📹 VIDEO SCRIPT: 'How to Read a BTC Chart in 5 Minutes'\n\n[INTRO - 30s]\nMost traders lose money because they don't know what the chart is saying.\nToday, I'll teach you 5 things every chart tells you.\n\n[LESSON 1 - 60s]\n1. Trend: Are we going up or down?\n- Higher highs + higher lows = uptrend\n- Lower highs + lower lows = downtrend\n- Sideways = consolidation\n\n[LESSON 2 - 60s]\n2. Support and Resistance:\n- Support = price floor (buyers step in)\n- Resistance = price ceiling (sellers step in)\n- More tests = stronger level\n\n[LESSON 3 - 60s]\n3. Candlestick patterns:\n- Hammer at support = bullish reversal\n- Shooting star at resistance = bearish reversal\n- Engulfing = strong momentum shift\n\n[LESSON 4 - 60s]\n4. Volume:\n- Price + volume = confirmed move\n- Price + no volume = fake move\n- Volume spike = real interest\n\n[LESSON 5 - 60s]\n5. On-chain context:\n- Chart + on-chain = edge\n- Chart alone = gambling\n- Check exchange reserves, whale activity\n\n[OUTRO - 30s]\nNow you know the basics. Practice on 4H and Daily charts first.\nFollow for more crypto education.\n\n#Bitcoin #CryptoTrading #TA",
    ],
  },
  code: {
    tweets: [
      "🛠️ Just shipped: a React + Supabase app with auth + RLS + 237 tests in 14 hours.\n\nStack: Vite + React 19 + TypeScript + Supabase + Tailwind\n\nVibe coding = AI-assisted rapid build. No premature optimization. Ship, iterate, polish later.\n\nDemo: [link]\nCode: github.com/FahadIbrahim93\n\n#VibeCoding #FullStackDev #ReactJS",
      "5 tools I use daily as a vibe coder:\n\n1. Cursor IDE (AI pair programming)\n2. Supabase (auth + DB + storage in one)\n3. Vercel (zero-config deploys)\n4. Tailwind CSS (utility-first styling)\n5. Linear (issue tracking)\n\nThe future of dev = AI + speed + ship.\n\n#VibeCoding #DevTools",
      "How I price freelance projects:\n\n- 1-week: $1,000-$2,000\n- 2-4 weeks: $2,500-$5,000\n- Monthly retainer: $3,000-$6,000\n\nIf they balk at $2K, they're not your client.\n\nQuality + speed + communication = premium rate.\n\n#FreelanceDev #WebDev",
      "🚨 AI integration win this week:\n\nBuilt a custom GPT agent for [client] that:\n- Reads docs from Notion DB\n- Answers client questions in real-time\n- Updates Slack with insights\n\n1 day of work. 5 hours saved/week per client.\n\nAI is the leverage. Use it.\n\n#AIIntegration #GPT #ClaudeAPI",
      "Why I don't write tests (and why you should):\n\nUsed to skip tests to ship faster. Then I refactored and broke 3 things in production.\n\nNow: tests are part of shipping. Not optional.\n\nEven vibe coders write quick tests. 10 min of tests = 10 hours of debug time saved.\n\n#VibeCoding #Testing",
    ],
    linkedin: [
      "I just shipped a freelance project: 14 days, full-stack React + Supabase, $4,500.\n\nWhat made it work:\n\n1. Clear scope: written SOW, signed before coding\n2. Daily updates: 5-min Slack message every morning\n3. Fast iteration: deployed to staging from day 1\n4. Quality gate: tests + lint + build before delivery\n\nVibe coding = AI-assisted rapid build.\nThe future of freelance is solo + AI + speed.\n\n#FreelanceDev #VibeCoding",
    ],
  },
  marjahans: {
    tweets: [
      "💎 Behind the scenes at Marjahans:\n\nEvery piece is hand-finished by our 12 master craftsmen in Dhaka.\n\nThis isn't fast fashion jewelry. This is heirloom jewelry.\n\n📍 Visit our showroom\n📱 DM 'SHOP' to order\n\n#Marjahans #HandmadeJewelry #BangladeshiJewelry",
      "Customer love ❤️\n\n'Marjahans is the only brand I trust. My mother-in-law loved her set.'\n\n— Fatima, Gulshan\n\n📍 Visit us in Dhaka\n📱 DM to order\n\n#Marjahans #BangladeshiJewelry",
      "NEW ARRIVAL: 22K gold-plated jhumkas 💛\n\nLightweight. Elegant. Affordable.\n\nDM 'SHOP' to order.\nFree delivery in Dhaka.\n\n#Marjahans #Jhumka #BangladeshiJewelry",
    ],
    instagram: [
      "📸 Behind the scenes at our workshop.\n\n12 master craftsmen. 22K gold-plating. Hand-finished.\n\nThis is Marjahans. Story-driven. Quality-first.\n\nDM 'SHOP' to order 💛\n\n#Marjahans #HandmadeJewelry #DhakaJewelry",
      "💛 Customer love:\n\n'I bought a jhumka set for my wife's birthday. She cried. Best investment I ever made.'\n\n— Arif, Gulshan\n\n📍 Visit us in Dhaka\n📱 DM to order\n\n#Marjahans #BangladeshiJewelry",
      "✨ NEW: 22K gold-plated jhumkas\n\nLightweight. Elegant. Affordable.\n\nDM 'SHOP' to order. Free delivery in Dhaka.\n\n#Marjahans #Jhumka #BangladeshiJewelry",
    ],
  },
  snaptrap: {
    tweets: [
      "🔥 DROP 001 LIVE — 100 UNITS ONLY\n\n'RISE FROM THE TRAP'\n\n3 pieces:\n- Trap Hoodie (Black)\n- Rise Tee (Cream)\n- Snap Cap (Black)\n\nHeavyweight cotton. Embroidered logo. Made in Dhaka.\n\n⚡ SHOP NOW → link in bio\n\n#SnapTrap #Streetwear #DropCulture #LimitedDrop",
      "Why scarcity sells:\n\n1. Hype = demand > supply\n2. Ownership = 'I have one'\n3. FOMO = next drop might miss\n4. Community = 'We got one'\n\nSnapTrap drops 100 units. Then it's gone.\n\nThat's not a marketing trick. That's the whole point.\n\n#Streetwear #DropCulture",
      "🎨 AMBASSADOR PROGRAM — 10 SLOTS OPEN\n\nCalling all micro-influencers (1K-10K followers) who love street culture.\n\nGet:\n- Free merch every drop\n- Affiliate commission\n- Early access\n- Direct line to the brand\n\nDM @snaptrap.official to apply.\n\n#Streetwear #Ambassador",
    ],
    instagram: [
      "🔥 DROP 001 LIVE — 100 UNITS ONLY\n\n'RISE FROM THE TRAP'\n\n3 pieces. Real quality. Limited run.\n\n⚡ SHOP NOW → link in bio\n\n#SnapTrap #Streetwear #DropCulture",
      "Why we drop 100 units, not 1000:\n\nQuality. Hype. Community. Margin.\n\nFast fashion is dead. Limited drops are the future.\n\n#SnapTrap #Streetwear",
      "🎨 AMBASSADOR PROGRAM — 10 SLOTS\n\nMicro-influencers (1K-10K): DM @snaptrap.official to apply.\n\n#Streetwear #Ambassador",
    ],
  },
  build: {
    linkedin: [
      "🚧 Project milestone: Foundation complete at Gulshan plot.\n\nTimeline: 4 weeks ahead of schedule.\nQuality: 100% on spec.\nCost: Under budget by 12%.\n\nUnder-promise, over-deliver. That's the BUILD standard.\n\nDM for project inquiries.\n\n#BuildingSolutions #RealEstate #Bangladesh",
      "How we won the [Client] proposal:\n\n1. Network leverage: dad's 3 companies = instant credibility\n2. Proposal quality: 25-page pitch with timeline + cost + risk analysis\n3. Innovation: web3 financing option as differentiator\n4. Network: 5 warm intros to suppliers + contractors\n\nWin = preparation + network + execution.\n\n#BuildingSolutions #ProposalWin",
      "Web3 + Real Estate = the future of building solutions.\n\nImagine:\n- Property tokenization for fractional ownership\n- Smart contracts for milestone payments\n- DeFi lending for construction capital\n- On-chain title verification\n\nWe're not there yet. But we're preparing.\n\n#PropTech #Web3 #RealEstate",
    ],
    tweets: [
      "🏗️ Active project: 8-unit residential in Banani.\n\nScope: Material supply + contractor coordination + project management.\nTimeline: 6 months.\nStatus: Week 3/24, on track.\n\nQuality + network + execution. That's BUILD.\n\nDM for project inquiries.\n\n#BuildingSolutions #RealEstate",
    ],
  },
  philo: {
    tweets: [
      "Every bubble bursts. Every empire falls.\n\nBut the pattern remains.\n\nBitcoin cycles mirror tulip mania. Crypto winters mirror dot-com winters. The same story, told by different actors.\n\nWhat is the pattern teaching us?\n\nI'm not here to give answers. I'm here to ask better questions.\n\n#TruthSeeker #CryptoPhilosophy",
      "What's the purpose of life?\n\nI've spent 10 years chasing:\n- Money (achieved)\n- Status (achieved)\n- Knowledge (in progress)\n- Peace (still searching)\n\nThe last one is the hardest.\n\nWhat's your answer? Not the textbook one — the real one.\n\n#PurposeOfLife #Philosophy",
      "Hidden history thread 🧵\n\nMost civilizations we think 'just appeared' had precursors we never learned about.\n\n1. Library of Alexandria (300K scrolls, lost)\n2. Antikythera mechanism (2000 years ahead of its time)\n3. Göbekli Tepe (12,000 years old, rewrites history)\n\nWhat we don't know > what we know.\n\n#HiddenHistory #TruthSeeker",
    ],
    threads: [
      "🧵 THREAD: Why Bitcoin is the most important invention since the internet\n\n1/ Money is broken.\n\n2/ Banks control who can transact. Fees are high. Privacy is zero. Inflation is invisible theft.\n\n3/ Bitcoin fixes this.\n\n4/ Decentralized. Finite. Trustless. Borderless.\n\n5/ The same way email replaced fax, Bitcoin replaces banks.\n\n6/ But this is more than payments. It's programmable money. Smart contracts. DeFi. Self-custody.\n\n7/ The same way the internet democratized information, Bitcoin democratizes value.\n\n8/ The pattern: every 100 years, a new layer of freedom.\n- 1776: Political freedom (revolutions)\n- 1876: Communication freedom (telephone)\n- 1976: Information freedom (internet)\n- 2076: Value freedom (Bitcoin)?\n\n9/ We're in the middle of the value revolution.\n\n10/ The early adopters will benefit most.\n\nFollow for more crypto + history + philosophy.\n\n#Bitcoin #CryptoPhilosophy #TruthSeeker",
    ],
    newsletters: [
      "# THE WEEKLY DISPATCH — Issue #1\n\n## What I'm thinking about this week\n\n**Bitcoin halving cycles + history patterns.**\n\nEvery 4 years, Bitcoin's supply issuance halves. Every 4 years, the market resets.\n\nBut this pattern isn't new. Tulip mania (1637), South Sea Bubble (1720), dot-com (2000), housing (2008). All had the same pattern:\n1. New technology\n2. Mass adoption\n3. Speculation\n4. Crash\n5. Real value emerges\n\nBitcoin is following the same pattern. We're in phase 4 (crash → real value).\n\nWhat comes next: real utility. Not speculation. Not 'number go up.' But actual value transfer, actual financial sovereignty, actual freedom.\n\nThat's why I'm still here.\n\n## What I'm reading\n- *The Bitcoin Standard* by Saifedean Ammous\n- *Sapiens* by Yuval Noah Harari\n- Archive.org's pre-1923 history collection\n\n## What I'm shipping\n- This newsletter (you got it first 👀)\n- New thread: 'What is money, really?' (Friday)\n- Video: 'How to read a BTC chart' (Saturday)\n\nIf you want more like this, hit reply. Tell me what you're thinking about.\n\n— Fahad\n\n#TruthSeeker #Bitcoin #Philosophy",
    ],
  },
};

const command = process.argv[2];
const type = process.argv[3] || 'tweets';
const count = parseInt(process.argv[4]) || 1;

if (!command || !CONTENT[command]) {
  console.log('Usage:');
  console.log('  node venture-content-engine.js <venture> <type> [count]');
  console.log('');
  console.log('Ventures:', Object.keys(CONTENT).join(', '));
  console.log('Types: tweets, threads, linkedin, instagram, videoScripts, newsletters');
  process.exit(1);
}

const venture = CONTENT[command];
const content = venture[type] || venture.tweets;

console.log(`\n📱 ${command.toUpperCase()} — ${type.toUpperCase()}`);
console.log('═══════════════════════════════════════\n');

const items = content.slice(0, count);
items.forEach((text, i) => {
  console.log(`── ${type.toUpperCase()} ${i + 1} ──`);
  console.log(text);
  console.log('');
});

if (items.length === 0) {
  console.log('   (no content for this type yet)');
}
