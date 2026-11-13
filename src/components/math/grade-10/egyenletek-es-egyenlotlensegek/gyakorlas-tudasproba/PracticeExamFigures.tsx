import React from 'react';

interface FigureProps {
  size?: number;
  className?: string;
}

// 1. Átfogó Fejezeti Fogalmi Térkép
export const SynthesisConceptMapSvg: React.FC<FigureProps> = ({ size = 260, className = '' }) => {
  return (
    <svg
      viewBox="0 0 320 180"
      width={size}
      height={(size * 180) / 320}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`max-w-full h-auto select-none ${className}`}
    >
      <rect x="0" y="0" width="320" height="180" rx="8" fill="#f5f3ff" />

      {/* Cím */}
      <text x="160" y="18" fill="#5b21b6" fontSize="9.5" fontWeight="black" textAnchor="middle">
        VIII. EGYENLETEK ÉS EGYENLŐTLENSÉGEK SZINTÉZIS
      </text>

      {/* Központi mag: Megoldáshalmaz keresése */}
      <rect x="105" y="68" width="110" height="42" rx="6" fill="#7c3aed" stroke="#6d28d9" strokeWidth="1.5" />
      <text x="160" y="85" fill="#ffffff" fontSize="8.5" fontWeight="bold" textAnchor="middle">MEGOLDÁSHALMAZ</text>
      <text x="160" y="99" fill="#ede9fe" fontSize="7" fontFamily="monospace" textAnchor="middle">M ⊆ Alaphalmaz</text>

      {/* 1. Ekvivalencia (balra fel) */}
      <rect x="15" y="30" width="80" height="34" rx="5" fill="#ffffff" stroke="#c4b5fd" strokeWidth="1.2" />
      <text x="55" y="44" fill="#6d28d9" fontSize="7.5" fontWeight="bold" textAnchor="middle">1. ÁTALAKÍTÁSOK</text>
      <text x="55" y="56" fill="#64748b" fontSize="6.5" textAnchor="middle">Mérlegelv &amp; Próba</text>

      {/* Nyíl 1 -> Közép */}
      <path d="M 75 64 L 110 75" stroke="#8b5cf6" strokeWidth="1.5" strokeDasharray="3 2" />

      {/* 2. Gyökös Egyenletek (balra le) */}
      <rect x="15" y="116" width="80" height="34" rx="5" fill="#ffffff" stroke="#c4b5fd" strokeWidth="1.2" />
      <text x="55" y="130" fill="#6d28d9" fontSize="7.5" fontWeight="bold" textAnchor="middle">2. GYÖKÖS EGYENLET</text>
      <text x="55" y="142" fill="#64748b" fontSize="6.5" textAnchor="middle">√(f(x)) ≥ 0, Hamis gyök</text>

      {/* Nyíl 2 -> Közép */}
      <path d="M 75 120 L 110 105" stroke="#8b5cf6" strokeWidth="1.5" strokeDasharray="3 2" />

      {/* 3. Másodfokú Egyenlőtlenség (fent közép) */}
      <rect x="120" y="26" width="80" height="32" rx="5" fill="#ffffff" stroke="#c4b5fd" strokeWidth="1.2" />
      <text x="160" y="39" fill="#6d28d9" fontSize="7.5" fontWeight="bold" textAnchor="middle">3. EGYENLŐTLENSÉG</text>
      <text x="160" y="51" fill="#64748b" fontSize="6.5" textAnchor="middle">Parabola, Előjeltábla</text>

      {/* Nyíl 3 -> Közép */}
      <path d="M 160 58 L 160 68" stroke="#8b5cf6" strokeWidth="1.5" strokeDasharray="3 2" />

      {/* 4. Viète & Gyöktényezők (jobbra fel) */}
      <rect x="225" y="30" width="80" height="34" rx="5" fill="#ffffff" stroke="#c4b5fd" strokeWidth="1.2" />
      <text x="265" y="44" fill="#6d28d9" fontSize="7.5" fontWeight="bold" textAnchor="middle">4. VIÈTE &amp; TÉNYEZŐK</text>
      <text x="265" y="56" fill="#64748b" fontSize="6.5" textAnchor="middle">a(x - x₁)(x - x₂)</text>

      {/* Nyíl 4 -> Közép */}
      <path d="M 245 64 L 210 75" stroke="#8b5cf6" strokeWidth="1.5" strokeDasharray="3 2" />

      {/* 5. Egyenletrendszerek (jobbra le) */}
      <rect x="225" y="116" width="80" height="34" rx="5" fill="#ffffff" stroke="#c4b5fd" strokeWidth="1.2" />
      <text x="265" y="130" fill="#6d28d9" fontSize="7.5" fontWeight="bold" textAnchor="middle">5. RENDSZEREK</text>
      <text x="265" y="142" fill="#64748b" fontSize="6.5" textAnchor="middle">Behelyettesítés, Párok</text>

      {/* Nyíl 5 -> Közép */}
      <path d="M 245 120 L 210 105" stroke="#8b5cf6" strokeWidth="1.5" strokeDasharray="3 2" />

      {/* Alsó megjegyzés */}
      <text x="160" y="166" fill="#5b21b6" fontSize="7.5" fontWeight="bold" textAnchor="middle">
        A tudáspróba ezen 5 pillér teljes összefüggéseit kéri számon!
      </text>
    </svg>
  );
};

// 2. Érettségi Döntési Fa és Ellenőrzőfa
export const ExamChecklistTreeSvg: React.FC<FigureProps> = ({ size = 260, className = '' }) => {
  return (
    <svg
      viewBox="0 0 320 180"
      width={size}
      height={(size * 180) / 320}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`max-w-full h-auto select-none ${className}`}
    >
      <rect x="0" y="0" width="320" height="180" rx="8" fill="#faf5ff" />

      {/* Cím */}
      <text x="160" y="20" fill="#6b21a8" fontSize="10" fontWeight="black" textAnchor="middle">
        ÉRETTSÉGI STRATÉGIAI DÖNTÉSI FA
      </text>

      {/* 1. Lépés: Kikötés */}
      <rect x="20" y="34" width="70" height="45" rx="5" fill="#ffffff" stroke="#a855f7" strokeWidth="1.5" />
      <text x="55" y="49" fill="#7e22ce" fontSize="8" fontWeight="bold" textAnchor="middle">1. KIKÖTÉS</text>
      <text x="55" y="62" fill="#64748b" fontSize="7" textAnchor="middle">Nevező ≠ 0</text>
      <text x="55" y="72" fill="#64748b" fontSize="7" textAnchor="middle">Gyök alatt ≥ 0</text>

      <path d="M 90 56 L 108 56" stroke="#9333ea" strokeWidth="2" />

      {/* 2. Lépés: Átalakítás */}
      <rect x="110" y="34" width="90" height="45" rx="5" fill="#ffffff" stroke="#a855f7" strokeWidth="1.5" />
      <text x="155" y="49" fill="#7e22ce" fontSize="8" fontWeight="bold" textAnchor="middle">2. ÁTALAKÍTÁS</text>
      <text x="155" y="62" fill="#64748b" fontSize="6.5" textAnchor="middle">Szorzattá bontás</text>
      <text x="155" y="72" fill="#64748b" fontSize="6.5" textAnchor="middle">vagy Megoldóképlet</text>

      <path d="M 200 56 L 218 56" stroke="#9333ea" strokeWidth="2" />

      {/* 3. Lépés: Szűrés */}
      <rect x="220" y="34" width="80" height="45" rx="5" fill="#ffffff" stroke="#10b981" strokeWidth="1.5" />
      <text x="260" y="49" fill="#047857" fontSize="8" fontWeight="bold" textAnchor="middle">3. SZŰRŐ</text>
      <text x="260" y="62" fill="#64748b" fontSize="6.5" textAnchor="middle">Hamis gyök</text>
      <text x="260" y="72" fill="#10b981" fontSize="6.5" fontWeight="bold" textAnchor="middle">Kötelező Próba!</text>

      {/* Alsó összefoglaló sáv */}
      <rect x="20" y="92" width="280" height="74" rx="6" fill="#f3e8ff" stroke="#c084fc" strokeWidth="1" />
      <text x="35" y="108" fill="#581c87" fontSize="8" fontWeight="bold">ARANYSZABÁLYOK A MAXIMÁLIS PONTSZÁMÉRT:</text>
      <text x="35" y="122" fill="#6b21a8" fontSize="7.5">✓ A kikötés felírása önmagában 1-2 részpontot ér az érettségin!</text>
      <text x="35" y="135" fill="#6b21a8" fontSize="7.5">✓ Nem ekvivalens lépésnél (pl. négyzetre emelés) kötelező az ellenőrzés!</text>
      <text x="35" y="148" fill="#6b21a8" fontSize="7.5">✓ A végeredményt mindig egyértelmű megoldáshalmazként (M = ...) zárjuk le!</text>
      <text x="35" y="160" fill="#6b21a8" fontSize="7.5">✓ Egyenlőtlenségnél ábrázoljuk a megoldást számegyenesen is!</text>
    </svg>
  );
};

// 3. Egyenlőtlenségek és Intervallumok
export const InequalityRegionsSvg: React.FC<FigureProps> = ({ size = 260, className = '' }) => {
  return (
    <svg
      viewBox="0 0 320 180"
      width={size}
      height={(size * 180) / 320}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`max-w-full h-auto select-none ${className}`}
    >
      <rect x="0" y="0" width="320" height="180" rx="8" fill="#f8fafc" />

      {/* Cím */}
      <text x="160" y="20" fill="#4c1d95" fontSize="10" fontWeight="black" textAnchor="middle">
        EGYENLŐTLENSÉGEK: PARABOLA ÉS SZÁMEGYENES
      </text>

      {/* Parabola: a > 0 */}
      <path d="M 40 45 Q 110 135 180 45" stroke="#7c3aed" strokeWidth="2.5" fill="none" />
      <line x1="20" y1="90" x2="200" y2="90" stroke="#64748b" strokeWidth="1.5" />
      <text x="195" y="85" fill="#64748b" fontSize="8" fontFamily="monospace">x</text>

      {/* Zérushelyek */}
      <circle cx="70" cy="90" r="4.5" fill="#7c3aed" />
      <text x="70" y="104" fill="#5b21b6" fontSize="7.5" fontWeight="bold" textAnchor="middle">x₁</text>

      <circle cx="150" cy="90" r="4.5" fill="#7c3aed" />
      <text x="150" y="104" fill="#5b21b6" fontSize="7.5" fontWeight="bold" textAnchor="middle">x₂</text>

      {/* Előjelcímkék */}
      <text x="45" y="75" fill="#16a34a" fontSize="10" fontWeight="bold">+</text>
      <text x="110" y="110" fill="#dc2626" fontSize="10" fontWeight="bold">- (belső)</text>
      <text x="175" y="75" fill="#16a34a" fontSize="10" fontWeight="bold">+</text>

      {/* Jobb oldali összefoglaló kártya */}
      <rect x="210" y="35" width="95" height="130" rx="6" fill="#f5f3ff" stroke="#ddd6fe" strokeWidth="1" />
      <text x="257" y="52" fill="#5b21b6" fontSize="8" fontWeight="bold" textAnchor="middle">IRÁNYMUTATÓ</text>
      <line x1="220" y1="58" x2="295" y2="58" stroke="#ddd6fe" strokeWidth="1" />

      <text x="220" y="72" fill="#6d28d9" fontSize="7" fontWeight="bold">f(x) &gt; 0 (külső):</text>
      <text x="220" y="84" fill="#334155" fontSize="7" fontFamily="monospace">x &lt; x₁ vagy x &gt; x₂</text>

      <text x="220" y="102" fill="#6d28d9" fontSize="7" fontWeight="bold">f(x) &lt; 0 (belső):</text>
      <text x="220" y="114" fill="#334155" fontSize="7" fontFamily="monospace">x₁ &lt; x &lt; x₂</text>

      <text x="220" y="132" fill="#dc2626" fontSize="7" fontWeight="bold">Törtes nevező:</text>
      <text x="220" y="144" fill="#b91c1c" fontSize="7">Mindig NYÍLT</text>
      <text x="220" y="154" fill="#b91c1c" fontSize="6.5">zárójel a nevezőnél!</text>

      {/* Számegyenes alul balra */}
      <line x1="30" y1="145" x2="190" y2="145" stroke="#94a3b8" strokeWidth="1.5" />
      <line x1="70" y1="145" x2="150" y2="145" stroke="#7c3aed" strokeWidth="3.5" />
      <circle cx="70" cy="145" r="3.5" fill="#7c3aed" stroke="#ffffff" strokeWidth="1" />
      <circle cx="150" cy="145" r="3.5" fill="#7c3aed" stroke="#ffffff" strokeWidth="1" />
      <text x="110" y="162" fill="#5b21b6" fontSize="7.5" fontWeight="bold" textAnchor="middle">
        Zárt szakasz: [x₁; x₂]
      </text>
    </svg>
  );
};

// 4. Nemlineáris rendszerek és metszéspontok
export const NonlinearSystemsIntersectionSvg: React.FC<FigureProps> = ({ size = 260, className = '' }) => {
  return (
    <svg
      viewBox="0 0 320 180"
      width={size}
      height={(size * 180) / 320}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`max-w-full h-auto select-none ${className}`}
    >
      <rect x="0" y="0" width="320" height="180" rx="8" fill="#faf5ff" />

      {/* Cím */}
      <text x="160" y="20" fill="#5b21b6" fontSize="10" fontWeight="black" textAnchor="middle">
        NEMLINEÁRIS RENDSZEREK METSZÉSPONTJAI
      </text>

      {/* Koordinátatengelyek */}
      <line x1="25" y1="100" x2="295" y2="100" stroke="#cbd5e1" strokeWidth="1.5" />
      <line x1="160" y1="28" x2="160" y2="165" stroke="#cbd5e1" strokeWidth="1.5" />

      {/* Kör: r = 45 */}
      <circle cx="160" cy="100" r="45" stroke="#7c3aed" strokeWidth="2" fill="#ede9fe" fillOpacity="0.4" />
      <text x="195" y="65" fill="#7c3aed" fontSize="7.5" fontWeight="bold">x² + y² = 20</text>

      {/* Egyenes */}
      <line x1="80" y1="145" x2="240" y2="55" stroke="#0284c7" strokeWidth="2" strokeDasharray="3 2" />
      <text x="242" y="52" fill="#0284c7" fontSize="7.5" fontWeight="bold">y = 2x - 1</text>

      {/* Metszéspontok */}
      <circle cx="120" cy="122" r="4.5" fill="#7c3aed" stroke="#ffffff" strokeWidth="1.5" />
      <text x="92" y="128" fill="#4c1d95" fontSize="7" fontWeight="bold">P₁(x₁, y₁)</text>

      <circle cx="200" cy="78" r="4.5" fill="#7c3aed" stroke="#ffffff" strokeWidth="1.5" />
      <text x="208" y="85" fill="#4c1d95" fontSize="7" fontWeight="bold">P₂(x₂, y₂)</text>

      {/* Szimmetria emlékeztető */}
      <rect x="25" y="148" width="270" height="24" rx="4" fill="#ffffff" stroke="#ddd6fe" strokeWidth="1" />
      <text x="160" y="164" fill="#5b21b6" fontSize="7.5" fontWeight="bold" textAnchor="middle">
        Szimmetrikus rendszereknél az u² - Su + P = 0 kétszeres gyököket adhat!
      </text>
    </svg>
  );
};

// 5. Érettségi Pontozási Útmutató és Trófea
export const GradingRubricTrophySvg: React.FC<FigureProps> = ({ size = 260, className = '' }) => {
  return (
    <svg
      viewBox="0 0 320 180"
      width={size}
      height={(size * 180) / 320}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`max-w-full h-auto select-none ${className}`}
    >
      <rect x="0" y="0" width="320" height="180" rx="8" fill="#f5f3ff" />

      {/* Cím */}
      <text x="160" y="20" fill="#5b21b6" fontSize="10" fontWeight="black" textAnchor="middle">
        ÉRETTSÉGI JAVÍTÓKULCS ÉS MAXIMÁLIS PONT
      </text>

      {/* Pontozási sávok */}
      <rect x="25" y="32" width="270" height="24" rx="4" fill="#ffffff" stroke="#c4b5fd" strokeWidth="1" />
      <text x="35" y="47" fill="#6d28d9" fontSize="8" fontWeight="bold">1. ÉRTELMEZÉSI TARTOMÁNY / KIKÖTÉS</text>
      <rect x="240" y="36" width="50" height="16" rx="3" fill="#ede9fe" />
      <text x="265" y="48" fill="#5b21b6" fontSize="8" fontWeight="black" textAnchor="middle">2 PONT</text>

      <rect x="25" y="60" width="270" height="24" rx="4" fill="#ffffff" stroke="#c4b5fd" strokeWidth="1" />
      <text x="35" y="75" fill="#6d28d9" fontSize="8" fontWeight="bold">2. HELYES ALGEBRAI ÁTALAKÍTÁS</text>
      <rect x="240" y="64" width="50" height="16" rx="3" fill="#ede9fe" />
      <text x="265" y="76" fill="#5b21b6" fontSize="8" fontWeight="black" textAnchor="middle">4 PONT</text>

      <rect x="25" y="88" width="270" height="24" rx="4" fill="#ffffff" stroke="#c4b5fd" strokeWidth="1" />
      <text x="35" y="103" fill="#6d28d9" fontSize="8" fontWeight="bold">3. HAMIS GYÖKÖK KISZŰRÉSE / PRÓBA</text>
      <rect x="240" y="92" width="50" height="16" rx="3" fill="#ede9fe" />
      <text x="265" y="104" fill="#5b21b6" fontSize="8" fontWeight="black" textAnchor="middle">3 PONT</text>

      <rect x="25" y="116" width="270" height="24" rx="4" fill="#ffffff" stroke="#c4b5fd" strokeWidth="1" />
      <text x="35" y="131" fill="#6d28d9" fontSize="8" fontWeight="bold">4. VÉGSŐ MEGOLDÁSHALMAZ LEZÁRÁSA</text>
      <rect x="240" y="120" width="50" height="16" rx="3" fill="#ede9fe" />
      <text x="265" y="132" fill="#5b21b6" fontSize="8" fontWeight="black" textAnchor="middle">1 PONT</text>

      {/* Összegzés */}
      <rect x="25" y="146" width="270" height="24" rx="4" fill="#7c3aed" />
      <text x="160" y="162" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">
        ÖSSZESEN: 10 / 10 PONT (100% SIKERES TÉMAZÁRÓ)
      </text>
    </svg>
  );
};

