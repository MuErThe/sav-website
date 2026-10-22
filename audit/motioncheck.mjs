/**
 * With motion allowed: scrolls each page and confirms every reveal target
 * ends visible (is-in) and every count-up figure ends at its final text.
 *   node motioncheck.mjs <base-url>
 */
import puppeteer from 'puppeteer-core';
const base = process.argv[2];
const b = await puppeteer.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
let bad = 0;
for (const route of ['/', '/about/', '/contact/', '/capabilities/', '/projects/', '/projects/sava-healthcare/', '/people/', '/gallery/']) {
  const p = await b.newPage(); await p.setViewport({ width: 1280, height: 900 });
  await p.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'no-preference' }]);
  await p.goto(base + route, { waitUntil: 'load' });
  await p.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 300) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 120)); } window.scrollTo(0, document.body.scrollHeight); });
  await new Promise((r) => setTimeout(r, 2500));
  const r = await p.evaluate(() => {
    const sel = '.reveal, [data-hm], [data-ab], [data-ct], [data-cp]';
    const all = [...document.querySelectorAll(sel)];
    const notIn = all.filter((el) => !el.classList.contains('is-in')).map((el) => el.className.split(' ')[0]);
    const counters = [...document.querySelectorAll('[data-hm-count], [data-ab-count]')].map((el) => ({ shown: el.querySelector('[aria-hidden]')?.textContent, spoken: el.querySelector('.visually-hidden')?.textContent ?? el.textContent }));
    const wrong = counters.filter((c) => c.shown !== undefined && c.shown !== c.spoken.trim());
    const p = [...document.querySelectorAll('[data-hm-progress], [data-ab-progress]')].map((el) => el.style.getPropertyValue('--p'));
    return { targets: all.length, notIn, counters: counters.length, wrong, p, motionClasses: document.documentElement.className };
  });
  if (r.notIn.length || r.wrong.length) bad++;
  console.log(route, JSON.stringify(r));
  await p.close();
}
await b.close();
console.log(bad ? `MOTION: ${bad} page(s) with problems` : 'MOTION: all targets revealed, all counters final');
