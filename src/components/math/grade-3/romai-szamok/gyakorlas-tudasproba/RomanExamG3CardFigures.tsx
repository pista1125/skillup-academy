import React from 'react';

// ---------------------------------------------------------------------------
// Kis kártyaképek: tízesrudak és egyeskockák (Párosító 150 × 80, Csoportosító 80 × 80)
// ---------------------------------------------------------------------------

/** n = tízesrudak + egyeskockák. small: 80 × 80-as változat. */
export const MiniRodsCard: React.FC<{ n: number; small?: boolean }> = ({ n, small }) => {
  const W = small ? 80 : 150;
  const t = Math.floor(n / 10);
  const o = n % 10;
  const rw = small ? 5 : 8;
  const gap = small ? 2.5 : 4;
  const cs = small ? 8 : 11;
  const rodsW = t * rw + Math.max(0, t - 1) * gap;
  const cubeCols = o > 0 ? (o > 5 ? 2 : 1) : 0;
  const cubesW = cubeCols * cs + Math.max(0, cubeCols - 1) * 2;
  const total = rodsW + (t && o ? (small ? 6 : 12) : 0) + cubesW;
  const x0 = (W - total) / 2;
  const rodH = small ? 66 : 66;
  const y0 = 7;
  return (
    <svg viewBox={`0 0 ${W} 80`} xmlns="http://www.w3.org/2000/svg">
      {Array.from({ length: t }, (_, i) => (
        <g key={`r${i}`}>
          <rect x={x0 + i * (rw + gap)} y={y0} width={rw} height={rodH} rx="1.5" fill="#3b82f6" stroke="#1e3a8a" strokeWidth={small ? 1.5 : 2} />
          {Array.from({ length: 9 }, (_, j) => (
            <line key={j} x1={x0 + i * (rw + gap)} y1={y0 + ((j + 1) * rodH) / 10} x2={x0 + i * (rw + gap) + rw} y2={y0 + ((j + 1) * rodH) / 10} stroke="#1e3a8a" strokeWidth="0.8" />
          ))}
        </g>
      ))}
      {Array.from({ length: o }, (_, i) => {
        const col = cubeCols === 2 ? Math.floor(i / 5) : 0;
        const row = cubeCols === 2 ? i % 5 : i;
        const cx = x0 + rodsW + (t ? (small ? 6 : 12) : 0) + col * (cs + 2);
        const cy = y0 + rodH - (row + 1) * (cs + 2) + 2;
        return <rect key={`c${i}`} x={cx} y={cy} width={cs} height={cs} rx="1.5" fill="#fbbf24" stroke="#92400e" strokeWidth={small ? 1.5 : 2} />;
      })}
    </svg>
  );
};
