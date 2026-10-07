/**
 * Utilitaires partagés par generate-cv.mjs et generate-veille-pdf.mjs.
 */
import { readFile, writeFile, stat, access } from 'node:fs/promises';

/**
 * Attend que le fichier cesse de grossir.
 *
 * `--print-to-pdf` rend la main avant que le navigateur ait fini d'écrire :
 * sans cette attente, le nettoyage des métadonnées est parfois appliqué à une
 * version intermédiaire, puis écrasé par la version finale. Le symptôme est
 * sournois — un PDF publié sur deux garde la signature du navigateur.
 */
export async function attendreFichierStable(chemin, { pas = 250, stables = 3, maxMs = 20_000 } = {}) {
  const limite = Date.now() + maxMs;
  let precedente = -1;
  let identiques = 0;

  while (Date.now() < limite) {
    let taille = -1;
    try {
      taille = (await stat(chemin)).size;
    } catch {
      /* pas encore écrit */
    }

    identiques = taille >= 0 && taille === precedente ? identiques + 1 : 0;
    if (identiques >= stables) return taille;

    precedente = taille;
    await new Promise((ok) => setTimeout(ok, pas));
  }

  return precedente;
}

const BACKSLASH = 92;

/** Fin d'une chaîne littérale PDF commencée à `depuis` (gère les parenthèses échappées). */
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

/**
 * Remplace les champs Creator et Producer du dictionnaire Info.
 *
 * Laissés tels quels, ils annoncent la version exacte du navigateur et de son
 * moteur de rendu sur un document publié. La réécriture se fait *sur place*, à
 * nombre d'octets constant (complété par des espaces) : changer la longueur
 * décalerait toutes les positions de la table xref et casserait le fichier.
 *
 * Renvoie la liste des champs effectivement réécrits.
 */
export async function nettoyerMetadonnees(chemin, valeur = 'Hamza Jallabi') {
  const pdf = await readFile(chemin);
  const texte = pdf.toString('latin1');
  const faits = [];

  for (const champ of ['Creator', 'Producer']) {
    const debut = texte.indexOf(`/${champ} (`);
    if (debut < 0) continue;
    const depuis = debut + champ.length + 3;
    const fin = finDeChaine(texte, depuis);
    if (fin < 0) continue;
    const largeur = fin - depuis;
    if (largeur < valeur.length) continue;
    pdf.write(valeur.padEnd(largeur, ' '), depuis, 'latin1');
    faits.push(champ);
  }

  await writeFile(chemin, pdf);
  return { champs: faits, taille: pdf.length, pages: compterPages(pdf) };
}

/** Nombre de pages, lu dans la structure du document. */
export function compterPages(pdf) {
  return (pdf.toString('latin1').match(/\/Type\s*\/Page[^s]/g) ?? []).length;
}

/** Premier navigateur Chromium trouvé, ou null. */
export async function trouverNavigateur() {
  const candidats = [
    process.env.CHROME_PATH,
    'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
    'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium',
  ].filter(Boolean);

  for (const chemin of candidats) {
    try {
      await access(chemin);
      return chemin;
    } catch {
      /* candidat suivant */
    }
  }
  return null;
}

/**
 * Options communes du rendu PDF.
 * Ne JAMAIS ajouter --user-data-dir : avec un profil dédié, le navigateur sort
 * sans produire de fichier (constaté sur cette machine).
 */
export const OPTIONS_RENDU = [
  '--headless=new',
  '--disable-gpu',
  '--no-pdf-header-footer',
  '--virtual-time-budget=10000',
];
