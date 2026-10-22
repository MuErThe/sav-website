/**
 * axe-core accessibility scan of every sitemap route plus the 404 page.
 *   node axe.mjs <base-url>
 */
import puppeteer from 'puppeteer-core';
import { AxePuppeteer } from '@axe-core/puppeteer';
const base = process.argv[2];
const CHROME = process.env.CHROME_PATH ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
const routes = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname).concat('/no-such-page/');
const browser = await puppeteer.launch({ executablePath: CHROME, headless: true });
let serious = 0;
for (const route of routes) {
  for (const width of [390, 1280]) {
    const page = await browser.newPage();
    await page.setViewport({ width, height: 900 });
    // Settled state: transient mid-animation colours are not what users read.
    await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
    await page.goto(`${base}${route}`, { waitUntil: 'load' });
    await page.waitForNetworkIdle({ idleTime: 400, timeout: 8000 }).catch(() => {});
    const result = await new AxePuppeteer(page).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice']).analyze();
    for (const v of result.violations) {
      if (v.impact === 'critical' || v.impact === 'serious') serious++;
      console.log(`${route} @${width} [${v.impact}] ${v.id}: ${v.nodes.length} node(s) e.g. ${v.nodes[0]?.target.join(' ')}`);
    }
    await page.close();
  }
}
await browser.close();
console.log(serious ? `axe: ${serious} critical/serious` : 'axe: zero critical or serious');
