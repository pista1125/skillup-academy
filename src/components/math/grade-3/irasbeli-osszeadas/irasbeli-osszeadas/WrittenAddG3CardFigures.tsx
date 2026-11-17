import React from 'react';
import { WrittenAddG3ColumnG, columnAddSize } from './WrittenAddG3Column';

// Kis kártyaképek a Párosító (150 × 80) és a Csoportosító (80 × 80) kártyáira.

/** Párosító: két tag egymás alatt, vonallal (az összeg a másik kártyán van). '?' = keresett jegy. */
export const MiniCol: React.FC<{ a: number | string; b: number | string }> = ({ a, b }) => {
  const p = { addends: [a, b], noResult: true, header: false, cell: 32 };
  const { w, h } = columnAddSize(p);
  return (
    <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg">
      <WrittenAddG3ColumnG {...p} x={(150 - w) / 2} y={(80 - h) / 2} />
    </svg>
  );
};

/** Csoportosító: kis írásbeli összeadás (eredménnyel vagy anélkül). */
export const SortCol: React.FC<{ a: number | string; b: number | string; s?: number | string }> = ({ a, b, s }) => {
  const p = { addends: [a, b], result: s, noResult: s === undefined, header: false, cell: s === undefined ? 22 : 20 };
  const { w, h } = columnAddSize(p);
  const W = Math.max(80, w + 4);
  const H = Math.max(80, h + 4);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} xmlns="http://www.w3.org/2000/svg">
      <WrittenAddG3ColumnG {...p} x={(W - w) / 2} y={(H - h) / 2} />
    </svg>
  );
};
