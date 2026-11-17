import React from 'react';
import { FONT, INK, UNK } from '../az-osszeg-valtozasai/SumChangesG3Parts';

// Kis, vastag vonalas ikonok a Párosító (150 × 80) és a Csoportosító (80 × 80) kártyáira.
// Oszlopos írásbeli összeadás nagy számjegyekkel; a „?” piros.

const Digits: React.FC<{ s: string; xr: number; y: number; cw: number; fs: number; color?: string }> = ({ s, xr, y, cw, fs, color = INK }) => (
  <g>
    {s
      .split('')
      .reverse()
      .map((ch, i) =>
        ch === ' ' ? null : (
          <text key={i} x={xr - i * cw - cw / 2} y={y} textAnchor="middle" fontSize={fs} fontWeight="bold" fill={ch === '?' ? UNK : color}>
            {ch}
          </text>
        )
      )}
  </g>
);

/** Párosító: két tag oszlopban, alatta vonal és az összeg (alapból „?”). */
export const MiniColumn: React.FC<{ a?: number | string; b?: number | string; result?: number | string }> = ({ a = 278, b = 145, result = '?' }) => {
  const cw = 21;
  const xr = 110;
  const res = String(result);
  return (
    <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <rect x={xr - 3 * cw} y="2" width={3 * cw} height="76" fill="#f8fafc" />
      <Digits s={String(a)} xr={xr} y={22} cw={cw} fs={22} />
      <Digits s={String(b)} xr={xr} y={46} cw={cw} fs={22} />
      <text x={xr - 3 * cw - 14} y="46" textAnchor="middle" fontSize="22" fontWeight="bold" fill={INK}>+</text>
      <line x1={xr - 3 * cw - 24} y1="53" x2={xr + 4} y2="53" stroke={INK} strokeWidth="3" strokeLinecap="round" />
      {res === '?' ? (
        <g>
          <rect x={xr - 3 * cw + 2} y="57" width={3 * cw - 4} height="21" rx="5" fill="#fee2e2" stroke={UNK} strokeWidth="2.5" />
          <text x={xr - 1.5 * cw} y="74" textAnchor="middle" fontSize="19" fontWeight="bold" fill={UNK}>?</text>
        </g>
      ) : (
        <Digits s={res} xr={xr} y={75} cw={cw} fs={22} color="#1d4ed8" />
      )}
    </svg>
  );
};

/** Csoportosító: 2–3 tag oszlopban; ha van result, az is (a „?” piros). */
export const SortColumn: React.FC<{ nums?: (number | string)[]; result?: number | string }> = ({ nums = [278, 145], result }) => {
  const rows = nums.length + (result !== undefined ? 1 : 0);
  const fs = rows >= 3 ? 18 : 21;
  const lh = rows >= 3 ? 21 : 27;
  const cw = rows >= 3 ? 15 : 17;
  const xr = 74;
  const y0 = rows >= 3 ? 19 : 28;
  const lastAddY = y0 + (nums.length - 1) * lh;
  return (
    <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      {nums.map((n, i) => (
        <Digits key={i} s={String(n)} xr={xr} y={y0 + i * lh} cw={cw} fs={fs} />
      ))}
      <text x={xr - 3 * cw - 10} y={lastAddY} textAnchor="middle" fontSize={fs} fontWeight="bold" fill={INK}>+</text>
      <line x1={xr - 3 * cw - 18} y1={lastAddY + 6} x2={xr + 3} y2={lastAddY + 6} stroke={INK} strokeWidth="3" strokeLinecap="round" />
      {result !== undefined && <Digits s={String(result)} xr={xr} y={lastAddY + 6 + lh - 3} cw={cw} fs={fs} color="#1d4ed8" />}
    </svg>
  );
};
