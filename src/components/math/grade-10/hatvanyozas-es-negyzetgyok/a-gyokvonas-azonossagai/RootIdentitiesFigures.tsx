import React from 'react';

interface FigureProps {
  className?: string;
  size?: number;
}

// 1. A négyzetgyök definíciója és geometriai jelentése
export const SquareRootDefinitionSvg: React.FC<FigureProps> = ({ className = '', size }) => {
  return (
    <div className={`w-full flex flex-col items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 540 330"
        className="w-full h-auto select-none rounded-2xl bg-slate-900/95 p-2 sm:p-3 shadow-xl border border-slate-800"
        style={size ? { maxWidth: `${size}px` } : undefined}
      >
        <defs>
          <linearGradient id="rootDefGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2dd4bf" />
            <stop offset="100%" stopColor="#0d9488" />
          </linearGradient>
        </defs>

        {/* Fejléc */}
        <rect x="110" y="10" width="320" height="26" rx="13" fill="#1e293b" stroke="#334155" />
        <text x="270" y="27" fill="#2dd4bf" fontSize="12" fontWeight="700" textAnchor="middle" letterSpacing="0.8">
          A NÉGYZETGYÖK GEOMETRIAI JELENTÉSE
        </text>

        {/* Bal oldali ábra: Négyzet területtel és oldalhosszal */}
        <g transform="translate(25, 52)">
          {/* Négyzet */}
          <rect x="30" y="30" width="140" height="140" rx="8" fill="#134e4a/50" stroke="#14b8a6" strokeWidth="2" />
          
          {/* Terület középen */}
          <text x="100" y="95" fill="#5eead4" fontSize="13" fontWeight="bold" textAnchor="middle">
            Terület:
          </text>
          <text x="100" y="125" fill="#f8fafc" fontSize="28" fontWeight="900" textAnchor="middle">
            a
          </text>

          {/* Oldalhossz felül */}
          <text x="100" y="20" fill="#2dd4bf" fontSize="16" fontWeight="bold" textAnchor="middle">
            Oldalhossz: √a
          </text>
          {/* Oldalhossz balra */}
          <text x="15" y="105" fill="#2dd4bf" fontSize="16" fontWeight="bold" textAnchor="middle">
            √a
          </text>
        </g>

        {/* Jobb oldali definíciós doboz */}
        <g transform="translate(245, 52)">
          <rect x="0" y="0" width="270" height="255" rx="12" fill="#0f172a" stroke="#0f766e" strokeWidth="1.2" />
          <rect x="15" y="12" width="240" height="26" rx="6" fill="#134e4a" />
          <text x="135" y="29" fill="#2dd4bf" fontSize="11" fontWeight="bold" textAnchor="middle">
            PRECÍZ DEFINÍCIÓ
          </text>

          <text x="20" y="65" fill="#cbd5e1" fontSize="13">
            Olyan <tspan fill="#2dd4bf" fontWeight="bold">nemnegatív</tspan> szám, melynek
          </text>
          <text x="20" y="85" fill="#cbd5e1" fontSize="13">
            négyzete az <tspan fill="#f8fafc" fontWeight="bold">a</tspan> számmal egyenlő:
          </text>

          <rect x="20" y="102" width="230" height="48" rx="8" fill="#1e293b" stroke="#14b8a6" />
          <text x="135" y="133" fill="#f8fafc" fontSize="19" fontWeight="900" textAnchor="middle">
            (√a)² = a &nbsp; <tspan fontSize="13" fill="#5eead4">(és √a ≥ 0)</tspan>
          </text>

          {/* Két szigorú feltétel */}
          <g transform="translate(15, 162)">
            <rect x="0" y="0" width="240" height="78" rx="6" fill="#450a0a/40" stroke="#ef4444" strokeWidth="1" />
            <text x="12" y="22" fill="#fca5a5" fontSize="11" fontWeight="bold">
              ⚠️ SZIGORÚ SZABÁLYOK:
            </text>
            <text x="12" y="44" fill="#fecaca" fontSize="12">
              • Alapfeltétel: <tspan fontWeight="bold">a ≥ 0</tspan> (negatívnak nincs!)
            </text>
            <text x="12" y="66" fill="#fecaca" fontSize="12">
              • Érték: <tspan fontWeight="bold">√a ≥ 0</tspan> (a gyök sosem negatív!)
            </text>
          </g>
        </g>
      </svg>
    </div>
  );
};

// 2. A √(a²) = |a| fundamentális szabály
export const AbsoluteValueRootSvg: React.FC<FigureProps> = ({ className = '', size }) => {
  return (
    <div className={`w-full flex flex-col items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 540 320"
        className="w-full h-auto select-none rounded-2xl bg-slate-900/95 p-2 sm:p-3 shadow-xl border border-slate-800"
        style={size ? { maxWidth: `${size}px` } : undefined}
      >
        {/* Fejléc */}
        <rect x="90" y="10" width="360" height="26" rx="13" fill="#1e293b" stroke="#334155" />
        <text x="270" y="27" fill="#f59e0b" fontSize="12" fontWeight="700" textAnchor="middle" letterSpacing="0.8">
          A FUNDAMENTÁLIS AZONOSSÁG: √(a²) = |a|
        </text>

        {/* Felső központi tételkeret */}
        <g transform="translate(20, 48)">
          <rect x="0" y="0" width="500" height="74" rx="10" fill="#78350f/30" stroke="#f59e0b" strokeWidth="1.5" />
          <text x="250" y="32" fill="#fde68a" fontSize="13" fontWeight="bold" textAnchor="middle">
            BÁRMELY VALÓS SZÁM (a ∈ ℝ) NÉGYZETÉNEK GYÖKE:
          </text>
          <text x="250" y="60" fill="#f8fafc" fontSize="24" fontWeight="900" textAnchor="middle">
            √(a²) = <tspan fill="#f59e0b">|a|</tspan> &nbsp; <tspan fontSize="16" fill="#fde68a">(NEM simán a!)</tspan>
          </text>
        </g>

        {/* Két oszlop: Pozitív alap vs Negatív alap */}
        <g transform="translate(20, 134)">
          {/* Bal oszlop: a = +5 */}
          <rect x="0" y="0" width="240" height="165" rx="10" fill="#1e293b" stroke="#10b981" strokeWidth="1.2" />
          <rect x="15" y="12" width="210" height="24" rx="5" fill="#064e3b" />
          <text x="120" y="28" fill="#6ee7b7" fontSize="11" fontWeight="bold" textAnchor="middle">
            1. ESET: a = +5 (POZITÍV SZÁM)
          </text>

          <text x="25" y="65" fill="#cbd5e1" fontSize="14">
            √((+5)²) = √(25) = <tspan fill="#34d399" fontWeight="900">5</tspan>
          </text>
          <text x="25" y="95" fill="#94a3b8" fontSize="12">
            Mivel a = 5 pozitív:
          </text>
          <text x="25" y="120" fill="#6ee7b7" fontSize="14" fontWeight="bold">
            |5| = 5 = a
          </text>
          <text x="25" y="145" fill="#94a3b8" fontSize="11">
            (Itt úgy tűnik, a gyök és a négyzet kiejti egymást)
          </text>

          {/* Jobb oszlop: a = -5 (A CSAPDA!) */}
          <rect x="260" y="0" width="240" height="165" rx="10" fill="#1e293b" stroke="#ef4444" strokeWidth="1.2" />
          <rect x="275" y="12" width="210" height="24" rx="5" fill="#7f1d1d" />
          <text x="380" y="28" fill="#fca5a5" fontSize="11" fontWeight="bold" textAnchor="middle">
            2. ESET: a = -5 (A HALÁLOS CSAPDA!)
          </text>

          <text x="285" y="65" fill="#cbd5e1" fontSize="14">
            √((-5)²) = √(25) = <tspan fill="#34d399" fontWeight="900">+5</tspan> &nbsp; <tspan fill="#ef4444" fontWeight="bold">≠ -5</tspan>!
          </text>
          <text x="285" y="95" fill="#94a3b8" fontSize="12">
            Mivel a négyzetgyök definíció szerint:
          </text>
          <text x="285" y="120" fill="#fca5a5" fontSize="14" fontWeight="bold">
            |-5| = +5 = -a
          </text>
          <text x="285" y="145" fill="#f87171" fontSize="11">
            ❌ Hiba: √((-5)²) = -5 LEHETETLEN!
          </text>
        </g>
      </svg>
    </div>
  );
};

// 3. Szorzat és hányados négyzetgyöke
export const ProductAndQuotientRootSvg: React.FC<FigureProps> = ({ className = '', size }) => {
  return (
    <div className={`w-full flex flex-col items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 540 310"
        className="w-full h-auto select-none rounded-2xl bg-slate-900/95 p-2 sm:p-3 shadow-xl border border-slate-800"
        style={size ? { maxWidth: `${size}px` } : undefined}
      >
        {/* Fejléc */}
        <rect x="100" y="10" width="340" height="26" rx="13" fill="#1e293b" stroke="#334155" />
        <text x="270" y="27" fill="#38bdf8" fontSize="12" fontWeight="700" textAnchor="middle" letterSpacing="0.8">
          SZORZAT ÉS HÁNYADOS NÉGYZETGYÖKE
        </text>

        {/* 1. Szorzat gyöke */}
        <g transform="translate(20, 48)">
          <rect x="0" y="0" width="500" height="115" rx="10" fill="#0c4a6e/30" stroke="#0284c7" strokeWidth="1.2" />
          <text x="25" y="26" fill="#7dd3fc" fontSize="12" fontWeight="bold">
            1. TÉTEL: SZORZAT NÉGYZETGYÖKE (a, b ≥ 0)
          </text>

          <text x="25" y="62" fill="#f8fafc" fontSize="22" fontWeight="900">
            √(a · b) = √a · √b
          </text>

          <rect x="260" y="38" width="215" height="60" rx="8" fill="#0f172a" stroke="#0369a1" />
          <text x="367" y="60" fill="#94a3b8" fontSize="11" textAnchor="middle">Számolási példa:</text>
          <text x="367" y="82" fill="#38bdf8" fontSize="15" fontWeight="bold" textAnchor="middle">
            √(4 · 9) = √4 · √9 = 2 · 3 = 6
          </text>
        </g>

        {/* 2. Hányados gyöke */}
        <g transform="translate(20, 175)">
          <rect x="0" y="0" width="500" height="115" rx="10" fill="#064e3b/30" stroke="#10b981" strokeWidth="1.2" />
          <text x="25" y="26" fill="#6ee7b7" fontSize="12" fontWeight="bold">
            2. TÉTEL: HÁNYADOS (TÖRT) NÉGYZETGYÖKE (a ≥ 0, b &gt; 0)
          </text>

          <text x="25" y="62" fill="#f8fafc" fontSize="22" fontWeight="900">
            √(a / b) = √a / √b
          </text>

          <rect x="260" y="38" width="215" height="60" rx="8" fill="#0f172a" stroke="#059669" />
          <text x="367" y="60" fill="#94a3b8" fontSize="11" textAnchor="middle">Számolási példa:</text>
          <text x="367" y="82" fill="#34d399" fontSize="15" fontWeight="bold" textAnchor="middle">
            √(25 / 16) = √25 / √16 = 5 / 4 = 1,25
          </text>
        </g>
      </svg>
    </div>
  );
};

// 4. Az összeg gyökének csapdája
export const RootSumTrapSvg: React.FC<FigureProps> = ({ className = '', size }) => {
  return (
    <div className={`w-full flex flex-col items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 540 310"
        className="w-full h-auto select-none rounded-2xl bg-slate-900/95 p-2 sm:p-3 shadow-xl border border-slate-800"
        style={size ? { maxWidth: `${size}px` } : undefined}
      >
        {/* Fejléc */}
        <rect x="80" y="10" width="380" height="26" rx="13" fill="#1e293b" stroke="#334155" />
        <text x="270" y="27" fill="#f43f5e" fontSize="12" fontWeight="700" textAnchor="middle" letterSpacing="0.8">
          VÉGZETES HIBA: AZ ÖSSZEG GYÖKE NEM AZONOSSÁG!
        </text>

        {/* Tilos jelzés */}
        <g transform="translate(20, 48)">
          <rect x="0" y="0" width="500" height="72" rx="10" fill="#450a0a/60" stroke="#ef4444" strokeWidth="1.5" />
          <text x="25" y="30" fill="#fca5a5" fontSize="12" fontWeight="bold">
            ❌ TILTOTT MŰVELET – ÖSSZEGET ÉS KÜLÖNBSÉGET TAGONKÉNT GYÖKÖZNI TILOS:
          </text>
          <text x="250" y="58" fill="#f8fafc" fontSize="22" fontWeight="900" textAnchor="middle">
            √(a + b) <tspan fill="#ef4444">≠</tspan> √a + √b &nbsp; és &nbsp; √(a - b) <tspan fill="#ef4444">≠</tspan> √a - √b
          </text>
        </g>

        {/* Konkrét numerikus ellenpélda */}
        <g transform="translate(20, 132)">
          <rect x="0" y="0" width="500" height="155" rx="10" fill="#1e293b" stroke="#334155" />
          <text x="250" y="26" fill="#cbd5e1" fontSize="12" fontWeight="bold" textAnchor="middle">
            KLASSZIKUS ELLENPÉLDA (a = 9, b = 16):
          </text>

          {/* Bal oldal: Helyes műveleti sorrend */}
          <g transform="translate(25, 42)">
            <rect x="0" y="0" width="210" height="95" rx="8" fill="#064e3b/60" stroke="#10b981" />
            <text x="105" y="24" fill="#6ee7b7" fontSize="11" fontWeight="bold" textAnchor="middle">
              ✓ HELYES SZÁMÍTÁS:
            </text>
            <text x="105" y="52" fill="#f8fafc" fontSize="15" fontWeight="bold" textAnchor="middle">
              √(9 + 16) = √(25)
            </text>
            <text x="105" y="80" fill="#34d399" fontSize="24" fontWeight="900" textAnchor="middle">
              = 5
            </text>
          </g>

          {/* Áthúzott egyenlőségjel középen */}
          <text x="250" y="98" fill="#ef4444" fontSize="32" fontWeight="900" textAnchor="middle">
            ≠
          </text>

          {/* Jobb oldal: Hibás tagonkénti gyökvonás */}
          <g transform="translate(265, 42)">
            <rect x="0" y="0" width="210" height="95" rx="8" fill="#450a0a/60" stroke="#ef4444" />
            <text x="105" y="24" fill="#fca5a5" fontSize="11" fontWeight="bold" textAnchor="middle">
              ❌ HIBÁS TAGONKÉNTI GYÖK:
            </text>
            <text x="105" y="52" fill="#f8fafc" fontSize="15" fontWeight="bold" textAnchor="middle">
              √9 + √16 = 3 + 4
            </text>
            <text x="105" y="80" fill="#f87171" fontSize="24" fontWeight="900" textAnchor="middle">
              = 7
            </text>
          </g>
        </g>
      </svg>
    </div>
  );
};
