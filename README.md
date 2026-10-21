# SAV Construction website

The main website for Solid Assured Valued Construction Pvt. Ltd., built with
[Astro](https://astro.build) as a static site and hosted on Vercel.

## Running it

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # static output in dist/
npm run preview  # serve the built output
npm run check    # TypeScript + Astro diagnostics
```

## Project layout

```
assets/           Client-supplied originals, kept for reference (not built)
public/           Favicons, web manifest and hero video, served from the site root
src/
  data/           Content: company facts, projects, people, clients, story
  lib/            gallery.ts (image collections), nav.ts (routes), paths.ts (base path)
  assets/         Source imagery, optimised at build time
  components/     Shared components; sections/ holds the home page sections
  styles/base.css Reset, brand palette, motion curves, focus behaviour, form structure
  theme/          Layout.astro and theme.css
  pages/          Home, about, projects, capabilities, gallery, people, contact
```

## Environment

| Variable | Purpose |
| --- | --- |
| `PUBLIC_CONTACT_ENDPOINT` | Where the contact form posts. Unset, the form shows the phone number and email instead. |
| `SITE_URL` | Canonical address. Defaults to `https://www.sav.construction`. |
| `BASE_PATH` | Only if the site is served under a sub-path. Defaults to `/`. |
| `PUBLIC_PREVIEW` | Set to `true` on preview deployments to add `noindex, nofollow`. |

Copy `.env.example` to `.env` for local values. Never commit `.env`.

## Deploying on Vercel

Vercel detects Astro automatically: build command `npm run build`, output `dist`.
Set the variables above in the Vercel project settings.
