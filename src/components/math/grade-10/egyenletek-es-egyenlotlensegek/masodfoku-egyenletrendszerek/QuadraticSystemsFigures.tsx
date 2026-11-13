import React from 'react';

interface FigureProps {
  size?: number;
  className?: string;
}

// 1. Egyenes és parabola metszéspontjai
export const LineAndParabolaIntersectionSvg: React.FC<FigureProps> = ({ size = 260, className = '' }) => {
  return (
    <svg
      viewBox="0 0 320 185"
      width={size}
      height={(size * 185) / 320}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`max-w-full h-auto select-none ${className}`}
    >
      <defs>
        <linearGradient id="lpiParabolaGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ea580c" />
          <stop offset="50%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#ea580c" />
        </linearGradient>
        <filter id="lpiPillGlow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#9a3412" floodOpacity="0.15" />
        </filter>
      </defs>

      {/* Háttér kártya */}
      <rect x="0" y="0" width="320" height="185" rx="8" fill="#fffaf5" stroke="#fed7aa" strokeWidth="1" />

      {/* Cím szalag */}
      <text x="160" y="16" fill="#9a3412" fontSize="9.5" fontWeight="900" textAnchor="middle" letterSpacing="0.5">
        EGYENES ÉS PARABOLA METSZÉSPONTJAI
      </text>

      {/* Koordinátatengelyek */}
      {/* x-tengely */}
      <line x1="30" y1="138" x2="292" y2="138" stroke="#94a3b8" strokeWidth="1.5" />
      <polygon points="296,138 288,135 288,141" fill="#64748b" />
      <text x="300" y="141" fill="#475569" fontSize="8.5" fontWeight="bold" fontFamily="monospace">x</text>

      {/* y-tengely */}
      <line x1="56" y1="152" x2="56" y2="24" stroke="#94a3b8" strokeWidth="1.5" />
      <polygon points="56,20 53,28 59,28" fill="#64748b" />
      <text x="56" y="15" fill="#475569" fontSize="8.5" fontWeight="bold" fontFamily="monospace" textAnchor="middle">y</text>
      <text x="47" y="147" fill="#94a3b8" fontSize="7.5" fontFamily="monospace">O</text>

      {/* Parabola görbe: y = 120 - 0.008(x - 160)^2 -> pontos Bézier Q (160, 200) */}
      <path
        d="M 60 40 Q 160 200 260 40"
        stroke="url(#lpiParabolaGrad)"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
      {/* Parabola felirat */}
      <rect x="68" y="24" width="76" height="13" rx="3" fill="#fff7ed" stroke="#fdba74" strokeWidth="0.8" />
      <text x="106" y="33.5" fill="#c2410c" fontSize="7" fontWeight="bold" textAnchor="middle">y = ax² + bx + c</text>

      {/* Szelő egyenes: y = -0.2x + 122 */}
      <line x1="45" y1="113" x2="275" y2="67" stroke="#0284c7" strokeWidth="2" strokeDasharray="4 3" strokeLinecap="round" />
      {/* Egyenes felirat */}
      <rect x="232" y="86" width="56" height="13" rx="3" fill="#f0f9ff" stroke="#7dd3fc" strokeWidth="0.8" />
      <text x="260" y="95.5" fill="#0369a1" fontSize="7" fontWeight="bold" textAnchor="middle">y = mx + d</text>

      {/* Vetítési szaggatott vonalak a tengelyekre: P1 (110; 100) */}
      <line x1="110" y1="100" x2="110" y2="138" stroke="#f97316" strokeWidth="1" strokeDasharray="2 2" strokeOpacity="0.8" />
      <line x1="110" y1="135" x2="110" y2="141" stroke="#ea580c" strokeWidth="1.5" />
      <text x="110" y="149" fill="#c2410c" fontSize="7.5" fontWeight="bold" textAnchor="middle">x₁</text>

      <line x1="110" y1="100" x2="56" y2="100" stroke="#f97316" strokeWidth="1" strokeDasharray="2 2" strokeOpacity="0.8" />
      <line x1="53" y1="100" x2="59" y2="100" stroke="#ea580c" strokeWidth="1.5" />
      <text x="50" y="102.5" fill="#c2410c" fontSize="7.5" fontWeight="bold" textAnchor="end">y₁</text>

      {/* Vetítési szaggatott vonalak a tengelyekre: P2 (235; 75) */}
      <line x1="235" y1="75" x2="235" y2="138" stroke="#f97316" strokeWidth="1" strokeDasharray="2 2" strokeOpacity="0.8" />
      <line x1="235" y1="135" x2="235" y2="141" stroke="#ea580c" strokeWidth="1.5" />
      <text x="235" y="149" fill="#c2410c" fontSize="7.5" fontWeight="bold" textAnchor="middle">x₂</text>

      <line x1="235" y1="75" x2="56" y2="75" stroke="#f97316" strokeWidth="1" strokeDasharray="2 2" strokeOpacity="0.8" />
      <line x1="53" y1="75" x2="59" y2="75" stroke="#ea580c" strokeWidth="1.5" />
      <text x="50" y="77.5" fill="#c2410c" fontSize="7.5" fontWeight="bold" textAnchor="end">y₂</text>

      {/* Metszéspont P1 (110; 100) - MATEMATIKAILAG 100% PONTOS */}
      <circle cx="110" cy="100" r="7" fill="#ea580c" fillOpacity="0.2" />
      <circle cx="110" cy="100" r="4" fill="#ea580c" stroke="#ffffff" strokeWidth="1.5" />
      <circle cx="110" cy="100" r="1.5" fill="#ffffff" />
      {/* P1 Címke kártya */}
      <g filter="url(#lpiPillGlow)">
        <rect x="76" y="78" width="52" height="15" rx="3" fill="#ffffff" stroke="#fdba74" strokeWidth="1" />
        <text x="102" y="89" fill="#9a3412" fontSize="7.5" fontWeight="900" textAnchor="middle">P₁(x₁; y₁)</text>
      </g>

      {/* Metszéspont P2 (235; 75) - MATEMATIKAILAG 100% PONTOS */}
      <circle cx="235" cy="75" r="7" fill="#ea580c" fillOpacity="0.2" />
      <circle cx="235" cy="75" r="4" fill="#ea580c" stroke="#ffffff" strokeWidth="1.5" />
      <circle cx="235" cy="75" r="1.5" fill="#ffffff" />
      {/* P2 Címke kártya */}
      <g filter="url(#lpiPillGlow)">
        <rect x="216" y="52" width="52" height="15" rx="3" fill="#ffffff" stroke="#fdba74" strokeWidth="1" />
        <text x="242" y="63" fill="#9a3412" fontSize="7.5" fontWeight="900" textAnchor="middle">P₂(x₂; y₂)</text>
      </g>

      {/* Behelyettesítés doboz alul */}
      <rect x="20" y="157" width="280" height="22" rx="4" fill="#ffedd5" stroke="#fdba74" strokeWidth="1" />
      <text x="160" y="167" fill="#9a3412" fontSize="7" fontWeight="bold" textAnchor="middle">
        Behelyettesítés: ax² + bx + c = mx + d ⇒ Másodfokú egyenlet
      </text>
      <text x="160" y="175.5" fill="#c2410c" fontSize="7" fontWeight="black" textAnchor="middle">
        D &gt; 0: Két metszéspont (szelő) ⇒ P₁(x₁; y₁) és P₂(x₂; y₂) számpárok
      </text>
    </svg>
  );
};

// 2. Szimmetrikus rendszerek és a Viète-híd
export const SymmetricSystemVieteBridgeSvg: React.FC<FigureProps> = ({ size = 260, className = '' }) => {
  return (
    <svg
      viewBox="0 0 320 180"
      width={size}
      height={(size * 180) / 320}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`max-w-full h-auto select-none ${className}`}
    >
      <rect x="0" y="0" width="320" height="180" rx="8" fill="#f8fafc" />

      {/* Cím */}
      <text x="160" y="20" fill="#c2410c" fontSize="10" fontWeight="black" textAnchor="middle">
        SZIMMETRIKUS RENDSZEREK: A VIÈTE-HÍD
      </text>

      {/* Bal doboz: Eredeti rendszer */}
      <rect x="20" y="36" width="115" height="85" rx="6" fill="#ffffff" stroke="#ea580c" strokeWidth="1.5" />
      <text x="77" y="52" fill="#9a3412" fontSize="8" fontWeight="bold" textAnchor="middle">RENDSZER</text>
      <text x="35" y="74" fill="#ea580c" fontSize="16" fontFamily="monospace">{'{'}</text>
      <text x="48" y="72" fill="#1e293b" fontSize="8.5" fontFamily="monospace">x + y = S</text>
      <text x="48" y="90" fill="#1e293b" fontSize="8.5" fontFamily="monospace">x · y = P</text>
      <text x="77" y="112" fill="#64748b" fontSize="6.5" textAnchor="middle">x és y felcserélhető!</text>

      {/* Középső híd nyíl */}
      <path d="M 142 78 L 174 78" stroke="#f97316" strokeWidth="3" strokeLinecap="round" />
      <polygon points="178,78 171,73 171,83" fill="#f97316" />
      <text x="158" y="70" fill="#c2410c" fontSize="7" fontWeight="bold" textAnchor="middle">Viète-tétel</text>

      {/* Jobb doboz: Segédegyenlet */}
      <rect x="185" y="36" width="115" height="85" rx="6" fill="#ffffff" stroke="#ea580c" strokeWidth="1.5" />
      <text x="242" y="52" fill="#9a3412" fontSize="8" fontWeight="bold" textAnchor="middle">SEGÉDEGYENLET</text>
      <text x="242" y="76" fill="#ea580c" fontSize="9" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
        u² - Su + P = 0
      </text>
      <text x="242" y="95" fill="#1e293b" fontSize="7.5" fontFamily="monospace" textAnchor="middle">
        gyökei: u₁ és u₂
      </text>
      <text x="242" y="112" fill="#16a34a" fontSize="6.5" fontWeight="bold" textAnchor="middle">
        Megoldáspárok szimmetriája
      </text>

      {/* Alsó számpárok szalag */}
      <rect x="20" y="132" width="280" height="36" rx="5" fill="#ffedd5" stroke="#fdba74" strokeWidth="1" />
      <text x="160" y="146" fill="#7c2d12" fontSize="7.5" fontWeight="bold" textAnchor="middle">
        KÉT MEGOLDÁSPÁR ADÓDIK (SZIMMETRIA MIATT):
      </text>
      <text x="160" y="160" fill="#c2410c" fontSize="8.5" fontFamily="monospace" fontWeight="black" textAnchor="middle">
        (x₁, y₁) = (u₁, u₂)   és   (x₂, y₂) = (u₂, u₁)
      </text>
    </svg>
  );
};

// 3. Kör és egyenes metszéspontjai
export const CircleAndLineSystemSvg: React.FC<FigureProps> = ({ size = 260, className = '' }) => {
  return (
    <svg
      viewBox="0 0 320 185"
      width={size}
      height={(size * 185) / 320}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`max-w-full h-auto select-none ${className}`}
    >
      <defs>
        <filter id="clsPillGlow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#9a3412" floodOpacity="0.15" />
        </filter>
      </defs>

      <rect x="0" y="0" width="320" height="185" rx="8" fill="#fffaf5" stroke="#fed7aa" strokeWidth="1" />

      {/* Cím */}
      <text x="160" y="16" fill="#9a3412" fontSize="9.5" fontWeight="900" textAnchor="middle" letterSpacing="0.5">
        KÖR ÉS EGYENES METSZÉSE: x² + y² = r²
      </text>

      {/* Tengelyek */}
      {/* x tengely */}
      <line x1="30" y1="95" x2="292" y2="95" stroke="#94a3b8" strokeWidth="1.5" />
      <polygon points="296,95 288,92 288,98" fill="#64748b" />
      <text x="300" y="98" fill="#475569" fontSize="8.5" fontWeight="bold" fontFamily="monospace">x</text>

      {/* y tengely */}
      <line x1="160" y1="158" x2="160" y2="24" stroke="#94a3b8" strokeWidth="1.5" />
      <polygon points="160,20 157,28 163,28" fill="#64748b" />
      <text x="160" y="15" fill="#475569" fontSize="8.5" fontWeight="bold" fontFamily="monospace" textAnchor="middle">y</text>
      <text x="151" y="105" fill="#94a3b8" fontSize="7.5" fontFamily="monospace">O</text>

      {/* Kör r = 45, középpont (160, 95) */}
      <circle cx="160" cy="95" r="45" stroke="#ea580c" strokeWidth="2.5" fill="#ffedd5" fillOpacity="0.35" />
      <rect x="182" y="44" width="60" height="13" rx="3" fill="#fff7ed" stroke="#fdba74" strokeWidth="0.8" />
      <text x="212" y="53.5" fill="#c2410c" fontSize="7" fontWeight="bold" textAnchor="middle">x² + y² = r²</text>

      {/* Szelő egyenes: y - 95 = -0.75(x - 160) => (88, 149) - (232, 41) */}
      <line x1="88" y1="149" x2="232" y2="41" stroke="#0284c7" strokeWidth="2" strokeDasharray="4 3" strokeLinecap="round" />
      <rect x="226" y="32" width="56" height="13" rx="3" fill="#f0f9ff" stroke="#7dd3fc" strokeWidth="0.8" />
      <text x="254" y="41.5" fill="#0369a1" fontSize="7" fontWeight="bold" textAnchor="middle">y = mx + d</text>

      {/* Vetítések A pontból (124, 122) */}
      <line x1="124" y1="122" x2="124" y2="95" stroke="#f97316" strokeWidth="1" strokeDasharray="2 2" />
      <text x="124" y="90" fill="#c2410c" fontSize="7" fontWeight="bold" textAnchor="middle">x₁</text>
      <line x1="124" y1="122" x2="160" y2="122" stroke="#f97316" strokeWidth="1" strokeDasharray="2 2" />
      <text x="168" y="125" fill="#c2410c" fontSize="7" fontWeight="bold">y₁</text>

      {/* Vetítések B pontból (196, 68) */}
      <line x1="196" y1="68" x2="196" y2="95" stroke="#f97316" strokeWidth="1" strokeDasharray="2 2" />
      <text x="196" y="105" fill="#c2410c" fontSize="7" fontWeight="bold" textAnchor="middle">x₂</text>
      <line x1="196" y1="68" x2="160" y2="68" stroke="#f97316" strokeWidth="1" strokeDasharray="2 2" />
      <text x="152" y="71" fill="#c2410c" fontSize="7" fontWeight="bold" textAnchor="end">y₂</text>

      {/* Metszéspont A (124, 122) - pontosan a körön és egyenesen */}
      <circle cx="124" cy="122" r="6.5" fill="#ea580c" fillOpacity="0.2" />
      <circle cx="124" cy="122" r="4" fill="#ea580c" stroke="#ffffff" strokeWidth="1.5" />
      <circle cx="124" cy="122" r="1.5" fill="#ffffff" />
      <g filter="url(#clsPillGlow)">
        <rect x="76" y="120" width="44" height="14" rx="3" fill="#ffffff" stroke="#fdba74" strokeWidth="1" />
        <text x="98" y="130" fill="#9a3412" fontSize="7.5" fontWeight="900" textAnchor="middle">A(x₁; y₁)</text>
      </g>

      {/* Metszéspont B (196, 68) - pontosan a körön és egyenesen */}
      <circle cx="196" cy="68" r="6.5" fill="#ea580c" fillOpacity="0.2" />
      <circle cx="196" cy="68" r="4" fill="#ea580c" stroke="#ffffff" strokeWidth="1.5" />
      <circle cx="196" cy="68" r="1.5" fill="#ffffff" />
      <g filter="url(#clsPillGlow)">
        <rect x="202" y="60" width="44" height="14" rx="3" fill="#ffffff" stroke="#fdba74" strokeWidth="1" />
        <text x="224" y="70" fill="#9a3412" fontSize="7.5" fontWeight="900" textAnchor="middle">B(x₂; y₂)</text>
      </g>

      {/* Magyarázat alul */}
      <rect x="20" y="157" width="280" height="22" rx="4" fill="#ffedd5" stroke="#fdba74" strokeWidth="1" />
      <text x="160" y="167" fill="#9a3412" fontSize="7" fontWeight="bold" textAnchor="middle">
        Behelyettesítés: x² + (mx + d)² = r² ⇒ Másodfokú egyenlet
      </text>
      <text x="160" y="175.5" fill="#c2410c" fontSize="7" fontWeight="black" textAnchor="middle">
        D &gt; 0: Szelő (2 metszéspont) | D = 0: Érintő (1 pont) | D &lt; 0: Nincs metszéspont
      </text>
    </svg>
  );
};

// 4. Tagelimináció két másodfokú egyenletnél
export const EliminationQuadraticsSvg: React.FC<FigureProps> = ({ size = 260, className = '' }) => {
  return (
    <svg
      viewBox="0 0 320 180"
      width={size}
      height={(size * 180) / 320}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`max-w-full h-auto select-none ${className}`}
    >
      <rect x="0" y="0" width="320" height="180" rx="8" fill="#f8fafc" />

      {/* Cím */}
      <text x="160" y="20" fill="#9a3412" fontSize="10" fontWeight="black" textAnchor="middle">
        TAGELIMINÁCIÓ: A NÉGYZETES TAGOK KIEJTÉSE
      </text>

      {/* I. Egyenlet */}
      <rect x="25" y="35" width="270" height="26" rx="4" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
      <text x="35" y="51" fill="#ea580c" fontSize="8" fontWeight="bold">(I.)</text>
      <text x="65" y="52" fill="#1e293b" fontSize="8.5" fontFamily="monospace">x² + y² + 2x - 4y = 20</text>

      {/* Kivonás jel */}
      <circle cx="15" cy="74" r="8" fill="#ea580c" />
      <text x="15" y="78" fill="#ffffff" fontSize="11" fontWeight="black" textAnchor="middle">-</text>

      {/* II. Egyenlet */}
      <rect x="25" y="65" width="270" height="26" rx="4" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
      <text x="35" y="81" fill="#ea580c" fontSize="8" fontWeight="bold">(II.)</text>
      <text x="65" y="82" fill="#1e293b" fontSize="8.5" fontFamily="monospace">x² + y² - 4x + 2y = 8</text>

      {/* Vízszintes kivonásvonal */}
      <line x1="25" y1="96" x2="295" y2="96" stroke="#ea580c" strokeWidth="2" strokeDasharray="4 2" />

      {/* Különbség: Lineáris egyenlet! */}
      <rect x="25" y="102" width="270" height="34" rx="4" fill="#ffedd5" stroke="#f97316" strokeWidth="1.5" />
      <text x="35" y="118" fill="#9a3412" fontSize="8" fontWeight="bold">LINEÁRIS KAPCSOLAT:</text>
      <text x="35" y="130" fill="#c2410c" fontSize="9" fontFamily="monospace" fontWeight="black">
        6x - 6y = 12  ⇒  x - y = 2  ⇒  x = y + 2
      </text>

      {/* Következtetés */}
      <rect x="25" y="142" width="270" height="26" rx="4" fill="#f1f5f9" />
      <text x="160" y="158" fill="#334155" fontSize="7.5" fontWeight="bold" textAnchor="middle">
        A másodfokú tagok kiejtésével egyszerű behelyettesítéses rendszerré redukáltuk!
      </text>
    </svg>
  );
};

// 5. Számpárok rendezése és ellenőrzése
export const OrderedPairsVerificationSvg: React.FC<FigureProps> = ({ size = 260, className = '' }) => {
  return (
    <svg
      viewBox="0 0 320 180"
      width={size}
      height={(size * 180) / 320}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`max-w-full h-auto select-none ${className}`}
    >
      <rect x="0" y="0" width="320" height="180" rx="8" fill="#fffaf5" />

      {/* Cím */}
      <text x="160" y="20" fill="#9a3412" fontSize="10" fontWeight="black" textAnchor="middle">
        A MEGOLDÁSPÁROK ÖSSZERENDELÉSE ÉS PRÓBÁJA
      </text>

      {/* x értékek oszlopa */}
      <rect x="25" y="35" width="80" height="95" rx="5" fill="#ffffff" stroke="#fed7aa" strokeWidth="1" />
      <text x="65" y="50" fill="#ea580c" fontSize="8" fontWeight="bold" textAnchor="middle">X GYÖKÖK</text>
      <rect x="35" y="60" width="60" height="22" rx="3" fill="#ffedd5" />
      <text x="65" y="74" fill="#9a3412" fontSize="8.5" fontFamily="monospace" fontWeight="bold" textAnchor="middle">x₁ = 4</text>
      <rect x="35" y="95" width="60" height="22" rx="3" fill="#ffedd5" />
      <text x="65" y="109" fill="#9a3412" fontSize="8.5" fontFamily="monospace" fontWeight="bold" textAnchor="middle">x₂ = -1</text>

      {/* Nyilak */}
      <path d="M 108 71 L 132 71" stroke="#ea580c" strokeWidth="1.5" strokeDasharray="3 2" />
      <path d="M 108 106 L 132 106" stroke="#ea580c" strokeWidth="1.5" strokeDasharray="3 2" />

      {/* y kiszámítása a kifejezett képletből: y = 2x - 3 */}
      <rect x="135" y="35" width="160" height="95" rx="5" fill="#ffffff" stroke="#fed7aa" strokeWidth="1" />
      <text x="215" y="50" fill="#ea580c" fontSize="8" fontWeight="bold" textAnchor="middle">VISSZAHELYETTESÍTÉS (y = 2x - 3)</text>

      <rect x="145" y="60" width="140" height="22" rx="3" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
      <text x="215" y="74" fill="#1e293b" fontSize="8" fontFamily="monospace" textAnchor="middle">
        y₁ = 2(4) - 3 = <tspan fill="#16a34a" fontWeight="bold">5</tspan> ⇒ <tspan fill="#ea580c" fontWeight="bold">(4; 5)</tspan>
      </text>

      <rect x="145" y="95" width="140" height="22" rx="3" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
      <text x="215" y="109" fill="#1e293b" fontSize="8" fontFamily="monospace" textAnchor="middle">
        y₂ = 2(-1) - 3 = <tspan fill="#16a34a" fontWeight="bold">-5</tspan> ⇒ <tspan fill="#ea580c" fontWeight="bold">(-1; -5)</tspan>
      </text>

      {/* Megoldáshalmaz doboz alul */}
      <rect x="25" y="138" width="270" height="30" rx="4" fill="#ffedd5" stroke="#ea580c" strokeWidth="1.2" />
      <text x="160" y="157" fill="#7c2d12" fontSize="8" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
        M = {'{(4; 5); (-1; -5)}'}  (SOHA NEM KÜLÖN x ÉS y!)
      </text>
    </svg>
  );
};

