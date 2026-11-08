import React from 'react';

interface FigureProps {
  className?: string;
  size?: number;
}

// 1. Összetett algebrai tört egyszerűsítése
export const AlgebraicFractionSimplificationSvg: React.FC<FigureProps> = ({ className = '', size }) => {
  return (
    <div className={`w-full flex flex-col items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 540 330"
        className="w-full h-auto select-none rounded-2xl bg-slate-900/95 p-2 sm:p-3 shadow-xl border border-slate-800"
        style={size ? { maxWidth: `${size}px` } : undefined}
      >
        <defs>
          <linearGradient id="stepGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#818cf8" />
            <stop offset="100%" stopColor="#6366f1" />
          </linearGradient>
          <linearGradient id="stepGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#0284c7" />
          </linearGradient>
          <linearGradient id="resultGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#34d399" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
        </defs>

        {/* Fejléc */}
        <rect x="110" y="10" width="320" height="26" rx="13" fill="#1e293b" stroke="#334155" />
        <text x="270" y="27" fill="#818cf8" fontSize="12" fontWeight="700" textAnchor="middle" letterSpacing="0.8">
          ALGEBRAI TÖRT EGYSZERŰSÍTÉSE
        </text>

        {/* 1. Lépés: Kiinduló feladat és külső kitevő */}
        <g transform="translate(20, 48)">
          <rect x="0" y="0" width="500" height="64" rx="10" fill="#0f172a" stroke="#4f46e5" strokeWidth="1.2" />
          <circle cx="28" cy="32" r="14" fill="#312e81" stroke="#6366f1" />
          <text x="28" y="37" fill="#e0e7ff" fontSize="12" fontWeight="bold" textAnchor="middle">1</text>
          
          <text x="56" y="26" fill="#a5b4fc" fontSize="11" fontWeight="700">KÜLSŐ KITEVŐ SZÉTBONTÁSA A TÉNYEZŐKRE:</text>
          <text x="56" y="50" fill="#f8fafc" fontSize="14" fontWeight="600">
            ((a⁻² · b³) / (2 · c⁻¹))⁻² = (a⁽⁻²⁾⁽⁻²⁾ · b³⁽⁻²⁾) / (2⁻² · c⁽⁻¹⁾⁽⁻²⁾)
          </text>
        </g>

        {/* Nyíl lefelé */}
        <path d="M 270 114 L 270 124" stroke="#818cf8" strokeWidth="2" strokeDasharray="3 3" />

        {/* 2. Lépés: Kitevők beszorzása és negatív kitevők átrendezése */}
        <g transform="translate(20, 126)">
          <rect x="0" y="0" width="500" height="88" rx="10" fill="#0f172a" stroke="#0284c7" strokeWidth="1.2" />
          <circle cx="28" cy="44" r="14" fill="#0c4a6e" stroke="#38bdf8" />
          <text x="28" y="49" fill="#e0f2fe" fontSize="12" fontWeight="bold" textAnchor="middle">2</text>
          
          <text x="56" y="26" fill="#7dd3fc" fontSize="11" fontWeight="700">KITEVŐK SZORZÁSA ÉS ÁTFORGATÁS (RECIPROK SZABÁLY):</text>
          <text x="56" y="50" fill="#f8fafc" fontSize="15" fontWeight="600">
            = (a⁴ · b⁻⁶) / (2⁻² · c²)
          </text>
          <text x="56" y="74" fill="#94a3b8" fontSize="11">
            💡 A negatív kitevős tényezők felcserélik a helyüket: 2⁻² felmegy 2² = 4-ként, b⁻⁶ lemegy b⁶-ként!
          </text>
        </g>

        {/* Nyíl lefelé */}
        <path d="M 270 216 L 270 226" stroke="#34d399" strokeWidth="2" strokeDasharray="3 3" />

        {/* 3. Lépés: Legegyszerűbb pozitív kitevős alak */}
        <g transform="translate(20, 228)">
          <rect x="0" y="0" width="500" height="88" rx="10" fill="#042f2e/70" stroke="#10b981" strokeWidth="1.5" />
          <circle cx="28" cy="44" r="14" fill="#064e3b" stroke="#34d399" />
          <text x="28" y="49" fill="#a7f3d0" fontSize="12" fontWeight="bold" textAnchor="middle">✓</text>
          
          <text x="56" y="26" fill="#6ee7b7" fontSize="11" fontWeight="700">VÉGLEGES, EGYSZERŰSÍTETT POZITÍV KITEVŐS ALAK:</text>
          <text x="56" y="58" fill="#f8fafc" fontSize="22" fontWeight="900">
            = (4 · a⁴) / (b⁶ · c²)
          </text>
          <text x="320" y="58" fill="#a7f3d0" fontSize="12" fontWeight="600">
            Kikötés: a, b, c ≠ 0
          </text>
        </g>
      </svg>
    </div>
  );
};

// 2. Számalapok prímhatványos felbontása
export const PrimeFactorizationPowersSvg: React.FC<FigureProps> = ({ className = '', size }) => {
  return (
    <div className={`w-full flex flex-col items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 540 320"
        className="w-full h-auto select-none rounded-2xl bg-slate-900/95 p-2 sm:p-3 shadow-xl border border-slate-800"
        style={size ? { maxWidth: `${size}px` } : undefined}
      >
        {/* Fejléc */}
        <rect x="100" y="10" width="340" height="26" rx="13" fill="#1e293b" stroke="#334155" />
        <text x="270" y="27" fill="#38bdf8" fontSize="12" fontWeight="700" textAnchor="middle" letterSpacing="0.8">
          PRÍMHATVÁNYOKRA BONTÁS MÓDSZERE
        </text>

        {/* Feladat kiírása */}
        <g transform="translate(20, 48)">
          <rect x="0" y="0" width="500" height="52" rx="10" fill="#0f172a" stroke="#334155" />
          <text x="25" y="32" fill="#94a3b8" fontSize="13">Számítsd ki egyszerűen:</text>
          <text x="220" y="34" fill="#38bdf8" fontSize="18" fontWeight="bold">
            (12⁴ · 18⁻²) : 6³ = ?
          </text>
        </g>

        {/* 3 Prímbontási kártya egymás mellett */}
        <g transform="translate(20, 110)">
          {/* 12 felbontása */}
          <rect x="0" y="0" width="160" height="96" rx="8" fill="#1e293b" stroke="#6366f1" strokeWidth="1" />
          <text x="80" y="24" fill="#a5b4fc" fontSize="12" fontWeight="bold" textAnchor="middle">12 = 2² · 3</text>
          <text x="80" y="52" fill="#f8fafc" fontSize="13" textAnchor="middle">12⁴ = (2² · 3)⁴</text>
          <text x="80" y="78" fill="#818cf8" fontSize="15" fontWeight="900" textAnchor="middle">= 2⁸ · 3⁴</text>

          {/* 18 felbontása */}
          <rect x="170" y="0" width="160" height="96" rx="8" fill="#1e293b" stroke="#0ea5e9" strokeWidth="1" />
          <text x="250" y="24" fill="#7dd3fc" fontSize="12" fontWeight="bold" textAnchor="middle">18 = 2 · 3²</text>
          <text x="250" y="52" fill="#f8fafc" fontSize="13" textAnchor="middle">18⁻² = (2 · 3²)⁻²</text>
          <text x="250" y="78" fill="#38bdf8" fontSize="15" fontWeight="900" textAnchor="middle">= 2⁻² · 3⁻⁴</text>

          {/* 6 felbontása */}
          <rect x="340" y="0" width="160" height="96" rx="8" fill="#1e293b" stroke="#10b981" strokeWidth="1" />
          <text x="420" y="24" fill="#6ee7b7" fontSize="12" fontWeight="bold" textAnchor="middle">6 = 2 · 3</text>
          <text x="420" y="52" fill="#f8fafc" fontSize="13" textAnchor="middle">6³ = (2 · 3)³</text>
          <text x="420" y="78" fill="#34d399" fontSize="15" fontWeight="900" textAnchor="middle">= 2³ · 3³</text>
        </g>

        {/* Összevonás azonos alapok szerint */}
        <g transform="translate(20, 218)">
          <rect x="0" y="0" width="500" height="90" rx="10" fill="#042f2e/70" stroke="#14b8a6" strokeWidth="1.5" />
          <text x="250" y="25" fill="#2dd4bf" fontSize="12" fontWeight="bold" textAnchor="middle">
            AZONOS ALAPÚ KITEVŐK ÖSSZEVONÁSA (SZORZÁS: +, OSZTÁS: -)
          </text>
          <text x="250" y="54" fill="#f8fafc" fontSize="16" fontWeight="bold" textAnchor="middle">
            2⁸⁺⁽⁻²⁾⁻³ · 3⁴⁺⁽⁻⁴⁾⁻³ = <tspan fill="#38bdf8">2³</tspan> · <tspan fill="#818cf8">3⁻³</tspan>
          </text>
          <text x="250" y="80" fill="#34d399" fontSize="18" fontWeight="900" textAnchor="middle">
            = 8 · (1 / 27) = 8 / 27
          </text>
        </g>
      </svg>
    </div>
  );
};

// 3. Hatványok összehasonlítása
export const PowersComparisonSvg: React.FC<FigureProps> = ({ className = '', size }) => {
  return (
    <div className={`w-full flex flex-col items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 540 320"
        className="w-full h-auto select-none rounded-2xl bg-slate-900/95 p-2 sm:p-3 shadow-xl border border-slate-800"
        style={size ? { maxWidth: `${size}px` } : undefined}
      >
        {/* Fejléc */}
        <rect x="100" y="10" width="340" height="26" rx="13" fill="#1e293b" stroke="#334155" />
        <text x="270" y="27" fill="#fbbf24" fontSize="12" fontWeight="700" textAnchor="middle" letterSpacing="0.8">
          HATVÁNYOK ÖSSZEHASONLÍTÁSI STRATÉGIÁI
        </text>

        {/* 1. Módszer: Azonos alapra hozás */}
        <g transform="translate(20, 48)">
          <rect x="0" y="0" width="245" height="255" rx="10" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.2" />
          <rect x="15" y="12" width="215" height="26" rx="6" fill="#78350f/70" />
          <text x="122" y="29" fill="#fcd34d" fontSize="11" fontWeight="bold" textAnchor="middle">
            A) AZONOS ALAPRA HOZÁS
          </text>
          
          <text x="122" y="60" fill="#94a3b8" fontSize="12" textAnchor="middle">Melyik a nagyobb?</text>
          <text x="122" y="86" fill="#f8fafc" fontSize="18" fontWeight="bold" textAnchor="middle">
            4¹⁵ &nbsp; vs &nbsp; 8¹⁰
          </text>

          <path d="M 30 102 L 215 102" stroke="#334155" strokeWidth="1" />

          <text x="25" y="125" fill="#fde68a" fontSize="11" fontWeight="600">Alakítsuk 2 hatványává:</text>
          <text x="25" y="152" fill="#cbd5e1" fontSize="14">
            • 4¹⁵ = (2²)¹⁵ = <tspan fill="#f59e0b" fontWeight="bold">2³⁰</tspan>
          </text>
          <text x="25" y="182" fill="#cbd5e1" fontSize="14">
            • 8¹⁰ = (2³)¹⁰ = <tspan fill="#f59e0b" fontWeight="bold">2³⁰</tspan>
          </text>

          <rect x="15" y="202" width="215" height="40" rx="6" fill="#022c22" stroke="#10b981" />
          <text x="122" y="227" fill="#34d399" fontSize="14" fontWeight="bold" textAnchor="middle">
            Eredmény: 4¹⁵ = 8¹⁰
          </text>
        </g>

        {/* 2. Módszer: Azonos kitevőre hozás */}
        <g transform="translate(275, 48)">
          <rect x="0" y="0" width="245" height="255" rx="10" fill="#1e293b" stroke="#8b5cf6" strokeWidth="1.2" />
          <rect x="15" y="12" width="215" height="26" rx="6" fill="#4c1d95/70" />
          <text x="122" y="29" fill="#c4b5fd" fontSize="11" fontWeight="bold" textAnchor="middle">
            B) AZONOS KITEVŐRE HOZÁS
          </text>

          <text x="122" y="60" fill="#94a3b8" fontSize="12" textAnchor="middle">Melyik a nagyobb?</text>
          <text x="122" y="86" fill="#f8fafc" fontSize="18" fontWeight="bold" textAnchor="middle">
            2⁶⁰ &nbsp; vs &nbsp; 3⁴⁰
          </text>

          <path d="M 30 102 L 215 102" stroke="#334155" strokeWidth="1" />

          <text x="25" y="125" fill="#ddd6fe" fontSize="11" fontWeight="600">Közös kitevő: lnko(60, 40) = 20</text>
          <text x="25" y="152" fill="#cbd5e1" fontSize="14">
            • 2⁶⁰ = (2³)²⁰ = <tspan fill="#c084fc" fontWeight="bold">8²⁰</tspan>
          </text>
          <text x="25" y="182" fill="#cbd5e1" fontSize="14">
            • 3⁴⁰ = (3²)²⁰ = <tspan fill="#c084fc" fontWeight="bold">9²⁰</tspan>
          </text>

          <rect x="15" y="202" width="215" height="40" rx="6" fill="#022c22" stroke="#10b981" />
          <text x="122" y="227" fill="#34d399" fontSize="14" fontWeight="bold" textAnchor="middle">
            Mivel 8 &lt; 9 ⟹ 2⁶⁰ &lt; 3⁴⁰
          </text>
        </g>
      </svg>
    </div>
  );
};

// 4. Hatványok összege és a kiemelés
export const FactoringPowersSvg: React.FC<FigureProps> = ({ className = '', size }) => {
  return (
    <div className={`w-full flex flex-col items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 540 310"
        className="w-full h-auto select-none rounded-2xl bg-slate-900/95 p-2 sm:p-3 shadow-xl border border-slate-800"
        style={size ? { maxWidth: `${size}px` } : undefined}
      >
        {/* Fejléc */}
        <rect x="90" y="10" width="360" height="26" rx="13" fill="#1e293b" stroke="#334155" />
        <text x="270" y="27" fill="#f43f5e" fontSize="12" fontWeight="700" textAnchor="middle" letterSpacing="0.8">
          HATVÁNYOK ÖSSZEGE: KÖZÖS TÉNYEZŐ KIEMELÉSE
        </text>

        {/* Tipikus hiba figyelmeztetés */}
        <g transform="translate(20, 46)">
          <rect x="0" y="0" width="500" height="66" rx="10" fill="#450a0a/60" stroke="#ef4444" strokeWidth="1.2" />
          <text x="20" y="25" fill="#fca5a5" fontSize="11" fontWeight="bold">
            ❌ TÍPUSHIBA: NINCS AZONOSSÁG HATVÁNYOK ÖSSZEADÁSÁRA!
          </text>
          <text x="20" y="50" fill="#fecaca" fontSize="14" fontWeight="700">
            2¹⁰ + 2¹⁰ ≠ 2²⁰ &nbsp; <tspan fill="#f87171">(A kitevők nem adódnak össze összegnél!)</tspan>
          </text>
        </g>

        {/* Helyes megoldás kiemeléssel */}
        <g transform="translate(20, 122)">
          <rect x="0" y="0" width="500" height="175" rx="10" fill="#042f2e/70" stroke="#10b981" strokeWidth="1.5" />
          <text x="25" y="28" fill="#34d399" fontSize="12" fontWeight="bold">
            ✓ HELYES MEGOLDÁS: A KISEBB KITEVŐJŰ HATVÁNY KIEMELÉSE
          </text>

          {/* Példa 1: 2^10 + 2^10 */}
          <g transform="translate(25, 42)">
            <rect x="0" y="0" width="450" height="42" rx="6" fill="#0f172a" />
            <text x="15" y="26" fill="#f8fafc" fontSize="14" fontWeight="600">
              2¹⁰ + 2¹⁰ = 2¹⁰ · (1 + 1) = 2¹⁰ · 2¹ = <tspan fill="#34d399" fontWeight="900">2¹¹</tspan>
            </text>
          </g>

          {/* Példa 2: Algebrai tört kiemeléssel */}
          <g transform="translate(25, 96)">
            <rect x="0" y="0" width="450" height="64" rx="6" fill="#0f172a" />
            <text x="15" y="24" fill="#6ee7b7" fontSize="11" fontWeight="600">Érettségi típusfeladat tört egyszerűsítésére:</text>
            <text x="15" y="48" fill="#f8fafc" fontSize="15" fontWeight="bold">
              (3ⁿ⁺² - 3ⁿ) / (3ⁿ⁺¹ + 3ⁿ) = (3ⁿ · (3² - 1)) / (3ⁿ · (3¹ + 1)) = (9 - 1) / (3 + 1) = <tspan fill="#34d399" fontWeight="900">2</tspan>
            </text>
          </g>
        </g>
      </svg>
    </div>
  );
};

