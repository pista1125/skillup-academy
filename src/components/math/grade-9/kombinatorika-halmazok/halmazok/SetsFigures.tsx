import React from 'react';

/**
 * Nevezetes számhalmazok hierarchiája (N ⊂ Z ⊂ Q ⊂ R és Q*) SVG
 * Alkalmazás: Számok besorolása, tartalmazási relációk
 */
export const NumberSetsVennSvg: React.FC<{ size?: number; className?: string }> = ({
  size = 200,
  className = ''
}) => {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 240 160"
        style={{ width: size, height: (size * 160) / 240 }}
        className="overflow-visible select-none drop-shadow-xs"
      >
        <defs>
          <filter id="setGlow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#000" floodOpacity="0.15" />
          </filter>
        </defs>

        {/* R - Valós számok halmaza (Külső nagy téglalap) */}
        <rect
          x="6"
          y="6"
          width="228"
          height="148"
          rx="16"
          className="fill-teal-50/50 dark:fill-teal-950/20 stroke-teal-400 dark:stroke-teal-600"
          strokeWidth="2.5"
        />
        <text x="218" y="24" textAnchor="end" className="fill-teal-700 dark:fill-teal-300 font-black text-sm">
          ℝ (Valós)
        </text>

        {/* Q* - Irracionális számok jobb oldali sávja */}
        <rect
          x="166"
          y="32"
          width="62"
          height="114"
          rx="10"
          className="fill-amber-50/80 dark:fill-amber-950/40 stroke-amber-400 dark:stroke-amber-600"
          strokeWidth="2"
        />
        <text x="197" y="48" textAnchor="middle" className="fill-amber-800 dark:fill-amber-300 font-black text-xs">
          ℚ* (Irrac.)
        </text>
        <text x="197" y="74" textAnchor="middle" className="fill-amber-900 dark:fill-amber-200 font-mono text-[11px] font-bold">
          √2,  √3
        </text>
        <text x="197" y="98" textAnchor="middle" className="fill-amber-900 dark:fill-amber-200 font-mono text-[11px] font-bold">
          π,  e
        </text>

        {/* Q - Racionális számok (Bal oldali ovális) */}
        <ellipse
          cx="88"
          cy="88"
          rx="76"
          ry="58"
          className="fill-cyan-50/70 dark:fill-cyan-950/30 stroke-cyan-400 dark:stroke-cyan-600"
          strokeWidth="2"
        />
        <text x="32" y="50" className="fill-cyan-700 dark:fill-cyan-300 font-black text-xs">
          ℚ (Racionális)
        </text>
        <text x="44" y="112" className="fill-cyan-800 dark:fill-cyan-200 font-mono text-[10px] font-bold">
          -0,5 ;  3/4
        </text>

        {/* Z - Egész számok */}
        <ellipse
          cx="92"
          cy="92"
          rx="52"
          ry="40"
          className="fill-indigo-50/80 dark:fill-indigo-950/40 stroke-indigo-400 dark:stroke-indigo-600"
          strokeWidth="2"
        />
        <text x="56" y="72" className="fill-indigo-700 dark:fill-indigo-300 font-black text-xs">
          ℤ (Egész)
        </text>
        <text x="64" y="104" className="fill-indigo-800 dark:fill-indigo-200 font-mono text-[10px] font-bold">
          -7,  -1
        </text>

        {/* N - Természetes számok */}
        <ellipse
          cx="108"
          cy="96"
          rx="30"
          ry="24"
          className="fill-purple-100/90 dark:fill-purple-900/60 stroke-purple-500 dark:stroke-purple-400"
          strokeWidth="2.2"
        />
        <text x="108" y="90" textAnchor="middle" className="fill-purple-800 dark:fill-purple-200 font-black text-xs">
          ℕ
        </text>
        <text x="108" y="108" textAnchor="middle" className="fill-purple-900 dark:fill-purple-100 font-mono text-[10px] font-bold">
          0, 1, 42
        </text>
      </svg>
    </div>
  );
};

/**
 * Részhalmaz reláció (A ⊂ B) Venn-diagram SVG
 * Alkalmazás: Részhalmaz, valódi részhalmaz vizuális bizonyítása
 */
export const SubsetVennSvg: React.FC<{
  size?: number;
  highlightProper?: boolean;
  className?: string;
}> = ({ size = 180, highlightProper = false, className = '' }) => {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 200 140"
        style={{ width: size, height: (size * 140) / 200 }}
        className="overflow-visible select-none drop-shadow-xs"
      >
        {/* Külső halmaz: B */}
        <ellipse
          cx="100"
          cy="70"
          rx="88"
          ry="58"
          className="fill-teal-50/70 dark:fill-teal-950/30 stroke-teal-400 dark:stroke-teal-600"
          strokeWidth="2.5"
        />
        <text x="32" y="38" className="fill-teal-700 dark:fill-teal-300 font-black text-sm">
          B
        </text>

        {/* B-beli külső elemek */}
        <g className="fill-teal-800 dark:fill-teal-200 text-[10.5px] font-bold">
          <text x="42" y="80">• 4</text>
          <text x="156" y="65">• 5</text>
          <text x="145" y="98">• 6</text>
        </g>

        {/* Belső halmaz: A */}
        <ellipse
          cx="96"
          cy="75"
          rx="44"
          ry="32"
          className="fill-indigo-100/80 dark:fill-indigo-900/50 stroke-indigo-500 dark:stroke-indigo-400"
          strokeWidth="2.5"
        />
        <text x="75" y="62" className="fill-indigo-700 dark:fill-indigo-300 font-black text-xs">
          A
        </text>

        {/* A-beli elemek */}
        <g className="fill-indigo-900 dark:fill-indigo-100 text-[10.5px] font-bold">
          <text x="86" y="82">• 1</text>
          <text x="108" y="78">• 2</text>
          <text x="96" y="96">• 3</text>
        </g>

        {/* Alsó jelölés kártya */}
        <g transform="translate(100, 132)">
          <rect x="-45" y="-8" width="90" height="17" rx="8" fill="#1e1b4b" opacity="0.9" />
          <text x="0" y="4" textAnchor="middle" fill="#e0e7ff" fontSize="10" fontWeight="bold">
            {highlightProper ? 'A ⊂ B (valódi)' : 'A ⊆ B (részhalmaz)'}
          </text>
        </g>
      </svg>
    </div>
  );
};

/**
 * Eleme és nem eleme reláció (x ∈ A, y ∉ A) SVG
 * Alkalmazás: Halmazdefiníció, tartozás eldöntése
 */
export const ElementBelongingSvg: React.FC<{ size?: number; className?: string }> = ({
  size = 180,
  className = ''
}) => {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 200 130"
        style={{ width: size, height: (size * 130) / 200 }}
        className="overflow-visible select-none drop-shadow-xs"
      >
        {/* Alaphalmaz doboz */}
        <rect
          x="8"
          y="8"
          width="184"
          height="114"
          rx="12"
          className="fill-slate-50/70 dark:fill-slate-800/40 stroke-slate-200 dark:stroke-slate-700"
          strokeWidth="1.5"
        />
        <text x="20" y="24" className="fill-slate-400 dark:fill-slate-500 font-bold text-[10px]">
          U (Alaphalmaz)
        </text>

        {/* A halmaz köre */}
        <circle
          cx="90"
          cy="68"
          r="42"
          className="fill-emerald-100/70 dark:fill-emerald-950/50 stroke-emerald-500 dark:stroke-emerald-400"
          strokeWidth="2.5"
        />
        <text x="75" y="46" className="fill-emerald-800 dark:fill-emerald-200 font-black text-sm">
          A
        </text>

        {/* Eleme (belül) zöld pipával */}
        <circle cx="86" cy="74" r="10" fill="#10b981" />
        <text x="86" y="78" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="black">x</text>
        <text x="86" y="98" textAnchor="middle" className="fill-emerald-700 dark:fill-emerald-300 font-mono font-bold text-[10px]">
          x ∈ A ✓
        </text>

        {/* Nem eleme (kívül) piros X-szel */}
        <circle cx="160" cy="68" r="10" fill="#f43f5e" />
        <text x="160" y="72" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="black">y</text>
        <text x="160" y="94" textAnchor="middle" className="fill-rose-600 dark:fill-rose-400 font-mono font-bold text-[10px]">
          y ∉ A ✗
        </text>
      </svg>
    </div>
  );
};

/**
 * Üres halmaz (∅ vagy {}) szemléltetés SVG
 * Alkalmazás: Üres halmaz tulajdonságai, részhalmaza mindennek
 */
export const EmptySetSvg: React.FC<{ size?: number; className?: string }> = ({
  size = 170,
  className = ''
}) => {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 190 120"
        style={{ width: size, height: (size * 120) / 190 }}
        className="overflow-visible select-none drop-shadow-xs"
      >
        {/* Üres tároló doboz / halmaz kör szaggatott vonallal */}
        <circle
          cx="60"
          cy="55"
          r="38"
          fill="none"
          stroke="#94a3b8"
          strokeWidth="2.5"
          strokeDasharray="4 3"
        />
        {/* Nagy átlós ∅ szimbólum */}
        <circle cx="60" cy="55" r="20" fill="none" stroke="#6366f1" strokeWidth="3" />
        <line x1="42" y1="73" x2="78" y2="37" stroke="#6366f1" strokeWidth="3" strokeLinecap="round" />
        <text x="60" y="106" textAnchor="middle" className="fill-indigo-600 dark:fill-indigo-400 font-mono font-black text-xs">
          ∅ = {`{ }`}
        </text>

        {/* Magyarázó szöveg mellette */}
        <g transform="translate(112, 35)">
          <rect x="-6" y="-8" width="80" height="48" rx="6" className="fill-indigo-50 dark:fill-indigo-950/50 stroke-indigo-200 dark:stroke-indigo-800" strokeWidth="1" />
          <text x="34" y="6" textAnchor="middle" className="fill-slate-700 dark:fill-slate-200 font-bold text-[9.5px]">
            |∅| = 0 elem
          </text>
          <text x="34" y="22" textAnchor="middle" className="fill-emerald-600 dark:fill-emerald-400 font-bold text-[9px]">
            ∅ ⊆ minden A
          </text>
          <text x="34" y="34" textAnchor="middle" className="fill-slate-500 dark:fill-slate-400 text-[8px]">
            (üres halmaz)
          </text>
        </g>
      </svg>
    </div>
  );
};

/**
 * Részhalmazok száma (2^n hatványhalmaz) fa-diagram SVG
 * Alkalmazás: n elemű halmaznak pontosan 2^n részhalmaza van
 */
export const PowerSetTreeSvg: React.FC<{ size?: number; className?: string }> = ({
  size = 190,
  className = ''
}) => {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 210 125"
        style={{ width: size, height: (size * 125) / 210 }}
        className="overflow-visible select-none drop-shadow-xs"
      >
        {/* Felső kiindulópont */}
        <rect x="75" y="8" width="60" height="20" rx="6" fill="#6366f1" />
        <text x="105" y="22" textAnchor="middle" fill="#fff" fontSize="9.5" fontWeight="bold">
          {`A = {1, 2, 3}`}
        </text>

        {/* 3 elem döntési lépései */}
        <g className="fill-slate-500 dark:fill-slate-400 text-[8.5px] font-bold">
          <text x="25" y="44">1. elem: I/N (2)</text>
          <text x="95" y="44">2. elem: I/N (2)</text>
          <text x="165" y="44">3. elem: I/N (2)</text>
        </g>

        {/* Nyilak / Ágak */}
        <line x1="105" y1="28" x2="50" y2="58" stroke="#cbd5e1" strokeWidth="1.5" />
        <line x1="105" y1="28" x2="160" y2="58" stroke="#cbd5e1" strokeWidth="1.5" />

        {/* 8 részhalmaz doboza */}
        <rect x="15" y="62" width="180" height="38" rx="8" className="fill-purple-50 dark:fill-purple-950/40 stroke-purple-300 dark:stroke-purple-700" strokeWidth="1.5" />
        <text x="105" y="76" textAnchor="middle" className="fill-purple-800 dark:fill-purple-200 font-bold text-[9px]">
          ∅,  {`{1}`},  {`{2}`},  {`{3}`},  {`{1,2}`},  {`{1,3}`},  {`{2,3}`},  {`{1,2,3}`}
        </text>
        <text x="105" y="92" textAnchor="middle" className="fill-purple-900 dark:fill-purple-100 font-black text-[10.5px]">
          2³ = 8 részhalmaz
        </text>

        <text x="105" y="118" textAnchor="middle" className="fill-slate-500 dark:fill-slate-400 font-mono font-bold text-[9px]">
          n elem esetén: 2ⁿ darab részhalmaz
        </text>
      </svg>
    </div>
  );
};

/**
 * Alaphalmaz (U) és komplementer előkészítés SVG
 * Alkalmazás: Alaphalmaz fogalma és elemek elhelyezkedése
 */
export const UniversalSetSvg: React.FC<{ size?: number; className?: string }> = ({
  size = 170,
  className = ''
}) => {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 190 120"
        style={{ width: size, height: (size * 120) / 190 }}
        className="overflow-visible select-none drop-shadow-xs"
      >
        <rect
          x="8"
          y="8"
          width="174"
          height="104"
          rx="12"
          className="fill-slate-50 dark:fill-slate-900/60 stroke-slate-300 dark:stroke-slate-700"
          strokeWidth="2"
        />
        <text x="20" y="24" className="fill-slate-500 dark:fill-slate-400 font-black text-xs">
          U (Alaphalmaz)
        </text>

        <circle
          cx="80"
          cy="66"
          r="36"
          className="fill-teal-100/70 dark:fill-teal-900/40 stroke-teal-500 dark:stroke-teal-400"
          strokeWidth="2"
        />
        <text x="80" y="50" textAnchor="middle" className="fill-teal-800 dark:fill-teal-200 font-black text-xs">
          A
        </text>
        <text x="80" y="74" textAnchor="middle" className="fill-teal-900 dark:fill-teal-100 font-mono text-[10px] font-bold">
          • 1, 2, 3
        </text>

        {/* Külső elemek U-ban */}
        <text x="145" y="55" textAnchor="middle" className="fill-slate-600 dark:fill-slate-300 font-mono text-[10px] font-bold">
          • 4
        </text>
        <text x="145" y="80" textAnchor="middle" className="fill-slate-600 dark:fill-slate-300 font-mono text-[10px] font-bold">
          • 5, 6
        </text>
      </svg>
    </div>
  );
};

/**
 * Halmazok egyenlősége (A = B) SVG
 * Alkalmazás: A = B akkor és csakis akkor, ha ugyanazok az elemeik
 */
export const SetEqualitySvg: React.FC<{ size?: number; className?: string }> = ({
  size = 170,
  className = ''
}) => {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 190 110"
        style={{ width: size, height: (size * 110) / 190 }}
        className="overflow-visible select-none drop-shadow-xs"
      >
        <circle
          cx="95"
          cy="55"
          r="42"
          className="fill-indigo-50/80 dark:fill-indigo-950/40 stroke-indigo-500 dark:stroke-indigo-400"
          strokeWidth="2.5"
        />
        <text x="95" y="34" textAnchor="middle" className="fill-indigo-700 dark:fill-indigo-300 font-black text-xs">
          A = B
        </text>
        <text x="95" y="55" textAnchor="middle" className="fill-indigo-900 dark:fill-indigo-100 font-mono text-[11px] font-bold">
          {'{ 1, 3, 5 }'}
        </text>
        <text x="95" y="72" textAnchor="middle" className="fill-slate-500 dark:fill-slate-400 font-mono text-[9px]">
          = {'{ 5, 1, 3 }'}
        </text>
        <text x="95" y="90" textAnchor="middle" className="fill-emerald-600 dark:fill-emerald-400 font-bold text-[8.5px]">
          (a sorrend nem számít!)
        </text>
      </svg>
    </div>
  );
};

/**
 * Diszjunkt halmazok (Közös elem nélküli) SVG
 * Alkalmazás: A és B különálló halmazok
 */
export const DisjointSetsSvg: React.FC<{ size?: number; className?: string }> = ({
  size = 180,
  className = ''
}) => {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 200 110"
        style={{ width: size, height: (size * 110) / 200 }}
        className="overflow-visible select-none drop-shadow-xs"
      >
        {/* A halmaz */}
        <circle
          cx="55"
          cy="55"
          r="38"
          className="fill-cyan-50/80 dark:fill-cyan-950/40 stroke-cyan-500 dark:stroke-cyan-400"
          strokeWidth="2"
        />
        <text x="55" y="42" textAnchor="middle" className="fill-cyan-700 dark:fill-cyan-300 font-black text-xs">
          A: Párosak
        </text>
        <text x="55" y="66" textAnchor="middle" className="fill-cyan-900 dark:fill-cyan-100 font-mono text-[10px] font-bold">
          2, 4, 6
        </text>

        {/* B halmaz */}
        <circle
          cx="145"
          cy="55"
          r="38"
          className="fill-rose-50/80 dark:fill-rose-950/40 stroke-rose-500 dark:stroke-rose-400"
          strokeWidth="2"
        />
        <text x="145" y="42" textAnchor="middle" className="fill-rose-700 dark:fill-rose-300 font-black text-xs">
          B: Páratlanok
        </text>
        <text x="145" y="66" textAnchor="middle" className="fill-rose-900 dark:fill-rose-100 font-mono text-[10px] font-bold">
          1, 3, 5
        </text>

        <text x="100" y="102" textAnchor="middle" className="fill-slate-500 dark:fill-slate-400 font-bold text-[9px]">
          Nincs közös elem (diszjunkt)
        </text>
      </svg>
    </div>
  );
};

