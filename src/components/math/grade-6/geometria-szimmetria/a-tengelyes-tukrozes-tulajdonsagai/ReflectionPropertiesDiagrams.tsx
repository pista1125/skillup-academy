import React, { useState } from 'react';
import { MathText } from '@/components/math/shared/MathText';
import { Button } from '@/components/ui/button';
import { RotateCcw, Sparkles, MoveRight, Layers, Compass, CheckCircle2 } from 'lucide-react';

// =========================================================================
// 1. TULAJDONSÁGOK ÁTTEKINTÉSE (PROPERTIES OVERVIEW DIAGRAM)
// =========================================================================
export const PropertiesOverviewDiagram: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className="flex flex-col items-center gap-2 my-4">
      <svg
        viewBox="0 0 560 260"
        className={`w-full max-w-xl h-auto select-none rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 shadow-sm ${className || ''}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <marker id="prop-axis-arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#059669" />
          </marker>
          <marker id="ccw-prop-arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#0284c7" />
          </marker>
          <marker id="cw-prop-arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#e11d48" />
          </marker>
        </defs>

        {/* Tükrözési tengely (t) */}
        <line x1="280" y1="15" x2="280" y2="245" stroke="#059669" strokeWidth="2.5" markerEnd="url(#prop-axis-arrow)" markerStart="url(#prop-axis-arrow)" />
        <text x="290" y="28" className="text-xs font-black fill-emerald-600 font-sans">t (tengely)</text>

        {/* Vetítővonalak és derékszögek (Magyar szabvány: körív + pont) */}
        <line x1="100" y1="80" x2="460" y2="80" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4 4" />
        <line x1="140" y1="210" x2="420" y2="210" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4 4" />
        <line x1="60" y1="180" x2="500" y2="180" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4 4" />

        {/* Derékszög a felső vetítővonalnál */}
        <path d="M 290 80 A 10 10 0 0 0 280 70" fill="none" stroke="#ef4444" strokeWidth="1.5" />
        <circle cx="285" cy="75" r="1.5" fill="#ef4444" />

        {/* Eredeti háromszög (ABC) - Bal oldal */}
        <polygon points="100,80 140,210 60,180" fill="rgba(2, 132, 199, 0.15)" stroke="#0284c7" strokeWidth="2.5" />
        
        {/* Körüljárási irány nyíl (ABC - Pozitív / CCW) */}
        <path d="M 90 145 A 25 25 0 0 1 115 155" fill="none" stroke="#0284c7" strokeWidth="2" markerEnd="url(#ccw-prop-arrow)" />
        <text x="100" y="150" textAnchor="middle" className="text-[10px] font-black fill-sky-600 font-sans">+</text>

        {/* Csúcsok ABC */}
        <circle cx="100" cy="80" r="4.5" fill="#0284c7" />
        <text x="95" y="70" className="text-xs font-black fill-sky-700 font-sans">A</text>

        <circle cx="140" cy="210" r="4.5" fill="#0284c7" />
        <text x="148" y="222" className="text-xs font-black fill-sky-700 font-sans">B</text>

        <circle cx="60" cy="180" r="4.5" fill="#0284c7" />
        <text x="45" y="185" className="text-xs font-black fill-sky-700 font-sans">C</text>

        {/* Tükörkép háromszög (A'B'C') - Jobb oldal */}
        <polygon points="460,80 420,210 500,180" fill="rgba(225, 29, 72, 0.15)" stroke="#e11d48" strokeWidth="2.5" />

        {/* Körüljárási irány nyíl (A'B'C' - Negatív / CW) */}
        <path d="M 470 145 A 25 25 0 0 0 445 155" fill="none" stroke="#e11d48" strokeWidth="2" markerEnd="url(#cw-prop-arrow)" />
        <text x="460" y="150" textAnchor="middle" className="text-[10px] font-black fill-rose-600 font-sans">−</text>

        {/* Csúcsok A'B'C' */}
        <circle cx="460" cy="80" r="4.5" fill="#e11d48" />
        <text x="465" y="70" className="text-xs font-black fill-rose-700 font-sans">A'</text>

        <circle cx="420" cy="210" r="4.5" fill="#e11d48" />
        <text x="410" y="222" className="text-xs font-black fill-rose-700 font-sans">B'</text>

        <circle cx="500" cy="180" r="4.5" fill="#e11d48" />
        <text x="510" y="185" className="text-xs font-black fill-rose-700 font-sans">C'</text>

        {/* Magyarázó feliratok a sarkokban */}
        <g transform="translate(15, 25)">
          <rect width="130" height="34" rx="8" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" className="dark:fill-slate-800 dark:stroke-slate-700" />
          <text x="65" y="15" textAnchor="middle" className="text-[10px] font-bold fill-slate-700 dark:fill-slate-200">Eredeti alakzat (F)</text>
          <text x="65" y="27" textAnchor="middle" className="text-[9px] font-medium fill-sky-600">Pozitív körüljárás (+)</text>
        </g>

        <g transform="translate(415, 25)">
          <rect width="130" height="34" rx="8" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" className="dark:fill-slate-800 dark:stroke-slate-700" />
          <text x="65" y="15" textAnchor="middle" className="text-[10px] font-bold fill-slate-700 dark:fill-slate-200">Tükörkép (F')</text>
          <text x="65" y="27" textAnchor="middle" className="text-[9px] font-medium fill-rose-600">Negatív körüljárás (−)</text>
        </g>
      </svg>
      <p className="text-xs text-center text-slate-500 max-w-lg">
        <strong>A tengelyes tükrözés egybevágósági transzformáció:</strong> megőrzi a távolságokat (<MathText>{"|A'B'| = |AB|"}</MathText>), a szögeket (<MathText>{"\\alpha' = \\alpha"}</MathText>) és a területet (<MathText>{"T' = T"}</MathText>), de a körüljárási irányt <strong>megfordítja</strong>.
      </p>
    </div>
  );
};

// =========================================================================
// 2. TÁVOLSÁGTARTÁS ÉS SZÖGTARTÁS RÉSZLETES ÁBRÁJA
// =========================================================================
export const InvarianceProofDiagram: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className="flex flex-col items-center gap-2 my-4">
      <svg
        viewBox="0 0 540 240"
        className={`w-full max-w-xl h-auto select-none rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 shadow-sm ${className || ''}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Tükrözési tengely (t) */}
        <line x1="270" y1="15" x2="270" y2="225" stroke="#059669" strokeWidth="2.5" />
        <text x="278" y="28" className="text-xs font-black fill-emerald-600 font-sans">t</text>

        {/* Szakasz tükrözése: A -> A', B -> B' */}
        <line x1="90" y1="60" x2="450" y2="60" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="4 4" />
        <line x1="160" y1="180" x2="380" y2="180" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="4 4" />

        {/* Magyar szabványú derékszög jelölések */}
        <path d="M 280 60 A 10 10 0 0 0 270 50" fill="none" stroke="#ef4444" strokeWidth="1.5" />
        <circle cx="275" cy="55" r="1.5" fill="#ef4444" />

        <path d="M 280 180 A 10 10 0 0 0 270 170" fill="none" stroke="#ef4444" strokeWidth="1.5" />
        <circle cx="275" cy="175" r="1.5" fill="#ef4444" />

        {/* AB szakasz és A'B' szakasz */}
        <line x1="90" y1="60" x2="160" y2="180" stroke="#0284c7" strokeWidth="3" />
        <line x1="450" y1="60" x2="380" y2="180" stroke="#e11d48" strokeWidth="3" />

        {/* Egyenlő szakaszok jelölése (dupla vonás mindkét szakaszon) */}
        <g transform="translate(120, 115) rotate(58)">
          <line x1="-3" y1="-6" x2="-3" y2="6" stroke="#0284c7" strokeWidth="2" />
          <line x1="3" y1="-6" x2="3" y2="6" stroke="#0284c7" strokeWidth="2" />
        </g>
        <g transform="translate(420, 115) rotate(-58)">
          <line x1="-3" y1="-6" x2="-3" y2="6" stroke="#e11d48" strokeWidth="2" />
          <line x1="3" y1="-6" x2="3" y2="6" stroke="#e11d48" strokeWidth="2" />
        </g>

        {/* Pontok és címkék */}
        <circle cx="90" cy="60" r="5" fill="#0284c7" />
        <text x="75" y="55" className="text-xs font-black fill-sky-700 font-sans">A</text>

        <circle cx="160" cy="180" r="5" fill="#0284c7" />
        <text x="145" y="195" className="text-xs font-black fill-sky-700 font-sans">B</text>

        <circle cx="450" cy="60" r="5" fill="#e11d48" />
        <text x="460" y="55" className="text-xs font-black fill-rose-700 font-sans">A'</text>

        <circle cx="380" cy="180" r="5" fill="#e11d48" />
        <text x="390" y="195" className="text-xs font-black fill-rose-700 font-sans">B'</text>

        {/* Szögek a tengellyel */}
        <path d="M 270 110 A 30 30 0 0 1 245 130" fill="none" stroke="#f59e0b" strokeWidth="2" />
        <text x="235" y="120" className="text-[11px] font-black fill-amber-600 font-sans">α</text>

        <path d="M 270 110 A 30 30 0 0 0 295 130" fill="none" stroke="#f59e0b" strokeWidth="2" />
        <text x="300" y="120" className="text-[11px] font-black fill-amber-600 font-sans">α'</text>

        {/* Hosszúság felirat */}
        <text x="70" y="125" className="text-xs font-bold fill-sky-600 font-sans">d = 7,2 cm</text>
        <text x="470" y="125" className="text-xs font-bold fill-rose-600 font-sans">d' = 7,2 cm</text>
      </svg>
      <p className="text-xs text-center text-slate-500 max-w-md">
        <strong>Távolságtartás és szögtartás:</strong> <MathText>{"|AB| = |A'B'|"}</MathText> és <MathText>{"\\alpha = \\alpha'"}</MathText>. Az egyenesek hajlásszöge a tengelyhez képest sem változik.
      </p>
    </div>
  );
};

// =========================================================================
// 3. FIX ELEMEK DIAGRAM (FIXPONTOK ÉS FIXEGYENESEK)
// =========================================================================
export const FixedElementsDiagram: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className="flex flex-col items-center gap-2 my-4">
      <svg
        viewBox="0 0 540 250"
        className={`w-full max-w-xl h-auto select-none rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 shadow-sm ${className || ''}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Tükrözési tengely (t) - Pontonként fix egyenes */}
        <line x1="270" y1="15" x2="270" y2="235" stroke="#059669" strokeWidth="3.5" />
        <text x="282" y="30" className="text-xs font-black fill-emerald-600 font-sans">t (pontonként fix egyenes)</text>

        {/* Tengelyen lévő fixpontok */}
        <circle cx="270" cy="65" r="5" fill="#f59e0b" stroke="#d97706" strokeWidth="1.5" />
        <text x="282" y="69" className="text-xs font-bold fill-amber-700 font-sans">P = P' (Fixpont)</text>

        <circle cx="270" cy="185" r="5" fill="#f59e0b" stroke="#d97706" strokeWidth="1.5" />
        <text x="282" y="189" className="text-xs font-bold fill-amber-700 font-sans">Q = Q' (Fixpont)</text>

        {/* Tengelyre merőleges fixegyenes (m ⊥ t) */}
        <line x1="50" y1="125" x2="490" y2="125" stroke="#6366f1" strokeWidth="2.5" />
        <text x="60" y="115" className="text-xs font-black fill-indigo-600 font-sans">m (tengelyre merőleges egyenes: m = m')</text>

        {/* Magyar szabványú derékszög jelölés a metszéspontban */}
        <path d="M 280 125 A 10 10 0 0 0 270 115" fill="none" stroke="#ef4444" strokeWidth="1.5" />
        <circle cx="275" cy="120" r="1.5" fill="#ef4444" />

        {/* Pontok a merőleges egyenesen, amelyek helyet cserélnek */}
        <circle cx="120" cy="125" r="4.5" fill="#0284c7" />
        <text x="115" y="145" className="text-xs font-bold fill-sky-700 font-sans">X</text>

        <circle cx="420" cy="125" r="4.5" fill="#e11d48" />
        <text x="415" y="145" className="text-xs font-bold fill-rose-700 font-sans">X'</text>

        {/* Nyilak a helycseréhez */}
        <path d="M 130 115 Q 270 95 410 115" fill="none" stroke="#6366f1" strokeWidth="1.5" strokeDasharray="3 3" />
        <text x="270" y="90" textAnchor="middle" className="text-[10px] font-bold fill-indigo-600">A pontok helyet cserélnek az egyenesen!</text>
      </svg>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-300 max-w-lg mt-1">
        <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800">
          <strong className="text-amber-800 dark:text-amber-300">1. Fixpontok:</strong> A <MathText>t</MathText> tengely minden pontja fixpont (<MathText>{"P = P'"}</MathText>). A tengelyen kívül nincs más fixpont.
        </div>
        <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800">
          <strong className="text-indigo-800 dark:text-indigo-300">2. Fixegyenesek:</strong> A tengely maga és a rá merőleges egyenesek (<MathText>{"m \\perp t"}</MathText>) önmagukba képződnek (<MathText>{"m = m'"}</MathText>).
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// 4. KETTŐS TÜKRÖZÉS: PÁRHUZAMOS TENGELYEK (PARALLEL AXES = TRANSLATION)
// =========================================================================
export const DoubleReflectionParallelDiagram: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className="flex flex-col items-center gap-2 my-4">
      <svg
        viewBox="0 0 560 220"
        className={`w-full max-w-xl h-auto select-none rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 shadow-sm ${className || ''}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <marker id="trans-arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#8b5cf6" />
          </marker>
        </defs>

        {/* 1. Tengely t1 */}
        <line x1="200" y1="20" x2="200" y2="200" stroke="#059669" strokeWidth="2.5" />
        <text x="190" y="32" className="text-xs font-black fill-emerald-600 font-sans">t₁</text>

        {/* 2. Tengely t2 */}
        <line x1="360" y1="20" x2="360" y2="200" stroke="#059669" strokeWidth="2.5" />
        <text x="368" y="32" className="text-xs font-black fill-emerald-600 font-sans">t₂</text>

        {/* Tengelyek közötti távolság d */}
        <line x1="200" y1="180" x2="360" y2="180" stroke="#64748b" strokeWidth="1.5" strokeDasharray="3 3" />
        <text x="280" y="174" textAnchor="middle" className="text-xs font-bold fill-slate-600 font-sans">d távolság</text>

        {/* P pontok egymás utáni tükrözése */}
        <line x1="80" y1="90" x2="480" y2="90" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="4 4" />

        {/* P pont */}
        <circle cx="80" cy="90" r="5" fill="#0284c7" />
        <text x="75" y="75" className="text-xs font-black fill-sky-700 font-sans">P</text>

        {/* P' pont (t1-re tükrözve) */}
        <circle cx="320" cy="90" r="5" fill="#f59e0b" />
        <text x="315" y="75" className="text-xs font-black fill-amber-600 font-sans">P'</text>

        {/* P'' pont (t2-re tükrözve) */}
        <circle cx="400" cy="90" r="5.5" fill="#8b5cf6" />
        <text x="405" y="75" className="text-xs font-black fill-violet-700 font-sans">P''</text>

        {/* P -> P'' közvetlen eltolás vektor */}
        <path d="M 85 115 L 395 115" stroke="#8b5cf6" strokeWidth="3" markerEnd="url(#trans-arrow)" />
        <text x="240" y="135" textAnchor="middle" className="text-xs font-black fill-violet-600 font-sans">
          Párhuzamos eltolás: elmozdulás = 2 · d
        </text>
      </svg>
      <p className="text-xs text-center text-slate-500 max-w-md">
        <strong>Tétel:</strong> Két párhuzamos tengelyre (<MathText>{"t_1 \\parallel t_2"}</MathText>) történő egymás utáni tükrözés egyetlen <strong>párhuzamos eltolással</strong> egyenértékű, amelynek nagysága <MathText>{"2 \\cdot d"}</MathText>, iránya pedig merőleges a tengelyekre.
      </p>
    </div>
  );
};

// =========================================================================
// 5. KETTŐS TÜKRÖZÉS: METSZŐ TENGELYEK (INTERSECTING AXES = ROTATION)
// =========================================================================
export const DoubleReflectionIntersectingDiagram: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className="flex flex-col items-center gap-2 my-4">
      <svg
        viewBox="0 0 540 240"
        className={`w-full max-w-xl h-auto select-none rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 shadow-sm ${className || ''}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <marker id="rot-arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#8b5cf6" />
          </marker>
        </defs>

        {/* O metszéspont */}
        <circle cx="270" cy="180" r="5" fill="#059669" />
        <text x="265" y="202" className="text-xs font-black fill-emerald-800 font-sans">O</text>

        {/* 1. Tengely t1 (függőleges) */}
        <line x1="270" y1="180" x2="270" y2="30" stroke="#059669" strokeWidth="2.5" />
        <text x="255" y="40" className="text-xs font-black fill-emerald-600 font-sans">t₁</text>

        {/* 2. Tengely t2 (40°-ban dőlve) */}
        <line x1="270" y1="180" x2="385" y2="45" stroke="#059669" strokeWidth="2.5" />
        <text x="395" y="55" className="text-xs font-black fill-emerald-600 font-sans">t₂</text>

        {/* Tengelyek szöge α = 40° */}
        <path d="M 270 120 A 60 60 0 0 1 315 128" fill="none" stroke="#f59e0b" strokeWidth="2" />
        <text x="290" y="112" className="text-xs font-black fill-amber-600 font-sans">α</text>

        {/* P pont */}
        <circle cx="160" cy="130" r="4.5" fill="#0284c7" />
        <text x="145" y="130" className="text-xs font-black fill-sky-700 font-sans">P</text>

        {/* P'' pont (2·α = 80°-kal elforgatva O körül) */}
        <circle cx="370" cy="110" r="5" fill="#8b5cf6" />
        <text x="382" y="115" className="text-xs font-black fill-violet-700 font-sans">P''</text>

        {/* Forgás íve O középponttal, 2α szöggel */}
        <path d="M 160 130 A 120 120 0 0 1 370 110" fill="none" stroke="#8b5cf6" strokeWidth="2.5" strokeDasharray="5 3" markerEnd="url(#rot-arrow)" />
        <text x="270" y="70" textAnchor="middle" className="text-xs font-black fill-violet-600 font-sans">
          Elforgatás O körül: szög = 2 · α
        </text>
      </svg>
      <p className="text-xs text-center text-slate-500 max-w-md">
        <strong>Tétel:</strong> Két metsző tengelyre történő egymás utáni tükrözés az <MathText>O</MathText> metszéspont körüli <strong>elforgatással</strong> egyenértékű, ahol a forgatás szöge <MathText>{"2 \\cdot \\alpha"}</MathText>.
      </p>
    </div>
  );
};

// =========================================================================
// 6. INTERAKTÍV INVARIANCIA ÉS TULAJDONSÁG SZIMULÁTOR
// =========================================================================
export const InteractiveInvarianceExplorer: React.FC<{ className?: string }> = ({ className }) => {
  const [shape, setShape] = useState<'triangle' | 'quad' | 'circle'>('triangle');
  const [showDistances, setShowDistances] = useState(true);
  const [showAngles, setShowAngles] = useState(true);
  const [showOrientation, setShowOrientation] = useState(true);

  return (
    <div className={`p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 shadow-md flex flex-col items-center gap-4 ${className || ''}`}>
      <div className="w-full flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
        <div>
          <h4 className="text-sm sm:text-base font-black text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-emerald-500" />
            Interaktív Invariancia & Szimmetria Felfedező
          </h4>
          <p className="text-xs text-slate-500">Válassz alakzatot, és figyeld meg az állandó tulajdonságokat!</p>
        </div>

        {/* Alakzat választó gombok */}
        <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
          <Button
            size="sm"
            variant={shape === 'triangle' ? 'default' : 'ghost'}
            onClick={() => setShape('triangle')}
            className={`h-7 px-2.5 text-xs font-bold rounded-lg ${shape === 'triangle' ? 'bg-emerald-600 text-white' : ''}`}
          >
            Háromszög
          </Button>
          <Button
            size="sm"
            variant={shape === 'quad' ? 'default' : 'ghost'}
            onClick={() => setShape('quad')}
            className={`h-7 px-2.5 text-xs font-bold rounded-lg ${shape === 'quad' ? 'bg-emerald-600 text-white' : ''}`}
          >
            Trapéz
          </Button>
          <Button
            size="sm"
            variant={shape === 'circle' ? 'default' : 'ghost'}
            onClick={() => setShape('circle')}
            className={`h-7 px-2.5 text-xs font-bold rounded-lg ${shape === 'circle' ? 'bg-emerald-600 text-white' : ''}`}
          >
            Kör
          </Button>
        </div>
      </div>

      {/* SVG Alakzat megjelenítés */}
      <div className="w-full flex justify-center">
        <svg viewBox="0 0 540 220" className="w-full max-w-lg h-auto select-none rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
          {/* Tükrözési tengely */}
          <line x1="270" y1="10" x2="270" y2="210" stroke="#059669" strokeWidth="2.5" />
          <text x="278" y="24" className="text-xs font-black fill-emerald-600 font-sans">t</text>

          {/* VETÍTŐVONALAK ÉS MAGYAR DERÉKSZÖGEK */}
          <line x1="80" y1="60" x2="460" y2="60" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="120" y1="170" x2="420" y2="170" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3 3" />
          <path d="M 280 60 A 8 8 0 0 0 270 52" fill="none" stroke="#ef4444" strokeWidth="1.5" />
          <circle cx="276" cy="56" r="1" fill="#ef4444" />

          {/* 1. Háromszög */}
          {shape === 'triangle' && (
            <>
              <polygon points="100,60 160,170 60,150" fill="rgba(2, 132, 199, 0.2)" stroke="#0284c7" strokeWidth="2.5" />
              <polygon points="440,60 380,170 480,150" fill="rgba(225, 29, 72, 0.2)" stroke="#e11d48" strokeWidth="2.5" />
              {showDistances && (
                <>
                  <text x="145" y="115" className="text-[10px] font-bold fill-sky-700">a = 6 cm</text>
                  <text x="395" y="115" className="text-[10px] font-bold fill-rose-700">a' = 6 cm</text>
                </>
              )}
              {showAngles && (
                <>
                  <text x="100" y="52" className="text-[10px] font-black fill-sky-700">α = 50°</text>
                  <text x="440" y="52" className="text-[10px] font-black fill-rose-700">α' = 50°</text>
                </>
              )}
            </>
          )}

          {/* 2. Trapéz */}
          {shape === 'quad' && (
            <>
              <polygon points="120,60 180,60 190,160 70,160" fill="rgba(2, 132, 199, 0.2)" stroke="#0284c7" strokeWidth="2.5" />
              <polygon points="420,60 360,60 350,160 470,160" fill="rgba(225, 29, 72, 0.2)" stroke="#e11d48" strokeWidth="2.5" />
              {showDistances && (
                <>
                  <text x="150" y="52" className="text-[10px] font-bold fill-sky-700">c = 4 cm</text>
                  <text x="390" y="52" className="text-[10px] font-bold fill-rose-700">c' = 4 cm</text>
                  <text x="130" y="175" className="text-[10px] font-bold fill-sky-700">a = 8 cm</text>
                  <text x="410" y="175" className="text-[10px] font-bold fill-rose-700">a' = 8 cm</text>
                </>
              )}
            </>
          )}

          {/* 3. Kör */}
          {shape === 'circle' && (
            <>
              <circle cx="120" cy="115" r="45" fill="rgba(2, 132, 199, 0.2)" stroke="#0284c7" strokeWidth="2.5" />
              <circle cx="120" cy="115" r="3" fill="#0284c7" />
              <line x1="120" y1="115" x2="165" y2="115" stroke="#0284c7" strokeWidth="1.5" />
              <text x="140" y="110" className="text-[10px] font-bold fill-sky-700">r = 3 cm</text>

              <circle cx="420" cy="115" r="45" fill="rgba(225, 29, 72, 0.2)" stroke="#e11d48" strokeWidth="2.5" />
              <circle cx="420" cy="115" r="3" fill="#e11d48" />
              <line x1="420" y1="115" x2="465" y2="115" stroke="#e11d48" strokeWidth="1.5" />
              <text x="440" y="110" className="text-[10px] font-bold fill-rose-700">r' = 3 cm</text>
            </>
          )}
        </svg>
      </div>

      {/* Részletek kapcsolói */}
      <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
        <Button
          size="sm"
          variant="outline"
          onClick={() => setShowDistances(!showDistances)}
          className={`h-7 px-2.5 text-xs rounded-lg ${showDistances ? 'border-sky-500 bg-sky-50 dark:bg-sky-950/40 text-sky-700' : ''}`}
        >
          <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
          Távolságok mutatása
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => setShowAngles(!showAngles)}
          className={`h-7 px-2.5 text-xs rounded-lg ${showAngles ? 'border-amber-500 bg-amber-50 dark:bg-amber-950/40 text-amber-700' : ''}`}
        >
          <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
          Szögek mutatása
        </Button>
      </div>
    </div>
  );
};

// =========================================================================
// 7. MINI ÁBRÁK KVÍZHEZ ÉS PÁROSÍTÓHOZ (REFLECTION PROPERTIES MINI FIGURE)
// =========================================================================
export type MiniPropFigType =
  | 'distance_invariance'
  | 'angle_invariance'
  | 'area_invariance'
  | 'orientation_flip'
  | 'fixed_points'
  | 'fixed_lines'
  | 'parallel_reflections'
  | 'intersecting_reflections'
  | 'involutive_property'
  | 'circle_invariance';

export const ReflectionPropertiesMiniFigure: React.FC<{ type: MiniPropFigType; className?: string }> = ({
  type,
  className
}) => {
  return (
    <div className={`flex items-center justify-center p-1 rounded-xl bg-slate-50/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 shrink-0 ${className || ''}`}>
      <svg viewBox="0 0 120 70" className="w-24 h-14 select-none">
        {/* Tengely */}
        <line x1="60" y1="5" x2="60" y2="65" stroke="#059669" strokeWidth="2" strokeDasharray="3 2" />

        {/* 1. Távolságtartás */}
        {type === 'distance_invariance' && (
          <>
            <line x1="25" y1="20" x2="35" y2="50" stroke="#0284c7" strokeWidth="2.5" />
            <line x1="95" y1="20" x2="85" y2="50" stroke="#e11d48" strokeWidth="2.5" />
            <circle cx="25" cy="20" r="2.5" fill="#0284c7" />
            <circle cx="35" cy="50" r="2.5" fill="#0284c7" />
            <circle cx="95" cy="20" r="2.5" fill="#e11d48" />
            <circle cx="85" cy="50" r="2.5" fill="#e11d48" />
            <text x="30" y="62" textAnchor="middle" className="text-[7px] font-bold fill-sky-700">|AB|</text>
            <text x="90" y="62" textAnchor="middle" className="text-[7px] font-bold fill-rose-700">|A'B'|</text>
          </>
        )}

        {/* 2. Szögtartás */}
        {type === 'angle_invariance' && (
          <>
            <polyline points="15,45 35,25 45,50" fill="none" stroke="#0284c7" strokeWidth="2" />
            <path d="M 30 31 A 8 8 0 0 1 38 33" fill="none" stroke="#f59e0b" strokeWidth="1.5" />
            <polyline points="105,45 85,25 75,50" fill="none" stroke="#e11d48" strokeWidth="2" />
            <path d="M 90 31 A 8 8 0 0 0 82 33" fill="none" stroke="#f59e0b" strokeWidth="1.5" />
            <text x="35" y="20" textAnchor="middle" className="text-[8px] font-black fill-amber-600">α</text>
            <text x="85" y="20" textAnchor="middle" className="text-[8px] font-black fill-amber-600">α'</text>
          </>
        )}

        {/* 3. Területtartás */}
        {type === 'area_invariance' && (
          <>
            <polygon points="20,20 45,50 15,45" fill="rgba(2, 132, 199, 0.3)" stroke="#0284c7" strokeWidth="1.5" />
            <polygon points="100,20 75,50 105,45" fill="rgba(225, 29, 72, 0.3)" stroke="#e11d48" strokeWidth="1.5" />
            <text x="27" y="38" textAnchor="middle" className="text-[7px] font-black fill-sky-700">T</text>
            <text x="93" y="38" textAnchor="middle" className="text-[7px] font-black fill-rose-700">T'</text>
          </>
        )}

        {/* 4. Orientációváltás */}
        {type === 'orientation_flip' && (
          <>
            <polygon points="20,15 40,55 15,45" fill="none" stroke="#0284c7" strokeWidth="1.5" />
            <polygon points="100,15 80,55 105,45" fill="none" stroke="#e11d48" strokeWidth="1.5" />
            <path d="M 22 35 A 8 8 0 0 1 32 38" fill="none" stroke="#0284c7" strokeWidth="1.5" />
            <path d="M 98 35 A 8 8 0 0 0 88 38" fill="none" stroke="#e11d48" strokeWidth="1.5" />
            <text x="27" y="38" textAnchor="middle" className="text-[9px] font-black fill-sky-600">+</text>
            <text x="93" y="38" textAnchor="middle" className="text-[9px] font-black fill-rose-600">−</text>
          </>
        )}

        {/* 5. Fixpontok */}
        {type === 'fixed_points' && (
          <>
            <circle cx="60" cy="25" r="3.5" fill="#f59e0b" stroke="#d97706" strokeWidth="1" />
            <circle cx="60" cy="45" r="3.5" fill="#f59e0b" stroke="#d97706" strokeWidth="1" />
            <text x="68" y="28" className="text-[7px] font-bold fill-amber-700">P=P'</text>
            <text x="68" y="48" className="text-[7px] font-bold fill-amber-700">Q=Q'</text>
          </>
        )}

        {/* 6. Fixegyenesek */}
        {type === 'fixed_lines' && (
          <>
            <line x1="10" y1="35" x2="110" y2="35" stroke="#6366f1" strokeWidth="2" />
            <path d="M 66 35 A 6 6 0 0 0 60 29" fill="none" stroke="#ef4444" strokeWidth="1" />
            <circle cx="63" cy="32" r="0.8" fill="#ef4444" />
            <text x="25" y="28" className="text-[7px] font-bold fill-indigo-600">m ⊥ t (m=m')</text>
          </>
        )}

        {/* 7. Párhuzamos kettős tükrözés */}
        {type === 'parallel_reflections' && (
          <>
            <line x1="45" y1="5" x2="45" y2="65" stroke="#059669" strokeWidth="1.5" />
            <line x1="75" y1="5" x2="75" y2="65" stroke="#059669" strokeWidth="1.5" />
            <line x1="20" y1="35" x2="100" y2="35" stroke="#8b5cf6" strokeWidth="2" />
            <circle cx="20" cy="35" r="2.5" fill="#0284c7" />
            <circle cx="100" cy="35" r="2.5" fill="#8b5cf6" />
            <text x="60" y="55" textAnchor="middle" className="text-[7px] font-bold fill-violet-700">Eltolás: 2d</text>
          </>
        )}

        {/* 8. Metsző kettős tükrözés */}
        {type === 'intersecting_reflections' && (
          <>
            <line x1="60" y1="65" x2="60" y2="10" stroke="#059669" strokeWidth="1.5" />
            <line x1="60" y1="65" x2="95" y2="15" stroke="#059669" strokeWidth="1.5" />
            <path d="M 30 45 A 35 35 0 0 1 90 40" fill="none" stroke="#8b5cf6" strokeWidth="2" />
            <circle cx="60" cy="65" r="2" fill="#059669" />
            <text x="60" y="32" textAnchor="middle" className="text-[7px] font-bold fill-violet-700">Forgatás: 2α</text>
          </>
        )}

        {/* 9. Involutív tulajdonság */}
        {type === 'involutive_property' && (
          <>
            <circle cx="25" cy="35" r="3" fill="#0284c7" />
            <circle cx="95" cy="35" r="3" fill="#e11d48" />
            <path d="M 30 30 Q 60 18 90 30" fill="none" stroke="#0284c7" strokeWidth="1.5" />
            <path d="M 90 40 Q 60 52 30 40" fill="none" stroke="#e11d48" strokeWidth="1.5" />
            <text x="60" y="62" textAnchor="middle" className="text-[7px] font-black fill-slate-700">(P')' = P</text>
          </>
        )}

        {/* 10. Kör invariancia */}
        {type === 'circle_invariance' && (
          <>
            <circle cx="30" cy="35" r="14" fill="rgba(2, 132, 199, 0.2)" stroke="#0284c7" strokeWidth="1.5" />
            <circle cx="90" cy="35" r="14" fill="rgba(225, 29, 72, 0.2)" stroke="#e11d48" strokeWidth="1.5" />
            <circle cx="30" cy="35" r="1.5" fill="#0284c7" />
            <circle cx="90" cy="35" r="1.5" fill="#e11d48" />
            <text x="60" y="62" textAnchor="middle" className="text-[7px] font-bold fill-slate-700">r = r'</text>
          </>
        )}
      </svg>
    </div>
  );
};
