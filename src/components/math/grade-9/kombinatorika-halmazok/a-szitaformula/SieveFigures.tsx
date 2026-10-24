import React from 'react';

/**
 * Két halmaz szitaformulája (|A ∪ B| = |A| + |B| - |A ∩ B|) vizuális bizonyítás SVG
 * Alkalmazás: A duplán számolt középső metszet levonásának magyarázata
 */
export const TwoSetsSieveSvg: React.FC<{
  size?: number;
  highlightFormula?: boolean;
  className?: string;
}> = ({ size = 210, highlightFormula = true, className = '' }) => {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 230 155"
        style={{ width: size, height: (size * 155) / 230 }}
        className="overflow-visible select-none drop-shadow-xs"
      >
        <defs>
          <clipPath id="sieve-clip-A">
            <circle cx="85" cy="72" r="50" />
          </clipPath>
        </defs>

        {/* Kör A */}
        <circle
          cx="85"
          cy="72"
          r="50"
          className="fill-indigo-100/70 dark:fill-indigo-950/40 stroke-indigo-500 dark:stroke-indigo-400"
          strokeWidth="2.5"
        />

        {/* Kör B */}
        <circle
          cx="145"
          cy="72"
          r="50"
          className="fill-amber-100/70 dark:fill-amber-950/40 stroke-amber-500 dark:stroke-amber-400"
          strokeWidth="2.5"
        />

        {/* Középső metszet (duplán számolt réteg) */}
        <circle
          cx="145"
          cy="72"
          r="50"
          clipPath="url(#sieve-clip-A)"
          className="fill-rose-400/80 dark:fill-rose-500/80 stroke-rose-600"
          strokeWidth="1.5"
        />

        {/* Címkék és számlálási szorzók */}
        <text x="50" y="32" className="fill-indigo-700 dark:fill-indigo-300 font-black text-sm">
          A
        </text>
        <text x="180" y="32" className="fill-amber-700 dark:fill-amber-300 font-black text-sm">
          B
        </text>

        {/* Belső súlyok: +1, 2x számolva -> -1x, +1 */}
        <text x="60" y="76" className="fill-indigo-900 dark:fill-indigo-100 font-black text-xs">
          +1×
        </text>
        <g transform="translate(115, 68)">
          <rect x="-18" y="-12" width="36" height="24" rx="6" fill="#be123c" />
          <text x="0" y="4" textAnchor="middle" fill="#fff" fontSize="10.5" fontWeight="900">
            2× ➔ −1×
          </text>
        </g>
        <text x="170" y="76" className="fill-amber-900 dark:fill-amber-100 font-black text-xs">
          +1×
        </text>

        {/* Alsó képlet kártya */}
        {highlightFormula && (
          <g transform="translate(115, 142)">
            <rect x="-85" y="-9" width="170" height="20" rx="8" fill="#1e1b4b" opacity="0.95" />
            <text x="0" y="4.5" textAnchor="middle" fill="#e0e7ff" fontSize="10.5" fontWeight="bold">
              |A ∪ B| = |A| + |B| − |A ∩ B|
            </text>
          </g>
        )}
      </svg>
    </div>
  );
};

/**
 * Oszthatósági szita (pl. 2-vel vagy 3-mal osztható számok 1..100) SVG
 * Alkalmazás: Kombinatorikus számelméleti feladatok
 */
export const DivisibilitySieveSvg: React.FC<{
  size?: number;
  className?: string;
}> = ({ size = 210, className = '' }) => {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 230 145"
        style={{ width: size, height: (size * 145) / 230 }}
        className="overflow-visible select-none drop-shadow-xs"
      >
        <defs>
          <clipPath id="div-clip">
            <circle cx="85" cy="68" r="48" />
          </clipPath>
        </defs>

        {/* U = 1..100 keret */}
        <rect
          x="6"
          y="6"
          width="218"
          height="132"
          rx="12"
          className="fill-slate-50 dark:fill-slate-900/60 stroke-slate-300 dark:stroke-slate-700"
          strokeWidth="1.5"
        />
        <text x="18" y="22" className="fill-slate-500 dark:fill-slate-400 font-black text-[10px]">
          U = 1..100 (100 szám)
        </text>

        {/* 2-vel oszthatók (50 db) */}
        <circle
          cx="85"
          cy="68"
          r="48"
          className="fill-blue-100/60 dark:fill-blue-950/40 stroke-blue-500"
          strokeWidth="2"
        />
        <text x="45" y="42" className="fill-blue-700 dark:fill-blue-300 font-black text-xs">
          2-vel oszt. (50)
        </text>
        <text x="60" y="74" className="fill-blue-900 dark:fill-blue-100 font-bold text-[11px]">
          34 db
        </text>

        {/* 3-mal oszthatók (33 db) */}
        <circle
          cx="145"
          cy="68"
          r="48"
          className="fill-emerald-100/60 dark:fill-emerald-950/40 stroke-emerald-500"
          strokeWidth="2"
        />
        <text x="185" y="42" textAnchor="end" className="fill-emerald-700 dark:fill-emerald-300 font-black text-xs">
          3-mal oszt. (33)
        </text>
        <text x="170" y="74" className="fill-emerald-900 dark:fill-emerald-100 font-bold text-[11px]">
          17 db
        </text>

        {/* 6-tal oszthatók metszet (16 db) */}
        <circle
          cx="145"
          cy="68"
          r="48"
          clipPath="url(#div-clip)"
          className="fill-purple-400/80 dark:fill-purple-500/80 stroke-purple-600"
          strokeWidth="1.5"
        />
        <text x="115" y="74" textAnchor="middle" className="fill-white font-black text-xs drop-shadow-xs">
          16 db
        </text>

        {/* Kívül esők (sem 2-vel, sem 3-mal nem oszthatók) */}
        <text x="195" y="122" textAnchor="end" className="fill-slate-500 dark:fill-slate-400 font-bold text-[9.5px]">
          Kívül: 33 db
        </text>

        {/* Alsó összeadás */}
        <text x="115" y="130" textAnchor="middle" className="fill-purple-900 dark:fill-purple-200 font-mono font-bold text-[10px]">
          50 + 33 − 16 = 67 szám
        </text>
      </svg>
    </div>
  );
};

/**
 * 3 Halmazos szitaformula Poincaré-elv (+1 -1 +1) SVG
 * Alkalmazás: Három halmaz uniójának elemszám-számítása
 */
export const ThreeSetsSieveSvg: React.FC<{
  size?: number;
  className?: string;
}> = ({ size = 210, className = '' }) => {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 230 170"
        style={{ width: size, height: (size * 170) / 230 }}
        className="overflow-visible select-none drop-shadow-xs"
      >
        <defs>
          <clipPath id="sieve3-clip-A">
            <circle cx="90" cy="70" r="44" />
          </clipPath>
          <clipPath id="sieve3-clip-B">
            <circle cx="140" cy="70" r="44" />
          </clipPath>
        </defs>

        {/* 3 kör (A, B, C) */}
        <circle
          cx="90"
          cy="70"
          r="44"
          className="fill-indigo-100/50 dark:fill-indigo-950/30 stroke-indigo-500"
          strokeWidth="2"
        />
        <circle
          cx="140"
          cy="70"
          r="44"
          className="fill-cyan-100/50 dark:fill-cyan-950/30 stroke-cyan-500"
          strokeWidth="2"
        />
        <circle
          cx="115"
          cy="106"
          r="44"
          className="fill-amber-100/50 dark:fill-amber-950/30 stroke-amber-500"
          strokeWidth="2"
        />

        {/* Hármas metszet kiemelése */}
        <g clipPath="url(#sieve3-clip-A)">
          <g clipPath="url(#sieve3-clip-B)">
            <circle cx="115" cy="106" r="44" className="fill-rose-500 dark:fill-rose-400" />
          </g>
        </g>

        {/* Címkék */}
        <text x="54" y="44" className="fill-indigo-700 dark:fill-indigo-300 font-black text-xs">A</text>
        <text x="176" y="44" className="fill-cyan-700 dark:fill-cyan-300 font-black text-xs">B</text>
        <text x="115" y="162" textAnchor="middle" className="fill-amber-700 dark:fill-amber-300 font-black text-xs">C</text>

        {/* Hármas metszet közepén a +1 visszapótlás */}
        <text x="115" y="85" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="900">
          +1×
        </text>

        {/* Felső magyarázat */}
        <g transform="translate(115, 14)">
          <rect x="-85" y="-8" width="170" height="18" rx="8" fill="#0f172a" opacity="0.95" />
          <text x="0" y="5" textAnchor="middle" fill="#38bdf8" fontSize="9.5" fontWeight="bold">
            +A +B +C  −Párok  +Hármas
          </text>
        </g>
      </svg>
    </div>
  );
};

/**
 * Diákfelmérés (Pl. Angol és Német nyelvtudás) Venn-diagram SVG
 * Alkalmazás: Bentről kifelé kitöltési stratégia illusztrálása
 */
export const SurveyVennSvg: React.FC<{
  size?: number;
  total?: number;
  onlyA?: number;
  both?: number;
  onlyB?: number;
  neither?: number;
  labelA?: string;
  labelB?: string;
  className?: string;
}> = ({
  size = 210,
  total = 30,
  onlyA = 12,
  both = 6,
  onlyB = 8,
  neither = 4,
  labelA = 'Angol (18)',
  labelB = 'Német (14)',
  className = ''
}) => {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 220 145"
        style={{ width: size, height: (size * 145) / 220 }}
        className="overflow-visible select-none drop-shadow-xs"
      >
        <defs>
          <clipPath id="survey-clip">
            <circle cx="85" cy="72" r="48" />
          </clipPath>
        </defs>

        {/* U alaphalmaz doboz */}
        <rect
          x="6"
          y="6"
          width="208"
          height="132"
          rx="12"
          className="fill-slate-50 dark:fill-slate-900/60 stroke-slate-300 dark:stroke-slate-700"
          strokeWidth="1.5"
        />
        <text x="16" y="22" className="fill-slate-500 dark:fill-slate-400 font-bold text-[9.5px]">
          Összes diák: {total} fő
        </text>

        {/* Kör A */}
        <circle
          cx="85"
          cy="72"
          r="48"
          className="fill-indigo-50/70 dark:fill-indigo-950/30 stroke-indigo-500"
          strokeWidth="2"
        />
        <text x="44" y="38" className="fill-indigo-700 dark:fill-indigo-300 font-black text-[10px]">
          {labelA}
        </text>

        {/* Kör B */}
        <circle
          cx="135"
          cy="72"
          r="48"
          className="fill-teal-50/70 dark:fill-teal-950/30 stroke-teal-500"
          strokeWidth="2"
        />
        <text x="176" y="38" textAnchor="end" className="fill-teal-700 dark:fill-teal-300 font-black text-[10px]">
          {labelB}
        </text>

        {/* Közös rész kiemelése */}
        <circle
          cx="135"
          cy="72"
          r="48"
          clipPath="url(#survey-clip)"
          className="fill-emerald-400/80 dark:fill-emerald-500/80 stroke-emerald-600"
          strokeWidth="1.5"
        />

        {/* Zónaszámok (Bentről kifelé logika) */}
        <text x="60" y="78" className="fill-indigo-900 dark:fill-indigo-100 font-black text-sm">
          {onlyA}
        </text>
        <text x="110" y="78" textAnchor="middle" className="fill-emerald-950 font-black text-sm drop-shadow-xs">
          {both}
        </text>
        <text x="160" y="78" className="fill-teal-900 dark:fill-teal-100 font-black text-sm">
          {onlyB}
        </text>

        {/* Kívül (egyiket sem) */}
        <text x="195" y="124" textAnchor="end" className="fill-rose-600 dark:fill-rose-400 font-mono font-black text-xs">
          Semelyik: {neither}
        </text>
      </svg>
    </div>
  );
};

/**
 * Diszjunkt halmazok szitaformulája (|A ∩ B| = 0) SVG
 * Alkalmazás: Amikor nem kell semmit levonni
 */
export const DisjointSieveSvg: React.FC<{
  size?: number;
  className?: string;
}> = ({ size = 200, className = '' }) => {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 210 125"
        style={{ width: size, height: (size * 125) / 210 }}
        className="overflow-visible select-none drop-shadow-xs"
      >
        <circle
          cx="55"
          cy="60"
          r="40"
          className="fill-blue-100/70 dark:fill-blue-950/40 stroke-blue-500"
          strokeWidth="2"
        />
        <text x="55" y="55" textAnchor="middle" className="fill-blue-700 dark:fill-blue-300 font-black text-xs">
          |A| = 8
        </text>

        <circle
          cx="155"
          cy="60"
          r="40"
          className="fill-amber-100/70 dark:fill-amber-950/40 stroke-amber-500"
          strokeWidth="2"
        />
        <text x="155" y="55" textAnchor="middle" className="fill-amber-700 dark:fill-amber-300 font-black text-xs">
          |B| = 6
        </text>

        <g transform="translate(105, 60)">
          <text x="0" y="4" textAnchor="middle" className="fill-slate-400 font-bold text-xs">
            A ∩ B = ∅
          </text>
        </g>

        <g transform="translate(105, 114)">
          <rect x="-70" y="-8" width="140" height="18" rx="8" fill="#1e3a8a" opacity="0.95" />
          <text x="0" y="4.5" textAnchor="middle" fill="#dbeafe" fontSize="10" fontWeight="bold">
            |A ∪ B| = 8 + 6 = 14
          </text>
        </g>
      </svg>
    </div>
  );
};
