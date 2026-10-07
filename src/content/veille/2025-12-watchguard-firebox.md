---
mois: '2025-12'
titre: 'WatchGuard Firebox : le VPN comme porte d’entrée'
faitMarquant: 'Exécution de code via le VPN IKEv2'
cve: ['CVE-2025-14733']
cvss: 9.3
cas:
  - produit: 'WatchGuard Firebox'
    editeur: 'WatchGuard'
    exploitation: 'avant-correctif'
    divulgation: '18 décembre 2025'
    kev:
      ajout: '19 décembre 2025'
      echeance: '26 décembre 2025'
competencesE5: ['gerer-patrimoine', 'repondre-incidents']
sources:
  - couche: 'datation'
    editeur: 'CERT Santé'
    titre: 'WatchGuard Firebox – CVE-2025-14733'
    date: '19 décembre 2025'
    url: 'https://cyberveille.esante.gouv.fr/alertes/watchguard-firebox-cve-2025-14733-2025-12-19'
  - couche: 'explication'
    editeur: 'The Hacker News'
    titre: 'WatchGuard Warns of Active Exploitation of Critical Fireware OS VPN Vulnerability'
    date: '19 décembre 2025'
    url: 'https://thehackernews.com/2025/12/watchguard-warns-of-active-exploitation.html'
  - couche: 'explication'
    editeur: 'BleepingComputer'
    titre: 'Critical RCE flaw impacts over 115,000 WatchGuard firewalls'
    date: '22 décembre 2025'
    url: 'https://www.bleepingcomputer.com/news/security/over-115-000-watchguard-firewalls-vulnerable-to-ongoing-rce-attacks/'
---

- CVE-2025-14733 (CVSS 9.3) : écriture hors limites dans le processus `iked`, qui gère l’échange de clés IKEv2 des pare-feu Firebox → exécution de code à distance sans authentification
- Correctifs publiés le 18 décembre 2025, alors que la faille est déjà exploitée
- Configurations concernées : VPN mobile IKEv2 et VPN site à site IKEv2 vers une passerelle à adresse dynamique
- Ajout au catalogue KEV de la CISA le 19 décembre, correction exigée pour le 26 décembre
- Le 22 décembre, plus de 115 000 pare-feu Firebox exposés sur Internet ne sont toujours pas corrigés

**Mon analyse.** La période s’ouvre sur ce qui sera son fil rouge : c’est le service VPN lui-même, censé sécuriser l’accès, qui sert de point d’entrée. Un détail de l’avis mérite d’être retenu : un pare-feu dont on a supprimé la configuration IKEv2 concernée peut rester vulnérable s’il conserve un VPN site à site. On ne peut donc pas se rassurer en relisant sa configuration ; seul le correctif règle le problème.

**Lien avec le BTS SIO SISR :** VPN IPsec et IKEv2, mise à jour des pare-feu, inventaire des équipements exposés.
