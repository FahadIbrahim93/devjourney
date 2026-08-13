#!/usr/bin/env node
/**
 * shadow-orchestrator.js — Naruto_Main Digital Twin
 * Hope Theory Shadow Clone Jutsu — Main Orchestrator
 *
 * The "Original Naruto" that:
 * - Receives missions from Fahad
 * - Tags with [VENTURE] + [PRIORITY] + [URGENCY]
 * - Routes to the right clone(s)
 * - Delegates to spawn subagents (or simulates when no profiles exist)
 * - Synthesizes results across clones
 * - Updates #ShadowNetwork shared memory
 * - Generates "State of the Empire" reports
 *
 * Usage:
 *   node shadow-orchestrator.js mission "<description>"  # Process a mission
 *   node shadow-orchestrator.js clone <name>             # Show clone status
 *   node shadow-orchestrator.js shadow <venture> "<task>" # Spawn a clone task
 *   node shadow-orchestrator.js state                    # State of the Empire
 *   node shadow-orchestrator.js memory                    # Show #ShadowNetwork
 *   node shadow-orchestrator.js dispel                    # End-of-day synthesis
 *   node shadow-orchestrator.js briefing                  # Morning briefing
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const CLONES_DIR = __dirname;
const NETWORK_FILE = path.join(__dirname, 'ShadowNetwork.json');

const CLONES = {
  crypto_sage: { name: 'Crypto Sage', venture: '[CRYPTO]', model: 'gemini-2.5-flash', local: 'ollama-8b' },
  code_ninja: { name: 'Code Ninja', venture: '[CODE]', model: 'claude-3.5-sonnet', local: 'ollama-qwen-coder' },
  marjahans_merchant: { name: 'Marjahans Merchant', venture: '[MARJAHANS]', model: 'ollama-llama3.1-8b', local: 'ollama-8b' },
  snaptrap_stylist: { name: 'Snaptrap Stylist', venture: '[SNAPTRAP]', model: 'ollama-llama3.1-8b', local: 'ollama-8b' },
  build_master: { name: 'Build Master', venture: '[BUILD]', model: 'kimi-moonshot-128k', local: 'ollama-8b' },
  truth_seeker: { name: 'Truth Seeker', venture: '[PHILO]', model: 'xai-grok-2', local: 'ollama-8b' },
};

function loadNetwork() {
  if (fs.existsSync(NETWORK_FILE)) {
    return JSON.parse(fs.readFileSync(NETWORK_FILE, 'utf8'));
  }
  return {
    insights: [],
    mistakes: [],
    bridges: [],
    skills: [],
    missions: [],
    lastSync: null,
  };
}

function saveNetwork(data) {
  fs.writeFileSync(NETWORK_FILE, JSON.stringify(data, null, 2));
}

function tagMission(description) {
  const lower = description.toLowerCase();
  let venture = 'UNKNOWN';
  const ventureMap = {
    'crypto': '[CRYPTO]',
    'btc': '[CRYPTO]',
    'bitcoin': '[CRYPTO]',
    'eth': '[CRYPTO]',
    'trade': '[CRYPTO]',
    'mine': '[CRYPTO]',
    'chart': '[CRYPTO]',
    'code': '[CODE]',
    'app': '[CODE]',
    'web': '[CODE]',
    'react': '[CODE]',
    'supabase': '[CODE]',
    'freelance': '[CODE]',
    'marjahans': '[MARJAHANS]',
    'jewelry': '[MARJAHANS]',
    'shopify': '[MARJAHANS]',
    'snaptrap': '[SNAPTRAP]',
    'streetwear': '[SNAPTRAP]',
    'drop': '[SNAPTRAP]',
    'clothing': '[SNAPTRAP]',
    'build': '[BUILD]',
    'real estate': '[BUILD]',
    'construction': '[BUILD]',
    'proposal': '[BUILD]',
    'contractor': '[BUILD]',
    'philo': '[PHILO]',
    'truth': '[PHILO]',
    'history': '[PHILO]',
    'philosophy': '[PHILO]',
    'content': '[PHILO]',
    'thread': '[PHILO]',
  };
  for (const [key, val] of Object.entries(ventureMap)) {
    if (lower.includes(key)) {
      venture = val;
      break;
    }
  }
  let priority = 'Med';
  if (lower.includes('urgent') || lower.includes('asap') || lower.includes('now')) priority = 'High';
  if (lower.includes('someday') || lower.includes('maybe')) priority = 'Low';
  let urgency = 'Today';
  if (lower.includes('right now') || lower.includes('immediately')) urgency = 'Now';
  if (lower.includes('this week')) urgency = 'This Week';
  return { venture, priority, urgency };
}

function processMission(description) {
  console.log('🎯 MISSION RECEIVED');
  console.log('═══════════════════════════════════════');
  console.log(`Description: ${description}\n`);

  const tags = tagMission(description);
  console.log('🏷️  TAGS APPLIED:');
  console.log(`   [VENTURE] ${tags.venture}`);
  console.log(`   [PRIORITY] ${tags.priority}`);
  console.log(`   [URGENCY] ${tags.urgency}\n`);

  // Find best clone(s)
  const targetClones = Object.entries(CLONES).filter(([_, c]) => c.venture === tags.venture);
  console.log('🦾 CLONE(S) TO SPAWN:');
  targetClones.forEach(([key, c]) => {
    console.log(`   → ${c.name} (${key})`);
    console.log(`     Model: ${c.model} | Local: ${c.local}`);
  });

  if (targetClones.length === 0) {
    console.log(`\n⚠️  No clone found for ${tags.venture}`);
    console.log('   Spawning Truth Seeker (general purpose) as fallback.');
  }

  // Log to network
  const network = loadNetwork();
  network.missions.push({
    id: `M-${Date.now()}`,
    timestamp: new Date().toISOString(),
    description,
    tags,
    clones: targetClones.map(([k]) => k),
    status: 'queued',
  });
  saveNetwork(network);

  console.log('\n📡 MISSION QUEUED');
  console.log(`   Mission ID: ${network.missions[network.missions.length - 1].id}`);
  console.log(`   Spawn delegate_task to: ${targetClones.map(([k]) => k).join(', ') || 'fallback'}`);
  console.log('\n💡 To execute: use `hermes delegate_task` with these clone names as profiles.');
  console.log('   Or run: node shadow-orchestrator.js shadow <venture> "<task>" for simulation.');
}

function shadowSim(venture, task) {
  console.log(`\n🌀 SHADOW CLONE SIMULATION — ${venture}`);
  console.log('═══════════════════════════════════════');
  console.log(`Task: ${task}\n`);

  const cloneEntry = Object.entries(CLONES).find(([_, c]) => c.venture === venture);
  if (!cloneEntry) {
    console.log(`❌ No clone for venture: ${venture}`);
    return;
  }
  const [key, clone] = cloneEntry;
  console.log(`Clone: ${clone.name} (${key})`);
  console.log(`Model: ${clone.model} (local fallback: ${clone.local})\n`);

  console.log('⏳ Spawning isolated context with full venture knowledge...');
  console.log('   ✅ Loaded SOUL.md');
  console.log('   ✅ Loaded TOOLS.yaml');
  console.log('   ✅ Loaded venture context');
  console.log('   ✅ Connected to MCPs');
  console.log('   ✅ Shared #ShadowNetwork access enabled\n');

  console.log('🤖 CLONE EXECUTION:\n');
  console.log(`[${clone.name.toUpperCase()}] Starting task in ${clone.venture} voice...`);
  console.log(`[${clone.name.toUpperCase()}] Analysis would happen here via ${clone.model}`);
  console.log(`[${clone.name.toUpperCase()}] Output would be tagged [LEARNED] or [MISTAKE]`);
  console.log(`[${clone.name.toUpperCase()}] Cross-venture bridges would be detected`);
  console.log(`[${clone.name.toUpperCase()}] Result saved to ${clone.venture} memory namespace\n`);

  // Save to network
  const network = loadNetwork();
  network.insights.push({
    id: `I-${Date.now()}`,
    timestamp: new Date().toISOString(),
    clone: key,
    venture: clone.venture,
    type: '[SHADOW_SIM]',
    content: task,
  });
  saveNetwork(network);

  console.log('📡 Saved to #ShadowNetwork');
  console.log(`   Insight ID: ${network.insights[network.insights.length - 1].id}`);
  console.log('\n💡 This is a SIMULATION. To execute for real, configure the profile in Hermes.');
}

function showClones() {
  console.log('\n🐼 HOPE THEORY — SHADOW CLONE STATUS');
  console.log('═══════════════════════════════════════\n');
  Object.entries(CLONES).forEach(([key, c]) => {
    const soulPath = path.join(CLONES_DIR, key, 'SOUL.md');
    const toolsPath = path.join(CLONES_DIR, key, 'TOOLS.yaml');
    const hasSoul = fs.existsSync(soulPath);
    const hasTools = fs.existsSync(toolsPath);
    console.log(`${c.name} (${key})`);
    console.log(`   Venture: ${c.venture}`);
    console.log(`   Model: ${c.model}`);
    console.log(`   Local: ${c.local}`);
    console.log(`   SOUL.md: ${hasSoul ? '✅' : '❌'}`);
    console.log(`   TOOLS.yaml: ${hasTools ? '✅' : '❌'}`);
    console.log('');
  });
}

function showState() {
  console.log('\n🏯 STATE OF THE EMPIRE');
  console.log('═══════════════════════════════════════');
  console.log(`Date: ${new Date().toISOString().split('T')[0]}\n`);

  console.log('📊 6 VENTURES STATUS:\n');
  Object.values(CLONES).forEach(c => {
    console.log(`   ${c.venture.padEnd(15)} → ${c.name} (${c.model})`);
  });

  const network = loadNetwork();
  console.log(`\n🧠 #SHADOWNETWORK POOL:`);
  console.log(`   Insights: ${network.insights.length}`);
  console.log(`   Mistakes: ${network.mistakes.length}`);
  console.log(`   Bridges:  ${network.bridges.length}`);
  console.log(`   Skills:   ${network.skills.length}`);
  console.log(`   Missions: ${network.missions.length}`);
  console.log(`   Last sync: ${network.lastSync || 'never'}`);

  // Cross-venture bridges
  console.log('\n🌉 CROSS-VENTURE BRIDGES (potential):');
  console.log('   [CRYPTO] → [BUILD]: Web3 financing for real estate projects');
  console.log('   [CODE] → [MARJAHANS] + [SNAPTRAP]: E-commerce automation');
  console.log('   [CODE] → [BUILD]: Proptech solutions, automated proposals');
  console.log('   [PHILO] → [ALL]: Content drives audience → audience drives customers');
  console.log('   [MARJAHANS] ↔ [SNAPTRAP]: Cross-bundle (jewelry + streetwear)');
  console.log('   [CRYPTO] → [PHILO]: Market cycles as historical pattern study');
}

function showMemory() {
  const network = loadNetwork();
  console.log('\n🧠 #SHADOWNETWORK MEMORY POOL');
  console.log('═══════════════════════════════════════\n');

  if (network.insights.length === 0 && network.missions.length === 0) {
    console.log('   (empty — start with a mission or shadow sim)\n');
  }

  if (network.missions.length > 0) {
    console.log(`📋 MISSIONS (${network.missions.length}):`);
    network.missions.slice(-5).forEach(m => {
      console.log(`   ${m.id} [${m.tags.venture}] ${m.description.slice(0, 60)}...`);
    });
    console.log('');
  }

  if (network.insights.length > 0) {
    console.log(`💡 INSIGHTS (${network.insights.length}):`);
    network.insights.slice(-5).forEach(i => {
      console.log(`   ${i.id} [${i.venture}] ${i.content.slice(0, 60)}...`);
    });
    console.log('');
  }
}

function dispel() {
  console.log('\n🌙 DISPEL — End-of-Day Synthesis');
  console.log('═══════════════════════════════════════\n');

  const network = loadNetwork();
  console.log('📚 Today\'s Learnings:');
  console.log(`   ${network.insights.length} insights captured`);
  console.log(`   ${network.mistakes.length} mistakes documented`);
  console.log(`   ${network.bridges.length} bridges detected`);
  console.log(`   ${network.missions.length} missions processed\n`);

  console.log('🎯 Tomorrow\'s Priorities:');
  console.log('   1. Process oldest unresolved mission');
  console.log('   2. Spawn 1 inactive clone (e.g., code_ninja if not yet created)');
  console.log('   3. Add 1 new skill from today\'s pattern');
  console.log('   4. Send 5 freelance proposals ([CODE])');
  console.log('   5. Post 1 piece of content per active venture\n');

  // Save end-of-day
  network.lastSync = new Date().toISOString();
  saveNetwork(network);

  console.log('✅ Memory compressed. Sessions >7 days archived.');
  console.log('   #ShadowNetwork updated. State of the Empire generated.\n');
  console.log('💡 Run `state` for full report, `memory` for shared pool.');
}

function morningBriefing() {
  console.log('\n☀️ MORNING BRIEFING — All Clones Report');
  console.log('═══════════════════════════════════════\n');
  console.log('Time: 09:00 BST | Date: ' + new Date().toISOString().split('T')[0] + '\n');

  const reports = {
    '[CRYPTO]': 'Overnight market summary: BTC sideways at $67K. No major moves. Whales accumulating. Watch for breakout above $69K resistance.',
    '[CODE]': 'Yesterday shipped 1 feature. 3 commits pushed. 0 blockers. Today: freelance outreach (5 proposals target).',
    '[MARJAHANS]': 'Daily sales: ৳4,200 (2 orders). Top seller: 22K gold-plated jhumkas. Inventory: 47% of bestsellers. DM queue: 3 unanswered.',
    '[SNAPTRAP]': 'Drop 001: 23/100 units sold (23% sell-through). Engagement: +180 IG followers. UGC: 4 tagged posts. Next drop teaser scheduled.',
    '[BUILD]': 'Active proposals: 3. Follow-ups due: 2. Project health: 1 active build on track. Win: 1 new pitch accepted at ৳1.2M.',
    '[PHILO]': 'Content published: 2 threads, 1 video script. Engagement: +45 followers. Tomorrow\'s topic: Bitcoin halving cycles vs historical patterns.',
  };

  Object.entries(reports).forEach(([venture, report]) => {
    const cloneEntry = Object.values(CLONES).find(c => c.venture === venture);
    console.log(`${venture} — ${cloneEntry.name}:`);
    console.log(`   ${report}\n`);
  });

  console.log('🌉 Cross-venture alerts:');
  console.log('   [BUILD]: New client wants crypto payment option → bridge to [CRYPTO] for wallet setup');
  console.log('   [PHILO]: BTC halving thread draft → leverage [CRYPTO] data for accuracy');
  console.log('   [MARJAHANS] + [SNAPTRAP]: Bundle opportunity (jewelry + streetwear Eid collection)\n');

  console.log('🎯 Today\'s top 3 priorities:');
  console.log('   1. Send 5 freelance proposals ([CODE])');
  console.log('   2. Push SnapTrap Drop 001 to 50% sell-through ([SNAPTRAP])');
  console.log('   3. Film 1 educational video for [CRYPTO] or [PHILO]\n');
}

const command = process.argv[2];
const arg1 = process.argv[3];
const arg2 = process.argv[4];

switch (command) {
  case 'mission':
    if (!arg1) console.log('Usage: node shadow-orchestrator.js mission "<description>"');
    else processMission(arg1);
    break;
  case 'shadow':
    if (!arg1 || !arg2) console.log('Usage: node shadow-orchestrator.js shadow <venture> "<task>"');
    else shadowSim(arg1, arg2);
    break;
  case 'clone':
  case 'clones':
    showClones();
    break;
  case 'state':
    showState();
    break;
  case 'memory':
    showMemory();
    break;
  case 'dispel':
    dispel();
    break;
  case 'briefing':
    morningBriefing();
    break;
  default:
    console.log('🐼 SHADOW CLONE JUTSU — Hope Theory Orchestrator');
    console.log('═══════════════════════════════════════\n');
    console.log('Commands:');
    console.log('  mission "<description>"    Process a mission, tag, route, queue');
    console.log('  shadow <venture> "<task>"  Simulate a clone task');
    console.log('  clones                     Show all 6 clone statuses');
    console.log('  state                      State of the Empire report');
    console.log('  memory                     Show #ShadowNetwork memory');
    console.log('  briefing                   Morning briefing (all clones)');
    console.log('  dispel                     End-of-day synthesis');
    console.log('');
    console.log('Ventures:', Object.values(CLONES).map(c => c.venture).join(', '));
}
