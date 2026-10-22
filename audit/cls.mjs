/**
 * Layout shift on a page under throttled mobile conditions, motion on.
 *   node cls.mjs <url>
 */
import puppeteer from 'puppeteer-core';
const b = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
for (let run = 0; run < 3; run++) {
  const ctx = await b.createBrowserContext();
  const p = await ctx.newPage(); await p.setViewport({ width: 412, height: 823, deviceScaleFactor: 2.6, isMobile: true });
  const c = await p.createCDPSession(); await c.send('Network.emulateNetworkConditions', { offline: false, latency: 150, downloadThroughput: 1.6e6 / 8, uploadThroughput: 750e3 / 8 });
  await p.evaluateOnNewDocument(() => { window.__cls = 0; new PerformanceObserver((l) => { for (const e of l.getEntries()) if (!e.hadRecentInput) window.__cls += e.value; }).observe({ type: 'layout-shift', buffered: true }); });
  await p.goto(process.argv[2], { waitUntil: 'load' });
  await new Promise((r) => setTimeout(r, 3000));
  console.log('cold run', run + 1, 'CLS', (await p.evaluate(() => window.__cls)).toFixed(4));
  await ctx.close();
}
await b.close();
