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
   * - Fraunces : titrage éditorial (serif variable, axe optique)
   * - Instrument Sans : texte courant et interface
   * - JetBrains Mono : étiquettes, références, métadonnées techniques
   */
  fonts: [
    {
      provider: fontProviders.local(),
      name: 'Fraunces',
      cssVariable: '--font-display',
      fallbacks: ['Georgia', 'Times New Roman', 'serif'],
      options: {
        variants: [
          {
            src: ['@fontsource-variable/fraunces/files/fraunces-latin-opsz-normal.woff2'],
            weight: '100 900',
            style: 'normal',
          },
          {
            src: ['@fontsource-variable/fraunces/files/fraunces-latin-opsz-italic.woff2'],
            weight: '100 900',
            style: 'italic',
          },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: 'Instrument Sans',
      cssVariable: '--font-sans',
      fallbacks: ['Helvetica Neue', 'Arial', 'sans-serif'],
      options: {
        variants: [
          {
            src: ['@fontsource-variable/instrument-sans/files/instrument-sans-latin-wght-normal.woff2'],
            weight: '400 700',
            style: 'normal',
          },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: 'JetBrains Mono',
      cssVariable: '--font-mono',
      fallbacks: ['SFMono-Regular', 'Menlo', 'Consolas', 'monospace'],
      options: {
        variants: [
          {
            src: ['@fontsource-variable/jetbrains-mono/files/jetbrains-mono-latin-wght-normal.woff2'],
            weight: '100 800',
            style: 'normal',
          },
        ],
      },
    },
  ],
});
