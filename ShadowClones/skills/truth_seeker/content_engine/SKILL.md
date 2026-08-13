---
name: content_engine
description: Write long-form content. Articles, threads, newsletters. Hooks, structure, CTAs.
version: 1.0.0
triggers:
  - "write a [thread/article/newsletter]"
  - "content for [platform]"
  - "draft a post about"
  - "publish-ready copy"
tags: [philo, content, writing, threads, newsletter]
---

# Content Engine

## Purpose
Write publish-ready long-form content: threads, articles, newsletters, essays. Hooks that grab, structure that flows, CTAs that convert.

## Trigger Conditions
- Daily content cron
- User asks "write [content type] about [topic]"
- Weekly newsletter draft
- On-demand via `/content_engine <request>`

## Required Inputs
- **Content type** (thread, article, newsletter, essay, video script)
- **Topic / angle** (specific position or question)
- **Platform** (X, Substack, LinkedIn, YouTube)
- **Length target** (280 chars / 1,000 words / 5,000 words)
- **Audience** (technical, general, crypto-native, etc.)
- **Goal** (engagement, conversion, education, brand)

## Steps

### 1. Content Type Selection

| Type | Length | Platform | Goal |
|------|--------|----------|------|
| Tweet | 280 chars | X | Quick thought |
| Thread | 5-15 tweets | X | Story / how-to |
| LinkedIn post | 1,300 chars | LinkedIn | Professional insight |
| Substack post | 1,500-3,000 words | Substack | Deep value |
| Long article | 3,000-10,000 words | Personal blog | Authority |
| Video script | 5-15 min spoken | YouTube/TikTok | Reach |
| Newsletter | 800-1,500 words | Email | Nurture |

### 2. Hook (First Line)

The hook is EVERYTHING. 5 proven patterns:

**Pattern 1: Contrarian**
"Most people think [common belief]. They're wrong."

**Pattern 2: Specific result**
"I made $47,000 in 30 days doing [X]. Here's the exact playbook."

**Pattern 3: Curiosity gap**
"In 2019, I noticed something strange about [topic]. It took me 3 years to understand."

**Pattern 4: Story time**
"Last Tuesday, a friend asked me to help with [problem]. What I found changed how I think about [bigger thing]."

**Pattern 5: List with twist**
"5 lessons from losing $100K. #4 will save you."

### 3. Structure (Choose 1)

**Structure A: Problem-Solution-Proof**
1. State the problem
2. Why it's hard
3. My solution
4. Evidence it works
5. How you can do it

**Structure B: Story-Lesson-Application**
1. Personal story
2. What I learned
3. Why it matters
4. How to apply

**Structure C: Listicle (with depth)**
1. Hook (the contrarian take)
2. List item 1 (with story/example)
3. List item 2 (with story/example)
4. ...
5. Conclusion (synthesis)
6. CTA

**Structure D: How-To**
1. Why this matters
2. What you'll need
3. Step 1
4. Step 2
5. ...
6. Common mistakes
7. Expected result

### 4. Writing Style

**Voice principles:**
- **Be specific:** "47%" beats "a lot"
- **Be honest:** "I lost money" beats "it's tricky"
- **Be concise:** Cut every unnecessary word
- **Be vivid:** "Gold-tinted sunrise over Gulshan" beats "beautiful morning"
- **Be contrarian (sometimes):** "Everyone says X. Here's why they're wrong."

**Avoid:**
- ❌ Clichés: "dive deep," "unlock potential," "in today's world"
- ❌ Filler: "It's important to note that..."
- ❌ AI-tells: "Let me explain," "Here's the thing"
- ❌ Hype: "Revolutionary," "game-changer," "next-level"
- ❌ Apologies: "Sorry if this is obvious"

### 5. Threads (X / Twitter)

**Format:**
1. Hook tweet (the whole thread in 1 line)
2. Setup (context, why this matters)
3. Body (5-10 numbered insights)
4. Twist (counterintuitive takeaway)
5. CTA (follow, RT, comment, link)

**Rules:**
- Each tweet = 1 idea
- Number them (1/, 2/, etc.) so people can follow
- Last tweet is the most important (the takeaway)
- End with question (drives replies)

**Length:** 5-15 tweets sweet spot

### 6. Substack Newsletters

**Format:**
1. Subject line (curiosity, urgency, or value)
2. Preview text (continues the hook)
3. Opening (story, current event, contrarian)
4. Body (3-5 sections with subheads)
5. "What this means for you" (application)
6. Quote of the week (optional)
7. Forward + CTA

**Rules:**
- 1,500-2,500 words sweet spot
- 1-2 images (not 10)
- Personal voice (not corporate)
- One main idea (not 5)
- Send Tuesday or Thursday (peak open rates)

### 7. CTAs (Calls to Action)

**Tier 1 (highest intent):**
- "Reply with [specific thing]"
- "DM me 'X' to get [free thing]"
- "Join [specific community]"

**Tier 2 (engagement):**
- "Like if this resonated"
- "Share with someone who needs it"
- "Comment your take"

**Tier 3 (low effort):**
- "Follow for more"
- "Subscribe to the newsletter"

**Rule:** 1 CTA per post. Don't dilute.

### 8. Editing

**Pass 1: Cut filler**
- Remove "just," "really," "very," "actually"
- Remove throat-clearing ("It's worth noting...")
- Cut redundant sentences

**Pass 2: Strengthen verbs**
- "make" → "build"
- "do" → "execute"
- "use" → "leverage" (but use sparingly)

**Pass 3: Read aloud**
- If it sounds clunky, rewrite
- Real conversation > formal writing

**Pass 4: Check for AI-tells**
- No "Let's dive in"
- No "In conclusion"
- No "delve into"
- No perfect parallel structure (humans are messier)

## Output Format

```markdown
✍️ **CONTENT: Substack Post**

**Topic:** "Why I sold all my ETH (and what I bought instead)"
**Length:** 1,800 words
**Audience:** Crypto-native, 25-45, already owns crypto
**Goal:** Engagement + thought leadership

---

**Subject line options (A/B test):**
A: "Why I sold all my ETH"
B: "I sold all my ETH on Tuesday. Here's what happened next."
C: "The ETH case I can't make anymore"

**Preview text:** A 4-year ETH bull just hit his exit. Here's the reasoning, the data, and the surprising replacement.

---

**Body:**

[Full post content here, formatted in markdown]

---

**CTA:** Reply with what you'd buy instead — I'll feature the best reply in next week's post.

**Tags:** #crypto #ethereum #bitcoin #investing
**Send time:** Thursday 9 AM EST
**Expected open rate:** 42%
```

## Example Invocation

User: "Write a 10-tweet thread on why most freelance devs fail"
Assistant: [Plans structure, writes hook, develops body, adds CTA]

## Verification
- [ ] Hook is strong (first line)
- [ ] Structure is clear
- [ ] Specific, not vague
- [ ] Voice is consistent (not corporate)
- [ ] One main idea
- [ ] One clear CTA
- [ ] No AI-tells
- [ ] Edited for filler

## Common Pitfalls
- ❌ Weak hook (people scroll past)
- ❌ Too many ideas in one piece
- ❌ Vague ("a lot of people think...")
- ❌ Corporate voice (no personality)
- ❌ Multiple CTAs (none get clicked)
- ❌ Skipping the edit pass
- ❌ AI-tells (sounds like ChatGPT)

## Related Skills
- `deep_researcher` — Research for content
- `audience_builder` — Who's reading this?
- `trend_synthesizer` — What topics are hot?
