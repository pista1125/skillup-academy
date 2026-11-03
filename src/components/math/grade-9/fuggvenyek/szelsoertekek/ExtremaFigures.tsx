import React from 'react';

interface FigureProps {
  size?: number;
  className?: string;
}

/**
 * Szélsőérték helye (x) és értéke (y) összehasonlító ábra (Hegycsúcs és völgy)
 */
export const ExtremaConceptSvg: React.FC<FigureProps> = ({ size = 280, className = '' }) => {
  return (
    <svg
      viewBox="0 0 320 220"
      width={size}
      height={size * (220 / 320)}
      className={`select-none ${className}`}
    >
      <defs>
        <marker id="ec-arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1.5 L 10 5 L 0 8.5 z" fill="#64748b" />
        </marker>
        <linearGradient id="ec-peak-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ef4444" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="ec-valley-grad" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Rács és tengelyek */}
      <rect width="320" height="220" fill="#0f172a" rx="8" />
      <path d="M 30 140 L 300 140" stroke="#334155" strokeWidth="1.5" markerEnd="url(#ec-arrow)" />
      <path d="M 160 200 L 160 20" stroke="#334155" strokeWidth="1.5" markerEnd="url(#ec-arrow)" />
      <text x="295" y="155" fill="#94a3b8" fontSize="11" fontFamily="sans-serif">x</text>
      <text x="148" y="28" fill="#94a3b8" fontSize="11" fontFamily="sans-serif">y</text>

      {/* Bal oldali hegycsúcs (Maximum) */}
      <path
        d="M 40 180 Q 90 40, 140 160"
        fill="none"
        stroke="#f43f5e"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* Vetítővonalak Max */}
      <line x1="90" y1="62" x2="90" y2="140" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="3 3" />
      <line x1="90" y1="62" x2="160" y2="62" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="3 3" />
      <circle cx="90" cy="62" r="5" fill="#f43f5e" />
      <circle cx="90" cy="140" r="3.5" fill="#f43f5e" />
      <circle cx="160" cy="62" r="3.5" fill="#f43f5e" />

      {/* Feliratok Max */}
      <text x="90" y="48" fill="#fda4af" fontSize="12" fontWeight="bold" textAnchor="middle">MAXIMUM</text>
      <text x="90" y="156" fill="#fca5a5" fontSize="10" textAnchor="middle">hely: x₀</text>
      <text x="172" y="66" fill="#fca5a5" fontSize="10">érték: y₀</text>

      {/* Jobb oldali völgy (Minimum) */}
      <path
        d="M 180 60 Q 230 190, 290 80"
        fill="none"
        stroke="#10b981"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* Vetítővonalak Min */}
      <line x1="230" y1="168" x2="230" y2="140" stroke="#10b981" strokeWidth="1.5" strokeDasharray="3 3" />
      <line x1="160" y1="168" x2="230" y2="168" stroke="#10b981" strokeWidth="1.5" strokeDasharray="3 3" />
      <circle cx="230" cy="168" r="5" fill="#10b981" />
      <circle cx="230" cy="140" r="3.5" fill="#10b981" />
      <circle cx="160" cy="168" r="3.5" fill="#10b981" />

      {/* Feliratok Min */}
      <text x="230" y="192" fill="#6ee7b7" fontSize="12" fontWeight="bold" textAnchor="middle">MINIMUM</text>
      <text x="230" y="132" fill="#86efac" fontSize="10" textAnchor="middle">hely: x₁</text>
      <text x="135" y="172" fill="#86efac" fontSize="10" textAnchor="end">érték: y₁</text>
    </svg>
  );
};

/**
 * Zárt intervallumon vett szélsőértékek ábrája (határpont vs csúcspont)
 */
export const IntervalExtremaSvg: React.FC<FigureProps> = ({ size = 280, className = '' }) => {
  return (
    <svg
      viewBox="0 0 320 220"
      width={size}
      height={size * (220 / 320)}
      className={`select-none ${className}`}
    >
      <defs>
        <marker id="ie-arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1.5 L 10 5 L 0 8.5 z" fill="#64748b" />
        </marker>
      </defs>

      <rect width="320" height="220" fill="#0f172a" rx="8" />
      {/* Tengelyek */}
      <path d="M 25 170 L 300 170" stroke="#334155" strokeWidth="1.5" markerEnd="url(#ie-arrow)" />
      <path d="M 50 200 L 50 20" stroke="#334155" strokeWidth="1.5" markerEnd="url(#ie-arrow)" />
      <text x="295" y="185" fill="#94a3b8" fontSize="11">x</text>
      <text x="38" y="28" fill="#94a3b8" fontSize="11">y</text>

      {/* Értelmezési tartomány árnyékolása a tengelyen: [a, b] = [80, 270] */}
      <rect x="80" y="166" width="190" height="8" fill="#3b82f6" fillOpacity="0.35" rx="3" />
      <text x="175" y="198" fill="#60a5fa" fontSize="11" textAnchor="middle" fontWeight="bold">Df = [a; b]</text>

      {/* Ív: bal végpont (80, 110), csúcs (150, 45), jobb végpont (270, 160) */}
      <path
        d="M 80 110 Q 150 20, 270 160"
        fill="none"
        stroke="#38bdf8"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* Csúcspont: Belső Maximum (150, 45) */}
      <line x1="150" y1="45" x2="150" y2="170" stroke="#ef4444" strokeWidth="1.2" strokeDasharray="3 3" />
      <line x1="50" y1="45" x2="150" y2="45" stroke="#ef4444" strokeWidth="1.2" strokeDasharray="3 3" />
      <circle cx="150" cy="45" r="5" fill="#ef4444" />
      <text x="150" y="36" fill="#f87171" fontSize="11" fontWeight="bold" textAnchor="middle">MAX (belső csúcs)</text>

      {/* Bal határpont (80, 110) */}
      <circle cx="80" cy="110" r="4.5" fill="#38bdf8" />
      <line x1="80" y1="110" x2="80" y2="170" stroke="#64748b" strokeWidth="1" strokeDasharray="2 2" />
      <text x="80" y="184" fill="#93c5fd" fontSize="10" textAnchor="middle">a</text>

      {/* Jobb határpont: Globális Minimum (270, 160) */}
      <line x1="270" y1="160" x2="270" y2="170" stroke="#10b981" strokeWidth="1.2" strokeDasharray="3 3" />
      <line x1="50" y1="160" x2="270" y2="160" stroke="#10b981" strokeWidth="1.2" strokeDasharray="3 3" />
      <circle cx="270" cy="160" r="5" fill="#10b981" />
      <text x="270" y="184" fill="#6ee7b7" fontSize="10" textAnchor="middle">b</text>
      <text x="270" y="148" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">MIN (jobb végpont)</text>
    </svg>
  );
};

/**
 * Szélsőérték formulák kártya: csúcsponti alak
 */
export const VertexFormulaSvg: React.FC<FigureProps> = ({ size = 280, className = '' }) => {
  return (
    <svg
      viewBox="0 0 320 180"
      width={size}
      height={size * (180 / 320)}
      className={`select-none ${className}`}
    >
      <rect width="320" height="180" fill="#0f172a" rx="8" />
      <rect x="15" y="15" width="290" height="150" fill="#1e293b" rx="6" stroke="#334155" strokeWidth="1" />

      {/* Fő cím */}
      <text x="160" y="42" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle">
        f(x) = a · (x - u)² + v &nbsp;vagy&nbsp; a · |x - u| + v
      </text>

      {/* Magyarázó nyilak */}
      {/* u: hely */}
      <path d="M 125 55 L 85 95" stroke="#f59e0b" strokeWidth="1.5" markerEnd="url(#ec-arrow)" />
      <rect x="35" y="95" width="100" height="52" fill="#78350f" fillOpacity="0.4" rx="4" stroke="#f59e0b" strokeWidth="1" />
      <text x="85" y="112" fill="#fbbf24" fontSize="11" fontWeight="bold" textAnchor="middle">SZÉLSŐÉRTÉK HELYE</text>
      <text x="85" y="128" fill="#fde68a" fontSize="12" textAnchor="middle">x = u</text>
      <text x="85" y="141" fill="#cbd5e1" fontSize="9" textAnchor="middle">(zárójel zérushelye)</text>

      {/* v: érték */}
      <path d="M 215 55 L 235 95" stroke="#10b981" strokeWidth="1.5" markerEnd="url(#ec-arrow)" />
      <rect x="185" y="95" width="105" height="52" fill="#064e3b" fillOpacity="0.4" rx="4" stroke="#10b981" strokeWidth="1" />
      <text x="237" y="112" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">SZÉLSŐÉRTÉK ÉRTÉKE</text>
      <text x="237" y="128" fill="#a7f3d0" fontSize="12" textAnchor="middle">y = v</text>
      <text x="237" y="141" fill="#cbd5e1" fontSize="9" textAnchor="middle">(a hozzáadott konstans)</text>
    </svg>
  );
};

