#!/usr/bin/env node
/**
 * daily-outreach.js — Hope Theory Freelance Daily Outreach CLI
 * Built by Hermes (AI COO) for Rimon Islam
 *
 * The user's revenue gate: 0 proposals for 7+ days = blocked.
 * This CLI ensures 5 proposals/day minimum, with tracking + auto-suggestions.
 *
 * Usage:
 *   node daily-outreach.js status              # Show today's stats
 *   node daily-outreach.js log <job_type> <client> <amount>  # Log a proposal
 *   node daily-outreach.js find                # Generate today's target jobs
 *   node daily-outreach.js followup            # Show who needs follow-up
 *   node daily-outreach.js dashboard           # Print dashboard view
 *   node daily-outreach.js reset               # Start fresh week
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_FILE = path.join(__dirname, 'outreach_data.json');
const PROPOSAL_LOG = path.join(__dirname, 'outreach_log.json');

const JOB_TYPES = {
  react: {
    name: 'Full-Stack React',
    rate: 50,
    proposalFile: 'PROPOSAL_PACK_READY_TO_SEND.md#proposal-1',
    searchTerms: ['React developer', 'React TypeScript', 'Full-stack React', 'Next.js developer'],
    avgProjectValue: 2000,
  },
  supabase: {
    name: 'React + Supabase',
    rate: 50,
    proposalFile: 'PROPOSAL_PACK_READY_TO_SEND.md#proposal-2',
    searchTerms: ['Supabase developer', 'React backend', 'Supabase auth', 'Realtime app'],
    avgProjectValue: 2500,
  },
  ai: {
    name: 'AI Agent / Automation',
    rate: 75,
    proposalFile: 'PROPOSAL_PACK_READY_TO_SEND.md#proposal-3',
    searchTerms: ['AI agent', 'LLM integration', 'OpenAI developer', 'automation AI'],
    avgProjectValue: 3500,
  },
  ecommerce: {
    name: 'E-Commerce / Web App',
    rate: 50,
    proposalFile: 'PROPOSAL_PACK_READY_TO_SEND.md#proposal-4',
    searchTerms: ['e-commerce React', 'Stripe integration', 'shopping cart', 'product catalog'],
    avgProjectValue: 3000,
  },
  bugfix: {
    name: 'Bug Fix / Code Audit',
    rate: 50,
    proposalFile: 'PROPOSAL_PACK_READY_TO_SEND.md#proposal-5',
    searchTerms: ['React bug fix', 'code audit', 'TypeScript fix', 'React maintenance'],
    avgProjectValue: 200,
  },
};

function loadData() {
  if (fs.existsSync(DATA_FILE)) {
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  }
  return {
    weekStart: getMonday(),
    proposals: [],
    clients: [],
    income: [],
    totalProposalsThisWeek: 0,
    totalIncomeThisMonth: 0,
  };
}

function saveData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

function getMonday() {
  const d = new Date();
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  return new Date(d.setDate(diff)).toISOString().split('T')[0];
}

function getStatus(data) {
  const today = new Date().toISOString().split('T')[0];
  const todayProposals = data.proposals.filter(p => p.date === today);
  const thisWeekProposals = data.proposals.filter(p => p.date >= data.weekStart);

  console.log('📊 DAILY OUTREACH STATUS');
  console.log('═══════════════════════════════════════');
  console.log(`Today (${today}):        ${todayProposals.length} proposals sent`);
  console.log(`This week:              ${thisWeekProposals.length} proposals sent`);
  console.log(`Weekly target:          25 (5/day × 5 days)`);
  console.log(`Days remaining:         ${5 - thisWeekProposals.length / 5}`);
  console.log(`Monthly income:         $${data.totalIncomeThisMonth}`);
  console.log('');

  if (todayProposals.length === 0) {
    console.log('🚨 REVENUE GATE WARNING: 0 proposals today');
    console.log('   Action: Send at least 3 proposals in the next 60 min');
  } else if (todayProposals.length < 5) {
    console.log(`⚠️  Below daily target. Need ${5 - todayProposals.length} more today.`);
  } else {
    console.log('✅ Daily target met. Great work.');
  }
}

function generateTargetJobs() {
  console.log('🎯 TODAY\'S TARGET JOBS (Upwork search plan)');
  console.log('═══════════════════════════════════════');
  console.log('Search 8-9 AM and 1-2 PM BST (peak post times)');
  console.log('');
  const picks = ['react', 'ai', 'bugfix', 'supabase', 'ecommerce'];
  picks.forEach((type, i) => {
    const config = JOB_TYPES[type];
    console.log(`\n${i + 1}. ${config.name.toUpperCase()}`);
    console.log(`   Rate: $${config.rate}/hr | Avg project: $${config.avgProjectValue}`);
    console.log(`   Search terms:`);
    config.searchTerms.forEach(term => console.log(`     • "${term}"`));
    console.log(`   Proposal: Open ${config.proposalFile}`);
  });
  console.log('\n📋 Filters:');
  console.log('   • Payment verified: YES');
  console.log('   • Budget: $500+');
  console.log('   • Client history: 1+ hires preferred');
  console.log('   • Posted: <24 hours ago (best response)');
}

function logProposal(data, args) {
  const [jobType, client, amount] = args;
  if (!JOB_TYPES[jobType]) {
    console.log(`❌ Unknown job type: ${jobType}`);
    console.log(`   Valid: ${Object.keys(JOB_TYPES).join(', ')}`);
    return;
  }

  const proposal = {
    id: `P-${Date.now()}`,
    date: new Date().toISOString().split('T')[0],
    time: new Date().toTimeString().slice(0, 5),
    jobType,
    client: client || 'unknown',
    amount: parseInt(amount) || JOB_TYPES[jobType].avgProjectValue,
    status: 'sent',
  };

  data.proposals.push(proposal);
  saveData(data);

  console.log('✅ Proposal logged');
  console.log(`   ID: ${proposal.id}`);
  console.log(`   Type: ${JOB_TYPES[jobType].name}`);
  console.log(`   Client: ${proposal.client}`);
  console.log(`   Project value: $${proposal.amount}`);

  getStatus(data);
}

function showFollowups(data) {
  const now = new Date();
  const threeDaysAgo = new Date(now - 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  const needFollowup = data.proposals.filter(
    p => p.date <= threeDaysAgo && p.status === 'sent'
  );

  console.log('📞 FOLLOW-UP QUEUE (sent 3+ days ago, no response)');
  console.log('═══════════════════════════════════════');
  if (needFollowup.length === 0) {
    console.log('   (None yet)');
    return;
  }
  needFollowup.forEach(p => {
    const config = JOB_TYPES[p.jobType];
    console.log(`\n   ${p.id} — ${config.name}`);
    console.log(`   Client: ${p.client} | Sent: ${p.date}`);
    console.log(`   Action: Send polite follow-up message`);
  });
}

function showDashboard(data) {
  console.log('💰 REVENUE DASHBOARD');
  console.log('═══════════════════════════════════════');

  const thisMonth = new Date().toISOString().slice(0, 7);
  const monthProposals = data.proposals.filter(p => p.date.startsWith(thisMonth));
  const monthIncome = data.income
    .filter(i => i.date.startsWith(thisMonth))
    .reduce((sum, i) => sum + i.amount, 0);

  console.log(`\n📅 This Month (${thisMonth})`);
  console.log(`   Proposals: ${monthProposals.length}`);
  console.log(`   Income:    $${monthIncome}`);
  console.log(`   Target:    $5,000 (per Q2 Revenue Dashboard)`);

  console.log('\n📊 Job Type Breakdown (all-time)');
  const byType = {};
  data.proposals.forEach(p => {
    byType[p.jobType] = (byType[p.jobType] || 0) + 1;
  });
  Object.entries(byType).forEach(([type, count]) => {
    const config = JOB_TYPES[type];
    const potential = count * config.avgProjectValue * 0.15;
    console.log(`   ${config.name.padEnd(25)} ${count} sent → $${Math.round(potential)} potential`);
  });

  console.log('\n🎯 90-DAY OUTREACH COMPOUND');
  console.log('   Week 1: 25 proposals → 2-3 conversations');
  console.log('   Week 2-4: 100 proposals → 5-8 conversations → 1-2 clients');
  console.log('   Month 2-3: 200 proposals → 10-15 conversations → 3-5 clients');
  console.log('   End of Q2: 4-8 clients, $5,000-$15,000/month');
}

function resetWeek(data) {
  data.weekStart = getMonday();
  data.proposals = data.proposals.filter(p => p.date >= data.weekStart);
  saveData(data);
  console.log('🔄 Week reset. New tracking period started.');
}

const command = process.argv[2];
const args = process.argv.slice(3);
const data = loadData();

switch (command) {
  case 'status':
    getStatus(data);
    break;
  case 'log':
    logProposal(data, args);
    break;
  case 'find':
    generateTargetJobs();
    break;
  case 'followup':
    showFollowups(data);
    break;
  case 'dashboard':
    showDashboard(data);
    break;
  case 'reset':
    resetWeek(data);
    break;
  default:
    console.log('Usage:');
    console.log('  node daily-outreach.js status              # Today\'s stats');
    console.log('  node daily-outreach.js log <type> <client> <amount>');
    console.log('  node daily-outreach.js find                # Target job search');
    console.log('  node daily-outreach.js followup            # Follow-up queue');
    console.log('  node daily-outreach.js dashboard           # Revenue view');
    console.log('  node daily-outreach.js reset               # New week');
    console.log('');
    console.log('Job types:', Object.keys(JOB_TYPES).join(', '));
}
