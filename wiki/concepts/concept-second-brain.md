---
title: Second Brain (Personal)
created: 2026-06-07
updated: 2026-06-07
type: concept
tags: [concept, system, philosophy]
sources: [raw/articles/tiago-forte-second-brain.md]
confidence: high
---

# Second Brain (Personal)

> A personal knowledge management system that captures everything you learn, organize it for retrieval, distill it into your own thinking, and express it as output. The CODE method.

## CODE Method (Tiago Forte)

1. **Capture** — collect ideas worth keeping (articles, quotes, notes)
2. **Organize** — file by PARA or wiki structure
3. **Distill** — find the essence, write in your own words
4. **Express** — output as content, decisions, conversations

## Why We Built One
- 6 ventures × 100s of ideas/week = brain overload
- Read once, use forever (vs forgetting)
- Cross-venture insights (the magic of linking)
- Compounds — gets more valuable over time

## Our Stack
- **[[tool-obsidian]]** — visual frontend
- **[[concept-llm-wiki]]** — structure (Karpathy pattern)
- **[[tool-ollama]]** — local RAG (private queries)
- **Shadow Clones** — auto-curation

## Daily Habit
- **Morning:** Read daily note (5 min)
- **Throughout:** Capture fast (1 min)
- **Evening:** Distill (10 min)
- **Weekly:** Review, link, lint (30 min)

## PARA vs Wiki
| | PARA | LLM Wiki |
|---|---|---|
| Best for | Action-oriented people | Researchers, learners |
| Folders | Projects / Areas / Resources / Archive | Entities / Concepts / Comparisons / Queries |
| Linking | Tags | Wikilinks |
| AI-friendly | Less | More |

We chose **wiki** because of LLM agent maintenance + cross-linking.

## Related
- [[concept-llm-wiki]]
- [[concept-shadow-clone-jutsu]]
- [[tool-obsidian]]
