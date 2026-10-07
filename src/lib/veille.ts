import { getCollection, type CollectionEntry } from 'astro:content';
import { parseIso, formatMonthCap } from '@/lib/format';

/**
 * TOUT CE QUI EST CHIFFRÉ OU TABULÉ SUR /veille/ EST CALCULÉ ICI.
 *
 * Rien n'est recopié à la main : les chiffres clés, la vue d'ensemble, les deux
 * tableaux d'analyse et la date de dernière mise à jour se déduisent des
 * fichiers de src/content/veille/. Ajouter une entrée mensuelle met la page
 * entière à jour, sans toucher à autre chose.
 */

export type Entree = CollectionEntry<'veille'>;
export type Cas = Entree['data']['cas'][number];

/** Un cas, accompagné du mois auquel il appartient. */
export interface CasDate extends Cas {
  mois: string;
  moisLabel: string;
}

let cache: Entree[] | null = null;

/** Les entrées mensuelles, de la plus ancienne à la plus récente (ordre de lecture). */
export async function getVeille(): Promise<Entree[]> {
  if (cache) return cache;
  const all = await getCollection('veille');
  cache = all.sort((a, b) => a.data.mois.localeCompare(b.data.mois));
  return cache;
}

/** "2026-06" → "Juin 2026". */
export function moisLabel(mois: string): string {
  return formatMonthCap(parseIso(mois));
}

/** "2026-06" → "Juin" (pour les colonnes étroites). */
export function moisCourt(mois: string): string {
  const [, m] = mois.split('-');
  const courts = ['Janv.', 'Févr.', 'Mars', 'Avr.', 'Mai', 'Juin', 'Juill.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'];
  return `${courts[Number(m) - 1]} ${mois.slice(0, 4)}`;
}

/** Tous les cas de la période, à plat, chacun rattaché à son mois. */
export async function getCas(): Promise<CasDate[]> {
  const entrees = await getVeille();
  return entrees.flatMap((e) =>
    e.data.cas.map((c) => ({ ...c, mois: e.data.mois, moisLabel: moisLabel(e.data.mois) })),
  );
}

/**
 * Chiffres clés affichés en tête de page.
 * `avantCorrectif` est le constat central de la veille : la part des cas où
 * l'attaque a précédé le correctif.
 */
export async function getChiffres() {
  const entrees = await getVeille();
  const cas = await getCas();
  const avant = cas.filter((c) => c.exploitation === 'avant-correctif');

  return {
    cas: cas.length,
    editeurs: new Set(cas.map((c) => c.editeur)).size,
    mois: entrees.length,
    cve: new Set(entrees.flatMap((e) => e.data.cve)).size,
    sources: entrees.reduce((n, e) => n + e.data.sources.length, 0),
    avantCorrectif: avant.length,
    partAvantCorrectif: Math.round((avant.length / cas.length) * 100),
  };
}

/**
 * Tableau « écart entre exploitation et correctif » (constat 1).
 * Ne retient que les cas exploités avant correctif ET dont la date de première
 * exploitation est connue — c'est la réserve que pose le document lui-même.
 */
export async function getEcarts(): Promise<CasDate[]> {
  const cas = await getCas();
  return cas.filter((c) => c.exploitation === 'avant-correctif' && c.premiereExploitation);
}

/** Tableau « le correctif existait, il n'a pas été appliqué » (constat 2). */
export async function getCorrectifsNonAppliques(): Promise<CasDate[]> {
  const cas = await getCas();
  return cas.filter((c) => c.exploitation === 'apres-correctif');
}

/** Produits touchés plus d'une fois sur la période (constat 3). */
export async function getRecurrents(): Promise<{ produit: string; mois: string[] }[]> {
  const cas = await getCas();
  const parProduit = new Map<string, string[]>();
  for (const c of cas) {
    const liste = parProduit.get(c.produit) ?? [];
    liste.push(c.moisLabel);
    parProduit.set(c.produit, liste);
  }
  return [...parProduit.entries()]
    .filter(([, mois]) => mois.length > 1)
    .map(([produit, mois]) => ({ produit, mois }))
    .sort((a, b) => b.mois.length - a.mois.length);
}

/**
 * Date de dernière mise à jour : le mois de l'entrée la plus récente.
 * Jamais écrite en dur — une veille qui affiche une date figée se trahit
 * toute seule au bout de deux mois.
 */
export async function getDerniereMaj(): Promise<{ mois: string; label: string; iso: string }> {
  const entrees = await getVeille();
  const derniere = entrees[entrees.length - 1];
  return {
    mois: derniere.data.mois,
    label: moisLabel(derniere.data.mois),
    iso: `${derniere.data.mois}-01`,
  };
}

/** Période couverte, en clair : "Décembre 2025 – Octobre 2026". */
export async function getPeriode(): Promise<string> {
  const entrees = await getVeille();
  return `${moisLabel(entrees[0].data.mois)} – ${moisLabel(entrees[entrees.length - 1].data.mois)}`;
}
