import React from 'react';

interface FigureProps {
  size?: number;
  className?: string;
}

// 1. Két bolha a koordinátarendszerben (Tankönyv 44. o. 3. feladat)
export const TwoFleasSvg: React.FC<FigureProps> = ({ size = 280, className = '' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 320 220"
      className={`rounded-xl shadow-inner bg-slate-900 border border-slate-700 ${className}`}
    >
      <rect width="320" height="220" fill="#0f172a" />

      {/* Cím doboz */}
      <rect x="20" y="10" width="280" height="28" rx="6" fill="rgba(30, 41, 59, 0.85)" stroke="#64748b" strokeWidth="1" />
      <text x="160" y="28" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">
        Két Bolha a Rácson (Tankönyv 44. o.)
      </text>

      {/* Koordinátarendszer */}
      <line x1="30" y1="160" x2="290" y2="160" stroke="#475569" strokeWidth="1" />
      <line x1="90" y1="40" x2="90" y2="195" stroke="#475569" strokeWidth="1" />
      <text x="285" y="155" fill="#64748b" fontSize="10">x</text>
      <text x="95" y="50" fill="#64748b" fontSize="10">y</text>

      {/* 1. bolha egyenese: y = 2x − 2 (indul (0; -2)-ből) */}
      <line x1="70" y1="200" x2="190" y2="40" stroke="#f43f5e" strokeWidth="2" />
      <text x="195" y="50" fill="#fda4af" fontSize="9" fontWeight="bold">1. bolha: y = 2x − 2</text>

      {/* 2. bolha egyenese: x + y = 7 ⟹ y = 7 − x */}
      <line x1="60" y1="60" x2="250" y2="175" stroke="#38bdf8" strokeWidth="2" />
      <text x="210" y="188" fill="#7dd3fc" fontSize="9" fontWeight="bold">2. bolha: x + y = 7</text>

      {/* Metszéspont M(3; 4) */}
      <circle cx="150" cy="100" r="6" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
      <rect x="160" y="90" width="115" height="26" rx="4" fill="rgba(15, 23, 42, 0.9)" stroke="#10b981" strokeWidth="1" />
      <text x="165" y="106" fill="#a7f3d0" fontSize="10" fontWeight="bold" fontFamily="monospace">
        Közös pont: (3; 4) ✓
      </text>

      {/* Alsó megjegyzés */}
      <rect x="20" y="185" width="280" height="25" rx="4" fill="rgba(30, 41, 59, 0.9)" />
      <text x="160" y="201" fill="#cbd5e1" fontSize="9" textAnchor="middle">
        2x − 2 = 7 − x ⟹ 3x = 9 ⟹ x = 3, y = 4 (mindkét bolha érinti!)
      </text>
    </svg>
  );
};

// 2. Járművek és sebességek (Kisbusz, Autó, Teherautó - Tankönyv 44. o. 4. feladat)
export const ThreeVehiclesSvg: React.FC<FigureProps> = ({ size = 280, className = '' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 320 220"
      className={`rounded-xl shadow-inner bg-slate-900 border border-slate-700 ${className}`}
    >
      <rect width="320" height="220" fill="#0f172a" />

      {/* Cím */}
      <rect x="20" y="10" width="280" height="28" rx="6" fill="rgba(30, 41, 59, 0.85)" stroke="#64748b" strokeWidth="1" />
      <text x="160" y="28" fill="#f59e0b" fontSize="12" fontWeight="bold" textAnchor="middle">
        Járművek Sebességei és Menetidejei
      </text>

      {/* 3 jármű sáv */}
      {/* Személyautó (gyorsabb) */}
      <rect x="25" y="48" width="270" height="34" rx="5" fill="rgba(56, 189, 248, 0.15)" stroke="#38bdf8" strokeWidth="1" />
      <text x="35" y="65" fill="#38bdf8" fontSize="10" fontWeight="bold">Személyautó:</text>
      <text x="110" y="65" fill="#ffffff" fontSize="10">v + 15 km/h</text>
      <text x="210" y="65" fill="#7dd3fc" fontSize="10" fontWeight="bold">t idő</text>
      <text x="35" y="77" fill="#94a3b8" fontSize="8">Kisváros ➔ Nagyváros (s távolság)</text>

      {/* Kisbusz (alap) */}
      <rect x="25" y="88" width="270" height="34" rx="5" fill="rgba(245, 158, 11, 0.15)" stroke="#f59e0b" strokeWidth="1" />
      <text x="35" y="105" fill="#fbbf24" fontSize="10" fontWeight="bold">Kisbusz (bázis):</text>
      <text x="120" y="105" fill="#ffffff" fontSize="10">v km/h</text>
      <text x="210" y="105" fill="#fde68a" fontSize="10" fontWeight="bold">t + 1 óra</text>
      <text x="35" y="117" fill="#94a3b8" fontSize="8">1 órával hosszabb menetidő</text>

      {/* Teherautó (lassabb) */}
      <rect x="25" y="128" width="270" height="34" rx="5" fill="rgba(244, 63, 94, 0.15)" stroke="#f43f5e" strokeWidth="1" />
      <text x="35" y="145" fill="#fb7185" fontSize="10" fontWeight="bold">Teherautó:</text>
      <text x="110" y="145" fill="#ffffff" fontSize="10">v − 15 km/h</text>
      <text x="210" y="145" fill="#fda4af" fontSize="10" fontWeight="bold">t + 2,5 óra</text>
      <text x="35" y="157" fill="#94a3b8" fontSize="8">1,5 órával hosszabb a kisbusznál</text>

      {/* Alsó eredmény doboz */}
      <rect x="20" y="170" width="280" height="40" rx="4" fill="rgba(16, 185, 129, 0.15)" stroke="#10b981" strokeWidth="1.2" />
      <text x="160" y="186" fill="#a7f3d0" fontSize="10" fontWeight="bold" textAnchor="middle">
        Megoldás: v_busz = 75 km/h, v_autó = 90 km/h, v_teher = 60 km/h
      </text>
      <text x="160" y="200" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">
        Távolság: <tspan fill="#fde047">s = 450 km ✓</tspan>
      </text>
    </svg>
  );
};

// 3. Három zenekar óriásplakátja (Tankönyv 45. o. 4. feladat)
export const ConcertPostersSvg: React.FC<FigureProps> = ({ size = 280, className = '' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 320 220"
      className={`rounded-xl shadow-inner bg-slate-900 border border-slate-700 ${className}`}
    >
      <rect width="320" height="220" fill="#0f172a" />

      {/* Cím */}
      <rect x="20" y="10" width="280" height="28" rx="6" fill="rgba(30, 41, 59, 0.85)" stroke="#64748b" strokeWidth="1" />
      <text x="160" y="28" fill="#c084fc" fontSize="12" fontWeight="bold" textAnchor="middle">
        Zenekari Óriásplakátok (Azonos Terület)
      </text>

      {/* 3 plakát rajz arányosan */}
      {/* Alfa (x, y) */}
      <rect x="25" y="50" width="70" height="70" rx="4" fill="rgba(168, 85, 247, 0.2)" stroke="#a855f7" strokeWidth="1.2" />
      <text x="60" y="80" fill="#d8b4fe" fontSize="11" fontWeight="bold" textAnchor="middle">Alfa</text>
      <text x="60" y="95" fill="#ffffff" fontSize="9" fontFamily="monospace" textAnchor="middle">x × y</text>
      <text x="60" y="110" fill="#c084fc" fontSize="8" textAnchor="middle">20 × 12 dm</text>

      {/* Béta (x+4, y-2) */}
      <rect x="110" y="60" width="90" height="60" rx="4" fill="rgba(56, 189, 248, 0.2)" stroke="#38bdf8" strokeWidth="1.2" />
      <text x="155" y="85" fill="#bae6fd" fontSize="11" fontWeight="bold" textAnchor="middle">Béta</text>
      <text x="155" y="100" fill="#ffffff" fontSize="9" fontFamily="monospace" textAnchor="middle">(x+4)×(y−2)</text>
      <text x="155" y="112" fill="#38bdf8" fontSize="8" textAnchor="middle">24 × 10 dm</text>

      {/* Gamma (x-4, y+3) */}
      <rect x="215" y="42" width="65" height="78" rx="4" fill="rgba(234, 179, 8, 0.2)" stroke="#eab308" strokeWidth="1.2" />
      <text x="247" y="75" fill="#fde047" fontSize="11" fontWeight="bold" textAnchor="middle">Gamma</text>
      <text x="247" y="90" fill="#ffffff" fontSize="9" fontFamily="monospace" textAnchor="middle">(x−4)×(y+3)</text>
      <text x="247" y="105" fill="#fef08a" fontSize="8" textAnchor="middle">16 × 15 dm</text>

      {/* Egyenlet és kerület összegzés */}
      <rect x="25" y="128" width="270" height="50" rx="5" fill="rgba(30, 41, 59, 0.9)" stroke="#64748b" strokeWidth="1" />
      <text x="35" y="146" fill="#93c5fd" fontSize="10" fontFamily="monospace">
        Bétából: −x + 2y = 4  |  Gammából: 3x − 4y = 12
      </text>
      <text x="35" y="162" fill="#34d399" fontSize="10" fontWeight="bold">
        Megoldás: x = 20 dm, y = 12 dm ⟹ Terület = 240 dm²
      </text>
      <text x="35" y="173" fill="#cbd5e1" fontSize="8">
        Kerületek: K_Gamma = 62 dm &lt; K_Alfa = 64 dm &lt; K_Béta = 68 dm
      </text>

      {/* Alsó tanács */}
      <rect x="20" y="184" width="280" height="24" rx="4" fill="rgba(15, 23, 42, 0.9)" />
      <text x="160" y="200" fill="#cbd5e1" fontSize="9" textAnchor="middle">
        Mindhárom plakát területe pontosan 240 dm², de kerületük eltérő!
      </text>
    </svg>
  );
};

// 4. Nagymama a piacon (Lecsófőzés - Tankönyv 45. o. 2. feladat)
export const MarketVegetablesSvg: React.FC<FigureProps> = ({ size = 280, className = '' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 320 220"
      className={`rounded-xl shadow-inner bg-slate-900 border border-slate-700 ${className}`}
    >
      <rect width="320" height="220" fill="#0f172a" />

      {/* Cím */}
      <rect x="20" y="10" width="280" height="28" rx="6" fill="rgba(30, 41, 59, 0.85)" stroke="#64748b" strokeWidth="1" />
      <text x="160" y="28" fill="#ef4444" fontSize="12" fontWeight="bold" textAnchor="middle">
        Nagymama a Piacon (Paradicsom és Paprika)
      </text>

      {/* 1. Árus */}
      <rect x="25" y="48" width="130" height="70" rx="5" fill="rgba(239, 68, 68, 0.15)" stroke="#ef4444" strokeWidth="1.2" />
      <text x="90" y="66" fill="#fca5a5" fontSize="10" fontWeight="bold" textAnchor="middle">1. Árus:</text>
      <text x="35" y="82" fill="#ffffff" fontSize="9">1,5 kg paradicsom (x)</text>
      <text x="35" y="96" fill="#ffffff" fontSize="9">+ 1,0 kg paprika (y)</text>
      <text x="35" y="112" fill="#fde047" fontSize="11" fontWeight="bold">Összesen: 850 Ft</text>

      {/* 2. Árus */}
      <rect x="165" y="48" width="130" height="70" rx="5" fill="rgba(16, 185, 129, 0.15)" stroke="#10b981" strokeWidth="1.2" />
      <text x="230" y="66" fill="#86efac" fontSize="10" fontWeight="bold" textAnchor="middle">2. Árus (Akciós):</text>
      <text x="175" y="82" fill="#cbd5e1" fontSize="9">Paradicsom: 2/3 x ár</text>
      <text x="175" y="96" fill="#cbd5e1" fontSize="9">Paprika: 1,25 y ár</text>
      <text x="175" y="112" fill="#a7f3d0" fontSize="11" fontWeight="bold">Összesen: 800 Ft</text>

      {/* Megoldás doboz */}
      <rect x="25" y="126" width="270" height="50" rx="5" fill="rgba(30, 41, 59, 0.9)" stroke="#64748b" strokeWidth="1" />
      <text x="35" y="144" fill="#93c5fd" fontSize="10" fontFamily="monospace">
        I. 1,5x + y = 850  |  II. 1,5·(2/3 x) + 1,25y = 800
      </text>
      <text x="35" y="160" fill="#34d399" fontSize="11" fontWeight="bold">
        Megoldás: Paradicsom = 300 Ft/kg, Paprika = 400 Ft/kg ✓
      </text>

      {/* Alsó tanács */}
      <rect x="20" y="184" width="280" height="24" rx="4" fill="rgba(15, 23, 42, 0.9)" />
      <text x="160" y="200" fill="#cbd5e1" fontSize="9" textAnchor="middle">
        1,5 · 300 + 400 = 450 + 400 = 850 Ft ✓ | 200·1,5 + 500 = 800 Ft ✓
      </text>
    </svg>
  );
};

// 5. Két üzem közös alkatrészgyártása (Tankönyv 45. o. 3. feladat)
export const TwoFactoriesSvg: React.FC<FigureProps> = ({ size = 280, className = '' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 320 220"
      className={`rounded-xl shadow-inner bg-slate-900 border border-slate-700 ${className}`}
    >
      <rect width="320" height="220" fill="#0f172a" />

      {/* Cím */}
      <rect x="20" y="10" width="280" height="28" rx="6" fill="rgba(30, 41, 59, 0.85)" stroke="#64748b" strokeWidth="1" />
      <text x="160" y="28" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">
        Két Üzem Munkafeladata (480 alkatrész)
      </text>

      {/* 1. szakasz: Első 5 nap */}
      <rect x="25" y="48" width="130" height="65" rx="5" fill="rgba(56, 189, 248, 0.15)" stroke="#38bdf8" strokeWidth="1" />
      <text x="90" y="66" fill="#7dd3fc" fontSize="10" fontWeight="bold" textAnchor="middle">1. Szakasz (5 nap):</text>
      <text x="35" y="82" fill="#ffffff" fontSize="9">x + y = 24 db/nap</text>
      <text x="35" y="96" fill="#cbd5e1" fontSize="9">5 nap alatt: 120 db kész</text>
      <text x="35" y="108" fill="#fde047" fontSize="9">Maradt: 360 db</text>

      {/* 2. szakasz: Hátralévő 15 nap */}
      <rect x="165" y="48" width="130" height="65" rx="5" fill="rgba(168, 85, 247, 0.15)" stroke="#a855f7" strokeWidth="1" />
      <text x="230" y="66" fill="#c084fc" fontSize="10" fontWeight="bold" textAnchor="middle">2. Szakasz (15 nap):</text>
      <text x="175" y="82" fill="#cbd5e1" fontSize="9">A üzem: −28% (0,72x)</text>
      <text x="175" y="96" fill="#cbd5e1" fontSize="9">B üzem: +20% (1,2y)</text>
      <text x="175" y="108" fill="#34d399" fontSize="9">0,72x + 1,2y = 24 db/nap</text>

      {/* Eredmény doboz */}
      <rect x="25" y="122" width="270" height="52" rx="5" fill="rgba(30, 41, 59, 0.9)" stroke="#64748b" strokeWidth="1" />
      <text x="35" y="140" fill="#93c5fd" fontSize="10" fontFamily="monospace">
        x + y = 24  és  0,72x + 1,2y = 24 ⟹ 0,48y = 6,72 ⟹ y = 14 db
      </text>
      <text x="35" y="156" fill="#34d399" fontSize="11" fontWeight="bold">
        Eredeti terv: A üzem = 200 db (10 db/nap), B üzem = 280 db (14 db/nap) ✓
      </text>

      {/* Alsó megjegyzés */}
      <rect x="20" y="182" width="280" height="26" rx="4" fill="rgba(15, 23, 42, 0.9)" />
      <text x="160" y="198" fill="#cbd5e1" fontSize="9" textAnchor="middle">
        Az időarányos munkavégzés és hatékonyságváltozás együttes modellje!
      </text>
    </svg>
  );
};

// 6. Átfogó Fejezeti Összefoglaló Térkép
export const ComprehensiveExamSummarySvg: React.FC<FigureProps> = ({ size = 280, className = '' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 320 220"
      className={`rounded-xl shadow-inner bg-slate-900 border border-slate-700 ${className}`}
    >
      <rect width="320" height="220" fill="#0f172a" />

      {/* Cím */}
      <rect x="20" y="10" width="280" height="28" rx="6" fill="rgba(30, 41, 59, 0.85)" stroke="#64748b" strokeWidth="1" />
      <text x="160" y="28" fill="#34d399" fontSize="12" fontWeight="bold" textAnchor="middle">
        II. Egyenletrendszerek Fejezeti Összegzés
      </text>

      {/* 4 fő pillér */}
      <rect x="25" y="48" width="130" height="58" rx="5" fill="rgba(56, 189, 248, 0.15)" stroke="#38bdf8" strokeWidth="1" />
      <text x="90" y="66" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle">1. Grafikus Megoldás</text>
      <text x="90" y="80" fill="#cbd5e1" fontSize="8" textAnchor="middle">y = mx + b egyenesek</text>
      <text x="90" y="94" fill="#a7f3d0" fontSize="8" textAnchor="middle">Metszéspont (x₀; y₀)</text>

      <rect x="165" y="48" width="130" height="58" rx="5" fill="rgba(168, 85, 247, 0.15)" stroke="#a855f7" strokeWidth="1" />
      <text x="230" y="66" fill="#c084fc" fontSize="10" fontWeight="bold" textAnchor="middle">2. Algebrai Módszerek</text>
      <text x="230" y="80" fill="#cbd5e1" fontSize="8" textAnchor="middle">Behelyettesítés, Elimináció</text>
      <text x="230" y="94" fill="#fde047" fontSize="8" textAnchor="middle">0 = 0 (∞) és 0 = k (∅)</text>

      <rect x="25" y="114" width="130" height="58" rx="5" fill="rgba(245, 158, 11, 0.15)" stroke="#f59e0b" strokeWidth="1" />
      <text x="90" y="132" fill="#fbbf24" fontSize="10" fontWeight="bold" textAnchor="middle">3. Bővített Rendszerek</text>
      <text x="90" y="146" fill="#cbd5e1" fontSize="8" textAnchor="middle">3-változós Gauss-elv</text>
      <text x="90" y="160" fill="#fca5a5" fontSize="8" textAnchor="middle">Másodfokú és kör metszése</text>

      <rect x="165" y="114" width="130" height="58" rx="5" fill="rgba(16, 185, 129, 0.15)" stroke="#10b981" strokeWidth="1" />
      <text x="230" y="132" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">4. Szöveges Modellezés</text>
      <text x="230" y="146" fill="#cbd5e1" fontSize="8" textAnchor="middle">Keverés, Munka, Mozgás</text>
      <text x="230" y="160" fill="#a7f3d0" fontSize="8" textAnchor="middle">Parcella, Büfé, Hordók</text>

      {/* Alsó tanács */}
      <rect x="20" y="180" width="280" height="28" rx="4" fill="rgba(30, 41, 59, 0.9)" />
      <text x="160" y="198" fill="#fde047" fontSize="10" fontWeight="bold" textAnchor="middle">
        30 válogatott feladat szintenként a teljes magabiztosságért!
      </text>
    </svg>
  );
};

