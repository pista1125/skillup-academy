import React from 'react';
import { MathText } from '@/components/math/shared/MathText';

// =========================================================================
// 1. ÁTFOGÓ ELMÉLETI DIAGRAMOK (Theory Diagrams)
// =========================================================================

/**
 * 1. Skatulya-elv (Dirichlet-elv) Diagram
 */
export const PigeonholePrincipleDiagram: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={`p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border-2 border-purple-200/80 dark:border-purple-900/60 shadow-xs ${className || ''}`}>
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <h4 className="font-black text-sm sm:text-base text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span>
          A Skatulya-elv (Dirichlet-elv) Szemléltetése
        </h4>
        <span className="text-[11px] font-bold text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950 px-2.5 py-0.5 rounded-md border border-purple-200 dark:border-purple-800">
          5 galamb / golyó → 4 skatulya = min. 2 egy helyen
        </span>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-around gap-6 py-2">
        {/* SVG Visualization of 4 Boxes and 5 Balls */}
        <div className="flex flex-col items-center">
          <svg viewBox="0 0 340 180" className="w-80 sm:w-96 h-auto select-none overflow-visible">
            {/* Box 1 */}
            <rect x="15" y="70" width="65" height="75" rx="8" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="2.5" strokeDasharray="3 2" className="dark:fill-slate-800 dark:stroke-slate-600" />
            <text x="47.5" y="162" textAnchor="middle" className="text-[11px] font-bold fill-slate-500 dark:fill-slate-400">1. Skatulya</text>
            <circle cx="47.5" cy="107" r="14" fill="#6366f1" className="shadow-md" />
            <text x="47.5" y="112" textAnchor="middle" className="text-xs font-black fill-white">1</text>

            {/* Box 2 */}
            <rect x="95" y="70" width="65" height="75" rx="8" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="2.5" strokeDasharray="3 2" className="dark:fill-slate-800 dark:stroke-slate-600" />
            <text x="127.5" y="162" textAnchor="middle" className="text-[11px] font-bold fill-slate-500 dark:fill-slate-400">2. Skatulya</text>
            <circle cx="127.5" cy="107" r="14" fill="#3b82f6" />
            <text x="127.5" y="112" textAnchor="middle" className="text-xs font-black fill-white">2</text>

            {/* Box 3 (The Box with 2 items!) */}
            <rect x="175" y="65" width="70" height="85" rx="10" fill="#fdf4ff" stroke="#a855f7" strokeWidth="3" className="dark:fill-purple-950/40 dark:stroke-purple-500" />
            <text x="210" y="165" textAnchor="middle" className="text-[11px] font-black fill-purple-700 dark:fill-purple-300">3. Skatulya ⭐</text>
            <circle cx="196" cy="107" r="14" fill="#ec4899" />
            <text x="196" y="112" textAnchor="middle" className="text-xs font-black fill-white">3</text>
            <circle cx="224" cy="107" r="14" fill="#d946ef" />
            <text x="224" y="112" textAnchor="middle" className="text-xs font-black fill-white">5</text>
            <text x="210" y="55" textAnchor="middle" className="text-[10px] font-black fill-purple-600 dark:fill-purple-400 animate-pulse">Legalább 2 db!</text>

            {/* Box 4 */}
            <rect x="260" y="70" width="65" height="75" rx="8" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="2.5" strokeDasharray="3 2" className="dark:fill-slate-800 dark:stroke-slate-600" />
            <text x="292.5" y="162" textAnchor="middle" className="text-[11px] font-bold fill-slate-500 dark:fill-slate-400">4. Skatulya</text>
            <circle cx="292.5" cy="107" r="14" fill="#10b981" />
            <text x="292.5" y="112" textAnchor="middle" className="text-xs font-black fill-white">4</text>

            {/* Top Description / Arrows */}
            <path d="M 170 20 L 170 42 M 165 37 L 170 42 L 175 37" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" fill="none" />
            <text x="170" y="14" textAnchor="middle" className="text-xs font-black fill-slate-700 dark:fill-slate-200">5 golyó szétosztása 4 skatulyába</text>
          </svg>
        </div>

        {/* Text Steps & Rules */}
        <div className="space-y-2.5 text-xs max-w-sm">
          <div className="p-2.5 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800">
            <span className="font-bold text-purple-900 dark:text-purple-200">Képlet: </span>
            <span className="font-mono text-purple-700 dark:text-purple-300 font-bold">⌈N / K⌉ = ⌈5 / 4⌉ = 2</span>
            <p className="text-slate-600 dark:text-slate-300 text-[11px] mt-1">
              Ha több tárgyunk van, mint rekeszünk, a «legrosszabb esetben» (egyenletes elosztás) is legalább egy rekeszbe 2 jut.
            </p>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-[11px]">
            <strong>Alkalmazások:</strong> Születésnapok hónapjai (13 ember → 12 hónap), zoknihúzás a sötétben, skatulya-elvek geometriában.
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * 2. Fa-diagram (Tree Diagram) és Szorzási Szabály
 */
export const TreeDiagram: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={`p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border-2 border-blue-200/80 dark:border-blue-900/60 shadow-xs ${className || ''}`}>
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <h4 className="font-black text-sm sm:text-base text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
          Fa-diagram és Szorzási Szabály
        </h4>
        <span className="text-[11px] font-bold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950 px-2.5 py-0.5 rounded-md border border-blue-200 dark:border-blue-800">
          3 előétel × 2 főétel = 6 lehetséges menü
        </span>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-around gap-6 py-2">
        <svg viewBox="0 0 380 200" className="w-80 sm:w-[400px] h-auto select-none overflow-visible">
          {/* Root Node */}
          <circle cx="30" cy="100" r="14" fill="#0284c7" />
          <text x="30" y="104" textAnchor="middle" className="text-xs font-black fill-white">Start</text>

          {/* Level 1: 3 Appetizers */}
          {/* Branch 1 */}
          <line x1="44" y1="100" x2="140" y2="45" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="140" cy="45" r="13" fill="#3b82f6" />
          <text x="140" y="49" textAnchor="middle" className="text-xs font-bold fill-white">E₁</text>
          <text x="85" y="65" textAnchor="middle" className="text-[10px] font-bold fill-sky-700 dark:fill-sky-300">Leves</text>

          {/* Branch 2 */}
          <line x1="44" y1="100" x2="140" y2="100" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="140" cy="100" r="13" fill="#3b82f6" />
          <text x="140" y="104" textAnchor="middle" className="text-xs font-bold fill-white">E₂</text>
          <text x="92" y="95" textAnchor="middle" className="text-[10px] font-bold fill-sky-700 dark:fill-sky-300">Saláta</text>

          {/* Branch 3 */}
          <line x1="44" y1="100" x2="140" y2="155" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="140" cy="155" r="13" fill="#3b82f6" />
          <text x="140" y="159" textAnchor="middle" className="text-xs font-bold fill-white">E₃</text>
          <text x="85" y="145" textAnchor="middle" className="text-[10px] font-bold fill-sky-700 dark:fill-sky-300">Bruschetta</text>

          {/* Level 2: 2 Main Courses each (6 total outcomes) */}
          {/* From E1 */}
          <line x1="153" y1="45" x2="260" y2="25" stroke="#94a3b8" strokeWidth="1.8" />
          <circle cx="260" cy="25" r="10" fill="#10b981" />
          <text x="260" y="29" textAnchor="middle" className="text-[10px] font-bold fill-white">F₁</text>
          <text x="315" y="29" className="text-xs font-bold fill-slate-700 dark:fill-slate-200">1. Leves + Pizza</text>

          <line x1="153" y1="45" x2="260" y2="65" stroke="#94a3b8" strokeWidth="1.8" />
          <circle cx="260" cy="65" r="10" fill="#10b981" />
          <text x="260" y="69" textAnchor="middle" className="text-[10px] font-bold fill-white">F₂</text>
          <text x="315" y="69" className="text-xs font-bold fill-slate-700 dark:fill-slate-200">2. Leves + Tészta</text>

          {/* From E2 */}
          <line x1="153" y1="100" x2="260" y2="90" stroke="#94a3b8" strokeWidth="1.8" />
          <circle cx="260" cy="90" r="10" fill="#10b981" />
          <text x="260" y="94" textAnchor="middle" className="text-[10px] font-bold fill-white">F₁</text>
          <text x="315" y="94" className="text-xs font-bold fill-slate-700 dark:fill-slate-200">3. Saláta + Pizza</text>

          <line x1="153" y1="100" x2="260" y2="120" stroke="#94a3b8" strokeWidth="1.8" />
          <circle cx="260" cy="120" r="10" fill="#10b981" />
          <text x="260" y="124" textAnchor="middle" className="text-[10px] font-bold fill-white">F₂</text>
          <text x="315" y="124" className="text-xs font-bold fill-slate-700 dark:fill-slate-200">4. Saláta + Tészta</text>

          {/* From E3 */}
          <line x1="153" y1="155" x2="260" y2="145" stroke="#94a3b8" strokeWidth="1.8" />
          <circle cx="260" cy="145" r="10" fill="#10b981" />
          <text x="260" y="149" textAnchor="middle" className="text-[10px] font-bold fill-white">F₁</text>
          <text x="315" y="149" className="text-xs font-bold fill-slate-700 dark:fill-slate-200">5. Bruschetta + Pizza</text>

          <line x1="153" y1="155" x2="260" y2="185" stroke="#94a3b8" strokeWidth="1.8" />
          <circle cx="260" cy="185" r="10" fill="#10b981" />
          <text x="260" y="189" textAnchor="middle" className="text-[10px] font-bold fill-white">F₂</text>
          <text x="315" y="189" className="text-xs font-bold fill-slate-700 dark:fill-slate-200">6. Bruschetta + Tészta</text>
        </svg>

        <div className="space-y-2.5 text-xs max-w-xs">
          <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800">
            <div className="font-bold text-blue-900 dark:text-blue-200">Szorzási Szabály:</div>
            <div className="font-mono text-sm font-black text-blue-700 dark:text-blue-300 mt-0.5">3 × 2 = 6 eset</div>
          </div>
          <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
            Ha az 1. döntést <em>p</em> módon, a 2. döntést <em>q</em> módon tehetjük meg, az egymás utáni választások száma <strong>p · q</strong>.
          </p>
        </div>
      </div>
    </div>
  );
};

/**
 * 3. Venn-diagram és a Szita-formula (|A ∪ B| = |A| + |B| - |A ∩ B|)
 */
export const VennDiagram: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={`p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border-2 border-emerald-200/80 dark:border-emerald-900/60 shadow-xs ${className || ''}`}>
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <h4 className="font-black text-sm sm:text-base text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
          Két Halmaz Uniója és a Szita-formula
        </h4>
        <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950 px-2.5 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-800">
          |A ∪ B| = |A| + |B| - |A ∩ B|
        </span>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-around gap-6 py-2">
        <svg viewBox="0 0 320 180" className="w-72 sm:w-80 h-auto select-none overflow-visible">
          {/* Universal set box */}
          <rect x="10" y="10" width="300" height="160" rx="12" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" className="dark:fill-slate-850 dark:stroke-slate-700" />
          <text x="25" y="32" className="text-xs font-black fill-slate-400">U (Alaphalmaz)</text>

          {/* Set A Circle */}
          <circle cx="110" cy="95" r="55" fill="#3b82f6" fillOpacity="0.25" stroke="#2563eb" strokeWidth="2.5" />
          <text x="75" y="95" textAnchor="middle" className="text-sm font-black fill-blue-700 dark:fill-blue-300">A \ B</text>
          <text x="80" y="45" className="text-xs font-black fill-blue-600">A halmaz</text>

          {/* Set B Circle */}
          <circle cx="190" cy="95" r="55" fill="#10b981" fillOpacity="0.25" stroke="#059669" strokeWidth="2.5" />
          <text x="225" y="95" textAnchor="middle" className="text-sm font-black fill-emerald-700 dark:fill-emerald-300">B \ A</text>
          <text x="210" y="45" className="text-xs font-black fill-emerald-600">B halmaz</text>

          {/* Intersection A ∩ B */}
          <text x="150" y="95" textAnchor="middle" className="text-xs font-black fill-purple-700 dark:fill-purple-300">A ∩ B</text>
          <text x="150" y="110" textAnchor="middle" className="text-[10px] font-bold fill-slate-500">(metszet)</text>
        </svg>

        <div className="space-y-2 text-xs max-w-sm">
          <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
            <span className="font-bold text-emerald-900 dark:text-emerald-200">Miért vonjuk le a metszetet?</span>
            <p className="text-slate-600 dark:text-slate-300 text-[11px] mt-1">
              Ha összeadjuk |A| és |B| elemszámát, a közös |A ∩ B| részt <strong>kétszer</strong> számoltuk meg. Ezért egyszer le kell vonni!
            </p>
          </div>
          <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-[11px] text-slate-700 dark:text-slate-200">
            Példa: 20 angolos + 15 németes - 5 mindkettő = <strong>30 diák</strong> beszél nyelvet.
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * 4. Két Dobókocka 6×6-os Kimeneti Rácsa
 */
export const DiceGridDiagram: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={`p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border-2 border-amber-200/80 dark:border-amber-900/60 shadow-xs ${className || ''}`}>
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <h4 className="font-black text-sm sm:text-base text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
          Két Szabályos Dobókocka Kimenetelei (36 Eset)
        </h4>
        <span className="text-[11px] font-bold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950 px-2.5 py-0.5 rounded-md border border-amber-200 dark:border-amber-800">
          6 (piros) × 6 (kék) = 36 számpár
        </span>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-around gap-6 py-2">
        <div className="overflow-x-auto">
          <table className="border-collapse text-xs font-mono text-center">
            <thead>
              <tr>
                <th className="p-1.5 bg-slate-100 dark:bg-slate-800 text-slate-400 font-bold border border-slate-300 dark:border-slate-700">🔴\🔵</th>
                {[1, 2, 3, 4, 5, 6].map(c => (
                  <th key={c} className="p-1.5 bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-black border border-blue-200 dark:border-blue-800 w-10">
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5, 6].map(r => (
                <tr key={r}>
                  <th className="p-1.5 bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 font-black border border-rose-200 dark:border-rose-800">
                    {r}
                  </th>
                  {[1, 2, 3, 4, 5, 6].map(c => {
                    const isDouble = r === c;
                    const sum = r + c;
                    return (
                      <td
                        key={c}
                        className={`p-1.5 border border-slate-200 dark:border-slate-800 text-[11px] ${
                          isDouble
                            ? 'bg-amber-100 dark:bg-amber-950/60 font-black text-amber-800 dark:text-amber-200'
                            : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300'
                        }`}
                        title={`Dobás: (${r}, ${c}) | Összeg = ${sum}`}
                      >
                        {r},{c}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="space-y-2 text-xs max-w-xs">
          <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800">
            <div className="font-bold text-amber-900 dark:text-amber-200">Gyakori Kérdések:</div>
            <ul className="list-disc list-inside space-y-1 text-[11px] text-slate-700 dark:text-slate-300 mt-1">
              <li><strong>Páros dobások (duplák):</strong> 6 db (1,1; 2,2; ...; 6,6)</li>
              <li><strong>Különböző számok:</strong> 36 - 6 = 30 db</li>
              <li><strong>Páros szorzat:</strong> 36 - 9 (páratlanok) = 27 db</li>
              <li><strong>Leggyakoribb összeg:</strong> 7-es összeg (6-féleképpen)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// 2. DEDIKÁLT KVÍZ ÁBRÁK (CountingSolverFigure)
// =========================================================================

export type CountingFigType =
  | 'pigeonhole'
  | 'tree'
  | 'venn_2'
  | 'venn_3'
  | 'dice'
  | 'permutation'
  | 'tournament'
  | 'socks'
  | 'pins'
  | 'grid_path';

export interface CountingSolverFigureProps {
  type: CountingFigType;
  param1?: string | number;
  param2?: string | number;
  param3?: string | number;
  className?: string;
}

export const CountingSolverFigure: React.FC<CountingSolverFigureProps> = ({
  type,
  param1,
  param2,
  param3,
  className
}) => {
  switch (type) {
    case 'pigeonhole':
      return (
        <svg viewBox="0 0 240 100" className={`w-64 sm:w-72 h-auto select-none ${className || ''}`}>
          <rect x="10" y="25" width="48" height="55" rx="6" fill="#f8fafc" stroke="#94a3b8" strokeWidth="2" strokeDasharray="3 2" className="dark:fill-slate-800 dark:stroke-slate-600" />
          <circle cx="34" cy="52" r="10" fill="#6366f1" />
          <text x="34" y="56" textAnchor="middle" className="text-[10px] font-bold fill-white">1</text>

          <rect x="68" y="25" width="48" height="55" rx="6" fill="#f8fafc" stroke="#94a3b8" strokeWidth="2" strokeDasharray="3 2" className="dark:fill-slate-800 dark:stroke-slate-600" />
          <circle cx="92" cy="52" r="10" fill="#3b82f6" />
          <text x="92" y="56" textAnchor="middle" className="text-[10px] font-bold fill-white">2</text>

          <rect x="126" y="20" width="52" height="65" rx="8" fill="#fdf4ff" stroke="#c084fc" strokeWidth="2.5" className="dark:fill-purple-950/40" />
          <circle cx="143" cy="52" r="9" fill="#ec4899" />
          <circle cx="161" cy="52" r="9" fill="#d946ef" />
          <text x="152" y="14" textAnchor="middle" className="text-[9px] font-black fill-purple-600 dark:fill-purple-300">min. 2 db</text>

          <rect x="186" y="25" width="48" height="55" rx="6" fill="#f8fafc" stroke="#94a3b8" strokeWidth="2" strokeDasharray="3 2" className="dark:fill-slate-800 dark:stroke-slate-600" />
          <circle cx="210" cy="52" r="10" fill="#10b981" />
          <text x="210" y="56" textAnchor="middle" className="text-[10px] font-bold fill-white">4</text>
        </svg>
      );

    case 'tree':
      return (
        <svg viewBox="0 0 240 100" className={`w-64 sm:w-72 h-auto select-none ${className || ''}`}>
          <circle cx="25" cy="50" r="10" fill="#0284c7" />
          <text x="25" y="54" textAnchor="middle" className="text-[9px] font-bold fill-white">S</text>

          <line x1="35" y1="50" x2="95" y2="25" stroke="#38bdf8" strokeWidth="2" />
          <circle cx="95" cy="25" r="9" fill="#3b82f6" />
          <text x="95" y="28" textAnchor="middle" className="text-[9px] font-bold fill-white">A</text>

          <line x1="35" y1="50" x2="95" y2="75" stroke="#38bdf8" strokeWidth="2" />
          <circle cx="95" cy="75" r="9" fill="#3b82f6" />
          <text x="95" y="78" textAnchor="middle" className="text-[9px] font-bold fill-white">B</text>

          {/* 4 outcomes */}
          <line x1="104" y1="25" x2="165" y2="15" stroke="#94a3b8" strokeWidth="1.5" />
          <circle cx="165" cy="15" r="7" fill="#10b981" />
          <text x="185" y="18" className="text-[10px] font-mono font-bold fill-slate-700 dark:fill-slate-200">A₁</text>

          <line x1="104" y1="25" x2="165" y2="35" stroke="#94a3b8" strokeWidth="1.5" />
          <circle cx="165" cy="35" r="7" fill="#10b981" />
          <text x="185" y="38" className="text-[10px] font-mono font-bold fill-slate-700 dark:fill-slate-200">A₂</text>

          <line x1="104" y1="75" x2="165" y2="65" stroke="#94a3b8" strokeWidth="1.5" />
          <circle cx="165" cy="65" r="7" fill="#10b981" />
          <text x="185" y="68" className="text-[10px] font-mono font-bold fill-slate-700 dark:fill-slate-200">B₁</text>

          <line x1="104" y1="75" x2="165" y2="85" stroke="#94a3b8" strokeWidth="1.5" />
          <circle cx="165" cy="85" r="7" fill="#10b981" />
          <text x="185" y="88" className="text-[10px] font-mono font-bold fill-slate-700 dark:fill-slate-200">B₂</text>
        </svg>
      );

    case 'venn_2':
      return (
        <svg viewBox="0 0 200 100" className={`w-56 sm:w-64 h-auto select-none ${className || ''}`}>
          <rect x="5" y="5" width="190" height="90" rx="8" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" className="dark:fill-slate-850 dark:stroke-slate-700" />
          <circle cx="75" cy="50" r="35" fill="#3b82f6" fillOpacity="0.25" stroke="#2563eb" strokeWidth="2" />
          <text x="55" y="54" textAnchor="middle" className="text-xs font-black fill-blue-700 dark:fill-blue-300">A</text>

          <circle cx="125" cy="50" r="35" fill="#10b981" fillOpacity="0.25" stroke="#059669" strokeWidth="2" />
          <text x="145" y="54" textAnchor="middle" className="text-xs font-black fill-emerald-700 dark:fill-emerald-300">B</text>

          <text x="100" y="54" textAnchor="middle" className="text-[11px] font-mono font-black fill-purple-700 dark:fill-purple-300">A∩B</text>
        </svg>
      );

    case 'venn_3':
      return (
        <svg viewBox="0 0 220 120" className={`w-60 sm:w-68 h-auto select-none ${className || ''}`}>
          <rect x="5" y="5" width="210" height="110" rx="8" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" className="dark:fill-slate-850 dark:stroke-slate-700" />
          <circle cx="85" cy="50" r="32" fill="#3b82f6" fillOpacity="0.2" stroke="#2563eb" strokeWidth="1.8" />
          <circle cx="135" cy="50" r="32" fill="#10b981" fillOpacity="0.2" stroke="#059669" strokeWidth="1.8" />
          <circle cx="110" cy="80" r="32" fill="#f59e0b" fillOpacity="0.2" stroke="#d97706" strokeWidth="1.8" />
          <text x="65" y="45" className="text-[10px] font-black fill-blue-700">A</text>
          <text x="145" y="45" className="text-[10px] font-black fill-emerald-700">B</text>
          <text x="110" y="105" textAnchor="middle" className="text-[10px] font-black fill-amber-700">C</text>
          <text x="110" y="62" textAnchor="middle" className="text-[9px] font-black fill-purple-800 dark:fill-purple-300">A∩B∩C</text>
        </svg>
      );

    case 'dice':
      return (
        <svg viewBox="0 0 160 80" className={`w-44 sm:w-52 h-auto select-none ${className || ''}`}>
          {/* Die 1 (Red) */}
          <rect x="15" y="15" width="50" height="50" rx="8" fill="#fee2e2" stroke="#ef4444" strokeWidth="2.5" />
          <circle cx="30" cy="30" r="3.5" fill="#ef4444" />
          <circle cx="50" cy="50" r="3.5" fill="#ef4444" />
          <circle cx="40" cy="40" r="3.5" fill="#ef4444" />

          {/* Die 2 (Blue) */}
          <rect x="95" y="15" width="50" height="50" rx="8" fill="#dbeafe" stroke="#3b82f6" strokeWidth="2.5" />
          <circle cx="110" cy="30" r="3.5" fill="#3b82f6" />
          <circle cx="130" cy="30" r="3.5" fill="#3b82f6" />
          <circle cx="110" cy="50" r="3.5" fill="#3b82f6" />
          <circle cx="130" cy="50" r="3.5" fill="#3b82f6" />
          <circle cx="120" cy="40" r="3.5" fill="#3b82f6" />
        </svg>
      );

    case 'permutation':
      return (
        <svg viewBox="0 0 240 70" className={`w-64 sm:w-72 h-auto select-none ${className || ''}`}>
          {/* 4 slots */}
          {[0, 1, 2, 3].map((idx) => (
            <g key={idx}>
              <rect x={15 + idx * 55} y="10" width="45" height="45" rx="8" fill="#f8fafc" stroke="#6366f1" strokeWidth="2" className="dark:fill-slate-800" />
              <text x={37.5 + idx * 55} y="38" textAnchor="middle" className="text-base font-mono font-black fill-indigo-600 dark:fill-indigo-300">
                {4 - idx}
              </text>
              {idx < 3 && (
                <text x={65 + idx * 55} y="38" textAnchor="middle" className="text-base font-black fill-slate-400">
                  ·
                </text>
              )}
            </g>
          ))}
          <text x="120" y="65" textAnchor="middle" className="text-[10px] font-bold fill-slate-500">4! = 4 · 3 · 2 · 1 = 24</text>
        </svg>
      );

    case 'tournament':
      return (
        <svg viewBox="0 0 140 100" className={`w-36 sm:w-44 h-auto select-none ${className || ''}`}>
          {/* 4 nodes in rectangle with all edges */}
          <line x1="30" y1="20" x2="110" y2="20" stroke="#94a3b8" strokeWidth="1.5" />
          <line x1="110" y1="20" x2="110" y2="80" stroke="#94a3b8" strokeWidth="1.5" />
          <line x1="110" y1="80" x2="30" y2="80" stroke="#94a3b8" strokeWidth="1.5" />
          <line x1="30" y1="80" x2="30" y2="20" stroke="#94a3b8" strokeWidth="1.5" />
          <line x1="30" y1="20" x2="110" y2="80" stroke="#a855f7" strokeWidth="2" strokeDasharray="2 2" />
          <line x1="110" y1="20" x2="30" y2="80" stroke="#a855f7" strokeWidth="2" strokeDasharray="2 2" />

          <circle cx="30" cy="20" r="8" fill="#3b82f6" />
          <text x="30" y="23" textAnchor="middle" className="text-[9px] font-bold fill-white">A</text>
          <circle cx="110" cy="20" r="8" fill="#3b82f6" />
          <text x="110" y="23" textAnchor="middle" className="text-[9px] font-bold fill-white">B</text>
          <circle cx="110" cy="80" r="8" fill="#3b82f6" />
          <text x="110" y="83" textAnchor="middle" className="text-[9px] font-bold fill-white">C</text>
          <circle cx="30" cy="80" r="8" fill="#3b82f6" />
          <text x="30" y="83" textAnchor="middle" className="text-[9px] font-bold fill-white">D</text>
        </svg>
      );

    default:
      return null;
  }
};

// =========================================================================
// 3. MINI ÁBRÁK PÁROSÍTÓHOZ ÉS CSOPORTOSÍTÓHOZ (CountingMatcherFigure)
// =========================================================================

export type MiniFigType =
  | 'pigeonhole'
  | 'tree'
  | 'venn'
  | 'dice'
  | 'permutation'
  | 'tournament'
  | 'complement'
  | 'socks'
  | 'cards'
  | 'subsets'
  | 'pins';

export interface CountingMatcherFigureProps {
  type: MiniFigType;
  size?: number;
  className?: string;
}

export const CountingMatcherFigure: React.FC<CountingMatcherFigureProps> = ({
  type,
  size = 36,
  className
}) => {
  switch (type) {
    case 'pigeonhole':
      return (
        <svg width={size} height={size} viewBox="0 0 40 40" className={`shrink-0 ${className || ''}`}>
          <rect x="4" y="8" width="14" height="24" rx="3" fill="#e0e7ff" stroke="#6366f1" strokeWidth="1.5" />
          <rect x="22" y="8" width="14" height="24" rx="3" fill="#fae8ff" stroke="#d946ef" strokeWidth="2" />
          <circle cx="11" cy="20" r="3.5" fill="#4f46e5" />
          <circle cx="26" cy="15" r="3" fill="#ec4899" />
          <circle cx="32" cy="25" r="3" fill="#a855f7" />
        </svg>
      );

    case 'tree':
      return (
        <svg width={size} height={size} viewBox="0 0 40 40" className={`shrink-0 ${className || ''}`}>
          <circle cx="8" cy="20" r="3.5" fill="#0284c7" />
          <line x1="12" y1="20" x2="22" y2="12" stroke="#0284c7" strokeWidth="1.5" />
          <line x1="12" y1="20" x2="22" y2="28" stroke="#0284c7" strokeWidth="1.5" />
          <circle cx="22" cy="12" r="3" fill="#38bdf8" />
          <circle cx="22" cy="28" r="3" fill="#38bdf8" />
          <line x1="25" y1="12" x2="34" y2="8" stroke="#94a3b8" strokeWidth="1.2" />
          <line x1="25" y1="12" x2="34" y2="16" stroke="#94a3b8" strokeWidth="1.2" />
          <circle cx="34" cy="8" r="2.5" fill="#10b981" />
          <circle cx="34" cy="16" r="2.5" fill="#10b981" />
        </svg>
      );

    case 'venn':
      return (
        <svg width={size} height={size} viewBox="0 0 40 40" className={`shrink-0 ${className || ''}`}>
          <circle cx="16" cy="20" r="11" fill="#3b82f6" fillOpacity="0.35" stroke="#2563eb" strokeWidth="1.5" />
          <circle cx="24" cy="20" r="11" fill="#10b981" fillOpacity="0.35" stroke="#059669" strokeWidth="1.5" />
          <path d="M 20 11.5 A 11 11 0 0 0 20 28.5 A 11 11 0 0 0 20 11.5" fill="#8b5cf6" fillOpacity="0.6" />
        </svg>
      );

    case 'dice':
      return (
        <svg width={size} height={size} viewBox="0 0 40 40" className={`shrink-0 ${className || ''}`}>
          <rect x="5" y="5" width="18" height="18" rx="3" fill="#fee2e2" stroke="#ef4444" strokeWidth="1.5" />
          <circle cx="14" cy="14" r="2" fill="#ef4444" />
          <rect x="17" y="17" width="18" height="18" rx="3" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1.5" />
          <circle cx="21" cy="21" r="1.5" fill="#3b82f6" />
          <circle cx="31" cy="31" r="1.5" fill="#3b82f6" />
          <circle cx="26" cy="26" r="1.5" fill="#3b82f6" />
        </svg>
      );

    case 'permutation':
      return (
        <svg width={size} height={size} viewBox="0 0 40 40" className={`shrink-0 ${className || ''}`}>
          <rect x="4" y="12" width="9" height="16" rx="2" fill="#e0e7ff" stroke="#6366f1" strokeWidth="1.2" />
          <rect x="15" y="12" width="9" height="16" rx="2" fill="#e0e7ff" stroke="#6366f1" strokeWidth="1.2" />
          <rect x="26" y="12" width="9" height="16" rx="2" fill="#e0e7ff" stroke="#6366f1" strokeWidth="1.2" />
          <text x="8.5" y="24" textAnchor="middle" className="text-[9px] font-black fill-indigo-600">3</text>
          <text x="19.5" y="24" textAnchor="middle" className="text-[9px] font-black fill-indigo-600">2</text>
          <text x="30.5" y="24" textAnchor="middle" className="text-[9px] font-black fill-indigo-600">1</text>
        </svg>
      );

    case 'tournament':
      return (
        <svg width={size} height={size} viewBox="0 0 40 40" className={`shrink-0 ${className || ''}`}>
          <line x1="10" y1="10" x2="30" y2="10" stroke="#94a3b8" strokeWidth="1.2" />
          <line x1="30" y1="10" x2="30" y2="30" stroke="#94a3b8" strokeWidth="1.2" />
          <line x1="30" y1="30" x2="10" y2="30" stroke="#94a3b8" strokeWidth="1.2" />
          <line x1="10" y1="30" x2="10" y2="10" stroke="#94a3b8" strokeWidth="1.2" />
          <line x1="10" y1="10" x2="30" y2="30" stroke="#a855f7" strokeWidth="1.2" />
          <line x1="30" y1="10" x2="10" y2="30" stroke="#a855f7" strokeWidth="1.2" />
          <circle cx="10" cy="10" r="3" fill="#3b82f6" />
          <circle cx="30" cy="10" r="3" fill="#3b82f6" />
          <circle cx="30" cy="30" r="3" fill="#3b82f6" />
          <circle cx="10" cy="30" r="3" fill="#3b82f6" />
        </svg>
      );

    case 'complement':
      return (
        <svg width={size} height={size} viewBox="0 0 40 40" className={`shrink-0 ${className || ''}`}>
          <rect x="4" y="6" width="32" height="28" rx="4" fill="#f1f5f9" stroke="#64748b" strokeWidth="1.5" />
          <circle cx="20" cy="20" r="8" fill="#fee2e2" stroke="#ef4444" strokeWidth="1.5" />
          <text x="20" y="23" textAnchor="middle" className="text-[8px] font-black fill-rose-600">✕</text>
        </svg>
      );

    case 'socks':
      return (
        <svg width={size} height={size} viewBox="0 0 40 40" className={`shrink-0 ${className || ''}`}>
          <path d="M 12 8 L 12 22 C 12 26 16 28 20 28 L 24 28 C 26 28 28 26 28 24 L 28 22 C 28 20 26 20 24 20 L 18 20 L 18 8 Z" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="1.5" />
        </svg>
      );

    case 'pins':
      return (
        <svg width={size} height={size} viewBox="0 0 40 40" className={`shrink-0 ${className || ''}`}>
          <rect x="6" y="10" width="28" height="20" rx="4" fill="#f8fafc" stroke="#475569" strokeWidth="1.5" />
          <circle cx="13" cy="20" r="2.5" fill="#0f172a" />
          <circle cx="20" cy="20" r="2.5" fill="#0f172a" />
          <circle cx="27" cy="20" r="2.5" fill="#0f172a" />
        </svg>
      );

    default:
      return null;
  }
};
