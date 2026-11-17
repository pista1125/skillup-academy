import React from 'react';
import { subSteps, SubStep, spokenSubStep, suffixHoz, ColDigit } from '../../irasbeli-kivonas/irasbeli-kivonas/WrittenSubG3Column';
import { FONT, rnd, shuffle, QFig, ItemIcon, ItemKind, PriceTag } from '../../irasbeli-osszeadas/haromjegyu-szamok-osszeadasa/ThreeDigitAddG3Parts';

// ---------------------------------------------------------------------------
// Segédek a XII. fejezet 2. leckéjéhez (Írásbeli kivonás 1000-ig).
// Módszer: a hagyományos PÓTLÁSOS-MARADÉKOS írásbeli kivonás (a tanító döntése),
// a VIII. fejezet újrahasznosítható WrittenSubG3Column komponensével.
// Újdonság: 0 a kisebbítendőben (704 − 258, 600 − 274) és az 1000-ből való kivonás.
// Az 1000-nél 4 oszlop van; az ezreseknél „1-hez 0, az 1” – a 0-t nem írjuk le.
// ---------------------------------------------------------------------------

export { FONT, rnd, shuffle, QFig, ItemIcon, PriceTag, suffixHoz };
export type { ItemKind, SubStep };

export const UNK = '#dc2626';
export const GREEN = '#15803d';

export const colsSub = (a: number) => (a >= 1000 ? 4 : 3);
export const stepsSub = (a: number, b: number): SubStep[] => subSteps(a, b, colsSub(a));

/** Az ezres oszlop lépése (csak az 1000-nél): nincs leírandó jegy. */
export const isLeadStep = (s: SubStep, all: SubStep[]) => s.col === all.length - 1 && s.col === 3 && s.write === 0;

const PLs = ['egyesek', 'tízesek', 'százasok', 'ezresek'];
export const placePluralSub = (col: number) => PLs[col] ?? '';
export const capFirst = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);

/** Kimondott lépés. Az 1000 ezres oszlopánál: „A maradék 1. 1-hez 0, az 1. Az elejére 0-t nem írunk.” */
export const spokenSub = (s: SubStep, all: SubStep[]) =>
  isLeadStep(s, all) ? `A maradék 1. 1-hez 0, az 1. A szám elejére 0-t nem írunk.` : spokenSubStep(s);

/** A különbség első k jegye jobbról (a többi még üres). */
export const partialDiff = (d: number, k: number, cols: number) =>
  String(d)
    .padStart(cols, ' ')
    .split('')
    .map((ch, i) => (cols - 1 - i < k ? ch : ' '))
    .join('');

/** Maradék-jelek a `carries` prophoz az első `upTo` lépés után. */
export const carryMarksSub = (st: SubStep[], upTo: number): ColDigit[] => st.map((_, i) => (i > 0 && i - 1 < upTo && st[i - 1].carryOut ? 1 : null));

/** Tipikus hiba 1: a maradékot nem adja hozzá a következő kivonandó-jegyhez (3 jegyre). */
export const forgotSub = (a: number, b: number) =>
  [0, 1, 2].reduce((s, c) => {
    const d = Math.floor(a / 10 ** c) % 10;
    const n = Math.floor(b / 10 ** c) % 10;
    return s + ((d < n ? d + 10 : d) - n) * 10 ** c;
  }, 0);
/** Tipikus hiba 2: fordítva pótol (a kisebb jegytől a nagyobbig). */
export const swappedSub = (a: number, b: number) => [0, 1, 2].reduce((s, c) => s + Math.abs((Math.floor(a / 10 ** c) % 10) - (Math.floor(b / 10 ** c) % 10)) * 10 ** c, 0);

/** Visszajelzés egy beírt számjegyre. */
export const subHint = (st: SubStep, d: number): string => {
  if (d === st.write) return '';
  if (st.carryIn && d === (st.digit < st.need ? st.digit + 10 : st.digit) - st.need) return `Ne felejtsd el a maradékot! ${st.need} meg 1 az ${st.from}.`;
  if (st.carryOut && d === st.from - st.digit) return `Fordítva! A kivonandótól pótolj: ${st.from}-${suffixHoz(st.from)} mennyi kell, hogy ${st.target} legyen?`;
  if (st.digit === 0 && st.carryOut) return `A 0-ig nem tudsz felfelé számolni. Pótolj 10-ig: ${st.from}-${suffixHoz(st.from)} mennyi kell, hogy ${st.target} legyen?`;
  return `Számolj fel: ${st.from}-${suffixHoz(st.from)} mennyi kell, hogy ${st.target} legyen?`;
};

/** 4 különböző válasz (0..1000). */
export const opts4 = (correct: number, wrong: number[], max = 1000): number[] => {
  const out = [correct];
  wrong.forEach((w) => {
    if (w >= 0 && w <= max && !out.includes(w) && out.length < 4) out.push(w);
  });
  let k = 1;
  while (out.length < 4) {
    const w = correct + (k % 2 ? 10 * k : -10 * k);
    if (w >= 0 && w <= max && !out.includes(w)) out.push(w);
    k++;
  }
  return shuffle(out);
};

// ---------------------------------------------------------------------------
// Feladatgenerátor a laborhoz
// ---------------------------------------------------------------------------
export type SubKind = 'ismetles' | 'nulla' | 'kerek' | 'ezer';
export const SUB_KIND_LABEL: Record<SubKind, string> = {
  ismetles: 'Ismétlés',
  nulla: '0 a tízeseknél',
  kerek: 'Kerek százasból',
  ezer: 'Az 1000-ből'
};

export const makeSubTask = (kind: SubKind): [number, number] => {
  for (;;) {
    if (kind === 'ezer') {
      const b = rnd(102, 898);
      if (b % 10 === 0) continue;
      return [1000, b];
    }
    let a: number;
    if (kind === 'kerek') a = rnd(3, 9) * 100;
    else if (kind === 'nulla') a = rnd(3, 9) * 100 + rnd(1, 8);
    else a = rnd(512, 989);
    const b = rnd(108, a - 60);
    if (b % 10 === 0) continue;
    if (kind === 'ismetles') {
      if (a % 10 === 0 || Math.floor(a / 10) % 10 === 0) continue;
      const st = subSteps(a, b);
      if (!st[0].carryOut || !st[1].carryOut) continue;
    }
    if (kind === 'nulla' && !subSteps(a, b)[0].carryOut) continue;
    if (a - b < 100) continue;
    return [a, b];
  }
};

// ---------------------------------------------------------------------------
// Rajzelemek
// ---------------------------------------------------------------------------

/** Sáv 0-tól 1000-ig: a kész rész zöld, a hiányzó rész piros „?”. */
export const ThousandBar: React.FC<{ x: number; y: number; w: number; done: number; label?: string; h?: number; showLabels?: boolean }> = ({ x, y, w, done, label, h = 26, showLabels = true }) => {
  const k = w / 1000;
  return (
    <g fontFamily={FONT}>
      <rect x={x} y={y} width={w} height={h} rx="5" fill="#fff" stroke="#94a3b8" strokeWidth="1.4" />
      <rect x={x + done * k} y={y} width={w - done * k} height={h} rx="5" fill="#fee2e2" stroke={UNK} strokeWidth="1.6" strokeDasharray="5 3" />
      <rect x={x} y={y} width={done * k} height={h} rx="5" fill="#bbf7d0" stroke={GREEN} strokeWidth="1.6" />
      {Array.from({ length: 11 }).map((_, i) => (
        <line key={i} x1={x + i * 100 * k} y1={y + h} x2={x + i * 100 * k} y2={y + h + (i % 5 === 0 ? 8 : 5)} stroke="#475569" strokeWidth="1.2" />
      ))}
      {showLabels && (
        <>
          <text x={x} y={y + h + 20} textAnchor="middle" fontSize="11" fill="#475569">0</text>
          <text x={x + w / 2} y={y + h + 20} textAnchor="middle" fontSize="11" fill="#475569">500</text>
          <text x={x + w} y={y + h + 20} textAnchor="middle" fontSize="11" fill="#475569">1000</text>
        </>
      )}
      <text x={x + (done * k) / 2} y={y + h / 2 + 5} textAnchor="middle" fontSize="14" fontWeight="bold" fill="#14532d">{label ?? done}</text>
      <text x={x + done * k + (w - done * k) / 2} y={y + h / 2 + 5} textAnchor="middle" fontSize="15" fontWeight="bold" fill={UNK}>?</text>
    </g>
  );
};

/** Pénztárca a benne lévő összeggel. */
export const Wallet: React.FC<{ x: number; y: number; text: string; w?: number }> = ({ x, y, text, w = 92 }) => (
  <g fontFamily={FONT}>
    <rect x={x} y={y} width={w} height="44" rx="9" fill="#a16207" stroke="#713f12" strokeWidth="2" />
    <rect x={x + w - 22} y={y + 12} width="22" height="20" rx="5" fill="#ca8a04" stroke="#713f12" strokeWidth="1.6" />
    <circle cx={x + w - 11} cy={y + 22} r="3.2" fill="#fde68a" />
    <text x={x + (w - 22) / 2} y={y + 28} textAnchor="middle" fontSize="14" fontWeight="bold" fill="#fff">{text}</text>
  </g>
);
