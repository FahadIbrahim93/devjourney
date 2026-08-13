---
name: seo_optimizer
description: Optimize product pages, blog posts, and category pages for search. Local + niche keywords.
version: 1.0.0
triggers:
  - "optimize for SEO"
  - "keywords for this"
  - "search rankings"
  - "improve product page SEO"
tags: [marjahans, seo, keywords, search, ecommerce]
---

# SEO Optimizer

## Purpose
Optimize jewelry e-commerce pages for search engines — local SEO (Bangladesh / South Asia), niche long-tail keywords, and product/category pages.

## Trigger Conditions
- New product added
- User asks "optimize this for SEO"
- Search ranking dropping
- On-demand via `/seo_optimizer <page>`

## Required Inputs
- **Page URL or content**
- **Target keyword** (optional — can be discovered)
- **Target market** (Bangladesh, South Asia diaspora, global)
- **Competition level** (low, medium, high)

## Steps

### 1. Keyword Research
- **Primary:** What does the customer search? (e.g., "handmade gold earrings")
- **Long-tail:** More specific (e.g., "handmade 22k gold earrings Bangladesh")
- **Local:** "jewelry store Dhaka," "buy gold earrings online BD"
- **Niche:** "tribal-inspired cuff," "brass patina jewelry"
- **Diaspora:** "South Asian jewelry USA," "Bengali wedding jewelry"

Tools: Ubersuggest (free), Google Trends, Google Search Console, Ahrefs (if available), AnswerThePublic

### 2. On-Page SEO Audit
- **Title tag:** Primary keyword near the start, < 60 chars
- **Meta description:** Compelling, includes keyword, < 160 chars
- **H1:** Single H1, includes primary keyword
- **H2/H3:** Long-tail variations
- **Image alt text:** Descriptive, includes keyword naturally
- **URL slug:** Short, includes keyword
- **Internal links:** 3-5 to related products/categories
- **Schema markup:** Product, Offer, Review

### 3. Content Optimization
- **Word count:** 300+ for product pages, 1000+ for blog posts
- **Keyword density:** 1-2% (don't stuff)
- **LSI keywords:** Related terms (e.g., "handmade" + "artisan" + "craft")
- **FAQ section:** Answers common questions, captures "People Also Ask"
- **Internal linking:** Link to 3-5 related products
- **External links:** 1-2 to authoritative sources (materials, techniques)

### 4. Local SEO (Bangladesh focus)
- **Google My Business:** Optimized listing
- **NAP consistency:** Name, Address, Phone identical across web
- **Local keywords:** City + service ("jewelry store Gulshan")
- **Bengali keywords:** বাংলা (bangles), সোনার গয়না (gold jewelry)
- **Local backlinks:** Bangladeshi directories, wedding blogs
- **Reviews:** Encourage Google reviews

### 5. Technical SEO
- **Mobile-friendly:** 100% responsive
- **Page speed:** < 3s load time
- **HTTPS:** SSL certificate
- **Sitemap:** XML sitemap submitted
- **Robots.txt:** Properly configured
- **Structured data:** Schema.org Product markup
- **Canonical tags:** Avoid duplicate content

### 6. Content Calendar (SEO-driven)
- **Blog posts:** 2-4 per month, targeting long-tail keywords
- **Product updates:** Refresh descriptions quarterly
- **FAQ expansion:** Add new questions monthly
- **Local content:** Bangladeshi wedding seasons, festivals (Pohela Boishakh, Eid)

## Output Format

```markdown
🔍 **SEO AUDIT: /products/river-stone-cuff**

**Current state:**
- Title: "Cuff" (too generic)
- Meta: missing
- H1: "River Stone Cuff" (good)
- Word count: 87 (too short)
- Images: 5, but no alt text
- Internal links: 1 (need 3-5)

**Recommended:**

**Title tag (52 chars):**
"Handmade Brass River Stone Cuff | Marjahans Jewelry"

**Meta description (155 chars):**
"Hand-forged brass cuff inspired by river stones. Made by master metalsmiths in Bangladesh. Free shipping over $150. Shop Marjahans."

**H1:** "River Stone Cuff — Hand-forged Brass Jewelry"
**H2:** "The Story Behind the Cuff"
**H2:** "How to Wear It"
**H2:** "Care Instructions"
**H2:** "Frequently Asked Questions"

**Keywords to add:**
- Primary: "handmade brass cuff" (880/mo)
- Long-tail: "river stone jewelry" (140/mo, low competition)
- Local: "handmade jewelry Bangladesh" (90/mo)
- Bengali: "হাতে গড়া গয়না" (40/mo)

**Image alt text examples:**
- "brass river stone cuff worn on wrist, hand-forged artisan jewelry"
- "river stone cuff detail, showing intentional patina finish"

**Internal links to add:**
1. /collections/brass-jewelry
2. /products/matching-earrings
3. /journal/river-stone-tradition
4. /pages/about-our-makers

**Schema markup to add:**
- Product: name, image, description, sku, price, availability
- Offer: price, currency, availability
- AggregateRating (after first 5 reviews)

**Content to add (target: 600+ words):**
- Origin story (150 words)
- How to style it (100 words)
- Care guide (100 words)
- FAQ (5 Q&As, 100 words)
- Maker bio (100 words)

**Expected impact:**
- Title/meta: +15% CTR
- Word count: +30% time on page
- Schema: rich results in Google (price, rating visible)
- Total: estimated +25% organic traffic to this page in 60 days
```

## Example Invocation

User: "Optimize my new product page for SEO"
Assistant: [Audits, recommends changes, estimates impact]

## Verification
- [ ] Title tag < 60 chars
- [ ] Meta description < 160 chars
- [ ] H1 has primary keyword
- [ ] Page has 300+ words
- [ ] Images have alt text
- [ ] Schema markup is valid
- [ ] Page speed < 3s
- [ ] Mobile-friendly

## Common Pitfalls
- ❌ Keyword stuffing (1-2% max density)
- ❌ Duplicate content (across product pages)
- ❌ Thin content (< 300 words)
- ❌ Missing alt text
- ❌ Ignoring local SEO (huge for Bangladeshi market)
- ❌ Not updating content (stale pages lose rankings)

## Related Skills
- `product_storyteller` — Long-form content for product pages
- `campaign_builder` — SEO-friendly email content
- `competitor_watcher` — Track competitor keyword rankings
