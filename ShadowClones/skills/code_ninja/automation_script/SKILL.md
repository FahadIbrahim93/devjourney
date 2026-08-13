---
name: automation_script
description: Write bots, scrapers, schedulers. For repetitive tasks, data collection, monitoring.
version: 1.0.0
triggers:
  - "automate this"
  - "write a scraper"
  - "bot that [action]"
  - "scheduled task"
tags: [code, automation, scraper, bot, scheduler]
---

# Automation Script

## Purpose
Write production-ready automation scripts (bots, scrapers, schedulers, monitors) for repetitive tasks.

## Trigger Conditions
- Repetitive task identified
- User asks "automate this"
- Data collection needed
- On-demand via `/automation_script <task>`

## Required Inputs
- **Task description** (what should be automated?)
- **Trigger** (manual, schedule, event, webhook)
- **Output destination** (file, DB, email, Slack, Telegram)

## Steps

### 1. Analyze Task
- What input is needed?
- What output is produced?
- What can fail? (network, auth, rate limits, schema changes)
- How often does it run?
- What's the blast radius if it breaks?

### 2. Choose Stack
- **Quick script (< 100 lines):** Python or Node
- **Production cron:** Python + cron, or GitHub Actions, or serverless
- **Data scraping:** Python (BeautifulSoup, Playwright, Scrapy)
- **Browser automation:** Playwright, Puppeteer
- **API monitoring:** Custom script + healthchecks.io
- **Notifications:** Telegram bot, Discord webhook, email

### 3. Implement Script
```python
#!/usr/bin/env python3
"""
[Task name] — [Brief description]
Schedule: [cron expression]
Author: Fahad Ibrahim @hopetheory__
"""

import os
import sys
import logging
from datetime import datetime
from dotenv import load_dotenv

load_dotenv()
logging.basicConfig(level=logging.INFO, format='%(asctime)s [%(levelname)s] %(message)s')
log = logging.getLogger(__name__)


def main():
    log.info("Starting [task name]")
    try:
        # 1. Setup
        validate_env()
        
        # 2. Fetch data
        data = fetch_data()
        
        # 3. Process
        result = process(data)
        
        # 4. Output
        save_or_send(result)
        
        log.info("✅ [Task name] complete")
    except Exception as e:
        log.error(f"❌ [Task name] failed: {e}", exc_info=True)
        send_alert(f"[Task name] FAILED: {e}")
        sys.exit(1)


def validate_env():
    required = ["API_KEY", "DATABASE_URL"]
    for var in required:
        if not os.getenv(var):
            raise ValueError(f"Missing env var: {var}")


def fetch_data():
    # Implementation
    pass


def process(data):
    # Implementation
    pass


def save_or_send(result):
    # Implementation
    pass


def send_alert(message):
    """Send Telegram alert on failure."""
    import requests
    bot_token = os.getenv("TELEGRAM_BOT_TOKEN")
    chat_id = os.getenv("TELEGRAM_CHAT_ID")
    if bot_token and chat_id:
        requests.post(
            f"https://api.telegram.org/bot{bot_token}/sendMessage",
            json={"chat_id": chat_id, "text": message}
        )


if __name__ == "__main__":
    main()
```

### 4. Add Safeguards
- **Idempotency:** Running twice = same result
- **Dry-run mode:** Test without side effects (`--dry-run` flag)
- **Logging:** Structured, with timestamps
- **Alerts:** Notify on failure (Telegram, Slack, email)
- **Retries:** With backoff for transient errors
- **Rate limit handling:** Honor API limits

### 5. Schedule It
- **Cron:** `0 9 * * * /path/to/script.py` (in crontab)
- **GitHub Actions:** `.github/workflows/daily.yml`
- **Serverless:** AWS Lambda + EventBridge
- **Hermes cron:** `hermes cron create "0 9 * * *" "Run /path/to/script.py"`

### 6. Monitor
- Health check (last successful run timestamp)
- Error rate dashboard
- Output verification (did the right thing happen?)
- Cost monitoring (if cloud functions)

### 7. Document
- README with setup steps
- Cron expression in plain English
- What it does, what it doesn't
- How to test locally
- How to disable / pause

## Output Format

```markdown
🤖 **AUTOMATION: [task name]**

**Schedule:** Daily 9 AM BST
**Stack:** Python 3.11 + cron
**Runtime:** ~30 seconds
**Cost:** $0 (runs locally)

**Files:**
- `scripts/[name].py` (185 lines)
- `scripts/[name].test.py` (42 lines)
- `.env.example` (3 vars)
- `README.md`

**Features:**
- ✅ Idempotent (safe to re-run)
- ✅ Dry-run mode (`--dry-run`)
- ✅ Telegram alerts on failure
- ✅ Structured logging
- ✅ Retries with backoff

**Tests:** 12 passing
**Last 30 days:** 30 runs, 0 failures
```

## Example Invocation

User: "Automate: scrape top crypto news daily at 9 AM and email me a digest"
Assistant: [Builds scraper, schedules, tests]

## Verification
- [ ] Script works locally
- [ ] Schedule is correct
- [ ] Alerts fire on failure
- [ ] Idempotent (re-runs are safe)
- [ ] Logs are readable
- [ ] No hardcoded secrets

## Related Skills
- `api_orchestrator` — For complex API calls
- `vibe_scaffold` — Set up the project structure
- `ai_agent_builder` — If task requires LLM intelligence
