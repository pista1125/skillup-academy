import React from 'react';

/**
 * Közös nevező vizualizáció SVG (pl. 1/2 + 1/3 = 3/6 + 2/6 = 5/6)
 */
export const CommonDenominatorSvg: React.FC<{ size?: number; className?: string }> = ({
  size = 240,
  className = ''
}) => {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 260 140"
        style={{ width: size, height: (size * 140) / 260 }}
        className="overflow-visible select-none drop-shadow-xs"
      >
        <defs>
          <filter id="fractionGlow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#000" floodOpacity="0.1" />
          </filter>
        </defs>

        {/* 1/2 téglalap (3/6 kékre színezve) */}
        <g transform="translate(10, 20)">
          <text x="35" y="-5" textAnchor="middle" className="fill-blue-700 dark:fill-blue-300 font-bold text-xs">
            1/2 = 3/6
          </text>
          <rect x="0" y="0" width="70" height="35" rx="4" className="fill-white dark:fill-slate-800 stroke-blue-400" strokeWidth="1.5" />
          {/* 3 sáv színezve a 6-ból */}
          <rect x="0" y="0" width="35" height="35" className="fill-blue-500/80" />
          <line x1="11.66" y1="0" x2="11.66" y2="35" className="stroke-blue-300 dark:stroke-blue-700 stroke-dasharray-1" />
          <line x1="23.33" y1="0" x2="23.33" y2="35" className="stroke-blue-300 dark:stroke-blue-700 stroke-dasharray-1" />
          <line x1="35" y1="0" x2="35" y2="35" className="stroke-blue-600 stroke-width-1.5" />
          <line x1="46.66" y1="0" x2="46.66" y2="35" className="stroke-blue-300 dark:stroke-blue-700 stroke-dasharray-1" />
          <line x1="58.33" y1="0" x2="58.33" y2="35" className="stroke-blue-300 dark:stroke-blue-700 stroke-dasharray-1" />
        </g>

        {/* Plusz jel */}
        <text x="96" y="44" textAnchor="middle" className="fill-slate-500 dark:fill-slate-400 font-black text-lg">
          +
        </text>

        {/* 1/3 téglalap (2/6 zöldre színezve) */}
        <g transform="translate(110, 20)">
          <text x="35" y="-5" textAnchor="middle" className="fill-emerald-700 dark:fill-emerald-300 font-bold text-xs">
            1/3 = 2/6
          </text>
          <rect x="0" y="0" width="70" height="35" rx="4" className="fill-white dark:fill-slate-800 stroke-emerald-400" strokeWidth="1.5" />
          <rect x="0" y="0" width="23.33" height="35" className="fill-emerald-500/80" />
          <line x1="11.66" y1="0" x2="11.66" y2="35" className="stroke-emerald-300 dark:stroke-emerald-700 stroke-dasharray-1" />
          <line x1="23.33" y1="0" x2="23.33" y2="35" className="stroke-emerald-600 stroke-width-1.5" />
          <line x1="35" y1="0" x2="35" y2="35" className="stroke-emerald-300 dark:stroke-emerald-700 stroke-dasharray-1" />
          <line x1="46.66" y1="0" x2="46.66" y2="35" className="stroke-emerald-300 dark:stroke-emerald-700 stroke-dasharray-1" />
          <line x1="58.33" y1="0" x2="58.33" y2="35" className="stroke-emerald-300 dark:stroke-emerald-700 stroke-dasharray-1" />
        </g>

        {/* Egyenlőségjel */}
        <text x="195" y="44" textAnchor="middle" className="fill-slate-500 dark:fill-slate-400 font-black text-lg">
          =
        </text>

        {/* Eredmény: 5/6 téglalap */}
        <g transform="translate(205, 20)">
          <text x="25" y="-5" textAnchor="middle" className="fill-indigo-700 dark:fill-indigo-300 font-black text-xs">
            5/6
          </text>
          <rect x="0" y="0" width="50" height="35" rx="4" className="fill-white dark:fill-slate-800 stroke-indigo-400" strokeWidth="1.5" />
          <rect x="0" y="0" width="41.66" height="35" className="fill-indigo-500/80" />
        </g>

        <text x="130" y="105" textAnchor="middle" className="fill-slate-600 dark:fill-slate-300 text-[11px] font-bold">
          Közös nevező: lkkt(2, 3) = 6
        </text>
        <text x="130" y="125" textAnchor="middle" className="fill-slate-500 dark:fill-slate-400 font-mono text-[10px]">
          3/6 + 2/6 = (3 + 2)/6 = 5/6
        </text>
      </svg>
    </div>
  );
};

/**
 * Emeletes tört szerkezete és feloldása SVG
 */
export const ComplexFractionSvg: React.FC<{ size?: number; className?: string }> = ({
  size = 200,
  className = ''
}) => {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 240 140"
        style={{ width: size, height: (size * 140) / 240 }}
        className="overflow-visible select-none drop-shadow-xs"
      >
        {/* Számláló doboz */}
        <rect x="15" y="15" width="90" height="35" rx="6" className="fill-blue-50 dark:fill-blue-950/50 stroke-blue-400" strokeWidth="1.5" />
        <text x="60" y="37" textAnchor="middle" className="fill-blue-800 dark:fill-blue-200 font-mono font-bold text-xs">
          a / b (Számláló)
        </text>

        {/* Fő törtvonal */}
        <line x1="5" y1="62" x2="115" y2="62" className="stroke-indigo-600 dark:stroke-indigo-400" strokeWidth="3.5" />
        <text x="120" y="65" textAnchor="start" className="fill-indigo-700 dark:fill-indigo-300 font-black text-[10px] uppercase tracking-wider">
          Fő törtvonal (:)
        </text>

        {/* Nevező doboz */}
        <rect x="15" y="75" width="90" height="35" rx="6" className="fill-amber-50 dark:fill-amber-950/50 stroke-amber-400" strokeWidth="1.5" />
        <text x="60" y="97" textAnchor="middle" className="fill-amber-800 dark:fill-amber-200 font-mono font-bold text-xs">
          c / d (Nevező)
        </text>

        {/* Nyíl és eredmény */}
        <path d="M 125 40 L 150 40" className="stroke-slate-400" strokeWidth="2" markerEnd="url(#arrow)" />
        <text x="160" y="44" className="fill-slate-700 dark:fill-slate-300 font-mono font-bold text-xs">
          = a/b : c/d
        </text>
        <text x="160" y="70" className="fill-emerald-600 dark:fill-emerald-400 font-mono font-black text-xs">
          = a/b · d/c
        </text>
        <text x="160" y="94" className="fill-slate-500 font-mono text-[10px]">
          = (a·d) / (b·c)
        </text>
      </svg>
    </div>
  );
};

/**
 * Tört szorzása és osztása reciprok szabállyal SVG
 */
export const FractionMultDivSvg: React.FC<{ size?: number; className?: string }> = ({
  size = 200,
  className = ''
}) => {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 240 130"
        style={{ width: size, height: (size * 130) / 240 }}
        className="overflow-visible select-none drop-shadow-xs"
      >
        {/* Szorzás kártya */}
        <rect x="10" y="15" width="105" height="100" rx="10" className="fill-cyan-50 dark:fill-cyan-950/40 stroke-cyan-300 dark:stroke-cyan-700" strokeWidth="1.5" />
        <text x="62" y="35" textAnchor="middle" className="fill-cyan-700 dark:fill-cyan-300 font-black text-xs">Szorzás (·)</text>
        <text x="62" y="58" textAnchor="middle" className="fill-cyan-900 dark:fill-cyan-200 font-mono font-bold text-xs">a/b · c/d</text>
        <line x1="30" y1="68" x2="95" y2="68" className="stroke-cyan-300" />
        <text x="62" y="85" textAnchor="middle" className="fill-cyan-800 dark:fill-cyan-200 font-mono font-black text-xs">(a · c) / (b · d)</text>
        <text x="62" y="103" textAnchor="middle" className="fill-cyan-600 dark:fill-cyan-400 text-[9px] font-bold">Egyszerűsíts előtte!</text>

        {/* Osztás kártya */}
        <rect x="125" y="15" width="105" height="100" rx="10" className="fill-purple-50 dark:fill-purple-950/40 stroke-purple-300 dark:stroke-purple-700" strokeWidth="1.5" />
        <text x="177" y="35" textAnchor="middle" className="fill-purple-700 dark:fill-purple-300 font-black text-xs">Osztás (:)</text>
        <text x="177" y="58" textAnchor="middle" className="fill-purple-900 dark:fill-purple-200 font-mono font-bold text-xs">a/b : c/d</text>
        <line x1="145" y1="68" x2="210" y2="68" className="stroke-purple-300" />
        <text x="177" y="85" textAnchor="middle" className="fill-purple-800 dark:fill-purple-200 font-mono font-black text-xs">a/b · d/c</text>
        <text x="177" y="103" textAnchor="middle" className="fill-purple-600 dark:fill-purple-400 text-[9px] font-bold">Reciprokával szorzunk</text>
      </svg>
    </div>
  );
};

/**
 * Törtrész lánc modell (Tankönyvi mazsola/maradék modell) SVG
 */
export const FractionPartChainSvg: React.FC<{ size?: number; className?: string }> = ({
  size = 220,
  className = ''
}) => {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 260 120"
        style={{ width: size, height: (size * 120) / 260 }}
        className="overflow-visible select-none drop-shadow-xs"
      >
        <text x="130" y="15" textAnchor="middle" className="fill-slate-600 dark:fill-slate-300 font-bold text-xs">
          Törtrész és Maradék Láncolás
        </text>

        <rect x="10" y="30" width="240" height="28" rx="6" className="fill-slate-100 dark:fill-slate-800 stroke-slate-300" strokeWidth="1.5" />

        {/* 1. rész felhasznált (1/4) */}
        <rect x="10" y="30" width="60" height="28" rx="6" className="fill-blue-500/80" />
        <text x="40" y="48" textAnchor="middle" className="fill-white font-mono font-bold text-[10px]">
          1/4 elment
        </text>

        {/* 2. rész a maradékból (a maradék 3/4 fele = 3/8) */}
        <rect x="70" y="30" width="90" height="28" className="fill-emerald-500/80" />
        <text x="115" y="48" textAnchor="middle" className="fill-white font-mono font-bold text-[10px]">
          Maradék 1/2-e
        </text>

        {/* Maradvány */}
        <rect x="160" y="30" width="90" height="28" rx="6" className="fill-amber-500/80" />
        <text x="205" y="48" textAnchor="middle" className="fill-white font-mono font-bold text-[10px]">
          Végső maradék
        </text>

        <text x="130" y="85" textAnchor="middle" className="fill-slate-700 dark:fill-slate-300 text-[11px] font-medium">
          Szabály: &quot;A maradék törtrésze&quot; = szorzás a megmaradt hányaddal!
        </text>
        <text x="130" y="102" textAnchor="middle" className="fill-indigo-600 dark:fill-indigo-400 font-mono text-[10px] font-bold">
          Maradék = Egész · (1 - p₁) · (1 - p₂) ...
        </text>
      </svg>
    </div>
  );
};
