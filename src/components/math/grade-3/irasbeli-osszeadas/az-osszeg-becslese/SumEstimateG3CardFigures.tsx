import React from 'react';
import { FONT } from '../haromjegyu-szamok-osszeadasa/ThreeDigitAddG3Parts';

// Kis, vastag vonalas ikonok a Párosító (150 × 80) és a Csoportosító (80 × 80) kártyáira.

/** Párosító: számegyenes-darab lo..hi (10 egyenlő rész), egy narancs ponttal; a két végén a szám. */
export const MiniLine: React.FC<{ lo?: number; hi?: number; v?: number }> = ({ lo = 200, hi = 300, v = 238 }) => {
  const x0 = 18;
  const x1 = 132;
  const X = (n: number) => x0 + ((x1 - x0) * (n - lo)) / (hi - lo);
  const step = (hi - lo) / 10;
  return (
    <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <line x1={x0 - 8} y1="32" x2={x1 + 8} y2="32" stroke="#334155" strokeWidth="3" />
      {Array.from({ length: 11 }, (_, i) => {
        const end = i === 0 || i === 10;
        const mid = i === 5;
        return <line key={i} x1={X(lo + i * step)} y1={end ? 20 : mid ? 23 : 26} x2={X(lo + i * step)} y2={end ? 44 : mid ? 41 : 38} stroke="#334155" strokeWidth={end ? 3.5 : 2} />;
      })}
      <circle cx={X(v)} cy="32" r="7" fill="#f59e0b" stroke="#78350f" strokeWidth="2.5" />
      <text x="4" y="70" textAnchor="start" fontSize="20" fontWeight="bold" fill="#b91c1c">{lo}</text>
      <text x="146" y="70" textAnchor="end" fontSize="20" fontWeight="bold" fill="#b91c1c">{hi}</text>
    </svg>
  );
};

/** Csoportosító: egy kiszámolt összeadás füzetlapon (ellenőrizni kell becsléssel). */
export const SortCalc: React.FC<{ a?: number; b?: number; s?: number }> = ({ a = 236, b = 145, s = 281 }) => (
  <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="3" y="3" width="74" height="74" rx="6" fill="#fff" stroke="#64748b" strokeWidth="3" />
    <text x="71" y="27" textAnchor="end" fontSize="20" fontWeight="bold" fill="#0f172a">{a}</text>
    <text x="71" y="48" textAnchor="end" fontSize="20" fontWeight="bold" fill="#0f172a">{b}</text>
    <text x="12" y="48" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#0f172a">+</text>
    <line x1="8" y1="54" x2="74" y2="54" stroke="#0f172a" strokeWidth="3" />
    <text x="71" y="73" textAnchor="end" fontSize="20" fontWeight="bold" fill="#1d4ed8">{s}</text>
  </svg>
);
