import React from 'react';

interface SvgProps {
  size?: number;
  className?: string;
}

/**
 * TransformSynthesisSvg:
 * Shows the mother parabola f(x) = x² and multiple canonical transformations:
 * - g(x) = (x - 2)² + 1 (shifted right 2, up 1)
 * - h(x) = -0.5(x + 2)² + 3 (shifted left 2, up 3, compressed vertically, flipped)
 * Precision Bézier curves touching their vertices, grid lines, and target-ring markers.
 */
export const TransformSynthesisSvg: React.FC<SvgProps> = ({ size = 320, className = '' }) => {
  return (
    <svg
      viewBox="-50 -50 400 340"
      width={size}
      height={size * 0.85}
      className={`select-none overflow-visible drop-shadow-sm ${className}`}
    >
      <defs>
        <pattern id="pt-grid" width="25" height="25" patternUnits="userSpaceOnUse">
          <path d="M 25 0 L 0 0 0 25" fill="none" stroke="currentColor" strokeOpacity="0.08" strokeWidth="1" />
        </pattern>
        <marker id="pt-arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="currentColor" opacity="0.6" />
        </marker>
      </defs>

      <rect x="-40" y="-40" width="380" height="320" rx="12" fill="url(#pt-grid)" />

      {/* Origin at (150, 150), 1 unit = 25px */}
      <line x1="-30" y1="150" x2="330" y2="150" stroke="currentColor" strokeWidth="1.6" opacity="0.6" markerEnd="url(#pt-arrow)" />
      <line x1="150" y1="270" x2="150" y2="-30" stroke="currentColor" strokeWidth="1.6" opacity="0.6" markerEnd="url(#pt-arrow)" />

      <text x="320" y="142" fontSize="11" fill="currentColor" opacity="0.7" fontWeight="bold">x</text>
      <text x="158" y="-22" fontSize="11" fill="currentColor" opacity="0.7" fontWeight="bold">y</text>
      <text x="136" y="166" fontSize="10" fill="currentColor" opacity="0.6" fontWeight="bold">0</text>

      {/* Mother function f(x) = x² (grey dashed)
          Vertex at (150, 150). w = 50, y0 = 50. yc = 2*150 - 50 = 250. Apex = 150! */}
      <path
        d="M 100 50 Q 150 250 200 50"
        fill="none"
        stroke="#94a3b8"
        strokeWidth="2"
        strokeDasharray="4 3"
      />
      <circle cx="150" cy="150" r="4" fill="#94a3b8" />
      <text x="75" y="42" fontSize="10" fill="#94a3b8" fontWeight="bold">f(x) = x²</text>

      {/* Function 1: g(x) = (x - 2)² + 1
          Vertex at (2, 1) -> (150 + 50 = 200, 150 - 25 = 125).
          w = 50, y0 = 25. yc = 2*125 - 25 = 225. Apex = 125! */}
      <path
        d="M 150 25 Q 200 225 250 25"
        fill="none"
        stroke="#8b5cf6"
        strokeWidth="2.8"
        strokeLinecap="round"
      />
      <circle cx="200" cy="125" r="7" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="1.5" opacity="0.8" />
      <circle cx="200" cy="125" r="4" fill="#8b5cf6" stroke="#ffffff" strokeWidth="1.5" />
      <rect x="210" y="115" width="55" height="18" rx="4" fill="#f5f3ff" stroke="#ddd6fe" strokeWidth="0.8" />
      <text x="237" y="128" fontSize="9" fill="#7c3aed" fontWeight="bold" textAnchor="middle">V₁(2; 1)</text>
      <text x="245" y="18" fontSize="10" fill="#8b5cf6" fontWeight="bold">g(x) = (x-2)² + 1</text>

      {/* Function 2: h(x) = -0.5(x + 2)² + 3
          Vertex at (-2, 3) -> (150 - 50 = 100, 150 - 75 = 75).
          w = 75, y0 = 225. yc = 2*75 - 225 = -75. Apex = 75! */}
      <path
        d="M 25 225 Q 100 -75 175 225"
        fill="none"
        stroke="#f43f5e"
        strokeWidth="2.8"
        strokeLinecap="round"
      />
      <circle cx="100" cy="75" r="7" fill="#ffe4e6" stroke="#f43f5e" strokeWidth="1.5" opacity="0.8" />
      <circle cx="100" cy="75" r="4" fill="#f43f5e" stroke="#ffffff" strokeWidth="1.5" />
      <rect x="110" y="65" width="58" height="18" rx="4" fill="#fff1f2" stroke="#fecdd3" strokeWidth="0.8" />
      <text x="139" y="78" fontSize="9" fill="#e11d48" fontWeight="bold" textAnchor="middle">V₂(-2; 3)</text>
      <text x="-5" y="240" fontSize="10" fill="#f43f5e" fontWeight="bold">h(x) = -0.5(x+2)² + 3</text>
    </svg>
  );
};

/**
 * FoldedAbsoluteSvg:
 * Demonstrates the outer absolute value fold:
 * f(x) = x² - 4x + 3 -> roots at 1 and 3, vertex at (2; -1).
 * |f(x)| = |x² - 4x + 3|: the bottom arc between x=1 and x=3 flips up to peak at (2; 1).
 * Precision apex alignment with dual target markers.
 */
export const FoldedAbsoluteSvg: React.FC<SvgProps> = ({ size = 320, className = '' }) => {
  return (
    <svg
      viewBox="-30 -30 360 280"
      width={size}
      height={size * 0.8}
      className={`select-none overflow-visible drop-shadow-sm ${className}`}
    >
      <defs>
        <pattern id="pt-grid-abs" width="25" height="25" patternUnits="userSpaceOnUse">
          <path d="M 25 0 L 0 0 0 25" fill="none" stroke="currentColor" strokeOpacity="0.08" strokeWidth="1" />
        </pattern>
        <marker id="pt-arrow-abs" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="currentColor" opacity="0.6" />
        </marker>
      </defs>

      <rect x="-20" y="-20" width="340" height="260" rx="12" fill="url(#pt-grid-abs)" />

      {/* Axes: Origin (0,0) at (80, 150). 1 unit = 35px */}
      <line x1="20" y1="150" x2="300" y2="150" stroke="currentColor" strokeWidth="1.6" opacity="0.6" markerEnd="url(#pt-arrow-abs)" />
      <line x1="80" y1="230" x2="80" y2="-15" stroke="currentColor" strokeWidth="1.6" opacity="0.6" markerEnd="url(#pt-arrow-abs)" />

      <text x="290" y="142" fontSize="11" fill="currentColor" opacity="0.7" fontWeight="bold">x</text>
      <text x="88" y="-6" fontSize="11" fill="currentColor" opacity="0.7" fontWeight="bold">y</text>

      {/* Ticks: x=1 -> 115, x=2 -> 150, x=3 -> 185 */}
      <text x="110" y="166" fontSize="9" fill="currentColor" opacity="0.6">1</text>
      <text x="146" y="166" fontSize="9" fill="currentColor" opacity="0.6">2</text>
      <text x="180" y="166" fontSize="9" fill="currentColor" opacity="0.6">3</text>

      {/* Eredeti negatív ív (Szürke szaggatott lent)
          y0 = 150, yv = 185 (-1 egység). yc = 2*185 - 150 = 220. Apex = 185! */}
      <path
        d="M 115 150 Q 150 220 185 150"
        fill="none"
        stroke="#94a3b8"
        strokeWidth="2"
        strokeDasharray="3 3"
      />
      <circle cx="150" cy="185" r="4" fill="#94a3b8" />
      <text x="160" y="196" fontSize="9" fill="#94a3b8" fontWeight="bold">Eredeti csúcs (2; -1)</text>

      {/* Felhajtott pozitív görbe |f(x)| */}
      {/* Bal szár */}
      <path
        d="M 60 45 Q 80 90 115 150"
        fill="none"
        stroke="#8b5cf6"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* Felhajtott középső ív: y0 = 150, yv = 115 (+1 egység). yc = 2*115 - 150 = 80. Apex = 115! */}
      <path
        d="M 115 150 Q 150 80 185 150"
        fill="none"
        stroke="#8b5cf6"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* Jobb szár */}
      <path
        d="M 185 150 Q 220 90 240 45"
        fill="none"
        stroke="#8b5cf6"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* Felhajtott csúcspont (2; 1) céltárcsával */}
      <circle cx="150" cy="115" r="7" fill="#ffe4e6" stroke="#f43f5e" strokeWidth="1.5" opacity="0.8" />
      <circle cx="150" cy="115" r="4" fill="#f43f5e" stroke="#ffffff" strokeWidth="1.5" />
      <rect x="160" y="105" width="115" height="18" rx="4" fill="#fff1f2" stroke="#fecdd3" strokeWidth="0.8" />
      <text x="217" y="118" fontSize="9" fill="#e11d48" fontWeight="bold" textAnchor="middle">Felhajtott csúcs (2; 1)</text>

      {/* Zérushelyek (töréspontok) */}
      <circle cx="115" cy="150" r="4.5" fill="#8b5cf6" stroke="#ffffff" strokeWidth="1.5" />
      <circle cx="185" cy="150" r="4.5" fill="#8b5cf6" stroke="#ffffff" strokeWidth="1.5" />

      <rect x="180" y="15" width="140" height="22" rx="4" fill="#f5f3ff" stroke="#c4b5fd" strokeWidth="1" />
      <text x="250" y="30" fontSize="10" fill="#6d28d9" fontWeight="bold" textAnchor="middle">|f(x)| = |x² - 4x + 3|</text>
    </svg>
  );
};

/**
 * BoundedDomainParabolaSvg:
 * Demonstrates a parabola on a restricted domain D_f = [-1; 3]
 * f(x) = x² - 2x
 * Vertex at x = 1 (inside domain), f(1) = -1 (minimum)
 * Left endpoint: f(-1) = 3
 * Right endpoint: f(3) = 3
 * Range: [-1; 3]
 */
export const BoundedDomainParabolaSvg: React.FC<SvgProps> = ({ size = 300, className = '' }) => {
  return (
    <svg
      viewBox="-30 -30 360 280"
      width={size}
      height={size * 0.8}
      className={`select-none overflow-visible drop-shadow-sm ${className}`}
    >
      <defs>
        <pattern id="pt-grid-bd" width="25" height="25" patternUnits="userSpaceOnUse">
          <path d="M 25 0 L 0 0 0 25" fill="none" stroke="currentColor" strokeOpacity="0.08" strokeWidth="1" />
        </pattern>
        <marker id="pt-arrow-bd" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="currentColor" opacity="0.6" />
        </marker>
      </defs>

      <rect x="-20" y="-20" width="340" height="260" rx="10" fill="url(#pt-grid-bd)" />

      {/* Axes: Origin (0,0) at (120, 140), 1 unit = 30px */}
      <line x1="20" y1="140" x2="300" y2="140" stroke="currentColor" strokeWidth="1.6" opacity="0.6" markerEnd="url(#pt-arrow-bd)" />
      <line x1="120" y1="230" x2="120" y2="-15" stroke="currentColor" strokeWidth="1.6" opacity="0.6" markerEnd="url(#pt-arrow-bd)" />

      <text x="290" y="132" fontSize="11" fill="currentColor" opacity="0.7" fontWeight="bold">x</text>
      <text x="128" y="-6" fontSize="11" fill="currentColor" opacity="0.7" fontWeight="bold">y</text>
      <text x="106" y="155" fontSize="10" fill="currentColor" opacity="0.6" fontWeight="bold">0</text>

      {/* Domain highlight on x-axis: [-1; 3] -> x from 90 to 210 */}
      <line x1="90" y1="140" x2="210" y2="140" stroke="#8b5cf6" strokeWidth="3" opacity="0.5" />
      <rect x="90" y="145" width="120" height="18" rx="4" fill="#8b5cf6" fillOpacity="0.15" stroke="#ddd6fe" strokeWidth="0.8" />
      <text x="150" y="158" fontSize="9" fill="#7c3aed" fontWeight="bold" textAnchor="middle">D_f = [-1; 3]</text>

      {/* Parabola arc on [-1; 3]:
          f(x) = x² - 2x = (x - 1)² - 1
          Vertex at (1; -1) -> (120 + 30 = 150, 140 + 30 = 170).
          Apex y = 170 => yc = 2 * 170 - 50 = 290 */}
      <path
        d="M 90 50 Q 150 290 210 50"
        fill="none"
        stroke="#8b5cf6"
        strokeWidth="3.2"
        strokeLinecap="round"
      />

      {/* Solid endpoints with coordinates */}
      <circle cx="90" cy="50" r="7" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="1.5" opacity="0.8" />
      <circle cx="90" cy="50" r="4.5" fill="#8b5cf6" stroke="#ffffff" strokeWidth="1.5" />
      <rect x="35" y="38" width="50" height="18" rx="4" fill="#f5f3ff" stroke="#ddd6fe" strokeWidth="0.8" />
      <text x="60" y="51" fontSize="9" fill="#7c3aed" fontWeight="bold" textAnchor="middle">(-1; 3)</text>

      <circle cx="210" cy="50" r="7" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="1.5" opacity="0.8" />
      <circle cx="210" cy="50" r="4.5" fill="#8b5cf6" stroke="#ffffff" strokeWidth="1.5" />
      <rect x="215" y="38" width="50" height="18" rx="4" fill="#f5f3ff" stroke="#ddd6fe" strokeWidth="0.8" />
      <text x="240" y="51" fontSize="9" fill="#7c3aed" fontWeight="bold" textAnchor="middle">(3; 3)</text>

      {/* Global Minimum (Vertex V(1; -1)) with target-ring marker */}
      <circle cx="150" cy="170" r="8" fill="#ffe4e6" stroke="#f43f5e" strokeWidth="1.5" opacity="0.8" />
      <circle cx="150" cy="170" r="4.5" fill="#f43f5e" stroke="#ffffff" strokeWidth="1.5" />
      <rect x="105" y="180" width="90" height="18" rx="4" fill="#fff1f2" stroke="#fecdd3" strokeWidth="0.8" />
      <text x="150" y="193" fontSize="9" fill="#e11d48" fontWeight="bold" textAnchor="middle">Min: V(1; -1)</text>

      {/* Range [ -1; 3 ] highlight on y-axis */}
      <line x1="120" y1="170" x2="120" y2="50" stroke="#10b981" strokeWidth="3.5" opacity="0.8" strokeLinecap="round" />
      <rect x="25" y="100" width="90" height="20" rx="4" fill="#ecfdf5" stroke="#a7f3d0" strokeWidth="0.8" />
      <text x="70" y="114" fontSize="9" fill="#047857" fontWeight="bold" textAnchor="middle">ÉK = [-1; 3]</text>
    </svg>
  );
};
