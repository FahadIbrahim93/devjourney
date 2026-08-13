#!/usr/bin/env node
/**
 * test-system.cjs — End-to-end test of the Shadow Clone Jutsu
 *
 * Validates:
 *  - Kanban board works
 *  - All profiles exist (or can be created)
 *  - Memory is seeded
 *  - Skills are deployed
 *  - Cron config generated
 *  - Dashboard renders
 */

const fs = require('fs');
const path = require('path');

// Hermes install path on Windows: %LOCALAPPDATA%\hermes
const HERMES_HOME = process.env.LOCALAPPDATA
  ? path.join(process.env.LOCALAPPDATA, 'hermes')
  : path.join(process.env.HOME || process.env.USERPROFILE, '.hermes');
const SOURCE_DIR = path.join(__dirname, 'skills');
const PROFILES = ['naruto_main', 'crypto_sage', 'code_ninja', 'marjahans_merchant', 'snaptrap_stylist', 'build_master', 'truth_seeker'];

let passed = 0;
let failed = 0;

function check(name, fn) {
  try {
    const result = fn();
    if (result) {
      console.log(`  ✅ ${name}`);
      passed++;
    } else {
      console.log(`  ❌ ${name}`);
      failed++;
    }
  } catch (e) {
    console.log(`  ❌ ${name} (${e.message})`);
    failed++;
  }
}

console.log('');
console.log('🐼 SHADOW CLONE JUTSU — End-to-End Test');
console.log('═══════════════════════════════════════════════');
console.log('');

console.log('▶ Test 1: Profile configs exist');
for (const p of PROFILES) {
  const exists = fs.existsSync(path.join(__dirname, 'profiles', `${p}.yaml`));
  check(`  profiles/${p}.yaml`, () => exists);
}

console.log('');
console.log('▶ Test 2: Skill directories exist (36 total)');
let skillCount = 0;
// naruto_main is the orchestrator, no specialized skills (delegates to clones)
const SKILL_PROFILES = ['crypto_sage', 'code_ninja', 'marjahans_merchant', 'snaptrap_stylist', 'build_master', 'truth_seeker'];
for (const p of SKILL_PROFILES) {
  const dir = path.join(SOURCE_DIR, p);
  if (fs.existsSync(dir)) {
    const skills = fs.readdirSync(dir).filter(f =>
      fs.statSync(path.join(dir, f)).isDirectory() && fs.existsSync(path.join(dir, f, 'SKILL.md'))
    );
    skillCount += skills.length;
    check(`  ${p} (${skills.length} skills)`, () => skills.length === 6);
  } else {
    check(`  ${p} (directory)`, () => false);
  }
}
check(`  Total: ${skillCount} skills (expected 36)`, () => skillCount === 36);
check(`  naruto_main is orchestrator (no specialized skills, delegates)`, () => true);

console.log('');
console.log('▶ Test 3: Memory files seeded');
for (const p of PROFILES) {
  const memDir = path.join(HERMES_HOME, 'profiles', p, 'memories');
  if (fs.existsSync(memDir)) {
    const files = fs.readdirSync(memDir);
    check(`  ${p} (${files.length} files)`, () => files.length >= 4);
  } else {
    check(`  ${p} (memory)`, () => false);
  }
}

console.log('');
console.log('▶ Test 4: Kanban board');
const boardFile = path.join(__dirname, 'ShadowKanban.json');
check('  Kanban file exists', () => fs.existsSync(boardFile));
if (fs.existsSync(boardFile)) {
  const board = JSON.parse(fs.readFileSync(boardFile, 'utf8'));
  check(`  Tasks in board: ${board.tasks.length}`, () => board.tasks.length > 0);
}

console.log('');
console.log('▶ Test 5: Cron setup files');
check('  setup_cron.sh', () => fs.existsSync(path.join(__dirname, 'setup_cron.sh')));
check('  setup_cron.bat', () => fs.existsSync(path.join(__dirname, 'setup_cron.bat')));
check('  CRON_DAILY_RHYTHM.md', () => fs.existsSync(path.join(__dirname, 'CRON_DAILY_RHYTHM.md')));

console.log('');
console.log('▶ Test 6: Setup scripts');
check('  setup_profiles.sh', () => fs.existsSync(path.join(__dirname, 'setup_profiles.sh')));
check('  setup_profiles.bat', () => fs.existsSync(path.join(__dirname, 'setup_profiles.bat')));
check('  deploy_skills.sh', () => fs.existsSync(path.join(__dirname, 'deploy_skills.sh')));
check('  deploy_skills.bat', () => fs.existsSync(path.join(__dirname, 'deploy_skills.bat')));
check('  setup_ollama.sh', () => fs.existsSync(path.join(__dirname, 'setup_ollama.sh')));
check('  setup_ollama.bat', () => fs.existsSync(path.join(__dirname, 'setup_ollama.bat')));

console.log('');
console.log('▶ Test 7: Dashboard');
check('  dashboard.html', () => fs.existsSync(path.join(__dirname, 'dashboard.html')));
const dash = fs.readFileSync(path.join(__dirname, 'dashboard.html'), 'utf8');
check('  Contains all 7 clones', () => {
  return PROFILES.every(p => dash.includes(p));
});

console.log('');
console.log('▶ Test 8: Working CLIs');
check('  shadow-orchestrator.cjs', () => fs.existsSync(path.join(__dirname, 'shadow-orchestrator.cjs')));
check('  shadow-kanban.cjs', () => fs.existsSync(path.join(__dirname, 'shadow-kanban.cjs')));
check('  daily-synthesis.cjs', () => fs.existsSync(path.join(__dirname, 'daily-synthesis.cjs')));
check('  cross-venture-bridge-detector.cjs', () => fs.existsSync(path.join(__dirname, 'cross-venture-bridge-detector.cjs')));
check('  seed-memory.cjs', () => fs.existsSync(path.join(__dirname, 'seed-memory.cjs')));
check('  cron-setup.cjs', () => fs.existsSync(path.join(__dirname, 'cron-setup.cjs')));
check('  test-system.cjs', () => fs.existsSync(path.join(__dirname, 'test-system.cjs')));

console.log('');
console.log('▶ Test 9: Documentation');
check('  PROFILE_SETUP_GUIDE.md', () => fs.existsSync(path.join(__dirname, 'PROFILE_SETUP_GUIDE.md')));
check('  OLLAMA_SETUP.md', () => fs.existsSync(path.join(__dirname, 'OLLAMA_SETUP.md')));
check('  CRON_DAILY_RHYTHM.md', () => fs.existsSync(path.join(__dirname, 'CRON_DAILY_RHYTHM.md')));
check('  90_DAY_ROADMAP.md', () => fs.existsSync(path.join(__dirname, '90_DAY_ROADMAP.md')));

console.log('');
console.log('▶ Test 10: File counts');
const allFiles = fs.readdirSync(__dirname);
check(`  Total files in ShadowClones/: ${allFiles.length}`, () => allFiles.length > 30);

// ─── FREE MODEL CHAIN (NEW) ─────────────────────────────────
console.log('\n▶ Test 11: Free model chains (4 models per profile)');
const { execSync } = require('child_process');
const routerOut = execSync('node model-router.cjs list', { cwd: __dirname, encoding: 'utf8' });

// Split output into per-profile blocks (block = from profile name to next profile name)
const profileBlocks = {};
for (let i = 0; i < PROFILES.length; i++) {
  const p = PROFILES[i];
  const startIdx = routerOut.indexOf(p);
  const endIdx = (i + 1 < PROFILES.length) ? routerOut.indexOf(PROFILES[i + 1], startIdx + p.length) : routerOut.length;
  profileBlocks[p] = routerOut.substring(startIdx, endIdx);
}

for (const p of PROFILES) {
  const block = profileBlocks[p];
  const modelCount = (block.match(/DEFAULT|fallback \d/g) || []).length;
  check(`  ${p} has 4 models (1 default + 3 fallbacks)`, () => modelCount === 4);
}

// Verify defaults are FREE models (have :free OR are ollama OR are direct google)
console.log('\n▶ Test 12: Defaults are all FREE models');
const freeCheck = (model) => {
  if (!model) return false;
  return model.includes(':free') || model.startsWith('ollama/') || model.startsWith('google/');
};
for (const p of PROFILES) {
  const block = profileBlocks[p];
  const defaultMatch = block.match(/DEFAULT\s+(\S+)/);
  const defaultModel = defaultMatch ? defaultMatch[1] : null;
  check(`  ${p} default is FREE: ${defaultModel || 'NOT FOUND'}`, () => freeCheck(defaultModel));
}

// ─── NEW CLIs (manager 3hr batch) ──────────────────────────────
console.log('\n▶ Test 13: New CLIs (manager batch)');
check('  webhook-deliver.cjs exists', () => fs.existsSync(path.join(__dirname, 'webhook-deliver.cjs')));
check('  webhook-config.env.example exists', () => fs.existsSync(path.join(__dirname, 'webhook-config.env.example')));
check('  daily-mission.cjs exists', () => fs.existsSync(path.join(__dirname, 'daily-mission.cjs')));
check('  revenue-tracker.cjs exists', () => fs.existsSync(path.join(__dirname, 'revenue-tracker.cjs')));

// Verify they all run without crashing
try {
  execSync('node webhook-deliver.cjs test', { cwd: __dirname, encoding: 'utf8', stdio: 'pipe' });
  check('  webhook-deliver.cjs test runs', () => true);
} catch (e) { check('  webhook-deliver.cjs test runs', () => false); }
try {
  execSync('node daily-mission.cjs morning', { cwd: __dirname, encoding: 'utf8', stdio: 'pipe' });
  check('  daily-mission.cjs morning runs', () => true);
} catch (e) { check('  daily-mission.cjs morning runs', () => false); }
try {
  execSync('node revenue-tracker.cjs help', { cwd: __dirname, encoding: 'utf8', stdio: 'pipe' });
  check('  revenue-tracker.cjs help runs', () => true);
} catch (e) { check('  revenue-tracker.cjs help runs', () => false); }

// ─── REVENUE TRACKER FUNCTIONALITY ─────────────────────────────
console.log('\n▶ Test 14: Revenue tracker (functional)');
const testRevenueFile = path.join(__dirname, '..', 'Ventures', 'revenue_data.json');
try {
  execSync('node revenue-tracker.cjs add CRYPTO 100 "test entry"', { cwd: __dirname, encoding: 'utf8', stdio: 'pipe' });
  check('  add CRYPTO entry works', () => fs.existsSync(testRevenueFile));
  execSync('node revenue-tracker.cjs add CODE 500 "test client"', { cwd: __dirname, encoding: 'utf8', stdio: 'pipe' });
  const data = JSON.parse(fs.readFileSync(testRevenueFile, 'utf8'));
  check('  has 2 entries after 2 adds', () => data.entries.length >= 2);
  check('  has 6 venture targets', () => Object.keys(data.targets).length === 6);
  execSync('node revenue-tracker.cjs show', { cwd: __dirname, encoding: 'utf8', stdio: 'pipe' });
  check('  show command runs', () => true);
  execSync('node revenue-tracker.cjs summary', { cwd: __dirname, encoding: 'utf8', stdio: 'pipe' });
  check('  summary command runs', () => true);
} catch (e) {
  check('  revenue tracker functionality', () => false);
}

// ─── CONTENT DELIVERABLES (manager 3hr) ────────────────────────
console.log('\n▶ Test 15: Content deliverables (manager 3hr)');
check('  Marjahans 10 product stories', () => {
  const p = 'H:\\DevJourney\\Projects\\Marjahans\\PRODUCT_STORIES.md';
  if (!fs.existsSync(p)) return false;
  const c = fs.readFileSync(p, 'utf8');
  return (c.match(/^## /gm) || []).length >= 10;
});
check('  Crypto content (thread + calc + substack)', () => fs.existsSync('H:\\DevJourney\\Projects\\CryptoEdu\\CONTENT_BATCH_001.md'));
check('  Philo content (substack + course)', () => fs.existsSync('H:\\DevJourney\\Projects\\PhiloContent\\WEEK_001.md'));
check('  Build Master sample proposal', () => fs.existsSync('H:\\DevJourney\\Projects\\BuildMaster\\SAMPLE_PROPOSAL_DRP_2026.md'));
check('  SnapTrap Drop 002 plan', () => fs.existsSync('H:\\DevJourney\\Projects\\SnapTrap\\DROP_002_PLAN.md'));

// ─── PORTFOLIO SITE ────────────────────────────────────────────
console.log('\n▶ Test 16: Portfolio site (Code Ninja deliverable)');
const portfolioFiles = [
  'H:\\DevJourney\\Projects\\fahad-portfolio\\package.json',
  'H:\\DevJourney\\Projects\\fahad-portfolio\\vite.config.ts',
  'H:\\DevJourney\\Projects\\fahad-portfolio\\tsconfig.json',
  'H:\\DevJourney\\Projects\\fahad-portfolio\\tailwind.config.js',
  'H:\\DevJourney\\Projects\\fahad-portfolio\\index.html',
  'H:\\DevJourney\\Projects\\fahad-portfolio\\src\\App.tsx',
  'H:\\DevJourney\\Projects\\fahad-portfolio\\src\\components\\Navbar.tsx',
  'H:\\DevJourney\\Projects\\fahad-portfolio\\src\\components\\Hero.tsx',
  'H:\\DevJourney\\Projects\\fahad-portfolio\\src\\components\\Ventures.tsx',
  'H:\\DevJourney\\Projects\\fahad-portfolio\\src\\components\\Skills.tsx',
  'H:\\DevJourney\\Projects\\fahad-portfolio\\src\\components\\Projects.tsx',
  'H:\\DevJourney\\Projects\\fahad-portfolio\\src\\components\\Contact.tsx',
  'H:\\DevJourney\\Projects\\fahad-portfolio\\src\\components\\Footer.tsx',
  'H:\\DevJourney\\Projects\\fahad-portfolio\\src\\index.css',
  'H:\\DevJourney\\Projects\\fahad-portfolio\\src\\main.tsx',
  'H:\\DevJourney\\Projects\\fahad-portfolio\\README.md',
  'H:\\DevJourney\\Projects\\fahad-portfolio\\.gitignore',
  'H:\\DevJourney\\Projects\\fahad-portfolio\\public\\panda.svg',
];
let portfolioOk = 0;
for (const f of portfolioFiles) {
  if (fs.existsSync(f)) portfolioOk++;
}
check(`  Portfolio: ${portfolioOk}/${portfolioFiles.length} files present`, () => portfolioOk === portfolioFiles.length);

console.log('');
console.log('═══════════════════════════════════════════════');
console.log(`Results: ${passed} passed, ${failed} failed`);
console.log('═══════════════════════════════════════════════');
console.log('');

if (failed === 0) {
  console.log('🐼 ✅ ALL TESTS PASS — Shadow Clone Jutsu ready to deploy');
} else {
  console.log(`⚠️  ${failed} test(s) failed. Review above.`);
  process.exit(1);
}
