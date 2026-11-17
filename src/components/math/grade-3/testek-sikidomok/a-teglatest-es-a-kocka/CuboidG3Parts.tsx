import React from 'react';
import { INK, FONT, PolySolid, boxGeom, KX, KY } from '../a-testek/SolidsG3Parts';

// ---------------------------------------------------------------------------
// 2. A téglatest és a kocka – közös rajzok és segédfüggvények
// ---------------------------------------------------------------------------
export { INK, FONT };

/** Téglatest (hossz × magasság × mélység) egy dobozba igazítva; a takart élek szaggatottak. */
export const Box: React.FC<{
  l: number;
  h: number;
  d: number;
  x: number;
  y: number;
  w: number;
  hh: number;
  color?: string;
  sw?: number;
  faceFill?: (i: number) => string | undefined;
  maxU?: number;
}> = ({ l, h, d, x, y, w, hh, color = '#f59e0b', sw = 2, faceFill, maxU = 60 }) => {
  const ew = l + KX * d;
  const eh = h + KY * d;
  const u = Math.min(w / ew, hh / eh, maxU);
  const ox = x + (w - ew * u) / 2;
  const oy = y + hh - (hh - eh * u) / 2;
  return <PolySolid {...boxGeom(l, h, d)} ox={ox} oy={oy} u={u} color={color} sw={sw} faceFill={faceFill} />;
};

/** Téglatest kis kockákból: hossz (oszlop) × mélység (sor) × magasság (réteg). */
export const cuboidPlan = (l: number, d: number, h: number): number[][] => Array.from({ length: d }, () => Array(l).fill(h));

// ---------------------------------------------------------------------------
// Testhálók (négyzetrácson): cellák listája [sor, oszlop]
// ---------------------------------------------------------------------------
export type Cell = [number, number];

/**
 * Összehajtható-e kockává? A kockát cellánként „végiggörgetjük” a hálón:
 * minden cellára más lapja kerül le, ha a háló jó (6 különböző lap).
 */
export const foldsToCube = (cells: Cell[]): boolean => {
  if (cells.length !== 6) return false;
  const key = (c: Cell) => `${c[0]},${c[1]}`;
  const set = new Set(cells.map(key));
  // orientáció: [le, fel, észak, dél, kelet, nyugat] lapsorszámai
  type O = [number, number, number, number, number, number];
  const roll = (o: O, dir: 'N' | 'S' | 'E' | 'W'): O => {
    const [dn, up, n, s, e, w] = o;
    if (dir === 'N') return [n, s, up, dn, e, w];
    if (dir === 'S') return [s, n, dn, up, e, w];
    if (dir === 'E') return [e, w, n, s, up, dn];
    return [w, e, n, s, dn, up];
  };
  const seen = new Map<string, number>();
  const stack: [Cell, O][] = [[cells[0], [0, 1, 2, 3, 4, 5]]];
  seen.set(key(cells[0]), 0);
  while (stack.length) {
    const [c, o] = stack.pop()!;
    const moves: [Cell, 'N' | 'S' | 'E' | 'W'][] = [
      [[c[0] - 1, c[1]], 'N'],
      [[c[0] + 1, c[1]], 'S'],
      [[c[0], c[1] + 1], 'E'],
      [[c[0], c[1] - 1], 'W']
    ];
    for (const [nc, dir] of moves) {
      if (!set.has(key(nc)) || seen.has(key(nc))) continue;
      const no = roll(o, dir);
      seen.set(key(nc), no[0]);
      stack.push([nc, no]);
    }
  }
  return seen.size === 6 && new Set(seen.values()).size === 6;
};

/** Jó kockahálók (mind a 11-ből 9). */
export const CUBE_NETS_OK: Cell[][] = [
  [[0, 1], [1, 0], [1, 1], [1, 2], [1, 3], [2, 1]],
  [[0, 0], [1, 0], [1, 1], [1, 2], [1, 3], [2, 0]],
  [[0, 0], [1, 0], [1, 1], [1, 2], [1, 3], [2, 1]],
  [[0, 0], [1, 0], [1, 1], [1, 2], [1, 3], [2, 2]],
  [[0, 0], [1, 0], [1, 1], [1, 2], [1, 3], [2, 3]],
  [[0, 1], [1, 0], [1, 1], [1, 2], [1, 3], [2, 2]],
  [[0, 0], [0, 1], [1, 1], [1, 2], [1, 3], [2, 3]],
  [[0, 0], [0, 1], [1, 1], [1, 2], [2, 2], [2, 3]],
  [[0, 0], [0, 1], [0, 2], [1, 2], [1, 3], [1, 4]]
];

/** Hat négyzetből álló alakzatok, amelyekből NEM lesz kocka. */
export const CUBE_NETS_BAD: Cell[][] = [
  [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5]],
  [[0, 0], [0, 1], [0, 2], [1, 0], [1, 1], [1, 2]],
  [[0, 0], [0, 1], [1, 0], [1, 1], [1, 2], [1, 3]],
  [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [1, 2]],
  [[0, 1], [1, 0], [1, 1], [1, 2], [2, 1], [2, 2]],
  [[0, 0], [1, 0], [1, 1], [1, 2], [1, 3], [0, 3]],
  [[0, 0], [0, 1], [0, 2], [0, 3], [1, 0], [1, 3]],
  [[0, 1], [0, 2], [1, 0], [1, 1], [2, 1], [2, 2]],
  [[0, 0], [1, 0], [2, 0], [3, 0], [3, 1], [4, 1]]
];

/** Háló rajza: cellák négyzetként, opcionális színnel és felirattal, egy dobozba igazítva. */
export const NetGrid: React.FC<{
  cells: Cell[];
  x: number;
  y: number;
  w: number;
  h: number;
  maxCell?: number;
  fill?: string | ((i: number) => string);
  labels?: string[];
  sw?: number;
  fs?: number;
}> = ({ cells, x, y, w, h, maxCell = 30, fill = '#fef3c7', labels, sw = 2, fs }) => {
  const R = Math.max(...cells.map((c) => c[0])) + 1;
  const C = Math.max(...cells.map((c) => c[1])) + 1;
  const s = Math.min(w / C, h / R, maxCell);
  const ox = x + (w - C * s) / 2;
  const oy = y + (h - R * s) / 2;
  return (
    <g fontFamily={FONT}>
      {cells.map(([r, c], i) => (
        <g key={i}>
          <rect x={ox + c * s} y={oy + r * s} width={s} height={s} fill={typeof fill === 'function' ? fill(i) : fill} stroke={INK} strokeWidth={sw} />
          {labels?.[i] && (
            <text x={ox + c * s + s / 2} y={oy + r * s + s / 2 + (fs ?? s * 0.5) * 0.36} textAnchor="middle" fontSize={fs ?? s * 0.5} fontWeight="bold" fill={labels[i] === '?' ? '#dc2626' : INK}>
              {labels[i]}
            </text>
          )}
        </g>
      ))}
    </g>
  );
};

/**
 * Téglatest hálója (hossz l, mélység d, magasság h). A középső sor: bal oldal, eleje, jobb oldal, hátulja;
 * a teteje az eleje fölött, az alja az eleje (bottom = 'front') vagy a hátulja (bottom = 'back') alatt.
 */
export const CuboidNet: React.FC<{
  l: number;
  d: number;
  h: number;
  x: number;
  y: number;
  w: number;
  hh: number;
  bottom?: 'front' | 'back';
  rotate?: boolean;
  colors?: [string, string, string];
  sw?: number;
}> = ({ l, d, h, x, y, w, hh, bottom = 'front', rotate = false, colors = ['#fde68a', '#bfdbfe', '#fecaca'], sw = 2 }) => {
  // egységekben: [x, y, szélesség, magasság, színosztály]  (0: eleje/hátulja, 1: teteje/alja, 2: oldalak)
  const rects: [number, number, number, number, number][] = [
    [0, d, d, h, 2],
    [d, d, l, h, 0],
    [d + l, d, d, h, 2],
    [2 * d + l, d, l, h, 0],
    [d, 0, l, d, 1],
    [bottom === 'front' ? d : 2 * d + l, d + h, l, d, 1]
  ];
  const TW = 2 * d + 2 * l;
  const TH = 2 * d + h;
  const rw = rotate ? TH : TW;
  const rh = rotate ? TW : TH;
  const u = Math.min(w / rw, hh / rh);
  const ox = x + (w - rw * u) / 2;
  const oy = y + (hh - rh * u) / 2;
  return (
    <g>
      {rects.map(([rx, ry, rw2, rh2, k], i) => {
        const [X, Y, W, H] = rotate ? [ry, TW - rx - rw2, rh2, rw2] : [rx, ry, rw2, rh2];
        return <rect key={i} x={ox + X * u} y={oy + Y * u} width={W * u} height={H * u} fill={colors[k]} stroke={INK} strokeWidth={sw} />;
      })}
    </g>
  );
};

/** Dobókocka pöttyökkel (szemből, egy lap). */
export const DieFace: React.FC<{ n: number | '?'; x: number; y: number; s: number; sw?: number }> = ({ n, x, y, s, sw = 2.5 }) => {
  const P: Record<number, [number, number][]> = {
    1: [[0.5, 0.5]],
    2: [[0.27, 0.27], [0.73, 0.73]],
    3: [[0.25, 0.25], [0.5, 0.5], [0.75, 0.75]],
    4: [[0.27, 0.27], [0.73, 0.27], [0.27, 0.73], [0.73, 0.73]],
    5: [[0.25, 0.25], [0.75, 0.25], [0.5, 0.5], [0.25, 0.75], [0.75, 0.75]],
    6: [[0.27, 0.22], [0.73, 0.22], [0.27, 0.5], [0.73, 0.5], [0.27, 0.78], [0.73, 0.78]]
  };
  return (
    <g fontFamily={FONT}>
      <rect x={x} y={y} width={s} height={s} rx={s * 0.15} fill={n === '?' ? '#fee2e2' : '#ffffff'} stroke={INK} strokeWidth={sw} />
      {n === '?' ? (
        <text x={x + s / 2} y={y + s * 0.68} textAnchor="middle" fontSize={s * 0.55} fontWeight="bold" fill="#dc2626">
          ?
        </text>
      ) : (
        P[n].map(([px, py], i) => <circle key={i} cx={x + px * s} cy={y + py * s} r={s * 0.085} fill={INK} />)
      )}
    </g>
  );
};
