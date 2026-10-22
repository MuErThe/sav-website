// @ts-check
import { defineConfig } from 'astro/config';

/*
 * SITE_URL and BASE_PATH override the address for a preview hosted under a
 * sub-path; locally and on the live domain the site sits at the root.
 */
export default defineConfig({
  site: process.env.SITE_URL ?? 'https://www.sav.construction',
  base: process.env.BASE_PATH ?? '/',
  // The dev toolbar overlays the page during review; it never ships to production.
  devToolbar: { enabled: false },
  build: { inlineStylesheets: 'auto' },
  // Every script ships as a file, never inline, so the content security
  // policy in vercel.json can allow scripts from this site alone.
  vite: { build: { assetsInlineLimit: 0 } },
  image: {
    // Brand marks and client logos stay lossless; photography is re-encoded per use.
    responsiveStyles: true,
  },
});
