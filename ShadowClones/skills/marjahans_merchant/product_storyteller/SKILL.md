---
name: product_storyteller
description: Turn jewelry pieces into stories. Origin, craft, cultural meaning. Not specs, soul.
version: 1.0.0
triggers:
  - "write product story"
  - "describe this piece"
  - "jewelry description"
  - "product copy"
tags: [marjahans, jewelry, storytelling, copy, ecommerce]
---

# Product Storyteller

## Purpose
Transform jewelry inventory into compelling stories that honor the craft, the maker, and the cultural meaning — not just specs.

## Trigger Conditions
- New product added to catalog
- User asks "write product story for [piece]"
- Marketing campaign needs product copy
- On-demand via `/product_storyteller <product_id>`

## Required Inputs
- **Product details** (type, materials, dimensions, origin, price)
- **Cultural context** (region, tradition, symbolism)
- **Target audience** (gift buyer, self-purchaser, collector)
- **Channel** (IG, Shopify, Klaviyo, packaging insert)

## Steps

### 1. Research the Piece
- Origin of the design (if known)
- Cultural symbolism (if applicable)
- Material sourcing (where, by whom)
- Craft technique (handmade, machine, hybrid)
- Inspiration / story behind the piece

### 2. Identify the Soul
Every piece has a soul. Find it. Examples:
- A necklace made from recycled gold = "new life for old stories"
- A cuff inspired by river stones = "carrying the river with you"
- A pendant engraved with Bengali script = "your grandmother's blessing, in metal"

### 3. Write 3 Versions
- **Long form (300-500 words):** Full story, for product page or packaging
- **Medium (100-150 words):** IG caption or email feature
- **Short (20-50 words):** Tagline or ad copy

### 4. Tone Calibration
- **Luxury buyer:** Elegant, restrained, sophisticated
- **Gift buyer:** Sentimental, warm, "make her feel special"
- **Self-purchaser:** Confident, expressive, "you deserve this"
- **Collector:** Detailed, artistic, "this is a piece of cultural heritage"

### 5. Cultural Sensitivity Check
- Honor the origin (don't appropriate)
- Credit the maker / community
- Use authentic terminology
- Avoid clichés ("exotic," "ethnic," "tribal")
- If unsure, say so and ask

## Output Format

```markdown
✨ **PRODUCT STORY: "River Stone Cuff"**

**Long Form (450 words):**
"In the rivers of [region], smooth stones are said to hold the memory of every drop that passed over them. This cuff carries that quiet wisdom — shaped by hand, polished by time, worn by those who walk their own path.

The brass is forged using a technique passed down through [N] generations of metalsmiths. Each piece takes [X] hours to complete. The patina is intentional: a slow oxidation that mimics the river stone's natural weathering, so the cuff deepens in character as you wear it.

Wear it alone as a daily talisman, or stack it with the [matching pieces] for a more layered story. Either way, you'll be wearing a piece of [region] in your bones..."

**Medium (120 words):**
"Carrying the river with you. Our River Stone Cuff is hand-forged brass, finished with an intentional patina that deepens with every wear. Made by [N]th-generation metalsmiths in [region]. Wear it solo, or stack with [matching pieces] for a layered look. [Price]. Free shipping over $150."

**Short (30 words):**
"River Stone Cuff — hand-forged brass, intentional patina, made by [N]th-generation metalsmiths. Wear the river with you. [Link]"

**Cultural Note:**
This piece is inspired by the [region] river-stone tradition but is our own original design. We credit the cultural context and pay fair wages to our makers.

**Hashtags:** #HandcraftedJewelry #RiverStoneCuff #SouthAsianCraft #SlowFashion
```

## Example Invocation

User: "Write a product story for the new anklet we just added"
Assistant: [Researches, identifies soul, writes 3 versions]

## Verification
- [ ] Story honors the craft, not just specs
- [ ] Cultural context is credited
- [ ] Three versions serve different channels
- [ ] Tone matches target audience
- [ ] No clichés, no appropriation
- [ ] Soul is genuine, not manufactured

## Common Pitfalls
- ❌ "Handmade with love" (overused, generic)
- ❌ "Exotic / ethnic / tribal" (problematic, vague)
- ❌ "Perfect for any occasion" (lazy, uninspiring)
- ❌ Specs dump (just materials, no story)
- ❌ Cultural appropriation (using sacred symbols for fashion)

## Related Skills
- `seo_optimizer` — Add keywords for search
- `campaign_builder` — Build email campaign around this piece
- `influencer_scout` — Find creators who align with this aesthetic
