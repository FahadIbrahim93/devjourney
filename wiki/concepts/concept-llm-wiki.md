---
title: LLM Wiki (Karpathy Pattern)
created: 2026-06-07
updated: 2026-06-07
type: concept
tags: [concept, ai, code, philosophy]
sources: [raw/transcripts/karpathy-llm-wiki-2026.md]
confidence: high
---

# LLM Wiki (Karpathy Pattern)

> A persistent, compounding knowledge base maintained by an LLM agent. Plain markdown files, wikilinks, YAML frontmatter. The [[tool-obsidian|Obsidian]] + Hermes Agent + Ollama stack we use.

## The Insight
> "RAG rediscovers knowledge per query. A wiki compiles it once and keeps it current. Cross-references are pre-built. Contradictions are pre-flagged."

— Andrej Karpathy

## Architecture (3 Layers)

1. **Raw sources** (`raw/`) — immutable, agent reads but doesn't modify
2. **Wiki pages** (`entities/`, `concepts/`, `comparisons/`) — agent creates + updates
3. **Schema** (`SCHEMA.md`) — conventions, tag taxonomy, structure rules

## How It Compounds
- New source → check existing pages → add to relevant pages
- Each update links to 2+ others
- Cross-references grow automatically
- Inconsistencies surface (not buried)

## Why It Works Better Than RAG
| | RAG | LLM Wiki |
|---|---|---|
| Knowledge compiled per query | Yes | No (pre-compiled) |
| Cross-references | Built per query | Pre-built |
| Contradictions | Hidden | Flagged |
| Cost per query | High (embed + retrieve + generate) | Low (just read markdown) |
| Offline | No | Yes (just markdown) |

## Tools
- [[tool-obsidian]] — frontend
- Hermes agents — backend (7 clones)
- [[tool-ollama]] — local RAG (embeddings)

## Our Wiki
- Path: `H:\DevJourney\wiki\`
- 6 ventures × MOC = 6 maps
- Daily note habit
- 7 clones curate

## Related
- [[person-andrej-karpathy]]
- [[tool-obsidian]]
- [[tool-ollama]]
