/**
 * Screenshots every sitemap route at 390, 768, 1280 and 1920 px, plus the
 * mobile menu open, the contact form in error and success states, and the
 * gallery lightbox open. Motion is forced to its final state so the images
 * are stable between runs.
 *
 *   node shots.mjs <base-url> <out-dir>
 */
import { mkdir } from 'node:fs/promises';
import puppeteer from 'puppeteer-core';

const [base, outDir] = process.argv.slice(2);
if (!base || !outDir) throw new Error('usage: node shots.mjs <base-url> <out-dir>');
const CHROME = process.env.CHROME_PATH ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const WIDTHS = [390, 768, 1280, 1920];

const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
const routes = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);

await mkdir(outDir, { recursive: true });
const browser = await puppeteer.launch({ executablePath: CHROME, headless: true, args: ['--hide-scrollbars'] });

// Reveal animations and marquees settle to their end state; autoplay stops.
const SETTLE = `*,*::before,*::after{animation-play-state:paused!important;transition:none!important}
  .reveal,[data-hm],[data-ab],[data-ct],[data-cp],[data-gl]{opacity:1!important;transform:none!important;clip-path:none!important}`;

async function open(route, width) {
  const page = await browser.newPage();
  await page.setViewport({ width, height: 900, deviceScaleFactor: 1 });
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
  await page.goto(`${base}${route}`, { waitUntil: 'load', timeout: 60000 });
  await page.waitForNetworkIdle({ idleTime: 500, timeout: 10000 }).catch(() => {});
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 600) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 40));
    }
    window.scrollTo(0, 0);
  });
  await page.addStyleTag({ content: SETTLE });
  await page.waitForNetworkIdle({ idleTime: 500, timeout: 15000 }).catch(() => {});
  return page;
}

const name = (route) => (route === '/' ? 'home' : route.replace(/^\/|\/$/g, '').replace(/\//g, '__'));

for (const route of routes) {
  for (const width of WIDTHS) {
    const page = await open(route, width);
    await page.screenshot({ path: `${outDir}/${name(route)}@${width}.png`, fullPage: true });
    await page.close();
  }
}

// Mobile menu open.
{
  const page = await open('/', 390);
  const toggle = await page.$('[aria-controls][aria-expanded], .nav__toggle, button[aria-expanded]');
  if (toggle) {
    await toggle.click();
    await new Promise((r) => setTimeout(r, 400));
    await page.screenshot({ path: `${outDir}/state-menu-open@390.png`, fullPage: false });
  } else {
    console.warn('mobile menu toggle not found');
  }
  await page.close();
}

// Contact form error state (submit empty) and success state (endpoint missing shows the honest failure).
{
  const page = await open('/contact/', 1280);
  await page.click('.enquiry__submit');
  await new Promise((r) => setTimeout(r, 300));
  const form = await page.$('form.enquiry');
  await form.screenshot({ path: `${outDir}/state-form-error@1280.png` });
  await page.type('#enquiry-name', 'Audit Test');
  await page.type('#enquiry-email', 'audit@example.com');
  await page.type('#enquiry-message', 'Harness run, not a real enquiry.');
  await page.click('.enquiry__submit');
  await new Promise((r) => setTimeout(r, 800));
  await form.screenshot({ path: `${outDir}/state-form-submitted@1280.png` });
  await page.close();
}

// Gallery lightbox open.
{
  const page = await open('/gallery/', 1280);
  const first = await page.$('[data-gl-title]');
  if (first) {
    await first.click();
    await new Promise((r) => setTimeout(r, 500));
    await page.screenshot({ path: `${outDir}/state-lightbox-open@1280.png`, fullPage: false });
  } else {
    console.warn('gallery lightbox trigger not found');
  }
  await page.close();
}

await browser.close();
console.log('screenshots written to', outDir);
