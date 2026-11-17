import React from 'react';

// ---------------------------------------------------------------------------
// Rajzoló elemek a 7. A terület mérése és a 8. A téglalap és a négyzet területe
// leckékhez. A síkidomokat négyzetrácson (kis négyzet = 1 egység), fél négyzetekből
// (derékszögű háromszög) és szabályos kis háromszögekből rakjuk ki.
// A körvonalat automatikusan számoljuk: az a szakasz határ, amely csak egy
// darabhoz tartozik.
// ---------------------------------------------------------------------------

export const FONT = 'system-ui, Segoe UI, sans-serif';
export const UNK = '#dc2626';
export const INK = '#1e293b';
export const GRID = '#cbd5e1';

export type Cell = [number, number]; // [oszlop, sor]
export type HalfKind = 'bl' | 'br' | 'tl' | 'tr';
export type Half = [number, number, HalfKind];
export type Pt = [number, number];

/** Szín-párok a síkidomokhoz (kitöltés, sötét vonal). */
export const PAL = {
  green: ['#86efac', '#166534'],
  blue: ['#7dd3fc', '#075985'],
  orange: ['#fdba74', '#9a3412'],
  red: ['#fca5a5', '#991b1b'],
  purple: ['#d8b4fe', '#6b21a8'],
  yellow: ['#fde047', '#854d0e'],
  pink: ['#f9a8d4', '#9d174d'],
  teal: ['#5eead4', '#115e59']
} as const;
export type PalName = keyof typeof PAL;

/** Kérdésábra-keret: 240 széles, h magas. */
export const QFig: React.FC<{ h?: number; children?: React.ReactNode }> = ({ h = 130, children }) => (
  <svg viewBox={`0 0 240 ${h}`} className="w-full max-w-[280px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="238" height={h - 2} rx="10" fill="#f8fafc" stroke="#cbd5e1" />
    {children}
  </svg>
);

/** Fél négyzet csúcsai (a cella melyik sarka felé esik a derékszög). */
export const halfPts = (c: number, r: number, k: HalfKind): Pt[] => {
  if (k === 'bl') return [[c, r], [c, r + 1], [c + 1, r + 1]];
  if (k === 'br') return [[c + 1, r], [c + 1, r + 1], [c, r + 1]];
  if (k === 'tl') return [[c, r], [c + 1, r], [c, r + 1]];
  return [[c, r], [c + 1, r], [c + 1, r + 1]];
};
export const cellPts = (c: number, r: number): Pt[] => [[c, r], [c + 1, r], [c + 1, r + 1], [c, r + 1]];

/** Szabályos kis háromszög a háromszögrácson (i: hely a sorban, j: sor). */
export const TRI_H = Math.sqrt(3) / 2;
export const triPts = (i: number, j: number): Pt[] => {
  const up = (i + j) % 2 === 0;
  return up
    ? [[i / 2, (j + 1) * TRI_H], [(i + 2) / 2, (j + 1) * TRI_H], [(i + 1) / 2, j * TRI_H]]
    : [[i / 2, j * TRI_H], [(i + 2) / 2, j * TRI_H], [(i + 1) / 2, (j + 1) * TRI_H]];
};

const key = (p: Pt) => `${Math.round(p[0] * 1000)},${Math.round(p[1] * 1000)}`;

/** A darabok határa: azok az oldalak, amelyek csak egyszer fordulnak elő. */
export const boundarySegs = (polys: Pt[][]): [Pt, Pt][] => {
  const m = new Map<string, { n: number; a: Pt; b: Pt }>();
  polys.forEach((poly) =>
    poly.forEach((a, i) => {
      const b = poly[(i + 1) % poly.length];
      const ka = key(a);
      const kb = key(b);
      const k = ka < kb ? `${ka}|${kb}` : `${kb}|${ka}`;
      const e = m.get(k);
      if (e) e.n++;
      else m.set(k, { n: 1, a, b });
    })
  );
  return [...m.values()].filter((e) => e.n === 1).map((e) => [e.a, e.b]);
};

/**
 * Darabokból álló síkidom. A pontok egységnyi koordinátában vannak;
 * (x, y) a bal felső sarok, s egy egység hossza.
 */
export const Pieces: React.FC<{
  polys: Pt[][];
  x?: number;
  y?: number;
  s: number;
  pal?: PalName;
  fill?: string;
  inner?: number;
  outline?: number;
  fills?: (string | undefined)[];
  nums?: boolean;
  numSize?: number;
}> = ({ polys, x = 0, y = 0, s, pal = 'green', fill, inner, outline, fills, nums, numSize }) => {
  const [f, d] = PAL[pal];
  const P = (p: Pt) => `${x + p[0] * s},${y + p[1] * s}`;
  const iw = inner ?? Math.max(0.8, s / 16);
  const ow = outline ?? Math.max(1.6, s / 7);
  return (
    <g>
      {polys.map((poly, i) => (
        <polygon key={i} points={poly.map(P).join(' ')} fill={fills?.[i] ?? fill ?? f} stroke={d} strokeWidth={iw} strokeLinejoin="round" />
      ))}
      {boundarySegs(polys).map(([a, b], i) => (
        <line key={`b${i}`} x1={x + a[0] * s} y1={y + a[1] * s} x2={x + b[0] * s} y2={y + b[1] * s} stroke={d} strokeWidth={ow} strokeLinecap="round" />
      ))}
      {nums &&
        polys.map((poly, i) => {
          const cx = poly.reduce((a, p) => a + p[0], 0) / poly.length;
          const cy = poly.reduce((a, p) => a + p[1], 0) / poly.length;
          return (
            <text key={`n${i}`} x={x + cx * s} y={y + cy * s + (numSize ?? s * 0.45) * 0.36} textAnchor="middle" fontSize={numSize ?? s * 0.45} fontWeight="bold" fill={INK}>
              {i + 1}
            </text>
          );
        })}
    </g>
  );
};

/** Kis négyzetekből (és fél négyzetekből) álló síkidom pontjai. */
export const shapePolys = (cells: Cell[], halves: Half[] = []): Pt[][] => [
  ...cells.map(([c, r]) => cellPts(c, r)),
  ...halves.map(([c, r, k]) => halfPts(c, r, k))
];

/** Halvány négyzetrács háttérnek. */
export const GridBg: React.FC<{ x: number; y: number; cols: number; rows: number; s: number; color?: string }> = ({ x, y, cols, rows, s, color = GRID }) => (
  <g>
    <rect x={x} y={y} width={cols * s} height={rows * s} fill="#fff" />
    {Array.from({ length: cols + 1 }).map((_, i) => (
      <line key={`v${i}`} x1={x + i * s} y1={y} x2={x + i * s} y2={y + rows * s} stroke={color} strokeWidth="0.8" />
    ))}
    {Array.from({ length: rows + 1 }).map((_, i) => (
      <line key={`h${i}`} x1={x} y1={y + i * s} x2={x + cols * s} y2={y + i * s} stroke={color} strokeWidth="0.8" />
    ))}
  </g>
);

/** Téglalap kis négyzetekből: rows sor, egy sorban cols négyzet. */
export const rectCells = (rows: number, cols: number, c0 = 0, r0 = 0): Cell[] => {
  const out: Cell[] = [];
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) out.push([c0 + c, r0 + r]);
  return out;
};

/** Befoglaló méret (egységben). */
export const bbox = (polys: Pt[][]) => {
  const xs = polys.flat().map((p) => p[0]);
  const ys = polys.flat().map((p) => p[1]);
  return { x0: Math.min(...xs), y0: Math.min(...ys), w: Math.max(...xs) - Math.min(...xs), h: Math.max(...ys) - Math.min(...ys) };
};

/** Síkidom egy adott dobozba középre igazítva, a lehető legnagyobb egységgel (legfeljebb maxS). */
export const FitPieces: React.FC<{
  polys: Pt[][];
  bx: number;
  by: number;
  bw: number;
  bh: number;
  maxS?: number;
  pal?: PalName;
  nums?: boolean;
  inner?: number;
  outline?: number;
  fills?: (string | undefined)[];
}> = ({ polys, bx, by, bw, bh, maxS = 30, pal, nums, inner, outline, fills }) => {
  const b = bbox(polys);
  const s = Math.min(maxS, bw / Math.max(b.w, 0.5), bh / Math.max(b.h, 0.5));
  const x = bx + (bw - b.w * s) / 2 - b.x0 * s;
  const y = by + (bh - b.h * s) / 2 - b.y0 * s;
  return <Pieces polys={polys} x={x} y={y} s={s} pal={pal} nums={nums} inner={inner} outline={outline} fills={fills} />;
};

/** Kis „Egység:” jelölés (négyzet, fél négyzet, dominó vagy kis háromszög). */
export const UnitTag: React.FC<{ x: number; y: number; kind?: 'sq' | 'half' | 'dom' | 'tri' | 'big'; s?: number; pal?: PalName; label?: string }> = ({
  x,
  y,
  kind = 'sq',
  s = 12,
  pal = 'yellow',
  label = 'Egység:'
}) => {
  const polys: Pt[][] =
    kind === 'sq'
      ? [cellPts(0, 0)]
      : kind === 'half'
        ? [halfPts(0, 0, 'bl')]
        : kind === 'dom'
          ? [cellPts(0, 0), cellPts(1, 0)]
          : kind === 'big'
            ? [cellPts(0, 0), cellPts(1, 0), cellPts(0, 1), cellPts(1, 1)]
            : [triPts(0, 0)];
  const b = bbox(polys);
  return (
    <g>
      <text x={x} y={y + 4} fontSize="11" fontWeight="bold" fill="#334155">
        {label}
      </text>
      <Pieces polys={polys} x={x + 46} y={y - (b.h * s) / 2} s={s} pal={pal} inner={0.9} outline={1.6} />
    </g>
  );
};

// ---------------------------------------------------------------------------
// Generátor a laborokhoz: összefüggő síkidom n kis négyzetből.
// ---------------------------------------------------------------------------
const rnd = (a: number, b: number) => a + Math.floor(Math.random() * (b - a + 1));

export const isConnected = (cells: Cell[]): boolean => {
  if (cells.length === 0) return false;
  const set = new Set(cells.map(([c, r]) => `${c},${r}`));
  const seen = new Set<string>([`${cells[0][0]},${cells[0][1]}`]);
  const stack: Cell[] = [cells[0]];
  while (stack.length) {
    const [c, r] = stack.pop() as Cell;
    (
      [
        [c + 1, r],
        [c - 1, r],
        [c, r + 1],
        [c, r - 1]
      ] as Cell[]
    ).forEach(([a, b]) => {
      const k = `${a},${b}`;
      if (set.has(k) && !seen.has(k)) {
        seen.add(k);
        stack.push([a, b]);
      }
    });
  }
  return seen.size === set.size;
};

/** Véletlen, összefüggő síkidom pontosan n kis négyzetből, legfeljebb maxW × maxH méretben. */
export const randomShape = (n: number, maxW = 5, maxH = 4): Cell[] => {
  for (let attempt = 0; attempt < 200; attempt++) {
    const cells: Cell[] = [[rnd(0, maxW - 1), rnd(0, maxH - 1)]];
    const has = (c: number, r: number) => cells.some(([a, b]) => a === c && b === r);
    let guard = 0;
    while (cells.length < n && guard++ < 500) {
      const [c, r] = cells[rnd(0, cells.length - 1)];
      const dirs: Cell[] = [
        [c + 1, r],
        [c - 1, r],
        [c, r + 1],
        [c, r - 1]
      ];
      const [a, b] = dirs[rnd(0, 3)];
      if (a >= 0 && b >= 0 && a < maxW && b < maxH && !has(a, b)) cells.push([a, b]);
    }
    if (cells.length === n) {
      const minC = Math.min(...cells.map((p) => p[0]));
      const minR = Math.min(...cells.map((p) => p[1]));
      return cells.map(([c, r]) => [c - minC, r - minR] as Cell);
    }
  }
  return rectCells(1, n);
};

/** A síkidom határának hossza kis négyzet-oldalban (kerület), csak egész cellákra. */
export const cellPerimeter = (cells: Cell[]): number => boundarySegs(shapePolys(cells)).length;

/** Labor II feladat (7. lecke): két síkidom kis négyzetekből. */
export type AreaCompareTask = { a: Cell[]; b: Cell[] };
export const makeAreaCompareTask = (): AreaCompareTask => {
  const na = rnd(5, 11);
  const nb = Math.random() < 0.25 ? na : Math.max(4, Math.min(12, na + (Math.random() < 0.5 ? -1 : 1) * rnd(1, 2)));
  return { a: randomShape(na, 4, 4), b: randomShape(nb, 4, 4) };
};

/** Síkidom szövegből: sorok „|”-vel elválasztva, „#” = kis négyzet. Pl. '##.|.##'. */
export const S = (str: string, dc = 0, dr = 0): Cell[] => {
  const out: Cell[] = [];
  str.split('|').forEach((row, r) => row.split('').forEach((ch, c) => ch === '#' && out.push([c + dc, r + dr])));
  return out;
};

/** Eltolás (egységben). */
export const shift = (polys: Pt[][], dx: number, dy: number): Pt[][] => polys.map((p) => p.map(([a, b]) => [a + dx, b + dy] as Pt));

/** Minden kis négyzetet két fél négyzetre vág. */
export const splitHalves = (cells: Cell[]): Half[] => cells.flatMap(([c, r]) => [[c, r, 'bl'] as Half, [c, r, 'tr'] as Half]);

/** Fél négyzetekkel együtt a terület kis négyzetben. */
export const areaOf = (cells: Cell[], halves: Half[] = []) => cells.length + halves.length / 2;

// Szabályos kis háromszögekből kirakott síkidomok.
export const HEX: Pt[][] = [triPts(0, 0), triPts(1, 0), triPts(2, 0), triPts(0, 1), triPts(1, 1), triPts(2, 1)];
export const RHOMB: Pt[][] = [triPts(0, 0), triPts(1, 0)];
export const TRAP3: Pt[][] = [triPts(0, 0), triPts(1, 0), triPts(2, 0)];
export const ROW5: Pt[][] = [0, 1, 2, 3, 4].map((i) => triPts(i, 0));
export const BIGTRI: Pt[][] = [triPts(2, 0), triPts(1, 1), triPts(2, 1), triPts(3, 1)];
export const PARA8: Pt[][] = [...[0, 1, 2, 3].map((i) => triPts(i, 0)), ...[-1, 0, 1, 2].map((i) => triPts(i, 1))];
export const BIGTRI9: Pt[][] = [triPts(2, 0), triPts(1, 1), triPts(2, 1), triPts(3, 1), ...[0, 1, 2, 3, 4].map((i) => triPts(i, 2))];
