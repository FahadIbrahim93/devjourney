# Second Brain — SCHEMA
**Domain:** Hope Theory 6-venture empire (CRYPTO, CODE, MARJAHANS, SNAPTRAP, BUILD, PHILO) + general second-brain capture
**Pattern:** Karpathy LLM Wiki + Obsidian
**Maintained by:** Hope Theory Shadow Clones (esp. [[truth-seeker]] for ingestion, [[naruto-main]] for synthesis)
**Vault path:** `H:\DevJourney\wiki\`

---

## 🎯 PURPOSE

A persistent, compounding knowledge base that:
1. **Captures** everything you read, watch, learn, hear
2. **Distills** it into cross-referenced concepts and entities
3. **Connects** ideas across the 6 ventures
4. **Answers** questions from compiled knowledge (not re-discovery)
5. **Surfaces** contradictions and stale info
6. **Compactions** with you — every read, every question makes the next one faster

## 📐 STRUCTURE (Three Layers)

```
wiki/
├── SCHEMA.md              # This file
├── index.md               # Catalog of all pages (search here first)
├── log.md                 # Append-only action log
├── daily/                 # Daily notes (YYYY-MM-DD.md)
├── templates/             # Reusable templates (in _meta)
│
├── raw/                   # LAYER 1: Immutable sources
│   ├── articles/          # Web articles, blog posts
│   ├── papers/            # PDFs, arxiv papers, books
│   ├── transcripts/       # YouTube, podcasts, meetings
│   ├── quotes/            # Memorable quotes
│   └── assets/            # Images, diagrams
│
├── entities/              # LAYER 2: People, orgs, products, models
├── concepts/              # LAYER 2: Topics, ideas, techniques
├── comparisons/           # LAYER 2: Side-by-side analyses
├── queries/               # LAYER 2: Filed query results worth keeping
│
├── ventures/              # LAYER 3: Per-venture MOCs
│   ├── crypto.md
│   ├── code.md
│   ├── marjahans.md
│   ├── snaptrap.md
│   ├── build.md
│   └── philo.md
│
└── _meta/                 # Internal meta
    ├── MOCs/              # Map of Content pages
    ├── templates/         # Templates
    └── archive/           # Superseded pages
```

## ✍️ CONVENTIONS

### File naming
- Lowercase, hyphens, no spaces: `bitcoin-lightning-network.md`
- Daily notes: `daily/YYYY-MM-DD.md` (Obsidian's Daily Notes plugin uses this)
- Person pages: `entities/[firstname-lastname].md`
- Org pages: `entities/[org-name].md`

### Every page starts with YAML frontmatter
```yaml
---
title: Page Title
created: YYYY-MM-DD
updated: YYYY-MM-DD
type: entity | concept | comparison | query | moc | venture
tags: [from-taxonomy]
sources: [raw/articles/source.md]
confidence: high | medium | low
contested: true                    # optional, set when contradictions exist
---
```

### Linking
- Use `[[wikilinks]]` for ALL internal references
- Minimum 2 outbound links per page (or it becomes an orphan)
- Daily notes link to entities/concepts from the day
- MOCs (Map of Content) aggregate links by theme

### Provenance
- On pages synthesizing 3+ sources, append `^[raw/articles/source.md]` after paragraphs
- Trace each claim back without re-reading the source
- Single-source pages: just use `sources:` in frontmatter

## 🏷️ Tags — use this taxonomy (don't invent new ones)
- **Ventures:** #crypto, #code, #marjahans, #snaptrap, #build, #philo
- **Content type:** #article, #paper, #video, #podcast, #book, #meeting, #quote
- **Discipline:** #tech, #business, #marketing, #finance, #philosophy, #design
- **Stage:** #idea, #research, #draft, #shipped, #archived
- **Quality:** #high-signal, #medium, #low (one-time reads)
- **Meta:** #moc, #template, #system, #tool, #person, #org, #concept
- **Type modifiers:** #comparison, #daily, #weekly, #query, #entity, #venture, #raw
- **Technical:** #react, #typescript, #python, #solidity, #bash
- **AI/ML:** #ai, #ml, #llm, #agent, #rag, #embedding, #fine-tuning
- **Crypto concepts:** #technical, #strategy, #analysis, #on-chain, #defi, #btc, #eth
- **Product type:** #product, #service, #platform, #protocol, #library
- **Status:** #wip, #draft, #published, #archived

To add a new tag: add to this list first, then use it. Prevents tag sprawl.

## 📏 PAGE THRESHOLDS

- **Create a page** when an entity/concept appears in 2+ sources OR is central to one
- **Add to existing page** when a new source mentions the same entity
- **DON'T create** for passing mentions, minor details, off-topic
- **Split a page** when it exceeds ~200 lines
- **Archive** when content is fully superseded → `_meta/archive/`

## 🔄 UPDATE POLICY

When new info conflicts with existing content:
1. Check dates — newer sources generally win
2. If genuinely contradictory, note BOTH positions with dates
3. Set `contested: true` in frontmatter
4. Run lint to surface for review
5. Don't silently overwrite

## 🔍 WORKFLOW (How to use this wiki)

### When you read/watch/learn something interesting
1. **Capture** raw to `raw/articles/`, `raw/transcripts/`, or `raw/papers/`
2. **Quick review** — does this mention 2+ existing entities? Or introduce a new core idea?
3. **Update or create** page in `entities/` or `concepts/`
4. **Link to/from** related pages (2+ outbound links)
5. **Tag** with taxonomy
6. **Log** in `log.md`
7. **Update** `index.md` if new page

### When you ask a question
1. **Orient** — read `index.md`, scan `log.md` last 20 entries
2. **Search** — `[[concept-name]]` or `search_files`
3. **Read** relevant pages
4. **Synthesize** answer from compiled knowledge
5. **Cite** pages you drew from
6. **File** if answer is substantial → `queries/YYYY-MM-DD-question.md`

### Daily habit
1. **Morning** — review daily/YYYY-MM-DD.md (5 min)
2. **Capture** throughout the day (forward to daily note)
3. **Evening** — distill daily note into entities/concepts (10 min)
4. **Weekly** — review index, find orphans, file loose ends (30 min)

## 🐼 INTEGRATION WITH SHADOW CLONES

| Clone | Wiki role |
|-------|-----------|
| **naruto_main** | Daily synthesis → `daily/YYYY-MM-DD.md` |
| **truth_seeker** | Primary curator: research, ingest, distill, cross-ref |
| **crypto_sage** | Crypto-specific: BTC analysis, mining notes → `ventures/crypto.md` |
| **code_ninja** | Code knowledge: patterns, tools, snippets → `concepts/` |
| **marjahans_merchant** | Brand voice, customer insights → `concepts/` (LOCAL, no PII) |
| **snaptrap_stylist** | Trend notes, drop lessons → `concepts/` (LOCAL) |
| **build_master** | Real estate concepts, network → `entities/` |
| **truth_seeker** | Content research, audience insights → `concepts/`, `queries/` |

## 🔐 PRIVACY RULES

- **No customer PII** in this wiki (lives in marjahans_merchant local memory only)
- **No supplier contracts** with names/amounts (use codes, e.g. `supplier-A-2026`)
- **Public business info** is fine
- **Personal info** is fine
- **Code/secrets** never here (lives in .env / git)

## 🛠️ TOOLING

### Frontend (read/edit)
- **Obsidian** (free) — best graph view, plugin ecosystem
- VS Code + Markdown All in One
- Any text editor

### Backend (maintain/query)
- **Hermes agents** (you have 7)
- **Ollama + LlamaIndex** (local RAG, $0)
- **Grep / ripgrep** (terminal)

### Sync
- **Git** (free, versioned, backup)
- Optional: Obsidian Sync ($4/mo, not needed for solo)

## 📊 SUCCESS METRICS

- **50+ pages by Day 30** (entities + concepts)
- **100+ pages by Day 60**
- **2+ outbound links per page** (no orphans)
- **0 broken wikilinks** (lint)
- **Daily note every day** (consistency)
- **10+ cross-venture connections** (the magic)

---

**Last updated:** 2026-06-07
**Maintainer:** Hope Theory Shadow Clone Jutsu
**Pattern source:** Karpathy LLM Wiki + Obsidian
