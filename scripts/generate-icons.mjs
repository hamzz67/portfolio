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

const icon = (size) => `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="${size}" height="${size}">
  <rect width="64" height="64" rx="10" fill="#12694f"/>
  <text x="32" y="43" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-weight="600" font-size="30" letter-spacing="-1" fill="#ffffff">HJ</text>
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

/* Image Open Graph : sobre, texte seul */
const og = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#fbfaf8"/>
  <rect x="80" y="80" width="14" height="14" rx="3" fill="#12694f"/>
  <text x="110" y="93" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="#79776f">Portfolio · BTS SIO SISR · 2025 – 2027</text>
  <text x="80" y="290" font-family="Segoe UI, Arial, sans-serif" font-weight="600" font-size="84" letter-spacing="-2" fill="#1b1b19">Hamza Jallabi</text>
  <text x="80" y="360" font-family="Segoe UI, Arial, sans-serif" font-size="34" fill="#4b4a46">Infrastructures, systèmes et cybersécurité.</text>
  <line x1="80" y1="500" x2="1120" y2="500" stroke="#e2dfd7"/>
  <text x="80" y="545" font-family="Segoe UI, Arial, sans-serif" font-size="22" fill="#79776f">Lycée René Cassin — Strasbourg</text>
</svg>`;
await sharp(Buffer.from(og)).png().toFile(`${OUT}/og-default.png`);
console.log('✓ og-default.png');
