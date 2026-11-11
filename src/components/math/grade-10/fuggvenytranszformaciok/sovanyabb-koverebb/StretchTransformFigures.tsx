import React from 'react';

interface FigureProps {
  size?: number;
  className?: string;
}

/**
 * 1. Ábra: Parabola nyújtása és összenyomása (soványabb vs. kövérebb)
 * f(x) = x² (normál) vs g(x) = 2x² (soványabb) vs h(x) = 0.5x² (kövérebb).
 * Részletes koordinátarács, pontosan egyetlen közös csúcspontban találkozó görbék.
 */
export const ParabolaStretchSvg: React.FC<FigureProps> = ({ size = 320, className = '' }) => {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 340 260"
        width={size}
        height={(size * 260) / 340}
        className="overflow-visible select-none max-w-full drop-shadow-sm"
      >
        <defs>
          <pattern id="pss-grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#94a3b8" strokeWidth="0.5" strokeOpacity="0.25" />
          </pattern>
          <marker id="pss-arrow" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#64748b" />
          </marker>
        </defs>

        {/* Háttér és koordinátarács */}
        <rect x="15" y="15" width="310" height="230" rx="12" fill="#f8fafc" className="dark:fill-slate-900/60" stroke="#e2e8f0" strokeWidth="1" />
        <rect x="15" y="15" width="310" height="230" rx="12" fill="url(#pss-grid)" />

        {/* Tengelyek: Origó O(0; 0) a (170, 205) pontban */}
        <line x1="25" y1="205" x2="315" y2="205" stroke="#475569" strokeWidth="1.8" markerEnd="url(#pss-arrow)" />
        <line x1="170" y1="235" x2="170" y2="25" stroke="#475569" strokeWidth="1.8" markerEnd="url(#pss-arrow)" />
        <text x="310" y="197" fill="#475569" fontSize="11" fontWeight="bold">x</text>
        <text x="178" y="32" fill="#475569" fontSize="11" fontWeight="bold">y</text>
        <text x="158" y="218" fill="#64748b" fontSize="10" fontWeight="bold">O</text>

        {/* 1. h(x) = 0.5x² (Kövérebb, zöld):
            w = 84, y0 = 75. yc = 2*205 - 75 = 335. Apex = 205! */}
        <path d="M 86 75 Q 170 335 254 75" fill="none" stroke="#10b981" strokeWidth="2.8" strokeLinecap="round" />
        <text x="245" y="65" fill="#059669" fontSize="10" fontWeight="bold">0,5x² („kövérebb”)</text>

        {/* 2. f(x) = x² (Normál, szürke szaggatott):
            w = 60, y0 = 65. yc = 2*205 - 65 = 345. Apex = 205! */}
        <path d="M 110 65 Q 170 345 230 65" fill="none" stroke="#64748b" strokeWidth="2" strokeDasharray="4 4" strokeLinecap="round" />
        <text x="65" y="60" fill="#64748b" fontSize="10" fontWeight="bold">x² (normál)</text>

        {/* 3. g(x) = 2x² (Soványabb, indigó/lila):
            w = 42, y0 = 65. yc = 2*205 - 65 = 345. Apex = 205! */}
        <path d="M 128 65 Q 170 345 212 65" fill="none" stroke="#6366f1" strokeWidth="2.8" strokeLinecap="round" />
        <text x="180" y="55" fill="#4f46e5" fontSize="10" fontWeight="bold">2x² („soványabb”)</text>

        {/* Közös csúcspont T(0; 0) céltárcsával */}
        <circle cx="170" cy="205" r="7" fill="#e0e7ff" stroke="#4f46e5" strokeWidth="1.5" opacity="0.8" />
        <circle cx="170" cy="205" r="4" fill="#0f172a" stroke="#ffffff" strokeWidth="1.5" />
        <text x="170" y="230" fill="#0f172a" dark:fill="#f8fafc" fontSize="10" fontWeight="black" textAnchor="middle">Közös T(0; 0)</text>
      </svg>
      <div className="mt-2 text-center text-xs text-slate-600 dark:text-slate-400">
        <span className="font-bold text-indigo-600 dark:text-indigo-400">|a| &gt; 1:</span> nyújtás (soványabb, meredekebb), <span className="font-bold text-emerald-600 dark:text-emerald-400">|a| &lt; 1:</span> zsugorítás (kövérebb, laposabb).
      </div>
    </div>
  );
};

/**
 * 2. Ábra: Tükrözés az x-tengelyre (előjel szerepe)
 * f(x) = x² (felfelé nyíló, minimum) vs g(x) = -x² (lefelé nyíló, maximum).
 * Pontos koordinátarács, közös T(0; 0) érintkezési pont.
 */
export const ParabolaReflectionSvg: React.FC<FigureProps> = ({ size = 320, className = '' }) => {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 340 260"
        width={size}
        height={(size * 260) / 340}
        className="overflow-visible select-none max-w-full drop-shadow-sm"
      >
        <defs>
          <pattern id="prs-grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#94a3b8" strokeWidth="0.5" strokeOpacity="0.25" />
          </pattern>
          <marker id="prs-arrow" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#64748b" />
          </marker>
        </defs>

        {/* Háttér és koordinátarács */}
        <rect x="15" y="15" width="310" height="230" rx="12" fill="#f8fafc" className="dark:fill-slate-900/60" stroke="#e2e8f0" strokeWidth="1" />
        <rect x="15" y="15" width="310" height="230" rx="12" fill="url(#prs-grid)" />

        {/* Tengelyek: Origó O(0; 0) pontosan középen a (170, 130) helyen */}
        <line x1="25" y1="130" x2="315" y2="130" stroke="#475569" strokeWidth="1.8" markerEnd="url(#prs-arrow)" />
        <line x1="170" y1="235" x2="170" y2="25" stroke="#475569" strokeWidth="1.8" markerEnd="url(#prs-arrow)" />
        <text x="310" y="122" fill="#475569" fontSize="11" fontWeight="bold">x</text>
        <text x="178" y="32" fill="#475569" fontSize="11" fontWeight="bold">y</text>
        <text x="158" y="145" fill="#64748b" fontSize="10" fontWeight="bold">O</text>

        {/* f(x) = x² (Felfelé nyíló, kék):
            w = 60, y0 = 35. yc = 2*130 - 35 = 225. Apex = 130! */}
        <path d="M 110 35 Q 170 225 230 35" fill="none" stroke="#0284c7" strokeWidth="2.8" strokeLinecap="round" />
        <rect x="220" y="35" width="95" height="34" rx="5" fill="#f0f9ff" stroke="#bae6fd" strokeWidth="1" />
        <text x="267" y="50" fill="#0284c7" fontSize="10" fontWeight="bold" textAnchor="middle">f(x) = x² (a &gt; 0)</text>
        <text x="267" y="63" fill="#0369a1" fontSize="9" textAnchor="middle">Minimum: 0</text>

        {/* g(x) = -x² (Lefelé nyíló, piros):
            w = 60, y0 = 225. yc = 2*130 - 225 = 35. Apex = 130! */}
        <path d="M 110 225 Q 170 35 230 225" fill="none" stroke="#e11d48" strokeWidth="2.8" strokeLinecap="round" />
        <rect x="220" y="190" width="95" height="34" rx="5" fill="#fff1f2" stroke="#fecdd3" strokeWidth="1" />
        <text x="267" y="205" fill="#e11d48" fontSize="10" fontWeight="bold" textAnchor="middle">g(x) = -x² (a &lt; 0)</text>
        <text x="267" y="218" fill="#be123c" fontSize="9" textAnchor="middle">Maximum: 0</text>

        {/* Tükrözési szaggatott vonalak és nyilak */}
        <line x1="130" y1="80" x2="130" y2="180" stroke="#94a3b8" strokeWidth="1.2" strokeDasharray="3 3" />
        <circle cx="130" cy="80" r="3" fill="#0284c7" />
        <circle cx="130" cy="180" r="3" fill="#e11d48" />

        <line x1="210" y1="80" x2="210" y2="180" stroke="#94a3b8" strokeWidth="1.2" strokeDasharray="3 3" />
        <circle cx="210" cy="80" r="3" fill="#0284c7" />
        <circle cx="210" cy="180" r="3" fill="#e11d48" />

        {/* Origó csúcspont céltárcsával */}
        <circle cx="170" cy="130" r="7" fill="#f1f5f9" stroke="#0f172a" strokeWidth="1.5" opacity="0.8" />
        <circle cx="170" cy="130" r="4" fill="#0f172a" stroke="#ffffff" strokeWidth="1.5" />
        <text x="140" y="125" fill="#0f172a" dark:fill="#f8fafc" fontSize="10" fontWeight="black">T(0; 0)</text>
      </svg>
      <div className="mt-2 text-center text-xs text-slate-600 dark:text-slate-400">
        <span className="font-bold text-sky-600 dark:text-sky-400">a &gt; 0:</span> felfelé nyíló (konvex, minimum), <span className="font-bold text-rose-600 dark:text-rose-400">a &lt; 0:</span> lefelé nyíló (konkáv, maximum).
      </div>
    </div>
  );
};

/**
 * 3. Ábra: Abszolútérték-függvény nyújtása és tükrözése
 * |x| vs 2|x| vs -0.5|x|
 */
export const AbsFunctionStretchSvg: React.FC<FigureProps> = ({ size = 320, className = '' }) => {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 340 250"
        width={size}
        height={(size * 250) / 340}
        className="overflow-visible select-none max-w-full drop-shadow-sm"
      >
        <defs>
          <pattern id="ass-grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#94a3b8" strokeWidth="0.5" strokeOpacity="0.25" />
          </pattern>
          <marker id="ass-arrow" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#64748b" />
          </marker>
        </defs>

        <rect x="15" y="15" width="310" height="220" rx="12" fill="#f8fafc" className="dark:fill-slate-900/60" stroke="#e2e8f0" strokeWidth="1" />
        <rect x="15" y="15" width="310" height="220" rx="12" fill="url(#ass-grid)" />

        {/* Tengelyek: Origó a (170, 130) helyen */}
        <line x1="25" y1="130" x2="315" y2="130" stroke="#475569" strokeWidth="1.8" markerEnd="url(#ass-arrow)" />
        <line x1="170" y1="225" x2="170" y2="25" stroke="#475569" strokeWidth="1.8" markerEnd="url(#ass-arrow)" />
        <text x="310" y="122" fill="#475569" fontSize="11" fontWeight="bold">x</text>
        <text x="178" y="32" fill="#475569" fontSize="11" fontWeight="bold">y</text>
        <text x="158" y="145" fill="#64748b" fontSize="10" fontWeight="bold">O</text>

        {/* f(x) = |x| (Normál) */}
        <path d="M 90 50 L 170 130 L 250 50" fill="none" stroke="#94a3b8" strokeWidth="1.8" strokeDasharray="4 3" />
        <text x="75" y="45" fill="#64748b" fontSize="10" fontWeight="bold">|x|</text>

        {/* g(x) = 2|x| (Meredekebb V) */}
        <path d="M 125 40 L 170 130 L 215 40" fill="none" stroke="#7c3aed" strokeWidth="2.8" strokeLinecap="round" />
        <text x="215" y="35" fill="#7c3aed" fontSize="11" fontWeight="bold">2|x|</text>

        {/* h(x) = -0.5|x| (Lefelé néző, lapos V) */}
        <path d="M 70 180 L 170 130 L 270 180" fill="none" stroke="#ea580c" strokeWidth="2.8" strokeLinecap="round" />
        <text x="260" y="195" fill="#ea580c" fontSize="11" fontWeight="bold">-0,5|x|</text>

        {/* Origó töréspont */}
        <circle cx="170" cy="130" r="6" fill="#ede9fe" stroke="#7c3aed" strokeWidth="1.5" opacity="0.8" />
        <circle cx="170" cy="130" r="4" fill="#0f172a" stroke="#ffffff" strokeWidth="1.5" />
      </svg>
      <div className="mt-2 text-center text-xs text-slate-600 dark:text-slate-400">
        <span className="font-bold text-purple-600 dark:text-purple-400">2|x|:</span> kétszeres meredekség. <span className="font-bold text-orange-600 dark:text-orange-400">-0,5|x|:</span> lefelé néz és feleolyan meredek.
      </div>
    </div>
  );
};

/**
 * 4. Ábra: Parabola geometriai definíciója (fókusz és vezéregyenes)
 * d(P, F) = d(P, v) egyenlőség, magyar szabványú derékszög jelöléssel (negyedkörív + pont).
 */
export const ParabolaFocusDirectrixSvg: React.FC<FigureProps> = ({ size = 320, className = '' }) => {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 340 260"
        width={size}
        height={(size * 260) / 340}
        className="overflow-visible select-none max-w-full drop-shadow-sm"
      >
        <defs>
          <pattern id="pfd-grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#94a3b8" strokeWidth="0.5" strokeOpacity="0.25" />
          </pattern>
        </defs>

        <rect x="15" y="15" width="310" height="230" rx="12" fill="#f8fafc" className="dark:fill-slate-900/60" stroke="#e2e8f0" strokeWidth="1" />
        <rect x="15" y="15" width="310" height="230" rx="12" fill="url(#pfd-grid)" />

        {/* Szimmetriatengely */}
        <line x1="170" y1="20" x2="170" y2="235" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />

        {/* Vezéregyenes (v) a vízszintes y = 190 egyenesen */}
        <line x1="30" y1="190" x2="310" y2="190" stroke="#dc2626" strokeWidth="2" strokeDasharray="5 4" />
        <text x="35" y="208" fill="#dc2626" fontSize="11" fontWeight="bold">vezéregyenes (v)</text>

        {/* Parabola ív:
            Csúcs T(170, 150). Fókusz F(170, 110). Vezéregyenes y=190.
            p/2 = 40 px. Parabola egyenlete: y = 150 - (x-170)² / 160.
            w = 100, y0 = 87.5. yc = 2*150 - 87.5 = 212.5.
            Apex: 0.5*87.5 + 0.5*212.5 = 150! PONTOS! */}
        <path d="M 70 87.5 Q 170 212.5 270 87.5" fill="none" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" />

        {/* Fókuszpont (F) a (170, 110) helyen */}
        <circle cx="170" cy="110" r="7" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
        <circle cx="170" cy="110" r="4" fill="#16a34a" stroke="#ffffff" strokeWidth="1.5" />
        <text x="180" y="106" fill="#15803d" fontSize="11" fontWeight="black">F (fókusz)</text>

        {/* Csúcspont T(170, 150) pontosan félúton F és v között */}
        <circle cx="170" cy="150" r="3.5" fill="#2563eb" />
        <text x="156" y="165" fill="#1d4ed8" fontSize="10" fontWeight="bold">T (csúcs)</text>

        {/* Parabola egy P pontja a (250, 110) helyen (latus rectum) */}
        <circle cx="250" cy="110" r="4.5" fill="#2563eb" stroke="#ffffff" strokeWidth="1.5" />
        <text x="258" y="106" fill="#1d4ed8" fontSize="12" fontWeight="black">P</text>

        {/* d1: Távolság P-től F-ig: P(250, 110) -> F(170, 110), hossza = 80 px */}
        <line x1="250" y1="110" x2="170" y2="110" stroke="#059669" strokeWidth="2" strokeDasharray="3 3" />
        <rect x="200" y="94" width="30" height="18" rx="4" fill="#ecfdf5" stroke="#a7f3d0" strokeWidth="0.8" />
        <text x="215" y="107" fill="#047857" fontSize="10" fontWeight="bold" textAnchor="middle">d₁</text>

        {/* d2: Merőleges szakasz P-ből a vezéregyenesre: P(250, 110) -> Q(250, 190), hossza = 80 px */}
        <line x1="250" y1="110" x2="250" y2="190" stroke="#dc2626" strokeWidth="2" strokeDasharray="3 3" />
        <circle cx="250" cy="190" r="3.5" fill="#dc2626" />
        <rect x="256" y="142" width="30" height="18" rx="4" fill="#fef2f2" stroke="#fecaca" strokeWidth="0.8" />
        <text x="271" y="155" fill="#b91c1c" fontSize="10" fontWeight="bold" textAnchor="middle">d₂</text>

        {/* Magyar szabványú derékszög jelölés a Q(250, 190) pontban:
            Negyedkörív r = 12 sugárral a bal felső kvadránsban: (250, 178) -> (238, 190).
            Közepén a szögfelezőn pont a (245.5, 185.5) koordinátán. */}
        <path d="M 250 178 A 12 12 0 0 0 238 190" fill="none" stroke="#dc2626" strokeWidth="1.5" />
        <circle cx="245.5" cy="185.5" r="2.2" fill="#dc2626" />

        {/* d1 = d2 egyenlőség doboz */}
        <rect x="25" y="25" width="115" height="28" rx="6" fill="#f8fafc" stroke="#0ea5e9" strokeWidth="1.5" />
        <text x="82" y="43" textAnchor="middle" fill="#0369a1" fontSize="12" fontWeight="black">d₁ = d₂ (80 px)</text>
      </svg>
      <div className="mt-2 text-center text-xs text-slate-600 dark:text-slate-400">
        <span className="font-bold text-blue-600 dark:text-blue-400">Parabola geometriai definíciója:</span> Minden $P$ pontra a fókusztól mért távolság ($d_1$) pontosan megegyezik a vezéregyenestől mért merőleges távolsággal ($d_2$).
      </div>
    </div>
  );
};
