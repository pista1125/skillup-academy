import React from 'react';

// 1. Thálész-körös geometriai bizonyítás SVG
// Átmérő: a + b, sugár: R = (a+b)/2, magasság: m = sqrt(ab)
export const AmGmThalesSvg: React.FC<{
  size?: number;
  aVal?: number;
  bVal?: number;
  className?: string;
}> = ({ size = 280, aVal = 60, bVal = 140, className = '' }) => {
  const width = 320;
  const height = 180;
  const baseMargin = 25;
  const groundY = 145;

  const totalLength = width - 2 * baseMargin; // 270 px
  const aRatio = Math.max(0.1, Math.min(0.9, aVal / (aVal + bVal)));
  const splitX = baseMargin + totalLength * aRatio;
  const centerX = baseMargin + totalLength / 2;
  const radius = totalLength / 2;

  // Derékszögű háromszög magassága a magasságtétel szerint: m^2 = a * b
  // normalizált magasság px-ben:
  const aPx = splitX - baseMargin;
  const bPx = baseMargin + totalLength - splitX;
  const heightPx = Math.sqrt(aPx * bPx);
  const topY = groundY - heightPx;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={`max-w-full h-auto drop-shadow-sm select-none ${className}`}
      style={{ width: size, height: (size * height) / width }}
    >
      <defs>
        <linearGradient id="amGmCircleGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#0d9488" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#0d9488" stopOpacity="0.02" />
        </linearGradient>
      </defs>

      {/* Félkör (Thálész-kör) */}
      <path
        d={`M ${baseMargin} ${groundY} A ${radius} ${radius} 0 0 1 ${baseMargin + totalLength} ${groundY} Z`}
        fill="url(#amGmCircleGrad)"
        stroke="#0d9488"
        strokeWidth="2.5"
      />

      {/* Átmérő (Alapvonal) */}
      <line
        x1={baseMargin}
        y1={groundY}
        x2={baseMargin + totalLength}
        y2={groundY}
        stroke="#334155"
        strokeWidth="2.5"
      />

      {/* 'a' szakasz színes kiemelése */}
      <line
        x1={baseMargin}
        y1={groundY}
        x2={splitX}
        y2={groundY}
        stroke="#2563eb"
        strokeWidth="3.5"
      />
      {/* 'b' szakasz színes kiemelése */}
      <line
        x1={splitX}
        y1={groundY}
        x2={baseMargin + totalLength}
        y2={groundY}
        stroke="#9333ea"
        strokeWidth="3.5"
      />

      {/* Magasság szakasz: m = sqrt(a * b) (Mértani közép) */}
      <line
        x1={splitX}
        y1={groundY}
        x2={splitX}
        y2={topY}
        stroke="#e11d48"
        strokeWidth="2.5"
        strokeDasharray="4 2"
      />
      <circle cx={splitX} cy={topY} r="4" fill="#e11d48" />

      {/* Sugár szakasz a középpontból a legfelső pontig: R = (a+b)/2 (Számtani közép) */}
      <line
        x1={centerX}
        y1={groundY}
        x2={centerX}
        y2={groundY - radius}
        stroke="#059669"
        strokeWidth="2.5"
      />
      <circle cx={centerX} cy={groundY - radius} r="4" fill="#059669" />

      {/* Derékszög jele a magasság talppontjánál */}
      <path
        d={`M ${splitX} ${groundY - 10} L ${splitX + 10} ${groundY - 10} L ${splitX + 10} ${groundY}`}
        fill="none"
        stroke="#94a3b8"
        strokeWidth="1.5"
      />

      {/* Magyarázó feliratok */}
      {/* a és b szakasz címkék */}
      <text x={(baseMargin + splitX) / 2} y={groundY + 16} fill="#2563eb" fontSize="11" fontWeight="bold" textAnchor="middle">
        a
      </text>
      <text x={(splitX + baseMargin + totalLength) / 2} y={groundY + 16} fill="#9333ea" fontSize="11" fontWeight="bold" textAnchor="middle">
        b
      </text>

      {/* Mértani közép (m) felirat */}
      <text
        x={splitX > centerX ? splitX + 8 : splitX - 8}
        y={(groundY + topY) / 2 + 3}
        fill="#e11d48"
        fontSize="11"
        fontWeight="bold"
        textAnchor={splitX > centerX ? 'start' : 'end'}
      >
        m = √(ab)
      </text>

      {/* Számtani közép (R) felirat */}
      <text
        x={centerX > splitX ? centerX + 8 : centerX - 8}
        y={groundY - radius / 2}
        fill="#059669"
        fontSize="11"
        fontWeight="bold"
        textAnchor={centerX > splitX ? 'start' : 'end'}
      >
        R = (a+b)/2
      </text>

      {/* Összegző egyenlőtlenség felirat alul */}
      <text x={centerX} y="22" fill="#0f172a" className="dark:fill-slate-100" fontSize="12" fontWeight="900" textAnchor="middle">
        √(ab) ≤ (a + b) / 2
      </text>
    </svg>
  );
};

// 2. Téglalap vs Négyzet Szélsőérték Modell SVG
// Azonos kerület -> négyzet területe a legnagyobb
export const RectangleSquareComparisonSvg: React.FC<{ size?: number; className?: string }> = ({
  size = 280,
  className = ''
}) => {
  return (
    <svg
      viewBox="0 0 320 200"
      className={`max-w-full h-auto drop-shadow-sm select-none ${className}`}
      style={{ width: size, height: (size * 200) / 320 }}
    >
      {/* 1. Alakzat: Lapos téglalap (a = 27, b = 12, K = 78, T = 324) */}
      <g transform="translate(20, 30)">
        <rect
          x="0"
          y="40"
          width="110"
          height="50"
          rx="6"
          fill="#3b82f6"
          fillOpacity="0.15"
          stroke="#2563eb"
          strokeWidth="2"
        />
        <text x="55" y="32" fill="#2563eb" fontSize="10" fontWeight="bold" textAnchor="middle">
          a = 27 cm
        </text>
        <text x="118" y="70" fill="#2563eb" fontSize="10" fontWeight="bold" textAnchor="start">
          b = 12 cm
        </text>
        <text x="55" y="70" fill="#1e3a8a" className="dark:fill-blue-200" fontSize="11" fontWeight="black" textAnchor="middle">
          T = 324 cm²
        </text>
        <text x="55" y="115" fill="#475569" fontSize="10" textAnchor="middle">
          K = 78 cm
        </text>
      </g>

      {/* VS Nyíl */}
      <g transform="translate(150, 75)">
        <circle cx="10" cy="10" r="14" fill="#f1f5f9" className="dark:fill-slate-800" stroke="#cbd5e1" strokeWidth="1" />
        <text x="10" y="14" fill="#64748b" fontSize="11" fontWeight="black" textAnchor="middle">
          vs
        </text>
      </g>

      {/* 2. Alakzat: Négyzet (a = b = 19.5, K = 78, T = 380.25 cm²) */}
      <g transform="translate(190, 20)">
        <rect
          x="0"
          y="15"
          width="95"
          height="95"
          rx="6"
          fill="#10b981"
          fillOpacity="0.2"
          stroke="#059669"
          strokeWidth="2.5"
        />
        <text x="47" y="8" fill="#059669" fontSize="10" fontWeight="bold" textAnchor="middle">
          s = 19,5 cm
        </text>
        <text x="102" y="66" fill="#059669" fontSize="10" fontWeight="bold" textAnchor="start">
          s = 19,5 cm
        </text>
        <text x="47" y="63" fill="#065f46" className="dark:fill-emerald-200" fontSize="12" fontWeight="black" textAnchor="middle">
          T = 380,25 cm²
        </text>
        <text x="47" y="80" fill="#047857" className="dark:fill-emerald-300" fontSize="9" fontWeight="bold" textAnchor="middle">
          MAXIMÁLIS!
        </text>
        <text x="47" y="130" fill="#475569" fontSize="10" textAnchor="middle">
          K = 78 cm (ugyanaz)
        </text>
      </g>

      {/* Alsó tanulság banner */}
      <rect x="25" y="160" width="270" height="30" rx="8" fill="#ecfdf5" className="dark:fill-emerald-950/40" stroke="#a7f3d0" strokeWidth="1" />
      <text x="160" y="180" fill="#065f46" className="dark:fill-emerald-300" fontSize="11" fontWeight="bold" textAnchor="middle">
        Azonos kerületű téglalapok közül a négyzet területe a legnagyobb!
      </text>
    </svg>
  );
};

// 3. Reciprok-összeg függvény SVG: f(x) = x + 1/x (x > 0 esetén f(x) >= 2)
export const ReciprocalSumGraphSvg: React.FC<{ size?: number; className?: string }> = ({
  size = 280,
  className = ''
}) => {
  return (
    <svg
      viewBox="0 0 300 200"
      className={`max-w-full h-auto drop-shadow-sm select-none ${className}`}
      style={{ width: size, height: (size * 200) / 300 }}
    >
      <defs>
        <linearGradient id="recipGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.0" />
        </linearGradient>
      </defs>

      {/* Koordináta tengelyek */}
      <line x1="30" y1="170" x2="280" y2="170" stroke="#64748b" strokeWidth="1.5" />
      <line x1="40" y1="180" x2="40" y2="20" stroke="#64748b" strokeWidth="1.5" />
      <polygon points="280,170 274,166 274,174" fill="#64748b" />
      <polygon points="40,20 36,26 44,26" fill="#64748b" />
      <text x="285" y="174" fill="#64748b" fontSize="10" fontWeight="bold">x</text>
      <text x="44" y="22" fill="#64748b" fontSize="10" fontWeight="bold">y</text>

      {/* y = 2 vízszintes alsó korlát (minimumvonal) */}
      <line x1="40" y1="100" x2="270" y2="100" stroke="#e11d48" strokeWidth="1.5" strokeDasharray="4 3" />
      <text x="268" y="94" fill="#e11d48" fontSize="10" fontWeight="bold" textAnchor="end">
        y = 2 (alsó határ)
      </text>

      {/* Függvény görbéje: y = x + 1/x (skálázva: x=1 -> px=115, y=2 -> py=100) */}
      {/* Pontok mintavételezése:
          x=0.25 -> y=4.25 -> (59, 20)
          x=0.5  -> y=2.5  -> (78, 80)
          x=1.0  -> y=2.0  -> (115, 100) [MINIMUM]
          x=1.5  -> y=2.17 -> (153, 94)
          x=2.0  -> y=2.5  -> (190, 80)
          x=3.0  -> y=3.33 -> (265, 52)
      */}
      <path
        d="M 58 20 C 72 75 95 100 115 100 C 145 100 200 85 265 52"
        fill="none"
        stroke="#7c3aed"
        strokeWidth="3"
      />

      {/* Minimum pont kiemelése */}
      <circle cx="115" cy="100" r="5" fill="#e11d48" stroke="#ffffff" strokeWidth="2" />
      <line x1="115" y1="100" x2="115" y2="170" stroke="#94a3b8" strokeDasharray="3 2" />
      <text x="115" y="184" fill="#334155" className="dark:fill-slate-300" fontSize="10" fontWeight="bold" textAnchor="middle">
        x = 1
      </text>
      <text x="32" y="104" fill="#e11d48" fontSize="10" fontWeight="bold" textAnchor="end">
        2
      </text>

      <text x="122" y="118" fill="#7c3aed" fontSize="11" fontWeight="black">
        Min(1; 2)
      </text>

      <text x="160" y="38" fill="#5b21b6" className="dark:fill-violet-300" fontSize="11" fontWeight="black">
        f(x) = x + 1/x ≥ 2
      </text>
    </svg>
  );
};

// 4. Bérnövekedési Trajektória SVG: Antal (számtani) vs Benő (mértani)
export const SalaryGrowthComparisonSvg: React.FC<{ size?: number; className?: string }> = ({
  size = 280,
  className = ''
}) => {
  return (
    <svg
      viewBox="0 0 300 190"
      className={`max-w-full h-auto drop-shadow-sm select-none ${className}`}
      style={{ width: size, height: (size * 190) / 300 }}
    >
      {/* Tengelyek */}
      <line x1="45" y1="150" x2="275" y2="150" stroke="#94a3b8" strokeWidth="1.5" />
      <line x1="45" y1="155" x2="45" y2="25" stroke="#94a3b8" strokeWidth="1.5" />

      {/* Hónapok jelölői */}
      {/* Január (px: 70), Február (px: 160), Március (px: 250) */}
      <text x="70" y="166" fill="#64748b" fontSize="10" fontWeight="bold" textAnchor="middle">Január</text>
      <text x="160" y="166" fill="#64748b" fontSize="10" fontWeight="bold" textAnchor="middle">Február</text>
      <text x="250" y="166" fill="#64748b" fontSize="10" fontWeight="bold" textAnchor="middle">Március</text>

      {/* Fix bérek: Január = 150 ezer (y=130), Március = 216 ezer (y=40) */}
      {/* Antal februári: (150+216)/2 = 183 ezer (y=85) */}
      {/* Benő februári: sqrt(150*216) = 180 ezer (y=90) */}

      {/* Antal vonala (Kék) - Számtani növekedés */}
      <line x1="70" y1="130" x2="160" y2="85" stroke="#2563eb" strokeWidth="2.5" />
      <line x1="160" y1="85" x2="250" y2="40" stroke="#2563eb" strokeWidth="2.5" />
      <circle cx="70" cy="130" r="4" fill="#2563eb" />
      <circle cx="160" cy="85" r="5" fill="#2563eb" />
      <circle cx="250" cy="40" r="4" fill="#2563eb" />

      {/* Benő vonala (Narancs/Teal) - Mértani növekedés */}
      <line x1="70" y1="130" x2="160" y2="90" stroke="#0d9488" strokeWidth="2" strokeDasharray="4 2" />
      <line x1="160" y1="90" x2="250" y2="40" stroke="#0d9488" strokeWidth="2" strokeDasharray="4 2" />
      <circle cx="160" cy="90" r="4" fill="#0d9488" />

      {/* Pontértékek feliratai */}
      <text x="160" y="76" fill="#1d4ed8" fontSize="10" fontWeight="black" textAnchor="middle">
        Antal: 183 ezer Ft (A)
      </text>
      <text x="160" y="106" fill="#0f766e" fontSize="10" fontWeight="bold" textAnchor="middle">
        Benő: 180 ezer Ft (G)
      </text>

      {/* Bal oldali skálaértékek */}
      <text x="38" y="133" fill="#64748b" fontSize="9" textAnchor="end">150k</text>
      <text x="38" y="43" fill="#64748b" fontSize="9" textAnchor="end">216k</text>

      {/* Tanulság badge */}
      <rect x="75" y="5" width="170" height="22" rx="6" fill="#eff6ff" className="dark:fill-slate-800" stroke="#bfdbfe" strokeWidth="1" />
      <text x="160" y="19" fill="#1e40af" className="dark:fill-blue-300" fontSize="10" fontWeight="black" textAnchor="middle">
        A = 183 &gt; G = 180 (Antal nyert!)
      </text>
    </svg>
  );
};

