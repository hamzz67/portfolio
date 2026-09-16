/**
 * Script global : thème, menu mobile, apparitions au scroll, barre de progression,
 * parallaxe légère et micro-interactions. Réinitialisé à chaque navigation (ClientRouter).
 */
import { initReveal } from './reveal';
import { initEasterEggs } from './eggs';

const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- Thème clair / sombre ---------- */
function initTheme() {
  const root = document.documentElement;
  document.querySelectorAll<HTMLButtonElement>('[data-theme-toggle]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const current = root.getAttribute('data-theme') ?? (systemDark ? 'dark' : 'light');
      const next = current === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try {
        localStorage.setItem('theme', next);
      } catch {
        /* stockage indisponible : le thème reste valable pour la page */
      }
    });
  });
}

/* ---------- Menu mobile ---------- */
function initMenu() {
  const toggle = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
  const menu = document.getElementById('mobile-menu');
  if (!toggle || !menu) return;

  const setOpen = (open: boolean) => {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
    menu.hidden = !open;
    document.body.classList.toggle('menu-open', open);
  };

  toggle.addEventListener('click', () => setOpen(menu.hidden === true));
  menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setOpen(false)));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !menu.hidden) {
      setOpen(false);
      toggle.focus();
    }
  });
  window.matchMedia('(min-width: 1024px)').addEventListener('change', (e) => e.matches && setOpen(false));
}

/* ---------- Barre de progression de lecture ---------- */
let progressRaf = 0;
function updateProgress() {
  const bar = document.getElementById('progress-bar');
  if (!bar) return;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const ratio = max > 0 ? Math.min(1, window.scrollY / max) : 0;
  bar.style.setProperty('--progress', ratio.toFixed(4));
}
function onScroll() {
  if (progressRaf) return;
  progressRaf = requestAnimationFrame(() => {
    progressRaf = 0;
    updateProgress();
    updateParallax();
  });
}

/* ---------- Parallaxe légère : [data-parallax="0.15"] ---------- */
function updateParallax() {
  if (reduceMotion()) return;
  document.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => {
    const factor = Number(el.dataset.parallax ?? 0.1);
    const rect = el.getBoundingClientRect();
    const center = rect.top + rect.height / 2 - window.innerHeight / 2;
    el.style.transform = `translate3d(0, ${(-center * factor).toFixed(1)}px, 0)`;
  });
}

/* ---------- Suivi du pointeur : --mx / --my (−1 → 1) sur [data-pointer] ---------- */
function initPointer() {
  if (reduceMotion() || !window.matchMedia('(hover: hover)').matches) return;
  const targets = document.querySelectorAll<HTMLElement>('[data-pointer]');
  if (!targets.length) return;
  let raf = 0;
  window.addEventListener(
    'pointermove',
    (e) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const mx = (e.clientX / window.innerWidth) * 2 - 1;
        const my = (e.clientY / window.innerHeight) * 2 - 1;
        targets.forEach((t) => {
          t.style.setProperty('--mx', mx.toFixed(3));
          t.style.setProperty('--my', my.toFixed(3));
        });
      });
    },
    { passive: true },
  );
}

/* ---------- Boutons « copier » : [data-copy="texte"] ---------- */
function initCopy() {
  document.querySelectorAll<HTMLButtonElement>('[data-copy]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const text = btn.dataset.copy ?? '';
      try {
        await navigator.clipboard.writeText(text);
        btn.classList.add('is-copied');
        const label = btn.querySelector('[data-copy-label]');
        const original = label?.textContent;
        if (label) label.textContent = 'Copié';
        setTimeout(() => {
          btn.classList.remove('is-copied');
          if (label && original) label.textContent = original;
        }, 1800);
      } catch {
        /* presse-papiers indisponible */
      }
    });
  });
}

/* ---------- Initialisation ---------- */
function init() {
  initTheme();
  initMenu();
  initReveal();
  initPointer();
  initCopy();
  updateProgress();
  updateParallax();
}

document.addEventListener('astro:page-load', init);
window.addEventListener('scroll', onScroll, { passive: true });
window.addEventListener('resize', onScroll, { passive: true });
initEasterEggs();
