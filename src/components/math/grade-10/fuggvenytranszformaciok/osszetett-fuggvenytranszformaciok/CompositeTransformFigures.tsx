import React from 'react';

interface FigureProps {
  size?: number;
  className?: string;
}

/**
 * 1. Ábra: Lépésről lépésre végrehajtott összetett transzformáció:
 * x² ⟶ (x - 2)² ⟶ -2(x - 2)² ⟶ -2(x - 2)² + 3
 */
export const CanonicalParabolaSvg: React.FC<FigureProps> = ({ size = 300, className = '' }) => {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <svg
        viewBox="-130 -110 270 230"
        width={size}
        height={(size * 230) / 270}
        className="overflow-visible select-none max-w-full drop-shadow-sm"
      >
        <defs>
          <marker id="cps-arrow" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1 L 10 5 L 0 9 z" fill="#64748b" />
          </marker>
        </defs>

        {/* Tengelyek */}
        <line x1="-120" y1="20" x2="130" y2="20" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#cps-arrow)" />
        <line x1="0" y1="100" x2="0" y2="-100" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#cps-arrow)" />
        <text x="122" y="34" fill="#64748b" fontSize="11" fontWeight="bold">x</text>
        <text x="-16" y="-88" fill="#64748b" fontSize="11" fontWeight="bold">y</text>

        {/* 1. Alap: x² (Szürke szaggatott) */}
        <path d="M -50 -40 Q 0 20 50 -40" fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3 3" />
        <text x="-58" y="-30" fill="#94a3b8" fontSize="9">x²</text>

        {/* 2. Eltolt: (x - 2)² (Narancs pontozott, u = +35 px) */}
        <path d="M -15 -40 Q 35 20 85 -40" fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="2 2" />
        <text x="75" y="-35" fill="#d97706" fontSize="9">(x - 2)²</text>

        {/* 3. Tükrözött & nyújtott: -2(x - 2)² (Kék pontozott) */}
        <path d="M 10 80 Q 35 20 60 80" fill="none" stroke="#0284c7" strokeWidth="1.5" strokeDasharray="2 2" />

        {/* 4. Végleges: -2(x - 2)² + 3 (Lila vastag görbe, v = -35 px felfelé) */}
        <path d="M 10 45 Q 35 -15 60 45" fill="none" stroke="#8b5cf6" strokeWidth="2.5" />
        <circle cx="35" cy="-15" r="4.5" fill="#8b5cf6" />
        <text x="42" y="-20" fill="#7c3aed" fontSize="11" fontWeight="black">T(2; 3)</text>
        <text x="50" y="55" fill="#7c3aed" fontSize="11" fontWeight="bold">-2(x - 2)² + 3</text>
      </svg>
      <div className="mt-2 text-center text-xs text-slate-600 dark:text-slate-400">
        <span className="font-bold text-violet-600">Sorrend:</span> 1. Jobbra 2 $\to$ 2. Tükrözés & 2-szeres nyújtás $\to$ 3. Fel 3. Csúcspont: <span className="font-bold">T(2; 3)</span>.
      </div>
    </div>
  );
};

/**
 * 2. Ábra: Összetett abszolútérték-függvény
 * f(x) = -2|x + 2| + 4 (töréspont V(-2; 4), zérushelyek: x = -4 és x = 0)
 */
export const CompositeAbsSvg: React.FC<FigureProps> = ({ size = 280, className = '' }) => {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <svg
        viewBox="-130 -100 260 200"
        width={size}
        height={(size * 200) / 260}
        className="overflow-visible select-none max-w-full drop-shadow-sm"
      >
        <defs>
          <marker id="cas-arrow" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1 L 10 5 L 0 9 z" fill="#64748b" />
          </marker>
        </defs>

        {/* Tengelyek */}
        <line x1="-120" y1="20" x2="120" y2="20" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#cas-arrow)" />
        <line x1="0" y1="80" x2="0" y2="-90" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#cas-arrow)" />
        <text x="114" y="34" fill="#64748b" fontSize="11" fontWeight="bold">x</text>
        <text x="-16" y="-78" fill="#64748b" fontSize="11" fontWeight="bold">y</text>

        {/* Grafikon: V(-35; -40), bal zérushely: (-70; 20), jobb zérushely origó: (0; 20) */}
        <path d="M -85 55 L -70 20 L -35 -40 L 0 20 L 15 55" fill="none" stroke="#e11d48" strokeWidth="2.5" />

        {/* Töréspont V(-2; 4) */}
        <circle cx="-35" cy="-40" r="4.5" fill="#e11d48" />
        <text x="-35" y="-50" textAnchor="middle" fill="#e11d48" fontSize="11" fontWeight="black">V(-2; 4)</text>

        {/* Zérushelyek pontjai */}
        <circle cx="-70" cy="20" r="3.5" fill="#0f172a" />
        <text x="-75" y="12" fill="#0f172a" fontSize="10" fontWeight="bold">x₁ = -4</text>

        <circle cx="0" cy="20" r="3.5" fill="#0f172a" />
        <text x="6" y="14" fill="#0f172a" fontSize="10" fontWeight="bold">x₂ = 0</text>

        <text x="-115" y="-10" fill="#e11d48" fontSize="11" fontWeight="bold">-2|x + 2| + 4</text>
      </svg>
      <div className="mt-2 text-center text-xs text-slate-600 dark:text-slate-400">
        <span className="font-bold text-rose-600">Összetett abszolútérték:</span> Töréspont <span className="font-bold">V(-2; 4)</span>, lefelé nyíló, zérushelyei $x = -4$ és $x = 0$.
      </div>
    </div>
  );
};

/**
 * 3. Ábra: Külső abszolútérték felhajtás: |x² - 4|
 * Az x-tengely alá süllyedő negatív ív felfelé tükröződik
 */
export const AbsOutsideSvg: React.FC<FigureProps> = ({ size = 280, className = '' }) => {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <svg
        viewBox="-130 -110 260 210"
        width={size}
        height={(size * 210) / 260}
        className="overflow-visible select-none max-w-full drop-shadow-sm"
      >
        <defs>
          <marker id="aos-arrow" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1 L 10 5 L 0 9 z" fill="#64748b" />
          </marker>
        </defs>

        {/* Tengelyek */}
        <line x1="-120" y1="20" x2="120" y2="20" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#aos-arrow)" />
        <line x1="0" y1="80" x2="0" y2="-90" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#aos-arrow)" />
        <text x="114" y="34" fill="#64748b" fontSize="11" fontWeight="bold">x</text>
        <text x="-16" y="-78" fill="#64748b" fontSize="11" fontWeight="bold">y</text>

        {/* Eredeti x² - 4 negatív része (Szürke szaggatott lent) */}
        <path d="M -40 20 Q 0 80 40 20" fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3 3" />
        <text x="8" y="75" fill="#94a3b8" fontSize="9">(eredeti ív -4-nél)</text>

        {/* Felhajtott végleges görbe: |x² - 4| (Kék vastag) */}
        {/* Bal oldali pozitív szár */}
        <path d="M -70 -70 Q -50 -10 -40 20" fill="none" stroke="#2563eb" strokeWidth="2.5" />
        {/* Felhajtott hurok a -4-ből +4-be */}
        <path d="M -40 20 Q 0 -40 40 20" fill="none" stroke="#2563eb" strokeWidth="2.5" />
        {/* Jobb oldali pozitív szár */}
        <path d="M 40 20 Q 50 -10 70 -70" fill="none" stroke="#2563eb" strokeWidth="2.5" />

        {/* Felhajtott csúcs: (0; 4) */}
        <circle cx="0" cy="-40" r="4" fill="#2563eb" />
        <text x="8" y="-40" fill="#2563eb" fontSize="10" fontWeight="bold">(0; 4)</text>

        {/* Zérushelyek: -2 és +2 */}
        <circle cx="-40" cy="20" r="3.5" fill="#0f172a" />
        <circle cx="40" cy="20" r="3.5" fill="#0f172a" />
        <text x="-48" y="12" fill="#0f172a" fontSize="10" fontWeight="bold">-2</text>
        <text x="36" y="12" fill="#0f172a" fontSize="10" fontWeight="bold">+2</text>

        <text x="-115" y="-75" fill="#2563eb" fontSize="11" fontWeight="black">f(x) = |x² - 4|</text>
      </svg>
      <div className="mt-2 text-center text-xs text-slate-600 dark:text-slate-400">
        <span className="font-bold text-blue-600">|f(x)| hatása:</span> Az $x$-tengely alatti görbedarab felfelé tükröződik („W-szerű” forma alakul ki).
      </div>
    </div>
  );
};

/**
 * 4. Ábra: Pattogó labda parabolaív modellje (tankönyvből)
 */
export const BouncingBallModelSvg: React.FC<FigureProps> = ({ size = 280, className = '' }) => {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <svg
        viewBox="-20 -90 280 160"
        width={size}
        height={(size * 160) / 280}
        className="overflow-visible select-none max-w-full drop-shadow-sm"
      >
        <defs>
          <marker id="bbm-arrow" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1 L 10 5 L 0 9 z" fill="#64748b" />
          </marker>
        </defs>

        {/* Talaj (x-tengely) */}
        <line x1="-10" y1="40" x2="250" y2="40" stroke="#64748b" strokeWidth="2" markerEnd="url(#bbm-arrow)" />
        <line x1="0" y1="50" x2="0" y2="-75" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#bbm-arrow)" />
        <text x="240" y="55" fill="#64748b" fontSize="11" fontWeight="bold">x (m)</text>
        <text x="-16" y="-62" fill="#64748b" fontSize="11" fontWeight="bold">y (m)</text>

        {/* 1. pattanás: 0 m-től 80 m-ig, csúcs 40 m-nél, magasság 50 px */}
        <path d="M 0 40 Q 40 -40 80 40" fill="none" stroke="#f59e0b" strokeWidth="2.5" />
        <circle cx="40" cy="-20" r="4.5" fill="#ea580c" />
        <text x="40" y="-30" textAnchor="middle" fill="#ea580c" fontSize="10" fontWeight="bold">1. csúcs</text>

        {/* 2. pattanás: 80 m-től 140 m-ig, csúcs 110 m-nél */}
        <path d="M 80 40 Q 110 -10 140 40" fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3 3" />

        {/* Pattanási pontok */}
        <circle cx="0" cy="40" r="4" fill="#0f172a" />
        <circle cx="80" cy="40" r="4" fill="#0f172a" />
        <text x="70" y="55" fill="#0f172a" fontSize="10" fontWeight="bold">80 cm</text>
      </svg>
      <div className="mt-2 text-center text-xs text-slate-600 dark:text-slate-400">
        <span className="font-bold text-amber-600">Fizikai modell:</span> A pattogó labda két pattanás közötti íve egy lefelé nyíló parabola: h(x) = -a(x - d)² + h_max.
      </div>
    </div>
  );
};

