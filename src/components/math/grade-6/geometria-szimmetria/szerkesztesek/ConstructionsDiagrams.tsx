import React from 'react';
import { MathText } from '@/components/math/shared/MathText';

// =========================================================================
// 1. ÁTFOGÓ ELMÉLETI DIAGRAMOK (Theory Diagrams)
// =========================================================================

/**
 * 1. Szögfelező szerkesztése (Körző és vonalzó)
 */
export const AngleBisectorConstructionDiagram: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={`p-4 rounded-2xl bg-white dark:bg-slate-900 border-2 border-indigo-200/80 dark:border-slate-800 shadow-sm ${className || ''}`}>
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-black text-sm text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span>
          Szögfelező szerkesztése körzővel és vonalzóval (f_α)
        </h4>
        <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950 px-2 py-0.5 rounded-md border border-indigo-200 dark:border-indigo-800">
          f_α felezi a szöget: α₁ = α₂ = α/2
        </span>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-around gap-6 py-2">
        <div className="flex flex-col items-center">
          <svg viewBox="0 0 280 200" className="w-72 sm:w-80 h-auto select-none overflow-visible">
            {/* Vertex O */}
            <circle cx="35" cy="155" r="4.5" fill="#4f46e5" />
            <text x="22" y="165" className="text-xs font-black fill-indigo-700 dark:fill-indigo-400">O</text>

            {/* Arm 1 (horizontal) */}
            <line x1="35" y1="155" x2="250" y2="155" stroke="#0284c7" strokeWidth="3" strokeLinecap="round" />
            <text x="255" y="159" className="text-xs font-black fill-sky-700 dark:fill-sky-400">a</text>

            {/* Arm 2 (angle approx 50 deg) */}
            <line x1="35" y1="155" x2="195" y2="35" stroke="#0284c7" strokeWidth="3" strokeLinecap="round" />
            <text x="202" y="35" className="text-xs font-black fill-sky-700 dark:fill-sky-400">b</text>

            {/* Initial Arc from O (radius R=70) */}
            <path d="M 105 155 A 70 70 0 0 0 80 101" fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 3" />
            <circle cx="105" cy="155" r="4" fill="#0284c7" />
            <circle cx="80" cy="101" r="4" fill="#0284c7" />
            <text x="105" y="172" textAnchor="middle" className="text-xs font-bold fill-sky-700">P₁</text>
            <text x="70" y="96" textAnchor="middle" className="text-xs font-bold fill-sky-700">P₂</text>

            {/* Intersection Arcs from P1 and P2 (radius r=90) */}
            <path d="M 165 75 A 90 90 0 0 1 185 115" fill="none" stroke="#ea580c" strokeWidth="2" strokeDasharray="3 2" />
            <path d="M 185 75 A 90 90 0 0 0 165 115" fill="none" stroke="#ea580c" strokeWidth="2" strokeDasharray="3 2" />

            {/* Intersection Point M */}
            <circle cx="175" cy="95" r="4.5" fill="#ef4444" />
            <text x="187" y="99" className="text-xs font-black fill-red-600">M</text>

            {/* Bisector Ray from O through M */}
            <line x1="35" y1="155" x2="245" y2="65" stroke="#059669" strokeWidth="2.8" strokeLinecap="round" />
            <text x="250" y="65" className="text-xs font-black italic fill-emerald-600">f_α</text>

            {/* Angle arcs indicating equality */}
            <path d="M 65 155 A 30 30 0 0 0 59 132" fill="none" stroke="#10b981" strokeWidth="1.8" />
            <path d="M 59 132 A 30 30 0 0 0 54 112" fill="none" stroke="#10b981" strokeWidth="1.8" />
            <circle cx="64" cy="144" r="1.2" fill="#10b981" />
            <circle cx="58" cy="122" r="1.2" fill="#10b981" />
          </svg>
        </div>

        <div className="space-y-2.5 text-xs max-w-sm">
          <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <span className="w-5 h-5 rounded-full bg-indigo-500 text-white font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">1</span>
            <p className="text-slate-600 dark:text-slate-300">
              A szög <MathText>O</MathText> csúcsából tetszőleges sugarú körívet húzunk, amely kimetszi a <MathText>P_1</MathText> és <MathText>P_2</MathText> pontokat a szárakon.
            </p>
          </div>
          <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <span className="w-5 h-5 rounded-full bg-indigo-500 text-white font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">2</span>
            <p className="text-slate-600 dark:text-slate-300">
              A <MathText>P_1</MathText> és <MathText>P_2</MathText> pontokból azonos sugarú köríveket rajzolunk a szögtartomány belsejébe, amelyek metszik egymást az <MathText>M</MathText> pontban.
            </p>
          </div>
          <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <span className="w-5 h-5 rounded-full bg-indigo-500 text-white font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">3</span>
            <p className="text-slate-600 dark:text-slate-300">
              Az <MathText>O</MathText> és <MathText>M</MathText> pontokat összekötő félegyenes a szög <strong>szögfelezője</strong> (<MathText>f_\alpha</MathText>).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * 2. Merőleges állítása egyenes adott pontjában
 */
export const PerpendicularFromPointDiagram: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={`p-4 rounded-2xl bg-gradient-to-br from-cyan-50/50 to-teal-50/30 dark:from-slate-850 dark:to-slate-900 border-2 border-cyan-200/80 dark:border-slate-800 shadow-sm ${className || ''}`}>
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-black text-sm text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-600"></span>
          Merőleges állítása egyenes adott P pontjában (e ⊥ m)
        </h4>
        <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-md bg-cyan-100 dark:bg-cyan-950/60 text-cyan-800 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800">
          P a segédszakasz felezőpontja
        </span>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-around gap-6 py-2">
        <div className="flex flex-col items-center">
          <svg viewBox="0 0 280 185" className="w-72 sm:w-80 h-auto select-none overflow-visible">
            {/* Base line e */}
            <line x1="25" y1="120" x2="255" y2="120" stroke="#0284c7" strokeWidth="3" strokeLinecap="round" />
            <text x="260" y="124" className="text-xs font-black fill-sky-700 dark:fill-sky-400">e</text>

            {/* Point P */}
            <circle cx="140" cy="120" r="4.5" fill="#4f46e5" />
            <text x="140" y="140" textAnchor="middle" className="text-xs font-black fill-indigo-700 dark:fill-indigo-300">P</text>

            {/* Step 1: Equal distance points A and B from P */}
            <circle cx="80" cy="120" r="4" fill="#0284c7" />
            <circle cx="200" cy="120" r="4" fill="#0284c7" />
            <text x="80" y="140" textAnchor="middle" className="text-xs font-bold fill-sky-700">A</text>
            <text x="200" y="140" textAnchor="middle" className="text-xs font-bold fill-sky-700">B</text>

            {/* Arcs cutting A and B from P */}
            <path d="M 80 108 A 60 60 0 0 0 80 132" fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3 2" />
            <path d="M 200 108 A 60 60 0 0 1 200 132" fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3 2" />

            {/* Step 2: Bisector arcs from A and B above */}
            <path d="M 130 35 A 85 85 0 0 1 150 75" fill="none" stroke="#ea580c" strokeWidth="2" strokeDasharray="3 2" />
            <path d="M 150 35 A 85 85 0 0 0 130 75" fill="none" stroke="#ea580c" strokeWidth="2" strokeDasharray="3 2" />

            {/* Intersection M */}
            <circle cx="140" cy="55" r="4.5" fill="#ef4444" />
            <text x="152" y="58" className="text-xs font-black fill-red-600">M</text>

            {/* Perpendicular Line m through P and M */}
            <line x1="140" y1="20" x2="140" y2="165" stroke="#059669" strokeWidth="2.8" strokeLinecap="round" />
            <text x="146" y="28" className="text-xs font-black italic fill-emerald-600">m (merőleges)</text>

            {/* Right angle: Hungarian notation (arc + dot) */}
            <path d="M 156 120 A 16 16 0 0 0 140 104" fill="none" stroke="#ef4444" strokeWidth="1.5" />
            <circle cx="146" cy="114" r="1.3" fill="#ef4444" />
          </svg>
        </div>

        <div className="space-y-2.5 text-xs max-w-sm">
          <div className="p-2.5 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
            <span className="font-bold text-cyan-700 dark:text-cyan-300">1. Segédszakasz kijelölése:</span>
            <p className="text-[11px] text-slate-600 dark:text-slate-300">A <MathText>P</MathText> pontból tetszőleges körzőnyílással mindkét irányban körívet rajzolunk az egyenesre (<MathText>A</MathText> és <MathText>B</MathText> pontok).</p>
          </div>
          <div className="p-2.5 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
            <span className="font-bold text-orange-600 dark:text-orange-400">2. Felezőmerőleges szerkesztése:</span>
            <p className="text-[11px] text-slate-600 dark:text-slate-300">Az <MathText>AB</MathText> szakasz <MathText>A</MathText> és <MathText>B</MathText> végpontjaiból azonos sugarú köríveket húzunk, melyek metszik egymást az <MathText>M</MathText> pontban.</p>
          </div>
          <div className="p-2.5 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
            <span className="font-bold text-emerald-700 dark:text-emerald-300">3. Összekötés:</span>
            <p className="text-[11px] text-slate-600 dark:text-slate-300">A <MathText>P</MathText> és <MathText>M</MathText> pontokat összekötő egyenes merőleges az eredeti <MathText>e</MathText> egyenesre (<MathText>m \perp e</MathText>).</p>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * 3. Merőleges bocsátása külső pontból egyenesre
 */
export const PerpendicularFromExternalPointDiagram: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={`p-4 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 shadow-sm ${className || ''}`}>
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-black text-sm text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
          Merőleges bocsátása külső P pontból az egyenesre
        </h4>
        <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-800">
          P ∉ e pontból
        </span>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-around gap-6 py-2">
        <div className="flex flex-col items-center">
          <svg viewBox="0 0 280 190" className="w-72 sm:w-80 h-auto select-none overflow-visible">
            {/* Base line e */}
            <line x1="25" y1="95" x2="255" y2="95" stroke="#0284c7" strokeWidth="3" strokeLinecap="round" />
            <text x="260" y="99" className="text-xs font-black fill-sky-700 dark:fill-sky-400">e</text>

            {/* External Point P */}
            <circle cx="140" cy="30" r="4.5" fill="#9333ea" />
            <text x="140" y="20" textAnchor="middle" className="text-xs font-black fill-purple-700 dark:fill-purple-300">P (külső pont)</text>

            {/* Large Arc from P crossing line e at A and B */}
            <path d="M 75 90 A 80 80 0 0 0 205 90" fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 3" />
            <circle cx="80" cy="95" r="4" fill="#0284c7" />
            <circle cx="200" cy="95" r="4" fill="#0284c7" />
            <text x="75" y="115" textAnchor="middle" className="text-xs font-bold fill-sky-700">A</text>
            <text x="205" y="115" textAnchor="middle" className="text-xs font-bold fill-sky-700">B</text>

            {/* Lower arcs from A and B meeting at M */}
            <path d="M 130 145 A 80 80 0 0 0 150 175" fill="none" stroke="#ea580c" strokeWidth="2" strokeDasharray="3 2" />
            <path d="M 150 145 A 80 80 0 0 1 130 175" fill="none" stroke="#ea580c" strokeWidth="2" strokeDasharray="3 2" />

            {/* Intersection M */}
            <circle cx="140" cy="160" r="4.5" fill="#ef4444" />
            <text x="152" y="165" className="text-xs font-black fill-red-600">M</text>

            {/* Perpendicular Line through P and M */}
            <line x1="140" y1="12" x2="140" y2="180" stroke="#059669" strokeWidth="2.8" strokeLinecap="round" />
            <text x="146" y="55" className="text-xs font-black italic fill-emerald-600">m ⊥ e</text>

            {/* Right angle marker: Hungarian notation */}
            <path d="M 156 95 A 16 16 0 0 0 140 79" fill="none" stroke="#ef4444" strokeWidth="1.5" />
            <circle cx="146" cy="89" r="1.3" fill="#ef4444" />
          </svg>
        </div>

        <div className="space-y-2.5 text-xs max-w-sm">
          <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <span className="w-5 h-5 rounded-full bg-emerald-500 text-white font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">1</span>
            <p className="text-slate-600 dark:text-slate-300">
              A külső <MathText>P</MathText> pontból elég nagy körzőnyílással körívet rajzolunk, amely két pontban (<MathText>A</MathText> és <MathText>B</MathText>) metszi az egyenest.
            </p>
          </div>
          <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <span className="w-5 h-5 rounded-full bg-emerald-500 text-white font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">2</span>
            <p className="text-slate-600 dark:text-slate-300">
              Az <MathText>A</MathText> és <MathText>B</MathText> pontokból az egyenes túloldalára azonos sugarú köríveket húzunk, metszéspontjuk <MathText>M</MathText>.
            </p>
          </div>
          <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <span className="w-5 h-5 rounded-full bg-emerald-500 text-white font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">3</span>
            <p className="text-slate-600 dark:text-slate-300">
              A <MathText>P</MathText> és <MathText>M</MathText> pontokat összekötő egyenes a <MathText>P</MathText>-ből az <MathText>e</MathText>-re bocsátott merőleges.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * 4. Háromszög szerkesztése 3 oldalból
 */
export const TriangleConstructionDiagram: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={`p-4 rounded-2xl bg-gradient-to-br from-amber-50/50 to-orange-50/30 dark:from-slate-850 dark:to-slate-900 border-2 border-amber-200/80 dark:border-slate-800 shadow-sm ${className || ''}`}>
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-black text-sm text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
          Háromszög szerkesztése 3 oldalból (a, b, c)
        </h4>
        <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-md bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
          Háromszög-egyenlőtlenség: a + b &gt; c
        </span>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-around gap-6 py-2">
        <div className="flex flex-col items-center">
          <svg viewBox="0 0 280 185" className="w-72 sm:w-80 h-auto select-none overflow-visible">
            {/* Base side c */}
            <line x1="45" y1="140" x2="235" y2="140" stroke="#0284c7" strokeWidth="3.5" strokeLinecap="round" />
            <circle cx="45" cy="140" r="4.5" fill="#0284c7" />
            <circle cx="235" cy="140" r="4.5" fill="#0284c7" />
            <text x="40" y="160" className="text-xs font-black fill-sky-700 dark:fill-sky-400">A</text>
            <text x="235" y="160" className="text-xs font-black fill-sky-700 dark:fill-sky-400">B</text>
            <text x="140" y="158" textAnchor="middle" className="text-xs font-bold fill-sky-700 font-mono">c oldal (alap)</text>

            {/* Arc from A with radius b */}
            <path d="M 125 30 A 130 130 0 0 1 150 65" fill="none" stroke="#ea580c" strokeWidth="2" strokeDasharray="4 3" />

            {/* Arc from B with radius a */}
            <path d="M 155 30 A 115 115 0 0 0 120 65" fill="none" stroke="#ea580c" strokeWidth="2" strokeDasharray="4 3" />

            {/* Vertex C intersection */}
            <circle cx="135" cy="45" r="5" fill="#ef4444" />
            <text x="135" y="32" textAnchor="middle" className="text-xs font-black fill-red-600">C</text>

            {/* Triangle legs b and a */}
            <line x1="45" y1="140" x2="135" y2="45" stroke="#f59e0b" strokeWidth="2.8" strokeLinecap="round" />
            <line x1="235" y1="140" x2="135" y2="45" stroke="#10b981" strokeWidth="2.8" strokeLinecap="round" />

            <text x="75" y="85" className="text-xs font-bold fill-amber-600 font-mono">b oldal</text>
            <text x="195" y="85" className="text-xs font-bold fill-emerald-600 font-mono">a oldal</text>
          </svg>
        </div>

        <div className="space-y-2 text-xs max-w-sm">
          <div className="p-2.5 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
            <span className="font-bold text-amber-700 dark:text-amber-300">1. Alap felmérése:</span>
            <p className="text-[11px] text-slate-600 dark:text-slate-300">Egy félegyenesre felmérjük a leghosszabb <MathText>c</MathText> oldalt, megkapva az <MathText>A</MathText> és <MathText>B</MathText> csúcsokat.</p>
          </div>
          <div className="p-2.5 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
            <span className="font-bold text-orange-600 dark:text-orange-400">2. Körívek húzása:</span>
            <p className="text-[11px] text-slate-600 dark:text-slate-300"><MathText>A</MathText>-ból <MathText>b</MathText> sugarú, <MathText>B</MathText>-ből <MathText>a</MathText> sugarú körívet rajzolunk.</p>
          </div>
          <div className="p-2.5 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
            <span className="font-bold text-red-600 dark:text-red-400">3. Szerkeszthetőség feltétele:</span>
            <p className="text-[11px] text-slate-600 dark:text-slate-300">A körívek csak akkor metszik egymást, ha bármely két oldal összege nagyobb a harmadiknál: <MathText>a + b &gt; c</MathText>.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// 🎯 DEDIKÁLT KVÍZ ÁBRÁK (Dedicated Figures for Quiz Questions)
// =========================================================================

export const ConstructionsSolverFigure: React.FC<{
  type:
    | 'angle_bisector'
    | 'perpendicular_on_line'
    | 'perpendicular_external'
    | 'parallel_lines'
    | 'triangle_sss'
    | 'triangle_sas'
    | 'angle_60'
    | 'angle_30'
    | 'angle_45'
    | 'triangle_impossible';
  param1?: string;
  param2?: string;
  label?: string;
}> = ({ type, param1, param2, label }) => {
  return (
    <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-gradient-to-b from-slate-50 to-slate-100/70 dark:from-slate-850 dark:to-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-inner">
      <svg viewBox="0 0 180 120" className="w-full max-w-[190px] h-auto select-none overflow-visible">
        {type === 'angle_bisector' && (
          <g>
            <line x1="20" y1="95" x2="160" y2="95" stroke="#0284c7" strokeWidth="2.5" />
            <line x1="20" y1="95" x2="135" y2="20" stroke="#0284c7" strokeWidth="2.5" />
            <circle cx="20" cy="95" r="3.5" fill="#4f46e5" />
            <line x1="20" y1="95" x2="155" y2="45" stroke="#059669" strokeWidth="2.5" />
            <circle cx="110" cy="60" r="3" fill="#ef4444" />
            <text x="160" y="45" className="text-[10px] font-bold fill-emerald-600">f_α</text>
            <text x="20" y="110" className="text-[9px] font-bold fill-indigo-600">O</text>
            <path d="M 45 95 A 25 25 0 0 0 40 79" fill="none" stroke="#10b981" strokeWidth="1.5" />
            <path d="M 40 79 A 25 25 0 0 0 35 63" fill="none" stroke="#10b981" strokeWidth="1.5" />
          </g>
        )}

        {type === 'perpendicular_on_line' && (
          <g>
            <line x1="15" y1="80" x2="165" y2="80" stroke="#0284c7" strokeWidth="2.5" />
            <circle cx="90" cy="80" r="3.5" fill="#4f46e5" />
            <text x="90" y="96" textAnchor="middle" className="text-[9px] font-bold fill-indigo-600">P</text>
            <line x1="90" y1="15" x2="90" y2="105" stroke="#059669" strokeWidth="2.5" />
            <path d="M 102 80 A 12 12 0 0 0 90 68" fill="none" stroke="#ef4444" strokeWidth="1.2" />
            <circle cx="96" cy="74" r="1" fill="#ef4444" />
            <text x="95" y="25" className="text-[10px] font-bold fill-emerald-600">m ⊥ e</text>
          </g>
        )}

        {type === 'perpendicular_external' && (
          <g>
            <line x1="15" y1="70" x2="165" y2="70" stroke="#0284c7" strokeWidth="2.5" />
            <circle cx="90" cy="25" r="3.5" fill="#9333ea" />
            <text x="90" y="18" textAnchor="middle" className="text-[9px] font-bold fill-purple-600">P ∉ e</text>
            <line x1="90" y1="15" x2="90" y2="110" stroke="#059669" strokeWidth="2.2" />
            <path d="M 102 70 A 12 12 0 0 0 90 58" fill="none" stroke="#ef4444" strokeWidth="1.2" />
            <circle cx="96" cy="64" r="1" fill="#ef4444" />
          </g>
        )}

        {type === 'parallel_lines' && (
          <g>
            <line x1="15" y1="35" x2="165" y2="35" stroke="#4f46e5" strokeWidth="2.5" />
            <line x1="15" y1="85" x2="165" y2="85" stroke="#4f46e5" strokeWidth="2.5" />
            <text x="168" y="38" className="text-[10px] font-bold fill-indigo-600">e₁</text>
            <text x="168" y="88" className="text-[10px] font-bold fill-indigo-600">e₂</text>
            <line x1="60" y1="35" x2="60" y2="85" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 2" />
            <text x="68" y="64" className="text-[9px] font-bold fill-amber-600">d = konstans</text>
          </g>
        )}

        {type === 'triangle_sss' && (
          <g>
            <polygon points="25,95 155,95 90,30" fill="rgba(2, 132, 199, 0.15)" stroke="#0284c7" strokeWidth="2" />
            <circle cx="25" cy="95" r="3" fill="#0284c7" />
            <circle cx="155" cy="95" r="3" fill="#0284c7" />
            <circle cx="90" cy="30" r="3" fill="#ef4444" />
            <text x="90" y="110" textAnchor="middle" className="text-[9px] font-bold fill-sky-700">c = {param1 || '8 cm'}</text>
            <text x="45" y="60" className="text-[9px] font-bold fill-amber-600">b = {param2 || '6 cm'}</text>
            <text x="125" y="60" className="text-[9px] font-bold fill-emerald-600">a = 7 cm</text>
          </g>
        )}

        {type === 'triangle_sas' && (
          <g>
            <polygon points="25,95 155,95 70,35" fill="rgba(245, 158, 11, 0.15)" stroke="#ea580c" strokeWidth="2" />
            <circle cx="25" cy="95" r="3.5" fill="#ea580c" />
            <path d="M 45 95 A 20 20 0 0 0 38 78" fill="none" stroke="#ef4444" strokeWidth="1.8" />
            <text x="44" y="86" className="text-[9px] font-bold fill-red-600">α = 60°</text>
            <text x="90" y="110" textAnchor="middle" className="text-[9px] font-bold fill-slate-700">c = 7 cm</text>
            <text x="35" y="60" className="text-[9px] font-bold fill-slate-700">b = 5 cm</text>
          </g>
        )}

        {type === 'angle_60' && (
          <g>
            <line x1="25" y1="95" x2="155" y2="95" stroke="#0284c7" strokeWidth="2.5" />
            <line x1="25" y1="95" x2="90" y2="30" stroke="#0284c7" strokeWidth="2.5" />
            <circle cx="25" cy="95" r="3.5" fill="#0284c7" />
            <path d="M 55 95 A 30 30 0 0 0 40 65" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="2" />
            <text x="52" y="78" className="text-[10px] font-black fill-amber-600">60°</text>
            <text x="90" y="115" textAnchor="middle" className="text-[9px] font-bold fill-slate-600">Szabályos △ szöge (R=a)</text>
          </g>
        )}

        {type === 'angle_30' && (
          <g>
            <line x1="25" y1="95" x2="155" y2="95" stroke="#0284c7" strokeWidth="2.5" />
            <line x1="25" y1="95" x2="90" y2="30" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="3 2" />
            <line x1="25" y1="95" x2="135" y2="60" stroke="#059669" strokeWidth="2.5" />
            <path d="M 55 95 A 30 30 0 0 0 51 78" fill="rgba(16, 185, 129, 0.2)" stroke="#10b981" strokeWidth="2" />
            <text x="58" y="90" className="text-[10px] font-black fill-emerald-600">30°</text>
            <text x="90" y="115" textAnchor="middle" className="text-[9px] font-bold fill-slate-600">60° felezése (f_60°)</text>
          </g>
        )}

        {type === 'angle_45' && (
          <g>
            <line x1="25" y1="95" x2="155" y2="95" stroke="#0284c7" strokeWidth="2.5" />
            <line x1="25" y1="95" x2="25" y2="25" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="3 2" />
            <line x1="25" y1="95" x2="105" y2="25" stroke="#059669" strokeWidth="2.5" />
            <path d="M 55 95 A 30 30 0 0 0 46 74" fill="rgba(16, 185, 129, 0.2)" stroke="#10b981" strokeWidth="2" />
            <text x="54" y="88" className="text-[10px] font-black fill-emerald-600">45°</text>
            <text x="90" y="115" textAnchor="middle" className="text-[9px] font-bold fill-slate-600">90° derékszög felezése</text>
          </g>
        )}

        {type === 'triangle_impossible' && (
          <g>
            <line x1="25" y1="90" x2="155" y2="90" stroke="#0284c7" strokeWidth="3" />
            <path d="M 75 90 A 50 50 0 0 0 65 45" fill="none" stroke="#ef4444" strokeWidth="2" strokeDasharray="3 2" />
            <path d="M 105 90 A 50 50 0 0 1 115 45" fill="none" stroke="#ef4444" strokeWidth="2" strokeDasharray="3 2" />
            <circle cx="25" cy="90" r="3.5" fill="#0284c7" />
            <circle cx="155" cy="90" r="3.5" fill="#0284c7" />
            <text x="90" y="112" textAnchor="middle" className="text-[9px] font-black fill-red-600 font-mono">3 + 4 &lt; 10 (NEM metszik egymást!)</text>
          </g>
        )}

        {label && (
          <text x="90" y="115" textAnchor="middle" className="text-[10px] font-bold fill-slate-700 dark:fill-slate-300">
            {label}
          </text>
        )}
      </svg>
    </div>
  );
};

// =========================================================================
// 🧩 PÁROSÍTÓ ÉS CSOPORTOSÍTÓ MINI ÁBRÁK (ConstructionsMatcherFigure)
// =========================================================================

export const ConstructionsMatcherFigure: React.FC<{
  type:
    | 'compass_tool'
    | 'ruler_tool'
    | 'angle_bisector'
    | 'perpendicular'
    | 'parallel'
    | 'triangle_sss'
    | 'triangle_possible'
    | 'triangle_impossible'
    | 'angle_60'
    | 'angle_90'
    | 'angle_30'
    | 'angle_45';
}> = ({ type }) => {
  return (
    <svg viewBox="0 0 90 50" className="w-[72px] h-[40px] select-none overflow-visible">
      {type === 'compass_tool' && (
        <g>
          {/* Compass illustration */}
          <line x1="45" y1="8" x2="25" y2="44" stroke="#4f46e5" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="45" y1="8" x2="65" y2="44" stroke="#4f46e5" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="45" cy="8" r="3" fill="#312e81" />
          <circle cx="25" cy="44" r="1.5" fill="#64748b" />
          <circle cx="65" cy="44" r="1.5" fill="#ef4444" />
          <path d="M 55 42 A 25 25 0 0 1 75 42" fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="2 1" />
        </g>
      )}

      {type === 'ruler_tool' && (
        <g>
          {/* Ruler illustration */}
          <rect x="10" y="18" width="70" height="14" rx="2" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="1.5" />
          <line x1="20" y1="18" x2="20" y2="24" stroke="#f59e0b" strokeWidth="1" />
          <line x1="30" y1="18" x2="30" y2="22" stroke="#f59e0b" strokeWidth="1" />
          <line x1="40" y1="18" x2="40" y2="24" stroke="#f59e0b" strokeWidth="1" />
          <line x1="50" y1="18" x2="50" y2="22" stroke="#f59e0b" strokeWidth="1" />
          <line x1="60" y1="18" x2="60" y2="24" stroke="#f59e0b" strokeWidth="1" />
          <line x1="70" y1="18" x2="70" y2="22" stroke="#f59e0b" strokeWidth="1" />
        </g>
      )}

      {type === 'angle_bisector' && (
        <g>
          <line x1="15" y1="42" x2="75" y2="42" stroke="#0284c7" strokeWidth="2" />
          <line x1="15" y1="42" x2="65" y2="10" stroke="#0284c7" strokeWidth="2" />
          <line x1="15" y1="42" x2="75" y2="22" stroke="#059669" strokeWidth="2" />
          <circle cx="15" cy="42" r="2" fill="#0284c7" />
          <circle cx="55" cy="28" r="2" fill="#ef4444" />
        </g>
      )}

      {type === 'perpendicular' && (
        <g>
          <line x1="12" y1="36" x2="78" y2="36" stroke="#0284c7" strokeWidth="2" />
          <line x1="45" y1="6" x2="45" y2="44" stroke="#059669" strokeWidth="2" />
          <path d="M 53 36 A 8 8 0 0 0 45 28" fill="none" stroke="#ef4444" strokeWidth="1" />
          <circle cx="49" cy="32" r="0.8" fill="#ef4444" />
        </g>
      )}

      {type === 'parallel' && (
        <g>
          <line x1="15" y1="15" x2="75" y2="15" stroke="#4f46e5" strokeWidth="2" />
          <line x1="15" y1="35" x2="75" y2="35" stroke="#4f46e5" strokeWidth="2" />
          <text x="78" y="18" className="text-[7px] font-bold fill-indigo-600">e₁</text>
          <text x="78" y="38" className="text-[7px] font-bold fill-indigo-600">e₂</text>
        </g>
      )}

      {type === 'triangle_sss' && (
        <g>
          <polygon points="18,40 72,40 45,12" fill="rgba(2, 132, 199, 0.2)" stroke="#0284c7" strokeWidth="1.8" />
          <circle cx="18" cy="40" r="2" fill="#0284c7" />
          <circle cx="72" cy="40" r="2" fill="#0284c7" />
          <circle cx="45" cy="12" r="2" fill="#ef4444" />
        </g>
      )}

      {type === 'triangle_possible' && (
        <g>
          <polygon points="15,40 75,40 45,12" fill="rgba(16, 185, 129, 0.25)" stroke="#059669" strokeWidth="1.8" />
          <text x="45" y="47" textAnchor="middle" className="text-[7px] font-bold fill-emerald-700">5 + 6 &gt; 7 (OK)</text>
        </g>
      )}

      {type === 'triangle_impossible' && (
        <g>
          <line x1="15" y1="35" x2="75" y2="35" stroke="#cbd5e1" strokeWidth="2" />
          <path d="M 35 35 A 20 20 0 0 0 30 18" fill="none" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="2 1" />
          <path d="M 55 35 A 20 20 0 0 1 60 18" fill="none" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="2 1" />
          <text x="45" y="46" textAnchor="middle" className="text-[7px] font-bold fill-red-600">2 + 3 &lt; 8 (NEM)</text>
        </g>
      )}

      {type === 'angle_60' && (
        <g>
          <line x1="20" y1="40" x2="75" y2="40" stroke="#0284c7" strokeWidth="2" />
          <line x1="20" y1="40" x2="52" y2="12" stroke="#0284c7" strokeWidth="2" />
          <path d="M 38 40 A 18 18 0 0 0 32 26" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="1.5" />
          <text x="45" y="32" className="text-[8px] font-black fill-amber-600">60°</text>
        </g>
      )}

      {type === 'angle_90' && (
        <g>
          <line x1="20" y1="42" x2="75" y2="42" stroke="#0284c7" strokeWidth="2" />
          <line x1="20" y1="42" x2="20" y2="8" stroke="#0284c7" strokeWidth="2" />
          <path d="M 32 42 A 12 12 0 0 0 20 30" fill="none" stroke="#ef4444" strokeWidth="1.2" />
          <circle cx="25" cy="37" r="0.8" fill="#ef4444" />
          <text x="36" y="28" className="text-[8px] font-black fill-red-600">90°</text>
        </g>
      )}

      {type === 'angle_30' && (
        <g>
          <line x1="18" y1="42" x2="75" y2="42" stroke="#0284c7" strokeWidth="2" />
          <line x1="18" y1="42" x2="68" y2="20" stroke="#059669" strokeWidth="2" />
          <path d="M 40 42 A 22 22 0 0 0 37 32" fill="rgba(16, 185, 129, 0.2)" stroke="#10b981" strokeWidth="1.5" />
          <text x="45" y="36" className="text-[8px] font-black fill-emerald-600">30°</text>
        </g>
      )}

      {type === 'angle_45' && (
        <g>
          <line x1="18" y1="42" x2="75" y2="42" stroke="#0284c7" strokeWidth="2" />
          <line x1="18" y1="42" x2="58" y2="10" stroke="#059669" strokeWidth="2" />
          <path d="M 38 42 A 20 20 0 0 0 32 28" fill="rgba(16, 185, 129, 0.2)" stroke="#10b981" strokeWidth="1.5" />
          <text x="42" y="32" className="text-[8px] font-black fill-emerald-600">45°</text>
        </g>
      )}
    </svg>
  );
};
