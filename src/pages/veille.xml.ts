import type { APIRoute } from 'astro';
import { getVeille, moisLabel } from '@/lib/veille';
import { profile } from '@/data/profile';

/**
 * FLUX RSS DE LA VEILLE — /veille.xml
 *
 * Une veille qui se suit par flux RSS doit pouvoir être suivie par flux RSS.
 * Écrit à la main plutôt qu'avec une dépendance : le format tient en trente
 * lignes, et le projet n'a pas besoin d'un paquet de plus.
 *
 * Chaque entrée mensuelle devient un <item>. La date de publication est le
 * premier jour du mois couvert : les entrées sont mensuelles, pas horodatées.
 */

/** Échappe les caractères interdits dans un nœud XML. */
const esc = (s: string) =>
  s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

export const GET: APIRoute = async ({ site }) => {
  const base = site ?? new URL('https://hamzzportfolio.pages.dev');
  const entrees = (await getVeille()).slice().reverse(); // la plus récente d'abord
  const lien = new URL('/veille', base).href;

  const items = entrees.map((e) => {
    const date = new Date(`${e.data.mois}-01T12:00:00Z`);
    const produits = [...new Set(e.data.cas.map((c) => c.produit))].join(', ');
    const resume = [
      produits,
      e.data.faitMarquant,
      e.data.cve.length ? e.data.cve.join(', ') : null,
      `${e.data.sources.length} sources croisées.`,
    ]
      .filter(Boolean)
      .join(' — ');

    return `    <item>
      <title>${esc(`${moisLabel(e.data.mois)} — ${e.data.titre}`)}</title>
      <link>${esc(`${lien}#chronologie`)}</link>
      <guid isPermaLink="false">veille-${e.data.mois}</guid>
      <pubDate>${date.toUTCString()}</pubDate>
      <description>${esc(resume)}</description>
    </item>`;
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Veille technologique — ${esc(profile.name)}</title>
    <link>${esc(lien)}</link>
    <atom:link href="${esc(new URL('/veille.xml', base).href)}" rel="self" type="application/rss+xml" />
    <description>Sécurité des accès distants et des équipements de bordure : une entrée par mois, sources officielles croisées avec les analyses techniques.</description>
    <language>fr</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items.join('\n')}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  });
};
