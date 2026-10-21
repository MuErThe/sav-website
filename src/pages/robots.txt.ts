import type { APIRoute } from 'astro';
import { absolute } from '../lib/routes';

/**
 * Every crawler is welcome, AI answer engines included, so SAV can be found
 * and quoted. Preview builds shut the door instead.
 */
export const GET: APIRoute = ({ site }) => {
  const preview = import.meta.env.PUBLIC_PREVIEW === 'true';
  const body = preview
    ? 'User-agent: *\nDisallow: /\n'
    : `User-agent: *\nAllow: /\n\nSitemap: ${absolute('/sitemap.xml', site)}\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
