import React from 'react';

interface FigureProps {
  size?: number;
  className?: string;
}

/**
 * 1. Egyenlet Előkészítése és Kanonikus Alakra Hozása SVG
 * Folyamatábra: Zárójelbontás -> Összevonás -> 0-ra rendezés -> Közös osztóval leosztás.
 */
export const EquationSimplificationTreeSvg: React.FC<FigureProps> = ({ size = 500, className = '' }) => {
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
        <filter id="prepShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#0F172A" floodOpacity="0.1" />
        </filter>
      </defs>

      {/* Fő Cím doboz */}
      <rect x="70" y="10" width="380" height="32" rx="8" fill="#E11D48" />
      <text x="260" y="31" fill="#FFFFFF" fontSize="12.5" fontWeight="900" textAnchor="middle" letterSpacing="0.5">
        AZ EGYENLET ELŐKÉSZÍTÉSE A MEGOLDÓKÉPLETHEZ
      </text>

      {/* 1. Lépés: Zárójelek felbontása */}
      <rect x="15" y="55" width="115" height="175" rx="12" fill="#FFF1F2" stroke="#FB7185" strokeWidth="1.5" filter="url(#prepShadow)" />
      <circle cx="72" cy="80" r="14" fill="#E11D48" />
      <text x="72" y="86" fill="#FFFFFF" fontSize="13" fontWeight="900" textAnchor="middle">1</text>
      <text x="72" y="112" fill="#9F1239" fontSize="11" fontWeight="bold" textAnchor="middle">Zárójelbontás</text>
      <text x="72" y="132" fill="#475569" fontSize="9.5" textAnchor="middle">Azonosságok:</text>
      <text x="72" y="146" fill="#475569" fontSize="9.5" textAnchor="middle">(a ± b)², (a-b)(a+b)</text>
      <rect x="23" y="158" width="99" height="26" rx="5" fill="#FFE4E6" />
      <text x="72" y="175" fill="#BE123C" fontSize="10" fontWeight="bold" textAnchor="middle">
        Minden tagot beszorzunk
      </text>

      {/* 2. Lépés: Összevonás */}
      <rect x="140" y="55" width="115" height="175" rx="12" fill="#EFF6FF" stroke="#60A5FA" strokeWidth="1.5" filter="url(#prepShadow)" />
      <circle cx="197" cy="80" r="14" fill="#2563EB" />
      <text x="197" y="86" fill="#FFFFFF" fontSize="13" fontWeight="900" textAnchor="middle">2</text>
      <text x="197" y="112" fill="#1E40AF" fontSize="11" fontWeight="bold" textAnchor="middle">Összevonás</text>
      <text x="197" y="132" fill="#475569" fontSize="9.5" textAnchor="middle">Azonos nemű</text>
      <text x="197" y="146" fill="#475569" fontSize="9.5" textAnchor="middle">tagok összeadása:</text>
      <rect x="148" y="158" width="99" height="26" rx="5" fill="#DBEAFE" />
      <text x="197" y="175" fill="#1D4ED8" fontSize="10" fontWeight="bold" textAnchor="middle">
        x²-es, x-es, szám tagok
      </text>

      {/* 3. Lépés: 0-ra rendezés */}
      <rect x="265" y="55" width="115" height="175" rx="12" fill="#FEF3C7" stroke="#FBBF24" strokeWidth="1.5" filter="url(#prepShadow)" />
      <circle cx="322" cy="80" r="14" fill="#D97706" />
      <text x="322" y="86" fill="#FFFFFF" fontSize="13" fontWeight="900" textAnchor="middle">3</text>
      <text x="322" y="112" fill="#92400E" fontSize="11" fontWeight="bold" textAnchor="middle">0-ra rendezés</text>
      <text x="322" y="132" fill="#475569" fontSize="9.5" textAnchor="middle">Minden tagot</text>
      <text x="322" y="146" fill="#475569" fontSize="9.5" textAnchor="middle">egy oldalra viszünk:</text>
      <rect x="273" y="158" width="99" height="26" rx="5" fill="#FDE68A" />
      <text x="322" y="175" fill="#B45309" fontSize="10" fontWeight="bold" textAnchor="middle">
        ax² + bx + c = 0
      </text>

      {/* 4. Lépés: Egyszerűsítés */}
      <rect x="390" y="55" width="115" height="175" rx="12" fill="#ECFDF5" stroke="#34D399" strokeWidth="1.5" filter="url(#prepShadow)" />
      <circle cx="447" cy="80" r="14" fill="#059669" />
      <text x="447" y="86" fill="#FFFFFF" fontSize="13" fontWeight="900" textAnchor="middle">4</text>
      <text x="447" y="112" fill="#065F46" fontSize="11" fontWeight="bold" textAnchor="middle">Egyszerűsítés</text>
      <text x="447" y="132" fill="#475569" fontSize="9.5" textAnchor="middle">Közös osztóval</text>
      <text x="447" y="146" fill="#475569" fontSize="9.5" textAnchor="middle">leosztás:</text>
      <rect x="398" y="158" width="99" height="26" rx="5" fill="#A7F3D0" />
      <text x="447" y="175" fill="#047857" fontSize="10" fontWeight="bold" textAnchor="middle">
        Kisebb számok!
      </text>
    </svg>
  );
};

/**
 * 2. Törtes Másodfokú Egyenlet és a Kikötés SVG
 * 4 lépés: Kikötés (nevező ≠ 0) -> Szorzás közös nevezővel -> Megoldóképlet -> Ellenőrzés a kikötéssel.
 */
export const FractionalEquationCheckSvg: React.FC<FigureProps> = ({ size = 500, className = '' }) => {
  return (
    <svg
      viewBox="0 0 520 240"
      width={size}
      height={(size * 240) / 520}
      className={`mx-auto select-none ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="fracShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#0F172A" floodOpacity="0.1" />
        </filter>
      </defs>

      {/* Fejléc */}
      <rect x="75" y="10" width="370" height="32" rx="8" fill="#0284C7" />
      <text x="260" y="31" fill="#FFFFFF" fontSize="13" fontWeight="900" textAnchor="middle">
        TÖRTES EGYENLETEK ÉS A KÖTELEZŐ KIKÖTÉS
      </text>

      {/* 1. Kikötés doboz */}
      <rect x="15" y="55" width="115" height="165" rx="12" fill="#FFF1F2" stroke="#F43F5E" strokeWidth="2" filter="url(#fracShadow)" />
      <text x="72" y="78" fill="#BE123C" fontSize="11" fontWeight="900" textAnchor="middle">1. KIKÖTÉS</text>
      <text x="72" y="100" fill="#475569" fontSize="10" textAnchor="middle">Nevező ≠ 0</text>
      <rect x="23" y="112" width="99" height="34" rx="6" fill="#FFE4E6" />
      <text x="72" y="127" fill="#9F1239" fontSize="10" fontWeight="bold" textAnchor="middle">Pl. ha nevező x - 2:</text>
      <text x="72" y="141" fill="#881337" fontSize="11" fontWeight="900" textAnchor="middle">x ≠ 2 !</text>
      <text x="72" y="172" fill="#BE123C" fontSize="9.5" fontWeight="bold" textAnchor="middle">Soha ne oszd el</text>
      <text x="72" y="186" fill="#BE123C" fontSize="9.5" fontWeight="bold" textAnchor="middle">nullával!</text>

      {/* Nyíl 1 -> 2 */}
      <path d="M 130 137 L 145 137" stroke="#94A3B8" strokeWidth="2" />

      {/* 2. Beszorzás */}
      <rect x="145" y="55" width="110" height="165" rx="12" fill="#F8FAFC" stroke="#64748B" strokeWidth="1.5" filter="url(#fracShadow)" />
      <text x="200" y="78" fill="#334155" fontSize="11" fontWeight="900" textAnchor="middle">2. BESZORZÁS</text>
      <text x="200" y="100" fill="#475569" fontSize="10" textAnchor="middle">Közös nevezővel</text>
      <rect x="153" y="112" width="94" height="40" rx="6" fill="#E2E8F0" />
      <text x="200" y="129" fill="#1E293B" fontSize="9.5" textAnchor="middle">Eltűnnek</text>
      <text x="200" y="144" fill="#0F172A" fontSize="10.5" fontWeight="900" textAnchor="middle">a törtek!</text>
      <text x="200" y="178" fill="#475569" fontSize="9.5" textAnchor="middle">Egész együtthatós</text>
      <text x="200" y="192" fill="#475569" fontSize="9.5" textAnchor="middle">másodfokú lesz</text>

      {/* Nyíl 2 -> 3 */}
      <path d="M 255 137 L 270 137" stroke="#94A3B8" strokeWidth="2" />

      {/* 3. Megoldóképlet */}
      <rect x="270" y="55" width="115" height="165" rx="12" fill="#EFF6FF" stroke="#3B82F6" strokeWidth="1.5" filter="url(#fracShadow)" />
      <text x="327" y="78" fill="#1D4ED8" fontSize="11" fontWeight="900" textAnchor="middle">3. MEGOLDÁS</text>
      <text x="327" y="100" fill="#475569" fontSize="10" textAnchor="middle">Megoldóképlet</text>
      <rect x="278" y="112" width="99" height="34" rx="6" fill="#DBEAFE" />
      <text x="327" y="128" fill="#1E40AF" fontSize="10" fontWeight="bold" textAnchor="middle">x₁,₂ = ...</text>
      <text x="327" y="141" fill="#1E3A8A" fontSize="9.5" textAnchor="middle">Két jelölt gyök</text>
      <text x="327" y="175" fill="#2563EB" fontSize="9.5" textAnchor="middle">pl. x₁ = 2</text>
      <text x="327" y="190" fill="#2563EB" fontSize="9.5" textAnchor="middle">és x₂ = -5</text>

      {/* Nyíl 3 -> 4 */}
      <path d="M 385 137 L 400 137" stroke="#94A3B8" strokeWidth="2" />

      {/* 4. Kikötés ellenőrzése */}
      <rect x="400" y="55" width="105" height="165" rx="12" fill="#ECFDF5" stroke="#10B981" strokeWidth="2" filter="url(#fracShadow)" />
      <text x="452" y="78" fill="#047857" fontSize="11" fontWeight="900" textAnchor="middle">4. SZŰRÉS</text>
      <text x="452" y="100" fill="#475569" fontSize="10" textAnchor="middle">Kikötés próba</text>
      <rect x="408" y="112" width="89" height="42" rx="6" fill="#DCFCE7" />
      <text x="452" y="128" fill="#DC2626" fontSize="10" fontWeight="bold" textAnchor="middle">x₁ = 2: HAMIS!</text>
      <text x="452" y="144" fill="#059669" fontSize="10" fontWeight="bold" textAnchor="middle">x₂ = -5: JÓ ✓</text>
      <text x="452" y="180" fill="#065F46" fontSize="9.5" fontWeight="bold" textAnchor="middle">Csak az érvényes</text>
      <text x="452" y="194" fill="#065F46" fontSize="9.5" fontWeight="bold" textAnchor="middle">gyököt fogadjuk el!</text>
    </svg>
  );
};

/**
 * 3. Gyökös Tört Kifejezések Pontos Egyszerűsítése SVG
 * Bemutatja: (6 ± √72) / 4 = (6 ± 6√2) / 4 = 2(3 ± 3√2) / 4 = (3 ± 3√2) / 2
 */
export const RootsSimplificationTreeSvg: React.FC<FigureProps> = ({ size = 500, className = '' }) => {
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
        <filter id="rootShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#0F172A" floodOpacity="0.12" />
        </filter>
      </defs>

      {/* Fejléc */}
      <rect x="80" y="8" width="360" height="30" rx="8" fill="#7C3AED" />
      <text x="260" y="28" fill="#FFFFFF" fontSize="12.5" fontWeight="900" textAnchor="middle">
        IRRACIONÁLIS GYÖKÖS TÖRT PONTOS EGYSZERŰSÍTÉSE
      </text>

      {/* 1. Lépés: Kiinduló gyökjel */}
      <rect x="15" y="50" width="145" height="150" rx="12" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="1.5" filter="url(#rootShadow)" />
      <text x="87" y="75" fill="#475569" fontSize="11" fontWeight="bold" textAnchor="middle">1. Gyökvonás szorzatból</text>
      <rect x="25" y="88" width="125" height="42" rx="8" fill="#EDE9FE" />
      <text x="87" y="114" fill="#6D28D9" fontSize="13" fontWeight="900" textAnchor="middle" fontFamily="monospace">
        √72 = √(36 · 2) = 6√2
      </text>
      <text x="87" y="152" fill="#475569" fontSize="10" textAnchor="middle">Négyzetszám szorzót</text>
      <text x="87" y="166" fill="#475569" fontSize="10" textAnchor="middle">kihozunk a gyök elé!</text>

      {/* Nyíl */}
      <path d="M 165 125 L 180 125" stroke="#7C3AED" strokeWidth="2.5" />

      {/* 2. Lépés: Kiemelés a számlálóból */}
      <rect x="185" y="50" width="150" height="150" rx="12" fill="#F5F3FF" stroke="#A78BFA" strokeWidth="1.5" filter="url(#rootShadow)" />
      <text x="260" y="75" fill="#5B21B6" fontSize="11" fontWeight="bold" textAnchor="middle">2. Kiemelés a számlálóból</text>
      <rect x="195" y="88" width="130" height="42" rx="8" fill="#DDD6FE" />
      <text x="260" y="114" fill="#4C1D95" fontSize="13" fontWeight="900" textAnchor="middle" fontFamily="monospace">
        6 ± 6√2 = 2 · (3 ± 3√2)
      </text>
      <text x="260" y="150" fill="#6D28D9" fontSize="10" fontWeight="bold" textAnchor="middle">Közös szorzó kiemelése:</text>
      <text x="260" y="166" fill="#475569" fontSize="9.5" textAnchor="middle">MINDEN tagot oszt a 2!</text>

      {/* Nyíl */}
      <path d="M 340 125 L 355 125" stroke="#7C3AED" strokeWidth="2.5" />

      {/* 3. Lépés: Végeredmény */}
      <rect x="360" y="50" width="145" height="150" rx="12" fill="#ECFDF5" stroke="#10B981" strokeWidth="2" filter="url(#rootShadow)" />
      <text x="432" y="75" fill="#047857" fontSize="11" fontWeight="bold" textAnchor="middle">3. Egyszerűsítés</text>
      <rect x="370" y="88" width="125" height="42" rx="8" fill="#DCFCE7" />
      <text x="432" y="114" fill="#065F46" fontSize="14" fontWeight="900" textAnchor="middle" fontFamily="monospace">
        (3 ± 3√2) / 2
      </text>
      <text x="432" y="150" fill="#047857" fontSize="10" fontWeight="bold" textAnchor="middle">Pontos zárt alak!</text>
      <text x="432" y="166" fill="#475569" fontSize="9.5" textAnchor="middle">Kerekítés nélkül pontos.</text>
    </svg>
  );
};

/**
 * 4. A Viète-formulák mint Villámgyors Önellenőrzés SVG
 * x₁ + x₂ = -b/a és x₁ · x₂ = c/a
 */
export const VieteVerificationCardSvg: React.FC<FigureProps> = ({ size = 500, className = '' }) => {
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
        <filter id="vieteShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#0F172A" floodOpacity="0.15" />
        </filter>
      </defs>

      {/* Fő Kártya alap */}
      <rect x="15" y="10" width="490" height="210" rx="18" fill="#1E293B" stroke="#334155" strokeWidth="2" filter="url(#vieteShadow)" />

      {/* Cím csík */}
      <rect x="120" y="18" width="280" height="26" rx="8" fill="#F59E0B" fillOpacity="0.2" stroke="#FBBF24" strokeWidth="1" />
      <text x="260" y="36" fill="#FDE68A" fontSize="12" fontWeight="900" textAnchor="middle">
        VIÈTE-FORMULÁK: A GYÖKÖK ÖNELLENŐRZÉSE
      </text>

      {/* Bal oldali formula: Összeg */}
      <rect x="35" y="58" width="215" height="100" rx="12" fill="#0F172A" stroke="#3B82F6" strokeWidth="1.5" />
      <text x="142" y="80" fill="#93C5FD" fontSize="12" fontWeight="bold" textAnchor="middle">
        1. A GYÖKÖK ÖSSZEGE:
      </text>
      <text x="142" y="116" fill="#60A5FA" fontSize="22" fontWeight="900" textAnchor="middle" fontFamily="monospace">
        x₁ + x₂ = -b / a
      </text>
      <text x="142" y="144" fill="#CBD5E1" fontSize="10.5" textAnchor="middle">
        Normált egyenletnél: x₁ + x₂ = -p
      </text>

      {/* Jobb oldali formula: Szorzat */}
      <rect x="270" y="58" width="215" height="100" rx="12" fill="#0F172A" stroke="#10B981" strokeWidth="1.5" />
      <text x="377" y="80" fill="#A7F3D0" fontSize="12" fontWeight="bold" textAnchor="middle">
        2. A GYÖKÖK SZORZATA:
      </text>
      <text x="377" y="116" fill="#34D399" fontSize="22" fontWeight="900" textAnchor="middle" fontFamily="monospace">
        x₁ · x₂ = c / a
      </text>
      <text x="377" y="144" fill="#CBD5E1" fontSize="10.5" textAnchor="middle">
        Normált egyenletnél: x₁ · x₂ = q
      </text>

      {/* Alsó Példa sáv */}
      <rect x="35" y="168" width="450" height="38" rx="8" fill="#334155" />
      <text x="260" y="186" fill="#F8FAFC" fontSize="11" fontWeight="bold" textAnchor="middle">
        💡 Példa: x² - 5x + 6 = 0 gyökei: x₁ = 2, x₂ = 3.
      </text>
      <text x="260" y="200" fill="#94A3B8" fontSize="10" textAnchor="middle">
        Összeg: 2 + 3 = 5 = -(-5) ✓ &nbsp;&nbsp;|&nbsp;&nbsp; Szorzat: 2 · 3 = 6 ✓ (A gyökök azonnal igazolva!)
      </text>
    </svg>
  );
};

