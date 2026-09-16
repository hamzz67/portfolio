import type { APIRoute } from 'astro';

/** robots.txt généré au build : l'URL du sitemap suit automatiquement `site` (astro.config.mjs). */
export const GET: APIRoute = ({ site }) => {
  const sitemap = new URL('sitemap-index.xml', site ?? 'https://example.com').href;
  const body = ['User-agent: *', 'Allow: /', 'Disallow: /presentation', '', `Sitemap: ${sitemap}`, ''].join('\n');
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
