import React from 'react';

export const RegularHexagonTessellationSvg: React.FC = () => {
  const cx = 150;
  const cy = 105;
  const R = 65;
  const pts: string[] = [];
  for (let i = 0; i < 6; i++) {
    const angle = (i * 60) * (Math.PI / 180);
    pts.push(`${(cx + R * Math.cos(angle)).toFixed(1)},${(cy + R * Math.sin(angle)).toFixed(1)}`);
  }

  return (
    <svg viewBox="0 0 300 210" className="w-full max-w-md mx-auto block select-none">
      {/* 6 equilateral triangles radiating from center */}
      {pts.map((pt, idx) => {
        const nextPt = pts[(idx + 1) % 6];
        return (
          <polygon
            key={idx}
            points={`${cx},${cy} ${pt} ${nextPt}`}
            fill={idx % 2 === 0 ? '#eff6ff' : '#dbeafe'}
            stroke="#3b82f6"
            strokeWidth="1.5"
          />
        );
      })}

      {/* Center point */}
      <circle cx={cx} cy={cy} r="3" fill="#1e293b" />
      
      {/* Inscribed circle */}
      <circle cx={cx} cy={cy} r={(65 * Math.sqrt(3)) / 2} fill="none" stroke="#10b981" strokeWidth="2" strokeDasharray="4 3" />
      
      {/* Circumscribed circle */}
      <circle cx={cx} cy={cy} r={65} fill="none" stroke="#6366f1" strokeWidth="1" strokeDasharray="2 2" opacity="0.6" />

      {/* One altitude drawn in bottom triangle with Hungarian arc + dot */}
      <line x1={cx} y1={cy} x2={cx} y2={cy + (65 * Math.sqrt(3)) / 2} stroke="#dc2626" strokeWidth="2" />
      <text x={cx + 6} y={cy + 35} fill="#dc2626" fontSize="11" fontWeight="bold">r = m = a√3/2</text>

      {/* Hungarian right angle symbol at midpoint: arc with dot */}
      <path d={`M ${cx - 8} ${cy + (65 * Math.sqrt(3)) / 2} A 8 8 0 0 1 ${cx} ${cy + (65 * Math.sqrt(3)) / 2 - 8}`} fill="none" stroke="#dc2626" strokeWidth="1.5" />
      <circle cx={cx - 3} cy={cy + (65 * Math.sqrt(3)) / 2 - 3} r="1.5" fill="#dc2626" />

      {/* Labels */}
      <text x={cx + 36} y={cy - 10} fill="#1d4ed8" fontSize="11" fontWeight="bold">R = a</text>
      <text x={cx} y={cy + 65 + 16} fill="#1e293b" fontSize="11" fontWeight="bold" textAnchor="middle">a (oldal)</text>

      {/* Badge */}
      <g transform="translate(10, 10)">
        <rect x="0" y="0" width="136" height="36" rx="6" fill="#ffffff" fillOpacity="0.95" stroke="#93c5fd" strokeWidth="1" />
        <text x="10" y="15" fill="#1e293b" fontSize="10" fontWeight="bold">6 db szabályos háromszög</text>
        <text x="10" y="28" fill="#2563eb" fontSize="10">T = 6 · (a²√3 / 4) = 3a²√3 / 2</text>
      </g>
    </svg>
  );
};

export const TangentialTrapezoidSvg: React.FC = () => {
  return (
    <svg viewBox="0 0 300 200" className="w-full max-w-md mx-auto block select-none">
      {/* Inscribed circle */}
      <circle cx="150" cy="112" r="48" fill="#fef2f2" stroke="#ef4444" strokeWidth="2" strokeDasharray="3 3" />
      <circle cx="150" cy="112" r="3" fill="#ef4444" />
      <text x="144" y="105" fill="#ef4444" fontSize="10" fontWeight="bold">r</text>

      {/* Trapezoid */}
      <polygon points="70,160 230,160 180,64 120,64" fill="none" stroke="#1e293b" strokeWidth="2.5" />

      {/* Height line on left */}
      <line x1="120" y1="64" x2="120" y2="160" stroke="#0284c7" strokeWidth="1.5" strokeDasharray="3 2" />
      <text x="124" y="116" fill="#0284c7" fontSize="11" fontWeight="bold">m = 2r</text>

      {/* Hungarian right angle symbol at (120, 160) */}
      <path d="M 120 148 A 12 12 0 0 1 132 160" fill="none" stroke="#0284c7" strokeWidth="1.5" />
      <circle cx="125" cy="155" r="1.8" fill="#0284c7" />

      {/* Height line on right */}
      <line x1="180" y1="64" x2="180" y2="160" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2 2" />

      {/* Projected segments on bottom base */}
      <text x="95" y="174" fill="#64748b" fontSize="10" textAnchor="middle">(a-c)/2</text>
      <text x="150" y="174" fill="#64748b" fontSize="10" textAnchor="middle">c</text>
      <text x="205" y="174" fill="#64748b" fontSize="10" textAnchor="middle">(a-c)/2</text>

      {/* Labels */}
      <text x="150" y="192" fill="#1e293b" fontSize="12" fontWeight="bold" textAnchor="middle">a (alsó alap)</text>
      <text x="150" y="52" fill="#1e293b" fontSize="12" fontWeight="bold" textAnchor="middle">c (felső alap)</text>
      <text x="82" y="105" fill="#ea580c" fontSize="12" fontWeight="bold">b</text>
      <text x="210" y="105" fill="#ea580c" fontSize="12" fontWeight="bold">b</text>

      {/* Formula note */}
      <g transform="translate(170, 12)">
        <rect x="0" y="0" width="124" height="42" rx="6" fill="#ffffff" stroke="#ea580c" strokeWidth="1" />
        <text x="62" y="16" fill="#ea580c" fontSize="10" fontWeight="bold" textAnchor="middle">Szár = Számtani közép:</text>
        <text x="62" y="32" fill="#1e293b" fontSize="10" textAnchor="middle">b = (a + c) / 2</text>
      </g>
    </svg>
  );
};

export const RightAngledTangentialTrapezoidSvg: React.FC = () => {
  // Derékszögű érintőtrapéz:
  // a = 160 (alsó alap), c = 80 (felső alap)
  // m = 2*a*c / (a+c) = 2*160*80 / 240 = 25600 / 240 = 106.67
  // Scaling for SVG viewBox: let a = 140, c = 70.
  // m = 2*140*70 / 210 = 93.33 -> r = 46.67
  // Coords:
  // Bottom-left A: (50, 160)
  // Top-left D: (50, 160 - 93.33) = (50, 66.67)
  // Top-right C: (50 + 70, 66.67) = (120, 66.67)
  // Bottom-right B: (50 + 140, 160) = (190, 160)
  // Incircle center: cx = 50 + r = 96.67, cy = 66.67 + r = 113.33, radius = 46.67
  return (
    <svg viewBox="0 0 320 200" className="w-full max-w-md mx-auto block select-none">
      {/* Inscribed circle */}
      <circle cx="96.7" cy="113.3" r="46.7" fill="#ecfdf5" stroke="#10b981" strokeWidth="2" strokeDasharray="3 3" />
      <circle cx="96.7" cy="113.3" r="3" fill="#10b981" />
      <text x="102" y="112" fill="#047857" fontSize="10" fontWeight="bold">r</text>

      {/* Trapezoid outline */}
      <polygon points="50,160 190,160 120,66.7 50,66.7" fill="none" stroke="#1e293b" strokeWidth="2.5" />

      {/* Right angle at bottom-left (50, 160): Hungarian arc + dot */}
      <path d="M 50 148 A 12 12 0 0 1 62 160" fill="none" stroke="#dc2626" strokeWidth="1.5" />
      <circle cx="55" cy="155" r="1.8" fill="#dc2626" />

      {/* Right angle at top-left (50, 66.7): Hungarian arc + dot */}
      <path d="M 62 66.7 A 12 12 0 0 1 50 78.7" fill="none" stroke="#dc2626" strokeWidth="1.5" />
      <circle cx="55" cy="72" r="1.8" fill="#dc2626" />

      {/* Height dropped from C (120, 66.7) to (120, 160) */}
      <line x1="120" y1="66.7" x2="120" y2="160" stroke="#0284c7" strokeWidth="1.5" strokeDasharray="3 2" />
      <text x="123" y="115" fill="#0284c7" fontSize="10" fontWeight="bold">m = d</text>

      {/* Right angle at foot (120, 160) */}
      <path d="M 120 150 A 10 10 0 0 1 130 160" fill="none" stroke="#0284c7" strokeWidth="1.2" />
      <circle cx="124" cy="156" r="1.4" fill="#0284c7" />

      {/* Base segments */}
      <text x="85" y="174" fill="#64748b" fontSize="10" textAnchor="middle">c</text>
      <text x="155" y="174" fill="#64748b" fontSize="10" textAnchor="middle">a - c</text>
      <text x="120" y="192" fill="#1e293b" fontSize="12" fontWeight="bold" textAnchor="middle">a (alsó alap)</text>

      {/* Labels */}
      <text x="85" y="55" fill="#1e293b" fontSize="12" fontWeight="bold" textAnchor="middle">c (felső alap)</text>
      <text x="24" y="118" fill="#dc2626" fontSize="11" fontWeight="bold">d = m = 2r</text>
      <text x="168" y="105" fill="#ea580c" fontSize="12" fontWeight="bold">b = a+c-m</text>

      {/* Formula note badge */}
      <g transform="translate(195, 15)">
        <rect x="0" y="0" width="120" height="46" rx="6" fill="#ffffff" stroke="#10b981" strokeWidth="1" />
        <text x="60" y="16" fill="#047857" fontSize="10" fontWeight="bold" textAnchor="middle">Harmonikus közép:</text>
        <text x="60" y="29" fill="#1e293b" fontSize="10" textAnchor="middle">m = 2ac / (a + c)</text>
        <text x="60" y="41" fill="#2563eb" fontSize="10" fontWeight="bold" textAnchor="middle">T = a · c</text>
      </g>
    </svg>
  );
};

export const RegularOctagonCircleSvg: React.FC = () => {
  const cx = 150;
  const cy = 105;
  const R = 72;
  const pts: [number, number][] = [];
  for (let i = 0; i < 8; i++) {
    const angle = (i * 45 - 22.5) * (Math.PI / 180);
    pts.push([cx + R * Math.cos(angle), cy + R * Math.sin(angle)]);
  }
  const polyPoints = pts.map(p => `${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ');
  const rIncircle = R * Math.cos((22.5 * Math.PI) / 180);

  return (
    <svg viewBox="0 0 300 210" className="w-full max-w-md mx-auto block select-none">
      {/* Circumcircle */}
      <circle cx={cx} cy={cy} r={R} fill="none" stroke="#818cf8" strokeWidth="1.5" strokeDasharray="3 3" />

      {/* Incircle */}
      <circle cx={cx} cy={cy} r={rIncircle} fill="#f0fdf4" stroke="#10b981" strokeWidth="1.5" strokeDasharray="4 2" />

      {/* 8 isosceles triangles radiating from center */}
      {pts.map((pt, idx) => {
        const nextPt = pts[(idx + 1) % 8];
        return (
          <polygon
            key={idx}
            points={`${cx},${cy} ${pt[0]},${pt[1]} ${nextPt[0]},${nextPt[1]}`}
            fill={idx === 1 ? '#dbeafe' : 'none'}
            stroke="#cbd5e1"
            strokeWidth="1"
          />
        );
      })}

      {/* Octagon perimeter */}
      <polygon points={polyPoints} fill="none" stroke="#1e293b" strokeWidth="2.5" />

      {/* Center point */}
      <circle cx={cx} cy={cy} r="3" fill="#1e293b" />
      <text x={cx - 12} y={cy - 6} fill="#1e293b" fontSize="10" fontWeight="bold">O</text>

      {/* Highlighted triangle (idx 1: top side) */}
      <line x1={cx} y1={cy} x2={cx} y2={cy - rIncircle} stroke="#dc2626" strokeWidth="1.8" />
      <text x={cx + 5} y={cy - 30} fill="#dc2626" fontSize="10" fontWeight="bold">r</text>

      {/* Hungarian right angle symbol at midpoint of top edge */}
      <path d={`M ${cx - 8} ${cy - rIncircle} A 8 8 0 0 0 ${cx} ${cy - rIncircle + 8}`} fill="none" stroke="#dc2626" strokeWidth="1.5" />
      <circle cx={cx - 3} cy={cy - rIncircle + 3} r="1.5" fill="#dc2626" />

      {/* Radius R line */}
      <line x1={cx} y1={cy} x2={pts[1][0]} y2={pts[1][1]} stroke="#4f46e5" strokeWidth="1.8" />
      <text x={cx + 36} y={cy - 12} fill="#4f46e5" fontSize="10" fontWeight="bold">R</text>

      {/* Top edge label a */}
      <text x={cx} y={cy - rIncircle - 6} fill="#1e293b" fontSize="11" fontWeight="bold" textAnchor="middle">a (oldal)</text>

      {/* Central angle label */}
      <text x={cx + 10} y={cy + 18} fill="#4338ca" fontSize="10" fontWeight="bold">45°</text>

      {/* Badge */}
      <g transform="translate(10, 10)">
        <rect x="0" y="0" width="134" height="38" rx="6" fill="#ffffff" fillOpacity="0.95" stroke="#93c5fd" strokeWidth="1" />
        <text x="8" y="15" fill="#1e293b" fontSize="10" fontWeight="bold">Szabályos 8-szög (n = 8)</text>
        <text x="8" y="29" fill="#059669" fontSize="10">8 db egyenlő szárú △</text>
      </g>
    </svg>
  );
};

export const SymmTangentialTrapezoidMiniSvg: React.FC<{ size?: number; className?: string }> = ({ size = 60, className = '' }) => (
  <svg viewBox="0 0 100 100" width={size} height={size} className={`select-none ${className}`}>
    <polygon points="15,80 85,80 70,30 30,30" fill="#fef2f2" stroke="#ef4444" strokeWidth="2" />
    <circle cx="50" cy="55" r="25" fill="#ffffff" stroke="#0284c7" strokeWidth="1.8" strokeDasharray="2 2" />
    <circle cx="50" cy="55" r="2" fill="#0284c7" />
    <text x="50" y="58" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#0284c7">b=(a+c)/2</text>
  </svg>
);

export const RightTangentialTrapezoidMiniSvg: React.FC<{ size?: number; className?: string }> = ({ size = 60, className = '' }) => (
  <svg viewBox="0 0 100 100" width={size} height={size} className={`select-none ${className}`}>
    <polygon points="20,80 85,80 55,30 20,30" fill="#ecfdf5" stroke="#10b981" strokeWidth="2" />
    <path d="M 20 72 A 8 8 0 0 1 28 80" fill="none" stroke="#dc2626" strokeWidth="1.2" />
    <circle cx="24" cy="76" r="1.2" fill="#dc2626" />
    <circle cx="45" cy="55" r="25" fill="#ffffff" stroke="#059669" strokeWidth="1.8" strokeDasharray="2 2" />
    <circle cx="45" cy="55" r="2" fill="#059669" />
    <text x="45" y="58" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#059669">T=a·c</text>
  </svg>
);

export const RegularOctagonMiniSvg: React.FC<{ size?: number; className?: string }> = ({ size = 60, className = '' }) => (
  <svg viewBox="0 0 100 100" width={size} height={size} className={`select-none ${className}`}>
    <circle cx="50" cy="50" r="40" fill="#faf5ff" stroke="#818cf8" strokeWidth="1.5" strokeDasharray="3 2" />
    <polygon
      points="78.3,21.7 50,10 21.7,21.7 10,50 21.7,78.3 50,90 78.3,78.3 90,50"
      fill="#f0fdf4"
      stroke="#1e293b"
      strokeWidth="2"
    />
    <circle cx="50" cy="50" r="2" fill="#1e293b" />
    <text x="50" y="53" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#4338ca">45°</text>
  </svg>
);
