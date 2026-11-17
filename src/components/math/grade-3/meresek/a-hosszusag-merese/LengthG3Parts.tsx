import React from 'react';

// Kis rajzelemek (vonalzó, négyzetrácsos út, apró tárgyak) – a Figures, Theory és Quiz fájlok használják.
export const FONT = 'system-ui, Segoe UI, sans-serif';

/**
 * Vonalzó. A 0 nem a vonalzó szélén van (pad), ahogy az igazi vonalzón.
 * x, y: a vonalzó bal felső sarka; cm: hány cm-es; s: hány px egy cm; mm: legyen-e mm-beosztás.
 */
export const Ruler: React.FC<{
  x: number;
  y: number;
  cm: number;
  s: number;
  mm?: boolean;
  h?: number;
  pad?: number;
  fontSize?: number;
  every?: number;
}> = ({ x, y, cm, s, mm = true, h = 34, pad = 8, fontSize = 11, every = 1 }) => {
  const ticks: React.ReactNode[] = [];
  const steps = mm ? cm * 10 : cm;
  for (let i = 0; i <= steps; i++) {
    const isCm = mm ? i % 10 === 0 : true;
    const isHalf = mm && i % 5 === 0 && !isCm;
    const tx = x + pad + (mm ? (i * s) / 10 : i * s);
    const len = isCm ? h * 0.42 : isHalf ? h * 0.3 : h * 0.2;
    ticks.push(<line key={i} x1={tx} y1={y} x2={tx} y2={y + len} stroke="#1e293b" strokeWidth={isCm ? 1.4 : 0.8} />);
    const c = mm ? i / 10 : i;
    if (isCm && c % every === 0) {
      ticks.push(
        <text key={`t${i}`} x={tx} y={y + h - 5} textAnchor="middle" fontSize={fontSize} fontWeight="bold" fill="#1e293b">
          {c}
        </text>
      );
    }
  }
  return (
    <g>
      <rect x={x} y={y} width={cm * s + 2 * pad} height={h} rx="3" fill="#fde047" stroke="#a16207" strokeWidth="1.4" />
      {ticks}
    </g>
  );
};

/** Szakasz két végén kis függőleges vonallal. */
export const Seg: React.FC<{ x1: number; x2: number; y: number; color?: string; w?: number }> = ({ x1, x2, y, color = '#2563eb', w = 4 }) => (
  <g stroke={color} strokeWidth={w} strokeLinecap="round">
    <line x1={x1} y1={y} x2={x2} y2={y} />
    <line x1={x1} y1={y - 7} x2={x1} y2={y + 7} strokeWidth={w * 0.7} />
    <line x1={x2} y1={y - 7} x2={x2} y2={y + 7} strokeWidth={w * 0.7} />
  </g>
);

/** Ceruza vízszintesen, hegye jobbra. x1: a ceruza vége, x2: a hegye. */
export const Pencil: React.FC<{ x1: number; x2: number; y: number; t?: number }> = ({ x1, x2, y, t = 12 }) => {
  const tip = Math.min(18, (x2 - x1) * 0.2);
  return (
    <g>
      <rect x={x1} y={y - t / 2} width={x2 - x1 - tip} height={t} fill="#f97316" stroke="#9a3412" strokeWidth="1.2" />
      <rect x={x1} y={y - t / 2} width={t * 0.6} height={t} fill="#f472b6" stroke="#9d174d" strokeWidth="1.2" />
      <polygon points={`${x2 - tip},${y - t / 2} ${x2},${y} ${x2 - tip},${y + t / 2}`} fill="#fde68a" stroke="#9a3412" strokeWidth="1.2" />
      <polygon points={`${x2 - tip * 0.35},${y - t * 0.17} ${x2},${y} ${x2 - tip * 0.35},${y + t * 0.17}`} fill="#334155" />
    </g>
  );
};

export type Dir = 'r' | 'l' | 'u' | 'd';
const DV: Record<Dir, [number, number]> = { r: [1, 0], l: [-1, 0], u: [0, -1], d: [0, 1] };

/** Négyzetrács és rajta egy út (nyilakkal megadva). Visszaadja a rajzot. */
export const GridPath: React.FC<{
  x: number;
  y: number;
  cols: number;
  rows: number;
  s: number;
  start: [number, number];
  path: Dir[];
  color?: string;
  w?: number;
  arrows?: boolean;
}> = ({ x, y, cols, rows, s, start, path, color = '#16a34a', w = 4, arrows = true }) => {
  const pts: [number, number][] = [start];
  path.forEach((d) => {
    const [px, py] = pts[pts.length - 1];
    pts.push([px + DV[d][0], py + DV[d][1]]);
  });
  const P = (p: [number, number]) => `${x + p[0] * s},${y + p[1] * s}`;
  return (
    <g>
      {Array.from({ length: cols + 1 }, (_, i) => (
        <line key={`v${i}`} x1={x + i * s} y1={y} x2={x + i * s} y2={y + rows * s} stroke="#bfdbfe" strokeWidth="1" />
      ))}
      {Array.from({ length: rows + 1 }, (_, i) => (
        <line key={`h${i}`} x1={x} y1={y + i * s} x2={x + cols * s} y2={y + i * s} stroke="#bfdbfe" strokeWidth="1" />
      ))}
      <polyline points={pts.map(P).join(' ')} fill="none" stroke={color} strokeWidth={w} strokeLinejoin="round" strokeLinecap="round" />
      {arrows &&
        path.map((d, i) => {
          const [ax, ay] = pts[i];
          const mx = x + (ax + DV[d][0] * 0.6) * s;
          const my = y + (ay + DV[d][1] * 0.6) * s;
          const a = 4.5;
          const [ux, uy] = DV[d];
          return (
            <polygon
              key={i}
              points={`${mx + ux * a},${my + uy * a} ${mx - ux * a - uy * a},${my - uy * a + ux * a} ${mx - ux * a + uy * a},${my - uy * a - ux * a}`}
              fill={color}
            />
          );
        })}
      <circle cx={x + start[0] * s} cy={y + start[1] * s} r={w + 1.5} fill="#dc2626" stroke="#fff" strokeWidth="1.5" />
    </g>
  );
};

/** Hangya oldalnézetből (kicsi). */
export const Ant: React.FC<{ cx: number; cy: number; k?: number }> = ({ cx, cy, k = 1 }) => (
  <g transform={`translate(${cx},${cy}) scale(${k})`} stroke="#1f2937" strokeWidth="1.6" strokeLinecap="round">
    {[-6, 0, 6].map((dx) => (
      <g key={dx}>
        <line x1={dx} y1={0} x2={dx - 4} y2={9} />
        <line x1={dx} y1={0} x2={dx + 4} y2={9} />
      </g>
    ))}
    <ellipse cx={-11} cy={-1} rx={7} ry={5} fill="#7c2d12" />
    <ellipse cx={0} cy={0} rx={4} ry={3.5} fill="#7c2d12" />
    <circle cx={9} cy={-2} r={4.5} fill="#7c2d12" />
    <line x1={11} y1={-5} x2={16} y2={-11} />
  </g>
);

/** Ajtó. */
export const Door: React.FC<{ x: number; y: number; w: number; h: number }> = ({ x, y, w, h }) => (
  <g>
    <rect x={x} y={y} width={w} height={h} fill="#b45309" stroke="#78350f" strokeWidth="2" />
    <rect x={x + w * 0.15} y={y + h * 0.08} width={w * 0.7} height={h * 0.36} fill="#d97706" stroke="#78350f" strokeWidth="1.2" />
    <rect x={x + w * 0.15} y={y + h * 0.52} width={w * 0.7} height={h * 0.4} fill="#d97706" stroke="#78350f" strokeWidth="1.2" />
    <circle cx={x + w * 0.8} cy={y + h * 0.5} r={Math.max(2, w * 0.06)} fill="#fde047" stroke="#78350f" />
  </g>
);

/** Könyv oldalról (vastagság látszik). */
export const BookSide: React.FC<{ x: number; y: number; w: number; t: number; color?: string }> = ({ x, y, w, t, color = '#2563eb' }) => (
  <g>
    <rect x={x} y={y} width={w} height={t} rx="2" fill={color} stroke="#1e293b" strokeWidth="1.2" />
    <rect x={x + 4} y={y + 2} width={w - 6} height={t - 4} fill="#f8fafc" stroke="#cbd5e1" strokeWidth="0.6" />
    <rect x={x} y={y} width={6} height={t} fill={color} stroke="#1e293b" strokeWidth="1.2" />
  </g>
);
