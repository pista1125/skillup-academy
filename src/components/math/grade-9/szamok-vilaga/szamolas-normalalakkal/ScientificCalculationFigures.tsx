import React from 'react';

export interface FigureProps {
  size?: number;
  className?: string;
}

/**
 * 1. Szorzás és Osztás Alapszabályai Normálalakban
 * Mantisszák művelete + kitevők összeadása / kivonása + utólagos normálás
 */
export const MultiplicationDivisionRuleSvg: React.FC<FigureProps> = ({
  size,
  className = ''
}) => {
  return (
    <div className={`flex flex-col items-center justify-center w-full ${className}`}>
      <svg
        viewBox="0 0 600 280"
        style={size ? { width: size, height: (size * 280) / 600 } : { width: '100%', maxWidth: 600, height: 'auto' }}
        className="overflow-visible select-none drop-shadow-xs w-full"
      >
        <defs>
          <linearGradient id="scMultGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#d97706" />
            <stop offset="100%" stopColor="#b45309" />
          </linearGradient>
          <linearGradient id="scDivGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2563eb" />
            <stop offset="100%" stopColor="#1d4ed8" />
          </linearGradient>
        </defs>

        <rect x="10" y="10" width="580" height="260" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />

        <text x="300" y="34" textAnchor="middle" fill="#0f172a" fontWeight="900" fontSize="14">
          Szorzás és Osztás Szabálya Normálalakban
        </text>
        <text x="300" y="52" textAnchor="middle" fill="#64748b" fontSize="11">
          A mantisszákkal elvégezzük a műveletet, a 10-es hatványok kitevőit összeadjuk vagy kivonjuk
        </text>

        {/* Bal oldali kártya: Szorzás */}
        <g transform="translate(25, 68)">
          <rect x="0" y="0" width="265" height="185" rx="12" fill="#fffbeb" stroke="#fde68a" strokeWidth="1.5" />
          
          <rect x="12" y="10" width="80" height="22" rx="6" fill="url(#scMultGrad)" />
          <text x="52" y="25" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="11">
            SZORZÁS ( · )
          </text>

          {/* Képlet */}
          <text x="132" y="60" textAnchor="middle" fill="#92400e" fontWeight="800" fontSize="13">
            (a · 10ᵏ) · (b · 10ᵐ)
          </text>
          <text x="132" y="84" textAnchor="middle" fill="#78350f" fontWeight="bold" fontSize="14">
            = (a · b) · 10ᵏ⁺ᵐ
          </text>

          {/* Magyarázat */}
          <path d="M 20 102 L 245 102" stroke="#fcd34d" strokeWidth="1" strokeDasharray="4 3" />
          <text x="20" y="122" fill="#451a03" fontSize="11" fontWeight="bold">
            Példa: (3 · 10⁴) · (4 · 10⁵)
          </text>
          <text x="20" y="142" fill="#78350f" fontSize="11">
            = (3 · 4) · 10⁴⁺⁵ = 12 · 10⁹
          </text>
          <rect x="18" y="152" width="225" height="24" rx="5" fill="#fef3c7" stroke="#fbbf24" strokeWidth="1" />
          <text x="130" y="168" textAnchor="middle" fill="#b45309" fontWeight="bold" fontSize="11">
            Utólagos normálás: = 1,2 · 10¹⁰
          </text>
        </g>

        {/* Jobb oldali kártya: Osztás */}
        <g transform="translate(310, 68)">
          <rect x="0" y="0" width="265" height="185" rx="12" fill="#eff6ff" stroke="#bfdbfe" strokeWidth="1.5" />
          
          <rect x="12" y="10" width="80" height="22" rx="6" fill="url(#scDivGrad)" />
          <text x="52" y="25" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="11">
            OSZTÁS ( / )
          </text>

          {/* Képlet */}
          <text x="132" y="60" textAnchor="middle" fill="#1e40af" fontWeight="800" fontSize="13">
            (a · 10ᵏ) / (b · 10ᵐ)
          </text>
          <text x="132" y="84" textAnchor="middle" fill="#1e3a8a" fontWeight="bold" fontSize="14">
            = (a / b) · 10ᵏ⁻ᵐ
          </text>

          {/* Magyarázat */}
          <path d="M 20 102 L 245 102" stroke="#93c5fd" strokeWidth="1" strokeDasharray="4 3" />
          <text x="20" y="122" fill="#172554" fontSize="11" fontWeight="bold">
            Példa: (2 · 10⁸) / (5 · 10³)
          </text>
          <text x="20" y="142" fill="#1e40af" fontSize="11">
            = (2 / 5) · 10⁸⁻³ = 0,4 · 10⁵
          </text>
          <rect x="18" y="152" width="225" height="24" rx="5" fill="#dbeafe" stroke="#60a5fa" strokeWidth="1" />
          <text x="130" y="168" textAnchor="middle" fill="#1d4ed8" fontWeight="bold" fontSize="11">
            Utólagos normálás: = 4 · 10⁴
          </text>
        </g>
      </svg>
    </div>
  );
};

/**
 * 2. Összeadás és Kivonás Közös Kitevőre Hozással
 * 3 lépéses folyamatábra
 */
export const AdditionCommonExponentSvg: React.FC<FigureProps> = ({
  size,
  className = ''
}) => {
  return (
    <div className={`flex flex-col items-center justify-center w-full ${className}`}>
      <svg
        viewBox="0 0 620 270"
        style={size ? { width: size, height: (size * 270) / 620 } : { width: '100%', maxWidth: 620, height: 'auto' }}
        className="overflow-visible select-none drop-shadow-xs w-full"
      >
        <defs>
          <linearGradient id="scStepGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>
          <marker id="scArrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1 L 8 5 L 0 9 z" fill="#d97706" />
          </marker>
        </defs>

        <rect x="10" y="10" width="600" height="250" rx="16" fill="#fffdfa" stroke="#fed7aa" strokeWidth="1.5" />

        <text x="310" y="32" textAnchor="middle" fill="#0f172a" fontWeight="900" fontSize="14">
          Összeadás és Kivonás 3 Lépésben (A Közös Kitevő Szabálya)
        </text>
        <text x="310" y="50" textAnchor="middle" fill="#78350f" fontSize="11">
          Példa levezetése: 3,2 · 10⁵ + 4,5 · 10⁴ = ?
        </text>

        {/* 1. Lépés: Kitevők ellenőrzése */}
        <g transform="translate(25, 70)">
          <rect x="0" y="0" width="160" height="155" rx="10" fill="#ffffff" stroke="#fbbf24" strokeWidth="1.5" />
          <circle cx="24" cy="24" r="14" fill="url(#scStepGrad)" />
          <text x="24" y="29" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="12">1</text>
          <text x="46" y="28" fill="#92400e" fontWeight="bold" fontSize="12">Kitevők vizsgálata</text>

          <text x="80" y="65" textAnchor="middle" fill="#1e293b" fontSize="11">
            Kitevők: <tspan fontWeight="bold" fill="#d97706">5</tspan> és <tspan fontWeight="bold" fill="#2563eb">4</tspan>
          </text>
          <text x="80" y="85" textAnchor="middle" fill="#b45309" fontWeight="bold" fontSize="11">
            Nem egyenlők!
          </text>
          <rect x="12" y="100" width="136" height="42" rx="6" fill="#fff7ed" stroke="#fdba74" strokeWidth="1" />
          <text x="80" y="117" textAnchor="middle" fill="#9a3412" fontSize="9.5">
            Közvetlenül tilos
          </text>
          <text x="80" y="132" textAnchor="middle" fill="#c2410c" fontWeight="bold" fontSize="10">
            összeadni a mantisszát!
          </text>
        </g>

        {/* Nyíl 1 -> 2 */}
        <path d="M 195 145 L 225 145" stroke="#d97706" strokeWidth="2.5" markerEnd="url(#scArrow)" />

        {/* 2. Lépés: Közös (nagyobb) kitevőre hozás */}
        <g transform="translate(235, 70)">
          <rect x="0" y="0" width="165" height="155" rx="10" fill="#ffffff" stroke="#fbbf24" strokeWidth="1.5" />
          <circle cx="24" cy="24" r="14" fill="url(#scStepGrad)" />
          <text x="24" y="29" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="12">2</text>
          <text x="46" y="28" fill="#92400e" fontWeight="bold" fontSize="12">Közös kitevőre írás</text>

          <text x="82" y="65" textAnchor="middle" fill="#64748b" fontSize="10">
            Igazítsunk 10⁵-re:
          </text>
          <rect x="10" y="78" width="145" height="30" rx="6" fill="#eff6ff" stroke="#93c5fd" strokeWidth="1" />
          <text x="82" y="98" textAnchor="middle" fill="#1e3a8a" fontWeight="bold" fontSize="11">
            4,5 · 10⁴ = 0,45 · 10⁵
          </text>
          <text x="82" y="128" textAnchor="middle" fill="#059669" fontSize="10" fontWeight="bold">
            (vessző 1-gyel balra,
          </text>
          <text x="82" y="142" textAnchor="middle" fill="#059669" fontSize="10" fontWeight="bold">
            kitevő 1-gyel nő)
          </text>
        </g>

        {/* Nyíl 2 -> 3 */}
        <path d="M 410 145 L 435 145" stroke="#d97706" strokeWidth="2.5" markerEnd="url(#scArrow)" />

        {/* 3. Lépés: Kiemelés és összeadás */}
        <g transform="translate(445, 70)">
          <rect x="0" y="0" width="155" height="155" rx="10" fill="#ffffff" stroke="#10b981" strokeWidth="1.5" />
          <circle cx="24" cy="24" r="14" fill="#059669" />
          <text x="24" y="29" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="12">3</text>
          <text x="46" y="28" fill="#065f46" fontWeight="bold" fontSize="12">Kiemelés (10⁵)</text>

          <text x="77" y="62" textAnchor="middle" fill="#334155" fontSize="10.5">
            = (3,2 + 0,45) · 10⁵
          </text>
          <rect x="10" y="80" width="135" height="58" rx="8" fill="#ecfdf5" stroke="#6ee7b7" strokeWidth="1.5" />
          <text x="77" y="103" textAnchor="middle" fill="#047857" fontWeight="black" fontSize="14">
            = 3,65 · 10⁵
          </text>
          <text x="77" y="124" textAnchor="middle" fill="#065f46" fontSize="10" fontWeight="bold">
            Szabályos normálalak!
          </text>
        </g>
      </svg>
    </div>
  );
};

/**
 * 3. SI Prefixumok és Átváltási Skála (Peta ... Femto)
 */
export const SiPrefixChartSvg: React.FC<FigureProps> = ({
  size,
  className = ''
}) => {
  const prefixes = [
    { prefix: 'Tera', symbol: 'T', exp: '10¹²', value: '1 000 000 000 000', example: 'Merevlemez (TB)', color: '#7c3aed' },
    { prefix: 'Giga', symbol: 'G', exp: '10⁹', value: '1 000 000 000', example: 'Processzor (GHz)', color: '#2563eb' },
    { prefix: 'Mega', symbol: 'M', exp: '10⁶', value: '1 000 000', example: 'Rádiófrekvencia (MHz)', color: '#0891b2' },
    { prefix: 'kilo', symbol: 'k', exp: '10³', value: '1 000', example: 'Kilométer, kilogramm', color: '#059669' },
    { prefix: 'alap', symbol: '-', exp: '10⁰', value: '1', example: 'Méter, másodperc, gramm', color: '#64748b' },
    { prefix: 'milli', symbol: 'm', exp: '10⁻³', value: '0,001', example: 'Milliméter, milligramm', color: '#d97706' },
    { prefix: 'mikro', symbol: 'µ', exp: '10⁻⁶', value: '0,000 001', example: 'Baktériumok mérete', color: '#ea580c' },
    { prefix: 'nano', symbol: 'n', exp: '10⁻⁹', value: '0,000 000 001', example: 'Molekulák, hullámhossz', color: '#e11d48' },
    { prefix: 'piko', symbol: 'p', exp: '10⁻¹²', value: '0,000 000 000 001', example: 'Atom sugarak (pm)', color: '#be185d' },
  ];

  return (
    <div className={`flex flex-col items-center justify-center w-full ${className}`}>
      <svg
        viewBox="0 0 680 340"
        style={size ? { width: size, height: (size * 340) / 680 } : { width: '100%', maxWidth: 680, height: 'auto' }}
        className="overflow-visible select-none drop-shadow-xs w-full"
      >
        <rect x="10" y="10" width="660" height="320" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />

        <text x="340" y="34" textAnchor="middle" fill="#0f172a" fontWeight="900" fontSize="14">
          SI Prefixumok és Tízhatványok Áttekintése
        </text>
        <text x="340" y="52" textAnchor="middle" fill="#64748b" fontSize="11">
          A tudományban és technikában használt nemzetközi mértékegység-előtagok
        </text>

        {/* Oszlopfejlécek */}
        <g transform="translate(25, 66)">
          <rect x="0" y="0" width="630" height="26" rx="6" fill="#e2e8f0" />
          <text x="50" y="17" textAnchor="middle" fill="#334155" fontWeight="bold" fontSize="11">Prefix</text>
          <text x="130" y="17" textAnchor="middle" fill="#334155" fontWeight="bold" fontSize="11">Jel</text>
          <text x="210" y="17" textAnchor="middle" fill="#334155" fontWeight="bold" fontSize="11">Hatvány</text>
          <text x="360" y="17" textAnchor="middle" fill="#334155" fontWeight="bold" fontSize="11">Szorzótényező</text>
          <text x="535" y="17" textAnchor="middle" fill="#334155" fontWeight="bold" fontSize="11">Tipikus Alkalmazás</text>
        </g>

        {/* Sorok */}
        {prefixes.map((item, idx) => {
          const yPos = 98 + idx * 24;
          const isBase = item.symbol === '-';
          return (
            <g key={item.prefix} transform={`translate(25, ${yPos})`}>
              <rect
                x="0"
                y="0"
                width="630"
                height="22"
                rx="4"
                fill={isBase ? '#fef3c7' : idx % 2 === 0 ? '#ffffff' : '#f1f5f9'}
                stroke={isBase ? '#f59e0b' : 'transparent'}
                strokeWidth={1}
              />
              <text x="50" y="15" textAnchor="middle" fill={item.color} fontWeight="bold" fontSize="11">
                {item.prefix}
              </text>
              <text x="130" y="15" textAnchor="middle" fill="#0f172a" fontWeight="black" fontSize="12">
                {item.symbol}
              </text>
              <text x="210" y="15" textAnchor="middle" fill="#1e293b" fontWeight="bold" fontSize="11">
                {item.exp}
              </text>
              <text x="360" y="15" textAnchor="middle" fill="#475569" fontSize="10.5" fontFamily="monospace">
                {item.value}
              </text>
              <text x="535" y="15" textAnchor="middle" fill="#334155" fontSize="10.5">
                {item.example}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

/**
 * 4. Számológép Tipikus Csapda: Zárójelek Elhagyása Osztáskor
 */
export const CalculatorMistakeSvg: React.FC<FigureProps> = ({
  size,
  className = ''
}) => {
  return (
    <div className={`flex flex-col items-center justify-center w-full ${className}`}>
      <svg
        viewBox="0 0 600 230"
        style={size ? { width: size, height: (size * 230) / 600 } : { width: '100%', maxWidth: 600, height: 'auto' }}
        className="overflow-visible select-none drop-shadow-xs w-full"
      >
        <rect x="10" y="10" width="580" height="210" rx="16" fill="#fffdfa" stroke="#fecaca" strokeWidth="1.5" />

        <text x="300" y="34" textAnchor="middle" fill="#991b1b" fontWeight="900" fontSize="14">
          ⚠️ Számológépes Csapda: A Nevező Zárójelezése
        </text>
        <text x="300" y="52" textAnchor="middle" fill="#7f1d1d" fontSize="11">
          Feladat: Számítsd ki a (6 · 10⁸) / (2 · 10³) tört értékét!
        </text>

        {/* Hibás beírás (bal) */}
        <g transform="translate(25, 68)">
          <rect x="0" y="0" width="265" height="135" rx="10" fill="#fef2f2" stroke="#f87171" strokeWidth="1.5" />
          <rect x="10" y="10" width="110" height="20" rx="4" fill="#ef4444" />
          <text x="65" y="24" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="10.5">
            ❌ HIBÁS BEVITEL
          </text>

          <text x="132" y="55" textAnchor="middle" fill="#7f1d1d" fontFamily="monospace" fontWeight="bold" fontSize="12">
            6*10^8 / 2*10^3
          </text>
          <text x="132" y="80" textAnchor="middle" fill="#dc2626" fontWeight="bold" fontSize="16">
            Kijelző: 3 · 10¹¹
          </text>
          <rect x="12" y="94" width="240" height="30" rx="5" fill="#fee2e2" />
          <text x="132" y="113" textAnchor="middle" fill="#991b1b" fontSize="9.5">
            A gép oszt 2-vel, majd a kapottat megszorozza 10³-nal!
          </text>
        </g>

        {/* Helyes beírás (jobb) */}
        <g transform="translate(310, 68)">
          <rect x="0" y="0" width="265" height="135" rx="10" fill="#f0fdf4" stroke="#4ade80" strokeWidth="1.5" />
          <rect x="10" y="10" width="110" height="20" rx="4" fill="#22c55e" />
          <text x="65" y="24" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="10.5">
            ✅ HELYES BEVITEL
          </text>

          <text x="132" y="55" textAnchor="middle" fill="#14532d" fontFamily="monospace" fontWeight="bold" fontSize="12">
            (6*10^8) / (2*10^3)
          </text>
          <text x="132" y="80" textAnchor="middle" fill="#16a34a" fontWeight="bold" fontSize="16">
            Kijelző: 3 · 10⁵ (= 300 000)
          </text>
          <rect x="12" y="94" width="240" height="30" rx="5" fill="#dcfce7" />
          <text x="132" y="113" textAnchor="middle" fill="#166534" fontSize="9.5" fontWeight="bold">
            Vagy használva az EE / EXP gombot: 6E8 / 2E3
          </text>
        </g>
      </svg>
    </div>
  );
};
