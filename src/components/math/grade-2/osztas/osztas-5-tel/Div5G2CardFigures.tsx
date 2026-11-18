import React from 'react';
import { DIV5_FONT, DIV5_UNK, GroupedDotsG, PlateG } from './Div5G2Parts';

export { TargetCard150, TargetCard80 } from '../../szorzas/szorzas-5-tel/Mult5G2CardFigures';

/** 150 × 80: `total` pötty ötösével csoportosítva (max. 50). */
export const GroupDotsCard150: React.FC<{ total: number }> = ({ total }) => {
  const slots = Math.ceil(total / 5);
  const rows = slots > 5 ? 2 : 1;
  return (
    <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="4" width="144" height="72" rx="10" fill="#f8fafc" stroke="#334155" strokeWidth="3" />
      <GroupedDotsG x={6} y={rows === 2 ? 7 : 22} total={total} cols={5} cellW={27.6} cellH={33} d={7} r={3} />
    </svg>
  );
};

/** 150 × 80: 5 tányér, mindegyiken „?”, fent az összes darabszám. */
export const PlatesCard150: React.FC<{ total: number }> = ({ total }) => (
  <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg" fontFamily={DIV5_FONT}>
    <rect x="3" y="4" width="144" height="72" rx="10" fill="#f0f9ff" stroke="#0369a1" strokeWidth="3" />
    <text x="75" y="30" textAnchor="middle" fontSize="20" fontWeight="900" fill="#78350f">
      {total} keksz
    </text>
    {Array.from({ length: 5 }, (_, i) => (
      <g key={i}>
        <PlateG cx={21 + i * 27} cy={56} rx={12} ry={6} />
        <text x={21 + i * 27} y={50} textAnchor="middle" fontSize="13" fontWeight="900" fill={DIV5_UNK}>?</text>
      </g>
    ))}
  </svg>
);

/** 150 × 80: „ötöde” nyíl: szám → ? */
export const FifthCard150: React.FC<{ from: number }> = ({ from }) => (
  <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg" fontFamily={DIV5_FONT}>
    <rect x="3" y="4" width="144" height="72" rx="10" fill="#fef2f2" stroke="#b91c1c" strokeWidth="3" />
    <circle cx="34" cy="46" r="18" fill="#dbeafe" stroke="#2563eb" strokeWidth="3" />
    <text x="34" y="53" textAnchor="middle" fontSize="18" fontWeight="900" fill="#1e3a8a">{from}</text>
    <path d="M 56 46 L 96 46" stroke="#dc2626" strokeWidth="3.5" />
    <path d="M 94 39 L 104 46 L 94 53 Z" fill="#dc2626" />
    <text x="78" y="30" textAnchor="middle" fontSize="13" fontWeight="900" fill="#b91c1c">ötöde</text>
    <rect x="108" y="30" width="32" height="32" rx="7" fill="#fff" stroke="#dc2626" strokeWidth="3" />
    <text x="124" y="54" textAnchor="middle" fontSize="20" fontWeight="900" fill={DIV5_UNK}>?</text>
  </svg>
);

/** 80 × 80: `total` pötty ötösével csoportosítva (max. 50). */
export const GroupDots80: React.FC<{ total: number }> = ({ total }) => {
  const slots = Math.ceil(total / 5);
  const cols = slots <= 4 ? 2 : slots <= 9 ? 3 : 4;
  const rows = Math.ceil(slots / cols);
  const cellW = 72 / cols;
  const cellH = Math.min(cellW, 72 / rows);
  const d = Math.min(cellW, cellH) * 0.22;
  return (
    <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="76" height="76" rx="10" fill="#f8fafc" stroke="#334155" strokeWidth="3" />
      <GroupedDotsG x={4} y={40 - (rows * cellH) / 2} total={total} cols={cols} cellW={cellW} cellH={cellH} d={d} r={d * 0.45} />
    </svg>
  );
};
