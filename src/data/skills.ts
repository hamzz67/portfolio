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
      { name: 'Virtualisation', note: 'Machines virtuelles, laboratoires' },
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
      { name: 'Bonnes pratiques', note: 'Mots de passe, sauvegardes, moindre privilège' },
    ],
  },
  {
    id: 'developpement',
    label: 'Développement',
    icon: 'code',
    description: 'Conception d’outils et d’applications web pour automatiser et simplifier.',
    skills: [
      { name: 'TODO — technologies de développement à confirmer', placeholder: true },
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
      { name: 'VS Code' },
    ],
  },
];
