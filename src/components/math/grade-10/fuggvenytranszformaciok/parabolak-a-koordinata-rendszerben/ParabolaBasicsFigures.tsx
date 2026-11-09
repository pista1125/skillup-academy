import React from 'react';

interface FigureProps {
  size?: number;
  className?: string;
}

/**
 * 1. Normálparabola: f(x) = x² alapfüggvény
 * Koordináta-rendszer, szimmetriatengely (y-tengely), csúcspont (0;0),
 * és nevezetes rácspontok (-2,4), (-1,1), (0,0), (1,1), (2,4).
 */
export const NormalParabolaSvg: React.FC<FigureProps> = ({ size = 260, className = '' }) => {
  return (
    <svg
      viewBox="0 0 320 260"
      width={size}
      height={(size * 260) / 320}
      className={`mx-auto select-none ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="gridPattern" width="25" height="25" patternUnits="userSpaceOnUse">
          <path d="M 25 0 L 0 0 0 25" fill="none" stroke="#F1F5F9" strokeWidth="1" />
        </pattern>
      </defs>

      {/* Grid background */}
      <rect x="20" y="20" width="280" height="220" fill="url(#gridPattern)" rx="8" />

      {/* Coordinate Axes: Origin at (160, 200) */}
      {/* X axis */}
      <line x1="25" y1="200" x2="295" y2="200" stroke="#64748B" strokeWidth="2" />
      <polygon points="300,200 292,196 292,204" fill="#64748B" />
      <text x="295" y="218" fill="#64748B" fontSize="11" fontWeight="bold">x</text>

      {/* Y axis (Symmetry axis) */}
      <line x1="160" y1="230" x2="160" y2="25" stroke="#3B82F6" strokeWidth="2" strokeDasharray="4 2" />
      <polygon points="160,20 156,28 164,28" fill="#3B82F6" />
      <text x="172" y="25" fill="#3B82F6" fontSize="11" fontWeight="bold">y (tengely)</text>

      {/* Tick marks on X: 1 unit = 30px */}
      {/* -2: 100, -1: 130, 0: 160, 1: 190, 2: 220 */}
      <line x1="100" y1="197" x2="100" y2="203" stroke="#64748B" strokeWidth="1.5" />
      <text x="100" y="215" fill="#64748B" fontSize="10" textAnchor="middle">-2</text>
      <line x1="130" y1="197" x2="130" y2="203" stroke="#64748B" strokeWidth="1.5" />
      <text x="130" y="215" fill="#64748B" fontSize="10" textAnchor="middle">-1</text>
      <line x1="190" y1="197" x2="190" y2="203" stroke="#64748B" strokeWidth="1.5" />
      <text x="190" y="215" fill="#64748B" fontSize="10" textAnchor="middle">1</text>
      <line x1="220" y1="197" x2="220" y2="203" stroke="#64748B" strokeWidth="1.5" />
      <text x="220" y="215" fill="#64748B" fontSize="10" textAnchor="middle">2</text>

      {/* Parabola curve: f(x) = x² -> (0,200), (1, 165), (2, 60), (-1, 165), (-2, 60) */}
      {/* 1 unit in y = 35px */}
      <path
        d="M 90 35 Q 160 270 230 35"
        stroke="#2563EB"
        strokeWidth="3.5"
        strokeLinecap="round"
      />

      {/* Characteristic points */}
      <circle cx="160" cy="200" r="5" fill="#2563EB" stroke="#FFFFFF" strokeWidth="2" />
      <text x="160" y="225" fill="#1E40AF" fontSize="10" fontWeight="bold" textAnchor="middle">T(0; 0)</text>

      <circle cx="190" cy="165" r="4" fill="#3B82F6" stroke="#FFFFFF" strokeWidth="1.5" />
      <text x="208" y="168" fill="#475569" fontSize="9">(1; 1)</text>

      <circle cx="130" cy="165" r="4" fill="#3B82F6" stroke="#FFFFFF" strokeWidth="1.5" />
      <text x="112" y="168" fill="#475569" fontSize="9">(-1; 1)</text>

      <circle cx="220" cy="60" r="4" fill="#3B82F6" stroke="#FFFFFF" strokeWidth="1.5" />
      <text x="238" y="63" fill="#475569" fontSize="9">(2; 4)</text>

      <circle cx="100" cy="60" r="4" fill="#3B82F6" stroke="#FFFFFF" strokeWidth="1.5" />
      <text x="82" y="63" fill="#475569" fontSize="9">(-2; 4)</text>

      {/* Formula badge */}
      <rect x="25" y="30" width="85" height="24" rx="6" fill="#EFF6FF" stroke="#BFDBFE" />
      <text x="67" y="46" fill="#1D4ED8" fontSize="11" fontWeight="bold" textAnchor="middle">f(x) = x²</text>
    </svg>
  );
};

/**
 * 2. Függőleges eltolás az y-tengely mentén: f(x) = x² ± c
 * Szemlélteti a felfelé (x² + 2) és lefelé (x² - 3) mozgatott parabolákat.
 */
export const VerticalShiftSvg: React.FC<FigureProps> = ({ size = 280, className = '' }) => {
  return (
    <svg
      viewBox="0 0 340 240"
      width={size}
      height={(size * 240) / 340}
      className={`mx-auto select-none ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Grid */}
      <line x1="30" y1="160" x2="310" y2="160" stroke="#CBD5E1" strokeWidth="1.5" />
      <line x1="170" y1="20" x2="170" y2="225" stroke="#CBD5E1" strokeWidth="1.5" />
      <polygon points="315,160 307,156 307,164" fill="#94A3B8" />
      <polygon points="170,15 166,23 174,23" fill="#94A3B8" />
      <text x="310" y="176" fill="#64748B" fontSize="10" fontWeight="bold">x</text>
      <text x="178" y="22" fill="#64748B" fontSize="10" fontWeight="bold">y</text>

      {/* Original Parabola y = x² (grey dash) */}
      <path d="M 120 40 Q 170 215 220 40" stroke="#94A3B8" strokeWidth="2" strokeDasharray="4 3" />
      <circle cx="170" cy="160" r="3.5" fill="#94A3B8" />
      <text x="156" y="174" fill="#94A3B8" fontSize="9">x²</text>

      {/* Upward Shift: y = x² + 2 (shifted up by 40px -> vertex at (170, 120)) */}
      <path d="M 120 20 Q 170 175 220 20" stroke="#10B981" strokeWidth="3" />
      <circle cx="170" cy="120" r="4.5" fill="#10B981" stroke="#FFFFFF" strokeWidth="1.5" />
      <text x="178" y="115" fill="#047857" fontSize="10" fontWeight="bold">T(0; 2)</text>
      {/* Up arrow */}
      <line x1="170" y1="155" x2="170" y2="125" stroke="#10B981" strokeWidth="2" />
      <polygon points="170,123 167,130 173,130" fill="#10B981" />

      {/* Downward Shift: y = x² - 3 (shifted down by 45px -> vertex at (170, 205)) */}
      <path d="M 115 85 Q 170 260 225 85" stroke="#F59E0B" strokeWidth="3" />
      <circle cx="170" cy="205" r="4.5" fill="#F59E0B" stroke="#FFFFFF" strokeWidth="1.5" />
      <text x="178" y="212" fill="#B45309" fontSize="10" fontWeight="bold">T(0; -3)</text>
      {/* Down arrow */}
      <line x1="170" y1="165" x2="170" y2="198" stroke="#F59E0B" strokeWidth="2" />
      <polygon points="170,201 167,194 173,194" fill="#F59E0B" />

      {/* Zero crossings of x² - 3 */}
      <circle cx="140" cy="160" r="3" fill="#D97706" />
      <circle cx="200" cy="160" r="3" fill="#D97706" />
      <text x="140" y="152" fill="#B45309" fontSize="8" textAnchor="middle">-√3</text>
      <text x="200" y="152" fill="#B45309" fontSize="8" textAnchor="middle">+√3</text>

      {/* Labels */}
      <rect x="15" y="15" width="95" height="22" rx="5" fill="#ECFDF5" stroke="#A7F3D0" />
      <text x="62" y="30" fill="#047857" fontSize="10" fontWeight="bold" textAnchor="middle">
        f(x) = x² + 2 (Fel)
      </text>

      <rect x="230" y="195" width="95" height="22" rx="5" fill="#FFFBEB" stroke="#FDE68A" />
      <text x="277" y="210" fill="#B45309" fontSize="10" fontWeight="bold" textAnchor="middle">
        g(x) = x² - 3 (Le)
      </text>
    </svg>
  );
};

/**
 * 3. Vízszintes eltolás az x-tengely mentén: f(x) = (x ∓ u)²
 * Jobbra: (x - 3)², Balra: (x + 2)² eltolások szemléltetése.
 */
export const HorizontalShiftSvg: React.FC<FigureProps> = ({ size = 280, className = '' }) => {
  return (
    <svg
      viewBox="0 0 350 220"
      width={size}
      height={(size * 220) / 350}
      className={`mx-auto select-none ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* X and Y axes: Origin at (150, 160) */}
      <line x1="20" y1="160" x2="330" y2="160" stroke="#64748B" strokeWidth="2" />
      <line x1="150" y1="20" x2="150" y2="190" stroke="#94A3B8" strokeWidth="1.5" />
      <polygon points="335,160 327,156 327,164" fill="#64748B" />
      <text x="325" y="178" fill="#64748B" fontSize="10" fontWeight="bold">x</text>
      <text x="156" y="25" fill="#94A3B8" fontSize="10">y</text>

      {/* Base parabola x² at origin (150, 160) */}
      <path d="M 110 50 Q 150 205 190 50" stroke="#94A3B8" strokeWidth="2" strokeDasharray="3 3" />
      <circle cx="150" cy="160" r="3.5" fill="#94A3B8" />
      <text x="150" y="175" fill="#94A3B8" fontSize="9" textAnchor="middle">0</text>

      {/* Shift Right: (x - 3)² -> Vertex at (240, 160) */}
      <path d="M 200 50 Q 240 205 280 50" stroke="#2563EB" strokeWidth="3" />
      <circle cx="240" cy="160" r="4.5" fill="#2563EB" stroke="#FFFFFF" strokeWidth="1.5" />
      <text x="240" y="178" fill="#1D4ED8" fontSize="10" fontWeight="bold" textAnchor="middle">+3</text>
      {/* Right arrow */}
      <line x1="155" y1="140" x2="235" y2="140" stroke="#2563EB" strokeWidth="2" />
      <polygon points="237,140 230,137 230,143" fill="#2563EB" />
      <text x="195" y="132" fill="#1D4ED8" fontSize="9" fontWeight="bold" textAnchor="middle">
        jobbra 3
      </text>

      {/* Shift Left: (x + 2)² -> Vertex at (80, 160) */}
      <path d="M 40 50 Q 80 205 120 50" stroke="#7C3AED" strokeWidth="3" />
      <circle cx="80" cy="160" r="4.5" fill="#7C3AED" stroke="#FFFFFF" strokeWidth="1.5" />
      <text x="80" y="178" fill="#5B21B6" fontSize="10" fontWeight="bold" textAnchor="middle">-2</text>
      {/* Left arrow */}
      <line x1="145" y1="140" x2="85" y2="140" stroke="#7C3AED" strokeWidth="2" />
      <polygon points="83,140 90,137 90,143" fill="#7C3AED" />
      <text x="115" y="132" fill="#5B21B6" fontSize="9" fontWeight="bold" textAnchor="middle">
        balra 2
      </text>

      {/* Formula Badges */}
      <rect x="25" y="15" width="105" height="24" rx="6" fill="#F5F3FF" stroke="#DDD6FE" />
      <text x="77" y="31" fill="#6D28D9" fontSize="10" fontWeight="bold" textAnchor="middle">
        f(x) = (x + 2)² (Balra!)
      </text>

      <rect x="220" y="15" width="105" height="24" rx="6" fill="#EFF6FF" stroke="#BFDBFE" />
      <text x="272" y="31" fill="#1D4ED8" fontSize="10" fontWeight="bold" textAnchor="middle">
        g(x) = (x - 3)² (Jobbra!)
      </text>
    </svg>
  );
};

/**
 * 4. A páratlan lépések szabálya a rajzoláshoz (Ráadás módszer)
 * 1 jobbra, 1 fel -> 1 jobbra, 3 fel -> 1 jobbra, 5 fel
 */
export const ParabolaOddStepSvg: React.FC<FigureProps> = ({ size = 260, className = '' }) => {
  return (
    <svg
      viewBox="0 0 320 220"
      width={size}
      height={(size * 220) / 320}
      className={`mx-auto select-none ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="stepGrid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#E2E8F0" strokeWidth="1" />
        </pattern>
      </defs>

      <rect x="20" y="15" width="280" height="190" fill="url(#stepGrid)" rx="6" />

      {/* Origin at (70, 180) */}
      <line x1="40" y1="180" x2="280" y2="180" stroke="#64748B" strokeWidth="2" />
      <line x1="70" y1="20" x2="70" y2="200" stroke="#64748B" strokeWidth="2" />
      <circle cx="70" cy="180" r="4" fill="#1E293B" />
      <text x="58" y="195" fill="#475569" fontSize="10">(0; 0)</text>

      {/* Step 1: 1 right (30px), 1 up (15px) -> (100, 165) */}
      <line x1="70" y1="180" x2="100" y2="180" stroke="#3B82F6" strokeWidth="2" />
      <line x1="100" y1="180" x2="100" y2="165" stroke="#10B981" strokeWidth="2.5" />
      <circle cx="100" cy="165" r="4" fill="#2563EB" />
      <text x="115" y="175" fill="#059669" fontSize="10" fontWeight="bold">+1 fel</text>

      {/* Step 2: 1 right (30px), 3 up (45px) -> (130, 120) */}
      <line x1="100" y1="165" x2="130" y2="165" stroke="#3B82F6" strokeWidth="2" />
      <line x1="130" y1="165" x2="130" y2="120" stroke="#10B981" strokeWidth="2.5" />
      <circle cx="130" cy="120" r="4" fill="#2563EB" />
      <text x="145" y="145" fill="#059669" fontSize="10" fontWeight="bold">+3 fel</text>

      {/* Step 3: 1 right (30px), 5 up (75px) -> (160, 45) */}
      <line x1="130" y1="120" x2="160" y2="120" stroke="#3B82F6" strokeWidth="2" />
      <line x1="160" y1="120" x2="160" y2="45" stroke="#10B981" strokeWidth="2.5" />
      <circle cx="160" cy="45" r="4" fill="#2563EB" />
      <text x="175" y="85" fill="#059669" fontSize="10" fontWeight="bold">+5 fel</text>

      {/* Parabola curve */}
      <path d="M 70 180 Q 115 165 160 45" stroke="#2563EB" strokeWidth="2.5" />

      {/* Explanation pill */}
      <rect x="180" y="25" width="115" height="52" rx="8" fill="#F0FDF4" stroke="#BBF7D0" />
      <text x="237" y="42" fill="#166534" fontSize="10" fontWeight="bold" textAnchor="middle">
        Páratlan lépések:
      </text>
      <text x="237" y="57" fill="#15803D" fontSize="10" textAnchor="middle">
        1 + 3 = 4 = 2²
      </text>
      <text x="237" y="70" fill="#15803D" fontSize="10" textAnchor="middle">
        1 + 3 + 5 = 9 = 3²
      </text>
    </svg>
  );
};

