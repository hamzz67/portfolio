---
title: "Ce portfolio : hébergement, déploiement continu et sécurisation HTTP"
kind: personnel
category: web
categories: [cybersecurite, cloud]
date: 2026-10-08
summary: "Mise en ligne et durcissement de ce site : déploiement automatique depuis Git, en-têtes de sécurité notés A+ (135/100) par Mozilla Observatory, et deux incidents de production détectés puis corrigés."
context: "Projet personnel, en ligne depuis septembre 2026"
role: "Seul responsable : conception, hébergement, sécurité, contenu"
technologies:
  - Cloudflare Pages
  - Git / GitHub
  - Astro
  - TypeScript
  - HTTP (CSP, HSTS)
  - DNS / TLS
skills:
  - Déploiement continu
  - Durcissement HTTP
  - Politique de sécurité du contenu (CSP)
  - Diagnostic d’incident en production
  - Référencement technique
bts: [B1, B3]
competencesE5: ['presence-en-ligne', 'mettre-a-disposition', 'repondre-incidents']
status: en-cours
featured: true
order: 3
draft: false
cover: ./portfolio-infrastructure-2026/capture-01-observatory-a-plus.png
coverAlt: "Rapport Mozilla HTTP Observatory pour hamzzportfolio.pages.dev : note A+, score 135 sur 100, 12 tests réussis sur 12"
images: []
links:
  github: https://github.com/hamzz67/portfolio
  other:
    - label: "Relancer l’analyse Mozilla Observatory"
      href: https://developer.mozilla.org/en-US/observatory/analyze?host=hamzzportfolio.pages.dev
publicSafe: true
---

## Contexte

Le portfolio est l’outil de présentation exigé pour l’épreuve E5 du BTS SIO. Plutôt que d’utiliser un constructeur de sites, je l’ai traité comme un **service à mettre en production** : un dépôt Git, une chaîne de déploiement, un hébergement, une configuration de sécurité, et une surveillance de ce qui est réellement servi aux visiteurs.

Le site est en ligne depuis septembre 2026 sur `hamzzportfolio.pages.dev`.

## Problématique

Un site statique paraît sans risque : pas de base de données, pas de formulaire, pas de compte utilisateur. Mais il reste exposé à trois choses :

- **l’injection de contenu** (XSS) si une page venait à contenir un script non prévu ;
- **l’intégration dans un autre site** (clickjacking) ou le passage en HTTP non chiffré ;
- **les erreurs de configuration** qui ne cassent rien à l’écran mais faussent ce que le site déclare aux navigateurs et aux moteurs de recherche.

La difficulté est que ces trois problèmes sont **invisibles** quand on regarde le site normalement.

## Objectifs

1. Déployer automatiquement chaque modification, sans intervention manuelle sur un serveur.
2. Servir le site uniquement en HTTPS, avec des en-têtes de sécurité stricts.
3. Interdire l’exécution de tout script inline non prévu, sans casser le site.
4. Obtenir une note vérifiable par un outil tiers, que n’importe qui peut relancer.

## Réalisation

### 1. Chaîne de déploiement

Le code est versionné sur GitHub. **Cloudflare Pages** surveille la branche `main` : à chaque `git push`, il installe les dépendances, lance `astro check` (vérification des types et du contenu), construit le site et le publie sur son réseau de distribution. Le site est à jour en un peu plus d’une minute.

Le build sert aussi de **contrôle qualité** : une fiche sans texte alternatif sur une image, ou une entrée de veille dont toutes les sources viennent du même type de site, fait échouer la construction. Rien n’est publié tant que l’erreur n’est pas corrigée.

### 2. En-têtes de sécurité

Les en-têtes sont déclarés dans un fichier `_headers` versionné avec le code :

| En-tête | Rôle |
| --- | --- |
| `Strict-Transport-Security` | Le navigateur refuse toute connexion non chiffrée au site pendant deux ans |
| `Content-Security-Policy` | Liste blanche de ce que la page a le droit de charger et d’exécuter |
| `X-Frame-Options: DENY` et `frame-ancestors 'none'` | Le site ne peut pas être affiché dans une page tierce |
| `X-Content-Type-Options: nosniff` | Le navigateur ne devine pas le type d’un fichier |
| `Referrer-Policy` | Limite les informations transmises aux sites vers lesquels pointent mes liens |
| `Permissions-Policy` | Coupe caméra, micro, géolocalisation et paiement, dont le site n’a pas besoin |
| `Cross-Origin-Opener-Policy` / `-Resource-Policy` | Isole le site des autres origines |

### 3. Une CSP sans `unsafe-inline`

Le point le plus délicat. Une CSP qui autorise `'unsafe-inline'` pour les scripts laisse passer exactement ce qu’elle est censée bloquer : un script injecté dans la page.

J’ai d’abord recensé les scripts inline de toutes les pages construites : il n’y en a qu’un, celui qui applique le thème clair ou sombre avant l’affichage. Plutôt que de l’autoriser globalement, la CSP l’autorise **par son empreinte SHA-256**.

Recopier cette empreinte à la main aurait été fragile : la moindre modification du script change l’empreinte, et le site aurait cessé de fonctionner sans erreur visible au build. J’ai donc écrit une **étape de build** qui calcule les empreintes de tous les scripts inline et les inscrit dans `_headers`. Elle fait aussi échouer la construction si une page contient un attribut `onclick=` ou un lien `javascript:`, qui ne peuvent pas être autorisés par empreinte.

### 4. Vérification

Avant publication, j’ai servi le site construit **avec les en-têtes de production** sur un serveur local, puis parcouru les pages dans un navigateur en écoutant les événements de violation de la CSP : aucun blocage. Après publication, même contrôle sur le site en ligne, puis analyse par Mozilla HTTP Observatory.

## Incidents détectés et corrigés

### URL canonique pointant vers le site d’un tiers

En relisant le code source des pages en ligne, j’ai constaté que **chaque page déclarait comme adresse officielle `portfolio.pages.dev`** — un sous-domaine qui appartient à quelqu’un d’autre. La variable d’environnement qui définit l’adresse du site avait été mal renseignée dans Cloudflare.

À l’écran, rien ne se voyait. Mais l’URL canonique dit aux moteurs de recherche « la vraie version de cette page est ailleurs » : le site pouvait être déréférencé au profit d’un tiers, et les aperçus de liens partagés (LinkedIn) pointaient au mauvais endroit.

Correction en deux temps : la variable a été rectifiée dans Cloudflare, et la configuration du site **ignore désormais une adresse manifestement fausse** (un autre sous-domaine `pages.dev`, `example.com`, `localhost`) au profit de la bonne, avec un avertissement dans le journal de build. Une erreur de saisie ne peut plus se reproduire silencieusement.

### Thème perdu à chaque changement de page

En testant la CSP, j’ai remarqué qu’après un clic sur un lien, la page perdait le thème choisi par le visiteur et ses animations d’apparition. Le défaut existait déjà en production : la navigation sans rechargement remplace les attributs de la balise `<html>`, et effaçait ceux posés par le script de thème. Le script les réapplique maintenant sur la nouvelle page juste avant l’échange.

## Résultat

- **Mozilla HTTP Observatory : A+, 135/100, 12 tests réussis sur 12.** Le lien ci-dessous relance l’analyse : la note se vérifie, elle ne se déclare pas.
- **Lighthouse, profil mobile : performance 95, accessibilité 100, bonnes pratiques 100, référencement 100.** Page d’accueil complète en 287 Ko, aucun décalage de mise en page à l’affichage.
- Aucun script ni aucune police chargés depuis un service tiers : le site ne transmet l’adresse IP de ses visiteurs à personne d’autre que son hébergeur.
- Un fichier `/.well-known/security.txt` (RFC 9116) indique à qui signaler un problème de sécurité.

## Compétences mobilisées

**Développer la présence en ligne de l’organisation.** Mettre en ligne un site, maîtriser son adresse, ce qu’il déclare aux moteurs de recherche et l’image qu’il donne quand il est partagé : l’incident de l’URL canonique est exactement un problème de présence en ligne, invisible sans vérification technique.

**Mettre à disposition un service informatique.** Une chaîne qui construit, contrôle et publie automatiquement, et qui refuse de publier une version défectueuse : c’est la mise en production d’un service, à petite échelle.

**Répondre aux incidents.** Deux défauts de production repérés par l’observation, diagnostiqués jusqu’à leur cause, corrigés, puis protégés contre leur réapparition.

## Ce que j’en retiens

La sécurité d’un site se configure, mais surtout se **vérifie de l’extérieur**. Les deux incidents de cette fiche ne provoquaient aucune erreur et n’étaient visibles qu’en lisant ce que le serveur envoie réellement. C’est aussi pourquoi l’empreinte de la CSP est calculée par la machine et non recopiée : une protection qui dépend d’une manipulation manuelle finit par être cassée.
