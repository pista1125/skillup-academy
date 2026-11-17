// Segédfüggvények a II. fejezet tudáspróbájához (római számok 1–100)
import { toRoman, MONTHS } from '../romai-szamok-a-mindennapokban/RomanEverydayG3Parts';

export { toRoman };

export const SIGN_VALUE: Record<string, number> = { I: 1, V: 5, X: 10, L: 50, C: 100 };

/** A jelek színe – ugyanaz, mint a fejezet 1. leckéjében. */
export const SIGN_COLOR: Record<string, string> = { I: '#2563eb', V: '#16a34a', X: '#ea580c', L: '#9333ea', C: '#dc2626' };

/** Jelsor értéke a szokásos szabállyal (kisebb jel a nagyobb előtt: elvesszük). */
export const romanValue = (s: string): number => {
  let t = 0;
  for (let i = 0; i < s.length; i++) {
    const v = SIGN_VALUE[s[i]];
    const n = SIGN_VALUE[s[i + 1]] ?? 0;
    t += v < n ? -v : v;
  }
  return t;
};

/** Mi a baj a jelsorral? null, ha szabályos római szám 1 és 100 között. */
export const romanIssue = (s: string): string | null => {
  if (!s) return 'Még nem raktál ki semmit.';
  if (/(.)\1\1\1/.test(s)) return 'Négy egyforma jel nem állhat egymás mellett. Legfeljebb 3!';
  if (/VV|LL/.test(s)) return 'A V-t és az L-t nem írjuk kétszer egymás mellé.';
  for (let i = 0; i < s.length - 1; i++) {
    if (SIGN_VALUE[s[i]] < SIGN_VALUE[s[i + 1]] && !['IV', 'IX', 'XL', 'XC'].includes(s[i] + s[i + 1])) {
      return `A ${s[i]}${s[i + 1]} nem szabályos. Kisebb jel csak így állhat a nagyobb előtt: IV, IX, XL, XC.`;
    }
  }
  const v = romanValue(s);
  if (v < 1 || v > 100) return 'Most csak 1 és 100 közötti számokkal dolgozunk.';
  if (toRoman(v) !== s) return `Ez nem a szabályos alak. A ${v} helyesen: ${toRoman(v)}.`;
  return null;
};

/** Bontás a magyarázatokhoz: 46 → "XLVI = XL + VI = 40 + 6 = 46". */
export const explainRoman = (n: number): string => {
  const t = Math.floor(n / 10) * 10;
  const o = n % 10;
  if (n === 100) return 'C = 100';
  if (!t || !o) return `${toRoman(n)} = ${n}`;
  return `${toRoman(n)} = ${toRoman(t)} + ${toRoman(o)} = ${t} + ${o} = ${n}`;
};

/** Írás magyarázata: 46 → "46 = 40 + 6 → XL + VI = XLVI". */
export const explainWrite = (n: number): string => {
  const t = Math.floor(n / 10) * 10;
  const o = n % 10;
  if (n === 100 || !t || !o) return `${n} = ${toRoman(n)}`;
  return `${n} = ${t} + ${o} → ${toRoman(t)} + ${toRoman(o)} = ${toRoman(n)}`;
};

export type TaskKind = 'rom2ar' | 'ar2rom' | 'compare' | 'next' | 'clock' | 'month';

export interface MixedTask {
  kind: TaskKind;
  text: string;
  answer: string;
  options: string[];
  explain: string;
}

const rnd = (a: number, b: number) => a + Math.floor(Math.random() * (b - a + 1));
const shuffle = <T,>(a: T[]): T[] => {
  const r = [...a];
  for (let i = r.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [r[i], r[j]] = [r[j], r[i]];
  }
  return r;
};
const fill = (answer: string, cands: string[], more: () => string): string[] => {
  const set = new Set<string>([answer]);
  for (const c of cands) if (set.size < 4 && c && c !== answer) set.add(c);
  let guard = 0;
  while (set.size < 4 && guard++ < 50) set.add(more());
  return shuffle([...set]);
};

/** Vegyes feladat a laborhoz. Minden szám 1 és 100 között. */
export const makeTask = (kind: TaskKind): MixedTask => {
  if (kind === 'rom2ar') {
    const n = rnd(11, 99);
    const swapped = (n % 10) * 10 + Math.floor(n / 10);
    return {
      kind,
      text: `Mennyi ez arab számmal: ${toRoman(n)}?`,
      answer: String(n),
      options: fill(String(n), [String(n + 2), String(n - 2), swapped >= 1 && swapped <= 100 ? String(swapped) : '', String(n + 10 <= 100 ? n + 10 : n - 10)], () => String(rnd(1, 100))),
      explain: explainRoman(n)
    };
  }
  if (kind === 'ar2rom') {
    const n = rnd(11, 99);
    return {
      kind,
      text: `Hogyan írjuk római számmal: ${n}?`,
      answer: toRoman(n),
      options: fill(toRoman(n), [toRoman(n + 1 <= 100 ? n + 1 : n - 1), toRoman(n - 1), toRoman(n + 10 <= 100 ? n + 10 : n - 10), toRoman(Math.max(1, n - 10))], () => toRoman(rnd(1, 100))),
      explain: explainRoman(n)
    };
  }
  if (kind === 'compare') {
    const a = rnd(1, 100);
    let b = rnd(1, 100);
    if (Math.random() < 0.15) b = a;
    const ans = a < b ? '<' : a > b ? '>' : '=';
    return {
      kind,
      text: `Melyik jel kell? ${toRoman(a)}  ?  ${toRoman(b)}`,
      answer: ans,
      options: ['<', '>', '='],
      explain: `${toRoman(a)} = ${a}, ${toRoman(b)} = ${b}. ${a} ${ans} ${b}.`
    };
  }
  if (kind === 'next') {
    const n = rnd(1, 99);
    return {
      kind,
      text: `Melyik szám jön a ${toRoman(n)} után?`,
      answer: toRoman(n + 1),
      options: fill(toRoman(n + 1), [toRoman(n > 1 ? n - 1 : n + 2), toRoman(n + 1 <= 89 ? n + 11 : Math.max(1, n - 9)), toRoman(n + 2 <= 100 ? n + 2 : n - 2)], () => toRoman(rnd(1, 100))),
      explain: `${toRoman(n)} = ${n}. Utána jön a ${n + 1}, vagyis ${toRoman(n + 1)}.`
    };
  }
  if (kind === 'clock') {
    const h = rnd(1, 12);
    const d = rnd(1, 4);
    const t = ((h + d - 1) % 12) + 1;
    return {
      kind,
      text: `A kismutató ezen a számon áll: ${toRoman(h)}. Hol áll ${d} óra múlva?`,
      answer: toRoman(t),
      options: fill(toRoman(t), [toRoman(((h - d - 1 + 24) % 12) + 1), toRoman((t % 12) + 1), toRoman(((t + 10) % 12) + 1)], () => toRoman(rnd(1, 12))),
      explain: `${toRoman(h)} = ${h}. ${d} órával később ${t} óra lesz: ${toRoman(t)}.`
    };
  }
  const m = rnd(1, 12);
  return {
    kind: 'month',
    text: `Melyik hónap ez: ${toRoman(m)}.?`,
    answer: MONTHS[m - 1],
    options: fill(MONTHS[m - 1], [MONTHS[m % 12], MONTHS[(m + 10) % 12], MONTHS[(m + 1) % 12]], () => MONTHS[rnd(0, 11)]),
    explain: `${toRoman(m)} = ${m}. A ${m}. hónap: ${MONTHS[m - 1]}.`
  };
};
