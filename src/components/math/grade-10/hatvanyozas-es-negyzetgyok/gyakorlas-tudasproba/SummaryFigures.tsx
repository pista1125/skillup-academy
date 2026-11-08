import React from 'react';

interface FigureProps {
  className?: string;
  size?: number;
}

// 1. Azonosságok összehasonlító szintézise: Hatványozás vs. Gyökvonás
export const ChapterIdentitiesMapSvg: React.FC<FigureProps> = ({ className = '', size }) => {
  return (
    <div className={`w-full flex flex-col items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 840 280"
        className="w-full h-auto max-h-[300px] select-none"
        style={size ? { maxWidth: `${size}px` } : undefined}
      >
        <defs>
          <linearGradient id="sumGradBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#1e293b" />
          </linearGradient>
        </defs>

        <rect x="15" y="15" width="810" height="250" rx="20" fill="url(#sumGradBg)" stroke="#334155" strokeWidth="2" />

        <text x="420" y="45" fill="#f8fafc" fontSize="16" fontWeight="bold" textAnchor="middle" letterSpacing="1">
          FEJEZETI SZINTÉZIS: HATVÁNYOZÁS ÉS NÉGYZETGYÖK AZONOSSÁGAI
        </text>

        {/* Bal oldali oszlop: Hatványozás */}
        <g transform="translate(45, 65)">
          <rect x="0" y="0" width="350" height="180" rx="14" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
          <text x="175" y="28" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle">
            HATVÁNYOZÁS AZONOSSÁGAI
          </text>

          <g transform="translate(20, 42)">
            <rect x="0" y="0" width="310" height="28" rx="6" fill="#0f172a" />
            <text x="155" y="18" fill="#f8fafc" fontSize="12" fontFamily="monospace" textAnchor="middle">
              aⁿ · aᵐ = aⁿ⁺ᵐ   |   aⁿ : aᵐ = aⁿ⁻ᵐ
            </text>
          </g>
          <g transform="translate(20, 76)">
            <rect x="0" y="0" width="310" height="28" rx="6" fill="#0f172a" />
            <text x="155" y="18" fill="#f8fafc" fontSize="12" fontFamily="monospace" textAnchor="middle">
              (a · b)ⁿ = aⁿ · bⁿ   |   (a / b)ⁿ = aⁿ / bⁿ
            </text>
          </g>
          <g transform="translate(20, 110)">
            <rect x="0" y="0" width="310" height="28" rx="6" fill="#0f172a" />
            <text x="155" y="18" fill="#f8fafc" fontSize="11" fontFamily="monospace" textAnchor="middle">
              (aⁿ)ᵐ = aⁿᵐ   |   a⁻ⁿ = 1 / aⁿ   |   a⁰ = 1
            </text>
          </g>
          <g transform="translate(20, 144)">
            <rect x="0" y="0" width="310" height="24" rx="4" fill="#0369a1" />
            <text x="155" y="16" fill="#e0f2fe" fontSize="11" fontWeight="bold" textAnchor="middle">
              Alapszabály: 0⁰ és 0⁻ⁿ NEM értelmezett!
            </text>
          </g>
        </g>

        {/* Jobb oldali oszlop: Négyzetgyökvonás */}
        <g transform="translate(445, 65)">
          <rect x="0" y="0" width="350" height="180" rx="14" fill="#1e293b" stroke="#f43f5e" strokeWidth="1.5" />
          <text x="175" y="28" fill="#fb7185" fontSize="13" fontWeight="bold" textAnchor="middle">
            NÉGYZETGYÖKVONÁS AZONOSSÁGAI
          </text>

          <g transform="translate(20, 42)">
            <rect x="0" y="0" width="310" height="28" rx="6" fill="#0f172a" />
            <text x="155" y="18" fill="#f8fafc" fontSize="12" fontFamily="monospace" textAnchor="middle">
              √(a · b) = √a · √b   (a, b ≥ 0)
            </text>
          </g>
          <g transform="translate(20, 76)">
            <rect x="0" y="0" width="310" height="28" rx="6" fill="#0f172a" />
            <text x="155" y="18" fill="#f8fafc" fontSize="12" fontFamily="monospace" textAnchor="middle">
              √(a / b) = √a / √b   (a ≥ 0, b &gt; 0)
            </text>
          </g>
          <g transform="translate(20, 110)">
            <rect x="0" y="0" width="310" height="28" rx="6" fill="#0f172a" />
            <text x="155" y="18" fill="#f8fafc" fontSize="12" fontFamily="monospace" textAnchor="middle">
              √(a²) = |a|   (minden valós számra!)
            </text>
          </g>
          <g transform="translate(20, 144)">
            <rect x="0" y="0" width="310" height="24" rx="4" fill="#881337" />
            <text x="155" y="16" fill="#ffe4e6" fontSize="11" fontWeight="bold" textAnchor="middle">
              Tilos: √(a + b) ≠ √a + √b! Összegre nem tagolható!
            </text>
          </g>
        </g>
      </svg>
      <p className="mt-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400 italic text-center">
        1. ábra: A hatványozás és a gyökvonás párhuzamos műveleti szabályai és alapfeltételei
      </p>
    </div>
  );
};

// 2. A 4 Leggyakoribb érettségi buktató
export const FourClassicTrapsSvg: React.FC<FigureProps> = ({ className = '', size }) => {
  return (
    <div className={`w-full flex flex-col items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 840 280"
        className="w-full h-auto max-h-[300px] select-none"
        style={size ? { maxWidth: `${size}px` } : undefined}
      >
        <defs>
          <linearGradient id="trap4GradBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#1e293b" />
          </linearGradient>
        </defs>

        <rect x="15" y="15" width="810" height="250" rx="20" fill="url(#trap4GradBg)" stroke="#334155" strokeWidth="2" />

        <text x="420" y="45" fill="#f8fafc" fontSize="16" fontWeight="bold" textAnchor="middle" letterSpacing="1">
          A 4 LEGGYAKORIBB ÉRETTSÉGI ÉS DOLGOZATBELI BUKTATÓ
        </text>

        {/* 4 kártya grid */}
        <g transform="translate(35, 65)">
          {/* 1. Csapda: Zárójel hiánya */}
          <g transform="translate(0, 0)">
            <rect x="0" y="0" width="180" height="175" rx="12" fill="#1e293b" stroke="#f43f5e" strokeWidth="1.5" />
            <text x="90" y="24" fill="#fb7185" fontSize="11" fontWeight="bold" textAnchor="middle">1. ZÁRÓJELCSAPDA</text>
            <rect x="10" y="36" width="160" height="48" rx="6" fill="#0f172a" />
            <text x="90" y="55" fill="#f8fafc" fontSize="11" fontFamily="monospace" textAnchor="middle">(-3)² = +9</text>
            <text x="90" y="73" fill="#f43f5e" fontSize="11" fontFamily="monospace" fontWeight="bold" textAnchor="middle">-3² = -9</text>
            <text x="90" y="105" fill="#cbd5e1" fontSize="10" textAnchor="middle">Zárójel nélkül a kitevő</text>
            <text x="90" y="120" fill="#cbd5e1" fontSize="10" textAnchor="middle">csak a 3-ra hat!</text>
            <rect x="10" y="135" width="160" height="26" rx="4" fill="#881337" />
            <text x="90" y="152" fill="#fecdd3" fontSize="10" fontWeight="bold" textAnchor="middle">(-3)² ≠ -3²</text>
          </g>

          {/* 2. Csapda: Negatív kitevő */}
          <g transform="translate(195, 0)">
            <rect x="0" y="0" width="180" height="175" rx="12" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
            <text x="90" y="24" fill="#fbbf24" fontSize="11" fontWeight="bold" textAnchor="middle">2. NEGATÍV KITEVŐ</text>
            <rect x="10" y="36" width="160" height="48" rx="6" fill="#0f172a" />
            <text x="90" y="55" fill="#34d399" fontSize="11" fontFamily="monospace" fontWeight="bold" textAnchor="middle">2⁻³ = 1 / 2³ = 1/8</text>
            <text x="90" y="73" fill="#f43f5e" fontSize="11" fontFamily="monospace" textAnchor="middle">2⁻³ ≠ -8 ❌</text>
            <text x="90" y="105" fill="#cbd5e1" fontSize="10" textAnchor="middle">A negatív kitevő</text>
            <text x="90" y="120" fill="#cbd5e1" fontSize="10" textAnchor="middle">reciprokot jelent, nem mínuszt!</text>
            <rect x="10" y="135" width="160" height="26" rx="4" fill="#78350f" />
            <text x="90" y="152" fill="#fef3c7" fontSize="10" fontWeight="bold" textAnchor="middle">a⁻ⁿ = 1 / aⁿ</text>
          </g>

          {/* 3. Csapda: Összeg gyöke */}
          <g transform="translate(390, 0)">
            <rect x="0" y="0" width="180" height="175" rx="12" fill="#1e293b" stroke="#ec4899" strokeWidth="1.5" />
            <text x="90" y="24" fill="#f472b6" fontSize="11" fontWeight="bold" textAnchor="middle">3. ÖSSZEG GYÖKE</text>
            <rect x="10" y="36" width="160" height="48" rx="6" fill="#0f172a" />
            <text x="90" y="55" fill="#34d399" fontSize="10" fontFamily="monospace" textAnchor="middle">√(9 + 16) = √25 = 5</text>
            <text x="90" y="73" fill="#f43f5e" fontSize="10" fontFamily="monospace" textAnchor="middle">√9 + √16 = 3 + 4 = 7</text>
            <text x="90" y="105" fill="#cbd5e1" fontSize="10" textAnchor="middle">Összeget és különbséget</text>
            <text x="90" y="120" fill="#cbd5e1" fontSize="10" textAnchor="middle">tilos tagonként gyökölni!</text>
            <rect x="10" y="135" width="160" height="26" rx="4" fill="#831843" />
            <text x="90" y="152" fill="#fce7f3" fontSize="10" fontWeight="bold" textAnchor="middle">√(a + b) ≠ √a + √b</text>
          </g>

          {/* 4. Csapda: Abszolútérték elhagyása */}
          <g transform="translate(585, 0)">
            <rect x="0" y="0" width="185" height="175" rx="12" fill="#1e293b" stroke="#8b5cf6" strokeWidth="1.5" />
            <text x="92" y="24" fill="#c4b5fd" fontSize="11" fontWeight="bold" textAnchor="middle">4. √(a²) = |a|</text>
            <rect x="10" y="36" width="165" height="48" rx="6" fill="#0f172a" />
            <text x="92" y="55" fill="#34d399" fontSize="10" fontFamily="monospace" textAnchor="middle">√((-5)²) = |-5| = 5</text>
            <text x="92" y="73" fill="#f43f5e" fontSize="10" fontFamily="monospace" textAnchor="middle">√((-5)²) ≠ -5 ❌</text>
            <text x="92" y="105" fill="#cbd5e1" fontSize="10" textAnchor="middle">A négyzetgyök értéke</text>
            <text x="92" y="120" fill="#cbd5e1" fontSize="10" textAnchor="middle">sosem lehet negatív!</text>
            <rect x="10" y="135" width="165" height="26" rx="4" fill="#2e1065" />
            <text x="92" y="152" fill="#ede9fe" fontSize="10" fontWeight="bold" textAnchor="middle">√(a²) = |a|</text>
          </g>
        </g>
      </svg>
      <p className="mt-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400 italic text-center">
        2. ábra: A négyzetgyök és hatványozás témakörének 4 kritikus vizsgacsapdája
      </p>
    </div>
  );
};

// 3. Normálalak és SI prefixumok összefoglaló
export const ScientificSummarySvg: React.FC<FigureProps> = ({ className = '', size }) => {
  return (
    <div className={`w-full flex flex-col items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 840 280"
        className="w-full h-auto max-h-[300px] select-none"
        style={size ? { maxWidth: `${size}px` } : undefined}
      >
        <defs>
          <linearGradient id="scisumGradBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#1e293b" />
          </linearGradient>
        </defs>

        <rect x="15" y="15" width="810" height="250" rx="20" fill="url(#scisumGradBg)" stroke="#334155" strokeWidth="2" />

        <text x="420" y="45" fill="#f8fafc" fontSize="16" fontWeight="bold" textAnchor="middle" letterSpacing="1">
          NORMÁLALAK: a · 10ᵏ &nbsp;(1 ≤ |a| &lt; 10, k ∈ ℤ) ÉS SI ELŐTAGOK
        </text>

        {/* 1. Bal: Mantissza szabály */}
        <g transform="translate(45, 65)">
          <rect x="0" y="0" width="350" height="180" rx="14" fill="#1e293b" stroke="#10b981" strokeWidth="1.5" />
          <text x="175" y="28" fill="#34d399" fontSize="13" fontWeight="bold" textAnchor="middle">
            A SZABÁLYOS NORMÁLALAK KÖVETELMÉNYE
          </text>
          <text x="25" y="55" fill="#94a3b8" fontSize="12">A tizedesvessző előtt PONTOSAN 1 nem nulla jegy állhat:</text>

          <rect x="25" y="68" width="300" height="52" rx="8" fill="#0f172a" />
          <text x="40" y="90" fill="#34d399" fontSize="13" fontFamily="monospace" fontWeight="bold">
            ✔ 3,84 · 10⁵ &nbsp;(1 ≤ 3,84 &lt; 10)
          </text>
          <text x="40" y="110" fill="#f43f5e" fontSize="13" fontFamily="monospace">
            ❌ 38,4 · 10⁴ vagy 0,384 · 10⁶
          </text>

          <rect x="25" y="130" width="300" height="35" rx="6" fill="#064e3b" />
          <text x="175" y="152" fill="#a7f3d0" fontSize="12" fontWeight="bold" textAnchor="middle">
            Ha balra visszük a vesszőt: k nő (+1). Jobbra: k csökken (-1).
          </text>
        </g>

        {/* 2. Jobb: SI prefixumok gyorsáttekintése */}
        <g transform="translate(445, 65)">
          <rect x="0" y="0" width="350" height="180" rx="14" fill="#1e293b" stroke="#6366f1" strokeWidth="1.5" />
          <text x="175" y="28" fill="#818cf8" fontSize="13" fontWeight="bold" textAnchor="middle">
            SI PREFIXUMOK GYORSKÓDTÁRA
          </text>

          <g transform="translate(20, 42)">
            <rect x="0" y="0" width="145" height="52" rx="6" fill="#0f172a" />
            <text x="15" y="22" fill="#38bdf8" fontSize="11" fontWeight="bold">Tera (T): 10¹²</text>
            <text x="15" y="42" fill="#38bdf8" fontSize="11" fontWeight="bold">Giga (G): 10⁹</text>
          </g>
          <g transform="translate(185, 42)">
            <rect x="0" y="0" width="145" height="52" rx="6" fill="#0f172a" />
            <text x="15" y="22" fill="#34d399" fontSize="11" fontWeight="bold">Mega (M): 10⁶</text>
            <text x="15" y="42" fill="#34d399" fontSize="11" fontWeight="bold">Kilo (k): 10³</text>
          </g>
          <g transform="translate(20, 102)">
            <rect x="0" y="0" width="145" height="52" rx="6" fill="#0f172a" />
            <text x="15" y="22" fill="#fbbf24" fontSize="11" fontWeight="bold">milli (m): 10⁻³</text>
            <text x="15" y="42" fill="#fbbf24" fontSize="11" fontWeight="bold">mikro (μ): 10⁻⁶</text>
          </g>
          <g transform="translate(185, 102)">
            <rect x="0" y="0" width="145" height="52" rx="6" fill="#0f172a" />
            <text x="15" y="22" fill="#f43f5e" fontSize="11" fontWeight="bold">nano (n): 10⁻⁹</text>
            <text x="15" y="42" fill="#f43f5e" fontSize="11" fontWeight="bold">piko (p): 10⁻¹²</text>
          </g>
        </g>
      </svg>
      <p className="mt-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400 italic text-center">
        3. ábra: A normálalak szabályos felírása és a gyakorlatban használt SI nagyságrendi prefixumok
      </p>
    </div>
  );
};

// 4. Gyökös átalakítások folyamatábrája
export const RadicalTransformationsPipelineSvg: React.FC<FigureProps> = ({ className = '', size }) => {
  return (
    <div className={`w-full flex flex-col items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 840 280"
        className="w-full h-auto max-h-[300px] select-none"
        style={size ? { maxWidth: `${size}px` } : undefined}
      >
        <defs>
          <linearGradient id="pipeGradBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#1e293b" />
          </linearGradient>
        </defs>

        <rect x="15" y="15" width="810" height="250" rx="20" fill="url(#pipeGradBg)" stroke="#334155" strokeWidth="2" />

        <text x="420" y="45" fill="#f8fafc" fontSize="16" fontWeight="bold" textAnchor="middle" letterSpacing="1">
          NÉGYZETGYÖKÖS ÁTALAKÍTÁSOK ESZKÖZTÁRA
        </text>

        {/* 3 nagy oszlop */}
        <g transform="translate(45, 65)">
          {/* 1. Kiemelés */}
          <g transform="translate(0, 0)">
            <rect x="0" y="0" width="230" height="180" rx="14" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
            <text x="115" y="26" fill="#fbbf24" fontSize="12" fontWeight="bold" textAnchor="middle">1. RÉSZLEGES GYÖKVONÁS</text>
            <text x="115" y="48" fill="#94a3b8" fontSize="11" textAnchor="middle">√(a² · b) = a√b</text>

            <rect x="15" y="60" width="200" height="50" rx="6" fill="#0f172a" />
            <text x="115" y="82" fill="#cbd5e1" fontSize="12" fontFamily="monospace" textAnchor="middle">√72 = √(36·2)</text>
            <text x="115" y="100" fill="#fbbf24" fontSize="13" fontFamily="monospace" fontWeight="bold" textAnchor="middle">= 6√2</text>

            <text x="115" y="132" fill="#cbd5e1" fontSize="10" textAnchor="middle">Cél: egynemű gyökök</text>
            <text x="115" y="148" fill="#a7f3d0" fontSize="10" fontWeight="bold" textAnchor="middle">összevonhatósága!</text>
          </g>

          {/* 2. Bevitel */}
          <g transform="translate(260, 0)">
            <rect x="0" y="0" width="230" height="180" rx="14" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
            <text x="115" y="26" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">2. BEVITEL GYÖKJEL ALÁ</text>
            <text x="115" y="48" fill="#94a3b8" fontSize="11" textAnchor="middle">a√b = √(a²b) (a ≥ 0)</text>

            <rect x="15" y="60" width="200" height="50" rx="6" fill="#0f172a" />
            <text x="115" y="82" fill="#cbd5e1" fontSize="12" fontFamily="monospace" textAnchor="middle">3√5 = √(9·5)</text>
            <text x="115" y="100" fill="#38bdf8" fontSize="13" fontFamily="monospace" fontWeight="bold" textAnchor="middle">= √45</text>

            <text x="115" y="132" fill="#cbd5e1" fontSize="10" textAnchor="middle">Cél: nagyságrendi</text>
            <text x="115" y="148" fill="#bae6fd" fontSize="10" fontWeight="bold" textAnchor="middle">pontos összehasonlítás!</text>
          </g>

          {/* 3. Gyöktelenítés */}
          <g transform="translate(520, 0)">
            <rect x="0" y="0" width="230" height="180" rx="14" fill="#1e293b" stroke="#10b981" strokeWidth="1.5" />
            <text x="115" y="26" fill="#34d399" fontSize="12" fontWeight="bold" textAnchor="middle">3. NEVEZŐ GYÖKTELENÍTÉSE</text>
            <text x="115" y="48" fill="#94a3b8" fontSize="11" textAnchor="middle">Racionális nevezőre hozás</text>

            <rect x="15" y="60" width="200" height="50" rx="6" fill="#0f172a" />
            <text x="115" y="82" fill="#cbd5e1" fontSize="11" fontFamily="monospace" textAnchor="middle">6 / √3 = 6√3 / 3 = 2√3</text>
            <text x="115" y="100" fill="#34d399" fontSize="11" fontFamily="monospace" fontWeight="bold" textAnchor="middle">c / (√a+b) · konjugált</text>

            <text x="115" y="132" fill="#cbd5e1" fontSize="10" textAnchor="middle">Cél: könnyebb osztás</text>
            <text x="115" y="148" fill="#a7f3d0" fontSize="10" fontWeight="bold" textAnchor="middle">és kerekíthetőség!</text>
          </g>
        </g>
      </svg>
      <p className="mt-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400 italic text-center">
        4. ábra: A három legfontosabb technikai átalakítás összefoglaló folyamatábrája
      </p>
    </div>
  );
};

