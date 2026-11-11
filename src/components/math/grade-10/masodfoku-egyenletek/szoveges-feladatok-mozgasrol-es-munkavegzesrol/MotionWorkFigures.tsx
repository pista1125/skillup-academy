import React from 'react';

interface FigureProps {
  size?: number;
  className?: string;
}

/**
 * 1. Mozgásos Menetidő és Sebességkülönbség SVG
 * Szemlélteti a két jármű haladását azonos s úton, eltérő v és v + Δv sebességgel,
 * valósághű aszfaltos kétsávos pályán, kilométer-jelölésekkel, részletes autóvektorokkal
 * és a Δt időkülönbség precíz geometriai/fizikai ábrázolásával: s/v - s/(v + Δv) = Δt.
 */
export const MotionTimelineSvg: React.FC<FigureProps> = ({ size = 520, className = '' }) => {
  return (
    <svg
      viewBox="0 0 640 310"
      width={size}
      height={(size * 310) / 640}
      className={`mx-auto select-none ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Aszfalt úttest mély gradiens */}
        <linearGradient id="roadAsphaltGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1e293b" />
          <stop offset="50%" stopColor="#0f172a" />
          <stop offset="100%" stopColor="#1e293b" />
        </linearGradient>

        {/* 1. Jármű (Borostyán / Narancs autó gradiens) */}
        <linearGradient id="carSlowGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#d97706" />
          <stop offset="50%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#fbbf24" />
        </linearGradient>

        {/* 2. Jármű (Sportos királykék / Cián autó gradiens) */}
        <linearGradient id="carFastGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#1d4ed8" />
          <stop offset="50%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#60a5fa" />
        </linearGradient>

        {/* Fényszóró fénycsóva jobbra */}
        <linearGradient id="lightBeam" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#fef08a" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#fef08a" stopOpacity="0" />
        </linearGradient>

        {/* Árnyék szűrő */}
        <filter id="carDropShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#000000" floodOpacity="0.35" />
        </filter>
        <filter id="badgeShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#0f172a" floodOpacity="0.15" />
        </filter>
      </defs>

      {/* Külső díszkeret */}
      <rect x="6" y="6" width="628" height="298" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />

      {/* Felső zöld padka */}
      <rect x="18" y="34" width="604" height="12" rx="3" fill="#14532d" opacity="0.8" />

      {/* Aszfalt kétsávos úttest */}
      <rect x="18" y="46" width="604" height="140" fill="url(#roadAsphaltGrad)" />

      {/* Alsó zöld padka */}
      <rect x="18" y="186" width="604" height="12" rx="3" fill="#14532d" opacity="0.8" />

      {/* Fehér szegélyvonalak */}
      <line x1="18" y1="48" x2="622" y2="48" stroke="#e2e8f0" strokeWidth="2.5" opacity="0.9" />
      <line x1="18" y1="184" x2="622" y2="184" stroke="#e2e8f0" strokeWidth="2.5" opacity="0.9" />

      {/* Szaggatott sávelválasztó vonal */}
      <line
        x1="18"
        y1="116"
        x2="622"
        y2="116"
        stroke="#f8fafc"
        strokeWidth="2.5"
        strokeDasharray="18 12"
        opacity="0.8"
      />

      {/* Kilométer beosztások és vonások az úton */}
      {[
        { x: 50, label: '0 km (Start)' },
        { x: 190, label: 's/3' },
        { x: 330, label: '2s/3' },
        { x: 470, label: 's - Δs' },
        { x: 580, label: 's (Cél)' }
      ].map((pt, i) => (
        <g key={i} opacity="0.75">
          <line x1={pt.x} y1="180" x2={pt.x} y2="188" stroke="#cbd5e1" strokeWidth="1.5" />
          <text x={pt.x} y="202" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#64748b" fontFamily="monospace">
            {pt.label}
          </text>
        </g>
      ))}

      {/* Város A (Start) tábla a bal oldalon */}
      <g transform="translate(60, 26)">
        <rect x="-48" y="-18" width="96" height="20" rx="6" fill="#0284c7" stroke="#38bdf8" strokeWidth="1.5" />
        <text x="0" y="-4" textAnchor="middle" fontSize="10.5" fontWeight="900" fill="#ffffff">
          🏙️ A Város (0)
        </text>
        <line x1="0" y1="2" x2="0" y2="14" stroke="#38bdf8" strokeWidth="2" />
      </g>

      {/* Város B (Cél) tábla a jobb oldalon */}
      <g transform="translate(580, 26)">
        <rect x="-48" y="-18" width="96" height="20" rx="6" fill="#4f46e5" stroke="#818cf8" strokeWidth="1.5" />
        <text x="0" y="-4" textAnchor="middle" fontSize="10.5" fontWeight="900" fill="#ffffff">
          🏁 B Város (s)
        </text>
        <line x1="0" y1="2" x2="0" y2="14" stroke="#818cf8" strokeWidth="2" />
      </g>

      {/* Távolságjelző szalag felül középen */}
      <g transform="translate(320, 26)">
        <rect x="-80" y="-16" width="160" height="20" rx="6" fill="#0f172a" stroke="#475569" strokeWidth="1.2" />
        <text x="0" y="-2" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#f8fafc" fontFamily="monospace">
          📏 s = állandó távolság
        </text>
      </g>

      {/* Célvonal (Kockás zászló minta szimbolikusan) */}
      <line x1="580" y1="46" x2="580" y2="186" stroke="#f43f5e" strokeWidth="2.5" strokeDasharray="6 4" opacity="0.85" />

      {/* ========================================================= */}
      {/* 1. JÁRMŰ (FELSŐ SÁV - Lassabb, v sebesség, még úton van!) */}
      {/* ========================================================= */}
      <g transform="translate(390, 82)" filter="url(#carDropShadow)">
        {/* Fényszóró fénysugár */}
        <polygon points="24,-4 65,-14 65,14 24,4" fill="url(#lightBeam)" />

        {/* Autó árnyék */}
        <ellipse cx="0" cy="16" rx="28" ry="5" fill="#000000" opacity="0.45" />

        {/* Karosszéria */}
        <rect x="-26" y="-10" width="52" height="22" rx="7" fill="url(#carSlowGrad)" stroke="#fef08a" strokeWidth="1.2" />
        {/* Szélvédő és tető */}
        <rect x="-10" y="-16" width="22" height="10" rx="3" fill="#1e293b" stroke="#fef3c7" strokeWidth="1" />
        {/* Kerekek keréktárcsákkal */}
        <circle cx="-16" cy="12" r="6" fill="#0f172a" stroke="#e2e8f0" strokeWidth="1.8" />
        <circle cx="16" cy="12" r="6" fill="#0f172a" stroke="#e2e8f0" strokeWidth="1.8" />
        <circle cx="-16" cy="12" r="2.5" fill="#94a3b8" />
        <circle cx="16" cy="12" r="2.5" fill="#94a3b8" />
        {/* Első fényszóró és hátsó lámpa */}
        <circle cx="25" cy="0" r="2.5" fill="#fef08a" />
        <circle cx="-25" cy="0" r="2" fill="#ef4444" />

        {/* Sebességvektor nyíl */}
        <line x1="28" y1="-2" x2="55" y2="-2" stroke="#f59e0b" strokeWidth="2.5" markerEnd="url(#arrowAmber)" />
        <polygon points="56,-2 48,-6 48,2" fill="#f59e0b" />

        {/* Információs doboz az 1. autó felett */}
        <g transform="translate(0, -28)" filter="url(#badgeShadow)">
          <rect x="-85" y="-12" width="170" height="22" rx="6" fill="#fffbeb" stroke="#f59e0b" strokeWidth="1.2" />
          <text x="0" y="3" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#92400e">
            🚗 1. Lassabb (v) &nbsp;•&nbsp; t₁ = s / v
          </text>
        </g>
      </g>

      {/* ========================================================= */}
      {/* 2. JÁRMŰ (ALSÓ SÁV - Gyorsabb, v + Δv, már beért a célba!) */}
      {/* ========================================================= */}
      <g transform="translate(560, 150)" filter="url(#carDropShadow)">
        {/* Fényszóró fénysugár */}
        <polygon points="26,-4 70,-16 70,16 26,4" fill="url(#lightBeam)" />

        {/* Autó árnyék */}
        <ellipse cx="0" cy="16" rx="30" ry="5" fill="#000000" opacity="0.45" />

        {/* Sportos karosszéria */}
        <rect x="-28" y="-10" width="56" height="22" rx="7" fill="url(#carFastGrad)" stroke="#93c5fd" strokeWidth="1.2" />
        {/* Aerodinamikus szélvédő */}
        <path d="M -12 -10 L 0 -17 L 16 -17 L 18 -10 Z" fill="#0f172a" stroke="#bfdbfe" strokeWidth="1" />
        {/* Hátsó spoiler */}
        <rect x="-28" y="-14" width="4" height="6" rx="1" fill="#1e40af" />
        {/* Kerekek keréktárcsákkal */}
        <circle cx="-17" cy="12" r="6" fill="#0f172a" stroke="#cbd5e1" strokeWidth="1.8" />
        <circle cx="17" cy="12" r="6" fill="#0f172a" stroke="#cbd5e1" strokeWidth="1.8" />
        <circle cx="-17" cy="12" r="2.5" fill="#38bdf8" />
        <circle cx="17" cy="12" r="2.5" fill="#38bdf8" />
        {/* Xenon lámpák */}
        <circle cx="27" cy="0" r="2.5" fill="#67e8f9" />
        <circle cx="-27" cy="0" r="2" fill="#ef4444" />

        {/* Hosszabb sebességvektor nyíl */}
        <line x1="30" y1="-2" x2="68" y2="-2" stroke="#38bdf8" strokeWidth="3" />
        <polygon points="70,-2 60,-6 60,2" fill="#38bdf8" />

        {/* Információs doboz a 2. autó alatt */}
        <g transform="translate(0, 26)" filter="url(#badgeShadow)">
          <rect x="-95" y="-3" width="190" height="22" rx="6" fill="#eff6ff" stroke="#3b82f6" strokeWidth="1.2" />
          <text x="0" y="12" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#1e40af">
            ⚡ 2. Gyorsabb (v + Δv) &nbsp;•&nbsp; t₂ = s / (v + Δv)
          </text>
        </g>
      </g>

      {/* ========================================================= */}
      {/* IDŐKÜLÖNBSÉG (Δt) SZEMLÉLTETÉSE: A két jármű közötti idősáv */}
      {/* ========================================================= */}
      <g transform="translate(485, 116)">
        <line x1="-95" y1="0" x2="75" y2="0" stroke="#f43f5e" strokeWidth="2" strokeDasharray="4 3" />
        <rect x="-55" y="-11" width="110" height="22" rx="11" fill="#fff1f2" stroke="#f43f5e" strokeWidth="1.5" />
        <text x="0" y="4" textAnchor="middle" fontSize="10" fontWeight="900" fill="#e11d48">
          ⏱️ Időelőny: Δt
        </text>
      </g>

      {/* ========================================================= */}
      {/* ALSÓ SZINTÉZIS KÁRTYA: Aranyszabály & Egyenlet */}
      {/* ========================================================= */}
      <g transform="translate(20, 222)">
        <rect x="0" y="0" width="600" height="74" rx="12" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1.5" filter="url(#badgeShadow)" />
        
        {/* Bal oldali összefüggés doboz */}
        <rect x="10" y="8" width="370" height="58" rx="8" fill="#f0fdf4" stroke="#86efac" strokeWidth="1.2" />
        <text x="22" y="27" fontSize="11" fontWeight="bold" fill="#166534">
          A mozgásos feladatok alapegyenlete (Időkülönbség modell):
        </text>
        <text x="22" y="49" fontSize="13" fontWeight="900" fill="#15803d" fontFamily="monospace">
          t₁ - t₂ = Δt  ⟹  s / v - s / (v + Δv) = Δt
        </text>

        {/* Jobb oldali aranyszabály doboz */}
        <rect x="390" y="8" width="200" height="58" rx="8" fill="#eff6ff" stroke="#93c5fd" strokeWidth="1.2" />
        <text x="490" y="27" textAnchor="middle" fontSize="10" fontWeight="900" fill="#1e40af">
          ARANYSZABÁLY:
        </text>
        <text x="490" y="43" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#2563eb">
          Hosszabb idő - Rövidebb idő = Δt
        </text>
        <text x="490" y="56" textAnchor="middle" fontSize="8.5" fill="#64748b">
          (A kisebb sebességhez tartozik a nagyobb idő!)
        </text>
      </g>
    </svg>
  );
};

/**
 * 2. Folyami Hajózás (Folyásirányban és szemben) SVG
 * Látványos folyókanyarulat hullámokkal, két motorcsónakkal és precíz vektoros
 * sebességösszeadással: v_le = v + v_f és v_fel = v - v_f.
 */
export const RiverCurrentSvg: React.FC<FigureProps> = ({ size = 520, className = '' }) => {
  return (
    <svg
      viewBox="0 0 640 310"
      width={size}
      height={(size * 310) / 640}
      className={`mx-auto select-none ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Folyóvíz kék gradiens */}
        <linearGradient id="riverWaterGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0284c7" />
          <stop offset="50%" stopColor="#0369a1" />
          <stop offset="100%" stopColor="#075985" />
        </linearGradient>

        {/* Folyópart zöld gradiens */}
        <linearGradient id="riverBankGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#15803d" />
          <stop offset="100%" stopColor="#166534" />
        </linearGradient>

        {/* Hajótest fehér-ezüst gradiens */}
        <linearGradient id="boatHullGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#f8fafc" />
          <stop offset="50%" stopColor="#e2e8f0" />
          <stop offset="100%" stopColor="#cbd5e1" />
        </linearGradient>

        <filter id="boatShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#082f49" floodOpacity="0.4" />
        </filter>
      </defs>

      {/* Külső keret */}
      <rect x="6" y="6" width="628" height="298" rx="16" fill="#f0f9ff" stroke="#bae6fd" strokeWidth="1.5" />

      {/* Felső zöld folyópart füves részletekkel */}
      <rect x="18" y="24" width="604" height="22" rx="4" fill="url(#riverBankGrad)" />
      {/* Alsó zöld folyópart */}
      <rect x="18" y="200" width="604" height="22" rx="4" fill="url(#riverBankGrad)" />

      {/* Folyómeder vízfelszín */}
      <rect x="18" y="46" width="604" height="154" fill="url(#riverWaterGrad)" />

      {/* Folyóáramlat animált/rajzolt hullámvonalak */}
      <g opacity="0.3" stroke="#e0f2fe" strokeWidth="1.5" strokeLinecap="round">
        <path d="M 30 65 Q 80 60 130 65 T 230 65 T 330 65 T 430 65 T 530 65 T 610 65" />
        <path d="M 50 120 Q 100 115 150 120 T 250 120 T 350 120 T 450 120 T 550 120" />
        <path d="M 30 178 Q 80 173 130 178 T 230 178 T 330 178 T 430 178 T 530 178 T 610 178" />
      </g>

      {/* Folyásirány jelző nyilak a vízben (Jobbra sodor) */}
      <g opacity="0.8">
        {[100, 260, 420, 560].map((x, i) => (
          <g key={i} transform={`translate(${x}, 122)`}>
            <line x1="-30" y1="0" x2="30" y2="0" stroke="#38bdf8" strokeWidth="2.5" strokeDasharray="8 4" />
            <polygon points="32,0 24,-4 24,4" fill="#38bdf8" />
            <text x="0" y="-8" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#e0f2fe" fontFamily="monospace">
              v_f (sodrás ➔)
            </text>
          </g>
        ))}
      </g>

      {/* ========================================================= */}
      {/* 1. HAJÓ (FELSŐ SÁV - Folyásirányban lefelé halad: v + v_f) */}
      {/* ========================================================= */}
      <g transform="translate(180, 84)" filter="url(#boatShadow)">
        {/* Propeller habzó vízhullám balra */}
        <path d="M -35 0 Q -55 -6 -75 -2 Q -55 6 -35 0" fill="#e0f2fe" opacity="0.6" />

        {/* Hajótest jobbra néz */}
        <path d="M -30 -10 L 15 -10 Q 35 0 15 10 L -30 10 Z" fill="url(#boatHullGrad)" stroke="#059669" strokeWidth="1.5" />
        {/* Zöld versenycsík */}
        <line x1="-28" y1="0" x2="16" y2="0" stroke="#10b981" strokeWidth="2.5" />
        {/* Vezetőfülke / szélvédő */}
        <polygon points="-12,-8 4,-8 0,0 -12,0" fill="#0284c7" stroke="#38bdf8" strokeWidth="1" />
        {/* Kormányos figura */}
        <circle cx="-6" cy="-3" r="3" fill="#0f172a" />

        {/* Eredő sebességvektor (NAGY ZÖLD NYÍL JOBBRA) */}
        <line x1="25" y1="0" x2="85" y2="0" stroke="#10b981" strokeWidth="3.5" />
        <polygon points="88,0 78,-5 78,5" fill="#10b981" />
        <text x="55" y="-8" textAnchor="middle" fontSize="10" fontWeight="900" fill="#a7f3d0" fontFamily="monospace">
          v + v_f (Gyorsul!)
        </text>

        {/* Információs kártya a hajó felett */}
        <g transform="translate(30, -28)">
          <rect x="-105" y="-12" width="210" height="22" rx="6" fill="#ecfdf5" stroke="#10b981" strokeWidth="1.2" />
          <text x="0" y="3" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#065f46">
            ⛵ 1. Folyásirányban: &nbsp;t_le = s / (v + v_f)
          </text>
        </g>
      </g>

      {/* ========================================================= */}
      {/* 2. HAJÓ (ALSÓ SÁV - Folyással szemben halad: v - v_f) */}
      {/* ========================================================= */}
      <g transform="translate(460, 160)" filter="url(#boatShadow)">
        {/* Propeller habzó vízhullám jobbra */}
        <path d="M 35 0 Q 55 -6 75 -2 Q 55 6 35 0" fill="#e0f2fe" opacity="0.6" />

        {/* Hajótest balra néz */}
        <path d="M 30 -10 L -15 -10 Q -35 0 -15 10 L 30 10 Z" fill="url(#boatHullGrad)" stroke="#dc2626" strokeWidth="1.5" />
        {/* Piros versenycsík */}
        <line x1="28" y1="0" x2="-16" y2="0" stroke="#ef4444" strokeWidth="2.5" />
        {/* Vezetőfülke / szélvédő */}
        <polygon points="12,-8 -4,-8 0,0 12,0" fill="#0284c7" stroke="#38bdf8" strokeWidth="1" />
        {/* Kormányos figura */}
        <circle cx="6" cy="-3" r="3" fill="#0f172a" />

        {/* Eredő sebességvektor (KÖZEPES PIROS NYÍL BALRA) */}
        <line x1="-25" y1="0" x2="-65" y2="0" stroke="#ef4444" strokeWidth="3" />
        <polygon points="-68,0 -58,-5 -58,5" fill="#ef4444" />
        <text x="-45" y="-8" textAnchor="middle" fontSize="10" fontWeight="900" fill="#fecaca" fontFamily="monospace">
          v - v_f (Lassul!)
        </text>

        {/* Információs kártya a hajó alatt */}
        <g transform="translate(-30, 26)">
          <rect x="-105" y="-3" width="210" height="22" rx="6" fill="#fef2f2" stroke="#ef4444" strokeWidth="1.2" />
          <text x="0" y="12" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#991b1b">
            ⛵ 2. Folyással szemben: &nbsp;t_fel = s / (v - v_f)
          </text>
        </g>
      </g>

      {/* ========================================================= */}
      {/* ALSÓ SZINTÉZIS KÁRTYA: Oda-vissza út és nevezetes szorzat */}
      {/* ========================================================= */}
      <g transform="translate(20, 230)">
        <rect x="0" y="0" width="600" height="66" rx="12" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1.5" />
        
        <rect x="10" y="8" width="370" height="50" rx="8" fill="#f0f9ff" stroke="#7dd3fc" strokeWidth="1.2" />
        <text x="20" y="25" fontSize="10.5" fontWeight="bold" fill="#0369a1">
          Teljes oda-vissza menetidő egyenlete:
        </text>
        <text x="20" y="45" fontSize="12.5" fontWeight="900" fill="#0c4a6e" fontFamily="monospace">
          T = s / (v + v_f) + s / (v - v_f)
        </text>

        <rect x="390" y="8" width="200" height="50" rx="8" fill="#fdf4ff" stroke="#f0abfc" strokeWidth="1.2" />
        <text x="490" y="25" textAnchor="middle" fontSize="10" fontWeight="900" fill="#86198f">
          NEVEZETES AZONOSSÁG:
        </text>
        <text x="490" y="44" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#a21caf" fontFamily="monospace">
          (v + v_f)(v - v_f) = v² - v_f²
        </text>
      </g>
    </svg>
  );
};

/**
 * 3. Együttes Munkavégzés és Csövek SVG
 * Részletesen ábrázolt csempézett medence, fémes vízvezetékcsövek csapszeleppel,
 * zuhogó vízsugárral és a reciprokos munkaösszefüggéssel: 1/t₁ + 1/t₂ = 1/T_közös.
 */
export const WorkRatePipesSvg: React.FC<FigureProps> = ({ size = 520, className = '' }) => {
  return (
    <svg
      viewBox="0 0 640 320"
      width={size}
      height={(size * 320) / 640}
      className={`mx-auto select-none ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Medence víz gradiens */}
        <linearGradient id="poolWaterGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.9" />
          <stop offset="30%" stopColor="#0284c7" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#0369a1" stopOpacity="1" />
        </linearGradient>

        {/* Fém cső gradiens */}
        <linearGradient id="metalPipeGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#64748b" />
          <stop offset="40%" stopColor="#cbd5e1" />
          <stop offset="70%" stopColor="#f8fafc" />
          <stop offset="100%" stopColor="#475569" />
        </linearGradient>

        {/* Csempe minta a medence falára */}
        <pattern id="poolTilePattern" width="16" height="16" patternUnits="userSpaceOnUse">
          <rect width="16" height="16" fill="#f0f9ff" stroke="#bae6fd" strokeWidth="0.8" />
        </pattern>

        {/* Vízsugár 1 (Kék) */}
        <linearGradient id="streamGrad1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0.95" />
        </linearGradient>

        {/* Vízsugár 2 (Lila/Cián) */}
        <linearGradient id="streamGrad2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#c084fc" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#7e22ce" stopOpacity="0.95" />
        </linearGradient>

        <clipPath id="poolInteriorClip">
          <rect x="70" y="70" width="500" height="160" rx="8" />
        </clipPath>
      </defs>

      {/* Külső keret */}
      <rect x="6" y="6" width="628" height="308" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />

      {/* ========================================================= */}
      {/* 1. CSŐ (Bal oldalról beáramló vízvezeték: "A" cső) */}
      {/* ========================================================= */}
      <g>
        {/* Vízcső könyök */}
        <path d="M 20 40 L 140 40 L 140 85" stroke="url(#metalPipeGrad)" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" />
        {/* Csap zárószelep kerék */}
        <circle cx="80" cy="40" r="14" fill="#dc2626" stroke="#991b1b" strokeWidth="2.5" />
        <circle cx="80" cy="40" r="5" fill="#fef2f2" />
        <line x1="80" y1="28" x2="80" y2="52" stroke="#ffffff" strokeWidth="2" />
        <line x1="68" y1="40" x2="92" y2="40" stroke="#ffffff" strokeWidth="2" />

        {/* Zuhogó vízsugár */}
        <path d="M 134 85 Q 134 110 138 150 Q 142 110 146 85 Z" fill="url(#streamGrad1)" />
        {/* Vízfodrok a becsapódási pontnál */}
        <ellipse cx="140" cy="150" rx="16" ry="4" fill="#e0f2fe" opacity="0.8" />
        <ellipse cx="140" cy="150" rx="9" ry="2" fill="#38bdf8" />

        {/* Adatpanel: 1. Cső */}
        <g transform="translate(140, 20)">
          <rect x="-65" y="-12" width="130" height="22" rx="6" fill="#eff6ff" stroke="#3b82f6" strokeWidth="1.2" />
          <text x="0" y="3" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#1e40af">
            🚰 1. Cső: P₁ = 1 / t₁
          </text>
        </g>
      </g>

      {/* ========================================================= */}
      {/* 2. CSŐ (Jobb oldalról beáramló vízvezeték: "B" cső) */}
      {/* ========================================================= */}
      <g>
        {/* Vízcső könyök */}
        <path d="M 620 40 L 500 40 L 500 85" stroke="url(#metalPipeGrad)" strokeWidth="16" strokeLinecap="round" strokeLinejoin="round" />
        {/* Csap zárószelep kerék */}
        <circle cx="560" cy="40" r="14" fill="#7e22ce" stroke="#581c87" strokeWidth="2.5" />
        <circle cx="560" cy="40" r="5" fill="#faf5ff" />
        <line x1="560" y1="28" x2="560" y2="52" stroke="#ffffff" strokeWidth="2" />
        <line x1="548" y1="40" x2="572" y2="40" stroke="#ffffff" strokeWidth="2" />

        {/* Zuhogó vízsugár */}
        <path d="M 494 85 Q 494 110 498 150 Q 502 110 506 85 Z" fill="url(#streamGrad2)" />
        {/* Vízfodrok a becsapódási pontnál */}
        <ellipse cx="500" cy="150" rx="16" ry="4" fill="#f3e8ff" opacity="0.8" />
        <ellipse cx="500" cy="150" rx="9" ry="2" fill="#a855f7" />

        {/* Adatpanel: 2. Cső */}
        <g transform="translate(500, 20)">
          <rect x="-65" y="-12" width="130" height="22" rx="6" fill="#faf5ff" stroke="#a855f7" strokeWidth="1.2" />
          <text x="0" y="3" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#6b21a8">
            🚰 2. Cső: P₂ = 1 / t₂
          </text>
        </g>
      </g>

      {/* ========================================================= */}
      {/* MEDENCE SZERKEZETE ÉS VÍZSZINTJE */}
      {/* ========================================================= */}
      {/* Medence pereme */}
      <rect x="62" y="62" width="516" height="176" rx="12" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="3" />
      {/* Csempézett belső fal */}
      <rect x="70" y="70" width="500" height="160" rx="8" fill="url(#poolTilePattern)" />

      {/* Víz a medencében levágva */}
      <g clipPath="url(#poolInteriorClip)">
        {/* Vízoszlop (Kb. 55%-ig töltve) */}
        <rect x="70" y="148" width="500" height="82" fill="url(#poolWaterGrad)" />

        {/* Víz alatti fénycsillogások */}
        <line x1="90" y1="165" x2="550" y2="165" stroke="#7dd3fc" strokeWidth="2" strokeDasharray="30 20" opacity="0.5" />
        <line x1="120" y1="185" x2="520" y2="185" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="20 30" opacity="0.4" />

        {/* Ragyogó hullámzó vízfelszín vonal */}
        <path
          d="M 70 148 Q 132 144 195 148 T 320 148 T 445 148 T 570 148"
          stroke="#f0f9ff"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />

        {/* Buborékok */}
        <circle cx="145" cy="180" r="3" fill="#ffffff" opacity="0.6" />
        <circle cx="155" cy="195" r="2" fill="#ffffff" opacity="0.5" />
        <circle cx="495" cy="182" r="3" fill="#ffffff" opacity="0.6" />
        <circle cx="488" cy="198" r="2" fill="#ffffff" opacity="0.5" />
      </g>

      {/* Szintjelző vonalak a medence oldalán */}
      <g opacity="0.8" fontSize="9" fontWeight="bold" fill="#0369a1" fontFamily="monospace">
        <line x1="72" y1="148" x2="88" y2="148" stroke="#0284c7" strokeWidth="2" />
        <text x="92" y="151">Vízszint</text>
        <line x1="72" y1="80" x2="84" y2="80" stroke="#64748b" strokeWidth="1.5" />
        <text x="88" y="83" fill="#64748b">100% (Egész munka = 1)</text>
      </g>

      {/* ========================================================= */}
      {/* ALSÓ SZINTÉZIS KÁRTYA: Együttes munkavégzés alaptörvénye */}
      {/* ========================================================= */}
      <g transform="translate(20, 246)">
        <rect x="0" y="0" width="600" height="64" rx="12" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1.5" />
        
        <rect x="10" y="8" width="370" height="48" rx="8" fill="#f0fdfa" stroke="#5eead4" strokeWidth="1.2" />
        <text x="20" y="24" fontSize="10.5" fontWeight="bold" fill="#0f766e">
          Együttes munkavégzés fundamentális törvénye:
        </text>
        <text x="20" y="44" fontSize="12.5" fontWeight="900" fill="#115e59" fontFamily="monospace">
          P_össz = P₁ + P₂  ⟹  1 / t₁ + 1 / t₂ = 1 / T_közös
        </text>

        <rect x="390" y="8" width="200" height="48" rx="8" fill="#eff6ff" stroke="#bfdbfe" strokeWidth="1.2" />
        <text x="490" y="24" textAnchor="middle" fontSize="10" fontWeight="900" fill="#1d4ed8">
          KÖZÖS TÖLTÉSI IDŐ:
        </text>
        <text x="490" y="43" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#2563eb" fontFamily="monospace">
          T = (t₁ · t₂) / (t₁ + t₂)
        </text>
      </g>
    </svg>
  );
};

/**
 * 4. Szöveges Feladatok Modellezési Protokollja SVG
 * Modern összekapcsolt folyamatábra: 1. Ismeretlen -> 2. Törtes modell -> 3. Másodfokú egyenlet -> 4. Gyökszűrés.
 */
export const MotionWorkModelingProtocolSvg: React.FC<FigureProps> = ({ size = 520, className = '' }) => {
  return (
    <svg
      viewBox="0 0 640 220"
      width={size}
      height={(size * 220) / 640}
      className={`mx-auto select-none ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="cardShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#0f172a" floodOpacity="0.08" />
        </filter>
        <linearGradient id="stepArrowGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>

      {/* Külső keret */}
      <rect x="6" y="6" width="628" height="208" rx="16" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />

      {/* Folyamat összekötő nyilak a kártyák között */}
      {[156, 308, 460].map((x, i) => (
        <g key={i} transform={`translate(${x}, 105)`}>
          <line x1="-8" y1="0" x2="14" y2="0" stroke="url(#stepArrowGrad)" strokeWidth="3" strokeLinecap="round" />
          <polygon points="18,0 10,-5 10,5" fill="#8b5cf6" />
        </g>
      ))}

      {/* ========================================================= */}
      {/* 1. LÉPÉS: Ismeretlen rögzítése */}
      {/* ========================================================= */}
      <g transform="translate(18, 20)" filter="url(#cardShadow)">
        <rect x="0" y="0" width="134" height="175" rx="12" fill="#ffffff" stroke="#93c5fd" strokeWidth="1.5" />
        <rect x="8" y="8" width="118" height="26" rx="6" fill="#eff6ff" />
        <circle cx="22" cy="21" r="9" fill="#3b82f6" />
        <text x="22" y="25" textAnchor="middle" fontSize="10.5" fontWeight="900" fill="#ffffff">1</text>
        <text x="70" y="25" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#1d4ed8">ISMERETLEN</text>

        <text x="67" y="56" textAnchor="middle" fontSize="10.5" fontWeight="900" fill="#0f172a">Változó & mérték</text>
        <text x="67" y="74" textAnchor="middle" fontSize="9" fill="#475569">v sebesség (km/h)</text>
        <text x="67" y="88" textAnchor="middle" fontSize="9" fill="#475569">vagy t idő (óra)</text>

        <rect x="10" y="112" width="114" height="48" rx="6" fill="#dbeafe" />
        <text x="67" y="130" textAnchor="middle" fontSize="9" fontWeight="900" fill="#1e40af">KIKÖTÉSEK:</text>
        <text x="67" y="146" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#1e3a8a" fontFamily="monospace">v &gt; 0, t &gt; 0</text>
      </g>

      {/* ========================================================= */}
      {/* 2. LÉPÉS: Törtes egyenlet felírása */}
      {/* ========================================================= */}
      <g transform="translate(170, 20)" filter="url(#cardShadow)">
        <rect x="0" y="0" width="134" height="175" rx="12" fill="#ffffff" stroke="#6ee7b7" strokeWidth="1.5" />
        <rect x="8" y="8" width="118" height="26" rx="6" fill="#ecfdf5" />
        <circle cx="22" cy="21" r="9" fill="#10b981" />
        <text x="22" y="25" textAnchor="middle" fontSize="10.5" fontWeight="900" fill="#ffffff">2</text>
        <text x="70" y="25" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#047857">TÖRTES MODELL</text>

        <text x="67" y="56" textAnchor="middle" fontSize="10.5" fontWeight="900" fill="#0f172a">Időegyenlet</text>
        <text x="67" y="74" textAnchor="middle" fontSize="9" fill="#475569">t = s / v (mozgás)</text>
        <text x="67" y="88" textAnchor="middle" fontSize="9" fill="#475569">P = 1 / t (munka)</text>

        <rect x="10" y="112" width="114" height="48" rx="6" fill="#d1fae5" />
        <text x="67" y="130" textAnchor="middle" fontSize="9" fontWeight="900" fill="#065f46">IDŐKÜLÖNBSÉG:</text>
        <text x="67" y="146" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#064e3b" fontFamily="monospace">t₁ - t₂ = Δt</text>
      </g>

      {/* ========================================================= */}
      {/* 3. LÉPÉS: Beszorzás és másodfokú rendezés */}
      {/* ========================================================= */}
      <g transform="translate(322, 20)" filter="url(#cardShadow)">
        <rect x="0" y="0" width="134" height="175" rx="12" fill="#ffffff" stroke="#fcd34d" strokeWidth="1.5" />
        <rect x="8" y="8" width="118" height="26" rx="6" fill="#fffbeb" />
        <circle cx="22" cy="21" r="9" fill="#f59e0b" />
        <text x="22" y="25" textAnchor="middle" fontSize="10.5" fontWeight="900" fill="#ffffff">3</text>
        <text x="70" y="25" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#b45309">BESZORZÁS</text>

        <text x="67" y="56" textAnchor="middle" fontSize="10.5" fontWeight="900" fill="#0f172a">Közös nevező</text>
        <text x="67" y="74" textAnchor="middle" fontSize="9" fill="#475569">Nevezők szorzata</text>
        <text x="67" y="88" textAnchor="middle" fontSize="9" fill="#475569">v · (v + Δv)</text>

        <rect x="10" y="112" width="114" height="48" rx="6" fill="#fef3c7" />
        <text x="67" y="130" textAnchor="middle" fontSize="9" fontWeight="900" fill="#92400e">ÁLTALÁNOS ALAK:</text>
        <text x="67" y="146" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#78350f" fontFamily="monospace">ax² + bx + c = 0</text>
      </g>

      {/* ========================================================= */}
      {/* 4. LÉPÉS: Gyökszűrés és valóságvizsgálat */}
      {/* ========================================================= */}
      <g transform="translate(474, 20)" filter="url(#cardShadow)">
        <rect x="0" y="0" width="148" height="175" rx="12" fill="#ffffff" stroke="#fca5a5" strokeWidth="1.5" />
        <rect x="8" y="8" width="132" height="26" rx="6" fill="#fef2f2" />
        <circle cx="22" cy="21" r="9" fill="#ef4444" />
        <text x="22" y="25" textAnchor="middle" fontSize="10.5" fontWeight="900" fill="#ffffff">4</text>
        <text x="76" y="25" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#b91c1c">GYÖKSZŰRÉS</text>

        <text x="74" y="56" textAnchor="middle" fontSize="10.5" fontWeight="900" fill="#0f172a">Valósági szűrés</text>
        <text x="74" y="74" textAnchor="middle" fontSize="9" fill="#475569">Negatív gyököt</text>
        <text x="74" y="88" textAnchor="middle" fontSize="9" fill="#475569">mindig elvetjük!</text>

        <rect x="10" y="112" width="128" height="48" rx="6" fill="#fee2e2" />
        <text x="74" y="130" textAnchor="middle" fontSize="9" fontWeight="900" fill="#991b1b">SZÖVEGES VÁLASZ:</text>
        <text x="74" y="146" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#7f1d1d">Mértékegységgel</text>
      </g>
    </svg>
  );
};
