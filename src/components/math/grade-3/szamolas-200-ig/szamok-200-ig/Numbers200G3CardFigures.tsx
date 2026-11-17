import React from 'react';
import { FONT } from './Numbers200G3Parts';

// Kis, vastag vonalas kártyaábrák a Párosító (150 × 80) és a Csoportosító (80 × 80) játékhoz.

/** Százas lap, tízesrudak, egyeskockák. Párosító: 150 × 80, csoportosító: 80 × 80. */
export const BlocksCard: React.FC<{ h?: number; t?: number; e?: number; small?: boolean }> = ({ h = 1, t = 2, e = 4, small = false }) => {
  const W = small ? 80 : 150;
  const H = 80;
  const flat = small ? 30 : 46;
  const rodW = small ? 5 : 8;
  const rodGap = small ? 7 : 11;
  const cube = small ? 7 : 10;
  const total = h * (flat + 6) + t * rodGap + (e ? Math.ceil(e / 3) * (cube + 2) + 2 : 0);
  let x = (W - total) / 2;
  const top = small ? 25 : 17;
  const parts: React.ReactNode[] = [];
  for (let i = 0; i < h; i++) {
    const x0 = x;
    parts.push(
      <g key={`h${i}`}>
        <rect x={x0} y={top} width={flat} height={flat} fill="#ef4444" stroke="#7f1d1d" strokeWidth="2.5" />
        {[1, 2, 3, 4].map((k) => (
          <g key={k}>
            <line x1={x0 + (k * flat) / 5} y1={top} x2={x0 + (k * flat) / 5} y2={top + flat} stroke="#7f1d1d" strokeWidth="1" />
            <line x1={x0} y1={top + (k * flat) / 5} x2={x0 + flat} y2={top + (k * flat) / 5} stroke="#7f1d1d" strokeWidth="1" />
          </g>
        ))}
      </g>
    );
    x += flat + 6;
  }
  for (let i = 0; i < t; i++) {
    parts.push(<rect key={`t${i}`} x={x} y={top} width={rodW} height={flat} fill="#3b82f6" stroke="#1e3a8a" strokeWidth="2" />);
    x += rodGap;
  }
  for (let i = 0; i < e; i++) {
    const col = Math.floor(i / 3);
    const row = i % 3;
    parts.push(
      <rect key={`e${i}`} x={x + 2 + col * (cube + 2)} y={top + flat - cube - row * (cube + 2)} width={cube} height={cube} fill="#facc15" stroke="#854d0e" strokeWidth="1.8" />
    );
  }
  return (
    <svg viewBox={`0 0 ${W} ${H}`} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      {parts}
    </svg>
  );
};

/** Golyós számoló 3 rúddal (piros 100, kék 10, sárga 1). */
export const AbacusCard: React.FC<{ sz?: number; t?: number; e?: number; small?: boolean }> = ({ sz = 1, t = 4, e = 5, small = false }) => {
  const W = small ? 80 : 150;
  const gap = small ? 22 : 34;
  const r = Math.min(5.5, 34.5 / Math.max(sz, t, e, 1));
  const base = 72;
  const cx0 = W / 2 - gap;
  const cols: [number, string, string][] = [
    [sz, '#ef4444', '#991b1b'],
    [t, '#38bdf8', '#0369a1'],
    [e, '#facc15', '#a16207']
  ];
  return (
    <svg viewBox={`0 0 ${W} 80`} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x={cx0 - 12} y={base} width={gap * 2 + 24} height="5" rx="2" fill="#1e3a8a" />
      {cols.map(([n, fill, stroke], i) => (
        <g key={i}>
          <line x1={cx0 + i * gap} y1={4} x2={cx0 + i * gap} y2={base} stroke="#334155" strokeWidth="2.5" />
          {Array.from({ length: n }, (_, k) => (
            <circle key={k} cx={cx0 + i * gap} cy={base - r - 0.5 - k * (2 * r + 0.4)} r={r} fill={fill} stroke={stroke} strokeWidth="1.5" />
          ))}
        </g>
      ))}
    </svg>
  );
};

/** Háromjegyű szám, egy jegye bekeretezve. */
export const DigitCard: React.FC<{ num?: string; idx?: number }> = ({ num = '175', idx = 1 }) => {
  const W = 34;
  const x0 = 75 - (num.length * W) / 2;
  return (
    <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      {num.split('').map((d, i) => (
        <g key={i}>
          {i === idx && <rect x={x0 + i * W + 2} y="10" width={W - 4} height="60" rx="6" fill="#fef3c7" stroke="#d97706" strokeWidth="3.5" />}
          <text x={x0 + i * W + W / 2} y="58" textAnchor="middle" fontSize="40" fontWeight="bold" fill="#1e293b">{d}</text>
        </g>
      ))}
    </svg>
  );
};
