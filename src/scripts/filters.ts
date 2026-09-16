/**
 * Filtres et recherche de la bibliothèque de travaux.
 * - Tout est calculé côté client sur les attributs data-* des cartes (aucune requête).
 * - L'état est reflété dans l'URL (?q=&kind=&cat=&tech=&year=&ctx=) : les filtres sont partageables.
 * - La touche "/" place le curseur dans la recherche.
 */
import { normalize } from '@/lib/format';
import { eggReply } from './eggs';

interface State {
  q: string;
  kind: string;
  category: Set<string>;
  tech: Set<string>;
  year: string;
  context: string;
}

export function initFilters() {
  const root = document.querySelector<HTMLElement>('[data-filters]');
  if (!root) return;

  const input = root.querySelector<HTMLInputElement>('[data-search-input]');
  const cards = [...root.querySelectorAll<HTMLElement>('[data-results] > li')];
  const count = root.querySelector<HTMLElement>('[data-count]');
  const empty = root.querySelector<HTMLElement>('[data-empty]');
  const egg = root.querySelector<HTMLElement>('[data-egg]');
  const resets = root.querySelectorAll<HTMLButtonElement>('[data-filters-reset]');
  const chips = root.querySelectorAll<HTMLButtonElement>('button[data-filter]');
  const selects = root.querySelectorAll<HTMLSelectElement>('select[data-filter-select]');
  const toggle = root.querySelector<HTMLButtonElement>('[data-filters-toggle]');
  const panel = root.querySelector<HTMLElement>('#filters-panel');

  const state: State = { q: '', kind: '', category: new Set(), tech: new Set(), year: '', context: '' };

  /* ---- URL → état ---- */
  const params = new URLSearchParams(location.search);
  state.q = params.get('q') ?? '';
  state.kind = params.get('kind') ?? '';
  params.getAll('cat').forEach((c) => state.category.add(c));
  params.getAll('tech').forEach((t) => state.tech.add(t));
  state.year = params.get('year') ?? '';
  state.context = params.get('ctx') ?? '';

  const isActive = () =>
    !!(state.q || state.kind || state.category.size || state.tech.size || state.year || state.context);

  function syncUrl() {
    const p = new URLSearchParams();
    if (state.q) p.set('q', state.q);
    if (state.kind) p.set('kind', state.kind);
    state.category.forEach((c) => p.append('cat', c));
    state.tech.forEach((t) => p.append('tech', t));
    if (state.year) p.set('year', state.year);
    if (state.context) p.set('ctx', state.context);
    const qs = p.toString();
    history.replaceState(null, '', qs ? `?${qs}` : location.pathname);
  }

  function syncControls() {
    if (input) input.value = state.q;
    chips.forEach((b) => {
      const f = b.dataset.filter!;
      const v = b.dataset.value ?? '';
      let on = false;
      if (f === 'kind') on = state.kind === v;
      if (f === 'category') on = state.category.has(v);
      if (f === 'tech') on = state.tech.has(v);
      b.classList.toggle('chip--active', on);
      b.setAttribute('aria-pressed', String(on));
    });
    selects.forEach((s) => {
      const f = s.dataset.filterSelect!;
      s.value = f === 'year' ? state.year : state.context;
    });
    resets.forEach((r) => (r.hidden = !isActive()));
  }

  function matches(card: HTMLElement): boolean {
    const el = card.querySelector<HTMLElement>('[data-kind]') ?? card;
    const d = el.dataset;
    if (state.kind && d.kind !== state.kind) return false;
    if (state.category.size) {
      const cats = (d.category ?? '').split(' ');
      if (![...state.category].some((c) => cats.includes(c))) return false;
    }
    if (state.tech.size) {
      const techs = (d.tech ?? '').split(' ');
      if (![...state.tech].every((t) => techs.includes(t))) return false;
    }
    if (state.year && d.year !== state.year) return false;
    if (state.context && d.context !== state.context) return false;
    if (state.q) {
      const terms = normalize(state.q).split(' ').filter(Boolean);
      const hay = d.search ?? '';
      if (!terms.every((t) => hay.includes(t))) return false;
    }
    return true;
  }

  function apply() {
    let shown = 0;
    cards.forEach((card) => {
      const ok = matches(card);
      card.hidden = !ok;
      if (ok) shown++;
    });
    if (count) count.textContent = `${shown} résultat${shown > 1 ? 's' : ''}`;
    if (empty) empty.hidden = shown > 0 || cards.length === 0;

    if (egg) {
      const reply = state.q ? eggReply(state.q) : null;
      egg.hidden = !reply;
      egg.textContent = reply ? `$ ${state.q.trim()} → ${reply}` : '';
    }
    syncControls();
    syncUrl();
  }

  /* ---- Événements ---- */
  let debounce = 0;
  input?.addEventListener('input', () => {
    clearTimeout(debounce);
    debounce = window.setTimeout(() => {
      state.q = input.value;
      apply();
    }, 120);
  });

  chips.forEach((b) =>
    b.addEventListener('click', () => {
      const f = b.dataset.filter!;
      const v = b.dataset.value ?? '';
      if (f === 'kind') state.kind = v;
      if (f === 'category') state.category.has(v) ? state.category.delete(v) : state.category.add(v);
      if (f === 'tech') state.tech.has(v) ? state.tech.delete(v) : state.tech.add(v);
      apply();
    }),
  );

  selects.forEach((s) =>
    s.addEventListener('change', () => {
      if (s.dataset.filterSelect === 'year') state.year = s.value;
      else state.context = s.value;
      apply();
    }),
  );

  resets.forEach((r) =>
    r.addEventListener('click', () => {
      state.q = '';
      state.kind = '';
      state.category.clear();
      state.tech.clear();
      state.year = '';
      state.context = '';
      apply();
      input?.focus();
    }),
  );

  toggle?.addEventListener('click', () => {
    const open = panel?.classList.toggle('is-open') ?? false;
    toggle.setAttribute('aria-expanded', String(open));
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === '/' && document.activeElement !== input && !(e.target instanceof HTMLInputElement)) {
      e.preventDefault();
      input?.focus();
    }
    if (e.key === 'Escape' && document.activeElement === input && input) {
      input.value = '';
      state.q = '';
      apply();
    }
  });

  apply();
}
