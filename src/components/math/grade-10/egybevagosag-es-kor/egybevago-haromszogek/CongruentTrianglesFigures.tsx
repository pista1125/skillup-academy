import React from 'react';

interface SvgProps {
  size?: number;
  className?: string;
}

export const IsoscelesTriangleSymmetrySvg: React.FC<SvgProps> = ({ size = 320, className = '' }) => {
  return (
    <svg viewBox="0 0 340 240" width={size} height={size * 0.7} className={`select-none ${className}`}>
      <rect x="5" y="5" width="330" height="230" rx="12" fill="#f0fdfa" stroke="#ccfbf1" strokeWidth="1.5" />
      
      {/* Triangle ABC */}
      <polygon points="50,200 290,200 170,40" fill="#ccfbf1" stroke="#0d9488" strokeWidth="2.5" />
      
      {/* Altitude / Median / Angle Bisector m_c */}
      <line x1="170" y1="40" x2="170" y2="200" stroke="#0f766e" strokeWidth="2" strokeDasharray="5 3" />
      
      {/* Magyar derékszög jelölés a talppontban: negyedkörív + PONT */}
      <path d="M 190 200 A 20 20 0 0 1 170 180" fill="none" stroke="#0f766e" strokeWidth="1.8" />
      <circle cx="178" cy="192" r="2.5" fill="#0f766e" />
      
      {/* Equal angles at the base */}
      <path d="M 85 200 A 35 35 0 0 0 68 175" fill="none" stroke="#0d9488" strokeWidth="2" />
      <text x="80" y="190" fontSize="11" fontWeight="bold" fill="#0f766e">α</text>
      
      <path d="M 255 200 A 35 35 0 0 1 272 175" fill="none" stroke="#0d9488" strokeWidth="2" />
      <text x="250" y="190" fontSize="11" fontWeight="bold" fill="#0f766e">α</text>
      
      {/* Split base markers */}
      <circle cx="110" cy="200" r="3" fill="#0f766e" />
      <circle cx="230" cy="200" r="3" fill="#0f766e" />
      <text x="110" y="215" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#0f766e">a/2</text>
      <text x="230" y="215" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#0f766e">a/2</text>
      
      {/* Equal leg markers (tick) */}
      <line x1="105" y1="123" x2="115" y2="117" stroke="#0f766e" strokeWidth="2.5" />
      <text x="95" y="115" fontSize="12" fontWeight="bold" fill="#0f766e">b</text>
      
      <line x1="225" y1="117" x2="235" y2="123" stroke="#0f766e" strokeWidth="2.5" />
      <text x="240" y="115" fontSize="12" fontWeight="bold" fill="#0f766e">b</text>
      
      {/* Vertex labels */}
      <circle cx="50" cy="200" r="4" fill="#0f766e" />
      <text x="35" y="215" fontSize="12" fontWeight="bold" fill="#134e4a">A</text>
      
      <circle cx="290" cy="200" r="4" fill="#0f766e" />
      <text x="295" y="215" fontSize="12" fontWeight="bold" fill="#134e4a">B</text>
      
      <circle cx="170" cy="40" r="4" fill="#0f766e" />
      <text x="170" y="28" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#134e4a">C</text>
      
      <circle cx="170" cy="200" r="3.5" fill="#0f766e" />
      <text x="170" y="222" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#134e4a">F (felezőpont)</text>
    </svg>
  );
};

export const PerpendicularBisectorProofSvg: React.FC<SvgProps> = ({ size = 320, className = '' }) => {
  return (
    <svg viewBox="0 0 340 220" width={size} height={size * 0.65} className={`select-none ${className}`}>
      <rect x="5" y="5" width="330" height="210" rx="10" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
      
      {/* Segment AB */}
      <line x1="60" y1="160" x2="280" y2="160" stroke="#334155" strokeWidth="2.5" />
      
      {/* Perpendicular Bisector line e */}
      <line x1="170" y1="20" x2="170" y2="200" stroke="#0ea5e9" strokeWidth="2" strokeDasharray="6 3" />
      <text x="180" y="35" fontSize="11" fontWeight="bold" fill="#0284c7">e (felezőmerőleges)</text>
      
      {/* Point P on bisector */}
      <line x1="60" y1="160" x2="170" y2="60" stroke="#6366f1" strokeWidth="2" />
      <line x1="280" y1="160" x2="170" y2="60" stroke="#6366f1" strokeWidth="2" />
      <circle cx="170" cy="60" r="5" fill="#4f46e5" />
      <text x="170" y="50" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#4338ca">P</text>
      <text x="105" y="105" fontSize="11" fontWeight="bold" fill="#4f46e5">PA</text>
      <text x="230" y="105" fontSize="11" fontWeight="bold" fill="#4f46e5">PB</text>
      
      {/* Hungarian right angle symbol at midpoint F: arc + dot */}
      <path d="M 190 160 A 20 20 0 0 1 170 140" fill="none" stroke="#0284c7" strokeWidth="1.8" />
      <circle cx="178" cy="152" r="2.5" fill="#0284c7" />
      
      <circle cx="60" cy="160" r="4" fill="#334155" />
      <text x="45" y="175" fontSize="12" fontWeight="bold" fill="#1e293b">A</text>
      
      <circle cx="280" cy="160" r="4" fill="#334155" />
      <text x="285" y="175" fontSize="12" fontWeight="bold" fill="#1e293b">B</text>
      
      <circle cx="170" cy="160" r="4" fill="#0284c7" />
      <text x="170" y="180" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#0369a1">F (AF = FB)</text>
      
      <rect x="55" y="190" width="230" height="20" rx="4" fill="#ede9fe" />
      <text x="170" y="204" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#4338ca">
        △AFP ≅ △BFP (o, sz, o) ⟹ PA = PB
      </text>
    </svg>
  );
};

export const ParallelogramDiagonalsSvg: React.FC<SvgProps> = ({ size = 320, className = '' }) => {
  return (
    <svg viewBox="0 0 360 200" width={size} height={size * 0.55} className={`select-none ${className}`}>
      <rect x="5" y="5" width="350" height="190" rx="10" fill="#f5f3ff" stroke="#ddd6fe" strokeWidth="1" />
      
      {/* Parallelogram ABCD */}
      <polygon points="50,150 250,150 310,50 110,50" fill="#ede9fe" stroke="#7c3aed" strokeWidth="2.5" />
      
      {/* Diagonals AC and BD */}
      <line x1="50" y1="150" x2="310" y2="50" stroke="#db2777" strokeWidth="1.8" />
      <line x1="110" y1="50" x2="250" y2="150" stroke="#2563eb" strokeWidth="1.8" />
      
      {/* Intersection O */}
      <circle cx="180" cy="100" r="4.5" fill="#4c1d95" />
      <text x="180" y="90" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#4c1d95">O</text>
      
      {/* Vertices */}
      <circle cx="50" cy="150" r="4" fill="#7c3aed" />
      <text x="35" y="165" fontSize="12" fontWeight="bold" fill="#5b21b6">A</text>
      
      <circle cx="250" cy="150" r="4" fill="#7c3aed" />
      <text x="255" y="165" fontSize="12" fontWeight="bold" fill="#5b21b6">B</text>
      
      <circle cx="310" cy="50" r="4" fill="#7c3aed" />
      <text x="315" y="45" fontSize="12" fontWeight="bold" fill="#5b21b6">C</text>
      
      <circle cx="110" cy="50" r="4" fill="#7c3aed" />
      <text x="95" y="45" fontSize="12" fontWeight="bold" fill="#5b21b6">D</text>
      
      <rect x="60" y="172" width="240" height="18" rx="4" fill="#ffffff" stroke="#c4b5fd" strokeWidth="1" />
      <text x="180" y="185" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#6d28d9">
        △ABO ≅ △CDO (ASA) ⟹ AO = OC és BO = OD
      </text>
    </svg>
  );
};

export const IsoscelesMiniSvg: React.FC<SvgProps> = ({ size = 80, className = '' }) => (
  <svg viewBox="0 0 100 70" width={size} className={`select-none ${className}`}>
    <polygon points="15,60 85,60 50,15" fill="#ccfbf1" stroke="#0d9488" strokeWidth="2" />
    <line x1="50" y1="15" x2="50" y2="60" stroke="#0f766e" strokeWidth="1.5" strokeDasharray="3 2" />
    <path d="M 50 50 A 10 10 0 0 1 60 60" fill="none" stroke="#0f766e" strokeWidth="1" />
    <circle cx="54" cy="56" r="1" fill="#0f766e" />
    <line x1="30" y1="36" x2="36" y2="40" stroke="#0d9488" strokeWidth="1.5" />
    <line x1="64" y1="36" x2="70" y2="40" stroke="#0d9488" strokeWidth="1.5" />
  </svg>
);

export const PerpendicularBisectorMiniSvg: React.FC<SvgProps> = ({ size = 80, className = '' }) => (
  <svg viewBox="0 0 100 70" width={size} className={`select-none ${className}`}>
    <line x1="15" y1="50" x2="85" y2="50" stroke="#334155" strokeWidth="2" />
    <line x1="50" y1="10" x2="50" y2="65" stroke="#0ea5e9" strokeWidth="1.8" strokeDasharray="3 2" />
    <line x1="15" y1="50" x2="50" y2="20" stroke="#6366f1" strokeWidth="1.5" />
    <line x1="85" y1="50" x2="50" y2="20" stroke="#6366f1" strokeWidth="1.5" />
    <circle cx="50" cy="20" r="3" fill="#4f46e5" />
    <path d="M 50 42 A 8 8 0 0 1 58 50" fill="none" stroke="#0ea5e9" strokeWidth="1" />
    <circle cx="53" cy="47" r="1" fill="#0ea5e9" />
  </svg>
);

export const ParallelogramMiniSvg: React.FC<SvgProps> = ({ size = 80, className = '' }) => (
  <svg viewBox="0 0 100 70" width={size} className={`select-none ${className}`}>
    <polygon points="15,55 75,55 90,20 30,20" fill="#ede9fe" stroke="#7c3aed" strokeWidth="2" />
    <line x1="15" y1="55" x2="90" y2="20" stroke="#db2777" strokeWidth="1.2" />
    <line x1="30" y1="20" x2="75" y2="55" stroke="#2563eb" strokeWidth="1.2" />
    <circle cx="52.5" cy="37.5" r="2.5" fill="#4c1d95" />
  </svg>
);

export const KiteMiniSvg: React.FC<SvgProps> = ({ size = 80, className = '' }) => (
  <svg viewBox="0 0 100 70" width={size} className={`select-none ${className}`}>
    <polygon points="50,10 80,35 50,65 20,35" fill="#fdf4ff" stroke="#c026d3" strokeWidth="2" />
    <line x1="50" y1="10" x2="50" y2="65" stroke="#a21caf" strokeWidth="1.5" />
    <line x1="20" y1="35" x2="80" y2="35" stroke="#a21caf" strokeWidth="1.2" strokeDasharray="2 2" />
    <path d="M 50 28 A 7 7 0 0 1 57 35" fill="none" stroke="#a21caf" strokeWidth="1" />
    <circle cx="53" cy="32" r="1" fill="#a21caf" />
  </svg>
);
