---
title: Shadow Clone Jutsu
created: 2026-06-07
updated: 2026-06-07
type: concept
tags: [concept, code, ai, business, system]
sources: []
confidence: high
---

# Shadow Clone Jutsu

> Our multi-agent architecture: 1 main digital twin (Naruto_Main) + 6 specialized clones, each in an isolated Hermes profile. The orchestrator pattern at the heart of Hope Theory.

## The Pattern
- **1 orchestrator** — coordinates, delegates, has full toolset
- **N specialists** — each with dedicated model, skills, memory
- **Isolation** — each profile has own skills, memory, cron
- **Coordination** — shared [[concept-llm-wiki|wiki]] + Kanban

## Our 7 Clones

| Clone | Venture | Model | Privacy |
|-------|---------|-------|---------|
| [[naruto-main\|naruto_main]] | Orchestrator | Claude 3.5 Sonnet | Cloud |
| [[crypto-sage\|crypto_sage]] | [CRYPTO] | Gemini 2.5 Flash | Cloud |
| [[code-ninja\|code_ninja]] | [CODE] | Claude + Ollama | Hybrid |
| [[marjahans-merchant\|marjahans_merchant]] | [MARJAHANS] | Ollama 8B | 🔒 LOCAL |
| [[snaptrap-stylist\|snaptrap_stylist]] | [SNAPTRAP] | Ollama 8B | 🔒 LOCAL |
| [[build-master\|build_master]] | [BUILD] | Kimi 128K | Cloud |
| [[truth-seeker\|truth_seeker]] | [PHILO] | xAI Grok 2 | Cloud |

## Why It Works
- **Specialization** — right model for the job
- **Cost optimization** — free models where possible
- **Privacy** — customer data stays local
- **Scalability** — add new clones per new venture
- **Resilience** — one fails, others continue

## Daily Rhythm
- **9:00 AM** — Each clone's morning check
- **9:30 AM** — Naruto_Main synthesis
- **Throughout** — On-demand missions
- **10:00 PM** — Memory consolidation

## Coordination
- **Kanban** — shared task board
- **Wiki** — shared knowledge base
- **Memory** — isolated by default, shared via wiki
- **Daily log** — append-only audit trail

## Setup Path
`H:\DevJourney\ShadowClones\` — 82 files, 47 tests, deployable in 30 min

## Related
- [[concept-llm-wiki]]
- [[tool-ollama]]
- [[tool-obsidian]]
