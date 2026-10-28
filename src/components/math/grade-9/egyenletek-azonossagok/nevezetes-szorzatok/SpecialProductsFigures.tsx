import React from 'react';

interface FigureProps {
  size?: number;
  className?: string;
}

// 1. Kéttagú Összeg Négyzete Geometriai Területmodell: (a + b)² = a² + 2ab + b²
export const SumSquareSvg: React.FC<FigureProps> = ({ size = 200, className = '' }) => {
  return (
    <svg
      viewBox="0 0 360 210"
      width={size}
      height={size * 0.58}
      className={`select-none max-w-full h-auto ${className}`}
    >
      <rect x="10" y="10" width="340" height="190" rx="16" fill="#faf5ff" stroke="#d8b4fe" strokeWidth="2" />

      <text x="180" y="30" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#6b21a8" fontFamily="system-ui, sans-serif">
        (a + b)² = a² + 2ab + b² (Összeg négyzete)
      </text>

      {/* Geometriai négyzet felbontás */}
      <g transform="translate(105, 45)">
        {/* Nagy négyzet: a² */}
        <rect x="0" y="0" width="85" height="85" fill="#c084fc" stroke="#7e22ce" strokeWidth="2" />
        <text x="42" y="49" textAnchor="middle" fontSize="18" fontWeight="black" fill="#ffffff" fontFamily="monospace">a²</text>

        {/* Felső téglalap: ab */}
        <rect x="85" y="0" width="55" height="85" fill="#e9d5ff" stroke="#7e22ce" strokeWidth="2" />
        <text x="112" y="49" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#6b21a8" fontFamily="monospace">ab</text>

        {/* Alsó téglalap: ab */}
        <rect x="0" y="85" width="85" height="55" fill="#e9d5ff" stroke="#7e22ce" strokeWidth="2" />
        <text x="42" y="118" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#6b21a8" fontFamily="monospace">ab</text>

        {/* Kis négyzet: b² */}
        <rect x="85" y="85" width="55" height="55" fill="#a855f7" stroke="#7e22ce" strokeWidth="2" />
        <text x="112" y="118" textAnchor="middle" fontSize="16" fontWeight="black" fill="#ffffff" fontFamily="monospace">b²</text>

        {/* Méretezési feliratok */}
        <text x="42" y="-8" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#7e22ce" fontFamily="monospace">a</text>
        <text x="112" y="-8" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#7e22ce" fontFamily="monospace">b</text>
        <text x="-12" y="49" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#7e22ce" fontFamily="monospace">a</text>
        <text x="-12" y="118" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#7e22ce" fontFamily="monospace">b</text>
      </g>
    </svg>
  );
};

// 2. Két Tag Összegének és Különbségének Szorzata: (a + b)(a - b) = a² - b²
export const SumDiffProductSvg: React.FC<FigureProps> = ({ size = 200, className = '' }) => {
  return (
    <svg
      viewBox="0 0 360 180"
      width={size}
      height={size * 0.5}
      className={`select-none max-w-full h-auto ${className}`}
    >
      <rect x="10" y="10" width="340" height="160" rx="16" fill="#fdf4ff" stroke="#f0abfc" strokeWidth="2" />

      <text x="180" y="32" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#86198f" fontFamily="system-ui, sans-serif">
        (a + b)(a - b) = a² - b² (Négyzetek különbsége)
      </text>

      {/* Ábra: a² négyzetből kivágunk b² négyzetet */}
      <g transform="translate(45, 50)">
        {/* a² négyzet alap */}
        <rect x="0" y="0" width="90" height="90" fill="#f5d0fe" stroke="#c026d3" strokeWidth="2" />
        <text x="40" y="55" textAnchor="middle" fontSize="18" fontWeight="black" fill="#701a75" fontFamily="monospace">a² - b²</text>

        {/* Kivágott b² kis sarok */}
        <rect x="65" y="0" width="25" height="25" fill="#fce7f3" stroke="#db2777" strokeWidth="2" strokeDasharray="3 3" />
        <text x="77" y="17" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#be185d" fontFamily="monospace">b²</text>
      </g>

      {/* Nyíl és egyenlőség */}
      <g transform="translate(160, 95)" textAnchor="middle">
        <text x="0" y="6" fontSize="24" fontWeight="bold" fill="#a21caf">=</text>
      </g>

      {/* Átrendezett téglalap: (a + b) × (a - b) */}
      <g transform="translate(195, 60)">
        <rect x="0" y="0" width="125" height="65" rx="8" fill="#e879f9" stroke="#a21caf" strokeWidth="2" />
        <text x="62" y="38" textAnchor="middle" fontSize="14" fontWeight="black" fill="#ffffff" fontFamily="monospace">
          (a + b) · (a - b)
        </text>
        <text x="62" y="-6" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#86198f" fontFamily="monospace">
          hosszúság = a + b
        </text>
        <text x="-12" y="37" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#86198f" fontFamily="monospace">
          a - b
        </text>
      </g>
    </svg>
  );
};

// 3. Különbség Négyzete: (a - b)² = a² - 2ab + b²
export const DiffSquareSvg: React.FC<FigureProps> = ({ size = 200, className = '' }) => {
  return (
    <svg
      viewBox="0 0 360 180"
      width={size}
      height={size * 0.5}
      className={`select-none max-w-full h-auto ${className}`}
    >
      <rect x="10" y="10" width="340" height="160" rx="16" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="2" />

      <text x="180" y="32" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#334155" fontFamily="system-ui, sans-serif">
        (a - b)² = a² - 2ab + b² (Különbség négyzete)
      </text>

      {/* Ábra */}
      <g transform="translate(110, 48)">
        <rect x="0" y="0" width="80" height="80" fill="#a855f7" stroke="#6b21a8" strokeWidth="2" />
        <text x="40" y="46" textAnchor="middle" fontSize="16" fontWeight="black" fill="#ffffff" fontFamily="monospace">
          (a - b)²
        </text>

        {/* b sávok */}
        <rect x="80" y="0" width="30" height="80" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3 3" />
        <rect x="0" y="80" width="80" height="30" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3 3" />
        <rect x="80" y="80" width="30" height="30" fill="#fef08a" stroke="#ca8a04" strokeWidth="1.5" />
        <text x="95" y="100" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#854d0e" fontFamily="monospace">+b²</text>

        {/* Méretek */}
        <text x="40" y="-6" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#6b21a8" fontFamily="monospace">a - b</text>
        <text x="95" y="-6" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#64748b" fontFamily="monospace">b</text>
      </g>
    </svg>
  );
};

// 4. Gyors Fejszámolás Trükk Ábra
export const MentalMathSvg: React.FC<FigureProps> = ({ size = 200, className = '' }) => {
  return (
    <svg
      viewBox="0 0 360 170"
      width={size}
      height={size * 0.47}
      className={`select-none max-w-full h-auto ${className}`}
    >
      <rect x="10" y="10" width="340" height="150" rx="16" fill="#f5f3ff" stroke="#ddd6fe" strokeWidth="2" />

      <text x="180" y="32" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#5b21b6" fontFamily="system-ui, sans-serif">
        Villámgyors Fejszámolás Azonossággal
      </text>

      {/* 51 · 49 felírás */}
      <g transform="translate(40, 52)">
        <rect width="110" height="42" rx="10" fill="#ffffff" stroke="#8b5cf6" strokeWidth="2" />
        <text x="55" y="27" textAnchor="middle" fontSize="18" fontWeight="black" fill="#6d28d9" fontFamily="monospace">
          51 · 49
        </text>
      </g>

      {/* Nyíl */}
      <text x="175" y="78" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#7c3aed">→</text>

      {/* Kifejtés */}
      <g transform="translate(200, 52)">
        <rect width="120" height="42" rx="10" fill="#7c3aed" />
        <text x="60" y="27" textAnchor="middle" fontSize="16" fontWeight="black" fill="#ffffff" fontFamily="monospace">
          50² - 1²
        </text>
      </g>

      {/* Eredmény */}
      <text x="180" y="130" textAnchor="middle" fontSize="15" fontWeight="black" fill="#4c1d95" fontFamily="monospace">
        = 2500 - 1 = 2499
      </text>
    </svg>
  );
};
