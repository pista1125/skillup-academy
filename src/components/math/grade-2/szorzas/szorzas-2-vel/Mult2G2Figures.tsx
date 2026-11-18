import React from 'react';
import { MULT2_FONT, BagsPart, ArrayPart, JumpLinePart, BikePart } from './Mult2G2Parts';

// ---------------------------------------------------------------------------
// 1. Szorzás 2-vel – tananyag-ábrák (2. osztály)
// ---------------------------------------------------------------------------

const DEF = 'w-full max-w-[480px] h-auto mx-auto';

/** 4 zacskó, mindegyikben 2 cseresznye: 2 + 2 + 2 + 2 = 8. */
export const EqualGroupsSvg: React.FC<{ className?: string }> = ({ className = DEF }) => (
  <svg viewBox="0 0 320 150" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={MULT2_FONT}>
    <rect x="1" y="1" width="318" height="148" rx="14" fill="#fff7ed" stroke="#fed7aa" />
    <text x="160" y="22" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#7c2d12">
      4 zacskó, mindegyikben 2 golyó
    </text>
    <BagsPart x={52} y={32} groups={4} each={2} bagW={44} gap={14} />
    <text x="160" y="106" textAnchor="middle" fontSize="18" fontWeight="900" fill="#0f172a">
      2 + 2 + 2 + 2 = 8
    </text>
    <text x="160" y="132" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#c2410c">
      Ugyanannyit adunk össze — ez lesz a szorzás!
    </text>
  </svg>
);

/** 3 · 2 = 6 felirattal: tényezők, szorzat. */
export const MultSignSvg: React.FC<{ className?: string }> = ({ className = DEF }) => (
  <svg viewBox="0 0 320 170" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={MULT2_FONT}>
    <rect x="1" y="1" width="318" height="168" rx="14" fill="#eff6ff" stroke="#bfdbfe" />
    <BagsPart x={88} y={12} groups={3} each={2} bagW={38} gap={10} />
    <text x="160" y="80" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#475569">
      3 zacskó, mindegyikben 2
    </text>
    <text x="104" y="114" textAnchor="middle" fontSize="28" fontWeight="900" fill="#1d4ed8">3</text>
    <text x="133" y="114" textAnchor="middle" fontSize="28" fontWeight="900" fill="#dc2626">·</text>
    <text x="162" y="114" textAnchor="middle" fontSize="28" fontWeight="900" fill="#1d4ed8">2</text>
    <text x="193" y="114" textAnchor="middle" fontSize="28" fontWeight="900" fill="#0f172a">=</text>
    <text x="224" y="114" textAnchor="middle" fontSize="28" fontWeight="900" fill="#dc2626">6</text>
    <path d="M 100 124 L 100 132 L 166 132 L 166 124 M 133 132 L 133 140" fill="none" stroke="#1d4ed8" strokeWidth="2" />
    <text x="133" y="154" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1d4ed8">tényezők</text>
    <line x1="224" y1="124" x2="224" y2="140" stroke="#dc2626" strokeWidth="2" />
    <text x="224" y="154" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#dc2626">szorzat</text>
    <text x="290" y="98" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#334155">olvasd:</text>
    <text x="290" y="113" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#334155">háromszor</text>
    <text x="290" y="127" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#334155">kettő</text>
  </svg>
);

/** Rácspontok: 2 sor 5-5 korong = 5 oszlop 2-2 korong. */
export const ArrayCommuteSvg: React.FC<{ className?: string }> = ({ className = DEF }) => (
  <svg viewBox="0 0 340 160" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={MULT2_FONT}>
    <rect x="1" y="1" width="338" height="158" rx="14" fill="#f0fdf4" stroke="#bbf7d0" />
    <text x="85" y="24" textAnchor="middle" fontSize="12.5" fontWeight="bold" fill="#14532d">2 sor, mindben 5</text>
    <ArrayPart x={40} y={50} rows={2} cols={5} step={22} r={8} />
    <text x="85" y="122" textAnchor="middle" fontSize="20" fontWeight="900" fill="#0f172a">2 · 5 = 10</text>
    <line x1="170" y1="20" x2="170" y2="140" stroke="#86efac" strokeWidth="2" strokeDasharray="4 3" />
    <text x="255" y="24" textAnchor="middle" fontSize="12.5" fontWeight="bold" fill="#14532d">5 oszlop, mindben 2</text>
    <ArrayPart x={210} y={50} rows={2} cols={5} step={22} r={8} rowColors={['#22c55e', '#22c55e']} colHighlight />
    <text x="255" y="122" textAnchor="middle" fontSize="20" fontWeight="900" fill="#0f172a">5 · 2 = 10</text>
    <text x="170" y="150" textAnchor="middle" fontSize="12.5" fontWeight="bold" fill="#15803d">
      2 · 5 = 5 · 2 — a tényezők felcserélhetők!
    </text>
  </svg>
);

/** A 2-es szorzótábla a számegyenesen. */
export const TwoTableLineSvg: React.FC<{ className?: string }> = ({ className = DEF }) => (
  <svg viewBox="0 0 280 110" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={MULT2_FONT}>
    <rect x="1" y="1" width="278" height="108" rx="14" fill="#faf5ff" stroke="#e9d5ff" />
    <text x="140" y="20" textAnchor="middle" fontSize="12.5" fontWeight="bold" fill="#581c87">
      Kettesével ugrálunk: 2, 4, 6, 8, … 20
    </text>
    <JumpLinePart x0={18} y={66} unit={11.8} jumps={10} />
    <text x="140" y="102" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#7e22ce">
      10 ugrás · 2 = 20, vagyis 10 · 2 = 20
    </text>
  </svg>
);

/** Kétszerese: 6 bicikli kerekei, 6 · 2 = 12. */
export const BikesDoubleSvg: React.FC<{ className?: string }> = ({ className = DEF }) => (
  <svg viewBox="0 0 320 130" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={MULT2_FONT}>
    <rect x="1" y="1" width="318" height="128" rx="14" fill="#ecfeff" stroke="#a5f3fc" />
    <text x="160" y="22" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#155e75">
      Minden biciklinek 2 kereke van.
    </text>
    {Array.from({ length: 6 }, (_, i) => (
      <BikePart key={i} x={22 + i * 47} y={34} s={1} color={['#2563eb', '#dc2626', '#16a34a', '#9333ea', '#ea580c', '#0891b2'][i]} />
    ))}
    <text x="160" y="86" textAnchor="middle" fontSize="16" fontWeight="900" fill="#0f172a">
      2 + 2 + 2 + 2 + 2 + 2 = 12
    </text>
    <text x="160" y="112" textAnchor="middle" fontSize="18" fontWeight="900" fill="#0e7490">
      6 · 2 = 12
    </text>
  </svg>
);

/** Kétszerese (duplázás): a 7 kétszerese 14. */
export const DoubleSvg: React.FC<{ className?: string }> = ({ className = DEF }) => (
  <svg viewBox="0 0 300 130" className={className} xmlns="http://www.w3.org/2000/svg" fontFamily={MULT2_FONT}>
    <rect x="1" y="1" width="298" height="128" rx="14" fill="#fefce8" stroke="#fde68a" />
    <text x="150" y="22" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#713f12">
      A 7 kétszerese: kétszer 7
    </text>
    <ArrayPart x={90} y={44} rows={2} cols={7} step={20} r={7.5} rowColors={['#f59e0b', '#f97316']} />
    <text x="70" y="49" textAnchor="middle" fontSize="13" fontWeight="900" fill="#b45309">7</text>
    <text x="70" y="69" textAnchor="middle" fontSize="13" fontWeight="900" fill="#c2410c">7</text>
    <text x="150" y="102" textAnchor="middle" fontSize="18" fontWeight="900" fill="#0f172a">
      7 + 7 = 2 · 7 = 7 · 2 = 14
    </text>
    <text x="150" y="121" textAnchor="middle" fontSize="11.5" fontWeight="bold" fill="#a16207">
      A 2-es szorzótábla minden eredménye páros szám.
    </text>
  </svg>
);
