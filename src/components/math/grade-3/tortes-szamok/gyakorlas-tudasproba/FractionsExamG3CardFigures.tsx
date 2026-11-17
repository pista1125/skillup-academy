import React from 'react';
import { FONT, Pie, Bar, Grid, ROD } from './FractionsExamG3Parts';

// Kis, vastag vonalas ikonok a Párosító (150 × 80) és a Csoportosító (80 × 80) kártyáira.

/** Párosító: kör n részre, k rész piros. */
export const CardPie: React.FC<{ n: number; k: number }> = ({ n, k }) => (
  <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <Pie cx={75} cy={40} r={35} n={n} k={k} sw={3} />
  </svg>
);

/** Párosító: csík n részre, k rész piros. */
export const CardBar: React.FC<{ n: number; k: number }> = ({ n, k }) => (
  <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <Bar x={8} y={20} w={134} h={40} n={n} k={k} sw={3} />
  </svg>
);

/** Párosító: fent az egész rúd, alatta egy rész-rúd (u = 13 egység / kocka). */
export const CardRod: React.FC<{ whole: number; part: number }> = ({ whole, part }) => {
  const u = Math.min(13, 134 / whole);
  return (
    <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x={8} y={10} width={whole * u} height={24} rx="3" fill={ROD[whole].color} stroke="#1e293b" strokeWidth="3" />
      <rect x={8} y={44} width={part * u} height={24} rx="3" fill={ROD[part].color} stroke="#1e293b" strokeWidth="3" />
      <text x={8 + part * u + 8} y={63} fontSize="22" fontWeight="bold" fill="#dc2626">?</text>
    </svg>
  );
};

/** Csoportosító: kör n részre, k rész piros (80 × 80). */
export const SmallPie: React.FC<{ n: number; k: number; color?: string }> = ({ n, k, color }) => (
  <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <Pie cx={40} cy={40} r={34} n={n} k={k} sw={3} color={color} />
  </svg>
);

/** Csoportosító: csík n részre, k rész piros (80 × 80). */
export const SmallBar: React.FC<{ n: number; k: number; vertical?: boolean; color?: string }> = ({ n, k, vertical, color }) => (
  <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    {vertical ? <Bar x={22} y={4} w={36} h={72} n={n} k={k} vertical sw={3} color={color} /> : <Bar x={4} y={22} w={72} h={36} n={n} k={k} sw={3} color={color} />}
  </svg>
);

/** Csoportosító: rács rows × cols, k cella piros (80 × 80). */
export const SmallGrid: React.FC<{ rows: number; cols: number; k: number }> = ({ rows, cols, k }) => (
  <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <Grid x={8} y={8} w={64} h={64} rows={rows} cols={cols} k={k} sw={3} />
  </svg>
);
