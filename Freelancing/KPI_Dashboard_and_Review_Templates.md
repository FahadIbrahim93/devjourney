# KPI Dashboard Template (Google Data Studio / Looker Studio)
## Data Source: Google Sheet (Live Tracking)

### Sheet Structure (Columns)
| Date | Metric | Value | Target | Variance | Status |
|------|--------|-------|--------|---------|--------|
| 2026-05-03 | Monthly Revenue | $850 | $2,000 | -$1,150 | 🔴 |
| 2026-05-03 | Proposals Sent | 150 | 300 | -150 | 🔴 |
| 2026-05-03 | Discovery Calls | 3 | 10 | -7 | 🔴 |
| 2026-05-03 | Projects Closed | 1 | 3 | -2 | 🔴 |

### Dashboard Layout (4 Sections)

**1. Revenue Overview (Top Row)**
- Scorecard: Current Monthly Revenue
- Scorecard: Target ($2,000)
- Scorecard: Pipeline Value ($)
- Scorecard: Avg Deal Size ($)

**2. Lead Generation (Middle Row)**
- Time series: Proposals Sent (daily)
- Pie chart: Proposal Sources (Upwork, Direct, Fiverr, Referral)
- Bar chart: Conversion Rate (Lead→Call = %)
- Table: Top 10 Prospects (Name, Status, Value)

**3. Client Health (Bottom Row)**
- Table: Active Clients (Name, Since, MRR, Health Score)
- Gauge: Client Satisfaction (NPS 0-10)
- Bar chart: Retainer Revenue vs One-off
- Line chart: Churn Rate (%)

**4. Operational KPIs (Right Column)**
- Scorecard: Upwork Win Rate (%)
- Scorecard: Avg Response Time (hours)
- Scorecard: Quality Gate Pass Rate (%)
- Scorecard: GitHub Commits (weekly)

### Alert Configuration (Email/Slack)

| Condition | Threshold | Action |
|-----------|-------------|--------|
| Revenue < 80% of target | Current < $1,600 | Send email to Fahad + Slack #alerts |
| Proposal win rate < 8% | Week-to-date < 8% | Slack notification |
| Pipeline value < $5,000 | Total active leads < $5k | Slack warning |
| Client churn > 10% | Monthly churn > 10% | Email + schedule review |

### Setup Instructions
1. Create Google Sheet with columns above.
2. In Google Data Studio, add "Google Sheets" as data source.
3. Create charts using the metrics.
4. For alerts: Use "Measurement Protocol" or Zapier: "New row in Sheet" → "Send Slack message".
5. Share dashboard link with client portal (read-only).

---

## Weekly Review Template (Notion)

### Week of: [DATE]

**Financial:**
- [ ] Revenue this week: $____
- [ ] Pipeline value: $____
- [ ] Expenses: $____
- [ ] Profit margin: ____%

**Lead Generation:**
- [ ] Proposals sent: ____ (target: 30+)
- [ ] Discovery calls booked: ____ (target: 3+)
- [ ] Response rate: ____%
- [ ] Best performing channel: ____

**Project Delivery:**
- [ ] Projects delivered: ____
- [ ] Quality gate pass: ____/4
- [ ] Client satisfaction: ____/10
- [ ] Testimonials collected: ____

**Content & Marketing:**
- [ ] Blog posts published: ____
- [ ] Twitter threads: ____
- [ ] LinkedIn posts: ____
- [ ] YouTube videos: ____

**Learning & Growth:**
- [ ] New skill practiced: ____
- [ ] Hours invested: ____
- [ ] Books/courses completed: ____

**Next Week Adjustments:**
1. ____
2. ____
3. ____

**Blockers/Issues:**
- ____

---

## Monthly Review Template (Notion)

### Month: [MONTH YEAR]

**Revenue Metrics:**
- Total Revenue: $____ (Target: $____)
- Recurring Revenue: $____ (% of total)
- One-off Projects: $____
- Passive Income: $____
- Profit Margin: ____%

**Client Metrics:**
- New Clients: ____
- Lost Clients: ____
- Retention Rate: ____%
- Avg Project Value: $____
- LTV (estimated): $____

**Operational Metrics:**
- Total Proposals: ____
- Win Rate: ____%
- Avg Sales Cycle: ____ days
- Project Delivery Time: ____ days
- Quality Gate Pass: ____%

**Marketing Metrics:**
- Content Pieces: ____
- Social Followers Gained: ____
- Email Subscribers: ____
- Website Traffic: ____
- Referral Revenue: $____

**Personal Metrics:**
- Total Hours Worked: ____
- Billable Hours: ____
- Learning Hours: ____
- Health/Stress Rating: ____/10
- Satisfaction Rating: ____/10

**Major Wins:**
1. ____
2. ____
3. ____

**Lessons Learned:**
1. ____
2. ____

**Next Month Goals:**
1. ____
2. ____
3. ____

**Quarterly Outlook:**
- Revenue Trajectory: $____ → $____ → $____
- Major Initiatives: ____
- Skill Development Focus: ____

---

*Templates to be copied into Notion workspace weekly/monthly.*