import React from 'react';

/**
 * 1. A felszín és a kiterített testháló fogalma
 */
export const SurfaceAreaConceptNetSvg: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-center p-4 rounded-2xl bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-900/60 shadow-xs">
      <div className="text-center mb-2">
        <span className="text-xs font-bold text-amber-900 dark:text-amber-300 uppercase tracking-wider">
          A térbeli test és a kiterített síkbeli testháló
        </span>
      </div>
      <div className="w-full max-w-[620px]">
        <svg viewBox="0 0 580 220" className="w-full h-auto drop-shadow-xs">
          <defs>
            <marker id="unfoldArrow" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
              <polygon points="0 0, 7 3.5, 0 7" fill="#d97706" />
            </marker>
          </defs>

          {/* Bal oldal: 3D Doboz (izometrikus) */}
          <g transform="translate(110, 110)">
            {/* 3D téglatest */}
            <polygon points="-50,15 25,50 25,-25 -50,-60" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
            <polygon points="25,50 85,20 85,-55 25,-25" fill="#fde68a" stroke="#b45309" strokeWidth="2" />
            <polygon points="-50,-60 25,-25 85,-55 10,-90" fill="#fef08a" stroke="#d97706" strokeWidth="2" />

            <text x="15" y="75" fill="#78350f" fontSize="12" fontWeight="bold" textAnchor="middle">
              3D Zárt test
            </text>
            <text x="15" y="90" fill="#92400e" fontSize="10" textAnchor="middle">
              6 határoló síklap
            </text>
          </g>

          {/* Közép: Felvágás és kiterítés nyíl */}
          <g transform="translate(250, 110)">
            <path d="M 0 0 Q 30 -20 60 0" fill="none" stroke="#d97706" strokeWidth="3" markerEnd="url(#unfoldArrow)" />
            <text x="30" y="-22" fill="#b45309" fontSize="11" fontWeight="bold" textAnchor="middle">
              Élek felvágása
            </text>
            <text x="30" y="24" fill="#78350f" fontSize="10" fontWeight="semibold" textAnchor="middle">
              kiterítés síkba
            </text>
          </g>

          {/* Jobb oldal: Kiterített 2D háló */}
          <g transform="translate(420, 110)">
            {/* T-alakú testháló */}
            {/* Középső oszlop 4 lap: fedél, hátlap, alaplap, előlap */}
            <rect x="-20" y="-80" width="40" height="35" fill="#fef08a" stroke="#d97706" strokeWidth="1.5" />
            <rect x="-20" y="-45" width="40" height="35" fill="#fde68a" stroke="#d97706" strokeWidth="1.5" />
            <rect x="-20" y="-10" width="40" height="35" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
            <rect x="-20" y="25" width="40" height="35" fill="#fde68a" stroke="#d97706" strokeWidth="1.5" />

            {/* Bal oldallap és jobb oldallap az alaplap mellett */}
            <rect x="-55" y="-10" width="35" height="35" fill="#fef08a" stroke="#d97706" strokeWidth="1.5" />
            <rect x="20" y="-10" width="35" height="35" fill="#fef08a" stroke="#d97706" strokeWidth="1.5" />

            <text x="0" y="80" fill="#78350f" fontSize="12" fontWeight="bold" textAnchor="middle">
              2D Testháló
            </text>
            <text x="0" y="95" fill="#15803d" fontSize="10" fontWeight="bold" textAnchor="middle">
              A = T₁ + T₂ + T₃ + T₄ + T₅ + T₆
            </text>
          </g>
        </svg>
      </div>
    </div>
  );
};

/**
 * 2. Kocka felszíne és testhálója (A = 6 · a²)
 */
export const CubeSurfaceAreaNetSvg: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-center p-4 rounded-2xl bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-900/60 shadow-xs">
      <div className="text-center mb-2">
        <span className="text-xs font-bold text-emerald-900 dark:text-emerald-300 uppercase tracking-wider">
          A kocka felszíne: 6 egybevágó négyzetlap (A = 6 · a²)
        </span>
      </div>
      <div className="w-full max-w-[640px]">
        <svg viewBox="0 0 600 240" className="w-full h-auto drop-shadow-xs">
          {/* Bal: 3D Izometrikus Kocka */}
          <g transform="translate(120, 120)">
            {/* Elülső */}
            <polygon points="-45,15 25,50 25,-25 -45,-60" fill="#a7f3d0" stroke="#059669" strokeWidth="2" />
            {/* Jobb */}
            <polygon points="25,50 85,20 85,-55 25,-25" fill="#6ee7b7" stroke="#047857" strokeWidth="2" />
            {/* Felső */}
            <polygon points="-45,-60 25,-25 85,-55 15,-90" fill="#d1fae5" stroke="#059669" strokeWidth="2" />

            {/* Él jelölések */}
            <text x="-12" y="52" fill="#065f46" fontSize="13" fontWeight="black" textAnchor="middle">a</text>
            <text x="65" y="48" fill="#065f46" fontSize="13" fontWeight="black" textAnchor="middle">a</text>
            <text x="-55" y="-20" fill="#065f46" fontSize="13" fontWeight="black" textAnchor="middle">a</text>

            <text x="18" y="78" fill="#064e3b" fontSize="12" fontWeight="black" textAnchor="middle">
              Kocka (minden él = a)
            </text>
          </g>

          {/* Jobb: Kiterített T-alakú testháló 6 négyzettel */}
          <g transform="translate(370, 115)">
            {/* 4 függőleges négyzet (méret: 36x36) */}
            {/* 1. felső */}
            <rect x="0" y="-72" width="38" height="38" fill="#d1fae5" stroke="#059669" strokeWidth="1.8" />
            <text x="19" y="-48" fill="#065f46" fontSize="11" fontWeight="bold" textAnchor="middle">a²</text>

            {/* 2. második */}
            <rect x="0" y="-34" width="38" height="38" fill="#a7f3d0" stroke="#059669" strokeWidth="1.8" />
            <text x="19" y="-10" fill="#065f46" fontSize="11" fontWeight="bold" textAnchor="middle">a²</text>

            {/* 3. harmadik */}
            <rect x="0" y="4" width="38" height="38" fill="#d1fae5" stroke="#059669" strokeWidth="1.8" />
            <text x="19" y="28" fill="#065f46" fontSize="11" fontWeight="bold" textAnchor="middle">a²</text>

            {/* 4. alsó */}
            <rect x="0" y="42" width="38" height="38" fill="#a7f3d0" stroke="#059669" strokeWidth="1.8" />
            <text x="19" y="66" fill="#065f46" fontSize="11" fontWeight="bold" textAnchor="middle">a²</text>

            {/* Bal oldallap a 2. sor mellett */}
            <rect x="-38" y="-34" width="38" height="38" fill="#6ee7b7" stroke="#059669" strokeWidth="1.8" />
            <text x="-19" y="-10" fill="#065f46" fontSize="11" fontWeight="bold" textAnchor="middle">a²</text>

            {/* Jobb oldallap a 2. sor mellett */}
            <rect x="38" y="-34" width="38" height="38" fill="#6ee7b7" stroke="#059669" strokeWidth="1.8" />
            <text x="57" y="-10" fill="#065f46" fontSize="11" fontWeight="bold" textAnchor="middle">a²</text>

            {/* Számítási összefoglaló kártya mellette */}
            <g transform="translate(100, -50)">
              <rect x="0" y="0" width="120" height="110" rx="8" fill="#f0fdf4" stroke="#a7f3d0" strokeWidth="1.5" />
              <text x="10" y="20" fill="#166534" fontSize="10" fontWeight="bold">1 lap területe:</text>
              <text x="10" y="36" fill="#059669" fontSize="12" fontWeight="black">T = a²</text>
              <line x1="10" y1="46" x2="110" y2="46" stroke="#bbf7d0" strokeWidth="1" />
              <text x="10" y="64" fill="#166534" fontSize="10" fontWeight="bold">6 egyenlő lap:</text>
              <text x="10" y="86" fill="#047857" fontSize="15" fontWeight="black">A = 6 · a²</text>
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
};

/**
 * 3. Téglatest felszíne és testhálója (3 pár egybevágó lap: A = 2(ab + ac + bc))
 */
export const CuboidSurfaceAreaNetSvg: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-center p-4 rounded-2xl bg-white dark:bg-slate-900 border border-indigo-200 dark:border-indigo-900/60 shadow-xs">
      <div className="text-center mb-2">
        <span className="text-xs font-bold text-indigo-900 dark:text-indigo-300 uppercase tracking-wider">
          A téglatest felszíne: 3 lap-pár • A = 2 · (a·b + a·c + b·c)
        </span>
      </div>
      <div className="w-full max-w-[680px]">
        <svg viewBox="0 0 660 260" className="w-full h-auto drop-shadow-xs">
          {/* Bal: 3D Téglatest színes lapokkal */}
          <g transform="translate(120, 130)">
            {/* Előlap: a x c (lila) */}
            <polygon points="-55,20 25,60 25,-20 -55,-60" fill="#e9d5ff" stroke="#9333ea" strokeWidth="2" />
            <text x="-15" y="5" fill="#6b21a8" fontSize="11" fontWeight="bold">a · c</text>

            {/* Jobb oldallap: b x c (türkiz) */}
            <polygon points="25,60 85,25 85,-55 25,-20" fill="#99f6e4" stroke="#0d9488" strokeWidth="2" />
            <text x="55" y="8" fill="#115e59" fontSize="11" fontWeight="bold">b · c</text>

            {/* Tetőlap: a x b (kék) */}
            <polygon points="-55,-60 25,-20 85,-55 5,-95" fill="#bae6fd" stroke="#0284c7" strokeWidth="2" />
            <text x="15" y="-55" fill="#0369a1" fontSize="11" fontWeight="bold">a · b</text>

            {/* Élhossz feliratok */}
            <text x="-20" y="60" fill="#1e1b4b" fontSize="12" fontWeight="black">a</text>
            <text x="65" y="55" fill="#1e1b4b" fontSize="12" fontWeight="black">b</text>
            <text x="-65" y="-15" fill="#1e1b4b" fontSize="12" fontWeight="black">c</text>

            <text x="15" y="88" fill="#1e1b4b" fontSize="12" fontWeight="black" textAnchor="middle">
              3 él: a (hossz), b (szél.), c (mag.)
            </text>
          </g>

          {/* Jobb: Színkódolt testháló 3 párral */}
          <g transform="translate(370, 115)">
            {/* Oszlop 4 lap:
                1. Fedőlap: a x b (kék)
                2. Hátlap: a x c (lila)
                3. Alaplap: a x b (kék)
                4. Előlap: a x c (lila)
            */}
            {/* a = 60px, b = 35px, c = 40px */}
            <rect x="0" y="-85" width="60" height="35" fill="#bae6fd" stroke="#0284c7" strokeWidth="1.5" />
            <text x="30" y="-63" fill="#0369a1" fontSize="10" fontWeight="bold" textAnchor="middle">a · b (tető)</text>

            <rect x="0" y="-50" width="60" height="40" fill="#e9d5ff" stroke="#9333ea" strokeWidth="1.5" />
            <text x="30" y="-25" fill="#6b21a8" fontSize="10" fontWeight="bold" textAnchor="middle">a · c (hát)</text>

            <rect x="0" y="-10" width="60" height="35" fill="#bae6fd" stroke="#0284c7" strokeWidth="1.5" />
            <text x="30" y="12" fill="#0369a1" fontSize="10" fontWeight="bold" textAnchor="middle">a · b (alap)</text>

            <rect x="0" y="25" width="60" height="40" fill="#e9d5ff" stroke="#9333ea" strokeWidth="1.5" />
            <text x="30" y="50" fill="#6b21a8" fontSize="10" fontWeight="bold" textAnchor="middle">a · c (elöl)</text>

            {/* Bal és jobb oldallap: b x c (türkiz) az alaplap mellett */}
            <rect x="-35" y="-10" width="35" height="35" fill="#99f6e4" stroke="#0d9488" strokeWidth="1.5" />
            <text x="-17" y="12" fill="#115e59" fontSize="9" fontWeight="bold" textAnchor="middle">b · c</text>

            <rect x="60" y="-10" width="35" height="35" fill="#99f6e4" stroke="#0d9488" strokeWidth="1.5" />
            <text x="77" y="12" fill="#115e59" fontSize="9" fontWeight="bold" textAnchor="middle">b · c</text>

            {/* Magyarázat doboz mellette */}
            <g transform="translate(125, -70)">
              <rect x="0" y="0" width="155" height="145" rx="10" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.2" />
              <text x="12" y="22" fill="#1e293b" fontSize="11" fontWeight="bold">3 pár egybevágó lap:</text>

              <g transform="translate(12, 32)">
                <rect x="0" y="0" width="12" height="12" fill="#bae6fd" stroke="#0284c7" />
                <text x="18" y="10" fill="#0369a1" fontSize="10" fontWeight="bold">2 db a · b (alap+fedél)</text>
              </g>

              <g transform="translate(12, 54)">
                <rect x="0" y="0" width="12" height="12" fill="#e9d5ff" stroke="#9333ea" />
                <text x="18" y="10" fill="#6b21a8" fontSize="10" fontWeight="bold">2 db a · c (elöl+hátul)</text>
              </g>

              <g transform="translate(12, 76)">
                <rect x="0" y="0" width="12" height="12" fill="#99f6e4" stroke="#0d9488" />
                <text x="18" y="10" fill="#115e59" fontSize="10" fontWeight="bold">2 db b · c (bal+jobb)</text>
              </g>

              <line x1="12" y1="98" x2="143" y2="98" stroke="#cbd5e1" strokeWidth="1" />
              <text x="12" y="116" fill="#1e1b4b" fontSize="9" fontWeight="bold">FELSZÍN KÉPLETE:</text>
              <text x="12" y="133" fill="#4338ca" fontSize="12" fontWeight="black">A = 2(ab + ac + bc)</text>
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
};

/**
 * 4. Egyenes hasáb felszíne (A = 2 · Ta + Ka · m)
 */
export const TriangularPrismSurfaceAreaSvg: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-center p-4 rounded-2xl bg-white dark:bg-slate-900 border border-purple-200 dark:border-purple-900/60 shadow-xs">
      <div className="text-center mb-2">
        <span className="text-xs font-bold text-purple-900 dark:text-purple-300 uppercase tracking-wider">
          Egyenes hasáb felszíne: 2 Alaplap + Palást • A = 2 · T_a + K_a · m
        </span>
      </div>
      <div className="w-full max-w-[660px]">
        <svg viewBox="0 0 620 230" className="w-full h-auto drop-shadow-xs">
          {/* Bal: 3D Háromoldalú Hasáb */}
          <g transform="translate(100, 115)">
            {/* Alsó alap háromszög */}
            <polygon points="-40,50 40,50 0,20" fill="#d8b4fe" stroke="#7e22ce" strokeWidth="1.5" />
            {/* Felső alap háromszög */}
            <polygon points="-40,-50 40,-50 0,-80" fill="#d8b4fe" stroke="#7e22ce" strokeWidth="1.8" />
            {/* Oldallapok */}
            <polygon points="-40,50 40,50 40,-50 -40,-50" fill="#f3e8ff" stroke="#9333ea" strokeWidth="2" />
            <polygon points="40,50 0,20 0,-80 40,-50" fill="#e9d5ff" stroke="#7e22ce" strokeWidth="1.5" />

            <text x="0" y="0" fill="#6b21a8" fontSize="11" fontWeight="bold" textAnchor="middle">Palást</text>
            <text x="0" y="-62" fill="#581c87" fontSize="10" fontWeight="bold" textAnchor="middle">T_alap</text>
            <text x="0" y="38" fill="#581c87" fontSize="10" fontWeight="bold" textAnchor="middle">T_alap</text>

            <line x1="-55" y1="-50" x2="-55" y2="50" stroke="#7e22ce" strokeWidth="1.5" />
            <text x="-62" y="5" fill="#7e22ce" fontSize="11" fontWeight="bold" textAnchor="end">m</text>
          </g>

          {/* Jobb: Kiterített Palást (1 nagy téglalap) + 2 háromszög alap */}
          <g transform="translate(240, 115)">
            {/* Palást kiterítve: szélesség = Ka (a + b + c), magasság = m */}
            {/* 3 rész-téglalap egymás mellett: a=65, b=50, c=80, magasság m=70 */}
            <rect x="0" y="-35" width="65" height="70" fill="#f3e8ff" stroke="#9333ea" strokeWidth="1.5" />
            <text x="32" y="5" fill="#6b21a8" fontSize="10" fontWeight="bold" textAnchor="middle">a · m</text>
            <text x="32" y="48" fill="#6b21a8" fontSize="10" textAnchor="middle">a</text>

            <rect x="65" y="-35" width="50" height="70" fill="#e9d5ff" stroke="#9333ea" strokeWidth="1.5" />
            <text x="90" y="5" fill="#6b21a8" fontSize="10" fontWeight="bold" textAnchor="middle">b · m</text>
            <text x="90" y="48" fill="#6b21a8" fontSize="10" textAnchor="middle">b</text>

            <rect x="115" y="-35" width="80" height="70" fill="#fae8ff" stroke="#9333ea" strokeWidth="1.5" />
            <text x="155" y="5" fill="#6b21a8" fontSize="10" fontWeight="bold" textAnchor="middle">c · m</text>
            <text x="155" y="48" fill="#6b21a8" fontSize="10" textAnchor="middle">c</text>

            {/* Felső és alsó háromszög alaplap a középső téglalaphoz illesztve */}
            <polygon points="65,-35 115,-35 80,-75" fill="#d8b4fe" stroke="#7e22ce" strokeWidth="1.8" />
            <text x="86" y="-48" fill="#4c1d95" fontSize="10" fontWeight="bold" textAnchor="middle">T_alap</text>

            <polygon points="65,35 115,35 80,75" fill="#d8b4fe" stroke="#7e22ce" strokeWidth="1.8" />
            <text x="86" y="56" fill="#4c1d95" fontSize="10" fontWeight="bold" textAnchor="middle">T_alap</text>

            {/* Alsó kapocs a teljes palást szélességéhez: Ka = a + b + c */}
            <line x1="0" y1="62" x2="195" y2="62" stroke="#4c1d95" strokeWidth="1.5" />
            <text x="97" y="76" fill="#4c1d95" fontSize="11" fontWeight="black" textAnchor="middle">
              K_alap = a + b + c (a palást teljes szélessége)
            </text>

            {/* Magasság méretvonal jobb szélen */}
            <line x1="205" y1="-35" x2="205" y2="35" stroke="#7e22ce" strokeWidth="1.5" />
            <text x="215" y="5" fill="#7e22ce" fontSize="11" fontWeight="bold">m</text>
          </g>

          {/* Képlet kártya jobb oldalon */}
          <g transform="translate(485, 45)">
            <rect x="0" y="0" width="125" height="135" rx="8" fill="#faf5ff" stroke="#d8b4fe" strokeWidth="1.5" />
            <text x="10" y="20" fill="#581c87" fontSize="10" fontWeight="bold">Alapszabály:</text>
            <text x="10" y="40" fill="#7e22ce" fontSize="11" fontWeight="black">A = 2·T_a + T_p</text>
            <line x1="10" y1="50" x2="115" y2="50" stroke="#e9d5ff" strokeWidth="1" />
            <text x="10" y="68" fill="#581c87" fontSize="10" fontWeight="bold">Palást területe:</text>
            <text x="10" y="86" fill="#7e22ce" fontSize="11" fontWeight="black">T_p = K_a · m</text>
            <line x1="10" y1="96" x2="115" y2="96" stroke="#e9d5ff" strokeWidth="1" />
            <text x="10" y="112" fill="#15803d" fontSize="9" fontWeight="bold">VÉGEREDMÉNY:</text>
            <text x="10" y="127" fill="#15803d" fontSize="11" fontWeight="black">2·T_a + K_a·m</text>
          </g>
        </svg>
      </div>
    </div>
  );
};

/**
 * 5. Kockák összeragasztásának csapdája (12 - 2 = 10 határoló lap marad)
 */
export const GluedCubesSurfaceAreaSvg: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-center p-4 rounded-2xl bg-white dark:bg-slate-900 border border-rose-200 dark:border-rose-900/60 shadow-xs">
      <div className="text-center mb-2">
        <span className="text-xs font-black uppercase tracking-wider text-rose-900 dark:text-rose-300">
          Tipikus csapda: Két kocka összeragasztása • 12 lap helyett csak 10 lap!
        </span>
      </div>
      <div className="w-full max-w-[560px]">
        <svg viewBox="0 0 520 200" className="w-full h-auto drop-shadow-xs">
          {/* Bal: Két különálló kocka (6 + 6 = 12 lap) */}
          <g transform="translate(80, 95)">
            {/* 1. kocka */}
            <polygon points="-50,10 0,35 0,-25 -50,-50" fill="#fed7aa" stroke="#ea580c" strokeWidth="1.5" />
            <polygon points="0,35 40,15 40,-45 0,-25" fill="#fdba74" stroke="#c2410c" strokeWidth="1.5" />
            <polygon points="-50,-50 0,-25 40,-45 -10,-70" fill="#ffedd5" stroke="#ea580c" strokeWidth="1.5" />

            <text x="-5" y="55" fill="#9a3412" fontSize="11" fontWeight="bold" textAnchor="middle">
              1. Kocka (6 lap)
            </text>
          </g>

          <text x="145" y="95" fill="#ea580c" fontSize="24" fontWeight="black" textAnchor="middle">+</text>

          <g transform="translate(210, 95)">
            {/* 2. kocka */}
            <polygon points="-50,10 0,35 0,-25 -50,-50" fill="#fed7aa" stroke="#ea580c" strokeWidth="1.5" />
            <polygon points="0,35 40,15 40,-45 0,-25" fill="#fdba74" stroke="#c2410c" strokeWidth="1.5" />
            <polygon points="-50,-50 0,-25 40,-45 -10,-70" fill="#ffedd5" stroke="#ea580c" strokeWidth="1.5" />

            <text x="-5" y="55" fill="#9a3412" fontSize="11" fontWeight="bold" textAnchor="middle">
              2. Kocka (6 lap)
            </text>
          </g>

          {/* Jobbra mutató nyíl: Összeragasztás */}
          <g transform="translate(275, 90)">
            <path d="M 0 0 L 30 0" stroke="#dc2626" strokeWidth="2.5" />
            <polygon points="30,-5 40,0 30,5" fill="#dc2626" />
            <text x="20" y="-10" fill="#dc2626" fontSize="10" fontWeight="bold" textAnchor="middle">Ragasztás</text>
          </g>

          {/* Jobb: Együtt a test, ragasztási felület pirossal szaggatva kiemelve */}
          <g transform="translate(390, 95)">
            {/* Összeragasztott test: 2 kocka hosszan */}
            <polygon points="-60,10 40,60 40,-20 -60,-70" fill="#fed7aa" stroke="#ea580c" strokeWidth="1.5" />
            <polygon points="40,60 85,35 85,-45 40,-20" fill="#fdba74" stroke="#c2410c" strokeWidth="1.5" />
            <polygon points="-60,-70 40,-20 85,-45 -15,-95" fill="#ffedd5" stroke="#ea580c" strokeWidth="1.5" />

            {/* Belső találkozási él és árnyékolt ragasztási felület */}
            <polygon points="-10,35 35,10 35,-70 -10,-45" fill="#ef4444" fillOpacity="0.4" stroke="#dc2626" strokeWidth="2" strokeDasharray="3,3" />

            <text x="12" y="75" fill="#991b1b" fontSize="11" fontWeight="black" textAnchor="middle">
              2 belső lap elrejtve!
            </text>
            <text x="12" y="90" fill="#15803d" fontSize="12" fontWeight="black" textAnchor="middle">
              A = 12 - 2 = 10 · a²
            </text>
          </g>
        </svg>
      </div>
    </div>
  );
};
