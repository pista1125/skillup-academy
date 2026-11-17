import React from 'react';
import { FONT } from './Rounding500G3Parts';

// Kis, vastag vonalas ikonok a Párosító (150 × 80) és a Csoportosító (80 × 80) kártyáira.

/** Párosító: számegyenes két kerek százas között (10-es osztással), egy ponttal. */
export const MiniHLine: React.FC<{ lo?: number; v?: number }> = ({ lo = 200, v = 236 }) => {
  const x0 = 18;
  const x1 = 132;
  const X = (n: number) => x0 + ((x1 - x0) * (n - lo)) / 100;
  return (
    <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <line x1={x0 - 8} y1="34" x2={x1 + 8} y2="34" stroke="#334155" strokeWidth="3" />
      {Array.from({ length: 11 }, (_, i) => {
        const end = i === 0 || i === 10;
        const mid = i === 5;
        return <line key={i} x1={X(lo + i * 10)} y1={end ? 22 : mid ? 25 : 28} x2={X(lo + i * 10)} y2={end ? 46 : mid ? 43 : 40} stroke="#334155" strokeWidth={end ? 3.5 : 2} />;
      })}
      <circle cx={X(v)} cy="34" r="7" fill="#f59e0b" stroke="#78350f" strokeWidth="2.5" />
      <text x="4" y="70" textAnchor="start" fontSize="20" fontWeight="bold" fill="#b91c1c">{lo}</text>
      <text x="146" y="70" textAnchor="end" fontSize="20" fontWeight="bold" fill="#b91c1c">{lo + 100}</text>
    </svg>
  );
};

/** Csoportosító: rövid számegyenes két kerek százassal és egy ponttal. */
export const SortHLine: React.FC<{ lo?: number; v?: number }> = ({ lo = 200, v = 238 }) => {
  const x0 = 10;
  const x1 = 70;
  const X = (n: number) => x0 + ((x1 - x0) * (n - lo)) / 100;
  return (
    <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <line x1="4" y1="34" x2="76" y2="34" stroke="#334155" strokeWidth="3" />
      <line x1={x0} y1="22" x2={x0} y2="46" stroke="#334155" strokeWidth="3.5" />
      <line x1={x1} y1="22" x2={x1} y2="46" stroke="#334155" strokeWidth="3.5" />
      <line x1={X(lo + 50)} y1="26" x2={X(lo + 50)} y2="42" stroke="#334155" strokeWidth="2.5" />
      <circle cx={X(v)} cy="34" r="6.5" fill="#f59e0b" stroke="#78350f" strokeWidth="2.5" />
      <text x="2" y="68" textAnchor="start" fontSize="17" fontWeight="bold" fill="#b91c1c">{lo}</text>
      <text x="78" y="68" textAnchor="end" fontSize="17" fontWeight="bold" fill="#b91c1c">{lo + 100}</text>
    </svg>
  );
};

/** Párosító: dobozsor, '?' = keresett szám. */
export const MiniRow: React.FC<{ items?: string[] }> = ({ items = ['?', '338', '?'] }) => {
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
            <rect x={x0 + i * (w + gap)} y="18" width={w} height="44" rx="8" fill={q ? '#fee2e2' : '#ecfeff'} stroke={q ? '#dc2626' : '#0891b2'} strokeWidth="3" />
            <text x={x0 + i * (w + gap) + w / 2} y="49" textAnchor="middle" fontSize={n >= 3 ? 19 : 22} fontWeight="bold" fill={q ? '#dc2626' : '#164e63'}>{t}</text>
          </g>
        );
      })}
    </svg>
  );
};

/** Csoportosító: háromjegyű szám kártyákon, egy jegy letakarva (□). */
export const HiddenCard: React.FC<{ digits?: string[] }> = ({ digits = ['3', '1', '?'] }) => (
  <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    {digits.map((d, i) => {
      const q = d === '?';
      return (
        <g key={i}>
          <rect x={3 + i * 25.5} y="20" width="23" height="40" rx="5" fill={q ? '#2563eb' : '#fff'} stroke={q ? '#1e3a8a' : '#334155'} strokeWidth="3" />
          {!q && <text x={14.5 + i * 25.5} y="49" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#0f172a">{d}</text>}
        </g>
      );
    })}
  </svg>
);
