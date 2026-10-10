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
  Sparkles,
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
  Tag,
  Check,
  Flame,
  Scale
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { MathText } from '@/components/math/shared/MathText';

interface PercentReviewTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

export const PercentReviewTheory: React.FC<PercentReviewTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // --- 1. Interaktív Százalékérték Szemléltető ---
  const [baseVal, setBaseVal] = useState<number>(650);
  const [percentRate, setPercentRate] = useState<number>(40);

  const onePercent = baseVal / 100;
  const percentValue = (baseVal * percentRate) / 100;
  const decimalMultiplier = percentRate / 100;

  // --- 2. Interaktív Árengedmény & Növekedés Szimulátor ---
  const [originalPrice, setOriginalPrice] = useState<number>(3400);
  const [discountRate, setDiscountRate] = useState<number>(24);

  const discountAmount = (originalPrice * discountRate) / 100;
  const finalPrice = originalPrice - discountAmount;
  const discountMultiplier = (100 - discountRate) / 100;

  return (
    <TheoryTemplate
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      documentId="g7-pct-review-theory-doc"
      pdfFilename="7_osztaly_mit_tanultunk_a_szazalekszamitasrol.pdf"
      badgeText="7. OSZTÁLY • V. TÉMAKÖR • 2. FEJEZET"
      title="Mit tanultunk a százalékszámításról?"
      subtitle="A százalék és ezrelék fogalma, az alap, százalékláb és százalékérték kapcsolata, valamint a 3 számítási stratégia"
      quickRule={{
        label: 'Fontos szabály',
        formula: 'Érték = Alap · (p / 100) = Alap · 0,0p  •  1% = Alap / 100'
      }}
      themeColor="rose"
      practiceTitle="Készen állsz a százalékszámítási feladatokra?"
      practiceSubtitle="Tedd próbára tudásod a 30 kérdéses gyakorló kvízben részletes levezetésekkel, párosító és rendező játékokkal!"
    >
      {/* 1. SZAKASZ: A százalék és ezrelék fogalma */}
      <TheorySection number={1} title="A százalék és ezrelék fogalma">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard
            title="Mi a százalék és az ezrelék?"
            icon={<Percent className="w-5 h-5 text-rose-600 dark:text-rose-400" />}
            variant="rose"
          >
            <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              A <strong>százalék</strong> egy speciális törtrész: bármely egész mennyiség{' '}
              <strong>századrésze</strong> (<MathText text="\frac{1}{100}" />). Jele: <strong>%</strong>.
            </p>
            <div className="p-3 my-3 bg-rose-50 dark:bg-rose-950/40 rounded-xl text-center border border-rose-200 dark:border-rose-900 text-base font-bold text-rose-900 dark:text-rose-200">
              <MathText text="1% = \frac{1}{100} = 0,01 \text{ rész}" />
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Az <strong>ezrelék</strong> az 1% tizedrésze, vagyis az egész <strong>ezredrésze</strong> (
              <MathText text="\frac{1}{1000}" />). Jele: <strong>‰</strong>.
            </p>
            <div className="p-2.5 my-2 bg-slate-100 dark:bg-slate-800/70 rounded-xl text-center border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200">
              <MathText text="1‰ = 0,1% = \frac{1}{1000} = 0,001 \text{ rész}" />
            </div>
          </TheoryCard>

          <TheoryCard
            title="Fejben számolható alapvető átváltások"
            icon={<Sparkles className="w-5 h-5 text-amber-500" />}
            variant="amber"
          >
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
              Gyakori tört- és százalékértékek, amelyeket érdemes készségszinten fejből felismerni:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
              <div className="p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">
                <span className="font-bold text-rose-600 dark:text-rose-400 block text-sm">50%</span>
                <span className="text-slate-500 font-mono"><MathText text="\frac{1}{2} = 0,5" /></span>
                <span className="text-[10px] text-slate-400 block">fele</span>
              </div>
              <div className="p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">
                <span className="font-bold text-rose-600 dark:text-rose-400 block text-sm">25%</span>
                <span className="text-slate-500 font-mono"><MathText text="\frac{1}{4} = 0,25" /></span>
                <span className="text-[10px] text-slate-400 block">negyede</span>
              </div>
              <div className="p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">
                <span className="font-bold text-rose-600 dark:text-rose-400 block text-sm">75%</span>
                <span className="text-slate-500 font-mono"><MathText text="\frac{3}{4} = 0,75" /></span>
                <span className="text-[10px] text-slate-400 block">háromnegyede</span>
              </div>
              <div className="p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">
                <span className="font-bold text-rose-600 dark:text-rose-400 block text-sm">20%</span>
                <span className="text-slate-500 font-mono"><MathText text="\frac{1}{5} = 0,2" /></span>
                <span className="text-[10px] text-slate-400 block">ötödrésze</span>
              </div>
              <div className="p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">
                <span className="font-bold text-rose-600 dark:text-rose-400 block text-sm">10%</span>
                <span className="text-slate-500 font-mono"><MathText text="\frac{1}{10} = 0,1" /></span>
                <span className="text-[10px] text-slate-400 block">tizedrésze</span>
              </div>
              <div className="p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">
                <span className="font-bold text-rose-600 dark:text-rose-400 block text-sm">12,5%</span>
                <span className="text-slate-500 font-mono"><MathText text="\frac{1}{8} = 0,125" /></span>
                <span className="text-[10px] text-slate-400 block">nyolcada</span>
              </div>
            </div>
            <div className="mt-3 p-2 bg-amber-50 dark:bg-amber-950/40 rounded-lg border border-amber-200 dark:border-amber-800 text-[11px] text-amber-900 dark:text-amber-200">
              <strong>100%-nál nagyobb értékek:</strong>{' '}
              <MathText text="140% = 1,4 = \frac{7}{5}" />,{' '}
              <MathText text="150% = 1,5" />,{' '}
              <MathText text="400% = 4 \text{ (négyszerese)}" />.
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 2. SZAKASZ: A három alapfogalom és a százalékérték 3 számítási módja */}
      <TheorySection number={2} title="A százalékszámítás 3 alapfogalma és a 3 számítási módszer">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 space-y-1.5">
            <span className="text-[10px] font-black uppercase tracking-wider text-blue-600 dark:text-blue-400">1. Alapfogalom</span>
            <h4 className="font-bold text-slate-900 dark:text-white text-base">Alap (A)</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Az a kiinduló teljes mennyiség, aminek a százalékát keressük. Ez felel meg a <strong>100%</strong>-nak (a teljes egésznek).
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800 space-y-1.5">
            <span className="text-[10px] font-black uppercase tracking-wider text-rose-600 dark:text-rose-400">2. Alapfogalom</span>
            <h4 className="font-bold text-slate-900 dark:text-white text-base">Százalékláb (p%)</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              A százalék mértéke. Megmutatja, hogy az alapnak hány századrészét (hány %-át) vesszük számításba.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 space-y-1.5">
            <span className="text-[10px] font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400">3. Alapfogalom</span>
            <h4 className="font-bold text-slate-900 dark:text-white text-base">Százalékérték (É)</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Az alap adott százalékához tartozó konkrét mennyiség vagy számérték.
            </p>
          </div>
        </div>

        {/* Interaktív Szemléltető Doboz */}
        <div className="p-5 bg-gradient-to-br from-rose-50/60 via-white to-pink-50/60 dark:from-slate-900 dark:via-slate-850 dark:to-rose-950/20 rounded-3xl border-2 border-rose-200/80 dark:border-rose-900/50 shadow-sm space-y-5 mb-6">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <Calculator className="w-5 h-5 text-rose-600 dark:text-rose-400" />
              <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
                Interaktív Százalékérték Vizualizáló
              </h3>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setBaseVal(650);
                setPercentRate(40);
              }}
              className="text-xs h-8 gap-1.5 border-rose-200 text-rose-700 hover:bg-rose-100 dark:border-rose-800 dark:text-rose-300"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Alaphelyzet (Tankönyvi példa)
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-3 bg-white dark:bg-slate-800/80 p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-600 dark:text-slate-400">Alap (A):</span>
                <span className="font-mono text-base font-black text-blue-600 dark:text-blue-400">{baseVal}</span>
              </div>
              <Slider
                value={[baseVal]}
                min={50}
                max={1500}
                step={10}
                onValueChange={(val) => setBaseVal(val[0])}
                className="py-1"
              />

              <div className="flex justify-between items-center pt-2">
                <span className="text-xs font-bold text-slate-600 dark:text-slate-400">Százalékláb (p%):</span>
                <span className="font-mono text-base font-black text-rose-600 dark:text-rose-400">{percentRate}%</span>
              </div>
              <Slider
                value={[percentRate]}
                min={1}
                max={100}
                step={1}
                onValueChange={(val) => setPercentRate(val[0])}
                className="py-1"
              />
            </div>

            {/* Százaléksáv és Eredmény */}
            <div className="space-y-3 bg-white dark:bg-slate-800/80 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 block mb-1">
                  Arányos sávdiagram:
                </span>
                <div className="w-full bg-slate-100 dark:bg-slate-700 h-6 rounded-full overflow-hidden flex border border-slate-200 dark:border-slate-600">
                  <div
                    style={{ width: `${percentRate}%` }}
                    className="bg-rose-500 h-full flex items-center justify-center text-[10px] font-black text-white transition-all duration-300"
                  >
                    {percentRate >= 15 ? `${percentRate}%` : ''}
                  </div>
                  <div className="flex-1 flex items-center justify-center text-[10px] font-bold text-slate-400">
                    {100 - percentRate >= 20 ? `${100 - percentRate}%` : ''}
                  </div>
                </div>
              </div>

              <div className="p-3 bg-rose-50/80 dark:bg-rose-950/40 rounded-xl border border-rose-200/80 dark:border-rose-900 text-center">
                <span className="text-[11px] font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 block">
                  Számított százalékérték (É)
                </span>
                <span className="text-2xl font-black font-mono text-rose-700 dark:text-rose-300">
                  {percentValue.toFixed(percentValue % 1 === 0 ? 0 : 2).replace('.', ',')}
                </span>
              </div>
            </div>
          </div>

          {/* 3 Kiszámítási Mód Összevetése */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
            <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1">
              <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400 block">1. Következtetéssel (1%)</span>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-mono">
                1% = {baseVal} : 100 = <strong>{onePercent.toFixed(2).replace('.', ',')}</strong>
              </p>
              <p className="text-xs font-bold text-slate-800 dark:text-slate-200 font-mono">
                É = {onePercent.toFixed(2).replace('.', ',')} · {percentRate} = {percentValue.toFixed(percentValue % 1 === 0 ? 0 : 2).replace('.', ',')}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1">
              <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 block">2. Tört alakban</span>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-mono">
                É = {baseVal} · <MathText text={`\\frac{${percentRate}}{100}`} />
              </p>
              <p className="text-xs font-bold text-slate-800 dark:text-slate-200 font-mono">
                = ({baseVal} · {percentRate}) : 100 = {percentValue.toFixed(percentValue % 1 === 0 ? 0 : 2).replace('.', ',')}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1">
              <span className="text-[11px] font-bold text-purple-600 dark:text-purple-400 block">3. Tizedestört szorzóval</span>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-mono">
                {percentRate}% = {decimalMultiplier.toFixed(2).replace('.', ',')} rész
              </p>
              <p className="text-xs font-bold text-slate-800 dark:text-slate-200 font-mono">
                É = {baseVal} · {decimalMultiplier.toFixed(2).replace('.', ',')} = {percentValue.toFixed(percentValue % 1 === 0 ? 0 : 2).replace('.', ',')}
              </p>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 3. SZAKASZ: Kedvezmények, árcsökkenés és áremelkedés */}
      <TheorySection number={3} title="Kedvezmények, árcsökkenés és áremelkedés">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <TheoryCard
            title="A szorzótényezős szemlélet"
            icon={<Tag className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />}
            variant="indigo"
          >
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
              Ha egy mennyiség megváltozik egy adott százalékkal, nem feltétlenül kell külön kiszámolni a kedvezményt és kivonni. 
              Gondolkodhatunk az <strong>új érték arányában</strong> is:
            </p>
            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
                <span className="font-bold text-emerald-700 dark:text-emerald-300 block mb-0.5">
                  Áremelés (p%-kal drágább):
                </span>
                <p className="text-slate-600 dark:text-slate-400">
                  Az új ár a <MathText text="(100 + p)\%" />-a az eredetinek. Szorzó: <MathText text="1 + \frac{p}{100}" />.
                </p>
                <p className="font-mono text-emerald-800 dark:text-emerald-200 font-bold mt-1">
                  Példa (+40%): Új ár = Eredeti · 1,4
                </p>
              </div>

              <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800">
                <span className="font-bold text-rose-700 dark:text-rose-300 block mb-0.5">
                  Árengedmény (p%-kal olcsóbb):
                </span>
                <p className="text-slate-600 dark:text-slate-400">
                  Az új ár a <MathText text="(100 - p)\%" />-a az eredetinek. Szorzó: <MathText text="1 - \frac{p}{100}" />.
                </p>
                <p className="font-mono text-rose-800 dark:text-rose-200 font-bold mt-1">
                  Példa (-24%): Új ár = Eredeti · 0,76
                </p>
              </div>
            </div>
          </TheoryCard>

          {/* Interaktív Árengedmény Kalkulátor */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 space-y-3 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <TrendingDown className="w-4 h-4 text-rose-500" />
                  Interaktív Leárazás (Munkafüzeti példa)
                </span>
                <span className="text-xs font-mono font-bold text-slate-500">3400 Ft könyv</span>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-600 dark:text-slate-400">Eredeti ár:</span>
                  <span className="font-bold font-mono text-slate-900 dark:text-white">{originalPrice} Ft</span>
                </div>
                <Slider
                  value={[originalPrice]}
                  min={1000}
                  max={10000}
                  step={100}
                  onValueChange={(val) => setOriginalPrice(val[0])}
                  className="py-1"
                />

                <div className="flex justify-between items-center text-xs pt-1">
                  <span className="text-slate-600 dark:text-slate-400">Kedvezmény (%):</span>
                  <span className="font-bold font-mono text-rose-600 dark:text-rose-400">-{discountRate}%</span>
                </div>
                <Slider
                  value={[discountRate]}
                  min={5}
                  max={75}
                  step={1}
                  onValueChange={(val) => setDiscountRate(val[0])}
                  className="py-1"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 dark:border-slate-700">
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-center">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Megtakarítás</span>
                <span className="font-bold font-mono text-sm text-slate-700 dark:text-slate-300">
                  {discountAmount.toFixed(0)} Ft
                </span>
              </div>
              <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-center">
                <span className="text-[10px] text-rose-600 dark:text-rose-400 uppercase font-bold block">Fizetendő új ár</span>
                <span className="font-black font-mono text-base text-rose-700 dark:text-rose-300">
                  {finalPrice.toFixed(0)} Ft
                </span>
                <span className="text-[10px] text-slate-400 block font-mono">
                  {originalPrice} · {discountMultiplier.toFixed(2).replace('.', ',')}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Munkafüzeti kiemelt feladat: Digi fogyása (Egymást követő változások) */}
        <TheoryCallout
          title="Munkafüzet 6. feladat: Digi testsúlya és az egymást követő változások"
          variant="purple"
        >
          <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
            <p>
              Digi kereken <strong>120 kg</strong>. Szeretne 2 év alatt 20 kg-tól megszabadulni. Idén leadja a súlyának a <strong>10%</strong>-át, 
              és jövőre ismét lead <strong>10%</strong>-ot az akkori súlyából. Sikerül-e a terve?
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-3 bg-purple-100/60 dark:bg-purple-950/40 rounded-xl border border-purple-200 dark:border-purple-800">
              <div className="space-y-1">
                <span className="font-bold text-rose-600 dark:text-rose-400 block">❌ Péter hibás gondolata:</span>
                <p className="text-[11px] text-slate-600 dark:text-slate-400">
                  „10% + 10% = 20%-ot ad le, így 120 · 0,8 = 96 kg lesz.”{' '}
                  <strong className="text-rose-600">HIBÁS!</strong> A százalékok nem adódnak össze, mert a második évben már a csökkentett súly 10%-át adja le!
                </p>
              </div>
              <div className="space-y-1">
                <span className="font-bold text-emerald-600 dark:text-emerald-400 block">✓ Paula helyes levezetése:</span>
                <p className="text-[11px] text-slate-600 dark:text-slate-400">
                  1. év után megmarad 90%: <MathText text="120 \cdot 0,9 = 108\text{ kg}" />.<br />
                  2. év után: <MathText text="108 \cdot 0,9 = 97,2\text{ kg}" />.<br />
                  Összesen leadott súly: <MathText text="120 - 97,2 = 22,8\text{ kg}" />. Sikerült a terv!
                </p>
              </div>
            </div>
          </div>
        </TheoryCallout>
      </TheorySection>

      {/* 4. SZAKASZ: Gyakorlati alkalmazások: Keverékek és halmazos feladatok */}
      <TheorySection number={4} title="Gyakorlati alkalmazások: Keverékek és halmazok">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard
            title="Keverékek százalékszámítása (Tk. 4. példa)"
            icon={<Layers className="w-5 h-5 text-teal-600 dark:text-teal-400" />}
            variant="teal"
          >
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-2">
              Összeöntünk <strong>2 liter 25%-os</strong> és <strong>3 liter 40%-os</strong> narancslevet.
            </p>
            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-lg bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 space-y-1">
                <span className="font-bold text-teal-800 dark:text-teal-200 block">1. Lépés: Tiszta anyag meghatározása</span>
                <p className="font-mono text-slate-600 dark:text-slate-300">
                  1. edény: 2 · 0,25 = 0,5 liter tömény lé<br />
                  2. edény: 3 · 0,40 = 1,2 liter tömény lé<br />
                  Összes tömény narancslé: <strong>0,5 + 1,2 = 1,7 liter</strong>
                </p>
              </div>
              <div className="p-2.5 rounded-lg bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 space-y-1">
                <span className="font-bold text-teal-800 dark:text-teal-200 block">2. Lépés: Új keverék százalékos töménysége</span>
                <p className="font-mono text-slate-600 dark:text-slate-300">
                  Összes folyadék: 2 + 3 = 5 liter<br />
                  Töménység = 1,7 : 5 = <strong>0,34 = 34%</strong>
                </p>
              </div>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2">
              A keverék töménysége (34%) a két kiindulási érték (25% és 40%) közé esik!
            </p>
          </TheoryCard>

          <TheoryCard
            title="Halmazos átfedések (Tk. 5. feladat)"
            icon={<PieChart className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
            variant="blue"
          >
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-2">
              A sulibulin minden felsős részt vett. A diákok <strong><MathText text="\frac{3}{5}" /> része (60%-a)</strong> táncolt,{' '}
              <strong>70%-a</strong> énekelt. <strong>78 gyerek</strong> énekelt és táncolt is. Hányan járnak a felső tagozatra?
            </p>
            <div className="p-2.5 rounded-lg bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 space-y-1 text-xs">
              <span className="font-bold text-blue-800 dark:text-blue-200 block">Metszet kiszámítása:</span>
              <p className="font-mono text-slate-700 dark:text-slate-300">
                60% + 70% = 130%<br />
                Mivel az egész iskola 100%, a kettős metszet:<br />
                130% - 100% = <strong>30%</strong> énekelt és táncolt is.
              </p>
              <div className="pt-1.5 border-t border-blue-200 dark:border-blue-800">
                <span className="font-bold text-blue-800 dark:text-blue-200 block">A teljes létszám:</span>
                <p className="font-mono text-slate-700 dark:text-slate-300">
                  30% felel meg 78 diáknak.<br />
                  1% = 78 : 30 = 2,6 diák.<br />
                  100% = 2,6 · 100 = <strong>260 diák</strong> jár a felső tagozatra.
                </p>
              </div>
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 5. SZAKASZ: Tipikus hibák és vizsgacsapdák (Péter és Paula dolgozatai) */}
      <TheorySection number={5} title="Tipikus hibák és vizsgacsapdák (Péter és Paula dolgozatai)">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryTrapBox
            title="1. Csapda: A kedvezményt hisszük az új árnak"
            problem="Egy 3400 Ft-os könyvet 24%-os akcióban vásárolunk meg. Mennyit fizetünk?"
            trap="Péter kiszámolta: (3400 : 100) · 24 = 816 Ft. Azt hitte, 816 Ft az új ár."
            solution="816 Ft csak az engedmény összege! A fizetendő ár 3400 - 816 = 2584 Ft, vagy közvetlenül: 3400 · 0,76 = 2584 Ft."
          />

          <TheoryTrapBox
            title="2. Csapda: Százalékok vak összeadása (Keverékek)"
            problem="Összeöntünk 2 liter 100%-os narancslevet 1 liter 40%-ossal. Hány százalékos lesz a lé?"
            trap="Dávid húga szerint: 100% + 40% = 140%-os narancslé lesz."
            solution="A százalékok nem adódnak össze! Összes tömény lé: 2 + 0,4 = 2,4 l. Összes folyadék: 3 l. Új töménység: 2,4 / 3 = 0,8 = 80%."
          />

          <TheoryTrapBox
            title="3. Csapda: Részmennyiség százalékának hibás alapja"
            problem="240 diákból 70% alsós, a felsősök 75%-a 5-6. osztályos. Hány 5-6. osztályos van?"
            trap="Péter a 240-nek vette a 75%-át: 240 · 0,75 = 180 fő."
            solution="A feladat szerint a felsősöknek a 75%-a! Felsősök száma: 240 · 0,3 = 72 fő. Így 72 · 0,75 = 54 fő ötödikes vagy hatodikos."
          />

          <TheoryTrapBox
            title="4. Csapda: Mértékegység-váltás négyzetre emeléskor"
            problem="Egy négyzet oldala 4900 cm. Mekkora a területe négyzetméterben?"
            trap="Paula kiszámolta: 4900 · 4900 = 24 010 000 cm², majd 100-zal osztva 240 100 m²-t kapott."
            solution="1 m² = 10 000 cm² (vagy átváltunk előre: 4900 cm = 49 m). T = 49 · 49 = 2401 m²!"
          />
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default PercentReviewTheory;
