/**
 * COLLECTIONS DE CONTENU
 *
 * Les fiches de travaux (TP, stage, projets personnels) sont des fichiers Markdown
 * dans src/content/projects/. Ce fichier définit et VALIDE leur en-tête (frontmatter).
 *
 * Si un champ obligatoire manque ou qu'une valeur est mal écrite, `npm run build`
 * s'arrête avec un message clair indiquant le fichier et le champ concerné.
 *
 * Tous les champs marqués `.optional()` peuvent être omis sans casser l'affichage.
 * Voir CONTENT-GUIDE.md pour le mode d'emploi complet.
 */
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { kindKeys, categoryKeys, statusKeys, blocKeys } from './data/taxonomy';
import { competenceKeys, coucheKeys } from './data/competences-e5';

const projects = defineCollection({
  // Tous les .md du dossier, sauf ceux qui commencent par "_" (ex. _TEMPLATE.md)
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      /** Titre de la fiche. */
      title: z.string().min(3),
      /** Nature : tp | stage | personnel */
      kind: z.enum(kindKeys as [string, ...string[]]),
      /** Domaine principal (voir src/data/taxonomy.ts). */
      category: z.enum(categoryKeys as [string, ...string[]]),
      /** Domaines secondaires (optionnel). */
      categories: z.array(z.enum(categoryKeys as [string, ...string[]])).default([]),
      /** Date de réalisation (AAAA-MM-JJ ou AAAA-MM). */
      date: z.coerce.date(),
      /** Date de fin si différente (optionnel). */
      endDate: z.coerce.date().optional(),
      /** Résumé court (carte + SEO). 1 à 2 phrases. */
      summary: z.string().min(10).max(240),
      /** Contexte : "Cours SISR", "Atelier professionnel", "Stage", "Personnel"… */
      context: z.string().optional(),
      /** Organisation / lieu (ex. "Enerdys — Entzheim"). Ne rien inventer. */
      organization: z.string().optional(),
      /** Rôle personnel (ex. "Développeur", "Administrateur réseau"). */
      role: z.string().optional(),
      /** Technologies utilisées (alimentent les filtres et la page compétences). */
      technologies: z.array(z.string()).default([]),
      /** Compétences mobilisées, en clair. */
      skills: z.array(z.string()).default([]),
      /** Blocs du référentiel BTS SIO mobilisés : B1, B2, B3. */
      bts: z.array(z.enum(blocKeys as [string, ...string[]])).default([]),
      /**
       * Compétences du bloc E5 couvertes par cette réalisation.
       * Alimente le tableau de synthèse de /e5/ : une compétence sans aucune
       * fiche y apparaît comme un trou à combler. Ne cocher que ce que la
       * fiche prouve réellement — un tableau complaisant ne sert à rien.
       */
      competencesE5: z.array(z.enum(competenceKeys as [string, ...string[]])).default([]),
      /** Avancement. */
      status: z.enum(statusKeys as [string, ...string[]]).default('termine'),
      /** Mis en avant sur l'accueil et dans le mode présentation. */
      featured: z.boolean().default(false),
      /** Ordre dans le mode présentation (plus petit = premier). */
      order: z.number().optional(),
      /** Brouillon : la fiche n'est pas publiée (utile pour préparer sans exposer). */
      draft: z.boolean().default(false),
      /** Image de couverture (chemin relatif au fichier .md). */
      cover: image().optional(),
      /** Texte alternatif de la couverture (accessibilité). */
      coverAlt: z.string().optional(),
      /** Galerie de captures / schémas. */
      images: z
        .array(
          z.object({
            src: image(),
            alt: z.string(),
            caption: z.string().optional(),
          }),
        )
        .default([]),
      /** Documents joints, placés dans public/documents/. */
      documents: z
        .array(
          z.object({
            label: z.string(),
            /** Chemin public (ex. "/documents/rapport-stage-2026.pdf"). */
            href: z.string(),
            /** Type affiché (PDF, ZIP…). */
            type: z.string().default('PDF'),
          }),
        )
        .default([]),
      /** Liens externes. */
      links: z
        .object({
          github: z.url().optional(),
          demo: z.url().optional(),
          other: z.array(z.object({ label: z.string(), href: z.url() })).default([]),
        })
        .prefault({}),
      /** Contenu vérifié "public-safe" (voir CONTENT-SAFETY.md). */
      publicSafe: z.boolean().default(false),
    }),
});

/**
 * VEILLE TECHNOLOGIQUE — un fichier Markdown par mois.
 *
 * Tout ce qui est affiché sous forme de tableau sur /veille/ est GÉNÉRÉ depuis
 * ces fichiers : vue d'ensemble, chiffres clés, écart exploitation/correctif,
 * cas où le correctif existait déjà. Ne jamais recopier un tableau à la main
 * dans le corps d'une entrée : il divergerait du contenu en quelques semaines.
 *
 * Le corps du fichier contient les faits en liste, le paragraphe « Mon analyse »
 * et la ligne « Lien avec le BTS SIO SISR ».
 */

/** Une source, étiquetée par sa couche dans le dispositif de veille. */
const source = z.object({
  couche: z.enum(coucheKeys as [string, ...string[]]),
  /** Média ou organisme (ex. "CERT-FR", "Rapid7"). */
  editeur: z.string().min(2),
  titre: z.string().min(3),
  /** Date de publication, en clair (ex. "19 décembre 2025"). */
  date: z.string().min(4),
  url: z.url(),
});

/**
 * Un cas = un produit touché. Un mois peut en compter plusieurs
 * (septembre 2026 : quatre éditeurs). C'est l'unité des statistiques.
 */
const cas = z.object({
  produit: z.string().min(2),
  editeur: z.string().min(2),
  /** L'attaque a-t-elle précédé le correctif, ou le correctif existait-il déjà ? */
  exploitation: z.enum(['avant-correctif', 'apres-correctif']),

  /* --- Cas « avant correctif » : alimente le tableau des écarts --- */
  /** Première exploitation connue, en clair ("7 mai 2026", "2023"). */
  premiereExploitation: z.string().optional(),
  /** Divulgation et correctif ("8 juin 2026"). */
  divulgation: z.string().optional(),
  /** Écart entre les deux, en clair ("32 jours", "Près de 3 ans"). */
  ecart: z.string().optional(),

  /* --- Cas « après correctif » : alimente le tableau des correctifs non appliqués --- */
  /** Date de publication du correctif ("15 octobre 2025"). */
  correctif: z.string().optional(),
  /** Quand l'exploitation a été constatée ("Confirmée le 29 mars 2026"). */
  exploitationConstatee: z.string().optional(),
  /** Ce qui a manqué ("L'application du correctif", "La priorité", "Le temps"). */
  manque: z.string().optional(),

  /** Catalogue KEV de la CISA. */
  kev: z
    .object({
      ajout: z.string(),
      echeance: z.string().optional(),
    })
    .optional(),
});

const veille = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/veille' }),
  schema: z
    .object({
      /** Clé de tri, format AAAA-MM. */
      mois: z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/, 'Format attendu : AAAA-MM'),
      /** Titre de l'entrée, sans le mois (il est ajouté à l'affichage). */
      titre: z.string().min(5),
      /** Colonne « Fait marquant » du tableau de vue d'ensemble. */
      faitMarquant: z.string().min(5),
      /** Identifiants CVE cités. */
      cve: z.array(z.string().regex(/^CVE-\d{4}-\d{4,}$/)).default([]),
      /** Score CVSS le plus élevé du mois (optionnel). */
      cvss: z.number().min(0).max(10).optional(),
      /** Produits touchés ce mois-ci. Au moins un. */
      cas: z.array(cas).min(1),
      /** Compétences E5 mobilisées (voir src/data/competences-e5.ts). */
      competencesE5: z.array(z.enum(competenceKeys as [string, ...string[]])).default([]),
      /** Sources, étiquetées par couche. */
      sources: z.array(source).min(2),
    })
    /*
     * RÈGLE DE MÉTHODE, APPLIQUÉE PAR LE BUILD : un fait ne vaut que croisé.
     * Une entrée dont toutes les sources viennent de la même couche est refusée
     * et `npm run build` s'arrête. C'est volontaire.
     */
    .refine((entry) => new Set(entry.sources.map((s) => s.couche)).size >= 2, {
      message:
        'Au moins deux sources de couches différentes sont exigées (règle de méthode : croiser la datation et l’explication ou l’analyse technique).',
      path: ['sources'],
    }),
});

export const collections = { projects, veille };
