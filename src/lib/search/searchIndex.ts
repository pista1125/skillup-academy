/**
 * A fejléc keresőjének indexe. Ezt a modult a kereső csak megnyitáskor tölti be
 * (dinamikus import), a kompetencia-feladatokat pedig még külön, lustán.
 */
import { mathTopics } from '@/data/mathTopics';
import { getGradeSubsections } from '@/components/math/views/gradeSectionsConfig';
import { TOOLS_CATALOG_DATA } from '@/components/math/tools/ToolsCatalog';
import { CONTENT_AREAS } from '@/components/math/competency-matrix/taxonomy';
import {
  ALL_GRADE_LINKS,
  COMPETENCY_AREA_PARAM,
  COMPETENCY_TASK_PARAM,
  COMPETENCY_TEST_PARAM,
  COMPETENCY_VIEW_PARAM,
  COMPETENCY_VIEWS,
  GAMES,
  SECTION_PARAM,
} from '@/data/navCatalog';
import { IndexedEntry, SearchEntry, indexEntry, prettyTitle } from './search';

const GRADE_WORDS: Record<number, string> = {
  1: 'első elsős', 2: 'második másodikos', 3: 'harmadik harmadikos', 4: 'negyedik negyedikes',
  5: 'ötödik ötödikes', 6: 'hatodik hatodikos', 7: 'hetedik hetedikes', 8: 'nyolcadik nyolcadikos',
  9: 'kilencedik kilencedikes', 10: 'tizedik tizedikes', 11: 'tizenegyedik', 12: 'tizenkettedik',
};

const iconText = (icon: unknown): string | undefined => (typeof icon === 'string' ? icon : undefined);

function buildBaseEntries(): SearchEntry[] {
  const entries: SearchEntry[] = [];

  // Évfolyamok és felkészítők
  for (const g of ALL_GRADE_LINKS) {
    entries.push({
      id: `grade:${g.slug}`,
      kind: 'grade',
      title: g.num ? g.label : `${g.label} felkészítés`,
      path: `/${g.slug}`,
      gradeNum: g.num,
      gradeLevel: g.level,
      keywords: g.num ? `${GRADE_WORDS[g.num]} ${g.num <= 8 ? 'általános iskola' : 'középiskola gimnázium'}` : 'felkészítés',
    });
  }

  // Témakörök és leckék — ugyanabból a konfigurációból, amit az évfolyamoldal oldalsávja mutat.
  for (const g of ALL_GRADE_LINKS) {
    if (g.num === null) continue;
    const topics = getGradeSubsections(g.level, mathTopics);
    for (const t of topics) {
      if (t.id === 'materials') continue;
      const topicTitle = prettyTitle(t.title);
      const topicPath = `/${g.slug}/${t.id}`;
      const description = mathTopics.find((m) => m.id === t.id)?.description;
      entries.push({
        id: `topic:${g.slug}:${t.id}`,
        kind: 'topic',
        title: topicTitle,
        subtitle: description ? `${g.label} · ${description}` : g.label,
        path: topicPath,
        gradeNum: g.num,
        gradeLevel: g.level,
        topicId: t.id,
        icon: iconText(t.icon),
      });
      for (const s of t.subsections || []) {
        entries.push({
          id: `lesson:${g.slug}:${s.id}`,
          kind: 'lesson',
          title: s.label.replace(/^\d+\.\s*/, ''),
          subtitle: `${g.label} › ${topicTitle}`,
          path: `${topicPath}?${SECTION_PARAM}=${encodeURIComponent(s.id)}`,
          gradeNum: g.num,
          gradeLevel: g.level,
          topicId: t.id,
          icon: iconText(t.icon),
        });
      }
    }
  }

  // Eszközök
  for (const t of TOOLS_CATALOG_DATA) {
    entries.push({
      id: `tool:${t.id}`,
      kind: 'tool',
      title: t.title,
      subtitle: `Eszköz › ${t.categoryName} · ${t.grades}`,
      path: `/eszkozok/${t.id}`,
      keywords: `${t.desc} ${t.tags.join(' ')}`,
    });
  }

  // Játékok
  for (const g of GAMES) {
    entries.push({
      id: `game:${g.id}`,
      kind: 'game',
      title: g.title,
      subtitle: 'Matek játék',
      path: `/jatekok/${g.id}`,
      keywords: `${g.desc} játék`,
    });
  }

  // Kompetencia: nézetek, területek, próbamérések
  entries.push(
    { id: 'comp:browse', kind: 'competency', title: 'Kompetencia feladatböngésző', subtitle: 'Kompetencia', path: '/kompetencia', keywords: 'kompetenciamérés okm feladatbank' },
    { id: 'comp:practice', kind: 'competency', title: 'Próbamérések', subtitle: 'Kompetencia', path: `/kompetencia?${COMPETENCY_VIEW_PARAM}=${COMPETENCY_VIEWS.practice}`, keywords: 'kompetenciamérés próbateszt teszt' },
    { id: 'comp:results', kind: 'competency', title: 'Kompetencia eredményeim', subtitle: 'Kompetencia', path: `/kompetencia?${COMPETENCY_VIEW_PARAM}=${COMPETENCY_VIEWS.myResults}`, keywords: 'eredmények kompetenciamérés' },
  );
  for (const a of CONTENT_AREAS) {
    entries.push({
      id: `comp:area:${a.id}`,
      kind: 'competency',
      title: a.name,
      subtitle: 'Kompetencia › Tartalmi terület',
      path: `/kompetencia?${COMPETENCY_AREA_PARAM}=${a.id}`,
      keywords: `kompetencia ${Object.values(a.subs || {}).join(' ')}`,
    });
  }
  for (let i = 1; i <= 10; i++) {
    const id = `PM-${String(i).padStart(2, '0')}`;
    entries.push({
      id: `comp:test:${id}`,
      kind: 'competency',
      title: `${i}. kompetenciamérés próbateszt`,
      subtitle: 'Kompetencia › Próbamérések',
      path: `/kompetencia?${COMPETENCY_VIEW_PARAM}=${COMPETENCY_VIEWS.practice}&${COMPETENCY_TEST_PARAM}=${id}`,
      keywords: 'próbamérés országos kompetenciamérés',
    });
  }

  return entries;
}

let baseCache: IndexedEntry[] | null = null;
let taskPromise: Promise<IndexedEntry[]> | null = null;

/** Gyors rész: évfolyamok, témakörök, leckék, eszközök, játékok, kompetencia-nézetek. */
export function getBaseIndex(): IndexedEntry[] {
  if (!baseCache) baseCache = buildBaseEntries().map(indexEntry);
  return baseCache;
}

/** Lassabb rész: a ~600 kompetencia-feladat (külön csomagban töltődik). */
export function loadTaskIndex(): Promise<IndexedEntry[]> {
  if (!taskPromise) {
    taskPromise = import('@/components/math/competency-matrix/consolidated_tasks')
      .then(({ COMPETENCY_TASKS }) => {
        const areaName = new Map(CONTENT_AREAS.map((a) => [a.id, a.name]));
        return (COMPETENCY_TASKS as { id: string; title: string; contentArea: string; keywords?: string[] }[]).map((t) =>
          indexEntry({
            id: `task:${t.id}`,
            kind: 'task',
            title: t.title,
            subtitle: `Kompetencia › ${areaName.get(t.contentArea) ?? t.contentArea} · ${t.id}`,
            path: `/kompetencia?${COMPETENCY_TASK_PARAM}=${encodeURIComponent(t.id)}`,
            keywords: (t.keywords || []).join(' '),
          })
        );
      })
      .catch((err) => {
        console.warn('Kompetencia-feladatok indexelése sikertelen:', err);
        taskPromise = null;
        return [];
      });
  }
  return taskPromise;
}
