import React from 'react';

interface FigureProps {
  size?: number;
  className?: string;
}

/**
 * 1. Normálparabola: f(x) = x² alapfüggvény
 * Részletes koordináta-rendszer rácshálóval, szimmetriatengellyel (y-tengely),
 * céltárcsás csúcsponttal (0; 0), és pontos nevezetes rácspontokkal (-2; 4), (-1; 1), (0; 0), (1; 1), (2; 4).
 */
export const NormalParabolaSvg: React.FC<FigureProps> = ({ size = 320, className = '' }) => {
  return (
    <svg
      viewBox="0 0 340 270"
      width={size}
      height={(size * 270) / 340}
      className={`mx-auto select-none overflow-visible drop-shadow-sm ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="pb-norm-grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#94A3B8" strokeWidth="0.5" strokeOpacity="0.25" />
        </pattern>
        <marker id="pb-arrow" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#64748B" />
        </marker>
      </defs>

      {/* Grid background */}
      <rect x="15" y="15" width="310" height="240" rx="12" fill="#F8FAFC" className="dark:fill-slate-900/60" stroke="#E2E8F0" strokeWidth="1" />
      <rect x="15" y="15" width="310" height="240" rx="12" fill="url(#pb-norm-grid)" />

      {/* Coordinate Axes: Origin at (170, 205) */}
      {/* 1 unit x = 30px, 1 unit y = 35px */}
      {/* X axis */}
      <line x1="25" y1="205" x2="315" y2="205" stroke="#475569" strokeWidth="1.8" markerEnd="url(#pb-arrow)" />
      <text x="310" y="197" fill="#475569" fontSize="11" fontWeight="bold">x</text>

      {/* Y axis (Symmetry axis) */}
      <line x1="170" y1="245" x2="170" y2="25" stroke="#0284C7" strokeWidth="1.8" strokeDasharray="5 3" />
      <polygon points="170,20 166,28 174,28" fill="#0284C7" />
      <text x="178" y="28" fill="#0284C7" fontSize="11" fontWeight="bold">y (tengely)</text>

      {/* Tick marks on X: -2: 110, -1: 140, 1: 200, 2: 230 */}
      <line x1="110" y1="202" x2="110" y2="208" stroke="#64748B" strokeWidth="1.5" />
      <text x="110" y="222" fill="#64748B" fontSize="10" textAnchor="middle">-2</text>
      <line x1="140" y1="202" x2="140" y2="208" stroke="#64748B" strokeWidth="1.5" />
      <text x="140" y="222" fill="#64748B" fontSize="10" textAnchor="middle">-1</text>
      <line x1="200" y1="202" x2="200" y2="208" stroke="#64748B" strokeWidth="1.5" />
      <text x="200" y="222" fill="#64748B" fontSize="10" textAnchor="middle">1</text>
      <line x1="230" y1="202" x2="230" y2="208" stroke="#64748B" strokeWidth="1.5" />
      <text x="230" y="222" fill="#64748B" fontSize="10" textAnchor="middle">2</text>

      {/* Tick marks on Y: 1: 170, 4: 65 */}
      <line x1="167" y1="170" x2="173" y2="170" stroke="#64748B" strokeWidth="1.5" />
      <text x="162" y="174" fill="#64748B" fontSize="10" textAnchor="end">1</text>
      <line x1="167" y1="65" x2="173" y2="65" stroke="#64748B" strokeWidth="1.5" />
      <text x="162" y="69" fill="#64748B" fontSize="10" textAnchor="end">4</text>

      {/* Parabola curve: f(x) = x²
          Endpoints at x0 = 104, x1 = 236 (w = 66), y0 = 31.
          Apex: yc = 2 * 205 - 31 = 379. t=0.5: 0.5*31 + 0.5*379 = 205! EXACT!
          Passes exactly through (-2; 4) at (110, 65), (-1; 1) at (140, 170), (0; 0) at (170, 205),
          (1; 1) at (200, 170), (2; 4) at (230, 65). */}
      <path
        d="M 104 31 Q 170 379 236 31"
        stroke="#2563EB"
        strokeWidth="3.2"
        strokeLinecap="round"
      />

      {/* Characteristic points with coordinates and dashed projection guides */}
      <line x1="110" y1="65" x2="230" y2="65" stroke="#94A3B8" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
      <line x1="140" y1="170" x2="200" y2="170" stroke="#94A3B8" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />

      {/* (-2; 4) and (2; 4) */}
      <circle cx="110" cy="65" r="4.5" fill="#3B82F6" stroke="#FFFFFF" strokeWidth="1.5" />
      <text x="82" y="68" fill="#1E40AF" fontSize="10" fontWeight="bold">(-2; 4)</text>
      <circle cx="230" cy="65" r="4.5" fill="#3B82F6" stroke="#FFFFFF" strokeWidth="1.5" />
      <text x="238" y="68" fill="#1E40AF" fontSize="10" fontWeight="bold">(2; 4)</text>

      {/* (-1; 1) and (1; 1) */}
      <circle cx="140" cy="170" r="4" fill="#3B82F6" stroke="#FFFFFF" strokeWidth="1.5" />
      <text x="112" y="174" fill="#475569" fontSize="9">(-1; 1)</text>
      <circle cx="200" cy="170" r="4" fill="#3B82F6" stroke="#FFFFFF" strokeWidth="1.5" />
      <text x="208" y="174" fill="#475569" fontSize="9">(1; 1)</text>

      {/* Vertex T(0; 0) target ring marker */}
      <circle cx="170" cy="205" r="8" fill="#DBEAFE" stroke="#2563EB" strokeWidth="1.5" opacity="0.8" />
      <circle cx="170" cy="205" r="4.5" fill="#2563EB" stroke="#FFFFFF" strokeWidth="1.5" />
      <text x="170" y="235" fill="#1E40AF" fontSize="11" fontWeight="900" textAnchor="middle">T(0; 0)</text>

      {/* Formula badge */}
      <rect x="25" y="25" width="95" height="24" rx="6" fill="#EFF6FF" stroke="#BFDBFE" strokeWidth="1" />
      <text x="72" y="41" fill="#1D4ED8" fontSize="11" fontWeight="bold" textAnchor="middle">f(x) = x²</text>
    </svg>
  );
};

/**
 * 2. Függőleges eltolás az y-tengely mentén: f(x) = x² ± c
 * Szemlélteti a felfelé (x² + 2) és lefelé (x² - 3) mozgatott parabolákat pontos rácson és csúcspontokkal.
 */
export const VerticalShiftSvg: React.FC<FigureProps> = ({ size = 320, className = '' }) => {
  return (
    <svg
      viewBox="0 0 350 260"
      width={size}
      height={(size * 260) / 350}
      className={`mx-auto select-none overflow-visible drop-shadow-sm ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="pb-vshift-grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#94A3B8" strokeWidth="0.5" strokeOpacity="0.25" />
        </pattern>
        <marker id="pb-vs-arrow" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#64748B" />
        </marker>
        <marker id="pb-up-arrow" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#10B981" />
        </marker>
        <marker id="pb-down-arrow" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#F59E0B" />
        </marker>
      </defs>

      {/* Grid background */}
      <rect x="15" y="15" width="320" height="230" rx="12" fill="#F8FAFC" className="dark:fill-slate-900/60" stroke="#E2E8F0" strokeWidth="1" />
      <rect x="15" y="15" width="320" height="230" rx="12" fill="url(#pb-vshift-grid)" />

      {/* Axes: Origin at (170, 160) */}
      <line x1="25" y1="160" x2="325" y2="160" stroke="#475569" strokeWidth="1.8" markerEnd="url(#pb-vs-arrow)" />
      <line x1="170" y1="235" x2="170" y2="25" stroke="#475569" strokeWidth="1.8" markerEnd="url(#pb-vs-arrow)" />
      <text x="320" y="152" fill="#475569" fontSize="11" fontWeight="bold">x</text>
      <text x="178" y="32" fill="#475569" fontSize="11" fontWeight="bold">y</text>
      <text x="158" y="174" fill="#64748B" fontSize="10" fontWeight="bold">O</text>

      {/* Eredeti normálparabola y = x²: csúcs (170, 160).
          Végpontok (120, 60) és (220, 60). yc = 2*160 - 60 = 260.
          Apex: 0.5*60 + 0.5*260 = 160! PONTOS! */}
      <path d="M 120 60 Q 170 260 220 60" stroke="#94A3B8" strokeWidth="2" strokeDasharray="4 3" />
      <circle cx="170" cy="160" r="3.5" fill="#94A3B8" />
      <text x="148" y="174" fill="#64748B" fontSize="10" fontWeight="bold">x²</text>

      {/* Felfelé eltolás: y = x² + 2 (40 px fel -> csúcs (170, 120))
          Végpontok (120, 20) és (220, 20). yc = 2*120 - 20 = 220.
          Apex: 0.5*20 + 0.5*220 = 120! PONTOS! */}
      <path d="M 120 20 Q 170 220 220 20" stroke="#10B981" strokeWidth="3" strokeLinecap="round" />
      <circle cx="170" cy="120" r="7" fill="#D1FAE5" stroke="#10B981" strokeWidth="1.5" opacity="0.8" />
      <circle cx="170" cy="120" r="4" fill="#10B981" stroke="#FFFFFF" strokeWidth="1.5" />
      <text x="180" y="116" fill="#047857" fontSize="10" fontWeight="black">T(0; 2)</text>
      {/* Upward vector arrow */}
      <line x1="170" y1="155" x2="170" y2="128" stroke="#10B981" strokeWidth="2.2" markerEnd="url(#pb-up-arrow)" />

      {/* Lefelé eltolás: y = x² - 3 (50 px le -> csúcs (170, 210))
          Végpontok (115, 90) és (225, 90). yc = 2*210 - 90 = 330.
          Apex: 0.5*90 + 0.5*330 = 210! PONTOS! */}
      <path d="M 115 90 Q 170 330 225 90" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
      <circle cx="170" cy="210" r="7" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="1.5" opacity="0.8" />
      <circle cx="170" cy="210" r="4" fill="#F59E0B" stroke="#FFFFFF" strokeWidth="1.5" />
      <text x="180" y="218" fill="#B45309" fontSize="10" fontWeight="black">T(0; -3)</text>
      {/* Downward vector arrow */}
      <line x1="170" y1="165" x2="170" y2="202" stroke="#F59E0B" strokeWidth="2.2" markerEnd="url(#pb-down-arrow)" />

      {/* Zérushelyek x² - 3 esetén: (170 - 32, 160) és (170 + 32, 160) */}
      <circle cx="138" cy="160" r="3.5" fill="#D97706" />
      <circle cx="202" cy="160" r="3.5" fill="#D97706" />
      <text x="138" y="152" fill="#B45309" fontSize="9" fontWeight="bold" textAnchor="middle">-√3</text>
      <text x="202" y="152" fill="#B45309" fontSize="9" fontWeight="bold" textAnchor="middle">+√3</text>

      {/* Címkék */}
      <rect x="25" y="25" width="105" height="22" rx="5" fill="#ECFDF5" stroke="#A7F3D0" strokeWidth="1" />
      <text x="77" y="40" fill="#047857" fontSize="10" fontWeight="bold" textAnchor="middle">
        f(x) = x² + 2 (Fel)
      </text>

      <rect x="225" y="25" width="105" height="22" rx="5" fill="#FFFBEB" stroke="#FDE68A" strokeWidth="1" />
      <text x="277" y="40" fill="#B45309" fontSize="10" fontWeight="bold" textAnchor="middle">
        g(x) = x² - 3 (Le)
      </text>
    </svg>
  );
};

/**
 * 3. Vízszintes eltolás az x-tengely mentén: f(x) = (x ∓ u)²
 * Jobbra: (x - 3)², Balra: (x + 2)² eltolások szemléltetése rácshálón és pontos csúcspontokkal.
 */
export const HorizontalShiftSvg: React.FC<FigureProps> = ({ size = 320, className = '' }) => {
  return (
    <svg
      viewBox="0 0 350 250"
      width={size}
      height={(size * 250) / 350}
      className={`mx-auto select-none overflow-visible drop-shadow-sm ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="pb-hshift-grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#94A3B8" strokeWidth="0.5" strokeOpacity="0.25" />
        </pattern>
        <marker id="pb-hs-arrow" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#64748B" />
        </marker>
        <marker id="pb-right-arrow" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#2563EB" />
        </marker>
        <marker id="pb-left-arrow" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#7C3AED" />
        </marker>
      </defs>

      {/* Grid background */}
      <rect x="15" y="15" width="320" height="220" rx="12" fill="#F8FAFC" className="dark:fill-slate-900/60" stroke="#E2E8F0" strokeWidth="1" />
      <rect x="15" y="15" width="320" height="220" rx="12" fill="url(#pb-hshift-grid)" />

      {/* X and Y axes: Origin at (160, 160) */}
      {/* 1 unit = 25 px */}
      <line x1="25" y1="160" x2="325" y2="160" stroke="#475569" strokeWidth="1.8" markerEnd="url(#pb-hs-arrow)" />
      <line x1="160" y1="225" x2="160" y2="25" stroke="#475569" strokeWidth="1.8" markerEnd="url(#pb-hs-arrow)" />
      <text x="320" y="152" fill="#475569" fontSize="11" fontWeight="bold">x</text>
      <text x="168" y="32" fill="#475569" fontSize="11" fontWeight="bold">y</text>
      <text x="160" y="178" fill="#64748B" fontSize="10" fontWeight="bold" textAnchor="middle">0</text>

      {/* Alap x² a (160, 160) pontban:
          w = 45, y0 = 60. yc = 2*160 - 60 = 260. Apex = 160! */}
      <path d="M 115 60 Q 160 260 205 60" stroke="#94A3B8" strokeWidth="2" strokeDasharray="3 3" />
      <circle cx="160" cy="160" r="3.5" fill="#94A3B8" />

      {/* Jobbra tolás: (x - 3)² -> Csúcs (235, 160)
          w = 45, y0 = 60. yc = 260. Apex = 160! */}
      <path d="M 190 60 Q 235 260 280 60" stroke="#2563EB" strokeWidth="3" strokeLinecap="round" />
      <circle cx="235" cy="160" r="7" fill="#DBEAFE" stroke="#2563EB" strokeWidth="1.5" opacity="0.8" />
      <circle cx="235" cy="160" r="4" fill="#2563EB" stroke="#FFFFFF" strokeWidth="1.5" />
      <text x="235" y="178" fill="#1D4ED8" fontSize="11" fontWeight="black" textAnchor="middle">+3</text>
      {/* Right arrow */}
      <line x1="165" y1="135" x2="225" y2="135" stroke="#2563EB" strokeWidth="2" markerEnd="url(#pb-right-arrow)" />
      <text x="195" y="127" fill="#1D4ED8" fontSize="9" fontWeight="bold" textAnchor="middle">
        jobbra 3
      </text>

      {/* Balra tolás: (x + 2)² -> Csúcs (110, 160)
          w = 45, y0 = 60. yc = 260. Apex = 160! */}
      <path d="M 65 60 Q 110 260 155 60" stroke="#7C3AED" strokeWidth="3" strokeLinecap="round" />
      <circle cx="110" cy="160" r="7" fill="#EDE9FE" stroke="#7C3AED" strokeWidth="1.5" opacity="0.8" />
      <circle cx="110" cy="160" r="4" fill="#7C3AED" stroke="#FFFFFF" strokeWidth="1.5" />
      <text x="110" y="178" fill="#5B21B6" fontSize="11" fontWeight="black" textAnchor="middle">-2</text>
      {/* Left arrow */}
      <line x1="155" y1="135" x2="120" y2="135" stroke="#7C3AED" strokeWidth="2" markerEnd="url(#pb-left-arrow)" />
      <text x="137" y="127" fill="#5B21B6" fontSize="9" fontWeight="bold" textAnchor="middle">
        balra 2
      </text>

      {/* Képlet kártyák */}
      <rect x="25" y="25" width="110" height="24" rx="6" fill="#F5F3FF" stroke="#DDD6FE" strokeWidth="1" />
      <text x="80" y="41" fill="#6D28D9" fontSize="10" fontWeight="bold" textAnchor="middle">
        f(x) = (x + 2)² (Balra!)
      </text>

      <rect x="215" y="25" width="110" height="24" rx="6" fill="#EFF6FF" stroke="#BFDBFE" strokeWidth="1" />
      <text x="270" y="41" fill="#1D4ED8" fontSize="10" fontWeight="bold" textAnchor="middle">
        g(x) = (x - 3)² (Jobbra!)
      </text>
    </svg>
  );
};

/**
 * 4. A páratlan lépések szabálya a rajzoláshoz
 * 1 jobbra, 1 fel -> 1 jobbra, 3 fel -> 1 jobbra, 5 fel.
 * Matematikailag pontos Bézier ív és koordinátarács.
 */
export const ParabolaOddStepSvg: React.FC<FigureProps> = ({ size = 320, className = '' }) => {
  return (
    <svg
      viewBox="0 0 340 240"
      width={size}
      height={(size * 240) / 340}
      className={`mx-auto select-none overflow-visible drop-shadow-sm ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="pb-step-grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#94A3B8" strokeWidth="0.5" strokeOpacity="0.25" />
        </pattern>
        <marker id="pb-odd-arrow" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#64748B" />
        </marker>
      </defs>

      <rect x="15" y="15" width="310" height="210" rx="12" fill="#F8FAFC" className="dark:fill-slate-900/60" stroke="#E2E8F0" strokeWidth="1" />
      <rect x="15" y="15" width="310" height="210" rx="12" fill="url(#pb-step-grid)" />

      {/* Origin at (70, 195) */}
      <line x1="35" y1="195" x2="280" y2="195" stroke="#475569" strokeWidth="1.8" markerEnd="url(#pb-odd-arrow)" />
      <line x1="70" y1="215" x2="70" y2="25" stroke="#475569" strokeWidth="1.8" markerEnd="url(#pb-odd-arrow)" />
      <circle cx="70" cy="195" r="4.5" fill="#1E293B" stroke="#FFFFFF" strokeWidth="1.5" />
      <text x="56" y="210" fill="#475569" fontSize="10" fontWeight="bold">(0; 0)</text>

      {/* Step 1: 1 jobbra (30px -> 100), 1 fel (15px -> 180) */}
      <line x1="70" y1="195" x2="100" y2="195" stroke="#3B82F6" strokeWidth="2" strokeDasharray="2 2" />
      <line x1="100" y1="195" x2="100" y2="180" stroke="#10B981" strokeWidth="2.5" />
      <circle cx="100" cy="180" r="4" fill="#2563EB" stroke="#FFFFFF" strokeWidth="1.5" />
      <text x="115" y="190" fill="#059669" fontSize="10" fontWeight="bold">+1 fel</text>

      {/* Step 2: 1 jobbra (30px -> 130), 3 fel (45px -> 135) */}
      <line x1="100" y1="180" x2="130" y2="180" stroke="#3B82F6" strokeWidth="2" strokeDasharray="2 2" />
      <line x1="130" y1="180" x2="130" y2="135" stroke="#10B981" strokeWidth="2.5" />
      <circle cx="130" cy="135" r="4" fill="#2563EB" stroke="#FFFFFF" strokeWidth="1.5" />
      <text x="145" y="160" fill="#059669" fontSize="10" fontWeight="bold">+3 fel</text>

      {/* Step 3: 1 jobbra (30px -> 160), 5 fel (75px -> 60) */}
      <line x1="130" y1="135" x2="160" y2="135" stroke="#3B82F6" strokeWidth="2" strokeDasharray="2 2" />
      <line x1="160" y1="135" x2="160" y2="60" stroke="#10B981" strokeWidth="2.5" />
      <circle cx="160" cy="60" r="4" fill="#2563EB" stroke="#FFFFFF" strokeWidth="1.5" />
      <text x="175" y="100" fill="#059669" fontSize="10" fontWeight="bold">+5 fel</text>

      {/* Precíz parabola ív: M 70 195 Q 115 195 160 60
          Vízszintes érintő az origóban (70, 195).
          Pontosan átmegy: (100, 180), (130, 135), (160, 60)! */}
      <path d="M 70 195 Q 115 195 160 60" stroke="#2563EB" strokeWidth="3" strokeLinecap="round" />

      {/* Magyarázó kártya */}
      <rect x="190" y="30" width="125" height="60" rx="8" fill="#F0FDF4" stroke="#BBF7D0" strokeWidth="1" />
      <text x="252" y="48" fill="#166534" fontSize="11" fontWeight="black" textAnchor="middle">
        Páratlan lépések:
      </text>
      <text x="252" y="65" fill="#15803D" fontSize="10" textAnchor="middle">
        1 + 3 = 4 = 2²
      </text>
      <text x="252" y="80" fill="#15803D" fontSize="10" textAnchor="middle">
        1 + 3 + 5 = 9 = 3²
      </text>
    </svg>
  );
};
