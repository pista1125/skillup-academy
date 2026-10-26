import React from 'react';

export interface FigureProps {
  size?: number;
  className?: string;
}

/**
 * 1. A Normálalak Felépítése és Matematikai Definíciója
 * a · 10^k, ahol 1 ≤ |a| < 10 és k ∈ ℤ
 */
export const ScientificNotationStructureSvg: React.FC<FigureProps> = ({
  size,
  className = ''
}) => {
  return (
    <div className={`flex flex-col items-center justify-center w-full ${className}`}>
      <svg
        viewBox="0 0 540 250"
        style={size ? { width: size, height: (size * 250) / 540 } : { width: '100%', maxWidth: 540, height: 'auto' }}
        className="overflow-visible select-none drop-shadow-xs w-full"
      >
        <defs>
          <linearGradient id="snMantissaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#059669" />
            <stop offset="100%" stopColor="#047857" />
          </linearGradient>
          <linearGradient id="snExpGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2563eb" />
            <stop offset="100%" stopColor="#1d4ed8" />
          </linearGradient>
        </defs>

        <rect x="15" y="15" width="510" height="220" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />

        <text x="270" y="38" textAnchor="middle" fill="#0f172a" fontWeight="900" fontSize="14">
          A Normálalak Pontos Matematikai Felépítése
        </text>
        <text x="270" y="56" textAnchor="middle" fill="#64748b" fontSize="11">
          Bármely nemnulla szám egyértelműen felírható a · 10^k alakban
        </text>

        {/* Nagy képlet a közepén */}
        <g transform="translate(140, 75)">
          {/* Mantissza 'a' */}
          <rect x="0" y="5" width="70" height="60" rx="10" fill="url(#snMantissaGrad)" />
          <text x="35" y="47" textAnchor="middle" fill="#ffffff" fontWeight="black" fontSize="36" fontFamily="serif">
            a
          </text>

          {/* Szorzásjel */}
          <text x="90" y="47" textAnchor="middle" fill="#334155" fontWeight="bold" fontSize="28">
            ·
          </text>

          {/* 10-es alap */}
          <rect x="110" y="5" width="70" height="60" rx="10" fill="url(#snExpGrad)" />
          <text x="145" y="47" textAnchor="middle" fill="#ffffff" fontWeight="black" fontSize="34" fontFamily="serif">
            10
          </text>

          {/* Kitevő 'k' */}
          <circle cx="205" cy="18" r="18" fill="#d97706" />
          <text x="205" y="24" textAnchor="middle" fill="#ffffff" fontWeight="black" fontSize="18" fontFamily="serif">
            k
          </text>
        </g>

        {/* Címkék és magyarázó dobozok lent */}
        <g transform="translate(35, 150)">
          {/* Mantissza feltétel */}
          <rect x="0" y="0" width="225" height="70" rx="10" fill="#ecfdf5" stroke="#a7f3d0" strokeWidth="1.2" />
          <text x="112" y="22" textAnchor="middle" fill="#065f46" fontWeight="bold" fontSize="11">
            Mantissza (a)
          </text>
          <text x="112" y="42" textAnchor="middle" fill="#047857" fontWeight="black" fontSize="13">
            1 ≤ |a| &lt; 10
          </text>
          <text x="112" y="58" textAnchor="middle" fill="#059669" fontSize="9.5">
            Pontosan 1 darab nemnulla számjegy a vessző előtt!
          </text>

          {/* Kitevő feltétel */}
          <rect x="245" y="0" width="225" height="70" rx="10" fill="#eff6ff" stroke="#bfdbfe" strokeWidth="1.2" />
          <text x="357" y="22" textAnchor="middle" fill="#1e40af" fontWeight="bold" fontSize="11">
            Karakterisztika / Kitevő (k)
          </text>
          <text x="357" y="42" textAnchor="middle" fill="#1d4ed8" fontWeight="black" fontSize="13">
            k ∈ ℤ (Egész szám)
          </text>
          <text x="357" y="58" textAnchor="middle" fill="#2563eb" fontSize="9.5">
            Pozitív ha nagy szám (&gt;10), negatív ha kicsi (&lt;1)!
          </text>
        </g>
      </svg>
    </div>
  );
};

/**
 * 2. Tizedesvessző Léptetésének Aranyszabálya
 * Balra léptetés -> k pozitív (nagy számok)
 * Jobbra léptetés -> k negatív (tört számok)
 */
export const DecimalShiftSvg: React.FC<FigureProps> = ({
  size,
  className = ''
}) => {
  return (
    <div className={`flex flex-col items-center justify-center w-full ${className}`}>
      <svg
        viewBox="0 0 540 240"
        style={size ? { width: size, height: (size * 240) / 540 } : { width: '100%', maxWidth: 540, height: 'auto' }}
        className="overflow-visible select-none drop-shadow-xs w-full"
      >
        <rect x="15" y="15" width="510" height="210" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />

        <text x="270" y="38" textAnchor="middle" fill="#0f172a" fontWeight="900" fontSize="14">
          A Tizedesvessző Léptetésének Szabálya
        </text>
        <text x="270" y="55" textAnchor="middle" fill="#64748b" fontSize="11">
          Hány helyiértékkel visszük át a vesszőt, hogy 1 és 10 közé essen a szám?
        </text>

        {/* Bal oldal: Nagy szám (350 000) -> Balra 5 lépés */}
        <g transform="translate(30, 70)">
          <rect x="0" y="0" width="225" height="140" rx="10" fill="#ffffff" stroke="#a7f3d0" strokeWidth="1.2" />
          <rect x="10" y="8" width="205" height="22" rx="4" fill="#059669" />
          <text x="112" y="23" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="11">
            NAGY SZÁM: 350 000
          </text>

          <text x="112" y="55" textAnchor="middle" fill="#334155" fontWeight="bold" fontSize="16" fontFamily="monospace">
            3 5 0 0 0 0,
          </text>

          {/* Vesszőléptetés ívek: 5 lépés balra */}
          <path d="M 185 62 Q 170 75 155 62 Q 140 75 125 62 Q 110 75 95 62 Q 80 75 65 62" fill="none" stroke="#059669" strokeWidth="1.8" />
          <text x="112" y="92" textAnchor="middle" fill="#059669" fontWeight="bold" fontSize="11">
            ⬅ 5 lépés balra (+5 kitevő)
          </text>

          <rect x="12" y="104" width="201" height="26" rx="5" fill="#ecfdf5" stroke="#6ee7b7" />
          <text x="112" y="121" textAnchor="middle" fill="#047857" fontWeight="black" fontSize="13 font-mono">
            = 3,5 · 10⁵
          </text>
        </g>

        {/* Jobb oldal: Kis szám (0,0042) -> Jobbra 3 lépés */}
        <g transform="translate(285, 70)">
          <rect x="0" y="0" width="225" height="140" rx="10" fill="#ffffff" stroke="#fbcfe8" strokeWidth="1.2" />
          <rect x="10" y="8" width="205" height="22" rx="4" fill="#db2777" />
          <text x="112" y="23" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="11">
            KICSI SZÁM: 0,0042
          </text>

          <text x="112" y="55" textAnchor="middle" fill="#334155" fontWeight="bold" fontSize="16" fontFamily="monospace">
            0 , 0 0 4 2
          </text>

          {/* Vesszőléptetés ívek: 3 lépés jobbra */}
          <path d="M 50 62 Q 70 75 90 62 Q 110 75 130 62 Q 150 75 160 62" fill="none" stroke="#db2777" strokeWidth="1.8" />
          <text x="112" y="92" textAnchor="middle" fill="#db2777" fontWeight="bold" fontSize="11">
            3 lépés jobbra ➡ (-3 kitevő)
          </text>

          <rect x="12" y="104" width="201" height="26" rx="5" fill="#fdf2f8" stroke="#f472b6" />
          <text x="112" y="121" textAnchor="middle" fill="#9d174d" fontWeight="black" fontSize="13 font-mono">
            = 4,2 · 10⁻³
          </text>
        </g>
      </svg>
    </div>
  );
};

/**
 * 3. Univerzum Skála: A Mikro- és Makrovilág Normálalakban
 * Atommagtól (10^-15) az emberen át a galaxisig (10^21)
 */
export const UniverseScaleSvg: React.FC<FigureProps> = ({
  size,
  className = ''
}) => {
  return (
    <div className={`flex flex-col items-center justify-center w-full ${className}`}>
      <svg
        viewBox="0 0 540 230"
        style={size ? { width: size, height: (size * 230) / 540 } : { width: '100%', maxWidth: 540, height: 'auto' }}
        className="overflow-visible select-none drop-shadow-xs w-full"
      >
        <rect x="15" y="15" width="510" height="200" rx="16" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />

        <text x="270" y="38" textAnchor="middle" fill="#f8fafc" fontWeight="900" fontSize="14">
          A Természet Méretskálája Normálalakban
        </text>
        <text x="270" y="55" textAnchor="middle" fill="#94a3b8" fontSize="11">
          Hogyan teszi a normálalak átláthatóvá a felfoghatatlan méreteket?
        </text>

        {/* Skálavonal */}
        <line x1="45" y1="120" x2="495" y2="120" stroke="#475569" strokeWidth="3" />

        {/* 1. Atommag: 10^-15 m */}
        <g transform="translate(65, 90)">
          <circle cx="0" cy="30" r="6" fill="#f43f5e" />
          <text x="0" y="15" textAnchor="middle" fill="#fda4af" fontWeight="bold" fontSize="10">
            Atommag
          </text>
          <text x="0" y="52" textAnchor="middle" fill="#ffffff" fontWeight="black" fontSize="11 font-mono">
            10⁻¹⁵ m
          </text>
        </g>

        {/* 2. DNS / Atom: 10^-9 m (nanométer) */}
        <g transform="translate(165, 90)">
          <circle cx="0" cy="30" r="6" fill="#f59e0b" />
          <text x="0" y="15" textAnchor="middle" fill="#fde68a" fontWeight="bold" fontSize="10">
            DNS spirál
          </text>
          <text x="0" y="52" textAnchor="middle" fill="#ffffff" fontWeight="black" fontSize="11 font-mono">
            10⁻⁹ m
          </text>
        </g>

        {/* 3. Ember: 10^0 m (1 méter) */}
        <g transform="translate(270, 90)">
          <circle cx="0" cy="30" r="7" fill="#10b981" />
          <text x="0" y="15" textAnchor="middle" fill="#6ee7b7" fontWeight="bold" fontSize="10">
            Ember
          </text>
          <text x="0" y="52" textAnchor="middle" fill="#ffffff" fontWeight="black" fontSize="12 font-mono">
            10⁰ m (1 m)
          </text>
        </g>

        {/* 4. Föld: 10^7 m */}
        <g transform="translate(375, 90)">
          <circle cx="0" cy="30" r="6" fill="#3b82f6" />
          <text x="0" y="15" textAnchor="middle" fill="#93c5fd" fontWeight="bold" fontSize="10">
            Föld átmérő
          </text>
          <text x="0" y="52" textAnchor="middle" fill="#ffffff" fontWeight="black" fontSize="11 font-mono">
            1,27 · 10⁷ m
          </text>
        </g>

        {/* 5. Galaxis / Tejútrendszer: 10^21 m */}
        <g transform="translate(470, 90)">
          <circle cx="0" cy="30" r="6" fill="#a855f7" />
          <text x="0" y="15" textAnchor="middle" fill="#d8b4fe" fontWeight="bold" fontSize="10">
            Tejútrendszer
          </text>
          <text x="0" y="52" textAnchor="middle" fill="#ffffff" fontWeight="black" fontSize="11 font-mono">
            10²¹ m
          </text>
        </g>

        {/* Alsó megjegyzés */}
        <text x="270" y="195" textAnchor="middle" fill="#cbd5e1" fontSize="10">
          💡 A 10-es kitevő közvetlenül mutatja a nagyságrendet: hány nullát kellene leírni!
        </text>
      </svg>
    </div>
  );
};

/**
 * 4. Számológépes Kijelzők és Tudományos Jelölésmód (3.5 E8)
 */
export const CalculatorDisplaySvg: React.FC<FigureProps> = ({
  size,
  className = ''
}) => {
  return (
    <div className={`flex flex-col items-center justify-center w-full ${className}`}>
      <svg
        viewBox="0 0 520 220"
        style={size ? { width: size, height: (size * 220) / 520 } : { width: '100%', maxWidth: 520, height: 'auto' }}
        className="overflow-visible select-none drop-shadow-xs w-full"
      >
        <rect x="15" y="15" width="490" height="190" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />

        <text x="260" y="38" textAnchor="middle" fill="#0f172a" fontWeight="900" fontSize="14">
          Számológép Kijelzők Normálalakban
        </text>
        <text x="260" y="55" textAnchor="middle" fill="#64748b" fontSize="11">
          Hogyan jeleníti meg a zsebszámológép a normálalakot?
        </text>

        {/* 1. Kijelző: "E" betűs formátum */}
        <g transform="translate(40, 72)">
          <rect x="0" y="0" width="200" height="70" rx="8" fill="#1e293b" stroke="#0f172a" strokeWidth="2" />
          <text x="185" y="44" textAnchor="end" fill="#4ade80" fontWeight="bold" fontSize="22" fontFamily="monospace">
            3.5E+08
          </text>
          <text x="100" y="88" textAnchor="middle" fill="#334155" fontWeight="bold" fontSize="11">
            "E" (Exponent) jelölés = · 10⁸
          </text>
          <text x="100" y="105" textAnchor="middle" fill="#059669" fontWeight="black" fontSize="12">
            3,5 · 10⁸ = 350 000 000
          </text>
        </g>

        {/* 2. Kijelző: Külön kis kitevős formátum */}
        <g transform="translate(280, 72)">
          <rect x="0" y="0" width="200" height="70" rx="8" fill="#1e293b" stroke="#0f172a" strokeWidth="2" />
          <text x="140" y="44" textAnchor="end" fill="#38bdf8" fontWeight="bold" fontSize="22" fontFamily="monospace">
            4.2
          </text>
          <text x="180" y="30" textAnchor="end" fill="#f43f5e" fontWeight="bold" fontSize="14" fontFamily="monospace">
            -04
          </text>
          <text x="100" y="88" textAnchor="middle" fill="#334155" fontWeight="bold" fontSize="11">
            Jobb felső sarok = kitevő (-4)
          </text>
          <text x="100" y="105" textAnchor="middle" fill="#0284c7" fontWeight="black" fontSize="12">
            4,2 · 10⁻⁴ = 0,00042
          </text>
        </g>
      </svg>
    </div>
  );
};
