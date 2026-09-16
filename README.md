# Portfolio — Hamza Jallabi

Portfolio numérique personnel, conçu pour accompagner le BTS SIO SISR (Lycée René Cassin, Strasbourg, 2025-2027) et servir de support devant un jury, des enseignants, des entreprises et des recruteurs.

> Site statique · Astro 7 · TypeScript · CSS moderne · zéro backend · zéro tracker.

## Démarrer

```bash
npm install        # installe les dépendances (une seule fois)
npm run dev        # lance le site en local → http://localhost:4321
npm run build      # vérifie les types + génère le site dans dist/
npm run preview    # prévisualise le build
```

Prérequis : **Node.js 22.12 ou plus récent** (`node -v` pour vérifier).

## Les trois documents à connaître

| Fichier | Pour quoi faire |
| --- | --- |
| [CONTENT-GUIDE.md](CONTENT-GUIDE.md) | Ajouter un TP, un projet, des images, un PDF, une certification ; modifier compétences et parcours. |
| [CONTENT-SAFETY.md](CONTENT-SAFETY.md) | Check-list à relire **avant chaque publication** (données sensibles, captures, documents). |
| [DEPLOYMENT.md](DEPLOYMENT.md) | Mettre le site en ligne : GitHub → Cloudflare Pages → nom de domaine → HTTPS. |

## Où sont les choses

```
src/
├── content/projects/     ← FICHES DE TRAVAUX (TP, stage, projets) — 1 fichier .md = 1 fiche
│   ├── _TEMPLATE.md      ← modèle à copier
│   └── stage-enerdys-2026.md
├── data/                 ← DONNÉES ÉDITABLES (aucun code à comprendre)
│   ├── profile.ts        ← nom, accroche, présentation, liens de contact
│   ├── timeline.ts       ← parcours (timeline)
│   ├── skills.ts         ← compétences par domaine
│   ├── certifications.ts ← certifications, badges, formations
│   ├── documents.ts      ← documents publics (rapports, CV…)
│   ├── gallery.ts        ← images libres de la galerie
│   └── taxonomy.ts       ← listes de valeurs (catégories, natures, statuts, blocs BTS)
├── assets/gallery/       ← images libres de la galerie
├── components/           ← composants d'interface (Astro)
├── layouts/Base.astro    ← squelette HTML, SEO, polices, thème
├── pages/                ← une page = une URL (/, /travaux, /travaux/[slug], /parcours, …)
├── scripts/              ← JavaScript côté client (filtres, visionneuse, mode présentation…)
├── styles/               ← tokens de design (couleurs, typo) + styles globaux
├── lib/                  ← fonctions utilitaires (tri, références, liens compétences ↔ fiches)
└── content.config.ts     ← schéma de validation des fiches
public/
├── documents/            ← PDF publics (référencés dans data/documents.ts ou les fiches)
├── .well-known/security.txt
├── _headers, _redirects  ← configuration Cloudflare Pages (en-têtes de sécurité, redirections)
└── favicon.svg, og-default.png, …
```

## Pages

| URL | Contenu |
| --- | --- |
| `/` | Accueil : hero, présentation courte, sélection de travaux, parcours, compétences, contact |
| `/travaux` | Bibliothèque de toutes les fiches, avec recherche et filtres (nature, domaine, technologie, année, contexte) |
| `/travaux/<slug>` | Fiche détaillée (contexte → problématique → objectifs → réalisation → … → bilan) |
| `/stage` | Redirige vers la fiche du stage |
| `/parcours` | Timeline + certifications |
| `/competences` | Compétences par domaine, reliées aux fiches ; blocs du référentiel BTS |
| `/galerie` | Toutes les images (fiches + images libres), visionneuse plein écran |
| `/documents` | Documents publics : ouvrir / télécharger |
| `/presentation` | Mode présentation pour le jury (navigation clavier) |

## Stack et choix techniques

- **Astro** : génère du HTML statique (rapide, indexable, hébergeable partout), valide le contenu Markdown avec un schéma, optimise les images et les polices. Pas de framework JavaScript côté client : les quelques interactions (filtres, visionneuse, thème, mode présentation) sont écrites en TypeScript natif (~30 Ko de JS au total).
- **CSS moderne sans framework** : variables de design, `clamp()`, `color-mix()`, grilles ; thème clair/sombre ; `prefers-reduced-motion` respecté.
- **Polices auto-hébergées** (licence SIL OFL, gratuites) : Fraunces (titres), Instrument Sans (texte), JetBrains Mono (étiquettes). Aucune requête vers Google Fonts.
- **Icônes** : tracés Lucide (licence ISC) inclus dans `src/components/Icon.astro`. Aucune dépendance.
- **Dépendances** : `astro`, `@astrojs/sitemap`, `sharp` (images), 3 paquets de polices, `typescript` + `@astrojs/check` (vérification). C'est tout.

## Commandes utiles

| Commande | Effet |
| --- | --- |
| `npm run check` | Vérifie les types et le schéma des fiches sans construire |
| `npm run icons` | Régénère favicon, icônes et image Open Graph (`scripts/generate-icons.mjs`) |
| `npm run build:only` | Build sans la vérification des types (plus rapide) |

## Licence

Code : libre d'utilisation pour ce portfolio. Contenu (textes, images, documents) : © Hamza Jallabi.
