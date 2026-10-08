---
title: "Segmentation d’un réseau en VLAN et liaisons trunk 802.1Q"
kind: tp
category: reseaux
categories: [cybersecurite]
date: 2026-04-28
summary: "Séparation logique des flux de trois services sur des commutateurs partagés : affectation des ports aux VLAN, liaisons trunk entre commutateurs, et vérification de l’étanchéité entre services."
context: "TP en formation — bloc 2, administration des systèmes et des réseaux"
role: "Travail individuel, en simulation Packet Tracer"
technologies:
  - Packet Tracer
  - Cisco
  - VLAN
  - 802.1Q
skills:
  - Segmentation réseau
  - Configuration d’un commutateur (IOS)
  - Cloisonnement des flux
bts: [B2]
competencesE5: ['mettre-a-disposition', 'gerer-patrimoine']
status: termine
draft: false
publicSafe: true
---

## Contexte

TP du bloc 2, au printemps 2026. **Activité guidée en simulation Packet Tracer**, avec une maquette partiellement construite et une vérification automatique intégrée. Le scénario est fictif : une société d’édition logicielle répartie sur trois étages, avec trois services — administratif, développement et commercial — dont les bureaux sont mélangés dans les étages.

## Problématique

Les trois services doivent être séparés, mais ils partagent les mêmes locaux techniques et les mêmes commutateurs. Une séparation physique supposerait un commutateur par service et par étage : coûteux, et à refaire à chaque déménagement de bureau.

La contrainte du cahier des charges est d’ailleurs explicite : on veut pouvoir **rattacher un poste au bon service selon la prise sur laquelle il est brassé**, sans retoucher au câblage entre les étages.

## Objectifs

1. Créer les VLAN correspondant aux trois services, avec une numérotation cohérente avec le plan d’adressage.
2. Affecter les ports d’accès de chaque commutateur au bon VLAN, selon un découpage identique sur tous les commutateurs.
3. Configurer les liaisons entre commutateurs en **trunk 802.1Q** pour faire passer tous les VLAN.
4. Vérifier que deux postes d’un même service communiquent **même s’ils sont branchés sur des commutateurs différents**.
5. Vérifier l’**étanchéité** : deux postes de services différents ne doivent pas se voir.

## Réalisation

La maquette compte **quatre commutateurs Cisco 2960** : un par étage, et un commutateur central dans le local technique, qui porte les trois serveurs et auquel chaque étage est relié.

Les quatre ont été configurés à l’identique, ce qui est la clé du besoin exprimé : les six premiers ports pour le premier service, les six suivants pour le deuxième, les six d’après pour le troisième, deux ports laissés dans le VLAN par défaut pour les ajustements, et les quatre derniers ports en **trunk** pour l’interconnexion entre commutateurs. Le schéma ci-dessus reprend le réseau tel que je l’ai rendu ; un clic sur un commutateur affiche les commandes tapées, ligne par ligne.

Résultat : un poste déplacé d’un étage à l’autre reste dans son service tant qu’il est brassé sur la bonne plage de ports, sans aucune reconfiguration.

| VLAN | Service | Réseau | Ports d’accès | Postes | Serveur |
| --- | --- | --- | --- | --- | --- |
| 110 | Administratif | 192.168.110.0/24 | Fa0/1 – 6 | ADM11, ADM12, ADM21, ADM31 | 192.168.110.200 |
| 120 | Développement | 192.168.120.0/24 | Fa0/7 – 12 | DEV11, DEV21, DEV22, DEV31 | 192.168.120.200 |
| 130 | Commercial | 192.168.130.0/24 | Fa0/13 – 18 | COM11, COM21, COM31, COM32 | 192.168.130.200 |
| — | Interconnexion | — | Fa0/21 – 24 (trunk) | — | — |

La vérification s’est faite dans les deux sens — connectivité **à l’intérieur** d’un VLAN à travers les liens trunk, et **absence** de connectivité entre VLAN, constatée en mode simulation, qui permet de suivre la trame et de voir où elle est arrêtée.

Ce TP porte volontairement sur une segmentation **sans routage** entre les VLAN : les services n’ont aucun besoin de se parler. Le routage inter-VLAN est l’étape suivante du programme.

## Difficultés

Le journal de Packet Tracer garde la trace d’une erreur de ma part : sur le deuxième commutateur, j’ai enchaîné `conf`, `vlan` et `name` **sans être passé en mode privilégié**. L’invite affichait encore `Switch>` ; aucune commande n’a été prise en compte. Je l’ai repéré à l’invite, puis repris la séquence complète avec `enable` et `configure terminal`. Depuis, je lis l’invite avant chaque bloc de commandes : c’est elle qui dit dans quel mode, et sur quel équipement, on se trouve.

Ce qui m’amène à la deuxième remarque, relevée en relisant ma maquette : je n’ai **pas renommé les commutateurs**. Les quatre s’appellent encore `Switch`, si bien que l’invite ne permet pas de savoir sur lequel on travaille. Sur une maquette, c’est sans conséquence ; sur un vrai réseau, `hostname` est la première commande à passer.

## Ce que j’en retiens

Un VLAN est une séparation logique qui suit la configuration, pas le câble. C’est ce qui en fait à la fois un outil de souplesse (brasser un poste dans le bon service) et un outil de sécurité : un service compromis ne voit pas les autres, alors qu’ils partagent le même matériel.

Le revers, c’est que tout repose sur la configuration des commutateurs — d’où l’importance du durcissement de ces équipements, qui est le sujet du TP suivant.

## Compétences mobilisées

**Mettre à disposition un service informatique.** Configurer un élément d’interconnexion pour séparer les flux, puis valider la solution par des tests dans les deux sens (ce qui doit passer, ce qui ne doit pas passer), c’est la démarche de maquettage attendue avant un déploiement.

**Gérer le patrimoine informatique.** Un découpage de ports identique sur tous les commutateurs, c’est une convention de configuration : elle rend le parc prévisible et documentable, au lieu de dépendre de la mémoire de celui qui a câblé.

<!-- Captures et compléments à produire : voir CAPTURES-A-FAIRE.md à la racine. -->
