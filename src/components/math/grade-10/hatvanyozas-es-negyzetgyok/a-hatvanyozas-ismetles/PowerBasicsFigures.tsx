import React from 'react';

interface FigureProps {
  className?: string;
  size?: number;
}

// 1. Hatvány felépítése: Alap, Kitevő, Hatványérték és ismételt szorzás
export const PowerStructureSvg: React.FC<FigureProps> = ({ className = '', size }) => {
  return (
    <div className={`w-full flex flex-col items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 540 280"
        className="w-full h-auto select-none rounded-2xl bg-slate-900/95 p-2 sm:p-3 shadow-xl border border-slate-800"
        style={size ? { maxWidth: `${size}px` } : undefined}
      >
        <defs>
          <linearGradient id="baseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#0284c7" />
          </linearGradient>
          <linearGradient id="expGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f472b6" />
            <stop offset="100%" stopColor="#db2777" />
          </linearGradient>
          <linearGradient id="valGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#34d399" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
          <marker id="arrowhead-exp" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <polygon points="0 0, 6 3, 0 6" fill="#f472b6" />
          </marker>
          <marker id="arrowhead-base" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <polygon points="0 0, 6 3, 0 6" fill="#38bdf8" />
          </marker>
        </defs>

        {/* Címkeret */}
        <rect x="150" y="12" width="240" height="26" rx="13" fill="#1e293b" stroke="#334155" strokeWidth="1" />
        <text x="270" y="29" fill="#38bdf8" fontSize="12" fontWeight="700" textAnchor="middle" letterSpacing="0.8">
          A HATVÁNYOZÁS ANATÓMIÁJA
        </text>

        {/* Felső magyarázó címke: Kitevő (hányszor szorozzuk) - kényelmesen középre igazítva, nem lóg ki */}
        <g>
          <rect x="75" y="44" width="160" height="24" rx="6" fill="#831843/60" stroke="#db2777" strokeWidth="1" />
          <text x="155" y="60" fill="#f472b6" fontSize="11" fontWeight="700" textAnchor="middle">
            Kitevő (hányszor)
          </text>
          {/* Nyíl a kitevőhöz */}
          <path d="M 155 68 L 155 76" fill="none" stroke="#f472b6" strokeWidth="1.5" markerEnd="url(#arrowhead-exp)" />
        </g>

        {/* Hatványalap 'a' és Kitevő 'n' */}
        <g transform="translate(45, 12)">
          {/* Alap 'a' */}
          <text x="55" y="128" fill="url(#baseGrad)" fontSize="62" fontWeight="900" textAnchor="middle" fontFamily="monospace">
            a
          </text>
          {/* Kitevő 'n' */}
          <text x="105" y="88" fill="url(#expGrad)" fontSize="38" fontWeight="900" textAnchor="middle" fontFamily="monospace">
            n
          </text>
          {/* Egyenlőségjel */}
          <text x="150" y="120" fill="#94a3b8" fontSize="32" fontWeight="700" textAnchor="middle">
            =
          </text>
        </g>

        {/* Alsó magyarázó címke: Alap (mit szorzunk) */}
        <g>
          {/* Nyíl az alaptól lefelé */}
          <path d="M 100 148 L 100 166" fill="none" stroke="#38bdf8" strokeWidth="1.5" markerEnd="url(#arrowhead-base)" />
          <rect x="30" y="172" width="140" height="24" rx="6" fill="#0c4a6e/60" stroke="#0284c7" strokeWidth="1" />
          <text x="100" y="188" fill="#38bdf8" fontSize="11" fontWeight="700" textAnchor="middle">
            Alap (mit szorzunk)
          </text>
        </g>

        {/* Ismételt szorzás doboza */}
        <rect x="225" y="76" width="295" height="68" rx="12" fill="#020617" stroke="#334155" strokeWidth="1.5" />
        <text x="372" y="118" fill="#f1f5f9" fontSize="24" fontWeight="700" textAnchor="middle" fontFamily="serif">
          <tspan fill="#38bdf8" fontWeight="bold">a</tspan> · <tspan fill="#38bdf8" fontWeight="bold">a</tspan> · <tspan fill="#38bdf8" fontWeight="bold">a</tspan> · … · <tspan fill="#38bdf8" fontWeight="bold">a</tspan>
        </text>

        {/* Kapocs az ismételt szorzás alatt */}
        <path
          d="M 240 150 Q 240 160 300 160 L 365 160 Q 372 166 372 170 Q 372 166 379 160 L 444 160 Q 504 160 504 150"
          fill="none"
          stroke="#f472b6"
          strokeWidth="1.5"
        />
        <text x="372" y="190" fill="#f472b6" fontSize="13" fontWeight="700" textAnchor="middle">
          pontosan n darab tényező
        </text>

        {/* Számolási példa az ábra alsó sávjában */}
        <rect x="20" y="222" width="500" height="42" rx="10" fill="#1e293b" stroke="#334155" strokeWidth="1" />
        <text x="270" y="248" fill="#94a3b8" fontSize="14" textAnchor="middle">
          Példa:{' '}
          <tspan fill="#38bdf8" fontWeight="bold">2</tspan>
          <tspan fill="#f472b6" fontWeight="bold" dy="-4" fontSize="11">5</tspan>
          <tspan dy="4" fill="#f8fafc"> = 2 · 2 · 2 · 2 · 2 = </tspan>
          <tspan fill="#34d399" fontWeight="bold">32</tspan>
          <tspan fill="#94a3b8"> (Hatványérték)</tspan>
        </text>
      </svg>
    </div>
  );
};

// 2. Előjelszabályok és a Zárójelezési csapda
export const SignRulesSvg: React.FC<FigureProps> = ({ className = '', size }) => {
  return (
    <div className={`w-full flex flex-col items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 540 330"
        className="w-full h-auto select-none rounded-2xl bg-slate-900/95 p-2 sm:p-3 shadow-xl border border-slate-800"
        style={size ? { maxWidth: `${size}px` } : undefined}
      >
        {/* Fejléc */}
        <rect x="140" y="10" width="260" height="26" rx="13" fill="#1e293b" stroke="#334155" />
        <text x="270" y="27" fill="#cbd5e1" fontSize="12" fontWeight="700" textAnchor="middle" letterSpacing="0.6">
          ELŐJELSZABÁLYOK ÉS A ZÁRÓJEL
        </text>

        {/* Bal oldali kártya: Páros kitevő */}
        <g transform="translate(20, 46)">
          <rect x="0" y="0" width="240" height="106" rx="10" fill="#0f172a" stroke="#10b981" strokeWidth="1.5" />
          <rect x="15" y="10" width="210" height="22" rx="6" fill="#064e3b/60" />
          <text x="120" y="25" fill="#34d399" fontSize="13" fontWeight="bold" textAnchor="middle">
            Páros kitevő (2k)
          </text>
          <text x="120" y="62" fill="#f8fafc" fontSize="17" fontWeight="bold" textAnchor="middle">
            (-a)<tspan dy="-5" fontSize="12" fill="#34d399">2k</tspan><tspan dy="5"> = </tspan><tspan fill="#34d399">+ a</tspan><tspan dy="-5" fontSize="12" fill="#34d399">2k</tspan> &gt; 0
          </text>
          <text x="120" y="90" fill="#94a3b8" fontSize="12" textAnchor="middle">
            Pl.: (-3)<tspan dy="-3" fontSize="9">2</tspan><tspan dy="3"> = (-3)·(-3) = </tspan><tspan fill="#34d399" fontWeight="bold">+9</tspan>
          </text>
        </g>

        {/* Jobb oldali kártya: Páratlan kitevő */}
        <g transform="translate(280, 46)">
          <rect x="0" y="0" width="240" height="106" rx="10" fill="#0f172a" stroke="#f59e0b" strokeWidth="1.5" />
          <rect x="15" y="10" width="210" height="22" rx="6" fill="#78350f/60" />
          <text x="120" y="25" fill="#fbbf24" fontSize="13" fontWeight="bold" textAnchor="middle">
            Páratlan kitevő (2k+1)
          </text>
          <text x="120" y="62" fill="#f8fafc" fontSize="17" fontWeight="bold" textAnchor="middle">
            (-a)<tspan dy="-5" fontSize="12" fill="#fbbf24">2k+1</tspan><tspan dy="5"> = </tspan><tspan fill="#ef4444">- a</tspan><tspan dy="-5" fontSize="12" fill="#fbbf24">2k+1</tspan> &lt; 0
          </text>
          <text x="120" y="90" fill="#94a3b8" fontSize="12" textAnchor="middle">
            Pl.: (-2)<tspan dy="-3" fontSize="9">3</tspan><tspan dy="3"> = (-2)·(-2)·(-2) = </tspan><tspan fill="#ef4444" fontWeight="bold">-8</tspan>
          </text>
        </g>

        {/* Alsó csapda doboz: Zárójel elhagyása */}
        <g transform="translate(20, 166)">
          <rect x="0" y="0" width="500" height="150" rx="12" fill="#450a0a/45" stroke="#ef4444" strokeWidth="1.8" />
          
          <text x="250" y="28" fill="#fca5a5" fontSize="14" fontWeight="bold" textAnchor="middle">
            ⚠️ VÉGZETES CSAPDA: A ZÁRÓJEL ELHAGYÁSA!
          </text>
          <text x="250" y="48" fill="#cbd5e1" fontSize="12" textAnchor="middle">
            A kitevő csak arra vonatkozik, ami közvetlenül előtte áll!
          </text>

          {/* Összehasonlító dobozok */}
          <g transform="translate(25, 62)">
            {/* Zárójellel */}
            <rect x="0" y="0" width="195" height="70" rx="8" fill="#1e293b" stroke="#10b981" strokeWidth="1.5" />
            <text x="97" y="30" fill="#f8fafc" fontSize="15" fontWeight="bold" textAnchor="middle">
              (-3)<tspan dy="-4" fontSize="11">2</tspan><tspan dy="4"></tspan>
            </text>
            <text x="97" y="54" fill="#34d399" fontSize="13" fontWeight="bold" textAnchor="middle">
              = (-3) · (-3) = +9
            </text>

            {/* Nem egyenlő jel */}
            <text x="225" y="44" fill="#ef4444" fontSize="30" fontWeight="900" textAnchor="middle">
              ≠
            </text>

            {/* Zárójel nélkül */}
            <rect x="255" y="0" width="195" height="70" rx="8" fill="#1e293b" stroke="#ef4444" strokeWidth="1.5" />
            <text x="352" y="30" fill="#f8fafc" fontSize="15" fontWeight="bold" textAnchor="middle">
              -3<tspan dy="-4" fontSize="11">2</tspan><tspan dy="4"></tspan>
            </text>
            <text x="352" y="54" fill="#ef4444" fontSize="13" fontWeight="bold" textAnchor="middle">
              = -(3 · 3) = -9
            </text>
          </g>
        </g>
      </svg>
    </div>
  );
};

// 3. Azonos alapú hatványok műveletei (szorzás, osztás, hatványozás)
export const PowerIdentitiesSvg: React.FC<FigureProps> = ({ className = '', size }) => {
  return (
    <div className={`w-full flex flex-col items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 540 310"
        className="w-full h-auto select-none rounded-2xl bg-slate-900/95 p-2 sm:p-3 shadow-xl border border-slate-800"
        style={size ? { maxWidth: `${size}px` } : undefined}
      >
        <rect x="130" y="10" width="280" height="26" rx="13" fill="#1e293b" stroke="#334155" />
        <text x="270" y="27" fill="#cbd5e1" fontSize="12" fontWeight="700" textAnchor="middle" letterSpacing="0.6">
          AZONOS ALAPÚ HATVÁNYOK MŰVELETEI
        </text>

        {/* 1. Sor: Szorzás */}
        <g transform="translate(20, 48)">
          <rect x="0" y="0" width="500" height="74" rx="10" fill="#0f172a" stroke="#3b82f6" strokeWidth="1.5" />
          <text x="24" y="34" fill="#60a5fa" fontSize="16" fontWeight="bold">
            Szorzás:
          </text>
          <text x="110" y="34" fill="#f8fafc" fontSize="18" fontWeight="bold">
            a<tspan dy="-5" fontSize="12" fill="#38bdf8">n</tspan><tspan dy="5"> · a</tspan><tspan dy="-5" fontSize="12" fill="#f472b6">m</tspan><tspan dy="5"> = a</tspan><tspan dy="-5" fontSize="12" fill="#34d399">n + m</tspan>
          </text>
          <text x="110" y="58" fill="#94a3b8" fontSize="12">
            (a kitevők összeadódnak)
          </text>
          <rect x="330" y="14" width="155" height="46" rx="8" fill="#1e293b" stroke="#3b82f6" strokeWidth="1" />
          <text x="407" y="42" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle">
            2³ · 2⁴ = 2⁷ = 128
          </text>
        </g>

        {/* 2. Sor: Osztás */}
        <g transform="translate(20, 134)">
          <rect x="0" y="0" width="500" height="74" rx="10" fill="#0f172a" stroke="#8b5cf6" strokeWidth="1.5" />
          <text x="24" y="34" fill="#a78bfa" fontSize="16" fontWeight="bold">
            Osztás:
          </text>
          <text x="110" y="34" fill="#f8fafc" fontSize="18" fontWeight="bold">
            a<tspan dy="-5" fontSize="12" fill="#38bdf8">n</tspan><tspan dy="5"> : a</tspan><tspan dy="-5" fontSize="12" fill="#f472b6">m</tspan><tspan dy="5"> = a</tspan><tspan dy="-5" fontSize="12" fill="#a78bfa">n − m</tspan>
          </text>
          <text x="110" y="58" fill="#94a3b8" fontSize="12">
            (a ≠ 0, a kitevők kivonódnak)
          </text>
          <rect x="330" y="14" width="155" height="46" rx="8" fill="#1e293b" stroke="#8b5cf6" strokeWidth="1" />
          <text x="407" y="42" fill="#c084fc" fontSize="13" fontWeight="bold" textAnchor="middle">
            5⁵ : 5² = 5³ = 125
          </text>
        </g>

        {/* 3. Sor: Hatvány hatványozása */}
        <g transform="translate(20, 220)">
          <rect x="0" y="0" width="500" height="74" rx="10" fill="#0f172a" stroke="#ec4899" strokeWidth="1.5" />
          <text x="24" y="34" fill="#f472b6" fontSize="15" fontWeight="bold">
            Hatványozás:
          </text>
          <text x="135" y="34" fill="#f8fafc" fontSize="18" fontWeight="bold">
            (a<tspan dy="-5" fontSize="12" fill="#38bdf8">n</tspan><tspan dy="5">)</tspan><tspan dy="-5" fontSize="12" fill="#f472b6">m</tspan><tspan dy="5"> = a</tspan><tspan dy="-5" fontSize="12" fill="#fbbf24">n · m</tspan>
          </text>
          <text x="135" y="58" fill="#94a3b8" fontSize="12">
            (a kitevők összeszorzódnak)
          </text>
          <rect x="330" y="14" width="155" height="46" rx="8" fill="#1e293b" stroke="#ec4899" strokeWidth="1" />
          <text x="407" y="42" fill="#f472b6" fontSize="13" fontWeight="bold" textAnchor="middle">
            (2³)² = 2⁶ = 64
          </text>
        </g>
      </svg>
    </div>
  );
};

// 4. Szorzat és hányados hatványozása + 0-kra végződés
export const DistributivePowerSvg: React.FC<FigureProps> = ({ className = '', size }) => {
  return (
    <div className={`w-full flex flex-col items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 540 310"
        className="w-full h-auto select-none rounded-2xl bg-slate-900/95 p-2 sm:p-3 shadow-xl border border-slate-800"
        style={size ? { maxWidth: `${size}px` } : undefined}
      >
        <rect x="120" y="10" width="300" height="26" rx="13" fill="#1e293b" stroke="#334155" />
        <text x="270" y="27" fill="#cbd5e1" fontSize="12" fontWeight="700" textAnchor="middle" letterSpacing="0.6">
          SZORZAT ÉS HÁNYADOS HATVÁNYOZÁSA
        </text>

        {/* Bal felső kártya: Szorzat hatványa */}
        <g transform="translate(20, 46)">
          <rect x="0" y="0" width="240" height="106" rx="10" fill="#0f172a" stroke="#06b6d4" strokeWidth="1.5" />
          <text x="120" y="26" fill="#22d3ee" fontSize="13" fontWeight="bold" textAnchor="middle">
            Szorzat hatványa
          </text>
          <text x="120" y="58" fill="#f8fafc" fontSize="17" fontWeight="bold" textAnchor="middle">
            (a · b)<tspan dy="-5" fontSize="12" fill="#f472b6">n</tspan><tspan dy="5"> = a</tspan><tspan dy="-5" fontSize="12" fill="#f472b6">n</tspan><tspan dy="5"> · b</tspan><tspan dy="-5" fontSize="12" fill="#f472b6">n</tspan>
          </text>
          <text x="120" y="88" fill="#94a3b8" fontSize="12" textAnchor="middle">
            (2·3)³ = 6³ = 2³·3³ = 216
          </text>
        </g>

        {/* Jobb felső kártya: Tört hatványa */}
        <g transform="translate(280, 46)">
          <rect x="0" y="0" width="240" height="106" rx="10" fill="#0f172a" stroke="#10b981" strokeWidth="1.5" />
          <text x="120" y="26" fill="#34d399" fontSize="13" fontWeight="bold" textAnchor="middle">
            Tört hatványa (b ≠ 0)
          </text>
          <text x="120" y="58" fill="#f8fafc" fontSize="17" fontWeight="bold" textAnchor="middle">
            (a / b)<tspan dy="-5" fontSize="12" fill="#f472b6">n</tspan><tspan dy="5"> = a</tspan><tspan dy="-5" fontSize="12" fill="#f472b6">n</tspan><tspan dy="5"> / b</tspan><tspan dy="-5" fontSize="12" fill="#f472b6">n</tspan>
          </text>
          <text x="120" y="88" fill="#94a3b8" fontSize="12" textAnchor="middle">
            (3/5)² = 3² / 5² = 9 / 25
          </text>
        </g>

        {/* Alsó sáv: Nullára végződés érettségi típusfogás */}
        <g transform="translate(20, 166)">
          <rect x="0" y="0" width="500" height="128" rx="12" fill="#1e1b4b/70" stroke="#6366f1" strokeWidth="1.5" />
          <text x="250" y="26" fill="#a5b4fc" fontSize="12" fontWeight="bold" textAnchor="middle" letterSpacing="0.5">
            ÉRETTSÉGI TÍPUSFOGÁS: SZÁMOK NULLÁRA VÉGZŐDÉSE
          </text>
          <text x="250" y="58" fill="#f8fafc" fontSize="16" fontWeight="bold" textAnchor="middle">
            2<tspan dy="-4" fontSize="12" fill="#38bdf8">k</tspan><tspan dy="4"> · 5</tspan><tspan dy="-4" fontSize="12" fill="#f472b6">k</tspan><tspan dy="4"> = (2 · 5)</tspan><tspan dy="-4" fontSize="12" fill="#34d399">k</tspan><tspan dy="4"> = 10</tspan><tspan dy="-4" fontSize="12" fill="#34d399">k</tspan><tspan dy="4">  ⟹  </tspan><tspan fill="#fbbf24">k darab 0 a végén</tspan>
          </text>
          <rect x="25" y="78" width="450" height="36" rx="8" fill="#0f172a" stroke="#6366f1" strokeWidth="0.8" />
          <text x="250" y="101" fill="#cbd5e1" fontSize="12" textAnchor="middle">
            Pl.: 2⁸ · 5⁶ = 2² · (2·5)⁶ = 4 · 10⁶ = <tspan fill="#fbbf24" fontWeight="bold">4 000 000</tspan> (6 db nullára végződik)
          </text>
        </g>
      </svg>
    </div>
  );
};
