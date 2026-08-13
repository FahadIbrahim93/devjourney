---
name: influencer_scout
description: Find aligned micro/nano influencers. Audit audience, fit, cost, ROI potential.
version: 1.0.0
triggers:
  - "find influencers"
  - "who should we work with"
  - "influencer outreach"
  - "creator collaboration"
tags: [marjahans, influencer, creator, marketing, partnerships]
---

# Influencer Scout

## Purpose
Find and vet micro/nano influencers who authentically align with the Marjahans brand. Avoid paid-promotion disasters.

## Trigger Conditions
- Campaign needs amplification
- User asks "who should we work with?"
- New product needs awareness
- On-demand via `/influencer_scout <criteria>`

## Required Inputs
- **Niche** (jewelry, South Asian fashion, sustainable style, etc.)
- **Audience size** (nano 1K-10K, micro 10K-100K, mid 100K-500K)
- **Platform** (IG, TikTok, YouTube, Substack)
- **Budget** (for paid or gifted)
- **Geography** (Bangladesh, South Asia diaspora, global)

## Steps

### 1. Define Influencer Persona
- **Aesthetic:** Minimalist, bohemian, traditional-modern fusion, etc.
- **Values:** Sustainability, cultural heritage, slow fashion, female-founded
- **Content style:** Tutorials, vlogs, lookbooks, storytelling
- **Audience:** Who are their followers? Age, location, interests
- **Tone:** Warm, educational, aspirational, relatable

### 2. Find Candidates (3 methods)

**Method 1: Hashtag search**
- Browse: #SouthAsianStyle, #BengaliBride, #SlowFashion, #HandmadeJewelry, #BDfashion
- Look for: High engagement rate (>3%), authentic comments, aligned aesthetic
- Note: 20-30 candidates

**Method 2: Competitor audit**
- Find: Who has worked with similar brands?
- Check: Marjahans-style brands' tagged posts
- Note: Quality of their audience, authenticity of engagement

**Method 3: Platform tools**
- **IG:** "Suggested for you" + competitor followers
- **TikTok:** Creative Center for trending hashtags
- **YouTube:** Search "handmade jewelry" + filter by view count

### 3. Vet Each Candidate

**Audience Quality (1-10):**
- Engagement rate: >3% excellent, 1-3% good, <1% suspicious
- Comment quality: Real responses, not "🔥🔥🔥" bots
- Follower authenticity: Check for sudden spikes (bot buying)
- Audience location: Match your target market

**Brand Fit (1-10):**
- Aesthetic alignment: Visual style matches yours
- Values alignment: Sustainability, cultural respect
- Audience overlap: Their followers would buy from you
- Past collaborations: Quality, not over-saturated

**Cost (1-10 ROI):**
- Gifting (cost: product only, $50-200)
- Paid post ($100-500 for micro, $1K-5K for mid-tier)
- Affiliate (% of sales, typically 10-20%)
- Performance bonus (per conversion)

### 4. Outreach Template

```
Hi [name],

I've been following your work on [platform] for a while — your [specific post/series] really resonated with me. The way you [specific compliment] is exactly the aesthetic we celebrate at Marjahans.

We make handcrafted jewelry inspired by [cultural heritage], and I think your audience would genuinely love [specific product/collection]. I'd love to send you [product] to try, with no obligation to post.

If it fits, we'd be honored to be part of your content. And if not, we'd still love to support your work — just say the word.

Either way, keep creating. 🤍

[Your name]
Marjahans
[link]
```

### 5. Track Performance
- **Reach:** Impressions, story views
- **Engagement:** Likes, comments, saves, shares
- **Conversion:** Use unique discount code (e.g., MARJAHANS-SARA)
- **Cost per acquisition:** Total cost / orders driven
- **Long-term:** Did they become a repeat customer?

## Output Format

```markdown
🤝 **INFLUENCER SHORTLIST — Eid Campaign**

**Top 3 Candidates:**

| Creator | Platform | Followers | Engagement | Audience Fit | Cost | Score |
|---------|----------|-----------|------------|--------------|------|-------|
| @sara.styles.bd | IG | 12,400 | 4.8% | 9/10 | Gift ($80) | 9/10 |
| @kawsar.creates | TikTok | 28,000 | 6.2% | 8/10 | Gift + $100 | 8/10 |
| @minimalist.maya | IG | 45,000 | 3.1% | 7/10 | $300 paid | 7/10 |

**Why @sara.styles.bd:**
- 12.4K followers, 4.8% engagement (excellent for size)
- Aesthetic: Minimalist jewelry, sustainable focus
- Audience: 68% Bangladesh, 22% diaspora (US, UK)
- Past collabs: 2 small brands, both positive
- Content: Lookbooks, styling tips, jewelry reviews
- Fit: Her audience trusts her recommendations

**Outreach draft:** [See template above]

**Expected results:**
- 1 IG post + 3 stories
- Estimated reach: 8,000-10,000
- Estimated orders: 15-25 (using code MARJAHANS-SARA)
- ROI: $80 product cost → $2,250-3,750 revenue = 28-47x return

**Backup candidate:** @kawsar.creates (TikTok reach for Eid 2027 campaign)

**Avoid:** [list of 3-5 creators with red flags — fake followers, mismatched values, etc.]
```

## Example Invocation

User: "Find me 3 micro-influencers for the new collection"
Assistant: [Searches, vets, ranks, drafts outreach]

## Verification
- [ ] Audience quality verified (engagement, comments)
- [ ] Brand fit is real (not just follower count)
- [ ] Cost vs expected ROI is justified
- [ ] Outreach is personalized, not generic
- [ ] Tracking codes set up
- [ ] Backup candidates identified

## Common Pitfalls
- ❌ Buying followers, not engaging with them
- ❌ Choosing biggest names (often lower engagement)
- ❌ No unique tracking code (can't measure ROI)
- ❌ Generic outreach ("Hey check out my brand")
- ❌ Working with creators whose audience is fake
- ❌ Expecting viral reach from nano influencers

## Related Skills
- `product_storyteller` — Send the perfect product story with gifted items
- `campaign_builder` — Coordinate influencer with email/IG strategy
- `competitor_watcher` — See who your competitors work with
