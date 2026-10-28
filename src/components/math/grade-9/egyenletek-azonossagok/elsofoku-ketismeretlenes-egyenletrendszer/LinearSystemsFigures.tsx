import React from 'react';

interface FigureProps {
  size?: number;
  className?: string;
}

// 1. Megoldási Módszerek Összehasonlítása: Behelyettesítés vs. Egyenlő Együtthatók
export const LinearSystemComparisonSvg: React.FC<FigureProps> = ({ size = 200, className = '' }) => {
  return (
    <svg
      viewBox="0 0 380 200"
      width={size}
      height={size * 0.53}
      className={`select-none max-w-full h-auto ${className}`}
    >
      <rect x="10" y="10" width="360" height="180" rx="16" fill="#fef2f2" stroke="#fecaca" strokeWidth="2" />

      <text x="190" y="30" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#991b1b" fontFamily="system-ui, sans-serif">
        Egyenletrendszerek Két Fő Algebrai Módszere
      </text>

      {/* 1. Kártya: Behelyettesítő módszer */}
      <g transform="translate(25, 48)">
        <rect width="155" height="125" rx="10" fill="#ffffff" stroke="#f87171" strokeWidth="1.5" />
        <rect width="155" height="24" rx="10" fill="#fee2e2" />
        <text x="77" y="16" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#991b1b" fontFamily="sans-serif">
          1. Behelyettesítő Módszer
        </text>

        <text x="77" y="44" textAnchor="middle" fontSize="10" fill="#475569" fontFamily="sans-serif">
          Ha van 1-es együttható:
        </text>
        <rect x="15" y="52" width="125" height="22" rx="4" fill="#fef2f2" stroke="#fca5a5" />
        <text x="77" y="67" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#b91c1c" fontFamily="monospace">
          x = 7 - 2y
        </text>

        <text x="77" y="90" textAnchor="middle" fontSize="9" fill="#475569" fontFamily="sans-serif">
          Beírjuk a 2. egyenletbe:
        </text>
        <rect x="15" y="96" width="125" height="22" rx="4" fill="#dc2626" />
        <text x="77" y="111" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#ffffff" fontFamily="monospace">
          3·(7 - 2y) + y = 11
        </text>
      </g>

      {/* 2. Kártya: Egyenlő együtthatók módszere */}
      <g transform="translate(200, 48)">
        <rect width="155" height="125" rx="10" fill="#ffffff" stroke="#fb7185" strokeWidth="1.5" />
        <rect width="155" height="24" rx="10" fill="#ffe4e6" />
        <text x="77" y="16" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#9f1239" fontFamily="sans-serif">
          2. Egyenlő Együtthatók
        </text>

        <text x="77" y="44" textAnchor="middle" fontSize="10" fill="#475569" fontFamily="sans-serif">
          Ellentett együtthatók:
        </text>
        <rect x="15" y="52" width="125" height="32" rx="4" fill="#fff1f2" stroke="#fda4af" />
        <text x="77" y="66" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#be123c" fontFamily="monospace">
          I.  2x + 3y = 12
        </text>
        <text x="77" y="78" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#be123c" fontFamily="monospace">
          II. 4x - 3y = 6
        </text>

        <rect x="15" y="96" width="125" height="22" rx="4" fill="#e11d48" />
        <text x="77" y="111" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#ffffff" fontFamily="monospace">
          Összeadás: 6x = 18
        </text>
      </g>
    </svg>
  );
};

// 2. Grafikus Megoldás: Két Egyenes Metszéspontja
export const SystemIntersectionSvg: React.FC<FigureProps> = ({ size = 200, className = '' }) => {
  return (
    <svg
      viewBox="0 0 380 200"
      width={size}
      height={size * 0.53}
      className={`select-none max-w-full h-auto ${className}`}
    >
      <rect x="10" y="10" width="360" height="180" rx="16" fill="#fef2f2" stroke="#fecaca" strokeWidth="2" />

      <text x="190" y="28" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#991b1b" fontFamily="system-ui, sans-serif">
        Grafikus Megoldás: e₁ ∩ e₂ = M(x₀; y₀)
      </text>

      {/* Koordináta-rendszer */}
      <g transform="translate(60, 35)">
        {/* Rács */}
        <defs>
          <pattern id="sysGrid" width="25" height="25" patternUnits="userSpaceOnUse">
            <path d="M 25 0 L 0 0 0 25" fill="none" stroke="#fee2e2" strokeWidth="1" />
          </pattern>
        </defs>
        <rect x="0" y="0" width="175" height="140" fill="url(#sysGrid)" />

        {/* X és Y tengelyek */}
        <line x1="10" y1="110" x2="165" y2="110" stroke="#991b1b" strokeWidth="1.5" />
        <polyline points="160,107 165,110 160,113" fill="none" stroke="#991b1b" strokeWidth="1.5" />
        <text x="170" y="113" fontSize="10" fontWeight="bold" fill="#991b1b" fontFamily="monospace">x</text>

        <line x1="35" y1="130" x2="35" y2="10" stroke="#991b1b" strokeWidth="1.5" />
        <polyline points="32,15 35,10 38,15" fill="none" stroke="#991b1b" strokeWidth="1.5" />
        <text x="32" y="8" fontSize="10" fontWeight="bold" fill="#991b1b" fontFamily="monospace">y</text>

        {/* Tengely osztások: x = 3 (110px), y = 2 (60px) */}
        <line x1="110" y1="108" x2="110" y2="112" stroke="#991b1b" strokeWidth="1.5" />
        <text x="110" y="122" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#991b1b" fontFamily="monospace">3</text>

        <line x1="33" y1="60" x2="37" y2="60" stroke="#991b1b" strokeWidth="1.5" />
        <text x="25" y="64" textAnchor="end" fontSize="9" fontWeight="bold" fill="#991b1b" fontFamily="monospace">2</text>

        {/* 1. Egyenes: kék x + y = 5 → y = -x + 5 */}
        <line x1="35" y1="20" x2="145" y2="130" stroke="#2563eb" strokeWidth="2.5" />

        {/* 2. Egyenes: piros 2x - y = 4 → y = 2x - 4 */}
        <line x1="75" y1="130" x2="130" y2="20" stroke="#dc2626" strokeWidth="2.5" />

        {/* Metszéspont vetítése */}
        <line x1="110" y1="60" x2="110" y2="110" stroke="#b91c1c" strokeWidth="1.5" strokeDasharray="3,3" />
        <line x1="35" y1="60" x2="110" y2="60" stroke="#b91c1c" strokeWidth="1.5" strokeDasharray="3,3" />

        {/* Metszéspont karika */}
        <circle cx="110" cy="60" r="5" fill="#e11d48" stroke="#ffffff" strokeWidth="2" />
        <text x="116" y="52" fontSize="10" fontWeight="black" fill="#881337" fontFamily="sans-serif">M(3; 2)</text>
      </g>

      {/* Jobb oldali adatlap */}
      <g transform="translate(250, 48)">
        <rect width="115" height="120" rx="8" fill="#ffffff" stroke="#fecaca" strokeWidth="1" />
        <text x="57" y="18" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#7f1d1d" fontFamily="sans-serif">
          Rendszer:
        </text>
        <text x="57" y="34" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#2563eb" fontFamily="monospace">
          x + y = 5
        </text>
        <text x="57" y="48" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#dc2626" fontFamily="monospace">
          2x - y = 4
        </text>

        <path d="M 10 56 L 105 56" stroke="#fee2e2" strokeWidth="1" />

        <text x="57" y="74" textAnchor="middle" fontSize="9" fill="#475569" fontFamily="sans-serif">
          Megoldáspár:
        </text>
        <rect x="15" y="82" width="85" height="24" rx="6" fill="#dc2626" />
        <text x="57" y="98" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#ffffff" fontFamily="monospace">
          (x; y) = (3; 2)
        </text>
      </g>
    </svg>
  );
};

// 3. Behelyettesítő Módszer Folyamatábra
export const SubstitutionWorkflowSvg: React.FC<FigureProps> = ({ size = 200, className = '' }) => {
  return (
    <svg
      viewBox="0 0 380 200"
      width={size}
      height={size * 0.53}
      className={`select-none max-w-full h-auto ${className}`}
    >
      <rect x="10" y="10" width="360" height="180" rx="16" fill="#fff1f2" stroke="#fecdd3" strokeWidth="2" />

      <text x="190" y="28" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#9f1239" fontFamily="system-ui, sans-serif">
        A Behelyettesítő Módszer Ciklusa
      </text>

      {/* 4 lépés folyamat */}
      {[
        { step: '1', title: 'Kifejezés', desc: 'x = 3y + 1 (I.)', x: 25 },
        { step: '2', title: 'Behelyettesítés', desc: 'II.-be: 2(3y+1)+y=9', x: 105 },
        { step: '3', title: '1. Ismeretlen', desc: 'Megoldás: y = 1', x: 195 },
        { step: '4', title: '2. Ismeretlen', desc: 'Vissza: x = 4', x: 285 }
      ].map((item, idx) => (
        <g key={idx} transform={`translate(${item.x}, 52)`}>
          <rect width="70" height="95" rx="8" fill="#ffffff" stroke="#fb7185" strokeWidth="1.5" />
          <circle cx="35" cy="20" r="12" fill="#f43f5e" />
          <text x="35" y="24" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#ffffff" fontFamily="monospace">
            {item.step}
          </text>
          <text x="35" y="48" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#9f1239" fontFamily="sans-serif">
            {item.title}
          </text>
          <text x="35" y="70" textAnchor="middle" fontSize="8" fill="#475569" fontFamily="monospace">
            {item.desc}
          </text>
        </g>
      ))}

      <rect x="50" y="160" width="280" height="22" rx="6" fill="#ffe4e6" />
      <text x="190" y="175" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#be123c" fontFamily="monospace">
        Megoldáshalmaz: M = &#123;(4; 1)&#125; (Rendezett számpár!)
      </text>
    </svg>
  );
};

// 4. Egyenlő Együtthatók / Kiküszöbölés Módszere
export const EliminationWorkflowSvg: React.FC<FigureProps> = ({ size = 200, className = '' }) => {
  return (
    <svg
      viewBox="0 0 380 200"
      width={size}
      height={size * 0.53}
      className={`select-none max-w-full h-auto ${className}`}
    >
      <rect x="10" y="10" width="360" height="180" rx="16" fill="#fef2f2" stroke="#fecaca" strokeWidth="2" />

      <text x="190" y="28" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#991b1b" fontFamily="system-ui, sans-serif">
        Egyenlő Együtthatók: Az Ismeretlen Kiküszöbölése
      </text>

      {/* Oszlopos összeadás vizualizáció */}
      <g transform="translate(60, 48)">
        <rect width="260" height="125" rx="10" fill="#ffffff" stroke="#f87171" strokeWidth="1.5" />

        <text x="35" y="30" fontSize="13" fontWeight="bold" fill="#b91c1c" fontFamily="monospace">
          I.   3x + 2y = 19
        </text>
        <text x="210" y="30" fontSize="11" fontWeight="bold" fill="#e11d48" fontFamily="monospace">
          / ·3
        </text>

        <text x="35" y="55" fontSize="13" fontWeight="bold" fill="#b91c1c" fontFamily="monospace">
          II.  2x - 3y = 4
        </text>
        <text x="210" y="55" fontSize="11" fontWeight="bold" fill="#e11d48" fontFamily="monospace">
          / ·2
        </text>

        <line x1="20" y1="68" x2="240" y2="68" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3,3" />

        {/* Beszorzott egyenletek */}
        <text x="35" y="88" fontSize="12" fontWeight="bold" fill="#475569" fontFamily="monospace">
          9x + 6y = 57
        </text>
        <text x="35" y="106" fontSize="12" fontWeight="bold" fill="#475569" fontFamily="monospace">
          4x - 6y = 8
        </text>

        {/* Vízszintes összegző vonal */}
        <line x1="20" y1="112" x2="240" y2="112" stroke="#dc2626" strokeWidth="2" />
        <text x="200" y="106" fontSize="11" fontWeight="bold" fill="#dc2626" fontFamily="sans-serif">(+)</text>

        {/* Eredmény */}
        <text x="35" y="125" fontSize="12" fontWeight="black" fill="#15803d" fontFamily="monospace">
          13x = 65 → x = 5
        </text>
      </g>
    </svg>
  );
};

