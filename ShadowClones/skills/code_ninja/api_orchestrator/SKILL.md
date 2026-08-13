---
name: api_orchestrator
description: Connect multiple APIs with error handling, retries, rate limits, monitoring.
version: 1.0.0
triggers:
  - "integrate [api]"
  - "connect to [service]"
  - "build api client"
  - "multiple APIs"
tags: [code, api, integration, orchestration]
---

# API Orchestrator

## Purpose
Build robust, production-ready API client code with proper error handling, retries, rate limits, and monitoring.

## Trigger Conditions
- New API integration needed
- User asks "connect to [service]"
- Multiple APIs need coordination
- On-demand via `/api_orchestrator <api_list>`

## Required Inputs
- **APIs to integrate** (name, purpose)
- **Auth method** (API key, OAuth, JWT)
- **Data flow** (sequential, parallel, event-driven)

## Steps

### 1. Map API Requirements
- Base URL, version
- Auth headers / OAuth flow
- Rate limits (req/min, req/day)
- Webhook support (if applicable)
- SDK availability (use SDK if it exists, else raw fetch/httpx)

### 2. Build API Client (Per API)
```typescript
class ApiClient {
  constructor(private config: ApiConfig) {}
  
  async request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    return this.withRetry(async () => {
      const response = await fetch(`${this.config.baseUrl}${endpoint}`, {
        ...options,
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });
      
      if (!response.ok) {
        throw new ApiError(response.status, await response.text());
      }
      
      return response.json();
    });
  }
  
  private async withRetry<T>(fn: () => Promise<T>, maxRetries = 3): Promise<T> {
    for (let i = 0; i < maxRetries; i++) {
      try {
        return await fn();
      } catch (err) {
        if (i === maxRetries - 1) throw err;
        if (err instanceof ApiError && err.status >= 500) {
          await this.sleep(2 ** i * 1000);  // Exponential backoff
          continue;
        }
        throw err;
      }
    }
    throw new Error('Unreachable');
  }
}
```

### 3. Handle Rate Limits
- Token bucket algorithm
- Queue requests if approaching limit
- Honor `Retry-After` header
- Surface 429 to caller with wait time

### 4. Error Handling
- **4xx:** Don't retry (client error)
- **5xx:** Retry with backoff
- **Network errors:** Retry up to 3 times
- **Timeouts:** 30s default, configurable
- **All errors logged with context**

### 5. Orchestration Patterns
- **Sequential:** A → B → C (when B needs A's output)
- **Parallel:** A, B, C simultaneously (Promise.all)
- **Race:** First to respond wins
- **Fallback:** If A fails, try B
- **Circuit breaker:** Stop calling A if it fails N times

### 6. Logging + Monitoring
- Log every request (endpoint, status, duration)
- Track error rate per API
- Alert if error rate > 5%
- Dashboard: p50/p95/p99 latency per API

### 7. Testing
- Unit tests with mocked responses
- Integration tests with sandbox APIs
- Contract tests (verify response shape)
- Load tests (1K req/sec for 1 min)

## Output Format

```markdown
🔌 **API ORCHESTRATION: [name]**

**APIs integrated:**
1. Stripe (payments)
2. SendGrid (email)
3. Twilio (SMS)
4. PostHog (analytics)

**Files created:**
- `src/lib/api/stripe.ts` (245 lines)
- `src/lib/api/sendgrid.ts` (98 lines)
- `src/lib/api/twilio.ts` (87 lines)
- `src/lib/api/posthog.ts` (65 lines)
- `src/lib/orchestrator.ts` (180 lines)
- `src/lib/api/__tests__/` (4 test files)

**Features:**
- ✅ Retry with exponential backoff (3 attempts)
- ✅ Rate limiting (token bucket per API)
- ✅ Circuit breaker (open after 5 failures in 1 min)
- ✅ Logging (p50/p95/p99 latency per endpoint)
- ✅ Error context (request ID, user ID, timestamp)
- ✅ Graceful degradation (Twilio down → log + email fallback)

**Tests:** 24 passing (mocked + integration)
**Coverage:** 87%
```

## Example Invocation

User: "Integrate Stripe + Resend for SaaS billing"
Assistant: [Builds clients, adds orchestration, tests]

## Verification
- [ ] All happy paths work
- [ ] All error paths handled
- [ ] Rate limits respected
- [ ] Retries don't cause infinite loops
- [ ] Logs are structured (JSON)
- [ ] Tests cover edge cases

## Related Skills
- `vibe_scaffold` — Set up the project first
- `automation_script` — Schedule API calls
- `ai_agent_builder` — Use APIs as agent tools
