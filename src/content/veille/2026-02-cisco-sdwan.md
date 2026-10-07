---
mois: '2026-02'
titre: 'Cisco Catalyst SD-WAN : exploité depuis 2023'
faitMarquant: 'Contournement d’authentification, CVSS 10'
cve: ['CVE-2026-20127']
cvss: 10
cas:
  - produit: 'Cisco Catalyst SD-WAN'
    editeur: 'Cisco'
    exploitation: 'avant-correctif'
    premiereExploitation: '2023'
    divulgation: '25 février 2026'
    ecart: 'Près de 3 ans'
competencesE5: ['gerer-patrimoine', 'mettre-a-disposition']
sources:
  - couche: 'datation'
    editeur: 'CERT-FR'
    titre: 'CERTFR-2026-ALE-002 — Vulnérabilité dans Cisco Catalyst SD-WAN'
    date: '25 février 2026'
    url: 'https://www.cert.ssi.gouv.fr/alerte/CERTFR-2026-ALE-002/'
  - couche: 'explication'
    editeur: 'BleepingComputer'
    titre: 'Critical Cisco SD-WAN bug exploited in zero-day attacks since 2023'
    date: 'février 2026'
    url: 'https://www.bleepingcomputer.com/news/security/critical-cisco-sd-wan-bug-exploited-in-zero-day-attacks-since-2023/'
  - couche: 'explication'
    editeur: 'BleepingComputer'
    titre: 'CISA orders federal agencies to replace end-of-life edge devices'
    date: '6 février 2026'
    url: 'https://www.bleepingcomputer.com/news/security/cisa-orders-federal-agencies-to-replace-end-of-life-edge-devices/'
---

- CVE-2026-20127, CVSS 10.0 : contournement de l’authentification entre les composants du SD-WAN (contrôleur et gestionnaire) → accès administrateur sans authentification
- Exploitée depuis 2023 : l’attaquant ajoute de faux équipements « pairs » au réseau SD-WAN de la victime
- Le 25 février, la CISA publie une directive d’urgence et exige les correctifs pour le 27 février, soit 2 jours
- Le 5 février 2026, la CISA impose aux agences fédérales américaines de retirer les équipements de bordure en fin de support (directive BOD 26-02, détaillée en perspectives)

**Mon analyse.** Le SD-WAN pilote l’interconnexion des sites d’une entreprise : compromettre son contrôleur, c’est potentiellement agir sur tout le réseau étendu d’un coup. Le chiffre qui frappe est la durée : près de trois ans d’exploitation avant la divulgation. Et l’attaquant ne casse rien, il s’ajoute comme un équipement légitime : sans journaux conservés ailleurs que sur l’équipement, il est très difficile à repérer.

**Lien avec le BTS SIO SISR :** routage, interconnexion de sites, politique de filtrage, centralisation des journaux.
