---
name: network_manager
description: Build and nurture professional network. From cold contact to warm referral.
version: 1.0.0
triggers:
  - "follow up with [contact]"
  - "who do I know in [industry]"
  - "networking strategy"
  - "warm intro to [person]"
tags: [build, network, crm, relationships, business-development]
---

# Network Manager

## Purpose
Build and maintain a professional network that generates warm intros, referrals, and deal flow. Not "collecting contacts" — building real relationships.

## Trigger Conditions
- New contact added
- User asks "who do I know in [industry]?"
- Quarterly network review
- Pre-proposal (find warm intro path)
- On-demand via `/network_manager <need>`

## Required Inputs
- **Contact** (name, role, company, relationship strength)
- **Touch history** (when last in contact, what discussed)
- **Goal** (what you want from this relationship)

## Steps

### 1. Categorize Contacts (Tier System)

**Tier 1 — Inner Circle (5-15 people)**
- Close friends, family, key partners
- Talk weekly/monthly
- Know your goals, will help unprompted
- **Action:** Coffee, dinner, regular check-ins

**Tier 2 — Strong Network (50-100 people)**
- Trusted colleagues, past clients, mentors
- Talk quarterly
- Will make intros if asked
- **Action:** Quarterly check-in, share wins

**Tier 3 — Active Network (200-500 people)**
- Industry peers, past coworkers, vendors
- Talk 1-2x per year
- Will respond to your messages
- **Action:** LinkedIn engagement, occasional coffee

**Tier 4 — Broad Network (500+)**
- LinkedIn connections, conference contacts
- Minimal touch
- Won't help unless reminded who you are
- **Action:** Occasional like/comment, never let go completely

### 2. Capture Everything
- **CRM:** Notion, Airtable, HubSpot Free, Folk, or even Google Sheets
- **For each contact:**
  - Name, role, company
  - How you met
  - Tier (1-4)
  - Last contact date
  - Last conversation summary
  - Goals (theirs, yours)
  - Potential intros they could make
  - Gift preferences (for thoughtful gestures)

### 3. Touchpoint Cadence

**Tier 1:** Weekly to monthly
- Coffee, dinner, voice note, "saw this and thought of you"
- Share personal updates
- Ask about their goals
- **Time:** 30-60 min/month per contact

**Tier 2:** Quarterly
- Check-in message ("how's [their project] going?")
- Share relevant article or intro
- Invite to event
- **Time:** 5-10 min/contact/quarter

**Tier 3:** Bi-annually
- LinkedIn engagement (like, comment)
- Holiday card or birthday
- Brief "catching up" message
- **Time:** 2-5 min/contact/year

**Tier 4:** Annually
- LinkedIn like on a post
- Brief "happy holidays" message
- **Time:** 1 min/contact/year

### 4. Provide Value First
Before asking for anything, give:
- **Introductions:** Connect them to people in your network
- **Information:** Share an article, opportunity, insight
- **Recognition:** Praise their work publicly (LinkedIn, intro)
- **Resources:** Free template, contact, tool
- **Time:** Listen when they need to talk

The rule: **5:1 give-to-ask ratio.** Give 5 times before you ask once.

### 5. Warm Intro Path
For a target contact:
- **Step 1:** Who in your network knows them? (Check LinkedIn)
- **Step 2:** Is your connection strong enough to ask? (Tier 1-2 yes, Tier 3-4 probably not)
- **Step 3:** Ask your connection for an intro
- **Email template:**
  ```
  Hey [mutual connection],
  
  Hope you're well! Quick favor — I'm trying to reach [target name] at [target company]. We have [mutual interest / reason to connect].
  
  Would you be open to making a quick intro? Totally fine if not — no pressure.
  
  Either way, [genuine compliment about them].
  
  [Your name]
  ```
- **Step 4:** If yes, send intro to both sides
- **Step 5:** Follow up with target within 1 week
- **Step 6:** Update your CRM (new contact, source)

### 6. Leverage Family Network (Build venture)
The user has a unique advantage: **family in real estate.**
- Dad's 3 companies (BUILD venture)
- Brother / siblings in industry
- Aunts, uncles, cousins
- Family events = networking opportunities
- **Don't abuse it** — be respectful, give value, not just take

### 7. Track + Analyze
- **Quarterly:** Review network size, tier distribution
- **Track:** # of intros made, # received, deals closed
- **Review:** Which Tier 2-3 contacts need re-engagement
- **Goal:** 5-10 new Tier 1 connections per year, 50+ Tier 2-3

## Output Format

```markdown
🤝 **NETWORK REVIEW — June 2026**

**Total contacts:** 487
**By tier:**
- Tier 1: 12
- Tier 2: 67
- Tier 3: 234
- Tier 4: 174

**Status:**
- Tier 1: 12/12 in good standing (talked in last 30 days)
- Tier 2: 58/67 in good standing (talked in last 90 days)
- Tier 3: 89/234 in good standing (talked in last 6 months)
- Tier 4: 23/174 in good standing (talked in last year)

**🚨 NEEDS RE-ENGAGEMENT (Tier 2):**
- 9 contacts haven't been touched in 90+ days
- Action: Schedule 15-min coffee or call in next 30 days
- Top 3: [Name A], [Name B], [Name C]

**📊 NETWORKING ACTIVITY (last 90 days):**
- New contacts added: 23
- Intros given: 8
- Intros received: 4
- Deals from intros: 1 ($45K)
- Coffee meetings: 12
- Industry events attended: 3

**🎯 Q3 2026 GOALS:**
- Tier 1: Add 2 new (mentor in commercial RE, supplier in steel)
- Tier 2: Re-engage 9 contacts, add 5 new
- Intros given: 10 (track and follow up)
- Deals from intros: 1-2

**📌 THIS WEEK'S ACTIONS:**
1. Message [Name A] — "Hey, would love to catch up. Coffee Thursday?"
2. Send intro: [Name B] ↔ [Name D] (they both work in hospitality)
3. Add 3 new LinkedIn contacts from [event]
4. Reply to [Name E]'s message (Tier 1, hasn't heard back from me in 2 weeks)

**Tool:** Notion CRM (free template, see [link])
```

## Example Invocation

User: "Who do I know in commercial real estate?"
Assistant: [Searches CRM, identifies contacts, suggests warm intro paths]

## Verification
- [ ] Contacts are categorized (tier)
- [ ] Touch history is tracked
- [ ] Cadence is maintained
- [ ] Value is given before asking
- [ ] Warm intro paths are clear
- [ ] Quarterly review happens
- [ ] No relationship is purely extractive

## Common Pitfalls
- ❌ "Collecting" LinkedIn connections (no real relationship)
- ❌ Asking for help before giving value
- ❌ Letting relationships go cold (tier 2 → 3 → 4 → forgotten)
- ❌ One-way relationship (you only contact when you need something)
- ❌ Not tracking (forget who you know)
- ❌ Skipping Tier 1 (they're your most valuable)

## Related Skills
- `proposal_writer` — Use network to find warm intro paths
- `project_scoper` — Past clients become referral sources
- `innovation_scout` — Network brings new ideas
