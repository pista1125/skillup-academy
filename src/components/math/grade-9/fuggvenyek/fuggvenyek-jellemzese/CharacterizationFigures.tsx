import React from 'react';

interface FigureProps {
  size?: number;
  className?: string;
}

/**
 * Szemléltető ábra: A függvényvizsgálat 6 arany szempontja
 */
export const PropertiesChecklistSvg: React.FC<FigureProps> = ({ size = 280, className = '' }) => {
  return (
    <svg
      width={size}
      height={size * 0.75}
      viewBox="0 0 320 240"
      className={`select-none ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="15" y="15" width="290" height="210" fill="#f8fafc" rx="8" stroke="#cbd5e1" />

      {/* Cím kártya */}
      <rect x="25" y="25" width="270" height="30" fill="#0d9488" rx="6" />
      <text x="160" y="44" fill="#ffffff" fontSize="11" fontWeight="black" textAnchor="middle">
        A FÜGGVÉNYVIZSGÁLAT 6 SZEMPONTJA
      </text>

      {/* 6 rácsos kártya */}
      {/* 1. D_f */}
      <rect x="25" y="65" width="85" height="42" fill="#f0fdfa" rx="5" stroke="#99f6e4" />
      <text x="67" y="80" fill="#0f766e" fontSize="9" fontWeight="bold" textAnchor="middle">1. ÉRTELMEZÉSI T.</text>
      <text x="67" y="96" fill="#115e59" fontSize="11" fontWeight="black" textAnchor="middle">D_f (x tengely)</text>

      {/* 2. R_f */}
      <rect x="117" y="65" width="85" height="42" fill="#eff6ff" rx="5" stroke="#bfdbfe" />
      <text x="160" y="80" fill="#1e40af" fontSize="9" fontWeight="bold" textAnchor="middle">2. ÉRTÉKKÉSZLET</text>
      <text x="160" y="96" fill="#1d4ed8" fontSize="11" fontWeight="black" textAnchor="middle">R_f (y tengely)</text>

      {/* 3. Zérushely */}
      <rect x="210" y="65" width="85" height="42" fill="#fef3c7" rx="5" stroke="#fde68a" />
      <text x="252" y="80" fill="#92400e" fontSize="9" fontWeight="bold" textAnchor="middle">3. ZÉRUSHELY</text>
      <text x="252" y="96" fill="#b45309" fontSize="11" fontWeight="black" textAnchor="middle">f(x) = 0</text>

      {/* 4. Menet */}
      <rect x="25" y="115" width="85" height="42" fill="#ecfdf5" rx="5" stroke="#a7f3d0" />
      <text x="67" y="130" fill="#065f46" fontSize="9" fontWeight="bold" textAnchor="middle">4. MONOTONITÁS</text>
      <text x="67" y="146" fill="#047857" fontSize="10" fontWeight="black" textAnchor="middle">Nő / Csökken</text>

      {/* 5. Paritás */}
      <rect x="117" y="115" width="85" height="42" fill="#fdf4ff" rx="5" stroke="#f0abfc" />
      <text x="160" y="130" fill="#86198f" fontSize="9" fontWeight="bold" textAnchor="middle">5. PARITÁS</text>
      <text x="160" y="146" fill="#a21caf" fontSize="10" fontWeight="black" textAnchor="middle">Páros / Páratlan</text>

      {/* 6. Korlátosság */}
      <rect x="210" y="115" width="85" height="42" fill="#fff1f2" rx="5" stroke="#fecdd3" />
      <text x="252" y="130" fill="#9f1239" fontSize="9" fontWeight="bold" textAnchor="middle">6. KORLÁTOSSÁG</text>
      <text x="252" y="146" fill="#be123c" fontSize="10" fontWeight="black" textAnchor="middle">Alsó / Felső k.</text>

      {/* Alsó összegzés */}
      <rect x="25" y="168" width="270" height="45" fill="#ffffff" rx="6" stroke="#e2e8f0" />
      <text x="160" y="186" fill="#334155" fontSize="9" fontWeight="bold" textAnchor="middle">
        A függvény teljes algebrai és geometriai "személyi igazolványa"
      </text>
      <text x="160" y="202" fill="#64748b" fontSize="8" textAnchor="middle">
        Mindig balról jobbra vizsgáljuk az x növekedésének irányában!
      </text>
    </svg>
  );
};

/**
 * Szemléltető ábra: Paritás - Páros vs Páratlan szimmetria
 */
export const ParitySymmetrySvg: React.FC<FigureProps> = ({ size = 280, className = '' }) => {
  return (
    <svg
      width={size}
      height={size * 0.7}
      viewBox="0 0 320 220"
      className={`select-none ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Bal oldal: PÁROS FÜGGVÉNY */}
      <rect x="15" y="15" width="140" height="190" fill="#f0fdfa" rx="8" stroke="#99f6e4" />
      <text x="85" y="36" fill="#0f766e" fontSize="10" fontWeight="black" textAnchor="middle">PÁROS FÜGGVÉNY</text>
      <text x="85" y="50" fill="#115e59" fontSize="9" fontWeight="bold" textAnchor="middle">f(-x) = f(x)</text>
      <line x1="25" y1="120" x2="145" y2="120" stroke="#cbd5e1" strokeWidth="1" />
      <line x1="85" y1="60" x2="85" y2="170" stroke="#0d9488" strokeWidth="1.8" />

      {/* y-tengelyre tükrös V alak */}
      <line x1="45" y1="80" x2="85" y2="120" stroke="#0f766e" strokeWidth="2.5" />
      <line x1="85" y1="120" x2="125" y2="80" stroke="#0f766e" strokeWidth="2.5" />
      <circle cx="85" cy="120" r="3" fill="#0d9488" />

      <text x="85" y="178" fill="#134e4a" fontSize="9" fontWeight="bold" textAnchor="middle">y-tengelyre tükrös</text>
      <text x="85" y="192" fill="#0f766e" fontSize="8" textAnchor="middle">Pl. f(x) = x², |x|</text>

      {/* Jobb oldal: PÁRATLAN FÜGGVÉNY */}
      <rect x="165" y="15" width="140" height="190" fill="#fdf4ff" rx="8" stroke="#f0abfc" />
      <text x="235" y="36" fill="#86198f" fontSize="10" fontWeight="black" textAnchor="middle">PÁRATLAN FÜGGVÉNY</text>
      <text x="235" y="50" fill="#a21caf" fontSize="9" fontWeight="bold" textAnchor="middle">f(-x) = -f(x)</text>
      <line x1="175" y1="120" x2="295" y2="120" stroke="#cbd5e1" strokeWidth="1" />
      <line x1="235" y1="60" x2="235" y2="170" stroke="#cbd5e1" strokeWidth="1" />

      {/* Origóra szimmetrikus görbe / egyenes */}
      <line x1="195" y1="150" x2="275" y2="90" stroke="#a21caf" strokeWidth="2.5" />
      <circle cx="235" cy="120" r="4" fill="#c026d3" />

      <text x="235" y="178" fill="#701a75" fontSize="9" fontWeight="bold" textAnchor="middle">Origóra szimmetrikus</text>
      <text x="235" y="192" fill="#86198f" fontSize="8" textAnchor="middle">Pl. f(x) = x, x³, 1/x</text>
    </svg>
  );
};

/**
 * Szemléltető ábra: Korlátosság (Alsó, felső és korlátos)
 */
export const BoundednessSvg: React.FC<FigureProps> = ({ size = 280, className = '' }) => {
  return (
    <svg
      width={size}
      height={size * 0.7}
      viewBox="0 0 320 220"
      className={`select-none ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="10" y="10" width="300" height="200" fill="#f8fafc" rx="8" stroke="#cbd5e1" />

      {/* Tengelyek */}
      <line x1="25" y1="130" x2="295" y2="130" stroke="#475569" strokeWidth="1.5" />
      <line x1="60" y1="20" x2="60" y2="200" stroke="#475569" strokeWidth="1.5" />
      <text x="290" y="125" fill="#475569" fontSize="10" fontWeight="bold">x</text>
      <text x="66" y="32" fill="#475569" fontSize="10" fontWeight="bold">y</text>

      {/* Felső korlát K: y = 50 */}
      <line x1="30" y1="50" x2="290" y2="50" stroke="#dc2626" strokeWidth="2" strokeDasharray="4 3" />
      <text x="285" y="44" fill="#dc2626" fontSize="9" fontWeight="bold" textAnchor="end">Felső korlát (K): f(x) ≤ K</text>

      {/* Alsó korlát k: y = 170 */}
      <line x1="30" y1="170" x2="290" y2="170" stroke="#2563eb" strokeWidth="2" strokeDasharray="4 3" />
      <text x="285" y="184" fill="#2563eb" fontSize="9" fontWeight="bold" textAnchor="end">Alsó korlát (k): f(x) ≥ k</text>

      {/* Hullámvonal / Görbe a sávban */}
      <path
        d="M 70 140 Q 110 50 150 110 T 230 110 T 280 80"
        fill="none"
        stroke="#0d9488"
        strokeWidth="3"
        strokeLinecap="round"
      />

      <rect x="90" y="85" width="140" height="30" fill="#ffffff" rx="5" stroke="#99f6e4" />
      <text x="160" y="104" fill="#0f766e" fontSize="10" fontWeight="bold" textAnchor="middle">
        KORLÁTOS: k ≤ f(x) ≤ K
      </text>
    </svg>
  );
};

