import { mulSteps } from './WrittenMulG3Column';

// ---------------------------------------------------------------------------
// Labor-generátorok a 3. leckéhez (Írásbeli szorzás egyjegyű szorzóval).
// Szorzandó: háromjegyű (101–499), szorzó: 2–9, szorzat ≤ 999.
// ---------------------------------------------------------------------------

export const rndInt = (a: number, b: number) => a + Math.floor(Math.random() * (b - a + 1));

export type MulKind = 'nincs' | 'egyes' | 'tizes' | 'ketto';
export const MUL_KIND_LABEL: Record<MulKind, string> = {
  nincs: 'Váltás nélkül',
  egyes: 'Váltás az egyeseknél',
  tizes: 'Váltás a tízeseknél',
  ketto: 'Kétszer váltunk'
};
export const MUL_KINDS: MulKind[] = ['nincs', 'egyes', 'tizes', 'ketto'];

/** Melyik fajta: hol kell váltani (hol „marad” valami)? */
export const mulKindOf = (a: number, m: number): MulKind => {
  const s = mulSteps(a, m);
  const ce = s[0].carryOut > 0;
  const ct = s.length > 1 && s[1].carryOut > 0;
  if (ce && ct) return 'ketto';
  if (ce) return 'egyes';
  if (ct) return 'tizes';
  return 'nincs';
};

export const genMul = (kind: MulKind): { a: number; m: number } => {
  for (let k = 0; k < 5000; k++) {
    const m = kind === 'nincs' ? rndInt(2, 4) : rndInt(2, 9);
    const a = rndInt(101, 499);
    if (a * m > 999) continue;
    if (mulKindOf(a, m) === kind) return { a, m };
  }
  return { a: 178, m: 4 };
};

export const randomMulKind = (): MulKind => MUL_KINDS[rndInt(0, 3)];

// ---------------------------------------------------------------------------
// Labor II – „Hol a hiba?”: tipikus gyerekhibák szimulálása
//   maradek: elfelejtette hozzáadni a maradékot egy oszlopnál
//   csere:   fordítva írta – a maradékot írta le, az egyeseket „vitte tovább”
// ---------------------------------------------------------------------------
export type HuntType = 'jo' | 'maradek' | 'csere';

export const simulateMul = (a: number, m: number, errCol: number | null, type: HuntType): number => {
  const ds = String(a).split('').reverse().map(Number);
  let carry = 0;
  const out: string[] = [];
  ds.forEach((d, col) => {
    const prod = d * m;
    let total = prod + carry;
    if (col === errCol && type === 'maradek') total = prod;
    const last = col === ds.length - 1;
    if (last) {
      out.unshift(String(total));
      return;
    }
    if (col === errCol && type === 'csere') {
      out.unshift(String(Math.floor(total / 10)));
      carry = total % 10;
    } else {
      out.unshift(String(total % 10));
      carry = Math.floor(total / 10);
    }
  });
  return Number(out.join(''));
};

export interface Hunt {
  a: number;
  m: number;
  type: HuntType;
  /** az első hibás oszlop (jobbról), ha van */
  errCol: number | null;
  shown: number;
}

export const genHunt = (): Hunt => {
  const r = Math.random();
  const type: HuntType = r < 0.3 ? 'jo' : r < 0.65 ? 'maradek' : 'csere';
  for (let k = 0; k < 5000; k++) {
    const { a, m } = genMul(Math.random() < 0.5 ? 'ketto' : Math.random() < 0.5 ? 'egyes' : 'tizes');
    const steps = mulSteps(a, m);
    if (type === 'jo') return { a, m, type, errCol: null, shown: a * m };
    const cands =
      type === 'maradek'
        ? steps.filter((s) => s.carryIn > 0).map((s) => s.col)
        : steps.filter((s) => s.col < steps.length - 1 && s.total >= 10 && s.total % 10 !== Math.floor(s.total / 10)).map((s) => s.col);
    if (!cands.length) continue;
    const errCol = cands[rndInt(0, cands.length - 1)];
    const shown = simulateMul(a, m, errCol, type);
    if (shown === a * m || shown > 999 || shown < 100) continue;
    return { a, m, type, errCol, shown };
  }
  return { a: 178, m: 4, type: 'maradek', errCol: 1, shown: 682 };
};

/** Tízesre kerekítés (becsléshez). */
export const roundTens = (v: number) => Math.round(v / 10) * 10;
