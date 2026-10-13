import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  GeometryFigureCard,
  GeometryFigureGrid,
  GeometrySvgFrame,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable
} from '../TheoryTemplate';
import {
  Square,
  Shapes,
  Maximize2,
  Layers,
  ArrowRight,
  Info,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Check,
  X,
  Target,
  Sparkles,
  Calculator,
  Compass,
  Ruler,
  HelpCircle,
  Scissors,
  Scale
} from 'lucide-react';
import { MathText } from '@/components/math/shared/MathText';

interface ParallelogramAreaTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

export const ParallelogramAreaTheory: React.FC<ParallelogramAreaTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // Interactive Simulator state
  const [baseA, setBaseA] = useState<number>(8);
  const [heightMa, setHeightMa] = useState<number>(5);
  const [sideB, setSideB] = useState<number>(6);
  const [viewMode, setViewMode] = useState<'standard' | 'dissection' | 'both-heights'>('standard');

  const area = baseA * heightMa;
  const heightMb = sideB > 0 ? Math.round((area / sideB) * 10) / 10 : 0;
  const perimeter = 2 * (baseA + sideB);

  // SVG coordinate calculations for visualization
  // Base A is scaled: e.g. 1 unit = 14px
  const scale = 14;
  const w = baseA * scale;
  const h = heightMa * scale;
  const skew = h * 0.55; // 30 deg slope approx

  return (
    <TheoryTemplate
      title="5. A paralelogramma területe"
      subtitle="Területszámítás alapból és magasságból, átdarabolás téglalappá, a két magasság kapcsolata és a rombusz területe"
      badgeText="7. OSZTÁLY • VII. GEOMETRIA • 📖 5. LECKE"
      quickRule={{
        label: 'Fontos szabály',
        formula: 'T = a \\cdot m_a = b \\cdot m_b \\quad • \\quad K = 2(a + b) \\quad • \\quad T_{\\text{rombusz}} = \\frac{e \\cdot f}{2}'
      }}
      topicId="g7-geom-parallelogram-area"
      chapterId="geometria"
      grade={7}
      themeColor="emerald"
      estimatedReadTime="14 perc"
      difficulty="Közepes"
      pdfFilename="7_osztaly_5_paralelogramma_terulete.pdf"
      practiceTitle="Készen állsz a paralelogramma területének gyakorlására?"
      practiceSubtitle="Tedd próbára tudásod a 30 feladatos interaktív kvízben, a párosítóban és a csoportosítóban!"
      onBack={onBack}
      onStartPractice={onStartQuiz}
    >
      {/* 1. FEJEZET: A TERÜLETKÉPLET ÉS ÁTDARABOLÁS */}
      <TheorySection
        id="fejezet-1"
        number={1}
        title="A paralelogramma területe és az átdarabolás tétele"
        badge="ALAPOK ÉS LEVEZETÉS"
      >
        <TheoryCallout type="rule" title="Fontos alapszabályok összefoglalása">
          <ul className="list-disc pl-5 space-y-1.5 text-xs">
            <li>
              <strong>A paralelogramma területe:</strong> alapoldal szorozva a hozzá tartozó magassággal:
              <div className="my-1 text-sm font-black text-emerald-800 dark:text-emerald-300">
                <MathText text="T = a \cdot m_a = b \cdot m_b" inline />
              </div>
            </li>
            <li>
              <strong>Átdarabolás tétele:</strong> Ha a paralelogramma bal oldaláról a magasság mentén levágjuk a derékszögű háromszöget és áttesszük a jobb oldalára, pontosan egy <MathText text="a" inline /> hosszúságú és <MathText text="m_a" inline /> magasságú <strong>téglalapot</strong> kapunk!
            </li>
            <li>
              <strong>Kerület:</strong> <MathText text="K = 2 \cdot (a + b)" inline /> (a szomszédos oldalak összege szorozva kettővel).
            </li>
            <li>
              <strong>Két magasság kapcsolata:</strong> Minél hosszabb egy oldal, annál rövidebb a hozzá tartozó magasság: <MathText text="a > b \iff m_a < m_b" inline />.
            </li>
            <li>
              <strong>Rombusz területe:</strong> <MathText text="T = a \cdot m_a = \frac{e \cdot f}{2}" inline /> (az átlók szorzatának a fele, mivel az átlói merőlegesek egymásra).
            </li>
          </ul>
        </TheoryCallout>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <TheoryCard
            title="Mi a magasság a paralelogrammában?"
            icon={<Ruler className="w-5 h-5 text-emerald-600" />}
          >
            <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">
              A paralelogramma magassága a két párhuzamos oldalegyenes <strong>merőleges távolsága</strong>.
            </p>
            <div className="mt-3 p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800 text-xs">
              <strong className="text-emerald-900 dark:text-emerald-200">Gyakori tévhit:</strong>
              <p className="mt-1 text-slate-700 dark:text-slate-300">
                A magasság <strong>NEM egyenlő</strong> a ferde szomszédos oldallal! A ferde oldal (<MathText text="b" inline />) mindig a derékszögű háromszög átfogója, így mindig hosszabb a magasságnál: <MathText text="b > m_a" inline />.
              </p>
            </div>
          </TheoryCard>

          <TheoryCard
            title="Az átdarabolás tétele lépésről lépésre"
            icon={<Scissors className="w-5 h-5 text-teal-600" />}
          >
            <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">
              Miért éppen <MathText text="a \cdot m_a" inline /> a terület?
            </p>
            <ol className="list-decimal pl-4 mt-2 space-y-1 text-xs text-slate-700 dark:text-slate-300">
              <li>Húzzuk be a bal alsó csúcsból a magasságot a felső oldalegyenesre.</li>
              <li>A bal oldalon keletkezett derékszögű háromszöget vágjuk le.</li>
              <li>Tegyük át a jobb oldalra! Pontosan kiegészíti a síkidomot egy <MathText text="a" inline /> széles és <MathText text="m_a" inline /> magas téglalappá.</li>
              <li>Mivel a téglalap területe alap × magasság, így a paralelogramma területe is <MathText text="T = a \cdot m_a" inline />.</li>
            </ol>
          </TheoryCard>
        </div>

        {/* INTERAKTÍV PARALELOGRAMMA LABOR */}
        <div className="mt-8 p-5 bg-gradient-to-br from-emerald-50/70 via-white to-teal-50/70 dark:from-slate-900 dark:via-slate-800 dark:to-emerald-950/40 rounded-2xl border border-emerald-200 dark:border-emerald-800 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-emerald-100 dark:border-emerald-800/60 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-emerald-600 text-white rounded-lg">
                  <Calculator className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                  Interaktív Terület- és Átdarabolás Labor
                </h4>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Állítsd az oldalakat és a magasságot, és figyeld az átdarabolást valós időben!
              </p>
            </div>

            {/* View Mode Toggle */}
            <div className="flex gap-1.5">
              <button
                onClick={() => setViewMode('standard')}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                  viewMode === 'standard'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600'
                }`}
              >
                Paralelogramma
              </button>
              <button
                onClick={() => setViewMode('dissection')}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                  viewMode === 'dissection'
                    ? 'bg-teal-600 text-white shadow-xs'
                    : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600'
                }`}
              >
                ✂️ Átdarabolás téglalappá
              </button>
              <button
                onClick={() => setViewMode('both-heights')}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                  viewMode === 'both-heights'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600'
                }`}
              >
                Mindkét magasság
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-4 items-center">
            {/* SVG Interactive Canvas */}
            <div className="lg:col-span-7 flex flex-col items-center">
              <div className="relative w-full max-w-[340px] aspect-[4/3] bg-white dark:bg-slate-900/90 rounded-2xl border border-slate-200 dark:border-slate-700 p-2 shadow-inner flex items-center justify-center overflow-hidden">
                <svg viewBox="0 0 280 190" className="w-full h-full">
                  <defs>
                    <linearGradient id="paraGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#10b981" stopOpacity="0.12" />
                      <stop offset="100%" stopColor="#0d9488" stopOpacity="0.2" />
                    </linearGradient>
                  </defs>

                  <g transform="translate(30, 30)">
                    {viewMode === 'dissection' ? (
                      /* Dissection Animation View: shows the cut triangle shifted to the right */
                      <>
                        {/* Middle body */}
                        <polygon
                          points={`${skew},0 ${w},0 ${w},${h} ${skew},${h}`}
                          fill="url(#paraGrad)"
                          className="stroke-emerald-600 stroke-2"
                        />
                        {/* Left cut triangle (ghost dashed) */}
                        <polygon
                          points={`0,${h} ${skew},0 ${skew},${h}`}
                          fill="rgba(244, 63, 94, 0.08)"
                          stroke="#f43f5e"
                          strokeWidth="1.5"
                          strokeDasharray="3 3"
                        />
                        {/* Right attached triangle (shifted) */}
                        <polygon
                          points={`${w},0 ${w + skew},0 ${w},${h}`}
                          fill="rgba(16, 185, 129, 0.25)"
                          stroke="#10b981"
                          strokeWidth="2"
                        />
                        {/* Cut Line */}
                        <line x1={skew} y1="0" x2={skew} y2={h} stroke="#f43f5e" strokeWidth="2" strokeDasharray="3 2" />
                        {/* Equivalent Rectangle outline */}
                        <rect x={skew} y="0" width={w - skew + skew} height={h} fill="none" stroke="#059669" strokeWidth="2.5" />
                        <text x={w / 2 + skew / 2} y={h / 2 + 5} textAnchor="middle" className="text-[12px] font-black fill-emerald-800 dark:fill-emerald-200">
                          Téglalap: {baseA} × {heightMa}
                        </text>
                      </>
                    ) : (
                      /* Standard View */
                      <>
                        {/* Parallelogram body */}
                        <polygon
                          points={`${skew},0 ${skew + w},0 ${w},${h} 0,${h}`}
                          fill="url(#paraGrad)"
                          className="stroke-emerald-600 dark:stroke-emerald-400 stroke-[2.5]"
                        />

                        {/* Height ma line */}
                        <line x1={skew} y1="0" x2={skew} y2={h} stroke="#e11d48" strokeWidth="2" strokeDasharray="3 2" />
                        {/* Right angle marker (Hungarian standard: circular arc + dot) */}
                        <path
                          d={`M ${skew + 10} ${h} A 10 10 0 0 0 ${skew} ${h - 10}`}
                          fill="none"
                          stroke="#e11d48"
                          strokeWidth="1.5"
                        />
                        <circle cx={skew + 3.5} cy={h - 3.5} r="1.2" fill="#e11d48" />

                        {/* Height ma label */}
                        <text x={skew - 8} y={h / 2 + 3} textAnchor="end" className="text-[10px] font-black fill-rose-600">
                          mₐ = {heightMa}
                        </text>

                        {/* Base a label */}
                        <text x={w / 2} y={h + 16} textAnchor="middle" className="text-[11px] font-black fill-slate-800 dark:fill-slate-200">
                          a = {baseA} cm
                        </text>

                        {/* Side b label */}
                        <text x={skew / 2 - 10} y={h / 2 - 2} textAnchor="middle" className="text-[10px] font-bold fill-indigo-600">
                          b = {sideB}
                        </text>

                        {/* Second height mb line if selected */}
                        {viewMode === 'both-heights' && (
                          <>
                            <line x1="0" y1={h} x2="45" y2="10" stroke="#6366f1" strokeWidth="2" strokeDasharray="3 2" />
                            <text x="35" y="8" className="text-[9px] font-black fill-indigo-600">
                              m_b = {heightMb}
                            </text>
                          </>
                        )}
                      </>
                    )}
                  </g>
                </svg>
              </div>

              {/* Sliders */}
              <div className="w-full max-w-[340px] grid grid-cols-3 gap-2 mt-3 text-xs">
                <div>
                  <label className="text-[10px] font-bold text-slate-500 block">Alap (a): {baseA} cm</label>
                  <input
                    type="range"
                    min="4"
                    max="14"
                    value={baseA}
                    onChange={e => setBaseA(Number(e.target.value))}
                    className="w-full accent-emerald-600 cursor-pointer"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 block">Magasság (mₐ): {heightMa} cm</label>
                  <input
                    type="range"
                    min="3"
                    max="8"
                    value={heightMa}
                    onChange={e => setHeightMa(Number(e.target.value))}
                    className="w-full accent-rose-600 cursor-pointer"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 block">Szár (b): {sideB} cm</label>
                  <input
                    type="range"
                    min="4"
                    max="10"
                    value={sideB}
                    onChange={e => setSideB(Number(e.target.value))}
                    className="w-full accent-indigo-600 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Realtime Calculation Card */}
            <div className="lg:col-span-5 space-y-3">
              <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-emerald-200 dark:border-emerald-800">
                <div className="text-[11px] font-bold text-slate-400 uppercase">Számított Terület (T)</div>
                <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono mt-0.5">
                  {area} cm²
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-300 mt-2 p-2 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl">
                  <MathText text={`T = a \\cdot m_a = ${baseA} \\text{ cm} \\cdot ${heightMa} \\text{ cm} = \\mathbf{${area} \\text{ cm}^2}`} inline />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                  <div className="text-[10px] font-bold text-slate-400 uppercase">Kerület (K)</div>
                  <div className="text-base font-black text-slate-800 dark:text-slate-100 font-mono mt-0.5">
                    {perimeter} cm
                  </div>
                  <div className="text-[10px] text-slate-500 mt-1">
                    <MathText text={`2 \\cdot (${baseA} + ${sideB})`} inline />
                  </div>
                </div>

                <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                  <div className="text-[10px] font-bold text-slate-400 uppercase">Másik magasság (mb)</div>
                  <div className="text-base font-black text-indigo-600 dark:text-indigo-400 font-mono mt-0.5">
                    {heightMb} cm
                  </div>
                  <div className="text-[10px] text-slate-500 mt-1">
                    <MathText text={`T / b = ${area} / ${sideB}`} inline />
                  </div>
                </div>
              </div>

              <div className="p-2.5 bg-teal-50 dark:bg-teal-950/40 rounded-xl text-xs text-slate-700 dark:text-slate-300 border border-teal-200 dark:border-teal-800">
                <strong className="text-teal-900 dark:text-teal-200">Aranykapcsolat: </strong>
                <MathText text={`a \\cdot m_a = b \\cdot m_b \\implies ${baseA} \\cdot ${heightMa} = ${sideB} \\cdot ${heightMb}`} inline /> ({area} cm²).
              </div>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 2. FEJEZET: A KÉT MAGASSÁG KAPCSOLATA */}
      <TheorySection
        id="fejezet-2"
        number={2}
        title="A két magasság és az oldalak kapcsolata"
        badge="ÖSSZEFÜGGÉSEK"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard
            title="Miért egyenlő a · ma és b · mb?"
            icon={<Target className="w-5 h-5 text-emerald-600" />}
          >
            <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">
              Ugyanannak a síkidomnak a területe egyértelmű, függetlenül attól, hogy melyik oldalt tekintjük alapnak:
            </p>
            <div className="my-2 p-2.5 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl text-center font-bold text-emerald-700 dark:text-emerald-300 text-xs">
              <MathText text="T = a \cdot m_a = b \cdot m_b" inline />
            </div>
            <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">
              Ebből következik, hogy ha ismerjük három adatot (pl. két oldalt és az egyik magasságot), a hiányzó negyedik adat azonnal kiszámolható:
            </p>
            <div className="mt-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
              <MathText text="m_b = \frac{T}{b} = \frac{a \cdot m_a}{b}" inline />
            </div>
          </TheoryCard>

          <TheoryCard
            title="Hosszabb oldalhoz rövidebb magasság tartozik!"
            icon={<Scale className="w-5 h-5 text-indigo-600" />}
          >
            <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">
              Mivel a szorzat (<MathText text="T" inline />) állandó, a két tényező (oldal és a hozzá tartozó magasság) <strong>fordítottan arányos</strong> egymással!
            </p>
            <div className="mt-3 p-3 bg-indigo-50 dark:bg-indigo-950/40 rounded-xl border border-indigo-200 dark:border-indigo-800 text-xs space-y-1">
              <div className="font-bold text-indigo-900 dark:text-indigo-200">
                Ha <MathText text="a > b" inline />, akkor biztosan <MathText text="m_a < m_b" inline />!
              </div>
              <p className="text-slate-600 dark:text-slate-400">
                Például: ha az <MathText text="a" inline /> oldal kétszer akkora, mint a <MathText text="b" inline /> oldal, akkor az <MathText text="m_a" inline /> magasság feleakkora, mint az <MathText text="m_b" inline /> magasság.
              </p>
            </div>
          </TheoryCard>
        </div>

        {/* Mintapélda levezetéssel */}
        <div className="mt-6 p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 font-bold text-xs rounded-md">
              Mintapélda
            </span>
            <h4 className="font-bold text-slate-800 dark:text-white text-xs">
              Hiányzó magasság kiszámítása paralelogrammában
            </h4>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300">
            Egy paralelogramma oldalai <MathText text="a = 12\text{ cm}" inline /> és <MathText text="b = 8\text{ cm}" inline />. Az <MathText text="a" inline /> oldalhoz tartozó magasság <MathText text="m_a = 6\text{ cm}" inline />. Mekkora a terület, és mekkora a <MathText text="b" inline /> oldalhoz tartozó <MathText text="m_b" inline /> magasság?
          </p>
          <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
              <div className="font-semibold text-emerald-600 dark:text-emerald-400">1. Lépés: Terület kiszámítása</div>
              <div className="mt-1">
                <MathText text="T = a \cdot m_a = 12\text{ cm} \cdot 6\text{ cm} = \mathbf{72\text{ cm}^2}" inline />
              </div>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
              <div className="font-semibold text-indigo-600 dark:text-indigo-400">2. Lépés: A másik magasság (mb) kifejezése</div>
              <div className="mt-1">
                <MathText text="T = b \cdot m_b \implies 72 = 8 \cdot m_b \implies m_b = 72 : 8 = \mathbf{9\text{ cm}}" inline />
              </div>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 3. FEJEZET: SPECIÁLIS PARALELOGRAMMÁK ÉS A ROMBUSZ */}
      <TheorySection
        id="fejezet-3"
        number={3}
        title="Speciális paralelogrammák és a rombusz területe"
        badge="ROMBUSZ, NÉGYZET, TÉGLALAP"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TheoryCard
            title="Téglalap"
            icon={<Square className="w-5 h-5 text-blue-600" />}
          >
            <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">
              Olyan paralelogramma, amelynek minden szöge derékszög (<MathText text="90^\circ" inline />). Ekkor a magasság pontosan megegyezik a szomszédos oldallal (<MathText text="m_a = b" inline />).
            </p>
            <div className="mt-3 p-2.5 bg-blue-50 dark:bg-blue-950/40 rounded-xl text-center text-xs font-black text-blue-700 dark:text-blue-300">
              <MathText text="T = a \cdot b, \quad K = 2(a + b)" inline />
            </div>
          </TheoryCard>

          <TheoryCard
            title="Négyzet"
            icon={<Square className="w-5 h-5 text-indigo-600" />}
          >
            <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">
              Szabályos négyszög: minden oldala egyenlő és minden szöge <MathText text="90^\circ" inline />. Átlói egyenlők és merőlegesek egymásra (<MathText text="e = f = a\sqrt{2}" inline />).
            </p>
            <div className="mt-3 p-2.5 bg-indigo-50 dark:bg-indigo-950/40 rounded-xl text-center text-xs font-black text-indigo-700 dark:text-indigo-300">
              <MathText text="T = a^2 = \frac{e^2}{2}, \quad K = 4a" inline />
            </div>
          </TheoryCard>

          <TheoryCard
            title="Rombusz (átlók fele!)"
            icon={<Shapes className="w-5 h-5 text-rose-600" />}
          >
            <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">
              Egyenlő oldalú paralelogramma (<MathText text="a = b" inline />). Átlói felezik egymást és <strong>merőlegesek egymásra</strong> (<MathText text="e \perp f" inline />).
            </p>
            <div className="mt-3 p-2.5 bg-rose-50 dark:bg-rose-950/40 rounded-xl text-center text-xs font-black text-rose-700 dark:text-rose-300">
              <MathText text="T = a \cdot m_a = \frac{e \cdot f}{2}, \quad K = 4a" inline />
            </div>
          </TheoryCard>
        </div>

        {/* Összehasonlító táblázat */}
        <div className="mt-6">
          <h4 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider mb-2">
            Paralelogrammák összefoglaló területi képletei
          </h4>
          <TheoryTable
            headers={['Alakzat', 'Oldalak, szögek', 'Terület képlete (T)', 'Kerület képlete (K)', 'Átlók tulajdonsága']}
            rows={[
              ['Általános paralelogramma', 'Szemközti oldalak egyenlők', 'T = a · ma = b · mb', 'K = 2(a + b)', 'Felezik egymást'],
              ['Téglalap', 'Minden szög 90°', 'T = a · b', 'K = 2(a + b)', 'Egyenlő hosszúak, felezik egymást'],
              ['Rombusz', 'Minden oldal egyenlő', 'T = a · ma = (e · f) / 2', 'K = 4a', 'Merőlegesek egymásra (e ⊥ f)'],
              ['Négyzet', 'Minden oldal egyenlő, 90°', 'T = a² = e² / 2', 'K = 4a', 'Egyenlők és merőlegesek (e ⊥ f)']
            ]}
          />
        </div>
      </TheorySection>

      {/* 4. FEJEZET: GYAKORI HIBÁK ÉS CSAPDÁK */}
      <TheorySection
        id="fejezet-4"
        number={4}
        title="Gyakori hibák és típusfeladatok"
        badge="CSAPDÁK ÉS TIPPEK"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryTrapBox
            title="Csapda: Szomszédos oldalak szorzása a magasság helyett!"
            trap="„Paralelogramma oldalai a = 8 cm és b = 5 cm, tehát T = 8 · 5 = 40 cm².” – HIBÁS!"
            solution="A szomszédos oldalak szorzata (a · b) CSAK TÉGLALAPNÁL adja meg a területet! Általános paralelogrammánál kötelező a magassággal szorozni: T = a · ma, ahol ma < b!"
          />

          <TheoryTrapBox
            title="Csapda: Rossz oldalhoz tartozó magasság használata!"
            trap="„a = 10 cm, b = 6 cm és mb = 4 cm, ezért T = a · mb = 10 · 4 = 40 cm².” – HIBÁS!"
            solution="Az mb a b oldalhoz tartozik! Mindig az összetartozó párt kell összeszorozni: T = b · mb = 6 · 4 = 24 cm²! Ebből ma = 24 / 10 = 2,4 cm."
          />
        </div>

        <div className="mt-4 p-4 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl border border-emerald-200 dark:border-emerald-800 text-xs">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <strong className="text-emerald-900 dark:text-emerald-200">Mértékegység egyeztetési villámtipp:</strong>
          </div>
          <p className="mt-1.5 text-slate-700 dark:text-slate-300">
            Mielőtt kiszámolod a területet, <strong>mindig ellenőrizd az oldal és a magasság mértékegységét</strong>! Ha az alap <MathText text="a = 12\text{ cm}" inline /> és a magasság <MathText text="m_a = 0,5\text{ dm}" inline />, először váltsd át: <MathText text="0,5\text{ dm} = 5\text{ cm}" inline />, és csak ezután szorozz: <MathText text="T = 12 \cdot 5 = 60\text{ cm}^2" inline />!
          </p>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default ParallelogramAreaTheory;
