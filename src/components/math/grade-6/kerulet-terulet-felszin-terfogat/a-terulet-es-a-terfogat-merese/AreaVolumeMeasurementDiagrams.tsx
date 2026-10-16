import React from 'react';

/**
 * 1. Terület mértékegység átváltási lépcső (100-as váltószám)
 */
export const AreaConversionLadderSvg: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-center p-3 rounded-2xl bg-gradient-to-b from-indigo-50/50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-900/90 dark:to-indigo-950/20 border border-indigo-200 dark:border-indigo-900/60 shadow-xs">
      <div className="text-center mb-2">
        <span className="text-xs font-bold text-indigo-900 dark:text-indigo-300 uppercase tracking-wider">
          Területmértékek átváltási lánca (váltószám: 100)
        </span>
      </div>
      <div className="w-full max-w-[760px] overflow-x-auto py-1">
        <svg viewBox="0 0 760 180" className="w-full h-auto min-w-[620px] drop-shadow-xs">
          <defs>
            <marker id="areaArrowRight" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
              <polygon points="0 0, 7 3.5, 0 7" fill="#4f46e5" />
            </marker>
            <marker id="areaArrowLeft" markerWidth="7" markerHeight="7" refX="2" refY="3.5" orient="auto">
              <polygon points="7 0, 0 3.5, 7 7" fill="#dc2626" />
            </marker>
          </defs>

          {/* Egységek dobozai */}
          <g className="font-bold text-xs">
            {/* km² */}
            <rect x="15" y="65" width="75" height="48" rx="10" fill="#312e81" />
            <text x="52" y="94" fill="#ffffff" textAnchor="middle" fontSize="15" fontWeight="bold">km²</text>

            {/* ha */}
            <rect x="120" y="65" width="75" height="48" rx="10" fill="#4338ca" />
            <text x="157" y="94" fill="#ffffff" textAnchor="middle" fontSize="15" fontWeight="bold">ha</text>
            <text x="157" y="107" fill="#c7d2fe" textAnchor="middle" fontSize="9">hektár</text>

            {/* a */}
            <rect x="225" y="65" width="75" height="48" rx="10" fill="#4f46e5" />
            <text x="262" y="94" fill="#ffffff" textAnchor="middle" fontSize="15" fontWeight="bold">a</text>
            <text x="262" y="107" fill="#c7d2fe" textAnchor="middle" fontSize="9">ár</text>

            {/* m² */}
            <rect x="330" y="65" width="85" height="48" rx="10" fill="#6366f1" />
            <text x="372" y="94" fill="#ffffff" textAnchor="middle" fontSize="16" fontWeight="bold">m²</text>
            <text x="372" y="107" fill="#e0e7ff" textAnchor="middle" fontSize="9">alapegység</text>

            {/* dm² */}
            <rect x="445" y="65" width="75" height="48" rx="10" fill="#818cf8" />
            <text x="482" y="94" fill="#1e1b4b" textAnchor="middle" fontSize="15" fontWeight="bold">dm²</text>

            {/* cm² */}
            <rect x="550" y="65" width="75" height="48" rx="10" fill="#a5b4fc" />
            <text x="587" y="94" fill="#1e1b4b" textAnchor="middle" fontSize="15" fontWeight="bold">cm²</text>

            {/* mm² */}
            <rect x="655" y="65" width="75" height="48" rx="10" fill="#c7d2fe" />
            <text x="692" y="94" fill="#1e1b4b" textAnchor="middle" fontSize="15" fontWeight="bold">mm²</text>
          </g>

          {/* Felső nyilak: Szorzás (jobbra, kisebb felé) */}
          {/* km² -> ha */}
          <path d="M 90 60 Q 105 35 117 60" fill="none" stroke="#4f46e5" strokeWidth="2.2" markerEnd="url(#areaArrowRight)" />
          <text x="105" y="36" fill="#4f46e5" fontSize="11" fontWeight="bold" textAnchor="middle">· 100</text>

          {/* ha -> a */}
          <path d="M 195 60 Q 210 35 222 60" fill="none" stroke="#4f46e5" strokeWidth="2.2" markerEnd="url(#areaArrowRight)" />
          <text x="210" y="36" fill="#4f46e5" fontSize="11" fontWeight="bold" textAnchor="middle">· 100</text>

          {/* a -> m² */}
          <path d="M 300 60 Q 315 35 327 60" fill="none" stroke="#4f46e5" strokeWidth="2.2" markerEnd="url(#areaArrowRight)" />
          <text x="315" y="36" fill="#4f46e5" fontSize="11" fontWeight="bold" textAnchor="middle">· 100</text>

          {/* m² -> dm² */}
          <path d="M 415 60 Q 430 35 442 60" fill="none" stroke="#4f46e5" strokeWidth="2.2" markerEnd="url(#areaArrowRight)" />
          <text x="430" y="36" fill="#4f46e5" fontSize="11" fontWeight="bold" textAnchor="middle">· 100</text>

          {/* dm² -> cm² */}
          <path d="M 520 60 Q 535 35 547 60" fill="none" stroke="#4f46e5" strokeWidth="2.2" markerEnd="url(#areaArrowRight)" />
          <text x="535" y="36" fill="#4f46e5" fontSize="11" fontWeight="bold" textAnchor="middle">· 100</text>

          {/* cm² -> mm² */}
          <path d="M 625 60 Q 640 35 652 60" fill="none" stroke="#4f46e5" strokeWidth="2.2" markerEnd="url(#areaArrowRight)" />
          <text x="640" y="36" fill="#4f46e5" fontSize="11" fontWeight="bold" textAnchor="middle">· 100</text>

          {/* Alsó nyilak: Osztás (balra, nagyobb felé) */}
          {/* mm² -> cm² */}
          <path d="M 655 120 Q 640 145 628 120" fill="none" stroke="#dc2626" strokeWidth="2.2" markerEnd="url(#areaArrowLeft)" />
          <text x="640" y="154" fill="#dc2626" fontSize="11" fontWeight="bold" textAnchor="middle">: 100</text>

          {/* cm² -> dm² */}
          <path d="M 550 120 Q 535 145 523 120" fill="none" stroke="#dc2626" strokeWidth="2.2" markerEnd="url(#areaArrowLeft)" />
          <text x="535" y="154" fill="#dc2626" fontSize="11" fontWeight="bold" textAnchor="middle">: 100</text>

          {/* dm² -> m² */}
          <path d="M 445 120 Q 430 145 418 120" fill="none" stroke="#dc2626" strokeWidth="2.2" markerEnd="url(#areaArrowLeft)" />
          <text x="430" y="154" fill="#dc2626" fontSize="11" fontWeight="bold" textAnchor="middle">: 100</text>

          {/* m² -> a */}
          <path d="M 330 120 Q 315 145 303 120" fill="none" stroke="#dc2626" strokeWidth="2.2" markerEnd="url(#areaArrowLeft)" />
          <text x="315" y="154" fill="#dc2626" fontSize="11" fontWeight="bold" textAnchor="middle">: 100</text>

          {/* a -> ha */}
          <path d="M 225 120 Q 210 145 198 120" fill="none" stroke="#dc2626" strokeWidth="2.2" markerEnd="url(#areaArrowLeft)" />
          <text x="210" y="154" fill="#dc2626" fontSize="11" fontWeight="bold" textAnchor="middle">: 100</text>

          {/* ha -> km² */}
          <path d="M 120 120 Q 105 145 93 120" fill="none" stroke="#dc2626" strokeWidth="2.2" markerEnd="url(#areaArrowLeft)" />
          <text x="105" y="154" fill="#dc2626" fontSize="11" fontWeight="bold" textAnchor="middle">: 100</text>
        </svg>
      </div>

      <div className="flex flex-wrap justify-between items-center w-full max-w-[760px] text-[11px] text-slate-500 dark:text-slate-400 px-2 pt-1 border-t border-slate-100 dark:border-slate-800">
        <span className="text-indigo-700 dark:text-indigo-300 font-semibold">
          → Kisebb egység felé: Szorzunk 100-zal (vessző 2 hellyel jobbra lép)
        </span>
        <span className="text-rose-600 dark:text-rose-400 font-semibold">
          ← Nagyobb egység felé: Osztunk 100-zal (vessző 2 hellyel balra lép)
        </span>
      </div>
    </div>
  );
};

/**
 * 2. Miért 100 a terület váltószáma? (1 dm² = 100 cm² szemléltető háló)
 */
export const Why100AreaGridSvg: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-center p-4 rounded-2xl bg-white dark:bg-slate-900 border border-indigo-200 dark:border-indigo-900/60 shadow-xs">
      <div className="text-center mb-2">
        <span className="text-xs font-bold text-indigo-900 dark:text-indigo-300 uppercase tracking-wider">
          Miért éppen 100 a váltószám? • 1 dm² = 100 cm²
        </span>
      </div>
      <div className="w-full max-w-[520px]">
        <svg viewBox="0 0 460 270" className="w-full h-auto drop-shadow-xs">
          <defs>
            <pattern id="grid10x10" width="18" height="18" patternUnits="userSpaceOnUse">
              <rect width="18" height="18" fill="#e0e7ff" stroke="#a5b4fc" strokeWidth="1" />
            </pattern>
          </defs>

          {/* Nagy négyzet: 1 dm x 1 dm (180x180 px) */}
          <g transform="translate(60, 45)">
            {/* Rács kitöltés */}
            <rect x="0" y="0" width="180" height="180" fill="url(#grid10x10)" rx="2" stroke="#4f46e5" strokeWidth="2.5" />

            {/* Egy darab 1 cm²-es cella kiemelve a bal felső sarokban */}
            <rect x="0" y="0" width="18" height="18" fill="#4f46e5" stroke="#312e81" strokeWidth="1.5" />

            {/* Felső méretvonal: 1 dm = 10 cm */}
            <line x1="0" y1="-12" x2="180" y2="-12" stroke="#4f46e5" strokeWidth="1.8" />
            <line x1="0" y1="-18" x2="0" y2="-6" stroke="#4f46e5" strokeWidth="1.8" />
            <line x1="180" y1="-18" x2="180" y2="-6" stroke="#4f46e5" strokeWidth="1.8" />
            <text x="90" y="-20" fill="#3730a3" fontSize="11" fontWeight="bold" textAnchor="middle">
              1 dm = 10 cm (10 oszlop)
            </text>

            {/* Bal oldali méretvonal: 1 dm = 10 cm */}
            <line x1="-12" y1="0" x2="-12" y2="180" stroke="#4f46e5" strokeWidth="1.8" />
            <line x1="-18" y1="0" x2="-6" y2="0" stroke="#4f46e5" strokeWidth="1.8" />
            <line x1="-18" y1="180" x2="-6" y2="180" stroke="#4f46e5" strokeWidth="1.8" />
            <text x="-20" y="94" fill="#3730a3" fontSize="11" fontWeight="bold" textAnchor="middle" transform="rotate(-90 -20 94)">
              1 dm = 10 cm (10 sor)
            </text>
          </g>

          {/* Jobb oldali magyarázó kártya és nagyító vonal */}
          <g transform="translate(265, 50)">
            {/* Nyíl a kiemelt 1 cm² kockára */}
            <path d="M 0 10 Q -15 10 -185 8" fill="none" stroke="#4f46e5" strokeWidth="1.5" strokeDasharray="3,3" />

            {/* Kiemelt egység doboz */}
            <rect x="10" y="0" width="170" height="60" rx="8" fill="#eff6ff" stroke="#bfdbfe" strokeWidth="1" />
            <rect x="20" y="12" width="22" height="22" fill="#4f46e5" rx="3" />
            <text x="50" y="24" fill="#1e3a8a" fontSize="11" fontWeight="bold">1 db kék négyzet:</text>
            <text x="50" y="40" fill="#2563eb" fontSize="11" fontWeight="mono">1 cm · 1 cm = 1 cm²</text>

            {/* Számolási doboz */}
            <rect x="10" y="72" width="170" height="98" rx="8" fill="#eef2ff" stroke="#c7d2fe" strokeWidth="1" />
            <text x="20" y="93" fill="#312e81" fontSize="11" fontWeight="bold">Összes kék négyzet:</text>
            <text x="20" y="112" fill="#4338ca" fontSize="12" fontWeight="bold">10 sor · 10 oszlop</text>
            <text x="20" y="132" fill="#4f46e5" fontSize="14" fontWeight="black">= 100 db 1 cm²</text>
            <line x1="20" y1="142" x2="165" y2="142" stroke="#c7d2fe" strokeWidth="1" />
            <text x="20" y="158" fill="#15803d" fontSize="11" fontWeight="bold">⟹ 1 dm² = 100 cm²</text>
          </g>
        </svg>
      </div>
    </div>
  );
};

/**
 * 3. Térfogat mértékegység átváltási lépcső (1000-es váltószám)
 */
export const VolumeConversionLadderSvg: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-center p-3 rounded-2xl bg-gradient-to-b from-teal-50/50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-900/90 dark:to-teal-950/20 border border-teal-200 dark:border-teal-900/60 shadow-xs">
      <div className="text-center mb-2">
        <span className="text-xs font-bold text-teal-900 dark:text-teal-300 uppercase tracking-wider">
          Térfogatmértékek átváltási lánca (váltószám: 1000)
        </span>
      </div>
      <div className="w-full max-w-[620px] overflow-x-auto py-1">
        <svg viewBox="0 0 600 170" className="w-full h-auto min-w-[500px] drop-shadow-xs">
          <defs>
            <marker id="volArrowRight" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
              <polygon points="0 0, 7 3.5, 0 7" fill="#0d9488" />
            </marker>
            <marker id="volArrowLeft" markerWidth="7" markerHeight="7" refX="2" refY="3.5" orient="auto">
              <polygon points="7 0, 0 3.5, 7 7" fill="#dc2626" />
            </marker>
          </defs>

          {/* Egységek dobozai */}
          <g className="font-bold text-xs">
            {/* m³ */}
            <rect x="30" y="60" width="105" height="48" rx="10" fill="#115e59" />
            <text x="82" y="87" fill="#ffffff" textAnchor="middle" fontSize="16" fontWeight="bold">m³</text>
            <text x="82" y="100" fill="#99f6e4" textAnchor="middle" fontSize="9">köbméter</text>

            {/* dm³ */}
            <rect x="180" y="60" width="105" height="48" rx="10" fill="#0d9488" />
            <text x="232" y="87" fill="#ffffff" textAnchor="middle" fontSize="16" fontWeight="bold">dm³</text>
            <text x="232" y="100" fill="#ccfbf1" textAnchor="middle" fontSize="9">(= 1 liter)</text>

            {/* cm³ */}
            <rect x="330" y="60" width="105" height="48" rx="10" fill="#14b8a6" />
            <text x="382" y="87" fill="#ffffff" textAnchor="middle" fontSize="16" fontWeight="bold">cm³</text>
            <text x="382" y="100" fill="#134e4a" textAnchor="middle" fontSize="9">(= 1 ml)</text>

            {/* mm³ */}
            <rect x="475" y="60" width="95" height="48" rx="10" fill="#5eead4" />
            <text x="522" y="87" fill="#134e4a" textAnchor="middle" fontSize="16" fontWeight="bold">mm³</text>
            <text x="522" y="100" fill="#134e4a" textAnchor="middle" fontSize="9">köbmilliméter</text>
          </g>

          {/* Felső nyilak: Szorzás 1000-rel */}
          <path d="M 135 55 Q 157 28 177 55" fill="none" stroke="#0d9488" strokeWidth="2.5" markerEnd="url(#volArrowRight)" />
          <text x="157" y="30" fill="#0d9488" fontSize="12" fontWeight="bold" textAnchor="middle">· 1000</text>

          <path d="M 285 55 Q 307 28 327 55" fill="none" stroke="#0d9488" strokeWidth="2.5" markerEnd="url(#volArrowRight)" />
          <text x="307" y="30" fill="#0d9488" fontSize="12" fontWeight="bold" textAnchor="middle">· 1000</text>

          <path d="M 435 55 Q 455 28 472 55" fill="none" stroke="#0d9488" strokeWidth="2.5" markerEnd="url(#volArrowRight)" />
          <text x="455" y="30" fill="#0d9488" fontSize="12" fontWeight="bold" textAnchor="middle">· 1000</text>

          {/* Alsó nyilak: Osztás 1000-rel */}
          <path d="M 475 115 Q 455 142 438 115" fill="none" stroke="#dc2626" strokeWidth="2.5" markerEnd="url(#volArrowLeft)" />
          <text x="455" y="152" fill="#dc2626" fontSize="12" fontWeight="bold" textAnchor="middle">: 1000</text>

          <path d="M 330 115 Q 307 142 288 115" fill="none" stroke="#dc2626" strokeWidth="2.5" markerEnd="url(#volArrowLeft)" />
          <text x="307" y="152" fill="#dc2626" fontSize="12" fontWeight="bold" textAnchor="middle">: 1000</text>

          <path d="M 180 115 Q 157 142 138 115" fill="none" stroke="#dc2626" strokeWidth="2.5" markerEnd="url(#volArrowLeft)" />
          <text x="157" y="152" fill="#dc2626" fontSize="12" fontWeight="bold" textAnchor="middle">: 1000</text>
        </svg>
      </div>

      <div className="flex flex-wrap justify-between items-center w-full max-w-[620px] text-[11px] text-slate-500 dark:text-slate-400 px-2 pt-1 border-t border-slate-100 dark:border-slate-800">
        <span className="text-teal-700 dark:text-teal-300 font-semibold">
          → Kisebb egység felé: Szorzunk 1000-rel (vessző 3 hellyel jobbra lép)
        </span>
        <span className="text-rose-600 dark:text-rose-400 font-semibold">
          ← Nagyobb egység felé: Osztunk 1000-rel (vessző 3 hellyel balra lép)
        </span>
      </div>
    </div>
  );
};

/**
 * 4. Miért 1000 a térfogat váltószáma? (1 dm³ = 10 · 10 · 10 = 1000 cm³ izometrikus rétegek)
 */
export const Why1000VolumeCubeSvg: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-center p-4 rounded-2xl bg-white dark:bg-slate-900 border border-teal-200 dark:border-teal-900/60 shadow-xs">
      <div className="text-center mb-2">
        <span className="text-xs font-bold text-teal-900 dark:text-teal-300 uppercase tracking-wider">
          Miért 1000 a térfogat váltószáma? • 1 dm³ = 1000 cm³
        </span>
      </div>
      <div className="w-full max-w-[560px]">
        <svg viewBox="0 0 520 280" className="w-full h-auto drop-shadow-xs">
          {/* Izometrikus kocka 10 réteggel */}
          <g transform="translate(140, 150)">
            {/* Alap test: 1 dm x 1 dm x 1 dm izometrikusan */}
            {/* Elülső lap: szélesség 120, magasság 120 */}
            <polygon points="-60,10 40,55 40,-55 -60,-100" fill="#0d9488" stroke="#115e59" strokeWidth="1.5" />
            {/* Jobb oldallap */}
            <polygon points="40,55 120,15 120,-95 40,-55" fill="#14b8a6" stroke="#0f766e" strokeWidth="1.5" />
            {/* Felső lap (10x10 rács látszik) */}
            <polygon points="-60,-100 40,-55 120,-95 20,-140" fill="#5eead4" stroke="#0d9488" strokeWidth="1.5" />

            {/* Rétegek jelzése az elülső lapon vízszintes vonalakkal */}
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => {
              const yOffset = i * 11;
              return (
                <g key={i}>
                  <line
                    x1="-60"
                    y1={-100 + yOffset}
                    x2="40"
                    y2={-55 + yOffset}
                    stroke="#115e59"
                    strokeWidth="1"
                    strokeDasharray="2,2"
                  />
                  <line
                    x1="40"
                    y1={-55 + yOffset}
                    x2="120"
                    y2={-95 + yOffset}
                    stroke="#0f766e"
                    strokeWidth="1"
                    strokeDasharray="2,2"
                  />
                </g>
              );
            })}

            {/* Méretjelölések */}
            {/* Szélesség: 1 dm = 10 cm */}
            <text x="-15" y="50" fill="#042f2e" fontSize="11" fontWeight="bold" textAnchor="middle">
              10 cm (1 dm)
            </text>
            {/* Mélység: 10 cm */}
            <text x="90" y="48" fill="#042f2e" fontSize="11" fontWeight="bold" textAnchor="middle">
              10 cm
            </text>
            {/* Magasság méretvonal a bal oldalon */}
            <line x1="-75" y1="10" x2="-75" y2="-100" stroke="#0f766e" strokeWidth="1.8" />
            <line x1="-80" y1="10" x2="-70" y2="10" stroke="#0f766e" strokeWidth="1.8" />
            <line x1="-80" y1="-100" x2="-70" y2="-100" stroke="#0f766e" strokeWidth="1.8" />
            <text x="-85" y="-45" fill="#0f766e" fontSize="11" fontWeight="bold" textAnchor="end">
              10 cm (10 réteg)
            </text>
          </g>

          {/* Jobb oldali levezetés */}
          <g transform="translate(305, 45)">
            <rect x="0" y="0" width="200" height="190" rx="12" fill="#f0fdfa" stroke="#99f6e4" strokeWidth="1.5" />
            <text x="15" y="25" fill="#134e4a" fontSize="12" fontWeight="bold">Réteges felépítés:</text>

            <g transform="translate(15, 38)">
              {/* 1. réteg */}
              <rect x="0" y="0" width="170" height="38" rx="6" fill="#ccfbf1" stroke="#5eead4" strokeWidth="1" />
              <text x="8" y="16" fill="#115e59" fontSize="10" fontWeight="bold">1. Alapréteg (1 réteg):</text>
              <text x="8" y="30" fill="#0f766e" fontSize="11" fontWeight="bold">10 · 10 = 100 db 1 cm³</text>
            </g>

            <g transform="translate(15, 84)">
              {/* 10 réteg egymáson */}
              <rect x="0" y="0" width="170" height="42" rx="6" fill="#99f6e4" stroke="#2dd4bf" strokeWidth="1" />
              <text x="8" y="16" fill="#115e59" fontSize="10" fontWeight="bold">2. Tíz ilyen réteg egymáson:</text>
              <text x="8" y="32" fill="#042f2e" fontSize="12" fontWeight="black">10 · 100 = 1000 db 1 cm³</text>
            </g>

            <g transform="translate(15, 136)">
              <rect x="0" y="0" width="170" height="42" rx="6" fill="#134e4a" />
              <text x="85" y="18" fill="#5eead4" fontSize="10" fontWeight="bold" textAnchor="middle">KULCSÖSSZEFÜGGÉS:</text>
              <text x="85" y="33" fill="#ffffff" fontSize="12" fontWeight="black" textAnchor="middle">1 dm³ = 1000 cm³</text>
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
};

/**
 * 5. Az Aranyhíd: Térfogat és Űrtartalom (1 dm³ = 1 liter, 1 cm³ = 1 ml)
 */
export const GoldenBridgeVolumeLiterSvg: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-center p-4 rounded-2xl bg-gradient-to-r from-teal-50 via-cyan-50 to-blue-50 dark:from-slate-900 dark:via-teal-950/30 dark:to-slate-900 border-2 border-teal-300 dark:border-teal-800 shadow-xs">
      <div className="text-center mb-2">
        <span className="text-xs font-black uppercase tracking-wider text-teal-800 dark:text-teal-300">
          Az Aranyhíd: Térfogat és Űrtartalom kapcsolata
        </span>
      </div>

      <div className="w-full max-w-[620px]">
        <svg viewBox="0 0 600 230" className="w-full h-auto drop-shadow-xs">
          {/* Bal oldal: 1 dm³ kocka */}
          <g transform="translate(110, 115)">
            {/* Izometrikus 1 dm³ kocka */}
            <polygon points="-50,0 20,35 20,-45 -50,-80" fill="#0d9488" stroke="#115e59" strokeWidth="1.5" />
            <polygon points="20,35 75,5 75,-75 20,-45" fill="#14b8a6" stroke="#0f766e" strokeWidth="1.5" />
            <polygon points="-50,-80 20,-45 75,-75 5,-110" fill="#5eead4" stroke="#0d9488" strokeWidth="1.5" />
            
            <text x="12" y="55" fill="#0f766e" fontSize="12" fontWeight="black" textAnchor="middle">
              1 dm³
            </text>
            <text x="12" y="70" fill="#64748b" fontSize="10" textAnchor="middle">
              (10 cm × 10 cm × 10 cm)
            </text>
          </g>

          {/* Közép: Aranyhíd / egyenlőség */}
          <g transform="translate(300, 95)">
            {/* Izzó híd kártya */}
            <rect x="-65" y="-45" width="130" height="90" rx="14" fill="#fef08a" stroke="#eab308" strokeWidth="2.5" />
            <text x="0" y="-18" fill="#854d0e" fontSize="11" fontWeight="black" textAnchor="middle">
              AZ ARANYHÍD
            </text>
            <text x="0" y="16" fill="#713f12" fontSize="32" fontWeight="black" textAnchor="middle">
              =
            </text>
            <text x="0" y="34" fill="#a16207" fontSize="11" fontWeight="bold" textAnchor="middle">
              1:1 egyezés
            </text>
          </g>

          {/* Jobb oldal: 1 Literes mérőkancsó / tejesdoboz */}
          <g transform="translate(480, 115)">
            {/* Kancsó teste */}
            <rect x="-40" y="-85" width="75" height="115" rx="6" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
            {/* Vízszint (teli 1 liter) */}
            <rect x="-38" y="-70" width="71" height="98" rx="4" fill="#38bdf8" fillOpacity="0.75" stroke="none" />
            {/* Víz hullám felül */}
            <ellipse cx="-2" cy="-70" rx="35" ry="6" fill="#7dd3fc" />

            {/* Skálázás vonalak */}
            <line x1="-38" y1="-70" x2="-22" y2="-70" stroke="#0369a1" strokeWidth="1.5" />
            <text x="-18" y="-66" fill="#0369a1" fontSize="9" fontWeight="bold">1 L (1000 ml)</text>

            <line x1="-38" y1="-45" x2="-26" y2="-45" stroke="#0369a1" strokeWidth="1" />
            <text x="-22" y="-42" fill="#0369a1" fontSize="8">750 ml</text>

            <line x1="-38" y1="-20" x2="-22" y2="-20" stroke="#0369a1" strokeWidth="1.5" />
            <text x="-18" y="-17" fill="#0369a1" fontSize="8" fontWeight="bold">500 ml (0,5 L)</text>

            <line x1="-38" y1="5" x2="-26" y2="5" stroke="#0369a1" strokeWidth="1" />
            <text x="-22" y="8" fill="#0369a1" fontSize="8">250 ml</text>

            {/* Kancsó füle */}
            <path d="M 35 -65 C 55 -65 55 -15 35 -15" fill="none" stroke="#0284c7" strokeWidth="3" />

            <text x="-2" y="55" fill="#0284c7" fontSize="12" fontWeight="black" textAnchor="middle">
              1 liter (l)
            </text>
            <text x="-2" y="70" fill="#64748b" fontSize="10" textAnchor="middle">
              (= 10 dl = 100 cl = 1000 ml)
            </text>
          </g>

          {/* Alsó összegző sáv: a két további kulcsérték */}
          <g transform="translate(120, 205)">
            <rect x="-10" y="-12" width="165" height="26" rx="8" fill="#eff6ff" stroke="#bfdbfe" />
            <text x="72" y="5" fill="#1e40af" fontSize="11" fontWeight="bold" textAnchor="middle">
              1 cm³ = 1 milliliter (ml)
            </text>
          </g>

          <g transform="translate(345, 205)">
            <rect x="-10" y="-12" width="185" height="26" rx="8" fill="#ecfdf5" stroke="#a7f3d0" />
            <text x="82" y="5" fill="#065f46" fontSize="11" fontWeight="bold" textAnchor="middle">
              1 m³ = 1000 liter = 10 hl
            </text>
          </g>
        </svg>
      </div>
    </div>
  );
};
