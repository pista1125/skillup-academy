import React from 'react';

/**
 * 1. 1D vs 2D vs 3D Dimenziók és Mértékegység Váltószámok Összefoglalása
 */
export const DimensionsComparisonSvg: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-center p-4 rounded-2xl bg-white dark:bg-slate-900 border border-indigo-200 dark:border-indigo-900/60 shadow-xs">
      <div className="text-center mb-3">
        <span className="text-xs font-bold text-indigo-900 dark:text-indigo-300 uppercase tracking-wider">
          A geometriai dimenziók összehasonlító térképe (1D • 2D • 3D)
        </span>
      </div>
      <div className="w-full max-w-[720px]">
        <svg viewBox="0 0 700 230" className="w-full h-auto drop-shadow-xs">
          {/* 1. Kártya: 1D Hosszúság / Kerület */}
          <g transform="translate(15, 10)">
            <rect x="0" y="0" width="210" height="205" rx="12" fill="#eff6ff" stroke="#93c5fd" strokeWidth="1.5" />
            <text x="105" y="24" fill="#1e40af" fontSize="12" fontWeight="black" textAnchor="middle">
              1D • Hosszúság & Kerület
            </text>

            {/* Vizuális: Egyenes szakasz és törött vonal */}
            <g transform="translate(25, 45)">
              <line x1="0" y1="20" x2="160" y2="20" stroke="#2563eb" strokeWidth="4" />
              <circle cx="0" cy="20" r="5" fill="#1d4ed8" />
              <circle cx="160" cy="20" r="5" fill="#1d4ed8" />
              <text x="80" y="12" fill="#1d4ed8" fontSize="11" fontWeight="bold" textAnchor="middle">a oldal</text>
            </g>

            <rect x="15" y="80" width="180" height="28" rx="6" fill="#dbeafe" />
            <text x="105" y="98" fill="#1e3a8a" fontSize="11" fontWeight="black" textAnchor="middle">
              Váltószám: 10 (10¹)
            </text>

            <g transform="translate(15, 118)">
              <text x="0" y="14" fill="#334155" fontSize="10" fontWeight="bold">Jellemzők:</text>
              <text x="0" y="28" fill="#475569" fontSize="10">• 1 irány (vonal mentén)</text>
              <text x="0" y="42" fill="#475569" fontSize="10">• K = a + b + c + ...</text>
              <text x="0" y="56" fill="#1d4ed8" fontSize="10" fontWeight="bold">• Egységek: mm, cm, dm, m, km</text>
            </g>
          </g>

          {/* 2. Kártya: 2D Terület & Felszínlap */}
          <g transform="translate(245, 10)">
            <rect x="0" y="0" width="210" height="205" rx="12" fill="#fefce8" stroke="#fef08a" strokeWidth="1.5" />
            <text x="105" y="24" fill="#854d0e" fontSize="12" fontWeight="black" textAnchor="middle">
              2D • Terület (Síklapok)
            </text>

            {/* Vizuális: Négyzet rácshálóval */}
            <g transform="translate(75, 40)">
              <rect x="0" y="0" width="60" height="35" fill="#fde047" stroke="#ca8a04" strokeWidth="2" />
              <text x="30" y="22" fill="#713f12" fontSize="11" fontWeight="black" textAnchor="middle">T = a · b</text>
            </g>

            <rect x="15" y="80" width="180" height="28" rx="6" fill="#fef9c3" />
            <text x="105" y="98" fill="#713f12" fontSize="11" fontWeight="black" textAnchor="middle">
              Váltószám: 100 (10²)
            </text>

            <g transform="translate(15, 118)">
              <text x="0" y="14" fill="#334155" fontSize="10" fontWeight="bold">Jellemzők:</text>
              <text x="0" y="28" fill="#475569" fontSize="10">• 2 irány (hossz és szélesség)</text>
              <text x="0" y="42" fill="#475569" fontSize="10">• Négyzet, téglalap, háromszög</text>
              <text x="0" y="56" fill="#854d0e" fontSize="10" fontWeight="bold">• Egységek: mm², cm², dm², m², ha</text>
            </g>
          </g>

          {/* 3. Kártya: 3D Térfogat & Testek */}
          <g transform="translate(475, 10)">
            <rect x="0" y="0" width="210" height="205" rx="12" fill="#f0fdf4" stroke="#86efac" strokeWidth="1.5" />
            <text x="105" y="24" fill="#166534" fontSize="12" fontWeight="black" textAnchor="middle">
              3D • Térfogat & Testek
            </text>

            {/* Vizuális: Izometrikus kocka */}
            <g transform="translate(105, 55)">
              <polygon points="-25,5 12,20 12,-10 -25,-25" fill="#86efac" stroke="#16a34a" strokeWidth="1.5" />
              <polygon points="12,20 38,8 38,-22 12,-10" fill="#4ade80" stroke="#15803d" strokeWidth="1.5" />
              <polygon points="-25,-25 12,-10 38,-22 2,-37" fill="#bbf7d0" stroke="#16a34a" strokeWidth="1.5" />
            </g>

            <rect x="15" y="80" width="180" height="28" rx="6" fill="#dcfce7" />
            <text x="105" y="98" fill="#14532d" fontSize="11" fontWeight="black" textAnchor="middle">
              Váltószám: 1000 (10³)
            </text>

            <g transform="translate(15, 118)">
              <text x="0" y="14" fill="#334155" fontSize="10" fontWeight="bold">Jellemzők:</text>
              <text x="0" y="28" fill="#475569" fontSize="10">• 3 irány (hossz, szél., magasság)</text>
              <text x="0" y="42" fill="#475569" fontSize="10">• V = a · b · c = T_alap · m</text>
              <text x="0" y="56" fill="#15803d" fontSize="10" fontWeight="bold">• 1 dm³ = 1 liter (l)</text>
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
};

/**
 * 2. Euler-féle poliédertétel szemléltetése (C + L = É + 2)
 */
export const EulerFormulaVisualSvg: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-center p-4 rounded-2xl bg-white dark:bg-slate-900 border border-purple-200 dark:border-purple-900/60 shadow-xs">
      <div className="text-center mb-2">
        <span className="text-xs font-black uppercase tracking-wider text-purple-900 dark:text-purple-300">
          Az Euler-féle poliédertétel: Csúcsok (C) + Lapok (L) = Élek (É) + 2
        </span>
      </div>
      <div className="w-full max-w-[620px]">
        <svg viewBox="0 0 580 220" className="w-full h-auto drop-shadow-xs">
          {/* Bal: 3D Téglatest kiemelt csúcsokkal, élekkel és lapokkal */}
          <g transform="translate(130, 115)">
            {/* Lapok (L = 6) */}
            <polygon points="-55,20 25,60 25,-20 -55,-60" fill="#f3e8ff" stroke="#9333ea" strokeWidth="2" />
            <polygon points="25,60 85,25 85,-55 25,-20" fill="#e9d5ff" stroke="#7e22ce" strokeWidth="2" />
            <polygon points="-55,-60 25,-20 85,-55 5,-95" fill="#faf5ff" stroke="#9333ea" strokeWidth="2" />

            {/* Belső szaggatott élek */}
            <line x1="-55" y1="20" x2="5" y2="-15" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3,3" />
            <line x1="5" y1="-15" x2="85" y2="25" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3,3" />
            <line x1="5" y1="-15" x2="5" y2="-95" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3,3" />

            {/* Csúcsok (C = 8) kék körökkel jelölve */}
            {[
              { x: -55, y: 20 },
              { x: 25, y: 60 },
              { x: 85, y: 25 },
              { x: 5, y: -15 },
              { x: -55, y: -60 },
              { x: 25, y: -20 },
              { x: 85, y: -55 },
              { x: 5, y: -95 }
            ].map((pt, idx) => (
              <circle key={idx} cx={pt.x} cy={pt.y} r="5" fill="#2563eb" stroke="#ffffff" strokeWidth="1.5" />
            ))}

            <text x="15" y="85" fill="#581c87" fontSize="12" fontWeight="black" textAnchor="middle">
              Téglatest (Poliéder)
            </text>
          </g>

          {/* Jobb: Számítás és levezetés */}
          <g transform="translate(320, 25)">
            <rect x="0" y="0" width="240" height="175" rx="12" fill="#faf5ff" stroke="#d8b4fe" strokeWidth="1.5" />
            <text x="15" y="24" fill="#581c87" fontSize="12" fontWeight="bold">
              Elemek számbavétele:
            </text>

            <g transform="translate(15, 36)">
              <rect x="0" y="0" width="210" height="26" rx="5" fill="#eff6ff" />
              <text x="10" y="17" fill="#1e40af" fontSize="11" fontWeight="bold">
                • Csúcsok (C): 8 db (kék pontok)
              </text>
            </g>

            <g transform="translate(15, 66)">
              <rect x="0" y="0" width="210" height="26" rx="5" fill="#fdf4ff" />
              <text x="10" y="17" fill="#86198f" fontSize="11" fontWeight="bold">
                • Lapok (L): 6 db (határoló téglalapok)
              </text>
            </g>

            <g transform="translate(15, 96)">
              <rect x="0" y="0" width="210" height="26" rx="5" fill="#f8fafc" />
              <text x="10" y="17" fill="#334155" fontSize="11" fontWeight="bold">
                • Élek (É): 12 db (határvonalak)
              </text>
            </g>

            <g transform="translate(15, 128)">
              <rect x="0" y="0" width="210" height="35" rx="6" fill="#6b21a8" />
              <text x="105" y="16" fill="#e9d5ff" fontSize="10" fontWeight="bold" textAnchor="middle">
                EULER-TÉTEL BEHELYETTESÍTVE:
              </text>
              <text x="105" y="29" fill="#ffffff" fontSize="12" fontWeight="black" textAnchor="middle">
                C + L = É + 2 ⟹ 8 + 6 = 12 + 2 = 14 ✓
              </text>
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
};
