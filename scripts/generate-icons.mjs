/**
 * Génère les icônes bitmap et l'image Open Graph par défaut à partir de SVG.
 *   npm run icons
 * Produit : public/favicon.ico (32px PNG), public/apple-touch-icon.png (180px),
 *           public/icon-192.png, public/icon-512.png, public/og-default.png (1200×630).
 * Utilise sharp (déjà installé pour l'optimisation des images Astro).
 */
import sharp from 'sharp';
import { writeFile, mkdir } from 'node:fs/promises';

const OUT = 'public';
await mkdir(OUT, { recursive: true });

/* Icône : version « claire » figée (pas de media query dans un PNG) */
const icon = (size) => `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="${size}" height="${size}">
  <rect width="64" height="64" rx="12" fill="#f5f2ec"/>
  <path d="M10 18v-8h8M46 10h8v8M54 46v8h-8M18 54h-8v-8" fill="none" stroke="#2438d9" stroke-width="2.5" stroke-linecap="round"/>
  <text x="32" y="42" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-style="italic" font-size="28" fill="#15171c">HJ</text>
</svg>`;

for (const [name, size] of [
  ['apple-touch-icon.png', 180],
  ['icon-192.png', 192],
  ['icon-512.png', 512],
]) {
  await sharp(Buffer.from(icon(size))).png().toFile(`${OUT}/${name}`);
  console.log('✓', name);
}

/* favicon.ico : un PNG 32px est accepté par tous les navigateurs modernes sous le nom .ico */
await writeFile(`${OUT}/favicon.ico`, await sharp(Buffer.from(icon(32))).png().toBuffer());
console.log('✓ favicon.ico');

/* Image Open Graph */
const og = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <pattern id="g" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M40 0H0V40" fill="none" stroke="#15171c" stroke-opacity="0.07"/>
    </pattern>
  </defs>
  <rect width="1200" height="630" fill="#f5f2ec"/>
  <rect width="1200" height="630" fill="url(#g)"/>
  <path d="M40 80V40h40M1120 40h40v40M1160 550v40h-40M80 590H40v-40" fill="none" stroke="#2438d9" stroke-width="3" stroke-linecap="round"/>
  <text x="80" y="140" font-family="Consolas, 'Courier New', monospace" font-size="22" letter-spacing="3" fill="#6b7080">PORTFOLIO · BTS SIO SISR · 2025 → 2027</text>
  <text x="80" y="300" font-family="Georgia, 'Times New Roman', serif" font-size="120" fill="#15171c" letter-spacing="-4">Hamza Jallabi</text>
  <text x="80" y="380" font-family="Georgia, 'Times New Roman', serif" font-style="italic" font-size="40" fill="#3a3e48">Infrastructures, systèmes et cybersécurité.</text>
  <line x1="80" y1="470" x2="1120" y2="470" stroke="#15171c" stroke-opacity="0.3"/>
  <text x="80" y="520" font-family="Consolas, 'Courier New', monospace" font-size="20" letter-spacing="2" fill="#6b7080">LYCÉE RENÉ CASSIN — STRASBOURG</text>
  <text x="1120" y="520" text-anchor="end" font-family="Consolas, 'Courier New', monospace" font-size="20" letter-spacing="2" fill="#2438d9">RÉF. HJ-2025-001</text>
</svg>`;
await sharp(Buffer.from(og)).png().toFile(`${OUT}/og-default.png`);
console.log('✓ og-default.png');
