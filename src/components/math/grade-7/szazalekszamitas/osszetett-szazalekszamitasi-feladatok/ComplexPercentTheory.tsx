import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable
} from '../TheoryTemplate';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import {
  Percent,
  Calculator,
  Layers,
  ArrowRight,
  Info,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  BookOpen,
  PieChart,
  TrendingDown,
  TrendingUp,
  Receipt,
  ShoppingCart,
  Sparkles,
  Check,
  Scale,
  Smile,
  Zap,
  Box,
  RefreshCw
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { MathText } from '@/components/math/shared/MathText';

interface ComplexPercentTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

export const ComplexPercentTheory: React.FC<ComplexPercentTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // --- 1. Interaktív Kétszeri Árváltozás Szimulátor ---
  const [initialPrice, setInitialPrice] = useState<number>(10000);
  const [change1, setChange1] = useState<number>(20); // +20%
  const [change2, setChange2] = useState<number>(-20); // -20%

  const factor1 = 1 + change1 / 100;
  const priceAfterStep1 = Math.round(initialPrice * factor1);
  const factor2 = 1 + change2 / 100;
  const finalPrice = Math.round(priceAfterStep1 * factor2);

  const totalFactor = factor1 * factor2;
  const totalChangePercent = ((totalFactor - 1) * 100).toFixed(2);
  const priceDifference = finalPrice - initialPrice;

  // --- 2. Interaktív Négyzet Területváltozás Szemléltető (Tk. 5. feladat) ---
  const [squareSide, setSquareSide] = useState<number>(10);
  const [sideChange1, setSideChange1] = useState<number>(40); // +40%
  const [sideChange2, setSideChange2] = useState<number>(-40); // -40%

  const newSideA = Number((squareSide * (1 + sideChange1 / 100)).toFixed(1));
  const newSideB = Number((squareSide * (1 + sideChange2 / 100)).toFixed(1));
  const origArea = squareSide * squareSide;
  const newArea = Number((newSideA * newSideB).toFixed(1));
  const origPerimeter = 4 * squareSide;
  const newPerimeter = Number((2 * (newSideA + newSideB)).toFixed(1));
  const areaChangePct = (((newArea / origArea) - 1) * 100).toFixed(1);

  return (
    <TheoryTemplate
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      documentId="g7-pct-complex-theory-doc"
      pdfFilename="7_osztaly_osszetett_szazalekszamitas.pdf"
      badgeText="7. OSZTÁLY • V. TÉMAKÖR • 6. FEJEZET"
      title="Összetett százalékszámítási feladatok"
      subtitle="Egymást követő árváltozások, többlépéses szorzótényezők, gép-amortizáció, pályázati maradékmegosztások és geometriai alakzatok százalékos transzformációi"
      quickRule={{
        label: 'Fontos szabály',
        formula: 'Végső érték = Eredeti · q₁ · q₂  •  (+20% majd -20% szorzója: 1,20 · 0,80 = 0,96 ➔ -4% csökkenés!)'
      }}
      themeColor="purple"
      practiceTitle="Készen állsz az összetett százalékszámítási kihívásokra?"
      practiceSubtitle="Tedd próbára tudásod a 30 kérdéses gyakorló kvízben részletes levezetésekkel, párosító és rendező játékokkal!"
    >
      {/* 1. SZAKASZ: Egymást követő változások és a szorzótényezők módszere */}
      <TheorySection number={1} title="Egymást követő változások és a szorzótényezők módszere">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard
            title="Hogyan számolunk gyorsan egylépésben? (A szorzótényező)"
            icon={<Zap className="w-5 h-5 text-purple-600 dark:text-purple-400" />}
            variant="purple"
          >
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              Ha egy mennyiség értéke megváltozik, ahelyett, hogy külön kiszámolnánk a változás összegét, majd hozzáadnánk vagy kivonnánk, <strong>egyetlen szorzással</strong> megkaphatjuk az új értéket:
            </p>
            <ul className="text-xs space-y-2 mt-3 text-slate-700 dark:text-slate-300">
              <li className="flex items-start gap-2">
                <span className="font-bold text-emerald-600 min-w-28">+p% növekedés:</span>
                <span>Szorzó: <strong className="font-mono text-emerald-700 dark:text-emerald-300">q = 1 + p / 100</strong> (Pl. +10% ➔ ·1,10; +6% ➔ ·1,06).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-rose-600 min-w-28">-p% csökkenés:</span>
                <span>Szorzó: <strong className="font-mono text-rose-700 dark:text-rose-300">q = 1 - p / 100</strong> (Pl. -12% ➔ ·0,88; -8% ➔ ·0,92).</span>
              </li>
            </ul>

            <div className="mt-4 p-3 bg-purple-50 dark:bg-purple-950/40 rounded-xl border border-purple-200 dark:border-purple-800 text-center font-mono text-sm font-bold text-purple-900 dark:text-purple-200">
              <MathText text="\text{Végső érték} = \text{Eredeti} \cdot q_1 \cdot q_2 \cdot \dots \cdot q_n" />
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
              A végső szorzótényező az egyes lépések szorzóinak <strong>szorzata</strong> (nem az összege!).
            </p>
          </TheoryCard>

          <TheoryCard
            title="Tk. 1. példa: Az üdítőspalackozó üzem termelésnövekedése"
            icon={<Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
            variant="blue"
          >
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              A régi gép óránként <strong>2500 palackot</strong> tölt meg. Az új gép teljesítménye <strong>10%-kal nagyobb</strong>. Egy év múlva szoftverfrissítéssel további <strong>6%-os növekedést</strong> érnek el.
            </p>

            <div className="space-y-2 mt-3 text-xs text-slate-700 dark:text-slate-300">
              <div className="p-2 bg-white dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-800">
                <strong>1. lépés (+10%):</strong> Új gép = <span className="font-mono text-blue-600 font-bold">2500 · 1,10 = 2750 palack/óra</span>.
              </div>
              <div className="p-2 bg-white dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-800">
                <strong>2. lépés (+6%):</strong> Frissítés után = <span className="font-mono text-emerald-600 font-bold">2750 · 1,06 = 2915 palack/óra</span>.
              </div>
              <div className="p-2 bg-blue-50 dark:bg-blue-950/40 rounded border border-blue-200 dark:border-blue-800">
                <strong>Összesített szorzó:</strong> 1,10 · 1,06 = <strong className="font-mono text-purple-700 dark:text-purple-300">1,166</strong>.<br />
                Ez egyetlen <strong>16,6%-os növekedésnek</strong> felel meg (nem 16%-nak!).
              </div>
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 2. SZAKASZ: Interaktív Kétszeri Árváltozás Szimulátor és a Csapda */}
      <TheorySection number={2} title="A kétszeri változás hatása: Interaktív szimulátor és a tipikus csapdák">
        <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-purple-200 dark:border-purple-800/60 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-slate-200 dark:border-slate-800 gap-2">
            <div className="flex items-center gap-2">
              <Calculator className="w-5 h-5 text-purple-600" />
              <h4 className="font-bold text-slate-800 dark:text-slate-100 text-base">
                Interaktív Többlépéses Árváltozás és Szorzótényező Kalkulátor
              </h4>
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => { setChange1(20); setChange2(-20); }}
                className="text-xs h-7"
              >
                +20% majd -20%
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => { setChange1(25); setChange2(-20); }}
                className="text-xs h-7 text-emerald-600 border-emerald-300"
              >
                +25% majd -20% (=0)
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => { setChange1(10); setChange2(10); }}
                className="text-xs h-7 text-purple-600 border-purple-300"
              >
                +10% és +10%
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-600 dark:text-slate-400">Kiinduló ár:</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-slate-100">{initialPrice.toLocaleString()} Ft</span>
                </div>
                <Slider
                  value={[initialPrice]}
                  min={1000}
                  max={50000}
                  step={1000}
                  onValueChange={(val) => setInitialPrice(val[0])}
                />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-600 dark:text-slate-400">1. lépés változása:</span>
                  <span className={cn('font-mono font-bold', change1 >= 0 ? 'text-emerald-600' : 'text-rose-600')}>
                    {change1 >= 0 ? `+${change1}%` : `${change1}%`} (szorzó: {factor1.toFixed(2)})
                  </span>
                </div>
                <Slider
                  value={[change1]}
                  min={-50}
                  max={50}
                  step={5}
                  onValueChange={(val) => setChange1(val[0])}
                />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-600 dark:text-slate-400">2. lépés változása:</span>
                  <span className={cn('font-mono font-bold', change2 >= 0 ? 'text-emerald-600' : 'text-rose-600')}>
                    {change2 >= 0 ? `+${change2}%` : `${change2}%`} (szorzó: {factor2.toFixed(2)})
                  </span>
                </div>
                <Slider
                  value={[change2]}
                  min={-50}
                  max={50}
                  step={5}
                  onValueChange={(val) => setChange2(val[0])}
                />
              </div>
            </div>

            {/* Eredmény Panel */}
            <div className="p-4 bg-purple-50/70 dark:bg-purple-950/30 rounded-xl border border-purple-200 dark:border-purple-800/80 space-y-3">
              <div className="flex justify-between items-center text-xs pb-2 border-b border-purple-200 dark:border-purple-800">
                <span className="text-slate-600 dark:text-slate-300">1. lépés utáni ár:</span>
                <span className="font-mono font-bold text-slate-900 dark:text-slate-100">
                  {priceAfterStep1.toLocaleString()} Ft
                </span>
              </div>
              <div className="flex justify-between items-center text-xs pb-2 border-b border-purple-200 dark:border-purple-800">
                <span className="text-slate-600 dark:text-slate-300">2. lépés utáni (végső) ár:</span>
                <span className="font-mono font-bold text-purple-700 dark:text-purple-300 text-sm">
                  {finalPrice.toLocaleString()} Ft
                </span>
              </div>
              <div className="flex justify-between items-center text-xs pb-2 border-b border-purple-200 dark:border-purple-800">
                <span className="text-slate-600 dark:text-slate-300">Összesített szorzótényező:</span>
                <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
                  {factor1.toFixed(2)} · {factor2.toFixed(2)} = <strong>{totalFactor.toFixed(4)}</strong>
                </span>
              </div>
              <div className="flex justify-between items-center text-sm font-bold pt-1">
                <span className="text-slate-700 dark:text-slate-300">Összesített változás:</span>
                <span className={cn('font-mono', Number(totalChangePercent) >= 0 ? 'text-emerald-600' : 'text-rose-600')}>
                  {Number(totalChangePercent) >= 0 ? `+${totalChangePercent}%` : `${totalChangePercent}%`} ({priceDifference > 0 ? `+${priceDifference.toLocaleString()} Ft` : `${priceDifference.toLocaleString()} Ft`})
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Trap Boxok és Aranyszabályok */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <TheoryTrapBox
            title="A +p% majd -p% csapda: Miért nem az eredeti ár marad?"
            mistake="„Ha 20%-kal drágítunk, majd 20%-kal olcsósítunk, akkor +20% - 20% = 0%, tehát visszakapjuk a kiinduló árat!”"
            correction="Hamis! A 2. lépésben a csökkentés alapja már a megemelt ár (120%)! Szorzó: 1,20 · 0,80 = 0,96, vagyis a termék 4%-kal olcsóbb lesz az eredetinél!"
          />

          <TheoryCard
            title="A semleges árkülönbség titka: +25% és -20%!"
            icon={<CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />}
            variant="emerald"
          >
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              Mikor kapjuk vissza <em>pontosan</em> az eredeti 100%-ot?
            </p>
            <div className="p-3 my-2 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl text-center font-bold text-emerald-900 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-800 text-sm">
              <MathText text="1{,}25 \cdot 0{,}80 = 1{,}00 \implies 100%" />
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Ha egy 20 000 Ft-os cipőt <strong>25%-kal drágítanak</strong> (25 000 Ft), majd a megemelt árat <strong>20%-kal leértékelik</strong> (25 000 · 0,8 = 20 000 Ft), pontosan visszakapjuk az eredeti árat!
            </p>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 3. SZAKASZ: Amortizáció és Értékcsökkenés (Tk. 2. példa) */}
      <TheorySection number={3} title="Többlépéses értékcsökkenés (Amortizáció) gépvásárláskor">
        <TheoryCallout
          title="Tk. 2. példa: A gép értékvesztése az első két évben (150. oldal)"
          icon={<TrendingDown className="w-5 h-5 text-purple-600" />}
          variant="purple"
        >
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            Egy üzemi gépet <strong>12 500 000 Ft-ért</strong> vásároltak. A használat során az első évben <strong>12%-kal</strong>, a második évben további <strong>8%-kal</strong> csökken az értéke.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-xs">
            <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
              <span className="font-bold text-blue-600 uppercase tracking-wide">1. év után (-12%)</span>
              <p className="text-slate-600 dark:text-slate-300">
                A gép az eredeti ár 88%-át éri:<br />
                <span className="font-mono font-bold text-blue-600">12 500 000 · 0,88 = 11 000 000 Ft</span>.
              </p>
            </div>

            <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
              <span className="font-bold text-purple-600 uppercase tracking-wide">2. év után (-8%)</span>
              <p className="text-slate-600 dark:text-slate-300">
                A már csökkent 11 000 000 Ft-nak veszik a 92%-át:<br />
                <span className="font-mono font-bold text-purple-600">11 000 000 · 0,92 = 10 120 000 Ft</span>.
              </p>
            </div>
          </div>

          <div className="mt-4 p-3 bg-white dark:bg-slate-900 rounded-xl border border-purple-200 dark:border-purple-800 text-xs text-slate-700 dark:text-slate-300 space-y-1">
            <strong>Összesített szorzótényező:</strong> <span className="font-mono font-bold text-purple-700 dark:text-purple-300">0,88 · 0,92 = 0,8096</span>.<br />
            Két év után a gép az eredeti értékének <strong>80,96%-át</strong> éri, ami <span className="font-bold text-rose-600">100% - 80,96% = 19,04%-os</span> csökkenést jelent (nem 20%-ot!).
          </div>
        </TheoryCallout>

        {/* További tankönyvi példák */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <TheoryCard
            title="Tk. 3. példa: Molnár család internet-előfizetése"
            icon={<Receipt className="w-5 h-5 text-amber-600 dark:text-amber-400" />}
            variant="amber"
          >
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              Az eredeti díj <strong>6500 Ft</strong> volt. Csomagváltáskor <strong>12%-kal emelték</strong>, majd hűségakcióban <strong>12%-kal csökkentették</strong>.
            </p>
            <ul className="text-xs space-y-1 mt-2 text-slate-700 dark:text-slate-300 font-mono">
              <li>1. lépés (+12%): 6500 · 1,12 = 7280 Ft</li>
              <li>2. lépés (-12%): 7280 · 0,88 = <strong>6406,4 Ft</strong></li>
            </ul>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">
              Kerekítve 6406 Ft lett, azaz <strong>94 Ft-tal kevesebb</strong>, mint az induló 6500 Ft!
            </p>
          </TheoryCard>

          <TheoryCard
            title="Tk. 6. feladat: Téli csizma kétszeri leárazása"
            icon={<ShoppingCart className="w-5 h-5 text-rose-600 dark:text-rose-400" />}
            variant="rose"
          >
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              Egy <strong>30 000 Ft-os csizma</strong> árát tavasszal <strong>15%-kal</strong>, áprilisban újabb <strong>10%-kal</strong> csökkentették.
            </p>
            <ul className="text-xs space-y-1 mt-2 text-slate-700 dark:text-slate-300 font-mono">
              <li>1. leárazás: 30 000 · 0,85 = 25 500 Ft</li>
              <li>2. leárazás: 25 500 · 0,90 = <strong>22 950 Ft</strong></li>
              <li>Szorzó: 0,85 · 0,90 = 0,765 ➔ <strong>23,5% engedmény</strong></li>
            </ul>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">
              Egy lépésben 23,5%-os árengedménynek felel meg (nem 25%-nak!).
            </p>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 4. SZAKASZ: Pályázati Költségvetések és Geometriai Transzformációk */}
      <TheorySection number={4} title="Összetett feladatok: Pályázati maradékok és geometriai alakzatok">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard
            title="Mf. 4. feladat: Toldi-tanya iskola sportszertámogatása"
            icon={<Layers className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />}
            variant="indigo"
          >
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              Az iskola támogatást nyert:
            </p>
            <ul className="text-xs space-y-2 mt-2 text-slate-700 dark:text-slate-300">
              <li className="p-2 bg-white dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-800">
                <strong>Labdákra:</strong> az összeg 1/4 része = <strong>25%</strong>.
              </li>
              <li className="p-2 bg-white dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-800">
                <strong>Szőnyegekre:</strong> <strong>15%</strong> (eddig összesen 40% költve, maradt 60%).
              </li>
              <li className="p-2 bg-white dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-800">
                <strong>Korcsolyákra:</strong> a maradék 60% harmada = <strong>20%</strong>.
              </li>
              <li className="p-2 bg-indigo-50 dark:bg-indigo-950/40 rounded border border-indigo-200 dark:border-indigo-800 font-bold text-indigo-900 dark:text-indigo-200">
                <strong>Sílécekre (maradék):</strong> 60% - 20% = <strong>40% = 180 000 Ft</strong>.<br />
                Teljes támogatás: 180 000 / 0,4 = <span className="text-purple-600">450 000 Ft</span>!
              </li>
            </ul>
          </TheoryCard>

          <TheoryCard
            title="Tk. 5. feladat & Mf. 5. feladat: Négyzetből téglalap"
            icon={<Box className="w-5 h-5 text-teal-600 dark:text-teal-400" />}
            variant="teal"
          >
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              Egy <strong>10 cm oldalú négyzet</strong> (<MathText text="T = 100\text{ cm}^2" />, <MathText text="K = 40\text{ cm}" />) egyik oldalát <strong>40%-kal növeljük</strong> (14 cm), másik oldalát <strong>40%-kal csökkentjük</strong> (6 cm).
            </p>
            <div className="p-3 my-2 bg-teal-50 dark:bg-teal-950/40 rounded-xl text-xs space-y-1 font-mono text-slate-800 dark:text-slate-200 border border-teal-200 dark:border-teal-800">
              <div>Kerület: 2 · (14 + 6) = <strong>40 cm (változatlan, 0%!)</strong></div>
              <div>Terület: 14 · 6 = <strong>84 cm² (16%-kal csökkent!)</strong></div>
              <div>Szorzó: 1,40 · 0,60 = 0,84 ➔ <strong>100% - 84% = 16% csökkenés</strong>.</div>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              A kerület megmarad, de a terület a szorzótényezők miatt mindig csökken!
            </p>
          </TheoryCard>
        </div>

        {/* Interaktív Négyzet-Téglalap Transzformáció Szemléltető */}
        <div className="mt-6 p-5 bg-white dark:bg-slate-900 rounded-2xl border border-purple-200 dark:border-purple-800/60 shadow-sm">
          <div className="flex items-center gap-2 pb-3 mb-4 border-b border-slate-200 dark:border-slate-800">
            <Box className="w-5 h-5 text-purple-600" />
            <h4 className="font-bold text-slate-800 dark:text-slate-100 text-base">
              Interaktív Geometriai Százalék-Szimulátor (Négyzet ➔ Téglalap)
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-600 dark:text-slate-400">Négyzet eredeti oldala (a):</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-slate-100">{squareSide} cm</span>
                </div>
                <Slider
                  value={[squareSide]}
                  min={5}
                  max={25}
                  step={1}
                  onValueChange={(val) => setSquareSide(val[0])}
                />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-600 dark:text-slate-400">1. oldal változása:</span>
                  <span className={cn('font-mono font-bold', sideChange1 >= 0 ? 'text-emerald-600' : 'text-rose-600')}>
                    {sideChange1 >= 0 ? `+${sideChange1}%` : `${sideChange1}%`} ({newSideA} cm)
                  </span>
                </div>
                <Slider
                  value={[sideChange1]}
                  min={-50}
                  max={50}
                  step={5}
                  onValueChange={(val) => setSideChange1(val[0])}
                />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-600 dark:text-slate-400">2. oldal változása:</span>
                  <span className={cn('font-mono font-bold', sideChange2 >= 0 ? 'text-emerald-600' : 'text-rose-600')}>
                    {sideChange2 >= 0 ? `+${sideChange2}%` : `${sideChange2}%`} ({newSideB} cm)
                  </span>
                </div>
                <Slider
                  value={[sideChange2]}
                  min={-50}
                  max={50}
                  step={5}
                  onValueChange={(val) => setSideChange2(val[0])}
                />
              </div>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2 text-xs">
              <div className="flex justify-between pb-1 border-b border-slate-200 dark:border-slate-700">
                <span className="text-slate-600 dark:text-slate-400">Eredeti négyzet:</span>
                <span className="font-mono font-bold">T = {origArea} cm², K = {origPerimeter} cm</span>
              </div>
              <div className="flex justify-between pb-1 border-b border-slate-200 dark:border-slate-700">
                <span className="text-slate-600 dark:text-slate-400">Új téglalap oldalai:</span>
                <span className="font-mono font-bold text-purple-700 dark:text-purple-300">{newSideA} cm × {newSideB} cm</span>
              </div>
              <div className="flex justify-between pb-1 border-b border-slate-200 dark:border-slate-700">
                <span className="text-slate-600 dark:text-slate-400">Új kerület:</span>
                <span className="font-mono font-bold">{newPerimeter} cm ({(((newPerimeter / origPerimeter) - 1) * 100).toFixed(1)}%)</span>
              </div>
              <div className="flex justify-between pt-1 font-bold text-sm">
                <span className="text-slate-700 dark:text-slate-300">Új terület:</span>
                <span className={cn('font-mono', Number(areaChangePct) >= 0 ? 'text-emerald-600' : 'text-rose-600')}>
                  {newArea} cm² ({Number(areaChangePct) >= 0 ? `+${areaChangePct}%` : `${areaChangePct}%`})
                </span>
              </div>
            </div>
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default ComplexPercentTheory;
