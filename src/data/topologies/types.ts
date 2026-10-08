/**
 * Schéma réseau interactif d'une fiche (composant NetworkDiagram).
 *
 * Règle : tout ce qui figure ici vient du fichier Packet Tracer rendu —
 * équipements, ports, adresses, et les commandes du journal de Packet Tracer
 * (horodatées). On ne dessine pas un réseau « idéal », on dessine celui qui a
 * été configuré. Les coordonnées, elles, sont refaites pour la lisibilité.
 */
export type NodeKind = 'switch' | 'router' | 'pc' | 'server';

/** Une ligne de configuration, avec son explication. */
export interface ConfigLine {
  cmd: string;
  note?: string;
}

export interface TopoNode {
  id: string;
  label: string;
  kind: NodeKind;
  /** Centre de l'icône, dans le repère du viewBox. */
  x: number;
  y: number;
  /** Groupe (VLAN, réseau) : couleur et filtre. */
  group?: string;
  /** Rôle en une phrase. */
  role: string;
  /** Lignes « clé : valeur » du panneau (adresse, masque, port…). */
  facts?: [string, string][];
  /** Configuration tapée, telle que relevée dans le journal. */
  config?: ConfigLine[];
  /** Remarque d'analyse, affichée sous la configuration. */
  note?: string;
}

export interface TopoLink {
  a: string;
  b: string;
  kind: 'access' | 'trunk' | 'serial' | 'ethernet';
  group?: string;
  /** Tracé : points intermédiaires, du côté a vers le côté b. */
  via?: [number, number][];
  /** Petite étiquette au milieu du lien (ex. réseau d'interconnexion). */
  label?: string;
  /** Position de l'étiquette (sinon : milieu du segment le plus long). */
  labelAt?: [number, number];
}

export interface TopoGroup {
  id: string;
  label: string;
  /** Couleur : un des quatre tons du site. */
  tone: 1 | 2 | 3 | 4;
  detail?: string;
}

export interface Topology {
  title: string;
  /** Source, affichée sous le schéma. */
  source: string;
  width: number;
  height: number;
  /** Zones de fond (étages, locaux…). */
  zones?: { label: string; x: number; y: number; w: number; h: number }[];
  groups?: TopoGroup[];
  /** Libellé des boutons de filtre (« VLAN », « Réseau »…). */
  groupLabel?: string;
  nodes: TopoNode[];
  links: TopoLink[];
  /** Texte du panneau avant toute sélection. */
  intro: string;
}
