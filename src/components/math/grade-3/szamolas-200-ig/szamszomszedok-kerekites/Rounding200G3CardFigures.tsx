import React from 'react';
import { FONT, UNK } from './Rounding200G3Parts';

// Kis, vastag vonalas ikonok a Párosító (150 × 80) és a Csoportosító (80 × 80) kártyáira.

/** Párosító: számegyenes-darab két kerek tízes között, ponttal. */
export const MiniLine: React.FC<{ lo?: number; v?: number }> = ({ lo = 140, v = 147 }) => {
  const x0 = 16;
  const x1 = 134;
  const X = (n: number) => x0 + ((x1 - x0) * (n - lo)) / 10;
  return (
    <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <line x1={x0 - 6} y1="34" x2={x1 + 6} y2="34" stroke="#334155" strokeWidth="3" />
      {Array.from({ length: 11 }, (_, i) => (
        <line key={i} x1={X(lo + i)} y1={i === 0 || i === 10 ? 22 : i === 5 ? 26 : 28} x2={X(lo + i)} y2={i === 0 || i === 10 ? 46 : i === 5 ? 42 : 40} stroke="#334155" strokeWidth={i === 0 || i === 10 ? 3.5 : 2} />
      ))}
      <circle cx={X(v)} cy="34" r="7" fill="#f59e0b" stroke="#78350f" strokeWidth="2.5" />
      <text x="3" y="70" textAnchor="start" fontSize="20" fontWeight="bold" fill="#1d4ed8">{lo}</text>
      <text x="147" y="70" textAnchor="end" fontSize="20" fontWeight="bold" fill="#1d4ed8">{lo + 10}</text>
    </svg>
  );
};

/** Párosító: dobozsor, '?' = keresett szám. */
export const MiniRow: React.FC<{ items?: string[] }> = ({ items = ['?', '147', '?'] }) => {
  const n = items.length;
  const gap = 6;
  const w = Math.min(54, (140 - (n - 1) * gap) / n);
  const x0 = (150 - (n * w + (n - 1) * gap)) / 2;
  return (
    <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      {items.map((t, i) => {
        const q = t === '?';
        return (
          <g key={i}>
            <rect x={x0 + i * (w + gap)} y="18" width={w} height="44" rx="8" fill={q ? '#fee2e2' : '#ecfeff'} stroke={q ? UNK : '#0891b2'} strokeWidth="3" />
            <text x={x0 + i * (w + gap) + w / 2} y="49" textAnchor="middle" fontSize={t.length > 3 ? 17 : n >= 3 ? 19 : 22} fontWeight="bold" fill={q ? UNK : '#164e63'}>{t}</text>
          </g>
        );
      })}
    </svg>
  );
};

/** Csoportosító: rövid számegyenes két kerek tízessel és egy ponttal. */
export const SortLine: React.FC<{ lo?: number; v?: number }> = ({ lo = 130, v = 133 }) => {
  const x0 = 10;
  const x1 = 70;
  const X = (n: number) => x0 + ((x1 - x0) * (n - lo)) / 10;
  return (
    <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <line x1="4" y1="34" x2="76" y2="34" stroke="#334155" strokeWidth="3" />
      <line x1={x0} y1="22" x2={x0} y2="46" stroke="#334155" strokeWidth="3.5" />
      <line x1={x1} y1="22" x2={x1} y2="46" stroke="#334155" strokeWidth="3.5" />
      {Array.from({ length: 9 }, (_, i) => (
        <line key={i} x1={X(lo + i + 1)} y1={i === 4 ? 26 : 29} x2={X(lo + i + 1)} y2={i === 4 ? 42 : 39} stroke="#334155" strokeWidth={i === 4 ? 2.5 : 1.5} />
      ))}
      <circle cx={X(v)} cy="34" r="6.5" fill="#f59e0b" stroke="#78350f" strokeWidth="2.5" />
      <text x="2" y="68" textAnchor="start" fontSize="17" fontWeight="bold" fill="#1d4ed8">{lo}</text>
      <text x="78" y="68" textAnchor="end" fontSize="17" fontWeight="bold" fill="#1d4ed8">{lo + 10}</text>
    </svg>
  );
};

/** Csoportosító: százas lap, tízesrudak, egyeskockák. */
export const MiniBlocks: React.FC<{ sz?: number; t?: number; e?: number }> = ({ sz = 1, t = 4, e = 7 }) => {
  const parts: React.ReactNode[] = [];
  let x = 4;
  for (let i = 0; i < sz; i++) {
    parts.push(
      <g key={`s${i}`}>
        <rect x={x} y="14" width="30" height="30" fill="#ef4444" stroke="#7f1d1d" strokeWidth="2.5" />
        <line x1={x + 10} y1="14" x2={x + 10} y2="44" stroke="#7f1d1d" strokeWidth="1" />
        <line x1={x + 20} y1="14" x2={x + 20} y2="44" stroke="#7f1d1d" strokeWidth="1" />
        <line x1={x} y1="24" x2={x + 30} y2="24" stroke="#7f1d1d" strokeWidth="1" />
        <line x1={x} y1="34" x2={x + 30} y2="34" stroke="#7f1d1d" strokeWidth="1" />
      </g>
    );
    x += 34;
  }
  const rodW = t > 5 ? 4 : 6;
  const rodStep = rodW + (t > 5 ? 1.4 : 1.8);
  for (let i = 0; i < t; i++) {
    parts.push(<rect key={`t${i}`} x={x + i * rodStep} y="14" width={rodW} height="30" fill="#3b82f6" stroke="#1e3a8a" strokeWidth="1.5" />);
  }
  const cubes: React.ReactNode[] = [];
  for (let i = 0; i < e; i++) {
    cubes.push(<rect key={`e${i}`} x={6 + (i % 5) * 11} y={52 + Math.floor(i / 5) * 12} width="8.5" height="8.5" fill="#facc15" stroke="#854d0e" strokeWidth="1.5" />);
  }
  return (
    <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      {parts}
      {cubes}
    </svg>
  );
};
