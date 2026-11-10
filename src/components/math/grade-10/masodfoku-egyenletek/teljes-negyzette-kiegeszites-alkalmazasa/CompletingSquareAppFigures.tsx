import React from 'react';

interface FigureProps {
  size?: number;
  className?: string;
}

/**
 * 1. Főegyüttható (a ≠ 1) kezelésének 2 stratégiája SVG
 * Szemlélteti az osztás és a kiemelés módszerét.
 */
export const LeadingCoeffStrategySvg: React.FC<FigureProps> = ({ size = 460, className = '' }) => {
  return (
    <svg
      viewBox="0 0 460 230"
      width={size}
      height={(size * 230) / 460}
      className={`mx-auto select-none ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="stratHeaderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#EA580C" />
          <stop offset="100%" stopColor="#C2410C" />
        </linearGradient>
        <filter id="stratShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#0F172A" floodOpacity="0.12" />
        </filter>
      </defs>

      {/* Fő fejléc doboz */}
      <rect x="70" y="10" width="320" height="46" rx="12" fill="url(#stratHeaderGrad)" filter="url(#stratShadow)" />
      <text x="230" y="38" fill="#FFFFFF" fontSize="15" fontWeight="900" textAnchor="middle">
        Egyenlet a ≠ 1 esetén: ax² + bx + c = 0
      </text>

      {/* Elágazó vonalak */}
      <path d="M 160 56 L 160 85 L 115 85 L 115 98" stroke="#F97316" strokeWidth="2.5" fill="none" />
      <path d="M 300 56 L 300 85 L 345 85 L 345 98" stroke="#F97316" strokeWidth="2.5" fill="none" />

      {/* 1. Bal ág: Végigosztás a-val */}
      <rect x="15" y="98" width="205" height="122" rx="12" fill="#FFF7ED" stroke="#FB923C" strokeWidth="2" filter="url(#stratShadow)" />
      <rect x="25" y="108" width="185" height="26" rx="6" fill="#C2410C" />
      <text x="117" y="125" fill="#FFFFFF" fontSize="12" fontWeight="bold" textAnchor="middle">
        1. Stratégia: Végigosztás a-val
      </text>
      <text x="117" y="152" fill="#7C2D12" fontSize="13" fontWeight="bold" textAnchor="middle">
        x² + (b/a)x + (c/a) = 0
      </text>
      <text x="117" y="174" fill="#EA580C" fontSize="11" fontWeight="bold" textAnchor="middle">
        Normált alakra hozzuk
      </text>
      <text x="117" y="198" fill="#047857" fontSize="12" fontWeight="900" textAnchor="middle">
        Gyors, ha b és c osztható a-val!
      </text>

      {/* 2. Jobb ág: Kiemelés */}
      <rect x="240" y="98" width="205" height="122" rx="12" fill="#EFF6FF" stroke="#60A5FA" strokeWidth="2" filter="url(#stratShadow)" />
      <rect x="250" y="108" width="185" height="26" rx="6" fill="#1D4ED8" />
      <text x="342" y="125" fill="#FFFFFF" fontSize="12" fontWeight="bold" textAnchor="middle">
        2. Stratégia: a kiemelése
      </text>
      <text x="342" y="152" fill="#1E3A8A" fontSize="13" fontWeight="bold" textAnchor="middle">
        a · [x² + (b/a)x] + c = 0
      </text>
      <text x="342" y="174" fill="#2563EB" fontSize="11" fontWeight="bold" textAnchor="middle">
        a · [(x + d)² - d²] + c = 0
      </text>
      <text x="342" y="198" fill="#4338CA" fontSize="12" fontWeight="900" textAnchor="middle">
        Szélsőértékhez kötelező!
      </text>
    </svg>
  );
};

/**
 * 2. Szélsőérték (Minimum / Maximum) és Csúcspont SVG
 * f(x) = a(x - u)² + v parabola csúcspontjának leolvasása.
 */
export const ExtremumParabolaSvg: React.FC<FigureProps> = ({ size = 460, className = '' }) => {
  return (
    <svg
      viewBox="0 0 460 210"
      width={size}
      height={(size * 210) / 460}
      className={`mx-auto select-none ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="extShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#0F172A" floodOpacity="0.1" />
        </filter>
      </defs>

      {/* Bal oldali kártya: a > 0 (Felfelé nyíló, Minimum) */}
      <rect x="15" y="15" width="205" height="180" rx="12" fill="#F0FDF4" stroke="#22C55E" strokeWidth="2" filter="url(#extShadow)" />
      <rect x="25" y="25" width="185" height="28" rx="6" fill="#16A34A" />
      <text x="117" y="44" fill="#FFFFFF" fontSize="13" fontWeight="900" textAnchor="middle">
        Ha a &gt; 0: MINIMUM
      </text>
      {/* Mini parabola felfelé nyílva */}
      <path d="M 65 110 Q 117 150 169 110" stroke="#15803D" strokeWidth="3" fill="none" />
      <circle cx="117" cy="140" r="5" fill="#DC2626" />
      <text x="117" y="160" fill="#DC2626" fontSize="11" fontWeight="bold" textAnchor="middle">
        Csúcspont M(u; v)
      </text>
      <text x="117" y="85" fill="#14532D" fontSize="13" fontWeight="900" textAnchor="middle">
        f(x) = a(x - u)² + v
      </text>
      <text x="117" y="103" fill="#15803D" fontSize="11" fontWeight="bold" textAnchor="middle">
        Min. érték = v (hely: x = u)
      </text>

      {/* Jobb oldali kártya: a < 0 (Lefelé nyíló, Maximum) */}
      <rect x="240" y="15" width="205" height="180" rx="12" fill="#FEF2F2" stroke="#EF4444" strokeWidth="2" filter="url(#extShadow)" />
      <rect x="250" y="25" width="185" height="28" rx="6" fill="#DC2626" />
      <text x="342" y="44" fill="#FFFFFF" fontSize="13" fontWeight="900" textAnchor="middle">
        Ha a &lt; 0: MAXIMUM
      </text>
      {/* Mini parabola lefelé nyílva */}
      <path d="M 290 145 Q 342 105 394 145" stroke="#B91C1C" strokeWidth="3" fill="none" />
      <circle cx="342" cy="115" r="5" fill="#2563EB" />
      <text x="342" y="102" fill="#2563EB" fontSize="11" fontWeight="bold" textAnchor="middle">
        Csúcspont M(u; v)
      </text>
      <text x="342" y="165" fill="#7F1D1D" fontSize="13" fontWeight="900" textAnchor="middle">
        f(x) = -|a|(x - u)² + v
      </text>
      <text x="342" y="182" fill="#B91C1C" fontSize="11" fontWeight="bold" textAnchor="middle">
        Max. érték = v (hely: x = u)
      </text>
    </svg>
  );
};

/**
 * 3. Törtekkel való számolás lépései SVG
 * d = p/2 felezése törtként és d² levonása közös nevezővel.
 */
export const FractionalSquareMethodSvg: React.FC<FigureProps> = ({ size = 460, className = '' }) => {
  return (
    <svg
      viewBox="0 0 460 170"
      width={size}
      height={(size * 170) / 460}
      className={`mx-auto select-none ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="fracShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#0F172A" floodOpacity="0.1" />
        </filter>
      </defs>

      {/* 1. Lépés: Páratlan együttható */}
      <rect x="15" y="15" width="130" height="140" rx="10" fill="#FFFBEB" stroke="#F59E0B" strokeWidth="2" filter="url(#fracShadow)" />
      <rect x="25" y="25" width="110" height="26" rx="5" fill="#D97706" />
      <text x="80" y="42" fill="#FFFFFF" fontSize="12" fontWeight="bold" textAnchor="middle">
        1. Felezés (d)
      </text>
      <text x="80" y="75" fill="#78350F" fontSize="13" fontWeight="bold" textAnchor="middle">
        p = 5 esetén:
      </text>
      <text x="80" y="100" fill="#B45309" fontSize="15" fontWeight="900" textAnchor="middle">
        d = 5/2 = 2,5
      </text>
      <text x="80" y="130" fill="#92400E" fontSize="11" textAnchor="middle">
        Törtként kényelmesebb!
      </text>

      {/* 2. Lépés: Négyzetre emelés */}
      <rect x="165" y="15" width="130" height="140" rx="10" fill="#EFF6FF" stroke="#3B82F6" strokeWidth="2" filter="url(#fracShadow)" />
      <rect x="175" y="25" width="110" height="26" rx="5" fill="#2563EB" />
      <text x="230" y="42" fill="#FFFFFF" fontSize="12" fontWeight="bold" textAnchor="middle">
        2. Négyzet (d²)
      </text>
      <text x="230" y="75" fill="#1E3A8A" fontSize="13" fontWeight="bold" textAnchor="middle">
        (5/2)² számítása:
      </text>
      <text x="230" y="100" fill="#1D4ED8" fontSize="15" fontWeight="900" textAnchor="middle">
        d² = 25/4
      </text>
      <text x="230" y="130" fill="#1E40AF" fontSize="11" textAnchor="middle">
        Számláló², nevező²!
      </text>

      {/* 3. Lépés: Közös nevező */}
      <rect x="315" y="15" width="130" height="140" rx="10" fill="#F0FDF4" stroke="#10B981" strokeWidth="2" filter="url(#fracShadow)" />
      <rect x="325" y="25" width="110" height="26" rx="5" fill="#059669" />
      <text x="380" y="42" fill="#FFFFFF" fontSize="12" fontWeight="bold" textAnchor="middle">
        3. Közös nevező
      </text>
      <text x="380" y="75" fill="#064E3B" fontSize="13" fontWeight="bold" textAnchor="middle">
        Levonás és q:
      </text>
      <text x="380" y="100" fill="#047857" fontSize="13" fontWeight="900" textAnchor="middle">
        - 25/4 + q = k
      </text>
      <text x="380" y="130" fill="#065F46" fontSize="11" textAnchor="middle">
        4-edekre bővítünk!
      </text>
    </svg>
  );
};

/**
 * 4. Negatív Főegyüttható (a < 0) és Tükrözés SVG
 */
export const NegativeLeadingCoeffSvg: React.FC<FigureProps> = ({ size = 460, className = '' }) => {
  return (
    <svg
      viewBox="0 0 460 170"
      width={size}
      height={(size * 170) / 460}
      className={`mx-auto select-none ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="negShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#0F172A" floodOpacity="0.1" />
        </filter>
      </defs>

      <rect x="15" y="15" width="430" height="140" rx="12" fill="#FAF5FF" stroke="#A855F7" strokeWidth="2" filter="url(#negShadow)" />
      <rect x="25" y="25" width="410" height="28" rx="6" fill="#7E22CE" />
      <text x="230" y="44" fill="#FFFFFF" fontSize="13" fontWeight="900" textAnchor="middle">
        A legfontosabb fogás: Szorzás (-1)-gyel!
      </text>

      <g transform="translate(30, 70)">
        <text x="0" y="20" fill="#581C87" fontSize="15" fontWeight="900">
          -x² + 6x - 5 = 0
        </text>
        <text x="175" y="20" fill="#9333EA" fontSize="15" fontWeight="900">
          / · (-1)  ⟹
        </text>
        <text x="265" y="20" fill="#15803D" fontSize="15" fontWeight="900">
          x² - 6x + 5 = 0
        </text>
        <text x="0" y="52" fill="#6B21A8" fontSize="12" fontWeight="bold">
          Minden tag előjele megfordul! A kapott normált egyenlet azonnal megoldható: (x - 3)² = 4 ⟹ x₁ = 5, x₂ = 1.
        </text>
      </g>
    </svg>
  );
};

