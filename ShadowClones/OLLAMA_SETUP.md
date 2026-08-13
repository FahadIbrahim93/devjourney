# 🦙 OLLAMA SETUP GUIDE — Privacy Mode for Marjahans + Snaptrap

## WHY OLLAMA?

Your 2 customer-facing clones (marjahans_merchant + snaptrap_stylist) are configured to use **local Ollama** for **strict privacy**:
- Customer PII never leaves your machine
- Drop plans stay private
- Order data, supplier costs, pricing — all local
- $0 cost (vs $50-200/month on cloud)

**Models needed:** Llama 3.1 8B (general), Qwen 2.5 Coder 7B (code, optional)

---

## 🛠️ INSTALL OLLAMA

### Windows
```bash
# Download installer
curl -L https://ollama.com/download/windows -o ollama-installer.exe

# Run silently
./ollama-installer.exe /silent

# Or: just visit https://ollama.com and download
```

### macOS
```bash
brew install ollama
ollama serve
```

### Linux
```bash
curl -fsSL https://ollama.com/install.sh | sh
ollama serve
```

---

## 📥 PULL MODELS

```bash
# Primary model (4.7 GB, fits in 8 GB RAM)
ollama pull llama3.1:8b

# Code model (4.7 GB, for code-related tasks)
ollama pull qwen2.5-coder:7b

# Optional: Smaller faster (3.8 GB)
ollama pull mistral:7b

# Optional: Reasoning (5.2 GB)
ollama pull deepseek-r1:8b

# Optional: Embeddings (for RAG)
ollama pull nomic-embed-text
```

---

## ⚙️ CONFIGURE HERMES

For each privacy-mode profile (marjahans_merchant, snaptrap_stylist):

```bash
# Switch to profile
hermes profile use marjahans_merchant

# Set model
hermes config set model.default ollama/llama3.1:8b
hermes config set model.base_url http://localhost:11434/v1

# Verify
hermes chat -q "Test connection"
```

---

## 🧪 TEST

```bash
# Quick test
ollama run llama3.1:8b "What is 2+2?"
# Should respond: 4

# Test from Python
python -c "
from openai import OpenAI
client = OpenAI(base_url='http://localhost:11434/v1', api_key='ollama')
r = client.chat.completions.create(
    model='llama3.1:8b',
    messages=[{'role': 'user', 'content': 'Hello in 1 sentence'}]
)
print(r.choices[0].message.content)
"
```

---

## 🚀 START OLLAMA ON BOOT (Windows)

Create a scheduled task or add to startup:
1. Press Win+R, type `shell:startup`
2. Create shortcut to: `C:\Users\fhdib\AppData\Local\Programs\Ollama\ollama.exe serve`
3. Save in startup folder

Ollama will now start on boot.

---

## 📊 PERFORMANCE

| Model | RAM | Latency (CPU) | Latency (GPU) | Quality |
|-------|-----|---------------|---------------|---------|
| llama3.1:8b | 5 GB | 30-50 tok/s | 100+ tok/s | ⭐⭐⭐⭐ |
| qwen2.5-coder:7b | 5 GB | 30-50 tok/s | 100+ tok/s | ⭐⭐⭐⭐⭐ (code) |
| mistral:7b | 4 GB | 50-70 tok/s | 150+ tok/s | ⭐⭐⭐ |
| deepseek-r1:8b | 5 GB | 20-40 tok/s | 80+ tok/s | ⭐⭐⭐⭐⭐ (reasoning) |

**Your hardware (RTX 3070 Ti, 20GB RAM):** Can run any of these with GPU acceleration.

---

## 🐛 TROUBLESHOOTING

| Issue | Fix |
|-------|-----|
| `Connection refused` on :11434 | `ollama serve` not running |
| Model loads slowly | First pull is large; subsequent loads are fast |
| Out of memory | Use smaller model (mistral:7b) or close other apps |
| Slow inference | Enable GPU: `OLLAMA_NUM_GPU=999 ollama serve` |
| Port conflict | Check `OLLAMA_HOST` env var |

---

## 💰 COST COMPARISON

| Provider | Model | 1M tokens |
|----------|-------|-----------|
| OpenAI | GPT-4o | $10 |
| Anthropic | Claude 3.5 | $15 |
| xAI | Grok 2 | $15 |
| **Ollama (local)** | **llama3.1:8b** | **$0** |

**Break-even:** If you process > 5M tokens/month for customer data, Ollama is cheaper.

---

## 📋 VERIFICATION CHECKLIST

- [ ] Ollama installed
- [ ] Ollama service running
- [ ] llama3.1:8b pulled
- [ ] marjahans_merchant uses ollama/llama3.1:8b
- [ ] snaptrap_stylist uses ollama/llama3.1:8b
- [ ] Test connection works
- [ ] No customer data sent to cloud (verify with Wireshark or logs)

---

📁 **This file:** `H:\DevJourney\ShadowClones\OLLAMA_SETUP.md`
🛠 **Helper script:** `H:\DevJourney\ShadowClones\setup_ollama.sh`
🛠 **Helper script:** `H:\DevJourney\ShadowClones\setup_ollama.bat`
