// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';

/**
 * URL publique du site. Elle sert aux URL canoniques, aux balises Open Graph,
 * au sitemap et au flux RSS.
 *
 * Fournie par la variable d'environnement SITE_URL (Cloudflare Pages), avec
 * repli sur l'adresse réelle du site. Si un nom de domaine est acheté plus
 * tard, changer DEFAUT ici *et* la variable dans Cloudflare.
 *
 * ⚠️ GARDE-FOU. Le 7 octobre 2026, SITE_URL valait `https://portfolio.pages.dev`
 *    — le portfolio de quelqu'un d'autre. Chaque page du site a donc déclaré
 *    pendant des semaines le domaine d'un tiers comme URL canonique, ce qui
 *    revient à dire aux moteurs de recherche « la vraie version de cette page
 *    est ailleurs ». Une valeur manifestement fausse est désormais ignorée au
 *    profit du repli, avec un avertissement visible dans le journal de build :
 *    mieux vaut un site correct et un avertissement qu'un déploiement bloqué.
 */
const DEFAUT = 'https://hamzzportfolio.pages.dev';
const SITE_URL = process.env.SITE_URL?.trim().replace(/\/$/, '') || DEFAUT;

const hote = (() => {
  try {
    return new URL(SITE_URL).host;
  } catch {
    throw new Error(`SITE_URL n'est pas une URL valide : « ${SITE_URL} ». Attendu : ${DEFAUT}`);
  }
})();

/*
 * Un sous-domaine pages.dev qui n'est pas le nôtre appartient à quelqu'un
 * d'autre ; example.com et localhost ne sont pas publiables. Dans ces cas on
 * ignore la variable plutôt que de publier des URL canoniques fausses.
 */
const suspect =
  (hote.endsWith('.pages.dev') && hote !== new URL(DEFAUT).host) ||
  hote === 'example.com' ||
  hote.startsWith('localhost');

const SITE = suspect ? DEFAUT : SITE_URL;

if (suspect) {
  console.warn(
    `
⚠  SITE_URL vaut « ${SITE_URL} », qui n'est pas ce site : valeur ignorée, ${DEFAUT} utilisé.
` +
      `   Corriger la variable dans Cloudflare Pages → Settings → Variables and Secrets.
`,
  );
}

export default defineConfig({
  site: SITE,
  output: 'static',
  trailingSlash: 'never',
  build: {
    format: 'file', // /travaux.html plutôt que /travaux/index.html → URL propres sur Cloudflare Pages et GitHub Pages
  },
  redirects: {
    '/stage': '/travaux/stage-synerdys-2026',
    '/travaux/stage-enerdys-2026': '/travaux/stage-synerdys-2026', // ancien nom de l'entreprise
  },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },
  image: {
    layout: 'constrained',
    responsiveStyles: true,
  },
  integrations: [sitemap()],

  /**
   * Polices auto-hébergées (fichiers lus dans node_modules, aucun appel externe au runtime).
   * - Archivo : texte et titres. Fichier « standard » = deux axes variables
   *   (graisse 100→900, chasse 62→125 %) : les titres utilisent la chasse élargie.
   * - Martian Mono : dates, références, métadonnées (usage limité)
   */
  fonts: [
    {
      provider: fontProviders.local(),
      name: 'Archivo',
      cssVariable: '--font-sans',
      fallbacks: ['Segoe UI', 'Helvetica Neue', 'Arial', 'sans-serif'],
      options: {
        variants: [
          {
            src: ['@fontsource-variable/archivo/files/archivo-latin-standard-normal.woff2'],
            weight: '100 900',
            stretch: '62% 125%',
            style: 'normal',
          },
          {
            src: ['@fontsource-variable/archivo/files/archivo-latin-standard-italic.woff2'],
            weight: '100 900',
            stretch: '62% 125%',
            style: 'italic',
          },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: 'Martian Mono',
      cssVariable: '--font-mono',
      fallbacks: ['Consolas', 'Menlo', 'monospace'],
      options: {
        variants: [
          {
            src: ['@fontsource-variable/martian-mono/files/martian-mono-latin-wght-normal.woff2'],
            weight: '100 800',
            style: 'normal',
          },
        ],
      },
    },
  ],
});
