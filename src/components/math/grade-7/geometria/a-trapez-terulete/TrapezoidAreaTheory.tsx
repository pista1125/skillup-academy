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
  Combine
} from 'lucide-react';
import { MathText } from '@/components/math/shared/MathText';

interface TrapezoidAreaTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

export const TrapezoidAreaTheory: React.FC<TrapezoidAreaTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // Interactive Simulator state
  const [baseA, setBaseA] = useState<number>(10);
  const [baseC, setBaseC] = useState<number>(6);
  const [heightM, setHeightM] = useState<number>(5);
  const [trapezoidType, setTrapezoidType] = useState<'general' | 'isosceles' | 'right'>('isosceles');
  const [showTwin, setShowTwin] = useState<boolean>(true);

  // Calculated values
  const midLineK = (baseA + baseC) / 2;
  const area = midLineK * heightM;
  const parallelogramArea = (baseA + baseC) * heightM;

  // SVG coordinate scaling (1 unit = 14px)
  const scale = 14;
  const wa = baseA * scale;
  const wc = baseC * scale;
  const h = heightM * scale;

  // Left offset of top base (c)
  let s1 = scale * 2.5; // general
  if (trapezoidType === 'isosceles') {
    s1 = (wa - wc) / 2;
  } else if (trapezoidType === 'right') {
    s1 = 0;
  }

  // Vertices of primary trapezoid:
  // A(0, h), B(wa, h), C(s1 + wc, 0), D(s1, 0)
  const pA = { x: 0, y: h };
  const pB = { x: wa, y: h };
  const pC = { x: s1 + wc, y: 0 };
  const pD = { x: s1, y: 0 };

  // Midpoints of legs: AD midpoint M1, BC midpoint M2
  const midM1 = { x: (pA.x + pD.x) / 2, y: h / 2 };
  const midM2 = { x: (pB.x + pC.x) / 2, y: h / 2 };

  // Twin trapezoid vertices when rotated 180° and attached to form a parallelogram
  // Base becomes wa + wc at bottom, and top is shifted accordingly
  const twinA = { x: wa, y: h };
  const twinB = { x: wa + wc, y: h };
  const twinC = { x: s1 + wc + wa, y: 0 };
  const twinD = { x: s1 + wc, y: 0 };

  // Interactive self-check state
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
      title="7. A trapéz területe"
      subtitle="A trapéz fogalma, részei, a középvonal szerepe, a területképlet levezetése és a speciális trapézok tulajdonságai"
      badgeText="7. OSZTÁLY • VII. GEOMETRIA • 📖 7. LECKE"
      quickRule={{
        label: 'Fontos szabály',
        formula: 'T = \\frac{a + c}{2} \\cdot m = k \\cdot m \\quad • \\quad k = \\frac{a + c}{2} \\quad • \\quad K = a + b + c + d'
      }}
      topicId="g7-geom-trapezoid-area"
      chapterId="geometria"
      grade={7}
      themeColor="emerald"
      estimatedReadTime="14 perc"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
    >
      {/* 1. FEJEZET: Mi a trapéz? */}
      <TheorySection
        title="1. A trapéz fogalma és részei"
        badge="ALAPFOGALMAK"
        icon={<Shapes className="w-5 h-5 text-emerald-600" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            <p>
              A <strong>trapéz</strong> olyan négyszög, amelynek{' '}
              <strong className="text-emerald-700 dark:text-emerald-400">van legalább egy párhuzamos oldalpárja</strong>.
            </p>
            <ul className="space-y-2 list-disc list-inside bg-emerald-50/50 dark:bg-emerald-950/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-900/40">
              <li>
                <strong>Alapok (<MathText size="sm">{'a'}</MathText> és <MathText size="sm">{'c'}</MathText>):</strong>{' '}
                A két párhuzamos oldal. Általában a hosszabbat alsó alapnak (<MathText size="sm">{'a'}</MathText>), 
                a rövidebbet felső alapnak (<MathText size="sm">{'c'}</MathText>) nevezzük (<MathText size="sm">{'a \\parallel c'}</MathText>).
              </li>
              <li>
                <strong>Szárak (<MathText size="sm">{'b'}</MathText> és <MathText size="sm">{'d'}</MathText>):</strong>{' '}
                A két nem feltétlenül párhuzamos szemközti oldal.
              </li>
              <li>
                <strong>Magasság (<MathText size="sm">{'m'}</MathText>):</strong>{' '}
                A két párhuzamos alap egyenese közötti legrövidebb, merőleges távolság.
              </li>
              <li>
                <strong>Középvonal (<MathText size="sm">{'k'}</MathText>):</strong>{' '}
                A két szár felezőpontját összekötő szakasz. Párhuzamos az alapokkal, és hossza az alapok számtani közepe:{' '}
                <strong className="text-emerald-700 dark:text-emerald-300">
                  <MathText size="sm">{'k = \\frac{a + c}{2}'}</MathText>
                </strong>.
              </li>
            </ul>
          </div>

          <GeometryFigureCard
            title="A trapéz részei és jelölései"
            badge="FELÉPÍTÉS"
            figure={
              <svg viewBox="0 0 240 160" className="w-full max-w-[260px] h-40 overflow-visible">
                {/* Trapezoid body */}
                <polygon
                  points="20,130 200,130 160,30 60,30"
                  fill="rgba(16, 185, 129, 0.12)"
                  stroke="#059669"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                />

                {/* Midline k */}
                <line
                  x1="40"
                  y1="80"
                  x2="180"
                  y2="80"
                  stroke="#6366f1"
                  strokeWidth="2"
                  strokeDasharray="4 3"
                />
                <circle cx="40" cy="80" r="3" fill="#6366f1" />
                <circle cx="180" cy="80" r="3" fill="#6366f1" />
                <text x="110" y="74" textAnchor="middle" className="text-[10px] font-bold fill-indigo-600 dark:fill-indigo-400">
                  k (középvonal)
                </text>

                {/* Height line m */}
                <line
                  x1="60"
                  y1="30"
                  x2="60"
                  y2="130"
                  stroke="#e11d48"
                  strokeWidth="2"
                  strokeDasharray="4 3"
                />
                {/* Hungarian right angle marker: arc + dot at (60, 130) */}
                <path d="M 72 130 A 12 12 0 0 0 60 118" fill="none" stroke="#e11d48" strokeWidth="1.5" />
                <circle cx="65" cy="125" r="1.3" fill="#e11d48" />
                <text x="52" y="80" textAnchor="end" className="text-[10px] font-bold fill-rose-600 dark:fill-rose-400">
                  m
                </text>

                {/* Side labels */}
                <text x="110" y="146" textAnchor="middle" className="text-[11px] font-black fill-slate-800 dark:fill-slate-100">
                  a (alsó alap)
                </text>
                <text x="110" y="22" textAnchor="middle" className="text-[11px] font-black fill-slate-800 dark:fill-slate-100">
                  c (felső alap)
                </text>
                <text x="30" y="55" textAnchor="end" className="text-[10px] font-bold fill-slate-600 dark:fill-slate-400">
                  d
                </text>
                <text x="190" y="55" className="text-[10px] font-bold fill-slate-600 dark:fill-slate-400">
                  b
                </text>
              </svg>
            }
            properties={[
              { label: 'Párhuzamos alapok', value: 'a ∥ c' },
              { label: 'Szárak', value: 'b és d' },
              { label: 'Középvonal', value: 'k = (a + c) / 2' },
              { label: 'Magasság', value: 'm (merőleges távolság)' }
            ]}
          />
        </div>
      </TheorySection>

      {/* 2. FEJEZET: Interaktív szimulátor & Levezetés */}
      <TheorySection
        title="2. A területképlet származtatása és interaktív szimulátor"
        badge="SZÁRMAZTATÁS"
        icon={<Maximize2 className="w-5 h-5 text-emerald-600" />}
      >
        <TheoryCallout
          variant="lightbulb"
          title="Hogyan kapjuk meg a trapéz területképletét?"
          text="Ha két egybevágó trapézt egymáshoz illesztünk úgy, hogy az egyiket 180°-kal megforgatjuk, egyetlen nagy paralelogrammát kapunk! Ennek a paralelogrammának az alapja (a + c), a magassága pedig pontosan a trapéz m magassága. Mivel a paralelogramma területe T = alap · magasság = (a + c) · m, ezért az eredeti trapéz területe ennek éppen a fele!"
        />

        {/* Interactive Simulator Box */}
        <div className="bg-slate-50 dark:bg-slate-900/70 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h4 className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-500" />
                Interaktív trapéz- és paralelogramma szimulátor
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Mozgasd az alapokat és a magasságot, és figyeld meg a paralelogrammává kiegészítést!
              </p>
            </div>

            {/* Type selector */}
            <div className="flex gap-2">
              <button
                onClick={() => setTrapezoidType('isosceles')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  trapezoidType === 'isosceles'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                }`}
              >
                Húrtrapéz
              </button>
              <button
                onClick={() => setTrapezoidType('right')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  trapezoidType === 'right'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                }`}
              >
                Derékszögű
              </button>
              <button
                onClick={() => setTrapezoidType('general')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  trapezoidType === 'general'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                }`}
              >
                Általános
              </button>
            </div>
          </div>

          {/* Sliders */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-slate-600 dark:text-slate-400">Alsó alap (a):</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-mono">{baseA} cm</span>
              </div>
              <input
                type="range"
                min="6"
                max="16"
                step="1"
                value={baseA}
                onChange={e => {
                  const val = Number(e.target.value);
                  setBaseA(val);
                  if (baseC >= val) setBaseC(val - 2);
                }}
                className="w-full accent-emerald-600 cursor-pointer"
              />
            </div>

            <div className="bg-white dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-slate-600 dark:text-slate-400">Felső alap (c):</span>
                <span className="text-teal-600 dark:text-teal-400 font-mono">{baseC} cm</span>
              </div>
              <input
                type="range"
                min="2"
                max={Math.max(2, baseA - 1)}
                step="1"
                value={baseC}
                onChange={e => setBaseC(Number(e.target.value))}
                className="w-full accent-teal-600 cursor-pointer"
              />
            </div>

            <div className="bg-white dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-slate-600 dark:text-slate-400">Magasság (m):</span>
                <span className="text-rose-600 dark:text-rose-400 font-mono">{heightM} cm</span>
              </div>
              <input
                type="range"
                min="3"
                max="8"
                step="1"
                value={heightM}
                onChange={e => setHeightM(Number(e.target.value))}
                className="w-full accent-rose-600 cursor-pointer"
              />
            </div>
          </div>

          {/* Toggle twin trapezoid button */}
          <div className="flex items-center justify-center">
            <button
              onClick={() => setShowTwin(!showTwin)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                showTwin
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                  : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200'
              }`}
            >
              <Combine className="w-4 h-4" />
              {showTwin ? 'Kiegészítő pár (180°-os tükörkép) Elrejtése' : 'Kiegészítő trapéz Megjelenítése (Paralelogrammává formálás)'}
            </button>
          </div>

          {/* SVG Canvas */}
          <div className="bg-white dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-center overflow-x-auto min-h-[220px]">
            <svg
              viewBox={`-20 -25 ${wa + (showTwin ? wc + 40 : 50)} ${h + 55}`}
              className="w-full max-w-[480px] h-48 overflow-visible"
            >
              <defs>
                <linearGradient id="trapGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#059669" stopOpacity="0.35" />
                </linearGradient>
                <linearGradient id="twinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#818cf8" stopOpacity="0.25" />
                </linearGradient>
              </defs>

              {/* Primary Trapezoid */}
              <polygon
                points={`${pA.x},${pA.y} ${pB.x},${pB.y} ${pC.x},${pC.y} ${pD.x},${pD.y}`}
                fill="url(#trapGrad)"
                stroke="#059669"
                strokeWidth="2.5"
                strokeLinejoin="round"
              />

              {/* Midline k in primary */}
              <line
                x1={midM1.x}
                y1={midM1.y}
                x2={midM2.x}
                y2={midM2.y}
                stroke="#0d9488"
                strokeWidth="2"
                strokeDasharray="4 2"
              />

              {/* Twin trapezoid when showTwin is true */}
              {showTwin && (
                <>
                  <polygon
                    points={`${twinA.x},${twinA.y} ${twinB.x},${twinB.y} ${twinC.x},${twinC.y} ${twinD.x},${twinD.y}`}
                    fill="url(#twinGrad)"
                    stroke="#6366f1"
                    strokeWidth="2"
                    strokeDasharray="4 3"
                    strokeLinejoin="round"
                  />
                  {/* Top base continuation label */}
                  <line x1={pD.x} y1={-8} x2={twinC.x} y2={-8} stroke="#6366f1" strokeWidth="1.5" />
                  <text x={(pD.x + twinC.x) / 2} y={-13} textAnchor="middle" className="text-[10px] font-bold fill-indigo-600">
                    a + c = {baseA + baseC} cm (paralelogramma alapja)
                  </text>
                </>
              )}

              {/* Height line m */}
              <line
                x1={pD.x}
                y1={pD.y}
                x2={pD.x}
                y2={h}
                stroke="#e11d48"
                strokeWidth="2"
                strokeDasharray="4 3"
              />
              {/* Hungarian right angle marker at height foot (pD.x, h) */}
              <path
                d={`M ${pD.x + 11} ${h} A 11 11 0 0 0 ${pD.x} ${h - 11}`}
                fill="none"
                stroke="#e11d48"
                strokeWidth="1.5"
              />
              <circle cx={pD.x + 4} cy={h - 4} r="1.3" fill="#e11d48" />

              {/* Right trapezoid right angles at A(0, h) and D(0, 0) */}
              {trapezoidType === 'right' && (
                <>
                  <path d={`M 11 0 A 11 11 0 0 1 0 11`} fill="none" stroke="#059669" strokeWidth="1.5" />
                  <circle cx="4" cy="4" r="1.3" fill="#059669" />
                </>
              )}

              {/* Dimension Labels */}
              <text x={pD.x - 6} y={h / 2 + 3} textAnchor="end" className="text-[11px] font-bold fill-rose-600 dark:fill-rose-400">
                m = {heightM}
              </text>
              <text x={wa / 2} y={h + 16} textAnchor="middle" className="text-[11px] font-bold fill-slate-800 dark:fill-slate-200">
                a = {baseA} cm
              </text>
              <text x={(pD.x + pC.x) / 2} y={-8} textAnchor="middle" className="text-[11px] font-bold fill-slate-800 dark:fill-slate-200">
                c = {baseC} cm
              </text>
              <text x={(midM1.x + midM2.x) / 2} y={h / 2 - 4} textAnchor="middle" className="text-[10px] font-bold fill-teal-700 dark:fill-teal-300">
                k = {midLineK} cm
              </text>
            </svg>
          </div>

          {/* Real-time Calculation Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-emerald-50 dark:bg-emerald-950/40 p-4 rounded-xl border border-emerald-200 dark:border-emerald-800/60 text-center">
              <div className="text-xs font-bold text-emerald-800 dark:text-emerald-300 mb-1">
                KÖZÉPVONAL (k)
              </div>
              <div className="text-2xl font-black text-emerald-700 dark:text-emerald-400 font-mono">
                {midLineK} cm
              </div>
              <div className="text-[11px] text-emerald-600 dark:text-emerald-500 mt-1">
                k = ({baseA} + {baseC}) / 2 = {baseA + baseC} / 2
              </div>
            </div>

            <div className="bg-teal-50 dark:bg-teal-950/40 p-4 rounded-xl border border-teal-200 dark:border-teal-800/60 text-center">
              <div className="text-xs font-bold text-teal-800 dark:text-teal-300 mb-1">
                TRAPÉZ TERÜLETE (T)
              </div>
              <div className="text-3xl font-black text-teal-700 dark:text-teal-400 font-mono">
                {area} cm²
              </div>
              <div className="text-[11px] text-teal-600 dark:text-teal-500 mt-1 font-mono">
                T = {midLineK} · {heightM} = {area} cm²
              </div>
            </div>

            <div className="bg-indigo-50 dark:bg-indigo-950/40 p-4 rounded-xl border border-indigo-200 dark:border-indigo-800/60 text-center">
              <div className="text-xs font-bold text-indigo-800 dark:text-indigo-300 mb-1">
                PARALELOGRAMMA (2T)
              </div>
              <div className="text-2xl font-black text-indigo-700 dark:text-indigo-400 font-mono">
                {parallelogramArea} cm²
              </div>
              <div className="text-[11px] text-indigo-600 dark:text-indigo-500 mt-1">
                (a + c) · m = {baseA + baseC} · {heightM}
              </div>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 3. FEJEZET: Speciális trapézok */}
      <TheorySection
        title="3. Speciális trapézok: húrtrapéz és derékszögű trapéz"
        badge="SPECIÁLIS ESETEK"
        icon={<Layers className="w-5 h-5 text-emerald-600" />}
      >
        <GeometryFigureGrid columns={2}>
          {/* Húrtrapéz */}
          <GeometryFigureCard
            title="Húrtrapéz (szimmetrikus / egyenlő szárú trapéz)"
            badge="SZIMMETRIKUS"
            figure={
              <svg viewBox="0 0 200 130" className="w-full max-w-[220px] h-32 overflow-visible">
                {/* Symmetry axis */}
                <line x1="100" y1="10" x2="100" y2="120" stroke="#f59e0b" strokeWidth="1.8" strokeDasharray="4 2" />
                <text x="105" y="18" className="text-[8px] font-bold fill-amber-600">t</text>

                {/* Trapezoid */}
                <polygon
                  points="25,105 175,105 140,30 60,30"
                  fill="rgba(16, 185, 129, 0.12)"
                  stroke="#059669"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                />

                {/* Equal leg markers (ticks) */}
                <line x1="39" y1="65" x2="47" y2="69" stroke="#059669" strokeWidth="2" />
                <line x1="153" y1="69" x2="161" y2="65" stroke="#059669" strokeWidth="2" />

                {/* Base angle arcs */}
                <path d="M 45 105 A 20 20 0 0 0 35 88" fill="none" stroke="#6366f1" strokeWidth="1.8" />
                <path d="M 165 88 A 20 20 0 0 0 155 105" fill="none" stroke="#6366f1" strokeWidth="1.8" />
                <text x="48" y="98" className="text-[9px] font-bold fill-indigo-600">α</text>
                <text x="146" y="98" className="text-[9px] font-bold fill-indigo-600">α</text>

                {/* Labels */}
                <text x="100" y="119" textAnchor="middle" className="text-[10px] font-bold fill-slate-800 dark:fill-slate-100">
                  a
                </text>
                <text x="100" y="24" textAnchor="middle" className="text-[10px] font-bold fill-slate-800 dark:fill-slate-100">
                  c
                </text>
                <text x="32" y="60" textAnchor="end" className="text-[10px] font-bold fill-emerald-700">
                  b
                </text>
                <text x="168" y="60" className="text-[10px] font-bold fill-emerald-700">
                  b
                </text>
              </svg>
            }
            properties={[
              { label: 'Szárak', value: 'Egyenlő hosszúak (b = d)' },
              { label: 'Szögek', value: 'Alapon fekvők egyenlők (α = β)' },
              { label: 'Szimmetria', value: '1 tengely (alapok felezőmerőlegese)' },
              { label: 'Átlók', value: 'Egyenlő hosszúak (e = f)' }
            ]}
          />

          {/* Derékszögű trapéz */}
          <GeometryFigureCard
            title="Derékszögű trapéz"
            badge="90°-OS SZÁR"
            figure={
              <svg viewBox="0 0 200 130" className="w-full max-w-[220px] h-32 overflow-visible">
                {/* Trapezoid */}
                <polygon
                  points="35,105 175,105 125,30 35,30"
                  fill="rgba(14, 165, 233, 0.12)"
                  stroke="#0284c7"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                />

                {/* Right angle at (35, 105) - Hungarian standard arc + dot */}
                <path d="M 50 105 A 15 15 0 0 0 35 90" fill="none" stroke="#e11d48" strokeWidth="1.5" />
                <circle cx="41" cy="99" r="1.5" fill="#e11d48" />

                {/* Right angle at (35, 30) - Hungarian standard arc + dot */}
                <path d="M 50 30 A 15 15 0 0 1 35 45" fill="none" stroke="#e11d48" strokeWidth="1.5" />
                <circle cx="41" cy="36" r="1.5" fill="#e11d48" />

                {/* Labels */}
                <text x="105" y="119" textAnchor="middle" className="text-[10px] font-bold fill-slate-800 dark:fill-slate-100">
                  a (alsó alap)
                </text>
                <text x="80" y="24" textAnchor="middle" className="text-[10px] font-bold fill-slate-800 dark:fill-slate-100">
                  c (felső alap)
                </text>
                <text x="25" y="70" textAnchor="end" className="text-[10px] font-black fill-rose-600 dark:fill-rose-400">
                  d = m
                </text>
                <text x="156" y="65" className="text-[10px] font-bold fill-slate-600 dark:fill-slate-400">
                  b (ferde szár)
                </text>
              </svg>
            }
            properties={[
              { label: 'Derékszögek', value: 'Pontosan 2 derékszöge van' },
              { label: 'Merőleges szár', value: 'Egybeesik a magassággal (d = m)' },
              { label: 'Területképlet', value: 'T = ((a + c) / 2) · d' },
              { label: 'Ferde szár', value: 'Mindig hosszabb a magasságnál (b > m)' }
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
          <TheoryTrapBox title="1. CSAPDA: A ferde szárat szorozzuk be a magasság helyett">
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-2">
              Sokan tévesen a szár hosszát (<MathText size="sm">{'b'}</MathText> vagy <MathText size="sm">{'d'}</MathText>) 
              helyettesítik be az <MathText size="sm">{'m'}</MathText> helyére.
            </p>
            <div className="bg-white/80 dark:bg-slate-900/80 p-2.5 rounded-lg border border-rose-200 dark:border-rose-900/50 text-xs font-mono">
              <span className="text-rose-600 font-bold">❌ HIBÁS:</span> T = ((a + c) / 2) · b<br />
              <span className="text-emerald-600 font-bold">✔ HELYES:</span> Mindig a merőleges magasság (m) kell!
            </div>
          </TheoryTrapBox>

          <TheoryTrapBox title="2. CSAPDA: A középvonalnál elfelejtünk osztani 2-vel">
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-2">
              A középvonal a két alap <strong>számtani közepe</strong> (átlaga), azaz az összegük fele!
            </p>
            <div className="bg-white/80 dark:bg-slate-900/80 p-2.5 rounded-lg border border-rose-200 dark:border-rose-900/50 text-xs font-mono">
              <span className="text-rose-600 font-bold">❌ HIBÁS:</span> k = a + c (ez a két alap összege)<br />
              <span className="text-emerald-600 font-bold">✔ HELYES:</span> k = (a + c) / 2 (átlag!)
            </div>
          </TheoryTrapBox>

          <TheoryTrapBox title="3. CSAPDA: Visszaszámolásnál a 2-es szorzó elfelejtése">
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-2">
              Ha adott a terület és keresett a magasság vagy valamelyik alap:
            </p>
            <div className="bg-white/80 dark:bg-slate-900/80 p-2.5 rounded-lg border border-emerald-200 dark:border-emerald-900/50 text-xs font-mono">
              <span className="text-indigo-600 font-bold">💡 SZABÁLY:</span> 2 · T = (a + c) · m<br />
              m = (2 · T) / (a + c) &nbsp;|&nbsp; a + c = (2 · T) / m
            </div>
          </TheoryTrapBox>

          <TheoryTrapBox title="4. CSAPDA: Derékszögű trapéz magassága">
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-2">
              Derékszögű trapézban nem kell külön magasságvonalat szerkeszteni vagy keresni:
            </p>
            <div className="bg-white/80 dark:bg-slate-900/80 p-2.5 rounded-lg border border-teal-200 dark:border-teal-900/50 text-xs font-mono">
              <span className="text-teal-700 font-bold">✔ MEGFIGYELÉS:</span> A két derékszöget határoló szár maga a magasság (d = m)!
            </div>
          </TheoryTrapBox>
        </div>
      </TheorySection>

      {/* 5. FEJEZET: Kidolgozott mintapéldák & Gyakorlás */}
      <TheorySection
        title="5. Kidolgozott mintapéldák és azonnali önellenőrzés"
        badge="MINTAPÉLDÁK"
        icon={<Calculator className="w-5 h-5 text-emerald-600" />}
      >
        <div className="space-y-4">
          {/* Példa 1 */}
          <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex justify-between items-start">
              <h5 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                1. Mintapélda: Trapéz területe alapokból és magasságból
              </h5>
              <span className="text-xs font-mono bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded">
                Alapszint
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Egy trapéz párhuzamos oldalai <MathText size="sm">{'a = 14\\text{ cm}'}</MathText> és{' '}
              <MathText size="sm">{'c = 8\\text{ cm}'}</MathText>, magassága pedig{' '}
              <MathText size="sm">{'m = 6\\text{ cm}'}</MathText>. Számítsd ki a területét!
            </p>
            <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-lg text-xs font-mono text-slate-800 dark:text-slate-200 space-y-1">
              <div>1. Középvonal: k = (a + c) / 2 = (14 + 8) / 2 = 22 / 2 = 11 cm</div>
              <div>2. Terület: T = k · m = 11 · 6 = <strong>66 cm²</strong></div>
            </div>
          </div>

          {/* Példa 2 */}
          <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex justify-between items-start">
              <h5 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                2. Mintapélda: Magasság visszaszámolása a területből
              </h5>
              <span className="text-xs font-mono bg-teal-100 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 px-2 py-0.5 rounded">
                Középszint
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Egy trapéz területe <MathText size="sm">{'T = 80\\text{ cm}^2'}</MathText>, párhuzamos oldalai{' '}
              <MathText size="sm">{'a = 12\\text{ cm}'}</MathText> és <MathText size="sm">{'c = 8\\text{ cm}'}</MathText>. 
              Mekkora a trapéz magassága?
            </p>
            <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-lg text-xs font-mono text-slate-800 dark:text-slate-200 space-y-1">
              <div>1. Az alapok összege: a + c = 12 + 8 = 20 cm  (vagy k = 10 cm)</div>
              <div>2. A képletből: 2 · T = (a + c) · m ⟹ 160 = 20 · m</div>
              <div>3. m = 160 / 20 = <strong>8 cm</strong></div>
            </div>
          </div>

          {/* Példa 3 */}
          <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <div className="flex justify-between items-start">
              <h5 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                3. Mintapélda: Derékszögű trapéz hiányzó alapja
              </h5>
              <span className="text-xs font-mono bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 px-2 py-0.5 rounded">
                Haladó
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Egy derékszögű trapéz területe <MathText size="sm">{'T = 45\\text{ cm}^2'}</MathText>, merőleges szára{' '}
              <MathText size="sm">{'d = 5\\text{ cm}'}</MathText>, hosszabb alapja <MathText size="sm">{'a = 11\\text{ cm}'}</MathText>. 
              Mekkora a rövidebb alapja (<MathText size="sm">{'c'}</MathText>)?
            </p>
            <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-lg text-xs font-mono text-slate-800 dark:text-slate-200 space-y-1">
              <div>1. Mivel derékszögű a trapéz, a merőleges szár a magasság: m = d = 5 cm</div>
              <div>2. Középvonal: k = T / m = 45 / 5 = 9 cm</div>
              <div>3. Alapok összege: a + c = 2 · k = 18 cm ⟹ 11 + c = 18 ⟹ c = <strong>7 cm</strong></div>
            </div>
          </div>
        </div>

        {/* Gyakorló önellenőrző doboz */}
        <div className="mt-6 p-5 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-300/60 dark:border-emerald-800 space-y-4">
          <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-emerald-600" />
            Önellenőrző mini-teszt: Számold ki és ellenőrizd!
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Task 1 */}
            <div className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
              <p className="text-xs text-slate-700 dark:text-slate-300">
                1. Egy trapéz középvonala <MathText size="sm">{'k = 12\\text{ cm}'}</MathText>, magassága{' '}
                <MathText size="sm">{'m = 7\\text{ cm}'}</MathText>. Mennyi a területe (cm²)?
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
                  onClick={() => handleCheck('p1', 84)}
                  className="px-3 py-1 bg-emerald-600 text-white rounded text-xs font-bold hover:bg-emerald-700 transition"
                >
                  Ellenőrzés
                </button>
                {checkedResults['p1'] === true && (
                  <span className="text-emerald-600 text-xs font-bold flex items-center gap-1">
                    <Check className="w-4 h-4" /> Helyes! (12 · 7 = 84 cm²)
                  </span>
                )}
                {checkedResults['p1'] === false && (
                  <span className="text-rose-600 text-xs font-bold flex items-center gap-1">
                    <X className="w-4 h-4" /> Újra! (T = k · m)
                  </span>
                )}
              </div>
            </div>

            {/* Task 2 */}
            <div className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
              <p className="text-xs text-slate-700 dark:text-slate-300">
                2. Trapéz: <MathText size="sm">{'a = 15\\text{ cm}'}</MathText>, <MathText size="sm">{'c = 5\\text{ cm}'}</MathText>,{' '}
                <MathText size="sm">{'T = 50\\text{ cm}^2'}</MathText>. Mekkora a magasság <MathText size="sm">{'m'}</MathText> (cm)?
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
                  onClick={() => handleCheck('p2', 5)}
                  className="px-3 py-1 bg-emerald-600 text-white rounded text-xs font-bold hover:bg-emerald-700 transition"
                >
                  Ellenőrzés
                </button>
                {checkedResults['p2'] === true && (
                  <span className="text-emerald-600 text-xs font-bold flex items-center gap-1">
                    <Check className="w-4 h-4" /> Helyes! (k = 10 ⟹ m = 50/10 = 5)
                  </span>
                )}
                {checkedResults['p2'] === false && (
                  <span className="text-rose-600 text-xs font-bold flex items-center gap-1">
                    <X className="w-4 h-4" /> Újra! (m = 2T / (a+c))
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
