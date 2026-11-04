import React from 'react';

interface FigureProps {
  size?: number;
  className?: string;
}

// 1. Szalagornamensek (Frizek) vizualizációja: 3 jellegzetes típus
export const FriezePatternsSvg: React.FC<FigureProps> = ({ size = 360, className = '' }) => {
  return (
    <svg
      viewBox="0 0 420 220"
      width={size}
      height={size * 0.52}
      className={`select-none max-w-full h-auto ${className}`}
    >
      <rect x="5" y="5" width="410" height="210" rx="14" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />

      {/* 1. Típus: Tiszta eltolás (hop) */}
      <g transform="translate(15, 15)">
        <rect x="0" y="0" width="390" height="52" rx="8" fill="#eff6ff" stroke="#bfdbfe" />
        <text x="12" y="18" fontSize="11" fontWeight="bold" fill="#1e40af">1. Tiszta Eltolás (p1): v vektorral periodikusan</text>
        {/* Motívum: L alakzat vagy nyilacska */}
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <g key={`hop-${i}`} transform={`translate(${30 + i * 50}, 24)`}>
            <path d="M 0 18 L 0 0 L 14 8 Z" fill="#3b82f6" />
            <circle cx="0" cy="0" r="2.5" fill="#1d4ed8" />
          </g>
        ))}
        {/* Eltolási nyíl */}
        <path d="M 320 34 L 370 34" stroke="#2563eb" strokeWidth="2" markerEnd="url(#blue-arrow)" />
        <text x="345" y="46" fontSize="10" fontWeight="bold" fill="#2563eb" textAnchor="middle">v</text>
      </g>

      {/* 2. Típus: Csúsztatva tükrözés (step / talajlenyomat) */}
      <g transform="translate(15, 75)">
        <rect x="0" y="0" width="390" height="60" rx="8" fill="#f0fdf4" stroke="#bbf7d0" />
        <text x="12" y="16" fontSize="11" fontWeight="bold" fill="#166534">2. Csúsztatva Tükrözés (p11g): eltolás + tengelyes tükrözés</text>
        <line x1="20" y1="36" x2="370" y2="36" stroke="#86efac" strokeWidth="1.5" strokeDasharray="4 3" />
        {/* Felső elemek */}
        {[0, 1, 2, 3].map((i) => (
          <g key={`step-top-${i}`} transform={`translate(${30 + i * 90}, 25)`}>
            <path d="M 0 0 L 16 0 L 8 -12 Z" fill="#10b981" />
          </g>
        ))}
        {/* Alsó tükrözött és eltolt elemek */}
        {[0, 1, 2, 3].map((i) => (
          <g key={`step-bot-${i}`} transform={`translate(${75 + i * 90}, 47)`}>
            <path d="M 0 0 L 16 0 L 8 12 Z" fill="#059669" />
          </g>
        ))}
      </g>

      {/* 3. Típus: Függőleges tükrözések sora (sidle) */}
      <g transform="translate(15, 143)">
        <rect x="0" y="0" width="390" height="62" rx="8" fill="#faf5ff" stroke="#e9d5ff" />
        <text x="12" y="16" fontSize="11" fontWeight="bold" fill="#6b21a8">3. Függőleges Tükrözések (p1m1): szimmetrikus párok</text>
        {[0, 1, 2, 3].map((i) => (
          <g key={`refl-${i}`} transform={`translate(${35 + i * 90}, 24)`}>
            <line x1="30" y1="2" x2="30" y2="32" stroke="#c084fc" strokeWidth="1.5" strokeDasharray="3 2" />
            <path d="M 12 28 L 26 28 L 26 6 Z" fill="#a855f7" />
            <path d="M 48 28 L 34 28 L 34 6 Z" fill="#9333ea" />
          </g>
        ))}
      </g>
    </svg>
  );
};

// 2. Szabályos Parkettázások és a csúcs körüli szögek feltétele
export const TessellationSvg: React.FC<FigureProps> = ({ size = 360, className = '' }) => {
  return (
    <svg
      viewBox="0 0 420 220"
      width={size}
      height={size * 0.52}
      className={`select-none max-w-full h-auto ${className}`}
    >
      <rect x="5" y="5" width="410" height="210" rx="14" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />

      {/* 1. Háromszögek: 6 × 60° = 360° */}
      <g transform="translate(20, 25)">
        <rect x="0" y="0" width="115" height="150" rx="8" fill="#eff6ff" stroke="#bfdbfe" />
        <text x="57" y="20" fontSize="11" fontWeight="bold" fill="#1e40af" textAnchor="middle">Szabályos 3-szög</text>
        <text x="57" y="34" fontSize="9.5" fontWeight="600" fill="#2563eb" textAnchor="middle">6 × 60° = 360°</text>

        {/* 6 háromszög egy csúcs körül */}
        <g transform="translate(57, 95)">
          {[0, 60, 120, 180, 240, 300].map((angle, idx) => (
            <polygon
              key={`tri-${idx}`}
              points="0,0 38,0 19,-33"
              transform={`rotate(${angle})`}
              fill={idx % 2 === 0 ? '#60a5fa' : '#93c5fd'}
              stroke="#1d4ed8"
              strokeWidth="1.2"
            />
          ))}
          <circle cx="0" cy="0" r="3.5" fill="#dc2626" />
        </g>
        <text x="57" y="166" fontSize="10" fontWeight="bold" fill="#16a34a" textAnchor="middle">✓ Lefedi a síkot</text>
      </g>

      {/* 2. Négyzetek: 4 × 90° = 360° */}
      <g transform="translate(150, 25)">
        <rect x="0" y="0" width="115" height="150" rx="8" fill="#f0fdf4" stroke="#bbf7d0" />
        <text x="57" y="20" fontSize="11" fontWeight="bold" fill="#166534" textAnchor="middle">Négyzet</text>
        <text x="57" y="34" fontSize="9.5" fontWeight="600" fill="#059669" textAnchor="middle">4 × 90° = 360°</text>

        {/* 4 négyzet egy csúcs körül */}
        <g transform="translate(57, 95)">
          <rect x="-34" y="-34" width="34" height="34" fill="#34d399" stroke="#059669" strokeWidth="1.2" />
          <rect x="0" y="-34" width="34" height="34" fill="#6ee7b7" stroke="#059669" strokeWidth="1.2" />
          <rect x="-34" y="0" width="34" height="34" fill="#6ee7b7" stroke="#059669" strokeWidth="1.2" />
          <rect x="0" y="0" width="34" height="34" fill="#34d399" stroke="#059669" strokeWidth="1.2" />
          <circle cx="0" cy="0" r="3.5" fill="#dc2626" />
        </g>
        <text x="57" y="166" fontSize="10" fontWeight="bold" fill="#16a34a" textAnchor="middle">✓ Lefedi a síkot</text>
      </g>

      {/* 3. Hatszögek: 3 × 120° = 360° és Ötszög kudarc */}
      <g transform="translate(280, 25)">
        <rect x="0" y="0" width="120" height="150" rx="8" fill="#faf5ff" stroke="#e9d5ff" />
        <text x="60" y="20" fontSize="11" fontWeight="bold" fill="#6b21a8" textAnchor="middle">Szabályos Hatszög</text>
        <text x="60" y="34" fontSize="9.5" fontWeight="600" fill="#7c3aed" textAnchor="middle">3 × 120° = 360°</text>

        {/* 3 hatszög egy csúcs körül */}
        <g transform="translate(60, 95) scale(0.72)">
          {/* Hatszög 1 */}
          <polygon
            points="0,0 30,-17.3 60,-17.3 75,-43.3 60,-69.3 30,-69.3 15,-43.3"
            fill="#c084fc"
            stroke="#7e22ce"
            strokeWidth="1.5"
          />
          {/* Hatszög 2 */}
          <polygon
            points="0,0 -30,-17.3 -60,-17.3 -75,-43.3 -60,-69.3 -30,-69.3 -15,-43.3"
            fill="#d8b4fe"
            stroke="#7e22ce"
            strokeWidth="1.5"
          />
          {/* Hatszög 3 */}
          <polygon
            points="0,0 -30,17.3 -30,52 0,69.3 30,52 30,17.3"
            fill="#a855f7"
            stroke="#7e22ce"
            strokeWidth="1.5"
          />
          <circle cx="0" cy="0" r="4.5" fill="#dc2626" />
        </g>
        <text x="60" y="166" fontSize="10" fontWeight="bold" fill="#16a34a" textAnchor="middle">✓ Méhsejt-rács</text>
      </g>

      {/* Alsó megjegyzés az ötszögről */}
      <rect x="25" y="185" width="370" height="24" rx="5" fill="#fff1f2" stroke="#fecdd3" />
      <text x="210" y="201" fontSize="10.5" fontWeight="bold" fill="#be123c" textAnchor="middle">
        Szabályos 5-szög: 3 × 108° = 324° (36° rés) ❌ Önmagában nem parkettáz!
      </text>
    </svg>
  );
};

// 3. Escher-féle Alakzatkészítés eltolásos módszerrel
export const EscherTessellationSvg: React.FC<FigureProps> = ({ size = 360, className = '' }) => {
  const getEscherTilePath = (x: number, y: number, s: number = 52) => {
    const h1 = s * 0.34;
    const h2 = s * 0.71;
    const v1 = s * 0.34;
    const v2 = s * 0.71;
    const b = s * 0.15;
    return [
      `M ${x} ${y}`,
      `C ${x + h1} ${y - b}, ${x + h2} ${y + b}, ${x + s} ${y}`,
      `C ${x + s + b} ${y + v1}, ${x + s - b} ${y + v2}, ${x + s} ${y + s}`,
      `C ${x + h2} ${y + s + b}, ${x + h1} ${y + s - b}, ${x} ${y + s}`,
      `C ${x - b} ${y + v2}, ${x + b} ${y + v1}, ${x} ${y}`,
      'Z'
    ].join(' ');
  };

  return (
    <svg
      viewBox="0 0 460 215"
      width={size}
      height={size * 0.47}
      className={`select-none max-w-full h-auto ${className}`}
    >
      <rect x="5" y="5" width="450" height="205" rx="14" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />

      {/* 1. Lépés: Négyzetből kivágás és átrakás */}
      <g transform="translate(15, 12)">
        <text x="100" y="16" fontSize="11" fontWeight="bold" fill="#1e293b" textAnchor="middle">
          1. Eltolásos Módosítás
        </text>

        {/* Eredeti négyzet szaggatott kerettel */}
        <rect x="65" y="32" width="70" height="70" rx="3" fill="#f1f5f9" stroke="#94a3b8" strokeDasharray="4 3" />

        {/* Eredeti négyzet oldalára épülő Escher-csempe */}
        <path
          d={getEscherTilePath(65, 32, 70)}
          fill="#dbeafe"
          stroke="#2563eb"
          strokeWidth="2"
        />

        {/* Kivágott darab és átrakás nyilacska (vízszintes eltolás) */}
        <path d="M 72 67 L 128 67" stroke="#ef4444" strokeWidth="1.8" strokeDasharray="3 2" />
        <circle cx="72" cy="67" r="3" fill="#ef4444" />
        <circle cx="128" cy="67" r="3" fill="#ef4444" />
        <text x="100" y="62" fontSize="9.5" fontWeight="bold" fill="#dc2626" textAnchor="middle">
          Eltolás v-vel
        </text>
        <text x="100" y="126" fontSize="10" fontWeight="bold" fill="#475569" textAnchor="middle">
          Terület állandó: T = a²
        </text>
      </g>

      {/* Nyíl a két lépés között */}
      <g transform="translate(205, 85)">
        <path d="M 0 0 L 22 0" stroke="#64748b" strokeWidth="2.5" />
        <polygon points="22,-4 30,0 22,4" fill="#64748b" />
      </g>

      {/* 2. Lépés: Hézagmentes illeszkedés a síkon */}
      <g transform="translate(245, 12)">
        <text x="100" y="16" fontSize="11" fontWeight="bold" fill="#1e293b" textAnchor="middle">
          2. Illeszkedő Escher-Parketta
        </text>

        {/* Csempék 2x2 egymásba illeszkedő elrendezése */}
        <g transform="translate(48, 28)">
          {/* Csempe 1 (kék) (0, 0) */}
          <path
            d={getEscherTilePath(0, 0, 52)}
            fill="#60a5fa"
            stroke="#1d4ed8"
            strokeWidth="1.5"
          />
          {/* Csempe 2 (borostyán) (52, 0) */}
          <path
            d={getEscherTilePath(52, 0, 52)}
            fill="#fbbf24"
            stroke="#b45309"
            strokeWidth="1.5"
          />
          {/* Csempe 3 (borostyán) (0, 52) */}
          <path
            d={getEscherTilePath(0, 52, 52)}
            fill="#fbbf24"
            stroke="#b45309"
            strokeWidth="1.5"
          />
          {/* Csempe 4 (kék) (52, 52) */}
          <path
            d={getEscherTilePath(52, 52, 52)}
            fill="#60a5fa"
            stroke="#1d4ed8"
            strokeWidth="1.5"
          />
        </g>

        {/* Alsó visszaigazoló felirat biztonságos margóval */}
        <g transform="translate(16, 144)">
          <rect x="0" y="0" width="168" height="22" rx="6" fill="#ecfdf5" stroke="#a7f3d0" />
          <text x="84" y="15" fontSize="9.5" fontWeight="bold" fill="#047857" textAnchor="middle">
            ✓ Hézagmentes és átfedésmentes
          </text>
        </g>
      </g>
    </svg>
  );
};

