# Sécurité du contenu — check-list avant publication

Ce site est **public sur Internet** et son code source est sur GitHub. Tout ce qui est ajouté (texte, image, PDF, code) est accessible à n'importe qui, indexé par les moteurs de recherche et potentiellement archivé pour toujours — même après suppression.

Cette page est à relire **avant chaque publication** d'une fiche, d'une image ou d'un document.

---

## À ne jamais publier

| ❌ Interdit | Pourquoi |
| --- | --- |
| Mots de passe, même « de test » ou « de labo » | Réutilisés ailleurs, ou révélateurs des habitudes |
| Clés API, tokens, secrets, certificats privés, clés SSH | Accès direct à des services |
| Identifiants de connexion (logins, comptes de service) | Première étape d'une attaque |
| Adresses IP internes réelles, plans d'adressage d'une entreprise | Cartographie de l'infrastructure |
| IP publiques sensibles, noms de domaine internes, noms de serveurs réels | Reconnaissance facilitée |
| Configurations réelles (routeurs, pare-feu, serveurs) copiées telles quelles | Révèlent règles, failles, versions |
| Noms complets de personnes tierces (collègues, tuteurs, camarades) sans accord écrit | Vie privée, RGPD |
| Données clients, données internes d'entreprise, documents confidentiels | Confidentialité contractuelle, responsabilité |
| Votre adresse personnelle, votre téléphone, votre date de naissance | Usurpation, harcèlement |
| Captures d'écran non nettoyées (barre d'onglets, notifications, e-mails, noms de fichiers) | Fuites involontaires |
| Copies de sujets d'examen ou d'évaluations protégés | Droits, règlement de l'établissement |

## À faire à la place

| ✅ Remplacer par |
| --- |
| Adresses IP d'exemple réservées à la documentation : `192.0.2.0/24`, `198.51.100.0/24`, `203.0.113.0/24` — ou des plages privées génériques (`10.0.0.0/8`, `192.168.x.x`) sans lien avec un réseau réel |
| Noms génériques : `SRV-WEB-01`, `entreprise.example`, `utilisateur@example.com`, « le tuteur », « l'équipe technique » |
| Mots de passe et secrets : `********`, `<mot-de-passe>`, `REDACTED` |
| Captures recadrées, floutées ou refaites sur une maquette (Packet Tracer, VM de labo) |
| Schémas simplifiés, redessinés, sans données réelles |
| Description technique du **principe** (« filtrage par liste d'accès sur l'interface WAN ») plutôt que la configuration réelle |
| Version « publique » d'un rapport : anonymisée, validée par le tuteur / l'entreprise si elle contient des éléments internes |

---

## Check-list par type de contenu

### Fiche de travail (Markdown)

- [ ] Aucun mot de passe, identifiant, token, clé.
- [ ] Les IP et noms sont des exemples (`192.0.2.x`, `SRV-01`).
- [ ] Les extraits de configuration sont nettoyés (`REDACTED`) ou issus d'une maquette.
- [ ] Aucun nom complet de tiers sans accord.
- [ ] Pour un stage : l'entreprise est d'accord avec ce qui est décrit ; rien de confidentiel (clients, chiffres, code source interne, architecture réelle non validée).
- [ ] Le champ `publicSafe: true` est coché **après** vérification.

### Image / capture d'écran

- [ ] Barre d'onglets, favoris, notifications, horloge, noms de comptes : recadrés ou floutés.
- [ ] Aucune IP réelle, aucun hostname réel, aucune adresse e-mail, aucun visage sans accord.
- [ ] Le nom du fichier lui-même est neutre (`capture-1.png`, pas `config-routeur-enerdys-192-168-1-1.png`).
- [ ] Les métadonnées EXIF (localisation, appareil) sont retirées pour les photos — Astro régénère les images, ce qui supprime les métadonnées des versions affichées, mais le fichier original reste dans le dépôt Git : nettoyez-le avant de l'ajouter.

### Document PDF

- [ ] Version publique distincte du rapport officiel si celui-ci contient des données internes.
- [ ] Pas de coordonnées personnelles (le CV public ne comporte ni adresse ni téléphone ; l'e-mail professionnel suffit).
- [ ] Recherche des mots « mot de passe », « password », « login », « @ », « 192.168 », « 10. » dans le PDF avant publication.
- [ ] Métadonnées du PDF (auteur, titre) vérifiées.
- [ ] Autorisation de l'entreprise pour tout document lié au stage.

### Code (dépôt GitHub)

- [ ] Aucun fichier `.env`, aucune clé dans le code (le `.gitignore` exclut `.env*` et `private/`).
- [ ] Les dossiers de travail non publiables vont dans `private/` (ignoré par Git).
- [ ] Un secret publié par erreur est considéré comme **compromis** : le révoquer/changer immédiatement, puis le retirer de l'historique.

---

## Le mécanisme `publicSafe`

Chaque fiche possède un champ `publicSafe` (par défaut `false`). Il ne bloque pas la publication (le site reste simple à maintenir), mais :

- en développement (`npm run dev`), une fiche non vérifiée affiche un rappel dans sa colonne latérale ;
- c'est votre trace personnelle : passer à `true` signifie « j'ai relu cette check-list pour cette fiche ».

Pour cacher une fiche non finalisée : `draft: true`.

---

## En cas de doute

Si vous hésitez à publier un élément : ne le publiez pas, ou demandez à votre tuteur / enseignant. Un portfolio moins fourni mais irréprochable vaut mieux qu'une fuite d'information — surtout pour quelqu'un qui se destine à la cybersécurité : c'est précisément ce que le jury et les recruteurs regarderont.
