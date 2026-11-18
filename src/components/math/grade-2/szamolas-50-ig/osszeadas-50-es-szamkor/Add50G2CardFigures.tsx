import React from 'react';
import { ADD50_FONT, TwoNumberBlocksPart, PyramidPart, BalancePart } from './Add50G2Parts';

// Kártyaképek: Párosító 150 × 80, Csoportosító 80 × 80. Nem írják ki a választ.

const Frame: React.FC<{ w: number; children: React.ReactNode }> = ({ w, children }) => (
  <svg viewBox={`0 0 ${w} 80`} xmlns="http://www.w3.org/2000/svg" fontFamily={ADD50_FONT}>
    <rect x="3" y="3" width={w - 6} height="74" rx="10" fill="#f8fafc" stroke="#334155" strokeWidth="3" />
    {children}
  </svg>
);

/** Két szám rudakkal és kockákkal. */
export const BlocksAddCard: React.FC<{ a: number; b: number; small?: boolean }> = ({ a, b, small }) => {
  const w = small ? 80 : 150;
  return (
    <Frame w={w}>
      <TwoNumberBlocksPart cx={w / 2} y={small ? 18 : 11} a={a} b={b} unit={small ? 4.4 : 5.8} gap={small ? 2 : 3} />
    </Frame>
  );
};

/**
 * Ugrás a számegyenesen. Csak a kezdőszám és az ugrás(ok) látszik, a vég „?”.
 */
export const JumpCard: React.FC<{ start: number; hops: number[]; small?: boolean }> = ({ start, hops, small }) => {
  const w = small ? 80 : 150;
  const total = hops.reduce((s, h) => s + h, 0);
  const from = start - 1;
  const to = start + total + 1;
  const x0 = 10;
  const width = w - 22;
  const u = width / (to - from);
  const px = (v: number) => x0 + (v - from) * u;
  const y = small ? 50 : 52;
  let cur = start;
  const colors = ['#16a34a', '#2563eb', '#7c3aed'];
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
        cur += h;
        const x1 = px(a);
        const x2 = px(cur);
        const mid = (x1 + x2) / 2;
        return (
          <g key={i}>
            <path d={`M ${x1} ${y - 3} Q ${mid} ${y - 40} ${x2} ${y - 3}`} fill="none" stroke={colors[i % 3]} strokeWidth="2.8" />
            <text x={mid} y={y - 25} textAnchor="middle" fontSize={small ? 12 : 14} fontWeight="900" fill={colors[i % 3]}>
              +{h}
            </text>
          </g>
        );
      })}
      <text x={px(start)} y={y + 21} textAnchor="middle" fontSize={small ? 13 : 15} fontWeight="900" fill="#6d28d9">
        {start}
      </text>
      <text x={px(start + total)} y={y + 21} textAnchor="middle" fontSize={small ? 14 : 16} fontWeight="900" fill="#dc2626">
        ?
      </text>
    </Frame>
  );
};

/** Számpiramis-kártya. */
export const PyramidCard: React.FC<{ left: string; right: string; top?: string; small?: boolean }> = ({
  left,
  right,
  top = '?',
  small
}) => {
  const w = small ? 80 : 150;
  return (
    <Frame w={w}>
      <PyramidPart
        cx={w / 2}
        y={small ? 10 : 8}
        left={left}
        right={right}
        top={top}
        bw={small ? 34 : 50}
        bh={small ? 30 : 32}
        fontSize={small ? 15 : 19}
      />
    </Frame>
  );
};

/** Mérleg-kártya (egyensúly). */
export const BalanceCard: React.FC<{ left: string; right: string; small?: boolean }> = ({ left, right, small }) => {
  const w = small ? 80 : 150;
  return (
    <Frame w={w}>
      {small ? (
        <g>
          <rect x="8" y="10" width="64" height="24" rx="6" fill="#dbeafe" stroke="#2563eb" strokeWidth="2" />
          <text x="40" y="28" textAnchor="middle" fontSize="15" fontWeight="900" fill="#1e3a8a">{left}</text>
          <text x="40" y="47" textAnchor="middle" fontSize="15" fontWeight="900" fill="#334155">=</text>
          <rect x="8" y="50" width="64" height="24" rx="6" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
          <text x="40" y="68" textAnchor="middle" fontSize="15" fontWeight="900" fill="#92400e">{right}</text>
        </g>
      ) : (
        <BalancePart cx={75} y={6} left={left} right={right} w={140} fontSize={16} />
      )}
    </Frame>
  );
};
