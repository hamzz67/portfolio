---
title: "Stage chez Synerdys — application web de gestion d’audits énergétiques"
kind: stage
category: developpement
categories: [web, cybersecurite, systemes]
date: 2026-06-01
endDate: 2026-07-03
summary: "Cinq semaines chez Synerdys (Entzheim) : création, sécurisation et préparation de la mise en ligne d’une application SaaS qui centralise clients, dossiers d’audit, devis, factures et tableaux de bord."
context: "Stage de première année"
organization: "Synerdys — Entzheim"
role: "Stagiaire SISR — conception, développement, sécurisation, préparation du déploiement"
technologies:
  - Python
  - Flask
  - SQLAlchemy
  - SQLite
  - PostgreSQL
  - Bootstrap 5
  - JavaScript
  - Chart.js
  - pytest
  - GitHub Actions
  - Nginx
  - Gunicorn
  - Ubuntu Server
  - Claude Code
skills:
  - Analyse du besoin utilisateur
  - Modélisation de données
  - Développement web
  - Sécurisation d’une application
  - Sauvegardes et tâches planifiées
  - Tests automatisés
  - Préparation d’un déploiement Linux
  - Travail en binôme
bts: [B1, B2, B3]
competencesE5: ['mode-projet', 'mettre-a-disposition', 'gerer-patrimoine', 'presence-en-ligne']
status: termine
featured: true
order: 1
publicSafe: true
cover: ./stage-synerdys-2026/capture-01-tableau-de-bord.jpg
coverAlt: "Tableau de bord de l’application : indicateurs, chiffre d’affaires, dossiers par statut, alertes (données de démonstration)"
images:
  - src: ./stage-synerdys-2026/capture-02-signature-devis.jpg
    alt: "Page publique de signature en ligne d’un devis, accessible par lien unique"
    caption: "Signature en ligne du devis, sans création de compte (coordonnées masquées)"
  - src: ./stage-synerdys-2026/capture-06-devis-pdf.jpg
    alt: "Première page du devis PDF généré, avec QR code de signature"
    caption: "Devis PDF généré par l’application, QR code vers la page de signature (coordonnées masquées)"
  - src: ./stage-synerdys-2026/capture-07-kanban.jpg
    alt: "Vue Kanban des dossiers d’audit par statut : ouvert, en cours, clôturé"
    caption: "Kanban des dossiers, changement de statut par glisser-déposer (données de démonstration)"
  - src: ./stage-synerdys-2026/capture-08-pipeline-crm.jpg
    alt: "Pipeline CRM des prospects, de « à contacter » à « converti » ou « perdu »"
    caption: "Pipeline commercial : les prospects issus du site vitrine arrivent ici automatiquement (données de démonstration)"
  - src: ./stage-synerdys-2026/capture-09-calendrier.jpg
    alt: "Calendrier mensuel des visites, échéances de dossiers et factures à relancer"
    caption: "Calendrier des visites terrain et des échéances"
  - src: ./stage-synerdys-2026/capture-05-fiche-dossier.jpg
    alt: "Fiche détaillée d’un dossier d’audit : informations, client, visites, temps passé, documents, messagerie"
    caption: "Fiche d’un dossier d’audit (coordonnées du client masquées)"
  - src: ./stage-synerdys-2026/capture-11-liste-devis.jpg
    alt: "Liste des devis avec filtres par statut : brouillon, envoyé, signé, payé, refusé"
    caption: "Liste des devis et de leurs statuts (données de démonstration)"
  - src: ./stage-synerdys-2026/capture-12-rentabilite.jpg
    alt: "Rentabilité par dossier : heures, chiffre d’affaires facturé, coût estimé, marge"
    caption: "Rentabilité par dossier, calculée à partir du temps saisi (données de démonstration)"
  - src: ./stage-synerdys-2026/capture-13-statistiques.jpg
    alt: "Statistiques globales : devis créés et signés, taux de conversion, chiffre d’affaires mensuel, non-conformités par type"
    caption: "Statistiques de l’activité (données de démonstration, e-mails masqués)"
  - src: ./stage-synerdys-2026/capture-03-api-documentation.jpg
    alt: "Documentation interactive de l’API REST (Swagger UI) avec la clé API masquée"
    caption: "API REST documentée avec Swagger UI, utilisée par le site vitrine (clé masquée)"
  - src: ./stage-synerdys-2026/capture-04-connexion.jpg
    alt: "Page de connexion de l’application"
    caption: "Page de connexion ; une deuxième vérification par e-mail est demandée à l’administrateur"
documents: []
links: {}
---

## Contexte

Stage de première année de BTS SIO SISR, du 1er juin au 3 juillet 2026 (cinq semaines), chez **Synerdys**, une entreprise individuelle d’Entzheim (Bas-Rhin) spécialisée dans l’audit énergétique et les diagnostics immobiliers réglementaires : DPE, amiante, plomb, électricité, gaz, termites. L’entreprise s’appelait Enerdys au début du stage et a changé de nom en cours de route.

Chaque diagnostic a une durée de validité réglementaire (par exemple dix ans pour un DPE, trois ans pour l’électricité, six mois pour les termites). Le suivi de ces échéances est au cœur du métier.

## Problématique

Avant le stage, l’activité était gérée avec des outils bureautiques dispersés : tableurs, documents texte, PDF et e-mails envoyés à la main. Conséquences : ressaisies, risques d’oubli (relances de devis, factures impayées, diagnostics qui expirent) et aucune vue d’ensemble de l’activité.

Le besoin : **un outil unique, accessible en ligne**, adapté au métier du diagnostic, qui suive un client du premier contact jusqu’à la facture.

## Objectifs

Définis avec le gérant la première semaine :

- centraliser clients, bâtiments, dossiers d’audit, visites et diagnostics ;
- automatiser devis et factures : génération PDF, envoi, relances, signature en ligne ;
- offrir un espace client sécurisé (suivi des dossiers, documents, messagerie) ;
- fournir des tableaux de bord (chiffre d’affaires, ventes, rentabilité) ;
- respecter le RGPD et les obligations comptables ;
- fonctionner sur ordinateur, tablette et téléphone ;
- préparer l’hébergement sur un serveur de production Linux.

## Rôle personnel

J’étais le seul développeur de l’application, en lien direct avec le gérant qui la testait régulièrement. Concrètement :

- **Analyse** : comprendre le métier du diagnostic immobilier, son vocabulaire et les tâches quotidiennes, puis en déduire les fonctionnalités et le modèle de données.
- **Développement** : construire l’application avec Flask, en m’appuyant sur un assistant IA (Claude Code) pour accélérer l’écriture du code. Mon travail consistait à formuler précisément les besoins, relire, tester et corriger ce qui était produit — et à apprendre Python, Flask et le web en parallèle pour être capable de le faire sérieusement.
- **Sécurisation** : audit de l’application et mise en place des protections (voir plus bas), la partie la plus proche de ma spécialité.
- **Exploitation** : tâches automatiques, sauvegardes, tests, puis préparation du déploiement.
- **Binôme** : conception avec une camarade de promotion, en stage dans la même entreprise, de la liaison entre son site vitrine et mon application.

## Technologies

| Couche | Choix | Rôle |
|---|---|---|
| Application | Python 3.9, Flask 3.1, SQLAlchemy | Logique métier et accès aux données |
| Base de données | SQLite (développement), PostgreSQL (production) | Stockage |
| Documents | fpdf2, Pillow, qrcode, openpyxl | PDF de devis/factures, QR codes, exports Excel |
| Interface | Bootstrap 5, Chart.js, FullCalendar, Leaflet | Pages responsives, graphiques, calendrier, cartes |
| Qualité | pytest, Git, GitHub Actions | 32 tests lancés à chaque modification |
| Serveur cible | Ubuntu 24.04 LTS, Nginx, Gunicorn, Let’s Encrypt | Hébergement HTTPS |

Des outils gratuits, répandus et adaptés à une petite structure : pas de coût de licence et des technologies courantes, faciles à reprendre par quelqu’un d’autre.

## Architecture

Un seul projet Flask : un point d’entrée, les pages (72 templates), les fichiers statiques et un dossier de tests. Les informations sensibles (clés, mots de passe) vivent dans un fichier de configuration séparé, jamais dans le code ni dans le dépôt.

La base compte **27 tables** : clients, bâtiments, dossiers, visites, diagnostics, devis, factures, prospects, comptabilité, utilisateurs, notifications. Certaines valeurs sont calculées automatiquement — avancement d’un dossier, rentabilité, date d’expiration d’un diagnostic.

Quatre **tâches planifiées** tournent en arrière-plan : relance des devis sans réponse, relance des factures impayées (échelonnée), alertes avant expiration des diagnostics (à J-60 puis J-30), rapport hebdomadaire au gérant et sauvegarde quotidienne.

Chaîne prévue en production : navigateur → Nginx (HTTPS, proxy inverse) → Gunicorn (application) → PostgreSQL. Pare-feu limité aux ports nécessaires.

## Fonctionnalités

| Domaine | Modules |
|---|---|
| Suivi | Tableau de bord avec huit indicateurs financiers, statistiques, exports PDF/Excel |
| Clients | Clients, prospects (pipeline CRM), espace client, messagerie |
| Terrain | Bâtiments géolocalisés sur carte, calendrier des visites, diagnostics et alertes d’expiration |
| Dossiers | Dossiers d’audit, vue Kanban, tâches, temps passé, rentabilité |
| Ventes | Devis, signature en ligne, factures, acomptes, comptabilité |
| Transverse | Notifications, recherche, documents, liaison avec le site vitrine, mode sombre |

Trois points méritent un zoom :

**Le circuit devis → signature → facture.** Le devis est généré en PDF avec un QR code, les mentions RGPD et les conditions de vente, puis envoyé par e-mail avec un lien unique. Le client signe en ligne sans créer de compte ; le devis passe alors à l’état « Signé » et la facture se crée en un clic. Acomptes gérés, factures impayées relancées automatiquement. C’est le plus gros gain de temps pour l’entreprise.

**Les alertes d’expiration.** Le modèle de données connaît la durée de validité de chaque type de diagnostic ; l’application calcule la date de fin et prévient le client en amont. Cela transforme une contrainte réglementaire en occasion de relance commerciale.

**La liaison avec le site vitrine.** Une API protégée par une clé dédiée permet au site vitrine (développé par ma camarade) de créer automatiquement un prospect à partir de son formulaire de contact, et au tableau de bord d’afficher les visites et demandes du site. Un outil intégré permet de vérifier les échanges entre les deux applications.

En chiffres : environ 8 400 lignes de Python, 150 routes HTTP, 72 templates, 27 tables, 32 tests, 11 types d’e-mails automatiques.

## Captures d’écran

Les captures sont regroupées en bas de page. Toutes proviennent de l’environnement de développement avec un **jeu de données de démonstration** ; les coordonnées de l’entreprise, les e-mails, téléphones, numéros d’identification et la clé d’API ont été masqués avant publication.

## Sécurisation

L’application manipule des données personnelles : c’est la partie la plus liée à ma spécialité. J’ai mené un audit de sécurité (avec l’aide de l’assistant IA), qui a permis de repérer et corriger plusieurs points avant toute mise en ligne. Protections en place :

- **Authentification** : mots de passe hachés, double authentification par code e-mail temporaire pour le compte administrateur, expiration automatique des sessions ;
- **Autorisations** : trois niveaux (client, employé, administrateur) ; l’espace client ne montre que les données de la personne connectée ;
- **Attaques courantes** : limitation des tentatives de connexion, protections CSRF et XSS ;
- **Transport** : en-têtes de sécurité (dont HSTS) et cookies protégés ;
- **Fichiers** : extensions et taille contrôlées, accès protégé aux documents ;
- **Traçabilité** : journalisation des actions sensibles avec horodatage et adresse IP, clé d’API révocable, secrets hors du code.

## Difficultés

**Partir de presque zéro.** Flask, SQLAlchemy et une bonne partie de la pile n’étaient pas encore au programme de première année. Il fallait apprendre en même temps que produire.

**Le déploiement, plus exigeant que prévu.** Mettre en ligne sur un serveur Linux suppose de maîtriser SSH, les services systemd, le proxy inverse, le HTTPS et le pare-feu. Cinq semaines n’ont pas suffi pour le faire proprement en plus du développement.

**Vérifier du code produit avec une IA.** Aller vite est tentant ; le risque est de ne plus comprendre ce qu’on livre.

## Solutions

- Apprendre les bases (Python, Flask, modèle de données, sessions) en parallèle du projet, pour être capable de relire et corriger ; utiliser l’IA comme accélérateur, jamais comme boîte noire.
- Mettre en place **32 tests automatisés** (calculs de devis et factures, validité des diagnostics, actions principales, points de sécurité), exécutés à chaque modification via GitHub Actions. C’est ce qui m’a permis de vérifier le code généré et de ne pas casser ce qui marchait.
- Pour le déploiement, préférer **bien préparer plutôt que se précipiter**, en accord avec le tuteur : choix du serveur (VPS Ubuntu 24.04 LTS), migration SQLite → PostgreSQL préparée, procédure de mise en ligne rédigée étape par étape.
- Faire tester l’application au gérant chaque semaine et ajuster l’ergonomie et les priorités selon ses retours réels.

## Compétences mobilisées

- **B1 — Support et mise à disposition de services** : recueil du besoin, spécification des fonctionnalités, mise à disposition et démonstrations régulières, accompagnement de l’utilisateur, rédaction d’une procédure de déploiement.
- **B2 — Administration des systèmes et des réseaux** : sauvegardes quotidiennes avec rétention, tâches planifiées, gestion des secrets, journalisation, préparation du passage à PostgreSQL, étude de l’administration à distance d’un serveur Linux (SSH, droits, journaux, pare-feu).
- **B3 — Cybersécurité des services informatiques** : audit et correction, authentification renforcée, contrôle d’accès par rôle, protection contre les attaques web courantes, sécurisation des échanges entre applications, RGPD (consentement, cloisonnement des données).
- **Transversal** : autonomie d’apprentissage, communication avec un non-informaticien, travail en binôme sur une interface entre deux applications.

## Résultat

À la fin du stage, l’entreprise dispose d’une application fonctionnelle couvrant toute l’activité, du prospect à la comptabilité, sécurisée, testée et reliée au site vitrine. Elle tourne encore en environnement de développement : la mise en ligne, préparée et documentée, est la prochaine étape du projet.

## Bilan

Ce stage m’a fait passer des exercices scolaires à un vrai projet, avec un utilisateur, des contraintes et des responsabilités. Techniquement, j’ai compris comment se construit une application web complète : modèle de données, logique métier, sécurité, automatisations, tests, et ce qu’implique de la faire tourner sur un serveur.

J’ai aussi appris à utiliser l’IA comme une aide au développement tout en gardant le rôle qui compte : comprendre, vérifier, tester. Sans les bases acquises pendant le stage, je n’aurais pas pu valider ce qui était produit.

Enfin, la partie qui m’a le plus manqué — le déploiement Linux — est exactement celle que je veux approfondir en deuxième année. Ce stage confirme mon intérêt pour les serveurs, les réseaux et la cybersécurité.
