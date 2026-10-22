/**
 * Crawls every route in the sitemap and saves, per route: rendered text,
 * links with status, images with sizes, scripts and stylesheets with bytes,
 * metadata and structured data, plus request and byte totals.
 *
 *   node crawl.mjs <base-url> <out-dir>
 *
 * Example: node crawl.mjs http://localhost:4324 baseline/local
 */
import { mkdir, writeFile } from 'node:fs/promises';
import { gzipSync } from 'node:zlib';
import puppeteer from 'puppeteer-core';

const [base, outDir] = process.argv.slice(2);
if (!base || !outDir) throw new Error('usage: node crawl.mjs <base-url> <out-dir>');

const CHROME = process.env.CHROME_PATH ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
const routes = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
routes.push('/no-such-page/');

const browser = await puppeteer.launch({ executablePath: CHROME, headless: true, args: ['--hide-scrollbars'] });
const statusCache = new Map();

async function status(url) {
  if (statusCache.has(url)) return statusCache.get(url);
  let code;
  try {
    const res = await fetch(url, { method: 'GET', redirect: 'manual', headers: { 'user-agent': 'sav-audit' } });
    code = res.status;
    if (code >= 300 && code < 400) code = `${code} -> ${res.headers.get('location')}`;
  } catch (error) {
    code = `ERR ${error.message}`;
  }
  statusCache.set(url, code);
  return code;
}

await mkdir(outDir, { recursive: true });
const summary = [];

for (const route of routes) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900, deviceScaleFactor: 1 });
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);

  const requests = [];
  page.on('response', async (res) => {
    try {
      const req = res.request();
      const headers = res.headers();
      let bytes = Number(headers['content-length'] ?? 0);
      let gz = null;
      const type = req.resourceType();
      if (['document', 'script', 'stylesheet', 'image', 'font', 'media'].includes(type) && res.status() === 200) {
        const buf = await res.buffer().catch(() => null);
        if (buf) {
          bytes = buf.length;
          if (['document', 'script', 'stylesheet'].includes(type)) gz = gzipSync(buf).length;
        }
      }
      requests.push({ url: res.url(), type, status: res.status(), bytes, gz });
    } catch {}
  });

  const response = await page.goto(`${base}${route}`, { waitUntil: 'load', timeout: 60000 });
  await page.waitForNetworkIdle({ idleTime: 500, timeout: 10000 }).catch(() => {});
  const docStatus = response?.status();
  // Scroll the page so lazy images load, then let the network settle.
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 600) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 60));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForNetworkIdle({ idleTime: 500, timeout: 15000 }).catch(() => {});

  const data = await page.evaluate(() => {
    const text = document.body.innerText.replace(/\s+/g, ' ').trim();
    const links = [...document.querySelectorAll('a[href]')].map((a) => ({
      href: a.href,
      text: a.innerText.replace(/\s+/g, ' ').trim().slice(0, 80),
      rel: a.rel || null,
      target: a.target || null,
    }));
    const images = [...document.querySelectorAll('img')].map((img) => {
      const r = img.getBoundingClientRect();
      return {
        src: img.currentSrc || img.src,
        rendered: [Math.round(r.width), Math.round(r.height)],
        intrinsic: [img.naturalWidth, img.naturalHeight],
        attrWidth: img.getAttribute('width'),
        attrHeight: img.getAttribute('height'),
        loading: img.getAttribute('loading'),
        decoding: img.getAttribute('decoding'),
        fetchpriority: img.getAttribute('fetchpriority'),
        alt: img.getAttribute('alt'),
        ariaHidden: img.closest('[aria-hidden="true"]') !== null,
        srcset: Boolean(img.getAttribute('srcset')),
        sizes: img.getAttribute('sizes'),
      };
    });
    const meta = (sel) => document.querySelector(sel)?.getAttribute('content') ?? null;
    const metadata = {
      title: document.title,
      description: meta('meta[name="description"]'),
      canonical: document.querySelector('link[rel="canonical"]')?.href ?? null,
      robots: meta('meta[name="robots"]'),
      og: Object.fromEntries([...document.querySelectorAll('meta[property^="og:"]')].map((m) => [m.getAttribute('property'), m.getAttribute('content')])),
      twitter: Object.fromEntries([...document.querySelectorAll('meta[name^="twitter:"]')].map((m) => [m.getAttribute('name'), m.getAttribute('content')])),
      h1: [...document.querySelectorAll('h1')].map((h) => h.innerText.replace(/\s+/g, ' ').trim()),
      lang: document.documentElement.lang,
    };
    const ld = [...document.querySelectorAll('script[type="application/ld+json"]')].map((s) => {
      try { return JSON.parse(s.textContent); } catch { return 'INVALID JSON'; }
    });
    const scripts = [...document.scripts].map((s) => ({ src: s.src || '(inline)', type: s.type, inlineBytes: s.src ? null : s.textContent.length }));
    const styles = [...document.querySelectorAll('link[rel="stylesheet"], style')].map((s) => ({ href: s.href || '(inline)', inlineBytes: s.href ? null : s.textContent.length }));
    return { text, links, images, metadata, ld, scripts, styles };
  });

  const internal = (u) => u.startsWith(base) || u.startsWith('https://www.sav.construction') || u.startsWith('https://sav.construction');
  for (const link of data.links) {
    const u = new URL(link.href);
    if (u.protocol === 'http:' || u.protocol === 'https:') {
      const target = internal(link.href) ? `${base}${u.pathname}` : link.href;
      link.status = await status(target);
    } else {
      link.status = u.protocol;
    }
  }

  const sum = (type) => requests.filter((r) => r.type === type && r.status === 200).reduce((n, r) => n + r.bytes, 0);
  const sumGz = (type) => requests.filter((r) => r.type === type && r.status === 200).reduce((n, r) => n + (r.gz ?? r.bytes), 0);
  const totals = {
    status: docStatus,
    requests: requests.length,
    bytes: requests.reduce((n, r) => n + r.bytes, 0),
    jsGz: sumGz('script'),
    cssGz: sumGz('stylesheet'),
    docGz: sumGz('document'),
    imageBytes: sum('image'),
    fontBytes: sum('font'),
    mediaBytes: sum('media'),
    failed: requests.filter((r) => r.status >= 400).map((r) => `${r.status} ${r.url}`),
  };

  const slug = route === '/' ? 'home' : route.replace(/^\/|\/$/g, '').replace(/\//g, '__');
  await writeFile(`${outDir}/${slug}.json`, JSON.stringify({ route, ...data, requests, totals }, null, 2));
  await writeFile(`${outDir}/${slug}.txt`, data.text);
  summary.push({ route, ...totals, images: data.images.length, links: data.links.length });
  await page.close();
}

await writeFile(`${outDir}/summary.json`, JSON.stringify(summary, null, 2));
console.table(summary.map(({ failed, ...s }) => ({ ...s, failed: failed.length })));
await browser.close();
