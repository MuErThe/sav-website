| path | bytes | type | referenced by | purpose | verdict |
|---|---:|---|---|---|---|
| .env.example | 243 | example | entry point | Documents the contact endpoint variable | KEEP |
| .gitignore | 165 | file | entry point | Ignore list | KEEP |
| README.md | 1744 | md | entry point | Run, build, deploy notes | KEEP |
| assets/sav-images/Alembic.jpeg | 132806 | jpeg | nothing (not built) | Client-supplied original | NEEDS DECISION: originals of photos already in src/assets; recommend REMOVE from repo |
| assets/sav-images/SAV logo.png | 102599 | png | nothing (not built) | Client-supplied original | NEEDS DECISION: originals of photos already in src/assets; recommend REMOVE from repo |
| assets/sav-images/rajesh-gupta.jpeg | 333370 | jpeg | nothing (not built) | Client-supplied original | NEEDS DECISION: originals of photos already in src/assets; recommend REMOVE from repo |
| assets/sav-images/rs-gill.jpeg | 280275 | jpeg | nothing (not built) | Client-supplied original | NEEDS DECISION: originals of photos already in src/assets; recommend REMOVE from repo |
| assets/sav-images/sava-01.jpeg | 182920 | jpeg | nothing (not built) | Client-supplied original | NEEDS DECISION: originals of photos already in src/assets; recommend REMOVE from repo |
| assets/sav-images/sava-02.jpeg | 115358 | jpeg | nothing (not built) | Client-supplied original | NEEDS DECISION: originals of photos already in src/assets; recommend REMOVE from repo |
| assets/sav-images/worth-wellness-01.jpeg | 151652 | jpeg | nothing (not built) | Client-supplied original | NEEDS DECISION: originals of photos already in src/assets; recommend REMOVE from repo |
| assets/sav-images/worth-wellness-02.jpeg | 68440 | jpeg | nothing (not built) | Client-supplied original | NEEDS DECISION: originals of photos already in src/assets; recommend REMOVE from repo |
| astro.config.mjs | 630 | mjs | entry point | Site URL, base path, image settings | KEEP |
| package-lock.json | 232202 | json | entry point | Locked dependency tree | KEEP |
| package.json | 388 | json | entry point | Scripts and dependencies | KEEP |
| public/apple-touch-icon.png | 6117 | png | src/components/BaseHead.astro:133 | Favicon / icon | KEEP |
| public/favicon-192.png | 5867 | png | public/site.webmanifest:10 | Favicon / icon | KEEP |
| public/favicon-32.png | 1155 | png | src/components/BaseHead.astro:132 | Favicon / icon | KEEP |
| public/favicon-512.png | 34513 | png | public/site.webmanifest:11 | Favicon / icon | KEEP |
| public/favicon.ico | 3239 | ico | src/components/BaseHead.astro:131, src/lib/paths.ts:8 | Favicon / icon | KEEP |
| public/site.webmanifest | 434 | webmanifest | src/components/BaseHead.astro:134 | PWA manifest (icons, name) | KEEP |
| public/video/hero.mp4 | 2069794 | mp4 | src/data/story.ts:61 | Stock Pexels clip shown as hero slide 1 (not an SAV site) | NEEDS DECISION: 2.07 MB stock clip, not an SAV site; recommend REMOVE |
| src/assets/brand/sav-logo-white.png | 66871 | png | src/theme/Layout.astro:7, src/lib/og.ts:22 | Brand mark | KEEP |
| src/assets/brand/sav-logo.png | 102599 | png | src/components/BaseHead.astro:6, src/theme/Layout.astro:6 | Brand mark | KEEP |
| src/assets/brand/upcl-mark.png | 1260 | png | nothing | Image | REMOVE: no reference (UpclMark.astro is a vector redraw) |
| src/assets/capability/quality/01-lab-apparatus.jpg | 56577 | jpg | src/lib/gallery.ts (import.meta.glob) | Capability photo | KEEP |
| src/assets/capability/quality/02-testing-benches.jpg | 56143 | jpg | src/lib/gallery.ts (import.meta.glob) | Capability photo | KEEP |
| src/assets/capability/quality/03-compression-rig.jpg | 40878 | jpg | src/lib/gallery.ts (import.meta.glob) | Capability photo | KEEP |
| src/assets/capability/quality/04-sampling-equipment.jpg | 51137 | jpg | src/lib/gallery.ts (import.meta.glob) | Capability photo | KEEP |
| src/assets/capability/services/01-institutional-block.jpg | 69072 | jpg | src/lib/gallery.ts (import.meta.glob) | Capability photo | KEEP |
| src/assets/capability/services/02-tank-roof.jpg | 50146 | jpg | src/lib/gallery.ts (import.meta.glob) | Capability photo | KEEP |
| src/assets/capability/services/03-industrial-shed.jpg | 45176 | jpg | src/lib/gallery.ts (import.meta.glob) | Capability photo | KEEP |
| src/assets/capability/services/04-campus-road.jpg | 64962 | jpg | src/lib/gallery.ts (import.meta.glob) | Capability photo | KEEP |
| src/assets/capability/warehouse/01-yard.jpg | 125608 | jpg | src/lib/gallery.ts (import.meta.glob) | Capability photo | KEEP |
| src/assets/capability/warehouse/02-machinery-store.jpg | 99468 | jpg | src/lib/gallery.ts (import.meta.glob) | Capability photo | KEEP |
| src/assets/clients/adani.png | 59058 | png | src/lib/gallery.ts (import.meta.glob) | Client logo | KEEP |
| src/assets/clients/airports-authority-of-india.png | 26640 | png | src/lib/gallery.ts (import.meta.glob) | Client logo | KEEP |
| src/assets/clients/alembic.png | 51119 | png | src/lib/gallery.ts (import.meta.glob) | Client logo | KEEP |
| src/assets/clients/caparo.png | 38045 | png | src/lib/gallery.ts (import.meta.glob) | Client logo | KEEP |
| src/assets/clients/daawat-foods.png | 22673 | png | src/lib/gallery.ts (import.meta.glob) | Client logo | KEEP |
| src/assets/clients/dabur.png | 39704 | png | src/lib/gallery.ts (import.meta.glob) | Client logo | KEEP |
| src/assets/clients/dsl.png | 37065 | png | src/lib/gallery.ts (import.meta.glob) | Client logo | KEEP |
| src/assets/clients/encube.png | 43847 | png | src/lib/gallery.ts (import.meta.glob) | Client logo | KEEP |
| src/assets/clients/gajra-gears.png | 34793 | png | src/lib/gallery.ts (import.meta.glob) | Client logo | KEEP |
| src/assets/clients/gufic.png | 44355 | png | src/lib/gallery.ts (import.meta.glob) | Client logo | KEEP |
| src/assets/clients/heg.png | 69238 | png | src/lib/gallery.ts (import.meta.glob) | Client logo | KEEP |
| src/assets/clients/inox.png | 48291 | png | src/lib/gallery.ts (import.meta.glob) | Client logo | KEEP |
| src/assets/clients/khaitan-agrotech.png | 88720 | png | src/lib/gallery.ts (import.meta.glob) | Client logo | KEEP |
| src/assets/clients/kirloskar.png | 28872 | png | src/lib/gallery.ts (import.meta.glob) | Client logo | KEEP |
| src/assets/clients/kores.png | 46773 | png | src/lib/gallery.ts (import.meta.glob) | Client logo | KEEP |
| src/assets/clients/liugong.png | 73229 | png | src/lib/gallery.ts (import.meta.glob) | Client logo | KEEP |
| src/assets/clients/lupin.png | 52284 | png | src/lib/gallery.ts (import.meta.glob) | Client logo | KEEP |
| src/assets/clients/mahakal-institutes.png | 57119 | png | src/lib/gallery.ts (import.meta.glob) | Client logo | KEEP |
| src/assets/clients/mahle.png | 24485 | png | src/lib/gallery.ts (import.meta.glob) | Client logo | KEEP |
| src/assets/clients/man-industries.png | 76927 | png | src/lib/gallery.ts (import.meta.glob) | Client logo | KEEP |
| src/assets/clients/maral-overseas.png | 55354 | png | src/lib/gallery.ts (import.meta.glob) | Client logo | KEEP |
| src/assets/clients/mp-public-works-department.png | 34111 | png | src/lib/gallery.ts (import.meta.glob) | Client logo | KEEP |
| src/assets/clients/national-steel-agro.png | 36289 | png | src/lib/gallery.ts (import.meta.glob) | Client logo | KEEP |
| src/assets/clients/piramal.png | 32335 | png | src/lib/gallery.ts (import.meta.glob) | Client logo | KEEP |
| src/assets/clients/pratibha.png | 27617 | png | src/lib/gallery.ts (import.meta.glob) | Client logo | KEEP |
| src/assets/clients/prestige-group.png | 17312 | png | src/lib/gallery.ts (import.meta.glob) | Client logo | KEEP |
| src/assets/clients/reliance.png | 20574 | png | src/lib/gallery.ts (import.meta.glob) | Client logo | KEEP |
| src/assets/clients/rrcat.png | 28606 | png | src/lib/gallery.ts (import.meta.glob) | Client logo | KEEP |
| src/assets/clients/ruchi-group.png | 33285 | png | src/lib/gallery.ts (import.meta.glob) | Client logo | KEEP |
| src/assets/clients/sava-healthcare.png | 48008 | png | src/lib/gallery.ts (import.meta.glob) | Client logo | KEEP |
| src/assets/clients/sayaji.png | 22187 | png | src/lib/gallery.ts (import.meta.glob) | Client logo | KEEP |
| src/assets/clients/shalby-hospitals.png | 30861 | png | src/lib/gallery.ts (import.meta.glob) | Client logo | KEEP |
| src/assets/clients/state-bank-of-indore.png | 66705 | png | src/lib/gallery.ts (import.meta.glob) | Client logo | KEEP |
| src/assets/clients/symbiosis.png | 68514 | png | src/lib/gallery.ts (import.meta.glob) | Client logo | KEEP |
| src/assets/clients/thermax.png | 7501 | png | src/lib/gallery.ts (import.meta.glob) | Client logo | KEEP |
| src/assets/clients/unichem.png | 54143 | png | src/lib/gallery.ts (import.meta.glob) | Client logo | KEEP |
| src/assets/clients/university-emblem.png | 29148 | png | src/lib/gallery.ts (import.meta.glob) | Client logo | KEEP |
| src/assets/clients/vistara.png | 27734 | png | src/lib/gallery.ts (import.meta.glob) | Client logo | KEEP |
| src/assets/clients/welspun.png | 33099 | png | src/lib/gallery.ts (import.meta.glob) | Client logo | KEEP |
| src/assets/clients/zed-black.png | 16763 | png | src/lib/gallery.ts (import.meta.glob) | Client logo | KEEP |
| src/assets/clients/zf-india.png | 73518 | png | src/lib/gallery.ts (import.meta.glob) | Client logo | KEEP |
| src/assets/culture/01-shared-meal.jpg | 101423 | jpg | src/lib/gallery.ts (import.meta.glob) | Culture photo | KEEP |
| src/assets/culture/02-cricket-match.jpg | 49317 | jpg | src/lib/gallery.ts (import.meta.glob) | Culture photo | KEEP |
| src/assets/hero/crane-tower.jpg | 98155 | jpg | nothing | Image | REMOVE: no reference |
| src/assets/people/anil-barodiya.jpg | 4612 | jpg | src/lib/gallery.ts (import.meta.glob) | Portrait | KEEP |
| src/assets/people/anil-patel.jpg | 5290 | jpg | src/lib/gallery.ts (import.meta.glob) | Portrait | KEEP |
| src/assets/people/manalal-salve.jpg | 6284 | jpg | src/lib/gallery.ts (import.meta.glob) | Portrait | KEEP |
| src/assets/people/rajesh-gupta.jpg | 213037 | jpg | src/lib/gallery.ts (import.meta.glob) | Portrait | KEEP |
| src/assets/people/ravindar-singh-gill.jpg | 172368 | jpg | src/lib/gallery.ts (import.meta.glob) | Portrait | KEEP |
| src/assets/people/sarvesh-singh-gill.jpg | 26834 | jpg | src/lib/gallery.ts (import.meta.glob) | Portrait | KEEP |
| src/assets/projects/adani/01-shed-row.jpg | 72906 | jpg | src/lib/gallery.ts (import.meta.glob) | Project photo | KEEP |
| src/assets/projects/adani/02-grain-silos.jpg | 96197 | jpg | src/lib/gallery.ts (import.meta.glob) | Project photo | KEEP |
| src/assets/projects/alembic-pharmaceuticals/01-facility.jpg | 125667 | jpg | src/lib/gallery.ts (import.meta.glob) | Project photo | KEEP |
| src/assets/projects/alembic-pharmaceuticals/02-main-entrance.jpg | 192861 | jpg | src/lib/gallery.ts (import.meta.glob) | Project photo | KEEP |
| src/assets/projects/alembic-pharmaceuticals/03-site-gate.jpg | 179541 | jpg | src/lib/gallery.ts (import.meta.glob) | Project photo | KEEP |
| src/assets/projects/alembic-pharmaceuticals/04-internal-roads.jpg | 194356 | jpg | src/lib/gallery.ts (import.meta.glob) | Project photo | KEEP |
| src/assets/projects/alembic-pharmaceuticals/05-plant-building.jpg | 186553 | jpg | src/lib/gallery.ts (import.meta.glob) | Project photo | KEEP |
| src/assets/projects/alembic-pharmaceuticals/06-gate-and-frontage.jpg | 220023 | jpg | src/lib/gallery.ts (import.meta.glob) | Project photo | KEEP |
| src/assets/projects/alembic-pharmaceuticals/07-roads-from-above.jpg | 163792 | jpg | src/lib/gallery.ts (import.meta.glob) | Project photo | KEEP |
| src/assets/projects/alembic-pharmaceuticals/08-utilities-block.jpg | 149673 | jpg | src/lib/gallery.ts (import.meta.glob) | Project photo | KEEP |
| src/assets/projects/caparo/01-plant-gate.jpg | 66666 | jpg | src/lib/gallery.ts (import.meta.glob) | Project photo | KEEP |
| src/assets/projects/dabur/01-main-building.jpg | 72784 | jpg | src/lib/gallery.ts (import.meta.glob) | Project photo | KEEP |
| src/assets/projects/dabur/02-site-works.jpg | 95700 | jpg | src/lib/gallery.ts (import.meta.glob) | Project photo | KEEP |
| src/assets/projects/gufic-pharmaceuticals/01-facility-render.jpg | 208189 | jpg | src/lib/gallery.ts (import.meta.glob) | Project photo | KEEP |
| src/assets/projects/liugong/01-admin-block.jpg | 81605 | jpg | src/lib/gallery.ts (import.meta.glob) | Project photo | KEEP |
| src/assets/projects/lupin/01-glazed-facade.jpg | 59747 | jpg | src/lib/gallery.ts (import.meta.glob) | Project photo | KEEP |
| src/assets/projects/mahakal-institute/01-campus-aerial.jpg | 260965 | jpg | src/lib/gallery.ts (import.meta.glob) | Project photo | KEEP |
| src/assets/projects/mahle/01-frontage.jpg | 72629 | jpg | src/lib/gallery.ts (import.meta.glob) | Project photo | KEEP |
| src/assets/projects/pratibha/01-entrance.jpg | 66126 | jpg | src/lib/gallery.ts (import.meta.glob) | Project photo | KEEP |
| src/assets/projects/pratibha/02-workshop-block.jpg | 67528 | jpg | src/lib/gallery.ts (import.meta.glob) | Project photo | KEEP |
| src/assets/projects/sava-healthcare/01-main-block.jpg | 394572 | jpg | src/lib/gallery.ts (import.meta.glob) | Project photo | KEEP |
| src/assets/projects/sava-healthcare/02-entrance.jpg | 646233 | jpg | src/lib/gallery.ts (import.meta.glob) | Project photo | KEEP |
| src/assets/projects/sava-healthcare/03-elevation.jpg | 106298 | jpg | src/lib/gallery.ts (import.meta.glob) | Project photo | KEEP |
| src/assets/projects/sava-healthcare/04-block-under-construction.jpg | 168636 | jpg | src/lib/gallery.ts (import.meta.glob) | Project photo | KEEP |
| src/assets/projects/sava-healthcare/05-elevation-under-construction.jpg | 122704 | jpg | src/lib/gallery.ts (import.meta.glob) | Project photo | KEEP |
| src/assets/projects/sava-healthcare/06-site-road.jpg | 170266 | jpg | src/lib/gallery.ts (import.meta.glob) | Project photo | KEEP |
| src/assets/projects/sava-healthcare/07-block-with-scaffolding.jpg | 378418 | jpg | src/lib/gallery.ts (import.meta.glob) | Project photo | KEEP |
| src/assets/projects/unichem/01-facade.jpg | 124946 | jpg | src/lib/gallery.ts (import.meta.glob) | Project photo | KEEP |
| src/assets/projects/worth-wellness/01-plant-approach.jpg | 169628 | jpg | src/lib/gallery.ts (import.meta.glob) | Project photo | KEEP |
| src/assets/projects/worth-wellness/02-plant-frontage.jpg | 166705 | jpg | src/lib/gallery.ts (import.meta.glob) | Project photo | KEEP |
| src/assets/projects/worth-wellness/03-shed-frontage.jpg | 162393 | jpg | src/lib/gallery.ts (import.meta.glob) | Project photo | KEEP |
| src/assets/projects/worth-wellness/04-shed-elevation.jpg | 256514 | jpg | src/lib/gallery.ts (import.meta.glob) | Project photo | KEEP |
| src/assets/projects/worth-wellness/05-sheds-on-site.jpg | 146969 | jpg | src/lib/gallery.ts (import.meta.glob) | Project photo | KEEP |
| src/components/BaseHead.astro | 5360 | astro | src/theme/Layout.astro:4 | Document head: title, meta, share tags, JSON-LD graph | KEEP |
| src/components/BrandLockup.astro | 2542 | astro | src/theme/Layout.astro:9 | SAV + Formerly + UPCL lockup (hero, top bar) | KEEP |
| src/components/ChapterHead.astro | 589 | astro | src/pages/people.astro:5 | Numbered section heading component | KEEP |
| src/components/ContactForm.astro | 9407 | astro | src/pages/contact.astro:3 | Enquiry form with inline validation and fetch submit | KEEP |
| src/components/Motion.astro | 3465 | astro | src/styles/base.css:357, src/theme/Layout.astro:5 | Generic scroll-reveal observer and counter (shared) | KEEP |
| src/components/ProjectRecord.astro | 1755 | astro | src/pages/projects/index.astro:4, src/pages/projects/[slug].astro:5 | Project summary row with carousel (projects list, related) | KEEP |
| src/components/SawtoothRoof.astro | 725 | astro | src/pages/gallery.astro:15, src/pages/capabilities.astro:10 | Decorative roof-line SVG | KEEP |
| src/components/SiteBoard.astro | 1027 | astro | src/pages/projects/[slug].astro:6 | Project facts board on project pages | KEEP |
| src/components/UpclMark.astro | 902 | astro | src/components/BrandLockup.astro:8, src/theme/Layout.astro:8 | Vector UPCL mark | KEEP |
| src/components/YardIcon.astro | 1903 | astro | src/components/sections/YardLedger.astro:9, src/data/company.ts:219, src/pages/capabilities.astro:9 | Line icons for the yard ledger | KEEP |
| src/components/sections/Enquiry.astro | 7619 | astro | src/pages/index.astro:10, src/pages/projects/[slug].astro:8 | Closing call-to-action with animated build drawing | KEEP |
| src/components/sections/OnSite.astro | 12216 | astro | src/pages/index.astro:6 | Home 01: ongoing and completed work | KEEP |
| src/components/sections/OrgFlow.astro | 1782 | astro | src/pages/people.astro:4 | Org chart (people page), drag to pan | KEEP |
| src/components/sections/OrgFlowNode.astro | 2697 | astro | src/components/sections/OrgFlow.astro:9 | One org chart node | KEEP |
| src/components/sections/PharmaWork.astro | 8615 | astro | src/pages/index.astro:8 | Home 03: pharma plants with hover photo frame | KEEP |
| src/components/sections/ProjectCarousel.astro | 10693 | astro | src/components/ProjectRecord.astro:2, src/pages/projects/[slug].astro:7 | Scroll-snap photo carousel | KEEP |
| src/components/sections/TrustStrip.astro | 3608 | astro | src/pages/index.astro:5 | Client logo marquee under the hero | KEEP |
| src/components/sections/WhySav.astro | 3783 | astro | src/pages/index.astro:7 | Home 02: differentiators | KEEP |
| src/components/sections/YardHero.astro | 20302 | astro | src/pages/index.astro:4 | Home hero: headline, slideshow, figures | KEEP |
| src/components/sections/YardLedger.astro | 7728 | astro | src/pages/index.astro:9 | Home 04: yard stock and workshop | KEEP |
| src/data/clients.ts | 2346 | ts | src/components/sections/TrustStrip.astro:9, src/pages/capabilities.astro:7 | Client logo list | KEEP |
| src/data/company.ts | 12527 | ts | src/components/BrandLockup.astro:9, src/components/YardIcon.astro:7, src/components/SiteBoard.astro:6, src/components/ContactForm.astro:2, src/components/BaseHead.astro:3, src/components/sections/WhySav.astro:9, src/components/sections/OnSite.astro:9, src/components/sections/YardHero.astro:15, src/components/sections/YardLedger.astro:11, src/theme/Layout.astro:10, src/data/seo.ts:10, src/data/story.ts:4, src/pages/about.astro:5, src/pages/llms.txt.ts:2, src/pages/index.astro:11, src/pages/contact.astro:4, src/pages/capabilities.astro:5, src/pages/projects/[slug].astro:11 | Company facts, contact, services, safety, quality, yard | KEEP |
| src/data/people.ts | 5608 | ts | src/components/sections/OrgFlow.astro:10, src/components/sections/OrgFlowNode.astro:3, src/pages/people.astro:6 | Leadership and team structure | KEEP |
| src/data/projects.ts | 5938 | ts | src/components/ProjectRecord.astro:3, src/components/SiteBoard.astro:7, src/components/sections/OnSite.astro:10, src/components/sections/YardHero.astro:16, src/theme/Layout.astro:12, src/lib/routes.ts:1, src/lib/gallery.ts:2, src/data/seo.ts:11, src/data/story.ts:5, src/pages/gallery.astro:16, src/pages/projects/index.astro:5, src/pages/projects/[slug].astro:9, src/pages/og/[slug].jpg.ts:2 | Project records | KEEP |
| src/data/seo.ts | 4299 | ts | src/components/BaseHead.astro:4, src/pages/about.astro:7, src/pages/llms.txt.ts:3 | Brand names, expertise, service area, FAQ | KEEP |
| src/data/story.ts | 7888 | ts | src/components/sections/WhySav.astro:8, src/components/sections/OnSite.astro:8, src/components/sections/Enquiry.astro:2, src/components/sections/TrustStrip.astro:8, src/components/sections/PharmaWork.astro:8, src/components/sections/YardHero.astro:14, src/components/sections/YardLedger.astro:10, src/pages/contact.astro:5, src/pages/capabilities.astro:6 | Home page narrative copy and hero config | KEEP |
| src/lib/gallery.ts | 6102 | ts | src/components/ProjectRecord.astro:4, src/components/sections/OnSite.astro:11, src/components/sections/ProjectCarousel.astro:12, src/components/sections/TrustStrip.astro:10, src/components/sections/PharmaWork.astro:9, src/components/sections/YardHero.astro:17, src/components/sections/YardLedger.astro:12, src/data/projects.ts:6, src/pages/about.astro:6, src/pages/gallery.astro:17, src/pages/people.astro:7, src/pages/capabilities.astro:8, src/pages/projects/[slug].astro:10 | Image collections via import.meta.glob | KEEP |
| src/lib/nav.ts | 819 | ts | src/theme/Layout.astro:11 | Navigation items | KEEP |
| src/lib/og.ts | 2799 | ts | src/components/BaseHead.astro:5, src/pages/og/default.jpg.ts:2, src/pages/og/[slug].jpg.ts:3 | Share image renderer (sharp) | KEEP |
| src/lib/paths.ts | 460 | ts | src/components/BaseHead.astro:2, src/components/sections/YardHero.astro:18, src/theme/Layout.astro:2, src/lib/routes.ts:2, src/lib/nav.ts:1, src/pages/about.astro:2, src/pages/index.astro:2, src/pages/capabilities.astro:3, src/pages/projects/index.astro:2, src/pages/projects/[slug].astro:2 | Base-path helper | KEEP |
| src/lib/routes.ts | 1330 | ts | src/pages/sitemap.xml.ts:2, src/pages/llms.txt.ts:4, src/pages/robots.txt.ts:2 | Route list for sitemap, robots, llms.txt | KEEP |
| src/pages/about.astro | 24766 | astro | entry point | About page | KEEP |
| src/pages/capabilities.astro | 30263 | astro | entry point | Capabilities page | KEEP |
| src/pages/contact.astro | 10964 | astro | entry point | Contact page | KEEP |
| src/pages/gallery.astro | 16461 | astro | src/components/ProjectRecord.astro:4, src/components/sections/OnSite.astro:11, src/components/sections/ProjectCarousel.astro:12, src/components/sections/TrustStrip.astro:10, src/components/sections/PharmaWork.astro:9, src/components/sections/YardHero.astro:17, src/components/sections/YardLedger.astro:12, src/data/projects.ts:6, src/pages/about.astro:6, src/pages/people.astro:7, src/pages/capabilities.astro:8, src/pages/projects/[slug].astro:10 | Photo wall with lightbox | KEEP |
| src/pages/index.astro | 4712 | astro | entry point | Home page | KEEP |
| src/pages/llms.txt.ts | 1942 | ts | src/components/BaseHead.astro:136 | llms.txt endpoint | KEEP |
| src/pages/og/[slug].jpg.ts | 487 | ts | entry point | Per-project share image | KEEP |
| src/pages/og/default.jpg.ts | 248 | ts | src/components/BaseHead.astro:30 | Default share image | KEEP |
| src/pages/people.astro | 3790 | astro | src/components/sections/OrgFlow.astro:10, src/components/sections/OrgFlowNode.astro:3 | People page | KEEP |
| src/pages/projects/[slug].astro | 4575 | astro | entry point | Project page | KEEP |
| src/pages/projects/index.astro | 4375 | astro | entry point | Projects list | KEEP |
| src/pages/robots.txt.ts | 561 | ts | entry point | robots.txt endpoint | KEEP |
| src/pages/sitemap.xml.ts | 717 | ts | src/components/BaseHead.astro:135, src/pages/robots.txt.ts:12 | Sitemap endpoint | KEEP |
| src/styles/base.css | 7476 | css | src/components/sections/Enquiry.astro:177, src/theme/Layout.astro:13 | Reset, palette, motion tokens, form and reveal styles | KEEP |
| src/theme/Layout.astro | 10413 | astro | src/pages/about.astro:4, src/pages/index.astro:3, src/pages/contact.astro:2, src/pages/gallery.astro:14, src/pages/people.astro:3, src/pages/capabilities.astro:4, src/pages/projects/index.astro:3, src/pages/projects/[slug].astro:4 | Page shell: header, nav, footer, menu script | KEEP |
| src/theme/theme.css | 24960 | css | src/theme/Layout.astro:14 | Theme: type, colour, layout, components | KEEP |
| tsconfig.json | 242 | json | entry point | TypeScript strict config | KEEP |
