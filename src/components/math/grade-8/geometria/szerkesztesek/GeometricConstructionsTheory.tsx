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
  Compass,
  Maximize2,
  Minimize2,
  Shapes,
  Sparkles,
  HelpCircle,
  CheckCircle2,
  XCircle,
  Lightbulb,
  Sliders,
  Ruler,
  Layers,
  ArrowRightLeft,
  Divide,
  Percent
} from 'lucide-react';
import { MathText } from '@/components/math/shared/MathText';

interface GeometricConstructionsTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

type ConstructionTab = 'ratio' | 'fourthProportional';

export const GeometricConstructionsTheory: React.FC<GeometricConstructionsTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // Tab selector for interactive simulator
  const [activeTab, setActiveTab] = useState<ConstructionTab>('ratio');

  // Ratio simulator state: m : k ratio (e.g. 2 : 3)
  const [mRatio, setMRatio] = useState<number>(2);
  const [kRatio, setKRatio] = useState<number>(3);

  // Fourth proportional state: a, b, c
  const [sideA, setSideA] = useState<number>(3);
  const [sideB, setSideB] = useState<number>(6);
  const [sideC, setSideC] = useState<number>(4);

  // Self-test states
  const [selfTestAnswer, setSelfTestAnswer] = useState<number | null>(null);
  const [selfTestSubmitted, setSelfTestSubmitted] = useState<boolean>(false);

  // Derived values for ratio simulator
  const totalUnits = mRatio + kRatio;
  const segmentLength = 280;
  const startX = 60;
  const startY = 150;
  const endX = startX + segmentLength;
  const endY = startY;

  // Auxiliary ray angle ~30 deg
  const rayAngle = -30 * (Math.PI / 180);
  const unitStep = 28;
  const rayPoints = Array.from({ length: totalUnits + 1 }, (_, i) => {
    return {
      x: startX + i * unitStep * Math.cos(rayAngle),
      y: startY + i * unitStep * Math.sin(rayAngle)
    };
  });

  const dividerPointRay = rayPoints[mRatio];
  const lastPointRay = rayPoints[totalUnits];

  // Point P on AB
  const dividerPx = startX + (mRatio / totalUnits) * segmentLength;
  const part1Length = ((mRatio / totalUnits) * 10).toFixed(1);
  const part2Length = ((kRatio / totalUnits) * 10).toFixed(1);

  // Derived fourth proportional: x = (b * c) / a
  const computedX = ((sideB * sideC) / sideA).toFixed(1);

  return (
    <TheoryTemplate
      documentId="grade-8-geometria-szerkesztesek"
      pdfFilename="8_osztaly_geometria_szerkesztesek_tananyag.pdf"
      title="6. Szerkesztések (Kiegészítő tananyag)"
      subtitle="Szakasz felosztása adott arányban, negyedik és harmadik arányos szerkesztése, méretarányos háromszögek"
      emoji="🧭"
      topicBadge="8. Osztály • II. Témakör: Geometria"
      badgeText="8. Osztály • Matematika"
      estimatedReadTime="14 perc"
      quickRule={{
        label: "Szerkesztések Alapösszefüggései",
        formula: "Szakaszosztás: AP / PB = m / k   |   Negyedik arányos: x = (b · c) / a   |   Körző + Vonalzó"
      }}
      themeColor="amber"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
    >
      {/* SECTION 1: A Klasszikus Euklideszi Szerkesztések Alapjai */}
      <TheorySection
        number={1}
        title="A klasszikus szerkesztések alapjai és eszköztára"
        badge="Euklideszi alapelvek"
      >
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-base">
          Az ókori görög matematikus, Eukleidész óta a geometria legtisztább ágát a <strong>szerkesztések</strong> jelentik.
          A klasszikus szerkesztések során <strong>kizárólag két eszközt</strong> használhatunk:
          egy <strong>körzőt</strong> (körök és szakaszok átvitelére) és egy <strong>beosztás nélküli egyenes vonalzót</strong> (két pontot összekötő egyenes húzására).
          Tilos a szögmérő vagy a vonalzó milliméteres skálájának közvetlen leolvasása!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          <TheoryCard
            title="A két engedélyezett alapeszköz"
            icon={<Compass className="w-5 h-5 text-amber-600" />}
            color="amber"
          >
            <div className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
              <div className="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-lg">
                <strong className="text-amber-900 dark:text-amber-200">1. Beosztás nélküli vonalzó:</strong>
                <p className="text-xs mt-1 text-slate-600 dark:text-slate-400">
                  Bármely két adott ponton át egyenes húzható, vagy két pont összeköthető szakasszal. Mérni vele nem szabad!
                </p>
              </div>
              <div className="p-3 bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-800 rounded-lg">
                <strong className="text-orange-900 dark:text-orange-200">2. Körző:</strong>
                <p className="text-xs mt-1 text-slate-600 dark:text-slate-400">
                  Egy adott középpont körül adott sugárral kör vagy körív rajzolható, valamint adott szakasz hossza más helyre átvihető.
                </p>
              </div>
            </div>
          </TheoryCard>

          <TheoryCard
            title="Alapszerkesztések felidézése"
            icon={<Shapes className="w-5 h-5 text-blue-600" />}
            color="blue"
          >
            <ul className="text-sm text-slate-700 dark:text-slate-300 space-y-2 list-disc list-inside">
              <li>
                <strong>Felezőmerőleges szerkesztése:</strong> a szakasz két végpontjából azonos, a fél szakasznál nagyobb sugárral köríveket húzunk alul-felül.
              </li>
              <li>
                <strong>Szögfelező szerkesztése:</strong> a csúcsból körívvel metsszük a szárakat, majd a metszéspontokból azonos sugarú körívekkel kijelöljük a felező egyenest.
              </li>
              <li>
                <strong>Merőleges állítása pontból egyenesre:</strong> pontból körívvel metsszük az egyenest két pontban, majd ezen pontok felezőmerőlegesét szerkesztjük.
              </li>
              <li>
                <strong>Párhuzamos húzása adott ponton át:</strong> szögmásolással vagy a párhuzamos szelők tételével történik.
              </li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* SECTION 2: Szakasz Felosztása Adott Arányban */}
      <TheorySection
        number={2}
        title="Szakasz felosztása n egyenlő részre vagy m : k arányban"
        badge="A párhuzamos szelők tételének alkalmazása"
      >
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-base">
          Hogyan oszthatunk fel egy <MathText>{"AB"}</MathText> szakaszt például 3 egyenlő részre, vagy <MathText>{"2 : 3"}</MathText> arányban anélkül,
          hogy milliméterben megmérnénk és tizedestörtekkel számolnánk? A kulcs a <strong>párhuzamos szelők tétele</strong>!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          <TheoryCard
            title="Szerkesztés lépései (m : k arányú osztás)"
            icon={<Ruler className="w-5 h-5 text-amber-600" />}
            color="amber"
          >
            <ol className="text-sm text-slate-700 dark:text-slate-300 space-y-2 list-decimal list-inside">
              <li>
                Az <MathText>{"A"}</MathText> csúcsból tetszőleges szögben húzunk egy <MathText>{"f"}</MathText> <strong>segédfélegyenest</strong>.
              </li>
              <li>
                Körzővel tetszőleges, de állandó lépésközzel egymás után felmérünk <MathText>{"m + k"}</MathText> darab egyenlő egységet (<MathText>{"A_1, A_2, \\dots, A_{m+k}"}</MathText>).
              </li>
              <li>
                Az utolsó pontot (<MathText>{"A_{m+k}"}</MathText>) egyenes vonalzóval összekötjük a szakasz másik végpontjával, <MathText>{"B"}</MathText>-vel.
              </li>
              <li>
                Az <MathText>{"m"}</MathText>-edik osztóponton (<MathText>{"A_m"}</MathText>) keresztül <strong>párhuzamost húzunk</strong> az <MathText>{"A_{m+k}B"}</MathText> egyenessel.
              </li>
              <li>
                A párhuzamos kimetszi az <MathText>{"AB"}</MathText> szakaszon a keresett <MathText>{"P"}</MathText> osztópontot, amelyre:
              </li>
            </ol>
            <div className="mt-3 p-2 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded font-bold text-center text-amber-900 dark:text-amber-200 text-sm">
              <MathText>{"\\frac{AP}{PB} = \\frac{m}{k}"}</MathText>
            </div>
          </TheoryCard>

          <TheoryCard
            title="Miért működik? (Geometriai bizonyítás)"
            icon={<Sparkles className="w-5 h-5 text-emerald-600" />}
            color="emerald"
          >
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
              Tekintsük az <MathText>{"A"}</MathText> csúcsú szögtartományt, amelynek egyik szára az <MathText>{"AB"}</MathText> szakasz,
              másik szára a segédfélegyenes!
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
              Mivel <MathText>{"A_m P \\parallel A_{m+k} B"}</MathText>, a <strong>párhuzamos szelőszakaszok tétele</strong> szerint
              a szárakból kimetszett darabok aránya megegyezik:
            </p>
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-lg text-center font-bold text-emerald-900 dark:text-emerald-200 text-sm">
              <MathText>{"\\frac{AP}{AB} = \\frac{m}{m + k} \\implies \\frac{AP}{PB} = \\frac{m}{k}"}</MathText>
            </div>
            <p className="text-xs text-slate-500 mt-2">
              A segédfélegyenes szöge és a körzőnyílás nagysága tetszőleges, a kapott arány mindig hajszálpontosan ugyanaz!
            </p>
          </TheoryCard>
        </div>

        {/* Visual Diagram of Segment Division */}
        <div className="my-6 bg-slate-50 dark:bg-slate-900/60 p-5 rounded-2xl border border-slate-200 dark:border-slate-800">
          <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-2 text-center">
            Szakasz felosztása 2 : 3 arányban (összesen 2 + 3 = 5 egység)
          </h4>
          <svg viewBox="0 0 500 160" className="w-full max-w-xl mx-auto h-36 sm:h-44">
            {/* Base segment AB */}
            <line x1="80" y1="120" x2="420" y2="120" stroke="#0284c7" strokeWidth="3" />
            <circle cx="80" cy="120" r="4.5" fill="#0284c7" />
            <text x="75" y="138" className="text-[11px] font-bold fill-sky-800">A</text>
            <circle cx="420" cy="120" r="4.5" fill="#0284c7" />
            <text x="425" y="138" className="text-[11px] font-bold fill-sky-800">B</text>

            {/* Auxiliary ray f */}
            <line x1="80" y1="120" x2="380" y2="25" stroke="#94a3b8" strokeWidth="1.5" />
            <text x="390" y="25" className="text-[10px] font-bold fill-slate-500">f segédfélegyenes</text>

            {/* 5 Tick marks on ray */}
            {[1, 2, 3, 4, 5].map((idx) => {
              const step = 55;
              const angle = Math.atan2(25 - 120, 380 - 80);
              const px = 80 + idx * step * Math.cos(angle);
              const py = 120 + idx * step * Math.sin(angle);
              return (
                <g key={idx}>
                  <circle cx={px} cy={py} r="3" fill="#f59e0b" />
                  <text x={px - 8} y={py - 6} className="text-[9px] font-bold fill-amber-700">
                    A{idx}
                  </text>
                </g>
              );
            })}

            {/* Connecting line A5 - B */}
            <line x1="337" y1="38" x2="420" y2="120" stroke="#64748b" strokeWidth="1.5" strokeDasharray="4 4" />

            {/* Parallel line through A2 */}
            <line x1="183" y1="87" x2="216" y2="120" stroke="#10b981" strokeWidth="2.5" />

            {/* Point P */}
            <circle cx="216" cy="120" r="5" fill="#10b981" />
            <text x="216" y="142" textAnchor="middle" className="text-[12px] font-extrabold fill-emerald-700">
              P
            </text>

            {/* Dimensions */}
            <text x="148" y="112" textAnchor="middle" className="text-[9px] font-bold fill-emerald-600">
              2 rész
            </text>
            <text x="318" y="112" textAnchor="middle" className="text-[9px] font-bold fill-sky-600">
              3 rész
            </text>
          </svg>
        </div>
      </TheorySection>

      {/* SECTION 3: Negyedik és Harmadik Arányos Szerkesztése */}
      <TheorySection
        number={3}
        title="Negyedik és harmadik arányos szakasz szerkesztése"
        badge="Algebrai összefüggések szerkesztéssel"
      >
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-base">
          A geometriai szerkesztések lehetővé teszik algebrai egyenletek grafikus megoldását is.
          Ha három szakasz hossza adott (<MathText>{"a, b, c"}</MathText>), pontosan meg tudjuk szerkeszteni azt az
          <MathText>{"x"}</MathText> szakaszt, amely kielégíti az aránypárt:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          <TheoryCard
            title="1. Negyedik arányos szerkesztése"
            icon={<Maximize2 className="w-5 h-5 text-indigo-600" />}
            color="indigo"
          >
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
              Olyan <MathText>{"x"}</MathText> szakaszt keresünk, amelyre:
            </p>
            <div className="p-2 bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 rounded font-bold text-center text-indigo-900 dark:text-indigo-200 text-sm mb-2">
              <MathText>{"\\frac{a}{b} = \\frac{c}{x} \\implies x = \\frac{b \\cdot c}{a}"}</MathText>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              <strong>Szerkesztés menete:</strong>
            </p>
            <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1 list-disc list-inside mt-1">
              <li>Tetszőleges szög egyik szárára felmérjük <MathText>{"OA = a"}</MathText>-t, majd folytatólagosan <MathText>{"AB = b"}</MathText>-t.</li>
              <li>A másik szárra felmérjük <MathText>{"OC = c"}</MathText>-t.</li>
              <li>Összekötjük <MathText>{"A"}</MathText>-t és <MathText>{"C"}</MathText>-t.</li>
              <li><MathText>{"B"}</MathText>-n keresztül párhuzamost húzunk <MathText>{"AC"}</MathText>-vel; a másik száron kimetszi a <MathText>{"D"}</MathText> pontot.</li>
              <li>A keletkező <MathText>{"CD"}</MathText> szakasz hossza éppen a keresett <MathText>{"x"}</MathText>!</li>
            </ul>
          </TheoryCard>

          <TheoryCard
            title="2. Harmadik arányos szerkesztése"
            icon={<Minimize2 className="w-5 h-5 text-purple-600" />}
            color="purple"
          >
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
              A negyedik arányos speciális esete, amikor a középső tagok megegyeznek (<MathText>{"c = b"}</MathText>):
            </p>
            <div className="p-2 bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 rounded font-bold text-center text-purple-900 dark:text-purple-200 text-sm mb-2">
              <MathText>{"\\frac{a}{b} = \\frac{b}{x} \\implies x = \\frac{b^2}{a}"}</MathText>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Ez a módszer alkalmas négyzetre emelés és osztás geometriai elvégzésére.
              Ha például <MathText>{"a = 1\\text{ egység}"}</MathText>, akkor <MathText>{"x = b^2"}</MathText>,
              tehát megszerkesztettük egy szakasz hosszának négyzetét!
            </p>
          </TheoryCard>
        </div>

        <TheoryTable
          headers={['Feladat megnevezése', 'Aránypár képlete', 'Keresett szakasz (x)', 'Alkalmazási terület']}
          rows={[
            [
              <strong key="1">Negyedik arányos</strong>,
              'a : b = c : x',
              'x = (b · c) / a',
              'Térképek méretarányos átváltása, aránypárok grafikus megoldása'
            ],
            [
              <strong key="2">Harmadik arányos</strong>,
              'a : b = b : x',
              'x = b² / a',
              'Szakasz négyzetének szerkesztése (ha a = 1)'
            ],
            [
              <strong key="3">Szakasz n egyenlő részre osztása</strong>,
              'AP / AB = 1 / n',
              'x = AB / n',
              'Mérőléc készítése, tetszőleges törtrész kimérése'
            ],
            [
              <strong key="4">Szakasz m : k arányú osztása</strong>,
              'AP / PB = m / k',
              'AP = AB · m / (m+k)',
              'Súlypont, belső arányos osztópontok meghatározása'
            ]
          ]}
        />
      </TheorySection>

      {/* SECTION 4: Interaktív Szerkesztési Labor */}
      <TheorySection
        number={4}
        title="Interaktív Labor: Geometriai Szerkesztő Szimulátor"
        badge="Dinamikus szerkesztési animáció"
      >
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-base mb-4">
          Próbáld ki a két legfontosabb szerkesztési algoritmust! Válts a fülek között, állítsd be az arányokat vagy a szakaszok hosszát,
          és figyeld meg, hogyan jelöli ki a körző és a párhuzamos vonalzó a pontos eredményt!
        </p>

        <div className="p-6 bg-gradient-to-br from-amber-50/80 via-white to-orange-50/40 dark:from-slate-900 dark:via-slate-850 dark:to-amber-950/30 rounded-3xl border border-amber-200 dark:border-amber-800 shadow-md">
          {/* Tab Selector */}
          <div className="flex items-center gap-2 mb-6 border-b border-amber-200 dark:border-amber-800 pb-4">
            <Button
              variant={activeTab === 'ratio' ? 'default' : 'outline'}
              className="text-xs font-bold"
              onClick={() => setActiveTab('ratio')}
            >
              1. Szakaszosztás adott arányban (m : k)
            </Button>
            <Button
              variant={activeTab === 'fourthProportional' ? 'default' : 'outline'}
              className="text-xs font-bold"
              onClick={() => setActiveTab('fourthProportional')}
            >
              2. Negyedik arányos szakasz [x = (b·c)/a]
            </Button>
          </div>

          {activeTab === 'ratio' ? (
            <div>
              {/* Ratio controls */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">m =</span>
                    <input
                      type="number"
                      min="1"
                      max="6"
                      value={mRatio}
                      onChange={(e) => setMRatio(Math.max(1, Math.min(6, parseInt(e.target.value) || 1)))}
                      className="w-14 p-1.5 border rounded text-center text-sm font-bold bg-white dark:bg-slate-800 border-amber-300"
                    />
                  </div>
                  <span className="text-sm font-black text-slate-400">:</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">k =</span>
                    <input
                      type="number"
                      min="1"
                      max="6"
                      value={kRatio}
                      onChange={(e) => setKRatio(Math.max(1, Math.min(6, parseInt(e.target.value) || 1)))}
                      className="w-14 p-1.5 border rounded text-center text-sm font-bold bg-white dark:bg-slate-800 border-amber-300"
                    />
                  </div>
                </div>

                <div className="text-xs font-semibold text-amber-800 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/60 px-3 py-1.5 rounded-full border border-amber-300">
                  Összesen {totalUnits} egység körosztás szükséges ({mRatio} + {kRatio})
                </div>
              </div>

              {/* Dynamic SVG Visualisation for Ratio */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-2 overflow-hidden shadow-inner">
                <svg viewBox="0 0 420 190" className="w-full h-56 sm:h-64 select-none">
                  {/* Grid */}
                  <defs>
                    <pattern id="grid-const" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#f8fafc" strokeWidth="1" className="dark:stroke-slate-800/40" />
                    </pattern>
                  </defs>
                  <rect width="420" height="190" fill="url(#grid-const)" />

                  {/* Base line AB */}
                  <line x1={startX} y1={startY} x2={endX} y2={endY} stroke="#0284c7" strokeWidth="3" />
                  <circle cx={startX} cy={startY} r="4.5" fill="#0284c7" />
                  <text x={startX - 14} y={startY + 4} className="text-[11px] font-black fill-sky-800 dark:fill-sky-300">A</text>
                  <circle cx={endX} cy={endY} r="4.5" fill="#0284c7" />
                  <text x={endX + 8} y={endY + 4} className="text-[11px] font-black fill-sky-800 dark:fill-sky-300">B</text>

                  {/* Auxiliary ray */}
                  <line
                    x1={startX}
                    y1={startY}
                    x2={startX + (totalUnits + 0.8) * unitStep * Math.cos(rayAngle)}
                    y2={startY + (totalUnits + 0.8) * unitStep * Math.sin(rayAngle)}
                    stroke="#94a3b8"
                    strokeWidth="1.5"
                  />

                  {/* Circle arcs and tick marks on ray */}
                  {rayPoints.map((pt, i) => {
                    if (i === 0) return null;
                    const isDivider = i === mRatio;
                    const isLast = i === totalUnits;
                    return (
                      <g key={i}>
                        <circle
                          cx={pt.x}
                          cy={pt.y}
                          r={isDivider || isLast ? 4 : 2.5}
                          fill={isDivider ? '#10b981' : isLast ? '#d97706' : '#f59e0b'}
                        />
                        <text
                          x={pt.x - 6}
                          y={pt.y - 7}
                          className={`text-[8px] font-bold ${isDivider ? 'fill-emerald-600' : isLast ? 'fill-amber-700' : 'fill-slate-500'}`}
                        >
                          A{i}
                        </text>
                      </g>
                    );
                  })}

                  {/* Line from last point to B */}
                  <line
                    x1={lastPointRay.x}
                    y1={lastPointRay.y}
                    x2={endX}
                    y2={endY}
                    stroke="#d97706"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                  />

                  {/* Parallel line from m-th point to P */}
                  <line
                    x1={dividerPointRay.x}
                    y1={dividerPointRay.y}
                    x2={dividerPx}
                    y2={startY}
                    stroke="#10b981"
                    strokeWidth="2.5"
                  />

                  {/* Point P */}
                  <circle cx={dividerPx} cy={startY} r="5.5" fill="#10b981" stroke="#ffffff" strokeWidth="1.5" />
                  <text x={dividerPx} y={startY + 18} textAnchor="middle" className="text-[12px] font-black fill-emerald-700 dark:fill-emerald-300">
                    P
                  </text>

                  {/* Segment labels */}
                  <text x={(startX + dividerPx) / 2} y={startY - 8} textAnchor="middle" className="text-[9px] font-bold fill-emerald-600">
                    AP ({mRatio} rész)
                  </text>
                  <text x={(dividerPx + endX) / 2} y={startY - 8} textAnchor="middle" className="text-[9px] font-bold fill-sky-600">
                    PB ({kRatio} rész)
                  </text>
                </svg>
              </div>

              {/* Status info */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4 text-center">
                <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                  <span className="text-[11px] text-slate-500 font-semibold">Arány</span>
                  <p className="text-base font-black text-amber-700 dark:text-amber-300 mt-0.5">
                    {mRatio} : {kRatio}
                  </p>
                </div>
                <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                  <span className="text-[11px] text-slate-500 font-semibold">AP / PB hányados</span>
                  <p className="text-base font-mono font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">
                    {(mRatio / kRatio).toFixed(2)}
                  </p>
                </div>
                <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 col-span-2 md:col-span-1">
                  <span className="text-[11px] text-slate-500 font-semibold">Párhuzamos irány</span>
                  <p className="text-xs font-bold text-slate-700 dark:text-slate-300 mt-1">
                    A_{mRatio}P ∥ A_{totalUnits}B
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div>
              {/* Fourth proportional controls */}
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-400">a szakasz =</label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={sideA}
                    onChange={(e) => setSideA(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full mt-1 p-2 border rounded font-bold text-center bg-white dark:bg-slate-800 border-amber-300"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-400">b szakasz =</label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={sideB}
                    onChange={(e) => setSideB(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full mt-1 p-2 border rounded font-bold text-center bg-white dark:bg-slate-800 border-amber-300"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-400">c szakasz =</label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={sideC}
                    onChange={(e) => setSideC(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full mt-1 p-2 border rounded font-bold text-center bg-white dark:bg-slate-800 border-amber-300"
                  />
                </div>
              </div>

              {/* Dynamic SVG for Fourth Proportional */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-2 overflow-hidden shadow-inner">
                <svg viewBox="0 0 420 180" className="w-full h-56 select-none">
                  {/* Rays from vertex O */}
                  <line x1="40" y1="140" x2="380" y2="140" stroke="#64748b" strokeWidth="2" />
                  <line x1="40" y1="140" x2="360" y2="30" stroke="#64748b" strokeWidth="2" />

                  {/* Vertex O */}
                  <circle cx="40" cy="140" r="4.5" fill="#4f46e5" />
                  <text x="25" y="145" className="text-[11px] font-bold fill-indigo-700">O</text>

                  {/* Points on lower ray: OA = a, OB = a + b */}
                  <circle cx="120" cy="140" r="4" fill="#0284c7" />
                  <text x="120" y="156" textAnchor="middle" className="text-[9px] font-bold fill-sky-700">A (a={sideA})</text>

                  <circle cx="240" cy="140" r="4" fill="#0284c7" />
                  <text x="240" y="156" textAnchor="middle" className="text-[9px] font-bold fill-sky-700">B (b={sideB})</text>

                  {/* Points on upper ray: OC = c, OD = c + x */}
                  <circle cx="104" cy="118" r="4" fill="#7c3aed" />
                  <text x="95" y="112" textAnchor="end" className="text-[9px] font-bold fill-purple-700">C (c={sideC})</text>

                  <circle cx="268" cy="62" r="4.5" fill="#10b981" />
                  <text x="268" y="52" textAnchor="middle" className="text-[10px] font-black fill-emerald-600">D (x={computedX})</text>

                  {/* AC connecting line */}
                  <line x1="120" y1="140" x2="104" y2="118" stroke="#64748b" strokeWidth="2" strokeDasharray="3 3" />

                  {/* BD parallel line */}
                  <line x1="240" y1="140" x2="268" y2="62" stroke="#10b981" strokeWidth="2.5" />

                  <text x="190" y="90" className="text-[9px] font-bold fill-emerald-600">
                    BD ∥ AC
                  </text>
                </svg>
              </div>

              {/* Formula calculation card */}
              <div className="mt-4 p-4 bg-amber-50 dark:bg-amber-950/40 rounded-xl border border-amber-200 dark:border-amber-800 text-center">
                <span className="text-xs text-slate-500 font-semibold">Kiszámított negyedik arányos szakasz:</span>
                <p className="text-lg font-black text-amber-900 dark:text-amber-200 font-mono mt-1">
                  x = (b · c) / a = ({sideB} · {sideC}) / {sideA} = {computedX}
                </p>
              </div>
            </div>
          )}
        </div>
      </TheorySection>

      {/* SECTION 5: Hasonló Háromszögek Szerkesztése és Aranymetszés */}
      <TheorySection
        number={5}
        title="Hasonló háromszögek szerkesztése és az Aranymetszés"
        badge="Gyakorlati és művészeti alkalmazások"
      >
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-base">
          A hasonlósági szerkesztések segítségével olyan alakzatokat hozhatunk létre, amelyek pontosan megőrzik az eredeti arányait,
          de a kívánt méretűek. Különösen gyakori feladat a háromszög szerkesztése, ha csak a <strong>szögei és a kerülete</strong> ismertek!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          <TheoryCard
            title="Háromszög szerkesztése szögekből és kerületből"
            icon={<Shapes className="w-5 h-5 text-indigo-600" />}
            color="indigo"
          >
            <ol className="text-xs text-slate-600 dark:text-slate-400 space-y-1.5 list-decimal list-inside">
              <li>
                Szerkesztünk egy tetszőleges segédháromszöget a megadott belső szögekkel (<MathText>{"A_1 B_1 C_1"}</MathText>).
              </li>
              <li>
                Kiszámítjuk vagy megszerkesztjük a segédháromszög kerületét (<MathText>{"K_1 = a_1 + b_1 + c_1"}</MathText>).
              </li>
              <li>
                A megadott valódi <MathText>{"K"}</MathText> kerületet felosztjuk az <MathText>{"a_1 : b_1 : c_1"}</MathText> arányban a párhuzamos szelők tételével.
              </li>
              <li>
                A kapott szakaszok pontosan a keresett háromszög valódi <MathText>{"a, b, c"}</MathText> oldalai lesznek!
              </li>
            </ol>
          </TheoryCard>

          <TheoryCard
            title="Az Aranymetszés (Divina Proportio)"
            icon={<Percent className="w-5 h-5 text-amber-600" />}
            color="amber"
          >
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
              Egy szakasz <strong>aranymetszése</strong> azt jelenti, hogy a szakaszt úgy osztjuk két részre,
              hogy a kisebb rész úgy aránylik a nagyobbhoz, mint a nagyobb az egészhez:
            </p>
            <div className="p-2 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded font-bold text-center text-amber-900 dark:text-amber-200 text-xs">
              <MathText>{"\\frac{b}{a} = \\frac{a}{a + b} = \\Phi - 1 \\approx 0,618 \\quad \\text{és} \\quad \\frac{a+b}{a} = \\Phi \\approx 1,618"}</MathText>
            </div>
            <p className="text-[11px] text-slate-500 mt-2">
              Az aranymetszés az ókori építészet, a reneszánsz festészet és a természet (pl. csigaházak, növényi levelek) alapvető esztétikai aránya.
            </p>
          </TheoryCard>
        </div>

        <TheoryCallout
          title="Tudtad? A szabályos ötszög és az aranymetszés"
          icon={<Lightbulb className="w-5 h-5 text-amber-500" />}
        >
          <p className="text-sm text-slate-700 dark:text-slate-300">
            A szabályos ötszög átlói egy pentagrammát (ötágú csillagot) alkotnak.
            Minden átló a másikat pontosan aranymetszés arányában osztja fel!
            Emiatt az aranymetszés pontosan megszerkeszthető körzővel és vonalzóval egy derékszögű háromszög segítségével.
          </p>
        </TheoryCallout>
      </TheorySection>

      {/* SECTION 6: Tipikus Csapdák és Önellenőrző */}
      <TheorySection
        number={6}
        title="Tipikus tévhitek, csapdák és Önellenőrző"
        badge="Gyakori hibák elkerülése"
      >
        <div className="space-y-4 my-6">
          <TheoryTrapBox
            title="1. Csapda: m : k arányú osztásnál az aránytagokat össze kell adni!"
            description="Ha egy szakaszt 3 : 5 arányban kell felosztanod, a segédfélegyenesre NEM 3 · 5 = 15, és NEM is 5 egységet kell felmérned, hanem pontosan 3 + 5 = 8 darab egyenlő körosztást! Az utolsó, 8. pontot kötöd össze a szakasz B végpontjával, és a 3. ponton át húzol párhuzamost."
          />

          <TheoryTrapBox
            title="2. Csapda: A negyedik arányosnál számít a sorrend!"
            description="Az a : b = c : x arányban nem mindegy, melyik szakasz hova kerül. A szabály szerint az x = (b · c) / a. Ha felcseréled az a-t és b-t, a kapott szakasz teljesen más hosszúságú lesz!"
          />

          <TheoryTrapBox
            title="3. Csapda: A segédfélegyenes szöge nem számít!"
            description="Sokan aggódnak amiatt, hogy mekkora hegyesszöget zárjon be a segédfélegyenes az eredeti szakasszal. A szög nagysága teljesen lényegtelen (lehet 20°, 40° vagy 60°), és a körzőnyílás nagysága is tetszőleges: a párhuzamos szelők tétele miatt a keletkező arány mindig hajszálpontosan ugyanaz marad."
          />
        </div>

        {/* Interactive Self-Test Question */}
        <div className="mt-8 p-6 bg-amber-50/60 dark:bg-amber-950/40 rounded-2xl border border-amber-200 dark:border-amber-800">
          <div className="flex items-center gap-2 mb-3">
            <HelpCircle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            <h4 className="font-bold text-slate-800 dark:text-slate-100 text-base">
              Gyors Önellenőrző Kérdés
            </h4>
          </div>

          <p className="text-sm text-slate-700 dark:text-slate-300 mb-4">
            Egy 14 cm hosszú <MathText>{"AB"}</MathText> szakaszt <MathText>{"3 : 4"}</MathText> arányban osztunk fel egy <MathText>{"P"}</MathText> ponttal.
            Hány egyenlő körosztást kell felmérnünk a segédfélegyenesre, és milyen hosszú lesz az <MathText>{"AP"}</MathText> szakasz?
          </p>

          <div className="space-y-2">
            {[
              {
                id: 0,
                text: "7 egységet mérünk fel (3 + 4 = 7), és AP = 6 cm hosszú (14 · 3/7 = 6 cm).",
                isCorrect: true
              },
              {
                id: 1,
                text: "12 egységet mérünk fel (3 · 4 = 12), és AP = 3,5 cm.",
                isCorrect: false
              },
              {
                id: 2,
                text: "4 egységet mérünk fel, és AP = 7 cm.",
                isCorrect: false
              },
              {
                id: 3,
                text: "1 egységet mérünk fel, és AP = 4 cm.",
                isCorrect: false
              }
            ].map((option) => {
              const isSelected = selfTestAnswer === option.id;
              const showCorrectness = selfTestSubmitted;
              return (
                <button
                  key={option.id}
                  onClick={() => {
                    if (!selfTestSubmitted) {
                      setSelfTestAnswer(option.id);
                    }
                  }}
                  className={`w-full text-left p-3 rounded-xl border text-sm transition-all flex items-center justify-between ${
                    showCorrectness
                      ? option.isCorrect
                        ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-400 text-emerald-900 dark:text-emerald-200'
                        : isSelected
                        ? 'bg-rose-50 dark:bg-rose-950/60 border-rose-400 text-rose-900 dark:text-rose-200'
                        : 'bg-white dark:bg-slate-800 border-slate-200 opacity-60'
                      : isSelected
                      ? 'bg-amber-100 dark:bg-amber-900/60 border-amber-400 text-amber-900 dark:text-amber-100 font-semibold'
                      : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-750'
                  }`}
                >
                  <span>{option.text}</span>
                  {showCorrectness && option.isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 ml-2" />
                  )}
                  {showCorrectness && isSelected && !option.isCorrect && (
                    <XCircle className="w-5 h-5 text-rose-600 shrink-0 ml-2" />
                  )}
                </button>
              );
            })}
          </div>

          <div className="mt-4 flex items-center justify-between">
            {!selfTestSubmitted ? (
              <Button
                size="sm"
                disabled={selfTestAnswer === null}
                onClick={() => setSelfTestSubmitted(true)}
                className="bg-amber-600 hover:bg-amber-700 text-white font-semibold"
              >
                Válasz ellenőrzése
              </Button>
            ) : (
              <div className="flex items-center gap-3">
                <span
                  className={`text-sm font-bold ${
                    selfTestAnswer === 0 ? 'text-emerald-600' : 'text-rose-600'
                  }`}
                >
                  {selfTestAnswer === 0
                    ? '🎉 Helyes válasz! Összesen 3 + 4 = 7 egyenlő körosztást mérünk fel, és 14 cm · (3/7) = 6 cm.'
                    : 'Nem pontos! A körosztások száma 3 + 4 = 7, és AP = 14 · (3/7) = 6 cm, míg PB = 14 · (4/7) = 8 cm.'}
                </span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setSelfTestAnswer(null);
                    setSelfTestSubmitted(false);
                  }}
                  className="text-xs"
                >
                  Újra
                </Button>
              </div>
            )}
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default GeometricConstructionsTheory;
