import React from 'react';

interface SvgProps {
  size?: number;
  className?: string;
}

export const CircleCircumferenceDissectionSvg: React.FC<SvgProps> = ({ size = 320, className = '' }) => {
  return (
    <svg viewBox="0 0 380 220" width={size} height={size * 0.58} className={`select-none ${className}`}>
      <rect x="5" y="5" width="370" height="210" rx="12" fill="#ecfeff" stroke="#a5f3fc" strokeWidth="1.5" />
      
      {/* Circle with radius r */}
      <circle cx="80" cy="100" r="55" fill="#cffafe" stroke="#0891b2" strokeWidth="2.5" />
      <line x1="80" y1="100" x2="135" y2="100" stroke="#0e7490" strokeWidth="2" />
      <circle cx="80" cy="100" r="3.5" fill="#0e7490" />
      <text x="105" y="93" fontSize="11" fontWeight="bold" fill="#0e7490">r</text>
      <text x="80" y="175" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0891b2">K = 2rπ</text>
      
      {/* Sector rearrangement into parallelogram */}
      <g transform="translate(170, 50)">
        <rect width="180" height="100" rx="8" fill="#ffffff" stroke="#67e8f9" strokeWidth="1" />
        <path d="M 20 80 L 160 80 L 140 25 L 0 25 Z" fill="#cffafe" stroke="#0891b2" strokeWidth="2" />
        
        {/* Height r indicator */}
        <line x1="140" y1="25" x2="140" y2="80" stroke="#ef4444" strokeWidth="1.8" strokeDasharray="3 2" />
        
        {/* Magyar derékszög a magasságnál: körív + pont */}
        <path d="M 140 68 A 12 12 0 0 0 128 80" fill="none" stroke="#ef4444" strokeWidth="1.5" />
        <circle cx="134" cy="74" r="2" fill="#ef4444" />
        
        <text x="148" y="55" fontSize="11" fontWeight="bold" fill="#ef4444">m = r</text>
        <text x="80" y="95" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0e7490">alap = r · π</text>
        <text x="90" y="18" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#0891b2">T = alap · m = r²π</text>
      </g>
      
      <rect x="25" y="185" width="330" height="20" rx="4" fill="#0891b2" fillOpacity="0.1" />
      <text x="190" y="199" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#0e7490">
        A körcikkeket egymásba fűzve egy r · π alapú és r magasságú téglalapot kapunk
      </text>
    </svg>
  );
};

export const CircularRingAreaSvg: React.FC<SvgProps> = ({ size = 300, className = '' }) => {
  return (
    <svg viewBox="0 0 300 240" width={size} height={size * 0.8} className={`select-none ${className}`}>
      <rect x="5" y="5" width="290" height="230" rx="12" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />
      
      {/* Outer circle R = 80 */}
      <circle cx="150" cy="115" r="80" fill="#bae6fd" stroke="#0284c7" strokeWidth="2" />
      
      {/* Inner circle r = 45 */}
      <circle cx="150" cy="115" r="45" fill="#f8fafc" stroke="#0284c7" strokeWidth="2" />
      
      {/* Center O */}
      <circle cx="150" cy="115" r="3.5" fill="#0369a1" />
      
      {/* Radii */}
      <line x1="150" y1="115" x2="195" y2="115" stroke="#0369a1" strokeWidth="2" />
      <text x="170" y="110" fontSize="10.5" fontWeight="bold" fill="#0369a1">r</text>
      
      <line x1="150" y1="115" x2="206" y2="58" stroke="#0284c7" strokeWidth="2" />
      <text x="185" y="80" fontSize="11" fontWeight="bold" fill="#0284c7">R</text>
      
      <rect x="30" y="200" width="240" height="24" rx="6" fill="#e0f2fe" stroke="#7dd3fc" strokeWidth="1" />
      <text x="150" y="216" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0369a1">
        T_gyűrű = π · (R² - r²)
      </text>
    </svg>
  );
};

export const ArchimedesPiApproximationSvg: React.FC<SvgProps> = ({ size = 300, className = '' }) => {
  return (
    <svg viewBox="0 0 300 220" width={size} height={size * 0.73} className={`select-none ${className}`}>
      <rect x="5" y="5" width="290" height="210" rx="10" fill="#f0fdf4" stroke="#bbf7d0" strokeWidth="1" />
      
      {/* Circle */}
      <circle cx="150" cy="100" r="65" fill="#ecfdf5" stroke="#10b981" strokeWidth="2.5" />
      
      {/* Inscribed hexagon (n = 6) */}
      <polygon
        points="215,100 182.5,156.3 117.5,156.3 85,100 117.5,43.7 182.5,43.7"
        fill="none"
        stroke="#059669"
        strokeWidth="1.8"
        strokeDasharray="4 2"
      />
      
      {/* Center */}
      <circle cx="150" cy="100" r="3" fill="#047857" />
      
      <rect x="25" y="175" width="250" height="24" rx="4" fill="#ffffff" stroke="#86efac" strokeWidth="1" />
      <text x="150" y="191" textAnchor="middle" fontSize="10.5" fontWeight="bold" fill="#047857">
        Arkhimédész: 3,1408 &lt; π &lt; 3,1428 (96-szögekkel)
      </text>
    </svg>
  );
};

export const CircleRadiusMiniSvg: React.FC<SvgProps> = ({ size = 60, className = '' }) => (
  <svg viewBox="0 0 100 100" width={size} height={size} className={`select-none ${className}`}>
    <circle cx="50" cy="50" r="40" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2.5" />
    <line x1="50" y1="50" x2="90" y2="50" stroke="#0369a1" strokeWidth="2.5" />
    <circle cx="50" cy="50" r="3.5" fill="#0369a1" />
    <text x="70" y="44" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#0369a1">r</text>
  </svg>
);

export const CircleDiameterMiniSvg: React.FC<SvgProps> = ({ size = 60, className = '' }) => (
  <svg viewBox="0 0 100 100" width={size} height={size} className={`select-none ${className}`}>
    <circle cx="50" cy="50" r="40" fill="#ecfeff" stroke="#0891b2" strokeWidth="2.5" />
    <line x1="10" y1="50" x2="90" y2="50" stroke="#0e7490" strokeWidth="2.5" />
    <circle cx="50" cy="50" r="3" fill="#0e7490" />
    <text x="50" y="44" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0e7490">d = 2r</text>
  </svg>
);

export const CircularRingMiniSvg: React.FC<SvgProps> = ({ size = 60, className = '' }) => (
  <svg viewBox="0 0 100 100" width={size} height={size} className={`select-none ${className}`}>
    <circle cx="50" cy="50" r="42" fill="#bae6fd" stroke="#0284c7" strokeWidth="2" />
    <circle cx="50" cy="50" r="22" fill="#ffffff" stroke="#0284c7" strokeWidth="2" />
    <circle cx="50" cy="50" r="2.5" fill="#0369a1" />
    <line x1="50" y1="50" x2="72" y2="50" stroke="#0369a1" strokeWidth="1.8" />
    <line x1="50" y1="50" x2="50" y2="8" stroke="#0284c7" strokeWidth="1.8" />
    <text x="60" y="45" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#0369a1">r</text>
    <text x="44" y="24" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#0284c7">R</text>
  </svg>
);

export const SemicircleMiniSvg: React.FC<SvgProps> = ({ size = 60, className = '' }) => (
  <svg viewBox="0 0 100 100" width={size} height={size} className={`select-none ${className}`}>
    <path d="M 12 65 A 38 38 0 0 1 88 65 Z" fill="#dcfce7" stroke="#16a34a" strokeWidth="2.5" />
    <circle cx="50" cy="65" r="3" fill="#15803d" />
    <line x1="50" y1="65" x2="88" y2="65" stroke="#15803d" strokeWidth="2" />
    <text x="69" y="60" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#15803d">r</text>
  </svg>
);

export const SquareInscribedCircleMiniSvg: React.FC<SvgProps> = ({ size = 60, className = '' }) => (
  <svg viewBox="0 0 100 100" width={size} height={size} className={`select-none ${className}`}>
    <rect x="15" y="15" width="70" height="70" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
    <circle cx="50" cy="50" r="35" fill="#dbeafe" stroke="#2563eb" strokeWidth="2" />
    <circle cx="50" cy="50" r="2.5" fill="#1d4ed8" />
    <line x1="50" y1="50" x2="85" y2="50" stroke="#1d4ed8" strokeWidth="1.8" />
    <text x="66" y="45" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#1d4ed8">r=a/2</text>
  </svg>
);

