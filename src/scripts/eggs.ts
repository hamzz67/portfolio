/**
 * Easter eggs — discrets, pour les curieux qui ouvrent la console ou tapent une commande
 * dans la recherche. Aucun effet visuel intrusif.
 */

/** Message de console, affiché une seule fois par session. */
export function initEasterEggs() {
  if (import.meta.env.DEV) return;
  try {
    if (sessionStorage.getItem('egg:console')) return;
    sessionStorage.setItem('egg:console', '1');
  } catch {
    /* ignore */
  }
  const hex = '43757269657578203f20426f6e2072e9666c6578652e';
  const hint = hex.match(/.{2}/g)?.map((h) => String.fromCharCode(parseInt(h, 16))).join('') ?? '';
  console.log(
    '%cHJ%c portfolio · statique · sans tracker\n%c' + hint + ' → /.well-known/security.txt',
    'font-family:monospace;font-weight:700;background:#12694f;color:#fff;padding:2px 6px;border-radius:3px',
    'font-family:monospace;color:#79776f;padding-left:6px',
    'font-family:monospace;color:#12694f',
  );
}

/**
 * Réponses de la recherche à quelques commandes shell.
 * Retourne `null` si la requête n'est pas une commande connue.
 */
export function eggReply(query: string): string | null {
  const q = query.trim().toLowerCase();
  if (/^sudo\b/.test(q)) return 'hamza is not in the sudoers file. This incident will be reported.';
  if (/^rm\s+-rf/.test(q)) return 'Refusé : ce portfolio est en lecture seule (et versionné avec git).';
  if (q === 'whoami') return 'visiteur@portfolio — bienvenue.';
  if (q === 'ls' || q === 'ls -la') return 'travaux/  parcours/  competences/  galerie/  documents/  .well-known/';
  if (q === 'ping') return 'pong — 0 % de perte de paquets.';
  if (q === 'help' || q === '--help' || q === 'man') return 'Tapez simplement un mot-clé : vlan, linux, cisco…';
  return null;
}
