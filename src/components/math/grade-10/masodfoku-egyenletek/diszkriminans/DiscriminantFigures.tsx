import React from 'react';

interface FigureProps {
  size?: number;
  className?: string;
}

/**
 * 1. A Diszkrimináns 3 Alapesete és Grafikus Jelentése SVG
 * Összehasonlító 3 paneles ábra: D > 0, D = 0, D < 0
 */
export const DiscriminantCasesSvg: React.FC<FigureProps> = ({ size = 520, className = '' }) => {
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
        <rect x="12" y="44" width="166" height="216" rx="12" fill="url(#panelGradEmerald)" stroke="#10B981" strokeWidth="1.5" />
        <rect x="22" y="52" width="146" height="24" rx="6" fill="#10B981" />
        <text x="95" y="68" fill="#FFFFFF" fontSize="11" fontWeight="bold" textAnchor="middle">
          D &gt; 0 (Pozitív)
        </text>

        {/* Koordinátarendszer doboz */}
        <rect x="20" y="80" width="150" height="78" rx="6" fill="#FFFFFF" stroke="#A7F3D0" strokeWidth="1" />

        {/* Rácsvonalak */}
        <g stroke="#F1F5F9" strokeWidth="0.8">
          <line x1="45" y1="80" x2="45" y2="158" />
          <line x1="70" y1="80" x2="70" y2="158" />
          <line x1="95" y1="80" x2="95" y2="158" />
          <line x1="120" y1="80" x2="120" y2="158" />
          <line x1="145" y1="80" x2="145" y2="158" />
          <line x1="20" y1="98" x2="170" y2="98" />
          <line x1="20" y1="116" x2="170" y2="116" />
          <line x1="20" y1="134" x2="170" y2="134" />
        </g>

        {/* X tengely */}
        <line x1="24" y1="132" x2="164" y2="132" stroke="#475569" strokeWidth="1.4" />
        <polygon points="166,132 160,129 160,135" fill="#475569" />
        <text x="162" y="125" fill="#475569" fontSize="8.5" fontWeight="bold">x</text>

        {/* Y tengely */}
        <line x1="42" y1="154" x2="42" y2="84" stroke="#475569" strokeWidth="1.4" />
        <polygon points="42,82 39,87 45,87" fill="#475569" />
        <text x="49" y="90" fill="#475569" fontSize="8.5" fontWeight="bold">y</text>
        <text x="36" y="141" fill="#94A3B8" fontSize="7.5" textAnchor="end">O</text>

        {/* Parabola: 2 metszéspont, csúcs a tengely alatt */}
        <path d="M 48 98 Q 95 194 142 98" stroke="#059669" strokeWidth="2.4" fill="none" strokeLinecap="round" />

        {/* Metszéspontok az x-tengelyen */}
        <circle cx="70" cy="132" r="3.5" fill="#047857" stroke="#FFFFFF" strokeWidth="1.2" />
        <circle cx="120" cy="132" r="3.5" fill="#047857" stroke="#FFFFFF" strokeWidth="1.2" />
        <text x="70" y="124" fill="#065F46" fontSize="8.5" fontWeight="900" textAnchor="middle">x₁</text>
        <text x="120" y="124" fill="#065F46" fontSize="8.5" fontWeight="900" textAnchor="middle">x₂</text>

        {/* Csúcspont jelölés */}
        <circle cx="95" cy="146" r="2.2" fill="#047857" />
        <line x1="95" y1="132" x2="95" y2="146" stroke="#10B981" strokeWidth="1" strokeDasharray="2 2" />

        {/* Leírás kártya */}
        <rect x="20" y="162" width="150" height="90" rx="8" fill="#FFFFFF" opacity="0.95" />
        <text x="95" y="177" fill="#065F46" fontSize="9.5" fontWeight="900" textAnchor="middle">
          2 KÜLÖNBÖZŐ GYÖK
        </text>
        <text x="95" y="193" fill="#15803D" fontSize="8.5" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
          x₁,₂ = (-b ± √D) / 2a
        </text>
        <text x="95" y="210" fill="#334155" fontSize="8" fontWeight="bold" textAnchor="middle">
          A parabola metszi az x-tengelyt
        </text>
        <text x="95" y="223" fill="#64748B" fontSize="7.5" textAnchor="middle">
          (2 valós metszéspont)
        </text>
        <text x="95" y="240" fill="#047857" fontSize="8" fontWeight="bold" textAnchor="middle">
          Csúcspont y &lt; 0
        </text>
      </g>

      {/* 2. Panel: D = 0 */}
      <g filter="url(#discCaseShadow)">
        <rect x="187" y="44" width="166" height="216" rx="12" fill="url(#panelGradAmber)" stroke="#F59E0B" strokeWidth="1.5" />
        <rect x="197" y="52" width="146" height="24" rx="6" fill="#F59E0B" />
        <text x="270" y="68" fill="#FFFFFF" fontSize="11" fontWeight="bold" textAnchor="middle">
          D = 0 (Nulla)
        </text>

        {/* Koordinátarendszer doboz */}
        <rect x="195" y="80" width="150" height="78" rx="6" fill="#FFFFFF" stroke="#FDE68A" strokeWidth="1" />

        {/* Rácsvonalak */}
        <g stroke="#F1F5F9" strokeWidth="0.8">
          <line x1="220" y1="80" x2="220" y2="158" />
          <line x1="245" y1="80" x2="245" y2="158" />
          <line x1="270" y1="80" x2="270" y2="158" />
          <line x1="295" y1="80" x2="295" y2="158" />
          <line x1="320" y1="80" x2="320" y2="158" />
          <line x1="195" y1="98" x2="345" y2="98" />
          <line x1="195" y1="116" x2="345" y2="116" />
          <line x1="195" y1="134" x2="345" y2="134" />
        </g>

        {/* X tengely */}
        <line x1="199" y1="132" x2="339" y2="132" stroke="#475569" strokeWidth="1.4" />
        <polygon points="341,132 335,129 335,135" fill="#475569" />
        <text x="337" y="125" fill="#475569" fontSize="8.5" fontWeight="bold">x</text>

        {/* Y tengely */}
        <line x1="217" y1="154" x2="217" y2="84" stroke="#475569" strokeWidth="1.4" />
        <polygon points="217,82 214,87 220,87" fill="#475569" />
        <text x="224" y="90" fill="#475569" fontSize="8.5" fontWeight="bold">y</text>
        <text x="211" y="141" fill="#94A3B8" fontSize="7.5" textAnchor="end">O</text>

        {/* Parabola: érinti az x tengelyt a csúcsában */}
        <path d="M 225 90 Q 270 174 315 90" stroke="#D97706" strokeWidth="2.4" fill="none" strokeLinecap="round" />

        {/* Érintési pont az x-tengelyen */}
        <circle cx="270" cy="132" r="4.2" fill="#B45309" stroke="#FFFFFF" strokeWidth="1.5" />
        <text x="270" y="122" fill="#92400E" fontSize="8.5" fontWeight="900" textAnchor="middle">x₁ = x₂</text>

        {/* Leírás kártya */}
        <rect x="195" y="162" width="150" height="90" rx="8" fill="#FFFFFF" opacity="0.95" />
        <text x="270" y="177" fill="#92400E" fontSize="9.5" fontWeight="900" textAnchor="middle">
          1 VALÓS (KETTŐS) GYÖK
        </text>
        <text x="270" y="193" fill="#B45309" fontSize="8.5" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
          x = -b / (2a)
        </text>
        <text x="270" y="210" fill="#334155" fontSize="8" fontWeight="bold" textAnchor="middle">
          A parabola érinti az x-tengelyt
        </text>
        <text x="270" y="223" fill="#64748B" fontSize="7.5" textAnchor="middle">
          (1 közös pont: a csúcspont)
        </text>
        <text x="270" y="240" fill="#B45309" fontSize="8" fontWeight="bold" textAnchor="middle">
          Csúcspont y = 0
        </text>
      </g>

      {/* 3. Panel: D < 0 */}
      <g filter="url(#discCaseShadow)">
        <rect x="362" y="44" width="166" height="216" rx="12" fill="url(#panelGradRose)" stroke="#F43F5E" strokeWidth="1.5" />
        <rect x="372" y="52" width="146" height="24" rx="6" fill="#F43F5E" />
        <text x="445" y="68" fill="#FFFFFF" fontSize="11" fontWeight="bold" textAnchor="middle">
          D &lt; 0 (Negatív)
        </text>

        {/* Koordinátarendszer doboz */}
        <rect x="370" y="80" width="150" height="78" rx="6" fill="#FFFFFF" stroke="#FECDD3" strokeWidth="1" />

        {/* Rácsvonalak */}
        <g stroke="#F1F5F9" strokeWidth="0.8">
          <line x1="395" y1="80" x2="395" y2="158" />
          <line x1="420" y1="80" x2="420" y2="158" />
          <line x1="445" y1="80" x2="445" y2="158" />
          <line x1="470" y1="80" x2="470" y2="158" />
          <line x1="495" y1="80" x2="495" y2="158" />
          <line x1="370" y1="98" x2="520" y2="98" />
          <line x1="370" y1="116" x2="520" y2="116" />
          <line x1="370" y1="134" x2="520" y2="134" />
        </g>

        {/* X tengely */}
        <line x1="374" y1="138" x2="514" y2="138" stroke="#475569" strokeWidth="1.4" />
        <polygon points="516,138 510,135 510,141" fill="#475569" />
        <text x="512" y="131" fill="#475569" fontSize="8.5" fontWeight="bold">x</text>

        {/* Y tengely */}
        <line x1="392" y1="154" x2="392" y2="84" stroke="#475569" strokeWidth="1.4" />
        <polygon points="392,82 389,87 395,87" fill="#475569" />
        <text x="399" y="90" fill="#475569" fontSize="8.5" fontWeight="bold">y</text>
        <text x="386" y="147" fill="#94A3B8" fontSize="7.5" textAnchor="end">O</text>

        {/* Parabola: a tengely felett lebeg */}
        <path d="M 405 88 Q 445 136 485 88" stroke="#E11D48" strokeWidth="2.4" fill="none" strokeLinecap="round" />

        {/* Csúcspont jelölés */}
        <circle cx="445" cy="112" r="3.2" fill="#BE123C" />
        <line x1="445" y1="112" x2="445" y2="138" stroke="#F43F5E" strokeWidth="1" strokeDasharray="2 2" />
        <text x="445" y="125" fill="#BE123C" fontSize="7.5" fontStyle="italic" fontWeight="bold" textAnchor="middle">
          Csúcs y &gt; 0
        </text>

        {/* Leírás kártya */}
        <rect x="370" y="162" width="150" height="90" rx="8" fill="#FFFFFF" opacity="0.95" />
        <text x="445" y="177" fill="#9F1239" fontSize="9.5" fontWeight="900" textAnchor="middle">
          NINCS VALÓS GYÖK
        </text>
        <text x="445" y="193" fill="#E11D48" fontSize="8.5" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
          x ∈ ∅ &nbsp;(√D ∉ ℝ)
        </text>
        <text x="445" y="210" fill="#334155" fontSize="8" fontWeight="bold" textAnchor="middle">
          Nem metszi és nem érinti
        </text>
        <text x="445" y="223" fill="#64748B" fontSize="7.5" textAnchor="middle">
          (0 közös pont az x-tengellyel)
        </text>
        <text x="445" y="240" fill="#BE123C" fontSize="8" fontWeight="bold" textAnchor="middle">
          A görbe a tengely felett lebeg
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
export const SignOfQuadraticSvg: React.FC<FigureProps> = ({ size = 520, className = '' }) => {
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
        <filter id="signShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#0F172A" floodOpacity="0.08" />
        </filter>
        <linearGradient id="posSignFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#16A34A" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#16A34A" stopOpacity="0.02" />
        </linearGradient>
        <linearGradient id="negSignFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E11D48" stopOpacity="0.02" />
          <stop offset="100%" stopColor="#E11D48" stopOpacity="0.18" />
        </linearGradient>
      </defs>

      {/* Cím csík */}
      <rect x="70" y="8" width="380" height="26" rx="6" fill="#0284C7" />
      <text x="260" y="25" fill="#FFFFFF" fontSize="11.5" fontWeight="900" textAnchor="middle" letterSpacing="0.5">
        ÁLLANDÓ ELŐJELŰ POLINOMOK (D &lt; 0 SZABÁLYA)
      </text>

      {/* Bal oldali eset: a > 0 és D < 0 ⟹ Mindig POZITÍV */}
      <g filter="url(#signShadow)">
        <rect x="20" y="42" width="235" height="168" rx="12" fill="#F0FDF4" stroke="#86EFAC" strokeWidth="1.5" />
        <rect x="30" y="50" width="215" height="22" rx="5" fill="#16A34A" />
        <text x="137" y="65" fill="#FFFFFF" fontSize="10.5" fontWeight="bold" textAnchor="middle">
          a &gt; 0 ÉS D &lt; 0 ⟹ MINDIG POZITÍV (+)
        </text>

        {/* Koordináta rendszer kártya */}
        <rect x="28" y="76" width="219" height="78" rx="6" fill="#FFFFFF" stroke="#BBF7D0" strokeWidth="1" />

        {/* Rácsvonalak */}
        <g stroke="#F1F5F9" strokeWidth="0.8">
          <line x1="55" y1="76" x2="55" y2="154" />
          <line x1="90" y1="76" x2="90" y2="154" />
          <line x1="125" y1="76" x2="125" y2="154" />
          <line x1="160" y1="76" x2="160" y2="154" />
          <line x1="195" y1="76" x2="195" y2="154" />
          <line x1="28" y1="96" x2="247" y2="96" />
          <line x1="28" y1="116" x2="247" y2="116" />
          <line x1="28" y1="136" x2="247" y2="136" />
        </g>

        {/* X tengely */}
        <line x1="34" y1="138" x2="240" y2="138" stroke="#475569" strokeWidth="1.4" />
        <polygon points="242,138 236,135 236,141" fill="#475569" />
        <text x="238" y="131" fill="#475569" fontSize="8" fontWeight="bold">x</text>

        {/* Y tengely */}
        <line x1="55" y1="150" x2="55" y2="80" stroke="#475569" strokeWidth="1.4" />
        <polygon points="55,78 52,83 58,83" fill="#475569" />
        <text x="62" y="86" fill="#475569" fontSize="8" fontWeight="bold">y</text>
        <text x="49" y="146" fill="#94A3B8" fontSize="7" textAnchor="end">O</text>

        {/* Parabola alatti színezés */}
        <path d="M 75 92 Q 137 148 199 92 L 199 138 L 75 138 Z" fill="url(#posSignFill)" />

        {/* Parabola: felfelé nyíló, x-tengely felett lebeg */}
        <path d="M 75 92 Q 137 148 199 92" stroke="#15803D" strokeWidth="2.4" fill="none" strokeLinecap="round" />

        {/* Csúcspont jelölés */}
        <circle cx="137" cy="120" r="2.5" fill="#15803D" />
        <line x1="137" y1="120" x2="137" y2="138" stroke="#86EFAC" strokeWidth="1" strokeDasharray="2 2" />

        {/* Zöld plusz jelek az x tengely felett a görbe alatt */}
        <rect x="80" y="112" width="16" height="16" rx="8" fill="#DCFCE7" />
        <text x="88" y="124" fill="#16A34A" fontSize="11" fontWeight="900" textAnchor="middle">+</text>
        <rect x="129" y="96" width="16" height="16" rx="8" fill="#DCFCE7" />
        <text x="137" y="108" fill="#16A34A" fontSize="11" fontWeight="900" textAnchor="middle">+</text>
        <rect x="178" y="112" width="16" height="16" rx="8" fill="#DCFCE7" />
        <text x="186" y="124" fill="#16A34A" fontSize="11" fontWeight="900" textAnchor="middle">+</text>

        {/* Magyarázó alsó doboz */}
        <rect x="28" y="158" width="219" height="44" rx="6" fill="#FFFFFF" />
        <text x="137" y="172" fill="#15803D" fontSize="9.5" fontWeight="900" textAnchor="middle">
          f(x) = ax² + bx + c &gt; 0 minden x ∈ ℝ
        </text>
        <text x="137" y="188" fill="#64748B" fontSize="8" textAnchor="middle">
          A parabola a tengely felett lebeg (mindig pozitív értéket vesz fel)
        </text>
      </g>

      {/* Jobb oldali eset: a < 0 és D < 0 ⟹ Mindig NEGATÍV */}
      <g filter="url(#signShadow)">
        <rect x="265" y="42" width="235" height="168" rx="12" fill="#FFF1F2" stroke="#FDA4AF" strokeWidth="1.5" />
        <rect x="275" y="50" width="215" height="22" rx="5" fill="#E11D48" />
        <text x="382" y="65" fill="#FFFFFF" fontSize="10.5" fontWeight="bold" textAnchor="middle">
          a &lt; 0 ÉS D &lt; 0 ⟹ MINDIG NEGATÍV (−)
        </text>

        {/* Koordináta rendszer kártya */}
        <rect x="273" y="76" width="219" height="78" rx="6" fill="#FFFFFF" stroke="#FECDD3" strokeWidth="1" />

        {/* Rácsvonalak */}
        <g stroke="#F1F5F9" strokeWidth="0.8">
          <line x1="300" y1="76" x2="300" y2="154" />
          <line x1="335" y1="76" x2="335" y2="154" />
          <line x1="370" y1="76" x2="370" y2="154" />
          <line x1="405" y1="76" x2="405" y2="154" />
          <line x1="440" y1="76" x2="440" y2="154" />
          <line x1="273" y1="96" x2="492" y2="96" />
          <line x1="273" y1="116" x2="492" y2="116" />
          <line x1="273" y1="136" x2="492" y2="136" />
        </g>

        {/* X tengely */}
        <line x1="279" y1="92" x2="485" y2="92" stroke="#475569" strokeWidth="1.4" />
        <polygon points="487,92 481,89 481,95" fill="#475569" />
        <text x="483" y="85" fill="#475569" fontSize="8" fontWeight="bold">x</text>

        {/* Y tengely */}
        <line x1="300" y1="150" x2="300" y2="80" stroke="#475569" strokeWidth="1.4" />
        <polygon points="300,78 297,83 303,83" fill="#475569" />
        <text x="307" y="86" fill="#475569" fontSize="8" fontWeight="bold">y</text>
        <text x="294" y="100" fill="#94A3B8" fontSize="7" textAnchor="end">O</text>

        {/* Parabola feletti színezés (a tengelytől le a görbéig) */}
        <path d="M 320 92 L 444 92 L 444 138 Q 382 82 320 138 Z" fill="url(#negSignFill)" />

        {/* Parabola: lefelé nyíló, x-tengely alatt fut */}
        <path d="M 320 138 Q 382 82 444 138" stroke="#BE123C" strokeWidth="2.4" fill="none" strokeLinecap="round" />

        {/* Csúcspont jelölés */}
        <circle cx="382" cy="110" r="2.5" fill="#BE123C" />
        <line x1="382" y1="92" x2="382" y2="110" stroke="#FDA4AF" strokeWidth="1" strokeDasharray="2 2" />

        {/* Piros mínusz jelek az x tengely alatt */}
        <rect x="325" y="102" width="16" height="16" rx="8" fill="#FFE4E6" />
        <text x="333" y="114" fill="#E11D48" fontSize="12" fontWeight="900" textAnchor="middle">−</text>
        <rect x="374" y="118" width="16" height="16" rx="8" fill="#FFE4E6" />
        <text x="382" y="130" fill="#E11D48" fontSize="12" fontWeight="900" textAnchor="middle">−</text>
        <rect x="423" y="102" width="16" height="16" rx="8" fill="#FFE4E6" />
        <text x="431" y="114" fill="#E11D48" fontSize="12" fontWeight="900" textAnchor="middle">−</text>

        {/* Magyarázó alsó doboz */}
        <rect x="273" y="158" width="219" height="44" rx="6" fill="#FFFFFF" />
        <text x="382" y="172" fill="#9F1239" fontSize="9.5" fontWeight="900" textAnchor="middle">
          f(x) = ax² + bx + c &lt; 0 minden x ∈ ℝ
        </text>
        <text x="382" y="188" fill="#64748B" fontSize="8" textAnchor="middle">
          A parabola a tengely alatt fut (mindig negatív értéket vesz fel)
        </text>
      </g>
    </svg>
  );
};

