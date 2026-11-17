import React from 'react';
import { FONT, INK, ROD, ROD_DARK, HUND, ONE } from '../szorzas-es-osztas/MulDiv200G3Parts';

export { CardRods, CardCoinMul } from '../szorzas-es-osztas/MulDiv200G3CardFigures';

// ---------------------------------------------------------------------------
// Kis kártyaképek a 6. Megálló Párosítójához (≈150 × 80) és Csoportosítójához (≈80 × 80).
// Százas lap = piros négyzet, tízesrúd = kék rúd, egyeskocka = sárga kocka.
// ---------------------------------------------------------------------------

/** Csoportosító-kártyára (80 × 80): felül a százas lap és az egyeskockák, alul a tízesrudak. */
const SmallBlocks: React.FC<{ h: number; t: number; e: number }> = ({ h, t, e }) => {
  const top: React.ReactNode[] = [];
  let x = 4;
  for (let i = 0; i < h; i++) {
    top.push(
      <g key={`h${i}`}>
        <rect x={x} y={4} width={32} height={32} rx="2" fill={HUND} stroke="#7f1d1d" strokeWidth="2.5" />
        {[1, 2, 3].map((q) => (
          <g key={q}>
            <line x1={x + q * 8} y1={4} x2={x + q * 8} y2={36} stroke="#7f1d1d" strokeWidth="1" />
            <line x1={x} y1={4 + q * 8} x2={x + 32} y2={4 + q * 8} stroke="#7f1d1d" strokeWidth="1" />
          </g>
        ))}
      </g>
    );
    x += 36;
  }
  const cols = Math.ceil(e / 2);
  const cs = Math.min(9, (76 - x) / Math.max(1, cols) - 2);
  for (let i = 0; i < e; i++) {
    const c = Math.floor(i / 2);
    const r = i % 2;
    top.push(<rect key={`e${i}`} x={x + c * (cs + 2)} y={36 - (r + 1) * (cs + 2) + 2} width={cs} height={cs} rx="1.2" fill={ONE} stroke="#a16207" strokeWidth="1.8" />);
  }
  const rw = 6;
  const rs = 8;
  const rx0 = 40 - (t * rs - (rs - rw)) / 2;
  return (
    <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
      {top}
      {Array.from({ length: t }).map((_, i) => (
        <rect key={`t${i}`} x={rx0 + i * rs} y={42} width={rw} height={34} rx="1.2" fill={ROD} stroke={ROD_DARK} strokeWidth="1.8" />
      ))}
    </svg>
  );
};

/** Számkép kártyán: h százas, t tízes, e egyes. Ha nem fér el, kicsinyítjük. */
export const CardBlocks: React.FC<{ h: number; t: number; e: number; size?: 'm' | 's' }> = ({ h, t, e, size = 'm' }) => {
  if (size === 's') return <SmallBlocks h={h} t={t} e={e} />;
  const W = size === 'm' ? 150 : 80;
  const S = 56; // százas lap és rúd magassága alapméretben
  const rodW = 9;
  const rodStep = 13;
  const cube = 10;
  const eCols = e > 4 ? 2 : 1;
  const parts = [h * (S + 6), t * rodStep, e > 0 ? eCols * (cube + 3) : 0].filter((v) => v > 0);
  const total = parts.reduce((a, b) => a + b, 0) + (parts.length - 1) * 6;
  const k = Math.min(1, (W - 8) / total, 72 / S);
  let x = (W - total * k) / 2;
  const y = (80 - S * k) / 2;
  const out: React.ReactNode[] = [];
  for (let i = 0; i < h; i++) {
    out.push(
      <g key={`h${i}`}>
        <rect x={x} y={y} width={S * k} height={S * k} rx="2" fill={HUND} stroke="#7f1d1d" strokeWidth="2.5" />
        {[1, 2, 3, 4].map((q) => (
          <g key={q}>
            <line x1={x + (q * S * k) / 5} y1={y} x2={x + (q * S * k) / 5} y2={y + S * k} stroke="#7f1d1d" strokeWidth="1" />
            <line x1={x} y1={y + (q * S * k) / 5} x2={x + S * k} y2={y + (q * S * k) / 5} stroke="#7f1d1d" strokeWidth="1" />
          </g>
        ))}
      </g>
    );
    x += (S + 6) * k;
  }
  if (h && (t || e)) x += 6 * k;
  for (let i = 0; i < t; i++) {
    out.push(<rect key={`t${i}`} x={x} y={y} width={rodW * k} height={S * k} rx="1.5" fill={ROD} stroke={ROD_DARK} strokeWidth="2" />);
    x += rodStep * k;
  }
  if (t && e) x += 6 * k;
  for (let i = 0; i < e; i++) {
    const col = eCols === 2 ? i % 2 : 0;
    const row = eCols === 2 ? Math.floor(i / 2) : i;
    out.push(
      <rect
        key={`e${i}`}
        x={x + col * (cube + 3) * k}
        y={y + S * k - (row + 1) * (cube + 2) * k + 2 * k}
        width={cube * k}
        height={cube * k}
        rx="1.5"
        fill={ONE}
        stroke="#a16207"
        strokeWidth="2"
      />
    );
  }
  return (
    <svg viewBox={`0 0 ${W} 80`} xmlns="http://www.w3.org/2000/svg">
      {out}
    </svg>
  );
};

/** Árcédula nagy árral. */
export const CardTag: React.FC<{ price: number; size?: 'm' | 's' }> = ({ price, size = 's' }) => {
  const W = size === 'm' ? 150 : 80;
  return (
    <svg viewBox={`0 0 ${W} 80`} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <path d={`M 12 18 H ${W - 4} V 62 H 12 L 3 40 Z`} fill="#fef3c7" stroke="#b45309" strokeWidth="3" />
      <circle cx="12" cy="40" r="3" fill="#b45309" />
      <text x={(W + 12) / 2} y="47" textAnchor="middle" fontSize={size === 'm' ? 26 : 22} fontWeight="bold" fill={INK}>
        {price}
      </text>
      <text x={W - 10} y="58" textAnchor="end" fontSize="10" fontWeight="bold" fill="#92400e">
        Ft
      </text>
    </svg>
  );
};

/** Kerekítés: a szám fölül, alatta a két tízes szomszéd egy szakaszon, a szám helye ponttal. */
export const CardRoundLine: React.FC<{ n: number }> = ({ n }) => {
  const lo = Math.floor(n / 10) * 10;
  const x0 = 26;
  const x1 = 124;
  const px = x0 + ((n - lo) / 10) * (x1 - x0);
  return (
    <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <line x1={x0} y1="52" x2={x1} y2="52" stroke={INK} strokeWidth="3" />
      {Array.from({ length: 11 }).map((_, i) => (
        <line key={i} x1={x0 + i * 9.8} y1={i % 5 === 0 ? 44 : 48} x2={x0 + i * 9.8} y2={i % 5 === 0 ? 60 : 56} stroke={INK} strokeWidth={i % 5 === 0 ? 3 : 1.8} />
      ))}
      <circle cx={px} cy="52" r="5.5" fill="#dc2626" stroke="#7f1d1d" strokeWidth="1.5" />
      <text x={px} y="30" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#dc2626">
        {n}
      </text>
      <text x={x0} y="76" textAnchor="middle" fontSize="15" fontWeight="bold" fill={INK}>
        {lo}
      </text>
      <text x={x1} y="76" textAnchor="middle" fontSize="15" fontWeight="bold" fill={INK}>
        {lo + 10}
      </text>
    </svg>
  );
};

/** Legfeljebb 3 nagy érme egy kártyán. */
export const CardCoins: React.FC<{ values: number[]; size?: 'm' | 's' }> = ({ values, size = 'm' }) => {
  const W = size === 'm' ? 150 : 80;
  const n = values.length;
  const r = size === 'm' ? 22 : n > 2 ? 12 : 17;
  const step = (W - 2 * r - 8) / Math.max(1, n - 1);
  const x0 = n === 1 ? W / 2 : r + 4;
  return (
    <svg viewBox={`0 0 ${W} 80`} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      {values.map((v, i) => {
        const gold = v === 5 || v === 20;
        const bi = v === 100 || v === 200;
        const cx = x0 + i * step;
        return (
          <g key={i}>
            <circle cx={cx} cy="40" r={r} fill={gold ? '#fcd34d' : bi ? '#fde68a' : '#e2e8f0'} stroke={gold || bi ? '#b45309' : '#475569'} strokeWidth="2.5" />
            {bi && <circle cx={cx} cy="40" r={r - 5} fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1" />}
            <text x={cx} y={40 + r * 0.3} textAnchor="middle" fontSize={v >= 100 ? r * 0.72 : r * 0.85} fontWeight="bold" fill={INK}>
              {v}
            </text>
          </g>
        );
      })}
    </svg>
  );
};
