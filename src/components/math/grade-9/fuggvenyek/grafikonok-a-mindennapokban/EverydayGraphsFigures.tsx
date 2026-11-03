import React from 'react';

interface FigureProps {
  size?: number;
  className?: string;
}

/**
 * Szemléltető ábra: Út-idő (s-t) grafikon találkozással és pihenővel
 */
export const DistanceTimeSvg: React.FC<FigureProps> = ({ size = 280, className = '' }) => {
  return (
    <svg
      width={size}
      height={size * 0.7}
      viewBox="0 0 320 220"
      className={`select-none ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="35" y="20" width="265" height="160" fill="#f8fafc" rx="6" />

      {/* Rácsvonalak */}
      <line x1="35" y1="60" x2="300" y2="60" stroke="#e2e8f0" strokeDasharray="3 3" />
      <line x1="35" y1="100" x2="300" y2="100" stroke="#e2e8f0" strokeDasharray="3 3" />
      <line x1="35" y1="140" x2="300" y2="140" stroke="#e2e8f0" strokeDasharray="3 3" />

      {/* Tengelyek */}
      <line x1="45" y1="20" x2="45" y2="180" stroke="#475569" strokeWidth="2" />
      <line x1="45" y1="180" x2="305" y2="180" stroke="#475569" strokeWidth="2" />
      <text x="305" y="195" fill="#475569" fontSize="10" fontWeight="bold">t (óra)</text>
      <text x="35" y="16" fill="#475569" fontSize="10" fontWeight="bold">s (km)</text>

      {/* Y skála (0, 30, 60, 90 km) */}
      <text x="40" y="144" fill="#64748b" fontSize="9" textAnchor="end">30</text>
      <text x="40" y="104" fill="#64748b" fontSize="9" textAnchor="end">60</text>
      <text x="40" y="64" fill="#64748b" fontSize="9" textAnchor="end">90</text>

      {/* X skála (1, 2, 3, 4 óra) */}
      <text x="105" y="194" fill="#64748b" fontSize="9" textAnchor="middle">1</text>
      <text x="165" y="194" fill="#64748b" fontSize="9" textAnchor="middle">2</text>
      <text x="225" y="194" fill="#64748b" fontSize="9" textAnchor="middle">3</text>
      <text x="285" y="194" fill="#64748b" fontSize="9" textAnchor="middle">4</text>

      {/* 1. Jármű (Kék vonal: A-ból indul):
          0-tól 1,5 óráig: 0 -> 60 km (meredek)
          1,5-től 2,5 óráig: 60 km (pihenő, vízszintes)
          2,5-től 4 óráig: 60 -> 90 km (lassúbb)
      */}
      <polyline
        fill="none"
        stroke="#2563eb"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        points="45,180 135,100 195,100 285,60"
      />

      {/* 2. Jármű (Piros vonal: B-ből indul szembe):
          0-tól 3 óráig: 90 -> 0 km
      */}
      <line x1="45" y1="60" x2="225" y2="180" stroke="#dc2626" strokeWidth="2.5" strokeDasharray="5 3" />

      {/* Metszéspont (Találkozás: kb. t = 1,15 h, s = 55 km) */}
      <circle cx="115" cy="113" r="5" fill="#f59e0b" stroke="#ffffff" strokeWidth="2" />
      <text x="122" y="112" fill="#b45309" fontSize="10" fontWeight="black">Találkozás</text>

      {/* Pihenő kiemelése */}
      <text x="165" y="90" fill="#1e40af" fontSize="9" fontWeight="bold" textAnchor="middle">Pihenő (áll)</text>

      {/* Jelmagyarázat */}
      <line x1="50" y1="210" x2="75" y2="210" stroke="#2563eb" strokeWidth="3" />
      <text x="80" y="213" fill="#1e40af" fontSize="9" fontWeight="bold">1. autó (pihenővel)</text>
      <line x1="180" y1="210" x2="205" y2="210" stroke="#dc2626" strokeWidth="2.5" strokeDasharray="4 2" />
      <text x="210" y="213" fill="#b91c1c" fontSize="9" fontWeight="bold">2. autó (szembejön)</text>
    </svg>
  );
};

/**
 * Szemléltető ábra: Sebesség-idő (v-t) grafikon és a görbe alatti terület (megtett út)
 */
export const SpeedTimeAreaSvg: React.FC<FigureProps> = ({ size = 280, className = '' }) => {
  return (
    <svg
      width={size}
      height={size * 0.7}
      viewBox="0 0 320 220"
      className={`select-none ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="35" y="20" width="265" height="160" fill="#f8fafc" rx="6" />

      {/* Terület besatírozása:
          0-2 s: Gyorsulás (háromszög) 0 -> 20 m/s
          2-6 s: Állandó sebesség (téglalap) 20 m/s
      */}
      <polygon
        points="50,180 110,80 230,80 230,180"
        fill="#38bdf8"
        fillOpacity="0.3"
        stroke="#0284c7"
        strokeWidth="1.5"
        strokeDasharray="4 2"
      />

      {/* Tengelyek */}
      <line x1="50" y1="20" x2="50" y2="180" stroke="#475569" strokeWidth="2" />
      <line x1="50" y1="180" x2="295" y2="180" stroke="#475569" strokeWidth="2" />
      <text x="295" y="195" fill="#475569" fontSize="10" fontWeight="bold">t (s)</text>
      <text x="35" y="16" fill="#475569" fontSize="10" fontWeight="bold">v (m/s)</text>

      {/* Y skála */}
      <text x="44" y="84" fill="#64748b" fontSize="9" textAnchor="end">20</text>
      <text x="44" y="184" fill="#64748b" fontSize="9" textAnchor="end">0</text>

      {/* X skála */}
      <text x="110" y="194" fill="#64748b" fontSize="9" textAnchor="middle">2 s</text>
      <text x="230" y="194" fill="#64748b" fontSize="9" textAnchor="middle">6 s</text>

      {/* Sebességgörbe */}
      <line x1="50" y1="180" x2="110" y2="80" stroke="#0284c7" strokeWidth="3.5" strokeLinecap="round" />
      <line x1="110" y1="80" x2="230" y2="80" stroke="#0284c7" strokeWidth="3.5" strokeLinecap="round" />

      {/* Számított területek felirata */}
      <text x="88" y="150" fill="#0369a1" fontSize="10" fontWeight="bold" textAnchor="middle">s₁ = 20 m</text>
      <text x="170" y="135" fill="#0369a1" fontSize="11" fontWeight="black" textAnchor="middle">s₂ = 80 m</text>

      {/* Alsó magyarázat */}
      <text x="165" y="212" fill="#0284c7" fontSize="10" fontWeight="bold" textAnchor="middle">
        Megtett út = Görbe alatti terület = 20 + 80 = 100 méter
      </text>
    </svg>
  );
};

/**
 * Szemléltető ábra: Élettani / meteorológiai folyamatgrafikon
 */
export const HeartRateOrWeatherSvg: React.FC<FigureProps> = ({ size = 280, className = '' }) => {
  return (
    <svg
      width={size}
      height={size * 0.65}
      viewBox="0 0 320 200"
      className={`select-none ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="35" y="20" width="265" height="150" fill="#f8fafc" rx="6" />

      {/* Tengelyek */}
      <line x1="45" y1="20" x2="45" y2="170" stroke="#475569" strokeWidth="2" />
      <line x1="45" y1="170" x2="295" y2="170" stroke="#475569" strokeWidth="2" />
      <text x="295" y="185" fill="#475569" fontSize="10" fontWeight="bold">t (perc)</text>
      <text x="30" y="16" fill="#475569" fontSize="9" fontWeight="bold">Pulzus (bpm)</text>

      {/* Pulzusgörbe (nyugalmi 70 -> bemelegítés 120 -> sprint 165 (max) -> levezetés 95 -> pihenés 75) */}
      <path
        d="M 45,140 Q 80,135 105,100 T 165,45 T 225,115 T 285,135"
        fill="none"
        stroke="#e11d48"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* Maximum pont */}
      <circle cx="165" cy="45" r="5" fill="#e11d48" stroke="#ffffff" strokeWidth="2" />
      <text x="165" y="35" fill="#be123c" fontSize="10" fontWeight="black" textAnchor="middle">Csúcs: 165 bpm</text>

      {/* Minimum / Nyugalom */}
      <line x1="45" y1="140" x2="285" y2="140" stroke="#94a3b8" strokeDasharray="3 3" />
      <text x="240" y="152" fill="#64748b" fontSize="9">Nyugalmi szint (~70)</text>

      {/* Fázisok jelölése */}
      <text x="75" y="182" fill="#475569" fontSize="9" textAnchor="middle">Bemelegítés</text>
      <text x="165" y="182" fill="#e11d48" fontSize="9" fontWeight="bold" textAnchor="middle">Intervall edzés</text>
      <text x="255" y="182" fill="#475569" fontSize="9" textAnchor="middle">Levezetés</text>
    </svg>
  );
};

