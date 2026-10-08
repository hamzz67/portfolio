import { createHash } from 'node:crypto';
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { AstroIntegration } from 'astro';

/**
 * Remplace `'csp-script-hashes'` dans dist/_headers par l'empreinte SHA-256
 * de chaque script inline réellement présent dans les pages construites.
 *
 * Pourquoi : la CSP n'autorise pas `'unsafe-inline'` pour les scripts — c'est
 * ce qui la rend utile contre une injection XSS. Les quelques scripts inline
 * légitimes (initialisation du thème) sont donc autorisés un par un, par leur
 * empreinte. Recopier l'empreinte à la main casserait le site à la première
 * retouche du script ; la calculer au build garantit qu'elle est toujours juste.
 *
 * Garde-fou : un attribut d'événement (onclick=…) ou un lien javascript: ne
 * peut pas être autorisé par empreinte — le build échoue plutôt que de publier
 * une page qui serait cassée en production.
 */
const MARQUEUR = "'csp-script-hashes'";

async function pagesHtml(dossier: string): Promise<string[]> {
  const entrees = await readdir(dossier, { withFileTypes: true, recursive: true });
  return entrees
    .filter((e) => e.isFile() && e.name.endsWith('.html'))
    .map((e) => join(e.parentPath, e.name));
}

export default function cspHashes(): AstroIntegration {
  return {
    name: 'csp-hashes',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const racine = fileURLToPath(dir);
        const empreintes = new Set<string>();

        for (const fichier of await pagesHtml(racine)) {
          const html = await readFile(fichier, 'utf8');
          for (const [, attributs, code] of html.matchAll(/<script(?![^>]*\bsrc=)([^>]*)>([\s\S]*?)<\/script>/g)) {
            if (/type="application\/(ld\+)?json"/.test(attributs)) continue; // données, jamais exécutées
            empreintes.add(`'sha256-${createHash('sha256').update(code).digest('base64')}'`);
          }
          const interdit = html.match(/\son[a-z]+="|href="javascript:/i);
          if (interdit) {
            throw new Error(`CSP : « ${interdit[0].trim()} » dans ${fichier}. Utiliser un <script> à la place.`);
          }
        }

        const chemin = join(racine, '_headers');
        const headers = await readFile(chemin, 'utf8');
        if (!headers.includes(MARQUEUR)) throw new Error(`CSP : ${MARQUEUR} absent de public/_headers.`);
        await writeFile(chemin, headers.replaceAll(MARQUEUR, [...empreintes].join(' ')));
        logger.info(`${empreintes.size} script(s) inline autorisé(s) par empreinte dans _headers`);
      },
    },
  };
}
