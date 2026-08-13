#!/usr/bin/env node
/**
 * webhook-deliver.cjs — Push clone outputs to Telegram/Discord/Slack/Ntfy
 *
 * Usage:
 *   node webhook-deliver.cjs test                    Test all configured channels
 *   node webhook-deliver.cjs send "Hello world"      Send a message
 *   node webhook-deliver.cjs daily                   Send daily synthesis
 *   node webhook-deliver.cjs task <id>               Send kanban task update
 *
 * Reads config from ~/.hermes/.env + webhook-config.env.example
 * Quiet hours respected. Always logs to file as fallback.
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const os = require('os');

// ─── Load config ─────────────────────────────────────────────────
const CONFIG_PATHS = [
  path.join(os.homedir(), '.hermes', '.env'),
  path.join(__dirname, 'webhook-config.env.example'),
];

function loadConfig() {
  const env = {};
  for (const p of CONFIG_PATHS) {
    if (!fs.existsSync(p)) continue;
    const content = fs.readFileSync(p, 'utf8');
    for (const line of content.split('\n')) {
      const m = line.match(/^([A-Z_]+)=(.*)$/);
      if (m && !env[m[1]]) env[m[1]] = m[2].replace(/^["']|["']$/g, '');
    }
  }
  return env;
}

const CONFIG = loadConfig();
const CHANNELS = (CONFIG.DELIVERY_CHANNELS || 'ntfy').split(',').map((c) => c.trim());

// ─── HTTP POST helper ────────────────────────────────────────────
function post(url, body, headers = {}) {
  return new Promise((resolve, reject) => {
    const u = new URL(url);
    const data = typeof body === 'string' ? body : JSON.stringify(body);
    const opts = {
      hostname: u.hostname,
      path: u.pathname + u.search,
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(data), ...headers },
    };
    const req = https.request(opts, (res) => {
      let chunks = '';
      res.on('data', (c) => (chunks += c));
      res.on('end', () => resolve({ status: res.statusCode, body: chunks }));
    });
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

// ─── Channel senders ─────────────────────────────────────────────
async function sendTelegram(message) {
  if (!CONFIG.TELEGRAM_BOT_TOKEN || !CONFIG.TELEGRAM_CHAT_ID) return { ok: false, reason: 'not configured' };
  const url = `https://api.telegram.org/bot${CONFIG.TELEGRAM_BOT_TOKEN}/sendMessage`;
  return post(url, { chat_id: CONFIG.TELEGRAM_CHAT_ID, text: message, parse_mode: 'HTML' });
}

async function sendNtfy(message) {
  if (!CONFIG.NTFY_TOPIC) return { ok: false, reason: 'not configured' };
  const url = `https://ntfy.sh/${CONFIG.NTFY_TOPIC}`;
  return post(url, message, { Title: '🐼 Hope Theory Clone' });
}

async function sendDiscord(message) {
  if (!CONFIG.DISCORD_WEBHOOK_URL) return { ok: false, reason: 'not configured' };
  return post(CONFIG.DISCORD_WEBHOOK_URL, { content: message });
}

async function sendSlack(message) {
  if (!CONFIG.SLACK_WEBHOOK_URL) return { ok: false, reason: 'not configured' };
  return post(CONFIG.SLACK_WEBHOOK_URL, { text: message });
}

async function sendWebhook(message) {
  if (!CONFIG.WEBHOOK_SITE_URL) return { ok: false, reason: 'not configured' };
  return post(CONFIG.WEBHOOK_SITE_URL, { message, timestamp: new Date().toISOString() });
}

const SENDERS = {
  telegram: sendTelegram,
  ntfy: sendNtfy,
  discord: sendDiscord,
  slack: sendSlack,
  webhook: sendWebhook,
};

// ─── Quiet hours check ───────────────────────────────────────────
function inQuietHours() {
  if (!CONFIG.QUIET_HOURS_START || !CONFIG.QUIET_HOURS_END) return false;
  const hour = new Date().getHours();
  const start = parseInt(CONFIG.QUIET_HOURS_START, 10);
  const end = parseInt(CONFIG.QUIET_HOURS_END, 10);
  if (start < end) return hour >= start && hour < end;
  return hour >= start || hour < end;
}

// ─── Truncate ────────────────────────────────────────────────────
function truncate(msg, max) {
  if (msg.length <= max) return msg;
  return msg.slice(0, max - 50) + '\n\n... [truncated, full content in log]';
}

// ─── Log to file ─────────────────────────────────────────────────
function logToFile(msg, meta = {}) {
  if (!CONFIG.ALWAYS_LOG_TO_FILE || !CONFIG.LOG_FILE) return;
  const logPath = CONFIG.LOG_FILE.replace(/^~/, os.homedir());
  const dir = path.dirname(logPath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  const entry = {
    timestamp: new Date().toISOString(),
    ...meta,
    message: msg,
  };
  fs.appendFileSync(logPath, JSON.stringify(entry) + '\n');
}

// ─── Main send ───────────────────────────────────────────────────
async function send(message, opts = {}) {
  const msg = truncate(message, parseInt(CONFIG.MAX_MESSAGE_LENGTH || '3500', 10));
  logToFile(msg, { type: 'send', channels: CHANNELS });
  if (inQuietHours() && !opts.force) {
    console.log('⏸️  In quiet hours, message logged only');
    return { ok: true, delivered: 'log' };
  }
  const results = {};
  for (const ch of CHANNELS) {
    const sender = SENDERS[ch];
    if (!sender) {
      results[ch] = { ok: false, reason: 'unknown channel' };
      continue;
    }
    try {
      const res = await sender(msg);
      results[ch] = { ok: res.status >= 200 && res.status < 300, status: res.status };
    } catch (e) {
      results[ch] = { ok: false, error: e.message };
    }
  }
  return { ok: true, results };
}

// ─── CLI commands ────────────────────────────────────────────────
async function cmdTest() {
  console.log('🧪 WEBHOOK DELIVERY TEST\n');
  console.log(`Configured channels: ${CHANNELS.join(', ')}\n`);
  for (const ch of CHANNELS) {
    const sender = SENDERS[ch];
    if (!sender) {
      console.log(`  ❌ ${ch}: unknown channel`);
      continue;
    }
    const configured = (ch === 'telegram' && CONFIG.TELEGRAM_BOT_TOKEN) ||
      (ch === 'ntfy' && CONFIG.NTFY_TOPIC) ||
      (ch === 'discord' && CONFIG.DISCORD_WEBHOOK_URL) ||
      (ch === 'slack' && CONFIG.SLACK_WEBHOOK_URL) ||
      (ch === 'webhook' && CONFIG.WEBHOOK_SITE_URL);
    console.log(`  ${configured ? '✅' : '⚠️ '} ${ch}: ${configured ? 'configured' : 'not configured (see webhook-config.env.example)'}`);
  }
  console.log('\nTo test actual delivery, replace placeholders in webhook-config.env.example and rename to webhook-config.env');
  console.log('Or set env vars: TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID, NTFY_TOPIC, etc.');
  console.log('\nQuickest test: set NTFY_TOPIC=any-unique-name, then install Ntfy app + subscribe to that topic.');
}

async function cmdSend(args) {
  const message = args.join(' ');
  if (!message) {
    console.error('Usage: send "Your message"');
    process.exit(1);
  }
  const result = await send(message, { force: true });
  console.log(JSON.stringify(result, null, 2));
}

async function cmdDaily() {
  const kanbanPath = path.join(__dirname, 'ShadowKanban.json');
  let kanban = { tasks: [] };
  if (fs.existsSync(kanbanPath)) {
    try { kanban = JSON.parse(fs.readFileSync(kanbanPath, 'utf8')); } catch {}
  }
  const todos = kanban.tasks.filter((t) => t.status === 'todo' || t.status === 'in_progress');
  const done = kanban.tasks.filter((t) => t.status === 'done');
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });

  const message = `🐼 *Hope Theory — Daily Synthesis*\n📅 ${today}\n\n📊 *State of the Empire*\n✅ Done: ${done.length}\n⏳ In Progress: ${kanban.tasks.filter((t) => t.status === 'in_progress').length}\n📋 Todo: ${kanban.tasks.filter((t) => t.status === 'todo').length}\n\n🎯 *Top 3 Tasks*\n${todos.slice(0, 3).map((t, i) => `${i + 1}. [${t.venture || 'GENERAL'}] ${t.title}`).join('\n') || 'None right now'}\n\n_Never GIVE UP on your HOPES._ 🐼`;

  const result = await send(message);
  console.log(JSON.stringify(result, null, 2));
}

async function cmdTask(args) {
  const taskId = args[0];
  if (!taskId) {
    console.error('Usage: task <task_id>');
    process.exit(1);
  }
  const kanbanPath = path.join(__dirname, 'ShadowKanban.json');
  if (!fs.existsSync(kanbanPath)) {
    console.error('ShadowKanban.json not found');
    process.exit(1);
  }
  const kanban = JSON.parse(fs.readFileSync(kanbanPath, 'utf8'));
  const task = kanban.tasks.find((t) => t.id === taskId);
  if (!task) {
    console.error(`Task ${taskId} not found`);
    process.exit(1);
  }
  const message = `🎯 *Task Update*\n[${task.venture || 'GENERAL'}] *${task.title}*\nStatus: ${task.status}\nAssigned: ${task.assignedTo || 'unassigned'}\nPriority: ${task.priority || 'P3'}\n\n${task.description || ''}`;
  const result = await send(message);
  console.log(JSON.stringify(result, null, 2));
}

const cmd = process.argv[2] || 'help';
const args = process.argv.slice(3);

const cmds = {
  test: cmdTest,
  send: cmdSend,
  daily: cmdDaily,
  task: cmdTask,
};

if (!cmds[cmd]) {
  console.log(`
🐼 Webhook Deliver — Push clone outputs to messaging channels

Usage: node webhook-deliver.cjs <command> [args]

Commands:
  test                     Test all configured channels
  send "message"           Send a message
  daily                    Send daily synthesis
  task <id>                Send task update

Quickest setup:
  1. Install Ntfy app on phone
  2. Pick a unique topic: HOPE_THEORY_FAHAD
  3. Set env: NTFY_TOPIC=HOPE_THEORY_FAHAD
  4. Run: node webhook-deliver.cjs send "test"
  5. Receive test on phone

Config file: webhook-config.env.example (copy to webhook-config.env)
`);
  process.exit(0);
}

cmds[cmd](args).catch((e) => {
  console.error('Error:', e.message);
  process.exit(1);
});
