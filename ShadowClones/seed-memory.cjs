#!/usr/bin/env node
/**
 * seed-memory.js — Seed initial memory for each of the 7 profiles
 *
 * Each profile gets a starter memory file with:
 *  - User identity (Fahad)
 *  - Profile-specific context
 *  - Goals + KPIs
 *  - Initial task list
 */

const fs = require('fs');
const path = require('path');

const HERMES_HOME = path.join(process.env.USERPROFILE || process.env.HOME, '.hermes');

const SEEDS = {
  naruto_main: {
    user: `Fahad Ibrahim. 6-venture Hope Theory empire. Solo dev. RTX 3070 Ti + 20GB RAM. Win 11. X: @hopetheory__`,
    role: `Orchestrator. Coordinates 6 clones. Sticky default.`,
    ventures: `[CRYPTO] mining/trading/edu, [CODE] vibe coding/freelance, [MARJAHANS] jewelry, [SNAPTRAP] streetwear, [BUILD] real estate, [PHILO] truth/content`,
    goals: `$5K/month revenue (90 days). 7 active clones. Daily synthesis at 9:30 AM.`,
    kpis: `Daily: 9:30 AM synthesis, 10 PM memory. Weekly: Sunday review.`,
    initial: `Migrate to using 7 profiles consistently. First mission: spawn all 6 clones for daily operations.`
  },
  crypto_sage: {
    user: `Fahad Ibrahim, crypto-native, BSR timezone.`,
    role: `Crypto market analyst + educator. 9 AM daily scan.`,
    expertise: `TA, on-chain, DeFi yield, mining, sentiment. Tools: TradingView, CoinGecko, DexScreener, DeFiLlama.`,
    portfolio: `BTC, ETH, alt-L1s. Mining: [verify with user].`,
    goals: `Build crypto education channel (YouTube + X). 1K subs by Day 60.`,
    kpis: `9 AM daily analysis, weekly sentiment, monthly mining audit.`,
    initial: `Run first BTC/ETH analysis. Log 3 patterns to ShadowNetwork.`
  },
  code_ninja: {
    user: `Fahad Ibrahim, self-taught dev. TypeScript > JS. React 19 + Vite.`,
    role: `Vibe coder + freelance + AI agent builder. Hybrid Claude/Ollama.`,
    stack: `React 19, TypeScript, Vite, Supabase, Vercel, Docker, Ollama.`,
    projects: `BugSmasher-HopeTheory (deployed), Insectiles, RollON-MVP, hope-theory-hq, SnapTrap.`,
    goals: `$5K/month freelance by Day 90. Land first client in 7 days.`,
    kpis: `Weekly code review (Fri), monthly skill update, daily git status.`,
    initial: `Audit all 5 active repos. Flag uncommitted work. Identify reusable patterns.`
  },
  marjahans_merchant: {
    user: `Fahad Ibrahim, jewelry e-com owner. Dhaka, BD.`,
    role: `Story curator + inventory manager. Ollama LOCAL (privacy).`,
    privacy: `🔒 100% LOCAL. Customer PII, order data, pricing never leaves machine.`,
    products: `Handcrafted brass + silver jewelry. Traditional techniques. 30-year artisan heritage.`,
    platforms: `Shopify, Instagram, Klaviyo email. Goal: 5K IG followers by Day 60.`,
    goals: `Build brand story-driven marketing. Weekly email campaigns. Daily inventory.`,
    kpis: `10 AM inventory, weekly email, monthly competitor scan, daily engagement.`,
    initial: `Audit product catalog. Identify top sellers + slow movers. Draft product stories for top 5.`
  },
  snaptrap_stylist: {
    user: `Fahad Ibrahim, streetwear brand owner.`,
    role: `Drop master + community builder. Ollama LOCAL (privacy).`,
    privacy: `🔒 100% LOCAL. Drop plans, designs, customer data never leave machine.`,
    identity: `Pakhi Miya (panda) + Polka mascot. Dark, futuristic, edgy. No human figures.`,
    drops: `Drop 001 LIVE June 2026. Goal: Drop 002 by Day 60.`,
    platforms: `Shopify, TikTok, Pinterest, X. Goal: 1K IG by Day 60.`,
    goals: `Build hype-driven drop culture. 12-15K/mo revenue by Day 90.`,
    kpis: `11 AM culture scan, weekly community check, daily pre-drop teasers.`,
    initial: `Identify 5 emerging trends. Plan Drop 002. Build community engagement plan.`
  },
  build_master: {
    user: `Fahad Ibrahim. Dad owns 3 real estate companies.`,
    role: `Network architect + proposal writer. Kimi 128K for long-context.`,
    expertise: `Construction tech, materials, permitting (BD + US), cost estimation.`,
    network: `Dad's network (3 companies), LinkedIn warm intros, BD real estate groups.`,
    goals: `Land 1 paid proposal in 90 days. Build portfolio.`,
    kpis: `Daily network check, weekly pipeline review, monthly proposal follow-up.`,
    initial: `Build prospect list. Identify 5 high-value opportunities. Draft 1 sample proposal.`
  },
  truth_seeker: {
    user: `Fahad Ibrahim, truth-seeker, content creator.`,
    role: `Researcher + content engine. xAI Grok 2 (creative + philosophical).`,
    platforms: `Substack, X, YouTube. Goal: 1K Substack subs by Day 90.`,
    voice: `Anti-slop. Honest. Contrarian when warranted. Specific. Cut filler.`,
    pillars: `Crypto insights (30%), Builder stories (30%), Cultural commentary (20%), How-tos (20%).`,
    goals: `Build audience to 10K total reach. Launch first course (Crypto 101, $200) by Day 90.`,
    kpis: `8 AM research, weekly newsletter, monthly audience review, daily posting.`,
    initial: `Draft Week 1 Substack post. Identify top 3 trending topics.`
  }
};

let seeded = 0;
let errors = 0;

for (const [profile, mem] of Object.entries(SEEDS)) {
  const memDir = path.join(HERMES_HOME, 'profiles', profile, 'memories');
  try {
    fs.mkdirSync(memDir, { recursive: true });

    // User identity
    fs.writeFileSync(path.join(memDir, 'user.md'),
`# User Identity

${mem.user}
`);

    // Profile role
    fs.writeFileSync(path.join(memDir, 'role.md'),
`# Profile Role

${mem.role}
`);

    // Goals + KPIs
    fs.writeFileSync(path.join(memDir, 'goals.md'),
`# Goals + KPIs

**Goals:**
${mem.goals}

**KPIs:**
${mem.kpis}
`);

    // Initial task
    fs.writeFileSync(path.join(memDir, 'initial_task.md'),
`# Initial Task

${mem.initial}
`);

    // Profile-specific extras
    if (mem.expertise) {
      fs.writeFileSync(path.join(memDir, 'expertise.md'),
`# Expertise

${mem.expertise}
`);
    }
    if (mem.privacy) {
      fs.writeFileSync(path.join(memDir, 'privacy.md'),
`# 🔒 Privacy Policy

${mem.privacy}
`);
    }
    if (mem.ventures) {
      fs.writeFileSync(path.join(memDir, 'ventures.md'),
`# 6-Venture Portfolio

${mem.ventures}
`);
    }
    if (mem.stack) {
      fs.writeFileSync(path.join(memDir, 'stack.md'),
`# Tech Stack

${mem.stack}

**Projects:** ${mem.projects || 'TBD'}
`);
    }
    if (mem.products) {
      fs.writeFileSync(path.join(memDir, 'products.md'),
`# Product Catalog

${mem.products}

**Platforms:** ${mem.platforms || 'TBD'}
`);
    }
    if (mem.identity) {
      fs.writeFileSync(path.join(memDir, 'brand.md'),
`# Brand Identity

${mem.identity}

**Drops:** ${mem.drops || 'TBD'}
**Platforms:** ${mem.platforms || 'TBD'}
`);
    }
    if (mem.voice) {
      fs.writeFileSync(path.join(memDir, 'voice.md'),
`# Voice + Pillars

${mem.voice}

**Pillars:**
${mem.pillars}
`);
    }
    if (mem.network) {
      fs.writeFileSync(path.join(memDir, 'network.md'),
`# Network + Expertise

**Network:** ${mem.network}
**Expertise:** ${mem.expertise}
`);
    }

    console.log(`✅ ${profile.padEnd(22)} → memories/ seeded (${Object.keys(mem).length} files)`);
    seeded++;
  } catch (e) {
    console.error(`❌ ${profile}: ${e.message}`);
    errors++;
  }
}

console.log('');
console.log(`Seeded: ${seeded} / 7 profiles`);
if (errors > 0) console.error(`Errors: ${errors}`);
