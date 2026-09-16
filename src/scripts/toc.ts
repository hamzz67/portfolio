/** Sommaire de fiche : surligne la section en cours de lecture. */
export function initToc() {
  const links = [...document.querySelectorAll<HTMLAnchorElement>('[data-toc-link]')];
  if (!links.length || !('IntersectionObserver' in window)) return;

  const targets = links
    .map((a) => document.getElementById(decodeURIComponent(a.hash.slice(1))))
    .filter((el): el is HTMLElement => !!el);

  const setActive = (id: string) => links.forEach((a) => a.classList.toggle('is-active', a.hash === `#${id}`));

  const io = new IntersectionObserver(
    (entries) => {
      const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
      if (visible) setActive(visible.target.id);
    },
    { rootMargin: '-15% 0px -70% 0px' },
  );
  targets.forEach((t) => io.observe(t));
}
