import React from 'react';
import { Pie, Bar, Grid, DiagSquare } from './EqualPartsG3Parts';

// Kis, vastag vonalas kártyaábrák a Párosító (150 × 80) és a Csoportosító (80 × 80) játékhoz.

const Box: React.FC<{ small?: boolean; children: (W: number) => React.ReactNode }> = ({ small = false, children }) => {
  const W = small ? 80 : 150;
  return (
    <svg viewBox={`0 0 ${W} 80`} xmlns="http://www.w3.org/2000/svg">
      {children(W)}
    </svg>
  );
};

/** Kör / torta részekre vágva. */
export const PieCard: React.FC<{ bounds: number[]; colored?: boolean[]; color?: string; cake?: boolean; small?: boolean }> = ({ bounds, colored, color, cake, small }) => (
  <Box small={small}>{(W) => <Pie cx={W / 2} cy={40} r={33} bounds={bounds} colored={colored} color={color} cake={cake} base="#fde68a" sw={3} />}</Box>
);

/** Csík (csokiszelet, papírcsík) részekre vágva. */
export const BarCard: React.FC<{ cuts: number[]; colored?: boolean[]; color?: string; small?: boolean; vertical?: boolean }> = ({ cuts, colored, color, small, vertical }) => (
  <Box small={small}>
    {(W) =>
      vertical ? (
        <Bar x={W / 2 - 18} y={6} w={36} h={68} cuts={cuts} colored={colored} color={color} vertical base="#fde68a" sw={3} />
      ) : (
        <Bar x={8} y={small ? 24 : 20} w={W - 16} h={small ? 32 : 40} cuts={cuts} colored={colored} color={color} base="#fde68a" sw={3} />
      )
    }
  </Box>
);

/** Kinyitott, hajtogatott lap / rács. */
export const GridCard: React.FC<{ rows: number; cols: number; colored?: boolean[]; color?: string; small?: boolean; dashed?: boolean }> = ({ rows, cols, colored, color, small, dashed }) => (
  <Box small={small}>
    {(W) => {
      const w = small ? 68 : 110;
      const h = 64;
      return <Grid x={(W - w) / 2} y={8} w={w} h={h} rows={rows} cols={cols} colored={colored} color={color} sw={3} dashed={dashed} />;
    }}
  </Box>
);

/** Négyzet átlóival 4 részre. */
export const DiagCard: React.FC<{ colored?: boolean[]; small?: boolean }> = ({ colored, small }) => (
  <Box small={small}>{(W) => <DiagSquare x={W / 2 - 32} y={8} s={64} colored={colored} sw={3} />}</Box>
);
