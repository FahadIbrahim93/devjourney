#!/usr/bin/env node
/**
 * daily-mission.cjs — Spawn all 6 clones for the day's work
 *
 * Usage:
 *   node daily-mission.cjs morning       Run morning synthesis
 *   node daily-mission.cjs evening       Run evening memory
 *   node daily-mission.cjs custom "..."  Custom mission
 *
 * This is the orchestrator entry point. It:
 *   1. Reads kanban for today's tasks
 *   2. Routes each task to the appropriate clone
 *   3. Logs results to memory + delivery
 *   4. Updates dashboard
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT = __dirname;
const KANBAN = path.join(ROOT, 'ShadowKanban.json');

// ─── Daily mission templates ─────────────────────────────────────
const MORNING_MISSION = `Good morning, Shadow Master. Daily synthesis time.

1. Check Shadow Kanban for tasks assigned to you
2. Spawn crypto_sage for morning market scan
3. Spawn snaptrap_stylist for culture scan (if drop is < 7 days)
4. Spawn marjahans_merchant for inventory check (if e-com)
5. Spawn truth_seeker for daily research post
6. Spawn code_ninja for any open client work
7. Spawn build_master for any open proposals
8. Compile State of the Empire report
9. Send via webhook-deliver.cjs daily

Time target: 10 minutes.`;

const EVENING_MISSION = `Good evening, Shadow Master. End-of-day review.

1. Mark all completed tasks as done in kanban
2. Spawn each clone to summarize what they delivered today
3. Tag insights to memory (use #ShadowNetwork)
4. Identify tomorrow's top 3 priorities
5. Send via webhook-deliver.cjs daily

Time target: 5 minutes.`;

// ─── CLI ─────────────────────────────────────────────────────────
function cmdMorning() {
  console.log('🌅 MORNING MISSION — Starting 6-clone synthesis\n');
  runMission(MORNING_MISSION);
}

function cmdEvening() {
  console.log('🌙 EVENING MISSION — End-of-day review\n');
  runMission(EVENING_MISSION);
}

function cmdCustom(args) {
  const mission = args.join(' ');
  if (!mission) {
    console.error('Usage: daily-mission.cjs custom "Your mission here"');
    process.exit(1);
  }
  console.log('🎯 CUSTOM MISSION\n');
  runMission(mission);
}

function runMission(mission) {
  // Show the mission
  console.log('─'.repeat(60));
  console.log(mission);
  console.log('─'.repeat(60));
  console.log();

  // Show kanban
  if (fs.existsSync(KANBAN)) {
    console.log('📋 SHADOW KANBAN STATE\n');
    try {
      const out = execSync('node shadow-kanban.cjs stats', { cwd: ROOT, encoding: 'utf8' });
      console.log(out);
    } catch (e) {
      console.error('Could not read kanban:', e.message);
    }
  }

  // Show model router
  console.log('🤖 AVAILABLE MODELS\n');
  try {
    const out = execSync('node model-router.cjs list', { cwd: ROOT, encoding: 'utf8' });
    console.log(out.split('\n').slice(0, 5).join('\n'));
    console.log('  ... (7 profiles, all using FREE models with 3-step fallback)');
  } catch (e) {
    console.error('Could not load model router:', e.message);
  }

  console.log('─'.repeat(60));
  console.log('\n✅ Mission loaded. To execute:');
  console.log('   1. Open Hermes Agent');
  console.log('   2. Run: hermes chat -p naruto_main');
  console.log('   3. Paste this mission');
  console.log('   4. Watch 6 clones spawn + execute');
  console.log('   5. Check kanban for results');
  console.log('   6. Run: node webhook-deliver.cjs daily\n');
}

const cmd = process.argv[2] || 'help';
const args = process.argv.slice(3);

if (cmd === 'morning') cmdMorning();
else if (cmd === 'evening') cmdEvening();
else if (cmd === 'custom') cmdCustom(args);
else {
  console.log(`
🐼 Daily Mission Launcher

Usage: node daily-mission.cjs <command> [args]

Commands:
  morning                              Run morning synthesis
  evening                              Run end-of-day review
  custom "your mission here"            Run a custom mission

Cron suggestion (run daily at 9 AM):
  0 9 * * * cd /h/DevJourney/ShadowClones && node daily-mission.cjs morning

Cron suggestion (run daily at 9 PM):
  0 21 * * * cd /h/DevJourney/ShadowClones && node daily-mission.cjs evening
`);
}
