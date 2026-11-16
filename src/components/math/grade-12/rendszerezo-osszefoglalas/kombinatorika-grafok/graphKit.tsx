import React from 'react';

/** Belső rajz- és számsegédek a kombinatorika–gráfok összefoglaló leckéhez (nem exportáljuk az index.ts-ből). */

export const G_BLUE = '#2563eb';
export const G_RED = '#dc2626';
export const G_GREEN = '#059669';
export const G_PURPLE = '#7c3aed';
export const G_AMBER = '#d97706';
export const G_INK = '#0f172a';

export const fact = (n: number): number => (n <= 1 ? 1 : n * fact(n - 1));
export const binom = (n: number, k: number): number => {
  if (k < 0 || k > n) return 0;
  let r = 1;
  for (let i = 0; i < k; i++) r = (r * (n - i)) / (i + 1);
  return Math.round(r);
};
export const falling = (n: number, k: number): number => {
  let r = 1;
  for (let i = 0; i < k; i++) r *= n - i;
  return r;
};
/** Ezres tagolás szóközzel. */
export const fmtInt = (x: number): string => {
  if (!Number.isFinite(x)) return '–';
  const s = Math.round(Math.abs(x)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  return (x < 0 ? '−' : '') + s;
};

/** n pont egy kör mentén (az első felül). */
export const circlePts = (n: number, cx: number, cy: number, r: number): [number, number][] =>
  Array.from({ length: n }, (_, i) => {
    const t = -Math.PI / 2 + (2 * Math.PI * i) / n;
    return [cx + r * Math.cos(t), cy + r * Math.sin(t)];
  });

export interface GraphDrawProps {
  pts: [number, number][];
  edges: [number, number][];
  labels?: string[];
  /** a csúcs mellé írt szöveg (pl. fokszám) */
  notes?: (string | null)[];
  highlight?: number[];
  edgeColor?: string;
  r?: number;
}

/** Gráf rajzolása egy <g>-ben. */
export const GraphDraw: React.FC<GraphDrawProps> = ({ pts, edges, labels, notes, highlight = [], edgeColor = '#475569', r = 11 }) => (
  <g>
    {edges.map(([a, b], i) => (
      <line key={i} x1={pts[a][0]} y1={pts[a][1]} x2={pts[b][0]} y2={pts[b][1]} stroke={edgeColor} strokeWidth="2" />
    ))}
    {pts.map(([x, y], i) => (
      <g key={i}>
        <circle cx={x} cy={y} r={r} fill={highlight.includes(i) ? '#fde68a' : '#dbeafe'} stroke={G_BLUE} strokeWidth="1.8" />
        {labels && (
          <text x={x} y={y + 4} fontSize="11" fontWeight="bold" textAnchor="middle" fill={G_INK}>
            {labels[i]}
          </text>
        )}
        {notes && notes[i] && (
          <text x={x + (x >= 0 ? 0 : 0)} y={y - r - 5} fontSize="10" fontWeight="bold" textAnchor="middle" fill={G_RED}>
            {notes[i]}
          </text>
        )}
      </g>
    ))}
  </g>
);

export const degrees = (n: number, edges: [number, number][]) => {
  const d = Array(n).fill(0);
  edges.forEach(([a, b]) => {
    d[a]++;
    d[b]++;
  });
  return d as number[];
};

export const completeEdges = (n: number): [number, number][] => {
  const e: [number, number][] = [];
  for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) e.push([i, j]);
  return e;
};
