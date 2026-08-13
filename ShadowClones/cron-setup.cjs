#!/usr/bin/env node
/**
 * cron-setup.js — Real Hermes cron config generator
 *
 * Converts the conceptual cron schedule into real Hermes cron commands.
 * Outputs a script that the user can run to set up all 7 profiles' cron.
 *
 * Schedule (BSR — Bangladesh Standard Time, UTC+6):
 *   9:00 AM  - crypto_sage:  Market check
 *   9:30 AM  - naruto_main:  Daily synthesis
 *  10:00 AM  - marjahans:    Inventory check
 *  11:00 AM  - snaptrap:     Culture scan
 *  12:00 PM  - truth_seeker: Research scan
 *  12:00 PM  - truth_seeker: Post thread
 *   2:00 PM  - marjahans:    IG engagement
 *   6:00 PM  - code_ninja:   Weekly code review (Fri)
 *   6:00 PM  - crypto_sage:  Weekly sentiment (Sun)
 *   8:00 PM  - snaptrap:     Pre-drop teasers
 *   9:00 PM  - snaptrap:     Community check (Wed)
 *  10:00 PM  - naruto_main:  Memory consolidation
 *  10:00 PM  - truth_seeker: Post
 *  10:00 AM  - build_master: Network check
 *  11:00 AM  - marjahans:    Monthly competitor (1st of month)
 */

const fs = require('fs');
const path = require('path');

const CRON_JOBS = [
  // ─── Crypto Sage ──────────────────────────────────────────────
  {
    profile: 'crypto_sage',
    name: 'morning_market_check',
    schedule: '0 9 * * *',
    prompt: 'Analyze BTC/ETH overnight. Identify 3 chart patterns. Log to #ShadowNetwork (shadow-kanban).'
  },
  {
    profile: 'crypto_sage',
    name: 'weekly_sentiment',
    schedule: '0 18 * * 0',
    prompt: 'Generate weekly sentiment report. Fear/Greed, funding rates, social trends.'
  },
  {
    profile: 'crypto_sage',
    name: 'monthly_mining_audit',
    schedule: '0 10 1 * *',
    prompt: 'Calculate mining profitability. ROI per rig. Recommend continue/upgrade/exit.'
  },

  // ─── Code Ninja ───────────────────────────────────────────────
  {
    profile: 'code_ninja',
    name: 'weekly_code_review',
    schedule: '0 18 * * 5',
    prompt: 'Review all active client projects. Update skill library. Identify reusable patterns.'
  },
  {
    profile: 'code_ninja',
    name: 'monthly_skill_update',
    schedule: '0 10 1 * *',
    prompt: 'Scan new tools/frameworks. Update skills/ folder. Test in playground.'
  },
  {
    profile: 'code_ninja',
    name: 'daily_git_status',
    schedule: '0 20 * * *',
    prompt: 'Check git status of all active repos. Flag uncommitted work > 24h.'
  },

  // ─── Marjahans Merchant ───────────────────────────────────────
  {
    profile: 'marjahans_merchant',
    name: 'daily_inventory',
    schedule: '0 10 * * *',
    prompt: 'Check Shopify inventory. Flag SKUs < 5 units. Suggest reorder.'
  },
  {
    profile: 'marjahans_merchant',
    name: 'weekly_email_campaign',
    schedule: '0 9 * * 1',
    prompt: 'Draft weekly Klaviyo email. Product story, customer testimonial, CTA.'
  },
  {
    profile: 'marjahans_merchant',
    name: 'monthly_competitor_scan',
    schedule: '0 11 1 * *',
    prompt: 'Scan top 5 competitors. Pricing, new products, campaigns. Recommend actions.'
  },
  {
    profile: 'marjahans_merchant',
    name: 'daily_engagement',
    schedule: '0 14 * * *',
    prompt: 'Reply to all IG DMs and comments. Engage 10 accounts in our niche.'
  },

  // ─── Snaptrap Stylist ─────────────────────────────────────────
  {
    profile: 'snaptrap_stylist',
    name: 'daily_culture_scan',
    schedule: '0 11 * * *',
    prompt: 'Scan TikTok, IG, Pinterest, X. Identify trending aesthetics, sounds, hashtags. Log 5 trends.'
  },
  {
    profile: 'snaptrap_stylist',
    name: 'weekly_community_check',
    schedule: '0 18 * * 3',
    prompt: 'Review IG DMs, comments, mentions. Engage top 20 accounts. Flag UGC.'
  },
  {
    profile: 'snaptrap_stylist',
    name: 'pre_drop_teaser',
    schedule: '0 20 * * *',
    prompt: 'If drop is 7-14 days out: post teaser content. If < 24h: countdown.'
  },

  // ─── Build Master ─────────────────────────────────────────────
  {
    profile: 'build_master',
    name: 'weekly_pipeline_review',
    schedule: '0 9 * * 1',
    prompt: 'Review all open proposals. Update CRM. Follow up on warm intros > 7 days old.'
  },
  {
    profile: 'build_master',
    name: 'monthly_proposal_followup',
    schedule: '0 10 1 * *',
    prompt: 'Check status of all proposals sent > 30 days ago. Decide: pursue, archive, or warm up.'
  },
  {
    profile: 'build_master',
    name: 'daily_network_check',
    schedule: '0 8 * * *',
    prompt: 'Check LinkedIn, email, WhatsApp for new contacts. Log to CRM. Identify warm intro paths.'
  },

  // ─── Truth Seeker ─────────────────────────────────────────────
  {
    profile: 'truth_seeker',
    name: 'daily_research_scan',
    schedule: '0 8 * * *',
    prompt: 'Scan crypto, history, philosophy, technology. Identify 3 macro patterns. Draft 1 thread.'
  },
  {
    profile: 'truth_seeker',
    name: 'weekly_newsletter',
    schedule: '0 9 * * 0',
    prompt: 'Draft weekly Substack. Connect 2-3 events to historical/philosophical pattern. 1500-2000 words.'
  },
  {
    profile: 'truth_seeker',
    name: 'monthly_audience_review',
    schedule: '0 10 1 * *',
    prompt: 'Analyze Substack, YouTube, X growth. Identify top-performing content. Recommend topics.'
  },
  {
    profile: 'truth_seeker',
    name: 'daily_posting',
    schedule: '0 12,18,21 * * *',
    prompt: 'Post 1 thread or tweet at peak time. Engage replies within 2 hours.'
  },

  // ─── Naruto Main (Orchestrator) ───────────────────────────────
  {
    profile: 'naruto_main',
    name: 'morning_synthesis',
    schedule: '30 9 * * *',
    prompt: 'Run shadow-orchestrator synthesis. Deliver State of the Empire.'
  },
  {
    profile: 'naruto_main',
    name: 'evening_memory',
    schedule: '0 22 * * *',
    prompt: 'Run shadow-orchestrator memory. Tag insights, save to ShadowNetwork.'
  },
  {
    profile: 'naruto_main',
    name: 'weekly_review',
    schedule: '0 20 * * 0',
    prompt: 'Run shadow-orchestrator weekly. Sunday digest.'
  }
];

// ─── Output ──────────────────────────────────────────────────────
function generateBash() {
  const lines = ['#!/usr/bin/env bash', '', '# Generated by cron-setup.js', '# Hope Theory Shadow Clone Jutsu — Daily Rhythm', '', 'set -e', ''];
  for (const job of CRON_JOBS) {
    lines.push(`# ${job.profile}: ${job.name}`);
    lines.push(`hermes -p ${job.profile} cron create "${job.schedule}" \\`);
    lines.push(`  "${job.prompt}"`);
    lines.push('');
  }
  return lines.join('\n');
}

function generateBat() {
  const lines = ['@echo off', 'REM Generated by cron-setup.js', 'REM Hope Theory Shadow Clone Jutsu - Daily Rhythm', ''];
  for (const job of CRON_JOBS) {
    lines.push(`REM ${job.profile}: ${job.name}`);
    lines.push(`hermes -p ${job.profile} cron create "${job.schedule}" "${job.prompt}"`);
    lines.push('');
  }
  return lines.join('\r\n');
}

function generateDocs() {
  const lines = [
    '# Daily Rhythm — Hope Theory Shadow Clone Jutsu',
    '',
    `**Generated:** ${new Date().toISOString()}`,
    `**Total cron jobs:** ${CRON_JOBS.length}`,
    '',
    '## Schedule (BSR = UTC+6, Bangladesh Standard Time)',
    '',
    '| Time | Day | Profile | Job | Purpose |',
    '|------|-----|---------|-----|---------|'
  ];

  // Convert cron to readable
  const readableCron = (cron) => {
    const parts = cron.split(' ');
    const min = parts[0];
    const hour = parts[1];
    const dayOfMonth = parts[2];
    const month = parts[3];
    const dayOfWeek = parts[4];
    return `m=${min} h=${hour} dom=${dayOfMonth} mon=${month} dow=${dayOfWeek}`;
  };

  for (const job of CRON_JOBS) {
    const readable = readableCron(job.schedule);
    lines.push(`| \`${job.schedule}\` | ${readable} | ${job.profile} | ${job.name} | ${job.prompt.substring(0, 60)}... |`);
  }

  lines.push('');
  lines.push('## Setup');
  lines.push('');
  lines.push('```bash');
  lines.push('# Bash / WSL');
  lines.push('bash /h/DevJourney/ShadowClones/setup_cron.sh');
  lines.push('');
  lines.push('# Windows');
  lines.push('setup_cron.bat');
  lines.push('```');
  lines.push('');
  lines.push('## Verify');
  lines.push('');
  lines.push('```bash');
  lines.push('hermes -p naruto_main cron list');
  lines.push('hermes -p crypto_sage cron list');
  lines.push('```');

  return lines.join('\n');
}

// ─── Main ────────────────────────────────────────────────────────
const output = process.argv[2] || 'all';

if (output === 'all' || output === 'bash') {
  fs.writeFileSync(path.join(__dirname, 'setup_cron.sh'), generateBash());
  console.log('✅ Generated setup_cron.sh');
}

if (output === 'all' || output === 'bat') {
  fs.writeFileSync(path.join(__dirname, 'setup_cron.bat'), generateBat());
  console.log('✅ Generated setup_cron.bat');
}

if (output === 'all' || output === 'docs') {
  fs.writeFileSync(path.join(__dirname, 'CRON_DAILY_RHYTHM.md'), generateDocs());
  console.log('✅ Generated CRON_DAILY_RHYTHM.md');
}

console.log(`\nTotal: ${CRON_JOBS.length} cron jobs across 7 profiles`);
