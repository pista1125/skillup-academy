import React from 'react';
import { SUB50_FONT, TakeBlocksPart, takeBlocksWidth } from './Sub50G2Parts';

// Kártyaképek: Párosító 150 × 80, Csoportosító 80 × 80. Nem írják ki a választ.

const Frame: React.FC<{ w: number; children: React.ReactNode }> = ({ w, children }) => (
  <svg viewBox={`0 0 ${w} 80`} xmlns="http://www.w3.org/2000/svg" fontFamily={SUB50_FONT}>
    <rect x="3" y="3" width={w - 6} height="74" rx="10" fill="#f8fafc" stroke="#334155" strokeWidth="3" />
    {children}
  </svg>
);

/** Rudak és kockák, az elvett rész áthúzva. */
export const TakeCard: React.FC<{
  a: number;
  takeOnes?: number;
  takeTens?: number;
  breakRod?: boolean;
  small?: boolean;
}> = ({ a, takeOnes = 0, takeTens = 0, breakRod = false, small }) => {
  const w = small ? 80 : 150;
  const unit = small ? 5 : 6;
  const gap = small ? 2.5 : 4;
  const width = takeBlocksWidth(a, breakRod, unit, gap);
  return (
    <Frame w={w}>
      <TakeBlocksPart
        x={(w - width) / 2}
        y={small ? 14 : 10}
        a={a}
        takeOnes={takeOnes}
        takeTens={takeTens}
        breakRod={breakRod}
        unit={unit}
        gap={gap}
      />
    </Frame>
  );
};

/** Visszaugrás a számegyenesen; csak a kezdőszám és az ugrások látszanak, a vég „?”. */
export const BackJumpCard: React.FC<{ start: number; hops: number[]; small?: boolean }> = ({ start, hops, small }) => {
  const w = small ? 80 : 150;
  const total = hops.reduce((s, h) => s + h, 0);
  const from = start - total - 1;
  const to = start + 1;
  const x0 = 10;
  const width = w - 22;
  const u = width / (to - from);
  const px = (v: number) => x0 + (v - from) * u;
  const y = 52;
  const colors = ['#16a34a', '#2563eb', '#7c3aed'];
  let cur = start;
  return (
    <Frame w={w}>
      <line x1={x0 - 3} y1={y} x2={x0 + width + 5} y2={y} stroke="#1e293b" strokeWidth="2.5" />
      {Array.from({ length: to - from + 1 }, (_, k) => (
        <line
          key={k}
          x1={px(from + k)}
          y1={y - ((from + k) % 10 === 0 ? 7 : 3)}
          x2={px(from + k)}
          y2={y + ((from + k) % 10 === 0 ? 7 : 3)}
          stroke="#1e293b"
          strokeWidth={(from + k) % 10 === 0 ? 2.5 : 1.2}
        />
      ))}
      {hops.map((h, i) => {
        const a = cur;
        cur -= h;
        const x1 = px(a);
        const x2 = px(cur);
        const mid = (x1 + x2) / 2;
        return (
          <g key={i}>
            <path d={`M ${x1} ${y - 3} Q ${mid} ${y - 40} ${x2} ${y - 3}`} fill="none" stroke={colors[i % 3]} strokeWidth="2.8" />
            <text x={mid} y={y - 25} textAnchor="middle" fontSize={small ? 12 : 14} fontWeight="900" fill={colors[i % 3]}>
              −{h}
            </text>
          </g>
        );
      })}
      <text x={px(start)} y={y + 21} textAnchor="middle" fontSize={small ? 13 : 15} fontWeight="900" fill="#6d28d9">
        {start}
      </text>
      <text x={px(start - total)} y={y + 21} textAnchor="middle" fontSize={small ? 14 : 16} fontWeight="900" fill="#dc2626">
        ?
      </text>
    </Frame>
  );
};
