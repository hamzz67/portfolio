/**
 * Génère le CV public en PDF à partir de scripts/cv/cv-public.html.
 *   npm run cv
 * Produit : public/documents/CV-Hamza-Jallabi.pdf (une page A4).
 *
 * Le rendu passe par Edge ou Chrome en mode « headless » (aucune fenêtre ne
 * s'ouvre), puis les métadonnées du PDF sont nettoyées.
 *
 * ⚠️ Ce CV est PUBLIC : pas de téléphone, pas d'adresse postale, pas de date de
 *    naissance, pas de photo (voir CONTENT-SAFETY.md). La version de
 *    candidature, avec les coordonnées complètes, reste dans private/.
 */
import { execFile } from 'node:child_process';
import { readFile, mkdir, rm, stat } from 'node:fs/promises';
import { promisify } from 'node:util';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { trouverNavigateur, attendreFichierStable, nettoyerMetadonnees, OPTIONS_RENDU } from './lib/pdf.mjs';

const run = promisify(execFile);

const SOURCE = resolve('scripts/cv/cv-public.html');
const OUT = resolve('public/documents/CV-Hamza-Jallabi.pdf');
const TAILLE_MINIMALE = 20 * 1024;

/* --- 1. Garde-fou : le numéro de téléphone ne doit jamais ressortir --- */

const source = await readFile(SOURCE, 'utf8');
if (/0\s*7\s*8\s*1\s*9\s*4/.test(source)) {
  console.error('✗ Le fichier source contient un numéro de téléphone. Rien n’a été généré.');
  process.exit(1);
}

/* --- 2. Rendre le PDF --- */

const navigateur = await trouverNavigateur();
if (!navigateur) {
  console.error('✗ Aucun navigateur trouvé (Edge ou Chrome). Indiquer le chemin via CHROME_PATH.');
  process.exit(1);
}

await mkdir('public/documents', { recursive: true });

/* Le navigateur sort parfois sans rien écrire, en général au premier
   lancement : on réessaie en vérifiant que le fichier est bien exploitable. */
const ESSAIS = 6;
let rendu = false;

for (let essai = 1; essai <= ESSAIS && !rendu; essai++) {
  await rm(OUT, { force: true });

  try {
    await run(navigateur, [...OPTIONS_RENDU, `--print-to-pdf=${OUT}`, pathToFileURL(SOURCE).href], {
      timeout: 90_000,
    });
  } catch (e) {
    console.error(`  essai ${essai} : le navigateur a échoué (${e.message.split('\n')[0].slice(0, 70)})`);
  }

  const taille = await attendreFichierStable(OUT);
  if (taille >= TAILLE_MINIMALE) {
    rendu = true;
  } else {
    console.error(`  essai ${essai} : ${taille > 0 ? `PDF de ${taille} octets seulement` : 'aucun PDF'} — nouvelle tentative…`);
    await new Promise((ok) => setTimeout(ok, 1500));
  }
}

if (!rendu) {
  console.error(`✗ Aucun PDF exploitable après ${ESSAIS} essais. Relancer \`npm run cv\`.`);
  process.exit(1);
}

/* --- 3. Nettoyer les métadonnées et vérifier --- */

const { taille, pages } = await nettoyerMetadonnees(OUT);

/* Dernier contrôle : le numéro ne doit pas être dans le PDF produit. */
const octets = (await readFile(OUT)).toString('latin1');
if (/0781948506|07 81 94/.test(octets)) {
  console.error('✗ Le PDF produit contient un numéro de téléphone. NE PAS PUBLIER.');
  process.exit(1);
}

if (pages !== 1) {
  console.error(`⚠ Le CV fait ${pages} pages. Un CV d’étudiant tient sur une page : ajuster cv-public.html.`);
}

console.log(`✓ CV-Hamza-Jallabi.pdf (${Math.round(taille / 1024)} Ko, ${pages} page${pages > 1 ? 's' : ''})`);
