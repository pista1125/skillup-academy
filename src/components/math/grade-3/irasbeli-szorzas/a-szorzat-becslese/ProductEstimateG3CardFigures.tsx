import React from 'react';
import { FONT } from '../szorzas-egyjegyu-szammal/MulOneDigitG3Parts';

// Kis kártyaképek a Párosító (150 × 80) és a Csoportosító (80 × 80) kártyáira.

/** Párosító: rövid számegyenes két kerek számmal, rajta a kerekítendő szám piros ponttal. */
export const CardRound: React.FC<{ v: number; to: 10 | 100 }> = ({ v, to }) => {
  const lo = Math.floor(v / to) * to;
  const hi = lo + to;
  const X = (t: number) => 22 + (106 * (t - lo)) / to;
  return (
    <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <line x1="12" y1="44" x2="138" y2="44" stroke="#334155" strokeWidth="3" />
      <line x1={X(lo)} y1="34" x2={X(lo)} y2="54" stroke="#334155" strokeWidth="3" />
      <line x1={X(hi)} y1="34" x2={X(hi)} y2="54" stroke="#334155" strokeWidth="3" />
      <line x1={X(lo + to / 2)} y1="37" x2={X(lo + to / 2)} y2="51" stroke="#7c3aed" strokeWidth="3" />
      <circle cx={X(v)} cy="44" r="6" fill="#dc2626" />
      <text x={X(v)} y="24" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#b91c1c">{v}</text>
      <text x={X(lo)} y="76" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#334155">{lo}</text>
      <text x={X(hi)} y="76" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#334155">{hi}</text>
    </svg>
  );
};

/** Párosító: árcédula az árral, mellette nagy „· m”. */
export const CardTag: React.FC<{ price: number; m: number }> = ({ price, m }) => (
  <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <path d="M 6 22 L 22 8 L 96 8 L 96 72 L 22 72 L 6 58 Z" fill="#fef3c7" stroke="#b45309" strokeWidth="3" strokeLinejoin="round" />
    <circle cx="19" cy="40" r="4" fill="#fff" stroke="#b45309" strokeWidth="2.5" />
    <text x="60" y="38" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#0f172a">{price}</text>
    <text x="60" y="62" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#92400e">Ft</text>
    <text x="124" y="50" textAnchor="middle" fontSize="26" fontWeight="bold" fill="#7c3aed">· {m}</text>
  </svg>
);

/** Csoportosító: árcédula egy számmal. */
export const SortTag: React.FC<{ v: number }> = ({ v }) => (
  <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <path d="M 4 26 L 16 14 L 76 14 L 76 66 L 16 66 L 4 54 Z" fill="#e0f2fe" stroke="#0369a1" strokeWidth="3" strokeLinejoin="round" />
    <circle cx="14" cy="40" r="3.5" fill="#fff" stroke="#0369a1" strokeWidth="2.5" />
    <text x="46" y="49" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#0f172a">{v}</text>
  </svg>
);

/** Csoportosító: árcédula az árral, alatta „· m”. */
export const SortTagMul: React.FC<{ v: number; m: number }> = ({ v, m }) => (
  <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <path d="M 4 14 L 14 4 L 76 4 L 76 42 L 14 42 L 4 32 Z" fill="#fef3c7" stroke="#b45309" strokeWidth="3" strokeLinejoin="round" />
    <circle cx="12" cy="23" r="3" fill="#fff" stroke="#b45309" strokeWidth="2" />
    <text x="44" y="32" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#0f172a">{v}</text>
    <text x="40" y="72" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#7c3aed">· {m}</text>
  </svg>
);
