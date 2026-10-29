import React from 'react';

interface FigureProps {
  size?: number;
  className?: string;
}

/**
 * 1. A 30°-60°-90°-os félszabályos háromszög:
 * Szabályos háromszög fele, szellemvonallal mutatva az eredeti alakzatot.
 * Magyar derékszög-jelölés: negyedkörív ponttal.
 */
export const HalfEquilateralSvg: React.FC<FigureProps> = ({ size = 320, className = '' }) => {
  return (
    <svg
      viewBox="0 0 380 240"
      width={size}
      height={(size * 240) / 380}
      className={`select-none max-w-full h-auto ${className}`}
    >
      <rect x="5" y="5" width="370" height="230" rx="14" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />

      {/* Cím badge */}
      <rect x="20" y="14" width="340" height="24" rx="6" fill="#fef3c7" />
      <text x="190" y="30" fontSize="12" fontWeight="bold" textAnchor="middle" fill="#92400e">
        Félszabályos háromszög (30° - 60° - 90°) • Oldalarány: 1 : √3 : 2
      </text>

      <g transform="translate(40, 20)">
        {/* Szellem-háromszög (a tükörkép a szabályos háromszög teljességéhez) */}
        <polygon
          points="80,180 0,180 80,41"
          fill="rgba(245, 158, 11, 0.04)"
          stroke="#cbd5e1"
          strokeWidth="1.5"
          strokeDasharray="4 3"
        />
        <text x="35" y="196" fontSize="10" textAnchor="middle" fill="#94a3b8">tükörkép (a)</text>

        {/* Maga a 30°-60°-90°-os háromszög: C(80, 180), B(160, 180), A(80, 41) */}
        {/* Befogó a = 80 (rövid), Befogó b = 80 * sqrt(3) ≈ 139, Átfogó c = 160 */}
        <polygon points="80,180 160,180 80,41" fill="rgba(245, 158, 11, 0.12)" stroke="#d97706" strokeWidth="2.5" />

        {/* Derékszög a C(80, 180) csúcsnál: magyar szabvány (negyedkörív ponttal) */}
        <path d="M 80 164 A 16 16 0 0 1 96 180" fill="none" stroke="#b45309" strokeWidth="1.5" />
        <circle cx="86" cy="174" r="1.5" fill="#b45309" />

        {/* 60°-os szög a B(160, 180) csúcsnál */}
        <path d="M 140 180 A 20 20 0 0 1 150 162" fill="none" stroke="#2563eb" strokeWidth="1.5" />
        <text x="135" y="172" fontSize="11" fontWeight="bold" fill="#1d4ed8">60°</text>

        {/* 30°-os szög az A(80, 41) csúcsnál */}
        <path d="M 80 65 A 24 24 0 0 0 92 62" fill="none" stroke="#7c3aed" strokeWidth="1.5" />
        <text x="96" y="70" fontSize="11" fontWeight="bold" fill="#6d28d9">30°</text>

        {/* Oldalcímkék */}
        <text x="120" y="198" fontSize="12" fontWeight="bold" textAnchor="middle" fill="#b45309">
          a (rövid befogó)
        </text>
        <text x="68" y="115" fontSize="12" fontWeight="bold" textAnchor="end" fill="#b45309">
          b = a√3
        </text>
        <text x="135" y="105" fontSize="12" fontWeight="bold" fill="#7c3aed">
          c = 2a (átfogó)
        </text>
      </g>

      {/* Jobb oldali magyarázó kártya */}
      <g transform="translate(240, 55)">
        <rect x="0" y="0" width="125" height="150" rx="8" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
        <text x="62" y="20" fontSize="11" fontWeight="bold" textAnchor="middle" fill="#1e293b">Szabályok</text>
        <line x1="10" y1="26" x2="115" y2="26" stroke="#f1f5f9" strokeWidth="1" />

        <text x="12" y="45" fontSize="10" fill="#475569">• 30°-kal szemben:</text>
        <text x="22" y="60" fontSize="11" fontWeight="bold" fill="#b45309">a (fele az átfogónak)</text>

        <text x="12" y="80" fontSize="10" fill="#475569">• 60°-kal szemben:</text>
        <text x="22" y="95" fontSize="11" fontWeight="bold" fill="#b45309">a · √3 (magasság)</text>

        <text x="12" y="115" fontSize="10" fill="#475569">• Átfogó (90°-kal sz.):</text>
        <text x="22" y="130" fontSize="11" fontWeight="bold" fill="#7c3aed">c = 2a</text>
      </g>
    </svg>
  );
};

/**
 * 2. A 45°-45°-90°-os egyenlő szárú derékszögű háromszög:
 * Négyzet fele átló mentén, szellemvonallal mutatva a négyzetet.
 */
export const IsoscelesRightSvg: React.FC<FigureProps> = ({ size = 320, className = '' }) => {
  return (
    <svg
      viewBox="0 0 380 240"
      width={size}
      height={(size * 240) / 380}
      className={`select-none max-w-full h-auto ${className}`}
    >
      <rect x="5" y="5" width="370" height="230" rx="14" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />

      {/* Cím badge */}
      <rect x="20" y="14" width="340" height="24" rx="6" fill="#e0e7ff" />
      <text x="190" y="30" fontSize="12" fontWeight="bold" textAnchor="middle" fill="#3730a3">
        Egyenlő szárú derékszögű (45° - 45° - 90°) • Oldalarány: 1 : 1 : √2
      </text>

      <g transform="translate(50, 25)">
        {/* Szellem négyzet másik fele */}
        <polygon
          points="25,50 145,50 145,170"
          fill="rgba(99, 102, 241, 0.04)"
          stroke="#cbd5e1"
          strokeWidth="1.5"
          strokeDasharray="4 3"
        />
        <text x="110" y="42" fontSize="10" textAnchor="middle" fill="#94a3b8">négyzet fele</text>

        {/* Maga a 45°-45°-90°-os háromszög: C(25, 170), B(145, 170), A(25, 50) */}
        <polygon points="25,170 145,170 25,50" fill="rgba(99, 102, 241, 0.12)" stroke="#4f46e5" strokeWidth="2.5" />

        {/* Derékszög a C(25, 170) csúcsban: magyar szabvány negyedkörív ponttal */}
        <path d="M 25 154 A 16 16 0 0 1 41 170" fill="none" stroke="#4338ca" strokeWidth="1.5" />
        <circle cx="31" cy="164" r="1.5" fill="#4338ca" />

        {/* 45°-os szögek az A és B csúcsoknál */}
        <path d="M 125 170 A 20 20 0 0 1 131 156" fill="none" stroke="#059669" strokeWidth="1.5" />
        <text x="110" y="162" fontSize="11" fontWeight="bold" fill="#047857">45°</text>

        <path d="M 25 70 A 20 20 0 0 0 39 64" fill="none" stroke="#059669" strokeWidth="1.5" />
        <text x="38" y="80" fontSize="11" fontWeight="bold" fill="#047857">45°</text>

        {/* Oldalcímkék */}
        <text x="85" y="188" fontSize="12" fontWeight="bold" textAnchor="middle" fill="#4338ca">a (befogó)</text>
        <text x="15" y="115" fontSize="12" fontWeight="bold" textAnchor="end" fill="#4338ca">a (befogó)</text>
        <text x="95" y="105" fontSize="12" fontWeight="bold" fill="#7c3aed">c = a√2 (átfogó)</text>
      </g>

      {/* Jobb oldali magyarázó kártya */}
      <g transform="translate(240, 55)">
        <rect x="0" y="0" width="125" height="150" rx="8" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
        <text x="62" y="20" fontSize="11" fontWeight="bold" textAnchor="middle" fill="#1e293b">Szabályok</text>
        <line x1="10" y1="26" x2="115" y2="26" stroke="#f1f5f9" strokeWidth="1" />

        <text x="12" y="45" fontSize="10" fill="#475569">• Két befogó:</text>
        <text x="22" y="60" fontSize="11" fontWeight="bold" fill="#4338ca">egyenlő: a = b</text>

        <text x="12" y="80" fontSize="10" fill="#475569">• Átfogó (d átló):</text>
        <text x="22" y="95" fontSize="11" fontWeight="bold" fill="#7c3aed">c = a · √2</text>

        <text x="12" y="115" fontSize="10" fill="#475569">• Terület:</text>
        <text x="22" y="130" fontSize="11" fontWeight="bold" fill="#047857">T = a² / 2</text>
      </g>
    </svg>
  );
};

/**
 * 3. Két különleges háromszög összehasonlító kártyája
 */
export const SpecialTrianglesComparisonSvg: React.FC<FigureProps> = ({ size = 320, className = '' }) => {
  return (
    <svg
      viewBox="0 0 380 180"
      width={size}
      height={(size * 180) / 380}
      className={`select-none max-w-full h-auto ${className}`}
    >
      <rect x="5" y="5" width="370" height="170" rx="14" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />

      {/* Bal: 30-60-90 */}
      <g transform="translate(20, 20)">
        <rect x="0" y="0" width="160" height="140" rx="10" fill="#fffbeb" stroke="#fde68a" strokeWidth="1" />
        <text x="80" y="22" fontSize="11" fontWeight="bold" textAnchor="middle" fill="#92400e">
          30° - 60° - 90°
        </text>

        <polygon points="30,110 90,110 30,35" fill="rgba(245, 158, 11, 0.15)" stroke="#d97706" strokeWidth="2" />
        {/* Derékszög */}
        <path d="M 30 96 A 14 14 0 0 1 44 110" fill="none" stroke="#b45309" strokeWidth="1.2" />
        <circle cx="35" cy="104" r="1.2" fill="#b45309" />

        <text x="60" y="125" fontSize="10" fontWeight="bold" textAnchor="middle" fill="#b45309">1 (a)</text>
        <text x="20" y="75" fontSize="10" fontWeight="bold" textAnchor="end" fill="#b45309">√3</text>
        <text x="70" y="70" fontSize="10" fontWeight="bold" fill="#7c3aed">2</text>

        <text x="80" y="135" fontSize="9" textAnchor="middle" fill="#78350f">Arány: 1 : √3 : 2</text>
      </g>

      {/* Jobb: 45-45-90 */}
      <g transform="translate(200, 20)">
        <rect x="0" y="0" width="160" height="140" rx="10" fill="#eef2ff" stroke="#c7d2fe" strokeWidth="1" />
        <text x="80" y="22" fontSize="11" fontWeight="bold" textAnchor="middle" fill="#3730a3">
          45° - 45° - 90°
        </text>

        <polygon points="30,110 100,110 30,40" fill="rgba(99, 102, 241, 0.15)" stroke="#4f46e5" strokeWidth="2" />
        {/* Derékszög */}
        <path d="M 30 96 A 14 14 0 0 1 44 110" fill="none" stroke="#4338ca" strokeWidth="1.2" />
        <circle cx="35" cy="104" r="1.2" fill="#4338ca" />

        <text x="65" y="125" fontSize="10" fontWeight="bold" textAnchor="middle" fill="#4338ca">1 (a)</text>
        <text x="20" y="78" fontSize="10" fontWeight="bold" textAnchor="end" fill="#4338ca">1 (a)</text>
        <text x="75" y="72" fontSize="10" fontWeight="bold" fill="#7c3aed">√2</text>

        <text x="80" y="135" fontSize="9" textAnchor="middle" fill="#312e81">Arány: 1 : 1 : √2</text>
      </g>
    </svg>
  );
};

