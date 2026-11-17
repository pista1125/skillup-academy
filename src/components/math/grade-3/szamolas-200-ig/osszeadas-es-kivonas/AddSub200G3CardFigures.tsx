import React from 'react';
import { FONT, UNK, Coin } from './AddSub200G3Parts';

// Kis, vastag vonalas ikonok a Párosító (150 × 80) és a Csoportosító (80 × 80) kártyáira.

/** Párosító: érmék egy sorban. */
export const MiniCoins: React.FC<{ coins?: number[] }> = ({ coins = [100, 50] }) => {
  const r = coins.length > 3 ? 16 : 20;
  const g = 2 * r + 3;
  const x0 = (150 - coins.length * g) / 2 + r + 1.5;
  return (
    <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      {coins.map((c, i) => (
        <Coin key={i} cx={x0 + i * g} cy={40} v={c} r={c >= 100 ? r + 1 : r - 1} />
      ))}
    </svg>
  );
};

/** Párosító: két csoport tízesrúd „+” jellel. */
export const MiniRods: React.FC<{ a?: number; b?: number }> = ({ a = 7, b = 6 }) => {
  const step = Math.min(8.5, 124 / (a + b));
  const w = step - 2.4;
  const total = (a + b) * step + 16;
  const x0 = (150 - total) / 2;
  const rod = (x: number, fill: string, key: string) => (
    <rect key={key} x={x} y="12" width={w} height="56" rx="1.5" fill={fill} stroke="#1e3a8a" strokeWidth="1.6" />
  );
  return (
    <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      {Array.from({ length: a }, (_, i) => rod(x0 + i * step, '#60a5fa', `a${i}`))}
      <text x={x0 + a * step + 6} y="49" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#334155">+</text>
      {Array.from({ length: b }, (_, i) => rod(x0 + a * step + 16 + i * step, '#f472b6', `b${i}`))}
    </svg>
  );
};

/** Párosító: csík a 200-ig, ismert rész + ?. */
export const MiniBar200: React.FC<{ known?: number }> = ({ known = 150 }) => {
  const W = 136;
  const kw = (W * known) / 200;
  return (
    <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <text x="75" y="22" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#0c4a6e">200</text>
      <rect x="7" y="32" width={kw} height="38" fill="#38bdf8" stroke="#0369a1" strokeWidth="3" />
      <rect x={7 + kw} y="32" width={W - kw} height="38" fill="#fee2e2" stroke={UNK} strokeWidth="3" />
      <text x={7 + kw / 2} y="58" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#0c4a6e">{known}</text>
      <text x={7 + kw + (W - kw) / 2} y="59" textAnchor="middle" fontSize="22" fontWeight="bold" fill={UNK}>?</text>
    </svg>
  );
};

/** Csoportosító: százas lap és tízesrudak. */
export const SortBlocks: React.FC<{ sz?: number; t?: number }> = ({ sz = 1, t = 2 }) => {
  const parts: React.ReactNode[] = [];
  let x = 4;
  for (let i = 0; i < sz; i++) {
    parts.push(
      <g key={`s${i}`}>
        <rect x={x} y="16" width="44" height="48" fill="#ef4444" stroke="#7f1d1d" strokeWidth="3" />
        <line x1={x + 15} y1="16" x2={x + 15} y2="64" stroke="#7f1d1d" strokeWidth="1.2" />
        <line x1={x + 29} y1="16" x2={x + 29} y2="64" stroke="#7f1d1d" strokeWidth="1.2" />
        <line x1={x} y1="32" x2={x + 44} y2="32" stroke="#7f1d1d" strokeWidth="1.2" />
        <line x1={x} y1="48" x2={x + 44} y2="48" stroke="#7f1d1d" strokeWidth="1.2" />
      </g>
    );
    x += 49;
  }
  const avail = 76 - x;
  const step = Math.min(8.5, avail / Math.max(1, t));
  const w = Math.max(3.5, step - 2.2);
  for (let i = 0; i < t; i++) {
    parts.push(<rect key={`t${i}`} x={x + i * step} y="16" width={w} height="48" rx="1" fill="#3b82f6" stroke="#1e3a8a" strokeWidth="1.5" />);
  }
  return (
    <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      {parts}
    </svg>
  );
};

/** Csoportosító: legfeljebb 4 érme 2 × 2-es elrendezésben. */
export const SortCoins: React.FC<{ coins?: number[] }> = ({ coins = [100, 20] }) => {
  const pos = coins.length <= 2 ? [[22, 40], [58, 40]] : [[21, 21], [59, 21], [21, 59], [59, 59]];
  return (
    <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      {coins.map((c, i) => (
        <Coin key={i} cx={pos[i][0]} cy={pos[i][1]} v={c} r={c >= 100 ? 19 : 17} />
      ))}
    </svg>
  );
};

/** Csoportosító: pénzed (érmék fent) és egy árcédula (lent). */
export const SortShop: React.FC<{ coins?: number[]; price?: number }> = ({ coins = [200], price = 150 }) => {
  const g = 36;
  const x0 = 40 - ((coins.length - 1) * g) / 2;
  return (
    <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      {coins.map((c, i) => (
        <Coin key={i} cx={x0 + i * g} cy={22} v={c} r={17} />
      ))}
      <path d="M 4 46 L 64 46 L 76 61 L 64 76 L 4 76 Z" fill="#fff" stroke="#475569" strokeWidth="3" />
      <text x="34" y="68" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#0f172a">{price}</text>
    </svg>
  );
};
