import React from 'react';
import { Brain, Calculator, Trophy } from 'lucide-react';
import type { GradeLevel } from '@/types/education';

/**
 * Közös navigációs katalógus: a főoldal, a fejléc „Tananyagok” menüje és a
 * bal oldali menü ugyanebből a listából dolgozik.
 */

export interface GameConfig {
  id: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
  color: string;
}

export const GAMES: GameConfig[] = [
  { id: 'sudoku', title: 'Sudoku Mester', desc: 'Klasszikus és extrém Sudoku feladványok', icon: <Calculator className="w-8 h-8" />, color: 'bg-blue-100 border-blue-200 text-blue-600' },
  {
    id: 'hanoi-tower',
    title: 'Hanoi tornyai',
    desc: 'Logikai és stratégiai játék a korongokkal.',
    icon: <Trophy className="w-8 h-8 text-amber-500" />,
    color: 'bg-amber-50 dark:bg-amber-900/20'
  },
  { id: 'snake-game', title: 'Matek Kígyó', desc: 'Gyűjtsd össze a helyes válaszokat a kígyóval!', icon: <span className="text-3xl">🐍</span>, color: 'bg-emerald-100 border-emerald-200' },
  { id: 'tower-builder', title: 'Toronyépítő', desc: 'Építs tornyokat Dienes-tömbökből és számolj!', icon: <span className="text-3xl">🏗️</span>, color: 'bg-blue-100 border-blue-200 text-blue-700' },
  { id: 'coloring', title: 'Számolj és Színezz!', desc: 'Számold ki az eredményt és színezd ki a képeket!', icon: <span className="text-3xl">🎨</span>, color: 'bg-pink-100 border-pink-200 text-pink-700' },
  { id: 'memory-game', title: 'Memóriajáték', desc: 'Jegyezd meg az ábrákat és teszteld a memóriád!', icon: <Brain className="w-8 h-8" />, color: 'bg-indigo-100 border-indigo-200 text-indigo-600' },
  { id: 'color-sequence-game', title: 'Szín-sorrend emlékezet', desc: 'Ismételd meg a villogó színes gombok sorrendjét!', icon: <Brain className="w-8 h-8 text-pink-500 animate-pulse" />, color: 'bg-pink-50 dark:bg-pink-900/20 text-pink-600 border-pink-200' },
  { id: 'chess-game', title: 'Sakk Mester', desc: 'Játssz a gép ellen vagy hívd ki barátaidat!', icon: <span className="text-3xl">♟️</span>, color: 'bg-slate-100 border-slate-200 text-slate-700' },
  { id: 'torpedo-game', title: 'Torpedó Matek', desc: 'Süllyeszd el az ellenfél hajóit koordinátákkal!', icon: <span className="text-3xl">⚓</span>, color: 'bg-indigo-100 border-indigo-200 text-indigo-700' },
];

export interface GradeLink {
  level: GradeLevel;
  /** 1–12, a felvételinél és az érettséginél null (ezekre nincs előfizetés). */
  num: number | null;
  label: string;
  short: string;
  slug: string;
  /** Csempeszín (a főoldali osztályválasztó színei). */
  tone: string;
}

// A Tailwind csak a forrásban szó szerint szereplő osztályneveket generálja, ezért kiírva:
const TONES: Record<string, string> = {
  emerald: 'bg-emerald-50 border-emerald-100 text-emerald-700 hover:border-emerald-400 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:border-emerald-900 dark:text-emerald-300 dark:hover:bg-emerald-900/50',
  sky: 'bg-sky-50 border-sky-100 text-sky-700 hover:border-sky-400 hover:bg-sky-100 dark:bg-sky-950/40 dark:border-sky-900 dark:text-sky-300 dark:hover:bg-sky-900/50',
  amber: 'bg-amber-50 border-amber-100 text-amber-700 hover:border-amber-400 hover:bg-amber-100 dark:bg-amber-950/40 dark:border-amber-900 dark:text-amber-300 dark:hover:bg-amber-900/50',
  rose: 'bg-rose-50 border-rose-100 text-rose-700 hover:border-rose-400 hover:bg-rose-100 dark:bg-rose-950/40 dark:border-rose-900 dark:text-rose-300 dark:hover:bg-rose-900/50',
  indigo: 'bg-indigo-50 border-indigo-100 text-indigo-700 hover:border-indigo-400 hover:bg-indigo-100 dark:bg-indigo-950/40 dark:border-indigo-900 dark:text-indigo-300 dark:hover:bg-indigo-900/50',
  violet: 'bg-violet-50 border-violet-100 text-violet-700 hover:border-violet-400 hover:bg-violet-100 dark:bg-violet-950/40 dark:border-violet-900 dark:text-violet-300 dark:hover:bg-violet-900/50',
  teal: 'bg-teal-50 border-teal-100 text-teal-700 hover:border-teal-400 hover:bg-teal-100 dark:bg-teal-950/40 dark:border-teal-900 dark:text-teal-300 dark:hover:bg-teal-900/50',
  pink: 'bg-pink-50 border-pink-100 text-pink-700 hover:border-pink-400 hover:bg-pink-100 dark:bg-pink-950/40 dark:border-pink-900 dark:text-pink-300 dark:hover:bg-pink-900/50',
  slate: 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-400 hover:bg-slate-100 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-800',
  purple: 'bg-purple-50 border-purple-100 text-purple-700 hover:border-purple-400 hover:bg-purple-100 dark:bg-purple-950/40 dark:border-purple-900 dark:text-purple-300 dark:hover:bg-purple-900/50',
};

export const ELEMENTARY_GRADES: GradeLink[] = [
  { level: 1, num: 1, label: '1. osztály', short: '1.', slug: '1-osztaly', tone: TONES.emerald },
  { level: 2, num: 2, label: '2. osztály', short: '2.', slug: '2-osztaly', tone: TONES.sky },
  { level: 3, num: 3, label: '3. osztály', short: '3.', slug: '3-osztaly', tone: TONES.amber },
  { level: 4, num: 4, label: '4. osztály', short: '4.', slug: '4-osztaly', tone: TONES.rose },
  { level: 5, num: 5, label: '5. osztály', short: '5.', slug: '5-osztaly', tone: TONES.indigo },
  { level: 6, num: 6, label: '6. osztály', short: '6.', slug: '6-osztaly', tone: TONES.violet },
  { level: 7, num: 7, label: '7. osztály', short: '7.', slug: '7-osztaly', tone: TONES.teal },
  { level: 8, num: 8, label: '8. osztály', short: '8.', slug: '8-osztaly', tone: TONES.pink },
];

export const HIGH_SCHOOL_GRADES: GradeLink[] = [
  { level: 'high-1', num: 9, label: '9. osztály', short: '9.', slug: '9-osztaly', tone: TONES.slate },
  { level: 'high-2', num: 10, label: '10. osztály', short: '10.', slug: '10-osztaly', tone: TONES.slate },
  { level: 'high-3', num: 11, label: '11. osztály', short: '11.', slug: '11-osztaly', tone: TONES.slate },
  { level: 'high-4', num: 12, label: '12. osztály', short: '12.', slug: '12-osztaly', tone: TONES.slate },
];

export const PREP_GRADES: GradeLink[] = [
  { level: 'admission', num: null, label: 'Felvételi', short: 'Felvételi', slug: 'felveteli', tone: TONES.emerald },
  { level: 'graduation', num: null, label: 'Érettségi', short: 'Érettségi', slug: 'erettsegi', tone: TONES.purple },
];

export const ALL_GRADE_LINKS: GradeLink[] = [...ELEMENTARY_GRADES, ...HIGH_SCHOOL_GRADES, ...PREP_GRADES];

export const gradeLinkByNum = (num: number): GradeLink | undefined =>
  ALL_GRADE_LINKS.find((g) => g.num === num);

/** A menüben kiemelt eszközök (a TOOLS_CATALOG_DATA azonosítói). */
export const FEATURED_TOOL_IDS = [
  'scientific-calculator',
  'smart-whiteboard',
  'number-line',
  'fractions',
  'geometry',
  'analog-clock',
];

/** URL-paraméterek a mélylinkekhez (a menü és a céloldalak közösen használják). */
export const TOOL_CATEGORY_PARAM = 'kategoria';
export const COMPETENCY_AREA_PARAM = 'terulet';
export const COMPETENCY_VIEW_PARAM = 'nezet';
export const COMPETENCY_TASK_PARAM = 'feladat';
export const COMPETENCY_TEST_PARAM = 'meres';
/** Évfolyamoldali lecke-szekció: /6-osztaly/g6-fractions?szekcio=<alszekció-id>. */
export const SECTION_PARAM = 'szekcio';
/** A teljes találati oldal: /kereses?q=… */
export const SEARCH_PATH = '/kereses';
export const SEARCH_QUERY_PARAM = 'q';
export const COMPETENCY_VIEWS = {
  practice: 'probameresek',
  myResults: 'eredmenyeim',
} as const;
