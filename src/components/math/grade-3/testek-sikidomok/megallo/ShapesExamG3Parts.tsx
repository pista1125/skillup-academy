import React from 'react';
import { SolidKind, SOLID_INFO } from '../a-testek/SolidsG3Parts';
import { RightAngle, rnd, pick, shuffle, LETTER_PATHS, Heart, House, Tree, Flag } from '../tukrozesek-szimmetria/SymmetryG3Parts';

// ---------------------------------------------------------------------------
// X. Testek, síkidomok – Megálló: közös síkidom-rajzok és a két labor logikája.
// Testek: a-testek/SolidsG3Parts (Solid, FitBuilding, PlanGrid), téglatest/kocka:
// a-teglatest-es-a-kocka/CuboidG3Parts (Box, NetGrid), tükrözés: tukrozesek-szimmetria/SymmetryG3Parts.
// ---------------------------------------------------------------------------

export const FONT = 'system-ui, Segoe UI, sans-serif';
export const INK = '#1e293b';
export const UNK = '#dc2626';

export type PolyKind =
  | 'tri'
  | 'triIso'
  | 'triEq'
  | 'triRight'
  | 'square'
  | 'rect'
  | 'para'
  | 'trap'
  | 'kite'
  | 'quad'
  | 'pent'
  | 'house'
  | 'hex'
  | 'hexL'
  | 'hept'
  | 'oct'
  | 'circle'
  | 'oval'
  | 'halfDisc'
  | 'drop'
  | 'stadium';

const reg = (n: number, rot = -90, R = 0.9): number[][] =>
  Array.from({ length: n }, (_, k) => {
    const a = ((rot + (360 / n) * k) * Math.PI) / 180;
    return [R * Math.cos(a), R * Math.sin(a)];
  });

interface PolyInfo {
  /** egységnyi (−1..1) koordináták; görbe síkidomnál nincs */
  pts?: number[][];
  /** oldalak száma (görbe síkidomnál 0) */
  sides: number;
  /** tükörtengelyek száma (Infinity = akárhány) */
  axes: number;
  name: string;
  fill: string;
  stroke: string;
}

export const POLY: Record<PolyKind, PolyInfo> = {
  tri: { pts: [[-0.85, 0.75], [0.9, 0.55], [-0.3, -0.85]], sides: 3, axes: 0, name: 'háromszög', fill: '#fbcfe8', stroke: '#be185d' },
  triIso: { pts: [[0, -0.9], [0.55, 0.8], [-0.55, 0.8]], sides: 3, axes: 1, name: 'háromszög', fill: '#bbf7d0', stroke: '#15803d' },
  triEq: { pts: reg(3, -90, 0.95).map(([x, y]) => [x, y + 0.2]), sides: 3, axes: 3, name: 'háromszög', fill: '#fecaca', stroke: '#b91c1c' },
  triRight: { pts: [[-0.75, 0.75], [0.85, 0.75], [-0.75, -0.6]], sides: 3, axes: 0, name: 'háromszög', fill: '#fde68a', stroke: '#a16207' },
  square: { pts: [[-0.75, -0.75], [0.75, -0.75], [0.75, 0.75], [-0.75, 0.75]], sides: 4, axes: 4, name: 'négyzet', fill: '#bfdbfe', stroke: '#1d4ed8' },
  rect: { pts: [[-0.95, -0.5], [0.95, -0.5], [0.95, 0.5], [-0.95, 0.5]], sides: 4, axes: 2, name: 'téglalap', fill: '#fde68a', stroke: '#a16207' },
  para: { pts: [[-0.4, -0.5], [0.95, -0.5], [0.4, 0.5], [-0.95, 0.5]], sides: 4, axes: 0, name: 'négyszög', fill: '#c7d2fe', stroke: '#4338ca' },
  trap: { pts: [[-0.45, -0.55], [0.45, -0.55], [0.95, 0.55], [-0.95, 0.55]], sides: 4, axes: 1, name: 'négyszög', fill: '#fed7aa', stroke: '#c2410c' },
  kite: { pts: [[0, -0.95], [0.6, -0.3], [0, 0.95], [-0.6, -0.3]], sides: 4, axes: 1, name: 'négyszög', fill: '#ddd6fe', stroke: '#6d28d9' },
  quad: { pts: [[-0.85, -0.45], [0.55, -0.8], [0.85, 0.7], [-0.6, 0.6]], sides: 4, axes: 0, name: 'négyszög', fill: '#a5f3fc', stroke: '#0e7490' },
  pent: { pts: reg(5, -90, 0.92).map(([x, y]) => [x, y + 0.08]), sides: 5, axes: 5, name: 'ötszög', fill: '#ddd6fe', stroke: '#6d28d9' },
  house: { pts: [[0, -0.9], [0.8, -0.2], [0.8, 0.85], [-0.8, 0.85], [-0.8, -0.2]], sides: 5, axes: 1, name: 'ötszög', fill: '#fecdd3', stroke: '#be123c' },
  hex: { pts: reg(6, 0, 0.92), sides: 6, axes: 6, name: 'hatszög', fill: '#fed7aa', stroke: '#c2410c' },
  hexL: { pts: [[-0.7, -0.85], [-0.1, -0.85], [-0.1, 0.2], [0.75, 0.2], [0.75, 0.8], [-0.7, 0.8]], sides: 6, axes: 0, name: 'hatszög', fill: '#bbf7d0', stroke: '#15803d' },
  hept: { pts: [[-0.9, -0.3], [0.2, -0.3], [0.2, -0.75], [0.92, 0], [0.2, 0.75], [0.2, 0.3], [-0.9, 0.3]], sides: 7, axes: 1, name: 'hétszög', fill: '#e9d5ff', stroke: '#7e22ce' },
  oct: { pts: reg(8, -67.5, 0.92), sides: 8, axes: 8, name: 'nyolcszög', fill: '#fecaca', stroke: '#b91c1c' },
  circle: { sides: 0, axes: Infinity, name: 'kör', fill: '#bbf7d0', stroke: '#15803d' },
  oval: { sides: 0, axes: 2, name: 'ovális', fill: '#bae6fd', stroke: '#0369a1' },
  halfDisc: { sides: 0, axes: 1, name: 'félkör', fill: '#fde68a', stroke: '#a16207' },
  drop: { sides: 0, axes: 1, name: 'csepp alakú síkidom', fill: '#a5f3fc', stroke: '#0e7490' },
  stadium: { sides: 0, axes: 2, name: 'lekerekített síkidom', fill: '#fbcfe8', stroke: '#be185d' }
};

export const POLYGON_KINDS: PolyKind[] = ['tri', 'triIso', 'triEq', 'triRight', 'square', 'rect', 'para', 'trap', 'kite', 'quad', 'pent', 'house', 'hex', 'hexL', 'hept', 'oct'];
export const CURVED_KINDS: PolyKind[] = ['circle', 'oval', 'halfDisc', 'drop', 'stadium'];

/** Síkidom (cx, cy a közepe, r a „sugara” – a rajz kb. 2r széles). */
export const PlaneShape: React.FC<{ kind: PolyKind; cx: number; cy: number; r: number; sw?: number; fill?: string; mark?: boolean }> = ({ kind, cx, cy, r, sw = 2.4, fill, mark = true }) => {
  const info = POLY[kind];
  const f = fill ?? info.fill;
  const P = (x: number, y: number): [number, number] => [cx + x * r, cy + y * r];
  if (info.pts) {
    const pts = info.pts.map(([x, y]) => P(x, y));
    return (
      <g>
        <polygon points={pts.map((p) => p.map((v) => v.toFixed(1)).join(',')).join(' ')} fill={f} stroke={info.stroke} strokeWidth={sw} strokeLinejoin="round" />
        {kind === 'triRight' && mark && r >= 20 && <RightAngle v={P(-0.75, 0.75)} u1={[1, 0]} u2={[0, -1]} r={Math.min(14, r * 0.28)} color={info.stroke} />}
      </g>
    );
  }
  const common = { fill: f, stroke: info.stroke, strokeWidth: sw, strokeLinejoin: 'round' as const };
  if (kind === 'circle') return <circle cx={cx} cy={cy} r={r * 0.85} {...common} />;
  if (kind === 'oval') return <ellipse cx={cx} cy={cy} rx={r * 0.95} ry={r * 0.55} {...common} />;
  if (kind === 'halfDisc') return <path d={`M ${cx - r * 0.9} ${cy + r * 0.45} A ${r * 0.9} ${r * 0.9} 0 0 1 ${cx + r * 0.9} ${cy + r * 0.45} Z`} {...common} />;
  if (kind === 'drop')
    return <path d={`M ${cx} ${cy - r * 0.95} L ${cx + r * 0.52} ${cy + r * 0.05} A ${r * 0.6} ${r * 0.6} 0 1 1 ${cx - r * 0.52} ${cy + r * 0.05} Z`} {...common} />;
  // stadium
  return (
    <path
      d={`M ${cx - r * 0.45} ${cy - r * 0.5} L ${cx + r * 0.45} ${cy - r * 0.5} A ${r * 0.5} ${r * 0.5} 0 0 1 ${cx + r * 0.45} ${cy + r * 0.5} L ${cx - r * 0.45} ${cy + r * 0.5} A ${r * 0.5} ${r * 0.5} 0 0 1 ${cx - r * 0.45} ${cy - r * 0.5} Z`}
      {...common}
    />
  );
};

/** Pálcikák: szakaszok listája rácskoordinátában (egység = s). */
export const Sticks: React.FC<{ segs: [number, number, number, number][]; x: number; y: number; s: number; color?: string }> = ({ segs, x, y, s, color = '#16a34a' }) => (
  <g strokeLinecap="round">
    {segs.map(([a, b, c, d], i) => (
      <line key={i} x1={x + a * s} y1={y + b * s} x2={x + c * s} y2={y + d * s} stroke={color} strokeWidth="6" />
    ))}
  </g>
);

// ---------------------------------------------------------------------------
// Labor I – Vegyes feladatgép
// ---------------------------------------------------------------------------
export type MixedKind = 'plan' | 'sides' | 'axes' | 'mirror' | 'faces';
export interface MixedTask {
  kind: MixedKind;
  prompt: string;
  options: string[];
  answer: string;
  hint: string;
  why: string;
  plan?: number[][];
  poly?: PolyKind;
  d?: number;
  solid?: SolidKind;
}

/** 4 különböző szöveges válasz (a helyes benne van), összekeverve. */
export const mix4 = (answer: string, wrong: string[]): string[] => {
  const out = [answer];
  wrong.forEach((w) => {
    if (!out.includes(w) && out.length < 4) out.push(w);
  });
  let k = 1;
  while (out.length < 4) {
    const n = Number(answer);
    const cand = Number.isFinite(n) ? String(n + k + 1) : String(k);
    if (!out.includes(cand)) out.push(cand);
    k++;
  }
  return shuffle(out);
};

const AXES_POOL: PolyKind[] = ['square', 'rect', 'triEq', 'triIso', 'para', 'circle', 'kite', 'tri', 'house', 'trap'];
export const axesText = (n: number) => (n === Infinity ? 'akárhány' : String(n));

export const makeMixedTask = (kind?: MixedKind): MixedTask => {
  const k: MixedKind = kind ?? pick<MixedKind>(['plan', 'sides', 'axes', 'mirror', 'faces']);
  if (k === 'plan') {
    const plan = [Array.from({ length: 3 }, () => rnd(1, 3)), Array.from({ length: 3 }, () => rnd(1, 3))];
    const sum = plan.flat().reduce((a, b) => a + b, 0);
    return {
      kind: k,
      plan,
      prompt: 'Ez egy építmény alaprajza. Hány kis kocka kell hozzá?',
      answer: String(sum),
      options: mix4(String(sum), ['6', String(sum - 1), String(sum + 1), String(sum + 2)]),
      hint: 'A szám azt mutatja, hány kocka áll ott egymáson. Add össze az összes számot!',
      why: `${plan.flat().join(' + ')} = ${sum}.`
    };
  }
  if (k === 'sides') {
    const poly = pick(POLYGON_KINDS);
    const n = POLY[poly].sides;
    const what = pick(['oldala', 'csúcsa']);
    return {
      kind: k,
      poly,
      prompt: `Hány ${what} van ennek a sokszögnek?`,
      answer: String(n),
      options: mix4(String(n), [String(n - 1), String(n + 1), String(n + 2)]),
      hint: 'Tegyél az ujjad az egyik csúcsra, és haladj körbe! Számolj, amíg vissza nem érsz.',
      why: `${n} oldala és ${n} csúcsa van: ez ${POLY[poly].name}.`
    };
  }
  if (k === 'axes') {
    const poly = pick(AXES_POOL);
    const a = POLY[poly].axes;
    const ans = axesText(a);
    return {
      kind: k,
      poly,
      prompt: 'Hány tükörtengelye van ennek a síkidomnak?',
      answer: ans,
      options: mix4(ans, shuffle(['0', '1', '2', '3', '4', 'akárhány'].filter((x) => x !== ans))),
      hint: 'Hányféleképpen hajthatod félbe úgy, hogy a két fele pontosan fedje egymást?',
      why:
        a === Infinity
          ? 'A kört minden, a közepén átmenő vonal mentén félbehajthatod.'
          : a === 0
            ? 'Sehogy sem hajthatod félbe úgy, hogy a két fele fedje egymást.'
            : `${a}-féleképpen hajthatod félbe úgy, hogy a két fele pontosan fedje egymást.`
    };
  }
  if (k === 'mirror') {
    const d = rnd(1, 4);
    const toPoint = Math.random() < 0.5;
    const ans = String(toPoint ? 2 * d : d);
    return {
      kind: k,
      d,
      prompt: toPoint ? 'Milyen messze lesz a piros pont a tükörképétől (hány kockányira)?' : 'Hány kockányira lesz a piros pont tükörképe a tengelytől?',
      answer: ans,
      options: mix4(ans, toPoint ? [String(d), String(2 * d + 1), String(2 * d - 1)] : [String(2 * d), String(d + 1), String(d - 1)]),
      hint: toPoint ? 'Számold meg a pont távolságát a tengelytől! A tükörkép ugyanannyira van a másik oldalon.' : 'A tükörkép ugyanannyi kockányira van a tengelytől, mint a pont.',
      why: toPoint ? `A pont ${d} kockányira van a tengelytől, a tükörképe is. ${d} + ${d} = ${2 * d}.` : `A pont ${d} kockányira van a tengelytől, a tükörképe is ${d} kockányira.`
    };
  }
  const solid = pick<SolidKind>(['kocka', 'teglatest', 'piramis4', 'piramis3', 'sator', 'henger', 'kup', 'gomb']);
  const n = SOLID_INFO[solid].faces.length;
  return {
    kind: 'faces',
    solid,
    prompt: `Hány lapja van ennek a testnek (${SOLID_INFO[solid].name})?`,
    answer: String(n),
    options: mix4(String(n), [String(n + 1), String(n - 1 >= 0 ? n - 1 : n + 2), String(n + 2)]),
    hint: SOLID_INFO[solid].curved ? 'A görbe rész nem lap! Csak a lapos részeket számold.' : 'Számold meg a lapokat elöl, hátul, fent, lent és oldalt is!',
    why: SOLID_INFO[solid].desc
  };
};

// ---------------------------------------------------------------------------
// Labor II – Kakukktojás-kereső
// ---------------------------------------------------------------------------
export type OddItem =
  | { t: 'solid'; k: SolidKind }
  | { t: 'shape'; k: PolyKind }
  | { t: 'obj'; k: 'heart' | 'house' | 'tree' | 'flag' }
  | { t: 'letter'; k: string };
export interface OddRound {
  items: OddItem[];
  /** a kakukktojás indexe az items tömbben */
  odd: number;
  why: string;
}

export const ODD_ROUNDS: OddRound[] = [
  {
    items: [{ t: 'solid', k: 'kocka' }, { t: 'solid', k: 'teglatest' }, { t: 'solid', k: 'gomb' }, { t: 'solid', k: 'piramis4' }],
    odd: 2,
    why: 'A gömbnek nincs lapja, csak görbe része. A többit csak lapok határolják.'
  },
  {
    items: [{ t: 'solid', k: 'henger' }, { t: 'solid', k: 'kup' }, { t: 'solid', k: 'kocka' }, { t: 'solid', k: 'gomb' }],
    odd: 2,
    why: 'A kockát csak lapok határolják. A többinek görbe része is van, ezért gurul.'
  },
  {
    items: [{ t: 'solid', k: 'piramis4' }, { t: 'solid', k: 'teglatest' }, { t: 'solid', k: 'kup' }, { t: 'solid', k: 'piramis3' }],
    odd: 1,
    why: 'A téglatestnek nincs hegyes teteje. A többi felül egy csúcsban végződik.'
  },
  {
    items: [{ t: 'shape', k: 'triIso' }, { t: 'shape', k: 'square' }, { t: 'shape', k: 'circle' }, { t: 'shape', k: 'pent' }],
    odd: 2,
    why: 'A kör nem sokszög: görbe vonal határolja. A többit egyenes szakaszok.'
  },
  {
    items: [{ t: 'shape', k: 'square' }, { t: 'shape', k: 'tri' }, { t: 'shape', k: 'rect' }, { t: 'shape', k: 'kite' }],
    odd: 1,
    why: 'A háromszögnek 3 oldala van. A többi négyszög, 4 oldaluk van.'
  },
  {
    items: [{ t: 'shape', k: 'trap' }, { t: 'shape', k: 'para' }, { t: 'shape', k: 'quad' }, { t: 'shape', k: 'house' }],
    odd: 3,
    why: 'A házikó alakú sokszögnek 5 oldala van: ötszög. A többi négyszög.'
  },
  {
    items: [{ t: 'obj', k: 'heart' }, { t: 'obj', k: 'flag' }, { t: 'obj', k: 'house' }, { t: 'obj', k: 'tree' }],
    odd: 1,
    why: 'A zászlónak nincs tükörtengelye. A többit középen félbehajthatod.'
  },
  {
    items: [{ t: 'letter', k: 'A' }, { t: 'letter', k: 'T' }, { t: 'letter', k: 'F' }, { t: 'letter', k: 'V' }],
    odd: 2,
    why: 'Az F betűnek nincs tükörtengelye. Az A, a T és a V bal és jobb fele egyforma.'
  },
  {
    items: [{ t: 'shape', k: 'square' }, { t: 'shape', k: 'rect' }, { t: 'shape', k: 'para' }, { t: 'shape', k: 'circle' }],
    odd: 2,
    why: 'Ennek a ferde négyszögnek nincs tükörtengelye. A többinek van.'
  },
  {
    items: [{ t: 'shape', k: 'hex' }, { t: 'shape', k: 'hexL' }, { t: 'shape', k: 'oct' }, { t: 'shape', k: 'hept' }],
    odd: 1,
    why: 'Ez az egyetlen, aminek nincs tükörtengelye. (A többi sokszögnek van.)'
  }
];

export const makeOddRound = (prev?: OddRound): OddRound => {
  let r = pick(ODD_ROUNDS);
  while (prev && ODD_ROUNDS.length > 1 && r.why === prev.why) r = pick(ODD_ROUNDS);
  // a sorrendet összekeverjük, a kakukktojás indexét követjük
  const order = shuffle(r.items.map((_, i) => i));
  return { items: order.map((i) => r.items[i]), odd: order.indexOf(r.odd), why: r.why };
};

/** Egy kakukktojás-elem rajza 80 × 80-as dobozba. */
export const OddArt: React.FC<{ item: OddItem; SolidComp: React.FC<{ kind: SolidKind; cx: number; by: number; s: number }> }> = ({ item, SolidComp }) => {
  if (item.t === 'solid') return <SolidComp kind={item.k} cx={40} by={72} s={50} />;
  if (item.t === 'shape') return <PlaneShape kind={item.k} cx={40} cy={40} r={32} sw={3} />;
  if (item.t === 'letter')
    return <path d={LETTER_PATHS[item.k]} transform="translate(17 10) scale(1.07)" fill="none" stroke="#2563eb" strokeWidth={8 / 1.07} strokeLinecap="round" strokeLinejoin="round" />;
  if (item.k === 'heart') return <Heart cx={40} cy={42} s={0.9} sw={3} />;
  if (item.k === 'house') return <House x={16} y={74} w={48} sw={3} />;
  if (item.k === 'tree') return <Tree cx={40} y={76} h={70} sw={3} />;
  return <Flag x={22} y={76} h={70} sw={3} />;
};
