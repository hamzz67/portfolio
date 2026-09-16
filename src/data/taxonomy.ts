/**
 * TAXONOMIE — listes de valeurs autorisées pour classer les travaux.
 *
 * Ces listes alimentent les filtres de la bibliothèque et la validation
 * des fiches (src/content.config.ts). Pour ajouter une catégorie, ajouter
 * une entrée ici : les filtres se mettent à jour automatiquement.
 */

/** Nature d'un travail. */
export const KINDS = {
  tp: { label: 'TP / Travail BTS', short: 'TP', plural: 'Travaux BTS' },
  stage: { label: 'Stage', short: 'Stage', plural: 'Stages' },
  personnel: { label: 'Projet personnel', short: 'Perso', plural: 'Projets personnels' },
} as const;
export type Kind = keyof typeof KINDS;

/** Domaine technique principal. */
export const CATEGORIES = {
  reseaux: { label: 'Réseaux', icon: 'network' },
  systemes: { label: 'Systèmes', icon: 'server' },
  cybersecurite: { label: 'Cybersécurité', icon: 'shield' },
  developpement: { label: 'Développement', icon: 'code' },
  web: { label: 'Technologies web', icon: 'globe' },
  'bases-de-donnees': { label: 'Bases de données', icon: 'database' },
  virtualisation: { label: 'Virtualisation', icon: 'layers' },
  cloud: { label: 'Cloud', icon: 'cloud' },
  ia: { label: 'IA', icon: 'sparkles' },
  scripts: { label: 'Scripts & automatisation', icon: 'terminal' },
  autre: { label: 'Autre', icon: 'box' },
} as const;
export type Category = keyof typeof CATEGORIES;

/** Avancement d'un travail. */
export const STATUSES = {
  termine: { label: 'Terminé' },
  'en-cours': { label: 'En cours' },
  planifie: { label: 'Planifié' },
  archive: { label: 'Archivé' },
} as const;
export type Status = keyof typeof STATUSES;

/**
 * Blocs de compétences du référentiel BTS SIO (épreuves E4/E5/E6).
 * Intitulés officiels du référentiel 2020 — utiles pour le jury.
 */
export const BTS_BLOCS = {
  B1: { label: 'Support et mise à disposition de services informatiques' },
  B2: { label: 'Administration des systèmes et des réseaux (SISR)' },
  B3: { label: 'Cybersécurité des services informatiques' },
} as const;
export type BtsBloc = keyof typeof BTS_BLOCS;

export const kindKeys = Object.keys(KINDS) as Kind[];
export const categoryKeys = Object.keys(CATEGORIES) as Category[];
export const statusKeys = Object.keys(STATUSES) as Status[];
export const blocKeys = Object.keys(BTS_BLOCS) as BtsBloc[];
