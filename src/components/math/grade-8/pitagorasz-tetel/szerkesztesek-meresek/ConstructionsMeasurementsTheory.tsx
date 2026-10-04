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
import {
  Ruler,
  Compass,
  Triangle,
  Shapes,
  Maximize2,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Sparkles,
  Layers
} from 'lucide-react';
import { MathText } from '@/components/math/shared/MathText';

interface ConstructionsMeasurementsTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

export const ConstructionsMeasurementsTheory: React.FC<ConstructionsMeasurementsTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // Interaktív Pitagoraszi Területszimulátor
  const [legA, setLegA] = useState<number>(3);
  const [legB, setLegB] = useState<number>(4);

  const areaA = legA * legA;
  const areaB = legB * legB;
  const areaC = areaA + areaB;
  const hypotenuse = Math.sqrt(areaC);

  const presets = [
    { label: '3 - 4 - 5 (Klasszikus)', a: 3, b: 4 },
    { label: '5 - 12 - 13 (Pitagoraszi)', a: 5, b: 12 },
    { label: '6 - 8 - 10 (Kétszeres)', a: 6, b: 8 },
    { label: '8 - 15 - 17 (Nagyobb)', a: 8, b: 15 }
  ];

  return (
    <TheoryTemplate
      title="Szerkesztések, Mérések és Területek"
      subtitle="Derékszögű háromszögek szerkesztése körzővel és vonalzóval, a Thálész-tétel és a területek tapasztalati mérése"
      badgeText="8. OSZTÁLY • IV. PITAGORASZ-TÉTEL • 📐 TANANYAG"
      documentId="constructions-measurements-theory-doc"
      pdfFilename="8_osztaly_szerkesztesek_meresek_tananyag.pdf"
      quickRule={{
        label: 'Tapasztalati Alaptétel',
        formula: 'T_a + T_b = T_c \\iff a^2 + b^2 = c^2'
      }}
      themeColor="amber"
      practiceTitle="Készen állsz a szerkesztési és mérési feladatokra?"
      practiceSubtitle="Tedd próbára a tudásodat a 3 szintű kvízben, a párosító és csoportosító geometriai feladványokkal!"
      practiceButtonText="Gyakorló Kvíz Indítása"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      onStartPractice={onStartQuiz}
    >
      {/* 1. RÉSZ: A DERÉKSZÖGŰ HÁROMSZÖG ANATÓMIÁJA */}
      <TheorySection
        title="1. A Derékszögű Háromszög Alapelemei és Tulajdonságai"
        subtitle="Az oldalak elnevezése, a hegyesszögek pótszög-kapcsolata és a magasságvonal"
        icon={<Triangle className="w-5 h-5 text-amber-600" />}
      >
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          A derékszögű háromszög a síkgeometria egyik legfontosabb alakzata. Egyik belső szöge pontosan{' '}
          <strong className="text-amber-600 dark:text-amber-400">90°-os (derékszög)</strong>, ezért az oldalai
          között speciális elnevezések és szigorú törvényszerűségek érvényesülnek.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-3">
          <TheoryCard
            title="Befogók (a és b)"
            badge="Oldalak"
            themeColor="amber"
            icon={<Ruler className="w-4 h-4 text-amber-600" />}
          >
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-2">
              A 90°-os derékszöget közrefogó két rövidebb oldal. Egymásra merőlegesek.
            </p>
            <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs font-mono font-bold text-amber-900 dark:text-amber-300 text-center">
              a ⊥ b &nbsp;|&nbsp; T = (a · b) / 2
            </div>
          </TheoryCard>

          <TheoryCard
            title="Átfogó (c)"
            badge="Leghosszabb oldal"
            themeColor="emerald"
            icon={<Maximize2 className="w-4 h-4 text-emerald-600" />}
          >
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-2">
              A derékszögű csúccsal (C) szemközt fekvő oldal. Mindig szigorúan a leghosszabb él.
            </p>
            <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs font-mono font-bold text-emerald-900 dark:text-emerald-300 text-center">
              c &gt; a &nbsp;és&nbsp; c &gt; b
            </div>
          </TheoryCard>

          <TheoryCard
            title="Pótszögek és Körülírt Kör"
            badge="Összefüggések"
            themeColor="indigo"
            icon={<Compass className="w-4 h-4 text-indigo-600" />}
          >
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-2">
              A két hegyesszög összege mindig 90°. A körülírt kör középpontja az átfogó felezőpontja (O).
            </p>
            <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 text-xs font-mono font-bold text-indigo-900 dark:text-indigo-300 text-center">
              α + β = 90° &nbsp;|&nbsp; R = c / 2
            </div>
          </TheoryCard>
        </div>

        {/* 1. ÁBRA PÁROS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <GeometryFigureCard
            title="A derékszögű háromszög standard jelölésrendszere"
            badge="Szemléltető Ábra"
            color="amber"
            description="A C csúcsnál lévő derékszög, a szemközti c átfogó, az átfogó felezőpontja (O), és a körülírt kör sugara (R = sc = c/2)."
            figure={
              <svg viewBox="0 0 380 200" className="w-full max-w-sm h-auto">
                <defs>
                  <linearGradient id="triGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#fef3c7" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#fde68a" stopOpacity="0.5" />
                  </linearGradient>
                </defs>
                {/* Körülírt kör halvány íve */}
                <path d="M 40 150 A 140 140 0 0 1 320 150" fill="none" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="4 4" />
                {/* Háromszög kitöltése */}
                <polygon points="40,150 140,30 320,150" fill="url(#triGrad)" stroke="#d97706" strokeWidth="2.5" />
                {/* Magyar derékszög jelölés a C csúcsban: negyedkörív és pont */}
                <path d="M 125 48 A 24 24 0 0 0 160 43" fill="none" stroke="#b45309" strokeWidth="1.8" />
                <circle cx="141" cy="46" r="2.2" fill="#b45309" />

                {/* Hegyesszögek ívei */}
                <path d="M 65 150 A 25 25 0 0 0 54 135" fill="none" stroke="#4f46e5" strokeWidth="1.5" />
                <text x="68" y="142" className="text-[10px] font-bold fill-indigo-700">α</text>
                <path d="M 295 150 A 25 25 0 0 1 306 140" fill="none" stroke="#4f46e5" strokeWidth="1.5" />
                <text x="288" y="142" className="text-[10px] font-bold fill-indigo-700">β</text>

                {/* Oldalcímkék háttérrel */}
                <rect x="70" y="75" width="46" height="18" rx="4" fill="#ffffff" fillOpacity="0.9" stroke="#fed7aa" strokeWidth="1" />
                <text x="93" y="88" className="text-[11px] font-black fill-amber-800" textAnchor="middle">b (befogó)</text>

                <rect x="230" y="75" width="46" height="18" rx="4" fill="#ffffff" fillOpacity="0.9" stroke="#fed7aa" strokeWidth="1" />
                <text x="253" y="88" className="text-[11px] font-black fill-amber-800" textAnchor="middle">a (befogó)</text>

                <rect x="155" y="158" width="50" height="18" rx="4" fill="#ffffff" fillOpacity="0.9" stroke="#a7f3d0" strokeWidth="1" />
                <text x="180" y="171" className="text-[11px] font-black fill-emerald-800" textAnchor="middle">c (átfogó)</text>

                {/* Csúcsok */}
                <circle cx="40" cy="150" r="4" fill="#1e293b" />
                <text x="25" y="155" className="text-[12px] font-black fill-slate-800">A</text>
                <circle cx="320" cy="150" r="4" fill="#1e293b" />
                <text x="330" y="155" className="text-[12px] font-black fill-slate-800">B</text>
                <circle cx="140" cy="30" r="4" fill="#b45309" />
                <text x="140" y="18" className="text-[12px] font-black fill-amber-900" textAnchor="middle">C (90°)</text>

                {/* Felezőpont és súlyvonal */}
                <circle cx="180" cy="150" r="3.5" fill="#059669" />
                <line x1="180" y1="150" x2="140" y2="30" stroke="#059669" strokeWidth="1.8" strokeDasharray="3 3" />
                <text x="180" y="142" className="text-[9px] font-bold fill-emerald-800" textAnchor="middle">O (Felezőpont)</text>
                <text x="145" y="95" className="text-[9px] font-bold fill-emerald-700">R = sc</text>
              </svg>
            }
          />

          <GeometryFigureCard
            title="Magasság és Területszámítás"
            badge="Képletek"
            color="emerald"
            description="A derékszögű háromszög területe kétféleképpen is felírható: a befogók szorzatának feléből, vagy az átfogó és a hozzá tartozó magasság szorzatának feléből."
            figure={
              <svg viewBox="0 0 380 200" className="w-full max-w-sm h-auto">
                {/* Befogók téglalapja kiegészítésként */}
                <rect x="50" y="40" width="220" height="110" fill="#f0fdf4" fillOpacity="0.4" stroke="#86efac" strokeWidth="1.5" strokeDasharray="3 3" />
                {/* Háromszög */}
                <polygon points="50,150 50,40 270,150" fill="#dcfce7" fillOpacity="0.7" stroke="#15803d" strokeWidth="2.5" />
                {/* Magyar derékszög jelölés a derékszögű csúcsban (50, 150) */}
                <path d="M 50 130 A 20 20 0 0 1 70 150" fill="none" stroke="#15803d" strokeWidth="1.8" />
                <circle cx="58" cy="142" r="2" fill="#15803d" />

                {/* Magasságvonal mc */}
                <line x1="50" y1="40" x2="135" y2="82" stroke="#dc2626" strokeWidth="2" strokeDasharray="4 2" />
                <circle cx="135" cy="82" r="3" fill="#dc2626" />
                <text x="142" y="80" className="text-[9px] font-bold fill-rose-700">Tc</text>

                {/* Címkék */}
                <text x="35" y="95" className="text-[11px] font-black fill-emerald-900" textAnchor="end">b = 6</text>
                <text x="160" y="168" className="text-[11px] font-black fill-emerald-900" textAnchor="middle">a = 8</text>
                <text x="180" y="85" className="text-[11px] font-black fill-emerald-800">c = 10</text>
                <text x="82" y="55" className="text-[10px] font-black fill-rose-600">mc = 4,8</text>

                {/* Terület levezetés doboz */}
                <rect x="220" y="20" width="145" height="55" rx="8" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
                <text x="292" y="38" className="text-[10px] font-black fill-slate-800" textAnchor="middle">T = (a · b) / 2 = 24</text>
                <text x="292" y="54" className="text-[9.5px] font-bold fill-rose-600" textAnchor="middle">mc = (a · b) / c = 4,8</text>
                <text x="292" y="68" className="text-[8.5px] fill-slate-500" textAnchor="middle">T = (c · mc) / 2</text>
              </svg>
            }
          />
        </div>
      </TheorySection>

      {/* 2. RÉSZ: SZERKESZTÉSEK KÖRZŐVEL ÉS VONALZÓVAL */}
      <TheorySection
        title="2. Derékszögű Háromszög Szerkesztési Módszerei"
        subtitle="A három leggyakoribb szerkesztési eset geometriai rajzokkal"
        icon={<Compass className="w-5 h-5 text-amber-600" />}
      >
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          Egy általános háromszög szerkesztéséhez legalább 3 független adatra van szükségünk. Mivel a derékszögű
          háromszögben a <MathText>\gamma = 90^\circ</MathText>-os szög mindig adott, itt{' '}
          <strong className="text-amber-600 dark:text-amber-400">elegendő mindössze 2 további adat</strong> a
          teljes szerkesztéshez!
        </p>

        <TheoryTable
          headers={['Adott Adatok', 'Szerkesztési Lépések Menete', 'Eredmény']}
          rows={[
            [
              'Két befogó (a, b)',
              '1. Egyenesen kijelöljük a C csúcsot.\n2. C-ben merőlegest állítunk körzővel.\n3. Az egyik szárra felmérjük az a-t (CB), a másikra a b-t (CA).\n4. Az A és B pontokat egyenes vonalzóval összekötjük.',
              '1 db egyértelmű háromszög; az átfogó automatikusan adott.'
            ],
            [
              'Átfogó és egyik befogó (c, a)',
              '1. Felmérjük a BC = a befogó szakaszt.\n2. A C végpontban merőleges egyenest állítunk.\n3. A B csúcsból körzővel c sugarú körívet húzunk.\n4. A körív kimetszi az A csúcsot a merőlegesből.',
              'Csak akkor van megoldás, ha c > a! Pontosan 1 háromszög.'
            ],
            [
              'Átfogó és magasság (c, mc)',
              '1. Felmérjük az AB = c szakaszt.\n2. Megszerkesztjük az AB felezőpontját (O) és a Thálész-félkört.\n3. Az AB-vel párhuzamos egyenest húzunk mc távolságra.\n4. A párhuzamos metszése a félkörrel kijelöli a C csúcsot.',
              'Ha mc < c/2: 2 megoldás; ha mc = c/2: 1 megoldás; ha mc > c/2: nincs megoldás.'
            ]
          ]}
        />

        {/* 3 SZERKESZTÉSI ÁBRA */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
          <GeometryFigureCard
            title="1. Eset: Két Befogó (a, b)"
            badge="Alapeset"
            color="amber"
            description="A C csúcsban merőlegest állítunk, kimérjük a befogókat, majd végpontjaikat összekötjük az átfogóval."
            figure={
              <svg viewBox="0 0 240 180" className="w-full max-w-xs h-auto">
                {/* Merőleges egyenesek */}
                <line x1="20" y1="140" x2="220" y2="140" stroke="#cbd5e1" strokeWidth="1.5" />
                <line x1="60" y1="170" x2="60" y2="20" stroke="#cbd5e1" strokeWidth="1.5" />
                {/* Körzőívek a merőleges szerkesztéshez C körül */}
                <path d="M 40 140 A 20 20 0 0 1 80 140" fill="none" stroke="#f59e0b" strokeWidth="1" strokeDasharray="2 2" />
                <circle cx="60" cy="140" r="3" fill="#b45309" />
                <text x="50" y="155" className="text-[10px] font-bold fill-amber-900">C</text>

                {/* Befogók vastagon */}
                <line x1="60" y1="140" x2="190" y2="140" stroke="#d97706" strokeWidth="3" />
                <line x1="60" y1="140" x2="60" y2="40" stroke="#d97706" strokeWidth="3" />
                {/* Magyar derékszög jelölés C-ben: negyedkörív és pont */}
                <path d="M 60 124 A 16 16 0 0 1 76 140" fill="none" stroke="#d97706" strokeWidth="1.8" />
                <circle cx="66" cy="134" r="1.8" fill="#d97706" />
                {/* Átfogó */}
                <line x1="60" y1="40" x2="190" y2="140" stroke="#10b981" strokeWidth="2.5" />

                {/* Csúcsok */}
                <circle cx="190" cy="140" r="3.5" fill="#1e293b" />
                <text x="195" y="155" className="text-[10px] font-bold fill-slate-800">B</text>
                <circle cx="60" cy="40" r="3.5" fill="#1e293b" />
                <text x="45" y="40" className="text-[10px] font-bold fill-slate-800">A</text>

                <text x="125" y="155" className="text-[9px] font-bold fill-amber-800" textAnchor="middle">a (felmérve)</text>
                <text x="40" y="90" className="text-[9px] font-bold fill-amber-800" textAnchor="middle">b</text>
                <text x="135" y="80" className="text-[10px] font-black fill-emerald-700">c átfogó</text>
              </svg>
            }
          />

          <GeometryFigureCard
            title="2. Eset: Átfogó és Befogó (c, a)"
            badge="Körívmetszés"
            color="sky"
            description="Felmérjük az a befogót, C-ben merőlegest húzunk, majd a B pontból c sugarú körívvel metsszük ki A-t."
            figure={
              <svg viewBox="0 0 240 180" className="w-full max-w-xs h-auto">
                <line x1="20" y1="140" x2="220" y2="140" stroke="#cbd5e1" strokeWidth="1.5" />
                <line x1="60" y1="160" x2="60" y2="20" stroke="#0284c7" strokeWidth="1.5" />

                {/* a befogó */}
                <line x1="60" y1="140" x2="180" y2="140" stroke="#0284c7" strokeWidth="3" />
                <circle cx="60" cy="140" r="3" fill="#0369a1" />
                <text x="50" y="155" className="text-[10px] font-bold fill-sky-900">C</text>
                <circle cx="180" cy="140" r="3" fill="#0369a1" />
                <text x="185" y="155" className="text-[10px] font-bold fill-sky-900">B</text>

                {/* Magyar derékszög jelölés C-ben: negyedkörív és pont */}
                <path d="M 60 124 A 16 16 0 0 1 76 140" fill="none" stroke="#0284c7" strokeWidth="1.8" />
                <circle cx="66" cy="134" r="1.8" fill="#0284c7" />

                {/* Körív B-ből r=c=150, ami pontosan kimetszi A(60, 50)-et */}
                <path d="M 44 77 A 150 150 0 0 1 84 25" fill="none" stroke="#0284c7" strokeWidth="1.8" strokeDasharray="3 2" />
                {/* Metszéspont A pontosan (60, 50)-ben */}
                <circle cx="60" cy="50" r="4" fill="#0f172a" />
                <text x="45" y="50" className="text-[10px] font-bold fill-slate-800">A</text>

                {/* Átfogó összekötve */}
                <line x1="60" y1="50" x2="180" y2="140" stroke="#10b981" strokeWidth="2.5" />
                <text x="135" y="85" className="text-[10px] font-black fill-emerald-700">r = c körív</text>
                <text x="120" y="155" className="text-[9px] font-bold fill-sky-800" textAnchor="middle">a (felmérve)</text>
              </svg>
            }
          />

          <GeometryFigureCard
            title="3. Eset: Átfogó és Magasság (c, mc)"
            badge="Thálész-kör"
            color="purple"
            description="AB = c szakasz fölé Thálész-félkört rajzolunk, majd mc távolságra párhuzamost húzunk. Metszéspont adja a C csúcsot."
            figure={
              <svg viewBox="0 0 240 180" className="w-full max-w-xs h-auto">
                {/* Átfogó és felező: A(30, 140), B(210, 140), c = 180, R = 90 */}
                <line x1="30" y1="140" x2="210" y2="140" stroke="#7e22ce" strokeWidth="2.5" />
                <circle cx="120" cy="140" r="3" fill="#7e22ce" />
                <text x="120" y="155" className="text-[9px] font-bold fill-purple-900" textAnchor="middle">O (c/2)</text>

                {/* Thálész-félkör: R = 90 */}
                <path d="M 30 140 A 90 90 0 0 1 210 140" fill="#f3e8ff" fillOpacity="0.4" stroke="#a855f7" strokeWidth="1.8" />

                {/* Párhuzamos egyenes mc = 72 távolságra: y = 140 - 72 = 68 */}
                <line x1="15" y1="68" x2="225" y2="68" stroke="#ec4899" strokeWidth="1.5" strokeDasharray="3 2" />
                <text x="215" y="63" className="text-[8.5px] font-bold fill-pink-600">p || c</text>

                {/* Metszéspont C pontosan a Thálész-félkörön: C(66, 68), mert (66-120)² + (68-140)² = 54² + 72² = 90² */}
                <circle cx="66" cy="68" r="3.5" fill="#b45309" />
                <text x="60" y="58" className="text-[10px] font-bold fill-amber-900">C</text>
                <line x1="30" y1="140" x2="66" y2="68" stroke="#7e22ce" strokeWidth="1.8" />
                <line x1="210" y1="140" x2="66" y2="68" stroke="#7e22ce" strokeWidth="1.8" />
                {/* Magyar derékszög jelölés C-ben */}
                <path d="M 60 80 A 14 14 0 0 0 78 74" fill="none" stroke="#7e22ce" strokeWidth="1.6" />
                <circle cx="68" cy="75" r="1.6" fill="#7e22ce" />
                {/* Magasságvonal mc C-ből függőlegesen le az átfogóra */}
                <line x1="66" y1="68" x2="66" y2="140" stroke="#ec4899" strokeWidth="1.5" />
                <text x="73" y="110" className="text-[8.5px] font-bold fill-pink-700">mc</text>
              </svg>
            }
          />
        </div>
      </TheorySection>

      {/* 3. RÉSZ: THÁLÉSZ-TÉTEL */}
      <TheorySection
        title="3. A Thálész-tétel és a Thálész-kör"
        subtitle="A derékszög geometriai helye a síkban és a tétel szemléletes bizonyítása"
        icon={<Ruler className="w-5 h-5 text-amber-600" />}
      >
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          A görög bölcs és matematikus, <strong className="text-amber-700 dark:text-amber-300">milétoszi Thálész</strong>{' '}
          (i. e. 6. század) fedezte fel az átmérő és a körív pontjai közötti különleges szögkapcsolatot.
        </p>

        <TheoryCallout
          title="Thálész tétele"
          type="info"
        >
          Ha egy kör átmérőjének két végpontját (A és B) összekötjük a körvonal bármely más tetszőleges pontjával (C),
          akkor az így kapott háromszög mindig <strong>derékszögű lesz</strong>, és a derékszög pontosan a körív pontjánál (C) keletkezik:
          <div className="text-center font-mono font-bold text-sm my-2 text-indigo-900 dark:text-indigo-200">
            ∠ACB = 90°
          </div>
        </TheoryCallout>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <GeometryFigureCard
            title="A Thálész-kör több ponttal szemléltetve"
            badge="Tétel Dinamikája"
            color="indigo"
            description="Bárhová helyezzük a C pontot az átmérő fölötti félköríven (C₁, C₂, C₃), a belső szög mindig pontosan 90° marad!"
            figure={
              <svg viewBox="0 0 340 180" className="w-full max-w-sm h-auto">
                {/* Félkörív és átmérő */}
                <path d="M 30 140 A 130 130 0 0 1 290 140" fill="#e0e7ff" fillOpacity="0.4" stroke="#4f46e5" strokeWidth="2" />
                <line x1="30" y1="140" x2="290" y2="140" stroke="#1e293b" strokeWidth="2.5" />
                <circle cx="160" cy="140" r="3.5" fill="#4338ca" />
                <text x="160" y="158" className="text-[10px] font-bold fill-indigo-700" textAnchor="middle">O (Középpont)</text>

                {/* 1. Háromszög C1: C1(56, 62) mert (56-160)² + (62-140)² = (-104)² + (-78)² = 16900 = 130² */}
                <polygon points="30,140 56,62 290,140" fill="none" stroke="#d97706" strokeWidth="1.5" />
                <circle cx="56" cy="62" r="3" fill="#d97706" />
                <text x="50" y="55" className="text-[10px] font-black fill-amber-800" textAnchor="middle">C₁ (90°)</text>
                {/* Magyar derékszög jelölés C1-ben: negyedkörív és pont */}
                <path d="M 50 75 A 14 14 0 0 0 68 67" fill="none" stroke="#d97706" strokeWidth="1.5" />
                <circle cx="58" cy="72" r="1.5" fill="#d97706" />

                {/* 2. Háromszög C2: C2(160, 10) pontosan a félkör csúcsán */}
                <polygon points="30,140 160,10 290,140" fill="none" stroke="#2563eb" strokeWidth="2" />
                <circle cx="160" cy="10" r="3.5" fill="#2563eb" />
                <text x="160" y="0" className="text-[10px] font-black fill-blue-800" textAnchor="middle">C₂ (90°)</text>
                {/* Magyar derékszög jelölés C2-ben: negyedkörív és pont */}
                <path d="M 148 22 A 18 18 0 0 0 172 22" fill="none" stroke="#2563eb" strokeWidth="1.8" />
                <circle cx="160" cy="24" r="2" fill="#2563eb" />

                {/* 3. Háromszög C3: C3(238, 36) mert (238-160)² + (36-140)² = 78² + (-104)² = 16900 = 130² */}
                <polygon points="30,140 238,36 290,140" fill="none" stroke="#059669" strokeWidth="1.5" />
                <circle cx="238" cy="36" r="3" fill="#059669" />
                <text x="242" y="26" className="text-[10px] font-black fill-emerald-800" textAnchor="middle">C₃ (90°)</text>
                {/* Magyar derékszög jelölés C3-ban: negyedkörív és pont */}
                <path d="M 226 44 A 14 14 0 0 0 248 48" fill="none" stroke="#059669" strokeWidth="1.5" />
                <circle cx="236" cy="46" r="1.5" fill="#059669" />

                <text x="20" y="145" className="text-[11px] font-black fill-slate-800">A</text>
                <text x="295" y="145" className="text-[11px] font-black fill-slate-800">B</text>
              </svg>
            }
          />

          <GeometryFigureCard
            title="A Thálész-tétel Geometriai Bizonyítása"
            badge="Bizonyítás"
            color="purple"
            description="Kössük össze a C csúcsot az O középponttal! Két egyenlő szárú háromszög keletkezik (AOC és BOC, szárak hossza = R). A szögek összege: 2α + 2β = 180° ⇒ α + β = 90°!"
            figure={
              <svg viewBox="0 0 340 180" className="w-full max-w-sm h-auto">
                <path d="M 30 140 A 130 130 0 0 1 290 140" fill="#fdf4ff" fillOpacity="0.4" stroke="#a855f7" strokeWidth="1.8" />
                {/* C(110, 20) pontosan a félkörön fekszik: (110-160)² + (20-140)² = (-50)² + (-120)² = 130² = R² */}
                <polygon points="30,140 110,20 290,140" fill="#fef3c7" fillOpacity="0.4" stroke="#d97706" strokeWidth="2" />
                {/* Magyar derékszög jelölés a C csúcsban: negyedkörív és pont */}
                <path d="M 100 35 A 18 18 0 0 0 125 30" fill="none" stroke="#d97706" strokeWidth="1.6" />
                <circle cx="112" cy="29" r="1.8" fill="#d97706" />
                {/* Sugár O-ból C-be: hossza pontosan 130 (R) */}
                <line x1="160" y1="140" x2="110" y2="20" stroke="#7e22ce" strokeWidth="2" strokeDasharray="3 3" />
                <line x1="30" y1="140" x2="290" y2="140" stroke="#1e293b" strokeWidth="2" />

                {/* Sugár címkék */}
                <text x="90" y="148" className="text-[9px] font-bold fill-purple-700" textAnchor="middle">R</text>
                <text x="225" y="148" className="text-[9px] font-bold fill-purple-700" textAnchor="middle">R</text>
                <text x="142" y="75" className="text-[9px] font-bold fill-purple-700">R</text>

                {/* Szögek */}
                <text x="50" y="135" className="text-[10px] font-bold fill-amber-700">α</text>
                <text x="95" y="44" className="text-[10px] font-bold fill-amber-700">α</text>
                <text x="124" y="42" className="text-[10px] font-bold fill-blue-700">β</text>
                <text x="265" y="135" className="text-[10px] font-bold fill-blue-700">β</text>

                {/* Csúcsok */}
                <circle cx="110" cy="20" r="3.5" fill="#b45309" />
                <text x="110" y="10" className="text-[10px] font-black fill-amber-900" textAnchor="middle">C</text>
                <circle cx="160" cy="140" r="3" fill="#7e22ce" />
                <text x="160" y="155" className="text-[9px] font-bold fill-purple-900" textAnchor="middle">O</text>

                <rect x="180" y="20" width="135" height="42" rx="6" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" />
                <text x="247" y="36" className="text-[9px] font-bold fill-slate-800" textAnchor="middle">2α + 2β = 180°</text>
                <text x="247" y="52" className="text-[10px] font-black fill-purple-700" textAnchor="middle">α + β = 90° = ∠C</text>
              </svg>
            }
          />
        </div>
      </TheorySection>

      {/* 4. RÉSZ: INTERAKTÍV TAPASZTALATI MÉRÉS ÉS A NÉGYZETEK TERÜLETE */}
      <TheorySection
        title="4. Kísérleti Mérések: A Befogók és Átfogó Négyzetei"
        subtitle="Interaktív laboratórium és darabolásos átrendezés"
        icon={<Shapes className="w-5 h-5 text-amber-600" />}
      >
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          Rajzoljunk egy derékszögű háromszög mindhárom oldalára kifelé egy-egy négyzetet! Mérjük meg a befogókra emelt
          két kisebb négyzet területét (<MathText>T_a = a^2</MathText> és <MathText>T_b = b^2</MathText>), majd az
          átfogóra emelt nagy négyzet területét (<MathText>T_c = c^2</MathText>).
        </p>

        {/* INTERAKTÍV SZIMULÁTOR DOBOZ */}
        <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-b from-amber-50/60 via-white to-orange-50/40 dark:from-slate-900 dark:to-slate-850 border-2 border-amber-300 dark:border-amber-800/80 shadow-lg my-4 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-amber-200/70 dark:border-amber-900/50 pb-3">
            <div>
              <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-600" />
                Interaktív Terület-összehasonlító Labor
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Válassz előre beállított méreteket, vagy változtasd a befogók hosszát csúszkákkal!
              </p>
            </div>
            {/* Presets */}
            <div className="flex flex-wrap gap-1.5">
              {presets.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setLegA(p.a);
                    setLegB(p.b);
                  }}
                  className={`text-[11px] px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer border ${
                    legA === p.a && legB === p.b
                      ? 'bg-amber-600 text-white border-amber-700 shadow-xs'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-amber-50'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Sliders */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-3 bg-white dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-1">
              <div className="flex justify-between text-xs font-bold text-amber-900 dark:text-amber-300">
                <span>„a” befogó hossza:</span>
                <span className="font-mono text-sm">{legA} cm</span>
              </div>
              <input
                type="range"
                min="2"
                max="12"
                step="1"
                value={legA}
                onChange={(e) => setLegA(Number(e.target.value))}
                className="w-full accent-amber-600 cursor-pointer"
              />
              <div className="text-[10px] text-slate-500 flex justify-between">
                <span>Rá emelt négyzet: Ta = {legA}² = {areaA} cm²</span>
              </div>
            </div>

            <div className="p-3 bg-white dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-1">
              <div className="flex justify-between text-xs font-bold text-amber-900 dark:text-amber-300">
                <span>„b” befogó hossza:</span>
                <span className="font-mono text-sm">{legB} cm</span>
              </div>
              <input
                type="range"
                min="2"
                max="16"
                step="1"
                value={legB}
                onChange={(e) => setLegB(Number(e.target.value))}
                className="w-full accent-amber-600 cursor-pointer"
              />
              <div className="text-[10px] text-slate-500 flex justify-between">
                <span>Rá emelt négyzet: Tb = {legB}² = {areaB} cm²</span>
              </div>
            </div>
          </div>

          {/* Vizuális összehasonlító kártyák */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-center">
              <div className="text-[10px] font-bold text-amber-700 dark:text-amber-400 uppercase">„a” Befogó Négyzete</div>
              <div className="text-xl sm:text-2xl font-black text-amber-950 dark:text-amber-200 font-mono mt-0.5">
                Ta = {areaA} cm²
              </div>
              <div className="text-[10px] text-amber-600 dark:text-amber-400 mt-0.5">{legA} × {legA}</div>
            </div>

            <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-center">
              <div className="text-[10px] font-bold text-amber-700 dark:text-amber-400 uppercase">„b” Befogó Négyzete</div>
              <div className="text-xl sm:text-2xl font-black text-amber-950 dark:text-amber-200 font-mono mt-0.5">
                Tb = {areaB} cm²
              </div>
              <div className="text-[10px] text-amber-600 dark:text-amber-400 mt-0.5">{legB} × {legB}</div>
            </div>

            <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border-2 border-emerald-400 dark:border-emerald-700 text-center shadow-xs">
              <div className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 uppercase">Átfogó Négyzete (Ta + Tb)</div>
              <div className="text-xl sm:text-2xl font-black text-emerald-950 dark:text-emerald-200 font-mono mt-0.5">
                Tc = {areaC} cm²
              </div>
              <div className="text-[10px] text-emerald-600 dark:text-emerald-400 mt-0.5">
                <MathText>{`c = √${areaC} ≈ ${hypotenuse.toFixed(2)} cm`}</MathText>
              </div>
            </div>
          </div>

          {/* Élő egyenlőség levezetés */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-1">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">A Kísérleti Eredmény</div>
            <div className="text-base sm:text-lg font-black text-slate-900 dark:text-white font-mono flex items-center justify-center gap-2 flex-wrap">
              <span className="text-amber-600">{areaA}</span>
              <span>+</span>
              <span className="text-amber-600">{areaB}</span>
              <span>=</span>
              <span className="text-emerald-600 underline decoration-2 decoration-emerald-500">{areaC}</span>
              <span className="text-xs font-normal text-slate-500">({legA}² + {legB}² = {hypotenuse.toFixed(2)}²)</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              A két befogóra emelt négyzet területe <strong>pontosan összeadódik</strong> az átfogóra emelt négyzet területévé!
            </p>
          </div>
        </div>

        {/* 2 DB ÁBRA A NÉGYZETEKRŐL ÉS AZ ÁTRENDEZÉSRŐL */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <GeometryFigureCard
            title="A Klasszikus 3-4-5 Pitagoraszi Négyzetek"
            badge="Négyzethálós Mérés"
            color="amber"
            description="A 3 és 4 hosszúságú befogókra 9 és 16 négyzetből álló rács épül, míg az 5 hosszúságú átfogóra pontosan 25 négyzetből álló rács (9 + 16 = 25)."
            figure={
              <svg viewBox="0 0 340 300" className="w-full max-w-xs h-auto">
                {/* Háromszög csúcsai: C(120, 160), B(200, 160), A(120, 100) */}
                <polygon points="120,160 200,160 120,100" fill="#fef3c7" stroke="#b45309" strokeWidth="2" />
                {/* Magyar derékszög jelölés C-ben: negyedkörív és pont */}
                <path d="M 120 144 A 16 16 0 0 1 136 160" fill="none" stroke="#b45309" strokeWidth="1.8" />
                <circle cx="127" cy="153" r="2" fill="#b45309" />

                {/* a = 4 befogó négyzete (lent, 4x4) */}
                <g fill="#fed7aa" stroke="#ea580c" strokeWidth="0.8">
                  {Array.from({ length: 4 }).map((_, r) =>
                    Array.from({ length: 4 }).map((__, c) => (
                      <rect key={`a-${r}-${c}`} x={120 + c * 20} y={160 + r * 20} width="20" height="20" />
                    ))
                  )}
                </g>
                <text x="160" y="205" className="text-[12px] font-black fill-orange-950" textAnchor="middle">Tb = 16</text>

                {/* b = 3 befogó négyzete (balra, 3x3) */}
                <g fill="#fde68a" stroke="#d97706" strokeWidth="0.8">
                  {Array.from({ length: 3 }).map((_, r) =>
                    Array.from({ length: 3 }).map((__, c) => (
                      <rect key={`b-${r}-${c}`} x={60 + c * 20} y={100 + r * 20} width="20" height="20" />
                    ))
                  )}
                </g>
                <text x="90" y="135" className="text-[12px] font-black fill-amber-950" textAnchor="middle">Ta = 9</text>

                {/* c = 5 átfogó négyzete (az AB átfogóra illesztve, kifelé építve) */}
                <g transform="translate(120, 100) rotate(36.87)" fill="#bbf7d0" stroke="#16a34a" strokeWidth="0.8">
                  {Array.from({ length: 5 }).map((_, r) =>
                    Array.from({ length: 5 }).map((__, c) => (
                      <rect key={`c-${r}-${c}`} x={c * 20} y={-100 + r * 20} width="20" height="20" />
                    ))
                  )}
                  <text x="50" y="-45" className="text-[13px] font-black fill-emerald-950" textAnchor="middle">Tc = 25</text>
                </g>
              </svg>
            }
          />

          <GeometryFigureCard
            title="Darabolásos Átrendezéses Modell"
            badge="Két Nagy Négyzet"
            color="emerald"
            description="Két azonos (a+b) oldalú nagy négyzetből 4-4 egybevágó derékszögű háromszöget elhagyva: Balra megmarad Ta + Tb, jobbra megmarad Tc. Tehát a² + b² = c²!"
            figure={
              <svg viewBox="0 0 340 170" className="w-full max-w-sm h-auto">
                {/* Bal oldali (a+b) nagy négyzet (130x130, (20,20)) */}
                <rect x="20" y="20" width="130" height="130" fill="#f8fafc" stroke="#64748b" strokeWidth="1.5" />
                {/* 4 derékszögű háromszög: 2 db a felső-bal 40x90 téglalapban, 2 db az alsó-jobb 90x40 téglalapban */}
                <polygon points="20,20 60,20 20,110" fill="#fed7aa" stroke="#ea580c" strokeWidth="1" />
                <polygon points="60,20 60,110 20,110" fill="#fed7aa" stroke="#ea580c" strokeWidth="1" />
                <polygon points="60,110 150,110 60,150" fill="#fed7aa" stroke="#ea580c" strokeWidth="1" />
                <polygon points="150,110 150,150 60,150" fill="#fed7aa" stroke="#ea580c" strokeWidth="1" />
                {/* Maradék két négyzet: a² és b² */}
                <rect x="60" y="20" width="90" height="90" fill="#fde68a" stroke="#d97706" strokeWidth="1.5" />
                <text x="105" y="70" className="text-[12px] font-black fill-amber-900" textAnchor="middle">b²</text>
                <rect x="20" y="110" width="40" height="40" fill="#fde68a" stroke="#d97706" strokeWidth="1.5" />
                <text x="40" y="135" className="text-[10px] font-black fill-amber-900" textAnchor="middle">a²</text>
                <text x="85" y="165" className="text-[10px] font-bold fill-slate-700" textAnchor="middle">Maradék: a² + b²</text>

                {/* Jobb oldali (a+b) nagy négyzet (130x130, (190,20)) */}
                <rect x="190" y="20" width="130" height="130" fill="#f8fafc" stroke="#64748b" strokeWidth="1.5" />
                {/* 4 háromszög széleken */}
                <polygon points="190,60 280,20 190,20" fill="#fed7aa" stroke="#ea580c" strokeWidth="1" />
                <polygon points="280,20 320,110 320,20" fill="#fed7aa" stroke="#ea580c" strokeWidth="1" />
                <polygon points="320,110 230,150 320,150" fill="#fed7aa" stroke="#ea580c" strokeWidth="1" />
                <polygon points="230,150 190,60 190,150" fill="#fed7aa" stroke="#ea580c" strokeWidth="1" />
                {/* Maradék ferde c² négyzet */}
                <polygon points="190,60 280,20 320,110 230,150" fill="#bbf7d0" stroke="#16a34a" strokeWidth="1.5" />
                <text x="255" y="90" className="text-[13px] font-black fill-emerald-950" textAnchor="middle">c²</text>
                <text x="255" y="165" className="text-[10px] font-bold fill-slate-700" textAnchor="middle">Maradék: c²</text>
              </svg>
            }
          />
        </div>
      </TheorySection>

      {/* 5. RÉSZ: NÉGYZETHÁLÓS FERDE SZAKASZOK ÉS GYAKORI HIBÁK */}
      <TheorySection
        title="5. Ferde Szakaszok Négyzethálón és Tipikus Buktatók"
        subtitle="Hogyan mérünk ferde távolságokat a rácsvonalak mentén, és mire figyeljünk?"
        icon={<AlertTriangle className="w-5 h-5 text-amber-600" />}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <GeometryFigureCard
            title="Ferde Szakasz Hossza Négyzethálón"
            badge="Alkalmazás"
            color="sky"
            description="Két rácspont távolságát mindig egy olyan derékszögű háromszög átfogójaként számolhatjuk ki, amelynek befogói a rácsvonalakkal párhuzamos elmozdulások (Δx = 4, Δy = 3 ⇒ c = 5)."
            figure={
              <svg viewBox="0 0 300 180" className="w-full max-w-xs h-auto">
                {/* Rácsháló */}
                <g stroke="#e2e8f0" strokeWidth="1">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <line key={`gx-${i}`} x1={30 + i * 30} y1="20" x2={30 + i * 30} y2="160" />
                  ))}
                  {Array.from({ length: 6 }).map((_, i) => (
                    <line key={`gy-${i}`} x1="30" y1={20 + i * 28} x2={270} y2={20 + i * 28} />
                  ))}
                </g>

                {/* Befogók: (60, 132) -> (180, 132) vízszintes = 4 egység (120px), (180, 132) -> (180, 48) függőleges = 3 egység (84px) */}
                <line x1="60" y1="132" x2="180" y2="132" stroke="#0284c7" strokeWidth="2.5" />
                <line x1="180" y1="132" x2="180" y2="48" stroke="#0284c7" strokeWidth="2.5" />
                {/* Magyar derékszög jelölés a derékszögű csúcsban: negyedkörív és pont */}
                <path d="M 180 117 A 15 15 0 0 0 165 132" fill="none" stroke="#0284c7" strokeWidth="1.8" />
                <circle cx="173" cy="125" r="1.8" fill="#0284c7" />

                {/* Ferde átfogó szakasz */}
                <line x1="60" y1="132" x2="180" y2="48" stroke="#dc2626" strokeWidth="3" />
                <circle cx="60" cy="132" r="4.5" fill="#1e293b" />
                <text x="50" y="145" className="text-[11px] font-black fill-slate-800">A (1; 1)</text>
                <circle cx="180" cy="48" r="4.5" fill="#1e293b" />
                <text x="180" y="38" className="text-[11px] font-black fill-slate-800">B (5; 4)</text>

                <text x="120" y="148" className="text-[10px] font-black fill-sky-800" textAnchor="middle">Δx = 4 egység</text>
                <text x="195" y="95" className="text-[10px] font-black fill-sky-800">Δy = 3</text>
                <text x="105" y="80" className="text-[12px] font-black fill-rose-600">c = 5</text>
              </svg>
            }
          />

          <div className="flex flex-col justify-center space-y-3 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
              <Lightbulb className="w-4 h-4 text-amber-500" />
              A Rácstávolság Számításának Szabálya
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Bármely két pont távolsága a síkban felírható a vízszintes és függőleges koordinátakülönbségek
              négyzeteinek összegeként:
            </p>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-center">
              <strong className="text-indigo-600 dark:text-indigo-400"><MathText>d = √[(x₂ - x₁)² + (y₂ - y₁)²]</MathText></strong>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Ez nem más, mint a Pitagorasz-tétel koordinátageometriai alakja!
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <TheoryTrapBox
            title="1. Tévhit: Az oldalak összege egyenlő (a + b = c)"
            wrong="„Ha a befogók 3 cm és 4 cm hosszúak, akkor az átfogó 3 + 4 = 7 cm.”"
            correct="„Nem az oldalak, hanem a területek adódnak össze: 3² + 4² = 9 + 16 = 25 = 5², tehát az átfogó 5 cm!”"
            tip="A háromszög-egyenlőtlenség miatt bármely két oldal összege szigorúan nagyobb a harmadiknál: a + b > c (a legrövidebb út az egyenes szakasz)."
          />

          <TheoryTrapBox
            title="2. Tévhit: A tétel bármilyen háromszögre alkalmazható"
            wrong="„Egy hegyesszögű háromszögben a² + b² = c².”"
            correct="„A Pitagorasz-összefüggés KIZÁRÓLAG akkor érvényes, ha a háromszög egyik belső szöge pontosan 90°!”"
            tip="Hegyesszögű háromszögben a² + b² > c², tompaszögű háromszögben pedig a² + b² < c²."
          />

          <TheoryTrapBox
            title="3. Tévhit: A Thálész-körben a magasság tetszőleges lehet"
            wrong="„Ha az átfogó c = 10 cm, akkor szerkeszthetünk hozzá mc = 8 cm-es magasságú derékszögű háromszöget.”"
            correct="„A Thálész-kör sugara R = c / 2 = 5 cm. A magasság nem lehet nagyobb a sugárnál, azaz mc ≤ 5 cm!”"
            tip="Ha mc > c/2, az átfogóval párhuzamos egyenes nem metszi a Thálész-kört, így nincs valós megoldás."
          />
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default ConstructionsMeasurementsTheory;
