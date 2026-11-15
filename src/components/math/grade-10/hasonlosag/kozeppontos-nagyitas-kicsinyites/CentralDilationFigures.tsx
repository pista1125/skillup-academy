import React from 'react';

interface FigureProps {
  size?: number;
  className?: string;
}

// 1. Középpontos nagyítás demonstrációja: O centrum, ABC és nagyított A'B'C' (λ = 2)
export const DilationCenterSvg: React.FC<FigureProps & { ratio?: number; showRays?: boolean }> = ({
  size = 320,
  className = '',
  ratio = 2,
  showRays = true
}) => {
  // O pont koordinátája
  const ox = 40;
  const oy = 150;

  // Eredeti háromszög csúcsai (A, B, C)
  const a = { x: 100, y: 130 };
  const b = { x: 140, y: 155 };
  const c = { x: 120, y: 95 };

  // Nagyított csúcsok számítása O-ból: P' = O + ratio * (P - O)
  const ap = { x: ox + ratio * (a.x - ox), y: oy + ratio * (a.y - oy) };
  const bp = { x: ox + ratio * (b.x - ox), y: oy + ratio * (b.y - oy) };
  const cp = { x: ox + ratio * (c.x - ox), y: oy + ratio * (c.y - oy) };

  return (
    <svg
      viewBox="0 0 340 210"
      width={size}
      height={(size * 210) / 340}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`max-w-full h-auto select-none ${className}`}
    >
      <defs>
        <linearGradient id="origTriGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#0284c7" stopOpacity="0.65" />
        </linearGradient>
        <linearGradient id="dilTriGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#d97706" stopOpacity="0.55" />
        </linearGradient>
        <filter id="dilShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="1" dy="2" stdDeviation="2" floodOpacity="0.18" />
        </filter>
      </defs>

      {/* Állapot felirat felül */}
      <rect x="70" y="8" width="200" height="22" rx="11" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1" />
      <text x="170" y="23" fill="#b45309" fontSize="11" fontWeight="bold" textAnchor="middle">
        NAGYÍTÁS O CENTRUMBÓL (λ = {ratio})
      </text>

      {/* Vetítősugarak O-ból a csúcsokon át */}
      {showRays && (
        <g stroke="#94a3b8" strokeWidth="1.2" strokeDasharray="3 3">
          <line x1={ox} y1={oy} x2={ap.x + 25} y2={ap.y + (ap.y - oy) * 0.15} />
          <line x1={ox} y1={oy} x2={bp.x + 25} y2={bp.y + (bp.y - oy) * 0.15} />
          <line x1={ox} y1={oy} x2={cp.x + 25} y2={cp.y + (cp.y - oy) * 0.15} />
        </g>
      )}

      {/* Nagyított háromszög A'B'C' */}
      <polygon
        points={`${ap.x},${ap.y} ${bp.x},${bp.y} ${cp.x},${cp.y}`}
        fill="url(#dilTriGrad)"
        stroke="#d97706"
        strokeWidth="2"
        filter="url(#dilShadow)"
      />

      {/* Eredeti háromszög ABC */}
      <polygon
        points={`${a.x},${a.y} ${b.x},${b.y} ${c.x},${c.y}`}
        fill="url(#origTriGrad)"
        stroke="#0284c7"
        strokeWidth="2"
        filter="url(#dilShadow)"
      />

      {/* O centrum pont */}
      <circle cx={ox} cy={oy} r="5" fill="#ef4444" stroke="#ffffff" strokeWidth="1.5" />
      <text x={ox - 14} y={oy + 4} fill="#dc2626" fontSize="13" fontWeight="bold">
        O
      </text>

      {/* Eredeti csúcspontok */}
      <circle cx={a.x} cy={a.y} r="3.5" fill="#0284c7" />
      <text x={a.x - 12} y={a.y + 4} fill="#0369a1" fontSize="11" fontWeight="bold">A</text>
      <circle cx={b.x} cy={b.y} r="3.5" fill="#0284c7" />
      <text x={b.x + 4} y={b.y + 12} fill="#0369a1" fontSize="11" fontWeight="bold">B</text>
      <circle cx={c.x} cy={c.y} r="3.5" fill="#0284c7" />
      <text x={c.x} y={c.y - 7} fill="#0369a1" fontSize="11" fontWeight="bold">C</text>

      {/* Nagyított csúcspontok */}
      <circle cx={ap.x} cy={ap.y} r="4" fill="#d97706" />
      <text x={ap.x - 16} y={ap.y + 6} fill="#b45309" fontSize="12" fontWeight="bold">A'</text>
      <circle cx={bp.x} cy={bp.y} r="4" fill="#d97706" />
      <text x={bp.x + 6} y={bp.y + 10} fill="#b45309" fontSize="12" fontWeight="bold">B'</text>
      <circle cx={cp.x} cy={cp.y} r="4" fill="#d97706" />
      <text x={cp.x} y={cp.y - 8} fill="#b45309" fontSize="12" fontWeight="bold">C'</text>

      {/* Párhuzamosság és arány jelölés */}
      <path d={`M ${a.x + 2} ${a.y + 1} L ${ap.x - 2} ${ap.y - 1}`} stroke="#0284c7" strokeWidth="1" strokeDasharray="2 2" />
      <text x="175" y="198" fill="#64748b" fontSize="10" fontWeight="bold" textAnchor="middle">
        |OA'| = {ratio} · |OA| &nbsp;|&nbsp; |A'B'| = {ratio} · |AB| &nbsp;|&nbsp; AB ∥ A'B'
      </text>
    </svg>
  );
};

// 2. Negatív arányú középpontos hasonlóság (λ = -1.5): az O pont a két alakzat között fekszik
export const NegativeRatioSvg: React.FC<FigureProps & { ratio?: number }> = ({
  size = 320,
  className = '',
  ratio = -1.5
}) => {
  const ox = 170;
  const oy = 105;

  // Eredeti alakzat a jobb oldalon
  const a = { x: 230, y: 75 };
  const b = { x: 270, y: 135 };
  const c = { x: 220, y: 140 };

  // Képpontok számítása ellentétes irányban: P' = O + ratio * (P - O) ahol ratio < 0
  const ap = { x: ox + ratio * (a.x - ox), y: oy + ratio * (a.y - oy) };
  const bp = { x: ox + ratio * (b.x - ox), y: oy + ratio * (b.y - oy) };
  const cp = { x: ox + ratio * (c.x - ox), y: oy + ratio * (c.y - oy) };

  return (
    <svg
      viewBox="0 0 340 210"
      width={size}
      height={(size * 210) / 340}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`max-w-full h-auto select-none ${className}`}
    >
      <defs>
        <linearGradient id="negOrigGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#0284c7" stopOpacity="0.65" />
        </linearGradient>
        <linearGradient id="negImageGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#be123c" stopOpacity="0.6" />
        </linearGradient>
      </defs>

      {/* Állapot felirat felül */}
      <rect x="55" y="8" width="230" height="22" rx="11" fill="#ffe4e6" stroke="#f43f5e" strokeWidth="1" />
      <text x="170" y="23" fill="#be123c" fontSize="11" fontWeight="bold" textAnchor="middle">
        NEGATÍV ARÁNY: λ = {ratio} (IRÁNYVÁLTÓ / TÜKRÖZÖTT)
      </text>

      {/* Egyenesek O-n keresztül */}
      <g stroke="#cbd5e1" strokeWidth="1.2" strokeDasharray="3 3">
        <line x1={a.x} y1={a.y} x2={ap.x} y2={ap.y} />
        <line x1={b.x} y1={b.y} x2={bp.x} y2={bp.y} />
        <line x1={c.x} y1={c.y} x2={cp.x} y2={cp.y} />
      </g>

      {/* Kép háromszög A'B'C' (átfordult / fejjel lefelé) */}
      <polygon
        points={`${ap.x},${ap.y} ${bp.x},${bp.y} ${cp.x},${cp.y}`}
        fill="url(#negImageGrad)"
        stroke="#be123c"
        strokeWidth="2"
      />

      {/* Eredeti háromszög ABC */}
      <polygon
        points={`${a.x},${a.y} ${b.x},${b.y} ${c.x},${c.y}`}
        fill="url(#negOrigGrad)"
        stroke="#0284c7"
        strokeWidth="2"
      />

      {/* O centrum */}
      <circle cx={ox} cy={oy} r="5" fill="#f59e0b" stroke="#ffffff" strokeWidth="1.5" />
      <text x={ox} y={oy - 8} fill="#b45309" fontSize="13" fontWeight="bold" textAnchor="middle">
        O (középpont)
      </text>

      {/* Csúcsok */}
      <text x={a.x + 8} y={a.y + 4} fill="#0369a1" fontSize="11" fontWeight="bold">A</text>
      <text x={b.x + 8} y={b.y + 4} fill="#0369a1" fontSize="11" fontWeight="bold">B</text>
      <text x={c.x - 14} y={c.y + 12} fill="#0369a1" fontSize="11" fontWeight="bold">C</text>

      <text x={ap.x - 16} y={ap.y + 8} fill="#be123c" fontSize="12" fontWeight="bold">A'</text>
      <text x={bp.x - 18} y={bp.y + 4} fill="#be123c" fontSize="12" fontWeight="bold">B'</text>
      <text x={cp.x + 6} y={cp.y - 4} fill="#be123c" fontSize="12" fontWeight="bold">C'</text>

      <text x="170" y="198" fill="#64748b" fontSize="10" fontWeight="bold" textAnchor="middle">
        P és P' az O ellentétes oldalán | |A'B'| = |λ| · |AB| = 1,5 · |AB|
      </text>
    </svg>
  );
};

// 3. Kerület- és területarány összefüggés (k = 2 ⟹ K' = 2K, T' = 4T)
export const AreaPerimeterRatioSvg: React.FC<FigureProps & { scaleFactor?: number }> = ({
  size = 320,
  className = '',
  scaleFactor = 2
}) => {
  return (
    <svg
      viewBox="0 0 340 200"
      width={size}
      height={(size * 200) / 340}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`max-w-full h-auto select-none ${className}`}
    >
      <defs>
        <linearGradient id="sq1Grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
        <linearGradient id="sq2Grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
      </defs>

      {/* Fejléc */}
      <rect x="50" y="8" width="240" height="22" rx="11" fill="#ecfdf5" stroke="#10b981" strokeWidth="1" />
      <text x="170" y="23" fill="#047857" fontSize="11" fontWeight="bold" textAnchor="middle">
        OLDALARÁNY k = 2 ⟹ TERÜLETARÁNY k² = 4
      </text>

      {/* Eredeti négyzet (1 egység oldal) */}
      <g transform="translate(45, 55)">
        <rect x="0" y="30" width="50" height="50" fill="url(#sq1Grad)" fillOpacity="0.4" stroke="#0284c7" strokeWidth="2" rx="4" />
        <text x="25" y="60" fill="#0369a1" fontSize="12" fontWeight="bold" textAnchor="middle">T</text>
        <text x="25" y="22" fill="#0284c7" fontSize="10" fontWeight="bold" textAnchor="middle">a = 1</text>
        <text x="-12" y="60" fill="#0284c7" fontSize="10" fontWeight="bold" textAnchor="middle">a = 1</text>
        <text x="25" y="98" fill="#475569" fontSize="10" fontWeight="semibold" textAnchor="middle">
          K = 4a = 4
        </text>
        <text x="25" y="112" fill="#475569" fontSize="10" fontWeight="semibold" textAnchor="middle">
          T = a² = 1
        </text>
      </g>

      {/* Nyíl a két alakzat között */}
      <g transform="translate(135, 95)">
        <path d="M 0 0 L 28 0 M 20 -5 L 28 0 L 20 5" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <text x="14" y="-8" fill="#d97706" fontSize="11" fontWeight="black" textAnchor="middle">× 2</text>
      </g>

      {/* Nagyított négyzet (2 egység oldal = 4 kis négyzet) */}
      <g transform="translate(195, 40)">
        <rect x="0" y="0" width="100" height="100" fill="url(#sq2Grad)" fillOpacity="0.25" stroke="#d97706" strokeWidth="2" rx="6" />
        
        {/* 4 résznégyzet elválasztó vonalak */}
        <line x1="50" y1="0" x2="50" y2="100" stroke="#d97706" strokeWidth="1" strokeDasharray="3 3" />
        <line x1="0" y1="50" x2="100" y2="50" stroke="#d97706" strokeWidth="1" strokeDasharray="3 3" />

        <text x="25" y="30" fill="#b45309" fontSize="11" fontWeight="bold" textAnchor="middle">T₁</text>
        <text x="75" y="30" fill="#b45309" fontSize="11" fontWeight="bold" textAnchor="middle">T₂</text>
        <text x="25" y="80" fill="#b45309" fontSize="11" fontWeight="bold" textAnchor="middle">T₃</text>
        <text x="75" y="80" fill="#b45309" fontSize="11" fontWeight="bold" textAnchor="middle">T₄</text>

        <text x="50" y="-8" fill="#d97706" fontSize="10" fontWeight="bold" textAnchor="middle">2a = 2</text>
        <text x="115" y="55" fill="#d97706" fontSize="10" fontWeight="bold" textAnchor="start">2a = 2</text>

        <text x="50" y="118" fill="#b45309" fontSize="10" fontWeight="bold" textAnchor="middle">
          K' = 2 · K = 8 (2×)
        </text>
        <text x="50" y="132" fill="#b45309" fontSize="10" fontWeight="bold" textAnchor="middle">
          T' = 2² · T = 4T = 4 (4×)
        </text>
      </g>

      {/* Alsó megjegyzés */}
      <text x="170" y="190" fill="#64748b" fontSize="10" fontWeight="bold" textAnchor="middle">
        Általánosan: K' = |λ| · K &nbsp;|&nbsp; T' = λ² · T &nbsp;|&nbsp; V' = |λ|³ · V
      </text>
    </svg>
  );
};

// 4. Háromszögbe írt négyzet szerkesztése hasonlósággal (Tankönyv 105. oldal, Emelt szint)
export const SquareInTriangleSvg: React.FC<FigureProps> = ({
  size = 320,
  className = ''
}) => {
  return (
    <svg
      viewBox="0 0 340 210"
      width={size}
      height={(size * 210) / 340}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`max-w-full h-auto select-none ${className}`}
    >
      <defs>
        <linearGradient id="triInGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f8fafc" />
          <stop offset="100%" stopColor="#e2e8f0" />
        </linearGradient>
      </defs>

      {/* Címke */}
      <rect x="50" y="6" width="240" height="20" rx="10" fill="#f5f3ff" stroke="#8b5cf6" strokeWidth="1" />
      <text x="170" y="20" fill="#6d28d9" fontSize="10" fontWeight="bold" textAnchor="middle">
        SZERKESZTÉS: NÉGYZET HÁROMSZÖGBE A-BÓL
      </text>

      {/* ABC háromszög: A(30, 170), B(280, 170), C(180, 45) */}
      <polygon points="30,170 280,170 180,45" fill="url(#triInGrad)" stroke="#334155" strokeWidth="2" />
      <text x="18" y="180" fill="#1e293b" fontSize="12" fontWeight="bold">A</text>
      <text x="288" y="176" fill="#1e293b" fontSize="12" fontWeight="bold">B</text>
      <text x="180" y="38" fill="#1e293b" fontSize="12" fontWeight="bold" textAnchor="middle">C</text>

      {/* 1. Kis segédnégyzet KLMN: K(70, 170), L(120, 170), M(120, 120), N(70, 120) */}
      <rect x="70" y="120" width="50" height="50" fill="#38bdf8" fillOpacity="0.25" stroke="#0284c7" strokeWidth="1.5" strokeDasharray="3 3" />
      <text x="68" y="184" fill="#0284c7" fontSize="10" fontWeight="bold">K</text>
      <text x="120" y="184" fill="#0284c7" fontSize="10" fontWeight="bold">L</text>
      <text x="124" y="118" fill="#0284c7" fontSize="10" fontWeight="bold">M</text>
      <text x="60" y="118" fill="#0284c7" fontSize="10" fontWeight="bold">N</text>

      {/* Nagyítási sugár A-ból M-en keresztül BC-ig */}
      <line x1="30" y1="170" x2="228" y2="60" stroke="#ef4444" strokeWidth="1.8" strokeDasharray="4 3" />
      <circle cx="30" cy="170" r="4" fill="#ef4444" />
      <text x="16" y="160" fill="#dc2626" fontSize="10" fontWeight="black">O=A</text>

      {/* 2. Nagyított végleges négyzet K'L'M'N':
          Metszéspont BC egyenessel: M' (kb. 200, 75.8)
          Oldalhossz: 170 - 75.8 = 94.2
          K'(105.8, 170), L'(200, 170), M'(200, 75.8), N'(105.8, 75.8)
      */}
      <rect x="105.8" y="75.8" width="94.2" height="94.2" fill="#10b981" fillOpacity="0.3" stroke="#059669" strokeWidth="2.2" rx="2" />
      <circle cx="200" cy="75.8" r="4" fill="#ef4444" />
      <text x="208" y="74" fill="#dc2626" fontSize="11" fontWeight="bold">M' (BC-n)</text>
      <text x="100" y="186" fill="#059669" fontSize="11" fontWeight="bold">K'</text>
      <text x="204" y="186" fill="#059669" fontSize="11" fontWeight="bold">L'</text>
      <text x="94" y="72" fill="#059669" fontSize="11" fontWeight="bold">N' (AC-n)</text>

      {/* Magyarázat alul */}
      <text x="170" y="202" fill="#475569" fontSize="9.5" fontWeight="semibold" textAnchor="middle">
        Az A centrumból nagyítva M ↦ M' a BC oldalon ⟹ K'L'M'N' pontosan illeszkedik!
      </text>
    </svg>
  );
};

// 5. Gúla párhuzamos síkmetszetei (Tankönyv 104. oldal, 3. feladat)
export const PyramidSliceSvg: React.FC<FigureProps> = ({
  size = 320,
  className = ''
}) => {
  return (
    <svg
      viewBox="0 0 340 210"
      width={size}
      height={(size * 210) / 340}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`max-w-full h-auto select-none ${className}`}
    >
      <defs>
        <linearGradient id="pyrBaseGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#d97706" stopOpacity="0.8" />
        </linearGradient>
      </defs>

      {/* Címke */}
      <rect x="50" y="6" width="240" height="20" rx="10" fill="#fffbeb" stroke="#f59e0b" strokeWidth="1" />
      <text x="170" y="20" fill="#b45309" fontSize="10" fontWeight="bold" textAnchor="middle">
        GÚLA SÍKMETSZETEI: T_k = k² · T_alap
      </text>

      {/* Csúcs E (170, 35) */}
      <circle cx="170" cy="35" r="4" fill="#ef4444" />
      <text x="170" y="28" fill="#dc2626" fontSize="11" fontWeight="bold" textAnchor="middle">E (Centrum)</text>

      {/* Magasságvonal E-ből */}
      <line x1="170" y1="35" x2="170" y2="185" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 2" />

      {/* 3. szint: 1/4 magasság (k = 0.25, T = 1/16) */}
      <polygon points="152,72 188,72 178,82 142,82" fill="#38bdf8" fillOpacity="0.5" stroke="#0284c7" strokeWidth="1" />
      <text x="210" y="78" fill="#0284c7" fontSize="9" fontWeight="bold">k = 1/4 ⟹ T/16</text>

      {/* 2. szint: 2/4 magasság (k = 0.5, T = 1/4) */}
      <polygon points="135,110 205,110 190,126 120,126" fill="#10b981" fillOpacity="0.45" stroke="#059669" strokeWidth="1.2" />
      <text x="220" y="120" fill="#059669" fontSize="9" fontWeight="bold">k = 2/4 ⟹ T/4</text>

      {/* 1. szint: 3/4 magasság (k = 0.75, T = 9/16) */}
      <polygon points="118,148 222,148 202,170 98,170" fill="#a855f7" fillOpacity="0.4" stroke="#7e22ce" strokeWidth="1.2" />
      <text x="230" y="160" fill="#7e22ce" fontSize="9" fontWeight="bold">k = 3/4 ⟹ 9T/16</text>

      {/* Alaplap: teljes (k = 1, T = 8x8 = 64 cm²) */}
      <polygon points="100,180 240,180 216,200 76,200" fill="url(#pyrBaseGrad)" stroke="#b45309" strokeWidth="1.8" />
      <text x="50" y="196" fill="#b45309" fontSize="10" fontWeight="bold">Alap (T = 64 cm²)</text>

      {/* Élek az E csúcsból */}
      <line x1="170" y1="35" x2="100" y2="180" stroke="#475569" strokeWidth="1.5" />
      <line x1="170" y1="35" x2="240" y2="180" stroke="#475569" strokeWidth="1.5" />
      <line x1="170" y1="35" x2="216" y2="200" stroke="#475569" strokeWidth="1.5" />
      <line x1="170" y1="35" x2="76" y2="200" stroke="#475569" strokeWidth="1.5" />
    </svg>
  );
};

