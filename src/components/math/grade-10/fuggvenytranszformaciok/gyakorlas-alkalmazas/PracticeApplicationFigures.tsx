import React from 'react';

interface SvgProps {
  size?: number;
  className?: string;
}

/**
 * ProjectileMotionSvg:
 * Demonstrates vertical throw from a 40m tower:
 * h(t) = -5t² + 10t + 40
 * Peak at t = 1s, h = 45m
 * Ground impact at t = 4s, h = 0m
 */
export const ProjectileMotionSvg: React.FC<SvgProps> = ({ size = 300, className = '' }) => {
  return (
    <svg
      viewBox="-40 -30 380 300"
      width={size}
      height={size * 0.8}
      className={`select-none ${className}`}
    >
      <defs>
        <pattern id="pa-grid" width="25" height="25" patternUnits="userSpaceOnUse">
          <path d="M 25 0 L 0 0 0 25" fill="none" stroke="currentColor" strokeOpacity="0.08" strokeWidth="1" />
        </pattern>
        <marker id="pa-arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="currentColor" opacity="0.6" />
        </marker>
        <linearGradient id="pa-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0284c7" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#0284c7" stopOpacity="0.02" />
        </linearGradient>
      </defs>

      {/* Grid */}
      <rect x="-30" y="-20" width="360" height="280" fill="url(#pa-grid)" />

      {/* Axes: Origin (t=0, h=0) at (50, 220) */}
      {/* 1 sec = 50px, 10m = 35px */}
      {/* Ground line: h = 0 at y = 220 */}
      <line x1="30" y1="220" x2="310" y2="220" stroke="currentColor" strokeWidth="1.8" opacity="0.6" markerEnd="url(#pa-arrow)" />
      {/* Height axis: t = 0 at x = 50 */}
      <line x1="50" y1="240" x2="50" y2="-15" stroke="currentColor" strokeWidth="1.8" opacity="0.6" markerEnd="url(#pa-arrow)" />

      <text x="300" y="212" fontSize="11" fill="currentColor" opacity="0.7" fontWeight="bold">t (s)</text>
      <text x="56" y="-6" fontSize="11" fill="currentColor" opacity="0.7" fontWeight="bold">h (m)</text>
      <text x="38" y="234" fontSize="10" fill="currentColor" opacity="0.6">0</text>

      {/* Time ticks: 1s -> 100, 2s -> 150, 3s -> 200, 4s -> 250 */}
      <text x="96" y="235" fontSize="10" fill="currentColor" opacity="0.6">1</text>
      <text x="146" y="235" fontSize="10" fill="currentColor" opacity="0.6">2</text>
      <text x="196" y="235" fontSize="10" fill="currentColor" opacity="0.6">3</text>
      <text x="246" y="235" fontSize="10" fill="currentColor" opacity="0.6">4</text>

      {/* Tower illustration at t=0: height = 40m -> y = 220 - 4*35 = 80 */}
      <rect x="35" y="80" width="15" height="140" fill="#94a3b8" fillOpacity="0.4" stroke="#64748b" strokeWidth="1.5" />
      <text x="8" y="85" fontSize="10" fill="#64748b" fontWeight="bold">40 m</text>

      {/* Trajectory Parabola: */}
      {/* t=0: y=80 (h=40) */}
      {/* t=1: y=62.5 (h=45) peak */}
      {/* t=2: y=80 (h=40) */}
      {/* t=3: y=132.5 (h=25) */}
      {/* t=4: y=220 (h=0) ground */}
      <path
        d="M 50 80 Q 100 45 100 62.5 Q 100 45 150 80 Q 200 132.5 250 220"
        fill="url(#pa-sky)"
        stroke="#0d9488"
        strokeWidth="3"
      />

      {/* Precise path with smooth curve */}
      <path
        d="M 50 80 C 70 60, 90 62.5, 100 62.5 C 110 62.5, 170 85, 250 220"
        fill="none"
        stroke="#0d9488"
        strokeWidth="3"
      />

      {/* Peak Point: t = 1s, h = 45m (100, 62.5) */}
      <circle cx="100" cy="62.5" r="5" fill="#f43f5e" />
      <line x1="100" y1="62.5" x2="100" y2="220" stroke="#f43f5e" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.6" />
      <rect x="68" y="28" width="105" height="22" rx="4" fill="#f43f5e" fillOpacity="0.15" stroke="#f43f5e" strokeWidth="1" />
      <text x="73" y="43" fontSize="10" fill="#f43f5e" fontWeight="bold">Tetőpont: (1 s; 45 m)</text>

      {/* Start Point: (0s; 40m) */}
      <circle cx="50" cy="80" r="4.5" fill="#0d9488" />
      <text x="56" y="95" fontSize="9" fill="#0d9488" fontWeight="bold">Kezdés (0s; 40m)</text>

      {/* Ground Impact Point: (4s; 0m) */}
      <circle cx="250" cy="220" r="5" fill="#3b82f6" />
      <rect x="205" y="230" width="90" height="20" rx="3" fill="#3b82f6" fillOpacity="0.15" stroke="#3b82f6" strokeWidth="1" />
      <text x="210" y="244" fontSize="10" fill="#3b82f6" fontWeight="bold">Becsapódás: 4 s</text>

      {/* Formula badge */}
      <rect x="180" y="10" width="140" height="22" rx="4" fill="#0d9488" fillOpacity="0.1" stroke="#0d9488" strokeWidth="1" />
      <text x="188" y="25" fontSize="10" fill="#0d9488" fontWeight="bold">h(t) = -5t² + 10t + 40</text>
    </svg>
  );
};

/**
 * OptimalAreaFencingSvg:
 * Compares two optimization setups:
 * Setup A: Free standing 4-sided enclosure (Perimeter 20m) -> Max Area = 25m² (Square: 5x5)
 * Setup B: Enclosure against existing wall (Fence 20m, 3 sides) -> Max Area = 50m² (5x10)
 */
export const OptimalAreaFencingSvg: React.FC<SvgProps> = ({ size = 300, className = '' }) => {
  return (
    <svg
      viewBox="-20 -20 360 260"
      width={size}
      height={size * 0.75}
      className={`select-none ${className}`}
    >
      {/* Box A: 4-sided */}
      <g transform="translate(0, 0)">
        <rect x="0" y="10" width="150" height="220" rx="8" fill="currentColor" fillOpacity="0.03" stroke="currentColor" strokeOpacity="0.15" />
        <text x="15" y="32" fontSize="11" fill="#0d9488" fontWeight="bold">4 Oldalú Kordon (K = 20 m)</text>

        {/* Square diagram */}
        <rect x="35" y="55" width="80" height="80" fill="#0d9488" fillOpacity="0.12" stroke="#0d9488" strokeWidth="2" strokeDasharray="4 2" />
        <text x="65" y="50" fontSize="10" fill="#0d9488" fontWeight="bold">x = 5 m</text>
        <text x="15" y="100" fontSize="10" fill="#0d9488" fontWeight="bold">x = 5 m</text>
        <text x="50" y="100" fontSize="12" fill="#0d9488" fontWeight="black">25 m²</text>

        {/* Formula */}
        <text x="15" y="160" fontSize="9" fill="currentColor" opacity="0.8">T(x) = x · (10 - x)</text>
        <text x="15" y="178" fontSize="9" fill="currentColor" opacity="0.8">T(x) = -x² + 10x</text>
        <text x="15" y="200" fontSize="10" fill="#0d9488" fontWeight="bold">Optimum: Négyzet (5 × 5)</text>
        <text x="15" y="218" fontSize="10" fill="#f43f5e" fontWeight="black">T_max = 25 m²</text>
      </g>

      {/* Box B: 3-sided (against wall) */}
      <g transform="translate(170, 0)">
        <rect x="0" y="10" width="165" height="220" rx="8" fill="currentColor" fillOpacity="0.03" stroke="currentColor" strokeOpacity="0.15" />
        <text x="12" y="32" fontSize="11" fill="#6366f1" fontWeight="bold">1 Fal Mentén (K = 20 m)</text>

        {/* Existing brick wall */}
        <rect x="25" y="55" width="120" height="10" fill="#94a3b8" stroke="#475569" strokeWidth="1.5" />
        <text x="45" y="50" fontSize="9" fill="#475569" fontWeight="bold">FAL (0 m kordon)</text>

        {/* 3 sides of fence: 2 vertical sides of 5m, 1 horizontal of 10m */}
        <path d="M 35 65 L 35 125 L 135 125 L 135 65" fill="#6366f1" fillOpacity="0.12" stroke="#6366f1" strokeWidth="2.5" />
        <text x="10" y="98" fontSize="10" fill="#6366f1" fontWeight="bold">x=5</text>
        <text x="140" y="98" fontSize="10" fill="#6366f1" fontWeight="bold">x=5</text>
        <text x="65" y="140" fontSize="10" fill="#6366f1" fontWeight="bold">b = 10 m</text>
        <text x="70" y="100" fontSize="12" fill="#6366f1" fontWeight="black">50 m²</text>

        {/* Formula */}
        <text x="12" y="160" fontSize="9" fill="currentColor" opacity="0.8">T(x) = x · (20 - 2x)</text>
        <text x="12" y="178" fontSize="9" fill="currentColor" opacity="0.8">T(x) = -2x² + 20x</text>
        <text x="12" y="200" fontSize="10" fill="#6366f1" fontWeight="bold">Optimum: Téglalap (5 × 10)</text>
        <text x="12" y="218" fontSize="10" fill="#f43f5e" fontWeight="black">T_max = 50 m² (Dupla!)</text>
      </g>
    </svg>
  );
};

/**
 * GraphicalEquationSvg:
 * Shows solving f(x) = g(x) and f(x) <= g(x) graphically:
 * Parabola f(x) = (x - 2)² - 1 = x² - 4x + 3
 * Line g(x) = x - 1
 * Intersections at (1; 0) and (4; 3)
 */
export const GraphicalEquationSvg: React.FC<SvgProps> = ({ size = 300, className = '' }) => {
  return (
    <svg
      viewBox="-30 -30 360 300"
      width={size}
      height={size * 0.85}
      className={`select-none ${className}`}
    >
      <defs>
        <pattern id="pa-grid-eq" width="25" height="25" patternUnits="userSpaceOnUse">
          <path d="M 25 0 L 0 0 0 25" fill="none" stroke="currentColor" strokeOpacity="0.08" strokeWidth="1" />
        </pattern>
        <marker id="pa-arrow-eq" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="currentColor" opacity="0.6" />
        </marker>
      </defs>

      <rect x="-20" y="-20" width="340" height="280" fill="url(#pa-grid-eq)" />

      {/* Axes: Origin (0,0) at (80, 180) */}
      {/* 1 unit = 35px */}
      <line x1="20" y1="180" x2="300" y2="180" stroke="currentColor" strokeWidth="1.5" opacity="0.5" markerEnd="url(#pa-arrow-eq)" />
      <line x1="80" y1="260" x2="80" y2="-15" stroke="currentColor" strokeWidth="1.5" opacity="0.5" markerEnd="url(#pa-arrow-eq)" />

      <text x="290" y="172" fontSize="11" fill="currentColor" opacity="0.7" fontWeight="bold">x</text>
      <text x="88" y="-6" fontSize="11" fill="currentColor" opacity="0.7" fontWeight="bold">y</text>
      <text x="68" y="195" fontSize="10" fill="currentColor" opacity="0.6">0</text>

      {/* Tick 1: x = 1 -> 80 + 35 = 115 */}
      <text x="110" y="195" fontSize="9" fill="currentColor" opacity="0.6">1</text>
      {/* Tick 4: x = 4 -> 80 + 140 = 220 */}
      <text x="216" y="195" fontSize="9" fill="currentColor" opacity="0.6">4</text>

      {/* Parabola f(x) = (x-2)² - 1 */}
      {/* Vertex at (2, -1) -> (150, 215) */}
      {/* x=0 -> y=3 (80, 75) */}
      {/* x=1 -> y=0 (115, 180) */}
      {/* x=3 -> y=0 (185, 180) */}
      {/* x=4 -> y=3 (220, 75) */}
      <path
        d="M 60 15 Q 80 75 115 180 Q 150 250 185 180 Q 220 75 240 15"
        fill="none"
        stroke="#0d9488"
        strokeWidth="3"
      />
      <text x="40" y="15" fontSize="10" fill="#0d9488" fontWeight="bold">f(x) = (x - 2)² - 1</text>

      {/* Line g(x) = x - 1 */}
      {/* x=0 -> y=-1 (80, 215) */}
      {/* x=1 -> y=0 (115, 180) */}
      {/* x=4 -> y=3 (220, 75) */}
      {/* x=5 -> y=4 (255, 40) */}
      <line x1="50" y1="250" x2="265" y2="35" stroke="#f59e0b" strokeWidth="2.5" />
      <text x="235" y="30" fontSize="10" fill="#f59e0b" fontWeight="bold">g(x) = x - 1</text>

      {/* Intersection Point 1: (1; 0) */}
      <circle cx="115" cy="180" r="5" fill="#f43f5e" />
      <rect x="75" y="145" width="75" height="18" rx="3" fill="#f43f5e" fillOpacity="0.15" stroke="#f43f5e" strokeWidth="1" />
      <text x="80" y="158" fontSize="9" fill="#f43f5e" fontWeight="bold">M₁(1; 0) ⇒ x = 1</text>

      {/* Intersection Point 2: (4; 3) */}
      <circle cx="220" cy="75" r="5" fill="#f43f5e" />
      <rect x="175" y="45" width="75" height="18" rx="3" fill="#f43f5e" fillOpacity="0.15" stroke="#f43f5e" strokeWidth="1" />
      <text x="180" y="58" fontSize="9" fill="#f43f5e" fontWeight="bold">M₂(4; 3) ⇒ x = 4</text>

      {/* Interval [1; 4] highlight where f(x) <= g(x) */}
      <line x1="115" y1="180" x2="220" y2="180" stroke="#f43f5e" strokeWidth="4" opacity="0.8" />
      <rect x="120" y="235" width="130" height="22" rx="4" fill="#f43f5e" fillOpacity="0.12" stroke="#f43f5e" strokeWidth="1" />
      <text x="126" y="250" fontSize="10" fill="#f43f5e" fontWeight="bold">f(x) ≤ g(x) ⇒ x ∈ [1; 4]</text>
    </svg>
  );
};

