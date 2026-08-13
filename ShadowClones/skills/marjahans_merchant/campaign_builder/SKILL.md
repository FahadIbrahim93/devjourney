---
name: campaign_builder
description: Design email + DM + push campaigns. From concept to send. Storytelling + conversion.
version: 1.0.0
triggers:
  - "design a campaign"
  - "email blast"
  - "promotion campaign"
  - "launch a sale"
tags: [marjahans, campaign, email, marketing, klaviyo]
---

# Campaign Builder

## Purpose
Design end-to-end marketing campaigns across email, DM, and push. From concept to copy to send.

## Trigger Conditions
- Product launch
- Sale / promotion
- Holiday / cultural event (Eid, Pohela Boishakh, wedding season)
- Weekly nurture
- On-demand via `/campaign_builder <goal>`

## Required Inputs
- **Campaign goal** (awareness, engagement, conversion, retention)
- **Audience** (segment)
- **Channel(s)** (email, IG DM, push, multi)
- **Product / offer**
- **Timeline** (launch date, send dates)

## Steps

### 1. Define Campaign
- **Goal:** Specific (e.g., "Drive 50 orders of new anklet in 7 days")
- **KPIs:** Open rate, CTR, conversion, revenue
- **Audience:** Size, segment definition
- **Channel mix:** Email + IG DM + push
- **Cadence:** One-shot, drip (3-5 emails over 7 days), evergreen

### 2. Build Audience Segment
For Klaviyo:
- **New subscribers** (last 30 days)
- **Engaged (opened last 30 days)**
- **Lapsed (no purchase in 90 days)**
- **VIP (purchased 3+ times, $300+ LTV)**
- **By interest** (product category browsed)

### 3. Write Email Sequence

**Email 1: Teaser (T-3 days)**
- Subject: Curiosity-driven, no offer yet
- Body: Story, intrigue, hint at what's coming
- CTA: "Be the first" → landing page (not yet purchase)

**Email 2: Launch (T-0)**
- Subject: Clear value, urgency
- Body: Product story, hero image, offer, scarcity
- CTA: "Shop now" → product page
- Send at: 9-10 AM local time (peak open)

**Email 3: Reminder (T+2 days)**
- Subject: Different angle (social proof, objection handling)
- Body: Customer testimonial, FAQ, guarantee
- CTA: "Still thinking?" → product page

**Email 4: Last call (T+5 days)**
- Subject: Urgency, deadline
- Body: "48 hours left," countdown
- CTA: "Shop before it's gone"

**Email 5: Wrap-up (T+7 days)**
- Subject: "It's over" + "but here's what's next"
- Body: Thank you, show similar products
- CTA: "Browse the collection"

### 4. DM / Social Strategy
- **Day 0:** IG post, story with poll
- **Day 1:** Story swipe-up, first 5 sales notification
- **Day 3:** Repost UGC from first buyers
- **Day 5:** "Last chance" story
- **Day 7:** "Thank you" + tease next drop

### 5. Copy Templates

**Subject lines (test 3-5 per email):**
- Story: "The anklet that traveled 4,847 miles to find you"
- Curiosity: "We almost didn't make these"
- Urgency: "48 hours. 50 left. Pick yours."
- Social proof: "147 people have this on their wishlist"
- Plain: "New in: The River Stone Cuff"

**Body structure:**
1. Hook (first sentence, 1-line)
2. Story (1-2 paragraphs)
3. Product (image + key specs)
4. Offer (price, free shipping, returns)
5. Scarcity / urgency (limited, deadline)
6. CTA (button, clear action)
7. P.S. (bonus, urgency)

### 6. A/B Tests
- Subject line (test 3-5)
- Send time (morning vs evening)
- Hero image (lifestyle vs product)
- CTA text ("Shop now" vs "Add to cart")
- Offer framing (% off vs $ off)

### 7. Tracking + Optimization
- UTM parameters on every link
- Klaviyo flow triggers
- Revenue attribution
- Survey non-openers (why?)

## Output Format

```markdown
📧 **CAMPAIGN: Eid Collection Launch**

**Goal:** 80 orders, $12,000 revenue in 7 days
**Audience:** Engaged subscribers (last 30 days) + VIPs = 4,200 people
**Channels:** Email (Klaviyo) + IG (stories, posts, DMs)

**Email Sequence:**

| Day | Time | Subject | Goal |
|-----|------|---------|------|
| T-3 | 9 AM | "A little something for Eid" | Teaser |
| T-0 | 9 AM | "The Eid Collection is here" | Launch |
| T+2 | 6 PM | "Why everyone's wearing these" | Social proof |
| T+5 | 9 AM | "48 hours left — last chance" | Urgency |
| T+7 | 9 AM | "Thank you + what's next" | Wrap-up |

**Email 1 (Teaser) — Full copy:**

Subject: A little something for Eid
Preview: [first 50 chars of body]

---

Salaam [first_name],

Eid is almost here. And this year, we wanted to make something special.

[Story: 100 words about the collection inspiration]

We're launching Friday at 10 AM. Be the first to see it.

[CTA: Notify me when it's live]

With love,
Marjahans

---

**IG Strategy:**
- 3 posts (collection tease, launch day, UGC repost)
- 5 stories (poll, countdown, BTS, sale, last call)
- 20 DMs to engaged followers (personal outreach)

**Budget:** $200 IG ads (boost top-performing post)
**Expected:** 80 orders × $150 AOV = $12,000
**Stretch:** 120 orders × $150 = $18,000

**KPIs to track:**
- Open rate: target 35%
- CTR: target 4%
- Conversion: target 2.5%
- Revenue: $12K target

**Flow setup in Klaviyo:**
- Trigger: Subscriber enters "Eid 2027" segment
- Action: Send Email 1 → wait 3 days → Send Email 2 → etc.
- Exit: Subscriber purchases → leave flow
```

## Example Invocation

User: "Build a campaign for the new collection launch"
Assistant: [Defines goal, builds sequence, writes copy, sets up flow]

## Verification
- [ ] Campaign has clear, measurable goal
- [ ] Audience is properly segmented
- [ ] Email sequence has logical progression
- [ ] Subject lines are tested
- [ ] CTAs are clear
- [ ] Tracking is set up
- [ ] A/B tests planned
- [ ] KPI targets are realistic

## Common Pitfalls
- ❌ Sending to entire list (no segmentation)
- ❌ Same time / day for every email (ignores peak times)
- ❌ Weak subject lines (low open rate)
- ❌ No clear CTA (reader doesn't know what to do)
- ❌ Selling in every email (no value)
- ❌ No follow-up to non-openers

## Related Skills
- `product_storyteller` — Stories for emails
- `influencer_scout` — Find aligned creators for campaign
- `seo_optimizer` — Landing page SEO for email traffic
