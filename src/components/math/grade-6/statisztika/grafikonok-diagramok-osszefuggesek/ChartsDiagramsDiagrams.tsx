import React from 'react';

/**
 * 1. Oszlopdiagram (Függőleges oszlopok - Kategóriák összehasonlítása)
 */
export const ColumnChartSvg: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-center p-4 rounded-2xl bg-white dark:bg-slate-900 border border-blue-200 dark:border-blue-900/60 shadow-xs">
      <div className="text-center mb-3">
        <span className="text-xs font-bold text-blue-900 dark:text-blue-300 uppercase tracking-wider">
          Oszlopdiagram: Egy 6. osztály kedvenc sportágai
        </span>
      </div>
      <div className="w-full max-w-[640px]">
        <svg viewBox="0 0 600 280" className="w-full h-auto drop-shadow-xs">
          {/* Háttér és keret */}
          <rect x="10" y="10" width="580" height="260" rx="12" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />

          {/* Vízszintes rácsvonalak és skála értékek (0, 2, 4, 6, 8, 10, 12, 14) */}
          {/* Magasság: 0 fő -> y=210, 14 fő -> y=70 (10 px / 1 fő) */}
          {[0, 2, 4, 6, 8, 10, 12, 14].map((val) => {
            const y = 210 - val * 10;
            return (
              <g key={val}>
                <line x1="65" y1={y} x2="550" y2={y} stroke="#e2e8f0" strokeDasharray="3,3" strokeWidth="1" />
                <text x="55" y={y + 4} fill="#64748b" fontSize="11" textAnchor="end" fontFamily="sans-serif">
                  {val}
                </text>
              </g>
            );
          })}

          {/* Tengelyek */}
          {/* Függőleges Y tengely */}
          <line x1="65" y1="210" x2="65" y2="50" stroke="#334155" strokeWidth="2" markerEnd="url(#arrow-y)" />
          {/* Vízszintes X tengely */}
          <line x1="65" y1="210" x2="560" y2="210" stroke="#334155" strokeWidth="2" markerEnd="url(#arrow-x)" />

          {/* Nyílhegy definíciók */}
          <defs>
            <marker id="arrow-y" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 10 L 5 0 L 10 10 z" fill="#334155" />
            </marker>
            <marker id="arrow-x" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#334155" />
            </marker>
          </defs>

          {/* Tengelycímkék */}
          <text x="65" y="40" fill="#1e293b" fontSize="11" fontWeight="bold" textAnchor="middle">
            Létszám (fő)
          </text>
          <text x="560" y="235" fill="#1e293b" fontSize="11" fontWeight="bold" textAnchor="end">
            Sportágak
          </text>

          {/* Oszlopok:
              Foci: 12 fő (magasság = 120, y = 90, x = 100, szél = 60)
              Kosár: 8 fő (magasság = 80, y = 130, x = 200, szél = 60)
              Úszás: 6 fő (magasság = 60, y = 150, x = 300, szél = 60)
              Futás: 4 fő (magasság = 40, y = 170, x = 400, szél = 60)
          */}
          {/* 1. Oszlop: Foci (12 fő) */}
          <rect x="100" y="90" width="60" height="120" rx="4" fill="#3b82f6" />
          <text x="130" y="82" fill="#1d4ed8" fontSize="12" fontWeight="black" textAnchor="middle">12</text>
          <text x="130" y="230" fill="#334155" fontSize="11" fontWeight="semibold" textAnchor="middle">Foci</text>

          {/* 2. Oszlop: Kosárlabda (8 fő) */}
          <rect x="210" y="130" width="60" height="80" rx="4" fill="#06b6d4" />
          <text x="240" y="122" fill="#0891b2" fontSize="12" fontWeight="black" textAnchor="middle">8</text>
          <text x="240" y="230" fill="#334155" fontSize="11" fontWeight="semibold" textAnchor="middle">Kosár</text>

          {/* 3. Oszlop: Úszás (6 fő) */}
          <rect x="320" y="150" width="60" height="60" rx="4" fill="#10b981" />
          <text x="350" y="142" fill="#059669" fontSize="12" fontWeight="black" textAnchor="middle">6</text>
          <text x="350" y="230" fill="#334155" fontSize="11" fontWeight="semibold" textAnchor="middle">Úszás</text>

          {/* 4. Oszlop: Futás (4 fő) */}
          <rect x="430" y="170" width="60" height="40" rx="4" fill="#f59e0b" />
          <text x="460" y="162" fill="#d97706" fontSize="12" fontWeight="black" textAnchor="middle">4</text>
          <text x="460" y="230" fill="#334155" fontSize="11" fontWeight="semibold" textAnchor="middle">Futás</text>
        </svg>
      </div>
      <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 text-center">
        Az oszlopok magassága egyenesen arányos a választók létszámával. Teljes létszám: 12 + 8 + 6 + 4 = 30 fő.
      </div>
    </div>
  );
};

/**
 * 2. Sávdiagram (Vízszintes sávok - Hosszabb kategórianevekhez kiváló)
 */
export const BarChartSvg: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-center p-4 rounded-2xl bg-white dark:bg-slate-900 border border-cyan-200 dark:border-cyan-900/60 shadow-xs">
      <div className="text-center mb-3">
        <span className="text-xs font-bold text-cyan-900 dark:text-cyan-300 uppercase tracking-wider">
          Sávdiagram: Iskolai könyvtár kölcsönzési adatai műfajonként
        </span>
      </div>
      <div className="w-full max-w-[640px]">
        <svg viewBox="0 0 600 250" className="w-full h-auto drop-shadow-xs">
          <rect x="10" y="10" width="580" height="230" rx="12" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />

          {/* Függőleges rácsvonalak (0, 5, 10, 15, 20, 25, 30, 35) */}
          {/* Skála: x=140-től x=540-ig (400 px / 35 db ≈ 11.4 px / db) */}
          {[0, 5, 10, 15, 20, 25, 30, 35].map((val) => {
            const x = 140 + (val / 35) * 400;
            return (
              <g key={val}>
                <line x1={x} y1="35" x2={x} y2="195" stroke="#e2e8f0" strokeDasharray="3,3" strokeWidth="1" />
                <text x={x} y="210" fill="#64748b" fontSize="10" textAnchor="middle" fontFamily="sans-serif">
                  {val}
                </text>
              </g>
            );
          })}

          {/* Tengelyek */}
          <line x1="140" y1="35" x2="140" y2="195" stroke="#334155" strokeWidth="2" />
          <line x1="140" y1="195" x2="555" y2="195" stroke="#334155" strokeWidth="2" markerEnd="url(#arrow-x)" />

          <text x="340" y="228" fill="#1e293b" fontSize="11" fontWeight="bold" textAnchor="middle">
            Kölcsönzött darabszám (db)
          </text>

          {/* Kategóriák és sávok:
              Képregény: 30 db (hossz = 342.8 px, y = 50, magasság = 24)
              Kaland: 25 db (hossz = 285.7 px, y = 85, magasság = 24)
              Sci-fi: 15 db (hossz = 171.4 px, y = 120, magasság = 24)
              Ismeretterjesztő: 10 db (hossz = 114.2 px, y = 155, magasság = 24)
          */}
          {/* 1. Sáv: Képregény (30 db) */}
          <text x="130" y="66" fill="#1e293b" fontSize="11" fontWeight="semibold" textAnchor="end">Képregény</text>
          <rect x="140" y="50" width={(30 / 35) * 400} height="24" rx="4" fill="#0284c7" />
          <text x={140 + (30 / 35) * 400 + 8} y="66" fill="#0369a1" fontSize="11" fontWeight="black">30 db</text>

          {/* 2. Sáv: Kaland (25 db) */}
          <text x="130" y="101" fill="#1e293b" fontSize="11" fontWeight="semibold" textAnchor="end">Kalandregény</text>
          <rect x="140" y="85" width={(25 / 35) * 400} height="24" rx="4" fill="#06b6d4" />
          <text x={140 + (25 / 35) * 400 + 8} y="101" fill="#0891b2" fontSize="11" fontWeight="black">25 db</text>

          {/* 3. Sáv: Sci-fi (15 db) */}
          <text x="130" y="136" fill="#1e293b" fontSize="11" fontWeight="semibold" textAnchor="end">Sci-fi</text>
          <rect x="140" y="120" width={(15 / 35) * 400} height="24" rx="4" fill="#14b8a6" />
          <text x={140 + (15 / 35) * 400 + 8} y="136" fill="#0f766e" fontSize="11" fontWeight="black">15 db</text>

          {/* 4. Sáv: Ismeretterjesztő (10 db) */}
          <text x="130" y="171" fill="#1e293b" fontSize="11" fontWeight="semibold" textAnchor="end">Ismeretterjesztő</text>
          <rect x="140" y="155" width={(10 / 35) * 400} height="24" rx="4" fill="#3b82f6" />
          <text x={140 + (10 / 35) * 400 + 8} y="171" fill="#1d4ed8" fontSize="11" fontWeight="black">10 db</text>
        </svg>
      </div>
      <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 text-center">
        A sávdiagram vízszintes felépítése miatt különösen alkalmas hosszú kategórianevek megjelenítésére.
      </div>
    </div>
  );
};

/**
 * 3. Vonaldiagram (Időbeli folyamat, folyamatos változás, minimum és maximum)
 */
export const LineChartSvg: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-center p-4 rounded-2xl bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-900/60 shadow-xs">
      <div className="text-center mb-3">
        <span className="text-xs font-bold text-emerald-900 dark:text-emerald-300 uppercase tracking-wider">
          Vonaldiagram: Napi hőmérséklet alakulása (tavaszi nap, 6:00 – 18:00)
        </span>
      </div>
      <div className="w-full max-w-[640px]">
        <svg viewBox="0 0 600 270" className="w-full h-auto drop-shadow-xs">
          <rect x="10" y="10" width="580" height="250" rx="12" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />

          {/* Hőmérsékleti rácsvonalak (0, 5, 10, 15, 20, 25 °C) */}
          {/* y=200 -> 0 °C, y=50 -> 25 °C (6 px / °C) */}
          {[0, 5, 10, 15, 20, 25].map((temp) => {
            const y = 200 - temp * 6;
            return (
              <g key={temp}>
                <line x1="60" y1={y} x2="550" y2={y} stroke="#e2e8f0" strokeDasharray="3,3" strokeWidth="1" />
                <text x="50" y={y + 4} fill="#64748b" fontSize="10" textAnchor="end">{temp}°C</text>
              </g>
            );
          })}

          {/* Időpontok és függőleges segédvonalak:
              6:00 (x=100), 8:00 (x=175), 10:00 (x=250), 12:00 (x=325), 14:00 (x=400), 16:00 (x=475), 18:00 (x=550)
          */}
          {/* Tengelyek */}
          <line x1="60" y1="200" x2="60" y2="35" stroke="#334155" strokeWidth="2" markerEnd="url(#arrow-y)" />
          <line x1="60" y1="200" x2="565" y2="200" stroke="#334155" strokeWidth="2" markerEnd="url(#arrow-x)" />

          <text x="60" y="25" fill="#1e293b" fontSize="11" fontWeight="bold" textAnchor="middle">Hőmérséklet (°C)</text>
          <text x="565" y="225" fill="#1e293b" fontSize="11" fontWeight="bold" textAnchor="end">Időpont (óra)</text>

          {/* Adatpontok és koordináták:
              6h  ->  4°C  -> y = 200 - 24 = 176, x = 100
              8h  ->  8°C  -> y = 200 - 48 = 152, x = 175
              10h -> 14°C  -> y = 200 - 84 = 116, x = 250
              12h -> 18°C  -> y = 200 - 108 = 92, x = 325
              14h -> 21°C  -> y = 200 - 126 = 74, x = 400 (MAXIMUM!)
              16h -> 17°C  -> y = 200 - 102 = 98, x = 475
              18h -> 12°C  -> y = 200 - 72 = 128, x = 550
          */}
          {/* Halvány gradiens terület a vonal alatt */}
          <defs>
            <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
            </linearGradient>
          </defs>
          <polygon
            points="100,176 175,152 250,116 325,92 400,74 475,98 550,128 550,200 100,200"
            fill="url(#tempGradient)"
          />

          {/* Folytonos töröttvonal */}
          <polyline
            points="100,176 175,152 250,116 325,92 400,74 475,98 550,128"
            fill="none"
            stroke="#059669"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Pontok és értékfeliratok */}
          {/* 6:00 - MINIMUM */}
          <circle cx="100" cy="176" r="5" fill="#2563eb" stroke="#ffffff" strokeWidth="2" />
          <text x="100" y="168" fill="#1d4ed8" fontSize="10" fontWeight="bold" textAnchor="middle">4°C (Min)</text>
          <text x="100" y="215" fill="#64748b" fontSize="10" textAnchor="middle">06:00</text>

          {/* 8:00 */}
          <circle cx="175" cy="152" r="4" fill="#059669" />
          <text x="175" y="144" fill="#065f46" fontSize="10" textAnchor="middle">8°C</text>
          <text x="175" y="215" fill="#64748b" fontSize="10" textAnchor="middle">08:00</text>

          {/* 10:00 */}
          <circle cx="250" cy="116" r="4" fill="#059669" />
          <text x="250" y="108" fill="#065f46" fontSize="10" textAnchor="middle">14°C</text>
          <text x="250" y="215" fill="#64748b" fontSize="10" textAnchor="middle">10:00</text>

          {/* 12:00 */}
          <circle cx="325" cy="92" r="4" fill="#059669" />
          <text x="325" y="84" fill="#065f46" fontSize="10" textAnchor="middle">18°C</text>
          <text x="325" y="215" fill="#64748b" fontSize="10" textAnchor="middle">12:00</text>

          {/* 14:00 - MAXIMUM */}
          <circle cx="400" cy="74" r="6" fill="#dc2626" stroke="#ffffff" strokeWidth="2" />
          <text x="400" y="64" fill="#b91c1c" fontSize="11" fontWeight="black" textAnchor="middle">21°C (Max)</text>
          <text x="400" y="215" fill="#64748b" fontSize="10" textAnchor="middle">14:00</text>

          {/* 16:00 */}
          <circle cx="475" cy="98" r="4" fill="#059669" />
          <text x="475" y="90" fill="#065f46" fontSize="10" textAnchor="middle">17°C</text>
          <text x="475" y="215" fill="#64748b" fontSize="10" textAnchor="middle">16:00</text>

          {/* 18:00 */}
          <circle cx="550" cy="128" r="4" fill="#059669" />
          <text x="550" y="120" fill="#065f46" fontSize="10" textAnchor="middle">12°C</text>
          <text x="550" y="215" fill="#64748b" fontSize="10" textAnchor="middle">18:00</text>

          {/* Emelkedő és csökkenő szakaszok jelölése */}
          <path d="M 120 190 Q 250 180 380 190" fill="none" stroke="#10b981" strokeWidth="1.5" strokeDasharray="2,2" />
          <text x="250" y="185" fill="#059669" fontSize="9" fontWeight="semibold" textAnchor="middle">Emelkedő szakasz (melegedés)</text>

          <path d="M 420 190 Q 475 182 530 190" fill="none" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="2,2" />
          <text x="475" y="185" fill="#dc2626" fontSize="9" fontWeight="semibold" textAnchor="middle">Csökkenő (hűlés)</text>
        </svg>
      </div>
      <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 text-center">
        A vonaldiagram ideális időbeli folyamatok, hőmérséklet-ingadozás és változási irányok (trendek) bemutatására.
      </div>
    </div>
  );
};

/**
 * 4. Kettős oszlopdiagram (Csoportosított összehasonlítás, jelmagyarázat/legenda)
 */
export const DoubleColumnChartSvg: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-center p-4 rounded-2xl bg-white dark:bg-slate-900 border border-indigo-200 dark:border-indigo-900/60 shadow-xs">
      <div className="text-center mb-3">
        <span className="text-xs font-bold text-indigo-900 dark:text-indigo-300 uppercase tracking-wider">
          Kettős oszlopdiagram: 6.A és 6.B matematika dolgozatainak érdemjegyei
        </span>
      </div>
      <div className="w-full max-w-[640px]">
        <svg viewBox="0 0 600 290" className="w-full h-auto drop-shadow-xs">
          <rect x="10" y="10" width="580" height="270" rx="12" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />

          {/* Jelmagyarázat (Legenda) jobb fent */}
          <g transform="translate(380, 25)">
            <rect x="0" y="0" width="180" height="32" rx="6" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
            {/* 6.A jelölő */}
            <rect x="12" y="10" width="12" height="12" rx="2" fill="#3b82f6" />
            <text x="30" y="20" fill="#1e293b" fontSize="11" fontWeight="bold">6.A osztály</text>
            {/* 6.B jelölő */}
            <rect x="100" y="10" width="12" height="12" rx="2" fill="#f59e0b" />
            <text x="118" y="20" fill="#1e293b" fontSize="11" fontWeight="bold">6.B osztály</text>
          </g>

          {/* Vízszintes rácsvonalak (0, 2, 4, 6, 8, 10, 12 fő) */}
          {/* y=220 -> 0 fő, y=76 -> 12 fő (12 px / fő) */}
          {[0, 2, 4, 6, 8, 10, 12].map((val) => {
            const y = 220 - val * 12;
            return (
              <g key={val}>
                <line x1="60" y1={y} x2="560" y2={y} stroke="#e2e8f0" strokeDasharray="3,3" strokeWidth="1" />
                <text x="50" y={y + 4} fill="#64748b" fontSize="10" textAnchor="end">{val}</text>
              </g>
            );
          })}

          {/* Tengelyek */}
          <line x1="60" y1="220" x2="60" y2="40" stroke="#334155" strokeWidth="2" markerEnd="url(#arrow-y)" />
          <line x1="60" y1="220" x2="570" y2="220" stroke="#334155" strokeWidth="2" markerEnd="url(#arrow-x)" />

          <text x="60" y="30" fill="#1e293b" fontSize="11" fontWeight="bold" textAnchor="middle">Tanulók száma (fő)</text>
          <text x="570" y="245" fill="#1e293b" fontSize="11" fontWeight="bold" textAnchor="end">Érdemjegy</text>

          {/* Párok kategóriánként: Jeles (5), Jó (4), Közepes (3), Elégséges (2)
              Oszlopszélesség: 26 px, Rés a páron belül: 4 px, Párok közötti távolság: 120 px
              Jeles (5): x=90 (6.A: 8 fő -> y=124, h=96), x=120 (6.B: 5 fő -> y=160, h=60)
              Jó (4): x=210 (6.A: 10 fő -> y=100, h=120), x=240 (6.B: 12 fő -> y=76, h=144)
              Közepes (3): x=330 (6.A: 6 fő -> y=148, h=72), x=360 (6.B: 8 fő -> y=124, h=96)
              Elégséges (2): x=450 (6.A: 2 fő -> y=196, h=24), x=480 (6.B: 3 fő -> y=184, h=36)
          */}
          {/* Jeles (5) */}
          <rect x="90" y="124" width="28" height="96" rx="3" fill="#3b82f6" />
          <text x="104" y="116" fill="#1d4ed8" fontSize="11" fontWeight="bold" textAnchor="middle">8</text>
          <rect x="122" y="160" width="28" height="60" rx="3" fill="#f59e0b" />
          <text x="136" y="152" fill="#d97706" fontSize="11" fontWeight="bold" textAnchor="middle">5</text>
          <text x="120" y="240" fill="#1e293b" fontSize="12" fontWeight="bold" textAnchor="middle">5 (Jeles)</text>

          {/* Jó (4) */}
          <rect x="210" y="100" width="28" height="120" rx="3" fill="#3b82f6" />
          <text x="224" y="92" fill="#1d4ed8" fontSize="11" fontWeight="bold" textAnchor="middle">10</text>
          <rect x="242" y="76" width="28" height="144" rx="3" fill="#f59e0b" />
          <text x="256" y="68" fill="#d97706" fontSize="11" fontWeight="bold" textAnchor="middle">12</text>
          <text x="240" y="240" fill="#1e293b" fontSize="12" fontWeight="bold" textAnchor="middle">4 (Jó)</text>

          {/* Közepes (3) */}
          <rect x="330" y="148" width="28" height="72" rx="3" fill="#3b82f6" />
          <text x="344" y="140" fill="#1d4ed8" fontSize="11" fontWeight="bold" textAnchor="middle">6</text>
          <rect x="362" y="124" width="28" height="96" rx="3" fill="#f59e0b" />
          <text x="376" y="116" fill="#d97706" fontSize="11" fontWeight="bold" textAnchor="middle">8</text>
          <text x="360" y="240" fill="#1e293b" fontSize="12" fontWeight="bold" textAnchor="middle">3 (Közepes)</text>

          {/* Elégséges (2) */}
          <rect x="450" y="196" width="28" height="24" rx="3" fill="#3b82f6" />
          <text x="464" y="188" fill="#1d4ed8" fontSize="11" fontWeight="bold" textAnchor="middle">2</text>
          <rect x="482" y="184" width="28" height="36" rx="3" fill="#f59e0b" />
          <text x="496" y="176" fill="#d97706" fontSize="11" fontWeight="bold" textAnchor="middle">3</text>
          <text x="480" y="240" fill="#1e293b" fontSize="12" fontWeight="bold" textAnchor="middle">2 (Elégséges)</text>
        </svg>
      </div>
      <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 text-center">
        A csoportosított oszlopdiagram segítségével két vagy több párhuzamos adatsor közvetlenül összevethető.
      </div>
    </div>
  );
};

/**
 * 5. Félrevezető diagram illusztrációja (Csonkolt tengely csalása vs. Korrekt skála)
 */
export const MisleadingChartSvg: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-center p-4 rounded-2xl bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-900/60 shadow-xs">
      <div className="text-center mb-3">
        <span className="text-xs font-bold text-amber-900 dark:text-amber-300 uppercase tracking-wider">
          Statisztikai csapda: Félrevezető (csonkolt) tengely vs. Korrekt ábrázolás
        </span>
      </div>
      <div className="w-full max-w-[660px]">
        <svg viewBox="0 0 640 260" className="w-full h-auto drop-shadow-xs">
          <rect x="10" y="10" width="620" height="240" rx="12" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />

          {/* BAL OLDAL: Csonkolt tengely (95-től indul!) - HAMIS LÁTSZAT */}
          <g transform="translate(15, 0)">
            <rect x="20" y="25" width="265" height="210" rx="8" fill="#fef2f2" stroke="#fecaca" strokeWidth="1" />
            <text x="152" y="45" fill="#dc2626" fontSize="11" fontWeight="black" textAnchor="middle">
              ⚠️ CSONKOLT TENGELY (Csalóka)
            </text>
            <text x="152" y="60" fill="#ef4444" fontSize="9" textAnchor="middle">
              A 98 pont négyszeresnek látszik a 95-höz képest!
            </text>

            {/* Tengely 95-től 100-ig */}
            <line x1="60" y1="190" x2="60" y2="75" stroke="#991b1b" strokeWidth="1.5" />
            <line x1="60" y1="190" x2="250" y2="190" stroke="#991b1b" strokeWidth="1.5" />

            <text x="52" y="193" fill="#991b1b" fontSize="9" textAnchor="end">95</text>
            <text x="52" y="153" fill="#991b1b" fontSize="9" textAnchor="end">96</text>
            <text x="52" y="113" fill="#991b1b" fontSize="9" textAnchor="end">97</text>
            <text x="52" y="80" fill="#991b1b" fontSize="9" textAnchor="end">98</text>

            {/* Oszlop 1: 96 pont (magasság = 40 px) */}
            <rect x="95" y="150" width="45" height="40" rx="3" fill="#ef4444" />
            <text x="117" y="142" fill="#b91c1c" fontSize="10" fontWeight="bold" textAnchor="middle">96</text>
            <text x="117" y="206" fill="#1e293b" fontSize="10" textAnchor="middle">A iskola</text>

            {/* Oszlop 2: 98 pont (magasság = 120 px - háromszor akkorának tűnik!) */}
            <rect x="175" y="80" width="45" height="110" rx="3" fill="#dc2626" />
            <text x="197" y="72" fill="#991b1b" fontSize="10" fontWeight="black" textAnchor="middle">98</text>
            <text x="197" y="206" fill="#1e293b" fontSize="10" textAnchor="middle">B iskola</text>

            {/* Hullámos szakadás jel a tengelyen */}
            <path d="M 57 195 Q 60 192 63 195 Q 60 198 57 195" fill="none" stroke="#dc2626" strokeWidth="2" />
          </g>

          {/* JOBB OLDAL: Korrekt tengely (0-tól indul!) - VALÓDI ARÁNYOK */}
          <g transform="translate(325, 0)">
            <rect x="20" y="25" width="265" height="210" rx="8" fill="#f0fdf4" stroke="#bbf7d0" strokeWidth="1" />
            <text x="152" y="45" fill="#16a34a" fontSize="11" fontWeight="black" textAnchor="middle">
              ✓ KORREKT SKÁLA (0-tól indul)
            </text>
            <text x="152" y="60" fill="#22c55e" fontSize="9" textAnchor="middle">
              Valódi arány: a 96 és a 98 szinte alig tér el!
            </text>

            {/* Tengely 0-tól 100-ig */}
            <line x1="60" y1="190" x2="60" y2="75" stroke="#166534" strokeWidth="1.5" />
            <line x1="60" y1="190" x2="250" y2="190" stroke="#166534" strokeWidth="1.5" />

            <text x="52" y="193" fill="#166534" fontSize="9" textAnchor="end">0</text>
            <text x="52" y="137" fill="#166534" fontSize="9" textAnchor="end">50</text>
            <text x="52" y="82" fill="#166534" fontSize="9" textAnchor="end">100</text>

            {/* Oszlop 1: 96 pont (magasság = 104 px) */}
            <rect x="95" y="86" width="45" height="104" rx="3" fill="#22c55e" />
            <text x="117" y="78" fill="#15803d" fontSize="10" fontWeight="bold" textAnchor="middle">96</text>
            <text x="117" y="206" fill="#1e293b" fontSize="10" textAnchor="middle">A iskola</text>

            {/* Oszlop 2: 98 pont (magasság = 106 px - látszik, hogy minimális a különbség) */}
            <rect x="175" y="84" width="45" height="106" rx="3" fill="#16a34a" />
            <text x="197" y="76" fill="#14532d" fontSize="10" fontWeight="black" textAnchor="middle">98</text>
            <text x="197" y="206" fill="#1e293b" fontSize="10" textAnchor="middle">B iskola</text>
          </g>
        </svg>
      </div>
      <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 text-center">
        <strong>Fontos szabály:</strong> Mindig ellenőrizd a függőleges tengely kezdőértékét! Ha nem 0-ról indul, az oszlopok aránya optikailag megtévesztő lehet.
      </div>
    </div>
  );
};

// =========================================================================
// Kifejezetten a kvízkérdésekhez méretezett kompakt, éles SVG mini-diagramok
// =========================================================================

/** Mini oszlopdiagram: Kedvenc sportágak (Foci 12, Kosár 8, Úszás 6, Futás 4) */
export const QuizSportColumnSvg: React.FC = () => (
  <svg viewBox="0 0 380 170" className="w-full max-w-[380px] h-auto drop-shadow-xs">
    <rect x="5" y="5" width="370" height="160" rx="8" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" />
    {/* Rácsvonalak: 0, 4, 8, 12, 16 fő. y = 135 - val * 6.5 */}
    {[0, 4, 8, 12].map(v => {
      const y = 135 - v * 7.5;
      return (
        <g key={v}>
          <line x1="45" y1={y} x2="350" y2={y} stroke="#e2e8f0" strokeDasharray="3,3" />
          <text x="38" y={y + 3} fill="#64748b" fontSize="9" textAnchor="end">{v}</text>
        </g>
      );
    })}
    <line x1="45" y1="135" x2="45" y2="25" stroke="#334155" strokeWidth="1.5" />
    <line x1="45" y1="135" x2="355" y2="135" stroke="#334155" strokeWidth="1.5" />
    <text x="45" y="18" fill="#1e293b" fontSize="9" fontWeight="bold" textAnchor="middle">Létszám (fő)</text>

    {/* Oszlopok */}
    {/* Foci: 12 */}
    <rect x="70" y={135 - 12 * 7.5} width="45" height={12 * 7.5} rx="3" fill="#3b82f6" />
    <text x="92" y={135 - 12 * 7.5 - 4} fill="#1d4ed8" fontSize="10" fontWeight="black" textAnchor="middle">12</text>
    <text x="92" y="148" fill="#334155" fontSize="10" fontWeight="bold" textAnchor="middle">Foci</text>

    {/* Kosár: 8 */}
    <rect x="145" y={135 - 8 * 7.5} width="45" height={8 * 7.5} rx="3" fill="#06b6d4" />
    <text x="167" y={135 - 8 * 7.5 - 4} fill="#0891b2" fontSize="10" fontWeight="black" textAnchor="middle">8</text>
    <text x="167" y="148" fill="#334155" fontSize="10" fontWeight="bold" textAnchor="middle">Kosár</text>

    {/* Úszás: 6 */}
    <rect x="220" y={135 - 6 * 7.5} width="45" height={6 * 7.5} rx="3" fill="#10b981" />
    <text x="242" y={135 - 6 * 7.5 - 4} fill="#059669" fontSize="10" fontWeight="black" textAnchor="middle">6</text>
    <text x="242" y="148" fill="#334155" fontSize="10" fontWeight="bold" textAnchor="middle">Úszás</text>

    {/* Futás: 4 */}
    <rect x="295" y={135 - 4 * 7.5} width="45" height={4 * 7.5} rx="3" fill="#f59e0b" />
    <text x="317" y={135 - 4 * 7.5 - 4} fill="#d97706" fontSize="10" fontWeight="black" textAnchor="middle">4</text>
    <text x="317" y="148" fill="#334155" fontSize="10" fontWeight="bold" textAnchor="middle">Futás</text>
  </svg>
);

/** Mini sávdiagram: Könyvtári könyvkölcsönzés (Képregény 30, Kaland 25, Sci-fi 15, Ismeretterjesztő 10) */
export const QuizLibraryBarSvg: React.FC = () => (
  <svg viewBox="0 0 380 160" className="w-full max-w-[380px] h-auto drop-shadow-xs">
    <rect x="5" y="5" width="370" height="150" rx="8" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" />
    {/* Rácsvonalak: 0, 10, 20, 30 db. Skála: x = 110 + v * 6.5 */}
    {[0, 10, 20, 30].map(v => (
      <g key={v}>
        <line x1={110 + v * 7} y1="20" x2={110 + v * 7} y2="125" stroke="#e2e8f0" strokeDasharray="3,3" />
        <text x={110 + v * 7} y="137" fill="#64748b" fontSize="9" textAnchor="middle">{v}</text>
      </g>
    ))}
    <line x1="110" y1="20" x2="110" y2="125" stroke="#334155" strokeWidth="1.5" />
    <line x1="110" y1="125" x2="345" y2="125" stroke="#334155" strokeWidth="1.5" />
    <text x="227" y="150" fill="#1e293b" fontSize="9" fontWeight="bold" textAnchor="middle">Kölcsönzött darabszám (db)</text>

    {/* Sávok */}
    <text x="102" y="42" fill="#1e293b" fontSize="10" fontWeight="semibold" textAnchor="end">Képregény</text>
    <rect x="110" y="30" width={30 * 7} height="16" rx="3" fill="#0284c7" />
    <text x={110 + 30 * 7 + 6} y="42" fill="#0369a1" fontSize="10" fontWeight="black">30</text>

    <text x="102" y="67" fill="#1e293b" fontSize="10" fontWeight="semibold" textAnchor="end">Kaland</text>
    <rect x="110" y="55" width={25 * 7} height="16" rx="3" fill="#06b6d4" />
    <text x={110 + 25 * 7 + 6} y="67" fill="#0891b2" fontSize="10" fontWeight="black">25</text>

    <text x="102" y="92" fill="#1e293b" fontSize="10" fontWeight="semibold" textAnchor="end">Sci-fi</text>
    <rect x="110" y="80" width={15 * 7} height="16" rx="3" fill="#14b8a6" />
    <text x={110 + 15 * 7 + 6} y="92" fill="#0f766e" fontSize="10" fontWeight="black">15</text>

    <text x="102" y="117" fill="#1e293b" fontSize="10" fontWeight="semibold" textAnchor="end">Ismeretterj.</text>
    <rect x="110" y="105" width={10 * 7} height="16" rx="3" fill="#3b82f6" />
    <text x={110 + 10 * 7 + 6} y="117" fill="#1d4ed8" fontSize="10" fontWeight="black">10</text>
  </svg>
);

/** Mini vonaldiagram: Napi tavaszi hőmérséklet (6:00 4°C, 8:00 8°C, 10:00 14°C, 12:00 18°C, 14:00 21°C, 16:00 17°C, 18:00 12°C) */
export const QuizTempLineSvg: React.FC = () => {
  // Koordináták: x = 55 + idx * 46
  // y = 135 - temp * 4.8
  const pts = [
    { t: '06h', c: 4, x: 65, y: 135 - 4 * 4.8 },
    { t: '08h', c: 8, x: 111, y: 135 - 8 * 4.8 },
    { t: '10h', c: 14, x: 157, y: 135 - 14 * 4.8 },
    { t: '12h', c: 18, x: 203, y: 135 - 18 * 4.8 },
    { t: '14h', c: 21, x: 249, y: 135 - 21 * 4.8 },
    { t: '16h', c: 17, x: 295, y: 135 - 17 * 4.8 },
    { t: '18h', c: 12, x: 341, y: 135 - 12 * 4.8 }
  ];

  return (
    <svg viewBox="0 0 380 170" className="w-full max-w-[380px] h-auto drop-shadow-xs">
      <rect x="5" y="5" width="370" height="160" rx="8" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" />
      {/* Vízszintes rács: 0, 5, 10, 15, 20, 25 °C */}
      {[0, 5, 10, 15, 20].map(v => {
        const y = 135 - v * 4.8;
        return (
          <g key={v}>
            <line x1="45" y1={y} x2="355" y2={y} stroke="#e2e8f0" strokeDasharray="3,3" />
            <text x="38" y={y + 3} fill="#64748b" fontSize="9" textAnchor="end">{v}°C</text>
          </g>
        );
      })}
      <line x1="45" y1="135" x2="45" y2="20" stroke="#334155" strokeWidth="1.5" />
      <line x1="45" y1="135" x2="360" y2="135" stroke="#334155" strokeWidth="1.5" />
      <text x="45" y="14" fill="#1e293b" fontSize="9" fontWeight="bold" textAnchor="middle">Hőmérséklet (°C)</text>

      {/* Vonal */}
      <polyline
        points={pts.map(p => `${p.x},${p.y}`).join(' ')}
        fill="none"
        stroke="#059669"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {/* Pontok és címkék */}
      {pts.map(p => {
        const isMax = p.c === 21;
        const isMin = p.c === 4;
        return (
          <g key={p.t}>
            <circle cx={p.x} cy={p.y} r={isMax || isMin ? 4.5 : 3.5} fill={isMax ? '#dc2626' : isMin ? '#2563eb' : '#059669'} />
            <text x={p.x} y={p.y - 6} fill={isMax ? '#b91c1c' : isMin ? '#1d4ed8' : '#065f46'} fontSize="9" fontWeight="bold" textAnchor="middle">
              {p.c}°
            </text>
            <text x={p.x} y="148" fill="#475569" fontSize="9" textAnchor="middle">{p.t}</text>
          </g>
        );
      })}
    </svg>
  );
};

/** Mini kettős oszlopdiagram: 6.A vs 6.B dolgozat jegyei */
export const QuizGradesDoubleColumnSvg: React.FC = () => {
  // Jegyek: 5 (8 vs 5), 4 (10 vs 12), 3 (6 vs 8), 2 (2 vs 3)
  // y = 135 - val * 8.5
  return (
    <svg viewBox="0 0 390 170" className="w-full max-w-[390px] h-auto drop-shadow-xs">
      <rect x="5" y="5" width="380" height="160" rx="8" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" />
      {/* Jelmagyarázat fent */}
      <g transform="translate(240, 12)">
        <rect x="0" y="0" width="10" height="10" rx="2" fill="#3b82f6" />
        <text x="14" y="9" fill="#1e293b" fontSize="9" fontWeight="bold">6.A</text>
        <rect x="50" y="0" width="10" height="10" rx="2" fill="#f59e0b" />
        <text x="64" y="9" fill="#1e293b" fontSize="9" fontWeight="bold">6.B</text>
      </g>

      {[0, 4, 8, 12].map(v => {
        const y = 135 - v * 8.5;
        return (
          <g key={v}>
            <line x1="40" y1={y} x2="365" y2={y} stroke="#e2e8f0" strokeDasharray="3,3" />
            <text x="34" y={y + 3} fill="#64748b" fontSize="9" textAnchor="end">{v}</text>
          </g>
        );
      })}
      <line x1="40" y1="135" x2="40" y2="25" stroke="#334155" strokeWidth="1.5" />
      <line x1="40" y1="135" x2="370" y2="135" stroke="#334155" strokeWidth="1.5" />

      {/* Párok */}
      {/* Jeles (5): 8 vs 5 */}
      <rect x="65" y={135 - 8 * 8.5} width="20" height={8 * 8.5} rx="2" fill="#3b82f6" />
      <text x="75" y={135 - 8 * 8.5 - 3} fill="#1d4ed8" fontSize="9" fontWeight="bold" textAnchor="middle">8</text>
      <rect x="88" y={135 - 5 * 8.5} width="20" height={5 * 8.5} rx="2" fill="#f59e0b" />
      <text x="98" y={135 - 5 * 8.5 - 3} fill="#d97706" fontSize="9" fontWeight="bold" textAnchor="middle">5</text>
      <text x="86" y="148" fill="#1e293b" fontSize="9" fontWeight="bold" textAnchor="middle">5 (Jeles)</text>

      {/* Jó (4): 10 vs 12 */}
      <rect x="145" y={135 - 10 * 8.5} width="20" height={10 * 8.5} rx="2" fill="#3b82f6" />
      <text x="155" y={135 - 10 * 8.5 - 3} fill="#1d4ed8" fontSize="9" fontWeight="bold" textAnchor="middle">10</text>
      <rect x="168" y={135 - 12 * 8.5} width="20" height={12 * 8.5} rx="2" fill="#f59e0b" />
      <text x="178" y={135 - 12 * 8.5 - 3} fill="#d97706" fontSize="9" fontWeight="bold" textAnchor="middle">12</text>
      <text x="166" y="148" fill="#1e293b" fontSize="9" fontWeight="bold" textAnchor="middle">4 (Jó)</text>

      {/* Közepes (3): 6 vs 8 */}
      <rect x="225" y={135 - 6 * 8.5} width="20" height={6 * 8.5} rx="2" fill="#3b82f6" />
      <text x="235" y={135 - 6 * 8.5 - 3} fill="#1d4ed8" fontSize="9" fontWeight="bold" textAnchor="middle">6</text>
      <rect x="248" y={135 - 8 * 8.5} width="20" height={8 * 8.5} rx="2" fill="#f59e0b" />
      <text x="258" y={135 - 8 * 8.5 - 3} fill="#d97706" fontSize="9" fontWeight="bold" textAnchor="middle">8</text>
      <text x="246" y="148" fill="#1e293b" fontSize="9" fontWeight="bold" textAnchor="middle">3 (Közepes)</text>

      {/* Elégséges (2): 2 vs 3 */}
      <rect x="305" y={135 - 2 * 8.5} width="20" height={2 * 8.5} rx="2" fill="#3b82f6" />
      <text x="315" y={135 - 2 * 8.5 - 3} fill="#1d4ed8" fontSize="9" fontWeight="bold" textAnchor="middle">2</text>
      <rect x="328" y={135 - 3 * 8.5} width="20" height={3 * 8.5} rx="2" fill="#f59e0b" />
      <text x="338" y={135 - 3 * 8.5 - 3} fill="#d97706" fontSize="9" fontWeight="bold" textAnchor="middle">3</text>
      <text x="326" y="148" fill="#1e293b" fontSize="9" fontWeight="bold" textAnchor="middle">2 (Elégséges)</text>
    </svg>
  );
};

/** Mini csonkolt vs korrekt ábra */
export const QuizMisleadingSvg: React.FC = () => (
  <svg viewBox="0 0 380 150" className="w-full max-w-[380px] h-auto drop-shadow-xs">
    <rect x="5" y="5" width="370" height="140" rx="8" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" />
    {/* Bal: Csonkolt (95-100) */}
    <g transform="translate(10, 0)">
      <rect x="15" y="15" width="160" height="120" rx="5" fill="#fef2f2" stroke="#fecaca" />
      <text x="95" y="30" fill="#dc2626" fontSize="9" fontWeight="black" textAnchor="middle">CSONKOLT (95-től)</text>
      <line x1="45" y1="110" x2="45" y2="40" stroke="#991b1b" strokeWidth="1" />
      <line x1="45" y1="110" x2="160" y2="110" stroke="#991b1b" strokeWidth="1" />
      <text x="40" y="112" fill="#991b1b" fontSize="8" textAnchor="end">95</text>
      <text x="40" y="52" fill="#991b1b" fontSize="8" textAnchor="end">98</text>

      <rect x="65" y="90" width="30" height="20" fill="#ef4444" />
      <text x="80" y="85" fill="#991b1b" fontSize="8" fontWeight="bold" textAnchor="middle">96</text>
      <text x="80" y="122" fill="#334155" fontSize="8" textAnchor="middle">A iskola</text>

      <rect x="110" y="50" width="30" height="60" fill="#dc2626" />
      <text x="125" y="45" fill="#991b1b" fontSize="8" fontWeight="black" textAnchor="middle">98</text>
      <text x="125" y="122" fill="#334155" fontSize="8" textAnchor="middle">B iskola</text>
    </g>

    {/* Jobb: Korrekt (0-100) */}
    <g transform="translate(195, 0)">
      <rect x="15" y="15" width="160" height="120" rx="5" fill="#f0fdf4" stroke="#bbf7d0" />
      <text x="95" y="30" fill="#16a34a" fontSize="9" fontWeight="black" textAnchor="middle">KORREKT (0-tól)</text>
      <line x1="45" y1="110" x2="45" y2="40" stroke="#166534" strokeWidth="1" />
      <line x1="45" y1="110" x2="160" y2="110" stroke="#166534" strokeWidth="1" />
      <text x="40" y="112" fill="#166534" fontSize="8" textAnchor="end">0</text>
      <text x="40" y="52" fill="#166534" fontSize="8" textAnchor="end">100</text>

      <rect x="65" y="54" width="30" height="56" fill="#22c55e" />
      <text x="80" y="49" fill="#166534" fontSize="8" fontWeight="bold" textAnchor="middle">96</text>
      <text x="80" y="122" fill="#334155" fontSize="8" textAnchor="middle">A iskola</text>

      <rect x="110" y="52" width="30" height="58" fill="#16a34a" />
      <text x="125" y="47" fill="#14532d" fontSize="8" fontWeight="black" textAnchor="middle">98</text>
      <text x="125" y="122" fill="#334155" fontSize="8" textAnchor="middle">B iskola</text>
    </g>
  </svg>
);

/** Mini oszlopdiagram: Évszakos csapadékmennyiség (Tavasz 140 mm, Nyár 180 mm, Ősz 160 mm, Tél 100 mm) */
export const QuizRainfallColumnSvg: React.FC = () => (
  <svg viewBox="0 0 380 160" className="w-full max-w-[380px] h-auto drop-shadow-xs">
    <rect x="5" y="5" width="370" height="150" rx="8" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" />
    {[0, 50, 100, 150, 200].map(v => {
      const y = 125 - v * 0.45;
      return (
        <g key={v}>
          <line x1="45" y1={y} x2="350" y2={y} stroke="#e2e8f0" strokeDasharray="3,3" />
          <text x="38" y={y + 3} fill="#64748b" fontSize="8" textAnchor="end">{v}</text>
        </g>
      );
    })}
    <line x1="45" y1="125" x2="45" y2="25" stroke="#334155" strokeWidth="1.5" />
    <line x1="45" y1="125" x2="355" y2="125" stroke="#334155" strokeWidth="1.5" />
    <text x="45" y="18" fill="#1e293b" fontSize="9" fontWeight="bold" textAnchor="middle">Csapadék (mm)</text>

    {/* Oszlopok: Tavasz 140, Nyár 180, Ősz 160, Tél 100 */}
    <rect x="70" y={125 - 140 * 0.45} width="45" height={140 * 0.45} rx="3" fill="#10b981" />
    <text x="92" y={125 - 140 * 0.45 - 4} fill="#059669" fontSize="9" fontWeight="black" textAnchor="middle">140</text>
    <text x="92" y="138" fill="#334155" fontSize="9" fontWeight="bold" textAnchor="middle">Tavasz</text>

    <rect x="145" y={125 - 180 * 0.45} width="45" height={180 * 0.45} rx="3" fill="#f59e0b" />
    <text x="167" y={125 - 180 * 0.45 - 4} fill="#d97706" fontSize="9" fontWeight="black" textAnchor="middle">180</text>
    <text x="167" y="138" fill="#334155" fontSize="9" fontWeight="bold" textAnchor="middle">Nyár</text>

    <rect x="220" y={125 - 160 * 0.45} width="45" height={160 * 0.45} rx="3" fill="#0284c7" />
    <text x="242" y={125 - 160 * 0.45 - 4} fill="#0369a1" fontSize="9" fontWeight="black" textAnchor="middle">160</text>
    <text x="242" y="138" fill="#334155" fontSize="9" fontWeight="bold" textAnchor="middle">Ősz</text>

    <rect x="295" y={125 - 100 * 0.45} width="45" height={100 * 0.45} rx="3" fill="#6366f1" />
    <text x="317" y={125 - 100 * 0.45 - 4} fill="#4f46e5" fontSize="9" fontWeight="black" textAnchor="middle">100</text>
    <text x="317" y="138" fill="#334155" fontSize="9" fontWeight="bold" textAnchor="middle">Tél</text>
  </svg>
);

/** Mini vonaldiagram: Túrázó által megtett út az eltelt időben (0h 0km, 1h 4km, 2h 8km, 3h 8km pihenő, 4h 14km) */
export const QuizHikeLineSvg: React.FC = () => {
  const pts = [
    { h: '0h', km: 0, x: 65, y: 125 },
    { h: '1h', km: 4, x: 135, y: 125 - 4 * 7 },
    { h: '2h', km: 8, x: 205, y: 125 - 8 * 7 },
    { h: '3h', km: 8, x: 275, y: 125 - 8 * 7 },
    { h: '4h', km: 14, x: 345, y: 125 - 14 * 7 }
  ];

  return (
    <svg viewBox="0 0 380 160" className="w-full max-w-[380px] h-auto drop-shadow-xs">
      <rect x="5" y="5" width="370" height="150" rx="8" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" />
      {[0, 4, 8, 12, 16].map(v => {
        const y = 125 - v * 7;
        return (
          <g key={v}>
            <line x1="45" y1={y} x2="355" y2={y} stroke="#e2e8f0" strokeDasharray="3,3" />
            <text x="38" y={y + 3} fill="#64748b" fontSize="8" textAnchor="end">{v}</text>
          </g>
        );
      })}
      <line x1="45" y1="125" x2="45" y2="20" stroke="#334155" strokeWidth="1.5" />
      <line x1="45" y1="125" x2="360" y2="125" stroke="#334155" strokeWidth="1.5" />
      <text x="45" y="14" fill="#1e293b" fontSize="9" fontWeight="bold" textAnchor="middle">Megtett út (km)</text>

      <polyline
        points={pts.map(p => `${p.x},${p.y}`).join(' ')}
        fill="none"
        stroke="#8b5cf6"
        strokeWidth="2.5"
        strokeLinecap="round"
      />

      {pts.map(p => (
        <g key={p.h}>
          <circle cx={p.x} cy={p.y} r="4" fill="#7c3aed" stroke="#ffffff" strokeWidth="1.5" />
          <text x={p.x} y={p.y - 7} fill="#6d28d9" fontSize="9" fontWeight="bold" textAnchor="middle">{p.km} km</text>
          <text x={p.x} y="138" fill="#475569" fontSize="9" textAnchor="middle">{p.h}</text>
        </g>
      ))}
      <text x="240" y="80" fill="#dc2626" fontSize="8" fontWeight="bold" textAnchor="middle">← Pihenő (vízszintes) →</text>
    </svg>
  );
};

