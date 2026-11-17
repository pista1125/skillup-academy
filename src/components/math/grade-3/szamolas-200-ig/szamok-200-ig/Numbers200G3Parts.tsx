import React from 'react';

// Kis rajzelemek (százas lap, tízesrúd, egyeskocka, pénzérme) – a Figures, Theory és Quiz fájlok használják.
export const FONT = 'system-ui, Segoe UI, sans-serif';

/** Százas lap: 10 × 10 kis négyzet. */
export const HundredFlat: React.FC<{ x: number; y: number; s?: number; color?: string }> = ({ x, y, s = 9, color = '#ef4444' }) => (
  <g>
    <rect x={x} y={y} width={s * 10} height={s * 10} fill={color} stroke="#7f1d1d" strokeWidth="1.2" />
    {Array.from({ length: 9 }, (_, i) => (
      <g key={i}>
        <line x1={x + (i + 1) * s} y1={y} x2={x + (i + 1) * s} y2={y + s * 10} stroke="#7f1d1d" strokeWidth="0.5" />
        <line x1={x} y1={y + (i + 1) * s} x2={x + s * 10} y2={y + (i + 1) * s} stroke="#7f1d1d" strokeWidth="0.5" />
      </g>
    ))}
  </g>
);

/** Tízesrúd: 10 kis kocka egymás fölött. */
export const TenRod: React.FC<{ x: number; y: number; s?: number; color?: string }> = ({ x, y, s = 9, color = '#3b82f6' }) => (
  <g>
    {Array.from({ length: 10 }, (_, i) => (
      <rect key={i} x={x} y={y + i * s} width={s} height={s} fill={color} stroke="#1e3a8a" strokeWidth="0.7" />
    ))}
  </g>
);

/** Egyeskocka. */
export const OneCube: React.FC<{ x: number; y: number; s?: number; color?: string }> = ({ x, y, s = 9, color = '#facc15' }) => (
  <rect x={x} y={y} width={s} height={s} fill={color} stroke="#854d0e" strokeWidth="0.7" />
);

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
