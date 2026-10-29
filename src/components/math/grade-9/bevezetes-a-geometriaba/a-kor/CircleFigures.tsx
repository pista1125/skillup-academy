import React from 'react';

interface FigureProps {
  size?: number;
  className?: string;
}

/**
 * 1. A kör részei:
 * Középpont O, sugár r, átmérő d, húr AB, ív, körcikk és körszelet.
 */
export const CirclePartsSvg: React.FC<FigureProps> = ({ size = 320, className = '' }) => {
  return (
    <svg
      viewBox="0 0 380 240"
      width={size}
      height={(size * 240) / 380}
      className={`select-none max-w-full h-auto ${className}`}
    >
      <rect x="5" y="5" width="370" height="230" rx="14" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />

      {/* Cím badge */}
      <rect x="20" y="14" width="340" height="24" rx="6" fill="#ffe4e6" />
      <text x="190" y="30" fontSize="12" fontWeight="bold" textAnchor="middle" fill="#9f1239">
        A kör részei • Sugár, átmérő, húr, körcikk és körszelet
      </text>

      <g transform="translate(40, 25)">
        {/* Körvonal */}
        <circle cx="100" cy="100" r="75" fill="#ffffff" stroke="#e11d48" strokeWidth="2" />

        {/* Körcikk (két sugár és egy ív) - enyhe rózsaszín kitöltés */}
        <path d="M 100 100 L 175 100 A 75 75 0 0 0 153 47 Z" fill="rgba(244, 63, 94, 0.15)" stroke="none" />
        <text x="135" y="80" fontSize="9" fontWeight="bold" fill="#e11d48">Körcikk</text>

        {/* Körszelet (húr és ív határolja bal lent) */}
        <path d="M 47 153 A 75 75 0 0 0 100 175 Z" fill="rgba(99, 102, 241, 0.2)" stroke="none" />
        <text x="65" y="166" fontSize="9" fontWeight="bold" fill="#4338ca">Körszelet</text>

        {/* Középpont O */}
        <circle cx="100" cy="100" r="3.5" fill="#be123c" />
        <text x="92" y="96" fontSize="12" fontWeight="bold" fill="#be123c">O</text>

        {/* Sugár r */}
        <line x1="100" y1="100" x2="175" y2="100" stroke="#be123c" strokeWidth="2" />
        <text x="138" y="95" fontSize="11" fontWeight="bold" fill="#be123c">r</text>

        {/* Átmérő d (függőleges) */}
        <line x1="100" y1="25" x2="100" y2="175" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3 3" />
        <text x="105" y="45" fontSize="10" fill="#64748b">d = 2r</text>

        {/* Húr AB (bal lent) */}
        <line x1="47" y1="153" x2="100" y2="175" stroke="#4f46e5" strokeWidth="2" />
        <circle cx="47" cy="153" r="2.5" fill="#4f46e5" />
        <circle cx="100" cy="175" r="2.5" fill="#4f46e5" />
        <text x="32" y="155" fontSize="10" fontWeight="bold" fill="#4f46e5">A</text>
        <text x="105" y="185" fontSize="10" fontWeight="bold" fill="#4f46e5">B</text>
        <text x="65" y="150" fontSize="10" fontWeight="bold" fill="#4f46e5">Húr</text>
      </g>

      {/* Jobb oldali magyarázó kártya */}
      <g transform="translate(235, 50)">
        <rect x="0" y="0" width="130" height="155" rx="8" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
        <text x="65" y="18" fontSize="11" fontWeight="bold" textAnchor="middle" fill="#1e293b">Fogalmak</text>
        <line x1="10" y1="24" x2="120" y2="24" stroke="#f1f5f9" strokeWidth="1" />

        <text x="10" y="40" fontSize="9" fill="#475569">• <strong>Sugár (r):</strong> középponttól a körvonalig</text>
        <text x="10" y="62" fontSize="9" fill="#475569">• <strong>Átmérő (d = 2r):</strong> leghosszabb húr</text>
        <text x="10" y="84" fontSize="9" fill="#475569">• <strong>Húr:</strong> 2 körpontot összekötő szakasz</text>
        <text x="10" y="106" fontSize="9" fill="#475569">• <strong>Körcikk:</strong> 2 sugár és 1 ív határolja</text>
        <text x="10" y="128" fontSize="9" fill="#475569">• <strong>Körszelet:</strong> 1 húr és 1 ív határolja</text>
      </g>
    </svg>
  );
};

/**
 * 2. Kör és egyenes kölcsönös helyzete:
 * Szelő (d < r, 2 pont), Érintő (d = r, 1 pont, merőleges sugárral!), Külső egyenes (d > r, 0 pont).
 * Magyar derékszög-jelölés az érintőnél: negyedkörív ponttal.
 */
export const LineCirclePositionsSvg: React.FC<FigureProps> = ({ size = 320, className = '' }) => {
  return (
    <svg
      viewBox="0 0 380 200"
      width={size}
      height={(size * 200) / 380}
      className={`select-none max-w-full h-auto ${className}`}
    >
      <rect x="5" y="5" width="370" height="190" rx="14" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />

      {/* 1. Szelő: d < r */}
      <g transform="translate(15, 15)">
        <rect x="0" y="0" width="110" height="160" rx="8" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
        <text x="55" y="18" fontSize="10" fontWeight="bold" textAnchor="middle" fill="#0284c7">Szelő egyenes</text>
        <text x="55" y="30" fontSize="8" textAnchor="middle" fill="#64748b">d &lt; r (2 metszéspont)</text>

        <circle cx="55" cy="85" r="35" fill="none" stroke="#0284c7" strokeWidth="1.5" />
        <circle cx="55" cy="85" r="2" fill="#0284c7" />

        {/* Szelő egyenes */}
        <line x1="10" y1="100" x2="100" y2="100" stroke="#0284c7" strokeWidth="1.8" />
        <circle cx="23" cy="100" r="2.5" fill="#ef4444" />
        <circle cx="87" cy="100" r="2.5" fill="#ef4444" />
        <text x="55" y="115" fontSize="8" textAnchor="middle" fill="#ef4444">Húr</text>
        <text x="55" y="150" fontSize="8" textAnchor="middle" fill="#64748b">2 közös pont</text>
      </g>

      {/* 2. Érintő: d = r (Magyar derékszög-jelölés) */}
      <g transform="translate(135, 15)">
        <rect x="0" y="0" width="110" height="160" rx="8" fill="#fff1f2" stroke="#fecdd3" strokeWidth="1" />
        <text x="55" y="18" fontSize="10" fontWeight="bold" textAnchor="middle" fill="#be123c">Érintő egyenes</text>
        <text x="55" y="30" fontSize="8" textAnchor="middle" fill="#e11d48">d = r (1 érintési pont)</text>

        <circle cx="55" cy="80" r="35" fill="none" stroke="#be123c" strokeWidth="1.5" />
        <circle cx="55" cy="80" r="2" fill="#be123c" />

        {/* Érintési sugár */}
        <line x1="55" y1="80" x2="55" y2="115" stroke="#be123c" strokeWidth="1.5" />
        <text x="45" y="100" fontSize="9" fontWeight="bold" fill="#be123c">r</text>

        {/* Érintő egyenes e */}
        <line x1="10" y1="115" x2="100" y2="115" stroke="#be123c" strokeWidth="2" />
        <circle cx="55" cy="115" r="3" fill="#be123c" />
        <text x="55" y="130" fontSize="9" fontWeight="bold" textAnchor="middle" fill="#be123c">E</text>

        {/* Magyar derékszög negyedkörív ponttal */}
        <path d="M 55 103 A 12 12 0 0 1 67 115" fill="none" stroke="#be123c" strokeWidth="1.2" />
        <circle cx="61" cy="109" r="1.2" fill="#be123c" />

        <text x="55" y="150" fontSize="8" fontWeight="bold" textAnchor="middle" fill="#be123c">r ⊥ érintő</text>
      </g>

      {/* 3. Külső egyenes: d > r */}
      <g transform="translate(255, 15)">
        <rect x="0" y="0" width="110" height="160" rx="8" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
        <text x="55" y="18" fontSize="10" fontWeight="bold" textAnchor="middle" fill="#475569">Külső egyenes</text>
        <text x="55" y="30" fontSize="8" textAnchor="middle" fill="#64748b">d &gt; r (0 közös pont)</text>

        <circle cx="55" cy="75" r="32" fill="none" stroke="#94a3b8" strokeWidth="1.5" />
        <circle cx="55" cy="75" r="2" fill="#94a3b8" />

        {/* Távolságvonal */}
        <line x1="55" y1="75" x2="55" y2="125" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="2 2" />
        <text x="45" y="105" fontSize="8" fill="#94a3b8">d</text>

        {/* Külső egyenes */}
        <line x1="10" y1="125" x2="100" y2="125" stroke="#475569" strokeWidth="1.8" />
        <text x="55" y="150" fontSize="8" textAnchor="middle" fill="#64748b">Nincs közös pont</text>
      </g>
    </svg>
  );
};

/**
 * 3. Érintőszakaszok tétele:
 * Külső P pontból húzott két érintőszakasz egyenlő hosszúságú: |PE1| = |PE2|.
 * OPE1 és OPE2 derékszögű háromszögek magyar derékszög-jelöléssel.
 */
export const TangentSegmentsSvg: React.FC<FigureProps> = ({ size = 320, className = '' }) => {
  return (
    <svg
      viewBox="0 0 380 230"
      width={size}
      height={(size * 230) / 380}
      className={`select-none max-w-full h-auto ${className}`}
    >
      <rect x="5" y="5" width="370" height="220" rx="14" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />

      {/* Cím badge */}
      <rect x="20" y="14" width="340" height="24" rx="6" fill="#fdf2f8" />
      <text x="190" y="30" fontSize="12" fontWeight="bold" textAnchor="middle" fill="#9d174d">
        Érintőszakaszok tétele • |PE₁| = |PE₂| = √(d² - r²)
      </text>

      <g transform="translate(30, 20)">
        {/* Kör O(90, 100), r = 50 */}
        <circle cx="90" cy="100" r="50" fill="rgba(244, 63, 94, 0.06)" stroke="#f43f5e" strokeWidth="2" />
        <circle cx="90" cy="100" r="3" fill="#be123c" />
        <text x="80" y="100" fontSize="12" fontWeight="bold" fill="#be123c">O</text>

        {/* P külső pont: P(260, 100). OP távolság = 170.
            r = 50, d = 170 => érintőszakasz e = sqrt(170^2 - 50^2) = sqrt(28900 - 2500) = sqrt(26400) ≈ 162.5
            Szög: cos(alfa) = 50 / 170 ≈ 0.294 => alfa ≈ 72.9°
            E1 és E2 pontok:
            E1: (90 + 50*cos(72.9°), 100 - 50*sin(72.9°)) = (90 + 14.7, 100 - 47.8) = (105, 52)
            E2: (105, 148)
        */}
        {/* OP szakasz */}
        <line x1="90" y1="100" x2="260" y2="100" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4 3" />
        <text x="180" y="93" fontSize="10" fill="#64748b">d = |OP|</text>

        {/* Érintő 1: P(260,100) -> E1(105, 52) */}
        <line x1="260" y1="100" x2="105" y2="52" stroke="#059669" strokeWidth="2" />
        {/* Sugár 1: O(90,100) -> E1(105, 52) */}
        <line x1="90" y1="100" x2="105" y2="52" stroke="#be123c" strokeWidth="2" />
        <circle cx="105" cy="52" r="3" fill="#059669" />
        <text x="100" y="42" fontSize="11" fontWeight="bold" fill="#059669">E₁</text>

        {/* Magyar derékszög jelölés E1-nél */}
        <path d="M 101.4 63.4 A 12 12 0 0 0 116.5 55.6" fill="none" stroke="#059669" strokeWidth="1.2" />
        <circle cx="107" cy="63" r="1.1" fill="#059669" />

        {/* Érintő 2: P(260,100) -> E2(105, 148) */}
        <line x1="260" y1="100" x2="105" y2="148" stroke="#059669" strokeWidth="2" />
        {/* Sugár 2: O(90,100) -> E2(105, 148) */}
        <line x1="90" y1="100" x2="105" y2="148" stroke="#be123c" strokeWidth="2" />
        <circle cx="105" cy="148" r="3" fill="#059669" />
        <text x="100" y="166" fontSize="11" fontWeight="bold" fill="#059669">E₂</text>

        {/* Magyar derékszög jelölés E2-nél */}
        <path d="M 101.4 136.6 A 12 12 0 0 1 116.5 144.4" fill="none" stroke="#059669" strokeWidth="1.2" />
        <circle cx="107" cy="137" r="1.1" fill="#059669" />

        {/* P pont */}
        <circle cx="260" cy="100" r="4" fill="#059669" />
        <text x="272" y="104" fontSize="12" fontWeight="bold" fill="#059669">P</text>

        <text x="195" y="68" fontSize="11" fontWeight="bold" fill="#059669">|PE₁|</text>
        <text x="195" y="136" fontSize="11" fontWeight="bold" fill="#059669">|PE₂|</text>
        <text x="80" y="75" fontSize="10" fontWeight="bold" fill="#be123c">r</text>
        <text x="80" y="130" fontSize="10" fontWeight="bold" fill="#be123c">r</text>
      </g>
    </svg>
  );
};

