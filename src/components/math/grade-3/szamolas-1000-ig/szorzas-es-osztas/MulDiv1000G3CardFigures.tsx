import React from 'react';
import { FONT, Flat } from './MulDiv1000G3Parts';

// Kis, vastag vonalas ikonok a Párosító (150 × 80) és a Csoportosító (80 × 80) kártyáira.
// A rúdcsoport, a tányéros osztás, az érmerács, a zsák és az érmecsoport a V. fejezetből jön.
export { MiniRodGroups, MiniShare, MiniCoinGrid, SortBags, SortShare, SortCoinSet } from '../../szamolas-500-ig/szorzas-es-osztas/MulDiv500G3CardFigures';

/** Párosító: százas-lap csoportok keretben (egy lap = 100). groups ≤ 4, per ≤ 3. */
export const MiniFlatGroups: React.FC<{ groups?: number; per?: number }> = ({ groups = 3, per = 2 }) => {
  const s = Math.min(22, ((146 - (groups - 1) * 5) / groups - 5) / per - 3);
  const gw = per * (s + 3) - 3 + 8;
  const total = groups * gw + (groups - 1) * 5;
  const x0 = 75 - total / 2;
  return (
    <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      {Array.from({ length: groups }).map((_, g) => {
        const gx = x0 + g * (gw + 5);
        return (
          <g key={g}>
            <rect x={gx} y={40 - s / 2 - 6} width={gw} height={s + 12} rx="5" fill="#fef2f2" stroke="#dc2626" strokeWidth="2.4" />
            {Array.from({ length: per }).map((__, k) => (
              <Flat key={k} x={gx + 4 + k * (s + 3)} y={40 - s / 2} s={s} />
            ))}
          </g>
        );
      })}
    </svg>
  );
};
