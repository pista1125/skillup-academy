import React from 'react';

interface FigureProps {
  size?: number;
  className?: string;
}

// 1. Négyszögek Családfája és Hierarchiája
export const QuadrilateralHierarchySvg: React.FC<FigureProps> = ({ size = 380, className = '' }) => {
  return (
    <svg
      viewBox="0 0 440 240"
      width={size}
      height={size * 0.55}
      className={`select-none max-w-full h-auto ${className}`}
    >
      <rect x="5" y="5" width="430" height="230" rx="14" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />

      {/* Általános négyszög gyökér */}
      <rect x="155" y="15" width="130" height="30" rx="6" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1.5" />
      <text x="220" y="35" fontSize="11.5" fontWeight="bold" fill="#334155" textAnchor="middle">Általános Négyszög</text>

      {/* Ágak: Trapéz balra, Deltoid jobbra */}
      <line x1="190" y1="45" x2="110" y2="70" stroke="#94a3b8" strokeWidth="1.5" />
      <line x1="250" y1="45" x2="330" y2="70" stroke="#94a3b8" strokeWidth="1.5" />

      {/* Trapéz doboz */}
      <rect x="50" y="70" width="120" height="28" rx="6" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="1.5" />
      <text x="110" y="88" fontSize="11" fontWeight="bold" fill="#0369a1" textAnchor="middle">Trapéz (a || c)</text>

      {/* Deltoid doboz */}
      <rect x="270" y="70" width="120" height="28" rx="6" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" />
      <text x="330" y="88" fontSize="11" fontWeight="bold" fill="#b45309" textAnchor="middle">Deltoid (a=b, c=d)</text>

      {/* Húrtrapéz oldalág balra lent */}
      <line x1="85" y1="98" x2="60" y2="125" stroke="#94a3b8" strokeWidth="1.5" />
      <rect x="10" y="125" width="100" height="28" rx="6" fill="#e0e7ff" stroke="#818cf8" strokeWidth="1.5" />
      <text x="60" y="143" fontSize="10.5" fontWeight="bold" fill="#4338ca" textAnchor="middle">Húrtrapéz</text>

      {/* Paralelogramma középág */}
      <line x1="135" y1="98" x2="185" y2="125" stroke="#94a3b8" strokeWidth="1.5" />
      <rect x="135" y="125" width="115" height="28" rx="6" fill="#dcfce7" stroke="#4ade80" strokeWidth="1.5" />
      <text x="192" y="143" fontSize="11" fontWeight="bold" fill="#15803d" textAnchor="middle">Paralelogramma</text>

      {/* Paralelogrammából: Téglalap balra le, Rombusz jobbra le (Deltoid is beköt rombuszhoz) */}
      <line x1="165" y1="153" x2="120" y2="175" stroke="#94a3b8" strokeWidth="1.5" />
      <line x1="220" y1="153" x2="265" y2="175" stroke="#94a3b8" strokeWidth="1.5" />
      <line x1="330" y1="98" x2="285" y2="175" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 2" />

      {/* Téglalap */}
      <rect x="70" y="175" width="95" height="26" rx="6" fill="#f3e8ff" stroke="#c084fc" strokeWidth="1.5" />
      <text x="117" y="192" fontSize="10.5" fontWeight="bold" fill="#7e22ce" textAnchor="middle">Téglalap (90°)</text>

      {/* Rombusz */}
      <rect x="220" y="175" width="95" height="26" rx="6" fill="#fae8ff" stroke="#f472b6" strokeWidth="1.5" />
      <text x="267" y="192" fontSize="10.5" fontWeight="bold" fill="#be185d" textAnchor="middle">Rombusz (a=b=c=d)</text>

      {/* Téglalap és Rombusz közös metszete: Négyzet */}
      <line x1="120" y1="201" x2="175" y2="215" stroke="#7e22ce" strokeWidth="1.5" />
      <line x1="265" y1="201" x2="215" y2="215" stroke="#be185d" strokeWidth="1.5" />
      <rect x="150" y="212" width="95" height="24" rx="6" fill="#fee2e2" stroke="#ef4444" strokeWidth="2" />
      <text x="197" y="228" fontSize="11" fontWeight="bold" fill="#b91c1c" textAnchor="middle">★ NÉGYZET ★</text>
    </svg>
  );
};

// 2. Átlók Tulajdonságai az egyes négyszögekben
export const QuadrilateralDiagonalsSvg: React.FC<FigureProps> = ({ size = 380, className = '' }) => {
  return (
    <svg
      viewBox="0 0 440 200"
      width={size}
      height={size * 0.45}
      className={`select-none max-w-full h-auto ${className}`}
    >
      <rect x="5" y="5" width="430" height="190" rx="14" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />

      {/* 1. Paralelogramma: felezik egymást */}
      <g transform="translate(15, 20)">
        <rect x="0" y="0" width="95" height="135" rx="8" fill="#f0fdf4" stroke="#bbf7d0" />
        <text x="47" y="18" fontSize="10" fontWeight="bold" fill="#166534" textAnchor="middle">Paralelogramma</text>
        <polygon points="12,105 70,105 82,45 24,45" fill="none" stroke="#16a34a" strokeWidth="1.5" />
        {/* Átlók */}
        <line x1="12" y1="105" x2="82" y2="45" stroke="#dc2626" strokeWidth="1.2" strokeDasharray="2 2" />
        <line x1="70" y1="105" x2="24" y2="45" stroke="#2563eb" strokeWidth="1.2" strokeDasharray="2 2" />
        <circle cx="47" cy="75" r="2.5" fill="#1e293b" />
        <text x="47" y="125" fontSize="9" fontWeight="bold" fill="#15803d" textAnchor="middle">Felezik egymást</text>
      </g>

      {/* 2. Téglalap: egyenlő hosszúak & felezik */}
      <g transform="translate(120, 20)">
        <rect x="0" y="0" width="95" height="135" rx="8" fill="#eff6ff" stroke="#bfdbfe" />
        <text x="47" y="18" fontSize="10" fontWeight="bold" fill="#1e40af" textAnchor="middle">Téglalap</text>
        <rect x="15" y="45" width="65" height="60" fill="none" stroke="#2563eb" strokeWidth="1.5" />
        <line x1="15" y1="45" x2="80" y2="105" stroke="#dc2626" strokeWidth="1.2" />
        <line x1="80" y1="45" x2="15" y2="105" stroke="#dc2626" strokeWidth="1.2" />
        <circle cx="47.5" cy="75" r="2.5" fill="#1e293b" />
        <text x="47" y="125" fontSize="9" fontWeight="bold" fill="#1e40af" textAnchor="middle">e = f és felezik</text>
      </g>

      {/* 3. Rombusz: merőlegesek & felezik & szögfelezők */}
      <g transform="translate(225, 20)">
        <rect x="0" y="0" width="95" height="135" rx="8" fill="#faf5ff" stroke="#e9d5ff" />
        <text x="47" y="18" fontSize="10" fontWeight="bold" fill="#6b21a8" textAnchor="middle">Rombusz</text>
        <polygon points="47,40 85,75 47,110 9,75" fill="none" stroke="#9333ea" strokeWidth="1.5" />
        <line x1="47" y1="40" x2="47" y2="110" stroke="#dc2626" strokeWidth="1.2" />
        <line x1="9" y1="75" x2="85" y2="75" stroke="#dc2626" strokeWidth="1.2" />
        {/* Derékszög jelölés (magyar szabvány: negyedkörív belső ponttal) */}
        <path d="M 47 68 A 7 7 0 0 1 54 75" fill="none" stroke="#64748b" strokeWidth="1.2" />
        <circle cx="50" cy="72" r="1.2" fill="#64748b" />
        <text x="47" y="125" fontSize="9" fontWeight="bold" fill="#6b21a8" textAnchor="middle">e ⊥ f és felezik</text>
      </g>

      {/* 4. Deltoid: merőlegesek & szimmetriaátló felezi a másikat */}
      <g transform="translate(330, 20)">
        <rect x="0" y="0" width="95" height="135" rx="8" fill="#fffbeb" stroke="#fde68a" />
        <text x="47" y="18" fontSize="10" fontWeight="bold" fill="#92400e" textAnchor="middle">Deltoid</text>
        <polygon points="47,35 80,65 47,115 14,65" fill="none" stroke="#d97706" strokeWidth="1.5" />
        <line x1="47" y1="35" x2="47" y2="115" stroke="#dc2626" strokeWidth="1.5" />
        <line x1="14" y1="65" x2="80" y2="65" stroke="#2563eb" strokeWidth="1.2" strokeDasharray="2 2" />
        {/* Derékszög jel (magyar szabvány: negyedkörív belső ponttal) */}
        <path d="M 47 58 A 7 7 0 0 1 54 65" fill="none" stroke="#64748b" strokeWidth="1.2" />
        <circle cx="50" cy="62" r="1.2" fill="#64748b" />
        <text x="47" y="125" fontSize="9" fontWeight="bold" fill="#b45309" textAnchor="middle">e ⊥ f és f₁ = f₂</text>
      </g>

      {/* Összefoglaló alsó sor */}
      <rect x="25" y="165" width="390" height="24" rx="5" fill="#f1f5f9" stroke="#cbd5e1" />
      <text x="220" y="181" fontSize="10" fontWeight="bold" fill="#334155" textAnchor="middle">
        Négyzet: mind a 4 tulajdonság egyszerre teljesül (e = f, e ⊥ f, felezik egymást és szögfelezők)!
      </text>
    </svg>
  );
};

// 3. Húrnégyszögek és Érintőnégyszögek
export const CyclicTangentialSvg: React.FC<FigureProps> = ({ size = 380, className = '' }) => {
  return (
    <svg
      viewBox="0 0 440 210"
      width={size}
      height={size * 0.48}
      className={`select-none max-w-full h-auto ${className}`}
    >
      <rect x="5" y="5" width="430" height="200" rx="14" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />

      {/* Bal oldal: Húrnégyszög (Köré írható kör) */}
      <g transform="translate(25, 20)">
        <rect x="0" y="0" width="185" height="155" rx="8" fill="#eff6ff" stroke="#bfdbfe" />
        <text x="92" y="20" fontSize="11" fontWeight="bold" fill="#1e40af" textAnchor="middle">Húrnégyszög</text>
        <text x="92" y="34" fontSize="9.5" fontWeight="600" fill="#2563eb" textAnchor="middle">Köré írható kör</text>

        {/* Kör r=45 (92, 85) */}
        <circle cx="92" cy="90" r="46" fill="none" stroke="#93c5fd" strokeWidth="1.5" strokeDasharray="3 2" />

        {/* 4 csúcs a körön */}
        <polygon
          points="60,56 128,62 135,112 68,132"
          fill="#dbeafe"
          stroke="#1d4ed8"
          strokeWidth="1.8"
        />
        <text x="50" y="60" fontSize="10" fontWeight="bold" fill="#1e40af">α</text>
        <text x="142" y="120" fontSize="10" fontWeight="bold" fill="#1e40af">γ</text>

        <text x="92" y="148" fontSize="10" fontWeight="bold" fill="#1e3a8a" textAnchor="middle">
          α + γ = β + δ = 180°
        </text>
      </g>

      {/* Jobb oldal: Érintőnégyszög (Beírt kör) */}
      <g transform="translate(230, 20)">
        <rect x="0" y="0" width="185" height="155" rx="8" fill="#f0fdf4" stroke="#bbf7d0" />
        <text x="92" y="20" fontSize="11" fontWeight="bold" fill="#166534" textAnchor="middle">Érintőnégyszög</text>
        <text x="92" y="34" fontSize="9.5" fontWeight="600" fill="#059669" textAnchor="middle">Beírt kör (érinti az oldalakat)</text>

        {/* Négyszög */}
        <polygon
          points="40,55 145,45 160,135 25,125"
          fill="#dcfce7"
          stroke="#059669"
          strokeWidth="1.8"
        />
        {/* Beírt kör */}
        <circle cx="92" cy="90" r="38" fill="none" stroke="#16a34a" strokeWidth="1.5" />
        <circle cx="92" cy="90" r="2.5" fill="#166534" />

        {/* Oldaljelölések */}
        <text x="92" y="42" fontSize="9.5" fontWeight="bold" fill="#15803d" textAnchor="middle">a</text>
        <text x="160" y="92" fontSize="9.5" fontWeight="bold" fill="#15803d">b</text>
        <text x="92" y="142" fontSize="9.5" fontWeight="bold" fill="#15803d" textAnchor="middle">c</text>
        <text x="20" y="92" fontSize="9.5" fontWeight="bold" fill="#15803d">d</text>

        <text x="92" y="148" fontSize="10" fontWeight="bold" fill="#14532d" textAnchor="middle">
          a + c = b + d (Pithot-tétel)
        </text>
      </g>

      {/* Alsó lábjegyzet */}
      <text x="220" y="195" fontSize="10" fontWeight="bold" fill="#475569" textAnchor="middle">
        Húrtrapéz & Téglalap: Húrnégyszög • Deltoid & Rombusz: Érintőnégyszög • Négyzet: Mindkettő!
      </text>
    </svg>
  );
};

