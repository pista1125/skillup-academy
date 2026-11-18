import React from 'react';
import { EX_FONT, EX_UNK, WindowFig, WindowAsk } from './Count100ExamG2Parts';

export { RodsCard150, RodsCard80, JumpCard, CoinsCard, ChainCard } from '../osszeadas-kivonas-kerek-tizesekkel/RoundTens100G2CardFigures';
export { BarCard150, BarCard80, CompareCard150, CompareCard80 } from '../szoveges-feladatok/WordProblems100G2CardFigures';

/** Számpiramis kártya (150 × 80, vagy 80 × 80 small). '' = üres tégla, '?' = kérdés. */
export const PyramidCard: React.FC<{ rows: string[][]; small?: boolean }> = ({ rows, small }) => {
  const W = small ? 80 : 150;
  const base = rows[rows.length - 1].length;
  const bw = Math.min(small ? 24 : 46, (W - 12) / base);
  const bh = Math.min(22, 66 / rows.length);
  const y0 = (80 - rows.length * bh) / 2;
  return (
    <svg viewBox={`0 0 ${W} 80`} xmlns="http://www.w3.org/2000/svg" fontFamily={EX_FONT}>
      <rect x="3" y="3" width={W - 6} height="74" rx="10" fill="#fff7ed" stroke="#334155" strokeWidth="3" />
      {rows.map((row, r) =>
        row.map((v, i) => {
          const x = W / 2 - (row.length * bw) / 2 + i * bw;
          const isQ = v === '?';
          return (
            <g key={`${r}-${i}`}>
              <rect x={x} y={y0 + r * bh} width={bw} height={bh} fill={isQ ? '#fee2e2' : '#ffedd5'} stroke="#b45309" strokeWidth="2" />
              <text x={x + bw / 2} y={y0 + r * bh + bh / 2 + 5} textAnchor="middle" fontSize={small ? 12 : 15} fontWeight="900" fill={isQ ? EX_UNK : '#78350f'}>
                {v}
              </text>
            </g>
          );
        })
      )}
    </svg>
  );
};

/** Százas tábla-részlet kártyán (80 × 80). */
export const WindowCard: React.FC<{ center: number; ask: WindowAsk }> = ({ center, ask }) => <WindowFig center={center} ask={ask} small />;
