import React from 'react';

// ---------------------------------------------------------------------------
// 3. Síkidomok, sokszögek – közös rajzok (3. osztály)
// A síkidomok egy 100 × 100-as dobozban vannak megadva; a rajzoló tetszőleges helyre és méretre teszi.
// ---------------------------------------------------------------------------
export const FONT = 'system-ui, Segoe UI, sans-serif';
export const INK = '#1e293b';
export const UNK = '#dc2626';

export type Pt = [number, number];

export interface PlaneShape {
  id: string;
  /** Sokszög: csúcsok; nem sokszög: SVG path a 100 × 100-as dobozban. */
  pts?: Pt[];
  d?: string;
  /** Csúcsok száma (sokszögnél), 0 = nem sokszög. */
  n: number;
  /** Téglalap? Négyzet? (a négyzet is téglalap) */
  rect?: boolean;
  square?: boolean;
  /** Rövid leírás a hibás válasz magyarázatához. */
  note?: string;
}

const regular = (n: number, r = 44, rot = -90): Pt[] =>
  Array.from({ length: n }, (_, i) => {
    const a = ((rot + (360 / n) * i) * Math.PI) / 180;
    return [Math.round((50 + r * Math.cos(a)) * 10) / 10, Math.round((52 + r * Math.sin(a)) * 10) / 10];
  });

export const SHAPES: Record<string, PlaneShape> = {
  // háromszögek
  tri1: { id: 'tri1', pts: [[50, 10], [92, 86], [8, 86]], n: 3 },
  tri2: { id: 'tri2', pts: [[14, 12], [14, 88], [88, 88]], n: 3 },
  tri3: { id: 'tri3', pts: [[4, 78], [96, 78], [30, 26]], n: 3 },
  tri4: { id: 'tri4', pts: [[22, 92], [84, 92], [66, 8]], n: 3 },
  tri5: { id: 'tri5', pts: [[8, 20], [92, 20], [50, 88]], n: 3 },
  // négyszögek
  square: { id: 'square', pts: [[18, 18], [82, 18], [82, 82], [18, 82]], n: 4, rect: true, square: true },
  rect: { id: 'rect', pts: [[6, 28], [94, 28], [94, 72], [6, 72]], n: 4, rect: true },
  rectFlat: { id: 'rectFlat', pts: [[4, 36], [96, 36], [96, 64], [4, 64]], n: 4, rect: true },
  squareSmall: { id: 'squareSmall', pts: [[28, 28], [72, 28], [72, 72], [28, 72]], n: 4, rect: true, square: true },
  rectTall: { id: 'rectTall', pts: [[30, 6], [70, 6], [70, 94], [30, 94]], n: 4, rect: true },
  para: { id: 'para', pts: [[26, 24], [96, 24], [74, 76], [4, 76]], n: 4 },
  trap: { id: 'trap', pts: [[30, 24], [70, 24], [94, 76], [6, 76]], n: 4 },
  kite: { id: 'kite', pts: [[50, 6], [82, 38], [50, 94], [18, 38]], n: 4 },
  rhomb: { id: 'rhomb', pts: [[50, 8], [80, 50], [50, 92], [20, 50]], n: 4 },
  dart: { id: 'dart', pts: [[8, 16], [94, 50], [8, 84], [34, 50]], n: 4, note: 'A befelé mutató sarok is csúcs.' },
  quadOdd: { id: 'quadOdd', pts: [[10, 30], [70, 12], [92, 80], [22, 88]], n: 4 },
  // ötszögek
  pent: { id: 'pent', pts: regular(5), n: 5 },
  house: { id: 'house', pts: [[14, 46], [50, 10], [86, 46], [86, 90], [14, 90]], n: 5 },
  arrow5: { id: 'arrow5', pts: [[6, 26], [62, 26], [94, 50], [62, 74], [6, 74]], n: 5 },
  pentOdd: { id: 'pentOdd', pts: [[8, 50], [40, 10], [92, 26], [80, 88], [26, 86]], n: 5 },
  // hatszögek
  hex: { id: 'hex', pts: regular(6, 44, 0), n: 6 },
  hexL: { id: 'hexL', pts: [[12, 10], [46, 10], [46, 54], [88, 54], [88, 90], [12, 90]], n: 6 },
  hexBox: { id: 'hexBox', pts: [[10, 40], [32, 10], [90, 10], [90, 62], [68, 90], [10, 90]], n: 6 },
  hexIrr: { id: 'hexIrr', pts: [[20, 10], [80, 14], [94, 52], [70, 90], [24, 86], [6, 48]], n: 6 },
  hexLong: { id: 'hexLong', pts: [[24, 20], [76, 20], [96, 50], [76, 80], [24, 80], [4, 50]], n: 6 },
  // nem sokszögek
  circle: { id: 'circle', d: 'M 50 8 A 42 42 0 1 1 49.9 8 Z', n: 0, note: 'A kört görbe vonal határolja.' },
  ellipse: { id: 'ellipse', d: 'M 4 50 A 46 30 0 1 1 96 50 A 46 30 0 1 1 4 50 Z', n: 0, note: 'Görbe vonal határolja.' },
  half: { id: 'half', d: 'M 6 70 A 44 44 0 0 1 94 70 Z', n: 0, note: 'Egy egyenes és egy görbe vonal határolja.' },
  stadium: { id: 'stadium', d: 'M 26 28 L 74 28 A 22 22 0 0 1 74 72 L 26 72 A 22 22 0 0 1 26 28 Z', n: 0, note: 'A két vége görbe.' },
  moon: { id: 'moon', d: 'M 64 10 A 42 42 0 1 0 64 90 A 32 32 0 1 1 64 10 Z', n: 0, note: 'Görbe vonalak határolják.' },
  drop: { id: 'drop', d: 'M 50 6 L 80 54 A 32 32 0 1 1 20 54 Z', n: 0, note: 'Az alja görbe.' },
  wavy: { id: 'wavy', d: 'M 10 24 Q 30 10 50 24 Q 70 38 90 24 L 90 78 Q 70 64 50 78 Q 30 92 10 78 Z', n: 0, note: 'A teteje és az alja hullámos, görbe.' },
  slice: { id: 'slice', d: 'M 14 86 L 14 14 A 72 72 0 0 1 86 86 Z', n: 0, note: 'Két egyenes és egy görbe vonal határolja.' },
  doorway: { id: 'doorway', d: 'M 14 90 L 14 46 A 36 36 0 0 1 86 46 L 86 90 Z', n: 0, note: 'A teteje görbe.' }
};

export const SHAPE_FILL: Record<number, string> = { 0: '#f9a8d4', 3: '#fde68a', 4: '#93c5fd', 5: '#86efac', 6: '#c4b5fd' };

export const POLY_NAME: Record<number, string> = { 3: 'háromszög', 4: 'négyszög', 5: 'ötszög', 6: 'hatszög' };

/** Egy síkidom a (x, y) bal felső sarkú, s méretű dobozban. */
export const ShapeG: React.FC<{
  shape: PlaneShape;
  x: number;
  y: number;
  s: number;
  fill?: string;
  sw?: number;
  dots?: boolean;
  dotColor?: string;
}> = ({ shape, x, y, s, fill, sw = 2.5, dots = false, dotColor = UNK }) => {
  const k = s / 100;
  // Egységes alapszín, hogy a szín ne árulja el, milyen síkidomról van szó.
  const f = fill ?? '#bfdbfe';
  if (shape.pts) {
    const P = shape.pts.map(([px, py]) => [x + px * k, y + py * k]);
    return (
      <g>
        <polygon points={P.map((p) => p.join(',')).join(' ')} fill={f} stroke={INK} strokeWidth={sw} strokeLinejoin="round" />
        {dots && P.map((p, i) => <circle key={i} cx={p[0]} cy={p[1]} r={Math.max(3, sw * 1.4)} fill={dotColor} />)}
      </g>
    );
  }
  return (
    <g transform={`translate(${x} ${y}) scale(${k})`}>
      <path d={shape.d} fill={f} stroke={INK} strokeWidth={sw / k} strokeLinejoin="round" />
    </g>
  );
};

/** Pálcika (gyufaszál) két pont között. */
export const Stick: React.FC<{ x1: number; y1: number; x2: number; y2: number; w?: number }> = ({ x1, y1, x2, y2, w = 5 }) => {
  const len = Math.hypot(x2 - x1, y2 - y1);
  const ux = (x2 - x1) / len;
  const uy = (y2 - y1) / len;
  const g = w * 0.6;
  return (
    <g>
      <line x1={x1 + ux * g} y1={y1 + uy * g} x2={x2 - ux * g} y2={y2 - uy * g} stroke="#d97706" strokeWidth={w} strokeLinecap="round" />
      <circle cx={x2 - ux * g * 1.4} cy={y2 - uy * g * 1.4} r={w * 0.75} fill="#b91c1c" />
    </g>
  );
};

/** Pálcikás négyzetrács (r × c kis négyzet). */
export const StickGrid: React.FC<{ r: number; c: number; x: number; y: number; s: number; w?: number }> = ({ r, c, x, y, s, w = 5 }) => {
  const out: React.ReactNode[] = [];
  for (let i = 0; i <= r; i++) for (let j = 0; j < c; j++) out.push(<Stick key={`h${i}-${j}`} x1={x + j * s} y1={y + i * s} x2={x + (j + 1) * s} y2={y + i * s} w={w} />);
  for (let i = 0; i < r; i++) for (let j = 0; j <= c; j++) out.push(<Stick key={`v${i}-${j}`} x1={x + j * s} y1={y + i * s} x2={x + j * s} y2={y + (i + 1) * s} w={w} />);
  return <g>{out}</g>;
};

// ---------------------------------------------------------------------------
// Pöttyrácsos rajzolás ellenőrzése
// ---------------------------------------------------------------------------
const cross = (o: Pt, a: Pt, b: Pt) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);

/** Van-e olyan csúcs, ahol a vonal egyenesen megy tovább (ott valójában nincs csúcs)? */
export const straightVertex = (p: Pt[]): number => p.findIndex((v, i) => cross(p[(i + p.length - 1) % p.length], v, p[(i + 1) % p.length]) === 0);

const segInter = (a: Pt, b: Pt, c: Pt, d: Pt) => {
  const d1 = cross(c, d, a);
  const d2 = cross(c, d, b);
  const d3 = cross(a, b, c);
  const d4 = cross(a, b, d);
  return ((d1 > 0 && d2 < 0) || (d1 < 0 && d2 > 0)) && ((d3 > 0 && d4 < 0) || (d3 < 0 && d4 > 0));
};
/** Keresztezik-e egymást a sokszög oldalai? */
export const selfCrossing = (p: Pt[]): boolean => {
  const n = p.length;
  for (let i = 0; i < n; i++)
    for (let j = i + 1; j < n; j++) {
      if (j === i + 1 || (i === 0 && j === n - 1)) continue;
      if (segInter(p[i], p[(i + 1) % n], p[j], p[(j + 1) % n])) return true;
    }
  return false;
};
const d2 = (a: Pt, b: Pt) => (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2;
/** Téglalap-e (4 csúcs, minden sarka „füzetlap-sarok”)? */
export const isRect = (p: Pt[]) =>
  p.length === 4 &&
  p.every((v, i) => {
    const a = p[(i + 3) % 4];
    const b = p[(i + 1) % 4];
    return (a[0] - v[0]) * (b[0] - v[0]) + (a[1] - v[1]) * (b[1] - v[1]) === 0;
  });
export const isSquare = (p: Pt[]) => isRect(p) && d2(p[0], p[1]) === d2(p[1], p[2]);
