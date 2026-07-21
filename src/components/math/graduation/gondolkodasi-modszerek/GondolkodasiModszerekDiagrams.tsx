import React from 'react';

interface VennTwoSetsProps {
  title?: string;
  highlight?: 'intersection' | 'union' | 'difference' | 'none';
  labelA?: string;
  labelB?: string;
}

export function VennTwoSets({
  title = "Két halmaz metszete és uniója",
  highlight = 'none',
  labelA = "A halmaz",
  labelB = "B halmaz"
}: VennTwoSetsProps) {
  return (
    <div className="my-6 p-5 bg-gradient-to-br from-slate-50 to-purple-50/40 rounded-2xl border border-purple-100 shadow-sm flex flex-col items-center text-center">
      <h4 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-purple-600 inline-block" />
        {title}
      </h4>
      <div className="w-full max-w-md aspect-[16/9] relative flex items-center justify-center">
        <svg viewBox="0 0 400 220" className="w-full h-full drop-shadow-xs">
          <defs>
            {/* Gradients for Set A and Set B */}
            <linearGradient id="gradA" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0.35" />
            </linearGradient>
            <linearGradient id="gradB" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.35" />
            </linearGradient>
            <linearGradient id="gradIntersect" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a855f7" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.75" />
            </linearGradient>
          </defs>

          {/* Universal Set Container */}
          <rect x="10" y="10" width="380" height="200" rx="16" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="4 4" />
          <text x="25" y="32" fill="#64748b" fontSize="12" fontWeight="bold">U (Alaphalmaz)</text>

          {/* Set A Circle */}
          <circle
            cx="150"
            cy="115"
            r="70"
            fill={highlight === 'difference' ? 'url(#gradA)' : (highlight === 'union' ? 'url(#gradA)' : 'url(#gradA)')}
            stroke="#7c3aed"
            strokeWidth={highlight === 'difference' ? '3' : '2'}
            className="transition-all duration-300"
          />

          {/* Set B Circle */}
          <circle
            cx="250"
            cy="115"
            r="70"
            fill={highlight === 'union' ? 'url(#gradB)' : 'url(#gradB)'}
            stroke="#2563eb"
            strokeWidth="2"
            className="transition-all duration-300"
          />

          {/* Overlap / Intersection highlight */}
          {highlight === 'intersection' && (
            <path
              d="M 200 65 A 70 70 0 0 1 200 165 A 70 70 0 0 1 200 65 Z"
              fill="url(#gradIntersect)"
              stroke="#9333ea"
              strokeWidth="2.5"
            />
          )}

          {/* Labels */}
          <text x="115" y="115" fill="#4c1d95" fontSize="14" fontWeight="800" textAnchor="middle">{labelA}</text>
          <text x="285" y="115" fill="#1e3a8a" fontSize="14" fontWeight="800" textAnchor="middle">{labelB}</text>

          {/* Intersection label */}
          <text x="200" y="120" fill="#312e81" fontSize="13" fontWeight="900" textAnchor="middle">
            A ∩ B
          </text>
        </svg>
      </div>
      <div className="flex flex-wrap justify-center gap-3 mt-3 text-xs font-semibold">
        <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full border border-purple-200">
          A (Bal kör)
        </span>
        <span className="px-3 py-1 bg-indigo-100 text-indigo-900 rounded-full border border-indigo-200 font-bold">
          A ∩ B (Közös metszet)
        </span>
        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full border border-blue-200">
          B (Jobb kör)
        </span>
      </div>
    </div>
  );
}

export function VennClassProblem() {
  return (
    <div className="my-6 p-5 bg-gradient-to-br from-purple-50/70 via-white to-blue-50/70 rounded-2xl border border-purple-200 shadow-sm flex flex-col items-center text-center">
      <div className="flex items-center gap-2 mb-2">
        <span className="px-2.5 py-0.5 bg-purple-600 text-white text-[10px] font-black uppercase tracking-wider rounded-full">
          Ábrázolás Venn-diagrammal
        </span>
        <h4 className="text-sm font-bold text-slate-800">Osztálylétszám Feladat ($U = 30$ fő)</h4>
      </div>
      <p className="text-xs text-slate-500 mb-4 max-w-lg">
        Az alábbi Venn-diagram szemlélteti az Angol ($A$) és Német ($N$) nyelvet tanuló diákok eloszlását.
      </p>

      <div className="w-full max-w-md aspect-[16/9] relative flex items-center justify-center">
        <svg viewBox="0 0 420 230" className="w-full h-full drop-shadow-sm">
          <defs>
            <linearGradient id="gradAngol" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a855f7" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0.25" />
            </linearGradient>
            <linearGradient id="gradNemet" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#0284c7" stopOpacity="0.25" />
            </linearGradient>
          </defs>

          {/* Universal Set Rectangle */}
          <rect x="10" y="10" width="400" height="210" rx="18" fill="#faf5ff" stroke="#a855f7" strokeWidth="2" strokeDasharray="5 5" />
          <text x="25" y="32" fill="#7e22ce" fontSize="13" fontWeight="900">U = 30 fő (Teljes osztály)</text>

          {/* English Circle */}
          <circle cx="155" cy="120" r="75" fill="url(#gradAngol)" stroke="#9333ea" strokeWidth="2.5" />
          <text x="110" y="80" fill="#6b21a8" fontSize="14" fontWeight="900">Angol (A)</text>
          <text x="110" y="100" fill="#7e22ce" fontSize="11" fontWeight="bold">Összesen: 20 fő</text>

          {/* German Circle */}
          <circle cx="265" cy="120" r="75" fill="url(#gradNemet)" stroke="#2563eb" strokeWidth="2.5" />
          <text x="310" y="80" fill="#1e40af" fontSize="14" fontWeight="900">Német (N)</text>
          <text x="310" y="100" fill="#1d4ed8" fontSize="11" fontWeight="bold">Összesen: 12 fő</text>

          {/* Exclusive A count */}
          <text x="120" y="130" fill="#581c87" fontSize="20" fontWeight="900" textAnchor="middle">13</text>
          <text x="120" y="146" fill="#7e22ce" fontSize="10" fontWeight="bold" textAnchor="middle">Csak angol</text>

          {/* Intersection count */}
          <text x="210" y="125" fill="#311b92" fontSize="22" fontWeight="900" textAnchor="middle">7</text>
          <text x="210" y="142" fill="#4338ca" fontSize="10" fontWeight="extrabold" textAnchor="middle">Mindkettő</text>
          <text x="210" y="154" fill="#4338ca" fontSize="9" fontWeight="bold" textAnchor="middle">(A ∩ N)</text>

          {/* Exclusive N count */}
          <text x="300" y="130" fill="#1e3a8a" fontSize="20" fontWeight="900" textAnchor="middle">5</text>
          <text x="300" y="146" fill="#1d4ed8" fontSize="10" fontWeight="bold" textAnchor="middle">Csak német</text>

          {/* Outside count */}
          <g transform="translate(320, 175)">
            <rect x="0" y="0" width="80" height="34" rx="10" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.5" />
            <text x="40" y="16" fill="#475569" fontSize="12" fontWeight="900" textAnchor="middle">5 fő</text>
            <text x="40" y="27" fill="#64748b" fontSize="9" fontWeight="bold" textAnchor="middle">Egyik sem</text>
          </g>
        </svg>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full mt-4 text-xs font-semibold">
        <div className="p-2 bg-purple-100/80 text-purple-900 rounded-xl border border-purple-200">
          <span className="block font-black text-sm">13 fő</span>
          <span className="text-[10px] text-purple-700">Csak Angol ($20 - 7$)</span>
        </div>
        <div className="p-2 bg-indigo-100 text-indigo-950 rounded-xl border border-indigo-300 shadow-xs">
          <span className="block font-black text-sm text-indigo-700">7 fő</span>
          <span className="text-[10px] text-indigo-800">Mindkettő ($A \cap N$)</span>
        </div>
        <div className="p-2 bg-blue-100/80 text-blue-900 rounded-xl border border-blue-200">
          <span className="block font-black text-sm">5 fő</span>
          <span className="text-[10px] text-blue-700">Csak Német ($12 - 7$)</span>
        </div>
        <div className="p-2 bg-slate-100 text-slate-800 rounded-xl border border-slate-200">
          <span className="block font-black text-sm">5 fő</span>
          <span className="text-[10px] text-slate-500">Egyik sem ($30 - 25$)</span>
        </div>
      </div>
    </div>
  );
}

export function Graph5NodesDiagram() {
  return (
    <div className="my-6 p-5 bg-gradient-to-br from-slate-50 to-emerald-50/40 rounded-2xl border border-emerald-100 shadow-sm flex flex-col items-center text-center">
      <h4 className="text-sm font-bold text-slate-800 mb-2 flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 inline-block" />
        Gráf fokszámok ábrázolása (5 csúcsú gráf)
      </h4>
      <p className="text-xs text-slate-500 mb-3">
        Fokszámok: $3, 3, 3, 2, 1$ (Fokszámok összege: $3+3+3+2+1 = 12 = 2 \cdot 6$ él)
      </p>

      <div className="w-full max-w-sm aspect-[4/3] relative">
        <svg viewBox="0 0 300 220" className="w-full h-full">
          {/* Edges */}
          <line x1="150" y1="40" x2="60" y2="100" stroke="#10b981" strokeWidth="2.5" />
          <line x1="150" y1="40" x2="240" y2="100" stroke="#10b981" strokeWidth="2.5" />
          <line x1="150" y1="40" x2="90" y2="180" stroke="#10b981" strokeWidth="2.5" />
          
          <line x1="60" y1="100" x2="90" y2="180" stroke="#10b981" strokeWidth="2.5" />
          <line x1="60" y1="100" x2="210" y2="180" stroke="#10b981" strokeWidth="2.5" />
          
          <line x1="240" y1="100" x2="210" y2="180" stroke="#10b981" strokeWidth="2.5" />

          {/* Node A */}
          <circle cx="150" cy="40" r="18" fill="#10b981" stroke="#047857" strokeWidth="2" />
          <text x="150" y="44" fill="#ffffff" fontSize="12" fontWeight="900" textAnchor="middle">A (3)</text>

          {/* Node B */}
          <circle cx="60" cy="100" r="18" fill="#10b981" stroke="#047857" strokeWidth="2" />
          <text x="60" y="104" fill="#ffffff" fontSize="12" fontWeight="900" textAnchor="middle">B (3)</text>

          {/* Node C */}
          <circle cx="240" cy="100" r="18" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="2" />
          <text x="240" y="104" fill="#ffffff" fontSize="12" fontWeight="900" textAnchor="middle">C (2)</text>

          {/* Node D */}
          <circle cx="90" cy="180" r="18" fill="#10b981" stroke="#047857" strokeWidth="2" />
          <text x="90" y="184" fill="#ffffff" fontSize="12" fontWeight="900" textAnchor="middle">D (3)</text>

          {/* Node E */}
          <circle cx="210" cy="180" r="18" fill="#f59e0b" stroke="#b45309" strokeWidth="2" />
          <text x="210" y="184" fill="#ffffff" fontSize="12" fontWeight="900" textAnchor="middle">E (1)</text>
        </svg>
      </div>
      <div className="mt-2 text-xs text-slate-600 font-semibold">
        Összesen 6 él összeköti az 5 csúcsot. A páratlan fokszámú csúcsok száma 4 (páros).
      </div>
    </div>
  );
}
