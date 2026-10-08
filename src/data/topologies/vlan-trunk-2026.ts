import type { ConfigLine, TopoLink, TopoNode, Topology } from './types';

/**
 * TP VLAN — relevé dans le rendu B2-TP4B-VLAN.pka (journal du 18 mars 2026).
 * Quatre commutateurs 2960 configurés à l'identique : un par étage, et un
 * commutateur central qui porte les trois serveurs.
 */

/** Configuration tapée sur chacun des quatre commutateurs (journal Packet Tracer). */
const SWITCH_CONFIG: ConfigLine[] = [
  { cmd: 'enable', note: 'Mode privilégié' },
  { cmd: 'configure terminal', note: 'Mode de configuration globale' },
  { cmd: 'vlan 110', note: 'Crée le VLAN du service administratif…' },
  { cmd: ' name ADMINISTRATIF', note: '…et le nomme : lisible dans show vlan' },
  { cmd: 'vlan 120' },
  { cmd: ' name DEVELOPPEMENT' },
  { cmd: 'vlan 130' },
  { cmd: ' name COMMERCIAL' },
  { cmd: 'interface range FastEthernet0/1 - 6', note: 'Six ports d’un coup' },
  { cmd: ' switchport mode access', note: 'Port d’accès : un seul VLAN, pour un poste' },
  { cmd: ' switchport access vlan 110', note: 'Ports 1 à 6 → administratif' },
  { cmd: 'interface range FastEthernet0/7 - 12' },
  { cmd: ' switchport mode access' },
  { cmd: ' switchport access vlan 120', note: 'Ports 7 à 12 → développement' },
  { cmd: 'interface range FastEthernet0/13 - 18' },
  { cmd: ' switchport mode access' },
  { cmd: ' switchport access vlan 130', note: 'Ports 13 à 18 → commercial' },
  { cmd: 'interface range FastEthernet0/21 - 24', note: 'Ports d’interconnexion' },
  { cmd: ' switchport mode trunk', note: 'Transporte tous les VLAN, chaque trame étiquetée 802.1Q' },
];

const VLAN = { '110': 'ADMINISTRATIF', '120': 'DEVELOPPEMENT', '130': 'COMMERCIAL' } as const;
type Vlan = keyof typeof VLAN;

const SW_X = 520; // bord gauche des commutateurs
const SW_W = 120;
const FLOORS = [
  { sw: 'Switch3', label: 'Étage 3', y0: 20 },
  { sw: 'Switch2', label: 'Étage 2', y0: 145 },
  { sw: 'Switch1', label: 'Étage 1', y0: 270 },
];
const CORE_Y0 = 395;

/** Postes par étage, dans l'ordre des ports : [nom, VLAN, dernier octet, port]. */
const HOSTS: Record<string, [string, Vlan, number, string][]> = {
  Switch3: [['ADM31', '110', 31, 'Fa0/1'], ['DEV31', '120', 31, 'Fa0/7'], ['COM31', '130', 31, 'Fa0/13'], ['COM32', '130', 32, 'Fa0/14']],
  Switch2: [['ADM21', '110', 21, 'Fa0/1'], ['DEV21', '120', 21, 'Fa0/7'], ['DEV22', '120', 22, 'Fa0/8'], ['COM21', '130', 21, 'Fa0/13']],
  Switch1: [['ADM11', '110', 11, 'Fa0/1'], ['ADM12', '110', 12, 'Fa0/2'], ['DEV11', '120', 11, 'Fa0/7'], ['COM11', '130', 11, 'Fa0/13']],
};
const SERVERS: [string, Vlan, string][] = [['Serveur ADMIN', '110', 'Fa0/1'], ['Serveur DEV', '120', 'Fa0/7'], ['Serveur COM', '130', 'Fa0/13']];

const net = (v: Vlan) => `192.168.${v}.0/24`;
const nodes: TopoNode[] = [];
const links: TopoLink[] = [];

/** Accès : du poste vers le flanc gauche du commutateur, sur une voie propre. */
function access(id: string, x: number, y: number, sw: string, swY: number, lane: number, vlan: Vlan) {
  const ly = swY - 15 + lane * 10;
  links.push({ a: id, b: sw, kind: 'access', group: vlan, via: [[x, ly]], });
  return ly;
}

for (const f of FLOORS) {
  const swY = f.y0 + 78;
  HOSTS[f.sw].forEach(([name, vlan, octet, port], i) => {
    const x = 70 + i * 112;
    const y = f.y0 + 34;
    nodes.push({
      id: name, label: name, kind: 'pc', x, y, group: vlan,
      role: `Poste du service ${VLAN[vlan].toLowerCase()}, ${f.label.toLowerCase()}.`,
      facts: [['Adresse', `192.168.${vlan}.${octet}`], ['Masque', '255.255.255.0'], ['VLAN', `${vlan} — ${VLAN[vlan]}`], ['Branché sur', `${f.sw} ${port}`]],
    });
    access(name, x, y, f.sw, swY, i, vlan);
  });
}

SERVERS.forEach(([name, vlan, port], i) => {
  const x = 70 + i * 150;
  const y = CORE_Y0 + 44;
  nodes.push({
    id: name, label: name, kind: 'server', x, y, group: vlan,
    role: `Serveur du service ${VLAN[vlan].toLowerCase()}, dans le local technique.`,
    facts: [['Adresse', `192.168.${vlan}.200`], ['Masque', '255.255.255.0'], ['VLAN', `${vlan} — ${VLAN[vlan]}`], ['Branché sur', `Switch0 ${port}`]],
  });
  access(name, x, y, 'Switch0', CORE_Y0 + 92, i, vlan);
});

const swFacts = (ports: string): [string, string][] => [['Modèle', 'Cisco 2960-24TT'], ['Ports 1–6', 'accès, VLAN 110'], ['Ports 7–12', 'accès, VLAN 120'], ['Ports 13–18', 'accès, VLAN 130'], ['Ports 21–24', `trunk 802.1Q (${ports})`]];

FLOORS.forEach((f, k) => {
  const swY = f.y0 + 78;
  nodes.push({
    id: f.sw, label: f.sw, kind: 'switch', x: SW_X + SW_W / 2, y: swY,
    role: `Commutateur d’accès de l’${f.label.toLowerCase()}. Ses postes appartiennent au service de la plage de ports où ils sont brassés.`,
    facts: swFacts('Fa0/21 vers Switch0'),
    config: SWITCH_CONFIG,
  });
  // Trunk : sort à droite, descend dans la gaine technique, entre dans Switch0 par la droite.
  const gx = SW_X + SW_W + 28 + (2 - k) * 20;
  const coreEntry = CORE_Y0 + 92 - 12 + k * 12;
  links.push({ a: f.sw, b: 'Switch0', kind: 'trunk', via: [[gx, swY], [gx, coreEntry]] });
});

nodes.push({
  id: 'Switch0', label: 'Switch0', kind: 'switch', x: SW_X + SW_W / 2, y: CORE_Y0 + 92,
  role: 'Commutateur central du local technique : il relie les trois étages et porte les trois serveurs.',
  facts: swFacts('Fa0/21, 0/22, 0/23 vers les étages'),
  config: SWITCH_CONFIG,
  note: 'Les quatre commutateurs ont gardé le nom par défaut « Switch » (hostname jamais changé) : dans un vrai réseau, c’est la première chose à corriger, sinon les journaux et les invites ne disent pas sur quel équipement on se trouve.',
});

export const vlanTrunk2026: Topology = {
  title: 'Trois services, quatre commutateurs, un seul câblage',
  source: 'Relevé dans mon rendu Packet Tracer (B2-TP4B-VLAN), journal de commandes du 18 mars 2026.',
  width: 760,
  height: 560,
  zones: [
    ...FLOORS.map((f) => ({ label: f.label, x: 8, y: f.y0 - 12, w: 744, h: 115 })),
    { label: 'Local technique', x: 8, y: CORE_Y0 - 12, w: 744, h: 150 },
  ],
  groupLabel: 'VLAN',
  groups: [
    { id: '110', label: '110 · Administratif', tone: 1, detail: net('110') },
    { id: '120', label: '120 · Développement', tone: 2, detail: net('120') },
    { id: '130', label: '130 · Commercial', tone: 3, detail: net('130') },
  ],
  nodes,
  links,
  intro: 'Cliquez sur un équipement pour voir son rôle, son adressage et la configuration tapée. Les boutons VLAN isolent un service : son trafic ne quitte jamais ses propres ports et les liens trunk.',
};
