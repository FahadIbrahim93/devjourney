#!/usr/bin/env node
/**
 * revenue-tracker.js — Hope Theory Revenue + Project Pipeline CLI
 * Tracks proposals → conversations → clients → income.
 *
 * Usage:
 *   node revenue-tracker.js income <amount> <client> <project>  # Log income
 *   node revenue-tracker.js expense <amount> <category>          # Log expense
 *   node revenue-tracker.js forecast                             # 90-day forecast
 *   node revenue-tracker.js monthly                              # Monthly summary
 *   node revenue-tracker.js clients                              # Client list
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_FILE = path.join(__dirname, 'revenue_data.json');

function loadData() {
  if (fs.existsSync(DATA_FILE)) {
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  }
  return {
    income: [],
    expenses: [],
    clients: [],
    goals: {
      monthly: 5000,
      yearly: 60000,
    },
  };
}

function saveData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
}

function logIncome(data, args) {
  const [amount, client, project] = args;
  if (!amount) {
    console.log('❌ Usage: node revenue-tracker.js income <amount> <client> <project>');
    return;
  }

  const entry = {
    id: `INC-${Date.now()}`,
    date: new Date().toISOString().split('T')[0],
    amount: parseFloat(amount),
    client: client || 'unknown',
    project: project || 'freelance',
  };

  data.income.push(entry);
  saveData(data);
  console.log(`💰 Income logged: $${entry.amount} from ${entry.client} for ${entry.project}`);
  monthlySummary(data);
}

function logExpense(data, args) {
  const [amount, category] = args;
  if (!amount) {
    console.log('❌ Usage: node revenue-tracker.js expense <amount> <category>');
    return;
  }

  const entry = {
    id: `EXP-${Date.now()}`,
    date: new Date().toISOString().split('T')[0],
    amount: parseFloat(amount),
    category: category || 'general',
  };

  data.expenses.push(entry);
  saveData(data);
  console.log(`💸 Expense logged: $${entry.amount} (${entry.category})`);
}

function monthlySummary(data) {
  const month = new Date().toISOString().slice(0, 7);
  const monthIncome = data.income
    .filter(i => i.date.startsWith(month))
    .reduce((sum, i) => sum + i.amount, 0);
  const monthExpenses = data.expenses
    .filter(e => e.date.startsWith(month))
    .reduce((sum, e) => sum + e.amount, 0);

  console.log(`\n📅 ${month} Summary:`);
  console.log(`   Income:    $${monthIncome.toFixed(2)} / $${data.goals.monthly} target`);
  console.log(`   Expenses:  $${monthExpenses.toFixed(2)}`);
  console.log(`   Net:       $${(monthIncome - monthExpenses).toFixed(2)}`);
  console.log(`   Progress:  ${((monthIncome / data.goals.monthly) * 100).toFixed(1)}%`);

  if (monthIncome === 0) {
    console.log('\n🚨 $0 this month. Activate Upwork/Fiverr. Send 5 proposals TODAY.');
  }
}

function forecast(data) {
  const thisMonth = new Date().toISOString().slice(0, 7);
  const monthIncome = data.income
    .filter(i => i.date.startsWith(month))
    .reduce((sum, i) => sum + i.amount, 0);

  console.log('\n📈 90-DAY REVENUE FORECAST');
  console.log('═══════════════════════════════════════');
  console.log('Scenario A — Conservative (1 client/month @ $1,500)');
  console.log('   Day 30:   $1,500');
  console.log('   Day 60:   $3,000');
  console.log('   Day 90:   $4,500');
  console.log('');
  console.log('Scenario B — Realistic (3 clients/month avg $2,000)');
  console.log('   Day 30:   $6,000');
  console.log('   Day 60:   $12,000');
  console.log('   Day 90:   $18,000');
  console.log('');
  console.log('Scenario C — Stretch (5 clients/month + retainers)');
  console.log('   Day 30:   $15,000');
  console.log('   Day 60:   $30,000');
  console.log('   Day 90:   $50,000+');
  console.log('');
  console.log('🎯 Your Q2 target: $15,000. Scenario B is the goal.');
}

function listClients(data) {
  console.log('\n👥 CLIENTS');
  console.log('═══════════════════════════════════════');
  if (data.clients.length === 0) {
    console.log('   (None yet — first client target: Day 7)');
    return;
  }
  data.clients.forEach(c => {
    console.log(`   • ${c.name} — ${c.project} — $${c.value} (${c.status})`);
  });
}

const command = process.argv[2];
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
  case 'monthly':
    monthlySummary(data);
    break;
  case 'clients':
    listClients(data);
    break;
  default:
    console.log('Usage:');
    console.log('  node revenue-tracker.js income <amount> <client> <project>');
    console.log('  node revenue-tracker.js expense <amount> <category>');
    console.log('  node revenue-tracker.js forecast');
    console.log('  node revenue-tracker.js monthly');
    console.log('  node revenue-tracker.js clients');
}
