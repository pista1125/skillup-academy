import React from 'react';

interface FigureProps {
  size?: number;
  className?: string;
}

// 1. Két kör külső és belső hasonlósági pontja (H_k és H_b a centrálison)
export const CircleHomothetySvg: React.FC<FigureProps & { showTangents?: boolean }> = ({
  size = 320,
  className = '',
  showTangents = true
}) => {
  // O1(120, 100), r1=36; O2(230, 100), r2=22
  const o1 = { x: 120, y: 100, r: 36 };
  const o2 = { x: 230, y: 100, r: 22 };

  // Külső hasonlósági pont H_k (külső érintők metszéspontja a centrálison, O2-től jobbra)
  // x_hk = (r1*x2 - r2*x1) / (r1 - r2) = (36*230 - 22*120) / (36 - 22) = (8280 - 2640)/14 = 5640/14 ≈ 403
  // Hogy kiférjen a 340-es nézetbe, optimalizált koordináták:
  // o1(105, 100, r=40), o2(195, 100, r=20)
  // H_k = (40*195 - 20*105) / (40 - 20) = (7800 - 2100)/20 = 5700/20 = 285! Tökéletes!
  const c1 = { x: 105, y: 100, r: 40 };
  const c2 = { x: 195, y: 100, r: 20 };
  const hk = { x: 285, y: 100 }; // Külső hasonlósági pont (λ = 20/40 = 0.5)

  // Belső hasonlósági pont H_b (belső érintők metszéspontja O1 és O2 között)
  // x_hb = (r1*x2 + r2*x1) / (r1 + r2) = (40*195 + 20*105) / 60 = (7800 + 2100)/60 = 9900/60 = 165! Tökéletes!
  const hb = { x: 165, y: 100 }; // Belső hasonlósági pont (λ = -0.5)

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
        <linearGradient id="c1Grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#0284c7" stopOpacity="0.6" />
        </linearGradient>
        <linearGradient id="c2Grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#34d399" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#059669" stopOpacity="0.6" />
        </linearGradient>
      </defs>

      {/* Fejléc címke */}
      <rect x="50" y="6" width="240" height="20" rx="10" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1" />
      <text x="170" y="20" fill="#15803d" fontSize="10" fontWeight="bold" textAnchor="middle">
        KÖRÖK HASONLÓSÁGI PONTJAI: H_k ÉS H_b
      </text>

      {/* Centrális egyenes (O1-O2-Hb-Hk) */}
      <line x1="30" y1="100" x2="320" y2="100" stroke="#94a3b8" strokeWidth="1.2" strokeDasharray="4 3" />

      {/* Külső érintők H_k-ból */}
      {showTangents && (
        <g stroke="#f59e0b" strokeWidth="1.2">
          {/* Felső külső érintő */}
          <line x1="70" y1="65" x2={hk.x} y2={hk.y} />
          {/* Alsó külső érintő */}
          <line x1="70" y1="135" x2={hk.x} y2={hk.y} />
        </g>
      )}

      {/* Belső érintők H_b-n át */}
      {showTangents && (
        <g stroke="#f43f5e" strokeWidth="1.2" strokeDasharray="3 2">
          <line x1="70" y1="135" x2="230" y2="65" />
          <line x1="70" y1="65" x2="230" y2="135" />
        </g>
      )}

      {/* K1 kör (nagyobb) */}
      <circle cx={c1.x} cy={c1.y} r={c1.r} fill="url(#c1Grad)" stroke="#0284c7" strokeWidth="2" />
      <circle cx={c1.x} cy={c1.y} r="3" fill="#0284c7" />
      <text x={c1.x} y={c1.y - 7} fill="#0369a1" fontSize="10" fontWeight="bold" textAnchor="middle">
        O₁ (r₁=40)
      </text>

      {/* K2 kör (kisebb) */}
      <circle cx={c2.x} cy={c2.y} r={c2.r} fill="url(#c2Grad)" stroke="#059669" strokeWidth="2" />
      <circle cx={c2.x} cy={c2.y} r="3" fill="#059669" />
      <text x={c2.x} y={c2.y - 7} fill="#047857" fontSize="10" fontWeight="bold" textAnchor="middle">
        O₂ (r₂=20)
      </text>

      {/* H_b: Belső hasonlósági pont */}
      <circle cx={hb.x} cy={hb.y} r="4.5" fill="#f43f5e" stroke="#ffffff" strokeWidth="1.5" />
      <text x={hb.x} y={hb.y + 16} fill="#be123c" fontSize="10" fontWeight="black" textAnchor="middle">
        H_b (λ = -0,5)
      </text>

      {/* H_k: Külső hasonlósági pont */}
      <circle cx={hk.x} cy={hk.y} r="4.5" fill="#f59e0b" stroke="#ffffff" strokeWidth="1.5" />
      <text x={hk.x} y={hk.y + 16} fill="#b45309" fontSize="10" fontWeight="black" textAnchor="middle">
        H_k (λ = +0,5)
      </text>

      {/* Magyarázat alul */}
      <text x="170" y="196" fill="#64748b" fontSize="9.5" fontWeight="semibold" textAnchor="middle">
        Bármely két síkbeli kör középpontosan hasonló: van külső (H_k) és belső (H_b) centrum!
      </text>
    </svg>
  );
};

// 2. Kör kicsinyítése a körvonalon lévő pontból (Tankönyv 107. o. HF 1b)
export const CircleTouchingDilationSvg: React.FC<FigureProps> = ({
  size = 320,
  className = ''
}) => {
  // O pont a bal szélen: O(90, 105)
  // Eredeti kör: K1 középpont(170, 105), sugar R=80
  // Kicsinyített kör O-ból λ=0.5: K2 középpont(130, 105), sugar r=40
  // Mindkét kör érinti egymást belülről az O pontban!
  const ox = 90;
  const oy = 105;
  const r1 = 80;
  const r2 = 40;
  const o1 = { x: ox + r1, y: oy };
  const o2 = { x: ox + r2, y: oy };

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
        <linearGradient id="touchBigGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#0284c7" stopOpacity="0.4" />
        </linearGradient>
        <linearGradient id="touchSmallGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.6" />
        </linearGradient>
      </defs>

      {/* Címke */}
      <rect x="50" y="6" width="240" height="20" rx="10" fill="#fffbeb" stroke="#f59e0b" strokeWidth="1" />
      <text x="170" y="20" fill="#b45309" fontSize="10" fontWeight="bold" textAnchor="middle">
        CENTRUM A KÖRVONALON: BELSŐ ÉRINTŐ KÖRÖK
      </text>

      {/* Vízszintes centrális tengely */}
      <line x1="40" y1={oy} x2="300" y2={oy} stroke="#cbd5e1" strokeWidth="1.2" strokeDasharray="3 3" />

      {/* Eredeti nagy kör K (R = 5 cm) */}
      <circle cx={o1.x} cy={o1.y} r={r1} fill="url(#touchBigGrad)" stroke="#0284c7" strokeWidth="2" />
      <circle cx={o1.x} cy={o1.y} r="3" fill="#0284c7" />
      <text x={o1.x} y={o1.y - 8} fill="#0369a1" fontSize="10" fontWeight="bold" textAnchor="middle">
        K (R = 5 cm)
      </text>

      {/* Kicsinyített kör K' (r = 2.5 cm, λ = 0.5) */}
      <circle cx={o2.x} cy={o2.y} r={r2} fill="url(#touchSmallGrad)" stroke="#d97706" strokeWidth="2" />
      <circle cx={o2.x} cy={o2.y} r="3" fill="#d97706" />
      <text x={o2.x} y={o2.y - 8} fill="#b45309" fontSize="10" fontWeight="bold" textAnchor="middle">
        K' (r' = 2,5 cm)
      </text>

      {/* O centrum a körvonalon */}
      <circle cx={ox} cy={oy} r="5" fill="#ef4444" stroke="#ffffff" strokeWidth="1.5" />
      <text x={ox - 14} y={oy + 4} fill="#dc2626" fontSize="12" fontWeight="black">
        O
      </text>

      {/* Közös érintő az O-ban */}
      <line x1={ox} y1="35" x2={ox} y2="175" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4 2" />
      <text x={ox - 8} y="45" fill="#dc2626" fontSize="9" fontWeight="bold" textAnchor="end">
        közös érintő
      </text>

      {/* Alsó megjegyzés */}
      <text x="170" y="198" fill="#475569" fontSize="9.5" fontWeight="semibold" textAnchor="middle">
        Ha az O centrum a körvonalon van, a képpel egy közös pontban érintik egymást!
      </text>
    </svg>
  );
};

// 3. Invariáns elemek: fixpont (O) és fixegyenesek vs. nem fixegyenesek
export const InvariantLinesSvg: React.FC<FigureProps> = ({
  size = 320,
  className = ''
}) => {
  const ox = 170;
  const oy = 105;

  return (
    <svg
      viewBox="0 0 340 210"
      width={size}
      height={(size * 210) / 340}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`max-w-full h-auto select-none ${className}`}
    >
      {/* Címke */}
      <rect x="50" y="6" width="240" height="20" rx="10" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1" />
      <text x="170" y="20" fill="#0369a1" fontSize="10" fontWeight="bold" textAnchor="middle">
        INVARIÁNS ELEMEK: FIXPONT ÉS FIXEGYENESEK
      </text>

      {/* Fixegyenes 1 (vízszintes): O-n átmegy */}
      <line x1="30" y1={oy} x2="310" y2={oy} stroke="#0284c7" strokeWidth="1.8" />
      <text x="315" y={oy + 3} fill="#0284c7" fontSize="10" fontWeight="bold">f₁ (fix)</text>

      {/* Fixegyenes 2 (átlós): O-n átmegy */}
      <line x1="60" y1="180" x2="280" y2="30" stroke="#0284c7" strokeWidth="1.8" />
      <text x="285" y="35" fill="#0284c7" fontSize="10" fontWeight="bold">f₂ (fix)</text>

      {/* Nem fixegyenes: g (nem megy át O-n) és képe g' (párhuzamos vele) */}
      <line x1="50" y1="45" x2="160" y2="45" stroke="#64748b" strokeWidth="2" strokeDasharray="4 2" />
      <text x="40" y="48" fill="#64748b" fontSize="10" fontWeight="bold">g</text>

      <line x1="30" y1="28" x2="210" y2="28" stroke="#f59e0b" strokeWidth="2" />
      <text x="215" y="31" fill="#d97706" fontSize="10" fontWeight="bold">g' ∥ g</text>

      {/* Pontok mozgása a fixegyenesen (O nem mozdul, P ↦ P') */}
      <circle cx={ox + 60} cy={oy} r="3.5" fill="#64748b" />
      <text x={ox + 60} y={oy - 8} fill="#475569" fontSize="10" fontWeight="bold" textAnchor="middle">P</text>

      <circle cx={ox + 120} cy={oy} r="4" fill="#0284c7" />
      <text x={ox + 120} y={oy - 8} fill="#0284c7" fontSize="10" fontWeight="bold" textAnchor="middle">P' (λ = 2)</text>

      {/* O centrum: az egyetlen fixpont */}
      <circle cx={ox} cy={oy} r="5.5" fill="#ef4444" stroke="#ffffff" strokeWidth="2" />
      <text x={ox} y={oy + 18} fill="#dc2626" fontSize="11" fontWeight="black" textAnchor="middle">
        O (Fixpont: O = O')
      </text>

      {/* Magyarázat alul */}
      <text x="170" y="198" fill="#475569" fontSize="9.5" fontWeight="semibold" textAnchor="middle">
        Az O-n átmenő egyenesek mind fixegyenesek, de a pontjaik elmozdulnak (P ↦ P')!
      </text>
    </svg>
  );
};

// 4. Szögszárakat metsző párhuzamosok és trapézok vizsgálata (Tankönyv 107. o. 2. feladat)
export const AngleInterceptThalesSvg: React.FC<FigureProps> = ({
  size = 320,
  className = ''
}) => {
  // Csúcs O(40, 160)
  // Szögszár 1: (40, 160) -> (300, 50)
  // Szögszár 2: (40, 160) -> (300, 160) (vízszintes)
  // Párhuzamosok függőlegesek: x=110 (A, D), x=180 (B, E), x=270 (C, F)
  const ox = 40;
  const oy = 160;

  const a = { x: 110, y: 130 };
  const d = { x: 110, y: 160 };

  const b = { x: 180, y: 101 };
  const e = { x: 180, y: 160 };

  const c = { x: 270, y: 63 };
  const f = { x: 270, y: 160 };

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
        <linearGradient id="trapGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#d97706" stopOpacity="0.5" />
        </linearGradient>
      </defs>

      {/* Címke */}
      <rect x="50" y="6" width="240" height="20" rx="10" fill="#fffbeb" stroke="#f59e0b" strokeWidth="1" />
      <text x="170" y="20" fill="#b45309" fontSize="10" fontWeight="bold" textAnchor="middle">
        SZÖGSZÁRAK METSZÉSE: OAD ∼ OBE (TRAPÉZOK NEM!)
      </text>

      {/* Szögszárak O-ból */}
      <line x1={ox} y1={oy} x2="310" y2="45" stroke="#334155" strokeWidth="1.8" />
      <line x1={ox} y1={oy} x2="310" y2={oy} stroke="#334155" strokeWidth="1.8" />

      {/* ABED trapéz kiszínezve */}
      <polygon
        points={`${a.x},${a.y} ${b.x},${b.y} ${e.x},${e.y} ${d.x},${d.y}`}
        fill="url(#trapGrad)"
        stroke="#d97706"
        strokeWidth="1.5"
      />

      {/* Párhuzamos szelők AD, BE, CF */}
      <line x1={a.x} y1="120" x2={d.x} y2="175" stroke="#0284c7" strokeWidth="2" />
      <line x1={b.x} y1="90" x2={e.x} y2="175" stroke="#0284c7" strokeWidth="2" />
      <line x1={c.x} y1="50" x2={f.x} y2="175" stroke="#0284c7" strokeWidth="2" />

      {/* O pont */}
      <circle cx={ox} cy={oy} r="4" fill="#ef4444" />
      <text x={ox - 10} y={oy + 4} fill="#dc2626" fontSize="11" fontWeight="bold">O</text>

      {/* Pontok címkéi */}
      <text x={a.x - 12} y={a.y - 2} fill="#0369a1" fontSize="10" fontWeight="bold">A</text>
      <text x={d.x - 12} y={d.y + 12} fill="#0369a1" fontSize="10" fontWeight="bold">D</text>

      <text x={b.x - 12} y={b.y - 2} fill="#0369a1" fontSize="10" fontWeight="bold">B</text>
      <text x={e.x - 12} y={e.y + 12} fill="#0369a1" fontSize="10" fontWeight="bold">E</text>

      <text x={c.x - 12} y={c.y - 2} fill="#0369a1" fontSize="10" fontWeight="bold">C</text>
      <text x={f.x - 12} y={f.y + 12} fill="#0369a1" fontSize="10" fontWeight="bold">F</text>

      {/* Magyarázat alul */}
      <text x="170" y="196" fill="#475569" fontSize="9.5" fontWeight="semibold" textAnchor="middle">
        ✓ △OAD ∼ △OBE (O-ból) | ✗ ABED és BCFE trapézok NEM hasonlók O-ból!
      </text>
    </svg>
  );
};

// 5. Gúla nagyítása az E csúcsból különböző arányokkal (Tankönyv 107. o. 4-5. feladat)
export const PyramidDilationSvg: React.FC<FigureProps & { scaleRatio?: number }> = ({
  size = 320,
  className = '',
  scaleRatio = 2
}) => {
  // Csúcs E felül: (170, 40)
  const ex = 170;
  const ey = 40;

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
        <linearGradient id="pyrBigGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#a855f7" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#7e22ce" stopOpacity="0.5" />
        </linearGradient>
      </defs>

      {/* Címke */}
      <rect x="50" y="6" width="240" height="20" rx="10" fill="#faf5ff" stroke="#a855f7" strokeWidth="1" />
      <text x="170" y="20" fill="#7e22ce" fontSize="10" fontWeight="bold" textAnchor="middle">
        GÚLA NAGYÍTÁSA E CSÚCSBÓL (λ = {scaleRatio})
      </text>

      {/* Sugárvonalak E-ből */}
      <g stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3 3">
        <line x1={ex} y1={ey} x2="70" y2="200" />
        <line x1={ex} y1={ey} x2="270" y2="200" />
      </g>

      {/* Nagy gúla alaplapja */}
      <polygon points="70,185 270,185 240,205 100,205" fill="url(#pyrBigGrad)" stroke="#7e22ce" strokeWidth="1.8" />

      {/* Nagy gúla élvonalai E-ből */}
      <line x1={ex} y1={ey} x2="70" y2="185" stroke="#7e22ce" strokeWidth="1.8" />
      <line x1={ex} y1={ey} x2="270" y2="185" stroke="#7e22ce" strokeWidth="1.8" />
      <line x1={ex} y1={ey} x2="240" y2="205" stroke="#7e22ce" strokeWidth="1.8" />
      <line x1={ex} y1={ey} x2="100" y2="205" stroke="#7e22ce" strokeWidth="1.8" />

      {/* Eredeti kis gúla (fele arányban) */}
      <polygon points="120,112 220,112 205,122 135,122" fill="#38bdf8" fillOpacity="0.4" stroke="#0284c7" strokeWidth="1.5" />
      <line x1={ex} y1={ey} x2="120" y2="112" stroke="#0284c7" strokeWidth="1.5" />
      <line x1={ex} y1={ey} x2="220" y2="112" stroke="#0284c7" strokeWidth="1.5" />
      <line x1={ex} y1={ey} x2="205" y2="122" stroke="#0284c7" strokeWidth="1.5" />
      <line x1={ex} y1={ey} x2="135" y2="122" stroke="#0284c7" strokeWidth="1.5" />

      {/* E centrum */}
      <circle cx={ex} cy={ey} r="4.5" fill="#ef4444" stroke="#ffffff" strokeWidth="1.5" />
      <text x={ex} y={ey - 8} fill="#dc2626" fontSize="11" fontWeight="bold" textAnchor="middle">
        E (Centrum)
      </text>

      {/* Szöveg alul */}
      <text x="170" y="196" fill="#475569" fontSize="9.5" fontWeight="semibold" textAnchor="middle">
        Alapterület: T' = λ² · T_alap ({scaleRatio * scaleRatio}×) | Oldallapok kerülete: K' = λ · K
      </text>
    </svg>
  );
};

