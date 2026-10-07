---
mois: '2026-04'
titre: 'Fortinet FortiClient EMS : le serveur qui gère les clients VPN'
faitMarquant: 'Exécution de code sans authentification'
cve: ['CVE-2026-35616']
cvss: 9.1
cas:
  - produit: 'Fortinet FortiClient EMS'
    editeur: 'Fortinet'
    exploitation: 'avant-correctif'
    premiereExploitation: '31 mars 2026'
    divulgation: '4 avril 2026'
    ecart: '4 jours'
    kev:
      ajout: '6 avril 2026'
      echeance: '9 avril 2026'
competencesE5: ['gerer-patrimoine', 'repondre-incidents']
sources:
  - couche: 'datation'
    editeur: 'CERT-FR'
    titre: 'CERTFR-2026-AVI-0400 — Vulnérabilité dans Fortinet FortiClientEMS'
    date: '7 avril 2026'
    url: 'https://www.cert.ssi.gouv.fr/avis/CERTFR-2026-AVI-0400/'
  - couche: 'explication'
    editeur: 'The Hacker News'
    titre: 'Fortinet Patches Actively Exploited CVE-2026-35616 in FortiClient EMS'
    date: 'avril 2026'
    url: 'https://thehackernews.com/2026/04/fortinet-patches-actively-exploited-cve.html'
---

- CVE-2026-35616 (CVSS 9.1) : contrôle d’accès défaillant dans l’API de FortiClient EMS → exécution de code ou de commandes sans authentification
- Correctif d’urgence publié un samedi, le 4 avril 2026 ; des tentatives d’exploitation sont relevées dès le 31 mars
- Ajout au catalogue KEV le 6 avril, correction exigée pour le 9 avril
- Le 8 avril, la seconde faille Ivanti de janvier (CVE-2026-1340) rejoint à son tour le catalogue KEV

**Mon analyse.** FortiClient EMS est le serveur qui administre les postes équipés du client d’accès distant. La cible se déplace d’un cran : au lieu d’attaquer la passerelle, on attaque l’outil qui gère tous ceux qui s’y connectent. La date compte aussi : un correctif publié un samedi suppose qu’une organisation sache traiter une urgence hors des heures ouvrées.

**Lien avec le BTS SIO SISR :** gestion de parc, serveurs d’administration, procédure de correctif d’urgence.
