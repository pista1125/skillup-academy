import React from 'react';

export interface FigureProps {
  size?: number;
  className?: string;
}

/**
 * 1. Szakaszos / Sávos Arányos Osztás Vizuális Szemléltetése
 * Példa: 60 cm-es rúd felosztása 2 : 3 arányban (5 egyenlő egység, 1 egység = 12 cm)
 */
export const ProportionalBarSvg: React.FC<FigureProps> = ({
  size,
  className = ''
}) => {
  return (
    <div className={`flex flex-col items-center justify-center w-full ${className}`}>
      <svg
        viewBox="0 0 520 220"
        style={size ? { width: size, height: (size * 220) / 520 } : { width: '100%', maxWidth: 520, height: 'auto' }}
        className="overflow-visible select-none drop-shadow-xs w-full"
      >
        <defs>
          <linearGradient id="barPartA" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0d9488" />
            <stop offset="100%" stopColor="#14b8a6" />
          </linearGradient>
          <linearGradient id="barPartB" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#818cf8" />
          </linearGradient>
          <marker id="arrowHead" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#475569" />
          </marker>
        </defs>

        {/* Felső címke: Teljes mennyiség (M = 60 cm) */}
        <line x1="30" y1="42" x2="490" y2="42" stroke="#475569" strokeWidth="1.8" />
        <line x1="30" y1="34" x2="30" y2="50" stroke="#475569" strokeWidth="2" />
        <line x1="490" y1="34" x2="490" y2="50" stroke="#475569" strokeWidth="2" />
        <rect x="185" y="28" width="150" height="26" rx="6" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" />
        <text x="260" y="46" textAnchor="middle" fill="#0f172a" fontWeight="900" fontSize="13">
          Teljes hossz: M = 60 cm
        </text>

        {/* Fő sáv: 2 rész (teal) + 3 rész (indigo) = 5 rész.
            Teljes szélesség: 460px (x=30..490). 1 rész = 92px.
            Part A (2 rész): 2 * 92 = 184px (x=30..214).
            Part B (3 rész): 3 * 92 = 276px (x=214..490). */}
        <g transform="translate(0, 68)">
          {/* Part A: 2 arányrész */}
          <rect x="30" y="0" width="184" height="52" rx="10" fill="url(#barPartA)" />
          {/* Part B: 3 arányrész */}
          <rect x="214" y="0" width="276" height="52" rx="10" fill="url(#barPartB)" />

          {/* Egyenlő egységek finom osztásvonalai (92 px-enként) */}
          {/* Egység 1 határa */}
          <line x1="122" y1="0" x2="122" y2="52" stroke="#ffffff" strokeWidth="2" strokeDasharray="4 3" opacity="0.8" />
          {/* Középső határ (2 és 3 rész között) */}
          <line x1="214" y1="-4" x2="214" y2="56" stroke="#ffffff" strokeWidth="3.5" />
          {/* Egység 3 határa */}
          <line x1="306" y1="0" x2="306" y2="52" stroke="#ffffff" strokeWidth="2" strokeDasharray="4 3" opacity="0.8" />
          {/* Egység 4 határa */}
          <line x1="398" y1="0" x2="398" y2="52" stroke="#ffffff" strokeWidth="2" strokeDasharray="4 3" opacity="0.8" />

          {/* Egységek belső feliratai (12 cm mindegyik) */}
          <text x="76" y="32" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="12">12 cm</text>
          <text x="168" y="32" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="12">12 cm</text>
          <text x="260" y="32" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="12">12 cm</text>
          <text x="352" y="32" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="12">12 cm</text>
          <text x="444" y="32" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="12">12 cm</text>
        </g>

        {/* Alsó részkapcsok és számítások */}
        {/* Első rész: 2 arányrész = 24 cm */}
        <line x1="30" y1="135" x2="214" y2="135" stroke="#0d9488" strokeWidth="2" />
        <line x1="30" y1="128" x2="30" y2="142" stroke="#0d9488" strokeWidth="2" />
        <line x1="214" y1="128" x2="214" y2="142" stroke="#0d9488" strokeWidth="2" />
        <text x="122" y="156" textAnchor="middle" fill="#0f766e" fontWeight="black" fontSize="13">
          1. rész: 2 · 12 = 24 cm
        </text>
        <text x="122" y="172" textAnchor="middle" fill="#14b8a6" fontWeight="bold" fontSize="11">
          (2 arányrész)
        </text>

        {/* Második rész: 3 arányrész = 36 cm */}
        <line x1="214" y1="135" x2="490" y2="135" stroke="#6366f1" strokeWidth="2" />
        <line x1="214" y1="128" x2="214" y2="142" stroke="#6366f1" strokeWidth="2" />
        <line x1="490" y1="128" x2="490" y2="142" stroke="#6366f1" strokeWidth="2" />
        <text x="352" y="156" textAnchor="middle" fill="#4338ca" fontWeight="black" fontSize="13">
          2. rész: 3 · 12 = 36 cm
        </text>
        <text x="352" y="172" textAnchor="middle" fill="#6366f1" fontWeight="bold" fontSize="11">
          (3 arányrész)
        </text>

        {/* Alsó összesítő ellenőrzés */}
        <rect x="135" y="188" width="250" height="24" rx="6" fill="#f0fdf4" stroke="#86efac" strokeWidth="1" />
        <text x="260" y="204" textAnchor="middle" fill="#15803d" fontWeight="bold" fontSize="11">
          ✓ Ellenőrzés: 24 cm + 36 cm = 60 cm | 24 : 36 = 2 : 3
        </text>
      </svg>
    </div>
  );
};

/**
 * 2. Háromszög Belső Szögeinek Arányos Osztása
 * Példa: α : β : γ = 2 : 3 : 4 arány.
 * Szögek összege = 180°. Összes rész: 2 + 3 + 4 = 9 rész.
 * 1 rész = 180° / 9 = 20°.
 * α = 40°, β = 60°, γ = 80°.
 */
export const TriangleAnglesProportionSvg: React.FC<FigureProps> = ({
  size,
  className = ''
}) => {
  return (
    <div className={`flex flex-col items-center justify-center w-full ${className}`}>
      <svg
        viewBox="0 0 500 280"
        style={size ? { width: size, height: (size * 280) / 500 } : { width: '100%', maxWidth: 500, height: 'auto' }}
        className="overflow-visible select-none drop-shadow-xs w-full"
      >
        <defs>
          <linearGradient id="triGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ccfbf1" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#e0e7ff" stopOpacity="0.7" />
          </linearGradient>
        </defs>

        {/* Háromszög csúcsok:
            A: (70, 220) -> α = 40°
            B: (430, 220) -> β = 60°
            C: (220, 50) -> γ = 80° */}
        <polygon
          points="70,220 430,220 220,50"
          fill="url(#triGrad)"
          stroke="#0f766e"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />

        {/* Szögívek */}
        {/* A csúcsnál α (40°): A = (70, 220) */}
        <path d="M 120 220 A 50 50 0 0 0 108 178" fill="none" stroke="#0d9488" strokeWidth="2.5" />
        <text x="125" y="205" fill="#0f766e" fontWeight="black" fontSize="13">α = 40°</text>
        <text x="125" y="218" fill="#14b8a6" fontSize="10" fontWeight="bold">(2x = 2·20°)</text>

        {/* B csúcsnál β (60°): B = (430, 220) */}
        <path d="M 385 220 A 45 45 0 0 1 398 181" fill="none" stroke="#4f46e5" strokeWidth="2.5" />
        <text x="350" y="205" fill="#4338ca" fontWeight="black" fontSize="13">β = 60°</text>
        <text x="350" y="218" fill="#6366f1" fontSize="10" fontWeight="bold">(3x = 3·20°)</text>

        {/* C csúcsnál γ (80°): C = (220, 50) */}
        <path d="M 195 78 A 40 40 0 0 0 245 80" fill="none" stroke="#d946ef" strokeWidth="2.5" />
        <text x="220" y="112" textAnchor="middle" fill="#a21caf" fontWeight="black" fontSize="13">γ = 80°</text>
        <text x="220" y="126" textAnchor="middle" fill="#d946ef" fontSize="10" fontWeight="bold">(4x = 4·20°)</text>

        {/* Csúcsok címkéi */}
        <text x="50" y="235" fill="#1e293b" fontWeight="black" fontSize="15">A</text>
        <text x="445" y="235" fill="#1e293b" fontWeight="black" fontSize="15">B</text>
        <text x="220" y="38" textAnchor="middle" fill="#1e293b" fontWeight="black" fontSize="15">C</text>

        {/* Magyarázó kártya alul */}
        <rect x="80" y="240" width="340" height="32" rx="8" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" />
        <text x="250" y="260" textAnchor="middle" fill="#0f172a" fontWeight="bold" fontSize="11">
          Összeg: 2x + 3x + 4x = 9x = 180° ⟹ x = 20°/rész
        </text>
      </svg>
    </div>
  );
};

/**
 * 3. Keverékek és Ötvözetek Arányos Osztása
 * Példa: Házi Szörp / Limonádé recept:
 * Szirup : Citromlé : Víz = 1 : 2 : 5
 * Teljes mennyiség = 1600 ml (8 rész, 1 rész = 200 ml)
 * Szirup: 200 ml (1 rész), Citromlé: 400 ml (2 rész), Víz: 1000 ml (5 rész)
 */
export const MixtureRatioSvg: React.FC<FigureProps> = ({
  size,
  className = ''
}) => {
  return (
    <div className={`flex flex-col items-center justify-center w-full ${className}`}>
      <svg
        viewBox="0 0 500 260"
        style={size ? { width: size, height: (size * 260) / 500 } : { width: '100%', maxWidth: 500, height: 'auto' }}
        className="overflow-visible select-none drop-shadow-xs w-full"
      >
        <defs>
          {/* Folyadék rétegek szép színátmenetei */}
          <linearGradient id="syrupGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#e11d48" />
            <stop offset="100%" stopColor="#f43f5e" />
          </linearGradient>
          <linearGradient id="lemonGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#eab308" />
            <stop offset="100%" stopColor="#fde047" />
          </linearGradient>
          <linearGradient id="waterGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0284c7" />
            <stop offset="100%" stopColor="#38bdf8" />
          </linearGradient>
        </defs>

        {/* Mérőkancsó / Henger kontúr: x=70, y=30, w=140, h=200 */}
        <rect x="70" y="30" width="140" height="200" rx="14" fill="#f8fafc" stroke="#94a3b8" strokeWidth="2.5" />
        {/* Kancsó fogantyúja */}
        <path d="M 70 60 C 35 60, 35 180, 70 180" fill="none" stroke="#94a3b8" strokeWidth="3" />

        {/* Rétegek alulról felfelé:
            Összmagasság: 180px (y=50..230). 8 rész = 22.5px/rész.
            1. Szirup (1 rész = 22.5px): y = 230 - 22.5 = 207.5
            2. Citromlé (2 rész = 45px): y = 207.5 - 45 = 162.5
            3. Víz (5 rész = 112.5px): y = 162.5 - 112.5 = 50 */}

        {/* Víz réteg */}
        <rect x="73" y="50" width="134" height="112.5" fill="url(#waterGrad)" opacity="0.85" />
        <text x="140" y="105" textAnchor="middle" fill="#ffffff" fontWeight="black" fontSize="12">
          VÍZ (5 rész)
        </text>
        <text x="140" y="122" textAnchor="middle" fill="#e0f2fe" fontWeight="bold" fontSize="11">
          1000 ml
        </text>

        {/* Citromlé réteg */}
        <rect x="73" y="162.5" width="134" height="45" fill="url(#lemonGrad)" opacity="0.9" />
        <text x="140" y="185" textAnchor="middle" fill="#713f12" fontWeight="black" fontSize="11">
          CITROMLÉ (2 rész) • 400 ml
        </text>

        {/* Málnaszörp réteg */}
        <path d="M 73 207.5 L 207 207.5 L 207 218 C 207 225, 201 228, 194 228 L 86 228 C 79 228, 73 225, 73 218 Z" fill="url(#syrupGrad)" />
        <text x="140" y="222" textAnchor="middle" fill="#ffffff" fontWeight="black" fontSize="10">
          SZÖRP (1 rész) • 200 ml
        </text>

        {/* Mérőskála a kancsó oldalán */}
        <g stroke="#64748b" strokeWidth="1.5">
          <line x1="200" y1="50" x2="210" y2="50" />
          <text x="216" y="54" fill="#334155" fontSize="10" fontWeight="bold">1600 ml (MAX)</text>

          <line x1="200" y1="95" x2="207" y2="95" />
          <line x1="200" y1="140" x2="207" y2="140" />

          <line x1="200" y1="162.5" x2="210" y2="162.5" />
          <text x="216" y="166" fill="#334155" fontSize="10" fontWeight="bold">600 ml</text>

          <line x1="200" y1="207.5" x2="210" y2="207.5" />
          <text x="216" y="211" fill="#334155" fontSize="10" fontWeight="bold">200 ml</text>
        </g>

        {/* Jobb oldali számítási lépések */}
        <g transform="translate(290, 40)">
          <rect x="0" y="0" width="200" height="190" rx="12" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1.5" />
          <text x="100" y="25" textAnchor="middle" fill="#0f172a" fontWeight="900" fontSize="13">
            Arányos Számítás
          </text>
          <line x1="15" y1="36" x2="185" y2="36" stroke="#f1f5f9" strokeWidth="1.5" />

          <text x="15" y="58" fill="#475569" fontSize="11" fontWeight="bold">1. Arány: 1 : 2 : 5</text>
          <text x="15" y="78" fill="#475569" fontSize="11">2. Összes rész: 1+2+5 = <tspan fontWeight="bold" fill="#0f172a">8 rész</tspan></text>
          <text x="15" y="98" fill="#475569" fontSize="11">3. Egy rész értéke:</text>
          <text x="25" y="116" fill="#0d9488" fontWeight="black" fontSize="12">1600 ml / 8 = 200 ml</text>

          <line x1="15" y1="128" x2="185" y2="128" stroke="#f1f5f9" strokeWidth="1" />
          <text x="15" y="146" fill="#e11d48" fontSize="11" fontWeight="bold">• Szörp: 1 · 200 = 200 ml</text>
          <text x="15" y="164" fill="#ca8a04" fontSize="11" fontWeight="bold">• Citrom: 2 · 200 = 400 ml</text>
          <text x="15" y="182" fill="#0284c7" fontSize="11" fontWeight="bold">• Víz: 5 · 200 = 1000 ml</text>
        </g>
      </svg>
    </div>
  );
};

/**
 * 4. Pénzügyi Nyereség/Költség Megoszlás Befektetés Arányában
 * Példa: Partner A (3 rész) és Partner B (5 rész).
 * Nyereség: 1 600 000 Ft. 1 rész = 200 000 Ft.
 * Partner A: 600 000 Ft, Partner B: 1 000 000 Ft.
 */
export const ProfitDistributionSvg: React.FC<FigureProps> = ({
  size,
  className = ''
}) => {
  return (
    <div className={`flex flex-col items-center justify-center w-full ${className}`}>
      <svg
        viewBox="0 0 500 240"
        style={size ? { width: size, height: (size * 240) / 500 } : { width: '100%', maxWidth: 500, height: 'auto' }}
        className="overflow-visible select-none drop-shadow-xs w-full"
      >
        <defs>
          <linearGradient id="partnerAGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#0284c7" />
          </linearGradient>
          <linearGradient id="partnerBGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#34d399" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
        </defs>

        {/* Felső közös összeg címke */}
        <rect x="120" y="15" width="260" height="36" rx="10" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
        <text x="250" y="38" textAnchor="middle" fill="#0f172a" fontWeight="900" fontSize="14">
          💰 Össznyereség: 1 600 000 Ft
        </text>

        {/* Mérleg / Oszlopok: Partner A (3 egység magas) és Partner B (5 egység magas) */}
        {/* Partner A kártya és oszlop */}
        <g transform="translate(60, 65)">
          <rect x="0" y="0" width="160" height="155" rx="12" fill="#f0f9ff" stroke="#bae6fd" strokeWidth="1.5" />
          <text x="80" y="24" textAnchor="middle" fill="#0369a1" fontWeight="black" fontSize="13">
            „A” Partner (3 rész)
          </text>
          <text x="80" y="40" textAnchor="middle" fill="#0284c7" fontSize="10">
            Befektetési arány: 3
          </text>

          {/* Érmekupac / Oszlop */}
          <rect x="40" y="55" width="80" height="50" rx="8" fill="url(#partnerAGrad)" />
          <text x="80" y="85" textAnchor="middle" fill="#ffffff" fontWeight="black" fontSize="14">
            3 × 200e
          </text>

          {/* Kifizetés */}
          <rect x="15" y="115" width="130" height="28" rx="6" fill="#ffffff" stroke="#7dd3fc" strokeWidth="1" />
          <text x="80" y="134" textAnchor="middle" fill="#0c4a6e" fontWeight="black" fontSize="12">
            600 000 Ft
          </text>
        </g>

        {/* Középső arányjelzés */}
        <circle cx="250" cy="140" r="18" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="2" />
        <text x="250" y="145" textAnchor="middle" fill="#475569" fontWeight="black" fontSize="12">
          3 : 5
        </text>

        {/* Partner B kártya és oszlop */}
        <g transform="translate(280, 65)">
          <rect x="0" y="0" width="160" height="155" rx="12" fill="#ecfdf5" stroke="#a7f3d0" strokeWidth="1.5" />
          <text x="80" y="24" textAnchor="middle" fill="#047857" fontWeight="black" fontSize="13">
            „B” Partner (5 rész)
          </text>
          <text x="80" y="40" textAnchor="middle" fill="#059669" fontSize="10">
            Befektetési arány: 5
          </text>

          {/* Érmekupac / Oszlop */}
          <rect x="40" y="45" width="80" height="60" rx="8" fill="url(#partnerBGrad)" />
          <text x="80" y="80" textAnchor="middle" fill="#ffffff" fontWeight="black" fontSize="14">
            5 × 200e
          </text>

          {/* Kifizetés */}
          <rect x="15" y="115" width="130" height="28" rx="6" fill="#ffffff" stroke="#6ee7b7" strokeWidth="1" />
          <text x="80" y="134" textAnchor="middle" fill="#064e3b" fontWeight="black" fontSize="12">
            1 000 000 Ft
          </text>
        </g>
      </svg>
    </div>
  );
};
