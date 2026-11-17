// Segédfüggvények és labor-generátorok a 2. leckéhez (Számszomszédok, kerekítés 1000-ig).
import { rnd, shuffle } from '../szamok-1000-ig/Numbers1000G3Parts';

export const roundTen = (n: number) => Math.round(n / 10) * 10;
export const roundHundred = (n: number) => Math.round(n / 100) * 100;

// ---------------------------------------------------------------------------
// Labor I – Kerekítsd kétféleképpen!
// ---------------------------------------------------------------------------
export interface TwoWayTask {
  n: number;
  tenOpts: number[];
  hunOpts: number[];
}

/** Véletlen szám 101–999 között; sok a „csapdaszám” (pl. 349, 846), és a 950 fölötti. */
export const makeTwoWay = (prev?: number): TwoWayTask => {
  let n = 0;
  do {
    const r = Math.random();
    if (r < 0.3) n = rnd(1, 9) * 100 + 40 + rnd(5, 9); // tízes jegye 4, egyes 5–9: kétszeri kerekítés csapdája
    else if (r < 0.5) n = rnd(951, 999);
    else if (r < 0.6) n = rnd(11, 99) * 10 + 5;
    else n = rnd(101, 999);
  } while (n === prev || n % 10 === 0);
  const lt = Math.floor(n / 10) * 10;
  const lh = Math.floor(n / 100) * 100;
  const tenSet = [lt, lt + 10];
  const extraTen = roundHundred(n);
  if (!tenSet.includes(extraTen)) tenSet.push(extraTen);
  const hunSet = [lh, lh + 100];
  const extraHun = roundTen(n);
  if (!hunSet.includes(extraHun)) hunSet.push(extraHun);
  return { n, tenOpts: shuffle(tenSet), hunOpts: shuffle(hunSet) };
};

// ---------------------------------------------------------------------------
// Labor II – Gondoltam egy számra (melyik számok illenek?)
// ---------------------------------------------------------------------------
export type GuessKind = 'ten' | 'hundred';
export interface GuessTask {
  kind: GuessKind;
  target: number;
  chips: number[];
}

const fits = (kind: GuessKind, target: number, v: number) => (kind === 'ten' ? roundTen(v) : roundHundred(v)) === target;

export const makeGuess = (prevTarget?: number): GuessTask => {
  for (;;) {
    const kind: GuessKind = Math.random() < 0.5 ? 'ten' : 'hundred';
    const target = kind === 'ten' ? rnd(11, 100) * 10 : rnd(2, 10) * 100;
    if (target === prevTarget) continue;
    const span = kind === 'ten' ? 5 : 50;
    const good = new Set<number>();
    let guard = 0;
    const want = rnd(3, 5);
    while (good.size < want && guard++ < 200) {
      const v = target + rnd(-span, span - 1);
      if (v >= 1 && v <= 1000 && v !== target && fits(kind, target, v)) good.add(v);
    }
    // tipikus hibák: a határ túloldala, a „másik” kerekítés, közeli, de rossz számok
    const traps = kind === 'ten'
      ? [target + 5, target - 6, target + 9, target - 9, target + 15, target - 12]
      : [target + 50, target - 51, target + 60, target - 70, target + 99, target - 90];
    const bad = new Set<number>();
    for (const v of shuffle(traps)) if (bad.size < 8 - good.size && v >= 1 && v <= 1000 && !fits(kind, target, v)) bad.add(v);
    if (good.size + bad.size !== 8 || good.size < 2) continue;
    return { kind, target, chips: shuffle([...good, ...bad]) };
  }
};

export const guessFits = fits;
