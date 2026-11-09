import React from 'react';

interface FigureProps {
  size?: number;
  className?: string;
}

/**
 * 1. Függvénygép (Function Machine) SVG
 * Szemlélteti a független változó (bemenet), a hozzárendelési szabály (függvény)
 * és a függő változó (kimenet) kapcsolatát egy valós példával (pl. x darab -> fizetendő összeg).
 */
export const FunctionMachineSvg: React.FC<FigureProps> = ({ size = 220, className = '' }) => {
  return (
    <svg
      viewBox="0 0 320 200"
      width={size}
      height={(size * 200) / 320}
      className={`mx-auto select-none ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="machineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#1D4ED8" />
        </linearGradient>
        <linearGradient id="pipeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#94A3B8" />
          <stop offset="100%" stopColor="#64748B" />
        </linearGradient>
        <filter id="shadowGlow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#1E3A8A" floodOpacity="0.25" />
        </filter>
      </defs>

      {/* Input Pipe & Arrow */}
      <rect x="20" y="85" width="70" height="30" rx="6" fill="url(#pipeGrad)" />
      <path d="M 60 100 L 85 100" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
      <polygon points="85,94 95,100 85,106" fill="#FFFFFF" />
      <text x="50" y="70" fill="#3B82F6" fontSize="12" fontWeight="bold" textAnchor="middle">
        Bemenet: x
      </text>
      <text x="50" y="132" fill="#64748B" fontSize="10" textAnchor="middle">
        (független vált.)
      </text>

      {/* Main Machine Body */}
      <rect
        x="95"
        y="40"
        width="130"
        height="120"
        rx="18"
        fill="url(#machineGrad)"
        filter="url(#shadowGlow)"
        stroke="#60A5FA"
        strokeWidth="2"
      />

      {/* Gear / Symbol Decoration */}
      <circle cx="160" cy="85" r="26" fill="#1E40AF" stroke="#93C5FD" strokeWidth="2" />
      <text x="160" y="93" fill="#FFFFFF" fontSize="22" fontWeight="900" textAnchor="middle">
        f (x)
      </text>

      {/* Internal Rule Label */}
      <rect x="110" y="122" width="100" height="24" rx="6" fill="#1E3A8A" />
      <text x="160" y="138" fill="#FDE047" fontSize="11" fontWeight="bold" textAnchor="middle">
        Szabály / Képlet
      </text>

      {/* Output Pipe & Arrow */}
      <rect x="230" y="85" width="70" height="30" rx="6" fill="url(#pipeGrad)" />
      <path d="M 235 100 L 265 100" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
      <polygon points="265,94 275,100 265,106" fill="#FFFFFF" />
      <text x="270" y="70" fill="#10B981" fontSize="12" fontWeight="bold" textAnchor="middle">
        Kimenet: y
      </text>
      <text x="270" y="132" fill="#64748B" fontSize="10" textAnchor="middle">
        (y = f(x))
      </text>
    </svg>
  );
};

/**
 * 2. Kordon / Kerítés optimalizálási szituációk SVG
 * Három modell: 4 oldal (szabadon álló), 1 fal melletti és 2 fal közé (sarokba) zárt terület.
 */
export const FenceOptimizationSvg: React.FC<FigureProps> = ({ size = 260, className = '' }) => {
  return (
    <svg
      viewBox="0 0 360 210"
      width={size}
      height={(size * 210) / 360}
      className={`mx-auto select-none ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="brickWall" width="16" height="8" patternUnits="userSpaceOnUse">
          <rect width="16" height="8" fill="#94A3B8" />
          <path d="M 0 0 L 16 0 M 0 4 L 16 4 M 0 8 L 16 8 M 8 0 L 8 4 M 0 4 L 0 8 M 16 4 L 16 8" stroke="#475569" strokeWidth="1" />
        </pattern>
      </defs>

      {/* Model 1: 4 sides (Free enclosure) */}
      <g transform="translate(10, 15)">
        <rect x="15" y="25" width="70" height="55" rx="4" fill="#ECFDF5" stroke="#10B981" strokeWidth="2.5" strokeDasharray="4 3" />
        <text x="50" y="15" fill="#047857" fontSize="11" fontWeight="bold" textAnchor="middle">
          1. Szabad terület (4 oldal)
        </text>
        <text x="50" y="56" fill="#065F46" fontSize="11" fontWeight="bold" textAnchor="middle">
          T(x) = x(K/2 - x)
        </text>
        <text x="50" y="93" fill="#64748B" fontSize="9" textAnchor="middle">
          K = 2x + 2y  ⟹  y = K/2 - x
        </text>
        <text x="50" y="106" fill="#059669" fontSize="10" fontWeight="bold" textAnchor="middle">
          Max: négyzetnél (x = y)
        </text>
      </g>

      {/* Model 2: 1 side wall (3 sides fence) */}
      <g transform="translate(130, 15)">
        {/* Wall on top */}
        <rect x="10" y="20" width="80" height="10" fill="url(#brickWall)" rx="2" />
        <rect x="15" y="30" width="70" height="50" fill="#EFF6FF" stroke="#3B82F6" strokeWidth="2.5" strokeDasharray="4 3" />
        <line x1="15" y1="30" x2="85" y2="30" stroke="#1E293B" strokeWidth="3" />
        <text x="50" y="15" fill="#1D4ED8" fontSize="11" fontWeight="bold" textAnchor="middle">
          2. Fal mentén (3 oldal)
        </text>
        <text x="50" y="57" fill="#1E40AF" fontSize="11" fontWeight="bold" textAnchor="middle">
          T(x) = x(K - 2x)
        </text>
        <text x="50" y="93" fill="#64748B" fontSize="9" textAnchor="middle">
          K = 2x + y  ⟹  y = K - 2x
        </text>
        <text x="50" y="106" fill="#2563EB" fontSize="10" fontWeight="bold" textAnchor="middle">
          Max: y = 2x esetén
        </text>
      </g>

      {/* Model 3: Corner (2 sides wall, 2 sides fence) */}
      <g transform="translate(250, 15)">
        {/* Corner walls */}
        <rect x="10" y="20" width="80" height="10" fill="url(#brickWall)" rx="2" />
        <rect x="10" y="20" width="10" height="60" fill="url(#brickWall)" rx="2" />
        <rect x="20" y="30" width="65" height="50" fill="#FFFBEB" stroke="#F59E0B" strokeWidth="2.5" strokeDasharray="4 3" />
        <text x="50" y="15" fill="#B45309" fontSize="11" fontWeight="bold" textAnchor="middle">
          3. Sarokban (2 oldal)
        </text>
        <text x="52" y="58" fill="#92400E" fontSize="11" fontWeight="bold" textAnchor="middle">
          T(x) = x(K - x)
        </text>
        <text x="50" y="93" fill="#64748B" fontSize="9" textAnchor="middle">
          K = x + y  ⟹  y = K - x
        </text>
        <text x="50" y="106" fill="#D97706" fontSize="10" fontWeight="bold" textAnchor="middle">
          Max: x = y = K/2 esetén
        </text>
      </g>

      {/* Bottom Summary Bar */}
      <rect x="15" y="145" width="330" height="52" rx="10" fill="#F8FAFC" stroke="#E2E8F0" />
      <text x="180" y="165" fill="#334155" fontSize="11" fontWeight="bold" textAnchor="middle">
        💡 Szabály: A behatároló téglalap területe minden esetben másodfokú összefüggés!
      </text>
      <text x="180" y="183" fill="#64748B" fontSize="10" textAnchor="middle">
        A kevesebb kerítésfal nagyobb maximálisan bekeríthető területet eredményez adott K hosszúságból.
      </text>
    </svg>
  );
};

/**
 * 3. Árképzési és Leárazási Paradoxon Grafikon SVG
 * Szemlélteti a szurkolói mezek / DVD-k árazását: a fizetendő összeg maximumát
 * és a lefelé hajló ág paradoxonát (több darab = kevesebb bevétel).
 */
export const PricingParadoxSvg: React.FC<FigureProps> = ({ size = 260, className = '' }) => {
  return (
    <svg
      viewBox="0 0 340 220"
      width={size}
      height={(size * 220) / 340}
      className={`mx-auto select-none ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="paradoxArea" x1="0" y1="0" x2="0" y2="100%">
          <stop offset="0%" stopColor="#EF4444" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#EF4444" stopOpacity="0.02" />
        </linearGradient>
      </defs>

      {/* Background Grid Lines */}
      <line x1="45" y1="160" x2="310" y2="160" stroke="#CBD5E1" strokeWidth="1" />
      <line x1="45" y1="110" x2="310" y2="110" stroke="#F1F5F9" strokeWidth="1" strokeDasharray="3 3" />
      <line x1="45" y1="60" x2="310" y2="60" stroke="#F1F5F9" strokeWidth="1" strokeDasharray="3 3" />

      {/* Axis X and Y */}
      <line x1="45" y1="175" x2="45" y2="25" stroke="#475569" strokeWidth="2" markerEnd="url(#arrow)" />
      <line x1="35" y1="160" x2="320" y2="160" stroke="#475569" strokeWidth="2" />

      {/* Axis Arrows */}
      <polygon points="45,20 41,28 49,28" fill="#475569" />
      <polygon points="325,160 317,156 317,164" fill="#475569" />

      {/* Axis Labels */}
      <text x="315" y="178" fill="#475569" fontSize="11" fontWeight="bold">
        x (db)
      </text>
      <text x="15" y="25" fill="#475569" fontSize="11" fontWeight="bold">
        Bevétel F(x) [Ft]
      </text>

      {/* Paradox Shaded Zone (from x=10 to x=20) */}
      <path d="M 170 60 Q 235 65 295 160 L 170 160 Z" fill="url(#paradoxArea)" />

      {/* Parabola Curve F(x) = 4000x - 200x^2 */}
      {/* (0,160) -> Vertex at (170, 60) -> Zero at (295, 160) */}
      <path
        d="M 45 160 Q 170 -40 295 160"
        stroke="#2563EB"
        strokeWidth="3.5"
        strokeLinecap="round"
      />

      {/* Maximum Point (Vertex) at x = 10 */}
      <line x1="170" y1="60" x2="170" y2="160" stroke="#3B82F6" strokeWidth="1.5" strokeDasharray="3 3" />
      <circle cx="170" cy="60" r="5" fill="#2563EB" stroke="#FFFFFF" strokeWidth="2" />
      <text x="170" y="50" fill="#1D4ED8" fontSize="10" fontWeight="bold" textAnchor="middle">
        Max: x = 10 (20 000 Ft)
      </text>
      <text x="170" y="174" fill="#1E293B" fontSize="10" fontWeight="bold" textAnchor="middle">
        10
      </text>

      {/* Points Comparison: 10 vs 15 shirts */}
      {/* Point at x=15: F(15) = 15*1000 = 15000 */}
      <line x1="232" y1="95" x2="232" y2="160" stroke="#EF4444" strokeWidth="1.5" strokeDasharray="3 3" />
      <circle cx="232" cy="95" r="5" fill="#EF4444" stroke="#FFFFFF" strokeWidth="2" />
      <text x="232" y="87" fill="#B91C1C" fontSize="10" fontWeight="bold" textAnchor="middle">
        x = 15 (15 000 Ft!)
      </text>
      <text x="232" y="174" fill="#1E293B" fontSize="10" fontWeight="bold" textAnchor="middle">
        15
      </text>

      {/* Zero point at x = 20 */}
      <circle cx="295" cy="160" r="4" fill="#64748B" />
      <text x="295" y="174" fill="#1E293B" fontSize="10" fontWeight="bold" textAnchor="middle">
        20 (0 Ft)
      </text>

      {/* Paradox warning badge */}
      <rect x="200" y="112" width="105" height="26" rx="6" fill="#FEE2E2" stroke="#FCA5A5" />
      <text x="252" y="128" fill="#991B1B" fontSize="9" fontWeight="bold" textAnchor="middle">
        ⚠️ Paradoxon zóna!
      </text>
    </svg>
  );
};

/**
 * 4. Reális Értelmezési Tartomány vs. Elméleti Tartomány SVG
 * Szemlélteti, hogyan metszi le a valóság (nemnegatív hossz, diszkrét darabszám)
 * a matematikai R halmazt.
 */
export const DomainRestrictionSvg: React.FC<FigureProps> = ({ size = 260, className = '' }) => {
  return (
    <svg
      viewBox="0 0 350 180"
      width={size}
      height={(size * 180) / 350}
      className={`mx-auto select-none ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Top Track: Theoretical R */}
      <g transform="translate(15, 20)">
        <text x="0" y="15" fill="#64748B" fontSize="11" fontWeight="bold">
          Elméleti függvény értelmezési tartomány (ℝ):
        </text>
        <line x1="20" y1="35" x2="300" y2="35" stroke="#94A3B8" strokeWidth="3" strokeLinecap="round" />
        <polygon points="305,35 295,31 295,39" fill="#94A3B8" />
        <polygon points="15,35 25,31 25,39" fill="#94A3B8" />
        <circle cx="160" cy="35" r="4" fill="#334155" />
        <text x="160" y="52" fill="#334155" fontSize="10" textAnchor="middle">
          0 (Origó)
        </text>
        <text x="45" y="52" fill="#EF4444" fontSize="10" textAnchor="middle">
          -∞ felé (fizikailag értelmetlen)
        </text>
        <text x="270" y="52" fill="#3B82F6" fontSize="10" textAnchor="middle">
          +∞ felé
        </text>
      </g>

      {/* Bottom Track: Realistic D_f */}
      <g transform="translate(15, 100)">
        <text x="0" y="15" fill="#059669" fontSize="11" fontWeight="bold">
          Valós / Gyakorlati értelmezési tartomány (D_f):
        </text>
        {/* Greyed out negative part */}
        <line x1="20" y1="35" x2="110" y2="35" stroke="#E2E8F0" strokeWidth="3" strokeDasharray="3 3" />
        {/* Valid interval line */}
        <line x1="110" y1="35" x2="270" y2="35" stroke="#10B981" strokeWidth="5" strokeLinecap="round" />
        {/* Boundary 0 (open/closed) */}
        <circle cx="110" cy="35" r="5" fill="#FFFFFF" stroke="#059669" strokeWidth="2.5" />
        <text x="110" y="55" fill="#065F46" fontSize="10" fontWeight="bold" textAnchor="middle">
          0 &lt; x
        </text>
        {/* Boundary Max */}
        <circle cx="270" cy="35" r="5" fill="#059669" stroke="#FFFFFF" strokeWidth="2" />
        <text x="270" y="55" fill="#065F46" fontSize="10" fontWeight="bold" textAnchor="middle">
          x ≤ K/2 (vagy max db)
        </text>
        {/* Realistic zone pill */}
        <rect x="140" y="24" width="100" height="22" rx="6" fill="#D1FAE5" />
        <text x="190" y="39" fill="#065F46" fontSize="10" fontWeight="bold" textAnchor="middle">
          Reális tartomány
        </text>
      </g>
    </svg>
  );
};

