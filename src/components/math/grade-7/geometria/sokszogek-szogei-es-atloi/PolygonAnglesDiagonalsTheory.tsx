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
  HelpCircle
} from 'lucide-react';
import { MathText } from '@/components/math/shared/MathText';

interface PolygonAnglesDiagonalsTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

export const PolygonAnglesDiagonalsTheory: React.FC<PolygonAnglesDiagonalsTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // Interactive Polygon Simulator state
  const [selectedN, setSelectedN] = useState<number>(5);
  const [viewMode, setViewMode] = useState<'all-diagonals' | 'vertex-diagonals' | 'triangulation'>('all-diagonals');

  // Helper to compute vertices of regular n-gon
  const getPolygonVertices = (n: number, cx: number, cy: number, r: number) => {
    const vertices: { x: number; y: number }[] = [];
    for (let i = 0; i < n; i++) {
      // Rotate so first vertex is at top or top-centered
      const angle = (2 * Math.PI * i) / n - Math.PI / 2;
      vertices.push({
        x: Math.round((cx + r * Math.cos(angle)) * 10) / 10,
        y: Math.round((cy + r * Math.sin(angle)) * 10) / 10
      });
    }
    return vertices;
  };

  const vertices = getPolygonVertices(selectedN, 130, 115, 85);
  const polygonPointsStr = vertices.map(v => `${v.x},${v.y}`).join(' ');

  // Compute calculated values
  const d1 = selectedN - 3;
  const h = selectedN - 2;
  const dn = (selectedN * (selectedN - 3)) / 2;
  const sumAngle = (selectedN - 2) * 180;
  const singleAngle = Math.round(((selectedN - 2) * 180 / selectedN) * 10) / 10;
  const extAngle = Math.round((360 / selectedN) * 10) / 10;

  return (
    <TheoryTemplate
      title="3. Sokszögek szögei és átlói"
      subtitle="Konvex sokszögek átlói, belső és külső szögek összege, szabályos sokszögek szögképletei"
      badgeText="7. OSZTÁLY • VII. GEOMETRIA • 📖 3. LECKE"
      quickRule={{
        label: 'Fontos szabály',
        formula: 'd_1 = n - 3 \\quad • \\quad d_n = \\frac{n(n-3)}{2} \\quad • \\quad S_n = (n-2)\\cdot 180^\\circ \\quad • \\quad \\sum \\alpha\' = 360^\\circ'
      }}
      topicId="g7-geom-polygons"
      chapterId="geometria"
      grade={7}
      themeColor="purple"
      estimatedReadTime="14 perc"
      difficulty="Közepes"
      pdfFilename="7_osztaly_3_sokszogek_szogei_es_atloi.pdf"
      practiceTitle="Készen állsz a sokszögek szögeinek és átlóinak gyakorlására?"
      practiceSubtitle="Tedd próbára tudásod a 30 feladatos interaktív kvízben, a párosítóban és a csoportosítóban!"
      onBack={onBack}
      onStartPractice={onStartQuiz}
    >
      {/* 1. FEJEZET: KONVEX SOKSZÖGEK ÉS ÁTLÓIK */}
      <TheorySection
        id="fejezet-1"
        number={1}
        title="Konvex sokszögek és átlóik"
        badge="ALAPOK ÉS KÉPLETEK"
      >
        <TheoryCallout type="rule" title="Fontos alapszabályok összefoglalása">
          Egy konvex <MathText text="n" inline />-oldalú sokszögben (<MathText text="n \ge 3" inline />):
          <ul className="list-disc pl-5 mt-2 space-y-1 text-xs">
            <li><strong>Egy csúcsból húzható átlók száma:</strong> <MathText text="d_1 = n - 3" inline /> (önmagába és a 2 szomszédba nem húzható átló).</li>
            <li><strong>Egy csúcsból húzott átlók által kapott háromszögek száma:</strong> <MathText text="h = n - 2" inline />.</li>
            <li><strong>Az összes átló száma:</strong> <MathText text="d_n = \frac{n \cdot (n - 3)}{2}" inline /> (minden csúcsból <MathText text="n-3" inline />, de minden átlót kétszer számolnánk).</li>
            <li><strong>Belső szögek összege:</strong> <MathText text="S_n = (n - 2) \cdot 180^\circ" inline />.</li>
            <li><strong>Külső szögek összege:</strong> Bármely konvex sokszög esetén mindig pontosan <strong>360°</strong>!</li>
          </ul>
        </TheoryCallout>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <TheoryCard
            title="Mi a konvex sokszög és mi az átló?"
            icon={<Shapes className="w-5 h-5 text-purple-600" />}
          >
            <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">
              Egy sokszög <strong>konvex</strong>, ha bármely két belső pontját összekötő szakasz teljes egészében a sokszög belsejében halad (nincs benne „beugró” vagy „öböl”, minden belső szöge kisebb, mint <MathText text="180^\circ" inline />).
            </p>
            <div className="mt-3 p-3 bg-purple-50 dark:bg-purple-950/40 rounded-xl border border-purple-200 dark:border-purple-800 text-xs">
              <strong className="text-purple-900 dark:text-purple-200">Átló definíciója:</strong>
              <p className="mt-1 text-slate-700 dark:text-slate-300">
                A sokszög <strong>két nem szomszédos csúcsát</strong> összekötő egyenes szakaszt átlónak nevezzük.
              </p>
            </div>
          </TheoryCard>

          <TheoryCard
            title="Miért pont (n - 3) átló indul egy csúcsból?"
            icon={<Maximize2 className="w-5 h-5 text-indigo-600" />}
          >
            <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">
              Válasszunk ki egy tetszőleges csúcsot! A sokszögnek összesen <MathText text="n" inline /> darab csúcsa van. Ebből a kiválasztott csúcsból melyik csúcsokba <strong>nem</strong> húzhatunk átlót?
            </p>
            <ol className="list-decimal pl-4 mt-2 space-y-1 text-xs text-slate-700 dark:text-slate-300">
              <li><strong>Önmagába</strong> nem húzhatunk szakaszt (1 csúcs).</li>
              <li>A <strong>bal oldali szomszédos</strong> csúcsba az oldal fut, nem átló (1 csúcs).</li>
              <li>A <strong>jobb oldali szomszédos</strong> csúcsba szintén oldal fut (1 csúcs).</li>
            </ol>
            <div className="mt-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
              Összesen 3 csúcs kiesik <MathText text="\implies d_1 = n - 3" inline />
            </div>
          </TheoryCard>
        </div>

        {/* INTERAKTÍV SOKSZÖG LABOR */}
        <div className="mt-8 p-5 bg-gradient-to-br from-purple-50/70 via-white to-indigo-50/70 dark:from-slate-900 dark:via-slate-800 dark:to-purple-950/40 rounded-2xl border border-purple-200 dark:border-purple-800 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-purple-100 dark:border-purple-800/60 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-purple-600 text-white rounded-lg">
                  <Calculator className="w-4 h-4" />
                </div>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                  Interaktív Sokszög-Vizualizáló és Kalkulátor
                </h4>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Válassz oldalszámot, és figyeld meg az átlók és szögek változását valós időben!
              </p>
            </div>

            {/* Buttons for N */}
            <div className="flex flex-wrap gap-1.5 items-center">
              {[3, 4, 5, 6, 7, 8, 10, 12].map(n => (
                <button
                  key={n}
                  onClick={() => setSelectedN(n)}
                  className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                    selectedN === n
                      ? 'bg-purple-600 text-white shadow-sm shadow-purple-300 dark:shadow-none scale-105'
                      : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-purple-50 dark:hover:bg-slate-600 border border-slate-200 dark:border-slate-600'
                  }`}
                >
                  {n}-szög
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-4 items-center">
            {/* SVG Visualizer */}
            <div className="lg:col-span-6 flex flex-col items-center">
              <div className="relative w-full max-w-[280px] aspect-square bg-white dark:bg-slate-900/90 rounded-2xl border border-slate-200 dark:border-slate-700 p-2 shadow-inner flex items-center justify-center">
                <svg viewBox="0 0 260 230" className="w-full h-full">
                  <defs>
                    <linearGradient id="polyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#9333ea" stopOpacity="0.08" />
                      <stop offset="100%" stopColor="#6366f1" stopOpacity="0.12" />
                    </linearGradient>
                  </defs>

                  {/* Triangulation fill paths */}
                  {viewMode === 'triangulation' && selectedN > 3 && (
                    vertices.slice(1, -1).map((v, i) => (
                      <polygon
                        key={i}
                        points={`${vertices[0].x},${vertices[0].y} ${v.x},${v.y} ${vertices[i + 2].x},${vertices[i + 2].y}`}
                        fill={i % 2 === 0 ? 'rgba(147, 51, 234, 0.1)' : 'rgba(99, 102, 241, 0.14)'}
                        stroke="none"
                      />
                    ))
                  )}

                  {/* Polygon body */}
                  <polygon
                    points={polygonPointsStr}
                    fill="url(#polyGrad)"
                    className="stroke-purple-600 dark:stroke-purple-400 stroke-[2.5]"
                  />

                  {/* Diagonals */}
                  {viewMode === 'all-diagonals' && (
                    vertices.map((v1, i) =>
                      vertices.slice(i + 2, i + selectedN - 1).map((v2, j) => (
                        <line
                          key={`${i}-${j}`}
                          x1={v1.x}
                          y1={v1.y}
                          x2={v2.x}
                          y2={v2.y}
                          className="stroke-indigo-400/70 dark:stroke-indigo-400/60 stroke-[1.5] stroke-dasharray-[2,2]"
                        />
                      ))
                    )
                  )}

                  {(viewMode === 'vertex-diagonals' || viewMode === 'triangulation') && selectedN > 3 && (
                    vertices.slice(2, -1).map((v, i) => (
                      <line
                        key={i}
                        x1={vertices[0].x}
                        y1={vertices[0].y}
                        x2={v.x}
                        y2={v.y}
                        className="stroke-rose-500 dark:stroke-rose-400 stroke-2"
                      />
                    ))
                  )}

                  {/* Vertices points */}
                  {vertices.map((v, i) => (
                    <g key={i}>
                      <circle
                        cx={v.x}
                        cy={v.y}
                        r={i === 0 && (viewMode === 'vertex-diagonals' || viewMode === 'triangulation') ? 6 : 4}
                        className={
                          i === 0 && (viewMode === 'vertex-diagonals' || viewMode === 'triangulation')
                            ? 'fill-rose-500 stroke-white stroke-2'
                            : 'fill-purple-600 stroke-white stroke-[1.5]'
                        }
                      />
                      <text
                        x={v.x}
                        y={v.y < 115 ? v.y - 8 : v.y + 14}
                        textAnchor="middle"
                        className="text-[10px] font-bold fill-slate-700 dark:fill-slate-300"
                      >
                        {String.fromCharCode(65 + i)}
                      </text>
                    </g>
                  ))}
                </svg>
              </div>

              {/* View mode toggle */}
              <div className="flex gap-1.5 mt-3">
                <button
                  onClick={() => setViewMode('all-diagonals')}
                  className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg transition-colors ${
                    viewMode === 'all-diagonals'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600'
                  }`}
                >
                  Összes átló ({dn} db)
                </button>
                <button
                  onClick={() => setViewMode('vertex-diagonals')}
                  className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg transition-colors ${
                    viewMode === 'vertex-diagonals'
                      ? 'bg-rose-600 text-white'
                      : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600'
                  }`}
                >
                  1 csúcsból ({d1} db)
                </button>
                <button
                  onClick={() => setViewMode('triangulation')}
                  className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg transition-colors ${
                    viewMode === 'triangulation'
                      ? 'bg-purple-600 text-white'
                      : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600'
                  }`}
                >
                  Háromszögek ({h} db)
                </button>
              </div>
            </div>

            {/* Calculations Card */}
            <div className="lg:col-span-6 space-y-3">
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                  <div className="text-slate-500 dark:text-slate-400 text-[11px]">Egy csúcsból induló átlók</div>
                  <div className="text-base font-black text-rose-600 dark:text-rose-400 mt-0.5">
                    {d1} db
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1">
                    Képlet: <MathText text="d_1 = n - 3" inline /> ({selectedN} - 3)
                  </div>
                </div>

                <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                  <div className="text-slate-500 dark:text-slate-400 text-[11px]">Kapott háromszögek száma</div>
                  <div className="text-base font-black text-purple-600 dark:text-purple-400 mt-0.5">
                    {h} db
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1">
                    Képlet: <MathText text="h = n - 2" inline /> ({selectedN} - 2)
                  </div>
                </div>

                <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                  <div className="text-slate-500 dark:text-slate-400 text-[11px]">Összes átló száma</div>
                  <div className="text-base font-black text-indigo-600 dark:text-indigo-400 mt-0.5">
                    {dn} db
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1">
                    Képlet: <MathText text="\frac{n(n-3)}{2}" inline /> ({selectedN}·{d1}/2)
                  </div>
                </div>

                <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                  <div className="text-slate-500 dark:text-slate-400 text-[11px]">Belső szögek összege</div>
                  <div className="text-base font-black text-teal-600 dark:text-teal-400 mt-0.5">
                    {sumAngle}°
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1">
                    Képlet: <MathText text="(n-2)\cdot 180^\circ" inline /> ({h} · 180°)
                  </div>
                </div>
              </div>

              <div className="p-3 bg-purple-100/60 dark:bg-purple-950/50 rounded-xl border border-purple-200 dark:border-purple-800 text-xs">
                <span className="font-bold text-purple-900 dark:text-purple-200">
                  Ha szabályos a(z) {selectedN}-szög:
                </span>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div>
                    <span className="text-slate-600 dark:text-slate-400 text-[11px]">1 belső szög (α): </span>
                    <strong className="text-purple-700 dark:text-purple-300 font-black">{singleAngle}°</strong>
                  </div>
                  <div>
                    <span className="text-slate-600 dark:text-slate-400 text-[11px]">1 külső szög (α'): </span>
                    <strong className="text-indigo-700 dark:text-indigo-300 font-black">{extAngle}°</strong>
                  </div>
                </div>
                <div className="mt-1 text-[10px] text-slate-500 dark:text-slate-400">
                  Ellenőrzés: <MathText text={`\\alpha + \\alpha' = ${singleAngle}^\\circ + ${extAngle}^\\circ = 180^\\circ`} inline />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Összehasonlító kártyák konkrét sokszögekre */}
        <div className="mt-8">
          <h4 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider mb-3">
            Példák az átlók számára nevezetes sokszögekben:
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
              <div className="font-bold text-slate-800 dark:text-slate-200">Négyszög (n = 4)</div>
              <div className="text-lg font-black text-indigo-600 my-1">2 átló</div>
              <div className="text-[11px] text-slate-500">
                <MathText text="d_4 = \frac{4 \cdot 1}{2} = 2" inline />
              </div>
            </div>
            <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
              <div className="font-bold text-slate-800 dark:text-slate-200">Ötszög (n = 5)</div>
              <div className="text-lg font-black text-purple-600 my-1">5 átló</div>
              <div className="text-[11px] text-slate-500">
                <MathText text="d_5 = \frac{5 \cdot 2}{2} = 5" inline />
              </div>
            </div>
            <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
              <div className="font-bold text-slate-800 dark:text-slate-200">Hatszög (n = 6)</div>
              <div className="text-lg font-black text-rose-600 my-1">9 átló</div>
              <div className="text-[11px] text-slate-500">
                <MathText text="d_6 = \frac{6 \cdot 3}{2} = 9" inline />
              </div>
            </div>
            <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
              <div className="font-bold text-slate-800 dark:text-slate-200">Nyolcszög (n = 8)</div>
              <div className="text-lg font-black text-teal-600 my-1">20 átló</div>
              <div className="text-[11px] text-slate-500">
                <MathText text="d_8 = \frac{8 \cdot 5}{2} = 20" inline />
              </div>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 2. FEJEZET: BELSŐ ÉS KÜLSŐ SZÖGEK ÖSSZEGE */}
      <TheorySection
        id="fejezet-2"
        number={2}
        title="Belső és külső szögek összege"
        badge="SZÖGÖSSZEG TÉTELEK"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard
            title="A belső szögek összege tétel"
            icon={<Target className="w-5 h-5 text-purple-600" />}
          >
            <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">
              Bármely konvex <MathText text="n" inline />-oldalú sokszög belső szögeinek összege:
            </p>
            <div className="my-3 p-3 bg-purple-50 dark:bg-purple-950/40 rounded-xl border border-purple-200 dark:border-purple-800 text-center">
              <div className="text-sm font-black text-purple-700 dark:text-purple-300">
                <MathText text="S_n = (n - 2) \cdot 180^\circ" inline />
              </div>
            </div>
            <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">
              <strong>Miért éppen ennyi?</strong> Mert egyetlen csúcsból meghúzva az összes átlót, a sokszöget pontosan <MathText text="n - 2" inline /> darab háromszögre osztjuk. Mivel minden háromszög belső szögeinek összege <MathText text="180^\circ" inline />, és e háromszögek szögei hézagmentesen kitöltik a sokszög belső szögeit, így az összegük <MathText text="(n - 2) \cdot 180^\circ" inline />.
            </p>
          </TheoryCard>

          <TheoryCard
            title="A külső szögek összege tétel"
            icon={<Sparkles className="w-5 h-5 text-indigo-600" />}
          >
            <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">
              Bármely konvex sokszög külső szögeinek összege <strong>független az oldalak számától</strong>:
            </p>
            <div className="my-3 p-3 bg-indigo-50 dark:bg-indigo-950/40 rounded-xl border border-indigo-200 dark:border-indigo-800 text-center">
              <div className="text-sm font-black text-indigo-700 dark:text-indigo-300">
                <MathText text="\sum \alpha_i' = 360^\circ \quad (\text{mindig állandó!})" inline />
              </div>
            </div>
            <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">
              <strong>Bizonyítás:</strong> Minden csúcsnál a belső és a hozzá tartozó külső szög egyenesszöget alkot (<MathText text="\alpha_i + \alpha_i' = 180^\circ" inline />). Az <MathText text="n" inline /> csúcsnál ez összesen <MathText text="n \cdot 180^\circ" inline />. Ebből kivonva a belső szögek összegét:
            </p>
            <div className="mt-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
              <MathText text="n \cdot 180^\circ - (n - 2) \cdot 180^\circ = 2 \cdot 180^\circ = 360^\circ" inline />
            </div>
          </TheoryCard>
        </div>

        {/* Mintapélda levezetéssel */}
        <div className="mt-6 p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2 py-0.5 bg-teal-100 dark:bg-teal-900/60 text-teal-700 dark:text-teal-300 font-bold text-xs rounded-md">
              Mintapélda
            </span>
            <h4 className="font-bold text-slate-800 dark:text-white text-xs">
              Hiányzó szög meghatározása konvex ötszögben
            </h4>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300">
            Egy konvex ötszög négy belső szöge: <MathText text="110^\circ, 95^\circ, 125^\circ" inline /> és <MathText text="80^\circ" inline />. Mekkora az ötödik belső szög, és mekkora a hozzá tartozó külső szög?
          </p>
          <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className="p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
              <div className="font-semibold text-purple-600 dark:text-purple-400">1. Lépés: Belső szögek összege</div>
              <div className="mt-1">
                <MathText text="S_5 = (5 - 2) \cdot 180^\circ = 3 \cdot 180^\circ = 540^\circ" inline />
              </div>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
              <div className="font-semibold text-teal-600 dark:text-teal-400">2. Lépés: Ismert szögek összege és kivonás</div>
              <div className="mt-1">
                <MathText text="110^\circ + 95^\circ + 125^\circ + 80^\circ = 410^\circ" inline /><br />
                <MathText text="\alpha_5 = 540^\circ - 410^\circ = \mathbf{130^\circ}" inline />
              </div>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl">
              <div className="font-semibold text-indigo-600 dark:text-indigo-400">3. Lépés: Külső szög kiszámítása</div>
              <div className="mt-1">
                <MathText text="\alpha_5' = 180^\circ - 130^\circ = \mathbf{50^\circ}" inline />
              </div>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 3. FEJEZET: SZABÁLYOS SOKSZÖGEK */}
      <TheorySection
        id="fejezet-3"
        number={3}
        title="Szabályos sokszögek és szimmetriáik"
        badge="SZABÁLYOS ALAKZATOK"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard
            title="Szabályos sokszög definíciója és képletei"
            icon={<Compass className="w-5 h-5 text-purple-600" />}
          >
            <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">
              Egy sokszög <strong>szabályos</strong>, ha <strong>minden oldala egyenlő hosszúságú</strong> és <strong>minden belső szöge egyenlő nagyságú</strong>.
            </p>
            <div className="mt-3 space-y-2 text-xs">
              <div className="p-2.5 bg-purple-50 dark:bg-purple-950/40 rounded-lg border border-purple-200 dark:border-purple-800">
                <span className="font-semibold text-purple-900 dark:text-purple-200">Egy belső szög nagysága:</span>
                <div className="mt-1 font-bold text-purple-700 dark:text-purple-300">
                  <MathText text="\alpha = \frac{S_n}{n} = \frac{(n - 2) \cdot 180^\circ}{n}" inline />
                </div>
              </div>
              <div className="p-2.5 bg-indigo-50 dark:bg-indigo-950/40 rounded-lg border border-indigo-200 dark:border-indigo-800">
                <span className="font-semibold text-indigo-900 dark:text-indigo-200">Egy külső szög nagysága:</span>
                <div className="mt-1 font-bold text-indigo-700 dark:text-indigo-300">
                  <MathText text="\alpha' = \frac{360^\circ}{n} \quad \implies \quad \alpha = 180^\circ - \alpha'" inline />
                </div>
              </div>
            </div>
          </TheoryCard>

          <TheoryCard
            title="Szimmetriatengelyek száma"
            icon={<Layers className="w-5 h-5 text-teal-600" />}
          >
            <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300">
              Egy szabályos <MathText text="n" inline />-oldalú sokszögnek mindig <strong>pontosan <MathText text="n" inline /> darab szimmetriatengelye</strong> van!
            </p>
            <ul className="list-disc pl-4 mt-2 space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
              <li>
                <strong>Páratlan oldalszám esetén (pl. 3, 5):</strong> minden szimmetriatengely egy csúcsot köt össze a szemközti oldal felezőpontjával.
              </li>
              <li>
                <strong>Páros oldalszám esetén (pl. 4, 6, 8):</strong> <MathText text="n / 2" inline /> tengely köti össze a szemközti csúcspárokat, és <MathText text="n / 2" inline /> tengely köti össze a szemközti oldalfelezőket.
              </li>
            </ul>
            <div className="mt-3 p-2 bg-teal-50 dark:bg-teal-950/40 rounded-lg text-xs font-semibold text-teal-800 dark:text-teal-200">
              Középpontosan szimmetrikus a szabályos sokszög, ha az oldalszáma (<MathText text="n" inline />) <strong>PÁROS</strong>!
            </div>
          </TheoryCard>
        </div>

        {/* Nagy összefoglaló táblázat */}
        <div className="mt-6">
          <h4 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider mb-2">
            Szabályos sokszögek értékei összefoglaló táblázatban
          </h4>
          <TheoryTable
            headers={[
              'Sokszög',
              'Oldalszám (n)',
              'Átlók összesen (dn)',
              'Belső szögek összege (Sn)',
              'Egy belső szög (α)',
              'Egy külső szög (α\')',
              'Tengelyek'
            ]}
            rows={[
              ['Szabályos háromszög', '3', '0', '180°', '60°', '120°', '3'],
              ['Négyzet', '4', '2', '360°', '90°', '90°', '4'],
              ['Szabályos ötszög', '5', '5', '540°', '108°', '72°', '5'],
              ['Szabályos hatszög', '6', '9', '720°', '120°', '60°', '6'],
              ['Szabályos nyolcszög', '8', '20', '1080°', '135°', '45°', '8'],
              ['Szabályos tízszög', '10', '35', '1440°', '144°', '36°', '10'],
              ['Szabályos tizenkétszög', '12', '54', '1800°', '150°', '30°', '12']
            ]}
          />
        </div>
      </TheorySection>

      {/* 4. FEJEZET: TIPUSOK ÉS CSAPDÁK */}
      <TheorySection
        id="fejezet-4"
        number={4}
        title="Gyakori hibák és típusfeladatok"
        badge="CSAPDÁK ÉS TIPPEK"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryTrapBox
            title="Csapda: Elfelejteni elosztani kettővel az átlók számát!"
            trap="„Hatszögnek 6 · 3 = 18 átlója van.” – HIBÁS!"
            solution="Az n · (n - 3) szorzat minden átlót kétszer számol (egyszer az A csúcsból C-be, egyszer C-ből A-ba). Ezért kötelező elosztani 2-vel: dn = 6 · 3 / 2 = 9 átló!"
          />

          <TheoryTrapBox
            title="Csapda: Belső szög osztása általános sokszögben!"
            trap="„Egy ötszög belső szögeinek összege 540°, ezért minden szöge 540° / 5 = 108°.” – NEM MINDIG IGAZ!"
            solution="Csak SZABÁLYOS ötszög esetén egyenlők a szögek! Egy általános (nem szabályos) ötszög szögei tetszőlegesek lehetnek, csak az összegük kötött (540°)."
          />
        </div>

        <div className="mt-4 p-4 bg-purple-50 dark:bg-purple-950/40 rounded-2xl border border-purple-200 dark:border-purple-800 text-xs">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <strong className="text-purple-900 dark:text-purple-200">Villámtipp a számoláshoz:</strong>
          </div>
          <p className="mt-1.5 text-slate-700 dark:text-slate-300">
            Szabályos sokszög belső szögét sokkal gyorsabb a <strong>külső szögből</strong> kiszámolni!
            Például szabályos nyolcszög esetén:
            <br />
            1. Külső szög: <MathText text="\alpha' = 360^\circ : 8 = 45^\circ" inline />
            <br />
            2. Belső szög: <MathText text="\alpha = 180^\circ - 45^\circ = 135^\circ" inline />.
            Ez sokkal kényelmesebb fejben, mint a <MathText text="(8 - 2) \cdot 180^\circ : 8 = 1080^\circ : 8 = 135^\circ" inline /> művelet!
          </p>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default PolygonAnglesDiagonalsTheory;
