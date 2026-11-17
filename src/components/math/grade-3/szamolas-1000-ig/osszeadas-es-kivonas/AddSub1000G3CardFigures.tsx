import React from 'react';
import { FONT, UNK, Coin } from '../szamok-1000-ig/Numbers1000G3Parts';

// Kis, vastag vonalas ikonok a Párosító (150 × 80) és a Csoportosító (80 × 80) kártyáira.

/** Párosító: egy ugrás a számegyenesen, a végén „?”. */
export const MiniJump: React.FC<{ from?: number; by?: number }> = ({ from = 480, by = 70 }) => {
  const plus = by > 0;
  const xa = plus ? 28 : 122;
  const xb = plus ? 122 : 28;
  const col = plus ? '#16a34a' : '#ea580c';
  return (
    <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <line x1="6" y1="52" x2="144" y2="52" stroke="#334155" strokeWidth="3" />
      <path d={`M ${xa} 47 Q 75 18 ${xb} 47`} fill="none" stroke={col} strokeWidth="3.5" />
      <path d={`M ${xb - (plus ? 9 : -9)} 39 L ${xb} 47 L ${xb - (plus ? 1 : -1)} 36`} fill="none" stroke={col} strokeWidth="3.5" />
      <text x="75" y="24" textAnchor="middle" fontSize="20" fontWeight="bold" fill={col}>{plus ? `+${by}` : `−${-by}`}</text>
      <circle cx={xa} cy="52" r="5" fill="#2563eb" />
      <circle cx={xb} cy="52" r="5" fill={UNK} />
      <text x={xa} y="76" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#1d4ed8">{from}</text>
      <text x={xb} y="77" textAnchor="middle" fontSize="23" fontWeight="bold" fill={UNK}>?</text>
    </svg>
  );
};

/** Párosító: csík az 1000-ig, ismert rész + ?. */
export const MiniBar1000: React.FC<{ known?: number }> = ({ known = 740 }) => {
  const W = 136;
  const kw = (W * known) / 1000;
  const unknownW = W - kw;
  return (
    <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <text x="75" y="22" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#0c4a6e">1000</text>
      <rect x="7" y="32" width={kw} height="38" fill="#38bdf8" stroke="#0369a1" strokeWidth="3" />
      <rect x={7 + kw} y="32" width={unknownW} height="38" fill="#fee2e2" stroke={UNK} strokeWidth="3" />
      <text x={7 + kw / 2} y="58" textAnchor="middle" fontSize={kw < 46 ? 16 : 20} fontWeight="bold" fill="#0c4a6e">{known}</text>
      <text x={7 + kw + unknownW / 2} y="59" textAnchor="middle" fontSize={unknownW < 22 ? 17 : 22} fontWeight="bold" fill={UNK}>?</text>
    </svg>
  );
};

/** Párosító: két árcédula és egy 1000 Ft-os („mennyi marad?”). */
export const MiniTags: React.FC<{ prices?: number[] }> = ({ prices = [450, 230] }) => (
  <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    {prices.map((p, i) => (
      <g key={i}>
        <path d={`M 4 ${6 + i * 38} L 74 ${6 + i * 38} L 88 ${22 + i * 38} L 74 ${38 + i * 38} L 4 ${38 + i * 38} Z`} fill="#fef9c3" stroke="#a16207" strokeWidth="3" />
        <text x="40" y={30 + i * 38} textAnchor="middle" fontSize="21" fontWeight="bold" fill="#0f172a">{p}</text>
      </g>
    ))}
    <rect x="96" y="22" width="50" height="36" rx="4" fill="#bfdbfe" stroke="#1d4ed8" strokeWidth="3" />
    <text x="121" y="47" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#1d4ed8">1000</text>
  </svg>
);

/** Csoportosító: érmék 2 × 2-ben (80 × 80). */
export const SortCoins: React.FC<{ coins?: number[] }> = ({ coins = [200, 200, 100] }) => {
  const pos = coins.length <= 2 ? [[22, 40], [58, 40]] : [[21, 21], [59, 21], [21, 59], [59, 59]];
  const r = 18;
  return (
    <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      {coins.map((c, i) => (
        <Coin key={i} cx={pos[i][0]} cy={pos[i][1]} v={c} r={c >= 100 ? r : r - 2} />
      ))}
    </svg>
  );
};

/** Csoportosító: egy ugrás (80 × 80): fent a lépés, lent a kezdőszám. */
export const SortJump: React.FC<{ from?: number; by?: number }> = ({ from = 540, by = 60 }) => {
  const plus = by > 0;
  const xa = plus ? 16 : 64;
  const xb = plus ? 64 : 16;
  const col = plus ? '#16a34a' : '#ea580c';
  return (
    <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <line x1="3" y1="50" x2="77" y2="50" stroke="#334155" strokeWidth="3" />
      <path d={`M ${xa} 45 Q 40 22 ${xb} 45`} fill="none" stroke={col} strokeWidth="3.5" />
      <path d={`M ${xb - (plus ? 8 : -8)} 39 L ${xb} 45 L ${xb - (plus ? 1 : -1)} 35`} fill="none" stroke={col} strokeWidth="3" />
      <text x="40" y="22" textAnchor="middle" fontSize="18" fontWeight="bold" fill={col}>{plus ? `+${by}` : `−${-by}`}</text>
      <circle cx={xa} cy="50" r="4.5" fill="#2563eb" />
      <text x={xa} y="74" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#1d4ed8">{from}</text>
      <text x={xb} y="74" textAnchor="middle" fontSize="20" fontWeight="bold" fill={UNK}>?</text>
    </svg>
  );
};

/** Csoportosító: egy vagy két árcédula (80 × 80). */
export const SortTags: React.FC<{ prices?: number[] }> = ({ prices = [900] }) => {
  const one = prices.length === 1;
  return (
    <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      {prices.map((p, i) => {
        const y = one ? 24 : 6 + i * 38;
        return (
          <g key={i}>
            <path d={`M 3 ${y} L 60 ${y} L 76 ${y + 16} L 60 ${y + 32} L 3 ${y + 32} Z`} fill="#fef9c3" stroke="#a16207" strokeWidth="3" />
            <text x="33" y={y + 23} textAnchor="middle" fontSize="20" fontWeight="bold" fill="#0f172a">{p}</text>
          </g>
        );
      })}
    </svg>
  );
};
