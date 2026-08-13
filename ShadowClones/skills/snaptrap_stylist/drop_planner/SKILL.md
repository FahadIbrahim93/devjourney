---
name: drop_planner
description: Plan a complete streetwear drop. Concept, design, production, marketing, sell-through.
version: 1.0.0
triggers:
  - "plan a drop"
  - "next drop"
  - "drop strategy"
  - "launch a collection"
tags: [snaptrap, drop, streetwear, launch, planning]
---

# Drop Planner

## Purpose
Plan a complete streetwear drop from concept to sell-through. End-to-end: design → production → marketing → sales → analysis.

## Trigger Conditions
- User asks "plan my next drop"
- Quarterly drop planning
- Capital available for production
- On-demand via `/drop_planner <theme>`

## Required Inputs
- **Drop theme / concept** (optional, can brainstorm)
- **Budget** (total production + marketing)
- **Timeline** (target drop date)
- **Drop size** (limited run, open edition, capsule)
- **Sales target** (units, revenue)

## Steps

### 1. Concept Development (Week 1-2)

**Brainstorm session:**
- Pull from `trend_forecaster` output
- Reference brand DNA (cultural heritage, futurism, dark aesthetic)
- Pick 1-2 trends + brand-specific twist
- Name the drop (e.g., "DRIP 003 — MUDCLOTH")

**Drop brief (1-page):**
- Concept: 2-3 sentences
- Inspiration: Visual references (3-5)
- Color palette: 3-4 colors
- Pieces: 2-4 SKUs (don't over-do)
- Audience: Who exactly?
- Hype angle: Why now?

### 2. Design (Week 2-3)

**For each piece:**
- Tech pack (front/back/side views, measurements, fabric, color codes)
- Print/graphic files (vector, 300 DPI, color-separated)
- Mockups on body
- Sizing samples (S, M, L, XL, XXL)

**Design approval:**
- Internal review (does it match brief?)
- Get 3-5 trusted community opinions (Discord, IG poll)
- Final approval → send to production

### 3. Production (Week 3-7)

**Manufacturer selection:**
- Local (BD): Faster, more expensive, supports local
- Overseas (CN, VN, IN, PK): Cheaper, longer lead time
- Print-on-demand: For limited runs, low risk

**Production tracking:**
- 30% deposit at order
- Mid-production check (photos, samples)
- Final payment + shipping
- Quality check on arrival

### 4. Pre-Drop Marketing (Week 6-8)

**8 weeks out:** Concept teaser (moody image, no product)
**6 weeks out:** Color reveal
**4 weeks out:** First product shot
**2 weeks out:** Full lookbook, behind-the-scenes
**1 week out:** Countdown, early-access list
**3 days out:** Final teaser, "dropping Friday"
**Drop day:** GO LIVE

**Channels:**
- IG (posts, stories, Reels)
- TikTok (3-5 videos)
- Email (4 emails)
- Discord/Telegram (insider access)
- Influencer seeding (5-10 creators, gifted 2-3 weeks before)

### 5. Drop Day (Week 8)

**T-0:** Site live, IG story blast, email send
**T+1h:** Update story with stock counts
**T+3h:** "Selling fast" story
**T+6h:** "Last chance" story
**T+24h:** Wrap-up post + UGC repost

**Cart abandonment:** 3 emails (1h, 12h, 24h after)

### 6. Post-Drop Analysis (Week 9)

**Metrics to track:**
- Total units sold
- Revenue
- Sell-through % (sold / produced)
- Average order value
- Top traffic source
- Best-performing creative
- Time to sellout (if limited)

**Learning for next drop:**
- What worked? Double down
- What didn't? Adjust
- Customer feedback? Incorporate
- Inventory: Move slow sellers (discount, bundle, hold for next drop)

## Output Format

```markdown
📦 **DROP PLAN: DRIP 003 — MUDCLOTH**

**Concept:** Tribal-inspired patterns, earth tones, oversized silhouettes
**Target audience:** 18-30, heritage-curious, premium streetwear
**Drop date:** August 1, 2026 (8 weeks from today)
**Sales target:** 250 units, $25,000 revenue

**Pieces (3 SKUs):**
1. Mudcloth Print Tee — $55 (100 units)
2. Mudcloth Hoodie — $115 (75 units)
3. Mudcloth Coach Jacket — $185 (75 units)

**Production:**
- Manufacturer: Factory 4, BD (samples 2 weeks, bulk 4 weeks)
- Cost: $4,200 (50% deposit, 50% on delivery)
- Lead time: 5 weeks (start order June 8)
- Risk: None (proven manufacturer, fabric in stock)

**Marketing calendar (8 weeks):**

| Week | Channel | Content | Goal |
|------|---------|---------|------|
| 1 | IG | Concept teaser (moody image) | Curiosity |
| 2 | IG | Color palette reveal | Engagement |
| 3 | TikTok | BTS design process | Reach |
| 4 | IG | First product shot | Excitement |
| 4 | Email #1 | "Coming Aug 1" | List growth |
| 5 | IG + TikTok | Lookbook | Pre-orders |
| 5 | Email #2 | "First look" | List conversion |
| 6 | IG | Influencer posts (5 creators) | Social proof |
| 6 | Email #3 | Early access (24h early) | List conversion |
| 7 | All | Countdown | Urgency |
| 7 | Email #4 | "24 hours" | Final push |
| 8 | All | DROP DAY | Revenue |
| 8 | Email #5 | "Last chance" | Conversion |
| 8+ | IG | UGC repost, "thank you" | Community |

**Budget breakdown:**
- Production: $4,200
- Influencer gifting: $800
- IG ads: $500
- Email tool (Klaviyo): $50/month
- Total: $5,550

**Projected ROI:**
- 250 units × avg $100 = $25,000
- Net: $25,000 - $5,550 = $19,450
- ROI: 4.5x

**Risks:**
- Mudcloth trend might peak before Aug 1 (mitigate: use more brand-specific elements)
- Production delay (mitigate: 1 week buffer in calendar)
- Low sell-through (mitigate: 30% pre-orders via early access)

**Success criteria:**
- 80%+ sell-through by Aug 8
- 250+ email subscribers gained
- 5+ UGC posts from buyers
- 1+ influencer post hits 50K views
```

## Example Invocation

User: "Plan my next drop, $5K budget, 8 weeks out"
Assistant: [Defines concept, builds production plan, marketing calendar, ROI]

## Verification
- [ ] Concept is clear and on-brand
- [ ] Production timeline is realistic
- [ ] Marketing calendar is detailed (not vague)
- [ ] Budget is accurate
- [ ] ROI is honest (not always positive)
- [ ] Risks are identified + mitigated
- [ ] Success criteria are measurable

## Common Pitfalls
- ❌ Over-producing (tied up cash in inventory)
- ❌ Under-marketing (great product, no one knows)
- ❌ Vague concept (no clear audience)
- ❌ Last-minute production (stress, quality issues)
- ❌ No pre-order strategy
- ❌ Forgetting post-drop follow-up

## Related Skills
- `trend_forecaster` — Pick the right trend
- `community_builder` — Build hype with community
- `visual_identity_guard` — Make sure visuals match brand
- `pod_optimizer` — If using print-on-demand
