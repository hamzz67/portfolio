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

export const collections = { projects };
