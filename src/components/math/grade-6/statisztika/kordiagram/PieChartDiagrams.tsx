import React from 'react';

/**
 * 1. Alapvető kördiagram és a nevezetes szögek (360°, 180°, 90°, 45°)
 */
export const BasicPieChartSvg: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-center p-4 rounded-2xl bg-white dark:bg-slate-900 border border-indigo-200 dark:border-indigo-900/60 shadow-xs">
      <div className="text-center mb-3">
        <span className="text-xs font-bold text-indigo-900 dark:text-indigo-300 uppercase tracking-wider">
          A teljes kör (360° = 100%) és a legfontosabb nevezetes körcikkek
        </span>
      </div>
      <div className="w-full max-w-[640px]">
        <svg viewBox="0 0 600 260" className="w-full h-auto drop-shadow-xs">
          <rect x="10" y="10" width="580" height="240" rx="12" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />

          {/* 1. KÖR: Teljes kör és Félkör (180° = 50%) */}
          <g transform="translate(100, 125)">
            {/* Teljes kör körvonal */}
            <circle cx="0" cy="0" r="70" fill="#e0e7ff" stroke="#6366f1" strokeWidth="2" />
            {/* Bal félkör sötétebb kékkel kitöltve */}
            <path d="M 0 -70 A 70 70 0 0 0 0 70 Z" fill="#6366f1" />
            <circle cx="0" cy="0" r="3" fill="#1e1b4b" />
            {/* Feliratok */}
            <text x="-35" y="5" fill="#ffffff" fontSize="12" fontWeight="black" textAnchor="middle">50%</text>
            <text x="-35" y="20" fill="#e0e7ff" fontSize="10" fontWeight="bold" textAnchor="middle">180°</text>
            <text x="35" y="5" fill="#4338ca" fontSize="12" fontWeight="black" textAnchor="middle">50%</text>
            <text x="35" y="20" fill="#6366f1" fontSize="10" fontWeight="bold" textAnchor="middle">180°</text>
            <text x="0" y="95" fill="#1e293b" fontSize="11" fontWeight="bold" textAnchor="middle">Félkör: 180° = 1/2</text>
          </g>

          {/* 2. KÖR: Negyedkör (90° = 25%) */}
          <g transform="translate(300, 125)">
            <circle cx="0" cy="0" r="70" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="2" />
            {/* Jobb felső negyed körcikk (0°-tól 90°-ig): (0, -70)-től (70, 0)-ig */}
            <path d="M 0 0 L 0 -70 A 70 70 0 0 1 70 0 Z" fill="#0ea5e9" />
            {/* Derékszög jelölése magyar szabvány szerint: negyedkör ív + belső pont! */}
            <path d="M 0 -22 A 22 22 0 0 1 22 0" fill="none" stroke="#0369a1" strokeWidth="1.5" />
            <circle cx="10" cy="-10" r="2" fill="#0369a1" />
            <circle cx="0" cy="0" r="3" fill="#1e293b" />
            {/* Feliratok */}
            <text x="38" y="-30" fill="#ffffff" fontSize="12" fontWeight="black" textAnchor="middle">25%</text>
            <text x="38" y="-16" fill="#e0f2fe" fontSize="10" fontWeight="bold" textAnchor="middle">90°</text>
            <text x="-25" y="15" fill="#64748b" fontSize="11" fontWeight="bold" textAnchor="middle">75% (270°)</text>
            <text x="0" y="95" fill="#1e293b" fontSize="11" fontWeight="bold" textAnchor="middle">Negyedkör: 90° = 1/4</text>
          </g>

          {/* 3. KÖR: Nyolcadkör (45° = 12,5%) és Harmadkör (120° = 33,3%) */}
          <g transform="translate(500, 125)">
            <circle cx="0" cy="0" r="70" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="2" />
            {/* Nyolcad körcikk: (0, -70)-től (49.5, -49.5)-ig (45 fok) */}
            <path d="M 0 0 L 0 -70 A 70 70 0 0 1 49.5 -49.5 Z" fill="#10b981" />
            <circle cx="0" cy="0" r="3" fill="#1e293b" />
            {/* Sugár vonalak */}
            <line x1="0" y1="0" x2="0" y2="-70" stroke="#047857" strokeWidth="1.5" />
            <line x1="0" y1="0" x2="49.5" y2="-49.5" stroke="#047857" strokeWidth="1.5" />
            {/* Szögív */}
            <path d="M 0 -28 A 28 28 0 0 1 19.8 -19.8" fill="none" stroke="#047857" strokeWidth="1.5" />
            <text x="24" y="-38" fill="#047857" fontSize="10" fontWeight="black">45°</text>
            <text x="34" y="-24" fill="#059669" fontSize="9" fontWeight="bold">12,5%</text>
            <text x="-15" y="15" fill="#64748b" fontSize="11" fontWeight="bold" textAnchor="middle">7/8 (87,5%)</text>
            <text x="0" y="95" fill="#1e293b" fontSize="11" fontWeight="bold" textAnchor="middle">Nyolcad: 45° = 1/8</text>
          </g>
        </svg>
      </div>
      <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 text-center">
        A teljes körlap 360°, ami mindig a 100%-os egésznek felel meg. A középponti szög egyenesen arányos a részarány nagyságával.
      </div>
    </div>
  );
};

/**
 * 2. Osztálytermi kördiagram: 24 fős osztály szakkörei
 * Zene (40% = 144°), Kézműves (35% = 126°), Sport (25% = 90°)
 */
export const ClassroomPieChartSvg: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-center p-4 rounded-2xl bg-white dark:bg-slate-900 border border-purple-200 dark:border-purple-900/60 shadow-xs">
      <div className="text-center mb-3">
        <span className="text-xs font-bold text-purple-900 dark:text-purple-300 uppercase tracking-wider">
          Gyakorlati példa: Egy 24 fős osztály szakkörválasztása
        </span>
      </div>
      <div className="w-full max-w-[640px]">
        <svg viewBox="0 0 600 300" className="w-full h-auto drop-shadow-xs">
          <rect x="10" y="10" width="580" height="280" rx="12" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />

          {/* Kördiagram rajzolása középen (cx = 190, cy = 150, r = 105) */}
          {/*
            Középpont: (190, 150)
            1. Szelet: Sport: 25% = 90°. Kezdés: -90° (0, -105) -> (190, 45).
               Befejezés: 0° (+105, 0) -> (295, 150).
            2. Szelet: Zene: 40% = 144°. Kezdés: 0° -> (295, 150).
               Befejezés: 144°. sin(144°) = 0.5878, cos(144°) = -0.8090.
               x = 190 + 105 * (-0.8090) = 190 - 84.95 = 105.05
               y = 150 + 105 * (0.5878) = 150 + 61.72 = 211.72.
            3. Szelet: Kézműves: 35% = 126°. Kezdés: 144°. Befejezés: 270° (-90°).
          */}
          <g id="pie-segments">
            {/* 1. Szelet: Sport (25% = 90°) - Kék */}
            <path
              d="M 190 150 L 190 45 A 105 105 0 0 1 295 150 Z"
              fill="#3b82f6"
              stroke="#ffffff"
              strokeWidth="2.5"
            />
            {/* Derékszög ív negyedkörrel és középponti ponttal */}
            <path d="M 190 120 A 30 30 0 0 1 220 150" fill="none" stroke="#ffffff" strokeWidth="1.5" />
            <circle cx="202" cy="138" r="2" fill="#ffffff" />

            {/* 2. Szelet: Zene (40% = 144°) - Borostyán/Narancs */}
            <path
              d="M 190 150 L 295 150 A 105 105 0 0 1 105.05 211.72 Z"
              fill="#f59e0b"
              stroke="#ffffff"
              strokeWidth="2.5"
            />

            {/* 3. Szelet: Kézműves (35% = 126°) - Smaragdzöld */}
            <path
              d="M 190 150 L 105.05 211.72 A 105 105 0 0 1 190 45 Z"
              fill="#10b981"
              stroke="#ffffff"
              strokeWidth="2.5"
            />

            {/* Középpont */}
            <circle cx="190" cy="150" r="4" fill="#1e293b" />

            {/* Szeleteken belüli feliratok */}
            <text x="240" y="105" fill="#ffffff" fontSize="13" fontWeight="black" textAnchor="middle">25%</text>
            <text x="240" y="122" fill="#e0f2fe" fontSize="10" fontWeight="bold" textAnchor="middle">90° (6 fő)</text>

            <text x="220" y="210" fill="#ffffff" fontSize="13" fontWeight="black" textAnchor="middle">40%</text>
            <text x="220" y="227" fill="#fef3c7" fontSize="10" fontWeight="bold" textAnchor="middle">144° (10 fő)</text>

            <text x="125" y="125" fill="#ffffff" fontSize="13" fontWeight="black" textAnchor="middle">35%</text>
            <text x="125" y="142" fill="#d1fae5" fontSize="10" fontWeight="bold" textAnchor="middle">126° (8 fő)</text>
          </g>

          {/* Jobb oldali Jelmagyarázat és Számítási tábla */}
          <g transform="translate(340, 45)">
            <rect x="0" y="0" width="230" height="210" rx="8" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1.5" />
            <text x="15" y="25" fill="#1e293b" fontSize="12" fontWeight="black">Adattábla (Összesen: 24 fő)</text>

            {/* Zene tétel */}
            <g transform="translate(15, 42)">
              <rect x="0" y="0" width="14" height="14" rx="3" fill="#f59e0b" />
              <text x="22" y="12" fill="#1e293b" fontSize="11" fontWeight="bold">Zene szakkör (40%)</text>
              <text x="22" y="28" fill="#64748b" fontSize="10">Középponti szög: 40 · 3,6° = 144°</text>
              <text x="22" y="42" fill="#d97706" fontSize="10" fontWeight="bold">Létszám: 24 · 0,40 = 10 fő (kb.)</text>
            </g>

            {/* Kézműves tétel */}
            <g transform="translate(15, 98)">
              <rect x="0" y="0" width="14" height="14" rx="3" fill="#10b981" />
              <text x="22" y="12" fill="#1e293b" fontSize="11" fontWeight="bold">Kézműves (35%)</text>
              <text x="22" y="28" fill="#64748b" fontSize="10">Középponti szög: 35 · 3,6° = 126°</text>
              <text x="22" y="42" fill="#059669" fontSize="10" fontWeight="bold">Létszám: 24 · 0,35 = 8 fő (kb.)</text>
            </g>

            {/* Sport tétel */}
            <g transform="translate(15, 154)">
              <rect x="0" y="0" width="14" height="14" rx="3" fill="#3b82f6" />
              <text x="22" y="12" fill="#1e293b" fontSize="11" fontWeight="bold">Sportkör (25%)</text>
              <text x="22" y="28" fill="#64748b" fontSize="10">Középponti szög: 25 · 3,6° = 90°</text>
              <text x="22" y="42" fill="#1d4ed8" fontSize="10" fontWeight="bold">Létszám: 24 · 0,25 = 6 fő (pontos)</text>
            </g>
          </g>
        </svg>
      </div>
      <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 text-center">
        Szögek összege: 144° + 126° + 90° = <strong>360°</strong> ✓ | Százalékok: 40% + 35% + 25% = <strong>100%</strong> ✓
      </div>
    </div>
  );
};

/**
 * 3. Átváltási formula és összefüggések (1% = 3,6° aranyszabály)
 */
export const DegreeConversionSvg: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-center p-4 rounded-2xl bg-white dark:bg-slate-900 border border-teal-200 dark:border-teal-900/60 shadow-xs">
      <div className="text-center mb-3">
        <span className="text-xs font-bold text-teal-900 dark:text-teal-300 uppercase tracking-wider">
          Az aranyszabály: Hogyan számolunk százalékból szöget és szögből százalékot?
        </span>
      </div>
      <div className="w-full max-w-[640px]">
        <svg viewBox="0 0 600 210" className="w-full h-auto drop-shadow-xs">
          <rect x="10" y="10" width="580" height="190" rx="12" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />

          {/* Bal oldali doboz: Százalék -> Szög */}
          <g transform="translate(30, 30)">
            <rect x="0" y="0" width="250" height="150" rx="10" fill="#f0fdf4" stroke="#86efac" strokeWidth="1.5" />
            <text x="125" y="25" fill="#166534" fontSize="12" fontWeight="black" textAnchor="middle">
              Százalékból Szög (α)
            </text>
            <line x1="20" y1="35" x2="230" y2="35" stroke="#bbf7d0" strokeWidth="1" />

            <text x="125" y="60" fill="#15803d" fontSize="13" fontWeight="black" textAnchor="middle">
              1% = 360° : 100 = 3,6°
            </text>
            <rect x="25" y="75" width="200" height="35" rx="6" fill="#ffffff" stroke="#86efac" />
            <text x="125" y="98" fill="#14532d" fontSize="14" fontWeight="black" textAnchor="middle">
              α = p · 3,6°
            </text>
            <text x="125" y="132" fill="#475569" fontSize="10" textAnchor="middle">
              Például: 20% → 20 · 3,6° = 72°
            </text>
          </g>

          {/* Jobb oldali doboz: Szögből -> Százalék */}
          <g transform="translate(320, 30)">
            <rect x="0" y="0" width="250" height="150" rx="10" fill="#eff6ff" stroke="#93c5fd" strokeWidth="1.5" />
            <text x="125" y="25" fill="#1e40af" fontSize="12" fontWeight="black" textAnchor="middle">
              Szögből Százalék (p)
            </text>
            <line x1="20" y1="35" x2="230" y2="35" stroke="#bfdbfe" strokeWidth="1" />

            <text x="125" y="60" fill="#1d4ed8" fontSize="13" fontWeight="black" textAnchor="middle">
              p% = (α : 360°) · 100%
            </text>
            <rect x="25" y="75" width="200" height="35" rx="6" fill="#ffffff" stroke="#93c5fd" />
            <text x="125" y="98" fill="#1e3a8a" fontSize="14" fontWeight="black" textAnchor="middle">
              p = α : 3,6°
            </text>
            <text x="125" y="132" fill="#475569" fontSize="10" textAnchor="middle">
              Például: 108° → 108 : 3,6 = 30%
            </text>
          </g>
        </svg>
      </div>
      <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 text-center">
        Jegyezd meg: <strong>1% mindig pontosan 3,6°-ot ér</strong> a kördiagramon! 10% = 36°, 50% = 180°.
      </div>
    </div>
  );
};

/**
 * 4. A kördiagram szerkesztésének lépései szögmérővel
 */
export const PieConstructionStepsSvg: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-center p-4 rounded-2xl bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-900/60 shadow-xs">
      <div className="text-center mb-3">
        <span className="text-xs font-bold text-amber-900 dark:text-amber-300 uppercase tracking-wider">
          A kördiagram manuális szerkesztésének 4 lépése
        </span>
      </div>
      <div className="w-full max-w-[660px]">
        <svg viewBox="0 0 640 220" className="w-full h-auto drop-shadow-xs">
          <rect x="10" y="10" width="620" height="200" rx="12" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />

          {/* 1. Lépés: Körzővel kör rajzolása + Kezdő sugár */}
          <g transform="translate(25, 25)">
            <rect x="0" y="0" width="135" height="170" rx="8" fill="#ffffff" stroke="#e2e8f0" />
            <text x="67" y="20" fill="#d97706" fontSize="10" fontWeight="black" textAnchor="middle">1. LÉPÉS</text>
            <text x="67" y="35" fill="#1e293b" fontSize="11" fontWeight="bold" textAnchor="middle">Kör és kezdősugár</text>
            <circle cx="67" cy="85" r="35" fill="none" stroke="#64748b" strokeWidth="1.5" />
            <line x1="67" y1="85" x2="67" y2="50" stroke="#d97706" strokeWidth="2" />
            <circle cx="67" cy="85" r="2.5" fill="#d97706" />
            <text x="67" y="145" fill="#64748b" fontSize="9" textAnchor="middle">Rajzold meg a kört,</text>
            <text x="67" y="158" fill="#64748b" fontSize="9" textAnchor="middle">húzz egy függőleges sugarat!</text>
          </g>

          {/* 2. Lépés: Szögmérő felhelyezése és szög bejelölése */}
          <g transform="translate(175, 25)">
            <rect x="0" y="0" width="135" height="170" rx="8" fill="#ffffff" stroke="#e2e8f0" />
            <text x="67" y="20" fill="#d97706" fontSize="10" fontWeight="black" textAnchor="middle">2. LÉPÉS</text>
            <text x="67" y="35" fill="#1e293b" fontSize="11" fontWeight="bold" textAnchor="middle">Szögkimérés</text>
            <circle cx="67" cy="85" r="35" fill="none" stroke="#e2e8f0" strokeWidth="1.5" />
            {/* Szögmérő sziluett */}
            <path d="M 37 85 A 30 30 0 0 1 97 85 Z" fill="#fef3c7" stroke="#d97706" strokeWidth="1" strokeDasharray="2,2" />
            <line x1="67" y1="85" x2="67" y2="50" stroke="#64748b" strokeWidth="1.5" />
            <line x1="67" y1="85" x2="95" y2="65" stroke="#d97706" strokeWidth="2" />
            <circle cx="67" cy="85" r="2.5" fill="#d97706" />
            <text x="67" y="145" fill="#64748b" fontSize="9" textAnchor="middle">Helyezd a szögmérőt</text>
            <text x="67" y="158" fill="#64748b" fontSize="9" textAnchor="middle">a középpontra, mérd ki az α-t!</text>
          </g>

          {/* 3. Lépés: Egymás utáni körcikkek kimérése */}
          <g transform="translate(325, 25)">
            <rect x="0" y="0" width="135" height="170" rx="8" fill="#ffffff" stroke="#e2e8f0" />
            <text x="67" y="20" fill="#d97706" fontSize="10" fontWeight="black" textAnchor="middle">3. LÉPÉS</text>
            <text x="67" y="35" fill="#1e293b" fontSize="11" fontWeight="bold" textAnchor="middle">Következő szeletek</text>
            <circle cx="67" cy="85" r="35" fill="none" stroke="#e2e8f0" strokeWidth="1.5" />
            <line x1="67" y1="85" x2="67" y2="50" stroke="#64748b" strokeWidth="1.5" />
            <line x1="67" y1="85" x2="95" y2="65" stroke="#64748b" strokeWidth="1.5" />
            <line x1="67" y1="85" x2="50" y2="115" stroke="#d97706" strokeWidth="2" />
            <circle cx="67" cy="85" r="2.5" fill="#d97706" />
            <text x="67" y="145" fill="#64748b" fontSize="9" textAnchor="middle">Minden új szöget az</text>
            <text x="67" y="158" fill="#64748b" fontSize="9" textAnchor="middle">előző sugártól mérj tovább!</text>
          </g>

          {/* 4. Lépés: Színezés, adatok, jelmagyarázat */}
          <g transform="translate(475, 25)">
            <rect x="0" y="0" width="135" height="170" rx="8" fill="#ffffff" stroke="#e2e8f0" />
            <text x="67" y="20" fill="#d97706" fontSize="10" fontWeight="black" textAnchor="middle">4. LÉPÉS</text>
            <text x="67" y="35" fill="#1e293b" fontSize="11" fontWeight="bold" textAnchor="middle">Színezés & Feliratok</text>
            <circle cx="67" cy="85" r="35" fill="#93c5fd" />
            <path d="M 67 85 L 67 50 A 35 35 0 0 1 102 85 Z" fill="#3b82f6" />
            <circle cx="67" cy="85" r="2.5" fill="#ffffff" />
            <text x="67" y="145" fill="#64748b" fontSize="9" textAnchor="middle">Színezd ki a cikkeket,</text>
            <text x="67" y="158" fill="#64748b" fontSize="9" textAnchor="middle">írd rá a %-okat és címkéket!</text>
          </g>
        </svg>
      </div>
      <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 text-center">
        Az utolsó körcikknek már pontosan ki kell adnia a maradék szöget (önellenőrzés: összeg = 360°).
      </div>
    </div>
  );
};

/**
 * 5. Félrevezető 3D-s kördiagram vs. szabályos 2D felülnézet
 */
export const Misleading3DPieSvg: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-center p-4 rounded-2xl bg-white dark:bg-slate-900 border border-rose-200 dark:border-rose-900/60 shadow-xs">
      <div className="text-center mb-3">
        <span className="text-xs font-bold text-rose-900 dark:text-rose-300 uppercase tracking-wider">
          Statisztikai manipuláció: Döntött 3D-s tortadiagram optikai csalódása
        </span>
      </div>
      <div className="w-full max-w-[660px]">
        <svg viewBox="0 0 640 240" className="w-full h-auto drop-shadow-xs">
          <rect x="10" y="10" width="620" height="220" rx="12" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />

          {/* BAL OLDAL: Döntött 3D (Csalóka) */}
          <g transform="translate(25, 20)">
            <rect x="0" y="0" width="280" height="190" rx="8" fill="#fef2f2" stroke="#fecaca" strokeWidth="1" />
            <text x="140" y="25" fill="#dc2626" fontSize="11" fontWeight="black" textAnchor="middle">
              ⚠️ DÖNTÖTT 3D TORTA (Csalóka)
            </text>
            <text x="140" y="40" fill="#ef4444" fontSize="9" textAnchor="middle">
              Az elöl lévő 25% nagyobbnak látszik a hátsó 35%-nál!
            </text>

            {/* Döntött ellipszoid szeletek */}
            <g transform="translate(140, 115)">
              {/* Hátsó szelet (35%) */}
              <ellipse cx="0" cy="-10" rx="90" ry="35" fill="#cbd5e1" stroke="#94a3b8" />
              <text x="0" y="-12" fill="#475569" fontSize="11" fontWeight="bold" textAnchor="middle">B termék (35%)</text>

              {/* Elülső szelet (25%) kiemelve és elöl - optikailag hatalmasnak tűnik! */}
              <ellipse cx="0" cy="18" rx="95" ry="42" fill="#ef4444" stroke="#b91c1c" strokeWidth="2" />
              <text x="0" y="22" fill="#ffffff" fontSize="13" fontWeight="black" textAnchor="middle">A termék (csak 25%!)</text>
            </g>
          </g>

          {/* JOBB OLDAL: Szabályos 2D Kördiagram (Valós arányok) */}
          <g transform="translate(335, 20)">
            <rect x="0" y="0" width="280" height="190" rx="8" fill="#f0fdf4" stroke="#bbf7d0" strokeWidth="1" />
            <text x="140" y="25" fill="#16a34a" fontSize="11" fontWeight="black" textAnchor="middle">
              ✓ KORREKT 2D FELÜLNÉZET
            </text>
            <text x="140" y="40" fill="#22c55e" fontSize="9" textAnchor="middle">
              A 35% valóban nagyobb területtel rendelkezik, mint a 25%.
            </text>

            {/* Szabályos felülnézeti kördiagram */}
            <g transform="translate(140, 115)">
              <circle cx="0" cy="0" r="55" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="1.5" />
              {/* 35% körcikk = 126° */}
              <path d="M 0 0 L -55 0 A 55 55 0 0 1 17 -52 Z" fill="#22c55e" />
              {/* 25% körcikk = 90° */}
              <path d="M 0 0 L 0 55 A 55 55 0 0 1 -55 0 Z" fill="#ef4444" />
              <circle cx="0" cy="0" r="2.5" fill="#1e293b" />
              <text x="-25" y="-18" fill="#14532d" fontSize="11" fontWeight="bold">35%</text>
              <text x="-25" y="30" fill="#ffffff" fontSize="11" fontWeight="bold">25%</text>
            </g>
          </g>
        </svg>
      </div>
      <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 text-center">
        A térhatású 3D-s kördiagramokat a reklámokban előszeretettel használják a kisebb piaci részesedés felnagyítására. Mindig a 2D-s ábrázolás a megbízható!
      </div>
    </div>
  );
};
