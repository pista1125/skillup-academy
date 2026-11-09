import React from 'react';

interface FigureProps {
  size?: number;
  className?: string;
}

/**
 * 1. Ábra: Parabola nyújtása és összenyomása (soványabb vs. kövérebb)
 * f(x) = x² (normál) vs g(x) = 2x² (soványabb) vs h(x) = 0.5x² (kövérebb)
 */
export const ParabolaStretchSvg: React.FC<FigureProps> = ({ size = 280, className = '' }) => {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <svg
        viewBox="-140 -120 280 230"
        width={size}
        height={(size * 230) / 280}
        className="overflow-visible select-none max-w-full drop-shadow-sm"
      >
        <defs>
          <marker id="pss-arrow" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1 L 10 5 L 0 9 z" fill="#64748b" />
          </marker>
        </defs>

        {/* Háttér rács */}
        {[-100, -50, 50, 100].map((coord) => (
          <React.Fragment key={`grid-${coord}`}>
            <line x1={coord} y1="-110" x2={coord} y2="90" stroke="#94a3b8" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.3" />
            <line x1="-130" y1={coord} x2={130} y2={coord} stroke="#94a3b8" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.3" />
          </React.Fragment>
        ))}

        {/* Tengelyek */}
        <line x1="-130" y1="50" x2="130" y2="50" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#pss-arrow)" />
        <line x1="0" y1="90" x2="0" y2="-110" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#pss-arrow)" />
        <text x="122" y="65" fill="#64748b" fontSize="11" fontWeight="bold">x</text>
        <text x="-16" y="-98" fill="#64748b" fontSize="11" fontWeight="bold">y</text>

        {/* h(x) = 0.5x² (Kövérebb, zöld) */}
        {/* x=100 => 0.5*(2)²=2 egység = 50px fel => y=0 */}
        <path d="M -110 -25 Q 0 50 110 -25" fill="none" stroke="#10b981" strokeWidth="2.5" />
        <text x="75" y="-15" fill="#059669" fontSize="11" fontWeight="bold">0,5x² („kövérebb”)</text>

        {/* f(x) = x² (Normál, szürke szaggatott) */}
        <path d="M -75 -62 Q 0 50 75 -62" fill="none" stroke="#64748b" strokeWidth="2" strokeDasharray="4 4" />
        <text x="-95" y="-50" fill="#64748b" fontSize="10" fontWeight="bold">x² (normál)</text>

        {/* g(x) = 2x² (Soványabb, kék/lila) */}
        <path d="M -50 -75 Q 0 50 50 -75" fill="none" stroke="#6366f1" strokeWidth="2.5" />
        <text x="15" y="-85" fill="#4f46e5" fontSize="11" fontWeight="bold">2x² („soványabb”)</text>

        {/* Origó csúcspont */}
        <circle cx="0" cy="50" r="4" fill="#0f172a" />
        <text x="-16" y="66" fill="#0f172a" fontSize="10" fontWeight="bold">T(0; 0)</text>
      </svg>
      <div className="mt-2 text-center text-xs text-slate-600 dark:text-slate-400">
        <span className="font-bold text-indigo-600">|a| &gt; 1:</span> nyújtás (soványabb, meredekebb), <span className="font-bold text-emerald-600">|a| &lt; 1:</span> zsugorítás (kövérebb, laposabb).
      </div>
    </div>
  );
};

/**
 * 2. Ábra: Tükrözés az x-tengelyre (előjel szerepe)
 * f(x) = x² (felfelé nyíló, minimum) vs g(x) = -x² (lefelé nyíló, maximum)
 */
export const ParabolaReflectionSvg: React.FC<FigureProps> = ({ size = 280, className = '' }) => {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <svg
        viewBox="-140 -120 280 240"
        width={size}
        height={(size * 240) / 280}
        className="overflow-visible select-none max-w-full drop-shadow-sm"
      >
        <defs>
          <marker id="prs-arrow" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1 L 10 5 L 0 9 z" fill="#64748b" />
          </marker>
        </defs>

        {/* Tengelyek */}
        <line x1="-130" y1="0" x2="130" y2="0" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#prs-arrow)" />
        <line x1="0" y1="110" x2="0" y2="-110" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#prs-arrow)" />
        <text x="122" y="15" fill="#64748b" fontSize="11" fontWeight="bold">x</text>
        <text x="-16" y="-98" fill="#64748b" fontSize="11" fontWeight="bold">y</text>

        {/* f(x) = x² (Felfelé nyíló, kék) */}
        <path d="M -75 -90 Q 0 0 75 -90" fill="none" stroke="#0284c7" strokeWidth="2.5" />
        <text x="45" y="-70" fill="#0284c7" fontSize="11" fontWeight="bold">f(x) = x²</text>
        <text x="45" y="-55" fill="#0284c7" fontSize="9">Minimum: 0</text>

        {/* g(x) = -x² (Lefelé nyíló, piros/rózsaszín) */}
        <path d="M -75 90 Q 0 0 75 90" fill="none" stroke="#e11d48" strokeWidth="2.5" />
        <text x="45" y="70" fill="#e11d48" fontSize="11" fontWeight="bold">g(x) = -x²</text>
        <text x="45" y="85" fill="#e11d48" fontSize="9">Maximum: 0</text>

        {/* Tükrözési nyilak */}
        <path d="M 40 -35 L 40 35" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 3" />
        <path d="M -40 -35 L -40 35" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 3" />

        {/* Origó */}
        <circle cx="0" cy="0" r="4.5" fill="#0f172a" />
        <text x="-25" y="-6" fill="#0f172a" fontSize="10" fontWeight="bold">T(0; 0)</text>
      </svg>
      <div className="mt-2 text-center text-xs text-slate-600 dark:text-slate-400">
        <span className="font-bold text-sky-600">a &gt; 0:</span> felfelé nyíló (konvex, minimum), <span className="font-bold text-rose-600">a &lt; 0:</span> lefelé nyíló (konkáv, maximum).
      </div>
    </div>
  );
};

/**
 * 3. Ábra: Abszolútérték-függvény nyújtása és tükrözése
 * |x| vs 2|x| vs -0.5|x|
 */
export const AbsFunctionStretchSvg: React.FC<FigureProps> = ({ size = 280, className = '' }) => {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <svg
        viewBox="-130 -110 260 220"
        width={size}
        height={(size * 220) / 260}
        className="overflow-visible select-none max-w-full drop-shadow-sm"
      >
        <defs>
          <marker id="ass-arrow" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1 L 10 5 L 0 9 z" fill="#64748b" />
          </marker>
        </defs>

        {/* Tengelyek */}
        <line x1="-120" y1="0" x2="120" y2="0" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#ass-arrow)" />
        <line x1="0" y1="100" x2="0" y2="-100" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#ass-arrow)" />
        <text x="114" y="15" fill="#64748b" fontSize="11" fontWeight="bold">x</text>
        <text x="-16" y="-88" fill="#64748b" fontSize="11" fontWeight="bold">y</text>

        {/* f(x) = |x| (Normál) */}
        <path d="M -80 -80 L 0 0 L 80 -80" fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3 3" />
        <text x="-95" y="-65" fill="#64748b" fontSize="10">|x|</text>

        {/* g(x) = 2|x| (Meredekebb V) */}
        <path d="M -45 -90 L 0 0 L 45 -90" fill="none" stroke="#7c3aed" strokeWidth="2.5" />
        <text x="25" y="-85" fill="#7c3aed" fontSize="11" fontWeight="bold">2|x|</text>

        {/* h(x) = -0.5|x| (Lefelé néző, lapos V) */}
        <path d="M -100 50 L 0 0 L 100 50" fill="none" stroke="#ea580c" strokeWidth="2.5" />
        <text x="45" y="45" fill="#ea580c" fontSize="11" fontWeight="bold">-0,5|x|</text>

        <circle cx="0" cy="0" r="4" fill="#0f172a" />
      </svg>
      <div className="mt-2 text-center text-xs text-slate-600 dark:text-slate-400">
        <span className="font-bold text-purple-600">2|x|:</span> kétszeres meredekség. <span className="font-bold text-orange-600">-0,5|x|:</span> lefelé néz és feleolyan meredek.
      </div>
    </div>
  );
};

/**
 * 4. Ábra: Parabola geometriai definíciója (fókusz és vezéregyenes)
 */
export const ParabolaFocusDirectrixSvg: React.FC<FigureProps> = ({ size = 280, className = '' }) => {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <svg
        viewBox="-130 -110 260 210"
        width={size}
        height={(size * 210) / 260}
        className="overflow-visible select-none max-w-full drop-shadow-sm"
      >
        <defs>
          <marker id="pfd-arrow" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1 L 10 5 L 0 9 z" fill="#64748b" />
          </marker>
        </defs>

        {/* Vezéregyenes (v) */}
        <line x1="-120" y1="50" x2="120" y2="50" stroke="#dc2626" strokeWidth="2" strokeDasharray="4 4" />
        <text x="80" y="65" fill="#dc2626" fontSize="10" fontWeight="bold">vezéregyenes (v)</text>

        {/* Parabola ív */}
        <path d="M -80 -80 Q 0 40 80 -80" fill="none" stroke="#2563eb" strokeWidth="2.5" />

        {/* Fókuszpont (F) */}
        <circle cx="0" cy="10" r="4.5" fill="#16a34a" />
        <text x="8" y="14" fill="#16a34a" fontSize="11" fontWeight="black">F (fókusz)</text>

        {/* Parabola egy P pontja */}
        <circle cx="50" cy="-25" r="4" fill="#2563eb" />
        <text x="56" y="-28" fill="#2563eb" fontSize="11" fontWeight="bold">P</text>

        {/* Távolságok d(P, F) és d(P, v) */}
        <line x1="50" y1="-25" x2="0" y2="10" stroke="#059669" strokeWidth="1.5" strokeDasharray="2 2" />
        <text x="18" y="-12" fill="#059669" fontSize="10" fontWeight="bold">d₁</text>

        <line x1="50" y1="-25" x2="50" y2="50" stroke="#dc2626" strokeWidth="1.5" strokeDasharray="2 2" />
        <circle cx="50" cy="50" r="3" fill="#dc2626" />
        <text x="54" y="18" fill="#dc2626" fontSize="10" fontWeight="bold">d₂</text>

        {/* d1 = d2 egyenlőség felirat */}
        <rect x="-105" y="-95" width="85" height="24" rx="6" fill="#f8fafc" stroke="#cbd5e1" />
        <text x="-62" y="-79" textAnchor="middle" fill="#0f172a" fontSize="10" fontWeight="black">d₁ = d₂</text>
      </svg>
      <div className="mt-2 text-center text-xs text-slate-600 dark:text-slate-400">
        <span className="font-bold text-blue-600">Parabola definíciója:</span> Minden $P$ pontra a fókusztól vett távolság ($d_1$) egyenlő a vezéregyenestől vett távolsággal ($d_2$).
      </div>
    </div>
  );
};

