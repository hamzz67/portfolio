---
title: "Routage statique, routage dynamique RIP et découpage en sous-réseaux"
kind: tp
category: reseaux
date: 2026-01-21
endDate: 2026-03-09
summary: "Trois maquettes Packet Tracer : interconnexion de sous-réseaux par routage statique, passage au routage dynamique avec RIP, puis application d’un plan d’adressage à masques variables."
context: "TP en formation — bloc 2, administration des systèmes et des réseaux"
role: "Travail individuel, en simulation Packet Tracer"
technologies:
  - Packet Tracer
  - Cisco
  - Routage statique
  - RIP
  - VLSM
skills:
  - Adressage IPv4 et sous-réseaux
  - Configuration d’un routeur (IOS)
  - Analyse d’une table de routage
bts: [B2]
competencesE5: ['mettre-a-disposition', 'repondre-incidents']
status: termine
draft: false
publicSafe: true
---

## Contexte

Trois travaux pratiques du bloc 2, étalés de janvier à mars 2026, qui se suivent logiquement : on interconnecte d’abord des réseaux « à la main », puis on laisse les routeurs le faire eux-mêmes, et enfin on revient à la question de départ — le découpage des adresses.

Il s’agit d’**activités guidées réalisées en simulation sur Packet Tracer**, avec des maquettes fournies et une vérification automatique intégrée (« check results »). Les scénarios sont fictifs et l’adressage est privé.

## Problématique

Deux machines dans deux sous-réseaux différents ne se voient pas, même reliées physiquement. Il faut un routeur — et surtout, il faut que ce routeur **sache** où envoyer les paquets. Le TP répond de deux manières à cette question : en lui indiquant les routes une par une, puis en le laissant les apprendre.

## Objectifs

1. Interconnecter deux sous-réseaux par du **routage statique**, et vérifier la connectivité étape par étape.
2. Lire et interpréter une **table de routage**.
3. Activer **RIP** sur plusieurs routeurs et observer les échanges entre eux, y compris après une modification de la topologie.
4. Appliquer un plan d’adressage à **masques variables (VLSM)** sur cinq sous-réseaux de tailles différentes.

## Réalisation

### Routage statique

Construction de la maquette, configuration des interfaces, puis déclaration des routes vers les réseaux distants. La vérification s’est faite par paliers — d’abord entre machines d’un même sous-réseau, puis entre les interfaces du premier routeur, puis entre les deux routeurs, puis enfin de bout en bout — ce qui est la bonne méthode : quand ça échoue, on sait **où** ça s’arrête.

Affichage et analyse de la table de routage de chaque routeur : quelles routes sont connues directement, lesquelles ont été ajoutées à la main.

### Routage dynamique avec RIP

Activation de RIP sur les routeurs en déclarant, pour chacun, **uniquement les réseaux auxquels il est directement connecté** — c’est le principe du protocole : chaque routeur diffuse à ses voisins ce qu’il connaît, et apprend d’eux le reste. La configuration était détaillée pour un routeur et à retrouver seul pour les autres.

Puis l’étude du fonctionnement : observation des échanges RIP entre routeurs, et comportement du protocole **après une modification de la cartographie du réseau** — c’est-à-dire comment les tables se réajustent toutes seules.

### Sous-réseaux et VLSM

Dernière maquette : un réseau privé unique à découper en cinq sous-réseaux de tailles différentes — deux entités d’une cinquantaine et d’une trentaine d’équipements, deux entités plus petites, et la liaison entre bâtiments réduite à deux adresses utiles. Attribution des adresses selon la convention imposée (le routeur prend la dernière adresse de son sous-réseau) et configuration en ligne de commande uniquement.

C’est l’exercice qui oblige à comprendre pourquoi on ne donne pas le même masque à tout le monde : une liaison entre deux routeurs n’a pas besoin de 254 adresses.

## Ce que j’en retiens

Le routage statique fonctionne et reste lisible sur deux routeurs ; il devient vite ingérable ensuite, et surtout il ne se répare pas tout seul. RIP règle ce problème mais ajoute sa propre complexité : il faut comprendre ce que chaque routeur annonce, sinon on ne sait plus pourquoi une route existe.

## Compétences mobilisées

**Mettre à disposition un service informatique.** Une maquette validée par des tests de connectivité successifs, c’est la démarche attendue avant tout déploiement : on ne déclare pas un service fonctionnel, on le prouve.

**Répondre aux incidents et aux demandes d’assistance.** Savoir lire une table de routage est l’outil de diagnostic de base quand deux réseaux ne communiquent pas.

<!-- Captures et compléments à produire : voir CAPTURES-A-FAIRE.md à la racine. -->
