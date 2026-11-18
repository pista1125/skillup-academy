import React from 'react';
import { MULT6_FONT, EggBoxesPart, JumpLinePart, ArrayPart, ChainPart } from './Mult6G2Parts';

// ---------------------------------------------------------------------------
// 5. Szorzás 6-tal – tananyag-ábrák (2. osztály)
// ---------------------------------------------------------------------------

const DEF = 'w-full max-w-[480px] h-auto mx-auto';

/** 4 tojásdoboz, mindegyikben 6 tojás: 6 + 6 + 6 + 6 = 24. */
export const EggBoxesSvg: React.FC<{ className?: string }> = ({ className = DEF }) => (
  <svg viewBox="0 0 320 150" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={MULT6_FONT}>
    <rect x="1" y="1" width="318" height="148" rx="14" fill="#fffbeb" stroke="#fde68a" />
    <text x="160" y="22" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#78350f">
      4 doboz, mindegyikben 6 tojás
    </text>
    <EggBoxesPart x={38} y={34} groups={4} w={56} gap={10} />
    <text x="160" y="100" textAnchor="middle" fontSize="18" fontWeight="900" fill="#0f172a">
      6 + 6 + 6 + 6 = 24
    </text>
    <text x="160" y="130" textAnchor="middle" fontSize="20" fontWeight="900" fill="#be123c">
      4 · 6 = 24
    </text>
    <text x="250" y="130" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#92400e">
      négyszer hat
    </text>
  </svg>
);

/** Hatos ugrások a 0–60 számegyenesen. */
export const SixJumpsSvg: React.FC<{ className?: string }> = ({ className = DEF }) => (
  <svg viewBox="0 0 280 110" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={MULT6_FONT}>
    <rect x="1" y="1" width="278" height="108" rx="14" fill="#faf5ff" stroke="#e9d5ff" />
    <text x="140" y="20" textAnchor="middle" fontSize="12.5" fontWeight="bold" fill="#581c87">
      Hatosával ugrálunk: 6, 12, 18, … 60
    </text>
    <JumpLinePart x0={16} y={66} unit={4.1} jumps={10} />
    <text x="140" y="102" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#7e22ce">
      Ahová érkezel, azok a 6 többszörösei.
    </text>
  </svg>
);

/** 1–30 tábla: a 2, a 3 és a 6 többszörösei. */
export const TablesLinkSvg: React.FC<{ className?: string }> = ({ className = DEF }) => {
  const cw = 28;
  const ch = 26;
  const x0 = 20;
  const y0 = 30;
  return (
    <svg viewBox="0 0 320 172" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={MULT6_FONT}>
      <rect x="1" y="1" width="318" height="170" rx="14" fill="#f0fdf4" stroke="#bbf7d0" />
      <text x="160" y="20" textAnchor="middle" fontSize="12.5" fontWeight="bold" fill="#14532d">
        A 2, a 3 és a 6 többszörösei 30-ig
      </text>
      {Array.from({ length: 30 }, (_, i) => {
        const v = i + 1;
        const r = Math.floor(i / 10);
        const c = i % 10;
        const x = x0 + c * cw;
        const y = y0 + r * (ch + 4);
        const m2 = v % 2 === 0;
        const m3 = v % 3 === 0;
        const m6 = v % 6 === 0;
        return (
          <g key={v}>
            <rect x={x + 1} y={y} width={cw - 2} height={ch} rx="5" fill={m6 ? '#86efac' : '#ffffff'} stroke={m3 ? '#dc2626' : '#cbd5e1'} strokeWidth={m3 ? 2.4 : 1} />
            <text x={x + cw / 2} y={y + 17} textAnchor="middle" fontSize="12" fontWeight="900" fill="#0f172a">
              {v}
            </text>
            {m2 && <line x1={x + 6} y1={y + ch - 3} x2={x + cw - 6} y2={y + ch - 3} stroke="#2563eb" strokeWidth="2.6" strokeLinecap="round" />}
          </g>
        );
      })}
      <line x1="24" y1="131" x2="40" y2="131" stroke="#2563eb" strokeWidth="2.6" strokeLinecap="round" />
      <text x="46" y="135" fontSize="11" fontWeight="bold" fill="#1e3a8a">a 2 többszöröse</text>
      <rect x="140" y="123" width="16" height="15" rx="3" fill="#ffffff" stroke="#dc2626" strokeWidth="2.4" />
      <text x="162" y="135" fontSize="11" fontWeight="bold" fill="#991b1b">a 3 többszöröse</text>
      <rect x="24" y="146" width="16" height="15" rx="3" fill="#86efac" stroke="#dc2626" strokeWidth="2.4" />
      <text x="46" y="158" fontSize="11" fontWeight="bold" fill="#166534">mindkettő: ez a 6 többszöröse</text>
    </svg>
  );
};

/** Minden dobozban 3 kék + 3 piros tojás: 4 · 3 + 4 · 3 = 4 · 6. */
export const DoubleThreeSvg: React.FC<{ className?: string }> = ({ className = DEF }) => (
  <svg viewBox="0 0 320 160" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={MULT6_FONT}>
    <rect x="1" y="1" width="318" height="158" rx="14" fill="#fff1f2" stroke="#fecdd3" />
    <text x="160" y="22" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#881337">
      Egy dobozban 3 kék és 3 piros tojás
    </text>
    <EggBoxesPart x={38} y={32} groups={4} w={56} gap={10} split />
    <text x="160" y="94" textAnchor="middle" fontSize="15" fontWeight="900" fill="#1d4ed8">
      kék: 4 · 3 = 12
    </text>
    <text x="160" y="114" textAnchor="middle" fontSize="15" fontWeight="900" fill="#dc2626">
      piros: 4 · 3 = 12
    </text>
    <text x="160" y="142" textAnchor="middle" fontSize="18" fontWeight="900" fill="#0f172a">
      12 + 12 = 24, tehát 4 · 6 = 24
    </text>
  </svg>
);

/** Láncnyíl: · 3, majd · 2 ugyanaz, mint · 6. */
export const ChainSvg: React.FC<{ className?: string }> = ({ className = DEF }) => (
  <svg viewBox="0 0 320 178" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={MULT6_FONT}>
    <rect x="1" y="1" width="318" height="176" rx="14" fill="#eff6ff" stroke="#bfdbfe" />
    <ChainPart x={50} y={12} a="4" b="12" c="24" op1="· 3" op2="· 2" opAll="egyszerre: · 6" />
    <ChainPart x={50} y={94} a="5" b="10" c="30" op1="· 2" op2="· 3" opAll="egyszerre: · 6" />
  </svg>
);

/** Rácspontok: 3 sor 6-6 pötty = 6 oszlop 3-3 pötty. */
export const Array6Svg: React.FC<{ className?: string }> = ({ className = DEF }) => (
  <svg viewBox="0 0 320 150" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={MULT6_FONT}>
    <rect x="1" y="1" width="318" height="148" rx="14" fill="#ecfeff" stroke="#a5f3fc" />
    <text x="160" y="22" textAnchor="middle" fontSize="12.5" fontWeight="bold" fill="#155e75">
      3 sor, mindegyikben 6 pötty
    </text>
    <ArrayPart x={110} y={44} rows={3} cols={6} step={20} r={7.5} rowColors={['#f97316', '#0ea5e9', '#a855f7']} />
    <text x="160" y="118" textAnchor="middle" fontSize="18" fontWeight="900" fill="#0f172a">
      3 · 6 = 18 = 6 · 3
    </text>
    <text x="160" y="138" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#0e7490">
      Sorokban: 3 · 6. Oszlopokban: 6 · 3. Ugyanannyi!
    </text>
  </svg>
);
