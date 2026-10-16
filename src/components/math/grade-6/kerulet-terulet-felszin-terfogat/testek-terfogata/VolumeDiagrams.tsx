import React from 'react';

/**
 * 1. Térfogat réteges felépítése egységkockákkal (V = Ta · m)
 */
export const UnitCubeLayersSvg: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-center p-4 rounded-2xl bg-white dark:bg-slate-900 border border-teal-200 dark:border-teal-900/60 shadow-xs">
      <div className="text-center mb-2">
        <span className="text-xs font-bold text-teal-900 dark:text-teal-300 uppercase tracking-wider">
          A térfogat réteges felépítése: Alapterület · Magasság
        </span>
      </div>
      <div className="w-full max-w-[620px]">
        <svg viewBox="0 0 580 230" className="w-full h-auto drop-shadow-xs">
          {/* Bal: Réteges izometrikus téglatest (4 x 3 x 2 egység) */}
          <g transform="translate(130, 130)">
            {/* Alsó réteg (1. réteg, 4x3 = 12 kocka) */}
            <polygon points="-70,20 10,60 10,20 -70,-20" fill="#2dd4bf" stroke="#0f766e" strokeWidth="1.5" />
            <polygon points="10,60 80,25 80,-15 10,20" fill="#14b8a6" stroke="#0f766e" strokeWidth="1.5" />
            <polygon points="-70,-20 10,20 80,-15 0,-55" fill="#5eead4" stroke="#0f766e" strokeWidth="1.5" />

            {/* Felső réteg (2. réteg) */}
            <polygon points="-70,-20 10,20 10,-20 -70,-60" fill="#99f6e4" stroke="#0f766e" strokeWidth="1.5" />
            <polygon points="10,20 80,-15 80,-55 10,-20" fill="#5eead4" stroke="#0f766e" strokeWidth="1.5" />
            <polygon points="-70,-60 10,-20 80,-55 0,-95" fill="#ccfbf1" stroke="#0f766e" strokeWidth="1.5" />

            {/* Rácsvonalak a felső lapon (4 oszlop x 3 sor) */}
            <line x1="-50" y1="-50" x2="30" y2="-10" stroke="#0f766e" strokeWidth="1" strokeDasharray="2,2" />
            <line x1="-30" y1="-40" x2="50" y2="0" stroke="#0f766e" strokeWidth="1" strokeDasharray="2,2" />
            <line x1="-10" y1="-30" x2="70" y2="10" stroke="#0f766e" strokeWidth="1" strokeDasharray="2,2" />

            {/* Méretek */}
            <text x="-35" y="55" fill="#134e4a" fontSize="12" fontWeight="black">a = 4 cm (4 kocka)</text>
            <text x="60" y="48" fill="#134e4a" fontSize="11" fontWeight="black">b = 3 cm</text>
            <text x="-80" y="-35" fill="#0f766e" fontSize="11" fontWeight="black">c = 2 cm (2 réteg)</text>
          </g>

          {/* Jobb: Magyarázat */}
          <g transform="translate(340, 25)">
            <rect x="0" y="0" width="220" height="180" rx="12" fill="#f0fdfa" stroke="#99f6e4" strokeWidth="1.5" />
            <text x="15" y="24" fill="#134e4a" fontSize="12" fontWeight="bold">Hogyan számolunk?</text>

            <g transform="translate(15, 36)">
              <rect x="0" y="0" width="190" height="34" rx="6" fill="#ccfbf1" />
              <text x="10" y="14" fill="#115e59" fontSize="10" fontWeight="bold">1. Alapterület (1 rétegben):</text>
              <text x="10" y="27" fill="#0f766e" fontSize="11" fontWeight="black">T_a = 4 · 3 = 12 db kocka (12 cm²)</text>
            </g>

            <g transform="translate(15, 78)">
              <rect x="0" y="0" width="190" height="34" rx="6" fill="#ccfbf1" />
              <text x="10" y="14" fill="#115e59" fontSize="10" fontWeight="bold">2. Magasság (rétegek száma):</text>
              <text x="10" y="27" fill="#0f766e" fontSize="11" fontWeight="black">m = 2 réteg egymáson</text>
            </g>

            <g transform="translate(15, 122)">
              <rect x="0" y="0" width="190" height="46" rx="6" fill="#115e59" />
              <text x="95" y="18" fill="#5eead4" fontSize="10" fontWeight="bold" textAnchor="middle">TELJES TÉRFOGAT:</text>
              <text x="95" y="36" fill="#ffffff" fontSize="13" fontWeight="black" textAnchor="middle">
                V = 12 · 2 = 24 cm³ (V = T_a · m)
              </text>
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
};

/**
 * 2. Kocka térfogata (V = a³)
 */
export const CubeVolumeSvg: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-center p-4 rounded-2xl bg-white dark:bg-slate-900 border border-indigo-200 dark:border-indigo-900/60 shadow-xs">
      <div className="text-center mb-2">
        <span className="text-xs font-bold text-indigo-900 dark:text-indigo-300 uppercase tracking-wider">
          A kocka térfogata: V = a · a · a = a³
        </span>
      </div>
      <div className="w-full max-w-[560px]">
        <svg viewBox="0 0 520 200" className="w-full h-auto drop-shadow-xs">
          {/* Izometrikus kocka (3x3x3 háló) */}
          <g transform="translate(120, 105)">
            <polygon points="-50,15 25,50 25,-25 -50,-60" fill="#c7d2fe" stroke="#4f46e5" strokeWidth="2" />
            <polygon points="25,50 85,20 85,-55 25,-25" fill="#a5b4fc" stroke="#4338ca" strokeWidth="2" />
            <polygon points="-50,-60 25,-25 85,-55 10,-90" fill="#e0e7ff" stroke="#4f46e5" strokeWidth="2" />

            {/* 3x3 osztások a felső és oldalsó lapokon */}
            <line x1="-25" y1="-43" x2="50" y2="-8" stroke="#4f46e5" strokeWidth="1" strokeDasharray="2,2" />
            <line x1="0" y1="-26" x2="75" y2="9" stroke="#4f46e5" strokeWidth="1" strokeDasharray="2,2" />

            <text x="-12" y="52" fill="#312e81" fontSize="12" fontWeight="black" textAnchor="middle">a = 3 cm</text>
            <text x="65" y="48" fill="#312e81" fontSize="12" fontWeight="black" textAnchor="middle">a = 3 cm</text>
            <text x="-60" y="-20" fill="#312e81" fontSize="12" fontWeight="black" textAnchor="middle">a = 3 cm</text>
          </g>

          {/* Jobb oldali levezetés */}
          <g transform="translate(290, 25)">
            <rect x="0" y="0" width="210" height="150" rx="10" fill="#eef2ff" stroke="#c7d2fe" strokeWidth="1.5" />
            <text x="15" y="24" fill="#312e81" fontSize="12" fontWeight="bold">Kocka térfogatképlete:</text>

            <g transform="translate(15, 35)">
              <rect x="0" y="0" width="180" height="34" rx="6" fill="#ffffff" stroke="#c7d2fe" />
              <text x="90" y="22" fill="#4338ca" fontSize="15" fontWeight="black" textAnchor="middle">
                V = a³ (a · a · a)
              </text>
            </g>

            <text x="15" y="92" fill="#475569" fontSize="11">Példa: a = 3 cm esetén:</text>
            <text x="15" y="112" fill="#312e81" fontSize="13" fontWeight="bold">V = 3 · 3 · 3 = 27 cm³</text>
            <text x="15" y="132" fill="#15803d" fontSize="11" fontWeight="bold">
              (27 darab 1 cm³-es kiskocka)
            </text>
          </g>
        </svg>
      </div>
    </div>
  );
};

/**
 * 3. Vízszintemelkedés szilárd test bemerítésekor (Archimédész elve: V_test = Ta · Δm)
 */
export const WaterDisplacementVolumeSvg: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-center p-4 rounded-2xl bg-white dark:bg-slate-900 border border-cyan-200 dark:border-cyan-900/60 shadow-xs">
      <div className="text-center mb-2">
        <span className="text-xs font-black uppercase tracking-wider text-cyan-900 dark:text-cyan-300">
          Gyakorlati feladat: Test bemerítése és vízszintemelkedés (V_test = T_alap · Δm)
        </span>
      </div>
      <div className="w-full max-w-[640px]">
        <svg viewBox="0 0 600 220" className="w-full h-auto drop-shadow-xs">
          {/* 1. Állapot: Eredeti vízszint (balra) */}
          <g transform="translate(50, 40)">
            <rect x="0" y="0" width="130" height="120" rx="4" fill="#f0f9ff" stroke="#0284c7" strokeWidth="2" />
            {/* Víz */}
            <rect x="2" y="50" width="126" height="68" fill="#38bdf8" fillOpacity="0.5" />
            <line x1="0" y1="50" x2="130" y2="50" stroke="#0284c7" strokeWidth="1.5" strokeDasharray="3,3" />

            {/* Vízszint felirat */}
            <text x="65" y="75" fill="#0369a1" fontSize="11" fontWeight="bold" textAnchor="middle">
              Kezdő vízszint (m₁)
            </text>
            <text x="65" y="140" fill="#64748b" fontSize="11" textAnchor="middle">
              1. Eredeti edény
            </text>
          </g>

          {/* Közép: Test behelyezése nyíl */}
          <g transform="translate(205, 95)">
            {/* Test (szürke kavics/fémkocka) */}
            <rect x="5" y="-35" width="28" height="28" rx="4" fill="#64748b" stroke="#334155" strokeWidth="1.5" />
            <text x="19" y="-18" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">Test</text>

            <path d="M 19 -2 L 19 25" stroke="#0284c7" strokeWidth="2" markerEnd="url(#volArrowRight)" />
            <text x="19" y="38" fill="#0369a1" fontSize="9" fontWeight="bold" textAnchor="middle">Bemerítés</text>
          </g>

          {/* 2. Állapot: Megemelkedett vízszint a testtel */}
          <g transform="translate(270, 40)">
            <rect x="0" y="0" width="130" height="120" rx="4" fill="#f0f9ff" stroke="#0284c7" strokeWidth="2" />
            {/* Eredeti vízrész */}
            <rect x="2" y="50" width="126" height="68" fill="#38bdf8" fillOpacity="0.5" />

            {/* Bemerített kő az alján */}
            <rect x="50" y="85" width="30" height="30" rx="4" fill="#64748b" stroke="#334155" strokeWidth="1.5" />

            {/* Megemelkedett réteg (Δm) kiemelve sötétebb kékkel */}
            <rect x="2" y="25" width="126" height="25" fill="#0284c7" fillOpacity="0.6" stroke="#0369a1" strokeWidth="1.5" />
            <text x="65" y="42" fill="#ffffff" fontSize="10" fontWeight="black" textAnchor="middle">
              Δm vízréteg = V_test!
            </text>

            <text x="65" y="140" fill="#64748b" fontSize="11" textAnchor="middle">
              2. Test a vízben
            </text>

            {/* Magasságváltozás mérőzsinór */}
            <line x1="138" y1="25" x2="138" y2="50" stroke="#dc2626" strokeWidth="2" />
            <text x="146" y="41" fill="#dc2626" fontSize="11" fontWeight="bold">Δm</text>
          </g>

          {/* Jobb: Számítási magyarázat */}
          <g transform="translate(440, 35)">
            <rect x="0" y="0" width="150" height="140" rx="10" fill="#ecfeff" stroke="#a5f3fc" strokeWidth="1.5" />
            <text x="12" y="22" fill="#155e75" fontSize="11" fontWeight="bold">Kiszorított víz:</text>
            <text x="12" y="45" fill="#0e7490" fontSize="12" fontWeight="black">
              V_test = T_alap · Δm
            </text>
            <line x1="12" y1="56" x2="138" y2="56" stroke="#cffafe" strokeWidth="1" />
            <text x="12" y="74" fill="#475569" fontSize="10">A test térfogata</text>
            <text x="12" y="88" fill="#475569" fontSize="10">pontosan egyenlő</text>
            <text x="12" y="102" fill="#475569" fontSize="10">a megemelt víz</text>
            <text x="12" y="116" fill="#166534" fontSize="10" fontWeight="bold">hasábtérfogatával!</text>
          </g>
        </svg>
      </div>
    </div>
  );
};

/**
 * 4. A köbös növekedés csapdája: Élhossz duplázása -> 8-szoros térfogat (2³ = 8)
 */
export const CubeScaleDoubleVolumeSvg: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-center p-4 rounded-2xl bg-white dark:bg-slate-900 border border-rose-200 dark:border-rose-900/60 shadow-xs">
      <div className="text-center mb-2">
        <span className="text-xs font-black uppercase tracking-wider text-rose-900 dark:text-rose-300">
          Csapda: Él duplázása nem duplázza a térfogatot, hanem 8-szorozza! (2³ = 8)
        </span>
      </div>
      <div className="w-full max-w-[560px]">
        <svg viewBox="0 0 520 200" className="w-full h-auto drop-shadow-xs">
          {/* Bal: 1 cm-es kocka */}
          <g transform="translate(80, 110)">
            <polygon points="-25,8 12,25 12,-12 -25,-30" fill="#fecdd3" stroke="#e11d48" strokeWidth="1.5" />
            <polygon points="12,25 42,10 42,-28 12,-12" fill="#fda4af" stroke="#be123c" strokeWidth="1.5" />
            <polygon points="-25,-30 12,-12 42,-28 5,-45" fill="#ffe4e6" stroke="#e11d48" strokeWidth="1.5" />

            <text x="8" y="42" fill="#9f1239" fontSize="11" fontWeight="bold" textAnchor="middle">
              a = 1 cm
            </text>
            <text x="8" y="58" fill="#be123c" fontSize="12" fontWeight="black" textAnchor="middle">
              V₁ = 1 cm³
            </text>
          </g>

          <text x="165" y="105" fill="#64748b" fontSize="18" fontWeight="bold" textAnchor="middle">vs.</text>

          {/* Jobb: 2 cm-es kocka (8 darab 1 cm-es kiskockából összerakva) */}
          <g transform="translate(260, 110)">
            {/* 2x2x2 kocka */}
            <polygon points="-50,15 25,50 25,-25 -50,-60" fill="#fecdd3" stroke="#e11d48" strokeWidth="1.8" />
            <polygon points="25,50 85,20 85,-55 25,-25" fill="#fda4af" stroke="#be123c" strokeWidth="1.8" />
            <polygon points="-50,-60 25,-25 85,-55 10,-90" fill="#ffe4e6" stroke="#e11d48" strokeWidth="1.8" />

            {/* Felező vonalak a 8 kiskockához */}
            <line x1="-12" y1="32" x2="-12" y2="-42" stroke="#be123c" strokeWidth="1.5" />
            <line x1="-50" y1="-22" x2="25" y2="12" stroke="#be123c" strokeWidth="1.5" />
            <line x1="55" y1="35" x2="55" y2="-38" stroke="#be123c" strokeWidth="1.5" />
            <line x1="25" y1="12" x2="85" y2="-18" stroke="#be123c" strokeWidth="1.5" />

            <text x="18" y="68" fill="#9f1239" fontSize="11" fontWeight="bold" textAnchor="middle">
              a = 2 cm (2 · 1 cm)
            </text>
            <text x="18" y="85" fill="#be123c" fontSize="13" fontWeight="black" textAnchor="middle">
              V₂ = 2³ = 8 cm³
            </text>
          </g>

          {/* Magyarázó kártya jobb szélen */}
          <g transform="translate(370, 30)">
            <rect x="0" y="0" width="140" height="145" rx="10" fill="#fff1f2" stroke="#fecdd3" strokeWidth="1.5" />
            <text x="10" y="20" fill="#9f1239" fontSize="10" fontWeight="bold">Kétszeres él:</text>
            <text x="10" y="38" fill="#e11d48" fontSize="14" fontWeight="black">2 · a</text>
            <line x1="10" y1="48" x2="130" y2="48" stroke="#fecdd3" strokeWidth="1" />
            <text x="10" y="66" fill="#9f1239" fontSize="10" fontWeight="bold">Felszín: 2² = 4-szeres</text>
            <text x="10" y="82" fill="#e11d48" fontSize="11" fontWeight="bold">A₂ = 4 · A₁</text>
            <line x1="10" y1="92" x2="130" y2="92" stroke="#fecdd3" strokeWidth="1" />
            <text x="10" y="110" fill="#881337" fontSize="10" fontWeight="bold">Térfogat: 2³ = 8-szoros!</text>
            <text x="10" y="130" fill="#881337" fontSize="13" fontWeight="black">V₂ = 8 · V₁</text>
          </g>
        </svg>
      </div>
    </div>
  );
};
