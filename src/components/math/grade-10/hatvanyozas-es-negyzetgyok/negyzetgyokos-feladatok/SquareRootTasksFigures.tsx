import React from 'react';

interface FigureProps {
  className?: string;
  size?: number;
}

// 1. Tényező kiemelése gyökjel alól (Részleges gyökvonás) és egynemű gyökök
export const RootExtractionSvg: React.FC<FigureProps> = ({ className = '', size }) => {
  return (
    <div className={`w-full flex flex-col items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 840 280"
        className="w-full h-auto max-h-[300px] select-none"
        style={size ? { maxWidth: `${size}px` } : undefined}
      >
        <defs>
          <linearGradient id="extGradBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#1e293b" />
          </linearGradient>
          <linearGradient id="amberGlow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>
          <linearGradient id="emeraldGlow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
          <filter id="shadowBox" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodOpacity="0.4" />
          </filter>
        </defs>

        {/* Háttér kártya */}
        <rect x="15" y="15" width="810" height="250" rx="20" fill="url(#extGradBg)" stroke="#334155" strokeWidth="2" filter="url(#shadowBox)" />

        {/* Felső cím */}
        <text x="420" y="45" fill="#f8fafc" fontSize="16" fontWeight="bold" textAnchor="middle" letterSpacing="1">
          RÉSZLEGES GYÖKVONÁS ÉS TÉNYEZŐ KIEMELÉSE: √(a² · b) = a · √b
        </text>

        {/* 1. Bal oldali blokk: Példa √72 */}
        <g transform="translate(45, 70)">
          <rect x="0" y="0" width="340" height="175" rx="14" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
          <text x="170" y="28" fill="#fbbf24" fontSize="14" fontWeight="bold" textAnchor="middle">
            1. LÉPÉS: Legnagyobb négyzetszám keresése
          </text>

          <text x="35" y="65" fill="#94a3b8" fontSize="13">Szám felbontása:</text>
          <text x="195" y="65" fill="#f8fafc" fontSize="16" fontWeight="bold">72 = 36 · 2</text>

          {/* Kiemelés folyamata */}
          <rect x="25" y="85" width="290" height="42" rx="8" fill="#0f172a" stroke="#475569" strokeWidth="1" />
          <text x="38" y="112" fill="#cbd5e1" fontSize="15" fontFamily="monospace">
            √72 = √(36 · 2) = √36 · √2 = <tspan fill="#34d399" fontWeight="bold">6√2</tspan>
          </text>

          {/* Magyarázat */}
          <text x="170" y="155" fill="#f59e0b" fontSize="12" textAnchor="middle" fontWeight="bold">
            36 négyzetszám (6²), így 6-ként "kiszabadul" a gyök alól!
          </text>
        </g>

        {/* 2. Jobb oldali blokk: Összevonás egynemű gyökökkel */}
        <g transform="translate(455, 70)">
          <rect x="0" y="0" width="340" height="175" rx="14" fill="#1e293b" stroke="#10b981" strokeWidth="1.5" />
          <text x="170" y="28" fill="#34d399" fontSize="14" fontWeight="bold" textAnchor="middle">
            2. ALKALMAZÁS: Egynemű gyökök összevonása
          </text>

          <text x="25" y="62" fill="#94a3b8" fontSize="12">Látszólag különböző gyökök: √50 - √18 = ?</text>

          <rect x="20" y="78" width="300" height="52" rx="8" fill="#0f172a" stroke="#475569" strokeWidth="1" />
          <text x="32" y="100" fill="#cbd5e1" fontSize="14" fontFamily="monospace">
            √50 = √(25·2) = <tspan fill="#fbbf24" fontWeight="bold">5√2</tspan>
          </text>
          <text x="32" y="120" fill="#cbd5e1" fontSize="14" fontFamily="monospace">
            √18 = √(9·2)  = <tspan fill="#38bdf8" fontWeight="bold">3√2</tspan>
          </text>

          {/* Eredmény */}
          <rect x="20" y="137" width="300" height="28" rx="6" fill="#064e3b" />
          <text x="170" y="156" fill="#a7f3d0" fontSize="13" fontWeight="bold" textAnchor="middle">
            √50 - √18 = 5√2 - 3√2 = 2√2
          </text>
        </g>
      </svg>
      <p className="mt-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400 italic text-center">
        1. ábra: Tényező kiemelése négyzetszorzat keresésével és egynemű gyökök összevonása
      </p>
    </div>
  );
};

// 2. Tényező bevitele gyökjel alá és nagyságrendi összehasonlítás
export const RootInsertionAndCompareSvg: React.FC<FigureProps> = ({ className = '', size }) => {
  return (
    <div className={`w-full flex flex-col items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 840 280"
        className="w-full h-auto max-h-[300px] select-none"
        style={size ? { maxWidth: `${size}px` } : undefined}
      >
        <defs>
          <linearGradient id="insGradBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#1e293b" />
          </linearGradient>
        </defs>

        <rect x="15" y="15" width="810" height="250" rx="20" fill="url(#insGradBg)" stroke="#334155" strokeWidth="2" />

        <text x="420" y="45" fill="#f8fafc" fontSize="16" fontWeight="bold" textAnchor="middle" letterSpacing="1">
          TÉNYEZŐ BEVITELE A GYÖKJEL ALÁ: a · √b = √(a² · b) &nbsp;(a ≥ 0)
        </text>

        {/* Szabály doboz */}
        <g transform="translate(45, 65)">
          <rect x="0" y="0" width="350" height="180" rx="14" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
          <text x="175" y="28" fill="#38bdf8" fontSize="14" fontWeight="bold" textAnchor="middle">
            Hogyan visszük be a szorzót?
          </text>
          <text x="25" y="60" fill="#94a3b8" fontSize="13">
            A gyök előtti pozitív számot <tspan fill="#fbbf24" fontWeight="bold">négyzetre emelve</tspan>
          </text>
          <text x="25" y="78" fill="#94a3b8" fontSize="13">
            visszük a gyökjel alá mint szorzótényezőt:
          </text>

          <rect x="25" y="95" width="300" height="42" rx="8" fill="#0f172a" stroke="#475569" strokeWidth="1" />
          <text x="175" y="122" fill="#f8fafc" fontSize="16" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
            3√5 = √(3² · 5) = √(9 · 5) = <tspan fill="#38bdf8">√45</tspan>
          </text>

          <text x="175" y="162" fill="#cbd5e1" fontSize="12" textAnchor="middle">
            Hasonlóan: 5√2 = √(5² · 2) = √(25 · 2) = <tspan fill="#a7f3d0" fontWeight="bold">√50</tspan>
          </text>
        </g>

        {/* Összehasonlítás doboz */}
        <g transform="translate(445, 65)">
          <rect x="0" y="0" width="350" height="180" rx="14" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
          <text x="175" y="28" fill="#fbbf24" fontSize="14" fontWeight="bold" textAnchor="middle">
            Összehasonlítás: Melyik a nagyobb?
          </text>
          <text x="175" y="58" fill="#f8fafc" fontSize="15" fontWeight="bold" textAnchor="middle">
            3√5 &nbsp;<tspan fill="#f59e0b">?</tspan>&nbsp; 5√2
          </text>

          {/* Vizuális összehasonlító tengely */}
          <rect x="25" y="78" width="300" height="50" rx="8" fill="#0f172a" stroke="#475569" strokeWidth="1" />
          <text x="175" y="100" fill="#94a3b8" fontSize="13" textAnchor="middle">Közös gyökjel alatt:</text>
          <text x="175" y="120" fill="#f8fafc" fontSize="15" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
            <tspan fill="#38bdf8">√45</tspan> &nbsp;&lt;&nbsp; <tspan fill="#34d399">√50</tspan>
          </text>

          {/* Végeredmény kiemelés */}
          <rect x="25" y="138" width="300" height="30" rx="6" fill="#78350f" />
          <text x="175" y="158" fill="#fde68a" fontSize="13" fontWeight="bold" textAnchor="middle">
            Következtetés: 3√5 &lt; 5√2 &nbsp;(kb. 6,71 &lt; 7,07)
          </text>
        </g>
      </svg>
      <p className="mt-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400 italic text-center">
        2. ábra: Tényező bevitele gyökjel alá a kifejezések pontos nagyságrendi összehasonlításához
      </p>
    </div>
  );
};

// 3. Egytagú gyökös nevező gyöktelenítése
export const MonomialRationalizationSvg: React.FC<FigureProps> = ({ className = '', size }) => {
  return (
    <div className={`w-full flex flex-col items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 840 280"
        className="w-full h-auto max-h-[300px] select-none"
        style={size ? { maxWidth: `${size}px` } : undefined}
      >
        <defs>
          <linearGradient id="monoGradBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#1e293b" />
          </linearGradient>
        </defs>

        <rect x="15" y="15" width="810" height="250" rx="20" fill="url(#monoGradBg)" stroke="#334155" strokeWidth="2" />

        <text x="420" y="45" fill="#f8fafc" fontSize="16" fontWeight="bold" textAnchor="middle" letterSpacing="1">
          NEVEZŐ GYÖKTELENÍTÉSE: EGYTAGÚ GYÖKÖS NEVEZŐ BŐVÍTÉSE
        </text>

        {/* 3 lépéses folyamatábra */}
        <g transform="translate(45, 65)">
          {/* 1. Lépés: Kiinduló állapot */}
          <rect x="0" y="0" width="220" height="180" rx="14" fill="#1e293b" stroke="#f43f5e" strokeWidth="1.5" />
          <text x="110" y="28" fill="#fb7185" fontSize="13" fontWeight="bold" textAnchor="middle">1. PROBLÉMA</text>
          <text x="110" y="52" fill="#94a3b8" fontSize="12" textAnchor="middle">Irracionális a nevezőben:</text>

          <rect x="40" y="70" width="140" height="55" rx="8" fill="#0f172a" />
          <text x="110" y="95" fill="#f8fafc" fontSize="18" fontFamily="monospace" fontWeight="bold" textAnchor="middle">6</text>
          <line x1="70" y1="102" x2="150" y2="102" stroke="#f8fafc" strokeWidth="2" />
          <text x="110" y="120" fill="#f43f5e" fontSize="18" fontFamily="monospace" fontWeight="bold" textAnchor="middle">√3</text>

          <text x="110" y="155" fill="#fda4af" fontSize="11" textAnchor="middle">Osztás végtelen tizedessel!</text>
        </g>

        {/* Nyíl 1 */}
        <g transform="translate(280, 145)">
          <path d="M 0 0 L 25 0 M 15 -7 L 25 0 L 15 7" stroke="#38bdf8" strokeWidth="3" fill="none" strokeLinecap="round" />
        </g>

        {/* 2. Lépés: Bővítés a nevező gyökével */}
        <g transform="translate(320, 65)">
          <rect x="0" y="0" width="220" height="180" rx="14" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
          <text x="110" y="28" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle">2. BŐVÍTÉS (· 1)</text>
          <text x="110" y="52" fill="#94a3b8" fontSize="12" textAnchor="middle">Számlálót és nevezőt is · √3:</text>

          <rect x="30" y="70" width="160" height="55" rx="8" fill="#0f172a" />
          <text x="110" y="95" fill="#f8fafc" fontSize="16" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
            6 <tspan fill="#38bdf8">· √3</tspan>
          </text>
          <line x1="50" y1="102" x2="170" y2="102" stroke="#f8fafc" strokeWidth="2" />
          <text x="110" y="120" fill="#f8fafc" fontSize="16" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
            √3 <tspan fill="#38bdf8">· √3</tspan>
          </text>

          <text x="110" y="155" fill="#bae6fd" fontSize="11" textAnchor="middle">Mivel √3 · √3 = (√3)² = 3</text>
        </g>

        {/* Nyíl 2 */}
        <g transform="translate(555, 145)">
          <path d="M 0 0 L 25 0 M 15 -7 L 25 0 L 15 7" stroke="#10b981" strokeWidth="3" fill="none" strokeLinecap="round" />
        </g>

        {/* 3. Lépés: Egyszerűsítés és végeredmény */}
        <g transform="translate(595, 65)">
          <rect x="0" y="0" width="200" height="180" rx="14" fill="#1e293b" stroke="#10b981" strokeWidth="1.5" />
          <text x="100" y="28" fill="#34d399" fontSize="13" fontWeight="bold" textAnchor="middle">3. EGYSZERŰSÍTÉS</text>
          <text x="100" y="52" fill="#94a3b8" fontSize="12" textAnchor="middle">Racionális nevező:</text>

          <rect x="25" y="70" width="150" height="55" rx="8" fill="#0f172a" />
          <text x="100" y="95" fill="#f8fafc" fontSize="16" fontFamily="monospace" fontWeight="bold" textAnchor="middle">6√3</text>
          <line x1="45" y1="102" x2="155" y2="102" stroke="#f8fafc" strokeWidth="2" />
          <text x="100" y="120" fill="#34d399" fontSize="16" fontFamily="monospace" fontWeight="bold" textAnchor="middle">3</text>

          <rect x="25" y="135" width="150" height="32" rx="6" fill="#064e3b" />
          <text x="100" y="156" fill="#a7f3d0" fontSize="15" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
            = 2√3
          </text>
        </g>
      </svg>
      <p className="mt-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400 italic text-center">
        3. ábra: Egytagú gyökös nevező gyöktelenítésének menete a számláló és nevező gyökkel való beszorzásával
      </p>
    </div>
  );
};

// 4. Kéttagú gyökös nevező gyöktelenítése algebrai konjugálttal
export const ConjugateRationalizationSvg: React.FC<FigureProps> = ({ className = '', size }) => {
  return (
    <div className={`w-full flex flex-col items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 840 280"
        className="w-full h-auto max-h-[300px] select-none"
        style={size ? { maxWidth: `${size}px` } : undefined}
      >
        <defs>
          <linearGradient id="conjGradBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#1e293b" />
          </linearGradient>
        </defs>

        <rect x="15" y="15" width="810" height="250" rx="20" fill="url(#conjGradBg)" stroke="#334155" strokeWidth="2" />

        <text x="420" y="45" fill="#f8fafc" fontSize="16" fontWeight="bold" textAnchor="middle" letterSpacing="1">
          KÉTTAGÚ NEVEZŐ GYÖKTELENÍTÉSE ALGEBRAI KONJUGÁLTTAL
        </text>

        {/* Felső magyarázó sáv: (a-b)(a+b) = a² - b² */}
        <rect x="80" y="60" width="680" height="32" rx="8" fill="#1e293b" stroke="#6366f1" strokeWidth="1" />
        <text x="420" y="81" fill="#c7d2fe" fontSize="13" fontWeight="bold" textAnchor="middle">
          Nevezetes azonosság kulcsa: (√a + √b)(√a - √b) = (√a)² - (√b)² = a - b &nbsp;(kiesnek a középső gyökös tagok!)
        </text>

        {/* Bal oldali lépés: Konjugált pár fogalma */}
        <g transform="translate(45, 105)">
          <rect x="0" y="0" width="350" height="145" rx="14" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
          <text x="175" y="26" fill="#fbbf24" fontSize="13" fontWeight="bold" textAnchor="middle">
            Mik a konjugált párok?
          </text>
          <text x="25" y="55" fill="#94a3b8" fontSize="12">A két tag közötti előjel megfordítása:</text>

          <rect x="25" y="70" width="300" height="30" rx="6" fill="#0f172a" />
          <text x="175" y="90" fill="#f8fafc" fontSize="13" fontFamily="monospace" textAnchor="middle">
            (√5 - 1) konjugáltja: <tspan fill="#34d399" fontWeight="bold">(√5 + 1)</tspan>
          </text>

          <rect x="25" y="105" width="300" height="30" rx="6" fill="#0f172a" />
          <text x="175" y="125" fill="#f8fafc" fontSize="13" fontFamily="monospace" textAnchor="middle">
            (√7 + √3) konjugáltja: <tspan fill="#38bdf8" fontWeight="bold">(√7 - √3)</tspan>
          </text>
        </g>

        {/* Jobb oldali lépés: Kidolgozott minta */}
        <g transform="translate(445, 105)">
          <rect x="0" y="0" width="350" height="145" rx="14" fill="#1e293b" stroke="#10b981" strokeWidth="1.5" />
          <text x="175" y="26" fill="#34d399" fontSize="13" fontWeight="bold" textAnchor="middle">
            Kidolgozott példa: 2 / (√5 - 1)
          </text>

          <rect x="20" y="42" width="310" height="52" rx="8" fill="#0f172a" />
          <text x="175" y="65" fill="#f8fafc" fontSize="14" fontFamily="monospace" textAnchor="middle">
            2 · <tspan fill="#34d399">(√5 + 1)</tspan> &nbsp;/&nbsp; [(√5 - 1)<tspan fill="#34d399">(√5 + 1)</tspan>]
          </text>
          <text x="175" y="85" fill="#94a3b8" fontSize="12" fontFamily="monospace" textAnchor="middle">
            = 2(√5 + 1) / (5 - 1) = 2(√5 + 1) / 4
          </text>

          {/* Végeredmény */}
          <rect x="20" y="102" width="310" height="32" rx="6" fill="#064e3b" />
          <text x="175" y="123" fill="#a7f3d0" fontSize="14" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
            = (√5 + 1) / 2
          </text>
        </g>
      </svg>
      <p className="mt-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400 italic text-center">
        4. ábra: Kéttagú nevező gyöktelenítése algebrai konjugált segítségével az (a - b)(a + b) = a² - b² képlet alapján
      </p>
    </div>
  );
};

