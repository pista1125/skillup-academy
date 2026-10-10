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
  Calculator,
  Percent,
  Sparkles,
  Layers,
  ArrowRight,
  Info,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  BookOpen,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Car,
  Home,
  Sun,
  School,
  Check
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { MathText } from '@/components/math/shared/MathText';

interface CalculateHundredTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

export const CalculateHundredTheory: React.FC<CalculateHundredTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // --- 1. Interaktív Alap Visszaszámoló Szimulátor ---
  const [valAmount, setValAmount] = useState<number>(84);
  const [pctRate, setPctRate] = useState<number>(12);

  const onePctCalc = valAmount / pctRate;
  const totalBaseCalc = onePctCalc * 100;
  const decimalDivider = pctRate / 100;

  // --- 2. Visszaszámolás Drágulásból és Akcióból ---
  const [priceType, setPriceType] = useState<'increase' | 'discount'>('increase');
  const [modifiedPrice, setModifiedPrice] = useState<number>(4560000);
  const [rateChange, setRateChange] = useState<number>(20);

  const effectivePercentage = priceType === 'increase' ? 100 + rateChange : 100 - rateChange;
  const originalCalculatedPrice = (modifiedPrice / effectivePercentage) * 100;
  const differenceAmount = Math.abs(modifiedPrice - originalCalculatedPrice);

  return (
    <TheoryTemplate
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      documentId="g7-pct-100-theory-doc"
      pdfFilename="7_osztaly_a_100_szazalek_kiszamitasa.pdf"
      badgeText="7. OSZTÁLY • V. TÉMAKÖR • 3. FEJEZET"
      title="A 100% kiszámítása (Százalékalap meghatározása)"
      subtitle="Hogyan határozzuk meg az eredeti teljes mennyiséget (az alapot), ha a százalékérték és a százalékláb ismert?"
      quickRule={{
        label: 'Fontos szabály',
        formula: 'Alap = Érték : (p / 100) = (Érték : p) · 100  •  1% = Érték : p'
      }}
      themeColor="emerald"
      practiceTitle="Készen állsz az alap-visszaszámítási feladatokra?"
      practiceSubtitle="Tedd próbára tudásod a 30 kérdéses gyakorló kvízben részletes levezetésekkel, párosító és rendező játékokkal!"
    >
      {/* 1. SZAKASZ: Mikor keressük a 100%-ot? */}
      <TheorySection number={1} title="Mikor keressük a 100%-ot és mi a matematikai lényege?">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard
            title="A feladatfelismerés kulcsa"
            icon={<School className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />}
            variant="emerald"
          >
            <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              Akkor keressük a <strong>100%-ot (a százalékalapot, A)</strong>, amikor a szövegben megadnak egy{' '}
              <strong>konkrét részmennyiséget (É)</strong> és annak <strong>százalékos arányát (p%)</strong>, és az a kérdés, hogy{' '}
              <em>mennyi volt az eredeti egész mennyiség</em>:
            </p>
            <div className="p-3 my-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800 text-xs space-y-1.5 font-mono text-emerald-900 dark:text-emerald-200">
              <div>• 84 diák tanul zenét, ez a tanulók 12%-a. Hányan járnak a suliba?</div>
              <div>• A napelem a tető 30%-át fedi le, területe 24 m². Mekkora az egész tető?</div>
              <div>• 7500 euró a ház vételárának 10%-os foglalója. Mennyi a ház teljes ára?</div>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Mindegyik esetben az <strong>alap a kérdés</strong>, vagyis az, hogy mihez képest vettük a százalékot!
            </p>
          </TheoryCard>

          <TheoryCard
            title="A 2 fő kiszámítási stratégia"
            icon={<Calculator className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
            variant="blue"
          >
            <div className="space-y-3 text-xs text-slate-700 dark:text-slate-300">
              <div className="p-3 bg-blue-50 dark:bg-blue-950/40 rounded-xl border border-blue-200 dark:border-blue-800 space-y-1">
                <span className="font-bold text-blue-800 dark:text-blue-300 block">1. Következtetéses módszer (1% kiszámítása)</span>
                <p>1. Lépés: Kiszámoljuk az 1%-ot az érték és a százalékláb hányadosaként: <MathText text="1% = \text{Érték} : p" />.</p>
                <p>2. Lépés: Megszorozzuk 100-zal, így megkapjuk a 100%-ot: <MathText text="\text{Alap} = 1% \cdot 100" />.</p>
              </div>

              <div className="p-3 bg-slate-100 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
                <span className="font-bold text-slate-800 dark:text-slate-200 block">2. Tizedestörtes osztás (egyenletből átrendezve)</span>
                <p>
                  Mivel <MathText text="\text{Érték} = \text{Alap} \cdot 0,0p" />, ezért:
                </p>
                <div className="font-bold text-sm text-emerald-600 dark:text-emerald-400 text-center py-1">
                  <MathText text="\text{Alap} = \frac{\text{Érték}}{0,0p} = \text{Érték} : \frac{p}{100}" />
                </div>
              </div>
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 2. SZAKASZ: Interaktív Alap Visszaszámoló Szimulátor */}
      <TheorySection number={2} title="Interaktív Alap Visszaszámoló Szimulátor">
        <div className="p-5 bg-gradient-to-br from-emerald-50/60 via-white to-teal-50/60 dark:from-slate-900 dark:via-slate-850 dark:to-emerald-950/20 rounded-3xl border-2 border-emerald-200/80 dark:border-emerald-900/50 shadow-sm space-y-5">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <Calculator className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
                Interaktív 100% Visszafejtő
              </h3>
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setValAmount(84);
                  setPctRate(12);
                }}
                className="text-xs h-8 border-emerald-200 text-emerald-700 hover:bg-emerald-100 dark:border-emerald-800 dark:text-emerald-300"
              >
                1. Tk. Példa (84 diák, 12%)
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setValAmount(40);
                  setPctRate(32);
                }}
                className="text-xs h-8 border-blue-200 text-blue-700 hover:bg-blue-100 dark:border-blue-800 dark:text-blue-300"
              >
                2. Tk. Példa (40 diák, 32%)
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-3 bg-white dark:bg-slate-800/80 p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-600 dark:text-slate-400">Ismert Százalékérték (É):</span>
                <span className="font-mono text-base font-black text-blue-600 dark:text-blue-400">{valAmount}</span>
              </div>
              <Slider
                value={[valAmount]}
                min={10}
                max={500}
                step={2}
                onValueChange={(val) => setValAmount(val[0])}
                className="py-1"
              />

              <div className="flex justify-between items-center pt-2">
                <span className="text-xs font-bold text-slate-600 dark:text-slate-400">Ismert Százalékláb (p%):</span>
                <span className="font-mono text-base font-black text-rose-600 dark:text-rose-400">{pctRate}%</span>
              </div>
              <Slider
                value={[pctRate]}
                min={2}
                max={80}
                step={1}
                onValueChange={(val) => setPctRate(val[0])}
                className="py-1"
              />
            </div>

            <div className="space-y-3 bg-white dark:bg-slate-800/80 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 block mb-1">
                  100%-os teljességi arány:
                </span>
                <div className="w-full bg-slate-100 dark:bg-slate-700 h-6 rounded-full overflow-hidden flex border border-slate-200 dark:border-slate-600">
                  <div
                    style={{ width: `${Math.min(100, pctRate)}%` }}
                    className="bg-emerald-500 h-full flex items-center justify-center text-[10px] font-black text-white transition-all duration-300"
                  >
                    {pctRate >= 15 ? `${pctRate}% (${valAmount})` : ''}
                  </div>
                  <div className="flex-1 flex items-center justify-center text-[10px] font-bold text-slate-400">
                    100% egész
                  </div>
                </div>
              </div>

              <div className="p-3 bg-emerald-50/80 dark:bg-emerald-950/40 rounded-xl border border-emerald-200/80 dark:border-emerald-900 text-center">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 block">
                  Kiszámított Alap (100% egész)
                </span>
                <span className="text-2xl font-black font-mono text-emerald-700 dark:text-emerald-300">
                  {totalBaseCalc.toFixed(totalBaseCalc % 1 === 0 ? 0 : 2).replace('.', ',')}
                </span>
              </div>
            </div>
          </div>

          {/* Lépésről lépésre levezetés */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
            <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1.5">
              <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-300 block">
                1. Következtetéses számolás:
              </span>
              <p className="text-xs font-mono text-slate-600 dark:text-slate-300">
                1% = {valAmount} : {pctRate} = <strong>{onePctCalc.toFixed(2).replace('.', ',')}</strong>
              </p>
              <p className="text-xs font-mono font-bold text-emerald-700 dark:text-emerald-300">
                100% = {onePctCalc.toFixed(2).replace('.', ',')} · 100 = {totalBaseCalc.toFixed(totalBaseCalc % 1 === 0 ? 0 : 2).replace('.', ',')}
              </p>
              {onePctCalc % 1 !== 0 && (
                <p className="text-[10px] text-amber-600 dark:text-amber-400 pt-0.5">
                  Megjegyzés (Tk. 2. példa): Az 1%-ra kapott érték nem egész ({onePctCalc.toFixed(2).replace('.', ',')}), de a 100-szorosa már egész személy!
                </p>
              )}
            </div>

            <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1.5">
              <span className="text-[11px] font-bold text-blue-700 dark:text-blue-300 block">
                2. Tizedestörtes osztás:
              </span>
              <p className="text-xs font-mono text-slate-600 dark:text-slate-300">
                {pctRate}% = {decimalDivider.toFixed(2).replace('.', ',')} rész
              </p>
              <p className="text-xs font-mono font-bold text-blue-700 dark:text-blue-300">
                Alap = {valAmount} : {decimalDivider.toFixed(2).replace('.', ',')} = {totalBaseCalc.toFixed(totalBaseCalc % 1 === 0 ? 0 : 2).replace('.', ',')}
              </p>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 3. SZAKASZ: Visszaszámolás drágulásból és leárazásból (A legnagyobb csapda!) */}
      <TheorySection number={3} title="Visszaszámolás drágulásból és leárazásból (Tankönyvi modell)">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <TheoryCard
            title="Hogyan gondolkodjunk az új árból?"
            icon={<Car className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />}
            variant="indigo"
          >
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
              Gyakori élethelyzet, hogy a <strong>megváltozott végső árat ismerjük</strong>, és az eredeti árat keressük. 
              Ilyenkor az új ár <strong>nem 100%</strong>, hanem annál több vagy kevesebb:
            </p>
            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800">
                <span className="font-bold text-blue-800 dark:text-blue-300 block">
                  3. Tankönyvi Példa: Autó ára +20% után 4 560 000 Ft
                </span>
                <p className="text-slate-600 dark:text-slate-400 mt-1">
                  A felemelt ár az eredeti ár <strong>120%-a</strong>!<br />
                  120% = 4 560 000 Ft<br />
                  1% = 4 560 000 : 120 = 38 000 Ft<br />
                  <strong>100% (eredeti ár) = 38 000 · 100 = 3 800 000 Ft</strong>.
                </p>
              </div>

              <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800">
                <span className="font-bold text-rose-800 dark:text-rose-300 block">
                  4. Tankönyvi Példa: Számítógép -20% után 196 000 Ft
                </span>
                <p className="text-slate-600 dark:text-slate-400 mt-1">
                  A leárazott ár az eredeti ár <strong>80%-a</strong>!<br />
                  80% = 196 000 Ft<br />
                  1% = 196 000 : 80 = 2450 Ft<br />
                  <strong>100% (eredeti ár) = 2450 · 100 = 245 000 Ft</strong>.<br />
                  Megtakarítás: 245 000 - 196 000 = 49 000 Ft.
                </p>
              </div>
            </div>
          </TheoryCard>

          {/* Visszaszámoló Szimulátor */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 space-y-3 flex flex-col justify-between">
            <div>
              <div className="flex gap-2 mb-3">
                <Button
                  size="sm"
                  variant={priceType === 'increase' ? 'default' : 'outline'}
                  onClick={() => {
                    setPriceType('increase');
                    setModifiedPrice(4560000);
                    setRateChange(20);
                  }}
                  className="flex-1 text-xs h-8 gap-1"
                >
                  <TrendingUp className="w-3.5 h-3.5 text-blue-500" /> +Áremelés (120%)
                </Button>
                <Button
                  size="sm"
                  variant={priceType === 'discount' ? 'default' : 'outline'}
                  onClick={() => {
                    setPriceType('discount');
                    setModifiedPrice(196000);
                    setRateChange(20);
                  }}
                  className="flex-1 text-xs h-8 gap-1"
                >
                  <TrendingDown className="w-3.5 h-3.5 text-rose-500" /> -Leárazás (80%)
                </Button>
              </div>

              <div className="space-y-3 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 dark:text-slate-400">Módosult új ár:</span>
                  <span className="font-bold font-mono text-slate-900 dark:text-white">
                    {modifiedPrice.toLocaleString('hu-HU')} Ft
                  </span>
                </div>

                <div className="flex justify-between items-center pt-1">
                  <span className="text-slate-600 dark:text-slate-400">Változás mértéke:</span>
                  <span className="font-bold font-mono text-indigo-600 dark:text-indigo-400">
                    {priceType === 'increase' ? `+${rateChange}%` : `-${rateChange}%`}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-700">
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-center">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">
                  Az új ár aránya az eredetihez
                </span>
                <span className="font-bold font-mono text-sm text-indigo-700 dark:text-indigo-300">
                  {effectivePercentage}%
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 text-center">
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 uppercase font-bold block">
                  Eredeti ár (100% alap)
                </span>
                <span className="font-black font-mono text-base text-emerald-700 dark:text-emerald-300">
                  {Math.round(originalCalculatedPrice).toLocaleString('hu-HU')} Ft
                </span>
                <span className="text-[10px] text-slate-400 block font-mono">
                  Különbség: {Math.round(differenceAmount).toLocaleString('hu-HU')} Ft
                </span>
              </div>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 4. SZAKASZ: Gyakorlati életszerű mintafeladatok */}
      <TheorySection number={4} title="Életszerű mintafeladatok a tankönyvből és munkafüzetből">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <TheoryCard
            title="Napelemes tető (Tk. 4. feladat)"
            icon={<Sun className="w-5 h-5 text-amber-500" />}
            variant="amber"
          >
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-2">
              Egy ház tetejére <strong>24 m²</strong> napelemet szereltek, ami a teljes tető <strong>30%</strong>-át fedi le.
            </p>
            <div className="p-2.5 bg-amber-50 dark:bg-amber-950/40 rounded-lg border border-amber-200 dark:border-amber-800 text-xs font-mono space-y-1 text-amber-900 dark:text-amber-200">
              <div>30% = 24 m²</div>
              <div>1% = 24 : 30 = 0,8 m²</div>
              <div className="font-bold">100% = 0,8 · 100 = 80 m²</div>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2">
              A teljes tetőfelület nagysága 80 m².
            </p>
          </TheoryCard>

          <TheoryCard
            title="Ingatlan foglaló (Tk. 5. feladat)"
            icon={<Home className="w-5 h-5 text-indigo-500" />}
            variant="indigo"
          >
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-2">
              Szerződéskötéskor a család <strong>7500 eurót</strong> fizetett foglalóként, ami a teljes vételár <strong>10%</strong>-a.
            </p>
            <div className="p-2.5 bg-indigo-50 dark:bg-indigo-950/40 rounded-lg border border-indigo-200 dark:border-indigo-800 text-xs font-mono space-y-1 text-indigo-900 dark:text-indigo-200">
              <div>10% = 7500 €</div>
              <div>100% = 7500 · 10 = 75 000 €</div>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2">
              A ház teljes vételára 75 000 euró volt.
            </p>
          </TheoryCard>

          <TheoryCard
            title="Piaci őszibarack (Tk. 6. feladat)"
            icon={<Layers className="w-5 h-5 text-rose-500" />}
            variant="rose"
          >
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-2">
              Délelőtt eladta a készlet <strong>60%</strong>-át, délután a maradék <strong>120 kg</strong> is elfogyott. Mennyi volt reggel?
            </p>
            <div className="p-2.5 bg-rose-50 dark:bg-rose-950/40 rounded-lg border border-rose-200 dark:border-rose-800 text-xs font-mono space-y-1 text-rose-900 dark:text-rose-200">
              <div>Maradék délután: 100% - 60% = 40%</div>
              <div>40% = 120 kg  ➔  1% = 3 kg</div>
              <div className="font-bold">100% = 300 kg barack</div>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2">
              A nap elején 300 kg őszibarack volt.
            </p>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 5. SZAKASZ: Tipikus hibák és vizsgacsapdák */}
      <TheorySection number={5} title="Tipikus hibák és vizsgacsapdák">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryTrapBox
            title="1. Csapda: A megemelt árból vonjuk le a 20%-ot!"
            problem="Egy autó ára 20%-os áremelés után 4 560 000 Ft. Mennyi volt az eredeti ára?"
            trap="Hibás gondolat: 4 560 000 · 0,2 = 912 000 Ft, és ezt kivonva 3 648 000 Ft-ot kapunk."
            solution="Tilos a megemelt árból levonni a 20%-ot, mert a 20%-os emelés az EREDETI árra vonatkozott! A helyes megoldás: 4 560 000 : 1,2 = 3 800 000 Ft!"
          />

          <TheoryTrapBox
            title="2. Csapda: A maradék százalék azonosításának elhagyása"
            problem="Albert a szavak 40%-át elfelejtette, így 72 szóra emlékezett. Hány szót tudott?"
            trap="Hibás számítás: 40% = 72, tehát 1% = 1,8 és 100% = 180 szó."
            solution="72 szóra EMLÉKEZETT, ami a megmaradt (100% - 40% = 60%)! Tehát 60% = 72 szó  ➔  1% = 1,2 szó  ➔  100% = 120 szót kellett tudnia!"
          />

          <TheoryTrapBox
            title="3. Csapda: Részeredmény elvetése, ha nem egész"
            problem="A 7. évfolyamosok 32%-a sportol, ez 40 diák. Hányan járnak az évfolyamra?"
            trap="Pánik az 1%-nál: 40 : 32 = 1,25 diák, ami 'nem lehet ember', ezért a számoló azt hiszi, hibás a feladat."
            solution="Az 1% csak köztes számítási lépés! A 100-szorosa: 1,25 · 100 = 125 tanuló, ami már teljesen korrekt egész szám."
          />

          <TheoryTrapBox
            title="4. Csapda: Megtakarítás összegének összekeverése az új árral"
            problem="A Maxi Mix ára 30%-kal nőtt, így 150 Ft-tal drágább lett. Mennyi az új ára?"
            trap="Azt hinni, hogy a 150 Ft a 130%, vagy hogy a kiszámított 500 Ft már az új ár."
            solution="A 150 Ft pontosan a 30% emelkedés! Ebből az 1% = 5 Ft, az eredeti ár 100% = 500 Ft. A kérdés az ÚJ ÁR volt: 500 + 150 = 650 Ft!"
          />
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default CalculateHundredTheory;
