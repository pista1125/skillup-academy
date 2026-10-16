import React from 'react';

// 1. Átfogó Témaköri Útiterv (Mindmap / Roadmap)
export const StatOverviewRoadmapSvg: React.FC = () => {
  return (
    <div className="w-full flex justify-center py-2">
      <svg
        viewBox="0 0 740 340"
        className="w-full max-w-3xl h-auto select-none rounded-xl bg-slate-900 border border-slate-700/60 shadow-xl p-2"
      >
        <defs>
          <linearGradient id="boxGrad1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0284c7" />
            <stop offset="100%" stopColor="#0369a1" />
          </linearGradient>
          <linearGradient id="boxGrad2" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2563eb" />
            <stop offset="100%" stopColor="#1d4ed8" />
          </linearGradient>
          <linearGradient id="boxGrad3" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#6d28d9" />
          </linearGradient>
          <linearGradient id="boxGrad4" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0d9488" />
            <stop offset="100%" stopColor="#0f766e" />
          </linearGradient>
        </defs>

        {/* Főcím */}
        <text x="370" y="28" fill="#f8fafc" fontSize="17" fontWeight="bold" textAnchor="middle">
          VI. STATISZTIKA – Átfogó Témaköri Rendszer
        </text>
        <text x="370" y="48" fill="#94a3b8" fontSize="12" textAnchor="middle">
          A statisztika 4 alappillére a 6. osztályos tananyagban
        </text>

        {/* Központi összekötő vonal és nyilak */}
        <path d="M 170 120 L 570 120" stroke="#475569" strokeWidth="3" strokeDasharray="4 4" />
        <path d="M 170 240 L 570 240" stroke="#475569" strokeWidth="3" strokeDasharray="4 4" />
        <path d="M 370 120 L 370 240" stroke="#475569" strokeWidth="3" strokeDasharray="4 4" />

        {/* 1. Pillér: Adatgyűjtés & Játékok */}
        <g transform="translate(30, 70)">
          <rect width="180" height="95" rx="10" fill="url(#boxGrad1)" stroke="#38bdf8" strokeWidth="2" />
          <text x="90" y="24" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">
            1. Adatgyűjtés & Játékok
          </text>
          <text x="90" y="45" fill="#e0f2fe" fontSize="11" textAnchor="middle">
            • Halmazok, Venn-diagram
          </text>
          <text x="90" y="62" fill="#e0f2fe" fontSize="11" textAnchor="middle">
            • Gyakoriság & Relatív gy.
          </text>
          <text x="90" y="79" fill="#bae6fd" fontSize="10" fontWeight="600" textAnchor="middle">
            Kombinatorika & Esélyek
          </text>
        </g>

        {/* 2. Pillér: Grafikonok & Összefüggések */}
        <g transform="translate(250, 70)">
          <rect width="180" height="95" rx="10" fill="url(#boxGrad2)" stroke="#60a5fa" strokeWidth="2" />
          <text x="90" y="24" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">
            2. Diagramtípusok
          </text>
          <text x="90" y="45" fill="#dbeafe" fontSize="11" textAnchor="middle">
            • Oszlop- és sávdiagram
          </text>
          <text x="90" y="62" fill="#dbeafe" fontSize="11" textAnchor="middle">
            • Vonalgrafikon (időbeli trend)
          </text>
          <text x="90" y="79" fill="#bfdbfe" fontSize="10" fontWeight="600" textAnchor="middle">
            Kettős oszlop & Csalóka tengely
          </text>
        </g>

        {/* 3. Pillér: Kördiagram */}
        <g transform="translate(470, 70)">
          <rect width="240" height="95" rx="10" fill="url(#boxGrad3)" stroke="#c084fc" strokeWidth="2" />
          <text x="120" y="24" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">
            3. Kördiagram Mesterfogások
          </text>
          <text x="120" y="45" fill="#f3e8ff" fontSize="11" textAnchor="middle">
            • Teljes kör: 360° = 100%
          </text>
          <text x="120" y="62" fill="#f3e8ff" fontSize="11" textAnchor="middle">
            • 1% = 3,6° • Szög = p · 3,6°
          </text>
          <text x="120" y="79" fill="#e9d5ff" fontSize="10" fontWeight="600" textAnchor="middle">
            Nevezetes szögek (90° = 25%)
          </text>
        </g>

        {/* 4. Pillér: Statisztikai Mutatók & Átlag (Középen alul) */}
        <g transform="translate(180, 190)">
          <rect width="380" height="105" rx="10" fill="url(#boxGrad4)" stroke="#2dd4bf" strokeWidth="2" />
          <text x="190" y="26" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">
            4. Statisztikai Mutatók & Átlag
          </text>
          <text x="190" y="48" fill="#ccfbf1" fontSize="11" textAnchor="middle">
            • Átlag (x̄): ∑x / n (egyensúlyi pont a számegyenesen)
          </text>
          <text x="190" y="66" fill="#ccfbf1" fontSize="11" textAnchor="middle">
            • Medián (Me): Rendezett adatsor közepe (párosnál a 2 középső átlaga)
          </text>
          <text x="190" y="84" fill="#ccfbf1" fontSize="11" textAnchor="middle">
            • Módusz (Mo): Leggyakoribb • Terjedelem: Max - Min
          </text>
          <text x="190" y="99" fill="#99f6e4" fontSize="10" fontWeight="bold" textAnchor="middle">
            Kiugró értékek (outlierek) felismerése és kezelése
          </text>
        </g>

        {/* Alsó jelvény */}
        <text x="370" y="322" fill="#fbbf24" fontSize="12" fontWeight="bold" textAnchor="middle">
          ★ Összefoglalás: Rendszerezés, vizsgafelkészülés és integrált problémamegoldás ★
        </text>
      </svg>
    </div>
  );
};

// 2. Diagramválasztó Döntési Mátrix
export const ChartComparisonMatrixSvg: React.FC = () => {
  return (
    <div className="w-full flex justify-center py-2">
      <svg
        viewBox="0 0 740 320"
        className="w-full max-w-3xl h-auto select-none rounded-xl bg-slate-900 border border-slate-700/60 shadow-xl p-2"
      >
        {/* Cím */}
        <text x="370" y="28" fill="#f8fafc" fontSize="16" fontWeight="bold" textAnchor="middle">
          Mikor melyik diagramtípust válasszuk? – Döntési Útmutató
        </text>

        {/* 4 Oszlop a 4 diagramtípusnak */}
        {/* Oszlopdiagram */}
        <g transform="translate(30, 50)">
          <rect width="155" height="245" rx="8" fill="#0f172a" stroke="#0284c7" strokeWidth="1.5" />
          <rect width="155" height="32" rx="8" fill="#0369a1" />
          <text x="77" y="21" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">
            Oszlopdiagram
          </text>
          {/* Mini ábra */}
          <g transform="translate(25, 45)">
            <line x1="0" y1="50" x2="105" y2="50" stroke="#64748b" strokeWidth="1.5" />
            <rect x="10" y="20" width="16" height="30" fill="#38bdf8" rx="2" />
            <rect x="35" y="10" width="16" height="40" fill="#38bdf8" rx="2" />
            <rect x="60" y="25" width="16" height="25" fill="#38bdf8" rx="2" />
            <rect x="85" y="35" width="16" height="15" fill="#38bdf8" rx="2" />
          </g>
          <text x="77" y="125" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">
            Mire a legjobb?
          </text>
          <text x="15" y="145" fill="#cbd5e1" fontSize="10">• Kategóriák diszkrét</text>
          <text x="15" y="160" fill="#cbd5e1" fontSize="10">  mennyiségeinek</text>
          <text x="15" y="175" fill="#cbd5e1" fontSize="10">  összehasonlítására</text>
          <text x="15" y="195" fill="#94a3b8" fontSize="10">Pl. Kedvenc tantárgy,</text>
          <text x="15" y="210" fill="#94a3b8" fontSize="10">jegyek eloszlása</text>
          <text x="77" y="235" fill="#4ade80" fontSize="10" fontWeight="bold" textAnchor="middle">
            ✓ Mindig 0-ról induljon!
          </text>
        </g>

        {/* Fekvő sávdiagram */}
        <g transform="translate(205, 50)">
          <rect width="155" height="245" rx="8" fill="#0f172a" stroke="#2563eb" strokeWidth="1.5" />
          <rect width="155" height="32" rx="8" fill="#1d4ed8" />
          <text x="77" y="21" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">
            Sávdiagram (fekvő)
          </text>
          {/* Mini ábra */}
          <g transform="translate(25, 45)">
            <line x1="10" y1="0" x2="10" y2="50" stroke="#64748b" strokeWidth="1.5" />
            <rect x="10" y="6" width="70" height="10" fill="#60a5fa" rx="2" />
            <rect x="10" y="20" width="90" height="10" fill="#60a5fa" rx="2" />
            <rect x="10" y="34" width="45" height="10" fill="#60a5fa" rx="2" />
          </g>
          <text x="77" y="125" fill="#60a5fa" fontSize="11" fontWeight="bold" textAnchor="middle">
            Mire a legjobb?
          </text>
          <text x="15" y="145" fill="#cbd5e1" fontSize="10">• Hosszú nevű</text>
          <text x="15" y="160" fill="#cbd5e1" fontSize="10">  kategóriák esetén</text>
          <text x="15" y="175" fill="#cbd5e1" fontSize="10">• Rangsorolásra</text>
          <text x="15" y="195" fill="#94a3b8" fontSize="10">Pl. Országok lakossága,</text>
          <text x="15" y="210" fill="#94a3b8" fontSize="10">könyvtári műfajok</text>
          <text x="77" y="235" fill="#4ade80" fontSize="10" fontWeight="bold" textAnchor="middle">
            ✓ Jól olvasható címkék!
          </text>
        </g>

        {/* Vonalgrafikon */}
        <g transform="translate(380, 50)">
          <rect width="155" height="245" rx="8" fill="#0f172a" stroke="#059669" strokeWidth="1.5" />
          <rect width="155" height="32" rx="8" fill="#047857" />
          <text x="77" y="21" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">
            Vonalgrafikon
          </text>
          {/* Mini ábra */}
          <g transform="translate(25, 45)">
            <line x1="0" y1="50" x2="105" y2="50" stroke="#64748b" strokeWidth="1.5" />
            <path d="M 10 40 L 40 20 L 70 30 L 100 10" fill="none" stroke="#34d399" strokeWidth="2.5" />
            <circle cx="10" cy="40" r="3" fill="#34d399" />
            <circle cx="40" cy="20" r="3" fill="#34d399" />
            <circle cx="70" cy="30" r="3" fill="#34d399" />
            <circle cx="100" cy="10" r="3" fill="#34d399" />
          </g>
          <text x="77" y="125" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">
            Mire a legjobb?
          </text>
          <text x="15" y="145" fill="#cbd5e1" fontSize="10">• Időbeli folyamatok,</text>
          <text x="15" y="160" fill="#cbd5e1" fontSize="10">  változások és</text>
          <text x="15" y="175" fill="#cbd5e1" fontSize="10">  trendek jelzésére</text>
          <text x="15" y="195" fill="#94a3b8" fontSize="10">Pl. Napi hőmérséklet,</text>
          <text x="15" y="210" fill="#94a3b8" fontSize="10">túra távolság-idő</text>
          <text x="77" y="235" fill="#4ade80" fontSize="10" fontWeight="bold" textAnchor="middle">
            ✓ Csak folytonos időnél!
          </text>
        </g>

        {/* Kördiagram */}
        <g transform="translate(555, 50)">
          <rect width="155" height="245" rx="8" fill="#0f172a" stroke="#9333ea" strokeWidth="1.5" />
          <rect width="155" height="32" rx="8" fill="#7e22ce" />
          <text x="77" y="21" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">
            Kördiagram
          </text>
          {/* Mini ábra */}
          <g transform="translate(55, 45)">
            <circle cx="22" cy="25" r="22" fill="#c084fc" />
            <path d="M 22 25 L 22 3 A 22 22 0 0 1 44 25 Z" fill="#f43f5e" />
            <path d="M 22 25 L 44 25 A 22 22 0 0 1 22 47 Z" fill="#eab308" />
          </g>
          <text x="77" y="125" fill="#c084fc" fontSize="11" fontWeight="bold" textAnchor="middle">
            Mire a legjobb?
          </text>
          <text x="15" y="145" fill="#cbd5e1" fontSize="10">• Egy TELJES EGÉSZ</text>
          <text x="15" y="160" fill="#cbd5e1" fontSize="10">  részekre bontására,</text>
          <text x="15" y="175" fill="#cbd5e1" fontSize="10">  százalékos arányra</text>
          <text x="15" y="195" fill="#94a3b8" fontSize="10">Pl. Költségvetés,</text>
          <text x="15" y="210" fill="#94a3b8" fontSize="10">választási arányok</text>
          <text x="77" y="235" fill="#4ade80" fontSize="10" fontWeight="bold" textAnchor="middle">
            ✓ Mindig 100% és 360°!
          </text>
        </g>
      </svg>
    </div>
  );
};

// ============================================================================
// DEDIKÁLT ÖSSZEFOGLALÓ KVÍZ ÁBRÁK (Kérdések közvetlen leolvasásához!)
// ============================================================================

// Kvíz 1: Venn-diagram leolvasási feladat (Sport és Zene szakkör)
export const QuizSummaryVennSvg: React.FC = () => {
  // Összesen 30 fős osztály:
  // Csak Sport: 12 fő
  // Sport ÉS Zene: 6 fő
  // Csak Zene: 8 fő
  // Semelyik: 30 - (12+6+8) = 4 fő
  return (
    <div className="w-full flex justify-center py-1">
      <svg
        viewBox="0 0 540 180"
        className="w-full max-w-lg h-auto select-none rounded-lg bg-slate-900 border border-slate-700/80 shadow-md p-1"
      >
        <text x="270" y="20" fill="#f8fafc" fontSize="13" fontWeight="bold" textAnchor="middle">
          Venn-diagram: 30 fős osztály szakköri választása
        </text>

        {/* Keret (Teljes alaphalmaz = 30 fő) */}
        <rect x="40" y="32" width="460" height="135" rx="8" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
        <text x="55" y="50" fill="#94a3b8" fontSize="11" fontWeight="bold">
          Alaphalmaz: U = 30 fő
        </text>

        {/* Bal kör: Sport (kék) */}
        <circle cx="210" cy="105" r="50" fill="#0284c7" fillOpacity="0.35" stroke="#38bdf8" strokeWidth="2" />
        <text x="175" y="70" fill="#38bdf8" fontSize="12" fontWeight="bold">
          Sport
        </text>
        <text x="175" y="110" fill="#ffffff" fontSize="16" fontWeight="bold">
          12
        </text>

        {/* Jobb kör: Zene (lila) */}
        <circle cx="295" cy="105" r="50" fill="#7c3aed" fillOpacity="0.35" stroke="#c084fc" strokeWidth="2" />
        <text x="325" y="70" fill="#c084fc" fontSize="12" fontWeight="bold">
          Zene
        </text>
        <text x="330" y="110" fill="#ffffff" fontSize="16" fontWeight="bold">
          8
        </text>

        {/* Metszet: Mindkettő (6 fő) */}
        <text x="252" y="110" fill="#fde047" fontSize="16" fontWeight="bold" textAnchor="middle">
          6
        </text>
        <text x="252" y="130" fill="#fde047" fontSize="10" textAnchor="middle">
          mindkettő
        </text>

        {/* Kívül eső diákok (4 fő) */}
        <text x="445" y="150" fill="#f87171" fontSize="14" fontWeight="bold">
          4 fő
        </text>
        <text x="445" y="132" fill="#94a3b8" fontSize="10">
          egyik sem:
        </text>
      </svg>
    </div>
  );
};

// Kvíz 2: Kettős oszlopdiagram összehasonlító elemzéshez (6.A vs 6.B sportok)
export const QuizSummaryDoubleColumnSvg: React.FC = () => {
  // Sportok: Foci, Úszás, Kosárlabda
  // 6.A (kék): Foci: 12, Úszás: 8, Kosár: 5
  // 6.B (borostyán): Foci: 9, Úszás: 11, Kosár: 7
  return (
    <div className="w-full flex justify-center py-1">
      <svg
        viewBox="0 0 540 180"
        className="w-full max-w-lg h-auto select-none rounded-lg bg-slate-900 border border-slate-700/80 shadow-md p-1"
      >
        <text x="270" y="20" fill="#f8fafc" fontSize="13" fontWeight="bold" textAnchor="middle">
          Kettős oszlopdiagram: 6.A és 6.B kedvenc sportágai
        </text>

        {/* Jelmagyarázat */}
        <g transform="translate(330, 10)">
          <rect x="0" y="0" width="12" height="12" rx="2" fill="#38bdf8" />
          <text x="18" y="10" fill="#e2e8f0" fontSize="11">6.A</text>
          <rect x="55" y="0" width="12" height="12" rx="2" fill="#f59e0b" />
          <text x="73" y="10" fill="#e2e8f0" fontSize="11">6.B</text>
        </g>

        {/* Y skála: 0, 5, 10, 15 */}
        {[0, 5, 10, 15].map((val) => {
          const y = 140 - val * 7;
          return (
            <g key={val}>
              <line x1="50" y1={y} x2="490" y2={y} stroke="#334155" strokeDasharray="3 3" />
              <text x="42" y={y + 4} fill="#94a3b8" fontSize="10" textAnchor="end">{val}</text>
            </g>
          );
        })}

        {/* 1. Kategória: Foci (A: 12, B: 9) */}
        <g transform="translate(100, 0)">
          <rect x="0" y={140 - 12 * 7} width="28" height={12 * 7} fill="#0284c7" stroke="#38bdf8" rx="3" />
          <text x="14" y={140 - 12 * 7 - 4} fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">12</text>
          <rect x="32" y={140 - 9 * 7} width="28" height={9 * 7} fill="#d97706" stroke="#f59e0b" rx="3" />
          <text x="46" y={140 - 9 * 7 - 4} fill="#f59e0b" fontSize="11" fontWeight="bold" textAnchor="middle">9</text>
          <text x="30" y="156" fill="#f8fafc" fontSize="12" fontWeight="bold" textAnchor="middle">Foci</text>
        </g>

        {/* 2. Kategória: Úszás (A: 8, B: 11) */}
        <g transform="translate(230, 0)">
          <rect x="0" y={140 - 8 * 7} width="28" height={8 * 7} fill="#0284c7" stroke="#38bdf8" rx="3" />
          <text x="14" y={140 - 8 * 7 - 4} fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">8</text>
          <rect x="32" y={140 - 11 * 7} width="28" height={11 * 7} fill="#d97706" stroke="#f59e0b" rx="3" />
          <text x="46" y={140 - 11 * 7 - 4} fill="#f59e0b" fontSize="11" fontWeight="bold" textAnchor="middle">11</text>
          <text x="30" y="156" fill="#f8fafc" fontSize="12" fontWeight="bold" textAnchor="middle">Úszás</text>
        </g>

        {/* 3. Kategória: Kosárlabda (A: 5, B: 7) */}
        <g transform="translate(360, 0)">
          <rect x="0" y={140 - 5 * 7} width="28" height={5 * 7} fill="#0284c7" stroke="#38bdf8" rx="3" />
          <text x="14" y={140 - 5 * 7 - 4} fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">5</text>
          <rect x="32" y={140 - 7 * 7} width="28" height={7 * 7} fill="#d97706" stroke="#f59e0b" rx="3" />
          <text x="46" y={140 - 7 * 7 - 4} fill="#f59e0b" fontSize="11" fontWeight="bold" textAnchor="middle">7</text>
          <text x="30" y="156" fill="#f8fafc" fontSize="12" fontWeight="bold" textAnchor="middle">Kosár</text>
        </g>
      </svg>
    </div>
  );
};

// Kvíz 3: Kördiagram hiányzó körcikkel és szögekkel
export const QuizSummaryPieSvg: React.FC = () => {
  // Teljes diákcsoport: 100%
  // Angol: 50% (180°) -> félkör
  // Német: 25% (90°) -> derékszög
  // Francia: 15% (54°)
  // Spanyol: ? % (Hiányzó körcikk!) -> 100 - (50+25+15) = 10% (36°)
  return (
    <div className="w-full flex justify-center py-1">
      <svg
        viewBox="0 0 540 180"
        className="w-full max-w-lg h-auto select-none rounded-lg bg-slate-900 border border-slate-700/80 shadow-md p-1"
      >
        <text x="270" y="20" fill="#f8fafc" fontSize="13" fontWeight="bold" textAnchor="middle">
          Kördiagram: Idegen nyelvi szakkörök megoszlása
        </text>

        {/* Kördiagram (közép: cx=160, cy=100, r=65) */}
        <g transform="translate(160, 100)">
          {/* Angol (180°, felső félkör 50%) */}
          <path d="M 0 0 L -65 0 A 65 65 0 0 1 65 0 Z" fill="#0284c7" stroke="#0f172a" strokeWidth="1.5" />
          <text x="0" y="-25" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">Angol 50% (180°)</text>

          {/* Német (90°, jobb alsó negyedkör 25%) */}
          <path d="M 0 0 L 65 0 A 65 65 0 0 1 0 65 Z" fill="#10b981" stroke="#0f172a" strokeWidth="1.5" />
          <text x="30" y="32" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">Német 25% (90°)</text>

          {/* Francia (15% = 54°, 90°-tól 144°-ig) */}
          {/* sin(54)=0.809, cos(54)=0.587 -> x = -65*cos(36) = -52.6, y = 65*sin(36) = 38.2 */}
          <path d="M 0 0 L 0 65 A 65 65 0 0 1 -38 52.6 Z" fill="#f59e0b" stroke="#0f172a" strokeWidth="1.5" />
          <text x="-15" y="48" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">Francia 15%</text>

          {/* Spanyol (HIÁNYZÓ 10% = 36°, 144°-tól 180°-ig) */}
          <path d="M 0 0 L -38 52.6 A 65 65 0 0 1 -65 0 Z" fill="#ef4444" stroke="#fca5a5" strokeWidth="2" />
          <text x="-52" y="24" fill="#fde047" fontSize="12" fontWeight="bold" textAnchor="middle">?[X]</text>
        </g>

        {/* Jelmagyarázat a jobb oldalon */}
        <g transform="translate(300, 42)">
          <rect x="0" y="0" width="210" height="115" rx="6" fill="#1e293b" stroke="#334155" />
          <text x="15" y="20" fill="#38bdf8" fontSize="12" fontWeight="bold">■ Angol: 50% (180°)</text>
          <text x="15" y="42" fill="#34d399" fontSize="12" fontWeight="bold">■ Német: 25% (90° derékszög)</text>
          <text x="15" y="64" fill="#fbbf24" fontSize="12" fontWeight="bold">■ Francia: 15% (54°)</text>
          <text x="15" y="88" fill="#f87171" fontSize="12" fontWeight="bold">■ Spanyol: ? % (Középponti szög: 36°)</text>
          <text x="15" y="106" fill="#94a3b8" fontSize="10">Összesen kötelező: 100% és 360°</text>
        </g>
      </svg>
    </div>
  );
};

// Kvíz 4: Csalóka csonkított tengely vs. Valósághű ábrázolás
export const QuizSummaryMisleadingSvg: React.FC = () => {
  return (
    <div className="w-full flex justify-center py-1">
      <svg
        viewBox="0 0 540 180"
        className="w-full max-w-lg h-auto select-none rounded-lg bg-slate-900 border border-slate-700/80 shadow-md p-1"
      >
        <text x="270" y="20" fill="#f8fafc" fontSize="13" fontWeight="bold" textAnchor="middle">
          Melyik diagram félrevezető? (Cég forgalma: 100 millió vs. 104 millió Ft)
        </text>

        {/* Bal oldali diagram: Csonkított tengely (98-tól indul) */}
        <g transform="translate(40, 35)">
          <rect width="210" height="135" rx="6" fill="#1e1b2e" stroke="#ef4444" strokeWidth="1.5" />
          <text x="105" y="18" fill="#f87171" fontSize="11" fontWeight="bold" textAnchor="middle">
            A diagram: Tengely 98-tól!
          </text>
          <line x1="25" y1="105" x2="190" y2="105" stroke="#64748b" />
          <text x="20" y="108" fill="#94a3b8" fontSize="9" textAnchor="end">98</text>
          <text x="20" y="40" fill="#94a3b8" fontSize="9" textAnchor="end">104</text>
          {/* Oszlopok: 100 -> magasság: 20px, 104 -> magasság: 65px (HÁROMSZOROSNAK LÁTSZIK!) */}
          <rect x="50" y="85" width="40" height="20" fill="#f87171" rx="2" />
          <text x="70" y="80" fill="#f87171" fontSize="10" fontWeight="bold" textAnchor="middle">100 M</text>
          <rect x="120" y="40" width="40" height="65" fill="#f87171" rx="2" />
          <text x="140" y="35" fill="#f87171" fontSize="10" fontWeight="bold" textAnchor="middle">104 M</text>
          <text x="105" y="125" fill="#fca5a5" fontSize="10" textAnchor="middle">
            Úgy tűnik, mintha megháromszorozódott volna!
          </text>
        </g>

        {/* Jobb oldali diagram: Korrekt tengely (0-tól indul) */}
        <g transform="translate(290, 35)">
          <rect width="210" height="135" rx="6" fill="#0f172a" stroke="#10b981" strokeWidth="1.5" />
          <text x="105" y="18" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">
            B diagram: Tengely 0-tól indul
          </text>
          <line x1="25" y1="105" x2="190" y2="105" stroke="#64748b" />
          <text x="20" y="108" fill="#94a3b8" fontSize="9" textAnchor="end">0</text>
          <text x="20" y="40" fill="#94a3b8" fontSize="9" textAnchor="end">120</text>
          {/* Oszlopok: 100 -> h=55, 104 -> h=57 (reális 4%-os növekedés) */}
          <rect x="50" y="50" width="40" height="55" fill="#10b981" rx="2" />
          <text x="70" y="45" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">100 M</text>
          <rect x="120" y="48" width="40" height="57" fill="#10b981" rx="2" />
          <text x="140" y="43" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">104 M</text>
          <text x="105" y="125" fill="#6ee7b7" fontSize="10" textAnchor="middle">
            Valós arány: csupán 4%-os enyhe növekedés
          </text>
        </g>
      </svg>
    </div>
  );
};

// Kvíz 5: Napi hőmérséklet és statisztikai mutatók vonalgrafikonja
export const QuizSummaryTempLineSvg: React.FC = () => {
  // Hétfő - Vasárnap:
  // H: 16°C, K: 18°C, Sze: 18°C, Cs: 22°C, P: 18°C, Szo: 24°C, V: 24°C
  // Összeg: 16 + 18 + 18 + 22 + 18 + 24 + 24 = 140°C. Darabszám: 7 nap. Átlag: 140 : 7 = 20,0°C!
  // Módusz: 18°C (3 napon)
  // Rendezve: 16, 18, 18, [18], 22, 24, 24 -> Medián: 18°C!
  // Terjedelem: 24 - 16 = 8°C.
  return (
    <div className="w-full flex justify-center py-1">
      <svg
        viewBox="0 0 540 180"
        className="w-full max-w-lg h-auto select-none rounded-lg bg-slate-900 border border-slate-700/80 shadow-md p-1"
      >
        <text x="270" y="20" fill="#f8fafc" fontSize="13" fontWeight="bold" textAnchor="middle">
          Egy heti napi középhőmérséklet (°C)
        </text>

        {/* Rácsvonalak: 14, 18, 22, 26 °C */}
        {[14, 18, 22, 26].map((temp) => {
          const y = 140 - (temp - 14) * 8;
          return (
            <g key={temp}>
              <line x1="50" y1={y} x2="490" y2={y} stroke="#334155" strokeDasharray="3 3" />
              <text x="42" y={y + 4} fill="#94a3b8" fontSize="10" textAnchor="end">{temp}°C</text>
            </g>
          );
        })}

        {/* Vonalgrafikon pontjai */}
        {/* H: 16 (80), K: 18 (140), Sze: 18 (200), Cs: 22 (260), P: 18 (320), Szo: 24 (380), V: 24 (440) */}
        <path
          d="M 80 124 L 140 108 L 200 108 L 260 76 L 320 108 L 380 60 L 440 60"
          fill="none"
          stroke="#f59e0b"
          strokeWidth="2.5"
        />

        {[
          { day: 'H', temp: 16, x: 80, y: 124 },
          { day: 'K', temp: 18, x: 140, y: 108 },
          { day: 'Sze', temp: 18, x: 200, y: 108 },
          { day: 'Cs', temp: 22, x: 260, y: 76 },
          { day: 'P', temp: 18, x: 320, y: 108 },
          { day: 'Szo', temp: 24, x: 380, y: 60 },
          { day: 'V', temp: 24, x: 440, y: 60 }
        ].map((pt) => (
          <g key={pt.day}>
            <circle cx={pt.x} cy={pt.y} r="4.5" fill="#f59e0b" stroke="#ffffff" strokeWidth="1.5" />
            <text x={pt.x} y={pt.y - 7} fill="#fde047" fontSize="10" fontWeight="bold" textAnchor="middle">
              {pt.temp}°
            </text>
            <text x={pt.x} y="156" fill="#94a3b8" fontSize="11" fontWeight="bold" textAnchor="middle">
              {pt.day}
            </text>
          </g>
        ))}

        <text x="270" y="172" fill="#94a3b8" fontSize="10" textAnchor="middle">
          Adatok: 16, 18, 18, 22, 18, 24, 24 °C (n = 7 nap)
        </text>
      </svg>
    </div>
  );
};
