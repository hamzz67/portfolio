/**
 * Génère le CV public en PDF à partir de scripts/cv/cv-public.html.
 *   npm run cv
 * Produit : public/documents/CV-Hamza-Jallabi.pdf (une page A4).
 *
 * Le rendu passe par Edge ou Chrome en mode « headless » (aucune fenêtre ne
 * s'ouvre). Les métadonnées du PDF sont ensuite nettoyées : sans ça, le fichier
 * publié annonce la version exacte du navigateur et du moteur de rendu.
 *
 * ⚠️ Ce CV est PUBLIC : pas de téléphone, pas d'adresse postale, pas de date de
 *    naissance, pas de photo (voir CONTENT-SAFETY.md). La version de
 *    candidature, avec les coordonnées complètes, reste dans private/.
 */
import { execFile } from 'node:child_process';
import { readFile, writeFile, mkdir, access } from 'node:fs/promises';
import { promisify } from 'node:util';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const run = promisify(execFile);

const SOURCE = resolve('scripts/cv/cv-public.html');
const OUT = resolve('public/documents/CV-Hamza-Jallabi.pdf');

/* --- 1. Trouver un navigateur --- */

const CANDIDATS = [
  process.env.CHROME_PATH,
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
].filter(Boolean);

let navigateur;
for (const chemin of CANDIDATS) {
  try {
    await access(chemin);
    navigateur = chemin;
    break;
  } catch {
    /* candidat suivant */
  }
}

if (!navigateur) {
  console.error('✗ Aucun navigateur trouvé (Edge ou Chrome).');
  console.error('  Indiquer le chemin via la variable CHROME_PATH.');
  process.exit(1);
}

/* --- 2. Rendre le PDF --- */

await mkdir('public/documents', { recursive: true });

await run(navigateur, [
  '--headless=new',
  '--disable-gpu',
  '--no-pdf-header-footer',
  '--virtual-time-budget=5000',
  `--print-to-pdf=${OUT}`,
  pathToFileURL(SOURCE).href,
]);

/* --- 3. Nettoyer les métadonnées --- */

/**
 * Réécrit un champ du dictionnaire Info *sur place*, en conservant exactement
 * le même nombre d'octets (complété par des espaces). Changer la longueur
 * décalerait toutes les positions de la table xref et casserait le fichier.
 */
const BACKSLASH = 92;

function finDeChaine(texte, depuis) {
  let i = depuis;
  let profondeur = 1;
  while (i < texte.length) {
    if (texte.charCodeAt(i) === BACKSLASH) { i += 2; continue; }
    if (texte[i] === '(') profondeur++;
    else if (texte[i] === ')' && --profondeur === 0) return i;
    i++;
  }
  return -1;
}

const pdf = await readFile(OUT);
const texte = pdf.toString('latin1');

for (const champ of ['Creator', 'Producer']) {
  const debut = texte.indexOf(`/${champ} (`);
  if (debut < 0) continue;
  const depuis = debut + champ.length + 3;
  const fin = finDeChaine(texte, depuis);
  if (fin < 0) continue;
  const largeur = fin - depuis;
  if (largeur < 'Hamza Jallabi'.length) continue;
  pdf.write('Hamza Jallabi'.padEnd(largeur, ' '), depuis, 'latin1');
}

await writeFile(OUT, pdf);

/* --- 4. Garde-fou : le numéro de téléphone ne doit jamais ressortir --- */

if (/0\s*7\s*8\s*1\s*9\s*4/.test(await readFile(SOURCE, 'utf8'))) {
  console.error('✗ Le fichier source contient un numéro de téléphone. PDF généré mais NE PAS PUBLIER.');
  process.exit(1);
}

console.log(`✓ CV-Hamza-Jallabi.pdf (${Math.round(pdf.length / 1024)} Ko) — rendu avec ${navigateur}`);
