import React from 'react';
import { MULT10_FONT, MULT10_UNK, RodG, CoinG, EggBoxG, JumpLineG } from './Mult10G2Parts';

/** 150 × 80: n tízesrúd (max. 10). */
export const RodsCard150: React.FC<{ n: number }> = ({ n }) => {
  const gap = 13;
  const startX = 75 - ((n - 1) * gap) / 2 - 3.5;
  return (
    <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="4" width="144" height="72" rx="10" fill="#f0fdfa" stroke="#0f766e" strokeWidth="3" />
      {Array.from({ length: n }, (_, i) => (
        <RodG key={i} x={startX + i * gap} y={10} c={6} />
      ))}
    </svg>
  );
};

/** 150 × 80: n darab érme (max. 10, két sorban). */
export const CoinsCard150: React.FC<{ n: number; value?: number }> = ({ n, value = 10 }) => {
  const perRow = n > 5 ? Math.ceil(n / 2) : n;
  const rows = n > 5 ? 2 : 1;
  const r = rows === 2 ? 13 : 16;
  const gap = 2 * r + 3;
  const startX = 75 - ((perRow - 1) * gap) / 2;
  return (
    <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="4" width="144" height="72" rx="10" fill="#f8fafc" stroke="#334155" strokeWidth="3" />
      {Array.from({ length: n }, (_, i) => {
        const row = Math.floor(i / perRow);
        const c = i % perRow;
        const cy = rows === 2 ? 24 + row * 32 : 40;
        return <CoinG key={i} cx={startX + c * gap} cy={cy} r={r} value={value} />;
      })}
    </svg>
  );
};

/** 150 × 80: tízes ugrások a számegyenesen 0-tól, a vége „?” vagy a megadott szám. */
export const JumpCard150: React.FC<{ jumps: number; showEnd?: number }> = ({ jumps, showEnd }) => (
  <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg" fontFamily={MULT10_FONT}>
    <rect x="3" y="4" width="144" height="72" rx="10" fill="#f8fafc" stroke="#0d9488" strokeWidth="3" />
    <JumpLineG x0={10} y={46} width={120} jumps={jumps} endLabel={showEnd !== undefined ? String(showEnd) : '?'} labelEvery={50} fontSize={10} />
  </svg>
);

/** 150 × 80: n tojástartó (max. 8, két sorban). */
export const EggsCard150: React.FC<{ n: number }> = ({ n }) => {
  const perRow = n > 4 ? Math.ceil(n / 2) : n;
  const rows = n > 4 ? 2 : 1;
  const s = 0.52;
  const bw = 60 * s;
  const startX = 75 - (perRow * (bw + 3) - 3) / 2;
  return (
    <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="4" width="144" height="72" rx="10" fill="#fffbeb" stroke="#7c4a1e" strokeWidth="3" />
      {Array.from({ length: n }, (_, i) => (
        <EggBoxG
          key={i}
          x={startX + (i % perRow) * (bw + 3)}
          y={rows === 2 ? 16 + Math.floor(i / perRow) * 26 : 32}
          s={s}
        />
      ))}
    </svg>
  );
};

/** 150 × 80: „összeg = ? · tárgy” – hány darab kell? */
export const TargetCard150: React.FC<{ kind: 'coin' | 'egg' | 'rod'; total: number }> = ({ kind, total }) => (
  <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg" fontFamily={MULT10_FONT}>
    <rect x="3" y="4" width="144" height="72" rx="10" fill="#f8fafc" stroke="#334155" strokeWidth="3" />
    <text x="40" y="50" textAnchor="middle" fontSize={kind === 'coin' ? 20 : 24} fontWeight="900" fill="#0f172a">
      {kind === 'coin' ? `${total} Ft` : total}
    </text>
    <text x="80" y="50" textAnchor="middle" fontSize="20" fontWeight="900" fill="#0f172a">
      =
    </text>
    <text x="100" y="51" textAnchor="middle" fontSize="22" fontWeight="900" fill={MULT10_UNK}>
      ?
    </text>
    {kind === 'coin' && <CoinG cx={128} cy={42} r={14} value={10} />}
    {kind === 'egg' && <EggBoxG x={112} y={32} s={0.5} />}
    {kind === 'rod' && <RodG x={124} y={12} c={5.6} />}
  </svg>
);

/** 80 × 80: n tízesrúd. */
export const RodsCard80: React.FC<{ n: number }> = ({ n }) => {
  const gap = n > 6 ? 7.5 : 10;
  const c = n > 6 ? 5.5 : 6;
  const startX = 40 - ((n - 1) * gap) / 2 - c / 2;
  return (
    <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="74" height="74" rx="10" fill="#f0fdfa" stroke="#0f766e" strokeWidth="3" />
      {Array.from({ length: n }, (_, i) => (
        <RodG key={i} x={startX + i * gap} y={40 - c * 5} c={c} />
      ))}
    </svg>
  );
};

/** 80 × 80: n érme (max. 10). */
export const CoinsCard80: React.FC<{ n: number; value?: number }> = ({ n, value = 10 }) => {
  const perRow = n > 4 ? Math.ceil(n / (n > 6 ? 3 : 2)) : n > 2 ? 2 : n;
  const rows = Math.ceil(n / perRow);
  const r = rows >= 3 ? 9 : 11;
  const gap = 2 * r + 2;
  const startX = 40 - ((perRow - 1) * gap) / 2;
  const startY = 40 - ((rows - 1) * gap) / 2;
  return (
    <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="74" height="74" rx="10" fill="#f8fafc" stroke="#334155" strokeWidth="3" />
      {Array.from({ length: n }, (_, i) => (
        <CoinG key={i} cx={startX + (i % perRow) * gap} cy={startY + Math.floor(i / perRow) * gap} r={r} value={value} />
      ))}
    </svg>
  );
};

/** 80 × 80: n tojástartó (max. 8). */
export const EggsCard80: React.FC<{ n: number }> = ({ n }) => {
  const s = 0.5;
  const perCol = n > 4 ? Math.ceil(n / 2) : n;
  const cols = n > 4 ? 2 : 1;
  const bh = 30 * s;
  const startY = 40 - (perCol * (bh + 2) - 2) / 2;
  const colX = cols === 2 ? [9, 41] : [25];
  return (
    <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="74" height="74" rx="10" fill="#fffbeb" stroke="#7c4a1e" strokeWidth="3" />
      {Array.from({ length: n }, (_, i) => (
        <EggBoxG key={i} x={colX[Math.floor(i / perCol)]} y={startY + (i % perCol) * (bh + 2)} s={s} />
      ))}
    </svg>
  );
};

/** 80 × 80: számozott hordó. */
export const BarrelCard80: React.FC<{ n: number }> = ({ n }) => (
  <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" fontFamily={MULT10_FONT}>
    <rect x="3" y="3" width="74" height="74" rx="10" fill="#fefce8" stroke="#92400e" strokeWidth="3" />
    <path d="M 22 12 Q 14 40 22 68 L 58 68 Q 66 40 58 12 Z" fill="#d6a76c" stroke="#7c2d12" strokeWidth="2.5" />
    <line x1="18" y1="24" x2="62" y2="24" stroke="#7c2d12" strokeWidth="2.5" />
    <line x1="18" y1="56" x2="62" y2="56" stroke="#7c2d12" strokeWidth="2.5" />
    <text x="40" y="48" textAnchor="middle" fontSize="22" fontWeight="900" fill="#1c1917">
      {n}
    </text>
  </svg>
);
