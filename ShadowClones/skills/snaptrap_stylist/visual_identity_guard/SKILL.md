---
name: visual_identity_guard
description: Protect brand aesthetic. Every visual, color, font, photo style on-brand.
version: 1.0.0
triggers:
  - "is this on-brand"
  - "check the visual"
  - "brand consistency"
  - "does this match"
tags: [snaptrap, visual, branding, design, aesthetic]
---

# Visual Identity Guard

## Purpose
Ensure every visual touchpoint is on-brand. Photos, graphics, fonts, colors, layouts, packaging. No off-brand content goes live.

## Trigger Conditions
- New design / graphic
- Photo shoot before publishing
- User asks "is this on-brand?"
- UGC repost decision
- On-demand via `/visual_identity_guard <asset>`

## Required Inputs
- **Asset to check** (image, graphic, design, copy)
- **Brand guidelines** (colors, fonts, aesthetic)

## SnapTrap Brand DNA
- **Aesthetic:** Dark, futuristic, edgy, urban, premium
- **Colors:** Black, white, oxblood, deep green, metallic accents
- **Fonts:** Bold sans-serif (like Helvetica Bold, Founders Grotesk), minimal
- **Photography:** High contrast, dark backgrounds, strong shadows
- **Models:** Diverse, real, no overly posed
- **Mood:** Confident, cultural, exclusive, mysterious

## Steps

### 1. Color Check
- Are colors within approved palette?
- Are contrast levels correct (high contrast preferred)?
- Does the color combination evoke the right mood?

**Approved palette:**
- Black: #0A0A0A
- White: #FAFAFA
- Oxblood: #4A1A1A
- Deep green: #1A2E1A
- Metallic silver: #C0C0C0
- (Avoid: Bright neons, pastels, earthy browns)

### 2. Typography Check
- Is the typeface approved? (Founders Grotesk, Helvetica, system fonts)
- Hierarchy clear? (Headline, subhead, body, caption)
- Letter-spacing consistent? (Tracked out for that streetwear feel)
- No Comic Sans, Papyrus, or generic fonts

### 3. Photography Check
- High resolution (300 DPI for print, 1080x1350 for IG)
- Dark background? Or strong contrast?
- Model is the focus, not the product
- No cheesy stock photo vibes
- Cultural respect (no appropriation)

### 4. Layout Check
- Generous white/black space (premium feel)
- Asymmetric layouts OK (streetwear aesthetic)
- Grid consistency across posts
- Logo placement is intentional (corner or center, not random)

### 5. Copywriting Tone
- Confident, not arrogant
- Minimal, not vague
- Cultural, not appropriative
- No emoji overload (1-2 max per post)
- No "humble brag" or "link in bio" generic phrases

### 6. Brand Consistency Score
Rate the asset 1-10:
- **9-10:** On-brand, ship it
- **7-8:** Minor tweaks needed
- **5-6:** Multiple issues, rework
- **3-4:** Off-brand, do not post
- **1-2:** Question whether the asset should exist

### 7. UGC Repost Check (for community content)
- Quality: Photo is good enough (not blurry, dark)
- Composition: Matches our aesthetic
- Story: Adds something to the brand narrative
- Credit: Tag the creator
- Permission: Get explicit OK before reposting

## Output Format

```markdown
🎨 **VISUAL CHECK: New Mudcloth Drop Teaser**

**Asset:** Hero image for IG post
**Link:** [Image URL]

**Score: 7/10 — MINOR TWEAKS NEEDED**

**✅ What's working:**
- Color palette is on-brand (black, oxblood, white)
- Typography is clean, bold, easy to read
- Composition is asymmetric (good for streetwear)
- Mood is dark, mysterious (matches brand)

**⚠️ Issues to fix:**
- Background is too light (use black, not gray)
- Model's pose is stiff (more natural movement)
- Logo is bottom-left — move to top-right for consistency
- Add 1 element of texture (concrete, fabric close-up)

**🛑 Do not change:**
- Color palette (perfect)
- Typography (perfect)
- Overall mood (perfect)

**Revisions needed:**
1. Replace gray background with black
2. Update model pose
3. Move logo to top-right
4. Add texture element

**After revisions, re-check.**

---

**Reference materials:**
- Approved mood board: [link]
- Color palette: [link]
- Font files: [link]
- Past approved posts: [examples]
```

## Example Invocation

User: "Is this design on-brand for SnapTrap?"
Assistant: [Reviews asset, scores, gives specific feedback]

## Verification
- [ ] Color palette checked
- [ ] Typography checked
- [ ] Photography style checked
- [ ] Layout checked
- [ ] Tone / copy checked
- [ ] Specific feedback (not vague)
- [ ] Score is honest

## Common Pitfalls
- ❌ "It looks good" (no specific feedback)
- ❌ Applying brand rules too rigidly (kills creativity)
- ❌ Ignoring UGC just because it's not perfect
- ❌ Letting one "almost on-brand" post become many
- ❌ No clear brand guide (subjective decisions)

## Related Skills
- `drop_planner` — Use for drop visuals
- `community_builder` — UGC must pass this check
- `trend_forecaster` — Trends must pass this check before adoption
