import React from 'react';
import { SIGN_COLOR, romanValue, splitRoman } from './RomanReadWriteG3Utils';

// ---------------------------------------------------------------------------
// Kis kártyaképek a Párosító (150 × 80) és a Csoportosító (80 × 80) játékhoz.
// Ugyanaz a képi nyelv, mint a tananyagban: kék tízesrúd, sárga egyeskocka,
// a római szám kék tízesrész + sárga egyesrész dobozra bontva. Számot nem írunk ki.
// ---------------------------------------------------------------------------

const SERIF = 'Georgia, "Times New Roman", serif';

const Colored: React.FC<{ s: string; x: number; y: number; size: number }> = ({ s, x, y, size }) => (
  <text x={x} y={y} textAnchor="middle" fontSize={size} fontWeight="bold" fontFamily={SERIF}>
    {s.split('').map((ch, i) => (
      <tspan key={i} fill={SIGN_COLOR[ch] ?? '#334155'}>
        {ch}
      </tspan>
    ))}
  </text>
);

/** Tízesrudak (kék) és egyeskockák (sárga, 2-es oszlopokban alulról). Párosító kártya (150 × 80). */
export const BlocksCard: React.FC<{ n: number }> = ({ n }) => {
  const t = Math.floor(n / 10);
  const e = n % 10;
  const rodGap = t > 6 ? 11 : 13;
  const cube = 9;
  const width = t * rodGap + (e ? 6 + Math.ceil(e / 5) * (cube + 2) : 0);
  const x0 = (150 - width) / 2;
  const y0 = 8;
  const onesX = x0 + t * rodGap + 6;
  return (
    <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg">
      {Array.from({ length: t }, (_, i) => (
        <g key={`t${i}`}>
          <rect x={x0 + i * rodGap} y={y0} width="9" height="64" rx="1.5" fill="#60a5fa" stroke="#1e40af" strokeWidth="1.8" />
          {Array.from({ length: 9 }, (_, k) => (
            <line key={k} x1={x0 + i * rodGap} y1={y0 + 6.4 * (k + 1)} x2={x0 + i * rodGap + 9} y2={y0 + 6.4 * (k + 1)} stroke="#1e40af" strokeWidth="0.8" />
          ))}
        </g>
      ))}
      {Array.from({ length: e }, (_, i) => (
        <rect
          key={`e${i}`}
          x={onesX + Math.floor(i / 5) * (cube + 2)}
          y={y0 + 64 - cube - (i % 5) * (cube + 2)}
          width={cube}
          height={cube}
          rx="1.5"
          fill="#fbbf24"
          stroke="#92400e"
          strokeWidth="1.4"
        />
      ))}
    </svg>
  );
};

/** A római szám kettévágva: kék doboz = tízesrész, sárga doboz = egyesrész. Párosító (150 × 80). */
export const SplitCard: React.FC<{ s: string }> = ({ s }) => {
  const { t, e } = splitRoman(romanValue(s));
  const size = Math.max(t.length, e.length) > 3 ? 22 : 26;
  return (
    <svg viewBox="0 0 150 80" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="14" width="68" height="52" rx="10" fill="#eff6ff" stroke="#60a5fa" strokeWidth="3" />
      <rect x="78" y="14" width="68" height="52" rx="10" fill="#fef3c7" stroke="#f59e0b" strokeWidth="3" />
      <line x1="75" y1="6" x2="75" y2="74" stroke="#dc2626" strokeWidth="3" strokeDasharray="5 4" />
      <Colored s={t} x={38} y={50} size={size} />
      <Colored s={e} x={112} y={50} size={size} />
    </svg>
  );
};

/** Ugyanez a csoportosító kártyára (80 × 80): fent a tízesrész, lent az egyesrész. */
export const SplitSmallCard: React.FC<{ s: string }> = ({ s }) => {
  const { t, e } = splitRoman(romanValue(s));
  const fit = (str: string) => Math.min(24, 66 / Math.max(1, str.length) / 0.8);
  return (
    <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="74" height="35" rx="8" fill="#eff6ff" stroke="#60a5fa" strokeWidth="3" />
      <rect x="3" y="42" width="74" height="35" rx="8" fill={e ? '#fef3c7' : '#fff'} stroke="#f59e0b" strokeWidth="3" strokeDasharray={e ? undefined : '5 4'} />
      <Colored s={t} x={40} y={29} size={fit(t)} />
      {e && <Colored s={e} x={40} y={68} size={fit(e)} />}
    </svg>
  );
};
