import React from 'react';
import { N100_FONT, N100_COLORS, RodsPart, rodsWidth } from '../szamok-100-ig/Numbers100G2Parts';
import { RodsAddPart, rodsAddWidth } from './Add100G2Parts';

// ---------------------------------------------------------------------------
// Kártyaképek: Párosító (150 × 80), Csoportosító (80 × 80).
// Az összeget nem írják ki.
// ---------------------------------------------------------------------------

const Frame: React.FC<{ w: number; children: React.ReactNode }> = ({ w, children }) => (
  <svg viewBox={`0 0 ${w} 80`} xmlns="http://www.w3.org/2000/svg" fontFamily={N100_FONT}>
    <rect x="3" y="3" width={w - 6} height="74" rx="10" fill="#f8fafc" stroke="#334155" strokeWidth="3" />
    {children}
  </svg>
);

/** a + b rudakkal, 150 × 80. */
export const RodsAddCard150: React.FC<{ a: number; b: number }> = ({ a, b }) => {
  const u = 6;
  const w = rodsAddWidth(a, b, u);
  return (
    <Frame w={150}>
      <RodsAddPart x={75 - w / 2} y={10} a={a} b={b} u={u} strokeWidth={1.1} />
    </Frame>
  );
};

/** a fent, b lent (két sorban), 80 × 80. */
export const RodsAddCard80: React.FC<{ a: number; b: number }> = ({ a, b }) => {
  const u = 3.4;
  const wa = rodsWidth(Math.floor(a / 10), a % 10, u);
  const wb = rodsWidth(Math.floor(b / 10), b % 10, u);
  return (
    <Frame w={80}>
      <RodsPart x={40 - wa / 2} y={5} tens={Math.floor(a / 10)} ones={a % 10} u={u} strokeWidth={0.9} />
      <line x1="10" y1="40.5" x2="70" y2="40.5" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3 2" />
      <RodsPart
        x={40 - wb / 2}
        y={42}
        tens={Math.floor(b / 10)}
        ones={b % 10}
        u={u}
        strokeWidth={0.9}
        rodFill={N100_COLORS.rod2Fill}
        rodStroke={N100_COLORS.rod2Stroke}
        cubeFill={N100_COLORS.cube2Fill}
        cubeStroke={N100_COLORS.cube2Stroke}
      />
    </Frame>
  );
};

/** Ugrás a számegyenesen: start → +add → ? */
export const JumpCard: React.FC<{ start: number; add: number; small?: boolean; minus?: boolean }> = ({
  start,
  add,
  small,
  minus
}) => {
  const W = small ? 80 : 150;
  const end = minus ? start - add : start + add;
  const lo = Math.min(start, end);
  const hi = Math.max(start, end);
  const pad = Math.max(1, Math.round((hi - lo) * 0.15));
  const from = lo - pad;
  const to = hi + pad;
  const x0 = 10;
  const w = W - 20;
  const px = (v: number) => x0 + ((v - from) / (to - from)) * w;
  const y = small ? 50 : 50;
  const step = to - from > 20 ? 5 : 1;
  const ticks: number[] = [];
  for (let v = Math.ceil(from / step) * step; v <= to; v += step) ticks.push(v);
  const xs = px(start);
  const xe = px(end);
  const dir = xe > xs ? 1 : -1;
  return (
    <Frame w={W}>
      <line x1={x0 - 3} y1={y} x2={x0 + w + 3} y2={y} stroke="#1e293b" strokeWidth="2.5" />
      {ticks.map((v) => (
        <line key={v} x1={px(v)} y1={y - (v % 10 === 0 ? 6 : 3)} x2={px(v)} y2={y + (v % 10 === 0 ? 6 : 3)} stroke="#1e293b" strokeWidth={v % 10 === 0 ? 2.2 : 1.4} />
      ))}
      <path
        d={`M ${xs} ${y - 4} Q ${(xs + xe) / 2} ${y - 40} ${xe} ${y - 4}`}
        fill="none"
        stroke={minus ? '#e11d48' : '#16a34a'}
        strokeWidth="3"
      />
      <polygon points={`${xe},${y - 3} ${xe - dir * 9},${y - 9} ${xe - dir * 3},${y - 14}`} fill={minus ? '#e11d48' : '#16a34a'} />
      <text x={(xs + xe) / 2} y={y - 26} textAnchor="middle" fontSize={small ? 12 : 14} fontWeight="900" fill={minus ? '#be123c' : '#15803d'}>
        {minus ? '−' : '+'}{add}
      </text>
      <circle cx={xs} cy={y} r="4" fill="#7c3aed" />
      <text x={xs} y={y + 20} textAnchor="middle" fontSize={small ? 13 : 15} fontWeight="900" fill="#0f172a">
        {start}
      </text>
      <text x={xe} y={y + 20} textAnchor="middle" fontSize={small ? 13 : 15} fontWeight="900" fill="#dc2626">
        ?
      </text>
    </Frame>
  );
};
