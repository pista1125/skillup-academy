import React from 'react';

/**
 * 1. Dimenziók fejlődése: 0D Pont -> 1D Szakasz -> 2D Síkidom -> 3D Geometriai Test
 */
export const DimensionEvolutionSvg: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-center p-4 rounded-2xl bg-white dark:bg-slate-900 border border-purple-200 dark:border-purple-900/60 shadow-xs">
      <div className="text-center mb-3">
        <span className="text-xs font-bold text-purple-900 dark:text-purple-300 uppercase tracking-wider">
          A térbeli dimenziók születése: 0D • 1D • 2D • 3D
        </span>
      </div>
      <div className="w-full max-w-[700px]">
        <svg viewBox="0 0 680 180" className="w-full h-auto drop-shadow-xs">
          {/* 0D: Pont */}
          <g transform="translate(15, 10)">
            <rect x="0" y="0" width="145" height="155" rx="10" fill="#faf5ff" stroke="#e9d5ff" strokeWidth="1.5" />
            <text x="72" y="22" fill="#7e22ce" fontSize="11" fontWeight="bold" textAnchor="middle">
              0D • Pont
            </text>
            <circle cx="72" cy="75" r="7" fill="#a855f7" stroke="#6b21a8" strokeWidth="2" />
            <text x="72" y="105" fill="#581c87" fontSize="11" fontWeight="bold" textAnchor="middle">P pont</text>
            <text x="72" y="130" fill="#64748b" fontSize="10" textAnchor="middle">0 irány (nincs méret)</text>
          </g>

          {/* 1D: Szakasz */}
          <g transform="translate(180, 10)">
            <rect x="0" y="0" width="145" height="155" rx="10" fill="#eff6ff" stroke="#bfdbfe" strokeWidth="1.5" />
            <text x="72" y="22" fill="#1e40af" fontSize="11" fontWeight="bold" textAnchor="middle">
              1D • Szakasz / Vonal
            </text>
            <line x1="25" y1="75" x2="120" y2="75" stroke="#2563eb" strokeWidth="3" />
            <circle cx="25" cy="75" r="4.5" fill="#1d4ed8" />
            <circle cx="120" cy="75" r="4.5" fill="#1d4ed8" />
            <text x="72" y="65" fill="#1d4ed8" fontSize="11" fontWeight="bold" textAnchor="middle">a hosszúság</text>
            <text x="72" y="130" fill="#64748b" fontSize="10" textAnchor="middle">1 irány: Hossz (cm, m)</text>
          </g>

          {/* 2D: Síkidom */}
          <g transform="translate(345, 10)">
            <rect x="0" y="0" width="145" height="155" rx="10" fill="#ecfdf5" stroke="#a7f3d0" strokeWidth="1.5" />
            <text x="72" y="22" fill="#065f46" fontSize="11" fontWeight="bold" textAnchor="middle">
              2D • Síkidom (Négyzet)
            </text>
            <rect x="35" y="45" width="75" height="55" fill="#a7f3d0" stroke="#059669" strokeWidth="2" />
            <text x="72" y="78" fill="#064e3b" fontSize="11" fontWeight="bold" textAnchor="middle">Terület (T)</text>
            <text x="72" y="118" fill="#047857" fontSize="10" fontWeight="bold" textAnchor="middle">a · b (cm², m²)</text>
            <text x="72" y="135" fill="#64748b" fontSize="10" textAnchor="middle">2 irány: Hossz + Szél.</text>
          </g>

          {/* 3D: Geometriai Test */}
          <g transform="translate(510, 10)">
            <rect x="0" y="0" width="155" height="155" rx="10" fill="#fefce8" stroke="#fef08a" strokeWidth="1.5" />
            <text x="77" y="22" fill="#854d0e" fontSize="11" fontWeight="bold" textAnchor="middle">
              3D • Geometriai Test
            </text>
            
            {/* Kocka */}
            <g transform="translate(77, 75)">
              <polygon points="-25,5 10,20 10,-15 -25,-30" fill="#fef08a" stroke="#ca8a04" strokeWidth="1.5" />
              <polygon points="10,20 38,5 38,-30 10,-15" fill="#fde047" stroke="#a16207" strokeWidth="1.5" />
              <polygon points="-25,-30 10,-15 38,-30 3,-45" fill="#fef9c3" stroke="#ca8a04" strokeWidth="1.5" />
            </g>

            <text x="77" y="118" fill="#713f12" fontSize="10" fontWeight="bold" textAnchor="middle">
              Térfogat (V) & Felszín (A)
            </text>
            <text x="77" y="135" fill="#64748b" fontSize="10" textAnchor="middle">
              3 irány: + Magasság
            </text>
          </g>
        </svg>
      </div>
    </div>
  );
};

/**
 * 2. Testek csoportosítása: Poliéderek (sík lapok) vs Forgástestek (görbe lapok)
 */
export const PolyhedraVsRotationalSvg: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-center p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
      <div className="text-center mb-3">
        <span className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
          A térbeli testek két fő családja: Poliéderek és Forgástestek
        </span>
      </div>
      <div className="w-full max-w-[720px]">
        <svg viewBox="0 0 680 230" className="w-full h-auto drop-shadow-xs">
          {/* Bal Panel: Poliéderek (csak síklapok) */}
          <g transform="translate(15, 10)">
            <rect x="0" y="0" width="315" height="205" rx="12" fill="#faf5ff" stroke="#d8b4fe" strokeWidth="1.5" />
            <text x="157" y="24" fill="#6b21a8" fontSize="13" fontWeight="black" textAnchor="middle">
              1. POLIÉDEREK (Soklapú testek)
            </text>
            <text x="157" y="40" fill="#7e22ce" fontSize="10" textAnchor="middle">
              Kizárólag sík sokszöglapok határolják
            </text>

            {/* Test 1: Kocka */}
            <g transform="translate(60, 110)">
              <polygon points="-25,8 10,22 10,-12 -25,-26" fill="#f3e8ff" stroke="#9333ea" strokeWidth="1.5" />
              <polygon points="10,22 35,8 35,-26 10,-12" fill="#e9d5ff" stroke="#7e22ce" strokeWidth="1.5" />
              <polygon points="-25,-26 10,-12 35,-26 0,-40" fill="#faf5ff" stroke="#9333ea" strokeWidth="1.5" />
              <text x="5" y="42" fill="#581c87" fontSize="10" fontWeight="bold" textAnchor="middle">Kocka</text>
            </g>

            {/* Test 2: Hasáb (triangular) */}
            <g transform="translate(155, 110)">
              <polygon points="-20,20 20,20 0,5" fill="#f3e8ff" stroke="#9333ea" strokeWidth="1.2" />
              <polygon points="-20,-25 20,-25 0,-40" fill="#f3e8ff" stroke="#9333ea" strokeWidth="1.5" />
              <polygon points="-20,20 20,20 20,-25 -20,-25" fill="#e9d5ff" stroke="#7e22ce" strokeWidth="1.5" />
              <polygon points="20,20 0,5 0,-40 20,-25" fill="#d8b4fe" stroke="#6b21a8" strokeWidth="1.2" />
              <text x="0" y="42" fill="#581c87" fontSize="10" fontWeight="bold" textAnchor="middle">Hasáb</text>
            </g>

            {/* Test 3: Gúla (piramis) */}
            <g transform="translate(250, 110)">
              <polygon points="-25,18 20,18 35,5 -10,5" fill="#f3e8ff" stroke="#9333ea" strokeWidth="1" />
              <polygon points="-25,18 20,18 5,-40" fill="#e9d5ff" stroke="#7e22ce" strokeWidth="1.5" />
              <polygon points="20,18 35,5 5,-40" fill="#d8b4fe" stroke="#6b21a8" strokeWidth="1.5" />
              <text x="5" y="42" fill="#581c87" fontSize="10" fontWeight="bold" textAnchor="middle">Gúla</text>
            </g>

            <rect x="15" y="172" width="285" height="22" rx="5" fill="#f3e8ff" />
            <text x="157" y="187" fill="#6b21a8" fontSize="10" fontWeight="bold" textAnchor="middle">
              ✓ Érvényes rájuk az Euler-tétel: C + L = É + 2
            </text>
          </g>

          {/* Jobb Panel: Forgástestek (görbe felületek) */}
          <g transform="translate(350, 10)">
            <rect x="0" y="0" width="315" height="205" rx="12" fill="#ecfeff" stroke="#a5f3fc" strokeWidth="1.5" />
            <text x="157" y="24" fill="#0e7490" fontSize="13" fontWeight="black" textAnchor="middle">
              2. FORGÁSTESTEK (Görbe felületek)
            </text>
            <text x="157" y="40" fill="#0891b2" fontSize="10" textAnchor="middle">
              Síkidomok megforgatásából származnak
            </text>

            {/* Test 1: Henger */}
            <g transform="translate(60, 110)">
              <path d="M -22 -15 L -22 20 A 22 7 0 0 0 22 20 L 22 -15 Z" fill="#cffafe" stroke="#0891b2" strokeWidth="1.5" />
              <ellipse cx="0" cy="20" rx="22" ry="7" fill="none" stroke="#0891b2" strokeWidth="1" strokeDasharray="2 2" />
              <ellipse cx="0" cy="-15" rx="22" ry="7" fill="#e0f2fe" stroke="#0891b2" strokeWidth="1.5" />
              <text x="0" y="42" fill="#155e75" fontSize="10" fontWeight="bold" textAnchor="middle">Henger</text>
            </g>

            {/* Test 2: Kúp */}
            <g transform="translate(157, 110)">
              <path d="M -22 20 L 0 -35 L 22 20 Z" fill="#cffafe" stroke="#0891b2" strokeWidth="1.5" />
              <ellipse cx="0" cy="20" rx="22" ry="7" fill="#e0f2fe" stroke="#0891b2" strokeWidth="1.5" />
              <text x="0" y="42" fill="#155e75" fontSize="10" fontWeight="bold" textAnchor="middle">Kúp</text>
            </g>

            {/* Test 3: Gömb */}
            <g transform="translate(250, 110)">
              <circle cx="0" cy="0" r="24" fill="#cffafe" stroke="#0891b2" strokeWidth="1.5" />
              <ellipse cx="0" cy="0" rx="24" ry="7" fill="none" stroke="#0e7490" strokeWidth="1" strokeDasharray="3 3" />
              <circle cx="-7" cy="-7" r="4" fill="#ffffff" fillOpacity="0.6" />
              <text x="0" y="42" fill="#155e75" fontSize="10" fontWeight="bold" textAnchor="middle">Gömb</text>
            </g>

            <rect x="15" y="172" width="285" height="22" rx="5" fill="#e0f2fe" />
            <text x="157" y="187" fill="#0369a1" fontSize="10" fontWeight="bold" textAnchor="middle">
              Görbe palást / nincs sokszög él vagy csúcs
            </text>
          </g>
        </svg>
      </div>
    </div>
  );
};

/**
 * 3. Poliéder határoló elemei: Csúcs (C), Él (É), Lap (L) bemutatása
 */
export const PolyhedronElementsSvg: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-center p-4 rounded-2xl bg-white dark:bg-slate-900 border border-purple-200 dark:border-purple-900/60 shadow-xs">
      <div className="text-center mb-2">
        <span className="text-xs font-bold text-purple-900 dark:text-purple-300 uppercase tracking-wider">
          A testek alapelemei: Csúcsok, Élek és Lapok
        </span>
      </div>
      <div className="w-full max-w-[620px]">
        <svg viewBox="0 0 580 230" className="w-full h-auto drop-shadow-xs">
          {/* 3D Test középen */}
          <g transform="translate(190, 120)">
            {/* Hátsó szaggatott élek */}
            <line x1="-70" y1="20" x2="10" y2="-15" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="3 3" />
            <line x1="10" y1="-15" x2="85" y2="20" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="3 3" />
            <line x1="10" y1="-15" x2="10" y2="-90" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="3 3" />

            {/* Kiemelt felső LAP (zöld) */}
            <polygon points="-70,-60 15,-20 85,-60 10,-90" fill="#86efac" fillOpacity="0.7" stroke="#16a34a" strokeWidth="2.5" />

            {/* Elülső lapok */}
            <polygon points="-70,20 15,60 15,-20 -70,-60" fill="#f3e8ff" stroke="#9333ea" strokeWidth="2" />
            <polygon points="15,60 85,20 85,-60 15,-20" fill="#e9d5ff" stroke="#7e22ce" strokeWidth="2" />

            {/* Kiemelt ÉL (kék vastag vonal) */}
            <line x1="15" y1="60" x2="15" y2="-20" stroke="#2563eb" strokeWidth="4.5" strokeLinecap="round" />

            {/* Csúcsok (pink pöttyök) */}
            {[
              { x: -70, y: 20 },
              { x: 15, y: 60 },
              { x: 85, y: 20 },
              { x: -70, y: -60 },
              { x: 15, y: -20 },
              { x: 85, y: -60 },
              { x: 10, y: -90 }
            ].map((p, idx) => (
              <circle key={idx} cx={p.x} cy={p.y} r={idx === 1 ? 7 : 4.5} fill={idx === 1 ? '#ec4899' : '#f43f5e'} stroke="#ffffff" strokeWidth="1.5" />
            ))}
          </g>

          {/* Mutató nyilak és magyarázó kártyák */}
          {/* 1. CSÚCS mutató */}
          <g transform="translate(40, 150)">
            <rect x="0" y="0" width="130" height="48" rx="8" fill="#fdf2f8" stroke="#fbcfe8" strokeWidth="1.5" />
            <circle cx="15" cy="18" r="5" fill="#ec4899" />
            <text x="26" y="22" fill="#be185d" fontSize="11" fontWeight="black">CSÚCS (C)</text>
            <text x="10" y="38" fill="#64748b" fontSize="9">3 vagy több él találkozása (pont)</text>
            {/* Vonal a kiemelt csúcshoz */}
            <path d="M 130 20 L 195 28" fill="none" stroke="#ec4899" strokeWidth="1.5" strokeDasharray="3 2" />
          </g>

          {/* 2. ÉL mutató */}
          <g transform="translate(370, 130)">
            <rect x="0" y="0" width="145" height="48" rx="8" fill="#eff6ff" stroke="#bfdbfe" strokeWidth="1.5" />
            <line x1="10" y1="18" x2="25" y2="18" stroke="#2563eb" strokeWidth="3" />
            <text x="32" y="22" fill="#1d4ed8" fontSize="11" fontWeight="black">ÉL (É)</text>
            <text x="10" y="38" fill="#64748b" fontSize="9">2 szomszédos lap határa (szakasz)</text>
            {/* Vonal az élhez */}
            <path d="M 0 20 L -150 10" fill="none" stroke="#2563eb" strokeWidth="1.5" strokeDasharray="3 2" />
          </g>

          {/* 3. LAP mutató */}
          <g transform="translate(340, 30)">
            <rect x="0" y="0" width="145" height="48" rx="8" fill="#f0fdf4" stroke="#bbf7d0" strokeWidth="1.5" />
            <rect x="10" y="10" width="14" height="14" fill="#86efac" stroke="#16a34a" />
            <text x="30" y="22" fill="#15803d" fontSize="11" fontWeight="black">LAP (L)</text>
            <text x="10" y="38" fill="#64748b" fontSize="9">Határoló síkidom (sokszög)</text>
            {/* Vonal a felső laphoz */}
            <path d="M 0 35 L -120 45" fill="none" stroke="#16a34a" strokeWidth="1.5" strokeDasharray="3 2" />
          </g>
        </svg>
      </div>
    </div>
  );
};

/**
 * 4. Hasábok vs Gúlák összehasonlító diagramja
 */
export const PrismsVsPyramidsSvg: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-center p-4 rounded-2xl bg-white dark:bg-slate-900 border border-blue-200 dark:border-blue-900/60 shadow-xs">
      <div className="text-center mb-3">
        <span className="text-xs font-bold text-blue-900 dark:text-blue-300 uppercase tracking-wider">
          Hasábok és Gúlák szerkezeti felépítése
        </span>
      </div>
      <div className="w-full max-w-[680px]">
        <svg viewBox="0 0 640 220" className="w-full h-auto drop-shadow-xs">
          {/* Bal: HASÁB modell */}
          <g transform="translate(20, 10)">
            <rect x="0" y="0" width="285" height="195" rx="12" fill="#eff6ff" stroke="#bfdbfe" strokeWidth="1.5" />
            <text x="142" y="22" fill="#1e40af" fontSize="12" fontWeight="black" textAnchor="middle">
              HASÁB (Prizma)
            </text>

            {/* 3D Hasáb rajz: 2 háromszög alap + téglalap palást */}
            <g transform="translate(75, 110)">
              {/* Alsó alaplap */}
              <polygon points="-35,35 35,35 5,10" fill="#93c5fd" stroke="#2563eb" strokeWidth="1.5" />
              {/* Felső alaplap */}
              <polygon points="-35,-45 35,-45 5,-70" fill="#93c5fd" stroke="#2563eb" strokeWidth="1.5" />
              {/* Palást oldallapok */}
              <polygon points="-35,35 35,35 35,-45 -35,-45" fill="#dbeafe" fillOpacity="0.7" stroke="#1d4ed8" strokeWidth="2" />
              <polygon points="35,35 5,10 5,-70 35,-45" fill="#bfdbfe" fillOpacity="0.6" stroke="#1d4ed8" strokeWidth="1.5" />

              {/* Magasságvonal */}
              <line x1="-48" y1="-45" x2="-48" y2="35" stroke="#1e40af" strokeWidth="1.5" />
              <text x="-56" y="0" fill="#1e40af" fontSize="11" fontWeight="bold">m</text>
            </g>

            <g transform="translate(150, 45)">
              <text x="0" y="15" fill="#1e3a8a" fontSize="11" fontWeight="bold">Szerkezete:</text>
              <text x="0" y="32" fill="#3b82f6" fontSize="10" fontWeight="bold">• 2 egybevágó alaplap</text>
              <text x="0" y="46" fill="#64748b" fontSize="9">(párhuzamos síkokban)</text>
              <text x="0" y="65" fill="#3b82f6" fontSize="10" fontWeight="bold">• Palást: téglalapok</text>
              <text x="0" y="79" fill="#64748b" fontSize="9">(oldalélek = magasság)</text>
              <text x="0" y="98" fill="#1e40af" fontSize="10" fontWeight="black">• n-oldalú hasábnál:</text>
              <text x="0" y="112" fill="#1e40af" fontSize="9 font-mono">C = 2n, L = n+2, É = 3n</text>
            </g>
          </g>

          {/* Jobb: GÚLA modell */}
          <g transform="translate(335, 10)">
            <rect x="0" y="0" width="285" height="195" rx="12" fill="#fffbeb" stroke="#fde68a" strokeWidth="1.5" />
            <text x="142" y="22" fill="#92400e" fontSize="12" fontWeight="black" textAnchor="middle">
              GÚLA (Piramis)
            </text>

            {/* 3D Gúla rajz: 1 négyzet alap + 1 csúcs */}
            <g transform="translate(85, 115)">
              {/* Alaplap */}
              <polygon points="-40,25 25,25 45,5 -20,5" fill="#fde68a" stroke="#d97706" strokeWidth="1.2" />
              {/* Oldallapok */}
              <polygon points="-40,25 25,25 2,-55" fill="#fef3c7" stroke="#b45309" strokeWidth="2" />
              <polygon points="25,25 45,5 2,-55" fill="#fde68a" stroke="#b45309" strokeWidth="1.5" />

              {/* Csúcs pont kiemelve */}
              <circle cx="2" cy="-55" r="4.5" fill="#ea580c" />
              <text x="2" y="-62" fill="#ea580c" fontSize="10" fontWeight="bold" textAnchor="middle">Csúcs</text>

              {/* Belső magasságvonal szaggatva */}
              <line x1="2" y1="-55" x2="2" y2="15" stroke="#dc2626" strokeWidth="1.5" strokeDasharray="3 3" />
              <text x="8" y="-15" fill="#dc2626" fontSize="10" fontWeight="bold">m</text>
            </g>

            <g transform="translate(155, 45)">
              <text x="0" y="15" fill="#78350f" fontSize="11" fontWeight="bold">Szerkezete:</text>
              <text x="0" y="32" fill="#d97706" fontSize="10" fontWeight="bold">• 1 sokszög alaplap</text>
              <text x="0" y="46" fill="#64748b" fontSize="9">(alul fekszik)</text>
              <text x="0" y="65" fill="#d97706" fontSize="10" fontWeight="bold">• Palást: háromszögek</text>
              <text x="0" y="79" fill="#64748b" fontSize="9">(1 közös csúcsban futnak)</text>
              <text x="0" y="98" fill="#92400e" fontSize="10" fontWeight="black">• n-oldalú gúlánál:</text>
              <text x="0" y="112" fill="#92400e" fontSize="9 font-mono">C = n+1, L = n+1, É = 2n</text>
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
};

/**
 * 5. Forgástestek generálása síkidomok megforgatásával
 */
export const RotationalSolidsGenerationSvg: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-center p-4 rounded-2xl bg-white dark:bg-slate-900 border border-cyan-200 dark:border-cyan-900/60 shadow-xs">
      <div className="text-center mb-2">
        <span className="text-xs font-bold text-cyan-900 dark:text-cyan-300 uppercase tracking-wider">
          Forgástestek keletkezése: 360 fokos megforgatás egyenes tengely körül
        </span>
      </div>
      <div className="w-full max-w-[700px]">
        <svg viewBox="0 0 680 200" className="w-full h-auto drop-shadow-xs">
          {/* 1. Henger (Téglalap forgatása) */}
          <g transform="translate(15, 10)">
            <rect x="0" y="0" width="205" height="175" rx="10" fill="#f0fdfa" stroke="#99f6e4" strokeWidth="1.2" />
            <text x="102" y="20" fill="#0f766e" fontSize="11" fontWeight="bold" textAnchor="middle">
              Téglalap forgatása ⟹ Henger
            </text>

            <g transform="translate(102, 95)">
              {/* Tengely */}
              <line x1="0" y1="-65" x2="0" y2="65" stroke="#dc2626" strokeWidth="1.5" strokeDasharray="4 2" />
              {/* Forgás nyíl felül */}
              <path d="M -15 -55 A 15 6 0 1 1 15 -55" fill="none" stroke="#dc2626" strokeWidth="1.5" />
              
              {/* Eredeti téglalap a tengely jobb oldalán */}
              <rect x="0" y="-35" width="38" height="70" fill="#99f6e4" fillOpacity="0.8" stroke="#0d9488" strokeWidth="2" />
              
              {/* Tükrözött forgatási kontúr szaggatva */}
              <path d="M -38 -35 L -38 35 A 38 10 0 0 0 38 35 L 38 -35 Z" fill="none" stroke="#14b8a6" strokeWidth="1.2" strokeDasharray="2 2" />
              <ellipse cx="0" cy="35" rx="38" ry="10" fill="none" stroke="#0d9488" strokeWidth="1" strokeDasharray="3 3" />
              <ellipse cx="0" cy="-35" rx="38" ry="10" fill="#ccfbf1" fillOpacity="0.5" stroke="#0d9488" strokeWidth="1.5" />
            </g>

            <text x="102" y="162" fill="#134e4a" fontSize="10" fontWeight="bold" textAnchor="middle">
              2 kör alap + hengerpalást
            </text>
          </g>

          {/* 2. Kúp (Derékszögű háromszög forgatása) */}
          <g transform="translate(235, 10)">
            <rect x="0" y="0" width="205" height="175" rx="10" fill="#f0f9ff" stroke="#bae6fd" strokeWidth="1.2" />
            <text x="102" y="20" fill="#0369a1" fontSize="11" fontWeight="bold" textAnchor="middle">
              Háromszög forgatása ⟹ Kúp
            </text>

            <g transform="translate(102, 95)">
              {/* Tengely */}
              <line x1="0" y1="-65" x2="0" y2="65" stroke="#dc2626" strokeWidth="1.5" strokeDasharray="4 2" />
              {/* Forgás nyíl */}
              <path d="M -15 -55 A 15 6 0 1 1 15 -55" fill="none" stroke="#dc2626" strokeWidth="1.5" />

              {/* Derékszögű háromszög a tengely jobb oldalán */}
              <polygon points="0,-45 40,35 0,35" fill="#bae6fd" fillOpacity="0.8" stroke="#0284c7" strokeWidth="2" />
              {/* Derékszög jele (magyar szabvány: negyedkörív + pont) */}
              <path d="M 0 23 A 12 12 0 0 1 12 35" fill="none" stroke="#0284c7" strokeWidth="1.2" />
              <circle cx="4.5" cy="30.5" r="1.3" fill="#0284c7" />

              {/* Tükrözött forgatási kontúr szaggatva */}
              <path d="M -40 35 L 0 -45 L 40 35" fill="none" stroke="#38bdf8" strokeWidth="1.2" strokeDasharray="2 2" />
              <ellipse cx="0" cy="35" rx="40" ry="10" fill="#e0f2fe" fillOpacity="0.5" stroke="#0284c7" strokeWidth="1.5" />
            </g>

            <text x="102" y="162" fill="#0c4a6e" fontSize="10" fontWeight="bold" textAnchor="middle">
              1 kör alap + 1 csúcs
            </text>
          </g>

          {/* 3. Gömb (Félkör forgatása) */}
          <g transform="translate(460, 10)">
            <rect x="0" y="0" width="205" height="175" rx="10" fill="#faf5ff" stroke="#e9d5ff" strokeWidth="1.2" />
            <text x="102" y="20" fill="#7e22ce" fontSize="11" fontWeight="bold" textAnchor="middle">
              Félkör forgatása ⟹ Gömb
            </text>

            <g transform="translate(102, 95)">
              {/* Tengely */}
              <line x1="0" y1="-65" x2="0" y2="65" stroke="#dc2626" strokeWidth="1.5" strokeDasharray="4 2" />
              {/* Forgás nyíl */}
              <path d="M -15 -55 A 15 6 0 1 1 15 -55" fill="none" stroke="#dc2626" strokeWidth="1.5" />

              {/* Félkör a tengely jobb oldalán */}
              <path d="M 0 -40 A 40 40 0 0 1 0 40 Z" fill="#e9d5ff" fillOpacity="0.8" stroke="#9333ea" strokeWidth="2" />

              {/* Teljes gömbfelület körvonala szaggatva balra */}
              <circle cx="0" cy="0" r="40" fill="none" stroke="#a855f7" strokeWidth="1.2" strokeDasharray="2 2" />
              <ellipse cx="0" cy="0" rx="40" ry="12" fill="none" stroke="#9333ea" strokeWidth="1" strokeDasharray="3 3" />
            </g>

            <text x="102" y="162" fill="#581c87" fontSize="10" fontWeight="bold" textAnchor="middle">
              Minden irányból szimmetrikus
            </text>
          </g>
        </svg>
      </div>
    </div>
  );
};

/**
 * 6. Kockahálók validálása: Érvényes háló (1-4-1 kereszt) vs Hibás elrendezések
 */
export const CubeNetsValidationSvg: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-center p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
      <div className="text-center mb-3">
        <span className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
          Testhálók hajtogatása: Érvényes háló vs. Hibás elrendezések
        </span>
      </div>
      <div className="w-full max-w-[680px]">
        <svg viewBox="0 0 640 220" className="w-full h-auto drop-shadow-xs">
          {/* Bal: Érvényes kockaháló (Kereszt) */}
          <g transform="translate(20, 10)">
            <rect x="0" y="0" width="285" height="195" rx="12" fill="#f0fdf4" stroke="#86efac" strokeWidth="1.5" />
            <text x="142" y="24" fill="#166534" fontSize="12" fontWeight="black" textAnchor="middle">
              ✓ ÉRVÉNYES HÁLÓ (Pl. Latin kereszt)
            </text>

            {/* 1-4-1 Latin kereszt: 4 négyzet vízszintesen, 1 fent, 1 lent */}
            <g transform="translate(65, 50)">
              {/* Vízszintes 4 négyzet: méret 28x28 */}
              <rect x="0" y="28" width="28" height="28" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
              <rect x="28" y="28" width="28" height="28" fill="#bbf7d0" stroke="#16a34a" strokeWidth="1.5" />
              <rect x="56" y="28" width="28" height="28" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
              <rect x="84" y="28" width="28" height="28" fill="#bbf7d0" stroke="#16a34a" strokeWidth="1.5" />

              {/* Felső négyzet (tető) */}
              <rect x="28" y="0" width="28" height="28" fill="#86efac" stroke="#15803d" strokeWidth="1.8" />
              <text x="42" y="18" fill="#065f46" fontSize="9" fontWeight="bold" textAnchor="middle">tető</text>

              {/* Alsó négyzet (alap) */}
              <rect x="28" y="56" width="28" height="28" fill="#86efac" stroke="#15803d" strokeWidth="1.8" />
              <text x="42" y="74" fill="#065f46" fontSize="9" fontWeight="bold" textAnchor="middle">alap</text>
            </g>

            <g transform="translate(20, 148)">
              <text x="0" y="14" fill="#14532d" fontSize="10" fontWeight="bold">Miért jó?</text>
              <text x="0" y="28" fill="#166534" fontSize="9">• A 4 négyzet palástot alkot körben</text>
              <text x="0" y="40" fill="#166534" fontSize="9">• A 2 fül ellentétes oldalon zárja le a dobozt</text>
            </g>
          </g>

          {/* Jobb: Hibás elrendezések */}
          <g transform="translate(335, 10)">
            <rect x="0" y="0" width="285" height="195" rx="12" fill="#fff1f2" stroke="#fecdd3" strokeWidth="1.5" />
            <text x="142" y="24" fill="#9f1239" fontSize="12" fontWeight="black" textAnchor="middle">
              ✗ HIBÁS ELRENDEZÉSEK (Nem hajtogatható kockává!)
            </text>

            {/* Hiba 1: Két fül ugyanazon az oldalon (átfednék egymást) */}
            <g transform="translate(35, 45)">
              <rect x="0" y="24" width="24" height="24" fill="#ffe4e6" stroke="#e11d48" strokeWidth="1.2" />
              <rect x="24" y="24" width="24" height="24" fill="#ffe4e6" stroke="#e11d48" strokeWidth="1.2" />
              <rect x="48" y="24" width="24" height="24" fill="#ffe4e6" stroke="#e11d48" strokeWidth="1.2" />
              <rect x="72" y="24" width="24" height="24" fill="#ffe4e6" stroke="#e11d48" strokeWidth="1.2" />
              {/* Mindkét fül felül van */}
              <rect x="24" y="0" width="24" height="24" fill="#fecdd3" stroke="#be123c" strokeWidth="1.5" />
              <rect x="48" y="0" width="24" height="24" fill="#fecdd3" stroke="#be123c" strokeWidth="1.5" />

              <text x="110" y="20" fill="#9f1239" fontSize="9" fontWeight="bold">2 fül egy oldalon:</text>
              <text x="110" y="34" fill="#881337" fontSize="9">Összehajtva átfedik egymást,</text>
              <text x="110" y="46" fill="#881337" fontSize="9">és az alja nyitva marad!</text>
            </g>

            {/* Hiba 2: 6 négyzet egymás után egy sorban */}
            <g transform="translate(35, 125)">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <rect key={i} x={i * 20} y="0" width="20" height="20" fill="#ffe4e6" stroke="#e11d48" strokeWidth="1.2" />
              ))}
              <text x="135" y="14" fill="#9f1239" fontSize="9" fontWeight="bold">6 négyzet egy csíkban:</text>
              <text x="135" y="26" fill="#881337" fontSize="9">Nincs fedél és alaplap!</text>
            </g>

            <rect x="15" y="165" width="255" height="20" rx="4" fill="#ffe4e6" />
            <text x="142" y="179" fill="#9f1239" fontSize="9" fontWeight="bold" textAnchor="middle">
              A kockának pontosan 11 helyes síkbeli hálója van.
            </text>
          </g>
        </svg>
      </div>
    </div>
  );
};

/**
 * 7. Henger és Kúp síkbeli hálója
 */
export const CylinderConeNetsSvg: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-center p-4 rounded-2xl bg-white dark:bg-slate-900 border border-teal-200 dark:border-teal-900/60 shadow-xs">
      <div className="text-center mb-2">
        <span className="text-xs font-bold text-teal-900 dark:text-teal-300 uppercase tracking-wider">
          Forgástestek testhálói: Henger és Kúp kiterítése a síkba
        </span>
      </div>
      <div className="w-full max-w-[660px]">
        <svg viewBox="0 0 620 200" className="w-full h-auto drop-shadow-xs">
          {/* Bal: Henger hálója */}
          <g transform="translate(20, 15)">
            <rect x="0" y="0" width="275" height="170" rx="10" fill="#f0fdfa" stroke="#99f6e4" strokeWidth="1.5" />
            <text x="137" y="20" fill="#0f766e" fontSize="11" fontWeight="bold" textAnchor="middle">
              Egyenes körhenger hálója
            </text>

            <g transform="translate(65, 85)">
              {/* Téglalap palást: szélesség = 110, magasság = 50 */}
              <rect x="0" y="-25" width="110" height="50" fill="#ccfbf1" stroke="#0d9488" strokeWidth="1.8" />
              <text x="55" y="4" fill="#115e59" fontSize="10" fontWeight="bold" textAnchor="middle">
                Téglalap Palást
              </text>
              <text x="55" y="16" fill="#0f766e" fontSize="8" textAnchor="middle">
                hossza = 2 · r · π (körkerület)
              </text>

              {/* Felső kör fedőlap */}
              <circle cx="55" cy="-45" r="18" fill="#99f6e4" stroke="#0f766e" strokeWidth="1.5" />
              <text x="55" y="-42" fill="#042f2e" fontSize="8" fontWeight="bold" textAnchor="middle">fedél</text>

              {/* Alsó kör alaplap */}
              <circle cx="55" cy="45" r="18" fill="#99f6e4" stroke="#0f766e" strokeWidth="1.5" />
              <text x="55" y="48" fill="#042f2e" fontSize="8" fontWeight="bold" textAnchor="middle">alap</text>

              {/* Magasság méret */}
              <line x1="-8" y1="-25" x2="-8" y2="25" stroke="#0d9488" strokeWidth="1.5" />
              <text x="-14" y="3" fill="#0d9488" fontSize="9" fontWeight="bold" textAnchor="end">m</text>
            </g>

            <text x="137" y="158" fill="#134e4a" fontSize="9" fontWeight="bold" textAnchor="middle">
              1 db Téglalap + 2 db azonos Körlap
            </text>
          </g>

          {/* Jobb: Kúp hálója */}
          <g transform="translate(325, 15)">
            <rect x="0" y="0" width="275" height="170" rx="10" fill="#f0f9ff" stroke="#bae6fd" strokeWidth="1.5" />
            <text x="137" y="20" fill="#0369a1" fontSize="11" fontWeight="bold" textAnchor="middle">
              Egyenes körkúp hálója
            </text>

            <g transform="translate(137, 85)">
              {/* Körcikk palást */}
              <path d="M 0 -35 L -45 15 A 60 60 0 0 0 45 15 Z" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.8" />
              <text x="0" y="-3" fill="#0369a1" fontSize="9" fontWeight="bold" textAnchor="middle">
                Körcikk Palást
              </text>
              <text x="0" y="8" fill="#0284c7" fontSize="8" textAnchor="middle">
                ívhossz = 2 · r · π
              </text>

              {/* Kör alaplap az ívhez csatolva */}
              <circle cx="0" cy="45" r="16" fill="#bae6fd" stroke="#0284c7" strokeWidth="1.5" />
              <text x="0" y="48" fill="#0c4a6e" fontSize="8" fontWeight="bold" textAnchor="middle">Kör alap</text>
            </g>

            <text x="137" y="158" fill="#0369a1" fontSize="9" fontWeight="bold" textAnchor="middle">
              1 db Körcikk + 1 db Körlap
            </text>
          </g>
        </svg>
      </div>
    </div>
  );
};

/**
 * 8. Vetületi ábrázolás és nézetek (Elölnézet, Felülnézet magasságszámokkal, Oldalnézet)
 */
export const MongeViewsProjectionSvg: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-center p-4 rounded-2xl bg-white dark:bg-slate-900 border border-purple-200 dark:border-purple-900/60 shadow-xs">
      <div className="text-center mb-3">
        <span className="text-xs font-bold text-purple-900 dark:text-purple-300 uppercase tracking-wider">
          A térbeli test síkbeli vetületei: Elölnézet • Felülnézet • Oldalnézet
        </span>
      </div>
      <div className="w-full max-w-[700px]">
        <svg viewBox="0 0 680 230" className="w-full h-auto drop-shadow-xs">
          {/* Bal: 3D Lépcsős Kockaépítmény */}
          <g transform="translate(20, 10)">
            <rect x="0" y="0" width="220" height="205" rx="10" fill="#faf5ff" stroke="#d8b4fe" strokeWidth="1.5" />
            <text x="110" y="24" fill="#6b21a8" fontSize="12" fontWeight="black" textAnchor="middle">
              3D Kockaépítmény
            </text>

            {/* 3D izometrikus építmény: Bal oszlop 2 kocka magas, jobb oszlop 1 kocka magas */}
            <g transform="translate(100, 120)">
              {/* Bal 1. alsó kocka */}
              <polygon points="-35,10 -5,22 -5,-2 -35,-14" fill="#e9d5ff" stroke="#7e22ce" strokeWidth="1.2" />
              {/* Bal 2. felső kocka */}
              <polygon points="-35,-14 -5,-2 -5,-26 -35,-38" fill="#d8b4fe" stroke="#6b21a8" strokeWidth="1.5" />
              <polygon points="-5,-2 25,-14 25,-38 -5,-26" fill="#c084fc" stroke="#6b21a8" strokeWidth="1.5" />
              <polygon points="-35,-38 -5,-26 25,-38 -5,-50" fill="#f3e8ff" stroke="#7e22ce" strokeWidth="1.5" />

              {/* Jobb 1 kocka magas */}
              <polygon points="-5,22 25,10 25,-14 -5,-2" fill="#e9d5ff" stroke="#7e22ce" strokeWidth="1.2" />
              <polygon points="25,10 55,-2 55,-26 25,-14" fill="#c084fc" stroke="#6b21a8" strokeWidth="1.2" />
              <polygon points="-5,-2 25,10 55,-2 25,-14" fill="#f3e8ff" stroke="#7e22ce" strokeWidth="1.2" />
            </g>

            <text x="110" y="180" fill="#581c87" fontSize="10" fontWeight="bold" textAnchor="middle">
              Összesen: 2 + 1 = 3 kocka
            </text>
          </g>

          {/* Jobb: 3 Nézet (Elölnézet, Felülnézet magasságszámokkal, Oldalnézet) */}
          <g transform="translate(260, 10)">
            <rect x="0" y="0" width="400" height="205" rx="10" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
            <text x="200" y="24" fill="#1e293b" fontSize="12" fontWeight="bold" textAnchor="middle">
              A 3 egymásra merőleges vetület
            </text>

            {/* 1. ELÖLNÉZET (szemből) */}
            <g transform="translate(25, 45)">
              <rect x="0" y="0" width="105" height="110" rx="8" fill="#ffffff" stroke="#9333ea" strokeWidth="1.2" />
              <text x="52" y="18" fill="#7e22ce" fontSize="10" fontWeight="bold" textAnchor="middle">1. Elölnézet</text>
              {/* L-alak: bal oszlop 2 kocka, jobb oszlop 1 kocka */}
              <g transform="translate(27, 30)">
                <rect x="0" y="0" width="25" height="25" fill="#d8b4fe" stroke="#6b21a8" strokeWidth="1.5" />
                <rect x="0" y="25" width="25" height="25" fill="#e9d5ff" stroke="#6b21a8" strokeWidth="1.5" />
                <rect x="25" y="25" width="25" height="25" fill="#e9d5ff" stroke="#6b21a8" strokeWidth="1.5" />
              </g>
              <text x="52" y="98" fill="#6b21a8" fontSize="9" textAnchor="middle">Szemből nézve</text>
            </g>

            {/* 2. FELÜLNÉZET magasságszámokkal */}
            <g transform="translate(145, 45)">
              <rect x="0" y="0" width="115" height="110" rx="8" fill="#ffffff" stroke="#2563eb" strokeWidth="1.2" />
              <text x="57" y="18" fill="#1d4ed8" fontSize="10" fontWeight="bold" textAnchor="middle">2. Felülnézet</text>
              {/* 2 mező vízszintesen: [2] és [1] magassággal */}
              <g transform="translate(30, 42)">
                <rect x="0" y="0" width="28" height="28" fill="#bfdbfe" stroke="#1d4ed8" strokeWidth="1.8" />
                <text x="14" y="19" fill="#1e3a8a" fontSize="14" fontWeight="black" textAnchor="middle">2</text>

                <rect x="28" y="0" width="28" height="28" fill="#dbeafe" stroke="#1d4ed8" strokeWidth="1.8" />
                <text x="42" y="19" fill="#1e3a8a" fontSize="14" fontWeight="black" textAnchor="middle">1</text>
              </g>
              <text x="57" y="98" fill="#1e40af" fontSize="9" fontWeight="bold" textAnchor="middle">Magasságszámok!</text>
            </g>

            {/* 3. OLDALNÉZET (balról/jobbról) */}
            <g transform="translate(275, 45)">
              <rect x="0" y="0" width="105" height="110" rx="8" fill="#ffffff" stroke="#059669" strokeWidth="1.2" />
              <text x="52" y="18" fill="#047857" fontSize="10" fontWeight="bold" textAnchor="middle">3. Oldalnézet</text>
              {/* 1 függőleges oszlop 2 kocka magasan */}
              <g transform="translate(40, 30)">
                <rect x="0" y="0" width="25" height="25" fill="#a7f3d0" stroke="#059669" strokeWidth="1.5" />
                <rect x="0" y="25" width="25" height="25" fill="#d1fae5" stroke="#059669" strokeWidth="1.5" />
              </g>
              <text x="52" y="98" fill="#065f46" fontSize="9" textAnchor="middle">Oldalról nézve</text>
            </g>

            <g transform="translate(20, 168)">
              <rect x="0" y="0" width="360" height="24" rx="5" fill="#f1f5f9" />
              <text x="180" y="16" fill="#334155" fontSize="10" fontWeight="bold" textAnchor="middle">
                Összes kocka a magasságszámok összege: 2 + 1 = 3 kocka
              </text>
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
};
