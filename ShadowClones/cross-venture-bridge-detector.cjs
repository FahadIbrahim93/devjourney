#!/usr/bin/env node
/**
 * cross-venture-bridge-detector.js
 * Detects connections between the 6 ventures based on insights in #ShadowNetwork.
 *
 * Usage:
 *   node cross-venture-bridge-detector.js scan         # Scan for bridges
 *   node cross-venture-bridge-detector.js report       # Show all bridges
 *   node cross-venture-bridge-detector.js suggest      # Suggest new bridges
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const NETWORK_FILE = path.join(__dirname, 'ShadowNetwork.json');

const BRIDGE_PATTERNS = {
  '[CRYPTO]→[BUILD]': {
    keywords: ['web3', 'financing', 'tokenization', 'defi', 'real estate', 'property', 'crypto payment'],
    description: 'Web3 financing models for real estate projects. Crypto payments for premium contracts.',
  },
  '[CRYPTO]→[PHILO]': {
    keywords: ['history', 'cycle', 'pattern', 'philosophy', 'macro', 'human nature'],
    description: 'Crypto cycles as historical pattern study. Macro trends through philosophy lens.',
  },
  '[CODE]→[MARJAHANS]': {
    keywords: ['shopify', 'automation', 'inventory', 'e-commerce', 'klaviyo', 'product page'],
    description: 'E-commerce automation for Marjahans. Custom analytics, auto-content generation.',
  },
  '[CODE]→[SNAPTRAP]': {
    keywords: ['drop', 'streetwear', 'teaser', 'countdown', 'community', 'automation'],
    description: 'Drop automation tools. Auto-teaser generation, countdown bots, UGC curation.',
  },
  '[CODE]→[BUILD]': {
    keywords: ['proposal', 'cost estimator', 'proptech', 'project management', 'automation'],
    description: 'Proptech solutions. Auto-generated proposals, cost calculators, project trackers.',
  },
  '[CODE]→[PHILO]': {
    keywords: ['content engine', 'thread', 'newsletter', 'audience', 'automation'],
    description: 'Content automation. Thread generators, newsletter tools, audience analysis.',
  },
  '[MARJAHANS]↔[SNAPTRAP]': {
    keywords: ['bundle', 'collab', 'fashion', 'jewelry', 'streetwear', 'eid collection'],
    description: 'Cross-bundle opportunities. Jewelry + streetwear collections. Shared influencers.',
  },
  '[MARJAHANS]→[BUILD]': {
    keywords: ['corporate gift', 'client gift', 'premium', 'b2b'],
    description: 'Corporate gifting. Premium jewelry for [BUILD] clients. B2B catalog.',
  },
  '[SNAPTRAP]→[BUILD]': {
    keywords: ['uniform', 'merch', 'hustle', 'construction', 'streetwear'],
    description: '"Hustle Uniform" — construction worker + streetwear collection. Branded merch.',
  },
  '[PHILO]→[ALL]': {
    keywords: ['content', 'audience', 'storytelling', 'purpose', 'meaning'],
    description: 'Content drives audience → audience drives customers → customers fund growth.',
  },
};

function loadNetwork() {
  if (fs.existsSync(NETWORK_FILE)) {
    return JSON.parse(fs.readFileSync(NETWORK_FILE, 'utf8'));
  }
  return { insights: [], mistakes: [], bridges: [], skills: [], missions: [] };
}

function detectBridges(network) {
  const detected = [];
  for (const pattern of Object.values(BRIDGE_PATTERNS)) {
    const matches = [];
    for (const insight of network.insights) {
      const text = `${insight.content || ''} ${insight.venture || ''}`.toLowerCase();
      const found = pattern.keywords.filter(kw => text.includes(kw.toLowerCase()));
      if (found.length >= 2) {
        matches.push({ insight, keywords: found });
      }
    }
    if (matches.length > 0) {
      detected.push({
        pattern: Object.keys(BRIDGE_PATTERNS).find(k => BRIDGE_PATTERNS[k] === pattern),
        description: pattern.description,
        matches: matches.length,
        keywords: [...new Set(matches.flatMap(m => m.keywords))],
        insights: matches.map(m => m.insight.id),
      });
    }
  }
  return detected;
}

function scan() {
  const network = loadNetwork();
  console.log('\n🌉 CROSS-VENTURE BRIDGE SCANNER');
  console.log('═══════════════════════════════════════\n');

  console.log(`Scanning ${network.insights.length} insights...\n`);

  const detected = detectBridges(network);

  if (detected.length === 0) {
    console.log('No bridges detected yet. Add more insights via `mission` or `shadow`.\n');
    console.log('💡 HINT: Bridges need 2+ keyword matches from same pattern in your insights.');
    return;
  }

  console.log(`Found ${detected.length} potential bridges:\n`);
  detected.forEach((b, i) => {
    console.log(`${i + 1}. ${b.pattern}`);
    console.log(`   ${b.description}`);
    console.log(`   Matches: ${b.matches} | Keywords: ${b.keywords.join(', ')}`);
    console.log('');
  });

  // Save to network
  network.bridges = detected;
  fs.writeFileSync(NETWORK_FILE, JSON.stringify(network, null, 2));
  console.log(`✅ Saved ${detected.length} bridges to #ShadowNetwork.`);
}

function report() {
  const network = loadNetwork();
  console.log('\n🌉 CROSS-VENTURE BRIDGES REPORT');
  console.log('═══════════════════════════════════════\n');

  if (!network.bridges || network.bridges.length === 0) {
    console.log('   (no bridges yet — run `scan` to detect)');
    return;
  }

  network.bridges.forEach((b, i) => {
    console.log(`${i + 1}. ${b.pattern}`);
    console.log(`   ${b.description}`);
    console.log(`   Strength: ${b.matches} matches | Keywords: ${b.keywords.slice(0, 5).join(', ')}`);
    console.log('');
  });
}

function suggest() {
  console.log('\n🌉 SUGGESTED BRIDGES (Manual)');
  console.log('═══════════════════════════════════════\n');
  console.log('Even without insights, these bridges should be explored:\n');

  Object.entries(BRIDGE_PATTERNS).forEach(([key, p], i) => {
    console.log(`${i + 1}. ${key}`);
    console.log(`   ${p.description}`);
    console.log(`   Triggers: ${p.keywords.slice(0, 4).join(', ')}...`);
    console.log('');
  });
}

const command = process.argv[2];

switch (command) {
  case 'scan':
    scan();
    break;
  case 'report':
    report();
    break;
  case 'suggest':
    suggest();
    break;
  default:
    console.log('Usage:');
    console.log('  node cross-venture-bridge-detector.js scan');
    console.log('  node cross-venture-bridge-detector.js report');
    console.log('  node cross-venture-bridge-detector.js suggest');
}
