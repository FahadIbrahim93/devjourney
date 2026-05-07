# AI Accountability Systems Research
## Making AI Agents Push Back, Enforce Deadlines, and Hold You Accountable

Research conducted: May 8, 2026
Workspace: /mnt/h/DevJourney

---

## EXECUTIVE SUMMARY

The core problem: Most AI assistants are too compliant. They do exactly what you ask, even when you shouldn't be doing it. This research covers systems where AI actively pushes back, tracks habits, enforces deadlines, and holds you accountable.

---

## 1. CHIEF OF STAFF AI PATTERN

### What It Is
An AI agent that manages your tasks, calendar, and context — but crucially, **says no to scope creep and distractions**. Not a passive assistant but an active manager of your time and priorities.

### Key Implementation: Cursor Chief of Staff

**Repository:** https://github.com/pauloribeiro92/cursor-chief-of-staff

**Architecture:**
- Persistent memory across sessions (3 layers: L1 working, L2 active, L3 permanent)
- Task management with inbox/today/active/backlog structure
- Automated Slack briefings at 07:00
- Self-improvement loop that learns from interactions

**Pushback Mechanisms:**
- `/store` command classifies and saves tasks — the AI decides where they go
- `/review` command runs EOD review and plans tomorrow
- Memory cleanup scripts run daily and archive stale items
- AI prompts to fill in missing context before doing work

**Setup Steps:**
```bash
# Clone the template
git clone https://github.com/YOUR_USERNAME/cursor-chief-of-staff.git
cd cursor-chief-of-staff

# Fill in your context
# Option A: Let AI walk you through it
# Just say "Help me set up my personal assistant context"

# Option B: Run bootstrap script
bash scripts/setup.sh

# Configure .env with your services
cp scripts/config.example.env .env
# Edit .env with SLACK_WEBHOOK_URL and other settings

# Schedule automated reports
bash scripts/setup_cron.sh
```

**MCP Integrations Available:**
- Slack (daily briefings)
- Notion (meeting notes, wiki)
- Google Workspace (Calendar, Gmail, Sheets)
- Jira/Atlassian
- GitHub

### Alternative: Majordomo

**Repository:** https://github.com/purroy/majordomo
- Self-hosted personal assistant for Claude Code
- Mail, calendar, Slack, scheduled briefings
- More minimal than Chief of Staff

### Alternative: Proactive Assistant

**Repository:** https://github.com/kaxixi/proactive-assistant
- Calendar digests via Telegram
- Email monitoring
- Built with Claude
- Claims "set up in 10 minutes with Claude Code"

---

## 2. AI DAILY STANDUP/CHECK-IN BOTS

### Telegram-Based Solutions

**Life-Desk** (https://github.com/KoPyae2/Life-Desk)
- Serverless Telegram bot
- Cloudflare Workers + Convex backend
- Tracks: notes, todos, habits, expenses, reflections
- Lightweight, fast, daily use focused

**tg-bot-iskra** (https://github.com/stick231/tg-bot-iskra)
- Self-hosted task management bot
- Create tasks, set reminders, track progress
- No third-party services required

**TaskFlow** (https://github.com/Zokinho/taskflow)
- Multi-calendar sync
- Telegram bot + web dashboard
- Express + React + PostgreSQL
- Self-hosted

**Productivity Assistant** (https://github.com/dylanhavelaerts/productivity-assistant)
- Telegram bot for task management
- Pomodoro tracking
- Notion backend + PostgreSQL
- Personal web dashboard

### Slack Bots

The Cursor Chief of Staff includes a `daily_report.py` script that sends morning briefings to Slack:
```python
# Automated 08:00 weekday briefing
# Reads today.md, active.md, reminders, meetings
# Formats as structured Slack message
```

**To build a custom Slack standup bot:**
1. Create Slack app with Bot Token
2. Set up scheduled messages via Slack Workflow or cron
3. Have AI generate structured standup format:
   - Yesterday: What did you complete?
   - Today: What will you work on?
   - Blockers: Any impediments?
   - Learnings: What did you discover?

### Discord Integration

No dedicated Discord standup bots found in open-source. However, you can:
1. Use Discord webhooks with scheduled cron jobs
2. Integrate with the Telegram bots above via bridge
3. Build custom with Discord.js + OpenAI API

---

## 3. AI ACCOUNTABILITY PARTNERS

### The Pattern

An AI that:
1. Asks "What are you working on today?"
2. Checks in periodically
3. Asks for evidence of progress
4. Escalates missed commitments
5. Tracks patterns over time

### Mind Tracker Bot (https://github.com/noireveil/mind-tracker-bot-go)

- Self-hosted Telegram bot
- Daily journaling with mental health support
- Gemini AI for empathetic, context-aware responses
- Personal progress tracking

### SelfOS (https://github.com/seam-sikder-nahid/SelfOS)

- Personal productivity system
- Track daily actions, measure progress
- Compare improvement over time
- Goal completion tracking
- Built for "discipline and self-improvement"

### APEX Dashboard (https://github.com/enjoyingthegrind-afk/APEX)

- Premium habit tracking system
- Health, sleep, calories tracking
- Streak systems
- Designed for accountability

### Building Your Own

Core prompt structure for an accountability AI:

```
You are my accountability partner. Your job is NOT to be helpful — it's to hold me accountable.

Rules:
1. Every morning at 9am, ask: "What are your top 3 priorities today?"
2. At 2pm, check in: "Show me evidence of progress on your priorities."
3. At 6pm, review: "What did you complete today? What slipped?"
4. If I miss a commitment, ask: "Why didn't this happen? What's the barrier?"
5. Never let me off the hook. Be direct but fair.
6. Track patterns — if I consistently miss goals, flag it.

Current commitments: [loaded from task file]
Today's date: [from system]
```

---

## 4. AI SAYS "NO" TO SCOPE CREEP

### The Chief of Staff Approach

The key insight from the Cursor Chief of Staff: **AI should classify and redirect, not just accept.**

Instead of:
```
User: "Add this task"
AI: "Done, added to your list"
```

Try:
```
User: "Add this task"
AI: "I've classified this as a backlog item. To add to today, I need:
     1. Time estimate (under 2 hours?)
     2. Which existing task does this replace?
     3. Why is this P0?"
```

### Implementation Pattern

In your AI assistant rules, add:

```
Before adding ANY task to today.md:
- Ask for time estimate
- Ask about dependencies
- Ask which task this displaces
- If user says "just add it" — push back once more

Before starting ANY new task:
- Confirm it matches current sprint/goal
- Ask for success criteria
- Ask how you'll know it's done
```

### Scope Creep Detection Prompts

```
If user asks to add something that:
- Doesn't match their stated OKRs
- Would exceed their available time
- Is outside their current focus area

Say: "This doesn't align with [stated goal]. Are you sure? If yes, which existing priority does it replace?"
```

---

## 5. HABIT TRACKING BOTS WITH STREAK SYSTEMS

### Life-Desk (Telegram-based)

```markdown
Commands:
/habit add [name]    - Add new habit to track
/habit check [name]  - Mark as done today
/habit streak [name] - View current streak
/habit list          - Show all habits with streaks
```

### APEX Dashboard

- Visual streak display
- Penalty for missed days
- Progress over time graphs
- Health metrics integration

### Building Custom Streak System

```python
# Core streak logic
def check_streak(habits_log, habit_name):
    dates = [entry['date'] for entry in habits_log if entry['habit'] == habit_name]
    dates.sort(reverse=True)
    
    streak = 0
    today = datetime.date.today()
    
    for i, d in enumerate(dates):
        expected = today - datetime.timedelta(days=i)
        if d == expected:
            streak += 1
        else:
            break
    
    return streak
```

### Telegram Bot Habit Reminders

```python
# Daily habit check-in at 9am
async def morning_check_in(bot, user_id):
    habits = get_user_habits(user_id)
    message = "Good morning! Your habits today:\n\n"
    for h in habits:
        streak = check_streak(get_habits_log(user_id), h.name)
        message += f"/{h.slug} - {streak} day streak\n"
    await bot.send_message(user_id, message)
```

---

## 6. INDIE HACKER AI ACCOUNTABILITY: LEVELS.IO, MARC LOU

### What They Do

Based on public information about Levels.io and similar indie hackers:

1. **Strict daily standups** — Public or private report every morning
2. **Revenue dashboards** — Numbers visible to force action
3. **Deadline enforcement** — AI or accountability partners with real stakes
4. **Weekly reviews** — Hard look at what worked/what didn't

### The "Cadence" System

While I couldn't find a specific "Cadence" app, the pattern used by indie hackers:

```
Daily (09:00): 
- Post: What I shipped yesterday
- Post: What I'm shipping today
- Post: Current revenue/metric

Daily (17:00):
- Review: Did I ship what I said?
- Update: Revenue/metris

Weekly (Friday):
- Retro: What went well?
- Retro: What slowed me down?
- Plan: Next week priorities

Monthly:
- Big picture review
- OKR check-in
- Stake adjustment
```

### Implementation Tools Used

- Notion for public dashboards
- Telegram bots for reminders
- GitHub for public commit accountability
- Custom scripts for revenue tracking

---

## 7. SELF-HOSTED/FREE ALTERNATIVES

### Self-Hosted AI Assistants

**Khoj AI** (https://github.com/khoj-ai/khoj)
- Self-hostable AI second brain
- Web search + document search
- Custom agents and automations
- Works with gpt, claude, gemini, llama, qwen, mistral
- Free self-hosted option

**KovalskyAI** (https://github.com/dowriefo/KovalskyAI)
- Self-hosted universal AI chat
- CPU and GPU support
- Privacy-first, offline capable
- Local LLM support

**Agent Player** (https://github.com/9mtm/Agent-Player)
- Open-source AI desktop assistant
- Run local or remote LLMs
- Zero setup required
- Privacy-first design

### Self-Hosted Productivity Stack

| Purpose | Self-Hosted Option | Notes |
|---------|-------------------|-------|
| Task Management | Todo.txt + AI | Simple, text-based |
| Calendar | Cal.com self-hosted | Full features |
| Notes | AppFlowy, AFFiNiTY | Notion alternatives |
| Habits | Habitica (self-hostable) | Gamified streaks |
| Daily Standup | Custom Telegram bot | + OpenAI API |
| Time Tracking | self-hosted Kimai | Full invoice features |

### Free AI Services for Accountability

- **Claude.ai** - Free tier available, use with prompt engineering
- **ChatGPT** - Free tier for simple check-ins
- **Ollama** - Run models locally for free
- **Khoj** - Self-hosted, free, connects to various LLMs

### Minimal Stack Recommendation

```
Weekend setup cost: $0-10/month
- VPS: $5-10/month (DigitalOcean, Hetzner)
- Khoj AI: Free (self-hosted)
- Telegram Bot: Free
- Cron jobs: Free (system scheduler)

Total: ~$5-10/month for full accountability system
```

---

## 8. THE CADENCE SYSTEM (Practical Implementation)

### Daily Ritual System

```
06:00 - Wake up
06:15 - AI morning briefing (script runs)
       - Reads today.md
       - Shows calendar
       - Highlights priorities
       - Sends to Telegram

09:00 - Daily standup (AI asks)
       - What are top 3 priorities?
       - Any blockers?

12:00 - Midday check (automated)
       - Did you complete morning tasks?
       - Any scope changes?

17:00 - EOD review (AI prompts)
       - What did you complete?
       - What slipped?
       - Tomorrow's plan?

21:00 - Evening shutdown
       - Archive today.md
       - Create tomorrow.md
       - AI sends summary
```

### Implementation Scripts

**Morning briefing (daily_report.py pattern):**
```python
import asyncio
from datetime import datetime

async def morning_briefing(user_id):
    today = datetime.now().strftime('%Y-%m-%d')
    
    # Read today's tasks
    tasks = read_markdown_file(f'tasks/{today}.md')
    
    # Generate briefing with AI
    briefing = await ai_generate(f"""
    Morning briefing for {today}
    
    Today's tasks:
    {tasks}
    
    Format as:
    1. Top 3 priorities
    2. Calendar items
    3. Any overdue items from yesterday
    4. Motivational prompt
    """)
    
    await telegram.send(user_id, briefing)
```

**Evening review:**
```python
async def evening_review(user_id):
    review_questions = """
    EOD Review:
    
    1. What did you complete today?
    2. What didn't get done? Why?
    3. What's one thing to improve tomorrow?
    4. Log any learnings or decisions.
    """
    await telegram.send(user_id, review_questions)
    
    # Wait for response, then archive
    response = await telegram.wait_for_response(user_id)
    await archive_day(user_id, response)
```

---

## 9. BROWSER-BASED FOCUS ENFORCEMENT

### SahurLock (Face Tracking Focus Lock)

**Repository:** https://github.com/MohammedAlkindi/SahurLock

**Features:**
- Browser-based focus enforcement
- Webcam face tracking to monitor attention
- Detects off-screen behavior
- Fullscreen lock-in intervention
- Optional media blocking
- Privacy-first, client-side only
- Built with Next.js

**How it works:**
1. User starts focus session
2. Webcam monitors if face is looking at screen
3. If user looks away for X seconds, intervention triggers
4. Fullscreen lock or warning message
5. Configurable discipline logic

### TabWarden (Browser Extension)

**Repository:** https://github.com/Oshomah26/TabWarden

**Features:**
- Block distracting websites
- Adult site blocking
- Daily time limits on specific sites
- Local browsing analytics
- Manifest V3 compatible

### Allowlist (Chrome Extension)

**Repository:** https://github.com/ruthzu/Allowlist

**Features:**
- Block non-whitelisted sites during focus
- Distraction-free browsing
- Manifest V3 declarativeNetRequest
- Simple, focused

### Focus Enforcement Stack

```
For maximum accountability:

1. Browser: Use separate browser for work
   - Chrome with Allowlist extension
   - Only work sites whitelisted

2. OS Level: SelfControl (Mac) / ColdTurkey (Windows)
   - Cannot be bypassed without restart
   - Blocks entire categories of sites

3. Webcam: SahurLock for face tracking
   - Ensures you're actually looking

4. AI Check-in: Periodic screenshots or check-ins
   - Telegram bot asks for progress updates
   - Must respond within X minutes
```

---

## 10. BUILDING A DAILY RITUAL SYSTEM

### The Five Pillars

1. **Morning Briefing** — AI prepares your day
2. **Priority Confirmation** — You commit to top 3
3. **Midday Pulse** — Quick status check
4. **Evening Review** — What worked/what didn't
5. **Weekly Retro** — Big picture adjustment

### Implementation Guide

**Step 1: Choose Your Stack**
```
Minimum viable:
- Telegram bot (free)
- Claude API or Khoj AI (free tier)
- Cron jobs (system scheduler)

Full system:
- Telegram bot + OpenAI/Claude API
- Notion or local markdown files
- Self-hosted Khoj for memory
- Browser extensions for focus
```

**Step 2: Create Task Structure**
```
tasks/
├── inbox.md      # Quick capture
├── today.md      # Max 7 items, ranked
├── active.md     # Multi-day projects
├── backlog.md    # Future work
└── completed/    # Archive
```

**Step 3: Set Up Morning Briefing**
```python
# cron: 0 9 * * 1-5
async def morning():
    await generate_briefing()
    await send_telegram(message)
    await wait_for_response("What are your 3 priorities?")
```

**Step 4: Set Up Evening Review**
```python
# cron: 0 18 * * 1-5
async def evening():
    await send_telegram("EOD Review: What did you complete?")
    await wait_for_response()
    await archive_day()
```

**Step 5: Add Pushback Logic**
```
System prompt additions:

"If user tries to add task to today without:
- Time estimate under 2 hours
- Clear success criteria  
- Confirmed alignment with stated goals

Say: 'This is backlog material unless you can confirm it fits within today's capacity and aligns with your current focus. Which existing task does it replace?'"
```

### Complete Daily Ritual Script

```python
#!/usr/bin/env python3
"""Daily ritual enforcement bot"""

from datetime import datetime, timedelta
import asyncio
import os

class AccountabilityBot:
    def __init__(self, telegram_token, openai_key):
        self.telegram = TelegramClient(telegram_token)
        self.openai = OpenAIClient(openai_key)
        self.users = self.load_users()
    
    async def morning_briefing(self, user_id):
        """9am: Prepare day, get commitments"""
        tasks = self.get_today_tasks(user_id)
        
        prompt = f"""Generate morning briefing for {datetime.now().date()}.
        Tasks: {tasks}
        Format: priorities, calendar, motivation."""
        
        briefing = await self.openai.generate(prompt)
        await self.telegram.send(user_id, briefing)
        
        # Force response
        response = await self.telegram.wait_for(
            user_id, 
            "What are your TOP 3 priorities for today?",
            timeout=30
        )
        
        if not response:
            await self.telegram.send(user_id, 
                "You didn't respond. Tomorrow you're blocked from work until you respond.")
    
    async def midday_check(self, user_id):
        """12pm: Midday pulse"""
        response = await self.telegram.ask(
            user_id,
            "Midday check: Show me one piece of evidence you've worked on your priorities."
        )
        
        if not self.has_progress(response):
            await self.telegram.send(user_id,
                "No visible progress. What's the blocker?")
    
    async def evening_review(self, user_id):
        """6pm: EOD review"""
        await self.telegram.send(user_id,
            """EOD Review:
            
            1. What did you complete today?
            2. What didn't get done? Why?
            3. What's one thing to improve tomorrow?
            4. Log any learnings."""
        )
        
        response = await self.telegram.wait_for_response(user_id)
        await self.archive_day(user_id, response)
        
        # Calculate streak
        streak = self.calculate_streak(user_id)
        await self.telegram.send(user_id,
            f"Day complete. Current accountability streak: {streak} days")
    
    def calculate_streak(self, user_id):
        """Track consecutive days with completed reviews"""
        # Implementation
        pass

# Cron setup
# 0 9 * * 1-5: morning_briefing
# 0 12 * * 1-5: midday_check  
# 0 18 * * 1-5: evening_review
```

---

## HONEST ASSESSMENT

### What Works
1. **AI pushback on tasks** — Highly effective if configured
2. **Daily check-ins** — Works if you respond to them
3. **Streak systems** — Gamification helps
4. **Browser blocking** — Physical friction works

### What Doesn't Work
1. **AI-only accountability** — Without real stakes, easy to ignore
2. **Too many check-ins** — Becomes noise
3. **Fully automated systems** — Need human oversight
4. **Privacy-invasive tracking** — Creates resentment

### The Real Secret

The best accountability is:
1. **Public stakes** — Share goals with someone who cares
2. **Financial consequences** — Pay to not do something
3. **Social pressure** — Accountability partners with regular calls

AI can support all of these but cannot replace human stakes entirely.

### Recommended Starting Point

```
Week 1: Set up Telegram bot with daily check-in
        - Morning: "What are your priorities?"
        - Evening: "What did you complete?"
        - No AI, just structured prompts

Week 2: Add AI processing
        - Use Claude/free tier to summarize responses
        - Track patterns

Week 3: Add browser enforcement
        - Block distracting sites during work hours

Week 4: Add memory
        - Khoj AI or markdown files
        - AI learns your patterns
```

---

## RESOURCES & LINKS

### Repositories Found
- https://github.com/pauloribeiro92/cursor-chief-of-staff
- https://github.com/purroy/majordomo
- https://github.com/kaxixi/proactive-assistant
- https://github.com/KoPyae2/Life-Desk
- https://github.com/stick231/tg-bot-iskra
- https://github.com/Zokinho/taskflow
- https://github.com/dylanhavelaerts/productivity-assistant
- https://github.com/MohammedAlkindi/SahurLock
- https://github.com/ruthzu/Allowlist
- https://github.com/Oshomah26/TabWarden
- https://github.com/khoj-ai/khoj
- https://github.com/enjoyingthegrind-afk/APEX
- https://github.com/seam-sikder-nahid/SelfOS

### Tools to Combine
- Telegram Bot API (free)
- Claude API (free tier)
- Khoj AI (self-hosted, free)
- Cron jobs (system scheduler)
- Browser extensions (free)

---

*Research completed May 8, 2026*
*Topics: AI accountability, chief of staff pattern, habit tracking, focus enforcement*
