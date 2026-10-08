# Écarts entre le tableau de synthèse officiel et le portfolio

Comparaison de `private/TableauSyntheseHamza.xlsx` (le document remis au jury,
annexe VI.5) avec les fiches publiées sur le site.

Le jury lit les deux. **Toute divergence entre eux est une question à l'oral.**

---

## 🔴 D'abord : la case vide

Dans le tableau, le champ **« Adresse URL du portfolio »** est vide.

C'est par cette case que le jury trouve le site. Les grilles retirent
**10 points sur 20** pour un portfolio inaccessible, et un champ vide est la
façon la plus sûre d'être inaccessible.

```
Adresse URL du portfolio : https://hamzzportfolio.pages.dev
```

À remplir avant toute autre chose. Si un nom de domaine est acheté plus tard,
mettre à jour le tableau **et** vérifier que l'ancienne adresse redirige.

---

## Ce que le tableau déclare, et que le portfolio ne montre pas

Le tableau compte **17 réalisations**. Le portfolio en publie **7**, plus la
veille. Les manquantes ci-dessous existent : les comptes rendus sont dans
l'archive Moodle, il ne s'agit que de les rédiger.

Par ordre d'intérêt — les deux premières valent le plus, parce qu'elles sont
les seules preuves des compétences aujourd'hui les plus faibles.

| | Réalisation du tableau | Couvre | Pourquoi elle compte |
|---|---|---|---|
| 🔴 1 | **Analyse de la conformité RGPD du site web d'une entreprise** | `presence-en-ligne` | L'une des **deux seules** preuves de cette compétence, et la seule hors stage. |
| 🔴 2 | **Gestion de projet : Gantt et cahier des charges du projet AP « Le Torréfacteur »** | `mode-projet` | Même chose : hors stage, c'est la seule preuve. Et l'AP2 est le projet au cycle complet. |
| 🟠 3 | Sauvegarde, supervision (SNMP, NetFlow) et haute disponibilité (HSRP, EtherChannel) | `gerer-patrimoine`, `mettre-a-disposition` | Du SISR de deuxième année, récent (sept. 2026), et rare dans un portfolio d'étudiant. |
| 🟠 4 | Installation de Windows Server 2022 et déploiement d'un domaine Active Directory | `gerer-patrimoine`, `repondre-incidents`, `mettre-a-disposition` | Complète la fiche d'audit AD déjà en ligne : l'installation, puis l'audit. |
| 🟠 5 | Sécurisation d'un commutateur | `gerer-patrimoine` | La fiche VLAN annonce elle-même ce TP comme « l'étape suivante ». |
| 🟢 6 | NAT/PAT sur matériel Cisco | `repondre-incidents`, `mettre-a-disposition` | À ajouter à la fiche routage, qui couvre déjà statique, RIP et VLSM. |
| 🟢 7 | Installation et administration d'un système Linux | `repondre-incidents`, `mettre-a-disposition` | Travail de première année, fondamental mais peu différenciant. |
| 🟢 8 | Configuration d'un poste de travail et inventaire matériel | `gerer-patrimoine`, `mettre-a-disposition` | Le tout premier TP. À faire en dernier, si le temps le permet. |

---

## Deux incohérences à trancher

### Les dates du TP de sécurité

Le tableau regroupe **« Wireshark, pare-feu, attaques Ethernet, ACL, nmap,
Metasploit »** en une réalisation, du **14/10/25 au 05/11/25**.

Le portfolio en fait deux fiches :

| Fiche | Date affichée |
|---|---|
| `wireshark-pare-feu-2025` | 14 octobre 2025 ✅ cohérent |
| `nmap-decouverte-2026` | **8 avril 2026** ⚠️ hors de la période du tableau |

Deux possibilités : soit nmap a bien été fait en avril 2026 et le tableau
regroupe trop largement, soit la date de la fiche est fausse. **Toi seul
sais.** Corrige celui des deux qui a tort — c'est exactement le genre de détail
qu'un jury vérifie.

À noter aussi : le tableau mentionne **Metasploit, les attaques Ethernet et les
ACL**, dont aucune fiche ne parle. Soit les ajouter aux fiches existantes, soit
les retirer du tableau.

### La fiche d'audit Active Directory

La fiche `audit-ad-rbac-2026` (septembre 2026, audit AD et droits NTFS)
**n'apparaît nulle part dans le tableau**. Elle est pourtant publiée, et c'est
une des meilleures : huit anomalies relevées, corrigées, vérifiées, avec
captures.

→ **À ajouter au tableau**, dans « Réalisations en cours de formation » :
`gerer-patrimoine`, `repondre-incidents`, `mettre-a-disposition`.

### La fiche « Ce portfolio » (ajoutée le 8 octobre 2026)

La fiche `portfolio-infrastructure-2026` (déploiement continu, en-têtes de
sécurité notés A+ par Mozilla Observatory, deux incidents de production
corrigés) **n'est pas dans le tableau**. C'est une réalisation personnelle et
la seule preuve hors stage de `presence-en-ligne`.

→ **À ajouter au tableau**, dans « Réalisations en cours de formation » :
`presence-en-ligne`, `mettre-a-disposition`, `repondre-incidents`.

---

## Ce qui a été aligné

La fiche de stage déclarait quatre compétences. Le tableau découpe le stage en
**sept réalisations** qui couvrent, ensemble, **les six compétences du bloc** :

| Réalisation du tableau | Compétences cochées |
|---|---|
| Analyse du besoin et conception | `repondre-incidents`, `mode-projet` |
| Développement, tests, accompagnement | `repondre-incidents`, `mettre-a-disposition` |
| Sécurisation (9 failles, 2FA, droits) | `gerer-patrimoine`, `repondre-incidents` |
| Automatisation et sauvegardes | `gerer-patrimoine`, `mettre-a-disposition` |
| Liaison avec le site vitrine | `presence-en-ligne`, `mode-projet` |
| Mise en production VPS Ubuntu | `mode-projet`, `mettre-a-disposition` |
| Autoformation Python / Flask | `developpement-pro` |

La fiche porte désormais leur union. Elle ne déclare donc rien de plus que le
document remis au jury.

---

## Pour mémoire : le découpage, et le piège

Le tableau découpe le stage en sept lignes ; le portfolio en fait une fiche.
C'est normal — ce sont deux formats différents, et le jury le comprend.

Le piège serait l'inverse : **déclarer sur le site une compétence que le
tableau ne coche pas**, ou raconter la même réalisation différemment dans les
deux. Quand tu modifies l'un, relis l'autre.

*Établi le 7 octobre 2026, à partir de `TableauSyntheseHamza.xlsx`.*
