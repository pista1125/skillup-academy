import React from 'react';

interface FigureProps {
  size?: number;
  className?: string;
}

/**
 * Szemléltető ábra: A grafikonrajzolás 4 lépése
 */
export const PlottingStepsSvg: React.FC<FigureProps> = ({ size = 280, className = '' }) => {
  return (
    <svg
      width={size}
      height={size * 0.65}
      viewBox="0 0 320 200"
      className={`select-none ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="15" y="15" width="290" height="170" fill="#f8fafc" rx="8" stroke="#cbd5e1" />

      {/* 4 lépés doboza */}
      {/* 1. Lépés: Képlet */}
      <rect x="25" y="30" width="60" height="55" fill="#eff6ff" stroke="#3b82f6" strokeWidth="1.5" rx="6" />
      <text x="55" y="46" fill="#1e40af" fontSize="9" fontWeight="black" textAnchor="middle">1. KÉPLET</text>
      <text x="55" y="65" fill="#2563eb" fontSize="10" fontWeight="bold" textAnchor="middle">y = 2x - 1</text>

      {/* Nyíl 1 -> 2 */}
      <path d="M 90 57 L 98 57" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrow)" />

      {/* 2. Lépés: Táblázat */}
      <rect x="103" y="30" width="60" height="55" fill="#ecfdf5" stroke="#10b981" strokeWidth="1.5" rx="6" />
      <text x="133" y="46" fill="#065f46" fontSize="9" fontWeight="black" textAnchor="middle">2. TÁBLÁZAT</text>
      <text x="133" y="62" fill="#047857" fontSize="9" textAnchor="middle">x: 0 | 1 | 2</text>
      <text x="133" y="75" fill="#047857" fontSize="9" fontWeight="bold" textAnchor="middle">y: -1| 1 | 3</text>

      {/* Nyíl 2 -> 3 */}
      <path d="M 168 57 L 176 57" stroke="#64748b" strokeWidth="2" />

      {/* 3. Lépés: Pontok */}
      <rect x="181" y="30" width="55" height="55" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.5" rx="6" />
      <text x="208" y="46" fill="#92400e" fontSize="9" fontWeight="black" textAnchor="middle">3. PONTOK</text>
      <circle cx="198" cy="70" r="3" fill="#d97706" />
      <circle cx="208" cy="62" r="3" fill="#d97706" />
      <circle cx="218" cy="54" r="3" fill="#d97706" />

      {/* Nyíl 3 -> 4 */}
      <path d="M 241 57 L 249 57" stroke="#64748b" strokeWidth="2" />

      {/* 4. Lépés: Görbe */}
      <rect x="254" y="30" width="45" height="55" fill="#f5f3ff" stroke="#8b5cf6" strokeWidth="1.5" rx="6" />
      <text x="276" y="46" fill="#5b21b6" fontSize="9" fontWeight="black" textAnchor="middle">4. GÖRBE</text>
      <line x1="260" y1="74" x2="292" y2="50" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" />

      {/* Alsó illusztráció koordinátasíkkal */}
      <line x1="60" y1="140" x2="260" y2="140" stroke="#475569" strokeWidth="1.5" />
      <line x1="160" y1="95" x2="160" y2="175" stroke="#475569" strokeWidth="1.5" />

      {/* Pontok koordinátasíkon: (0; -1) -> (160, 150), (1; 1) -> (190, 130), (2; 3) -> (220, 110) */}
      <line x1="100" y1="190" x2="240" y2="96" stroke="#2563eb" strokeWidth="2.5" />
      <circle cx="160" cy="150" r="4" fill="#ef4444" />
      <text x="175" y="156" fill="#b91c1c" fontSize="9" fontWeight="bold">(0; -1)</text>

      <circle cx="190" cy="130" r="4" fill="#ef4444" />
      <text x="205" y="134" fill="#b91c1c" fontSize="9" fontWeight="bold">(1; 1)</text>

      <circle cx="220" cy="110" r="4" fill="#ef4444" />
      <text x="235" y="112" fill="#b91c1c" fontSize="9" fontWeight="bold">(2; 3)</text>
    </svg>
  );
};

/**
 * Szemléltető ábra: Diszkrét pontok (Df = Z) vs. Folytonos egyenes (Df = R)
 */
export const DiscreteVsContinuousSvg: React.FC<FigureProps> = ({ size = 280, className = '' }) => {
  return (
    <svg
      width={size}
      height={size * 0.65}
      viewBox="0 0 320 200"
      className={`select-none ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Bal oldal: DISZKRÉT (csak pontok!) */}
      <rect x="15" y="15" width="135" height="150" fill="#f8fafc" rx="6" stroke="#cbd5e1" />
      <text x="82" y="34" fill="#d97706" fontSize="10" fontWeight="black" textAnchor="middle">DISZKRÉT: D_f = ℤ</text>
      <line x1="25" y1="120" x2="140" y2="120" stroke="#94a3b8" strokeWidth="1" />
      <line x1="82" y1="40" x2="82" y2="155" stroke="#94a3b8" strokeWidth="1" />

      {/* Csak különálló pontok, NEM kötjük össze! */}
      <circle cx="52" cy="140" r="4.5" fill="#d97706" />
      <circle cx="82" cy="120" r="4.5" fill="#d97706" />
      <circle cx="112" cy="100" r="4.5" fill="#d97706" />
      <text x="82" y="180" fill="#92400e" fontSize="9" fontWeight="bold" textAnchor="middle">TILOS összekötni!</text>

      {/* Jobb oldal: FOLYTONOS (összefüggő egyenes) */}
      <rect x="170" y="15" width="135" height="150" fill="#f8fafc" rx="6" stroke="#cbd5e1" />
      <text x="237" y="34" fill="#059669" fontSize="10" fontWeight="black" textAnchor="middle">FOLYTONOS: D_f = ℝ</text>
      <line x1="180" y1="120" x2="295" y2="120" stroke="#94a3b8" strokeWidth="1" />
      <line x1="237" y1="40" x2="237" y2="155" stroke="#94a3b8" strokeWidth="1" />

      {/* Folytonos összekötött vonal */}
      <line x1="192" y1="150" x2="282" y2="90" stroke="#059669" strokeWidth="3" strokeLinecap="round" />
      <circle cx="207" cy="140" r="3.5" fill="#047857" />
      <circle cx="237" cy="120" r="3.5" fill="#047857" />
      <circle cx="267" cy="100" r="3.5" fill="#047857" />
      <text x="237" y="180" fill="#065f46" fontSize="9" fontWeight="bold" textAnchor="middle">Folytonos vonallal kötjük</text>
    </svg>
  );
};

/**
 * Szemléltető ábra: Pont illeszkedése a grafikonra
 */
export const PointsOnGraphSvg: React.FC<FigureProps> = ({ size = 260, className = '' }) => {
  return (
    <svg
      width={size}
      height={size * 0.7}
      viewBox="0 0 280 200"
      className={`select-none ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="25" y="20" width="230" height="150" fill="#f8fafc" rx="6" />

      {/* Tengelyek */}
      <line x1="40" y1="130" x2="240" y2="130" stroke="#475569" strokeWidth="2" />
      <line x1="110" y1="25" x2="110" y2="165" stroke="#475569" strokeWidth="2" />
      <text x="245" y="134" fill="#475569" fontSize="10" fontWeight="bold">x</text>
      <text x="105" y="20" fill="#475569" fontSize="10" fontWeight="bold">y</text>

      {/* Függvény: f(x) = x + 1 egyenes */}
      <line x1="50" y1="150" x2="210" y2="50" stroke="#2563eb" strokeWidth="2.5" />
      <text x="215" y="48" fill="#1e40af" fontSize="10" fontWeight="bold">f(x)</text>

      {/* Pont 1: P(2; 3) - Rajta van (Zöld) */}
      <circle cx="170" cy="70" r="5" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
      <text x="178" y="68" fill="#047857" fontSize="10" fontWeight="bold">P(2; 3) ✓</text>

      {/* Pont 2: Q(2; 1) - Nincs rajta (Piros) */}
      <circle cx="170" cy="110" r="5" fill="#ef4444" stroke="#ffffff" strokeWidth="2" />
      <text x="178" y="116" fill="#b91c1c" fontSize="10" fontWeight="bold">Q(2; 1) ✗</text>

      <text x="140" y="188" fill="#475569" fontSize="10" fontWeight="bold" textAnchor="middle">
        P rajta van: f(2) = 2+1 = 3 | Q nincs rajta: f(2) ≠ 1
      </text>
    </svg>
  );
};

