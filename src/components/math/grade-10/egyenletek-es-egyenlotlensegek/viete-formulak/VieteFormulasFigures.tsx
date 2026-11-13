import React from 'react';

interface FigureProps {
  size?: number;
  className?: string;
}

// 1. Viète-formulák ikerképlete kiemelt előjelekkel
export const VieteFormulasDuoSvg: React.FC<FigureProps> = ({ size = 260, className = '' }) => {
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

      {/* Címke */}
      <text x="160" y="20" fill="#1e293b" fontSize="10" fontWeight="black" textAnchor="middle">
        A VIÈTE-FORMULÁK ALAPTÉTELE
      </text>

      {/* Egyenlet fejléc */}
      <text x="160" y="38" fill="#475569" fontSize="9" fontFamily="monospace" textAnchor="middle">
        ax² + bx + c = 0 &nbsp;&nbsp;(a ≠ 0, D ≥ 0)
      </text>

      {/* 1. Kártya: Gyökök összege */}
      <rect x="20" y="48" width="135" height="114" rx="6" fill="#fffbeb" stroke="#f59e0b" strokeWidth="1.2" />
      <text x="87" y="66" fill="#b45309" fontSize="9" fontWeight="black" textAnchor="middle">GYÖKÖK ÖSSZEGE</text>
      <rect x="30" y="74" width="115" height="36" rx="5" fill="#ffffff" stroke="#fcd34d" strokeWidth="1" />
      <text x="87" y="98" fill="#92400e" fontSize="13" fontWeight="black" textAnchor="middle">
        x₁ + x₂ = <tspan fill="#dc2626">-</tspan>b / a
      </text>
      <text x="87" y="126" fill="#78350f" fontSize="7.5" fontWeight="bold" textAnchor="middle">VIGYÁZAT: A 'b' ELŐJELE</text>
      <text x="87" y="138" fill="#dc2626" fontSize="7.5" fontWeight="black" textAnchor="middle">ELLENTÉTESRE VÁLT!</text>
      <text x="87" y="152" fill="#92400e" fontSize="7" textAnchor="middle">Ha b negatív, az összeg pozitív</text>

      {/* 2. Kártya: Gyökök szorzata */}
      <rect x="165" y="48" width="135" height="114" rx="6" fill="#f0fdf4" stroke="#22c55e" strokeWidth="1.2" />
      <text x="232" y="66" fill="#15803d" fontSize="9" fontWeight="black" textAnchor="middle">GYÖKÖK SZORZATA</text>
      <rect x="175" y="74" width="115" height="36" rx="5" fill="#ffffff" stroke="#86efac" strokeWidth="1" />
      <text x="232" y="98" fill="#166534" fontSize="13" fontWeight="black" textAnchor="middle">
        x₁ · x₂ = c / a
      </text>
      <text x="232" y="126" fill="#14532d" fontSize="7.5" fontWeight="bold" textAnchor="middle">AZONOS ELŐJELŰ</text>
      <text x="232" y="138" fill="#16a34a" fontSize="7.5" fontWeight="black" textAnchor="middle">A C KONSTANSSAL</text>
      <text x="232" y="152" fill="#15803d" fontSize="7" textAnchor="middle">Nincs előjelváltás</text>
    </svg>
  );
};

// 2. Gyökök előjelének eldöntése a Viète-formulákból
export const SignOfRootsDeductionSvg: React.FC<FigureProps> = ({ size = 260, className = '' }) => {
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

      {/* Címke */}
      <text x="160" y="20" fill="#1e293b" fontSize="10" fontWeight="black" textAnchor="middle">
        A GYÖKÖK ELŐJELE MEGOLDÁS NÉLKÜL
      </text>

      {/* 3 oszlop */}
      {/* 1. c/a > 0 és -b/a > 0 */}
      <rect x="15" y="34" width="90" height="132" rx="6" fill="#eff6ff" stroke="#93c5fd" strokeWidth="1" />
      <text x="60" y="52" fill="#1e40af" fontSize="8.5" fontWeight="black" textAnchor="middle">KÉT POZITÍV</text>
      <text x="60" y="66" fill="#2563eb" fontSize="10" fontWeight="black" textAnchor="middle">(+, +)</text>
      <line x1="25" y1="74" x2="95" y2="74" stroke="#bfdbfe" strokeWidth="1" />
      <text x="60" y="92" fill="#1e3a8a" fontSize="7.5" textAnchor="middle">x₁ · x₂ &gt; 0</text>
      <text x="60" y="104" fill="#64748b" fontSize="7" textAnchor="middle">(azonos előjel)</text>
      <text x="60" y="122" fill="#1e3a8a" fontSize="7.5" textAnchor="middle">x₁ + x₂ &gt; 0</text>
      <text x="60" y="134" fill="#64748b" fontSize="7" textAnchor="middle">(összegük pozitív)</text>
      <rect x="22" y="142" width="76" height="16" rx="3" fill="#dbeafe" />
      <text x="60" y="153" fill="#1d4ed8" fontSize="7.5" fontWeight="black" textAnchor="middle">x₁ &gt; 0, x₂ &gt; 0</text>

      {/* 2. c/a > 0 és -b/a < 0 */}
      <rect x="115" y="34" width="90" height="132" rx="6" fill="#fdf4ff" stroke="#f0abfc" strokeWidth="1" />
      <text x="160" y="52" fill="#86198f" fontSize="8.5" fontWeight="black" textAnchor="middle">KÉT NEGATÍV</text>
      <text x="160" y="66" fill="#a21caf" fontSize="10" fontWeight="black" textAnchor="middle">(-, -)</text>
      <line x1="125" y1="74" x2="195" y2="74" stroke="#f5d0fe" strokeWidth="1" />
      <text x="160" y="92" fill="#701a75" fontSize="7.5" textAnchor="middle">x₁ · x₂ &gt; 0</text>
      <text x="160" y="104" fill="#64748b" fontSize="7" textAnchor="middle">(azonos előjel)</text>
      <text x="160" y="122" fill="#701a75" fontSize="7.5" textAnchor="middle">x₁ + x₂ &lt; 0</text>
      <text x="160" y="134" fill="#64748b" fontSize="7" textAnchor="middle">(összegük negatív)</text>
      <rect x="122" y="142" width="76" height="16" rx="3" fill="#fae8ff" />
      <text x="160" y="153" fill="#a21caf" fontSize="7.5" fontWeight="black" textAnchor="middle">x₁ &lt; 0, x₂ &lt; 0</text>

      {/* 3. c/a < 0 */}
      <rect x="215" y="34" width="90" height="132" rx="6" fill="#fef2f2" stroke="#fca5a5" strokeWidth="1" />
      <text x="260" y="52" fill="#991b1b" fontSize="8.5" fontWeight="black" textAnchor="middle">ELLENTÉTES</text>
      <text x="260" y="66" fill="#dc2626" fontSize="10" fontWeight="black" textAnchor="middle">(+, -)</text>
      <line x1="225" y1="74" x2="295" y2="74" stroke="#fecaca" strokeWidth="1" />
      <text x="260" y="92" fill="#991b1b" fontSize="7.5" textAnchor="middle">x₁ · x₂ &lt; 0</text>
      <text x="260" y="104" fill="#64748b" fontSize="7" textAnchor="middle">(szorzatuk negatív)</text>
      <text x="260" y="122" fill="#7f1d1d" fontSize="7.5" textAnchor="middle">Egy pozitív és</text>
      <text x="260" y="134" fill="#7f1d1d" fontSize="7.5" textAnchor="middle">egy negatív gyök</text>
      <rect x="222" y="142" width="76" height="16" rx="3" fill="#fee2e2" />
      <text x="260" y="153" fill="#b91c1c" fontSize="7.5" fontWeight="black" textAnchor="middle">x₁ &gt; 0 &gt; x₂</text>
    </svg>
  );
};

// 3. Négyzetösszeg szimmetrikus kifejezése
export const SymmetricExpressionsSquareSvg: React.FC<FigureProps> = ({ size = 260, className = '' }) => {
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

      {/* Címke */}
      <text x="160" y="20" fill="#1e293b" fontSize="10" fontWeight="black" textAnchor="middle">
        SZIMMETRIKUS KIFEJEZÉS: NÉGYZETÖSSZEG (x₁² + x₂²)
      </text>

      {/* Alapazonosság */}
      <rect x="25" y="34" width="270" height="42" rx="6" fill="#faf5ff" stroke="#c084fc" strokeWidth="1.2" />
      <text x="160" y="60" fill="#6b21a8" fontSize="13" fontWeight="black" textAnchor="middle">
        (x₁ + x₂)² = x₁² + 2x₁x₂ + x₂²
      </text>

      {/* Átrendezett képlet */}
      <rect x="25" y="86" width="270" height="78" rx="6" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.2" />
      <text x="160" y="106" fill="#1e293b" fontSize="9" fontWeight="black" textAnchor="middle">
        Átrendezve a négyzetösszegre:
      </text>
      <text x="160" y="128" fill="#d97706" fontSize="14" fontWeight="black" textAnchor="middle">
        x₁² + x₂² = (x₁ + x₂)² - 2x₁x₂
      </text>
      <text x="160" y="148" fill="#475569" fontSize="8" fontFamily="monospace" textAnchor="middle">
        x₁² + x₂² = (-b/a)² - 2(c/a) = b²/a² - 2c/a
      </text>
    </svg>
  );
};

// 4. Reciprok összeg szimmetrikus kifejezése
export const SymmetricExpressionsReciprocalSvg: React.FC<FigureProps> = ({ size = 260, className = '' }) => {
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

      {/* Címke */}
      <text x="160" y="20" fill="#1e293b" fontSize="10" fontWeight="black" textAnchor="middle">
        SZIMMETRIKUS KIFEJEZÉS: RECIPROK ÖSSZEG (1/x₁ + 1/x₂)
      </text>

      {/* Közös nevezőre hozás */}
      <rect x="25" y="36" width="270" height="128" rx="6" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.2" />

      <text x="160" y="62" fill="#1e293b" fontSize="10" fontWeight="black" textAnchor="middle">
        1. Közös nevezőre hozás:
      </text>
      <text x="160" y="86" fill="#2563eb" fontSize="14" fontWeight="black" textAnchor="middle">
        1/x₁ + 1/x₂ = (x₁ + x₂) / (x₁ · x₂)
      </text>

      <line x1="40" y1="102" x2="280" y2="102" stroke="#e2e8f0" strokeWidth="1" />

      <text x="160" y="122" fill="#1e293b" fontSize="10" fontWeight="black" textAnchor="middle">
        2. Viète-formulák behelyettesítése:
      </text>
      <text x="160" y="146" fill="#15803d" fontSize="13" fontWeight="black" textAnchor="middle">
        (-b/a) / (c/a) = -b / c
      </text>
    </svg>
  );
};

// 5. Gyökök fejben történő megsejtése
export const MentalRootGuesserSvg: React.FC<FigureProps> = ({ size = 260, className = '' }) => {
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

      {/* Címke */}
      <text x="160" y="20" fill="#1e293b" fontSize="10" fontWeight="black" textAnchor="middle">
        FEJBEN MEGOLDÁS: x² + px + q = 0 (a = 1 ESETÉN)
      </text>

      {/* Példa egyenlet */}
      <rect x="30" y="34" width="260" height="32" rx="6" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.2" />
      <text x="160" y="55" fill="#92400e" fontSize="13" fontWeight="black" fontFamily="monospace" textAnchor="middle">
        x² - 7x + 10 = 0
      </text>

      {/* 2 lépés */}
      <rect x="25" y="76" width="130" height="88" rx="6" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
      <text x="90" y="94" fill="#1e293b" fontSize="9" fontWeight="black" textAnchor="middle">1. LÉPÉS: SZORZAT</text>
      <text x="90" y="112" fill="#16a34a" fontSize="10" fontWeight="black" textAnchor="middle">x₁ · x₂ = 10</text>
      <text x="90" y="128" fill="#64748b" fontSize="7.5" textAnchor="middle">Szorzópárok:</text>
      <text x="90" y="140" fill="#475569" fontSize="8" textAnchor="middle">1 · 10 vagy 2 · 5</text>
      <text x="90" y="152" fill="#475569" fontSize="8" textAnchor="middle">(-1)(-10) vagy (-2)(-5)</text>

      <rect x="165" y="76" width="130" height="88" rx="6" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
      <text x="230" y="94" fill="#1e293b" fontSize="9" fontWeight="black" textAnchor="middle">2. LÉPÉS: ÖSSZEG</text>
      <text x="230" y="112" fill="#dc2626" fontSize="10" fontWeight="black" textAnchor="middle">x₁ + x₂ = -(-7) = 7</text>
      <text x="230" y="128" fill="#64748b" fontSize="7.5" textAnchor="middle">Melyik pár összege 7?</text>
      <rect x="175" y="136" width="110" height="20" rx="4" fill="#dcfce7" stroke="#16a34a" strokeWidth="1" />
      <text x="230" y="150" fill="#15803d" fontSize="9" fontWeight="black" textAnchor="middle">✓ 2 + 5 = 7 !</text>
    </svg>
  );
};

