#!/usr/bin/env node
/**
 * wiki-lint.cjs — Health check for the Second Brain wiki
 *
 * Checks:
 *  - Orphan pages (no inbound links)
 *  - Broken wikilinks (point to non-existent pages)
 *  - Missing frontmatter
 *  - Tag taxonomy violations
 *  - Stale content (updated > 90 days)
 *  - Page size > 200 lines
 *  - Empty sections
 *  - Log entry count
 *
 * Usage: node wiki-lint.cjs
 */

const fs = require('fs');
const path = require('path');

const WIKI = process.env.WIKI_PATH || 'H:\\DevJourney\\wiki';
const SCHEMA = fs.readFileSync(path.join(WIKI, 'SCHEMA.md'), 'utf8');
const VALID_TAGS = new Set([
  // Ventures
  'crypto', 'code', 'marjahans', 'snaptrap', 'build', 'philo',
  // Content type
  'article', 'paper', 'video', 'podcast', 'book', 'meeting', 'quote',
  // Discipline
  'tech', 'business', 'marketing', 'finance', 'philosophy', 'design',
  // Stage
  'idea', 'research', 'draft', 'shipped', 'archived',
  // Quality
  'high-signal', 'medium', 'low',
  // Meta
  'moc', 'template', 'system', 'tool', 'person', 'org', 'concept',
  'comparison', 'daily', 'weekly', 'query', 'entity', 'venture', 'raw'
]);

const SKIP = new Set(['SCHEMA.md', 'index.md', 'log.md', 'WIKI_SETUP_GUIDE.md', 'README.md']);
const DAILY_PREFIX = 'daily' + path.sep;  // daily notes skip orphan + sources checks

let issues = { error: 0, warning: 0, info: 0 };
const report = [];

function log(level, msg) {
  const icon = { error: '❌', warning: '⚠️ ', info: 'ℹ️ ' }[level];
  report.push(`${icon} ${msg}`);
  issues[level]++;
}

function* walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (['.obsidian', '_meta', 'node_modules', '.git'].includes(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else if (entry.name.endsWith('.md')) yield full;
  }
}

const pages = [];
for (const file of walk(WIKI)) {
  const rel = path.relative(WIKI, file);
  const content = fs.readFileSync(file, 'utf8');
  const isSystem = SKIP.has(path.basename(rel));
  pages.push({ path: rel, content, isSystem });
}

console.log(`🔍 Linting ${pages.length} pages in ${WIKI}\n`);

// ═══════════════════════════════════════════════════════════════
// 1. Build link graph
// ═══════════════════════════════════════════════════════════════

const inboundLinks = new Map();
const allLinks = new Set();
const fileNames = new Set(pages.map(p => path.basename(p.path, '.md')));

for (const p of pages) {
  const links = [...p.content.matchAll(/\[\[([^\]\|]+)(?:\|[^\]]+)?\]\]/g)].map(m => m[1]);
  for (const link of links) {
    allLinks.add(link);
    const base = link.split('/').pop();
    if (!inboundLinks.has(base)) inboundLinks.set(base, []);
    inboundLinks.get(base).push(p.path);
  }
}

// ═══════════════════════════════════════════════════════════════
// 2. Orphans (no inbound links)
// ═══════════════════════════════════════════════════════════════

for (const p of pages) {
  if (p.isSystem) continue;
  if (p.path.startsWith(DAILY_PREFIX)) continue;  // daily notes OK to be orphans
  const base = path.basename(p.path, '.md');
  if (!inboundLinks.has(base) || inboundLinks.get(base).length === 0) {
    log('warning', `ORPHAN: ${p.path} (no inbound [[wikilinks]])`);
  }
}

// ═══════════════════════════════════════════════════════════════
// 3. Broken wikilinks
// ═══════════════════════════════════════════════════════════════

for (const p of pages) {
  const links = [...p.content.matchAll(/\[\[([^\]\|]+)(?:\|[^\]]+)?\]\]/g)].map(m => m[1]);
  for (const link of links) {
    const target = link.split('/').pop();
    const targetFile = path.join(WIKI, 'entities', target + '.md');
    const targetFile2 = path.join(WIKI, 'concepts', target + '.md');
    const targetFile3 = path.join(WIKI, 'ventures', target + '.md');
    const targetFile4 = path.join(WIKI, 'comparisons', target + '.md');
    const targetFile5 = path.join(WIKI, 'queries', target + '.md');
    if (!fileNames.has(target) && !fs.existsSync(targetFile) && !fs.existsSync(targetFile2)
        && !fs.existsSync(targetFile3) && !fs.existsSync(targetFile4) && !fs.existsSync(targetFile5)) {
      log('info', `BROKEN LINK: ${p.path} → [[${link}]]`);
    }
  }
}

// ═══════════════════════════════════════════════════════════════
// 4. Frontmatter validation
// ═══════════════════════════════════════════════════════════════

for (const p of pages) {
  if (p.isSystem) continue;
  if (p.path.startsWith(DAILY_PREFIX)) continue;  // daily notes don't need sources
  const fm = p.content.match(/^---\n([\s\S]*?)\n---/);
  if (!fm) {
    log('error', `NO FRONTMATTER: ${p.path}`);
    continue;
  }
  const fmText = fm[1];
  const required = ['title', 'created', 'updated', 'type', 'tags', 'sources'];
  for (const r of required) {
    if (!fmText.includes(r + ':')) {
      log('warning', `MISSING FIELD: ${p.path} (no "${r}")`);
    }
  }
}

// ═══════════════════════════════════════════════════════════════
// 5. Tag taxonomy
// ═══════════════════════════════════════════════════════════════

for (const p of pages) {
  const tags = [...p.content.matchAll(/tags:\s*\[([^\]]*)\]/g)].map(m => {
    return m[1].split(',').map(t => t.trim().replace(/['"#]/g, '')).filter(Boolean);
  }).flat();

  for (const tag of tags) {
    if (!VALID_TAGS.has(tag)) {
      log('info', `UNKNOWN TAG: ${p.path} uses "${tag}" (add to SCHEMA.md first)`);
    }
  }
}

// ═══════════════════════════════════════════════════════════════
// 6. Stale content
// ═══════════════════════════════════════════════════════════════

const now = new Date();
for (const p of pages) {
  if (p.isSystem) continue;
  const updated = p.content.match(/updated:\s*(\d{4}-\d{2}-\d{2})/);
  if (updated) {
    const age = (now - new Date(updated[1])) / (1000 * 60 * 60 * 24);
    if (age > 90) {
      log('info', `STALE: ${p.path} (${Math.round(age)} days old)`);
    }
  }
}

// ═══════════════════════════════════════════════════════════════
// 7. Page size
// ═══════════════════════════════════════════════════════════════

for (const p of pages) {
  if (p.isSystem) continue;
  const lines = p.content.split('\n').length;
  if (lines > 200) {
    log('warning', `LARGE: ${p.path} (${lines} lines, consider splitting)`);
  }
}

// ═══════════════════════════════════════════════════════════════
// 8. Log entry count
// ═══════════════════════════════════════════════════════════════

const logPath = path.join(WIKI, 'log.md');
if (fs.existsSync(logPath)) {
  const logContent = fs.readFileSync(logPath, 'utf8');
  const entries = (logContent.match(/^## \[\d{4}-\d{2}-\d{2}\]/gm) || []).length;
  if (entries > 500) {
    log('warning', `LOG FULL: log.md has ${entries} entries (rotate to log-YYYY.md)`);
  }
}

// ═══════════════════════════════════════════════════════════════
// REPORT
// ═══════════════════════════════════════════════════════════════

console.log(report.join('\n'));
console.log('');
console.log('═══════════════════════════════════════');
console.log(`❌ ${issues.error} errors · ⚠️  ${issues.warning} warnings · ℹ️  ${issues.info} info`);
console.log('═══════════════════════════════════════');

if (issues.error > 0) process.exit(1);
