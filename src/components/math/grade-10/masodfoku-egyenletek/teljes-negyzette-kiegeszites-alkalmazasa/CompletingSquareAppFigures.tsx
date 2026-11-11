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
 * f(x) = a(x - u)² + v parabola csúcspontjának leolvasása és grafikus ábrázolása
 * részletes koordináta-rendszerrel, szimmetriatengellyel és vetületekkel.
 */
export const ExtremumParabolaSvg: React.FC<FigureProps> = ({ size = 520, className = '' }) => {
  return (
    <svg
      viewBox="0 0 540 270"
      width={size}
      height={(size * 270) / 540}
      className={`mx-auto select-none ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="extShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#0F172A" floodOpacity="0.08" />
        </filter>
        <linearGradient id="minGradFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#22C55E" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#22C55E" stopOpacity="0.02" />
        </linearGradient>
        <linearGradient id="maxGradFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#EF4444" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#EF4444" stopOpacity="0.02" />
        </linearGradient>
      </defs>

      {/* ============================================================== */}
      {/* BAL OLDALI KÁRTYA: a > 0 (Felfelé nyíló parabola ⟹ MINIMUM)   */}
      {/* ============================================================== */}
      <g filter="url(#extShadow)">
        {/* Fő kártya doboz */}
        <rect x="10" y="8" width="255" height="254" rx="14" fill="#F0FDF4" stroke="#22C55E" strokeWidth="1.8" />

        {/* Fejléc sáv */}
        <rect x="20" y="16" width="235" height="26" rx="6" fill="#16A34A" />
        <text x="137" y="34" fill="#FFFFFF" fontSize="12" fontWeight="900" textAnchor="middle" letterSpacing="0.4">
          Ha a &gt; 0 : MINIMUM (felfelé nyílik)
        </text>

        {/* Képlet felirat */}
        <text x="137" y="58" fill="#14532D" fontSize="12.5" fontWeight="900" textAnchor="middle">
          f(x) = a(x - u)² + v
        </text>

        {/* Koordinátarendszer doboz */}
        <rect x="20" y="68" width="235" height="148" rx="8" fill="#FFFFFF" stroke="#BBF7D0" strokeWidth="1.2" />

        {/* Halvány koordinátarács */}
        <g stroke="#F1F5F9" strokeWidth="1">
          <line x1="50" y1="68" x2="50" y2="216" />
          <line x1="85" y1="68" x2="85" y2="216" />
          <line x1="120" y1="68" x2="120" y2="216" />
          <line x1="155" y1="68" x2="155" y2="216" />
          <line x1="190" y1="68" x2="190" y2="216" />
          <line x1="225" y1="68" x2="225" y2="216" />
          <line x1="20" y1="92" x2="255" y2="92" />
          <line x1="20" y1="117" x2="255" y2="117" />
          <line x1="20" y1="142" x2="255" y2="142" />
          <line x1="20" y1="167" x2="255" y2="167" />
          <line x1="20" y1="192" x2="255" y2="192" />
        </g>

        {/* X tengely */}
        <line x1="28" y1="182" x2="246" y2="182" stroke="#475569" strokeWidth="1.6" />
        <polygon points="248,182 241,178 241,186" fill="#475569" />
        <text x="242" y="174" fill="#475569" fontSize="10" fontWeight="bold">x</text>

        {/* Y tengely */}
        <line x1="52" y1="210" x2="52" y2="74" stroke="#475569" strokeWidth="1.6" />
        <polygon points="52,72 48,79 56,79" fill="#475569" />
        <text x="60" y="82" fill="#475569" fontSize="10" fontWeight="bold">y</text>
        <text x="44" y="193" fill="#94A3B8" fontSize="8.5" textAnchor="end">O</text>

        {/* Szimmetriatengely: x = u */}
        <line x1="145" y1="74" x2="145" y2="182" stroke="#10B981" strokeWidth="1.2" strokeDasharray="3 3" />
        <text x="145" y="73" fill="#059669" fontSize="7.5" fontWeight="bold" textAnchor="middle">
          x = u (szimm.)
        </text>

        {/* Vetület a vízszintes y tengelyre: y = v */}
        <line x1="52" y1="142" x2="145" y2="142" stroke="#10B981" strokeWidth="1.2" strokeDasharray="3 3" />

        {/* v jelölése az Y tengelyen */}
        <line x1="49" y1="142" x2="55" y2="142" stroke="#15803D" strokeWidth="2" />
        <text x="45" y="146" fill="#15803D" fontSize="10" fontWeight="900" textAnchor="end">
          v
        </text>

        {/* u jelölése az X tengelyen */}
        <line x1="145" y1="179" x2="145" y2="185" stroke="#15803D" strokeWidth="2" />
        <text x="145" y="196" fill="#15803D" fontSize="10" fontWeight="900" textAnchor="middle">
          u (hely)
        </text>

        {/* Parabola ív (felfelé nyíló, csúcs: (145, 142)) */}
        {/* Bezier: t=0.5 esetén y = 0.25*86 + 0.5*198 + 0.25*86 = 43 + 99 = 142 */}
        <path
          d="M 80 86 Q 145 198 210 86"
          stroke="#16A34A"
          strokeWidth="3.2"
          fill="none"
          strokeLinecap="round"
        />

        {/* Csúcspont M(u; v) - pontosan a parabola csúcsán */}
        <circle cx="145" cy="142" r="6.5" fill="#DC2626" fillOpacity="0.2" stroke="#DC2626" strokeWidth="1.5" />
        <circle cx="145" cy="142" r="3.5" fill="#DC2626" />

        {/* Csúcspont felirat buborék */}
        <rect x="98" y="152" width="94" height="18" rx="4" fill="#FEF2F2" stroke="#FCA5A5" strokeWidth="1" />
        <text x="145" y="165" fill="#DC2626" fontSize="9" fontWeight="900" textAnchor="middle">
          Csúcspont M(u; v)
        </text>

        {/* Minimum címke az Y tengely mellett */}
        <rect x="58" y="132" width="46" height="15" rx="3" fill="#DCFCE7" />
        <text x="81" y="143" fill="#166534" fontSize="8" fontWeight="bold" textAnchor="middle">
          Min = v
        </text>

        {/* Alsó összegző sáv */}
        <rect x="20" y="222" width="235" height="32" rx="6" fill="#DCFCE7" stroke="#86EFAC" strokeWidth="1" />
        <text x="137" y="235" fill="#14532D" fontSize="9.5" fontWeight="900" textAnchor="middle">
          Min. érték = v &nbsp;(a legkisebb érték x = u helyen)
        </text>
        <text x="137" y="248" fill="#166534" fontSize="8.5" fontWeight="bold" textAnchor="middle">
          Értékkészlet: Rf = [v; ∞[
        </text>
      </g>

      {/* ============================================================== */}
      {/* JOBB OLDALI KÁRTYA: a < 0 (Lefelé nyíló parabola ⟹ MAXIMUM)   */}
      {/* ============================================================== */}
      <g filter="url(#extShadow)">
        {/* Fő kártya doboz */}
        <rect x="275" y="8" width="255" height="254" rx="14" fill="#FEF2F2" stroke="#EF4444" strokeWidth="1.8" />

        {/* Fejléc sáv */}
        <rect x="285" y="16" width="235" height="26" rx="6" fill="#DC2626" />
        <text x="402" y="34" fill="#FFFFFF" fontSize="12" fontWeight="900" textAnchor="middle" letterSpacing="0.4">
          Ha a &lt; 0 : MAXIMUM (lefelé nyílik)
        </text>

        {/* Képlet felirat */}
        <text x="402" y="58" fill="#7F1D1D" fontSize="12.5" fontWeight="900" textAnchor="middle">
          f(x) = a(x - u)² + v &nbsp;(a &lt; 0)
        </text>

        {/* Koordinátarendszer doboz */}
        <rect x="285" y="68" width="235" height="148" rx="8" fill="#FFFFFF" stroke="#FECDD3" strokeWidth="1.2" />

        {/* Halvány koordinátarács */}
        <g stroke="#F1F5F9" strokeWidth="1">
          <line x1="315" y1="68" x2="315" y2="216" />
          <line x1="350" y1="68" x2="350" y2="216" />
          <line x1="385" y1="68" x2="385" y2="216" />
          <line x1="420" y1="68" x2="420" y2="216" />
          <line x1="455" y1="68" x2="455" y2="216" />
          <line x1="490" y1="68" x2="490" y2="216" />
          <line x1="285" y1="92" x2="520" y2="92" />
          <line x1="285" y1="117" x2="520" y2="117" />
          <line x1="285" y1="142" x2="520" y2="142" />
          <line x1="285" y1="167" x2="520" y2="167" />
          <line x1="285" y1="192" x2="520" y2="192" />
        </g>

        {/* X tengely */}
        <line x1="293" y1="182" x2="511" y2="182" stroke="#475569" strokeWidth="1.6" />
        <polygon points="513,182 506,178 506,186" fill="#475569" />
        <text x="507" y="174" fill="#475569" fontSize="10" fontWeight="bold">x</text>

        {/* Y tengely */}
        <line x1="317" y1="210" x2="317" y2="74" stroke="#475569" strokeWidth="1.6" />
        <polygon points="317,72 313,79 321,79" fill="#475569" />
        <text x="325" y="82" fill="#475569" fontSize="10" fontWeight="bold">y</text>
        <text x="309" y="193" fill="#94A3B8" fontSize="8.5" textAnchor="end">O</text>

        {/* Szimmetriatengely: x = u */}
        <line x1="410" y1="74" x2="410" y2="182" stroke="#F87171" strokeWidth="1.2" strokeDasharray="3 3" />
        <text x="410" y="73" fill="#B91C1C" fontSize="7.5" fontWeight="bold" textAnchor="middle">
          x = u (szimm.)
        </text>

        {/* Vetület a vízszintes y tengelyre: y = v */}
        <line x1="317" y1="104" x2="410" y2="104" stroke="#F87171" strokeWidth="1.2" strokeDasharray="3 3" />

        {/* v jelölése az Y tengelyen */}
        <line x1="314" y1="104" x2="320" y2="104" stroke="#B91C1C" strokeWidth="2" />
        <text x="310" y="108" fill="#B91C1C" fontSize="10" fontWeight="900" textAnchor="end">
          v
        </text>

        {/* u jelölése az X tengelyen */}
        <line x1="410" y1="179" x2="410" y2="185" stroke="#B91C1C" strokeWidth="2" />
        <text x="410" y="196" fill="#B91C1C" fontSize="10" fontWeight="900" textAnchor="middle">
          u (hely)
        </text>

        {/* Parabola ív (lefelé nyíló, csúcs: (410, 104)) */}
        {/* Bezier: t=0.5 esetén y = 0.25*168 + 0.5*40 + 0.25*168 = 42 + 20 + 42 = 104 */}
        <path
          d="M 345 168 Q 410 40 475 168"
          stroke="#DC2626"
          strokeWidth="3.2"
          fill="none"
          strokeLinecap="round"
        />

        {/* Csúcspont M(u; v) - pontosan a parabola csúcsán */}
        <circle cx="410" cy="104" r="6.5" fill="#2563EB" fillOpacity="0.2" stroke="#2563EB" strokeWidth="1.5" />
        <circle cx="410" cy="104" r="3.5" fill="#2563EB" />

        {/* Csúcspont felirat buborék a csúcs felett */}
        <rect x="363" y="80" width="94" height="18" rx="4" fill="#EFF6FF" stroke="#BFDBFE" strokeWidth="1" />
        <text x="410" y="93" fill="#1D4ED8" fontSize="9" fontWeight="900" textAnchor="middle">
          Csúcspont M(u; v)
        </text>

        {/* Maximum címke az Y tengely mellett */}
        <rect x="323" y="94" width="48" height="15" rx="3" fill="#FEE2E2" />
        <text x="347" y="105" fill="#991B1B" fontSize="8" fontWeight="bold" textAnchor="middle">
          Max = v
        </text>

        {/* Alsó összegző sáv */}
        <rect x="285" y="222" width="235" height="32" rx="6" fill="#FEE2E2" stroke="#FCA5A5" strokeWidth="1" />
        <text x="402" y="235" fill="#7F1D1D" fontSize="9.5" fontWeight="900" textAnchor="middle">
          Max. érték = v &nbsp;(a legnagyobb érték x = u helyen)
        </text>
        <text x="402" y="248" fill="#991B1B" fontSize="8.5" fontWeight="bold" textAnchor="middle">
          Értékkészlet: Rf = ]-∞; v]
        </text>
      </g>
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

