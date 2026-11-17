import React from 'react';
import { FONT, UNK, Coin } from './AddSub500G3Parts';

// Kis, vastag vonalas ikonok a Párosító (150 × 80) és a Csoportosító (80 × 80) kártyáira.

/** Párosító: érmék egy sorban (legfeljebb 5). */
export const MiniCoins: React.FC<{ coins?: number[] }> = ({ coins = [100, 50] }) => {
  const two = coins.length > 3;
  const top = two ? Math.ceil(coins.length / 2) : coins.length;
  const r = two ? 18 : 19;
  const g = 2 * r + 3;
  const pos = coins.map((_, i) => {
    const row = two && i >= top ? 1 : 0;
    const inRow = row ? coins.length - top : top;
    const k = row ? i - top : i;
    return { x: 75 - ((inRow - 1) * g) / 2 + k * g, y: two ? (row ? 60 : 20) : 40 };
  });
  return (
    <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      {coins.map((c, i) => (
        <Coin key={i} cx={pos[i].x} cy={pos[i].y} v={c} r={c >= 100 ? r + 0.5 : r - 1.5} />
      ))}
    </svg>
  );
};

/** Párosító: rövid számegyenes egy ugrással, a végén „?”. */
export const MiniJump: React.FC<{ from?: number; by?: number }> = ({ from = 380, by = 40 }) => {
  const plus = by > 0;
  const xa = plus ? 30 : 120;
  const xb = plus ? 120 : 30;
  const col = plus ? '#16a34a' : '#ea580c';
  return (
    <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <line x1="8" y1="52" x2="142" y2="52" stroke="#334155" strokeWidth="3" />
      <path d={`M ${xa} 48 Q 75 22 ${xb} 48`} fill="none" stroke={col} strokeWidth="3.5" />
      <path d={`M ${xb - (plus ? 9 : -9)} 40 L ${xb} 48 L ${xb - (plus ? 1 : -1)} 37`} fill="none" stroke={col} strokeWidth="3.5" />
      <text x="75" y="22" textAnchor="middle" fontSize="20" fontWeight="bold" fill={col}>{plus ? `+${by}` : `−${-by}`}</text>
      <circle cx={xa} cy="52" r="5" fill="#2563eb" />
      <circle cx={xb} cy="52" r="5" fill={UNK} />
      <text x={xa} y="76" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#1d4ed8">{from}</text>
      <text x={xb} y="77" textAnchor="middle" fontSize="23" fontWeight="bold" fill={UNK}>?</text>
    </svg>
  );
};

/** Párosító: csík az 500-ig, ismert rész + ?. */
export const MiniBar500: React.FC<{ known?: number }> = ({ known = 320 }) => {
  const W = 136;
  const kw = (W * known) / 500;
  return (
    <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <text x="75" y="22" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#0c4a6e">500</text>
      <rect x="7" y="32" width={kw} height="38" fill="#38bdf8" stroke="#0369a1" strokeWidth="3" />
      <rect x={7 + kw} y="32" width={W - kw} height="38" fill="#fee2e2" stroke={UNK} strokeWidth="3" />
      <text x={7 + kw / 2} y="58" textAnchor="middle" fontSize={kw < 46 ? 17 : 20} fontWeight="bold" fill="#0c4a6e">{known}</text>
      <text x={7 + kw + (W - kw) / 2} y="59" textAnchor="middle" fontSize="22" fontWeight="bold" fill={UNK}>?</text>
    </svg>
  );
};

/** Csoportosító: százas lapok fent, tízesrudak lent. */
export const SortBlocks: React.FC<{ sz?: number; t?: number }> = ({ sz = 2, t = 8 }) => {
  const s = sz >= 4 ? 16 : 22;
  const fx0 = 40 - (sz * (s + 4) - 4) / 2;
  const step = t > 8 ? 7 : 8.5;
  const rw = step - 2.5;
  const rx0 = 40 - (t * step - 2.5) / 2;
  return (
    <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      {Array.from({ length: sz }).map((_, i) => (
        <g key={`f${i}`}>
          <rect x={fx0 + i * (s + 4)} y="6" width={s} height={s} fill="#ef4444" stroke="#7f1d1d" strokeWidth="2.5" />
          <line x1={fx0 + i * (s + 4) + s / 2} y1="6" x2={fx0 + i * (s + 4) + s / 2} y2={6 + s} stroke="#7f1d1d" strokeWidth="1" />
          <line x1={fx0 + i * (s + 4)} y1={6 + s / 2} x2={fx0 + i * (s + 4) + s} y2={6 + s / 2} stroke="#7f1d1d" strokeWidth="1" />
        </g>
      ))}
      {Array.from({ length: t }).map((_, i) => (
        <rect key={`r${i}`} x={rx0 + i * step} y="38" width={rw} height="36" rx="1" fill="#3b82f6" stroke="#1e3a8a" strokeWidth="1.5" />
      ))}
    </svg>
  );
};

/** Csoportosító: kis ugrás, alatta a kezdő szám. */
export const SortJump: React.FC<{ from?: number; by?: number }> = ({ from = 290, by = 30 }) => {
  const plus = by > 0;
  const xa = plus ? 20 : 60;
  const xb = plus ? 60 : 20;
  const col = plus ? '#16a34a' : '#ea580c';
  return (
    <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <line x1="4" y1="52" x2="76" y2="52" stroke="#334155" strokeWidth="3" />
      <path d={`M ${xa} 48 Q 40 14 ${xb} 48`} fill="none" stroke={col} strokeWidth="3.5" />
      <path d={`M ${xb - (plus ? 7 : -7)} 41 L ${xb} 48 L ${xb - (plus ? 1 : -1)} 39`} fill="none" stroke={col} strokeWidth="3.5" />
      <text x="40" y="24" textAnchor="middle" fontSize="20" fontWeight="bold" fill={col}>{plus ? `+${by}` : `−${-by}`}</text>
      <circle cx={xa} cy="52" r="4.5" fill="#2563eb" />
      <text x={xa} y="75" textAnchor="middle" fontSize="19" fontWeight="bold" fill="#1d4ed8">{from}</text>
      <text x={xb} y="76" textAnchor="middle" fontSize="21" fontWeight="bold" fill={UNK}>?</text>
    </svg>
  );
};

/** Csoportosító: egy vagy két árcédula (a vásárolt dolgok ára). */
export const SortTags: React.FC<{ prices?: number[] }> = ({ prices = [380] }) => {
  const tag = (y: number, p: number, key: number) => (
    <g key={key}>
      <path d={`M 4 ${y} L 62 ${y} L 76 ${y + 15} L 62 ${y + 30} L 4 ${y + 30} Z`} fill="#fff" stroke="#475569" strokeWidth="3" />
      <text x="34" y={y + 22} textAnchor="middle" fontSize="20" fontWeight="bold" fill="#0f172a">{p}</text>
    </g>
  );
  return (
    <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      {prices.length === 1 ? tag(25, prices[0], 0) : prices.map((p, i) => tag(6 + i * 38, p, i))}
    </svg>
  );
};
