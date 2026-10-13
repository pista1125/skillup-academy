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
  Split,
  Combine,
  Grid
} from 'lucide-react';
import { MathText } from '@/components/math/shared/MathText';

interface DeltoidAreaTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

export const DeltoidAreaTheory: React.FC<DeltoidAreaTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // Interactive Simulator state
  const [diagonalE, setDiagonalE] = useState<number>(8); // Horizontal diagonal e (cm)
  const [diagonalF, setDiagonalF] = useState<number>(12); // Vertical diagonal f (cm)
  const [splitRatio, setSplitRatio] = useState<number>(0.35); // Where e crosses f (0.35 = deltoid, 0.5 = rhombus)
  const [showBoundingBox, setShowBoundingBox] = useState<boolean>(true);

  // Calculations
  const area = (diagonalE * diagonalF) / 2;
  const rectArea = diagonalE * diagonalF;

  // Approximate side lengths for perimeter
  const yIntersection = diagonalF * splitRatio;
  const sideA = Math.round(Math.sqrt(Math.pow(diagonalE / 2, 2) + Math.pow(yIntersection, 2)) * 10) / 10;
  const sideB = Math.round(Math.sqrt(Math.pow(diagonalE / 2, 2) + Math.pow(diagonalF - yIntersection, 2)) * 10) / 10;
  const perimeter = Math.round(2 * (sideA + sideB) * 10) / 10;

  // SVG scaling
  const scale = 11;
  const svgWidth = diagonalE * scale;
  const svgHeight = diagonalF * scale;
  const cx = 110;
  const cyTop = 20;
  const cyInter = cyTop + yIntersection * scale;
  const cyBottom = cyTop + svgHeight;
  const xLeft = cx - svgWidth / 2;
  const xRight = cx + svgWidth / 2;

  // Self-check state
  const [practiceAnswers, setPracticeAnswers] = useState<Record<string, number | string>>({});
  const [checkedResults, setCheckedResults] = useState<Record<string, boolean | null>>({});

  const handleCheck = (id: string, expected: number) => {
    const userVal = parseFloat(String(practiceAnswers[id] || ''));
    setCheckedResults(prev => ({
      ...prev,
      [id]: Math.abs(userVal - expected) < 0.05
    }));
  };

  return (
    <TheoryTemplate
      title="8. A deltoid területe"
      subtitle="A deltoid fogalma, szimmetriája, merőleges átlói és a területképlet származtatása a körülírt téglalapból"
      badgeText="7. OSZTÁLY • VII. GEOMETRIA • 📖 8. LECKE"
      quickRule={{
        label: 'Fontos szabály',
        formula: 'T = \\frac{e \\cdot f}{2} \\quad • \\quad K = 2(a + b) \\quad • \\quad e \\perp f \\quad • \\quad T_{\\text{rombusz}} = \\frac{e \\cdot f}{2} = a \\cdot m_a'
      }}
      topicId="g7-geom-deltoid-area"
      chapterId="geometria"
      grade={7}
      themeColor="teal"
      estimatedReadTime="13 perc"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
    >
      {/* 1. FEJEZET: A deltoid fogalma és geometriai jellemzői */}
      <TheorySection
        title="1. A deltoid fogalma és geometriai tulajdonságai"
        badge="ALAPFOGALMAK"
        icon={<Shapes className="w-5 h-5 text-teal-600" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            <p>
              A <strong>deltoid</strong> olyan négyszög, amelynek{' '}
              <strong className="text-teal-700 dark:text-teal-400">van két-két szomszédos, egyenlő hosszú oldala</strong>{' '}
              (<MathText size="sm">{'a = a'}</MathText> és <MathText size="sm">{'b = b'}</MathText>).
            </p>
            <ul className="space-y-2 list-disc list-inside bg-teal-50/50 dark:bg-teal-950/20 p-4 rounded-xl border border-teal-100 dark:border-teal-900/40">
              <li>
                <strong>Merőleges átlók:</strong> Az átlók mindig merőlegesek egymásra:{' '}
                <strong className="text-teal-700 dark:text-teal-300">
                  <MathText size="sm">{'e \\perp f'}</MathText>
                </strong>.
              </li>
              <li>
                <strong>Szimmetriaátló (<MathText size="sm">{'f'}</MathText>):</strong>{' '}
                A két különböző oldal találkozási pontjait köti össze. Ez az átló:{' '}
                merőlegesen <strong>felezi a másik átlót</strong> (<MathText size="sm">{'e'}</MathText>), 
                felezi a csúcsszögeket, és a deltoid <strong>szimmetriatengelye</strong>.
              </li>
              <li>
                <strong>Keresztátló (<MathText size="sm">{'e'}</MathText>):</strong>{' '}
                Két egyenlő félre osztódik a szimmetriaátló által.
              </li>
              <li>
                <strong>Egyenlő szögek:</strong> A két szimmetrikusan elhelyezkedő szemközti szög egyenlő (<MathText size="sm">{'\\beta = \\delta'}</MathText>).
              </li>
              <li>
                <strong>Kerület:</strong> Négy oldal összege:{' '}
                <strong className="text-teal-700 dark:text-teal-300">
                  <MathText size="sm">{'K = 2 \\cdot a + 2 \\cdot b = 2(a + b)'}</MathText>
                </strong>.
              </li>
            </ul>
          </div>

          <GeometryFigureCard
            title="A deltoid felépítése és átlói"
            badge="GEOMETRIA"
            figure={
              <svg viewBox="0 0 220 180" className="w-full max-w-[240px] h-44 overflow-visible">
                {/* Symmetry axis extension */}
                <line x1="110" y1="5" x2="110" y2="175" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4 2" />
                <text x="114" y="14" className="text-[8px] font-bold fill-amber-600">t (tengely)</text>

                {/* Deltoid polygon */}
                <polygon
                  points="110,20 170,75 110,165 50,75"
                  fill="rgba(20, 184, 166, 0.14)"
                  stroke="#0d9488"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                />

                {/* Vertical diagonal f */}
                <line x1="110" y1="20" x2="110" y2="165" stroke="#6366f1" strokeWidth="2" />
                {/* Horizontal diagonal e */}
                <line x1="50" y1="75" x2="170" y2="75" stroke="#e11d48" strokeWidth="2" strokeDasharray="4 2" />

                {/* Hungarian right angle marker at (110, 75): arc + dot */}
                <path d="M 124 75 A 14 14 0 0 0 110 61" fill="none" stroke="#e11d48" strokeWidth="1.5" />
                <circle cx="116" cy="69" r="1.3" fill="#e11d48" />

                {/* Equal side ticks */}
                <line x1="77" y1="45" x2="83" y2="50" stroke="#0d9488" strokeWidth="2" />
                <line x1="137" y1="50" x2="143" y2="45" stroke="#0d9488" strokeWidth="2" />

                {/* Side ticks for b */}
                <line x1="77" y1="120" x2="83" y2="123" stroke="#0d9488" strokeWidth="2" />
                <line x1="75" y1="123" x2="81" y2="126" stroke="#0d9488" strokeWidth="2" />
                <line x1="137" y1="123" x2="143" y2="120" stroke="#0d9488" strokeWidth="2" />
                <line x1="139" y1="126" x2="145" y2="123" stroke="#0d9488" strokeWidth="2" />

                {/* Labels */}
                <text x="70" y="40" className="text-[10px] font-bold fill-teal-700">a</text>
                <text x="145" y="40" className="text-[10px] font-bold fill-teal-700">a</text>
                <text x="65" y="130" className="text-[10px] font-bold fill-teal-800">b</text>
                <text x="150" y="130" className="text-[10px] font-bold fill-teal-800">b</text>

                <text x="115" y="105" className="text-[10px] font-bold fill-indigo-600">f</text>
                <text x="140" y="70" className="text-[10px] font-bold fill-rose-600">e/2</text>
              </svg>
            }
            properties={[
              { label: 'Szomszédos oldalak', value: 'a = a és b = b' },
              { label: 'Átlók helyzete', value: 'e ⊥ f (merőlegesek)' },
              { label: 'Felezés', value: 'f felezi e-t (e/2 és e/2)' },
              { label: 'Szimmetriatengely', value: '1 db (f átló egyenese)' }
            ]}
          />
        </div>
      </TheorySection>

      {/* 2. FEJEZET: A területképlet levezetése & Interaktív szimulátor */}
      <TheorySection
        title="2. A területképlet levezetése és interaktív szimulátor"
        badge="SZÁRMAZTATÁS"
        icon={<Maximize2 className="w-5 h-5 text-teal-600" />}
      >
        <TheoryCallout
          variant="lightbulb"
          title="Hogyan vezethető le a deltoid területképlete?"
          text="Rajzoljunk az átlókkal párhuzamos egyeneseket a deltoid 4 csúcsán át! Egy e szélességű és f magasságú téglalapot kapunk. Az átlók ezt a téglalapot 4 kisebb téglalapra osztják, és mindegyik kistéglalapnak pontosan a felét fedi le a deltoid (átlósan megfelezve)! Tehát a deltoid területe pontosan a fele a körülírt e × f téglalap területének: T = (e · f) / 2."
        />

        {/* Interactive Simulator Box */}
        <div className="bg-slate-50 dark:bg-slate-900/70 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h4 className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-teal-500" />
                Interaktív deltoid- és téglalap szimulátor
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Változtasd az átlók hosszát, és figyeld meg a körülírt téglalap és a deltoid viszonyát!
              </p>
            </div>

            {/* Shape presets */}
            <div className="flex gap-2">
              <button
                onClick={() => setSplitRatio(0.35)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  splitRatio === 0.35
                    ? 'bg-teal-600 text-white shadow-sm'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                }`}
              >
                Hagyományos deltoid
              </button>
              <button
                onClick={() => setSplitRatio(0.5)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  splitRatio === 0.5
                    ? 'bg-teal-600 text-white shadow-sm'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                }`}
              >
                Rombusz (két szimmetriatengely)
              </button>
            </div>
          </div>

          {/* Sliders */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-slate-600 dark:text-slate-400">Vízszintes átló (e):</span>
                <span className="text-rose-600 dark:text-rose-400 font-mono">{diagonalE} cm</span>
              </div>
              <input
                type="range"
                min="4"
                max="14"
                step="1"
                value={diagonalE}
                onChange={e => setDiagonalE(Number(e.target.value))}
                className="w-full accent-rose-600 cursor-pointer"
              />
            </div>

            <div className="bg-white dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-slate-600 dark:text-slate-400">Függőleges átló (f):</span>
                <span className="text-indigo-600 dark:text-indigo-400 font-mono">{diagonalF} cm</span>
              </div>
              <input
                type="range"
                min="6"
                max="18"
                step="1"
                value={diagonalF}
                onChange={e => setDiagonalF(Number(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer"
              />
            </div>
          </div>

          {/* Toggle Bounding Box button */}
          <div className="flex items-center justify-center">
            <button
              onClick={() => setShowBoundingBox(!showBoundingBox)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                showBoundingBox
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                  : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200'
              }`}
            >
              <Grid className="w-4 h-4" />
              {showBoundingBox ? 'Körülírt téglalap (2T) Elrejtése' : 'Körülírt téglalap Megjelenítése (2-szeres terület bizonyítása)'}
            </button>
          </div>

          {/* SVG Canvas */}
          <div className="bg-white dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-center overflow-x-auto min-h-[240px]">
            <svg
              viewBox={`0 0 220 ${svgHeight + 50}`}
              className="w-full max-w-[420px] h-56 overflow-visible"
            >
              <defs>
                <linearGradient id="deltoidGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#0d9488" stopOpacity="0.35" />
                </linearGradient>
              </defs>

              {/* Bounding Box (Rectangle) if showBoundingBox is true */}
              {showBoundingBox && (
                <>
                  <rect
                    x={xLeft}
                    y={cyTop}
                    width={svgWidth}
                    height={svgHeight}
                    fill="none"
                    stroke="#94a3b8"
                    strokeWidth="1.5"
                    strokeDasharray="4 3"
                  />
                  {/* Outer corner triangles shaded */}
                  <polygon points={`${xLeft},${cyTop} ${cx},${cyTop} ${xLeft},${cyInter}`} fill="rgba(148, 163, 184, 0.1)" />
                  <polygon points={`${xRight},${cyTop} ${cx},${cyTop} ${xRight},${cyInter}`} fill="rgba(148, 163, 184, 0.1)" />
                  <polygon points={`${xLeft},${cyBottom} ${cx},${cyBottom} ${xLeft},${cyInter}`} fill="rgba(148, 163, 184, 0.1)" />
                  <polygon points={`${xRight},${cyBottom} ${cx},${cyBottom} ${xRight},${cyInter}`} fill="rgba(148, 163, 184, 0.1)" />

                  <text x={cx} y={cyTop - 6} textAnchor="middle" className="text-[10px] font-bold fill-slate-500">
                    e = {diagonalE} cm (téglalap szélessége)
                  </text>
                  <text x={xRight + 12} y={cyTop + svgHeight / 2} textAnchor="start" className="text-[10px] font-bold fill-slate-500">
                    f = {diagonalF} cm
                  </text>
                </>
              )}

              {/* Deltoid Body */}
              <polygon
                points={`${cx},${cyTop} ${xRight},${cyInter} ${cx},${cyBottom} ${xLeft},${cyInter}`}
                fill="url(#deltoidGrad)"
                stroke="#0d9488"
                strokeWidth="2.5"
                strokeLinejoin="round"
              />

              {/* Diagonals */}
              <line x1={cx} y1={cyTop} x2={cx} y2={cyBottom} stroke="#6366f1" strokeWidth="2" />
              <line x1={xLeft} y1={cyInter} x2={xRight} y2={cyInter} stroke="#e11d48" strokeWidth="2" strokeDasharray="3 2" />

              {/* Hungarian right angle marker at (cx, cyInter) */}
              <path
                d={`M ${cx + 12} ${cyInter} A 12 12 0 0 0 ${cx} ${cyInter - 12}`}
                fill="none"
                stroke="#e11d48"
                strokeWidth="1.5"
              />
              <circle cx={cx + 4.5} cy={cyInter - 4.5} r="1.3" fill="#e11d48" />

              {/* Labels inside deltoid */}
              <text x={cx - 6} y={cyTop + (cyInter - cyTop) / 2} textAnchor="end" className="text-[10px] font-bold fill-indigo-600">
                f
              </text>
              <text x={cx + svgWidth / 4} y={cyInter - 4} textAnchor="middle" className="text-[10px] font-bold fill-rose-600">
                e / 2
              </text>
            </svg>
          </div>

          {/* Real-time Calculation Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-teal-50 dark:bg-teal-950/40 p-4 rounded-xl border border-teal-200 dark:border-teal-800/60 text-center">
              <div className="text-xs font-bold text-teal-800 dark:text-teal-300 mb-1">
                DELTOID TERÜLETE (T)
              </div>
              <div className="text-3xl font-black text-teal-700 dark:text-teal-400 font-mono">
                {area} cm²
              </div>
              <div className="text-[11px] text-teal-600 dark:text-teal-500 mt-1 font-mono">
                T = ({diagonalE} · {diagonalF}) / 2 = {area} cm²
              </div>
            </div>

            <div className="bg-indigo-50 dark:bg-indigo-950/40 p-4 rounded-xl border border-indigo-200 dark:border-indigo-800/60 text-center">
              <div className="text-xs font-bold text-indigo-800 dark:text-indigo-300 mb-1">
                KÖRÜLÍRT TÉGLALAP (2T)
              </div>
              <div className="text-2xl font-black text-indigo-700 dark:text-indigo-400 font-mono">
                {rectArea} cm²
              </div>
              <div className="text-[11px] text-indigo-600 dark:text-indigo-500 mt-1">
                e · f = {diagonalE} · {diagonalF} = {rectArea} cm²
              </div>
            </div>

            <div className="bg-emerald-50 dark:bg-emerald-950/40 p-4 rounded-xl border border-emerald-200 dark:border-emerald-800/60 text-center">
              <div className="text-xs font-bold text-emerald-800 dark:text-emerald-300 mb-1">
                KÖZELÍTŐ KERÜLET (K)
              </div>
              <div className="text-2xl font-black text-emerald-700 dark:text-emerald-400 font-mono">
                {perimeter} cm
              </div>
              <div className="text-[11px] text-emerald-600 dark:text-emerald-500 mt-1">
                2 · ({sideA} + {sideB}) = {perimeter} cm
              </div>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 3. FEJEZET: Merőleges átlójú négyszögek és a rombusz */}
      <TheorySection
        title="3. Merőleges átlójú négyszögek és a rombusz kapcsolata"
        badge="ÁLTALÁNOSÍTÁS"
        icon={<Layers className="w-5 h-5 text-teal-600" />}
      >
        <div className="space-y-4 text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
          <p>
            A deltoid területképlete{' '}
            <strong className="text-teal-700 dark:text-teal-400">bármely merőleges átlójú négyszögre érvényes</strong>!
          </p>
        </div>

        <GeometryFigureGrid columns={3}>
          {/* Rombusz */}
          <GeometryFigureCard
            title="Rombusz (egyenlő oldalú deltoid)"
            badge="SPECIÁLIS DELTOID"
            figure={
              <svg viewBox="0 0 160 120" className="w-full max-w-[170px] h-28 overflow-visible">
                <polygon points="80,15 140,60 80,105 20,60" fill="rgba(20, 184, 166, 0.12)" stroke="#0d9488" strokeWidth="2" />
                <line x1="80" y1="15" x2="80" y2="105" stroke="#6366f1" strokeWidth="1.5" />
                <line x1="20" y1="60" x2="140" y2="60" stroke="#e11d48" strokeWidth="1.5" />
                {/* Hungarian right angle marker */}
                <path d="M 90 60 A 10 10 0 0 0 80 50" fill="none" stroke="#e11d48" strokeWidth="1.2" />
                <circle cx="84" cy="56" r="1" fill="#e11d48" />
                <text x="80" y="116" textAnchor="middle" className="text-[9px] font-bold fill-slate-700">T = (e · f) / 2</text>
              </svg>
            }
            properties={[
              { label: 'Oldalak', value: 'a = b (mind a 4 egyenlő)' },
              { label: 'Átlók', value: 'Felezik egymást és merőlegesek' },
              { label: 'Két képlet', value: 'T = (e · f) / 2 = a · m_a' }
            ]}
          />

          {/* Négyzet */}
          <GeometryFigureCard
            title="Négyzet (szabályos deltoid)"
            badge="EGYENLŐ ÁTLÓK"
            figure={
              <svg viewBox="0 0 160 120" className="w-full max-w-[170px] h-28 overflow-visible">
                <polygon points="80,15 130,65 80,115 30,65" fill="rgba(99, 102, 241, 0.12)" stroke="#4f46e5" strokeWidth="2" />
                <line x1="80" y1="15" x2="80" y2="115" stroke="#4f46e5" strokeWidth="1.5" />
                <line x1="30" y1="65" x2="130" y2="65" stroke="#4f46e5" strokeWidth="1.5" />
                <path d="M 90 65 A 10 10 0 0 0 80 55" fill="none" stroke="#4f46e5" strokeWidth="1.2" />
                <circle cx="84" cy="61" r="1" fill="#4f46e5" />
                <text x="80" y="118" textAnchor="middle" className="text-[9px] font-bold fill-slate-700">T = e² / 2 = a²</text>
              </svg>
            }
            properties={[
              { label: 'Átlók', value: 'e = f és e ⊥ f' },
              { label: 'Átlókból terület', value: 'T = e² / 2' },
              { label: 'Oldalból terület', value: 'T = a²' }
            ]}
          />

          {/* Konkáv deltoid */}
          <GeometryFigureCard
            title="Konkáv deltoid (nyílhegy)"
            badge="KONKÁV ALAKZAT"
            figure={
              <svg viewBox="0 0 160 120" className="w-full max-w-[170px] h-28 overflow-visible">
                <polygon points="80,15 135,105 80,65 25,105" fill="rgba(244, 63, 94, 0.12)" stroke="#e11d48" strokeWidth="2" />
                <line x1="80" y1="15" x2="80" y2="105" stroke="#6366f1" strokeWidth="1.2" strokeDasharray="3 2" />
                <line x1="25" y1="105" x2="135" y2="105" stroke="#e11d48" strokeWidth="1.2" strokeDasharray="3 2" />
                <path d="M 88 105 A 8 8 0 0 0 80 97" fill="none" stroke="#6366f1" strokeWidth="1" />
                <circle cx="83" cy="102" r="0.8" fill="#6366f1" />
                <text x="80" y="118" textAnchor="middle" className="text-[9px] font-bold fill-slate-700">T = (e · f) / 2</text>
              </svg>
            }
            properties={[
              { label: 'Belső szög', value: 'Egy szöge > 180° (konkáv)' },
              { label: 'Átló metszéspont', value: 'Az alakzaton kívülre esik' },
              { label: 'Területképlet', value: 'Itt is T = (e · f) / 2 érvényes!' }
            ]}
          />
        </GeometryFigureGrid>
      </TheorySection>

      {/* 4. FEJEZET: Gyakori csapdák */}
      <TheorySection
        title="4. Gyakori hibák és tévhitek"
        badge="FIGYELEM"
        icon={<AlertTriangle className="w-5 h-5 text-amber-500" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryTrapBox title="1. CSAPDA: Az oldalak szorzata NEM terület!">
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-2">
              Sokan tévesen a szomszédos oldalakat szorozzák össze: <MathText size="sm">{'a \\cdot b'}</MathText>.
            </p>
            <div className="bg-white/80 dark:bg-slate-900/80 p-2.5 rounded-lg border border-rose-200 dark:border-rose-900/50 text-xs font-mono">
              <span className="text-rose-600 font-bold">❌ HIBÁS:</span> T = a · b (csak derékszögű téglalapnál működne)<br />
              <span className="text-teal-600 font-bold">✔ HELYES:</span> T = (e · f) / 2 (az átlók kellenek!)
            </div>
          </TheoryTrapBox>

          <TheoryTrapBox title="2. CSAPDA: Mindkét átló feleződésének feltételezése">
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-2">
              Általános deltoidban <strong>csak a keresztátló feleződik</strong>!
            </p>
            <div className="bg-white/80 dark:bg-slate-900/80 p-2.5 rounded-lg border border-rose-200 dark:border-rose-900/50 text-xs font-mono">
              <span className="text-rose-600 font-bold">❌ TÉVHIT:</span> Mindkét átló felezi a másikat<br />
              <span className="text-teal-600 font-bold">✔ IGAZSÁG:</span> Csak a szimmetriaátló felezi az e átlót. Mindkét átló csak rombuszban és négyzetben feleződik!
            </div>
          </TheoryTrapBox>

          <TheoryTrapBox title="3. CSAPDA: Visszaszámolásnál a 2-es szorzó elhagyása">
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-2">
              Ha adott a terület és keresett az egyik átló:
            </p>
            <div className="bg-white/80 dark:bg-slate-900/80 p-2.5 rounded-lg border border-teal-200 dark:border-teal-900/50 text-xs font-mono">
              <span className="text-indigo-600 font-bold">💡 SZABÁLY:</span> 2 · T = e · f<br />
              e = (2 · T) / f &nbsp;|&nbsp; f = (2 · T) / e
            </div>
          </TheoryTrapBox>

          <TheoryTrapBox title="4. CSAPDA: Kerület és terület keverése">
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-2">
              A kerülethez az oldalak, a területhez az átlók kellenek:
            </p>
            <div className="bg-white/80 dark:bg-slate-900/80 p-2.5 rounded-lg border border-emerald-200 dark:border-emerald-900/50 text-xs font-mono">
              <span className="text-emerald-700 font-bold">✔ K = 2(a + b)</span> (oldalak összege, cm)<br />
              <span className="text-teal-700 font-bold">✔ T = (e · f) / 2</span> (átlók szorzata per 2, cm²)
            </div>
          </TheoryTrapBox>
        </div>
      </TheorySection>

      {/* 5. FEJEZET: Kidolgozott mintapéldák & Gyakorlás */}
      <TheorySection
        title="5. Kidolgozott mintapéldák és azonnali önellenőrzés"
        badge="MINTAPÉLDÁK"
        icon={<Calculator className="w-5 h-5 text-teal-600" />}
      >
        <div className="space-y-4">
          {/* Példa 1 */}
          <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex justify-between items-start">
              <h5 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                1. Mintapélda: Deltoid területe átlókból
              </h5>
              <span className="text-xs font-mono bg-teal-100 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 px-2 py-0.5 rounded">
                Alapszint
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Egy deltoid átlói <MathText size="sm">{'e = 12\\text{ cm}'}</MathText> és{' '}
              <MathText size="sm">{'f = 16\\text{ cm}'}</MathText>. Mekkora a területe?
            </p>
            <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-lg text-xs font-mono text-slate-800 dark:text-slate-200 space-y-1">
              <div>1. Képlet: T = (e · f) / 2</div>
              <div>2. Behelyettesítés: T = (12 · 16) / 2 = 192 / 2 = <strong>96 cm²</strong></div>
            </div>
          </div>

          {/* Példa 2 */}
          <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex justify-between items-start">
              <h5 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                2. Mintapélda: Hiányzó átló visszaszámolása
              </h5>
              <span className="text-xs font-mono bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded">
                Középszint
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Egy deltoid területe <MathText size="sm">{'T = 70\\text{ cm}^2'}</MathText>, egyik átlója{' '}
              <MathText size="sm">{'e = 10\\text{ cm}'}</MathText>. Mekkora a másik átlója (<MathText size="sm">{'f'}</MathText>)?
            </p>
            <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-lg text-xs font-mono text-slate-800 dark:text-slate-200 space-y-1">
              <div>1. Kétszeres terület: 2 · T = 2 · 70 = 140 cm²</div>
              <div>2. f = (2 · T) / e = 140 / 10 = <strong>14 cm</strong></div>
            </div>
          </div>

          {/* Példa 3 */}
          <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex justify-between items-start">
              <h5 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                3. Mintapélda: Rombusz magasságának kiszámítása átlókból
              </h5>
              <span className="text-xs font-mono bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 px-2 py-0.5 rounded">
                Haladó
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Egy rombusz átlói <MathText size="sm">{'e = 6\\text{ cm}'}</MathText> és <MathText size="sm">{'f = 8\\text{ cm}'}</MathText>, 
              oldala <MathText size="sm">{'a = 5\\text{ cm}'}</MathText>. Mekkora a rombusz magassága (<MathText size="sm">{'m_a'}</MathText>)?
            </p>
            <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-lg text-xs font-mono text-slate-800 dark:text-slate-200 space-y-1">
              <div>1. Terület átlókból: T = (6 · 8) / 2 = 48 / 2 = 24 cm²</div>
              <div>2. Ugyanez a terület oldalból és magasságból: T = a · m_a ⟹ 24 = 5 · m_a</div>
              <div>3. Magasság: m_a = 24 / 5 = <strong>4,8 cm</strong></div>
            </div>
          </div>
        </div>

        {/* Gyakorló önellenőrző doboz */}
        <div className="mt-6 p-5 rounded-2xl bg-gradient-to-br from-teal-500/10 to-indigo-500/10 border border-teal-300/60 dark:border-teal-800 space-y-4">
          <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-teal-600" />
            Önellenőrző mini-teszt: Számold ki és ellenőrizd!
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Task 1 */}
            <div className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
              <p className="text-xs text-slate-700 dark:text-slate-300">
                1. Egy deltoid átlói <MathText size="sm">{'e = 14\\text{ cm}'}</MathText> és{' '}
                <MathText size="sm">{'f = 9\\text{ cm}'}</MathText>. Mennyi a területe (cm²)?
              </p>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="Eredmény"
                  value={practiceAnswers['p1'] || ''}
                  onChange={e => setPracticeAnswers(prev => ({ ...prev, p1: e.target.value }))}
                  className="w-24 px-2 py-1 text-xs rounded border border-slate-300 dark:border-slate-700 font-mono"
                />
                <button
                  onClick={() => handleCheck('p1', 63)}
                  className="px-3 py-1 bg-teal-600 text-white rounded text-xs font-bold hover:bg-teal-700 transition"
                >
                  Ellenőrzés
                </button>
                {checkedResults['p1'] === true && (
                  <span className="text-emerald-600 text-xs font-bold flex items-center gap-1">
                    <Check className="w-4 h-4" /> Helyes! ((14 · 9) / 2 = 63 cm²)
                  </span>
                )}
                {checkedResults['p1'] === false && (
                  <span className="text-rose-600 text-xs font-bold flex items-center gap-1">
                    <X className="w-4 h-4" /> Újra! (T = (e · f) / 2)
                  </span>
                )}
              </div>
            </div>

            {/* Task 2 */}
            <div className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
              <p className="text-xs text-slate-700 dark:text-slate-300">
                2. Deltoid: <MathText size="sm">{'T = 40\\text{ cm}^2'}</MathText>, egyik átló{' '}
                <MathText size="sm">{'e = 8\\text{ cm}'}</MathText>. Mekkora a másik átló <MathText size="sm">{'f'}</MathText> (cm)?
              </p>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="Eredmény"
                  value={practiceAnswers['p2'] || ''}
                  onChange={e => setPracticeAnswers(prev => ({ ...prev, p2: e.target.value }))}
                  className="w-24 px-2 py-1 text-xs rounded border border-slate-300 dark:border-slate-700 font-mono"
                />
                <button
                  onClick={() => handleCheck('p2', 10)}
                  className="px-3 py-1 bg-teal-600 text-white rounded text-xs font-bold hover:bg-teal-700 transition"
                >
                  Ellenőrzés
                </button>
                {checkedResults['p2'] === true && (
                  <span className="text-emerald-600 text-xs font-bold flex items-center gap-1">
                    <Check className="w-4 h-4" /> Helyes! (2 · 40 / 8 = 10 cm)
                  </span>
                )}
                {checkedResults['p2'] === false && (
                  <span className="text-rose-600 text-xs font-bold flex items-center gap-1">
                    <X className="w-4 h-4" /> Újra! (f = 2T / e)
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};
