/**
 * RÉFÉRENTIEL E5 — les six compétences du bloc, dans leur formulation officielle.
 *
 * Les identifiants servent de clé partout : dans le frontmatter des entrées de
 * veille (`competencesE5`), dans celui des fiches de travaux, et pour générer le
 * tableau de synthèse de la page /e5/.
 *
 * ⚠️ Ne pas renommer un identifiant sans mettre à jour tous les fichiers qui
 *    l'utilisent : le build échouera en indiquant lesquels.
 */

export const COMPETENCES_E5 = {
  'gerer-patrimoine': {
    label: 'Gérer le patrimoine informatique',
    court: 'Patrimoine',
  },
  'repondre-incidents': {
    label: 'Répondre aux incidents et aux demandes d’assistance et d’évolution',
    court: 'Incidents',
  },
  'presence-en-ligne': {
    label: 'Développer la présence en ligne de l’organisation',
    court: 'Présence en ligne',
  },
  'mode-projet': {
    label: 'Travailler en mode projet',
    court: 'Mode projet',
  },
  'mettre-a-disposition': {
    label: 'Mettre à disposition des utilisateurs un service informatique',
    court: 'Mise à disposition',
  },
  'developpement-pro': {
    label: 'Organiser son développement professionnel',
    court: 'Développement pro',
  },
} as const;

export type CompetenceE5 = keyof typeof COMPETENCES_E5;

export const competenceKeys = Object.keys(COMPETENCES_E5) as CompetenceE5[];

/**
 * COUCHES DE SOURCES — la hiérarchie du dispositif de veille.
 *
 * La règle de méthode est qu'un fait ne vaut que croisé : le schéma refuse une
 * entrée dont les sources appartiennent toutes à la même couche.
 */
export const COUCHES = {
  datation: {
    label: 'Datation',
    role: 'Établit le fait et sa date. Officiel, archivé.',
  },
  'datation-croisee': {
    label: 'Datation croisée',
    role: 'Confirme l’exploitation active, avec date d’ajout et échéance de correction.',
  },
  explication: {
    label: 'Explication',
    role: 'Contexte, portée pour les entreprises, rapidité.',
  },
  'analyse-technique': {
    label: 'Analyse technique',
    role: 'Mécanisme d’exploitation, chaîne d’attaque, date réelle de la première exploitation.',
  },
  reference: {
    label: 'Référence',
    role: 'Recul sur l’année et recommandations.',
  },
} as const;

export type Couche = keyof typeof COUCHES;

export const coucheKeys = Object.keys(COUCHES) as Couche[];

/** Le dispositif de veille, tel qu'il est présenté en partie 2 de la page. */
export const DISPOSITIF: { couche: Couche | 'agregation'; sources: string; role: string }[] = [
  {
    couche: 'datation',
    sources: 'CERT-FR (alertes, avis, bulletins d’actualité), CERT Santé, Centre canadien pour la cybersécurité',
    role: 'Établit le fait et sa date. Officiel, archivé.',
  },
  {
    couche: 'datation-croisee',
    sources: 'CISA — catalogue KEV',
    role: 'Confirme l’exploitation active, avec date d’ajout et échéance de correction.',
  },
  {
    couche: 'explication',
    sources: 'LeMagIT, IT Social, ITdaily (FR) ; BleepingComputer, The Hacker News, Help Net Security (EN)',
    role: 'Contexte, portée pour les entreprises, rapidité.',
  },
  {
    couche: 'analyse-technique',
    sources: 'Rapid7, Volexity, Unit 42, GreyNoise, Arctic Wolf',
    role: 'Mécanisme d’exploitation, chaîne d’attaque, date réelle de la première exploitation.',
  },
  {
    couche: 'reference',
    sources: 'ANSSI (panoramas annuels, guides)',
    role: 'Recul sur l’année et recommandations.',
  },
  {
    couche: 'agregation',
    sources: 'Feedly (flux RSS de tout ce qui précède)',
    role: 'Un seul point d’entrée, consulté chaque semaine (environ 20 minutes).',
  },
];

/** Les trois règles de méthode, citées en partie 2. */
export const REGLES_METHODE = [
  {
    titre: 'Croiser au moins deux couches par fait.',
    texte:
      'Une alerte seule dit quoi et quand ; il faut une seconde source pour dire comment et pourquoi ça compte.',
  },
  {
    titre: 'Dater sur la première version.',
    texte:
      'Les listes du CERT-FR affichent la date de dernière mise à jour d’un bulletin, parfois postérieure de plusieurs mois. Je retiens la « date de la première version » indiquée dans chaque bulletin.',
  },
  {
    titre: 'Séparer les faits de mon analyse.',
    texte:
      'Dans la chronologie, chaque source porte l’étiquette de sa couche ; mes commentaires sont signalés par l’étiquette « mon analyse ».',
  },
];
