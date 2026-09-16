/**
 * Mode présentation (jury) :
 * - masque le header/footer, agrandit le texte, affiche une barre de contrôle ;
 * - ↑ / ↓ / espace : section précédente / suivante (titres ## de la fiche) ;
 * - ← / → : fiche précédente / suivante ; Échap : quitter.
 * L'état est conservé en sessionStorage pour enchaîner les fiches.
 */
const KEY = 'presentation';

export function isPresenting(): boolean {
  try {
    return sessionStorage.getItem(KEY) === '1' || new URLSearchParams(location.search).has('presentation');
  } catch {
    return false;
  }
}

export function initPresentation() {
  const root = document.querySelector<HTMLElement>('[data-presentation-root]');
  if (!root) return;

  const bar = root.querySelector<HTMLElement>('[data-presentation-bar]');
  const content = root.querySelector<HTMLElement>('[data-presentation-content]');
  const sectionLabel = root.querySelector<HTMLElement>('[data-presentation-section]');
  const sections = content ? [...content.querySelectorAll<HTMLHeadingElement>('h2')] : [];
  let index = -1;

  function setSection(i: number, scroll = true) {
    if (!sections.length) return;
    index = Math.max(0, Math.min(sections.length - 1, i));
    sections.forEach((h, n) => h.classList.toggle('is-current', n === index));
    const h = sections[index];
    if (sectionLabel) sectionLabel.textContent = `${index + 1}/${sections.length} · ${h.textContent?.trim() ?? ''}`;
    if (scroll) h.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function enter() {
    document.body.setAttribute('data-presenting', '');
    if (bar) bar.hidden = false;
    try {
      sessionStorage.setItem(KEY, '1');
    } catch {
      /* ignore */
    }
    setSection(0, false);
    window.scrollTo({ top: 0, behavior: 'auto' });
  }

  function exit() {
    document.body.removeAttribute('data-presenting');
    if (bar) bar.hidden = true;
    sections.forEach((h) => h.classList.remove('is-current'));
    try {
      sessionStorage.removeItem(KEY);
    } catch {
      /* ignore */
    }
  }

  root.querySelector('[data-presentation-start]')?.addEventListener('click', enter);
  root.querySelector('[data-presentation-exit]')?.addEventListener('click', exit);
  root.querySelector('[data-presentation-section-prev]')?.addEventListener('click', () => setSection(index - 1));
  root.querySelector('[data-presentation-section-next]')?.addEventListener('click', () => setSection(index + 1));

  document.addEventListener('keydown', (e) => {
    if (!document.body.hasAttribute('data-presenting')) return;
    if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
    const prev = root.querySelector<HTMLAnchorElement>('[data-nav-prev]');
    const next = root.querySelector<HTMLAnchorElement>('[data-nav-next]');
    switch (e.key) {
      case 'Escape':
        exit();
        break;
      case 'ArrowDown':
      case ' ':
      case 'PageDown':
        e.preventDefault();
        setSection(index + 1);
        break;
      case 'ArrowUp':
      case 'PageUp':
        e.preventDefault();
        setSection(index - 1);
        break;
      case 'ArrowRight':
        if (next) next.click();
        break;
      case 'ArrowLeft':
        if (prev) prev.click();
        break;
    }
  });

  // Suivi de la section visible pendant un défilement manuel
  if (sections.length && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        if (!document.body.hasAttribute('data-presenting')) return;
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setSection(sections.indexOf(visible.target as HTMLHeadingElement), false);
      },
      { rootMargin: '-10% 0px -70% 0px' },
    );
    sections.forEach((h) => io.observe(h));
  }

  if (isPresenting()) enter();
  else exit();
}
