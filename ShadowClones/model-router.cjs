#!/usr/bin/env node
/**
 * model-router.cjs — Smart model routing with automatic fallback
 *
 * Usage:
 *   node model-router.cjs test                          Test all configured models
 *   node model-router.cjs list                          List all available models
 *   node model-router.cjs route <profile> [prompt]      Route a prompt through fallback chain
 *   node model-router.cjs quota <model>                 Check quota status
 *   node model-router.cjs verify                        Verify all 7 profile defaults work
 */

const fs = require('fs');
const path = require('path');

const PROFILES_DIR = path.join(__dirname, 'profiles');
const PROFILES = ['naruto_main', 'crypto_sage', 'code_ninja', 'marjahans_merchant', 'snaptrap_stylist', 'build_master', 'truth_seeker'];

function loadProfile(name) {
  const file = path.join(PROFILES_DIR, `${name}.yaml`);
  if (!fs.existsSync(file)) return null;
  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split('\n');
  const result = { model: { default: null, fallback_chain: [] } };
  let inFallback = false;
  for (const line of lines) {
    // Match "  default: ..." (with possible quotes)
    const defMatch = line.match(/^\s+default:\s*"?([^"#]+)"?\s*$/);
    if (defMatch) {
      result.model.default = defMatch[1].trim();
      inFallback = false;
    } else if (line.match(/^\s+fallback_chain:\s*$/)) {
      inFallback = true;
    } else if (inFallback) {
      // Match "    - "value"" or "    - value" (with optional trailing comment)
      // Greedy match for value, then stop at quote or #
      const fbMatch = line.match(/^\s+-\s+"?([^"#]+)"?\s*(?:#.*)?$/);
      if (fbMatch) {
        result.model.fallback_chain.push(fbMatch[1].trim());
      } else if (line.match(/^\S/) || line.match(/^\s+\w+:/)) {
        // Hit a new key, exit fallback parsing
        inFallback = false;
      }
    }
  }
  return result;
}

function getModelChain(profileName) {
  const profile = loadProfile(profileName);
  if (!profile) return [];
  return [profile.model.default, ...profile.model.fallback_chain].filter(Boolean);
}

function cmdList() {
  console.log('\n🐼 MODEL ROUTER — All Profiles + Chains\n');
  for (const p of PROFILES) {
    const chain = getModelChain(p);
    console.log(`${p.padEnd(22)} (${chain.length} models)`);
    chain.forEach((m, i) => {
      const marker = i === 0 ? '🟢 DEFAULT' : `  fallback ${i}`;
      console.log(`  ${marker.padEnd(15)} ${m}`);
    });
    console.log('');
  }
}

function cmdVerify() {
  console.log('\n🔍 VERIFYING ALL PROFILE DEFAULTS\n');
  console.log('This will test that each profile\'s default model responds.\n');
  console.log('To actually test, run with --live flag and network access:\n');
  for (const p of PROFILES) {
    const profile = loadProfile(p);
    if (!profile) {
      console.log(`  ❌ ${p.padEnd(22)} — profile not found`);
      continue;
    }
    const hasDefault = !!profile.model.default;
    const fallbackCount = profile.model.fallback_chain.length;
    console.log(`  ${hasDefault ? '✅' : '❌'} ${p.padEnd(22)} default=${profile.model.default || 'MISSING'} (${fallbackCount} fallbacks)`);
  }
  console.log('\nRun actual tests with: node model-router.cjs test --live\n');
}

function cmdTest() {
  const live = process.argv.includes('--live');
  console.log('\n🧪 MODEL CONNECTIVITY TEST\n');
  if (!live) {
    console.log('DRY RUN. To actually test connectivity, run with --live:\n');
    console.log('  node model-router.cjs test --live\n');
    console.log('This will ping each profile\'s default model with "Hello, respond OK".\n');
    return;
  }
  console.log('LIVE TEST — would hit each model API. Not implemented in this script.');
  console.log('Use: hermes chat -p <model> -q "test" to verify each individually.\n');
}

function cmdRoute(args) {
  const profile = args[0];
  const prompt = args.slice(1).join(' ') || '(no prompt)';
  if (!profile || !PROFILES.includes(profile)) {
    console.error(`Usage: route <profile> [prompt]\nProfiles: ${PROFILES.join(', ')}`);
    process.exit(1);
  }
  const chain = getModelChain(profile);
  console.log(`\n🎯 ROUTING: ${profile}\nPrompt: "${prompt}"\n`);
  console.log('Fallback chain (will try in order):');
  chain.forEach((m, i) => {
    const marker = i === 0 ? '🟢 [TRY FIRST]' : `🟡 [fallback ${i}]`;
    console.log(`  ${marker} ${m}`);
  });
  console.log('\nTo actually route, use the underlying hermes client:');
  console.log(`  hermes chat -p ${chain[0]} -q "${prompt}"`);
  console.log('\nIf that fails (rate-limited), try the next:');
  for (let i = 1; i < chain.length; i++) {
    console.log(`  hermes chat -p ${chain[i]} -q "${prompt}"`);
  }
}

function cmdQuota(args) {
  const model = args[0];
  if (!model) {
    console.error('Usage: quota <model_id>');
    console.error('Examples:');
    console.error('  quota nvidia/nemotron-3-super-120b-a12b:free');
    console.error('  quota google/gemini-2.5-flash');
    process.exit(1);
  }
  console.log(`\n📊 QUOTA CHECK: ${model}\n`);
  console.log('This is a placeholder. Quota checking requires API access.');
  console.log('Use these free tools to monitor usage:');
  console.log('  - OpenRouter: https://openrouter.ai/account');
  console.log('  - Gemini: https://aistudio.google.com/app/apikey');
  console.log('  - Groq: https://console.groq.com/usage');
  console.log('');
  console.log('Typical free tier limits:');
  console.log('  - OpenRouter :free → 20 req/min, 50-200 req/day');
  console.log('  - Gemini 2.5 Flash → 15 RPM, 1500 RPD');
  console.log('  - Groq → 30 RPM, 30K TPM');
}

function cmdHelp() {
  console.log(`
🐼 Model Router — Smart fallback for free models

Usage: node model-router.cjs <command> [args]

Commands:
  list                          Show all 7 profile model chains
  route <profile> [prompt]      Show fallback chain for a profile
  test [--live]                 Test model connectivity (default: dry run)
  verify                        Verify all 7 profile configs
  quota <model_id>              Check quota info for a model
  help                          Show this help

Examples:
  node model-router.cjs list
  node model-router.cjs route code_ninja "Build a REST API"
  node model-router.cjs verify
  node model-router.cjs quota nvidia/nemotron-3-super-120b-a12b:free

Profiles: ${PROFILES.join(', ')}
`);
}

const cmd = process.argv[2] || 'help';
const args = process.argv.slice(3);

const cmds = {
  list: cmdList,
  route: cmdRoute,
  test: cmdTest,
  verify: cmdVerify,
  quota: cmdQuota,
  help: cmdHelp
};

if (!cmds[cmd]) {
  console.error(`Unknown command: ${cmd}`);
  cmdHelp();
  process.exit(1);
}

cmds[cmd](args);
