import React from 'react';

// Kis rajzelemek az 500-as számkörhöz (százas lap, tízesrúd, egyeskocka, érme, golyós számoló, számegyenes).
// A Figures, Theory és Quiz fájlok közösen használják.
export const FONT = 'system-ui, Segoe UI, sans-serif';
export const UNK = '#dc2626';

/** Százas lap: 10 × 10 kis négyzet. */
export const HundredFlat: React.FC<{ x: number; y: number; s?: number; color?: string }> = ({ x, y, s = 8, color = '#ef4444' }) => (
  <g>
    <rect x={x} y={y} width={s * 10} height={s * 10} fill={color} stroke="#7f1d1d" strokeWidth="1.2" />
    {Array.from({ length: 9 }, (_, i) => (
      <g key={i}>
        <line x1={x + (i + 1) * s} y1={y} x2={x + (i + 1) * s} y2={y + s * 10} stroke="#7f1d1d" strokeWidth="0.45" />
        <line x1={x} y1={y + (i + 1) * s} x2={x + s * 10} y2={y + (i + 1) * s} stroke="#7f1d1d" strokeWidth="0.45" />
      </g>
    ))}
  </g>
);

/** Tízesrúd: 10 kis kocka egymás fölött. */
export const TenRod: React.FC<{ x: number; y: number; s?: number; color?: string }> = ({ x, y, s = 8, color = '#3b82f6' }) => (
  <g>
    {Array.from({ length: 10 }, (_, i) => (
      <rect key={i} x={x} y={y + i * s} width={s} height={s} fill={color} stroke="#1e3a8a" strokeWidth="0.7" />
    ))}
  </g>
);

/** Egyeskocka. */
export const OneCube: React.FC<{ x: number; y: number; s?: number; color?: string }> = ({ x, y, s = 8, color = '#facc15' }) => (
  <rect x={x} y={y} width={s} height={s} fill={color} stroke="#854d0e" strokeWidth="0.7" />
);

/** Kirakás: sz százas lap, t tízesrúd, e egyeskocka egy sorban, (x, y)-tól. Visszaadja a szélességet is. */
export const BlockRow: React.FC<{ x: number; y: number; sz: number; t: number; e: number; s?: number }> = ({ x, y, sz, t, e, s = 6 }) => {
  const flatW = s * 10;
  const parts: React.ReactNode[] = [];
  let cx = x;
  for (let i = 0; i < sz; i++) {
    parts.push(<HundredFlat key={`h${i}`} x={cx} y={y} s={s} />);
    cx += flatW + 5;
  }
  for (let i = 0; i < t; i++) {
    parts.push(<TenRod key={`t${i}`} x={cx} y={y} s={s} />);
    cx += s + 3;
  }
  cx += 3;
  for (let i = 0; i < e; i++) {
    const col = Math.floor(i / 5);
    const row = i % 5;
    parts.push(<OneCube key={`e${i}`} x={cx + col * (s + 3)} y={y + flatW - s - row * (s + 3)} s={s} />);
  }
  return <g>{parts}</g>;
};

export const blockRowWidth = (sz: number, t: number, e: number, s = 6) =>
  sz * (s * 10 + 5) + t * (s + 3) + (e ? 3 + Math.ceil(e / 5) * (s + 3) : 0);

/** Forint érme (5, 10, 20, 50, 100, 200). A 100 és a 200 Ft-os kétszínű. */
export const Coin: React.FC<{ cx: number; cy: number; v: number; r?: number }> = ({ cx, cy, v, r }) => {
  const R = r ?? (v === 200 ? 21 : v === 100 ? 20 : v === 50 ? 19 : v === 20 ? 17 : v === 10 ? 16 : 14);
  const gold = '#facc15';
  const silver = '#cbd5e1';
  const ring = v === 200 ? gold : v === 100 ? silver : v === 5 || v === 20 ? gold : silver;
  const core = v === 200 ? silver : v === 100 ? gold : ring;
  const edge = ring === gold ? '#a16207' : '#475569';
  return (
    <g>
      <circle cx={cx} cy={cy} r={R} fill={ring} stroke={edge} strokeWidth="1.4" />
      <circle cx={cx} cy={cy} r={R * 0.7} fill={core} stroke={core === gold ? '#ca8a04' : '#64748b'} strokeWidth="0.8" />
      <text x={cx} y={cy + R * 0.28} textAnchor="middle" fontSize={v >= 100 ? R * 0.68 : R * 0.8} fontWeight="bold" fill="#1e293b" fontFamily={FONT}>{v}</text>
    </g>
  );
};

/** Golyós számoló 3 rúddal: piros = 100, kék = 10, sárga = 1. */
export const Abacus: React.FC<{ x: number; y: number; h: number; sz: number; t: number; e: number; gap?: number; r?: number }> = ({
  x,
  y,
  h,
  sz,
  t,
  e,
  gap = 40,
  r = 4.6
}) => {
  const base = y + h;
  const cols: [number, string, string][] = [
    [sz, '#ef4444', '#991b1b'],
    [t, '#38bdf8', '#0369a1'],
    [e, '#facc15', '#a16207']
  ];
  return (
    <g>
      <rect x={x - 16} y={base} width={gap * 2 + 32} height="6" rx="2" fill="#1e3a8a" />
      {cols.map(([n, fill, stroke], i) => (
        <g key={i}>
          <line x1={x + i * gap} y1={y} x2={x + i * gap} y2={base} stroke="#334155" strokeWidth="2" />
          {Array.from({ length: n }, (_, k) => (
            <circle key={k} cx={x + i * gap} cy={base - r - 0.5 - k * (2 * r + 0.6)} r={r} fill={fill} stroke={stroke} />
          ))}
        </g>
      ))}
    </g>
  );
};

export interface Mark {
  v: number;
  label?: string;
  color?: string;
}

/**
 * Számegyenes lo-tól hi-ig. Kis osztás: tickEvery; nagy osztás: bigEvery; felirat: labels.
 * marks: pontok (felirat a vonal fölött), '?' = keresett szám.
 */
export const NumLine500: React.FC<{
  lo: number;
  hi: number;
  tickEvery: number;
  bigEvery: number;
  labels: number[];
  marks?: Mark[];
  W?: number;
  H?: number;
  bg?: boolean;
  className?: string;
}> = ({ lo, hi, tickEvery, bigEvery, labels, marks = [], W = 320, H = 96, bg = true, className = 'w-full h-auto' }) => {
  const x0 = 22;
  const x1 = W - 26;
  const y = H - 38;
  const X = (v: number) => x0 + ((x1 - x0) * (v - lo)) / (hi - lo);
  const ticks: number[] = [];
  for (let v = lo; v <= hi; v += tickEvery) ticks.push(v);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      {bg && <rect x="1" y="1" width={W - 2} height={H - 2} rx="12" fill="#f8fafc" stroke="#cbd5e1" />}
      <line x1={x0 - 10} y1={y} x2={x1 + 10} y2={y} stroke="#334155" strokeWidth="1.8" />
      <path d={`M ${x1 + 10} ${y - 4} L ${x1 + 17} ${y} L ${x1 + 10} ${y + 4} Z`} fill="#334155" />
      {ticks.map((v) => {
        const big = (v - lo) % bigEvery === 0;
        const h = big ? 8 : 4.5;
        return <line key={v} x1={X(v)} y1={y - h} x2={X(v)} y2={y + h} stroke="#334155" strokeWidth={big ? 1.6 : 0.9} />;
      })}
      {labels.map((v) => (
        <text key={`l${v}`} x={X(v)} y={y + 22} textAnchor="middle" fontSize="11.5" fill="#475569">{v}</text>
      ))}
      {marks.map((m, i) => {
        const c = m.label === '?' ? UNK : m.color ?? '#2563eb';
        return (
          <g key={`m${i}`}>
            <circle cx={X(m.v)} cy={y} r="4.8" fill={c} stroke="#fff" strokeWidth="1" />
            <line x1={X(m.v)} y1={y - 8} x2={X(m.v)} y2={y - 16} stroke={c} strokeWidth="1.6" />
            <text x={X(m.v)} y={y - 21} textAnchor="middle" fontSize={m.label === '?' ? 16 : 12.5} fontWeight="bold" fill={c}>{m.label ?? m.v}</text>
          </g>
        );
      })}
    </svg>
  );
};

/** Számkártya-sor (pl. 3, 0, 4). */
export const DigitCardRow: React.FC<{ x: number; y: number; digits: string[]; s?: number; colors?: string[] }> = ({ x, y, digits, s = 30, colors }) => (
  <g>
    {digits.map((d, i) => {
      const q = d === '?';
      return (
        <g key={i}>
          <rect x={x + i * (s + 6)} y={y} width={s} height={s * 1.25} rx="6" fill={q ? '#fee2e2' : colors?.[i] ?? '#fff'} stroke={q ? UNK : '#334155'} strokeWidth="1.6" />
          <text x={x + i * (s + 6) + s / 2} y={y + s * 0.9} textAnchor="middle" fontSize={s * 0.72} fontWeight="bold" fill={q ? UNK : '#0f172a'} fontFamily={FONT}>{d}</text>
        </g>
      );
    })}
  </g>
);
