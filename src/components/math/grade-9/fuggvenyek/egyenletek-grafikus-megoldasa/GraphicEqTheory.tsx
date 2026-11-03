import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryTrapBox,
  TheoryTable
} from '../TheoryTemplate';
import {
  IntersectionConceptSvg,
  CasesOfSolutionsSvg,
  AbsLinearIntersectionSvg
} from './GraphicEqFigures';
import {
  Sparkles,
  BookOpen,
  Sliders,
  AlertTriangle,
  Target,
  Layers,
  CheckCircle2,
  HelpCircle
} from 'lucide-react';

export interface GraphicEqTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

interface EquationPreset {
  id: string;
  name: string;
  equationStr: string;
  fStr: string;
  gStr: string;
  solutions: number[]; // x values
  intersections: { x: number; y: number }[];
  fFn: (x: number) => number;
  gFn: (x: number) => number;
  fType: 'parabola' | 'abs' | 'root' | 'line';
  gType: 'line';
  domainMin: number;
  domainMax: number;
  explanation: string;
}

const PRESETS: EquationPreset[] = [
  {
    id: 'parabola-line-2',
    name: 'Parabola és ferde egyenes (2 gyök)',
    equationStr: 'x² = x + 2',
    fStr: 'f(x) = x²',
    gStr: 'g(x) = x + 2',
    solutions: [-1, 2],
    intersections: [{ x: -1, y: 1 }, { x: 2, y: 4 }],
    fFn: (x: number) => x * x,
    gFn: (x: number) => x + 2,
    fType: 'parabola',
    gType: 'line',
    domainMin: -3,
    domainMax: 4,
    explanation: 'A bal oldali f(x) = x² parabola és a jobb oldali g(x) = x + 2 egyenes két pontban metszi egymást: M₁(-1; 1) és M₂(2; 4). Az egyenlet megoldásai a metszéspontok x-koordinátái: x₁ = -1 és x₂ = 2.'
  },
  {
    id: 'parabola-line-1',
    name: 'Parabola és érintő egyenes (1 gyök)',
    equationStr: 'x² = 2x - 1',
    fStr: 'f(x) = x²',
    gStr: 'g(x) = 2x - 1',
    solutions: [1],
    intersections: [{ x: 1, y: 1 }],
    fFn: (x: number) => x * x,
    gFn: (x: number) => 2 * x - 1,
    fType: 'parabola',
    gType: 'line',
    domainMin: -2,
    domainMax: 4,
    explanation: 'Az egyenes pontosan érinti a parabolát az É(1; 1) pontban. Átrendezve: x² - 2x + 1 = (x - 1)² = 0, így pontosan egyetlen valós gyök létezik: x = 1.'
  },
  {
    id: 'abs-horizontal',
    name: 'Abszolútérték és vízszintes egyenes',
    equationStr: '|x - 2| = 3',
    fStr: 'f(x) = |x - 2|',
    gStr: 'g(x) = 3',
    solutions: [-1, 5],
    intersections: [{ x: -1, y: 3 }, { x: 5, y: 3 }],
    fFn: (x: number) => Math.abs(x - 2),
    gFn: () => 3,
    fType: 'abs',
    gType: 'line',
    domainMin: -3,
    domainMax: 7,
    explanation: 'Az f(x) = |x - 2| V-alakú görbéje a vízszintes y = 3 egyenessel két pontban találkozik: M₁(-1; 3) és M₂(5; 3). A megoldások: x = -1 és x = 5.'
  },
  {
    id: 'abs-slanted',
    name: 'Abszolútérték és ferde egyenes',
    equationStr: '|x + 1| = 2x - 1',
    fStr: 'f(x) = |x + 1|',
    gStr: 'g(x) = 2x - 1',
    solutions: [2],
    intersections: [{ x: 2, y: 3 }],
    fFn: (x: number) => Math.abs(x + 1),
    gFn: (x: number) => 2 * x - 1,
    fType: 'abs',
    gType: 'line',
    domainMin: -3,
    domainMax: 5,
    explanation: 'Bár formális algebrai bontáskor két egyenletet kapnánk, a grafikonon jól látszik, hogy az egyenes csak az x ≥ -1 ágat metszi M(2; 3)-ban. A bal oldali ág alatt fut, így a negatív formális gyök (x = 0) valójában hamis gyök (mert 2(0)-1 = -1 < 0)!'
  },
  {
    id: 'root-line',
    name: 'Négyzetgyök és egyenes',
    equationStr: '√(x + 3) = x + 1',
    fStr: 'f(x) = √(x + 3)',
    gStr: 'g(x) = x + 1',
    solutions: [1],
    intersections: [{ x: 1, y: 2 }],
    fFn: (x: number) => Math.sqrt(Math.max(0, x + 3)),
    gFn: (x: number) => x + 1,
    fType: 'root',
    gType: 'line',
    domainMin: -3,
    domainMax: 4,
    explanation: 'A gyökfüggvény x ≥ -3 esetén létezik. A grafikonok egyetlen közös metszéspontja M(1; 2), így az egyetlen megoldás x = 1. (Az x = -2 algebrai négyzetre emeléskor fellépő hamis gyök, mert a gyök értéke sosem negatív).'
  },
  {
    id: 'no-solution',
    name: 'Nincs metszéspont (üres halmaz)',
    equationStr: 'x² + 2 = -x - 1',
    fStr: 'f(x) = x² + 2',
    gStr: 'g(x) = -x - 1',
    solutions: [],
    intersections: [],
    fFn: (x: number) => x * x + 2,
    gFn: (x: number) => -x - 1,
    fType: 'parabola',
    gType: 'line',
    domainMin: -4,
    domainMax: 3,
    explanation: 'A parabola csúcsa C(0; 2)-ben van és felfelé nyílik, miközben az egyenes a sík alsó részén fut. A két görbe sehol sem metszi egymást, így az egyenletnek nincs valós megoldása: M = ∅.'
  }
];

export const GraphicEqTheory: React.FC<GraphicEqTheoryProps> = ({
  onBack,
  onStartQuiz,
}) => {
  const [selectedId, setSelectedId] = useState<string>('parabola-line-2');
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

  // Görbék útvonala
  const numSteps = 80;
  const stepSize = (maxX - minX) / numSteps;

  const fPath = (() => {
    let d = '';
    let started = false;
    for (let i = 0; i <= numSteps; i++) {
      const x = minX + i * stepSize;
      if (preset.fType === 'root' && x < -3) continue;
      const y = preset.fFn(x);
      const sx = toSvgX(x);
      const sy = toSvgY(y);
      if (!started) {
        d += `M ${sx} ${sy}`;
        started = true;
      } else {
        d += ` L ${sx} ${sy}`;
      }
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
      title="15. Egyenletek grafikus megoldása"
      subtitle="Két függvény metszéspontjainak meghatározása, a megoldáshalmaz és az y-koordináta szerepének tisztázása"
      badge="9. OSZTÁLY • V. FÜGGVÉNYEK"
      topicBadge="9. OSZTÁLY • V. FÜGGVÉNYEK • 15. EGYENLETEK GRAFIKUSAN"
      themeColor="emerald"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      onSwitchToQuiz={onStartQuiz}
      quickRule={{
        label: "A Grafikus Megoldás Aranyszabálya",
        formula: "f(x) = g(x) megoldása = a metszéspontok x-koordinátái! Az y CSAK a közös helyettesítési érték!",
        align: "center"
      }}
      practiceTitle="Készen állsz a metszéspontok leolvasására?"
      practiceSubtitle="30 válogatott feladat 3 szinten: egyenesek és parabolák metszéspontjaitól az abszolútértékes és gyökös egyenletekig"
      practiceButtonText="Gyakorló Kvíz Indítása"
    >
      {/* =========================================================================
          1. SZEKCIÓ: ÁTTEKINTÉS ÉS ALAPELVEK
      ========================================================================= */}
      <TheorySection
        title="1. A Grafikus Egyenletmegoldás Alapelve"
        subtitle="Hogyan alakítunk át bármilyen egyenletet két egymást metsző függvénnyé?"
        icon={<CheckCircle2 className="w-6 h-6 text-emerald-500" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 flex flex-col items-center text-center shadow-xs">
            <IntersectionConceptSvg size={240} className="mb-2" />
            <h4 className="text-sm font-bold text-emerald-700 dark:text-emerald-300">A Metszéspont Elve</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              Az $f(x) = g(x)$ egyenlet megoldásai a két grafikon közös pontjainak $x$-koordinátái: $x_1, x_2$.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 flex flex-col items-center text-center shadow-xs">
            <CasesOfSolutionsSvg size={240} className="mb-2" />
            <h4 className="text-sm font-bold text-amber-700 dark:text-amber-300">Megoldások Száma</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              Geometriailag 0, 1, 2 vagy akár több metszéspont is létezhet (metsző, érintő vagy elkerülő helyzet).
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 flex flex-col items-center text-center shadow-xs">
            <AbsLinearIntersectionSvg size={240} className="mb-2" />
            <h4 className="text-sm font-bold text-sky-700 dark:text-sky-300">Törtvonalas Görbék</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              Abszolútértékes és gyökös egyenleteknél a grafikus kép azonnal kiszűri a hamis gyököket!
            </p>
          </div>
        </div>
      </TheorySection>

      {/* =========================================================================
          2. SZEKCIÓ: INTERAKTÍV GRAFIKUS EGYENLET LABORATÓRIUM
      ========================================================================= */}
      <TheorySection
        title="2. Interaktív Grafikus Egyenletmegoldó Labor"
        subtitle="Válassz egyenlettípust, vizsgáld meg a két oldal grafikonját és a metszéspontok leolvasását!"
        icon={<Sliders className="w-6 h-6 text-emerald-500" />}
      >
        <div className="bg-slate-900 p-5 sm:p-6 rounded-2xl border border-slate-700 shadow-md space-y-6">
          <div>
            <label className="text-xs uppercase text-slate-400 font-bold tracking-wider block mb-2">
              Válassz feladattípust:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {PRESETS.map(p => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setSelectedId(p.id)}
                  className={`p-2.5 rounded-xl text-left border text-xs font-semibold transition-all ${
                    selectedId === p.id
                      ? 'bg-emerald-600 text-white border-emerald-400 shadow-md'
                      : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-750 hover:text-white'
                  }`}
                >
                  <div className="truncate font-bold">{p.name}</div>
                  <div className="text-[11px] opacity-80 font-mono mt-0.5">{p.equationStr}</div>
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
                      key={`grid-x-${xVal}`}
                      x1={toSvgX(xVal)}
                      y1={30}
                      x2={toSvgX(xVal)}
                      y2={svgHeight - 30}
                      stroke="#1e293b"
                      strokeWidth="1"
                    />
                  );
                })}

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

                {/* g(x) egyenes */}
                <path
                  d={gPath}
                  fill="none"
                  stroke="#fbbf24"
                  strokeWidth="3"
                  strokeLinecap="round"
                />

                {/* Metszéspontok kiemelése */}
                {preset.intersections.map((pt, idx) => {
                  const sx = toSvgX(pt.x);
                  const sy = toSvgY(pt.y);
                  return (
                    <g key={`int-${idx}`}>
                      {/* Szaggatott levetítés x-tengelyre */}
                      <line
                        x1={sx}
                        y1={sy}
                        x2={sx}
                        y2={zeroAxisY}
                        stroke="#10b981"
                        strokeWidth="1.5"
                        strokeDasharray="3 3"
                      />
                      <circle cx={sx} cy={sy} r="6" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
                      <circle cx={sx} cy={zeroAxisY} r="4" fill="#10b981" />
                      <text
                        x={sx}
                        y={sy - 10}
                        fill="#34d399"
                        fontSize="11"
                        fontWeight="bold"
                        textAnchor="middle"
                      >
                        M{preset.intersections.length > 1 ? `_${idx + 1}` : ''}({pt.x}; {pt.y})
                      </text>
                      <text
                        x={sx}
                        y={zeroAxisY + 16}
                        fill="#34d399"
                        fontSize="11"
                        fontWeight="bold"
                        textAnchor="middle"
                      >
                        x = {pt.x}
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
                  <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" /> Metszéspontok M(x; y)
                </span>
              </div>
            </div>

            {/* Elemző panel */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700/60 space-y-1">
                <span className="text-xs uppercase text-slate-400 font-semibold tracking-wider">Megoldandó egyenlet</span>
                <div className="text-xl font-bold text-white font-mono">{preset.equationStr}</div>
              </div>

              <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700 space-y-2 text-xs">
                <div className="flex justify-between items-center pb-2 border-b border-slate-700">
                  <span className="text-slate-400">Metszéspontok száma:</span>
                  <span className="font-bold text-amber-400 text-sm font-mono">
                    {preset.intersections.length} db
                  </span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-slate-700">
                  <span className="text-slate-400">Egyenlet megoldáshalmaza:</span>
                  <span className="font-bold text-emerald-400 text-sm font-mono">
                    {preset.solutions.length === 0
                      ? 'M = ∅'
                      : `M = {${preset.solutions.join('; ')}}`}
                  </span>
                </div>
                <p className="text-slate-300 leading-relaxed pt-1">
                  {preset.explanation}
                </p>
              </div>

              <div className="bg-emerald-950/40 border border-emerald-500/30 p-3.5 rounded-xl text-xs text-slate-300 leading-relaxed">
                <strong className="text-emerald-300 block mb-1">Metszéspont vs. Megoldás:</strong>
                A metszéspontok koordinátái pontok a síkban, pl. $M(2; 4)$. <strong>Az egyenlet megoldása kizárólag az $x = 2$!</strong> Az $y = 4$ nem része a megoldásnak, az csupán a két függvény közös értéke.
              </div>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* =========================================================================
          3. SZEKCIÓ: A GRAFIKUS MEGOLDÁS 3 LÉPÉSES ALGORITMUSA
      ========================================================================= */}
      <TheorySection
        title="3. A Grafikus Megoldás 3 Lépéses Algoritmusa"
        subtitle="Hogyan vezess le hibátlanul bármilyen grafikus feladatot a dolgozatban?"
        icon={<BookOpen className="w-6 h-6 text-emerald-500" />}
      >
        <TheoryCard
          title="Lépésről lépésre a teljes pontszámért"
          icon={<BookOpen className="w-5 h-5 text-emerald-500" />}
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="bg-sky-50 dark:bg-sky-950/30 p-4 rounded-xl border border-sky-200 dark:border-sky-900/50 space-y-1.5">
              <span className="text-sky-800 dark:text-sky-300 font-bold block text-sm">1. Két függvény felírása</span>
              <p className="text-slate-600 dark:text-slate-400">
                Tekintsük az egyenlet bal oldalát $f(x)$-nek, a jobb oldalát $g(x)$-nek. Tisztázzuk a függvények típusát és értelmezési tartományát!
              </p>
            </div>

            <div className="bg-amber-50 dark:bg-amber-950/30 p-4 rounded-xl border border-amber-200 dark:border-amber-900/50 space-y-1.5">
              <span className="text-amber-800 dark:text-amber-300 font-bold block text-sm">2. Pontos ábrázolás</span>
              <p className="text-slate-600 dark:text-slate-400">
                Rajzoljuk meg mindkét függvényt közös koordináta-rendszerben! Használjunk nevezetes pontokat (csúcspont, tengelymetszetek, meredekség).
              </p>
            </div>

            <div className="bg-emerald-50 dark:bg-emerald-950/30 p-4 rounded-xl border border-emerald-200 dark:border-emerald-900/50 space-y-1.5">
              <span className="text-emerald-800 dark:text-emerald-300 font-bold block text-sm">3. Leolvasás &amp; Ellenőrzés</span>
              <p className="text-slate-600 dark:text-slate-400">
                Olvassuk le a metszéspontok $x$-koordinátáit! Mindig ellenőrizzünk behelyettesítéssel: {'$f(x) \\stackrel{?}{=} g(x)$'}.
              </p>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* =========================================================================
          4. SZEKCIÓ: TIPIKUS VIZSGACSAPDÁK
      ========================================================================= */}
      <TheorySection
        title="4. Tipikus Érettségi Csapdák"
        subtitle="Ezek miatt vonnak le a legtöbb pontot a grafikus egyenletmegoldásnál!"
        icon={<AlertTriangle className="w-6 h-6 text-amber-500" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryTrapBox
            title="1. Az y-koordináta beírása a megoldáshalmazba"
            trap="Ha a metszéspont M(2; 4), sokan azt írják fel: 'Megoldás: x = 2, y = 4' vagy '(2; 4)'."
            solution="Az eredeti egyenletben csak x ismeretlen szerepelt, így a megoldás kizárólag: x = 2 (vagy M = {2})! Az y = 4 nem gyök!"
          />
          <TheoryTrapBox
            title="2. Pontatlan rajz miatti félreolvasás"
            trap="Vázlatos, vonalzó nélküli szabadkézi rajznál a tanuló melléolvassa az egész koordinátájú metszéspontot."
            solution="Mindig számoljunk utána behelyettesítéssel: ha f(x) = g(x) teljesül az adott x-re, csak akkor valódi a gyök!"
          />
          <TheoryTrapBox
            title="3. Hamis gyökök benne hagyása algebrai megoldáskor"
            trap="Gyökös egyenletnél négyzetre emelés után kapott x-et kritika nélkül elfogadjuk gyökként."
            solution="A grafikonon világosan látszik, ha a gyökív és az egyenes nem találkozik az adott pontban: a hamis gyököt azonnal ki kell zárni!"
          />
          <TheoryTrapBox
            title="4. Metszéspont nélküli eset megijedése"
            trap="Ha a két grafikon nem metszi egymást, a diák azt hiszi, hibázott a rajzban."
            solution="Teljesen természetes, hogy egy egyenletnek nincs valós megoldása! Ilyenkor a helyes válasz: M = ∅ (nincs valós gyök)."
          />
        </div>
      </TheorySection>

      {/* =========================================================================
          5. SZEKCIÓ: MEGOLDÁSSZÁMOK NAGYTÁBLÁZAT
      ========================================================================= */}
      <TheorySection
        title="5. Kölcsönös Helyzetek és Gyökök Száma"
        subtitle="Milyen geometriai alakzatok hány pontban metszhetik egymást?"
        icon={<Layers className="w-6 h-6 text-emerald-500" />}
      >
        <TheoryTable
          headers={['Függvények kombinációja', 'Geometriai leírás', 'Lehetséges gyökök száma', 'Példa']}
          rows={[
            ['Két egyenes', 'Metsző (1 pont), párhuzamos (0 pont) vagy egybeeső (végtelen)', '0, 1 vagy végtelen', '2x + 1 = -x + 4 (1 gyök)'],
            ['Parabola és egyenes', 'Metsző (2 pont), érintő (1 pont) vagy elkerülő (0 pont)', '0, 1 vagy 2', 'x² = x + 2 (2 gyök)'],
            ['Abszolútérték és vízszintes egyenes', 'Két ágat metszi (2), csúcsot érinti (1) vagy alatta fut (0)', '0, 1 vagy 2', '|x - 3| = 4 (2 gyök)'],
            ['Négyzetgyök és egyenes', 'Két metszéspont, egy metszéspont vagy elkerülő', '0, 1 vagy 2', '√(x + 3) = x + 1 (1 gyök)'],
            ['Két parabola', 'Metsző (1 vagy 2), érintő (1) vagy elkerülő (0)', '0, 1 vagy 2', 'x² = -(x - 2)² + 4 (2 gyök)']
          ]}
        />
      </TheorySection>
    </TheoryTemplate>
  );
};
