---
mois: '2026-10'
titre: 'Citrix NetScaler : une troisième faille en six semaines'
faitMarquant: 'Déni de service via le traitement SAML'
cve: ['CVE-2026-88779']
cvss: 8.7
cas:
  - produit: 'Citrix NetScaler'
    editeur: 'Citrix'
    exploitation: 'avant-correctif'
    divulgation: '4 octobre 2026'
    kev:
      ajout: '4 octobre 2026'
competencesE5: ['gerer-patrimoine', 'repondre-incidents', 'mettre-a-disposition']
sources:
  - couche: 'datation'
    editeur: 'CERT-FR'
    titre: 'CERTFR-2026-ALE-011, mise à jour'
    date: '5 octobre 2026'
    url: 'https://www.cert.ssi.gouv.fr/alerte/CERTFR-2026-ALE-011/'
  - couche: 'explication'
    editeur: 'LeMagIT'
    titre: 'Citrix Netscaler : deux vulnérabilités utilisées pour déployer des têtes de pont'
    date: '1er octobre 2026'
    url: 'https://www.lemagit.fr/actualites/366651421/Citrix-Netscaler-deux-vulnerabilites-utilisees-pour-deployer-des-tetes-de-pont'
  - couche: 'explication'
    editeur: 'The Hacker News'
    titre: 'New NetScaler Zero-Day Exploited in Targeted Attacks Can Knock SAML Deployments Offline'
    date: 'octobre 2026'
    url: 'https://thehackernews.com/2026/10/new-netscaler-zero-day-exploited-in.html'
---

- Retour sur les failles de septembre (LeMagIT, 1<sup>er</sup> octobre) : selon Mandiant, la campagne d’exploitation a débuté au moins début septembre, avec dépôt de webshells puis utilisation d’un tunnel vers le réseau interne pour la reconnaissance et le vol d’identifiants
- Mandiant souligne que ces équipements, exposés à Internet, sont hors de portée des outils de détection installés sur les postes (EDR) ; Citrix recommande de transférer leurs journaux vers une plateforme externe
- CVE-2026-88779 (CVSS 8.7) : dépassement mémoire dans le traitement SAML → déni de service à distance
- Concerne les NetScaler configurés comme fournisseur de services ou fournisseur d’identité SAML
- Divulguée le 4 octobre 2026, déjà exploitée ; ajout au catalogue KEV le même jour
- Selon Rapid7, chaque tentative fait tomber le service SAML et, à la sixième, l’équipement redémarre

**Mon analyse.** SAML est le protocole d’authentification unique : c’est par lui que passent les connexions des utilisateurs. L’impact confirmé ici n’est pas une intrusion mais une indisponibilité : en faisant tomber le traitement de l’authentification, l’attaquant coupe l’accès distant de toute l’organisation. Cela rappelle que la sécurité d’une passerelle se juge sur trois critères, la disponibilité autant que la confidentialité et l’intégrité. Le bilan de Mandiant ajoute une raison de fond au succès de ces attaques : une passerelle ne peut pas recevoir d’agent de détection comme un poste de travail. La seule visibilité vient de ses journaux, à condition qu’ils soient envoyés ailleurs.

*Chronologie arrêtée au 7 octobre 2026 ; la veille se poursuit.*
