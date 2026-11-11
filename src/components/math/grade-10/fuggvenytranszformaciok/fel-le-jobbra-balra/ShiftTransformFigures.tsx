import React from 'react';

interface FigureProps {
  size?: number;
  className?: string;
}

/**
 * 1. Ábra: Vektoros eltolás a síkban
 * Szemlélteti a v(u, c) vektorral történő eltolást és a pontok (x, y) -> (x+u, y+c) vándorlását.
 * Részletes koordinátarács, pontos csúcspontok.
 */
export const GeneralShiftVectorSvg: React.FC<FigureProps> = ({ size = 320, className = '' }) => {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 340 260"
        width={size}
        height={(size * 260) / 340}
        className="overflow-visible select-none max-w-full drop-shadow-sm"
      >
        <defs>
          <pattern id="gsv-grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#94a3b8" strokeWidth="0.5" strokeOpacity="0.25" />
          </pattern>
          <marker id="gsv-arrow" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#64748b" />
          </marker>
          <marker id="gsv-vec-arrow" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#8b5cf6" />
          </marker>
        </defs>

        {/* Háttér és koordinátarács */}
        <rect x="15" y="15" width="310" height="230" rx="12" fill="#f8fafc" className="dark:fill-slate-900/60" stroke="#e2e8f0" strokeWidth="1" />
        <rect x="15" y="15" width="310" height="230" rx="12" fill="url(#gsv-grid)" />

        {/* Tengelyek: Origó O(0; 0) a (130, 160) pontban */}
        <line x1="25" y1="160" x2="315" y2="160" stroke="#475569" strokeWidth="1.8" markerEnd="url(#gsv-arrow)" />
        <line x1="130" y1="235" x2="130" y2="25" stroke="#475569" strokeWidth="1.8" markerEnd="url(#gsv-arrow)" />
        <text x="310" y="152" fill="#475569" fontSize="11" fontWeight="bold">x</text>
        <text x="138" y="32" fill="#475569" fontSize="11" fontWeight="bold">y</text>
        <text x="114" y="174" fill="#64748b" fontSize="10" fontWeight="bold">O</text>

        {/* Eredeti görbe: f(x) csúcsa az origóban (130, 160).
            w = 50, y0 = 80. yc = 2*160 - 80 = 240. Apex = 160! */}
        <path
          d="M 80 80 Q 130 240 180 80"
          fill="none"
          stroke="#94a3b8"
          strokeWidth="2"
          strokeDasharray="4 4"
        />
        <text x="65" y="85" fill="#64748b" fontSize="11" fontWeight="bold">f(x)</text>

        {/* Eltolt görbe: g(x) = f(x - u) + c
            u = +60 px (jobbra), c = -60 px (fel) => Új csúcs T(190, 100).
            w = 50, y0 = 20. yc = 2*100 - 20 = 180. Apex = 100! */}
        <path
          d="M 140 20 Q 190 180 240 20"
          fill="none"
          stroke="#0284c7"
          strokeWidth="2.8"
          strokeLinecap="round"
        />
        <text x="195" y="30" fill="#0284c7" fontSize="11" fontWeight="bold">g(x) = f(x - u) + c</text>

        {/* Eltolásvektor v(u, c) az origóból (130, 160) a csúcspontba (190, 100) */}
        <line x1="130" y1="160" x2="187" y2="103" stroke="#8b5cf6" strokeWidth="2.8" markerEnd="url(#gsv-vec-arrow)" />
        <rect x="150" y="128" width="56" height="20" rx="4" fill="#f5f3ff" stroke="#ddd6fe" strokeWidth="1" />
        <text x="178" y="142" fill="#7c3aed" fontSize="10" fontWeight="black" textAnchor="middle">v(u; c)</text>

        {/* Vetítések u és c koordinátákra */}
        <line x1="190" y1="100" x2="190" y2="160" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 3" />
        <line x1="130" y1="100" x2="190" y2="100" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 3" />
        <text x="190" y="174" fill="#0284c7" fontSize="10" fontWeight="bold" textAnchor="middle">+u (jobbra)</text>
        <text x="108" y="104" fill="#0284c7" fontSize="10" fontWeight="bold" textAnchor="end">+c (fel)</text>

        {/* Pontok */}
        <circle cx="130" cy="160" r="4" fill="#64748b" />
        <circle cx="190" cy="100" r="7" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.5" opacity="0.8" />
        <circle cx="190" cy="100" r="4" fill="#0284c7" stroke="#ffffff" strokeWidth="1.5" />
        <text x="200" y="104" fill="#0284c7" fontSize="11" fontWeight="black">T(u; c)</text>
      </svg>
      <div className="mt-2 text-center text-xs text-slate-600 dark:text-slate-400">
        <span className="font-bold text-violet-600 dark:text-violet-400">v(u; c) eltolásvektor:</span> Minden pont <span className="font-semibold text-slate-800 dark:text-slate-200">(x; y) ↦ (x + u; y + c)</span> helyre vándorol.
      </div>
    </div>
  );
};

/**
 * 2. Ábra: Abszolútérték-függvény eltolása
 * f(x) = |x| vs g(x) = |x - 2| + 1
 */
export const AbsFunctionShiftSvg: React.FC<FigureProps> = ({ size = 320, className = '' }) => {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 340 250"
        width={size}
        height={(size * 250) / 340}
        className="overflow-visible select-none max-w-full drop-shadow-sm"
      >
        <defs>
          <pattern id="afs-grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#94a3b8" strokeWidth="0.5" strokeOpacity="0.25" />
          </pattern>
          <marker id="afs-arrow" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#64748b" />
          </marker>
        </defs>

        <rect x="15" y="15" width="310" height="220" rx="12" fill="#f8fafc" className="dark:fill-slate-900/60" stroke="#e2e8f0" strokeWidth="1" />
        <rect x="15" y="15" width="310" height="220" rx="12" fill="url(#afs-grid)" />

        {/* Tengelyek: Origó O(0; 0) a (120, 160) helyen */}
        <line x1="25" y1="160" x2="315" y2="160" stroke="#475569" strokeWidth="1.8" markerEnd="url(#afs-arrow)" />
        <line x1="120" y1="225" x2="120" y2="25" stroke="#475569" strokeWidth="1.8" markerEnd="url(#afs-arrow)" />
        <text x="310" y="152" fill="#475569" fontSize="11" fontWeight="bold">x</text>
        <text x="128" y="32" fill="#475569" fontSize="11" fontWeight="bold">y</text>
        <text x="106" y="174" fill="#64748b" fontSize="10" fontWeight="bold">O</text>

        {/* f(x) = |x|: töréspont (120, 160) */}
        <path d="M 40 80 L 120 160 L 200 80" fill="none" stroke="#94a3b8" strokeWidth="1.8" strokeDasharray="4 3" />
        <text x="45" y="72" fill="#64748b" fontSize="10" fontWeight="bold">f(x) = |x|</text>
        <circle cx="120" cy="160" r="3.5" fill="#94a3b8" />

        {/* g(x) = |x - 2| + 1: u = +2 (50 px jobbra -> 170), c = +1 (25 px fel -> 135) */}
        <path d="M 90 55 L 170 135 L 250 55" fill="none" stroke="#8b5cf6" strokeWidth="2.8" strokeLinecap="round" />
        <circle cx="170" cy="135" r="7" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="1.5" opacity="0.8" />
        <circle cx="170" cy="135" r="4" fill="#8b5cf6" stroke="#ffffff" strokeWidth="1.5" />
        <text x="180" y="140" fill="#7c3aed" fontSize="11" fontWeight="black">V(2; 1)</text>
        <text x="210" y="50" fill="#8b5cf6" fontSize="11" fontWeight="bold">g(x) = |x - 2| + 1</text>

        {/* Eltolási segédvonalak */}
        <line x1="120" y1="160" x2="170" y2="160" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 3" />
        <text x="145" y="174" fill="#d97706" fontSize="9" fontWeight="bold" textAnchor="middle">+2 jobbra</text>
        <line x1="170" y1="160" x2="170" y2="135" stroke="#10b981" strokeWidth="1.5" strokeDasharray="3 3" />
        <text x="175" y="152" fill="#059669" fontSize="9" fontWeight="bold">+1 fel</text>
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
export const SqrtFunctionShiftSvg: React.FC<FigureProps> = ({ size = 320, className = '' }) => {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 340 250"
        width={size}
        height={(size * 250) / 340}
        className="overflow-visible select-none max-w-full drop-shadow-sm"
      >
        <defs>
          <pattern id="sfs-grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#94a3b8" strokeWidth="0.5" strokeOpacity="0.25" />
          </pattern>
          <marker id="sfs-arrow" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#64748b" />
          </marker>
        </defs>

        <rect x="15" y="15" width="310" height="220" rx="12" fill="#f8fafc" className="dark:fill-slate-900/60" stroke="#e2e8f0" strokeWidth="1" />
        <rect x="15" y="15" width="310" height="220" rx="12" fill="url(#sfs-grid)" />

        {/* Tengelyek: Origó O(0; 0) a (60, 140) helyen */}
        <line x1="25" y1="140" x2="315" y2="140" stroke="#475569" strokeWidth="1.8" markerEnd="url(#sfs-arrow)" />
        <line x1="60" y1="225" x2="60" y2="25" stroke="#475569" strokeWidth="1.8" markerEnd="url(#sfs-arrow)" />
        <text x="310" y="132" fill="#475569" fontSize="11" fontWeight="bold">x</text>
        <text x="68" y="32" fill="#475569" fontSize="11" fontWeight="bold">y</text>
        <text x="46" y="154" fill="#64748b" fontSize="10" fontWeight="bold">O</text>

        {/* f(x) = √x: Kezdőpont (60, 140) */}
        {/* Görbe pontjai: x=0 y=140, x=1 y=115, x=4 y=90, x=9 y=65 */}
        <path
          d="M 60 140 Q 90 105 160 85 T 300 55"
          fill="none"
          stroke="#94a3b8"
          strokeWidth="2"
          strokeDasharray="4 3"
        />
        <circle cx="60" cy="140" r="3.5" fill="#94a3b8" />
        <text x="145" y="75" fill="#64748b" fontSize="10" fontWeight="bold">f(x) = √x</text>

        {/* g(x) = √(x - 3) - 1 => Kezdőpont K(3; -1): x = 60 + 3*25 = 135, y = 140 + 1*25 = 165 */}
        <path
          d="M 135 165 Q 165 130 235 110 T 310 90"
          fill="none"
          stroke="#059669"
          strokeWidth="2.8"
          strokeLinecap="round"
        />
        <circle cx="135" cy="165" r="7" fill="#d1fae5" stroke="#059669" strokeWidth="1.5" opacity="0.8" />
        <circle cx="135" cy="165" r="4" fill="#059669" stroke="#ffffff" strokeWidth="1.5" />
        <text x="145" y="178" fill="#047857" fontSize="11" fontWeight="black">K(3; -1)</text>
        <text x="210" y="85" fill="#059669" fontSize="11" fontWeight="bold">g(x) = √(x - 3) - 1</text>

        {/* Értelmezési tartomány jelölés az x-tengelyen: x ≥ 3 */}
        <line x1="135" y1="140" x2="310" y2="140" stroke="#059669" strokeWidth="4" strokeLinecap="round" opacity="0.7" />
        <circle cx="135" cy="140" r="4.5" fill="#059669" stroke="#ffffff" strokeWidth="1.5" />
        <rect x="145" y="125" width="55" height="18" rx="4" fill="#ecfdf5" stroke="#a7f3d0" strokeWidth="0.8" />
        <text x="172" y="137" fill="#047857" fontSize="9" fontWeight="bold" textAnchor="middle">x ≥ 3</text>
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
export const InsideVsOutsideComparisonSvg: React.FC<FigureProps> = ({ size = 320, className = '' }) => {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 340 250"
        width={size}
        height={(size * 250) / 340}
        className="overflow-visible select-none max-w-full drop-shadow-sm"
      >
        <defs>
          <pattern id="ioc-grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#94a3b8" strokeWidth="0.5" strokeOpacity="0.25" />
          </pattern>
          <marker id="ioc-arrow" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#64748b" />
          </marker>
        </defs>

        <rect x="15" y="15" width="310" height="220" rx="12" fill="#f8fafc" className="dark:fill-slate-900/60" stroke="#e2e8f0" strokeWidth="1" />
        <rect x="15" y="15" width="310" height="220" rx="12" fill="url(#ioc-grid)" />

        {/* Tengelyek: Origó O(0; 0) a (170, 160) helyen */}
        <line x1="25" y1="160" x2="315" y2="160" stroke="#475569" strokeWidth="1.8" markerEnd="url(#ioc-arrow)" />
        <line x1="170" y1="225" x2="170" y2="25" stroke="#475569" strokeWidth="1.8" markerEnd="url(#ioc-arrow)" />
        <text x="310" y="152" fill="#475569" fontSize="11" fontWeight="bold">x</text>
        <text x="178" y="32" fill="#475569" fontSize="11" fontWeight="bold">y</text>
        <text x="156" y="174" fill="#64748b" fontSize="10" fontWeight="bold">O</text>

        {/* Alapfüggvény f(x) = x²: csúcs (170, 160)
            w = 40, y0 = 90. yc = 2*160 - 90 = 230. Apex = 160! */}
        <path d="M 130 90 Q 170 230 210 90" fill="none" stroke="#94a3b8" strokeWidth="2" strokeDasharray="3 3" />
        <text x="135" y="85" fill="#64748b" fontSize="10" fontWeight="bold">x²</text>
        <circle cx="170" cy="160" r="3.5" fill="#94a3b8" />

        {/* KÜLSŐ: x² + 2 (Kék) -> Felfelé tolás (csúcs: (170, 100))
            w = 40, y0 = 30. yc = 2*100 - 30 = 170. Apex = 100! */}
        <path d="M 130 30 Q 170 170 210 30" fill="none" stroke="#2563eb" strokeWidth="2.8" strokeLinecap="round" />
        <circle cx="170" cy="100" r="6" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" opacity="0.8" />
        <circle cx="170" cy="100" r="3.5" fill="#2563eb" stroke="#ffffff" strokeWidth="1.5" />
        <rect x="180" y="90" width="135" height="20" rx="4" fill="#eff6ff" stroke="#bfdbfe" strokeWidth="1" />
        <text x="247" y="103" fill="#1d4ed8" fontSize="9" fontWeight="bold" textAnchor="middle">x² + 2 (KÜLSŐ: Fel 2)</text>

        {/* BELSŐ: (x + 2)² (Narancs) -> Balra tolás ellentétes előjellel! (csúcs: (110, 160))
            w = 40, y0 = 90. yc = 2*160 - 90 = 230. Apex = 160! */}
        <path d="M 70 90 Q 110 230 150 90" fill="none" stroke="#ea580c" strokeWidth="2.8" strokeLinecap="round" />
        <circle cx="110" cy="160" r="6" fill="#ffedd5" stroke="#ea580c" strokeWidth="1.5" opacity="0.8" />
        <circle cx="110" cy="160" r="3.5" fill="#ea580c" stroke="#ffffff" strokeWidth="1.5" />
        <rect x="25" y="175" width="140" height="20" rx="4" fill="#fff7ed" stroke="#fed7aa" strokeWidth="1" />
        <text x="95" y="188" fill="#c2410c" fontSize="9" fontWeight="bold" textAnchor="middle">(x + 2)² (BELSŐ: Balra 2!)</text>

        {/* Nyilak az elmozdulás irányára */}
        <line x1="170" y1="155" x2="170" y2="108" stroke="#2563eb" strokeWidth="2" markerEnd="url(#ioc-arrow)" />
        <line x1="165" y1="160" x2="118" y2="160" stroke="#ea580c" strokeWidth="2" markerEnd="url(#ioc-arrow)" />
      </svg>
      <div className="mt-2 text-center text-xs text-slate-600 dark:text-slate-400">
        <span className="font-bold text-blue-600 dark:text-blue-400">Kívül lévő tag:</span> $y$-tengely mentén (függőleges). <span className="font-bold text-orange-600 dark:text-orange-400">Zárójelen belüli tag:</span> $x$-tengely mentén (ellentétes előjellel!).
      </div>
    </div>
  );
};
