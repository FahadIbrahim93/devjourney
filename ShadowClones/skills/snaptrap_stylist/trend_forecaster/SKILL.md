---
name: trend_forecaster
description: Identify emerging streetwear trends 2-8 weeks early. TikTok, IG, Pinterest, X signals.
version: 1.0.0
triggers:
  - "what's trending"
  - "streetwear trends"
  - "next big thing"
  - "drop inspiration"
tags: [snaptrap, trends, streetwear, tiktok, culture]
---

# Trend Forecaster

## Purpose
Identify emerging streetwear and culture trends 2-8 weeks before they peak. Data-driven, not vibes.

## Trigger Conditions
- Daily culture scan (11 AM)
- User asks "what should the next drop be?"
- Pre-drop planning phase
- On-demand via `/trend_forecaster <niche>`

## Required Inputs
- **Category** (streetwear, accessories, graphics, colorways, fits)
- **Geography** (US, UK, BD, global)
- **Time horizon** (next 2 weeks, 6 weeks, 3 months)

## Steps

### 1. Scan 4 Platforms (Daily)

**TikTok:**
- Browse "For You" 30 min
- Trending sounds (10+ uses in last 7 days)
- Hashtags: #streetwear, #fitcheck, #OOTD, #dropculture
- Filters: Date uploaded (this week)
- Save: Sounds, creators, formats

**Instagram:**
- Explore page 30 min
- Reels tab: Trending, New
- Stories: From creators in niche
- Hashtags: #streetwearstyle, #urbanstyle
- Save: Outfits, color combos, graphics

**Pinterest Predicts:**
- Quarterly trend report (released Jan)
- Monthly category trends
- Search growth (e.g., "oversized hoodie" up 45%)

**X / Twitter:**
- Trending in fashion
- #StreetTwitter, #StreetwearTwitter
- Brand announcements
- Leak accounts (release dates, lookbooks)

### 2. Identify Signal vs Noise
- **Signal:** Same aesthetic showing on 3+ platforms
- **Noise:** Single creator doing one-off thing
- **Early signal:** 1 platform only, but growing fast
- **Late signal:** Already mainstream, peak in 2-3 weeks

### 3. Categorize Trend Lifecycle
- **🌱 Emerging:** < 1K uses, but growing 50%+ week over week
- **📈 Growing:** 1K-50K uses, growth steady
- **🔥 Peaking:** 50K+ uses, growth slowing
- **📉 Fading:** Use rate declining, hashtags decreasing
- **💀 Dead:** No new content, old references

### 4. Translate to Drop Opportunities

For each trend, answer:
- **Aesthetic fit:** Does this match SnapTrap's vibe?
- **Production feasibility:** Can we make it in 4-6 weeks?
- **Audience appetite:** Will our customers want this?
- **Differentiation:** How do we do it better/different?

### 5. Output Top 5 Trends

For each:
- Trend name + visual reference
- Lifecycle stage
- Expected peak date
- Drop suggestion
- Production estimate

## Output Format

```markdown
🔮 **TREND FORECAST — June 6, 2026**

**Top 5 Trends (next 4-8 weeks):**

| Trend | Lifecycle | Peak | Drop Suggestion | Cost |
|-------|-----------|------|-----------------|------|
| 1. "Mudcloth" patterns | 📈 Growing | 6 weeks | Mudcloth Drop (tees + hoodie) | $$ |
| 2. Oversized workwear | 🔥 Peaking | 2-3 weeks | Workwear capsule (jacket + pants) | $$$ |
| 3. Color: oxblood | 🌱 Emerging | 8-10 weeks | Oxblood collection | $$ |
| 4. Reconstructed denim | 📈 Growing | 4 weeks | Deconstructed jeans | $$$ |
| 5. Bootcut return | 🌱 Emerging | 12 weeks | Early move, exclusive cut | $$$ |

---

**Trend 1: Mudcloth Patterns**
- Visual: Tribal-inspired geometric, earth tones
- Platforms: TikTok (12K uses), IG (8K posts), Pinterest (+65% searches)
- Why now: Y2K fatigue, push toward heritage/textured
- Aesthetic fit: ⭐⭐⭐⭐⭐ (matches our cultural angle)
- Drop: Mudcloth Print Tee ($45) + Hoodie ($95)
- Production: 4-5 weeks (print on heavyweight cotton)
- Risk: Low (timeless pattern, will resell)
- Recommendation: ✅ Move on this

**Trend 2: Oversized Workwear**
- Visual: Carhartt-style chore coats, painter pants, boxy fits
- Platforms: TikTok (280K uses), IG (45K posts)
- Lifecycle: Peaking — risk of being late
- Drop: Skip unless you can do it in 2 weeks
- Recommendation: ⚠️ If you do, move fast, no embellishment

**Color of the Month: OXBLOOD**
- Replace: Black, navy as the "safe" base color
- Use: Tee, hoodie, hat (low commitment)
- Why: Warm, premium feel, works with everything
- Recommendation: ✅ Add to Drop 002

---

**Top Recommendation: MUDCLOTH DROP**
- Best trend-market fit
- On-brand (cultural heritage)
- Production feasible
- 4-5 weeks to drop = timed right

Save this report. Re-scan in 7 days.
```

## Example Invocation

User: "What should I drop next?"
Assistant: [Scans platforms, identifies trends, recommends drop]

## Verification
- [ ] Multiple platforms checked (not just TikTok)
- [ ] Lifecycle stage identified (not just "trending")
- [ ] Aesthetic fit considered (not just popular)
- [ ] Production timeline realistic
- [ ] Differentiation suggested
- [ ] Top pick is clear

## Common Pitfalls
- ❌ Chasing every micro-trend (no focus)
- ❌ Jumping on something peaking (you'll be late)
- ❌ Ignoring brand fit (trend ≠ your aesthetic)
- ❌ No production timeline check
- ❌ Copying directly (not differentiating)

## Related Skills
- `drop_planner` — Use trend for next drop
- `community_builder` — Test trend with community first
- `visual_identity_guard` — Make sure trend fits brand
