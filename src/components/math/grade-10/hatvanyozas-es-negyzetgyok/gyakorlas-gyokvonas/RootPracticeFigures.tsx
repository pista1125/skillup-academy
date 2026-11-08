import React from 'react';

interface FigureProps {
  className?: string;
  size?: number;
}

// 1. Értelmezési tartomány és kikötések meghatározása
export const RootDomainAndConditionsSvg: React.FC<FigureProps> = ({ className = '', size }) => {
  return (
    <div className={`w-full flex flex-col items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 840 280"
        className="w-full h-auto max-h-[300px] select-none"
        style={size ? { maxWidth: `${size}px` } : undefined}
      >
        <defs>
          <linearGradient id="domGradBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#1e293b" />
          </linearGradient>
          <filter id="shadowBoxDom" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodOpacity="0.4" />
          </filter>
        </defs>

        <rect x="15" y="15" width="810" height="250" rx="20" fill="url(#domGradBg)" stroke="#334155" strokeWidth="2" filter="url(#shadowBoxDom)" />

        <text x="420" y="45" fill="#f8fafc" fontSize="16" fontWeight="bold" textAnchor="middle" letterSpacing="1">
          ÉRTELMEZÉSI TARTOMÁNY ÉS KIKÖTÉSEK GYÖKÖS KIFEJEZÉSEKNÉL
        </text>

        {/* 1. Eset: Számlálóban / szabadon álló gyök: f(x) ≥ 0 */}
        <g transform="translate(45, 65)">
          <rect x="0" y="0" width="345" height="180" rx="14" fill="#1e293b" stroke="#8b5cf6" strokeWidth="1.5" />
          <text x="172" y="28" fill="#c4b5fd" fontSize="13" fontWeight="bold" textAnchor="middle">
            1. ESET: Kifejezés számlálóban vagy külön
          </text>

          <rect x="25" y="45" width="295" height="40" rx="8" fill="#0f172a" />
          <text x="172" y="70" fill="#f8fafc" fontSize="15" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
            √(2x - 6) &nbsp;⇒&nbsp; <tspan fill="#34d399">2x - 6 ≥ 0</tspan>
          </text>

          {/* Számegyenes vizualizáció */}
          <line x1="35" y1="120" x2="310" y2="120" stroke="#64748b" strokeWidth="2" />
          <path d="M 310 120 L 300 115 M 310 120 L 300 125" stroke="#64748b" strokeWidth="2" />

          {/* x ≥ 3 kiemelt szakasz */}
          <line x1="145" y1="120" x2="305" y2="120" stroke="#8b5cf6" strokeWidth="4" />
          <circle cx="145" cy="120" r="6" fill="#8b5cf6" stroke="#ffffff" strokeWidth="2" />
          <text x="145" y="142" fill="#c4b5fd" fontSize="12" fontWeight="bold" textAnchor="middle">x = 3 (zárt pont!)</text>

          <rect x="25" y="152" width="295" height="22" rx="4" fill="#2e1065" />
          <text x="172" y="167" fill="#ddd6fe" fontSize="11" fontWeight="bold" textAnchor="middle">
            Kikötés: 2x ≥ 6 ⇒ x ≥ 3 (x ∈ [3; ∞[)
          </text>
        </g>

        {/* 2. Eset: Nevezőben álló gyök: g(x) > 0 */}
        <g transform="translate(450, 65)">
          <rect x="0" y="0" width="345" height="180" rx="14" fill="#1e293b" stroke="#ec4899" strokeWidth="1.5" />
          <text x="172" y="28" fill="#f472b6" fontSize="13" fontWeight="bold" textAnchor="middle">
            2. ESET: Gyök a tört nevezőjében
          </text>

          <rect x="25" y="45" width="295" height="40" rx="8" fill="#0f172a" />
          <text x="172" y="70" fill="#f8fafc" fontSize="15" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
            1 / √(5 - x) &nbsp;⇒&nbsp; <tspan fill="#f43f5e">5 - x &gt; 0</tspan>
          </text>

          {/* Számegyenes vizualizáció */}
          <line x1="35" y1="120" x2="310" y2="120" stroke="#64748b" strokeWidth="2" />
          <path d="M 310 120 L 300 115 M 310 120 L 300 125" stroke="#64748b" strokeWidth="2" />

          {/* x < 5 nyitott szakasz */}
          <line x1="40" y1="120" x2="200" y2="120" stroke="#ec4899" strokeWidth="4" />
          <circle cx="200" cy="120" r="6" fill="#1e293b" stroke="#ec4899" strokeWidth="2.5" />
          <text x="200" y="142" fill="#f472b6" fontSize="12" fontWeight="bold" textAnchor="middle">x = 5 (nyílt karika: 0 tilos!)</text>

          <rect x="25" y="152" width="295" height="22" rx="4" fill="#831843" />
          <text x="172" y="167" fill="#fbcfe8" fontSize="11" fontWeight="bold" textAnchor="middle">
            Kikötés: 5 &gt; x ⇒ x &lt; 5 (x ∈ ]-∞; 5[)
          </text>
        </g>
      </svg>
      <p className="mt-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400 italic text-center">
        1. ábra: Értelmezési tartomány: gyök alatt nemnegatív (≥ 0), de nevezőben szigorúan pozitív (&gt; 0)!
      </p>
    </div>
  );
};

// 2. Nevezetes azonosságok alkalmazása gyökökkel
export const RootIdentitiesApplicationSvg: React.FC<FigureProps> = ({ className = '', size }) => {
  return (
    <div className={`w-full flex flex-col items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 840 280"
        className="w-full h-auto max-h-[300px] select-none"
        style={size ? { maxWidth: `${size}px` } : undefined}
      >
        <defs>
          <linearGradient id="idGradBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#1e293b" />
          </linearGradient>
        </defs>

        <rect x="15" y="15" width="810" height="250" rx="20" fill="url(#idGradBg)" stroke="#334155" strokeWidth="2" />

        <text x="420" y="45" fill="#f8fafc" fontSize="16" fontWeight="bold" textAnchor="middle" letterSpacing="1">
          NEVEZETES AZONOSSÁGOK GYÖKÖS KIFEJEZÉSEKKEL
        </text>

        {/* 1. Oszlop: Kéttagú négyzet (√a ± √b)² */}
        <g transform="translate(45, 65)">
          <rect x="0" y="0" width="350" height="180" rx="14" fill="#1e293b" stroke="#3b82f6" strokeWidth="1.5" />
          <text x="175" y="28" fill="#60a5fa" fontSize="13" fontWeight="bold" textAnchor="middle">
            KÉTTANGÚ NÉGYZET: (√a ± √b)²
          </text>
          <text x="175" y="50" fill="#94a3b8" fontSize="12" textAnchor="middle">
            (√a)² ± 2√a√b + (√b)² = <tspan fill="#f8fafc" fontWeight="bold">a ± 2√(ab) + b</tspan>
          </text>

          <rect x="20" y="65" width="310" height="52" rx="8" fill="#0f172a" />
          <text x="32" y="88" fill="#cbd5e1" fontSize="13" fontFamily="monospace">
            (√3 + √2)² = 3 + 2√6 + 2 = <tspan fill="#60a5fa" fontWeight="bold">5 + 2√6</tspan>
          </text>
          <text x="32" y="108" fill="#cbd5e1" fontSize="13" fontFamily="monospace">
            (√5 - 1)²  = 5 - 2√5 + 1 = <tspan fill="#34d399" fontWeight="bold">6 - 2√5</tspan>
          </text>

          <rect x="20" y="125" width="310" height="42" rx="6" fill="#1e3a8a" />
          <text x="175" y="143" fill="#bfdbfe" fontSize="11" fontWeight="bold" textAnchor="middle">
            Vigyázat: (√3 + √2)² NEM egyenlő 3 + 2 = 5-tel!
          </text>
          <text x="175" y="159" fill="#bfdbfe" fontSize="11" textAnchor="middle">
            A 2ab vegyes szorzat sosem hagyható el!
          </text>
        </g>

        {/* 2. Oszlop: Négyzetek különbsége (√a + √b)(√a - √b) */}
        <g transform="translate(445, 65)">
          <rect x="0" y="0" width="350" height="180" rx="14" fill="#1e293b" stroke="#10b981" strokeWidth="1.5" />
          <text x="175" y="28" fill="#34d399" fontSize="13" fontWeight="bold" textAnchor="middle">
            NÉGYZETEK KÜLÖNBSÉGE: (x + y)(x - y)
          </text>
          <text x="175" y="50" fill="#94a3b8" fontSize="12" textAnchor="middle">
            (√a + √b)(√a - √b) = (√a)² - (√b)² = <tspan fill="#f8fafc" fontWeight="bold">a - b</tspan>
          </text>

          <rect x="20" y="65" width="310" height="52" rx="8" fill="#0f172a" />
          <text x="32" y="88" fill="#cbd5e1" fontSize="13" fontFamily="monospace">
            (√7 + √2)(√7 - √2) = 7 - 2 = <tspan fill="#34d399" fontWeight="bold">5</tspan>
          </text>
          <text x="32" y="108" fill="#cbd5e1" fontSize="13" fontFamily="monospace">
            (3 - √5)(3 + √5)   = 9 - 5 = <tspan fill="#60a5fa" fontWeight="bold">4</tspan>
          </text>

          <rect x="20" y="125" width="310" height="42" rx="6" fill="#064e3b" />
          <text x="175" y="143" fill="#a7f3d0" fontSize="11" fontWeight="bold" textAnchor="middle">
            A gyökök teljesen eltűnnek!
          </text>
          <text x="175" y="159" fill="#a7f3d0" fontSize="11" textAnchor="middle">
            Ez az elv a kéttagú gyöktelenítés motorja.
          </text>
        </g>
      </svg>
      <p className="mt-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400 italic text-center">
        2. ábra: A nevezetes azonosságok alkalmazása gyökös kifejezéseknél: vegyes tagok és négyzetkülönbség
      </p>
    </div>
  );
};

// 3. Teljes négyzet felismerése gyök alatt (Emeletes gyökök)
export const RootUnderRootSvg: React.FC<FigureProps> = ({ className = '', size }) => {
  return (
    <div className={`w-full flex flex-col items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 840 280"
        className="w-full h-auto max-h-[300px] select-none"
        style={size ? { maxWidth: `${size}px` } : undefined}
      >
        <defs>
          <linearGradient id="rurGradBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#1e293b" />
          </linearGradient>
        </defs>

        <rect x="15" y="15" width="810" height="250" rx="20" fill="url(#rurGradBg)" stroke="#334155" strokeWidth="2" />

        <text x="420" y="45" fill="#f8fafc" fontSize="16" fontWeight="bold" textAnchor="middle" letterSpacing="1">
          TELJES NÉGYZETTÉ ALAKÍTÁS A GYÖKJEL ALATT: √(A ± 2√B)
        </text>

        {/* Folyamat bemutatása */}
        <g transform="translate(45, 65)">
          <rect x="0" y="0" width="750" height="180" rx="14" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />

          {/* 1. Lépés */}
          <g transform="translate(25, 20)">
            <rect x="0" y="0" width="210" height="140" rx="10" fill="#0f172a" stroke="#334155" strokeWidth="1" />
            <text x="105" y="25" fill="#fbbf24" fontSize="12" fontWeight="bold" textAnchor="middle">1. PROBLÉMA</text>
            <text x="105" y="55" fill="#f8fafc" fontSize="16" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
              √(7 + 4√3) = ?
            </text>
            <text x="105" y="85" fill="#94a3b8" fontSize="11" textAnchor="middle">Hogyan tüntethető el a</text>
            <text x="105" y="102" fill="#94a3b8" fontSize="11" textAnchor="middle">külső nagy gyökjel?</text>
          </g>

          {/* Nyíl 1 */}
          <g transform="translate(245, 80)">
            <path d="M 0 0 L 25 0 M 15 -6 L 25 0 L 15 6" stroke="#fbbf24" strokeWidth="2.5" fill="none" />
          </g>

          {/* 2. Lépés */}
          <g transform="translate(280, 20)">
            <rect x="0" y="0" width="220" height="140" rx="10" fill="#0f172a" stroke="#334155" strokeWidth="1" />
            <text x="110" y="25" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">2. VEGYES SZORZAT KERESÉSE</text>
            <text x="110" y="55" fill="#38bdf8" fontSize="13" fontFamily="monospace" textAnchor="middle">
              2ab = 4√3 ⇒ ab = 2√3
            </text>
            <text x="110" y="80" fill="#cbd5e1" fontSize="11" textAnchor="middle">Válasszuk: a = 2, b = √3</text>
            <text x="110" y="100" fill="#a7f3d0" fontSize="11" fontFamily="monospace" textAnchor="middle">
              a² + b² = 2² + (√3)² = 4 + 3 = 7!
            </text>
            <text x="110" y="122" fill="#94a3b8" fontSize="10" textAnchor="middle">Pontosan kiadja az első tagot!</text>
          </g>

          {/* Nyíl 2 */}
          <g transform="translate(510, 80)">
            <path d="M 0 0 L 25 0 M 15 -6 L 25 0 L 15 6" stroke="#34d399" strokeWidth="2.5" fill="none" />
          </g>

          {/* 3. Lépés */}
          <g transform="translate(545, 20)">
            <rect x="0" y="0" width="180" height="140" rx="10" fill="#0f172a" stroke="#10b981" strokeWidth="1.5" />
            <text x="90" y="25" fill="#34d399" fontSize="12" fontWeight="bold" textAnchor="middle">3. MEGOLDÁS</text>
            <text x="90" y="55" fill="#f8fafc" fontSize="13" fontFamily="monospace" textAnchor="middle">
              √((2 + √3)²)
            </text>
            <text x="90" y="85" fill="#94a3b8" fontSize="11" textAnchor="middle">= |2 + √3|</text>
            <rect x="15" y="100" width="150" height="26" rx="6" fill="#064e3b" />
            <text x="90" y="118" fill="#a7f3d0" fontSize="13" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
              = 2 + √3
            </text>
          </g>
        </g>
      </svg>
      <p className="mt-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400 italic text-center">
        3. ábra: A vegyes tag (2ab) felbontásával a gyök alatti kifejezés teljes négyzetté alakítható
      </p>
    </div>
  );
};

// 4. Gyökös egyenletek és a hamis gyökök csapdája
export const RootEquationTrapSvg: React.FC<FigureProps> = ({ className = '', size }) => {
  return (
    <div className={`w-full flex flex-col items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 840 280"
        className="w-full h-auto max-h-[300px] select-none"
        style={size ? { maxWidth: `${size}px` } : undefined}
      >
        <defs>
          <linearGradient id="trapGradBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#1e293b" />
          </linearGradient>
        </defs>

        <rect x="15" y="15" width="810" height="250" rx="20" fill="url(#trapGradBg)" stroke="#334155" strokeWidth="2" />

        <text x="420" y="45" fill="#f8fafc" fontSize="16" fontWeight="bold" textAnchor="middle" letterSpacing="1">
          A NÉGYZETRE EMELÉS CSAPDÁJA ÉS A KÖTELEZŐ ELLENŐRZÉS
        </text>

        {/* 1. Doboz: Hamis gyök keletkezése */}
        <g transform="translate(45, 65)">
          <rect x="0" y="0" width="350" height="180" rx="14" fill="#1e293b" stroke="#f43f5e" strokeWidth="1.5" />
          <text x="175" y="28" fill="#fb7185" fontSize="13" fontWeight="bold" textAnchor="middle">
            A négyzetre emelés NEM ekvivalens lépés!
          </text>
          <text x="25" y="55" fill="#94a3b8" fontSize="12">Tekintsük a következő egyszerű egyenletet:</text>

          <rect x="25" y="68" width="300" height="32" rx="6" fill="#0f172a" />
          <text x="175" y="90" fill="#f8fafc" fontSize="15" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
            √x = -3
          </text>

          <text x="25" y="118" fill="#fda4af" fontSize="11">Ha gondolkodás nélkül négyzetre emelnénk: (√x)² = (-3)²</text>
          <text x="175" y="138" fill="#f43f5e" fontSize="14" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
            x = 9 &nbsp;❌ &nbsp;HAMIS GYÖK!
          </text>

          <text x="175" y="165" fill="#cbd5e1" fontSize="11" textAnchor="middle">
            Mivel a definíció szerint √x ≥ 0, √9 = 3 ≠ -3! Nincs megoldás!
          </text>
        </g>

        {/* 2. Doboz: Megoldási stratégia */}
        <g transform="translate(445, 65)">
          <rect x="0" y="0" width="350" height="180" rx="14" fill="#1e293b" stroke="#3b82f6" strokeWidth="1.5" />
          <text x="175" y="28" fill="#60a5fa" fontSize="13" fontWeight="bold" textAnchor="middle">
            A gyökös egyenletek aranyszabályai
          </text>

          <g transform="translate(20, 48)">
            <rect x="0" y="0" width="310" height="34" rx="6" fill="#0f172a" />
            <text x="15" y="22" fill="#38bdf8" fontSize="12" fontWeight="bold">1. ÉT kikötése:</text>
            <text x="115" y="22" fill="#cbd5e1" fontSize="12">Gyök alatti kifejezés ≥ 0</text>
          </g>
          <g transform="translate(20, 88)">
            <rect x="0" y="0" width="310" height="34" rx="6" fill="#0f172a" />
            <text x="15" y="22" fill="#fbbf24" fontSize="12" fontWeight="bold">2. Előjel-feltétel:</text>
            <text x="125" y="22" fill="#cbd5e1" fontSize="12">A másik oldal is ≥ 0 kell legyen</text>
          </g>
          <g transform="translate(20, 128)">
            <rect x="0" y="0" width="310" height="42" rx="6" fill="#064e3b" />
            <text x="15" y="18" fill="#34d399" fontSize="11" fontWeight="bold">3. KÖTELEZŐ ELLENŐRZÉS:</text>
            <text x="15" y="34" fill="#a7f3d0" fontSize="11">Az eredeti egyenletbe való visszahelyettesítés!</text>
          </g>
        </g>
      </svg>
      <p className="mt-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400 italic text-center">
        4. ábra: A négyzetre emelés bővítheti az alaphalmazt, ezért gyökös egyenleteknél az ellenőrzés kötelező lépés
      </p>
    </div>
  );
};

