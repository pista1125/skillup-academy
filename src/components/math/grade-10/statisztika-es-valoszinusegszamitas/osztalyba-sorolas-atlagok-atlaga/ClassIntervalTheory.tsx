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
  BenceTrapAverageOfAveragesSvg,
  ClassIntervalHistogramSvg,
  Grade10CohortHeightSvg
} from './ClassIntervalFigures';
import {
  Sliders,
  RotateCcw,
  Sparkles,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Scale,
  Layers,
  Users
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ClassIntervalTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

export const ClassIntervalTheory: React.FC<ClassIntervalTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // --- 1. Interaktív Csoportátlag & Súlyozás Labor State ---
  const [n1, setN1] = useState<number>(2);
  const [avg1, setAvg1] = useState<number>(6.0);
  const [n2, setN2] = useState<number>(3);
  const [avg2, setAvg2] = useState<number>(3.0);

  // Számítások
  const totalCount = n1 + n2;
  const weightedSum = n1 * avg1 + n2 * avg2;
  const correctWeightedAvg = totalCount > 0 ? weightedSum / totalCount : 0;
  const naiveAvg = (avg1 + avg2) / 2;
  const errorDiff = naiveAvg - correctWeightedAvg;

  const handlePreset = (preset: 'bence' | 'gender' | 'company' | 'equal') => {
    if (preset === 'bence') {
      setN1(2);
      setAvg1(6.0);
      setN2(3);
      setAvg2(3.0);
    } else if (preset === 'gender') {
      setN1(14);
      setAvg1(176);
      setN2(18);
      setAvg2(170);
    } else if (preset === 'company') {
      setN1(32);
      setAvg1(380);
      setN2(18);
      setAvg2(320);
    } else {
      setN1(20);
      setAvg1(4.0);
      setN2(20);
      setAvg2(5.0);
    }
  };

  const handleReset = () => {
    setN1(2);
    setAvg1(6.0);
    setN2(3);
    setAvg2(3.0);
  };

  const interactiveSection = (
    <div className="bg-slate-900 text-white p-5 sm:p-7 rounded-2xl sm:rounded-3xl shadow-xl space-y-6 border border-indigo-800/50">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-indigo-800/60 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-indigo-500 text-slate-950 rounded-2xl shadow-lg">
            <Scale className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-black text-indigo-100">
              Interaktív Súlyozott Átlag &amp; Csoportátlag Labor
            </h3>
            <p className="text-xs text-indigo-300/80">
              Vizsgáld meg, miért hibás az átlagok egyszerű átlagolása, ha a létszámok különböznek!
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          <Button
            size="sm"
            variant="outline"
            className="text-xs h-8 bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-indigo-900"
            onClick={() => handlePreset('bence')}
          >
            Bence példája (2 és 3 db)
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="text-xs h-8 bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-indigo-900"
            onClick={() => handlePreset('gender')}
          >
            Fiúk / Lányok magasság
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="text-xs h-8 bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-indigo-900"
            onClick={() => handlePreset('company')}
          >
            Céges korosztályok
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="text-xs h-8 bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-indigo-900"
            onClick={() => handlePreset('equal')}
          >
            Egyenlő létszámok
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="text-xs h-8 text-indigo-300 hover:text-white"
            onClick={handleReset}
          >
            <RotateCcw className="w-3.5 h-3.5 mr-1" /> Alaphelyzet
          </Button>
        </div>
      </div>

      {/* Csúszkák a két csoport paramétereihez */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* 1. Csoport */}
        <div className="bg-slate-800/70 p-4 rounded-2xl border border-blue-700/40 space-y-3">
          <div className="flex justify-between items-center text-xs font-bold text-blue-400">
            <span>1. Csoport</span>
            <span className="font-mono">n₁ = {n1} fő | x̄₁ = {avg1}</span>
          </div>

          <div>
            <div className="flex justify-between text-xs text-slate-300 mb-1">
              <span>Létszám (n₁): {n1} db</span>
            </div>
            <input
              type="range"
              min="1"
              max="50"
              value={n1}
              onChange={(e) => setN1(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs text-slate-300 mb-1">
              <span>Csoportátlag (x̄₁): {avg1}</span>
            </div>
            <input
              type="range"
              min="1"
              max="400"
              step="1"
              value={avg1}
              onChange={(e) => setAvg1(parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
          </div>
        </div>

        {/* 2. Csoport */}
        <div className="bg-slate-800/70 p-4 rounded-2xl border border-indigo-700/40 space-y-3">
          <div className="flex justify-between items-center text-xs font-bold text-indigo-400">
            <span>2. Csoport</span>
            <span className="font-mono">n₂ = {n2} fő | x̄₂ = {avg2}</span>
          </div>

          <div>
            <div className="flex justify-between text-xs text-slate-300 mb-1">
              <span>Létszám (n₂): {n2} db</span>
            </div>
            <input
              type="range"
              min="1"
              max="50"
              value={n2}
              onChange={(e) => setN2(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs text-slate-300 mb-1">
              <span>Csoportátlag (x̄₂): {avg2}</span>
            </div>
            <input
              type="range"
              min="1"
              max="400"
              step="1"
              value={avg2}
              onChange={(e) => setAvg2(parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
          </div>
        </div>
      </div>

      {/* Eredmények összehasonlító kártyái */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        {/* Hibás egyszerű átlag */}
        <div className="bg-rose-950/40 border border-rose-600/40 p-3.5 rounded-xl space-y-1">
          <div className="text-[11px] font-bold text-rose-400 uppercase">❌ Hibás egyszerű átlag</div>
          <div className="text-2xl font-black text-rose-200">{naiveAvg.toFixed(2)}</div>
          <div className="text-[10px] text-slate-400">({avg1} + {avg2}) / 2 (súlyozatlan)</div>
        </div>

        {/* Helyes súlyozott átlag */}
        <div className="bg-emerald-950/40 border border-emerald-600/40 p-3.5 rounded-xl space-y-1">
          <div className="text-[11px] font-bold text-emerald-400 uppercase">✅ Helyes súlyozott átlag</div>
          <div className="text-2xl font-black text-emerald-200">{correctWeightedAvg.toFixed(2)}</div>
          <div className="text-[10px] text-slate-400">({n1}·{avg1} + {n2}·{avg2}) / {totalCount}</div>
        </div>

        {/* Eltérés / Hiba mértéke */}
        <div className="bg-slate-800/80 border border-slate-700 p-3.5 rounded-xl space-y-1">
          <div className="text-[11px] font-bold text-amber-400 uppercase">Hiba mértéke (eltérés)</div>
          <div className={`text-2xl font-black ${Math.abs(errorDiff) < 0.001 ? 'text-emerald-400' : 'text-amber-300'}`}>
            {Math.abs(errorDiff) < 0.001 ? '0,00 (Nincs hiba)' : `${errorDiff > 0 ? '+' : ''}${errorDiff.toFixed(2)}`}
          </div>
          <div className="text-[10px] text-slate-400">
            {n1 === n2 ? 'Egyenlő létszámnál egybeesnek!' : 'Különböző létszám miatt torzít!'}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <TheoryTemplate
      title="Osztályba sorolás, átlagok átlaga"
      subtitle="Folytonos adatok csoportosítása osztályközökbe, osztályközepekkel történő közelítés és a csoportátlagok helyes összevonása"
      badge="10. OSZTÁLY • STATISZTIKA ÉS VALÓSZÍNŰSÉGSZÁMÍTÁS"
      themeColor="indigo"
      documentId="grade10-class-interval-theory"
      quickRule={{
        label: 'FONTOS SZABÁLYOK: OSZTÁLYBA SOROLÁS ÉS ÁTLAGOK',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-200 text-xs sm:text-sm">
            <div className="bg-indigo-50/90 dark:bg-indigo-950/40 p-2.5 rounded-xl border border-indigo-200 dark:border-indigo-800">
              <span className="font-black text-indigo-900 dark:text-indigo-300 block mb-1">
                Alapképletek és törvényszerűségek:
              </span>
              <ul className="space-y-1 text-slate-700 dark:text-slate-300 font-medium">
                <li>• <strong>Osztályközép:</strong> <MathText>{'$x_{\\text{közép}} = \\frac{a + b}{2}$'}</MathText> (alsó és felső határ átlaga)</li>
                <li>• <strong>Osztályozott átlag:</strong> <MathText>{'$\\bar{x} \\approx \\frac{\\sum f_i \\cdot x_{\\text{közép}, i}}{\\sum f_i}$'}</MathText> (súlyozott összeg)</li>
                <li>• <strong>Átlagok átlaga:</strong> <MathText>{'$\\bar{x}_{\\text{összes}} = \\frac{n_1 \\bar{x}_1 + n_2 \\bar{x}_2 + \\dots + n_k \\bar{x}_k}{n_1 + n_2 + \\dots + n_k}$'}</MathText></li>
              </ul>
            </div>
            <div className="bg-rose-50 dark:bg-rose-950/40 p-2 rounded-lg border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-300 text-[11px] leading-tight">
              <strong>⚠️ TÍPUSHIBA:</strong> Csoportátlagokat <MathText>{'$\\frac{\\bar{x}_1 + \\bar{x}_2}{2}$'}</MathText> módon CSAK akkor szabad átlagolni, ha a létszámok pontosan megegyeznek (<MathText>{'$n_1 = n_2$'}</MathText>)! Eltérő létszám esetén az egyszerű átlagolás HIBÁS.
            </div>
          </div>
        )
      }}
      interactiveSection={interactiveSection}
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      practiceTitle="Gyakorold az osztályba sorolást és az átlagok összevonását!"
      practiceSubtitle="Oldd meg a 30 válogatott kompetencia- és érettségi szintű feladatot!"
      practiceButtonText="Kvíz indítása"
      tips={[
        {
          title: 'A diszjunktivitás aranyszabálya',
          content: 'Az osztályba soroláskor minden adatnak pontosan egyetlen osztályba kell tartoznia. Nem lehet átfedés és nem maradhat ki egyetlen adat sem.'
        },
        {
          title: 'Miért pont osztályközép?',
          content: 'Feltételezzük, hogy az osztályba eső adatok egyenletesen oszlanak el az intervallumban, így az osztályközép jó reprezentánsa az egész csoportnak.'
        },
        {
          title: 'Kosárlabda dobószázalék csapda',
          content: 'A játékosok egyéni százalékainak átlaga sosem adja meg a csapat dobószázalékát! Mindig az összes bedobott labdát kell osztani az összes dobási kísérlettel.'
        }
      ]}
    >
      {/* KIEMELT FONTOS SZABÁLYOK SZEKCIÓ A TANANYAG ELEJÉN */}
      <div className="bg-gradient-to-r from-indigo-50 via-purple-50 to-blue-50 dark:from-indigo-950/40 dark:via-purple-950/30 dark:to-blue-950/30 rounded-2xl sm:rounded-3xl p-5 sm:p-7 border-2 border-indigo-300/80 dark:border-indigo-800 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-indigo-200/80 dark:border-indigo-800/80 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 sm:p-3 bg-indigo-600 text-white rounded-2xl shadow-md">
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-indigo-100 dark:bg-indigo-900/60 text-indigo-800 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-700 mb-1">
                SZABÁLYTÁR &amp; MEMÓRIAPANELL
              </div>
              <h2 className="text-lg sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                Fontos szabályok a csoportosításhoz és átlagoláshoz
              </h2>
            </div>
          </div>
          <span className="text-xs font-semibold text-indigo-700 dark:text-indigo-300 bg-indigo-100/80 dark:bg-indigo-900/40 px-3 py-1.5 rounded-xl border border-indigo-200 dark:border-indigo-800 self-start sm:self-auto">
            5 aranyszabály minden érettségi feladathoz
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
          {/* 1. Szabály */}
          <div className="bg-white dark:bg-slate-900/90 p-4 rounded-2xl border border-indigo-200 dark:border-indigo-800/60 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-lg bg-indigo-100 dark:bg-indigo-900/60 text-indigo-800 dark:text-indigo-300 font-black text-xs flex items-center justify-center">1</span>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">Az osztályba sorolás elve</h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Minden adatnak <b>pontosan egyetlen</b> osztályba kell kerülnie: a határokat úgy kell megválasztani, hogy ne legyen se átfedés, se hézag.
              </p>
              <div className="my-2 p-2 bg-indigo-50 dark:bg-indigo-950/50 rounded-xl text-center font-bold text-indigo-800 dark:text-indigo-300 text-xs sm:text-sm border border-indigo-100 dark:border-indigo-800">
                <MathText>{'\\text{Minden elem } x_i \\in \\text{pontosan egy } [a_k; b_k['}</MathText>
              </div>
            </div>
            <p className="text-[11px] text-indigo-700 dark:text-indigo-400 font-medium mt-1">
              💡 A határra eső értékek hovatartozását mindig egyértelműen rögzíteni kell!
            </p>
          </div>

          {/* 2. Szabály */}
          <div className="bg-white dark:bg-slate-900/90 p-4 rounded-2xl border border-purple-200 dark:border-purple-800/60 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-lg bg-purple-100 dark:bg-purple-900/60 text-purple-800 dark:text-purple-300 font-black text-xs flex items-center justify-center">2</span>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">Az osztályközép képlete</h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Az osztályközép az adott osztály alsó (<MathText>{'$a$'}</MathText>) és felső (<MathText>{'$b$'}</MathText>) határának egyszerű számtani közepe:
              </p>
              <div className="my-2 p-2 bg-purple-50 dark:bg-purple-950/50 rounded-xl text-center font-bold text-purple-800 dark:text-purple-300 text-xs sm:text-sm border border-purple-100 dark:border-purple-800">
                <MathText>{'x_{\\text{közép}} = \\frac{a + b}{2}'}</MathText>
              </div>
            </div>
            <p className="text-[11px] text-purple-700 dark:text-purple-400 font-medium mt-1">
              💡 Példa: a [1000; 1050] óra osztályközepe 1025 óra.
            </p>
          </div>

          {/* 3. Szabály */}
          <div className="bg-white dark:bg-slate-900/90 p-4 rounded-2xl border border-rose-200 dark:border-rose-800/60 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-lg bg-rose-100 dark:bg-rose-900/60 text-rose-800 dark:text-rose-300 font-black text-xs flex items-center justify-center">3</span>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">Az „Átlagok átlaga” csapda</h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Részcsoportok átlagait <b>tilos egyszerűen összeadni és elosztani</b>, ha a csoportok létszáma nem egyenlő!
              </p>
              <div className="my-2 p-2 bg-rose-50 dark:bg-rose-950/50 rounded-xl text-center font-bold text-rose-800 dark:text-rose-300 text-xs sm:text-sm border border-rose-100 dark:border-rose-800">
                <MathText>{'\\frac{\\bar{x}_1 + \\bar{x}_2}{2} \\ne \\bar{x}_{\\text{összes}} \\quad (\\text{ha } n_1 \\ne n_2!)'}</MathText>
              </div>
            </div>
            <p className="text-[11px] text-rose-700 dark:text-rose-400 font-medium mt-1">
              ⚠️ Mindig a létszámokkal kell súlyozni a csoportátlagokat!
            </p>
          </div>

          {/* 4. Szabály */}
          <div className="bg-white dark:bg-slate-900/90 p-4 rounded-2xl border border-emerald-200 dark:border-emerald-800/60 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-lg bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 font-black text-xs flex items-center justify-center">4</span>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">Súlyozott átlag képlete</h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Az összesített átlagot úgy kapjuk meg, hogy a részcsoportok összegeit adjuk össze, és osztjuk az összlétszámmal:
              </p>
              <div className="my-2 p-2 bg-emerald-50 dark:bg-emerald-950/50 rounded-xl text-center font-bold text-emerald-800 dark:text-emerald-300 text-xs sm:text-sm border border-emerald-100 dark:border-emerald-800">
                <MathText>{'\\bar{x}_{\\text{összes}} = \\frac{n_1 \\bar{x}_1 + n_2 \\bar{x}_2 + \\dots + n_k \\bar{x}_k}{n_1 + n_2 + \\dots + n_k}'}</MathText>
              </div>
            </div>
            <p className="text-[11px] text-emerald-700 dark:text-emerald-400 font-medium mt-1">
              💡 A nagyobb létszámú csoport erősebben befolyásolja a végeredményt!
            </p>
          </div>

          {/* 5. Szabály */}
          <div className="bg-white dark:bg-slate-900/90 p-4 rounded-2xl border border-amber-200 dark:border-amber-800/60 shadow-xs flex flex-col justify-between md:col-span-2 lg:col-span-2">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-lg bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-300 font-black text-xs flex items-center justify-center">5</span>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">Csalóka átlagos érvelések leleplezése</h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Gyakori tévedés: <i>„Mivel egy dolgozatban van 1-es, 2-es, 3-as, 4-es és 5-ös is, az átlag biztosan 3, mert (1+2+3+4+5)/5 = 3.”</i>
              </p>
              <div className="my-2 p-2.5 bg-amber-50 dark:bg-amber-950/50 rounded-xl text-amber-900 dark:text-amber-200 text-xs space-y-1 border border-amber-200 dark:border-amber-800">
                <div>• Ez csak akkor lenne igaz, ha <b>minden jegyből pontosan ugyanannyi darab</b> született volna!</div>
                <div>• Ha 20 diákból 18-an ötöst és 2-en egyest írtak, az átlag nem 3, hanem <MathText>{'$\\frac{18\\cdot 5 + 2\\cdot 1}{20} = \\frac{92}{20} = \\mathbf{4,6}$'}</MathText>!</div>
              </div>
            </div>
            <p className="text-[11px] text-amber-700 dark:text-amber-400 font-semibold mt-1">
              🎯 Mindig vedd figyelembe a darabszámokat (súlyokat)!
            </p>
          </div>
        </div>
      </div>

      {/* 1. SZEKCIÓ: AZ OSZTÁLYBA SOROLÁS ÉS OSZTÁLYKÖZEPEK */}
      <TheorySection
        title="1. Miért és hogyan csoportosítunk? Az osztályközök és osztályközepek"
        subtitle="Nagy adathalmazok átláthatóvá tétele és a diszjunktivitás követelménye"
        badge="CSOPORTOSÍTÁS"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7 space-y-4 text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
            <p>
              Gondoljunk egy 150 000 fős város lakosságára vagy egy gyárban készülő több tízezer alkatrész élettartamára. Lehetetlen és felesleges lenne minden egyes ember pontos életkorát egyenként lejegyezni és kezelni. Ilyenkor a statisztika az adatokat <b>osztályokba (intervallumokba) sorolja</b>.
            </p>

            <TheoryCard title="A tankönyvi városi életkor példa (152 ezer lakos)" accentColor="indigo">
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-2">
                A lakosokat 8 életkori osztályba sorolták: 0–9, 10–19, 20–29, 30–39, 40–49, 50–59, 60–69 és 70–93 év közöttiek.
              </p>
              <div className="p-3 bg-indigo-50 dark:bg-indigo-950/40 rounded-xl text-xs sm:text-sm space-y-1.5 border border-indigo-200 dark:border-indigo-800">
                <div>• <b>Osztályközép:</b> Mivel az egyes lakosok pontos életkorát nem ismerjük, minden osztályt a határainak számtani közepével reprezentálunk.</div>
                <div>• Az 1. osztály (0–9 év) közepe: <MathText>{'$\\frac{0 + 9}{2} = \\mathbf{4,5\\text{ év}}$'}</MathText>.</div>
                <div>• A 2. osztály (10–19 év) közepe: <MathText>{'$\\frac{10 + 19}{2} = \\mathbf{14,5\\text{ év}}$'}</MathText>.</div>
                <div>• A 8. osztály (70–93 év) közepe: <MathText>{'$\\frac{70 + 93}{2} = \\mathbf{81,5\\text{ év}}$'}</MathText>.</div>
                <div className="pt-1.5 border-t border-indigo-200 text-indigo-900 dark:text-indigo-300 font-medium">
                  A város lakóinak becsült átlagéletkora a súlyozott számtani középből: <MathText>{'$\\bar{x} = \\frac{6207}{152} \\approx \\mathbf{40,8\\text{ év}}$'}</MathText>.
                </div>
              </div>
            </TheoryCard>
          </div>

          <div className="lg:col-span-5 flex flex-col items-center">
            <ClassIntervalHistogramSvg />
            <span className="text-[11px] text-slate-500 mt-2 text-center">
              1. Ábra: Izzók élettartamának osztályba sorolása és osztályközepei
            </span>
          </div>
        </div>
      </TheorySection>

      {/* 2. SZEKCIÓ: BENCE HÁZI FELADATA */}
      <TheorySection
        title="2. Bence házi feladata: Az „átlagok átlaga” típushiba"
        subtitle="Hogyan vezeti tévútra a fejszámolót a csoportlétszámok figyelmen kívül hagyása?"
        badge="TÍPUSHIBÁK"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-5 flex flex-col items-center">
            <BenceTrapAverageOfAveragesSvg />
            <span className="text-[11px] text-slate-500 mt-2 text-center">
              2. Ábra: Bence hibás átlaga (4,5) és a helyes súlyozott átlag (4,2)
            </span>
          </div>

          <div className="lg:col-span-7 space-y-4 text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
            <p>
              A tankönyv egyik legfontosabb mintapéldájában Bencének ki kellett számítania az <MathText>{'\\{5, 7, 2, 3, 4\\}'}</MathText> számok átlagát. Bence így próbált gyorsítani:
            </p>

            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2 text-xs sm:text-sm">
              <div>1. <i>„Az 5 és a 7 átlaga 6 (mert (5+7)/2 = 6).”</i></div>
              <div>2. <i>„A 2, 3, 4 számok átlaga 3 (mert (2+3+4)/3 = 3).”</i></div>
              <div>3. <i>„Tehát a teljes számsor átlaga a 6 és a 3 átlaga: (6 + 3) / 2 = 4,5.”</i></div>
              <div className="p-2 bg-rose-100/70 dark:bg-rose-950/50 rounded-lg text-rose-900 dark:text-rose-200 font-bold">
                Bence eredménye HIBÁS! Az 5 szám valódi átlaga: <MathText>{'$\\frac{5 + 7 + 2 + 3 + 4}{5} = \\frac{21}{5} = \\mathbf{4,2}$'}</MathText>.
              </div>
            </div>

            <TheoryTrapBox title="MIÉRT HIBÁZOTT BENCE?">
              Bence úgy vette, mintha a 6 és a 3 átlag mögött azonos darabszám állna. Valójában azonban a 6-os átlag csak <b>2 darab számot</b> képvisel, míg a 3-as átlag <b>3 darab számot</b>!
              <br />
              A helyes eljárás az átlagok súlyozott átlaga:
              <div className="text-center font-bold text-slate-900 dark:text-white py-1">
                <MathText>{'\\bar{x} = \\frac{2 \\cdot 6 + 3 \\cdot 3}{2 + 3} = \\frac{12 + 9}{5} = \\frac{21}{5} = \\mathbf{4,2}'}</MathText>
              </div>
            </TheoryTrapBox>
          </div>
        </div>
      </TheorySection>

      {/* 3. SZEKCIÓ: 10. ÉVFOLYAM TESTMAGASSÁG */}
      <TheorySection
        title="3. Csoportok összevonása a gyakorlatban: Évfolyamok és Cégek"
        subtitle="Hogyan számolunk évfolyamszintű vagy céges átlagot több osztályból és részlegből?"
        badge="ALKALMAZÁSOK"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7 space-y-4 text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
            <p>
              Egészségügyi vagy gazdasági statisztikákban a méréseket gyakran külön csoportonként végzik el (pl. osztályonként, nemenként vagy munkakörönként), és a vezetőség a teljes szervezet átlagára kíváncsi.
            </p>

            <TheoryCard title="Mintapélda: 10. évfolyamos szűrővizsgálat" accentColor="blue">
              <div className="space-y-2 text-xs sm:text-sm">
                <p>
                  A 10. évfolyam 4 csoportjának mérési eredményei:
                </p>
                <div className="grid grid-cols-2 gap-2 text-slate-800 dark:text-slate-200">
                  <div className="p-2 bg-blue-50 dark:bg-blue-950/40 rounded-lg">• 10.A fiúk: 14 fő, átlag: 176 cm</div>
                  <div className="p-2 bg-pink-50 dark:bg-pink-950/40 rounded-lg">• 10.A lányok: 18 fő, átlag: 170 cm</div>
                  <div className="p-2 bg-blue-50 dark:bg-blue-950/40 rounded-lg">• 10.B fiúk: 15 fő, átlag: 172 cm</div>
                  <div className="p-2 bg-pink-50 dark:bg-pink-950/40 rounded-lg">• 10.B lányok: 19 fő, átlag: 168 cm</div>
                </div>
                <div className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl space-y-1">
                  <div>• Teljes létszám: <MathText>{'$n = 14 + 18 + 15 + 19 = 66\\text{ tanuló}$'}</MathText>.</div>
                  <div>• Teljes magasságösszeg: <MathText>{'$14\\cdot 176 + 18\\cdot 170 + 15\\cdot 172 + 19\\cdot 168 = 2464 + 3060 + 2580 + 3192 = 11\\,296\\text{ cm}$'}</MathText>.</div>
                  <div className="font-bold text-indigo-700 dark:text-indigo-300 pt-1 border-t border-slate-200 dark:border-slate-700">
                    Évfolyamátlag: <MathText>{'$\\frac{11\\,296}{66} \\approx \\mathbf{171,15\\text{ cm}}$'}</MathText>.
                  </div>
                </div>
              </div>
            </TheoryCard>
          </div>

          <div className="lg:col-span-5 flex flex-col items-center">
            <Grade10CohortHeightSvg />
            <span className="text-[11px] text-slate-500 mt-2 text-center">
              3. Ábra: 4 részcsoport összegzése évfolyamszintű súlyozott átlagba
            </span>
          </div>
        </div>
      </TheorySection>

      {/* 4. SZEKCIÓ: ÉRETTSÉGI STRATÉGIÁK ÉS KOSÁRLABDA DOBÓSZÁZALÉK */}
      <TheorySection
        title="4. Érettségi típusok: Kosárlabda dobószázalék és aránykövetkeztetés"
        subtitle="Hogyan következtethetünk a létszámokra az átlagok elhelyezkedéséből?"
        badge="ÉRETTSÉGI GYAKORLAT"
      >
        <div className="space-y-4 text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Kosárlabda feladat */}
            <TheoryCard title="2014-es emelt érettségi: Kosárlabda csapat dobószázaléka" accentColor="purple">
              <p className="text-xs text-slate-600 dark:text-slate-300 mb-2">
                Hét játékos lépett pályára. Ismerjük a kísérleteik számát és egyéni dobószázalékaikat: (2 kísérlet, 50%), (3 kísérlet, 0%), (10 kísérlet, 60%), (8 kísérlet, 25%), (7 kísérlet, 43%), (6 kísérlet, 33%), (14 kísérlet, 57%).
              </p>
              <div className="p-3 bg-purple-50 dark:bg-purple-950/40 rounded-xl text-xs space-y-1.5 border border-purple-200 dark:border-purple-800">
                <div>• <b>Hibás út:</b> A hét százalék egyszerű átlaga (50 + 0 + 60 + 25 + 43 + 33 + 57) / 7 = 38,3% lenne.</div>
                <div>• <b>Helyes út:</b> Kiszámoljuk a sikeres dobások pontos számát darabonként:
                  <br />
                  <MathText>{'$2\\cdot 0,5 + 3\\cdot 0 + 10\\cdot 0,6 + 8\\cdot 0,25 + 7\\cdot 0,43 + 6\\cdot 0,33 + 14\\cdot 0,57$'}</MathText>
                  <br />
                  <MathText>{'$= 1 + 0 + 6 + 2 + 3 + 2 + 8 = 22\\text{ sikeres dobás}$'}</MathText>.
                </div>
                <div>• Összes dobási kísérlet: <MathText>{'$2 + 3 + 10 + 8 + 7 + 6 + 14 = 50\\text{ dobás}$'}</MathText>.</div>
                <div className="font-bold text-purple-800 dark:text-purple-300 pt-1 border-t border-purple-200">
                  Csapat dobószázalék: <MathText>{'$\\frac{22}{50} = 0,44 = \\mathbf{44\\%}$'}</MathText>! (Nem 38%!).
                </div>
              </div>
            </TheoryCard>

            {/* Céges korosztály aránykövetkeztetés */}
            <TheoryCard title="Létszámarány kikövetkeztetése az átlagból" accentColor="emerald">
              <p className="text-xs text-slate-600 dark:text-slate-300 mb-2">
                Egy cég dolgozóinak átlagéletkora 42,4 év. A férfiak átlaga 46,4 év, a nőké 40,2 év. Melyik nemből van több?
              </p>
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl text-xs space-y-1.5 border border-emerald-200 dark:border-emerald-800">
                <div>• Távolság a női átlagtól: <MathText>{'$42,4 - 40,2 = 2,2\\text{ év}$'}</MathText>.</div>
                <div>• Távolság a férfi átlagtól: <MathText>{'$46,4 - 42,4 = 4,0\\text{ év}$'}</MathText>.</div>
                <div>• <b>Mérlegelmélet:</b> Mivel a közös átlag sokkal közelebb van a nők átlagához (2,2 &lt; 4,0), ezért <b>női dolgozóból van több</b>!</div>
                <div className="font-bold text-emerald-800 dark:text-emerald-300 pt-1 border-t border-emerald-200">
                  A pontos arány: <MathText>{'$\\frac{N_{\\text{férfi}}}{N_{\\text{nő}}} = \\frac{2,2}{4,0} = \\frac{11}{20}$'}</MathText>.
                </div>
              </div>
            </TheoryCard>
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

