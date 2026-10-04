import React, { useState } from 'react';
import { MathText } from '../../shared/MathText';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  GeometryFigureCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable
} from '../TheoryTemplate';
import {
  GitCompare,
  Triangle,
  Shapes,
  Maximize2,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Sparkles,
  Layers,
  ArrowRight,
  RotateCcw,
  Sliders,
  BookOpen,
  Award,
  Compass,
  Check
} from 'lucide-react';
import { MathText } from '@/components/math/shared/MathText';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ConversePythagorasTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

export const ConversePythagorasTheory: React.FC<ConversePythagorasTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // --- INTERAKTÍV HÁROMSZÖGVIZSGÁLÓ ÁLLAPOTOK ---
  const [activeTab, setActiveTab] = useState<'inspector' | 'egyptian' | 'generator'>('inspector');

  // 1. Vizsgáló oldalai (a, b, c)
  const [sideA, setSideA] = useState<number>(3);
  const [sideB, setSideB] = useState<number>(4);
  const [sideC, setSideC] = useState<number>(5);

  // 2. Pitagoraszi számhármas generátor paraméterek: m > n
  const [genM, setGenM] = useState<number>(2);
  const [genN, setGenN] = useState<number>(1);

  // Számítások a vizsgálóhoz
  const sorted = [sideA, sideB, sideC].sort((x, y) => x - y);
  const sA = sorted[0];
  const sB = sorted[1];
  const sC = sorted[2]; // leghosszabb oldal

  const isTriangle = sA + sB > sC;
  const sumSquares = sA * sA + sB * sB;
  const hypSquare = sC * sC;

  let triangleType: 'right' | 'acute' | 'obtuse' | 'impossible' = 'impossible';
  if (!isTriangle) {
    triangleType = 'impossible';
  } else if (sumSquares === hypSquare) {
    triangleType = 'right';
  } else if (sumSquares > hypSquare) {
    triangleType = 'acute';
  } else {
    triangleType = 'obtuse';
  }

  // Generátor számítások (Euklideszi képlet: a = m² - n², b = 2mn, c = m² + n²)
  const calcGenA = Math.max(1, genM * genM - genN * genN);
  const calcGenB = 2 * genM * genN;
  const calcGenC = genM * genM + genN * genN;

  // Preset beállító segédfüggvény
  const applyPreset = (a: number, b: number, c: number) => {
    setSideA(a);
    setSideB(b);
    setSideC(c);
  };

  return (
    <TheoryTemplate
      title="A Pitagorasz-tétel Megfordítása és Szögtípusok"
      subtitle="Háromszögek derékszögűségének ellenőrzése oldalhosszakból, hegyes- és tompaszögek vizsgálata, valamint az egyiptomi 12 csomós zsinór"
      quickRule={{
        label: 'A Megfordítás Szabálya',
        formula: 'a² + b² = c²  ⟺  γ = 90°',
        note: 'Ha a² + b² = c², akkor a háromszög derékszögű (c a leghosszabb oldal)'
      }}
      badge="8. Osztály • Pitagorasz-tétel"
      themeColor="amber"
      pdfFilename="A_Pitagorasz_tetel_megforditasa_8_osztaly.pdf"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      practiceTitle="Gyakorló Kvíz Indítása"
      practiceSubtitle="Tedd próbára tudásod a 30 kérdéses, 3 szintű megfordítási kvízben és minijátékokban!"
    >
      {/* 1. RÉSZ: A TÉTEL MEGFORDÍTÁSÁNAK LÉNYEGE */}
      <TheorySection
        title="1. A Pitagorasz-tétel Megfordítása: Miről van szó?"
        subtitle="A logikai különbség az alaptétel és a megfordítás között"
        icon={<GitCompare className="w-5 h-5 text-amber-600" />}
      >
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          A mindennapi és mérnöki gyakorlatban nagyon gyakran fordul elő a következő feladat:
          adott egy háromszög három oldalhossza, és <strong>szögmérő használata nélkül</strong> el kell döntenünk,
          hogy derékszögű-e a háromszög. Erre ad tökéletes és megdönthetetlen választ a{' '}
          <strong className="text-amber-600 dark:text-amber-400">Pitagorasz-tétel megfordítása</strong>.
        </p>

        <TheoryCallout
          title="A Pitagorasz-tétel Megfordításának Kimondása és Alapábrája"
          type="info"
        >
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
            <div className="md:col-span-7 space-y-2.5">
              <p className="text-xs sm:text-sm">
                Ha egy háromszög <strong className="text-amber-700 dark:text-amber-300">a, b és c</strong> oldalhosszúságaira
                (ahol <em>c</em> a leghosszabb oldal) teljesül, hogy a két rövidebb oldal négyzetösszege megegyezik a leghosszabb oldal négyzetével:
              </p>
              <div className="text-center font-mono font-black text-xl my-2 text-amber-600 dark:text-amber-400 tracking-wider bg-white/70 dark:bg-slate-900/60 py-2.5 rounded-xl border border-amber-200 dark:border-amber-800 shadow-2xs">
                a² + b² = c²  ⟹  γ = 90°
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                akkor a háromszög <strong>szükségszerűen derékszögű</strong>, és a <em>c</em> oldallal szemközti belső szöge pontosan <strong>90°</strong>.
              </p>
              <div className="p-2 rounded-lg bg-amber-50/80 dark:bg-amber-950/40 text-[11px] text-amber-900 dark:text-amber-300 border border-amber-200/80">
                💡 <strong>Példa:</strong> 3² + 4² = 9 + 16 = 25 = 5² &nbsp;⟹&nbsp; a (3, 4, 5 cm) háromszög derékszögű!
              </div>
            </div>

            <div className="md:col-span-5 flex flex-col items-center justify-center p-3 bg-white/90 dark:bg-slate-900/90 rounded-2xl border border-amber-200 dark:border-amber-800/80 shadow-xs">
              <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                A megfordítás ellenőrzése
              </span>
              <svg viewBox="0 0 220 150" className="w-full max-w-[200px] h-auto">
                {/* Derékszögű háromszög: C(45, 120), B(185, 120), A(45, 28) */}
                <polygon points="45,120 185,120 45,28" fill="#fef3c7" fillOpacity="0.75" stroke="#b45309" strokeWidth="2" />

                {/* Magyar derékszög jelölés a C csúcsban: negyedkörív és pont */}
                <path d="M 45 104 A 16 16 0 0 1 61 120" fill="none" stroke="#b45309" strokeWidth="1.8" />
                <circle cx="52" cy="113" r="1.8" fill="#b45309" />

                {/* Csúcsok címkéi */}
                <text x="32" y="26" className="text-[11px] font-black fill-slate-800 dark:fill-white">A</text>
                <text x="195" y="125" className="text-[11px] font-black fill-slate-800 dark:fill-white">B</text>
                <text x="30" y="132" className="text-[11px] font-black fill-amber-900 dark:fill-amber-300">C</text>

                {/* Szög felirat */}
                <text x="68" y="112" className="text-[9px] font-bold fill-amber-700">γ = 90°</text>

                {/* Oldalak és konkrét számhármas feliratok */}
                <text x="22" y="74" className="text-[10px] font-bold fill-amber-800" textAnchor="middle">a = 3</text>
                <text x="22" y="85" className="text-[7.5px] fill-amber-900/70" textAnchor="middle">(a² = 9)</text>

                <text x="115" y="134" className="text-[10px] font-bold fill-orange-800" textAnchor="middle">b = 4</text>
                <text x="115" y="144" className="text-[7.5px] fill-orange-900/70" textAnchor="middle">(b² = 16)</text>

                <text x="125" y="68" className="text-[11px] font-black fill-emerald-800" textAnchor="middle">c = 5</text>
                <text x="125" y="78" className="text-[7.5px] font-bold fill-emerald-900/80" textAnchor="middle">(c² = 25)</text>
              </svg>
              <div className="text-[10px] font-black text-amber-700 dark:text-amber-400 mt-1">
                9 + 16 = 25 &nbsp;⟺&nbsp; γ = 90°
              </div>
            </div>
          </div>
        </TheoryCallout>

        {/* LOGIKAI PÁRHUZAM KÁRTYÁK */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <TheoryCard
            title="A Pitagorasz-tétel (Alaptétel)"
            badge="Feltétel: Derékszögű háromszög"
            badgeColor="orange"
          >
            <div className="flex items-center gap-2 p-2 rounded-xl bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-800 mb-2">
              <span className="font-bold text-xs text-orange-900 dark:text-orange-200">Irány:</span>
              <span className="font-mono text-xs font-black text-orange-700 dark:text-orange-300">γ = 90° ➔ a² + b² = c²</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">
              <strong>Kiindulás:</strong> Előre tudjuk, hogy a háromszög derékszögű (γ = 90°).
            </p>
            <p className="text-xs font-bold text-orange-700 dark:text-orange-300">
              Következmény: A befogók és átfogó négyzetösszege szükségképpen egyenlő: a² + b² = c².
            </p>
            <p className="text-[11px] text-slate-500 mt-1">
              <MathText><em>Gyakorlati cél:</em> Hiányzó oldalhossz kiszámítása két ismert oldalból (pl. c = √(a² + b²)).</MathText>
            </p>
          </TheoryCard>

          <TheoryCard
            title="A Tétel Megfordítása (Felismerés)"
            badge="Feltétel: a² + b² = c²"
            badgeColor="amber"
          >
            <div className="flex items-center gap-2 p-2 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 mb-2">
              <span className="font-bold text-xs text-amber-900 dark:text-amber-200">Irány:</span>
              <span className="font-mono text-xs font-black text-amber-700 dark:text-amber-300">a² + b² = c² ➔ γ = 90°</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">
              <strong>Kiindulás:</strong> Csak a 3 oldalhosszt (a, b, c) ismerjük, a szögekről semmit sem tudunk.
            </p>
            <p className="text-xs font-bold text-amber-800 dark:text-amber-300">
              Következmény: Ha az egyenlőség fennáll, a háromszög garantáltan derékszögű!
            </p>
            <p className="text-[11px] text-slate-500 mt-1">
              <em>Gyakorlati cél:</em> Szögek mérése nélküli ellenőrzés (pl. falak derékszögűségének kitűzése).
            </p>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 2. RÉSZ: INTERAKTÍV HÁROMSZÖGVIZSGÁLÓ ÉS EGYIPTOMI ZSINÓR */}
      <TheorySection
        title="2. Interaktív Háromszögvizsgáló & Egyiptomi Zsinór"
        subtitle="Állíts be tetszőleges oldalhosszakat, és nézd meg az élő szögosztályozást!"
        icon={<Sliders className="w-5 h-5 text-amber-600" />}
      >
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-amber-200 dark:border-amber-900/60 p-5 shadow-sm my-4">
          {/* Módválasztó gombok */}
          <div className="flex flex-wrap gap-2 mb-6 border-b border-slate-200 dark:border-slate-800 pb-4">
            <Button
              variant={activeTab === 'inspector' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveTab('inspector')}
              className={cn(
                "rounded-xl font-bold text-xs gap-1.5 cursor-pointer",
                activeTab === 'inspector'
                  ? "bg-amber-600 hover:bg-amber-700 text-white shadow-xs"
                  : "border-slate-200 dark:border-slate-700"
              )}
            >
              <GitCompare className="w-4 h-4" />
              1. Háromszög Szögtípus Vizsgáló
            </Button>

            <Button
              variant={activeTab === 'egyptian' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveTab('egyptian')}
              className={cn(
                "rounded-xl font-bold text-xs gap-1.5 cursor-pointer",
                activeTab === 'egyptian'
                  ? "bg-amber-600 hover:bg-amber-700 text-white shadow-xs"
                  : "border-slate-200 dark:border-slate-700"
              )}
            >
              <Compass className="w-4 h-4" />
              2. Ókori Egyiptomi 12 Csomós Zsinór
            </Button>

            <Button
              variant={activeTab === 'generator' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveTab('generator')}
              className={cn(
                "rounded-xl font-bold text-xs gap-1.5 cursor-pointer",
                activeTab === 'generator'
                  ? "bg-amber-600 hover:bg-amber-700 text-white shadow-xs"
                  : "border-slate-200 dark:border-slate-700"
              )}
            >
              <Sparkles className="w-4 h-4" />
              3. Számhármas Generátor (Euklidész)
            </Button>
          </div>

          {/* 1. FÜL: HÁROMSZÖG VIZSGÁLÓ */}
          {activeTab === 'inspector' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* Bal oldal: Beállítások és számítások */}
              <div className="lg:col-span-6 space-y-4">
                <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 dark:text-amber-200">
                      Háromszög Oldalai (cm)
                    </h4>
                    <span className="text-[11px] text-slate-500">
                      Rendezve: {sA} ≤ {sB} ≤ <strong>{sC} (leghosszabb)</strong>
                    </span>
                  </div>

                  {/* Gyorsválasztó gombok */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    <button
                      onClick={() => applyPreset(3, 4, 5)}
                      className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-amber-400 hover:bg-amber-50 transition-colors"
                    >
                      3 - 4 - 5 (Derékszög)
                    </button>
                    <button
                      onClick={() => applyPreset(5, 12, 13)}
                      className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-amber-400 hover:bg-amber-50 transition-colors"
                    >
                      5 - 12 - 13 (Derékszög)
                    </button>
                    <button
                      onClick={() => applyPreset(4, 6, 8)}
                      className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-rose-400 hover:bg-rose-50 transition-colors"
                    >
                      4 - 6 - 8 (Tompaszög)
                    </button>
                    <button
                      onClick={() => applyPreset(7, 8, 9)}
                      className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-indigo-400 hover:bg-indigo-50 transition-colors"
                    >
                      7 - 8 - 9 (Hegyesszög)
                    </button>
                    <button
                      onClick={() => applyPreset(2, 3, 6)}
                      className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-red-400 hover:bg-red-50 transition-colors"
                    >
                      2 - 3 - 6 (Nem háromszög!)
                    </button>
                  </div>

                  {/* Csúszkák */}
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-xs font-semibold mb-1">
                        <span>1. oldal (a):</span>
                        <span className="font-mono font-bold text-amber-700">{sideA} cm</span>
                      </div>
                      <input
                        type="range"
                        min={1}
                        max={15}
                        value={sideA}
                        onChange={(e) => setSideA(Number(e.target.value))}
                        className="w-full h-1.5 bg-amber-200 dark:bg-amber-900 rounded-lg appearance-none cursor-pointer accent-amber-600"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-semibold mb-1">
                        <span>2. oldal (b):</span>
                        <span className="font-mono font-bold text-orange-700">{sideB} cm</span>
                      </div>
                      <input
                        type="range"
                        min={1}
                        max={15}
                        value={sideB}
                        onChange={(e) => setSideB(Number(e.target.value))}
                        className="w-full h-1.5 bg-amber-200 dark:bg-amber-900 rounded-lg appearance-none cursor-pointer accent-orange-600"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-semibold mb-1">
                        <span>3. oldal (c):</span>
                        <span className="font-mono font-bold text-emerald-700">{sideC} cm</span>
                      </div>
                      <input
                        type="range"
                        min={1}
                        max={20}
                        value={sideC}
                        onChange={(e) => setSideC(Number(e.target.value))}
                        className="w-full h-1.5 bg-amber-200 dark:bg-amber-900 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                      />
                    </div>
                  </div>
                </div>

                {/* Számítási Eredmények panel */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2 text-xs">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-700">
                    <span className="text-slate-600 dark:text-slate-400">1. Háromszög-egyenlőtlenség:</span>
                    <span className={cn(
                      "font-bold px-2 py-0.5 rounded-full text-[11px]",
                      isTriangle ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-800"
                    )}>
                      {sA} + {sB} = {sA + sB} {sA + sB > sC ? `> ${sC} (Létezik!)` : `≤ ${sC} (Nem alkot háromszöget!)`}
                    </span>
                  </div>

                  {isTriangle && (
                    <>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-600 dark:text-slate-400">Két rövidebb oldal négyzetösszege:</span>
                        <span className="font-mono font-bold text-amber-700">
                          {sA}² + {sB}² = {sA * sA} + {sB * sB} = <strong>{sumSquares}</strong>
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-slate-600 dark:text-slate-400">Leghosszabb oldal négyzete:</span>
                        <span className="font-mono font-bold text-emerald-700">
                          {sC}² = <strong>{hypSquare}</strong>
                        </span>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-700">
                        <span className="text-slate-600 dark:text-slate-400">Összehasonlítás ({sumSquares} vs {hypSquare}):</span>
                        <span className="font-mono font-black text-sm">
                          {sumSquares === hypSquare && <span className="text-emerald-600">{sumSquares} = {hypSquare} (Egyenlő!)</span>}
                          {sumSquares > hypSquare && <span className="text-indigo-600">{sumSquares} &gt; {hypSquare} (Nagyobb!)</span>}
                          {sumSquares < hypSquare && <span className="text-rose-600">{sumSquares} &lt; {hypSquare} (Kisebb!)</span>}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Jobb oldal: Geometriai illusztráció és Eredményjelző kártya */}
              <div className="lg:col-span-6 flex flex-col items-center justify-center p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200 dark:border-slate-700/60 min-h-[320px]">
                {/* Eredmény banner */}
                <div className={cn(
                  "w-full p-3 rounded-xl mb-4 text-center font-bold text-sm flex items-center justify-center gap-2",
                  triangleType === 'right' && "bg-emerald-100 text-emerald-900 border border-emerald-300",
                  triangleType === 'acute' && "bg-indigo-100 text-indigo-900 border border-indigo-300",
                  triangleType === 'obtuse' && "bg-rose-100 text-rose-900 border border-rose-300",
                  triangleType === 'impossible' && "bg-red-100 text-red-900 border border-red-300"
                )}>
                  {triangleType === 'right' && (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      <span>DERÉKSZÖGŰ HÁROMSZÖG (γ = 90°)</span>
                    </>
                  )}
                  {triangleType === 'acute' && (
                    <>
                      <Triangle className="w-5 h-5 text-indigo-600" />
                      <span>HEGYESSZÖGŰ HÁROMSZÖG (γ &lt; 90°)</span>
                    </>
                  )}
                  {triangleType === 'obtuse' && (
                    <>
                      <AlertTriangle className="w-5 h-5 text-rose-600" />
                      <span>TOMPASZÖGŰ HÁROMSZÖG (γ &gt; 90°)</span>
                    </>
                  )}
                  {triangleType === 'impossible' && (
                    <>
                      <AlertTriangle className="w-5 h-5 text-red-600" />
                      <span>NEM ALKOT HÁROMSZÖGET (a + b ≤ c)</span>
                    </>
                  )}
                </div>

                {/* SVG Rajz */}
                <div className="w-full flex justify-center items-center py-2">
                  {triangleType === 'impossible' ? (
                    <svg viewBox="0 0 260 120" className="w-full max-w-xs h-auto">
                      {/* Két szakasz nem ér össze */}
                      <line x1="30" y1="90" x2="230" y2="90" stroke="#047857" strokeWidth="3" />
                      <line x1="30" y1="90" x2="80" y2="60" stroke="#b45309" strokeWidth="3" />
                      <line x1="230" y1="90" x2="180" y2="60" stroke="#ea580c" strokeWidth="3" />
                      <text x="130" y="105" className="text-[10px] font-bold fill-emerald-800" textAnchor="middle">c = {sC} cm</text>
                      <text x="50" y="70" className="text-[10px] font-bold fill-amber-800" textAnchor="middle">a={sA}</text>
                      <text x="210" y="70" className="text-[10px] font-bold fill-orange-800" textAnchor="middle">b={sB}</text>
                      <text x="130" y="45" className="text-[11px] font-black fill-red-600" textAnchor="middle">Nem érnek össze!</text>
                    </svg>
                  ) : triangleType === 'right' ? (
                    <svg viewBox="0 0 260 180" className="w-full max-w-xs h-auto">
                      {/* Derékszögű háromszög */}
                      <polygon points="50,140 210,140 50,40" fill="#fef3c7" stroke="#b45309" strokeWidth="2.5" />
                      {/* Magyar derékszög jelölés a derékszögű csúcsban: negyedkörív belső ponttal */}
                      <path d="M 50 122 A 18 18 0 0 1 68 140" fill="none" stroke="#b45309" strokeWidth="2" />
                      <circle cx="58" cy="132" r="2.2" fill="#b45309" />

                      <text x="35" y="90" className="text-[11px] font-bold fill-amber-800" textAnchor="end">a = {sA}</text>
                      <text x="130" y="158" className="text-[11px] font-bold fill-orange-800" textAnchor="middle">b = {sB}</text>
                      <text x="145" y="80" className="text-[12px] font-black fill-emerald-800" textAnchor="middle">c = {sC}</text>
                      <text x="130" y="25" className="text-[12px] font-black fill-emerald-700" textAnchor="middle">a² + b² = c² (90°)</text>
                    </svg>
                  ) : triangleType === 'acute' ? (
                    <svg viewBox="0 0 260 180" className="w-full max-w-xs h-auto">
                      {/* Hegyesszögű háromszög */}
                      <polygon points="40,140 220,140 120,40" fill="#e0e7ff" stroke="#4f46e5" strokeWidth="2.5" />
                      {/* Hegyesszög ív */}
                      <path d="M 112 55 A 16 16 0 0 0 132 58" fill="none" stroke="#4f46e5" strokeWidth="1.8" />
                      <text x="70" y="85" className="text-[11px] font-bold fill-indigo-700">a = {sA}</text>
                      <text x="180" y="85" className="text-[11px] font-bold fill-indigo-700">b = {sB}</text>
                      <text x="130" y="158" className="text-[11px] font-bold fill-emerald-800" textAnchor="middle">c = {sC}</text>
                      <text x="130" y="25" className="text-[12px] font-black fill-indigo-700" textAnchor="middle">a² + b² &gt; c² (Hegyes)</text>
                    </svg>
                  ) : (
                    <svg viewBox="0 0 260 180" className="w-full max-w-xs h-auto">
                      {/* Tompaszögű háromszög */}
                      <polygon points="80,140 230,140 30,70" fill="#ffe4e6" stroke="#e11d48" strokeWidth="2.5" />
                      {/* Tompaszög ív a háromszög belsejében */}
                      <path d="M 108 140 A 28 28 0 0 0 63.7 117.2" fill="none" stroke="#e11d48" strokeWidth="2" />
                      <text x="88" y="128" className="text-[12px] font-black fill-rose-600" textAnchor="middle">γ</text>
                      <text x="40" y="105" className="text-[11px] font-bold fill-rose-800" textAnchor="end">a = {sA}</text>
                      <text x="140" y="95" className="text-[11px] font-bold fill-rose-800">c = {sC}</text>
                      <text x="160" y="158" className="text-[11px] font-bold fill-orange-800" textAnchor="middle">b = {sB}</text>
                      <text x="130" y="25" className="text-[12px] font-black fill-rose-700" textAnchor="middle">a² + b² &lt; c² (Tompa)</text>
                    </svg>
                  )}
                </div>

                <p className="text-[11px] text-center text-slate-500 mt-2">
                  {triangleType === 'right' && 'A Pitagorasz-tétel megfordítása igazolja: a háromszög pontosan derékszögű.'}
                  {triangleType === 'acute' && 'Mivel c² kisebb az összegnél, a leghosszabb oldallal szemközti szög hegyesszög.'}
                  {triangleType === 'obtuse' && 'Mivel c² nagyobb az összegnél, a leghosszabb oldallal szemközti szög tompaszög.'}
                  {triangleType === 'impossible' && 'A két rövidebb oldal összege nem haladja meg a leghosszabb oldalt.'}
                </p>
              </div>
            </div>
          )}

          {/* 2. FÜL: AZ EGYIPTOMI 12 CSOMÓS ZSINÓR */}
          {activeTab === 'egyptian' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                <h4 className="text-sm font-bold text-amber-900 dark:text-amber-200 mb-2 flex items-center gap-2">
                  <Compass className="w-4 h-4 text-amber-600" />
                  Hogyan tűztek ki derékszöget a fáraók mérnökei?
                </h4>
                <p>
                  A Nílus évenkénti áradása elmosta a telekhatárokat, ezért az ókori egyiptomi földmérőknek
                  (<em>harpedonaptai</em>, azaz „kötelezők”) gyorsan és pontosan kellett derékszögű parcellákat kimérniük.
                  Ehhez egy zárt kötelet használtak, amelyen <strong>12 egyenlő távolságú csomó</strong> volt.
                </p>
                <p className="mt-2">
                  Ha a kötelet három cövek segítségével <strong>3 : 4 : 5 arányban</strong> kifeszítették (3 egység, 4 egység, 5 egység, összesen 3 + 4 + 5 = 12 egység),
                  a 3 és 4 hosszúságú oldalak között <strong>garantáltan pontos derékszög (90°)</strong> jött létre!
                </p>
              </div>

              {/* Nagy illusztráció: 12 csomós zsinór kifeszítve */}
              <div className="flex justify-center p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700">
                <svg viewBox="0 0 460 260" className="w-full max-w-md h-auto">
                  {/* Talajvonal */}
                  <line x1="20" y1="210" x2="440" y2="210" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="4 3" />

                  {/* Kötél háromszög: C(80, 200), B(320, 200), A(80, 50) */}
                  <polygon points="80,200 320,200 80,50" fill="#fef3c7" stroke="#b45309" strokeWidth="4" />

                  {/* Magyar derékszög jelölés C-ben */}
                  <path d="M 80 175 A 25 25 0 0 1 105 200" fill="none" stroke="#b45309" strokeWidth="2.5" />
                  <circle cx="91" cy="189" r="3" fill="#b45309" />

                  {/* Cövekek a 3 csúcsban */}
                  <circle cx="80" cy="200" r="7" fill="#78350f" stroke="#fff" strokeWidth="2" />
                  <circle cx="320" cy="200" r="7" fill="#78350f" stroke="#fff" strokeWidth="2" />
                  <circle cx="80" cy="50" r="7" fill="#78350f" stroke="#fff" strokeWidth="2" />

                  {/* Csomók az 'a' oldalon (függőleges: 3 egység -> 2 belső csomó 50 és 200 között) */}
                  <circle cx="80" cy="100" r="5" fill="#f59e0b" stroke="#fff" strokeWidth="1.5" />
                  <circle cx="80" cy="150" r="5" fill="#f59e0b" stroke="#fff" strokeWidth="1.5" />

                  {/* Csomók a 'b' oldalon (vízszintes: 4 egység -> 3 belső csomó 80 és 320 között: 140, 200, 260) */}
                  <circle cx="140" cy="200" r="5" fill="#f59e0b" stroke="#fff" strokeWidth="1.5" />
                  <circle cx="200" cy="200" r="5" fill="#f59e0b" stroke="#fff" strokeWidth="1.5" />
                  <circle cx="260" cy="200" r="5" fill="#f59e0b" stroke="#fff" strokeWidth="1.5" />

                  {/* Csomók a 'c' átfogón (5 egység -> 4 belső csomó: dx=48, dy=30) */}
                  <circle cx="128" cy="80" r="5" fill="#f59e0b" stroke="#fff" strokeWidth="1.5" />
                  <circle cx="176" cy="110" r="5" fill="#f59e0b" stroke="#fff" strokeWidth="1.5" />
                  <circle cx="224" cy="140" r="5" fill="#f59e0b" stroke="#fff" strokeWidth="1.5" />
                  <circle cx="272" cy="170" r="5" fill="#f59e0b" stroke="#fff" strokeWidth="1.5" />

                  {/* Címkék */}
                  <text x="50" y="125" className="text-[12px] font-black fill-amber-900" textAnchor="middle">3 egység</text>
                  <text x="200" y="225" className="text-[12px] font-black fill-orange-900" textAnchor="middle">4 egység</text>
                  <text x="220" y="115" className="text-[13px] font-black fill-emerald-900" textAnchor="middle">5 egység</text>

                  {/* Szöveges magyarázat a képen */}
                  <text x="180" y="40" className="text-[12px] font-bold fill-slate-700">3² + 4² = 9 + 16 = 25 = 5²</text>
                  <text x="80" y="245" className="text-[11px] font-black fill-amber-800" textAnchor="middle">90°-os derékszög C-nél</text>
                  <text x="320" y="245" className="text-[10px] fill-slate-500" textAnchor="middle">Cövek</text>
                  <text x="80" y="30" className="text-[10px] fill-slate-500" textAnchor="middle">Cövek</text>
                </svg>
              </div>
            </div>
          )}

          {/* 3. FÜL: SZÁMHÁRMAS GENERÁTOR (EUKLIDÉSZI KÉPLET) */}
          {activeTab === 'generator' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="space-y-4 text-xs">
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  Hogyan lehet végtelen sok egész derékszögű számhármast képezni? Euklidész görög matematikus bizonyította,
                  hogy tetszőleges két m &gt; n &gt; 0 egész számból a következő képletekkel <strong>mindig derékszögű hármas</strong> keletkezik:
                </p>

                <div className="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-xl border border-amber-200 dark:border-amber-800 space-y-1 font-mono">
                  <p className="font-bold text-amber-900 dark:text-amber-200">a = m² - n²</p>
                  <p className="font-bold text-orange-900 dark:text-orange-200">b = 2 · m · n</p>
                  <p className="font-bold text-emerald-900 dark:text-emerald-200">c = m² + n²</p>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between font-bold mb-1">
                      <span>m paraméter (nagyobb):</span>
                      <span className="font-mono text-amber-700">{genM}</span>
                    </div>
                    <input
                      type="range"
                      min={2}
                      max={8}
                      value={genM}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setGenM(val);
                        if (genN >= val) setGenN(val - 1);
                      }}
                      className="w-full h-1.5 bg-amber-200 rounded-lg accent-amber-600 cursor-pointer"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between font-bold mb-1">
                      <span>n paraméter (kisebb):</span>
                      <span className="font-mono text-orange-700">{genN}</span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={genM - 1}
                      value={genN}
                      onChange={(e) => setGenN(Number(e.target.value))}
                      className="w-full h-1.5 bg-amber-200 rounded-lg accent-orange-600 cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* Generált eredmény kártya */}
              <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border-2 border-amber-300 dark:border-amber-700 shadow-sm text-center space-y-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                  Generált Pitagoraszi Számhármas
                </span>

                <div className="text-2xl font-mono font-black text-slate-800 dark:text-white flex items-center justify-center gap-3">
                  <span className="text-amber-600">a = {calcGenA}</span>
                  <span>•</span>
                  <span className="text-orange-600">b = {calcGenB}</span>
                  <span>•</span>
                  <span className="text-emerald-600">c = {calcGenC}</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-mono text-xs">
                  <div>{calcGenA}² + {calcGenB}² = {calcGenA * calcGenA} + {calcGenB * calcGenB} = <strong>{calcGenA * calcGenA + calcGenB * calcGenB}</strong></div>
                  <div>{calcGenC}² = <strong>{calcGenC * calcGenC}</strong></div>
                  <div className="text-emerald-600 font-black mt-1">✓ a² + b² = c² teljesül!</div>
                </div>

                <p className="text-[11px] text-slate-500">
                  Próbáld ki pl. m=3, n=2 esetén az (5, 12, 13) hármast!
                </p>
              </div>
            </div>
          )}
        </div>
      </TheorySection>

      {/* 3. RÉSZ: HÁROMSZÖGEK SZÖGTÍPUSÁNAK OSZTÁLYOZÁSA */}
      <TheorySection
        title="3. Háromszögek Szögtípusának Meghatározása Oldalakból"
        subtitle="A leghosszabb oldal négyzetének összevetése a két rövidebb oldal négyzetösszegével"
        icon={<Shapes className="w-5 h-5 text-amber-600" />}
      >
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          Ha egy háromszög a ≤ b ≤ c oldalait ismerjük, a c² és az a² + b² értékét összehasonlítva
          egyértelműen meghatározható a háromszög szögtípusa:
        </p>

        <TheoryTable
          headers={['Feltétel (c = max)', 'Háromszög típusa', 'A legnagyobb szög (γ)', 'Példa oldalhosszakkal']}
          rows={[
            [
              'c² = a² + b²',
              'Derékszögű',
              'γ = 90° (pontosan derékszög)',
              '3, 4, 5  (9 + 16 = 25 = 25)'
            ],
            [
              'c² < a² + b²',
              'Hegyesszögű',
              'γ < 90° (minden szög hegyes)',
              '7, 8, 9  (81 < 49 + 64 = 113)'
            ],
            [
              'c² > a² + b²',
              'Tompaszögű',
              'γ > 90° (a c-vel szemközti tompa)',
              '4, 6, 8  (64 > 16 + 36 = 52)'
            ],
            [
              'a + b ≤ c',
              'Nem alkot háromszöget!',
              'Nem létezik háromszög',
              '2, 3, 6  (2 + 3 = 5 ≤ 6)'
            ]
          ]}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
          <GeometryFigureCard
            title="Derékszögű Eset"
            badge="c² = a² + b²"
            color="emerald"
            description="A leghosszabb oldal négyzete pontosan egyenlő a két rövidebb négyzetösszegével. A legnagyobb szög 90°."
            figure={
              <svg viewBox="0 0 200 130" className="w-full max-w-xs h-auto">
                <polygon points="30,105 170,105 30,30" fill="#ecfdf5" stroke="#059669" strokeWidth="2" />
                {/* Magyar derékszög jelölés: negyedkörív belső ponttal */}
                <path d="M 30 88 A 17 17 0 0 1 47 105" fill="none" stroke="#059669" strokeWidth="1.8" />
                <circle cx="37" cy="98" r="1.8" fill="#059669" />
                <text x="56" y="96" className="text-[10px] font-black fill-emerald-700">90°</text>
                <text x="100" y="120" className="text-[10px] font-bold fill-slate-700" textAnchor="middle">b</text>
                <text x="20" y="70" className="text-[10px] font-bold fill-slate-700" textAnchor="end">a</text>
                <text x="110" y="60" className="text-[10px] font-bold fill-emerald-800">c</text>
                <text x="100" y="20" className="text-[11px] font-black fill-emerald-700" textAnchor="middle">γ = 90° (derékszög)</text>
              </svg>
            }
          />

          <GeometryFigureCard
            title="Hegyesszögű Eset"
            badge="c² < a² + b²"
            color="indigo"
            description="A leghosszabb oldal négyzete kisebb a négyzetösszegnél. A csúcs közelebb húzódik, így γ < 90°."
            figure={
              <svg viewBox="0 0 200 130" className="w-full max-w-xs h-auto">
                <polygon points="30,105 170,105 90,30" fill="#e0e7ff" stroke="#4f46e5" strokeWidth="2" />
                <path d="M 78 44 A 18 18 0 0 0 102 44" fill="none" stroke="#4f46e5" strokeWidth="1.8" />
                <text x="90" y="58" className="text-[10px] font-black fill-indigo-700" textAnchor="middle">γ</text>
                <text x="100" y="120" className="text-[10px] font-bold fill-slate-700" textAnchor="middle">c (leghosszabb)</text>
                <text x="50" y="65" className="text-[10px] font-bold fill-slate-700">a</text>
                <text x="140" y="65" className="text-[10px] font-bold fill-slate-700">b</text>
                <text x="100" y="20" className="text-[11px] font-black fill-indigo-700" textAnchor="middle">γ &lt; 90° (hegyesszög)</text>
              </svg>
            }
          />

          <GeometryFigureCard
            title="Tompaszögű Eset"
            badge="c² > a² + b²"
            color="rose"
            description="A leghosszabb oldal négyzete nagyobb az összegnél. A szög szétnyílik, így γ > 90° tompaszög lesz."
            figure={
              <svg viewBox="0 0 200 130" className="w-full max-w-xs h-auto">
                <polygon points="65,105 175,105 25,45" fill="#ffe4e6" stroke="#e11d48" strokeWidth="2" />
                {/* Tompaszög ív pontosan a háromszög belsejében */}
                <path d="M 89 105 A 24 24 0 0 0 51.7 85" fill="none" stroke="#e11d48" strokeWidth="1.8" />
                <text x="73" y="97" className="text-[10px] font-black fill-rose-600" textAnchor="middle">γ</text>
                <text x="120" y="120" className="text-[10px] font-bold fill-slate-700" textAnchor="middle">b</text>
                <text x="35" y="80" className="text-[10px] font-bold fill-slate-700" textAnchor="end">a</text>
                <text x="110" y="65" className="text-[10px] font-bold fill-rose-800">c (leghosszabb)</text>
                <text x="100" y="20" className="text-[11px] font-black fill-rose-700" textAnchor="middle">γ &gt; 90° (tompaszög)</text>
              </svg>
            }
          />
        </div>
      </TheorySection>

      {/* 4. RÉSZ: NEVEZETES PITAGORASZI SZÁMHÁRMASOK TÁBLÁZATA */}
      <TheorySection
        title="4. Nevezetes Pitagoraszi Számhármasok és Skálázásuk"
        subtitle="A legfontosabb egész számhármasok, amelyeket érdemes fejből felismerni"
        icon={<Award className="w-5 h-5 text-amber-600" />}
      >
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          Egy (a, b, c) pozitív egészekből álló számhármast <strong>primitív pitagoraszi számhármasnak</strong> nevezünk,
          ha a legnagyobb közös osztójuk 1, azaz lnko(a, b, c) = 1, és teljesül rájuk az a² + b² = c² összefüggés.
        </p>

        <TheoryTable
          headers={['Alap számhármas (a, b, c)', 'Ellenőrzés (a² + b² = c²)', '2-szeres (k=2)', '3-szoros (k=3)', '10-szeres (k=10)']}
          rows={[
            ['(3, 4, 5)', '9 + 16 = 25', '(6, 8, 10)', '(9, 12, 15)', '(30, 40, 50)'],
            ['(5, 12, 13)', '25 + 144 = 169', '(10, 24, 26)', '(15, 36, 39)', '(50, 120, 130)'],
            ['(8, 15, 17)', '64 + 225 = 289', '(16, 30, 34)', '(24, 45, 51)', '(80, 150, 170)'],
            ['(7, 24, 25)', '49 + 576 = 625', '(14, 48, 50)', '(21, 72, 75)', '(70, 240, 250)'],
            ['(9, 40, 41)', '81 + 1600 = 1681', '(18, 80, 82)', '(27, 120, 123)', '(90, 400, 410)'],
            ['(20, 21, 29)', '400 + 441 = 841', '(40, 42, 58)', '(60, 63, 87)', '(200, 210, 290)']
          ]}
        />

        <TheoryCallout
          title="A Skálázási Szabály (Hasonlóság)"
          type="tip"
        >
          Ha $(a, b, c)$ egy pitagoraszi számhármas, akkor tetszőleges $k$ pozitív szám esetén a $(k \cdot a, k \cdot b, k \cdot c)$
          is derékszögű háromszöget ad, mert a két háromszög hasonló egymáshoz!
          <div className="font-mono text-center my-1 text-xs font-bold text-amber-800 dark:text-amber-300">
            (k · a)² + (k · b)² = k² · a² + k² · b² = k² · (a² + b²) = k² · c² = (k · c)²
          </div>
        </TheoryCallout>
      </TheorySection>

      {/* 5. RÉSZ: TIPIKUS CSAPDÁK ÉS HIBAFORRÁSOK */}
      <TheorySection
        title="5. Tipikus Csapdák és Hogyan Kerüld El Őket!"
        subtitle="Mire kell nagyon figyelni a megfordítási feladatok megoldásakor?"
        icon={<AlertTriangle className="w-5 h-5 text-amber-600" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-2">
          <TheoryTrapBox
            title="1. Csapda: A háromszög-egyenlőtlenség kihagyása"
            mistake="2 cm, 3 cm, 6 cm esetén: 2² + 3² = 4 + 9 = 13 < 36, tehát 'tompaszögű háromszög'."
            correct="Hibás! Mivel 2 + 3 = 5 ≤ 6, a három szakasz egyáltalán NEM alkot háromszöget! Mindig ellenőrizd először, hogy a + b > c teljesül-e!"
          />

          <TheoryTrapBox
            title="2. Csapda: Nem a leghosszabb oldal a 'c'"
            mistake="Ha a megadott oldalak 13, 5, 12, akkor automatikusan 13² + 5² = 169 + 25 = 194 ≠ 144, tehát 'nem derékszögű'."
            correct="Mindig rendezd nagyság szerint az oldalakat! Itt a leghosszabb oldal a 13: 5² + 12² = 25 + 144 = 169 = 13², tehát IGENIS derékszögű!"
          />
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default ConversePythagorasTheory;
