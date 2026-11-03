import React from 'react';

interface FigureProps {
  size?: number;
  className?: string;
}

/**
 * Szemléltető ábra: A lineáris függvény általános alakja f(x) = mx + b
 */
export const LinearGeneralFormSvg: React.FC<FigureProps> = ({ size = 280, className = '' }) => {
  return (
    <svg
      width={size}
      height={size * 0.75}
      viewBox="0 0 320 240"
      className={`select-none ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="15" y="15" width="290" height="210" fill="#f8fafc" rx="8" stroke="#cbd5e1" />

      {/* Rács és tengelyek */}
      <line x1="25" y1="140" x2="295" y2="140" stroke="#475569" strokeWidth="1.8" />
      <line x1="120" y1="25" x2="120" y2="215" stroke="#475569" strokeWidth="1.8" />
      <text x="290" y="134" fill="#475569" fontSize="10" fontWeight="bold">x</text>
      <text x="126" y="36" fill="#475569" fontSize="10" fontWeight="bold">y</text>

      {/* Egyenes: f(x) = 1.5x - 1 -> (0, -1) -> (120, 162), zérushely x0 = 2/3 -> (135, 140) */}
      <line x1="40" y1="220" x2="260" y2="30" stroke="#7c3aed" strokeWidth="3" strokeLinecap="round" />

      {/* y-tengelymetszet (0; b) -> (120, 162) */}
      <circle cx="120" cy="162" r="5" fill="#ef4444" stroke="#ffffff" strokeWidth="1.5" />
      <text x="65" y="166" fill="#b91c1c" fontSize="10" fontWeight="bold">M_y(0; b)</text>

      {/* Irányháromszög 1 jobbra, m fel: (120, 162) -> (165, 162) -> (165, 96) */}
      <line x1="120" y1="162" x2="165" y2="162" stroke="#059669" strokeWidth="2" strokeDasharray="3 3" />
      <text x="142" y="176" fill="#047857" fontSize="9" fontWeight="bold" textAnchor="middle">+1 lépés</text>

      <line x1="165" y1="162" x2="165" y2="96" stroke="#2563eb" strokeWidth="2" strokeDasharray="3 3" />
      <text x="172" y="132" fill="#1d4ed8" fontSize="9" fontWeight="bold">+m fel</text>

      {/* Második pont (1; b + m) */}
      <circle cx="165" cy="96" r="4" fill="#2563eb" />

      {/* Zérushely (x0; 0) */}
      <circle cx="148" cy="140" r="4.5" fill="#d97706" stroke="#ffffff" strokeWidth="1.5" />
      <text x="145" y="130" fill="#b45309" fontSize="9" fontWeight="bold">x₀ = -b/m</text>

      {/* Képlet kártya */}
      <rect x="185" y="25" width="110" height="38" fill="#f5f3ff" rx="6" stroke="#ddd6fe" />
      <text x="240" y="42" fill="#5b21b6" fontSize="10" fontWeight="black" textAnchor="middle">ÁLTALÁNOS ALAK</text>
      <text x="240" y="56" fill="#7c3aed" fontSize="12" fontWeight="bold" textAnchor="middle">f(x) = m·x + b</text>
    </svg>
  );
};

/**
 * Szemléltető ábra: Gyors grafikonrajzolás 3 lépésben
 */
export const FastPlottingSvg: React.FC<FigureProps> = ({ size = 280, className = '' }) => {
  return (
    <svg
      width={size}
      height={size * 0.7}
      viewBox="0 0 320 220"
      className={`select-none ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="10" y="10" width="300" height="200" fill="#f8fafc" rx="8" stroke="#cbd5e1" />

      {/* 1. Lépés: b tengelymetszet */}
      <rect x="20" y="25" width="85" height="110" fill="#fef2f2" rx="6" stroke="#fecaca" />
      <text x="62" y="42" fill="#991b1b" fontSize="9" fontWeight="black" textAnchor="middle">1. LÉPÉS</text>
      <text x="62" y="56" fill="#b91c1c" fontSize="8" textAnchor="middle">y-metszet (0; b)</text>
      <line x1="30" y1="100" x2="95" y2="100" stroke="#cbd5e1" strokeWidth="1" />
      <line x1="62" y1="65" x2="62" y2="125" stroke="#cbd5e1" strokeWidth="1" />
      <circle cx="62" cy="85" r="4.5" fill="#ef4444" />
      <text x="62" y="130" fill="#7f1d1d" fontSize="8" fontWeight="bold" textAnchor="middle">Jelöld be b-t!</text>

      {/* 2. Lépés: 1 jobbra, m fel/le */}
      <rect x="117" y="25" width="85" height="110" fill="#eff6ff" rx="6" stroke="#bfdbfe" />
      <text x="160" y="42" fill="#1e40af" fontSize="9" fontWeight="black" textAnchor="middle">2. LÉPÉS</text>
      <text x="160" y="56" fill="#1d4ed8" fontSize="8" textAnchor="middle">Lépcsőzés</text>
      <line x1="127" y1="100" x2="192" y2="100" stroke="#cbd5e1" strokeWidth="1" />
      <line x1="145" y1="65" x2="145" y2="125" stroke="#cbd5e1" strokeWidth="1" />
      <circle cx="145" cy="90" r="3.5" fill="#ef4444" />
      <line x1="145" y1="90" x2="175" y2="90" stroke="#059669" strokeWidth="1.5" strokeDasharray="2 2" />
      <line x1="175" y1="90" x2="175" y2="72" stroke="#2563eb" strokeWidth="1.5" strokeDasharray="2 2" />
      <circle cx="175" cy="72" r="4" fill="#2563eb" />
      <text x="160" y="130" fill="#1e3a8a" fontSize="8" fontWeight="bold" textAnchor="middle">1 jobbra, m fel</text>

      {/* 3. Lépés: Vonalbehúzás */}
      <rect x="214" y="25" width="85" height="110" fill="#ecfdf5" rx="6" stroke="#a7f3d0" />
      <text x="256" y="42" fill="#065f46" fontSize="9" fontWeight="black" textAnchor="middle">3. LÉPÉS</text>
      <text x="256" y="56" fill="#047857" fontSize="8" textAnchor="middle">Összekötés</text>
      <line x1="224" y1="100" x2="289" y2="100" stroke="#cbd5e1" strokeWidth="1" />
      <line x1="242" y1="65" x2="242" y2="125" stroke="#cbd5e1" strokeWidth="1" />
      <line x1="228" y1="105" x2="285" y2="68" stroke="#7c3aed" strokeWidth="2.5" />
      <circle cx="242" cy="96" r="3" fill="#ef4444" />
      <circle cx="265" cy="81" r="3" fill="#2563eb" />
      <text x="256" y="130" fill="#064e3b" fontSize="8" fontWeight="bold" textAnchor="middle">Kész az egyenes!</text>

      {/* Alsó összegzés */}
      <rect x="20" y="148" width="280" height="50" fill="#ffffff" rx="6" stroke="#e2e8f0" />
      <text x="160" y="168" fill="#1e293b" fontSize="10" fontWeight="bold" textAnchor="middle">
        Példa: f(x) = 2x - 3 ➔ b = -3 (innen indulunk), m = 2 (1 jobbra, 2 fel)
      </text>
      <text x="160" y="186" fill="#64748b" fontSize="9" textAnchor="middle">
        Nincs szükség hosszú értéktáblázatra, 3 másodperc alatt pontosan rajzolható!
      </text>
    </svg>
  );
};

/**
 * Szemléltető ábra: Paraméterek szerepe (m meredekség vs b eltolás)
 */
export const LinearParametersSvg: React.FC<FigureProps> = ({ size = 280, className = '' }) => {
  return (
    <svg
      width={size}
      height={size * 0.7}
      viewBox="0 0 320 220"
      className={`select-none ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Bal: b hatása (párhuzamos eltolások) */}
      <rect x="15" y="15" width="140" height="190" fill="#eff6ff" rx="8" stroke="#93c5fd" />
      <text x="85" y="36" fill="#1e40af" fontSize="10" fontWeight="black" textAnchor="middle">A 'b' PARAMÉTER</text>
      <text x="85" y="50" fill="#2563eb" fontSize="9" textAnchor="middle">Függőleges eltolás</text>
      <line x1="25" y1="120" x2="145" y2="120" stroke="#cbd5e1" strokeWidth="1" />
      <line x1="85" y1="60" x2="85" y2="170" stroke="#cbd5e1" strokeWidth="1" />
      <line x1="35" y1="130" x2="135" y2="70" stroke="#2563eb" strokeWidth="2" />
      <line x1="35" y1="150" x2="135" y2="90" stroke="#3b82f6" strokeWidth="2" strokeDasharray="3 2" />
      <line x1="35" y1="170" x2="135" y2="110" stroke="#60a5fa" strokeWidth="2" strokeDasharray="3 2" />
      <text x="85" y="190" fill="#1e3a8a" fontSize="8" fontWeight="bold" textAnchor="middle">Párhuzamos eltolódás</text>

      {/* Jobb: m hatása (elfordulás) */}
      <rect x="165" y="15" width="140" height="190" fill="#fdf4ff" rx="8" stroke="#f0abfc" />
      <text x="235" y="36" fill="#86198f" fontSize="10" fontWeight="black" textAnchor="middle">AZ 'm' PARAMÉTER</text>
      <text x="235" y="50" fill="#c026d3" fontSize="9" textAnchor="middle">Meredekség / Forgás</text>
      <line x1="175" y1="120" x2="295" y2="120" stroke="#cbd5e1" strokeWidth="1" />
      <line x1="235" y1="60" x2="235" y2="170" stroke="#cbd5e1" strokeWidth="1" />
      {/* Közös forgáspont (0; b) */}
      <circle cx="235" cy="120" r="4" fill="#a21caf" />
      <line x1="185" y1="150" x2="285" y2="90" stroke="#a21caf" strokeWidth="2" />
      <line x1="195" y1="165" x2="275" y2="75" stroke="#c026d3" strokeWidth="2" strokeDasharray="3 2" />
      <line x1="175" y1="120" x2="295" y2="120" stroke="#e879f9" strokeWidth="2" strokeDasharray="3 2" />
      <text x="235" y="190" fill="#701a75" fontSize="8" fontWeight="bold" textAnchor="middle">Forgás a (0; b) körül</text>
    </svg>
  );
};

