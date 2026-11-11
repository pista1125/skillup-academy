import React from 'react';

export const GeometryReviewMapSvg: React.FC = () => {
  return (
    <svg viewBox="0 0 540 260" className="w-full max-w-2xl mx-auto block select-none">
      {/* Central Hub */}
      <circle cx="270" cy="130" r="46" fill="#eff6ff" stroke="#3b82f6" strokeWidth="2.5" />
      <text x="270" y="125" fill="#1d4ed8" fontSize="13" fontWeight="bold" textAnchor="middle">EGYBEVÁGÓSÁG</text>
      <text x="270" y="142" fill="#1d4ed8" fontSize="13" fontWeight="bold" textAnchor="middle">&amp; KÖR</text>

      {/* Node 1: Congruence (Top-Left) */}
      <rect x="25" y="20" width="160" height="60" rx="10" fill="#f8fafc" stroke="#64748b" strokeWidth="2" />
      <text x="105" y="44" fill="#0f172a" fontSize="12" fontWeight="bold" textAnchor="middle">Háromszögek</text>
      <text x="105" y="62" fill="#475569" fontSize="11" textAnchor="middle">4 alapeset (o-o-o, o-sz-o...)</text>
      <line x1="185" y1="65" x2="232" y2="105" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3 2" />

      {/* Node 2: Circle Metrics (Top-Right) */}
      <rect x="355" y="20" width="160" height="60" rx="10" fill="#ecfdf5" stroke="#10b981" strokeWidth="2" />
      <text x="435" y="44" fill="#065f46" fontSize="12" fontWeight="bold" textAnchor="middle">Kör kerülete &amp; területe</text>
      <text x="435" y="62" fill="#047857" fontSize="11" textAnchor="middle">K = 2rπ, T = r²π, körgyűrű</text>
      <line x1="355" y1="65" x2="308" y2="105" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3 2" />

      {/* Node 3: Arcs & Sectors (Bottom-Right) */}
      <rect x="355" y="180" width="160" height="60" rx="10" fill="#fff7ed" stroke="#f97316" strokeWidth="2" />
      <text x="435" y="204" fill="#9a3412" fontSize="12" fontWeight="bold" textAnchor="middle">Ívek, cikkek &amp; szögek</text>
      <text x="435" y="222" fill="#c2410c" fontSize="11" textAnchor="middle">i, Tc, α = 2β (kerületi-kp)</text>
      <line x1="355" y1="195" x2="308" y2="155" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3 2" />

      {/* Node 4: Polygons & Circles (Bottom-Left) */}
      <rect x="25" y="180" width="160" height="60" rx="10" fill="#fdf4ff" stroke="#c084fc" strokeWidth="2" />
      <text x="105" y="204" fill="#701a75" fontSize="12" fontWeight="bold" textAnchor="middle">Sokszögek &amp; körök</text>
      <text x="105" y="222" fill="#86198f" fontSize="11" textAnchor="middle">Húrnégyszög, érintőnégyszög</text>
      <line x1="185" y1="195" x2="232" y2="155" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3 2" />
    </svg>
  );
};

export const ThalesAndAngleSynthesisSvg: React.FC = () => {
  // Thales circle with right angle (Hungarian arc + dot) and inscribed angle
  const cx = 150;
  const cy = 100;
  const R = 75;
  const Ax = cx - R; // 75
  const Bx = cx + R; // 225
  const Cx = 110;
  const Cy = 38;

  return (
    <svg viewBox="0 0 300 170" className="w-full max-w-md mx-auto block select-none">
      {/* Semicircle */}
      <path d={`M ${Ax} ${cy} A ${R} ${R} 0 0 1 ${Bx} ${cy}`} fill="#f8fafc" stroke="#3b82f6" strokeWidth="2" />
      <line x1={Ax} y1={cy} x2={Bx} y2={cy} stroke="#1e293b" strokeWidth="2.5" />
      
      {/* Point C */}
      <line x1={Ax} y1={cy} x2={Cx} y2={Cy} stroke="#0284c7" strokeWidth="2" />
      <line x1={Bx} y1={cy} x2={Cx} y2={Cy} stroke="#0284c7" strokeWidth="2" />
      
      {/* Vertices */}
      <circle cx={Ax} cy={cy} r="3" fill="#1e293b" />
      <text x={Ax - 12} y={cy + 4} fill="#1e293b" fontSize="11" fontWeight="bold">A</text>
      
      <circle cx={Bx} cy={cy} r="3" fill="#1e293b" />
      <text x={Bx + 6} y={cy + 4} fill="#1e293b" fontSize="11" fontWeight="bold">B</text>

      <circle cx={Cx} cy={Cy} r="3" fill="#1e293b" />
      <text x={Cx - 8} y={Cy - 6} fill="#1e293b" fontSize="11" fontWeight="bold">C</text>

      <circle cx={cx} cy={cy} r="3" fill="#1e293b" />
      <text x={cx - 4} y={cy + 16} fill="#1e293b" fontSize="11" fontWeight="bold">O</text>

      {/* Hungarian right angle symbol at C: arc with center dot */}
      <path d="M 104 52 A 12 12 0 0 0 124 48" fill="none" stroke="#dc2626" strokeWidth="1.5" />
      <circle cx="114" cy="51" r="1.8" fill="#dc2626" />
      <text x="108" y="68" fill="#dc2626" fontSize="10" fontWeight="bold">90°</text>

      <text x={cx} y="155" fill="#475569" fontSize="11" textAnchor="middle">
        Thálész-tétel: átmérő felett mindig 90°
      </text>
    </svg>
  );
};

export const PillarCongruenceMiniSvg: React.FC<{ size?: number; className?: string }> = ({ size = 60, className = '' }) => (
  <svg viewBox="0 0 100 100" width={size} height={size} className={`select-none ${className}`}>
    <polygon points="10,75 45,75 35,25" fill="#e0e7ff" stroke="#4f46e5" strokeWidth="2" />
    <polygon points="55,75 90,75 80,25" fill="#e0e7ff" stroke="#4f46e5" strokeWidth="2" />
    <text x="50" y="88" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#4338ca">△₁ ≅ △₂</text>
  </svg>
);

export const PillarCircleMiniSvg: React.FC<{ size?: number; className?: string }> = ({ size = 60, className = '' }) => (
  <svg viewBox="0 0 100 100" width={size} height={size} className={`select-none ${className}`}>
    <circle cx="50" cy="50" r="38" fill="#ecfdf5" stroke="#10b981" strokeWidth="2.5" />
    <line x1="50" y1="50" x2="88" y2="50" stroke="#047857" strokeWidth="2" />
    <circle cx="50" cy="50" r="3" fill="#047857" />
    <text x="69" y="44" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#047857">r</text>
  </svg>
);

export const PillarAnglesMiniSvg: React.FC<{ size?: number; className?: string }> = ({ size = 60, className = '' }) => (
  <svg viewBox="0 0 100 100" width={size} height={size} className={`select-none ${className}`}>
    <path d="M 50 65 L 85 30 A 45 45 0 0 0 15 30 Z" fill="#fff7ed" stroke="#ea580c" strokeWidth="2" />
    <path d="M 85 30 A 45 45 0 0 0 15 30" fill="none" stroke="#dc2626" strokeWidth="3" />
    <circle cx="50" cy="65" r="2.5" fill="#9a3412" />
    <text x="50" y="48" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#9a3412">i, T_c</text>
  </svg>
);

export const PillarPolygonsMiniSvg: React.FC<{ size?: number; className?: string }> = ({ size = 60, className = '' }) => (
  <svg viewBox="0 0 100 100" width={size} height={size} className={`select-none ${className}`}>
    <circle cx="50" cy="50" r="38" fill="#fdf4ff" stroke="#c084fc" strokeWidth="2" strokeDasharray="3 2" />
    <polygon points="18,60 45,88 82,65 68,18" fill="none" stroke="#701a75" strokeWidth="2" />
    <text x="50" y="54" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#701a75">180°</text>
  </svg>
);
