import React from 'react';

interface FigureProps {
  size?: number;
  className?: string;
}

/**
 * 1. A Diszkrimináns 3 Alapesete és Grafikus Jelentése SVG
 * Összehasonlító 3 paneles ábra: D > 0, D = 0, D < 0
 */
export const DiscriminantCasesSvg: React.FC<FigureProps> = ({ size = 500, className = '' }) => {
  return (
    <svg
      viewBox="0 0 540 260"
      width={size}
      height={(size * 260) / 540}
      className={`mx-auto select-none ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="discCaseShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#0F172A" floodOpacity="0.08" />
        </filter>
        <linearGradient id="panelGradEmerald" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ECFDF5" />
          <stop offset="100%" stopColor="#D1FAE5" />
        </linearGradient>
        <linearGradient id="panelGradAmber" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFBEB" />
          <stop offset="100%" stopColor="#FEF3C7" />
        </linearGradient>
        <linearGradient id="panelGradRose" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFF1F2" />
          <stop offset="100%" stopColor="#FFE4E6" />
        </linearGradient>
      </defs>

      {/* Főcím */}
      <rect x="70" y="8" width="400" height="28" rx="8" fill="#7C3AED" />
      <text x="270" y="27" fill="#FFFFFF" fontSize="12" fontWeight="900" textAnchor="middle" letterSpacing="0.5">
        A DISZKRIMINÁNS ÉS A VALÓS GYÖKÖK SZÁMA (a &gt; 0)
      </text>

      {/* 1. Panel: D > 0 */}
      <g filter="url(#discCaseShadow)">
        <rect x="15" y="46" width="160" height="202" rx="12" fill="url(#panelGradEmerald)" stroke="#10B981" strokeWidth="1.5" />
        <rect x="25" y="56" width="140" height="24" rx="6" fill="#10B981" />
        <text x="95" y="72" fill="#FFFFFF" fontSize="11" fontWeight="bold" textAnchor="middle">
          D &gt; 0 (Pozitív)
        </text>

        {/* Mini koordináta rendszer */}
        <line x1="30" y1="140" x2="160" y2="140" stroke="#64748B" strokeWidth="1.5" strokeDasharray="3 3" />
        <text x="158" y="136" fill="#64748B" fontSize="9" fontWeight="bold">x</text>

        {/* Parabola: 2 metszéspont */}
        <path d="M 40 100 Q 95 170 150 100" stroke="#059669" strokeWidth="2.5" fill="none" />
        {/* Metszéspontok */}
        <circle cx="58" cy="140" r="4" fill="#047857" stroke="#FFFFFF" strokeWidth="1.5" />
        <circle cx="132" cy="140" r="4" fill="#047857" stroke="#FFFFFF" strokeWidth="1.5" />
        <text x="58" y="153" fill="#065F46" fontSize="9" fontWeight="bold" textAnchor="middle">x₁</text>
        <text x="132" y="153" fill="#065F46" fontSize="9" fontWeight="bold" textAnchor="middle">x₂</text>

        {/* Leírás */}
        <rect x="23" y="166" width="144" height="72" rx="8" fill="#FFFFFF" opacity="0.9" />
        <text x="95" y="182" fill="#065F46" fontSize="10" fontWeight="bold" textAnchor="middle">
          2 KÜLÖNBÖZŐ GYÖK
        </text>
        <text x="95" y="198" fill="#334155" fontSize="8.5" textAnchor="middle">
          x₁,₂ = (-b ± √D) / (2a)
        </text>
        <text x="95" y="214" fill="#059669" fontSize="8" fontWeight="bold" textAnchor="middle">
          A parabola metszi
        </text>
        <text x="95" y="226" fill="#059669" fontSize="8" fontWeight="bold" textAnchor="middle">
          az x-tengelyt (2 pont)
        </text>
      </g>

      {/* 2. Panel: D = 0 */}
      <g filter="url(#discCaseShadow)">
        <rect x="190" y="46" width="160" height="202" rx="12" fill="url(#panelGradAmber)" stroke="#F59E0B" strokeWidth="1.5" />
        <rect x="200" y="56" width="140" height="24" rx="6" fill="#F59E0B" />
        <text x="270" y="72" fill="#FFFFFF" fontSize="11" fontWeight="bold" textAnchor="middle">
          D = 0 (Nulla)
        </text>

        {/* Mini koordináta rendszer */}
        <line x1="205" y1="140" x2="335" y2="140" stroke="#64748B" strokeWidth="1.5" strokeDasharray="3 3" />
        <text x="333" y="136" fill="#64748B" fontSize="9" fontWeight="bold">x</text>

        {/* Parabola: érinti az x tengelyt */}
        <path d="M 215 90 Q 270 140 325 90" stroke="#D97706" strokeWidth="2.5" fill="none" />
        {/* Érintési pont */}
        <circle cx="270" cy="140" r="4.5" fill="#B45309" stroke="#FFFFFF" strokeWidth="1.5" />
        <text x="270" y="154" fill="#92400E" fontSize="9" fontWeight="bold" textAnchor="middle">x₁ = x₂</text>

        {/* Leírás */}
        <rect x="198" y="166" width="144" height="72" rx="8" fill="#FFFFFF" opacity="0.9" />
        <text x="270" y="182" fill="#92400E" fontSize="10" fontWeight="bold" textAnchor="middle">
          1 VALÓS GYÖK
        </text>
        <text x="270" y="198" fill="#334155" fontSize="8.5" textAnchor="middle">
          x = -b / (2a) (kettős gyök)
        </text>
        <text x="270" y="214" fill="#D97706" fontSize="8" fontWeight="bold" textAnchor="middle">
          A parabola érinti
        </text>
        <text x="270" y="226" fill="#D97706" fontSize="8" fontWeight="bold" textAnchor="middle">
          az x-tengelyt (1 pont)
        </text>
      </g>

      {/* 3. Panel: D < 0 */}
      <g filter="url(#discCaseShadow)">
        <rect x="365" y="46" width="160" height="202" rx="12" fill="url(#panelGradRose)" stroke="#F43F5E" strokeWidth="1.5" />
        <rect x="375" y="56" width="140" height="24" rx="6" fill="#F43F5E" />
        <text x="445" y="72" fill="#FFFFFF" fontSize="11" fontWeight="bold" textAnchor="middle">
          D &lt; 0 (Negatív)
        </text>

        {/* Mini koordináta rendszer */}
        <line x1="380" y1="150" x2="510" y2="150" stroke="#64748B" strokeWidth="1.5" strokeDasharray="3 3" />
        <text x="508" y="146" fill="#64748B" fontSize="9" fontWeight="bold">x</text>

        {/* Parabola: a tengely felett lebeg */}
        <path d="M 390 90 Q 445 125 500 90" stroke="#E11D48" strokeWidth="2.5" fill="none" />
        {/* Csúcspont jelölés */}
        <circle cx="445" cy="125" r="3.5" fill="#BE123C" />
        <text x="445" y="140" fill="#BE123C" fontSize="8" fontStyle="italic" textAnchor="middle">Csúcs &gt; 0</text>

        {/* Leírás */}
        <rect x="373" y="166" width="144" height="72" rx="8" fill="#FFFFFF" opacity="0.9" />
        <text x="445" y="182" fill="#9F1239" fontSize="10" fontWeight="bold" textAnchor="middle">
          NINCS VALÓS GYÖK
        </text>
        <text x="445" y="198" fill="#334155" fontSize="8.5" textAnchor="middle">
          √D nem értelmezett ℝ-ben
        </text>
        <text x="445" y="214" fill="#E11D48" fontSize="8" fontWeight="bold" textAnchor="middle">
          Nem metszi és nem érinti
        </text>
        <text x="445" y="226" fill="#E11D48" fontSize="8" fontWeight="bold" textAnchor="middle">
          az x-tengelyt (0 pont)
        </text>
      </g>
    </svg>
  );
};

/**
 * 2. A Diszkrimináns Képlete és Tulajdonságai SVG
 */
export const DiscriminantFormulaSvg: React.FC<FigureProps> = ({ size = 500, className = '' }) => {
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
        <filter id="formShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#0F172A" floodOpacity="0.08" />
        </filter>
      </defs>

      {/* Fő kártya doboz */}
      <rect x="15" y="10" width="490" height="200" rx="14" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.5" filter="url(#formShadow)" />

      {/* Kiemelt képlet sáv */}
      <rect x="35" y="22" width="450" height="52" rx="10" fill="#7C3AED" />
      <text x="260" y="55" fill="#FFFFFF" fontSize="22" fontWeight="900" textAnchor="middle" letterSpacing="1">
        D = b² - 4ac
      </text>

      {/* 3 Oszlop magyarázat */}
      {/* 1. b² tag */}
      <rect x="35" y="86" width="138" height="110" rx="8" fill="#EDE9FE" stroke="#C4B5FD" strokeWidth="1" />
      <text x="104" y="106" fill="#6D28D9" fontSize="12" fontWeight="900" textAnchor="middle">b² tag</text>
      <text x="104" y="126" fill="#4B5563" fontSize="9.5" textAnchor="middle">Bármely valós b-re:</text>
      <rect x="47" y="134" width="114" height="22" rx="5" fill="#FFFFFF" />
      <text x="104" y="149" fill="#7C3AED" fontSize="10.5" fontWeight="bold" textAnchor="middle">b² ≥ 0</text>
      <text x="104" y="174" fill="#6B7280" fontSize="8.5" textAnchor="middle">Nem lehet negatív!</text>
      <text x="104" y="186" fill="#6B7280" fontSize="8.5" textAnchor="middle">(-5)² = +25</text>

      {/* 2. -4ac tag */}
      <rect x="191" y="86" width="138" height="110" rx="8" fill="#F0FDF4" stroke="#86EFAC" strokeWidth="1" />
      <text x="260" y="106" fill="#15803D" fontSize="12" fontWeight="900" textAnchor="middle">-4ac tag</text>
      <text x="260" y="126" fill="#4B5563" fontSize="9.5" textAnchor="middle">Előjelét a · c dönti el:</text>
      <rect x="203" y="134" width="114" height="22" rx="5" fill="#FFFFFF" />
      <text x="260" y="149" fill="#16A34A" fontSize="9.5" fontWeight="bold" textAnchor="middle">ha a·c &lt; 0 ⟹ -4ac &gt; 0</text>
      <text x="260" y="174" fill="#15803D" fontSize="8.5" fontWeight="bold" textAnchor="middle">Ellentétes előjel esetén</text>
      <text x="260" y="186" fill="#15803D" fontSize="8.5" textAnchor="middle">mindig van 2 valós gyök!</text>

      {/* 3. A D szerepe */}
      <rect x="347" y="86" width="138" height="110" rx="8" fill="#FFFBEB" stroke="#FDE68A" strokeWidth="1" />
      <text x="416" y="106" fill="#B45309" fontSize="12" fontWeight="900" textAnchor="middle">D szerepe</text>
      <text x="416" y="126" fill="#4B5563" fontSize="9.5" textAnchor="middle">A megoldóképletben:</text>
      <rect x="359" y="134" width="114" height="22" rx="5" fill="#FFFFFF" />
      <text x="416" y="149" fill="#D97706" fontSize="10.5" fontWeight="bold" textAnchor="middle">x₁,₂ = (-b ± √D)/(2a)</text>
      <text x="416" y="174" fill="#78350F" fontSize="8.5" textAnchor="middle">A négyzetgyök alatti</text>
      <text x="416" y="186" fill="#78350F" fontSize="8.5" textAnchor="middle">kifejezés (radicand)</text>
    </svg>
  );
};

/**
 * 3. Parabolacsalád Ábrázolása a c Paraméter Függvényében SVG
 * y = x² - 4x + c különböző c értékekre: c=3 (D>0), c=4 (D=0), c=5 (D<0)
 */
export const DiscriminantParabolaFamilySvg: React.FC<FigureProps> = ({ size = 500, className = '' }) => {
  return (
    <svg
      viewBox="0 0 520 270"
      width={size}
      height={(size * 270) / 520}
      className={`mx-auto select-none ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="parabShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#0F172A" floodOpacity="0.08" />
        </filter>
      </defs>

      {/* Háttér tábla */}
      <rect x="10" y="10" width="500" height="250" rx="12" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1.5" />

      {/* Koordinátarendszer */}
      {/* Rácsvonalak */}
      <g stroke="#E2E8F0" strokeWidth="1" strokeDasharray="2 2">
        <line x1="40" y1="50" x2="350" y2="50" />
        <line x1="40" y1="90" x2="350" y2="90" />
        <line x1="40" y1="130" x2="350" y2="130" />
        <line x1="40" y1="170" x2="350" y2="170" />
        <line x1="40" y1="210" x2="350" y2="210" />
        <line x1="80" y1="30" x2="80" y2="230" />
        <line x1="140" y1="30" x2="140" y2="230" />
        <line x1="200" y1="30" x2="200" y2="230" />
        <line x1="260" y1="30" x2="260" y2="230" />
        <line x1="320" y1="30" x2="320" y2="230" />
      </g>

      {/* Tengelyek */}
      {/* X tengely */}
      <line x1="30" y1="170" x2="355" y2="170" stroke="#334155" strokeWidth="2" />
      <polygon points="358,170 350,166 350,174" fill="#334155" />
      <text x="353" y="160" fill="#334155" fontSize="11" fontWeight="bold">x</text>

      {/* Y tengely */}
      <line x1="80" y1="240" x2="80" y2="25" stroke="#334155" strokeWidth="2" />
      <polygon points="80,22 76,30 84,30" fill="#334155" />
      <text x="90" y="32" fill="#334155" fontSize="11" fontWeight="bold">y</text>

      {/* Tengely skála számok */}
      <text x="74" y="184" fill="#64748B" fontSize="9" textAnchor="end">0</text>
      <text x="140" y="184" fill="#64748B" fontSize="9" textAnchor="middle">1</text>
      <text x="200" y="184" fill="#64748B" fontSize="9" textAnchor="middle">2</text>
      <text x="260" y="184" fill="#64748B" fontSize="9" textAnchor="middle">3</text>
      <text x="320" y="184" fill="#64748B" fontSize="9" textAnchor="middle">4</text>

      {/* Parabola 1: c = 3 ⟹ y = x² - 4x + 3 ⟹ D = 16 - 12 = 4 > 0 (Zöld) */}
      {/* Csúcspont (2, -1): x=200, y=210. Metszéspontok: x=1 (140, 170) és x=3 (260, 170) */}
      <path d="M 110 90 Q 200 250 290 90" stroke="#10B981" strokeWidth="2.5" fill="none" />
      <circle cx="140" cy="170" r="3.5" fill="#047857" />
      <circle cx="260" cy="170" r="3.5" fill="#047857" />
      <circle cx="200" cy="210" r="3" fill="#047857" />

      {/* Parabola 2: c = 4 ⟹ y = x² - 4x + 4 ⟹ D = 16 - 16 = 0 (Borostyán) */}
      {/* Csúcspont (2, 0): x=200, y=170. Érinti az x tengelyt */}
      <path d="M 110 50 Q 200 210 290 50" stroke="#F59E0B" strokeWidth="2.5" fill="none" />
      <circle cx="200" cy="170" r="4" fill="#B45309" stroke="#FFFFFF" strokeWidth="1.5" />

      {/* Parabola 3: c = 5 ⟹ y = x² - 4x + 5 ⟹ D = 16 - 20 = -4 < 0 (Rózsaszín/Piros) */}
      {/* Csúcspont (2, 1): x=200, y=130. Lebeg a tengely felett */}
      <path d="M 110 30 Q 200 170 290 30" stroke="#F43F5E" strokeWidth="2.5" fill="none" />
      <circle cx="200" cy="130" r="3" fill="#BE123C" />

      {/* Jelmagyarázat doboz a jobb oldalon */}
      <rect x="365" y="35" width="135" height="205" rx="8" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" filter="url(#parabShadow)" />
      <text x="432" y="52" fill="#0F172A" fontSize="10.5" fontWeight="900" textAnchor="middle">y = x² - 4x + c</text>

      {/* Legenda 1: c = 3 */}
      <rect x="373" y="62" width="119" height="50" rx="6" fill="#ECFDF5" stroke="#A7F3D0" strokeWidth="1" />
      <circle cx="383" cy="74" r="4" fill="#10B981" />
      <text x="393" y="77" fill="#065F46" fontSize="9.5" fontWeight="bold">c = 3 ⟹ D = +4</text>
      <text x="383" y="92" fill="#047857" fontSize="8.5">D &gt; 0: 2 metszéspont</text>
      <text x="383" y="104" fill="#475569" fontSize="8">x₁ = 1, x₂ = 3</text>

      {/* Legenda 2: c = 4 */}
      <rect x="373" y="118" width="119" height="50" rx="6" fill="#FFFBEB" stroke="#FDE68A" strokeWidth="1" />
      <circle cx="383" cy="130" r="4" fill="#F59E0B" />
      <text x="393" y="133" fill="#92400E" fontSize="9.5" fontWeight="bold">c = 4 ⟹ D = 0</text>
      <text x="383" y="148" fill="#B45309" fontSize="8.5">D = 0: 1 érintési pont</text>
      <text x="383" y="160" fill="#475569" fontSize="8">x₁ = x₂ = 2</text>

      {/* Legenda 3: c = 5 */}
      <rect x="373" y="174" width="119" height="56" rx="6" fill="#FFF1F2" stroke="#FECDD3" strokeWidth="1" />
      <circle cx="383" cy="186" r="4" fill="#F43F5E" />
      <text x="393" y="189" fill="#9F1239" fontSize="9.5" fontWeight="bold">c = 5 ⟹ D = -4</text>
      <text x="383" y="204" fill="#BE123C" fontSize="8.5">D &lt; 0: 0 közös pont</text>
      <text x="383" y="216" fill="#475569" fontSize="8">Nincs valós gyök (lebeg)</text>
    </svg>
  );
};

/**
 * 4. A Másodfokú Polinom Állandó Előjele SVG
 * D < 0 esetén a polinom minden x-re azonos előjelű
 */
export const SignOfQuadraticSvg: React.FC<FigureProps> = ({ size = 500, className = '' }) => {
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
        <filter id="signShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#0F172A" floodOpacity="0.08" />
        </filter>
      </defs>

      {/* Cím csík */}
      <rect x="70" y="8" width="380" height="26" rx="6" fill="#0284C7" />
      <text x="260" y="25" fill="#FFFFFF" fontSize="11.5" fontWeight="900" textAnchor="middle" letterSpacing="0.5">
        ÁLLANDÓ ELŐJELŰ POLINOMOK (D &lt; 0 SZABÁLYA)
      </text>

      {/* Bal oldali eset: a > 0 és D < 0 ⟹ Mindig POZITÍV */}
      <g filter="url(#signShadow)">
        <rect x="25" y="44" width="225" height="142" rx="10" fill="#F0FDF4" stroke="#86EFAC" strokeWidth="1.5" />
        <rect x="35" y="52" width="205" height="22" rx="5" fill="#16A34A" />
        <text x="137" y="67" fill="#FFFFFF" fontSize="10.5" fontWeight="bold" textAnchor="middle">
          a &gt; 0 ÉS D &lt; 0 ⟹ MINDIG POZITÍV
        </text>

        {/* Mini grafikon */}
        <line x1="45" y1="120" x2="230" y2="120" stroke="#94A3B8" strokeWidth="1.5" strokeDasharray="2 2" />
        <text x="228" y="116" fill="#94A3B8" fontSize="8" fontWeight="bold">x</text>
        <path d="M 65 85 Q 137 110 210 85" stroke="#15803D" strokeWidth="2.2" fill="none" />

        {/* Zöld plusz jelek az x tengely felett */}
        <text x="85" y="105" fill="#16A34A" fontSize="12" fontWeight="bold">+</text>
        <text x="137" y="105" fill="#16A34A" fontSize="12" fontWeight="bold">+</text>
        <text x="185" y="105" fill="#16A34A" fontSize="12" fontWeight="bold">+</text>

        <rect x="35" y="132" width="205" height="44" rx="6" fill="#FFFFFF" />
        <text x="137" y="148" fill="#15803D" fontSize="9.5" fontWeight="bold" textAnchor="middle">
          ax² + bx + c &gt; 0 minden x ∈ ℝ
        </text>
        <text x="137" y="164" fill="#64748B" fontSize="8" textAnchor="middle">
          A parabola a tengely felett lebeg
        </text>
      </g>

      {/* Jobb oldali eset: a < 0 és D < 0 ⟹ Mindig NEGATÍV */}
      <g filter="url(#signShadow)">
        <rect x="270" y="44" width="225" height="142" rx="10" fill="#FFF1F2" stroke="#FDA4AF" strokeWidth="1.5" />
        <rect x="280" y="52" width="205" height="22" rx="5" fill="#E11D48" />
        <text x="382" y="67" fill="#FFFFFF" fontSize="10.5" fontWeight="bold" textAnchor="middle">
          a &lt; 0 ÉS D &lt; 0 ⟹ MINDIG NEGATÍV
        </text>

        {/* Mini grafikon */}
        <line x1="290" y1="90" x2="475" y2="90" stroke="#94A3B8" strokeWidth="1.5" strokeDasharray="2 2" />
        <text x="473" y="86" fill="#94A3B8" fontSize="8" fontWeight="bold">x</text>
        <path d="M 310 125 Q 382 100 455 125" stroke="#BE123C" strokeWidth="2.2" fill="none" />

        {/* Piros mínusz jelek az x tengely alatt */}
        <text x="330" y="112" fill="#E11D48" fontSize="14" fontWeight="bold">−</text>
        <text x="382" y="112" fill="#E11D48" fontSize="14" fontWeight="bold">−</text>
        <text x="430" y="112" fill="#E11D48" fontSize="14" fontWeight="bold">−</text>

        <rect x="280" y="132" width="205" height="44" rx="6" fill="#FFFFFF" />
        <text x="382" y="148" fill="#9F1239" fontSize="9.5" fontWeight="bold" textAnchor="middle">
          ax² + bx + c &lt; 0 minden x ∈ ℝ
        </text>
        <text x="382" y="164" fill="#64748B" fontSize="8" textAnchor="middle">
          A parabola a tengely alatt süllyed
        </text>
      </g>
    </svg>
  );
};

