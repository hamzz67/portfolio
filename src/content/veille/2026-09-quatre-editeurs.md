---
mois: '2026-09'
titre: 'SonicWall, Check Point, F5, Citrix : quatre éditeurs en un mois'
faitMarquant: 'Quatre éditeurs touchés dans le mois'
cve:
  - 'CVE-2026-83548'
  - 'CVE-2026-83549'
  - 'CVE-2026-85102'
  - 'CVE-2026-94127'
  - 'CVE-2026-88771'
  - 'CVE-2026-88772'
cvss: 9.8
cas:
  - produit: 'SonicWall SMA 1000'
    editeur: 'SonicWall'
    exploitation: 'avant-correctif'
    divulgation: '1er septembre 2026'
  - produit: 'Check Point VPN'
    editeur: 'Check Point'
    exploitation: 'apres-correctif'
    correctif: '9 septembre 2026'
    exploitationConstatee: 'Dès le 12 septembre 2026'
    manque: 'Le temps : trois jours seulement'
    kev:
      ajout: '22 septembre 2026'
      echeance: '25 septembre 2026'
  - produit: 'F5 BIG-IP APM'
    editeur: 'F5'
    exploitation: 'avant-correctif'
    divulgation: '22 septembre 2026'
  - produit: 'Citrix NetScaler'
    editeur: 'Citrix'
    exploitation: 'avant-correctif'
    premiereExploitation: 'Début septembre 2026'
    divulgation: '27 septembre 2026'
    ecart: '3 semaines au moins'
    kev:
      ajout: '27 septembre 2026'
competencesE5: ['gerer-patrimoine', 'repondre-incidents', 'mettre-a-disposition']
sources:
  - couche: 'datation'
    editeur: 'CERT-FR'
    titre: 'CERTFR-2026-ALE-009 — Multiples vulnérabilités dans SonicWall Secure Mobile Access'
    date: '2 septembre 2026'
    url: 'https://www.cert.ssi.gouv.fr/alerte/CERTFR-2026-ALE-009/'
  - couche: 'explication'
    editeur: 'ITdaily'
    titre: 'Check Point VPN contient des vulnérabilités critiques'
    date: '14 septembre 2026'
    url: 'https://itdaily.fr/nouvelles/securite/check-point-vpn-presente-des-vulnerabilites-critiques/'
  - couche: 'explication'
    editeur: 'BleepingComputer'
    titre: 'Check Point warns of hackers exploiting Security Gateway VPN RCE flaw'
    date: '23 septembre 2026'
    url: 'https://www.bleepingcomputer.com/news/security/check-point-warns-of-hackers-exploiting-security-gateway-vpn-rce-flaw/'
  - couche: 'datation'
    editeur: 'Centre canadien pour la cybersécurité'
    titre: 'Alerte AL26-022 – Vulnérabilité touchant F5 BIG-IP Access Policy Manager (APM)'
    date: '22 septembre 2026'
    url: 'https://www.cyber.gc.ca/fr/alertes-avis/al26-022-vulnerabilite-touchant-f5-big-ip-access-policy-manager-apm-cve-2026-94127'
  - couche: 'explication'
    editeur: 'ITdaily'
    titre: 'F5 alerte sur une faille activement exploitée dans BIG-IP APM'
    date: 'septembre 2026'
    url: 'https://itdaily.fr/nouvelles/reseau/f5-big-ip-apm-bug-cve-2026-94127/'
  - couche: 'datation'
    editeur: 'CERT-FR'
    titre: 'CERTFR-2026-ALE-011 — Multiples vulnérabilités dans Citrix NetScaler ADC et Gateway'
    date: '28 septembre 2026'
    url: 'https://www.cert.ssi.gouv.fr/alerte/CERTFR-2026-ALE-011/'
  - couche: 'explication'
    editeur: 'LeMagIT'
    titre: 'Citrix Netscaler : il est plus que temps d’appliquer les patchs'
    date: 'septembre 2026'
    url: 'https://www.lemagit.fr/news/366651335/Citrix-Netscaler-il-est-plus-que-temps-dappliquer-les-patchs'
  - couche: 'analyse-technique'
    editeur: 'Rapid7'
    titre: 'Zero-Day Exploitation of Citrix NetScaler ADC and Gateway'
    date: '28 septembre 2026'
    url: 'https://www.rapid7.com/blog/post/etr-zero-day-exploitation-of-citrix-netscaler-adc-and-gateway-cve-2026-88771-and-cve-2026-88772/'
  - couche: 'analyse-technique'
    editeur: 'GreyNoise'
    titre: 'GreyNoise Timeline: Citrix CVE-2026-88771'
    date: '28 septembre 2026'
    url: 'https://www.greynoise.io/chronicle/gntl-20260928-citrix-cve-2026-88771'
  - couche: 'analyse-technique'
    editeur: 'Unit 42'
    titre: 'Threat Brief: NetScaler Zero Days CVE-2026-88771 and CVE-2026-88772 Exploited in the Wild'
    date: '30 septembre 2026'
    url: 'https://unit42.paloaltonetworks.com/netscaler-zero-days-exploited/'
---

### SonicWall SMA 1000 — 1<sup>er</sup> septembre

- CVE-2026-83548 (SSRF sans authentification) et CVE-2026-83549 (exécution de code avec les droits administrateur), toutes deux exploitées
- Même produit, mêmes modèles et même schéma qu’en juillet ; là encore, le correctif seul ne suffit pas

### Check Point VPN — 9 septembre

- CVE-2026-85102 (CVSS 9.8) : validation défaillante des certificats pendant la négociation VPN → exécution de code sans authentification sur la passerelle
- Correctif publié le 9 septembre ; attaques observées dès le 12 septembre, trois jours plus tard ; exploitation confirmée par l’éditeur le 22 septembre
- Ajout au catalogue KEV le 22 septembre, correction exigée pour le 25

### F5 BIG-IP APM — 22 septembre

- CVE-2026-94127 : dépassement de tampon permettant une exécution de code sans authentification, déjà exploité à la publication
- Concerne les systèmes qui combinent une politique d’accès APM et un profil OAuth

### Citrix NetScaler — 27 septembre

- Huit vulnérabilités, dont CVE-2026-88771 (exécution de code en configuration par défaut) et CVE-2026-88772 (exécution de code lorsque DTLS est activé), exploitées avant la disponibilité des correctifs
- Selon Rapid7, l’attaquant archive la configuration de l’équipement (mots de passe chiffrés, clés privées des certificats) dans un dossier que la passerelle sert publiquement : elle devient téléchargeable sans authentification
- Selon Unit 42, la faille sert aussi à déposer un webshell, et des requêtes d’attaque sont encore relevées quelques heures avant la publication du bulletin

| Date | Événement |
|---|---|
| 10 septembre | Citrix réserve les identifiants CVE (relevé par GreyNoise) |
| 20 septembre, 14 h 28 UTC | Première tentative d’exploitation observée par Rapid7 |
| 24 septembre | Tentatives d’exploitation observées par GreyNoise |
| 27 septembre | Bulletin Citrix et correctifs ; ajout au KEV ; alerte de la CISA |
| 28 septembre | Alerte du CERT-FR ; première preuve de concept publique |
| 4 octobre | Nouvelle vulnérabilité exploitée (voir octobre) |

**Mon analyse.** C’est le mois le plus chargé de la période, et il pose la question de la récurrence : les quatre produits touchés l’avaient tous déjà été plus tôt dans l’année.

Sur **SonicWall** : le même produit fait l’objet de deux alertes en sept semaines, la seconde arrivant neuf jours après la clôture de la première. Deux lectures sont possibles : soit le premier correctif était incomplet, soit le produit est devenu une cible que chercheurs et attaquants scrutent intensément. Dans les deux cas, un produit qui revient en alerte justifie une surveillance renforcée, voire une réflexion sur son remplacement.

Sur **Check Point** : ici le correctif existait, et les attaques ont commencé trois jours après sa publication. C’est la mesure du temps dont dispose réellement un administrateur pour mettre à jour une passerelle exposée.

Sur **Citrix** : la faille principale touche la configuration par défaut, donc tout déploiement non corrigé. Surtout, la configuration et les clés privées ont pu être copiées. Corriger ne suffit donc pas : il faut aussi renouveler les certificats et les mots de passe stockés sur l’équipement.

**Lien avec le BTS SIO SISR :** renouvellement et révocation de certificats, protection des configurations, supervision.
