/**
 * Génère le PDF de la veille à partir de la page /veille/ déjà construite.
 *   npm run veille
 * Produit : public/documents/Veille-Hamza-Jallabi.pdf
 *
 * Le PDF est tiré de la page du site, pas d'un document séparé : il ne peut
 * donc pas diverger du contenu en ligne. Les styles @media print de
 * global.css retirent l'habillage et déplient les accordéons.
 *
 * Le fichier construit référence ses feuilles de style en chemin absolu
 * (/_astro/…), qui ne résout pas en file:// — on sert donc dist/ sur un port
 * local le temps du rendu.
 */
import { createServer } from 'node:http';
import { execFile } from 'node:child_process';
import { access, mkdir, rm, stat } from 'node:fs/promises';
import { createReadStream } from 'node:fs';
import { promisify } from 'node:util';
import { resolve, extname, join, normalize } from 'node:path';
import { trouverNavigateur, attendreFichierStable, nettoyerMetadonnees, OPTIONS_RENDU } from './lib/pdf.mjs';

const run = promisify(execFile);

const OUT = resolve('public/documents/Veille-Hamza-Jallabi.pdf');
const DIST = resolve('dist');
/* Un PDF plus petit que ça n'a pas chargé la page : il ne doit pas passer
   pour un succès, sinon on publie une page blanche. */
const TAILLE_MINIMALE = 50 * 1024;

/* --- 1. Vérifier que le site est construit --- */

try {
  await access(join(DIST, 'veille.html'));
} catch {
  console.error('✗ dist/veille.html est absent. Lancer `npm run build` d’abord.');
  process.exit(1);
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

/* --- 3. Rendre la page en PDF --- */

const navigateur = await trouverNavigateur();
if (!navigateur) {
  serveur.close();
  console.error('✗ Aucun navigateur trouvé (Edge ou Chrome). Indiquer le chemin via CHROME_PATH.');
  process.exit(1);
}

await mkdir('public/documents', { recursive: true });

/* Le navigateur sort parfois sans rien charger, en général au premier
   lancement : on réessaie en vérifiant à chaque tour que des fichiers ont bien
   été servis ET que le PDF a une taille plausible. */
const ESSAIS = 6;
let rendu = false;

for (let essai = 1; essai <= ESSAIS && !rendu; essai++) {
  servies = 0;
  await rm(OUT, { force: true });

  try {
    await run(navigateur, [...OPTIONS_RENDU, `--print-to-pdf=${OUT}`, `http://127.0.0.1:${port}/veille`], {
      timeout: 90_000,
    });
  } catch (e) {
    console.error(`  essai ${essai} : le navigateur a échoué (${e.message.split('\n')[0].slice(0, 70)})`);
  }

  const taille = await attendreFichierStable(OUT);
  if (taille >= TAILLE_MINIMALE && servies > 0) {
    rendu = true;
  } else {
    const cause = taille > 0 ? `PDF de ${Math.round(taille / 1024)} Ko seulement` : 'aucun PDF';
    console.error(`  essai ${essai} : ${cause}, ${servies} fichier(s) chargé(s) — nouvelle tentative…`);
    await new Promise((ok) => setTimeout(ok, 1500));
  }
}

serveur.close();

if (!rendu) {
  console.error(`✗ Aucun PDF exploitable après ${ESSAIS} essais. Relancer \`npm run veille\`.`);
  process.exit(1);
}

/* --- 4. Nettoyer les métadonnées --- */

const { taille, pages } = await nettoyerMetadonnees(OUT);

console.log(`✓ Veille-Hamza-Jallabi.pdf (${Math.round(taille / 1024)} Ko, ${pages} pages)`);
