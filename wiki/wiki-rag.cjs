#!/usr/bin/env node
/**
 * wiki-rag.cjs — Local RAG over the Second Brain wiki using Ollama
 *
 * Uses nomic-embed-text for embeddings, stored in a local JSON index.
 * Query via cosine similarity. 100% local, $0, private.
 *
 * Usage:
 *   node wiki-rag.cjs index           # Build/rebuild the index
 *   node wiki-rag.cjs query "..."     # Search
 *   node wiki-rag.cjs stats           # Show index stats
 *   node wiki-rag.cjs add <file>      # Add single file to index
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const WIKI = process.env.WIKI_PATH || 'H:\\DevJourney\\wiki';
const OLLAMA_URL = process.env.OLLAMA_URL || 'http://localhost:11434';
const EMBED_MODEL = process.env.EMBED_MODEL || 'nomic-embed-text';
const CHUNK_SIZE = 512;     // chars
const CHUNK_OVERLAP = 64;
const TOP_K = 5;
const INDEX_PATH = path.join(WIKI, '_meta', 'rag-index.json');

const SKIP_DIRS = new Set(['.obsidian', '_meta', 'node_modules', '.git']);
const SKIP_FILES = new Set(['SCHEMA.md', 'index.md', 'log.md']);

// ═══════════════════════════════════════════════════════════════
// EMBEDDINGS
// ═══════════════════════════════════════════════════════════════

async function embed(text) {
  try {
    const res = await fetch(`${OLLAMA_URL}/api/embeddings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: EMBED_MODEL, prompt: text })
    });
    if (!res.ok) throw new Error(`Ollama ${res.status}: ${await res.text()}`);
    const data = await res.json();
    return data.embedding;
  } catch (e) {
    if (e.code === 'ECONNREFUSED') {
      throw new Error(`Ollama not running. Start with: ollama serve\nThen: ollama pull ${EMBED_MODEL}`);
    }
    throw e;
  }
}

// ═══════════════════════════════════════════════════════════════
// CHUNKING
// ═══════════════════════════════════════════════════════════════

function chunk(text) {
  text = text.replace(/---[\s\S]*?---/, '').trim();  // strip frontmatter
  text = text.replace(/^#+ .+$/gm, '');              // strip headings (keep words)
  text = text.replace(/\[\[([^\]]+)\]\]/g, '$1');     // unwrap wikilinks
  text = text.replace(/[#*`>]/g, ' ').replace(/\s+/g, ' ').trim();

  const chunks = [];
  for (let i = 0; i < text.length; i += CHUNK_SIZE - CHUNK_OVERLAP) {
    const chunk = text.slice(i, i + CHUNK_SIZE);
    if (chunk.trim().length > 50) chunks.push(chunk);
  }
  return chunks;
}

function* walkWiki(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_DIRS.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walkWiki(full);
    } else if (entry.name.endsWith('.md') && !SKIP_FILES.has(entry.name)) {
      yield full;
    }
  }
}

// ═══════════════════════════════════════════════════════════════
// INDEX
// ═══════════════════════════════════════════════════════════════

function loadIndex() {
  if (fs.existsSync(INDEX_PATH)) {
    return JSON.parse(fs.readFileSync(INDEX_PATH, 'utf8'));
  }
  return { version: 1, model: EMBED_MODEL, created: new Date().toISOString(), chunks: [] };
}

function saveIndex(idx) {
  fs.mkdirSync(path.dirname(INDEX_PATH), { recursive: true });
  fs.writeFileSync(INDEX_PATH, JSON.stringify(idx));
}

function hashContent(text) {
  return crypto.createHash('sha256').update(text).digest('hex').slice(0, 16);
}

async function buildIndex() {
  console.log('📚 Building RAG index for wiki...');
  console.log(`   Path: ${WIKI}`);
  console.log(`   Model: ${EMBED_MODEL}`);
  console.log('');

  const idx = loadIndex();
  const existing = new Map(idx.chunks.map(c => [c.path + ':' + c.chunkIndex, c]));

  let total = 0, added = 0, updated = 0;
  for (const file of walkWiki(WIKI)) {
    const rel = path.relative(WIKI, file);
    const content = fs.readFileSync(file, 'utf8');
    const chunks = chunk(content);

    for (let i = 0; i < chunks.length; i++) {
      const key = rel + ':' + i;
      const hash = hashContent(chunks[i]);

      if (existing.has(key) && existing.get(key).hash === hash) {
        total++;
        continue;
      }

      try {
        const embedding = await embed(chunks[i]);
        const entry = {
          path: rel,
          chunkIndex: i,
          hash,
          text: chunks[i].slice(0, 200),  // preview
          embedding
        };
        idx.chunks = idx.chunks.filter(c => !(c.path === rel && c.chunkIndex === i));
        idx.chunks.push(entry);
        if (existing.has(key)) updated++; else added++;
        total++;
        process.stdout.write(`\r   Indexed ${total} chunks (${added} added, ${updated} updated)`);
      } catch (e) {
        console.error(`\n   ✗ ${rel}:${i}: ${e.message}`);
      }
    }
  }

  idx.updated = new Date().toISOString();
  saveIndex(idx);
  console.log(`\n\n✅ Index built: ${total} chunks, ${added} new, ${updated} updated`);
  console.log(`   Saved to: ${INDEX_PATH}`);
  console.log(`   Size: ${(fs.statSync(INDEX_PATH).size / 1024).toFixed(1)} KB`);
}

// ═══════════════════════════════════════════════════════════════
// QUERY
// ═══════════════════════════════════════════════════════════════

function cosine(a, b) {
  let dot = 0, na = 0, nb = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    na += a[i] * a[i];
    nb += b[i] * b[i];
  }
  return dot / (Math.sqrt(na) * Math.sqrt(nb));
}

async function query(q) {
  const idx = loadIndex();
  if (idx.chunks.length === 0) {
    console.log('⚠️  Index empty. Run: node wiki-rag.cjs index');
    return;
  }

  console.log(`🔍 Query: "${q}"\n`);
  const qEmbed = await embed(q);

  const scored = idx.chunks.map(c => ({
    ...c,
    score: cosine(qEmbed, c.embedding)
  })).sort((a, b) => b.score - a.score).slice(0, TOP_K);

  for (const c of scored) {
    const bar = '█'.repeat(Math.round(c.score * 20));
    console.log(`${bar} ${(c.score * 100).toFixed(1)}%  ${c.path}`);
    console.log(`   "${c.text.slice(0, 120)}..."\n`);
  }
}

// ═══════════════════════════════════════════════════════════════
// STATS
// ═══════════════════════════════════════════════════════════════

function stats() {
  const idx = loadIndex();
  console.log('📊 RAG Index Stats\n');
  console.log(`   Model: ${idx.model}`);
  console.log(`   Created: ${idx.created}`);
  console.log(`   Updated: ${idx.updated || 'never'}`);
  console.log(`   Chunks: ${idx.chunks.length}`);
  console.log(`   Files: ${new Set(idx.chunks.map(c => c.path)).size}`);
  console.log(`   Index size: ${fs.existsSync(INDEX_PATH) ? (fs.statSync(INDEX_PATH).size / 1024).toFixed(1) + ' KB' : '0 KB'}`);

  const byPath = {};
  for (const c of idx.chunks) byPath[c.path] = (byPath[c.path] || 0) + 1;
  console.log('\n   Top files:');
  Object.entries(byPath).sort((a, b) => b[1] - a[1]).slice(0, 10).forEach(([p, n]) => {
    console.log(`     ${n.toString().padStart(3)} chunks  ${p}`);
  });
}

// ═══════════════════════════════════════════════════════════════
// CLI
// ═══════════════════════════════════════════════════════════════

const [cmd, ...args] = process.argv.slice(2);

(async () => {
  try {
    if (cmd === 'index') await buildIndex();
    else if (cmd === 'query') await query(args.join(' '));
    else if (cmd === 'stats') stats();
    else if (cmd === 'add') {
      const file = args[0];
      console.log(`Add single file: ${file} (rebuild for full sync)`);
    } else {
      console.log('Usage:');
      console.log('  node wiki-rag.cjs index         Build/rebuild index');
      console.log('  node wiki-rag.cjs query "..."   Search the wiki');
      console.log('  node wiki-rag.cjs stats         Show index stats');
    }
  } catch (e) {
    console.error('✗', e.message);
    process.exit(1);
  }
})();
