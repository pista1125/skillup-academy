import React from 'react';
import { FONT, Coin, C_SZ, C_T, C_E } from './ThreeDigitAddG3Parts';

// Kis, vastag vonalas ikonok a Párosító (150 × 80) és a Csoportosító (80 × 80) kártyáira.

/** Párosító: egy szám kirakva (vastag százas lap, tízesrúd, egyes kocka). */
export const MiniBlocks: React.FC<{ sz?: number; t?: number; e?: number }> = ({ sz = 2, t = 3, e = 0 }) => {
  const s = 34;
  const rw = 7;
  const w = sz * (s + 5) + t * (rw + 3) + (e > 0 ? Math.ceil(e / 2) * 11 : 0);
  let x = (150 - w) / 2;
  const items: React.ReactNode[] = [];
  for (let i = 0; i < sz; i++) {
    items.push(<rect key={`f${i}`} x={x} y="23" width={s} height={s} rx="3" fill={C_SZ} stroke="#7f1d1d" strokeWidth="3" />);
    x += s + 5;
  }
  for (let i = 0; i < t; i++) {
    items.push(<rect key={`r${i}`} x={x} y="23" width={rw} height={s} rx="2" fill={C_T} stroke="#1e3a8a" strokeWidth="2.2" />);
    x += rw + 3;
  }
  for (let i = 0; i < e; i++) {
    items.push(<rect key={`c${i}`} x={x + Math.floor(i / 2) * 11} y={57 - 9 - (i % 2) * 11} width="9" height="9" rx="1.5" fill={C_E} stroke="#a16207" strokeWidth="2" />);
  }
  return <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg">{items}</svg>;
};

/** Párosító: érmék egy sorban. */
export const MiniCoins: React.FC<{ coins?: number[] }> = ({ coins = [200, 100, 50] }) => {
  const r = coins.length > 4 ? 14 : 17;
  const gap = 4;
  const w = coins.length * 2 * r + (coins.length - 1) * gap;
  const x0 = (150 - w) / 2 + r;
  return (
    <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      {coins.map((v, i) => (
        <Coin key={i} cx={x0 + i * (2 * r + gap)} cy={40} v={v} r={r} />
      ))}
    </svg>
  );
};

/** Párosító: két árcédula „+” jellel. */
export const MiniTags: React.FC<{ prices?: number[] }> = ({ prices = [230, 140] }) => (
  <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    {prices.slice(0, 2).map((p, i) => {
      const x = 4 + i * 84;
      return (
        <g key={i}>
          <path d={`M ${x} 22 L ${x + 50} 22 L ${x + 60} 40 L ${x + 50} 58 L ${x} 58 Z`} fill="#fff" stroke="#475569" strokeWidth="3" />
          <text x={x + 26} y="49" textAnchor="middle" fontSize="23" fontWeight="bold" fill="#0f172a">{p}</text>
        </g>
      );
    })}
    <text x="76" y="49" textAnchor="middle" fontSize="26" fontWeight="bold" fill="#16a34a">+</text>
  </svg>
);

/** Párosító: sok tízesrúd (pl. 13 db) – hány tízes ez? */
export const MiniRods: React.FC<{ n?: number }> = ({ n = 13 }) => {
  const rw = 6;
  const gap = 2.6;
  const w = n * rw + (n - 1) * gap;
  const x0 = (150 - w) / 2;
  return (
    <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg">
      {Array.from({ length: n }).map((_, i) => (
        <rect key={i} x={x0 + i * (rw + gap)} y="14" width={rw} height="52" rx="2" fill={C_T} stroke="#1e3a8a" strokeWidth="2" />
      ))}
    </svg>
  );
};

/** Csoportosító: két árcédula egymás alatt. */
export const SortTags: React.FC<{ prices?: number[] }> = ({ prices = [180, 250] }) => (
  <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    {prices.slice(0, 2).map((p, i) => {
      const y = 6 + i * 38;
      return (
        <g key={i}>
          <path d={`M 3 ${y} L 54 ${y} L 64 ${y + 15} L 54 ${y + 30} L 3 ${y + 30} Z`} fill="#fff" stroke="#475569" strokeWidth="3" />
          <text x="29" y={y + 23} textAnchor="middle" fontSize="21" fontWeight="bold" fill="#0f172a">{p}</text>
        </g>
      );
    })}
    <text x="72" y="48" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#16a34a">+</text>
  </svg>
);

/** Csoportosító: két szám kirakva (felül az első, alul a második tag), csak százas és tízes. */
export const SortBlocks: React.FC<{ a?: [number, number]; b?: [number, number] }> = ({ a = [1, 8], b = [2, 5] }) => {
  const row = (sz: number, t: number, y: number, key: string) => {
    const s = 22;
    const items: React.ReactNode[] = [];
    let x = 4;
    for (let i = 0; i < sz; i++) {
      items.push(<rect key={`${key}f${i}`} x={x} y={y} width={s} height={s} rx="2" fill={C_SZ} stroke="#7f1d1d" strokeWidth="2.4" />);
      x += s + 3;
    }
    for (let i = 0; i < t; i++) {
      items.push(<rect key={`${key}r${i}`} x={x} y={y} width="4" height={s} rx="1" fill={C_T} stroke="#1e3a8a" strokeWidth="1.6" />);
      x += 5.6;
    }
    return items;
  };
  return (
    <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
      {row(a[0], a[1], 8, 'a')}
      <line x1="4" y1="40" x2="76" y2="40" stroke="#16a34a" strokeWidth="3" strokeDasharray="5 3" />
      {row(b[0], b[1], 48, 'b')}
    </svg>
  );
};
