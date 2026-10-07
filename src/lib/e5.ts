import { COMPETENCES_E5, competenceKeys, type CompetenceE5 } from '@/data/competences-e5';
import { getProjects } from '@/lib/projects';
import { getVeille, getPeriode } from '@/lib/veille';

/**
 * CARTOGRAPHIE E5 — compétence → réalisations qui la prouvent.
 *
 * Le tableau de synthèse de /e5/ est GÉNÉRÉ à partir du champ `competencesE5`
 * des fiches de travaux et des entrées de veille. Il n'est jamais tenu à la
 * main : une fiche ajoutée apparaît dans le tableau, une compétence que plus
 * rien ne couvre redevient un trou visible.
 *
 * Les grilles officielles de l'épreuve retirent 2 points en l'absence de
 * tableau de synthèse. L'intérêt de cette page n'est pourtant pas d'éviter la
 * pénalité : c'est de voir les trous avant le jury.
 */

export interface Realisation {
  titre: string;
  href: string;
  /** "TP", "Stage", "Veille", "Projet" — affiché en étiquette. */
  nature: string;
  /** Date ou période, en clair. */
  quand: string;
  /** Pour trier de la plus récente à la plus ancienne. */
  tri: number;
  competences: CompetenceE5[];
}

export interface CouvertureCompetence {
  id: CompetenceE5;
  label: string;
  court: string;
  realisations: Realisation[];
  /** `absente` : aucune preuve. `faible` : une seule. `couverte` : au moins deux. */
  niveau: 'absente' | 'faible' | 'couverte';
}

const NATURES: Record<string, string> = { tp: 'TP', stage: 'Stage', personnel: 'Projet' };

/** Toutes les réalisations du portfolio, quelle que soit leur forme. */
export async function getRealisations(): Promise<Realisation[]> {
  const projets = await getProjects();

  const depuisProjets: Realisation[] = projets.map((p) => ({
    titre: p.data.title,
    href: `/travaux/${p.id}`,
    nature: NATURES[p.data.kind] ?? p.data.kind,
    quand: String(p.data.date.getFullYear()),
    tri: p.data.date.getTime(),
    competences: p.data.competencesE5 as CompetenceE5[],
  }));

  /*
   * La veille compte pour UNE réalisation, pas onze : c'est une démarche
   * suivie, pas onze travaux distincts. Ses compétences sont l'union de
   * celles de ses entrées, plus « organiser son développement professionnel »,
   * qu'une veille tenue sur onze mois prouve par définition.
   */
  const entrees = await getVeille();
  const veille: Realisation[] = entrees.length
    ? [
        {
          titre: 'Veille technologique — sécurité des accès distants',
          href: '/veille',
          nature: 'Veille',
          quand: await getPeriode(),
          tri: new Date(`${entrees[entrees.length - 1].data.mois}-01`).getTime(),
          competences: [
            ...new Set([
              ...entrees.flatMap((e) => e.data.competencesE5 as CompetenceE5[]),
              'developpement-pro' as CompetenceE5,
            ]),
          ],
        },
      ]
    : [];

  return [...depuisProjets, ...veille].sort((a, b) => b.tri - a.tri);
}

/** Une ligne par compétence du bloc, avec les réalisations qui la couvrent. */
export async function getCouverture(): Promise<CouvertureCompetence[]> {
  const realisations = await getRealisations();

  return competenceKeys.map((id) => {
    const liees = realisations.filter((r) => r.competences.includes(id));
    return {
      id,
      label: COMPETENCES_E5[id].label,
      court: COMPETENCES_E5[id].court,
      realisations: liees,
      niveau: liees.length === 0 ? 'absente' : liees.length === 1 ? 'faible' : 'couverte',
    };
  });
}

/** Chiffres affichés en tête de la page E5. */
export async function getBilanE5() {
  const couverture = await getCouverture();
  const realisations = await getRealisations();

  return {
    total: couverture.length,
    couvertes: couverture.filter((c) => c.niveau === 'couverte').length,
    faibles: couverture.filter((c) => c.niveau === 'faible').length,
    absentes: couverture.filter((c) => c.niveau === 'absente').length,
    realisations: realisations.length,
    /** Compétences à renforcer, de la plus faible à la moins faible. */
    aRenforcer: couverture
      .filter((c) => c.niveau !== 'couverte')
      .sort((a, b) => a.realisations.length - b.realisations.length),
  };
}
