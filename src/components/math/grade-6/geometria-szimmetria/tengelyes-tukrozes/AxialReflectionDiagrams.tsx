import React, { useState } from 'react';
import { MathText } from '@/components/math/shared/MathText';
import { Button } from '@/components/ui/button';
import { RotateCcw, Sparkles } from 'lucide-react';

// =========================================================================
// 1. PONT ÉS SZAKASZ TÜKRÖZÉSE DIAGRAM
// =========================================================================
export const PointReflectionDiagram: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className="flex flex-col items-center gap-2 my-4">
      <svg
        viewBox="0 0 540 240"
        className={`w-full max-w-xl h-auto select-none rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 shadow-sm ${className || ''}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <marker id="axis-arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#059669" />
          </marker>
        </defs>

        {/* Tükrözési tengely (t) */}
        <line x1="270" y1="20" x2="270" y2="220" stroke="#059669" strokeWidth="3" markerEnd="url(#axis-arrow)" markerStart="url(#axis-arrow)" />
        <text x="285" y="32" className="text-xs font-black fill-emerald-600 font-sans">t (tükrözési tengely)</text>

        {/* 1. Pont tükrözése (P -> P') */}
        <line x1="120" y1="70" x2="420" y2="70" stroke="#94a3b8" strokeWidth="2" strokeDasharray="4 4" />
        
        {/* Derékszög jelölés a tengelynél (Magyar szabvány: körív + pont) */}
        <path d="M 282 70 A 12 12 0 0 0 270 58" fill="none" stroke="#ef4444" strokeWidth="1.5" />
        <circle cx="276" cy="64" r="1.5" fill="#ef4444" />

        {/* Távolság-egyenlőség jelölések (két vonás) */}
        <line x1="192" y1="65" x2="192" y2="75" stroke="#0284c7" strokeWidth="2" />
        <line x1="197" y1="65" x2="197" y2="75" stroke="#0284c7" strokeWidth="2" />
        <line x1="342" y1="65" x2="342" y2="75" stroke="#0284c7" strokeWidth="2" />
        <line x1="347" y1="65" x2="347" y2="75" stroke="#0284c7" strokeWidth="2" />

        {/* P pont */}
        <circle cx="120" cy="70" r="5" fill="#0284c7" />
        <text x="105" y="65" className="text-sm font-black fill-blue-600 font-sans">P</text>
        <text x="120" y="92" textAnchor="middle" className="text-[10px] font-bold fill-slate-500">eredeti pont</text>

        {/* F felezőpont a tengelyen */}
        <circle cx="270" cy="70" r="3.5" fill="#059669" />
        <text x="258" y="64" className="text-[10px] font-bold fill-emerald-700 font-sans">F</text>

        {/* P' tükörkép */}
        <circle cx="420" cy="70" r="5" fill="#e11d48" />
        <text x="430" y="65" className="text-sm font-black fill-rose-600 font-sans">P'</text>
        <text x="420" y="92" textAnchor="middle" className="text-[10px] font-bold fill-rose-500">tükörkép</text>

        {/* 2. Tengelyen fekvő fixpont (Q = Q') */}
        <circle cx="270" cy="170" r="6" fill="#f59e0b" stroke="#d97706" strokeWidth="2" />
        <text x="285" y="174" className="text-xs font-black fill-amber-600 font-sans">Q = Q' (Fixpont)</text>
        <text x="285" y="190" className="text-[10px] font-bold fill-slate-500">Tengelyen lévő pont képe önmaga</text>
      </svg>
      <p className="text-xs text-center text-slate-500 max-w-md">
        <strong>A pont tükrözésének szabálya:</strong> A <MathText>{"PP'"}</MathText> szakasz merőleges a <MathText>t</MathText> tengelyre, és a tengely felezi a szakaszt: <MathText>{"d(P, t) = d(P', t)"}</MathText>.
      </p>
    </div>
  );
};

// =========================================================================
// 2. KÖRÜLJÁRÁSI IRÁNY MEGFORDULÁSA (TRIANGLE ORIENTATION)
// =========================================================================
export const TriangleReflectionDiagram: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className="flex flex-col items-center gap-2 my-4">
      <svg
        viewBox="0 0 540 260"
        className={`w-full max-w-xl h-auto select-none rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 shadow-sm ${className || ''}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <marker id="cw-arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#e11d48" />
          </marker>
          <marker id="ccw-arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#0284c7" />
          </marker>
        </defs>

        {/* Tükrözési tengely (t) */}
        <line x1="270" y1="15" x2="270" y2="245" stroke="#059669" strokeWidth="2.5" strokeDasharray="6 4" />
        <text x="275" y="28" className="text-xs font-black fill-emerald-600 font-sans">t</text>

        {/* Összekötő vetítővonalak */}
        <line x1="160" y1="45" x2="380" y2="45" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="3 3" />
        <line x1="70" y1="195" x2="470" y2="195" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="3 3" />
        <line x1="210" y1="215" x2="330" y2="215" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="3 3" />

        {/* Eredeti Háromszög ABC (bal oldal) */}
        <polygon points="160,45 70,195 210,215" fill="rgba(2, 132, 199, 0.12)" stroke="#0284c7" strokeWidth="3" />
        <circle cx="160" cy="45" r="4.5" fill="#0284c7" />
        <text x="160" y="32" textAnchor="middle" className="text-sm font-black fill-blue-700">A</text>
        <circle cx="70" cy="195" r="4.5" fill="#0284c7" />
        <text x="52" y="202" className="text-sm font-black fill-blue-700">B</text>
        <circle cx="210" cy="215" r="4.5" fill="#0284c7" />
        <text x="222" y="222" className="text-sm font-black fill-blue-700">C</text>

        {/* Körüljárási nyíl (ABC: óramutatóval ellentétes, pozitív) */}
        <path d="M 125 125 A 35 35 0 0 1 165 155" fill="none" stroke="#0284c7" strokeWidth="2.5" markerEnd="url(#ccw-arrow)" />
        <text x="145" y="140" textAnchor="middle" className="text-[10px] font-bold fill-blue-600">A → B → C</text>
        <text x="145" y="152" textAnchor="middle" className="text-[9px] font-extrabold fill-blue-500">Pozitív körüljárás (+)</text>

        {/* Tükörkép Háromszög A'B'C' (jobb oldal) */}
        <polygon points="380,45 470,195 330,215" fill="rgba(225, 29, 72, 0.12)" stroke="#e11d48" strokeWidth="3" />
        <circle cx="380" cy="45" r="4.5" fill="#e11d48" />
        <text x="380" y="32" textAnchor="middle" className="text-sm font-black fill-rose-700">A'</text>
        <circle cx="470" cy="195" r="4.5" fill="#e11d48" />
        <text x="480" y="202" className="text-sm font-black fill-rose-700">B'</text>
        <circle cx="330" cy="215" r="4.5" fill="#e11d48" />
        <text x="312" y="222" className="text-sm font-black fill-rose-700">C'</text>

        {/* Körüljárási nyíl (A'B'C': óramutatóval megegyező, negatív) */}
        <path d="M 415 125 A 35 35 0 0 0 375 155" fill="none" stroke="#e11d48" strokeWidth="2.5" markerEnd="url(#cw-arrow)" />
        <text x="395" y="140" textAnchor="middle" className="text-[10px] font-bold fill-rose-600">A' → B' → C'</text>
        <text x="395" y="152" textAnchor="middle" className="text-[9px] font-extrabold fill-rose-500">Negatív körüljárás (-)</text>
      </svg>
      <p className="text-xs text-center text-slate-500 max-w-md">
        <strong>Fontos tétel:</strong> A tengelyes tükrözés egybevágósági transzformáció, de <strong>megfordítja a síkbeli alakzatok körüljárási irányát</strong>.
      </p>
    </div>
  );
};

// =========================================================================
// 3. KOORDINÁTA TÜKRÖZÉS DIAGRAM (x ÉS y TENGELYRE)
// =========================================================================
export const CoordinateReflectionDiagram: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className="flex flex-col items-center gap-2 my-4">
      <svg
        viewBox="0 0 540 320"
        className={`w-full max-w-xl h-auto select-none rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 shadow-sm ${className || ''}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <marker id="grid-arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 2 L 8 5 L 0 8 z" fill="#64748b" />
          </marker>
        </defs>

        {/* Rácsvonalak */}
        <g stroke="#f1f5f9" strokeWidth="1">
          {[40, 80, 120, 160, 200, 240, 280, 320, 360, 400, 440, 480, 520].map((x) => (
            <line key={`x-${x}`} x1={x} y1="20" x2={x} y2="300" />
          ))}
          {[40, 80, 120, 160, 200, 240, 280].map((y) => (
            <line key={`y-${y}`} x1="20" y1={y} x2="520" y2={y} />
          ))}
        </g>

        {/* Főtengelyek: Origó = (270, 160) */}
        <line x1="30" y1="160" x2="510" y2="160" stroke="#334155" strokeWidth="2.5" markerEnd="url(#grid-arrow)" />
        <line x1="270" y1="290" x2="270" y2="30" stroke="#334155" strokeWidth="2.5" markerEnd="url(#grid-arrow)" />
        <text x="515" y="165" className="text-xs font-black fill-slate-700">x</text>
        <text x="275" y="24" className="text-xs font-black fill-slate-700">y</text>
        <text x="258" y="176" className="text-xs font-bold fill-slate-400">O</text>

        {/* Vetítő szaggatott vonalak */}
        <line x1="410" y1="60" x2="410" y2="260" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3 3" />
        <line x1="130" y1="60" x2="410" y2="60" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3 3" />
        <line x1="130" y1="260" x2="410" y2="260" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3 3" />
        <line x1="130" y1="60" x2="130" y2="260" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3 3" />

        {/* 1. Eredeti pont: P(4; 3) */}
        <circle cx="410" cy="60" r="5.5" fill="#0284c7" />
        <text x="418" y="54" className="text-xs font-black fill-blue-600">P (4; 3)</text>
        <text x="418" y="70" className="text-[10px] font-bold fill-slate-400">I. negyed</text>

        {/* 2. x-tengelyre tükrözve: P_x(4; -3) */}
        <circle cx="410" cy="260" r="5.5" fill="#e11d48" />
        <text x="418" y="258" className="text-xs font-black fill-rose-600">P_x (4; -3)</text>
        <text x="418" y="274" className="text-[10px] font-bold fill-rose-400">x-tengelyes kép: (x; -y)</text>

        {/* 3. y-tengelyre tükrözve: P_y(-4; 3) */}
        <circle cx="130" cy="60" r="5.5" fill="#10b981" />
        <text x="50" y="54" className="text-xs font-black fill-emerald-600">P_y (-4; 3)</text>
        <text x="45" y="70" className="text-[10px] font-bold fill-emerald-500">y-tengelyes kép: (-x; y)</text>

        {/* 4. Origóra tükrözve: P_O(-4; -3) */}
        <circle cx="130" cy="260" r="5.5" fill="#8b5cf6" />
        <text x="45" y="258" className="text-xs font-black fill-purple-600">P_O (-4; -3)</text>
        <text x="40" y="274" className="text-[10px] font-bold fill-purple-400">Középpontos kép: (-x; -y)</text>
      </svg>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs w-full max-w-xl text-slate-700 dark:text-slate-300">
        <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900">
          <strong className="text-rose-700 dark:text-rose-300">Tükrözés az x-tengelyre:</strong>
          <p className="mt-0.5"><MathText>{"(x; y) \\to (x; -y)"}</MathText> (a 2. koordináta előjele vált)</p>
        </div>
        <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900">
          <strong className="text-emerald-700 dark:text-emerald-300">Tükrözés az y-tengelyre:</strong>
          <p className="mt-0.5"><MathText>{"(x; y) \\to (-x; y)"}</MathText> (az 1. koordináta előjele vált)</p>
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// 4. INTERAKTÍV TÜKRÖZÉS SZIMULÁTOR / LABOR
// =========================================================================
export const InteractiveReflectionSimulator: React.FC = () => {
  const [pointPos, setPointPos] = useState<{ x: number; y: number }>({ x: 120, y: 90 });
  const [shapeMode, setShapeMode] = useState<'point' | 'triangle' | 'flag'>('triangle');

  const axisX = 260; // Tükrözési tengely x pozíciója

  const handleSvgClick = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = ((e.clientX - rect.left) / rect.width) * 520;
    const clickY = ((e.clientY - rect.top) / rect.height) * 260;
    // Keep point on left side for clarity
    setPointPos({
      x: Math.min(axisX - 25, Math.max(30, Math.round(clickX))),
      y: Math.min(230, Math.max(30, Math.round(clickY)))
    });
  };

  const mirroredX = axisX + (axisX - pointPos.x);

  return (
    <div className="p-4 rounded-3xl bg-slate-50 dark:bg-slate-850 border-2 border-slate-200 dark:border-slate-800 space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h4 className="font-black text-sm text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            Interaktív Tengelyes Tükrözés Labor
          </h4>
          <p className="text-xs text-slate-500">
            Kattints a bal oldali síkrészre az alakzat mozgatásához és figyeld a tükörképet!
          </p>
        </div>

        {/* Mode Selector */}
        <div className="flex items-center gap-1 bg-white dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
          <button
            type="button"
            onClick={() => setShapeMode('point')}
            className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
              shapeMode === 'point' ? 'bg-emerald-500 text-white shadow-xs' : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Pont
          </button>
          <button
            type="button"
            onClick={() => setShapeMode('triangle')}
            className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
              shapeMode === 'triangle' ? 'bg-emerald-500 text-white shadow-xs' : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Háromszög
          </button>
          <button
            type="button"
            onClick={() => setShapeMode('flag')}
            className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
              shapeMode === 'flag' ? 'bg-emerald-500 text-white shadow-xs' : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Zászló (L)
          </button>
        </div>
      </div>

      <div className="relative">
        <svg
          viewBox="0 0 520 260"
          onClick={handleSvgClick}
          className="w-full h-auto bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 cursor-crosshair select-none"
        >
          {/* Tükrözési tengely (t) */}
          <line x1={axisX} y1="10" x2={axisX} y2="250" stroke="#059669" strokeWidth="3" />
          <text x={axisX + 8} y="25" className="text-xs font-black fill-emerald-600 font-sans">t (tengely)</text>

          {/* POINT MODE */}
          {shapeMode === 'point' && (
            <g>
              <line x1={pointPos.x} y1={pointPos.y} x2={mirroredX} y2={pointPos.y} stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="3 3" />
              <path d={`M ${axisX + 10} ${pointPos.y} A 10 10 0 0 0 ${axisX} ${pointPos.y - 10}`} fill="none" stroke="#ef4444" strokeWidth="1.5" />
              <circle cx={axisX + 5} cy={pointPos.y - 5} r="1.2" fill="#ef4444" />

              <circle cx={pointPos.x} cy={pointPos.y} r="6" fill="#0284c7" />
              <text x={pointPos.x - 12} y={pointPos.y - 8} className="text-xs font-black fill-blue-600">P</text>

              <circle cx={mirroredX} cy={pointPos.y} r="6" fill="#e11d48" />
              <text x={mirroredX + 12} y={pointPos.y - 8} className="text-xs font-black fill-rose-600">P'</text>
            </g>
          )}

          {/* TRIANGLE MODE */}
          {shapeMode === 'triangle' && (
            <g>
              {/* Eredeti Háromszög */}
              <polygon
                points={`${pointPos.x},${pointPos.y} ${pointPos.x - 40},${pointPos.y + 70} ${pointPos.x + 30},${pointPos.y + 60}`}
                fill="rgba(2, 132, 199, 0.15)"
                stroke="#0284c7"
                strokeWidth="2.5"
              />
              <circle cx={pointPos.x} cy={pointPos.y} r="4" fill="#0284c7" />
              <text x={pointPos.x} y={pointPos.y - 6} textAnchor="middle" className="text-[11px] font-black fill-blue-700">A</text>
              <circle cx={pointPos.x - 40} cy={pointPos.y + 70} r="4" fill="#0284c7" />
              <text x={pointPos.x - 48} y={pointPos.y + 75} className="text-[11px] font-black fill-blue-700">B</text>
              <circle cx={pointPos.x + 30} cy={pointPos.y + 60} r="4" fill="#0284c7" />
              <text x={pointPos.x + 36} y={pointPos.y + 65} className="text-[11px] font-black fill-blue-700">C</text>

              {/* Tükörkép Háromszög */}
              <polygon
                points={`${mirroredX},${pointPos.y} ${axisX + (axisX - (pointPos.x - 40))},${pointPos.y + 70} ${axisX + (axisX - (pointPos.x + 30))},${pointPos.y + 60}`}
                fill="rgba(225, 29, 72, 0.15)"
                stroke="#e11d48"
                strokeWidth="2.5"
              />
              <circle cx={mirroredX} cy={pointPos.y} r="4" fill="#e11d48" />
              <text x={mirroredX} y={pointPos.y - 6} textAnchor="middle" className="text-[11px] font-black fill-rose-700">A'</text>
              <circle cx={axisX + (axisX - (pointPos.x - 40))} cy={pointPos.y + 70} r="4" fill="#e11d48" />
              <text x={axisX + (axisX - (pointPos.x - 40)) + 8} y={pointPos.y + 75} className="text-[11px] font-black fill-rose-700">B'</text>
              <circle cx={axisX + (axisX - (pointPos.x + 30))} cy={pointPos.y + 60} r="4" fill="#e11d48" />
              <text x={axisX + (axisX - (pointPos.x + 30)) - 16} y={pointPos.y + 65} className="text-[11px] font-black fill-rose-700">C'</text>
            </g>
          )}

          {/* FLAG (L-SHAPE) MODE */}
          {shapeMode === 'flag' && (
            <g>
              {/* Eredeti Zászló */}
              <path
                d={`M ${pointPos.x} ${pointPos.y} L ${pointPos.x} ${pointPos.y + 80} M ${pointPos.x} ${pointPos.y} L ${pointPos.x + 40} ${pointPos.y + 20} L ${pointPos.x} ${pointPos.y + 40}`}
                stroke="#0284c7"
                strokeWidth="3"
                fill="rgba(2, 132, 199, 0.2)"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Tükörkép Zászló */}
              <path
                d={`M ${mirroredX} ${pointPos.y} L ${mirroredX} ${pointPos.y + 80} M ${mirroredX} ${pointPos.y} L ${mirroredX - 40} ${pointPos.y + 20} L ${mirroredX} ${pointPos.y + 40}`}
                stroke="#e11d48"
                strokeWidth="3"
                fill="rgba(225, 29, 72, 0.2)"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          )}
        </svg>
      </div>

      <div className="flex items-center justify-between text-xs text-slate-500 font-medium px-1">
        <span>Távolság a tengelytől: <strong>{axisX - pointPos.x} px</strong></span>
        <span>A tükörkép távolsága a tengelytől: <strong>{mirroredX - axisX} px (egyenlő!)</strong></span>
      </div>
    </div>
  );
};

// =========================================================================
// 5. KOMPAKT MINI KÁRTYA ÁBRÁK (ReflectionMiniFigure)
// =========================================================================
export const ReflectionMiniFigure: React.FC<{
  type:
    | 'point_reflection'
    | 'fix_point'
    | 'segment_parallel'
    | 'segment_intersecting'
    | 'triangle_inverted'
    | 'coord_x'
    | 'coord_y'
    | 'coord_orig'
    | 'axis_construction'
    | 'involutive'
    | 'angle_reflection'
    | 'circle_reflection';
}> = ({ type }) => {
  return (
    <svg viewBox="0 0 90 50" className="w-[72px] h-[40px] select-none overflow-visible">
      {type === 'point_reflection' && (
        <g>
          <line x1="45" y1="4" x2="45" y2="46" stroke="#059669" strokeWidth="2" strokeDasharray="3 2" />
          <line x1="15" y1="25" x2="75" y2="25" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="2 2" />
          <circle cx="18" cy="25" r="3.5" fill="#0284c7" />
          <circle cx="72" cy="25" r="3.5" fill="#e11d48" />
          <text x="18" y="16" textAnchor="middle" className="text-[8px] font-bold fill-blue-600">P</text>
          <text x="72" y="16" textAnchor="middle" className="text-[8px] font-bold fill-rose-600">P'</text>
        </g>
      )}

      {type === 'fix_point' && (
        <g>
          <line x1="45" y1="4" x2="45" y2="46" stroke="#059669" strokeWidth="2.5" />
          <circle cx="45" cy="25" r="5" fill="#f59e0b" stroke="#d97706" strokeWidth="1.5" />
          <text x="45" y="15" textAnchor="middle" className="text-[7px] font-black fill-amber-700">Q = Q'</text>
        </g>
      )}

      {type === 'segment_parallel' && (
        <g>
          <line x1="45" y1="4" x2="45" y2="46" stroke="#059669" strokeWidth="2" strokeDasharray="3 2" />
          <line x1="22" y1="12" x2="22" y2="38" stroke="#0284c7" strokeWidth="3" strokeLinecap="round" />
          <line x1="68" y1="12" x2="68" y2="38" stroke="#e11d48" strokeWidth="3" strokeLinecap="round" />
        </g>
      )}

      {type === 'segment_intersecting' && (
        <g>
          <line x1="45" y1="4" x2="45" y2="46" stroke="#059669" strokeWidth="2" />
          <line x1="15" y1="12" x2="75" y2="38" stroke="#0284c7" strokeWidth="2" strokeLinecap="round" />
          <line x1="15" y1="38" x2="75" y2="12" stroke="#e11d48" strokeWidth="2" strokeLinecap="round" />
          <circle cx="45" cy="25" r="3" fill="#f59e0b" />
        </g>
      )}

      {type === 'triangle_inverted' && (
        <g>
          <line x1="45" y1="4" x2="45" y2="46" stroke="#059669" strokeWidth="1.5" strokeDasharray="3 2" />
          <polygon points="35,12 12,38 38,42" fill="rgba(2, 132, 199, 0.2)" stroke="#0284c7" strokeWidth="1.5" />
          <polygon points="55,12 78,38 52,42" fill="rgba(225, 29, 72, 0.2)" stroke="#e11d48" strokeWidth="1.5" />
        </g>
      )}

      {type === 'coord_x' && (
        <g>
          <line x1="10" y1="25" x2="80" y2="25" stroke="#334155" strokeWidth="2" />
          <line x1="45" y1="4" x2="45" y2="46" stroke="#cbd5e1" strokeWidth="1" />
          <circle cx="65" cy="12" r="3" fill="#0284c7" />
          <circle cx="65" cy="38" r="3" fill="#e11d48" />
          <line x1="65" y1="12" x2="65" y2="38" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2 1" />
        </g>
      )}

      {type === 'coord_y' && (
        <g>
          <line x1="45" y1="4" x2="45" y2="46" stroke="#334155" strokeWidth="2" />
          <line x1="10" y1="25" x2="80" y2="25" stroke="#cbd5e1" strokeWidth="1" />
          <circle cx="20" cy="14" r="3" fill="#0284c7" />
          <circle cx="70" cy="14" r="3" fill="#e11d48" />
          <line x1="20" y1="14" x2="70" y2="14" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2 1" />
        </g>
      )}

      {type === 'coord_orig' && (
        <g>
          <line x1="10" y1="25" x2="80" y2="25" stroke="#94a3b8" strokeWidth="1" />
          <line x1="45" y1="4" x2="45" y2="46" stroke="#94a3b8" strokeWidth="1" />
          <circle cx="22" cy="12" r="3" fill="#0284c7" />
          <circle cx="68" cy="38" r="3" fill="#8b5cf6" />
          <circle cx="45" cy="25" r="2" fill="#334155" />
          <line x1="22" y1="12" x2="68" y2="38" stroke="#8b5cf6" strokeWidth="1" strokeDasharray="2 1" />
        </g>
      )}

      {type === 'axis_construction' && (
        <g>
          <circle cx="20" cy="25" r="3" fill="#0284c7" />
          <circle cx="70" cy="25" r="3" fill="#e11d48" />
          <line x1="20" y1="25" x2="70" y2="25" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="2 2" />
          <path d="M 40 10 A 30 30 0 0 1 50 10" fill="none" stroke="#f59e0b" strokeWidth="1.5" />
          <path d="M 40 40 A 30 30 0 0 1 50 40" fill="none" stroke="#f59e0b" strokeWidth="1.5" />
          <line x1="45" y1="4" x2="45" y2="46" stroke="#059669" strokeWidth="2" />
        </g>
      )}

      {type === 'involutive' && (
        <g>
          <line x1="45" y1="4" x2="45" y2="46" stroke="#059669" strokeWidth="2" />
          <circle cx="20" cy="25" r="3.5" fill="#0284c7" />
          <path d="M 23 20 C 35 10, 55 10, 67 20" fill="none" stroke="#0284c7" strokeWidth="1.2" />
          <path d="M 67 30 C 55 40, 35 40, 23 30" fill="none" stroke="#e11d48" strokeWidth="1.2" />
          <circle cx="70" cy="25" r="3.5" fill="#e11d48" />
        </g>
      )}

      {type === 'angle_reflection' && (
        <g>
          <line x1="45" y1="4" x2="45" y2="46" stroke="#059669" strokeWidth="1.5" strokeDasharray="3 2" />
          <path d="M 12 38 L 35 25 L 15 12" fill="none" stroke="#0284c7" strokeWidth="2" />
          <path d="M 78 38 L 55 25 L 75 12" fill="none" stroke="#e11d48" strokeWidth="2" />
        </g>
      )}

      {type === 'circle_reflection' && (
        <g>
          <line x1="45" y1="4" x2="45" y2="46" stroke="#059669" strokeWidth="1.5" strokeDasharray="3 2" />
          <circle cx="24" cy="25" r="14" fill="rgba(2, 132, 199, 0.15)" stroke="#0284c7" strokeWidth="1.5" />
          <circle cx="24" cy="25" r="1.5" fill="#0284c7" />
          <circle cx="66" cy="25" r="14" fill="rgba(225, 29, 72, 0.15)" stroke="#e11d48" strokeWidth="1.5" />
          <circle cx="66" cy="25" r="1.5" fill="#e11d48" />
        </g>
      )}
    </svg>
  );
};
