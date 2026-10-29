import React from 'react';

interface FigureProps {
  size?: number;
  className?: string;
}

/**
 * 1. Pont és egyenes távolsága:
 * P pont, e egyenes, T talppont (merőleges magyar jelöléssel: negyedkörív ponttal).
 * Ferde szakasz PQ, szemléltetve, hogy |PT| < |PQ| (a merőleges a legrövidebb távolság).
 */
export const PointLineDistanceSvg: React.FC<FigureProps> = ({ size = 320, className = '' }) => {
  return (
    <svg
      viewBox="0 0 380 230"
      width={size}
      height={(size * 230) / 380}
      className={`select-none max-w-full h-auto ${className}`}
    >
      <rect x="5" y="5" width="370" height="220" rx="14" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />

      {/* Cím badge */}
      <rect x="20" y="14" width="340" height="24" rx="6" fill="#e0f2fe" />
      <text x="190" y="30" fontSize="12" fontWeight="bold" textAnchor="middle" fill="#0369a1">
        Pont és egyenes távolsága • A merőleges a legrövidebb út
      </text>

      <g transform="translate(20, 20)">
        {/* Egyenes e */}
        <line x1="20" y1="160" x2="320" y2="160" stroke="#0284c7" strokeWidth="2.5" />
        <text x="330" y="164" fontSize="14" fontWeight="bold" fill="#0284c7">e</text>

        {/* P pont */}
        <circle cx="160" cy="50" r="4.5" fill="#e11d48" />
        <text x="160" y="40" fontSize="13" fontWeight="bold" textAnchor="middle" fill="#e11d48">P</text>

        {/* Merőleges szakasz PT (d távolság) */}
        <line x1="160" y1="50" x2="160" y2="160" stroke="#059669" strokeWidth="2.5" />
        <circle cx="160" cy="160" r="3.5" fill="#059669" />
        <text x="160" y="178" fontSize="12" fontWeight="bold" textAnchor="middle" fill="#059669">T (talppont)</text>

        {/* Magyar derékszög-jelölés a talppontban: negyedkörív ponttal */}
        <path d="M 160 144 A 16 16 0 0 1 176 160" fill="none" stroke="#059669" strokeWidth="1.5" />
        <circle cx="166" cy="154" r="1.5" fill="#059669" />

        <text x="145" y="105" fontSize="12" fontWeight="bold" fill="#047857">d = |PT|</text>

        {/* Ferde szakasz PQ */}
        <line x1="160" y1="50" x2="260" y2="160" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4 3" />
        <circle cx="260" cy="160" r="3" fill="#64748b" />
        <text x="260" y="178" fontSize="11" textAnchor="middle" fill="#64748b">Q (tetszőleges)</text>
        <text x="220" y="95" fontSize="10" fill="#64748b">|PQ| &gt; d</text>
      </g>
    </svg>
  );
};

/**
 * 2. Két párhuzamos egyenes távolsága és a középpárhuzamos:
 */
export const ParallelDistanceSvg: React.FC<FigureProps> = ({ size = 320, className = '' }) => {
  return (
    <svg
      viewBox="0 0 380 210"
      width={size}
      height={(size * 210) / 380}
      className={`select-none max-w-full h-auto ${className}`}
    >
      <rect x="5" y="5" width="370" height="200" rx="14" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />

      {/* Cím badge */}
      <rect x="20" y="14" width="340" height="24" rx="6" fill="#ecfeff" />
      <text x="190" y="30" fontSize="12" fontWeight="bold" textAnchor="middle" fill="#0e7490">
        Párhuzamos egyenesek távolsága és a középpárhuzamos
      </text>

      <g transform="translate(20, 20)">
        {/* Egyenes e */}
        <line x1="20" y1="50" x2="320" y2="50" stroke="#0284c7" strokeWidth="2.5" />
        <text x="328" y="54" fontSize="13" fontWeight="bold" fill="#0284c7">e</text>

        {/* Középpárhuzamos k */}
        <line x1="20" y1="105" x2="320" y2="105" stroke="#10b981" strokeWidth="2" strokeDasharray="5 3" />
        <text x="328" y="109" fontSize="12" fontWeight="bold" fill="#10b981">k (közép)</text>

        {/* Egyenes f */}
        <line x1="20" y1="160" x2="320" y2="160" stroke="#0284c7" strokeWidth="2.5" />
        <text x="328" y="164" fontSize="13" fontWeight="bold" fill="#0284c7">f (e ∥ f)</text>

        {/* Merőleges szakasz 1: bal oldalt */}
        <line x1="90" y1="50" x2="90" y2="160" stroke="#f59e0b" strokeWidth="2" />
        {/* Derékszög fenn */}
        <path d="M 90 64 A 14 14 0 0 0 104 50" fill="none" stroke="#f59e0b" strokeWidth="1.2" />
        <circle cx="95" cy="56" r="1.2" fill="#f59e0b" />
        {/* Derékszög lenn */}
        <path d="M 90 146 A 14 14 0 0 1 104 160" fill="none" stroke="#f59e0b" strokeWidth="1.2" />
        <circle cx="95" cy="154" r="1.2" fill="#f59e0b" />
        <text x="75" y="110" fontSize="11" fontWeight="bold" fill="#d97706">d</text>

        {/* Merőleges szakasz 2: jobb oldalt (állandó távolság) */}
        <line x1="230" y1="50" x2="230" y2="160" stroke="#f59e0b" strokeWidth="2" />
        {/* Derékszög */}
        <path d="M 230 64 A 14 14 0 0 0 244 50" fill="none" stroke="#f59e0b" strokeWidth="1.2" />
        <circle cx="235" cy="56" r="1.2" fill="#f59e0b" />
        <text x="245" y="110" fontSize="11" fontWeight="bold" fill="#d97706">d (állandó)</text>

        {/* d/2 távolságok jelölése a középpárhuzamosnál */}
        <text x="160" y="82" fontSize="10" fill="#059669">d / 2</text>
        <text x="160" y="138" fontSize="10" fill="#059669">d / 2</text>
      </g>
    </svg>
  );
};

/**
 * 3. Alapvető mértani helyek távolságok alapján (4 ábra 1 kártyán):
 * 1. Ponttól r távolság (kör)
 * 2. Két ponttól egyenlő távolság (szakaszfelező merőleges)
 * 3. Két metsző egyenestől egyenlő távolság (szögfelezők)
 * 4. Egyenestől d távolság (párhuzamos egyenespár)
 */
export const LociSvg: React.FC<FigureProps> = ({ size = 320, className = '' }) => {
  return (
    <svg
      viewBox="0 0 380 260"
      width={size}
      height={(size * 260) / 380}
      className={`select-none max-w-full h-auto ${className}`}
    >
      <rect x="5" y="5" width="370" height="250" rx="14" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />

      {/* 1. Kör: ponttól r távolság */}
      <g transform="translate(15, 15)">
        <rect x="0" y="0" width="165" height="110" rx="8" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
        <text x="82" y="18" fontSize="10" fontWeight="bold" textAnchor="middle" fill="#0284c7">
          1. Ponttól r távolság: Kör
        </text>
        <circle cx="82" cy="62" r="32" fill="rgba(2, 132, 199, 0.08)" stroke="#0284c7" strokeWidth="1.8" />
        <circle cx="82" cy="62" r="2.5" fill="#0284c7" />
        <line x1="82" y1="62" x2="114" y2="62" stroke="#e11d48" strokeWidth="1.5" />
        <text x="98" y="56" fontSize="10" fontWeight="bold" fill="#e11d48">r</text>
        <text x="82" y="102" fontSize="9" textAnchor="middle" fill="#64748b">k(O, r) körvonal</text>
      </g>

      {/* 2. Szakaszfelező merőleges: két ponttól egyenlő távolság */}
      <g transform="translate(195, 15)">
        <rect x="0" y="0" width="170" height="110" rx="8" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
        <text x="85" y="18" fontSize="10" fontWeight="bold" textAnchor="middle" fill="#059669">
          2. Két ponttól egyenlő: Szakaszfelező
        </text>
        <line x1="30" y1="65" x2="140" y2="65" stroke="#94a3b8" strokeWidth="1.5" />
        <circle cx="30" cy="65" r="2.5" fill="#1e293b" />
        <text x="25" y="60" fontSize="9" fontWeight="bold" fill="#1e293b">A</text>
        <circle cx="140" cy="65" r="2.5" fill="#1e293b" />
        <text x="145" y="60" fontSize="9" fontWeight="bold" fill="#1e293b">B</text>

        {/* Felezőmerőleges f */}
        <line x1="85" y1="26" x2="85" y2="98" stroke="#059669" strokeWidth="2" />
        {/* Derékszög */}
        <path d="M 85 55 A 10 10 0 0 1 95 65" fill="none" stroke="#059669" strokeWidth="1.2" />
        <circle cx="89" cy="60" r="1" fill="#059669" />
        <text x="96" y="42" fontSize="10" fontWeight="bold" fill="#059669">f_AB</text>
        <text x="85" y="104" fontSize="9" textAnchor="middle" fill="#64748b">|PA| = |PB|</text>
      </g>

      {/* 3. Szögfelező: két metsző egyenestől egyenlő távolság */}
      <g transform="translate(15, 135)">
        <rect x="0" y="0" width="165" height="110" rx="8" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
        <text x="82" y="18" fontSize="10" fontWeight="bold" textAnchor="middle" fill="#7c3aed">
          3. Két egyenestől egyenlő: Szögfelező
        </text>
        {/* Két metsző egyenes */}
        <line x1="20" y1="85" x2="145" y2="45" stroke="#94a3b8" strokeWidth="1.5" />
        <line x1="20" y1="45" x2="145" y2="85" stroke="#94a3b8" strokeWidth="1.5" />
        {/* Szögfelező egyenes */}
        <line x1="20" y1="65" x2="145" y2="65" stroke="#7c3aed" strokeWidth="2" strokeDasharray="4 2" />
        <text x="150" y="68" fontSize="9" fontWeight="bold" fill="#7c3aed">w</text>
        <text x="82" y="102" fontSize="9" textAnchor="middle" fill="#64748b">d(P, e) = d(P, f)</text>
      </g>

      {/* 4. Egyenestől d távolságra: párhuzamos egyenespár */}
      <g transform="translate(195, 135)">
        <rect x="0" y="0" width="170" height="110" rx="8" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
        <text x="85" y="18" fontSize="10" fontWeight="bold" textAnchor="middle" fill="#d97706">
          4. Egyenestől d távolság: Párhuzamosok
        </text>
        <line x1="20" y1="65" x2="145" y2="65" stroke="#1e293b" strokeWidth="2" />
        <text x="150" y="68" fontSize="9" fontWeight="bold" fill="#1e293b">e</text>

        {/* Két párhuzamos egyenes d távolságra */}
        <line x1="20" y1="40" x2="145" y2="40" stroke="#d97706" strokeWidth="1.5" strokeDasharray="3 3" />
        <line x1="20" y1="90" x2="145" y2="90" stroke="#d97706" strokeWidth="1.5" strokeDasharray="3 3" />
        <text x="85" y="34" fontSize="8" fill="#d97706">+d távolság</text>
        <text x="85" y="102" fontSize="8" fill="#d97706">-d távolság</text>
      </g>
    </svg>
  );
};
