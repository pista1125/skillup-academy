import React from 'react';

/**
 * 1. Nyitott test: Felül nyitott üvegakvárium (5 lap)
 */
export const AquariumOpenSurfaceSvg: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-center p-4 rounded-2xl bg-white dark:bg-slate-900 border border-rose-200 dark:border-rose-900/60 shadow-xs">
      <div className="text-center mb-2">
        <span className="text-xs font-bold text-rose-900 dark:text-rose-300 uppercase tracking-wider">
          Fedetlen test: Akvárium felszíne (csak 5 határoló üveglap)
        </span>
      </div>
      <div className="w-full max-w-[620px]">
        <svg viewBox="0 0 580 230" className="w-full h-auto drop-shadow-xs">
          {/* Bal: 3D Izometrikus üvegakvárium vízzel és nyitott felső résszel */}
          <g transform="translate(130, 120)">
            {/* Aljzat (üveg fenéklap) */}
            <polygon points="-70,20 30,65 30,-15 -70,-60" fill="#fed7aa" fillOpacity="0.4" stroke="#ea580c" strokeWidth="1.5" />
            
            {/* Víz kitöltés a belső részben */}
            <polygon points="-65,10 25,50 25,-10 -65,-50" fill="#38bdf8" fillOpacity="0.3" stroke="none" />
            <polygon points="25,50 95,20 95,-40 25,-10" fill="#0284c7" fillOpacity="0.35" stroke="none" />
            <polygon points="-65,-50 25,-10 95,-40 5,-80" fill="#7dd3fc" fillOpacity="0.5" stroke="#0284c7" strokeWidth="1" strokeDasharray="3,3" />

            {/* Átlátszó üveg előlap: a x c */}
            <polygon points="-70,20 30,65 30,-15 -70,-60" fill="#bae6fd" fillOpacity="0.4" stroke="#0284c7" strokeWidth="2" />
            <text x="-20" y="5" fill="#0369a1" fontSize="11" fontWeight="bold">előlap (a · c)</text>

            {/* Átlátszó üveg oldallap: b x c */}
            <polygon points="30,65 105,30 105,-45 30,-15" fill="#bae6fd" fillOpacity="0.3" stroke="#0284c7" strokeWidth="2" />
            <text x="68" y="10" fill="#0369a1" fontSize="10" fontWeight="bold">jobb (b · c)</text>

            {/* Nyitott felső perem kiemelve */}
            <polygon points="-70,-60 30,-15 105,-45 5,-90" fill="none" stroke="#dc2626" strokeWidth="2.5" />
            <text x="18" y="-70" fill="#dc2626" fontSize="11" fontWeight="black" textAnchor="middle">
              NYITOTT TETŐ (nincs fedél!)
            </text>

            {/* Élek méretei */}
            <text x="-20" y="65" fill="#1e1b4b" fontSize="11" fontWeight="black">a = 60 cm</text>
            <text x="80" y="55" fill="#1e1b4b" fontSize="11" fontWeight="black">b = 30 cm</text>
            <text x="-80" y="-20" fill="#1e1b4b" fontSize="11" fontWeight="black">c = 40 cm</text>
          </g>

          {/* Jobb: 5 lap összeadása kártya */}
          <g transform="translate(345, 25)">
            <rect x="0" y="0" width="215" height="180" rx="12" fill="#fff1f2" stroke="#fecdd3" strokeWidth="1.5" />
            <text x="14" y="24" fill="#9f1239" fontSize="12" fontWeight="bold">5 lap felépítése:</text>

            <g transform="translate(14, 35)">
              <rect x="0" y="0" width="187" height="30" rx="6" fill="#ffe4e6" />
              <text x="10" y="14" fill="#881337" fontSize="10" fontWeight="bold">1 db Aljzat (a · b):</text>
              <text x="10" y="26" fill="#be123c" fontSize="11" fontWeight="bold">60 · 30 = 1800 cm²</text>
            </g>

            <g transform="translate(14, 72)">
              <rect x="0" y="0" width="187" height="42" rx="6" fill="#ffe4e6" />
              <text x="10" y="14" fill="#881337" fontSize="10" fontWeight="bold">4 db Oldallap 2(ac + bc):</text>
              <text x="10" y="27" fill="#be123c" fontSize="10">2 · (60·40 + 30·40)</text>
              <text x="10" y="38" fill="#be123c" fontSize="10" fontWeight="bold">= 2 · (2400 + 1200) = 7200 cm²</text>
            </g>

            <g transform="translate(14, 122)">
              <rect x="0" y="0" width="187" height="45" rx="6" fill="#881337" />
              <text x="93" y="16" fill="#fecdd3" fontSize="10" fontWeight="bold" textAnchor="middle">ÖSSZES ÜVEGFELÜLET (5 lap):</text>
              <text x="93" y="34" fill="#ffffff" fontSize="13" fontWeight="black" textAnchor="middle">
                1800 + 7200 = 9000 cm² = 90 dm²
              </text>
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
};

/**
 * 2. Szobafestés: Falak kiterítése + nyílászárók levonása + mennyezet
 */
export const RoomPaintingNetSvg: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-center p-4 rounded-2xl bg-white dark:bg-slate-900 border border-indigo-200 dark:border-indigo-900/60 shadow-xs">
      <div className="text-center mb-2">
        <span className="text-xs font-bold text-indigo-900 dark:text-indigo-300 uppercase tracking-wider">
          Szobafestés modellje: 4 fal palástja nyílászárókkal + Mennyezet
        </span>
      </div>
      <div className="w-full max-w-[680px]">
        <svg viewBox="0 0 660 250" className="w-full h-auto drop-shadow-xs">
          {/* Felső rész: Mennyezet téglalap */}
          <g transform="translate(180, 20)">
            <rect x="0" y="0" width="160" height="45" fill="#d1fae5" stroke="#059669" strokeWidth="1.8" />
            <text x="80" y="27" fill="#065f46" fontSize="11" fontWeight="bold" textAnchor="middle">
              Mennyezet (a · b) = 5 m · 4 m = 20 m²
            </text>
          </g>

          {/* Alsó rész: 4 fal kiterítve egyetlen hosszú téglalappá */}
          <g transform="translate(30, 80)">
            {/* 1. fal: 5m x 3m (szélesség 150px) */}
            <rect x="0" y="0" width="150" height="90" fill="#e0e7ff" stroke="#4f46e5" strokeWidth="1.5" />
            <text x="75" y="20" fill="#312e81" fontSize="11" fontWeight="bold" textAnchor="middle">1. Hosszú fal (a)</text>
            <text x="75" y="80" fill="#4338ca" fontSize="10" textAnchor="middle">5 m</text>
            {/* Ablak kivágás */}
            <rect x="45" y="30" width="60" height="35" fill="#fecdd3" stroke="#e11d48" strokeWidth="1.5" strokeDasharray="3,3" />
            <text x="75" y="52" fill="#9f1239" fontSize="9" fontWeight="bold" textAnchor="middle">- Ablak (2 m²)</text>

            {/* 2. fal: 4m x 3m (szélesség 120px) */}
            <rect x="150" y="0" width="120" height="90" fill="#eef2ff" stroke="#4f46e5" strokeWidth="1.5" />
            <text x="210" y="20" fill="#312e81" fontSize="11" fontWeight="bold" textAnchor="middle">2. Rövid fal (b)</text>
            <text x="210" y="80" fill="#4338ca" fontSize="10" textAnchor="middle">4 m</text>
            {/* Ajtó kivágás */}
            <rect x="190" y="35" width="40" height="55" fill="#fecdd3" stroke="#e11d48" strokeWidth="1.5" strokeDasharray="3,3" />
            <text x="210" y="65" fill="#9f1239" fontSize="9" fontWeight="bold" textAnchor="middle">- Ajtó (2 m²)</text>

            {/* 3. fal: 5m x 3m (szélesség 150px) */}
            <rect x="270" y="0" width="150" height="90" fill="#e0e7ff" stroke="#4f46e5" strokeWidth="1.5" />
            <text x="345" y="20" fill="#312e81" fontSize="11" fontWeight="bold" textAnchor="middle">3. Hosszú fal (a)</text>
            <text x="345" y="80" fill="#4338ca" fontSize="10" textAnchor="middle">5 m</text>

            {/* 4. fal: 4m x 3m (szélesség 120px) */}
            <rect x="420" y="0" width="120" height="90" fill="#eef2ff" stroke="#4f46e5" strokeWidth="1.5" />
            <text x="480" y="20" fill="#312e81" fontSize="11" fontWeight="bold" textAnchor="middle">4. Rövid fal (b)</text>
            <text x="480" y="80" fill="#4338ca" fontSize="10" textAnchor="middle">4 m</text>

            {/* Magasság méretvonal a jobb szélen */}
            <line x1="550" y1="0" x2="550" y2="90" stroke="#4f46e5" strokeWidth="1.8" />
            <text x="560" y="50" fill="#4f46e5" fontSize="11" fontWeight="bold">m = 3 m</text>

            {/* Alsó összefogó vonal a kerületre: 2(a+b) = 18 m */}
            <line x1="0" y1="102" x2="540" y2="102" stroke="#312e81" strokeWidth="2" />
            <text x="270" y="118" fill="#1e1b4b" fontSize="11" fontWeight="black" textAnchor="middle">
              Szoba kerülete: K = 2 · (5 + 4) = 18 m (A kiterített 4 fal teljes hossza)
            </text>
          </g>

          {/* Alsó eredménysáv */}
          <g transform="translate(60, 215)">
            <rect x="0" y="0" width="540" height="26" rx="6" fill="#f0fdf4" stroke="#86efac" />
            <text x="270" y="17" fill="#166534" fontSize="11" fontWeight="bold" textAnchor="middle">
              Nettó festendő felület = (18 m · 3 m) - 4 m² (ajtó+ablak) + 20 m² (mennyezet) = 54 - 4 + 20 = 70 m²
            </text>
          </g>
        </svg>
      </div>
    </div>
  );
};
