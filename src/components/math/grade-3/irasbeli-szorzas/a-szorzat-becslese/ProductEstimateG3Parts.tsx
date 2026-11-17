import React from 'react';
import { FONT, UNK, QFrame } from '../szorzas-egyjegyu-szammal/MulOneDigitG3Parts';

// ---------------------------------------------------------------------------
// A szorzat becslése – segédfüggvények és kérdésábrák.
// Kerekítés: 5-től felfelé (335 ≈ 340, 350 ≈ 400).
// ---------------------------------------------------------------------------

export const roundTo = (v: number, to: number) => Math.round(v / to) * to;
/** JS Math.round 0.5-öt felfelé kerekít pozitív számnál – épp ez kell. */
export const roundH = (v: number) => roundTo(v, 100);
export const roundT = (v: number) => roundTo(v, 10);

/** Számegyenes-szakasz kerekítéshez: alsó és felső kerek szám, középen a fele, a szám pirossal. */
export const EstLineQ: React.FC<{ v: number; to: 10 | 100; caption?: string }> = ({ v, to, caption }) => {
  const lo = Math.floor(v / to) * to;
  const hi = lo + to;
  const x0 = 26;
  const x1 = 214;
  const X = (t: number) => x0 + ((x1 - x0) * (t - lo)) / to;
  const h = caption ? 104 : 80;
  const ticks = Array.from({ length: 11 }).map((_, i) => lo + (i * to) / 10);
  return (
    <QFrame h={h}>
      <line x1={x0 - 8} y1="48" x2={x1 + 8} y2="48" stroke="#334155" strokeWidth="2" />
      {ticks.map((t, i) => (
        <line key={i} x1={X(t)} y1={i === 0 || i === 10 ? 38 : i === 5 ? 41 : 44} x2={X(t)} y2={i === 0 || i === 10 ? 58 : i === 5 ? 55 : 52} stroke={i === 5 ? '#7c3aed' : '#334155'} strokeWidth={i === 0 || i === 10 ? 2.4 : 1.4} />
      ))}
      <text x={X(lo)} y="74" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#334155">{lo}</text>
      <text x={X(hi)} y="74" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#334155">{hi}</text>
      <text x={X(lo + to / 2)} y="72" textAnchor="middle" fontSize="11" fill="#7c3aed">{lo + to / 2}</text>
      <circle cx={X(v)} cy="48" r="5.5" fill="#dc2626" />
      <text x={X(v)} y="28" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#b91c1c">{v}</text>
      {caption && <text x="120" y={h - 10} textAnchor="middle" fontSize="15" fontWeight="bold" fill={caption.includes('?') ? '#0f172a' : '#0f172a'}>{caption}</text>}
    </QFrame>
  );
};

/** Vízszintes szalagok (becslések és a pontos érték összevetése). '?' = ismeretlen. */
export const BarsQ: React.FC<{ bars: { label: string; v: number; text: string; color: string }[]; max: number }> = ({ bars, max }) => {
  const h = 18 + bars.length * 30;
  return (
    <QFrame h={h}>
      {bars.map((b, i) => {
        const y = 10 + i * 30;
        const w = (118 * b.v) / max;
        const q = b.text === '?';
        return (
          <g key={i}>
            <text x="74" y={y + 15} textAnchor="end" fontSize="11.5" fontWeight="bold" fill="#334155">{b.label}</text>
            <rect x="80" y={y} width={w} height="20" rx="4" fill={b.color} stroke="#334155" strokeWidth="1" />
            <text x={80 + w + 6} y={y + 15} fontSize="13" fontWeight="bold" fill={q ? UNK : '#0f172a'}>{b.text}</text>
          </g>
        );
      })}
    </QFrame>
  );
};

export { FONT };
