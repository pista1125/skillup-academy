import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable
} from '../TheoryTemplate';
import {
  ExtremaConceptSvg,
  IntervalExtremaSvg,
  VertexFormulaSvg
} from './ExtremaFigures';
import {
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  Compass,
  Target,
  Layers,
  Sliders,
  Scale,
  BookOpen,
  ArrowRight
} from 'lucide-react';

export interface ExtremaTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

interface PresetFunction {
  id: string;
  name: string;
  formula: string;
  domainStr: string;
  rangeStr: string;
  extremaType: 'minimum' | 'maximum' | 'both' | 'none';
  xExtrema: number[]; // places
  yExtrema: number[]; // values
  desc: string;
  evalFn: (x: number) => number;
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
}

const PRESETS: PresetFunction[] = [
  {
    id: 'parabola-min',
    name: 'Felfelé nyíló parabola',
    formula: 'f(x) = (x - 2)² - 3',
    domainStr: 'x ∈ ℝ',
    rangeStr: 'y ∈ [-3; ∞[',
    extremaType: 'minimum',
    xExtrema: [2],
    yExtrema: [-3],
    desc: 'Mivel a négyzetes tag (x - 2)² soha nem negatív (≥ 0), a legkisebb értékét akkor veszi fel, amikor a négyzet alapja 0, azaz x = 2. Itt az érték y = -3. Felfelé nincs határa, így maximuma nincs.',
    evalFn: (x: number) => Math.pow(x - 2, 2) - 3,
    minX: -2,
    maxX: 6,
    minY: -4,
    maxY: 8,
  },
  {
    id: 'parabola-max',
    name: 'Lefelé nyíló parabola',
    formula: 'g(x) = -(x + 1)² + 4',
    domainStr: 'x ∈ ℝ',
    rangeStr: 'y ∈ ]-∞; 4]',
    extremaType: 'maximum',
    xExtrema: [-1],
    yExtrema: [4],
    desc: 'A negatív előjel miatt -(x + 1)² ≤ 0. A legnagyobb értéket a zárójel 0-vá válásakor éri el: x = -1 esetén az érték 4. Lefelé a végtelenbe csökken, így minimuma nincs.',
    evalFn: (x: number) => -Math.pow(x + 1, 2) + 4,
    minX: -5,
    maxX: 3,
    minY: -6,
    maxY: 6,
  },
  {
    id: 'abs-min',
    name: 'Abszolútérték-völgy',
    formula: 'h(x) = 2|x - 3| - 1',
    domainStr: 'x ∈ ℝ',
    rangeStr: 'y ∈ [-1; ∞[',
    extremaType: 'minimum',
    xExtrema: [3],
    yExtrema: [-1],
    desc: 'Az abszolútérték csúcspontja (völgye) x = 3-ban van. Ekkor |3 - 3| = 0, a függvény értéke -1. Ez a globális minimum.',
    evalFn: (x: number) => 2 * Math.abs(x - 3) - 1,
    minX: -1,
    maxX: 7,
    minY: -2,
    maxY: 8,
  },
  {
    id: 'abs-max',
    name: 'Abszolútérték-csúcs',
    formula: 'p(x) = -|x + 2| + 5',
    domainStr: 'x ∈ ℝ',
    rangeStr: 'y ∈ ]-∞; 5]',
    extremaType: 'maximum',
    xExtrema: [-2],
    yExtrema: [5],
    desc: 'A negatív együttható miatt a hegycsúcs felfelé mutat. A csúcs x = -2 helyen van, a felvett maximális érték 5.',
    evalFn: (x: number) => -Math.abs(x + 2) + 5,
    minX: -6,
    maxX: 2,
    minY: -2,
    maxY: 7,
  },
  {
    id: 'closed-interval',
    name: 'Intervallumon korlátozott egyenes',
    formula: 'q(x) = 1.5x - 2, ha x ∈ [-1; 4]',
    domainStr: 'x ∈ [-1; 4]',
    rangeStr: 'y ∈ [-3.5; 4]',
    extremaType: 'both',
    xExtrema: [-1, 4], // min at -1, max at 4
    yExtrema: [-3.5, 4],
    desc: 'A teljes ℝ-en a lineáris függvénynek nem lenne szélsőértéke. De a zárt [-1; 4] intervallumon a szigorú növekedés miatt a bal végpontban (x = -1) minimuma van (-3.5), a jobb végpontban (x = 4) pedig maximuma (4).',
    evalFn: (x: number) => 1.5 * x - 2,
    minX: -2,
    maxX: 5,
    minY: -5,
    maxY: 6,
  },
  {
    id: 'constant',
    name: 'Konstans függvény',
    formula: 'c(x) = 3',
    domainStr: 'x ∈ ℝ',
    rangeStr: '{3}',
    extremaType: 'both',
    xExtrema: [0], // everywhere
    yExtrema: [3],
    desc: 'A konstans függvény minden pontjában felveszi a legkisebb és a legnagyobb értékét is! Minimum értéke 3 (mindenhol), maximum értéke is 3 (mindenhol).',
    evalFn: () => 3,
    minX: -4,
    maxX: 4,
    minY: -1,
    maxY: 6,
  },
];

export const ExtremaTheory: React.FC<ExtremaTheoryProps> = ({
  onBack,
  onStartQuiz,
}) => {
  const [selectedPresetId, setSelectedPresetId] = useState<string>('parabola-min');

  const currentPreset = PRESETS.find(p => p.id === selectedPresetId) || PRESETS[0];

  // SVG rendering helper for current preset
  const svgWidth = 460;
  const svgHeight = 280;
  const pad = 40;

  const toSvgX = (x: number) => {
    return pad + ((x - currentPreset.minX) / (currentPreset.maxX - currentPreset.minX)) * (svgWidth - 2 * pad);
  };

  const toSvgY = (y: number) => {
    return svgHeight - pad - ((y - currentPreset.minY) / (currentPreset.maxY - currentPreset.minY)) * (svgHeight - 2 * pad);
  };

  // Generate curve path
  const numSteps = 80;
  const pathD = (() => {
    let d = '';
    const startX = currentPreset.id === 'closed-interval' ? -1 : currentPreset.minX;
    const endX = currentPreset.id === 'closed-interval' ? 4 : currentPreset.maxX;
    const step = (endX - startX) / numSteps;

    for (let i = 0; i <= numSteps; i++) {
      const xVal = startX + i * step;
      const yVal = currentPreset.evalFn(xVal);
      const sx = toSvgX(xVal);
      const sy = toSvgY(yVal);
      if (i === 0) {
        d += `M ${sx} ${sy}`;
      } else {
        d += ` L ${sx} ${sy}`;
      }
    }
    return d;
  })();

  const zeroAxisX = toSvgX(0);
  const zeroAxisY = toSvgY(0);

  return (
    <TheoryTemplate
      title="12. Függvények szélsőértékei: Minimum és Maximum"
      subtitle="A szélsőérték helye (x) és értéke (y), csúcsponti formulák, globális vs. lokális szélsőértékek és zárt intervallumok"
      badge="9. OSZTÁLY • V. FÜGGVÉNYEK"
      topicBadge="9. OSZTÁLY • V. FÜGGVÉNYEK • 12. SZÉLSŐÉRTÉKEK"
      themeColor="teal"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      onSwitchToQuiz={onStartQuiz}
      quickRule={{
        label: "A szélsőérték aranyszabálya",
        formula: "Szélsőérték HELYE = x tengelyen (bemenet) | Szélsőérték ÉRTÉKE = y tengelyen (kimenet)!",
        align: "center"
      }}
      practiceTitle="Készen állsz a szélsőértékek feladványaira?"
      practiceSubtitle="30 válogatott feladat 3 szinten: a leolvasástól az algebrai levezetéseken át az intervallumos vizsgálatokig"
      practiceButtonText="Gyakorló Kvíz Indítása"
    >
      {/* =========================================================================
          1. SZEKCIÓ: ÁTTEKINTÉS ÉS AZ ARANYSZABÁLY
      ========================================================================= */}
      <TheorySection
        title="1. Az Aranyszabály: Szélsőérték helye (x) vs. értéke (y)"
        subtitle="A középiskolai matematika és az érettségi leggyakoribb hibájának elkerülése"
        icon={<CheckCircle2 className="w-6 h-6 text-teal-500" />}
      >
        <TheoryCard
          title="Mi a különbség a szélsőérték helye és értéke között?"
          icon={<CheckCircle2 className="w-5 h-5 text-teal-500" />}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4 flex flex-col items-center text-center">
              <ExtremaConceptSvg size={230} className="mb-2" />
              <h4 className="text-sm font-semibold text-teal-300">Hely és Érték</h4>
              <p className="text-xs text-slate-400 mt-1">
                A <strong className="text-amber-400">hely</strong> mindig az $x$-tengelyen keresendő, az <strong className="text-emerald-400">érték</strong> pedig a felvett magasság az $y$-tengelyen.
              </p>
            </div>

            <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4 flex flex-col items-center text-center">
              <VertexFormulaSvg size={230} className="mb-2" />
              <h4 className="text-sm font-semibold text-sky-300">Csúcsponti Alak</h4>
              <p className="text-xs text-slate-400 mt-1">
                $a(x - u)^2 + v$ vagy $a|x - u| + v$ alaknál a csúcspont $C(u; v)$, így a hely $x = u$, az érték $y = v$.
              </p>
            </div>

            <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4 flex flex-col items-center text-center">
              <IntervalExtremaSvg size={230} className="mb-2" />
              <h4 className="text-sm font-semibold text-rose-300">Zárt Intervallum</h4>
              <p className="text-xs text-slate-400 mt-1">
                Korlátos zárt szakaszon ($[a; b]$) a szélsőérték a belső csúcsnál VAGY a végpontoknál alakulhat ki.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="bg-amber-950/30 border border-amber-500/30 p-4 rounded-xl space-y-1.5">
              <span className="text-amber-400 font-bold text-sm block">
                SZÉLSŐÉRTÉK HELYE ($x_0$)
              </span>
              <ul className="text-slate-300 space-y-1 list-disc list-inside">
                <li>Mindig az <strong>$x$-tengely</strong> egy eleme ($x_0 \in D_f$).</li>
                <li>A kérdésre válaszol: <em>„Hol, melyik bemenetnél következik be?”</em></li>
                <li>Jelölése feladatban: pl. <code className="font-mono text-amber-300">minimum helye: x = 2</code>.</li>
              </ul>
            </div>

            <div className="bg-emerald-950/30 border border-emerald-500/30 p-4 rounded-xl space-y-1.5">
              <span className="text-emerald-400 font-bold text-sm block">
                SZÉLSŐÉRTÉK ÉRTÉKE ($y_0$)
              </span>
              <ul className="text-slate-300 space-y-1 list-disc list-inside">
                <li>Mindig az <strong>$y$-tengely</strong> egy értéke ($y_0 = f(x_0) \in R_f$).</li>
                <li>A kérdésre válaszol: <em>„Mennyi a felvett legnagyobb vagy legkisebb érték?”</em></li>
                <li>Jelölése feladatban: pl. <code className="font-mono text-emerald-300">minimum értéke: min f = -3</code>.</li>
              </ul>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* =========================================================================
          2. SZEKCIÓ: INTERAKTÍV SZÉLSŐÉRTÉK LABORATÓRIUM
      ========================================================================= */}
      <TheorySection
        title="2. Interaktív Szélsőérték Laboratórium"
        subtitle="Válassz függvénytípust, és figyeld a szélsőérték pontok dinamikus vetületét az x és y tengelyekre!"
        icon={<Sliders className="w-6 h-6 text-teal-500" />}
      >
        <div className="bg-slate-900/90 border border-teal-500/30 rounded-2xl p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-teal-400" />
              <h4 className="text-base font-bold text-white">Dinamikus Szélsőérték Elemző</h4>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded bg-teal-500/20 text-teal-300 border border-teal-500/40">
              6 interaktív modell
            </span>
          </div>

          {/* Függvény-választó fülek */}
          <div className="flex flex-wrap gap-2">
            {PRESETS.map(preset => (
              <button
                key={preset.id}
                onClick={() => setSelectedPresetId(preset.id)}
                className={`px-3.5 py-2 rounded-lg text-xs font-medium transition-all ${
                  selectedPresetId === preset.id
                    ? 'bg-teal-600 text-white shadow-md shadow-teal-900/40'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {preset.name}
              </button>
            ))}
          </div>

          {/* Vizuális szimuláció és infó panel */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* SVG grafikon */}
            <div className="lg:col-span-7 bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col items-center justify-center">
              <svg
                viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                className="w-full h-auto max-h-[300px] select-none"
              >
                {/* Tengelyek */}
                {zeroAxisY >= pad && zeroAxisY <= svgHeight - pad && (
                  <line
                    x1={pad}
                    y1={zeroAxisY}
                    x2={svgWidth - pad}
                    y2={zeroAxisY}
                    stroke="#475569"
                    strokeWidth="1.5"
                  />
                )}
                {zeroAxisX >= pad && zeroAxisX <= svgWidth - pad && (
                  <line
                    x1={zeroAxisX}
                    y1={svgHeight - pad}
                    x2={zeroAxisX}
                    y2={pad}
                    stroke="#475569"
                    strokeWidth="1.5"
                  />
                )}
                {/* Tengely feliratok */}
                <text x={svgWidth - pad + 10} y={zeroAxisY + 4} fill="#94a3b8" fontSize="12" fontWeight="bold">x</text>
                <text x={zeroAxisX - 6} y={pad - 10} fill="#94a3b8" fontSize="12" fontWeight="bold" textAnchor="middle">y</text>

                {/* Függvénygörbe */}
                <path
                  d={pathD}
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Szélsőérték pontok és vetítések */}
                {currentPreset.xExtrema.map((xVal, idx) => {
                  const yVal = currentPreset.yExtrema[idx] ?? currentPreset.evalFn(xVal);
                  const sx = toSvgX(xVal);
                  const sy = toSvgY(yVal);
                  const isMin = currentPreset.extremaType === 'minimum' || (currentPreset.extremaType === 'both' && idx === 0 && currentPreset.id === 'closed-interval');
                  const ptColor = isMin ? '#10b981' : '#f43f5e';

                  return (
                    <g key={idx}>
                      {/* Vetítővonalak tengelyekre */}
                      <line
                        x1={sx}
                        y1={sy}
                        x2={sx}
                        y2={zeroAxisY}
                        stroke={ptColor}
                        strokeWidth="1.5"
                        strokeDasharray="3 3"
                      />
                      <line
                        x1={sx}
                        y1={sy}
                        x2={zeroAxisX}
                        y2={sy}
                        stroke={ptColor}
                        strokeWidth="1.5"
                        strokeDasharray="3 3"
                      />
                      {/* Pont a grafikonon */}
                      <circle cx={sx} cy={sy} r="6" fill={ptColor} stroke="#ffffff" strokeWidth="2" />
                      {/* Jelölő a tengelyeken */}
                      <circle cx={sx} cy={zeroAxisY} r="3.5" fill={ptColor} />
                      <circle cx={zeroAxisX} cy={sy} r="3.5" fill={ptColor} />
                      {/* Szöveg */}
                      <text
                        x={sx}
                        y={sy - 10}
                        fill={ptColor}
                        fontSize="11"
                        fontWeight="bold"
                        textAnchor="middle"
                      >
                        {isMin ? 'MIN' : 'MAX'} ({xVal}; {yVal})
                      </text>
                    </g>
                  );
                })}
              </svg>
              <div className="flex items-center gap-6 text-xs text-slate-400 mt-2">
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" /> Minimum
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" /> Maximum
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-1 bg-sky-400 inline-block" /> Függvénygörbe
                </span>
              </div>
            </div>

            {/* Elemző panel */}
            <div className="lg:col-span-5 space-y-4 text-xs">
              <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700/60">
                <span className="text-xs uppercase text-slate-400 font-semibold tracking-wider">Kiválasztott függvény</span>
                <div className="text-lg font-bold text-teal-300 font-mono mt-0.5">{currentPreset.formula}</div>
                <div className="text-xs text-slate-300 mt-2 grid grid-cols-2 gap-2">
                  <div><span className="text-slate-400">Értelmezési tartomány:</span> <span className="font-semibold">{currentPreset.domainStr}</span></div>
                  <div><span className="text-slate-400">Értékkészlet:</span> <span className="font-semibold text-emerald-400">{currentPreset.rangeStr}</span></div>
                </div>
              </div>

              {/* Szélsőérték kártyák */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-800/60 p-3 rounded-lg border border-slate-700">
                  <div className="text-xs text-amber-400 font-medium">Szélsőérték HELYE (x)</div>
                  <div className="text-base font-bold text-white mt-1">
                    {currentPreset.xExtrema.length === 1
                      ? `x = ${currentPreset.xExtrema[0]}`
                      : currentPreset.xExtrema.map((x, i) => `${i === 0 ? 'min:' : 'max:'} ${x}`).join(', ')}
                  </div>
                  <div className="text-[11px] text-slate-400">Bemenet az x-tengelyen</div>
                </div>

                <div className="bg-slate-800/60 p-3 rounded-lg border border-slate-700">
                  <div className="text-xs text-emerald-400 font-medium">Szélsőérték ÉRTÉKE (y)</div>
                  <div className="text-base font-bold text-white mt-1">
                    {currentPreset.yExtrema.length === 1
                      ? `y = ${currentPreset.yExtrema[0]}`
                      : currentPreset.yExtrema.map((y, i) => `${i === 0 ? 'min:' : 'max:'} ${y}`).join(', ')}
                  </div>
                  <div className="text-[11px] text-slate-400">Elért magasság az y-tengelyen</div>
                </div>
              </div>

              {/* Magyarázat doboz */}
              <div className="bg-teal-950/40 border border-teal-500/30 p-3.5 rounded-xl text-xs text-slate-300 leading-relaxed">
                <strong className="text-teal-300 block mb-1">Módszertani indoklás:</strong>
                {currentPreset.desc}
              </div>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* =========================================================================
          3. SZEKCIÓ: GLOBÁLIS ÉS LOKÁLIS SZÉLSŐÉRTÉKEK DEFINÍCIÓJA
      ========================================================================= */}
      <TheorySection
        title="3. Globális és Lokális Szélsőértékek"
        subtitle="Mikor beszélünk abszolút és mikor helyi szélsőértékről?"
        icon={<BookOpen className="w-6 h-6 text-sky-500" />}
      >
        <TheoryCard
          title="Matematikai fogalmi tisztázás"
          icon={<BookOpen className="w-5 h-5 text-sky-500" />}
        >
          <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
            <p>
              A 9. osztályos tananyagban túlnyomórészt <strong>globális (abszolút)</strong> szélsőértékekkel foglalkozunk:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-800/80 p-4 rounded-xl border border-teal-500/30 space-y-1">
                <span className="text-teal-300 font-bold text-sm block">Globális Minimum</span>
                <p className="font-mono text-slate-200">f(x) ≥ f(x₀) &nbsp;minden x ∈ D_f esetén</p>
                <p className="text-slate-400 text-[11px]">
                  A teljes értelmezési tartományon nincs olyan pont, amely alacsonyabb értéket venne fel, mint $x_0$-ban.
                </p>
              </div>

              <div className="bg-slate-800/80 p-4 rounded-xl border border-rose-500/30 space-y-1">
                <span className="text-rose-300 font-bold text-sm block">Globális Maximum</span>
                <p className="font-mono text-slate-200">f(x) ≤ f(x₀) &nbsp;minden x ∈ D_f esetén</p>
                <p className="text-slate-400 text-[11px]">
                  A teljes értelmezési tartományon nincs olyan pont, amely magasabb értéket venne fel, mint $x_0$-ban.
                </p>
              </div>
            </div>

            <p className="text-slate-400 text-xs">
              A <strong>lokális (helyi)</strong> szélsőérték egy pont közvetlen környezetében a legnagyobb vagy legkisebb magasság (pl. egy hullámvasút lokális hegycsúcsa). Minden globális szélsőérték lokális is, de fordítva nem mindig!
            </p>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* =========================================================================
          4. SZEKCIÓ: ALGEBRAI KERESÉS TELJES NÉGYZETTÉ ALAKÍTÁSSAL
      ========================================================================= */}
      <TheorySection
        title="4. Algebrai Meghatározás: Teljes négyzetté alakítás & Abszolútérték"
        subtitle="Hogyan határozzuk meg a szélsőértéket rajzolás nélkül, kizárólag algebrával?"
        icon={<Target className="w-6 h-6 text-purple-500" />}
      >
        <TheoryCard
          title="A nemnegatív tagok izolálásának módszere"
          icon={<Target className="w-5 h-5 text-purple-500" />}
        >
          <div className="space-y-4 text-xs text-slate-300">
            <p>
              Grafikon rajzolása nélkül is precízen leolvasható a szélsőérték, ha felismerjük a nemnegatív tagokat:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-800/80 p-4 rounded-xl border border-amber-500/30 space-y-2">
                <span className="text-amber-300 font-bold text-sm block">1. Másodfokú: f(x) = x² - 6x + 11</span>
                <p className="text-slate-300">
                  Alakítsuk teljes négyzetté:
                  <br />
                  <code className="font-mono text-teal-300">x² - 6x + 11 = (x - 3)² - 9 + 11 = (x - 3)² + 2</code>
                </p>
                <p className="text-slate-400">
                  Mivel $(x - 3)^2 \ge 0$, a legkisebb érték $0$, ami akkor következik be, ha $x - 3 = 0 \implies x = 3$.
                </p>
                <div className="p-2 bg-slate-900 rounded font-mono text-emerald-400 font-bold">
                  Minimum helye: x = 3, értéke: y = 2
                </div>
              </div>

              <div className="bg-slate-800/80 p-4 rounded-xl border border-sky-500/30 space-y-2">
                <span className="text-sky-300 font-bold text-sm block">2. Abszolútérték: g(x) = -3|x + 4| + 7</span>
                <p className="text-slate-300">
                  Mivel $|x + 4| \ge 0$, ezért $-3|x + 4| \le 0$ (sosem pozitív).
                </p>
                <p className="text-slate-400">
                  A legnagyobb értékét akkor éri el, ha a levont tag $0$: $|x + 4| = 0 \implies x = -4$.
                </p>
                <div className="p-2 bg-slate-900 rounded font-mono text-rose-400 font-bold">
                  Maximum helye: x = -4, értéke: y = 7
                </div>
              </div>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* =========================================================================
          5. SZEKCIÓ: KORLÁTOS ZÁRT INTERVALLUMON VETT SZÉLSŐÉRTÉKEK
      ========================================================================= */}
      <TheorySection
        title="5. Szélsőérték Zárt Intervallumon ([a; b])"
        subtitle="Hogyan változik a helyzet, ha a függvényt csak egy szakaszon vizsgáljuk?"
        icon={<Sparkles className="w-6 h-6 text-teal-500" />}
      >
        <TheoryCard
          title="A belső csúcs és a végpontok versenye"
          icon={<Sparkles className="w-5 h-5 text-teal-500" />}
        >
          <div className="space-y-4 text-xs text-slate-300 leading-relaxed">
            <p>
              Folytonos függvények esetén zárt intervallumon ($x \in [a; b]$) garantáltan létezik mind legkisebb, mind legnagyobb érték (Weierstrass-tétel).
              A szélsőérték két helyen lehet:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700 space-y-1">
                <span className="text-teal-300 font-bold block text-sm">1. Belső csúcsponton</span>
                <p className="text-slate-400">
                  Ha a parabola vagy abszolútérték csúcspontja az $[a; b]$ intervallumba esik, az biztosan az egyik szélsőérték (pl. lokális min/max).
                </p>
              </div>

              <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700 space-y-1">
                <span className="text-teal-300 font-bold block text-sm">2. Az intervallum végpontjainál</span>
                <p className="text-slate-400">
                  Mindig ki kell számolni a határokat: $f(a)$ és $f(b)$ értékét is, majd összehasonlítani a csúcsponttal!
                </p>
              </div>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* =========================================================================
          TIPIKUS HIBÁK ÉS DIÁKCSAPDÁK
      ========================================================================= */}
      <TheoryTrapBox
        title="Tipikus Diákcsapdák és Hibák a Szélsőértékeknél"
        traps={[
          {
            wrong: 'A lineáris függvénynek (f(x) = 2x - 5) van minimuma és maximuma ℝ-en.',
            correct: 'Ha az értelmezési tartomány a teljes ℝ, egy nem konstans egyenes végtelenbe nyúlik mindkét irányban: nincs se minimuma, se maximuma!',
            explanation: 'Lineáris függvénynek csak korlátos zárt intervallumon [a; b] van szélsőértéke (a végpontokban).'
          },
          {
            wrong: 'A „Mennyi a minimum?” kérdésre az x koordinátát adjuk meg.',
            correct: 'A minimum értéke MINDIG az y koordináta! Az x-et csak akkor adjuk meg, ha a szélsőérték HELYÉT kérik.',
            explanation: 'Hely = x tengelyen, Érték = y tengelyen.'
          },
          {
            wrong: 'Azt hisszük, hogy a parabola csúcspontja mindig maximum.',
            correct: 'Ha a > 0 (felfelé nyílik a parabola), a csúcspont MINIMUM. Csak akkor maximum, ha a < 0 (lefelé nyílik).',
            explanation: 'Gondolj a völgyre és a hegycsúcsra: a völgy mélypontja minimum.'
          }
        ]}
      />

      {/* =========================================================================
          ÖSSZEFOGLALÓ TÁBLÁZAT
      ========================================================================= */}
      <TheoryCard
        title="Függvénycsaládok Szélsőérték-Jellemzése ℝ-en"
        icon={<Scale className="w-6 h-6 text-teal-500" />}
      >
        <TheoryTable
          headers={['Függvénytípus', 'Képlet', 'Szélsőérték jellege', 'Szélsőérték helye (x)', 'Szélsőérték értéke (y)']}
          rows={[
            ['Lineáris (m ≠ 0)', 'f(x) = mx + b', 'Nincs szélsőértéke', '-', '-'],
            ['Konstans', 'f(x) = c', 'Min és Max is (mindenhol)', 'Minden x ∈ ℝ', 'y = c'],
            ['Felfelé nyíló parabola', 'f(x) = a(x - u)² + v (a > 0)', 'Globális minimum', 'x = u', 'y = v'],
            ['Lefelé nyíló parabola', 'f(x) = a(x - u)² + v (a < 0)', 'Globális maximum', 'x = u', 'y = v'],
            ['Abszolútérték V-alak', 'f(x) = a|x - u| + v (a > 0)', 'Globális minimum', 'x = u', 'y = v'],
            ['Abszolútérték tető', 'f(x) = a|x - u| + v (a < 0)', 'Globális maximum', 'x = u', 'y = v'],
            ['Négyzetgyök', 'f(x) = √(x - u) + v', 'Globális minimum a kezdőpontban', 'x = u', 'y = v']
          ]}
        />
      </TheoryCard>
    </TheoryTemplate>
  );
};
