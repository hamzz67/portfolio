/**
 * COMPÉTENCES — affichées par domaine, sans barres de pourcentage.
 *
 * Règle : ne lister que des compétences réellement confirmées.
 * Une entrée `{ name: 'TODO …', placeholder: true }` s'affiche comme
 * "à renseigner" (style pointillé) : à remplacer ou supprimer.
 *
 * Le site relie automatiquement chaque compétence aux fiches de travaux
 * dont le champ `technologies` ou `skills` contient le même nom
 * (comparaison insensible à la casse et aux accents).
 */

export interface Skill {
  /** Nom affiché — doit correspondre au nom utilisé dans les fiches. */
  name: string;
  /** Précision courte (optionnel). */
  note?: string;
  /** Marque un placeholder à compléter. */
  placeholder?: boolean;
}

export interface SkillDomain {
  id: string;
  label: string;
  /** Icône (voir src/components/Icon.astro). */
  icon: string;
  /** Une phrase qui décrit le domaine. */
  description: string;
  skills: Skill[];
}

export const skillDomains: SkillDomain[] = [
  {
    id: 'reseaux',
    label: 'Réseaux',
    icon: 'network',
    description: 'Conception, configuration et dépannage de réseaux locaux et de leur interconnexion.',
    skills: [
      { name: 'Cisco', note: 'Configuration de commutateurs et routeurs (IOS)' },
      { name: 'VLAN', note: 'Segmentation, trunks, routage inter-VLAN' },
      { name: 'Routage statique' },
      { name: 'RIP', note: 'Routage dynamique' },
      { name: '802.1Q', note: 'Liaisons trunk entre commutateurs' },
      { name: 'VLSM', note: 'Découpage en sous-réseaux de tailles variables' },
      { name: 'Adressage IPv4 et sous-réseaux' },
      { name: 'Packet Tracer', note: 'Simulation et maquettage' },
    ],
  },
  {
    id: 'systemes',
    label: 'Systèmes',
    icon: 'server',
    description: 'Installation, administration et maintenance de systèmes d’exploitation.',
    skills: [
      { name: 'Linux', note: 'Administration, ligne de commande' },
      { name: 'Windows', note: 'Postes et services' },
      { name: 'Windows Server 2022', note: 'Rôle Active Directory, administration en machine virtuelle' },
      { name: 'Active Directory', note: 'Comptes, groupes, unités d’organisation, appartenances imbriquées' },
      { name: 'PowerShell', note: 'Audit et administration en ligne de commande (module ActiveDirectory)' },
      { name: 'NTFS', note: 'Droits sur les dossiers partagés (icacls, Get-Acl)' },
      { name: 'Virtualisation', note: 'Machines virtuelles, laboratoires' },
      { name: 'Ubuntu Server', note: 'Préparation d’un déploiement web (Nginx, Gunicorn, HTTPS)' },
      { name: 'Sauvegardes et tâches planifiées', note: 'Rétention, relances et alertes automatiques' },
    ],
  },
  {
    id: 'cybersecurite',
    label: 'Cybersécurité',
    icon: 'shield',
    description: 'Sécurisation des réseaux et des systèmes, bonnes pratiques et hygiène numérique.',
    skills: [
      { name: 'Sécurité réseau', note: 'Notions : segmentation, filtrage, durcissement' },
      { name: 'Sécurité système', note: 'Notions : comptes, droits, mises à jour' },
      { name: 'Audit de sécurité', note: 'Constater, prouver, qualifier le risque, corriger, vérifier' },
      { name: 'Wireshark', note: 'Capture et analyse de trames, décodage couche par couche' },
      { name: 'nmap', note: 'Découverte d’hôtes, analyse de ports et de versions (en laboratoire fermé)' },
      { name: 'Filtrage et pare-feu', note: 'Règles entrantes, autorisation et blocage d’un protocole' },
      { name: 'Segmentation réseau', note: 'VLAN, cloisonnement des flux entre services' },
      { name: 'Gestion des habilitations (RBAC)', note: 'Droits attribués par rôle plutôt qu’individuellement' },
      { name: 'Principe du moindre privilège', note: 'Comptes privilégiés et comptes de service' },
      { name: 'Bonnes pratiques', note: 'Mots de passe, sauvegardes, moindre privilège' },
      { name: 'Sécurisation d’une application', note: 'Authentification, rôles, CSRF/XSS, en-têtes, journalisation' },
    ],
  },
  {
    id: 'developpement',
    label: 'Développement',
    icon: 'code',
    description: 'Conception d’outils et d’applications web pour automatiser et simplifier.',
    skills: [
      { name: 'Python', note: 'Bases acquises en stage' },
      { name: 'Flask', note: 'Application web, routes, sessions' },
      { name: 'SQLAlchemy', note: 'Modèle de données, ORM' },
      { name: 'SQLite', note: 'Base de développement' },
      { name: 'PostgreSQL', note: 'Base cible en production' },
      { name: 'Bootstrap 5', note: 'Interfaces responsives' },
      { name: 'JavaScript', note: 'Interactions, graphiques (Chart.js)' },
      { name: 'pytest', note: 'Tests automatisés' },
    ],
  },
  {
    id: 'outils',
    label: 'Outils',
    icon: 'wrench',
    description: 'Environnement de travail quotidien.',
    skills: [
      { name: 'Git', note: 'Versionnement' },
      { name: 'GitHub', note: 'Dépôts, collaboration' },
      { name: 'GitHub Actions', note: 'Tests lancés à chaque modification' },
      { name: 'VS Code' },
      { name: 'Claude Code', note: 'Assistant IA : accélérer, puis relire et tester' },
      { name: 'Veille technologique', note: 'Flux RSS, sources officielles (ANSSI, CERT-FR), suivi régulier' },
    ],
  },
];
