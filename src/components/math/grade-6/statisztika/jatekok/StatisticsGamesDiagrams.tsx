import React from 'react';

/**
 * 1. Két halmazos Venn-diagram és alapvető műveletek (Metszet, Unió, Különbség, Alaphalmaz)
 */
export const TwoSetVennDiagramSvg: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-center p-4 rounded-2xl bg-white dark:bg-slate-900 border border-pink-200 dark:border-pink-900/60 shadow-xs">
      <div className="text-center mb-3">
        <span className="text-xs font-bold text-pink-900 dark:text-pink-300 uppercase tracking-wider">
          Két halmaz kapcsolatai a Venn-diagramon: Metszet, Unió, Különbség
        </span>
      </div>
      <div className="w-full max-w-[700px]">
        <svg viewBox="0 0 680 230" className="w-full h-auto drop-shadow-xs">
          {/* Alaphalmaz (U) háttér keret */}
          <rect x="15" y="10" width="650" height="210" rx="14" fill="#faf5ff" stroke="#e9d5ff" strokeWidth="2" />
          <text x="35" y="34" fill="#7e22ce" fontSize="13" fontWeight="black">U (Alaphalmaz)</text>
          <text x="35" y="50" fill="#a855f7" fontSize="10">Minden vizsgált elem összessége</text>

          {/* Venn körök középen */}
          <g transform="translate(190, 115)">
            {/* 'A' kör balra: középpont (-55, 0), r=65 */}
            <circle cx="-55" cy="0" r="65" fill="#ec4899" fillOpacity="0.2" stroke="#db2777" strokeWidth="2.5" />
            
            {/* 'B' kör jobbra: középpont (55, 0), r=65 */}
            <circle cx="55" cy="0" r="65" fill="#3b82f6" fillOpacity="0.2" stroke="#2563eb" strokeWidth="2.5" />

            {/* Metszet kiemelése: A metszet B */}
            <path
              d="M 0 -35 A 65 65 0 0 1 0 35 A 65 65 0 0 1 0 -35 Z"
              fill="#8b5cf6"
              fillOpacity="0.35"
              stroke="#7c3aed"
              strokeWidth="2"
            />

            {/* Címkék a körökön */}
            <text x="-95" y="-48" fill="#be185d" fontSize="13" fontWeight="black">A halmaz</text>
            <text x="95" y="-48" fill="#1d4ed8" fontSize="13" fontWeight="black" textAnchor="end">B halmaz</text>

            <text x="-75" y="5" fill="#9d174d" fontSize="11" fontWeight="bold" textAnchor="middle">
              Csak A
            </text>
            <text x="-75" y="20" fill="#be185d" fontSize="9" textAnchor="middle">
              (A \ B)
            </text>

            <text x="0" y="0" fill="#581c87" fontSize="11" fontWeight="black" textAnchor="middle">
              A ∩ B
            </text>
            <text x="0" y="16" fill="#6b21a8" fontSize="9" fontWeight="bold" textAnchor="middle">
              Metszet
            </text>
            <text x="0" y="28" fill="#7e22ce" fontSize="8" textAnchor="middle">
              (mindkettő)
            </text>

            <text x="75" y="5" fill="#1e40af" fontSize="11" fontWeight="bold" textAnchor="middle">
              Csak B
            </text>
            <text x="75" y="20" fill="#1d4ed8" fontSize="9" textAnchor="middle">
              (B \ A)
            </text>
          </g>

          {/* Jobb oldali magyarázó kártyák */}
          <g transform="translate(425, 25)">
            <rect x="0" y="0" width="225" height="180" rx="10" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.2" />
            <text x="12" y="22" fill="#1e293b" fontSize="11" fontWeight="bold">Jelölések & Jelentések:</text>

            <g transform="translate(10, 32)">
              <rect x="0" y="0" width="205" height="30" rx="5" fill="#fdf2f8" stroke="#fbcfe8" strokeWidth="1" />
              <text x="8" y="19" fill="#be185d" fontSize="11" fontWeight="black">Metszet (A ∩ B):</text>
              <text x="110" y="19" fill="#9d174d" fontSize="10">Közös elemek ("ÉS")</text>
            </g>

            <g transform="translate(10, 68)">
              <rect x="0" y="0" width="205" height="30" rx="5" fill="#eff6ff" stroke="#bfdbfe" strokeWidth="1" />
              <text x="8" y="19" fill="#1d4ed8" fontSize="11" fontWeight="black">Unió (A ∪ B):</text>
              <text x="95" y="19" fill="#1e40af" fontSize="10">Legalább az egyik ("VAGY")</text>
            </g>

            <g transform="translate(10, 104)">
              <rect x="0" y="0" width="205" height="30" rx="5" fill="#faf5ff" stroke="#e9d5ff" strokeWidth="1" />
              <text x="8" y="19" fill="#7e22ce" fontSize="11" fontWeight="black">Különbség (A \ B):</text>
              <text x="118" y="19" fill="#6b21a8" fontSize="10">A-ban van, B-ben nincs</text>
            </g>

            <g transform="translate(10, 140)">
              <rect x="0" y="0" width="205" height="28" rx="5" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
              <text x="8" y="18" fill="#475569" fontSize="10" fontWeight="bold">Kívül eső rész:</text>
              <text x="95" y="18" fill="#64748b" fontSize="9">Egyik halmazban sincs</text>
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
};

/**
 * 2. Valós statisztikai osztálylétszám példa Venn-diagrammal (Kitöltési sorrend a metszettől kifelé!)
 */
export const ClassroomStatisticsVennSvg: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-center p-4 rounded-2xl bg-white dark:bg-slate-900 border border-indigo-200 dark:border-indigo-900/60 shadow-xs">
      <div className="text-center mb-3">
        <span className="text-xs font-bold text-indigo-900 dark:text-indigo-300 uppercase tracking-wider">
          Szöveges statisztikai feladat megoldása: A "metszettől kifelé" szabály
        </span>
      </div>
      <div className="w-full max-w-[700px]">
        <svg viewBox="0 0 680 240" className="w-full h-auto drop-shadow-xs">
          {/* U alaphalmaz */}
          <rect x="15" y="10" width="650" height="220" rx="14" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
          <text x="35" y="34" fill="#334155" fontSize="12" fontWeight="black">
            Osztálylétszám: Összesen 28 tanuló (U)
          </text>

          {/* Venn körök */}
          <g transform="translate(180, 125)">
            {/* Angol halmaz */}
            <circle cx="-50" cy="0" r="68" fill="#dbeafe" fillOpacity="0.4" stroke="#2563eb" strokeWidth="2.5" />
            <text x="-90" y="-52" fill="#1d4ed8" fontSize="12" fontWeight="black">Angol (18 fő)</text>

            {/* Német halmaz */}
            <circle cx="50" cy="0" r="68" fill="#fef3c7" fillOpacity="0.4" stroke="#d97706" strokeWidth="2.5" />
            <text x="90" y="-52" fill="#b45309" fontSize="12" fontWeight="black" textAnchor="end">Német (14 fő)</text>

            {/* Metszet: 8 fő */}
            <text x="0" y="-5" fill="#7c3aed" fontSize="18" fontWeight="black" textAnchor="middle">8</text>
            <text x="0" y="15" fill="#6d28d9" fontSize="9" fontWeight="bold" textAnchor="middle">mindkettő</text>

            {/* Csak angol: 18 - 8 = 10 */}
            <text x="-65" y="-5" fill="#1e40af" fontSize="18" fontWeight="black" textAnchor="middle">10</text>
            <text x="-65" y="15" fill="#1e3a8a" fontSize="9" textAnchor="middle">csak angol</text>
            <text x="-65" y="27" fill="#64748b" fontSize="8" textAnchor="middle">(18 - 8 = 10)</text>

            {/* Csak német: 14 - 8 = 6 */}
            <text x="65" y="-5" fill="#92400e" fontSize="18" fontWeight="black" textAnchor="middle">6</text>
            <text x="65" y="15" fill="#78350f" fontSize="9" textAnchor="middle">csak német</text>
            <text x="65" y="27" fill="#64748b" fontSize="8" textAnchor="middle">(14 - 8 = 6)</text>

            {/* Kívül esők: 28 - (10 + 8 + 6) = 4 */}
            <circle cx="150" cy="55" r="16" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.5" />
            <text x="150" y="60" fill="#991b1b" fontSize="14" fontWeight="black" textAnchor="middle">4</text>
            <text x="150" y="82" fill="#b91c1c" fontSize="9" fontWeight="bold" textAnchor="middle">egyiket sem</text>
          </g>

          {/* Jobb: 4 Lépéses Algoritmus */}
          <g transform="translate(420, 25)">
            <rect x="0" y="0" width="230" height="190" rx="10" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1.2" />
            <text x="12" y="20" fill="#0f172a" fontSize="11" fontWeight="bold">Hogyan töltsd ki? (4 lépés):</text>

            <g transform="translate(10, 30)">
              <rect x="0" y="0" width="210" height="32" rx="5" fill="#faf5ff" />
              <text x="8" y="14" fill="#6b21a8" fontSize="10" fontWeight="bold">1. lépés: Mindig a METSZETTEL kezdj!</text>
              <text x="8" y="26" fill="#7e22ce" fontSize="9">Mindkettőt tanulja: 8 fő (középre)</text>
            </g>

            <g transform="translate(10, 68)">
              <rect x="0" y="0" width="210" height="32" rx="5" fill="#eff6ff" />
              <text x="8" y="14" fill="#1e40af" fontSize="10" fontWeight="bold">2. lépés: Vond ki a metszetet!</text>
              <text x="8" y="26" fill="#1d4ed8" fontSize="9">Csak angol: 18 - 8 = 10 | Csak német: 14 - 8 = 6</text>
            </g>

            <g transform="translate(10, 106)">
              <rect x="0" y="0" width="210" height="32" rx="5" fill="#f0fdf4" />
              <text x="8" y="14" fill="#15803d" fontSize="10" fontWeight="bold">3. lépés: Számold össze az uniót!</text>
              <text x="8" y="26" fill="#166534" fontSize="9">Valamit tanul: 10 + 8 + 6 = 24 tanuló</text>
            </g>

            <g transform="translate(10, 144)">
              <rect x="0" y="0" width="210" height="34" rx="5" fill="#fef2f2" />
              <text x="8" y="14" fill="#991b1b" fontSize="10" fontWeight="bold">4. lépés: Kívül esők meghatározása!</text>
              <text x="8" y="27" fill="#b91c1c" fontSize="9 font-bold">Egyiket sem: 28 - 24 = 4 tanuló ✓</text>
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
};

/**
 * 3. Három halmazos Venn-diagram (7 belső tartomány)
 */
export const ThreeSetVennDiagramSvg: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-center p-4 rounded-2xl bg-white dark:bg-slate-900 border border-purple-200 dark:border-purple-900/60 shadow-xs">
      <div className="text-center mb-3">
        <span className="text-xs font-bold text-purple-900 dark:text-purple-300 uppercase tracking-wider">
          Három halmaz Venn-diagramja: 7 belső tartomány
        </span>
      </div>
      <div className="w-full max-w-[660px]">
        <svg viewBox="0 0 620 250" className="w-full h-auto drop-shadow-xs">
          {/* Alaphalmaz keret */}
          <rect x="10" y="10" width="600" height="230" rx="14" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
          <text x="25" y="30" fill="#475569" fontSize="11" fontWeight="bold">U (Alaphalmaz)</text>

          {/* 3 kör középen */}
          <g transform="translate(200, 125)">
            {/* Felső 'A' kör */}
            <circle cx="0" cy="-35" r="58" fill="#f43f5e" fillOpacity="0.2" stroke="#e11d48" strokeWidth="2" />
            <text x="0" y="-72" fill="#be123c" fontSize="12" fontWeight="black" textAnchor="middle">A halmaz</text>

            {/* Bal alsó 'B' kör */}
            <circle cx="-42" cy="30" r="58" fill="#3b82f6" fillOpacity="0.2" stroke="#2563eb" strokeWidth="2" />
            <text x="-95" y="70" fill="#1d4ed8" fontSize="12" fontWeight="black" textAnchor="end">B halmaz</text>

            {/* Jobb alsó 'C' kör */}
            <circle cx="42" cy="30" r="58" fill="#10b981" fillOpacity="0.2" stroke="#059669" strokeWidth="2" />
            <text x="95" y="70" fill="#047857" fontSize="12" fontWeight="black" textAnchor="start">C halmaz</text>

            {/* Középső hármas metszet: A ∩ B ∩ C */}
            <circle cx="0" cy="10" r="10" fill="#fbbf24" fillOpacity="0.8" stroke="#d97706" strokeWidth="1.5" />
            <text x="0" y="13" fill="#78350f" fontSize="7" fontWeight="black" textAnchor="middle">A∩B∩C</text>

            {/* Címkék a tartományokhoz */}
            <text x="0" y="-45" fill="#881337" fontSize="9" fontWeight="bold" textAnchor="middle">Csak A</text>
            <text x="-55" y="45" fill="#1e3a8a" fontSize="9" fontWeight="bold" textAnchor="middle">Csak B</text>
            <text x="55" y="45" fill="#064e3b" fontSize="9" fontWeight="bold" textAnchor="middle">Csak C</text>

            <text x="-25" y="-10" fill="#6d28d9" fontSize="8" fontWeight="bold" textAnchor="middle">A ∩ B</text>
            <text x="25" y="-10" fill="#d97706" fontSize="8" fontWeight="bold" textAnchor="middle">A ∩ C</text>
            <text x="0" y="55" fill="#0369a1" fontSize="8" fontWeight="bold" textAnchor="middle">B ∩ C</text>
          </g>

          {/* Jobb oldali összegző */}
          <g transform="translate(425, 30)">
            <rect x="0" y="0" width="175" height="185" rx="10" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.2" />
            <text x="12" y="22" fill="#1e293b" fontSize="11" fontWeight="bold">A 7 tartomány:</text>

            <g transform="translate(10, 32)">
              <text x="0" y="14" fill="#be123c" fontSize="9" fontWeight="bold">• 3 db csak egy halmaz</text>
              <text x="10" y="26" fill="#64748b" fontSize="8">(Csak A, Csak B, Csak C)</text>

              <text x="0" y="44" fill="#7c3aed" fontSize="9" fontWeight="bold">• 3 db páros metszet</text>
              <text x="10" y="56" fill="#64748b" fontSize="8">(A∩B, B∩C, A∩C)</text>

              <text x="0" y="74" fill="#d97706" fontSize="9" fontWeight="bold">• 1 db közös hármas metszet</text>
              <text x="10" y="86" fill="#64748b" fontSize="8">(A ∩ B ∩ C - legbelső pont)</text>

              <line x1="0" y1="96" x2="155" y2="96" stroke="#e2e8f0" strokeWidth="1" />

              <text x="0" y="114" fill="#0f172a" fontSize="10" fontWeight="black">+ 1 külső tartomány</text>
              <text x="10" y="126" fill="#64748b" fontSize="8">(egyikbe sem tartozók)</text>
              <text x="0" y="142" fill="#15803d" fontSize="9" fontWeight="bold">Összesen 8 zóna a térben!</text>
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
};

/**
 * 4. Logikai döntési fa / Barkochba felezési stratégia (bináris keresés szemléltetése)
 */
export const BinarySearchTreeSvg: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-center p-4 rounded-2xl bg-white dark:bg-slate-900 border border-teal-200 dark:border-teal-900/60 shadow-xs">
      <div className="text-center mb-3">
        <span className="text-xs font-bold text-teal-900 dark:text-teal-300 uppercase tracking-wider">
          Logikai játékok: A Barkochba és a felezési stratégia (Bináris döntési fa)
        </span>
      </div>
      <div className="w-full max-w-[680px]">
        <svg viewBox="0 0 640 220" className="w-full h-auto drop-shadow-xs">
          {/* Gyökér: 1 - 100 szám */}
          <g transform="translate(320, 25)">
            <rect x="-80" y="0" width="160" height="30" rx="8" fill="#0d9488" stroke="#042f2e" strokeWidth="1.5" />
            <text x="0" y="20" fill="#ffffff" fontSize="11" fontWeight="black" textAnchor="middle">
              Gondoltam egy számra (1-100)
            </text>
          </g>

          {/* 1. Kérdés vonalak */}
          <path d="M 280 55 L 180 85" fill="none" stroke="#0d9488" strokeWidth="2" />
          <path d="M 360 55 L 460 85" fill="none" stroke="#0d9488" strokeWidth="2" />

          <text x="215" y="65" fill="#dc2626" fontSize="10" fontWeight="bold">Igen (&gt; 50)</text>
          <text x="425" y="65" fill="#2563eb" fontSize="10" fontWeight="bold">Nem (≤ 50)</text>

          {/* 2. Szint: 2 csomópont (50-es halmazok) */}
          <g transform="translate(180, 85)">
            <rect x="-70" y="0" width="140" height="28" rx="6" fill="#ccfbf1" stroke="#0d9488" strokeWidth="1.5" />
            <text x="0" y="18" fill="#134e4a" fontSize="10" fontWeight="bold" textAnchor="middle">
              Halmaz: 51 - 100 (50 szám)
            </text>
          </g>

          <g transform="translate(460, 85)">
            <rect x="-70" y="0" width="140" height="28" rx="6" fill="#ccfbf1" stroke="#0d9488" strokeWidth="1.5" />
            <text x="0" y="18" fill="#134e4a" fontSize="10" fontWeight="bold" textAnchor="middle">
              Halmaz: 1 - 50 (50 szám)
            </text>
          </g>

          {/* 3. Szint vonalak balra */}
          <path d="M 150 113 L 100 145" fill="none" stroke="#14b8a6" strokeWidth="1.5" />
          <path d="M 210 113 L 260 145" fill="none" stroke="#14b8a6" strokeWidth="1.5" />

          {/* 3. Szint vonalak jobbra */}
          <path d="M 430 113 L 380 145" fill="none" stroke="#14b8a6" strokeWidth="1.5" />
          <path d="M 490 113 L 540 145" fill="none" stroke="#14b8a6" strokeWidth="1.5" />

          {/* 4 csomópont: 25-ös halmazok */}
          {[
            { x: 100, label: '76-100 (25 db)' },
            { x: 260, label: '51-75 (25 db)' },
            { x: 380, label: '26-50 (25 db)' },
            { x: 540, label: '1-25 (25 db)' }
          ].map((node, i) => (
            <g key={i} transform={`translate(${node.x}, 145)`}>
              <rect x="-55" y="0" width="110" height="24" rx="5" fill="#f0fdfa" stroke="#5eead4" strokeWidth="1.2" />
              <text x="0" y="16" fill="#0f766e" fontSize="9" fontWeight="bold" textAnchor="middle">
                {node.label}
              </text>
            </g>
          ))}

          {/* Alsó tanulság banner */}
          <g transform="translate(60, 185)">
            <rect x="0" y="0" width="520" height="26" rx="6" fill="#0f766e" />
            <text x="260" y="17" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">
              Minden felező kérdés megduplázza a keresési sebességet: 100 számhoz legfeljebb 7 kérdés kell! (2⁷ = 128)
            </text>
          </g>
        </svg>
      </div>
    </div>
  );
};

/**
 * 5. Logikai kizárásos táblázat (Logikai szita mátrix)
 */
export const LogicGridPuzzleSvg: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-center p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
      <div className="text-center mb-3">
        <span className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
          Logikai feladvány: Kizárásos táblázat (Ki milyen háziállatot tart?)
        </span>
      </div>
      <div className="w-full max-w-[620px]">
        <svg viewBox="0 0 580 210" className="w-full h-auto drop-shadow-xs">
          {/* Mátrix balra */}
          <g transform="translate(30, 20)">
            {/* Fejléc sorok */}
            <rect x="90" y="0" width="60" height="30" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1" />
            <text x="120" y="19" fill="#1e293b" fontSize="10" fontWeight="bold" textAnchor="middle">Kutya</text>

            <rect x="150" y="0" width="60" height="30" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1" />
            <text x="180" y="19" fill="#1e293b" fontSize="10" fontWeight="bold" textAnchor="middle">Macska</text>

            <rect x="210" y="0" width="60" height="30" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1" />
            <text x="240" y="19" fill="#1e293b" fontSize="10" fontWeight="bold" textAnchor="middle">Papagáj</text>

            {/* 1. Sor: Anna */}
            <rect x="0" y="30" width="90" height="35" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" />
            <text x="12" y="52" fill="#0f172a" fontSize="11" fontWeight="bold">Anna</text>

            <rect x="90" y="30" width="60" height="35" fill="#fee2e2" stroke="#cbd5e1" strokeWidth="1" />
            <text x="120" y="53" fill="#dc2626" fontSize="16" fontWeight="black" textAnchor="middle">✗</text>

            <rect x="150" y="30" width="60" height="35" fill="#dcfce7" stroke="#cbd5e1" strokeWidth="1" />
            <text x="180" y="53" fill="#16a34a" fontSize="16" fontWeight="black" textAnchor="middle">✓</text>

            <rect x="210" y="30" width="60" height="35" fill="#fee2e2" stroke="#cbd5e1" strokeWidth="1" />
            <text x="240" y="53" fill="#dc2626" fontSize="16" fontWeight="black" textAnchor="middle">✗</text>

            {/* 2. Sor: Béla */}
            <rect x="0" y="65" width="90" height="35" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" />
            <text x="12" y="87" fill="#0f172a" fontSize="11" fontWeight="bold">Béla</text>

            <rect x="90" y="65" width="60" height="35" fill="#dcfce7" stroke="#cbd5e1" strokeWidth="1" />
            <text x="120" y="88" fill="#16a34a" fontSize="16" fontWeight="black" textAnchor="middle">✓</text>

            <rect x="150" y="65" width="60" height="35" fill="#fee2e2" stroke="#cbd5e1" strokeWidth="1" />
            <text x="180" y="88" fill="#dc2626" fontSize="16" fontWeight="black" textAnchor="middle">✗</text>

            <rect x="210" y="65" width="60" height="35" fill="#fee2e2" stroke="#cbd5e1" strokeWidth="1" />
            <text x="240" y="88" fill="#dc2626" fontSize="16" fontWeight="black" textAnchor="middle">✗</text>

            {/* 3. Sor: Csaba */}
            <rect x="0" y="100" width="90" height="35" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" />
            <text x="12" y="122" fill="#0f172a" fontSize="11" fontWeight="bold">Csaba</text>

            <rect x="90" y="100" width="60" height="35" fill="#fee2e2" stroke="#cbd5e1" strokeWidth="1" />
            <text x="120" y="123" fill="#dc2626" fontSize="16" fontWeight="black" textAnchor="middle">✗</text>

            <rect x="150" y="100" width="60" height="35" fill="#fee2e2" stroke="#cbd5e1" strokeWidth="1" />
            <text x="180" y="123" fill="#dc2626" fontSize="16" fontWeight="black" textAnchor="middle">✗</text>

            <rect x="210" y="100" width="60" height="35" fill="#dcfce7" stroke="#cbd5e1" strokeWidth="1" />
            <text x="240" y="123" fill="#16a34a" fontSize="16" fontWeight="black" textAnchor="middle">✓</text>
          </g>

          {/* Jobb oldali szabálykártya */}
          <g transform="translate(325, 20)">
            <rect x="0" y="0" width="225" height="150" rx="10" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.2" />
            <text x="12" y="22" fill="#0f172a" fontSize="11" fontWeight="bold">A kizárásos logika 2 aranyszabálya:</text>

            <g transform="translate(10, 34)">
              <rect x="0" y="0" width="205" height="45" rx="5" fill="#ecfdf5" stroke="#bbf7d0" strokeWidth="1" />
              <text x="8" y="16" fill="#15803d" fontSize="10" fontWeight="bold">1. Ha valahova pipa (✓) kerül:</text>
              <text x="8" y="32" fill="#166534" fontSize="9">A sorában és oszlopában minden más ✗!</text>
            </g>

            <g transform="translate(10, 86)">
              <rect x="0" y="0" width="205" height="45" rx="5" fill="#eff6ff" stroke="#bfdbfe" strokeWidth="1" />
              <text x="8" y="16" fill="#1d4ed8" fontSize="10" fontWeight="bold">2. Ha egy sorban csak 1 üres hely maradt:</text>
              <text x="8" y="32" fill="#1e40af" fontSize="9">Oda biztosan pipa (✓) kell kerüljön!</text>
            </g>
          </g>

          <text x="290" y="195" fill="#64748b" fontSize="10" textAnchor="middle">
            Ez az eljárás a Sudoku, az Einstein-rejtvények és a statisztikai logikai tesztek alapja.
          </text>
        </svg>
      </div>
    </div>
  );
};
