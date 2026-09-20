/**
 * Mouvement : apparition au défilement, barre de progression de lecture.
 * Tout est désactivé si l'utilisateur préfère réduire les animations.
 */

const REVEAL = '[data-reveal], .head[data-index]';

let observer: IntersectionObserver | null = null;

export function initReveal() {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const items = Array.from(document.querySelectorAll<HTMLElement>(REVEAL));
  if (reduced || !('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('is-in'));
    return;
  }

  observer?.disconnect();

  // Décalage en cascade : index parmi les frères qui se révèlent aussi (plafonné).
  items.forEach((el) => {
    if (el.style.getPropertyValue('--i')) return;
    const parent = el.parentElement;
    if (!parent) return;
    const siblings = Array.from(parent.children).filter((c) => c.matches(REVEAL));
    if (siblings.length > 1) el.style.setProperty('--i', String(Math.min(siblings.indexOf(el), 8)));
  });

  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-in');
        observer?.unobserve(entry.target);
      }
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
  );
  items.forEach((el) => (el.classList.contains('is-in') ? null : observer!.observe(el)));
}

/** Progression de lecture : variable --scroll (0 → 1) sur <html>, lue par l'en-tête. */
let progressBound = false;
export function initProgress() {
  if (progressBound) return;
  progressBound = true;
  const root = document.documentElement;
  let ticking = false;
  const update = () => {
    const max = root.scrollHeight - window.innerHeight;
    const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    root.style.setProperty('--scroll', p.toFixed(4));
    root.classList.toggle('is-scrolled', window.scrollY > 8);
    ticking = false;
  };
  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    },
    { passive: true },
  );
  document.addEventListener('astro:page-load', update);
  update();
}
