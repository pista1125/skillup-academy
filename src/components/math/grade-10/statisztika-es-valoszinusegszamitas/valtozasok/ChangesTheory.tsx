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
  AbsoluteVsRelativeSvg,
  PercentVsPercentagePointSvg,
  BaseChainIndexSvg,
  CarDepreciationChainSvg
} from './ChangesFigures';
import {
  TrendingUp,
  Percent,
  Sliders,
  RotateCcw,
  Sparkles,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Calendar,
  Layers
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ChangesTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

export const ChangesTheory: React.FC<ChangesTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // --- 1. Interaktív Változás & Viszonyszám Kalkulátor Labor State ---
  const [initialValue, setInitialValue] = useState<number>(100);
  const [percentChange1, setPercentChange1] = useState<number>(15);
  const [percentChange2, setPercentChange2] = useState<number>(-15);

  // Számítások
  const step1Multiplier = 1 + percentChange1 / 100;
  const val1 = initialValue * step1Multiplier;

  const step2Multiplier = 1 + percentChange2 / 100;
  const val2 = val1 * step2Multiplier;

  const totalMultiplier = step1Multiplier * step2Multiplier;
  const totalPercentChange = (totalMultiplier - 1) * 100;
  const absChangeTotal = val2 - initialValue;

  const handlePreset = (preset: 'bike' | 'car' | 'inflation' | 'symmetry') => {
    if (preset === 'bike') {
      setInitialValue(62);
      setPercentChange1(15);
      setPercentChange2(-15);
    } else if (preset === 'car') {
      setInitialValue(4.2);
      setPercentChange1(-20);
      setPercentChange2(-15);
    } else if (preset === 'inflation') {
      setInitialValue(100);
      setPercentChange1(10);
      setPercentChange2(10);
    } else {
      setInitialValue(100);
      setPercentChange1(20);
      setPercentChange2(-20);
    }
  };

  const interactiveSection = (
    <div className="bg-gradient-to-br from-cyan-950 via-slate-900 to-sky-950 border-2 border-cyan-500/30 rounded-3xl p-5 sm:p-7 text-white shadow-2xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-cyan-800/60 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-cyan-500 text-slate-950 rounded-2xl shadow-lg">
            <Sliders className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-black text-cyan-100">
              Interaktív Változás &amp; Bázis-eltolódás Labor
            </h3>
            <p className="text-xs text-cyan-300/80">
              Vizsgáld meg, hogyan hat két egymást követő százalékos változás a bázis eltolódása miatt!
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          <Button
            size="sm"
            variant="outline"
            className="text-xs h-8 bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-cyan-900"
            onClick={() => handlePreset('bike')}
          >
            Kerékpártúra (+15%, -15%)
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="text-xs h-8 bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-cyan-900"
            onClick={() => handlePreset('car')}
          >
            Autó értékvesztés (-20%, -15%)
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="text-xs h-8 bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-cyan-900"
            onClick={() => handlePreset('inflation')}
          >
            Kétszeri drágulás (+10%, +10%)
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Bal oldal: Csúszkák */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-slate-800/60 p-4 rounded-2xl border border-cyan-700/40 space-y-3">
            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-cyan-400">Kiindulási érték (x₀): {initialValue}</span>
                <span className="text-slate-400">Bázis</span>
              </div>
              <input
                type="range"
                min="10"
                max="200"
                step="1"
                value={initialValue}
                onChange={(e) => setInitialValue(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className={percentChange1 >= 0 ? 'text-emerald-400' : 'text-rose-400'}>
                  1. lépés változása (p₁): {percentChange1 > 0 ? `+${percentChange1}` : percentChange1}%
                </span>
                <span className="text-slate-400">Szorzó: {step1Multiplier.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="-50"
                max="50"
                step="1"
                value={percentChange1}
                onChange={(e) => setPercentChange1(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className={percentChange2 >= 0 ? 'text-emerald-400' : 'text-rose-400'}>
                  2. lépés változása (p₂): {percentChange2 > 0 ? `+${percentChange2}` : percentChange2}%
                </span>
                <span className="text-slate-400">Szorzó: {step2Multiplier.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="-50"
                max="50"
                step="1"
                value={percentChange2}
                onChange={(e) => setPercentChange2(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
              />
            </div>
          </div>

          {/* Eredményjelző kártyák */}
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700">
              <span className="text-slate-400 block text-[10px]">Kezdőérték</span>
              <b className="text-sm sm:text-base text-white">{initialValue.toFixed(2)}</b>
            </div>
            <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700">
              <span className="text-slate-400 block text-[10px]">1. lépés után (x₁)</span>
              <b className="text-sm sm:text-base text-cyan-300">{val1.toFixed(2)}</b>
            </div>
            <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700">
              <span className="text-slate-400 block text-[10px]">2. lépés után (x₂)</span>
              <b className="text-sm sm:text-base text-emerald-300">{val2.toFixed(2)}</b>
            </div>
          </div>
        </div>

        {/* Jobb oldal: Elemzés */}
        <div className="lg:col-span-6 space-y-3">
          <div className="p-4 bg-slate-950/70 border border-cyan-800/60 rounded-2xl space-y-3">
            <h4 className="text-xs font-black uppercase tracking-wider text-cyan-300">
              Változások és viszonyszámok elemzése:
            </h4>
            <div className="space-y-1.5 text-xs text-slate-300">
              <div className="flex justify-between">
                <span>1. Láncviszonyszám (L₁ = x₁ / x₀):</span>
                <b className="text-cyan-400">{step1Multiplier.toFixed(4)}</b>
              </div>
              <div className="flex justify-between">
                <span>2. Láncviszonyszám (L₂ = x₂ / x₁):</span>
                <b className="text-cyan-400">{step2Multiplier.toFixed(4)}</b>
              </div>
              <div className="flex justify-between pt-1 border-t border-slate-800">
                <span>Bázisviszonyszám (B₂ = x₂ / x₀ = L₁ · L₂):</span>
                <b className="text-emerald-400">{totalMultiplier.toFixed(4)}</b>
              </div>
              <div className="flex justify-between">
                <span>Abszolút változás (Δx = x₂ - x₀):</span>
                <b className={absChangeTotal >= 0 ? 'text-emerald-400' : 'text-rose-400'}>
                  {absChangeTotal > 0 ? `+${absChangeTotal.toFixed(2)}` : absChangeTotal.toFixed(2)}
                </b>
              </div>
              <div className="flex justify-between">
                <span>Teljes relatív változás:</span>
                <b className={totalPercentChange >= 0 ? 'text-emerald-400' : 'text-rose-400'}>
                  {totalPercentChange > 0 ? `+${totalPercentChange.toFixed(2)}` : totalPercentChange.toFixed(2)}%
                </b>
              </div>
            </div>

            {/* Aszimmetria figyelmeztető */}
            {percentChange1 === -percentChange2 && percentChange1 !== 0 && (
              <div className="p-2.5 bg-rose-950/40 border border-rose-500/40 rounded-xl text-rose-300 text-[11px] leading-relaxed">
                ⚠️ <b>Bázis-eltolódás:</b> Bár a százalékok kioltanák egymást ({percentChange1}% és {percentChange2}%), a végeredmény <b>{Math.abs(totalPercentChange).toFixed(2)}%-kal kisebb</b> az eredetinél!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <TheoryTemplate
      title="Változások"
      subtitle="Abszolút és relatív változás, bázis- és láncviszonyszámok, százalékpont és a bázis-eltolódás törvényszerűségei"
      badge="10. OSZTÁLY • STATISZTIKA ÉS VALÓSZÍNŰSÉGSZÁMÍTÁS"
      themeColor="cyan"
      documentId="grade10-changes-theory"
      quickRule={{
        label: 'FONTOS SZABÁLYOK: VÁLTOZÁSOK ÉS VISZONYSZÁMOK',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-200 text-xs sm:text-sm">
            <div className="bg-cyan-50/90 dark:bg-cyan-950/40 p-2.5 rounded-xl border border-cyan-200 dark:border-cyan-800">
              <span className="font-black text-cyan-900 dark:text-cyan-300 block mb-1">
                Alapképletek és viszonyszámok:
              </span>
              <ul className="space-y-1 text-slate-700 dark:text-slate-300 font-medium">
                <li>• <strong>Abszolút változás:</strong> <MathText>{'$\\Delta x = x_1 - x_0$'}</MathText> (mértékegységgel)</li>
                <li>• <strong>Relatív változás:</strong> <MathText>{'$\\frac{\\Delta x}{x_0} = \\frac{x_1 - x_0}{x_0}$'}</MathText> (százalékban)</li>
                <li>• <strong>Viszonyszámok kapcsolata:</strong> <MathText>{'$B_n = L_1 \\cdot L_2 \\cdots L_n$'}</MathText></li>
                <li>• <strong>Százalékpont:</strong> százalékos ráták kivonásos különbsége!</li>
              </ul>
            </div>
            <div className="bg-rose-50 dark:bg-rose-950/40 p-2 rounded-lg border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-300 text-[11px] leading-tight">
              <strong>⚠️ BÁZIS CSAPDA:</strong> <MathText>{'$+p\\%$'}</MathText> majd <MathText>{'$-p\\%$'}</MathText> változás után a végérték mindig <u>kisebb</u> a kezdőnél!
            </div>
          </div>
        )
      }}
      interactiveSection={interactiveSection}
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      practiceTitle="Teszteld a tudásodat a statisztikai változásokból!"
      practiceSubtitle="Oldd meg a 30 válogatott kompetencia-, gazdasági és érettségi típusú feladatot!"
      practiceButtonText="Változások Kvíz indítása"
      tips={[
        {
          title: 'Százalékokat soha ne adj össze!',
          content: 'Egymást követő százalékos változásoknál a szorzótényezők szorzódnak (q_össz = q₁ · q₂), a százalékok nem adhatók össze egyszerűen.'
        },
        {
          title: 'Százalékpont vs. Százalék',
          content: 'Ha a munkanélküliség 5%-ról 6%-ra nő, az +1 százalékpont, de +20%-os relatív növekedés. Mindig figyelj a feladat pontos kérdésére!'
        },
        {
          title: 'Lánc és bázis ellenőrzése',
          content: 'Bármikor kiszámolhatod a bázisviszonyszámot, ha a láncviszonyszámokat összeszorzod: B_n = L₁ · L₂ ··· L_n. Így a köztes lépések azonnal ellenőrizhetők.'
        }
      ]}
    >
      {/* KIEMELT FONTOS SZABÁLYOK SZEKCIÓ A TANANYAG ELEJÉN */}
      <div className="bg-gradient-to-r from-cyan-50 via-sky-50 to-teal-50 dark:from-cyan-950/40 dark:via-sky-950/30 dark:to-teal-950/30 rounded-2xl sm:rounded-3xl p-5 sm:p-7 border-2 border-cyan-300/80 dark:border-cyan-800 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-cyan-200/80 dark:border-cyan-800/80 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 sm:p-3 bg-cyan-600 text-white rounded-2xl shadow-md">
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-cyan-100 dark:bg-cyan-900/60 text-cyan-800 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-700 mb-1">
                SZABÁLYTÁR &amp; MEMÓRIAPANELL
              </div>
              <h2 className="text-lg sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                Fontos szabályok a változásokhoz és viszonyszámokhoz
              </h2>
            </div>
          </div>
          <span className="text-xs font-semibold text-cyan-700 dark:text-cyan-300 bg-cyan-100/80 dark:bg-cyan-900/40 px-3 py-1.5 rounded-xl border border-cyan-200 dark:border-cyan-800 self-start sm:self-auto">
            5 aranyszabály minden feladathoz
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
          {/* 1. Szabály */}
          <div className="bg-white dark:bg-slate-900/90 p-4 rounded-2xl border border-cyan-200 dark:border-cyan-800/60 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-lg bg-cyan-100 dark:bg-cyan-900/60 text-cyan-800 dark:text-cyan-300 font-black text-xs flex items-center justify-center">1</span>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">Abszolút vs. Relatív változás</h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Az <b>abszolút változás</b> különbség mértékegységgel, míg a <b>relatív változás</b> a kezdőértékhez mért arány:
              </p>
              <div className="my-2 p-2 bg-cyan-50 dark:bg-cyan-950/50 rounded-xl text-center font-bold text-cyan-800 dark:text-cyan-300 text-xs sm:text-sm border border-cyan-100 dark:border-cyan-800">
                <MathText>{'$\\Delta x = x_1 - x_0 \\quad \\text{és} \\quad \\text{relatív} = \\frac{x_1 - x_0}{x_0}$'}</MathText>
              </div>
            </div>
            <p className="text-[11px] text-cyan-700 dark:text-cyan-400 font-medium mt-1">
              💡 Abszolút változásnál +14 majd -14 visszatér; relatívnál nem!
            </p>
          </div>

          {/* 2. Szabály */}
          <div className="bg-white dark:bg-slate-900/90 p-4 rounded-2xl border border-purple-200 dark:border-purple-800/60 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-lg bg-purple-100 dark:bg-purple-900/60 text-purple-800 dark:text-purple-300 font-black text-xs flex items-center justify-center">2</span>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">Százalék vs. Százalékpont</h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Százalékos mutatók (kamat, infláció, arány) megváltozásakor a különbség <b>százalékpont</b>:
              </p>
              <div className="my-2 p-2 bg-purple-50 dark:bg-purple-950/50 rounded-xl text-center font-bold text-purple-800 dark:text-purple-300 text-xs sm:text-sm border border-purple-100 dark:border-purple-800">
                <MathText>{'4\\% \\to 5\\% \\implies +1\\text{ sz.p. (de } +25\\%\\text{ relatív!)}'}</MathText>
              </div>
            </div>
            <p className="text-[11px] text-purple-700 dark:text-purple-400 font-medium mt-1">
              💡 Soha ne téveszd össze a százalékot és a százalékpontot!
            </p>
          </div>

          {/* 3. Szabály */}
          <div className="bg-white dark:bg-slate-900/90 p-4 rounded-2xl border border-teal-200 dark:border-teal-800/60 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-lg bg-teal-100 dark:bg-teal-900/60 text-teal-800 dark:text-teal-300 font-black text-xs flex items-center justify-center">3</span>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">A viszonyszámok szorzata</h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                A közvetlenül egymást követő láncviszonyszámok szorzata megadja a bázisviszonyszámot:
              </p>
              <div className="my-2 p-2 bg-teal-50 dark:bg-teal-950/50 rounded-xl text-center font-bold text-teal-800 dark:text-teal-300 text-xs sm:text-sm border border-teal-100 dark:border-teal-800">
                <MathText>{'$B_n = \\frac{x_n}{x_0} = L_1 \\cdot L_2 \\cdots L_n$'}</MathText>
              </div>
            </div>
            <p className="text-[11px] text-teal-700 dark:text-teal-400 font-medium mt-1">
              💡 Lánc: előzőhöz; Bázis: mindig a fix kezdőértékhez viszonyít.
            </p>
          </div>

          {/* 4. Szabály */}
          <div className="bg-white dark:bg-slate-900/90 p-4 rounded-2xl border border-sky-200 dark:border-sky-800/60 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-lg bg-sky-100 dark:bg-sky-900/60 text-sky-800 dark:text-sky-300 font-black text-xs flex items-center justify-center">4</span>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">Átlagos növekedési ütem</h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Több időszak átlagos szorzótényezője a láncviszonyszámok (vagy a bázis) <b>mértani közepe</b>:
              </p>
              <div className="my-2 p-2 bg-sky-50 dark:bg-sky-950/50 rounded-xl text-center font-bold text-sky-800 dark:text-sky-300 text-xs sm:text-sm border border-sky-100 dark:border-sky-800">
                <MathText>{'$\\bar{L} = \\sqrt[n]{B_n} = \\sqrt[n]{\\frac{x_n}{x_0}}$'}</MathText>
              </div>
            </div>
            <p className="text-[11px] text-sky-700 dark:text-sky-400 font-medium mt-1">
              💡 Növekedési ütem átlagolására tilos számtani közepet használni!
            </p>
          </div>

          {/* 5. Szabály - Csapda */}
          <div className="md:col-span-2 lg:col-span-2 bg-gradient-to-r from-rose-50 to-amber-50 dark:from-rose-950/40 dark:to-amber-950/40 p-4 rounded-2xl border-2 border-rose-300/80 dark:border-rose-800 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
                <h3 className="font-black text-sm text-rose-950 dark:text-rose-200">
                  5. FONTOS CSAPDA: A bázis-eltolódás törvénye
                </h3>
              </div>
              <p className="text-xs text-rose-900 dark:text-rose-300 leading-relaxed">
                Ha egy értéket <MathText>{'$p\\%$'}</MathText>-kal növelünk, majd a kapott új értéket <MathText>{'$p\\%$'}</MathText>-kal csökkentünk, a végérték <b>mindig kisebb lesz</b> az eredetinél! A szorzó ugyanis:
                <br />
                <span className="font-bold text-rose-800 dark:text-rose-300">
                  <MathText>{'$\\left(1 + \\frac{p}{100}\\right)\\left(1 - \\frac{p}{100}\\right) = 1 - \\frac{p^2}{10000} < 1$'}</MathText>
                </span>.
              </p>
            </div>
            <div className="mt-2 pt-2 border-t border-rose-200/80 dark:border-rose-800/80 flex items-center justify-between text-[11px] font-bold text-rose-800 dark:text-rose-300">
              <span>Példa: +15% majd -15% esetén a veszteség pontosan 2,25%!</span>
              <span className="hidden sm:inline bg-rose-200/80 dark:bg-rose-900/60 px-2 py-0.5 rounded text-rose-900 dark:text-rose-200">Tipikus érettségi buktató!</span>
            </div>
          </div>
        </div>
      </div>

      {/* 1. Szekció: Abszolút és relatív változás */}
      <TheorySection
        number={1}
        title="Abszolút és relatív változás fogalma és kiszámítása"
        badge="FOGALMAK ÉS KÉPLETEK"
        badgeColor="cyan"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 space-y-4">
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              Amikor egy mennyiség értéke időben vagy térben módosul, a statisztika két alapvető módon írja le a különbséget: abszolút értékben (mennyivel?) és relatív arányban (hányszorosára, hány százalékkal?).
            </p>

            <TheoryCard
              title="A két változási mutató matematikai alakja"
              type="definition"
            >
              <div className="space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                <div>
                  <b>1. Abszolút változás (<MathText>{'$\\Delta x$'}</MathText>):</b> A két érték különbsége mértékegységgel ellátva:
                  <div className="my-1.5 p-2 bg-cyan-50 dark:bg-cyan-950/40 rounded-xl text-center font-bold text-cyan-800 dark:text-cyan-300">
                    <MathText>{'$\\Delta x = x_1 - x_0$'}</MathText>
                  </div>
                </div>
                <div>
                  <b>2. Relatív változás:</b> Az abszolút változás viszonya a kiindulási bázishoz (arányként vagy százalékban):
                  <div className="my-1.5 p-2 bg-sky-50 dark:bg-sky-950/40 rounded-xl text-center font-bold text-sky-800 dark:text-sky-300">
                    <MathText>{'\\text{Relatív változás} = \\frac{x_1 - x_0}{x_0} = \\frac{\\Delta x}{x_0} \\quad (\\cdot 100\\%)'}</MathText>
                  </div>
                </div>
              </div>
            </TheoryCard>

            <TheoryCallout title="Mintapélda a kerékpártúrából" type="example">
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                Egy kerékpáros a 4. napon <b>14 km-rel többet</b> tekert, mint a 3. napon, majd az 5. napon <b>14 km-rel kevesebbet</b>, mint a 4. napon.
                <br />
                Mivel az abszolút változás összeadódik: <MathText>{'$x_5 = x_3 + 14 - 14 = x_3$'}</MathText>, a megtett táv az 5. napon <b>pontosan megegyezik</b> a 3. napival!
              </p>
            </TheoryCallout>
          </div>

          <div className="lg:col-span-5 flex flex-col items-center justify-center p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <AbsoluteVsRelativeSvg size={270} />
            <span className="text-xs text-slate-500 dark:text-slate-400 mt-2 text-center font-medium">
              Abszolút műveleteknél (+14, -14) visszatérünk az eredetihez, százalékosnál (+15%, -15%) nem!
            </span>
          </div>
        </div>
      </TheorySection>

      {/* 2. Szekció: A bázis-eltolódás csapdája */}
      <TheorySection
        number={2}
        title="A bázis-eltolódás jelensége és a százalékos aszimmetria"
        badge="CSAPDÁK ÉS BUKTATÓK"
        badgeColor="rose"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 space-y-4">
            <TheoryTrapBox title="Miért nem térünk vissza az eredeti értékre?">
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                A gazdasági életben a legelterjedtebb tévhit: <i>„Ha valami 20%-ot drágul, majd 20%-ot olcsóbb lesz, akkor visszatért az eredeti árára.”</i> <b>Ez súlyos tévedés!</b>
                <br />
                • A második változás bázisa már a <b>megváltozott érték</b>!
                <br />
                • Egy megnövelt összeg <MathText>{'$20\\%$'}</MathText>-a jóval több forintot jelent, mint az eredeti összeg <MathText>{'$20\\%$'}</MathText>-a. Ezért a csökkentéskor nagyobb értéket vonunk le, mint amennyit korábban hozzáadtunk!
              </p>
            </TheoryTrapBox>

            <TheoryCard
              title="A tankönyvi kerékpártúra matematikai levezetése"
              type="example"
            >
              <div className="space-y-1.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                <div>• <b>1. nap:</b> <MathText>{'$62\\text{ km}$'}</MathText></div>
                <div>• <b>2. nap (+15%):</b> <MathText>{'$62 \\cdot 1,15 = 71,3\\text{ km}$'}</MathText></div>
                <div>• <b>3. nap (-15%):</b> <MathText>{'$71,3 \\cdot 0,85 = 60,605\\text{ km}$'}</MathText></div>
                <div className="font-bold text-rose-700 dark:text-rose-300 pt-1 border-t border-rose-200 dark:border-rose-800">
                  <MathText>{'$60,605 < 62\\text{ km}$'}</MathText>: A 3. napi táv kisebb lett az 1. napinál!
                  <br />
                  A veszteség szorzata: <MathText>{'$1,15 \\cdot 0,85 = 0,9775 = 1 - 0,0225$'}</MathText> (pontosan <MathText>{'$-2,25\\%$'}</MathText>!).
                </div>
              </div>
            </TheoryCard>
          </div>

          <div className="lg:col-span-5 flex flex-col items-center justify-center p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <CarDepreciationChainSvg size={270} />
            <span className="text-xs text-slate-500 dark:text-slate-400 mt-2 text-center font-medium">
              Egymást követő értékcsökkenéseknél a szorzók szorzódnak: <MathText>{'$0,80 \\cdot 0,85 = 0,68$'}</MathText>
            </span>
          </div>
        </div>
      </TheorySection>

      {/* 3. Szekció: Százalék és százalékpont */}
      <TheorySection
        number={3}
        title="Százalék és százalékpont: Mi a különbség?"
        badge="SZÁZALÉKPONT"
        badgeColor="purple"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 space-y-4">
            <TheoryCard
              title="A fogalmi elhatárolás szabálya"
              type="definition"
            >
              <div className="space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                <div>
                  <b>1. Százalékpont (sz.p.):</b> Százalékban megadott adatok (pl. kamatlábak, infláció, szavazati arányok) közötti <b>egyszerű kivonásos (abszolút) különbség</b>.
                </div>
                <div>
                  <b>2. Százalékos (relatív) változás:</b> A változás nagyságának viszonya a kezdeti százalékos értékhez.
                </div>
              </div>
            </TheoryCard>

            <TheoryCallout title="Példa: Banki kamatláb emelkedése 4%-ról 5%-ra" type="example">
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                • <b>Százalékpontban:</b> <MathText>{'$5\\% - 4\\% = +1\\text{ százalékpont}$'}</MathText>.
                <br />
                • <b>Relatív százalékban:</b> <MathText>{'$\\frac{5 - 4}{4} = \\frac{1}{4} = 0,25 = +25\\%$'}</MathText>.
                <br />
                <span className="text-purple-700 dark:text-purple-300 font-bold">
                  Tehát 1 százalékpontos kamatemelés itt 25%-os relatív törlesztőrészlet-emelkedési terhet jelenthet!
                </span>
              </p>
            </TheoryCallout>
          </div>

          <div className="lg:col-span-5 flex flex-col items-center justify-center p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <PercentVsPercentagePointSvg size={270} />
            <span className="text-xs text-slate-500 dark:text-slate-400 mt-2 text-center font-medium">
              4%-ról 5%-ra: +1 százalékpont, de +25% relatív növekedés!
            </span>
          </div>
        </div>
      </TheorySection>

      {/* 4. Szekció: Idősorok statisztikája: Bázis- és láncviszonyszámok */}
      <TheorySection
        number={4}
        title="Idősorok vizsgálata: Bázisviszonyszám és láncviszonyszám"
        badge="STATISZTIKAI IDŐSOROK"
        badgeColor="teal"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 space-y-4">
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              Gyakran vizsgálunk olyan adatokat, amelyek egymást követő években, hónapokban alakulnak ki (idősorok). A változások követésére kétféle viszonyszámot használunk:
            </p>

            <TheoryCard
              title="A két dinamikus viszonyszám definíciója"
              type="definition"
            >
              <ul className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 space-y-2 list-disc list-inside">
                <li>
                  <b>Bázisviszonyszám (<MathText>{'$B_i$'}</MathText>):</b> A vizsgált <MathText>{'$x_i$'}</MathText> adatot egy rögzített, kitüntetett bázisidőszak (<MathText>{'$x_0$'}</MathText>) adatához viszonyítjuk:
                  <div className="my-1 text-center font-bold text-teal-700 dark:text-teal-300">
                    <MathText>{'$B_i = \\frac{x_i}{x_0}$'}</MathText>
                  </div>
                </li>
                <li>
                  <b>Láncviszonyszám (<MathText>{'$L_i$'}</MathText>):</b> A vizsgált <MathText>{'$x_i$'}</MathText> adatot mindig a közvetlenül megelőző időszak (<MathText>{'$x_{i-1}$'}</MathText>) adatához viszonyítjuk:
                  <div className="my-1 text-center font-bold text-teal-700 dark:text-teal-300">
                    <MathText>{'$L_i = \\frac{x_i}{x_{i-1}}$'}</MathText>
                  </div>
                </li>
              </ul>
            </TheoryCard>

            <TheoryCard
              title="A bázis- és láncviszonyszámok alaptörvénye"
              type="theorem"
            >
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                A láncviszonyszámok szorzata megadja a megfelelő bázisviszonyszámot:
              </p>
              <div className="my-2 p-2.5 bg-teal-50 dark:bg-teal-950/40 rounded-xl text-center font-black text-teal-800 dark:text-teal-300 text-xs sm:text-sm border border-teal-200 dark:border-teal-800">
                <MathText>{'$B_n = L_1 \\cdot L_2 \\cdots L_n = \\frac{x_1}{x_0} \\cdot \\frac{x_2}{x_1} \\cdots \\frac{x_n}{x_{n-1}} = \\frac{x_n}{x_0}$'}</MathText>
              </div>
            </TheoryCard>
          </div>

          <div className="lg:col-span-5 flex flex-col items-center justify-center p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <BaseChainIndexSvg size={270} />
            <span className="text-xs text-slate-500 dark:text-slate-400 mt-2 text-center font-medium">
              A láncszemek egymás után szorzódva (<MathText>{'$\\prod L_i$'}</MathText>) kiadják az átfogó bázisviszonyszámot (<MathText>{'$B_n$'}</MathText>)
            </span>
          </div>
        </div>
      </TheorySection>

      {/* 5. Szekció: Gyakorlati és érettségi mintapéldák */}
      <TheorySection
        number={5}
        title="Gyakorlati és érettségi feladatok: Autó amortizáció és népesség"
        badge="ÉRETTSÉGI ÉS GYAKORLAT"
        badgeColor="indigo"
      >
        <div className="space-y-4">
          <TheoryCard
            title="Tankönyvi feladat: Autó értékvesztése két év alatt"
            type="example"
          >
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              Egy új autó vételára <b>4,2 millió forint</b>. Az 1. évben 20%-kal, a 2. évben újabb 15%-kal csökken az autó értéke.
            </p>
            <div className="p-3 bg-indigo-50 dark:bg-indigo-950/40 rounded-xl text-xs sm:text-sm space-y-1.5 border border-indigo-200 dark:border-indigo-800 mt-2">
              <div><b>1. Érték 1 év után:</b> <MathText>{'$4,2 \\cdot (1 - 0,20) = 4,2 \\cdot 0,80 = 3,36\\text{ millió Ft}$'}</MathText>.</div>
              <div><b>2. Érték 2 év után:</b> <MathText>{'$3,36 \\cdot (1 - 0,15) = 3,36 \\cdot 0,85 = 2,856\\text{ millió Ft}$'}</MathText>.</div>
              <div><b>3. Teljes értékvesztés:</b> A kétéves szorzó: <MathText>{'$q = 0,80 \\cdot 0,85 = 0,68$'}</MathText>.
                <br />
                A veszteség mértéke: <MathText>{'$1 - 0,68 = 0,32 = 32\\%$'}</MathText> (és NEM <MathText>{'$20\\% + 15\\% = 35\\%$'}</MathText>!).
              </div>
              <div className="font-bold text-indigo-900 dark:text-indigo-200 pt-1 border-t border-indigo-200 dark:border-indigo-700">
                Állandó évenkénti csökkenés (mértani közép): <MathText>{'$q_{\\text{átlag}} = \\sqrt{0,68} \\approx 0,8246 \\implies \\mathbf{17,54\\%}$'}</MathText> évente!
              </div>
            </div>
          </TheoryCard>

          <TheoryCard
            title="Tankönyvi feladat: Ország népességnövekedése 100 év alatt"
            type="example"
          >
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              Egy ország 5 milliós népessége 1900-tól 1950-ig <b>21%-kal nőtt</b>, majd 2000-ig újabb <b>44%-kal</b>.
            </p>
            <div className="p-3 bg-teal-50 dark:bg-teal-950/40 rounded-xl text-xs sm:text-sm space-y-1.5 border border-teal-200 dark:border-teal-800 mt-2">
              <div><b>1. Népesség 1950-ben:</b> <MathText>{'$5 \\cdot 1,21 = 6,05\\text{ millió fő}$'}</MathText>.</div>
              <div><b>2. Népesség 2000-ben:</b> <MathText>{'$6,05 \\cdot 1,44 = 8,712\\text{ millió fő}$'}</MathText>.</div>
              <div><b>3. Teljes 100 éves szorzó (bázisviszonyszám):</b> <MathText>{'$B_2 = 1,21 \\cdot 1,44 = 1,7424$'}</MathText> (+74,24% növekedés).</div>
              <div className="font-bold text-teal-900 dark:text-teal-200 pt-1 border-t border-teal-200 dark:border-teal-700">
                Átlagos 50 éves növekedési szorzó: <MathText>{'$q = \\sqrt{1,21 \\cdot 1,44} = 1,1 \\cdot 1,2 = 1,32$'}</MathText> (+32% 50 évente)!
              </div>
            </div>
          </TheoryCard>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default ChangesTheory;
