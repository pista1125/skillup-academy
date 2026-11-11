import React from 'react';

interface FigureProps {
  size?: number;
  className?: string;
}

/**
 * 1. Ábra: Lépésről lépésre végrehajtott összetett transzformáció:
 * x² ⟶ (x - 2)² ⟶ -2(x - 2)² ⟶ -2(x - 2)² + 3
 * Precíz koordinátarács, pontos csúcspont T(2; 3) és fázisok.
 */
export const CanonicalParabolaSvg: React.FC<FigureProps> = ({ size = 320, className = '' }) => {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 340 260"
        width={size}
        height={(size * 260) / 340}
        className="overflow-visible select-none max-w-full drop-shadow-sm"
      >
        <defs>
          <pattern id="cps-grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#94a3b8" strokeWidth="0.5" strokeOpacity="0.25" />
          </pattern>
          <marker id="cps-arrow" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#64748b" />
          </marker>
        </defs>

        <rect x="15" y="15" width="310" height="230" rx="12" fill="#f8fafc" className="dark:fill-slate-900/60" stroke="#e2e8f0" strokeWidth="1" />
        <rect x="15" y="15" width="310" height="230" rx="12" fill="url(#cps-grid)" />

        {/* Tengelyek: Origó O(0; 0) a (110, 160) helyen. 1 egység = 25 px. */}
        <line x1="25" y1="160" x2="315" y2="160" stroke="#475569" strokeWidth="1.8" markerEnd="url(#cps-arrow)" />
        <line x1="110" y1="235" x2="110" y2="25" stroke="#475569" strokeWidth="1.8" markerEnd="url(#cps-arrow)" />
        <text x="310" y="152" fill="#475569" fontSize="11" fontWeight="bold">x</text>
        <text x="118" y="32" fill="#475569" fontSize="11" fontWeight="bold">y</text>
        <text x="96" y="174" fill="#64748b" fontSize="10" fontWeight="bold">O</text>

        {/* 1. Alap: x² (Szürke szaggatott, csúcs (110, 160))
            w = 40, y0 = 95. yc = 2*160 - 95 = 225. Apex = 160! */}
        <path d="M 70 95 Q 110 225 150 95" fill="none" stroke="#94a3b8" strokeWidth="1.8" strokeDasharray="3 3" />
        <text x="50" y="90" fill="#94a3b8" fontSize="9" fontWeight="bold">1. x²</text>

        {/* 2. Eltolt: (x - 2)² (Narancs pontozott, u = +2 egység = +50 px -> csúcs (160, 160))
            w = 40, y0 = 95. yc = 225. Apex = 160! */}
        <path d="M 120 95 Q 160 225 200 95" fill="none" stroke="#f59e0b" strokeWidth="1.8" strokeDasharray="2 2" />
        <text x="205" y="90" fill="#d97706" fontSize="9" fontWeight="bold">2. (x - 2)²</text>

        {/* 3. Tükrözött & nyújtott: -2(x - 2)² (Kék pontozott, lefelé nyíló a (160, 160) csúcsból)
            w = 30, y0 = 220. yc = 2*160 - 220 = 100. Apex = 160! */}
        <path d="M 130 220 Q 160 100 190 220" fill="none" stroke="#0284c7" strokeWidth="1.8" strokeDasharray="2 2" />
        <text x="195" y="225" fill="#0284c7" fontSize="9" fontWeight="bold">3. -2(x - 2)²</text>

        {/* 4. Végleges: -2(x - 2)² + 3 (Lila vastag görbe, v = +3 egység = 75 px fel -> csúcs T(160, 85))
            w = 35, y0 = 160. yc = 2*85 - 160 = 10. Apex = 85! */}
        <path d="M 125 160 Q 160 10 195 160" fill="none" stroke="#8b5cf6" strokeWidth="3" strokeLinecap="round" />

        {/* Vetítő szaggatott vonalak a végső csúcspontból */}
        <line x1="160" y1="85" x2="160" y2="160" stroke="#8b5cf6" strokeWidth="1.2" strokeDasharray="3 3" />
        <line x1="110" y1="85" x2="160" y2="85" stroke="#8b5cf6" strokeWidth="1.2" strokeDasharray="3 3" />
        <text x="160" y="174" fill="#8b5cf6" fontSize="10" fontWeight="bold" textAnchor="middle">2</text>
        <text x="102" y="88" fill="#8b5cf6" fontSize="10" fontWeight="bold" textAnchor="end">3</text>

        {/* Csúcspont T(2; 3) céltárcsával */}
        <circle cx="160" cy="85" r="7" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="1.5" opacity="0.8" />
        <circle cx="160" cy="85" r="4" fill="#8b5cf6" stroke="#ffffff" strokeWidth="1.5" />
        <rect x="130" y="55" width="60" height="20" rx="4" fill="#f5f3ff" stroke="#ddd6fe" strokeWidth="1" />
        <text x="160" y="69" fill="#7c3aed" fontSize="10" fontWeight="black" textAnchor="middle">T(2; 3)</text>

        <rect x="200" y="25" width="125" height="22" rx="5" fill="#f5f3ff" stroke="#c4b5fd" strokeWidth="1" />
        <text x="262" y="40" fill="#6d28d9" fontSize="10" fontWeight="bold" textAnchor="middle">f(x) = -2(x - 2)² + 3</text>
      </svg>
      <div className="mt-2 text-center text-xs text-slate-600 dark:text-slate-400">
        <span className="font-bold text-violet-600 dark:text-violet-400">Sorrend:</span> 1. Jobbra 2 $\to$ 2. Tükrözés & 2-szeres nyújtás $\to$ 3. Fel 3. Csúcspont: <span className="font-bold">T(2; 3)</span>.
      </div>
    </div>
  );
};

/**
 * 2. Ábra: Összetett abszolútérték-függvény
 * f(x) = -2|x + 2| + 4 (töréspont V(-2; 4), zérushelyek: x = -4 és x = 0)
 */
export const CompositeAbsSvg: React.FC<FigureProps> = ({ size = 320, className = '' }) => {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 340 250"
        width={size}
        height={(size * 250) / 340}
        className="overflow-visible select-none max-w-full drop-shadow-sm"
      >
        <defs>
          <pattern id="cas-grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#94a3b8" strokeWidth="0.5" strokeOpacity="0.25" />
          </pattern>
          <marker id="cas-arrow" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#64748b" />
          </marker>
        </defs>

        <rect x="15" y="15" width="310" height="220" rx="12" fill="#f8fafc" className="dark:fill-slate-900/60" stroke="#e2e8f0" strokeWidth="1" />
        <rect x="15" y="15" width="310" height="220" rx="12" fill="url(#cas-grid)" />

        {/* Tengelyek: Origó O(0; 0) a (200, 160) helyen. 1 egység = 25 px. */}
        <line x1="25" y1="160" x2="315" y2="160" stroke="#475569" strokeWidth="1.8" markerEnd="url(#cas-arrow)" />
        <line x1="200" y1="225" x2="200" y2="25" stroke="#475569" strokeWidth="1.8" markerEnd="url(#cas-arrow)" />
        <text x="310" y="152" fill="#475569" fontSize="11" fontWeight="bold">x</text>
        <text x="208" y="32" fill="#475569" fontSize="11" fontWeight="bold">y</text>
        <text x="206" y="174" fill="#64748b" fontSize="10" fontWeight="bold">O</text>

        {/* Töréspont V(-2; 4): x = 200 - 2*25 = 150, y = 160 - 4*25 = 60 */}
        {/* Bal zérushely x = -4: (200 - 4*25, 160) = (100, 160) */}
        {/* Jobb zérushely x = 0: (200, 160) */}
        {/* Grafikon lefelé: (75, 210) -> (100, 160) -> (150, 60) -> (200, 160) -> (225, 210) */}
        <path d="M 75 210 L 100 160 L 150 60 L 200 160 L 225 210" fill="none" stroke="#e11d48" strokeWidth="3" strokeLinecap="round" />

        {/* Vetítések */}
        <line x1="150" y1="60" x2="150" y2="160" stroke="#e11d48" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.6" />
        <line x1="150" y1="60" x2="200" y2="60" stroke="#e11d48" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.6" />
        <text x="150" y="174" fill="#e11d48" fontSize="10" fontWeight="bold" textAnchor="middle">-2</text>
        <text x="210" y="64" fill="#e11d48" fontSize="10" fontWeight="bold">4</text>

        {/* Töréspont V(-2; 4) céltárcsával */}
        <circle cx="150" cy="60" r="7" fill="#ffe4e6" stroke="#e11d48" strokeWidth="1.5" opacity="0.8" />
        <circle cx="150" cy="60" r="4" fill="#e11d48" stroke="#ffffff" strokeWidth="1.5" />
        <rect x="115" y="32" width="70" height="20" rx="4" fill="#fff1f2" stroke="#fecdd3" strokeWidth="1" />
        <text x="150" y="46" textAnchor="middle" fill="#be123c" fontSize="10" fontWeight="black">V(-2; 4)</text>

        {/* Zérushelyek pontjai */}
        <circle cx="100" cy="160" r="4.5" fill="#0f172a" stroke="#ffffff" strokeWidth="1.5" />
        <text x="100" y="148" fill="#0f172a" dark:fill="#f8fafc" fontSize="10" fontWeight="bold" textAnchor="middle">x₁ = -4</text>

        <circle cx="200" cy="160" r="4.5" fill="#0f172a" stroke="#ffffff" strokeWidth="1.5" />
        <text x="216" y="148" fill="#0f172a" dark:fill="#f8fafc" fontSize="10" fontWeight="bold">x₂ = 0</text>

        <rect x="25" y="25" width="115" height="22" rx="4" fill="#fff1f2" stroke="#fda4af" strokeWidth="1" />
        <text x="82" y="39" fill="#be123c" fontSize="10" fontWeight="bold" textAnchor="middle">-2|x + 2| + 4</text>
      </svg>
      <div className="mt-2 text-center text-xs text-slate-600 dark:text-slate-400">
        <span className="font-bold text-rose-600 dark:text-rose-400">Összetett abszolútérték:</span> Töréspont <span className="font-bold">V(-2; 4)</span>, lefelé nyíló, zérushelyei $x = -4$ és $x = 0$.
      </div>
    </div>
  );
};

/**
 * 3. Ábra: Külső abszolútérték felhajtás: |x² - 4|
 * Az x-tengely alá süllyedő negatív ív felfelé tükröződik.
 */
export const AbsOutsideSvg: React.FC<FigureProps> = ({ size = 320, className = '' }) => {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 340 250"
        width={size}
        height={(size * 250) / 340}
        className="overflow-visible select-none max-w-full drop-shadow-sm"
      >
        <defs>
          <pattern id="aos-grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#94a3b8" strokeWidth="0.5" strokeOpacity="0.25" />
          </pattern>
          <marker id="aos-arrow" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#64748b" />
          </marker>
        </defs>

        <rect x="15" y="15" width="310" height="220" rx="12" fill="#f8fafc" className="dark:fill-slate-900/60" stroke="#e2e8f0" strokeWidth="1" />
        <rect x="15" y="15" width="310" height="220" rx="12" fill="url(#aos-grid)" />

        {/* Tengelyek: Origó O(0; 0) a (170, 140) helyen. 1 egység = 18 px. */}
        <line x1="25" y1="140" x2="315" y2="140" stroke="#475569" strokeWidth="1.8" markerEnd="url(#aos-arrow)" />
        <line x1="170" y1="225" x2="170" y2="25" stroke="#475569" strokeWidth="1.8" markerEnd="url(#aos-arrow)" />
        <text x="310" y="132" fill="#475569" fontSize="11" fontWeight="bold">x</text>
        <text x="178" y="32" fill="#475569" fontSize="11" fontWeight="bold">y</text>
        <text x="158" y="154" fill="#64748b" fontSize="10" fontWeight="bold">O</text>

        {/* Eredeti x² - 4 negatív része (Szürke szaggatott lent)
            Zérushelyek: -2 -> (134, 140), +2 -> (206, 140) (w = 36).
            Csúcs lent (170, 212) (-4 egység = 72 px le). yc = 2*212 - 140 = 284. Apex = 212! */}
        <path d="M 134 140 Q 170 284 206 140" fill="none" stroke="#94a3b8" strokeWidth="1.8" strokeDasharray="3 3" />
        <text x="180" y="210" fill="#94a3b8" fontSize="9">(eredeti ív -4-nél)</text>

        {/* Felhajtott végleges görbe: |x² - 4| (Kék vastag) */}
        {/* Bal szár: (95, 45) -> (134, 140) */}
        <path d="M 95 45 Q 120 110 134 140" fill="none" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" />
        {/* Felhajtott középső hurok: csúcs (170, 68) (+4 egység = 72 px fel). yc = 2*68 - 140 = -4. Apex = 68! */}
        <path d="M 134 140 Q 170 -4 206 140" fill="none" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" />
        {/* Jobb szár: (206, 140) -> (245, 45) */}
        <path d="M 206 140 Q 220 110 245 45" fill="none" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" />

        {/* Felhajtott csúcs: (0; 4) a (170, 68) pontban céltárcsával */}
        <circle cx="170" cy="68" r="6" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" opacity="0.8" />
        <circle cx="170" cy="68" r="3.5" fill="#2563eb" stroke="#ffffff" strokeWidth="1.5" />
        <text x="180" y="65" fill="#1d4ed8" fontSize="10" fontWeight="bold">(0; 4)</text>

        {/* Zérushelyek: -2 és +2 töréspontok */}
        <circle cx="134" cy="140" r="4" fill="#0f172a" stroke="#ffffff" strokeWidth="1.5" />
        <circle cx="206" cy="140" r="4" fill="#0f172a" stroke="#ffffff" strokeWidth="1.5" />
        <text x="134" y="128" fill="#0f172a" dark:fill="#f8fafc" fontSize="10" fontWeight="bold" textAnchor="middle">-2</text>
        <text x="206" y="128" fill="#0f172a" dark:fill="#f8fafc" fontSize="10" fontWeight="bold" textAnchor="middle">+2</text>

        <rect x="25" y="25" width="105" height="22" rx="4" fill="#eff6ff" stroke="#bfdbfe" strokeWidth="1" />
        <text x="77" y="40" fill="#1d4ed8" fontSize="10" fontWeight="bold" textAnchor="middle">f(x) = |x² - 4|</text>
      </svg>
      <div className="mt-2 text-center text-xs text-slate-600 dark:text-slate-400">
        <span className="font-bold text-blue-600 dark:text-blue-400">|f(x)| hatása:</span> Az $x$-tengely alatti görbedarab felfelé tükröződik („W-szerű” forma alakul ki).
      </div>
    </div>
  );
};

/**
 * 4. Ábra: Pattogó labda parabolaív modellje
 */
export const BouncingBallModelSvg: React.FC<FigureProps> = ({ size = 320, className = '' }) => {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 340 220"
        width={size}
        height={(size * 220) / 340}
        className="overflow-visible select-none max-w-full drop-shadow-sm"
      >
        <defs>
          <pattern id="bbm-grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#94a3b8" strokeWidth="0.5" strokeOpacity="0.25" />
          </pattern>
          <marker id="bbm-arrow" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#64748b" />
          </marker>
        </defs>

        <rect x="15" y="15" width="310" height="190" rx="12" fill="#f8fafc" className="dark:fill-slate-900/60" stroke="#e2e8f0" strokeWidth="1" />
        <rect x="15" y="15" width="310" height="190" rx="12" fill="url(#bbm-grid)" />

        {/* Talaj (x-tengely): y = 160 */}
        <line x1="25" y1="160" x2="315" y2="160" stroke="#475569" strokeWidth="2" markerEnd="url(#bbm-arrow)" />
        <line x1="45" y1="185" x2="45" y2="25" stroke="#475569" strokeWidth="1.8" markerEnd="url(#bbm-arrow)" />
        <text x="310" y="152" fill="#475569" fontSize="11" fontWeight="bold">x (cm)</text>
        <text x="52" y="32" fill="#475569" fontSize="11" fontWeight="bold">y (cm)</text>

        {/* 1. pattanás: 45-től 165-ig (hossz = 120 px), csúcs x=105-nél, csúcsmagasság y = 60.
            w = 60, y0 = 160, yv = 60. yc = 2*60 - 160 = -40. Apex = 60! */}
        <path d="M 45 160 Q 105 -40 165 160" fill="none" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" />
        <circle cx="105" cy="60" r="7" fill="#fef3c7" stroke="#ea580c" strokeWidth="1.5" opacity="0.8" />
        <circle cx="105" cy="60" r="4.5" fill="#ea580c" stroke="#ffffff" strokeWidth="1.5" />
        <rect x="75" y="32" width="60" height="20" rx="4" fill="#fff7ed" stroke="#fed7aa" strokeWidth="1" />
        <text x="105" y="46" textAnchor="middle" fill="#c2410c" fontSize="10" fontWeight="bold">1. csúcs</text>

        {/* 2. pattanás: 165-től 255-ig (hossz = 90 px), csúcs x=210-nél, magasság y = 95.
            w = 45, y0 = 160, yv = 95. yc = 2*95 - 160 = 30. Apex = 95! */}
        <path d="M 165 160 Q 210 30 255 160" fill="none" stroke="#f59e0b" strokeWidth="2.2" strokeDasharray="4 3" strokeLinecap="round" />
        <circle cx="210" cy="95" r="4" fill="#ea580c" stroke="#ffffff" strokeWidth="1" />
        <text x="210" y="85" textAnchor="middle" fill="#ea580c" fontSize="9" fontWeight="bold">2. csúcs</text>

        {/* Pattanási pontok a talajon */}
        <circle cx="45" cy="160" r="4" fill="#0f172a" />
        <circle cx="165" cy="160" r="4" fill="#0f172a" />
        <text x="165" y="176" fill="#0f172a" dark:fill="#f8fafc" fontSize="10" fontWeight="bold" textAnchor="middle">80 cm</text>
        <circle cx="255" cy="160" r="4" fill="#0f172a" />
      </svg>
      <div className="mt-2 text-center text-xs text-slate-600 dark:text-slate-400">
        <span className="font-bold text-amber-600 dark:text-amber-400">Fizikai modell:</span> A pattogó labda két pattanás közötti íve egy lefelé nyíló parabola: $h(x) = -a(x - d)^2 + h_{max}$.
      </div>
    </div>
  );
};
