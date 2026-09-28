import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  GeometryFigureCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable
} from '../TheoryTemplate';
import { Button } from '@/components/ui/button';
import {
  MonitorPlay,
  Compass,
  Shapes,
  Maximize2,
  RefreshCw,
  Target,
  Sparkles,
  Move,
  MousePointer,
  Circle,
  HelpCircle,
  CheckCircle2,
  XCircle,
  Layers,
  ArrowRightLeft
} from 'lucide-react';
import { MathText } from '@/components/math/shared/MathText';

interface GeometrySoftwareTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

type ExperimentType = 'circumcircle' | 'incircle' | 'robustness';

export const GeometrySoftwareTheory: React.FC<GeometrySoftwareTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // Interactive experiment selector
  const [selectedExperiment, setSelectedExperiment] = useState<ExperimentType>('circumcircle');
  // Dynamic vertex C position for interactive simulation (-40 to +40 offset)
  const [vertexCOffset, setVertexCOffset] = useState<number>(0);

  // Interactive quick self-check question
  const [selfTestAnswer, setSelfTestAnswer] = useState<number | null>(null);
  const [selfTestSubmitted, setSelfTestSubmitted] = useState<boolean>(false);

  return (
    <TheoryTemplate
      documentId="grade-8-geometria-hasznaljunk-szerkesztoprogramot"
      pdfFilename="8_osztaly_geometria_hasznaljunk_szerkesztoprogramot_tananyag.pdf"
      title="3. Használjunk szerkesztőprogramot!"
      subtitle="Dinamikus geometriai szoftverek (GeoGebra), mértani helyek, kötöttségek és digitális szerkesztések"
      emoji="💻"
      topicBadge="8. Osztály • II. Témakör: Geometria"
      badgeText="8. Osztály • Matematika"
      estimatedReadTime="12 perc"
      difficulty="Közepes"
      quickRule={{
        label: "Fontos szabály: Rajzolás vs. Szerkesztés",
        formula: "Szemre rajz: szétesik mozgatáskor  |  Dinamikus szerkesztés: megőrzi a geometriai relációkat"
      }}
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      themeColor="cyan"
      grade={8}
      chapterId="geometria"
      topicId="g8-geom-software"
    >
      {/* 1. SZEKCIÓ: A DINAMIKUS GEOMETRIA ALAPELVE */}
      <TheorySection
        number={1}
        title="A dinamikus geometria alapelve és filozófiája"
        icon={<MonitorPlay className="w-5 h-5 text-cyan-600" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard
            title="Mi a dinamikus geometria?"
            icon={<Move className="w-4 h-4 text-cyan-600" />}
            tag="Alapelv"
          >
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
              A hagyományos papíron készített rajz statikus: ha megrajzolunk egy háromszöget, az csak egyetlen konkrét esetet mutat.
              A <strong>dinamikus geometriai programokban</strong> (pl. <em>GeoGebra</em>, <em>Cabri</em>) az alakzatok pontjai, egyenesei és körei matematikai <strong>kötöttségekkel (relációkkal)</strong> vannak egymáshoz láncolva.
            </p>
            <div className="p-3 bg-cyan-50/70 dark:bg-cyan-950/40 rounded-xl border border-cyan-200 dark:border-cyan-800 text-xs space-y-1.5 font-sans">
              <div><strong>Vonszolási teszt (Drag-test):</strong> ha egy szabad csúcsot egérrel megragadunk és elhúzunk, a kötött elemek valós időben követik a mozgást.</div>
              <div><strong>Sejtések ellenőrzése:</strong> másodpercek alatt vizsgálhatunk meg több száz különböző háromszöget, ellenőrizve, hogy egy tétel mindig érvényes-e.</div>
            </div>
          </TheoryCard>

          <TheoryCard
            title="Független (szabad) és Függő (kötött) objektumok"
            icon={<Target className="w-4 h-4 text-emerald-600" />}
            tag="Objektum-hierarchia"
          >
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
              A szerkesztőszoftverek szigorú matematikai függőségi fát építenek:
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <strong className="text-cyan-700 dark:text-cyan-300">Szabad (független) pont:</strong> a sík bármely pontjára szabadon letesszük és elhúzhatjuk (pl. a háromszög <MathText>A</MathText>, <MathText>B</MathText> csúcsa).
              </li>
              <li>
                <strong className="text-indigo-700 dark:text-indigo-300">Úton lévő (részben kötött) pont:</strong> egy egyenesre vagy körre rögzített pont, csak a vonal mentén csúsztatható.
              </li>
              <li>
                <strong className="text-purple-700 dark:text-purple-300">Függő (kötött) objektum:</strong> más elemekből van kiszerkesztve (pl. két egyenes metszéspontja, felezőpont, szögfelező). Önmagában nem húzható, helyzete kizárólag a szülő-objektumoktól függ!
              </li>
            </ul>
          </TheoryCard>
        </div>

        <GeometryFigureCard
          title="Dinamikus vonszolás és reláció-megőrzés"
          caption="A C csúcs elmozdításakor a háromszög alakja megváltozik, de a magasságvonalak szigorúan merőlegesek maradnak, és metszéspontjuk (M) valós időben követi a tételt."
        >
          <svg viewBox="0 0 460 140" className="w-full max-w-lg mx-auto h-auto">
            <defs>
              <pattern id="gridSoft" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#cbd5e1" strokeWidth="0.5" strokeOpacity="0.4" />
              </pattern>
            </defs>
            <rect width="460" height="140" fill="url(#gridSoft)" />

            {/* Triangle 1: Original */}
            <polygon points="50,110 130,110 80,40" fill="#cffafe" stroke="#0891b2" strokeWidth="2" />
            <line x1="80" y1="40" x2="80" y2="110" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="3 2" />
            <circle cx="50" cy="110" r="3.5" fill="#0e7490" />
            <circle cx="130" cy="110" r="3.5" fill="#0e7490" />
            <circle cx="80" cy="40" r="4.5" fill="#0284c7" />
            <text x="76" y="32" className="text-[10px] font-black fill-cyan-900">C</text>
            <text x="40" y="122" className="text-[9px] font-bold fill-cyan-900">A</text>
            <text x="135" y="122" className="text-[9px] font-bold fill-cyan-900">B</text>
            <text x="60" y="128" className="text-[8px] font-bold fill-slate-500">1. állapot (hegyesszögű)</text>

            {/* Drag arrow */}
            <path d="M 170 65 L 230 65" fill="none" stroke="#6366f1" strokeWidth="2.5" />
            <polygon points="234,65 226,60 226,70" fill="#6366f1" />
            <circle cx="180" cy="65" r="2" fill="#6366f1" />
            <text x="175" y="55" className="text-[9px] font-bold fill-indigo-700">Vonszolás (C → C')</text>

            {/* Triangle 2: Dragged to obtuse */}
            <polygon points="270,110 350,110 390,40" fill="#ede9fe" stroke="#6366f1" strokeWidth="2" />
            <line x1="390" y1="40" x2="390" y2="110" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="3 2" />
            <line x1="350" y1="110" x2="390" y2="110" stroke="#94a3b8" strokeWidth="1.2" strokeDasharray="2 2" />
            <circle cx="270" cy="110" r="3.5" fill="#4338ca" />
            <circle cx="350" cy="110" r="3.5" fill="#4338ca" />
            <circle cx="390" cy="40" r="4.5" fill="#8b5cf6" />
            <text x="395" y="38" className="text-[10px] font-black fill-purple-900">C'</text>
            <text x="260" y="122" className="text-[9px] font-bold fill-purple-900">A</text>
            <text x="345" y="122" className="text-[9px] font-bold fill-purple-900">B</text>
            <text x="280" y="128" className="text-[8px] font-bold fill-slate-500">2. állapot (tompaszögű: ma kívülre esik!)</text>
          </svg>
        </GeometryFigureCard>
      </TheorySection>

      {/* 2. SZEKCIÓ: ALAPVETŐ SZOFTVERES ESZKÖZKÉSZLET */}
      <TheorySection
        number={2}
        title="Alapvető szoftveres eszközkészlet és matematikai hátterük"
        icon={<Compass className="w-5 h-5 text-cyan-600" />}
      >
        <TheoryCallout type="tip" title="A szoftveres eszközök mindig matematikai definíciókat valósítanak meg!">
          Amikor rákattintasz a <em>Szakaszfelező merőleges</em> vagy <em>Szögfelező</em> ikonra, a program nem „hozzávetőleges vonalat húz”, hanem a mögöttes analitikus geometriai egyenleteket számítja ki azonnal.
        </TheoryCallout>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 my-4">
          <div className="p-3.5 rounded-xl border-2 border-cyan-200 dark:border-cyan-800 bg-cyan-50/60 dark:bg-cyan-950/30">
            <div className="flex items-center gap-1.5 font-black text-xs text-cyan-900 dark:text-cyan-200 mb-1.5">
              <span className="w-5 h-5 rounded-md bg-cyan-600 text-white flex items-center justify-center text-[10px]">1</span>
              Szakaszfelező merőleges
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              Két pont (<MathText>A</MathText> és <MathText>B</MathText>) kiválasztásakor automatikusan előállítja az <MathText>|PA| = |PB|</MathText> mértani helyet.
            </p>
            <div className="mt-2 text-[11px] font-mono text-cyan-700 dark:text-cyan-400 bg-white/70 dark:bg-slate-900/60 p-1.5 rounded">
              Alkalmazás: Köré írt kör középpontjának (O) megszerkesztése.
            </div>
          </div>

          <div className="p-3.5 rounded-xl border-2 border-indigo-200 dark:border-indigo-800 bg-indigo-50/60 dark:bg-indigo-950/30">
            <div className="flex items-center gap-1.5 font-black text-xs text-indigo-900 dark:text-indigo-200 mb-1.5">
              <span className="w-5 h-5 rounded-md bg-indigo-600 text-white flex items-center justify-center text-[10px]">2</span>
              Szögfelező eszköz
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              Három pont (vagy két egyenes) kijelölésével megadja a szárakra merőleges távolságok egyenlőségét (<MathText>{"d(P, e) = d(P, f)"}</MathText>).
            </p>
            <div className="mt-2 text-[11px] font-mono text-indigo-700 dark:text-indigo-400 bg-white/70 dark:bg-slate-900/60 p-1.5 rounded">
              Alkalmazás: Háromszög beírt köre középpontjának (K) megszerkesztése.
            </div>
          </div>

          <div className="p-3.5 rounded-xl border-2 border-emerald-200 dark:border-emerald-800 bg-emerald-50/60 dark:bg-emerald-950/30">
            <div className="flex items-center gap-1.5 font-black text-xs text-emerald-900 dark:text-emerald-200 mb-1.5">
              <span className="w-5 h-5 rounded-md bg-emerald-600 text-white flex items-center justify-center text-[10px]">3</span>
              Metszéspont (Intersects)
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              Két tetszőleges objektum (egyenes, kör, parabola) közös pontjait automatikusan generálja és folyamatosan újraszámolja.
            </p>
            <div className="mt-2 text-[11px] font-mono text-emerald-700 dark:text-emerald-400 bg-white/70 dark:bg-slate-900/60 p-1.5 rounded">
              Halmazelmélet: <MathText>{"e \\cap f"}</MathText>, <MathText>{"k_1 \\cap k_2"}</MathText>.
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 3. SZEKCIÓ: INTERAKTÍV SZOFTVERES KÍSÉRLETEZŐ LABOR */}
      <TheorySection
        number={3}
        title="Interaktív labor: dinamikus geometriai kísérletek"
        icon={<Sparkles className="w-5 h-5 text-cyan-600" />}
      >
        <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 via-cyan-950 to-slate-900 text-white shadow-lg border border-cyan-800">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <div className="text-xs font-black uppercase tracking-wider text-cyan-300 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              Válassz konstrukciót és teszteld a dinamikus viselkedést!
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-900/80 text-cyan-200 border border-cyan-700">
              Interaktív szimuláció
            </span>
          </div>

          {/* Mode Switcher Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-4">
            <button
              onClick={() => setSelectedExperiment('circumcircle')}
              className={`p-2.5 rounded-xl text-xs font-bold transition-all text-center border ${
                selectedExperiment === 'circumcircle'
                  ? 'bg-cyan-500 text-white border-cyan-300 shadow-md font-black'
                  : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-800'
              }`}
            >
              1. Köré írt kör (Felezőmerőlegesek)
            </button>
            <button
              onClick={() => setSelectedExperiment('incircle')}
              className={`p-2.5 rounded-xl text-xs font-bold transition-all text-center border ${
                selectedExperiment === 'incircle'
                  ? 'bg-cyan-500 text-white border-cyan-300 shadow-md font-black'
                  : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-800'
              }`}
            >
              2. Beírt kör (Szögfelezők)
            </button>
            <button
              onClick={() => setSelectedExperiment('robustness')}
              className={`p-2.5 rounded-xl text-xs font-bold transition-all text-center border ${
                selectedExperiment === 'robustness'
                  ? 'bg-cyan-500 text-white border-cyan-300 shadow-md font-black'
                  : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-800'
              }`}
            >
              3. Szemre rajz vs. Kötött szerkesztés
            </button>
          </div>

          {/* Slider for dragging C vertex */}
          <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700 mb-4 flex items-center justify-between gap-4">
            <div className="text-xs font-bold text-cyan-300 flex items-center gap-1.5 shrink-0">
              <MousePointer className="w-4 h-4 text-cyan-400" />
              C csúcs vonszolása vízszintesen:
            </div>
            <input
              type="range"
              min="-40"
              max="40"
              value={vertexCOffset}
              onChange={(e) => setVertexCOffset(Number(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
            <span className="text-xs font-mono font-bold text-white shrink-0 w-12 text-right">
              {vertexCOffset > 0 ? `+${vertexCOffset}` : vertexCOffset} px
            </span>
          </div>

          {/* Live SVG Stage */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            <div className="md:col-span-7 bg-slate-950 p-3 rounded-xl border border-cyan-900/60 flex items-center justify-center min-h-[190px]">
              {selectedExperiment === 'circumcircle' && (
                <svg viewBox="0 0 300 170" className="w-full h-44">
                  {(() => {
                    const ax = 70, ay = 130;
                    const bx = 210, by = 130;
                    const cx = 135 + vertexCOffset, cy = 40;

                    const mabX = (ax + bx) / 2;
                    const mabY = (ay + by) / 2;
                    const macX = (ax + cx) / 2;
                    const macY = (ay + cy) / 2;

                    const circumY = macY - ((cx - ax) / (cy - ay)) * (mabX - macX);
                    const circumX = mabX;
                    const radius = Math.sqrt((circumX - ax) ** 2 + (circumY - ay) ** 2);

                    return (
                      <>
                        <circle cx={circumX} cy={circumY} r={radius} fill="none" stroke="#22d3ee" strokeWidth="1.8" strokeDasharray="4 3" opacity="0.8" />
                        <line x1={mabX} y1="10" x2={mabX} y2="160" stroke="#f59e0b" strokeWidth="1.2" strokeDasharray="3 2" />
                        <line x1={macX - 40} y1={macY - 40 * (- (cx - ax) / (cy - ay))} x2={macX + 40} y2={macY + 40 * (- (cx - ax) / (cy - ay))} stroke="#f59e0b" strokeWidth="1.2" strokeDasharray="3 2" />
                        <polygon points={`${ax},${ay} ${bx},${by} ${cx},${cy}`} fill="#0e7490" fillOpacity="0.25" stroke="#38bdf8" strokeWidth="2.2" />
                        <circle cx={ax} cy={ay} r="4" fill="#38bdf8" />
                        <circle cx={bx} cy={by} r="4" fill="#38bdf8" />
                        <circle cx={cx} cy={cy} r="5" fill="#f43f5e" />
                        <circle cx={circumX} cy={circumY} r="4" fill="#f59e0b" />
                        <text x={circumX + 6} y={circumY - 4} className="text-[10px] font-black fill-amber-300">O (Köré írt kör kp.)</text>
                        <text x={ax - 12} y={ay + 5} className="text-[10px] font-bold fill-white">A</text>
                        <text x={bx + 6} y={by + 5} className="text-[10px] font-bold fill-white">B</text>
                        <text x={cx - 4} y={cy - 8} className="text-[11px] font-black fill-rose-300">C</text>
                      </>
                    );
                  })()}
                </svg>
              )}

              {selectedExperiment === 'incircle' && (
                <svg viewBox="0 0 300 170" className="w-full h-44">
                  {(() => {
                    const ax = 70, ay = 135;
                    const bx = 220, by = 135;
                    const cx = 145 + vertexCOffset * 0.7, cy = 45;

                    const a = Math.sqrt((bx - cx) ** 2 + (by - cy) ** 2);
                    const b = Math.sqrt((ax - cx) ** 2 + (ay - cy) ** 2);
                    const c = Math.sqrt((ax - bx) ** 2 + (ay - by) ** 2);
                    const perimeter = a + b + c;

                    const inX = (a * ax + b * bx + c * cx) / perimeter;
                    const inY = (a * ay + b * by + c * cy) / perimeter;

                    const s = perimeter / 2;
                    const area = Math.sqrt(Math.max(1, s * (s - a) * (s - b) * (s - c)));
                    const inR = area / s;

                    return (
                      <>
                        <polygon points={`${ax},${ay} ${bx},${by} ${cx},${cy}`} fill="#164e63" fillOpacity="0.3" stroke="#06b6d4" strokeWidth="2.2" />
                        <line x1={ax} y1={ay} x2={inX + (inX - ax) * 0.8} y2={inY + (inY - ay) * 0.8} stroke="#a855f7" strokeWidth="1.2" strokeDasharray="3 2" />
                        <line x1={bx} y1={by} x2={inX + (inX - bx) * 0.8} y2={inY + (inY - by) * 0.8} stroke="#a855f7" strokeWidth="1.2" strokeDasharray="3 2" />
                        <line x1={cx} y1={cy} x2={inX + (inX - cx) * 0.8} y2={inY + (inY - cy) * 0.8} stroke="#a855f7" strokeWidth="1.2" strokeDasharray="3 2" />
                        <circle cx={inX} cy={inY} r={inR} fill="#10b981" fillOpacity="0.2" stroke="#10b981" strokeWidth="2" />
                        <circle cx={inX} cy={inY} r="3.5" fill="#10b981" />
                        <text x={inX + 6} y={inY - 4} className="text-[10px] font-black fill-emerald-300">K (Beírt kör kp.)</text>
                        <circle cx={ax} cy={ay} r="3.5" fill="#06b6d4" />
                        <circle cx={bx} cy={by} r="3.5" fill="#06b6d4" />
                        <circle cx={cx} cy={cy} r="4.5" fill="#f43f5e" />
                        <text x={cx - 4} y={cy - 7} className="text-[10px] font-black fill-rose-300">C</text>
                      </>
                    );
                  })()}
                </svg>
              )}

              {selectedExperiment === 'robustness' && (
                <svg viewBox="0 0 300 170" className="w-full h-44">
                  {/* Left: Hand drawn pseudo-square */}
                  <g>
                    <text x="30" y="25" className="text-[9px] font-bold fill-rose-400">Szemre rajzolt (szétesik):</text>
                    <polygon
                      points={`30,120 ${100 + vertexCOffset * 0.4},120 ${100 + vertexCOffset},55 30,55`}
                      fill="#881337"
                      fillOpacity="0.25"
                      stroke="#f43f5e"
                      strokeWidth="2"
                    />
                    <circle cx={100 + vertexCOffset} cy={55} r="4" fill="#f43f5e" />
                    <text x="35" y="95" className="text-[8px] font-bold fill-rose-200">
                      {vertexCOffset !== 0 ? '❌ Már nem négyzet!' : 'Csak 1 pontban jó'}
                    </text>
                  </g>

                  {/* Right: Rigid mathematical construction */}
                  <g>
                    <text x="170" y="25" className="text-[9px] font-bold fill-emerald-400">Kötött szerkesztés (stabil):</text>
                    <polygon
                      points="175,120 245,120 245,50 175,50"
                      fill="#064e3b"
                      fillOpacity="0.3"
                      stroke="#10b981"
                      strokeWidth="2"
                    />
                    <circle cx={175} cy={120} r="3.5" fill="#10b981" />
                    <circle cx={245} cy={120} r="3.5" fill="#10b981" />
                    <circle cx={245} cy={50} r="3.5" fill="#10b981" />
                    <circle cx={175} cy={50} r="3.5" fill="#10b981" />
                    <rect x="237" y="112" width="8" height="8" fill="none" stroke="#10b981" strokeWidth="1" />
                    <text x="180" y="90" className="text-[8px] font-bold fill-emerald-200">
                      ✅ Szigorúan 90° és a=b!
                    </text>
                  </g>
                </svg>
              )}
            </div>

            {/* Explanation side */}
            <div className="md:col-span-5 bg-slate-900/90 p-3.5 rounded-xl border border-cyan-900/60 text-xs space-y-2">
              {selectedExperiment === 'circumcircle' && (
                <>
                  <div className="font-black text-cyan-300 text-sm">Háromszög köré írt köre (O)</div>
                  <div><strong className="text-white">Matematikai szabály:</strong> a három oldalfelező merőleges egyetlen közös pontban metszi egymást.</div>
                  <div><strong className="text-white">Dinamikus megfigyelés:</strong></div>
                  <ul className="list-disc list-inside text-slate-300 space-y-1 pl-1 text-[11px]">
                    <li><strong>Hegyesszögű háromszög:</strong> az <MathText>O</MathText> pont a háromszög <em>belsejében</em> van.</li>
                    <li><strong>Derékszögű háromszög:</strong> az <MathText>O</MathText> pont pontosan az <em>átfogó felezőpontja</em> (Thalész-tétel!).</li>
                    <li><strong>Tompaszögű háromszög:</strong> az <MathText>O</MathText> pont a háromszögön <em>kívülre</em> kerül!</li>
                  </ul>
                </>
              )}

              {selectedExperiment === 'incircle' && (
                <>
                  <div className="font-black text-emerald-300 text-sm">Háromszög beírt köre (K)</div>
                  <div><strong className="text-white">Matematikai szabály:</strong> a három belső szögfelező egy pontban metszi egymást.</div>
                  <div><strong className="text-white">Dinamikus invariáns:</strong></div>
                  <ul className="list-disc list-inside text-slate-300 space-y-1 pl-1 text-[11px]">
                    <li>A beírt kör középpontja <strong>MINDIG a háromszög belsejében</strong> marad, bármilyen tompaszögűvé vagy lapossá vonszolod a csúcsot!</li>
                    <li>A kör mindhárom oldalt pontosan egy-egy pontban érinti.</li>
                  </ul>
                </>
              )}

              {selectedExperiment === 'robustness' && (
                <>
                  <div className="font-black text-rose-300 text-sm">Rajzolás vs. Valódi szerkesztés</div>
                  <div><strong className="text-white">Miért bukik el a szemre rajzolás?</strong></div>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    Ha egy négyzetet úgy készítünk el, hogy „ránézésre derékszögnek látszik”, nincs matematikai kényszer. Ha a csúcsot elhúzzuk, a szög azonnal eltorzul.
                  </p>
                  <div className="p-2 rounded bg-cyan-950/60 border border-cyan-800 text-[11px] text-cyan-200">
                    💡 <strong>A GeoGebra aranyszabálya:</strong> az a jó szerkesztés, amely <em>bármilyen vonszolás után is megtartja geometriai definícióját</em>!
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 4. SZEKCIÓ: TIPUSCSAPDA ÉS ÖSSZEHASONLÍTÓ TÁBLÁZAT */}
      <TheorySection
        number={4}
        title="Gyakori hibák és szerkesztési eljárások összehasonlítása"
        icon={<Layers className="w-5 h-5 text-cyan-600" />}
      >
        <TheoryTrapBox
          title="Típushiba felvételin és témazárón!"
          wrong="„Ha a képernyőn egy alakzat négyzetnek látszik, akkor az biztosan négyzetként van megszerkesztve.”"
          correct="„Csak az a szerkesztés tekinthető helyesnek, amely a vonszolási teszt (drag-test) során is megtartja a tulajdonságait!”"
          explanation="A szemre illesztett pontok nem tartalmaznak geometriai kötöttséget (pl. merőlegesség, szakaszhossz-egyenlőség). Amint elmozdítjuk valamelyik csúcsot, a szemre rajz szétesik. A szerkesztőszoftverben mindig merőlegessel, szakaszmásolással vagy körök metszésével kell biztosítani a szögek és oldalak állandóságát."
        />

        <div className="my-4">
          <TheoryTable
            headers={['Eszköz neve', 'Bemenet (mit kell kijelölni)', 'Kimenet (mit hoz létre)', 'Matematikai háttér']}
            rows={[
              [
                'Szakaszfelező merőleges',
                'Két pont vagy egy szakasz',
                'Egyenes',
                'A két végponttól egyenlő távol lévő pontok mértani helye (|PA| = |PB|)'
              ],
              [
                'Szögfelező',
                '3 pont (szár-csúcs-szár)',
                'Félegyenes / Egyenes',
                'A két szögszártól egyenlő távol lévő pontok mértani helye'
              ],
              [
                'Kör középponttal és sugárral',
                '1 pont és egy szám (sugár)',
                'Körvonal',
                'Adott ponttól r távolságra lévő pontok halmaza'
              ],
              [
                'Párhuzamos egyenes',
                'Egy egyenes és egy pont',
                'Egyenes',
                'Az adott ponton átmenő, adott egyenessel párhuzamos egyetlen egyenes'
              ],
              [
                'Metszéspont',
                'Két metsző vonal / kör',
                'Pont(ok)',
                'A két ponthalmaz metszete (közös pontok)'
              ]
            ]}
          />
        </div>
      </TheorySection>

      {/* 5. SZEKCIÓ: GYORS TUDÁSPRÓBA (ÖNELLENŐRZÉS) */}
      <TheorySection
        number={5}
        title="Gyors tudáspróba (Önellenőrzés)"
        icon={<HelpCircle className="w-5 h-5 text-cyan-600" />}
      >
        <div className="p-4 rounded-xl border-2 border-cyan-200 dark:border-cyan-900/60 bg-cyan-50/30 dark:bg-cyan-950/20">
          <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white mb-3">
            Egy geometriai szoftverben egy derékszögű háromszöget szerkesztünk, majd megrajzoljuk a három oldalfelező merőlegest. Hol metszi egymást a három felezőmerőleges?
          </p>

          <div className="space-y-2 mb-3">
            {[
              { id: 0, text: 'Mindig a háromszögön kívül, a derékszögű csúccsal szemben.' },
              { id: 1, text: 'Pontosan az átfogó felezőpontjában (Thalész-tétel alapján).' },
              { id: 2, text: 'A derékszögű csúcsban.' },
              { id: 3, text: 'A derékszögű háromszög oldalfelező merőlegesei sosem metszik egymást.' }
            ].map((option) => (
              <button
                key={option.id}
                onClick={() => {
                  setSelfTestAnswer(option.id);
                  setSelfTestSubmitted(true);
                }}
                className={`w-full p-2.5 rounded-lg text-xs font-semibold text-left transition-all border flex items-center justify-between ${
                  selfTestAnswer === option.id
                    ? option.id === 1
                      ? 'bg-emerald-100 dark:bg-emerald-950 border-emerald-500 text-emerald-950 dark:text-emerald-100 font-bold'
                      : 'bg-rose-100 dark:bg-rose-950 border-rose-500 text-rose-950 dark:text-rose-100 font-bold'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-cyan-400 text-slate-800 dark:text-slate-200'
                }`}
              >
                <span>{option.text}</span>
                {selfTestSubmitted && option.id === 1 && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 ml-2" />
                )}
                {selfTestSubmitted && selfTestAnswer === option.id && option.id !== 1 && (
                  <XCircle className="w-4 h-4 text-rose-600 shrink-0 ml-2" />
                )}
              </button>
            ))}
          </div>

          {selfTestSubmitted && (
            <div className={`p-3 rounded-lg text-xs ${
              selfTestAnswer === 1
                ? 'bg-emerald-100/80 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-200 border border-emerald-300'
                : 'bg-rose-100/80 dark:bg-rose-950/60 text-rose-900 dark:text-rose-200 border border-rose-300'
            }`}>
              {selfTestAnswer === 1 ? (
                <span>🎉 <strong>Kiváló válasz!</strong> Pontosan: a Thalész-tétel miatt a derékszögű háromszög köré írt körének középpontja mindig az átfogó felezőpontja, így a három szakaszfelező merőleges pontosan ott metszi egymást!</span>
              ) : (
                <span>⚠️ <strong>Nem egészen!</strong> A helyes válasz a 2.: Thalész tétele miatt a derékszögű háromszög köré írt kör középpontja az átfogó felezőpontjára esik. A három oldalfelező merőleges metszéspontja éppen ez a pont.</span>
              )}
            </div>
          )}
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default GeometrySoftwareTheory;
