# Déploiement — mettre le portfolio en ligne

Objectif : **GitHub → `git push` → déploiement automatique → votre nom de domaine, en HTTPS.**
Aucun serveur à administrer, aucun coût d'hébergement.

---

## Solution recommandée

| | Recommandation | Détail |
| --- | --- | --- |
| **Hébergement** | **Cloudflare Pages** | Gratuit, illimité pour un site statique, CDN mondial, déploiement à chaque push, prévisualisation de chaque branche, en-têtes de sécurité (`public/_headers`) et redirections (`public/_redirects`) pris en charge nativement. |
| **Coût** | 0 € pour l'hébergement | Seul le nom de domaine est payant. |
| **Domaine** | Un `.fr` ou `.com`, ex. `hamzajallabi.fr` | ~6 à 15 €/an. Le plus simple : l'acheter **chez Cloudflare Registrar** (prix coûtant, DNS déjà en place). Sinon OVH, Gandi, Ionos, Namecheap fonctionnent aussi (il faudra alors pointer les serveurs DNS vers Cloudflare, ou créer un enregistrement CNAME). |
| **HTTPS** | Automatique | Certificat fourni et renouvelé par Cloudflare. Rien à faire. |
| **DNS** | Géré par Cloudflare | Un enregistrement `CNAME` créé automatiquement quand vous ajoutez le domaine au projet Pages. |
| **Déploiement** | Automatique à chaque `git push` sur `main` | Build : `npm run build`, dossier de sortie : `dist`. |
| **Mise à jour** | Modifier un fichier → `git push` | Le site est reconstruit et en ligne en 1 à 2 minutes. |

**Alternative** : GitHub Pages (gratuit aussi). Un workflow prêt à l'emploi est fourni dans `.github/workflows/deploy-github-pages.yml`. Limites : pas d'en-têtes HTTP de sécurité personnalisés, un seul site par dépôt, configuration du domaine un peu plus manuelle. Voir la section « Alternative : GitHub Pages » en bas.

---

## Étape 0 — Prérequis (une seule fois)

1. **Node.js 22 ou plus** : https://nodejs.org (version LTS). Vérifier : `node -v`.
2. **Git** : `git --version`. Configurer votre identité si ce n'est pas fait :
   ```bash
   git config --global user.name "Hamza Jallabi"
   git config --global user.email "votre-email@exemple.fr"
   ```
3. **Un compte GitHub** : https://github.com/signup
4. **Un compte Cloudflare** : https://dash.cloudflare.com/sign-up (gratuit).

---

## Étape 1 — Installer et lancer le site en local

Dans un terminal, à la racine du projet :

```bash
npm install
npm run dev
```

Ouvrir http://localhost:4321 dans le navigateur. Le site se recharge tout seul quand vous modifiez un fichier. `Ctrl + C` pour arrêter.

---

## Étape 2 — Créer le build (vérification)

```bash
npm run build
```

- Cela vérifie les types et la validité des fiches, puis génère le site complet dans le dossier `dist/`.
- Si une erreur apparaît, le message indique le fichier et le problème. Corriger, relancer.
- Pour visualiser exactement ce qui sera mis en ligne : `npm run preview` → http://localhost:4321.

> Le dossier `dist/` n'est pas à envoyer sur GitHub (il est ignoré par `.gitignore`) : c'est Cloudflare qui le régénère à chaque push.

---

## Étape 3 — Créer le dépôt GitHub et envoyer le code

1. Sur GitHub : **New repository** → nom `portfolio` (ou `portfolio-hamza`), **Public** ou **Private** (les deux fonctionnent avec Cloudflare Pages), **sans** README ni .gitignore (ils existent déjà) → *Create repository*.
2. Dans le terminal, à la racine du projet (le dépôt Git local est déjà initialisé) :

```bash
git add .
git commit -m "Portfolio — première version"
git branch -M main
git remote add origin https://github.com/VOTRE-IDENTIFIANT/portfolio.git
git push -u origin main
```

À la première connexion, Git ouvre une fenêtre de connexion GitHub (Git Credential Manager) : se connecter, c'est mémorisé.

3. Rafraîchir la page GitHub : les fichiers sont en ligne.

---

## Étape 4 — Déployer sur Cloudflare Pages

1. https://dash.cloudflare.com → menu **Workers & Pages** → **Create** → onglet **Pages** → **Connect to Git**.
2. Autoriser Cloudflare à accéder à votre compte GitHub, choisir le dépôt `portfolio` → **Begin setup**.
3. Paramètres du build :
   - **Project name** : `portfolio-hamza` (donne l'adresse provisoire `portfolio-hamza.pages.dev`)
   - **Production branch** : `main`
   - **Framework preset** : `Astro`
   - **Build command** : `npm run build`
   - **Build output directory** : `dist`
   - **Environment variables** (section avancée) : ajouter `NODE_VERSION` = `22` (le fichier `.node-version` le fait aussi) et `SITE_URL` = `https://votre-domaine.fr` (vous pourrez l'ajouter plus tard, quand le domaine sera connecté).
4. **Save and Deploy**. Le premier build prend 1 à 3 minutes.
5. Le site est en ligne sur `https://portfolio-hamza.pages.dev` — déjà en HTTPS. Vérifier toutes les pages.

À partir de maintenant, **chaque `git push` sur `main` redéploie le site**. Chaque autre branche produit une URL de prévisualisation.

---

## Étape 5 — Acheter et connecter le nom de domaine

### 5a. Acheter le domaine

**Option simple (recommandée)** — chez Cloudflare :
dashboard → **Domain Registration** → **Register Domains** → chercher `hamzajallabi.fr` (ou autre) → acheter. Le domaine est immédiatement géré par Cloudflare.

**Option registrar externe** (OVH, Gandi, Ionos…) : acheter le domaine, puis dans Cloudflare → **Add a domain** → suivre l'assistant, qui vous demandera de remplacer les serveurs DNS du registrar par ceux de Cloudflare (2 noms de serveurs à copier dans l'interface du registrar ; propagation : de quelques minutes à 24 h).

### 5b. Connecter le domaine au projet Pages

1. **Workers & Pages** → votre projet → onglet **Custom domains** → **Set up a custom domain**.
2. Saisir `hamzajallabi.fr` → **Continue** → Cloudflare crée l'enregistrement DNS (`CNAME hamzajallabi.fr → portfolio-hamza.pages.dev`) → **Activate domain**.
3. Répéter avec `www.hamzajallabi.fr` si vous voulez que `www.` fonctionne aussi (recommandé). Cloudflare redirige alors `www` vers le domaine principal automatiquement.
4. Attendre le statut **Active** (quelques minutes). Le certificat HTTPS est émis automatiquement.

### 5c. Dire au site quel est son domaine

Une fois le domaine actif :

1. Dans Cloudflare Pages → **Settings** → **Environment variables** → `SITE_URL` = `https://hamzajallabi.fr` (Production). Ou modifier directement la valeur par défaut dans `astro.config.mjs` (`const SITE_URL = ...`).
2. Mettre à jour `public/.well-known/security.txt` (ligne `Contact:` et date `Expires:`).
3. `git commit` + `git push` → le sitemap, les balises Open Graph et les URL canoniques utilisent maintenant le bon domaine.

---

## Étape 6 — HTTPS et sécurité (vérification)

Tout est automatique, mais vérifier une fois :

- Cloudflare → votre domaine → **SSL/TLS** → mode **Full (strict)** et **Always Use HTTPS** activé (Edge Certificates).
- Ouvrir `https://hamzajallabi.fr` : cadenas présent, pas d'avertissement.
- Ouvrir `http://hamzajallabi.fr` : redirige vers `https://`.
- Les en-têtes de sécurité du fichier `public/_headers` sont appliqués : vérifier sur https://securityheaders.com (note attendue : A ou A+).

---

## Étape 7 — Vérifier le site en ligne

- [ ] Toutes les pages s'ouvrent : `/`, `/travaux`, `/travaux/stage-synerdys-2026`, `/stage` (redirection), `/parcours`, `/competences`, `/galerie`, `/documents`, `/presentation`, une URL inexistante (page 404 personnalisée).
- [ ] `https://votre-domaine/sitemap-index.xml` et `/robots.txt` mentionnent le bon domaine.
- [ ] Sur mobile (vrai téléphone) : navigation, menu, cartes, visionneuse.
- [ ] Partage du lien sur LinkedIn / Discord / WhatsApp : l'aperçu montre l'image Open Graph (`og-default.png`).
- [ ] Test de performance : https://pagespeed.web.dev (attendu : 95-100 sur les quatre scores).
- [ ] Google Search Console (facultatif, recommandé pour être indexé plus vite) : https://search.google.com/search-console → ajouter la propriété du domaine (Cloudflare peut vérifier automatiquement) → soumettre le sitemap.

---

## Étape 8 — Mettre à jour le site plus tard

C'est le quotidien pendant deux ans :

```bash
# 1. modifier / ajouter du contenu (voir CONTENT-GUIDE.md)
npm run dev          # vérifier en local
npm run build        # s'assurer que tout est valide

# 2. publier
git add .
git commit -m "Ajout du TP routage RIP"
git push
```

Une à deux minutes plus tard, le site est à jour. L'historique des déploiements est visible dans Cloudflare Pages (avec possibilité de **revenir à une version précédente** en un clic : *Rollback*).

### Mettre à jour les dépendances (une fois par trimestre, facultatif)

```bash
npm outdated                 # voir ce qui a une nouvelle version
npm update                   # mises à jour mineures
npm run build                # vérifier que tout fonctionne
```

Pour une version majeure d'Astro, suivre le guide de migration officiel : https://docs.astro.build/en/upgrade-astro/

---

## Alternative : GitHub Pages

1. Sur GitHub, dans le dépôt : **Settings** → **Pages** → **Build and deployment** → Source : **GitHub Actions**.
2. Le workflow `.github/workflows/deploy-github-pages.yml` se déclenche à chaque push sur `main` (onglet **Actions** pour suivre).
3. Domaine personnalisé : **Settings** → **Pages** → **Custom domain** → saisir `hamzajallabi.fr` → GitHub demande de créer chez votre registrar :
   - 4 enregistrements `A` vers `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - un `CNAME www` → `VOTRE-IDENTIFIANT.github.io`
   Puis cocher **Enforce HTTPS** (disponible après vérification du DNS, jusqu'à 24 h).
4. Créer un fichier `public/CNAME` contenant uniquement `hamzajallabi.fr` (sinon GitHub perd le domaine à chaque déploiement).
5. Définir `SITE_URL` : **Settings** → **Secrets and variables** → **Actions** → **Variables** → `SITE_URL` = `https://hamzajallabi.fr`.

> Sans domaine personnalisé, GitHub Pages sert le site sous `https://identifiant.github.io/portfolio/` : il faut alors ajouter `base: '/portfolio'` dans `astro.config.mjs` et préfixer les liens internes. Cloudflare Pages n'a pas cette contrainte — c'est l'une des raisons de le recommander.

---

## Dépannage

| Symptôme | Cause probable | Solution |
| --- | --- | --- |
| Le build échoue sur Cloudflare avec une erreur Node | Version de Node trop ancienne | Variable `NODE_VERSION = 22` dans les paramètres du projet |
| Le build échoue : « Invalid frontmatter » / « schema » | Un champ mal rempli dans une fiche | Lire le message : il nomme le fichier et le champ. `npm run build` en local reproduit l'erreur |
| Le domaine affiche une erreur 522 / « not found » | DNS pas encore propagé ou domaine non activé dans Pages | Attendre, vérifier l'onglet Custom domains (statut Active) |
| L'aperçu de partage (LinkedIn) montre l'ancien contenu | Cache des réseaux sociaux | https://www.linkedin.com/post-inspector/ pour forcer le rafraîchissement |
| Une image n'apparaît pas | Chemin incorrect dans le `.md` | Le chemin est relatif au fichier `.md` (ex. `./mon-dossier/image.png`) |
| `git push` refusé | Identifiants GitHub | Se reconnecter via la fenêtre Git Credential Manager, ou créer un *Personal Access Token* |
