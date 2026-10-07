---
mois: '2026-06'
titre: 'Check Point VPN et le rançongiciel Qilin'
faitMarquant: 'Contournement d’authentification, rançongiciel Qilin'
cve: ['CVE-2026-50751']
cvss: 9.3
cas:
  - produit: 'Check Point VPN'
    editeur: 'Check Point'
    exploitation: 'avant-correctif'
    premiereExploitation: '7 mai 2026'
    divulgation: '8 juin 2026'
    ecart: '32 jours'
    kev:
      ajout: '8 juin 2026'
      echeance: '11 juin 2026'
competencesE5: ['gerer-patrimoine', 'repondre-incidents', 'mettre-a-disposition']
sources:
  - couche: 'datation'
    editeur: 'CERT-FR'
    titre: 'CERTFR-2026-AVI-0711 — Multiples vulnérabilités dans les VPN Check Point'
    date: '9 juin 2026'
    url: 'https://www.cert.ssi.gouv.fr/avis/CERTFR-2026-AVI-0711/'
  - couche: 'explication'
    editeur: 'BleepingComputer'
    titre: 'Check Point links VPN zero-day attacks to Qilin ransomware gang'
    date: 'juin 2026'
    url: 'https://www.bleepingcomputer.com/news/security/check-point-links-vpn-zero-day-attacks-to-qilin-ransomware-gang/'
  - couche: 'explication'
    editeur: 'IT Social'
    titre: 'Check Point corrige une faille critique d’accès distant sur ses passerelles VPN'
    date: '16 juin 2026'
    url: 'https://itsocial.fr/cybersecurite/cybersecurite-actualites/check-point-corrige-une-faille-critique-dacces-distant-vpn-exploitee-par-le-rancongiciel-qilin-sur-ses-passerelles-vpn/'
  - couche: 'analyse-technique'
    editeur: 'Unit 42'
    titre: 'Threat Brief: Active Exploitation of PAN-OS CVE-2026-0257'
    date: '9 juin 2026'
    url: 'https://unit42.paloaltonetworks.com/active-exploitation-of-pan-os-cve-2026-0257/'
  - couche: 'analyse-technique'
    editeur: 'Arctic Wolf'
    titre: 'Cookie Crumbles: How Exploitation of CVE-2026-0257 Leads to Qilin Ransomware'
    date: 'juillet 2026'
    url: 'https://arcticwolf.com/resources/blog/exploitation-of-cve-2026-0257-leads-to-qilin-ransomware/'
---

- CVE-2026-50751, CVSS 9.3 : défaut de validation des certificats lors de l’échange de clés IKEv1. Un attaquant non authentifié peut établir une session VPN sans mot de passe valide
- Exploitable seulement si quatre conditions sont réunies : accès distant VPN activé, IKEv1 (protocole déprécié) encore actif, anciens clients acceptés, certificat machine non obligatoire
- Divulgation et correctif le 8 juin 2026 ; exploitation depuis le 7 mai, soit 32 jours ; quelques dizaines d’organisations touchées, dont un cas relié à un affilié du rançongiciel Qilin
- Ajout au catalogue KEV le 8 juin, correction exigée pour le 11 juin
- Versions concernées : de R80.20 à R82.10, dont plusieurs ne sont plus maintenues
- La faille ne donne que l’accès initial : selon Check Point, une action supplémentaire reste nécessaire pour atteindre les ressources internes
- Mesures de contournement données par l’éditeur : n’autoriser que IKEv2, retirer la prise en charge des anciens clients, rendre le certificat machine obligatoire
- Sur la faille Palo Alto de mai, Unit 42 indique le 9 juin que seule une petite partie des équipements sondés a réellement ouvert une session VPN ; Arctic Wolf documente pourtant, sur le même mois, plusieurs intrusions passées par cette faille et terminées par un déploiement de Qilin

**Mon analyse.** C’est le cas le plus riche de la période, pour trois raisons.

- La cause est une configuration héritée. IKEv1 est déprécié depuis des années. La faille n’est exploitable que si on l’a laissé actif, typiquement pour ne pas casser un vieux client. C’est la dette technique qui ouvre la porte.
- La chaîne est complète : équipement de bordure → accès initial → rançongiciel, et elle se répète chez deux éditeurs différents. On voit comment une faille réseau devient une crise d’entreprise.
- Le délai : 32 jours pendant lesquels des organisations étaient compromises sans le savoir.

**Lien avec le BTS SIO SISR :** VPN, IPsec et IKE, validation de certificats (PKI), et la règle « désactiver ce qui n’est pas utilisé » pour réduire la surface d’attaque.
