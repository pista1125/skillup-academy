import React from 'react';

interface FigureProps {
  size?: number;
  className?: string;
}

/**
 * 1. A Megoldóképlet Anatómiája SVG
 * Részletesen megmutatja a képlet részeit: -b, ±, √(b² - 4ac), 2a magyarázatokkal.
 */
export const FormulaAnatomySvg: React.FC<FigureProps> = ({ size = 500, className = '' }) => {
  return (
    <svg
      viewBox="0 0 520 280"
      width={size}
      height={(size * 280) / 520}
      className={`mx-auto select-none ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="formulaCardBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1E293B" />
          <stop offset="100%" stopColor="#0F172A" />
        </linearGradient>
        <filter id="cardShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="8" stdDeviation="8" floodColor="#0F172A" floodOpacity="0.25" />
        </filter>
      </defs>

      {/* Sötét prémium alap kártya */}
      <rect
        x="15"
        y="15"
        width="490"
        height="250"
        rx="20"
        fill="url(#formulaCardBg)"
        stroke="#334155"
        strokeWidth="2"
        filter="url(#cardShadow)"
      />

      {/* Cím doboz */}
      <rect x="140" y="24" width="240" height="26" rx="8" fill="#3B82F6" fillOpacity="0.2" stroke="#60A5FA" strokeWidth="1" />
      <text x="260" y="42" fill="#93C5FD" fontSize="12" fontWeight="bold" textAnchor="middle" letterSpacing="0.5">
        A MÁSODFOKÚ EGYENLET MEGOLDÓKÉPLETE
      </text>

      {/* Bal oldali egyenlet felirat: x₁,₂ = */}
      <text x="85" y="145" fill="#F8FAFC" fontSize="34" fontWeight="900" textAnchor="middle" fontFamily="monospace">
        x₁,₂ =
      </text>

      {/* Főtört vonal */}
      <line x1="145" y1="135" x2="475" y2="135" stroke="#F8FAFC" strokeWidth="4" strokeLinecap="round" />

      {/* SZÁMLÁLÓ: -b */}
      <rect x="155" y="80" width="55" height="42" rx="8" fill="#EF4444" fillOpacity="0.25" stroke="#F87171" strokeWidth="1.5" />
      <text x="182" y="112" fill="#FCA5A5" fontSize="28" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
        -b
      </text>

      {/* SZÁMLÁLÓ: ± */}
      <text x="235" y="112" fill="#F8FAFC" fontSize="28" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
        ±
      </text>

      {/* SZÁMLÁLÓ: √(b² - 4ac) */}
      <rect x="265" y="75" width="200" height="50" rx="10" fill="#EAB308" fillOpacity="0.2" stroke="#FACC15" strokeWidth="1.5" />
      
      {/* Gyökjel grafika */}
      <path
        d="M 275 110 L 282 110 L 290 122 L 302 85 L 458 85 L 458 92"
        stroke="#FDE047"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <text x="375" y="112" fill="#FEF08A" fontSize="24" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
        b² - 4ac
      </text>

      {/* NEVEZŐ: 2a */}
      <rect x="280" y="152" width="60" height="42" rx="8" fill="#10B981" fillOpacity="0.25" stroke="#34D399" strokeWidth="1.5" />
      <text x="310" y="184" fill="#6EE7B7" fontSize="28" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
        2a
      </text>

      {/* Magyarázó címkék és nyilak */}
      {/* 1. -b felirat */}
      <path d="M 182 80 L 182 60" stroke="#F87171" strokeWidth="1.5" strokeDasharray="3 3" />
      <text x="182" y="55" fill="#FCA5A5" fontSize="11" fontWeight="bold" textAnchor="middle">
        b ellentettje!
      </text>

      {/* 2. ± felirat */}
      <text x="235" y="65" fill="#CBD5E1" fontSize="10" textAnchor="middle">
        2 ág (+ és -)
      </text>

      {/* 3. Diszkrimináns (D) címke */}
      <path d="M 375 75 L 375 60" stroke="#FACC15" strokeWidth="1.5" strokeDasharray="3 3" />
      <text x="375" y="55" fill="#FDE047" fontSize="11" fontWeight="900" textAnchor="middle">
        Diszkrimináns (D = b² - 4ac)
      </text>

      {/* 4. 2a címke alul */}
      <path d="M 310 194 L 310 212" stroke="#34D399" strokeWidth="1.5" strokeDasharray="3 3" />
      <text x="310" y="226" fill="#6EE7B7" fontSize="11" fontWeight="bold" textAnchor="middle">
        Nevező: mindig 2 · a (nem csak a!)
      </text>

      {/* Alsó megjegyzés csík */}
      <rect x="35" y="235" width="450" height="20" rx="6" fill="#1E293B" />
      <text x="260" y="249" fill="#94A3B8" fontSize="10.5" fontWeight="bold" textAnchor="middle">
        Feltétel: ax² + bx + c = 0 egyenlet, ahol a, b, c ∈ ℝ és a ≠ 0 kötelező!
      </text>
    </svg>
  );
};

/**
 * 2. A Megoldóképlet 6 Lépéses Levezetése SVG (4a-s szorzási módszer)
 */
export const DerivationStepsTreeSvg: React.FC<FigureProps> = ({ size = 500, className = '' }) => {
  return (
    <svg
      viewBox="0 0 500 320"
      width={size}
      height={(size * 320) / 500}
      className={`mx-auto select-none ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="derivShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#0F172A" floodOpacity="0.1" />
        </filter>
      </defs>

      {/* Fejléc */}
      <rect x="80" y="8" width="340" height="34" rx="8" fill="#4F46E5" />
      <text x="250" y="30" fill="#FFFFFF" fontSize="13" fontWeight="900" textAnchor="middle">
        A MEGOLDÓKÉPLET LEVEZETÉSE 4a-VAL VALÓ SZORZÁSSAL
      </text>

      {/* 1. Lépés: Kiindulás */}
      <rect x="25" y="52" width="210" height="52" rx="10" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="1.5" filter="url(#derivShadow)" />
      <circle cx="45" cy="78" r="12" fill="#64748B" />
      <text x="45" y="83" fill="#FFFFFF" fontSize="12" fontWeight="bold" textAnchor="middle">1</text>
      <text x="135" y="72" fill="#475569" fontSize="10" fontWeight="bold" textAnchor="middle">Kanonikus alak:</text>
      <text x="135" y="92" fill="#0F172A" fontSize="13" fontWeight="900" textAnchor="middle" fontFamily="monospace">
        ax² + bx + c = 0
      </text>

      {/* Nyíl 1 -> 2 */}
      <path d="M 235 78 L 265 78" stroke="#4F46E5" strokeWidth="2.5" markerEnd="url(#arrow)" />
      <text x="250" y="70" fill="#4F46E5" fontSize="11" fontWeight="bold" textAnchor="middle">· 4a</text>

      {/* 2. Lépés: Beszorzás 4a-val */}
      <rect x="265" y="52" width="210" height="52" rx="10" fill="#EEF2FF" stroke="#6366F1" strokeWidth="1.5" filter="url(#derivShadow)" />
      <circle cx="285" cy="78" r="12" fill="#4F46E5" />
      <text x="285" y="83" fill="#FFFFFF" fontSize="12" fontWeight="bold" textAnchor="middle">2</text>
      <text x="375" y="72" fill="#4338CA" fontSize="10" fontWeight="bold" textAnchor="middle">Nincsenek törtek!</text>
      <text x="375" y="92" fill="#312E81" fontSize="12.5" fontWeight="900" textAnchor="middle" fontFamily="monospace">
        4a²x² + 4abx + 4ac = 0
      </text>

      {/* Nyíl 2 -> 3 lefelé */}
      <path d="M 370 104 L 370 120" stroke="#6366F1" strokeWidth="2.5" />

      {/* 3. Lépés: Teljes négyzet észrevétele */}
      <rect x="265" y="120" width="210" height="56" rx="10" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="1.5" filter="url(#derivShadow)" />
      <circle cx="285" cy="148" r="12" fill="#D97706" />
      <text x="285" y="153" fill="#FFFFFF" fontSize="12" fontWeight="bold" textAnchor="middle">3</text>
      <text x="375" y="140" fill="#92400E" fontSize="10" fontWeight="bold" textAnchor="middle">(2ax + b)² kifejtése:</text>
      <text x="375" y="162" fill="#78350F" fontSize="12" fontWeight="900" textAnchor="middle" fontFamily="monospace">
        (2ax + b)² - b² + 4ac = 0
      </text>

      {/* Nyíl 3 -> 4 balra */}
      <path d="M 265 148 L 235 148" stroke="#D97706" strokeWidth="2.5" />
      <text x="250" y="142" fill="#B45309" fontSize="10" fontWeight="bold" textAnchor="middle">+b²-4ac</text>

      {/* 4. Lépés: Átrendezés */}
      <rect x="25" y="120" width="210" height="56" rx="10" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="1.5" filter="url(#derivShadow)" />
      <circle cx="45" cy="148" r="12" fill="#D97706" />
      <text x="45" y="153" fill="#FFFFFF" fontSize="12" fontWeight="bold" textAnchor="middle">4</text>
      <text x="135" y="140" fill="#92400E" fontSize="10" fontWeight="bold" textAnchor="middle">Jobb oldalra rendezve:</text>
      <text x="135" y="162" fill="#78350F" fontSize="13" fontWeight="900" textAnchor="middle" fontFamily="monospace">
        (2ax + b)² = b² - 4ac
      </text>

      {/* Nyíl 4 -> 5 lefelé */}
      <path d="M 130 176 L 130 192" stroke="#D97706" strokeWidth="2.5" />

      {/* 5. Lépés: Négyzetgyökvonás */}
      <rect x="25" y="192" width="210" height="56" rx="10" fill="#ECFDF5" stroke="#10B981" strokeWidth="1.5" filter="url(#derivShadow)" />
      <circle cx="45" cy="220" r="12" fill="#059669" />
      <text x="45" y="225" fill="#FFFFFF" fontSize="12" fontWeight="bold" textAnchor="middle">5</text>
      <text x="135" y="212" fill="#065F46" fontSize="10" fontWeight="bold" textAnchor="middle">Gyökvonás (ha D ≥ 0):</text>
      <text x="135" y="234" fill="#064E3B" fontSize="13" fontWeight="900" textAnchor="middle" fontFamily="monospace">
        2ax + b = ±√(b² - 4ac)
      </text>

      {/* Nyíl 5 -> 6 jobbra */}
      <path d="M 235 220 L 265 220" stroke="#059669" strokeWidth="2.5" />
      <text x="250" y="212" fill="#047857" fontSize="10" fontWeight="bold" textAnchor="middle">-b, :2a</text>

      {/* 6. Lépés: Végeredmény (Megoldóképlet) */}
      <rect x="265" y="192" width="210" height="56" rx="10" fill="#1E293B" stroke="#3B82F6" strokeWidth="2" filter="url(#derivShadow)" />
      <circle cx="285" cy="220" r="12" fill="#3B82F6" />
      <text x="285" y="225" fill="#FFFFFF" fontSize="12" fontWeight="bold" textAnchor="middle">6</text>
      <text x="375" y="212" fill="#93C5FD" fontSize="10.5" fontWeight="bold" textAnchor="middle">A KÉSZ MEGOLDÓKÉPLET:</text>
      <text x="375" y="236" fill="#F8FAFC" fontSize="13" fontWeight="900" textAnchor="middle" fontFamily="monospace">
        x₁,₂ = (-b ± √D) / (2a)
      </text>

      {/* Alsó didaktikai összegzés */}
      <rect x="25" y="262" width="450" height="46" rx="10" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="1" />
      <text x="250" y="282" fill="#334155" fontSize="11" fontWeight="bold" textAnchor="middle">
        💡 Miért pont 4a-val szorzunk? Mert (2ax)² = 4a²x², így az első tag azonnal teljes négyzet,
      </text>
      <text x="250" y="298" fill="#475569" fontSize="10.5" textAnchor="middle">
        a második tag (4abx) pedig pontosan a 2 · (2ax) · b kétszeres szorzat, így elkerüljük a törteket!
      </text>
    </svg>
  );
};

/**
 * 3. A Diszkrimináns (D = b² - 4ac) és a Gyökök Száma SVG
 * 3 oszlopban: D > 0 (2 gyök), D = 0 (1 gyök), D < 0 (0 gyök).
 */
export const DiscriminantCasesComparisonSvg: React.FC<FigureProps> = ({ size = 500, className = '' }) => {
  return (
    <svg
      viewBox="0 0 510 260"
      width={size}
      height={(size * 260) / 510}
      className={`mx-auto select-none ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="caseShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#0F172A" floodOpacity="0.08" />
        </filter>
      </defs>

      {/* Fő cím */}
      <rect x="95" y="10" width="320" height="30" rx="8" fill="#3B82F6" />
      <text x="255" y="30" fill="#FFFFFF" fontSize="13" fontWeight="900" textAnchor="middle">
        A DISZKRIMINÁNS (D = b² - 4ac) ÉS A GYÖKÖK SZÁMA
      </text>

      {/* 1. Oszlop: D > 0 */}
      <rect x="15" y="52" width="155" height="195" rx="14" fill="#F0FDF4" stroke="#22C55E" strokeWidth="2" filter="url(#caseShadow)" />
      <rect x="25" y="62" width="135" height="28" rx="7" fill="#15803D" />
      <text x="92" y="81" fill="#FFFFFF" fontSize="13" fontWeight="900" textAnchor="middle">
        D &gt; 0
      </text>
      <text x="92" y="107" fill="#166534" fontSize="12" fontWeight="bold" textAnchor="middle">
        2 KÜLÖNBÖZŐ GYÖK
      </text>

      {/* Kis grafikon mini parabola D > 0 (metsz) */}
      <rect x="25" y="117" width="135" height="65" rx="8" fill="#FFFFFF" stroke="#DCFCE7" />
      <line x1="30" y1="155" x2="155" y2="155" stroke="#94A3B8" strokeWidth="1.5" />
      <path d="M 40 130 Q 92 185 144 130" stroke="#16A34A" strokeWidth="2.5" fill="none" />
      <circle cx="62" cy="155" r="3.5" fill="#DC2626" />
      <circle cx="122" cy="155" r="3.5" fill="#DC2626" />
      <text x="62" y="170" fill="#166534" fontSize="9" fontWeight="bold" textAnchor="middle">x₁</text>
      <text x="122" y="170" fill="#166534" fontSize="9" fontWeight="bold" textAnchor="middle">x₂</text>

      <text x="92" y="200" fill="#14532D" fontSize="11" fontWeight="bold" textAnchor="middle">
        x₁,₂ = (-b ± √D) / 2a
      </text>
      <text x="92" y="222" fill="#4B5563" fontSize="9.5" textAnchor="middle">
        2 metszéspont az
      </text>
      <text x="92" y="234" fill="#4B5563" fontSize="9.5" textAnchor="middle">
        x-tengellyel
      </text>

      {/* 2. Oszlop: D = 0 */}
      <rect x="177" y="52" width="155" height="195" rx="14" fill="#EFF6FF" stroke="#3B82F6" strokeWidth="2" filter="url(#caseShadow)" />
      <rect x="187" y="62" width="135" height="28" rx="7" fill="#1D4ED8" />
      <text x="254" y="81" fill="#FFFFFF" fontSize="13" fontWeight="900" textAnchor="middle">
        D = 0
      </text>
      <text x="254" y="107" fill="#1E40AF" fontSize="12" fontWeight="bold" textAnchor="middle">
        1 VALÓS GYÖK
      </text>

      {/* Kis grafikon mini parabola D = 0 (érint) */}
      <rect x="187" y="117" width="135" height="65" rx="8" fill="#FFFFFF" stroke="#DBEAFE" />
      <line x1="192" y1="155" x2="317" y2="155" stroke="#94A3B8" strokeWidth="1.5" />
      <path d="M 202 125 Q 254 155 306 125" stroke="#2563EB" strokeWidth="2.5" fill="none" />
      <circle cx="254" cy="155" r="4" fill="#DC2626" />
      <text x="254" y="170" fill="#1E40AF" fontSize="9" fontWeight="bold" textAnchor="middle">x₁ = x₂</text>

      <text x="254" y="200" fill="#1E3A8A" fontSize="11" fontWeight="bold" textAnchor="middle">
        x = -b / (2a)
      </text>
      <text x="254" y="222" fill="#4B5563" fontSize="9.5" textAnchor="middle">
        Kettős gyök, a csúcs
      </text>
      <text x="254" y="234" fill="#4B5563" fontSize="9.5" textAnchor="middle">
        érinti az x-tengelyt
      </text>

      {/* 3. Oszlop: D < 0 */}
      <rect x="340" y="52" width="155" height="195" rx="14" fill="#FFF1F2" stroke="#F43F5E" strokeWidth="2" filter="url(#caseShadow)" />
      <rect x="350" y="62" width="135" height="28" rx="7" fill="#BE123C" />
      <text x="417" y="81" fill="#FFFFFF" fontSize="13" fontWeight="900" textAnchor="middle">
        D &lt; 0
      </text>
      <text x="417" y="107" fill="#9F1239" fontSize="12" fontWeight="bold" textAnchor="middle">
        0 VALÓS GYÖK
      </text>

      {/* Kis grafikon mini parabola D < 0 (lebeg) */}
      <rect x="350" y="117" width="135" height="65" rx="8" fill="#FFFFFF" stroke="#FFE4E6" />
      <line x1="355" y1="165" x2="480" y2="165" stroke="#94A3B8" strokeWidth="1.5" />
      <path d="M 365 125 Q 417 145 469 125" stroke="#E11D48" strokeWidth="2.5" fill="none" />
      <text x="417" y="158" fill="#BE123C" fontSize="9" fontStyle="italic" textAnchor="middle">nem éri el a tengelyt</text>

      <text x="417" y="200" fill="#881337" fontSize="11" fontWeight="bold" textAnchor="middle">
        x ∈ ∅ (üres halmaz)
      </text>
      <text x="417" y="222" fill="#4B5563" fontSize="9.5" textAnchor="middle">
        Negatív számból nincs
      </text>
      <text x="417" y="234" fill="#4B5563" fontSize="9.5" textAnchor="middle">
        valós négyzetgyök!
      </text>
    </svg>
  );
};

/**
 * 4. A Megoldóképlet Sikeres Alkalmazásának 4 Aranyszabálya SVG
 */
export const FormulaStepByStepMethodSvg: React.FC<FigureProps> = ({ size = 500, className = '' }) => {
  return (
    <svg
      viewBox="0 0 500 230"
      width={size}
      height={(size * 230) / 500}
      className={`mx-auto select-none ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="methodShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#0F172A" floodOpacity="0.1" />
        </filter>
      </defs>

      {/* Fejléc */}
      <rect x="60" y="8" width="380" height="32" rx="8" fill="#0F172A" />
      <text x="250" y="29" fill="#F8FAFC" fontSize="12" fontWeight="bold" textAnchor="middle" letterSpacing="0.5">
        A MEGOLDÓKÉPLET ALKALMAZÁSÁNAK 4 ARANYSZABÁLYA
      </text>

      {/* 1. Lépés */}
      <rect x="15" y="52" width="112" height="165" rx="12" fill="#F8FAFC" stroke="#64748B" strokeWidth="1.5" filter="url(#methodShadow)" />
      <circle cx="71" cy="78" r="15" fill="#475569" />
      <text x="71" y="84" fill="#FFFFFF" fontSize="14" fontWeight="900" textAnchor="middle">1</text>
      <text x="71" y="112" fill="#0F172A" fontSize="11" fontWeight="bold" textAnchor="middle">0-ra rendezés</text>
      <text x="71" y="132" fill="#475569" fontSize="9.5" textAnchor="middle">Minden tagot</text>
      <text x="71" y="146" fill="#475569" fontSize="9.5" textAnchor="middle">egy oldalra viszünk:</text>
      <rect x="23" y="158" width="96" height="24" rx="5" fill="#E2E8F0" />
      <text x="71" y="174" fill="#1E293B" fontSize="10.5" fontWeight="900" textAnchor="middle" fontFamily="monospace">
        ... = 0
      </text>

      {/* 2. Lépés */}
      <rect x="137" y="52" width="112" height="165" rx="12" fill="#EFF6FF" stroke="#3B82F6" strokeWidth="1.5" filter="url(#methodShadow)" />
      <circle cx="193" cy="78" r="15" fill="#2563EB" />
      <text x="193" y="84" fill="#FFFFFF" fontSize="14" fontWeight="900" textAnchor="middle">2</text>
      <text x="193" y="112" fill="#1E3A8A" fontSize="11" fontWeight="bold" textAnchor="middle">Együtthatók</text>
      <text x="193" y="132" fill="#3B82F6" fontSize="9.5" textAnchor="middle">Előjellel együtt:</text>
      <text x="193" y="146" fill="#3B82F6" fontSize="9.5" textAnchor="middle">a = ?, b = ?, c = ?</text>
      <rect x="145" y="158" width="96" height="24" rx="5" fill="#DBEAFE" />
      <text x="193" y="174" fill="#1D4ED8" fontSize="10" fontWeight="bold" textAnchor="middle">
        Figyelj a mínuszra!
      </text>

      {/* 3. Lépés */}
      <rect x="259" y="52" width="112" height="165" rx="12" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="1.5" filter="url(#methodShadow)" />
      <circle cx="315" cy="78" r="15" fill="#D97706" />
      <text x="315" y="84" fill="#FFFFFF" fontSize="14" fontWeight="900" textAnchor="middle">3</text>
      <text x="315" y="112" fill="#78350F" fontSize="11" fontWeight="bold" textAnchor="middle">Diszkrimináns</text>
      <text x="315" y="132" fill="#92400E" fontSize="9.5" textAnchor="middle">Először számold ki:</text>
      <text x="315" y="146" fill="#92400E" fontSize="9.5" textAnchor="middle">D = b² - 4ac</text>
      <rect x="267" y="158" width="96" height="24" rx="5" fill="#FDE68A" />
      <text x="315" y="174" fill="#B45309" fontSize="10" fontWeight="bold" textAnchor="middle">
        (-b)² mindig &gt; 0!
      </text>

      {/* 4. Lépés */}
      <rect x="381" y="52" width="105" height="165" rx="12" fill="#ECFDF5" stroke="#10B981" strokeWidth="1.5" filter="url(#methodShadow)" />
      <circle cx="433" cy="78" r="15" fill="#059669" />
      <text x="433" y="84" fill="#FFFFFF" fontSize="14" fontWeight="900" textAnchor="middle">4</text>
      <text x="433" y="112" fill="#064E3B" fontSize="11" fontWeight="bold" textAnchor="middle">Két ág (±)</text>
      <text x="433" y="132" fill="#047857" fontSize="9.5" textAnchor="middle">Külön x₁ és x₂:</text>
      <text x="433" y="146" fill="#047857" fontSize="9.5" textAnchor="middle">x = (-b ± √D)/2a</text>
      <rect x="387" y="158" width="93" height="24" rx="5" fill="#A7F3D0" />
      <text x="433" y="174" fill="#065F46" fontSize="10" fontWeight="bold" textAnchor="middle">
        Osztás 2a-val!
      </text>
    </svg>
  );
};

