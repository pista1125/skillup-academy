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
  HardDrive,
  Droplet,
  Clock,
  Sparkles,
  Check
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { MathText } from '@/components/math/shared/MathText';

interface WhatPercentTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

export const WhatPercentTheory: React.FC<WhatPercentTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // --- 1. Interaktív Százalékláb Számológép ---
  const [valAmount, setValAmount] = useState<number>(192);
  const [baseAmount, setBaseAmount] = useState<number>(256);

  const fractionVal = baseAmount > 0 ? valAmount / baseAmount : 0;
  const percentVal = fractionVal * 100;
  const onePercentOfBase = baseAmount / 100;

  // --- 2. Interaktív Alapváltási Szemléltető (A 2000 Ft vs 1600 Ft csapda) ---
  const [simBase, setSimBase] = useState<number>(2000);
  const [simTarget, setSimTarget] = useState<number>(1600);

  const diffAmount = Math.abs(simTarget - simBase);
  const decreaseRate = simBase > 0 ? (diffAmount / simBase) * 100 : 0;
  const increaseRate = simTarget > 0 ? (diffAmount / simTarget) * 100 : 0;

  return (
    <TheoryTemplate
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      documentId="g7-pct-what-theory-doc"
      pdfFilename="7_osztaly_hany_szazalek.pdf"
      badgeText="7. OSZTÁLY • V. TÉMAKÖR • 4. FEJEZET"
      title="Hány százalék? (Százalékláb keresése)"
      subtitle="A százalékláb kiszámítása, tört- és tizedes alak átváltása százalékká, valamint az áremelések és árcsökkenések összehasonlítása"
      quickRule={{
        label: 'Fontos szabály',
        formula: 'Százalékláb = (Érték / Alap) · 100%  •  p% = (É / A) · 100%'
      }}
      themeColor="cyan"
      practiceTitle="Készen állsz a százalékláb-meghatározási feladványokra?"
      practiceSubtitle="Tedd próbára tudásod a 30 kérdéses gyakorló kvízben részletes levezetésekkel, párosító és rendező játékokkal!"
    >
      {/* 1. SZAKASZ: A százalékláb fogalma és a két fő módszer */}
      <TheorySection number={1} title="A százalékláb fogalma és a kétféle megoldási út">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TheoryCard
            title="Mi a százalékláb és mit fejez ki?"
            icon={<Percent className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />}
            variant="cyan"
          >
            <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              A <strong>százalékláb (p%)</strong> azt fejezi ki, hogy a vizsgált részmennyiség (<strong>százalékérték, É</strong>){' '}
              hányad része a teljes kiinduló egésznek (<strong>százalékalap, A</strong>), <strong>századrészekben (százalékban) kifejezve</strong>.
            </p>
            <div className="p-3 my-3 bg-cyan-50 dark:bg-cyan-950/40 rounded-xl text-center border border-cyan-200 dark:border-cyan-800 text-base sm:text-lg font-bold text-cyan-900 dark:text-cyan-200">
              <MathText text="p% = \frac{\text{Érték}}{\text{Alap}} · 100% = \frac{É}{A} · 100%" size="lg" />
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Az osztás eredményeként kapott hányadost (tizedestörtet) 100-zal megszorozva azonnal megkapjuk a százalékértéket!
            </p>
          </TheoryCard>

          <TheoryCard
            title="A 2 tankönyvi megoldási módszer (Tk. 1. példa)"
            icon={<HardDrive className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
            variant="blue"
          >
            <p className="text-xs text-slate-700 dark:text-slate-300 mb-2">
              <strong>Példa:</strong> Egy 256 GB-os pendrive-on 192 GB adat található. Hány százalék a foglalt terület?
            </p>
            <div className="space-y-2 text-xs">
              <div className="p-2.5 bg-blue-50 dark:bg-blue-950/40 rounded-xl border border-blue-200 dark:border-blue-800">
                <span className="font-bold text-blue-800 dark:text-blue-300 block">I. Módszer: Törtrész tizedes alakká</span>
                <div className="text-slate-700 dark:text-slate-300 mt-1 font-semibold flex items-center gap-1.5 flex-wrap">
                  <MathText text="\frac{192}{256} = \frac{3}{4} = 0,75 \text{ rész} = 75%" />
                </div>
                <p className="text-[11px] text-slate-500 mt-1">A szabad hely: 100% - 75% = 25%.</p>
              </div>

              <div className="p-2.5 bg-slate-100 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
                <span className="font-bold text-slate-800 dark:text-slate-200 block">II. Módszer: 1% következtetés</span>
                <p className="font-mono text-slate-700 dark:text-slate-300 mt-0.5">
                  100% = 256 GB  ➔  1% = 2,56 GB<br />
                  192 : 2,56 = <strong>75</strong> (75-ször van meg benne) ➔ <strong>75%</strong>
                </p>
              </div>
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 2. SZAKASZ: Interaktív Százalékláb Számológép */}
      <TheorySection number={2} title="Interaktív Százalékláb Számológép">
        <div className="p-5 bg-gradient-to-br from-cyan-50/60 via-white to-blue-50/60 dark:from-slate-900 dark:via-slate-850 dark:to-cyan-950/20 rounded-3xl border-2 border-cyan-200/80 dark:border-cyan-900/50 shadow-sm space-y-5">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <Calculator className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
              <h3 className="font-bold text-slate-900 dark:text-white text-sm sm:text-base">
                Interaktív Százalékláb és Törtrész Elemző
              </h3>
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setValAmount(192);
                  setBaseAmount(256);
                }}
                className="text-xs h-8 border-cyan-200 text-cyan-700 hover:bg-cyan-100 dark:border-cyan-800 dark:text-cyan-300"
              >
                Pendrive (192 / 256)
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setValAmount(42);
                  setBaseAmount(60);
                }}
                className="text-xs h-8 border-blue-200 text-blue-700 hover:bg-blue-100 dark:border-blue-800 dark:text-blue-300"
              >
                Testvíz (42 / 60)
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setValAmount(119);
                  setBaseAmount(140);
                }}
                className="text-xs h-8 border-indigo-200 text-indigo-700 hover:bg-indigo-100 dark:border-indigo-800 dark:text-indigo-300"
              >
                Dolgozat (119 / 140)
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-3 bg-white dark:bg-slate-800/80 p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-600 dark:text-slate-400">Részérték (É):</span>
                <span className="font-mono text-base font-black text-cyan-600 dark:text-cyan-400">{valAmount}</span>
              </div>
              <Slider
                value={[valAmount]}
                min={5}
                max={baseAmount > 0 ? Math.max(300, baseAmount) : 300}
                step={1}
                onValueChange={(val) => setValAmount(val[0])}
                className="py-1"
              />

              <div className="flex justify-between items-center pt-2">
                <span className="text-xs font-bold text-slate-600 dark:text-slate-400">Teljes Alap (A):</span>
                <span className="font-mono text-base font-black text-blue-600 dark:text-blue-400">{baseAmount}</span>
              </div>
              <Slider
                value={[baseAmount]}
                min={10}
                max={400}
                step={2}
                onValueChange={(val) => setBaseAmount(val[0])}
                className="py-1"
              />
            </div>

            <div className="space-y-3 bg-white dark:bg-slate-800/80 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 block mb-1">
                  Arányos telítettség sávdiagram:
                </span>
                <div className="w-full bg-slate-100 dark:bg-slate-700 h-6 rounded-full overflow-hidden flex border border-slate-200 dark:border-slate-600">
                  <div
                    style={{ width: `${Math.min(100, Math.max(0, percentVal))}%` }}
                    className="bg-cyan-500 h-full flex items-center justify-center text-[10px] font-black text-white transition-all duration-300"
                  >
                    {percentVal >= 12 ? `${percentVal.toFixed(1)}%` : ''}
                  </div>
                  {percentVal < 100 && (
                    <div className="flex-1 flex items-center justify-center text-[10px] font-bold text-slate-400">
                      {100 - percentVal >= 15 ? `${(100 - percentVal).toFixed(1)}% szabad` : ''}
                    </div>
                  )}
                </div>
              </div>

              <div className="p-3 bg-cyan-50/80 dark:bg-cyan-950/40 rounded-xl border border-cyan-200/80 dark:border-cyan-900 text-center">
                <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 block">
                  Kiszámított Százalékláb (p%)
                </span>
                <span className="text-3xl font-black font-mono text-cyan-700 dark:text-cyan-300">
                  {percentVal.toFixed(percentVal % 1 === 0 ? 0 : 2).replace('.', ',')}%
                </span>
                <span className="text-xs text-slate-500 block font-mono mt-0.5">
                  Törtrész: {valAmount} / {baseAmount} = {fractionVal.toFixed(4).replace('.', ',')}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
            <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1 text-xs">
              <span className="font-bold text-cyan-700 dark:text-cyan-300 block">I. Út: Törtrész tizedes alakja</span>
              <p className="font-mono text-slate-600 dark:text-slate-400">
                {valAmount} : {baseAmount} = <strong>{fractionVal.toFixed(4).replace('.', ',')}</strong>
              </p>
              <p className="font-mono font-bold text-cyan-700 dark:text-cyan-300">
                {fractionVal.toFixed(4).replace('.', ',')} · 100 = {percentVal.toFixed(2).replace('.', ',')}%
              </p>
            </div>

            <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1 text-xs">
              <span className="font-bold text-blue-700 dark:text-blue-300 block">II. Út: 1% következtetés</span>
              <p className="font-mono text-slate-600 dark:text-slate-400">
                1% = {baseAmount} : 100 = <strong>{onePercentOfBase.toFixed(2).replace('.', ',')}</strong>
              </p>
              <p className="font-mono font-bold text-blue-700 dark:text-blue-300">
                {valAmount} : {onePercentOfBase.toFixed(2).replace('.', ',')} = {percentVal.toFixed(2).replace('.', ',')}%
              </p>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 3. SZAKASZ: Árváltozások és az Alapváltási Szabály */}
      <TheorySection number={3} title="Árváltozások és a hírhedt alapváltási csapda">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <TheoryCard
            title="Mihez viszonyítunk? (A viszonyítási alap kiválasztása)"
            icon={<TrendingDown className="w-5 h-5 text-rose-500" />}
            variant="rose"
          >
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
              Áremelésnél vagy leárazásnál <strong>mindig a KIINDULÓ (korábbi) érték az alap (100%)</strong>:
            </p>
            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800">
                <span className="font-bold text-rose-800 dark:text-rose-300 block">
                  Szendvics akció (Tk. 4. feladat):
                </span>
                <p className="text-slate-600 dark:text-slate-400 mt-1">
                  250 Ft-ról 180 Ft-ra csökken. Csökkenés: 70 Ft.<br />
                  Alap a 250 Ft! ➔ <MathText text="\frac{70}{250} = \frac{28}{100} = 28%" /> árcsökkenés.
                </p>
              </div>

              <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
                <span className="font-bold text-emerald-800 dark:text-emerald-300 block">
                  Lázár tanulási ideje (Tk. 3. feladat):
                </span>
                <p className="text-slate-600 dark:text-slate-400 mt-1">
                  Heti 5 óráról 7 órára nőtt. Növekedés: 2 óra.<br />
                  Alap a heti 5 óra! ➔ <MathText text="\frac{2}{5} = \frac{40}{100} = 40%" /> növekedés.
                </p>
              </div>
            </div>
          </TheoryCard>

          {/* Interaktív 2000 Ft vs 1600 Ft szimuláció */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 space-y-3 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 mb-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                Tk. 7. Feladat: A 2000 Ft ➔ 1600 Ft ➔ 2000 Ft paradoxon
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
                Egy könyv árát 2000 Ft-ról 1600 Ft-ra csökkentik, majd visszemelik 2000 Ft-ra. Vajon a két százalék megegyezik?
              </p>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-center">
                  <span className="text-[10px] uppercase font-bold text-rose-600 block">1. Lépés: Leárazás</span>
                  <span className="text-xs text-slate-500">2000 Ft ➔ 1600 Ft (-400 Ft)</span>
                  <span className="text-lg font-black font-mono text-rose-700 dark:text-rose-300 block mt-1">
                    -20%
                  </span>
                  <span className="text-[10px] text-slate-400 block font-mono">Alap: 2000 Ft (400 / 2000)</span>
                </div>

                <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 text-center">
                  <span className="text-[10px] uppercase font-bold text-emerald-600 block">2. Lépés: Visszaemelés</span>
                  <span className="text-xs text-slate-500">1600 Ft ➔ 2000 Ft (+400 Ft)</span>
                  <span className="text-lg font-black font-mono text-emerald-700 dark:text-emerald-300 block mt-1">
                    +25%
                  </span>
                  <span className="text-[10px] text-slate-400 block font-mono">Alap: 1600 Ft (400 / 1600)</span>
                </div>
              </div>
            </div>

            <div className="p-2.5 bg-amber-50 dark:bg-amber-950/40 rounded-xl border border-amber-200 dark:border-amber-800 text-[11px] text-amber-900 dark:text-amber-200">
              <strong>Miért nem ugyanaz a százalék?</strong> Mert a második esetben a csökkentett ár (1600 Ft) lett az új viszonyítási alap!
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 4. SZAKASZ: Gyakorlati alkalmazások */}
      <TheorySection number={4} title="Gyakorlati élethelyzetek és geometriai alkalmazások">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <TheoryCard
            title="Emberi test víztartalma (Mf. 2. feladat)"
            icon={<Droplet className="w-5 h-5 text-blue-500" />}
            variant="blue"
          >
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-2">
              Egy <strong>60 kg</strong>-os ember testében körülbelül <strong>42 kg víz</strong> van.
            </p>
            <div className="p-2.5 bg-blue-50 dark:bg-blue-950/40 rounded-lg border border-blue-200 dark:border-blue-800 text-xs space-y-1.5 text-blue-900 dark:text-blue-200">
              <div className="flex items-center gap-1.5">
                Víz aránya: <MathText text="\frac{42}{60} = \frac{7}{10}" />
              </div>
              <div className="font-bold flex items-center gap-1.5">
                <MathText text="42 : 60 · 100 = 70%" /> víz
              </div>
            </div>
          </TheoryCard>

          <TheoryCard
            title="Téglalap kerület vs. terület (Mf. 4. feladat)"
            icon={<Layers className="w-5 h-5 text-emerald-500" />}
            variant="emerald"
          >
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-2">
              A 10 cm és 5 cm oldalú téglalap oldalait <strong>20%-kal növeljük</strong>.
            </p>
            <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/40 rounded-lg border border-emerald-200 dark:border-emerald-800 text-xs space-y-1.5 text-emerald-900 dark:text-emerald-200">
              <div className="flex items-center gap-1.5">
                K: 30 cm ➔ 36 cm (<MathText text="\frac{6}{30} = +20%" />)
              </div>
              <div className="font-bold flex items-center gap-1.5">
                T: 50 cm² ➔ 72 cm² (<MathText text="\frac{22}{50} = +44%" />!)
              </div>
            </div>
            <p className="text-[10px] text-slate-500 mt-1">A terület 1,2 · 1,2 = 1,44-szeresére nőtt!</p>
          </TheoryCard>

          <TheoryCard
            title="Derékszögű háromszög (Mf. 5. feladat)"
            icon={<Clock className="w-5 h-5 text-indigo-500" />}
            variant="indigo"
          >
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-2">
              Egyik hegyesszöge <strong>27°</strong>. Másik hegyesszöge: 90° - 27° = <strong>63°</strong>.
            </p>
            <div className="p-2.5 bg-indigo-50 dark:bg-indigo-950/40 rounded-lg border border-indigo-200 dark:border-indigo-800 text-xs space-y-1.5 text-indigo-900 dark:text-indigo-200">
              <div className="flex items-center gap-1.5">
                Derékszöghöz (90°): <MathText text="\frac{27}{90} = 30%" />
              </div>
              <div className="font-bold flex items-center gap-1.5">
                Másik szöghöz (63°): <MathText text="\frac{27}{63} \approx 42{,}86%" />
              </div>
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 5. SZAKASZ: Tipikus hibák és vizsgacsapdák */}
      <TheorySection number={5} title="Tipikus hibák és vizsgacsapdák">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryTrapBox
            title="1. Csapda: Mértékegységek egyeztetésének elmulasztása"
            problem="Hány százaléka 20 perc a 30 másodpercnek? (Tk. 5. feladat g)"
            trap="Hibás számítás: 20 : 30 = 2/3 ≈ 66,7%."
            solution="Mindkettőt át kell váltani másodpercbe! 20 perc = 1200 másodperc. Így 1200 : 30 = 40-szerese, vagyis 4000%!"
          />

          <TheoryTrapBox
            title="2. Csapda: A fordított arány felírása (Alap felcserélése)"
            problem="85-nek a 17 hány százaléka? (Tk. 5. feladat b)"
            trap="Hibás felírás: 85 : 17 = 5, tehát 500%."
            solution="A '85-nek' a rag mutatja, hogy 85 az ALAP, és a 17 a részérték! 17 : 85 = 1/5 = 20%."
          />

          <TheoryTrapBox
            title="3. Csapda: Az új állapot és a növekedés összekeverése"
            problem="A tej ára 290 Ft-ról 430 Ft-ra nőtt. Hány százalékos az áremelkedés?"
            trap="Azt válaszolni, hogy 148%-os az áremelkedés."
            solution="Az új ár a réginek 148%-a, de az ÁREMELKEDÉS MÉRTÉKE 148% - 100% = 48% (vagy: különbség 140 Ft / 290 Ft ≈ 48%)!"
          />

          <TheoryTrapBox
            title="4. Csapda: Az eladás utáni maradék százalék keresése"
            problem="Egy 440 km-es útból 176 km-t tettünk meg. Az út hány százaléka van MÉG HÁTRA?"
            trap="Kiszámolni, hogy 176 / 440 = 40%, és ezt beírni válasznak."
            solution="A 40% a MEGTETT út! A kérdés a HÁTRALÉVŐ út volt: 100% - 40% = 60% (vagy 264 / 440 = 60%)!"
          />
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default WhatPercentTheory;
