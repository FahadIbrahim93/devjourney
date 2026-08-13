#!/usr/bin/env node
/**
 * revenue-tracker.cjs — Track actual vs projected revenue per venture
 *
 * Usage:
 *   node revenue-tracker.cjs add CRYPTO 1500 "BTC trade profit"
 *   node revenue-tracker.cjs show                  Show this month
 *   node revenue-tracker.cjs show all              Show all months
 *   node revenue-tracker.cjs summary              Show summary
 *
 * Data: H:\DevJourney\Ventures\revenue_data.json
 */

const fs = require('fs');
const path = require('path');

const VENTURES_DIR = 'H:\\DevJourney\\Ventures';
const DATA_FILE = path.join(VENTURES_DIR, 'revenue_data.json');

const VENTURES = ['CRYPTO', 'CODE', 'MARJAHANS', 'SNAPTRAP', 'BUILD', 'PHILO'];

function loadData() {
  if (!fs.existsSync(VENTURES_DIR)) fs.mkdirSync(VENTURES_DIR, { recursive: true });
  if (!fs.existsSync(DATA_FILE)) {
    return {
      created: new Date().toISOString(),
      entries: [],
      targets: {
        CRYPTO: { month: 500, year: 6000 },
        CODE: { month: 5000, year: 60000 },
        MARJAHANS: { month: 200, year: 2400 },
        SNAPTRAP: { month: 200, year: 2400 },
        BUILD: { month: 0, year: 0 },
        PHILO: { month: 0, year: 0 },
      },
    };
  }
  const raw = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  // Migrate old format (had 'income' instead of 'entries')
  if (!raw.entries && raw.income) {
    raw.entries = raw.income.map((e) => ({
      id: e.id,
      date: e.date,
      month: (e.date || '').slice(0, 7),
      venture: (e.venture || 'CODE').replace(/[\[\]]/g, ''),
      amount: e.amount || 0,
      description: e.source || e.description || '',
    }));
  }
  if (!raw.entries) raw.entries = [];
  // Seed targets if missing OR empty
  if (!raw.targets || Object.keys(raw.targets).length === 0) {
    raw.targets = {
      CRYPTO: { month: 500, year: 6000 },
      CODE: { month: 5000, year: 60000 },
      MARJAHANS: { month: 200, year: 2400 },
      SNAPTRAP: { month: 200, year: 2400 },
      BUILD: { month: 0, year: 0 },
      PHILO: { month: 0, year: 0 },
    };
  }
  return raw;
}

function saveData(data) {
  if (!fs.existsSync(VENTURES_DIR)) fs.mkdirSync(VENTURES_DIR, { recursive: true });
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

function getMonthKey(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
}

function cmdAdd(args) {
  const [venture, amountStr, ...descParts] = args;
  const description = descParts.join(' ');
  if (!VENTURES.includes(venture)) {
    console.error(`Venture must be one of: ${VENTURES.join(', ')}`);
    process.exit(1);
  }
  const amount = parseFloat(amountStr);
  if (isNaN(amount)) {
    console.error('Amount must be a number');
    process.exit(1);
  }
  const data = loadData();
  const entry = {
    id: Date.now().toString(36),
    date: new Date().toISOString(),
    month: getMonthKey(),
    venture,
    amount,
    description: description || '(no description)',
  };
  data.entries.push(entry);
  saveData(data);
  console.log(`✅ Logged: ${venture} +$${amount} — "${entry.description}"`);
  console.log(`   ID: ${entry.id}`);
  console.log(`   Date: ${new Date(entry.date).toLocaleString()}`);
}

function cmdShow(args) {
  const data = loadData();
  const showAll = args.includes('all');
  const month = getMonthKey();
  const months = showAll ? [...new Set(data.entries.map((e) => e.month))].sort() : [month];

  for (const m of months) {
    console.log(`\n📅 ${m}\n`);
    const entries = data.entries.filter((e) => e.month === m);
    if (entries.length === 0) {
      console.log('  No entries yet\n');
      continue;
    }
    const byVenture = {};
    for (const e of entries) {
      if (!byVenture[e.venture]) byVenture[e.venture] = [];
      byVenture[e.venture].push(e);
    }
    let totalMonth = 0;
    for (const v of VENTURES) {
      const ventureEntries = byVenture[v] || [];
      const total = ventureEntries.reduce((s, e) => s + e.amount, 0);
      const target = data.targets[v]?.month || 0;
      const progress = target > 0 ? ((total / target) * 100).toFixed(0) : 'N/A';
      totalMonth += total;
      const emoji = total > 0 ? '🟢' : '⚪';
      console.log(`  ${emoji} ${v.padEnd(12)} $${total.toFixed(2).padStart(10)} / $${target.toFixed(0).padStart(6)} (${progress}%)`);
    }
    console.log(`  ${'─'.repeat(40)}`);
    console.log(`  💰 TOTAL          $${totalMonth.toFixed(2).padStart(10)}`);
    console.log();
  }
}

function cmdSummary() {
  const data = loadData();
  console.log('\n💰 HOPE THEORY — REVENUE SUMMARY\n');
  let grandTotal = 0;
  for (const v of VENTURES) {
    const entries = data.entries.filter((e) => e.venture === v);
    const total = entries.reduce((s, e) => s + e.amount, 0);
    const target = data.targets[v]?.month || 0;
    grandTotal += total;
    const bar = '█'.repeat(Math.min(20, Math.floor(total / 100))) || '░';
    console.log(`  ${v.padEnd(12)} $${total.toFixed(0).padStart(8)} / $${target.toString().padStart(5)}/mo  ${bar}`);
  }
  console.log(`  ${'─'.repeat(50)}`);
  console.log(`  ${'TOTAL'.padEnd(12)} $${grandTotal.toFixed(0).padStart(8)}`);
  console.log(`\n📊 ${data.entries.length} total entries logged\n`);
}

const cmd = process.argv[2] || 'help';
const args = process.argv.slice(3);

if (cmd === 'add') cmdAdd(args);
else if (cmd === 'show') cmdShow(args);
else if (cmd === 'summary') cmdSummary();
else {
  console.log(`
💰 Revenue Tracker

Usage: node revenue-tracker.cjs <command> [args]

Commands:
  add <VENTURE> <amount> "<description>"   Log a revenue entry
  show                                     Show this month
  show all                                 Show all months
  summary                                  Show at-a-glance summary

Ventures: ${VENTURES.join(', ')}

Examples:
  node revenue-tracker.cjs add CRYPTO 1500 "BTC trade profit"
  node revenue-tracker.cjs add CODE 800 "Client invoice #42"
  node revenue-tracker.cjs show
  node revenue-tracker.cjs summary
`);
}
