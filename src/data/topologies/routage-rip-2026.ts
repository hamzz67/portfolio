import type { ConfigLine, TopoLink, TopoNode, Topology } from './types';

/**
 * TP RIP — relevé dans le rendu TP2-decouverte-RIP.pka (journal du 4 février 2026).
 * Quatre routeurs Cisco 1841 en anneau, reliés par des liaisons série ; chacun
 * dessert un réseau local (un commutateur, un poste).
 */

interface R {
  id: string;
  n: number; // numéro du routeur = octet de ses adresses
  x: number;
  y: number;
  /** Serial0/0/0 (côté DCE, clock rate) et Serial0/0/1 : [réseau, voisin]. */
  s0: [number, string];
  s1: [number, string];
  lan: { sw: [number, number]; pc: [number, number] };
}

const ROUTERS: R[] = [
  { id: 'Router1', n: 1, x: 270, y: 170, s0: [12, 'Router2'], s1: [14, 'Router4'], lan: { sw: [80, 170], pc: [80, 62] } },
  { id: 'Router2', n: 2, x: 490, y: 170, s0: [23, 'Router3'], s1: [12, 'Router1'], lan: { sw: [680, 170], pc: [680, 62] } },
  { id: 'Router3', n: 3, x: 490, y: 380, s0: [34, 'Router4'], s1: [23, 'Router2'], lan: { sw: [680, 380], pc: [680, 488] } },
  { id: 'Router4', n: 4, x: 270, y: 380, s0: [14, 'Router1'], s1: [34, 'Router3'], lan: { sw: [80, 380], pc: [80, 488] } },
];

const ip = (net: number, host: number) => `200.153.${net}.${host}`;
const M = '255.255.255.0';

function config(r: R): ConfigLine[] {
  const nets = [r.n, r.s0[0], r.s1[0]].sort((a, b) => a - b);
  return [
    { cmd: 'enable' },
    { cmd: 'configure terminal' },
    { cmd: 'interface Serial0/0/0', note: `Liaison série vers ${r.s0[1]}` },
    { cmd: ` ip address ${ip(r.s0[0], r.n)} ${M}` },
    { cmd: ' clock rate 64000', note: 'Ce côté est l’équipement DCE : c’est lui qui cadence la liaison série' },
    { cmd: ' no shutdown', note: 'Une interface de routeur est éteinte par défaut' },
    { cmd: 'interface Serial0/0/1', note: `Liaison série vers ${r.s1[1]}` },
    { cmd: ` ip address ${ip(r.s1[0], r.n)} ${M}` },
    { cmd: ' no shutdown' },
    { cmd: 'interface FastEthernet0/0', note: 'Côté réseau local' },
    { cmd: ` ip address ${ip(r.n, r.n)} ${M}`, note: `Passerelle des postes de ${ip(r.n, 0)}/24` },
    { cmd: ' no shutdown' },
    { cmd: 'router rip', note: 'Active le protocole' },
    { cmd: ' version 2', note: 'RIPv2 : annonces avec masque, envoyées en multicast' },
    ...nets.map((x, i): ConfigLine => ({ cmd: ` network ${ip(x, 0)}`, note: i === 0 ? 'Uniquement les réseaux directement connectés : RIP apprend le reste des voisins' : undefined })),
    { cmd: ' no auto-summary', note: 'Pas de résumé automatique à la frontière de classe' },
  ];
}

const nodes: TopoNode[] = [];
const links: TopoLink[] = [];

for (const r of ROUTERS) {
  const sw = `Switch${r.n}`;
  const pc = `PC${r.n}`;
  const cfg = config(r);
  if (r.n === 1) {
    cfg.push(
      { cmd: 'show ip route', note: 'Vérification : les réseaux distants apparaissent avec le code R (appris par RIP)' },
      { cmd: 'debug ip rip', note: 'Observe en direct les annonces envoyées et reçues…' },
      { cmd: 'no debug ip rip', note: '…puis le coupe : le débogage charge le processeur du routeur' },
      { cmd: 'show ip route' },
    );
  }
  nodes.push({
    id: r.id, label: r.id, kind: 'router', x: r.x, y: r.y,
    role: `Routeur du site ${r.n}. Relié à deux voisins par liaison série, il annonce son réseau local et ses deux liaisons par RIP.`,
    facts: [
      ['Modèle', 'Cisco 1841'],
      ['Fa0/0', `${ip(r.n, r.n)}/24`],
      ['Se0/0/0', `${ip(r.s0[0], r.n)}/24 (DCE)`],
      ['Se0/0/1', `${ip(r.s1[0], r.n)}/24`],
    ],
    config: cfg,
    note: r.n === 1 ? 'Les quatre routeurs ont gardé le nom par défaut « Router » : dans le journal, seule la colonne de l’équipement permet de savoir où chaque commande a été tapée.' : undefined,
  });
  nodes.push({
    id: sw, label: sw, kind: 'switch', x: r.lan.sw[0], y: r.lan.sw[1],
    role: `Commutateur du réseau local ${ip(r.n, 0)}/24, sans configuration particulière : il relie le poste à son routeur.`,
    facts: [['Modèle', 'Cisco 2960-24TT'], ['Fa0/1', pc], ['Fa0/24', `${r.id} Fa0/0`]],
  });
  nodes.push({
    id: pc, label: pc, kind: 'pc', x: r.lan.pc[0], y: r.lan.pc[1],
    role: `Poste du site ${r.n}.`,
    facts: [['Adresse', `${ip(r.n, 10)}`], ['Masque', M], ['Passerelle', ip(r.n, r.n)]],
  });
  links.push({ a: sw, b: r.id, kind: 'ethernet', label: `${ip(r.n, 0)}/24`, labelAt: [r.lan.sw[0] < r.x ? (r.lan.sw[0] + 60 + r.x - 22) / 2 : (r.lan.sw[0] - 60 + r.x + 22) / 2, r.y - 4] });
  links.push({ a: pc, b: sw, kind: 'access' });
}

// Anneau série : 1–2 (haut), 2–3 (droite), 3–4 (bas), 4–1 (gauche)
links.push(
  { a: 'Router1', b: 'Router2', kind: 'serial', label: '200.153.12.0/24' },
  { a: 'Router2', b: 'Router3', kind: 'serial', label: '200.153.23.0/24', labelAt: [490, 282] },
  { a: 'Router3', b: 'Router4', kind: 'serial', label: '200.153.34.0/24', labelAt: [380, 400] },
  { a: 'Router4', b: 'Router1', kind: 'serial', label: '200.153.14.0/24', labelAt: [270, 282] },
);

export const routageRip2026: Topology = {
  title: 'Quatre routeurs en anneau, routage dynamique RIPv2',
  source: 'Relevé dans mon rendu Packet Tracer (TP2-decouverte-RIP), journal de commandes du 4 février 2026.',
  width: 760,
  height: 540,
  nodes,
  links,
  intro: 'Cliquez sur un routeur pour voir ses interfaces et la configuration tapée, commentée ligne par ligne. Chaque routeur ne déclare que ses trois réseaux directement connectés ; RIP lui apprend les cinq autres (huit réseaux en tout). L’anneau offre deux chemins vers chaque site : si une liaison tombe, RIP bascule sur l’autre.',
};
