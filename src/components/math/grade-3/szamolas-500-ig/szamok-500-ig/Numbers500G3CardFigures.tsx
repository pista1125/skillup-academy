import React from 'react';
import { FONT } from './Numbers500G3Parts';

// Kis, vastag vonalas kártyaábrák a Párosító (150 × 80) és a Csoportosító (80 × 80) játékhoz.

/** Csoportosító (80 × 80): fent a lapok, lent a rudak és a kockák. Legfeljebb 4 lap, 6 rúd, 9 kocka. */
const BlocksSmall: React.FC<{ h: number; t: number; e: number }> = ({ h, t, e }) => {
  const f = h ? Math.min(26, (72 - 3 * (h - 1)) / h) : 0;
  const rodH = h ? Math.max(f, 22) : 34;
  const row1W = h * f + Math.max(0, h - 1) * 3;
  const cubeCols = Math.ceil(e / 3);
  const row2W = t * 7 + (t && e ? 4 : 0) + cubeCols * 7.5;
  const y2 = h ? 8 + f + 6 : 22;
  const x2 = (80 - row2W) / 2;
  const parts: React.ReactNode[] = [];
  for (let i = 0; i < h; i++) {
    const x0 = (80 - row1W) / 2 + i * (f + 3);
    parts.push(
      <g key={`h${i}`}>
        <rect x={x0} y={8} width={f} height={f} fill="#ef4444" stroke="#7f1d1d" strokeWidth="2" />
        {[1, 2, 3, 4].map((k) => (
          <g key={k}>
            <line x1={x0 + (k * f) / 5} y1={8} x2={x0 + (k * f) / 5} y2={8 + f} stroke="#7f1d1d" strokeWidth="0.7" />
            <line x1={x0} y1={8 + (k * f) / 5} x2={x0 + f} y2={8 + (k * f) / 5} stroke="#7f1d1d" strokeWidth="0.7" />
          </g>
        ))}
      </g>
    );
  }
  for (let i = 0; i < t; i++) {
    parts.push(<rect key={`t${i}`} x={x2 + i * 7} y={y2} width="5" height={rodH} fill="#3b82f6" stroke="#1e3a8a" strokeWidth="1.4" />);
  }
  const cx = x2 + t * 7 + (t && e ? 4 : 0);
  for (let i = 0; i < e; i++) {
    const col = Math.floor(i / 3);
    const row = i % 3;
    parts.push(<rect key={`e${i}`} x={cx + col * 7.5} y={y2 + rodH - 6 - row * 7.5} width="6" height="6" fill="#facc15" stroke="#854d0e" strokeWidth="1.2" />);
  }
  return (
    <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      {parts}
    </svg>
  );
};

/** Kupac számokkal (80 × 80): lap × a, rúd × b, kocka × c. Sok rúdnál, beváltáshoz. */
export const PileCard: React.FC<{ h?: number; t?: number; e?: number }> = ({ h = 2, t = 13, e = 5 }) => {
  const rows: { n: number; icon: React.ReactNode }[] = [];
  if (h) rows.push({ n: h, icon: <rect x="6" y="-9" width="18" height="18" fill="#ef4444" stroke="#7f1d1d" strokeWidth="2" /> });
  if (t) rows.push({ n: t, icon: <rect x="12" y="-10" width="6" height="20" fill="#3b82f6" stroke="#1e3a8a" strokeWidth="2" /> });
  if (e) rows.push({ n: e, icon: <rect x="10" y="-5" width="10" height="10" fill="#facc15" stroke="#854d0e" strokeWidth="2" /> });
  const step = 25;
  const y0 = 40 - ((rows.length - 1) * step) / 2;
  return (
    <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      {rows.map((r, i) => (
        <g key={i} transform={`translate(0 ${y0 + i * step})`}>
          {r.icon}
          <text x="31" y="7" fontSize="20" fontWeight="bold" fill="#0f172a">× {r.n}</text>
        </g>
      ))}
    </svg>
  );
};

/** Százas lapok, tízesrudak, egyeskockák – a méret a darabszámhoz igazodik. */
export const BlocksCard: React.FC<{ h?: number; t?: number; e?: number; small?: boolean }> = ({ h = 2, t = 3, e = 4, small = false }) => {
  if (small) return <BlocksSmall h={h} t={t} e={e} />;
  const W = small ? 80 : 150;
  const H = 80;
  const cubeCols = Math.ceil(e / 4);
  const free = W - 8 - (3 * h + 2 * t + 2 * cubeCols);
  const f = Math.min(small ? 34 : 46, free / (h + 0.2 * t + 0.24 * cubeCols));
  const rodW = f * 0.2;
  const cube = f * 0.22;
  const total = h * (f + 3) + t * (rodW + 2) + cubeCols * (cube + 2);
  let x = (W - total) / 2;
  const top = (H - f) / 2;
  const parts: React.ReactNode[] = [];
  for (let i = 0; i < h; i++) {
    const x0 = x;
    parts.push(
      <g key={`h${i}`}>
        <rect x={x0} y={top} width={f} height={f} fill="#ef4444" stroke="#7f1d1d" strokeWidth="2.2" />
        {f > 18 &&
          [1, 2, 3, 4].map((k) => (
            <g key={k}>
              <line x1={x0 + (k * f) / 5} y1={top} x2={x0 + (k * f) / 5} y2={top + f} stroke="#7f1d1d" strokeWidth="0.9" />
              <line x1={x0} y1={top + (k * f) / 5} x2={x0 + f} y2={top + (k * f) / 5} stroke="#7f1d1d" strokeWidth="0.9" />
            </g>
          ))}
      </g>
    );
    x += f + 3;
  }
  for (let i = 0; i < t; i++) {
    parts.push(<rect key={`t${i}`} x={x} y={top} width={rodW} height={f} fill="#3b82f6" stroke="#1e3a8a" strokeWidth="1.6" />);
    x += rodW + 2;
  }
  for (let i = 0; i < e; i++) {
    const col = Math.floor(i / 4);
    const row = i % 4;
    parts.push(
      <rect key={`e${i}`} x={x + col * (cube + 2)} y={top + f - cube - row * (cube + 2)} width={cube} height={cube} fill="#facc15" stroke="#854d0e" strokeWidth="1.4" />
    );
  }
  return (
    <svg viewBox={`0 0 ${W} ${H}`} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      {parts}
    </svg>
  );
};

/** Golyós számoló 3 rúddal (piros 100, kék 10, sárga 1). */
export const AbacusCard: React.FC<{ sz?: number; t?: number; e?: number; small?: boolean }> = ({ sz = 2, t = 4, e = 5, small = false }) => {
  const W = small ? 80 : 150;
  const gap = small ? 23 : 34;
  const r = Math.min(5.8, 33 / Math.max(sz, t, e, 1));
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
export const DigitCard: React.FC<{ num?: string; idx?: number }> = ({ num = '374', idx = 1 }) => {
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
