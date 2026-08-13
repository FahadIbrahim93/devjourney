# Daily Rhythm — Hope Theory Shadow Clone Jutsu

**Generated:** 2026-06-07T08:44:05.392Z
**Total cron jobs:** 23

## Schedule (BSR = UTC+6, Bangladesh Standard Time)

| Time | Day | Profile | Job | Purpose |
|------|-----|---------|-----|---------|
| `0 9 * * *` | m=0 h=9 dom=* mon=* dow=* | crypto_sage | morning_market_check | Analyze BTC/ETH overnight. Identify 3 chart patterns. Log to... |
| `0 18 * * 0` | m=0 h=18 dom=* mon=* dow=0 | crypto_sage | weekly_sentiment | Generate weekly sentiment report. Fear/Greed, funding rates,... |
| `0 10 1 * *` | m=0 h=10 dom=1 mon=* dow=* | crypto_sage | monthly_mining_audit | Calculate mining profitability. ROI per rig. Recommend conti... |
| `0 18 * * 5` | m=0 h=18 dom=* mon=* dow=5 | code_ninja | weekly_code_review | Review all active client projects. Update skill library. Ide... |
| `0 10 1 * *` | m=0 h=10 dom=1 mon=* dow=* | code_ninja | monthly_skill_update | Scan new tools/frameworks. Update skills/ folder. Test in pl... |
| `0 20 * * *` | m=0 h=20 dom=* mon=* dow=* | code_ninja | daily_git_status | Check git status of all active repos. Flag uncommitted work ... |
| `0 10 * * *` | m=0 h=10 dom=* mon=* dow=* | marjahans_merchant | daily_inventory | Check Shopify inventory. Flag SKUs < 5 units. Suggest reorde... |
| `0 9 * * 1` | m=0 h=9 dom=* mon=* dow=1 | marjahans_merchant | weekly_email_campaign | Draft weekly Klaviyo email. Product story, customer testimon... |
| `0 11 1 * *` | m=0 h=11 dom=1 mon=* dow=* | marjahans_merchant | monthly_competitor_scan | Scan top 5 competitors. Pricing, new products, campaigns. Re... |
| `0 14 * * *` | m=0 h=14 dom=* mon=* dow=* | marjahans_merchant | daily_engagement | Reply to all IG DMs and comments. Engage 10 accounts in our ... |
| `0 11 * * *` | m=0 h=11 dom=* mon=* dow=* | snaptrap_stylist | daily_culture_scan | Scan TikTok, IG, Pinterest, X. Identify trending aesthetics,... |
| `0 18 * * 3` | m=0 h=18 dom=* mon=* dow=3 | snaptrap_stylist | weekly_community_check | Review IG DMs, comments, mentions. Engage top 20 accounts. F... |
| `0 20 * * *` | m=0 h=20 dom=* mon=* dow=* | snaptrap_stylist | pre_drop_teaser | If drop is 7-14 days out: post teaser content. If < 24h: cou... |
| `0 9 * * 1` | m=0 h=9 dom=* mon=* dow=1 | build_master | weekly_pipeline_review | Review all open proposals. Update CRM. Follow up on warm int... |
| `0 10 1 * *` | m=0 h=10 dom=1 mon=* dow=* | build_master | monthly_proposal_followup | Check status of all proposals sent > 30 days ago. Decide: pu... |
| `0 8 * * *` | m=0 h=8 dom=* mon=* dow=* | build_master | daily_network_check | Check LinkedIn, email, WhatsApp for new contacts. Log to CRM... |
| `0 8 * * *` | m=0 h=8 dom=* mon=* dow=* | truth_seeker | daily_research_scan | Scan crypto, history, philosophy, technology. Identify 3 mac... |
| `0 9 * * 0` | m=0 h=9 dom=* mon=* dow=0 | truth_seeker | weekly_newsletter | Draft weekly Substack. Connect 2-3 events to historical/phil... |
| `0 10 1 * *` | m=0 h=10 dom=1 mon=* dow=* | truth_seeker | monthly_audience_review | Analyze Substack, YouTube, X growth. Identify top-performing... |
| `0 12,18,21 * * *` | m=0 h=12,18,21 dom=* mon=* dow=* | truth_seeker | daily_posting | Post 1 thread or tweet at peak time. Engage replies within 2... |
| `30 9 * * *` | m=30 h=9 dom=* mon=* dow=* | naruto_main | morning_synthesis | Run shadow-orchestrator synthesis. Deliver State of the Empi... |
| `0 22 * * *` | m=0 h=22 dom=* mon=* dow=* | naruto_main | evening_memory | Run shadow-orchestrator memory. Tag insights, save to Shadow... |
| `0 20 * * 0` | m=0 h=20 dom=* mon=* dow=0 | naruto_main | weekly_review | Run shadow-orchestrator weekly. Sunday digest.... |

## Setup

```bash
# Bash / WSL
bash /h/DevJourney/ShadowClones/setup_cron.sh

# Windows
setup_cron.bat
```

## Verify

```bash
hermes -p naruto_main cron list
hermes -p crypto_sage cron list
```