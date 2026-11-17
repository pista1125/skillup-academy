import React from 'react';
import { FONT, UNK, sectorPath } from './FractionAmountsG3Parts';

// Kis, vastag vonalas ikonok a Párosító (150 × 80) és a Csoportosító (80 × 80) kártyáira.

const COLORS = ['#ef4444', '#3b82f6', '#22c55e', '#f59e0b', '#a855f7'];

/** Párosító: n pötty k sorban (soronként más szín), mellette a kérdés szava. */
export const MiniObjs: React.FC<{ n: number; k: number; word: string }> = ({ n, k, word }) => {
  const m = n / k;
  const gap = Math.min(16, 84 / Math.max(m, 1));
  const rg = Math.min(16, 62 / k);
  const r = Math.min(6, gap / 2 - 1, rg / 2 - 1);
  const y0 = 40 - ((k - 1) * rg) / 2;
  return (
    <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      {Array.from({ length: k }, (_, row) =>
        Array.from({ length: m }, (_, i) => <circle key={`${row}-${i}`} cx={10 + i * gap} cy={y0 + row * rg} r={r} fill={COLORS[row % COLORS.length]} stroke="#1e293b" strokeWidth="1.5" />)
      )}
      <text x="128" y="36" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#0f172a">{word}</text>
      <text x="128" y="62" textAnchor="middle" fontSize="24" fontWeight="bold" fill={UNK}>?</text>
    </svg>
  );
};

/** Párosító: csík n részre, fölötte az egész, egy rész „?”. */
export const MiniStrip: React.FC<{ top: string; n: number }> = ({ top, n }) => {
  const W = 136;
  const pw = W / n;
  return (
    <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <text x="75" y="24" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#0f172a">{top}</text>
      {Array.from({ length: n }, (_, i) => (
        <rect key={i} x={7 + i * pw} y="34" width={pw} height="36" fill={i === 0 ? '#fbbf24' : '#ffffff'} stroke="#334155" strokeWidth="3" />
      ))}
      <text x={7 + pw / 2} y="60" textAnchor="middle" fontSize={pw < 20 ? 15 : 22} fontWeight="bold" fill={UNK}>?</text>
    </svg>
  );
};

/** Párosító: óralap n részre, 1 rész színezve. */
export const MiniClock: React.FC<{ n: number; label?: string }> = ({ n, label }) => (
  <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <circle cx="40" cy="40" r="34" fill="#ffffff" stroke="#334155" strokeWidth="3" />
    <path d={sectorPath(40, 40, 34, 60 / n)} fill="#c084fc" stroke="#334155" strokeWidth="2" />
    {Array.from({ length: n }, (_, i) => {
      const a = ((360 * i) / n - 90) * (Math.PI / 180);
      return <line key={i} x1="40" y1="40" x2={40 + 34 * Math.cos(a)} y2={40 + 34 * Math.sin(a)} stroke="#334155" strokeWidth="2.5" />;
    })}
    <text x="40" y="20" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#334155">12</text>
    <text x="112" y="36" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#0f172a">{label ?? '1 óra'}</text>
    <text x="112" y="62" textAnchor="middle" fontSize="24" fontWeight="bold" fill={UNK}>?</text>
  </svg>
);

/** Párosító: mérőhenger 10 beosztással, „level” dl víz. */
export const MiniJug: React.FC<{ level: number }> = ({ level }) => (
  <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="30" y={74 - level * 6} width="36" height={level * 6} fill="#7dd3fc" />
    <path d="M 30 8 L 30 74 L 66 74 L 66 8" fill="none" stroke="#334155" strokeWidth="3" />
    {Array.from({ length: 11 }, (_, i) => (
      <line key={i} x1="30" y1={74 - i * 6} x2={i % 5 === 0 ? 46 : 39} y2={74 - i * 6} stroke="#334155" strokeWidth="2" />
    ))}
    <text x="108" y="34" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#0f172a">1 l</text>
    <text x="108" y="62" textAnchor="middle" fontSize="24" fontWeight="bold" fill={UNK}>? dl</text>
  </svg>
);

/** Párosító: szakasz cm-es beosztással, fölötte a kérdés szava. */
export const MiniSeg: React.FC<{ cm: number; word: string }> = ({ cm, word }) => {
  const u = Math.min(14, 130 / cm);
  const x0 = (150 - cm * u) / 2;
  return (
    <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <text x="75" y="24" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#0f172a">{word} ?</text>
      <line x1={x0} y1="52" x2={x0 + cm * u} y2="52" stroke="#16a34a" strokeWidth="5" />
      {Array.from({ length: cm + 1 }, (_, i) => (
        <line key={i} x1={x0 + i * u} y1={i === 0 || i === cm ? 40 : 45} x2={x0 + i * u} y2={i === 0 || i === cm ? 64 : 59} stroke="#1e293b" strokeWidth="2.5" />
      ))}
    </svg>
  );
};

/** Párosító: ismert rész (fele / negyede …) – az egész szakasz „?”. */
export const MiniWhole: React.FC<{ partCm: number; n: number }> = ({ partCm, n }) => {
  const pw = 136 / n;
  return (
    <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <path d="M 7 30 L 7 24 L 143 24 L 143 30" fill="none" stroke="#334155" strokeWidth="2.5" />
      <text x="75" y="20" textAnchor="middle" fontSize="20" fontWeight="bold" fill={UNK}>?</text>
      {Array.from({ length: n }, (_, i) => (
        <rect key={i} x={7 + i * pw} y="34" width={pw} height="22" fill={i === 0 ? '#86efac' : '#ffffff'} stroke="#334155" strokeWidth="3" />
      ))}
      <text x={7 + pw / 2} y="76" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#166534">{partCm} cm</text>
    </svg>
  );
};

/** Csoportosító: pöttyök k sorban + a szó (80 × 80). */
export const SortObjs: React.FC<{ n: number; k: number; word: string }> = ({ n, k, word }) => {
  const m = n / k;
  const gap = Math.min(15, 72 / m);
  const rg = Math.min(14, 46 / k);
  const r = Math.min(5.5, gap / 2 - 1, rg / 2 - 0.5);
  const x0 = 40 - ((m - 1) * gap) / 2;
  return (
    <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      {Array.from({ length: k }, (_, row) =>
        Array.from({ length: m }, (_, i) => <circle key={`${row}-${i}`} cx={x0 + i * gap} cy={10 + row * rg} r={r} fill={COLORS[row % COLORS.length]} stroke="#1e293b" strokeWidth="1.3" />)
      )}
      <text x="40" y="74" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#0f172a">{word}</text>
    </svg>
  );
};

/** Csoportosító: óralap; n > 0: részekre osztva, 1 rész színes; n = 0: „min” perc színes, beosztással. */
export const SortClock: React.FC<{ n?: number; min?: number }> = ({ n = 0, min = 0 }) => {
  const shade = n > 0 ? 60 / n : min;
  return (
    <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <circle cx="40" cy="40" r="34" fill="#ffffff" stroke="#334155" strokeWidth="3" />
      <path d={sectorPath(40, 40, 34, shade)} fill="#c084fc" stroke="#334155" strokeWidth="2" />
      {n > 1 &&
        Array.from({ length: n }, (_, i) => {
          const a = ((360 * i) / n - 90) * (Math.PI / 180);
          return <line key={i} x1="40" y1="40" x2={40 + 34 * Math.cos(a)} y2={40 + 34 * Math.sin(a)} stroke="#334155" strokeWidth="2.5" />;
        })}
      {n === 0 &&
        Array.from({ length: 12 }, (_, i) => {
          const a = (i * 30 - 90) * (Math.PI / 180);
          return <line key={i} x1={40 + 34 * Math.cos(a)} y1={40 + 34 * Math.sin(a)} x2={40 + 26 * Math.cos(a)} y2={40 + 26 * Math.sin(a)} stroke="#334155" strokeWidth="3" />;
        })}
      <circle cx="40" cy="40" r="3" fill="#334155" />
    </svg>
  );
};

/** Csoportosító: az egész szám fölül, csík n részre, 1 rész „?” (80 × 80). */
export const SortStrip: React.FC<{ top: number | string; n: number }> = ({ top, n }) => {
  const W = 72;
  const pw = W / n;
  return (
    <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
      <text x="40" y="26" textAnchor="middle" fontSize={String(top).length > 4 ? 19 : 23} fontWeight="bold" fill="#0f172a">{top}</text>
      {Array.from({ length: n }, (_, i) => (
        <rect key={i} x={4 + i * pw} y="38" width={pw} height="30" fill={i === 0 ? '#fbbf24' : '#ffffff'} stroke="#334155" strokeWidth="3" />
      ))}
      {pw >= 14 && (
        <text x={4 + pw / 2} y="60" textAnchor="middle" fontSize="18" fontWeight="bold" fill={UNK}>?</text>
      )}
    </svg>
  );
};
