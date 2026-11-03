import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryTrapBox,
  TheoryTable
} from '../TheoryTemplate';
import {
  AboveBelowConceptSvg,
  IntervalBracketsSvg,
  AbsDistanceInequalitySvg
} from './InequalityFigures';
import {
  Sparkles,
  BookOpen,
  Sliders,
  AlertTriangle,
  Layers,
  Scale,
  CheckCircle2
} from 'lucide-react';

export interface InequalityTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

interface IneqPreset {
  id: string;
  name: string;
  ineqStr: string;
  fStr: string;
  gStr: string;
  relation: '<' | '<=' | '>' | '>=';
  boundaries: number[];
  solutionStr: string;
  isClosed: boolean;
  explanation: string;
  fFn: (x: number) => number;
  gFn: (x: number) => number;
  domainMin: number;
  domainMax: number;
}

const PRESETS: IneqPreset[] = [
  {
    id: 'quad-inner',
    name: 'Másodfokú belső szakasz (x² ≤ 4)',
    ineqStr: 'x² ≤ 4',
    fStr: 'f(x) = x²',
    gStr: 'g(x) = 4',
    relation: '<=',
    boundaries: [-2, 2],
    solutionStr: 'x ∈ [-2; 2]',
    isClosed: true,
    explanation: 'Azt keressük, ahol az f(x) = x² parabola a g(x) = 4 vízszintes egyenes ALATT halad vagy metszi azt. A két metszéspont x = -2 és x = 2. Mivel megengedő (≤) a reláció, a határok is részei a megoldásnak: [-2; 2].',
    fFn: (x: number) => x * x,
    gFn: () => 4,
    domainMin: -4,
    domainMax: 4
  },
  {
    id: 'quad-outer',
    name: 'Parabola az egyenes felett (x² > x + 2)',
    ineqStr: 'x² > x + 2',
    fStr: 'f(x) = x²',
    gStr: 'g(x) = x + 2',
    relation: '>',
    boundaries: [-1, 2],
    solutionStr: 'x ∈ ]-∞; -1[ ∪ ]2; ∞[',
    isClosed: false,
    explanation: 'Ahol a parabola az egyenes FELETT fut. A metszéspontok x = -1 és x = 2. A parabola a két metszésponton KÍVÜL van magasabban, így a megoldáshalmaz két nyílt félegyenes uniója.',
    fFn: (x: number) => x * x,
    gFn: (x: number) => x + 2,
    domainMin: -3,
    domainMax: 4
  },
  {
    id: 'abs-inner',
    name: 'Abszolútérték belső tartomány (|x - 1| < 3)',
    ineqStr: '|x - 1| < 3',
    fStr: 'f(x) = |x - 1|',
    gStr: 'g(x) = 3',
    relation: '<',
    boundaries: [-2, 4],
    solutionStr: 'x ∈ ]-2; 4[',
    isClosed: false,
    explanation: 'Geometriai jelentés: az x távolsága az 1-től kisebb, mint 3 egység. 1 - 3 = -2 és 1 + 3 = 4. Szigorú reláció miatt nyílt intervallum: ]-2; 4[.',
    fFn: (x: number) => Math.abs(x - 1),
    gFn: () => 3,
    domainMin: -4,
    domainMax: 6
  },
  {
    id: 'abs-outer',
    name: 'Abszolútérték külső ágak (|x + 2| ≥ 3)',
    ineqStr: '|x + 2| ≥ 3',
    fStr: 'f(x) = |x + 2|',
    gStr: 'g(x) = 3',
    relation: '>=',
    boundaries: [-5, 1],
    solutionStr: 'x ∈ ]-∞; -5] ∪ [1; ∞[',
    isClosed: true,
    explanation: 'A -2 ponttól mért távolság legalább 3 egység. -2 - 3 = -5 és -2 + 3 = 1. A két külső zárt félegyenes: ]-∞; -5] ∪ [1; ∞[.',
    fFn: (x: number) => Math.abs(x + 2),
    gFn: () => 3,
    domainMin: -7,
    domainMax: 3
  },
  {
    id: 'zero-above',
    name: 'Nulla feletti szakasz (-x² + 4x - 3 ≥ 0)',
    ineqStr: '-x² + 4x - 3 ≥ 0',
    fStr: 'f(x) = -x² + 4x - 3',
    gStr: 'g(x) = 0',
    relation: '>=',
    boundaries: [1, 3],
    solutionStr: 'x ∈ [1; 3]',
    isClosed: true,
    explanation: 'Lefelé nyíló parabola zérushelyei x = 1 és x = 3. A csúcs C(2; 1) az x-tengely felett van, így a két zérushely között a függvényérték pozitív vagy nulla: [1; 3].',
    fFn: (x: number) => -x * x + 4 * x - 3,
    gFn: () => 0,
    domainMin: 0,
    domainMax: 4
  },
  {
    id: 'always-true',
    name: 'Minden valós számra igaz (x² + 1 > 0)',
    ineqStr: 'x² + 1 > 0',
    fStr: 'f(x) = x² + 1',
    gStr: 'g(x) = 0',
    relation: '>',
    boundaries: [],
    solutionStr: 'x ∈ ℝ (minden valós szám)',
    isClosed: false,
    explanation: 'Mivel x² ≥ 0, az x² + 1 legalább 1, grafikonja teljes egészében az x-tengely (y = 0) felett lebeg. Nincs metszéspont, a reláció minden x-re teljesül.',
    fFn: (x: number) => x * x + 1,
    gFn: () => 0,
    domainMin: -3,
    domainMax: 3
  }
];

export const InequalityTheory: React.FC<InequalityTheoryProps> = ({
  onBack,
  onStartQuiz,
}) => {
  const [selectedId, setSelectedId] = useState<string>('quad-inner');
  const preset = PRESETS.find(p => p.id === selectedId) || PRESETS[0];

  const svgWidth = 460;
  const svgHeight = 280;
  const minX = preset.domainMin;
  const maxX = preset.domainMax;
  const minY = -2;
  const maxY = 6;

  const toSvgX = (x: number) => {
    return 40 + ((x - minX) / (maxX - minX)) * (svgWidth - 80);
  };

  const toSvgY = (y: number) => {
    return svgHeight - 40 - ((y - minY) / (maxY - minY)) * (svgHeight - 80);
  };

  const zeroAxisX = toSvgX(0);
  const zeroAxisY = toSvgY(0);

  const numSteps = 80;
  const stepSize = (maxX - minX) / numSteps;

  const fPath = (() => {
    let d = '';
    for (let i = 0; i <= numSteps; i++) {
      const x = minX + i * stepSize;
      const y = preset.fFn(x);
      const sx = toSvgX(x);
      const sy = toSvgY(y);
      if (i === 0) d += `M ${sx} ${sy}`;
      else d += ` L ${sx} ${sy}`;
    }
    return d;
  })();

  const gPath = (() => {
    const x1 = minX;
    const y1 = preset.gFn(x1);
    const x2 = maxX;
    const y2 = preset.gFn(x2);
    return `M ${toSvgX(x1)} ${toSvgY(y1)} L ${toSvgX(x2)} ${toSvgY(y2)}`;
  })();

  return (
    <TheoryTemplate
      title="16. Egyenlőtlenségek grafikus megoldása"
      subtitle="Függvények egymáshoz képesti elhelyezkedése: 'alatta' és 'felette' zónák, intervallumok és zárójelek"
      badge="9. OSZTÁLY • V. FÜGGVÉNYEK"
      topicBadge="9. OSZTÁLY • V. FÜGGVÉNYEK • 16. EGYENLŐTLENSÉGEK"
      themeColor="amber"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      onSwitchToQuiz={onStartQuiz}
      quickRule={{
        label: "Az Egyenlőtlenségek Grafikus Szabálya",
        formula: "f(x) < g(x) ➔ Hol fut f(x) a g(x) ALATT? | Szigorú (<, >): ]a; b[ | Megengedő (≤, ≥): [a; b]",
        align: "center"
      }}
      practiceTitle="Készen állsz az intervallumok és egyenlőtlenségek tesztelésére?"
      practiceSubtitle="30 gondosan felépített feladat vár 3 szinten: a 'melyik van felül' elvtől az abszolútértékes és másodfokú zónákig"
      practiceButtonText="Gyakorló Kvíz Indítása"
    >
      {/* =========================================================================
          1. SZEKCIÓ: ÁTTEKINTÉS ÉS ALAPELVEK
      ========================================================================= */}
      <TheorySection
        title="1. A Grafikus Egyenlőtlenség Alapelve"
        subtitle="Hogyan olvassuk le a grafikonról, hogy melyik görbe halad magasabban?"
        icon={<Scale className="w-6 h-6 text-amber-500" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 flex flex-col items-center text-center shadow-xs">
            <AboveBelowConceptSvg size={240} className="mb-2" />
            <h4 className="text-sm font-bold text-amber-700 dark:text-amber-300">„Alatta” és „Felette”</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              $f(x) &lt; g(x)$ azt jelenti: hol halad az $f$ görbéje a $g$ alatt. A megoldás egy vagy több $x$-intervallum.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 flex flex-col items-center text-center shadow-xs">
            <IntervalBracketsSvg size={240} className="mb-2" />
            <h4 className="text-sm font-bold text-emerald-700 dark:text-emerald-300">Zárójelek Szigora</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              Megengedő ($\le, \ge$) jelnél zárt $[a; b]$ (teli pont), szigorú ($&lt;, &gt;$) jelnél nyílt $]a; b[$ (üres karika).
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 flex flex-col items-center text-center shadow-xs">
            <AbsDistanceInequalitySvg size={240} className="mb-2" />
            <h4 className="text-sm font-bold text-sky-700 dark:text-sky-300">Távolsági Szemlélet</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              $|x - u| \le d$ az $u$ körüli belső szakaszt adja ($[u-d; u+d]$), míg $|x - u| &gt; d$ a két külső félegyenest.
            </p>
          </div>
        </div>
      </TheorySection>

      {/* =========================================================================
          2. SZEKCIÓ: INTERAKTÍV EGYENLŐTLENSÉG SZIMULÁTOR
      ========================================================================= */}
      <TheorySection
        title="2. Interaktív Egyenlőtlenség Szimulátor"
        subtitle="Válassz feladványt, figyeld a színezett sávokat az x-tengelyen és a pontos intervallumos lejegyzést!"
        icon={<Sliders className="w-6 h-6 text-amber-500" />}
      >
        <div className="bg-slate-900 p-5 sm:p-6 rounded-2xl border border-slate-700 shadow-md space-y-6">
          <div>
            <label className="text-xs uppercase text-slate-400 font-bold tracking-wider block mb-2">
              Válassz egyenlőtlenség-típust:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {PRESETS.map(p => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setSelectedId(p.id)}
                  className={`p-2.5 rounded-xl text-left border text-xs font-semibold transition-all ${
                    selectedId === p.id
                      ? 'bg-amber-600 text-white border-amber-400 shadow-md'
                      : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-750 hover:text-white'
                  }`}
                >
                  <div className="truncate font-bold">{p.name}</div>
                  <div className="text-[11px] opacity-80 font-mono mt-0.5">{p.ineqStr}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* SVG grafikon */}
            <div className="lg:col-span-7 bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col items-center justify-center">
              <svg
                viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                className="w-full h-auto max-h-[300px] select-none"
              >
                {/* Rács finom vonalai */}
                {Array.from({ length: maxX - minX + 1 }).map((_, i) => {
                  const xVal = minX + i;
                  return (
                    <line
                      key={`grid-ineq-${xVal}`}
                      x1={toSvgX(xVal)}
                      y1={30}
                      x2={toSvgX(xVal)}
                      y2={svgHeight - 30}
                      stroke="#1e293b"
                      strokeWidth="1"
                    />
                  );
                })}

                {/* Megoldássáv háttérkiemelése az x-tengely mentén */}
                {preset.boundaries.length === 2 && (
                  preset.id === 'quad-inner' || preset.id === 'abs-inner' || preset.id === 'zero-above' ? (
                    <rect
                      x={toSvgX(preset.boundaries[0])}
                      y={30}
                      width={toSvgX(preset.boundaries[1]) - toSvgX(preset.boundaries[0])}
                      height={svgHeight - 60}
                      fill="#10b981"
                      fillOpacity="0.12"
                    />
                  ) : (
                    <>
                      <rect
                        x={30}
                        y={30}
                        width={Math.max(0, toSvgX(preset.boundaries[0]) - 30)}
                        height={svgHeight - 60}
                        fill="#f59e0b"
                        fillOpacity="0.1"
                      />
                      <rect
                        x={toSvgX(preset.boundaries[1])}
                        y={30}
                        width={Math.max(0, svgWidth - 30 - toSvgX(preset.boundaries[1]))}
                        height={svgHeight - 60}
                        fill="#f59e0b"
                        fillOpacity="0.1"
                      />
                    </>
                  )
                )}

                {/* Tengelyek */}
                <line x1={30} y1={zeroAxisY} x2={svgWidth - 30} y2={zeroAxisY} stroke="#475569" strokeWidth="1.5" />
                <line x1={zeroAxisX} y1={svgHeight - 30} x2={zeroAxisX} y2="30" stroke="#475569" strokeWidth="1.5" />
                <text x={svgWidth - 25} y={zeroAxisY + 4} fill="#94a3b8" fontSize="11" fontWeight="bold">x</text>
                <text x={zeroAxisX - 6} y="22" fill="#94a3b8" fontSize="11" fontWeight="bold" textAnchor="middle">y</text>

                {/* f(x) görbe */}
                <path
                  d={fPath}
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                />

                {/* g(x) görbe / egyenes */}
                <path
                  d={gPath}
                  fill="none"
                  stroke="#fbbf24"
                  strokeWidth="3"
                  strokeLinecap="round"
                />

                {/* Határpontok levetítése */}
                {preset.boundaries.map((bx, idx) => {
                  const sx = toSvgX(bx);
                  const sy = toSvgY(preset.fFn(bx));
                  return (
                    <g key={`bnd-${idx}`}>
                      <line
                        x1={sx}
                        y1={sy}
                        x2={sx}
                        y2={zeroAxisY}
                        stroke="#10b981"
                        strokeWidth="1.5"
                        strokeDasharray="3 3"
                      />
                      <circle
                        cx={sx}
                        cy={sy}
                        r="5"
                        fill={preset.isClosed ? '#10b981' : '#0f172a'}
                        stroke="#10b981"
                        strokeWidth="2"
                      />
                      <circle
                        cx={sx}
                        cy={zeroAxisY}
                        r="4.5"
                        fill={preset.isClosed ? '#10b981' : '#0f172a'}
                        stroke="#10b981"
                        strokeWidth="2"
                      />
                      <text
                        x={sx}
                        y={zeroAxisY + 16}
                        fill="#34d399"
                        fontSize="11"
                        fontWeight="bold"
                        textAnchor="middle"
                      >
                        {bx}
                      </text>
                    </g>
                  );
                })}
              </svg>

              <div className="flex items-center gap-6 text-xs text-slate-300 mt-2 font-medium">
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-sky-400 inline-block" /> {preset.fStr}
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" /> {preset.gStr}
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" /> Megoldástartomány
                </span>
              </div>
            </div>

            {/* Elemző panel */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700/60 space-y-1">
                <span className="text-xs uppercase text-slate-400 font-semibold tracking-wider">Megoldandó egyenlőtlenség</span>
                <div className="text-xl font-bold text-amber-300 font-mono">{preset.ineqStr}</div>
              </div>

              <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700 space-y-2 text-xs">
                <div className="flex justify-between items-center pb-2 border-b border-slate-700">
                  <span className="text-slate-400">Reláció jellege:</span>
                  <span className="font-bold text-slate-200">
                    {preset.isClosed ? 'Megengedő (zárt határok: ≤, ≥)' : 'Szigorú (nyílt határok: <, >)'}
                  </span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-slate-700">
                  <span className="text-slate-400">Megoldáshalmaz:</span>
                  <span className="font-bold text-emerald-400 text-sm font-mono">
                    {preset.solutionStr}
                  </span>
                </div>
                <p className="text-slate-300 leading-relaxed pt-1">
                  {preset.explanation}
                </p>
              </div>

              <div className="bg-amber-950/40 border border-amber-500/30 p-3.5 rounded-xl text-xs text-slate-300 leading-relaxed">
                <strong className="text-amber-300 block mb-1">Módszertani kulcs:</strong>
                Mindig a két grafikon metszéspontjait keressük meg először ($f(x) = g(x)$), majd a relációjel iránya dönti el, hogy a két metszéspont <strong>közötti belső szakaszt</strong>, vagy a <strong>két külső ágat</strong> kell-e felírni intervallumként!
              </div>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* =========================================================================
          3. SZEKCIÓ: A MEGOLDÁS LÉPÉSEI ÉS INTERVALLUMJELÖLÉSEK
      ========================================================================= */}
      <TheorySection
        title="3. Zárójelek és Intervallumok Szabályai"
        subtitle="Mikor szögletes és mikor kerek? A magyar középiskolai és érettségi jelölésrendszer"
        icon={<BookOpen className="w-6 h-6 text-amber-500" />}
      >
        <TheoryCard
          title="Zárt és Nyílt Intervallumok Használata"
          icon={<CheckCircle2 className="w-5 h-5 text-amber-500" />}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs leading-relaxed text-slate-700 dark:text-slate-300">
            <div className="p-4 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl border border-emerald-200 dark:border-emerald-900/50 space-y-2">
              <span className="text-emerald-800 dark:text-emerald-300 font-bold block text-sm">
                Zárt intervallum: $[a; b]$ (Megengedő: $\le, \ge$)
              </span>
              <p>
                A határértékek maguk is kielégítik az egyenlőtlenséget, mert az egyenlőség megengedett.
              </p>
              <ul className="list-disc pl-4 space-y-1 font-mono text-emerald-800 dark:text-emerald-300">
                <li>$x^2 \le 9 \implies x \in [-3; 3]$</li>
                <li>Grafikonon: <strong>teli karika</strong> a metszésponton.</li>
                <li>Zárójel: <strong>befelé forduló szögletes</strong> zárójel.</li>
              </ul>
            </div>

            <div className="p-4 bg-amber-50 dark:bg-amber-950/30 rounded-xl border border-amber-200 dark:border-amber-900/50 space-y-2">
              <span className="text-amber-800 dark:text-amber-300 font-bold block text-sm">
                Nyílt intervallum: $]a; b[$ (Szigorú: $&lt;, &gt;$)
              </span>
              <p>
                A metszéspontban a két függvény értéke egyenlő, ami a szigorú egyenlőtlenséget NEM elégíti ki, így a határokat ki kell zárni!
              </p>
              <ul className="list-disc pl-4 space-y-1 font-mono text-amber-800 dark:text-amber-300">
                <li>$x^2 &lt; 9 \implies x \in ]-3; 3[$</li>
                <li>Grafikonon: <strong>üres karika</strong> a metszésponton.</li>
                <li>Zárójel: <strong>kifelé forduló szögletes</strong> zárójel (magyar szabvány).</li>
              </ul>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* =========================================================================
          4. SZEKCIÓ: TIPIKUS VIZSGACSAPDÁK
      ========================================================================= */}
      <TheorySection
        title="4. Tipikus Érettségi Vizsgacsapdák"
        subtitle="A leggyakoribb figyelmetlenségek, amikért pontlevonás jár"
        icon={<AlertTriangle className="w-6 h-6 text-amber-500" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryTrapBox
            title="1. Relációjel megfordítása negatív számmal szorzáskor"
            trap="Algebrai átrendezésnél elfelejtik megfordítani a relációjelet: -2x < 6 ⟹ x < -3."
            solution="Ha negatív számmal osztunk vagy szorzunk, a reláció iránya megfordul: -2x < 6 ⟹ x > -3! A grafikonon ez azonnal látható."
          />
          <TheoryTrapBox
            title="2. Zárt zárójel szigorú egyenlőtlenségnél"
            trap="Az x² < 4 megoldására az [ -2; 2 ] intervallumot írják fel."
            solution="Mivel nincs egyenlőségjel (< és nem ≤), a határpontokban x² = 4, ami nem kisebb 4-nél! Helyesen: ]-2; 2[!"
          />
          <TheoryTrapBox
            title="3. Külső ágak uniójának téves összekötése"
            trap="Az x² > 4 megoldását egyetlen összefüggő sávként írják fel: 2 < x < -2."
            solution="Ilyen szám nem létezik! Két különálló nyílt félegyenesről van szó: x ∈ ]-∞; -2[ ∪ ]2; ∞[!"
          />
          <TheoryTrapBox
            title="4. Negatív jobb oldalú abszolútértékes egyenlőtlenség"
            trap="A |x - 3| < -2 egyenlőtlenségnél elkezdenek számolni két esettel."
            solution="Az abszolútérték mindig nemnegatív (≥ 0), így sosem lehet kisebb egy negatív számnál! Azonnal: M = ∅."
          />
        </div>
      </TheorySection>

      {/* =========================================================================
          5. SZEKCIÓ: INTERVALLUM ÉS RELÁCIÓ NAGYTÁBLÁZAT
      ========================================================================= */}
      <TheorySection
        title="5. Relációk és Megoldáshalmazok Nagytáblázat"
        subtitle="Minden egyenlőtlenségtípus geometriai és algebrai megfeleltetése"
        icon={<Layers className="w-6 h-6 text-amber-500" />}
      >
        <TheoryTable
          headers={['Egyenlőtlenség', 'Geometriai feltétel', 'Pont típusa', 'Megoldás intervalluma']}
          rows={[
            ['f(x) < g(x)', 'f görbéje a g alatt fut', 'Üres karika (nyílt)', 'x ∈ ]a; b['],
            ['f(x) ≤ g(x)', 'f görbéje a g alatt fut vagy metszi', 'Teli pont (zárt)', 'x ∈ [a; b]'],
            ['f(x) > g(x)', 'f görbéje a g felett fut', 'Üres karika (nyílt)', 'x ∈ ]-∞; a[ ∪ ]b; ∞['],
            ['f(x) ≥ g(x)', 'f görbéje a g felett fut vagy metszi', 'Teli pont (zárt)', 'x ∈ ]-∞; a] ∪ [b; ∞['],
            ['|x - u| ≤ d', 'x távolsága u-tól legfeljebb d', 'Zárt belső szakasz', 'x ∈ [u - d; u + d]'],
            ['|x - u| > d', 'x távolsága u-tól nagyobb d-nél', 'Nyílt külső ágak', 'x ∈ ]-∞; u - d[ ∪ ]u + d; ∞[']
          ]}
        />
      </TheorySection>
    </TheoryTemplate>
  );
};
