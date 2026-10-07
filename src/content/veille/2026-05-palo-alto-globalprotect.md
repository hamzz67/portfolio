---
mois: '2026-05'
titre: 'Palo Alto GlobalProtect : une faille « moyenne » qui ouvre le VPN'
faitMarquant: 'Zero-day du portail captif, puis contournement d’authentification du VPN'
cve: ['CVE-2026-0257', 'CVE-2026-0300', 'CVE-2026-42897']
cvss: 7.8
cas:
  - produit: 'Palo Alto PAN-OS (portail captif)'
    editeur: 'Palo Alto'
    exploitation: 'avant-correctif'
  - produit: 'Palo Alto GlobalProtect'
    editeur: 'Palo Alto'
    exploitation: 'apres-correctif'
    correctif: '13 mai 2026'
    exploitationConstatee: 'Dès le 17 mai 2026'
    manque: 'La priorité : faille notée « moyenne »'
    kev:
      ajout: '29 mai 2026'
      echeance: '1er juin 2026'
competencesE5: ['gerer-patrimoine', 'repondre-incidents']
sources:
  - couche: 'analyse-technique'
    editeur: 'Unit 42'
    titre: 'Threat Brief: Exploitation of PAN-OS Captive Portal Zero-Day for Unauthenticated Remote Code Execution'
    date: '6 mai 2026'
    url: 'https://unit42.paloaltonetworks.com/captive-portal-zero-day/'
  - couche: 'analyse-technique'
    editeur: 'Rapid7'
    titre: 'Rapid7 Observed Exploitation of PAN-OS GlobalProtect Authentication Bypass Vulnerability (CVE-2026-0257)'
    date: '29 mai 2026'
    url: 'https://www.rapid7.com/blog/post/etr-rapid7-observed-exploitation-of-pan-os-globalprotect-authentication-bypass-vulnerability-cve-2026-0257/'
  - couche: 'explication'
    editeur: 'The Hacker News'
    titre: 'PAN-OS GlobalProtect Authentication Bypass (CVE-2026-0257) Under Active Exploitation'
    date: '30 mai 2026'
    url: 'https://thehackernews.com/2026/05/pan-os-globalprotect-authentication.html'
  - couche: 'datation'
    editeur: 'CERT-FR'
    titre: 'CERTFR-2026-ALE-005 — Vulnérabilité dans Microsoft Exchange Server'
    date: '15 mai 2026'
    url: 'https://www.cert.ssi.gouv.fr/alerte/CERTFR-2026-ALE-005/'
---

- Dès le 6 mai, Unit 42 documente l’exploitation d’un zero-day dans le portail captif de PAN-OS (CVE-2026-0300), qui permet une exécution de code sans authentification
- CVE-2026-0257 : contournement d’authentification du portail et de la passerelle VPN GlobalProtect. Un cookie d’authentification forgé permet d’ouvrir une session VPN sans identifiants, dans une configuration précise (cookies de réauthentification activés et certificat réutilisé)
- Avis de l’éditeur le 13 mai 2026, avec une note de 4.7 (gravité moyenne) ; première exploitation observée le 17 mai
- Le 29 mai : Rapid7 publie son analyse et une preuve de concept, la note est relevée à 7.8 et la faille entre au catalogue KEV (échéance au 1<sup>er</sup> juin)
- En parallèle, alerte du CERT-FR le 15 mai sur Microsoft Exchange Server (CVE-2026-42897) : les correctifs n’arrivent que le 9 juin

**Mon analyse.** La leçon du mois est que le score CVSS ne suffit pas à fixer les priorités. Notée 4.7, cette faille aurait été repoussée à la prochaine fenêtre de maintenance dans beaucoup d’organisations ; elle a été exploitée quatre jours après sa publication. Sur un équipement exposé, le bon critère est ce que la faille permet : ici, entrer dans le réseau par le VPN. Avec le zero-day du portail captif, c’est aussi la deuxième faille exploitée sur le même système en un mois. Quant à Exchange, il rappelle qu’un serveur de messagerie publié sur Internet est lui aussi un équipement de bordure, avec un accès à l’annuaire interne.

**Lien avec le BTS SIO SISR :** priorisation des correctifs, gestion des certificats, journaux d’authentification VPN.
