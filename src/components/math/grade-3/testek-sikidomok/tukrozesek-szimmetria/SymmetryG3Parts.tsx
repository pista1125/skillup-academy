import React from 'react';

// ---------------------------------------------------------------------------
// Rajzelemek és segédfüggvények a X. fejezet 4. leckéjéhez (Tükrözések, szimmetria).
// A Figures, a Theory, a Quiz, a CardFigures és a fejezetzáró tudáspróba is használja.
// A tükörtengely piros, szaggatott (mint a félbehajtott papír hajtásvonala).
// ---------------------------------------------------------------------------

export const FONT = 'system-ui, Segoe UI, sans-serif';
export const INK = '#1e293b';
export const UNK = '#dc2626';
export const AXIS = '#e11d48';
export const GRIDLINE = '#cbd5e1';

export const rnd = (a: number, b: number) => a + Math.floor(Math.random() * (b - a + 1));
export const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
export const shuffle = <T,>(arr: T[]): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

export type Pt = [number, number];

// ---------------------------------------------------------------------------
// Tükrözés egy egyenesre
// ---------------------------------------------------------------------------
/** A P pont tükörképe az A és B ponton átmenő egyenesre. */
export const reflectPt = (p: Pt, a: Pt, b: Pt): Pt => {
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const len = Math.hypot(dx, dy);
  const ux = dx / len;
  const uy = dy / len;
  const t = (p[0] - a[0]) * ux + (p[1] - a[1]) * uy;
  const fx = a[0] + t * ux;
  const fy = a[1] + t * uy;
  return [2 * fx - p[0], 2 * fy - p[1]];
};

/** Derékszög jele: negyedkörív + pont (magyar jelölés). V a csúcs, u1, u2 a két szár iránya. */
export const RightAngle: React.FC<{ v: Pt; u1: Pt; u2: Pt; r?: number; color?: string; sw?: number }> = ({ v, u1, u2, r = 12, color = INK, sw = 1.6 }) => {
  const n1 = Math.hypot(u1[0], u1[1]);
  const n2 = Math.hypot(u2[0], u2[1]);
  const a: Pt = [u1[0] / n1, u1[1] / n1];
  const b: Pt = [u2[0] / n2, u2[1] / n2];
  const cross = a[0] * b[1] - a[1] * b[0];
  const sweep = cross > 0 ? 1 : 0;
  const bx = a[0] + b[0];
  const by = a[1] + b[1];
  const bn = Math.hypot(bx, by);
  return (
    <g>
      <path d={`M ${v[0] + r * a[0]} ${v[1] + r * a[1]} A ${r} ${r} 0 0 ${sweep} ${v[0] + r * b[0]} ${v[1] + r * b[1]}`} fill="none" stroke={color} strokeWidth={sw} />
      <circle cx={v[0] + (0.55 * r * bx) / bn} cy={v[1] + (0.55 * r * by) / bn} r={1.8} fill={color} />
    </g>
  );
};

// ---------------------------------------------------------------------------
// Kérdésábra-keret, tengely, négyzetrács
// ---------------------------------------------------------------------------
export const QFig: React.FC<{ h?: number; w?: number; children?: React.ReactNode }> = ({ h = 140, w = 240, children }) => (
  <svg viewBox={`0 0 ${w} ${h}`} className="w-full max-w-[280px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width={w - 2} height={h - 2} rx="10" fill="#f8fafc" stroke="#cbd5e1" />
    {children}
  </svg>
);

/** Tükörtengely: piros szaggatott vonal. */
export const AxisLine: React.FC<{ x1: number; y1: number; x2: number; y2: number; sw?: number; color?: string; solid?: boolean }> = ({
  x1,
  y1,
  x2,
  y2,
  sw = 2.6,
  color = AXIS,
  solid
}) => <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={sw} strokeDasharray={solid ? undefined : '7 4'} strokeLinecap="round" />;

/** Négyzetrács vonalai. */
export const GridG: React.FC<{ x: number; y: number; cols: number; rows: number; s: number; stroke?: string; sw?: number }> = ({
  x,
  y,
  cols,
  rows,
  s,
  stroke = GRIDLINE,
  sw = 1
}) => {
  const lines: React.ReactNode[] = [];
  for (let i = 0; i <= cols; i++) lines.push(<line key={`v${i}`} x1={x + i * s} y1={y} x2={x + i * s} y2={y + rows * s} stroke={stroke} strokeWidth={sw} />);
  for (let j = 0; j <= rows; j++) lines.push(<line key={`h${j}`} x1={x} y1={y + j * s} x2={x + cols * s} y2={y + j * s} stroke={stroke} strokeWidth={sw} />);
  return <g>{lines}</g>;
};

/** Kiszínezett kockák a rácson: [sor, oszlop, szín]. */
export const CellsG: React.FC<{ x: number; y: number; s: number; cells: [number, number, string][]; stroke?: string }> = ({ x, y, s, cells, stroke = '#334155' }) => (
  <g>
    {cells.map(([r, c, f], i) => (
      <rect key={i} x={x + c * s} y={y + r * s} width={s} height={s} fill={f} stroke={stroke} strokeWidth="1" />
    ))}
  </g>
);

// ---------------------------------------------------------------------------
// Rajzolt elemek: szív, ház, fenyő, pillangó, nyíl, betűk
// ---------------------------------------------------------------------------
/** Szív (tükrös): középen cx, a magassága kb. 64·s. */
export const Heart: React.FC<{ cx: number; cy: number; s?: number; fill?: string; stroke?: string; sw?: number }> = ({ cx, cy, s = 1, fill = '#f472b6', stroke = '#be185d', sw = 2 }) => (
  <path
    transform={`translate(${cx} ${cy}) scale(${s})`}
    d="M 0 30 C -10 18 -40 4 -40 -12 C -40 -32 -10 -34 0 -16 C 10 -34 40 -32 40 -12 C 40 4 10 18 0 30 Z"
    fill={fill}
    stroke={stroke}
    strokeWidth={sw / s}
    strokeLinejoin="round"
  />
);

/** Szív bal fele (a hajtásvonal a jobb széle, x = cx). */
export const HalfHeart: React.FC<{ cx: number; cy: number; s?: number; fill?: string; stroke?: string; sw?: number }> = ({ cx, cy, s = 1, fill = '#f472b6', stroke = '#be185d', sw = 2 }) => (
  <path
    transform={`translate(${cx} ${cy}) scale(${s})`}
    d="M 0 30 C -10 18 -40 4 -40 -12 C -40 -32 -10 -34 0 -16 Z"
    fill={fill}
    stroke={stroke}
    strokeWidth={sw / s}
    strokeLinejoin="round"
  />
);

/** Házikó elölről: alap (x, y = a fal bal alsó sarka), szélesség w. door: 'mid' | 'left'. */
export const House: React.FC<{ x: number; y: number; w: number; door?: 'mid' | 'left'; chimney?: boolean; sw?: number }> = ({ x, y, w, door = 'mid', chimney, sw = 2 }) => {
  const h = w * 0.7;
  const roof = w * 0.55;
  const dw = w * 0.24;
  const dh = h * 0.55;
  const dx = door === 'mid' ? x + w / 2 - dw / 2 : x + w * 0.12;
  return (
    <g strokeLinejoin="round">
      {chimney && <rect x={x + w * 0.68} y={y - h - roof * 1.1} width={w * 0.14} height={roof * 0.8} fill="#a8a29e" stroke="#57534e" strokeWidth={sw} />}
      <path d={`M ${x - w * 0.08} ${y - h} L ${x + w / 2} ${y - h - roof} L ${x + w * 1.08} ${y - h} Z`} fill="#f87171" stroke="#991b1b" strokeWidth={sw} />
      <rect x={x} y={y - h} width={w} height={h} fill="#fde68a" stroke="#a16207" strokeWidth={sw} />
      <rect x={dx} y={y - dh} width={dw} height={dh} fill="#92400e" stroke="#78350f" strokeWidth={sw} />
    </g>
  );
};

/** Fenyőfa (tükrös), cx a közepe, y a törzs alja, h a magassága. */
export const Tree: React.FC<{ cx: number; y: number; h: number; sw?: number; flip?: boolean }> = ({ cx, y, h, sw = 2, flip }) => {
  const k = flip ? -1 : 1;
  const t = h * 0.18;
  const w = h * 0.36;
  const p = (dx: number, dy: number) => `${cx + dx} ${y - k * dy}`;
  return (
    <g strokeLinejoin="round">
      <rect x={cx - h * 0.06} y={flip ? y : y - t} width={h * 0.12} height={t} fill="#92400e" stroke="#78350f" strokeWidth={sw} />
      <path d={`M ${p(-w, t)} L ${p(0, t + h * 0.5)} L ${p(w, t)} Z`} fill="#22c55e" stroke="#15803d" strokeWidth={sw} />
      <path d={`M ${p(-w * 0.78, t + h * 0.32)} L ${p(0, h)} L ${p(w * 0.78, t + h * 0.32)} Z`} fill="#22c55e" stroke="#15803d" strokeWidth={sw} />
    </g>
  );
};

/** Pillangó (tükrös), cx, cy a közepe, s a méretarány (kb. 100·s széles). */
export const Butterfly: React.FC<{ cx: number; cy: number; s?: number; sw?: number }> = ({ cx, cy, s = 1, sw = 2 }) => (
  <g transform={`translate(${cx} ${cy}) scale(${s})`} strokeWidth={sw / s} strokeLinejoin="round">
    {[-1, 1].map((k) => (
      <g key={k} transform={`scale(${k} 1)`}>
        <path d="M 2 -6 C 14 -40 48 -44 46 -14 C 44 2 20 4 2 0 Z" fill="#60a5fa" stroke="#1d4ed8" />
        <path d="M 2 2 C 22 4 42 12 34 30 C 26 42 8 30 2 10 Z" fill="#facc15" stroke="#a16207" />
        <circle cx="28" cy="-18" r="6" fill="#facc15" stroke="#a16207" />
        <circle cx="20" cy="18" r="4" fill="#60a5fa" stroke="#1d4ed8" />
        <path d="M 1 -24 C 4 -34 8 -40 14 -44" fill="none" stroke="#78350f" />
      </g>
    ))}
    <ellipse cx="0" cy="0" rx="4" ry="22" fill="#92400e" stroke="#78350f" />
  </g>
);

/** Betűk vastag vonalakkal, 0..40 × 0..56-os dobozban (a tükrösek pontosan tükrösek). */
export const LETTER_PATHS: Record<string, string> = {
  A: 'M 2 56 L 20 0 L 38 56 M 8 36 L 32 36',
  M: 'M 2 56 L 2 0 L 20 30 L 38 0 L 38 56',
  T: 'M 0 0 L 40 0 M 20 0 L 20 56',
  V: 'M 0 0 L 20 56 L 40 0',
  U: 'M 4 0 L 4 38 Q 4 56 20 56 Q 36 56 36 38 L 36 0',
  W: 'M 0 0 L 9 56 L 20 20 L 31 56 L 40 0',
  Y: 'M 0 0 L 20 28 L 40 0 M 20 28 L 20 56',
  H: 'M 4 0 L 4 56 M 36 0 L 36 56 M 4 28 L 36 28',
  I: 'M 20 0 L 20 56',
  O: 'M 20 0 Q 40 0 40 28 Q 40 56 20 56 Q 0 56 0 28 Q 0 0 20 0 Z',
  X: 'M 2 0 L 38 56 M 38 0 L 2 56',
  E: 'M 36 0 L 4 0 L 4 56 L 36 56 M 4 28 L 30 28',
  B: 'M 4 0 L 4 56 L 22 56 Q 36 56 36 42 Q 36 28 22 28 L 4 28 M 4 0 L 22 0 Q 36 0 36 14 Q 36 28 22 28',
  C: 'M 38 8 Q 32 0 20 0 Q 2 0 2 28 Q 2 56 20 56 Q 32 56 38 48',
  D: 'M 4 0 L 4 56 L 16 56 Q 38 56 38 28 Q 38 0 16 0 Z',
  K: 'M 4 0 L 4 56 M 36 0 L 4 28 L 36 56',
  F: 'M 36 0 L 4 0 L 4 56 M 4 28 L 30 28',
  L: 'M 4 0 L 4 56 L 36 56',
  N: 'M 4 56 L 4 0 L 36 56 L 36 0',
  P: 'M 4 56 L 4 0 L 22 0 Q 36 0 36 15 Q 36 30 22 30 L 4 30',
  R: 'M 4 56 L 4 0 L 22 0 Q 36 0 36 15 Q 36 30 22 30 L 4 30 M 18 30 L 36 56',
  S: 'M 36 6 Q 30 0 20 0 Q 4 0 4 14 Q 4 26 20 28 Q 36 30 36 42 Q 36 56 20 56 Q 8 56 2 48',
  Z: 'M 2 0 L 38 0 L 2 56 L 38 56',
  G: 'M 38 8 Q 32 0 20 0 Q 2 0 2 28 Q 2 56 20 56 Q 38 56 38 32 L 22 32',
  J: 'M 30 0 L 30 40 Q 30 56 16 56 Q 4 56 2 44'
};

/** Egy betű: (x, y) a doboz bal felső sarka, size = a betű magassága. */
export const Letter: React.FC<{ ch: string; x: number; y: number; size?: number; color?: string; sw?: number }> = ({ ch, x, y, size = 56, color = '#2563eb', sw = 7 }) => {
  const k = size / 56;
  return (
    <path
      d={LETTER_PATHS[ch]}
      transform={`translate(${x} ${y}) scale(${k})`}
      fill="none"
      stroke={color}
      strokeWidth={sw / k}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  );
};

/** Vastag nyíl (x, y a közepe), dir: merre mutat. */
export const BigArrow: React.FC<{ cx: number; cy: number; len?: number; dir?: 'right' | 'left' | 'up' | 'down'; fill?: string; stroke?: string; sw?: number }> = ({
  cx,
  cy,
  len = 60,
  dir = 'right',
  fill = '#a78bfa',
  stroke = '#6d28d9',
  sw = 2
}) => {
  const L = len / 2;
  const t = len * 0.17;
  const hw = len * 0.34;
  const hx = L - len * 0.38;
  const rot = { right: 0, down: 90, left: 180, up: 270 }[dir];
  return (
    <path
      transform={`translate(${cx} ${cy}) rotate(${rot})`}
      d={`M ${-L} ${-t} L ${hx} ${-t} L ${hx} ${-hw} L ${L} 0 L ${hx} ${hw} L ${hx} ${t} L ${-L} ${t} Z`}
      fill={fill}
      stroke={stroke}
      strokeWidth={sw}
      strokeLinejoin="round"
    />
  );
};

/** Zászló rúddal (nem szimmetrikus). x, y a rúd alja. */
export const Flag: React.FC<{ x: number; y: number; h?: number; sw?: number }> = ({ x, y, h = 60, sw = 2 }) => (
  <g strokeLinejoin="round">
    <line x1={x} y1={y} x2={x} y2={y - h} stroke="#57534e" strokeWidth={sw * 1.6} strokeLinecap="round" />
    <path d={`M ${x} ${y - h} L ${x + h * 0.6} ${y - h * 0.82} L ${x} ${y - h * 0.62} Z`} fill="#22c55e" stroke="#15803d" strokeWidth={sw} />
  </g>
);

// ---------------------------------------------------------------------------
// Labor I – Tükrözés négyzetrácson
// ---------------------------------------------------------------------------
export const GN = 10;
export type GridAxis = 'v' | 'h';
export interface GCell {
  r: number;
  c: number;
  /** szín indexe a PALETTE-ben */
  col: number;
}
export const PALETTE = [
  { fill: '#3b82f6', name: 'kék' },
  { fill: '#facc15', name: 'sárga' },
  { fill: '#f97316', name: 'narancs' }
];
export interface GridTask {
  axis: GridAxis;
  cells: GCell[];
}
export const cellKey = (r: number, c: number) => `${r}-${c}`;
/** Melyik félben van az eredeti ábra? Függőleges tengelynél a bal, vízszintesnél a felső fél. */
export const inSource = (r: number, c: number, axis: GridAxis) => (axis === 'v' ? c < GN / 2 : r < GN / 2);
export const mirrorCell = (cell: GCell, axis: GridAxis): GCell => (axis === 'v' ? { ...cell, c: GN - 1 - cell.c } : { ...cell, r: GN - 1 - cell.r });
/** Hány kockára van a kocka a tengelytől (0 = a tengely mellett). */
export const distFromAxis = (cell: { r: number; c: number }, axis: GridAxis) =>
  axis === 'v' ? (cell.c < GN / 2 ? GN / 2 - 1 - cell.c : cell.c - GN / 2) : cell.r < GN / 2 ? GN / 2 - 1 - cell.r : cell.r - GN / 2;

/** Az első (rögzített) feladat: kis fenyő a függőleges tengely bal oldalán. */
export const FIRST_GRID_TASK: GridTask = {
  axis: 'v',
  cells: [
    { r: 2, c: 2, col: 0 },
    { r: 3, c: 1, col: 0 },
    { r: 3, c: 2, col: 0 },
    { r: 4, c: 2, col: 1 },
    { r: 4, c: 3, col: 0 },
    { r: 5, c: 3, col: 0 },
    { r: 6, c: 4, col: 2 },
    { r: 7, c: 4, col: 2 }
  ]
};

/** Véletlen, összefüggő minta a forrás-félben (6–9 kocka, 2 szín). */
export const makeGridTask = (axis?: GridAxis): GridTask => {
  const ax: GridAxis = axis ?? pick<GridAxis>(['v', 'h']);
  for (;;) {
    // „v” helyzetben generálunk: sor 1..8, oszlop 0..4 (4 = a tengely mellett)
    const n = rnd(6, 9);
    const set = new Map<string, [number, number]>();
    const start: [number, number] = [rnd(2, 7), rnd(1, 4)];
    set.set(cellKey(...start), start);
    let guard = 0;
    while (set.size < n && guard++ < 400) {
      const cells = Array.from(set.values());
      const [r, c] = pick(cells);
      const [dr, dc] = pick<[number, number]>([
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1]
      ]);
      const nr = r + dr;
      const nc = c + dc;
      if (nr < 1 || nr > 8 || nc < 0 || nc > 4) continue;
      set.set(cellKey(nr, nc), [nr, nc]);
    }
    const list = Array.from(set.values());
    if (list.length < 6) continue;
    const cols = new Set(list.map((p) => p[1]));
    if (cols.size < 3) continue; // legyen „mélysége” is: számolni kelljen
    if (!list.some((p) => p[1] <= 2)) continue;
    const accentCount = rnd(1, 3);
    const accent = new Set(shuffle(list.map((p) => cellKey(...p))).slice(0, accentCount));
    const accentCol = rnd(1, 2);
    const cells: GCell[] = list.map(([r, c]) => {
      const col = accent.has(cellKey(r, c)) ? accentCol : 0;
      return ax === 'v' ? { r, c, col } : { r: c, c: r, col };
    });
    return { axis: ax, cells };
  }
};

export interface GridCheck {
  ok: boolean;
  missing: string[];
  extra: string[];
  wrongColor: string[];
  msg: string;
}
/** Ellenőrzés: drawn = a gyerek által kiszínezett kockák (kulcs → szín index) a cél-félben. */
export const checkGrid = (task: GridTask, drawn: Record<string, number>): GridCheck => {
  const expected = new Map<string, number>();
  task.cells.forEach((cell) => {
    const m = mirrorCell(cell, task.axis);
    expected.set(cellKey(m.r, m.c), m.col);
  });
  const missing: string[] = [];
  const wrongColor: string[] = [];
  const extra: string[] = [];
  expected.forEach((col, k) => {
    if (!(k in drawn)) missing.push(k);
    else if (drawn[k] !== col) wrongColor.push(k);
  });
  Object.keys(drawn).forEach((k) => {
    if (!expected.has(k)) extra.push(k);
  });
  const ok = missing.length === 0 && extra.length === 0 && wrongColor.length === 0;
  const parts: string[] = [];
  if (Object.keys(drawn).length === 0) return { ok: false, missing, extra, wrongColor, msg: 'Még nem színeztél ki semmit. Kezdd a tengely melletti kockákkal!' };
  if (extra.length) parts.push(`${extra.length} kocka rossz helyen van (piros keret). Számold meg: hány kockára van az eredeti a tengelytől?`);
  if (wrongColor.length) parts.push(`${wrongColor.length} kockának nem jó a színe. A tükörkép ugyanolyan színű!`);
  if (missing.length) parts.push(`Még ${missing.length} kocka hiányzik.`);
  return { ok, missing, extra, wrongColor, msg: ok ? '' : parts.join(' ') };
};

// ---------------------------------------------------------------------------
// Labor II – Hajtsd félbe! (tükörtengely-próba)
// ---------------------------------------------------------------------------
export interface FoldShape {
  id: string;
  name: string;
  /** a próbált vonal két pontja (0..200-as rajzlapon) */
  axis: [Pt, Pt];
  polys?: { pts: Pt[]; fill: string; stroke: string }[];
  strokes?: Pt[][];
  circle?: { cx: number; cy: number; r: number; fill: string; stroke: string };
  strokeColor?: string;
  isAxis: boolean;
  why: string;
}

const EQ: Pt[] = [
  [100, 40],
  [100 + 70 * Math.cos(Math.PI / 6), 110 + 70 * Math.sin(Math.PI / 6)],
  [100 - 70 * Math.cos(Math.PI / 6), 110 + 70 * Math.sin(Math.PI / 6)]
];
const midEq: Pt = [(EQ[0][0] + EQ[2][0]) / 2, (EQ[0][1] + EQ[2][1]) / 2];

const Y = { fill: '#fde68a', stroke: '#a16207' };
const G = { fill: '#bbf7d0', stroke: '#15803d' };
const B = { fill: '#bfdbfe', stroke: '#1d4ed8' };
const P = { fill: '#fbcfe8', stroke: '#be185d' };
const V = { fill: '#ddd6fe', stroke: '#6d28d9' };

const RECT: Pt[] = [
  [40, 65],
  [160, 65],
  [160, 135],
  [40, 135]
];
const KITE: Pt[] = [
  [100, 30],
  [145, 80],
  [100, 170],
  [55, 80]
];
const HOUSE_WALL: Pt[] = [
  [100, 35],
  [160, 85],
  [160, 165],
  [40, 165],
  [40, 85]
];

export const FOLD_SHAPES: FoldShape[] = [
  {
    id: 'rect-v',
    name: 'téglalap',
    axis: [
      [100, 20],
      [100, 180]
    ],
    polys: [{ pts: RECT, ...Y }],
    isAxis: true,
    why: 'A téglalapot középen függőlegesen félbehajtva a két fele pontosan fedi egymást.'
  },
  {
    id: 'rect-d',
    name: 'téglalap az átlójával',
    axis: [
      [16, 51],
      [184, 149]
    ],
    polys: [{ pts: RECT, ...Y }],
    isAxis: false,
    why: 'Az átló két egyforma háromszögre vágja, de hajtásnál a csúcsok kilógnak. A téglalap átlója nem tükörtengely!'
  },
  {
    id: 'square-d',
    name: 'négyzet az átlójával',
    axis: [
      [30, 30],
      [170, 170]
    ],
    polys: [
      {
        pts: [
          [50, 50],
          [150, 50],
          [150, 150],
          [50, 150]
        ],
        ...B
      }
    ],
    isAxis: true,
    why: 'A négyzet átlója tükörtengely: a két háromszög pontosan fedi egymást.'
  },
  {
    id: 'tri-iso',
    name: 'háromszög (2 oldala egyforma)',
    axis: [
      [100, 20],
      [100, 180]
    ],
    polys: [
      {
        pts: [
          [100, 40],
          [160, 160],
          [40, 160]
        ],
        ...G
      }
    ],
    isAxis: true,
    why: 'A két ferde oldala egyforma hosszú, ezért a csúcsán átmenő függőleges vonal tükörtengely.'
  },
  {
    id: 'tri-scalene',
    name: 'háromszög',
    axis: [
      [100, 20],
      [100, 180]
    ],
    polys: [
      {
        pts: [
          [70, 40],
          [170, 160],
          [30, 150]
        ],
        ...G
      }
    ],
    isAxis: false,
    why: 'A két fele nem egyforma: az egyik oldalon nagyobb darab marad. Ennek a háromszögnek nincs is tükörtengelye.'
  },
  {
    id: 'house-mid',
    name: 'házikó',
    axis: [
      [100, 15],
      [100, 185]
    ],
    polys: [
      { pts: HOUSE_WALL, ...P },
      {
        pts: [
          [88, 125],
          [112, 125],
          [112, 165],
          [88, 165]
        ],
        fill: '#92400e',
        stroke: '#78350f'
      }
    ],
    isAxis: true,
    why: 'Az ajtó pont középen van, ezért a házikó két fele pontosan fedi egymást.'
  },
  {
    id: 'house-left',
    name: 'házikó oldalt ajtóval',
    axis: [
      [100, 15],
      [100, 185]
    ],
    polys: [
      { pts: HOUSE_WALL, ...P },
      {
        pts: [
          [55, 120],
          [80, 120],
          [80, 165],
          [55, 165]
        ],
        fill: '#92400e',
        stroke: '#78350f'
      }
    ],
    isAxis: false,
    why: 'A fal és a tető tükrös, de az ajtó csak az egyik oldalon van. Hajtásnál nem fedi a másik felét.'
  },
  {
    id: 'kite-v',
    name: 'sárkány alakú négyszög',
    axis: [
      [100, 15],
      [100, 185]
    ],
    polys: [{ pts: KITE, ...V }],
    isAxis: true,
    why: 'A sárkány alakú négyszög hosszú átlója tükörtengely.'
  },
  {
    id: 'kite-h',
    name: 'sárkány alakú négyszög',
    axis: [
      [20, 80],
      [180, 80]
    ],
    polys: [{ pts: KITE, ...V }],
    isAxis: false,
    why: 'A felső rész kicsi, az alsó nagy. A rövid átló nem tükörtengely.'
  },
  {
    id: 'para-v',
    name: 'ferde négyszög',
    axis: [
      [100, 30],
      [100, 170]
    ],
    polys: [
      {
        pts: [
          [70, 60],
          [170, 60],
          [130, 140],
          [30, 140]
        ],
        ...B
      }
    ],
    isAxis: false,
    why: 'A két fele ugyanakkora, de hajtásnál nem fedik egymást: a ferde oldalak rossz irányba dőlnek.'
  },
  {
    id: 'trap-v',
    name: 'négyszög',
    axis: [
      [100, 30],
      [100, 170]
    ],
    polys: [
      {
        pts: [
          [70, 60],
          [130, 60],
          [165, 140],
          [35, 140]
        ],
        ...Y
      }
    ],
    isAxis: true,
    why: 'Ennek a négyszögnek a két ferde oldala egyforma, ezért a középső függőleges vonal tükörtengely.'
  },
  {
    id: 'trap-h',
    name: 'négyszög',
    axis: [
      [15, 100],
      [185, 100]
    ],
    polys: [
      {
        pts: [
          [70, 60],
          [130, 60],
          [165, 140],
          [35, 140]
        ],
        ...Y
      }
    ],
    isAxis: false,
    why: 'Felül keskeny, alul széles: a két fele nem fedi egymást.'
  },
  {
    id: 'letter-A',
    name: 'A betű',
    axis: [
      [100, 20],
      [100, 180]
    ],
    strokes: [
      [
        [60, 165],
        [100, 35],
        [140, 165]
      ],
      [
        [75, 115],
        [125, 115]
      ]
    ],
    isAxis: true,
    why: 'Az A betű bal és jobb fele egyforma.'
  },
  {
    id: 'letter-E',
    name: 'E betű',
    axis: [
      [30, 100],
      [170, 100]
    ],
    strokes: [
      [
        [140, 40],
        [65, 40],
        [65, 160],
        [140, 160]
      ],
      [
        [65, 100],
        [125, 100]
      ]
    ],
    isAxis: true,
    why: 'Az E betű felső és alsó fele egyforma, a tükörtengelye vízszintes.'
  },
  {
    id: 'letter-F',
    name: 'F betű',
    axis: [
      [30, 100],
      [170, 100]
    ],
    strokes: [
      [
        [140, 40],
        [65, 40],
        [65, 160]
      ],
      [
        [65, 100],
        [125, 100]
      ]
    ],
    isAxis: false,
    why: 'Az F betűnek csak fent van vonala, lent nincs. Nem fedi egymást a két fele.'
  },
  {
    id: 'letter-N',
    name: 'N betű',
    axis: [
      [100, 20],
      [100, 180]
    ],
    strokes: [
      [
        [65, 160],
        [65, 40],
        [135, 160],
        [135, 40]
      ]
    ],
    isAxis: false,
    why: 'Az N betű ferde vonala hajtás után rossz irányba dőlne. Az N-nek nincs tükörtengelye.'
  },
  {
    id: 'letter-H',
    name: 'H betű',
    axis: [
      [30, 100],
      [170, 100]
    ],
    strokes: [
      [
        [65, 40],
        [65, 160]
      ],
      [
        [135, 40],
        [135, 160]
      ],
      [
        [65, 100],
        [135, 100]
      ]
    ],
    isAxis: true,
    why: 'A H betűnek vízszintes és függőleges tükörtengelye is van.'
  },
  {
    id: 'circle',
    name: 'kör',
    axis: [
      [35, 165],
      [165, 35]
    ],
    circle: { cx: 100, cy: 100, r: 60, ...G },
    isAxis: true,
    why: 'A kört bármelyik középen átmenő vonal mentén félbehajthatjuk. Akárhány tükörtengelye van.'
  },
  {
    id: 'arrow-h',
    name: 'nyíl',
    axis: [
      [15, 100],
      [185, 100]
    ],
    polys: [
      {
        pts: [
          [30, 80],
          [110, 80],
          [110, 50],
          [170, 100],
          [110, 150],
          [110, 120],
          [30, 120]
        ],
        ...V
      }
    ],
    isAxis: true,
    why: 'A jobbra mutató nyíl felső és alsó fele egyforma.'
  },
  {
    id: 'arrow-v',
    name: 'nyíl',
    axis: [
      [100, 30],
      [100, 170]
    ],
    polys: [
      {
        pts: [
          [30, 80],
          [110, 80],
          [110, 50],
          [170, 100],
          [110, 150],
          [110, 120],
          [30, 120]
        ],
        ...V
      }
    ],
    isAxis: false,
    why: 'A nyíl hegye csak jobbra van. A függőleges vonal mentén nem fedi a két fele egymást.'
  },
  {
    id: 'tri-eq',
    name: 'háromszög (minden oldala egyforma)',
    axis: [
      [EQ[1][0] + (EQ[1][0] - midEq[0]) * 0.2, EQ[1][1] + (EQ[1][1] - midEq[1]) * 0.2],
      [midEq[0] - (EQ[1][0] - midEq[0]) * 0.35, midEq[1] - (EQ[1][1] - midEq[1]) * 0.35]
    ],
    polys: [{ pts: EQ, ...P }],
    isAxis: true,
    why: 'Minden oldala egyforma. A csúcsából a szemközti oldal közepéhez húzott vonal tükörtengely (3 ilyen van).'
  }
];

/** Igaz-e, hogy a vonal tükörtengely? (A rajz pontjait tükrözzük, és megnézzük, fedik-e egymást.) */
export const isSymmetricFold = (s: FoldShape, eps = 0.5): boolean => {
  const [a, b] = s.axis;
  const same = (p: Pt, q: Pt) => Math.abs(p[0] - q[0]) < eps && Math.abs(p[1] - q[1]) < eps;
  const setEq = (xs: Pt[], ys: Pt[]) => xs.length === ys.length && xs.every((p) => ys.some((q) => same(p, q)));
  const polysOk = (s.polys ?? []).every((poly) => {
    const r = poly.pts.map((p) => reflectPt(p, a, b));
    return (s.polys ?? []).some((other) => other.fill === poly.fill && setEq(r, other.pts));
  });
  const seqEq = (xs: Pt[], ys: Pt[]) => xs.length === ys.length && xs.every((p, i) => same(p, ys[i]));
  const strokesOk = (s.strokes ?? []).every((line) => {
    const r = line.map((p) => reflectPt(p, a, b));
    return (s.strokes ?? []).some((other) => seqEq(r, other) || seqEq([...r].reverse(), other));
  });
  const circleOk = !s.circle || same(reflectPt([s.circle.cx, s.circle.cy], a, b), [s.circle.cx, s.circle.cy]);
  return polysOk && strokesOk && circleOk;
};

/** A rajz (tengely nélkül). */
export const FoldArt: React.FC<{ s: FoldShape; opacity?: number; dashed?: boolean; tint?: string }> = ({ s, opacity = 1, dashed, tint }) => (
  <g opacity={opacity} strokeLinejoin="round">
    {s.polys?.map((p, i) => (
      <polygon key={i} points={p.pts.map((q) => q.join(',')).join(' ')} fill={tint ?? p.fill} stroke={p.stroke} strokeWidth="3" strokeDasharray={dashed ? '6 4' : undefined} />
    ))}
    {s.circle && (
      <circle cx={s.circle.cx} cy={s.circle.cy} r={s.circle.r} fill={tint ?? s.circle.fill} stroke={s.circle.stroke} strokeWidth="3" strokeDasharray={dashed ? '6 4' : undefined} />
    )}
    {s.strokes?.map((l, i) => (
      <polyline key={i} points={l.map((q) => q.join(',')).join(' ')} fill="none" stroke={tint ?? s.strokeColor ?? '#2563eb'} strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" />
    ))}
  </g>
);

/** A tengely irányszöge fokban és egy pontja. */
export const axisFrame = (s: FoldShape) => {
  const [a, b] = s.axis;
  return { cx: a[0], cy: a[1], deg: (Math.atan2(b[1] - a[1], b[0] - a[0]) * 180) / Math.PI };
};
