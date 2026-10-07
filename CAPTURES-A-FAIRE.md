# Captures à produire

Liste des illustrations qui manquent aux fiches de travaux **déjà publiées**.
Les fiches sont en ligne et se tiennent sans images, mais une fiche illustrée
est nettement plus crédible — et le jury E5 attend des preuves visuelles.

> **Pourquoi elles manquent.** Deux raisons seulement :
> 1. les images du compte rendu venaient de l'énoncé du professeur (capturées
>    sur un réseau inconnu, parfois en 2021) — ce n'est ni mon travail ni
>    publiable ;
> 2. le rendu déposé est un fichier Packet Tracer (`.pka` / `.pkt`), que je dois
>    rouvrir moi-même pour en tirer des captures.

## Comment ajouter une capture

1. Déposer le fichier dans `src/content/projects/<slug>/`, nommé
   `capture-NN-description.png`.
2. L'ajouter dans le bloc `images:` du `.md` correspondant :
   ```yaml
   images:
     - src: ./<slug>/capture-01-topologie.png
       alt: "Ce que montre l'image, pour qui ne la voit pas"
       caption: "Ce qu'il faut en retenir"
   ```
3. `npm run build` vérifie que le fichier existe et que l'`alt` est présent.

**Avant de capturer**, relire `CONTENT-SAFETY.md`. En pratique, sur ces TP :
masquer les adresses IP publiques, le nom du réseau Wi-Fi, les noms de session
Windows, et fermer les onglets et notifications visibles à l'écran.

---

## `wireshark-pare-feu-2025` — Analyse ICMP et pare-feu

Refaisable en cinq minutes sur ton PC, sans matériel particulier.

| # | Capture | Détail |
|---|---|---|
| 1 | Wireshark filtré sur `icmp` pendant un `ping` vers la box | On doit voir la requête d'écho **et** la réponse |
| 2 | Le détail d'une trame déplié | Les quatre niveaux visibles : `Frame`, `Ethernet II`, `IP`, `ICMP` — c'est l'illustration du modèle OSI |
| 3 | La règle ICMPv4 dans le pare-feu Windows | Pare-feu Windows Defender → Paramètres avancés → Règles de trafic entrant |
| 4 | *(bonus)* Un `ping` qui échoue, règle de blocage active | C'est la démonstration du propos de la fiche : joignable ≠ qui répond |

🔒 Masquer l'adresse IP publique et le nom du réseau.

## `vlan-trunk-2026` — VLAN et trunk 802.1Q

À produire depuis ton propre fichier Packet Tracer.

| # | Capture | Détail |
|---|---|---|
| 1 | La topologie | Les trois commutateurs et les postes des trois services |
| 2 | `show vlan brief` | Montre les VLAN créés et les ports affectés |
| 3 | `show interfaces trunk` | Prouve que les liens entre commutateurs portent bien tous les VLAN |
| 4 | Le « Check Results » de l'activité | La validation automatique, à 100 % |
| 5 | Un `ping` qui **passe** entre deux postes du même service, sur deux commutateurs différents | C'est l'intérêt du trunk |
| 6 | Un `ping` qui **échoue** entre deux services | C'est l'étanchéité, le point de la fiche |

## `routage-statique-rip-2026` — Routage statique, RIP, VLSM

Même chose, depuis tes fichiers Packet Tracer.

| # | Capture | Détail |
|---|---|---|
| 1 | La topologie des deux routeurs et de leurs sous-réseaux | |
| 2 | `show ip route` avec les routes statiques | Les routes marquées `S` |
| 3 | `show ip route` après activation de RIP | Les routes apprises, marquées `R` — la comparaison des deux est le cœur de la fiche |
| 4 | Un test de connectivité de bout en bout qui réussit | |
| 5 | *(bonus)* Le tableau du plan d'adressage VLSM | Un schéma propre vaut mieux qu'une capture ici |

## `nmap-decouverte-2026` — Découverte réseau

✅ A déjà sa capture (le scan du laboratoire).

| # | Capture | Détail |
|---|---|---|
| 2 | *(bonus)* La connexion SSH sur le port non standard | `ssh -p 2869` puis la lecture du fichier : c'est la fin de la mission |

⚠️ **Uniquement dans le Labtainer.** Ne jamais scanner un réseau réel, ni celui
du lycée, ni celui d'une entreprise. En dehors du laboratoire, le seul hôte
autorisé est `scanme.nmap.org`.

## `veille-developpement-professionnel-2026` — Veille et recherche de stage

| # | Capture | Détail |
|---|---|---|
| 1 | L'agrégateur de flux RSS, avec les sources suivies | 🔒 Masquer l'adresse e-mail du compte |
| 2 | *(bonus)* Le tableau de suivi des candidatures | 🔒 **Masquer impérativement** les noms d'entreprises et de contacts |

---

## Et pour la suite : prendre l'habitude

Le vrai problème n'est pas ces captures-ci, c'est les prochaines. Reconstituer
un TP en mai 2027 est impossible — ces quatre fiches en sont la preuve.

**À chaque TP, le jour même, cinq minutes :**

- [ ] 2 ou 3 captures de ce que tu as **fait** (pas de l'énoncé)
- [ ] les commandes importantes, copiées en texte
- [ ] **la difficulté rencontrée et comment tu l'as résolue** — c'est la section
      que tout le monde oublie, et celle qui distingue un portfolio d'étudiant
      d'un portfolio de professionnel
- [ ] à quoi ça a servi, en une phrase

Même en vrac dans un fichier : la fiche se rédige après, le souvenir non.
