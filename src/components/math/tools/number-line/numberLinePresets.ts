import { PresetExample } from './types';

export const NUMBER_LINE_PRESETS: PresetExample[] = [
  // --- Egész számok ---
  {
    id: 'int-1',
    category: 'integers',
    badge: 'Alappélda',
    title: '-2 + (-3) = -5',
    description: 'Pozitív és negatív előjel találkozása: a lépés iránya balra vált.',
    mode: 'integers',
    start: -2,
    op: '+',
    operand: -3
  },
  {
    id: 'int-2',
    category: 'integers',
    badge: 'Előjelszabály',
    title: '-2 - (-3) = 1',
    description: 'Két negatív előjel (- és -) összeadássá válik: jobbra lépünk.',
    mode: 'integers',
    start: -2,
    op: '-',
    operand: -3
  },
  {
    id: 'int-3',
    category: 'integers',
    badge: 'Átmenet a nullán',
    title: '3 + (-5) = -2',
    description: 'Pozitív számból indulva átlépünk a nullán a negatív tartományba.',
    mode: 'integers',
    start: 3,
    op: '+',
    operand: -5
  },
  {
    id: 'int-4',
    category: 'integers',
    badge: 'Negatívból kivonás',
    title: '-4 - (+2) = -6',
    description: 'Negatív számból pozitívat vonunk ki: még mélyebbre jutunk a negatívok felé.',
    mode: 'integers',
    start: -4,
    op: '-',
    operand: 2
  },

  // --- Törtek ---
  {
    id: 'frac-1',
    category: 'fractions',
    badge: 'Negyedek',
    title: '3/4 + 2/4 = 5/4 (1 1/4)',
    description: 'Egységszakasz 4 részre osztva. A kapott áltört vegyes törtként is értelmezhető.',
    mode: 'fractions',
    denominator: 4,
    start: 0.75,
    op: '+',
    operand: 0.5,
    fractionStart: { num: 3, den: 4 },
    fractionStep: { num: 2, den: 4 }
  },
  {
    id: 'frac-2',
    category: 'fractions',
    badge: 'Harmadok & Negatív',
    title: '-1/3 + (-2/3) = -1',
    description: 'Negatív törtből indulva balra lépünk 2 harmadot, elérve a -1 egész számot.',
    mode: 'fractions',
    denominator: 3,
    start: -1 / 3,
    op: '+',
    operand: -2 / 3,
    fractionStart: { num: -1, den: 3 },
    fractionStep: { num: -2, den: 3 }
  },
  {
    id: 'frac-3',
    category: 'fractions',
    badge: 'Ötödök kivonása',
    title: '4/5 - 3/5 = 1/5',
    description: 'Törtek kivonása azonos nevező esetén: 3 osztással lépünk balra.',
    mode: 'fractions',
    denominator: 5,
    start: 4 / 5,
    op: '-',
    operand: 3 / 5,
    fractionStart: { num: 4, den: 5 },
    fractionStep: { num: 3, den: 5 }
  },
  {
    id: 'frac-4',
    category: 'fractions',
    badge: 'Vegyes tört átlépése',
    title: '5/6 + 4/6 = 9/6 (1 3/6 = 1 1/2)',
    description: 'Az 1 egész átlépése hatodok beosztásával.',
    mode: 'fractions',
    denominator: 6,
    start: 5 / 6,
    op: '+',
    operand: 4 / 6,
    fractionStart: { num: 5, den: 6 },
    fractionStep: { num: 4, den: 6 }
  },

  // --- Nagyságrendek ---
  {
    id: 'mag-1',
    category: 'magnitudes',
    badge: '100-as skála',
    title: '400 + (-650) = -250',
    description: 'Százas nagyságrendű lépés: 400-ból 650-et balra haladva a -250-be jutunk.',
    mode: 'magnitudes',
    magnitude: 100,
    start: 400,
    op: '+',
    operand: -650
  },
  {
    id: 'mag-2',
    category: 'magnitudes',
    badge: '100-as kivonás',
    title: '-300 - (-500) = 200',
    description: 'Negatív szám kivonása 100-as léptékben (+500 jobbra).',
    mode: 'magnitudes',
    magnitude: 100,
    start: -300,
    op: '-',
    operand: -500
  },
  {
    id: 'mag-3',
    category: 'magnitudes',
    badge: '1000-es skála',
    title: '2000 - 3500 = -1500',
    description: 'Ezres nagyságrend: 2000-ből 3500-at visszalépve -1500 az eredmény.',
    mode: 'magnitudes',
    magnitude: 1000,
    start: 2000,
    op: '-',
    operand: 3500
  },
  {
    id: 'mag-4',
    category: 'magnitudes',
    badge: '1000-es negatív',
    title: '-4000 + (-3000) = -7000',
    description: 'Nagy negatív értékek összeadása.',
    mode: 'magnitudes',
    magnitude: 1000,
    start: -4000,
    op: '+',
    operand: -3000
  }
];
