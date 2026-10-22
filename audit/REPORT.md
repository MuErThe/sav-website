# SAV Construction website audit

Date: 21 October 2026. Repository: `sav-construction` at commit `bfa63f1`. Live site: https://www.sav.construction. Mode: report, then apply after decisions.

Baseline data is in `audit/baseline/`. The full file inventory is in `audit/inventory.md`. To rerun everything: `cd audit && npm install && ./run.sh <label>`.

## 1. Verdict

Clean after plan. The site is already well built: zero broken links, zero console failures, Lighthouse 92 to 100 on every score, no secrets or provenance leaks in shipped files. The defects are weight (a 2 MB stock video and oversized logos), duplication (five parallel scroll-reveal scripts, a hand-typed address), two dead assets and dead data, a missing 404 page, and a carousel markup pattern that fails two accessibility checks.

| Metric | Baseline |
| --- | --- |
| dist | 24 MB, 485 files (19.7 MB of that is 449 generated image variants) |
| Source | 10,517 lines across 46 files |
| Home page transfer | 2,637 KB, of which 2,070 KB is the hero video |
| JavaScript per route | 5 to 12 KB raw, inline (about 2 to 4 KB gzipped); no external JS files |
| CSS per route | 1 to 11 KB gzipped |
| Lighthouse mobile (perf / a11y / bp / seo) | home 95/100/100/100; project 95/94/100/100; gallery 92/100/100/100; contact 100/100/100/100 |
| Lighthouse desktop | 100 on every score except project page a11y 94 |
| LCP mobile | home 2.7 s (the video element); gallery 3.3 s; project 1.6 s; contact 1.5 s |
| CLS mobile | project page 0.125; others under 0.01 |

## 2. Defects, ranked

| Severity | Location | Finding | Fix |
| --- | --- | --- | --- |
| Blocker | Live site vs repo | Live canonical is still `https://sav.construction/` while the repo and sitemap say `www`. Not a code defect: commit `bfa63f1` is pushed but Vercel has not deployed it. | Deploy. Verified automatically once live. |
| Major | `public/video/hero.mp4`, `src/data/story.ts:59` | A 2.07 MB stock Pexels clip ("not an SAV site", per its own comment) is slide 1 of the hero, downloads in full on every home visit, and is the mobile LCP element. Project notes from the client call say the video was dropped. | Needs decision. Recommend set `heroVideo` to `null` and delete the file. |
| Major | `TrustStrip.astro:28,37`, `capabilities.astro:289` | Client logos use `densities={[1, 2]}` on 160 px tall sources and render at 42 px: every logo ships at 3.8 times its rendered height, 41 logos twice over on two pages. | Pass `height={48}` with the densities so the 1x variant is 48 px tall. No visual change. |
| Major | `Motion.astro` + `index.astro`, `about.astro`, `contact.astro`, `capabilities.astro`, `YardHero.astro`, `Enquiry.astro` | Seven IntersectionObserver copies and three count-up implementations. `Motion.astro` is partly dead: its counter selector list (`.ledger__qty, .figure__value, .zero__value`) matches nothing on any page, and 8 of its 15 reveal selectors match nothing. | Delete the dead parts of `Motion.astro`; move the observer and counter into one `src/lib/reveal.ts` used by every page. |
| Major | `BaseHead.astro:64-69` | Head-office address typed by hand in the structured data instead of read from `contact.offices`. Only one of the two offices is published. | Build the address nodes from `contact.offices`; add the registered office. |
| Major | `src/pages/` | No 404 page. The host returns its own plain "404: NOT_FOUND". | Add `src/pages/404.astro` on the site layout. |
| Major | `ProjectCarousel.astro:60-66` | `<li role="group">` inside `<ul role="list">` fails `aria-allowed-role` and `aria-required-children` (Lighthouse a11y 94 on every project and list page). | Make the track a `div role="group" aria-roledescription="carousel"` with `div role="group"` slides, matching the existing hero slideshow. |
| Major | `src/data/story.ts:104-161` | Dead exports `record`, `crew`, `statement`, `whyUsPoints` (58 lines), with a retyped 1995 and ISO fact inside. | Delete. |
| Major | `src/assets/hero/crane-tower.jpg` (98 KB), `src/assets/brand/upcl-mark.png` | Nothing references either file. | Delete. |
| Major | `assets/sav-images/` (8 files, 1.3 MB) | Client originals of photos already optimised under `src/assets`; one filename has a space. Not built, but tracked. | Needs decision. Recommend remove from the repo (the old project folder keeps them). |
| Major | Project pages, mobile | CLS 0.125 attributed to `.board.reveal` in the project hero. | Investigate during apply; fix only if the cause is proven. |
| Minor | `capabilities.astro:75-76`, `contact.astro:19`, `seo.ts:93`, `index.astro:19`, `about.astro:27` | ISO certificate, phone, email and founding years retyped in page copy and meta descriptions rather than interpolated from `company.ts`. | Interpolate; rendered text unchanged by a character. |
| Minor | `theme.css` (`.muted`, `.media-note`), `base.css` (`.media-note`, dead counter selectors), `capabilities.astro` (`.cp-strip--four`, `.cp-strip__item--3`, `--4`) | Rules matching nothing in any route. | Delete, about 40 lines. |
| Minor | `Layout.astro`, `contact.astro` | The same 12 px arrow SVG pasted 7 times. | `Arrow.astro`, 7 call sites. |
| Minor | 8 files | No header comment: `Layout.astro`, `Enquiry.astro`, `index`, `about`, `people`, `capabilities`, `projects/index`, `projects/[slug]`. | Add five-line headers. |
| Minor | `src/data/company.ts` | Facts carry no per-fact source comment. Revenue "$120M+", "70+ projects", "100+ clients", "30+ years" have no stated source. | Comment each fact with its source; flag the four unsourced ones to the client. |
| Minor | Metadata | 12 titles exceed 60 characters (longest 85: Gufic Biosciences). | Flag only; titles are copy. |
| Minor | `YardHero.astro:43-60` | The h1's DOM text contains the sector list twice: once visually hidden for assistive technology, once as the aria-hidden rotating plate. Screen readers get one clean sentence (confirmed), but text extraction and search engines see the duplicate. | Flag only. Moving the plate out of the h1 is a design change. |
| Minor | Live response headers | Only HSTS is set. No `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy` or CSP. | Needs decision: `vercel.json` headers block. |
| Minor | Fonts | Google Fonts loaded from `fonts.googleapis.com`, render-blocking (Lighthouse: 820 ms estimated on mobile). Not self-hosted, not preloaded. | Needs decision: self-host two families (about 150 KB of woff2). |
| Minor | `package-lock.json` | `npm audit`: 1 critical (Astro), 5 high (sharp, vite, devalue, source-map-js, http-cache-semantics), 1 moderate, 1 low. All build-time; none ships to the browser. Astro's fix needs 5.18 → 7.x. | Needs decision: major upgrade. |
| Minor | `README.md` | No "how to add a project" section, no "where the facts live", no known limitations. | Rewrite under 60 lines. |

Checked and clean: no AI tool or model names, prompt files, reference screenshots, personal paths, personal emails, API keys or `.env` files in shipped output, source, filenames or visible git history (the only email in history is the committer's). No source maps. No tracked `dist/`, `.astro/`, `node_modules/`, `.DS_Store`. No `console.log`, `debugger`, TODO, commented-out code, inline event handlers, or `any`. `!important` appears six times, all legitimate (the `hidden` attribute, `.visually-hidden`, the reduced-motion override). `z-index` above 10 twice (skip link 200, masthead 100), both justified. No US spellings in copy or comments (`organization` appears only as an autocomplete token and a schema fragment id). External links carry `rel="noopener noreferrer"`. Skip link targets `#main`, which exists. No dependency is unused: `astro`, `sharp`, `@astrojs/check` and `typescript` are each imported or used by the build; GSAP and Lenis were already removed.

## 3. Inventory

165 tracked files. Full table in `audit/inventory.md`. Summary:

| Group | Files | Verdict |
| --- | --- | --- |
| Config, lock, README, manifest | 9 | KEEP |
| Source `.astro`, `.ts`, `.css` | 46 | KEEP (with dead code removed as planned) |
| Project, capability, culture photos, portraits | 51 | KEEP, all referenced through `import.meta.glob` |
| Client logos | 41 | KEEP, all 41 named in `clients.ts` |
| Brand marks | 3 | 2 KEEP, `upcl-mark.png` REMOVE |
| `src/assets/hero/crane-tower.jpg` | 1 | REMOVE |
| Favicons | 5 | KEEP |
| `public/video/hero.mp4` | 1 | NEEDS DECISION, recommend REMOVE |
| `assets/sav-images/` | 8 | NEEDS DECISION, recommend REMOVE |

Content lives in `src/data/*.ts` as typed `as const` objects; the schema is TypeScript, enforced by `astro check`. Every project field is rendered somewhere. Facts that appear in more than one file are listed in the defects table.

Images in dist: 507 `<img>` across all routes, all webp, every one with `alt`, `width`, `height`, `decoding="async"` (Astro's default) and `srcset`. Eager loading is limited to the header logo, the first hero slide and the first six gallery tiles. The only `fetchpriority` gap is the hero LCP image, which carries none.

## 4. Content to page

```
src/data/*.ts  ──►  src/lib/gallery.ts (photos by folder)  ──►  src/pages/*.astro
   │                 src/lib/routes.ts (route list)              │
   │                 src/lib/og.ts (share images)                 ▼
   └────────────────────────────────────────────────►  src/theme/Layout.astro
                                                        ├─ components/BaseHead.astro  (title, meta, share, JSON-LD: once)
                                                        ├─ header + nav (lib/nav.ts)
                                                        ├─ <slot/> page sections (components/sections/*)
                                                        ├─ footer (nav.ts, data/projects.ts, data/company.ts)
                                                        └─ components/Motion.astro (generic reveal)
```

Head and metadata are built once, in the layout. Navigation comes from one list. There are no islands, no framework components and no external JS files: every script is a plain inline `<script>` that Astro hoists and deduplicates per page.

Findings by area:

- Hero: screen readers get "We build industrial plants, pharma facilities, commercial spaces, institutions, infrastructure, high-rise homes delivered on time" with spaces intact; the rotating plate is `aria-hidden`; reduced motion stops the rotation and the slideshow. Passes, with the duplicate-text note above.
- Logo marquee: the second copy is `aria-hidden="true"` with empty alts, pauses on hover, has no focusable children so focus-pause does not apply, and is removed under reduced motion. No layout shift measured.
- Duplicated media: the pharma section renders each cover twice by design, once inline for phones and once in the sticky hover frame for wider screens, each in its own media query. Only one set is displayed at a time, but both sets are real `<img>` elements with different srcsets. Proposed single-copy version: not possible without one element serving both layouts; the inline copy is `loading="lazy"` and hidden on wide screens, so the waste is DOM, not bytes.
- Counters: final values are in the HTML; the animated copy is `aria-hidden`; reduced motion shows the final value. The home figures say "70+ projects" and the pharma section says "16 projects in the portfolio". Both come from different places (`company.stats` and the project count). Flagged for the client, not edited.
- Navigation: `aria-expanded` and `aria-controls` present, Escape closes and returns focus, body scroll locked via `.menu-open`, closes on width change. Focus is not moved into the menu on open (the menu follows the button in DOM order, so Tab reaches it next). Acceptable.
- Contact form: no endpoint set, so the form reports an honest failure with phone and email. Honeypot, inline validation, disabled submit during send, success and error states all present. No secret in client code.
- Gallery: native `<dialog>` gives Escape and a focus trap; arrows handled; focus returns to the opened tile. Lighthouse reports 686 KB of responsive-image savings on mobile; the tiles carry phone-specific `sizes`, so the cause is the set of generated `widths`, to be confirmed during apply.
- SEO: unique titles and descriptions on every route; trailing slashes consistent; sitemap lists all 23 routes; robots allows all; Organization (as `GeneralContractor`, a LocalBusiness subtype), WebSite, FAQPage on About, BreadcrumbList on projects. No legacy UPCL URLs ever existed on this domain.
- CSS: 92.7 KB raw across 7 files, 1 to 11 KB gzipped per page. Tokens are used throughout; the unused rules are listed above.

## 5. Change plan

| # | File | What | Why | Risk | Delta |
| --- | --- | --- | --- | --- | --- |
| 1 | `src/assets/hero/crane-tower.jpg`, `src/assets/brand/upcl-mark.png` | Delete | Unreferenced | none | −99 KB |
| 2 | `src/data/story.ts` | Delete `record`, `crew`, `statement`, `whyUsPoints` | Dead exports | none | −58 lines |
| 3 | `src/components/Motion.astro`, `src/styles/base.css` | Delete the counter code and the 8 selectors that match nothing; trim the dead selectors from the tabular-nums rule | Dead code | none | −50 lines |
| 4 | `theme.css`, `base.css`, `capabilities.astro` | Delete `.muted`, `.media-note` (×2), `.cp-strip--four`, `.cp-strip__item--3/--4` | Unused rules | none | −40 lines |
| 5 | `public/video/hero.mp4`, `src/data/story.ts`, `YardHero.astro` | Set `heroVideo` to null, delete the file and the video branch | 2 MB stock clip, not SAV's | needs decision | −2.07 MB, −40 lines |
| 6 | `assets/sav-images/` | Remove from the repo | Originals already in `src/assets` | needs decision | −1.3 MB |
| 7 | `TrustStrip.astro`, `capabilities.astro` | `height={48}` on logo images | Logos ship at 3.8× rendered | low | about −300 KB on home and capabilities |
| 8 | `YardHero.astro` | `fetchpriority="high"` on the first slide image | LCP | low | +1 attribute |
| 9 | `gallery.astro` | Add a phone-width entry to the tiles' `widths` so the srcset has a candidate near 350 px | 686 KB mobile waste | low | 1 line |
| 10 | `ProjectCarousel.astro` | `ul/li` track → `div` groups, CSS selectors updated | a11y 94 → 100 | low | ±10 lines |
| 11 | new `src/pages/404.astro` | Styled not-found page on the layout | Missing route | low | +40 lines |
| 12 | new `src/components/Arrow.astro` | Replace 7 pasted SVGs | Duplication | none | −20 lines |
| 13 | new `src/lib/reveal.ts`; `Motion.astro`, `index`, `about`, `contact`, `capabilities` | One observer and counter module; pages keep their own `data-*` hooks and CSS | 7 copies → 1 | low | −120 lines |
| 14 | `BaseHead.astro` | Address nodes from `contact.offices`, both offices | Hand-typed fact | low (structured data changes, attached) | ±15 lines |
| 15 | `capabilities.astro`, `contact.astro`, `seo.ts`, `index.astro`, `about.astro` | Interpolate ISO, phone, email, years from `company.ts` | Hand-typed facts | none (character-identical output) | ±10 lines |
| 16 | `src/data/company.ts` | One-line source comment per fact | Comment standard | none | +40 lines |
| 17 | 8 files | Five-line header comments; block comments on menu, marquee, lightbox, slideshow, counters | Comment standard | none | +60 lines |
| 18 | project pages | Investigate CLS 0.125; fix only if proven | Lighthouse | low | unknown |
| 19 | `README.md` | Adding a project, where facts live, known limitations | Required | none | ±30 lines |
| 20 | `vercel.json` | Security headers | Hosting config | needs decision | +15 lines |
| 21 | `public/fonts/`, `Layout.astro`, `theme.css` | Self-host and preload the two font families | Render-blocking third party | needs decision | +150 KB, −1 external origin |
| 22 | `package.json` | Astro 5 → 7 for the critical advisory | Audit | needs decision | major upgrade |

Not planned, with reasons: using `ChapterHead` for the 20 hand-rolled section headings (it wraps in `.chapter__head`, which carries a reveal animation, so pages would change); shortening the 12 long titles (copy); moving the rotating plate out of the h1 (design).

## 6. Needs decision

1. Hero video (plan 5). Recommend remove. It is the single largest cost on the site and is not SAV's work.
2. Client originals in `assets/` (plan 6). Recommend remove from the repo.
3. Security headers via `vercel.json` (plan 20). Recommend yes: `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` denying camera, microphone and geolocation, and a CSP allowing self plus Google Fonts.
4. Self-hosted fonts (plan 21). Recommend yes: faster first paint and no third-party request.
5. Astro major upgrade (plan 22). Recommend defer: the advisories are build-time only, and the upgrade is a separate piece of work with its own regression risk.

## 7. Not in scope, for the client

- "70+ projects" (home figures) and "16 projects in the portfolio" (pharma section) read as contradictory; both may be right.
- "$120M+ revenue", "70+ successful global projects", "100+ community" and "30+ years legacy" have no documented source.
- The People page description says "over 70 staff"; confirm the current headcount.
- 12 page titles are long enough that Google will truncate them.
- Welspun, Jyothy Labs, Gufic Biosciences, Lupin, Caparo, LiuGong and Mahle show representative photographs from other projects, labelled as such.

## 8. Applied (22 October 2026)

Every pass was rebuilt, type-checked, crawled and screenshotted at four widths, then diffed against `audit/baseline/`. Text, links, titles, descriptions and alts matched on every route in every pass; 100 screenshots stayed within 0.5 percent. Commits are one per pass.

| Pass | Commit | Change | Result |
| --- | --- | --- | --- |
| 0 | `9560a56` | Audit harness and report | Control run clean |
| 1 | `b734fda` | Removed 2 dead images, the duplicate `assets/` originals, 4 dead exports, dead reveal selectors and counter, 3 unused CSS rules | −128 lines, clean |
| 2 | `aa50653` | Client logos sized to their 56 px rendered height | Home images 408 → 380 KB, capabilities 521 → 456 KB, clean. Hero video re-encodes (H.264, VP9, AV1) gave no worthwhile saving; video unchanged |
| 3 | `7853b05` | 404 page (noindex); carousel roles; carousel strip stays keyboard-focusable | axe: zero critical or serious on every route |
| 4a | `f83588b` | One `src/lib/motion.ts` for reveal, count-up and scroll progress (5 observer copies, 2 counters, 2 progress loops) | All 125 reveal targets and 7 counters complete with motion on |
| 4b | `2498460` | `Arrow.astro` for six footer copies | Clean |
| 5 | `722b933` | Office addresses and ISO standard stored once; both offices in structured data | Only the intended structured-data addition |
| 6 | `73af8b0` | Header comments, fact sources, more unread data removed, stale comments, README | Clean |
| 7 | `1339dd5` | Self-hosted fonts, preloaded | No third-party requests; see trade-off below |
| 8 | `7b4a0e6` | `vercel.json` security headers; scripts always as files | No policy violations on any route |
| 9 | `84fdecc` | Astro 5.18 → 7.4, sharp 0.35; `compressHTML: true` keeps inline spacing | npm audit 8 → 0 advisories |
| 10 | `cfe0206` | Hero poster preloaded with high priority; first gallery photo high priority | Home mobile +1 point |

## 9. Before and after

Lighthouse mobile, both builds served by the same local server, median of repeated runs:

| Route | Performance | Largest paint | First paint | Layout shift |
| --- | --- | --- | --- | --- |
| Home | 94 → 91 | 2.9 → 3.3 s | 1.8 → 1.8 s | 0 → 0 |
| Gallery | 89 → 86 | 3.7 → 4.2 s | 1.8 → 1.5 s | 0 → 0 |
| Project page | 94 → 98 | 2.0 → 2.3 s | 1.8 → 1.5 s | 0.125 → 0 |
| Contact | 100 → 99 | 1.5 → 2.0 s | 1.8 → 1.5 s | 0 → 0 |

Desktop stays 100 on performance for all four. Accessibility is 100 on all four, up from 94 on project pages. Best practices and SEO stay 100.

Trade-off, not resolved: bisecting by commit shows the home and gallery drop comes from self-hosting the fonts (pass 7) and, by about one point, from shipping scripts as files (pass 8). Same-origin fonts share the throttled connection with the main image. Preloading the main image recovered one point. Reverting the font pass would restore the old figures and bring back the Google Fonts dependency and the content security policy exceptions for it.

Other figures: dist 485 → 497 files, image and HTML bytes down, 3 font files and 16 small script files added; source 10,517 → about 10,500 lines; npm audit 8 advisories → 0; axe zero critical or serious; no third-party hosts contacted.

Decision, 22 October 2026: keep the self-hosted fonts. The home and gallery mobile scores (91 and 86) are accepted in exchange for no third-party font host and a content security policy with no font exceptions.
