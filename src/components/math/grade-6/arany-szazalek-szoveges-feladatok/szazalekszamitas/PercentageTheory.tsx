import React, { useState } from 'react';
import { TheoryTemplate, TheorySection, MathText } from '../TheoryTemplate';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import {
  Percent,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  Calculator,
  Grid,
  TrendingUp,
  Target,
  BarChart2
} from 'lucide-react';

interface PercentageTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

export const PercentageTheory: React.FC<PercentageTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // Százaléklabor állapota
  const [calcMode, setCalcMode] = useState<'calc_value' | 'calc_rate' | 'calc_base'>('calc_value');
  const [baseValue, setBaseValue] = useState<number>(200);
  const [ratePercent, setRatePercent] = useState<number>(25);
  const [valueGiven, setValueGiven] = useState<number>(50);

  // Számítások
  // 1. Százalékérték kiszámítása: é = a * (p / 100)
  const onePercentOfBase = baseValue / 100;
  const calculatedValue = Math.round(onePercentOfBase * ratePercent * 10) / 10;

  // 2. Százalékláb kiszámítása: p = (é / a) * 100
  const calculatedRate = baseValue > 0 ? Math.round((valueGiven / baseValue) * 100) : 0;

  // 3. Százalékalap visszaszámolása: a = é / (p / 100)
  const onePercentFromGiven = ratePercent > 0 ? valueGiven / ratePercent : 0;
  const calculatedBase = Math.round(onePercentFromGiven * 100);

  const sections: TheorySection[] = [
    {
      id: 'szazalek-fogalma',
      title: 'A százalék fogalma és a 3 alapmennyiség',
      badge: 'Alapfogalmak',
      content: (
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            A százalék (jele: <strong>%</strong>) nem más, mint a <strong>századrész</strong> egy másik elnevezése. 
            Amikor azt mondjuk, hogy egy mennyiség 1%-a, az azt jelenti: a teljes mennyiség egy századrésze ($1/100 = 0,01$).
          </p>

          {/* Kiemelt képlet kártya */}
          <div className="p-4 sm:p-5 rounded-2xl border-2 border-rose-300 dark:border-rose-800 bg-gradient-to-r from-rose-50 via-pink-50/50 to-rose-50 dark:from-rose-950/40 dark:via-slate-900 dark:to-rose-950/30 text-center space-y-2 shadow-xs">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-rose-100 text-rose-800 dark:bg-rose-900/60 dark:text-rose-300 border border-rose-200 dark:border-rose-700">
              <Sparkles className="w-3 h-3 text-rose-600" /> A százalékszámítás alapképlete
            </span>
            <div className="text-lg sm:text-2xl font-mono font-black text-rose-950 dark:text-rose-100 tracking-wide">
              Százalékérték (é) = Százalékalap (a) · (p / 100)
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 max-w-lg mx-auto">
              A százalékos feladatok a törtrész-számítás speciális esetei, ahol a nevező mindig fixen <strong>100</strong>.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-xs">
            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1.5">
              <span className="font-bold text-rose-700 dark:text-rose-400 block uppercase tracking-wider text-[11px]">
                1. Százalékalap (a)
              </span>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                A kiinduló egész mennyiség, ami a <strong>100%</strong>-ot képviseli. Pl. egy áru eredeti ára (12 000 Ft).
              </p>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1.5">
              <span className="font-bold text-pink-700 dark:text-pink-400 block uppercase tracking-wider text-[11px]">
                2. Százalékláb (p%)
              </span>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Megmutatja, hogy az alap hány századáról van szó. Mindig a % jel kíséri. Pl. <strong>25%</strong>.
              </p>
            </div>

            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1.5">
              <span className="font-bold text-emerald-700 dark:text-emerald-400 block uppercase tracking-wider text-[11px]">
                3. Százalékérték (é)
              </span>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                A százaléklábnak megfelelő tényleges részmennyiség mértékegységgel. Pl. 25% kedvezmény = <strong>3000 Ft</strong>.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'szazalekertek-szamitasa',
      title: 'A százalékérték kiszámítása',
      badge: 'Szorzás',
      content: (
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            Ha ismerjük a teljes egészet ($a$) és a százalékot ($p\%$), a százalékértéket kétféleképpen is kiszámolhatjuk:
          </p>

          <div className="p-4 rounded-xl border border-rose-200 dark:border-rose-900/50 bg-rose-50/50 dark:bg-rose-950/20 text-xs space-y-3">
            <div className="font-bold text-rose-950 dark:text-rose-200 uppercase tracking-wide flex items-center gap-1.5">
              <Calculator className="w-4 h-4 text-rose-600" /> Mintapélda: Mennyi 400 Ft-nak a 15%-a?
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-rose-200 dark:border-rose-800 space-y-1">
                <span className="font-bold text-slate-800 dark:text-slate-200">A módszer: Következtetés (1%-ra)</span>
                <p className="text-slate-600 dark:text-slate-400">
                  1. Kiszámoljuk az 1%-ot: 400 : 100 = 4 Ft.
                </p>
                <div className="font-mono font-bold text-rose-700 dark:text-rose-300">
                  2. Megszorozzuk 15-tel: 4 · 15 = 60 Ft.
                </div>
              </div>

              <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-rose-200 dark:border-rose-800 space-y-1">
                <span className="font-bold text-slate-800 dark:text-slate-200">B módszer: Tizedestörttel szorzás</span>
                <p className="text-slate-600 dark:text-slate-400">
                  15% tizedestört alakja: 0,15.
                </p>
                <div className="font-mono font-bold text-pink-700 dark:text-pink-300">
                  Szorzunk vele: 400 · 0,15 = 60 Ft.
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'szazalekalap-szamitasa',
      title: 'A százalékalap visszaszámolása',
      badge: 'Visszaszámolás',
      content: (
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            Ha a megadott százalékhoz tartozó értéket ($é$) ismerjük, az egész kiinduló mennyiséget ($a = 100\%$) keressük:
          </p>

          <div className="p-4 rounded-xl border border-emerald-200 dark:border-emerald-900/50 bg-emerald-50/50 dark:bg-emerald-950/20 text-xs space-y-3">
            <div className="font-bold text-emerald-950 dark:text-emerald-200 uppercase tracking-wide flex items-center gap-1.5">
              <Lightbulb className="w-4 h-4 text-emerald-600" /> Mintapélda: Melyik összegnek a 20%-a a 600 Ft?
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-emerald-200 dark:border-emerald-800 space-y-1">
                <span className="font-bold text-slate-800 dark:text-slate-200">1. lépés: 1% kiszámítása</span>
                <p className="text-slate-600 dark:text-slate-400">
                  Elosztjuk a százaléklábbal: 600 : 20 = 30 Ft (ez az 1%).
                </p>
              </div>

              <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-emerald-200 dark:border-emerald-800 space-y-1">
                <span className="font-bold text-slate-800 dark:text-slate-200">2. lépés: A 100% kiszámítása</span>
                <p className="text-slate-600 dark:text-slate-400">
                  Megszorozzuk 100-zal: 30 · 100 = 3000 Ft (az alap).
                </p>
              </div>
            </div>

            <div className="font-mono text-center font-bold text-emerald-900 dark:text-emerald-200 bg-white dark:bg-slate-900 p-2.5 rounded-lg border border-emerald-200 dark:border-emerald-800">
              Képlettel: Alap = Érték : (p / 100) = 600 : 0,20 = 3000 Ft
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'szazaleklab-szamitasa',
      title: 'A százalékláb kiszámítása (Hány százalék?)',
      badge: 'Arány %-ban',
      content: (
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            Ha arra vagyunk kíváncsiak, hogy egy részmennyiség a teljes egész hány százaléka, 
            a <strong>százalékérték és a százalékalap hányadosát</strong> szorozzuk meg 100%-kal:
          </p>

          <div className="p-4 rounded-xl border border-sky-200 dark:border-sky-900/50 bg-sky-50/50 dark:bg-sky-950/20 text-xs space-y-2">
            <span className="font-bold text-sky-900 dark:text-sky-200 block uppercase tracking-wide">
              Képlet: Százalékláb (p%) = (Érték / Alap) · 100%
            </span>
            <p className="text-slate-700 dark:text-slate-300">
              <strong>Példa:</strong> Egy 40 fős csoportból 14-en jelentkeztek versenyre. A csoport hány százaléka versenyez?
            </p>
            <div className="font-mono font-bold text-sky-800 dark:text-sky-300 bg-white dark:bg-slate-900 p-2.5 rounded border border-sky-200 dark:border-sky-800 text-center">
              p% = (14 / 40) · 100% = 0,35 · 100% = 35%
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'fontos-atvaltasok',
      title: 'Gyakori törtek és százalékok fejből tudandó párjai',
      badge: 'Alapvető táblázat',
      content: (
        <div className="space-y-3">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            Ezeket a gyakori átváltásokat érdemes azonnal felismerni a gyors számoláshoz:
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs text-center font-mono">
            <div className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <span className="text-slate-500 block text-[10px]">Fele</span>
              <span className="text-sm font-black text-rose-600">1/2 = 50%</span>
            </div>
            <div className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <span className="text-slate-500 block text-[10px]">Negyede</span>
              <span className="text-sm font-black text-rose-600">1/4 = 25%</span>
            </div>
            <div className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <span className="text-slate-500 block text-[10px]">Háromnegyede</span>
              <span className="text-sm font-black text-rose-600">3/4 = 75%</span>
            </div>
            <div className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <span className="text-slate-500 block text-[10px]">Ötöde</span>
              <span className="text-sm font-black text-rose-600">1/5 = 20%</span>
            </div>
            <div className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <span className="text-slate-500 block text-[10px]">Kétötöde</span>
              <span className="text-sm font-black text-rose-600">2/5 = 40%</span>
            </div>
            <div className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <span className="text-slate-500 block text-[10px]">Tizede</span>
              <span className="text-sm font-black text-rose-600">1/10 = 10%</span>
            </div>
            <div className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <span className="text-slate-500 block text-[10px]">Nyolcada</span>
              <span className="text-sm font-black text-rose-600">1/8 = 12,5%</span>
            </div>
            <div className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <span className="text-slate-500 block text-[10px]">Teljes egész</span>
              <span className="text-sm font-black text-rose-600">1/1 = 100%</span>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <TheoryTemplate
      title="Százalékszámítás"
      subtitle="A százalék fogalma mint századrész, a százalékérték, százalékalap és százalékláb kiszámítása"
      badge="6. OSZTÁLY • IV. ARÁNY, SZÁZALÉK • 📖 TANANYAG"
      themeColor="rose"
      pdfFilename="6_osztaly_IV_szazalekszamitas_tananyag.pdf"
      quickRule={{
        label: 'A százalékszámítás aranyszabályai',
        formula: 'Érték (é) = Alap (a) · (p / 100)  ⟺  Alap (a) = Érték (é) : (p / 100)'
      }}
      practiceTitle="Készen állsz a százalékos feladványokra?"
      practiceSubtitle="Gyakorold a százalékérték, százalékláb és százalékalap kiszámítását 3 szinten!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      sections={sections}
    >
      {/* Interaktív 100-as Százaléknégyzet Laboratórium */}
      <Card className="p-4 sm:p-5 border-rose-200 dark:border-rose-900/50 bg-gradient-to-br from-rose-50/50 via-white to-pink-50/30 dark:from-slate-900 dark:to-rose-950/20 shadow-md">
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-rose-200/60 dark:border-rose-900/40 pb-3">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-lg bg-rose-500 text-white shadow-xs">
                <Grid className="w-5 h-5" />
              </span>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base">
                  Interaktív 100-as Százalék Labor
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  A 100 négyzetből álló rács minden cellája pontosan 1%-ot képvisel!
                </p>
              </div>
            </div>

            {/* Módválasztó gombok */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs">
              <button
                onClick={() => setCalcMode('calc_value')}
                className={`px-2.5 py-1 rounded font-medium transition-all ${
                  calcMode === 'calc_value'
                    ? 'bg-white dark:bg-slate-700 text-rose-700 dark:text-rose-300 shadow-2xs font-bold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                1. Érték (é) keresése
              </button>
              <button
                onClick={() => setCalcMode('calc_rate')}
                className={`px-2.5 py-1 rounded font-medium transition-all ${
                  calcMode === 'calc_rate'
                    ? 'bg-white dark:bg-slate-700 text-rose-700 dark:text-rose-300 shadow-2xs font-bold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                2. Láb (p%) keresése
              </button>
              <button
                onClick={() => setCalcMode('calc_base')}
                className={`px-2.5 py-1 rounded font-medium transition-all ${
                  calcMode === 'calc_base'
                    ? 'bg-white dark:bg-slate-700 text-rose-700 dark:text-rose-300 shadow-2xs font-bold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                3. Alap (a) keresése
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
            {/* 100-as rács megjelenítése */}
            <div className="md:col-span-6 flex flex-col items-center justify-center p-4 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-3 shadow-inner">
              <div className="w-full flex items-center justify-between text-xs font-semibold px-1">
                <span className="text-slate-600 dark:text-slate-400">
                  {calcMode === 'calc_rate' ? 'Számított százalékláb:' : 'Kijelölt százalék:'}
                </span>
                <span className="font-mono font-black text-rose-600 text-sm">
                  {calcMode === 'calc_rate' ? `${calculatedRate}%` : `${ratePercent}%`}
                </span>
              </div>

              {/* 10x10 rács */}
              <div className="grid grid-cols-10 gap-1 p-2 bg-slate-100 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700">
                {Array.from({ length: 100 }).map((_, i) => {
                  const activeCount = calcMode === 'calc_rate' ? calculatedRate : ratePercent;
                  const isFilled = i < activeCount;
                  return (
                    <div
                      key={`cell-${i}`}
                      className={`w-5 h-5 sm:w-6 sm:h-6 rounded-xs transition-colors duration-200 ${
                        isFilled
                          ? 'bg-rose-500 shadow-2xs'
                          : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700'
                      }`}
                    />
                  );
                })}
              </div>

              {/* Lépések szöveges doboz */}
              <div className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-center font-mono space-y-0.5">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Számítási levezetés
                </span>
                {calcMode === 'calc_value' && (
                  <div className="text-slate-800 dark:text-slate-200 font-bold">
                    1% = {baseValue} : 100 = {onePercentOfBase} ⟹ {ratePercent}% = {onePercentOfBase} · {ratePercent} ={' '}
                    <span className="text-rose-600">{calculatedValue}</span>
                  </div>
                )}
                {calcMode === 'calc_rate' && (
                  <div className="text-slate-800 dark:text-slate-200 font-bold">
                    Hányados: {valueGiven} / {baseValue} = {(valueGiven / baseValue).toFixed(2)} ⟹{' '}
                    <span className="text-rose-600">{calculatedRate}%</span>
                  </div>
                )}
                {calcMode === 'calc_base' && (
                  <div className="text-slate-800 dark:text-slate-200 font-bold">
                    1% = {valueGiven} : {ratePercent} = {onePercentFromGiven.toFixed(1)} ⟹ 100% ={' '}
                    <span className="text-emerald-600">{calculatedBase}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Vezérlők */}
            <div className="md:col-span-6 space-y-3.5">
              {calcMode === 'calc_value' && (
                <>
                  <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span className="text-slate-700 dark:text-slate-300">Százalékalap (a = 100%):</span>
                      <span className="font-mono px-2 py-0.5 rounded bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 font-bold">
                        {baseValue}
                      </span>
                    </div>
                    <Slider
                      value={[baseValue]}
                      min={50}
                      max={500}
                      step={25}
                      onValueChange={(val) => setBaseValue(val[0])}
                      className="py-1"
                    />
                  </div>

                  <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span className="text-slate-700 dark:text-slate-300">Százalékláb (p%):</span>
                      <span className="font-mono px-2 py-0.5 rounded bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 font-bold">
                        {ratePercent}%
                      </span>
                    </div>
                    <Slider
                      value={[ratePercent]}
                      min={5}
                      max={100}
                      step={5}
                      onValueChange={(val) => setRatePercent(val[0])}
                      className="py-1"
                    />
                  </div>
                </>
              )}

              {calcMode === 'calc_rate' && (
                <>
                  <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span className="text-slate-700 dark:text-slate-300">Százalékalap (egész, a):</span>
                      <span className="font-mono px-2 py-0.5 rounded bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 font-bold">
                        {baseValue}
                      </span>
                    </div>
                    <Slider
                      value={[baseValue]}
                      min={50}
                      max={400}
                      step={10}
                      onValueChange={(val) => setBaseValue(val[0])}
                      className="py-1"
                    />
                  </div>

                  <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span className="text-slate-700 dark:text-slate-300">Százalékérték (rész, é):</span>
                      <span className="font-mono px-2 py-0.5 rounded bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 font-bold">
                        {valueGiven}
                      </span>
                    </div>
                    <Slider
                      value={[valueGiven]}
                      min={5}
                      max={baseValue}
                      step={5}
                      onValueChange={(val) => setValueGiven(val[0])}
                      className="py-1"
                    />
                  </div>
                </>
              )}

              {calcMode === 'calc_base' && (
                <>
                  <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span className="text-slate-700 dark:text-slate-300">Megadott százalékérték (é):</span>
                      <span className="font-mono px-2 py-0.5 rounded bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 font-bold">
                        {valueGiven}
                      </span>
                    </div>
                    <Slider
                      value={[valueGiven]}
                      min={10}
                      max={200}
                      step={5}
                      onValueChange={(val) => setValueGiven(val[0])}
                      className="py-1"
                    />
                  </div>

                  <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span className="text-slate-700 dark:text-slate-300">Százalékláb (p%):</span>
                      <span className="font-mono px-2 py-0.5 rounded bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 font-bold">
                        {ratePercent}%
                      </span>
                    </div>
                    <Slider
                      value={[ratePercent]}
                      min={5}
                      max={100}
                      step={5}
                      onValueChange={(val) => setRatePercent(val[0])}
                      className="py-1"
                    />
                  </div>
                </>
              )}

              {/* Végeredmény doboz */}
              <div className="p-3.5 rounded-xl bg-rose-50/80 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/60 text-xs space-y-1">
                <span className="font-bold text-rose-900 dark:text-rose-200 flex items-center gap-1.5 uppercase tracking-wide">
                  <CheckCircle2 className="w-3.5 h-3.5 text-rose-600" /> Végeredmény
                </span>
                <div className="font-mono text-sm text-slate-800 dark:text-slate-200">
                  {calcMode === 'calc_value' && (
                    <div>
                      {baseValue}-nak a(z) {ratePercent}%-a ={' '}
                      <strong className="text-rose-600 font-black">{calculatedValue}</strong>
                    </div>
                  )}
                  {calcMode === 'calc_rate' && (
                    <div>
                      A(z) {valueGiven} a(z) {baseValue}-nak a{' '}
                      <strong className="text-rose-600 font-black">{calculatedRate}%</strong>-a
                    </div>
                  )}
                  {calcMode === 'calc_base' && (
                    <div>
                      A szám, aminek a(z) {ratePercent}%-a {valueGiven} ={' '}
                      <strong className="text-emerald-600 font-black">{calculatedBase}</strong> (100%)
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </TheoryTemplate>
  );
};

export default PercentageTheory;
