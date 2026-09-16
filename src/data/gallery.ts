/**
 * GALERIE — images indépendantes des fiches de travaux.
 *
 * Les images des fiches (champ `images` des fichiers Markdown) sont ajoutées
 * AUTOMATIQUEMENT à la galerie. Ce fichier sert pour les images "libres" :
 * schémas, architectures, configurations, résultats…
 *
 * 1. Déposer l'image dans src/assets/gallery/
 * 2. Ajouter une entrée ci-dessous avec le nom exact du fichier.
 *
 * ⚠️ Vérifier CONTENT-SAFETY.md : flouter IP internes, noms, identifiants.
 */

export interface GalleryItem {
  /** Nom du fichier dans src/assets/gallery/ (ex. "schema-vlan.png"). */
  file: string;
  /** Texte alternatif (accessibilité) — obligatoire. */
  alt: string;
  /** Légende affichée. */
  caption?: string;
  /** Catégorie : capture | schema | architecture | interface | resultat | configuration | photo */
  category: 'capture' | 'schema' | 'architecture' | 'interface' | 'resultat' | 'configuration' | 'photo';
  /** Date (AAAA-MM), optionnel. */
  date?: string;
}

export const galleryItems: GalleryItem[] = [
  // Exemple (à supprimer / remplacer) :
  // {
  //   file: 'schema-reseau-vlan.png',
  //   alt: 'Schéma d’un réseau segmenté en trois VLAN avec un routeur inter-VLAN',
  //   caption: 'Maquette Packet Tracer — segmentation VLAN',
  //   category: 'schema',
  //   date: '2026-02',
  // },
];

export const galleryCategories = {
  capture: 'Captures d’écran',
  schema: 'Schémas',
  architecture: 'Architectures',
  interface: 'Interfaces',
  resultat: 'Résultats',
  configuration: 'Configurations',
  photo: 'Photos',
} as const;
