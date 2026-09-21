import React from 'react';
import { MathText } from '@/components/math/shared/MathText';

// =========================================================================
// 1. ÁTFOGÓ ELMÉLETI DIAGRAMOK (Theory Diagrams)
// =========================================================================

/**
 * 1. A szakaszfelező merőleges alapvető tulajdonságai és ponthalmaz definíciója
 */
export const BisectorOverviewDiagram: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={`p-4 rounded-2xl bg-gradient-to-br from-teal-50/60 to-cyan-50/40 dark:from-slate-850 dark:to-slate-900 border-2 border-teal-200/80 dark:border-slate-800 shadow-sm ${className || ''}`}>
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-black text-sm text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-teal-600"></span>
          A szakaszfelező merőleges tulajdonságai (d(P, A) = d(P, B))
        </h4>
        <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-md bg-teal-100 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300 border border-teal-200 dark:border-teal-800">
          f_AB ⊥ AB és PA = PB
        </span>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-around gap-4 py-2">
        {/* Main SVG Diagram */}
        <div className="flex flex-col items-center">
          <svg viewBox="0 0 280 200" className="w-72 sm:w-80 h-auto select-none overflow-visible">
            {/* Background grid dots */}
            <defs>
              <pattern id="grid-dots-bisector" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="0.7" className="fill-slate-300 dark:fill-slate-700" />
              </pattern>
            </defs>
            <rect x="0" y="0" width="280" height="200" fill="url(#grid-dots-bisector)" rx="12" />

            {/* Perpendicular Bisector line (f) */}
            <line x1="140" y1="15" x2="140" y2="185" stroke="#0d9488" strokeWidth="2.5" strokeDasharray="5 3" />
            <text x="145" y="25" className="text-xs font-black italic fill-teal-600">f_AB (felezőmerőleges)</text>

            {/* Segment AB */}
            <line x1="40" y1="120" x2="240" y2="120" stroke="#0284c7" strokeWidth="3.5" strokeLinecap="round" />
            <circle cx="40" cy="120" r="4.5" fill="#0284c7" />
            <circle cx="240" cy="120" r="4.5" fill="#0284c7" />
            <text x="40" y="140" textAnchor="middle" className="text-sm font-black fill-sky-700 dark:fill-sky-300">A</text>
            <text x="240" y="140" textAnchor="middle" className="text-sm font-black fill-sky-700 dark:fill-sky-300">B</text>

            {/* Midpoint F */}
            <circle cx="140" cy="120" r="4.5" fill="#ef4444" />
            <text x="148" y="136" className="text-xs font-bold fill-red-600">F (felezőpont)</text>

            {/* Right angle: Hungarian standard (negyedkör ív + pont) */}
            <path d="M 154 120 A 14 14 0 0 0 140 106" fill="none" stroke="#ef4444" strokeWidth="1.5" />
            <circle cx="145" cy="115" r="1.3" fill="#ef4444" />

            {/* Point P on Bisector */}
            <circle cx="140" cy="50" r="5" fill="#9333ea" />
            <text x="150" y="52" className="text-xs font-black fill-purple-700 dark:fill-purple-300">P pont</text>

            {/* Distances PA and PB (Equal legs of isosceles triangle) */}
            <line x1="140" y1="50" x2="40" y2="120" stroke="#ea580c" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="140" y1="50" x2="240" y2="120" stroke="#ea580c" strokeWidth="2.5" strokeLinecap="round" />

            {/* Equality tick marks */}
            <line x1="86" y1="80" x2="94" y2="90" stroke="#ea580c" strokeWidth="2" />
            <line x1="186" y1="90" x2="194" y2="80" stroke="#ea580c" strokeWidth="2" />

            {/* Segment half tick marks */}
            <line x1="88" y1="115" x2="88" y2="125" stroke="#0284c7" strokeWidth="2" />
            <line x1="92" y1="115" x2="92" y2="125" stroke="#0284c7" strokeWidth="2" />
            <line x1="188" y1="115" x2="188" y2="125" stroke="#0284c7" strokeWidth="2" />
            <line x1="192" y1="115" x2="192" y2="125" stroke="#0284c7" strokeWidth="2" />

            <text x="80" y="75" textAnchor="middle" className="text-[10px] font-bold fill-orange-600 font-mono">PA</text>
            <text x="200" y="75" textAnchor="middle" className="text-[10px] font-bold fill-orange-600 font-mono">PB</text>
            <text x="140" y="195" textAnchor="middle" className="text-[11px] font-bold fill-teal-700 dark:fill-teal-300">PA = PB (Egyenlő távolság)</text>
          </svg>
        </div>

        {/* Quick Legend Table */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs w-full max-w-md">
          <div className="p-2.5 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
            <span className="font-bold text-teal-700 dark:text-teal-300">Felezőmerőleges (f_AB):</span>
            <p className="text-[11px] text-slate-600 dark:text-slate-300">A szakasz felezőpontján (F) áthaladó, a szakaszra merőleges (90°-os) egyenes.</p>
          </div>
          <div className="p-2.5 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
            <span className="font-bold text-orange-600 dark:text-orange-400">Ponthalmaz tétel:</span>
            <p className="text-[11px] text-slate-600 dark:text-slate-300">A sík mindazon pontjainak halmaza, amelyek az A és B pontoktól egyenlő távolságra vannak.</p>
          </div>
          <div className="p-2.5 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
            <span className="font-bold text-purple-700 dark:text-purple-300">Egyenlő szárú △:</span>
            <p className="text-[11px] text-slate-600 dark:text-slate-300">Bármely P pontot választva a felezőmerőlegesen, az APB háromszög egyenlő szárú (PA = PB).</p>
          </div>
          <div className="p-2.5 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
            <span className="font-bold text-sky-700 dark:text-sky-300">Tengelyes szimmetria:</span>
            <p className="text-[11px] text-slate-600 dark:text-slate-300">A szakaszfelező merőleges a szakasz szimmetriatengelye: A tükörképe B, B tükörképe A.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * 2. Szakaszfelező merőleges szerkesztésének lépései (Körző és vonalzó)
 */
export const BisectorConstructionDiagram: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={`p-4 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 shadow-sm ${className || ''}`}>
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-black text-sm text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-500"></span>
          Szerkesztés körzővel és vonalzóval (r &gt; AB / 2)
        </h4>
        <span className="text-[11px] font-bold text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-950 px-2 py-0.5 rounded-md border border-cyan-200 dark:border-cyan-800">
          Körívek metszéspontja: M₁ és M₂
        </span>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-around gap-4 py-2">
        <svg viewBox="0 0 260 185" className="w-64 sm:w-72 h-auto select-none overflow-visible">
          {/* Base segment AB */}
          <line x1="40" y1="90" x2="220" y2="90" stroke="#0284c7" strokeWidth="3" strokeLinecap="round" />
          <circle cx="40" cy="90" r="4" fill="#0284c7" />
          <circle cx="220" cy="90" r="4" fill="#0284c7" />
          <text x="35" y="105" className="text-xs font-black fill-sky-700 dark:fill-sky-400">A</text>
          <text x="225" y="105" className="text-xs font-black fill-sky-700 dark:fill-sky-400">B</text>

          {/* Arcs from A (r > AB/2): bulges right */}
          <path d="M 120 23 A 105 105 0 0 1 120 157" fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3 2" />
          {/* Arcs from B (same r): bulges left */}
          <path d="M 140 23 A 105 105 0 0 0 140 157" fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3 2" />

          {/* Constructed Bisector Line */}
          <line x1="130" y1="12" x2="130" y2="168" stroke="#059669" strokeWidth="2.5" />
          <text x="136" y="20" className="text-xs font-black italic fill-emerald-600">f_AB</text>

          {/* Intersection Points M1 and M2 */}
          <circle cx="130" cy="36" r="4" fill="#ef4444" />
          <circle cx="130" cy="144" r="4" fill="#ef4444" />
          <text x="142" y="40" className="text-[11px] font-black fill-red-600">M₁</text>
          <text x="142" y="148" className="text-[11px] font-black fill-red-600">M₂</text>

          {/* Midpoint F */}
          <circle cx="130" cy="90" r="3.5" fill="#059669" />
          <text x="118" y="85" className="text-[10px] font-bold fill-emerald-700 dark:fill-emerald-400">F</text>
          
          {/* Right angle: Hungarian standard (negyedkör ív + pont) */}
          <path d="M 144 90 A 14 14 0 0 0 130 76" fill="none" stroke="#059669" strokeWidth="1.5" />
          <circle cx="135" cy="85" r="1.5" fill="#059669" />
        </svg>

        <div className="space-y-2 text-xs max-w-sm">
          <div className="flex items-start gap-2 p-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <span className="w-5 h-5 rounded-full bg-cyan-500 text-white font-bold flex items-center justify-center text-[10px] shrink-0">1</span>
            <p className="text-slate-600 dark:text-slate-300">Válassz egy a szakasz felénél nagyobb körzőnyílást: <strong className="text-cyan-600 font-mono">r &gt; AB / 2</strong>.</p>
          </div>
          <div className="flex items-start gap-2 p-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <span className="w-5 h-5 rounded-full bg-cyan-500 text-white font-bold flex items-center justify-center text-[10px] shrink-0">2</span>
            <p className="text-slate-600 dark:text-slate-300">Rajzolj azonos sugarú köríveket az A és B pontokból mindkét félsíkra.</p>
          </div>
          <div className="flex items-start gap-2 p-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <span className="w-5 h-5 rounded-full bg-cyan-500 text-white font-bold flex items-center justify-center text-[10px] shrink-0">3</span>
            <p className="text-slate-600 dark:text-slate-300">Kösd össze a metszéspontokat (M₁, M₂). Ez a szakasz felezőmerőlegese!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * 3. Háromszög oldalfelező merőlegesei és a körülírt kör (Középpont O)
 */
export const CircumscribedCircleDiagram: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={`p-4 rounded-2xl bg-gradient-to-br from-indigo-50/50 to-purple-50/30 dark:from-slate-850 dark:to-slate-900 border-2 border-indigo-200/80 dark:border-slate-800 shadow-sm ${className || ''}`}>
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-black text-sm text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-indigo-600"></span>
          Háromszög körülírt körének középpontja (O)
        </h4>
        <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-md bg-indigo-100 dark:bg-indigo-950/60 text-indigo-800 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
          OA = OB = OC = R
        </span>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-around gap-4 py-2">
        {/* SVG Circumcircle Diagram */}
        <div className="flex flex-col items-center">
          <svg viewBox="0 0 240 220" className="w-60 sm:w-68 h-auto select-none overflow-visible">
            {/* Circumscribed circle */}
            <circle cx="120" cy="110" r="75" fill="rgba(79, 70, 229, 0.05)" stroke="#6366f1" strokeWidth="2" strokeDasharray="4 3" />

            {/* Triangle ABC on the circle */}
            {/* A: ~210 deg, B: ~330 deg, C: ~90 deg */}
            <polygon points="55,148 185,148 120,35" fill="rgba(6, 182, 212, 0.15)" stroke="#0284c7" strokeWidth="2.5" />
            <circle cx="55" cy="148" r="4" fill="#0284c7" />
            <circle cx="185" cy="148" r="4" fill="#0284c7" />
            <circle cx="120" cy="35" r="4" fill="#0284c7" />
            <text x="45" y="160" className="text-xs font-black fill-sky-700">A</text>
            <text x="195" y="160" className="text-xs font-black fill-sky-700">B</text>
            <text x="120" y="24" textAnchor="middle" className="text-xs font-black fill-sky-700">C</text>

            {/* Perpendicular Bisectors */}
            {/* c side bisector (vertical) */}
            <line x1="120" y1="20" x2="120" y2="190" stroke="#f59e0b" strokeWidth="1.8" strokeDasharray="3 2" />
            {/* a side bisector */}
            <line x1="60" y1="65" x2="180" y2="155" stroke="#f59e0b" strokeWidth="1.8" strokeDasharray="3 2" />
            {/* b side bisector */}
            <line x1="180" y1="65" x2="60" y2="155" stroke="#f59e0b" strokeWidth="1.8" strokeDasharray="3 2" />

            {/* Center O */}
            <circle cx="120" cy="110" r="5" fill="#ef4444" />
            <text x="130" y="114" className="text-xs font-black fill-red-600">O (Körülírt kör középpontja)</text>

            {/* Radii OA, OB, OC */}
            <line x1="120" y1="110" x2="55" y2="148" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="2 2" />
            <line x1="120" y1="110" x2="185" y2="148" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="2 2" />
            <line x1="120" y1="110" x2="120" y2="35" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="2 2" />
            <text x="90" y="125" className="text-[9px] font-black fill-red-600 font-mono">R</text>
            <text x="150" y="125" className="text-[9px] font-black fill-red-600 font-mono">R</text>
            <text x="125" y="70" className="text-[9px] font-black fill-red-600 font-mono">R</text>
          </svg>
        </div>

        <div className="space-y-2 text-xs max-w-sm">
          <div className="p-2.5 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
            <span className="font-bold text-indigo-700 dark:text-indigo-300">Három felezőmerőleges metszéspontja:</span>
            <p className="text-[11px] text-slate-600 dark:text-slate-300">Bármely háromszög mindhárom oldalfelező merőlegese egyetlen közös pontban (O) metszi egymást.</p>
          </div>
          <div className="p-2.5 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
            <span className="font-bold text-red-600 dark:text-red-400">Csúcsoktól egyenlő távolság:</span>
            <p className="text-[11px] text-slate-600 dark:text-slate-300">Mivel O rajta van mindhárom felezőmerőlegesen: OA = OB = OC = R, így ez a körülírt kör középpontja!</p>
          </div>
          <div className="p-2.5 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
            <span className="font-bold text-teal-700 dark:text-teal-300">Háromszögtípusok és O helyzete:</span>
            <p className="text-[11px] text-slate-600 dark:text-slate-300">
              • <strong>Hegyesszögű:</strong> a háromszögön belül van.<br />
              • <strong>Derékszögű:</strong> az átfogó felezőpontján van.<br />
              • <strong>Tompaszögű:</strong> a háromszögön kívül esik.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// 🎯 DEDIKÁLT KVÍZ ÁBRÁK (Dedicated Figures for Quiz Questions)
// =========================================================================

export const BisectorSolverFigure: React.FC<{
  type:
    | 'definition'
    | 'distance'
    | 'construction'
    | 'triangle_center'
    | 'right_triangle'
    | 'obtuse_triangle'
    | 'symmetry'
    | 'distance_comparison';
  param1?: string;
  param2?: string;
  label?: string;
}> = ({ type, param1, param2, label }) => {
  return (
    <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-gradient-to-b from-slate-50 to-slate-100/70 dark:from-slate-850 dark:to-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-inner">
      <svg viewBox="0 0 180 120" className="w-full max-w-[190px] h-auto select-none overflow-visible">
        {type === 'definition' && (
          <g>
            <line x1="25" y1="70" x2="155" y2="70" stroke="#0284c7" strokeWidth="3" strokeLinecap="round" />
            <circle cx="25" cy="70" r="3.5" fill="#0284c7" />
            <circle cx="155" cy="70" r="3.5" fill="#0284c7" />
            <text x="25" y="85" textAnchor="middle" className="text-[10px] font-bold fill-sky-700">A</text>
            <text x="155" y="85" textAnchor="middle" className="text-[10px] font-bold fill-sky-700">B</text>

            <line x1="90" y1="15" x2="90" y2="105" stroke="#0d9488" strokeWidth="2.5" />
            <circle cx="90" cy="70" r="3.5" fill="#ef4444" />
            <text x="98" y="83" className="text-[9px] font-bold fill-red-600">F</text>
            <path d="M 100 70 A 10 10 0 0 0 90 60" fill="none" stroke="#ef4444" strokeWidth="1.2" />
            <circle cx="94" cy="66" r="1" fill="#ef4444" />
            <text x="95" y="25" className="text-[10px] font-bold fill-teal-600">f_AB ⊥ AB</text>
          </g>
        )}

        {type === 'distance' && (
          <g>
            <line x1="30" y1="80" x2="150" y2="80" stroke="#0284c7" strokeWidth="3" strokeLinecap="round" />
            <line x1="90" y1="15" x2="90" y2="105" stroke="#0d9488" strokeWidth="1.8" strokeDasharray="3 2" />
            <circle cx="90" cy="35" r="4.5" fill="#9333ea" />
            <text x="98" y="38" className="text-[10px] font-black fill-purple-700">P</text>

            <line x1="90" y1="35" x2="30" y2="80" stroke="#ea580c" strokeWidth="2" />
            <line x1="90" y1="35" x2="150" y2="80" stroke="#ea580c" strokeWidth="2" />
            <text x="50" y="52" className="text-[9px] font-bold fill-orange-600 font-mono">{param1 || 'PA = 8 cm'}</text>
            <text x="115" y="52" className="text-[9px] font-bold fill-orange-600 font-mono">{param2 || 'PB = ?'}</text>
          </g>
        )}

        {type === 'construction' && (
          <g>
            <line x1="30" y1="60" x2="150" y2="60" stroke="#0284c7" strokeWidth="2.5" />
            <path d="M 85 20 A 70 70 0 0 1 95 100" fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="2 2" />
            <path d="M 95 20 A 70 70 0 0 0 85 100" fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="2 2" />
            <circle cx="90" cy="28" r="3.5" fill="#ef4444" />
            <circle cx="90" cy="92" r="3.5" fill="#ef4444" />
            <line x1="90" y1="10" x2="90" y2="110" stroke="#059669" strokeWidth="2" />
            <text x="98" y="28" className="text-[9px] font-bold fill-red-600">M₁</text>
            <text x="98" y="94" className="text-[9px] font-bold fill-red-600">M₂</text>
          </g>
        )}

        {type === 'triangle_center' && (
          <g>
            <polygon points="40,95 140,95 90,25" fill="rgba(6, 182, 212, 0.15)" stroke="#0284c7" strokeWidth="2" />
            <line x1="90" y1="15" x2="90" y2="105" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="2 2" />
            <line x1="45" y1="45" x2="135" y2="85" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="2 2" />
            <line x1="135" y1="45" x2="45" y2="85" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="2 2" />
            <circle cx="90" cy="65" r="4" fill="#ef4444" />
            <text x="98" y="68" className="text-[10px] font-black fill-red-600">O</text>
            <text x="90" y="112" textAnchor="middle" className="text-[9px] font-bold fill-slate-600">Hegyesszögű △: O belül van</text>
          </g>
        )}

        {type === 'right_triangle' && (
          <g>
            <polygon points="35,90 145,90 35,30" fill="rgba(16, 185, 129, 0.15)" stroke="#059669" strokeWidth="2" />
            <path d="M 47 90 A 12 12 0 0 0 35 78" fill="none" stroke="#ef4444" strokeWidth="1.2" />
            <circle cx="40" cy="85" r="1" fill="#ef4444" />
            <circle cx="90" cy="60" r="4.5" fill="#ef4444" />
            <text x="98" y="58" className="text-[9px] font-black fill-red-600">O (Átfogó felezője)</text>
            <text x="90" y="108" textAnchor="middle" className="text-[9px] font-bold fill-slate-600">Derékszögű △: O az átfogón van</text>
          </g>
        )}

        {type === 'obtuse_triangle' && (
          <g>
            <polygon points="30,80 150,80 70,55" fill="rgba(244, 63, 94, 0.15)" stroke="#e11d48" strokeWidth="2" />
            <line x1="50" y1="20" x2="50" y2="100" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="2 2" />
            <circle cx="90" cy="105" r="4" fill="#ef4444" />
            <text x="98" y="108" className="text-[9px] font-black fill-red-600">O (Kívül)</text>
            <text x="90" y="118" textAnchor="middle" className="text-[9px] font-bold fill-slate-600">Tompaszögű △: O kívül esik</text>
          </g>
        )}

        {type === 'symmetry' && (
          <g>
            <line x1="25" y1="60" x2="155" y2="60" stroke="#0284c7" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="25" cy="60" r="4" fill="#0284c7" />
            <circle cx="155" cy="60" r="4" fill="#0284c7" />
            <text x="25" y="48" textAnchor="middle" className="text-xs font-black fill-sky-700">A</text>
            <text x="155" y="48" textAnchor="middle" className="text-xs font-black fill-sky-700">B = A'</text>
            <line x1="90" y1="15" x2="90" y2="105" stroke="#0d9488" strokeWidth="2.5" />
            <text x="95" y="25" className="text-[9px] font-bold fill-teal-700">t tengely</text>
            <text x="90" y="115" textAnchor="middle" className="text-[9px] font-bold fill-slate-600">A pont tükörképe B</text>
          </g>
        )}

        {type === 'distance_comparison' && (
          <g>
            <line x1="30" y1="70" x2="150" y2="70" stroke="#0284c7" strokeWidth="2.5" />
            <line x1="90" y1="15" x2="90" y2="105" stroke="#0d9488" strokeWidth="1.8" strokeDasharray="3 2" />
            <circle cx="60" cy="40" r="4" fill="#ef4444" />
            <text x="60" y="30" textAnchor="middle" className="text-[10px] font-black fill-red-600">Q (PA &lt; PB)</text>
            <circle cx="120" cy="40" r="4" fill="#3b82f6" />
            <text x="120" y="30" textAnchor="middle" className="text-[10px] font-black fill-blue-600">R (PA &gt; PB)</text>
            <text x="90" y="114" textAnchor="middle" className="text-[9px] font-bold fill-slate-600">Félsíkok távolságai</text>
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
// 🧩 PÁROSÍTÓ ÉS CSOPORTOSÍTÓ MINI ÁBRÁK (BisectorMatcherFigure)
// =========================================================================

export const BisectorMatcherFigure: React.FC<{
  type:
    | 'definition'
    | 'distance_equality'
    | 'construction_arcs'
    | 'symmetry_axis'
    | 'midpoint'
    | 'triangle_circumcenter'
    | 'isosceles_triangle'
    | 'right_angle_bisector'
    | 'obtuse_triangle_bisectors'
    | 'closer_to_A'
    | 'closer_to_B';
}> = ({ type }) => {
  return (
    <svg viewBox="0 0 90 50" className="w-[72px] h-[40px] select-none overflow-visible">
      {type === 'definition' && (
        <g>
          <line x1="15" y1="28" x2="75" y2="28" stroke="#0284c7" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="45" y1="6" x2="45" y2="44" stroke="#0d9488" strokeWidth="2" />
          <circle cx="15" cy="28" r="2.5" fill="#0284c7" />
          <circle cx="75" cy="28" r="2.5" fill="#0284c7" />
          <circle cx="45" cy="28" r="2.5" fill="#ef4444" />
          <path d="M 52 28 A 7 7 0 0 0 45 21" fill="none" stroke="#ef4444" strokeWidth="1" />
          <circle cx="48" cy="25" r="0.8" fill="#ef4444" />
        </g>
      )}

      {type === 'distance_equality' && (
        <g>
          <line x1="18" y1="36" x2="72" y2="36" stroke="#cbd5e1" strokeWidth="1.5" />
          <line x1="45" y1="8" x2="45" y2="44" stroke="#0d9488" strokeWidth="1.5" strokeDasharray="2 2" />
          <circle cx="45" cy="14" r="3" fill="#9333ea" />
          <line x1="45" y1="14" x2="18" y2="36" stroke="#ea580c" strokeWidth="2" />
          <line x1="45" y1="14" x2="72" y2="36" stroke="#ea580c" strokeWidth="2" />
          <circle cx="18" cy="36" r="2" fill="#0284c7" />
          <circle cx="72" cy="36" r="2" fill="#0284c7" />
        </g>
      )}

      {type === 'construction_arcs' && (
        <g>
          <line x1="18" y1="25" x2="72" y2="25" stroke="#0284c7" strokeWidth="2" />
          <path d="M 42 10 A 30 30 0 0 1 48 40" fill="none" stroke="#f59e0b" strokeWidth="1.2" strokeDasharray="2 1" />
          <path d="M 48 10 A 30 30 0 0 0 42 40" fill="none" stroke="#f59e0b" strokeWidth="1.2" strokeDasharray="2 1" />
          <circle cx="45" cy="12" r="2" fill="#ef4444" />
          <circle cx="45" cy="38" r="2" fill="#ef4444" />
          <line x1="45" y1="5" x2="45" y2="45" stroke="#059669" strokeWidth="1.5" />
        </g>
      )}

      {type === 'symmetry_axis' && (
        <g>
          <line x1="18" y1="25" x2="72" y2="25" stroke="#0284c7" strokeWidth="2" strokeDasharray="3 2" />
          <line x1="45" y1="5" x2="45" y2="45" stroke="#ef4444" strokeWidth="2" />
          <circle cx="18" cy="25" r="2.5" fill="#0284c7" />
          <circle cx="72" cy="25" r="2.5" fill="#0284c7" />
          <text x="18" y="16" textAnchor="middle" className="text-[7px] font-bold fill-sky-700">A</text>
          <text x="72" y="16" textAnchor="middle" className="text-[7px] font-bold fill-sky-700">B</text>
        </g>
      )}

      {type === 'midpoint' && (
        <g>
          <line x1="15" y1="25" x2="75" y2="25" stroke="#0284c7" strokeWidth="2.5" />
          <circle cx="15" cy="25" r="2.5" fill="#0284c7" />
          <circle cx="75" cy="25" r="2.5" fill="#0284c7" />
          <circle cx="45" cy="25" r="3.5" fill="#ef4444" />
          <text x="45" y="15" textAnchor="middle" className="text-[8px] font-black fill-red-600">F</text>
        </g>
      )}

      {type === 'triangle_circumcenter' && (
        <g>
          <circle cx="45" cy="25" r="20" fill="none" stroke="#6366f1" strokeWidth="1" strokeDasharray="2 2" />
          <polygon points="30,38 68,34 45,8" fill="rgba(99, 102, 241, 0.2)" stroke="#4f46e5" strokeWidth="1.5" />
          <circle cx="45" cy="25" r="2.5" fill="#ef4444" />
          <text x="45" y="22" textAnchor="middle" className="text-[7px] font-bold fill-red-600">O</text>
        </g>
      )}

      {type === 'isosceles_triangle' && (
        <g>
          <polygon points="20,40 70,40 45,10" fill="rgba(245, 158, 11, 0.25)" stroke="#ea580c" strokeWidth="1.5" />
          <line x1="45" y1="10" x2="45" y2="40" stroke="#0d9488" strokeWidth="1.5" strokeDasharray="2 2" />
          <circle cx="45" cy="10" r="2" fill="#ea580c" />
        </g>
      )}

      {type === 'right_angle_bisector' && (
        <g>
          <polygon points="20,40 70,40 20,15" fill="rgba(16, 185, 129, 0.25)" stroke="#059669" strokeWidth="1.5" />
          <circle cx="45" cy="27.5" r="3" fill="#ef4444" />
          <path d="M 27 40 A 7 7 0 0 0 20 33" fill="none" stroke="#059669" strokeWidth="1" />
          <circle cx="23" cy="37" r="0.8" fill="#059669" />
        </g>
      )}

      {type === 'obtuse_triangle_bisectors' && (
        <g>
          <polygon points="15,35 65,35 32,20" fill="rgba(244, 63, 94, 0.25)" stroke="#e11d48" strokeWidth="1.5" />
          <circle cx="45" cy="45" r="3" fill="#ef4444" />
        </g>
      )}

      {type === 'closer_to_A' && (
        <g>
          <line x1="15" y1="25" x2="75" y2="25" stroke="#cbd5e1" strokeWidth="2" />
          <line x1="45" y1="8" x2="45" y2="42" stroke="#0d9488" strokeWidth="1.2" strokeDasharray="2 2" />
          <circle cx="28" cy="16" r="3" fill="#ef4444" />
          <text x="28" y="10" textAnchor="middle" className="text-[7px] font-bold fill-red-600">PA &lt; PB</text>
        </g>
      )}

      {type === 'closer_to_B' && (
        <g>
          <line x1="15" y1="25" x2="75" y2="25" stroke="#cbd5e1" strokeWidth="2" />
          <line x1="45" y1="8" x2="45" y2="42" stroke="#0d9488" strokeWidth="1.2" strokeDasharray="2 2" />
          <circle cx="62" cy="16" r="3" fill="#3b82f6" />
          <text x="62" y="10" textAnchor="middle" className="text-[7px] font-bold fill-blue-600">PA &gt; PB</text>
        </g>
      )}
    </svg>
  );
};
