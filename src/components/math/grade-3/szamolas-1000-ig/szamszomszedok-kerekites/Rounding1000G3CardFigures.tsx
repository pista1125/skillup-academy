import React from 'react';
import { FONT, UNK } from '../szamok-1000-ig/Numbers1000G3Parts';

// Kis, vastag vonalas ikonok a Párosító (150 × 80) és a Csoportosító (80 × 80) kártyáira.

/** Párosító: számegyenes két szomszéd között (10 osztás), egy ponttal. Csak a két vég van kiírva. */
export const MiniRoundLine: React.FC<{ lo?: number; hi?: number; v?: number }> = ({ lo = 870, hi = 880, v = 873 }) => {
  const x0 = 20;
  const x1 = 130;
  const X = (n: number) => x0 + ((x1 - x0) * (n - lo)) / (hi - lo);
  return (
    <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <line x1="8" y1="32" x2="142" y2="32" stroke="#334155" strokeWidth="3" />
      {Array.from({ length: 11 }, (_, i) => {
        const end = i === 0 || i === 10;
        const mid = i === 5;
        const x = x0 + ((x1 - x0) * i) / 10;
        return <line key={i} x1={x} y1={end ? 20 : mid ? 23 : 26} x2={x} y2={end ? 44 : mid ? 41 : 38} stroke="#334155" strokeWidth={end ? 3.5 : 2} />;
      })}
      <circle cx={X(v)} cy="32" r="7" fill="#f59e0b" stroke="#78350f" strokeWidth="2.5" />
      <text x="4" y="70" textAnchor="start" fontSize="19" fontWeight="bold" fill="#b91c1c">{lo}</text>
      <text x="146" y="70" textAnchor="end" fontSize="19" fontWeight="bold" fill="#b91c1c">{hi}</text>
    </svg>
  );
};

/** Párosító: számkártyák egy letakart (?) jeggyel. */
export const MiniHidden: React.FC<{ digits?: string[] }> = ({ digits = ['2', '?', '5'] }) => {
  const w = 34;
  const gap = 8;
  const x0 = (150 - (digits.length * w + (digits.length - 1) * gap)) / 2;
  return (
    <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      {digits.map((d, i) => {
        const q = d === '?';
        return (
          <g key={i}>
            <rect x={x0 + i * (w + gap)} y="12" width={w} height="56" rx="7" fill={q ? '#fee2e2' : '#fff'} stroke={q ? UNK : '#334155'} strokeWidth="3" />
            <text x={x0 + i * (w + gap) + w / 2} y="51" textAnchor="middle" fontSize="30" fontWeight="bold" fill={q ? UNK : '#0f172a'}>{d}</text>
          </g>
        );
      })}
    </svg>
  );
};

/** Csoportosító (80 × 80): rövid számegyenes két kerek százassal, középen az 50-es osztás, egy pont. */
export const SortLine: React.FC<{ lo?: number; v?: number }> = ({ lo = 700, v = 735 }) => {
  const x0 = 12;
  const x1 = 68;
  const X = (n: number) => x0 + ((x1 - x0) * (n - lo)) / 100;
  return (
    <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <line x1="4" y1="32" x2="76" y2="32" stroke="#334155" strokeWidth="3" />
      <line x1={x0} y1="20" x2={x0} y2="44" stroke="#334155" strokeWidth="3.5" />
      <line x1={x1} y1="20" x2={x1} y2="44" stroke="#334155" strokeWidth="3.5" />
      <line x1={X(lo + 50)} y1="25" x2={X(lo + 50)} y2="39" stroke="#334155" strokeWidth="2.5" />
      <circle cx={X(v)} cy="32" r="6.5" fill="#f59e0b" stroke="#78350f" strokeWidth="2.5" />
      <text x="1" y="66" textAnchor="start" fontSize="16" fontWeight="bold" fill="#b91c1c">{lo}</text>
      <text x="79" y="66" textAnchor="end" fontSize="16" fontWeight="bold" fill="#b91c1c">{lo + 100}</text>
    </svg>
  );
};
