# Guide de contenu

Comment faire vivre le portfolio pendant deux ans **sans toucher au code**.

Principe : tout le contenu est dans `src/content/projects/` (fiches Markdown) et `src/data/` (petits fichiers de données). Le site se met à jour automatiquement au prochain `npm run build` (ou au prochain `git push` si le déploiement automatique est en place).

Avant toute publication : relire [CONTENT-SAFETY.md](CONTENT-SAFETY.md).

---

## 1. Ajouter un TP (ou n'importe quel travail BTS)

1. Ouvrir le dossier `src/content/projects/`.
2. Copier `_TEMPLATE.md` et renommer la copie, en minuscules sans accent ni espace, par exemple `tp-vlan-cisco.md`.
   → Le nom du fichier devient l'adresse de la fiche : `/travaux/tp-vlan-cisco`.
3. Remplir l'en-tête (entre les `---`). Champs **obligatoires** :

```yaml
---
title: "Segmentation d’un réseau en VLAN sous Cisco"
kind: tp                # tp | stage | personnel
category: reseaux       # reseaux | systemes | cybersecurite | developpement | web | bases-de-donnees | virtualisation | cloud | ia | scripts | autre
date: 2026-02-10        # AAAA-MM-JJ
summary: "Mise en place de trois VLAN, d’un trunk et du routage inter-VLAN sur une maquette Packet Tracer."
---
```

4. Champs **facultatifs** utiles (à supprimer s'ils ne servent pas) :

```yaml
context: "Cours SISR"            # alimente le filtre « Contexte »
technologies: [Cisco, VLAN, Packet Tracer]   # alimente le filtre « Technologie » et la page Compétences
skills: [Segmentation réseau, Configuration IOS]
bts: [B2]                        # blocs du référentiel : B1, B2, B3
status: termine                  # termine | en-cours | planifie | archive
featured: true                   # mis en avant sur l'accueil + en tête du mode présentation
order: 2                         # ordre dans le mode présentation (plus petit = premier)
```

5. Écrire le corps de la fiche sous l'en-tête, en gardant les titres `##` du modèle (Contexte, Problématique, Objectifs, Réalisation, Technologies, Difficultés, Solutions, Résultat, Compétences). Ils forment le sommaire et les étapes du mode présentation. Vous pouvez en supprimer ou en ajouter.
6. Lancer `npm run dev` et ouvrir `http://localhost:4321/travaux` : la fiche apparaît. Si un champ est mal rempli, le terminal indique **le fichier et le champ** en cause.

> Astuce : `draft: true` cache la fiche du site publié (elle reste visible en `npm run dev`). Pratique pour préparer un TP avant de le publier.

Le champ `technologies` sert de lien avec la page Compétences : si une fiche contient `Linux` dans `technologies` ou `skills`, elle apparaît automatiquement à côté de la compétence « Linux » (la comparaison ignore majuscules et accents).

---

## 2. Ajouter un projet personnel

Même procédure qu'un TP, avec `kind: personnel`. Champs souvent utiles :

```yaml
links:
  github: https://github.com/mon-compte/mon-projet
  demo: https://mon-projet.exemple.fr
  other:
    - label: "Documentation"
      href: https://...
```

---

## 3. Ajouter le stage (ou un deuxième stage)

La fiche `stage-enerdys-2026.md` existe déjà avec tous les blocs attendus par le jury et des `TODO` à remplacer. Pour un autre stage : copier `_TEMPLATE.md`, mettre `kind: stage` et reprendre les mêmes titres de section que la fiche existante (Contexte, Problématique, Objectifs, Rôle personnel, Technologies, Architecture, Fonctionnalités, Captures d'écran, Difficultés, Solutions, Compétences mobilisées, Résultat, Bilan).

L'adresse courte `/stage` pointe vers `stage-enerdys-2026` (modifiable dans `astro.config.mjs` → `redirects` et `public/_redirects`).

---

## 4. Ajouter des images (captures, schémas)

### Dans une fiche (recommandé)

1. Créer un dossier du même nom que la fiche, à côté d'elle : `src/content/projects/tp-vlan-cisco/`.
2. Y déposer les images (PNG, JPG ou WebP ; 1600 px de large suffisent — Astro génère les tailles réduites et le format optimisé automatiquement).
3. Les déclarer dans l'en-tête :

```yaml
cover: ./tp-vlan-cisco/schema.png
coverAlt: "Schéma de la maquette : trois VLAN reliés à un routeur"
images:
  - src: ./tp-vlan-cisco/schema.png
    alt: "Schéma de la maquette : trois VLAN reliés à un routeur"
    caption: "Topologie Packet Tracer"
  - src: ./tp-vlan-cisco/config-trunk.png
    alt: "Extrait de configuration du trunk sur le commutateur"
    caption: "Configuration du port trunk (adresses d’exemple)"
```

- `cover` s'affiche sur la carte et en tête de la fiche.
- `images` s'affichent en galerie sous la fiche **et** dans la page `/galerie`, avec visionneuse plein écran.
- `alt` est obligatoire : décrivez l'image en une phrase (accessibilité).

### Image libre (hors fiche)

1. Déposer l'image dans `src/assets/gallery/`.
2. L'ajouter dans `src/data/gallery.ts` :

```ts
{ file: 'architecture-labo.png', alt: 'Architecture du laboratoire de virtualisation', caption: 'Laboratoire Proxmox', category: 'architecture', date: '2026-03' },
```

Catégories : `capture`, `schema`, `architecture`, `interface`, `resultat`, `configuration`, `photo`.

**Avant d'ajouter une capture** : flouter ou recadrer toute information sensible (voir CONTENT-SAFETY.md).

---

## 5. Ajouter un PDF (rapport, compte rendu, CV)

1. Vérifier le document avec CONTENT-SAFETY.md (produire une **version publique** si nécessaire).
2. Déposer le fichier dans `public/documents/`, avec un nom simple : `rapport-stage-enerdys-2026-public.pdf`.
3. Le référencer :

**Joint à une fiche** (en-tête de la fiche) :

```yaml
documents:
  - label: "Compte rendu du TP"
    href: /documents/tp-vlan-compte-rendu.pdf
    type: PDF
```

**Dans la page Documents** (`src/data/documents.ts`) :

```ts
{
  title: 'Rapport de stage — Enerdys (version publique)',
  href: '/documents/rapport-stage-enerdys-2026-public.pdf',
  category: 'rapport',        // rapport | dossier | schema | cv | technique | autre
  description: 'Version anonymisée du rapport de stage de première année.',
  date: '2026-07',
},
```

**CV** : déposer le PDF dans `public/documents/` puis, dans `src/data/profile.ts`, remplacer `cv: undefined` par `cv: '/documents/cv-hamza-jallabi.pdf'`. Le bouton apparaît dans la section Contact et la page Documents.

Les documents joints aux fiches apparaissent aussi automatiquement dans `/documents`.

---

## 6. Ajouter une certification

Dans `src/data/certifications.ts`, ajouter un objet au tableau :

```ts
{
  name: 'CCNA: Introduction to Networks',
  issuer: 'Cisco Networking Academy',
  date: '2026-05',                    // AAAA-MM
  type: 'badge',                      // certification | formation | badge
  description: 'Fondamentaux des réseaux : modèle OSI, adressage IP, commutation.',
  url: 'https://www.credly.com/badges/...',   // lien officiel de vérification (optionnel)
  pdf: '/documents/ccna-itn.pdf',             // certificat PDF dans public/documents/ (optionnel)
  status: 'obtenue',                  // obtenue | en-cours | prevue (optionnel)
},
```

Elle apparaît sur `/parcours#certifications`.

---

## 7. Modifier les compétences

Dans `src/data/skills.ts` : chaque domaine (Réseaux, Systèmes, Cybersécurité, Développement, Outils) contient une liste `skills`.

```ts
{ name: 'Linux', note: 'Administration, ligne de commande' },
```

- Le `name` doit correspondre exactement (majuscules/accents ignorés) au nom utilisé dans le champ `technologies` ou `skills` des fiches pour que le lien compétence → fiches se fasse.
- Pour ajouter un domaine : copier un bloc `{ id, label, icon, description, skills }`. Icônes disponibles : voir la liste dans `src/components/Icon.astro`.
- Le placeholder `TODO — technologies de développement à confirmer` (avec `placeholder: true`) est à remplacer par vos vraies compétences quand elles seront confirmées.

**Règle** : ne lister que ce qui est réellement maîtrisé et démontrable.

---

## 8. Modifier le parcours

Dans `src/data/timeline.ts`, chaque étape est un objet :

```ts
{
  date: 'Juin 2026',            // texte affiché
  iso: '2026-06',               // AAAA ou AAAA-MM (sert au tri et au statut automatique)
  title: 'Stage chez Enerdys',
  place: 'Entzheim',
  description: 'Stage de première année : développement d’un SaaS / outil web.',
  href: '/travaux/stage-enerdys-2026',   // lien optionnel
  highlight: true,                       // mise en avant optionnelle
},
```

Le statut (réalisé / en cours / prévu) est calculé automatiquement à partir de la date du build ; forcez-le avec `status: 'done' | 'current' | 'planned'` si besoin.

---

## 9. Modifier la présentation, l'accroche et les liens de contact

Tout est dans `src/data/profile.ts` :

- `tagline` : phrase de la hero.
- `about` : les paragraphes de la section « En bref ».
- `focus` : les domaines affichés en badges.
- `links.email`, `links.github`, `links.linkedin`, `links.cv` : remplacer les `TODO`. Tant qu'une valeur commence par `TODO`, le site affiche un placeholder au lieu d'un faux lien.
- `availability` : phrase de la section Contact.

---

## 10. Catégories, natures, statuts

Les listes autorisées sont dans `src/data/taxonomy.ts`. Pour ajouter une catégorie (ex. `telephonie`), ajouter une ligne dans `CATEGORIES` : les filtres et la validation se mettent à jour seuls.

---

## 11. Mode présentation

- `/presentation` liste les fiches dans l'ordre : `featured: true` d'abord (triées par `order`), puis les autres par date.
- Sur une fiche, « Présenter cette fiche » (ou `?presentation` dans l'URL) masque la navigation, agrandit le texte et active les raccourcis : `↓`/`Espace` section suivante, `↑` précédente, `→`/`←` fiche suivante/précédente, `Échap` quitter.
- Chaque titre `##` de la fiche est une étape.

---

## 12. Vérifier avant de publier

```bash
npm run build
```

- Si le build échoue, le message indique le fichier et le champ à corriger.
- Ouvrir `npm run preview` et parcourir les pages modifiées.
- Relire CONTENT-SAFETY.md, puis passer `publicSafe: true` dans l'en-tête de la fiche vérifiée.
- `git add . && git commit -m "Ajout TP VLAN" && git push` → le site se met à jour.
