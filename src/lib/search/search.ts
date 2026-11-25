/**
 * Ékezet- és kisbetű-független keresés a fejléc keresőjéhez.
 * Tiszta függvények (nincs React/adat-függőség), így egységtesztelhetők.
 */
import type { GradeLevel } from '@/types/education';

export type SearchKind = 'grade' | 'topic' | 'lesson' | 'tool' | 'game' | 'competency' | 'task';

export interface SearchEntry {
  id: string;
  kind: SearchKind;
  title: string;
  /** Útvonal-szöveg a cím alatt, pl. „6. osztály › II. Törtek”. */
  subtitle?: string;
  path: string;
  /** 1–12; ha nincs évfolyamhoz kötve, null. */
  gradeNum?: number | null;
  gradeLevel?: GradeLevel;
  topicId?: string;
  /** Emoji-ikon, ha van. */
  icon?: string;
  /** Csak kereséshez használt kiegészítő szöveg (leírás, címkék, kulcsszavak). */
  keywords?: string;
}

export interface IndexedEntry extends SearchEntry {
  _title: string;
  _rest: string;
}

export interface ScoredEntry extends IndexedEntry {
  score: number;
}

const MARKS = /[̀-ͯ]/g;

/** „Függvény” → „fuggveny”. */
export const fold = (s: string): string => s.normalize('NFD').replace(MARKS, '').toLowerCase();

export const indexEntry = (e: SearchEntry): IndexedEntry => ({
  ...e,
  _title: fold(e.title),
  _rest: fold([e.subtitle, e.keywords].filter(Boolean).join(' ')),
});

/** A csupa nagybetűs témakörcímeket („V. HOZZÁRENDELÉSEK, FÜGGVÉNYEK”) olvasható alakra hozza. */
export function prettyTitle(title: string): string {
  const letters = title.replace(/[^A-Za-zÀ-ž]/g, '');
  if (letters.length < 4) return title;
  const upper = letters.replace(/[^A-ZÀ-ÞŐŰ]/g, '').length;
  if (upper / letters.length < 0.8) return title;
  const m = /^([IVXLC]+\.)\s*(.*)$/.exec(title.trim());
  const prefix = m ? `${m[1]} ` : '';
  const rest = (m ? m[2] : title).toLocaleLowerCase('hu-HU');
  return prefix + rest.charAt(0).toLocaleUpperCase('hu-HU') + rest.slice(1);
}

const KIND_WEIGHT: Record<SearchKind, number> = {
  grade: 8,
  topic: 6,
  tool: 5,
  game: 5,
  competency: 5,
  lesson: 3,
  task: 0,
};

const STOPWORDS = new Set(['osztaly', 'osztalyos', 'oszt', 'o', 'evfolyam', 'a', 'az', 'es']);

export interface ParsedQuery {
  tokens: string[];
  gradeNum: number | null;
}

export function parseQuery(query: string): ParsedQuery {
  const raw = fold(query).split(/[\s,;]+/).filter(Boolean);
  let gradeNum: number | null = null;
  const tokens: string[] = [];
  for (const t of raw) {
    const g = /^(\d{1,2})\.?$/.exec(t);
    if (g && gradeNum === null && +g[1] >= 1 && +g[1] <= 12) {
      gradeNum = +g[1];
      continue;
    }
    tokens.push(t.replace(/\.$/, ''));
  }
  const meaningful = tokens.filter((t) => t && !(gradeNum !== null && STOPWORDS.has(t)));
  return { tokens: meaningful, gradeNum };
}

const wordStart = (hay: string, token: string): boolean => {
  let i = hay.indexOf(token);
  while (i !== -1) {
    if (i === 0 || !/[a-z0-9]/.test(hay[i - 1])) return true;
    i = hay.indexOf(token, i + 1);
  }
  return false;
};

function tokenScore(e: IndexedEntry, token: string): number {
  if (e._title.startsWith(token)) return 30;
  if (wordStart(e._title, token)) return 20;
  if (token.length >= 3 && e._title.includes(token)) return 10;
  if (wordStart(e._rest, token)) return 6;
  if (token.length >= 3 && e._rest.includes(token)) return 3;
  return 0;
}

export function searchEntries(entries: IndexedEntry[], query: string): ScoredEntry[] {
  const { tokens, gradeNum } = parseQuery(query);
  if (tokens.length === 0 && gradeNum === null) return [];
  const phrase = tokens.join(' ');
  const out: ScoredEntry[] = [];

  for (const e of entries) {
    // Évfolyam a lekérdezésben („törtek 6”): más évfolyam tartalma kiesik.
    if (gradeNum !== null && e.gradeNum != null && e.gradeNum !== gradeNum) continue;
    // Csak évfolyamszám („6.”): az évfolyam és a témakörei.
    if (tokens.length === 0) {
      if (e.gradeNum !== gradeNum || (e.kind !== 'grade' && e.kind !== 'topic')) continue;
      out.push({ ...e, score: KIND_WEIGHT[e.kind] + (e.kind === 'grade' ? 100 : 0) });
      continue;
    }

    let score = 0;
    let ok = true;
    for (const t of tokens) {
      const s = tokenScore(e, t);
      if (s === 0) { ok = false; break; }
      score += s;
    }
    if (!ok) continue;
    if (tokens.length > 1 && e._title.includes(phrase)) score += 15;
    if (gradeNum !== null && e.gradeNum === gradeNum) score += 25;
    score += KIND_WEIGHT[e.kind];
    out.push({ ...e, score });
  }

  return out.sort((a, b) => b.score - a.score || a.title.length - b.title.length);
}

export interface HighlightPart {
  text: string;
  match: boolean;
}

/** A keresett szórészek kiemelése az eredeti (ékezetes) szövegben. */
export function highlight(text: string, query: string): HighlightPart[] {
  const { tokens } = parseQuery(query);
  if (!tokens.length) return [{ text, match: false }];
  const chars = Array.from(text);
  const folded = chars.map((c) => fold(c));
  // A legtöbb karakter 1:1 foldolódik; a többit egy karakterként kezeljük.
  const foldedStr = folded.map((f) => (f.length === 1 ? f : f.charAt(0) || ' ')).join('');
  const mark = new Array(chars.length).fill(false);
  for (const t of tokens) {
    let i = foldedStr.indexOf(t);
    while (i !== -1) {
      for (let k = i; k < i + t.length && k < mark.length; k++) mark[k] = true;
      i = foldedStr.indexOf(t, i + t.length);
    }
  }
  const parts: HighlightPart[] = [];
  chars.forEach((c, i) => {
    const last = parts[parts.length - 1];
    if (last && last.match === mark[i]) last.text += c;
    else parts.push({ text: c, match: mark[i] });
  });
  return parts;
}

export const KIND_ORDER: SearchKind[] = ['grade', 'topic', 'lesson', 'tool', 'game', 'competency', 'task'];

export const KIND_LABEL: Record<SearchKind, string> = {
  grade: 'Évfolyamok',
  topic: 'Témakörök',
  lesson: 'Leckék',
  tool: 'Eszközök',
  game: 'Játékok',
  competency: 'Kompetencia',
  task: 'Kompetencia-feladatok',
};

export function groupResults(results: ScoredEntry[], perGroup = Infinity): { kind: SearchKind; items: ScoredEntry[]; total: number }[] {
  return KIND_ORDER
    .map((kind) => {
      const all = results.filter((r) => r.kind === kind);
      return { kind, items: all.slice(0, perGroup), total: all.length };
    })
    .filter((g) => g.total > 0);
}
