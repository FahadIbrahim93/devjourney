---
name: ai_agent_builder
description: Build custom AI agents with tools, memory, routing logic. Production-ready.
version: 1.0.0
triggers:
  - "build an AI agent"
  - "custom chatbot"
  - "agent that can [action]"
  - "LLM with tools"
tags: [code, ai, agents, llm, tools]
---

# AI Agent Builder

## Purpose
Build production-ready AI agents with tool calling, memory, routing, and observability.

## Trigger Conditions
- New AI feature needed
- User asks "build a chatbot that can [action]"
- User wants an LLM with custom tools
- On-demand via `/ai_agent_builder <spec>`

## Required Inputs
- **Agent purpose** (what does it do?)
- **Tools available** (what can it use?)
- **Memory needs** (short-term, long-term, RAG?)
- **Routing** (single agent or multi-agent?)

## Steps

### 1. Define Agent Spec
```yaml
name: Customer Support Agent
purpose: Answer product questions, escalate complex issues
tools:
  - search_knowledge_base
  - lookup_order
  - create_ticket
  - escalate_to_human
memory:
  - short_term: conversation history
  - long_term: customer profile, past tickets
routing:
  - simple_question → direct answer
  - complex_issue → escalate
  - out_of_scope → human handoff
guardrails:
  - never promise refunds > $100
  - never share PII
  - always include ticket ID
```

### 2. Choose Framework
- **Python:** LangChain, LlamaIndex, DSPy, Pydantic AI
- **TypeScript:** Vercel AI SDK, LangChain.js
- **Custom:** Direct OpenAI/Anthropic API + function calling
- **Hermes-native:** Use delegate_task for sub-agents

### 3. Build System Prompt
- Role definition
- Available tools (with descriptions)
- Output format
- Examples (3-5 few-shot)
- Constraints / guardrails
- Tone / style guide

### 4. Implement Tools
```python
@tool
def search_knowledge_base(query: str) -> str:
    """Search the product knowledge base for relevant articles."""
    results = vector_db.search(query, top_k=3)
    return "\n\n".join([r.content for r in results])

@tool
def lookup_order(order_id: str) -> dict:
    """Look up order details by order ID."""
    order = db.orders.find(order_id)
    if not order:
        return {"error": "Order not found"}
    return order.to_dict()
```

### 5. Memory System
- **Short-term (in-conversation):** Messages array
- **Long-term (cross-session):** User profile, past interactions
- **RAG (knowledge):** Vector DB of documents
- **Episodic:** "Last time we discussed X, you said Y"

### 6. Routing Logic
```python
def route(user_message: str) -> Agent:
    intent = classify_intent(user_message)
    if intent == "billing":
        return BillingAgent()
    elif intent == "tech_support":
        return TechSupportAgent()
    elif intent == "out_of_scope":
        return EscalationAgent()
    else:
        return GeneralAgent()
```

### 7. Observability
- Log every tool call (input, output, duration)
- Track token usage
- Monitor success rate
- Flag hallucinations (output doesn't match tool results)
- A/B test prompts

### 8. Testing
- Unit tests for each tool
- Integration tests for tool chains
- Eval suite (50+ test cases)
- Hallucination checks
- Latency benchmarks

## Output Format

```markdown
🤖 **AI AGENT BUILT: [name]**

**Stack:**
- Python 3.11 + LangChain
- OpenAI GPT-4o
- Pinecone vector DB
- PostgreSQL for memory

**Tools (5):**
- search_knowledge_base
- lookup_order
- create_ticket
- escalate_to_human
- send_email

**Routing:**
- Simple question → direct answer (no tools)
- Complex → search + answer
- Order issue → lookup + answer
- Angry/sentiment negative → escalate

**Memory:**
- Short-term: Last 10 messages
- Long-term: Customer profile, past tickets
- RAG: 1,247 product docs indexed

**Tests:** 67 passing
**Eval score:** 89% (target 90%)

**Deployed:** https://api.example.com/agent

**Cost per conversation:** $0.04
**Avg latency:** 2.1s
```

## Example Invocation

User: "Build an agent that helps users find products in our catalog"
Assistant: [Builds agent with search, RAG, conversation memory]

## Verification
- [ ] System prompt is clear, specific
- [ ] Tools work in isolation
- [ ] Routing doesn't get stuck in loops
- [ ] Memory doesn't leak across users
- [ ] Guardrails are enforced
- [ ] Eval score > 85%
- [ ] Cost per conversation is reasonable

## Related Skills
- `vibe_scaffold` — Set up the project
- `api_orchestrator` — Add external API tools
- `ollama_deployer` — Use local model for privacy/cost
