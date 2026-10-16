import React from 'react';

/**
 * 1. A kerület alapfogalma: Sokszög körüljárása mérőszalaggal
 */
export const PerimeterConceptSvg: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-center p-4 rounded-2xl bg-white dark:bg-slate-900 border border-blue-200 dark:border-blue-900/60 shadow-xs">
      <div className="text-center mb-2">
        <span className="text-xs font-bold text-blue-900 dark:text-blue-300 uppercase tracking-wider">
          A kerület szemlélete: Körbejárás a határvonal mentén
        </span>
      </div>
      <div className="w-full max-w-[560px]">
        <svg viewBox="0 0 540 240" className="w-full h-auto drop-shadow-xs">
          <defs>
            <marker id="periArrow" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto">
              <polygon points="0 0, 6 3, 0 6" fill="#2563eb" />
            </marker>
          </defs>

          {/* Ötszög alakzat: A(60, 180), B(240, 200), C(310, 100), D(190, 40), E(70, 80) */}
          {/* Belső kitöltés */}
          <polygon
            points="60,180 240,200 310,100 190,40 70,80"
            fill="#dbeafe"
            fillOpacity="0.4"
            stroke="#93c5fd"
            strokeWidth="2"
          />

          {/* Kerület szalag / határoló vonal nyilakkal */}
          {/* A -> B (a) */}
          <line x1="60" y1="180" x2="240" y2="200" stroke="#2563eb" strokeWidth="3" markerEnd="url(#periArrow)" />
          <text x="145" y="210" fill="#1d4ed8" fontSize="13" fontWeight="bold">a oldal</text>

          {/* B -> C (b) */}
          <line x1="240" y1="200" x2="310" y2="100" stroke="#2563eb" strokeWidth="3" markerEnd="url(#periArrow)" />
          <text x="290" y="160" fill="#1d4ed8" fontSize="13" fontWeight="bold">b oldal</text>

          {/* C -> D (c) */}
          <line x1="310" y1="100" x2="190" y2="40" stroke="#2563eb" strokeWidth="3" markerEnd="url(#periArrow)" />
          <text x="255" y="60" fill="#1d4ed8" fontSize="13" fontWeight="bold">c oldal</text>

          {/* D -> E (d) */}
          <line x1="190" y1="40" x2="70" y2="80" stroke="#2563eb" strokeWidth="3" markerEnd="url(#periArrow)" />
          <text x="125" y="50" fill="#1d4ed8" fontSize="13" fontWeight="bold">d oldal</text>

          {/* E -> A (e) */}
          <line x1="70" y1="80" x2="60" y2="180" stroke="#2563eb" strokeWidth="3" markerEnd="url(#periArrow)" />
          <text x="40" y="135" fill="#1d4ed8" fontSize="13" fontWeight="bold">e</text>

          {/* Csúcsok pontjai és betűi */}
          {[
            { x: 60, y: 180, label: 'A', lx: 45, ly: 195 },
            { x: 240, y: 200, label: 'B', lx: 250, ly: 215 },
            { x: 310, y: 100, label: 'C', lx: 325, ly: 105 },
            { x: 190, y: 40, label: 'D', lx: 190, ly: 25 },
            { x: 70, y: 80, label: 'E', lx: 52, ly: 75 }
          ].map((pt) => (
            <g key={pt.label}>
              <circle cx={pt.x} cy={pt.y} r="5" fill="#1d4ed8" stroke="#ffffff" strokeWidth="1.5" />
              <text x={pt.lx} y={pt.ly} fill="#1e293b" fontSize="12" fontWeight="bold">
                {pt.label}
              </text>
            </g>
          ))}

          {/* Jobb oldali magyarázat kártya */}
          <g transform="translate(345, 30)">
            <rect x="0" y="0" width="180" height="175" rx="12" fill="#eff6ff" stroke="#bfdbfe" strokeWidth="1.5" />
            <text x="14" y="24" fill="#1e3a8a" fontSize="12" fontWeight="bold">Kerület képlete:</text>
            
            <g transform="translate(14, 35)">
              <rect x="0" y="0" width="152" height="32" rx="6" fill="#dbeafe" />
              <text x="76" y="21" fill="#1e40af" fontSize="13" fontWeight="black" textAnchor="middle">
                K = a + b + c + d + e
              </text>
            </g>

            <text x="14" y="90" fill="#334155" fontSize="11" fontWeight="bold">Gondolj rá úgy, mint:</text>
            <text x="14" y="108" fill="#475569" fontSize="10">• egy kerítés hosszára</text>
            <text x="14" y="124" fill="#475569" fontSize="10">• körbefutott távolságra</text>
            <text x="14" y="140" fill="#475569" fontSize="10">• körbetekert zsinórra</text>

            <line x1="14" y1="148" x2="166" y2="148" stroke="#bfdbfe" strokeWidth="1" />
            <text x="14" y="164" fill="#047857" fontSize="10" fontWeight="bold">
              Mértékegység: mm, cm, m
            </text>
          </g>
        </svg>
      </div>
    </div>
  );
};

/**
 * 2. Háromszögek kerülete: Általános, Egyenlő szárú, Szabályos
 */
export const TrianglePerimetersSvg: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-center p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
      <div className="text-center mb-3">
        <span className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
          Háromszögek kerületszámítása típusok szerint
        </span>
      </div>
      <div className="w-full max-w-[700px]">
        <svg viewBox="0 0 680 200" className="w-full h-auto drop-shadow-xs">
          {/* 1. Általános háromszög (balra) */}
          <g transform="translate(10, 10)">
            <rect x="0" y="0" width="205" height="180" rx="10" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
            <text x="102" y="22" fill="#334155" fontSize="11" fontWeight="bold" textAnchor="middle">
              Általános háromszög
            </text>

            {/* Háromszög csúcsok: (30, 130), (175, 130), (75, 45) */}
            <polygon points="30,130 175,130 75,45" fill="#e2e8f0" stroke="#475569" strokeWidth="2" />
            {/* Oldalak */}
            <text x="102" y="146" fill="#0f172a" fontSize="11" fontWeight="bold" textAnchor="middle">a</text>
            <text x="135" y="85" fill="#0f172a" fontSize="11" fontWeight="bold">b</text>
            <text x="42" y="85" fill="#0f172a" fontSize="11" fontWeight="bold">c</text>

            <rect x="15" y="152" width="175" height="22" rx="5" fill="#e2e8f0" />
            <text x="102" y="167" fill="#1e293b" fontSize="11" fontWeight="black" textAnchor="middle">
              K = a + b + c
            </text>
          </g>

          {/* 2. Egyenlő szárú háromszög (középen) */}
          <g transform="translate(235, 10)">
            <rect x="0" y="0" width="205" height="180" rx="10" fill="#eef2ff" stroke="#c7d2fe" strokeWidth="1.5" />
            <text x="102" y="22" fill="#3730a3" fontSize="11" fontWeight="bold" textAnchor="middle">
              Egyenlő szárú háromszög
            </text>

            {/* Háromszög: (35, 130), (170, 130), (102, 45) */}
            <polygon points="35,130 170,130 102,45" fill="#e0e7ff" stroke="#4f46e5" strokeWidth="2" />
            
            {/* Két szár jelölése rovátkával */}
            <line x1="65" y1="83" x2="72" y2="92" stroke="#4f46e5" strokeWidth="2" />
            <line x1="139" y1="83" x2="132" y2="92" stroke="#4f46e5" strokeWidth="2" />

            <text x="102" y="146" fill="#312e81" fontSize="11" fontWeight="bold" textAnchor="middle">a (alap)</text>
            <text x="142" y="85" fill="#4338ca" fontSize="11" fontWeight="bold">b (szár)</text>
            <text x="48" y="85" fill="#4338ca" fontSize="11" fontWeight="bold">b (szár)</text>

            <rect x="15" y="152" width="175" height="22" rx="5" fill="#c7d2fe" />
            <text x="102" y="167" fill="#312e81" fontSize="11" fontWeight="black" textAnchor="middle">
              K = a + 2 · b
            </text>
          </g>

          {/* 3. Szabályos háromszög (jobbra) */}
          <g transform="translate(460, 10)">
            <rect x="0" y="0" width="205" height="180" rx="10" fill="#ecfdf5" stroke="#a7f3d0" strokeWidth="1.5" />
            <text x="102" y="22" fill="#065f46" fontSize="11" fontWeight="bold" textAnchor="middle">
              Szabályos (egyenlő oldalú)
            </text>

            {/* Szabályos háromszög: (40, 130), (165, 130), (102, 40) */}
            <polygon points="40,130 165,130 102,40" fill="#d1fae5" stroke="#059669" strokeWidth="2" />

            {/* Három rovátka a 3 egyenlő oldalra */}
            <line x1="99" y1="126" x2="105" y2="134" stroke="#059669" strokeWidth="2" />
            <line x1="68" y1="80" x2="75" y2="87" stroke="#059669" strokeWidth="2" />
            <line x1="136" y1="80" x2="129" y2="87" stroke="#059669" strokeWidth="2" />

            <text x="102" y="146" fill="#064e3b" fontSize="11" fontWeight="bold" textAnchor="middle">a</text>
            <text x="140" y="85" fill="#064e3b" fontSize="11" fontWeight="bold">a</text>
            <text x="56" y="85" fill="#064e3b" fontSize="11" fontWeight="bold">a</text>

            <rect x="15" y="152" width="175" height="22" rx="5" fill="#a7f3d0" />
            <text x="102" y="167" fill="#064e3b" fontSize="11" fontWeight="black" textAnchor="middle">
              K = 3 · a &nbsp; (a = K : 3)
            </text>
          </g>
        </svg>
      </div>
    </div>
  );
};

/**
 * 3. Négyszögek kerülete: Téglalap, Négyzet, Rombusz, Paralelogramma, Deltoid
 */
export const QuadrilateralPerimetersSvg: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-center p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
      <div className="text-center mb-3">
        <span className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
          Gyakori négyszögek kerületképletei
        </span>
      </div>
      <div className="w-full max-w-[740px]">
        <svg viewBox="0 0 720 280" className="w-full h-auto drop-shadow-xs">
          {/* 1. Téglalap */}
          <g transform="translate(15, 10)">
            <rect x="0" y="0" width="220" height="125" rx="8" fill="#f0f9ff" stroke="#bae6fd" strokeWidth="1.2" />
            <text x="110" y="18" fill="#0369a1" fontSize="11" fontWeight="bold" textAnchor="middle">
              Téglalap
            </text>
            <rect x="30" y="32" width="110" height="55" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
            {/* Oldalak */}
            <text x="85" y="100" fill="#0369a1" fontSize="11" fontWeight="bold" textAnchor="middle">a</text>
            <text x="146" y="64" fill="#0369a1" fontSize="11" fontWeight="bold">b</text>
            <rect x="10" y="105" width="200" height="16" rx="4" fill="#bae6fd" />
            <text x="110" y="117" fill="#0c4a6e" fontSize="10" fontWeight="black" textAnchor="middle">
              K = 2 · (a + b) = 2a + 2b
            </text>
          </g>

          {/* 2. Négyzet */}
          <g transform="translate(250, 10)">
            <rect x="0" y="0" width="220" height="125" rx="8" fill="#fefce8" stroke="#fef08a" strokeWidth="1.2" />
            <text x="110" y="18" fill="#a16207" fontSize="11" fontWeight="bold" textAnchor="middle">
              Négyzet (4 egyenlő oldal)
            </text>
            <rect x="55" y="30" width="60" height="60" fill="#fef9c3" stroke="#eab308" strokeWidth="2" />
            <text x="85" y="102" fill="#854d0e" fontSize="11" fontWeight="bold" textAnchor="middle">a</text>
            <text x="122" y="65" fill="#854d0e" fontSize="11" fontWeight="bold">a</text>
            <rect x="10" y="105" width="200" height="16" rx="4" fill="#fef08a" />
            <text x="110" y="117" fill="#713f12" fontSize="10" fontWeight="black" textAnchor="middle">
              K = 4 · a &nbsp; (a = K : 4)
            </text>
          </g>

          {/* 3. Rombusz */}
          <g transform="translate(485, 10)">
            <rect x="0" y="0" width="220" height="125" rx="8" fill="#fdf4ff" stroke="#f5d0fe" strokeWidth="1.2" />
            <text x="110" y="18" fill="#a21caf" fontSize="11" fontWeight="bold" textAnchor="middle">
              Rombusz (4 egyenlő oldal)
            </text>
            <polygon points="110,30 155,60 110,90 65,60" fill="#fae8ff" stroke="#c026d3" strokeWidth="2" />
            <text x="140" y="44" fill="#86198f" fontSize="10" fontWeight="bold">a</text>
            <text x="140" y="82" fill="#86198f" fontSize="10" fontWeight="bold">a</text>
            <rect x="10" y="105" width="200" height="16" rx="4" fill="#f5d0fe" />
            <text x="110" y="117" fill="#701a75" fontSize="10" fontWeight="black" textAnchor="middle">
              K = 4 · a
            </text>
          </g>

          {/* 4. Paralelogramma */}
          <g transform="translate(15, 145)">
            <rect x="0" y="0" width="220" height="125" rx="8" fill="#f0fdf4" stroke="#bbf7d0" strokeWidth="1.2" />
            <text x="110" y="18" fill="#15803d" fontSize="11" fontWeight="bold" textAnchor="middle">
              Paralelogramma
            </text>
            <polygon points="55,35 155,35 125,85 25,85" fill="#dcfce7" stroke="#16a34a" strokeWidth="2" />
            <text x="75" y="98" fill="#14532d" fontSize="11" fontWeight="bold" textAnchor="middle">a</text>
            <text x="147" y="65" fill="#14532d" fontSize="11" fontWeight="bold">b</text>
            <rect x="10" y="105" width="200" height="16" rx="4" fill="#bbf7d0" />
            <text x="110" y="117" fill="#14532d" fontSize="10" fontWeight="black" textAnchor="middle">
              K = 2 · (a + b)
            </text>
          </g>

          {/* 5. Deltoid */}
          <g transform="translate(250, 145)">
            <rect x="0" y="0" width="220" height="125" rx="8" fill="#fff7ed" stroke="#fed7aa" strokeWidth="1.2" />
            <text x="110" y="18" fill="#c2410c" fontSize="11" fontWeight="bold" textAnchor="middle">
              Deltoid (2 pár egyenlő oldal)
            </text>
            <polygon points="110,28 150,55 110,95 70,55" fill="#ffedd5" stroke="#ea580c" strokeWidth="2" />
            <text x="136" y="40" fill="#9a3412" fontSize="10" fontWeight="bold">a</text>
            <text x="80" y="40" fill="#9a3412" fontSize="10" fontWeight="bold">a</text>
            <text x="136" y="80" fill="#9a3412" fontSize="10" fontWeight="bold">b</text>
            <text x="80" y="80" fill="#9a3412" fontSize="10" fontWeight="bold">b</text>
            <rect x="10" y="105" width="200" height="16" rx="4" fill="#fed7aa" />
            <text x="110" y="117" fill="#7c2d12" fontSize="10" fontWeight="black" textAnchor="middle">
              K = 2 · (a + b)
            </text>
          </g>

          {/* 6. Általános Trapéz */}
          <g transform="translate(485, 145)">
            <rect x="0" y="0" width="220" height="125" rx="8" fill="#faf5ff" stroke="#e9d5ff" strokeWidth="1.2" />
            <text x="110" y="18" fill="#7e22ce" fontSize="11" fontWeight="bold" textAnchor="middle">
              Trapéz (párhuzamos alapok)
            </text>
            <polygon points="65,35 145,35 165,85 40,85" fill="#f3e8ff" stroke="#9333ea" strokeWidth="2" />
            <text x="102" y="98" fill="#581c87" fontSize="11" fontWeight="bold" textAnchor="middle">a (hosszabb alap)</text>
            <text x="105" y="30" fill="#581c87" fontSize="10" fontWeight="bold" textAnchor="middle">c (rövidebb alap)</text>
            <text x="44" y="65" fill="#581c87" fontSize="10" fontWeight="bold">d</text>
            <text x="158" y="65" fill="#581c87" fontSize="10" fontWeight="bold">b</text>
            <rect x="10" y="105" width="200" height="16" rx="4" fill="#e9d5ff" />
            <text x="110" y="117" fill="#581c87" fontSize="10" fontWeight="black" textAnchor="middle">
              K = a + b + c + d
            </text>
          </g>
        </svg>
      </div>
    </div>
  );
};

/**
 * 4. Félkerület és Hiányzó oldal visszaszámolása
 */
export const HalfPerimeterMissingSideSvg: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-center p-4 rounded-2xl bg-gradient-to-r from-blue-50/60 via-indigo-50/50 to-purple-50/60 dark:from-slate-900 dark:via-blue-950/20 dark:to-slate-900 border border-blue-200 dark:border-blue-900/60 shadow-xs">
      <div className="text-center mb-2">
        <span className="text-xs font-black uppercase tracking-wider text-blue-900 dark:text-blue-300">
          Trükkös feladat: Hiányzó oldal kiszámítása a félkerületből (K : 2)
        </span>
      </div>
      <div className="w-full max-w-[560px]">
        <svg viewBox="0 0 520 220" className="w-full h-auto drop-shadow-xs">
          {/* Téglalap (Kék L-alak vs Szürke L-alak) */}
          <g transform="translate(40, 40)">
            {/* Teljes háttér téglalap */}
            <rect x="0" y="0" width="160" height="90" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4,4" />

            {/* Kiemelt "Félkerület" L alak: felső 'a' él és jobb 'b' él */}
            <polyline points="0,0 160,0 160,90" fill="none" stroke="#2563eb" strokeWidth="4" />

            {/* Méretek */}
            <text x="80" y="-10" fill="#1d4ed8" fontSize="13" fontWeight="bold" textAnchor="middle">
              a = 8 cm
            </text>
            <text x="175" y="48" fill="#dc2626" fontSize="13" fontWeight="bold">
              b = ?
            </text>

            {/* Szemközti oldalak halványan */}
            <polyline points="160,90 0,90 0,0" fill="none" stroke="#94a3b8" strokeWidth="2" strokeDasharray="3,3" />
            <text x="80" y="108" fill="#64748b" fontSize="10" textAnchor="middle">
              a = 8 cm (másik fele)
            </text>
            <text x="-25" y="48" fill="#64748b" fontSize="10">
              b
            </text>
          </g>

          {/* Jobb oldali levezetés */}
          <g transform="translate(250, 25)">
            <rect x="0" y="0" width="240" height="170" rx="10" fill="#ffffff" stroke="#bfdbfe" strokeWidth="1.5" />
            <text x="15" y="24" fill="#1e3a8a" fontSize="12" fontWeight="bold">
              Példa: K = 28 cm, a = 8 cm ⟹ b = ?
            </text>

            <g transform="translate(15, 38)">
              {/* 1. Lépés: Félkerület */}
              <rect x="0" y="0" width="210" height="36" rx="6" fill="#eff6ff" />
              <text x="10" y="16" fill="#1d4ed8" fontSize="10" fontWeight="bold">1. Lépés: Felezd meg a kerületet!</text>
              <text x="10" y="29" fill="#1e40af" fontSize="11" fontWeight="black">a + b = K : 2 = 28 : 2 = 14 cm</text>
            </g>

            <g transform="translate(15, 82)">
              {/* 2. Lépés: Kivonás */}
              <rect x="0" y="0" width="210" height="36" rx="6" fill="#fef2f2" />
              <text x="10" y="16" fill="#b91c1c" fontSize="10" fontWeight="bold">2. Lépés: Vond ki az ismert oldalt!</text>
              <text x="10" y="29" fill="#991b1b" fontSize="11" fontWeight="black">b = 14 - 8 = 6 cm</text>
            </g>

            <g transform="translate(15, 126)">
              {/* Ellenőrzés */}
              <rect x="0" y="0" width="210" height="32" rx="6" fill="#f0fdf4" />
              <text x="10" y="20" fill="#166534" fontSize="11" fontWeight="bold">
                ✓ Ellenőrzés: 2 · (8 + 6) = 28 cm
              </text>
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
};
