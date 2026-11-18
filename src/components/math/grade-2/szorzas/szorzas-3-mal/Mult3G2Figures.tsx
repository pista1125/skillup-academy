import React from 'react';
import { MULT3_FONT, CloverPart, StickTrianglePart, DotArrayPart, JumpLine3Part } from './Mult3G2Parts';

// ---------------------------------------------------------------------------
// 2. Szorzás 3-mal – tananyag-ábrák (2. osztály)
// ---------------------------------------------------------------------------

const DEF = 'w-full max-w-md h-auto mx-auto';

/** 4 lóhere, mindegyiken 3 levél: 3 + 3 + 3 + 3 = 4 · 3 = 12. */
export const CloverGroupsSvg: React.FC<{ className?: string }> = ({ className = DEF }) => (
  <svg viewBox="0 0 320 160" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={MULT3_FONT}>
    <rect x="1" y="1" width="318" height="158" rx="14" fill="#f0fdf4" stroke="#bbf7d0" />
    <text x="160" y="22" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#14532d">
      4 lóhere, mindegyiken 3 levél
    </text>
    {[0, 1, 2, 3].map((i) => (
      <g key={i}>
        <CloverPart cx={55 + i * 70} cy={52} r={13} />
        <text x={55 + i * 70} y={104} textAnchor="middle" fontSize="18" fontWeight="900" fill="#15803d">
          3
        </text>
      </g>
    ))}
    <text x="160" y="128" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#334155">
      3 + 3 + 3 + 3 = 12
    </text>
    <text x="160" y="150" textAnchor="middle" fontSize="16" fontWeight="900" fill="#1d4ed8">
      4 · 3 = 12
    </text>
  </svg>
);

/** Hármas ugrások 0-tól 30-ig: a 3 többszörösei. */
export const ThreeJumpsLineSvg: React.FC<{ className?: string }> = ({ className = DEF }) => (
  <svg viewBox="0 0 270 120" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={MULT3_FONT}>
    <rect x="1" y="1" width="268" height="118" rx="14" fill="#faf5ff" stroke="#e9d5ff" />
    <text x="135" y="20" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#581c87">
      Ugrálj hármasával 0-tól 30-ig!
    </text>
    <JumpLine3Part x0={14} y={68} unit={7.8} jumps={10} labelEvery={3} />
    <text x="135" y="108" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#334155">
      0, 3, 6, 9, 12, 15, 18, 21, 24, 27, 30 – a 3 többszörösei
    </text>
  </svg>
);

/** 1–30 számtábla: a 2 és a 3 többszörösei. */
export const MultiplesBoardSvg: React.FC<{ className?: string }> = ({ className = DEF }) => {
  const cell = 28;
  const x0 = 20;
  const y0 = 30;
  return (
    <svg viewBox="0 0 320 168" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={MULT3_FONT}>
      <rect x="1" y="1" width="318" height="166" rx="14" fill="#f8fafc" stroke="#cbd5e1" />
      <text x="160" y="20" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#0f172a">
        A 2 és a 3 többszörösei 30-ig
      </text>
      {Array.from({ length: 30 }, (_, i) => {
        const n = i + 1;
        const c = i % 10;
        const r = Math.floor(i / 10);
        const m2 = n % 2 === 0;
        const m3 = n % 3 === 0;
        const fill = m2 && m3 ? '#bbf7d0' : m3 ? '#bfdbfe' : m2 ? '#fef08a' : '#ffffff';
        return (
          <g key={n}>
            <rect x={x0 + c * cell} y={y0 + r * cell} width={cell} height={cell} fill={fill} stroke="#94a3b8" strokeWidth="1" />
            <text x={x0 + c * cell + cell / 2} y={y0 + r * cell + 19} textAnchor="middle" fontSize="12" fontWeight="bold" fill="#0f172a">
              {n}
            </text>
          </g>
        );
      })}
      <rect x="20" y="126" width="14" height="14" fill="#fef08a" stroke="#94a3b8" />
      <text x="38" y="138" fontSize="11" fill="#334155">csak a 2-é</text>
      <rect x="112" y="126" width="14" height="14" fill="#bfdbfe" stroke="#94a3b8" />
      <text x="130" y="138" fontSize="11" fill="#334155">csak a 3-é</text>
      <rect x="204" y="126" width="14" height="14" fill="#bbf7d0" stroke="#94a3b8" />
      <text x="222" y="138" fontSize="11" fill="#334155">a 2-é és a 3-é</text>
      <text x="160" y="160" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#15803d">
        Zöld: 6, 12, 18, 24, 30
      </text>
    </svg>
  );
};

/** Rácspontok: 5 oszlop × 3 sor – 5 · 3 = 3 · 5 = 15. */
export const ArrayCommute3Svg: React.FC<{ className?: string }> = ({ className = DEF }) => (
  <svg viewBox="0 0 320 150" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={MULT3_FONT}>
    <rect x="1" y="1" width="318" height="148" rx="14" fill="#eff6ff" stroke="#bfdbfe" />
    <text x="160" y="20" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1e3a8a">
      Ugyanaz a 15 pötty, kétféle szorzás
    </text>
    {[0, 1, 2, 3, 4].map((c) => (
      <rect key={c} x={34 + c * 24 - 11} y={34} width="22" height="70" rx="11" fill="none" stroke="#16a34a" strokeWidth="2" strokeDasharray="3 2" />
    ))}
    <DotArrayPart x={34} y={46} rows={3} cols={5} step={24} r={8} />
    <text x="250" y="56" textAnchor="middle" fontSize="12" fill="#15803d" fontWeight="bold">
      5 oszlop, bennük 3
    </text>
    <text x="250" y="76" textAnchor="middle" fontSize="15" fontWeight="900" fill="#15803d">
      5 · 3 = 15
    </text>
    <text x="250" y="100" textAnchor="middle" fontSize="12" fill="#1d4ed8" fontWeight="bold">
      3 sor, bennük 5
    </text>
    <text x="250" y="120" textAnchor="middle" fontSize="15" fontWeight="900" fill="#1d4ed8">
      3 · 5 = 15
    </text>
    <text x="96" y="132" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#334155">
      5 · 3 = 3 · 5
    </text>
  </svg>
);

/** Pálcika-háromszögek táblázata: 1 → 3, 2 → 6, … */
export const TrianglesTableSvg: React.FC<{ className?: string }> = ({ className = DEF }) => (
  <svg viewBox="0 0 330 160" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={MULT3_FONT}>
    <rect x="1" y="1" width="328" height="158" rx="14" fill="#fff7ed" stroke="#fed7aa" />
    <text x="165" y="20" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#7c2d12">
      Minden háromszöghöz 3 pálcika kell
    </text>
    {[1, 2, 3, 4, 5].map((n, i) => (
      <g key={n}>
        {Array.from({ length: n }, (_, k) => (
          <StickTrianglePart key={k} x={100 + i * 46 + (k % 2) * 18} y={28 + Math.floor(k / 2) * 18} s={16} w={2.6} />
        ))}
      </g>
    ))}
    <rect x="12" y="92" width="306" height="56" rx="8" fill="#ffffff" stroke="#fdba74" />
    <line x1="12" y1="120" x2="318" y2="120" stroke="#fdba74" />
    <text x="54" y="111" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#7c2d12">háromszög</text>
    <text x="54" y="139" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#7c2d12">pálcika</text>
    {[1, 2, 3, 4, 5].map((n, i) => (
      <g key={n}>
        <text x={117 + i * 46} y={112} textAnchor="middle" fontSize="15" fontWeight="900" fill="#0f172a">
          {n}
        </text>
        <text x={117 + i * 46} y={140} textAnchor="middle" fontSize="15" fontWeight="900" fill="#c2410c">
          {n * 3}
        </text>
      </g>
    ))}
  </svg>
);

/** A háromszoros: 4 → · 3 → 12. */
export const TripleArrowSvg: React.FC<{ className?: string }> = ({ className = DEF }) => (
  <svg viewBox="0 0 320 120" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={MULT3_FONT}>
    <rect x="1" y="1" width="318" height="118" rx="14" fill="#fdf2f8" stroke="#fbcfe8" />
    <text x="160" y="22" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#831843">
      A 4 háromszorosa: háromszor annyi
    </text>
    <rect x="30" y="40" width="64" height="48" rx="10" fill="#fff" stroke="#db2777" strokeWidth="3" />
    <text x="62" y="73" textAnchor="middle" fontSize="24" fontWeight="900" fill="#831843">4</text>
    <path d="M 102 64 L 212 64" stroke="#0891b2" strokeWidth="4" />
    <path d="M 204 56 L 216 64 L 204 72 Z" fill="#0891b2" />
    <text x="157" y="56" textAnchor="middle" fontSize="15" fontWeight="900" fill="#0e7490">háromszorosa</text>
    <text x="157" y="84" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0e7490">3 · 4 = 4 + 4 + 4</text>
    <rect x="224" y="40" width="64" height="48" rx="10" fill="#fff" stroke="#db2777" strokeWidth="3" />
    <text x="256" y="73" textAnchor="middle" fontSize="24" fontWeight="900" fill="#831843">12</text>
    <text x="160" y="108" textAnchor="middle" fontSize="12" fill="#334155">
      3 · 4 = 12, és 4 · 3 = 12 is.
    </text>
  </svg>
);
