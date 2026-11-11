import React from 'react';

interface FigureProps {
  size?: number;
  className?: string;
}

/**
 * 1. Ábra: A Másodfokú Egyenletek Fejezet Teljes Térképe (Chapter Roadmap)
 * A fejezet 5 fő alappillérének szisztematikus áttekintése.
 */
export const ChapterRoadmapSvg: React.FC<FigureProps> = ({ size = 480, className = '' }) => {
  return (
    <svg
      viewBox="0 0 600 340"
      width={size}
      height={(size * 340) / 600}
      className={`select-none max-w-full h-auto ${className}`}
      aria-label="A másodfokú egyenletek átfogó tématérképe"
    >
      <defs>
        <linearGradient id="roadmapBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f8fafc" />
          <stop offset="100%" stopColor="#eef2ff" />
        </linearGradient>
        <linearGradient id="hubGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#4338ca" />
        </linearGradient>
        <linearGradient id="boxBlue" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#eff6ff" />
          <stop offset="100%" stopColor="#dbeafe" />
        </linearGradient>
        <linearGradient id="boxEmerald" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ecfdf5" />
          <stop offset="100%" stopColor="#d1fae5" />
        </linearGradient>
        <linearGradient id="boxAmber" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fffbeb" />
          <stop offset="100%" stopColor="#fef3c7" />
        </linearGradient>
        <linearGradient id="boxRose" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fff1f2" />
          <stop offset="100%" stopColor="#ffe4e6" />
        </linearGradient>
        <filter id="shadowGlow" x="-8%" y="-8%" width="116%" height="116%">
          <feDropShadow dx="0" dy="3" stdDeviation="4" floodOpacity="0.1" />
        </filter>
      </defs>

      {/* Háttér kártya */}
      <rect x="10" y="10" width="580" height="320" rx="16" fill="url(#roadmapBg)" stroke="#c7d2fe" strokeWidth="1.5" />

      {/* Központi Hub: Másodfokú egyenletek ax² + bx + c = 0 */}
      <g filter="url(#shadowGlow)">
        <rect x="200" y="130" width="200" height="75" rx="14" fill="url(#hubGrad)" stroke="#3730a3" strokeWidth="2" />
        <text x="300" y="156" textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="bold">
          Másodfokú Egyenletek
        </text>
        <text x="300" y="174" textAnchor="middle" fill="#c7d2fe" fontSize="12" fontFamily="monospace" fontWeight="bold">
          ax² + bx + c = 0 (a ≠ 0)
        </text>
        <text x="300" y="193" textAnchor="middle" fill="#e0e7ff" fontSize="10">
          A fejezet központi szintézise
        </text>
      </g>

      {/* Összekötő nyilak */}
      <path d="M 230 130 Q 150 75 140 85" fill="none" stroke="#6366f1" strokeWidth="2" strokeDasharray="4 3" />
      <path d="M 370 130 Q 450 75 460 85" fill="none" stroke="#6366f1" strokeWidth="2" strokeDasharray="4 3" />
      <path d="M 230 205 Q 150 260 140 250" fill="none" stroke="#6366f1" strokeWidth="2" strokeDasharray="4 3" />
      <path d="M 370 205 Q 450 260 460 250" fill="none" stroke="#6366f1" strokeWidth="2" strokeDasharray="4 3" />

      {/* 1. Alappillér: Hiányos egyenletek (bal felső) */}
      <g filter="url(#shadowGlow)">
        <rect x="30" y="30" width="190" height="70" rx="10" fill="url(#boxBlue)" stroke="#93c5fd" strokeWidth="1.5" />
        <rect x="40" y="38" width="50" height="16" rx="4" fill="#3b82f6" />
        <text x="65" y="50" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">1. ALAP</text>
        <text x="100" y="51" fill="#1e3a8a" fontSize="11" fontWeight="bold">Hiányos esetek</text>
        <text x="40" y="72" fill="#1e40af" fontSize="10" fontFamily="monospace">c=0: x(ax+b)=0 ⟹ x₁=0</text>
        <text x="40" y="88" fill="#1e40af" fontSize="10" fontFamily="monospace">b=0: x² = -c/a ⟹ ±√(-c/a)</text>
      </g>

      {/* 2. Alappillér: Megoldóképlet és D (jobb felső) */}
      <g filter="url(#shadowGlow)">
        <rect x="380" y="30" width="190" height="70" rx="10" fill="url(#boxEmerald)" stroke="#86efac" strokeWidth="1.5" />
        <rect x="390" y="38" width="50" height="16" rx="4" fill="#10b981" />
        <text x="415" y="50" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">2. FŐESZKÖZ</text>
        <text x="450" y="51" fill="#064e3b" fontSize="11" fontWeight="bold">Megoldóképlet</text>
        <text x="390" y="72" fill="#065f46" fontSize="10" fontFamily="monospace">x₁,₂ = (-b ± √D) / 2a</text>
        <text x="390" y="88" fill="#047857" fontSize="10">D = b² - 4ac (D &gt; 0, = 0, &lt; 0)</text>
      </g>

      {/* 3. Alappillér: Visszavezethető egyenletek (bal alsó) */}
      <g filter="url(#shadowGlow)">
        <rect x="30" y="235" width="190" height="70" rx="10" fill="url(#boxAmber)" stroke="#fcd34d" strokeWidth="1.5" />
        <rect x="40" y="243" width="50" height="16" rx="4" fill="#f59e0b" />
        <text x="65" y="255" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">3. TECHNIKA</text>
        <text x="100" y="256" fill="#78350f" fontSize="11" fontWeight="bold">Visszavezetés</text>
        <text x="40" y="277" fill="#92400e" fontSize="10">Biquadratikus: u = x² (u ≥ 0)</text>
        <text x="40" y="293" fill="#92400e" fontSize="10">Törtes: közös n., kikötés!</text>
      </g>

      {/* 4. Alappillér: Szöveges modellezés (jobb alsó) */}
      <g filter="url(#shadowGlow)">
        <rect x="380" y="235" width="190" height="70" rx="10" fill="url(#boxRose)" stroke="#fda4af" strokeWidth="1.5" />
        <rect x="390" y="243" width="50" height="16" rx="4" fill="#f43f5e" />
        <text x="415" y="255" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">4. ALKALMAZÁS</text>
        <text x="450" y="256" fill="#881337" fontSize="11" fontWeight="bold">Szöveges feladatok</text>
        <text x="390" y="277" fill="#9f1239" fontSize="10">Geometria (a² + b² = c²)</text>
        <text x="390" y="293" fill="#9f1239" fontSize="10">Pénzügy, mozgás &amp; munka (t=s/v)</text>
      </g>
    </svg>
  );
};

/**
 * 2. Ábra: Megoldási Stratégia Döntési Fa (Equation Taxonomy Decision Tree)
 * Hogyan válasszuk ki 5 másodperc alatt a leggyorsabb, legbiztosabb utat?
 */
export const EquationTaxonomySvg: React.FC<FigureProps> = ({ size = 480, className = '' }) => {
  return (
    <svg
      viewBox="0 0 600 320"
      width={size}
      height={(size * 320) / 600}
      className={`select-none max-w-full h-auto ${className}`}
      aria-label="Másodfokú egyenlet megoldási döntési fa"
    >
      <defs>
        <linearGradient id="taxBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fdf4ff" />
          <stop offset="100%" stopColor="#fae8ff" />
        </linearGradient>
      </defs>

      <rect x="10" y="10" width="580" height="300" rx="16" fill="url(#taxBg)" stroke="#f0abfc" strokeWidth="1.5" />

      {/* Gyökér: Adott az egyenlet */}
      <rect x="200" y="24" width="200" height="36" rx="8" fill="#a21caf" stroke="#86198f" strokeWidth="1.5" />
      <text x="300" y="46" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">
        0-ra rendezett egyenlet: ax² + bx + c = 0
      </text>

      {/* Elágazási vonalak */}
      <path d="M 230 60 L 110 100" stroke="#c026d3" strokeWidth="2" />
      <path d="M 300 60 L 300 100" stroke="#c026d3" strokeWidth="2" />
      <path d="M 370 60 L 490 100" stroke="#c026d3" strokeWidth="2" />

      {/* 1. Ág: c = 0 */}
      <g>
        <rect x="30" y="100" width="160" height="50" rx="8" fill="#ffffff" stroke="#e879f9" strokeWidth="1.5" />
        <text x="110" y="120" textAnchor="middle" fill="#701a75" fontSize="11" fontWeight="bold">c = 0 (nincs konstans)</text>
        <text x="110" y="138" textAnchor="middle" fill="#4a044e" fontSize="10" fontFamily="monospace">x-et KIEMELJÜK!</text>
        <path d="M 110 150 L 110 180" stroke="#c026d3" strokeWidth="1.5" />
        <rect x="30" y="180" width="160" height="60" rx="8" fill="#fdf2f8" stroke="#f472b6" strokeWidth="1.5" />
        <text x="110" y="200" textAnchor="middle" fill="#9d174d" fontSize="10" fontWeight="bold">x(ax + b) = 0</text>
        <text x="110" y="217" textAnchor="middle" fill="#be185d" fontSize="9.5">x₁ = 0 mindig gyök!</text>
        <text x="110" y="231" textAnchor="middle" fill="#be185d" fontSize="9.5">x₂ = -b / a</text>
      </g>

      {/* 2. Ág: b = 0 */}
      <g>
        <rect x="220" y="100" width="160" height="50" rx="8" fill="#ffffff" stroke="#e879f9" strokeWidth="1.5" />
        <text x="300" y="120" textAnchor="middle" fill="#701a75" fontSize="11" fontWeight="bold">b = 0 (nincs elsőfokú tag)</text>
        <text x="300" y="138" textAnchor="middle" fill="#4a044e" fontSize="10" fontFamily="monospace">KÖZVETLEN GYÖKVONÁS</text>
        <path d="M 300 150 L 300 180" stroke="#c026d3" strokeWidth="1.5" />
        <rect x="220" y="180" width="160" height="60" rx="8" fill="#f0fdf4" stroke="#86efac" strokeWidth="1.5" />
        <text x="300" y="200" textAnchor="middle" fill="#166534" fontSize="10" fontWeight="bold">x² = -c / a</text>
        <text x="300" y="217" textAnchor="middle" fill="#15803d" fontSize="9.5">Ha -c/a &gt; 0: x = ±√(-c/a)</text>
        <text x="300" y="231" textAnchor="middle" fill="#dc2626" fontSize="9.5">Ha -c/a &lt; 0: nincs valós gyök!</text>
      </g>

      {/* 3. Ág: Teljes (a, b, c ≠ 0) */}
      <g>
        <rect x="410" y="100" width="160" height="50" rx="8" fill="#ffffff" stroke="#e879f9" strokeWidth="1.5" />
        <text x="490" y="120" textAnchor="middle" fill="#701a75" fontSize="11" fontWeight="bold">Teljes egyenlet</text>
        <text x="490" y="138" textAnchor="middle" fill="#4a044e" fontSize="10" fontFamily="monospace">MEGOLDÓKÉPLET / NÉGYZET</text>
        <path d="M 490 150 L 490 180" stroke="#c026d3" strokeWidth="1.5" />
        <rect x="410" y="180" width="160" height="60" rx="8" fill="#eff6ff" stroke="#93c5fd" strokeWidth="1.5" />
        <text x="490" y="200" textAnchor="middle" fill="#1e40af" fontSize="10" fontWeight="bold">D = b² - 4ac kiszámítása</text>
        <text x="490" y="217" textAnchor="middle" fill="#2563eb" fontSize="9.5">x₁,₂ = (-b ± √D) / (2a)</text>
        <text x="490" y="231" textAnchor="middle" fill="#2563eb" fontSize="9.5">D dönti el a gyökök számát</text>
      </g>

      {/* Alsó tanács */}
      <rect x="80" y="260" width="440" height="34" rx="8" fill="#fae8ff" stroke="#d946ef" strokeWidth="1" />
      <text x="300" y="281" textAnchor="middle" fill="#86198f" fontSize="10.5" fontWeight="bold">
        💡 Aranyszabály: Ha c=0 vagy b=0, NE használd a képletet! Kiemeléssel / gyökvonással sokkal gyorsabb.
      </text>
    </svg>
  );
};

/**
 * 3. Ábra: A Diszkrimináns Szentháromsága és Geometriai Kapcsolata (Comprehensive Discriminant)
 * D > 0, D = 0, D < 0 grafikus parabolák és algebrai következmények szintézise.
 */
export const ComprehensiveDiscriminantSvg: React.FC<FigureProps> = ({ size = 480, className = '' }) => {
  return (
    <svg
      viewBox="0 0 600 280"
      width={size}
      height={(size * 280) / 600}
      className={`select-none max-w-full h-auto ${className}`}
      aria-label="A diszkrimináns és a parabola metszéspontjainak kapcsolata"
    >
      <defs>
        <linearGradient id="discBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f8fafc" />
          <stop offset="100%" stopColor="#f1f5f9" />
        </linearGradient>
      </defs>

      <rect x="10" y="10" width="580" height="260" rx="16" fill="url(#discBg)" stroke="#cbd5e1" strokeWidth="1.5" />

      {/* 1. Panel: D > 0 (Zöld) */}
      <g>
        <rect x="25" y="25" width="170" height="230" rx="12" fill="#ffffff" stroke="#86efac" strokeWidth="1.5" />
        <rect x="35" y="35" width="150" height="26" rx="6" fill="#ecfdf5" />
        <text x="110" y="52" textAnchor="middle" fill="#166534" fontSize="12" fontWeight="bold">D &gt; 0 (Pozitív)</text>
        
        {/* Részletes mini koordinátarendszer */}
        <rect x="35" y="70" width="150" height="76" rx="6" fill="#f8fafc" stroke="#bbf7d0" strokeWidth="1" />
        {/* Rács */}
        <g stroke="#f1f5f9" strokeWidth="0.8">
          <line x1="60" y1="70" x2="60" y2="146" />
          <line x1="85" y1="70" x2="85" y2="146" />
          <line x1="110" y1="70" x2="110" y2="146" />
          <line x1="135" y1="70" x2="135" y2="146" />
          <line x1="160" y1="70" x2="160" y2="146" />
          <line x1="35" y1="88" x2="185" y2="88" />
          <line x1="35" y1="106" x2="185" y2="106" />
          <line x1="35" y1="124" x2="185" y2="124" />
        </g>
        {/* X tengely */}
        <line x1="38" y1="122" x2="178" y2="122" stroke="#64748b" strokeWidth="1.3" />
        <polygon points="180,122 175,120 175,124" fill="#64748b" />
        <text x="176" y="116" fill="#64748b" fontSize="8" fontWeight="bold">x</text>
        {/* Y tengely */}
        <line x1="56" y1="142" x2="56" y2="74" stroke="#64748b" strokeWidth="1.3" />
        <polygon points="56,72 54,77 58,77" fill="#64748b" />
        <text x="62" y="80" fill="#64748b" fontSize="8" fontWeight="bold">y</text>
        <text x="50" y="130" fill="#94a3b8" fontSize="7" textAnchor="end">O</text>

        {/* Parabola rajz: 2 metszéspont */}
        <path d="M 62 88 Q 110 176 158 88" fill="none" stroke="#16a34a" strokeWidth="2.4" strokeLinecap="round" />
        <circle cx="84" cy="122" r="3.2" fill="#15803d" stroke="#ffffff" strokeWidth="1" />
        <circle cx="136" cy="122" r="3.2" fill="#15803d" stroke="#ffffff" strokeWidth="1" />
        <text x="84" y="115" textAnchor="middle" fill="#15803d" fontSize="8" fontWeight="900">x₁</text>
        <text x="136" y="115" textAnchor="middle" fill="#15803d" fontSize="8" fontWeight="900">x₂</text>
        <circle cx="110" cy="132" r="2" fill="#16a34a" />

        <text x="110" y="168" textAnchor="middle" fill="#166534" fontSize="10.5" fontWeight="bold">2 különböző valós gyök</text>
        <text x="110" y="185" textAnchor="middle" fill="#475569" fontSize="9">Két pontban metszi</text>
        <text x="110" y="198" textAnchor="middle" fill="#475569" fontSize="9">az x-tengelyt (y_csúcs &lt; 0)</text>
        <text x="110" y="222" textAnchor="middle" fill="#047857" fontSize="9.5" fontFamily="monospace" fontWeight="bold">x₁,₂ = (-b ± √D)/2a</text>
      </g>

      {/* 2. Panel: D = 0 (Kék) */}
      <g>
        <rect x="215" y="25" width="170" height="230" rx="12" fill="#ffffff" stroke="#93c5fd" strokeWidth="1.5" />
        <rect x="225" y="35" width="150" height="26" rx="6" fill="#eff6ff" />
        <text x="300" y="52" textAnchor="middle" fill="#1e40af" fontSize="12" fontWeight="bold">D = 0 (Nulla)</text>
        
        {/* Részletes mini koordinátarendszer */}
        <rect x="225" y="70" width="150" height="76" rx="6" fill="#f8fafc" stroke="#bfdbfe" strokeWidth="1" />
        {/* Rács */}
        <g stroke="#f1f5f9" strokeWidth="0.8">
          <line x1="250" y1="70" x2="250" y2="146" />
          <line x1="275" y1="70" x2="275" y2="146" />
          <line x1="300" y1="70" x2="300" y2="146" />
          <line x1="325" y1="70" x2="325" y2="146" />
          <line x1="350" y1="70" x2="350" y2="146" />
          <line x1="225" y1="88" x2="375" y2="88" />
          <line x1="225" y1="106" x2="375" y2="106" />
          <line x1="225" y1="124" x2="375" y2="124" />
        </g>
        {/* X tengely */}
        <line x1="228" y1="122" x2="368" y2="122" stroke="#64748b" strokeWidth="1.3" />
        <polygon points="370,122 365,120 365,124" fill="#64748b" />
        <text x="366" y="116" fill="#64748b" fontSize="8" fontWeight="bold">x</text>
        {/* Y tengely */}
        <line x1="246" y1="142" x2="246" y2="74" stroke="#64748b" strokeWidth="1.3" />
        <polygon points="246,72 244,77 248,77" fill="#64748b" />
        <text x="252" y="80" fill="#64748b" fontSize="8" fontWeight="bold">y</text>
        <text x="240" y="130" fill="#94a3b8" fontSize="7" textAnchor="end">O</text>

        {/* Parabola rajz: érinti az x tengelyt */}
        <path d="M 252 82 Q 300 162 348 82" fill="none" stroke="#2563eb" strokeWidth="2.4" strokeLinecap="round" />
        <circle cx="300" cy="122" r="3.6" fill="#1d4ed8" stroke="#ffffff" strokeWidth="1" />
        <text x="300" y="114" textAnchor="middle" fill="#1d4ed8" fontSize="8" fontWeight="900">x₁ = x₂</text>

        <text x="300" y="168" textAnchor="middle" fill="#1e40af" fontSize="10.5" fontWeight="bold">1 valós (kettős) gyök</text>
        <text x="300" y="185" textAnchor="middle" fill="#475569" fontSize="9">Érinti az x-tengelyt</text>
        <text x="300" y="198" textAnchor="middle" fill="#475569" fontSize="9">a csúcspontjában (y_csúcs = 0)</text>
        <text x="300" y="222" textAnchor="middle" fill="#1d4ed8" fontSize="9.5" fontFamily="monospace" fontWeight="bold">x = -b / (2a)</text>
      </g>

      {/* 3. Panel: D < 0 (Piros) */}
      <g>
        <rect x="405" y="25" width="170" height="230" rx="12" fill="#ffffff" stroke="#fca5a5" strokeWidth="1.5" />
        <rect x="415" y="35" width="150" height="26" rx="6" fill="#fef2f2" />
        <text x="490" y="52" textAnchor="middle" fill="#991b1b" fontSize="12" fontWeight="bold">D &lt; 0 (Negatív)</text>
        
        {/* Részletes mini koordinátarendszer */}
        <rect x="415" y="70" width="150" height="76" rx="6" fill="#f8fafc" stroke="#fecaca" strokeWidth="1" />
        {/* Rács */}
        <g stroke="#f1f5f9" strokeWidth="0.8">
          <line x1="440" y1="70" x2="440" y2="146" />
          <line x1="465" y1="70" x2="465" y2="146" />
          <line x1="490" y1="70" x2="490" y2="146" />
          <line x1="515" y1="70" x2="515" y2="146" />
          <line x1="540" y1="70" x2="540" y2="146" />
          <line x1="415" y1="88" x2="565" y2="88" />
          <line x1="415" y1="106" x2="565" y2="106" />
          <line x1="415" y1="124" x2="565" y2="124" />
        </g>
        {/* X tengely */}
        <line x1="418" y1="128" x2="558" y2="128" stroke="#64748b" strokeWidth="1.3" />
        <polygon points="560,128 555,126 555,130" fill="#64748b" />
        <text x="556" y="122" fill="#64748b" fontSize="8" fontWeight="bold">x</text>
        {/* Y tengely */}
        <line x1="436" y1="142" x2="436" y2="74" stroke="#64748b" strokeWidth="1.3" />
        <polygon points="436,72 434,77 438,77" fill="#64748b" />
        <text x="442" y="80" fill="#64748b" fontSize="8" fontWeight="bold">y</text>
        <text x="430" y="136" fill="#94a3b8" fontSize="7" textAnchor="end">O</text>

        {/* Parabola rajz: lebeg fölötte */}
        <path d="M 445 78 Q 490 134 535 78" fill="none" stroke="#dc2626" strokeWidth="2.4" strokeLinecap="round" />
        <circle cx="490" cy="106" r="2.5" fill="#dc2626" />
        <text x="490" y="119" textAnchor="middle" fill="#dc2626" fontSize="7.5" fontStyle="italic" fontWeight="bold">y_csúcs &gt; 0</text>

        <text x="490" y="168" textAnchor="middle" fill="#991b1b" fontSize="10.5" fontWeight="bold">Nincs valós gyök</text>
        <text x="490" y="185" textAnchor="middle" fill="#475569" fontSize="9">Nem metszi és nem érinti</text>
        <text x="490" y="198" textAnchor="middle" fill="#475569" fontSize="9">az x-tengelyt (lebeg)</text>
        <text x="490" y="222" textAnchor="middle" fill="#b91c1c" fontSize="9.5" fontFamily="monospace" fontWeight="bold">x ∈ ∅ &nbsp;(√D ∉ ℝ)</text>
      </g>
    </svg>
  );
};

/**
 * 4. Ábra: Szöveges Feladatok Megoldási Csővezetéke (Master Problem Solving Pipeline)
 * 5 lépéses protokoll a valós feladatok hibátlan megoldásához.
 */
export const MasterProblemSolvingPipelineSvg: React.FC<FigureProps> = ({ size = 480, className = '' }) => {
  return (
    <svg
      viewBox="0 0 600 240"
      width={size}
      height={(size * 240) / 600}
      className={`select-none max-w-full h-auto ${className}`}
      aria-label="Szöveges feladatok megoldási algoritmusa"
    >
      <defs>
        <linearGradient id="pipeBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fdf4ff" />
          <stop offset="100%" stopColor="#ede9fe" />
        </linearGradient>
      </defs>

      <rect x="10" y="10" width="580" height="220" rx="16" fill="url(#pipeBg)" stroke="#c4b5fd" strokeWidth="1.5" />

      {/* 5 folyamatlépés */}
      {[
        { step: '1', title: 'Változó & É.T.', sub: 'x meghatározása,\nx > 0 feltétel', color: '#6366f1' },
        { step: '2', title: 'Egyenlet', sub: 'Szöveg lefordítása\nmatematikára', color: '#8b5cf6' },
        { step: '3', title: 'Megoldás', sub: '0-ra rendezés &\nmegoldóképlet', color: '#a855f7' },
        { step: '4', title: 'Ellenőrzés', sub: 'Kikötések összevetése,\nhamis gyök kizárása', color: '#d946ef' },
        { step: '5', title: 'Szöveges válasz', sub: 'Mértékegység,\nkonkrét válasz', color: '#ec4899' },
      ].map((item, idx) => {
        const xPos = 25 + idx * 112;
        return (
          <g key={idx}>
            {/* Csatlakozó nyíl (nem az utolsó után) */}
            {idx < 4 && (
              <polygon
                points={`${xPos + 98},75 ${xPos + 108},70 ${xPos + 98},65`}
                fill="#a78bfa"
              />
            )}
            <rect
              x={xPos}
              y="30"
              width="95"
              height="80"
              rx="10"
              fill="#ffffff"
              stroke={item.color}
              strokeWidth="2"
            />
            {/* Lépésszám badge */}
            <circle cx={xPos + 18} cy="46" r="11" fill={item.color} />
            <text x={xPos + 18} y="50" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">
              {item.step}
            </text>
            <text x={xPos + 48} y="49" fill="#1e1b4b" fontSize="9.5" fontWeight="bold">
              {item.title}
            </text>
            {item.sub.split('\n').map((line, lIdx) => (
              <text
                key={lIdx}
                x={xPos + 47}
                y={68 + lIdx * 14}
                textAnchor="middle"
                fill="#475569"
                fontSize="8.5"
              >
                {line}
              </text>
            ))}
          </g>
        );
      })}

      {/* Figyelmeztető sáv alul */}
      <rect x="25" y="130" width="550" height="80" rx="10" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
      <text x="40" y="152" fill="#7c3aed" fontSize="11" fontWeight="bold">
        Gyakori vizsgacsapdák szöveges feladatoknál:
      </text>
      <text x="40" y="172" fill="#475569" fontSize="10">
        • <strong>Negatív gyök elfogadása:</strong> hosszúság, sebesség, idő vagy személyek száma SOHA nem lehet negatív!
      </text>
      <text x="40" y="188" fill="#475569" fontSize="10">
        • <strong>Mértékegységek keverése:</strong> percet mindig váltsd órára mozgás és munkavégzés feladatoknál (20 perc = 1/3 óra).
      </text>
      <text x="40" y="202" fill="#475569" fontSize="10">
        • <strong>Százalékláb használata:</strong> p% növekedés szorzója (1 + p/100), nem pedig simán +p!
      </text>
    </svg>
  );
};

