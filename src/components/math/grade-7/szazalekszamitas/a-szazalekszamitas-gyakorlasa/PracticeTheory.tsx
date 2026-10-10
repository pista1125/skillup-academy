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
  Zap
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { MathText } from '@/components/math/shared/MathText';

interface PracticeTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

export const PracticeTheory: React.FC<PracticeTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // --- 1. Interaktív ÁFA és Bruttó/Nettó Számológép (Tk. 3. példa) ---
  const [vatRate, setVatRate] = useState<number>(27);
  const [netAmount, setNetAmount] = useState<number>(5600);
  const [vatMode, setVatMode] = useState<'net-to-gross' | 'gross-to-net'>('net-to-gross');
  const [grossInput, setGrossInput] = useState<number>(7112);

  // Számított értékek
  const effectiveNet = vatMode === 'net-to-gross' ? netAmount : Math.round(grossInput / (1 + vatRate / 100));
  const effectiveVat = Math.round(effectiveNet * (vatRate / 100));
  const effectiveGross = vatMode === 'net-to-gross' ? netAmount + effectiveVat : grossInput;

  // --- 2. Interaktív Teve Súlyváltozás Vizualizáló (Tk. 1. példa) ---
  const [camelWeight, setCamelWeight] = useState<number>(500);
  const [weightLossPercent, setWeightLossPercent] = useState<number>(40);

  const weightLossKg = Math.round(camelWeight * (weightLossPercent / 100));
  const postLossWeight = camelWeight - weightLossKg;
  const regainNeededPercent = postLossWeight > 0 ? ((weightLossKg / postLossWeight) * 100).toFixed(1) : '0';

  // --- 3. Palacsintázó áremelés szimulátor (+20% vs kétszer +10%) ---
  const [pancakeBasePrice, setPancakeBasePrice] = useState<number>(1000);
  const singleRaisePrice = Math.round(pancakeBasePrice * 1.2);
  const doubleRaiseStep1 = Math.round(pancakeBasePrice * 1.1);
  const doubleRaisePrice = Math.round(doubleRaiseStep1 * 1.1);

  return (
    <TheoryTemplate
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      documentId="g7-pct-practice-theory-doc"
      pdfFilename="7_osztaly_szazalekszamitas_gyakorlasa.pdf"
      badgeText="7. OSZTÁLY • V. TÉMAKÖR • 5. FEJEZET"
      title="A százalékszámítás gyakorlása"
      subtitle="A három alaptípus gyors felismerése, ÁFA és bruttó-nettó árak, az alapváltás csapdája (súlyvesztés és visszahízás), halmazok és láncolt árváltozások"
      quickRule={{
        label: 'Fontos szabályok a gyakorlatban',
        formula: 'Bruttó = Nettó · (1 + ÁFA)  •  Új = Régi · (1 ± p / 100)  •  Metszet = A% + B% - 100%'
      }}
      themeColor="amber"
      practiceTitle="Készen állsz az életszerű százalékszámítási feladványokra?"
      practiceSubtitle="Tedd próbára tudásod a 30 kérdéses gyakorló kvízben részletes levezetésekkel, párosító és rendező játékokkal!"
    >
      {/* 1. SZAKASZ: A három alapeset gyorskeresője */}
      <TheorySection number={1} title="A három alaptípus gyors felismerése szöveges feladatokban">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <TheoryCard
            title="1. Százalékérték (É) keresése"
            icon={<Percent className="w-5 h-5 text-amber-600 dark:text-amber-400" />}
            variant="amber"
          >
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              <strong>Ismert:</strong> az Alap (100%) és a Százalékláb (p%).
            </p>
            <div className="p-3 my-2 bg-amber-50 dark:bg-amber-950/40 rounded-xl text-center border border-amber-200 dark:border-amber-800 font-mono text-sm font-bold text-amber-900 dark:text-amber-200">
              <MathText text="É = A \cdot \frac{p}{100}" />
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              <strong>Kérdés a szövegben:</strong> <em>„Mennyi a 150 g csokoládé 45%-a?”</em>
            </p>
            <div className="mt-2 text-xs font-mono bg-white dark:bg-slate-900 p-2 rounded border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
              150 · 0,45 = <strong>67,5 g</strong> kakaó
            </div>
          </TheoryCard>

          <TheoryCard
            title="2. Alap (A, a 100%) keresése"
            icon={<Calculator className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
            variant="blue"
          >
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              <strong>Ismert:</strong> a Százalékérték (É) és a Százalékláb (p%).
            </p>
            <div className="p-3 my-2 bg-blue-50 dark:bg-blue-950/40 rounded-xl text-center border border-blue-200 dark:border-blue-800 font-mono text-sm font-bold text-blue-900 dark:text-blue-200">
              <MathText text="A = \frac{É}{p / 100} = \frac{É}{p} \cdot 100" />
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              <strong>Kérdés a szövegben:</strong> <em>„Andris 32 jó feladata a dolgozat 80%-a. Hány feladat volt?”</em>
            </p>
            <div className="mt-2 text-xs font-mono bg-white dark:bg-slate-900 p-2 rounded border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
              32 / 0,8 = <strong>40 feladat</strong> összesen
            </div>
          </TheoryCard>

          <TheoryCard
            title="3. Százalékláb (p%) keresése"
            icon={<TrendingUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />}
            variant="emerald"
          >
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              <strong>Ismert:</strong> az Alap (A) és a Százalékérték (É).
            </p>
            <div className="p-3 my-2 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl text-center border border-emerald-200 dark:border-emerald-800 text-sm font-bold text-emerald-900 dark:text-emerald-200">
              <MathText text="p% = \frac{É}{A} · 100%" />
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              <strong>Kérdés a szövegben:</strong> <em>„Adorján fotója 68 lájkról 85-re nőtt. Hány %-os a gyarapodás?”</em>
            </p>
            <div className="mt-2 text-xs font-mono bg-white dark:bg-slate-900 p-2 rounded border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
              17 / 68 = 0,25 ➔ <strong>+25%</strong> növekedés
            </div>
          </TheoryCard>
        </div>

        {/* Összehasonlító táblázat */}
        <div className="mt-6">
          <TheoryTable
            headers={['Keresett fogalom', 'Jele', 'Mit kérdez a feladat?', 'Számítási eljárás', 'Példa a mindennapokból']}
            rows={[
              ['Százalékérték', 'É', 'Mennyi az A-nak a p%-a?', 'É = A · (p / 100)', 'Egy 20 000 Ft-os kabát 15%-os kedvezménye: 3000 Ft.'],
              ['Alap (a 100%)', 'A', 'Minek a p%-a az É?', 'A = É / (p / 100)', 'Ha az akciós 6000 Ft az eredeti ár 75%-a, akkor az alap 8000 Ft.'],
              ['Százalékláb', 'p%', 'Hány százaléka az É az A-nak?', 'p% = (É / A) · 100%', 'A 25 fős osztályból 5-en jelesek: 5 / 25 = 20%.']
            ]}
          />
        </div>
      </TheorySection>

      {/* 2. SZAKASZ: ÁFA és Bruttó/Nettó Árak (Tk. 3. példa) */}
      <TheorySection number={2} title="Az ÁFA és a bruttó-nettó árak világa (Tk. 3. példa)">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard
            title="Mi az ÁFA (Általános Forgalmi Adó)?"
            icon={<Receipt className="w-5 h-5 text-amber-600 dark:text-amber-400" />}
            variant="amber"
          >
            <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              A vásárolt termékek és szolgáltatások árában adó is van, amelyet az államnak fizetünk be.
            </p>
            <ul className="text-xs space-y-2 mt-3 text-slate-700 dark:text-slate-300">
              <li className="flex items-start gap-2">
                <span className="font-bold text-amber-600 min-w-20">Nettó ár:</span>
                <span>A termék ára adó nélkül. Ez az eladó bevétele, ez a <strong>100% (az Alap)</strong>.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-amber-600 min-w-20">ÁFA kulcsok:</span>
                <span>Magyarországon a leggyakoribb kulcsok: <strong>27%</strong> (általános), <strong>18%</strong> (tejtermékek), <strong>5%</strong> (könyvek, gyógyszerek, alapvető élelmiszerek).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-amber-600 min-w-20">Bruttó ár:</span>
                <span>A vásárló által ténylegesen fizetendő fogyasztói ár: <strong>Nettó ár + ÁFA</strong>.</span>
              </li>
            </ul>

            <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-950/40 rounded-xl border border-amber-200 dark:border-amber-800 text-center font-mono text-sm font-bold text-amber-900 dark:text-amber-200">
              <MathText text="\text{Bruttó ár} = \text{Nettó ár} \cdot \left(1 + \frac{\text{ÁFA}}{100}\right)" />
            </div>
          </TheoryCard>

          <TheoryCard
            title="Hogyan számolunk vissza Bruttóból Nettó árat?"
            icon={<ShoppingCart className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
            variant="blue"
          >
            <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              A 27%-os áfájú termék bruttó ára a nettó ár <strong>127%-a</strong> (1,27-szerese). Ezért visszafelé nem 27%-ot vonunk ki, hanem <strong>1,27-tel osztunk</strong>!
            </p>

            <div className="p-3 my-3 bg-blue-50 dark:bg-blue-950/40 rounded-xl text-center border border-blue-200 dark:border-blue-800 font-mono text-sm font-bold text-blue-900 dark:text-blue-200">
              <MathText text="\text{Nettó ár} = \frac{\text{Bruttó ár}}{1 + \text{ÁFA} / 100}" />
            </div>

            <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
              <div className="p-2 bg-white dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-800">
                <strong>Tk. 3. példa (Könyv):</strong> Bruttó ára 5880 Ft (5% áfával).<br />
                Nettó ár: <span className="font-mono text-blue-600 font-bold">5880 / 1,05 = 5600 Ft</span>.<br />
                Ha 27% lenne: <span className="font-mono text-emerald-600 font-bold">5600 · 1,27 = 7112 Ft</span>. Drágulás: 1232 Ft!
              </div>
              <div className="p-2 bg-white dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-800">
                <strong>Keksz feladat (Tk. 6. f.):</strong> Bruttó ára 635 Ft (27% áfával).<br />
                Nettó ár: <span className="font-mono text-blue-600 font-bold">635 / 1,27 = 500 Ft</span>. ÁFA összege: 135 Ft.
              </div>
            </div>
          </TheoryCard>
        </div>

        {/* Interaktív ÁFA Számológép */}
        <div className="mt-6 p-5 bg-white dark:bg-slate-900 rounded-2xl border border-amber-200 dark:border-amber-800/60 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-slate-200 dark:border-slate-800 gap-2">
            <div className="flex items-center gap-2">
              <Receipt className="w-5 h-5 text-amber-600" />
              <h4 className="font-bold text-slate-800 dark:text-slate-100 text-base">
                Interaktív ÁFA és Árképzés Szimulátor
              </h4>
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant={vatMode === 'net-to-gross' ? 'default' : 'outline'}
                onClick={() => setVatMode('net-to-gross')}
                className={vatMode === 'net-to-gross' ? 'bg-amber-600 hover:bg-amber-700 text-white' : ''}
              >
                Nettóból ➔ Bruttó
              </Button>
              <Button
                size="sm"
                variant={vatMode === 'gross-to-net' ? 'default' : 'outline'}
                onClick={() => setVatMode('gross-to-net')}
                className={vatMode === 'gross-to-net' ? 'bg-amber-600 hover:bg-amber-700 text-white' : ''}
              >
                Bruttóból ➔ Nettó
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-300 block mb-1">
                  Válassz ÁFA kulcsot:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[5, 18, 27].map((rate) => (
                    <Button
                      key={rate}
                      size="sm"
                      variant={vatRate === rate ? 'default' : 'outline'}
                      onClick={() => setVatRate(rate)}
                      className={cn(
                        'text-xs font-bold',
                        vatRate === rate
                          ? 'bg-amber-600 hover:bg-amber-700 text-white'
                          : 'border-slate-300 dark:border-slate-700'
                      )}
                    >
                      {rate}% ÁFA
                    </Button>
                  ))}
                </div>
              </div>

              {vatMode === 'net-to-gross' ? (
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-600 dark:text-slate-400">Nettó ár (Alap, 100%):</span>
                    <span className="font-mono font-bold text-amber-700 dark:text-amber-300">{netAmount.toLocaleString()} Ft</span>
                  </div>
                  <Slider
                    value={[netAmount]}
                    min={500}
                    max={20000}
                    step={100}
                    onValueChange={(val) => setNetAmount(val[0])}
                  />
                  <div className="flex gap-2 mt-2">
                    {[500, 3500, 5600, 10000].map((preset) => (
                      <Button
                        key={preset}
                        variant="ghost"
                        size="sm"
                        onClick={() => setNetAmount(preset)}
                        className="text-[11px] h-6 px-2 text-slate-500 hover:text-amber-600"
                      >
                        {preset} Ft
                      </Button>
                    ))}
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-600 dark:text-slate-400">Bruttó ár (fizetendő összeg):</span>
                    <span className="font-mono font-bold text-emerald-700 dark:text-emerald-300">{grossInput.toLocaleString()} Ft</span>
                  </div>
                  <Slider
                    value={[grossInput]}
                    min={635}
                    max={25400}
                    step={127}
                    onValueChange={(val) => setGrossInput(val[0])}
                  />
                  <div className="flex gap-2 mt-2">
                    {[635, 4130, 5880, 7112, 12700].map((preset) => (
                      <Button
                        key={preset}
                        variant="ghost"
                        size="sm"
                        onClick={() => setGrossInput(preset)}
                        className="text-[11px] h-6 px-2 text-slate-500 hover:text-emerald-600"
                      >
                        {preset} Ft
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Számítási Eredmény Kártya */}
            <div className="p-4 bg-amber-50/70 dark:bg-amber-950/30 rounded-xl border border-amber-200 dark:border-amber-800/80 space-y-3">
              <div className="flex justify-between items-center text-xs text-slate-600 dark:text-slate-300 pb-2 border-b border-amber-200 dark:border-amber-800">
                <span>Nettó ár (100%):</span>
                <span className="font-mono font-bold text-slate-900 dark:text-slate-100 text-sm">
                  {effectiveNet.toLocaleString()} Ft
                </span>
              </div>
              <div className="flex justify-between items-center text-xs text-amber-700 dark:text-amber-400 pb-2 border-b border-amber-200 dark:border-amber-800">
                <span>ÁFA tartalom ({vatRate}%):</span>
                <span className="font-mono font-bold text-amber-700 dark:text-amber-300 text-sm">
                  + {effectiveVat.toLocaleString()} Ft
                </span>
              </div>
              <div className="flex justify-between items-center text-sm font-bold text-emerald-800 dark:text-emerald-300 pt-1">
                <span>Bruttó fogyasztói ár:</span>
                <span className="font-mono text-base text-emerald-700 dark:text-emerald-200">
                  {effectiveGross.toLocaleString()} Ft
                </span>
              </div>

              {/* Színes aránysáv */}
              <div className="w-full bg-slate-200 dark:bg-slate-700 h-3 rounded-full overflow-hidden flex">
                <div
                  className="bg-blue-500 h-full"
                  style={{ width: `${(effectiveNet / effectiveGross) * 100}%` }}
                  title="Nettó rész"
                />
                <div
                  className="bg-amber-500 h-full"
                  style={{ width: `${(effectiveVat / effectiveGross) * 100}%` }}
                  title="ÁFA rész"
                />
              </div>
              <div className="flex justify-between text-[10px] text-slate-500 dark:text-slate-400">
                <span>Nettó: {((effectiveNet / effectiveGross) * 100).toFixed(1)}%</span>
                <span>ÁFA: {((effectiveVat / effectiveGross) * 100).toFixed(1)}%</span>
              </div>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 3. SZAKASZ: Az alapváltás csapdája - A Teve példája (Tk. 1. példa) */}
      <TheorySection number={3} title="Az alapváltás csapdája: Súlyvesztés és visszahízás (Tk. 1. példa)">
        <TheoryCallout
          title="A Tankönyv Tanulságos Teve-Példája (Tk. 1. példa, 146. oldal)"
          icon={<Scale className="w-5 h-5 text-amber-600" />}
          variant="amber"
        >
          <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
            Egy sivatagi átkelés előtt a teve <strong>500 kg</strong> volt. A nehéz túra során testtömegének <strong>40%-át</strong> elveszítette.
            A vándorlás végén az oázisban addig táplálták, amíg <strong>vissza nem nyerte eredeti 500 kg-os súlyát</strong>.
            Hány százalékkal gyarapodott a súlya a hizlalás során? <em>Vajon 40%-kal?</em>
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs space-y-1">
              <span className="font-bold text-rose-600 uppercase tracking-wide">1. Lépés: A fogyás</span>
              <p className="text-slate-600 dark:text-slate-300">
                Alap: <strong>500 kg (100%)</strong><br />
                Súlyveszteség: <span className="font-mono font-bold">500 · 0,40 = 200 kg</span><br />
                A teve új tömege a sivatag után: <span className="font-mono font-bold text-rose-600">500 - 200 = 300 kg</span>.
              </p>
            </div>

            <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs space-y-1">
              <span className="font-bold text-emerald-600 uppercase tracking-wide">2. Lépés: A visszahízás (ALAPVÁLTÁS!)</span>
              <p className="text-slate-600 dark:text-slate-300">
                Most a visszahízás alapja a lefogyott teve: <strong>300 kg (az ÚJ 100%)!</strong><br />
                A gyarapodás összege: 200 kg.<br />
                Százalékláb: <span className="font-mono font-bold text-emerald-600">200 / 300 = 2/3 ≈ 66,7%!</span>
              </p>
            </div>
          </div>
        </TheoryCallout>

        {/* Interaktív Teve Súlyvesztés Szimulátor */}
        <div className="mt-6 p-5 bg-white dark:bg-slate-900 rounded-2xl border border-amber-200 dark:border-amber-800/60 shadow-sm">
          <div className="flex items-center gap-2 pb-3 mb-4 border-b border-slate-200 dark:border-slate-800">
            <Scale className="w-5 h-5 text-amber-600" />
            <h4 className="font-bold text-slate-800 dark:text-slate-100 text-base">
              Interaktív Alapváltási Vizualizáció (Fogyás vs. Visszahízás)
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-600 dark:text-slate-400">Kiinduló súly:</span>
                  <span className="font-mono font-bold text-slate-800 dark:text-slate-200">{camelWeight} kg</span>
                </div>
                <Slider
                  value={[camelWeight]}
                  min={100}
                  max={800}
                  step={50}
                  onValueChange={(val) => setCamelWeight(val[0])}
                />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-600 dark:text-slate-400">Súlyveszteség százaléka:</span>
                  <span className="font-mono font-bold text-rose-600">-{weightLossPercent}%</span>
                </div>
                <Slider
                  value={[weightLossPercent]}
                  min={10}
                  max={60}
                  step={5}
                  onValueChange={(val) => setWeightLossPercent(val[0])}
                />
              </div>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2 text-xs">
              <div className="flex justify-between pb-1 border-b border-slate-200 dark:border-slate-700">
                <span className="text-slate-600 dark:text-slate-400">Kiinduló testtömeg:</span>
                <span className="font-mono font-bold">{camelWeight} kg</span>
              </div>
              <div className="flex justify-between pb-1 border-b border-slate-200 dark:border-slate-700 text-rose-600">
                <span>Elveszített súly (-{weightLossPercent}%):</span>
                <span className="font-mono font-bold">-{weightLossKg} kg</span>
              </div>
              <div className="flex justify-between pb-1 border-b border-slate-200 dark:border-slate-700">
                <span className="text-slate-600 dark:text-slate-400">Maradék tömeg (az ÚJ ALAP!):</span>
                <span className="font-mono font-bold text-amber-700 dark:text-amber-300">{postLossWeight} kg</span>
              </div>
              <div className="flex justify-between pt-1 text-emerald-700 dark:text-emerald-300 font-bold">
                <span>Visszahízás szükséges mértéke:</span>
                <span className="font-mono text-sm">+{regainNeededPercent}%</span>
              </div>
              <p className="text-[11px] text-slate-500 italic pt-1">
                Mivel a visszahízáskor a már csökkent {postLossWeight} kg az új 100%, a visszanyerendő {weightLossKg} kg jóval nagyobb százalékot képvisel belőle!
              </p>
            </div>
          </div>
        </div>

        {/* Trap Box az alapváltásról */}
        <div className="mt-6">
          <TheoryTrapBox
            title="Típushiba: +20% után -20% nem adja vissza az eredeti árat!"
            mistake="Egy 10 000 Ft-os terméket 20%-kal drágítanak, majd a megnövelt árat 20%-kal leértékelik. A vevő azt gondolja: „Akkor visszakaptuk a 10 000 Ft-ot!”"
            correction="Számoljuk ki pontosan: 10 000 · 1,20 = 12 000 Ft. Ezután a 12 000 Ft-ból vonunk le 20%-ot: 12 000 · 0,80 = 9600 Ft! A termék 400 Ft-tal (4%-kal) olcsóbb lett az eredetinél!"
          />
        </div>
      </TheorySection>

      {/* 4. SZAKASZ: Egymást követő változások és halmazok */}
      <TheorySection number={4} title="Összetett gyakorlati helyzetek: Egymást követő változások és halmazok">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard
            title="A Palacsintázó dilemmája: +20% egyszerre vagy 2-szer +10%?"
            icon={<Sparkles className="w-5 h-5 text-amber-600 dark:text-amber-400" />}
            variant="amber"
          >
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              Két palacsintázó eltérően emeli az árakat a szezon kezdetén:
            </p>
            <ul className="text-xs space-y-2 mt-2 text-slate-700 dark:text-slate-300">
              <li className="p-2 bg-white dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-800">
                <strong>A) Palacsintázó:</strong> Egyszerre emel <strong>20%-kal</strong>.<br />
                Új ár: <span className="font-mono text-amber-600 font-bold">1000 · 1,20 = 1200 Ft</span> (+20%).
              </li>
              <li className="p-2 bg-white dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-800">
                <strong>B) Palacsintázó:</strong> Kétszer egymás után emel <strong>10%-kal</strong>.<br />
                1. emelés: <span className="font-mono font-bold">1000 · 1,10 = 1100 Ft</span>.<br />
                2. emelés: <span className="font-mono text-emerald-600 font-bold">1100 · 1,10 = 1210 Ft</span>.<br />
                A két lépéses emelés összesen <strong>21%-os drágulás</strong> (nem 20%)!
              </li>
            </ul>
          </TheoryCard>

          <TheoryCard
            title="Halmazos százalékszámítás (Méz és mazsola, Tk. 3. f.)"
            icon={<PieChart className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />}
            variant="indigo"
          >
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              Egy 30 fős osztályban a gyerekek <strong>70%-a szereti a mézet</strong>, <strong>60%-a a mazsolát</strong>, és mindenki szereti legalább az egyiket. Hányan szeretik mindkettőt?
            </p>

            <div className="p-3 my-2 bg-indigo-50 dark:bg-indigo-950/40 rounded-xl text-xs space-y-1 text-slate-700 dark:text-slate-300 border border-indigo-200 dark:border-indigo-800">
              <p>Összeadjuk a százalékokat: <strong>70% + 60% = 130%</strong>.</p>
              <p>Mivel összesen csak 100% diák van, a metszet (átfedés):</p>
              <p className="font-mono font-bold text-indigo-700 dark:text-indigo-300">
                130% - 100% = 30% szereti mindkettőt!
              </p>
              <p>A 30 fős osztály 30%-a: <span className="font-mono font-bold">30 · 0,30 = 9 tanuló</span>.</p>
            </div>
            <p className="text-xs text-slate-500">
              Csak mézet szeret: 70% - 30% = 40% (12 fő). Csak mazsolát: 60% - 30% = 30% (9 fő).
            </p>
          </TheoryCard>
        </div>

        {/* 5. és 6. További típusok */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <TheoryCard
            title="Láncolt százalékszámítás (Maxim évfolyama, Tk. 12. f.)"
            icon={<Layers className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
            variant="blue"
          >
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              Maxim évfolyamán a tanulók <strong>40%-a fiú</strong>, a fiúk <strong>40%-a szemüveges</strong>, és a szemüveges fiúk <strong>40%-a barna hajú</strong>. Ha 8 ilyen fiú van, hány diák jár az évfolyamra?
            </p>
            <div className="p-3 my-2 bg-blue-50 dark:bg-blue-950/40 rounded-xl text-xs space-y-1 font-mono text-slate-800 dark:text-slate-200 border border-blue-200 dark:border-blue-800">
              <div>Részarány: 0,4 · 0,4 · 0,4 = <strong>0,064 (6,4%)</strong></div>
              <div>Teljes évfolyam (Alap): 8 / 0,064 = <strong>125 diák</strong></div>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Ilyenkor a részek szorzata adja meg a teljes egészhez viszonyított végső arányt!
            </p>
          </TheoryCard>

          <TheoryCard
            title="Négyzet területe és oldala (Mf. 6. feladat)"
            icon={<BookOpen className="w-5 h-5 text-teal-600 dark:text-teal-400" />}
            variant="teal"
          >
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              Hány százalékkal kell csökkenteni egy négyzet oldalát, hogy a területe az eredeti <strong>64%-a</strong> legyen?
            </p>
            <div className="p-3 my-2 bg-teal-50 dark:bg-teal-950/40 rounded-xl text-xs space-y-1 text-slate-800 dark:text-slate-200 border border-teal-200 dark:border-teal-800 font-mono">
              <div><MathText text="T_{\text{új}} = 0{,}64 \cdot T \implies a_{\text{új}}^2 = 0{,}64 \cdot a^2" /></div>
              <div><MathText text="a_{\text{új}} = \sqrt{0{,}64} \cdot a = 0{,}8 \cdot a = 80\%" /></div>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Az új oldal a réginek a 80%-a, tehát a csökkenés mértéke: <strong>100% - 80% = 20%</strong>!
            </p>
          </TheoryCard>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default PracticeTheory;
