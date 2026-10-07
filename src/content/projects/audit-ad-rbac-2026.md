---
title: "Audit Active Directory et remise en conformité des droits (RBAC)"
kind: tp
category: systemes
categories: [cybersecurite]
date: 2026-09-15
summary: "Audit d’un Active Directory et des droits NTFS sur une VM Windows Server 2022 : huit anomalies relevées avec preuve et niveau de risque, corrigées puis vérifiées."
context: "TP en formation — bloc 3, cybersécurité des services informatiques"
role: "Travail individuel, droits d’administration complets sur ma copie de la machine virtuelle"
technologies:
  - Windows Server 2022
  - Active Directory
  - PowerShell
  - NTFS
  - icacls
  - Virtualisation
skills:
  - Audit de sécurité
  - Gestion des habilitations (RBAC)
  - Principe du moindre privilège
  - Analyse de risque
  - Remédiation et vérification
bts: [B1, B3]
status: termine
featured: true
order: 2
draft: false
cover: ./audit-ad-rbac-2026/capture-01-audit-comptes-ad.png
coverAlt: "Sortie PowerShell de Get-ADUser listant les comptes du domaine avec leur nom distinctif et leur identifiant de sécurité"
images:
  - src: ./audit-ad-rbac-2026/capture-02-acl-sauvegardes-avant.png
    alt: "Sortie de la commande icacls sur le dossier SAUVEGARDES montrant le groupe « Utilisateurs authentifiés » en contrôle total"
    caption: "Avant correction : tous les comptes authentifiés du domaine avaient le contrôle total sur les sauvegardes"
  - src: ./audit-ad-rbac-2026/capture-06-acl-sauvegardes-apres.png
    alt: "Sortie de icacls après retrait du groupe « Utilisateurs authentifiés », ne laissant que le système, les administrateurs et le groupe de sauvegarde"
    caption: "Après correction : seul le groupe de sauvegarde conserve un droit de modification"
  - src: ./audit-ad-rbac-2026/capture-03-retrait-admins-domaine.png
    alt: "Trois commandes Remove-ADGroupMember retirant trois comptes du groupe « Admins du domaine »"
    caption: "Remédiation : retrait des trois comptes ajoutés sans justification au groupe « Admins du domaine »"
  - src: ./audit-ad-rbac-2026/capture-04-admins-domaine-apres.png
    alt: "Sortie de Get-ADGroupMember sur le groupe « Admins du domaine » ne renvoyant plus que le compte Administrateur"
    caption: "Vérification après correction : le groupe ne contient plus que le compte d’administration prévu"
  - src: ./audit-ad-rbac-2026/capture-05-compte-orphelin-desactive.png
    alt: "Sortie de Get-ADUser montrant la propriété Enabled à False pour le compte d’un salarié parti"
    caption: "Le compte du salarié parti, resté actif deux mois, est désactivé et non supprimé"
publicSafe: true
---

## Contexte

TP de deuxième année, bloc 3 (cybersécurité des services informatiques), réalisé en septembre 2026 sur une durée indicative de deux à trois heures. Chaque étudiant disposait de **sa propre copie d’une machine virtuelle Windows Server 2022**, avec les droits d’administration complets dessus. Travail individuel.

Le scénario, fictif, est celui d’une entreprise dont l’administrateur système vient de partir : le responsable de la sécurité soupçonne que les habilitations ont été attribuées au fil de l’eau, sans procédure. La machine contient un annuaire Active Directory et quatre dossiers métiers partagés (ressources humaines, comptabilité, clients, sauvegardes).

## Problématique

Quand les droits sont accordés à la demande, ils s’accumulent : un salarié change de service mais garde ses anciens accès, un compte de service reçoit des privilèges d’administration « parce que ça ne marchait pas autrement », un salarié part et son compte reste actif.

Le problème n’est donc pas de savoir si les accès **fonctionnent** — ils fonctionnent — mais de vérifier s’ils sont **légitimes**, et de pouvoir le prouver.

## Objectifs

1. Formaliser le modèle d’habilitation attendu (**RBAC**) avant toute observation de la machine.
2. Auditer l’annuaire : comptes, groupes, appartenances directes et imbriquées, groupe d’administration du domaine.
3. Auditer les droits NTFS des quatre dossiers métiers.
4. Relever au minimum **huit anomalies**, dont quatre sur l’annuaire et quatre sur les droits de fichiers, avec pour chacune la preuve technique, le risque et la correction envisagée.
5. Corriger réellement la machine, puis vérifier chaque correction.
6. Conserver des preuves avant / après.
7. Prioriser les corrections et proposer une politique d’habilitation.

## Réalisation

### 1. Définir avant d’observer

La première étape a été de remplir la **matrice RBAC** attendue — sept rôles (employé, RH, comptable, commercial, support informatique, administrateur système, service de sauvegarde) croisés avec les six ressources — à partir de la politique d’habilitation communiquée, et non de ce que contenait la machine.

C’est ce qui permet ensuite de qualifier un écart : sans référentiel, un droit observé paraît toujours normal.

### 2. Auditer l’annuaire en PowerShell

Audit du domaine avec le module `ActiveDirectory` : liste des comptes et de leur état activé/désactivé, appartenances de chaque compte comparées à sa fonction, membres de chaque groupe métier, recherche des appartenances **imbriquées** avec `-Recursive`, contrôle du groupe d’administration du domaine (identifié par son identifiant de sécurité se terminant par `-512`), et vérification de la dernière connexion et de la dernière modification de mot de passe du compte suspect.

### 3. Auditer les droits NTFS

Contrôle des quatre dossiers partagés avec `icacls` et `Get-Acl`, en recherchant précisément quatre dérives classiques : les permissions accordées **directement à un utilisateur** au lieu de passer par un groupe, les groupes **sans rapport** avec la ressource, les droits **trop élevés**, et les droits conservés par un **ancien compte**.

### 4. Les huit anomalies relevées

Côté annuaire :

- le compte d’un salarié **parti depuis deux mois toujours actif** ;
- ce même compte **toujours membre du groupe comptabilité** ;
- un comptable membre **à la fois** du groupe comptabilité et du groupe ressources humaines ;
- **trois comptes** membres du groupe « Admins du domaine » sans justification, dont un **compte de service** dédié à la sauvegarde.

Côté droits de fichiers :

- une permission de contrôle total accordée **directement** à une utilisatrice sur le dossier RH, au lieu de passer par son groupe ;
- des droits de modification sur le dossier comptabilité pour une commerciale **et** pour l’ancien comptable ;
- le groupe ressources humaines en modification sur le dossier clients, sans rapport avec son activité ;
- le groupe **« Utilisateurs authentifiés » en contrôle total sur le dossier des sauvegardes** — autrement dit, tous les comptes du domaine.

Chaque anomalie a été inscrite avec la commande qui la démontre, le risque associé et la correction prévue, **avant** toute modification.

### 5. Corriger, puis vérifier

Remédiation : désactivation du compte orphelin (sans le supprimer), retraits des appartenances de groupe illégitimes, retrait des trois comptes du groupe d’administration du domaine, suppression des entrées incorrectes dans les listes de contrôle d’accès — en retirant uniquement les entrées fautives, sans réinitialiser les droits des dossiers.

**Après chaque correction, la commande d’audit correspondante a été relancée** pour prouver que l’anomalie avait disparu sans casser les accès légitimes.

### 6. Prioriser

| Priorité | Action | Pourquoi |
| --- | --- | --- |
| Critique | Retirer les trois comptes du groupe d’administration du domaine | Contrôle total du domaine accordé sans justification : la compromission d’un seul de ces comptes suffirait à compromettre toute l’infrastructure |
| Haute | Désactiver le compte du salarié parti | Compte orphelin exploitable, que plus personne ne surveille |
| Haute | Retirer « Utilisateurs authentifiés » des sauvegardes | N’importe quel compte du domaine pouvait modifier ou supprimer les sauvegardes — risque majeur en cas de rançongiciel |
| Moyenne | Retirer les permissions accordées directement aux utilisateurs | Contourne le modèle par groupes et rend les droits impossibles à suivre |
| Amélioration | Mettre en place une revue périodique des groupes et des droits | Détecter les dérives avant qu’elles ne deviennent des incidents |

### 7. Proposer une politique

Le TP se terminait par la rédaction de cinq règles couvrant le cycle de vie d’une habilitation : intégration au seul groupe métier de la fonction à l’arrivée, remplacement immédiat du groupe en cas de changement de poste, désactivation et retrait de tous les groupes au départ, comptes privilégiés limités au strict nécessaire et documentés, et revue périodique des comptes, groupes et droits.

## Technologies

- **Windows Server 2022** en machine virtuelle, avec le rôle Active Directory.
- **PowerShell** et le module `ActiveDirectory` : `Get-ADUser`, `Get-ADGroupMember` (avec `-Recursive`), `Get-ADPrincipalGroupMembership`, `Remove-ADGroupMember`, `Disable-ADAccount`.
- **`icacls` et `Get-Acl`** pour lire et corriger les droits NTFS.
- **RBAC** comme modèle de référence, et le principe du moindre privilège comme grille de lecture.

## Résultat

Les huit anomalies ont été **corrigées dans la machine virtuelle, pas seulement décrites** : chacune est accompagnée de la commande d’audit relancée après correction. Deux paires de captures avant / après documentent la remise en conformité, une sur l’annuaire et une sur les droits de fichiers.

## Compétences mobilisées

**Gérer le patrimoine informatique.** Recenser les comptes, les groupes et les droits réellement en place, les comparer à ce qui est attendu et corriger les écarts, c’est de la gestion d’inventaire appliquée aux habilitations : on ne peut pas administrer ce qu’on n’a pas recensé.

**Répondre aux incidents et aux demandes d’évolution.** La situation de départ est celle d’un incident potentiel non détecté. La méthode appliquée — constater, prouver, qualifier le risque, corriger, vérifier — est celle du traitement d’un incident de sécurité, et la traçabilité écrite est ce qui permet de justifier chaque action auprès d’un responsable.

**Mettre à disposition un service informatique.** Retirer un droit excessif sans couper l’accès légitime d’un service, c’est la contrainte permanente de l’administration : la sécurité ne doit pas se payer par une interruption de service. La vérification systématique après correction sert exactement à ça.

Le TP relève du **bloc 3 (cybersécurité des services informatiques)** par son objet — audit, moindre privilège, remédiation — et du **bloc 1** par la dimension gestion du patrimoine et des habilitations.

## Ce que j’en retiens

Un droit qui fonctionne n’est pas un droit correct. Les quatre anomalies les plus graves n’empêchaient rien de fonctionner : elles ouvraient simplement beaucoup plus que nécessaire. C’est aussi ce qui les rend difficiles à repérer sans référentiel écrit et sans revue régulière — d’où la dernière ligne du tableau de priorisation.
