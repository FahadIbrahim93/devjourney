---
name: ollama_deployer
description: Deploy local LLMs (Llama, Mistral, Qwen) for privacy, cost savings, offline use.
version: 1.0.0
triggers:
  - "deploy local model"
  - "use Ollama"
  - "private LLM"
  - "self-hosted model"
tags: [code, ollama, local-llm, privacy, self-hosted]
---

# Ollama Deployer

## Purpose
Deploy local LLMs via Ollama for privacy-sensitive tasks, cost reduction, or offline operation.

## Trigger Conditions
- Privacy-sensitive task (customer data, financials)
- User asks "use a local model"
- Cost optimization needed
- Offline / air-gapped environment
- On-demand via `/ollama_deployer <model>`

## Required Inputs
- **Use case** (what will the model do?)
- **Privacy level** (strict, moderate, none)
- **Hardware specs** (RAM, GPU, disk)
- **Performance requirements** (latency, throughput)

## Steps

### 1. Verify Hardware
```bash
# Check available RAM
free -h  # Linux
vm_stat  # Mac

# Check GPU
nvidia-smi  # NVIDIA
rocm-smi   # AMD

# Check disk
df -h
```

**Model size requirements:**
- 7B (Q4): ~4-5 GB RAM, 4 GB VRAM (GPU)
- 13B (Q4): ~8-10 GB RAM, 8 GB VRAM
- 70B (Q4): ~40-50 GB RAM, 40+ GB VRAM

### 2. Install Ollama
```bash
# Linux
curl -fsSL https://ollama.com/install.sh | sh

# Mac
brew install ollama

# Windows
# Download from ollama.com
```

### 3. Start Ollama Service
```bash
# Linux (systemd)
sudo systemctl enable ollama
sudo systemctl start ollama

# Mac
ollama serve  # In background

# Or just start when needed
ollama serve
```

### 4. Pull Model
```bash
# Choose based on hardware
ollama pull llama3.1:8b           # 4.7 GB, good for 16GB RAM
ollama pull qwen2.5-coder:7b       # 4.7 GB, best for code
ollama pull mistral:7b             # 4.1 GB, fast
ollama pull llama3.1:70b           # 40 GB, best quality (needs 64GB RAM)
ollama pull deepseek-r1:8b         # 5.2 GB, reasoning
ollama pull nomic-embed-text       # Embeddings for RAG
```

### 5. Test Model
```bash
ollama run llama3.1:8b "What is 2+2?"
# Should respond: "4"
```

### 6. Use via API (OpenAI-compatible)
```python
from openai import OpenAI

client = OpenAI(
    base_url="http://localhost:11434/v1",
    api_key="ollama"  # Dummy, not validated
)

response = client.chat.completions.create(
    model="llama3.1:8b",
    messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "Explain quantum computing in 1 paragraph."}
    ]
)

print(response.choices[0].message.content)
```

### 7. Use in Hermes
```bash
# Switch to a profile
hermes profile use marjahans_merchant

# Configure model
hermes config set model.default ollama/llama3.1:8b
hermes config set model.base_url http://localhost:11434/v1

# Test
hermes chat -q "Test connection"
```

### 8. Model Selection Guide
| Use Case | Model | Why |
|----------|-------|-----|
| Customer service | llama3.1:8b | Balanced, good instruction following |
| Code generation | qwen2.5-coder:7b | Best code model in size class |
| Long-form content | mistral:7b | Fast, good prose |
| Reasoning | deepseek-r1:8b | Step-by-step thinking |
| Embeddings | nomic-embed-text | Best small embedder |
| Multilingual | qwen2.5:7b | Excellent non-English |
| Vision | llava:13b | Image understanding |

### 9. Performance Optimization
- **GPU offloading:** If you have a GPU, Ollama auto-uses it
- **Quantization:** Q4 (default) balances quality/size
- **Context length:** Default 2K, can extend to 32K
- **Batch size:** Adjust in Modelfile
- **Keep model warm:** Send a heartbeat every 5 min

### 10. Cost Comparison
| Provider | Model | Cost / 1M tokens |
|----------|-------|------------------|
| OpenAI | GPT-4o | $2.50 / $10.00 |
| Anthropic | Claude 3.5 Sonnet | $3.00 / $15.00 |
| xAI | Grok 2 | $5.00 / $15.00 |
| Google | Gemini Flash | $0.075 / $0.30 |
| **Ollama (local)** | Llama 3.1 8B | **$0.00** |

**Break-even:** If you process > 5M tokens/month, Ollama is cheaper than cloud (after hardware).

## Output Format

```markdown
🦙 **OLLAMA DEPLOYED: [model]**

**Hardware:**
- RAM: 32 GB (model uses 5 GB)
- GPU: RTX 3070 Ti 8 GB (offload enabled)
- Disk: 1.2 GB model file

**Model:** llama3.1:8b (Q4_K_M quantization)
**Context:** 32,768 tokens
**Latency:** ~50 tokens/sec (GPU) / ~10 tokens/sec (CPU)

**Tests:**
- ✅ Basic Q&A
- ✅ Long context
- ✅ Code generation
- ✅ JSON output

**Integrated with:**
- ✅ Hermes (via base_url config)
- ✅ OpenAI Python SDK
- ✅ LangChain
- ✅ LlamaIndex

**Privacy:** 🟢 STRICT
- All inference on this machine
- Zero data sent to cloud
- No telemetry

**Cost:** $0/month (vs ~$200/month for equivalent cloud usage)

**Next steps:**
1. Use for Marjahans + Snaptrap customer data tasks
2. Set up second model for code (qwen2.5-coder)
3. Configure auto-scaling (if load increases)
```

## Example Invocation

User: "Set up local Llama for my privacy-sensitive workflows"
Assistant: [Installs Ollama, pulls model, configures, tests]

## Verification
- [ ] Model loads without error
- [ ] Inference produces correct output
- [ ] Hermes profile uses it correctly
- [ ] Privacy is enforced (no cloud calls)
- [ ] Latency acceptable for use case
- [ ] Cost is zero (or near-zero)

## Related Skills
- `vibe_scaffold` — Set up project that uses local model
- `ai_agent_builder` — Build agents that use local models
- `api_orchestrator` — For hybrid local+cloud setups
