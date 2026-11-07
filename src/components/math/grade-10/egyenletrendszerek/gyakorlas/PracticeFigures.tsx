import React from 'react';

interface FigureProps {
  size?: number;
  className?: string;
}

// 1. Döntési fa / Stratégiaválasztás a megoldáshoz
export const StrategyDecisionTreeSvg: React.FC<FigureProps> = ({ size = 280, className = '' }) => {
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
        Megoldási Stratégia Kiválasztása
      </text>

      {/* Gyökér: Adott egyenletrendszer */}
      <rect x="95" y="48" width="130" height="28" rx="5" fill="rgba(56, 189, 248, 0.2)" stroke="#38bdf8" strokeWidth="1.2" />
      <text x="160" y="66" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
        Egyenletrendszer
      </text>

      {/* Nyilak balra, középre, jobbra */}
      <line x1="120" y1="76" x2="65" y2="100" stroke="#94a3b8" strokeWidth="1.5" />
      <line x1="160" y1="76" x2="160" y2="100" stroke="#94a3b8" strokeWidth="1.5" />
      <line x1="200" y1="76" x2="255" y2="100" stroke="#94a3b8" strokeWidth="1.5" />

      {/* Bal ág: Van ±1 együttható? ➔ Behelyettesítés */}
      <rect x="15" y="100" width="95" height="58" rx="5" fill="rgba(168, 85, 247, 0.15)" stroke="#a855f7" strokeWidth="1.2" />
      <text x="62" y="117" fill="#d8b4fe" fontSize="9" fontWeight="bold" textAnchor="middle">Van 1 vagy −1?</text>
      <text x="62" y="132" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">BEHELYETTESÍTÉS</text>
      <text x="62" y="147" fill="#c084fc" fontSize="8" textAnchor="middle">Kifejezés ➔ Beírás</text>

      {/* Középső ág: Keresztszorzás egyszerű? ➔ Elimináció */}
      <rect x="115" y="100" width="90" height="58" rx="5" fill="rgba(16, 185, 129, 0.15)" stroke="#10b981" strokeWidth="1.2" />
      <text x="160" y="117" fill="#86efac" fontSize="9" fontWeight="bold" textAnchor="middle">Szorzás kényelmes?</text>
      <text x="160" y="132" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">ELIMINÁCIÓ</text>
      <text x="160" y="147" fill="#6ee7b7" fontSize="8" textAnchor="middle">Összeadás/Kivonás</text>

      {/* Jobb ág: Törtes 1/x vagy szimmetrikus? ➔ Segédváltozó */}
      <rect x="210" y="100" width="95" height="58" rx="5" fill="rgba(245, 158, 11, 0.15)" stroke="#f59e0b" strokeWidth="1.2" />
      <text x="257" y="117" fill="#fde68a" fontSize="9" fontWeight="bold" textAnchor="middle">1/x vagy x·y tag?</text>
      <text x="257" y="132" fill="#ffffff" fontSize="10" fontWeight="bold" textAnchor="middle">SEGÉDVÁLTOZÓ</text>
      <text x="257" y="147" fill="#fbbf24" fontSize="8" textAnchor="middle">u = 1/x, v = 1/y</text>

      {/* Alsó megjegyzés */}
      <rect x="20" y="170" width="280" height="38" rx="5" fill="rgba(30, 41, 59, 0.9)" />
      <text x="160" y="186" fill="#cbd5e1" fontSize="10" textAnchor="middle">
        Mindig a <tspan fill="#fde047" fontWeight="bold">legkisebb törtekkel járó</tspan> utat válaszd!
      </text>
      <text x="160" y="200" fill="#94a3b8" fontSize="9" textAnchor="middle">
        Törtes együtthatók esetén: első lépés a közös nevezővel való beszorzás.
      </text>
    </svg>
  );
};

// 2. Két hordó bor oda-vissza öntögetése (Tankönyv 43. o. 4. feladat)
export const WineBarrelsSvg: React.FC<FigureProps> = ({ size = 280, className = '' }) => {
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
      <text x="160" y="28" fill="#f43f5e" fontSize="12" fontWeight="bold" textAnchor="middle">
        Két Hordó Bor Öntögetése (480 liter)
      </text>

      {/* 3 állapot lépésenként */}
      {/* 1. Kezdeti állapot */}
      <rect x="25" y="48" width="80" height="48" rx="5" fill="rgba(244, 63, 94, 0.15)" stroke="#f43f5e" strokeWidth="1" />
      <text x="65" y="63" fill="#fda4af" fontSize="9" fontWeight="bold" textAnchor="middle">1. Kezdet:</text>
      <text x="65" y="78" fill="#ffffff" fontSize="10" fontFamily="monospace" textAnchor="middle">A: 300 l</text>
      <text x="65" y="90" fill="#ffffff" fontSize="10" fontFamily="monospace" textAnchor="middle">B: 180 l</text>

      {/* Nyíl 1 */}
      <text x="113" y="75" fill="#f59e0b" fontSize="14">➔</text>

      {/* 2. Első öntés: A-ból B-be (amennyi B-ben volt: 180 l) */}
      <rect x="125" y="48" width="80" height="48" rx="5" fill="rgba(245, 158, 11, 0.15)" stroke="#f59e0b" strokeWidth="1" />
      <text x="165" y="63" fill="#fde68a" fontSize="9" fontWeight="bold" textAnchor="middle">2. I. öntés:</text>
      <text x="165" y="78" fill="#cbd5e1" fontSize="10" fontFamily="monospace" textAnchor="middle">A: 120 l</text>
      <text x="165" y="90" fill="#fbbf24" fontSize="10" fontFamily="monospace" textAnchor="middle">B: 360 l</text>

      {/* Nyíl 2 */}
      <text x="213" y="75" fill="#10b981" fontSize="14">➔</text>

      {/* 3. Második öntés: B-ből A-ba (amennyi A-ban maradt: 120 l) */}
      <rect x="225" y="48" width="75" height="48" rx="5" fill="rgba(16, 185, 129, 0.15)" stroke="#10b981" strokeWidth="1.2" />
      <text x="262" y="63" fill="#a7f3d0" fontSize="9" fontWeight="bold" textAnchor="middle">3. II. öntés:</text>
      <text x="262" y="78" fill="#34d399" fontSize="10" fontWeight="bold" fontFamily="monospace" textAnchor="middle">A: 240 l</text>
      <text x="262" y="90" fill="#34d399" fontSize="10" fontWeight="bold" fontFamily="monospace" textAnchor="middle">B: 240 l</text>

      {/* Algebrai egyenletdoboz */}
      <rect x="25" y="105" width="275" height="68" rx="5" fill="rgba(30, 41, 59, 0.9)" stroke="#64748b" strokeWidth="1" />
      <text x="35" y="123" fill="#93c5fd" fontSize="10" fontFamily="monospace">I.  x + y = 480 (összesen 480 liter bor)</text>
      <text x="35" y="139" fill="#93c5fd" fontSize="10" fontFamily="monospace">II. 2(x − y) = 2y − (x − y)  ⟹  3x = 5y</text>
      <text x="35" y="155" fill="#34d399" fontSize="10" fontWeight="bold">
        Megoldás: x = 300 liter és y = 180 liter ✓
      </text>
      <text x="35" y="167" fill="#cbd5e1" fontSize="9">
        A végén mindkét hordóban pontosan 240-240 liter lesz!
      </text>

      {/* Alsó tanács */}
      <rect x="20" y="180" width="280" height="28" rx="4" fill="rgba(15, 23, 42, 0.9)" />
      <text x="160" y="198" fill="#94a3b8" fontSize="9" textAnchor="middle">
        Visszafelé gondolkodva: 240 és 240 ➔ 120 és 360 ➔ 300 és 180!
      </text>
    </svg>
  );
};

// 3. 3000 méteres körpálya lovasai (Tankönyv 43. o. 1. ráadás)
export const CircularMotionSvg: React.FC<FigureProps> = ({ size = 280, className = '' }) => {
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
        Körpályán Mozgó Lovasok (K = 3000 m)
      </text>

      {/* Körpálya illusztráció */}
      <circle cx="100" cy="115" r="48" fill="none" stroke="#64748b" strokeWidth="2.5" strokeDasharray="6 3" />

      {/* Mari és Pali pozíciója: átellenes pontok (1500 m távolság) */}
      <circle cx="100" cy="67" r="6" fill="#f43f5e" stroke="#ffffff" strokeWidth="1.5" />
      <text x="100" y="60" fill="#fda4af" fontSize="9" fontWeight="bold" textAnchor="middle">Mari (v₁)</text>

      <circle cx="100" cy="163" r="6" fill="#3b82f6" stroke="#ffffff" strokeWidth="1.5" />
      <text x="100" y="180" fill="#93c5fd" fontSize="9" fontWeight="bold" textAnchor="middle">Pali (v₂)</text>

      {/* Átmérő vonal (1500 m) */}
      <line x1="100" y1="73" x2="100" y2="157" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 2" />
      <text x="108" y="118" fill="#e2e8f0" fontSize="9">1500 m</text>

      {/* Jobb oldali magyarázat */}
      <rect x="165" y="48" width="135" height="125" rx="6" fill="rgba(30, 41, 59, 0.9)" stroke="#475569" strokeWidth="1" />
      <text x="175" y="66" fill="#fde047" fontSize="10" fontWeight="bold">Kétféle találkozás:</text>

      <text x="175" y="85" fill="#fda4af" fontSize="9" fontWeight="bold">1. Egymással szembe:</text>
      <text x="175" y="98" fill="#ffffff" fontSize="9" fontFamily="monospace">(v₁ + v₂) · p = 1500</text>

      <text x="175" y="120" fill="#93c5fd" fontSize="9" fontWeight="bold">2. Egy irányba:</text>
      <text x="175" y="133" fill="#ffffff" fontSize="9" fontFamily="monospace">(v₁ − v₂) · 15p = 1500</text>

      <line x1="172" y1="142" x2="292" y2="142" stroke="#64748b" strokeWidth="1" />
      <text x="175" y="157" fill="#34d399" fontSize="9" fontWeight="bold">v₁ + v₂ = 15(v₁ − v₂)</text>
      <text x="175" y="167" fill="#a7f3d0" fontSize="8">Mari 1,14-szer gyorsabb!</text>

      {/* Alsó infó */}
      <rect x="20" y="182" width="280" height="26" rx="4" fill="rgba(15, 23, 42, 0.9)" />
      <text x="160" y="199" fill="#cbd5e1" fontSize="9" textAnchor="middle">
        Körpályán szemközti pontokból: relatív távolság kezdetben a kerület fele!
      </text>
    </svg>
  );
};

// 4. Erdőgazdaság parcellái (Tankönyv 42. o. 2006 érettségi és erdő)
export const ForestGridSvg: React.FC<FigureProps> = ({ size = 280, className = '' }) => {
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
      <text x="160" y="28" fill="#10b981" fontSize="12" fontWeight="bold" textAnchor="middle">
        Erdőgazdaság Parcellái (x sor, y fa/sor)
      </text>

      {/* Fenyő parcella (alap) */}
      <rect x="25" y="48" width="80" height="55" rx="5" fill="rgba(16, 185, 129, 0.2)" stroke="#10b981" strokeWidth="1.2" />
      <text x="65" y="66" fill="#a7f3d0" fontSize="10" fontWeight="bold" textAnchor="middle">Fenyő</text>
      <text x="65" y="82" fill="#ffffff" fontSize="10" fontFamily="monospace" textAnchor="middle">x sor · y fa</text>
      <text x="65" y="95" fill="#6ee7b7" fontSize="8" textAnchor="middle">Összes: xy fa</text>

      {/* Tölgy parcella (kisebb) */}
      <rect x="120" y="48" width="80" height="55" rx="5" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="1.2" />
      <text x="160" y="66" fill="#fde68a" fontSize="10" fontWeight="bold" textAnchor="middle">Tölgy</text>
      <text x="160" y="82" fill="#ffffff" fontSize="9" fontFamily="monospace" textAnchor="middle">(x−4)(y−5)</text>
      <text x="160" y="95" fill="#fbbf24" fontSize="8" textAnchor="middle">xy − 360 fa</text>

      {/* Platán parcella (nagyobb) */}
      <rect x="215" y="48" width="80" height="55" rx="5" fill="rgba(56, 189, 248, 0.2)" stroke="#38bdf8" strokeWidth="1.2" />
      <text x="255" y="66" fill="#bae6fd" fontSize="10" fontWeight="bold" textAnchor="middle">Platán</text>
      <text x="255" y="82" fill="#ffffff" fontSize="9" fontFamily="monospace" textAnchor="middle">(x+3)(y+2)</text>
      <text x="255" y="95" fill="#38bdf8" fontSize="8" textAnchor="middle">xy + 228 fa</text>

      {/* Levezetés doboz */}
      <rect x="25" y="112" width="270" height="60" rx="5" fill="rgba(30, 41, 59, 0.9)" stroke="#64748b" strokeWidth="1" />
      <text x="35" y="130" fill="#e2e8f0" fontSize="10" fontFamily="monospace">Tölgyből:  5x + 4y = 380</text>
      <text x="35" y="146" fill="#e2e8f0" fontSize="10" fontFamily="monospace">Platánból: 2x + 3y = 222</text>
      <text x="35" y="162" fill="#fde047" fontSize="10" fontWeight="bold">
        Megoldás: x = 36 sor és y = 50 fa/sor ⟹ 1800 fenyőfa ✓
      </text>

      {/* Alsó megjegyzés */}
      <rect x="20" y="180" width="280" height="28" rx="4" fill="rgba(15, 23, 42, 0.9)" />
      <text x="160" y="198" fill="#cbd5e1" fontSize="9" textAnchor="middle">
        Az xy szorzatok itt is kiesnek, kétismeretlenes lineáris rendszert hagyva!
      </text>
    </svg>
  );
};

// 5. Büfé számla: Péter és Pál (2018-as érettségi feladat, Tankönyv 43. o.)
export const BuffetReceiptSvg: React.FC<FigureProps> = ({ size = 280, className = '' }) => {
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
      <text x="160" y="28" fill="#fbbf24" fontSize="12" fontWeight="bold" textAnchor="middle">
        Büfé Számla: Péter és Pál (Érettségi 2018)
      </text>

      {/* Péter blokkja */}
      <rect x="25" y="48" width="130" height="70" rx="6" fill="rgba(56, 189, 248, 0.15)" stroke="#38bdf8" strokeWidth="1.2" />
      <text x="90" y="68" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">Péter vásárlása</text>
      <text x="35" y="86" fill="#ffffff" fontSize="10">2 szendvics + 2 víz</text>
      <text x="35" y="104" fill="#fde047" fontSize="12" fontWeight="bold" fontFamily="monospace">740 Ft</text>
      <text x="80" y="104" fill="#94a3b8" fontSize="9">(1 sz + 1 v = 370 Ft)</text>

      {/* Pál blokkja */}
      <rect x="165" y="48" width="130" height="70" rx="6" fill="rgba(168, 85, 247, 0.15)" stroke="#a855f7" strokeWidth="1.2" />
      <text x="230" y="68" fill="#c084fc" fontSize="11" fontWeight="bold" textAnchor="middle">Pál vásárlása</text>
      <text x="175" y="86" fill="#ffffff" fontSize="10">3 szendvics + 1 víz</text>
      <text x="175" y="104" fill="#fde047" fontSize="12" fontWeight="bold" fontFamily="monospace">890 Ft</text>

      {/* Kivonás és eredmény */}
      <rect x="25" y="126" width="270" height="48" rx="5" fill="rgba(16, 185, 129, 0.18)" stroke="#10b981" strokeWidth="1.5" />
      <text x="160" y="144" fill="#a7f3d0" fontSize="11" fontWeight="bold" textAnchor="middle">
        Kivonás: 1 szendvics = 890 − (740 − 1 szendvics) ⟹
      </text>
      <text x="160" y="162" fill="#ffffff" fontSize="12" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
        Szendvics = <tspan fill="#34d399">260 Ft</tspan> | Ásványvíz = <tspan fill="#38bdf8">110 Ft</tspan> ✓
      </text>

      {/* Alsó tanács */}
      <rect x="20" y="182" width="280" height="26" rx="4" fill="rgba(15, 23, 42, 0.9)" />
      <text x="160" y="199" fill="#cbd5e1" fontSize="9" textAnchor="middle">
        2s + 2v = 740 ⟹ s + v = 370. Ebből (3s + v) − (s + v) = 2s = 520 ⟹ s = 260 Ft!
      </text>
    </svg>
  );
};

// 6. Paraméteres rendszerek vizsgálata
export const ParametricSystemsSvg: React.FC<FigureProps> = ({ size = 280, className = '' }) => {
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
        Paraméteres Rendszerek Elemzése (p)
      </text>

      {/* Három doboz a feltételekkel */}
      {/* 1 megoldás */}
      <rect x="25" y="48" width="85" height="75" rx="5" fill="rgba(56, 189, 248, 0.15)" stroke="#38bdf8" strokeWidth="1.2" />
      <text x="67" y="66" fill="#38bdf8" fontSize="9" fontWeight="bold" textAnchor="middle">1 Megoldás</text>
      <text x="67" y="82" fill="#ffffff" fontSize="9" textAnchor="middle">Metsző egyenes</text>
      <text x="67" y="98" fill="#93c5fd" fontSize="9" fontFamily="monospace" textAnchor="middle">a₁/a₂ ≠ b₁/b₂</text>
      <text x="67" y="112" fill="#cbd5e1" fontSize="8" textAnchor="middle">p ≠ p_kritikus</text>

      {/* 0 megoldás */}
      <rect x="117" y="48" width="85" height="75" rx="5" fill="rgba(239, 68, 68, 0.15)" stroke="#ef4444" strokeWidth="1.2" />
      <text x="159" y="66" fill="#f87171" fontSize="9" fontWeight="bold" textAnchor="middle">0 Megoldás (∅)</text>
      <text x="159" y="82" fill="#ffffff" fontSize="9" textAnchor="middle">Párhuzamos</text>
      <text x="159" y="98" fill="#fca5a5" fontSize="8" fontFamily="monospace" textAnchor="middle">a₁/a₂=b₁/b₂≠c₁/c₂</text>
      <text x="159" y="112" fill="#ef4444" fontSize="8" fontWeight="bold" textAnchor="middle">0 = k (k ≠ 0)</text>

      {/* Végtelen sok megoldás */}
      <rect x="210" y="48" width="85" height="75" rx="5" fill="rgba(16, 185, 129, 0.15)" stroke="#10b981" strokeWidth="1.2" />
      <text x="252" y="66" fill="#34d399" fontSize="9" fontWeight="bold" textAnchor="middle">Végtelen sok</text>
      <text x="252" y="82" fill="#ffffff" fontSize="9" textAnchor="middle">Egybeeső</text>
      <text x="252" y="98" fill="#a7f3d0" fontSize="8" fontFamily="monospace" textAnchor="middle">a₁/a₂=b₁/b₂=c₁/c₂</text>
      <text x="252" y="112" fill="#10b981" fontSize="8" fontWeight="bold" textAnchor="middle">0 = 0</text>

      {/* Példa alul */}
      <rect x="25" y="132" width="270" height="42" rx="5" fill="rgba(30, 41, 59, 0.9)" stroke="#64748b" strokeWidth="1" />
      <text x="35" y="148" fill="#f1f5f9" fontSize="10" fontFamily="monospace">Példa: 2x + py = 6  és  4x + 6y = 12</text>
      <text x="35" y="163" fill="#fde047" fontSize="10" fontWeight="bold">
        p = 3 ⟹ azonosság (0 = 0, végtelen sok mo.) | p ≠ 3 ⟹ 1 mo.
      </text>

      {/* Alsó tanács */}
      <rect x="20" y="182" width="280" height="26" rx="4" fill="rgba(15, 23, 42, 0.9)" />
      <text x="160" y="199" fill="#cbd5e1" fontSize="9" textAnchor="middle">
        A determináns / aránypár adja meg azonnal a kritikus paraméterértéket!
      </text>
    </svg>
  );
};

