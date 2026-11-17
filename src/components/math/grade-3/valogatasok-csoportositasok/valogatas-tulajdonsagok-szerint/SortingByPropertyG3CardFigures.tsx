import React from 'react';
import { FONT, Block, LogicBlock, Btn, SewButton } from './SortingByPropertyG3Parts';

// Kis, vastag vonalas kártyaábrák a Párosító (150 × 80) és a Csoportosító (80 × 80) játékhoz.

/** Egy logikai lap középen. */
export const BlockCard: React.FC<{ b: Block; small?: boolean }> = ({ b, small = false }) => {
  const W = small ? 80 : 150;
  return (
    <svg viewBox={`0 0 ${W} 80`} xmlns="http://www.w3.org/2000/svg">
      <LogicBlock b={b} x={W / 2} y={40} k={1.55} sw={3.5} />
    </svg>
  );
};

/** Néhány logikai lap egy csoportban (pl. „Mi a címkéje?”). */
export const BlockGroupCard: React.FC<{ blocks: Block[]; small?: boolean }> = ({ blocks, small = false }) => {
  const W = small ? 80 : 150;
  const n = blocks.length;
  const k = small ? (n > 2 ? 0.62 : 0.8) : n > 3 ? 0.75 : 0.9;
  const step = (W - 16) / n;
  return (
    <svg viewBox={`0 0 ${W} 80`} xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="6" width={W - 6} height="68" rx="12" fill="#f8fafc" stroke="#94a3b8" strokeWidth="3" />
      {blocks.map((b, i) => (
        <LogicBlock key={i} b={b} x={8 + step * (i + 0.5)} y={40} k={k} sw={3} />
      ))}
    </svg>
  );
};

/** Sor számozott lapokkal: „Melyik nem illik a sorba?” (párosító). */
export const BlockRowCard: React.FC<{ blocks: Block[] }> = ({ blocks }) => {
  const step = 150 / blocks.length;
  return (
    <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      {blocks.map((b, i) => (
        <g key={i}>
          <LogicBlock b={b} x={step * (i + 0.5)} y={34} k={0.68} sw={3} />
          <text x={step * (i + 0.5)} y={76} textAnchor="middle" fontSize="16" fontWeight="bold" fill="#0f172a">
            {i + 1}.
          </text>
        </g>
      ))}
    </svg>
  );
};

/** Egy varrógomb. */
export const ButtonCard: React.FC<{ b: Btn; small?: boolean; big?: boolean }> = ({ b, small = false, big = true }) => {
  const W = small ? 80 : 150;
  return (
    <svg viewBox={`0 0 ${W} 80`} xmlns="http://www.w3.org/2000/svg">
      <SewButton b={b} x={W / 2} y={40} r={big ? 30 : 20} sw={3.5} />
    </svg>
  );
};

/** Számsor kártyán (párosító): nagy számjegyek. */
export const NumberRowCard: React.FC<{ nums: number[] }> = ({ nums }) => {
  const step = 150 / nums.length;
  return (
    <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      {nums.map((n, i) => (
        <g key={i}>
          <rect x={step * i + 2} y="20" width={step - 4} height="40" rx="8" fill="#fff7ed" stroke="#ea580c" strokeWidth="3" />
          <text x={step * (i + 0.5)} y={String(n).length > 2 ? 46 : 48} textAnchor="middle" fontSize={String(n).length > 2 ? 15 : 22} fontWeight="bold" fill="#0f172a">
            {n}
          </text>
        </g>
      ))}
    </svg>
  );
};
