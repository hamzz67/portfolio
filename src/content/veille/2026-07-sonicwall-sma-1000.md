---
mois: '2026-07'
titre: 'SonicWall SMA 1000 : exploité trois semaines avant l’avis'
faitMarquant: 'Chaîne de deux failles jusqu’aux droits root'
cve: ['CVE-2026-15409', 'CVE-2026-15410']
cas:
  - produit: 'SonicWall SMA 1000'
    editeur: 'SonicWall'
    exploitation: 'avant-correctif'
    premiereExploitation: '22 juin 2026'
    divulgation: '14 juillet 2026'
    ecart: '22 jours'
    kev:
      ajout: '14 juillet 2026'
      echeance: '17 juillet 2026'
competencesE5: ['gerer-patrimoine', 'repondre-incidents']
sources:
  - couche: 'datation'
    editeur: 'CERT-FR'
    titre: 'CERTFR-2026-ALE-006 — Multiples vulnérabilités dans Sonicwall Secure Mobile Access'
    date: '15 juillet 2026'
    url: 'https://www.cert.ssi.gouv.fr/alerte/CERTFR-2026-ALE-006/'
  - couche: 'analyse-technique'
    editeur: 'Volexity'
    titre: 'Proxying to Compromise: SonicWall Secure Mobile Access 0-day Exploitation'
    date: '17 juillet 2026'
    url: 'https://www.volexity.com/blog/2026/07/17/proxying-to-compromise-sonicwall-secure-mobile-access-0-day-exploitation/'
  - couche: 'explication'
    editeur: 'Help Net Security'
    titre: 'SonicWall SMA zero-days were exploited weeks before disclosure'
    date: '21 juillet 2026'
    url: 'https://www.helpnetsecurity.com/2026/07/21/sonicwall-sma-zero-days-exploited-cve-2026-15409-cve-2026-15410/'
---

- CVE-2026-15409 (SSRF sans authentification) et CVE-2026-15410 (exécution de code avec les droits administrateur) sur les passerelles SMA 1000, modèles 6210, 7210 et 8200v
- Avis de l’éditeur le 14 juillet 2026 ; première trace de compromission relevée par Volexity le 22 juin, soit 22 jours plus tôt
- Ajout au catalogue KEV le 14 juillet, correction exigée pour le 17 juillet
- Chaîne d’attaque en trois temps :
  - contournement d’authentification par une requête forgée `GET /wsproxy?bmID=-3389…` portant l’en-tête `User-Agent: SMA Connect Agent`, qui ouvre un tunnel WebSocket vers des services normalement accessibles depuis la machine seulement ;
  - accès à la base CouchDB locale, livrée avec des identifiants codés en dur (`admin` / `admin`), pour déposer un script sur l’équipement ;
  - appel de `sysCtrl.execRemoveHotfix` avec une traversée de répertoire (`../../../../../tmp/1234.sh`) pour exécuter ce script en root.
- Charge finale : le maliciel KNUCKLEBALL, qui injecte dans un processus légitime un proxy HTTP (Suo5) et un webshell (ORANGETAIL), puis capture du trafic LDAP non chiffré pour récupérer des identifiants. Volexity note que l’attaquant a eu moins de succès pour progresser ensuite dans le réseau
- En cas d’indices de compromission, le correctif ne suffit pas : il faut réinstaller le système, changer tous les mots de passe et réinitialiser les codes à usage unique

**Mon analyse.** Pendant trois semaines, les équipes qui suivaient uniquement les bulletins officiels ne pouvaient rien savoir. La chaîne technique est aussi un cas d’école aligné sur le programme : identifiants par défaut jamais changés, entrées non contrôlées, services locaux atteignables par un tunnel, annuaire interrogé en clair. Chaque étape correspond à une règle vue en cours, et le respect d’une seule aurait compliqué l’attaque.

**Lien avec le BTS SIO SISR :** comptes par défaut, LDAPS, segmentation, réponse à incident.
