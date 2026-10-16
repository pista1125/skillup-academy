import React from 'react';

// 1. Gyakoriság és Relatív gyakoriság táblázat + grafikus sávok
export const FrequencyTableVisualSvg: React.FC = () => {
  return (
    <div className="w-full flex justify-center py-2">
      <svg
        viewBox="0 0 680 320"
        className="w-full max-w-2xl h-auto select-none rounded-xl bg-slate-900 border border-slate-700/60 shadow-xl p-2"
      >
        <defs>
          <linearGradient id="freqBarGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
          <linearGradient id="relFreqGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
        </defs>

        {/* Cím */}
        <text x="340" y="28" fill="#f8fafc" fontSize="16" fontWeight="bold" textAnchor="middle">
          Adatok gyakorisága ($k$) és relatív gyakorisága ($f = k / n$)
        </text>
        <text x="340" y="48" fill="#94a3b8" fontSize="12" textAnchor="middle">
          Példa: 20 diák kedvenc tantárgya ($n = 20$ összes megkérdezett)
        </text>

        {/* Táblázat fejlécek */}
        <rect x="40" y="65" width="600" height="32" rx="6" fill="#1e293b" stroke="#334155" strokeWidth="1" />
        <text x="110" y="86" fill="#cbd5e1" fontSize="12" fontWeight="bold" textAnchor="middle">Tantárgy</text>
        <text x="210" y="86" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">Gyakoriság (k)</text>
        <text x="360" y="86" fill="#94a3b8" fontSize="12" fontWeight="bold" textAnchor="middle">Gyakoriság sáv</text>
        <text x="500" y="86" fill="#c084fc" fontSize="12" fontWeight="bold" textAnchor="middle">Relatív gyakoriság</text>
        <text x="600" y="86" fill="#f472b6" fontSize="12" fontWeight="bold" textAnchor="middle">Százalék</text>

        {/* Sor 1: Matematika (8) */}
        <g transform="translate(0, 105)">
          <rect x="40" y="0" width="600" height="38" rx="4" fill="#0f172a" stroke="#1e293b" />
          <text x="110" y="24" fill="#f1f5f9" fontSize="13" fontWeight="600" textAnchor="middle">Matematika</text>
          <text x="210" y="24" fill="#38bdf8" fontSize="14" fontWeight="bold" textAnchor="middle">8 fő</text>
          {/* sáv: max 160px */}
          <rect x="270" y="10" width="160" height="18" rx="4" fill="url(#freqBarGrad)" />
          <text x="350" y="23" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">8 / 20</text>
          <text x="500" y="24" fill="#c084fc" fontSize="13" fontWeight="bold" textAnchor="middle">8/20 = 2/5</text>
          <text x="600" y="24" fill="#f472b6" fontSize="13" fontWeight="bold" textAnchor="middle">40%</text>
        </g>

        {/* Sor 2: Testnevelés (6) */}
        <g transform="translate(0, 150)">
          <rect x="40" y="0" width="600" height="38" rx="4" fill="#0f172a" stroke="#1e293b" />
          <text x="110" y="24" fill="#f1f5f9" fontSize="13" fontWeight="600" textAnchor="middle">Testnevelés</text>
          <text x="210" y="24" fill="#38bdf8" fontSize="14" fontWeight="bold" textAnchor="middle">6 fő</text>
          <rect x="270" y="10" width="120" height="18" rx="4" fill="url(#freqBarGrad)" />
          <text x="330" y="23" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">6 / 20</text>
          <text x="500" y="24" fill="#c084fc" fontSize="13" fontWeight="bold" textAnchor="middle">6/20 = 3/10</text>
          <text x="600" y="24" fill="#f472b6" fontSize="13" fontWeight="bold" textAnchor="middle">30%</text>
        </g>

        {/* Sor 3: Informatika (4) */}
        <g transform="translate(0, 195)">
          <rect x="40" y="0" width="600" height="38" rx="4" fill="#0f172a" stroke="#1e293b" />
          <text x="110" y="24" fill="#f1f5f9" fontSize="13" fontWeight="600" textAnchor="middle">Informatika</text>
          <text x="210" y="24" fill="#38bdf8" fontSize="14" fontWeight="bold" textAnchor="middle">4 fő</text>
          <rect x="270" y="10" width="80" height="18" rx="4" fill="url(#freqBarGrad)" />
          <text x="310" y="23" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">4 / 20</text>
          <text x="500" y="24" fill="#c084fc" fontSize="13" fontWeight="bold" textAnchor="middle">4/20 = 1/5</text>
          <text x="600" y="24" fill="#f472b6" fontSize="13" fontWeight="bold" textAnchor="middle">20%</text>
        </g>

        {/* Sor 4: Rajz (2) */}
        <g transform="translate(0, 240)">
          <rect x="40" y="0" width="600" height="38" rx="4" fill="#0f172a" stroke="#1e293b" />
          <text x="110" y="24" fill="#f1f5f9" fontSize="13" fontWeight="600" textAnchor="middle">Rajz</text>
          <text x="210" y="24" fill="#38bdf8" fontSize="14" fontWeight="bold" textAnchor="middle">2 fő</text>
          <rect x="270" y="10" width="40" height="18" rx="4" fill="url(#freqBarGrad)" />
          <text x="290" y="23" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">2</text>
          <text x="500" y="24" fill="#c084fc" fontSize="13" fontWeight="bold" textAnchor="middle">2/20 = 1/10</text>
          <text x="600" y="24" fill="#f472b6" fontSize="13" fontWeight="bold" textAnchor="middle">10%</text>
        </g>

        {/* Összesítő sáv */}
        <g transform="translate(0, 285)">
          <rect x="40" y="0" width="600" height="26" rx="4" fill="#1e293b" stroke="#475569" />
          <text x="110" y="18" fill="#f8fafc" fontSize="12" fontWeight="bold" textAnchor="middle">Összesen:</text>
          <text x="210" y="18" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">n = 20 fő</text>
          <text x="500" y="18" fill="#c084fc" fontSize="12" fontWeight="bold" textAnchor="middle">20/20 = 1,0</text>
          <text x="600" y="18" fill="#f472b6" fontSize="12" fontWeight="bold" textAnchor="middle">100%</text>
        </g>
      </svg>
    </div>
  );
};

// 2. Számtani közép mint mérleg / egyensúlyi pont a számegyenesen
export const MeanBalanceScaleSvg: React.FC = () => {
  return (
    <div className="w-full flex justify-center py-2">
      <svg
        viewBox="0 0 680 320"
        className="w-full max-w-2xl h-auto select-none rounded-xl bg-slate-900 border border-slate-700/60 shadow-xl p-2"
      >
        <defs>
          <linearGradient id="beamGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#475569" />
            <stop offset="100%" stopColor="#1e293b" />
          </linearGradient>
          <linearGradient id="weightGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#0284c7" />
          </linearGradient>
          <linearGradient id="fulcrumGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>
        </defs>

        {/* Cím */}
        <text x="340" y="28" fill="#f8fafc" fontSize="16" fontWeight="bold" textAnchor="middle">
          Az átlag (x̄) mint fizikai egyensúlyi pont (súlypont)
        </text>
        <text x="340" y="48" fill="#94a3b8" fontSize="12" textAnchor="middle">
          Adatsor: 2; 2; 5; 7  →  Összeg: 16, darabszám: 4  →  Átlag: 16 : 4 = 4
        </text>

        {/* Mérleghinta / Számegyenes gerenda */}
        {/* Pozíciók: 0-tól 8-ig skála. x0 = 80, x8 = 600 -> lépés = 65px */}
        {/* x=0 -> 80, x=1 -> 145, x=2 -> 210, x=3 -> 275, x=4 -> 340, x=5 -> 405, x=6 -> 470, x=7 -> 535, x=8 -> 600 */}
        <rect x="70" y="170" width="540" height="14" rx="4" fill="url(#beamGrad)" stroke="#64748b" strokeWidth="1.5" />

        {/* Alátámasztási pont (Pivot / Fulcrum) az átlagnál: x = 4 (340) */}
        <polygon points="340,184 315,245 365,245" fill="url(#fulcrumGrad)" stroke="#b45309" strokeWidth="2" />
        <circle cx="340" cy="186" r="4" fill="#fef3c7" />

        {/* Talpazat */}
        <rect x="290" y="245" width="100" height="12" rx="4" fill="#334155" />

        {/* Átlag jelölése az alátámasztás alatt */}
        <text x="340" y="278" fill="#fbbf24" fontSize="15" fontWeight="bold" textAnchor="middle">
          ▲ Egyensúlyi pont: Átlag = 4
        </text>

        {/* Számegyenes osztások */}
        {[
          { v: 0, x: 80 },
          { v: 1, x: 145 },
          { v: 2, x: 210 },
          { v: 3, x: 275 },
          { v: 4, x: 340 },
          { v: 5, x: 405 },
          { v: 6, x: 470 },
          { v: 7, x: 535 },
          { v: 8, x: 600 }
        ].map((pt) => (
          <g key={pt.v}>
            <line x1={pt.x} y1="184" x2={pt.x} y2="195" stroke="#94a3b8" strokeWidth="1.5" />
            <text x={pt.x} y="209" fill="#94a3b8" fontSize="12" fontWeight="600" textAnchor="middle">
              {pt.v}
            </text>
          </g>
        ))}

        {/* Súlyok:
            x=2-nél KÉT súly van egymáson!
            x=5-nél EGY súly
            x=7-nél EGY súly
        */}
        {/* Súlyok x=2 (210) */}
        <g transform="translate(195, 134)">
          <rect width="30" height="34" rx="4" fill="url(#weightGrad)" stroke="#38bdf8" strokeWidth="1.5" />
          <text x="15" y="22" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">2</text>
        </g>
        <g transform="translate(195, 96)">
          <rect width="30" height="34" rx="4" fill="url(#weightGrad)" stroke="#38bdf8" strokeWidth="1.5" />
          <text x="15" y="22" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">2</text>
        </g>

        {/* Súly x=5 (405) */}
        <g transform="translate(390, 134)">
          <rect width="30" height="34" rx="4" fill="url(#weightGrad)" stroke="#38bdf8" strokeWidth="1.5" />
          <text x="15" y="22" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">5</text>
        </g>

        {/* Súly x=7 (535) */}
        <g transform="translate(520, 134)">
          <rect width="30" height="34" rx="4" fill="url(#weightGrad)" stroke="#38bdf8" strokeWidth="1.5" />
          <text x="15" y="22" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">7</text>
        </g>

        {/* Bal oldali távolságok jelölése (összesen: 2+2 = 4) */}
        <path d="M 210 80 L 340 80" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 3" />
        <text x="275" y="74" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">
          Balra távolság: 2 db × 2 = 4 egység
        </text>

        {/* Jobb oldali távolságok jelölése (összesen: 1+3 = 4) */}
        <path d="M 340 80 L 535 80" stroke="#f472b6" strokeWidth="2" strokeDasharray="3 3" />
        <text x="445" y="74" fill="#f472b6" fontSize="11" fontWeight="bold" textAnchor="middle">
          Jobbra távolság: 1 + 3 = 4 egység
        </text>

        {/* Összegzés alul */}
        <rect x="140" y="292" width="400" height="22" rx="4" fill="#0f172a" stroke="#334155" />
        <text x="340" y="307" fill="#4ade80" fontSize="11" fontWeight="bold" textAnchor="middle">
          ✓ Balra húzó hatás (4) = Jobbra húzó hatás (4) → TÖKÉLETES EGYENSÚLY!
        </text>
      </svg>
    </div>
  );
};

// 3. Medián meghatározása (Páratlan vs Páros elemszám)
export const MedianFindingSvg: React.FC = () => {
  return (
    <div className="w-full flex justify-center py-2">
      <svg
        viewBox="0 0 680 320"
        className="w-full max-w-2xl h-auto select-none rounded-xl bg-slate-900 border border-slate-700/60 shadow-xl p-2"
      >
        <defs>
          <linearGradient id="oddMedGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
          <linearGradient id="evenMedGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#6d28d9" />
          </linearGradient>
        </defs>

        {/* Cím */}
        <text x="340" y="28" fill="#f8fafc" fontSize="16" fontWeight="bold" textAnchor="middle">
          A Medián ($Me$): A nagyság szerint rendezett adatsor KÖZÉPSŐ eleme
        </text>

        {/* 1. ESET: Páratlan elemszám (n = 7) */}
        <g transform="translate(30, 45)">
          <rect x="0" y="0" width="620" height="115" rx="8" fill="#0f172a" stroke="#1e293b" />
          <text x="20" y="25" fill="#38bdf8" fontSize="13" fontWeight="bold">
            1. Eset: Páratlan darabszám ($n = 7$) → Pontosan EGY középső elem van
          </text>
          <text x="20" y="44" fill="#94a3b8" fontSize="11">
            Eredeti: 8, 3, 5, 2, 9, 3, 6  →  <tspan fill="#f1f5f9" fontWeight="bold">Rendezve növekvő sorrendbe:</tspan>
          </text>

          {/* Rendezett 7 kártya: 2, 3, 3, [5], 6, 8, 9 */}
          {[
            { val: 2, x: 50, isMed: false },
            { val: 3, x: 120, isMed: false },
            { val: 3, x: 190, isMed: false },
            { val: 5, x: 260, isMed: true },
            { val: 6, x: 350, isMed: false },
            { val: 8, x: 420, isMed: false },
            { val: 9, x: 490, isMed: false }
          ].map((card, idx) => (
            <g key={idx} transform={`translate(${card.x}, 52)`}>
              <rect
                width="46"
                height="42"
                rx="6"
                fill={card.isMed ? 'url(#oddMedGrad)' : '#1e293b'}
                stroke={card.isMed ? '#34d399' : '#475569'}
                strokeWidth={card.isMed ? 2.5 : 1}
              />
              <text
                x="23"
                y="27"
                fill={card.isMed ? '#ffffff' : '#e2e8f0'}
                fontSize="16"
                fontWeight="bold"
                textAnchor="middle"
              >
                {card.val}
              </text>
              {card.isMed && (
                <text x="23" y="54" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">
                  Medián
                </text>
              )}
            </g>
          ))}
          <text x="560" y="80" fill="#34d399" fontSize="13" fontWeight="bold">
            Me = 5
          </text>
        </g>

        {/* 2. ESET: Páros elemszám (n = 6) */}
        <g transform="translate(30, 175)">
          <rect x="0" y="0" width="620" height="130" rx="8" fill="#0f172a" stroke="#1e293b" />
          <text x="20" y="25" fill="#c084fc" fontSize="13" fontWeight="bold">
            2. Eset: Páros darabszám ($n = 6$) → A KÉT középső szám számtani közepe
          </text>
          <text x="20" y="44" fill="#94a3b8" fontSize="11">
            Eredeti: 4, 10, 5, 8, 2, 7  →  <tspan fill="#f1f5f9" fontWeight="bold">Rendezve növekvő sorrendbe:</tspan>
          </text>

          {/* Rendezett 6 kártya: 2, 4, [5, 7], 8, 10 */}
          {[
            { val: 2, x: 60, isMid: false },
            { val: 4, x: 135, isMid: false },
            { val: 5, x: 210, isMid: true },
            { val: 7, x: 285, isMid: true },
            { val: 8, x: 380, isMid: false },
            { val: 10, x: 455, isMid: false }
          ].map((card, idx) => (
            <g key={idx} transform={`translate(${card.x}, 52)`}>
              <rect
                width="48"
                height="42"
                rx="6"
                fill={card.isMid ? 'url(#evenMedGrad)' : '#1e293b'}
                stroke={card.isMid ? '#c084fc' : '#475569'}
                strokeWidth={card.isMid ? 2.5 : 1}
              />
              <text
                x="24"
                y="27"
                fill={card.isMid ? '#ffffff' : '#e2e8f0'}
                fontSize="16"
                fontWeight="bold"
                textAnchor="middle"
              >
                {card.val}
              </text>
              {card.isMid && (
                <text x="24" y="54" fill="#c084fc" fontSize="9" fontWeight="bold" textAnchor="middle">
                  középső
                </text>
              )}
            </g>
          ))}

          {/* Két középső összekötése és átlagolása */}
          <path d="M 234 100 L 234 110 L 309 110 L 309 100" fill="none" stroke="#c084fc" strokeWidth="1.5" />
          <text x="272" y="122" fill="#f472b6" fontSize="11" fontWeight="bold" textAnchor="middle">
            (5 + 7) : 2 = 6
          </text>
          <text x="545" y="80" fill="#c084fc" fontSize="14" fontWeight="bold">
            Me = 6
          </text>
        </g>
      </svg>
    </div>
  );
};

// 4. Módusz és Terjedelem grafikus ábrázolása
export const ModeAndRangeSvg: React.FC = () => {
  return (
    <div className="w-full flex justify-center py-2">
      <svg
        viewBox="0 0 680 320"
        className="w-full max-w-2xl h-auto select-none rounded-xl bg-slate-900 border border-slate-700/60 shadow-xl p-2"
      >
        <defs>
          <linearGradient id="modeBarGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>
          <linearGradient id="normalBarGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#0284c7" />
          </linearGradient>
        </defs>

        {/* Cím */}
        <text x="340" y="28" fill="#f8fafc" fontSize="16" fontWeight="bold" textAnchor="middle">
          Módusz (Mo: leggyakoribb) és Terjedelem (R = Max - Min)
        </text>
        <text x="340" y="48" fill="#94a3b8" fontSize="12" textAnchor="middle">
          Példa adatsor: 1, 2, 2, 3, 4, 4, 4, 4, 5, 5, 6
        </text>

        {/* Rácsvonalak és tengelyek */}
        <g transform="translate(60, 60)">
          {/* Y tengely skála (0, 1, 2, 3, 4 gyakoriság) */}
          {[0, 1, 2, 3, 4].map((cnt) => {
            const y = 170 - cnt * 38;
            return (
              <g key={cnt}>
                <line x1="40" y1={y} x2="520" y2={y} stroke="#334155" strokeDasharray="3 3" />
                <text x="30" y={y + 4} fill="#94a3b8" fontSize="11" textAnchor="end">{cnt}</text>
              </g>
            );
          })}

          {/* Oszlopok 1-től 6-ig:
              1: 1 db (h: 38)
              2: 2 db (h: 76)
              3: 1 db (h: 38)
              4: 4 db (h: 152) -> MÓDUSZ!
              5: 2 db (h: 76)
              6: 1 db (h: 38)
          */}
          {[
            { val: 1, count: 1, isMode: false, x: 70 },
            { val: 2, count: 2, isMode: false, x: 150 },
            { val: 3, count: 1, isMode: false, x: 230 },
            { val: 4, count: 4, isMode: true, x: 310 },
            { val: 5, count: 2, isMode: false, x: 390 },
            { val: 6, count: 1, isMode: false, x: 470 }
          ].map((bar) => {
            const h = bar.count * 38;
            const y = 170 - h;
            return (
              <g key={bar.val}>
                <rect
                  x={bar.x}
                  y={y}
                  width="44"
                  height={h}
                  rx="5"
                  fill={bar.isMode ? 'url(#modeBarGrad)' : 'url(#normalBarGrad)'}
                  stroke={bar.isMode ? '#fef08a' : '#7dd3fc'}
                  strokeWidth={bar.isMode ? 2 : 1}
                />
                <text x={bar.x + 22} y={190} fill="#f1f5f9" fontSize="13" fontWeight="bold" textAnchor="middle">
                  {bar.val}
                </text>
                <text x={bar.x + 22} y={y - 8} fill={bar.isMode ? '#fde047' : '#94a3b8'} fontSize="12" fontWeight="bold" textAnchor="middle">
                  {bar.count} db
                </text>
              </g>
            );
          })}

          {/* Módusz kiemelése felül */}
          <path d="M 332 5 L 332 -6" stroke="#fde047" strokeWidth="2" markerEnd="url(#arrow)" />
          <text x="332" y="-12" fill="#fde047" fontSize="12" fontWeight="bold" textAnchor="middle">
            ★ Módusz = 4 (Leggyakoribb: 4 db)
          </text>

          {/* Terjedelem nyíl alul a legkisebb (1) és legnagyobb (6) között */}
          <line x1="92" y1="210" x2="492" y2="210" stroke="#f472b6" strokeWidth="2.5" />
          <circle cx="92" cy="210" r="4" fill="#f472b6" />
          <circle cx="492" cy="210" r="4" fill="#f472b6" />
          <text x="292" y="232" fill="#f472b6" fontSize="13" fontWeight="bold" textAnchor="middle">
            Terjedelem: Max (6) - Min (1) = 5
          </text>
        </g>
      </svg>
    </div>
  );
};

// 5. Kiugró érték (outlier) hatása az átlagra vs mediánra
export const OutlierEffectSvg: React.FC = () => {
  return (
    <div className="w-full flex justify-center py-2">
      <svg
        viewBox="0 0 680 320"
        className="w-full max-w-2xl h-auto select-none rounded-xl bg-slate-900 border border-slate-700/60 shadow-xl p-2"
      >
        {/* Cím */}
        <text x="340" y="28" fill="#f8fafc" fontSize="16" fontWeight="bold" textAnchor="middle">
          Kiugró érték (Extrém adat) hatása a mutatókra
        </text>

        {/* 1. Doboz: Kiugró érték nélkül */}
        <g transform="translate(40, 50)">
          <rect x="0" y="0" width="285" height="240" rx="8" fill="#0f172a" stroke="#334155" />
          <text x="142" y="26" fill="#38bdf8" fontSize="14" fontWeight="bold" textAnchor="middle">
            1. Normál adatsor
          </text>
          <text x="142" y="50" fill="#94a3b8" fontSize="12" textAnchor="middle">
            Zsebpénzek (ezer Ft): 2, 3, 3, 4, 8
          </text>

          {/* Számegyenes pontok */}
          <line x1="20" y1="90" x2="265" y2="90" stroke="#475569" strokeWidth="2" />
          {[2, 3, 3, 4, 8].map((pt, i) => (
            <circle key={i} cx={20 + pt * 28} cy={i === 2 ? 80 : 90} r="6" fill="#38bdf8" />
          ))}

          {/* Eredmények */}
          <g transform="translate(20, 125)">
            <rect width="245" height="100" rx="6" fill="#1e293b" />
            <text x="15" y="28" fill="#e2e8f0" fontSize="12">
              Összeg: 20 ezer Ft ($n = 5$)
            </text>
            <text x="15" y="52" fill="#4ade80" fontSize="13" fontWeight="bold">
              Átlag (x̄): 20 : 5 = 4 ezer Ft
            </text>
            <text x="15" y="74" fill="#a78bfa" fontSize="13" fontWeight="bold">
              Medián ($Me$): 3 ezer Ft
            </text>
            <text x="15" y="93" fill="#cbd5e1" fontSize="10">
              Az átlag és medián közel áll egymáshoz!
            </text>
          </g>
        </g>

        {/* 2. Doboz: Kiugró értékkel */}
        <g transform="translate(355, 50)">
          <rect x="0" y="0" width="285" height="240" rx="8" fill="#0f172a" stroke="#ef4444" strokeWidth="1.5" />
          <text x="142" y="26" fill="#f87171" fontSize="14" fontWeight="bold" textAnchor="middle">
            2. Egy kiugró érték (58 ezer Ft!)
          </text>
          <text x="142" y="50" fill="#94a3b8" fontSize="12" textAnchor="middle">
            Zsebpénzek: 2, 3, 3, 4, <tspan fill="#ef4444" fontWeight="bold">58</tspan>
          </text>

          {/* Számegyenes pontok */}
          <line x1="20" y1="90" x2="265" y2="90" stroke="#475569" strokeWidth="2" />
          {[2, 3, 3, 4].map((pt, i) => (
            <circle key={i} cx={25 + pt * 10} cy={i === 2 ? 80 : 90} r="5" fill="#38bdf8" />
          ))}
          <circle cx="245" cy="90" r="7" fill="#ef4444" />
          <text x="245" y="78" fill="#ef4444" fontSize="10" fontWeight="bold" textAnchor="middle">58!</text>

          {/* Eredmények */}
          <g transform="translate(20, 125)">
            <rect width="245" height="100" rx="6" fill="#1e293b" />
            <text x="15" y="28" fill="#e2e8f0" fontSize="12">
              Összeg: 70 ezer Ft ($n = 5$)
            </text>
            <text x="15" y="52" fill="#ef4444" fontSize="13" fontWeight="bold">
              Átlag (x̄): 70 : 5 = 14 ezer Ft!
            </text>
            <text x="15" y="74" fill="#4ade80" fontSize="13" fontWeight="bold">
              Medián ($Me$): továbbra is 3 ezer Ft!
            </text>
            <text x="15" y="93" fill="#fca5a5" fontSize="10">
              Az átlagot eltorzítja az 1 kiugró adat, a medián stabil!
            </text>
          </g>
        </g>
      </svg>
    </div>
  );
};

// ============================================================================
// DEDIKÁLT KVÍZ ÁBRÁK (Kérdések közvetlen leolvasásához!)
// ============================================================================

// Kvíz 1: Pötty-diagram (Dot plot) - Olvasott könyvek száma a hónapban
export const QuizDotPlotSvg: React.FC = () => {
  // Adatok:
  // 0 könyv: 2 fő
  // 1 könyv: 4 fő
  // 2 könyv: 6 fő (MÓDUSZ!)
  // 3 könyv: 3 fő
  // 4 könyv: 1 fő
  // Összesen: 16 fő. Összes könyv: 0*2 + 1*4 + 2*6 + 3*3 + 4*1 = 0 + 4 + 12 + 9 + 4 = 29 könyv.
  return (
    <div className="w-full flex justify-center py-1">
      <svg
        viewBox="0 0 540 180"
        className="w-full max-w-lg h-auto select-none rounded-lg bg-slate-900 border border-slate-700/80 shadow-md p-1"
      >
        <text x="270" y="20" fill="#f8fafc" fontSize="13" fontWeight="bold" textAnchor="middle">
          Pötty-diagram: Diákok által elolvasott könyvek száma (1 pont = 1 tanuló)
        </text>

        {/* Számegyenes */}
        <line x1="60" y1="135" x2="480" y2="135" stroke="#94a3b8" strokeWidth="2" />

        {[
          { val: 0, x: 100, count: 2 },
          { val: 1, x: 180, count: 4 },
          { val: 2, x: 260, count: 6 },
          { val: 3, x: 340, count: 3 },
          { val: 4, x: 420, count: 1 }
        ].map((col) => (
          <g key={col.val}>
            {/* Oszlop beosztás */}
            <line x1={col.x} y1="130" x2={col.x} y2="140" stroke="#f1f5f9" strokeWidth="2" />
            <text x={col.x} y="156" fill="#f8fafc" fontSize="13" fontWeight="bold" textAnchor="middle">
              {col.val}
            </text>

            {/* Pöttyök */}
            {Array.from({ length: col.count }).map((_, i) => (
              <circle
                key={i}
                cx={col.x}
                cy={120 - i * 16}
                r="6.5"
                fill={col.count === 6 ? '#f59e0b' : '#38bdf8'}
                stroke="#0f172a"
                strokeWidth="1.5"
              />
            ))}

            <text x={col.x} y={120 - col.count * 16} fill="#94a3b8" fontSize="10" textAnchor="middle">
              {col.count} db
            </text>
          </g>
        ))}

        <text x="270" y="174" fill="#94a3b8" fontSize="11" textAnchor="middle">
          Elolvasott könyvek száma (darab)
        </text>
      </svg>
    </div>
  );
};

// Kvíz 2: Érdemjegyek eloszlása diagram (Matematika dolgozat)
export const QuizGradesBarMeanSvg: React.FC = () => {
  // Jegyek: 1-es: 1 fő, 2-es: 3 fő, 3-as: 6 fő, 4-es: 7 fő, 5-ös: 3 fő
  // Összesen: 20 fő
  // Összeg: 1*1 + 2*3 + 3*6 + 4*7 + 5*3 = 1 + 6 + 18 + 28 + 15 = 68
  // Átlag: 68 / 20 = 3,4
  // Módusz: 4-es (7 fő)
  // Medián: 20 adat van, 10. és 11. elem.
  // 1 db 1-es, utána 3 db 2-es (1..4), utána 6 db 3-as (5..10), utána 7 db 4-es (11..17).
  // 10. elem: 3, 11. elem: 4 -> Medián: (3+4)/2 = 3,5!
  return (
    <div className="w-full flex justify-center py-1">
      <svg
        viewBox="0 0 540 180"
        className="w-full max-w-lg h-auto select-none rounded-lg bg-slate-900 border border-slate-700/80 shadow-md p-1"
      >
        <text x="270" y="20" fill="#f8fafc" fontSize="13" fontWeight="bold" textAnchor="middle">
          Matematika dolgozat jegyeinek megoszlása (20 fős osztály)
        </text>

        {/* Rácsvonalak */}
        {[0, 2, 4, 6, 8].map((c) => {
          const y = 140 - c * 13;
          return (
            <g key={c}>
              <line x1="60" y1={y} x2="480" y2={y} stroke="#334155" strokeDasharray="3 3" />
              <text x="50" y={y + 4} fill="#94a3b8" fontSize="10" textAnchor="end">{c}</text>
            </g>
          );
        })}

        {/* Oszlopok 1-től 5-ig */}
        {[
          { grade: '1-es', count: 1, x: 90, color: '#ef4444' },
          { grade: '2-es', count: 3, x: 170, color: '#f97316' },
          { grade: '3-as', count: 6, x: 250, color: '#eab308' },
          { grade: '4-es', count: 7, x: 330, color: '#3b82f6' },
          { grade: '5-ös', count: 3, x: 410, color: '#10b981' }
        ].map((bar) => {
          const h = bar.count * 13;
          const y = 140 - h;
          return (
            <g key={bar.grade}>
              <rect x={bar.x} y={y} width="40" height={h} rx="4" fill={bar.color} opacity="0.9" />
              <text x={bar.x + 20} y={y - 5} fill="#f8fafc" fontSize="11" fontWeight="bold" textAnchor="middle">
                {bar.count}
              </text>
              <text x={bar.x + 20} y="155" fill="#f8fafc" fontSize="12" fontWeight="bold" textAnchor="middle">
                {bar.grade}
              </text>
            </g>
          );
        })}

        <text x="270" y="172" fill="#94a3b8" fontSize="10" textAnchor="middle">
          Érdemjegyek (Vízszintes: jegy, Függőleges: tanulók száma)
        </text>
      </svg>
    </div>
  );
};

// Kvíz 3: Mérleg / számegyenes egyensúlyi ábra
export const QuizBalanceScaleSvg: React.FC = () => {
  // Súlyok: x=1 (1 db), x=3 (1 db), x=8 (1 db)
  // Összeg = 1 + 3 + 8 = 12. Darabszám: 3 db. Átlag: 12 / 3 = 4!
  return (
    <div className="w-full flex justify-center py-1">
      <svg
        viewBox="0 0 540 180"
        className="w-full max-w-lg h-auto select-none rounded-lg bg-slate-900 border border-slate-700/80 shadow-md p-1"
      >
        <text x="270" y="20" fill="#f8fafc" fontSize="13" fontWeight="bold" textAnchor="middle">
          Számegyenes mérleg: Hová kell helyezni az alátámasztást (átlag)?
        </text>

        {/* Gerenda */}
        <rect x="50" y="105" width="440" height="10" rx="3" fill="#475569" />

        {/* Számegyenes osztások 0-tól 10-ig. x0=70, x10=470 -> lépés = 40px */}
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => {
          const x = 70 + num * 40;
          return (
            <g key={num}>
              <line x1={x} y1="115" x2={x} y2="124" stroke="#94a3b8" strokeWidth="1.5" />
              <text x={x} y="138" fill="#94a3b8" fontSize="11" textAnchor="middle">
                {num}
              </text>
            </g>
          );
        })}

        {/* Súlyok: 1-nél, 3-nál és 8-nál */}
        {/* x=1 -> 110 */}
        <g transform="translate(98, 77)">
          <rect width="24" height="28" rx="4" fill="#38bdf8" stroke="#bae6fd" strokeWidth="1.5" />
          <text x="12" y="18" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">1 kg</text>
        </g>

        {/* x=3 -> 190 */}
        <g transform="translate(178, 77)">
          <rect width="24" height="28" rx="4" fill="#38bdf8" stroke="#bae6fd" strokeWidth="1.5" />
          <text x="12" y="18" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">1 kg</text>
        </g>

        {/* x=8 -> 390 */}
        <g transform="translate(378, 77)">
          <rect width="24" height="28" rx="4" fill="#38bdf8" stroke="#bae6fd" strokeWidth="1.5" />
          <text x="12" y="18" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">1 kg</text>
        </g>

        {/* Kérdőjeles pivot pozíciók: A, B (4-nél), C */}
        <polygon points="230,115 215,150 245,150" fill="#f59e0b" opacity="0.9" />
        <text x="230" y="165" fill="#fde047" fontSize="12" fontWeight="bold" textAnchor="middle">
          ▲ ? pont (x = 4)
        </text>

        <text x="270" y="55" fill="#94a3b8" fontSize="11" textAnchor="middle">
          Súlyok helyei: x₁ = 1, x₂ = 3, x₃ = 8
        </text>
      </svg>
    </div>
  );
};

// Kvíz 4: Gyakorisági táblázat hiányzó mezővel
export const QuizFrequencyTableSvg: React.FC = () => {
  // Összes diák: 25 fő
  // Fagylalt ízek:
  // Csokoládé: 10 fő (40%)
  // Vanília: 7 fő (28%)
  // Eper: ? fő (20%) -> 25 * 0.20 = 5 fő!
  // Citrom: 3 fő (12%)
  return (
    <div className="w-full flex justify-center py-1">
      <svg
        viewBox="0 0 540 180"
        className="w-full max-w-lg h-auto select-none rounded-lg bg-slate-900 border border-slate-700/80 shadow-md p-1"
      >
        <text x="270" y="20" fill="#f8fafc" fontSize="13" fontWeight="bold" textAnchor="middle">
          Gyakorisági táblázat: Kedvenc fagylalt ízek (Összesen: 25 diák)
        </text>

        {/* Fejléc */}
        <rect x="30" y="35" width="480" height="26" rx="4" fill="#1e293b" />
        <text x="100" y="52" fill="#cbd5e1" fontSize="11" fontWeight="bold" textAnchor="middle">Íz</text>
        <text x="220" y="52" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">Gyakoriság (fő)</text>
        <text x="360" y="52" fill="#c084fc" fontSize="11" fontWeight="bold" textAnchor="middle">Relatív gyakoriság</text>
        <text x="460" y="52" fill="#f472b6" fontSize="11" fontWeight="bold" textAnchor="middle">Százalék</text>

        {/* Sor 1: Csokoládé */}
        <rect x="30" y="64" width="480" height="24" rx="2" fill="#0f172a" />
        <text x="100" y="80" fill="#f1f5f9" fontSize="11" textAnchor="middle">Csokoládé</text>
        <text x="220" y="80" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">10 fő</text>
        <text x="360" y="80" fill="#c084fc" fontSize="11" textAnchor="middle">10 / 25</text>
        <text x="460" y="80" fill="#f472b6" fontSize="11" textAnchor="middle">40%</text>

        {/* Sor 2: Vanília */}
        <rect x="30" y="90" width="480" height="24" rx="2" fill="#131e33" />
        <text x="100" y="106" fill="#f1f5f9" fontSize="11" textAnchor="middle">Vanília</text>
        <text x="220" y="106" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">7 fő</text>
        <text x="360" y="106" fill="#c084fc" fontSize="11" textAnchor="middle">7 / 25</text>
        <text x="460" y="106" fill="#f472b6" fontSize="11" textAnchor="middle">28%</text>

        {/* Sor 3: Eper (HIÁNYZÓ!) */}
        <rect x="30" y="116" width="480" height="24" rx="2" fill="#2a1215" stroke="#f43f5e" strokeWidth="1" />
        <text x="100" y="132" fill="#fda4af" fontSize="11" fontWeight="bold" textAnchor="middle">Eper</text>
        <text x="220" y="132" fill="#fb7185" fontSize="13" fontWeight="bold" textAnchor="middle">? [X]</text>
        <text x="360" y="132" fill="#fda4af" fontSize="11" textAnchor="middle">? / 25</text>
        <text x="460" y="132" fill="#fb7185" fontSize="12" fontWeight="bold" textAnchor="middle">20%</text>

        {/* Sor 4: Citrom */}
        <rect x="30" y="142" width="480" height="24" rx="2" fill="#131e33" />
        <text x="100" y="158" fill="#f1f5f9" fontSize="11" textAnchor="middle">Citrom</text>
        <text x="220" y="158" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">3 fő</text>
        <text x="360" y="158" fill="#c084fc" fontSize="11" textAnchor="middle">3 / 25</text>
        <text x="460" y="158" fill="#f472b6" fontSize="11" textAnchor="middle">12%</text>
      </svg>
    </div>
  );
};

// Kvíz 5: Rendezett kártyasorozat medián leolvasásához
export const QuizMedianLineSvg: React.FC = () => {
  // 9 számkártya rendezve:
  // 12, 14, 15, 18, [21], 25, 28, 30, 35
  return (
    <div className="w-full flex justify-center py-1">
      <svg
        viewBox="0 0 540 160"
        className="w-full max-w-lg h-auto select-none rounded-lg bg-slate-900 border border-slate-700/80 shadow-md p-1"
      >
        <text x="270" y="20" fill="#f8fafc" fontSize="13" fontWeight="bold" textAnchor="middle">
          Növekvő sorrendbe rendezett adatsor ($n = 9$ páratlan)
        </text>

        <g transform="translate(15, 45)">
          {[
            { v: 12, x: 0, isM: false },
            { v: 14, x: 57, isM: false },
            { v: 15, x: 114, isM: false },
            { v: 18, x: 171, isM: false },
            { v: 21, x: 228, isM: true },
            { v: 25, x: 285, isM: false },
            { v: 28, x: 342, isM: false },
            { v: 30, x: 399, isM: false },
            { v: 35, x: 456, isM: false }
          ].map((c, i) => (
            <g key={i} transform={`translate(${c.x}, 0)`}>
              <rect
                width="48"
                height="46"
                rx="6"
                fill={c.isM ? '#10b981' : '#1e293b'}
                stroke={c.isM ? '#34d399' : '#475569'}
                strokeWidth={c.isM ? 2 : 1}
              />
              <text
                x="24"
                y="30"
                fill={c.isM ? '#ffffff' : '#f1f5f9'}
                fontSize="15"
                fontWeight="bold"
                textAnchor="middle"
              >
                {c.v}
              </text>
              <text x="24" y="60" fill="#94a3b8" fontSize="10" textAnchor="middle">
                {i + 1}. elem
              </text>
            </g>
          ))}
        </g>

        <text x="270" y="145" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">
          Melyik elem a medián? 4 elem van balra és 4 elem van jobbra!
        </text>
      </svg>
    </div>
  );
};

// Kvíz 6: Futóverseny ideje és egy kiugró érték
export const QuizOutlierChartSvg: React.FC = () => {
  // 6 diák 60 méteres futási ideje másodpercben:
  // 9,2 s; 9,4 s; 9,5 s; 9,8 s; 10,1 s; és egy sérült futó: 24,0 s!
  return (
    <div className="w-full flex justify-center py-1">
      <svg
        viewBox="0 0 540 170"
        className="w-full max-w-lg h-auto select-none rounded-lg bg-slate-900 border border-slate-700/80 shadow-md p-1"
      >
        <text x="270" y="20" fill="#f8fafc" fontSize="13" fontWeight="bold" textAnchor="middle">
          60 méteres futás időeredményei másodpercben (1 pont = 1 tanuló)
        </text>

        {/* Számegyenes 8 s és 26 s között */}
        <line x1="40" y1="105" x2="500" y2="105" stroke="#94a3b8" strokeWidth="2" />

        {/* Fő osztások */}
        {[8, 10, 12, 14, 16, 18, 20, 22, 24, 26].map((sec) => {
          const x = 50 + (sec - 8) * 24;
          return (
            <g key={sec}>
              <line x1={x} y1="100" x2={x} y2="110" stroke="#64748b" strokeWidth="1.5" />
              <text x={x} y="125" fill="#94a3b8" fontSize="10" textAnchor="middle">
                {sec} s
              </text>
            </g>
          );
        })}

        {/* Normál csoport: 9.2, 9.4, 9.5, 9.8, 10.1 */}
        {[9.2, 9.4, 9.5, 9.8, 10.1].map((t, idx) => {
          const x = 50 + (t - 8) * 24;
          return (
            <circle key={idx} cx={x} cy="92" r="6" fill="#38bdf8" stroke="#0284c7" strokeWidth="1.5" />
          );
        })}

        {/* Kiugró futó: 24.0 s */}
        <circle cx={50 + (24 - 8) * 24} cy="92" r="7.5" fill="#ef4444" stroke="#fca5a5" strokeWidth="2" />
        <text x={50 + (24 - 8) * 24} y="78" fill="#ef4444" fontSize="11" fontWeight="bold" textAnchor="middle">
          24,0 s (Kiugró!)
        </text>

        {/* Magyarázó szöveg alul */}
        <text x="120" y="152" fill="#38bdf8" fontSize="11" textAnchor="middle">
          5 futó szorosan 9–10 s között
        </text>
        <text x="430" y="152" fill="#f87171" fontSize="11" textAnchor="middle">
          1 futó elesett / kiugró érték
        </text>
      </svg>
    </div>
  );
};
