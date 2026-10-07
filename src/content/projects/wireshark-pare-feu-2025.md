---
title: "Analyse du trafic ICMP avec Wireshark et filtrage par pare-feu"
kind: tp
category: cybersecurite
categories: [reseaux]
date: 2025-10-14
summary: "Capture et décodage d’échanges ICMP sur un réseau local, couche par couche, puis création et test de règles de pare-feu autorisant ou bloquant ces mêmes échanges."
context: "TP en formation — bloc 3, cybersécurité des services informatiques"
role: "Travail individuel, test de connectivité réalisé avec le poste d’un camarade"
technologies:
  - Wireshark
  - ICMP
  - ARP
  - Pare-feu Windows
  - Windows
skills:
  - Analyse de trames
  - Diagnostic réseau
  - Filtrage et pare-feu
  - Modèle OSI
bts: [B3]
status: termine
draft: true
publicSafe: false
---

## Contexte

Premier TP du bloc 3 (cybersécurité), en octobre 2025, sur poste Windows en salle. L’objectif de la séance n’était pas de « faire un ping », mais de **regarder ce qu’un ping produit réellement sur le réseau**, puis de constater qu’un pare-feu mal réglé peut faire échouer un test de connectivité parfaitement légitime.

## Problématique

Quand une machine ne répond pas à un test de connectivité, il y a deux explications très différentes : elle est injoignable, ou bien elle est joignable mais **filtre** les requêtes. Sans analyse du trafic, les deux se ressemblent.

## Objectifs

1. Capturer et filtrer le trafic ICMP d’un échange entre deux postes du réseau local.
2. Décoder un échange couche par couche et le relier aux modèles OSI et TCP/IP.
3. Comprendre comment l’adresse MAC de destination est obtenue, et pourquoi elle change selon que la destination est locale ou distante.
4. Créer une règle de pare-feu autorisant ICMP, puis une règle l’interdisant, et vérifier l’effet des deux.

## Réalisation

### Capture et filtrage

Relevé de la configuration du poste (`ipconfig /all`), sélection de l’interface Ethernet dans Wireshark, capture pendant un test de connectivité vers le poste d’un camarade, puis application du filtre d’affichage `icmp` pour ne garder que les échanges concernés.

Deux messages ressortent : la **requête d’écho** envoyée, et la **réponse d’écho** renvoyée par la machine cible — c’est-à-dire la preuve que le message est parti *et* qu’il est revenu.

### Décoder un échange

Chaque trame capturée se décompose en quatre parties — **Frame, Ethernet II, IP, ICMP** — que le TP demandait de relier aux couches des modèles de référence. ICMP se situe au niveau réseau : il est transporté par IP, mais ce n’est pas un protocole de transport, sa fonction est de signaler et de diagnostiquer (destination injoignable, délai dépassé).

### La question intéressante : l’adresse MAC de destination

En comparant un test vers un poste **local** et des tests vers des sites **distants**, l’adresse MAC de destination change de nature : pour un poste local, c’est bien la carte réseau du poste visé, obtenue par une résolution **ARP** ; pour tous les hôtes distants, c’est **toujours la même adresse** — celle de la passerelle.

L’explication, c’est qu’ARP ne résout que des adresses du réseau local. Une machine distante n’est pas joignable directement : la trame est adressée à la passerelle, qui se charge de la suite. C’est exactement ce qui distingue l’adressage de niveau 2 de l’adressage de niveau 3.

### Filtrer avec le pare-feu

Création dans le pare-feu Windows Defender (paramètres avancés → règles de trafic entrant) d’une règle **autorisant** le protocole ICMPv4, puis d’une règle l’**interdisant**, avec test de connectivité après chacune pour vérifier que la règle produit bien l’effet attendu.

## Résultat

Un ping qui échoue ne veut pas dire « machine éteinte ». Sur ce TP, les postes étaient joignables du début à la fin : c’est le pare-feu qui décidait. Le réflexe que j’en retire pour un diagnostic : vérifier le filtrage avant de conclure à une panne, et si possible capturer le trafic pour voir si la requête part et si quelque chose revient.

## Compétences mobilisées

**Répondre aux incidents et aux demandes d’assistance.** Lire une capture réseau, c’est la base du diagnostic : constater ce qui circule réellement plutôt que déduire à partir d’un symptôme. Savoir distinguer « injoignable » de « filtré » évite de chercher la panne au mauvais endroit.

**Gérer le patrimoine informatique.** Une règle de pare-feu est un élément de configuration du poste, avec un effet direct sur ce qui fonctionne ou non : la créer, la tester puis la désactiver fait partie de la tenue correcte d’un parc.

<!-- TODO (captures) : toutes les images du compte rendu venaient de l'énoncé du prof (captures de 2021, réseau inconnu) : rien de publiable. Si Hamza veut illustrer cette fiche, il peut refaire en 5 min sur son PC : 1) Wireshark filtré sur icmp pendant un ping vers la box, 2) le détail d'une trame déplié (Frame / Ethernet II / IP / ICMP), 3) la règle ICMPv4 dans le pare-feu Windows. Masquer les IP publiques et le nom du réseau. -->
