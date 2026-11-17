import React from 'react';

// ---------------------------------------------------------------------------
// Kis kártyaképek a Párosító (150 × 80) és a Csoportosító (80 × 80) játékhoz
// ---------------------------------------------------------------------------

const ROD = '#3b82f6';
const ROD_LINE = '#1e3a8a';
const CUBE = '#facc15';
const CUBE_LINE = '#854d0e';

/**
 * Tízesrudak és egyeskockák. A kockák 5-ös oszlopokban állnak (alulról töltve).
 * onesFirst: a kockák a rudak ELŐTT vannak (sorrend-csapda).
 * small: 80 × 80-as csoportosító kártya.
 */
export const BlocksCard: React.FC<{ tens: number; ones: number; onesFirst?: boolean; small?: boolean }> = ({
  tens,
  ones,
  onesFirst,
  small
}) => {
  const W = small ? 80 : 150;
  const H = 80;
  const rodW = 9;
  const rodP = 12;
  const rodH = 60;
  const cube = 10;
  const cubeP = 12;
  const gap = tens > 0 && ones > 0 ? 10 : 0;
  const cols = Math.ceil(ones / 5);
  const rodsW = tens > 0 ? tens * rodP - (rodP - rodW) : 0;
  const cubesW = cols > 0 ? cols * cubeP - (cubeP - cube) : 0;
  const natW = rodsW + gap + cubesW;
  const s = Math.min((W - 8) / natW, (H - 12) / rodH, 1.15);
  const ox = (W - natW * s) / 2;
  const oy = (H - rodH * s) / 2;
  const rodsX = onesFirst ? cubesW + gap : 0;
  const cubesX = onesFirst ? 0 : rodsW + gap;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} xmlns="http://www.w3.org/2000/svg">
      <g transform={`translate(${ox} ${oy}) scale(${s})`}>
        {Array.from({ length: tens }, (_, i) => {
          const x = rodsX + i * rodP;
          return (
            <g key={`t${i}`}>
              <rect x={x} y={0} width={rodW} height={rodH} rx="1.5" fill={ROD} stroke={ROD_LINE} strokeWidth="2.2" />
              {Array.from({ length: 9 }, (_, k) => (
                <line key={k} x1={x} y1={(k + 1) * 6} x2={x + rodW} y2={(k + 1) * 6} stroke={ROD_LINE} strokeWidth="0.9" />
              ))}
            </g>
          );
        })}
        {Array.from({ length: ones }, (_, i) => {
          const c = Math.floor(i / 5);
          const r = i % 5;
          return (
            <rect
              key={`e${i}`}
              x={cubesX + c * cubeP}
              y={rodH - cube - r * cubeP}
              width={cube}
              height={cube}
              rx="1.5"
              fill={CUBE}
              stroke={CUBE_LINE}
              strokeWidth="2"
            />
          );
        })}
      </g>
    </svg>
  );
};
