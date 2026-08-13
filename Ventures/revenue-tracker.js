#!/usr/bin/env node
/**
 * revenue-tracker.js — Hope Theory Revenue + Expense + Forecast Tracker
 * Tracks per-venture income, expenses, forecasts.
 *
 * Usage:
 *   node revenue-tracker.js income <amount> <venture> <source>  # Log income
 *   node revenue-tracker.js expense <amount> <venture> <category>  # Log expense
 *   node revenue-tracker.js forecast                              # 90-day forecast
 *   node revenue-tracker.js report                                # Full report
 *   node revenue-tracker.js venture <name>                        # Per-venture view
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_FILE = path.join(__dirname, 'revenue_data.json');

const VENTURES = {
  crypto: { name: '[CRYPTO]', currency: 'USD', target_monthly: 1500 },
  code: { name: '[CODE]', currency: 'USD', target_monthly: 5000 },
  marjahans: { name: '[MARJAHANS]', currency: 'BDT', target_monthly: 50000 },
  snaptrap: { name: '[SNAPTRAP]', currency: 'BDT', target_monthly: 80000 },
  build: { name: '[BUILD]', currency: 'BDT', target_monthly: 800000 },
  philo: { name: '[PHILO]', currency: 'USD', target_monthly: 500 },
};

function loadData() {
  if (fs.existsSync(DATA_FILE)) {
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  }
  return {
    income: [],
    expenses: [],
    goals: { q3_2026: 15000, q4_2026: 30000, year_1: 100000 },
  };
}

function saveData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

function logIncome(data, args) {
  const [amount, venture, source] = args;
  if (!amount || !venture) {
    console.log('Usage: node revenue-tracker.js income <amount> <venture> <source>');
    console.log('Example: node revenue-tracker.js income 1500 code "Upwork client"');
    return;
  }

  const v = VENTURES[venture];
  if (!v) {
    console.log(`Unknown venture: ${venture}`);
    console.log('Valid:', Object.keys(VENTURES).join(', '));
    return;
  }

  const entry = {
    id: `INC-${Date.now()}`,
    date: new Date().toISOString().split('T')[0],
    amount: parseFloat(amount),
    currency: v.currency,
    venture: v.name,
    source: source || 'unknown',
  };

  data.income.push(entry);
  saveData(data);
  console.log(`💰 Income logged: ${v.currency} ${entry.amount.toLocaleString()} from ${v.name} (${source})`);

  monthlyReport(data);
}

function logExpense(data, args) {
  const [amount, venture, category] = args;
  if (!amount || !venture) {
    console.log('Usage: node revenue-tracker.js expense <amount> <venture> <category>');
    return;
  }

  const v = VENTURES[venture];
  if (!v) {
    console.log(`Unknown venture: ${venture}`);
    return;
  }

  const entry = {
    id: `EXP-${Date.now()}`,
    date: new Date().toISOString().split('T')[0],
    amount: parseFloat(amount),
    currency: v.currency,
    venture: v.name,
    category: category || 'general',
  };

  data.expenses.push(entry);
  saveData(data);
  console.log(`💸 Expense logged: ${v.currency} ${entry.amount.toLocaleString()} for ${v.name} (${category})`);
}

function monthlyReport(data) {
  const month = new Date().toISOString().slice(0, 7);
  console.log(`\n📅 ${month} Summary:\n`);

  const byVenture = {};
  Object.keys(VENTURES).forEach(v => {
    const monthIncome = data.income
      .filter(i => i.date.startsWith(month) && VENTURES[v].name === i.venture)
      .reduce((sum, i) => sum + i.amount, 0);
    const target = VENTURES[v].target_monthly;
    byVenture[v] = { income: monthIncome, target, pct: target > 0 ? (monthIncome / target * 100) : 0 };
  });

  Object.entries(byVenture).forEach(([v, m]) => {
    const config = VENTURES[v];
    const status = m.pct >= 100 ? '✅' : m.pct >= 50 ? '🟡' : m.pct > 0 ? '🟠' : '⚪';
    console.log(`   ${status} ${config.name.padEnd(15)} ${config.currency} ${m.income.toLocaleString().padStart(8)} / ${m.target.toLocaleString().padStart(8)} (${m.pct.toFixed(0)}%)`);
  });
}

function fullReport(data) {
  console.log('\n💰 HOPE THEORY REVENUE REPORT');
  console.log('═══════════════════════════════════════\n');

  const now = new Date();
  console.log(`As of: ${now.toISOString().split('T')[0]}\n`);

  // All-time totals
  const totalIncome = data.income.reduce((sum, i) => sum + i.amount, 0);
  const totalExpenses = data.expenses.reduce((sum, e) => sum + e.amount, 0);
  console.log(`📊 All-Time Totals:`);
  console.log(`   Income: ${data.income.length} entries`);
  console.log(`   Expenses: ${data.expenses.length} entries`);

  // By venture
  console.log('\n📊 By Venture (all-time):');
  Object.keys(VENTURES).forEach(v => {
    const ventureName = VENTURES[v].name;
    const income = data.income.filter(i => i.venture === ventureName).reduce((s, i) => s + i.amount, 0);
    const expenses = data.expenses.filter(e => e.venture === ventureName).reduce((s, e) => s + e.amount, 0);
    if (income > 0 || expenses > 0) {
      console.log(`   ${ventureName}: ${VENTURES[v].currency} ${income.toLocaleString()} income, ${expenses.toLocaleString()} expenses, ${(income - expenses).toLocaleString()} net`);
    }
  });

  // Monthly
  console.log('\n📅 Current Month:');
  monthlyReport(data);

  // Goals
  console.log(`\n🎯 Annual Goals:`);
  console.log(`   Q3 2026: $${data.goals.q3_2026.toLocaleString()}`);
  console.log(`   Q4 2026: $${data.goals.q4_2026.toLocaleString()}`);
  console.log(`   Year 1:  $${data.goals.year_1.toLocaleString()}`);
}

function forecast(data) {
  console.log('\n📈 90-DAY REVENUE FORECAST');
  console.log('═══════════════════════════════════════\n');

  console.log('SCENARIO A — Conservative (1x client per venture, slow growth):');
  console.log('   [CRYPTO]: $500/mo (mining + 1 trade)');
  console.log('   [CODE]: $2,000/mo (1 client)');
  console.log('   [MARJAHANS]: ৳30,000/mo (15 orders)');
  console.log('   [SNAPTRAP]: ৳80,000/mo (drop 002)');
  console.log('   [BUILD]: ৳300,000/mo (1 project)');
  console.log('   [PHILO]: $0 (building audience)');
  console.log('   90-day total: ~$8,000 + ৳4,000,000 (BDT)');
  console.log('');

  console.log('SCENARIO B — Realistic (2-3 clients per venture, steady growth):');
  console.log('   [CRYPTO]: $1,500/mo (mining + 2-3 trades)');
  console.log('   [CODE]: $5,000/mo (2-3 clients)');
  console.log('   [MARJAHANS]: ৳80,000/mo (40 orders, Eid)');
  console.log('   [SNAPTRAP]: ৳150,000/mo (drops + Eid bundle)');
  console.log('   [BUILD]: ৳1,500,000/mo (3-4 projects)');
  console.log('   [PHILO]: $200/mo (newsletter sponsorships)');
  console.log('   90-day total: ~$20,000 + ৳15,000,000 (BDT)');
  console.log('');

  console.log('SCENARIO C — Stretch (max effort, viral moments):');
  console.log('   [CRYPTO]: $5,000/mo (active trading + content)');
  console.log('   [CODE]: $10,000/mo (4-5 clients)');
  console.log('   [MARJAHANS]: ৳200,000/mo (100 orders, Eid)');
  console.log('   [SNAPTRAP]: ৳300,000/mo (3 drops + Eid bundle)');
  console.log('   [BUILD]: ৳3,000,000/mo (5+ projects)');
  console.log('   [PHILO]: $1,000/mo (newsletter + course pre-sales)');
  console.log('   90-day total: ~$50,000 + ৳30,000,000 (BDT)');
  console.log('');

  console.log('🎯 TARGET: Scenario B (Realistic) is the goal.');
  console.log('   Stretch requires full effort + lucky breaks.');
}

function ventureView(data, ventureKey) {
  if (!ventureKey || !VENTURES[ventureKey]) {
    console.log('Usage: node revenue-tracker.js venture <name>');
    console.log('Valid:', Object.keys(VENTURES).join(', '));
    return;
  }

  const v = VENTURES[ventureKey];
  const income = data.income.filter(i => i.venture === v.name);
  const expenses = data.expenses.filter(e => e.venture === v.name);

  console.log(`\n💰 ${v.name} — REVENUE VIEW`);
  console.log('═══════════════════════════════════════\n');
  console.log(`Currency: ${v.currency}`);
  console.log(`Target monthly: ${v.currency} ${v.target_monthly.toLocaleString()}\n`);

  console.log(`📊 Income (${income.length} entries):`);
  if (income.length === 0) console.log('   (no income yet)');
  income.forEach(i => console.log(`   ${i.date} — ${v.currency} ${i.amount.toLocaleString()} (${i.source})`));

  console.log(`\n💸 Expenses (${expenses.length} entries):`);
  if (expenses.length === 0) console.log('   (no expenses yet)');
  expenses.forEach(e => console.log(`   ${e.date} — ${v.currency} ${e.amount.toLocaleString()} (${e.category})`));

  const totalIncome = income.reduce((s, i) => s + i.amount, 0);
  const totalExpenses = expenses.reduce((s, e) => s + e.amount, 0);
  console.log(`\n📊 Net: ${v.currency} ${(totalIncome - totalExpenses).toLocaleString()}`);
}

const command = process.argv[2];
const arg1 = process.argv[3];
const arg2 = process.argv[4];
const arg3 = process.argv[5];
const args = process.argv.slice(3);
const data = loadData();

switch (command) {
  case 'income':
    logIncome(data, args);
    break;
  case 'expense':
    logExpense(data, args);
    break;
  case 'forecast':
    forecast(data);
    break;
  case 'report':
    fullReport(data);
    break;
  case 'venture':
    ventureView(data, arg1);
    break;
  default:
    console.log('🐼 HOPE THEORY — Revenue Tracker');
    console.log('═══════════════════════════════════════\n');
    console.log('Usage:');
    console.log('  node revenue-tracker.js income <amount> <venture> <source>');
    console.log('  node revenue-tracker.js expense <amount> <venture> <category>');
    console.log('  node revenue-tracker.js forecast');
    console.log('  node revenue-tracker.js report');
    console.log('  node revenue-tracker.js venture <name>');
    console.log('');
    console.log('Ventures:', Object.keys(VENTURES).join(', '));
    console.log('');
    console.log('Example:');
    console.log('  node revenue-tracker.js income 1500 code "Upwork client"');
    console.log('  node revenue-tracker.js income 5000 build "Gulshan project"');
    console.log('  node revenue-tracker.js expense 200 code "Vercel hosting"');
}
