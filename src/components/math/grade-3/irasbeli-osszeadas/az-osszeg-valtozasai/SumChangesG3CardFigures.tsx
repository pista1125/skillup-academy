import React from 'react';
import { FONT, INK, UNK, signed, changeColor } from './SumChangesG3Parts';

// Kis, vastag vonalas ikonok a Párosító (150 × 80) és a Csoportosító (80 × 80) kártyáira.

/** Párosító: az összeg csíkja + a változás (zöld darab = nő, piros szaggatott = csökken). */
export const MiniGrow: React.FC<{ sum?: number; d?: number }> = ({ sum = 370, d = 10 }) => {
  const up = d > 0;
  return (
    <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x="5" y="22" width={up ? 88 : 140} height="40" rx="4" fill="#bbf7d0" stroke="#15803d" strokeWidth="3" />
      <text x={up ? 49 : 50} y="50" textAnchor="middle" fontSize="23" fontWeight="bold" fill={INK}>{sum}</text>
      {up ? (
        <g>
          <rect x="96" y="22" width="50" height="40" rx="4" fill="#22c55e" stroke="#15803d" strokeWidth="3" />
          <text x="121" y="49" textAnchor="middle" fontSize={String(d).length > 2 ? 16.5 : 20} fontWeight="bold" fill="#fff">{signed(d)}</text>
        </g>
      ) : (
        <g>
          <rect x="96" y="22" width="49" height="40" rx="4" fill="#fff1f2" stroke="#e11d48" strokeWidth="3" strokeDasharray="6 4" />
          <text x="120.5" y="49" textAnchor="middle" fontSize={String(-d).length > 2 ? 16.5 : 20} fontWeight="bold" fill="#e11d48">{signed(d)}</text>
        </g>
      )}
    </svg>
  );
};

/** Párosító: a két tag változása két dobozban (kék = 1. tag, sárga = 2. tag). */
export const MiniTwoChanges: React.FC<{ a?: number; b?: number }> = ({ a = 10, b = -10 }) => (
  <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="4" y="16" width="62" height="48" rx="10" fill="#dbeafe" stroke="#2563eb" strokeWidth="3" />
    <text x="35" y="48" textAnchor="middle" fontSize={signed(a).length > 3 ? 20 : 23} fontWeight="bold" fill={changeColor(a)}>{signed(a)}</text>
    <text x="75" y="49" textAnchor="middle" fontSize="20" fontWeight="bold" fill={INK}>+</text>
    <rect x="84" y="16" width="62" height="48" rx="10" fill="#fef9c3" stroke="#ca8a04" strokeWidth="3" />
    <text x="115" y="48" textAnchor="middle" fontSize={signed(b).length > 3 ? 20 : 23} fontWeight="bold" fill={changeColor(b)}>{signed(b)}</text>
  </svg>
);

/** Párosító: okos számolás – a két tag, a nyíl mutatja, hogy a 2. tagból átteszünk az 1.-be. */
export const MiniMove: React.FC<{ a?: number; b?: number; k?: number }> = ({ a = 198, b = 147, k = 2 }) => (
  <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <path d="M 114 42 Q 75 2 36 42" fill="none" stroke="#7c3aed" strokeWidth="3" />
    <path d="M 36 31 L 36 42 L 46 38" fill="none" stroke="#7c3aed" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
    <text x="75" y="16" textAnchor="middle" fontSize="17" fontWeight="bold" fill="#7c3aed">{k}</text>
    <rect x="4" y="44" width="60" height="32" rx="8" fill="#dbeafe" stroke="#2563eb" strokeWidth="3" />
    <text x="34" y="68" textAnchor="middle" fontSize="22" fontWeight="bold" fill={INK}>{a}</text>
    <text x="75" y="68" textAnchor="middle" fontSize="20" fontWeight="bold" fill={INK}>+</text>
    <rect x="86" y="44" width="60" height="32" rx="8" fill="#fef9c3" stroke="#ca8a04" strokeWidth="3" />
    <text x="116" y="68" textAnchor="middle" fontSize="22" fontWeight="bold" fill={INK}>{b}</text>
  </svg>
);

/** Csoportosító: a két tag változása egymás alatt (kék = 1. tag, sárga = 2. tag). */
export const SortChange: React.FC<{ a?: number; b?: number }> = ({ a = 10, b = 0 }) => (
  <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="5" y="4" width="70" height="34" rx="9" fill="#dbeafe" stroke="#2563eb" strokeWidth="3" />
    <text x="40" y="30" textAnchor="middle" fontSize={signed(a).length > 3 ? 20 : 23} fontWeight="bold" fill={changeColor(a)}>{signed(a)}</text>
    <rect x="5" y="42" width="70" height="34" rx="9" fill="#fef9c3" stroke="#ca8a04" strokeWidth="3" />
    <text x="40" y="68" textAnchor="middle" fontSize={signed(b).length > 3 ? 20 : 23} fontWeight="bold" fill={changeColor(b)}>{signed(b)}</text>
  </svg>
);

/** Csoportosító: felcserélt tagok (két doboz, kereszteződő nyilak). */
export const SortSwap: React.FC = () => (
  <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="4" y="6" width="30" height="26" rx="6" fill="#dbeafe" stroke="#2563eb" strokeWidth="3" />
    <rect x="46" y="6" width="30" height="26" rx="6" fill="#fef9c3" stroke="#ca8a04" strokeWidth="3" />
    <rect x="4" y="50" width="30" height="26" rx="6" fill="#fef9c3" stroke="#ca8a04" strokeWidth="3" />
    <rect x="46" y="50" width="30" height="26" rx="6" fill="#dbeafe" stroke="#2563eb" strokeWidth="3" />
    <path d="M 22 34 L 56 48" stroke={UNK} strokeWidth="3" strokeLinecap="round" />
    <path d="M 58 34 L 24 48" stroke={UNK} strokeWidth="3" strokeLinecap="round" />
  </svg>
);
