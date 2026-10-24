import React from 'react';

/**
 * 1. Három Halmazos Venn-Diagram Kiemelt Mezőkkel (A, B, C)
 * Színkódolt, tiszta átfedések, címkék a metszetekhez
 */
export const ThreeSetsVennRegionsSvg: React.FC<{
  size?: number;
  highlightRegion?: 'center' | 'all' | 'onlyA' | 'symDiff';
  className?: string;
}> = ({
  size = 200,
  highlightRegion = 'all',
  className = ''
}) => {
  return (
    <div className={`w-full h-full flex flex-col items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 240 220"
        style={{ width: size, height: (size * 220) / 240, maxWidth: '100%', maxHeight: '100%' }}
        className="w-full h-full max-w-full max-h-full overflow-visible select-none drop-shadow-xs"
      >
        <defs>
          <filter id="vennShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.15" />
          </filter>
        </defs>

        {/* Alaphalmaz (U) téglalap */}
        <rect
          x="10"
          y="10"
          width="220"
          height="200"
          rx="14"
          className="fill-slate-50/80 dark:fill-slate-900/60 stroke-slate-300 dark:stroke-slate-700"
          strokeWidth="2"
        />
        <text x="24" y="30" className="fill-slate-500 font-bold text-[10px]">U</text>

        {/* 3 Halmaz Körei */}
        {/* A Halmaz (Kék - Bal fent) */}
        <circle
          cx="88"
          cy="85"
          r="54"
          fill="#3b82f6"
          fillOpacity={highlightRegion === 'onlyA' ? '0.45' : '0.22'}
          stroke="#2563eb"
          strokeWidth="2.5"
        />
        <text x="50" y="60" fill="#1d4ed8" fontSize="13" fontWeight="900">A</text>

        {/* B Halmaz (Rózsaszín - Jobb fent) */}
        <circle
          cx="152"
          cy="85"
          r="54"
          fill="#ec4899"
          fillOpacity="0.22"
          stroke="#db2777"
          strokeWidth="2.5"
        />
        <text x="190" y="60" fill="#be185d" fontSize="13" fontWeight="900">B</text>

        {/* C Halmaz (Borostyán - Lent középen) */}
        <circle
          cx="120"
          cy="138"
          r="54"
          fill="#f59e0b"
          fillOpacity="0.22"
          stroke="#d97706"
          strokeWidth="2.5"
        />
        <text x="120" y="202" textAnchor="middle" fill="#b45309" fontSize="13" fontWeight="900">C</text>

        {/* Középső Hármas Metszet Pont / Kiemelés (A ∩ B ∩ C) */}
        <circle
          cx="120"
          cy="104"
          r="9"
          fill="#8b5cf6"
          stroke="#ffffff"
          strokeWidth="2"
        />
        <text x="120" y="107.5" textAnchor="middle" fill="#ffffff" fontSize="7.5" fontWeight="black">
          ∩
        </text>

        {/* Címke lent */}
        <g transform="translate(120, 20)">
          <rect x="-56" y="-9" width="112" height="17" rx="8" fill="#1e1b4b" opacity="0.88" />
          <text x="0" y="3" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">
            3 Halmazos Venn
          </text>
        </g>
      </svg>
    </div>
  );
};

/**
 * 2. Szimmetrikus Differencia: A Δ B = (A \ B) ∪ (B \ A)
 * Csak az egyikbe tartozó elemek (a középső metszet fehér/üres)
 */
export const SymmetricDifferenceSvg: React.FC<{ size?: number; className?: string }> = ({
  size = 190,
  className = ''
}) => {
  return (
    <div className={`w-full h-full flex flex-col items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 220 130"
        style={{ width: size, height: (size * 130) / 220, maxWidth: '100%', maxHeight: '100%' }}
        className="w-full h-full max-w-full max-h-full overflow-visible select-none drop-shadow-xs"
      >
        {/* Bal kör kiemelve (A \ B) */}
        <circle cx="82" cy="65" r="46" fill="#8b5cf6" fillOpacity="0.45" stroke="#7c3aed" strokeWidth="2.5" />
        {/* Jobb kör kiemelve (B \ A) */}
        <circle cx="138" cy="65" r="46" fill="#8b5cf6" fillOpacity="0.45" stroke="#7c3aed" strokeWidth="2.5" />

        {/* Középső metszet kitakarása fehérre / sötétre */}
        <path
          d="M 110 30 A 46 46 0 0 1 110 100 A 46 46 0 0 1 110 30 Z"
          className="fill-white dark:fill-slate-900 stroke-purple-400 dark:stroke-purple-600"
          strokeWidth="1.5"
        />
        <text x="110" y="68" textAnchor="middle" className="fill-slate-400 font-mono text-[9px] font-bold">
          ✕
        </text>

        <text x="56" y="68" textAnchor="middle" fill="#4c1d95" fontSize="13" fontWeight="900">A</text>
        <text x="164" y="68" textAnchor="middle" fill="#4c1d95" fontSize="13" fontWeight="900">B</text>

        {/* Badge */}
        <g transform="translate(110, 118)">
          <rect x="-56" y="-9" width="112" height="17" rx="8" fill="#4c1d95" />
          <text x="0" y="3" textAnchor="middle" fill="#f5f3ff" fontSize="9" fontWeight="black">
            A Δ B (Szimmetrikus)
          </text>
        </g>
      </svg>
    </div>
  );
};

/**
 * 3. Nevezetes Számhalmazok Hierarchiája
 * N ⊂ Z ⊂ Q ⊂ R és Q* (irracionálisak)
 */
export const NumberSetsHierarchySvg: React.FC<{ size?: number; className?: string }> = ({
  size = 200,
  className = ''
}) => {
  return (
    <div className={`w-full h-full flex flex-col items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 240 170"
        style={{ width: size, height: (size * 170) / 240, maxWidth: '100%', maxHeight: '100%' }}
        className="w-full h-full max-w-full max-h-full overflow-visible select-none drop-shadow-xs"
      >
        {/* R (Valós számok külső téglalap) */}
        <rect x="10" y="10" width="220" height="150" rx="14" fill="#f8fafc" stroke="#475569" strokeWidth="2.5" className="dark:fill-slate-850" />
        <text x="24" y="30" fill="#334155" fontSize="12" fontWeight="900">ℝ</text>

        {/* Q* (Irracionális számok jobb oldali sáv) */}
        <rect x="160" y="25" width="60" height="125" rx="10" fill="#fef2f2" stroke="#f87171" strokeWidth="2" strokeDasharray="3 2" className="dark:fill-rose-950/40" />
        <text x="190" y="44" textAnchor="middle" fill="#b91c1c" fontSize="11" fontWeight="900">ℚ*</text>
        <text x="190" y="70" textAnchor="middle" fill="#dc2626" fontSize="9.5" fontWeight="bold">√2</text>
        <text x="190" y="95" textAnchor="middle" fill="#dc2626" fontSize="9.5" fontWeight="bold">π</text>
        <text x="190" y="120" textAnchor="middle" fill="#dc2626" fontSize="8.5">√5</text>

        {/* Q (Racionális számok) */}
        <ellipse cx="88" cy="88" rx="66" ry="54" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="2" className="dark:fill-sky-950/40" />
        <text x="35" y="55" fill="#0369a1" fontSize="11" fontWeight="900">ℚ</text>
        <text x="42" y="90" fill="#0284c7" fontSize="9" fontWeight="bold">-¾</text>
        <text x="44" y="115" fill="#0284c7" fontSize="9" fontWeight="bold">0,25</text>

        {/* Z (Egész számok) */}
        <ellipse cx="98" cy="92" rx="46" ry="38" fill="#e0e7ff" stroke="#818cf8" strokeWidth="2" className="dark:fill-indigo-950/50" />
        <text x="65" y="75" fill="#4338ca" fontSize="11" fontWeight="900">ℤ</text>
        <text x="70" y="105" fill="#4f46e5" fontSize="9" fontWeight="bold">-5</text>
        <text x="72" y="122" fill="#4f46e5" fontSize="9" fontWeight="bold">-12</text>

        {/* N (Természetes számok belső mag) */}
        <circle cx="116" cy="96" r="22" fill="#dcfce7" stroke="#4ade80" strokeWidth="2" className="dark:fill-emerald-950/60" />
        <text x="116" y="90" textAnchor="middle" fill="#15803d" fontSize="11" fontWeight="900">ℕ</text>
        <text x="116" y="107" textAnchor="middle" fill="#16a34a" fontSize="8.5" fontWeight="black">0, 1, 7</text>
      </svg>
    </div>
  );
};

/**
 * 4. Részhalmaz Tartalmazás Venn: A ⊆ B
 */
export const SubsetInclusionVennSvg: React.FC<{ size?: number; className?: string }> = ({
  size = 180,
  className = ''
}) => {
  return (
    <div className={`w-full h-full flex flex-col items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 200 140"
        style={{ width: size, height: (size * 140) / 200, maxWidth: '100%', maxHeight: '100%' }}
        className="w-full h-full max-w-full max-h-full overflow-visible select-none drop-shadow-xs"
      >
        {/* Külső B halmaz */}
        <ellipse cx="100" cy="70" rx="75" ry="50" fill="#ede9fe" stroke="#8b5cf6" strokeWidth="2.5" className="dark:fill-purple-950/40" />
        <text x="45" y="50" fill="#6d28d9" fontSize="13" fontWeight="900">B</text>

        {/* Belső A halmaz */}
        <circle cx="120" cy="74" r="30" fill="#c7d2fe" stroke="#4f46e5" strokeWidth="2.5" className="dark:fill-indigo-950/70" />
        <text x="120" y="78" textAnchor="middle" fill="#3730a3" fontSize="12" fontWeight="900">A</text>

        {/* Badge */}
        <g transform="translate(100, 128)">
          <rect x="-42" y="-9" width="84" height="17" rx="8" fill="#4f46e5" />
          <text x="0" y="3" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="black">
            A ⊆ B (Részhalmaz)
          </text>
        </g>
      </svg>
    </div>
  );
};

/**
 * 5. Diszjunkt Halmazok: A ∩ B = ∅
 */
export const DisjointSetsVennSvg: React.FC<{ size?: number; className?: string }> = ({
  size = 180,
  className = ''
}) => {
  return (
    <div className={`w-full h-full flex flex-col items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 200 130"
        style={{ width: size, height: (size * 130) / 200, maxWidth: '100%', maxHeight: '100%' }}
        className="w-full h-full max-w-full max-h-full overflow-visible select-none drop-shadow-xs"
      >
        {/* Bal kör A */}
        <circle cx="60" cy="65" r="38" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2.5" className="dark:fill-sky-950/40" />
        <text x="60" y="70" textAnchor="middle" fill="#0369a1" fontSize="13" fontWeight="900">A</text>

        {/* Jobb kör B */}
        <circle cx="140" cy="65" r="38" fill="#ffe4e6" stroke="#e11d48" strokeWidth="2.5" className="dark:fill-rose-950/40" />
        <text x="140" y="70" textAnchor="middle" fill="#be123c" fontSize="13" fontWeight="900">B</text>

        {/* Címke */}
        <g transform="translate(100, 118)">
          <rect x="-48" y="-9" width="96" height="17" rx="8" fill="#0f172a" opacity="0.88" />
          <text x="0" y="3" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">
            A ∩ B = ∅ (Diszjunkt)
          </text>
        </g>
      </svg>
    </div>
  );
};

/**
 * 6. Összetett Intervallum és Egészek Metszete: [-2, 3] ∩ Z
 * Számegyenesen folytonos szakasz és kiemelt egész pontok
 */
export const ComplexIntervalZIntersectionSvg: React.FC<{ size?: number; className?: string }> = ({
  size = 200,
  className = ''
}) => {
  return (
    <div className={`w-full h-full flex flex-col items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 240 100"
        style={{ width: size, height: (size * 100) / 240, maxWidth: '100%', maxHeight: '100%' }}
        className="w-full h-full max-w-full max-h-full overflow-visible select-none drop-shadow-xs"
      >
        {/* Számegyenes vonal */}
        <line x1="20" y1="50" x2="220" y2="50" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />

        {/* [-2, 3] folytonos sáv */}
        <line x1="50" y1="50" x2="190" y2="50" stroke="#a7f3d0" strokeWidth="8" strokeLinecap="round" />

        {/* Egész pontok kiemelve: -2, -1, 0, 1, 2, 3 */}
        {[
          { x: 50, val: '-2' },
          { x: 78, val: '-1' },
          { x: 106, val: '0' },
          { x: 134, val: '1' },
          { x: 162, val: '2' },
          { x: 190, val: '3' }
        ].map((pt, i) => (
          <g key={i}>
            <circle cx={pt.x} cy="50" r="5" fill="#059669" stroke="#fff" strokeWidth="1.5" />
            <text x={pt.x} y="68" textAnchor="middle" fill="#065f46" fontSize="9" fontWeight="bold">
              {pt.val}
            </text>
          </g>
        ))}

        {/* Badge */}
        <g transform="translate(120, 20)">
          <rect x="-60" y="-9" width="120" height="17" rx="8" fill="#059669" />
          <text x="0" y="3" textAnchor="middle" fill="#ffffff" fontSize="8.5" fontWeight="black">
            [-2, 3] ∩ ℤ = {'{-2, -1, 0, 1, 2, 3}'}
          </text>
        </g>
      </svg>
    </div>
  );
};

/**
 * 7. Hatványhalmaz Generálás: 2ⁿ Részhalmazok
 */
export const PowerSetTreeSvg: React.FC<{ size?: number; className?: string }> = ({
  size = 200,
  className = ''
}) => {
  return (
    <div className={`w-full h-full flex flex-col items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 240 120"
        style={{ width: size, height: (size * 120) / 240, maxWidth: '100%', maxHeight: '100%' }}
        className="w-full h-full max-w-full max-h-full overflow-visible select-none drop-shadow-xs"
      >
        {/* n=3 elem ⟹ 2³ = 8 részhalmaz vizuális dobozok */}
        <rect x="15" y="15" width="210" height="90" rx="12" fill="#faf5ff" stroke="#c084fc" strokeWidth="2" className="dark:fill-purple-950/30" />

        <text x="120" y="35" textAnchor="middle" fill="#7e22ce" fontSize="11" fontWeight="900">
          A = {'{1, 2, 3}'} (n = 3)
        </text>

        <g transform="translate(25, 48)">
          {/* 0 elemű */}
          <rect x="0" y="0" width="35" height="22" rx="5" fill="#e9d5ff" />
          <text x="17.5" y="14" textAnchor="middle" fill="#581c87" fontSize="8.5" fontWeight="bold">∅</text>

          {/* 1 eleműek */}
          <rect x="40" y="0" width="45" height="22" rx="5" fill="#ddd6fe" />
          <text x="62.5" y="14" textAnchor="middle" fill="#4338ca" fontSize="8" fontWeight="bold">{'{1}, {2}, {3}'}</text>

          {/* 2 eleműek */}
          <rect x="90" y="0" width="55" height="22" rx="5" fill="#c7d2fe" />
          <text x="117.5" y="14" textAnchor="middle" fill="#3730a3" fontSize="7.5" fontWeight="bold">{'{1,2}, {1,3}...'} </text>

          {/* 3 elemű */}
          <rect x="150" y="0" width="40" height="22" rx="5" fill="#fbcfe8" />
          <text x="170" y="14" textAnchor="middle" fill="#9d174d" fontSize="8" fontWeight="bold">A maga</text>
        </g>

        <text x="120" y="94" textAnchor="middle" fill="#6b21a8" fontSize="9.5" fontWeight="black">
          Összesen: 2³ = 8 részhalmaz!
        </text>
      </svg>
    </div>
  );
};
