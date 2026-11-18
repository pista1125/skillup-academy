import React from 'react';
import { DIV6_FONT, EggBoxesPart, LooseEggsPart, SixPlatesPart, ArrowPairPart, ChainPart } from './Div6G2Parts';

// ---------------------------------------------------------------------------
// 5. Osztás 6-tal – tananyag-ábrák (2. osztály)
// ---------------------------------------------------------------------------

const DEF = 'w-full max-w-[480px] h-auto mx-auto';

const Arrow: React.FC<{ x: number; y: number; len?: number }> = ({ x, y, len = 34 }) => (
  <g>
    <line x1={x} y1={y} x2={x + len - 6} y2={y} stroke="#334155" strokeWidth="3" />
    <path d={`M ${x + len - 8} ${y - 6} L ${x + len} ${y} L ${x + len - 8} ${y + 6} Z`} fill="#334155" />
  </g>
);

/** Bennfoglalás: 18 tojás → 3 doboz. */
export const PackSixSvg: React.FC<{ className?: string }> = ({ className = DEF }) => (
  <svg viewBox="0 0 320 150" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={DIV6_FONT}>
    <rect x="1" y="1" width="318" height="148" rx="14" fill="#fffbeb" stroke="#fde68a" />
    <text x="160" y="22" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#78350f">
      18 tojás. Egy dobozba 6 fér. Hány doboz kell?
    </text>
    <LooseEggsPart x={28} y={48} n={18} perRow={6} step={16} r={6} />
    <Arrow x={128} y={64} />
    <EggBoxesPart x={172} y={38} groups={3} w={40} gap={6} perRow={3} />
    <text x="236" y="88" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#92400e">3 doboz</text>
    <text x="160" y="122" textAnchor="middle" fontSize="20" fontWeight="900" fill="#be123c">
      18 : 6 = 3
    </text>
    <text x="160" y="141" textAnchor="middle" fontSize="11.5" fontWeight="bold" fill="#92400e">
      A 18-ban a 6 megvan 3-szor.
    </text>
  </svg>
);

/** Részekre osztás: 12 süti → 6 tányér, 2-2. */
export const ShareSixSvg: React.FC<{ className?: string }> = ({ className = DEF }) => (
  <svg viewBox="0 0 320 180" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={DIV6_FONT}>
    <rect x="1" y="1" width="318" height="178" rx="14" fill="#f0f9ff" stroke="#bae6fd" />
    <text x="160" y="22" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0c4a6e">
      12 sütit osztunk szét 6 tányérra egyenlően
    </text>
    <SixPlatesPart x={90} y={60} items={2} r={24} dx={70} dy={52} />
    <text x="160" y="158" textAnchor="middle" fontSize="20" fontWeight="900" fill="#0369a1">
      12 : 6 = 2
    </text>
    <text x="160" y="174" textAnchor="middle" fontSize="11.5" fontWeight="bold" fill="#075985">
      Minden tányérra 2 jut. A 12 hatoda 2.
    </text>
  </svg>
);

/** Szorzás és osztás párban: 4 · 6 = 24 és 24 : 6 = 4. */
export const MultDivPairSvg: React.FC<{ className?: string }> = ({ className = DEF }) => (
  <svg viewBox="0 0 320 130" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={DIV6_FONT}>
    <rect x="1" y="1" width="318" height="128" rx="14" fill="#faf5ff" stroke="#e9d5ff" />
    <EggBoxesPart x={64} y={14} groups={4} w={44} gap={6} />
    <rect x="22" y="62" width="128" height="36" rx="10" fill="#ffe4e6" stroke="#be123c" strokeWidth="2" />
    <text x="86" y="87" textAnchor="middle" fontSize="19" fontWeight="900" fill="#881337">4 · 6 = 24</text>
    <rect x="170" y="62" width="128" height="36" rx="10" fill="#dbeafe" stroke="#1d4ed8" strokeWidth="2" />
    <text x="234" y="87" textAnchor="middle" fontSize="19" fontWeight="900" fill="#1e3a8a">24 : 6 = 4</text>
    <text x="160" y="118" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#6b21a8">
      Ugyanaz a kép: 4 doboz, mindegyikben 6, összesen 24.
    </text>
  </svg>
);

/** Hatszorosa és hatoda nyilakkal. */
export const SixthSvg: React.FC<{ className?: string }> = ({ className = DEF }) => (
  <svg viewBox="0 0 320 120" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={DIV6_FONT}>
    <rect x="1" y="1" width="318" height="118" rx="14" fill="#f0fdf4" stroke="#bbf7d0" />
    <ArrowPairPart x={14} y={38} small="5" big="30" w={130} />
    <ArrowPairPart x={176} y={38} small="7" big="42" w={130} />
  </svg>
);

/** Lépésenként: előbb : 3, aztán : 2 — ugyanaz, mint : 6. */
export const StepDivSvg: React.FC<{ className?: string }> = ({ className = DEF }) => (
  <svg viewBox="0 0 320 178" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={DIV6_FONT}>
    <rect x="1" y="1" width="318" height="176" rx="14" fill="#eff6ff" stroke="#bfdbfe" />
    <ChainPart x={50} y={12} a="24" b="8" c="4" op1=": 3" op2=": 2" opAll="egyszerre: : 6" />
    <ChainPart x={50} y={94} a="18" b="9" c="3" op1=": 2" op2=": 3" opAll="egyszerre: : 6" />
  </svg>
);

/** Maradékos osztás: 23 tojás → 3 doboz, 5 kint marad. */
export const RemainderSixSvg: React.FC<{ className?: string }> = ({ className = DEF }) => (
  <svg viewBox="0 0 320 150" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={DIV6_FONT}>
    <rect x="1" y="1" width="318" height="148" rx="14" fill="#fff1f2" stroke="#fecdd3" />
    <text x="160" y="22" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#881337">
      23 tojás, dobozonként 6
    </text>
    <EggBoxesPart x={30} y={38} groups={3} w={50} gap={8} />
    <rect x="222" y="34" width="84" height="42" rx="8" fill="#ffffff" stroke="#dc2626" strokeWidth="2" strokeDasharray="5 3" />
    <LooseEggsPart x={236} y={48} n={5} perRow={3} step={16} r={6} />
    <text x="264" y="92" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#b91c1c">maradt 5</text>
    <text x="110" y="92" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#92400e">3 doboz</text>
    <text x="160" y="122" textAnchor="middle" fontSize="20" fontWeight="900" fill="#0f172a">
      23 = 3 · 6 + 5
    </text>
    <text x="160" y="141" textAnchor="middle" fontSize="11.5" fontWeight="bold" fill="#be123c">
      3 doboz lett, és maradt 5. A maradék kisebb, mint 6.
    </text>
  </svg>
);
