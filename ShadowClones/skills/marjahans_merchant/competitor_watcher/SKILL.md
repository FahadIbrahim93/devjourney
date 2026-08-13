---
name: competitor_watcher
description: Monitor competitor activity. New products, pricing, campaigns, moves. Actionable intel.
version: 1.0.0
triggers:
  - "what are competitors doing"
  - "competitor update"
  - "track [brand]"
  - "market intel"
tags: [marjahans, competitor, market-research, intel]
---

# Competitor Watcher

## Purpose
Track competitor activity (new products, pricing changes, campaigns, collaborations) and turn it into actionable intel.

## Trigger Conditions
- Monthly cron
- User asks "what's the competition doing?"
- New product launch from competitor
- Market shift detected
- On-demand via `/competitor_watcher <brand>`

## Required Inputs
- **Competitor list** (3-7 brands)
- **Platforms to watch** (IG, TikTok, website, email)
- **What to track** (products, pricing, content, promos)

## Steps

### 1. Define Competitor Tiers
- **Direct:** Same niche, similar price, same audience (e.g., Zarin, Taya)
- **Indirect:** Different product, same audience (e.g., sari brand)
- **Aspirational:** Bigger, you want to be like them (e.g., Misho, Outhouse)

### 2. Set Up Monitoring

**For each competitor, track:**
- **Website:** New products, pricing, copy changes (visualping.com, ChangeTower)
- **IG/TikTok:** Posts, stories, Reels (manual weekly check)
- **Email:** Subscribe to their list, track sends (Mailcharts, ReallyGoodEmails)
- **Google Alerts:** Brand name + product keywords
- **Pricing:** Manual monthly check + screenshots

### 3. Weekly Snapshot

For each competitor:
- **New products:** Count, types, price range
- **Active campaigns:** Current sales, collaborations
- **Content themes:** What's working for them
- **Engagement:** Top posts, what resonates
- **Pricing changes:** Up, down, new SKUs

### 4. Quarterly Deep Dive
- **SWOT:** Their strengths, weaknesses, opportunities, threats (to you)
- **Positioning:** How do they describe themselves? Has it changed?
- **Pricing strategy:** Premium, value, discount-driven?
- **Customer reviews:** What are people saying? (good and bad)
- **Supplier / maker changes:** If you can detect

### 5. Actionable Insights
Translate observations into action:
- "They launched a $40 anklet. We're at $80. Should we add a $40 entry piece?"
- "Their email open rate is 45%. Our subject lines are weak. Let's test."
- "They collabed with @creator. We should reach out too."
- "They got featured in Vogue. Let's pitch ELLE Bangladesh."

### 6. Battle Cards (for team)
Create a one-pager per top competitor:
- Logo + screenshot of their site
- Price range
- Top 3 products
- Unique value prop
- Their weakness
- Our counter-positioning

## Output Format

```markdown
👀 **COMPETITOR REPORT — June 6, 2026**

**Tracked (5 brands):**
1. Zarin — direct competitor
2. Taya — direct competitor
3. Misho — aspirational
4. Bibi-Lou — indirect (sari + jewelry)
5. Studio Melloo — direct (sustainable angle)

---

**🔥 BIG MOVES THIS WEEK:**

**Zarin launched a "Mini Collection" line** — 6 pieces, $30-60 range
- New audience entry point
- Aesthetic: Similar to ours but cheaper-feeling
- 5 of 6 pieces already sold out
- Implication: We need an entry-tier line. Recommend: 3 pieces at $40-60

**Taya's Eid campaign** — Heavy IG push, working with 5 micro-influencers
- Estimated reach: 100K
- Their discount code "EID25" gives 25% off
- Implication: We need to plan Eid 2027 campaign NOW, with 2-3 creators

**Misho raised prices 15%** on their bestsellers
- They positioned it as "rising material costs"
- No negative customer reaction
- Implication: We may have room to raise prices 10-12%

---

**📊 PRICING COMPARISON:**

| Product Type | Marjahans | Zarin | Taya | Misho |
|--------------|-----------|-------|------|-------|
| Brass cuff | $80 | $50-60 | $70-90 | $120 |
| Silver earrings | $60 | $40 | $55-70 | $95 |
| Gold necklace | $300 | $250-350 | $280-400 | $500 |

**Our position:** Mid-market, premium-feeling, under-priced vs Misho, slightly above Zarin

**Recommendation:** Maintain positioning, but add entry-tier pieces

---

**🎯 TOP 3 ACTIONS FOR US:**

1. **Launch "Mini Marjahans"** — 4-6 pieces at $30-60, response to Zarin
2. **Plan Eid 2027 campaign** — book 2-3 influencers, start in 3 weeks
3. **Test price increase** on bestsellers — 10% raise, measure impact

**Save:** Bookmark this. Re-run in 30 days.
```

## Example Invocation

User: "What are our top 3 competitors doing this month?"
Assistant: [Pulls data, analyzes, outputs action plan]

## Verification
- [ ] All competitors tracked (not just 1-2)
- [ ] Multiple data sources (not just IG)
- [ ] Pricing compared (apples to apples)
- [ ] Insights are actionable (not just observations)
- [ ] Battle cards updated
- [ ] No direct copying of competitor moves

## Common Pitfalls
- ❌ Obsessing over competition (your customer is your focus)
- ❌ Copying moves without thinking (different positioning)
- ❌ Not tracking consistently (gaps in intel)
- ❌ Focusing on big brands only (ignore direct comps)
- ❌ Letting competitor moves dictate strategy

## Related Skills
- `product_storyteller` — Differentiate your story
- `seo_optimizer` — Find keyword gaps
- `campaign_builder` — Counter their campaigns
