import type { APIRoute } from 'astro';
import { absolute, pages, projectPages } from '../lib/routes';

export const GET: APIRoute = ({ site }) => {
  const entries = [
    ...pages.map((page) => ({ loc: absolute(page.path, site), priority: page.path === '/' ? '1.0' : '0.8' })),
    ...projectPages.map((page) => ({ loc: absolute(page.path, site), priority: '0.6' })),
  ];
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.map((entry) => `  <url><loc>${entry.loc}</loc><priority>${entry.priority}</priority></url>`).join('\n')}
</urlset>
`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
