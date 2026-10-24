import React from 'react';

/**
 * Halmazok metszete (A ∩ B) Venn-diagram SVG
 * Alkalmazás: Közös elemek, és-kapcsolat, diszjunkt halmazok
 */
export const IntersectionVennSvg: React.FC<{
  size?: number;
  highlightElements?: boolean;
  className?: string;
}> = ({ size = 200, highlightElements = true, className = '' }) => {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 220 145"
        style={{ width: size, height: (size * 145) / 220 }}
        className="overflow-visible select-none drop-shadow-xs"
      >
        <defs>
          <clipPath id="circleA-clip">
            <circle cx="85" cy="72" r="52" />
          </clipPath>
        </defs>

        {/* Kör A (bal) */}
        <circle
          cx="85"
          cy="72"
          r="52"
          className="fill-indigo-50/60 dark:fill-indigo-950/30 stroke-indigo-400 dark:stroke-indigo-600"
          strokeWidth="2.5"
        />

        {/* Kör B (jobb) */}
        <circle
          cx="135"
          cy="72"
          r="52"
          className="fill-cyan-50/60 dark:fill-cyan-950/30 stroke-cyan-400 dark:stroke-cyan-600"
          strokeWidth="2.5"
        />

        {/* Metszet kiemelése (A ∩ B) zöldes/smaragd színnel */}
        <circle
          cx="135"
          cy="72"
          r="52"
          clipPath="url(#circleA-clip)"
          className="fill-emerald-400/80 dark:fill-emerald-500/80 stroke-emerald-600"
          strokeWidth="1.5"
        />

        {/* Címkék */}
        <text x="50" y="32" className="fill-indigo-700 dark:fill-indigo-300 font-black text-sm">
          A
        </text>
        <text x="170" y="32" className="fill-cyan-700 dark:fill-cyan-300 font-black text-sm">
          B
        </text>

        {/* Elemek a zónákban */}
        {highlightElements && (
          <g className="font-bold text-[10.5px]">
            <text x="55" y="76" className="fill-indigo-900 dark:fill-indigo-200">• 1, 2</text>
            <text x="110" y="76" textAnchor="middle" className="fill-slate-900 font-black">• 3, 4</text>
            <text x="165" y="76" className="fill-cyan-900 dark:fill-cyan-200">• 5, 6</text>
          </g>
        )}

        {/* Alsó jelölés kártya */}
        <g transform="translate(110, 134)">
          <rect x="-55" y="-8" width="110" height="18" rx="8" fill="#065f46" opacity="0.95" />
          <text x="0" y="5" textAnchor="middle" fill="#d1fae5" fontSize="10.5" fontWeight="bold">
            A ∩ B (Metszet)
          </text>
        </g>
      </svg>
    </div>
  );
};

/**
 * Halmazok uniója (A ∪ B) Venn-diagram SVG
 * Alkalmazás: Egyesítés, vagy-kapcsolat, logikai összeadás
 */
export const UnionVennSvg: React.FC<{
  size?: number;
  className?: string;
}> = ({ size = 200, className = '' }) => {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 220 145"
        style={{ width: size, height: (size * 145) / 220 }}
        className="overflow-visible select-none drop-shadow-xs"
      >
        {/* Mindkét kör kitöltve homogén színezéssel */}
        <circle
          cx="85"
          cy="72"
          r="52"
          className="fill-teal-300/70 dark:fill-teal-600/60 stroke-teal-500 dark:stroke-teal-400"
          strokeWidth="2.5"
        />
        <circle
          cx="135"
          cy="72"
          r="52"
          className="fill-teal-300/70 dark:fill-teal-600/60 stroke-teal-500 dark:stroke-teal-400"
          strokeWidth="2.5"
        />

        {/* Címkék */}
        <text x="50" y="32" className="fill-teal-800 dark:fill-teal-200 font-black text-sm">
          A
        </text>
        <text x="170" y="32" className="fill-teal-800 dark:fill-teal-200 font-black text-sm">
          B
        </text>

        {/* Elemminták a teljes unióban */}
        <g className="fill-teal-950 dark:fill-teal-100 font-bold text-[10.5px]">
          <text x="56" y="76">• 1, 2</text>
          <text x="110" y="76" textAnchor="middle">• 3, 4</text>
          <text x="156" y="76">• 5, 6</text>
        </g>

        {/* Alsó jelölés kártya */}
        <g transform="translate(110, 134)">
          <rect x="-55" y="-8" width="110" height="18" rx="8" fill="#134e4a" opacity="0.95" />
          <text x="0" y="5" textAnchor="middle" fill="#ccfbf1" fontSize="10.5" fontWeight="bold">
            A ∪ B (Unió)
          </text>
        </g>
      </svg>
    </div>
  );
};

/**
 * Halmazok különbsége (A \ B) Venn-diagram SVG
 * Alkalmazás: A elemei, amelyek nincsenek benne B-ben
 */
export const DifferenceVennSvg: React.FC<{
  size?: number;
  reverse?: boolean; // Ha true: B \ A
  className?: string;
}> = ({ size = 200, reverse = false, className = '' }) => {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 220 145"
        style={{ width: size, height: (size * 145) / 220 }}
        className="overflow-visible select-none drop-shadow-xs"
      >
        <defs>
          <mask id="diff-mask-A">
            <rect width="220" height="145" fill="white" />
            <circle cx="135" cy="72" r="52" fill="black" />
          </mask>
          <mask id="diff-mask-B">
            <rect width="220" height="145" fill="white" />
            <circle cx="85" cy="72" r="52" fill="black" />
          </mask>
        </defs>

        {/* Alap körök vázlata */}
        <circle
          cx="85"
          cy="72"
          r="52"
          className="fill-slate-100/50 dark:fill-slate-800/30 stroke-indigo-400 dark:stroke-indigo-600"
          strokeWidth="2"
        />
        <circle
          cx="135"
          cy="72"
          r="52"
          className="fill-slate-100/50 dark:fill-slate-800/30 stroke-cyan-400 dark:stroke-cyan-600"
          strokeWidth="2"
        />

        {/* Különbség maszkolt kitöltése */}
        {!reverse ? (
          <circle
            cx="85"
            cy="72"
            r="52"
            mask="url(#diff-mask-A)"
            className="fill-indigo-500/80 dark:fill-indigo-400/80"
          />
        ) : (
          <circle
            cx="135"
            cy="72"
            r="52"
            mask="url(#diff-mask-B)"
            className="fill-cyan-500/80 dark:fill-cyan-400/80"
          />
        )}

        {/* Címkék */}
        <text x="50" y="32" className="fill-indigo-700 dark:fill-indigo-300 font-black text-sm">
          A
        </text>
        <text x="170" y="32" className="fill-cyan-700 dark:fill-cyan-300 font-black text-sm">
          B
        </text>

        {/* Érintett elemek */}
        {!reverse ? (
          <text x="56" y="76" className="fill-white font-black text-[11px] drop-shadow-xs">
            • 1, 2
          </text>
        ) : (
          <text x="156" y="76" className="fill-white font-black text-[11px] drop-shadow-xs">
            • 5, 6
          </text>
        )}

        {/* Alsó jelölés kártya */}
        <g transform="translate(110, 134)">
          <rect x="-55" y="-8" width="110" height="18" rx="8" fill={!reverse ? '#312e81' : '#164e63'} opacity="0.95" />
          <text x="0" y="5" textAnchor="middle" fill="#e0e7ff" fontSize="10.5" fontWeight="bold">
            {!reverse ? 'A \\ B (Különbség)' : 'B \\ A (Különbség)'}
          </text>
        </g>
      </svg>
    </div>
  );
};

/**
 * Komplementer halmaz (A komplementere U-ban: A') SVG
 * Alkalmazás: Tagadás, alaphalmazból történő kivonás (U \ A)
 */
export const ComplementVennSvg: React.FC<{
  size?: number;
  className?: string;
}> = ({ size = 200, className = '' }) => {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 220 145"
        style={{ width: size, height: (size * 145) / 220 }}
        className="overflow-visible select-none drop-shadow-xs"
      >
        <defs>
          <mask id="complement-mask">
            <rect width="220" height="145" fill="white" />
            <circle cx="100" cy="72" r="44" fill="black" />
          </mask>
        </defs>

        {/* U alaphalmaz doboz kitöltve (A kivételével a maszk miatt) */}
        <rect
          x="8"
          y="8"
          width="204"
          height="124"
          rx="12"
          mask="url(#complement-mask)"
          className="fill-amber-400/70 dark:fill-amber-500/60"
        />

        {/* U doboz körvonal */}
        <rect
          x="8"
          y="8"
          width="204"
          height="124"
          rx="12"
          fill="none"
          className="stroke-amber-500 dark:stroke-amber-600"
          strokeWidth="2.5"
        />
        <text x="22" y="26" className="fill-amber-800 dark:fill-amber-200 font-black text-xs">
          U (Alaphalmaz)
        </text>

        {/* A halmaz köre fehér/üres belsővel */}
        <circle
          cx="100"
          cy="72"
          r="44"
          className="fill-white/90 dark:fill-slate-900/90 stroke-indigo-500 dark:stroke-indigo-400"
          strokeWidth="2.5"
        />
        <text x="100" y="65" textAnchor="middle" className="fill-indigo-700 dark:fill-indigo-300 font-black text-sm">
          A
        </text>
        <text x="100" y="82" textAnchor="middle" className="fill-slate-500 font-bold text-[10px]">
          (kimarad)
        </text>

        {/* Külső elemek U-ban */}
        <text x="175" y="55" textAnchor="middle" className="fill-amber-950 dark:fill-amber-100 font-black text-[11px]">
          • 7, 8
        </text>
        <text x="175" y="95" textAnchor="middle" className="fill-amber-950 dark:fill-amber-100 font-black text-[11px]">
          • 9, 10
        </text>

        {/* Alsó jelölés kártya */}
        <g transform="translate(110, 136)">
          <rect x="-60" y="-8" width="120" height="18" rx="8" fill="#78350f" opacity="0.95" />
          <text x="0" y="5" textAnchor="middle" fill="#fef3c7" fontSize="10.5" fontWeight="bold">
            Ā = U \ A (Komplementer)
          </text>
        </g>
      </svg>
    </div>
  );
};

/**
 * Diszjunkt halmazok (A ∩ B = ∅) Venn-diagram SVG
 * Alkalmazás: Nincs közös elem, független halmazok
 */
export const DisjointVennSvg: React.FC<{
  size?: number;
  className?: string;
}> = ({ size = 200, className = '' }) => {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 220 135"
        style={{ width: size, height: (size * 135) / 220 }}
        className="overflow-visible select-none drop-shadow-xs"
      >
        {/* A kör (bal) */}
        <circle
          cx="60"
          cy="65"
          r="42"
          className="fill-indigo-100/70 dark:fill-indigo-950/40 stroke-indigo-500 dark:stroke-indigo-400"
          strokeWidth="2.5"
        />
        <text x="60" y="52" textAnchor="middle" className="fill-indigo-700 dark:fill-indigo-300 font-black text-sm">
          A
        </text>
        <text x="60" y="75" textAnchor="middle" className="fill-indigo-900 dark:fill-indigo-100 font-mono text-[10px] font-bold">
          • 2, 4, 6
        </text>

        {/* B kör (jobb) - Nincs átfedés! */}
        <circle
          cx="160"
          cy="65"
          r="42"
          className="fill-rose-100/70 dark:fill-rose-950/40 stroke-rose-500 dark:stroke-rose-400"
          strokeWidth="2.5"
        />
        <text x="160" y="52" textAnchor="middle" className="fill-rose-700 dark:fill-rose-300 font-black text-sm">
          B
        </text>
        <text x="160" y="75" textAnchor="middle" className="fill-rose-900 dark:fill-rose-100 font-mono text-[10px] font-bold">
          • 1, 3, 5
        </text>

        {/* Középső áthúzott metszet ikon */}
        <g transform="translate(110, 65)">
          <text x="0" y="4" textAnchor="middle" className="fill-rose-600 dark:fill-rose-400 font-bold text-base">
            ∅
          </text>
        </g>

        {/* Alsó jelölés kártya */}
        <g transform="translate(110, 126)">
          <rect x="-65" y="-8" width="130" height="18" rx="8" fill="#4c0519" opacity="0.95" />
          <text x="0" y="5" textAnchor="middle" fill="#ffe4e6" fontSize="10.5" fontWeight="bold">
            A ∩ B = ∅ (Diszjunkt)
          </text>
        </g>
      </svg>
    </div>
  );
};

/**
 * De Morgan azonosság Venn-diagram SVG
 * (A ∪ B)' = A' ∩ B' szemléltetése
 */
export const DeMorganUnionVennSvg: React.FC<{
  size?: number;
  className?: string;
}> = ({ size = 200, className = '' }) => {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 220 145"
        style={{ width: size, height: (size * 145) / 220 }}
        className="overflow-visible select-none drop-shadow-xs"
      >
        <defs>
          <mask id="demorgan-mask">
            <rect width="220" height="145" fill="white" />
            <circle cx="85" cy="72" r="46" fill="black" />
            <circle cx="135" cy="72" r="46" fill="black" />
          </mask>
        </defs>

        {/* U doboz kifestve mindkét körön KÍVÜL */}
        <rect
          x="8"
          y="8"
          width="204"
          height="124"
          rx="12"
          mask="url(#demorgan-mask)"
          className="fill-purple-400/80 dark:fill-purple-500/70"
        />

        <rect
          x="8"
          y="8"
          width="204"
          height="124"
          rx="12"
          fill="none"
          className="stroke-purple-500 dark:stroke-purple-600"
          strokeWidth="2.5"
        />
        <text x="22" y="26" className="fill-purple-900 dark:fill-purple-200 font-black text-xs">
          U
        </text>

        {/* A és B körök üresen maradnak */}
        <circle
          cx="85"
          cy="72"
          r="46"
          className="fill-white/95 dark:fill-slate-900/95 stroke-indigo-400"
          strokeWidth="2"
        />
        <circle
          cx="135"
          cy="72"
          r="46"
          className="fill-white/95 dark:fill-slate-900/95 stroke-cyan-400"
          strokeWidth="2"
        />
        <text x="75" y="74" textAnchor="middle" className="fill-indigo-600 font-black text-xs">A</text>
        <text x="145" y="74" textAnchor="middle" className="fill-cyan-600 font-black text-xs">B</text>

        {/* Alsó jelölés kártya */}
        <g transform="translate(110, 136)">
          <rect x="-70" y="-8" width="140" height="18" rx="8" fill="#3b0764" opacity="0.95" />
          <text x="0" y="5" textAnchor="middle" fill="#f3e8ff" fontSize="10" fontWeight="bold">
            (A ∪ B) = A ∩ B
          </text>
        </g>
      </svg>
    </div>
  );
};

/**
 * 3 Halmazos Venn-diagram SVG (A, B, C)
 * Alkalmazás: 8 diszjunkt zóna, hármas metszet (A ∩ B ∩ C)
 */
export const ThreeSetsVennSvg: React.FC<{
  size?: number;
  highlightCenter?: boolean;
  className?: string;
}> = ({ size = 200, highlightCenter = true, className = '' }) => {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 220 175"
        style={{ width: size, height: (size * 175) / 220 }}
        className="overflow-visible select-none drop-shadow-xs"
      >
        <defs>
          <clipPath id="clip-A">
            <circle cx="85" cy="70" r="44" />
          </clipPath>
          <clipPath id="clip-B">
            <circle cx="135" cy="70" r="44" />
          </clipPath>
        </defs>

        {/* 3 kör (A: bal felső, B: jobb felső, C: alsó közép) */}
        <circle
          cx="85"
          cy="70"
          r="44"
          className="fill-indigo-50/50 dark:fill-indigo-950/20 stroke-indigo-500 dark:stroke-indigo-400"
          strokeWidth="2"
        />
        <circle
          cx="135"
          cy="70"
          r="44"
          className="fill-cyan-50/50 dark:fill-cyan-950/20 stroke-cyan-500 dark:stroke-cyan-400"
          strokeWidth="2"
        />
        <circle
          cx="110"
          cy="105"
          r="44"
          className="fill-amber-50/50 dark:fill-amber-950/20 stroke-amber-500 dark:stroke-amber-400"
          strokeWidth="2"
        />

        {/* Hármas metszet kiemelése: A ∩ B ∩ C */}
        {highlightCenter && (
          <g clipPath="url(#clip-A)">
            <g clipPath="url(#clip-B)">
              <circle
                cx="110"
                cy="105"
                r="44"
                className="fill-emerald-500 dark:fill-emerald-400"
              />
            </g>
          </g>
        )}

        {/* Címkék */}
        <text x="50" y="42" className="fill-indigo-700 dark:fill-indigo-300 font-black text-sm">A</text>
        <text x="170" y="42" className="fill-cyan-700 dark:fill-cyan-300 font-black text-sm">B</text>
        <text x="110" y="162" textAnchor="middle" className="fill-amber-700 dark:fill-amber-300 font-black text-sm">C</text>

        {/* Alsó jelölés kártya */}
        <g transform="translate(110, 14)">
          <rect x="-60" y="-8" width="120" height="18" rx="8" fill="#064e3b" opacity="0.95" />
          <text x="0" y="5" textAnchor="middle" fill="#a7f3d0" fontSize="10.5" fontWeight="bold">
            A ∩ B ∩ C (Hármas metszet)
          </text>
        </g>
      </svg>
    </div>
  );
};

/**
 * Részhalmaz és Műveletek kapcsolata (A ⊆ B esetén) SVG
 * Alkalmazás: A ∩ B = A, A ∪ B = B, A \ B = ∅
 */
export const SubsetOperationsVennSvg: React.FC<{
  size?: number;
  className?: string;
}> = ({ size = 190, className = '' }) => {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 200 135"
        style={{ width: size, height: (size * 135) / 200 }}
        className="overflow-visible select-none drop-shadow-xs"
      >
        {/* Külső B kör */}
        <ellipse
          cx="100"
          cy="68"
          rx="85"
          ry="54"
          className="fill-teal-50/70 dark:fill-teal-950/30 stroke-teal-500 dark:stroke-teal-400"
          strokeWidth="2"
        />
        <text x="32" y="38" className="fill-teal-700 dark:fill-teal-300 font-black text-sm">
          B
        </text>

        {/* Belső A kör */}
        <ellipse
          cx="95"
          cy="74"
          rx="42"
          ry="30"
          className="fill-emerald-200/80 dark:fill-emerald-800/60 stroke-emerald-600 dark:stroke-emerald-400"
          strokeWidth="2.5"
        />
        <text x="95" y="78" textAnchor="middle" className="fill-emerald-950 dark:fill-emerald-100 font-black text-xs">
          A
        </text>

        {/* Magyarázó kártya alul */}
        <g transform="translate(100, 128)">
          <rect x="-80" y="-8" width="160" height="17" rx="8" fill="#134e4a" opacity="0.95" />
          <text x="0" y="4.5" textAnchor="middle" fill="#99f6e4" fontSize="9.5" fontWeight="bold">
            Ha A ⊆ B  ➔  A ∩ B = A  és  A ∪ B = B
          </text>
        </g>
      </svg>
    </div>
  );
};
