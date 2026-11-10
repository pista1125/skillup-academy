import React from 'react';

interface FigureProps {
  size?: number;
  className?: string;
}

/**
 * 1. Téglalap Területe és Kerülete Algebrai Modell SVG
 * a(K/2 - a) = T és átló (Pitagorasz)
 */
export const RectangleAreaPerimeterSvg: React.FC<FigureProps> = ({ size = 500, className = '' }) => {
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
        <filter id="rectModShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#0F172A" floodOpacity="0.08" />
        </filter>
        <linearGradient id="rectFillGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ECFDF5" />
          <stop offset="100%" stopColor="#D1FAE5" />
        </linearGradient>
      </defs>

      {/* Cím csík */}
      <rect x="70" y="8" width="380" height="28" rx="8" fill="#059669" />
      <text x="260" y="27" fill="#FFFFFF" fontSize="12" fontWeight="900" textAnchor="middle" letterSpacing="0.5">
        TÉGLALAP KERÜLETÉNEK ÉS TERÜLETÉNEK MODELLJE
      </text>

      {/* Bal oldal: Téglalap ábra */}
      <g filter="url(#rectModShadow)">
        {/* Téglalap test */}
        <rect x="35" y="58" width="230" height="135" rx="8" fill="url(#rectFillGrad)" stroke="#10B981" strokeWidth="2" />

        {/* Átló szaggatott vonal */}
        <line x1="35" y1="193" x2="265" y2="58" stroke="#059669" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.6" />
        <text x="160" y="120" fill="#047857" fontSize="10" fontWeight="bold" transform="rotate(-30 160 120)">
          d = √(a² + b²)
        </text>

        {/* Oldal méretek */}
        {/* 'a' oldal (vízszintes) */}
        <line x1="35" y1="208" x2="265" y2="208" stroke="#047857" strokeWidth="1.5" />
        <polygon points="35,208 42,205 42,211" fill="#047857" />
        <polygon points="265,208 258,205 258,211" fill="#047857" />
        <text x="150" y="225" fill="#065F46" fontSize="11" fontWeight="bold" textAnchor="middle">
          a oldal = x
        </text>

        {/* 'b' oldal (függőleges) */}
        <line x1="20" y1="58" x2="20" y2="193" stroke="#047857" strokeWidth="1.5" />
        <polygon points="20,58 17,65 23,65" fill="#047857" />
        <polygon points="20,193 17,186 23,186" fill="#047857" />
        <text x="14" y="130" fill="#065F46" fontSize="11" fontWeight="bold" textAnchor="end">
          b = K/2 - x
        </text>

        {/* Terület belső felirat */}
        <rect x="85" y="100" width="130" height="42" rx="6" fill="#FFFFFF" opacity="0.92" />
        <text x="150" y="117" fill="#065F46" fontSize="10" fontWeight="900" textAnchor="middle">
          T = a · b
        </text>
        <text x="150" y="133" fill="#047857" fontSize="9.5" fontWeight="bold" textAnchor="middle">
          T = x · (K/2 - x)
        </text>
      </g>

      {/* Jobb oldal: Modell levezetés és lépések */}
      <g filter="url(#rectModShadow)">
        <rect x="290" y="52" width="215" height="182" rx="12" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.5" />

        <rect x="302" y="62" width="191" height="24" rx="6" fill="#047857" />
        <text x="397" y="78" fill="#FFFFFF" fontSize="10.5" fontWeight="bold" textAnchor="middle">
          Algebrai Átalakítás
        </text>

        <div className="text-xs">
          <text x="306" y="104" fill="#334155" fontSize="9" fontWeight="bold">1. Kerületből a másik oldal:</text>
          <text x="312" y="119" fill="#047857" fontSize="10" fontFamily="monospace">K = 2(a + b) ⟹ b = K/2 - x</text>

          <text x="306" y="139" fill="#334155" fontSize="9" fontWeight="bold">2. Terület egyenlet felírása:</text>
          <text x="312" y="154" fill="#047857" fontSize="10" fontFamily="monospace">x · (K/2 - x) = T</text>

          <text x="306" y="174" fill="#334155" fontSize="9" fontWeight="bold">3. 0-ra rendezett alak:</text>
          <text x="312" y="189" fill="#B91C1C" fontSize="10" fontWeight="bold" fontFamily="monospace">x² - (K/2)x + T = 0</text>

          <rect x="302" y="198" width="191" height="26" rx="5" fill="#FEF3C7" />
          <text x="397" y="215" fill="#92400E" fontSize="8.5" fontWeight="bold" textAnchor="middle">
            Kikötés: 0 &lt; x &lt; K/2
          </text>
        </div>
      </g>
    </svg>
  );
};

/**
 * 2. Derékszögű Háromszög és a Pitagorasz-tétel SVG
 * a² + b² = c² kapcsolata másodfokú egyenletekkel
 */
export const RightTrianglePythagorasSvg: React.FC<FigureProps> = ({ size = 500, className = '' }) => {
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
        <filter id="triShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#0F172A" floodOpacity="0.08" />
        </filter>
        <linearGradient id="triFillGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#EFF6FF" />
          <stop offset="100%" stopColor="#DBEAFE" />
        </linearGradient>
      </defs>

      {/* Cím csík */}
      <rect x="70" y="8" width="380" height="28" rx="8" fill="#2563EB" />
      <text x="260" y="27" fill="#FFFFFF" fontSize="12" fontWeight="900" textAnchor="middle" letterSpacing="0.5">
        DERÉKSZÖGŰ HÁROMSZÖG ÉS PITAGORASZ-TÉTEL
      </text>

      {/* Bal oldal: Derékszögű háromszög */}
      <g filter="url(#triShadow)">
        {/* Háromszög test */}
        <polygon points="60,195 240,195 60,65" fill="url(#triFillGrad)" stroke="#2563EB" strokeWidth="2" />

        {/* Derékszög sarok jelölése */}
        <rect x="60" y="177" width="18" height="18" fill="none" stroke="#1D4ED8" strokeWidth="1.5" />
        <circle cx="69" cy="186" r="2" fill="#1D4ED8" />

        {/* a befogó (vízszintes) */}
        <text x="150" y="213" fill="#1E40AF" fontSize="11" fontWeight="bold" textAnchor="middle">
          a befogó = x + d
        </text>

        {/* b befogó (függőleges) */}
        <text x="46" y="130" fill="#1E40AF" fontSize="11" fontWeight="bold" textAnchor="end">
          b = x
        </text>

        {/* c átfogó */}
        <text x="165" y="120" fill="#B91C1C" fontSize="11.5" fontWeight="900" transform="rotate(-36 165 120)">
          c átfogó
        </text>
      </g>

      {/* Jobb oldal: Algebrai modell magyarázat */}
      <g filter="url(#triShadow)">
        <rect x="275" y="48" width="230" height="178" rx="12" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.5" />

        <rect x="287" y="58" width="206" height="24" rx="6" fill="#1D4ED8" />
        <text x="390" y="74" fill="#FFFFFF" fontSize="10.5" fontWeight="bold" textAnchor="middle">
          Pitagorasz-modell: a² + b² = c²
        </text>

        <text x="290" y="100" fill="#334155" fontSize="9" fontWeight="bold">1. Befogók behelyettesítése:</text>
        <text x="295" y="115" fill="#1E40AF" fontSize="10" fontFamily="monospace">x² + (x + d)² = c²</text>

        <text x="290" y="135" fill="#334155" fontSize="9" fontWeight="bold">2. Zárójel felbontása:</text>
        <text x="295" y="150" fill="#1E40AF" fontSize="9.5" fontFamily="monospace">x² + x² + 2dx + d² = c²</text>

        <text x="290" y="170" fill="#334155" fontSize="9" fontWeight="bold">3. Rendezzük 0-ra:</text>
        <text x="295" y="185" fill="#B91C1C" fontSize="10" fontWeight="bold" fontFamily="monospace">2x² + 2dx + (d² - c²) = 0</text>

        <rect x="287" y="194" width="206" height="24" rx="5" fill="#EFF6FF" />
        <text x="390" y="210" fill="#1E40AF" fontSize="8.5" fontWeight="bold" textAnchor="middle">
          Feltétel: x &gt; 0 és x + (x + d) &gt; c
        </text>
      </g>
    </svg>
  );
};

/**
 * 3. Konvex Sokszög Átlóinak Száma SVG
 * A = n(n-3)/2 összefüggés és algebrai jelentése
 */
export const PolygonDiagonalsSvg: React.FC<FigureProps> = ({ size = 500, className = '' }) => {
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
        <filter id="polyShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#0F172A" floodOpacity="0.08" />
        </filter>
      </defs>

      {/* Cím csík */}
      <rect x="70" y="8" width="380" height="28" rx="8" fill="#7C3AED" />
      <text x="260" y="27" fill="#FFFFFF" fontSize="12" fontWeight="900" textAnchor="middle" letterSpacing="0.5">
        KONVEX SOKSZÖGEK ÁTLÓINAK SZÁMA
      </text>

      {/* Bal oldal: Hatszög átlói ábra */}
      <g filter="url(#polyShadow)">
        {/* Szabályos hatszög csúcsai (középpont: 140, 135; sugár: 70) */}
        {/* Csúcsok: P0(210, 135), P1(175, 196), P2(105, 196), P3(70, 135), P4(105, 74), P5(175, 74) */}
        <polygon
          points="210,135 175,196 105,196 70,135 105,74 175,74"
          fill="#F5F3FF"
          stroke="#7C3AED"
          strokeWidth="2"
        />

        {/* Egyetlen csúcsból (P3 = 70, 135) húzott átlók (n - 3 = 3 db átló) */}
        <line x1="70" y1="135" x2="175" y2="74" stroke="#D97706" strokeWidth="2" strokeDasharray="3 3" />
        <line x1="70" y1="135" x2="210" y2="135" stroke="#D97706" strokeWidth="2" strokeDasharray="3 3" />
        <line x1="70" y1="135" x2="175" y2="196" stroke="#D97706" strokeWidth="2" strokeDasharray="3 3" />

        {/* Csúcs pontok */}
        <circle cx="70" cy="135" r="5" fill="#D97706" stroke="#FFFFFF" strokeWidth="1.5" />
        <circle cx="105" cy="74" r="3.5" fill="#7C3AED" />
        <circle cx="175" cy="74" r="3.5" fill="#7C3AED" />
        <circle cx="210" cy="135" r="3.5" fill="#7C3AED" />
        <circle cx="175" cy="196" r="3.5" fill="#7C3AED" />
        <circle cx="105" cy="196" r="3.5" fill="#7C3AED" />

        <text x="55" y="140" fill="#B45309" fontSize="10" fontWeight="bold">Csúcs</text>
        <text x="140" y="222" fill="#6D28D9" fontSize="9.5" fontWeight="bold" textAnchor="middle">
          Egy csúcsból: n - 3 = 3 átló húzható
        </text>
      </g>

      {/* Jobb oldal: Képlet és Modell */}
      <g filter="url(#polyShadow)">
        <rect x="260" y="48" width="245" height="168" rx="12" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.5" />

        <rect x="272" y="58" width="221" height="24" rx="6" fill="#6D28D9" />
        <text x="382" y="74" fill="#FFFFFF" fontSize="11" fontWeight="bold" textAnchor="middle">
          Átlók Száma Képlet
        </text>

        <rect x="272" y="88" width="221" height="34" rx="6" fill="#EDE9FE" />
        <text x="382" y="110" fill="#5B21B6" fontSize="13" fontWeight="900" textAnchor="middle" fontFamily="monospace">
          A = n · (n - 3) / 2
        </text>

        <text x="275" y="138" fill="#334155" fontSize="8.5">
          • n csúcsból összesen <strong>n(n - 3)</strong> félelem indulhatna.
        </text>
        <text x="275" y="152" fill="#334155" fontSize="8.5">
          • De minden átlót mindkét végpontjáról számoltunk <strong>(÷ 2)</strong>.
        </text>

        <rect x="272" y="162" width="221" height="46" rx="6" fill="#FEF3C7" />
        <text x="382" y="177" fill="#92400E" fontSize="9" fontWeight="bold" textAnchor="middle">
          Másodfokú egyenlet n-re:
        </text>
        <text x="382" y="195" fill="#B45309" fontSize="10.5" fontWeight="900" textAnchor="middle" fontFamily="monospace">
          n² - 3n - 2A = 0  (n ≥ 3, n ∈ ℕ)
        </text>
      </g>
    </svg>
  );
};

/**
 * 4. Kert és Sétány (Szegély) Területi Modellje SVG
 * (a + 2x)(b + 2x) - ab = T_ösvény
 */
export const PathwayBorderProblemSvg: React.FC<FigureProps> = ({ size = 500, className = '' }) => {
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
        <filter id="pathShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#0F172A" floodOpacity="0.08" />
        </filter>
      </defs>

      {/* Cím csík */}
      <rect x="70" y="8" width="380" height="26" rx="6" fill="#0D9488" />
      <text x="260" y="25" fill="#FFFFFF" fontSize="11.5" fontWeight="900" textAnchor="middle" letterSpacing="0.5">
        ÖSVÉNY ÉS SZEGÉLY MÁSODFOKÚ MODELLJE
      </text>

      {/* Bal oldal: Külső és belső téglalap */}
      <g filter="url(#pathShadow)">
        {/* Külső téglalap (ösvénnyel együtt) */}
        <rect x="30" y="48" width="220" height="150" rx="8" fill="#CCFBF1" stroke="#0D9488" strokeWidth="2" strokeDasharray="3 3" />

        {/* Belső téglalap (a virágágyás / medence) */}
        <rect x="65" y="78" width="150" height="90" rx="6" fill="#14B8A6" stroke="#0F766E" strokeWidth="2" />
        <text x="140" y="125" fill="#FFFFFF" fontSize="11" fontWeight="bold" textAnchor="middle">
          Belső terület: a · b
        </text>

        {/* x szélesség jelölők */}
        {/* Bal szél */}
        <line x1="30" y1="123" x2="65" y2="123" stroke="#0F766E" strokeWidth="1.5" />
        <text x="47" y="117" fill="#0F766E" fontSize="9" fontWeight="bold" textAnchor="middle">x</text>

        {/* Jobb szél */}
        <line x1="215" y1="123" x2="250" y2="123" stroke="#0F766E" strokeWidth="1.5" />
        <text x="232" y="117" fill="#0F766E" fontSize="9" fontWeight="bold" textAnchor="middle">x</text>

        {/* Felső szél */}
        <line x1="140" y1="48" x2="140" y2="78" stroke="#0F766E" strokeWidth="1.5" />
        <text x="148" y="65" fill="#0F766E" fontSize="9" fontWeight="bold">x</text>

        {/* Alsó szél */}
        <line x1="140" y1="168" x2="140" y2="198" stroke="#0F766E" strokeWidth="1.5" />
        <text x="148" y="186" fill="#0F766E" fontSize="9" fontWeight="bold">x</text>

        <text x="140" y="210" fill="#0F766E" fontSize="9" fontStyle="italic" textAnchor="middle">
          Az ösvény szélessége minden oldalon: x
        </text>
      </g>

      {/* Jobb oldal: Modell és egyenlet */}
      <g filter="url(#pathShadow)">
        <rect x="270" y="48" width="235" height="155" rx="10" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.5" />

        <rect x="282" y="58" width="211" height="22" rx="5" fill="#0F766E" />
        <text x="387" y="73" fill="#FFFFFF" fontSize="10.5" fontWeight="bold" textAnchor="middle">
          A Terület Különbsége
        </text>

        <text x="282" y="98" fill="#334155" fontSize="8.5" fontWeight="bold">1. Új oldalak hossza:</text>
        <text x="287" y="112" fill="#0F766E" fontSize="9" fontFamily="monospace">A = a + 2x,   B = b + 2x</text>

        <text x="282" y="130" fill="#334155" fontSize="8.5" fontWeight="bold">2. Az ösvény saját területe:</text>
        <text x="287" y="144" fill="#0F766E" fontSize="9" fontFamily="monospace">T_ösvény = (a + 2x)(b + 2x) - ab</text>

        <rect x="282" y="154" width="211" height="38" rx="5" fill="#CCFBF1" />
        <text x="387" y="169" fill="#0F766E" fontSize="9.5" fontWeight="900" textAnchor="middle" fontFamily="monospace">
          4x² + 2(a + b)x - T_ösvény = 0
        </text>
        <text x="387" y="184" fill="#134E4A" fontSize="8" textAnchor="middle">
          Kizárólag az x &gt; 0 pozitív gyök fogadható el!
        </text>
      </g>
    </svg>
  );
};

