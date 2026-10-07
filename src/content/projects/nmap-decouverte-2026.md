---
title: "Découverte d’un réseau et analyse de ports avec nmap"
kind: tp
category: cybersecurite
categories: [reseaux, systemes]
date: 2026-04-08
summary: "Reconnaissance d’un réseau en environnement de laboratoire fermé : recherche des hôtes actifs, des ports ouverts et des versions de services, jusqu’à retrouver un service SSH déplacé sur un port non standard."
context: "TP en formation — bloc 3, cybersécurité des services informatiques"
role: "Travail individuel, en environnement de laboratoire isolé (Labtainer)"
technologies:
  - nmap
  - Linux
  - SSH
  - Labtainer
  - Virtualisation
skills:
  - Reconnaissance réseau
  - Analyse de ports
  - Audit de sécurité
  - Ligne de commande Linux
bts: [B3]
status: termine
draft: true
cover: ./nmap-decouverte-2026/capture-01-scan-reseau-labtainer.png
coverAlt: "Résultat d’un scan nmap du réseau du laboratoire : deux hôtes actifs, dont un exposant un service SSH sur le port 2869"
images:
  - src: ./nmap-decouverte-2026/capture-01-scan-reseau-labtainer.png
    alt: "Rapport nmap montrant deux hôtes actifs, l’un sans port ouvert, l’autre avec OpenSSH sur le port 2869"
    caption: "Le scan du réseau du laboratoire : le serveur recherché et son service SSH sur un port non standard"
publicSafe: false
---

## Contexte

TP de bloc 3 (cybersécurité), réalisé en avril 2026 dans un **environnement de laboratoire fermé** de type Labtainer — une machine virtuelle et des conteneurs isolés, fournis pour l’exercice. Aucun scan n’a été effectué sur un réseau réel : le seul hôte extérieur utilisé est `scanme.nmap.org`, le serveur que le projet nmap met explicitement à disposition pour s’entraîner légalement.

C’est un point que le TP insiste à rappeler, et qui me paraît important à répéter ici : **analyser les ports d’un réseau sans autorisation est une attaque**, pas un exercice.

## Problématique

La reconnaissance est la première étape d’une attaque : savoir quelles machines répondent, quels services tournent et dans quelles versions. C’est aussi, exactement avec le même outil, la première étape d’un audit défensif — vérifier ce que son propre réseau expose réellement, par rapport à ce qu’on croit qu’il expose.

## Objectifs

1. Apprendre à lire la documentation de l’outil (`man nmap`) plutôt qu’à copier des commandes.
2. Analyser l’hôte local, puis le réseau du laboratoire.
3. Retrouver un serveur dont on a oublié l’adresse et le port SSH, et s’y connecter.
4. Réfléchir au double usage de l’outil.

## Réalisation

### Lire la documentation avant de lancer

Le TP commençait par la page de manuel : à quoi sert `-A` (détection du système, des versions, scripts et traceroute) et `-T4` (profil de temporisation agressif, donc scan plus rapide). C’est la base d’un usage propre de l’outil — on choisit ses options, on ne les subit pas.

### Analyser l’hôte local, puis le réseau

Scan de la machine locale, relevé de son adresse et de son masque (`ip address`), puis scan du réseau correspondant avec le préfixe adéquat. Sur l’exemple du laboratoire, un service **FTP autorisant la connexion anonyme** apparaît immédiatement, ainsi qu’un service **Telnet** — deux protocoles en clair, exactement le type de chose qu’un audit doit faire remonter.

### La mission : retrouver un serveur

L’exercice pratique : un serveur du laboratoire héberge un fichier dont on a besoin ; on ne connaît ni son adresse, ni le port sur lequel SSH a été déplacé — seulement qu’il se situe entre 2000 et 3000.

Le scan du réseau a donné deux hôtes actifs, dont un exposant **OpenSSH sur le port 2869**. La connexion s’est alors faite en précisant ce port (`ssh -p 2869`), puis la lecture du fichier a validé la mission.

C’est un exercice simple, mais il fait passer une idée juste : **changer un service de port ne le cache pas**. Un scan de 1 000 ports le retrouve en quelques secondes.

### Analyser un serveur public

Scan de `scanme.nmap.org` et lecture du résultat : ports ouverts (SSH, HTTP, nping-echo), ports **filtrés** (SMTP, les ports Microsoft-DS et NetBIOS, entre autres), versions des services et système d’exploitation détecté. La distinction ouvert / fermé / **filtré** est ce qui permet de déduire la présence d’un pare-feu sans le voir.

## Ce que j’en retiens

Le même outil, la même commande, sert à préparer une attaque ou à vérifier sa propre exposition : ce qui change, c’est l’autorisation. Côté défense, un scan de son réseau répond à une question simple et souvent mal connue — qu’est-ce qui écoute, dans quelle version, et pourquoi ?

## Compétences mobilisées

**Gérer le patrimoine informatique.** Un inventaire de parc qui ignore les services réellement exposés est incomplet. Le scan donne l’état réel : machines actives, ports ouverts, versions — dont les versions obsolètes à mettre à jour.

**Répondre aux incidents et aux demandes d’assistance.** Identifier qu’un service écoute sur un port inattendu, ou qu’un pare-feu filtre une requête, fait partie du diagnostic courant.
