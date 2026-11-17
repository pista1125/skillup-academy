import React from 'react';
import { FONT, INK, UNK } from '../az-ido-merese/TimeG3Parts';

export { FONT, INK, UNK };
export { ClockFace, StopwatchFace, DigitalFace, SunIcon, MoonIcon, MonthGrid, hm, durWords } from '../az-ido-merese/TimeG3Parts';

// ---------------------------------------------------------------------------
// Közös rajzelemek a IV. Mérések tudáspróbájához (Figures, CardFigures, Theory, Quiz).
// ---------------------------------------------------------------------------

/** Kérdésábra-keret: 240 széles, h magas. */
export const QFig: React.FC<{ h?: number; children?: React.ReactNode }> = ({ h = 130, children }) => (
  <svg viewBox={`0 0 240 ${h}`} className="w-full max-w-[280px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="238" height={h - 2} rx="10" fill="#f8fafc" stroke="#cbd5e1" />
    {children}
  </svg>
);

/**
 * Derékszög jele (magyar szokás): negyedkörív és pont.
 * (x, y) a csúcs, (ux, uy) és (vx, vy) a két szár irányának egységvektora.
 */
export const RightMark: React.FC<{ x: number; y: number; ux: number; uy: number; vx: number; vy: number; r?: number; color?: string }> = ({
  x,
  y,
  ux,
  uy,
  vx,
  vy,
  r = 11,
  color = INK
}) => {
  const ax = x + r * ux;
  const ay = y + r * uy;
  const bx = x + r * vx;
  const by = y + r * vy;
  const cross = ux * vy - uy * vx;
  const sweep = cross > 0 ? 1 : 0;
  const mx = ux + vx;
  const my = uy + vy;
  const ml = Math.hypot(mx, my) || 1;
  return (
    <g>
      <path d={`M ${ax} ${ay} A ${r} ${r} 0 0 ${sweep} ${bx} ${by}`} fill="none" stroke={color} strokeWidth="1.4" />
      <circle cx={x + (0.55 * r * mx) / ml} cy={y + (0.55 * r * my) / ml} r="1.8" fill={color} />
    </g>
  );
};

/** Téglalap (x, y, w, h képpontban) mind a négy derékszögével. */
export const RectRight: React.FC<{ x: number; y: number; w: number; h: number; r?: number }> = ({ x, y, w, h, r = 10 }) => (
  <g>
    <RightMark x={x} y={y} ux={1} uy={0} vx={0} vy={1} r={r} />
    <RightMark x={x + w} y={y} ux={-1} uy={0} vx={0} vy={1} r={r} />
    <RightMark x={x + w} y={y + h} ux={-1} uy={0} vx={0} vy={-1} r={r} />
    <RightMark x={x} y={y + h} ux={1} uy={0} vx={0} vy={-1} r={r} />
  </g>
);

/** Kétkarú mérleg serpenyőkkel. tilt: -1 = bal lent, 0 = egyensúly, 1 = jobb lent. */
export type PanItem = { t: string; kind?: 'weight' | 'box' | 'apple' | 'q' };
const PanThing: React.FC<{ x: number; y: number; it: PanItem; s?: number }> = ({ x, y, it, s = 1 }) => {
  const k = it.kind ?? 'weight';
  if (k === 'apple')
    return (
      <g>
        <circle cx={x} cy={y - 10 * s} r={10 * s} fill="#ef4444" stroke="#7f1d1d" strokeWidth="1.5" />
        <path d={`M ${x} ${y - 20 * s} q 2 -5 6 -6`} stroke="#166534" strokeWidth="2" fill="none" />
      </g>
    );
  const q = k === 'q';
  if (k === 'weight') {
    const [num, unit] = it.t.split(' ');
    const ww = Math.max(30, num.length * 9 + 12) * s;
    const hh = 32 * s;
    return (
      <g>
        <path d={`M ${x - ww / 2} ${y} L ${x - ww / 2 + 4} ${y - hh} L ${x + ww / 2 - 4} ${y - hh} L ${x + ww / 2} ${y} Z`} fill="#475569" stroke="#1e293b" strokeWidth="1.5" />
        <text x={x} y={y - hh + 14 * s} textAnchor="middle" fontSize={13 * s} fontWeight="bold" fill="#ffffff" fontFamily={FONT}>{num}</text>
        {unit && <text x={x} y={y - 4 * s} textAnchor="middle" fontSize={10 * s} fontWeight="bold" fill="#e2e8f0" fontFamily={FONT}>{unit}</text>}
      </g>
    );
  }
  const w = Math.max(30, it.t.length * 7.5 + 10) * s;
  const h = 24 * s;
  return (
    <g>
      <rect x={x - w / 2} y={y - h} width={w} height={h} rx="4" fill={q ? '#fee2e2' : '#fde68a'} stroke={q ? UNK : '#a16207'} strokeWidth="1.5" />
      <text x={x} y={y - h / 2 + 4.5 * s} textAnchor="middle" fontSize={12 * s} fontWeight="bold" fill={q ? UNK : '#713f12'} fontFamily={FONT}>{it.t}</text>
    </g>
  );
};
export const Balance: React.FC<{ cx: number; y: number; left: PanItem[]; right: PanItem[]; tilt?: -1 | 0 | 1; span?: number }> = ({ cx, y, left, right, tilt = 0, span = 70 }) => {
  // y: a forgáspont magassága. A serpenyők 44 képponttal lejjebb lógnak; az ábra kb. y − 12 … y + 100.
  const yL = y + (tilt === -1 ? 10 : tilt === 1 ? -10 : 0);
  const yR = y + (tilt === 1 ? 10 : tilt === -1 ? -10 : 0);
  const place = (items: PanItem[], px: number, py: number) => {
    const widths = items.map((it) => (it.kind === 'apple' ? 22 : (it.kind ?? 'weight') === 'weight' ? Math.max(30, it.t.split(' ')[0].length * 9 + 12) : Math.max(30, it.t.length * 7.5 + 10)) + 3);
    const total = widths.reduce((a, b) => a + b, 0);
    let x = px - total / 2;
    return items.map((it, i) => {
      const c = x + widths[i] / 2;
      x += widths[i];
      return <PanThing key={i} x={c} y={py} it={it} />;
    });
  };
  const pan = (px: number, py: number) => (
    <g>
      <line x1={px} y1={py - 44} x2={px - 36} y2={py} stroke="#64748b" strokeWidth="1.3" />
      <line x1={px} y1={py - 44} x2={px + 36} y2={py} stroke="#64748b" strokeWidth="1.3" />
      <path d={`M ${px - 42} ${py} Q ${px} ${py + 14} ${px + 42} ${py} Z`} fill="#cbd5e1" stroke="#334155" strokeWidth="1.5" />
    </g>
  );
  return (
    <g>
      <path d={`M ${cx - 30} ${y + 100} L ${cx + 30} ${y + 100} L ${cx + 8} ${y + 88} L ${cx + 4} ${y} L ${cx - 4} ${y} L ${cx - 8} ${y + 88} Z`} fill="#94a3b8" stroke="#334155" strokeWidth="1.5" />
      {pan(cx - span, yL + 44)}
      {pan(cx + span, yR + 44)}
      <line x1={cx - span} y1={yL} x2={cx + span} y2={yR} stroke="#334155" strokeWidth="4" strokeLinecap="round" />
      <circle cx={cx} cy={y} r="5" fill="#334155" />
      {place(left, cx - span, yL + 43)}
      {place(right, cx + span, yR + 43)}
    </g>
  );
};

/** Konyhai mérleg kerek számlapja (dkg), 300°-os íven 0-tól max-ig. */
export const Dial: React.FC<{ cx: number; cy: number; r: number; value: number; max?: number; step?: number; labelEvery?: number; fs?: number; sweep?: number; unit?: boolean }> = ({
  cx,
  cy,
  r,
  value,
  max = 100,
  step = 5,
  labelEvery = 10,
  fs,
  sweep = 300,
  unit = true
}) => {
  const f = fs ?? r * 0.2;
  const ang = (v: number) => ((-sweep / 2 + (v / max) * sweep) * Math.PI) / 180;
  const P = (v: number, rr: number): [number, number] => [cx + rr * Math.sin(ang(v)), cy - rr * Math.cos(ang(v))];
  const out: React.ReactNode[] = [];
  for (let v = 0; v <= max; v += step) {
    const major = v % labelEvery === 0;
    const [x1, y1] = P(v, r * 0.9);
    const [x2, y2] = P(v, major ? r * 0.74 : r * 0.82);
    out.push(<line key={`t${v}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke={INK} strokeWidth={major ? 1.8 : 1} />);
    if (major) {
      const [tx, ty] = P(v, r * 0.56);
      out.push(<text key={`l${v}`} x={tx} y={ty + f * 0.36} textAnchor="middle" fontSize={f} fontWeight="bold" fill={INK} fontFamily={FONT}>{v}</text>);
    }
  }
  const [px, py] = P(value, r * 0.84);
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill="#ffffff" stroke="#7f1d1d" strokeWidth={r * 0.06} />
      {out}
      <line x1={cx} y1={cy} x2={px} y2={py} stroke="#dc2626" strokeWidth={r * 0.045} strokeLinecap="round" />
      <circle cx={cx} cy={cy} r={r * 0.06} fill="#dc2626" />
      {unit && <text x={cx} y={cy + r * 0.45} textAnchor="middle" fontSize={f} fontWeight="bold" fill="#7f1d1d" fontFamily={FONT}>dkg</text>}
    </g>
  );
};

/**
 * Mérőkancsó dl-es beosztással. level, max: dl-ben.
 * Feliratok: 5 dl-enként ("5 dl", "1 l", "15 dl"); qLevel: a víz szintjénél '?'.
 */
export const Jug: React.FC<{ x: number; y: number; h: number; w?: number; level: number; max?: number; labelAll?: boolean; q?: boolean; labels?: number[] }> = ({
  x,
  y,
  h,
  w = 60,
  level,
  max = 10,
  labelAll = false,
  q = false,
  labels
}) => {
  const bottom = y + h;
  const Y = (dl: number) => bottom - 6 - ((h - 16) * dl) / max;
  const lab = (dl: number) => (dl === 10 ? '1 l' : `${dl} dl`);
  return (
    <g fontFamily={FONT}>
      <path d={`M ${x + w} ${y + 12} q 22 4 18 28 q -3 18 -18 22`} fill="none" stroke="#64748b" strokeWidth="5" />
      <rect x={x} y={Y(level)} width={w} height={bottom - Y(level)} fill="#7dd3fc" opacity="0.85" />
      <path d={`M ${x - 4} ${y} L ${x} ${y + 6} L ${x} ${bottom} L ${x + w} ${bottom} L ${x + w} ${y}`} fill="none" stroke="#334155" strokeWidth="2.5" />
      {Array.from({ length: max + 1 }, (_, dl) => dl).filter((dl) => dl > 0).map((dl) => {
        const big = labels ? labels.includes(dl) : dl % 5 === 0 || labelAll;
        return (
          <g key={dl}>
            <line x1={x} y1={Y(dl)} x2={x + (big ? 16 : 9)} y2={Y(dl)} stroke="#1e3a8a" strokeWidth={big ? 1.8 : 1.1} />
            {big && (
              <text x={x - 6} y={Y(dl) + 4} textAnchor="end" fontSize="11" fontWeight="bold" fill="#1e3a8a">{lab(dl)}</text>
            )}
          </g>
        );
      })}
      {q && <text x={x + w / 2 + 6} y={Y(level) + 16} textAnchor="middle" fontSize="16" fontWeight="bold" fill={UNK}>?</text>}
    </g>
  );
};

/** Vonalzó cm- és mm-beosztással; a szakasz fromMm-től toMm-ig. */
export const Ruler: React.FC<{ x: number; y: number; cm?: number; pxPerCm?: number; fromMm: number; toMm: number; segColor?: string }> = ({
  x,
  y,
  cm = 10,
  pxPerCm = 20,
  fromMm,
  toMm,
  segColor = '#2563eb'
}) => {
  const X = (mm: number) => x + 6 + (mm * pxPerCm) / 10;
  return (
    <g fontFamily={FONT}>
      <line x1={X(fromMm)} y1={y - 12} x2={X(toMm)} y2={y - 12} stroke={segColor} strokeWidth="4" strokeLinecap="round" />
      <circle cx={X(fromMm)} cy={y - 12} r="3" fill={segColor} />
      <circle cx={X(toMm)} cy={y - 12} r="3" fill={segColor} />
      <rect x={x} y={y} width={cm * pxPerCm + 12} height="34" rx="3" fill="#fef9c3" stroke="#a16207" strokeWidth="1.5" />
      {Array.from({ length: cm * 10 + 1 }, (_, mm) => {
        const big = mm % 10 === 0;
        const mid = mm % 5 === 0;
        return <line key={mm} x1={X(mm)} y1={y} x2={X(mm)} y2={y + (big ? 13 : mid ? 9 : 5)} stroke={INK} strokeWidth={big ? 1.4 : 0.8} />;
      })}
      {Array.from({ length: cm + 1 }, (_, c) => (
        <text key={c} x={X(c * 10)} y={y + 27} textAnchor="middle" fontSize="10.5" fontWeight="bold" fill={INK}>{c}</text>
      ))}
    </g>
  );
};

/** Négyzetrács és kitöltött kis négyzetek (cells: [oszlop, sor]). */
export type Cell = [number, number];
export const GridShape: React.FC<{ x: number; y: number; cols: number; rows: number; s: number; cells: Cell[]; fill?: string; stroke?: string; outline?: boolean; label?: string; lines?: boolean }> = ({
  x,
  y,
  cols,
  rows,
  s,
  cells,
  fill = '#86efac',
  stroke = '#166534',
  outline = true,
  label,
  lines = true
}) => {
  const set = new Set(cells.map(([c, r]) => `${c},${r}`));
  const has = (c: number, r: number) => set.has(`${c},${r}`);
  const edges: React.ReactNode[] = [];
  if (outline) {
    cells.forEach(([c, r]) => {
      const X0 = x + c * s;
      const Y0 = y + r * s;
      if (!has(c, r - 1)) edges.push(<line key={`t${c}-${r}`} x1={X0} y1={Y0} x2={X0 + s} y2={Y0} stroke={stroke} strokeWidth="3" strokeLinecap="round" />);
      if (!has(c, r + 1)) edges.push(<line key={`b${c}-${r}`} x1={X0} y1={Y0 + s} x2={X0 + s} y2={Y0 + s} stroke={stroke} strokeWidth="3" strokeLinecap="round" />);
      if (!has(c - 1, r)) edges.push(<line key={`l${c}-${r}`} x1={X0} y1={Y0} x2={X0} y2={Y0 + s} stroke={stroke} strokeWidth="3" strokeLinecap="round" />);
      if (!has(c + 1, r)) edges.push(<line key={`r${c}-${r}`} x1={X0 + s} y1={Y0} x2={X0 + s} y2={Y0 + s} stroke={stroke} strokeWidth="3" strokeLinecap="round" />);
    });
  }
  return (
    <g fontFamily={FONT}>
      {lines && Array.from({ length: cols + 1 }, (_, i) => (
        <line key={`v${i}`} x1={x + i * s} y1={y} x2={x + i * s} y2={y + rows * s} stroke="#cbd5e1" strokeWidth="1" />
      ))}
      {lines && Array.from({ length: rows + 1 }, (_, i) => (
        <line key={`h${i}`} x1={x} y1={y + i * s} x2={x + cols * s} y2={y + i * s} stroke="#cbd5e1" strokeWidth="1" />
      ))}
      {cells.map(([c, r]) => (
        <rect key={`c${c}-${r}`} x={x + c * s + 0.5} y={y + r * s + 0.5} width={s - 1} height={s - 1} fill={fill} opacity="0.9" />
      ))}
      {edges}
      {label && (
        <text x={x + (cols * s) / 2} y={y + rows * s + 16} textAnchor="middle" fontSize="13" fontWeight="bold" fill={INK}>{label}</text>
      )}
    </g>
  );
};

export const rectCells = (cols: number, rows: number, c0 = 0, r0 = 0): Cell[] => {
  const out: Cell[] = [];
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) out.push([c0 + c, r0 + r]);
  return out;
};

/** A határoló kis szakaszok száma (kerület egységben). */
export const cellPerimeter = (cells: Cell[]): number => {
  const set = new Set(cells.map(([c, r]) => `${c},${r}`));
  let n = 0;
  cells.forEach(([c, r]) => {
    [[0, -1], [0, 1], [-1, 0], [1, 0]].forEach(([dc, dr]) => {
      if (!set.has(`${c + dc},${r + dr}`)) n++;
    });
  });
  return n;
};

/**
 * Sokszög oldalfeliratokkal. pts képpontban, labels[i] az i. és i+1. csúcs közti oldalé (null = nincs).
 * A felirat az oldal felezőpontjától kifelé kerül. right: derékszögű csúcsok indexei.
 */
export const Poly: React.FC<{ pts: [number, number][]; labels: (string | null)[]; right?: number[]; fill?: string; stroke?: string; fs?: number; off?: number }> = ({
  pts,
  labels,
  right = [],
  fill = '#bfdbfe',
  stroke = '#1d4ed8',
  fs = 12.5,
  off = 13
}) => {
  const n = pts.length;
  const cx = pts.reduce((a, p) => a + p[0], 0) / n;
  const cy = pts.reduce((a, p) => a + p[1], 0) / n;
  // körüljárási irány (képernyő-koordinátákban)
  let area2 = 0;
  for (let i = 0; i < n; i++) {
    const [x1, y1] = pts[i];
    const [x2, y2] = pts[(i + 1) % n];
    area2 += x1 * y2 - x2 * y1;
  }
  const sign = area2 > 0 ? 1 : -1;
  return (
    <g fontFamily={FONT}>
      <polygon points={pts.map((p) => p.join(',')).join(' ')} fill={fill} stroke={stroke} strokeWidth="2.5" strokeLinejoin="round" />
      {right.map((i) => {
        const [px, py] = pts[i];
        const [ax, ay] = pts[(i + 1) % n];
        const [bx, by] = pts[(i - 1 + n) % n];
        const la = Math.hypot(ax - px, ay - py);
        const lb = Math.hypot(bx - px, by - py);
        return <RightMark key={`r${i}`} x={px} y={py} ux={(ax - px) / la} uy={(ay - py) / la} vx={(bx - px) / lb} vy={(by - py) / lb} r={10} />;
      })}
      {labels.map((t, i) => {
        if (!t) return null;
        const [x1, y1] = pts[i];
        const [x2, y2] = pts[(i + 1) % n];
        const mx = (x1 + x2) / 2;
        const my = (y1 + y2) / 2;
        const len = Math.hypot(x2 - x1, y2 - y1);
        // kifelé mutató normális
        let nx = (sign * (y2 - y1)) / len;
        let ny = (sign * -(x2 - x1)) / len;
        if ((mx + nx - cx) * nx + (my + ny - cy) * ny < 0 && n === 3) {
          nx = -nx;
          ny = -ny;
        }
        const q = t.includes('?');
        const tw = t.length * fs * 0.3;
        return (
          <text key={i} x={mx + nx * (off + Math.abs(nx) * tw)} y={my + ny * off + fs * 0.36} textAnchor="middle" fontSize={q ? fs + 2 : fs} fontWeight="bold" fill={q ? UNK : INK}>{t}</text>
        );
      })}
    </g>
  );
};

/** Kártyasor (pl. mennyiségek összehasonlításához). */
export const Cards: React.FC<{ items: string[]; y?: number; h?: number; colors?: string[] }> = ({ items, y = 20, h = 40, colors }) => {
  const pal = colors ?? ['#fde68a', '#bbf7d0', '#bfdbfe', '#fecaca', '#e9d5ff'];
  const gap = 8;
  const widths = items.map((t) => Math.max(48, t.length * 7.8 + 16));
  const total = widths.reduce((a, b) => a + b, 0) + gap * (items.length - 1);
  let x = (240 - total) / 2;
  return (
    <g fontFamily={FONT}>
      {items.map((t, i) => {
        const px = x;
        x += widths[i] + gap;
        return (
          <g key={i}>
            <rect x={px} y={y} width={widths[i]} height={h} rx="10" fill={pal[i % pal.length]} stroke="#475569" strokeWidth="1.5" />
            <text x={px + widths[i] / 2} y={y + h / 2 + 6} textAnchor="middle" fontSize="15" fontWeight="bold" fill={INK}>{t}</text>
          </g>
        );
      })}
    </g>
  );
};
