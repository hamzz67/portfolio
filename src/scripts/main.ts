/**
 * Script global : thème, menu mobile, boutons « copier ».
 * Réinitialisé à chaque navigation (ClientRouter).
 */
import { initEasterEggs } from './eggs';
import { initReveal, initProgress } from './motion';

function applyTheme(next: 'dark' | 'light') {
  document.documentElement.setAttribute('data-theme', next);
  try {
    localStorage.setItem('theme', next);
  } catch {
    /* stockage indisponible */
  }
}

function initTheme() {
  const root = document.documentElement;
  document.querySelectorAll<HTMLButtonElement>('[data-theme-toggle]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const current = root.getAttribute('data-theme') ?? (systemDark ? 'dark' : 'light');
      const next = current === 'dark' ? 'light' : 'dark';

      // Cercle qui s'ouvre depuis le bouton (View Transitions API), sinon bascule sèche.
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const doc = document as Document & { startViewTransition?: (cb: () => void) => { finished: Promise<void> } };
      if (reduced || !doc.startViewTransition) {
        applyTheme(next);
        return;
      }
      const x = e.clientX || btn.getBoundingClientRect().left + btn.offsetWidth / 2;
      const y = e.clientY || btn.getBoundingClientRect().top + btn.offsetHeight / 2;
      const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
      root.style.setProperty('--vt-x', `${x}px`);
      root.style.setProperty('--vt-y', `${y}px`);
      root.style.setProperty('--vt-r', `${r}px`);
      root.classList.add('theme-vt');
      const t = doc.startViewTransition(() => applyTheme(next));
      t.finished.finally(() => root.classList.remove('theme-vt'));
    });
  });
}

function initMenu() {
  const toggle = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
  const menu = document.getElementById('mobile-menu');
  if (!toggle || !menu) return;

  const setOpen = (open: boolean) => {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
    menu.hidden = !open;
  };

  toggle.addEventListener('click', () => setOpen(menu.hidden === true));
  menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setOpen(false)));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !menu.hidden) {
      setOpen(false);
      toggle.focus();
    }
  });
}

function initCopy() {
  document.querySelectorAll<HTMLButtonElement>('[data-copy]').forEach((btn) => {
    btn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(btn.dataset.copy ?? '');
        const label = btn.querySelector('[data-copy-label]');
        const original = label?.textContent;
        if (label) label.textContent = 'Copié';
        setTimeout(() => {
          if (label && original) label.textContent = original;
        }, 1800);
      } catch {
        /* presse-papiers indisponible */
      }
    });
  });
}

document.addEventListener('astro:page-load', () => {
  initTheme();
  initMenu();
  initCopy();
  initReveal();
});
initProgress();
initEasterEggs();
