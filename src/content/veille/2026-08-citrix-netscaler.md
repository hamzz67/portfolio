---
mois: '2026-08'
titre: 'Citrix NetScaler : un « déni de service » devenu prise de contrôle'
faitMarquant: '« Déni de service » devenu exécution de code'
cve: ['CVE-2026-8452']
cas:
  - produit: 'Citrix NetScaler'
    editeur: 'Citrix'
    exploitation: 'apres-correctif'
    correctif: '30 juin 2026'
    exploitationConstatee: 'Mi-août 2026'
    manque: 'La priorité : décrite comme déni de service'
    kev:
      ajout: '26 août 2026'
      echeance: '29 août 2026'
competencesE5: ['gerer-patrimoine', 'repondre-incidents']
sources:
  - couche: 'explication'
    editeur: 'Help Net Security'
    titre: 'Previously patched Citrix NetScaler flaw exploited in the wild (CVE-2026-8452)'
    date: '27 août 2026'
    url: 'https://www.helpnetsecurity.com/2026/08/27/netscaler-adc-gateway-cve-2026-8452/'
  - couche: 'datation-croisee'
    editeur: 'The Hacker News'
    titre: 'CISA Adds Six Exploited Flaws to KEV, Including NetScaler, Linux, and SQL Server Bugs'
    date: '27 août 2026'
    url: 'https://thehackernews.com/2026/08/cisa-adds-six-exploited-flaws-to-kev.html'
---

- CVE-2026-8452 : dépassement mémoire sur les NetScaler configurés en passerelle d’accès (VPN SSL, ICA Proxy) ou en serveur d’authentification
- Corrigée le 30 juin 2026, et présentée alors comme pouvant provoquer un déni de service
- Le 14 août, des chercheurs publient une analyse et une preuve de concept ; l’exploitation suit en quelques jours, avec dépôt de webshells sur les équipements
- Ajout au catalogue KEV le 26 août, correction exigée pour le 29 août
- Le 24 août, le CERT-FR clôt son alerte SonicWall de juillet

**Mon analyse.** Août aurait pu passer pour un mois calme. Il montre au contraire deux choses. La gravité annoncée par un éditeur peut être sous-estimée : ceux qui ont classé cette faille « simple déni de service » sont restés exposés sept semaines. Et la publication d’une preuve de concept transforme en quelques jours une faille corrigée en attaque réelle. Sur un équipement de bordure, un correctif de sécurité s’applique sans attendre, quelle que soit la gravité affichée.

**Lien avec le BTS SIO SISR :** politique de mise à jour, suivi des preuves de concept publiques.
