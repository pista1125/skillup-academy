import React from 'react';
import { MathText } from '@/components/math/shared/MathText';

// =========================================================================
// 1. ÁTFOGÓ ELMÉLETI DIAGRAMOK (Theory Diagrams)
// =========================================================================

/**
 * 1. A kör alapvető vonalai és szakaszai tabló
 */
export const CircleElementsOverviewDiagram: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={`p-4 rounded-2xl bg-gradient-to-br from-purple-50/60 to-indigo-50/40 dark:from-slate-850 dark:to-slate-900 border-2 border-purple-200/80 dark:border-slate-800 shadow-sm ${className || ''}`}>
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-black text-sm text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-purple-600"></span>
          A kör legfontosabb vonalai, szakaszai és pontjai
        </h4>
        <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-md bg-purple-100 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
          O, r, d, húr, ív, érintő, szelő
        </span>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-around gap-4 py-2">
        {/* Main Comprehensive SVG Diagram */}
        <div className="flex flex-col items-center">
          <svg viewBox="0 0 280 230" className="w-72 sm:w-80 h-auto select-none overflow-visible">
            {/* Base Circle */}
            <circle cx="140" cy="115" r="80" fill="rgba(147, 51, 234, 0.06)" stroke="#9333ea" strokeWidth="2.5" />

            {/* Secant line (szelő) */}
            <line x1="30" y1="50" x2="250" y2="70" stroke="#0284c7" strokeWidth="2" strokeDasharray="3 2" />
            <circle cx="70" cy="54" r="3" fill="#0284c7" />
            <circle cx="210" cy="66" r="3" fill="#0284c7" />
            <text x="252" y="73" className="text-[10px] font-black italic fill-sky-600">s (szelő)</text>

            {/* Chord (húr) on bottom */}
            <line x1="75" y1="165" x2="205" y2="165" stroke="#ea580c" strokeWidth="3" strokeLinecap="round" />
            <circle cx="75" cy="165" r="3.5" fill="#ea580c" />
            <circle cx="205" cy="165" r="3.5" fill="#ea580c" />
            <text x="140" y="178" textAnchor="middle" className="text-[10px] font-bold fill-orange-600">Húr</text>

            {/* Arc (körív) on right */}
            <path d="M 205 165 A 80 80 0 0 0 220 115" fill="none" stroke="#db2777" strokeWidth="4.5" strokeLinecap="round" />
            <circle cx="220" cy="115" r="3.5" fill="#db2777" />
            <text x="228" y="145" className="text-[10px] font-bold fill-pink-600">Körív (í)</text>

            {/* Diameter (átmérő) */}
            <line x1="60" y1="115" x2="220" y2="115" stroke="#10b981" strokeWidth="3" strokeLinecap="round" />
            <circle cx="60" cy="115" r="3.5" fill="#10b981" />
            <text x="95" y="110" textAnchor="middle" className="text-[10px] font-mono font-bold fill-emerald-600">d = 2r (átmérő)</text>

            {/* Radius (sugár) */}
            <line x1="140" y1="115" x2="196" y2="58" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" />
            <circle cx="196" cy="58" r="3.5" fill="#f59e0b" />
            <text x="160" y="80" className="text-[11px] font-mono font-black fill-amber-600">r (sugár)</text>

            {/* Tangent line (érintő) at top */}
            <line x1="60" y1="35" x2="220" y2="35" stroke="#dc2626" strokeWidth="2.5" />
            <circle cx="140" cy="35" r="4" fill="#dc2626" />
            <line x1="140" y1="115" x2="140" y2="35" stroke="#dc2626" strokeWidth="1.5" strokeDasharray="2 2" />
            <path d="M 152 35 A 12 12 0 0 1 140 47" fill="none" stroke="#dc2626" strokeWidth="1.2" />
            <circle cx="144" cy="39" r="1" fill="#dc2626" />
            <text x="225" y="38" className="text-[10px] font-black italic fill-red-600">e (érintő ⊥ r)</text>

            {/* Center O */}
            <circle cx="140" cy="115" r="4.5" fill="#9333ea" />
            <text x="135" y="132" className="text-xs font-black fill-purple-700 dark:fill-purple-300 font-sans">O</text>
          </svg>
        </div>

        {/* Quick Legend Table */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs w-full max-w-md">
          <div className="p-2 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
            <span className="font-bold text-purple-700 dark:text-purple-300">Középpont (O):</span>
            <p className="text-[11px] text-slate-600 dark:text-slate-300">A kör középső pontja, a körvonal minden pontjától egyenlő távolságra van.</p>
          </div>
          <div className="p-2 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
            <span className="font-bold text-amber-600 dark:text-amber-400">Sugár (r):</span>
            <p className="text-[11px] text-slate-600 dark:text-slate-300">A középpontot a körvonal bármely pontjával összekötő szakasz hossza.</p>
          </div>
          <div className="p-2 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
            <span className="font-bold text-emerald-600 dark:text-emerald-400">Átmérő (d = 2r):</span>
            <p className="text-[11px] text-slate-600 dark:text-slate-300">A középponton áthaladó leghosszabb húr; pontosan a sugár kétszerese.</p>
          </div>
          <div className="p-2 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
            <span className="font-bold text-orange-600 dark:text-orange-400">Húr & Körív:</span>
            <p className="text-[11px] text-slate-600 dark:text-slate-300">A húr a körvonal két pontját összekötő szakasz, a körív a körvonal határolt darabja.</p>
          </div>
          <div className="p-2 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 sm:col-span-2">
            <span className="font-bold text-red-600 dark:text-red-400">Érintő (e ⊥ r):</span>
            <p className="text-[11px] text-slate-600 dark:text-slate-300">Pontosan 1 közös pontja van a körrel, és mindig 90°-os derékszöget zár be az érintési pontba húzott sugárral.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * 2. Egyenes és kör kölcsönös helyzete diagram
 */
export const CircleLineRelationshipsDiagram: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-3 gap-3 w-full ${className || ''}`}>
      {/* 1. Érintő egyenes */}
      <div className="flex flex-col items-center p-3 rounded-2xl bg-red-50/40 dark:bg-red-950/20 border-2 border-red-200 dark:border-red-900/60 text-center space-y-2">
        <svg viewBox="0 0 140 100" className="w-full max-w-[130px] h-24">
          <circle cx="70" cy="55" r="35" fill="rgba(239, 68, 68, 0.08)" stroke="#cbd5e1" strokeWidth="2" />
          <line x1="15" y1="20" x2="125" y2="20" stroke="#dc2626" strokeWidth="2.5" />
          <circle cx="70" cy="20" r="3.5" fill="#dc2626" />
          <circle cx="70" cy="55" r="3" fill="#9333ea" />
          <line x1="70" y1="55" x2="70" y2="20" stroke="#dc2626" strokeWidth="1.5" strokeDasharray="2 2" />
          <path d="M 78 20 A 8 8 0 0 1 70 28" fill="none" stroke="#dc2626" strokeWidth="1" />
          <circle cx="73" cy="23" r="0.8" fill="#dc2626" />
          <text x="70" y="68" textAnchor="middle" className="text-[9px] font-bold fill-purple-600">O</text>
          <text x="120" y="15" className="text-[9px] font-bold fill-red-600">e (érintő)</text>
        </svg>
        <div>
          <div className="font-bold text-xs text-red-900 dark:text-red-300">1. Érintő egyenes</div>
          <div className="text-[11px] font-bold text-red-600 font-mono">1 közös pont (d = r)</div>
          <p className="text-[10px] text-slate-500 mt-0.5">Merőleges a sugárra az érintési pontban.</p>
        </div>
      </div>

      {/* 2. Szelő egyenes */}
      <div className="flex flex-col items-center p-3 rounded-2xl bg-sky-50/40 dark:bg-sky-950/20 border-2 border-sky-200 dark:border-sky-900/60 text-center space-y-2">
        <svg viewBox="0 0 140 100" className="w-full max-w-[130px] h-24">
          <circle cx="70" cy="55" r="35" fill="rgba(2, 132, 199, 0.08)" stroke="#cbd5e1" strokeWidth="2" />
          <line x1="15" y1="35" x2="125" y2="35" stroke="#0284c7" strokeWidth="2.5" />
          <circle cx="40" cy="35" r="3.5" fill="#0284c7" />
          <circle cx="100" cy="35" r="3.5" fill="#0284c7" />
          <circle cx="70" cy="55" r="3" fill="#9333ea" />
          <text x="70" y="68" textAnchor="middle" className="text-[9px] font-bold fill-purple-600">O</text>
          <text x="120" y="30" className="text-[9px] font-bold fill-sky-600">s (szelő)</text>
        </svg>
        <div>
          <div className="font-bold text-xs text-sky-900 dark:text-sky-300">2. Szelő egyenes</div>
          <div className="text-[11px] font-bold text-sky-600 font-mono">2 közös pont (d &lt; r)</div>
          <p className="text-[10px] text-slate-500 mt-0.5">Átmetszi a kört, a két pont között húr keletkezik.</p>
        </div>
      </div>

      {/* 3. Külső egyenes */}
      <div className="flex flex-col items-center p-3 rounded-2xl bg-slate-50/70 dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 text-center space-y-2">
        <svg viewBox="0 0 140 100" className="w-full max-w-[130px] h-24">
          <circle cx="70" cy="60" r="30" fill="rgba(148, 163, 184, 0.08)" stroke="#cbd5e1" strokeWidth="2" />
          <line x1="15" y1="15" x2="125" y2="15" stroke="#64748b" strokeWidth="2.5" strokeDasharray="3 2" />
          <circle cx="70" cy="60" r="3" fill="#9333ea" />
          <text x="70" y="73" textAnchor="middle" className="text-[9px] font-bold fill-purple-600">O</text>
          <text x="120" y="10" className="text-[9px] font-bold fill-slate-500">k (külső)</text>
        </svg>
        <div>
          <div className="font-bold text-xs text-slate-800 dark:text-slate-200">3. Külső egyenes</div>
          <div className="text-[11px] font-bold text-slate-500 font-mono">0 közös pont (d &gt; r)</div>
          <p className="text-[10px] text-slate-500 mt-0.5">A körön kívül halad el, nem metszi a körvonalat.</p>
        </div>
      </div>
    </div>
  );
};

/**
 * 3. Kör részei és síkidomai (Körcikk, Körszelet, Körgyűrű, Félkör)
 */
export const CircleSectorsDiagram: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 w-full ${className || ''}`}>
      {/* 1. Körcikk */}
      <div className="p-3.5 rounded-2xl border-2 border-amber-200 dark:border-amber-900/60 bg-amber-50/40 dark:bg-amber-950/20 text-center space-y-2">
        <div className="font-bold text-xs text-amber-900 dark:text-amber-200">1. Körcikk (cikkely)</div>
        <svg viewBox="0 0 100 80" className="w-full h-20">
          <circle cx="50" cy="45" r="30" fill="none" stroke="#cbd5e1" strokeWidth="1.5" />
          <path d="M 50 45 L 76 30 A 30 30 0 0 0 24 30 Z" fill="rgba(245, 158, 11, 0.3)" stroke="#f59e0b" strokeWidth="2" />
          <circle cx="50" cy="45" r="2.5" fill="#ea580c" />
          <text x="50" y="32" textAnchor="middle" className="text-[9px] font-bold fill-amber-700 font-mono">α szög</text>
        </svg>
        <div className="text-[10px] text-slate-600 dark:text-slate-300">Két sugár és egy körív határolja (mint egy pizzaszelet).</div>
      </div>

      {/* 2. Körszelet */}
      <div className="p-3.5 rounded-2xl border-2 border-pink-200 dark:border-pink-900/60 bg-pink-50/40 dark:bg-pink-950/20 text-center space-y-2">
        <div className="font-bold text-xs text-pink-900 dark:text-pink-200">2. Körszelet</div>
        <svg viewBox="0 0 100 80" className="w-full h-20">
          <circle cx="50" cy="45" r="30" fill="none" stroke="#cbd5e1" strokeWidth="1.5" />
          <path d="M 24 30 A 30 30 0 0 1 76 30 Z" fill="rgba(219, 39, 119, 0.3)" stroke="#db2777" strokeWidth="2" />
          <line x1="24" y1="30" x2="76" y2="30" stroke="#db2777" strokeWidth="2" />
          <circle cx="50" cy="45" r="2.5" fill="#9333ea" />
        </svg>
        <div className="text-[10px] text-slate-600 dark:text-slate-300">Egy húr és a hozzátartozó körív által határolt síkrész.</div>
      </div>

      {/* 3. Körgyűrű */}
      <div className="p-3.5 rounded-2xl border-2 border-purple-200 dark:border-purple-900/60 bg-purple-50/40 dark:bg-purple-950/20 text-center space-y-2">
        <div className="font-bold text-xs text-purple-900 dark:text-purple-200">3. Körgyűrű</div>
        <svg viewBox="0 0 100 80" className="w-full h-20">
          <circle cx="50" cy="45" r="32" fill="rgba(147, 51, 234, 0.25)" stroke="#9333ea" strokeWidth="2" />
          <circle cx="50" cy="45" r="18" fill="white" className="dark:fill-slate-900" stroke="#9333ea" strokeWidth="1.5" />
          <circle cx="50" cy="45" r="2.5" fill="#9333ea" />
          <text x="50" y="24" textAnchor="middle" className="text-[8px] font-bold fill-purple-600 font-mono">R - r</text>
        </svg>
        <div className="text-[10px] text-slate-600 dark:text-slate-300">Két közös középpontú (koncentrikus) kör közötti sáv.</div>
      </div>

      {/* 4. Félkör & Negyedkör */}
      <div className="p-3.5 rounded-2xl border-2 border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/40 dark:bg-emerald-950/20 text-center space-y-2">
        <div className="font-bold text-xs text-emerald-900 dark:text-emerald-200">4. Félkör (180°)</div>
        <svg viewBox="0 0 100 80" className="w-full h-20">
          <circle cx="50" cy="45" r="30" fill="none" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="2 2" />
          <path d="M 20 45 A 30 30 0 0 1 80 45 Z" fill="rgba(16, 185, 129, 0.3)" stroke="#059669" strokeWidth="2" />
          <line x1="20" y1="45" x2="80" y2="45" stroke="#059669" strokeWidth="2.5" />
          <circle cx="50" cy="45" r="2.5" fill="#059669" />
          <text x="50" y="36" textAnchor="middle" className="text-[9px] font-bold fill-emerald-700 font-mono">180°</text>
        </svg>
        <div className="text-[10px] text-slate-600 dark:text-slate-300">Az átmérő pontosan két egybevágó félkörre osztja a kört.</div>
      </div>
    </div>
  );
};

// =========================================================================
// 🎯 DEDIKÁLT KVÍZ ÁBRÁK (Dedicated Figures for Quiz Questions)
// =========================================================================

/**
 * Kvíz kérdés ábra kör elemének kiemelésével
 */
export const CirclePartHighlightFigure: React.FC<{
  highlight:
    | 'center'
    | 'radius'
    | 'diameter'
    | 'chord'
    | 'arc'
    | 'tangent'
    | 'secant'
    | 'sector'
    | 'segment'
    | 'concentric'
    | 'semicircle'
    | 'quadrant'
    | 'external_line'
    | 'central_angle';
  label?: string;
}> = ({ highlight, label }) => {
  return (
    <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-gradient-to-b from-slate-50 to-slate-100/70 dark:from-slate-850 dark:to-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-inner">
      <svg viewBox="0 0 180 130" className="w-full max-w-[190px] h-auto select-none overflow-visible">
        {/* Base Circle */}
        <circle cx="90" cy="65" r="45" fill="rgba(147, 51, 234, 0.05)" stroke="#cbd5e1" strokeWidth="2" />

        {/* Highlight Elements */}
        {highlight === 'center' && (
          <g>
            <circle cx="90" cy="65" r="5" fill="#ef4444" />
            <text x="90" y="52" textAnchor="middle" className="text-xs font-black fill-red-600">O (Középpont)</text>
          </g>
        )}

        {highlight === 'radius' && (
          <g>
            <line x1="90" y1="65" x2="132" y2="50" stroke="#f59e0b" strokeWidth="3.5" strokeLinecap="round" />
            <circle cx="90" cy="65" r="3.5" fill="#f59e0b" />
            <circle cx="132" cy="50" r="3.5" fill="#f59e0b" />
            <text x="110" y="50" className="text-xs font-black fill-amber-600 font-mono">r (sugár)</text>
          </g>
        )}

        {highlight === 'diameter' && (
          <g>
            <line x1="45" y1="65" x2="135" y2="65" stroke="#10b981" strokeWidth="3.5" strokeLinecap="round" />
            <circle cx="45" cy="65" r="3.5" fill="#10b981" />
            <circle cx="135" cy="65" r="3.5" fill="#10b981" />
            <circle cx="90" cy="65" r="3" fill="#059669" />
            <text x="90" y="56" textAnchor="middle" className="text-xs font-black fill-emerald-600 font-mono">d = 2r (átmérő)</text>
          </g>
        )}

        {highlight === 'chord' && (
          <g>
            <line x1="55" y1="92" x2="125" y2="92" stroke="#ea580c" strokeWidth="3.5" strokeLinecap="round" />
            <circle cx="55" cy="92" r="3.5" fill="#ea580c" />
            <circle cx="125" cy="92" r="3.5" fill="#ea580c" />
            <circle cx="90" cy="65" r="2.5" fill="#94a3b8" />
            <text x="90" y="106" textAnchor="middle" className="text-xs font-black fill-orange-600">Húr</text>
          </g>
        )}

        {highlight === 'arc' && (
          <g>
            <path d="M 125 92 A 45 45 0 0 0 135 65" fill="none" stroke="#db2777" strokeWidth="4.5" strokeLinecap="round" />
            <circle cx="125" cy="92" r="3.5" fill="#db2777" />
            <circle cx="135" cy="65" r="3.5" fill="#db2777" />
            <text x="142" y="84" className="text-xs font-black fill-pink-600">Körív (í)</text>
          </g>
        )}

        {highlight === 'tangent' && (
          <g>
            <line x1="40" y1="20" x2="140" y2="20" stroke="#dc2626" strokeWidth="2.5" />
            <circle cx="90" cy="20" r="4" fill="#dc2626" />
            <line x1="90" y1="65" x2="90" y2="20" stroke="#dc2626" strokeWidth="1.5" strokeDasharray="2 2" />
            <path d="M 98 20 A 8 8 0 0 1 90 28" fill="none" stroke="#dc2626" strokeWidth="1" />
            <circle cx="93" cy="23" r="0.8" fill="#dc2626" />
            <circle cx="90" cy="65" r="3" fill="#9333ea" />
            <text x="142" y="24" className="text-xs font-black fill-red-600">e (érintő ⊥ r)</text>
          </g>
        )}

        {highlight === 'secant' && (
          <g>
            <line x1="30" y1="40" x2="150" y2="40" stroke="#0284c7" strokeWidth="2.5" />
            <circle cx="58" cy="40" r="3.5" fill="#0284c7" />
            <circle cx="122" cy="40" r="3.5" fill="#0284c7" />
            <text x="145" y="34" className="text-xs font-black fill-sky-600">s (szelő)</text>
          </g>
        )}

        {highlight === 'sector' && (
          <g>
            <path d="M 90 65 L 129 42 A 45 45 0 0 0 51 42 Z" fill="rgba(245, 158, 11, 0.35)" stroke="#f59e0b" strokeWidth="2" />
            <circle cx="90" cy="65" r="3" fill="#ea580c" />
            <text x="90" y="46" textAnchor="middle" className="text-xs font-black fill-amber-700">Körcikk</text>
          </g>
        )}

        {highlight === 'segment' && (
          <g>
            <path d="M 51 42 A 45 45 0 0 1 129 42 Z" fill="rgba(219, 39, 119, 0.35)" stroke="#db2777" strokeWidth="2" />
            <line x1="51" y1="42" x2="129" y2="42" stroke="#db2777" strokeWidth="2" />
            <circle cx="90" cy="65" r="2.5" fill="#94a3b8" />
            <text x="90" y="34" textAnchor="middle" className="text-xs font-black fill-pink-700">Körszelet</text>
          </g>
        )}

        {highlight === 'concentric' && (
          <g>
            <circle cx="90" cy="65" r="25" fill="none" stroke="#9333ea" strokeWidth="2" strokeDasharray="3 2" />
            <circle cx="90" cy="65" r="3" fill="#9333ea" />
            <text x="90" y="120" textAnchor="middle" className="text-[11px] font-bold fill-purple-600">Közös O középpont</text>
          </g>
        )}

        {highlight === 'semicircle' && (
          <g>
            <path d="M 45 65 A 45 45 0 0 1 135 65 Z" fill="rgba(16, 185, 129, 0.3)" stroke="#059669" strokeWidth="2.5" />
            <line x1="45" y1="65" x2="135" y2="65" stroke="#059669" strokeWidth="2.5" />
            <circle cx="90" cy="65" r="3" fill="#059669" />
            <text x="90" y="52" textAnchor="middle" className="text-xs font-black fill-emerald-700">Félkör (180°)</text>
          </g>
        )}

        {highlight === 'quadrant' && (
          <g>
            <path d="M 90 65 L 135 65 A 45 45 0 0 0 90 20 Z" fill="rgba(6, 182, 212, 0.3)" stroke="#0891b2" strokeWidth="2" />
            <path d="M 100 65 A 10 10 0 0 0 90 55" fill="none" stroke="#0891b2" strokeWidth="1.2" />
            <circle cx="94" cy="61" r="1" fill="#0891b2" />
            <circle cx="90" cy="65" r="3" fill="#0891b2" />
            <text x="110" y="48" className="text-xs font-black fill-cyan-700">Negyedkör (90°)</text>
          </g>
        )}

        {highlight === 'external_line' && (
          <g>
            <line x1="30" y1="10" x2="150" y2="10" stroke="#64748b" strokeWidth="2.5" strokeDasharray="4 2" />
            <circle cx="90" cy="65" r="3" fill="#9333ea" />
            <text x="145" y="15" className="text-xs font-bold fill-slate-500">Külső egyenes</text>
          </g>
        )}

        {highlight === 'central_angle' && (
          <g>
            <line x1="90" y1="65" x2="132" y2="45" stroke="#4f46e5" strokeWidth="2" />
            <line x1="90" y1="65" x2="60" y2="35" stroke="#4f46e5" strokeWidth="2" />
            <path d="M 105 58 A 20 20 0 0 0 80 55" fill="none" stroke="#f59e0b" strokeWidth="2.5" />
            <circle cx="90" cy="65" r="3" fill="#4f46e5" />
            <text x="90" y="48" textAnchor="middle" className="text-xs font-black fill-amber-600">α (Középponti szög)</text>
          </g>
        )}

        {label && (
          <text x="90" y="122" textAnchor="middle" className="text-[11px] font-bold fill-slate-700 dark:fill-slate-200">
            {label}
          </text>
        )}
      </svg>
    </div>
  );
};

// =========================================================================
// 🧩 PÁROSÍTÓ KÁRTYA MINI ÁBRÁK (Compact Mini Card Figures for Matcher)
// =========================================================================

/**
 * Kör elemei kompakt mini kártya ábra párosító játékhoz
 */
export const CircleMatcherFigure: React.FC<{
  type:
    | 'center'
    | 'radius'
    | 'diameter'
    | 'chord'
    | 'arc'
    | 'tangent'
    | 'secant'
    | 'sector'
    | 'segment'
    | 'concentric'
    | 'semicircle'
    | 'quadrant'
    | 'external_line'
    | 'central_angle'
    | 'pi_formula'
    | 'symmetry_axes'
    | 'chord_bisector';
}> = ({ type }) => {
  return (
    <svg viewBox="0 0 90 54" className="w-20 h-12 select-none overflow-visible">
      {/* Base circle */}
      <circle cx="45" cy="27" r="22" fill="rgba(147, 51, 234, 0.06)" stroke="#cbd5e1" strokeWidth="1.5" />

      {type === 'center' && (
        <g>
          <circle cx="45" cy="27" r="3.5" fill="#ef4444" />
          <text x="45" y="20" textAnchor="middle" className="text-[8px] font-black fill-red-600">O</text>
        </g>
      )}

      {type === 'radius' && (
        <g>
          <line x1="45" y1="27" x2="65" y2="18" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="45" cy="27" r="2.5" fill="#f59e0b" />
          <circle cx="65" cy="18" r="2.5" fill="#f59e0b" />
          <text x="54" y="18" className="text-[8px] font-mono font-black fill-amber-600">r</text>
        </g>
      )}

      {type === 'diameter' && (
        <g>
          <line x1="23" y1="27" x2="67" y2="27" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="23" cy="27" r="2.5" fill="#10b981" />
          <circle cx="67" cy="27" r="2.5" fill="#10b981" />
          <circle cx="45" cy="27" r="2" fill="#059669" />
          <text x="45" y="21" textAnchor="middle" className="text-[7px] font-mono font-black fill-emerald-600">d = 2r</text>
        </g>
      )}

      {type === 'chord' && (
        <g>
          <line x1="30" y1="40" x2="60" y2="40" stroke="#ea580c" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="30" cy="40" r="2.5" fill="#ea580c" />
          <circle cx="60" cy="40" r="2.5" fill="#ea580c" />
          <circle cx="45" cy="27" r="1.5" fill="#94a3b8" />
        </g>
      )}

      {type === 'arc' && (
        <g>
          <path d="M 60 40 A 22 22 0 0 0 67 27" fill="none" stroke="#db2777" strokeWidth="3.5" strokeLinecap="round" />
          <circle cx="60" cy="40" r="2.5" fill="#db2777" />
          <circle cx="67" cy="27" r="2.5" fill="#db2777" />
        </g>
      )}

      {type === 'tangent' && (
        <g>
          <line x1="18" y1="5" x2="72" y2="5" stroke="#dc2626" strokeWidth="2" />
          <circle cx="45" cy="5" r="2.5" fill="#dc2626" />
          <line x1="45" y1="27" x2="45" y2="5" stroke="#dc2626" strokeWidth="1" strokeDasharray="2 2" />
          <path d="M 50 5 A 5 5 0 0 1 45 10" fill="none" stroke="#dc2626" strokeWidth="0.8" />
          <circle cx="47" cy="7" r="0.6" fill="#dc2626" />
        </g>
      )}

      {type === 'secant' && (
        <g>
          <line x1="15" y1="15" x2="75" y2="15" stroke="#0284c7" strokeWidth="2" />
          <circle cx="30" cy="15" r="2" fill="#0284c7" />
          <circle cx="60" cy="15" r="2" fill="#0284c7" />
        </g>
      )}

      {type === 'sector' && (
        <g>
          <path d="M 45 27 L 64 16 A 22 22 0 0 0 26 16 Z" fill="rgba(245, 158, 11, 0.4)" stroke="#f59e0b" strokeWidth="1.5" />
          <circle cx="45" cy="27" r="2" fill="#ea580c" />
        </g>
      )}

      {type === 'segment' && (
        <g>
          <path d="M 26 16 A 22 22 0 0 1 64 16 Z" fill="rgba(219, 39, 119, 0.4)" stroke="#db2777" strokeWidth="1.5" />
          <line x1="26" y1="16" x2="64" y2="16" stroke="#db2777" strokeWidth="1.5" />
        </g>
      )}

      {type === 'concentric' && (
        <g>
          <circle cx="45" cy="27" r="12" fill="none" stroke="#9333ea" strokeWidth="1.5" strokeDasharray="2 2" />
          <circle cx="45" cy="27" r="2" fill="#9333ea" />
        </g>
      )}

      {type === 'semicircle' && (
        <g>
          <path d="M 23 27 A 22 22 0 0 1 67 27 Z" fill="rgba(16, 185, 129, 0.35)" stroke="#059669" strokeWidth="2" />
          <line x1="23" y1="27" x2="67" y2="27" stroke="#059669" strokeWidth="2" />
        </g>
      )}

      {type === 'quadrant' && (
        <g>
          <path d="M 45 27 L 67 27 A 22 22 0 0 0 45 5 Z" fill="rgba(6, 182, 212, 0.35)" stroke="#0891b2" strokeWidth="1.5" />
          <path d="M 51 27 A 6 6 0 0 0 45 21" fill="none" stroke="#0891b2" strokeWidth="0.8" />
          <circle cx="47" cy="25" r="0.6" fill="#0891b2" />
        </g>
      )}

      {type === 'external_line' && (
        <g>
          <line x1="15" y1="2" x2="75" y2="2" stroke="#64748b" strokeWidth="2" strokeDasharray="3 2" />
        </g>
      )}

      {type === 'central_angle' && (
        <g>
          <line x1="45" y1="27" x2="65" y2="16" stroke="#4f46e5" strokeWidth="1.5" />
          <line x1="45" y1="27" x2="30" y2="12" stroke="#4f46e5" strokeWidth="1.5" />
          <path d="M 52 23 A 10 10 0 0 0 40 21" fill="none" stroke="#f59e0b" strokeWidth="2" />
        </g>
      )}

      {type === 'pi_formula' && (
        <g>
          <text x="45" y="32" textAnchor="middle" className="text-sm font-black fill-purple-700 dark:fill-purple-300 font-mono">π ≈ 3.14</text>
        </g>
      )}

      {type === 'symmetry_axes' && (
        <g>
          <line x1="23" y1="27" x2="67" y2="27" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="2 2" />
          <line x1="45" y1="5" x2="45" y2="49" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="2 2" />
          <line x1="29" y1="11" x2="61" y2="43" stroke="#ef4444" strokeWidth="1" strokeDasharray="2 2" />
          <line x1="29" y1="43" x2="61" y2="11" stroke="#ef4444" strokeWidth="1" strokeDasharray="2 2" />
        </g>
      )}

      {type === 'chord_bisector' && (
        <g>
          <line x1="28" y1="38" x2="62" y2="38" stroke="#ea580c" strokeWidth="2" />
          <line x1="45" y1="5" x2="45" y2="49" stroke="#0284c7" strokeWidth="1.5" strokeDasharray="2 2" />
          <circle cx="45" cy="27" r="2" fill="#9333ea" />
          <path d="M 50 38 A 5 5 0 0 0 45 33" fill="none" stroke="#0284c7" strokeWidth="0.8" />
          <circle cx="47" cy="36" r="0.6" fill="#0284c7" />
        </g>
      )}
    </svg>
  );
};
