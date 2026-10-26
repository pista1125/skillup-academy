import React from 'react';

export interface FigureProps {
  size?: number;
  className?: string;
}

/**
 * 1. Négyzetgyök Értelmezése: Geometriai és Számtani Modell
 * Négyzet területe T = a² ➔ oldala a = √T
 * Kikötés: a ≥ 0, és √(x²) = |x|
 */
export const SquareRootConceptSvg: React.FC<FigureProps> = ({
  size,
  className = ''
}) => {
  return (
    <div className={`flex flex-col items-center justify-center w-full ${className}`}>
      <svg
        viewBox="0 0 520 250"
        style={size ? { width: size, height: (size * 250) / 520 } : { width: '100%', maxWidth: 520, height: 'auto' }}
        className="overflow-visible select-none drop-shadow-xs w-full"
      >
        <defs>
          <linearGradient id="sqAreaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#1d4ed8" />
          </linearGradient>
          <linearGradient id="sqCardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f8fafc" />
            <stop offset="100%" stopColor="#f1f5f9" />
          </linearGradient>
        </defs>

        {/* Bal oldali rész: Geometriai modell - Négyzet oldala a területből */}
        <g transform="translate(30, 30)">
          <rect x="0" y="0" width="210" height="195" rx="14" fill="url(#sqCardGrad)" stroke="#cbd5e1" strokeWidth="1.5" />
          <text x="105" y="24" textAnchor="middle" fill="#0f172a" fontWeight="bold" fontSize="12">
            Geometriai Jelentés
          </text>

          {/* Négyzet */}
          <rect x="55" y="45" width="100" height="100" rx="8" fill="url(#sqAreaGrad)" opacity="0.9" stroke="#1e40af" strokeWidth="2" />

          {/* Négyzet területe */}
          <text x="105" y="93" textAnchor="middle" fill="#ffffff" fontWeight="black" fontSize="16">
            T = 25 cm²
          </text>
          <text x="105" y="112" textAnchor="middle" fill="#bfdbfe" fontSize="10">
            (Terület)
          </text>

          {/* Oldalhossz címkék */}
          {/* Felső oldal */}
          <text x="105" y="40" textAnchor="middle" fill="#1e40af" fontWeight="bold" fontSize="12">
            a = √25 = 5 cm
          </text>
          {/* Bal oldal */}
          <text x="47" y="100" textAnchor="end" fill="#1e40af" fontWeight="bold" fontSize="12">
            a = 5
          </text>

          <text x="105" y="172" textAnchor="middle" fill="#475569" fontSize="11" fontWeight="bold">
            Oldal = Terület négyzetgyöke
          </text>
        </g>

        {/* Jobb oldali rész: Számtani definíció és az abszolút érték aranyszabálya */}
        <g transform="translate(265, 30)">
          <rect x="0" y="0" width="225" height="195" rx="14" fill="#ffffff" stroke="#93c5fd" strokeWidth="1.5" />
          <rect x="15" y="12" width="195" height="24" rx="6" fill="#2563eb" />
          <text x="112" y="28" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="12">
            Számtani Definíció &amp; Aranyszabály
          </text>

          {/* Definíció doboz */}
          <g transform="translate(15, 48)">
            <rect x="0" y="0" width="195" height="58" rx="8" fill="#eff6ff" stroke="#bfdbfe" />
            <text x="97" y="24" textAnchor="middle" fill="#1e40af" fontWeight="black" fontSize="15">
              √a = b &nbsp;⟺&nbsp; b² = a
            </text>
            <text x="97" y="44" textAnchor="middle" fill="#2563eb" fontWeight="bold" fontSize="11">
              Feltétel: a ≥ 0 és b ≥ 0!
            </text>
          </g>

          {/* Abszolút érték doboz */}
          <g transform="translate(15, 116)">
            <rect x="0" y="0" width="195" height="68" rx="8" fill="#fef2f2" stroke="#fecaca" />
            <text x="97" y="22" textAnchor="middle" fill="#991b1b" fontWeight="black" fontSize="14">
              √(x²) = |x|
            </text>
            <text x="97" y="40" textAnchor="middle" fill="#b91c1c" fontSize="10.5">
              Nem egyszerűen x, hanem |x|!
            </text>
            <text x="97" y="58" textAnchor="middle" fill="#7f1d1d" fontWeight="bold" fontSize="11">
              Példa: √((-5)²) = |-5| = +5
            </text>
          </g>
        </g>
      </svg>
    </div>
  );
};

/**
 * 2. Négyzetgyökvonás Azonosságai és az Összeadás Csapdája
 * √(a · b) = √a · √b és √(a/b) = √a / √b
 * Figyelem: √(a+b) ≠ √a + √b !
 */
export const SquareRootIdentitiesSvg: React.FC<FigureProps> = ({
  size,
  className = ''
}) => {
  return (
    <div className={`flex flex-col items-center justify-center w-full ${className}`}>
      <svg
        viewBox="0 0 530 240"
        style={size ? { width: size, height: (size * 240) / 530 } : { width: '100%', maxWidth: 530, height: 'auto' }}
        className="overflow-visible select-none drop-shadow-xs w-full"
      >
        {/* Felső cím */}
        <text x="265" y="24" textAnchor="middle" fill="#0f172a" fontWeight="900" fontSize="14">
          A Négyzetgyökvonás 2 Alapazonossága
        </text>
        <text x="265" y="42" textAnchor="middle" fill="#64748b" fontSize="11">
          Csak szorzásra és osztásra érvényes! Összeadásra és kivonásra nincs azonosság!
        </text>

        {/* 1. Kártya: Szorzat gyöke */}
        <g transform="translate(20, 60)">
          <rect x="0" y="0" width="235" height="160" rx="12" fill="#f0fdf4" stroke="#86efac" strokeWidth="1.5" />
          <rect x="12" y="10" width="211" height="24" rx="6" fill="#16a34a" />
          <text x="117" y="26" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="12">
            1. Szorzat Négyzetgyöke
          </text>

          <text x="117" y="66" textAnchor="middle" fill="#166534" fontWeight="black" fontSize="18">
            √(a · b) = √a · √b
          </text>
          <text x="117" y="86" textAnchor="middle" fill="#15803d" fontSize="10.5">
            (a ≥ 0 és b ≥ 0 esetén)
          </text>

          <rect x="12" y="102" width="211" height="46" rx="6" fill="#ffffff" stroke="#bbf7d0" />
          <text x="117" y="122" textAnchor="middle" fill="#14532d" fontSize="10" fontWeight="bold">
            Példa:
          </text>
          <text x="117" y="138" textAnchor="middle" fill="#16a34a" fontSize="12" fontWeight="bold">
            √(4 · 9) = √4 · √9 = 2 · 3 = 6
          </text>
        </g>

        {/* 2. Kártya: Hányados gyöke */}
        <g transform="translate(275, 60)">
          <rect x="0" y="0" width="235" height="160" rx="12" fill="#eff6ff" stroke="#93c5fd" strokeWidth="1.5" />
          <rect x="12" y="10" width="211" height="24" rx="6" fill="#2563eb" />
          <text x="117" y="26" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="12">
            2. Hányados Négyzetgyöke
          </text>

          <text x="117" y="66" textAnchor="middle" fill="#1e40af" fontWeight="black" fontSize="18">
            √(a / b) = √a / √b
          </text>
          <text x="117" y="86" textAnchor="middle" fill="#1d4ed8" fontSize="10.5">
            (a ≥ 0 és b &gt; 0 esetén)
          </text>

          <rect x="12" y="102" width="211" height="46" rx="6" fill="#ffffff" stroke="#bfdbfe" />
          <text x="117" y="122" textAnchor="middle" fill="#1e3a8a" fontSize="10" fontWeight="bold">
            Példa:
          </text>
          <text x="117" y="138" textAnchor="middle" fill="#2563eb" fontSize="12" fontWeight="bold">
            √(25 / 16) = √25 / √16 = 5 / 4 = 1,25
          </text>
        </g>
      </svg>
    </div>
  );
};

/**
 * 3. Kiemelés a Gyökjel Alól és Nevező Gyöktelenítése
 * √72 = √(36 · 2) = 6√2
 * 6 / √3 = (6 · √3) / 3 = 2√3
 */
export const FactoringAndDenomSvg: React.FC<FigureProps> = ({
  size,
  className = ''
}) => {
  return (
    <div className={`flex flex-col items-center justify-center w-full ${className}`}>
      <svg
        viewBox="0 0 530 240"
        style={size ? { width: size, height: (size * 240) / 530 } : { width: '100%', maxWidth: 530, height: 'auto' }}
        className="overflow-visible select-none drop-shadow-xs w-full"
      >
        <rect x="15" y="15" width="500" height="210" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />

        <text x="265" y="40" textAnchor="middle" fill="#0f172a" fontWeight="900" fontSize="14">
          A Két Legfontosabb Műveleti Technika
        </text>
        <text x="265" y="58" textAnchor="middle" fill="#64748b" fontSize="11">
          Hogyan hozzuk legegyszerűbb alakra az érettségi kifejezéseket?
        </text>

        {/* Bal oldal: Kiemelés gyökjel alól */}
        <g transform="translate(35, 75)">
          <rect x="0" y="0" width="220" height="135" rx="10" fill="#ffffff" stroke="#e0e7ff" strokeWidth="1.2" />
          <rect x="10" y="8" width="200" height="22" rx="4" fill="#4f46e5" />
          <text x="110" y="23" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="11">
            Kiemelés a Gyökjel Alól
          </text>

          <text x="110" y="55" textAnchor="middle" fill="#3730a3" fontWeight="black" fontSize="16">
            √72 = ?
          </text>
          <text x="110" y="78" textAnchor="middle" fill="#4338ca" fontSize="12">
            √72 = √(36 · 2)
          </text>
          <text x="110" y="98" textAnchor="middle" fill="#4338ca" fontSize="12">
            = √36 · √2
          </text>
          <text x="110" y="122" textAnchor="middle" fill="#16a34a" fontWeight="black" fontSize="15">
            = 6√2
          </text>
        </g>

        {/* Jobb oldal: Nevező gyöktelenítése */}
        <g transform="translate(275, 75)">
          <rect x="0" y="0" width="220" height="135" rx="10" fill="#ffffff" stroke="#fce7f3" strokeWidth="1.2" />
          <rect x="10" y="8" width="200" height="22" rx="4" fill="#db2777" />
          <text x="110" y="23" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="11">
            Nevező Gyöktelenítése
          </text>

          <text x="110" y="55" textAnchor="middle" fill="#9d174d" fontWeight="black" fontSize="16">
            6 / √3 = ?
          </text>
          <text x="110" y="78" textAnchor="middle" fill="#be185d" fontSize="12">
            Bővítés √3-mal:
          </text>
          <text x="110" y="98" textAnchor="middle" fill="#be185d" fontSize="12">
            (6 · √3) / (√3 · √3) = 6√3 / 3
          </text>
          <text x="110" y="122" textAnchor="middle" fill="#16a34a" fontWeight="black" fontSize="15">
            = 2√3
          </text>
        </g>
      </svg>
    </div>
  );
};

/**
 * 4. Geometriai Szemléltetés: Derékszögű Háromszög és a √2 Átfogó
 * HUNGARIAN RIGHT ANGLE STANDARD:
 * A derékszöget egy negyedkörívvel és benne egy ponttal jelöljük (nem négyzettel)!
 */
export const SquareRootGeometrySvg: React.FC<FigureProps> = ({
  size,
  className = ''
}) => {
  return (
    <div className={`flex flex-col items-center justify-center w-full ${className}`}>
      <svg
        viewBox="0 0 520 250"
        style={size ? { width: size, height: (size * 250) / 520 } : { width: '100%', maxWidth: 520, height: 'auto' }}
        className="overflow-visible select-none drop-shadow-xs w-full"
      >
        <rect x="15" y="15" width="490" height="220" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />

        <text x="260" y="38" textAnchor="middle" fill="#0f172a" fontWeight="900" fontSize="14">
          Geometriai Szerkesztés: A √2 Átfogó (Pithagorasz-tétel)
        </text>
        <text x="260" y="56" textAnchor="middle" fill="#64748b" fontSize="11">
          1 egység befogójú egyenlő szárú derékszögű háromszög átfogója c = √(1² + 1²) = √2
        </text>

        {/* Háromszög és szerkesztési ábra */}
        <g transform="translate(90, 75)">
          {/* Háromszög kitöltése */}
          <polygon
            points="0,120 120,120 0,0"
            fill="#dbeafe"
            stroke="#2563eb"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />

          {/* MAGYAR DERÉKSZÖG JELÖLÉS: Negyedkörív + pont a (0, 120) derékszögű csúcsnál */}
          {/* Csúcs: (0, 120). Befogók a pozitív X (0 -> 120) és negatív Y (120 -> 0) mentén mennek. */}
          {/* Negyedkörív sugara: r = 24. Kezdőpont (0, 96), ív a (24, 120) pontig. */}
          <path
            d="M 0 96 A 24 24 0 0 1 24 120"
            fill="none"
            stroke="#1d4ed8"
            strokeWidth="1.8"
          />
          {/* Pont az ív közepén: szögfelező 45 fok: x = 24*cos(45)*0.55 ≈ 9.3, y = 120 - 9.3 = 110.7 */}
          <circle cx="9" cy="111" r="2.5" fill="#1d4ed8" />

          {/* Befogó a = 1 (függőleges) */}
          <text x="-12" y="65" textAnchor="end" fill="#1e40af" fontWeight="bold" fontSize="14">
            a = 1
          </text>

          {/* Befogó b = 1 (vízszintes) */}
          <text x="60" y="140" textAnchor="middle" fill="#1e40af" fontWeight="bold" fontSize="14">
            b = 1
          </text>

          {/* Átfogó c = √2 */}
          <text x="75" y="55" fill="#dc2626" fontWeight="black" fontSize="16">
            c = √2 ≈ 1,414
          </text>
          <text x="75" y="73" fill="#ef4444" fontSize="10">
            c² = 1² + 1² = 2
          </text>
        </g>

        {/* Jobb oldali levezetés doboz */}
        <g transform="translate(285, 75)">
          <rect x="0" y="0" width="200" height="135" rx="10" fill="#ffffff" stroke="#93c5fd" strokeWidth="1.2" />
          <rect x="10" y="10" width="180" height="24" rx="4" fill="#1d4ed8" />
          <text x="100" y="26" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="11">
            Pitagorasz-tétel
          </text>

          <text x="100" y="60" textAnchor="middle" fill="#1e3a8a" fontWeight="bold" fontSize="13">
            c² = a² + b²
          </text>
          <text x="100" y="82" textAnchor="middle" fill="#334155" fontSize="12">
            c² = 1² + 1² = 1 + 1 = 2
          </text>
          <text x="100" y="112" textAnchor="middle" fill="#dc2626" fontWeight="black" fontSize="16">
            c = √2
          </text>
        </g>
      </svg>
    </div>
  );
};
