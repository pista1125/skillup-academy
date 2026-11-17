import React from 'react';

// Kis rajzelemek (sokszög feliratozott oldalakkal, négyzetrácsos alakzat, pálcikás sokszög, katica).
export const FONT = 'system-ui, Segoe UI, sans-serif';

export type Pt = [number, number];
export const SIDE_COLORS = ['#2563eb', '#dc2626', '#16a34a', '#d97706', '#7c3aed', '#db2777'];

/**
 * Sokszög, minden oldal külön színnel, az oldalak mellett felirattal (kifelé tolva).
 * A csúcsokat a képernyőn az óramutató járása szerint add meg!
 */
export const PolyShape: React.FC<{
  pts: Pt[];
  labels?: (string | null)[];
  colors?: string[];
  fill?: string;
  off?: number;
  fontSize?: number;
  w?: number;
  unknownColor?: string;
  /** azoknak az oldalaknak a sorszáma, amelyek felirata befelé (a síkidomba) kerüljön */
  inside?: number[];
}> = ({ pts, labels = [], colors = SIDE_COLORS, fill = '#fef9c3', off = 12, fontSize = 13, w = 3.5, unknownColor = '#dc2626', inside = [] }) => (
  <g>
    <polygon points={pts.map((p) => p.join(',')).join(' ')} fill={fill} stroke="none" />
    {pts.map((p, i) => {
      const q = pts[(i + 1) % pts.length];
      const dx = q[0] - p[0];
      const dy = q[1] - p[1];
      const L = Math.hypot(dx, dy) || 1;
      const sgn = inside.includes(i) ? -1 : 1;
      const nx = (sgn * dy) / L;
      const ny = (sgn * -dx) / L;
      const lab = labels[i];
      // a felirat szélességét és magasságát is figyelembe vesszük, hogy ne lógjon rá a vonalra
      const tw = (lab ? lab.length : 0) * fontSize * 0.56;
      const d = off * 0.6 + Math.abs(nx) * (tw / 2) + Math.abs(ny) * (fontSize * 0.5);
      const mx = (p[0] + q[0]) / 2 + nx * d;
      const my = (p[1] + q[1]) / 2 + ny * d + fontSize * 0.35;
      return (
        <g key={i}>
          <line x1={p[0]} y1={p[1]} x2={q[0]} y2={q[1]} stroke={colors[i % colors.length]} strokeWidth={w} strokeLinecap="round" />
          {lab && (
            <text x={mx} y={my} textAnchor="middle" fontSize={fontSize} fontWeight="bold" fill={lab.includes('?') ? unknownColor : '#0f172a'}>
              {lab}
            </text>
          )}
        </g>
      );
    })}
  </g>
);

/** Szabályos sokszög csúcsai (az óramutató járása szerint, felül kezdve). */
export const regularPts = (n: number, cx: number, cy: number, r: number, rot = 0): Pt[] =>
  Array.from({ length: n }, (_, i) => {
    const a = -Math.PI / 2 + rot + (i * 2 * Math.PI) / n;
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)] as Pt;
  });

/** Pálcikás sokszög: minden oldal egy pálcika (színesen, a végén gombostűfej). */
export const StickPolygon: React.FC<{ pts: Pt[]; w?: number }> = ({ pts, w = 5 }) => (
  <g>
    {pts.map((p, i) => {
      const q = pts[(i + 1) % pts.length];
      return <line key={i} x1={p[0]} y1={p[1]} x2={q[0]} y2={q[1]} stroke={SIDE_COLORS[i % SIDE_COLORS.length]} strokeWidth={w} strokeLinecap="round" />;
    })}
    {pts.map((p, i) => (
      <circle key={`c${i}`} cx={p[0]} cy={p[1]} r={w * 0.55} fill="#1e293b" />
    ))}
  </g>
);

// ---------------------------------------------------------------------------
// Négyzetrácsos alakzatok
// ---------------------------------------------------------------------------
export type Cell = [number, number]; // [oszlop, sor]
interface Edge { a: Pt; b: Pt }

/** A négyzetekből álló alakzat határa körbejárási sorrendben (óramutató szerint). */
export const traceBoundary = (cells: Cell[]): Edge[] => {
  const has = new Set(cells.map(([c, r]) => `${c},${r}`));
  const H = (c: number, r: number) => has.has(`${c},${r}`);
  const out = new Map<string, Edge>();
  cells.forEach(([c, r]) => {
    if (!H(c, r - 1)) out.set(`${c},${r}`, { a: [c, r], b: [c + 1, r] });
    if (!H(c + 1, r)) out.set(`${c + 1},${r}`, { a: [c + 1, r], b: [c + 1, r + 1] });
    if (!H(c, r + 1)) out.set(`${c + 1},${r + 1}`, { a: [c + 1, r + 1], b: [c, r + 1] });
    if (!H(c - 1, r)) out.set(`${c},${r + 1}`, { a: [c, r + 1], b: [c, r] });
  });
  // kezdés a legfelső sor bal szélső felső élénél
  const first = [...out.values()].sort((e, f) => e.a[1] - f.a[1] || e.a[0] - f.a[0])[0];
  const res: Edge[] = [];
  let cur = first;
  for (let k = 0; k < 400 && cur; k++) {
    res.push(cur);
    const nxt = out.get(`${cur.b[0]},${cur.b[1]}`);
    if (!nxt || nxt === first) break;
    cur = nxt;
  }
  return res;
};

export const countBoundary = (cells: Cell[]) => {
  const has = new Set(cells.map(([c, r]) => `${c},${r}`));
  let n = 0;
  cells.forEach(([c, r]) => {
    [[0, -1], [1, 0], [0, 1], [-1, 0]].forEach(([dc, dr]) => {
      if (!has.has(`${c + dc},${r + dr}`)) n++;
    });
  });
  return n;
};

/** Négyzetrács és rajta egy alakzat; numbers: a határ kis szakaszainak sorszáma. */
export const GridShape: React.FC<{
  x: number;
  y: number;
  s: number;
  cols: number;
  rows: number;
  cells: Cell[];
  fill?: string;
  stroke?: string;
  numbers?: boolean;
  numSize?: number;
  w?: number;
}> = ({ x, y, s, cols, rows, cells, fill = '#bfdbfe', stroke = '#1d4ed8', numbers = false, numSize = 10, w = 3 }) => {
  const edges = traceBoundary(cells);
  return (
    <g>
      {cells.map(([c, r], i) => (
        <rect key={i} x={x + c * s} y={y + r * s} width={s} height={s} fill={fill} />
      ))}
      {Array.from({ length: cols + 1 }, (_, i) => (
        <line key={`v${i}`} x1={x + i * s} y1={y} x2={x + i * s} y2={y + rows * s} stroke="#94a3b8" strokeWidth="0.8" />
      ))}
      {Array.from({ length: rows + 1 }, (_, i) => (
        <line key={`h${i}`} x1={x} y1={y + i * s} x2={x + cols * s} y2={y + i * s} stroke="#94a3b8" strokeWidth="0.8" />
      ))}
      <polygon points={edges.map((e) => `${x + e.a[0] * s},${y + e.a[1] * s}`).join(' ')} fill="none" stroke={stroke} strokeWidth={w} strokeLinejoin="round" />
      {numbers &&
        edges.map((e, i) => {
          const dx = e.b[0] - e.a[0];
          const dy = e.b[1] - e.a[1];
          // a szám az alakzaton belül, a saját kis négyzetében, az él mellett
          const mx = x + ((e.a[0] + e.b[0]) / 2) * s - dy * s * 0.22;
          const my = y + ((e.a[1] + e.b[1]) / 2) * s + dx * s * 0.22 + numSize * 0.35;
          return (
            <text key={i} x={mx} y={my} textAnchor="middle" fontSize={numSize} fontWeight="bold" fill="#b91c1c">
              {i + 1}
            </text>
          );
        })}
    </g>
  );
};

/** Katica felülnézetből. */
export const Ladybug: React.FC<{ cx: number; cy: number; r?: number; rot?: number }> = ({ cx, cy, r = 9, rot = 0 }) => (
  <g transform={`translate(${cx},${cy}) rotate(${rot})`}>
    <circle cx={0} cy={-r * 0.95} r={r * 0.45} fill="#1f2937" />
    <ellipse cx={0} cy={0} rx={r * 0.85} ry={r} fill="#dc2626" stroke="#1f2937" strokeWidth={r * 0.14} />
    <line x1={0} y1={-r * 0.9} x2={0} y2={r} stroke="#1f2937" strokeWidth={r * 0.14} />
    <circle cx={-r * 0.38} cy={-r * 0.2} r={r * 0.18} fill="#1f2937" />
    <circle cx={r * 0.38} cy={-r * 0.2} r={r * 0.18} fill="#1f2937" />
    <circle cx={-r * 0.38} cy={r * 0.45} r={r * 0.18} fill="#1f2937" />
    <circle cx={r * 0.38} cy={r * 0.45} r={r * 0.18} fill="#1f2937" />
  </g>
);

/** Kis fenyőfa a kertekhez. */
export const Pine: React.FC<{ x: number; y: number; k?: number }> = ({ x, y, k = 1 }) => (
  <g transform={`translate(${x},${y}) scale(${k})`}>
    <rect x={-2} y={8} width={4} height={6} fill="#78350f" />
    <polygon points="0,-10 9,9 -9,9" fill="#16a34a" stroke="#14532d" strokeWidth="1" />
  </g>
);
