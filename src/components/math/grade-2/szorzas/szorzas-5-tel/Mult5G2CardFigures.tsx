import React from 'react';
import { MULT5_FONT, MULT5_UNK, HandG, CoinG, JumpLineG } from './Mult5G2Parts';

/** 150 × 80: n kéz (max. 10, két sorban). */
export const HandsCard150: React.FC<{ n: number }> = ({ n }) => {
  const perRow = n > 5 ? Math.ceil(n / 2) : n;
  const rows = n > 5 ? 2 : 1;
  const s = Math.min(rows === 2 ? 1.0 : 1.7, 132 / (perRow * 27));
  const w = 27 * s;
  const startX = 75 - (perRow * w) / 2;
  return (
    <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="4" width="144" height="72" rx="10" fill="#fffbeb" stroke="#c2410c" strokeWidth="3" />
      {Array.from({ length: n }, (_, i) => {
        const r = Math.floor(i / perRow);
        const c = i % perRow;
        const y = rows === 2 ? 10 + r * 32 : 40 - 14 * s;
        return <HandG key={i} x={startX + c * w + 2} y={y} s={s} />;
      })}
    </svg>
  );
};

/** 150 × 80: n darab érme (max. 10, két sorban). */
export const CoinsCard150: React.FC<{ n: number; value?: number }> = ({ n, value = 5 }) => {
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

/** 150 × 80: n darab 5-ös ugrás a számegyenesen, a vége „?”. */
export const JumpCard150: React.FC<{ jumps: number; showEnd?: number }> = ({ jumps, showEnd }) => (
  <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg" fontFamily={MULT5_FONT}>
    <rect x="3" y="4" width="144" height="72" rx="10" fill="#f8fafc" stroke="#334155" strokeWidth="3" />
    <JumpLineG x0={12} y={48} width={118} jumps={jumps} color="#ea580c" labelEvery={50} endLabel={showEnd ? undefined : '?'} fontSize={11} />
    {showEnd !== undefined && (
      <text x={12 + (showEnd / 50) * 118} y={70} textAnchor="middle" fontSize="13" fontWeight="900" fill="#1d4ed8">
        {showEnd}
      </text>
    )}
  </svg>
);

/** 150 × 80: „? darab kéz/érme = összeg” – hiányzó tényező képpel. */
export const TargetCard150: React.FC<{ kind: 'hand' | 'coin'; total: number }> = ({ kind, total }) => (
  <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg" fontFamily={MULT5_FONT}>
    <rect x="3" y="4" width="144" height="72" rx="10" fill="#f5f3ff" stroke="#6d28d9" strokeWidth="3" />
    {kind === 'hand' ? <HandG x={10} y={20} s={1.5} /> : <CoinG cx={30} cy={40} r={18} value={5} />}
    <text x="68" y="50" textAnchor="middle" fontSize="20" fontWeight="900" fill="#334155">· </text>
    <text x="80" y="50" textAnchor="middle" fontSize="24" fontWeight="900" fill={MULT5_UNK}>?</text>
    <text x="118" y="50" textAnchor="middle" fontSize="20" fontWeight="900" fill="#0f172a">
      = {total}
    </text>
    <text x="118" y="68" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#475569">
      {kind === 'hand' ? 'ujj' : 'Ft'}
    </text>
  </svg>
);

/** 80 × 80: n kéz (max. 6). */
export const HandsCard80: React.FC<{ n: number }> = ({ n }) => {
  const perRow = n > 3 ? Math.ceil(n / 2) : n;
  const rows = n > 3 ? 2 : 1;
  const s = 0.85;
  const w = 23;
  const startX = 40 - (perRow * w) / 2;
  return (
    <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="74" height="74" rx="10" fill="#fffbeb" stroke="#c2410c" strokeWidth="3" />
      {Array.from({ length: n }, (_, i) => {
        const r = Math.floor(i / perRow);
        const c = i % perRow;
        const y = rows === 2 ? 10 + r * 32 : 26;
        return <HandG key={i} x={startX + c * w} y={y} s={s} />;
      })}
    </svg>
  );
};

/** 80 × 80: n darab érme (max. 6). */
export const CoinsCard80: React.FC<{ n: number; value?: number }> = ({ n, value = 5 }) => {
  const perRow = n > 3 ? Math.ceil(n / 2) : n;
  const rows = n > 3 ? 2 : 1;
  const r = 10.5;
  const gap = 23;
  const startX = 40 - ((perRow - 1) * gap) / 2;
  return (
    <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="74" height="74" rx="10" fill="#f8fafc" stroke="#334155" strokeWidth="3" />
      {Array.from({ length: n }, (_, i) => {
        const row = Math.floor(i / perRow);
        const c = i % perRow;
        const cy = rows === 2 ? 27 + row * 26 : 40;
        return <CoinG key={i} cx={startX + c * gap} cy={cy} r={r} value={value} />;
      })}
    </svg>
  );
};

/** 80 × 80: hordó egy számmal. */
export const BarrelCard80: React.FC<{ n: number }> = ({ n }) => (
  <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" fontFamily={MULT5_FONT}>
    <path d="M 18 8 Q 10 40 18 72 L 62 72 Q 70 40 62 8 Z" fill="#fde68a" stroke="#92400e" strokeWidth="3" />
    <line x1="14" y1="22" x2="66" y2="22" stroke="#92400e" strokeWidth="3" />
    <line x1="14" y1="58" x2="66" y2="58" stroke="#92400e" strokeWidth="3" />
    <text x="40" y="49" textAnchor="middle" fontSize="24" fontWeight="900" fill="#451a03">
      {n}
    </text>
  </svg>
);

/** 80 × 80: „? kéz/érme = összeg”. */
export const TargetCard80: React.FC<{ kind: 'hand' | 'coin'; total: number }> = ({ kind, total }) => (
  <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" fontFamily={MULT5_FONT}>
    <rect x="3" y="3" width="74" height="74" rx="10" fill="#f5f3ff" stroke="#6d28d9" strokeWidth="3" />
    {kind === 'hand' ? <HandG x={8} y={8} s={1.1} /> : <CoinG cx={22} cy={23} r={13} value={5} />}
    <text x="56" y="32" textAnchor="middle" fontSize="20" fontWeight="900" fill={MULT5_UNK}>
      · ?
    </text>
    <text x="40" y="64" textAnchor="middle" fontSize="20" fontWeight="900" fill="#0f172a">
      = {total}
    </text>
  </svg>
);
