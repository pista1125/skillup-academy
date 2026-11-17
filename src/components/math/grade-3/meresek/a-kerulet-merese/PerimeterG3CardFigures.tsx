import React from 'react';
import { FONT, GridShape, StickPolygon, PolyShape, regularPts, Cell, Pt } from './PerimeterG3Parts';

// Kis, vastag vonalas kártyaábrák a Párosító (150 × 80) és a Csoportosító (80 × 80) játékhoz.

/** Négyzetrácsos alakzat. cells: [oszlop, sor]. */
export const GridCard: React.FC<{ cells: Cell[]; small?: boolean }> = ({ cells, small = false }) => {
  const W = small ? 80 : 150;
  const maxC = Math.max(...cells.map((c) => c[0])) + 1;
  const maxR = Math.max(...cells.map((c) => c[1])) + 1;
  const cols = maxC + 2;
  const rows = maxR + 2;
  const s = Math.min((W - 6) / cols, 74 / rows, small ? 15 : 17);
  const x = (W - cols * s) / 2;
  const y = (80 - rows * s) / 2;
  return (
    <svg viewBox={`0 0 ${W} 80`} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <GridShape x={x} y={y} s={s} cols={cols} rows={rows} cells={cells.map(([c, r]) => [c + 1, r + 1] as Cell)} w={3.5} />
    </svg>
  );
};

/** Pálcikás szabályos sokszög. */
export const SticksCard: React.FC<{ n: number; small?: boolean }> = ({ n, small = false }) => {
  const W = small ? 80 : 150;
  const side = small ? 34 : 38;
  const r = side / (2 * Math.sin(Math.PI / n));
  const rot = n === 4 ? Math.PI / 4 : 0;
  const cy = n === 3 ? 46 : 40;
  return (
    <svg viewBox={`0 0 ${W} 80`} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <StickPolygon pts={regularPts(n, W / 2, cy, r, rot)} w={5} />
    </svg>
  );
};

/** Sokszög feliratozott oldalakkal (a pontok egy 150 × 80-as vagy 80 × 80-as dobozban). */
export const PolyCard: React.FC<{ pts: Pt[]; labels: (string | null)[]; small?: boolean; fontSize?: number }> = ({ pts, labels, small = false, fontSize }) => {
  const W = small ? 80 : 150;
  return (
    <svg viewBox={`0 0 ${W} 80`} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <PolyShape pts={pts} labels={labels} fontSize={fontSize ?? (small ? 13 : 15)} off={small ? 9 : 11} w={3.5} />
    </svg>
  );
};
