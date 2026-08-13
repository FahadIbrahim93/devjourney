#!/usr/bin/env node
/**
 * shadow-kanban.js — Cross-clone task coordination
 *
 * The Kanban is the shared "Shadow Network" where all 7 clones see
 * tasks, can claim them, and update status. This is the central nervous
 * system of the Shadow Clone Jutsu.
 *
 * Commands:
 *   node shadow-kanban.js init                    Initialize board
 *   node shadow-kanban.js create <title> ...      Create task
 *   node shadow-kanban.js list [--status X]       List tasks
 *   node shadow-kanban.js claim <id> <clone>      Claim a task
 *   node shadow-kanban.js update <id> <status>    Update status
 *   node shadow-kanban.js view <id>               View details
 *   node shadow-kanban.js assign <id> <clone>     Assign to clone
 *   node shadow-kanban.js stats                   Show board stats
 */

const fs = require('fs');
const path = require('path');
const { randomUUID } = require('crypto');

const BOARD_FILE = path.join(__dirname, 'ShadowKanban.json');
const CLONES = ['naruto_main', 'crypto_sage', 'code_ninja', 'marjahans_merchant', 'snaptrap_stylist', 'build_master', 'truth_seeker'];
const VENTURES = ['CRYPTO', 'CODE', 'MARJAHANS', 'SNAPTRAP', 'BUILD', 'PHILO', 'CROSS'];
const STATUSES = ['backlog', 'todo', 'in_progress', 'review', 'done', 'blocked'];

// ─── Storage helpers ─────────────────────────────────────────────
function loadBoard() {
  if (!fs.existsSync(BOARD_FILE)) {
    return { board: 'Hope Theory Shadow Network', created: new Date().toISOString(), tasks: [] };
  }
  return JSON.parse(fs.readFileSync(BOARD_FILE, 'utf8'));
}

function saveBoard(board) {
  fs.writeFileSync(BOARD_FILE, JSON.stringify(board, null, 2));
}

function printTask(t) {
  const icon = {
    backlog: '📋', todo: '🎯', in_progress: '⚡', review: '👀', done: '✅', blocked: '🚫'
  }[t.status] || '❓';

  console.log(`${icon} [${t.id.slice(0, 8)}] ${t.title}`);
  console.log(`   Status: ${t.status} | Venture: ${t.venture} | Priority: ${t.priority}`);
  if (t.assigned_to) console.log(`   Assigned: ${t.assigned_to}`);
  if (t.claimed_by) console.log(`   Claimed by: ${t.claimed_by}`);
  if (t.due) console.log(`   Due: ${t.due}`);
  if (t.tags && t.tags.length) console.log(`   Tags: ${t.tags.join(', ')}`);
  if (t.description) console.log(`   Description: ${t.description}`);
  if (t.notes) console.log(`   Notes: ${t.notes}`);
  console.log(`   Created: ${t.created_at} | Updated: ${t.updated_at}`);
  console.log('');
}

// ─── Commands ────────────────────────────────────────────────────
function cmdInit() {
  if (fs.existsSync(BOARD_FILE)) {
    console.log('Board already initialized at:', BOARD_FILE);
    return;
  }
  const board = {
    board: 'Hope Theory Shadow Network',
    created: new Date().toISOString(),
    tasks: []
  };
  saveBoard(board);
  console.log('✅ Shadow Kanban board initialized:', BOARD_FILE);
  console.log('\nNext: node shadow-kanban.js create "First task" --venture CRYPTO --assigned crypto_sage');
}

function cmdCreate(args) {
  const title = args[0];
  if (!title) {
    console.error('Usage: create <title> [--venture X] [--assigned X] [--priority X] [--due YYYY-MM-DD] [--tags tag1,tag2] [--description "..."]');
    process.exit(1);
  }

  const opts = parseOpts(args.slice(1));

  const task = {
    id: randomUUID(),
    title,
    venture: opts.venture || 'CROSS',
    assigned_to: opts.assigned || null,
    claimed_by: null,
    priority: opts.priority || 'P2',
    status: 'todo',
    due: opts.due || null,
    tags: opts.tags ? opts.tags.split(',') : [],
    description: opts.description || '',
    notes: '',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };

  const board = loadBoard();
  board.tasks.push(task);
  saveBoard(board);

  console.log(`✅ Task created: ${task.id.slice(0, 8)}`);
  printTask(task);
}

function cmdList(args) {
  const opts = parseOpts(args);
  const status = opts.status;
  const venture = opts.venture;
  const assigned = opts.assigned;

  const board = loadBoard();
  let tasks = board.tasks;

  if (status) tasks = tasks.filter(t => t.status === status);
  if (venture) tasks = tasks.filter(t => t.venture === venture);
  if (assigned) tasks = tasks.filter(t => t.assigned_to === assigned);

  if (tasks.length === 0) {
    console.log('No tasks found. Create one with: node shadow-kanban.js create "..."');
    return;
  }

  // Group by status
  const grouped = {};
  STATUSES.forEach(s => grouped[s] = []);
  tasks.forEach(t => grouped[t.status].push(t));

  for (const status of STATUSES) {
    if (grouped[status].length === 0) continue;
    console.log(`\n═══ ${status.toUpperCase()} (${grouped[status].length}) ═══`);
    grouped[status].forEach(t => {
      const venture = (t.venture || 'CROSS').padEnd(12);
      const assign = (t.assigned_to || 'unassigned').padEnd(22);
      const pri = (t.priority || 'P2').padEnd(3);
      console.log(`  [${t.id.slice(0, 8)}] ${venture} ${pri} ${assign}  ${t.title}`);
    });
  }
  console.log(`\nTotal: ${tasks.length} task(s)`);
}

function cmdClaim(args) {
  const id = args[0];
  const clone = args[1];
  if (!id || !clone) {
    console.error('Usage: claim <task_id> <clone_name>');
    process.exit(1);
  }
  if (!CLONES.includes(clone)) {
    console.error(`Invalid clone. Must be one of: ${CLONES.join(', ')}`);
    process.exit(1);
  }

  const board = loadBoard();
  const task = board.tasks.find(t => t.id.startsWith(id));
  if (!task) {
    console.error(`Task ${id} not found.`);
    process.exit(1);
  }
  if (task.claimed_by) {
    console.log(`Task already claimed by ${task.claimed_by}.`);
    return;
  }
  task.claimed_by = clone;
  task.status = task.status === 'backlog' ? 'todo' : task.status;
  task.updated_at = new Date().toISOString();
  saveBoard(board);
  console.log(`✅ Task ${id} claimed by ${clone}`);
}

function cmdUpdate(args) {
  const id = args[0];
  const newStatus = args[1];
  if (!id || !newStatus) {
    console.error('Usage: update <task_id> <status> [note]');
    process.exit(1);
  }
  if (!STATUSES.includes(newStatus)) {
    console.error(`Invalid status. Must be: ${STATUSES.join(', ')}`);
    process.exit(1);
  }

  const note = args.slice(2).join(' ');

  const board = loadBoard();
  const task = board.tasks.find(t => t.id.startsWith(id));
  if (!task) {
    console.error(`Task ${id} not found.`);
    process.exit(1);
  }
  task.status = newStatus;
  if (note) task.notes = (task.notes ? task.notes + '\n' : '') + `[${new Date().toISOString()}] ${note}`;
  task.updated_at = new Date().toISOString();
  saveBoard(board);
  console.log(`✅ Task ${id} → ${newStatus}`);
  if (note) console.log(`   Note: ${note}`);
}

function cmdView(args) {
  const id = args[0];
  if (!id) {
    console.error('Usage: view <task_id>');
    process.exit(1);
  }
  const board = loadBoard();
  const task = board.tasks.find(t => t.id.startsWith(id));
  if (!task) {
    console.error(`Task ${id} not found.`);
    process.exit(1);
  }
  printTask(task);
}

function cmdAssign(args) {
  const id = args[0];
  const clone = args[1];
  if (!id || !clone) {
    console.error('Usage: assign <task_id> <clone_name>');
    process.exit(1);
  }
  if (!CLONES.includes(clone)) {
    console.error(`Invalid clone. Must be: ${CLONES.join(', ')}`);
    process.exit(1);
  }

  const board = loadBoard();
  const task = board.tasks.find(t => t.id.startsWith(id));
  if (!task) {
    console.error(`Task ${id} not found.`);
    process.exit(1);
  }
  task.assigned_to = clone;
  task.updated_at = new Date().toISOString();
  saveBoard(board);
  console.log(`✅ Task ${id} assigned to ${clone}`);
}

function cmdStats() {
  const board = loadBoard();
  const tasks = board.tasks;
  console.log('\n═══════════════════════════════════════');
  console.log('📊 SHADOW KANBAN STATS');
  console.log('═══════════════════════════════════════');
  console.log(`Total tasks: ${tasks.length}`);

  // By status
  console.log('\nBy status:');
  for (const status of STATUSES) {
    const count = tasks.filter(t => t.status === status).length;
    const pct = tasks.length ? Math.round(count / tasks.length * 100) : 0;
    console.log(`  ${status.padEnd(15)} ${String(count).padStart(4)} (${pct}%)`);
  }

  // By venture
  console.log('\nBy venture:');
  for (const v of VENTURES) {
    const count = tasks.filter(t => t.venture === v).length;
    if (count > 0) console.log(`  ${v.padEnd(15)} ${count}`);
  }

  // By clone
  console.log('\nAssigned to clone:');
  for (const c of CLONES) {
    const count = tasks.filter(t => t.assigned_to === c).length;
    if (count > 0) console.log(`  ${c.padEnd(22)} ${count}`);
  }

  console.log('═══════════════════════════════════════\n');
}

function parseOpts(args) {
  const opts = {};
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg.startsWith('--')) {
      const key = arg.slice(2);
      const val = args[i + 1];
      opts[key] = val;
      i++;
    }
  }
  return opts;
}

// ─── Main ────────────────────────────────────────────────────────
const cmd = process.argv[2];
const args = process.argv.slice(3);

const commands = {
  init: cmdInit,
  create: cmdCreate,
  list: cmdList,
  claim: cmdClaim,
  update: cmdUpdate,
  view: cmdView,
  assign: cmdAssign,
  stats: cmdStats
};

if (!cmd) {
  console.log(`
🐼 Shadow Kanban — Cross-Clone Task Coordination

Usage: node shadow-kanban.js <command> [args]

Commands:
  init                                  Initialize board
  create <title> [opts]                 Create task
  list [--status X] [--venture X]       List tasks
  claim <id> <clone>                    Claim a task
  update <id> <status> [note]           Update status
  view <id>                             View task details
  assign <id> <clone>                   Assign to clone
  stats                                 Show board statistics

Clones: ${CLONES.join(', ')}
Ventures: ${VENTURES.join(', ')}
Statuses: ${STATUSES.join(', ')}

Examples:
  node shadow-kanban.js init
  node shadow-kanban.js create "Daily BTC analysis" --venture CRYPTO --assigned crypto_sage --priority P1
  node shadow-kanban.js claim abc123 crypto_sage
  node shadow-kanban.js update abc123 done "Posted to #ShadowNetwork"
  node shadow-kanban.js list --status todo
  node shadow-kanban.js stats
`);
  process.exit(0);
}

if (!commands[cmd]) {
  console.error(`Unknown command: ${cmd}. Run without args for help.`);
  process.exit(1);
}

commands[cmd](args);
