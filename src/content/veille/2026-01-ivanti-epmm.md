---
mois: '2026-01'
titre: 'Ivanti EPMM : deux zero-days critiques'
faitMarquant: 'Deux exécutions de code sans authentification'
cve: ['CVE-2026-1281', 'CVE-2026-1340']
cvss: 9.8
cas:
  - produit: 'Ivanti EPMM'
    editeur: 'Ivanti'
    exploitation: 'avant-correctif'
    divulgation: '29 janvier 2026'
    kev:
      ajout: '29 janvier 2026'
      echeance: '1er février 2026'
competencesE5: ['gerer-patrimoine', 'repondre-incidents']
sources:
  - couche: 'datation'
    editeur: 'CERT-FR'
    titre: 'CERTFR-2026-ALE-001 — Multiples vulnérabilités dans Ivanti Endpoint Manager Mobile'
    date: '30 janvier 2026'
    url: 'https://www.cert.ssi.gouv.fr/alerte/CERTFR-2026-ALE-001/'
  - couche: 'analyse-technique'
    editeur: 'Rapid7'
    titre: 'Critical Ivanti Endpoint Manager Mobile (EPMM) zero-day exploited in the wild'
    date: '30 janvier 2026'
    url: 'https://www.rapid7.com/blog/post/etr-critical-ivanti-endpoint-manager-mobile-epmm-zero-day-exploited-in-the-wild-eitw-cve-2026-1281-1340/'
  - couche: 'analyse-technique'
    editeur: 'Unit 42'
    titre: 'Critical Vulnerabilities in Ivanti EPMM Exploited'
    date: '17 février 2026'
    url: 'https://unit42.paloaltonetworks.com/ivanti-cve-2026-1281-cve-2026-1340/'
---

- CVE-2026-1281 et CVE-2026-1340, toutes deux notées 9.8 CVSS : injection de code → exécution de code à distance sans authentification
- Divulguées le 29 janvier 2026, alors que l’exploitation a déjà commencé : c’est un zero-day
- Fonctions touchées : « In-House Application Distribution » et « Android File Transfer Configuration »
- CVE-2026-1281 ajoutée au catalogue KEV le jour même, avec une échéance au 1<sup>er</sup> février : 3 jours, contre trois semaines habituellement
- À la divulgation, Ivanti ne propose qu’un correctif provisoire ; la version corrigée définitive est annoncée pour plus tard dans le trimestre
- Le 17 février, Unit 42 documente à son tour l’exploitation de ces deux failles : les attaques se poursuivent plus de deux semaines après la divulgation

**Mon analyse.** Trois enseignements. D’abord, zero-day veut dire que la chronologie normale est inversée : l’attaque précède le correctif, et « appliquer les mises à jour » ne suffit plus comme politique. Ensuite, le délai de 3 jours imposé par la CISA donne la mesure de l’urgence : on n’est plus dans la maintenance planifiée. Enfin, EPMM n’est pas un pare-feu mais un serveur de gestion des terminaux mobiles publié sur Internet : la bordure se définit par l’exposition, pas par la catégorie de produit.

**Lien avec le BTS SIO SISR :** gestion du patrimoine informatique, maintenance préventive, et la question très concrète « combien de temps me faut-il pour corriger un équipement exposé ? ».
