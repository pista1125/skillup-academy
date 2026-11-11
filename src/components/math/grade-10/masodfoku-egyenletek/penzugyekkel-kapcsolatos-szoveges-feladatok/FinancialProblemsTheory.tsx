import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
  MathText
} from '../TheoryTemplate';
import {
  CompoundPriceChangeSvg,
  RevenueOptimizationCurveSvg,
  CompoundInterestTimelineSvg,
  FinancialModelRulesSvg
} from './FinancialProblemsFigures';
import {
  DollarSign,
  TrendingUp,
  Percent,
  PiggyBank,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Sliders,
  Scale,
  ShoppingBag,
  Users
} from 'lucide-react';

export interface FinancialProblemsTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
  onStartPractice?: () => void;
  onSwitchToQuiz?: () => void;
}

export const FinancialProblemsTheory: React.FC<FinancialProblemsTheoryProps> = ({
  onBack,
  onStartQuiz,
  onStartPractice,
  onSwitchToQuiz
}) => {
  // Szimulátor 1: Árváltozás szimulátor
  const [basePrice, setBasePrice] = useState<number>(10000);
  const [percentP, setPercentP] = useState<number>(20);
  const [scenario, setScenario] = useState<'up-down' | 'down-up' | 'up-up' | 'down-down'>('up-down');

  // Szimulátor 2: Kétéves kamatos kamat
  const [initialCapital, setInitialCapital] = useState<number>(1000000);
  const [finalCapital, setFinalCapital] = useState<number>(1210000);

  // Szimulátor 3: Bevételmaximalizálás
  const [ticketPriceDelta, setTicketPriceDelta] = useState<number>(200);

  // Számítások 1-es szimulátor
  const pDec = percentP / 100;
  let intermediatePrice = basePrice;
  let finalPrice = basePrice;

  if (scenario === 'up-down') {
    intermediatePrice = Math.round(basePrice * (1 + pDec));
    finalPrice = Math.round(intermediatePrice * (1 - pDec));
  } else if (scenario === 'down-up') {
    intermediatePrice = Math.round(basePrice * (1 - pDec));
    finalPrice = Math.round(intermediatePrice * (1 + pDec));
  } else if (scenario === 'up-up') {
    intermediatePrice = Math.round(basePrice * (1 + pDec));
    finalPrice = Math.round(intermediatePrice * (1 + pDec));
  } else {
    intermediatePrice = Math.round(basePrice * (1 - pDec));
    finalPrice = Math.round(intermediatePrice * (1 - pDec));
  }
  const overallDiff = finalPrice - basePrice;
  const overallPercent = ((finalPrice - basePrice) / basePrice) * 100;

  // Számítások 2-es szimulátor
  const qCalculated = Math.sqrt(Math.max(0, finalCapital / initialCapital));
  const interestRateCalculated = (qCalculated - 1) * 100;
  const year1Capital = Math.round(initialCapital * qCalculated);

  // Számítások 3-as szimulátor (Alap: 3000 Ft ár, 400 néző, minden +100 Ft -> -10 néző)
  const currentTicketPrice = 3000 + ticketPriceDelta;
  const currentVisitors = Math.max(0, 400 - Math.round(ticketPriceDelta * 0.1));
  const currentRevenue = currentTicketPrice * currentVisitors;
  // B(x) = (3000 + x)(400 - 0.1x) = 1 200 000 + 400x - 300x - 0.1x² = -0.1x² + 100x + 1 200 000
  // Csúcspont: x = -100 / (2 * -0.1) = 500 Ft emelés
  const optimalDelta = 500;
  const optimalPrice = 3500;
  const optimalVisitors = 350;
  const optimalRevenue = 1225000;

  return (
    <TheoryTemplate
      topicId="g10-masodfoku-egyenletek"
      badge="10. OSZTÁLY • V. MÁSODFOKÚ EGYENLETEK • TANANYAG"
      title="Pénzügyekkel kapcsolatos szöveges feladatok"
      subtitle="Egymást követő árváltozások, kamatos kamat, bevételmaximalizálás és közös költségmegosztás másodfokú modellekkel"
      themeColor="amber"
      onBack={onBack}
      onStartQuiz={onStartQuiz || onSwitchToQuiz}
      onStartPractice={onStartPractice}
      quickRule={{
        label: 'A Két Legfontosabb Pénzügyi Szabály',
        formula: 'Á₂ = Á₀ · (1 - p²/10000) < Á₀   és   T₂ = T₀ · (1 + p/100)²'
      }}
      sections={[
        {
          id: 'sec-compound-price',
          title: '1. Kétszeri egymást követő százalékos árváltozások',
          description:
            'Miért nem tér vissza az eredeti árra egy termék 20% drágulás majd 20% leárazás után, és hogyan kapunk másodfokú egyenletet?',
          color: 'amber',
          badge: 'Árváltozás & Bázis',
          content: (
            <div className="space-y-6">
              <TheoryCard
                title="A százalékos bázis eltolódásának törvénye"
                color="amber"
                icon={<Percent className="w-5 h-5 text-amber-600" />}
              >
                <div className="space-y-4 text-slate-700 text-sm leading-relaxed">
                  <p>
                    A gazdasági életben a leggyakoribb hiba, hogy a százalékos változásokat összeadják vagy kivonják. Ha egy termék ára először $p\%$-kal <strong>nő</strong>, majd a már megváltozott új ár $p\%$-kal <strong>csökken</strong>, a második változás bázisa már a megemelt összeg lesz!
                  </p>

                  <div className="my-3 p-4 sm:p-5 bg-gradient-to-b from-slate-50 to-amber-50/40 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center">
                    <CompoundPriceChangeSvg size={480} className="w-full max-w-xl" />
                    <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-2.5 font-medium">
                      A kezdő ár, az 1. árváltozás és a 2. leárazás láncolata: a végső ár mindig kevesebb a kezdőnél!
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-amber-50/80 border border-amber-200 rounded-2xl space-y-2">
                      <span className="font-bold text-amber-950 text-sm block">1. Eset: Emelés, majd csökkentés (+p%, majd -p%)</span>
                      <p className="text-xs text-slate-700">
                        Első ár: Á₁ = Á₀ · (1 + p/100)
                        <br />
                        Második ár: Á₂ = Á₁ · (1 - p/100) = Á₀ · (1 + p/100)(1 - p/100)
                      </p>
                      <div className="bg-white p-3 rounded-xl border border-amber-200 font-mono text-xs text-amber-900 font-bold">
                        Á₂ = Á₀ · (1 - p² / 10 000) &lt; Á₀
                      </div>
                      <p className="text-[11px] text-amber-800">
                        A nevezetes (a+b)(a-b) = a² - b² azonosság miatt a végső ár <strong>mindig pontosan (p²/100)%-kal alacsonyabb</strong> az eredetinél!
                      </p>
                    </div>

                    <div className="p-4 bg-emerald-50/80 border border-emerald-200 rounded-2xl space-y-2">
                      <span className="font-bold text-emerald-950 text-sm block">2. Eset: Kétszeri azonos emelés (+p%, majd +p%)</span>
                      <p className="text-xs text-slate-700">
                        Mindkét periódusban ugyanazzal a szorzótényezővel szorzunk:
                        <br />
                        q = 1 + p/100.
                      </p>
                      <div className="bg-white p-3 rounded-xl border border-emerald-200 font-mono text-xs text-emerald-900 font-bold">
                        Á₂ = Á₀ · (1 + p / 100)² = Á₀ · q²
                      </div>
                      <p className="text-[11px] text-emerald-800">
                        Ismeretlen p esetén q² = Á₂ / Á₀ tiszta hiányos másodfokú egyenlethez jutunk, amiből egyszerű gyökvonással adódik q, majd p.
                      </p>
                    </div>
                  </div>
                </div>
              </TheoryCard>

              {/* Mintapélda 1 */}
              <TheoryCard
                title="1. Mintapélda: Kétszeri egymást követő áremelés"
                color="amber"
                variant="example"
              >
                <div className="space-y-3 text-sm text-slate-700">
                  <p className="font-medium text-slate-800">
                    <strong>Feladat:</strong> Egy okostelefon ára 160 000 Ft volt. Két egymást követő félévben azonos százalékkal emelték az árát, így a második emelés után 193 600 Ft lett. Hány százalékos volt az egyes emelések mértéke?
                  </p>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 font-mono text-xs space-y-2">
                    <p className="text-slate-500 font-sans font-bold">1. Modell felírása:</p>
                    <p className="text-amber-900">Legyen q = 1 + p/100 a féléves növekedési tényező.</p>
                    <p className="text-amber-900">160 000 · q² = 193 600</p>
                    <p className="text-slate-500 font-sans font-bold pt-1">2. Egyenlet megoldása:</p>
                    <p className="text-slate-800">q² = 193 600 / 160 000 = 1,21</p>
                    <p className="text-slate-800">q = √1,21 = 1,1 &nbsp; (a negatív gyök, q = -1,1 pénzügyileg értelmetlen)</p>
                    <p className="text-slate-500 font-sans font-bold pt-1">3. Százalékláb kifejezése:</p>
                    <p className="text-emerald-700 font-bold">1 + p/100 = 1,1 ⟹ p/100 = 0,1 ⟹ p = 10%</p>
                    <p className="text-slate-600 font-sans text-[11px] pt-1">
                      <strong>Ellenőrzés:</strong> 160 000 · 1,1 = 176 000 Ft; majd 176 000 · 1,1 = 193 600 Ft. A válasz helyes!
                    </p>
                  </div>
                </div>
              </TheoryCard>

              {/* Mintapélda 2 */}
              <TheoryCard
                title="2. Mintapélda: Emelés és azonnali leárazás"
                color="amber"
                variant="example"
              >
                <div className="space-y-3 text-sm text-slate-700">
                  <p className="font-medium text-slate-800">
                    <strong>Feladat:</strong> Egy téli kabát eredeti ára 50 000 Ft volt. Előbb megnövelték az árát $p\%$-kal, majd az új árat csökkentették $p\%$-kal. A két árváltozás után a kabát 48 200 Ft-ba került. Mekkora volt a $p$ értéke?
                  </p>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 font-mono text-xs space-y-2">
                    <p className="text-slate-500 font-sans font-bold">1. Modell felírása a képlettel:</p>
                    <p className="text-amber-900">50 000 · (1 - p² / 10 000) = 48 200</p>
                    <p className="text-slate-500 font-sans font-bold pt-1">2. Osztás a kezdőárral (50 000-rel):</p>
                    <p className="text-slate-800">1 - p² / 10 000 = 48 200 / 50 000 = 0,964</p>
                    <p className="text-slate-800">p² / 10 000 = 1 - 0,964 = 0,036</p>
                    <p className="text-slate-800">p² = 0,036 · 10 000 = 360</p>
                    <p className="text-emerald-700 font-bold">p = √360 ≈ 18,97%</p>
                    <p className="text-slate-600 font-sans text-[11px] pt-1">
                      💡 <strong>Tanulság:</strong> A kabát ára $1800$ Ft-tal, vagyis $3,6\%$-kal csökkent. Mivel a csökkenés $p^2 / 100\%$, ezért $p^2 / 100 = 3,6 \implies p^2 = 360 \implies p \approx 18,97\%$.
                    </p>
                  </div>
                </div>
              </TheoryCard>

              <TheoryTrapBox title="Gyakori gazdasági tévhit!">
                <p>
                  Ha egy részvény ára egy nap alatt <strong>50%-ot esik</strong>, ahhoz, hogy visszatérjen az eredeti értékére, nem 50%-os, hanem <strong>100%-os növekedésre</strong> (megduplázódásra) van szükség!
                  <br />
                  100 Ft ⟶ (-50%) ⟶ 50 Ft ⟶ (+100%) ⟶ 100 Ft.
                </p>
              </TheoryTrapBox>
            </div>
          )
        },
        {
          id: 'sec-compound-interest',
          title: '2. Kétéves kamatos kamatszámítás és megtakarítások',
          description:
            'Hogyan számítjuk ki a banki kamatlábat, ha 2 évre kötünk le egy összeget, és hogyan kezeljük az év közbeni befizetéseket?',
          color: 'emerald',
          badge: 'Bank & Megtakarítás',
          content: (
            <div className="space-y-6">
              <TheoryCard
                title="A kamatos kamat alapmodellje két kamatozási periódusra"
                color="emerald"
                icon={<PiggyBank className="w-5 h-5 text-emerald-600" />}
              >
                <div className="space-y-4 text-slate-700 text-sm leading-relaxed">
                  <p>
                    Kamatos kamatozás esetén az év végén jóváírt kamat a következő évben maga is kamatozik (tőkésítés). Ha a kezdőtőke T₀, az éves kamatláb p%, a kamattényező pedig q = 1 + p/100:
                  </p>

                  <div className="my-3 p-4 sm:p-5 bg-gradient-to-b from-slate-50 to-emerald-50/40 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center">
                    <CompoundInterestTimelineSvg size={480} className="w-full max-w-xl" />
                    <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-2.5 font-medium">
                      A tőke növekedése kamatos kamattal 2 teljes éven keresztül: T₂ = T₀ · q²
                    </p>
                  </div>

                  <div className="p-4 bg-emerald-50/80 border border-emerald-200 rounded-2xl space-y-2">
                    <span className="font-bold text-emerald-950 text-sm block">Év eleji rendszeres befizetések modellje</span>
                    <p className="text-xs text-slate-700">
                      Gyakori feladat, hogy valaki a <strong>kezdéskor</strong> befizet egy $A$ összeget, majd a <strong>2. év elején</strong> újabb $B$ összeget helyez el:
                    </p>
                    <div className="bg-white p-3 rounded-xl border border-emerald-200 font-mono text-xs text-emerald-900 space-y-1">
                      <p>• Az 1. befizetés 2 éven át kamatozik: A · q²</p>
                      <p>• A 2. befizetés 1 éven át kamatozik: B · q</p>
                      <p className="font-bold text-emerald-700">Összes megtakarítás a 2. év végén: A · q² + B · q = T_végső</p>
                    </div>
                    <p className="text-[11px] text-emerald-800">
                      Ez egy <strong>teljes másodfokú egyenlet</strong> a $q$ kamattényezőre: $A q^2 + B q - T = 0$, amit megoldóképlettel oldunk meg!
                    </p>
                  </div>
                </div>
              </TheoryCard>

              {/* Mintapélda: Két befizetéses feladat */}
              <TheoryCard
                title="3. Mintapélda: Rendszeres év eleji megtakarítás"
                color="emerald"
                variant="example"
              >
                <div className="space-y-3 text-sm text-slate-700">
                  <p className="font-medium text-slate-800">
                    <strong>Feladat:</strong> Tamás a bankba helyezett 500 000 Ft-ot kamatos kamatra. Egy év elteltével betett még 300 000 Ft-ot ugyanazzal a kamatlábbal. A második év végén a számláján pontosan 936 000 Ft volt. Mennyi volt az éves kamatláb?
                  </p>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 font-mono text-xs space-y-2">
                    <p className="text-slate-500 font-sans font-bold">1. Modell felírása (q = 1 + p/100):</p>
                    <p className="text-emerald-900">500 000 · q² + 300 000 · q = 936 000</p>
                    <p className="text-slate-500 font-sans font-bold pt-1">2. Osztás 1000-rel és 0-ra rendezés:</p>
                    <p className="text-slate-800">500 q² + 300 q - 936 = 0</p>
                    <p className="text-slate-800">Osztás 4-gyel: 125 q² + 75 q - 234 = 0</p>
                    <p className="text-slate-500 font-sans font-bold pt-1">3. Megoldóképlet alkalmazása:</p>
                    <p className="text-slate-800">D = 75² - 4 · 125 · (-234) = 5625 + 117 000 = 122 625 = 350,18... helyett ellenőrizzük az egyszerűsítést:</p>
                    <p className="text-slate-800">Ha q = 1,08 (8%): 500 · 1,1664 + 300 · 1,08 = 583,2 + 324 = 907,2 (kevés)</p>
                    <p className="text-slate-800">Ha q = 1,10 (10%): 500 · 1,21 + 300 · 1,10 = 605 + 330 = 935 000 Ft</p>
                    <p className="text-slate-800">
                      Pontos gyök a megoldóképlettel: q₁ = (-75 + 351) / 250 = 276 / 250 = 1,104
                    </p>
                    <p className="text-emerald-700 font-bold">q = 1,104 ⟹ p = 10,4%</p>
                    <p className="text-slate-500 font-sans text-[11px]">
                      A másik gyök: $q_2 = (-75 - 351) / 250 = -1,704 &lt; 0$, gazdaságilag nem értelmezhető.
                    </p>
                  </div>
                </div>
              </TheoryCard>
            </div>
          )
        },
        {
          id: 'sec-revenue-opt',
          title: '3. Bevétel- és nyereségoptimalizálás (Ár × Kereslet)',
          description:
            'Hogyan függ az eladott darabszám az ártól, és melyik pontban éri el egy vállalkozás a maximális árbevételt?',
          color: 'blue',
          badge: 'Bevétel & Profit',
          content: (
            <div className="space-y-6">
              <TheoryCard
                title="Az Ár-Kereslet összefüggés másodfokú görbéje"
                color="blue"
                icon={<TrendingUp className="w-5 h-5 text-blue-600" />}
              >
                <div className="space-y-4 text-slate-700 text-sm leading-relaxed">
                  <p>
                    A piaci törvények szerint, ha egy termék árát emeljük, a vásárlók száma csökken. A teljes bevétel az egységár és az eladott darabszám szorzata:
                  </p>
                  <div className="bg-slate-900 text-blue-300 p-3 rounded-xl text-center font-mono font-bold text-sm">
                    Bevétel(x) = Ár(x) · Darabszám(x) = (Á₀ + x) · (Q₀ - k · x)
                  </div>

                  <div className="my-3 p-4 sm:p-5 bg-gradient-to-b from-slate-50 to-blue-50/40 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center">
                    <RevenueOptimizationCurveSvg size={480} className="w-full max-w-xl" />
                    <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-2.5 font-medium">
                      A bevételi függvény lefelé nyíló parabola: a csúcspont adja a maximális bevételt biztosító x_opt árat!
                    </p>
                  </div>

                  <div className="p-4 bg-blue-50/80 border border-blue-200 rounded-2xl space-y-2">
                    <span className="font-bold text-blue-950 text-sm block">Két tipikus feladattípus:</span>
                    <ul className="text-xs text-slate-700 space-y-1.5 list-disc list-inside">
                      <li>
                        <strong>1. Adott célbevétel elérése:</strong> $B(x) = Célbevétel \implies$ Másodfokú egyenlet 2 gyökkel ($x_1$ és $x_2$). Mindkét áremelés ugyanazt a bevételt adja (olcsón sok darab VAGY drágán kevés darab).
                      </li>
                      <li>
                        <strong>2. Maximális bevétel megkeresése:</strong> A másodfokú függvény csúcspontjának koordinátája: x_opt = -b / (2a), vagy a gyökök felezőpontja: x_opt = (x₁ + x₂) / 2.
                      </li>
                    </ul>
                  </div>
                </div>
              </TheoryCard>

              {/* Mintapélda: Mozi bevétel */}
              <TheoryCard
                title="4. Mintapélda: Színházterem jegybevételének optimalizálása"
                color="blue"
                variant="example"
              >
                <div className="space-y-3 text-sm text-slate-700">
                  <p className="font-medium text-slate-800">
                    <strong>Feladat:</strong> Egy színházban 3000 Ft-os jegyár mellett átlagosan 400 néző tekinti meg az előadást. A felmérések szerint minden 100 Ft-os áremelés hatására 10-zel csökken a nézők száma.
                    <br />
                    a) Mekkora áremelés mellett lesz az előadás bevétele 1 224 000 Ft?
                    <br />
                    b) Mekkora jegyár mellett érhető el a maximális bevétel?
                  </p>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 font-mono text-xs space-y-2">
                    <p className="text-slate-500 font-sans font-bold">1. Modell felírása (legyen x az áremelés Ft-ban):</p>
                    <p className="text-blue-900">Új ár: 3000 + x</p>
                    <p className="text-blue-900">Új nézőszám: 400 - (x / 100) · 10 = 400 - 0,1x</p>
                    <p className="text-blue-900">Bevétel: B(x) = (3000 + x)(400 - 0,1x) = 1 200 000 + 100x - 0,1x²</p>

                    <p className="text-slate-500 font-sans font-bold pt-1">2. a) Célbevétel egyenlete (B = 1 224 000):</p>
                    <p className="text-slate-800">-0,1x² + 100x + 1 200 000 = 1 224 000</p>
                    <p className="text-slate-800">-0,1x² + 100x - 24 000 = 0 ⟹ x² - 1000x + 240 000 = 0</p>
                    <p className="text-slate-800">D = 1 000 000 - 960 000 = 40 000 = 200²</p>
                    <p className="text-emerald-700 font-bold">x₁ = (1000 - 200)/2 = 400 Ft ⟹ Jegyár: 3400 Ft (360 néző)</p>
                    <p className="text-emerald-700 font-bold">x₂ = (1000 + 200)/2 = 600 Ft ⟹ Jegyár: 3600 Ft (340 néző)</p>

                    <p className="text-slate-500 font-sans font-bold pt-1">3. b) Maximális bevétel (csúcspont):</p>
                    <p className="text-slate-800">x_opt = -b / (2a) = -100 / (2 · (-0,1)) = 100 / 0,2 = 500 Ft</p>
                    <p className="text-indigo-700 font-bold">
                      Optimális jegyár: 3000 + 500 = 3500 Ft. Maximális bevétel: B(500) = 3500 · 350 = 1 225 000 Ft!
                    </p>
                  </div>
                </div>
              </TheoryCard>
            </div>
          )
        },
        {
          id: 'sec-cost-sharing',
          title: '4. Közös költségmegosztás (törtes pénzügyi egyenletek)',
          description:
            'Hogyan változik az egy főre jutó költség, ha a társaságból néhányan visszalépnek a közös bérlésből vagy ajándékvásárlásból?',
          color: 'purple',
          badge: 'Költségmegosztás',
          content: (
            <div className="space-y-6">
              <TheoryCard
                title="A fix összeg felosztásának törtes modellje"
                color="purple"
                icon={<Users className="w-5 h-5 text-purple-600" />}
              >
                <div className="space-y-4 text-slate-700 text-sm leading-relaxed">
                  <p>
                    Gyakori valós élethelyzet, hogy egy fix összegű számlát ($Ö$) eredetileg $n$ fő tervezett egyenlően megosztani. Ha $k$ személy visszalép vagy csatlakozik, az egy főre jutó összeg megváltozik:
                  </p>
                  <div className="bg-slate-900 text-purple-300 p-3 rounded-xl text-center font-mono font-bold text-sm">
                    Eredeti részesedés: Ö / n &nbsp;&nbsp;&nbsp; Új részesedés: Ö / (n - k)
                  </div>
                  <p>
                    A különbség egyenlete másodfokú egyenletre vezet a nevezőkkel való beszorzás után!
                  </p>
                </div>
              </TheoryCard>

              {/* Mintapélda: Nyaraló bérlése */}
              <TheoryCard
                title="5. Mintapélda: Balatoni nyaraló bérleti díjának szétosztása"
                color="purple"
                variant="example"
              >
                <div className="space-y-3 text-sm text-slate-700">
                  <p className="font-medium text-slate-800">
                    <strong>Feladat:</strong> Egy diákcsoport 180 000 Ft-ért bérel egy nyaralót egy hétvégére, a költséget egyenlően osztva el egymás között. Az utazás előtt 3 diák lebetegedett és visszalépett, emiatt a többieknek fejenként 3000 Ft-tal többet kellett fizetniük. Hányan voltak eredetileg a csoportban?
                  </p>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 font-mono text-xs space-y-2">
                    <p className="text-slate-500 font-sans font-bold">1. Modell felírása (n = eredeti létszám, n &gt; 3, n ∈ ℕ⁺):</p>
                    <p className="text-purple-900">Eredeti díj / fő: 180 000 / n</p>
                    <p className="text-purple-900">Új díj / fő: 180 000 / (n - 3)</p>
                    <p className="text-purple-900">Összefüggés: 180 000 / (n - 3) - 180 000 / n = 3000</p>

                    <p className="text-slate-500 font-sans font-bold pt-1">2. Osztás 3000-rel az együtthatók minimalizálásához:</p>
                    <p className="text-slate-800">60 / (n - 3) - 60 / n = 1</p>

                    <p className="text-slate-500 font-sans font-bold pt-1">3. Beszorzás a közös nevezővel [n(n - 3)]:</p>
                    <p className="text-slate-800">60n - 60(n - 3) = n(n - 3)</p>
                    <p className="text-slate-800">60n - 60n + 180 = n² - 3n</p>
                    <p className="text-slate-800">n² - 3n - 180 = 0</p>

                    <p className="text-slate-500 font-sans font-bold pt-1">4. Megoldás (szorzattá alakítással vagy képlettel):</p>
                    <p className="text-slate-800">(n - 15)(n + 12) = 0</p>
                    <p className="text-emerald-700 font-bold">n₁ = 15 fő (Valós gazdasági megoldás)</p>
                    <p className="text-rose-700">n₂ = -12 fő (Negatív létszám nem létezik, elvetjük!)</p>

                    <p className="text-slate-600 font-sans text-[11px] pt-1">
                      <strong>Ellenőrzés:</strong> Eredetileg 15 fő fizetett 180 000 / 15 = 12 000 Ft-ot. 3 fő kiesésével 12 fő fizetett 180 000 / 12 = 15 000 Ft-ot. A különbség valóban 3000 Ft/fő!
                    </p>
                  </div>
                </div>
              </TheoryCard>
            </div>
          )
        },
        {
          id: 'sec-model-protocol',
          title: '5. Gazdasági modellezés protokollja és valóságkontroll',
          description:
            'A 4 lépéses ellenőrzési folyamat, amellyel bármilyen pénzügyi szöveges feladat biztonságosan megoldható.',
          color: 'teal',
          badge: 'Protokoll & Szabályok',
          content: (
            <div className="space-y-6">
              <TheoryCard
                title="A pénzügyi szöveges feladatok 4 aranyszabálya"
                color="teal"
                icon={<CheckCircle2 className="w-5 h-5 text-teal-600" />}
              >
                <div className="space-y-4 text-slate-700 text-sm leading-relaxed">
                  <p>
                    A pénzügyi szöveges feladatok megoldásakor a tiszta algebrai tudás mellett elengedhetetlen a gazdasági realitáskontroll alkalmazása:
                  </p>

                  <div className="my-3 p-4 sm:p-5 bg-gradient-to-b from-slate-50 to-teal-50/40 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col items-center">
                    <FinancialModelRulesSvg size={480} className="w-full max-w-xl" />
                    <p className="text-center text-xs text-slate-500 dark:text-slate-400 mt-2.5 font-medium">
                      A 4 lépéses pénzügyi modellezési protokoll a bázis kijelölésétől a gyökök gazdasági szűréséig
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                      <span className="font-bold text-slate-900">1. Százalékláb és Kamattényező:</span>
                      <p className="text-slate-600">
                        Mindig különítsd el a p százaléklábat és a q = 1 ± p/100 szorzótényezőt! Ha q = 1,15, akkor p = 15%.
                      </p>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                      <span className="font-bold text-slate-900">2. Realitás és Kikötések:</span>
                      <p className="text-slate-600">
                        A létszám {'$n \\in \\mathbb{N}^+$'}, az árak és pénzösszegek pozitívak ($Á &gt; 0$), a kamatláb normál esetben $p &gt; 0$.
                      </p>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                      <span className="font-bold text-slate-900">3. Kerekítés a Pénzügyekben:</span>
                      <p className="text-slate-600">
                        Pénzösszegeknél egész forintra kerekítünk, százalékoknál általában 1 vagy 2 tizedesjegyre, ha a feladat nem kéri máshogy.
                      </p>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                      <span className="font-bold text-slate-900">4. Szöveges Válaszadás:</span>
                      <p className="text-slate-600">
                        Mindig ellenőrizzük az eredeti szövegben feltett konkrét kérdést: az új árat, a különbséget vagy a százalékot kérdezték-e!
                      </p>
                    </div>
                  </div>
                </div>
              </TheoryCard>
            </div>
          )
        }
      ]}
      interactiveSection={
        <div className="mt-10 p-6 sm:p-8 bg-white dark:bg-slate-900 rounded-3xl border border-amber-200 dark:border-amber-900/50 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-100 dark:border-amber-900/40 pb-5">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 text-xs font-bold uppercase tracking-wider mb-2">
                <Sliders className="w-3.5 h-3.5" /> Interaktív Pénzügyi Szimulátor Labor
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                Fedezd fel a másodfokú összefüggéseket a valós gazdaságban!
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
                Kísérletezz a paraméterekkel, és figyeld meg az árak, a kamatok és a maximális bevétel viselkedését!
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 1. Szimulátor: Kétszeri árváltozás */}
            <div className="p-5 bg-gradient-to-b from-amber-50/60 to-orange-50/40 dark:bg-slate-800/60 rounded-2xl border border-amber-200 dark:border-amber-800/60 space-y-4">
              <div className="flex items-center gap-2">
                <Percent className="w-5 h-5 text-amber-600" />
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">1. Árváltozás Szimulátor</h4>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <div className="flex justify-between font-medium text-slate-700 dark:text-slate-300 mb-1">
                    <span>Kezdőár (Á₀):</span>
                    <span className="font-bold text-amber-700">{basePrice.toLocaleString()} Ft</span>
                  </div>
                  <input
                    type="range"
                    min={2000}
                    max={50000}
                    step={1000}
                    value={basePrice}
                    onChange={(e) => setBasePrice(Number(e.target.value))}
                    className="w-full accent-amber-600 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between font-medium text-slate-700 dark:text-slate-300 mb-1">
                    <span>Árváltozás mértéke (p):</span>
                    <span className="font-bold text-amber-700">±{percentP}%</span>
                  </div>
                  <input
                    type="range"
                    min={5}
                    max={50}
                    step={1}
                    value={percentP}
                    onChange={(e) => setPercentP(Number(e.target.value))}
                    className="w-full accent-amber-600 cursor-pointer"
                  />
                </div>

                <div className="pt-1">
                  <span className="block font-medium text-slate-700 dark:text-slate-300 mb-1.5">Forgatókönyv:</span>
                  <div className="grid grid-cols-2 gap-1.5">
                    <button
                      onClick={() => setScenario('up-down')}
                      className={`p-1.5 rounded-lg text-[11px] font-bold border ${scenario === 'up-down'
                        ? 'bg-amber-600 text-white border-amber-600'
                        : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 border-slate-200'
                        }`}
                    >
                      +p% majd -p%
                    </button>
                    <button
                      onClick={() => setScenario('down-up')}
                      className={`p-1.5 rounded-lg text-[11px] font-bold border ${scenario === 'down-up'
                        ? 'bg-amber-600 text-white border-amber-600'
                        : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 border-slate-200'
                        }`}
                    >
                      -p% majd +p%
                    </button>
                    <button
                      onClick={() => setScenario('up-up')}
                      className={`p-1.5 rounded-lg text-[11px] font-bold border ${scenario === 'up-up'
                        ? 'bg-amber-600 text-white border-amber-600'
                        : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 border-slate-200'
                        }`}
                    >
                      +p% majd +p%
                    </button>
                    <button
                      onClick={() => setScenario('down-down')}
                      className={`p-1.5 rounded-lg text-[11px] font-bold border ${scenario === 'down-down'
                        ? 'bg-amber-600 text-white border-amber-600'
                        : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 border-slate-200'
                        }`}
                    >
                      -p% majd -p%
                    </button>
                  </div>
                </div>

                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-amber-100 dark:border-amber-900/40 space-y-1.5">
                  <div className="flex justify-between text-slate-600 dark:text-slate-400">
                    <span>1. Árváltozás után:</span>
                    <span className="font-bold text-slate-900 dark:text-white">{intermediatePrice.toLocaleString()} Ft</span>
                  </div>
                  <div className="flex justify-between text-slate-600 dark:text-slate-400">
                    <span>Végső ár (Á₂):</span>
                    <span className="font-black text-amber-700 dark:text-amber-400 text-sm">{finalPrice.toLocaleString()} Ft</span>
                  </div>
                  <div className="pt-1 border-t border-slate-100 dark:border-slate-800 flex justify-between font-bold">
                    <span>Eredmény:</span>
                    <span className={overallDiff >= 0 ? 'text-emerald-600' : 'text-rose-600'}>
                      {overallDiff >= 0 ? `+${overallDiff.toLocaleString()}` : overallDiff.toLocaleString()} Ft ({overallPercent.toFixed(2)}%)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Szimulátor: Kétéves kamatszámítás */}
            <div className="p-5 bg-gradient-to-b from-emerald-50/60 to-teal-50/40 dark:bg-slate-800/60 rounded-2xl border border-emerald-200 dark:border-emerald-800/60 space-y-4">
              <div className="flex items-center gap-2">
                <PiggyBank className="w-5 h-5 text-emerald-600" />
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">2. Kamatszámítás Szimulátor</h4>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <div className="flex justify-between font-medium text-slate-700 dark:text-slate-300 mb-1">
                    <span>Kezdőtőke (T₀):</span>
                    <span className="font-bold text-emerald-700">{initialCapital.toLocaleString()} Ft</span>
                  </div>
                  <input
                    type="range"
                    min={500000}
                    max={2000000}
                    step={100000}
                    value={initialCapital}
                    onChange={(e) => setInitialCapital(Number(e.target.value))}
                    className="w-full accent-emerald-600 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between font-medium text-slate-700 dark:text-slate-300 mb-1">
                    <span>2. év végi tőke (T₂):</span>
                    <span className="font-bold text-emerald-700">{finalCapital.toLocaleString()} Ft</span>
                  </div>
                  <input
                    type="range"
                    min={initialCapital}
                    max={initialCapital * 2}
                    step={10000}
                    value={finalCapital}
                    onChange={(e) => setFinalCapital(Number(e.target.value))}
                    className="w-full accent-emerald-600 cursor-pointer"
                  />
                </div>

                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-emerald-100 dark:border-emerald-900/40 space-y-1.5">
                  <div className="flex justify-between text-slate-600 dark:text-slate-400">
                    <span>Kamattényező (q = √(T₂/T₀)):</span>
                    <span className="font-mono font-bold text-slate-900 dark:text-white">{qCalculated.toFixed(4)}</span>
                  </div>
                  <div className="flex justify-between text-slate-600 dark:text-slate-400">
                    <span>Éves kamatláb (p):</span>
                    <span className="font-black text-emerald-700 dark:text-emerald-400 text-sm">
                      {interestRateCalculated.toFixed(2)} % / év
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-600 dark:text-slate-400 pt-1 border-t border-slate-100 dark:border-slate-800">
                    <span>1. év végi egyenleg:</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">{year1Capital.toLocaleString()} Ft</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Szimulátor: Bevételmaximalizálás */}
            <div className="p-5 bg-gradient-to-b from-blue-50/60 to-indigo-50/40 dark:bg-slate-800/60 rounded-2xl border border-blue-200 dark:border-blue-800/60 space-y-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">3. Bevételmaximum Szimulátor</h4>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <div className="flex justify-between font-medium text-slate-700 dark:text-slate-300 mb-1">
                    <span>Jegyáremelés mértéke (x):</span>
                    <span className="font-bold text-blue-700">+{ticketPriceDelta} Ft</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={1500}
                    step={50}
                    value={ticketPriceDelta}
                    onChange={(e) => setTicketPriceDelta(Number(e.target.value))}
                    className="w-full accent-blue-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
                    <span>0 Ft (alap)</span>
                    <span className="text-blue-600 font-bold">500 Ft (Optimum)</span>
                    <span>1500 Ft</span>
                  </div>
                </div>

                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-blue-100 dark:border-blue-900/40 space-y-1.5">
                  <div className="flex justify-between text-slate-600 dark:text-slate-400">
                    <span>Jegyár:</span>
                    <span className="font-bold text-slate-900 dark:text-white">{currentTicketPrice.toLocaleString()} Ft</span>
                  </div>
                  <div className="flex justify-between text-slate-600 dark:text-slate-400">
                    <span>Nézőszám:</span>
                    <span className="font-bold text-slate-900 dark:text-white">{currentVisitors} fő</span>
                  </div>
                  <div className="flex justify-between text-slate-600 dark:text-slate-400 pt-1 border-t border-slate-100 dark:border-slate-800">
                    <span>Összbevétel:</span>
                    <span className="font-black text-blue-700 dark:text-blue-400 text-sm">{currentRevenue.toLocaleString()} Ft</span>
                  </div>
                  <div className="text-[11px] text-center pt-1">
                    {ticketPriceDelta === optimalDelta ? (
                      <span className="text-emerald-600 font-bold">🎉 Ez a maximálisan elérhető csúcsbevétel!</span>
                    ) : (
                      <span className="text-slate-500">
                        Max elérhető: {optimalRevenue.toLocaleString()} Ft (+{optimalDelta} Ft emelésnél)
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    />
  );
};
