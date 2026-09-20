// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';

/**
 * URL publique du site.
 *
 * TODO : remplacer par votre domaine une fois acheté (ex. 'https://hamzajallabi.fr').
 * Elle sert au sitemap, aux balises Open Graph et aux URL canoniques.
 * Peut aussi être fournie par la variable d'environnement SITE_URL (voir DEPLOYMENT.md).
 */
const SITE_URL = process.env.SITE_URL ?? 'https://example.com';

export default defineConfig({
  site: SITE_URL,
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
