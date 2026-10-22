/**
 * Loads every route under the site's content security policy and reports
 * any violation, plus scripts that failed to run.
 *   node csp.mjs <base-url>
 */
import puppeteer from 'puppeteer-core';
const base = process.argv[2];
const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
const routes = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname).concat('/no-such-page/');
const b = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
let n = 0;
for (const route of routes) {
  const p = await b.newPage();
  const errors = [];
  p.on('console', (m) => { if (m.type() === 'error') errors.push(m.text().slice(0, 160)); });
  p.on('pageerror', (e) => errors.push('pageerror ' + e.message.slice(0, 160)));
  await p.evaluateOnNewDocument(() => document.addEventListener('securitypolicyviolation', (e) => console.error(`CSP ${e.violatedDirective} blocked ${e.blockedURI || 'inline'}`)));
  const res = await p.goto(base + route, { waitUntil: 'load' });
  await p.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 700) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 50)); } });
  await new Promise((r) => setTimeout(r, 400));
  const csp = res.headers()['content-security-policy'] ? 'csp' : 'NO CSP HEADER';
  const motion = await p.evaluate(() => document.documentElement.className);
  if (errors.length || csp !== 'csp') { n++; console.log(route, csp, errors); }
  else console.log(route, 'ok', `(scripts ran: ${motion || 'n/a'})`);
  await p.close();
}
await b.close();
console.log(n ? `CSP: ${n} route(s) with problems` : 'CSP: no violations on any route');
