import React from 'react';

interface FigureProps {
  className?: string;
  size?: number;
}

/**
 * 1. Bence típushibája: Súlyozatlan vs. Súlyozott csoportátlag (Átlagok átlaga)
 * Két csoport: A={5, 7} (n=2, átlag=6) és B={2, 3, 4} (n=3, átlag=3)
 * Hibás átlagolás: (6 + 3) / 2 = 4,5
 * Helyes súlyozott átlag: (2·6 + 3·3) / 5 = 21 / 5 = 4,2
 */
export const BenceTrapAverageOfAveragesSvg: React.FC<FigureProps> = ({ className = '', size = 320 }) => {
  return (
    <svg
      viewBox="0 0 440 270"
      className={`w-full h-auto max-w-[440px] select-none ${className}`}
      style={{ maxHeight: size }}
    >
      <rect width="440" height="270" rx="16" fill="#f8fafc" className="dark:fill-slate-900" />
      <rect width="440" height="270" rx="16" fill="none" stroke="#e2e8f0" strokeWidth="1.5" className="dark:stroke-slate-800" />

      <text x="220" y="24" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1e293b" className="dark:fill-slate-100">
        Átlagok átlaga csapda: Bence gyors, hibás számolása
      </text>

      {/* Bal oldal: 1. Csoport (n1 = 2) */}
      <g transform="translate(25, 45)">
        <rect width="185" height="85" rx="12" fill="#eff6ff" className="dark:fill-blue-950/40" stroke="#bfdbfe" strokeWidth="1" />
        <text x="14" y="20" fontSize="11" fontWeight="bold" fill="#1d4ed8" className="dark:fill-blue-300">
          1. Csoport: {'{5; 7}'}
        </text>
        <text x="14" y="38" fontSize="10" fill="#64748b" className="dark:fill-slate-400">
          Létszám: <tspan fontWeight="bold" fill="#1e293b" className="dark:fill-slate-200">n₁ = 2 db</tspan>
        </text>
        <text x="14" y="56" fontSize="10" fill="#64748b" className="dark:fill-slate-400">
          Összeg: 5 + 7 = 12
        </text>
        <rect x="14" y="62" width="157" height="18" rx="5" fill="#3b82f6" />
        <text x="92.5" y="75" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#ffffff">
          Átlag₁: x̄₁ = 6,0
        </text>
      </g>

      {/* Jobb oldal: 2. Csoport (n2 = 3) */}
      <g transform="translate(230, 45)">
        <rect width="185" height="85" rx="12" fill="#f5f3ff" className="dark:fill-indigo-950/40" stroke="#ddd6fe" strokeWidth="1" />
        <text x="14" y="20" fontSize="11" fontWeight="bold" fill="#6d28d9" className="dark:fill-indigo-300">
          2. Csoport: {'{2; 3; 4}'}
        </text>
        <text x="14" y="38" fontSize="10" fill="#64748b" className="dark:fill-slate-400">
          Létszám: <tspan fontWeight="bold" fill="#1e293b" className="dark:fill-slate-200">n₂ = 3 db (több!)</tspan>
        </text>
        <text x="14" y="56" fontSize="10" fill="#64748b" className="dark:fill-slate-400">
          Összeg: 2 + 3 + 4 = 9
        </text>
        <rect x="14" y="62" width="157" height="18" rx="5" fill="#6366f1" />
        <text x="92.5" y="75" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#ffffff">
          Átlag₂: x̄₂ = 3,0
        </text>
      </g>

      {/* Összehasonlítás lent */}
      {/* Hibás módszer (Bence) */}
      <g transform="translate(25, 145)">
        <rect width="185" height="105" rx="10" fill="#fff1f2" className="dark:fill-rose-950/40" stroke="#fecdd3" strokeWidth="1.2" />
        <text x="12" y="20" fontSize="11" fontWeight="bold" fill="#e11d48">
          ❌ Bence hibás átlaga:
        </text>
        <text x="12" y="40" fontSize="10" fill="#475569" className="dark:fill-slate-300">
          Egyszerűen átlagolta az átlagokat:
        </text>
        <rect x="12" y="48" width="161" height="26" rx="6" fill="#ffe4e6" className="dark:fill-rose-900/60" />
        <text x="92.5" y="65" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#be123c">
          (6,0 + 3,0) / 2 = 4,5
        </text>
        <text x="12" y="90" fontSize="9.5" fill="#9f1239" className="dark:fill-rose-300" fontStyle="italic">
          ⚠️ Hiba: figyelmen kívül hagyta, hogy a 2. csoportban többen vannak!
        </text>
      </g>

      {/* Helyes módszer (Súlyozott átlag) */}
      <g transform="translate(230, 145)">
        <rect width="185" height="105" rx="10" fill="#f0fdf4" className="dark:fill-emerald-950/40" stroke="#bbf7d0" strokeWidth="1.2" />
        <text x="12" y="20" fontSize="11" fontWeight="bold" fill="#16a34a">
          ✅ Helyes súlyozott átlag:
        </text>
        <text x="12" y="40" fontSize="10" fill="#475569" className="dark:fill-slate-300">
          Létszámokkal súlyozva:
        </text>
        <rect x="12" y="48" width="161" height="26" rx="6" fill="#dcfce7" className="dark:fill-emerald-900/60" />
        <text x="92.5" y="65" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#15803d">
          (2·6 + 3·3) / 5 = 4,2
        </text>
        <text x="12" y="90" fontSize="9.5" fill="#166534" className="dark:fill-emerald-300" fontStyle="italic">
          💡 A nagyobb létszám (3 db) maga felé húzza az átlagot (4,2 &lt; 4,5)!
        </text>
      </g>
    </svg>
  );
};

/**
 * 2. Osztályba sorolás hisztogram: Osztályközök és osztályközepek
 * Tankönyvi izzók élettartama (950–1200 óra, 200 db izzó)
 */
export const ClassIntervalHistogramSvg: React.FC<FigureProps> = ({ className = '', size = 320 }) => {
  return (
    <svg
      viewBox="0 0 440 270"
      className={`w-full h-auto max-w-[440px] select-none ${className}`}
      style={{ maxHeight: size }}
    >
      <defs>
        <linearGradient id="classBarGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6366f1" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#4338ca" stopOpacity="0.65" />
        </linearGradient>
      </defs>

      <rect width="440" height="270" rx="16" fill="#f8fafc" className="dark:fill-slate-900" />
      <rect width="440" height="270" rx="16" fill="none" stroke="#e2e8f0" strokeWidth="1.5" className="dark:stroke-slate-800" />

      <text x="220" y="24" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1e293b" className="dark:fill-slate-100">
        Izzók élettartama: Osztályközök és Osztályközepek
      </text>
      <text x="220" y="40" textAnchor="middle" fontSize="10" fill="#64748b" className="dark:fill-slate-400">
        200 izzó mérése 50 órás intervallumokban [óra]
      </text>

      {/* Rácsvonalak */}
      <g stroke="#e2e8f0" strokeDasharray="3 3" strokeWidth="1" className="dark:stroke-slate-800">
        <line x1="50" y1="60" x2="400" y2="60" />
        <line x1="50" y1="95" x2="400" y2="95" />
        <line x1="50" y1="130" x2="400" y2="130" />
        <line x1="50" y1="165" x2="400" y2="165" />
      </g>

      {/* Y tengely (db) */}
      <g fontSize="10" fill="#64748b" className="dark:fill-slate-400" textAnchor="end">
        <text x="42" y="64">60</text>
        <text x="42" y="99">40</text>
        <text x="42" y="134">20</text>
        <text x="42" y="169">0</text>
      </g>

      {/* 5 szomszédos oszlop (hézag nélkül - folytonos hisztogram) */}
      <rect x="65" y="116" width="65" height="49" fill="url(#classBarGrad)" stroke="#312e81" strokeWidth="1" />
      <text x="97.5" y="110" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#4338ca" className="dark:fill-indigo-300">28 db</text>

      <rect x="130" y="95" width="65" height="70" fill="url(#classBarGrad)" stroke="#312e81" strokeWidth="1" />
      <text x="162.5" y="89" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#4338ca" className="dark:fill-indigo-300">40 db</text>

      <rect x="195" y="58" width="65" height="107" fill="#4f46e5" stroke="#312e81" strokeWidth="1.5" />
      <text x="227.5" y="52" textAnchor="middle" fontSize="10.5" fontWeight="black" fill="#312e81" className="dark:fill-indigo-200">61 db ★</text>

      <rect x="260" y="86" width="65" height="79" fill="url(#classBarGrad)" stroke="#312e81" strokeWidth="1" />
      <text x="292.5" y="80" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#4338ca" className="dark:fill-indigo-300">45 db</text>

      <rect x="325" y="120" width="65" height="45" fill="url(#classBarGrad)" stroke="#312e81" strokeWidth="1" />
      <text x="357.5" y="114" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#4338ca" className="dark:fill-indigo-300">26 db</text>

      {/* X tengely határok */}
      <line x1="50" y1="165" x2="405" y2="165" stroke="#94a3b8" strokeWidth="2" />
      <g fontSize="9.5" fill="#475569" className="dark:fill-slate-300" textAnchor="middle">
        <text x="65" y="180">950</text>
        <text x="130" y="180">1000</text>
        <text x="195" y="180">1050</text>
        <text x="260" y="180">1100</text>
        <text x="325" y="180">1150</text>
        <text x="390" y="180">1200</text>
      </g>
      <text x="408" y="180" fontSize="10" fill="#64748b" textAnchor="start">óra</text>

      {/* Osztályközepek jelölése alul */}
      <g fontSize="9.5" fontWeight="bold" fill="#d97706" textAnchor="middle">
        <text x="97.5" y="202">975</text>
        <text x="162.5" y="202">1025</text>
        <text x="227.5" y="202">1075</text>
        <text x="292.5" y="202">1125</text>
        <text x="357.5" y="202">1175</text>
      </g>
      <text x="35" y="202" fontSize="9.5" fontWeight="bold" fill="#d97706" textAnchor="end">Osztályközép:</text>

      {/* Számítás összefoglaló kártya */}
      <g transform="translate(30, 218)">
        <rect width="380" height="40" rx="8" fill="#e0e7ff" className="dark:fill-indigo-950/50" stroke="#c7d2fe" strokeWidth="1" />
        <text x="190" y="16" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#3730a3" className="dark:fill-indigo-200">
          Súlyozott átlag az osztályközepekkel: x̄ ≈ 1076,8 óra
        </text>
        <text x="190" y="30" textAnchor="middle" fontSize="9" fill="#4338ca" className="dark:fill-indigo-300">
          (28·975 + 40·1025 + 61·1075 + 45·1125 + 26·1175) / 200 = 215 350 / 200 = 1076,75 óra
        </text>
      </g>
    </svg>
  );
};

export const HistogramIntervalsSvg = ClassIntervalHistogramSvg;

/**
 * 3. 10. évfolyam magasságok: 4 csoport összevonása
 * 10.A fiúk (14, 176cm), 10.A lányok (18, 170cm), 10.B fiúk (15, 172cm), 10.B lányok (19, 168cm)
 */
export const Grade10CohortHeightSvg: React.FC<FigureProps> = ({ className = '', size = 320 }) => {
  return (
    <svg
      viewBox="0 0 440 260"
      className={`w-full h-auto max-w-[440px] select-none ${className}`}
      style={{ maxHeight: size }}
    >
      <rect width="440" height="260" rx="16" fill="#f8fafc" className="dark:fill-slate-900" />
      <rect width="440" height="260" rx="16" fill="none" stroke="#e2e8f0" strokeWidth="1.5" className="dark:stroke-slate-800" />

      <text x="220" y="24" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1e293b" className="dark:fill-slate-100">
        10. Évfolyam testmagasság: 4 csoport helyes súlyozása
      </text>

      {/* 4 Csoport kártya */}
      <g transform="translate(20, 42)">
        {/* 10.A Fiúk */}
        <rect x="0" y="0" width="92" height="75" rx="8" fill="#dbeafe" className="dark:fill-blue-950/60" stroke="#93c5fd" strokeWidth="1" />
        <text x="46" y="16" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#1e40af" className="dark:fill-blue-300">10.A Fiúk</text>
        <text x="46" y="32" textAnchor="middle" fontSize="13" fontWeight="black" fill="#1d4ed8">176 cm</text>
        <text x="46" y="48" textAnchor="middle" fontSize="9.5" fill="#64748b">14 fő</text>
        <text x="46" y="64" textAnchor="middle" fontSize="9" fontWeight="semibold" fill="#2563eb">Σ = 2464</text>

        {/* 10.A Lányok */}
        <rect x="102" y="0" width="92" height="75" rx="8" fill="#fce7f3" className="dark:fill-pink-950/60" stroke="#fbcfe8" strokeWidth="1" />
        <text x="148" y="16" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#9d174d" className="dark:fill-pink-300">10.A Lányok</text>
        <text x="148" y="32" textAnchor="middle" fontSize="13" fontWeight="black" fill="#be185d">170 cm</text>
        <text x="148" y="48" textAnchor="middle" fontSize="9.5" fill="#64748b">18 fő</text>
        <text x="148" y="64" textAnchor="middle" fontSize="9" fontWeight="semibold" fill="#db2777">Σ = 3060</text>

        {/* 10.B Fiúk */}
        <rect x="204" y="0" width="92" height="75" rx="8" fill="#dbeafe" className="dark:fill-blue-950/60" stroke="#93c5fd" strokeWidth="1" />
        <text x="250" y="16" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#1e40af" className="dark:fill-blue-300">10.B Fiúk</text>
        <text x="250" y="32" textAnchor="middle" fontSize="13" fontWeight="black" fill="#1d4ed8">172 cm</text>
        <text x="250" y="48" textAnchor="middle" fontSize="9.5" fill="#64748b">15 fő</text>
        <text x="250" y="64" textAnchor="middle" fontSize="9" fontWeight="semibold" fill="#2563eb">Σ = 2580</text>

        {/* 10.B Lányok */}
        <rect x="306" y="0" width="94" height="75" rx="8" fill="#fce7f3" className="dark:fill-pink-950/60" stroke="#fbcfe8" strokeWidth="1" />
        <text x="353" y="16" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#9d174d" className="dark:fill-pink-300">10.B Lányok</text>
        <text x="353" y="32" textAnchor="middle" fontSize="13" fontWeight="black" fill="#be185d">168 cm</text>
        <text x="353" y="48" textAnchor="middle" fontSize="9.5" fill="#64748b">19 fő</text>
        <text x="353" y="64" textAnchor="middle" fontSize="9" fontWeight="semibold" fill="#db2777">Σ = 3192</text>
      </g>

      {/* Nyilak lefelé az összesítésbe */}
      <path d="M 115 125 L 220 148 M 325 125 L 220 148" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="2 2" />

      {/* Összesített évfolyam kártya */}
      <g transform="translate(30, 155)">
        <rect width="380" height="90" rx="12" fill="#eff6ff" className="dark:fill-indigo-950/40" stroke="#6366f1" strokeWidth="1.5" />
        <text x="190" y="24" textAnchor="middle" fontSize="12" fontWeight="black" fill="#312e81" className="dark:fill-indigo-200">
          Évfolyamszintű összegzés (n_összes = 66 tanuló)
        </text>
        <text x="190" y="46" textAnchor="middle" fontSize="10.5" fill="#4338ca" className="dark:fill-indigo-300">
          Teljes magasságösszeg: 2464 + 3060 + 2580 + 3192 = <tspan fontWeight="bold">11 296 cm</tspan>
        </text>
        <rect x="70" y="55" width="240" height="26" rx="6" fill="#4f46e5" />
        <text x="190" y="72" textAnchor="middle" fontSize="12.5" fontWeight="bold" fill="#ffffff">
          Évfolyam átlag: 11 296 / 66 ≈ 171,15 cm
        </text>
      </g>
    </svg>
  );
};

/**
 * 4. Folytonos vs Diszkrét hisztogram összehasonlítása
 * Folytonos: oszlopok összeérnek (nincs rés), diszkrét: szünetekkel
 */
export const ContinuousVsDiscreteHistogramSvg: React.FC<FigureProps> = ({ className = '', size = 320 }) => {
  return (
    <svg
      viewBox="0 0 440 220"
      className={`w-full h-auto max-w-[440px] select-none ${className}`}
      style={{ maxHeight: size }}
    >
      <rect width="440" height="220" rx="16" fill="#f8fafc" className="dark:fill-slate-900" />
      <rect width="440" height="220" rx="16" fill="none" stroke="#e2e8f0" strokeWidth="1.5" className="dark:stroke-slate-800" />

      <text x="220" y="24" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1e293b" className="dark:fill-slate-100">
        Folytonos hisztogram: nincs rés az oszlopok között!
      </text>

      {/* Bal oldal: Helytelen (résekkel) */}
      <g transform="translate(25, 45)">
        <rect width="185" height="150" rx="10" fill="#fff1f2" className="dark:fill-rose-950/40" stroke="#fecdd3" strokeWidth="1" />
        <text x="92.5" y="22" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#e11d48">
          ❌ Téves: Rések az oszlopok közt
        </text>
        {/* Oszlopok réssel */}
        <line x1="20" y1="110" x2="165" y2="110" stroke="#cbd5e1" strokeWidth="1.5" />
        <rect x="25" y="60" width="28" height="50" fill="#f43f5e" rx="2" />
        <rect x="63" y="40" width="28" height="70" fill="#f43f5e" rx="2" />
        <rect x="101" y="50" width="28" height="60" fill="#f43f5e" rx="2" />
        <rect x="139" y="75" width="22" height="35" fill="#f43f5e" rx="2" />
        <text x="92.5" y="132" textAnchor="middle" fontSize="9.5" fill="#9f1239">
          Ez oszlopdiagram, nem hisztogram
        </text>
      </g>

      {/* Jobb oldal: Helyes (összeérő oszlopok) */}
      <g transform="translate(230, 45)">
        <rect width="185" height="150" rx="10" fill="#f0fdf4" className="dark:fill-emerald-950/40" stroke="#bbf7d0" strokeWidth="1" />
        <text x="92.5" y="22" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#16a34a">
          ✅ Helyes: Folytonos határok
        </text>
        {/* Oszlopok összeérve */}
        <line x1="20" y1="110" x2="165" y2="110" stroke="#cbd5e1" strokeWidth="1.5" />
        <rect x="25" y="60" width="35" height="50" fill="#10b981" stroke="#047857" strokeWidth="1" />
        <rect x="60" y="40" width="35" height="70" fill="#10b981" stroke="#047857" strokeWidth="1" />
        <rect x="95" y="50" width="35" height="60" fill="#10b981" stroke="#047857" strokeWidth="1" />
        <rect x="130" y="75" width="35" height="35" fill="#10b981" stroke="#047857" strokeWidth="1" />
        <text x="92.5" y="132" textAnchor="middle" fontSize="9.5" fill="#166534">
          Nincs szünet: az intervallumok folytonosak
        </text>
      </g>
    </svg>
  );
};
