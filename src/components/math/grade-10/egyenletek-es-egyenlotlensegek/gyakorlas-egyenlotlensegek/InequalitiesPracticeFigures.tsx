import React from 'react';

interface FigureProps {
  size?: number;
  className?: string;
}

// 1. Törtes előjeltáblázat ábra (számláló, nevező, tört, x = b-nél tiltott kettős vonal)
export const FractionSignChartSvg: React.FC<FigureProps> = ({ size = 260, className = '' }) => {
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
      <text x="160" y="18" fill="#1e293b" fontSize="10" fontWeight="black" textAnchor="middle">
        TÖRTES ELŐJELTÁBLÁZAT: (x - 1) / (x - 4) &gt; 0
      </text>

      {/* Táblázat fejlécek és határok */}
      <rect x="15" y="28" width="290" height="142" rx="6" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.2" />

      {/* Vízszintes vonalak */}
      <line x1="15" y1="58" x2="305" y2="58" stroke="#cbd5e1" strokeWidth="1" />
      <line x1="15" y1="88" x2="305" y2="88" stroke="#cbd5e1" strokeWidth="1" />
      <line x1="15" y1="118" x2="305" y2="118" stroke="#cbd5e1" strokeWidth="1" />

      {/* Függőleges vonalak */}
      <line x1="90" y1="28" x2="90" y2="170" stroke="#cbd5e1" strokeWidth="1.2" />
      <line x1="160" y1="28" x2="160" y2="170" stroke="#cbd5e1" strokeWidth="1" />
      {/* x = 4-nél tiltó kettős piros vonal a nevező miatt */}
      <line x1="228" y1="28" x2="228" y2="170" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 2" />
      <line x1="232" y1="28" x2="232" y2="170" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 2" />

      {/* Fejléc szövegek */}
      <text x="52" y="46" fill="#475569" fontSize="9" fontWeight="bold" textAnchor="middle">Kifejezés</text>
      <text x="125" y="46" fill="#1e293b" fontSize="9" fontWeight="black" textAnchor="middle">x &lt; 1</text>
      <text x="195" y="46" fill="#1e293b" fontSize="9" fontWeight="black" textAnchor="middle">1 &lt; x &lt; 4</text>
      <text x="268" y="46" fill="#1e293b" fontSize="9" fontWeight="black" textAnchor="middle">x &gt; 4</text>

      {/* 1. sor: x - 1 */}
      <text x="52" y="76" fill="#334155" fontSize="9" fontWeight="bold" textAnchor="middle">x - 1</text>
      <circle cx="125" cy="73" r="10" fill="#fee2e2" />
      <text x="125" y="77" fill="#dc2626" fontSize="12" fontWeight="black" textAnchor="middle">-</text>
      <circle cx="195" cy="73" r="10" fill="#dcfce7" />
      <text x="195" y="77" fill="#16a34a" fontSize="12" fontWeight="black" textAnchor="middle">+</text>
      <circle cx="268" cy="73" r="10" fill="#dcfce7" />
      <text x="268" y="77" fill="#16a34a" fontSize="12" fontWeight="black" textAnchor="middle">+</text>

      {/* 2. sor: x - 4 */}
      <text x="52" y="106" fill="#334155" fontSize="9" fontWeight="bold" textAnchor="middle">x - 4</text>
      <circle cx="125" cy="103" r="10" fill="#fee2e2" />
      <text x="125" y="107" fill="#dc2626" fontSize="12" fontWeight="black" textAnchor="middle">-</text>
      <circle cx="195" cy="103" r="10" fill="#fee2e2" />
      <text x="195" y="107" fill="#dc2626" fontSize="12" fontWeight="black" textAnchor="middle">-</text>
      <circle cx="268" cy="103" r="10" fill="#dcfce7" />
      <text x="268" y="107" fill="#16a34a" fontSize="12" fontWeight="black" textAnchor="middle">+</text>

      {/* 3. sor: Tört előjele */}
      <rect x="16" y="119" width="73" height="50" fill="#f1f5f9" />
      <text x="52" y="148" fill="#1e40af" fontSize="9.5" fontWeight="black" textAnchor="middle">Tört előjele</text>

      {/* Tört előjelek */}
      <rect x="95" y="125" width="60" height="40" rx="4" fill="#dcfce7" stroke="#16a34a" strokeWidth="1" />
      <text x="125" y="142" fill="#15803d" fontSize="11" fontWeight="black" textAnchor="middle">+ (IGAZ)</text>
      <text x="125" y="156" fill="#166534" fontSize="7.5" textAnchor="middle">(-)/(-) = +</text>

      <rect x="165" y="125" width="60" height="40" rx="4" fill="#fee2e2" stroke="#dc2626" strokeWidth="1" />
      <text x="195" y="142" fill="#b91c1c" fontSize="11" fontWeight="black" textAnchor="middle">- (HAMIS)</text>
      <text x="195" y="156" fill="#991b1b" fontSize="7.5" textAnchor="middle">(+)/(-) = -</text>

      <rect x="238" y="125" width="60" height="40" rx="4" fill="#dcfce7" stroke="#16a34a" strokeWidth="1" />
      <text x="268" y="142" fill="#15803d" fontSize="11" fontWeight="black" textAnchor="middle">+ (IGAZ)</text>
      <text x="268" y="156" fill="#166534" fontSize="7.5" textAnchor="middle">(+)/(+) = +</text>
    </svg>
  );
};

// 2. Abszolútérték sáv és távolság ábra (|x - u| ≤ d)
export const AbsoluteValueInequalityBandSvg: React.FC<FigureProps> = ({ size = 260, className = '' }) => {
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
        ABSZOLÚTÉRTÉK MINT TÁVOLSÁG: |x - 3| ≤ 2
      </text>

      {/* Geometriai magyarázat */}
      <text x="160" y="38" fill="#475569" fontSize="8.5" textAnchor="middle">
        Az x távolsága a 3-as középponttól legfeljebb 2 egység
      </text>

      {/* Számegyenes */}
      <line x1="20" y1="100" x2="300" y2="100" stroke="#64748b" strokeWidth="1.8" />
      <polygon points="305,100 297,96 297,104" fill="#64748b" />
      <text x="306" y="96" fill="#64748b" fontSize="9" fontWeight="bold">x</text>

      {/* Skálapontok: 1, 2, 3 (közép), 4, 5 */}
      {/* Középpont: x = 3 -> SVG: 160 */}
      {/* Bal határ: x = 1 -> SVG: 90 */}
      {/* Jobb határ: x = 5 -> SVG: 230 */}

      {/* Kiemelt sáv a számegyenesen */}
      <line x1="90" y1="100" x2="230" y2="100" stroke="#4f46e5" strokeWidth="5" />

      {/* Távolság ívek felül */}
      <path d="M 160 85 Q 125 65 90 85" stroke="#4f46e5" strokeWidth="1.5" strokeDasharray="3 2" fill="none" />
      <text x="125" y="70" fill="#4338ca" fontSize="8" fontWeight="bold" textAnchor="middle">d ≤ 2</text>

      <path d="M 160 85 Q 195 65 230 85" stroke="#4f46e5" strokeWidth="1.5" strokeDasharray="3 2" fill="none" />
      <text x="195" y="70" fill="#4338ca" fontSize="8" fontWeight="bold" textAnchor="middle">d ≤ 2</text>

      {/* Pontok */}
      {/* 1-es pont */}
      <circle cx="90" cy="100" r="5" fill="#4f46e5" stroke="#ffffff" strokeWidth="1.5" />
      <line x1="90" y1="94" x2="90" y2="106" stroke="#ffffff" strokeWidth="1.5" />
      <text x="90" y="122" fill="#1e293b" fontSize="10" fontWeight="black" textAnchor="middle">1</text>
      <text x="90" y="134" fill="#64748b" fontSize="7.5" textAnchor="middle">(3 - 2)</text>

      {/* 3-as középpont */}
      <circle cx="160" cy="100" r="5" fill="#e11d48" stroke="#ffffff" strokeWidth="1.5" />
      <text x="160" y="122" fill="#e11d48" fontSize="11" fontWeight="black" textAnchor="middle">3</text>
      <text x="160" y="134" fill="#9f1239" fontSize="7.5" fontWeight="bold" textAnchor="middle">Középpont</text>

      {/* 5-ös pont */}
      <circle cx="230" cy="100" r="5" fill="#4f46e5" stroke="#ffffff" strokeWidth="1.5" />
      <line x1="230" y1="94" x2="230" y2="106" stroke="#ffffff" strokeWidth="1.5" />
      <text x="230" y="122" fill="#1e293b" fontSize="10" fontWeight="black" textAnchor="middle">5</text>
      <text x="230" y="134" fill="#64748b" fontSize="7.5" textAnchor="middle">(3 + 2)</text>

      {/* Megoldáshalmaz doboz */}
      <rect x="65" y="148" width="190" height="24" rx="5" fill="#ede9fe" stroke="#6366f1" strokeWidth="1" />
      <text x="160" y="164" fill="#4338ca" fontSize="9" fontWeight="black" textAnchor="middle">
        Megoldáshalmaz: x ∈ [1; 5]
      </text>
    </svg>
  );
};

// 3. Tilos ismeretlennel beszorozni veszélytábla ábra
export const DenominatorDangerTrapSvg: React.FC<FigureProps> = ({ size = 260, className = '' }) => {
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
      <text x="160" y="20" fill="#991b1b" fontSize="10" fontWeight="black" textAnchor="middle">
        ⚠ MIÉRT TILOS A NEVEZŐVEL ÁTBESZOROZNI?
      </text>

      {/* Bal oldal: HIBÁS ÚT */}
      <rect x="15" y="32" width="140" height="136" rx="6" fill="#fef2f2" stroke="#f87171" strokeWidth="1.2" />
      <text x="85" y="50" fill="#b91c1c" fontSize="9" fontWeight="black" textAnchor="middle">❌ HIBÁS BESZORZÁS</text>
      <text x="85" y="70" fill="#450a0a" fontSize="8.5" fontFamily="monospace" textAnchor="middle">3 / (x - 2) &gt; 1</text>
      <text x="85" y="86" fill="#dc2626" fontSize="8" fontWeight="bold" textAnchor="middle">Szorzás (x - 2)-vel:</text>
      <text x="85" y="102" fill="#7f1d1d" fontSize="8.5" textAnchor="middle">3 &gt; x - 2 ⟹ x &lt; 5</text>
      <line x1="25" y1="112" x2="145" y2="112" stroke="#fca5a5" strokeWidth="1" />
      <text x="85" y="128" fill="#991b1b" fontSize="7.5" fontWeight="bold" textAnchor="middle">CSAPDA: Ha x &lt; 2, a nevező</text>
      <text x="85" y="140" fill="#991b1b" fontSize="7.5" fontWeight="bold" textAnchor="middle">NEGATÍV! Megfordulna a jel!</text>
      <text x="85" y="156" fill="#ef4444" fontSize="8" fontWeight="black" textAnchor="middle">Hibás megoldás: ]-∞; 5[</text>

      {/* Jobb oldal: HELYES ÚT */}
      <rect x="165" y="32" width="140" height="136" rx="6" fill="#f0fdf4" stroke="#4ade80" strokeWidth="1.2" />
      <text x="235" y="50" fill="#15803d" fontSize="9" fontWeight="black" textAnchor="middle">✓ HELYES STRATÉGIA</text>
      <text x="235" y="70" fill="#052e16" fontSize="8.5" fontFamily="monospace" textAnchor="middle">3 / (x - 2) - 1 &gt; 0</text>
      <text x="235" y="86" fill="#16a34a" fontSize="8" fontWeight="bold" textAnchor="middle">Közös nevezőre hozás:</text>
      <text x="235" y="102" fill="#14532d" fontSize="8.5" textAnchor="middle">(5 - x) / (x - 2) &gt; 0</text>
      <line x1="175" y1="112" x2="295" y2="112" stroke="#86efac" strokeWidth="1" />
      <text x="235" y="128" fill="#166534" fontSize="7.5" fontWeight="bold" textAnchor="middle">Két zérushely: x = 2 és x = 5</text>
      <text x="235" y="140" fill="#166534" fontSize="7.5" fontWeight="bold" textAnchor="middle">A kettő között pozitív:</text>
      <text x="235" y="156" fill="#15803d" fontSize="8" fontWeight="black" textAnchor="middle">Helyes megoldás: ]2; 5[</text>
    </svg>
  );
};

// 4. Egyenlőtlenség-rendszer és intervallum-metszet ábra
export const ComplexIntervalIntersectionSvg: React.FC<FigureProps> = ({ size = 260, className = '' }) => {
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
        EGYENLŐTLENSÉG-RENDSZER: METSZET (I₁ ∩ I₂)
      </text>

      {/* 1. feltétel: x² ≥ 4 ⟹ x ≤ -2 vagy x ≥ 2 */}
      <text x="25" y="44" fill="#2563eb" fontSize="8.5" fontWeight="black">1. feltétel: x² ≥ 4</text>
      <line x1="20" y1="60" x2="300" y2="60" stroke="#cbd5e1" strokeWidth="1.5" />
      {/* Két félegyenes: -2-től balra és +2-től jobbra */}
      <line x1="20" y1="60" x2="110" y2="60" stroke="#2563eb" strokeWidth="4" />
      <circle cx="110" cy="60" r="4" fill="#2563eb" />
      <text x="110" y="74" fill="#1e40af" fontSize="8" fontWeight="bold" textAnchor="middle">-2</text>

      <line x1="210" y1="60" x2="300" y2="60" stroke="#2563eb" strokeWidth="4" />
      <circle cx="210" cy="60" r="4" fill="#2563eb" />
      <text x="210" y="74" fill="#1e40af" fontSize="8" fontWeight="bold" textAnchor="middle">2</text>

      {/* 2. feltétel: x &lt; 5 */}
      <text x="25" y="96" fill="#d97706" fontSize="8.5" fontWeight="black">2. feltétel: x &lt; 5</text>
      <line x1="20" y1="112" x2="300" y2="112" stroke="#cbd5e1" strokeWidth="1.5" />
      <line x1="20" y1="112" x2="270" y2="112" stroke="#d97706" strokeWidth="4" />
      <circle cx="270" cy="112" r="4" fill="#ffffff" stroke="#d97706" strokeWidth="2" />
      <text x="270" y="126" fill="#b45309" fontSize="8" fontWeight="bold" textAnchor="middle">5</text>

      {/* Eredmény: Közös metszet I₁ ∩ I₂ */}
      <text x="25" y="146" fill="#16a34a" fontSize="8.5" fontWeight="black">Közös metszet (Mindkettő):</text>
      <line x1="20" y1="160" x2="300" y2="160" stroke="#94a3b8" strokeWidth="1.5" />

      {/* ]-∞; -2] */}
      <line x1="20" y1="160" x2="110" y2="160" stroke="#16a34a" strokeWidth="4.5" />
      <circle cx="110" cy="160" r="4" fill="#16a34a" />
      <text x="110" y="174" fill="#15803d" fontSize="8" fontWeight="black" textAnchor="middle">-2</text>

      {/* [2; 5[ */}
      <line x1="210" y1="160" x2="270" y2="160" stroke="#16a34a" strokeWidth="4.5" />
      <circle cx="210" cy="160" r="4" fill="#16a34a" />
      <text x="210" y="174" fill="#15803d" fontSize="8" fontWeight="black" textAnchor="middle">2</text>
      <circle cx="270" cy="160" r="4" fill="#ffffff" stroke="#16a34a" strokeWidth="2" />
      <text x="270" y="174" fill="#15803d" fontSize="8" fontWeight="black" textAnchor="middle">5</text>
    </svg>
  );
};

// 5. Abszolútértékes másodfokú parabola ábra (|x² - 4| < 5)
export const AbsoluteQuadraticParabolaSvg: React.FC<FigureProps> = ({ size = 260, className = '' }) => {
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
        ABSZOLÚTÉRTÉKES PARABOLA: |x² - 4| &lt; 5
      </text>

      {/* x és y tengely */}
      <line x1="20" y1="130" x2="300" y2="130" stroke="#64748b" strokeWidth="1.2" />
      <line x1="160" y1="30" x2="160" y2="160" stroke="#64748b" strokeWidth="1.2" />
      <text x="302" y="127" fill="#64748b" fontSize="8" fontWeight="bold">x</text>
      <text x="165" y="32" fill="#64748b" fontSize="8" fontWeight="bold">y</text>

      {/* y = 5 konstans egyenes */}
      <line x1="40" y1="65" x2="280" y2="65" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4 2" />
      <text x="285" y="68" fill="#dc2626" fontSize="8" fontWeight="black">y = 5</text>

      {/* Görbe: y = |x² - 4|. A tengely alatt eredetileg negatív rész felhajlik! */}
      {/* Bal ág (x < -2): (50, 65) -> (100, 130) */}
      {/* Felhajló púp (-2 < x < 2): (100, 130) -> Q(160, 80) -> (220, 130) */}
      {/* Jobb ág (x > 2): (220, 130) -> (270, 65) */}
      <path
        d="M 50 65 Q 85 110 100 130 Q 160 70 220 130 Q 235 110 270 65"
        stroke="#6366f1"
        strokeWidth="2.5"
        fill="none"
      />

      {/* Metszéspontok a felső korláttal: x² - 4 = 5 ⟹ x² = 9 ⟹ x = ±3 */}
      <circle cx="50" cy="65" r="4.5" fill="#ffffff" stroke="#ef4444" strokeWidth="2" />
      <text x="50" y="145" fill="#1e293b" fontSize="9" fontWeight="black" textAnchor="middle">-3</text>

      <circle cx="270" cy="65" r="4.5" fill="#ffffff" stroke="#ef4444" strokeWidth="2" />
      <text x="270" y="145" fill="#1e293b" fontSize="9" fontWeight="black" textAnchor="middle">3</text>

      {/* Megoldási zóna lent */}
      <rect x="50" y="128" width="220" height="4" fill="#22c55e" />
      <text x="160" y="168" fill="#15803d" fontSize="9" fontWeight="black" textAnchor="middle">
        Megoldás: x ∈ ]-3; 3[
      </text>
    </svg>
  );
};
