import React from 'react';

interface SvgProps {
  size?: number;
  className?: string;
}

/**
 * RootsAndAxisSvg:
 * Demonstrates the textbook's key method:
 * Plotting g(x) = x² - 4x = x(x - 4) with roots 0 and 4,
 * symmetry axis at x = 2, vertex (2; -4).
 * Then shifting up by c = 3 to get f(x) = x² - 4x + 3 with vertex (2; -1).
 */
export const RootsAndAxisSvg: React.FC<SvgProps> = ({ size = 300, className = '' }) => {
  return (
    <svg
      viewBox="-60 -60 420 360"
      width={size}
      height={size * 0.85}
      className={`select-none ${className}`}
    >
      <defs>
        {/* Grid pattern */}
        <pattern id="qg-grid" width="30" height="30" patternUnits="userSpaceOnUse">
          <path d="M 30 0 L 0 0 0 30" fill="none" stroke="currentColor" strokeOpacity="0.08" strokeWidth="1" />
        </pattern>
        <marker id="qg-arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="currentColor" opacity="0.6" />
        </marker>
        <marker id="qg-arrow-purple" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#8b5cf6" />
        </marker>
      </defs>

      {/* Grid */}
      <rect x="-50" y="-50" width="400" height="340" fill="url(#qg-grid)" />

      {/* Origin is at (150, 150) */}
      {/* 1 unit = 30px */}
      {/* Coordinate axes */}
      {/* X-axis: y = 150 */}
      <line x1="-40" y1="150" x2="340" y2="150" stroke="currentColor" strokeWidth="1.5" opacity="0.5" markerEnd="url(#qg-arrow)" />
      {/* Y-axis: x = 150 */}
      <line x1="150" y1="280" x2="150" y2="-40" stroke="currentColor" strokeWidth="1.5" opacity="0.5" markerEnd="url(#qg-arrow)" />

      <text x="330" y="142" fontSize="12" fill="currentColor" opacity="0.7" fontWeight="bold">x</text>
      <text x="158" y="-35" fontSize="12" fill="currentColor" opacity="0.7" fontWeight="bold">y</text>
      <text x="138" y="165" fontSize="11" fill="currentColor" opacity="0.6">0</text>

      {/* Axis ticks: 1 unit = 30px */}
      {/* x = 2 -> 150 + 60 = 210 */}
      {/* x = 4 -> 150 + 120 = 270 */}
      <circle cx="210" cy="150" r="2.5" fill="currentColor" opacity="0.5" />
      <text x="206" y="166" fontSize="10" fill="currentColor" opacity="0.6">2</text>
      <circle cx="270" cy="150" r="2.5" fill="currentColor" opacity="0.5" />
      <text x="266" y="166" fontSize="10" fill="currentColor" opacity="0.6">4</text>

      {/* Symmetry axis: x = 2 (cx = 210) */}
      <line x1="210" y1="-30" x2="210" y2="280" stroke="#f43f5e" strokeWidth="1.8" strokeDasharray="5 4" opacity="0.8" />
      <text x="215" y="-15" fontSize="10" fill="#f43f5e" fontWeight="bold">x = 2 (tengely)</text>

      {/* Parabola 1: g(x) = x² - 4x */}
      {/* Vertex at (2, -4) -> (210, 150 + 120 = 270) */}
      {/* Roots at (0, 0) -> (150, 150), (4, 0) -> (270, 150) */}
      {/* Path: x from -0.8 to 4.8 */}
      <path
        d="M 126 100 Q 150 150 180 240 Q 210 270 240 240 Q 270 150 294 100"
        fill="none"
        stroke="#64748b"
        strokeWidth="2"
        strokeDasharray="4 3"
      />
      <text x="100" y="85" fontSize="11" fill="#64748b" fontWeight="600">g(x) = x² - 4x</text>

      {/* Points for g(x): (0,0), (4,0), (2,-4) */}
      <circle cx="150" cy="150" r="4" fill="#64748b" />
      <circle cx="270" cy="150" r="4" fill="#64748b" />
      <circle cx="210" cy="270" r="4" fill="#64748b" />

      {/* Vertical shift arrows by c = +3 (90px upward) */}
      <line x1="150" y1="150" x2="150" y2="65" stroke="#8b5cf6" strokeWidth="1.8" markerEnd="url(#qg-arrow-purple)" />
      <text x="125" y="110" fontSize="10" fill="#8b5cf6" fontWeight="bold">+3</text>

      <line x1="210" y1="270" x2="210" y2="185" stroke="#8b5cf6" strokeWidth="1.8" markerEnd="url(#qg-arrow-purple)" />
      <text x="215" y="235" fontSize="10" fill="#8b5cf6" fontWeight="bold">+3</text>

      <line x1="270" y1="150" x2="270" y2="65" stroke="#8b5cf6" strokeWidth="1.8" markerEnd="url(#qg-arrow-purple)" />
      <text x="275" y="110" fontSize="10" fill="#8b5cf6" fontWeight="bold">+3</text>

      {/* Parabola 2: f(x) = x² - 4x + 3 = (x - 2)² - 1 */}
      {/* Vertex at (2, -1) -> (210, 180) */}
      {/* Roots at x = 1 (180, 150), x = 3 (240, 150) */}
      {/* y-intercept at (0, 3) -> (150, 60), symmetric point at (4, 3) -> (270, 60) */}
      <path
        d="M 126 10 Q 150 60 180 150 Q 210 180 240 150 Q 270 60 294 10"
        fill="none"
        stroke="#f43f5e"
        strokeWidth="3"
      />
      <text x="280" y="25" fontSize="12" fill="#f43f5e" fontWeight="bold">f(x) = x² - 4x + 3</text>

      {/* Points on f(x) */}
      {/* Vertex (2, -1) */}
      <circle cx="210" cy="180" r="5" fill="#f43f5e" />
      <text x="215" y="195" fontSize="10" fill="#f43f5e" fontWeight="bold">V(2; -1)</text>

      {/* y-intercept (0, 3) */}
      <circle cx="150" cy="60" r="4.5" fill="#10b981" />
      <text x="105" y="55" fontSize="10" fill="#10b981" fontWeight="bold">(0; 3)</text>

      {/* Symmetric point (4, 3) */}
      <circle cx="270" cy="60" r="4.5" fill="#10b981" />
      <text x="278" y="55" fontSize="10" fill="#10b981" fontWeight="bold">(4; 3)</text>

      {/* Roots (1, 0) and (3, 0) */}
      <circle cx="180" cy="150" r="4" fill="#3b82f6" />
      <text x="172" y="140" fontSize="9" fill="#3b82f6" fontWeight="bold">x₁=1</text>
      <circle cx="240" cy="150" r="4" fill="#3b82f6" />
      <text x="232" y="140" fontSize="9" fill="#3b82f6" fontWeight="bold">x₂=3</text>
    </svg>
  );
};

/**
 * FiveKeyPointsParabolaSvg:
 * Highlights the 5 essential points needed to draw an accurate parabola:
 * 1. Vertex V(u; v)
 * 2. y-intercept (0; c)
 * 3. Symmetric point (2u; c)
 * 4. Left root (x₁; 0)
 * 5. Right root (x₂; 0)
 */
export const FiveKeyPointsParabolaSvg: React.FC<SvgProps> = ({ size = 300, className = '' }) => {
  return (
    <svg
      viewBox="-50 -50 400 350"
      width={size}
      height={size * 0.88}
      className={`select-none ${className}`}
    >
      <defs>
        <pattern id="qg-grid-5p" width="30" height="30" patternUnits="userSpaceOnUse">
          <path d="M 30 0 L 0 0 0 30" fill="none" stroke="currentColor" strokeOpacity="0.08" strokeWidth="1" />
        </pattern>
        <marker id="qg-arrow-main" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="currentColor" opacity="0.6" />
        </marker>
      </defs>

      <rect x="-40" y="-40" width="380" height="330" fill="url(#qg-grid-5p)" />

      {/* Axes */}
      <line x1="-30" y1="180" x2="330" y2="180" stroke="currentColor" strokeWidth="1.5" opacity="0.5" markerEnd="url(#qg-arrow-main)" />
      <line x1="120" y1="280" x2="120" y2="-30" stroke="currentColor" strokeWidth="1.5" opacity="0.5" markerEnd="url(#qg-arrow-main)" />

      <text x="320" y="172" fontSize="12" fill="currentColor" opacity="0.7" fontWeight="bold">x</text>
      <text x="128" y="-22" fontSize="12" fill="currentColor" opacity="0.7" fontWeight="bold">y</text>
      <text x="108" y="195" fontSize="11" fill="currentColor" opacity="0.6">0</text>

      {/* Axis of symmetry x = u (x = 200) */}
      <line x1="200" y1="-20" x2="200" y2="280" stroke="#f43f5e" strokeWidth="1.8" strokeDasharray="5 4" opacity="0.8" />
      <text x="206" y="-6" fontSize="10" fill="#f43f5e" fontWeight="bold">x = u</text>

      {/* Distance indicator d between y-intercept and axis: x=120 to x=200 is u */}
      <line x1="120" y1="70" x2="200" y2="70" stroke="#10b981" strokeWidth="1.5" strokeDasharray="3 2" />
      <text x="154" y="64" fontSize="10" fill="#10b981" fontWeight="bold">u</text>

      <line x1="200" y1="70" x2="280" y2="70" stroke="#10b981" strokeWidth="1.5" strokeDasharray="3 2" />
      <text x="236" y="64" fontSize="10" fill="#10b981" fontWeight="bold">u</text>

      {/* Parabola curve */}
      {/* V(200, 240) -> u=200, v=240 (minimum) */}
      <path
        d="M 100 20 Q 120 70 150 180 Q 200 240 250 180 Q 280 70 300 20"
        fill="none"
        stroke="#4f46e5"
        strokeWidth="3"
      />

      {/* 5 POINTS */}
      {/* Point 1: Vertex */}
      <circle cx="200" cy="240" r="5" fill="#f43f5e" />
      <rect x="160" y="248" width="80" height="20" rx="4" fill="#f43f5e" fillOpacity="0.15" stroke="#f43f5e" strokeWidth="1" />
      <text x="166" y="262" fontSize="10" fill="#f43f5e" fontWeight="bold">1. Csúcs V(u; v)</text>

      {/* Point 2: y-intercept (0; c) */}
      <circle cx="120" cy="70" r="5" fill="#10b981" />
      <rect x="25" y="70" width="85" height="20" rx="4" fill="#10b981" fillOpacity="0.15" stroke="#10b981" strokeWidth="1" />
      <text x="30" y="84" fontSize="10" fill="#10b981" fontWeight="bold">2. Tengelym. (0; c)</text>

      {/* Point 3: Symmetric point (2u; c) */}
      <circle cx="280" cy="70" r="5" fill="#10b981" />
      <rect x="288" y="70" width="88" height="20" rx="4" fill="#10b981" fillOpacity="0.15" stroke="#10b981" strokeWidth="1" />
      <text x="293" y="84" fontSize="10" fill="#10b981" fontWeight="bold">3. Tükörkép (2u; c)</text>

      {/* Point 4: Left root (x₁; 0) */}
      <circle cx="150" cy="180" r="5" fill="#3b82f6" />
      <rect x="95" y="145" width="70" height="18" rx="3" fill="#3b82f6" fillOpacity="0.15" stroke="#3b82f6" strokeWidth="1" />
      <text x="100" y="158" fontSize="9" fill="#3b82f6" fontWeight="bold">4. Zérushely x₁</text>

      {/* Point 5: Right root (x₂; 0) */}
      <circle cx="250" cy="180" r="5" fill="#3b82f6" />
      <rect x="235" y="145" width="70" height="18" rx="3" fill="#3b82f6" fillOpacity="0.15" stroke="#3b82f6" strokeWidth="1" />
      <text x="240" y="158" fontSize="9" fill="#3b82f6" fontWeight="bold">5. Zérushely x₂</text>
    </svg>
  );
};

/**
 * ParabolaCharacterizationSvg:
 * Highlights function properties:
 * - Monotonicity: strictly decreasing on ]-inf; u], strictly increasing on [u; inf[
 * - Range: [v; inf[
 * - Sign: f(x) > 0 outside roots, f(x) < 0 between roots
 */
export const ParabolaCharacterizationSvg: React.FC<SvgProps> = ({ size = 300, className = '' }) => {
  return (
    <svg
      viewBox="-40 -40 380 320"
      width={size}
      height={size * 0.85}
      className={`select-none ${className}`}
    >
      <defs>
        <marker id="qg-arrow-char" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="currentColor" opacity="0.6" />
        </marker>
        <marker id="qg-arrow-mono" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#0284c7" />
        </marker>
      </defs>

      {/* Axes */}
      <line x1="-20" y1="160" x2="330" y2="160" stroke="currentColor" strokeWidth="1.5" opacity="0.5" markerEnd="url(#qg-arrow-char)" />
      <line x1="80" y1="260" x2="80" y2="-20" stroke="currentColor" strokeWidth="1.5" opacity="0.5" markerEnd="url(#qg-arrow-char)" />

      <text x="320" y="152" fontSize="12" fill="currentColor" opacity="0.7" fontWeight="bold">x</text>
      <text x="88" y="-12" fontSize="12" fill="currentColor" opacity="0.7" fontWeight="bold">y</text>

      {/* Range [v; inf[ highlight on y-axis */}
      <line x1="80" y1="220" x2="80" y2="-10" stroke="#10b981" strokeWidth="4" opacity="0.7" />
      <rect x="15" y="210" width="60" height="18" rx="3" fill="#10b981" fillOpacity="0.2" stroke="#10b981" strokeWidth="1" />
      <text x="20" y="223" fontSize="9" fill="#10b981" fontWeight="bold">v (min)</text>
      <text x="10" y="100" fontSize="10" fill="#10b981" fontWeight="bold">ÉK: [v; ∞[</text>

      {/* Parabola */}
      {/* Roots at 130, 230. Vertex at 180, 220. */}
      <path
        d="M 90 40 Q 110 100 130 160 Q 180 220 230 160 Q 250 100 270 40"
        fill="none"
        stroke="#6366f1"
        strokeWidth="3"
      />

      {/* Sign highlights */}
      {/* Positive region left */}
      <rect x="90" y="60" width="35" height="16" rx="3" fill="#10b981" fillOpacity="0.2" />
      <text x="96" y="72" fontSize="9" fill="#10b981" fontWeight="bold">f(x) &gt; 0</text>

      {/* Positive region right */}
      <rect x="235" y="60" width="35" height="16" rx="3" fill="#10b981" fillOpacity="0.2" />
      <text x="241" y="72" fontSize="9" fill="#10b981" fontWeight="bold">f(x) &gt; 0</text>

      {/* Negative region below x-axis */}
      <rect x="162" y="175" width="36" height="16" rx="3" fill="#ef4444" fillOpacity="0.2" />
      <text x="167" y="187" fontSize="9" fill="#ef4444" fontWeight="bold">f(x) &lt; 0</text>

      {/* Monotonicity arrows */}
      {/* Decreasing on ]-inf; u] */}
      <path d="M 120 230 L 150 245" fill="none" stroke="#0284c7" strokeWidth="2" markerEnd="url(#qg-arrow-mono)" />
      <text x="105" y="260" fontSize="9" fill="#0284c7" fontWeight="bold">Csökken ↘</text>

      {/* Increasing on [u; inf[ */}
      <path d="M 210 245 L 240 230" fill="none" stroke="#0284c7" strokeWidth="2" markerEnd="url(#qg-arrow-mono)" />
      <text x="215" y="260" fontSize="9" fill="#0284c7" fontWeight="bold">Nő ↗</text>

      {/* Vertex */}
      <circle cx="180" cy="220" r="4.5" fill="#f43f5e" />
      <text x="188" y="222" fontSize="9" fill="#f43f5e" fontWeight="bold">V(u; v)</text>
    </svg>
  );
};

