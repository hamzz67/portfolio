/**
 * Apparitions au scroll.
 * - `.reveal` : l'élément apparaît quand il entre dans le viewport (une seule fois).
 * - `.reveal-group` : ses enfants `.reveal` reçoivent un délai croissant (--i) automatiquement.
 * - `.split` : titre découpé en lignes/mots (voir SplitText.astro), révélé de la même façon.
 */
let observer: IntersectionObserver | null = null;

export function initReveal() {
  observer?.disconnect();

  // Numérotation automatique des groupes pour le décalage en cascade
  document.querySelectorAll<HTMLElement>('.reveal-group').forEach((group) => {
    group.querySelectorAll<HTMLElement>(':scope > .reveal, :scope > * > .reveal').forEach((el, i) => {
      if (!el.style.getPropertyValue('--i')) el.style.setProperty('--i', String(Math.min(i, 8)));
    });
  });

  const targets = document.querySelectorAll<HTMLElement>('.reveal, .split');
  if (!targets.length) return;

  if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    targets.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer?.unobserve(entry.target);
        }
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
  );

  targets.forEach((el) => {
    // Ce qui est déjà visible au chargement apparaît immédiatement (pas d'attente du scroll)
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) {
      el.classList.add('is-visible');
    } else {
      observer!.observe(el);
    }
  });
}
