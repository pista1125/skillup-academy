import React from 'react';

interface FigureProps {
  className?: string;
  size?: number;
}

/**
 * 1. Érmedobás relatív gyakoriságának stabilitása (Nagy számok törvénye)
 * A tankönyvi adatok alapján: 50 dobás (0,48), 100 (0,49), 150 (0,46), 200 (0,47),
 * 250 (0,46), 300 (0,49), 350 (0,49), 400 dobás (0,50).
 */
export const CoinFlipLawOfLargeNumbersSvg: React.FC<FigureProps> = ({ className = '', size = 320 }) => {
  return (
    <svg
      viewBox="0 0 440 270"
      className={`w-full h-auto max-w-[440px] select-none ${className}`}
      style={{ maxHeight: size }}
    >
      <rect width="440" height="270" rx="16" fill="#f8fafc" className="dark:fill-slate-900" />
      <rect width="440" height="270" rx="16" fill="none" stroke="#e2e8f0" strokeWidth="1.5" className="dark:stroke-slate-800" />

      <text x="220" y="24" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1e293b" className="dark:fill-slate-100">
        Fejek relatív gyakoriságának stabilitása 400 dobás során
      </text>

      {/* Rácsvonalak */}
      <g stroke="#e2e8f0" strokeDasharray="3 3" strokeWidth="1" className="dark:stroke-slate-800">
        <line x1="55" y1="50" x2="400" y2="50" />
        <line x1="55" y1="85" x2="400" y2="85" />
        <line x1="55" y1="120" x2="400" y2="120" />
        <line x1="55" y1="155" x2="400" y2="155" />
        <line x1="55" y1="190" x2="400" y2="190" />
      </g>

      {/* Y tengely skála (0,30-tól 0,70-ig vagy 0-tól 1-ig, fókuszálva 0,35 - 0,65 tartományra) */}
      <g fontSize="9.5" fill="#64748b" className="dark:fill-slate-400" textAnchor="end">
        <text x="48" y="54">0,70</text>
        <text x="48" y="89">0,60</text>
        <text x="48" y="124" fontWeight="bold" fill="#8b5cf6">0,50</text>
        <text x="48" y="159">0,40</text>
        <text x="48" y="194">0,30</text>
      </g>

      {/* Elméleti valószínűség vonala: p = 0,50 (kiemelt lila szaggatott vonal) */}
      <line x1="55" y1="120" x2="400" y2="120" stroke="#8b5cf6" strokeWidth="2" strokeDasharray="4 4" />
      <text x="405" y="124" fontSize="10" fontWeight="bold" fill="#8b5cf6">p = 0,5</text>

      {/* Konvergencia sáv (szűkülő csatorna) */}
      <path
        d="M 75 75 Q 220 105 385 116 L 385 124 Q 220 135 75 165 Z"
        fill="#8b5cf6"
        opacity="0.1"
      />

      {/* Pontok koordinátái:
          x tengely: 50 -> 75, 100 -> 119, 150 -> 163, 200 -> 208, 250 -> 252, 300 -> 296, 350 -> 340, 400 -> 385
          y tengely (0,50 = 120; 0,01 = 3,5 px):
          50 dobás: 0,48 -> y = 120 + 2*3.5 = 127
          100 dobás: 0,49 -> y = 120 + 1*3.5 = 123.5
          150 dobás: 0,46 -> y = 120 + 4*3.5 = 134
          200 dobás: 0,47 -> y = 120 + 3*3.5 = 130.5
          250 dobás: 0,46 -> y = 134
          300 dobás: 0,49 -> y = 123.5
          350 dobás: 0,49 -> y = 123.5
          400 dobás: 0,50 -> y = 120
      */}
      {/* Vonal diagram */}
      <polyline
        fill="none"
        stroke="#7c3aed"
        strokeWidth="2.5"
        points="75,127 119,123.5 163,134 208,130.5 252,134 296,123.5 340,123.5 385,120"
      />

      {/* Adatpontok */}
      <g fill="#6d28d9">
        <circle cx="75" cy="127" r="4.5" />
        <circle cx="119" cy="123.5" r="4.5" />
        <circle cx="163" cy="134" r="4.5" />
        <circle cx="208" cy="130.5" r="4.5" />
        <circle cx="252" cy="134" r="4.5" />
        <circle cx="296" cy="123.5" r="4.5" />
        <circle cx="340" cy="123.5" r="4.5" />
        <circle cx="385" cy="120" r="5.5" fill="#10b981" stroke="#059669" strokeWidth="1.5" />
      </g>

      {/* X tengely */}
      <line x1="55" y1="190" x2="400" y2="190" stroke="#94a3b8" strokeWidth="2" />
      <g fontSize="9.5" fill="#475569" className="dark:fill-slate-300" textAnchor="middle">
        <text x="75" y="206">50</text>
        <text x="119" y="206">100</text>
        <text x="163" y="206">150</text>
        <text x="208" y="206">200</text>
        <text x="252" y="206">250</text>
        <text x="296" y="206">300</text>
        <text x="340" y="206">350</text>
        <text x="385" y="206" fontWeight="bold">400</text>
      </g>
      <text x="408" y="206" fontSize="9.5" fill="#64748b" textAnchor="start">dobás</text>

      {/* Tanulság sáv lent */}
      <g transform="translate(30, 222)">
        <rect width="380" height="36" rx="8" fill="#f5f3ff" className="dark:fill-purple-950/50 dark:stroke-purple-800" stroke="#ddd6fe" strokeWidth="1" />
        <text x="190" y="15" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#5b21b6" className="dark:fill-purple-200">
          A relatív gyakoriság stabilitásának törvénye:
        </text>
        <text x="190" y="28" textAnchor="middle" fontSize="9.5" fill="#6d28d9" className="dark:fill-purple-300">
          A kísérletszám növelésével az ingadozás csillapodik, és az elméleti 0,5 valószínűséghez simul!
        </text>
      </g>
    </svg>
  );
};

/**
 * 2. Három érme feldobása: 8 elemi esemény és Tibor tévedése
 * Cáfolja Tibor hibás "1/4 valószínűség" logikáját.
 */
export const ThreeCoinsOutcomesSvg: React.FC<FigureProps> = ({ className = '', size = 320 }) => {
  return (
    <svg
      viewBox="0 0 440 270"
      className={`w-full h-auto max-w-[440px] select-none ${className}`}
      style={{ maxHeight: size }}
    >
      <rect width="440" height="270" rx="16" fill="#f8fafc" className="dark:fill-slate-900" />
      <rect width="440" height="270" rx="16" fill="none" stroke="#e2e8f0" strokeWidth="1.5" className="dark:stroke-slate-800" />

      <text x="220" y="24" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1e293b" className="dark:fill-slate-100">
        3 érme feldobása: 8 egyenlően valószínű elemi esemény
      </text>

      {/* 8 doboz 4 kategóriában */}
      {/* 1. Kategória: 3 fej (1 eset: FFF) */}
      <g transform="translate(20, 42)">
        <rect width="90" height="95" rx="8" fill="#eff6ff" className="dark:fill-blue-950/40" stroke="#93c5fd" strokeWidth="1" />
        <text x="45" y="18" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#1e40af" className="dark:fill-blue-300">3 Fej (1 db)</text>
        <rect x="15" y="28" width="60" height="26" rx="5" fill="#3b82f6" />
        <text x="45" y="45" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#ffffff">FFF</text>
        <text x="45" y="80" textAnchor="middle" fontSize="11" fontWeight="black" fill="#1d4ed8">1/8 (12,5%)</text>
      </g>

      {/* 2. Kategória: 2 fej, 1 írás (3 eset: FFI, FIF, IFF) */}
      <g transform="translate(120, 42)">
        <rect width="95" height="95" rx="8" fill="#fdf4ff" className="dark:fill-fuchsia-950/40" stroke="#f0abfc" strokeWidth="1.5" />
        <text x="47.5" y="18" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#86198f" className="dark:fill-fuchsia-300">2 Fej, 1 Írás (3 db)</text>
        <g transform="translate(8, 28)">
          <rect x="0" y="0" width="24" height="24" rx="4" fill="#d946ef" />
          <text x="12" y="16" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#ffffff">FFI</text>

          <rect x="27" y="0" width="24" height="24" rx="4" fill="#d946ef" />
          <text x="39" y="16" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#ffffff">FIF</text>

          <rect x="54" y="0" width="24" height="24" rx="4" fill="#d946ef" />
          <text x="66" y="16" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#ffffff">IFF</text>
        </g>
        <text x="47.5" y="80" textAnchor="middle" fontSize="11" fontWeight="black" fill="#a21caf">3/8 (37,5%)</text>
      </g>

      {/* 3. Kategória: 1 fej, 2 írás (3 eset: FII, IFI, IIF) - KIEMELT KÉRDÉS */}
      <g transform="translate(225, 42)">
        <rect width="95" height="95" rx="8" fill="#ede9fe" className="dark:fill-purple-950/60" stroke="#8b5cf6" strokeWidth="2" />
        <text x="47.5" y="18" textAnchor="middle" fontSize="10" fontWeight="black" fill="#5b21b6" className="dark:fill-purple-200">1 Fej, 2 Írás ★</text>
        <g transform="translate(8, 28)">
          <rect x="0" y="0" width="24" height="24" rx="4" fill="#7c3aed" />
          <text x="12" y="16" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#ffffff">FII</text>

          <rect x="27" y="0" width="24" height="24" rx="4" fill="#7c3aed" />
          <text x="39" y="16" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#ffffff">IFI</text>

          <rect x="54" y="0" width="24" height="24" rx="4" fill="#7c3aed" />
          <text x="66" y="16" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#ffffff">IIF</text>
        </g>
        <text x="47.5" y="80" textAnchor="middle" fontSize="11" fontWeight="black" fill="#6d28d9">3/8 (37,5%)</text>
      </g>

      {/* 4. Kategória: 3 írás (1 eset: III) */}
      <g transform="translate(330, 42)">
        <rect width="90" height="95" rx="8" fill="#eff6ff" className="dark:fill-blue-950/40" stroke="#93c5fd" strokeWidth="1" />
        <text x="45" y="18" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#1e40af" className="dark:fill-blue-300">3 Írás (1 db)</text>
        <rect x="15" y="28" width="60" height="26" rx="5" fill="#3b82f6" />
        <text x="45" y="45" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#ffffff">III</text>
        <text x="45" y="80" textAnchor="middle" fontSize="11" fontWeight="black" fill="#1d4ed8">1/8 (12,5%)</text>
      </g>

      {/* Tibor tévedése figyelmeztető doboz */}
      <g transform="translate(20, 150)">
        <rect width="400" height="105" rx="12" fill="#fff1f2" className="dark:fill-rose-950/40 dark:stroke-rose-800" stroke="#fda4af" strokeWidth="1.2" />
        <text x="16" y="22" fontSize="11" fontWeight="bold" fill="#be123c">
          ⚠️ TIBOR CSAPDÁJA: Miért NEM 1/4 a valószínűség?
        </text>
        <text x="16" y="42" fontSize="10" fill="#334155" className="dark:fill-slate-300">
          Tibor úgy érvelt: 4 fajta eredmény van (3F, 2F1I, 1F2I, 3I), ezért a valószínűség 1/4 = 25%.
        </text>
        <text x="16" y="60" fontSize="10" fontWeight="bold" fill="#9f1239" className="dark:fill-rose-300">
          ❌ Hiba: Ez a 4 esemény NEM egyenlően valószínű!
        </text>
        <text x="16" y="78" fontSize="9.5" fill="#475569" className="dark:fill-slate-300">
          A mikroszkopikus elemi események száma 2 · 2 · 2 = <b>8 darab</b>. Az „1 fej és 2 írás” (FII, IFI, IIF) 3 elemi esetből áll!
        </text>
        <text x="16" y="96" fontSize="10.5" fontWeight="black" fill="#15803d" className="dark:fill-emerald-400">
          ✅ Helyes válasz: P(1 fej, 2 írás) = 3/8 = 37,5% (és a kísérleti relatív gyakoriság is ehhez tart!).
        </text>
      </g>
    </svg>
  );
};

/**
 * 3. 850 Kockadobás szimulációjának hisztogramja
 * Gyakoriságok: 1-es: 126, 2-es: 180, 3-as: 152, 4-es: 138, 5-ös: 119, 6-os: 135 (N=850)
 */
export const DiceSimulationFrequencySvg: React.FC<FigureProps> = ({ className = '', size = 320 }) => {
  return (
    <svg
      viewBox="0 0 440 260"
      className={`w-full h-auto max-w-[440px] select-none ${className}`}
      style={{ maxHeight: size }}
    >
      <rect width="440" height="260" rx="16" fill="#f8fafc" className="dark:fill-slate-900" />
      <rect width="440" height="260" rx="16" fill="none" stroke="#e2e8f0" strokeWidth="1.5" className="dark:stroke-slate-800" />

      <text x="220" y="24" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1e293b" className="dark:fill-slate-100">
        850 számítógépes kockadobás gyakorisági eloszlása
      </text>
      <text x="220" y="40" textAnchor="middle" fontSize="10" fill="#64748b" className="dark:fill-slate-400">
        Elméleti várható érték oldalanként: 850 / 6 ≈ 141,7 db
      </text>

      {/* Rácsvonalak */}
      <g stroke="#e2e8f0" strokeDasharray="3 3" strokeWidth="1" className="dark:stroke-slate-800">
        <line x1="50" y1="60" x2="400" y2="60" />
        <line x1="50" y1="95" x2="400" y2="95" />
        <line x1="50" y1="130" x2="400" y2="130" />
        <line x1="50" y1="165" x2="400" y2="165" />
      </g>

      {/* Y tengely skála */}
      <g fontSize="10" fill="#64748b" className="dark:fill-slate-400" textAnchor="end">
        <text x="42" y="64">200</text>
        <text x="42" y="99">150</text>
        <text x="42" y="134">100</text>
        <text x="42" y="169">0</text>
      </g>

      {/* Elméleti átlagvonal (141,7 db) -> y ≈ 101 */}
      <line x1="50" y1="101" x2="400" y2="101" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4 4" />
      <text x="403" y="104" fontSize="9" fontWeight="bold" fill="#d97706">141,7</text>

      {/* Oszlopok:
          1: 126 db -> h = 88px, y = 165 - 88 = 77
          2: 180 db (prím) -> h = 126px, y = 165 - 126 = 39 (kiemelt zöld)
          3: 152 db (prím) -> h = 106px, y = 59 (kiemelt zöld)
          4: 138 db (összetett) -> h = 97px, y = 68 (lila)
          5: 119 db (prím) -> h = 83px, y = 82 (kiemelt zöld)
          6: 135 db (összetett) -> h = 95px, y = 70 (lila)
      */}
      {/* 1 */}
      <rect x="65" y="77" width="45" height="88" rx="4" fill="#94a3b8" />
      <text x="87.5" y="70" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#475569" className="dark:fill-slate-300">126</text>
      <text x="87.5" y="182" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#475569" className="dark:fill-slate-300">1</text>

      {/* 2 (prím) */}
      <rect x="120" y="39" width="45" height="126" rx="4" fill="#10b981" />
      <text x="142.5" y="32" textAnchor="middle" fontSize="10.5" fontWeight="black" fill="#047857">180 ★</text>
      <text x="142.5" y="182" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#047857">2 (P)</text>

      {/* 3 (prím) */}
      <rect x="175" y="59" width="45" height="106" rx="4" fill="#10b981" />
      <text x="197.5" y="52" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#047857">152</text>
      <text x="197.5" y="182" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#047857">3 (P)</text>

      {/* 4 (összetett) */}
      <rect x="230" y="68" width="45" height="97" rx="4" fill="#8b5cf6" />
      <text x="252.5" y="61" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#6d28d9">138</text>
      <text x="252.5" y="182" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#6d28d9">4 (Ö)</text>

      {/* 5 (prím) */}
      <rect x="285" y="82" width="45" height="83" rx="4" fill="#10b981" />
      <text x="307.5" y="75" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#047857">119</text>
      <text x="307.5" y="182" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#047857">5 (P)</text>

      {/* 6 (összetett) */}
      <rect x="340" y="70" width="45" height="95" rx="4" fill="#8b5cf6" />
      <text x="362.5" y="63" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#6d28d9">135</text>
      <text x="362.5" y="182" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#6d28d9">6 (Ö)</text>

      {/* X tengely alapvonal */}
      <line x1="50" y1="165" x2="400" y2="165" stroke="#94a3b8" strokeWidth="2" />

      {/* Prímszámok vs Összetett számok összegzés */}
      <g transform="translate(30, 205)">
        <text x="0" y="14" fontSize="10.5" fontWeight="bold" fill="#1e293b" className="dark:fill-slate-200">
          • Prímszámok (2, 3, 5): <tspan fill="#059669">451 db (53,06%)</tspan> | • Összetett (4, 6): <tspan fill="#7c3aed">273 db (32,12%)</tspan>
        </text>
        <text x="0" y="30" fontSize="9.5" fill="#64748b" className="dark:fill-slate-400">
          Legalább 5-ös dobás (5 és 6): 119 + 135 = 254 db (29,88%, elméleti: 2/6 ≈ 33,3%).
        </text>
      </g>
    </svg>
  );
};

