import React from 'react';

// ---------------------------------------------------------------------------
// XIV. Ismerkedés a törtekkel – közös rajzelemek és segédfüggvények
// (az 1. és a 2. lecke is ezt használja)
// ---------------------------------------------------------------------------

export const FONT = 'Nunito, Arial, sans-serif';
export const INK = '#1e293b';
export const PAPER = '#ffffff';
export const CAKE = '#7c2d12';
export const CAKE_TOP = '#a16207';
export const CREAM = '#fef3c7';
export const SOFT = '#fff7ed';

export const rnd = (a: number, b: number) => a + Math.floor(Math.random() * (b - a + 1));
export const shuffle = <T,>(a: T[]): T[] => {
  const r = [...a];
  for (let i = r.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [r[i], r[j]] = [r[j], r[i]];
  }
  return r;
};

/** A részek neve a részek száma szerint (a könyv szóhasználata). */
export const PART_NAME: Record<number, string> = {
  2: 'ketted',
  3: 'harmad',
  4: 'negyed',
  5: 'ötöd',
  6: 'hatod',
  8: 'nyolcad',
  10: 'tized'
};
/** „a torta …-e” alak. */
export const PART_OF: Record<number, string> = {
  2: 'kettede',
  3: 'harmada',
  4: 'negyede',
  5: 'ötöde',
  6: 'hatoda',
  8: 'nyolcada',
  10: 'tizede'
};
/** „Hányad részét…” → „1 negyed részét” */
export const PART_ACC: Record<number, string> = {
  2: 'kettedét',
  3: 'harmadát',
  4: 'negyedét',
  5: 'ötödét',
  6: 'hatodát',
  8: 'nyolcadát',
  10: 'tizedét'
};
export const PART_NS = [2, 3, 4, 5, 6, 8, 10];

export const Txt: React.FC<{ x: number; y: number; s?: number; c?: string; w?: number | string; a?: 'start' | 'middle' | 'end'; children: React.ReactNode }> = ({
  x,
  y,
  s = 14,
  c = INK,
  w = 'bold',
  a = 'middle',
  children
}) => (
  <text x={x} y={y} fontSize={s} fill={c} fontWeight={w} textAnchor={a} fontFamily={FONT}>
    {children}
  </text>
);

// ----- körcikkek -----------------------------------------------------------
const pt = (cx: number, cy: number, r: number, deg: number) => {
  const a = ((deg - 90) * Math.PI) / 180;
  return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
};
export const sectorPath = (cx: number, cy: number, r: number, a0: number, a1: number) => {
  if (a1 - a0 >= 359.99) return `M ${cx - r} ${cy} A ${r} ${r} 0 1 1 ${cx + r} ${cy} A ${r} ${r} 0 1 1 ${cx - r} ${cy} Z`;
  const [x0, y0] = pt(cx, cy, r, a0);
  const [x1, y1] = pt(cx, cy, r, a1);
  const large = a1 - a0 > 180 ? 1 : 0;
  return `M ${cx} ${cy} L ${x0.toFixed(2)} ${y0.toFixed(2)} A ${r} ${r} 0 ${large} 1 ${x1.toFixed(2)} ${y1.toFixed(2)} Z`;
};

/** n egyenlő rész határai fokban (0 = fent, az óramutató járása szerint). */
export const equalAngles = (n: number, start = 0) => Array.from({ length: n + 1 }, (_, i) => start + (360 * i) / n);

/**
 * Kör (torta, pizza) részekre vágva. `bounds`: a részek határai fokban (n + 1 érték, 0…360).
 * `colored`: melyik rész színes. Ha `cake`, csokitorta-felülnézet.
 */
export const Pie: React.FC<{
  cx: number;
  cy: number;
  r: number;
  bounds: number[];
  colored?: boolean[];
  color?: string;
  base?: string;
  cake?: boolean;
  sw?: number;
  onPart?: (i: number) => void;
  gapOut?: number[];
}> = ({ cx, cy, r, bounds, colored = [], color = '#ef4444', base = SOFT, cake = false, sw = 2.5, onPart, gapOut = [] }) => {
  const n = bounds.length - 1;
  return (
    <g>
      {cake && <circle cx={cx} cy={cy + r * 0.08} r={r * 1.02} fill="#451a03" />}
      {Array.from({ length: n }, (_, i) => {
        const mid = (bounds[i] + bounds[i + 1]) / 2;
        const out = gapOut.includes(i) ? r * 0.12 : 0;
        const [dx, dy] = pt(0, 0, out, mid);
        const fill = colored[i] ? color : cake ? CAKE_TOP : base;
        return (
          <path
            key={i}
            d={sectorPath(cx + dx, cy + dy, r, bounds[i], bounds[i + 1])}
            fill={fill}
            stroke={cake ? CREAM : INK}
            strokeWidth={sw}
            strokeLinejoin="round"
            onClick={onPart ? () => onPart(i) : undefined}
            style={onPart ? { cursor: 'pointer' } : undefined}
          />
        );
      })}
      {cake &&
        Array.from({ length: n }, (_, i) => {
          const mid = (bounds[i] + bounds[i + 1]) / 2;
          const [x, y] = pt(cx, cy, r * 0.72, mid);
          return <circle key={`d${i}`} cx={x} cy={y} r={Math.max(2, r * 0.07)} fill={colored[i] ? '#fff' : '#fca5a5'} stroke="#7f1d1d" strokeWidth={1} pointerEvents="none" />;
        })}
    </g>
  );
};

// ----- csík / téglalap -----------------------------------------------------
/** Téglalap csíkokra vágva. `cuts`: a belső vágások helye 0…1 között. */
export const Bar: React.FC<{
  x: number;
  y: number;
  w: number;
  h: number;
  cuts: number[];
  colored?: boolean[];
  color?: string;
  base?: string;
  vertical?: boolean;
  sw?: number;
  dashed?: boolean;
  onPart?: (i: number) => void;
}> = ({ x, y, w, h, cuts, colored = [], color = '#22c55e', base = PAPER, vertical = false, sw = 2.5, dashed = false, onPart }) => {
  const b = [0, ...cuts, 1];
  return (
    <g>
      {b.slice(0, -1).map((p, i) => {
        const q = b[i + 1];
        const rx = vertical ? x : x + p * w;
        const ry = vertical ? y + p * h : y;
        const rw = vertical ? w : (q - p) * w;
        const rh = vertical ? (q - p) * h : h;
        return (
          <rect
            key={i}
            x={rx}
            y={ry}
            width={rw}
            height={rh}
            fill={colored[i] ? color : base}
            stroke="none"
            onClick={onPart ? () => onPart(i) : undefined}
            style={onPart ? { cursor: 'pointer' } : undefined}
          />
        );
      })}
      {cuts.map((c, i) =>
        vertical ? (
          <line key={`c${i}`} x1={x} x2={x + w} y1={y + c * h} y2={y + c * h} stroke={INK} strokeWidth={sw} strokeDasharray={dashed ? '6 4' : undefined} pointerEvents="none" />
        ) : (
          <line key={`c${i}`} x1={x + c * w} x2={x + c * w} y1={y} y2={y + h} stroke={INK} strokeWidth={sw} strokeDasharray={dashed ? '6 4' : undefined} pointerEvents="none" />
        )
      )}
      <rect x={x} y={y} width={w} height={h} fill="none" stroke={INK} strokeWidth={sw} pointerEvents="none" />
    </g>
  );
};
export const equalCuts = (n: number) => Array.from({ length: n - 1 }, (_, i) => (i + 1) / n);

/** Rács: rows × cols egyenlő rész. A részek sorfolytonosan számozva. */
export const Grid: React.FC<{
  x: number;
  y: number;
  w: number;
  h: number;
  rows: number;
  cols: number;
  colored?: boolean[];
  color?: string;
  sw?: number;
  dashed?: boolean;
  onPart?: (i: number) => void;
}> = ({ x, y, w, h, rows, cols, colored = [], color = '#38bdf8', sw = 2.5, dashed = false, onPart }) => (
  <g>
    {Array.from({ length: rows * cols }, (_, i) => {
      const r = Math.floor(i / cols);
      const c = i % cols;
      return (
        <rect
          key={i}
          x={x + (c * w) / cols}
          y={y + (r * h) / rows}
          width={w / cols}
          height={h / rows}
          fill={colored[i] ? color : PAPER}
          stroke={INK}
          strokeWidth={sw * 0.8}
          strokeDasharray={dashed ? '6 4' : undefined}
          onClick={onPart ? () => onPart(i) : undefined}
          style={onPart ? { cursor: 'pointer' } : undefined}
        />
      );
    })}
    <rect x={x} y={y} width={w} height={h} fill="none" stroke={INK} strokeWidth={sw} pointerEvents="none" />
  </g>
);

/** Négyzet átlóival 4 egyenlő háromszögre vágva (felső, jobb, alsó, bal). */
export const DiagSquare: React.FC<{ x: number; y: number; s: number; colored?: boolean[]; color?: string; sw?: number }> = ({ x, y, s, colored = [], color = '#f59e0b', sw = 2.5 }) => {
  const c = [x + s / 2, y + s / 2];
  const tri = [
    [x, y, x + s, y],
    [x + s, y, x + s, y + s],
    [x + s, y + s, x, y + s],
    [x, y + s, x, y]
  ];
  return (
    <g>
      {tri.map((t, i) => (
        <path key={i} d={`M ${t[0]} ${t[1]} L ${t[2]} ${t[3]} L ${c[0]} ${c[1]} Z`} fill={colored[i] ? color : PAPER} stroke={INK} strokeWidth={sw} strokeLinejoin="round" />
      ))}
    </g>
  );
};

// ----- nem egyenlő vágások --------------------------------------------------
/** n rész határai fokban, láthatóan NEM egyenlő részekkel (a legnagyobb ≥ 1,8 × a legkisebb). */
export const unequalAngles = (n: number): number[] => {
  for (;;) {
    const w = Array.from({ length: n }, () => 1 + Math.random() * 2.2);
    const s = w.reduce((a, b) => a + b, 0);
    const ang = w.map((v) => (v / s) * 360);
    if (Math.max(...ang) / Math.min(...ang) < 1.8) continue;
    if (Math.min(...ang) < 22) continue;
    const start = rnd(0, 3) * 15;
    const out = [start];
    ang.forEach((a) => out.push(out[out.length - 1] + a));
    return out;
  }
};
/** n csík belső vágásai, láthatóan nem egyenlő csíkokkal. */
export const unequalCuts = (n: number): number[] => {
  for (;;) {
    const w = Array.from({ length: n }, () => 1 + Math.random() * 2.2);
    const s = w.reduce((a, b) => a + b, 0);
    const p = w.map((v) => v / s);
    if (Math.max(...p) / Math.min(...p) < 1.8 || Math.min(...p) < 0.08) continue;
    const cuts: number[] = [];
    let acc = 0;
    p.slice(0, -1).forEach((v) => {
      acc += v;
      cuts.push(acc);
    });
    return cuts;
  }
};

// ----- jelek ----------------------------------------------------------------
/** Pipa (egyenlő részek). */
export const Tick: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 14 }) => (
  <path d={`M ${x - s} ${y} L ${x - s * 0.3} ${y + s * 0.7} L ${x + s} ${y - s * 0.8}`} fill="none" stroke="#16a34a" strokeWidth={s * 0.35} strokeLinecap="round" strokeLinejoin="round" />
);
/** X (nem egyenlő részek). */
export const Cross: React.FC<{ x: number; y: number; s?: number }> = ({ x, y, s = 12 }) => (
  <g stroke="#dc2626" strokeWidth={s * 0.4} strokeLinecap="round">
    <line x1={x - s} y1={y - s} x2={x + s} y2={y + s} />
    <line x1={x + s} y1={y - s} x2={x - s} y2={y + s} />
  </g>
);

/** Tányér egy tortaszelettel (felülnézet). */
export const PlateSlice: React.FC<{ cx: number; cy: number; r: number; n: number }> = ({ cx, cy, r, n }) => (
  <g>
    <ellipse cx={cx} cy={cy} rx={r * 1.25} ry={r * 1.25} fill="#e0f2fe" stroke="#64748b" strokeWidth={2} />
    <ellipse cx={cx} cy={cy} rx={r * 0.95} ry={r * 0.95} fill="none" stroke="#94a3b8" strokeWidth={1.5} />
    <path d={sectorPath(cx, cy + r * 0.45, r, -180 / n, 180 / n)} fill={CAKE_TOP} stroke={CREAM} strokeWidth={2.5} strokeLinejoin="round" />
  </g>
);
