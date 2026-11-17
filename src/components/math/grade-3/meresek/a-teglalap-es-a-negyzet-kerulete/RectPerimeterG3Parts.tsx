import React from 'react';

// Kis rajzelemek (derékszög-jel, téglalap feliratokkal, négyzetrácsos téglalap).
export const FONT = 'system-ui, Segoe UI, sans-serif';
export const LONG = '#2563eb'; // a vízszintes (felső, alsó) oldalak színe
export const SHORT = '#dc2626'; // a függőleges (bal, jobb) oldalak színe

/**
 * Derékszög jele a magyar szokás szerint: negyedkörív és pont.
 * (x, y): a csúcs; u, v: a két szár iránya (egységvektor).
 */
export const RightMark: React.FC<{ x: number; y: number; u: [number, number]; v: [number, number]; r?: number; color?: string }> = ({
  x,
  y,
  u,
  v,
  r = 12,
  color = '#334155'
}) => {
  const cross = u[0] * v[1] - u[1] * v[0];
  const sweep = cross > 0 ? 1 : 0;
  const bx = u[0] + v[0];
  const by = u[1] + v[1];
  const bl = Math.hypot(bx, by) || 1;
  return (
    <g>
      <path d={`M ${x + r * u[0]} ${y + r * u[1]} A ${r} ${r} 0 0 ${sweep} ${x + r * v[0]} ${y + r * v[1]}`} fill="none" stroke={color} strokeWidth="1.5" />
      <circle cx={x + (0.55 * r * bx) / bl} cy={y + (0.55 * r * by) / bl} r={Math.max(1.4, r * 0.14)} fill={color} />
    </g>
  );
};

/** A téglalap mind a négy derékszöge. */
export const RectMarks: React.FC<{ x: number; y: number; w: number; h: number; r?: number }> = ({ x, y, w, h, r = 12 }) => (
  <g>
    <RightMark x={x} y={y} u={[1, 0]} v={[0, 1]} r={r} />
    <RightMark x={x + w} y={y} u={[0, 1]} v={[-1, 0]} r={r} />
    <RightMark x={x + w} y={y + h} u={[-1, 0]} v={[0, -1]} r={r} />
    <RightMark x={x} y={y + h} u={[0, -1]} v={[1, 0]} r={r} />
  </g>
);

/**
 * Téglalap: a szemben lévő oldalak azonos színűek. labels: [felső, jobb, alsó, bal] (null = nincs felirat).
 */
export const RectShape: React.FC<{
  x: number;
  y: number;
  w: number;
  h: number;
  labels?: (string | null)[];
  fill?: string;
  fontSize?: number;
  marks?: boolean;
  markR?: number;
  sw?: number;
  same?: boolean; // négyzetnél minden oldal egyforma színű
}> = ({ x, y, w, h, labels = [], fill = '#fef9c3', fontSize = 13, marks = true, markR = 12, sw = 4, same = false }) => {
  const cH = same ? '#16a34a' : LONG;
  const cV = same ? '#16a34a' : SHORT;
  const lab = (i: number) => labels[i];
  const col = (t: string | null | undefined) => (t && t.includes('?') ? '#dc2626' : '#0f172a');
  const gap = 7;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill={fill} />
      {marks && <RectMarks x={x} y={y} w={w} h={h} r={markR} />}
      <line x1={x} y1={y} x2={x + w} y2={y} stroke={cH} strokeWidth={sw} strokeLinecap="round" />
      <line x1={x} y1={y + h} x2={x + w} y2={y + h} stroke={cH} strokeWidth={sw} strokeLinecap="round" />
      <line x1={x} y1={y} x2={x} y2={y + h} stroke={cV} strokeWidth={sw} strokeLinecap="round" />
      <line x1={x + w} y1={y} x2={x + w} y2={y + h} stroke={cV} strokeWidth={sw} strokeLinecap="round" />
      {lab(0) && <text x={x + w / 2} y={y - gap} textAnchor="middle" fontSize={fontSize} fontWeight="bold" fill={col(lab(0))}>{lab(0)}</text>}
      {lab(2) && <text x={x + w / 2} y={y + h + gap + fontSize * 0.8} textAnchor="middle" fontSize={fontSize} fontWeight="bold" fill={col(lab(2))}>{lab(2)}</text>}
      {lab(1) && <text x={x + w + gap} y={y + h / 2 + fontSize * 0.35} textAnchor="start" fontSize={fontSize} fontWeight="bold" fill={col(lab(1))}>{lab(1)}</text>}
      {lab(3) && <text x={x - gap} y={y + h / 2 + fontSize * 0.35} textAnchor="end" fontSize={fontSize} fontWeight="bold" fill={col(lab(3))}>{lab(3)}</text>}
    </g>
  );
};

/** Négyzetrács és rajta egy w × h-s téglalap. */
export const GridRect: React.FC<{ x: number; y: number; s: number; cols: number; rows: number; c0: number; r0: number; w: number; h: number; fill?: string; stroke?: string; sw?: number }> = ({
  x,
  y,
  s,
  cols,
  rows,
  c0,
  r0,
  w,
  h,
  fill = '#bfdbfe',
  stroke = '#1d4ed8',
  sw = 3.5
}) => (
  <g>
    <rect x={x + c0 * s} y={y + r0 * s} width={w * s} height={h * s} fill={fill} />
    {Array.from({ length: cols + 1 }, (_, i) => (
      <line key={`v${i}`} x1={x + i * s} y1={y} x2={x + i * s} y2={y + rows * s} stroke="#94a3b8" strokeWidth="0.8" />
    ))}
    {Array.from({ length: rows + 1 }, (_, i) => (
      <line key={`h${i}`} x1={x} y1={y + i * s} x2={x + cols * s} y2={y + i * s} stroke="#94a3b8" strokeWidth="0.8" />
    ))}
    <rect x={x + c0 * s} y={y + r0 * s} width={w * s} height={h * s} fill="none" stroke={stroke} strokeWidth={sw} />
  </g>
);
