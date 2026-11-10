import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
  MathText
} from '../TheoryTemplate';
import {
  ChapterRoadmapSvg,
  EquationTaxonomySvg,
  ComprehensiveDiscriminantSvg,
  MasterProblemSolvingPipelineSvg
} from './ComprehensiveReviewFigures';
import {
  Calculator,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Scale,
  Sparkles,
  Layers,
  Compass,
  Trophy,
  Target,
  Sliders,
  RotateCcw,
  Check
} from 'lucide-react';

interface ComprehensiveReviewTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

export const ComprehensiveReviewTheory: React.FC<ComprehensiveReviewTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // --- Interactive Lab: Átfogó Egyenlet és Modell Diagnosztika Állapot ---
  const [aCoeff, setACoeff] = useState<number>(1);
  const [bCoeff, setBCoeff] = useState<number>(-5);
  const [cCoeff, setCCoeff] = useState<number>(6);

  // Számítások
  const discriminant = bCoeff * bCoeff - 4 * aCoeff * cCoeff;
  const vertexX = -bCoeff / (2 * aCoeff);
  const vertexY = cCoeff - (bCoeff * bCoeff) / (4 * aCoeff);

  let rootCount = 0;
  let root1: number | null = null;
  let root2: number | null = null;

  if (discriminant > 0) {
    rootCount = 2;
    root1 = (-bCoeff + Math.sqrt(discriminant)) / (2 * aCoeff);
    root2 = (-bCoeff - Math.sqrt(discriminant)) / (2 * aCoeff);
  } else if (discriminant === 0) {
    rootCount = 1;
    root1 = -bCoeff / (2 * aCoeff);
    root2 = root1;
  } else {
    rootCount = 0;
  }

  const setPreset = (a: number, b: number, c: number) => {
    setACoeff(a);
    setBCoeff(b);
    setCCoeff(c);
  };

  return (
    <TheoryTemplate
      title="Gyakorlás, tudáspróba"
      subtitle="A 10. osztályos másodfokú egyenletek átfogó összefoglalása, a megoldási arzenál szintézise és témazáró felkészítő"
      badge="12. Lecke • Témazáró Összefoglalás"
      color="violet"
      estimatedTime="35 perc"
      onBack={onBack}
      onStartPractice={onStartQuiz}
      practiceButtonText="Tudáspróba indítása"
      sections={[
        {
          id: 'sec-overview',
          title: '1. A fejezet áttekintése: Az alaptípusok és megoldási arzenál',
          description:
            'Minden másodfokú egyenlet alapformája ax² + bx + c = 0 (ahol a ≠ 0). Az együtthatók meghatározzák a leggyorsabb utat.',
          color: 'indigo',
          badge: 'Tématérkép',
          content: (
            <div className="space-y-6">
              <TheoryCard
                title="A másodfokú egyenletek 5 pillére"
                color="indigo"
                icon={<Layers className="w-5 h-5 text-indigo-600" />}
              >
                <div className="space-y-4 text-slate-700 dark:text-slate-300 text-sm">
                  <p>
                    A másodfokú egyenletek fejezete a legegyszerűbb hiányos formáktól indulva a megoldóképlet általánosításán át vezet el a komplex gazdasági, geometriai és fizikai folyamatok matematikai modellezéséig.
                  </p>

                  <div className="my-4 p-4 bg-gradient-to-b from-indigo-50/50 to-purple-50/40 dark:bg-slate-900/60 rounded-2xl border border-indigo-100 dark:border-indigo-900 shadow-xs flex flex-col items-center">
                    <ChapterRoadmapSvg size={480} className="w-full max-w-xl" />
                    <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-2.5 font-medium">
                      A fejezet szerkezete: a hiányos alapoktól a szöveges problémák modellezéséig
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="p-3 bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-xl space-y-1">
                      <span className="font-bold text-blue-900 dark:text-blue-300 text-xs">Hiányos egyenletek</span>
                      <p className="text-[11px] text-slate-600 dark:text-slate-400">
                        Ha c = 0, azonnali kiemelés: x(ax + b) = 0. Ha b = 0, közvetlen gyökvonás: x² = -c/a.
                      </p>
                    </div>
                    <div className="p-3 bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-xl space-y-1">
                      <span className="font-bold text-emerald-900 dark:text-emerald-300 text-xs">Teljes négyzet &amp; Képlet</span>
                      <p className="text-[11px] text-slate-600 dark:text-slate-400">
                        (x + d)² = k alak geometriai háttere és a megoldóképlet általános érvényessége bármely együtthatóra.
                      </p>
                    </div>
                    <div className="p-3 bg-purple-50/70 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 rounded-xl space-y-1">
                      <span className="font-bold text-purple-900 dark:text-purple-300 text-xs">Modellezés &amp; Visszavezetés</span>
                      <p className="text-[11px] text-slate-600 dark:text-slate-400">
                        Biquadratikus (u = x²), törtes egyenletek és valós életszituációk (Pitagorasz, kamat, mozgás).
                      </p>
                    </div>
                  </div>
                </div>
              </TheoryCard>
            </div>
          )
        },
        {
          id: 'sec-formula-discriminant',
          title: '2. A megoldóképlet és a diszkrimináns szentháromsága',
          description:
            'A másodfokú egyenlet univerzális kulcsa a diszkrimináns D = b² - 4ac, amely meghatározza a valós gyökök számát és természetét.',
          color: 'emerald',
          badge: 'Univerzális Képlet',
          content: (
            <div className="space-y-6">
              <TheoryCard
                title="A megoldóképlet és a gyökök száma"
                color="emerald"
                formula="x_{1,2} = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}"
                icon={<Calculator className="w-5 h-5 text-emerald-600" />}
              >
                <div className="space-y-4 text-slate-700 dark:text-slate-300 text-sm">
                  <p>
                    A gyökjel alatti kifejezést <strong>diszkriminánsnak</strong> nevezzük: $D = b^2 - 4ac$. Értéke három alapvető kategóriába sorolja a másodfokú egyenleteket:
                  </p>

                  <div className="my-4 p-4 bg-gradient-to-b from-emerald-50/40 to-teal-50/30 dark:bg-slate-900/60 rounded-2xl border border-emerald-100 dark:border-emerald-900 shadow-xs flex flex-col items-center">
                    <ComprehensiveDiscriminantSvg size={480} className="w-full max-w-xl" />
                    <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-2.5 font-medium">
                      A diszkrimináns előjele és a hozzá tartozó parabola x-tengely metszéspontjainak száma
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl space-y-1">
                      <span className="font-bold text-emerald-900 text-xs">D &gt; 0 (Két valós gyök)</span>
                      <p className="text-[11px] text-slate-600">
                        A gyökvonás elvégezhető, két különböző valós számot kapunk. A parabola kétszer metszi az x-tengelyt.
                      </p>
                      <p className="text-[10.5px] font-mono text-emerald-800">x₁,₂ = (-b ± √D)/(2a)</p>
                    </div>
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl space-y-1">
                      <span className="font-bold text-blue-900 text-xs">D = 0 (Egy valós kettős gyök)</span>
                      <p className="text-[11px] text-slate-600">
                        A ±√0 = 0 miatt a két gyök egybeesik. A parabola csúcspontja éppen érinti az x-tengelyt.
                      </p>
                      <p className="text-[10.5px] font-mono text-blue-800">x = -b / (2a)</p>
                    </div>
                    <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl space-y-1">
                      <span className="font-bold text-rose-900 text-xs">D &lt; 0 (Nincs valós gyök)</span>
                      <p className="text-[11px] text-slate-600">
                        A valós számok körében negatív számból nem vonhatunk páros kitevőjű gyököt. A parabola nem éri el a tengelyt.
                      </p>
                      <p className="text-[10.5px] font-mono text-rose-800">x ∈ ∅ (üres halmaz)</p>
                    </div>
                  </div>

                  <div className="p-3.5 bg-amber-50/80 border border-amber-200 rounded-xl space-y-1.5 text-xs">
                    <span className="font-bold text-amber-900">🔗 Kapcsolat a gyöktényezős alakkal és Viète-formulákkal:</span>
                    <p className="text-slate-700">
                      Ha az egyenletnek vannak gyökei ($x_1$ és $x_2$), akkor szorzattá alakítható: $a(x - x_1)(x - x_2) = 0$.
                      Továbbá főegyütthatóval leosztva ($x^2 + px + q = 0$) érvényesek a Viète-formulák: $x_1 + x_2 = -p$ és $x_1 \cdot x_2 = q$.
                    </p>
                  </div>
                </div>
              </TheoryCard>
            </div>
          )
        },
        {
          id: 'sec-reducible',
          title: '3. Visszavezetési technikák: Új ismeretlen és törtes egyenletek',
          description:
            'Sok magasabb fokú vagy algebrai törtet tartalmazó egyenlet megfelelő helyettesítéssel és átalakítással másodfokúvá egyszerűsíthető.',
          color: 'purple',
          badge: 'Visszavezetés',
          content: (
            <div className="space-y-6">
              <TheoryCard
                title="Döntési fa a helyes megoldási módszer kiválasztásához"
                color="purple"
                icon={<Scale className="w-5 h-5 text-purple-600" />}
              >
                <div className="space-y-4 text-slate-700 dark:text-slate-300 text-sm">
                  <p>
                    A vizsgán az időgazdálkodás kulcsa a leggyorsabb módszer azonnali felismerése. Ne indítsunk azonnal megoldóképletet, ha van rövidebb út!
                  </p>

                  <div className="my-4 p-4 bg-gradient-to-b from-purple-50/40 to-pink-50/30 dark:bg-slate-900/60 rounded-2xl border border-purple-100 dark:border-purple-900 shadow-xs flex flex-col items-center">
                    <EquationTaxonomySvg size={480} className="w-full max-w-xl" />
                    <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-2.5 font-medium">
                      Gyors döntési fa: a hiányos formák, teljes egyenlet és visszavezetési típusok elágazásai
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-3.5 bg-indigo-50/70 border border-indigo-200 rounded-xl space-y-2">
                      <span className="font-bold text-indigo-950 text-xs">1. Biquadratikus egyenletek (ax⁴ + bx² + c = 0)</span>
                      <p className="text-xs text-slate-600">
                        Alkalmazzunk új ismeretlent: $u = x^2$, ahol fontos kikötés, hogy $u \ge 0$!
                      </p>
                      <div className="bg-white p-2.5 rounded-lg border border-indigo-100 font-mono text-[11px] text-indigo-900 space-y-0.5">
                        <p>x⁴ - 5x² + 4 = 0 ⟹ u² - 5u + 4 = 0</p>
                        <p>u₁ = 1 ⟹ x² = 1 ⟹ x = ±1</p>
                        <p>u₂ = 4 ⟹ x² = 4 ⟹ x = ±2</p>
                        <p className="text-emerald-700 font-bold">Megoldások: {'{ -2; -1; 1; 2 }'}</p>
                      </div>
                    </div>

                    <div className="p-3.5 bg-rose-50/70 border border-rose-200 rounded-xl space-y-2">
                      <span className="font-bold text-rose-950 text-xs">2. Törtes egyenletek másodfokúvá rendezése</span>
                      <p className="text-xs text-slate-600">
                        Első lépés mindig a nevezők kikötése (nevező ≠ 0), majd szorzás a közös nevezővel:
                      </p>
                      <div className="bg-white p-2.5 rounded-lg border border-rose-100 font-mono text-[11px] text-rose-900 space-y-0.5">
                        <p>Példa: (x + 3) / x = 4 / (x - 1)</p>
                        <p>Kikötés: x ≠ 0 és x ≠ 1</p>
                        <p>Keresztbeszorzás után: (x + 3)(x - 1) = 4x</p>
                        <p>x² + 2x - 3 = 4x ⟹ x² - 2x - 3 = 0</p>
                        <p className="text-emerald-700 font-bold">x₁ = 3 (jó), x₂ = -1 (jó)</p>
                      </div>
                    </div>
                  </div>
                </div>
              </TheoryCard>
            </div>
          )
        },
        {
          id: 'sec-word-problems',
          title: '4. Szöveges feladatok mesterstratégiája (geometria, pénzügy, mozgás/munka)',
          description:
            'A valós problémák matematikai egyenletté alakítása és az életszerű feltételek ellenőrzése.',
          color: 'amber',
          badge: 'Valós Modellezés',
          content: (
            <div className="space-y-6">
              <TheoryCard
                title="A szöveges feladatok megoldási algoritmusa"
                color="amber"
                icon={<Target className="w-5 h-5 text-amber-600" />}
              >
                <div className="space-y-4 text-slate-700 dark:text-slate-300 text-sm">
                  <p>
                    A szöveges feladatok megoldása szigorú, 5 lépéses fegyelmet igényel: a változó helyes értelmezésétől a hamis gyökök kizárásáig.
                  </p>

                  <div className="my-4 p-4 bg-gradient-to-b from-amber-50/40 to-orange-50/30 dark:bg-slate-900/60 rounded-2xl border border-amber-100 dark:border-amber-900 shadow-xs flex flex-col items-center">
                    <MasterProblemSolvingPipelineSvg size={480} className="w-full max-w-xl" />
                    <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-2.5 font-medium">
                      A megbízható megoldási csővezeték 5 fázisa
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl space-y-1">
                      <span className="font-bold text-amber-900 text-xs">Geometria (Oldalak)</span>
                      <p className="text-[11px] text-slate-600">
                        Pitagorasz-tétel ($a^2 + b^2 = c^2$), téglalap területe ($a \cdot b = T$). Feltétel: $a, b, c &gt; 0$! A negatív gyök azonnal eldobandó.
                      </p>
                    </div>
                    <div className="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-1">
                      <span className="font-bold text-emerald-900 text-xs">Pénzügy &amp; Gazdaság</span>
                      <p className="text-[11px] text-slate-600">
                        Árváltozás szorzója: $(1 + p/100)$. Bevétel = ár · eladott mennyiség. Költségmegosztás: $K / n - K / (n + 2) = d$.
                      </p>
                    </div>
                    <div className="p-3 bg-indigo-50/70 border border-indigo-200 rounded-xl space-y-1">
                      <span className="font-bold text-indigo-900 text-xs">Mozgás &amp; Munka</span>
                      <p className="text-[11px] text-slate-600">
                        Időkülönbség: s/v₁ - s/v₂ = Δt. Folyami hajó: v ± v_f. Közös munka: 1/t₁ + 1/t₂ = 1/t_közös.
                      </p>
                    </div>
                  </div>
                </div>
              </TheoryCard>
            </div>
          )
        },
        {
          id: 'sec-traps-checklist',
          title: '5. Típushibák feketelistája és önellenőrzési protokoll',
          description:
            'A leggyakoribb pontvesztések a dolgozatokban és a témazárókban, illetve ezek megelőzése.',
          color: 'rose',
          badge: 'Hibavédelem',
          content: (
            <div className="space-y-6">
              <TheoryTrapBox
                title="A 6 legveszélyesebb vizsgacsapda és megelőzésük"
                traps={[
                  {
                    trap: 'Két oldal leosztása x-szel (c = 0 esetén)',
                    explanation:
                      'A 2x² - 8x = 0 egyenletből leosztva x-szel megkapod a 2x = 8 ⟹ x = 4 gyököt, de véglegesen elveszíted az x = 0 gyököt, mert 0-val nem szabad osztani!',
                    correct: 'Mindig emelj ki x-et szorzóként: 2x(x - 4) = 0 ⟹ x₁ = 0 és x₂ = 4.'
                  },
                  {
                    trap: 'Előjelvesztés a diszkrimináns kiszámításakor (-4ac)',
                    explanation:
                      'Ha a konstans negatív (c = -5), akkor a -4ac tag: -4 · 2 · (-5) = +40! Nem szabad kivonni a 40-et, összeadássá válik a két mínusz miatt.',
                    correct: 'Írd ki zárójellel: b² - 4 · (a) · (c) = (-3)² - 4 · (2) · (-5) = 9 + 40 = 49.'
                  },
                  {
                    trap: 'Negatív szám négyzete zárójel nélkül (-b)²',
                    explanation:
                      'Számológépbe beírva -5² = -25-öt ad, pedig (-5)² = +25. A b² tag értéke a diszkriminánsban SOHA nem lehet negatív valós számoknál!',
                    correct: 'Bármilyen előjelű b esetén a b² értéke mindig nemnegatív (≥ 0).'
                  },
                  {
                    trap: 'Nevező elfelezése a megoldóképletben (csak /2 vagy /a)',
                    explanation:
                      'Gyakori hiba a nevezőben 2-vel osztani 2a helyett, amikor a főegyüttható nem 1 (például 3x² esetén a nevező 2 · 3 = 6, nem 2).',
                    correct: 'A nevező mindig 2 · a! Először írd fel a nevezőt szorzatként: 2 · 3 = 6.'
                  },
                  {
                    trap: 'Hamis gyök elfogadása szöveges feladatnál',
                    explanation:
                      'Geometriai oldalhossz (-8 cm), sebesség (-30 km/h) vagy személyek száma (-5 fő) nem lehet negatív.',
                    correct: 'Minden szöveges feladatnál írd fel: x > 0! A negatív gyök mellé kötelező odaírni: "nem ad valós megoldást a szöveg szerint".'
                  },
                  {
                    trap: 'Mértékegység átváltásának elmulasztása (perc és óra keverése)',
                    explanation:
                      'Ha a sebesség km/h-ban van megadva, és az időkülönbség 20 perc, akkor a 20-at közvetlenül nem vonhatod ki az órából!',
                    correct: '20 perc = 20/60 óra = 1/3 óra. Mindig azonos mértékegységrendszerben dolgozz.'
                  }
                ]}
              />

              <TheoryCallout
                title="🏆 Végső Vizsgastratégia: A 3 lépéses ellenőrzési rutin"
                color="violet"
              >
                <div className="space-y-2 text-xs sm:text-sm text-slate-800 dark:text-slate-200">
                  <p>
                    <strong>1. Gyökök behelyettesítése:</strong> Ha maradt időd a dolgozat végén, helyettesítsd vissza a kapott $x$ értékeket az eredeti egyenletbe!
                  </p>
                  <p>
                    <strong>2. Viète-gyorspróba:</strong> Ellenőrizd a gyökök összegét és szorzatát: $x_1 + x_2 = -b/a$ és $x_1 \cdot x_2 = c/a$. Ez 5 másodperc alatt leleplezi az elszámolást!
                  </p>
                  <p>
                    <strong>3. Szöveges válasz:</strong> Győződj meg róla, hogy a feltett kérdésre válaszoltál-e teljes mondattal és megfelelő mértékegységgel!
                  </p>
                </div>
              </TheoryCallout>
            </div>
          )
        }
      ]}
      interactiveSection={
        <div className="space-y-6">
          <TheoryCard
            title="Átfogó Másodfokú Egyenlet és Modell Diagnosztika"
            badge="Interaktív Mesterlabor"
            color="violet"
            icon={<Compass className="w-5 h-5 text-violet-600" />}
          >
            <div className="space-y-6">
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                Állítsd be az együtthatókat ($a, b, c$), és figyeld meg az egyenlet teljes algebrai anatómiáját: a diszkriminánst, a gyökök számát és értékét, a teljes négyzetté alakított alakot, valamint a parabola csúcspontját!
              </p>

              {/* Gyors sablon gombok */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Teszteld a fejezet archetípusait:
                </span>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setPreset(1, -5, 6)}
                    className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-emerald-100 text-emerald-800 hover:bg-emerald-200 transition"
                  >
                    Két egész gyök (x² - 5x + 6)
                  </button>
                  <button
                    onClick={() => setPreset(2, -8, 0)}
                    className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-blue-100 text-blue-800 hover:bg-blue-200 transition"
                  >
                    Hiányos: c = 0 (2x² - 8x)
                  </button>
                  <button
                    onClick={() => setPreset(3, 0, -27)}
                    className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-sky-100 text-sky-800 hover:bg-sky-200 transition"
                  >
                    Hiányos: b = 0 (3x² - 27)
                  </button>
                  <button
                    onClick={() => setPreset(1, -6, 9)}
                    className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-amber-100 text-amber-800 hover:bg-amber-200 transition"
                  >
                    Kettős gyök: D = 0 (x² - 6x + 9)
                  </button>
                  <button
                    onClick={() => setPreset(1, 2, 5)}
                    className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-rose-100 text-rose-800 hover:bg-rose-200 transition"
                  >
                    Nincs valós gyök: D &lt; 0 (x² + 2x + 5)
                  </button>
                  <button
                    onClick={() => setPreset(-1, 4, -3)}
                    className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-purple-100 text-purple-800 hover:bg-purple-200 transition"
                  >
                    Negatív főegyüttható (-x² + 4x - 3)
                  </button>
                </div>
              </div>

              {/* Együttható csúszkák */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs font-bold text-slate-700 dark:text-slate-300">
                    <span>Főegyüttható (a ≠ 0):</span>
                    <span className="font-mono text-violet-600 dark:text-violet-400 font-black">{aCoeff}</span>
                  </div>
                  <input
                    type="range"
                    min="-4"
                    max="4"
                    step="1"
                    value={aCoeff}
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      setACoeff(val === 0 ? (aCoeff > 0 ? -1 : 1) : val);
                    }}
                    className="w-full accent-violet-600"
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs font-bold text-slate-700 dark:text-slate-300">
                    <span>Elsőfokú együttható (b):</span>
                    <span className="font-mono text-blue-600 dark:text-blue-400 font-black">{bCoeff}</span>
                  </div>
                  <input
                    type="range"
                    min="-10"
                    max="10"
                    step="1"
                    value={bCoeff}
                    onChange={(e) => setBCoeff(parseInt(e.target.value))}
                    className="w-full accent-blue-600"
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs font-bold text-slate-700 dark:text-slate-300">
                    <span>Konstans tag (c):</span>
                    <span className="font-mono text-emerald-600 dark:text-emerald-400 font-black">{cCoeff}</span>
                  </div>
                  <input
                    type="range"
                    min="-30"
                    max="30"
                    step="1"
                    value={cCoeff}
                    onChange={(e) => setCCoeff(parseInt(e.target.value))}
                    className="w-full accent-emerald-600"
                  />
                </div>
              </div>

              {/* Aktuális egyenlet kijelzője */}
              <div className="p-4 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl text-center space-y-1 shadow-md">
                <span className="text-xs uppercase tracking-wider text-violet-200 font-bold">
                  Vizsgált másodfokú egyenlet:
                </span>
                <p className="text-2xl font-mono font-black">
                  {aCoeff === 1 ? '' : aCoeff === -1 ? '-' : aCoeff}x²{' '}
                  {bCoeff === 0 ? '' : bCoeff > 0 ? `+ ${bCoeff}x ` : `- ${Math.abs(bCoeff)}x `}
                  {cCoeff === 0 ? '' : cCoeff > 0 ? `+ ${cCoeff}` : `- ${Math.abs(cCoeff)}`}{' '}
                  = 0
                </p>
              </div>

              {/* Részletes Diagnosztikai Eredmények */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* 1. Kártya: Diszkrimináns és gyökök */}
                <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl space-y-3 shadow-xs">
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                    <span className="font-bold text-xs uppercase text-slate-600 dark:text-slate-300">
                      Diszkrimináns &amp; Gyökök
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                        discriminant > 0
                          ? 'bg-emerald-100 text-emerald-800'
                          : discriminant === 0
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {discriminant > 0
                        ? '2 valós gyök'
                        : discriminant === 0
                        ? '1 kettős gyök'
                        : '0 valós gyök'}
                    </span>
                  </div>

                  <div className="font-mono text-xs space-y-1.5 text-slate-700 dark:text-slate-300">
                    <p>
                      D = ({bCoeff})² - 4 · ({aCoeff}) · ({cCoeff}) ={' '}
                      <span className="font-bold text-violet-600 dark:text-violet-400">
                        {discriminant}
                      </span>
                    </p>
                    {rootCount === 2 && root1 !== null && root2 !== null && (
                      <div className="space-y-1 pt-1 border-t border-slate-100 dark:border-slate-800">
                        <p className="text-emerald-700 dark:text-emerald-400 font-bold">
                          x₁ = {Number.isInteger(root1) ? root1 : root1.toFixed(3)}
                        </p>
                        <p className="text-emerald-700 dark:text-emerald-400 font-bold">
                          x₂ = {Number.isInteger(root2) ? root2 : root2.toFixed(3)}
                        </p>
                        <p className="text-[11px] text-slate-500 font-sans">
                          Szorzat alak: {aCoeff !== 1 ? `${aCoeff} · ` : ''}(x - {root1.toFixed(2)})(x - {root2.toFixed(2)}) = 0
                        </p>
                      </div>
                    )}
                    {rootCount === 1 && root1 !== null && (
                      <div className="pt-1 border-t border-slate-100 dark:border-slate-800">
                        <p className="text-blue-700 dark:text-blue-400 font-bold">
                          x = {Number.isInteger(root1) ? root1 : root1.toFixed(3)} (kettős gyök)
                        </p>
                        <p className="text-[11px] text-slate-500 font-sans">
                          Teljes négyzet: {aCoeff !== 1 ? `${aCoeff} · ` : ''}(x - {root1.toFixed(2)})² = 0
                        </p>
                      </div>
                    )}
                    {rootCount === 0 && (
                      <p className="text-rose-700 dark:text-rose-400 font-bold pt-1 border-t border-slate-100 dark:border-slate-800">
                        Nincs megoldás a valós számok körében (x ∈ ∅)
                      </p>
                    )}
                  </div>
                </div>

                {/* 2. Kártya: Geometriai csúcspont és négyzetkiegészítés */}
                <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl space-y-3 shadow-xs">
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                    <span className="font-bold text-xs uppercase text-slate-600 dark:text-slate-300">
                      Csúcspont &amp; Négyzetes forma
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-purple-100 text-purple-800">
                      Parabola csúcs
                    </span>
                  </div>

                  <div className="font-mono text-xs space-y-1.5 text-slate-700 dark:text-slate-300">
                    <p>
                      Csúcspont koordinátái: M(u, v) ={' '}
                      <span className="font-bold text-purple-700 dark:text-purple-400">
                        M({vertexX.toFixed(2)}; {vertexY.toFixed(2)})
                      </span>
                    </p>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 font-sans">
                      Tengelypont: x = -b/(2a) = {vertexX.toFixed(2)}
                    </p>
                    <div className="pt-1 border-t border-slate-100 dark:border-slate-800">
                      <p className="text-[11px] text-slate-500 font-sans">Kanonikus (csúcsponti) alak:</p>
                      <p className="font-bold text-indigo-700 dark:text-indigo-400">
                        f(x) = {aCoeff !== 1 ? `${aCoeff} · ` : ''}(x {vertexX >= 0 ? `- ${vertexX.toFixed(2)}` : `+ ${Math.abs(vertexX).toFixed(2)}`})² {vertexY >= 0 ? `+ ${vertexY.toFixed(2)}` : `- ${Math.abs(vertexY).toFixed(2)}`}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TheoryCard>
        </div>
      }
      tips={[
        {
          title: 'Hiányos esetén sose használd a képletet!',
          description:
            'A c=0 kiemeléssel, a b=0 közvetlen gyökvonással 3 másodperc alatt megoldható, és nem kockáztatod a bonyolult képlethibát.'
        },
        {
          title: 'A D négyzetszám ellenőrzése',
          description:
            'Iskolai dolgozatokban a diszkrimináns 90%-ban négyzetszám (0, 1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144, 169...). Ha nem négyzetszám jön ki, számold újra a -4ac-t!'
        },
        {
          title: 'Szöveges feladat: 3 ellenőrzési pont',
          description:
            'Pozitív-e a hosszúság/idő? Megfelelő-e a mértékegység? Válaszoltál-e az eredeti kérdésre (pl. a téglalap MINDKÉT oldalára)?'
        }
      ]}
    />
  );
};

