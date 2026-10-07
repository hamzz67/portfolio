/**
 * PROFIL — informations publiques affichées sur le site.
 *
 * Règle : uniquement des informations professionnelles et publiques.
 * Pas d'adresse, pas de téléphone, pas de date de naissance (voir CONTENT-SAFETY.md).
 *
 * Les valeurs commençant par "TODO" sont des placeholders : elles sont
 * affichées comme "à renseigner" sur le site tant qu'elles ne sont pas remplacées.
 */

export const profile = {
  name: 'Hamza Jallabi',
  firstName: 'Hamza',
  /**
   * Phrase d'accroche de la hero.
   * Règle : une affirmation que le reste du site vérifie, pas une déclaration
   * d'intention. « Passionné par » est ce qu'écrivent tous les étudiants ;
   * « je conçois, configure et sécurise » se contrôle en ouvrant les fiches.
   */
  tagline:
    'Je conçois, configure et sécurise des infrastructures réseau et systèmes. BTS SIO SISR, major de promotion.',
  role: 'Étudiant en BTS SIO SISR',
  school: 'Lycée René Cassin',
  city: 'Strasbourg',
  studies: {
    label: 'BTS SIO option SISR',
    fullLabel:
      'BTS Services Informatiques aux Organisations — option Solutions d’Infrastructure, Systèmes et Réseaux',
    start: '2025-09',
    end: '2027-07',
  },
  /** Objectif professionnel : présent mais discret. */
  goal: 'Évoluer vers l’ingénierie en cybersécurité.',

  /** Présentation courte (section "En bref"). Ton professionnel, pas de biographie. */
  about: [
    'Je suis étudiant en BTS SIO option SISR au lycée René Cassin de Strasbourg, une formation en deux ans centrée sur l’administration des systèmes, des réseaux et la sécurité des services informatiques.',
    'Ce qui m’intéresse : comprendre comment fonctionne une infrastructure de bout en bout — du câble et du VLAN jusqu’au service exposé — et apprendre à la rendre fiable et sûre. J’aime autant configurer un routeur que développer un outil qui simplifie une tâche.',
    'Ce portfolio rassemble mes travaux de formation, mon stage et mes projets personnels. Il est mis à jour au fil de ma progression.',
  ],

  /** Ce que je cherche à mettre en avant (badges de la hero / à propos). */
  focus: [
    'Réseaux',
    'Systèmes',
    'Cybersécurité',
    'Administration',
    'Linux',
    'Infrastructure',
    'Développement',
    'Web',
    'Cloud',
  ],

  /**
   * Liens de contact. Remplacer les valeurs TODO par les vraies URL.
   * Laisser `undefined` pour masquer un lien.
   */
  links: {
    email: 'hamza.jallabi20@gmail.com' as string | undefined,
    github: 'https://github.com/hamzz67' as string | undefined,
    linkedin: 'https://www.linkedin.com/in/hamza-jallabi' as string | undefined,
    /** Chemin du CV public dans /public/documents (ou undefined pour masquer). */
    cv: '/documents/CV-Hamza-Jallabi.pdf' as string | undefined, // régénérer avec `npm run cv`
  },

  /** Disponibilité affichée dans la section contact (optionnel). */
  availability: 'Ouvert aux opportunités d’alternance et de stage dans les infrastructures, les réseaux et la cybersécurité.',
} as const;

/** Un champ est un placeholder s'il est vide ou commence par "TODO". */
export function isPlaceholder(value: string | undefined | null): boolean {
  return !value || value.trim().toUpperCase().startsWith('TODO');
}
