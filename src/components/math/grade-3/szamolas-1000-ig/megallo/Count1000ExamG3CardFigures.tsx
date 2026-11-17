import React from 'react';
import { FONT } from './Count1000ExamG3Parts';

// Kis, vastag vonalas ikonok a Párosító (150 × 80) és a Csoportosító (80 × 80) kártyáira.
// A V. fejezet és a 4. lecke ikonjai közül ezeket használjuk újra:
export { MiniCoins, MiniJump, SortTags, SortJump } from '../../szamolas-500-ig/osszeadas-es-kivonas/AddSub500G3CardFigures';
export { MiniRoundLine } from '../../szamolas-500-ig/megallo/Count500ExamG3CardFigures';
export { MiniRodGroups, MiniShare, SortBags, MiniFlatGroups } from '../szorzas-es-osztas/MulDiv1000G3CardFigures';

const flat = (x: number, y: number, s: number, sw: number, key: string) => (
  <g key={key}>
    <rect x={x} y={y} width={s} height={s} fill="#ef4444" stroke="#7f1d1d" strokeWidth={sw} />
    <line x1={x + s / 2} y1={y} x2={x + s / 2} y2={y + s} stroke="#7f1d1d" strokeWidth="1" />
    <line x1={x} y1={y + s / 2} x2={x + s} y2={y + s / 2} stroke="#7f1d1d" strokeWidth="1" />
  </g>
);

/** Párosító: számkép 1000-ig – fent a százas lapok (≤ 9), lent a tízesrudak (≤ 9) és az egyeskockák (≤ 9). */
export const MiniBlocks1000: React.FC<{ sz?: number; t?: number; e?: number }> = ({ sz = 4, t = 7, e = 2 }) => {
  const fRows = sz > 5 ? 2 : 1;
  const perRow = Math.ceil(sz / fRows);
  const s = sz ? Math.min(fRows === 2 ? 17 : 24, (144 - (perRow - 1) * 3) / perRow) : 0;
  const top = sz ? 4 : 0;
  const y2 = sz ? top + fRows * (s + 3) + 2 : 14;
  const rodH = Math.min(36, 76 - y2);
  const step = 8;
  const ew = e ? 4 + Math.ceil(e / 4) * 10 : 0;
  const rx0 = 75 - (t * step + ew) / 2;
  return (
    <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      {Array.from({ length: sz }).map((_, i) => {
        const row = Math.floor(i / perRow);
        const inRow = Math.min(perRow, sz - row * perRow);
        const x0 = 75 - (inRow * (s + 3) - 3) / 2;
        return flat(x0 + (i % perRow) * (s + 3), top + row * (s + 3), s, 2.2, `f${i}`);
      })}
      {Array.from({ length: t }).map((_, i) => (
        <rect key={`r${i}`} x={rx0 + i * step} y={y2} width={step - 2.5} height={rodH} rx="1" fill="#3b82f6" stroke="#1e3a8a" strokeWidth="1.5" />
      ))}
      {Array.from({ length: e }).map((_, i) => (
        <rect key={`c${i}`} x={rx0 + t * step + 4 + Math.floor(i / 4) * 10} y={y2 + (i % 4) * (rodH / 4)} width="8" height="8" fill="#facc15" stroke="#a16207" strokeWidth="1.5" />
      ))}
    </svg>
  );
};

/** Csoportosító: százas lapok fent (≤ 9), tízesrudak lent (≤ 9). */
export const SortBlocks1000: React.FC<{ sz?: number; t?: number }> = ({ sz = 2, t = 8 }) => {
  const rows = sz > 6 && t === 0 ? 3 : sz > 3 ? 2 : 1;
  const perRow = Math.ceil(sz / rows);
  const s = Math.min(t > 0 ? (rows === 2 ? 17 : 26) : 22, (76 - (perRow - 1) * 3) / Math.max(1, perRow));
  const step = t > 8 ? 7 : 8.5;
  const rx0 = 40 - (t * step - 2.5) / 2;
  const fy = 4;
  const y2 = fy + rows * (s + 3) + 2;
  return (
    <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      {Array.from({ length: sz }).map((_, i) => {
        const row = Math.floor(i / perRow);
        const inRow = Math.min(perRow, sz - row * perRow);
        const x0 = 40 - (inRow * (s + 3) - 3) / 2;
        return flat(x0 + (i % perRow) * (s + 3), fy + row * (s + 3), s, 2, `f${i}`);
      })}
      {Array.from({ length: t }).map((_, i) => (
        <rect key={`r${i}`} x={rx0 + i * step} y={y2} width={step - 2.5} height={Math.min(34, 77 - y2)} rx="1" fill="#3b82f6" stroke="#1e3a8a" strokeWidth="1.5" />
      ))}
    </svg>
  );
};
