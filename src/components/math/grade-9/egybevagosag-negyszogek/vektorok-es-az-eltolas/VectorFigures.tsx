import React from 'react';

interface FigureProps {
  size?: number;
  className?: string;
}

// 1. Vektor alapfogalmai: Kezdőpont A, Végpont B, Irány, Állás, Hossz (|v|) és Ellentett vektor (-v)
export const VectorBasicsSvg: React.FC<FigureProps> = ({ size = 320, className = '' }) => {
  return (
    <svg
      viewBox="0 0 380 230"
      width={size}
      height={size * 0.6}
      className={`select-none max-w-full h-auto ${className}`}
    >
      <defs>
        <marker id="vArrowBlue" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#2563eb" />
        </marker>
        <marker id="vArrowRed" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#ef4444" />
        </marker>
      </defs>

      <rect x="5" y="5" width="370" height="220" rx="14" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />

      {/* Hordozó egyenes (szaggatott, állást jelképezi) */}
      <line x1="25" y1="125" x2="355" y2="45" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="5 4" />
      <text x="330" y="38" fontSize="11" fontStyle="italic" fill="#94a3b8">hordozó egyenes (állás)</text>

      {/* Fő vektor: v = AB (A: 60, 116; B: 240, 72) */}
      <line x1="60" y1="116" x2="236" y2="73" stroke="#2563eb" strokeWidth="3" markerEnd="url(#vArrowBlue)" />
      <circle cx="60" cy="116" r="4.5" fill="#1d4ed8" />
      <text x="52" y="136" fontSize="13" fontWeight="bold" fill="#1e40af">A (kezdőpont)</text>
      <text x="235" y="62" fontSize="13" fontWeight="bold" fill="#1e40af">B (végpont)</text>
      <text x="145" y="80" fontSize="14" fontWeight="bold" fill="#2563eb">v = AB</text>

      {/* Hossz |v| jelölés párhuzamos vonallal */}
      <line x1="65" y1="130" x2="235" y2="88" stroke="#64748b" strokeWidth="1" strokeDasharray="2 2" />
      <text x="140" y="122" fontSize="11" fontWeight="bold" fill="#475569">hossz = |v|</text>

      {/* Ellentett vektor: -v (jobbról balra, lefelé) */}
      <line x1="330" y1="150" x2="194" y2="183" stroke="#ef4444" strokeWidth="2.5" markerEnd="url(#vArrowRed)" />
      <circle cx="330" cy="150" r="4" fill="#dc2626" />
      <text x="245" y="165" fontSize="12" fontWeight="bold" fill="#dc2626">−v (ellentett)</text>

      {/* Alsó megjegyzés doboz */}
      <rect x="25" y="190" width="330" height="26" rx="6" fill="#ffffff" stroke="#e2e8f0" />
      <text x="190" y="207" fontSize="10.5" fontWeight="600" fill="#475569" textAnchor="middle">
        3 alaptulajdonság: Hossz (|v| ≥ 0) • Állás (párhuzamosság) • Irány (nyíl)
      </text>
    </svg>
  );
};

// 2. Vektorműveletek: Háromszög-szabály és Paralelogramma-szabály
export const VectorAdditionSvg: React.FC<FigureProps> = ({ size = 360, className = '' }) => {
  return (
    <svg
      viewBox="0 0 440 230"
      width={size}
      height={size * 0.52}
      className={`select-none max-w-full h-auto ${className}`}
    >
      <defs>
        <marker id="vaBlue" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#2563eb" />
        </marker>
        <marker id="vaGreen" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#059669" />
        </marker>
        <marker id="vaPurple" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#7c3aed" />
        </marker>
        <marker id="vaAmber" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#d97706" />
        </marker>
      </defs>

      <rect x="5" y="5" width="430" height="220" rx="14" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />

      {/* BAL OLDAL: Háromszög-szabály */}
      <g transform="translate(15, 10)">
        <text x="95" y="24" fontSize="12" fontWeight="bold" fill="#1e293b" textAnchor="middle">1. Háromszög-szabály</text>
        <text x="95" y="38" fontSize="10" fill="#64748b" textAnchor="middle">Láncszerű egymás után illesztés</text>

        {/* Vektor a: (20, 140) -> (100, 140) */}
        <line x1="20" y1="140" x2="94" y2="140" stroke="#2563eb" strokeWidth="2.5" markerEnd="url(#vaBlue)" />
        <text x="55" y="156" fontSize="12" fontWeight="bold" fill="#2563eb">a</text>

        {/* Vektor b: (100, 140) -> (170, 75) */}
        <line x1="100" y1="140" x2="166" y2="79" stroke="#059669" strokeWidth="2.5" markerEnd="url(#vaGreen)" />
        <text x="145" y="120" fontSize="12" fontWeight="bold" fill="#059669">b</text>

        {/* Összegvektor: a + b: (20, 140) -> (170, 75) */}
        <line x1="20" y1="140" x2="166" y2="78" stroke="#7c3aed" strokeWidth="3" markerEnd="url(#vaPurple)" strokeDasharray="5 3" />
        <text x="75" y="95" fontSize="12" fontWeight="bold" fill="#7c3aed">a + b</text>

        <text x="95" y="185" fontSize="10.5" fontWeight="600" fill="#475569" textAnchor="middle">
          AB + BC = AC
        </text>
      </g>

      {/* Elválasztó vonal */}
      <line x1="210" y1="20" x2="210" y2="200" stroke="#e2e8f0" strokeWidth="1.5" />

      {/* JOBB OLDAL: Paralelogramma-szabály */}
      <g transform="translate(230, 10)">
        <text x="95" y="24" fontSize="12" fontWeight="bold" fill="#1e293b" textAnchor="middle">2. Paralelogramma-szabály</text>
        <text x="95" y="38" fontSize="10" fill="#64748b" textAnchor="middle">Közös kezdőpontból indítva</text>

        {/* Közös kezdőpont O: (20, 140) */}
        {/* Vektor a: (20, 140) -> (100, 140) */}
        <line x1="20" y1="140" x2="94" y2="140" stroke="#2563eb" strokeWidth="2.5" markerEnd="url(#vaBlue)" />
        <text x="60" y="156" fontSize="12" fontWeight="bold" fill="#2563eb">a</text>

        {/* Vektor b: (20, 140) -> (90, 75) */}
        <line x1="20" y1="140" x2="86" y2="79" stroke="#059669" strokeWidth="2.5" markerEnd="url(#vaGreen)" />
        <text x="40" y="100" fontSize="12" fontWeight="bold" fill="#059669">b</text>

        {/* Kiegészítő paralelogramma oldalak (szaggatva) */}
        <line x1="100" y1="140" x2="170" y2="75" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3 3" />
        <line x1="90" y1="75" x2="170" y2="75" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3 3" />

        {/* Főátló: a + b (20, 140) -> (170, 75) */}
        <line x1="20" y1="140" x2="165" y2="78" stroke="#7c3aed" strokeWidth="3" markerEnd="url(#vaPurple)" />
        <text x="110" y="102" fontSize="12" fontWeight="bold" fill="#7c3aed">a + b (átló)</text>

        {/* Másik átló: a - b (b végpontjából az a végpontjába: (90, 75) -> (100, 140)) */}
        <line x1="90" y1="75" x2="98" y2="134" stroke="#d97706" strokeWidth="2" markerEnd="url(#vaAmber)" strokeDasharray="4 2" />
        <text x="112" y="125" fontSize="11" fontWeight="bold" fill="#d97706">a − b</text>

        <text x="95" y="185" fontSize="10.5" fontWeight="600" fill="#475569" textAnchor="middle">
          Főátló = összeg • Mellékátló = különbség
        </text>
      </g>
    </svg>
  );
};

// 3. Eltolás mint egybevágósági transzformáció: ABC -> A'B'C' a v vektorral
export const TranslationSvg: React.FC<FigureProps> = ({ size = 340, className = '' }) => {
  return (
    <svg
      viewBox="0 0 380 230"
      width={size}
      height={size * 0.6}
      className={`select-none max-w-full h-auto ${className}`}
    >
      <defs>
        <marker id="trArrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#10b981" />
        </marker>
        <marker id="trArrowMain" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#059669" />
        </marker>
      </defs>

      <rect x="5" y="5" width="370" height="220" rx="14" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />

      {/* Eltolási vektor v minta jobb felső sarokban: (dx=140, dy=-30) */}
      <rect x="220" y="20" width="135" height="42" rx="8" fill="#ecfdf5" stroke="#a7f3d0" />
      <line x1="235" y1="45" x2="310" y2="35" stroke="#059669" strokeWidth="2.5" markerEnd="url(#trArrowMain)" />
      <text x="275" y="30" fontSize="12" fontWeight="bold" fill="#065f46">v (eltolásvektor)</text>

      {/* Eredeti háromszög ABC: A(50, 160), B(120, 170), C(80, 100) */}
      <polygon points="50,160 120,170 80,100" fill="#3b82f6" fillOpacity="0.2" stroke="#2563eb" strokeWidth="2" />
      <circle cx="50" cy="160" r="4" fill="#1d4ed8" />
      <circle cx="120" cy="170" r="4" fill="#1d4ed8" />
      <circle cx="80" cy="100" r="4" fill="#1d4ed8" />
      <text x="35" y="170" fontSize="12" fontWeight="bold" fill="#1e40af">A</text>
      <text x="126" y="180" fontSize="12" fontWeight="bold" fill="#1e40af">B</text>
      <text x="75" y="90" fontSize="12" fontWeight="bold" fill="#1e40af">C</text>
      <text x="75" y="150" fontSize="11" fontWeight="bold" fill="#2563eb">ABC</text>

      {/* Kép háromszög A'B'C': dx=150, dy=-30 -> A'(200, 130), B'(270, 140), C'(230, 70) */}
      <polygon points="200,130 270,140 230,70" fill="#10b981" fillOpacity="0.2" stroke="#059669" strokeWidth="2" />
      <circle cx="200" cy="130" r="4" fill="#047857" />
      <circle cx="270" cy="140" r="4" fill="#047857" />
      <circle cx="230" cy="70" r="4" fill="#047857" />
      <text x="206" y="145" fontSize="12" fontWeight="bold" fill="#065f46">A'</text>
      <text x="278" y="150" fontSize="12" fontWeight="bold" fill="#065f46">B'</text>
      <text x="235" y="65" fontSize="12" fontWeight="bold" fill="#065f46">C'</text>
      <text x="225" y="120" fontSize="11" fontWeight="bold" fill="#059669">A'B'C'</text>

      {/* Eltolási vektorok csúcsok között (AA', BB', CC') */}
      <line x1="50" y1="160" x2="194" y2="131" stroke="#10b981" strokeWidth="1.5" strokeDasharray="4 3" markerEnd="url(#trArrow)" />
      <line x1="120" y1="170" x2="264" y2="141" stroke="#10b981" strokeWidth="1.5" strokeDasharray="4 3" markerEnd="url(#trArrow)" />
      <line x1="80" y1="100" x2="224" y2="71" stroke="#10b981" strokeWidth="1.5" strokeDasharray="4 3" markerEnd="url(#trArrow)" />

      {/* Felirat lent */}
      <text x="190" y="210" fontSize="11" fontWeight="600" fill="#475569" textAnchor="middle">
        AA' = BB' = CC' = v • Távolságtartó • Körüljárási irány megmarad
      </text>
    </svg>
  );
};

// 4. Skalárral szorzás: v, 2v, 0.5v, -1.5v
export const ScalarMultiplicationSvg: React.FC<FigureProps> = ({ size = 340, className = '' }) => {
  return (
    <svg
      viewBox="0 0 380 210"
      width={size}
      height={size * 0.55}
      className={`select-none max-w-full h-auto ${className}`}
    >
      <defs>
        <marker id="scBlue" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#2563eb" />
        </marker>
        <marker id="scGreen" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#059669" />
        </marker>
        <marker id="scPurple" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#7c3aed" />
        </marker>
        <marker id="scRed" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto">
          <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#ef4444" />
        </marker>
      </defs>

      <rect x="5" y="5" width="370" height="200" rx="14" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />

      {/* 1. Alapvektor v (hossz = 60) */}
      <g transform="translate(30, 25)">
        <line x1="0" y1="15" x2="54" y2="15" stroke="#2563eb" strokeWidth="2.5" markerEnd="url(#scBlue)" />
        <circle cx="0" cy="15" r="3.5" fill="#1d4ed8" />
        <text x="75" y="19" fontSize="12" fontWeight="bold" fill="#1e40af">v (alapvektor)</text>
      </g>

      {/* 2. 2v (hossz = 120, azonos irány) */}
      <g transform="translate(30, 65)">
        <line x1="0" y1="15" x2="114" y2="15" stroke="#059669" strokeWidth="2.5" markerEnd="url(#scGreen)" />
        <circle cx="0" cy="15" r="3.5" fill="#047857" />
        <text x="135" y="19" fontSize="12" fontWeight="bold" fill="#065f46">2v (kétszeres hossz, azonos irány)</text>
      </g>

      {/* 3. 0.5v (hossz = 30) */}
      <g transform="translate(30, 105)">
        <line x1="0" y1="15" x2="26" y2="15" stroke="#7c3aed" strokeWidth="2.5" markerEnd="url(#scPurple)" />
        <circle cx="0" cy="15" r="3.5" fill="#6d28d9" />
        <text x="45" y="19" fontSize="12" fontWeight="bold" fill="#6d28d9">0,5v (felezett hossz)</text>
      </g>

      {/* 4. -1.5v (hossz = 90, ellentétes irány!) */}
      <g transform="translate(30, 145)">
        <line x1="90" y1="15" x2="6" y2="15" stroke="#ef4444" strokeWidth="2.5" markerEnd="url(#scRed)" />
        <circle cx="90" cy="15" r="3.5" fill="#dc2626" />
        <text x="110" y="19" fontSize="12" fontWeight="bold" fill="#dc2626">−1,5v (másfélszeres, ellentétes irány!)</text>
      </g>
    </svg>
  );
};

