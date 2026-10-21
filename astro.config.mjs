// @ts-check
import { defineConfig } from 'astro/config';

/*
 * Published previews (GitHub Pages) set SITE_URL and BASE_PATH in the build;
 * locally and on the final domain the site sits at the root.
 */
export default defineConfig({
  site: process.env.SITE_URL ?? 'https://www.sav.construction',
  base: process.env.BASE_PATH ?? '/',
  // The dev toolbar overlays the page during review; it never ships to production.
  devToolbar: { enabled: false },
  build: { inlineStylesheets: 'auto' },
  image: {
    // Brand marks and client logos stay lossless; photography is re-encoded per use.
    responsiveStyles: true,
  },
});
