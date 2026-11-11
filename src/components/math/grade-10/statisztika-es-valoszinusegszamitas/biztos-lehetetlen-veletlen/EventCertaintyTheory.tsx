import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable,
  MathText
} from '../TheoryTemplate';
import {
  CertaintySpectrumSvg,
  VennComplementSvg,
  BeadProbabilityDistributionSvg
} from './EventCertaintyFigures';
import {
  Sparkles,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Dices,
  RotateCcw,
  Target,
  Sliders,
  Scale,
  Equal,
  Percent,
  Layers
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EventCertaintyTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

export const EventCertaintyTheory: React.FC<EventCertaintyTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // --- 1. Dinamikus Müzliszelet Laboratórium State ---
  const [addedHazelnuts, setAddedHazelnuts] = useState<number>(0);
  const baseApples = 15;
  const baseHazelnuts = 5;

  const currentHazelnuts = baseHazelnuts + addedHazelnuts;
  const currentTotalBars = baseApples + currentHazelnuts;
  const hazelnutProb = currentTotalBars > 0 ? currentHazelnuts / currentTotalBars : 0;
  const isTargetAchieved = Math.abs(hazelnutProb - 0.4) < 0.001;

  // --- 2. Golyófordító Szimulátor State (60 golyó: 24 fehér, 36 fekete) ---
  const [ballMode, setBallMode] = useState<'addWhite' | 'removeBlack'>('addWhite');
  const [addedWhiteBalls, setAddedWhiteBalls] = useState<number>(0);
  const [removedBlackBalls, setRemovedBlackBalls] = useState<number>(0);

  const currentWhiteBalls = ballMode === 'addWhite' ? 24 + addedWhiteBalls : 24;
  const currentBlackBalls = ballMode === 'removeBlack' ? Math.max(0, 36 - removedBlackBalls) : 36;
  const currentTotalBalls = currentWhiteBalls + currentBlackBalls;
  const whiteProb = currentTotalBalls > 0 ? currentWhiteBalls / currentTotalBalls : 0;
  const isWhiteTargetAchieved = Math.abs(whiteProb - 0.6) < 0.001;

  // Interaktív labor szekció JSX
  const interactiveSection = (
    <div className="bg-slate-900 text-white p-5 sm:p-7 rounded-2xl sm:rounded-3xl shadow-xl space-y-6 border border-amber-800/50">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-amber-800/60 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-amber-600 text-white rounded-2xl shadow-lg">
            <Sliders className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-black text-amber-100">
              Interaktív Valószínűségi Laboratórium
            </h3>
            <p className="text-xs text-amber-300/80">
              Kísérletezz a dinamikus arányokkal és a valószínűségi egyenletek vizuális megoldásával!
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs px-3 py-1 rounded-full bg-amber-950/60 text-amber-300 border border-amber-800/80 font-bold">
            Dinamikus arányok laborja
          </span>
        </div>
      </div>

      {/* Labor 1: A Tankönyvi Müzliszeletes Feladat */}
      <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <h4 className="font-bold text-base text-amber-200">
              1. Müzliszeletek a zacskóban: Hány mogyorósat tegyünk még hozzá?
            </h4>
            <p className="text-xs text-slate-400">
              Alaphelyzet: 15 almás és 5 mogyorós szelet (összesen 20 db). Cél: a mogyorós esélye legyen pontosan 2/5 (40%)!
            </p>
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setAddedHazelnuts(0)}
            className="h-8 text-xs border-slate-700 text-slate-300 hover:bg-slate-800"
          >
            <RotateCcw className="w-3.5 h-3.5 mr-1" /> Alaphelyzet
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
          <div className="md:col-span-6 space-y-4">
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300">Hozzáadott mogyorós szeletek száma (<MathText>{'$x$'}</MathText>):</span>
                <span className="font-bold text-amber-400">+{addedHazelnuts} db</span>
              </div>
              <input
                type="range"
                min={0}
                max={25}
                value={addedHazelnuts}
                onChange={(e) => setAddedHazelnuts(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>0 db</span>
                <span>5 db (Megoldás)</span>
                <span>15 db</span>
                <span>25 db</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {[0, 3, 5, 10, 15].map((val) => (
                <Button
                  key={`btn-m-${val}`}
                  size="sm"
                  variant={addedHazelnuts === val ? 'default' : 'outline'}
                  className={`h-7 text-xs ${
                    addedHazelnuts === val
                      ? 'bg-amber-600 text-white'
                      : 'bg-slate-900 text-slate-300 border-slate-700'
                  }`}
                  onClick={() => setAddedHazelnuts(val)}
                >
                  +{val} db
                </Button>
              ))}
            </div>
          </div>

          <div className="md:col-span-6 bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-3">
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                <span className="text-[10px] uppercase text-slate-400 block font-bold">Mogyorós / Összes</span>
                <span className="text-lg font-black text-amber-300">
                  {currentHazelnuts} / {currentTotalBars} db
                </span>
              </div>
              <div className={`p-2.5 rounded-lg border transition-all ${
                isTargetAchieved
                  ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300'
                  : 'bg-slate-950 border-slate-800 text-slate-200'
              }`}>
                <span className="text-[10px] uppercase block font-bold">P(mogyorós)</span>
                <span className="text-lg font-black">
                  {(hazelnutProb * 100).toFixed(1)}% {isTargetAchieved && '🎯 (Cél elérve!)'}
                </span>
              </div>
            </div>

            <div className="text-xs text-slate-300 p-2.5 bg-slate-950 rounded-lg border border-slate-800 font-mono">
              <div className="text-slate-400">Egyenlet: (5 + x) / (20 + x) = 2/5</div>
              <div className="mt-1 font-bold text-amber-300">
                5 · (5 + {addedHazelnuts}) = 2 · (20 + {addedHazelnuts}) ⟹ {5 * (5 + addedHazelnuts)} {isTargetAchieved ? '=' : '≠'} {2 * (20 + addedHazelnuts)}
              </div>
            </div>

            {isTargetAchieved && (
              <div className="text-xs text-emerald-400 font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>Pontosan x = 5 db mogyorós szeletet kell hozzátenni! Ekkor 10/25 = 2/5 = 40%.</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Labor 2: Golyók Arányának Megfordítása (60 golyós tankönyvi feladat) */}
      <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <h4 className="font-bold text-base text-amber-200">
              2. Golyók arányának megfordítása (60 golyó: 24 fehér és 36 fekete)
            </h4>
            <p className="text-xs text-slate-400">
              Alaphelyzet: P(fehér) = 0,4 és P(fekete) = 0,6. Hogyan érhető el, hogy P(fehér) = 0,6 legyen?
            </p>
          </div>
          <div className="flex items-center gap-1.5">
            <Button
              size="sm"
              variant={ballMode === 'addWhite' ? 'default' : 'outline'}
              className={`h-7 text-xs ${ballMode === 'addWhite' ? 'bg-amber-600 text-white' : 'bg-slate-900 border-slate-700 text-slate-300'}`}
              onClick={() => {
                setBallMode('addWhite');
                setRemovedBlackBalls(0);
              }}
            >
              Fehér hozzáadása
            </Button>
            <Button
              size="sm"
              variant={ballMode === 'removeBlack' ? 'default' : 'outline'}
              className={`h-7 text-xs ${ballMode === 'removeBlack' ? 'bg-amber-600 text-white' : 'bg-slate-900 border-slate-700 text-slate-300'}`}
              onClick={() => {
                setBallMode('removeBlack');
                setAddedWhiteBalls(0);
              }}
            >
              Fekete kivétele
            </Button>
          </div>
        </div>

        {ballMode === 'addWhite' ? (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
            <div className="md:col-span-6 space-y-3">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300">Hozzáadott fehér golyók (<MathText>{'$x$'}</MathText>):</span>
                <span className="font-bold text-amber-400">+{addedWhiteBalls} db</span>
              </div>
              <input
                type="range"
                min={0}
                max={50}
                value={addedWhiteBalls}
                onChange={(e) => setAddedWhiteBalls(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>0 db</span>
                <span>30 db (Megoldás)</span>
                <span>50 db</span>
              </div>
            </div>

            <div className="md:col-span-6 bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Fehérek száma: <b>{currentWhiteBalls}</b> / {currentTotalBalls}</span>
                <span className={`font-black text-sm ${isWhiteTargetAchieved ? 'text-emerald-400' : 'text-amber-300'}`}>
                  P(fehér) = {(whiteProb * 100).toFixed(1)}% {isWhiteTargetAchieved && '🎯'}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono">
                Egyenlet: (24 + x) / (60 + x) = 0,6 ⟹ 24 + x = 36 + 0,6x ⟹ 0,4x = 12 ⟹ <b>x = 30 db fehér golyó</b>.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
            <div className="md:col-span-6 space-y-3">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300">Kivett fekete golyók (<MathText>{'$y$'}</MathText>):</span>
                <span className="font-bold text-amber-400">-{removedBlackBalls} db</span>
              </div>
              <input
                type="range"
                min={0}
                max={30}
                value={removedBlackBalls}
                onChange={(e) => setRemovedBlackBalls(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>0 db</span>
                <span>20 db (Megoldás)</span>
                <span>30 db</span>
              </div>
            </div>

            <div className="md:col-span-6 bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">Megmaradt feketék: <b>{currentBlackBalls}</b> (össz: {currentTotalBalls})</span>
                <span className={`font-black text-sm ${isWhiteTargetAchieved ? 'text-emerald-400' : 'text-amber-300'}`}>
                  P(fehér) = {(whiteProb * 100).toFixed(1)}% {isWhiteTargetAchieved && '🎯'}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono">
                Egyenlet: 24 / (60 – y) = 0,6 ⟹ 24 = 36 – 0,6y ⟹ 0,6y = 12 ⟹ <b>y = 20 db fekete golyó kivétele</b>.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <TheoryTemplate
      title="Biztos, lehetetlen, véletlen"
      subtitle="Események osztályozása, komplementer események, egymást kizáró események és dinamikus arányok"
      badge="10. OSZTÁLY • STATISZTIKA ÉS VALÓSZÍNŰSÉGSZÁMÍTÁS"
      themeColor="amber"
      documentId="grade10-event-certainty-theory"
      quickRule={{
        label: 'AZ ESEMÉNYEK ÉS VALÓSZÍNŰSÉGEK ALAPTÖRVÉNYEI',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-200 text-xs sm:text-sm">
            <div className="bg-amber-50/90 dark:bg-amber-950/40 p-2.5 rounded-xl border border-amber-200 dark:border-amber-800">
              <span className="font-black text-amber-900 dark:text-amber-300 block mb-1">
                Eseménytípusok és komplementerek:
              </span>
              <ul className="space-y-1 text-slate-700 dark:text-slate-300 font-medium">
                <li>• <strong>Biztos esemény:</strong> <MathText>{'P(I) = 1 = 100\\%'}</MathText> (mindig bekövetkezik)</li>
                <li>• <strong>Lehetetlen esemény:</strong> <MathText>{'P(\\emptyset) = 0 = 0\\%'}</MathText> (sohasem következhet be)</li>
                <li>• <strong>Véletlen esemény:</strong> <MathText>{'0 < P(A) < 1'}</MathText></li>
                <li>• <strong>Komplementer (ellentett):</strong> <MathText>{'P(\\bar{A}) = 1 - P(A) \\iff P(A) + P(\\bar{A}) = 1'}</MathText></li>
              </ul>
            </div>
            <div className="bg-rose-50 dark:bg-rose-950/40 p-2 rounded-lg border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-300 text-[11px] leading-tight">
              <strong>⚠️ ÖSSZEADÁSI CSAPDA:</strong> <MathText>{'P(A \\cup B) = P(A) + P(B)'}</MathText> <u>kizárólag akkor igaz</u>, ha <MathText>{'A'}</MathText> és <MathText>{'B'}</MathText> kizárják egymást (<MathText>{'A \\cap B = \\emptyset'}</MathText>)!
            </div>
          </div>
        )
      }}
      interactiveSection={interactiveSection}
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      practiceTitle="Teszteld a tudásodat a biztos, lehetetlen és véletlen eseményekből!"
      practiceSubtitle="Gyakorold az események kategorizálását, a komplementereket és a dinamikus arányokat 30 feladaton át!"
      practiceButtonText="Események Kvíz indítása"
      tips={[
        {
          title: 'A „legalább egy” feladatok aranyszabálya',
          content: 'Ha egy feladatban az szerepel, hogy „legalább az egyik érmén írás van” vagy „legalább egy találat születik”, szinte mindig sokkal gyorsabb az ellentett eseményt kiszámolni: P(legalább 1) = 1 – P(egyik sem)!'
        },
        {
          title: 'Szigorú határok ellenőrzése',
          content: 'Egyetlen valószínűség sem lehet negatív és nem lehet 1-nél (100%-nál) nagyobb! Ha számoláskor 1-nél nagyobb számot kapsz, azonnal ellenőrizd a nevezőt (az összes esetet).'
        },
        {
          title: 'Hozzáadáskor a nevező is nő!',
          content: 'Amikor golyókat vagy müzliszeleteket teszünk még hozzá a dobozhoz, a számláló k + x lesz, de a nevező is n + x-re nő: (k + x) / (n + x) = cél! Ne felejtsd el az összes darabszámot is megnövelni.'
        }
      ]}
    >
      {/* KIEMELT FONTOS SZABÁLYOK SZEKCIÓ A TANANYAG ELEJÉN */}
      <div className="bg-gradient-to-r from-amber-50 via-orange-50 to-yellow-50 dark:from-amber-950/40 dark:via-orange-950/30 dark:to-yellow-950/30 rounded-2xl sm:rounded-3xl p-5 sm:p-7 border-2 border-amber-300/80 dark:border-amber-800 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-amber-200/80 dark:border-amber-800/80 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 sm:p-3 bg-amber-600 text-white rounded-2xl shadow-md">
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-700 mb-1">
                SZABÁLYTÁR &amp; MEMÓRIAPANELL
              </div>
              <h2 className="text-lg sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                Fontos szabályok: Biztos, lehetetlen és véletlen események
              </h2>
            </div>
          </div>
          <span className="text-xs font-semibold text-amber-700 dark:text-amber-300 bg-amber-100/80 dark:bg-amber-900/40 px-3 py-1.5 rounded-xl border border-amber-200 dark:border-amber-800 self-start sm:self-auto">
            5 aranyszabály a valószínűség törvényeihez
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
          {/* 1. Szabály */}
          <div className="bg-white dark:bg-slate-900/90 p-4 rounded-2xl border border-amber-200 dark:border-amber-800/60 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-lg bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-300 font-black text-xs flex items-center justify-center">1</span>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">Biztos és lehetetlen esemény</h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                A biztos esemény minden kísérletben garantáltan megvalósul, míg a lehetetlen esemény sohasem:
              </p>
              <div className="my-2 p-2 bg-amber-50 dark:bg-amber-950/50 rounded-xl text-center font-bold text-amber-800 dark:text-amber-300 text-xs sm:text-sm border border-amber-100 dark:border-amber-800">
                <MathText>{'P(I) = 1 \\quad \\text{és} \\quad P(\\emptyset) = 0'}</MathText>
              </div>
            </div>
            <p className="text-[11px] text-amber-700 dark:text-amber-400 font-medium mt-1">
              💡 Példa: Két kocka összege legfeljebb 12 (biztos); összege 13 (lehetetlen).
            </p>
          </div>

          {/* 2. Szabály */}
          <div className="bg-white dark:bg-slate-900/90 p-4 rounded-2xl border border-orange-200 dark:border-orange-800/60 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-lg bg-orange-100 dark:bg-orange-900/60 text-orange-800 dark:text-orange-300 font-black text-xs flex items-center justify-center">2</span>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">A valószínűségi értéktartomány</h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Tetszőleges <MathText>{'$A$'}</MathText> esemény valószínűsége a 0 és 1 (0% és 100%) zárt intervallumba esik:
              </p>
              <div className="my-2 p-2 bg-orange-50 dark:bg-orange-950/50 rounded-xl text-center font-bold text-orange-800 dark:text-orange-300 text-xs sm:text-sm border border-orange-100 dark:border-orange-800">
                <MathText>{'0 \\le P(A) \\le 1 \\quad \\text{és ha véletlen:} \\quad 0 < P(A) < 1'}</MathText>
              </div>
            </div>
            <p className="text-[11px] text-orange-700 dark:text-orange-400 font-medium mt-1">
              💡 Valószínűség soha nem lehet negatív és nem haladhatja meg az 1-et!
            </p>
          </div>

          {/* 3. Szabály */}
          <div className="bg-white dark:bg-slate-900/90 p-4 rounded-2xl border border-emerald-200 dark:border-emerald-800/60 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-lg bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 font-black text-xs flex items-center justify-center">3</span>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">Komplementer esemény tétele</h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Egy esemény és ellentettje kizárják egymást, és együttesen lefedik a teljes eseményteret:
              </p>
              <div className="my-2 p-2 bg-emerald-50 dark:bg-emerald-950/50 rounded-xl text-center font-bold text-emerald-800 dark:text-emerald-300 text-xs sm:text-sm border border-emerald-100 dark:border-emerald-800">
                <MathText>{'P(\\bar{A}) = 1 - P(A) \\iff P(A) + P(\\bar{A}) = 1'}</MathText>
              </div>
            </div>
            <p className="text-[11px] text-emerald-700 dark:text-emerald-400 font-medium mt-1">
              💡 Példa: P(nem hatos) = 1 – 1/6 = 5/6.
            </p>
          </div>

          {/* 4. Szabály */}
          <div className="bg-white dark:bg-slate-900/90 p-4 rounded-2xl border border-indigo-200 dark:border-indigo-800/60 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-lg bg-indigo-100 dark:bg-indigo-900/60 text-indigo-800 dark:text-indigo-300 font-black text-xs flex items-center justify-center">4</span>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">Egymást kizáró események összeadása</h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Ha két esemény egyszerre nem valósulhat meg (<MathText>{'A \\cap B = \\emptyset'}</MathText>), valószínűségük összeadódik:
              </p>
              <div className="my-2 p-2 bg-indigo-50 dark:bg-indigo-950/50 rounded-xl text-center font-bold text-indigo-800 dark:text-indigo-300 text-xs sm:text-sm border border-indigo-100 dark:border-indigo-800">
                <MathText>{'P(A \\cup B) = P(A) + P(B)'}</MathText>
              </div>
            </div>
            <p className="text-[11px] text-indigo-700 dark:text-indigo-400 font-medium mt-1">
              💡 Példa: P(piros vagy zöld gyöngy) = P(piros) + P(zöld).
            </p>
          </div>

          {/* 5. Szabály */}
          <div className="bg-white dark:bg-slate-900/90 p-4 rounded-2xl border border-teal-200 dark:border-teal-800/60 shadow-xs flex flex-col justify-between md:col-span-2 lg:col-span-2">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-lg bg-teal-100 dark:bg-teal-900/60 text-teal-800 dark:text-teal-300 font-black text-xs flex items-center justify-center">5</span>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">Dinamikus valószínűségi egyenletek</h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Ha egy meglévő halmazhoz még <MathText>{'$x$'}</MathText> darab kedvező elemet adunk hozzá, a számláló és a nevező is nő:
              </p>
              <div className="my-2 p-2 bg-teal-50 dark:bg-teal-950/50 rounded-xl text-center font-bold text-teal-800 dark:text-teal-300 text-xs sm:text-sm border border-teal-100 dark:border-teal-800">
                <MathText>{'\\frac{k + x}{n + x} = p_{\\text{cél}} \\implies k + x = p_{\\text{cél}} \\cdot (n + x)'}</MathText>
              </div>
            </div>
            <p className="text-[11px] text-teal-700 dark:text-teal-400 font-medium mt-1">
              💡 Példa: 15 almás, 5 mogyorós ⟹ (5 + x) / (20 + x) = 2/5 ⟹ x = 5 db mogyorós szelet.
            </p>
          </div>
        </div>
      </div>

      {/* 1. SZEKCIÓ: BIZTOS, LEHETETLEN ÉS VÉLETLEN ESEMÉNYEK */}
      <TheorySection
        number={1}
        title="Eseménytípusok a valószínűségük alapján"
        badge="ALAPFOGALMAK"
        badgeColor="amber"
        icon={<BookOpen className="w-4 h-4 text-amber-600" />}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 space-y-4">
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
              Amikor egy véletlen kísérletet végzünk, az eseményeket a bekövetkezésük bizonyossága szerint <b>három nagy csoportba</b> sorolhatjuk.
            </p>

            <div className="space-y-3">
              <TheoryCard
                title="1. Biztos esemény (I vagy Ω)"
                badge="P = 1"
                color="emerald"
              >
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  Olyan esemény, amely a kísérlet során <b>mindenképpen bekövetkezik</b>. Az esemény megegyezik a teljes eseménytérrel.
                  <br />
                  <b>Példa:</b> Két szabályos kockával dobva az összeg 16-nál kisebb (<MathText>{'P = 1'}</MathText>), vagy a dobott szám legfeljebb 6.
                </p>
              </TheoryCard>

              <TheoryCard
                title="2. Lehetetlen esemény (∅)"
                badge="P = 0"
                color="rose"
              >
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  Olyan esemény, amely <b>egyetlen kísérlet során sem következhet be</b>. Az üres halmaznak felel meg.
                  <br />
                  <b>Példa:</b> Két kockával dobva a dobott számok összege 13 (<MathText>{'P = 0'}</MathText>), vagy három pénzérmén mindhármon más oldal látható.
                </p>
              </TheoryCard>

              <TheoryCard
                title="3. Véletlen (lehetséges) esemény"
                badge="0 < P < 1"
                color="blue"
              >
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  Olyan esemény, amely <b>bekövetkezhet, de nem biztos</b>. Valószínűsége szigorúan a 0 és 1 nyílt intervallumba esik.
                  <br />
                  <b>Példa:</b> Két kocka összege pontosan 5 (<MathText>{'P = 4/36 = 1/9'}</MathText>), vagy érmedobással fej dobása (<MathText>{'P = 0,5'}</MathText>).
                </p>
              </TheoryCard>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col items-center justify-center p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200 dark:border-slate-800">
            <CertaintySpectrumSvg size={280} />
            <span className="text-xs text-slate-500 dark:text-slate-400 mt-2 text-center">
              A valószínűségi spektrum a lehetetlentől a biztos eseményig
            </span>
          </div>
        </div>
      </TheorySection>

      {/* 2. SZEKCIÓ: KOMPLEMENTER (ELLENTETT) ESEMÉNYEK */}
      <TheorySection
        number={2}
        title="Komplementer (egymást kiegészítő) események"
        badge="ALAPTÉTEL"
        badgeColor="indigo"
        icon={<Scale className="w-4 h-4 text-indigo-600" />}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 space-y-4">
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
              Két eseményt <b>komplementernek (egymást kiegészítőnek vagy ellentettnek)</b> nevezünk, ha egyszerre sohasem következhetnek be, de közülük az egyik garantáltan bekövetkezik.
            </p>

            <TheoryCard
              title="A komplementer esemény képlete és tulajdonságai"
              formula="P(\bar{A}) = 1 - P(A) \iff P(A) + P(\bar{A}) = 1"
              color="indigo"
            >
              <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                <li>• <MathText>{'A \\cap \\bar{A} = \\emptyset'}</MathText>: kizárják egymást (nincs közös kimenetelük).</li>
                <li>• <MathText>{'A \\cup \\bar{A} = \\Omega'}</MathText>: együttesen lefedik a teljes eseményteret.</li>
                <li>• <b>Alkalmazás:</b> Ha egy esemény valószínűsége nehezen számolható, gyakran sokkal egyszerűbb a tagadását felírni és kivonni 1-ből!</li>
              </ul>
            </TheoryCard>

            <TheoryCallout type="tip" title="A „legalább egy” feladatok kulcsa">
              Ha egy kísérletben azt kérdezik, hogy „legalább az egyik dobás fej” vagy „legalább egy találat van”, az ellentett esemény a <b>„mindkettő írás”</b> vagy a <b>„nulla találat”</b>.
              Így egyetlen gyors szorzással és egy kivonással megkapható a megoldás!
            </TheoryCallout>
          </div>

          <div className="lg:col-span-5 flex flex-col items-center justify-center p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200 dark:border-slate-800">
            <VennComplementSvg size={260} />
            <span className="text-xs text-slate-500 dark:text-slate-400 mt-2 text-center">
              Venn-diagram: az A esemény és komplementere (Ā) az eseménytérben
            </span>
          </div>
        </div>
      </TheorySection>

      {/* 3. SZEKCIÓ: EGYMÁST KIZÁRÓ ESEMÉNYEK ÉS GYÖNGYÖS DOBOZ */}
      <TheorySection
        number={3}
        title="Egymást kizáró események és az eseménytér felosztása"
        badge="TÉTEL"
        badgeColor="teal"
        icon={<Layers className="w-4 h-4 text-teal-600" />}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 space-y-4">
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
              A tankönyv mintapéldájában egy dobozban színes gyöngyök vannak: 
              <MathText>{'\\frac{1}{6}'}</MathText> részük fehér, <b>25%</b> (<MathText>{'\\frac{1}{4}'}</MathText>) piros, 
              <MathText>{'\\frac{1}{2}'}</MathText> részük zöld, a többi sárga.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
                <span className="font-bold text-slate-900 dark:text-white block">Sárga gyöngy esélye:</span>
                <p className="text-slate-600 dark:text-slate-300">
                  <MathText>{'1 - \\left(\\frac{1}{6} + \\frac{1}{4} + \\frac{1}{2}\\right) = 1 - \\frac{11}{12} = \\frac{1}{12}'}</MathText>
                </p>
              </div>

              <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
                <span className="font-bold text-slate-900 dark:text-white block">Piros VAGY Zöld gyöngy:</span>
                <p className="text-slate-600 dark:text-slate-300">
                  Mivel egy gyöngy nem lehet egyszerre piros és zöld: <MathText>{'\\frac{1}{4} + \\frac{1}{2} = \\frac{3}{4} = 75\\%'}</MathText>.
                </p>
              </div>
            </div>

            <TheoryTrapBox
              trap="Gyakori hiba: kizáró események összeadási szabályának feltétel nélküli használata"
              wrong="P(A vagy B) = P(A) + P(B) mindig igaz."
              wrongExplanation="Ha a két eseménynek van közös kimenetele (pl. kockán páros vagy prím: a 2 közös!), akkor a metszetet kétszer számolnánk!"
              correct="P(A vagy B) = P(A) + P(B) kizárólag akkor érvényes, ha A és B kizárják egymást (A ∩ B = ∅). Általános esetben: P(A ∪ B) = P(A) + P(B) – P(A ∩ B)."
              correctExplanation="Két szín egy golyónál kizárja egymást, így ott egyszerűen összeadhatunk."
            />
          </div>

          <div className="lg:col-span-5 flex flex-col items-center justify-center p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200 dark:border-slate-800">
            <BeadProbabilityDistributionSvg size={280} />
            <span className="text-xs text-slate-500 dark:text-slate-400 mt-2 text-center">
              Gyöngyök arányos felosztása és kizáró események összeadása
            </span>
          </div>
        </div>
      </TheorySection>

      {/* 4. SZEKCIÓ: VÁLTOZÓ MINTAVÉTEL ÉS CSÖKKENŐ NEVEZŐ */}
      <TheorySection
        number={4}
        title="Változó eseménytér és feltételes mintavétel"
        badge="SZÖVEGES PÉLDÁK"
        badgeColor="orange"
        icon={<Target className="w-4 h-4 text-orange-600" />}
      >
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            Gyakran előfordul, hogy egy kísérlet során az eseménytér elemeinek száma megváltozik, mert egy részeredményt már ismerünk (pl. egymás utáni húzások visszatevés nélkül).
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2.5">
              <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                <span>A 10.a osztály kalaphúzása</span>
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Az osztályba 22 lány és 13 fiú jár (összesen 35 tanuló). Kihúznak 5 nevet. Az első négy név lány. Mi az esélye, hogy az 5. név fiú?
              </p>
              <div className="p-2.5 bg-amber-50 dark:bg-amber-950/40 rounded-xl text-xs space-y-1 border border-amber-200 dark:border-amber-800 font-mono text-amber-900 dark:text-amber-200">
                <div>Összes bent maradt név: 35 – 4 = 31 db</div>
                <div>Bent lévő fiúk: 13 db | Bent lévő lányok: 22 – 4 = 18 db</div>
                <div className="font-bold text-amber-700 dark:text-amber-400">P(5. fiú) = 13 / 31 ≈ 41,9%</div>
              </div>
            </div>

            <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2.5">
              <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                <span>Repülőgép nemzetközi utasai</span>
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                200 utas: 94 magyar, 72 angol, 20 holland, 14 német. Mennyi az esélye, hogy egy véletlenül választott utas NEM angol?
              </p>
              <div className="p-2.5 bg-blue-50 dark:bg-blue-950/40 rounded-xl text-xs space-y-1 border border-blue-200 dark:border-blue-800 font-mono text-blue-900 dark:text-blue-200">
                <div>Komplementer módszerrel:</div>
                <div>P(nem angol) = 1 – 72 / 200 = 128 / 200 = 0,64 = 64%</div>
                <div className="font-bold text-blue-700 dark:text-blue-400">P(kínai utas) = 0 / 200 = 0 (Lehetetlen esemény!)</div>
              </div>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 5. SZEKCIÓ: DINAMIKUS ARÁNYOK ÉS VALÓSZÍNŰSÉGI EGYENLETEK */}
      <TheorySection
        number={5}
        title="Dinamikus valószínűségi egyenletek felállítása"
        badge="EGYENLETMEGOLDÁS"
        badgeColor="emerald"
        icon={<Equal className="w-4 h-4 text-emerald-600" />}
      >
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            Az érettségi és kompetenciamérések egyik leggyakoribb feladattípusa, amikor meg kell határozni, <b>mennyivel kell megnövelni vagy csökkenteni</b> a készletet ahhoz, hogy a valószínűség egy előre kitűzött célértéket érjen el.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl border border-emerald-200 dark:border-emerald-800 space-y-2">
              <h4 className="font-bold text-sm text-emerald-900 dark:text-emerald-200">
                Müzliszelet feladat algebrai megoldása
              </h4>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                15 almás és 5 mogyorós (összesen 20 db). Tegyünk hozzá <MathText>{'$x$'}</MathText> mogyorósat, hogy a valószínűség <MathText>{'\\frac{2}{5}'}</MathText> legyen:
              </p>
              <div className="p-3 bg-white dark:bg-slate-900 rounded-xl font-mono text-xs text-slate-800 dark:text-slate-200 space-y-1 border border-emerald-200 dark:border-emerald-700">
                <div><MathText>{'\\frac{5 + x}{20 + x} = \\frac{2}{5}'}</MathText></div>
                <div><MathText>{'5 \\cdot (5 + x) = 2 \\cdot (20 + x)'}</MathText></div>
                <div><MathText>{'25 + 5x = 40 + 2x'}</MathText></div>
                <div><MathText>{'3x = 15 \\implies x = 5'}</MathText> db mogyorós szelet</div>
              </div>
            </div>

            <div className="p-4 bg-teal-50 dark:bg-teal-950/40 rounded-2xl border border-teal-200 dark:border-teal-800 space-y-2">
              <h4 className="font-bold text-sm text-teal-900 dark:text-teal-200">
                60 golyó arányfordítása algebrai úton
              </h4>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                24 fehér és 36 fekete. Hány fehéret kell betenni (<MathText>{'$x$'}</MathText>), hogy a fehér esélye 0,6 legyen?
              </p>
              <div className="p-3 bg-white dark:bg-slate-900 rounded-xl font-mono text-xs text-slate-800 dark:text-slate-200 space-y-1 border border-teal-200 dark:border-teal-700">
                <div><MathText>{'\\frac{24 + x}{60 + x} = 0,6'}</MathText></div>
                <div><MathText>{'24 + x = 0,6 \\cdot (60 + x)'}</MathText></div>
                <div><MathText>{'24 + x = 36 + 0,6x'}</MathText></div>
                <div><MathText>{'0,4x = 12 \\implies x = 30'}</MathText> db fehér golyó</div>
              </div>
            </div>
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default EventCertaintyTheory;

