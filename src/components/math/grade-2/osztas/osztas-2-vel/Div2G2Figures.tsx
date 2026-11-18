import React from 'react';
import { DIV2_FONT, DotsPart, PlatePart, DivArrayPart, HalfDoublePart } from './Div2G2Parts';

// ---------------------------------------------------------------------------
// 1. Osztás 2-vel – tananyag-ábrák (2. osztály)
// ---------------------------------------------------------------------------

const DEF = 'w-full max-w-[480px] h-auto mx-auto';

/** Bennfoglalás: 10 korong kettesével csomagolva → 5 csomag. */
export const PackingSvg: React.FC<{ className?: string }> = ({ className = DEF }) => (
  <svg viewBox="0 0 300 130" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={DIV2_FONT}>
    <rect x="1" y="1" width="298" height="128" rx="14" fill="#f0fdf4" stroke="#bbf7d0" />
    <text x="150" y="22" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#14532d">
      10 korong, kettesével csomagolva
    </text>
    <DotsPart x={51} y={52} n={10} pairs={5} perRow={10} step={22} r={8} color="#3b82f6" />
    <text x="150" y="94" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#0f172a">
      A 10-ben a 2 megvan 5-ször.
    </text>
    <text x="150" y="118" textAnchor="middle" fontSize="18" fontWeight="900" fill="#15803d">
      10 : 2 = 5
    </text>
  </svg>
);

/** Egyenlő részekre osztás: 8 süti két tányérra → 4-4. */
export const SharingSvg: React.FC<{ className?: string }> = ({ className = DEF }) => (
  <svg viewBox="0 0 300 150" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={DIV2_FONT}>
    <rect x="1" y="1" width="298" height="148" rx="14" fill="#f0f9ff" stroke="#bae6fd" />
    <text x="150" y="22" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0c4a6e">
      8 süti, 2 tányér — mindkettőre ugyanannyi
    </text>
    <PlatePart cx={80} cy={64} w={120} items={4} />
    <PlatePart cx={220} cy={64} w={120} items={4} plateColor="#fce7f3" />
    <text x="150" y="70" textAnchor="middle" fontSize="16" fontWeight="900" fill="#0369a1">+</text>
    <text x="150" y="114" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#0f172a">
      A 8 fele 4, mert 2 · 4 = 8.
    </text>
    <text x="150" y="138" textAnchor="middle" fontSize="18" fontWeight="900" fill="#0369a1">
      8 : 2 = 4
    </text>
  </svg>
);

/** Az osztás jele és olvasata. */
export const DivSignSvg: React.FC<{ className?: string }> = ({ className = DEF }) => (
  <svg viewBox="0 0 300 120" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={DIV2_FONT}>
    <rect x="1" y="1" width="298" height="118" rx="14" fill="#fff7ed" stroke="#fed7aa" />
    <text x="78" y="56" textAnchor="middle" fontSize="34" fontWeight="900" fill="#16a34a">12</text>
    <text x="118" y="56" textAnchor="middle" fontSize="34" fontWeight="900" fill="#dc2626">:</text>
    <text x="152" y="56" textAnchor="middle" fontSize="34" fontWeight="900" fill="#dc2626">2</text>
    <text x="190" y="56" textAnchor="middle" fontSize="34" fontWeight="900" fill="#0f172a">=</text>
    <text x="228" y="56" textAnchor="middle" fontSize="34" fontWeight="900" fill="#1d4ed8">6</text>
    <text x="150" y="88" textAnchor="middle" fontSize="13.5" fontWeight="bold" fill="#7c2d12">
      Olvasd: 12 osztva 2-vel egyenlő 6.
    </text>
    <text x="150" y="108" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#9a3412">
      Ellenőrzés szorzással: 6 · 2 = 12
    </text>
  </svg>
);

/** Szorzás és osztás kapcsolata: 2 sor 7 korong. */
export const MultDivLinkSvg: React.FC<{ className?: string }> = ({ className = DEF }) => (
  <svg viewBox="0 0 300 140" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={DIV2_FONT}>
    <rect x="1" y="1" width="298" height="138" rx="14" fill="#faf5ff" stroke="#e9d5ff" />
    <text x="150" y="20" textAnchor="middle" fontSize="12.5" fontWeight="bold" fill="#581c87">
      14 korong: 7 oszlop, mindben 2
    </text>
    <DivArrayPart x={84} y={38} rows={2} cols={7} step={22} r={8} />
    <text x="80" y="104" textAnchor="middle" fontSize="18" fontWeight="900" fill="#0f172a">7 · 2 = 14</text>
    <text x="150" y="104" textAnchor="middle" fontSize="18" fontWeight="900" fill="#7e22ce">↔</text>
    <text x="220" y="104" textAnchor="middle" fontSize="18" fontWeight="900" fill="#0f172a">14 : 2 = 7</text>
    <text x="150" y="128" textAnchor="middle" fontSize="11.5" fontWeight="bold" fill="#6b21a8">
      Ha tudod a szorzást, tudod az osztást is!
    </text>
  </svg>
);

/** Fele és kétszerese: 18 ↔ 9. */
export const HalfDoubleSvg: React.FC<{ className?: string }> = ({ className = DEF }) => (
  <svg viewBox="0 0 260 120" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={DIV2_FONT}>
    <rect x="1" y="1" width="258" height="118" rx="14" fill="#fefce8" stroke="#fde68a" />
    <HalfDoublePart x={40} y={14} big="18" small="9" />
  </svg>
);

/** Marad-e? 11 dió két gyereknek: 5-5, marad 1. */
export const RemainderSvg: React.FC<{ className?: string }> = ({ className = DEF }) => (
  <svg viewBox="0 0 300 150" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={DIV2_FONT}>
    <rect x="1" y="1" width="298" height="148" rx="14" fill="#fff1f2" stroke="#fecdd3" />
    <text x="150" y="22" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#881337">
      11 dió, 2 gyerek
    </text>
    <PlatePart cx={75} cy={62} w={110} items={5} color="#a16207" />
    <PlatePart cx={205} cy={62} w={110} items={5} color="#a16207" plateColor="#fce7f3" />
    <circle cx="272" cy="62" r="7" fill="#a16207" stroke="#78350f" strokeWidth="1.3" />
    <text x="272" y="88" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#be123c">marad</text>
    <text x="150" y="114" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#0f172a">
      Egy gyereknek 5 jut, és marad 1.
    </text>
    <text x="150" y="137" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#be123c">
      Ami nem fér el egyenlően, az a maradék.
    </text>
  </svg>
);
