import React from 'react';

interface FigureProps {
  size?: number;
  className?: string;
}

/**
 * 1. Bikvadratikus Egyenlet Helyettesítése SVG
 * ax⁴ + bx² + c = 0 ⟹ u = x² folyamatábra
 */
export const BiquadraticSubstitutionSvg: React.FC<FigureProps> = ({ size = 500, className = '' }) => {
  return (
    <svg
      viewBox="0 0 520 250"
      width={size}
      height={(size * 250) / 520}
      className={`mx-auto select-none ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="biqShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#0F172A" floodOpacity="0.08" />
        </filter>
        <linearGradient id="biqGrad1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ECFEFF" />
          <stop offset="100%" stopColor="#CFFAFE" />
        </linearGradient>
      </defs>

      {/* Cím csík */}
      <rect x="70" y="8" width="380" height="28" rx="8" fill="#0891B2" />
      <text x="260" y="27" fill="#FFFFFF" fontSize="12" fontWeight="900" textAnchor="middle" letterSpacing="0.5">
        BIKVADRATIKUS EGYENLET (u = x² HELYETTESÍTÉSSEL)
      </text>

      {/* 1. Lépés: Eredeti negyedfokú egyenlet */}
      <g filter="url(#biqShadow)">
        <rect x="20" y="52" width="135" height="175" rx="10" fill="#F8FAFC" stroke="#0891B2" strokeWidth="1.5" />
        <rect x="28" y="60" width="119" height="22" rx="5" fill="#0891B2" />
        <text x="87" y="75" fill="#FFFFFF" fontSize="10" fontWeight="bold" textAnchor="middle">1. Eredeti alak</text>

        <rect x="28" y="90" width="119" height="34" rx="6" fill="#ECFEFF" />
        <text x="87" y="112" fill="#0E7490" fontSize="11" fontWeight="900" textAnchor="middle" fontFamily="monospace">
          ax⁴ + bx² + c = 0
        </text>

        <text x="87" y="145" fill="#334155" fontSize="8.5" textAnchor="middle">Negyedfokú, de csak</text>
        <text x="87" y="157" fill="#334155" fontSize="8.5" textAnchor="middle">páros kitevők</text>
        <text x="87" y="169" fill="#334155" fontSize="8.5" textAnchor="middle">szerepelnek benne!</text>

        <rect x="28" y="180" width="119" height="34" rx="5" fill="#E0F2FE" />
        <text x="87" y="195" fill="#0369A1" fontSize="9" fontWeight="bold" textAnchor="middle">Új ismeretlen:</text>
        <text x="87" y="207" fill="#0369A1" fontSize="10" fontWeight="900" textAnchor="middle" fontFamily="monospace">u = x²  (u ≥ 0)</text>
      </g>

      {/* Nyíl 1 */}
      <path d="M 160 135 L 185 135" stroke="#0891B2" strokeWidth="2.5" />
      <polygon points="190,135 183,131 183,139" fill="#0891B2" />

      {/* 2. Lépés: Másodfokú egyenlet u-ra */}
      <g filter="url(#biqShadow)">
        <rect x="195" y="52" width="135" height="175" rx="10" fill="#F8FAFC" stroke="#6366F1" strokeWidth="1.5" />
        <rect x="203" y="60" width="119" height="22" rx="5" fill="#6366F1" />
        <text x="262" y="75" fill="#FFFFFF" fontSize="10" fontWeight="bold" textAnchor="middle">2. Megoldás u-ra</text>

        <rect x="203" y="90" width="119" height="34" rx="6" fill="#EEF2FF" />
        <text x="262" y="112" fill="#4338CA" fontSize="11" fontWeight="900" textAnchor="middle" fontFamily="monospace">
          au² + bu + c = 0
        </text>

        <text x="262" y="145" fill="#334155" fontSize="8.5" textAnchor="middle">Kiszámítjuk a</text>
        <text x="262" y="157" fill="#334155" fontSize="8.5" textAnchor="middle">megoldóképlettel:</text>
        <rect x="208" y="165" width="109" height="20" rx="4" fill="#FFFFFF" stroke="#C7D2FE" />
        <text x="262" y="179" fill="#4F46E5" fontSize="9.5" fontWeight="bold" textAnchor="middle" fontFamily="monospace">u₁,₂ = (-b ± √D)/(2a)</text>

        <rect x="203" y="192" width="119" height="24" rx="5" fill="#FEF3C7" />
        <text x="262" y="208" fill="#92400E" fontSize="8.5" fontWeight="bold" textAnchor="middle">Csak u ≥ 0 jó x-hez!</text>
      </g>

      {/* Nyíl 2 */}
      <path d="M 335 135 L 360 135" stroke="#6366F1" strokeWidth="2.5" />
      <polygon points="365,135 358,131 358,139" fill="#6366F1" />

      {/* 3. Lépés: Visszatérés x-hez */}
      <g filter="url(#biqShadow)">
        <rect x="370" y="52" width="135" height="175" rx="10" fill="#F8FAFC" stroke="#10B981" strokeWidth="1.5" />
        <rect x="378" y="60" width="119" height="22" rx="5" fill="#10B981" />
        <text x="437" y="75" fill="#FFFFFF" fontSize="10" fontWeight="bold" textAnchor="middle">3. Gyökvonás x-re</text>

        <rect x="378" y="90" width="119" height="34" rx="6" fill="#ECFDF5" />
        <text x="437" y="112" fill="#047857" fontSize="11" fontWeight="900" textAnchor="middle" fontFamily="monospace">
          x = ±√u
        </text>

        <text x="437" y="142" fill="#047857" fontSize="8.5" fontWeight="bold" textAnchor="middle">• Ha u &gt; 0: 2 db gyök</text>
        <text x="437" y="156" fill="#B45309" fontSize="8.5" fontWeight="bold" textAnchor="middle">• Ha u = 0: 1 db gyök (0)</text>
        <text x="437" y="170" fill="#B91C1C" fontSize="8.5" fontWeight="bold" textAnchor="middle">• Ha u &lt; 0: nincs gyök</text>

        <rect x="378" y="180" width="119" height="36" rx="5" fill="#DCFCE7" />
        <text x="437" y="196" fill="#15803D" fontSize="8.5" fontWeight="bold" textAnchor="middle">Összes valós gyök:</text>
        <text x="437" y="209" fill="#15803D" fontSize="10" fontWeight="900" textAnchor="middle">0, 1, 2, 3 vagy 4 db</text>
      </g>
    </svg>
  );
};

/**
 * 2. Törtes Egyenlet és Hamis Gyökök Szűrése SVG
 */
export const FractionalCheckTreeSvg: React.FC<FigureProps> = ({ size = 500, className = '' }) => {
  return (
    <svg
      viewBox="0 0 520 230"
      width={size}
      height={(size * 230) / 520}
      className={`mx-auto select-none ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="fracShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#0F172A" floodOpacity="0.08" />
        </filter>
      </defs>

      {/* Cím csík */}
      <rect x="70" y="8" width="380" height="28" rx="8" fill="#2563EB" />
      <text x="260" y="27" fill="#FFFFFF" fontSize="12" fontWeight="900" textAnchor="middle" letterSpacing="0.5">
        TÖRTES EGYENLET ÉS KIKÖTÉSEK ELLENŐRZÉSE
      </text>

      {/* Fő folyamat dobozok */}
      {/* 1. Lépés: Kikötés */}
      <g filter="url(#fracShadow)">
        <rect x="20" y="52" width="145" height="155" rx="10" fill="#FEF2F2" stroke="#EF4444" strokeWidth="1.5" />
        <rect x="28" y="60" width="129" height="22" rx="5" fill="#DC2626" />
        <text x="92" y="75" fill="#FFFFFF" fontSize="10" fontWeight="bold" textAnchor="middle">1. Kikötés (Kötelező!)</text>

        <rect x="28" y="90" width="129" height="28" rx="6" fill="#FFFFFF" />
        <text x="92" y="108" fill="#991B1B" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
          Nevező ≠ 0
        </text>

        <text x="92" y="135" fill="#7F1D1D" fontSize="8.5" textAnchor="middle">Példa: (x - 2) a nevezőben</text>
        <text x="92" y="148" fill="#B91C1C" fontSize="9" fontWeight="bold" textAnchor="middle">⟹ x ≠ 2</text>
        <text x="92" y="165" fill="#475569" fontSize="8" textAnchor="middle">Minden tiltott értéket</text>
        <text x="92" y="177" fill="#475569" fontSize="8" textAnchor="middle">előre feljegyzünk!</text>
      </g>

      {/* Nyíl 1 */}
      <path d="M 170 130 L 195 130" stroke="#475569" strokeWidth="2" />
      <polygon points="199,130 192,126 192,134" fill="#475569" />

      {/* 2. Lépés: Beszorzás és megoldás */}
      <g filter="url(#fracShadow)">
        <rect x="205" y="52" width="145" height="155" rx="10" fill="#F8FAFC" stroke="#3B82F6" strokeWidth="1.5" />
        <rect x="213" y="60" width="129" height="22" rx="5" fill="#2563EB" />
        <text x="277" y="75" fill="#FFFFFF" fontSize="10" fontWeight="bold" textAnchor="middle">2. Megoldás</text>

        <text x="277" y="100" fill="#1E40AF" fontSize="8.5" fontWeight="bold" textAnchor="middle">Beszorzás közös nevezővel</text>
        <rect x="213" y="108" width="129" height="28" rx="5" fill="#EFF6FF" />
        <text x="277" y="126" fill="#1D4ED8" fontSize="10" fontWeight="900" textAnchor="middle" fontFamily="monospace">
          ax² + bx + c = 0
        </text>

        <text x="277" y="153" fill="#334155" fontSize="8.5" textAnchor="middle">A megoldóképlet</text>
        <text x="277" y="165" fill="#334155" fontSize="8.5" textAnchor="middle">gyökei:</text>
        <text x="277" y="180" fill="#1E40AF" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="monospace">x₁ = 2,  x₂ = 5</text>
      </g>

      {/* Nyíl 2 */}
      <path d="M 355 130 L 380 130" stroke="#475569" strokeWidth="2" />
      <polygon points="384,130 377,126 377,134" fill="#475569" />

      {/* 3. Lépés: Szűrés */}
      <g filter="url(#fracShadow)">
        <rect x="390" y="52" width="115" height="155" rx="10" fill="#F0FDF4" stroke="#16A34A" strokeWidth="1.5" />
        <rect x="396" y="60" width="103" height="22" rx="5" fill="#16A34A" />
        <text x="447" y="75" fill="#FFFFFF" fontSize="9.5" fontWeight="bold" textAnchor="middle">3. Összevetés</text>

        {/* x1 = 2 Hamis */}
        <rect x="396" y="90" width="103" height="42" rx="5" fill="#FEE2E2" stroke="#FCA5A5" strokeWidth="1" />
        <text x="447" y="106" fill="#991B1B" fontSize="9" fontWeight="900" textAnchor="middle">x₁ = 2: HAMIS!</text>
        <text x="447" y="120" fill="#7F1D1D" fontSize="7.5" textAnchor="middle">Kizárva (x ≠ 2 miatt)</text>

        {/* x2 = 5 Érvényes */}
        <rect x="396" y="140" width="103" height="52" rx="5" fill="#DCFCE7" stroke="#86EFAC" strokeWidth="1" />
        <text x="447" y="158" fill="#166534" fontSize="9.5" fontWeight="900" textAnchor="middle">x₂ = 5: VALÓS</text>
        <text x="447" y="172" fill="#15803D" fontSize="8" fontWeight="bold" textAnchor="middle">Megoldáshalmaz:</text>
        <text x="447" y="185" fill="#15803D" fontSize="9.5" fontWeight="900" textAnchor="middle" fontFamily="monospace">M = {'{ 5 }'}</text>
      </g>
    </svg>
  );
};

/**
 * 3. Négyzetgyökös Egyenlet és Ellenőrzés SVG
 */
export const SquareRootEquationCheckSvg: React.FC<FigureProps> = ({ size = 500, className = '' }) => {
  return (
    <svg
      viewBox="0 0 520 210"
      width={size}
      height={(size * 210) / 520}
      className={`mx-auto select-none ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="sqrtShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#0F172A" floodOpacity="0.08" />
        </filter>
      </defs>

      {/* Cím csík */}
      <rect x="70" y="8" width="380" height="26" rx="6" fill="#D97706" />
      <text x="260" y="25" fill="#FFFFFF" fontSize="11.5" fontWeight="900" textAnchor="middle" letterSpacing="0.5">
        NÉGYZETGYÖKÖS EGYENLET ÉS NÉGYZETRE EMELÉS
      </text>

      {/* Bal oldal: Izolálás és kikötés */}
      <g filter="url(#sqrtShadow)">
        <rect x="25" y="46" width="225" height="150" rx="10" fill="#FFFBEB" stroke="#F59E0B" strokeWidth="1.5" />
        <rect x="35" y="54" width="205" height="22" rx="5" fill="#D97706" />
        <text x="137" y="69" fill="#FFFFFF" fontSize="10.5" fontWeight="bold" textAnchor="middle">
          1. Gyök izolálása és feltételek
        </text>

        <rect x="35" y="84" width="205" height="28" rx="5" fill="#FFFFFF" />
        <text x="137" y="102" fill="#B45309" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
          √(x + 5) = x - 1
        </text>

        <text x="42" y="126" fill="#92400E" fontSize="8.5" fontWeight="bold">• Gyök alatti tag ≥ 0: x ≥ -5</text>
        <text x="42" y="140" fill="#B91C1C" fontSize="8.5" fontWeight="bold">• Jobb oldal ≥ 0: x - 1 ≥ 0 ⟹ x ≥ 1</text>
        <text x="42" y="156" fill="#475569" fontSize="8">Mivel a négyzetgyök értéke soha</text>
        <text x="42" y="168" fill="#475569" fontSize="8">nem negatív, a jobb oldal sem lehet az!</text>
      </g>

      {/* Jobb oldal: Négyzetre emelés és hamis gyök */}
      <g filter="url(#sqrtShadow)">
        <rect x="270" y="46" width="225" height="150" rx="10" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.5" />
        <rect x="280" y="54" width="205" height="22" rx="5" fill="#475569" />
        <text x="382" y="69" fill="#FFFFFF" fontSize="10.5" fontWeight="bold" textAnchor="middle">
          2. Négyzetre emelés és szűrés
        </text>

        <text x="285" y="92" fill="#334155" fontSize="8.5" fontFamily="monospace">x + 5 = (x - 1)² = x² - 2x + 1</text>
        <text x="285" y="108" fill="#1E40AF" fontSize="9.5" fontWeight="bold" fontFamily="monospace">x² - 3x - 4 = 0</text>
        <text x="285" y="124" fill="#334155" fontSize="8.5">Gyökök: x₁ = 4,  x₂ = -1</text>

        {/* Ellenőrzés doboz */}
        <rect x="280" y="132" width="205" height="52" rx="6" fill="#FEF2F2" stroke="#FCA5A5" strokeWidth="1" />
        <text x="288" y="148" fill="#15803D" fontSize="8.5" fontWeight="bold">x₁ = 4: √9 = 3 (jó!)</text>
        <text x="288" y="164" fill="#DC2626" fontSize="8.5" fontWeight="bold">x₂ = -1: √4 ≠ -2 (HAMIS GYÖK!)</text>
        <text x="288" y="178" fill="#991B1B" fontSize="8" fontStyle="italic">A négyzetre emelés nem ekvivalens lépés!</text>
      </g>
    </svg>
  );
};

/**
 * 4. Szorzattá Alakítás Magasabb Fokszámú Egyenleteknél SVG
 */
export const PolynomialFactoringSvg: React.FC<FigureProps> = ({ size = 500, className = '' }) => {
  return (
    <svg
      viewBox="0 0 520 200"
      width={size}
      height={(size * 200) / 520}
      className={`mx-auto select-none ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="polyFactShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#0F172A" floodOpacity="0.08" />
        </filter>
      </defs>

      {/* Cím csík */}
      <rect x="70" y="8" width="380" height="26" rx="6" fill="#7C3AED" />
      <text x="260" y="25" fill="#FFFFFF" fontSize="11.5" fontWeight="900" textAnchor="middle" letterSpacing="0.5">
        SZORZATTÁ ALAKÍTÁS: x KIEMELÉSE ÉS CSOPORTOSÍTÁS
      </text>

      {/* 1. Mód: x Kiemelése */}
      <g filter="url(#polyFactShadow)">
        <rect x="25" y="44" width="225" height="142" rx="10" fill="#F5F3FF" stroke="#A78BFA" strokeWidth="1.5" />
        <rect x="35" y="52" width="205" height="22" rx="5" fill="#7C3AED" />
        <text x="137" y="67" fill="#FFFFFF" fontSize="10.5" fontWeight="bold" textAnchor="middle">
          1. Tagokból x kiemelése
        </text>

        <rect x="35" y="82" width="205" height="26" rx="5" fill="#FFFFFF" />
        <text x="137" y="99" fill="#5B21B6" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
          x³ - 9x = 0 ⟹ x(x² - 9) = 0
        </text>

        <text x="42" y="124" fill="#334155" fontSize="8.5">Egy szorzat akkor nulla, ha:</text>
        <text x="42" y="138" fill="#15803D" fontSize="9" fontWeight="bold">1) x₁ = 0</text>
        <text x="42" y="152" fill="#15803D" fontSize="9" fontWeight="bold">2) x² - 9 = 0 ⟹ x₂,₃ = ±3</text>
        <text x="42" y="170" fill="#6D28D9" fontSize="8" fontStyle="italic">Három valós gyök van: {'{ -3; 0; 3 }'}.</text>
      </g>

      {/* 2. Mód: Csoportosítás páronként */}
      <g filter="url(#polyFactShadow)">
        <rect x="270" y="44" width="225" height="142" rx="10" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.5" />
        <rect x="280" y="52" width="205" height="22" rx="5" fill="#4B5563" />
        <text x="382" y="67" fill="#FFFFFF" fontSize="10.5" fontWeight="bold" textAnchor="middle">
          2. Csoportosítás páronként
        </text>

        <rect x="280" y="82" width="205" height="26" rx="5" fill="#FFFFFF" />
        <text x="382" y="99" fill="#1E293B" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
          x³ - 2x² - x + 2 = 0
        </text>

        <text x="287" y="122" fill="#334155" fontSize="8.5" fontFamily="monospace">x²(x - 2) - 1(x - 2) = 0</text>
        <text x="287" y="138" fill="#047857" fontSize="8.5" fontWeight="bold" fontFamily="monospace">(x - 2)(x² - 1) = 0</text>
        <text x="287" y="154" fill="#15803D" fontSize="9" fontWeight="bold">Gyökök: x₁ = 2,  x₂,₃ = ±1</text>
        <text x="287" y="170" fill="#475569" fontSize="8" fontStyle="italic">Két külön tényezőre bontható szorzat!</text>
      </g>
    </svg>
  );
};

