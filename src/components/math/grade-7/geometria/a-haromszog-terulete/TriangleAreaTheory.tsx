import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  GeometryFigureCard,
  GeometryFigureGrid,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable
} from '../TheoryTemplate';
import {
  Triangle,
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
  Split
} from 'lucide-react';
import { MathText } from '@/components/math/shared/MathText';

interface TriangleAreaTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

export const TriangleAreaTheory: React.FC<TriangleAreaTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // Interactive Simulator state
  const [baseA, setBaseA] = useState<number>(8);
  const [heightMa, setHeightMa] = useState<number>(6);
  const [triangleType, setTriangleType] = useState<'acute' | 'right' | 'obtuse'>('acute');
  const [showTwinTriangle, setShowTwinTriangle] = useState<boolean>(true);

  const area = (baseA * heightMa) / 2;
  const parallelogramArea = baseA * heightMa;

  // Scale for SVG coordinates (1 unit = 14px)
  const scale = 14;
  const w = baseA * scale;
  const h = heightMa * scale;
  
  // Apex X offset based on triangle type
  let apexX = w * 0.45;
  if (triangleType === 'right') apexX = 0;
  if (triangleType === 'obtuse') apexX = -w * 0.25;

  return (
    <TheoryTemplate
      title="6. A háromszög területe"
      subtitle="Területszámítás alapból és magasságból, származtatás a paralelogrammából, derékszögű háromszög és a három magasság kapcsolata"
      badgeText="7. OSZTÁLY • VII. GEOMETRIA • 📖 6. LECKE"
      quickRule={{
        label: 'Fontos szabály',
        formula: 'T = \\frac{a \\cdot m_a}{2} = \\frac{b \\cdot m_b}{2} = \\frac{c \\cdot m_c}{2} \\quad • \\quad T_{\\text{derékszögű}} = \\frac{a \\cdot b}{2} \\quad • \\quad a \\cdot m_a = b \\cdot m_b = 2T'
      }}
      topicId="g7-geom-triangle-area"
      chapterId="geometria"
      grade={7}
      themeColor="teal"
      estimatedReadTime="14 perc"
      difficulty="Közepes"
      pdfFilename="7_osztaly_6_haromszog_terulete.pdf"
      practiceTitle="Készen állsz a háromszög területének gyakorlására?"
      practiceSubtitle="Tedd próbára tudásod a 30 feladatos interaktív kvízben, a párosítóban és a csoportosítóban!"
      onBack={onBack}
      onStartPractice={onStartQuiz}
    >
      {/* 1. FEJEZET: A TERÜLETKÉPLET ÉS SZÁRMAZTATÁSA */}
      <TheorySection
        id="fejezet-1"
        number={1}
        title="A háromszög területe és származtatása a paralelogrammából"
        badge="ALAPOK ÉS BIZONYÍTÁS"
      >
        <TheoryCallout type="rule" title="Fontos alapszabályok összefoglalása">
          <ul className="list-disc pl-5 space-y-1.5 text-xs">
            <li>
              <strong>A háromszög területének képlete:</strong> az alap és a hozzá tartozó magasság szorzatának <strong>fele</strong>:
              <div className="my-1 text-sm font-black text-teal-800 dark:text-teal-300">
                <MathText text="T = \frac{a \cdot m_a}{2} = \frac{b \cdot m_b}{2} = \frac{c \cdot m_c}{2}" inline />
              </div>
            </li>
            <li>
              <strong>Származtatás:</strong> Bármely háromszögből kettőt egymás mellé fordítva egy azonos alapú és magasságú <strong>paralelogrammát</strong> kapunk. Mivel a paralelogramma területe <MathText text="a \cdot m_a" inline />, a háromszög területe ennek pontosan a <strong>fele</strong>!
            </li>
            <li>
              <strong>Derékszögű háromszög:</strong> A két befogó merőleges egymásra, így az egyik a másik magassága:
              <div className="my-1 font-bold text-teal-700 dark:text-teal-400">
                <MathText text="T = \frac{a \cdot b}{2}" inline />
              </div>
            </li>
            <li>
              <strong>A három magasság összefüggése:</strong> Mindhárom oldal-magasság szorzat ugyanazt a kétszeres területet adja:
              <div className="my-1 font-bold text-slate-800 dark:text-slate-200">
                <MathText text="a \cdot m_a = b \cdot m_b = c \cdot m_c = 2T" inline />
              </div>
              A hosszabb oldalhoz mindig <strong>rövidebb magasság</strong> tartozik!
            </li>
          </ul>
        </TheoryCallout>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          <TheoryCard
            title="Miért kell osztani 2-vel?"
            subtitle="Geometriai szemléltetés"
            icon={<Split className="w-5 h-5 text-teal-600" />}
          >
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
              Ha veszünk egy tetszőleges háromszöget, és készítünk róla egy egybevágó másolatot, majd azt <MathText text="180^\circ" inline />-kal elforgatva az egyik oldalához illesztjük, <strong>mindig egy paralelogrammát</strong> kapunk.
            </p>
            <div className="p-3 bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 rounded-xl text-xs space-y-1 text-teal-900 dark:text-teal-200">
              <p>• Paralelogramma területe: <MathText text="T_P = a \cdot m_a" inline /></p>
              <p>• Két egybevágó háromszögből áll: <MathText text="2 \cdot T_{\Delta} = T_P" inline /></p>
              <p className="font-bold">• Ezért: <MathText text="T_{\Delta} = \frac{a \cdot m_a}{2}" inline /></p>
            </div>
          </TheoryCard>

          <TheoryCard
            title="A három lehetséges képlet"
            subtitle="Minden oldalhoz saját magasság tartozik"
            icon={<Compass className="w-5 h-5 text-teal-600" />}
          >
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
              A háromszögnek három oldala és mindegyikhez tartozó magassága van. Bármelyik párral számolunk, a terület <strong>pontosan ugyanakkora</strong> lesz:
            </p>
            <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300 font-medium">
              <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                <MathText text="T = \frac{a \cdot m_a}{2} \quad \text{(az } a \text{ oldal és az } m_a \text{ magasság)}" inline />
              </div>
              <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                <MathText text="T = \frac{b \cdot m_b}{2} \quad \text{(a } b \text{ oldal és a } m_b \text{ magasság)}" inline />
              </div>
              <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                <MathText text="T = \frac{c \cdot m_c}{2} \quad \text{(a } c \text{ oldal és a } m_c \text{ magasság)}" inline />
              </div>
            </div>
          </TheoryCard>
        </div>

        {/* INTERAKTÍV HÁROMSZÖG ÉS PARALELOGRAMMA SZIMULÁTOR */}
        <div className="my-6 p-5 bg-gradient-to-br from-teal-50/70 via-white to-emerald-50/70 dark:from-slate-900 dark:via-slate-900/90 dark:to-teal-950/40 rounded-2xl border border-teal-200 dark:border-teal-800/60 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
            <div>
              <span className="text-[11px] font-black uppercase tracking-wider text-teal-600 dark:text-teal-400 bg-teal-100/80 dark:bg-teal-900/50 px-2.5 py-0.5 rounded-full">
                Interaktív Felfedező
              </span>
              <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 mt-1">
                A háromszög területe és kiegészítése paralelogrammává
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setTriangleType('acute')}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg border transition-all ${triangleType === 'acute' ? 'bg-teal-600 text-white border-teal-600 shadow-sm' : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'}`}
              >
                Hegyesszögű
              </button>
              <button
                onClick={() => setTriangleType('right')}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg border transition-all ${triangleType === 'right' ? 'bg-teal-600 text-white border-teal-600 shadow-sm' : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'}`}
              >
                Derékszögű
              </button>
              <button
                onClick={() => setTriangleType('obtuse')}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg border transition-all ${triangleType === 'obtuse' ? 'bg-teal-600 text-white border-teal-600 shadow-sm' : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'}`}
              >
                Tompaszögű
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
            {/* SVG Visual */}
            <div className="lg:col-span-7 flex flex-col items-center justify-center p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 min-h-[260px] overflow-hidden">
              <svg viewBox="-50 0 350 200" className="w-full max-w-[340px] h-48 overflow-visible">
                {/* Coordinate origin at bottom left: (20, 150) */}
                <g transform="translate(40, 20)">
                  {/* Supplementary Twin Triangle (forms parallelogram) */}
                  {showTwinTriangle && (
                    <polygon
                      points={`${apexX},${150 - h} ${apexX + w},${150 - h} ${w},150`}
                      fill="rgba(20, 184, 166, 0.08)"
                      stroke="#0d9488"
                      strokeWidth="1.5"
                      strokeDasharray="4 4"
                    />
                  )}

                  {/* Base line extension for obtuse triangle if apex is to the left */}
                  {apexX < 0 && (
                    <line
                      x1={apexX}
                      y1="150"
                      x2="0"
                      y2="150"
                      stroke="#94a3b8"
                      strokeWidth="1"
                      strokeDasharray="3 3"
                    />
                  )}

                  {/* Main Triangle */}
                  <polygon
                    points={`0,150 ${w},150 ${apexX},${150 - h}`}
                    fill="rgba(13, 148, 136, 0.18)"
                    stroke="#0f766e"
                    strokeWidth="3"
                    strokeLinejoin="round"
                  />

                  {/* Height line ma */}
                  <line
                    x1={apexX}
                    y1={150 - h}
                    x2={apexX}
                    y2="150"
                    stroke="#e11d48"
                    strokeWidth="2"
                    strokeDasharray="5 3"
                  />

                  {/* Right angle marker (Hungarian standard: circular arc + dot) */}
                  <path
                    d={`M ${apexX + 11} 150 A 11 11 0 0 0 ${apexX} 139`}
                    fill="none"
                    stroke="#e11d48"
                    strokeWidth="1.5"
                  />
                  <circle cx={apexX + 4} cy="146" r="1.3" fill="#e11d48" />

                  {/* Height label */}
                  <text
                    x={apexX > 30 ? apexX - 8 : apexX + 12}
                    y={150 - h / 2}
                    textAnchor={apexX > 30 ? "end" : "start"}
                    className="text-[11px] font-black fill-rose-600 dark:fill-rose-400"
                  >
                    m_a = {heightMa} cm
                  </text>

                  {/* Base label */}
                  <text
                    x={w / 2}
                    y="166"
                    textAnchor="middle"
                    className="text-[11px] font-black fill-slate-800 dark:fill-slate-200"
                  >
                    a = {baseA} cm
                  </text>

                  {/* Vertex labels */}
                  <text x="-12" y="154" className="text-[10px] font-bold fill-slate-500">A</text>
                  <text x={w + 4} y="154" className="text-[10px] font-bold fill-slate-500">B</text>
                  <text x={apexX} y={150 - h - 6} textAnchor="middle" className="text-[10px] font-bold fill-slate-500">C</text>

                  {/* Area label inside triangle */}
                  <text
                    x={(apexX + w / 2) / 2}
                    y={150 - h * 0.35}
                    textAnchor="middle"
                    className="text-[12px] font-black fill-teal-900 dark:fill-teal-100"
                  >
                    T = {area} cm²
                  </text>

                  {showTwinTriangle && (
                    <text
                      x={apexX + w * 0.55}
                      y={150 - h * 0.7}
                      textAnchor="middle"
                      className="text-[9px] font-bold fill-teal-600 dark:fill-teal-400 opacity-80"
                    >
                      Másolat (Δ2)
                    </text>
                  )}
                </g>
              </svg>

              <div className="mt-2 flex items-center gap-3">
                <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showTwinTriangle}
                    onChange={(e) => setShowTwinTriangle(e.target.checked)}
                    className="w-4 h-4 text-teal-600 rounded focus:ring-teal-500"
                  />
                  <span>Kiegészítő egybevágó háromszög mutatása (paralelogramma)</span>
                </label>
              </div>
            </div>

            {/* Controls and calculation */}
            <div className="lg:col-span-5 space-y-3.5">
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                  <span>Alapoldal (a):</span>
                  <span className="font-mono text-teal-700 dark:text-teal-300 font-bold">{baseA} cm</span>
                </div>
                <input
                  type="range"
                  min="4"
                  max="14"
                  value={baseA}
                  onChange={(e) => setBaseA(Number(e.target.value))}
                  className="w-full accent-teal-600 cursor-pointer"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                  <span>Magasság (m_a):</span>
                  <span className="font-mono text-rose-600 dark:text-rose-400 font-bold">{heightMa} cm</span>
                </div>
                <input
                  type="range"
                  min="3"
                  max="10"
                  value={heightMa}
                  onChange={(e) => setHeightMa(Number(e.target.value))}
                  className="w-full accent-rose-600 cursor-pointer"
                />
              </div>

              {/* Formula & Live Result Card */}
              <div className="p-3 bg-teal-50/90 dark:bg-teal-950/50 border border-teal-200 dark:border-teal-800 rounded-xl space-y-1.5 text-xs">
                <div className="text-[11px] font-bold text-teal-800 dark:text-teal-300 uppercase tracking-wider">
                  Kiszámítás lépései:
                </div>
                <div className="font-mono text-slate-700 dark:text-slate-300">
                  1. Alap × Magasság = {baseA} · {heightMa} = <strong>{parallelogramArea} cm²</strong> (paralelogramma)
                </div>
                <div className="font-mono text-teal-900 dark:text-teal-200 font-bold text-sm pt-1 border-t border-teal-200 dark:border-teal-800">
                  2. Osztás 2-vel: T = {parallelogramArea} / 2 = <span className="text-base text-teal-700 dark:text-teal-300">{area} cm²</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 2. FEJEZET: DERÉKSZÖGŰ HÁROMSZÖG */}
      <TheorySection
        id="fejezet-2"
        number={2}
        title="A derékszögű háromszög területe és az átfogó magassága"
        badge="SPECIÁLIS ESET"
      >
        <p className="text-xs text-slate-600 dark:text-slate-300 mb-4">
          A derékszögű háromszögben a két befogó (<MathText text="a" inline /> és <MathText text="b" inline />) egymásra merőleges, így külön magasságvonal megrajzolása nélkül is ismerjük a magasságot:
        </p>

        <GeometryFigureGrid columns={2}>
          <GeometryFigureCard
            title="Befogók szorzatának fele"
            badge="ALAPKÉPLET"
            figure={
              <svg viewBox="0 0 180 120" className="w-full max-w-[220px] h-32 overflow-visible">
                {/* Right triangle: A(30, 95), B(150, 95), C(30, 25) */}
                <polygon
                  points="30,95 150,95 30,25"
                  fill="rgba(13, 148, 136, 0.15)"
                  stroke="#0f766e"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                />
                {/* Right angle marker (Hungarian standard: circular arc + dot) */}
                <path
                  d="M 46 95 A 16 16 0 0 0 30 79"
                  fill="none"
                  stroke="#0f766e"
                  strokeWidth="1.5"
                />
                <circle cx="36" cy="89" r="1.5" fill="#0f766e" />
                {/* Base a label */}
                <text x="90" y="112" textAnchor="middle" className="text-[11px] font-black fill-slate-800 dark:fill-slate-100">
                  a (befogó)
                </text>
                {/* Height b label */}
                <text x="22" y="60" textAnchor="end" className="text-[11px] font-black fill-teal-700 dark:fill-teal-300">
                  b = mₐ (befogó)
                </text>
                {/* Hypotenuse c label */}
                <text x="98" y="52" textAnchor="middle" className="text-[10px] font-bold fill-slate-500 dark:fill-slate-400">
                  c (átfogó)
                </text>
                {/* Formula badge in center */}
                <g transform="translate(58, 68)">
                  <rect x="-4" y="-12" width="68" height="18" rx="4" fill="rgba(255,255,255,0.92)" className="dark:fill-slate-800" stroke="#0d9488" strokeWidth="1" />
                  <text x="30" y="0" textAnchor="middle" className="text-[10px] font-black fill-teal-800 dark:fill-teal-200">
                    T = (a · b) / 2
                  </text>
                </g>
              </svg>
            }
          >
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Mivel a két befogó derékszöget zár be, ha <MathText text="a" inline /> az alap, akkor <MathText text="b = m_a" inline />.
              Így a terület: <MathText text="T = \frac{a \cdot b}{2}" inline /> (téglalap területe felezve).
            </p>
          </GeometryFigureCard>

          <GeometryFigureCard
            title="Az átfogóhoz tartozó magasság visszaszámolása"
            badge="KÉT MAGASSÁG"
            figure={
              <svg viewBox="0 0 180 120" className="w-full max-w-[220px] h-32 overflow-visible">
                {/* Right triangle: A(30, 95), B(150, 95), C(30, 25) */}
                <polygon
                  points="30,95 150,95 30,25"
                  fill="rgba(99, 102, 241, 0.12)"
                  stroke="#4f46e5"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                />
                {/* Height mc line from right angle A(30, 95) perpendicular to hypotenuse BC */}
                <line
                  x1="30"
                  y1="95"
                  x2="67"
                  y2="47"
                  stroke="#e11d48"
                  strokeWidth="2"
                  strokeDasharray="4 3"
                />
                {/* Hungarian right angle marker at foot of mc */}
                <path
                  d="M 59 42.5 A 9 9 0 0 0 61.5 54.1"
                  fill="none"
                  stroke="#e11d48"
                  strokeWidth="1.3"
                />
                <circle cx="62" cy="48" r="1.2" fill="#e11d48" />
                {/* Hungarian right angle marker at vertex A */}
                <path
                  d="M 44 95 A 14 14 0 0 0 30 81"
                  fill="none"
                  stroke="#4f46e5"
                  strokeWidth="1.5"
                />
                <circle cx="35" cy="90" r="1.3" fill="#4f46e5" />
                {/* Label mc */}
                <text x="44" y="66" className="text-[11px] font-black fill-rose-600 dark:fill-rose-400">
                  m_c
                </text>
                {/* Labels for a, b, c */}
                <text x="90" y="110" textAnchor="middle" className="text-[10px] font-bold fill-slate-700 dark:fill-slate-300">
                  a
                </text>
                <text x="22" y="60" textAnchor="end" className="text-[10px] font-bold fill-slate-700 dark:fill-slate-300">
                  b
                </text>
                <text x="105" y="52" textAnchor="middle" className="text-[10px] font-black fill-indigo-700 dark:fill-indigo-300">
                  c (átfogó)
                </text>
                {/* Formula badge in center */}
                <g transform="translate(68, 86)">
                  <rect x="-3" y="-12" width="76" height="18" rx="4" fill="rgba(255,255,255,0.92)" className="dark:fill-slate-800" stroke="#4f46e5" strokeWidth="1" />
                  <text x="35" y="0" textAnchor="middle" className="text-[9px] font-black fill-indigo-800 dark:fill-indigo-200">
                    m_c = (a · b) / c
                  </text>
                </g>
              </svg>
            }
          >
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Mivel a terület mindkét oldalról ugyanakkora:
              <br />
              <MathText text="2T = a \cdot b = c \cdot m_c" inline />
              <br />
              Ebből az átfogóhoz tartozó magasság: <MathText text="m_c = \frac{a \cdot b}{c}" inline />.
            </p>
          </GeometryFigureCard>
        </GeometryFigureGrid>
      </TheorySection>

      {/* 3. FEJEZET: TOMPASZÖGŰ HÁROMSZÖG ÉS KÜLSŐ MAGASSÁG */}
      <TheorySection
        id="fejezet-3"
        number={3}
        title="Tompaszögű háromszög és a külső magasság"
        badge="FONTOS RÉSZLET"
      >
        <p className="text-xs text-slate-600 dark:text-slate-300 mb-4 leading-relaxed">
          Tompaszögű háromszögnél a hegyesszögek csúcsaiból induló magasságvonalak a <strong>háromszögön kívülre</strong> esnek. A magasság talppontja csak az alapoldal meghosszabbításán érhető el.
        </p>

        <GeometryFigureCard
          title="Tompaszögű háromszög területe külső magassággal"
          badge="KÜLSŐ MAGASSÁG"
          figure={
            <svg viewBox="0 0 220 125" className="w-full max-w-[260px] h-32 overflow-visible">
              {/* Base line extension from foot (25, 95) to A(65, 95) */}
              <line
                x1="25"
                y1="95"
                x2="65"
                y2="95"
                stroke="#94a3b8"
                strokeWidth="1.5"
                strokeDasharray="4 3"
              />
              {/* Main obtuse triangle body: A(65, 95), B(185, 95), C(25, 30) */}
              <polygon
                points="65,95 185,95 25,30"
                fill="rgba(13, 148, 136, 0.16)"
                stroke="#0f766e"
                strokeWidth="2.5"
                strokeLinejoin="round"
              />
              {/* External height line from apex C(25, 30) straight down to foot (25, 95) */}
              <line
                x1="25"
                y1="30"
                x2="25"
                y2="95"
                stroke="#e11d48"
                strokeWidth="2"
                strokeDasharray="4 3"
              />
              {/* Right angle marker (Hungarian standard: circular arc + dot) */}
              <path
                d="M 39 95 A 14 14 0 0 0 25 81"
                fill="none"
                stroke="#e11d48"
                strokeWidth="1.5"
              />
              <circle cx="30" cy="90" r="1.4" fill="#e11d48" />
              {/* External height label */}
              <text x="18" y="65" textAnchor="end" className="text-[11px] font-black fill-rose-600 dark:fill-rose-400">
                m_a
              </text>
              {/* Real base a marker bar */}
              <line x1="65" y1="103" x2="185" y2="103" stroke="#0f766e" strokeWidth="2" />
              <line x1="65" y1="99" x2="65" y2="107" stroke="#0f766e" strokeWidth="2" />
              <line x1="185" y1="99" x2="185" y2="107" stroke="#0f766e" strokeWidth="2" />
              <text x="125" y="117" textAnchor="middle" className="text-[11px] font-black fill-slate-800 dark:fill-slate-100">
                a (az eredeti alap!)
              </text>
              {/* Extension note */}
              <text x="45" y="108" textAnchor="middle" className="text-[8px] font-semibold fill-slate-400 italic">
                meghosszabbítás
              </text>
              {/* Formula badge inside triangle */}
              <g transform="translate(82, 60)">
                <rect x="-4" y="-12" width="76" height="18" rx="4" fill="rgba(255,255,255,0.92)" className="dark:fill-slate-800" stroke="#0d9488" strokeWidth="1" />
                <text x="34" y="0" textAnchor="middle" className="text-[10px] font-black fill-teal-900 dark:fill-teal-100">
                  T = (a · m_a) / 2
                </text>
              </g>
            </svg>
          }
        >
          <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
            <p>
              Bár a magasság talppontja kívül van, a képletben <strong>kizárólag az eredeti <MathText text="a" inline /> oldal hossza</strong> szerepel!
            </p>
            <p className="font-semibold text-rose-600 dark:text-rose-400">
              FIGYELEM: A szaggatott vonallal jelölt meghosszabbítást TILOS hozzáadni az alaphoz!
            </p>
          </div>
        </GeometryFigureCard>
      </TheorySection>

      {/* 4. FEJEZET: BUKTATÓK ÉS ÖSSZEFOGLALÁS */}
      <TheorySection
        id="fejezet-4"
        number={4}
        title="Gyakori buktatók és összefoglaló táblázat"
        badge="TIPPEK ÉS ÖSSZEGZÉS"
      >
        <TheoryTrapBox
          title="Gyakori buktatók háromszög területszámításánál"
          traps={[
            {
              mistake: 'Elfelejteni elosztani 2-vel (T = a · ma-t számolni)',
              correction: 'A háromszög területe a paralelogramma fele, így a 2-vel való osztás KÖTELEZŐ: T = (a · ma) / 2!'
            },
            {
              mistake: 'Nem az összetartozó oldalt és magasságot megszorozni (pl. a · mb-t venni)',
              correction: 'Mindig a csúcsból az ADOTT oldalra merőleges magasságvonalat kell használni: a-hoz ma, b-hez mb tartozik!'
            },
            {
              mistake: 'Derékszögű háromszögnél a befogót és az átfogót megszorozni',
              correction: 'A derékszögű háromszög területe kizárólag a KÉT BEFOGÓ szorzatának fele: T = (a · b) / 2. Az átfogó nem magasság!'
            },
            {
              mistake: 'Tompaszögű háromszögnél a külső szakaszt hozzáadni az alaphoz',
              correction: 'A magasság merőlegességét a meghosszabbítás adja, de az alap hossza csak a háromszög eredeti oldala marad.'
            }
          ]}
        />

        <div className="my-6">
          <TheoryTable
            headers={['Háromszög típusa', 'Területképlet', 'Magasság jellemzője', 'Példa számítás']}
            rows={[
              ['Általános háromszög', 'T = (a · ma) / 2', 'Belső vagy külső merőleges vonal', 'a = 10, ma = 6 -> T = 30 cm²'],
              ['Derékszögű háromszög', 'T = (a · b) / 2', 'Egybeesik a másik befogóval (b = ma)', 'a = 8, b = 6 -> T = 24 cm²'],
              ['Egyenlő szárú (a alap, b szár)', 'T = (a · ma) / 2', 'Az alaphoz tartozó ma felezi az alapot', 'a = 12, ma = 8 -> T = 48 cm²'],
              ['Szabályos háromszög (a oldal)', 'T = (a · m) / 2 = (√3 / 4) · a²', 'Minden oldalához egyenlő magasság tartozik', 'a = 6, m ≈ 5,2 -> T ≈ 15,6 cm²']
            ]}
          />
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default TriangleAreaTheory;
