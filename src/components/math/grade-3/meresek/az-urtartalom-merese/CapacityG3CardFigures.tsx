import React from 'react';
import { FONT, UNK, Ico, JugIcon, BottleIcon } from '../mit-mivel-merunk/WhatToMeasureG3Parts';

export { IconCard, BottlesGlassesCard } from '../mit-mivel-merunk/WhatToMeasureG3CardFigures';

// Kis, vastag vonalas kártyaábrák a Párosító (150 × 80) és a Csoportosító (80 × 80) játékhoz.

/** Mérőkancsó 10 vonallal (1 vonal = 1 dl). q: „?” a szinttől a tetejéig. */
export const JugCard: React.FC<{ dl: number; small?: boolean; q?: boolean }> = ({ dl, small = false, q = false }) => {
  const W = small ? 80 : 150;
  const s = 0.76;
  const x = (W - 100 * s) / 2 - (q ? 10 : 0);
  const y = 2;
  // JugIcon: alja 94, a 10. vonal 94 − 74 = 20 belső koordinátában
  const yy = (v: number) => y + (94 - (v / 10) * 74) * s;
  return (
    <svg viewBox={`0 0 ${W} 80`} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <Ico x={x} y={y} s={s}>
        <JugIcon sw={4} fill={dl} showTop />
      </Ico>
      {q && (
        <g>
          <path d={`M${x + 96 * s} ${yy(10)} L${x + 102 * s} ${yy(10)} L${x + 102 * s} ${yy(dl)} L${x + 96 * s} ${yy(dl)}`} fill="none" stroke={UNK} strokeWidth="2.5" />
          <text x={x + 108 * s} y={(yy(10) + yy(dl)) / 2 + 8} fontSize="22" fontWeight="bold" fill={UNK}>?</text>
        </g>
      )}
    </svg>
  );
};

/** Két palack felirattal alattuk (csoportosító, 80 × 80). */
export const TwoBottlesCard: React.FC<{ a: string; b: string }> = ({ a, b }) => (
  <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    {[a, b].map((t, i) => (
      <g key={i}>
        <Ico x={i * 40 - 10} y={0} s={0.6}>
          <BottleIcon sw={5} color={i ? '#fecaca' : '#bae6fd'} />
        </Ico>
        <text x={20 + i * 40} y="76" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#0f172a">{t}</text>
      </g>
    ))}
  </svg>
);
