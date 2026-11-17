import React from 'react';

// Kis rajzelemek (tízesrúd, egyeskocka, pénzérme) – a Figures, Theory és Quiz fájlok használják.
const FONT = 'system-ui, Segoe UI, sans-serif';

/** Egy tízesrúd (10 kis kocka egymás fölött). */
export const TenRod: React.FC<{ x: number; y: number; s?: number; color?: string }> = ({ x, y, s = 11, color = '#3b82f6' }) => (
  <g>
    {Array.from({ length: 10 }, (_, i) => (
      <rect key={i} x={x} y={y + i * s} width={s} height={s} fill={color} stroke="#1e3a8a" strokeWidth="0.8" />
    ))}
  </g>
);

/** Egy egyeskocka. */
export const OneCube: React.FC<{ x: number; y: number; s?: number; color?: string }> = ({ x, y, s = 11, color = '#facc15' }) => (
  <rect x={x} y={y} width={s} height={s} fill={color} stroke="#854d0e" strokeWidth="0.8" />
);

/** Pénzérme rajza. */
export const CoinG: React.FC<{ cx?: number; cy?: number; v?: number; r?: number }> = ({ cx = 20, cy = 20, v = 10, r = 16 }) => {
  const gold = v === 5 || v === 20 || v === 200;
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={gold ? '#facc15' : '#cbd5e1'} stroke={gold ? '#a16207' : '#475569'} strokeWidth="1.5" />
      <circle cx={cx} cy={cy} r={r - 3} fill="none" stroke={gold ? '#ca8a04' : '#64748b'} strokeWidth="0.8" />
      <text x={cx} y={cy + r * 0.3} textAnchor="middle" fontSize={r * 0.85} fontWeight="bold" fill="#1e293b" fontFamily={FONT}>{v}</text>
    </g>
  );
};

