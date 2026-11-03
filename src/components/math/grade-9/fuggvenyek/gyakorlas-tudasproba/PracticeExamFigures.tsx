import React from 'react';

interface FigureProps {
  size?: number;
  className?: string;
}

/**
 * Fejezeti szintézis térkép: Az V. Függvények fejezet fő pillérei
 */
export const ChapterMapSvg: React.FC<FigureProps> = ({ size = 280, className = '' }) => {
  return (
    <svg
      viewBox="0 0 320 180"
      width={size}
      height={size * (180 / 320)}
      className={`select-none ${className}`}
    >
      <rect width="320" height="180" fill="#0f172a" rx="8" />

      {/* Cím */}
      <text x="160" y="24" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle">
        V. Függvények: Fejezeti Szintézis
      </text>

      {/* 4 fő kategória doboz */}
      {/* 1. Lineáris */}
      <rect x="20" y="42" width="130" height="52" rx="6" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
      <text x="85" y="60" fill="#7dd3fc" fontSize="11" fontWeight="bold" textAnchor="middle">1. Lineáris</text>
      <text x="85" y="76" fill="#94a3b8" fontSize="9.5" textAnchor="middle">f(x) = mx + b</text>
      <text x="85" y="88" fill="#64748b" fontSize="8.5" textAnchor="middle">egyenes, meredekség</text>

      {/* 2. Abszolútérték */}
      <rect x="170" y="42" width="130" height="52" rx="6" fill="#1e293b" stroke="#f43f5e" strokeWidth="1.5" />
      <text x="235" y="60" fill="#fda4af" fontSize="11" fontWeight="bold" textAnchor="middle">2. Abszolútérték</text>
      <text x="235" y="76" fill="#f43f5e" fontSize="9.5" textAnchor="middle">f(x) = a|x - u| + v</text>
      <text x="235" y="88" fill="#64748b" fontSize="8.5" textAnchor="middle">V-alak, távolság</text>

      {/* 3. Másodfokú & Gyök */}
      <rect x="20" y="106" width="130" height="54" rx="6" fill="#1e293b" stroke="#a855f7" strokeWidth="1.5" />
      <text x="85" y="124" fill="#d8b4fe" fontSize="11" fontWeight="bold" textAnchor="middle">3. Másodfokú & Gyök</text>
      <text x="85" y="140" fill="#c084fc" fontSize="9.5" textAnchor="middle">a(x-u)² + v &nbsp;|&nbsp; √x</text>
      <text x="85" y="152" fill="#64748b" fontSize="8.5" textAnchor="middle">parabola, csúcspont</text>

      {/* 4. Egyenletek & Egyenlőtlenségek */}
      <rect x="170" y="106" width="130" height="54" rx="6" fill="#1e293b" stroke="#10b981" strokeWidth="1.5" />
      <text x="235" y="124" fill="#6ee7b7" fontSize="11" fontWeight="bold" textAnchor="middle">4. Grafikus Megoldás</text>
      <text x="235" y="140" fill="#34d399" fontSize="9.5" textAnchor="middle">f(x) = g(x) &nbsp;|&nbsp; f(x) ≥ g(x)</text>
      <text x="235" y="152" fill="#64748b" fontSize="8.5" textAnchor="middle">metszéspontok, sávok</text>

      {/* Központi összekötő kereszt */}
      <line x1="150" y1="68" x2="170" y2="68" stroke="#475569" strokeWidth="1" strokeDasharray="2 2" />
      <line x1="150" y1="133" x2="170" y2="133" stroke="#475569" strokeWidth="1" strokeDasharray="2 2" />
      <line x1="85" y1="94" x2="85" y2="106" stroke="#475569" strokeWidth="1" strokeDasharray="2 2" />
      <line x1="235" y1="94" x2="235" y2="106" stroke="#475569" strokeWidth="1" strokeDasharray="2 2" />
    </svg>
  );
};

/**
 * 7 Lépéses Függvényjellemzés Áttekintő Svg
 */
export const ComprehensiveAnalysisSvg: React.FC<FigureProps> = ({ size = 280, className = '' }) => {
  return (
    <svg
      viewBox="0 0 320 180"
      width={size}
      height={size * (180 / 320)}
      className={`select-none ${className}`}
    >
      <rect width="320" height="180" fill="#0f172a" rx="8" />

      {/* Cím */}
      <text x="160" y="24" fill="#fbbf24" fontSize="13" fontWeight="bold" textAnchor="middle">
        A 7 Lépéses Függvényjellemzés
      </text>

      {/* Koordináta-rendszer mini ábra bal oldalon */}
      <g transform="translate(15, 38)">
        <rect width="115" height="125" fill="#090d16" rx="6" stroke="#334155" strokeWidth="1" />
        {/* Rács & Tengelyek */}
        <line x1="10" y1="80" x2="105" y2="80" stroke="#475569" strokeWidth="1.2" />
        <line x1="55" y1="10" x2="55" y2="115" stroke="#475569" strokeWidth="1.2" />
        {/* Parabola: f(x) = (x-1)^2 - 2 -> csúcs: (70, 95) */}
        <path
          d="M 25 25 Q 70 120, 100 35"
          fill="none"
          stroke="#38bdf8"
          strokeWidth="2.5"
        />
        {/* Csúcspont */}
        <circle cx="68" cy="100" r="4" fill="#f59e0b" />
        <text x="70" y="115" fill="#fbbf24" fontSize="9" fontWeight="bold" textAnchor="middle">Min(u; v)</text>
        {/* Zérushelyek */}
        <circle cx="44" cy="80" r="3" fill="#10b981" />
        <circle cx="92" cy="80" r="3" fill="#10b981" />
        <text x="44" y="74" fill="#34d399" fontSize="8" textAnchor="middle">x₁</text>
        <text x="92" y="74" fill="#34d399" fontSize="8" textAnchor="middle">x₂</text>
      </g>

      {/* 7 pont felsorolása jobb oldalon */}
      <g transform="translate(145, 36)" fontSize="9.5" fill="#cbd5e1">
        <text y="14"><tspan fill="#38bdf8" fontWeight="bold">1. ÉT (Df):</tspan> Hol értelmezett?</text>
        <text y="30"><tspan fill="#38bdf8" fontWeight="bold">2. ÉK (Rf):</tspan> Milyen y-okat vesz fel?</text>
        <text y="46"><tspan fill="#34d399" fontWeight="bold">3. Zérushely:</tspan> f(x) = 0 (tengelymetszet)</text>
        <text y="62"><tspan fill="#fbbf24" fontWeight="bold">4. Menet:</tspan> Monoton nő ↗ / csökken ↘</text>
        <text y="78"><tspan fill="#f59e0b" fontWeight="bold">5. Szélsőérték:</tspan> Min / Max hely & érték</text>
        <text y="94"><tspan fill="#c084fc" fontWeight="bold">6. Paritás:</tspan> Páros (tengelyes) / Páratlan</text>
        <text y="110"><tspan fill="#f43f5e" fontWeight="bold">7. Korlátosság:</tspan> Alulról / Felülről korlátos</text>
      </g>
    </svg>
  );
};

/**
 * Grafikus és Algebrai Megoldás összehasonlító SVG
 */
export const DualMethodComparisonSvg: React.FC<FigureProps> = ({ size = 280, className = '' }) => {
  return (
    <svg
      viewBox="0 0 320 180"
      width={size}
      height={size * (180 / 320)}
      className={`select-none ${className}`}
    >
      <rect width="320" height="180" fill="#0f172a" rx="8" />

      {/* Cím */}
      <text x="160" y="24" fill="#10b981" fontSize="13" fontWeight="bold" textAnchor="middle">
        f(x) = g(x) Megoldása Két Úton
      </text>

      {/* Bal oldal: Grafikus út */}
      <rect x="15" y="38" width="140" height="126" rx="6" fill="#1e293b" stroke="#38bdf8" strokeWidth="1" />
      <text x="85" y="56" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">Grafikus Megoldás</text>
      
      {/* Mini rajz */}
      <line x1="30" y1="110" x2="140" y2="110" stroke="#475569" strokeWidth="1" />
      <line x1="85" y1="70" x2="85" y2="150" stroke="#475569" strokeWidth="1" />
      {/* V alak f(x) */}
      <path d="M 40 80 L 85 130 L 130 80" fill="none" stroke="#f43f5e" strokeWidth="1.8" />
      {/* Vízszintes g(x) */}
      <line x1="35" y1="95" x2="135" y2="95" stroke="#38bdf8" strokeWidth="1.8" />
      {/* Metszéspontok */}
      <circle cx="53" cy="95" r="3.5" fill="#10b981" />
      <circle cx="117" cy="95" r="3.5" fill="#10b981" />
      <text x="85" y="154" fill="#94a3b8" fontSize="8.5" textAnchor="middle">Metszéspontok x koordinátái</text>

      {/* Jobb oldal: Algebrai út */}
      <rect x="165" y="38" width="140" height="126" rx="6" fill="#1e293b" stroke="#a855f7" strokeWidth="1" />
      <text x="235" y="56" fill="#c084fc" fontSize="11" fontWeight="bold" textAnchor="middle">Algebrai Számítás</text>

      <g transform="translate(175, 72)" fontSize="9" fill="#e2e8f0" space="preserve">
        <text y="10" fill="#f43f5e">|x - 2| = 3</text>
        <text y="26" fill="#94a3b8">Bontás két ágra:</text>
        <text y="42" fill="#38bdf8">x - 2 = 3 &nbsp;⟹&nbsp; x₁ = 5</text>
        <text y="58" fill="#38bdf8">x - 2 = -3 ⟹&nbsp; x₂ = -1</text>
        <text y="74" fill="#10b981" fontWeight="bold">Ellenőrzés behelyettesítéssel!</text>
      </g>
    </svg>
  );
};

