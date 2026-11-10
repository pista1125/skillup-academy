import React from 'react';

interface FigureProps {
  size?: number;
  className?: string;
}

/**
 * 1. A Szöveges Feladat Megoldásának 5 Lépése SVG
 */
export const WordProblemStrategySvg: React.FC<FigureProps> = ({ size = 500, className = '' }) => {
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
        <filter id="stratShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#0F172A" floodOpacity="0.1" />
        </filter>
      </defs>

      {/* Cím csík */}
      <rect x="70" y="8" width="380" height="30" rx="8" fill="#0284C7" />
      <text x="260" y="28" fill="#FFFFFF" fontSize="12.5" fontWeight="900" textAnchor="middle" letterSpacing="0.5">
        SZÖVEGES FELADATOK MEGOLDÁSI STRATÉGIÁJA
      </text>

      {/* 1. Lépés */}
      <rect x="15" y="48" width="92" height="165" rx="10" fill="#F0F9FF" stroke="#38BDF8" strokeWidth="1.5" filter="url(#stratShadow)" />
      <circle cx="61" cy="72" r="13" fill="#0284C7" />
      <text x="61" y="77" fill="#FFFFFF" fontSize="12" fontWeight="bold" textAnchor="middle">1</text>
      <text x="61" y="100" fill="#0369A1" fontSize="10.5" fontWeight="900" textAnchor="middle">Ismeretlen</text>
      <text x="61" y="118" fill="#475569" fontSize="9" textAnchor="middle">Kijelöljük az</text>
      <text x="61" y="130" fill="#475569" fontSize="9" textAnchor="middle">x-et és a</text>
      <text x="61" y="142" fill="#475569" fontSize="9" textAnchor="middle">mértékegységet</text>
      <rect x="23" y="156" width="76" height="22" rx="4" fill="#E0F2FE" />
      <text x="61" y="171" fill="#0284C7" fontSize="9.5" fontWeight="bold" textAnchor="middle">Legyen x = ...</text>

      {/* 2. Lépés */}
      <rect x="115" y="48" width="92" height="165" rx="10" fill="#EEF2FF" stroke="#818CF8" strokeWidth="1.5" filter="url(#stratShadow)" />
      <circle cx="161" cy="72" r="13" fill="#4F46E5" />
      <text x="161" y="77" fill="#FFFFFF" fontSize="12" fontWeight="bold" textAnchor="middle">2</text>
      <text x="161" y="100" fill="#3730A3" fontSize="10.5" fontWeight="900" textAnchor="middle">Modell</text>
      <text x="161" y="118" fill="#475569" fontSize="9" textAnchor="middle">Szöveg átírása</text>
      <text x="161" y="130" fill="#475569" fontSize="9" textAnchor="middle">algebrai</text>
      <text x="161" y="142" fill="#475569" fontSize="9" textAnchor="middle">kifejezésekké</text>
      <rect x="123" y="156" width="76" height="22" rx="4" fill="#E0E7FF" />
      <text x="161" y="171" fill="#4338CA" fontSize="9.5" fontWeight="bold" textAnchor="middle">x + 1, x · y</text>

      {/* 3. Lépés */}
      <rect x="215" y="48" width="92" height="165" rx="10" fill="#FEF3C7" stroke="#FBBF24" strokeWidth="1.5" filter="url(#stratShadow)" />
      <circle cx="261" cy="72" r="13" fill="#D97706" />
      <text x="261" y="77" fill="#FFFFFF" fontSize="12" fontWeight="bold" textAnchor="middle">3</text>
      <text x="261" y="100" fill="#92400E" fontSize="10.5" fontWeight="900" textAnchor="middle">Egyenlet</text>
      <text x="261" y="118" fill="#475569" fontSize="9" textAnchor="middle">0-ra rendezés</text>
      <text x="261" y="130" fill="#475569" fontSize="9" textAnchor="middle">és megoldás</text>
      <text x="261" y="142" fill="#475569" fontSize="9" textAnchor="middle">a képlettel</text>
      <rect x="223" y="156" width="76" height="22" rx="4" fill="#FEF3C7" />
      <text x="261" y="171" fill="#B45309" fontSize="9.5" fontWeight="bold" textAnchor="middle">ax² + bx + c = 0</text>

      {/* 4. Lépés */}
      <rect x="315" y="48" width="92" height="165" rx="10" fill="#FFF1F2" stroke="#FB7185" strokeWidth="1.5" filter="url(#stratShadow)" />
      <circle cx="361" cy="72" r="13" fill="#E11D48" />
      <text x="361" y="77" fill="#FFFFFF" fontSize="12" fontWeight="bold" textAnchor="middle">4</text>
      <text x="361" y="100" fill="#9F1239" fontSize="10.5" fontWeight="900" textAnchor="middle">Szűrés</text>
      <text x="361" y="118" fill="#475569" fontSize="9" textAnchor="middle">Csak reális</text>
      <text x="361" y="130" fill="#475569" fontSize="9" textAnchor="middle">gyökök (pl. k &gt; 0</text>
      <text x="361" y="142" fill="#475569" fontSize="9" textAnchor="middle">darabszám)</text>
      <rect x="323" y="156" width="76" height="22" rx="4" fill="#FFE4E6" />
      <text x="361" y="171" fill="#BE123C" fontSize="9" fontWeight="bold" textAnchor="middle">Hamis gyök ✕</text>

      {/* 5. Lépés */}
      <rect x="415" y="48" width="92" height="165" rx="10" fill="#ECFDF5" stroke="#34D399" strokeWidth="1.5" filter="url(#stratShadow)" />
      <circle cx="461" cy="72" r="13" fill="#059669" />
      <text x="461" y="77" fill="#FFFFFF" fontSize="12" fontWeight="bold" textAnchor="middle">5</text>
      <text x="461" y="100" fill="#065F46" fontSize="10.5" fontWeight="900" textAnchor="middle">Válasz</text>
      <text x="461" y="118" fill="#475569" fontSize="9" textAnchor="middle">Szöveges</text>
      <text x="461" y="130" fill="#475569" fontSize="9" textAnchor="middle">válasz és</text>
      <text x="461" y="142" fill="#475569" fontSize="9" textAnchor="middle">ellenőrzés</text>
      <rect x="423" y="156" width="76" height="22" rx="4" fill="#DCFCE7" />
      <text x="461" y="171" fill="#047857" fontSize="9" fontWeight="bold" textAnchor="middle">Kerek mondat ✓</text>
    </svg>
  );
};

/**
 * 2. Egymást Követő Számok Modellje SVG
 */
export const ConsecutiveNumbersSvg: React.FC<FigureProps> = ({ size = 500, className = '' }) => {
  return (
    <svg
      viewBox="0 0 520 220"
      width={size}
      height={(size * 220) / 520}
      className={`mx-auto select-none ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="consecShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#0F172A" floodOpacity="0.12" />
        </filter>
      </defs>

      {/* Fejléc */}
      <rect x="80" y="8" width="360" height="28" rx="7" fill="#4F46E5" />
      <text x="260" y="27" fill="#FFFFFF" fontSize="12" fontWeight="900" textAnchor="middle">
        EGYMÁST KÖVETŐ SZÁMOK ALGEBRAI MODELLJE
      </text>

      {/* 1. Kártya: Egymást követő egészek */}
      <rect x="15" y="46" width="155" height="160" rx="12" fill="#F8FAFC" stroke="#6366F1" strokeWidth="1.5" filter="url(#consecShadow)" />
      <rect x="25" y="56" width="135" height="24" rx="6" fill="#EEF2FF" />
      <text x="92" y="72" fill="#4338CA" fontSize="10.5" fontWeight="900" textAnchor="middle">Két szomszédos egész</text>
      <text x="92" y="105" fill="#1E1B4B" fontSize="20" fontWeight="900" textAnchor="middle" fontFamily="monospace">
        x &nbsp;és&nbsp; x + 1
      </text>
      <rect x="25" y="125" width="135" height="32" rx="6" fill="#F1F5F9" />
      <text x="92" y="140" fill="#334155" fontSize="10" fontWeight="bold" textAnchor="middle">Szorzatuk:</text>
      <text x="92" y="152" fill="#4F46E5" fontSize="11" fontWeight="900" textAnchor="middle" fontFamily="monospace">x(x + 1) = x² + x</text>
      <text x="92" y="185" fill="#64748B" fontSize="9.5" textAnchor="middle">Pl. 7 és 8 ⟹ 7·8 = 56</text>
      <text x="92" y="197" fill="#64748B" fontSize="9.5" textAnchor="middle">vagy -8 és -7 !</text>

      {/* 2. Kártya: Egymást követő páros számok */}
      <rect x="182" y="46" width="155" height="160" rx="12" fill="#F8FAFC" stroke="#EC4899" strokeWidth="1.5" filter="url(#consecShadow)" />
      <rect x="192" y="56" width="135" height="24" rx="6" fill="#FDF2F8" />
      <text x="259" y="72" fill="#BE185D" fontSize="10.5" fontWeight="900" textAnchor="middle">Szomszédos párosak</text>
      <text x="259" y="105" fill="#831843" fontSize="20" fontWeight="900" textAnchor="middle" fontFamily="monospace">
        x &nbsp;és&nbsp; x + 2
      </text>
      <rect x="192" y="125" width="135" height="32" rx="6" fill="#F1F5F9" />
      <text x="259" y="140" fill="#334155" fontSize="10" fontWeight="bold" textAnchor="middle">Szorzatuk:</text>
      <text x="259" y="152" fill="#DB2777" fontSize="11" fontWeight="900" textAnchor="middle" fontFamily="monospace">x(x + 2) = x² + 2x</text>
      <text x="259" y="185" fill="#64748B" fontSize="9.5" textAnchor="middle">Két páros különbsége</text>
      <text x="259" y="197" fill="#64748B" fontSize="9.5" textAnchor="middle">mindig pontosan 2!</text>

      {/* 3. Kártya: Négyzetösszeg */}
      <rect x="350" y="46" width="155" height="160" rx="12" fill="#F8FAFC" stroke="#F59E0B" strokeWidth="1.5" filter="url(#consecShadow)" />
      <rect x="360" y="56" width="135" height="24" rx="6" fill="#FEF3C7" />
      <text x="427" y="72" fill="#B45309" fontSize="10.5" fontWeight="900" textAnchor="middle">Négyzetek összege</text>
      <text x="427" y="105" fill="#78350F" fontSize="18" fontWeight="900" textAnchor="middle" fontFamily="monospace">
        x² + (x + 1)²
      </text>
      <rect x="360" y="125" width="135" height="32" rx="6" fill="#F1F5F9" />
      <text x="427" y="140" fill="#334155" fontSize="10" fontWeight="bold" textAnchor="middle">Kifejtve:</text>
      <text x="427" y="152" fill="#D97706" fontSize="11" fontWeight="900" textAnchor="middle" fontFamily="monospace">2x² + 2x + 1</text>
      <text x="427" y="185" fill="#64748B" fontSize="9.5" textAnchor="middle">Pl. 3² + 4² = 9 + 16 = 25</text>
      <text x="427" y="197" fill="#64748B" fontSize="9.5" textAnchor="middle">vagy (-4)² + (-3)² = 25</text>
    </svg>
  );
};

/**
 * 3. Szám és Reciproka Összefüggése SVG
 */
export const ReciprocalProblemSvg: React.FC<FigureProps> = ({ size = 500, className = '' }) => {
  return (
    <svg
      viewBox="0 0 520 220"
      width={size}
      height={(size * 220) / 520}
      className={`mx-auto select-none ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="recipShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#0F172A" floodOpacity="0.12" />
        </filter>
      </defs>

      {/* Sötét Kártya alap */}
      <rect x="15" y="10" width="490" height="200" rx="16" fill="#0F172A" stroke="#1E293B" strokeWidth="2" filter="url(#recipShadow)" />

      {/* Cím doboz */}
      <rect x="110" y="20" width="300" height="26" rx="6" fill="#0284C7" fillOpacity="0.2" stroke="#38BDF8" strokeWidth="1" />
      <text x="260" y="37" fill="#7DD3FC" fontSize="12" fontWeight="900" textAnchor="middle">
        SZÁM ÉS RECIPROKÁNAK ÖSSZEGE: x + 1/x = s
      </text>

      {/* Egyenlet felírás vizuálisan */}
      <rect x="35" y="58" width="450" height="52" rx="10" fill="#1E293B" stroke="#334155" />
      <text x="260" y="91" fill="#F8FAFC" fontSize="22" fontWeight="900" textAnchor="middle" fontFamily="monospace">
        x + 1/x = 2,5 &nbsp; (x ≠ 0)
      </text>

      {/* Nyíl lefelé beszorzás x-szel */}
      <path d="M 260 110 L 260 124" stroke="#F59E0B" strokeWidth="2" />
      <text x="290" y="120" fill="#FBBF24" fontSize="10.5" fontWeight="bold">· x (és · 2)</text>

      {/* Kanonikus alak */}
      <rect x="35" y="126" width="215" height="68" rx="10" fill="#1E293B" stroke="#10B981" strokeWidth="1.5" />
      <text x="142" y="148" fill="#A7F3D0" fontSize="11" fontWeight="bold" textAnchor="middle">Kanonikus alak:</text>
      <text x="142" y="174" fill="#34D399" fontSize="16" fontWeight="900" textAnchor="middle" fontFamily="monospace">
        2x² - 5x + 2 = 0
      </text>

      {/* Két gyök és szimmetria */}
      <rect x="270" y="126" width="215" height="68" rx="10" fill="#1E293B" stroke="#3B82F6" strokeWidth="1.5" />
      <text x="377" y="148" fill="#93C5FD" fontSize="11" fontWeight="bold" textAnchor="middle">Kölcsönös gyökpár:</text>
      <text x="377" y="174" fill="#60A5FA" fontSize="16" fontWeight="900" textAnchor="middle" fontFamily="monospace">
        x₁ = 2 &nbsp;és&nbsp; x₂ = 1/2
      </text>
    </svg>
  );
};

/**
 * 4. Osztozkodási / Költségmegosztási Probléma Modellje SVG
 */
export const SharingCostProblemSvg: React.FC<FigureProps> = ({ size = 500, className = '' }) => {
  return (
    <svg
      viewBox="0 0 520 220"
      width={size}
      height={(size * 220) / 520}
      className={`mx-auto select-none ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="shareShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#0F172A" floodOpacity="0.1" />
        </filter>
      </defs>

      {/* Fejléc */}
      <rect x="70" y="8" width="380" height="30" rx="8" fill="#D97706" />
      <text x="260" y="28" fill="#FFFFFF" fontSize="12.5" fontWeight="900" textAnchor="middle">
        OSZTOZKODÁSI FELADATOK TÁBLÁZATOS MODELLJE
      </text>

      {/* Bal oszlop: Eredeti terv */}
      <rect x="25" y="48" width="220" height="155" rx="12" fill="#FFFBEB" stroke="#FBBF24" strokeWidth="1.5" filter="url(#shareShadow)" />
      <rect x="35" y="56" width="200" height="24" rx="6" fill="#FDE68A" />
      <text x="135" y="72" fill="#92400E" fontSize="11" fontWeight="900" textAnchor="middle">1. EREDETI TERV</text>
      <text x="135" y="102" fill="#475569" fontSize="11" textAnchor="middle">Létszám: <tspan fontWeight="900" fill="#0F172A">x fő</tspan></text>
      <text x="135" y="122" fill="#475569" fontSize="11" textAnchor="middle">Összköltség: <tspan fontWeight="900" fill="#0F172A">60 000 Ft</tspan></text>
      <rect x="35" y="136" width="200" height="34" rx="6" fill="#FEF3C7" />
      <text x="135" y="152" fill="#B45309" fontSize="10" textAnchor="middle">Fejenkénti díj:</text>
      <text x="135" y="165" fill="#78350F" fontSize="12" fontWeight="900" textAnchor="middle" fontFamily="monospace">60 000 / x Ft</text>

      {/* Jobb oszlop: Tényleges utazás */}
      <rect x="275" y="48" width="220" height="155" rx="12" fill="#EFF6FF" stroke="#60A5FA" strokeWidth="1.5" filter="url(#shareShadow)" />
      <rect x="285" y="56" width="200" height="24" rx="6" fill="#DBEAFE" />
      <text x="385" y="72" fill="#1E40AF" fontSize="11" fontWeight="900" textAnchor="middle">2. TÉNYLEGESEN (2 fő lemondta)</text>
      <text x="385" y="102" fill="#475569" fontSize="11" textAnchor="middle">Létszám: <tspan fontWeight="900" fill="#0F172A">x - 2 fő</tspan></text>
      <text x="385" y="122" fill="#475569" fontSize="11" textAnchor="middle">Összköltség: <tspan fontWeight="900" fill="#0F172A">60 000 Ft</tspan></text>
      <rect x="285" y="136" width="200" height="34" rx="6" fill="#DBEAFE" />
      <text x="385" y="152" fill="#1D4ED8" fontSize="10" textAnchor="middle">Új fejenkénti díj:</text>
      <text x="385" y="165" fill="#1E3A8A" fontSize="12" fontWeight="900" textAnchor="middle" fontFamily="monospace">60 000 / (x - 2) Ft</text>

      {/* Középső egyenletösszekötő nyíl */}
      <text x="260" y="130" fill="#DC2626" fontSize="16" fontWeight="900" textAnchor="middle">-</text>
    </svg>
  );
};

