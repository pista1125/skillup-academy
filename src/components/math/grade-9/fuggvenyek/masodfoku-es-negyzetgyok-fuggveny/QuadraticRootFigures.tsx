import React from 'react';

interface FigureProps {
  size?: number;
  className?: string;
}

/**
 * Parabola csúcsponti alak ábrája: f(x) = a(x - u)² + v
 */
export const ParabolaTransformSvg: React.FC<FigureProps> = ({ size = 280, className = '' }) => {
  return (
    <svg
      viewBox="0 0 320 220"
      width={size}
      height={size * (220 / 320)}
      className={`select-none ${className}`}
    >
      <defs>
        <marker id="pt-arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1.5 L 10 5 L 0 8.5 z" fill="#64748b" />
        </marker>
      </defs>

      <rect width="320" height="220" fill="#0f172a" rx="8" />
      {/* Tengelyek */}
      <path d="M 25 150 L 300 150" stroke="#334155" strokeWidth="1.5" markerEnd="url(#pt-arrow)" />
      <path d="M 90 200 L 90 20" stroke="#334155" strokeWidth="1.5" markerEnd="url(#pt-arrow)" />
      <text x="295" y="165" fill="#94a3b8" fontSize="11">x</text>
      <text x="78" y="28" fill="#94a3b8" fontSize="11">y</text>

      {/* Szimmetriatengely: x = u (x = 180) */}
      <line x1="180" y1="25" x2="180" y2="195" stroke="#6366f1" strokeWidth="1.2" strokeDasharray="4 4" />
      <text x="180" y="208" fill="#818cf8" fontSize="10" textAnchor="middle">tengely: x = u</text>

      {/* Parabola: C(180; 90) */}
      <path
        d="M 100 25 Q 180 220, 260 25"
        fill="none"
        stroke="#38bdf8"
        strokeWidth="3.5"
        strokeLinecap="round"
      />

      {/* Vetítővonalak a csúcspontból */}
      <line x1="180" y1="122" x2="180" y2="150" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 3" />
      <line x1="90" y1="122" x2="180" y2="122" stroke="#10b981" strokeWidth="1.5" strokeDasharray="3 3" />

      {/* Csúcspont */}
      <circle cx="180" cy="122" r="5.5" fill="#f59e0b" stroke="#ffffff" strokeWidth="1.5" />
      <text x="195" y="125" fill="#fbbf24" fontSize="12" fontWeight="bold">C(u; v)</text>

      {/* Tengely feliratok u és v */}
      <circle cx="180" cy="150" r="3.5" fill="#f59e0b" />
      <text x="180" y="165" fill="#fde68a" fontSize="11" textAnchor="middle">u</text>

      <circle cx="90" cy="122" r="3.5" fill="#10b981" />
      <text x="75" y="126" fill="#a7f3d0" fontSize="11" textAnchor="end">v</text>

      {/* Cím / képlet */}
      <text x="180" y="45" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">
        f(x) = a(x - u)² + v
      </text>
    </svg>
  );
};

/**
 * Négyzetgyök-függvény: g(x) = √(x) fekvő félparabola
 */
export const SquareRootSvg: React.FC<FigureProps> = ({ size = 280, className = '' }) => {
  return (
    <svg
      viewBox="0 0 320 220"
      width={size}
      height={size * (220 / 320)}
      className={`select-none ${className}`}
    >
      <defs>
        <marker id="sr-arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1.5 L 10 5 L 0 8.5 z" fill="#64748b" />
        </marker>
      </defs>

      <rect width="320" height="220" fill="#0f172a" rx="8" />
      {/* Tengelyek */}
      <path d="M 35 160 L 300 160" stroke="#334155" strokeWidth="1.5" markerEnd="url(#sr-arrow)" />
      <path d="M 60 200 L 60 20" stroke="#334155" strokeWidth="1.5" markerEnd="url(#sr-arrow)" />
      <text x="295" y="175" fill="#94a3b8" fontSize="11">x</text>
      <text x="48" y="28" fill="#94a3b8" fontSize="11">y</text>

      {/* Nem megengedett tartomány (x < 0 tiltott) sraffozás */}
      <rect x="20" y="25" width="40" height="170" fill="#ef4444" fillOpacity="0.12" rx="2" />
      <text x="40" y="100" fill="#f87171" fontSize="9" textAnchor="middle" transform="rotate(-90 40 100)">
        x &lt; 0 TILTOTT
      </text>

      {/* Fekvő félparabola: (60, 160)-ból indulva (100, 120), (160, 95), (240, 75), (290, 62) */}
      <path
        d="M 60 160 Q 90 105, 170 85 T 290 55"
        fill="none"
        stroke="#10b981"
        strokeWidth="3.5"
        strokeLinecap="round"
      />

      {/* Kezdőpont */}
      <circle cx="60" cy="160" r="5" fill="#10b981" stroke="#ffffff" strokeWidth="1.5" />
      <text x="75" y="178" fill="#6ee7b7" fontSize="11" fontWeight="bold">K(0; 0)</text>

      {/* Nevezetes pontok: (1; 1) -> (100, 125) és (4; 2) -> (220, 90) */}
      <circle cx="110" cy="120" r="3.5" fill="#34d399" />
      <text x="110" y="110" fill="#a7f3d0" fontSize="10" textAnchor="middle">(1; 1)</text>

      <circle cx="220" cy="80" r="3.5" fill="#34d399" />
      <text x="220" y="70" fill="#a7f3d0" fontSize="10" textAnchor="middle">(4; 2)</text>

      {/* Képlet */}
      <text x="175" y="40" fill="#34d399" fontSize="13" fontWeight="bold">
        g(x) = √x &nbsp;(x ≥ 0)
      </text>
    </svg>
  );
};

/**
 * Összehasonlítás: Másodfokú vs Négyzetgyök (inverz kapcsolat x ≥ 0 esetén)
 */
export const TransformComparisonSvg: React.FC<FigureProps> = ({ size = 280, className = '' }) => {
  return (
    <svg
      viewBox="0 0 320 220"
      width={size}
      height={size * (220 / 320)}
      className={`select-none ${className}`}
    >
      <rect width="320" height="220" fill="#0f172a" rx="8" />
      {/* Tengelyek */}
      <path d="M 25 180 L 300 180" stroke="#334155" strokeWidth="1.5" />
      <path d="M 60 200 L 60 20" stroke="#334155" strokeWidth="1.5" />

      {/* y = x tükörtengely */}
      <line x1="60" y1="180" x2="220" y2="20" stroke="#64748b" strokeWidth="1.2" strokeDasharray="3 3" />
      <text x="225" y="25" fill="#94a3b8" fontSize="10">y = x</text>

      {/* x² jobb ága (kék) */}
      <path
        d="M 60 180 Q 90 170, 130 60"
        fill="none"
        stroke="#38bdf8"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <text x="140" y="55" fill="#38bdf8" fontSize="11" fontWeight="bold">y = x² (x ≥ 0)</text>

      {/* √x görbéje (zöld) */}
      <path
        d="M 60 180 Q 70 140, 180 110"
        fill="none"
        stroke="#10b981"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <text x="185" y="115" fill="#10b981" fontSize="11" fontWeight="bold">y = √x</text>

      {/* Tükrözési jelzés */}
      <circle cx="60" cy="180" r="4" fill="#f59e0b" />
      <text x="160" y="205" fill="#cbd5e1" fontSize="10" textAnchor="middle">
        Tükrözés az y = x egyenesre (inverz kapcsolat)
      </text>
    </svg>
  );
};

