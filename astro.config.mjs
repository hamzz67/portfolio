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
    '/stage': '/travaux/stage-enerdys-2026',
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
   * - IBM Plex Sans : texte et titres (une seule famille, poids 400 à 600)
   * - IBM Plex Mono : dates, références, métadonnées (usage limité)
   */
  fonts: [
    {
      provider: fontProviders.local(),
      name: 'IBM Plex Sans',
      cssVariable: '--font-sans',
      fallbacks: ['Segoe UI', 'Helvetica Neue', 'Arial', 'sans-serif'],
      options: {
        variants: [
          {
            src: ['@fontsource-variable/ibm-plex-sans/files/ibm-plex-sans-latin-wght-normal.woff2'],
            weight: '100 700',
            style: 'normal',
          },
          {
            src: ['@fontsource-variable/ibm-plex-sans/files/ibm-plex-sans-latin-wght-italic.woff2'],
            weight: '100 700',
            style: 'italic',
          },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: 'IBM Plex Mono',
      cssVariable: '--font-mono',
      fallbacks: ['Consolas', 'Menlo', 'monospace'],
      options: {
        variants: [
          { src: ['@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-400-normal.woff2'], weight: 400, style: 'normal' },
          { src: ['@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-500-normal.woff2'], weight: 500, style: 'normal' },
        ],
      },
    },
  ],
});
