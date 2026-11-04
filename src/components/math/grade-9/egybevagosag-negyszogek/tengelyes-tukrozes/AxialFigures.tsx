import React from 'react';

interface FigureProps {
  size?: number;
  className?: string;
}

// 1. Tengelyes tükrözés geometriai alapábrája: t tengely, ABC -> A'B'C', merőlegesség, felezőpontok, körüljárási irány megfordulása
export const AxialReflectionBasicsSvg: React.FC<FigureProps> = ({ size = 340, className = '' }) => {
  return (
    <svg
      viewBox="0 0 380 240"
      width={size}
      height={size * 0.63}
      className={`select-none max-w-full h-auto ${className}`}
    >
      <rect x="5" y="5" width="370" height="230" rx="14" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />

      {/* Tükörtengely t (x = 190) */}
      <line x1="190" y1="20" x2="190" y2="215" stroke="#ef4444" strokeWidth="2.5" />
      <text x="198" y="35" fontSize="13" fontWeight="bold" fontStyle="italic" fill="#dc2626">t (tükörtengely)</text>

      {/* Merőleges vetítő vonalak (szaggatott) */}
      {/* A(80, 70) -> A'(300, 70) */}
      <line x1="80" y1="70" x2="300" y2="70" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4 3" />
      {/* B(140, 45) -> B'(240, 45) */}
      <line x1="140" y1="45" x2="240" y2="45" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4 3" />
      {/* C(65, 140) -> C'(315, 140) */}
      <line x1="65" y1="140" x2="315" y2="140" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4 3" />

      {/* Derékszög jel a tengelyen (magyar szabvány: negyedkörív belső ponttal) */}
      <path d="M 182 70 A 8 8 0 0 1 190 62" fill="none" stroke="#64748b" strokeWidth="1.2" />
      <circle cx="186" cy="66" r="1.2" fill="#64748b" />

      {/* Felezőpont egyenlőség jelzése A-A' vonalán */}
      <line x1="133" y1="66" x2="137" y2="74" stroke="#2563eb" strokeWidth="2" />
      <line x1="243" y1="66" x2="247" y2="74" stroke="#059669" strokeWidth="2" />

      {/* Eredeti háromszög ABC: A(80, 70), B(140, 45), C(65, 140) */}
      <polygon points="80,70 140,45 65,140" fill="#3b82f6" fillOpacity="0.2" stroke="#2563eb" strokeWidth="2.5" />
      <circle cx="80" cy="70" r="4" fill="#1d4ed8" />
      <circle cx="140" cy="45" r="4" fill="#1d4ed8" />
      <circle cx="65" cy="140" r="4" fill="#1d4ed8" />
      <text x="70" y="62" fontSize="12" fontWeight="bold" fill="#1e40af">A</text>
      <text x="145" y="40" fontSize="12" fontWeight="bold" fill="#1e40af">B</text>
      <text x="48" y="148" fontSize="12" fontWeight="bold" fill="#1e40af">C</text>
      <text x="90" y="95" fontSize="11" fontWeight="bold" fill="#2563eb">ABC (+)</text>

      {/* Tükörkép háromszög A'B'C': A'(300, 70), B'(240, 45), C'(315, 140) */}
      <polygon points="300,70 240,45 315,140" fill="#10b981" fillOpacity="0.2" stroke="#059669" strokeWidth="2.5" />
      <circle cx="300" cy="70" r="4" fill="#047857" />
      <circle cx="240" cy="45" r="4" fill="#047857" />
      <circle cx="315" cy="140" r="4" fill="#047857" />
      <text x="306" y="65" fontSize="12" fontWeight="bold" fill="#065f46">A'</text>
      <text x="232" y="38" fontSize="12" fontWeight="bold" fill="#065f46">B'</text>
      <text x="322" y="148" fontSize="12" fontWeight="bold" fill="#065f46">C'</text>
      <text x="278" y="95" fontSize="11" fontWeight="bold" fill="#059669">A'B'C' (−)</text>

      {/* Tengelyen fekvő fixpont P = P' */}
      <circle cx="190" cy="175" r="4.5" fill="#f59e0b" stroke="#ffffff" strokeWidth="2" />
      <text x="200" y="179" fontSize="11" fontWeight="bold" fill="#b45309">P = P' (fixpont a tengelyen)</text>

      {/* Alsó jelmagyarázat */}
      <rect x="25" y="195" width="330" height="28" rx="6" fill="#ffffff" stroke="#e2e8f0" />
      <text x="190" y="213" fontSize="10.5" fontWeight="600" fill="#475569" textAnchor="middle">
        t ⊥ PP' és felezi PP'-t • Távolságtartó • Körüljárási irány MEGTAGADÓDIK / MEGFORDUL
      </text>
    </svg>
  );
};

// 2. Koordináta-rendszerbeli tengelyes tükrözések (x tengely, y tengely, y = x egyenes)
export const CoordinateAxialSvg: React.FC<FigureProps> = ({ size = 340, className = '' }) => {
  return (
    <svg
      viewBox="0 0 380 250"
      width={size}
      height={size * 0.66}
      className={`select-none max-w-full h-auto ${className}`}
    >
      <rect x="5" y="5" width="370" height="240" rx="14" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />

      {/* Rács és tengelyek. Origó: (180, 130), 1 egység = 22px */}
      <g stroke="#e2e8f0" strokeWidth="1">
        <line x1="48" y1="20" x2="48" y2="230" />
        <line x1="92" y1="20" x2="92" y2="230" />
        <line x1="136" y1="20" x2="136" y2="230" />
        <line x1="224" y1="20" x2="224" y2="230" />
        <line x1="268" y1="20" x2="268" y2="230" />
        <line x1="312" y1="20" x2="312" y2="230" />

        <line x1="20" y1="42" x2="360" y2="42" />
        <line x1="20" y1="86" x2="360" y2="86" />
        <line x1="20" y1="174" x2="360" y2="174" />
        <line x1="20" y1="218" x2="360" y2="218" />
      </g>

      {/* x és y tengely */}
      <line x1="20" y1="130" x2="360" y2="130" stroke="#64748b" strokeWidth="2" />
      <line x1="180" y1="230" x2="180" y2="20" stroke="#64748b" strokeWidth="2" />
      <text x="350" y="145" fontSize="12" fontWeight="bold" fill="#475569">x</text>
      <text x="188" y="32" fontSize="12" fontWeight="bold" fill="#475569">y</text>

      {/* y = x egyenes (45 fokos, narancs szaggatott) */}
      <line x1="70" y1="240" x2="290" y2="20" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4 3" />
      <text x="295" y="30" fontSize="11" fontWeight="bold" fill="#d97706">y = x</text>

      {/* P(3; 2): (180 + 3*22, 130 - 2*22) = (246, 86) */}
      <circle cx="246" cy="86" r="5" fill="#2563eb" />
      <text x="252" y="82" fontSize="12" fontWeight="bold" fill="#1e40af">P(3; 2)</text>

      {/* P_x(3; -2) -> (246, 174) */}
      <line x1="246" y1="86" x2="246" y2="174" stroke="#10b981" strokeWidth="1.5" strokeDasharray="3 3" />
      <circle cx="246" cy="174" r="5" fill="#10b981" />
      <text x="252" y="188" fontSize="11" fontWeight="bold" fill="#047857">P_x(3; −2)</text>

      {/* P_y(-3; 2) -> (114, 86) */}
      <line x1="246" y1="86" x2="114" y2="86" stroke="#8b5cf6" strokeWidth="1.5" strokeDasharray="3 3" />
      <circle cx="114" cy="86" r="5" fill="#8b5cf6" />
      <text x="50" y="82" fontSize="11" fontWeight="bold" fill="#6d28d9">P_y(−3; 2)</text>

      {/* P_{y=x}(2; 3) -> (180 + 44, 130 - 66) = (224, 64) */}
      <circle cx="224" cy="64" r="4.5" fill="#d97706" />
      <text x="175" y="60" fontSize="11" fontWeight="bold" fill="#b45309">P'(2; 3) [y=x]</text>
    </svg>
  );
};

// 3. Tengelyesen szimmetrikus alakzatok és tengelyeik száma
export const SymmetryAxesShapesSvg: React.FC<FigureProps> = ({ size = 420, className = '' }) => {
  return (
    <svg
      viewBox="0 0 460 210"
      width={size}
      height={size * 0.46}
      className={`select-none max-w-full h-auto ${className}`}
    >
      <rect x="5" y="5" width="450" height="200" rx="14" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />

      {/* 1. Egyenlő szárú háromszög (1 tengely) */}
      <g transform="translate(15, 20)">
        <polygon points="45,15 15,80 75,80" fill="#3b82f6" fillOpacity="0.2" stroke="#2563eb" strokeWidth="2" />
        {/* Szimmetriatengely */}
        <line x1="45" y1="5" x2="45" y2="90" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4 2" />
        <text x="45" y="112" fontSize="11" fontWeight="bold" fill="#1e293b" textAnchor="middle">Egyenlő szárú 3-szög</text>
        <text x="45" y="128" fontSize="10" fontWeight="600" fill="#2563eb" textAnchor="middle">1 tengely</text>
      </g>

      {/* 2. Szabályos háromszög (3 tengely) */}
      <g transform="translate(125, 20)">
        <polygon points="45,15 10,75 80,75" fill="#10b981" fillOpacity="0.2" stroke="#059669" strokeWidth="2" />
        <line x1="45" y1="5" x2="45" y2="85" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 2" />
        <line x1="5" y1="80" x2="65" y2="40" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 2" />
        <line x1="85" y1="80" x2="25" y2="40" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 2" />
        <text x="45" y="112" fontSize="11" fontWeight="bold" fill="#1e293b" textAnchor="middle">Szabályos 3-szög</text>
        <text x="45" y="128" fontSize="10" fontWeight="600" fill="#059669" textAnchor="middle">3 tengely</text>
      </g>

      {/* 3. Téglalap (2 tengely - oldalfelezők!) */}
      <g transform="translate(235, 20)">
        <rect x="10" y="25" width="75" height="50" rx="3" fill="#8b5cf6" fillOpacity="0.2" stroke="#7c3aed" strokeWidth="2" />
        {/* Oldalfelező tengelyek */}
        <line x1="47.5" y1="12" x2="47.5" y2="88" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 2" />
        <line x1="0" y1="50" x2="95" y2="50" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 2" />
        {/* Átlók szaggatva szürkén: NEM tengelyek! */}
        <line x1="10" y1="25" x2="85" y2="75" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="2 2" />
        <text x="47.5" y="112" fontSize="11" fontWeight="bold" fill="#1e293b" textAnchor="middle">Téglalap</text>
        <text x="47.5" y="128" fontSize="10" fontWeight="600" fill="#7c3aed" textAnchor="middle">2 tengely (átlók nem!)</text>
      </g>

      {/* 4. Négyzet (4 tengely) */}
      <g transform="translate(350, 20)">
        <rect x="15" y="20" width="60" height="60" rx="3" fill="#f59e0b" fillOpacity="0.2" stroke="#d97706" strokeWidth="2" />
        <line x1="45" y1="10" x2="45" y2="90" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 2" />
        <line x1="5" y1="50" x2="85" y2="50" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 2" />
        <line x1="10" y1="15" x2="80" y2="85" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 2" />
        <line x1="80" y1="15" x2="10" y2="85" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 2" />
        <text x="45" y="112" fontSize="11" fontWeight="bold" fill="#1e293b" textAnchor="middle">Négyzet</text>
        <text x="45" y="128" fontSize="10" fontWeight="600" fill="#d97706" textAnchor="middle">4 tengely (2 oldalfelező + 2 átló)</text>
      </g>

      {/* Alsó összegzés */}
      <rect x="25" y="160" width="410" height="30" rx="6" fill="#ffffff" stroke="#e2e8f0" />
      <text x="230" y="180" fontSize="11" fontWeight="600" fill="#475569" textAnchor="middle">
        Kör: végtelen sok tengely • Paralelogramma (ha nem rombusz vagy téglalap): 0 tengely!
      </text>
    </svg>
  );
};

