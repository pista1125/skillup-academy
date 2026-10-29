import React from 'react';

interface FigureProps {
  size?: number;
  className?: string;
}

/**
 * 1. Pitagorasz-tétel geometriai illusztrációja:
 * Derékszögű háromszög az a, b befogókra és a c átfogóra emelt négyzetekkel.
 * Magyar szabvány: negyedkörív ponttal a derékszögnél!
 */
export const PythagorasTheoremSvg: React.FC<FigureProps> = ({ size = 320, className = '' }) => {
  return (
    <svg
      viewBox="0 0 380 320"
      width={size}
      height={(size * 320) / 380}
      className={`select-none max-w-full h-auto ${className}`}
    >
      {/* Háttérkártya */}
      <rect x="5" y="5" width="370" height="310" rx="14" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />

      {/* Cím / Fejléc badge */}
      <rect x="20" y="16" width="340" height="26" rx="6" fill="#e0e7ff" />
      <text x="190" y="33" fontSize="12" fontWeight="bold" textAnchor="middle" fill="#3730a3">
        a² + b² = c² (Négyzetek területeinek összege)
      </text>

      {/* Derékszögű háromszög:
          Csúcsok: C(130, 190) derékszögű csúcs, A(130, 115) felső csúcs (b befogó hossza: 75), B(230, 190) jobb csúcs (a befogó hossza: 100)
          Átfogó c = sqrt(75^2 + 100^2) = 125
      */}
      <g>
        {/* b oldalra emelt négyzet (balra: 75x75) */}
        <rect x="55" y="115" width="75" height="75" fill="rgba(59, 130, 246, 0.15)" stroke="#3b82f6" strokeWidth="1.5" />
        <text x="92" y="148" fontSize="12" fontWeight="bold" textAnchor="middle" fill="#1d4ed8">b²</text>
        <text x="92" y="164" fontSize="10" textAnchor="middle" fill="#60a5fa">b × b</text>

        {/* a oldalra emelt négyzet (lefelé: 100x100) */}
        <rect x="130" y="190" width="100" height="100" fill="rgba(16, 185, 129, 0.15)" stroke="#10b981" strokeWidth="1.5" />
        <text x="180" y="235" fontSize="12" fontWeight="bold" textAnchor="middle" fill="#047857">a²</text>
        <text x="180" y="253" fontSize="10" textAnchor="middle" fill="#34d399">a × a</text>

        {/* c oldalra emelt négyzet (átfogóra kifelé, elforgatva)
            A(130, 115)-től B(230, 190)-ig vektor: (100, 75).
            Merőleges kifelé: (75, -100).
            Pontok: (130,115) -> (230,190) -> (305,90) -> (205,15)
        */}
        <polygon
          points="130,115 230,190 305,90 205,15"
          fill="rgba(168, 85, 247, 0.15)"
          stroke="#a855f7"
          strokeWidth="1.5"
        />
        <text x="217" y="105" fontSize="14" fontWeight="bold" textAnchor="middle" fill="#7e22ce">c²</text>
        <text x="217" y="122" fontSize="10" textAnchor="middle" fill="#a855f7">a² + b²</text>

        {/* Maga a derékszögű háromszög */}
        <polygon points="130,190 130,115 230,190" fill="#ffffff" stroke="#1e293b" strokeWidth="2.5" />

        {/* Derékszög jelölése magyar konvencióval (negyedkörív ponttal a C(130,190) csúcsban) */}
        <path d="M 130 174 A 16 16 0 0 1 146 190" fill="none" stroke="#ef4444" strokeWidth="1.5" />
        <circle cx="136" cy="184" r="1.5" fill="#ef4444" />

        {/* Oldalcímkék */}
        <text x="116" y="156" fontSize="11" fontWeight="bold" textAnchor="end" fill="#1e40af">b (befogó)</text>
        <text x="180" y="206" fontSize="11" fontWeight="bold" textAnchor="middle" fill="#065f46">a (befogó)</text>
        <text x="190" y="145" fontSize="11" fontWeight="bold" textAnchor="middle" fill="#6b21a8" transform="rotate(36.87, 190, 145)">c (átfogó)</text>
      </g>
    </svg>
  );
};

/**
 * 2. Pitagoraszi számhármasok szemléltetése:
 * (3, 4, 5) és (5, 12, 13)
 */
export const PythagoreanTriplesSvg: React.FC<FigureProps> = ({ size = 320, className = '' }) => {
  return (
    <svg
      viewBox="0 0 380 200"
      width={size}
      height={(size * 200) / 380}
      className={`select-none max-w-full h-auto ${className}`}
    >
      <rect x="5" y="5" width="370" height="190" rx="14" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />

      {/* Bal oldal: (3, 4, 5) alap háromszög */}
      <g transform="translate(15, 15)">
        <rect x="0" y="0" width="165" height="160" rx="10" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
        <text x="82" y="24" fontSize="11" fontWeight="bold" textAnchor="middle" fill="#1e293b">
          A (3, 4, 5) számhármas
        </text>

        {/* Háromszög: A(30, 50), C(30, 120), B(120, 120) */}
        <polygon points="30,120 30,55 120,120" fill="rgba(16, 185, 129, 0.1)" stroke="#059669" strokeWidth="2" />
        {/* Derékszög negyedkörív + pont */}
        <path d="M 30 106 A 14 14 0 0 1 44 120" fill="none" stroke="#059669" strokeWidth="1.5" />
        <circle cx="36" cy="114" r="1.3" fill="#059669" />

        <text x="20" y="90" fontSize="11" fontWeight="bold" fill="#047857">b = 3</text>
        <text x="75" y="136" fontSize="11" fontWeight="bold" textAnchor="middle" fill="#047857">a = 4</text>
        <text x="85" y="82" fontSize="11" fontWeight="bold" fill="#7c3aed">c = 5</text>

        <text x="82" y="152" fontSize="10" textAnchor="middle" fill="#64748b">
          3² + 4² = 9 + 16 = 25 = 5²
        </text>
      </g>

      {/* Jobb oldal: (5, 12, 13) számhármas */}
      <g transform="translate(195, 15)">
        <rect x="0" y="0" width="170" height="160" rx="10" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
        <text x="85" y="24" fontSize="11" fontWeight="bold" textAnchor="middle" fill="#1e293b">
          Az (5, 12, 13) számhármas
        </text>

        {/* Háromszög: C(30, 120), A(30, 75), B(145, 120) */}
        <polygon points="30,120 30,75 145,120" fill="rgba(59, 130, 246, 0.1)" stroke="#2563eb" strokeWidth="2" />
        {/* Derékszög negyedkörív + pont */}
        <path d="M 30 106 A 14 14 0 0 1 44 120" fill="none" stroke="#2563eb" strokeWidth="1.5" />
        <circle cx="36" cy="114" r="1.3" fill="#2563eb" />

        <text x="20" y="100" fontSize="10" fontWeight="bold" fill="#1d4ed8">b = 5</text>
        <text x="85" y="136" fontSize="10" fontWeight="bold" textAnchor="middle" fill="#1d4ed8">a = 12</text>
        <text x="95" y="90" fontSize="10" fontWeight="bold" fill="#7c3aed">c = 13</text>

        <text x="85" y="152" fontSize="10" textAnchor="middle" fill="#64748b">
          5² + 12² = 25 + 144 = 169 = 13²
        </text>
      </g>
    </svg>
  );
};

/**
 * 3. A Pitagorasz-tétel megfordítása:
 * Szögfajta eldöntése az oldalak négyzete alapján:
 * a² + b² > c² => hegyesszögű
 * a² + b² = c² => derékszögű
 * a² + b² < c² => tompaszögű
 */
export const ConversePythagorasSvg: React.FC<FigureProps> = ({ size = 320, className = '' }) => {
  return (
    <svg
      viewBox="0 0 380 180"
      width={size}
      height={(size * 180) / 380}
      className={`select-none max-w-full h-auto ${className}`}
    >
      <rect x="5" y="5" width="370" height="170" rx="14" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />

      {/* 1. Hegyesszögű: a² + b² > c² */}
      <g transform="translate(20, 20)">
        <polygon points="50,20 15,90 95,90" fill="rgba(59, 130, 246, 0.1)" stroke="#3b82f6" strokeWidth="2" />
        <text x="55" y="110" fontSize="11" fontWeight="bold" textAnchor="middle" fill="#1d4ed8">Hegyesszögű</text>
        <text x="55" y="126" fontSize="10" textAnchor="middle" fill="#64748b">a² + b² &gt; c²</text>
        <text x="55" y="140" fontSize="9" textAnchor="middle" fill="#94a3b8">(pl. 4, 5, 6)</text>
      </g>

      {/* 2. Derékszögű: a² + b² = c² */}
      <g transform="translate(145, 20)">
        <polygon points="20,20 20,90 85,90" fill="rgba(16, 185, 129, 0.12)" stroke="#10b981" strokeWidth="2" />
        {/* Derékszög negyedkörív + pont */}
        <path d="M 20 76 A 14 14 0 0 1 34 90" fill="none" stroke="#10b981" strokeWidth="1.5" />
        <circle cx="26" cy="84" r="1.3" fill="#10b981" />
        <text x="50" y="110" fontSize="11" fontWeight="bold" textAnchor="middle" fill="#047857">Derékszögű</text>
        <text x="50" y="126" fontSize="10" textAnchor="middle" fill="#64748b">a² + b² = c²</text>
        <text x="50" y="140" fontSize="9" textAnchor="middle" fill="#94a3b8">(pl. 6, 8, 10)</text>
      </g>

      {/* 3. Tompaszögű: a² + b² < c² */}
      <g transform="translate(265, 20)">
        <polygon points="10,40 30,90 100,90" fill="rgba(245, 158, 11, 0.12)" stroke="#f59e0b" strokeWidth="2" />
        <text x="55" y="110" fontSize="11" fontWeight="bold" textAnchor="middle" fill="#b45309">Tompaszögű</text>
        <text x="55" y="126" fontSize="10" textAnchor="middle" fill="#64748b">a² + b² &lt; c²</text>
        <text x="55" y="140" fontSize="9" textAnchor="middle" fill="#94a3b8">(pl. 3, 5, 7)</text>
      </g>
    </svg>
  );
};

/**
 * 4. Geometriai alkalmazások:
 * Téglalap átlója és egyenlő szárú háromszög magassága
 */
export const GeometricApplicationSvg: React.FC<FigureProps> = ({ size = 320, className = '' }) => {
  return (
    <svg
      viewBox="0 0 380 190"
      width={size}
      height={(size * 190) / 380}
      className={`select-none max-w-full h-auto ${className}`}
    >
      <rect x="5" y="5" width="370" height="180" rx="14" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />

      {/* Bal oldal: Téglalap átlója */}
      <g transform="translate(20, 20)">
        <rect x="10" y="20" width="130" height="85" fill="none" stroke="#64748b" strokeWidth="1.5" />
        {/* Átló */}
        <line x1="10" y1="105" x2="140" y2="20" stroke="#8b5cf6" strokeWidth="2" strokeDasharray="5 3" />
        {/* Derékszög jobb lent */}
        <path d="M 125 105 A 12 12 0 0 1 140 93" fill="none" stroke="#64748b" strokeWidth="1.2" />
        <circle cx="134" cy="99" r="1.2" fill="#64748b" />

        <text x="75" y="122" fontSize="11" fontWeight="bold" textAnchor="middle" fill="#1e293b">a</text>
        <text x="152" y="65" fontSize="11" fontWeight="bold" fill="#1e293b">b</text>
        <text x="75" y="55" fontSize="11" fontWeight="bold" fill="#7c3aed">d = √(a² + b²)</text>
        <text x="75" y="142" fontSize="10" textAnchor="middle" fill="#64748b">Téglalap átlója</text>
      </g>

      <line x1="190" y1="20" x2="190" y2="170" stroke="#e2e8f0" strokeWidth="1.5" />

      {/* Jobb oldal: Egyenlő szárú háromszög magassága */}
      <g transform="translate(210, 20)">
        <polygon points="80,15 15,105 145,105" fill="rgba(244, 63, 94, 0.08)" stroke="#f43f5e" strokeWidth="1.5" />
        {/* Magasságvonal */}
        <line x1="80" y1="15" x2="80" y2="105" stroke="#e11d48" strokeWidth="2" strokeDasharray="4 3" />
        {/* Talpponti derékszög */}
        <path d="M 80 93 A 12 12 0 0 1 92 105" fill="none" stroke="#e11d48" strokeWidth="1.2" />
        <circle cx="85" cy="99" r="1.2" fill="#e11d48" />

        <text x="40" y="55" fontSize="11" fontWeight="bold" fill="#be123c">b (szár)</text>
        <text x="86" y="65" fontSize="10" fontWeight="bold" fill="#e11d48">m = √(b² - (a/2)²)</text>
        <text x="45" y="118" fontSize="10" fontWeight="bold" fill="#64748b">a/2</text>
        <text x="110" y="118" fontSize="10" fontWeight="bold" fill="#64748b">a/2</text>
        <text x="80" y="142" fontSize="10" textAnchor="middle" fill="#64748b">Szimmetrikus háromszög</text>
      </g>
    </svg>
  );
};
