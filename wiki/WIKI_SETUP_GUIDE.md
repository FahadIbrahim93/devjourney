# 🧠 Hope Theory Second Brain — Setup Guide
**Pattern:** Karpathy LLM Wiki + Obsidian + Ollama + Hermes
**Vault path:** `H:\DevJourney\wiki\`
**Status:** Ready to deploy (3 commands + Obsidian install)

---

## 🎯 THE STACK (WHY THIS ONE)

| Layer | Tool | Cost | Why |
|-------|------|------|-----|
| **Frontend** | [Obsidian](https://obsidian.md/) | Free (personal) | Best graph view, mature, plain markdown |
| **Structure** | Karpathy LLM Wiki | $0 | Compounding knowledge, agent-curated |
| **Embeddings** | [Ollama](https://ollama.com) + nomic-embed-text | $0 | Local RAG, private, offline |
| **Curator** | 7 Hermes clones | $0-50/mo | Already built in Shadow Clones |
| **Editor** | Any (VS Code, Obsidian, vim) | $0 | Plain markdown, no lock-in |
| **Sync** | Git | $0 | Versioned, backup, history |

**Total: $0** (assuming you have Obsidian free for personal use and the hardware)

---

## 🚀 DEPLOYMENT (10 min)

### Step 1: Install Obsidian
1. Download: https://obsidian.md/download (Windows installer)
2. Open Obsidian
3. "Open folder as vault" → select `H:\DevJourney\wiki\`
4. Accept default plugin settings

### Step 2: Install Ollama + embedding model
```bash
# Install Ollama
winget install Ollama.Ollama

# Start Ollama (in a separate terminal)
ollama serve

# Pull the embedding model (274MB)
ollama pull nomic-embed-text

# Pull your main LLM (5GB) - if not done already
ollama pull llama3.1:8b
```

### Step 3: Verify the wiki
```bash
cd H:\DevJourney\wiki
node wiki-lint.cjs        # Should show 0 errors, 0 warnings
node wiki-rag.cjs index   # Build the RAG index (5-10 min for full wiki)
node wiki-rag.cjs query "bitcoin halving"
```

### Step 4: Daily workflow
- **Open Obsidian** → daily note auto-creates for today
- **Capture fast** → inbox section
- **Evening** → distill into entities/concepts
- **Weekly** → run `wiki-lint.cjs` to find orphans + broken links

---

## 📚 HOW THE WIKI WORKS

### The 3 Layers

```
Layer 1: raw/         → Immutable sources (articles, papers, videos)
Layer 2: wiki/        → Curated pages (entities, concepts, comparisons)
Layer 3: SCHEMA.md    → Conventions, structure, tag taxonomy
```

### When you read something interesting

1. **Save the URL** to daily note
2. **Use a clone** (or ask in chat): "ingest this article into the wiki"
3. **Clone saves** the article to `raw/articles/`, creates/updates wiki pages
4. **Updates index.md** and `log.md`
5. **Wiki compiles** once, queries are free forever

### When you ask a question

1. **Search Obsidian** (Ctrl+Shift+F) for keywords
2. **Or query the RAG**: `node wiki-rag.cjs query "your question"`
3. **Read the relevant pages** — they're already cross-referenced
4. **Add to wiki** if you learn something new

---

## 🤖 INTEGRATION WITH SHADOW CLONES

The 7 clones can curate your wiki automatically:

| Clone | Wiki role |
|-------|-----------|
| **truth_seeker** | Primary curator: research, ingest articles, write summaries |
| **code_ninja** | Code knowledge: patterns, tools, snippets |
| **crypto_sage** | Crypto insights: BTC analysis, mining notes |
| **marjahans_merchant** | Brand voice, customer insights (LOCAL) |
| **snaptrap_stylist** | Trend notes, drop lessons (LOCAL) |
| **build_master** | Real estate concepts, network |
| **naruto_main** | Daily synthesis → daily/YYYY-MM-DD.md |

### Example prompts to a clone

```
truth_seeker: "Ingest this article: https://example.com/x → wiki"
truth_seeker: "Find all my notes on AI agents, summarize in queries/ai-agents-landscape.md"
crypto_sage: "What have I learned about Bitcoin in the last 30 days?"
code_ninja: "Add this React 19 pattern to my wiki: [code snippet]"
naruto_main: "Synthesize today's work into a daily note"
```

---

## 🔐 PRIVACY

| Profile | Wiki access | Customer data |
|---------|-------------|---------------|
| naruto_main | ✅ | ❌ |
| truth_seeker | ✅ | ❌ |
| code_ninja | ✅ | ❌ |
| build_master | ✅ | ❌ |
| marjahans_merchant | ✅ (brand only) | **🔒 LOCAL ONLY** |
| snaptrap_stylist | ✅ (brand only) | **🔒 LOCAL ONLY** |

**Rule:** No customer PII, no supplier names/amounts in the wiki. Customer data lives in the clone's local Ollama memory only.

---

## 📊 SUCCESS METRICS (90 days)

- **50+ pages** by Day 30
- **100+ pages** by Day 60
- **200+ pages** by Day 90
- **0 orphans** (every page has 2+ inbound links)
- **0 broken links** (lint clean)
- **1 daily note per day** (consistency)
- **10+ cross-venture insights** (the magic)

---

## 🛠️ COMMANDS

```bash
# Lint (find issues)
node wiki-lint.cjs

# RAG
node wiki-rag.cjs index               # Build/rebuild index
node wiki-rag.cjs query "..."         # Search via embeddings
node wiki-rag.cjs stats               # Index stats

# Obsidian (desktop)
# Ctrl+P → command palette
# Ctrl+Shift+F → search
# Ctrl+G → open graph view
# Ctrl+D → daily note (with Calendar plugin)
```

---

## 🐛 TROUBLESHOOTING

| Problem | Fix |
|---------|-----|
| Ollama not running | `ollama serve` in separate terminal |
| nomic-embed-text not found | `ollama pull nomic-embed-text` |
| RAG index empty | `node wiki-rag.cjs index` |
| Lint errors | Read messages, fix missing frontmatter/links |
| Obsidian doesn't see wiki | "Open folder as vault" → select `H:\DevJourney\wiki\` |
| Wikilinks don't work | Use `[[page-name]]` syntax, no `.md` extension |
| Daily note not auto-creating | Install "Calendar" plugin, configure daily note folder |

---

## 📁 WHAT'S ALREADY IN THE WIKI

```
H:\DevJourney\wiki\
├── SCHEMA.md                 # This wiki's structure
├── index.md                  # Catalog of all pages
├── log.md                    # Append-only action log
│
├── daily/
│   └── 2026-06-07.md        # Today's note
│
├── raw/
│   ├── articles/             # (empty, fill as you ingest)
│   ├── papers/
│   ├── transcripts/
│   ├── quotes/
│   └── assets/
│
├── entities/                 # 8 pages
│   ├── person-andrej-karpathy.md
│   ├── person-satoshi-nakamoto.md
│   ├── person-vitalik-buterin.md
│   ├── person-naval-ravikant.md
│   ├── org-vercel.md
│   ├── org-supabase.md
│   ├── product-lightning-network.md
│   └── tool-obsidian.md
│   └── tool-ollama.md
│
├── concepts/                 # 6 pages
│   ├── concept-bitcoin-halving.md
│   ├── concept-dca-strategy.md
│   ├── concept-llm-wiki.md
│   ├── concept-react-patterns.md
│   ├── concept-shadow-clone-jutsu.md
│   └── concept-second-brain.md
│
├── comparisons/              # (empty, add as you compare things)
│
├── queries/                  # (empty, file substantial Q&A)
│
├── ventures/                 # 6 MOCs
│   ├── crypto.md
│   ├── code.md
│   ├── marjahans.md
│   ├── snaptrap.md
│   ├── build.md
│   └── philo.md
│
├── _meta/
│   ├── templates/            # daily, entity, concept, comparison
│   ├── MOCs/
│   │   └── MOC-ai.md
│   ├── archive/
│   └── rag-index.json        # Built by wiki-rag.cjs index
│
├── .obsidian/                # Obsidian config
│   ├── app.json
│   ├── note-suggestion-settings.json
│   └── plugins/obsidian-local-rag/
│
├── wiki-lint.cjs             # Health check
├── wiki-rag.cjs              # Local RAG
└── WIKI_SETUP_GUIDE.md       # This file
```

---

## 🎯 THE DAILY RITUAL (10 min/day)

### Morning (5 min)
1. Open Obsidian → daily note auto-loads
2. Review yesterday's notes
3. Set today's #1 priority

### Throughout (1 min, when something interesting happens)
1. Open daily note
2. Dump in the Inbox section (URL, idea, quote, link)

### Evening (5 min)
1. **Distill** today's inbox:
   - Read article → add `raw/articles/` + create/update wiki page
   - Idea → create new concept page
   - Person mentioned → create entity page
   - Two related things → add cross-link

### Weekly (30 min, Sunday)
1. Run `wiki-lint.cjs` → fix warnings
2. Read `index.md` → find gaps
3. Write one MOC update
4. Review daily notes → file loose ends

---

## 🚀 FIRST 3 DAYS PLAN

### Day 1: Setup (today, 30 min)
- [ ] Install Obsidian
- [ ] Install Ollama + pull models
- [ ] Run `wiki-rag.cjs index`
- [ ] Open vault in Obsidian
- [ ] Browse the 15 seed pages
- [ ] Add 1 daily note

### Day 2: Capture (15 min)
- [ ] Add 5 articles you read to `raw/articles/`
- [ ] For each: create or update 1 entity/concept page
- [ ] Run `wiki-lint.cjs`

### Day 3: Use it (5 min/day)
- [ ] Open daily note
- [ ] Use Obsidian search to find an old note
- [ ] Add 1 wikilink somewhere
- [ ] Run `wiki-rag.cjs query "your question"`

After 3 days, the habit is set. After 30 days, the compounding begins.

---

🐼 **Welcome to the second brain, Fahad.**

**Never GIVE UP on your HOPES.** — Knowledge compounds.
