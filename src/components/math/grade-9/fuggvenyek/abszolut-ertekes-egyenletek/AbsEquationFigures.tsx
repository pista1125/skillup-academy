import React from 'react';

interface FigureProps {
  size?: number;
  className?: string;
}

/**
 * Távolság a számegyenesen: |x - a| = b ⟹ x₁ = a - b és x₂ = a + b
 */
export const DistanceOnNumberLineSvg: React.FC<FigureProps> = ({ size = 280, className = '' }) => {
  return (
    <svg
      viewBox="0 0 320 180"
      width={size}
      height={size * (180 / 320)}
      className={`select-none ${className}`}
    >
      <rect width="320" height="180" fill="#0f172a" rx="8" />

      {/* Cím */}
      <text x="160" y="32" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle">
        |x - a| = b &nbsp;(b ≥ 0 távolság)
      </text>

      {/* Számegyenes */}
      <line x1="30" y1="95" x2="290" y2="95" stroke="#475569" strokeWidth="2" />
      <path d="M 285 90 L 295 95 L 285 100" fill="#475569" />

      {/* Középpont: a (160) */}
      <circle cx="160" cy="95" r="4.5" fill="#f59e0b" />
      <text x="160" y="115" fill="#fbbf24" fontSize="12" fontWeight="bold" textAnchor="middle">a (közép)</text>

      {/* Bal oldali gyök: a - b (80) */}
      <circle cx="80" cy="95" r="5" fill="#10b981" />
      <text x="80" y="115" fill="#34d399" fontSize="12" fontWeight="bold" textAnchor="middle">x₁ = a - b</text>

      {/* Jobb oldali gyök: a + b (240) */}
      <circle cx="240" cy="95" r="5" fill="#10b981" />
      <text x="240" y="115" fill="#34d399" fontSize="12" fontWeight="bold" textAnchor="middle">x₂ = a + b</text>

      {/* Távolság ívek felül */}
      {/* Balra b */}
      <path d="M 160 85 Q 120 55, 80 85" fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 2" />
      <text x="120" y="62" fill="#7dd3fc" fontSize="11" fontWeight="bold" textAnchor="middle">b távolság</text>

      {/* Jobbra b */}
      <path d="M 160 85 Q 200 55, 240 85" fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 2" />
      <text x="200" y="62" fill="#7dd3fc" fontSize="11" fontWeight="bold" textAnchor="middle">b távolság</text>

      {/* Alsó megjegyzés */}
      <text x="160" y="150" fill="#94a3b8" fontSize="10" textAnchor="middle">
        Az x pontok pontosan b egységre vannak az a számtól
      </text>
    </svg>
  );
};

/**
 * Két ponttól egyenlő távolságra: |x - a| = |x - b| (Felezőpont)
 */
export const TwoAbsMidpointSvg: React.FC<FigureProps> = ({ size = 280, className = '' }) => {
  return (
    <svg
      viewBox="0 0 320 180"
      width={size}
      height={size * (180 / 320)}
      className={`select-none ${className}`}
    >
      <rect width="320" height="180" fill="#0f172a" rx="8" />

      {/* Cím */}
      <text x="160" y="32" fill="#a855f7" fontSize="13" fontWeight="bold" textAnchor="middle">
        |x - a| = |x - b| &nbsp;⟹&nbsp; Felezőpont
      </text>

      {/* Számegyenes */}
      <line x1="30" y1="95" x2="290" y2="95" stroke="#475569" strokeWidth="2" />
      <path d="M 285 90 L 295 95 L 285 100" fill="#475569" />

      {/* a pont (70) */}
      <circle cx="70" cy="95" r="4.5" fill="#f59e0b" />
      <text x="70" y="115" fill="#fbbf24" fontSize="11" fontWeight="bold" textAnchor="middle">a</text>

      {/* b pont (250) */}
      <circle cx="250" cy="95" r="4.5" fill="#f59e0b" />
      <text x="250" y="115" fill="#fbbf24" fontSize="11" fontWeight="bold" textAnchor="middle">b</text>

      {/* Felezőpont x = (a+b)/2 (160) */}
      <circle cx="160" cy="95" r="6" fill="#10b981" stroke="#ffffff" strokeWidth="1.5" />
      <text x="160" y="120" fill="#34d399" fontSize="12" fontWeight="bold" textAnchor="middle">
        x = (a + b) / 2
      </text>

      {/* Egyenlő távolság jelzés */}
      <path d="M 70 85 Q 115 60, 160 85" fill="none" stroke="#a855f7" strokeWidth="1.5" />
      <text x="115" y="65" fill="#c084fc" fontSize="10" textAnchor="middle">d távolság</text>

      <path d="M 160 85 Q 205 60, 250 85" fill="none" stroke="#a855f7" strokeWidth="1.5" />
      <text x="205" y="65" fill="#c084fc" fontSize="10" textAnchor="middle">d távolság</text>

      <text x="160" y="150" fill="#94a3b8" fontSize="10" textAnchor="middle">
        A szakasz felezőpontja az egyetlen megoldás
      </text>
    </svg>
  );
};

/**
 * Algebrai esetszétválasztás táblázatos modellje
 */
export const CaseSeparationSvg: React.FC<FigureProps> = ({ size = 280, className = '' }) => {
  return (
    <svg
      viewBox="0 0 320 180"
      width={size}
      height={size * (180 / 320)}
      className={`select-none ${className}`}
    >
      <rect width="320" height="180" fill="#0f172a" rx="8" />

      {/* Cím */}
      <text x="160" y="30" fill="#fbbf24" fontSize="12" fontWeight="bold" textAnchor="middle">
        Esetszétválasztás: |k(x)| zérushelye x₀
      </text>

      {/* 2 panel: Bal eset (x < x₀) és Jobb eset (x ≥ x₀) */}
      <rect x="15" y="45" width="140" height="115" fill="#1e293b" rx="6" stroke="#334155" strokeWidth="1" />
      <text x="85" y="68" fill="#f87171" fontSize="11" fontWeight="bold" textAnchor="middle">
        1. Eset: x &lt; x₀
      </text>
      <text x="85" y="88" fill="#cbd5e1" fontSize="10" textAnchor="middle">k(x) &lt; 0 (negatív)</text>
      <rect x="30" y="100" width="110" height="28" fill="#7f1d1d" fillOpacity="0.4" rx="4" />
      <text x="85" y="118" fill="#fca5a5" fontSize="11" fontWeight="bold" textAnchor="middle">
        |k(x)| = -k(x)
      </text>
      <text x="85" y="145" fill="#94a3b8" fontSize="9" textAnchor="middle">Ellentettre vált</text>

      <rect x="165" y="45" width="140" height="115" fill="#1e293b" rx="6" stroke="#334155" strokeWidth="1" />
      <text x="235" y="68" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">
        2. Eset: x ≥ x₀
      </text>
      <text x="235" y="88" fill="#cbd5e1" fontSize="10" textAnchor="middle">k(x) ≥ 0 (nemnegatív)</text>
      <rect x="180" y="100" width="110" height="28" fill="#064e3b" fillOpacity="0.4" rx="4" />
      <text x="235" y="118" fill="#86efac" fontSize="11" fontWeight="bold" textAnchor="middle">
        |k(x)| = k(x)
      </text>
      <text x="235" y="145" fill="#94a3b8" fontSize="9" textAnchor="middle">Változatlan marad</text>
    </svg>
  );
};

