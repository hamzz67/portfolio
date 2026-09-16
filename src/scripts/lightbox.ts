/**
 * Visionneuse : ouvre les liens [data-lightbox] dans le <dialog> de Lightbox.astro.
 * Navigation clavier (← →), fermeture Échap / clic sur le fond, gestes tactiles (balayage).
 * Sans JavaScript, le lien ouvre simplement l'image originale.
 */
export function initLightbox() {
  const dialogEl = document.querySelector<HTMLDialogElement>('[data-lightbox-dialog]');
  const links = [...document.querySelectorAll<HTMLAnchorElement>('[data-lightbox]')];
  if (!dialogEl || !links.length) return;
  const dialog: HTMLDialogElement = dialogEl;

  const img = dialog.querySelector<HTMLImageElement>('[data-lightbox-img]')!;
  const caption = dialog.querySelector<HTMLElement>('[data-lightbox-caption]')!;
  const counter = dialog.querySelector<HTMLElement>('[data-lightbox-counter]')!;
  const prevBtn = dialog.querySelector<HTMLButtonElement>('[data-lightbox-prev]')!;
  const nextBtn = dialog.querySelector<HTMLButtonElement>('[data-lightbox-next]')!;
  const closeBtn = dialog.querySelector<HTMLButtonElement>('[data-lightbox-close]')!;

  let current = 0;
  let opener: HTMLElement | null = null;

  function show(i: number) {
    current = (i + links.length) % links.length;
    const link = links[current];
    img.src = link.href;
    img.alt = link.querySelector('img')?.alt ?? '';
    caption.textContent = link.dataset.caption ?? '';
    counter.textContent = `${current + 1} / ${links.length}`;
    prevBtn.disabled = nextBtn.disabled = links.length < 2;
    // Préchargement des voisines
    [current + 1, current - 1].forEach((n) => {
      const l = links[(n + links.length) % links.length];
      if (l) new Image().src = l.href;
    });
  }

  function open(i: number, from: HTMLElement) {
    opener = from;
    show(i);
    dialog.showModal();
    document.body.style.overflow = 'hidden';
  }

  function close() {
    dialog.close();
  }

  dialog.addEventListener('close', () => {
    document.body.style.overflow = '';
    img.src = '';
    opener?.focus();
  });

  links.forEach((link, i) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      open(i, link);
    });
  });

  prevBtn.addEventListener('click', () => show(current - 1));
  nextBtn.addEventListener('click', () => show(current + 1));
  closeBtn.addEventListener('click', close);

  dialog.addEventListener('click', (e) => {
    // clic sur le fond (hors image et boutons)
    if (e.target === dialog || (e.target as HTMLElement).classList.contains('lightbox__frame')) close();
  });

  dialog.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') show(current + 1);
    if (e.key === 'ArrowLeft') show(current - 1);
  });

  // Balayage tactile
  let startX = 0;
  dialog.addEventListener('touchstart', (e) => (startX = e.touches[0].clientX), { passive: true });
  dialog.addEventListener(
    'touchend',
    (e) => {
      const dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 50) show(dx < 0 ? current + 1 : current - 1);
    },
    { passive: true },
  );
}
