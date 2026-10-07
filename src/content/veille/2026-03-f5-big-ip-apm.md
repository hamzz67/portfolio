---
mois: '2026-03'
titre: 'F5 BIG-IP APM : une faille corrigée depuis cinq mois'
faitMarquant: 'Exécution de code, faille corrigée en octobre 2025'
cve: ['CVE-2025-53521']
cas:
  - produit: 'F5 BIG-IP APM'
    editeur: 'F5'
    exploitation: 'apres-correctif'
    correctif: '15 octobre 2025'
    exploitationConstatee: 'Confirmée le 29 mars 2026'
    manque: 'L’application du correctif'
competencesE5: ['gerer-patrimoine', 'repondre-incidents']
sources:
  - couche: 'datation'
    editeur: 'CERT-FR'
    titre: 'CERTFR-2026-ALE-004 — Vulnérabilité dans F5 BIG-IP Access Policy Manager'
    date: '31 mars 2026'
    url: 'https://www.cert.ssi.gouv.fr/alerte/CERTFR-2026-ALE-004/'
  - couche: 'reference'
    editeur: 'ANSSI / CERT-FR'
    titre: 'Panorama de la cybermenace 2025 (CERTFR-2026-CTI-002)'
    date: '11 mars 2026'
    url: 'https://www.cert.ssi.gouv.fr/cti/CERTFR-2026-CTI-002/'
---

- CVE-2025-53521 : exécution de code à distance sans authentification sur BIG-IP APM, le module d’accès distant de F5
- Correctif disponible depuis le 15 octobre 2025 ; F5 confirme l’exploitation active le 29 mars 2026
- Le CERT-FR recommande une recherche de compromission à partir d’indicateurs dans les fichiers et dans les journaux
- Le 11 mars, l’ANSSI publie son panorama annuel : les vulnérabilités des équipements de bordure y sont décrites comme pouvant être exploitées très vite

**Mon analyse.** C’est le premier cas « à l’envers » de la période : pas un zero-day, mais une faille dont le correctif existait depuis cinq mois et demi. Les organisations touchées n’ont pas été prises de vitesse, elles n’avaient pas appliqué la mise à jour. Le problème n’est donc pas seulement la rapidité des attaquants, c’est aussi la lenteur des mises à jour sur des équipements qu’on hésite à redémarrer.

**Lien avec le BTS SIO SISR :** gestion des correctifs, analyse des journaux, recherche d’indicateurs de compromission.
