/**
 * Serves dist/ with the headers from vercel.json applied, to test the
 * content security policy locally.
 *   node cspserve.mjs <dist-dir> <vercel.json>   (listens on 4327)
 */
// Serves dist/ with the vercel.json headers applied, to test the policy.
import http from 'node:http'; import { readFile, stat } from 'node:fs/promises'; import { extname, join } from 'node:path';
const root = process.argv[2]; const conf = JSON.parse(await readFile(process.argv[3], 'utf8'));
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.woff2': 'font/woff2', '.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.mp4': 'video/mp4', '.xml': 'application/xml', '.txt': 'text/plain', '.webmanifest': 'application/manifest+json' };
http.createServer(async (req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]); let f = join(root, p);
  try { if ((await stat(f)).isDirectory()) f = join(f, 'index.html'); } catch { f = join(root, '404.html'); res.statusCode = 404; }
  for (const rule of conf.headers) if (new RegExp('^' + rule.source.replace('(.*)', '.*') + '$').test(p)) for (const h of rule.headers) res.setHeader(h.key, h.value.replace('; upgrade-insecure-requests', ''));
  try { const body = await readFile(f); res.setHeader('Content-Type', types[extname(f)] ?? 'application/octet-stream'); res.end(body); } catch { res.statusCode = 404; res.end(); }
}).listen(4327);
