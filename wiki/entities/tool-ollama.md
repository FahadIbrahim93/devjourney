---
title: Ollama
created: 2026-06-07
updated: 2026-06-07
type: entity
tags: [tool, tech, ai, code]
sources: []
confidence: high
---

# Ollama

> Run open-source LLMs locally on your machine. $0, private, offline-capable. Foundation of our privacy-tier clones.

## What It Does
- **One-command model install:** `ollama pull llama3.1:8b`
- **REST API** at `localhost:11434`
- **Embeddings** for RAG (`nomic-embed-text`)
- **Models:** Llama, Mistral, Qwen, Phi, Gemma, CodeLlama, and more

## Why It's the Future
- **Privacy** — data never leaves your machine
- **Cost** — $0 vs $200/mo for cloud
- **Offline** — works on planes, rural, anywhere
- **Customizable** — fine-tune, system prompts, temperature

## Models We Use
- **llama3.1:8b** — general purpose (4.7GB)
- **qwen2.5-coder:7b** — code (4.7GB)
- **nomic-embed-text** — embeddings (274MB)
- **mistral:7b** — fast, smaller

## Hardware
- **Min:** 8GB RAM, 5GB disk
- **Rec:** 16GB+ RAM, GPU
- **Our setup:** RTX 3070 Ti + 20GB RAM

## Used By
- [[marjahans-merchant|Marjahans clone]] (privacy)
- [[snaptrap-stylist|SnapTrap clone]] (privacy)
- [[code-ninja|Code Ninja]] (internal tools)
- This wiki's RAG ([[tool-obsidian]] + Ollama embeddings)

## Related
- [[tool-obsidian]]
- [[concept-local-llm]]
- [[concept-llm-wiki]]
