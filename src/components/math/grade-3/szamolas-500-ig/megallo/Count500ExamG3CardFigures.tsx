import React from 'react';
import { FONT, UNK } from './Count500ExamG3Parts';

// Kis, vastag vonalas ikonok a Párosító (150 × 80) és a Csoportosító (80 × 80) kártyáira.
// A pénz-, ugrás-, csík-, rúdcsoport-, osztás-, számkép- és árcédula-ikonok a 3–4. leckéből jönnek.
export { MiniCoins, MiniJump, MiniBar500, SortBlocks, SortJump, SortTags } from '../osszeadas-es-kivonas/AddSub500G3CardFigures';
export { MiniRodGroups, MiniShare, SortBags } from '../szorzas-es-osztas/MulDiv500G3CardFigures';

/** Párosító: számkép (százas lap, tízesrúd, egyeskocka). */
export const MiniBlocks: React.FC<{ sz?: number; t?: number; e?: number }> = ({ sz = 2, t = 3, e = 5 }) => {
  const s = sz >= 4 ? 24 : 30;
  const rodStep = 8;
  const fw = sz * (s + 4);
  const rw = t * rodStep;
  const ew = e ? 4 + Math.ceil(e / 5) * 10 : 0;
  const x0 = (150 - (fw + rw + ew)) / 2;
  return (
    <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      {Array.from({ length: sz }).map((_, i) => (
        <g key={`f${i}`}>
          <rect x={x0 + i * (s + 4)} y={16} width={s} height={s * 1.6} fill="#ef4444" stroke="#7f1d1d" strokeWidth="2.5" />
          <line x1={x0 + i * (s + 4) + s / 2} y1={16} x2={x0 + i * (s + 4) + s / 2} y2={16 + s * 1.6} stroke="#7f1d1d" strokeWidth="1" />
          <line x1={x0 + i * (s + 4)} y1={16 + s * 0.8} x2={x0 + i * (s + 4) + s} y2={16 + s * 0.8} stroke="#7f1d1d" strokeWidth="1" />
        </g>
      ))}
      {Array.from({ length: t }).map((_, i) => (
        <rect key={`r${i}`} x={x0 + fw + i * rodStep} y={16} width={rodStep - 2.5} height={s * 1.6} rx="1" fill="#3b82f6" stroke="#1e3a8a" strokeWidth="1.5" />
      ))}
      {Array.from({ length: e }).map((_, i) => (
        <rect key={`c${i}`} x={x0 + fw + rw + 4 + Math.floor(i / 5) * 10} y={16 + (i % 5) * 9.8} width="8" height="8" fill="#facc15" stroke="#a16207" strokeWidth="1.5" />
      ))}
    </svg>
  );
};

/** Párosító: szakasz két kerek szám között, rajta a szám. */
export const MiniRoundLine: React.FC<{ v?: number; lo?: number; hi?: number }> = ({ v = 247, lo = 240, hi = 250 }) => {
  const x0 = 14;
  const x1 = 136;
  const X = (u: number) => x0 + ((x1 - x0) * (u - lo)) / (hi - lo);
  return (
    <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <line x1={x0} y1="44" x2={x1} y2="44" stroke="#334155" strokeWidth="3" />
      <line x1={x0} y1="34" x2={x0} y2="54" stroke="#6d28d9" strokeWidth="3.5" />
      <line x1={x1} y1="34" x2={x1} y2="54" stroke="#6d28d9" strokeWidth="3.5" />
      <line x1={X((lo + hi) / 2)} y1="38" x2={X((lo + hi) / 2)} y2="50" stroke="#334155" strokeWidth="2" />
      <circle cx={X(v)} cy="44" r="5.5" fill="#2563eb" />
      <text x={X(v)} y="26" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#1d4ed8">{v}</text>
      <text x={x0 + 4} y="74" textAnchor="middle" fontSize="17" fontWeight="bold" fill="#6d28d9">{lo}</text>
      <text x={x1 - 4} y="74" textAnchor="middle" fontSize="17" fontWeight="bold" fill="#6d28d9">{hi}</text>
      <text x="75" y="74" textAnchor="middle" fontSize="18" fontWeight="bold" fill={UNK}>≈ ?</text>
    </svg>
  );
};
