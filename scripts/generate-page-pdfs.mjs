/**
 * Génère les PDF à partir des pages du site déjà construites.
 *   npm run pdf
 * Produit : public/documents/Veille-Hamza-Jallabi.pdf
 *           public/documents/Competences-E5-Hamza-Jallabi.pdf
 *
 * Les PDF sont tirés des pages du site, pas de documents séparés : ils ne
 * peuvent donc pas diverger du contenu en ligne. Les styles @media print de
 * global.css retirent l'habillage et déplient les accordéons.
 *
 * Le site construit référence ses feuilles de style en chemin absolu
 * (/_astro/…), qui ne résout pas en file:// — on sert donc dist/ sur un port
 * local le temps du rendu.
 *
 * ⚠️ `npm run pdf` écrit dans public/, qui est ensuite recopié dans dist/ au
 *    build suivant. Les PDF publiés sont donc toujours ceux de l'avant-dernier
 *    build : `npm run build` est relancé à la fin pour les embarquer.
 */
import { createServer } from 'node:http';
import { execFile } from 'node:child_process';
import { access, mkdir, rm, stat } from 'node:fs/promises';
import { createReadStream } from 'node:fs';
import { promisify } from 'node:util';
import { resolve, extname, join, normalize } from 'node:path';
import { trouverNavigateur, attendreFichierStable, nettoyerMetadonnees, OPTIONS_RENDU } from './lib/pdf.mjs';

const run = promisify(execFile);
const DIST = resolve('dist');

/** Les pages à exporter. `minKo` garde un rendu vide de passer pour un succès. */
const PAGES = [
  { route: '/veille', fichier: 'Veille-Hamza-Jallabi.pdf', minKo: 50 },
  { route: '/e5', fichier: 'Competences-E5-Hamza-Jallabi.pdf', minKo: 15 },
];

/* --- 1. Vérifier que le site est construit --- */

for (const { route } of PAGES) {
  try {
    await access(join(DIST, `${route.slice(1)}.html`));
  } catch {
    console.error(`✗ dist${route}.html est absent. Lancer \`npm run build\` d’abord.`);
    process.exit(1);
  }
}

/* --- 2. Servir dist/ localement --- */

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.woff2': 'font/woff2',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
};

let servies = 0;

const serveur = createServer(async (req, res) => {
  // normalize() neutralise les « ../ » : on ne sert que ce qui est sous dist/.
  const chemin = join(DIST, normalize(decodeURI(req.url.split('?')[0])).replace(/^(\.\.[/\\])+/, ''));
  for (const candidat of [chemin, `${chemin}.html`, join(chemin, 'index.html')]) {
    try {
      if ((await stat(candidat)).isFile()) {
        servies++;
        res.writeHead(200, { 'content-type': TYPES[extname(candidat)] ?? 'application/octet-stream' });
        createReadStream(candidat).pipe(res);
        return;
      }
    } catch {
      /* candidat suivant */
    }
  }
  res.writeHead(404).end();
});

await new Promise((ok) => serveur.listen(0, '127.0.0.1', ok));
const port = serveur.address().port;

/* --- 3. Rendre chaque page --- */

const navigateur = await trouverNavigateur();
if (!navigateur) {
  serveur.close();
  console.error('✗ Aucun navigateur trouvé (Edge ou Chrome). Indiquer le chemin via CHROME_PATH.');
  process.exit(1);
}

await mkdir('public/documents', { recursive: true });

const ESSAIS = 6;
let echec = false;

for (const { route, fichier, minKo } of PAGES) {
  const sortie = resolve('public/documents', fichier);
  let rendu = false;

  /* Le navigateur sort parfois sans rien charger, en général au premier
     lancement : on réessaie en vérifiant que des fichiers ont bien été servis
     ET que le PDF a une taille plausible. */
  for (let essai = 1; essai <= ESSAIS && !rendu; essai++) {
    servies = 0;
    await rm(sortie, { force: true });

    try {
      await run(navigateur, [...OPTIONS_RENDU, `--print-to-pdf=${sortie}`, `http://127.0.0.1:${port}${route}`], {
        timeout: 90_000,
      });
    } catch (e) {
      console.error(`  ${route} essai ${essai} : le navigateur a échoué (${e.message.split('\n')[0].slice(0, 60)})`);
    }

    const taille = await attendreFichierStable(sortie);
    if (taille >= minKo * 1024 && servies > 0) {
      rendu = true;
    } else {
      const cause = taille > 0 ? `PDF de ${Math.round(taille / 1024)} Ko seulement` : 'aucun PDF';
      console.error(`  ${route} essai ${essai} : ${cause}, ${servies} fichier(s) chargé(s) — nouvelle tentative…`);
      await new Promise((ok) => setTimeout(ok, 1500));
    }
  }

  if (!rendu) {
    console.error(`✗ ${fichier} : aucun PDF exploitable après ${ESSAIS} essais.`);
    echec = true;
    continue;
  }

  const { taille, pages } = await nettoyerMetadonnees(sortie);
  console.log(`✓ ${fichier} (${Math.round(taille / 1024)} Ko, ${pages} page${pages > 1 ? 's' : ''})`);
}

serveur.close();

if (echec) process.exit(1);

console.log('  Relancer `npm run build` pour embarquer les PDF dans dist/.');
