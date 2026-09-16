/**
 * PARCOURS — timeline affichée sur l'accueil et la page /parcours.
 *
 * Pour ajouter une étape : ajouter un objet dans le tableau (l'ordre du tableau = ordre d'affichage).
 * `status` pilote le style : 'done' (passé), 'current' (en cours), 'planned' (prévu).
 */

export type TimelineStatus = 'done' | 'current' | 'planned';

export interface TimelineItem {
  /** Texte de la date tel qu'affiché (ex. "2025", "Juin 2026"). */
  date: string;
  /** Année ou mois ISO (AAAA ou AAAA-MM) — sert au tri et au statut automatique. */
  iso: string;
  title: string;
  description?: string;
  /** Lieu ou organisation (optionnel). */
  place?: string;
  status?: TimelineStatus;
  /** Lien vers une page du site (ex. "/travaux/stage-enerdys-2026"). */
  href?: string;
  /** Étape clé (mise en avant). */
  highlight?: boolean;
}

export const timeline: TimelineItem[] = [
  {
    date: '2025',
    iso: '2025-09',
    title: 'Début du BTS SIO SISR',
    place: 'Lycée René Cassin, Strasbourg',
    description: 'Entrée en première année. Découverte des fondamentaux : réseaux, systèmes, développement.',
  },
  {
    date: '2026',
    iso: '2026-01',
    title: 'Première année + stage',
    description: 'Travaux pratiques réseau et systèmes, préparation du stage de première année.',
  },
  {
    date: 'Juin 2026',
    iso: '2026-06',
    title: 'Stage chez Enerdys',
    place: 'Entzheim',
    description: 'Stage de première année : développement d’un SaaS / outil web.',
    href: '/travaux/stage-enerdys-2026',
    highlight: true,
  },
  {
    date: '2026 – 2027',
    iso: '2026-09',
    title: 'Deuxième année du BTS SIO SISR',
    description: 'Approfondissement : administration, cybersécurité des services, projets.',
  },
  {
    date: 'Juillet 2027',
    iso: '2027-07',
    title: 'Fin prévue du BTS',
    description: 'Obtention du diplôme visée, puis poursuite vers l’ingénierie en cybersécurité.',
  },
];

/**
 * Calcule le statut d'une étape par rapport à la date du build
 * si `status` n'est pas défini manuellement.
 */
export function resolveStatus(item: TimelineItem, now = new Date()): TimelineStatus {
  if (item.status) return item.status;
  const [y, m = '01'] = item.iso.split('-');
  const start = new Date(Number(y), Number(m) - 1, 1);
  if (start > now) return 'planned';
  // Une étape est "en cours" si elle a commencé il y a moins de 12 mois et qu'aucune étape suivante n'a commencé.
  const next = timeline[timeline.indexOf(item) + 1];
  if (next) {
    const [ny, nm = '01'] = next.iso.split('-');
    const nextStart = new Date(Number(ny), Number(nm) - 1, 1);
    if (nextStart > now) return 'current';
    return 'done';
  }
  return 'current';
}
