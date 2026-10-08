import type { Topology } from './types';
import { vlanTrunk2026 } from './vlan-trunk-2026';
import { routageRip2026 } from './routage-rip-2026';

/** Schéma interactif affiché en tête d'une fiche, par identifiant de fiche. */
export const TOPOLOGIES: Record<string, Topology> = {
  'vlan-trunk-2026': vlanTrunk2026,
  'routage-statique-rip-2026': routageRip2026,
};
