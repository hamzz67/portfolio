import { getCollection, type CollectionEntry } from 'astro:content';
import { KINDS, type Kind } from '@/data/taxonomy';
import { normalize } from '@/lib/format';

export type Project = CollectionEntry<'projects'>;

/** Préfixe de référence par nature (affiché en mono sur les fiches, ex. TP-2026-003). */
const REF_PREFIX: Record<Kind, string> = { tp: 'TP', stage: 'STG', personnel: 'PRJ' };

let cache: Project[] | null = null;

/** Toutes les fiches publiées (hors brouillons), triées de la plus récente à la plus ancienne. */
export async function getProjects(): Promise<Project[]> {
  if (cache) return cache;
  const all = await getCollection('projects', ({ data }) => !data.draft || import.meta.env.DEV);
  cache = all.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
  return cache;
}

export async function getFeaturedProjects(): Promise<Project[]> {
  const projects = await getProjects();
  return projects
    .filter((p) => p.data.featured)
    .sort((a, b) => (a.data.order ?? 999) - (b.data.order ?? 999));
}

/** Ordre du mode présentation : fiches mises en avant d'abord, puis le reste par date. */
export async function getPresentationOrder(): Promise<Project[]> {
  const projects = await getProjects();
  const featured = await getFeaturedProjects();
  const rest = projects.filter((p) => !p.data.featured);
  return [...featured, ...rest];
}

/**
 * Référence de fiche stable : PREFIX-ANNÉE-NNN, numérotée dans l'ordre chronologique
 * au sein d'une même nature et d'une même année.
 */
export async function getProjectRef(project: Project): Promise<string> {
  const projects = await getProjects();
  const kind = project.data.kind as Kind;
  const year = project.data.date.getFullYear();
  const siblings = projects
    .filter((p) => p.data.kind === kind && p.data.date.getFullYear() === year)
    .sort((a, b) => a.data.date.getTime() - b.data.date.getTime());
  const index = siblings.findIndex((p) => p.id === project.id) + 1;
  return `${REF_PREFIX[kind]}-${year}-${String(index).padStart(3, '0')}`;
}

export function kindLabel(kind: string): string {
  return KINDS[kind as Kind]?.label ?? kind;
}

/** Valeurs distinctes d'un champ (technologies, années…) pour construire les filtres. */
export function distinct<T>(items: T[]): T[] {
  return [...new Set(items)];
}

export async function getAllTechnologies(): Promise<string[]> {
  const projects = await getProjects();
  return distinct(projects.flatMap((p) => p.data.technologies)).sort((a, b) => a.localeCompare(b, 'fr'));
}

export async function getAllYears(): Promise<number[]> {
  const projects = await getProjects();
  return distinct(projects.map((p) => p.data.date.getFullYear())).sort((a, b) => b - a);
}

export async function getAllContexts(): Promise<string[]> {
  const projects = await getProjects();
  return distinct(projects.map((p) => p.data.context).filter((c): c is string => !!c)).sort();
}

/** Fiches qui mobilisent une compétence ou une technologie donnée (comparaison normalisée). */
export async function getProjectsForSkill(skillName: string): Promise<Project[]> {
  const projects = await getProjects();
  const target = normalize(skillName);
  return projects.filter((p) =>
    [...p.data.technologies, ...p.data.skills].some((s) => normalize(s) === target),
  );
}

/** Fiche précédente / suivante dans l'ordre de présentation. */
export async function getNeighbours(project: Project): Promise<{ prev?: Project; next?: Project }> {
  const order = await getPresentationOrder();
  const i = order.findIndex((p) => p.id === project.id);
  return { prev: order[i - 1], next: order[i + 1] };
}

/** Chaîne de recherche pré-calculée pour le filtrage côté client. */
export function searchIndex(project: Project): string {
  const d = project.data;
  return normalize(
    [d.title, d.summary, d.context, d.organization, d.role, ...d.technologies, ...d.skills].filter(Boolean).join(' '),
  );
}
