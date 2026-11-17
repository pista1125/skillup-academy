import React from 'react';
import { FONT, PLACE_BODY, PLACE_FILL } from '../haromjegyu-szamok-kivonasa/ThreeDigitSubG3Parts';

// Kis, vastag vonalas ikonok a Párosító (150 × 80) és a Csoportosító (80 × 80) kártyáira.

/** Párosító: a szám egy számegyenes-darabon a két szomszédos kerek szám között (step = 100 vagy 10). */
export const MiniRound: React.FC<{ n: number; step: 10 | 100 }> = ({ n, step }) => {
  const lo = Math.floor(n / step) * step;
  const hi = lo + step;
  const X = (v: number) => 18 + ((v - lo) * 114) / step;
  return (
    <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <line x1="10" y1="48" x2="140" y2="48" stroke="#334155" strokeWidth="3" />
      <line x1={X(lo)} y1="38" x2={X(lo)} y2="58" stroke="#334155" strokeWidth="3" />
      <line x1={X(hi)} y1="38" x2={X(hi)} y2="58" stroke="#334155" strokeWidth="3" />
      <line x1={X(lo + step / 2)} y1="42" x2={X(lo + step / 2)} y2="54" stroke="#f59e0b" strokeWidth="3" />
      <text x={X(lo)} y="77" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#475569">{lo}</text>
      <text x={X(hi)} y="77" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#475569">{hi}</text>
      <circle cx={X(n)} cy="48" r="6" fill="#dc2626" />
      <text x={X(n)} y="28" textAnchor="middle" fontSize="23" fontWeight="bold" fill="#dc2626">{n}</text>
    </svg>
  );
};

/** Párosító: két árcédula kivonásjellel. */
export const MiniTwoTags: React.FC<{ a: number; b: number }> = ({ a, b }) => (
  <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="4" y="22" width="60" height="36" rx="7" fill="#fef3c7" stroke="#d97706" strokeWidth="3" />
    <text x="34" y="49" textAnchor="middle" fontSize="23" fontWeight="bold" fill="#78350f">{a}</text>
    <text x="75" y="48" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#dc2626">−</text>
    <rect x="86" y="22" width="60" height="36" rx="7" fill="#e0f2fe" stroke="#0284c7" strokeWidth="3" />
    <text x="116" y="49" textAnchor="middle" fontSize="23" fontWeight="bold" fill="#0c4a6e">{b}</text>
  </svg>
);

/** Csoportosító: a szám egy százas-szakaszon (pl. 200 és 300 között), ponttal jelölve. */
export const SortRound: React.FC<{ n: number }> = ({ n }) => {
  const lo = Math.floor(n / 100) * 100;
  const X = (v: number) => 17 + ((v - lo) * 46) / 100;
  return (
    <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <text x="40" y="28" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#dc2626">{n}</text>
      <line x1="4" y1="50" x2="76" y2="50" stroke="#334155" strokeWidth="3" />
      <line x1={X(lo)} y1="42" x2={X(lo)} y2="58" stroke="#334155" strokeWidth="3" />
      <line x1={X(lo + 100)} y1="42" x2={X(lo + 100)} y2="58" stroke="#334155" strokeWidth="3" />
      <line x1={X(lo + 50)} y1="45" x2={X(lo + 50)} y2="55" stroke="#f59e0b" strokeWidth="3" />
      <circle cx={X(n)} cy="50" r="5.5" fill="#dc2626" />
      <text x={X(lo)} y="76" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#475569">{lo}</text>
      <text x={X(lo + 100)} y="76" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#475569">{lo + 100}</text>
    </svg>
  );
};

/** Csoportosító: elvégzett kivonás oszlopban (kisebbítendő, kivonandó, eredmény) – jó lehet-e? */
export const SortCheck: React.FC<{ a: number; b: number; r: number }> = ({ a, b, r }) => {
  const rows = [a, b, r].map((v) => String(v).padStart(3, ' ').split(''));
  const cw = 21;
  const x0 = 15;
  return (
    <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={x0 + i * cw} y="1" width={cw} height="5" fill={PLACE_FILL[i]} />
          <rect x={x0 + i * cw} y="6" width={cw} height="73" fill={PLACE_BODY[i]} />
          {rows.map((row, k) => (
            <text key={k} x={x0 + i * cw + cw / 2} y={26 + k * 24 + (k === 2 ? 2 : 0)} textAnchor="middle" fontSize="21" fontWeight="bold" fill={k === 2 ? '#1d4ed8' : '#0f172a'}>{row[i].trim()}</text>
          ))}
        </g>
      ))}
      <text x="8" y="49" textAnchor="middle" fontSize="19" fontWeight="bold" fill="#dc2626">−</text>
      <line x1="2" y1="56" x2="78" y2="56" stroke="#0f172a" strokeWidth="3" />
    </svg>
  );
};
