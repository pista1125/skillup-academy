import React from 'react';

interface FigureProps {
  size?: number;
  className?: string;
}

/**
 * Szemléltető ábra: Derékszögű koordináta-rendszer és a 4 síknegyed
 */
export const CoordinateSystemSvg: React.FC<FigureProps> = ({ size = 260, className = '' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 260 260"
      className={`select-none ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Rács háttér */}
      <rect x="20" y="20" width="220" height="220" fill="#f8fafc" rx="8" stroke="#e2e8f0" strokeWidth="1" />

      {/* Rácsvonalak */}
      {[50, 80, 110, 150, 180, 210].map((coord) => (
        <React.Fragment key={coord}>
          <line x1={coord} y1="20" x2={coord} y2="240" stroke="#f1f5f9" strokeWidth="1" />
          <line x1="20" y1={coord} x2="240" y2={coord} stroke="#f1f5f9" strokeWidth="1" />
        </React.Fragment>
      ))}

      {/* Síknegyedek halvány címkéi */}
      <text x="185" y="75" fill="#3b82f6" fillOpacity="0.4" fontSize="24" fontWeight="black" textAnchor="middle">I.</text>
      <text x="75" y="75" fill="#10b981" fillOpacity="0.4" fontSize="24" fontWeight="black" textAnchor="middle">II.</text>
      <text x="75" y="185" fill="#f59e0b" fillOpacity="0.4" fontSize="24" fontWeight="black" textAnchor="middle">III.</text>
      <text x="185" y="185" fill="#8b5cf6" fillOpacity="0.4" fontSize="24" fontWeight="black" textAnchor="middle">IV.</text>

      {/* Előjelek a negyedekben */}
      <text x="185" y="95" fill="#1e40af" fontSize="10" fontWeight="bold" textAnchor="middle">(+; +)</text>
      <text x="75" y="95" fill="#065f46" fontSize="10" fontWeight="bold" textAnchor="middle">(-; +)</text>
      <text x="75" y="205" fill="#92400e" fontSize="10" fontWeight="bold" textAnchor="middle">(-; -)</text>
      <text x="185" y="205" fill="#5b21b6" fontSize="10" fontWeight="bold" textAnchor="middle">(+; -)</text>

      {/* Tengelyek */}
      {/* X tengely */}
      <line x1="20" y1="130" x2="240" y2="130" stroke="#334155" strokeWidth="2" />
      <polygon points="240,126 248,130 240,134" fill="#334155" />
      <text x="242" y="145" fill="#334155" fontSize="12" fontWeight="black">x</text>

      {/* Y tengely */}
      <line x1="130" y1="240" x2="130" y2="20" stroke="#334155" strokeWidth="2" />
      <polygon points="126,20 130,12 134,20" fill="#334155" />
      <text x="115" y="22" fill="#334155" fontSize="12" fontWeight="black">y</text>

      {/* Origó */}
      <circle cx="130" cy="130" r="3.5" fill="#ef4444" />
      <text x="122" y="143" fill="#64748b" fontSize="10" fontWeight="bold">O</text>

      {/* Példapont P(3; 2) -> (190, 90) */}
      <circle cx="190" cy="90" r="4.5" fill="#2563eb" stroke="#ffffff" strokeWidth="1.5" />
      <line x1="190" y1="130" x2="190" y2="90" stroke="#2563eb" strokeDasharray="2 2" />
      <line x1="130" y1="90" x2="190" y2="90" stroke="#2563eb" strokeDasharray="2 2" />
      <text x="195" y="85" fill="#1e3a8a" fontSize="11" fontWeight="bold">P(3; 2)</text>
    </svg>
  );
};

/**
 * Szemléltető ábra: Folyamatgrafikon és szakaszok (növekedés, állandóság, csökkenés)
 */
export const ProcessGraphSvg: React.FC<FigureProps> = ({ size = 280, className = '' }) => {
  return (
    <svg
      width={size}
      height={size * 0.65}
      viewBox="0 0 320 200"
      className={`select-none ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="30" y="20" width="270" height="150" fill="#f8fafc" rx="6" />

      {/* Tengelyek */}
      <line x1="40" y1="20" x2="40" y2="170" stroke="#475569" strokeWidth="2" />
      <line x1="40" y1="170" x2="295" y2="170" stroke="#475569" strokeWidth="2" />
      <text x="300" y="174" fill="#475569" fontSize="11" fontWeight="bold">t (idő)</text>
      <text x="25" y="18" fill="#475569" fontSize="11" fontWeight="bold">y (mennyiség)</text>

      {/* Görbe szakaszai:
          1. Szakasz: Növekedés (40,150) -> (110,80) (Zöld)
          2. Szakasz: Állandóság (110,80) -> (180,80) (Kék)
          3. Szakasz: Meredek növekedés (180,80) -> (230,40) (Lila)
          4. Szakasz: Csökkenés (230,40) -> (280,130) (Piros)
      */}
      <line x1="40" y1="150" x2="110" y2="80" stroke="#10b981" strokeWidth="3.5" strokeLinecap="round" />
      <line x1="110" y1="80" x2="180" y2="80" stroke="#3b82f6" strokeWidth="3.5" strokeLinecap="round" />
      <line x1="180" y1="80" x2="230" y2="40" stroke="#8b5cf6" strokeWidth="3.5" strokeLinecap="round" />
      <line x1="230" y1="40" x2="280" y2="130" stroke="#ef4444" strokeWidth="3.5" strokeLinecap="round" />

      {/* Töréspontok */}
      <circle cx="40" cy="150" r="4" fill="#10b981" />
      <circle cx="110" cy="80" r="4" fill="#3b82f6" />
      <circle cx="180" cy="80" r="4" fill="#8b5cf6" />
      <circle cx="230" cy="40" r="4" fill="#ef4444" />
      <circle cx="280" cy="130" r="4" fill="#ef4444" />

      {/* Címkék a szakaszok felett */}
      <text x="75" y="100" fill="#047857" fontSize="10" fontWeight="bold" textAnchor="middle">Növekszik</text>
      <text x="145" y="72" fill="#1d4ed8" fontSize="10" fontWeight="bold" textAnchor="middle">Állandó</text>
      <text x="200" y="50" fill="#6d28d9" fontSize="10" fontWeight="bold" textAnchor="middle">Gyors nő</text>
      <text x="265" y="75" fill="#b91c1c" fontSize="10" fontWeight="bold" textAnchor="middle">Csökken</text>

      {/* Maximum jelölése */}
      <text x="230" y="28" fill="#b91c1c" fontSize="11" fontWeight="black" textAnchor="middle">Csúcs (Max)</text>
    </svg>
  );
};

/**
 * Szemléltető ábra: Átlagos változási sebesség (meredekség, Delta y / Delta x)
 */
export const RateOfChangeSvg: React.FC<FigureProps> = ({ size = 260, className = '' }) => {
  return (
    <svg
      width={size}
      height={size * 0.7}
      viewBox="0 0 300 200"
      className={`select-none ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="30" y="20" width="240" height="150" fill="#f8fafc" rx="6" />

      {/* Tengelyek */}
      <line x1="45" y1="20" x2="45" y2="170" stroke="#475569" strokeWidth="2" />
      <line x1="45" y1="170" x2="270" y2="170" stroke="#475569" strokeWidth="2" />
      <text x="275" y="174" fill="#475569" fontSize="10" fontWeight="bold">Δx (idő)</text>
      <text x="35" y="18" fill="#475569" fontSize="10" fontWeight="bold">Δy</text>

      {/* Háromszög: (70, 140) -> (210, 60) */}
      <line x1="70" y1="140" x2="210" y2="60" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" />
      
      {/* Vízszintes és függőleges vetület */}
      <line x1="70" y1="140" x2="210" y2="140" stroke="#059669" strokeWidth="2" strokeDasharray="3 3" />
      <line x1="210" y1="140" x2="210" y2="60" stroke="#dc2626" strokeWidth="2" strokeDasharray="3 3" />

      {/* Végpontok */}
      <circle cx="70" cy="140" r="4.5" fill="#2563eb" />
      <circle cx="210" cy="60" r="4.5" fill="#2563eb" />

      {/* Címkék */}
      <text x="140" y="156" fill="#059669" fontSize="11" fontWeight="bold" textAnchor="middle">Δx = x₂ - x₁</text>
      <text x="232" y="105" fill="#dc2626" fontSize="11" fontWeight="bold">Δy = y₂ - y₁</text>
      <text x="140" y="85" fill="#1e3a8a" fontSize="12" fontWeight="black" textAnchor="middle">
        m = Δy / Δx
      </text>
    </svg>
  );
};

