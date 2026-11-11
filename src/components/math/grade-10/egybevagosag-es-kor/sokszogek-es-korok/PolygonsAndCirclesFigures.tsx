import React from 'react';

export const RegularHexagonCirclesSvg: React.FC = () => {
  // Hexagon with circumscribed circle R=70, inscribed circle r=70*sqrt(3)/2 ~= 60.62
  const cx = 150;
  const cy = 110;
  const R = 70;
  const r = 60.62;
  const pts = [];
  for (let i = 0; i < 6; i++) {
    const angle = (i * 60) * (Math.PI / 180);
    pts.push(`${(cx + R * Math.cos(angle)).toFixed(1)},${(cy + R * Math.sin(angle)).toFixed(1)}`);
  }
  const hexPoints = pts.join(' ');

  return (
    <svg viewBox="0 0 300 220" className="w-full max-w-md mx-auto block select-none">
      {/* Circumscribed circle */}
      <circle cx={cx} cy={cy} r={R} fill="none" stroke="#3b82f6" strokeWidth="2" strokeDasharray="4 3" />
      {/* Inscribed circle */}
      <circle cx={cx} cy={cy} r={r} fill="#ecfdf5" fillOpacity="0.4" stroke="#10b981" strokeWidth="2" />
      
      {/* Regular hexagon */}
      <polygon points={hexPoints} fill="none" stroke="#1e293b" strokeWidth="2.5" />
      
      {/* Center point */}
      <circle cx={cx} cy={cy} r="3.5" fill="#1e293b" />
      <text x={cx - 14} y={cy - 6} fill="#1e293b" fontSize="12" fontWeight="bold">O</text>

      {/* Radius R to one vertex (angle 0: x=cx+R, y=cy) */}
      <line x1={cx} y1={cy} x2={cx + R} y2={cy} stroke="#3b82f6" strokeWidth="2" />
      <text x={cx + 30} y={cy - 6} fill="#2563eb" fontSize="11" fontWeight="bold">R = a</text>

      {/* Radius r to midpoint of bottom-right edge (angle 30 deg: cos(30)=sqrt(3)/2) */}
      {/* mid point at angle 30: x = cx + r*cos(30) = cx + 52.5, y = cy + r*sin(30) = cy + 30.3 */}
      <line x1={cx} y1={cy} x2={cx + 52.5} y2={cy + 30.3} stroke="#059669" strokeWidth="2" strokeDasharray="3 2" />
      <text x={cx + 14} y={cy + 32} fill="#059669" fontSize="11" fontWeight="bold">r = m</text>

      {/* Right angle at midpoint: Hungarian style arc with dot */}
      {/* perpendicular to edge (angle 30 deg). Edge is tangent. */}
      <path d="M 197 137 A 9 9 0 0 0 205 133" fill="none" stroke="#059669" strokeWidth="1.5" />
      <circle cx="200" cy="133" r="1.8" fill="#059669" />

      {/* Side 'a' label on bottom edge */}
      <text x={cx} y={cy + R + 16} fill="#1e293b" fontSize="12" fontWeight="bold" textAnchor="middle">a (oldal)</text>

      {/* Legend */}
      <g transform="translate(15, 12)">
        <rect x="0" y="0" width="135" height="38" rx="6" fill="#ffffff" fillOpacity="0.9" stroke="#cbd5e1" strokeWidth="1" />
        <circle cx="12" cy="12" r="4" fill="#3b82f6" />
        <text x="22" y="16" fill="#1e293b" fontSize="10">Köré írt kör: R = a</text>
        <circle cx="12" cy="27" r="4" fill="#10b981" />
        <text x="22" y="31" fill="#1e293b" fontSize="10">Beírt kör: r = a√3/2</text>
      </g>
    </svg>
  );
};

export const CyclicQuadrilateralSvg: React.FC = () => {
  // Circle R=75 at (140, 105). Vertices on circle
  const cx = 140;
  const cy = 105;
  const R = 75;
  // Angles: A=210 deg, B=320 deg, C=40 deg, D=130 deg
  const pA = { x: cx + R * Math.cos(210 * Math.PI / 180), y: cy + R * Math.sin(210 * Math.PI / 180) };
  const pB = { x: cx + R * Math.cos(320 * Math.PI / 180), y: cy + R * Math.sin(320 * Math.PI / 180) };
  const pC = { x: cx + R * Math.cos(40 * Math.PI / 180), y: cy + R * Math.sin(40 * Math.PI / 180) };
  const pD = { x: cx + R * Math.cos(130 * Math.PI / 180), y: cy + R * Math.sin(130 * Math.PI / 180) };

  return (
    <svg viewBox="0 0 300 210" className="w-full max-w-md mx-auto block select-none">
      {/* Circle */}
      <circle cx={cx} cy={cy} r={R} fill="#f8fafc" stroke="#3b82f6" strokeWidth="2" strokeDasharray="3 3" />
      
      {/* Quadrilateral */}
      <polygon
        points={`${pA.x.toFixed(1)},${pA.y.toFixed(1)} ${pB.x.toFixed(1)},${pB.y.toFixed(1)} ${pC.x.toFixed(1)},${pC.y.toFixed(1)} ${pD.x.toFixed(1)},${pD.y.toFixed(1)}`}
        fill="#eff6ff"
        fillOpacity="0.6"
        stroke="#1d4ed8"
        strokeWidth="2.5"
      />

      {/* Vertices */}
      <circle cx={pA.x} cy={pA.y} r="3.5" fill="#1e293b" />
      <text x={pA.x - 14} y={pA.y - 4} fill="#1e293b" fontSize="11" fontWeight="bold">A</text>
      
      <circle cx={pB.x} cy={pB.y} r="3.5" fill="#1e293b" />
      <text x={pB.x + 8} y={pB.y - 4} fill="#1e293b" fontSize="11" fontWeight="bold">B</text>

      <circle cx={pC.x} cy={pC.y} r="3.5" fill="#1e293b" />
      <text x={pC.x + 8} y={pC.y + 10} fill="#1e293b" fontSize="11" fontWeight="bold">C</text>

      <circle cx={pD.x} cy={pD.y} r="3.5" fill="#1e293b" />
      <text x={pD.x - 14} y={pD.y + 10} fill="#1e293b" fontSize="11" fontWeight="bold">D</text>

      {/* Angle markers */}
      <text x={pA.x + 12} y={pA.y + 14} fill="#ea580c" fontSize="12" fontWeight="bold">α</text>
      <text x={pC.x - 18} y={pC.y - 8} fill="#ea580c" fontSize="12" fontWeight="bold">γ</text>
      <text x={pB.x - 16} y={pB.y + 16} fill="#059669" fontSize="12" fontWeight="bold">β</text>
      <text x={pD.x + 10} y={pD.y - 12} fill="#059669" fontSize="12" fontWeight="bold">δ</text>

      {/* Formula label badge */}
      <g transform="translate(195, 140)">
        <rect x="0" y="0" width="100" height="52" rx="6" fill="#ffffff" stroke="#ea580c" strokeWidth="1.5" />
        <text x="50" y="18" fill="#ea580c" fontSize="11" fontWeight="bold" textAnchor="middle">Húrnégyszög:</text>
        <text x="50" y="33" fill="#1e293b" fontSize="10" textAnchor="middle">α + γ = 180°</text>
        <text x="50" y="46" fill="#1e293b" fontSize="10" textAnchor="middle">β + δ = 180°</text>
      </g>
    </svg>
  );
};

export const TangentialQuadrilateralSvg: React.FC = () => {
  // Tangential quad with inscribed circle r=48 at (145, 105)
  return (
    <svg viewBox="0 0 300 210" className="w-full max-w-md mx-auto block select-none">
      {/* Inscribed circle */}
      <circle cx="145" cy="105" r="48" fill="#fef2f2" stroke="#ef4444" strokeWidth="2" strokeDasharray="3 3" />
      <circle cx="145" cy="105" r="3" fill="#ef4444" />
      <text x="141" y="98" fill="#ef4444" fontSize="10" fontWeight="bold">O</text>

      {/* Tangent Quad: A=(55, 160), B=(235, 175), C=(225, 45), D=(85, 35) */}
      <polygon
        points="55,160 235,175 225,45 85,35"
        fill="#fff7ed"
        fillOpacity="0.4"
        stroke="#ea580c"
        strokeWidth="2.5"
      />

      {/* Side labels a, b, c, d */}
      <text x="145" y="185" fill="#1e293b" fontSize="12" fontWeight="bold" textAnchor="middle">a</text>
      <text x="240" y="110" fill="#1e293b" fontSize="12" fontWeight="bold">b</text>
      <text x="155" y="32" fill="#1e293b" fontSize="12" fontWeight="bold" textAnchor="middle">c</text>
      <text x="55" y="95" fill="#1e293b" fontSize="12" fontWeight="bold">d</text>

      {/* Vertices */}
      <circle cx="55" cy="160" r="3.5" fill="#1e293b" />
      <circle cx="235" cy="175" r="3.5" fill="#1e293b" />
      <circle cx="225" cy="45" r="3.5" fill="#1e293b" />
      <circle cx="85" cy="35" r="3.5" fill="#1e293b" />

      {/* Tangent touch points */}
      <circle cx="145" cy="153" r="2.5" fill="#059669" />
      <circle cx="192" cy="98" r="2.5" fill="#059669" />
      <circle cx="140" cy="57" r="2.5" fill="#059669" />
      <circle cx="98" cy="115" r="2.5" fill="#059669" />

      {/* Badge with theorem */}
      <g transform="translate(15, 140)">
        <rect x="0" y="0" width="105" height="42" rx="6" fill="#ffffff" stroke="#059669" strokeWidth="1.5" />
        <text x="52" y="16" fill="#059669" fontSize="10" fontWeight="bold" textAnchor="middle">Érintőnégyszög:</text>
        <text x="52" y="33" fill="#1e293b" fontSize="12" fontWeight="bold" textAnchor="middle">a + c = b + d</text>
      </g>
    </svg>
  );
};

export const ThalesRightAngleSvg: React.FC = () => {
  // Semicircle with diameter AB, center O=(150, 140), R=80
  const cx = 150;
  const cy = 140;
  const R = 80;
  const Ax = cx - R; // 70
  const Bx = cx + R; // 230
  // Point C on circle: angle 55 deg from center upwards -> x = cx + R*cos(125 deg) = 150 - 45.88 = 104, y = 140 - 80*sin(125 deg) = 140 - 65.53 = 74
  const Cx = 104;
  const Cy = 74.5;

  return (
    <svg viewBox="0 0 300 180" className="w-full max-w-md mx-auto block select-none">
      {/* Semicircle */}
      <path d={`M ${Ax} ${cy} A ${R} ${R} 0 0 1 ${Bx} ${cy}`} fill="#f0f9ff" stroke="#3b82f6" strokeWidth="2" strokeDasharray="3 2" />
      
      {/* Diameter AB */}
      <line x1={Ax} y1={cy} x2={Bx} y2={cy} stroke="#1e293b" strokeWidth="2.5" />
      {/* Center O */}
      <circle cx={cx} cy={cy} r="3.5" fill="#1e293b" />
      <text x={cx - 4} y={cy + 16} fill="#1e293b" fontSize="11" fontWeight="bold">O</text>

      {/* Triangle ABC */}
      <line x1={Ax} y1={cy} x2={Cx} y2={Cy} stroke="#0284c7" strokeWidth="2" />
      <line x1={Bx} y1={cy} x2={Cx} y2={Cy} stroke="#0284c7" strokeWidth="2" />
      
      {/* Radius OC */}
      <line x1={cx} y1={cy} x2={Cx} y2={Cy} stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3 2" />
      <text x="132" y="112" fill="#64748b" fontSize="10">r</text>

      {/* Vertices */}
      <circle cx={Ax} cy={cy} r="3.5" fill="#1e293b" />
      <text x={Ax - 14} y={cy + 5} fill="#1e293b" fontSize="11" fontWeight="bold">A</text>
      
      <circle cx={Bx} cy={cy} r="3.5" fill="#1e293b" />
      <text x={Bx + 8} y={cy + 5} fill="#1e293b" fontSize="11" fontWeight="bold">B</text>

      <circle cx={Cx} cy={Cy} r="3.5" fill="#1e293b" />
      <text x={Cx - 14} y={Cy - 4} fill="#1e293b" fontSize="11" fontWeight="bold">C</text>

      {/* Hungarian Right Angle Notation at C: Arc + central dot! */}
      {/* The vectors from C are CA=(Ax-Cx, cy-Cy)=(-34, 65.5) and CB=(Bx-Cx, cy-Cy)=(126, 65.5) */}
      {/* We draw a circular arc inside the angle ACB with a central dot */}
      <path d="M 97 87 A 14 14 0 0 0 119 82" fill="none" stroke="#dc2626" strokeWidth="1.5" />
      <circle cx="109" cy="88" r="2" fill="#dc2626" />
      <text x="100" y="104" fill="#dc2626" fontSize="10" fontWeight="bold">90°</text>

      {/* Title / annotation */}
      <text x={cx} y="22" fill="#0369a1" fontSize="12" fontWeight="bold" textAnchor="middle">
        Thálész-tétel: γ = 90°
      </text>
    </svg>
  );
};

export const HexagonMiniSvg: React.FC<{ size?: number; className?: string }> = ({ size = 60, className = '' }) => (
  <svg viewBox="0 0 100 100" width={size} height={size} className={`select-none ${className}`}>
    <circle cx="50" cy="50" r="40" fill="#eff6ff" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="3 2" />
    <polygon points="90,50 70,84.6 30,84.6 10,50 30,15.4 70,15.4" fill="none" stroke="#1e293b" strokeWidth="2.5" />
    <circle cx="50" cy="50" r="2.5" fill="#1e293b" />
    <line x1="50" y1="50" x2="90" y2="50" stroke="#3b82f6" strokeWidth="2" />
    <text x="68" y="45" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#2563eb">R=a</text>
  </svg>
);

export const CyclicQuadMiniSvg: React.FC<{ size?: number; className?: string }> = ({ size = 60, className = '' }) => (
  <svg viewBox="0 0 100 100" width={size} height={size} className={`select-none ${className}`}>
    <circle cx="50" cy="50" r="40" fill="#f8fafc" stroke="#3b82f6" strokeWidth="2" strokeDasharray="3 2" />
    <polygon points="15,60 40,90 85,70 70,15" fill="#eff6ff" stroke="#1d4ed8" strokeWidth="2.5" />
    <text x="50" y="55" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#ea580c">α+γ=180°</text>
  </svg>
);

export const TangentialQuadMiniSvg: React.FC<{ size?: number; className?: string }> = ({ size = 60, className = '' }) => (
  <svg viewBox="0 0 100 100" width={size} height={size} className={`select-none ${className}`}>
    <polygon points="15,80 85,85 80,20 25,15" fill="#fff7ed" stroke="#ea580c" strokeWidth="2" />
    <circle cx="51" cy="51" r="32" fill="#fef2f2" stroke="#ef4444" strokeWidth="2" strokeDasharray="3 2" />
    <circle cx="51" cy="51" r="2.5" fill="#ef4444" />
    <text x="51" y="55" textAnchor="middle" fontSize="7.5" fontWeight="bold" fill="#059669">a+c=b+d</text>
  </svg>
);

export const ThalesMiniatureSvg: React.FC<{ size?: number; className?: string }> = ({ size = 60, className = '' }) => (
  <svg viewBox="0 0 100 100" width={size} height={size} className={`select-none ${className}`}>
    <path d="M 12 65 A 38 38 0 0 1 88 65" fill="#f0f9ff" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="2 2" />
    <line x1="12" y1="65" x2="88" y2="65" stroke="#1e293b" strokeWidth="2" />
    <polygon points="12,65 88,65 35,31" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
    <path d="M 30 38 A 10 10 0 0 0 43 38" fill="none" stroke="#dc2626" strokeWidth="1.2" />
    <circle cx="36" cy="38" r="1.5" fill="#dc2626" />
    <circle cx="50" cy="65" r="2.5" fill="#1e293b" />
  </svg>
);
