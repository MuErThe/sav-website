/**
 * Diffs a pass against the baseline: text, links, metadata, structured data
 * and image alts must match exactly; screenshots within 0.5 percent of pixels.
 *
 *   node verify.mjs <baseline-dir> <pass-dir> [--allow=route:field,...]
 */
import { readdir, readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';

const [baseDir, passDir] = process.argv.slice(2);
const allow = new Set((process.argv.find((a) => a.startsWith('--allow=')) ?? '--allow=').slice(8).split(',').filter(Boolean));
let dirty = 0;
const report = (msg) => { dirty++; console.log('DIFF', msg); };

for (const f of (await readdir(`${baseDir}/local`)).filter((f) => f.endsWith('.json') && f !== 'summary.json')) {
  const a = JSON.parse(await readFile(`${baseDir}/local/${f}`, 'utf8'));
  const p = `${passDir}/local/${f}`;
  if (!existsSync(p)) { report(`${f}: route missing`); continue; }
  const b = JSON.parse(await readFile(p, 'utf8'));
  const route = a.route;
  const check = (field, x, y) => {
    if (allow.has(`${route}:${field}`) || allow.has(`*:${field}`)) return;
    const sx = JSON.stringify(x), sy = JSON.stringify(y);
    if (sx !== sy) {
      let i = 0; while (sx[i] === sy[i]) i++;
      report(`${route} ${field}: …${sx.slice(Math.max(0, i - 60), i + 80)}… → …${sy.slice(Math.max(0, i - 60), i + 80)}…`);
    }
  };
  check('text', a.text, b.text);
  check('links', a.links.map((l) => [new URL(l.href).pathname + new URL(l.href).hash, l.text, String(l.status)]), b.links.map((l) => [new URL(l.href).pathname + new URL(l.href).hash, l.text, String(l.status)]));
  check('metadata', a.metadata, b.metadata);
  check('ld', a.ld, b.ld);
  check('alts', a.images.map((i) => i.alt), b.images.map((i) => i.alt));
  if (b.totals.failed.length && route !== '/no-such-page/') report(`${route} failed requests: ${b.totals.failed.join(', ')}`);
}

if (existsSync(`${passDir}/shots`)) {
  for (const f of (await readdir(`${baseDir}/shots`)).filter((f) => f.endsWith('.png'))) {
    const p = `${passDir}/shots/${f}`;
    if (!existsSync(p)) { report(`shot missing ${f}`); continue; }
    const A = PNG.sync.read(await readFile(`${baseDir}/shots/${f}`));
    const B = PNG.sync.read(await readFile(p));
    if (A.width !== B.width || A.height !== B.height) {
      if (!allow.has(`shot:${f}`)) report(`shot ${f}: size ${A.width}x${A.height} → ${B.width}x${B.height}`);
      continue;
    }
    const n = pixelmatch(A.data, B.data, null, A.width, A.height, { threshold: 0.1 });
    const pct = (100 * n) / (A.width * A.height);
    if (pct > 0.5 && !allow.has(`shot:${f}`)) report(`shot ${f}: ${pct.toFixed(2)}% pixels differ`);
  }
}
console.log(dirty ? `DIRTY: ${dirty} difference(s)` : 'CLEAN');
process.exit(dirty ? 1 : 0);
