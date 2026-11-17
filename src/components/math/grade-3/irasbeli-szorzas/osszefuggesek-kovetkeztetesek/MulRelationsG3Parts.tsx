// ---------------------------------------------------------------------------
// Segédek a „4. Összefüggések, következtetések” leckéhez (XIII. Írásbeli szorzás).
// Véletlen feladatok a két laborhoz – minden szám 1000-ig.
// ---------------------------------------------------------------------------

export const rnd = (lo: number, hi: number) => lo + Math.floor(Math.random() * (hi - lo + 1));
export const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

/** Hogyan változik a szorzat? */
export type ChangeKind = 'x2' | 'x3' | 'x10' | 'same';

export const CHANGE_LABEL: Record<ChangeKind, string> = {
  x2: '2-szeres lesz',
  x3: '3-szoros lesz',
  x10: '10-szeres lesz',
  same: 'Nem változik'
};

export interface ChangeTask {
  a: number;
  b: number;
  p: number;
  /** az új tényezők */
  a2: number;
  b2: number;
  p2: number;
  kind: ChangeKind;
  /** mi történt a tényezőkkel – rövid felirat a nyilakra */
  opA: string;
  opB: string;
}

/** Labor I: egy ismert szorzat, a tényezők megváltoznak. */
export const genChange = (): ChangeTask => {
  for (let t = 0; t < 300; t++) {
    const kind = pick<ChangeKind>(['x2', 'x3', 'x10', 'same']);
    let a = 0;
    let b = 0;
    let a2 = 0;
    let b2 = 0;
    let opA = '';
    let opB = '';
    if (kind === 'x2' || kind === 'x3') {
      const k = kind === 'x2' ? 2 : 3;
      a = rnd(2, 4);
      b = 10 * rnd(2, 9);
      if (Math.random() < 0.5) {
        a2 = a * k;
        b2 = b;
        opA = `· ${k}`;
      } else {
        a2 = a;
        b2 = b * k;
        opB = `· ${k}`;
      }
    } else if (kind === 'x10') {
      a = rnd(2, 9);
      b = rnd(2, 9);
      if (Math.random() < 0.5) {
        a2 = a;
        b2 = b * 10;
        opB = '· 10';
      } else {
        a2 = a * 10;
        b2 = b;
        opA = '· 10';
      }
    } else {
      a = pick([2, 4, 6, 8]);
      b = 10 * rnd(2, 9);
      if (Math.random() < 0.5) {
        a2 = a / 2;
        b2 = b * 2;
        opA = ': 2';
        opB = '· 2';
      } else {
        a2 = a * 2;
        b2 = b / 2;
        opA = '· 2';
        opB = ': 2';
        if (b % 20 !== 0) continue;
      }
    }
    const p = a * b;
    const p2 = a2 * b2;
    if (p2 > 1000 || !Number.isInteger(a2) || !Number.isInteger(b2) || a2 < 2 || b2 < 2) continue;
    return { a, b, p, a2, b2, p2, kind, opA, opB };
  }
  return { a: 4, b: 30, p: 120, a2: 8, b2: 30, p2: 240, kind: 'x2', opA: '· 2', opB: '' };
};

export const changeFactor = (k: ChangeKind) => (k === 'x2' ? 2 : k === 'x3' ? 3 : k === 'x10' ? 10 : 1);

export interface PriceTask {
  item: string;
  unit: string;
  n1: number;
  price1: number;
  n2: number;
  times: number;
  price2: number;
}

const ITEMS: { item: string; unit: string }[] = [
  { item: 'mézeskalács', unit: 'db' },
  { item: 'füzet', unit: 'db' },
  { item: 'ceruza', unit: 'db' },
  { item: 'lufi', unit: 'db' },
  { item: 'virághagyma', unit: 'db' },
  { item: 'képeslap', unit: 'db' },
  { item: 'radír', unit: 'db' },
  { item: 'cukorka', unit: 'dkg' }
];

/** Labor II: „n1 db → price1 Ft, n2 db → ? Ft”, ahol n2 = n1 · times. */
export const genPrice = (): PriceTask => {
  for (let t = 0; t < 300; t++) {
    const { item, unit } = pick(ITEMS);
    const n1 = pick([2, 3, 4, 5]);
    const times = pick([2, 3, 4]);
    const n2 = n1 * times;
    if (n2 > 15) continue;
    const price1 = 10 * rnd(6, 45);
    const price2 = price1 * times;
    if (price2 > 1000) continue;
    // a „darabszámmal szoroztam” hibát ne lehessen összekeverni a jó válasszal
    if (price1 * n2 === price2) continue;
    return { item, unit, n1, price1, n2, times, price2 };
  }
  return { item: 'füzet', unit: 'db', n1: 2, price1: 180, n2: 6, times: 3, price2: 540 };
};
