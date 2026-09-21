import React from 'react';

// =========================================================================
// 1. ÁTFOGÓ ELMÉLETI DIAGRAMOK (Tabloid Diagrams for Theory)
// =========================================================================

/**
 * 1. Egybevágó háromszögek összehasonlító diagramja megfelelő oldalakkal és szögekkel
 */
export const CongruentTrianglesDiagram: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={`p-4 rounded-2xl bg-gradient-to-br from-orange-50/60 to-amber-50/40 dark:from-slate-850 dark:to-slate-900 border-2 border-orange-200/80 dark:border-slate-800 shadow-sm ${className || ''}`}>
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-black text-sm text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-orange-500"></span>
          Egybevágó háromszögek: △ABC ≅ △A'B'C'
        </h4>
        <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-md bg-orange-100 dark:bg-orange-950/60 text-orange-800 dark:text-orange-300 border border-orange-200 dark:border-orange-800">
          F₁ ≅ F₂ (Alak és méret azonos)
        </span>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-around gap-4 py-2">
        {/* Triangle 1: ABC */}
        <div className="flex flex-col items-center">
          <svg viewBox="0 0 170 160" className="w-48 h-40 select-none overflow-visible">
            <polygon points="30,105 135,105 60,30" fill="rgba(249, 115, 22, 0.12)" stroke="#ea580c" strokeWidth="2.5" />
            {/* Angle arcs */}
            <path d="M 50 105 A 20 20 0 0 0 38 88" fill="none" stroke="#0284c7" strokeWidth="2" />
            <path d="M 115 105 A 20 20 0 0 1 120 90" fill="none" stroke="#10b981" strokeWidth="2" />
            <path d="M 55 46 A 20 20 0 0 0 73 45" fill="none" stroke="#7c3aed" strokeWidth="2" />

            {/* Vertices */}
            <circle cx="30" cy="105" r="4" fill="#ea580c" />
            <circle cx="135" cy="105" r="4" fill="#ea580c" />
            <circle cx="60" cy="30" r="4" fill="#ea580c" />
            <text x="14" y="116" className="text-xs font-black fill-slate-800 dark:fill-slate-100">A</text>
            <text x="142" y="116" className="text-xs font-black fill-slate-800 dark:fill-slate-100">B</text>
            <text x="60" y="18" textAnchor="middle" className="text-xs font-black fill-slate-800 dark:fill-slate-100">C</text>

            {/* Side labels */}
            <text x="82" y="122" textAnchor="middle" className="text-[11px] font-bold fill-orange-600 font-mono">c = 6 cm</text>
            <text x="32" y="62" textAnchor="middle" className="text-[11px] font-bold fill-orange-600 font-mono">b = 5 cm</text>
            <text x="110" y="62" textAnchor="middle" className="text-[11px] font-bold fill-orange-600 font-mono">a = 7 cm</text>

            {/* Angle labels */}
            <text x="48" y="98" className="text-[10px] font-bold fill-sky-600">α</text>
            <text x="110" y="98" className="text-[10px] font-bold fill-emerald-600">β</text>
            <text x="61" y="55" className="text-[10px] font-bold fill-purple-600">γ</text>
          </svg>
          <span className="text-xs font-bold text-slate-600 dark:text-slate-300">Eredeti alakzat (F₁)</span>
        </div>

        {/* Congruence Symbol Icon */}
        <div className="flex flex-col items-center justify-center p-2.5 rounded-2xl bg-white dark:bg-slate-850 border border-orange-200 dark:border-slate-700 shadow-xs">
          <span className="text-2xl font-black text-orange-600 dark:text-orange-400 font-mono">≅</span>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Egybevágó</span>
        </div>

        {/* Triangle 2: A'B'C' (Rotated & Translated comfortably within viewBox) */}
        <div className="flex flex-col items-center">
          <svg viewBox="0 0 170 160" className="w-48 h-40 select-none overflow-visible">
            {/* Rotated triangle around center (85, 75) */}
            <g transform="translate(85, 75) rotate(35) translate(-85, -75)">
              <polygon points="30,105 135,105 60,30" fill="rgba(16, 185, 129, 0.12)" stroke="#059669" strokeWidth="2.5" />
              <path d="M 50 105 A 20 20 0 0 0 38 88" fill="none" stroke="#0284c7" strokeWidth="2" />
              <path d="M 115 105 A 20 20 0 0 1 120 90" fill="none" stroke="#10b981" strokeWidth="2" />
              <path d="M 55 46 A 20 20 0 0 0 73 45" fill="none" stroke="#7c3aed" strokeWidth="2" />
              <circle cx="30" cy="105" r="4" fill="#059669" />
              <circle cx="135" cy="105" r="4" fill="#059669" />
              <circle cx="60" cy="30" r="4" fill="#059669" />

              {/* Side labels inside rotated group */}
              <text x="82" y="122" textAnchor="middle" className="text-[11px] font-bold fill-emerald-600 font-mono">c' = 6 cm</text>
              <text x="32" y="62" textAnchor="middle" className="text-[11px] font-bold fill-emerald-600 font-mono">b' = 5 cm</text>
              <text x="110" y="62" textAnchor="middle" className="text-[11px] font-bold fill-emerald-600 font-mono">a' = 7 cm</text>

              {/* Angle labels */}
              <text x="48" y="98" className="text-[10px] font-bold fill-sky-600">α'</text>
              <text x="110" y="98" className="text-[10px] font-bold fill-emerald-600">β'</text>
              <text x="61" y="55" className="text-[10px] font-bold fill-purple-600">γ'</text>
            </g>

            {/* Vertex labels in screen coordinates */}
            <text x="8" y="72" className="text-xs font-black fill-slate-800 dark:fill-slate-100">A'</text>
            <text x="118" y="140" className="text-xs font-black fill-slate-800 dark:fill-slate-100">B'</text>
            <text x="90" y="16" className="text-xs font-black fill-slate-800 dark:fill-slate-100">C'</text>
          </svg>
          <span className="text-xs font-bold text-slate-600 dark:text-slate-300">Elforgatott kép (F₂)</span>
        </div>
      </div>

      {/* Equality invariants */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 border-t border-orange-200/60 dark:border-slate-800 text-center">
        <div className="p-1.5 rounded-lg bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
          <div className="text-[10px] text-slate-400 font-bold uppercase">Oldalak</div>
          <div className="text-xs font-mono font-bold text-orange-600 dark:text-orange-400">a = a', b = b', c = c'</div>
        </div>
        <div className="p-1.5 rounded-lg bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
          <div className="text-[10px] text-slate-400 font-bold uppercase">Szögek</div>
          <div className="text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400">α = α', β = β', γ = γ'</div>
        </div>
        <div className="p-1.5 rounded-lg bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
          <div className="text-[10px] text-slate-400 font-bold uppercase">Kerület</div>
          <div className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">K = K'</div>
        </div>
        <div className="p-1.5 rounded-lg bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
          <div className="text-[10px] text-slate-400 font-bold uppercase">Terület</div>
          <div className="text-xs font-mono font-bold text-purple-600 dark:text-purple-400">T = T'</div>
        </div>
      </div>
    </div>
  );
};

/**
 * 2. Háromszögek egybevágósági alapesetei (4 alapeset + csapda)
 */
export const CongruenceCasesDiagram: React.FC<{ className?: string }> = ({ className }) => {
  const cases = [
    {
      code: '(o-o-o)',
      title: 'Három oldal',
      desc: 'Mindhárom oldal hossza egyenlő.',
      formula: 'a = a\', b = b\', c = c\'',
      color: 'border-orange-200 dark:border-orange-900/60 bg-orange-50/40 dark:bg-orange-950/20 text-orange-700 dark:text-orange-300'
    },
    {
      code: '(o-sz-o)',
      title: 'Két oldal és a közbezárt szög',
      desc: 'Két oldal és a köztük lévő szög egyenlő.',
      formula: 'a = a\', b = b\', γ = γ\'',
      color: 'border-cyan-200 dark:border-cyan-900/60 bg-cyan-50/40 dark:bg-cyan-950/20 text-cyan-700 dark:text-cyan-300'
    },
    {
      code: '(sz-o-sz)',
      title: 'Egy oldal és a rajta fekvő két szög',
      desc: 'Egy oldal és a két szomszédos szög egyenlő.',
      formula: 'c = c\', α = α\', β = β\'',
      color: 'border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/40 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-300'
    },
    {
      code: '(o-o-sz)',
      title: 'Két oldal és a nagyobbikkal szemközti szög',
      desc: 'Két oldal és a hosszabb oldallal szemközti szög egyenlő.',
      formula: 'a = a\', b = b\', α = α\' (ha a > b)',
      color: 'border-purple-200 dark:border-purple-900/60 bg-purple-50/40 dark:bg-purple-950/20 text-purple-700 dark:text-purple-300'
    }
  ];

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 w-full ${className || ''}`}>
      {cases.map((c, idx) => (
        <div key={idx} className={`p-3.5 rounded-2xl border-2 flex flex-col justify-between space-y-2 shadow-2xs ${c.color}`}>
          <div>
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-black px-2 py-0.5 rounded-md bg-white/80 dark:bg-slate-900/80 shadow-2xs">
                {c.code}
              </span>
              <span className="text-[10px] font-bold text-slate-400">{idx + 1}. alapeset</span>
            </div>
            <h5 className="font-black text-xs mt-2 text-slate-800 dark:text-slate-100">{c.title}</h5>
            <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-1">{c.desc}</p>
          </div>
          <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700/60 text-[10px] font-mono font-bold">
            {c.formula}
          </div>
        </div>
      ))}
    </div>
  );
};

/**
 * 3. Egybevágósági transzformációk (Eltolás, Forgatás, Tengelyes tükrözés, Középpontos tükrözés)
 */
export const IsometryTransformationsDiagram: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 w-full ${className || ''}`}>
      {/* 1. Eltolás */}
      <div className="p-3.5 rounded-2xl border bg-white dark:bg-slate-900 border-sky-200 dark:border-sky-900/60 text-center space-y-2">
        <div className="font-bold text-xs text-sky-900 dark:text-sky-200">1. Eltolás (Transzláció)</div>
        <svg viewBox="0 0 140 85" className="w-full h-20">
          <polygon points="20,65 50,65 35,30" fill="rgba(2, 132, 199, 0.15)" stroke="#0284c7" strokeWidth="2" />
          <polygon points="85,45 115,45 100,10" fill="rgba(2, 132, 199, 0.3)" stroke="#0284c7" strokeWidth="2" />
          {/* Vector arrows */}
          <line x1="35" y1="30" x2="98" y2="12" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 2" />
          <line x1="50" y1="65" x2="113" y2="47" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 2" />
          <text x="65" y="30" className="text-[9px] font-bold fill-amber-600 font-mono">v vektor</text>
        </svg>
        <div className="text-[10px] text-slate-500">Irány és állás változatlan</div>
      </div>

      {/* 2. Elforgatás */}
      <div className="p-3.5 rounded-2xl border bg-white dark:bg-slate-900 border-indigo-200 dark:border-indigo-900/60 text-center space-y-2">
        <div className="font-bold text-xs text-indigo-900 dark:text-indigo-200">2. Elforgatás (Rotáció)</div>
        <svg viewBox="0 0 140 85" className="w-full h-20">
          <circle cx="70" cy="70" r="3.5" fill="#4f46e5" />
          <text x="70" y="82" textAnchor="middle" className="text-[9px] font-bold fill-indigo-600">O</text>
          <polygon points="25,55 50,65 30,30" fill="rgba(79, 70, 229, 0.15)" stroke="#4f46e5" strokeWidth="2" />
          <polygon points="80,25 105,40 105,10" fill="rgba(79, 70, 229, 0.3)" stroke="#4f46e5" strokeWidth="2" />
          <path d="M 40 45 A 45 45 0 0 1 90 25" fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="2 2" />
          <text x="65" y="32" className="text-[9px] font-bold fill-amber-600 font-mono">+α szög</text>
        </svg>
        <div className="text-[10px] text-slate-500">Körüljárási irány megmarad</div>
      </div>

      {/* 3. Tengelyes tükrözés */}
      <div className="p-3.5 rounded-2xl border bg-white dark:bg-slate-900 border-rose-200 dark:border-rose-900/60 text-center space-y-2">
        <div className="font-bold text-xs text-rose-900 dark:text-rose-200">3. Tengelyes tükrözés</div>
        <svg viewBox="0 0 140 85" className="w-full h-20">
          <line x1="70" y1="5" x2="70" y2="80" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 2" />
          <text x="73" y="15" className="text-[9px] font-black italic fill-red-600">t</text>
          <polygon points="20,60 55,70 35,25" fill="rgba(244, 63, 94, 0.15)" stroke="#e11d48" strokeWidth="2" />
          <polygon points="120,60 85,70 105,25" fill="rgba(244, 63, 94, 0.3)" stroke="#e11d48" strokeWidth="2" />
        </svg>
        <div className="text-[10px] font-bold text-rose-600">Körüljárási irány megfordul!</div>
      </div>

      {/* 4. Középpontos tükrözés */}
      <div className="p-3.5 rounded-2xl border bg-white dark:bg-slate-900 border-emerald-200 dark:border-emerald-900/60 text-center space-y-2">
        <div className="font-bold text-xs text-emerald-900 dark:text-emerald-200">4. Középpontos tükrözés</div>
        <svg viewBox="0 0 140 85" className="w-full h-20">
          <circle cx="70" cy="42" r="3.5" fill="#10b981" />
          <text x="70" y="55" textAnchor="middle" className="text-[9px] font-bold fill-emerald-600">O</text>
          <polygon points="20,30 50,40 30,10" fill="rgba(16, 185, 129, 0.15)" stroke="#059669" strokeWidth="2" />
          <polygon points="120,54 90,44 110,74" fill="rgba(16, 185, 129, 0.3)" stroke="#059669" strokeWidth="2" />
          <line x1="30" y1="10" x2="110" y2="74" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2 2" />
        </svg>
        <div className="text-[10px] text-slate-500">180°-os elforgatás O pont körül</div>
      </div>
    </div>
  );
};

// =========================================================================
// 🎯 DEDIKÁLT KVÍZ ÁBRÁK (Dedicated Figures for Quiz Questions)
// =========================================================================

/**
 * Vizuális Egybevágó / Nem Egybevágó Háromszög Pár
 */
export const CongruentTrianglesFigure: React.FC<{
  type?: 'congruent' | 'different_size' | 'different_angles';
  label1?: string;
  label2?: string;
  showMeasurements?: boolean;
}> = ({
  type = 'congruent',
  label1 = 'T₁',
  label2 = 'T₂',
  showMeasurements = true
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-gradient-to-b from-slate-50 to-slate-100/70 dark:from-slate-850 dark:to-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-inner">
      <svg viewBox="0 0 200 110" className="w-full max-w-[210px] h-auto select-none">
        {/* Triangle 1 */}
        <g transform="translate(10, 10)">
          <polygon points="10,80 70,80 30,20" fill="rgba(249, 115, 22, 0.15)" stroke="#ea580c" strokeWidth="2.5" />
          <circle cx="10" cy="80" r="3" fill="#ea580c" />
          <circle cx="70" cy="80" r="3" fill="#ea580c" />
          <circle cx="30" cy="20" r="3" fill="#ea580c" />
          <text x="35" y="60" textAnchor="middle" className="text-xs font-black fill-orange-700 dark:fill-orange-300">{label1}</text>
          {showMeasurements && (
            <>
              <text x="40" y="94" textAnchor="middle" className="text-[9px] font-bold fill-slate-500 font-mono">6 cm</text>
              <text x="12" y="45" textAnchor="middle" className="text-[9px] font-bold fill-slate-500 font-mono">5 cm</text>
            </>
          )}
        </g>

        {/* Relation indicator */}
        <text x="100" y="60" textAnchor="middle" className="text-lg font-black fill-slate-400 font-mono">
          {type === 'congruent' ? '≅' : '≇'}
        </text>

        {/* Triangle 2 */}
        <g transform={type === 'congruent' ? 'translate(190, 20) rotate(70)' : type === 'different_size' ? 'translate(115, 25) scale(0.7)' : 'translate(120, 10)'}>
          <polygon
            points={type === 'different_angles' ? '10,80 80,80 50,40' : '10,80 70,80 30,20'}
            fill={type === 'congruent' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)'}
            stroke={type === 'congruent' ? '#059669' : '#dc2626'}
            strokeWidth="2.5"
          />
          <text x="35" y="60" textAnchor="middle" className="text-xs font-black fill-slate-700 dark:fill-slate-300">{label2}</text>
        </g>
      </svg>
    </div>
  );
};

/**
 * Háromszög egybevágósági alapeset vizualizáló (o-o-o, o-sz-o, sz-o-sz, o-o-sz)
 */
export const TriangleCongruenceCaseFigure: React.FC<{
  givenCase: 'SSS' | 'SAS' | 'ASA' | 'SsA' | 'AAA';
  highlightColor?: string;
}> = ({ givenCase, highlightColor = '#0284c7' }) => {
  return (
    <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-gradient-to-b from-slate-50 to-slate-100/70 dark:from-slate-850 dark:to-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-inner">
      <svg viewBox="0 0 180 115" className="w-full max-w-[190px] h-auto select-none">
        {/* Base Triangle */}
        <polygon points="30,85 150,85 75,20" fill="rgba(2, 132, 199, 0.1)" stroke="#cbd5e1" strokeWidth="2" />

        {/* Sides highlighting based on case */}
        {(givenCase === 'SSS' || givenCase === 'SAS' || givenCase === 'SsA') && (
          <line x1="30" y1="85" x2="75" y2="20" stroke="#ea580c" strokeWidth="3.5" strokeLinecap="round" />
        )}
        {(givenCase === 'SSS' || givenCase === 'SAS' || givenCase === 'ASA' || givenCase === 'SsA') && (
          <line x1="30" y1="85" x2="150" y2="85" stroke="#10b981" strokeWidth="3.5" strokeLinecap="round" />
        )}
        {givenCase === 'SSS' && (
          <line x1="75" y1="20" x2="150" y2="85" stroke="#7c3aed" strokeWidth="3.5" strokeLinecap="round" />
        )}

        {/* Angles highlighting */}
        {(givenCase === 'SAS' || givenCase === 'ASA' || givenCase === 'AAA') && (
          <path d="M 50 85 A 20 20 0 0 0 42 68" fill="none" stroke="#f59e0b" strokeWidth="3" />
        )}
        {(givenCase === 'ASA' || givenCase === 'AAA') && (
          <path d="M 130 85 A 20 20 0 0 1 135 70" fill="none" stroke="#f59e0b" strokeWidth="3" />
        )}
        {givenCase === 'AAA' && (
          <path d="M 68 35 A 18 18 0 0 0 88 33" fill="none" stroke="#f59e0b" strokeWidth="3" />
        )}

        {/* Vertices */}
        <circle cx="30" cy="85" r="3.5" fill={highlightColor} />
        <circle cx="150" cy="85" r="3.5" fill={highlightColor} />
        <circle cx="75" cy="20" r="3.5" fill={highlightColor} />

        {/* Case Badge in bottom center */}
        <rect x="55" y="95" width="70" height="18" rx="5" className="fill-white dark:fill-slate-800 stroke-slate-300 dark:stroke-slate-600" strokeWidth="1" />
        <text x="90" y="108" textAnchor="middle" className="text-[11px] font-black fill-slate-800 dark:fill-slate-100 font-mono">
          {givenCase === 'SSS' ? '3 oldal (o-o-o)' : givenCase === 'SAS' ? '2 oldal + szög (o-sz-o)' : givenCase === 'ASA' ? '1 oldal + 2 szög (sz-o-sz)' : givenCase === 'SsA' ? '2 oldal + szög (o-o-sz)' : '3 szög (sz-sz-sz)'}
        </text>
      </svg>
    </div>
  );
};

/**
 * Transzformáció illusztráció (Eltolás, Forgatás, Tükrözés)
 */
export const MotionTransformationFigure: React.FC<{
  type: 'translation' | 'rotation' | 'axial_reflection' | 'central_reflection';
  label?: string;
}> = ({ type, label }) => {
  return (
    <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-gradient-to-b from-slate-50 to-slate-100/70 dark:from-slate-850 dark:to-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-inner">
      <svg viewBox="0 0 180 110" className="w-full max-w-[190px] h-auto select-none">
        {type === 'translation' && (
          <g>
            <polygon points="20,80 60,80 40,35" fill="rgba(2, 132, 199, 0.15)" stroke="#0284c7" strokeWidth="2.5" />
            <polygon points="105,55 145,55 125,10" fill="rgba(2, 132, 199, 0.3)" stroke="#0284c7" strokeWidth="2.5" />
            <line x1="40" y1="35" x2="120" y2="12" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3 2" />
            <circle cx="40" cy="35" r="3" fill="#0284c7" />
            <circle cx="125" cy="10" r="3" fill="#0284c7" />
            <text x="80" y="22" textAnchor="middle" className="text-[10px] font-bold fill-amber-600 font-mono">v eltolás</text>
          </g>
        )}

        {type === 'axial_reflection' && (
          <g>
            <line x1="90" y1="10" x2="90" y2="100" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 2" />
            <text x="94" y="20" className="text-[10px] font-black italic fill-red-600">t</text>
            <polygon points="25,75 70,85 45,30" fill="rgba(244, 63, 94, 0.15)" stroke="#e11d48" strokeWidth="2.5" />
            <polygon points="155,75 110,85 135,30" fill="rgba(244, 63, 94, 0.3)" stroke="#e11d48" strokeWidth="2.5" />
            <circle cx="45" cy="30" r="3" fill="#e11d48" />
            <circle cx="135" cy="30" r="3" fill="#e11d48" />
          </g>
        )}

        {type === 'rotation' && (
          <g>
            <circle cx="90" cy="85" r="4" fill="#4f46e5" />
            <text x="90" y="100" textAnchor="middle" className="text-[10px] font-bold fill-indigo-600">O</text>
            <polygon points="30,65 65,75 40,30" fill="rgba(79, 70, 229, 0.15)" stroke="#4f46e5" strokeWidth="2.5" />
            <polygon points="105,35 140,50 135,10" fill="rgba(79, 70, 229, 0.3)" stroke="#4f46e5" strokeWidth="2.5" />
            <path d="M 50 45 A 50 50 0 0 1 120 30" fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3 2" />
            <text x="85" y="32" className="text-[10px] font-bold fill-amber-600 font-mono">+60°</text>
          </g>
        )}

        {type === 'central_reflection' && (
          <g>
            <circle cx="90" cy="55" r="4" fill="#10b981" />
            <text x="90" y="70" textAnchor="middle" className="text-[10px] font-bold fill-emerald-600">O</text>
            <polygon points="25,45 65,55 40,15" fill="rgba(16, 185, 129, 0.15)" stroke="#059669" strokeWidth="2.5" />
            <polygon points="155,65 115,55 140,95" fill="rgba(16, 185, 129, 0.3)" stroke="#059669" strokeWidth="2.5" />
            <line x1="40" y1="15" x2="140" y2="95" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3 2" />
          </g>
        )}

        {label && (
          <text x="90" y="105" textAnchor="middle" className="text-[10px] font-bold fill-slate-600 dark:fill-slate-300">
            {label}
          </text>
        )}
      </svg>
    </div>
  );
};

/**
 * Ismeretlen oldal vagy szög keresése egybevágó háromszögben
 */
export const CongruenceSolverFigure: React.FC<{
  knownSide?: string;
  knownAngle?: string;
  findTarget?: 'side' | 'angle' | 'perimeter' | 'area';
}> = ({
  knownSide = 'c = 8 cm',
  knownAngle = 'α = 50°',
  findTarget = 'side'
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-gradient-to-b from-slate-50 to-slate-100/70 dark:from-slate-850 dark:to-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-inner">
      <svg viewBox="0 0 200 110" className="w-full max-w-[210px] h-auto select-none">
        {/* Triangle 1 */}
        <g transform="translate(10, 10)">
          <polygon points="10,80 70,80 30,20" fill="rgba(249, 115, 22, 0.12)" stroke="#ea580c" strokeWidth="2.5" />
          <text x="40" y="95" textAnchor="middle" className="text-[10px] font-bold fill-orange-600 font-mono">{knownSide}</text>
          <path d="M 25 80 A 15 15 0 0 0 20 68" fill="none" stroke="#0284c7" strokeWidth="2" />
          <text x="24" y="65" className="text-[9px] font-bold fill-cyan-600">{knownAngle}</text>
        </g>

        {/* ≅ */}
        <text x="100" y="55" textAnchor="middle" className="text-base font-black fill-slate-400 font-mono">≅</text>

        {/* Triangle 2 with ? */}
        <g transform="translate(180, 20) rotate(80)">
          <polygon points="10,80 70,80 30,20" fill="rgba(16, 185, 129, 0.12)" stroke="#059669" strokeWidth="2.5" />
        </g>
        <text x="145" y="95" textAnchor="middle" className="text-xs font-black fill-rose-600 animate-pulse font-mono">
          {findTarget === 'side' ? "c' = ?" : findTarget === 'angle' ? "α' = ?" : findTarget === 'perimeter' ? "K' = ?" : "T' = ?"}
        </text>
      </svg>
    </div>
  );
};

// =========================================================================
// 🧩 PÁROSÍTÓ KÁRTYA MINI ÁBRÁK (Compact Mini Card Figures for Matcher)
// =========================================================================

/**
 * 1. Háromszög Egybevágósági Esetek Mini Kártya Ábra
 */
export const CongruenceCaseMiniFigure: React.FC<{
  type: 'SSS' | 'SAS' | 'ASA' | 'SsA' | 'AAA' | 'right_angle' | 'equilateral' | 'isosceles_axis';
}> = ({ type }) => {
  return (
    <svg viewBox="0 0 90 54" className="w-20 h-12 select-none">
      {type === 'SSS' && (
        <g>
          <polygon points="15,44 75,44 40,10" fill="rgba(249, 115, 22, 0.1)" stroke="#ea580c" strokeWidth="2.5" />
          <line x1="15" y1="44" x2="75" y2="44" stroke="#ea580c" strokeWidth="3" />
          <line x1="15" y1="44" x2="40" y2="10" stroke="#059669" strokeWidth="3" />
          <line x1="40" y1="10" x2="75" y2="44" stroke="#7c3aed" strokeWidth="3" />
          <circle cx="15" cy="44" r="2.5" fill="#ea580c" />
          <circle cx="75" cy="44" r="2.5" fill="#ea580c" />
          <circle cx="40" cy="10" r="2.5" fill="#ea580c" />
        </g>
      )}

      {type === 'SAS' && (
        <g>
          <polygon points="15,44 75,44 40,10" fill="rgba(6, 182, 212, 0.1)" stroke="#cbd5e1" strokeWidth="1.5" />
          <line x1="15" y1="44" x2="75" y2="44" stroke="#0284c7" strokeWidth="3" />
          <line x1="15" y1="44" x2="40" y2="10" stroke="#059669" strokeWidth="3" />
          <path d="M 30 44 A 15 15 0 0 0 25 31" fill="none" stroke="#f59e0b" strokeWidth="2.5" />
          <circle cx="15" cy="44" r="2.5" fill="#0284c7" />
        </g>
      )}

      {type === 'ASA' && (
        <g>
          <polygon points="15,44 75,44 40,10" fill="rgba(16, 185, 129, 0.1)" stroke="#cbd5e1" strokeWidth="1.5" />
          <line x1="15" y1="44" x2="75" y2="44" stroke="#059669" strokeWidth="3.5" />
          <path d="M 30 44 A 15 15 0 0 0 25 31" fill="none" stroke="#f59e0b" strokeWidth="2.5" />
          <path d="M 60 44 A 15 15 0 0 1 65 31" fill="none" stroke="#f59e0b" strokeWidth="2.5" />
          <circle cx="15" cy="44" r="2.5" fill="#059669" />
          <circle cx="75" cy="44" r="2.5" fill="#059669" />
        </g>
      )}

      {type === 'SsA' && (
        <g>
          <polygon points="15,44 75,44 35,10" fill="rgba(124, 58, 237, 0.1)" stroke="#cbd5e1" strokeWidth="1.5" />
          <line x1="15" y1="44" x2="75" y2="44" stroke="#7c3aed" strokeWidth="3.5" />
          <line x1="15" y1="44" x2="35" y2="10" stroke="#ea580c" strokeWidth="2.5" />
          <path d="M 27 19 A 15 15 0 0 0 45 19" fill="none" stroke="#f59e0b" strokeWidth="2.5" />
        </g>
      )}

      {type === 'AAA' && (
        <g>
          <polygon points="15,44 75,44 45,10" fill="rgba(245, 158, 11, 0.1)" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="3 2" />
          <path d="M 30 44 A 15 15 0 0 0 25 31" fill="none" stroke="#f59e0b" strokeWidth="2.5" />
          <path d="M 60 44 A 15 15 0 0 1 65 31" fill="none" stroke="#f59e0b" strokeWidth="2.5" />
          <path d="M 38 18 A 12 12 0 0 0 52 18" fill="none" stroke="#f59e0b" strokeWidth="2.5" />
        </g>
      )}

      {type === 'right_angle' && (
        <g>
          <polygon points="18,44 72,44 18,10" fill="rgba(2, 132, 199, 0.12)" stroke="#0284c7" strokeWidth="2.5" />
          <line x1="18" y1="44" x2="72" y2="44" stroke="#0284c7" strokeWidth="3.5" />
          <line x1="18" y1="44" x2="18" y2="10" stroke="#059669" strokeWidth="3.5" />
          <path d="M 28 44 A 10 10 0 0 0 18 34" fill="none" stroke="#ef4444" strokeWidth="1.5" />
          <circle cx="22" cy="40" r="1" fill="#ef4444" />
        </g>
      )}

      {type === 'equilateral' && (
        <g>
          <polygon points="15,44 75,44 45,8" fill="rgba(16, 185, 129, 0.12)" stroke="#059669" strokeWidth="2.5" />
          <line x1="43" y1="41" x2="47" y2="47" stroke="#059669" strokeWidth="2" />
          <line x1="28" y1="24" x2="33" y2="28" stroke="#059669" strokeWidth="2" />
          <line x1="57" y1="28" x2="62" y2="24" stroke="#059669" strokeWidth="2" />
        </g>
      )}

      {type === 'isosceles_axis' && (
        <g>
          <polygon points="15,44 75,44 45,10" fill="rgba(249, 115, 22, 0.12)" stroke="#ea580c" strokeWidth="2" />
          <line x1="45" y1="10" x2="45" y2="44" stroke="#ef4444" strokeWidth="2" strokeDasharray="3 2" />
          <circle cx="45" cy="10" r="2.5" fill="#ea580c" />
        </g>
      )}
    </svg>
  );
};

/**
 * 2. Transzformációk Mini Kártya Ábra
 */
export const TransformationMiniFigure: React.FC<{
  type: 'translation' | 'rotation' | 'axial_reflection' | 'central_reflection';
}> = ({ type }) => {
  return (
    <svg viewBox="0 0 90 54" className="w-20 h-12 select-none">
      {type === 'translation' && (
        <g>
          <polygon points="10,42 32,42 20,20" fill="rgba(2, 132, 199, 0.15)" stroke="#0284c7" strokeWidth="1.5" />
          <polygon points="56,30 78,30 66,8" fill="rgba(2, 132, 199, 0.35)" stroke="#0284c7" strokeWidth="2" />
          <line x1="20" y1="20" x2="63" y2="9" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="2 2" />
          <line x1="32" y1="42" x2="75" y2="31" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="2 2" />
        </g>
      )}

      {type === 'rotation' && (
        <g>
          <circle cx="45" cy="44" r="2.5" fill="#4f46e5" />
          <polygon points="15,35 32,42 20,18" fill="rgba(79, 70, 229, 0.15)" stroke="#4f46e5" strokeWidth="1.5" />
          <polygon points="52,18 70,28 68,6" fill="rgba(79, 70, 229, 0.35)" stroke="#4f46e5" strokeWidth="2" />
          <path d="M 26 24 A 28 28 0 0 1 60 14" fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="2 2" />
        </g>
      )}

      {type === 'axial_reflection' && (
        <g>
          <line x1="45" y1="4" x2="45" y2="50" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 2" />
          <polygon points="12,38 38,44 24,15" fill="rgba(244, 63, 94, 0.15)" stroke="#e11d48" strokeWidth="1.5" />
          <polygon points="78,38 52,44 66,15" fill="rgba(244, 63, 94, 0.35)" stroke="#e11d48" strokeWidth="2" />
        </g>
      )}

      {type === 'central_reflection' && (
        <g>
          <circle cx="45" cy="27" r="2.5" fill="#059669" />
          <polygon points="12,22 32,28 18,8" fill="rgba(16, 185, 129, 0.15)" stroke="#059669" strokeWidth="1.5" />
          <polygon points="78,32 58,26 72,46" fill="rgba(16, 185, 129, 0.35)" stroke="#059669" strokeWidth="2" />
          <line x1="18" y1="8" x2="72" y2="46" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2 2" />
        </g>
      )}
    </svg>
  );
};

/**
 * 3. Egybevágó Alakzatpárok Mini Kártya Ábra
 */
export const CongruentShapesMiniFigure: React.FC<{
  type:
    | 'circles'
    | 'squares'
    | 'triangles'
    | 'segments'
    | 'angles'
    | 'perimeters'
    | 'areas'
    | 'orientation'
    | 'triangle_sides_angles';
}> = ({ type }) => {
  return (
    <svg viewBox="0 0 90 54" className="w-20 h-12 select-none">
      {type === 'circles' && (
        <g>
          <circle cx="24" cy="27" r="16" fill="rgba(2, 132, 199, 0.12)" stroke="#0284c7" strokeWidth="2" />
          <line x1="24" y1="27" x2="40" y2="27" stroke="#0284c7" strokeWidth="1.5" />
          <circle cx="66" cy="27" r="16" fill="rgba(16, 185, 129, 0.12)" stroke="#059669" strokeWidth="2" />
          <line x1="66" y1="27" x2="82" y2="27" stroke="#059669" strokeWidth="1.5" />
        </g>
      )}

      {type === 'squares' && (
        <g>
          <rect x="10" y="13" width="28" height="28" rx="2" fill="rgba(249, 115, 22, 0.12)" stroke="#ea580c" strokeWidth="2" />
          <g transform="translate(64, 27) rotate(25) translate(-14, -14)">
            <rect x="0" y="0" width="28" height="28" rx="2" fill="rgba(16, 185, 129, 0.12)" stroke="#059669" strokeWidth="2" />
          </g>
        </g>
      )}

      {type === 'triangles' && (
        <g>
          <polygon points="10,42 38,42 22,14" fill="rgba(249, 115, 22, 0.12)" stroke="#ea580c" strokeWidth="2" />
          <g transform="translate(66, 28) rotate(45) translate(-14, -14)">
            <polygon points="0,28 28,28 12,0" fill="rgba(16, 185, 129, 0.12)" stroke="#059669" strokeWidth="2" />
          </g>
        </g>
      )}

      {type === 'segments' && (
        <g>
          <line x1="8" y1="27" x2="40" y2="27" stroke="#0284c7" strokeWidth="3" strokeLinecap="round" />
          <circle cx="8" cy="27" r="2.5" fill="#0284c7" />
          <circle cx="40" cy="27" r="2.5" fill="#0284c7" />
          <line x1="52" y1="16" x2="82" y2="38" stroke="#059669" strokeWidth="3" strokeLinecap="round" />
          <circle cx="52" cy="16" r="2.5" fill="#059669" />
          <circle cx="82" cy="38" r="2.5" fill="#059669" />
        </g>
      )}

      {type === 'angles' && (
        <g>
          <path d="M 35 15 L 12 38 L 42 38" fill="none" stroke="#0284c7" strokeWidth="2" />
          <path d="M 24 38 A 12 12 0 0 0 20 28" fill="none" stroke="#f59e0b" strokeWidth="2" />
          <g transform="translate(68, 26) rotate(35) translate(-15, -15)">
            <path d="M 30 5 L 7 28 L 37 28" fill="none" stroke="#059669" strokeWidth="2" />
            <path d="M 19 28 A 12 12 0 0 0 15 18" fill="none" stroke="#f59e0b" strokeWidth="2" />
          </g>
        </g>
      )}

      {type === 'perimeters' && (
        <g>
          <polygon points="12,42 40,42 22,14" fill="rgba(16, 185, 129, 0.1)" stroke="#059669" strokeWidth="2" />
          <text x="26" y="34" textAnchor="middle" className="text-[8px] font-bold fill-emerald-600 font-mono">K=18</text>
          <polygon points="52,42 80,42 62,14" fill="rgba(16, 185, 129, 0.1)" stroke="#059669" strokeWidth="2" />
          <text x="66" y="34" textAnchor="middle" className="text-[8px] font-bold fill-emerald-600 font-mono">K'=18</text>
        </g>
      )}

      {type === 'areas' && (
        <g>
          <polygon points="12,42 40,42 22,14" fill="rgba(124, 58, 237, 0.15)" stroke="#7c3aed" strokeWidth="2" />
          <text x="26" y="34" textAnchor="middle" className="text-[8px] font-bold fill-purple-600 font-mono">T=15</text>
          <polygon points="52,42 80,42 62,14" fill="rgba(124, 58, 237, 0.15)" stroke="#7c3aed" strokeWidth="2" />
          <text x="66" y="34" textAnchor="middle" className="text-[8px] font-bold fill-purple-600 font-mono">T'=15</text>
        </g>
      )}

      {type === 'orientation' && (
        <g>
          <polygon points="12,40 38,40 22,15" fill="rgba(2, 132, 199, 0.1)" stroke="#0284c7" strokeWidth="1.5" />
          <text x="10" y="48" className="text-[7px] font-bold fill-sky-600">A</text>
          <text x="38" y="48" className="text-[7px] font-bold fill-sky-600">B</text>
          <text x="20" y="12" className="text-[7px] font-bold fill-sky-600">C</text>
          <polygon points="78,40 52,40 68,15" fill="rgba(244, 63, 94, 0.1)" stroke="#e11d48" strokeWidth="1.5" />
          <text x="78" y="48" className="text-[7px] font-bold fill-rose-600">A'</text>
          <text x="50" y="48" className="text-[7px] font-bold fill-rose-600">B'</text>
          <text x="66" y="12" className="text-[7px] font-bold fill-rose-600">C'</text>
        </g>
      )}

      {type === 'triangle_sides_angles' && (
        <g>
          <polygon points="15,44 75,44 35,12" fill="rgba(249, 115, 22, 0.12)" stroke="#ea580c" strokeWidth="2" />
          <text x="45" y="52" textAnchor="middle" className="text-[8px] font-bold fill-orange-600 font-mono">a=6</text>
          <text x="18" y="26" textAnchor="middle" className="text-[8px] font-bold fill-orange-600 font-mono">b=8</text>
          <path d="M 62 44 A 12 12 0 0 1 66 34" fill="none" stroke="#0284c7" strokeWidth="2" />
          <text x="56" y="38" className="text-[7px] font-bold fill-sky-600">70°</text>
        </g>
      )}
    </svg>
  );
};

/**
 * 4. Alakzat Felbontások Mini Kártya Ábra
 */
export const PolygonSplitMiniFigure: React.FC<{
  type: 'rectangle' | 'rhombus';
}> = ({ type }) => {
  return (
    <svg viewBox="0 0 90 54" className="w-20 h-12 select-none">
      {type === 'rectangle' && (
        <g>
          <rect x="15" y="12" width="60" height="30" fill="rgba(2, 132, 199, 0.1)" stroke="#0284c7" strokeWidth="2" />
          <line x1="15" y1="42" x2="75" y2="12" stroke="#ea580c" strokeWidth="2" strokeDasharray="3 2" />
          <text x="32" y="24" className="text-[8px] font-bold fill-orange-600">△₁</text>
          <text x="54" y="36" className="text-[8px] font-bold fill-cyan-600">△₂</text>
        </g>
      )}

      {type === 'rhombus' && (
        <g>
          <polygon points="45,8 78,27 45,46 12,27" fill="rgba(16, 185, 129, 0.1)" stroke="#059669" strokeWidth="2" />
          <line x1="45" y1="8" x2="45" y2="46" stroke="#ea580c" strokeWidth="1.5" strokeDasharray="2 2" />
          <line x1="12" y1="27" x2="78" y2="27" stroke="#ea580c" strokeWidth="1.5" strokeDasharray="2 2" />
          <circle cx="45" cy="27" r="1.5" fill="#ea580c" />
        </g>
      )}
    </svg>
  );
};

