import React from 'react';

interface FigureProps {
  size?: number;
  className?: string;
}

// 1. 4-Lépéses megoldási algoritmus folyamatábra
export const RadicalStepFlowSvg: React.FC<FigureProps> = ({ size = 260, className = '' }) => {
  return (
    <svg
      viewBox="0 0 320 200"
      width={size}
      height={(size * 200) / 320}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`max-w-full h-auto select-none ${className}`}
    >
      <defs>
        <linearGradient id="stepGrad1" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#0284c7" />
          <stop offset="100%" stopColor="#0369a1" />
        </linearGradient>
        <linearGradient id="stepGrad2" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#0d9488" />
          <stop offset="100%" stopColor="#0f766e" />
        </linearGradient>
        <linearGradient id="stepGrad3" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#d97706" />
          <stop offset="100%" stopColor="#b45309" />
        </linearGradient>
        <linearGradient id="stepGrad4" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#16a34a" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>
      </defs>

      {/* 1. Lépés: Kikötések */}
      <rect x="15" y="10" width="135" height="36" rx="6" fill="url(#stepGrad1)" />
      <text x="82" y="26" fill="#ffffff" fontSize="9.5" fontWeight="bold" textAnchor="middle">
        1. KIKÖTÉSEK
      </text>
      <text x="82" y="38" fill="#bae6fd" fontSize="8" textAnchor="middle">
        f(x) ≥ 0 és g(x) ≥ 0
      </text>

      {/* Nyíl 1 -> 2 */}
      <path d="M 150 28 L 168 28" stroke="#0284c7" strokeWidth="2" markerEnd="url(#arrowBlue)" />
      <polygon points="170,28 164,24 164,32" fill="#0284c7" />

      {/* 2. Lépés: Izolálás */}
      <rect x="170" y="10" width="135" height="36" rx="6" fill="url(#stepGrad2)" />
      <text x="237" y="26" fill="#ffffff" fontSize="9.5" fontWeight="bold" textAnchor="middle">
        2. GYÖKJEL IZOLÁLÁSA
      </text>
      <text x="237" y="38" fill="#ccfbf1" fontSize="8" textAnchor="middle">
        √f(x) = g(x) alakra rendezés
      </text>

      {/* Nyíl 2 -> 3 (lefelé jobb oldalon) */}
      <path d="M 237 46 L 237 68" stroke="#0d9488" strokeWidth="2" />
      <polygon points="237,72 233,65 241,65" fill="#0d9488" />

      {/* 3. Lépés: Négyzetre emelés */}
      <rect x="170" y="74" width="135" height="42" rx="6" fill="url(#stepGrad3)" />
      <text x="237" y="91" fill="#ffffff" fontSize="9.5" fontWeight="bold" textAnchor="middle">
        3. NÉGYZETRE EMELÉS
      </text>
      <text x="237" y="103" fill="#fef3c7" fontSize="8" textAnchor="middle">
        f(x) = [g(x)]²
      </text>
      <text x="237" y="112" fill="#fed7aa" fontSize="7.5" fontWeight="bold" textAnchor="middle">
        ⚠️ Nem ekvivalens!
      </text>

      {/* Nyíl 3 -> 4 (balra) */}
      <path d="M 170 95 L 152 95" stroke="#d97706" strokeWidth="2" />
      <polygon points="148,95 154,91 154,99" fill="#d97706" />

      {/* 4. Lépés: Ellenőrzés */}
      <rect x="15" y="74" width="135" height="42" rx="6" fill="url(#stepGrad4)" />
      <text x="82" y="91" fill="#ffffff" fontSize="9.5" fontWeight="bold" textAnchor="middle">
        4. ELLENŐRZÉS
      </text>
      <text x="82" y="103" fill="#dcfce7" fontSize="8" textAnchor="middle">
        Eredeti egyenletbe való
      </text>
      <text x="82" y="112" fill="#ffffff" fontSize="7.5" fontWeight="black" textAnchor="middle">
        behelyettesítés kötelező!
      </text>

      {/* Alsó összegző figyelmeztetés */}
      <rect x="15" y="132" width="290" height="58" rx="8" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />
      <circle cx="35" cy="161" r="12" fill="#fee2e2" />
      <text x="35" y="165" fill="#dc2626" fontSize="12" fontWeight="black" textAnchor="middle">!</text>
      <text x="55" y="150" fill="#0f172a" fontSize="8.5" fontWeight="bold">
        Miért kötelező a behelyettesítés?
      </text>
      <text x="55" y="163" fill="#475569" fontSize="8">
        Mert A = B-ből következik A² = B², de visszafelé A = -B is lehet!
      </text>
      <text x="55" y="176" fill="#b91c1c" fontSize="8" fontWeight="bold">
        A négyzetre emeléskor bekerülő hamis gyökök kizárása a megoldás része.
      </text>
    </svg>
  );
};

// 2. Grafikus szemléltetés: Parabolaág és egyenes metszéspontja (Hamis gyök magyarázata)
export const RadicalParabolaIntersectionSvg: React.FC<FigureProps> = ({ size = 250, className = '' }) => {
  return (
    <svg
      viewBox="0 0 320 200"
      width={size}
      height={(size * 200) / 320}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`max-w-full h-auto select-none ${className}`}
    >
      {/* Háttér és koordinátarendszer */}
      <rect x="0" y="0" width="320" height="200" rx="8" fill="#f8fafc" />
      <line x1="20" y1="120" x2="300" y2="120" stroke="#cbd5e1" strokeWidth="1.5" />
      <line x1="70" y1="20" x2="70" y2="185" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="300" y="115" fill="#64748b" fontSize="8.5" fontWeight="bold">x</text>
      <text x="75" y="25" fill="#64748b" fontSize="8.5" fontWeight="bold">y</text>

      {/* Tengely osztások */}
      {/* Origó (0,0) -> SVG (70, 120) */}
      <circle cx="70" cy="120" r="2.5" fill="#64748b" />
      <text x="62" y="132" fill="#64748b" fontSize="8">0</text>

      {/* x = -3: SVG x = 70 - 30 = 40 */}
      <line x1="40" y1="117" x2="40" y2="123" stroke="#64748b" />
      <text x="40" y="132" fill="#64748b" fontSize="7.5" textAnchor="middle">-3</text>

      {/* x = 1: SVG x = 70 + 1*18 = 88 */}
      <line x1="88" y1="117" x2="88" y2="123" stroke="#64748b" />
      <text x="88" y="132" fill="#64748b" fontSize="7.5" textAnchor="middle">1</text>

      {/* x = 6: SVG x = 70 + 6*18 = 178 */}
      <line x1="178" y1="117" x2="178" y2="123" stroke="#64748b" />
      <text x="178" y="132" fill="#64748b" fontSize="7.5" textAnchor="middle">6</text>

      {/* Valódi négyzetgyök görbe y = √(x+3) (zöld folytonos felső ág) */}
      {/* Pontok: (-3, 0)->(40,120), (1, 2)->(88, 84), (6, 3)->(178, 66), (13, 4)->(280, 48) */}
      <path
        d="M 40 120 Q 55 95 88 84 Q 130 72 178 66 T 285 48"
        stroke="#16a34a"
        strokeWidth="2.5"
        fill="none"
      />
      <text x="210" y="42" fill="#15803d" fontSize="9" fontWeight="bold">
        y = √(x + 3) (felső ág)
      </text>

      {/* A négyzetre emelés által behozott alsó szaggatott ág y = -√(x+3) */}
      <path
        d="M 40 120 Q 55 145 88 156 Q 130 168 178 174 T 285 186"
        stroke="#ef4444"
        strokeWidth="1.5"
        strokeDasharray="3 3"
        fill="none"
      />
      <text x="200" y="188" fill="#b91c1c" fontSize="8" strokeDasharray="none">
        y = -√(x + 3) (parabola alsó ága)
      </text>

      {/* Egyenes: y = x - 3 */}
      {/* x = 1 -> y = -2 (SVG: 88, 156) */}
      {/* x = 3 -> y = 0  (SVG: 124, 120) */}
      {/* x = 6 -> y = 3  (SVG: 178, 66) */}
      {/* x = 8 -> y = 5  (SVG: 214, 30) */}
      <line x1="70" y1="188" x2="225" y2="12" stroke="#2563eb" strokeWidth="2" />
      <text x="230" y="20" fill="#1d4ed8" fontSize="9" fontWeight="bold">
        y = x - 3
      </text>

      {/* 1. Metszéspont (Valódi gyök): x = 6, y = 3 */}
      <circle cx="178" cy="66" r="5" fill="#16a34a" stroke="#ffffff" strokeWidth="2" />
      <rect x="190" y="58" width="115" height="24" rx="4" fill="#dcfce7" stroke="#16a34a" strokeWidth="1" />
      <text x="195" y="70" fill="#15803d" fontSize="8.5" fontWeight="black">
        ✓ x = 6 (Valódi gyök)
      </text>
      <text x="195" y="79" fill="#166534" fontSize="7">
        √(6+3) = 3 és 6-3 = 3 ✓
      </text>

      {/* 2. Metszéspont (Hamis gyök): x = 1, y = -2 */}
      <circle cx="88" cy="156" r="5" fill="#ffffff" stroke="#ef4444" strokeWidth="2" />
      <line x1="84" y1="152" x2="92" y2="160" stroke="#ef4444" strokeWidth="2" />
      <line x1="92" y1="152" x2="84" y2="160" stroke="#ef4444" strokeWidth="2" />
      <rect x="98" y="145" width="115" height="24" rx="4" fill="#fee2e2" stroke="#ef4444" strokeWidth="1" />
      <text x="103" y="157" fill="#b91c1c" fontSize="8.5" fontWeight="black">
        ✗ x = 1 (Hamis gyök!)
      </text>
      <text x="103" y="166" fill="#991b1b" fontSize="7">
        √(1+3) = 2 ≠ 1-3 = -2 ✗
      </text>
    </svg>
  );
};

// 3. Értelmezési tartomány számegyenesen (két kikötés metszete)
export const RadicalDomainSvg: React.FC<FigureProps> = ({ size = 250, className = '' }) => {
  return (
    <svg
      viewBox="0 0 320 150"
      width={size}
      height={(size * 150) / 320}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`max-w-full h-auto select-none ${className}`}
    >
      {/* Fejléc címe */}
      <rect x="15" y="8" width="290" height="26" rx="6" fill="#f0fdf4" stroke="#86efac" strokeWidth="1" />
      <text x="160" y="25" fill="#166534" fontSize="9.5" fontWeight="bold" textAnchor="middle">
        Egyenlet: √(x + 3) = x - 3 kikötései számegyenesen
      </text>

      {/* 1. Kikötés sáv: x + 3 ≥ 0 => x ≥ -3 */}
      <text x="20" y="52" fill="#0284c7" fontSize="8.5" fontWeight="bold">
        1. Gyök alatt: x ≥ -3
      </text>
      <line x1="80" y1="58" x2="295" y2="58" stroke="#0284c7" strokeWidth="2" />
      <circle cx="80" cy="58" r="4" fill="#0284c7" />
      <polygon points="300,58 293,55 293,61" fill="#0284c7" />

      {/* 2. Kikötés sáv: x - 3 ≥ 0 => x ≥ 3 */}
      <text x="20" y="80" fill="#d97706" fontSize="8.5" fontWeight="bold">
        2. Jobb oldal: x ≥ 3
      </text>
      <line x1="180" y1="86" x2="295" y2="86" stroke="#d97706" strokeWidth="2" />
      <circle cx="180" cy="86" r="4" fill="#d97706" />
      <polygon points="300,86 293,83 293,89" fill="#d97706" />

      {/* Közös tartomány sáv: x ≥ 3 */}
      <line x1="15" y1="115" x2="305" y2="115" stroke="#94a3b8" strokeWidth="1.5" />
      {/* Zöld kiemelt szakasz 3-tól végtelenig */}
      <line x1="180" y1="115" x2="300" y2="115" stroke="#16a34a" strokeWidth="4" />
      <circle cx="180" cy="115" r="5" fill="#16a34a" />
      <polygon points="305,115 298,111 298,119" fill="#16a34a" />

      {/* Pontok a fő számegyenesen */}
      {/* -3 */}
      <circle cx="80" cy="115" r="3" fill="#64748b" />
      <text x="80" y="128" fill="#64748b" fontSize="8" textAnchor="middle">-3</text>

      {/* 1 (hamis gyök helye) */}
      <circle cx="135" cy="115" r="4" fill="#ffffff" stroke="#ef4444" strokeWidth="1.5" />
      <text x="135" y="128" fill="#dc2626" fontSize="8" fontWeight="bold" textAnchor="middle">1 (✗)</text>

      {/* 3 */}
      <text x="180" y="128" fill="#15803d" fontSize="8" fontWeight="bold" textAnchor="middle">3</text>

      {/* 6 (valódi gyök helye) */}
      <circle cx="240" cy="115" r="4" fill="#16a34a" />
      <text x="240" y="128" fill="#15803d" fontSize="8" fontWeight="bold" textAnchor="middle">6 (✓)</text>

      {/* Alsó magyarázat */}
      <text x="160" y="144" fill="#15803d" fontSize="8" fontWeight="bold" textAnchor="middle">
        Közös értelmezési tartomány: x ∈ [3; ∞[. Ezért az x = 1 azonnal kizárható!
      </text>
    </svg>
  );
};

// 4. Két gyökös kifejezés izolálási elve
export const TwoRadicalsSvg: React.FC<FigureProps> = ({ size = 250, className = '' }) => {
  return (
    <svg
      viewBox="0 0 320 160"
      width={size}
      height={(size * 160) / 320}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`max-w-full h-auto select-none ${className}`}
    >
      <rect x="0" y="0" width="320" height="160" rx="8" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />

      {/* Rossz módszer (bal oldal) */}
      <rect x="12" y="12" width="140" height="136" rx="6" fill="#fef2f2" stroke="#fca5a5" strokeWidth="1" />
      <text x="82" y="28" fill="#b91c1c" fontSize="8.5" fontWeight="black" textAnchor="middle">
        ✗ HIBÁS MEGKÖZELÍTÉS
      </text>
      <text x="82" y="44" fill="#7f1d1d" fontSize="8" textAnchor="middle">
        √(x+5) - √x = 1
      </text>
      <text x="82" y="58" fill="#991b1b" fontSize="7.5" fontWeight="bold" textAnchor="middle">
        Azonnali négyzetre emelés:
      </text>
      <rect x="20" y="65" width="124" height="26" rx="4" fill="#ffffff" stroke="#f87171" strokeWidth="1" />
      <text x="82" y="78" fill="#b91c1c" fontSize="7.5" textAnchor="middle">
        (√(x+5) - √x)² = 1²
      </text>
      <text x="82" y="87" fill="#dc2626" fontSize="7" fontWeight="bold" textAnchor="middle">
        x+5 - 2√(x²+5x) + x = 1
      </text>
      <text x="82" y="105" fill="#7f1d1d" fontSize="7.5" textAnchor="middle">
        A vegyes szorzat miatt
      </text>
      <text x="82" y="117" fill="#b91c1c" fontSize="7.5" fontWeight="bold" textAnchor="middle">
        a gyök mégis megmarad!
      </text>
      <text x="82" y="132" fill="#991b1b" fontSize="7" textAnchor="middle">
        Bonyolultabbá vált a feladat.
      </text>

      {/* Helyes módszer (jobb oldal) */}
      <rect x="168" y="12" width="140" height="136" rx="6" fill="#f0fdf4" stroke="#86efac" strokeWidth="1" />
      <text x="238" y="28" fill="#15803d" fontSize="8.5" fontWeight="black" textAnchor="middle">
        ✓ HELYES MEGKÖZELÍTÉS
      </text>
      <text x="238" y="44" fill="#14532d" fontSize="8" textAnchor="middle">
        √(x+5) - √x = 1
      </text>
      <text x="238" y="58" fill="#166534" fontSize="7.5" fontWeight="bold" textAnchor="middle">
        Egy gyököt átviszünk (+√x):
      </text>
      <rect x="176" y="65" width="124" height="26" rx="4" fill="#ffffff" stroke="#4ade80" strokeWidth="1" />
      <text x="238" y="78" fill="#15803d" fontSize="8" fontWeight="bold" textAnchor="middle">
        √(x+5) = 1 + √x
      </text>
      <text x="238" y="87" fill="#166534" fontSize="7.5" textAnchor="middle">
        x+5 = 1 + 2√x + x
      </text>
      <text x="238" y="105" fill="#15803d" fontSize="7.5" textAnchor="middle">
        Az x kiesik mindkét oldalon!
      </text>
      <text x="238" y="117" fill="#166534" fontSize="8" fontWeight="bold" textAnchor="middle">
        4 = 2√x ⟹ √x = 2
      </text>
      <text x="238" y="132" fill="#15803d" fontSize="8" fontWeight="black" textAnchor="middle">
        ⟹ x = 4 (Ellenőrizve ✓)
      </text>
    </svg>
  );
};

// 5. Hamis gyök ellenőrző teszt doboz
export const ExtraneousRootDetectorSvg: React.FC<FigureProps> = ({ size = 250, className = '' }) => {
  return (
    <svg
      viewBox="0 0 320 140"
      width={size}
      height={(size * 140) / 320}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`max-w-full h-auto select-none ${className}`}
    >
      <rect x="10" y="8" width="300" height="124" rx="8" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
      <text x="160" y="26" fill="#334155" fontSize="10" fontWeight="black" textAnchor="middle">
        BEHELYETTESÍTÉSES ELLENŐRZŐ TESZT: √(x + 3) = x - 3
      </text>

      {/* Bal teszt: x = 6 */}
      <rect x="25" y="36" width="125" height="82" rx="6" fill="#ecfdf5" stroke="#10b981" strokeWidth="1.5" />
      <text x="87" y="52" fill="#047857" fontSize="9" fontWeight="black" textAnchor="middle">
        Teszt 1: x = 6
      </text>
      <text x="35" y="68" fill="#065f46" fontSize="8">
        Bal: √(6 + 3) = √9 = <tspan fontWeight="bold">+3</tspan>
      </text>
      <text x="35" y="82" fill="#065f46" fontSize="8">
        Jobb: 6 - 3 = <tspan fontWeight="bold">+3</tspan>
      </text>
      <line x1="35" y1="88" x2="140" y2="88" stroke="#a7f3d0" strokeWidth="1" />
      <text x="87" y="104" fill="#047857" fontSize="9" fontWeight="black" textAnchor="middle">
        ✓ 3 = 3 (IGAZ!)
      </text>
      <text x="87" y="113" fill="#065f46" fontSize="7.5" textAnchor="middle">
        x = 6 VALÓDI MEGOLDÁS
      </text>

      {/* Jobb teszt: x = 1 */}
      <rect x="170" y="36" width="125" height="82" rx="6" fill="#fff1f2" stroke="#f43f5e" strokeWidth="1.5" />
      <text x="232" y="52" fill="#be123c" fontSize="9" fontWeight="black" textAnchor="middle">
        Teszt 2: x = 1
      </text>
      <text x="180" y="68" fill="#9f1239" fontSize="8">
        Bal: √(1 + 3) = √4 = <tspan fontWeight="bold">+2</tspan>
      </text>
      <text x="180" y="82" fill="#9f1239" fontSize="8">
        Jobb: 1 - 3 = <tspan fontWeight="bold">-2</tspan>
      </text>
      <line x1="180" y1="88" x2="285" y2="88" stroke="#fecdd3" strokeWidth="1" />
      <text x="232" y="104" fill="#be123c" fontSize="9" fontWeight="black" textAnchor="middle">
        ✗ +2 ≠ -2 (HAMIS!)
      </text>
      <text x="232" y="113" fill="#9f1239" fontSize="7.5" textAnchor="middle">
        x = 1 KIZÁRVA (HAMIS GYÖK)
      </text>
    </svg>
  );
};

