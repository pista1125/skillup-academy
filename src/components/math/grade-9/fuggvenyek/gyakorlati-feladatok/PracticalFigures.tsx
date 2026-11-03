import React from 'react';

interface FigureProps {
  size?: number;
  className?: string;
}

/**
 * Gazdasági modell: Költség, Bevétel és Fedezeti pont (Break-even chart)
 */
export const BreakEvenSvg: React.FC<FigureProps> = ({ size = 280, className = '' }) => {
  return (
    <svg
      viewBox="0 0 320 220"
      width={size}
      height={size * (220 / 320)}
      className={`select-none ${className}`}
    >
      <defs>
        <marker id="be-arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1.5 L 10 5 L 0 8.5 z" fill="#64748b" />
        </marker>
      </defs>

      <rect width="320" height="220" fill="#0f172a" rx="8" />
      {/* Tengelyek */}
      <path d="M 40 180 L 300 180" stroke="#334155" strokeWidth="1.5" markerEnd="url(#be-arrow)" />
      <path d="M 50 200 L 50 20" stroke="#334155" strokeWidth="1.5" markerEnd="url(#be-arrow)" />
      <text x="295" y="195" fill="#94a3b8" fontSize="10">db (x)</text>
      <text x="40" y="25" fill="#94a3b8" fontSize="10">Ft (y)</text>

      {/* Veszteség zóna háromszög */}
      <polygon points="50,130 160,85 50,180" fill="#ef4444" fillOpacity="0.15" />
      <text x="80" y="155" fill="#f87171" fontSize="9" fontWeight="bold">VESZTESÉG</text>

      {/* Nyereség zóna terület */}
      <polygon points="160,85 280,35 280,70" fill="#10b981" fillOpacity="0.18" />
      <text x="210" y="65" fill="#34d399" fontSize="9" fontWeight="bold">NYERESÉG</text>

      {/* Költség egyenes: K(x) = K_fix + v*x (50, 130)-ból indul, (280, 70)-ig */}
      <line x1="50" y1="130" x2="280" y2="70" stroke="#f59e0b" strokeWidth="2.5" />
      <text x="285" y="75" fill="#fbbf24" fontSize="10" fontWeight="bold">K(x)</text>
      {/* Fix költség jelölése */}
      <circle cx="50" cy="130" r="3.5" fill="#f59e0b" />
      <text x="18" y="133" fill="#fde68a" fontSize="9">K_fix</text>

      {/* Bevétel egyenes: B(x) = p*x (50, 180)-ból indul, (280, 35)-ig */}
      <line x1="50" y1="180" x2="280" y2="35" stroke="#38bdf8" strokeWidth="2.5" />
      <text x="285" y="38" fill="#38bdf8" fontSize="10" fontWeight="bold">B(x)</text>

      {/* Fedezeti pont: Metszéspont (160, 85) */}
      <line x1="160" y1="85" x2="160" y2="180" stroke="#a855f7" strokeWidth="1.2" strokeDasharray="3 3" />
      <circle cx="160" cy="85" r="5" fill="#a855f7" stroke="#ffffff" strokeWidth="1.5" />
      <text x="160" y="72" fill="#c084fc" fontSize="10" fontWeight="bold" textAnchor="middle">
        FEDEZETI PONT
      </text>
      <text x="160" y="195" fill="#c084fc" fontSize="10" textAnchor="middle">x_fed</text>
    </svg>
  );
};

/**
 * Fizikai mozgás: Függőleges vagy ferde hajítás parabolapályája h(t) = -5t² + v₀t + h₀
 */
export const ProjectileMotionSvg: React.FC<FigureProps> = ({ size = 280, className = '' }) => {
  return (
    <svg
      viewBox="0 0 320 220"
      width={size}
      height={size * (220 / 320)}
      className={`select-none ${className}`}
    >
      <defs>
        <marker id="pm-arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1.5 L 10 5 L 0 8.5 z" fill="#64748b" />
        </marker>
      </defs>

      <rect width="320" height="220" fill="#0f172a" rx="8" />
      {/* Tengelyek */}
      <path d="M 35 180 L 300 180" stroke="#334155" strokeWidth="1.5" markerEnd="url(#pm-arrow)" />
      <path d="M 50 200 L 50 20" stroke="#334155" strokeWidth="1.5" markerEnd="url(#pm-arrow)" />
      <text x="295" y="195" fill="#94a3b8" fontSize="10">idő t (s)</text>
      <text x="35" y="25" fill="#94a3b8" fontSize="10">h (m)</text>

      {/* Hajítási pálya: indul (50, 150) -> csúcs (150, 45) -> földet érés (250, 180) */}
      <path
        d="M 50 150 Q 150 -55, 250 180"
        fill="none"
        stroke="#38bdf8"
        strokeWidth="3.5"
        strokeLinecap="round"
      />

      {/* Indulási magasság h₀ */}
      <circle cx="50" cy="150" r="4.5" fill="#f59e0b" />
      <text x="35" y="153" fill="#fde68a" fontSize="10" textAnchor="end">h₀</text>

      {/* Csúcspont (max magasság) */}
      <line x1="150" y1="52" x2="150" y2="180" stroke="#10b981" strokeWidth="1.2" strokeDasharray="3 3" />
      <line x1="50" y1="52" x2="150" y2="52" stroke="#10b981" strokeWidth="1.2" strokeDasharray="3 3" />
      <circle cx="150" cy="52" r="5.5" fill="#10b981" stroke="#ffffff" strokeWidth="1.5" />
      <text x="150" y="40" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">
        H_max (csúcs)
      </text>
      <text x="150" y="195" fill="#34d399" fontSize="10" textAnchor="middle">t_csúcs</text>

      {/* Földet érés pontja (zérushely) */}
      <circle cx="250" cy="180" r="5" fill="#ef4444" stroke="#ffffff" strokeWidth="1.5" />
      <text x="250" y="168" fill="#f87171" fontSize="10" fontWeight="bold" textAnchor="middle">
        Becsapódás
      </text>
      <text x="250" y="195" fill="#f87171" fontSize="10" textAnchor="middle">t_repülés</text>
    </svg>
  );
};

/**
 * Geometriai optimalizálás: Folyóparti kerítés maximális területtel
 */
export const GeometricOptSvg: React.FC<FigureProps> = ({ size = 280, className = '' }) => {
  return (
    <svg
      viewBox="0 0 320 220"
      width={size}
      height={size * (220 / 320)}
      className={`select-none ${className}`}
    >
      <rect width="320" height="220" fill="#0f172a" rx="8" />

      {/* Folyó (felső sáv) */}
      <rect x="20" y="20" width="280" height="40" fill="#0284c7" fillOpacity="0.4" rx="4" />
      <path d="M 25 35 Q 80 45, 140 35 T 260 35" fill="none" stroke="#38bdf8" strokeWidth="1.5" />
      <text x="160" y="44" fill="#bae6fd" fontSize="11" fontWeight="bold" textAnchor="middle">
        FOLYÓ (nincs kerítés ezen az oldalon)
      </text>

      {/* Bekerített terület (téglalap 3 oldal kerítéssel) */}
      <rect x="65" y="60" width="190" height="100" fill="#10b981" fillOpacity="0.12" />
      {/* 3 oldal kerítés (bal, alsó, jobb) */}
      <line x1="65" y1="60" x2="65" y2="160" stroke="#f59e0b" strokeWidth="3.5" strokeDasharray="6 3" />
      <line x1="65" y1="160" x2="255" y2="160" stroke="#f59e0b" strokeWidth="3.5" strokeDasharray="6 3" />
      <line x1="255" y1="160" x2="255" y2="60" stroke="#f59e0b" strokeWidth="3.5" strokeDasharray="6 3" />

      {/* Oldalhossz feliratok */}
      <text x="50" y="115" fill="#fbbf24" fontSize="12" fontWeight="bold">x</text>
      <text x="268" y="115" fill="#fbbf24" fontSize="12" fontWeight="bold">x</text>
      <text x="160" y="180" fill="#fbbf24" fontSize="12" fontWeight="bold" textAnchor="middle">
        y = L - 2x
      </text>

      {/* Terület és képlet */}
      <text x="160" y="105" fill="#34d399" fontSize="12" fontWeight="bold" textAnchor="middle">
        T(x) = x · (L - 2x)
      </text>
      <text x="160" y="125" fill="#a7f3d0" fontSize="10" textAnchor="middle">
        Maximális terület, ha y = 2x !
      </text>
    </svg>
  );
};

