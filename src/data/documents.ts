/**
 * DOCUMENTS PUBLICS — rapports, dossiers, schémas, CV.
 *
 * Les fichiers doivent être placés dans public/documents/ et référencés
 * par leur chemin public ("/documents/nom-du-fichier.pdf").
 *
 * ⚠️ Chaque document publié ici est accessible à TOUT Internet.
 *    Vérifier CONTENT-SAFETY.md avant d'ajouter un fichier :
 *    pas d'adresse, de téléphone, d'identifiants, de données d'entreprise.
 *
 * Tableau vide = la page affiche un état "aucun document pour le moment".
 */

export interface PublicDocument {
  title: string;
  /** Chemin public, ex. "/documents/rapport-stage-2026.pdf". */
  href: string;
  /** Catégorie : rapport | dossier | schema | cv | technique | autre */
  category: 'rapport' | 'dossier' | 'schema' | 'cv' | 'technique' | 'autre';
  description?: string;
  /** Date (AAAA-MM). */
  date?: string;
  /** Format affiché (PDF par défaut). */
  format?: string;
  /** Taille approximative affichée (ex. "1,2 Mo") — optionnel. */
  size?: string;
  /** Afficher un bouton "Prévisualiser" (PDF uniquement). Défaut : true pour les PDF. */
  preview?: boolean;
}

export const documents: PublicDocument[] = [
  // Exemple (à supprimer / remplacer) :
  // {
  //   title: 'Rapport de stage — Enerdys (version publique)',
  //   href: '/documents/rapport-stage-enerdys-2026-public.pdf',
  //   category: 'rapport',
  //   description: 'Version anonymisée du rapport de stage de première année.',
  //   date: '2026-07',
  // },
];

export const documentCategories = {
  rapport: 'Rapports',
  dossier: 'Dossiers',
  schema: 'Schémas',
  cv: 'CV',
  technique: 'Documents techniques',
  autre: 'Autres',
} as const;
