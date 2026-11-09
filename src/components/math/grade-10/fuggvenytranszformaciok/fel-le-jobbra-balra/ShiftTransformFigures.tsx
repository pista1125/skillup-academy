import React from 'react';

interface FigureProps {
  size?: number;
  className?: string;
}

/**
 * 1. Ábra: Vektoros eltolás a síkban
 * Szemlélteti a v(u, c) vektorral történő eltolást és a pontok (x, y) -> (x+u, y+c) vándorlását.
 */
export const GeneralShiftVectorSvg: React.FC<FigureProps> = ({ size = 280, className = '' }) => {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <svg
        viewBox="-140 -120 280 240"
        width={size}
        height={(size * 240) / 280}
        className="overflow-visible select-none max-w-full drop-shadow-sm"
      >
        <defs>
          <marker id="gsv-arrow" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1 L 10 5 L 0 9 z" fill="#64748b" />
          </marker>
          <marker id="gsv-vec-arrow" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1 L 10 5 L 0 9 z" fill="#8b5cf6" />
          </marker>
        </defs>

        {/* Háttér rács */}
        {[-100, -50, 50, 100].map((coord) => (
          <React.Fragment key={`grid-${coord}`}>
            <line x1={coord} y1="-110" x2={coord} y2="110" stroke="#94a3b8" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.3" />
            <line x1="-130" y1={coord} x2={130} y2={coord} stroke="#94a3b8" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.3" />
          </React.Fragment>
        ))}

        {/* Tengelyek */}
        <line x1="-130" y1="0" x2="130" y2="0" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#gsv-arrow)" />
        <line x1="0" y1="110" x2="0" y2="-110" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#gsv-arrow)" />
        <text x="122" y="16" fill="#64748b" fontSize="12" fontWeight="bold">x</text>
        <text x="-16" y="-98" fill="#64748b" fontSize="12" fontWeight="bold">y</text>

        {/* Eredeti görbe: f(x) (pl. parabola az origóban) */}
        <path
          d="M -70 -98 Q 0 40 70 -98"
          fill="none"
          stroke="#94a3b8"
          strokeWidth="2"
          strokeDasharray="4 4"
        />
        <text x="-75" y="-75" fill="#64748b" fontSize="11" fontWeight="bold">f(x)</text>

        {/* Eltolt görbe: g(x) = f(x - u) + c */}
        {/* u = 40 (jobbra), c = -50 (fel) */}
        <path
          d="M -30 -148 Q 40 -10 110 -148"
          fill="none"
          stroke="#0284c7"
          strokeWidth="2.5"
        />
        <text x="65" y="-120" fill="#0284c7" fontSize="12" fontWeight="bold">g(x) = f(x - u) + c</text>

        {/* Eltolásvektor v(u, c) az origóból a csúcspontba */}
        <line x1="0" y1="20" x2="40" y2="-30" stroke="#8b5cf6" strokeWidth="2.5" markerEnd="url(#gsv-vec-arrow)" />
        <text x="22" y="-4" fill="#8b5cf6" fontSize="12" fontWeight="black">v(u; c)</text>

        {/* Origó és új csúcspont */}
        <circle cx="0" cy="20" r="4" fill="#64748b" />
        <text x="-18" y="32" fill="#64748b" fontSize="10" fontWeight="bold">(0; 0)</text>

        <circle cx="40" cy="-30" r="4.5" fill="#0284c7" />
        <text x="46" y="-32" fill="#0284c7" fontSize="11" fontWeight="bold">T(u; c)</text>
      </svg>
      <div className="mt-2 text-center text-xs text-slate-600 dark:text-slate-400">
        <span className="font-bold text-violet-600 dark:text-violet-400">v(u; c) eltolásvektor:</span> Minden pont <span className="font-semibold text-slate-800 dark:text-slate-200">(x; y) ↦ (x + u; y + c)</span> helyre kerül.
      </div>
    </div>
  );
};

/**
 * 2. Ábra: Abszolútérték-függvény eltolása
 * f(x) = |x| vs g(x) = |x - 2| + 1
 */
export const AbsFunctionShiftSvg: React.FC<FigureProps> = ({ size = 280, className = '' }) => {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <svg
        viewBox="-130 -110 260 210"
        width={size}
        height={(size * 210) / 260}
        className="overflow-visible select-none max-w-full drop-shadow-sm"
      >
        <defs>
          <marker id="afs-arrow" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1 L 10 5 L 0 9 z" fill="#64748b" />
          </marker>
        </defs>

        {/* Tengelyek */}
        <line x1="-120" y1="40" x2="120" y2="40" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#afs-arrow)" />
        <line x1="0" y1="90" x2="0" y2="-100" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#afs-arrow)" />
        <text x="114" y="55" fill="#64748b" fontSize="11" fontWeight="bold">x</text>
        <text x="-16" y="-88" fill="#64748b" fontSize="11" fontWeight="bold">y</text>

        {/* f(x) = |x| */}
        <path d="M -90 -50 L 0 40 L 90 -50" fill="none" stroke="#94a3b8" strokeWidth="2" strokeDasharray="4 4" />
        <text x="-95" y="-38" fill="#64748b" fontSize="10" fontWeight="bold">f(x) = |x|</text>
        <circle cx="0" cy="40" r="3.5" fill="#94a3b8" />
        <text x="-15" y="54" fill="#64748b" fontSize="10">(0; 0)</text>

        {/* g(x) = |x - 2| + 1  (u = +40 px, c = -20 px => új töréspont: (40; 20)) */}
        <path d="M -40 -60 L 40 20 L 120 -60" fill="none" stroke="#8b5cf6" strokeWidth="2.5" />
        <circle cx="40" cy="20" r="4.5" fill="#8b5cf6" />
        <text x="46" y="24" fill="#8b5cf6" fontSize="11" fontWeight="black">V(2; 1)</text>
        <text x="50" y="-55" fill="#8b5cf6" fontSize="11" fontWeight="bold">g(x) = |x - 2| + 1</text>

        {/* Eltolási segédvonalak */}
        <line x1="0" y1="40" x2="40" y2="40" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 3" />
        <text x="12" y="34" fill="#d97706" fontSize="9" fontWeight="bold">+2 jobbra</text>
        <line x1="40" y1="40" x2="40" y2="20" stroke="#10b981" strokeWidth="1.5" strokeDasharray="3 3" />
        <text x="44" y="34" fill="#059669" fontSize="9" fontWeight="bold">+1 fel</text>
      </svg>
      <div className="mt-2 text-center text-xs text-slate-600 dark:text-slate-400">
        <span className="font-bold text-violet-600 dark:text-violet-400">V alakú grafikon:</span> A töréspont az origóból a <span className="font-semibold text-slate-800 dark:text-slate-200">V(2; 1)</span> pontba vándorolt.
      </div>
    </div>
  );
};

/**
 * 3. Ábra: Négyzetgyökfüggvény eltolása és értelmezési tartománya
 * f(x) = √x vs g(x) = √(x - 3) - 1
 */
export const SqrtFunctionShiftSvg: React.FC<FigureProps> = ({ size = 280, className = '' }) => {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <svg
        viewBox="-40 -90 280 180"
        width={size}
        height={(size * 180) / 280}
        className="overflow-visible select-none max-w-full drop-shadow-sm"
      >
        <defs>
          <marker id="sfs-arrow" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1 L 10 5 L 0 9 z" fill="#64748b" />
          </marker>
        </defs>

        {/* Tengelyek */}
        <line x1="-30" y1="40" x2="230" y2="40" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#sfs-arrow)" />
        <line x1="0" y1="80" x2="0" y2="-80" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#sfs-arrow)" />
        <text x="222" y="55" fill="#64748b" fontSize="11" fontWeight="bold">x</text>
        <text x="-16" y="-68" fill="#64748b" fontSize="11" fontWeight="bold">y</text>

        {/* f(x) = √x */}
        {/* Görbe pontjai: x=0 y=0, x=40 y=20, x=90 y=30, x=160 y=40 (SVG y invertált) */}
        <path
          d="M 0 40 Q 30 18 80 10 T 200 -20"
          fill="none"
          stroke="#94a3b8"
          strokeWidth="2"
          strokeDasharray="4 4"
        />
        <circle cx="0" cy="40" r="3.5" fill="#94a3b8" />
        <text x="80" y="-2" fill="#64748b" fontSize="10" fontWeight="bold">f(x) = √x</text>

        {/* g(x) = √(x - 3) - 1 => Kezdőpont K(3; -1) (SVG koordinátákban: x = 60, y = 60) */}
        <path
          d="M 60 60 Q 90 38 140 30 T 225 3"
          fill="none"
          stroke="#059669"
          strokeWidth="2.5"
        />
        <circle cx="60" cy="60" r="4.5" fill="#059669" />
        <text x="68" y="72" fill="#059669" fontSize="11" fontWeight="black">K(3; -1)</text>
        <text x="145" y="16" fill="#059669" fontSize="11" fontWeight="bold">g(x) = √(x - 3) - 1</text>

        {/* Értelmezési tartomány jelölés az x-tengelyen */}
        <line x1="60" y1="40" x2="220" y2="40" stroke="#059669" strokeWidth="3.5" strokeLinecap="round" opacity="0.6" />
        <circle cx="60" cy="40" r="3.5" fill="#059669" />
        <text x="62" y="32" fill="#059669" fontSize="9" fontWeight="bold">x ≥ 3</text>
      </svg>
      <div className="mt-2 text-center text-xs text-slate-600 dark:text-slate-400">
        <span className="font-bold text-emerald-600 dark:text-emerald-400">Gyökfüggvény:</span> Kezdőpontja <span className="font-semibold text-slate-800 dark:text-slate-200">K(3; -1)</span>, értelmezési tartománya <span className="font-semibold text-emerald-600">[3; ∞[</span>.
      </div>
    </div>
  );
};

/**
 * 4. Ábra: "Kívül vagy Belül?" – Transzformációk Összehasonlítása
 * Szemlélteti a különbséget f(x) + c (külső, függőleges) és f(x + c) (belső, vízszintes) között.
 */
export const InsideVsOutsideComparisonSvg: React.FC<FigureProps> = ({ size = 280, className = '' }) => {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <svg
        viewBox="-140 -100 280 200"
        width={size}
        height={(size * 200) / 280}
        className="overflow-visible select-none max-w-full drop-shadow-sm"
      >
        <defs>
          <marker id="ioc-arrow" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1 L 10 5 L 0 9 z" fill="#64748b" />
          </marker>
        </defs>

        {/* Tengelyek */}
        <line x1="-130" y1="10" x2="130" y2="10" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#ioc-arrow)" />
        <line x1="0" y1="90" x2="0" y2="-90" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#ioc-arrow)" />
        <text x="122" y="24" fill="#64748b" fontSize="11" fontWeight="bold">x</text>
        <text x="-16" y="-78" fill="#64748b" fontSize="11" fontWeight="bold">y</text>

        {/* Alapfüggvény f(x) = x² */}
        <path d="M -50 -55 Q 0 10 50 -55" fill="none" stroke="#94a3b8" strokeWidth="2" strokeDasharray="3 3" />
        <text x="-58" y="-45" fill="#64748b" fontSize="10" fontWeight="bold">x²</text>

        {/* KÜLSŐ: x² + 2 (Kék) -> Felfelé tolás */}
        <path d="M -50 -85 Q 0 -20 50 -85" fill="none" stroke="#2563eb" strokeWidth="2.5" />
        <circle cx="0" cy="-20" r="4" fill="#2563eb" />
        <text x="10" y="-22" fill="#2563eb" fontSize="11" fontWeight="bold">x² + 2 (KÜLSŐ: Fel 2)</text>

        {/* BELSŐ: (x + 2)² (Narancs) -> Balra tolás ellentétes előjellel! */}
        <path d="M -90 -55 Q -40 10 10 -55" fill="none" stroke="#ea580c" strokeWidth="2.5" />
        <circle cx="-40" cy="10" r="4" fill="#ea580c" />
        <text x="-125" y="32" fill="#ea580c" fontSize="11" fontWeight="bold">(x + 2)² (BELSŐ: Balra 2!)</text>

        {/* Nyilak az elmozdulás irányára */}
        <line x1="0" y1="10" x2="0" y2="-16" stroke="#2563eb" strokeWidth="2" markerEnd="url(#ioc-arrow)" />
        <line x1="0" y1="10" x2="-36" y2="10" stroke="#ea580c" strokeWidth="2" markerEnd="url(#ioc-arrow)" />
      </svg>
      <div className="mt-2 text-center text-xs text-slate-600 dark:text-slate-400">
        <span className="font-bold text-blue-600">Kívül lévő tag:</span> $y$-tengely mentén (függőleges). <span className="font-bold text-orange-600">Zárójelen belüli tag:</span> $x$-tengely mentén (ellentétes előjellel!).
      </div>
    </div>
  );
};

