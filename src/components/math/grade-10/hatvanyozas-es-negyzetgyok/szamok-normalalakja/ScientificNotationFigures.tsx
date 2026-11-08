import React from 'react';

interface FigureProps {
  className?: string;
  size?: number;
}

// 1. A normálalak felépítése és anatómiája
export const ScientificNotationStructureSvg: React.FC<FigureProps> = ({ className = '', size }) => {
  return (
    <div className={`w-full flex flex-col items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 540 330"
        className="w-full h-auto select-none rounded-2xl bg-slate-900/95 p-2 sm:p-3 shadow-xl border border-slate-800"
        style={size ? { maxWidth: `${size}px` } : undefined}
      >
        <defs>
          <linearGradient id="mantissaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#34d399" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
          <linearGradient id="expGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#0284c7" />
          </linearGradient>
        </defs>

        {/* Fejléc */}
        <rect x="120" y="10" width="300" height="26" rx="13" fill="#1e293b" stroke="#334155" />
        <text x="270" y="27" fill="#34d399" fontSize="12" fontWeight="700" textAnchor="middle" letterSpacing="0.8">
          A NORMÁLALAK ANATÓMIÁJA
        </text>

        {/* Központi képlet keret */}
        <g transform="translate(20, 48)">
          <rect x="0" y="0" width="500" height="110" rx="12" fill="#064e3b/30" stroke="#10b981" strokeWidth="1.5" />
          
          <text x="175" y="68" fill="url(#mantissaGrad)" fontSize="48" fontWeight="900" textAnchor="middle" fontFamily="monospace">
            a
          </text>
          <text x="235" y="64" fill="#cbd5e1" fontSize="34" fontWeight="700" textAnchor="middle">
            ·
          </text>
          <text x="290" y="68" fill="#f8fafc" fontSize="48" fontWeight="900" textAnchor="middle" fontFamily="monospace">
            10
          </text>
          <text x="335" y="44" fill="url(#expGrad)" fontSize="32" fontWeight="900" textAnchor="middle" fontFamily="monospace">
            k
          </text>

          {/* Mantissza magyarázat balra */}
          <g transform="translate(30, 80)">
            <path d="M 145 -5 L 145 10 L 80 10" fill="none" stroke="#34d399" strokeWidth="1.2" />
            <rect x="0" y="10" width="160" height="20" rx="5" fill="#042f2e" stroke="#059669" />
            <text x="80" y="24" fill="#6ee7b7" fontSize="10" fontWeight="bold" textAnchor="middle">
              MANTISSZA: 1 ≤ |a| &lt; 10
            </text>
          </g>

          {/* Kitevő magyarázat jobbra */}
          <g transform="translate(290, 80)">
            <path d="M 45 -22 L 45 10 L 90 10" fill="none" stroke="#38bdf8" strokeWidth="1.2" />
            <rect x="80" y="10" width="160" height="20" rx="5" fill="#0c4a6e" stroke="#0284c7" />
            <text x="160" y="24" fill="#7dd3fc" fontSize="10" fontWeight="bold" textAnchor="middle">
              KITEVŐ / NAGYSÁGREND: k ∈ ℤ
            </text>
          </g>
        </g>

        {/* Két alsó példa: Nagy szám és Kicsi szám */}
        <g transform="translate(20, 172)">
          {/* Nagy szám: Föld-Hold távolság */}
          <rect x="0" y="0" width="240" height="135" rx="10" fill="#1e293b" stroke="#334155" />
          <text x="120" y="24" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">
            1. NAGY SZÁMOK (k &gt; 0)
          </text>
          <text x="120" y="48" fill="#94a3b8" fontSize="11" textAnchor="middle">
            Tizedesvessző eltolása BALRA:
          </text>
          <text x="120" y="78" fill="#f8fafc" fontSize="16" fontWeight="bold" textAnchor="middle">
            384 000 km
          </text>
          <path d="M 70 88 L 170 88" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 3" />
          <text x="120" y="112" fill="#34d399" fontSize="18" fontWeight="900" textAnchor="middle">
            = 3,84 · 10⁵ km
          </text>
        </g>

        <g transform="translate(280, 172)">
          {/* Kicsi szám: baktérium mérete */}
          <rect x="0" y="0" width="240" height="135" rx="10" fill="#1e293b" stroke="#334155" />
          <text x="120" y="24" fill="#f472b6" fontSize="12" fontWeight="bold" textAnchor="middle">
            2. KICSI SZÁMOK (k &lt; 0)
          </text>
          <text x="120" y="48" fill="#94a3b8" fontSize="11" textAnchor="middle">
            Tizedesvessző eltolása JOBBRA:
          </text>
          <text x="120" y="78" fill="#f8fafc" fontSize="16" fontWeight="bold" textAnchor="middle">
            0,000 002 5 m
          </text>
          <path d="M 70 88 L 170 88" stroke="#f472b6" strokeWidth="1.5" strokeDasharray="3 3" />
          <text x="120" y="112" fill="#34d399" fontSize="18" fontWeight="900" textAnchor="middle">
            = 2,5 · 10⁻⁶ m
          </text>
        </g>
      </svg>
    </div>
  );
};

// 2. SI prefixumok és nagyságrendek skálája
export const SiPrefixScaleSvg: React.FC<FigureProps> = ({ className = '', size }) => {
  return (
    <div className={`w-full flex flex-col items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 540 320"
        className="w-full h-auto select-none rounded-2xl bg-slate-900/95 p-2 sm:p-3 shadow-xl border border-slate-800"
        style={size ? { maxWidth: `${size}px` } : undefined}
      >
        {/* Fejléc */}
        <rect x="110" y="10" width="320" height="26" rx="13" fill="#1e293b" stroke="#334155" />
        <text x="270" y="27" fill="#38bdf8" fontSize="12" fontWeight="700" textAnchor="middle" letterSpacing="0.8">
          SI MÉRTÉKEGYSÉG-PREFIXUMOK SKÁLÁJA
        </text>

        {/* Nagy prefixumok (Makrovilág) */}
        <g transform="translate(20, 50)">
          <rect x="0" y="0" width="500" height="115" rx="10" fill="#0c4a6e/30" stroke="#0284c7" strokeWidth="1.2" />
          <text x="20" y="22" fill="#38bdf8" fontSize="11" fontWeight="bold">
            NAGY MENNYISÉGEK (POZITÍV KITEVŐK)
          </text>

          <g transform="translate(15, 36)">
            {/* Tera */}
            <rect x="0" y="0" width="105" height="65" rx="6" fill="#0f172a" stroke="#0369a1" />
            <text x="52" y="20" fill="#7dd3fc" fontSize="11" fontWeight="bold" textAnchor="middle">Tera (T)</text>
            <text x="52" y="40" fill="#f8fafc" fontSize="15" fontWeight="900" textAnchor="middle">10¹²</text>
            <text x="52" y="56" fill="#94a3b8" fontSize="9" textAnchor="middle">billió (TB)</text>

            {/* Giga */}
            <rect x="120" y="0" width="105" height="65" rx="6" fill="#0f172a" stroke="#0369a1" />
            <text x="172" y="20" fill="#7dd3fc" fontSize="11" fontWeight="bold" textAnchor="middle">Giga (G)</text>
            <text x="172" y="40" fill="#f8fafc" fontSize="15" fontWeight="900" textAnchor="middle">10⁹</text>
            <text x="172" y="56" fill="#94a3b8" fontSize="9" textAnchor="middle">milliárd (GB)</text>

            {/* Mega */}
            <rect x="240" y="0" width="105" height="65" rx="6" fill="#0f172a" stroke="#0369a1" />
            <text x="292" y="20" fill="#7dd3fc" fontSize="11" fontWeight="bold" textAnchor="middle">Mega (M)</text>
            <text x="292" y="40" fill="#f8fafc" fontSize="15" fontWeight="900" textAnchor="middle">10⁶</text>
            <text x="292" y="56" fill="#94a3b8" fontSize="9" textAnchor="middle">millió (MW)</text>

            {/* Kilo */}
            <rect x="360" y="0" width="105" height="65" rx="6" fill="#0f172a" stroke="#0369a1" />
            <text x="412" y="20" fill="#7dd3fc" fontSize="11" fontWeight="bold" textAnchor="middle">Kilo (k)</text>
            <text x="412" y="40" fill="#f8fafc" fontSize="15" fontWeight="900" textAnchor="middle">10³</text>
            <text x="412" y="56" fill="#94a3b8" fontSize="9" textAnchor="middle">ezer (km, kg)</text>
          </g>
        </g>

        {/* Kicsi prefixumok (Mikrovilág) */}
        <g transform="translate(20, 180)">
          <rect x="0" y="0" width="500" height="115" rx="10" fill="#4c0519/30" stroke="#e11d48" strokeWidth="1.2" />
          <text x="20" y="22" fill="#fb7185" fontSize="11" fontWeight="bold">
            KICSI MENNYISÉGEK (NEGATÍV KITEVŐK)
          </text>

          <g transform="translate(15, 36)">
            {/* Milli */}
            <rect x="0" y="0" width="105" height="65" rx="6" fill="#0f172a" stroke="#be123c" />
            <text x="52" y="20" fill="#fda4af" fontSize="11" fontWeight="bold" textAnchor="middle">Milli (m)</text>
            <text x="52" y="40" fill="#f8fafc" fontSize="15" fontWeight="900" textAnchor="middle">10⁻³</text>
            <text x="52" y="56" fill="#94a3b8" fontSize="9" textAnchor="middle">ezred (mm, mg)</text>

            {/* Mikro */}
            <rect x="120" y="0" width="105" height="65" rx="6" fill="#0f172a" stroke="#be123c" />
            <text x="172" y="20" fill="#fda4af" fontSize="11" fontWeight="bold" textAnchor="middle">Mikro (μ)</text>
            <text x="172" y="40" fill="#f8fafc" fontSize="15" fontWeight="900" textAnchor="middle">10⁻⁶</text>
            <text x="172" y="56" fill="#94a3b8" fontSize="9" textAnchor="middle">milliomod (μm)</text>

            {/* Nano */}
            <rect x="240" y="0" width="105" height="65" rx="6" fill="#0f172a" stroke="#be123c" />
            <text x="292" y="20" fill="#fda4af" fontSize="11" fontWeight="bold" textAnchor="middle">Nano (n)</text>
            <text x="292" y="40" fill="#f8fafc" fontSize="15" fontWeight="900" textAnchor="middle">10⁻⁹</text>
            <text x="292" y="56" fill="#94a3b8" fontSize="9" textAnchor="middle">milliárdod (nm)</text>

            {/* Piko */}
            <rect x="360" y="0" width="105" height="65" rx="6" fill="#0f172a" stroke="#be123c" />
            <text x="412" y="20" fill="#fda4af" fontSize="11" fontWeight="bold" textAnchor="middle">Piko (p)</text>
            <text x="412" y="40" fill="#f8fafc" fontSize="15" fontWeight="900" textAnchor="middle">10⁻¹²</text>
            <text x="412" y="56" fill="#94a3b8" fontSize="9" textAnchor="middle">billiomod (pm)</text>
          </g>
        </g>
      </svg>
    </div>
  );
};

// 3. Szorzás és osztás normálalakban és az újraigazítás
export const ScientificMultiplicationSvg: React.FC<FigureProps> = ({ className = '', size }) => {
  return (
    <div className={`w-full flex flex-col items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 540 310"
        className="w-full h-auto select-none rounded-2xl bg-slate-900/95 p-2 sm:p-3 shadow-xl border border-slate-800"
        style={size ? { maxWidth: `${size}px` } : undefined}
      >
        {/* Fejléc */}
        <rect x="90" y="10" width="360" height="26" rx="13" fill="#1e293b" stroke="#334155" />
        <text x="270" y="27" fill="#10b981" fontSize="12" fontWeight="700" textAnchor="middle" letterSpacing="0.8">
          SZORZÁS ÉS A MANTISSZA ÚJRAIGAZÍTÁSA
        </text>

        {/* Feladat */}
        <g transform="translate(20, 48)">
          <rect x="0" y="0" width="500" height="60" rx="10" fill="#0f172a" stroke="#334155" />
          <text x="25" y="36" fill="#94a3b8" fontSize="14">Számítás:</text>
          <text x="100" y="37" fill="#f8fafc" fontSize="18" fontWeight="bold">
            (4 · 10⁶) · (5 · 10⁴) = ?
          </text>
        </g>

        {/* 1. Lépés: Mantisszák szorzása és kitevők összeadása */}
        <g transform="translate(20, 118)">
          <rect x="0" y="0" width="500" height="74" rx="10" fill="#1e293b" stroke="#0284c7" strokeWidth="1" />
          <text x="25" y="25" fill="#7dd3fc" fontSize="11" fontWeight="bold">1. LÉPÉS: MANTISSZÁK ÉS HATVÁNYOK KÜLÖN SZORZÁSA:</text>
          <text x="25" y="52" fill="#f8fafc" fontSize="16" fontWeight="bold">
            = (4 · 5) · 10⁶⁺⁴ = <tspan fill="#f59e0b">20</tspan> · 10¹⁰
          </text>
          <text x="260" y="52" fill="#fca5a5" fontSize="12" fontWeight="bold">
            ⚠️ 20 ≥ 10, NEM SZABÁLYOS MANTISSZA!
          </text>
        </g>

        {/* 2. Lépés: Újraigazítás */}
        <g transform="translate(20, 202)">
          <rect x="0" y="0" width="500" height="95" rx="10" fill="#064e3b/40" stroke="#10b981" strokeWidth="1.5" />
          <text x="25" y="25" fill="#6ee7b7" fontSize="11" fontWeight="bold">2. LÉPÉS: TIZEDESVESSZŐ BALRA TOLÁSA (+1 KITEVŐ):</text>
          <text x="25" y="54" fill="#cbd5e1" fontSize="13">
            Mivel 20 = 2 · 10¹ ⟹ 20 · 10¹⁰ = (2 · 10¹) · 10¹⁰ =
          </text>
          <text x="25" y="82" fill="#34d399" fontSize="22" fontWeight="900">
            = 2 · 10¹¹
          </text>
          <text x="220" y="82" fill="#a7f3d0" fontSize="12" fontWeight="600">
            (Szabályos normálalak: 1 ≤ 2 &lt; 10)
          </text>
        </g>
      </svg>
    </div>
  );
};

// 4. Összeadás és kivonás normálalakban
export const ScientificAdditionSvg: React.FC<FigureProps> = ({ className = '', size }) => {
  return (
    <div className={`w-full flex flex-col items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 540 310"
        className="w-full h-auto select-none rounded-2xl bg-slate-900/95 p-2 sm:p-3 shadow-xl border border-slate-800"
        style={size ? { maxWidth: `${size}px` } : undefined}
      >
        {/* Fejléc */}
        <rect x="90" y="10" width="360" height="26" rx="13" fill="#1e293b" stroke="#334155" />
        <text x="270" y="27" fill="#818cf8" fontSize="12" fontWeight="700" textAnchor="middle" letterSpacing="0.8">
          ÖSSZEADÁS: KÖZÖS KITEVŐRE HOZÁS
        </text>

        {/* Feladat */}
        <g transform="translate(20, 48)">
          <rect x="0" y="0" width="500" height="54" rx="10" fill="#0f172a" stroke="#334155" />
          <text x="25" y="34" fill="#94a3b8" fontSize="13">Számítsd ki:</text>
          <text x="120" y="35" fill="#f8fafc" fontSize="17" fontWeight="bold">
            (4 · 10⁵) + (3 · 10⁴) = ?
          </text>
          <text x="360" y="34" fill="#fca5a5" fontSize="11" fontWeight="bold">Eltérő kitevők: 5 és 4!</text>
        </g>

        {/* Magyarázó lépés */}
        <g transform="translate(20, 112)">
          <rect x="0" y="0" width="500" height="80" rx="10" fill="#1e293b" stroke="#6366f1" strokeWidth="1" />
          <text x="25" y="24" fill="#a5b4fc" fontSize="11" fontWeight="bold">1. LÉPÉS: ALAKÍTSUK KÖZÖS (NAGYOBB) KITEVŐRE A KISEBBET:</text>
          <text x="25" y="48" fill="#cbd5e1" fontSize="13">
            3 · 10⁴ = 0,3 · 10⁵ &nbsp; <tspan fill="#94a3b8">(a tizedesvessző balra tolat, a kitevő 1-gyel nő)</tspan>
          </text>
          <text x="25" y="68" fill="#f8fafc" fontSize="14" fontWeight="600">
            Ekkor az összeg: (4 · 10⁵) + (0,3 · 10⁵)
          </text>
        </g>

        {/* Végeredmény kiemeléssel */}
        <g transform="translate(20, 202)">
          <rect x="0" y="0" width="500" height="95" rx="10" fill="#042f2e/60" stroke="#10b981" strokeWidth="1.5" />
          <text x="25" y="24" fill="#6ee7b7" fontSize="11" fontWeight="bold">2. LÉPÉS: KÖZÖS 10⁵ HATVÁNY KIEMELÉSE:</text>
          <text x="25" y="52" fill="#cbd5e1" fontSize="14">
            = (4 + 0,3) · 10⁵ =
          </text>
          <text x="25" y="82" fill="#34d399" fontSize="24" fontWeight="900">
            = 4,3 · 10⁵
          </text>
          <text x="220" y="80" fill="#a7f3d0" fontSize="12" fontWeight="600">
            (Hagyományos alakban: 400 000 + 30 000 = 430 000)
          </text>
        </g>
      </svg>
    </div>
  );
};

