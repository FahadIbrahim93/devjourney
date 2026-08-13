---
name: deep_researcher
description: Multi-source research synthesis. Find the truth behind any topic. Sources, contradictions, gaps.
version: 1.0.0
triggers:
  - "research [topic]"
  - "find sources on"
  - "what do we know about"
  - "deep dive into"
tags: [philo, research, synthesis, sources, truth-seeking]
---

# Deep Researcher

## Purpose
Conduct deep, multi-source research on any topic. Surface insights, identify contradictions, expose gaps. The truth, not the narrative.

## Trigger Conditions
- User asks "research [topic]"
- Newsletter / content needs evidence
- Course or book research
- On-demand via `/deep_researcher <topic>`

## Required Inputs
- **Topic** (specific question or theme)
- **Scope** (broad overview vs deep dive)
- **Time horizon** (current, historical, future)
- **Source preference** (academic, news, primary, opinion)

## Steps

### 1. Define the Question
- **Core question:** What exactly are we trying to learn?
- **Sub-questions:** 3-5 supporting questions
- **Out of scope:** What we're NOT researching
- **Success criteria:** What does "answered" look like?

### 2. Identify Source Types

**Primary sources** (highest credibility):
- Original research papers (peer-reviewed)
- Government data (BLS, World Bank, IMF)
- Court documents, official statements
- First-hand accounts (interviews, diaries)

**Secondary sources** (reliable):
- Reputable journalism (NYT, Reuters, BBC, Prothom Alo)
- Industry reports (McKinsey, Gartner, local equivalents)
- Books by domain experts
- Encyclopedias (Britannica, Stanford Encyclopedia of Philosophy)

**Tertiary sources** (use with caution):
- Wikipedia (good starting point, verify)
- Substack / Medium (vary wildly in quality)
- Social media (signal:noise very low)
- AI-generated content (verify everything)

### 3. Multi-Source Triangulation
For any important claim, find **3+ independent sources** that agree. If they disagree:
- **Note the disagreement** (don't hide it)
- **Identify why** (different methods, biases, dates)
- **Weight by credibility** (primary > secondary > tertiary)
- **Present both sides** (transparency builds trust)

### 4. Search Strategy

**Google advanced search:**
- `"exact phrase"` — for specific quotes
- `site:edu` — academic
- `site:gov` — government
- `site:reuters.com` — specific source
- `filetype:pdf` — research papers
- `-term` — exclude
- `intitle:word` — title contains
- `2010..2026` — date range

**Academic search:**
- Google Scholar
- arXiv
- SSRN
- ResearchGate
- JSTOR

**Data sources:**
- World Bank, IMF, UN data
- Trading Economics, FRED
- Statista, Our World in Data
- Local: BBS (Bangladesh Bureau of Statistics)

### 5. Synthesize Findings

Structure the research output:
- **TL;DR:** 2-3 sentence answer
- **Key findings:** 5-10 bullet points
- **Evidence:** Sources for each finding
- **Contradictions:** Where sources disagree
- **Gaps:** What we don't know
- **Open questions:** What needs more research
- **Sources cited:** Full list

### 6. Quality Check
- [ ] All claims have sources
- [ ] Multiple sources for important claims
- [ ] Contradictions noted, not hidden
- [ ] Primary sources prioritized
- [ ] Recent data (within 1-2 years) for current state
- [ ] Acknowledged biases (your own + sources')

## Output Format

```markdown
📚 **DEEP RESEARCH: "Will Bitcoin reach $1M by 2030?"**

**Date:** June 6, 2026
**Sources reviewed:** 23 (8 primary, 12 secondary, 3 tertiary)

**TL;DR:** Most credible models suggest BTC will reach $200K-$500K by 2030, not $1M. The $1M target requires specific conditions (extreme fiat debasement, regulatory clarity + ETF growth, or hyper-bullish cycle). Possible but not the central case.

**Key findings:**

1. **Current state (June 2026):** BTC trading at $67,500, ETF inflows $40B+ YTD, 2 halvings past
   - Sources: CoinGecko, Bloomberg, BlackRock Q2 report
   - Credibility: High (3 independent sources)

2. **Stock-to-flow model:** Predicts $1M+ by 2030
   - Source: PlanB original paper, but model has been wrong in 2023-2024
   - Credibility: Medium (theory-driven, not always accurate)

3. **Metcalfe's Law (network value):** Suggests $200K-$400K at current adoption
   - Sources: Multiple research papers
   - Credibility: High (model is robust)

4. **Fiat debasement scenario:** If USD loses 30%+ value, BTC could reach $500K-$1M in nominal terms
   - Sources: Goldman Sachs, Bridgewater research
   - Credibility: Medium-high (depends on macro scenario)

5. **Regulatory risk:** Major crackdown could push BTC to $30K (3 of 23 sources flagged this)

**Contradictions:**
- Stock-to-flow says $1M; Metcalfe's Law says $400K. Resolution: S2F has been over-fitting post-2022. Metcalfe's Law tracks adoption better.

**Gaps:**
- Unclear: How ETF growth will evolve post-2027
- Unknown: Regulatory environment in major economies
- Open: Geopolitical scenarios (war, crisis, hyperbitcoinization)

**Open questions for future research:**
- What is the actual velocity of institutional adoption?
- How does CBDC rollout affect BTC?
- What's the relationship between AI compute costs and BTC mining?

**Sources cited (selected):**
- [1] PlanB (2019). "Modeling Bitcoin's Value with Scarcity." SSRN.
- [2] Wheatley, S. (2018). "Use of Metcalfe's Law..." SSRN.
- [3] BlackRock Q2 2026 ETF Report.
- [4] CoinGecko live data (June 6, 2026).
- [5] Bloomberg, "Crypto Markets Weekly" (June 1, 2026).
- [... full list in footnote]
```

## Example Invocation

User: "Research: Is remote work actually more productive?"
Assistant: [Defines question, finds 20+ sources, synthesizes, flags contradictions]

## Verification
- [ ] Question is clear, specific
- [ ] Multiple source types used
- [ ] Primary sources prioritized
- [ ] Contradictions flagged
- [ ] Gaps acknowledged
- [ ] Full source list
- [ ] Synthesis is honest (not forced conclusion)

## Common Pitfalls
- ❌ Confirmation bias (only finding what you want)
- ❌ Single source for important claims
- ❌ Hiding contradictions
- ❌ Mixing primary and tertiary sources as equal
- ❌ Outdated data
- ❌ Cherry-picking sources
- ❌ AI-generated content (always verify)

## Related Skills
- `content_engine` — Turn research into content
- `trend_synthesizer` — Combine research with trends
- `audience_builder` — Audience asks questions, research answers them
