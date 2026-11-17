import React from 'react';
import { RectGrid } from './RectAreaG3Parts';
import { PalName } from '../a-terulet-merese/AreaG3Parts';

// ---------------------------------------------------------------------------
// Kis kártyaképek a Párosítóhoz (≈150 × 80) és a Csoportosítóhoz (≈80 × 80).
// A téglalap kis négyzetekből; a 'partial' változatban csak az első sor és oszlop színes.
// ---------------------------------------------------------------------------

export const CardRect: React.FC<{ rows: number; cols: number; size?: 'm' | 's'; pal?: PalName; partial?: boolean }> = ({ rows, cols, size = 'm', pal = 'green', partial }) => {
  const W = size === 'm' ? 150 : 80;
  const H = 80;
  const s = Math.min(size === 'm' ? 22 : 20, (W - 10) / cols, (H - 10) / rows);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} xmlns="http://www.w3.org/2000/svg">
      <RectGrid rows={rows} cols={cols} x={(W - cols * s) / 2} y={(H - rows * s) / 2} s={s} pal={pal} mode={partial ? 'partial' : 'full'} outline={3.5} inner={1.6} />
    </svg>
  );
};
