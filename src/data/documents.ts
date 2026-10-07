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
  {
    title: 'Tableau de synthèse des compétences E5',
    href: '/documents/Competences-E5-Hamza-Jallabi.pdf',
    category: 'dossier',
    // Fichier produit par `npm run pdf` à partir de la page /e5/.
    description:
      'Les six compétences du bloc et les réalisations qui les prouvent. Version imprimable de la cartographie, consultable en ligne sur la page Compétences E5.',
    date: '2026-10',
    size: '172 Ko',
  },
  {
    title: 'Veille technologique — sécurité des accès distants',
    href: '/documents/Veille-Hamza-Jallabi.pdf',
    category: 'dossier',
    // Fichier produit par `npm run veille` à partir de la page /veille/.
    description:
      'Onze mois de veille, de décembre 2025 à octobre 2026 : 15 cas d’exploitation chez 9 éditeurs, avec les sources croisées et datées. Version imprimable de la page Veille.',
    date: '2026-10',
    size: '483 Ko',
  },
];

export const documentCategories = {
  rapport: 'Rapports',
  dossier: 'Dossiers',
  schema: 'Schémas',
  cv: 'CV',
  technique: 'Documents techniques',
  autre: 'Autres',
} as const;
