import React from 'react';
import { WrittenMulG3ColumnG, columnMulSize } from './WrittenMulG3Column';

// Kis kártyaképek a Párosítóhoz (≈150 × 80) és a Csoportosítóhoz (≈80 × 80).
const FONT = 'system-ui, Segoe UI, sans-serif';
const INK = '#0f172a';
const UNK = '#dc2626';

/** Párosító: írásbeli szorzás oszlopban, a keresett rész piros „?”. */
export const MulColCard: React.FC<{ a: number | string; m: number | string; result?: number | string }> = ({ a, m, result = '???' }) => {
  const p = { a, m, result, header: false, cell: 32 };
  const { w, h } = columnMulSize(p);
  return (
    <svg viewBox="0 0 150 80" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <WrittenMulG3ColumnG {...p} x={(150 - w) / 2} y={(80 - h) / 2} />
    </svg>
  );
};

/** Párosító: n darab, egy darab ára → ? Ft. */
export const PriceCard: React.FC<{ n: number; price: number }> = ({ n, price }) => (
  <svg viewBox="0 0 150 80" className="w-full h-full" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <path d="M 22 6 L 116 6 L 132 22 L 116 38 L 22 38 Z" fill="#fef3c7" stroke="#b45309" strokeWidth="3" />
    <circle cx="114" cy="22" r="3.5" fill="#b45309" />
    <text x="66" y="31" textAnchor="middle" fontSize="23" fontWeight="bold" fill={INK}>{price} Ft</text>
    <text x="60" y="72" textAnchor="middle" fontSize="25" fontWeight="bold" fill="#c2410c">{n} db =</text>
    <text x="120" y="72" textAnchor="middle" fontSize="27" fontWeight="bold" fill={UNK}>?</text>
  </svg>
);

/** Csoportosító: a szorzandó jegyei színes helyiérték-cellákban, alatta a szorzó. */
export const StripSmall: React.FC<{ a: number; m: number }> = ({ a, m }) => {
  const ds = String(a).padStart(3, ' ').split('');
  const fills = ['#fecaca', '#bfdbfe', '#fef08a'];
  const strokes = ['#dc2626', '#2563eb', '#ca8a04'];
  return (
    <svg viewBox="0 0 80 80" className="w-full h-full" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      {ds.map((d, i) => (
        <g key={i}>
          <rect x={4 + i * 24} y="6" width="24" height="34" fill={fills[i]} stroke={strokes[i]} strokeWidth="3" />
          <text x={16 + i * 24} y="32" textAnchor="middle" fontSize="23" fontWeight="bold" fill={INK}>{d.trim()}</text>
        </g>
      ))}
      <text x="40" y="70" textAnchor="middle" fontSize="25" fontWeight="bold" fill="#c2410c">· {m}</text>
    </svg>
  );
};
