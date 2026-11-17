import React from 'react';
import { FONT, INK, Coin } from './WrittenSubExamG3Parts';

// Kis, vastag vonalas ikonok a Párosító (150 × 80) és a Csoportosító (80 × 80) kártyáira.
// A kártyákon nincs eredmény – azt kell megtalálni.

const digitsOf = (n: number) => String(n).padStart(3, ' ').split('');

/** Párosító: írásbeli kivonás oszlopban, eredmény nélkül (nagy számjegyek). */
export const MiniCol: React.FC<{ m: number; s: number }> = ({ m, s }) => {
  const xs = [62, 86, 110];
  return (
    <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      {xs.map((x, i) => (
        <rect key={i} x={x - 12} y="4" width="24" height="68" fill={['#fee2e2', '#dbeafe', '#fef9c3'][i]} />
      ))}
      {digitsOf(m).map((d, i) => (
        <text key={`m${i}`} x={xs[i]} y="32" textAnchor="middle" fontSize="27" fontWeight="bold" fill={INK}>{d}</text>
      ))}
      <text x="32" y="64" textAnchor="middle" fontSize="28" fontWeight="bold" fill="#dc2626">−</text>
      {digitsOf(s).map((d, i) => (
        <text key={`s${i}`} x={xs[i]} y="64" textAnchor="middle" fontSize="27" fontWeight="bold" fill={INK}>{d}</text>
      ))}
      <line x1="20" y1="73" x2="126" y2="73" stroke={INK} strokeWidth="3.5" strokeLinecap="round" />
    </svg>
  );
};

/** Párosító: érmék egy sorban, az áthúzottakat elköltöttük. */
export const MiniCoins: React.FC<{ coins: number[]; crossed?: number[] }> = ({ coins, crossed = [] }) => {
  const step = Math.min(30, 140 / coins.length);
  const x0 = 75 - ((coins.length - 1) * step) / 2;
  return (
    <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      {coins.map((c, i) => (
        <Coin key={i} cx={x0 + i * step} cy={40} v={c} r={c >= 100 ? 15 : 13} crossed={crossed.includes(i)} />
      ))}
    </svg>
  );
};

/** Csoportosító: kivonás oszlopban, eredmény nélkül (80 × 80). */
export const SortCol: React.FC<{ m: number; s: number }> = ({ m, s }) => {
  const xs = [33, 51, 69];
  return (
    <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      {digitsOf(m).map((d, i) => (
        <text key={`m${i}`} x={xs[i]} y="32" textAnchor="middle" fontSize="25" fontWeight="bold" fill={INK}>{d}</text>
      ))}
      <text x="11" y="62" textAnchor="middle" fontSize="26" fontWeight="bold" fill="#dc2626">−</text>
      {digitsOf(s).map((d, i) => (
        <text key={`s${i}`} x={xs[i]} y="62" textAnchor="middle" fontSize="25" fontWeight="bold" fill={INK}>{d}</text>
      ))}
      <line x1="4" y1="72" x2="78" y2="72" stroke={INK} strokeWidth="3.5" strokeLinecap="round" />
    </svg>
  );
};
