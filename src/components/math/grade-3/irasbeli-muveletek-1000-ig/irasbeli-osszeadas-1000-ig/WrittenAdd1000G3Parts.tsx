import React from 'react';
import { addSteps, AddStep, spokenStep, suffixA } from '../../irasbeli-osszeadas/irasbeli-osszeadas/WrittenAddG3Column';
import { FONT, rnd, shuffle, QFig, ItemIcon, ItemKind, PriceTag } from '../../irasbeli-osszeadas/haromjegyu-szamok-osszeadasa/ThreeDigitAddG3Parts';

// ---------------------------------------------------------------------------
// Segédek a XII. fejezet 1. leckéjéhez (Írásbeli összeadás 1000-ig).
// Az írásbeli összeadás rajza a VII. fejezet újrahasznosítható komponense
// (WrittenAddG3Column); itt csak a 1000-es számkör kiegészítései vannak:
// több tag, „maradt 2”, és a pont 1000 összeg (az 1 az ezresek helyére kerül).
// ---------------------------------------------------------------------------

export { FONT, rnd, shuffle, QFig, ItemIcon, PriceTag };
export type { ItemKind };

export const UNK = '#dc2626';
export const GREEN = '#15803d';

export const sumOf = (xs: number[]) => xs.reduce((a, b) => a + b, 0);

/** Hány oszlop kell: 4, ha az összeg 1000 (ezres is van), különben 3. */
export const colsFor = (xs: number[]) => (sumOf(xs) >= 1000 ? 4 : 3);

/** A lépések (egyesek, tízesek, százasok). A 1000-es összegnél a százasok után „maradt 1”. */
export const steps3 = (xs: number[]): AddStep[] => addSteps(xs, 3);

/** A maradék-jelek a `carries` prophoz az első `upTo` lépés után (a jel a következő oszlop fölé kerül). */
export const carryMarksAdd = (st: AddStep[], upTo: number, cols = 3): (number | null)[] =>
  Array.from({ length: cols }).map((_, i) => (i > 0 && i - 1 < upTo && st[i - 1] && st[i - 1].carryOut ? st[i - 1].carryOut : null));

/** Az összeg első k jegye jobbról (a többi még üres). */
export const partialSum = (sum: number, k: number, cols = 3) =>
  String(sum)
    .padStart(cols, ' ')
    .split('')
    .map((ch, i) => (cols - 1 - i < k ? ch : ' '))
    .join('');

/** Kimondott lépés (a VII. fejezet formája): „8 meg 5 meg 9 az 22. Leírom a 2-t, maradt 2.” */
export const spokenAdd = (s: AddStep) => spokenStep(s);
export const THOUSAND_TEXT = 'Az 1-et leírom az ezresek helyére.';

/** Tipikus hiba 1: minden maradékot elfelejt (csak az oszlopösszeg utolsó jegyét írja le). */
export const forgotAll = (xs: number[]) =>
  [0, 1, 2].reduce((s, c) => s + (xs.reduce((t, x) => t + (Math.floor(x / 10 ** c) % 10), 0) % 10) * 10 ** c, 0);

/** Tipikus hiba 2: ha 2 maradt, akkor is csak 1-et visz tovább. */
export const onlyOne = (xs: number[]) => {
  let s = 0;
  let c = 0;
  for (let i = 0; i < 4; i++) {
    const t = xs.reduce((a, x) => a + (Math.floor(x / 10 ** i) % 10), 0) + c;
    s += (t % 10) * 10 ** i;
    c = t >= 10 ? 1 : 0;
  }
  return s;
};

/** Van-e olyan oszlop, ahol 2 (vagy több) maradt? */
export const hasCarryTwo = (xs: number[]) => steps3(xs).some((s) => s.carryOut >= 2);

/** 4 különböző válasz: a helyes + a rosszak (0..1000), szükség esetén ±10-es kitöltéssel. */
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

/** Visszajelzés egy beírt jegyre (labor). col 3 = az ezres jegy (csak a 1000-es összegnél). */
export const addHint = (s: AddStep | null, d: number): string => {
  if (!s) return d === 1 ? '' : 'A százasoknál maradt 1. Ezt írd le az ezresek helyére!';
  if (d === s.write) return '';
  const own = s.digits.reduce((a, x) => a + x, 0);
  if (s.carryIn > 0 && d === own % 10) return `Ne felejtsd el a maradékot! ${s.digits.join(' meg ')} az ${own}, meg ${s.carryIn} az ${s.sum}.`;
  if (s.carryIn === 2 && d === (own + 1) % 10) return `Nem 1, hanem 2 maradt! ${own} meg 2 az ${s.sum}.`;
  if (s.sum >= 10 && d === Math.floor(s.sum / 10)) return `A ${s.sum}-ból csak az utolsó jegyet írd le! A többi a maradék.`;
  return `Add össze újra: ${s.digits.join(' + ')}${s.carryIn ? ` + ${s.carryIn}` : ''} = ?`;
};

// ---------------------------------------------------------------------------
// Feladatgenerátor a laborhoz
// ---------------------------------------------------------------------------
export type AddKind = 'ket' | 'harom' | 'negy' | 'ezer';
export const ADD_KIND_LABEL: Record<AddKind, string> = {
  ket: 'Két tag',
  harom: 'Három tag',
  negy: 'Négy tag',
  ezer: 'Pont 1000'
};

const noZeroEnd = (n: number) => n % 10 !== 0 && Math.floor(n / 10) % 10 !== 0;

export const makeAddTask = (kind: AddKind): number[] => {
  for (;;) {
    if (kind === 'ket') {
      const a = rnd(215, 689);
      const b = rnd(128, 489);
      if (!noZeroEnd(a) || !noZeroEnd(b) || a + b > 999 || a + b < 600) continue;
      const st = steps3([a, b]);
      if (!st[0].carryOut || !st[1].carryOut) continue;
      return [a, b];
    }
    if (kind === 'harom') {
      const xs = [rnd(121, 389), rnd(115, 349), rnd(106, 299)];
      if (!xs.every(noZeroEnd) || sumOf(xs) > 999) continue;
      const st = steps3(xs);
      if (!st[0].carryOut || !st[1].carryOut) continue;
      return xs;
    }
    if (kind === 'negy') {
      const xs = [rnd(111, 289), rnd(105, 249), rnd(102, 219), rnd(101, 199)];
      if (!xs.every(noZeroEnd) || sumOf(xs) > 999) continue;
      if (!steps3(xs)[0].carryOut) continue;
      return xs;
    }
    // ezer: két vagy három tag, az összeg pont 1000
    if (rnd(0, 1)) {
      const a = rnd(123, 877);
      if (!noZeroEnd(a) || !noZeroEnd(1000 - a)) continue;
      return [a, 1000 - a];
    }
    const a = rnd(152, 398);
    const b = rnd(147, 389);
    const c = 1000 - a - b;
    if (c < 101 || c > 499 || ![a, b, c].every(noZeroEnd)) continue;
    return shuffle([a, b, c]);
  }
};

// ---------------------------------------------------------------------------
// Kis rajzelemek
// ---------------------------------------------------------------------------

/** Pénztárca a benne lévő összeggel. */
export const Wallet: React.FC<{ x: number; y: number; text: string; w?: number }> = ({ x, y, text, w = 92 }) => (
  <g fontFamily={FONT}>
    <rect x={x} y={y} width={w} height="44" rx="9" fill="#a16207" stroke="#713f12" strokeWidth="2" />
    <rect x={x + w - 26} y={y + 12} width="26" height="20" rx="5" fill="#ca8a04" stroke="#713f12" strokeWidth="1.6" />
    <circle cx={x + w - 13} cy={y + 22} r="3.4" fill="#fde68a" />
    <text x={x + (w - 26) / 2} y={y + 28} textAnchor="middle" fontSize="15" fontWeight="bold" fill="#fff">{text}</text>
  </g>
);

/** Szalag felirattal (szalagos modell). */
export const Bar: React.FC<{ x: number; y: number; w: number; label: string; fill: string; h?: number; fs?: number }> = ({ x, y, w, label, fill, h = 22, fs = 12.5 }) => (
  <g fontFamily={FONT}>
    <rect x={x} y={y} width={w} height={h} rx="4" fill={fill} stroke="#334155" strokeWidth="1.2" />
    <text x={x + w / 2} y={y + h / 2 + fs * 0.36} textAnchor="middle" fontSize={fs} fontWeight="bold" fill={label.includes('?') ? UNK : '#0f172a'}>{label}</text>
  </g>
);

const artD = (d: number) => (d === 1 || d === 5 ? 'az' : 'a');

/** Egy lépés kimondva, rövid sorokra tördelve (ábrákhoz). */
export const stepLines = (s: AddStep): { t: string; green?: boolean }[] => {
  const own = s.digits.reduce((a, d) => a + d, 0);
  const out: { t: string; green?: boolean }[] = [{ t: `${s.digits.join(' meg ')} az ${own}${s.carryIn ? ',' : '.'}` }];
  if (s.carryIn) out.push({ t: `meg ${s.carryIn} az ${s.sum}.`, green: true });
  out.push({ t: `Leírom ${artD(s.write)} ${s.write}-${suffixA(s.write)}${s.carryOut ? ',' : '.'}` });
  if (s.carryOut) out.push({ t: `maradt ${s.carryOut}.`, green: true });
  return out;
};
