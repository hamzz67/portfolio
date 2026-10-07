/** Normalise une chaîne pour comparaison / recherche : minuscules, sans accents, espaces réduits. */
export function normalize(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Transforme une chaîne en identifiant d'URL / attribut (ex. "Packet Tracer" → "packet-tracer"). */
export function slugify(value: string): string {
  return normalize(value)
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const MONTHS_FR = [
  'janvier', 'février', 'mars', 'avril', 'mai', 'juin',
  'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre',
];

/** "juin 2026" */
export function formatMonth(date: Date | string): string {
  const d = typeof date === 'string' ? parseIso(date) : date;
  return `${MONTHS_FR[d.getMonth()]} ${d.getFullYear()}`;
}

/** "Juin 2026" (majuscule initiale). */
export function formatMonthCap(date: Date | string): string {
  const s = formatMonth(date);
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/** "2026-06" ou "2026-06-15" → Date (sans décalage de fuseau). */
export function parseIso(value: string): Date {
  const [y, m = '1', d = '1'] = value.split('-');
  return new Date(Number(y), Number(m) - 1, Number(d));
}

/** Format ISO court pour les attributs datetime. */
export function isoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

/** Nombre sur deux chiffres : 1 → "01". */
export function pad2(n: number): string {
  return String(n).padStart(2, '0');
}

/** "7 octobre 2026" — date longue en français, pour les mentions et le pied de page. */
export function formatDateLong(date: Date | string): string {
  const d = typeof date === 'string' ? parseIso(date) : date;
  return `${d.getDate()} ${MONTHS_FR[d.getMonth()]} ${d.getFullYear()}`;
}
