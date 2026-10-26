import React from 'react';

interface FigureProps {
  size?: number;
  className?: string;
}

/**
 * 1. Tizedestört Alakok és Számhalmazok Osztályozási Fája
 */
export const DecimalsClassificationTreeSvg: React.FC<FigureProps> = ({
  size,
  className = ''
}) => {
  return (
    <div className={`flex flex-col items-center justify-center w-full ${className}`}>
      <svg
        viewBox="0 0 580 365"
        style={size ? { width: size, height: (size * 365) / 580 } : { width: '100%', maxWidth: 580, height: 'auto' }}
        className="overflow-visible select-none drop-shadow-xs w-full"
      >
        <defs>
          <filter id="treeGlow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="2" stdDeviation="2.5" floodColor="#000" floodOpacity="0.12" />
          </filter>
          <linearGradient id="gradR" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#1d4ed8" />
          </linearGradient>
          <linearGradient id="gradQ" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#0891b2" />
          </linearGradient>
          <linearGradient id="gradQStar" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>
          <linearGradient id="gradTerm" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
          <linearGradient id="gradPer" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#6d28d9" />
          </linearGradient>
        </defs>

        {/* Gyökér: Valós számok ℝ */}
        <rect x="185" y="12" width="210" height="48" rx="12" fill="url(#gradR)" filter="url(#treeGlow)" />
        <text x="290" y="34" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="15">
          Valós számok (ℝ)
        </text>
        <text x="290" y="50" textAnchor="middle" fill="#dbeafe" fontSize="11" fontWeight="500">
          A számegyenes összes pontja
        </text>

        {/* Összekötő vonalak ℝ -> ℚ és ℚ* */}
        <path d="M 235 60 L 150 96" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M 345 60 L 430 96" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" />

        {/* Bal ág: Racionális számok ℚ */}
        <rect x="30" y="96" width="240" height="58" rx="12" fill="url(#gradQ)" filter="url(#treeGlow)" />
        <text x="150" y="118" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="14">
          Racionális számok (ℚ)
        </text>
        <text x="150" y="133" textAnchor="middle" fill="#cffafe" fontSize="11">
          Felírható: a/b (a, b ∈ ℤ, b ≠ 0)
        </text>
        <text x="150" y="146" textAnchor="middle" fill="#e0f2fe" fontSize="10.5" fontStyle="italic">
          Egész vagy periodikus tizedestört
        </text>

        {/* Jobb ág: Irracionális számok ℚ* */}
        <rect x="310" y="96" width="240" height="58" rx="12" fill="url(#gradQStar)" filter="url(#treeGlow)" />
        <text x="430" y="118" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="14">
          Irracionális számok (ℚ*)
        </text>
        <text x="430" y="133" textAnchor="middle" fill="#fef3c7" fontSize="11">
          NEM írható fel két egész hányadosaként
        </text>
        <text x="430" y="146" textAnchor="middle" fill="#fffbeb" fontSize="10.5" fontStyle="italic">
          Végtelen nem szakaszos tizedestört
        </text>

        {/* Összekötő vonalak ℚ -> Véges és Szakaszos */}
        <path d="M 110 154 L 82 192" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
        <path d="M 190 154 L 232 192" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />

        {/* Al-ág 1: Véges tizedestört */}
        <rect x="15" y="192" width="135" height="74" rx="10" fill="url(#gradTerm)" filter="url(#treeGlow)" />
        <text x="82.5" y="212" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="12">
          Véges tizedestört
        </text>
        <text x="82.5" y="228" textAnchor="middle" fill="#d1fae5" fontSize="10" fontWeight="600">
          Csak 2 és/vagy 5 prím!
        </text>
        <text x="82.5" y="244" textAnchor="middle" fill="#ffffff" fontSize="11" fontFamily="monospace" fontWeight="bold">
          3/8 = 0,375
        </text>
        <text x="82.5" y="258" textAnchor="middle" fill="#ffffff" fontSize="11" fontFamily="monospace" fontWeight="bold">
          7/20 = 0,35
        </text>

        {/* Al-ág 2: Végtelen szakaszos tizedestört */}
        <rect x="160" y="192" width="145" height="74" rx="10" fill="url(#gradPer)" filter="url(#treeGlow)" />
        <text x="232.5" y="212" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="12">
          Végtelen szakaszos
        </text>
        <text x="232.5" y="228" textAnchor="middle" fill="#ede9fe" fontSize="10" fontWeight="600">
          Más prímosztó is van!
        </text>
        <text x="232.5" y="244" textAnchor="middle" fill="#ffffff" fontSize="11" fontFamily="monospace" fontWeight="bold">
          1/3 = 0,(3)
        </text>
        <text x="232.5" y="258" textAnchor="middle" fill="#ffffff" fontSize="11" fontFamily="monospace" fontWeight="bold">
          5/6 = 0,8(3)
        </text>

        {/* Összekötő vonal ℚ* -> Nem szakaszos */}
        <path d="M 430 154 L 430 192" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />

        {/* Al-ág 3: Végtelen nem szakaszos példák */}
        <rect x="315" y="192" width="250" height="74" rx="10" fill="#f8fafc" stroke="#f59e0b" strokeWidth="2" filter="url(#treeGlow)" />
        <text x="440" y="212" textAnchor="middle" fill="#b45309" fontWeight="bold" fontSize="12">
          Végtelen nem szakaszos
        </text>
        <text x="440" y="228" textAnchor="middle" fill="#475569" fontSize="10" fontWeight="600">
          Nincs ismétlődő periódus!
        </text>
        <text x="440" y="244" textAnchor="middle" fill="#0f172a" fontSize="10.5" fontFamily="monospace" fontWeight="bold">
          √2 ≈ 1,4142… , π ≈ 3,1415…
        </text>
        <text x="440" y="258" textAnchor="middle" fill="#0f172a" fontSize="10.5" fontFamily="monospace" fontWeight="bold">
          0,1010010001…
        </text>

        {/* Alsó megjegyzés lábléc: Kulcstétel */}
        <rect x="15" y="286" width="550" height="58" rx="12" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
        <text x="290" y="310" textAnchor="middle" fill="#334155" fontSize="12" fontWeight="bold">
          Kulcstétel: Egy valós szám pontosan akkor racionális, ha tizedestört alakja
        </text>
        <text x="290" y="330" textAnchor="middle" fill="#2563eb" fontSize="13.5" fontWeight="black" letterSpacing="0.5">
          VÉGES vagy VÉGTELEN SZAKASZOS!
        </text>
      </svg>
    </div>
  );
};

/**
 * 2. √2 Geometriai Szerkesztése a Számegyenesen (Pithagorasz-tétel és Körzőív)
 */
export const Sqrt2ConstructionSvg: React.FC<FigureProps> = ({
  size,
  className = ''
}) => {
  return (
    <div className={`flex flex-col items-center justify-center w-full ${className}`}>
      <svg
        viewBox="0 0 460 250"
        style={size ? { width: size, height: (size * 250) / 460 } : { width: '100%', maxWidth: 460, height: 'auto' }}
        className="overflow-visible select-none drop-shadow-xs w-full"
      >
      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#334155" />
        </marker>
      </defs>

      {/* Rács háttér finom vonalakkal */}
      <g stroke="#e2e8f0" strokeWidth="1" strokeDasharray="3 3">
        <line x1="50" y1="40" x2="420" y2="40" />
        <line x1="50" y1="110" x2="420" y2="110" />
        <line x1="50" y1="180" x2="420" y2="180" />
        <line x1="100" y1="20" x2="100" y2="200" />
        <line x1="200" y1="20" x2="200" y2="200" />
        <line x1="300" y1="20" x2="300" y2="200" />
        <line x1="400" y1="20" x2="400" y2="200" />
      </g>

      {/* Fő számegyenes x-tengely */}
      <line x1="50" y1="180" x2="430" y2="180" stroke="#1e293b" strokeWidth="2.5" markerEnd="url(#arrow)" />

      {/* Egység jelölők a számegyenesen (0 = 100px, 1 = 200px, 2 = 300px) -> 1 egység = 100px */}
      {/* 0 pont */}
      <line x1="100" y1="174" x2="100" y2="186" stroke="#1e293b" strokeWidth="2" />
      <text x="100" y="202" textAnchor="middle" fill="#1e293b" fontWeight="bold" fontSize="13">0</text>

      {/* 1 pont */}
      <line x1="200" y1="174" x2="200" y2="186" stroke="#1e293b" strokeWidth="2" />
      <text x="200" y="202" textAnchor="middle" fill="#1e293b" fontWeight="bold" fontSize="13">1</text>

      {/* 2 pont */}
      <line x1="300" y1="174" x2="300" y2="186" stroke="#1e293b" strokeWidth="2" />
      <text x="300" y="202" textAnchor="middle" fill="#1e293b" fontWeight="bold" fontSize="13">2</text>

      {/* √2 pont a számegyenesen: 100 + 100 * 1.4142 = 241.42px */}
      <line x1="241.42" y1="170" x2="241.42" y2="190" stroke="#e11d48" strokeWidth="3" />
      <circle cx="241.42" cy="180" r="4.5" fill="#e11d48" />
      <text x="241.42" y="210" textAnchor="middle" fill="#e11d48" fontWeight="black" fontSize="13">√2</text>
      <text x="241.42" y="226" textAnchor="middle" fill="#e11d48" fontSize="10">≈ 1,4142</text>

      {/* Derékszögű háromszög az egységnégyzet felett: csúcsok: (100, 180), (200, 180), (200, 80) */}
      <polygon points="100,180 200,180 200,80" fill="#e0e7ff" opacity="0.6" stroke="#4f46e5" strokeWidth="2" />

      {/* Derékszög jelölése magyar szabvány szerint (negyedkörív belső ponttal) */}
      <path d="M 182 180 A 18 18 0 0 1 200 162" fill="none" stroke="#4f46e5" strokeWidth="1.8" />
      <circle cx="193.5" cy="173.5" r="2" fill="#4f46e5" />

      {/* Befogók címkéi */}
      <text x="150" y="174" textAnchor="middle" fill="#4338ca" fontWeight="bold" fontSize="12">1 egység</text>
      <text x="216" y="135" textAnchor="start" fill="#4338ca" fontWeight="bold" fontSize="12">1 egység</text>

      {/* Átfogó (hipotenusza): d = √2 */}
      <line x1="100" y1="180" x2="200" y2="80" stroke="#db2777" strokeWidth="3" />
      <text x="140" y="120" textAnchor="middle" fill="#db2777" fontWeight="black" fontSize="13" transform="rotate(-45 140 120)">
        d = √(1² + 1²) = √2
      </text>

      {/* Körzőív leforgatása: középpont: (100, 180), sugár: 141.42px.
          Kezdőpont: (200, 80) -> Szög: -45 fok.
          Végpont: (241.42, 180) -> Szög: 0 fok.
          SVG Arc: M 200 80 A 141.42 141.42 0 0 1 241.42 180 */}
      <path
        d="M 200 80 A 141.42 141.42 0 0 1 241.42 180"
        fill="none"
        stroke="#e11d48"
        strokeWidth="2"
        strokeDasharray="4 4"
      />

      {/* Körző ikon vagy felirat a körzőívnél */}
      <text x="235" y="115" fill="#be123c" fontSize="10" fontWeight="bold">
        Körzővel leforgatva
      </text>

      {/* Magyarázó kártya felül */}
      <rect x="50" y="10" width="220" height="28" rx="6" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" />
      <text x="160" y="28" textAnchor="middle" fill="#0f172a" fontSize="10" fontWeight="bold">
        Pithagorasz-tétel: 1² + 1² = (√2)² = 2
      </text>
    </svg>
    </div>
  );
};

/**
 * 3. A Maradékok Ciklusa és a Skatulya-elv (Miért szakaszos az 1/7 = 0,(142857)?)
 */
export const PeriodicRemainderCycleSvg: React.FC<FigureProps> = ({
  size,
  className = ''
}) => {
  // 6 csúcs egy kör mentén: 1 -> 3 -> 2 -> 6 -> 4 -> 5 -> 1
  const steps = [
    { remainder: '1', quotient: '1', angle: -90 },
    { remainder: '3', quotient: '4', angle: -30 },
    { remainder: '2', quotient: '2', angle: 30 },
    { remainder: '6', quotient: '8', angle: 90 },
    { remainder: '4', quotient: '5', angle: 150 },
    { remainder: '5', quotient: '7', angle: 210 }
  ];

  const cx = 150;
  const cy = 135;
  const r = 75;

  return (
    <div className={`flex flex-col items-center justify-center w-full ${className}`}>
      <svg
        viewBox="0 0 460 270"
        style={size ? { width: size, height: (size * 270) / 460 } : { width: '100%', maxWidth: 460, height: 'auto' }}
        className="overflow-visible select-none drop-shadow-xs w-full"
      >
      <defs>
        <marker id="cycleArrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#8b5cf6" />
        </marker>
      </defs>

      {/* Cím */}
      <text x="230" y="22" textAnchor="middle" fill="#1e293b" fontWeight="bold" fontSize="13">
        A Maradékok Ciklusa: 1 : 7 = 0,(142857)
      </text>

      {/* Kör alakú ciklus diagram */}
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#e2e8f0" strokeWidth="2" strokeDasharray="4 4" />

      {/* Csomópontok és nyilak */}
      {steps.map((st, i) => {
        const next = steps[(i + 1) % steps.length];
        const rad1 = (st.angle * Math.PI) / 180;
        const rad2 = (next.angle * Math.PI) / 180;

        const x1 = cx + r * Math.cos(rad1);
        const y1 = cy + r * Math.sin(rad1);
        const x2 = cx + r * Math.cos(rad2);
        const y2 = cy + r * Math.sin(rad2);

        // Nyíl a kör mentén (enyhén behajlítva)
        return (
          <g key={i}>
            <line
              x1={x1 + 10 * Math.cos(rad1 + Math.PI / 2)}
              y1={y1 + 10 * Math.sin(rad1 + Math.PI / 2)}
              x2={x2 - 10 * Math.cos(rad2 - Math.PI / 2)}
              y2={y2 - 10 * Math.sin(rad2 - Math.PI / 2)}
              stroke="#8b5cf6"
              strokeWidth="2"
              markerEnd="url(#cycleArrow)"
            />
          </g>
        );
      })}

      {/* Csomópont körök */}
      {steps.map((st, i) => {
        const rad = (st.angle * Math.PI) / 180;
        const x = cx + r * Math.cos(rad);
        const y = cy + r * Math.sin(rad);

        return (
          <g key={`node-${i}`}>
            <circle cx={x} cy={y} r="18" fill="#7c3aed" filter="drop-shadow(0 2px 4px rgba(124,58,237,0.3))" />
            <text x={x} y={y + 4} textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="12">
              {st.remainder}
            </text>
            {/* Hányados számjegy kívül */}
            <text
              x={cx + (r + 30) * Math.cos(rad)}
              y={cy + (r + 30) * Math.sin(rad) + 4}
              textAnchor="middle"
              fill="#4338ca"
              fontWeight="bold"
              fontSize="11"
            >
              tizedes: {st.quotient}
            </text>
          </g>
        );
      })}

      {/* Ciklus közepe felirat */}
      <circle cx={cx} cy={cy} r="32" fill="#f5f3ff" stroke="#ddd6fe" strokeWidth="1.5" />
      <text x={cx} y={cy - 4} textAnchor="middle" fill="#6d28d9" fontWeight="bold" fontSize="10">
        6 lépés
      </text>
      <text x={cx} y={cy + 10} textAnchor="middle" fill="#6d28d9" fontSize="9">
        után ismétlődik!
      </text>

      {/* Jobb oldali magyarázó doboz */}
      <rect x="275" y="55" width="170" height="180" rx="10" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />
      <text x="360" y="78" textAnchor="middle" fill="#0f172a" fontWeight="bold" fontSize="12">
        A Skatulya-elv:
      </text>
      <foreignObject x="285" y="85" width="150" height="145">
        <div className="text-[11px] text-slate-600 leading-snug space-y-1">
          <p>
            Ha egy egész számot elosztunk <strong className="text-purple-600">b</strong>-vel, a maradékok csak{' '}
            <strong className="text-slate-900">0, 1, 2, ..., b − 1</strong> lehetnek.
          </p>
          <p>
            Ez összesen legfeljebb <strong className="text-indigo-600">b − 1</strong> különböző nem nulla maradék!
          </p>
          <p className="font-semibold text-purple-700">
            Ezért az osztás legkésőbb b − 1 lépés után törvényszerűen ismétlődik!
          </p>
        </div>
      </foreignObject>
    </svg>
    </div>
  );
};
