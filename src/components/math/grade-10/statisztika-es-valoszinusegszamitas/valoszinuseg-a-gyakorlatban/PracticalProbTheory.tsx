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
  VennSetSieveSvg,
  BloodDonorCrossTableSvg,
  QueuePermutationSvg
} from './PracticalProbFigures';
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
  Layers,
  Users,
  Grid
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PracticalProbTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

export const PracticalProbTheory: React.FC<PracticalProbTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // --- 1. Interaktív Venn-diagram Laboratórium State (36 fős osztály) ---
  const [totalStudents, setTotalStudents] = useState<number>(36);
  const [mathCount, setMathCount] = useState<number>(9);
  const [historyCount, setHistoryCount] = useState<number>(18);
  const [bothCount, setBothCount] = useState<number>(3);

  const onlyMath = Math.max(0, mathCount - bothCount);
  const onlyHistory = Math.max(0, historyCount - bothCount);
  const atLeastOne = onlyMath + onlyHistory + bothCount;
  const neitherCount = Math.max(0, totalStudents - atLeastOne);

  const probAtLeastOne = totalStudents > 0 ? atLeastOne / totalStudents : 0;
  const probNeither = totalStudents > 0 ? neitherCount / totalStudents : 0;
  const probOnlyOne = totalStudents > 0 ? (onlyMath + onlyHistory) / totalStudents : 0;

  const handleResetVenn = () => {
    setTotalStudents(36);
    setMathCount(9);
    setHistoryCount(18);
    setBothCount(3);
  };

  // --- 2. Vércsoport Kereszttábla Explorer State ---
  const [selectedCell, setSelectedCell] = useState<string | null>(null);

  // Interaktív labor szekció JSX
  const interactiveSection = (
    <div className="bg-slate-900 text-white p-5 sm:p-7 rounded-2xl sm:rounded-3xl shadow-xl space-y-6 border border-rose-800/50">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-rose-800/60 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-rose-600 text-white rounded-2xl shadow-lg">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-black text-rose-100">
              Interaktív Logikai Szita &amp; Kereszttábla Laboratórium
            </h3>
            <p className="text-xs text-rose-300/80">
              Vizsgáld a halmazok unióját, metszetét és komplementerét valós adatokon és kétdimenziós statisztikai mátrixokon!
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs px-3 py-1 rounded-full bg-rose-950/60 text-rose-300 border border-rose-800/80 font-bold">
            Gyakorlati statisztika
          </span>
        </div>
      </div>

      {/* Labor 1: Interaktív Venn-diagram (36 fős osztály) */}
      <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <h4 className="font-bold text-base text-rose-200">
              1. Venn-diagram &amp; Logikai szita: 36 fős osztály emelt tantárgyai
            </h4>
            <p className="text-xs text-slate-400">
              Módosítsd a létszámokat, és figyeld meg az unió, a metszet és a külső kiegészítő tartomány élő változását!
            </p>
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={handleResetVenn}
            className="h-8 text-xs border-slate-700 text-slate-300 hover:bg-slate-800"
          >
            <RotateCcw className="w-3.5 h-3.5 mr-1" /> Tankönyvi alaphelyzet
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
          {/* Vezérlő csúszkák */}
          <div className="lg:col-span-5 space-y-3 bg-slate-900 p-4 rounded-xl border border-slate-800 text-xs">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-blue-300 font-bold">Matematika emelt (|M|):</span>
                <span className="font-mono text-white font-bold">{mathCount} fő</span>
              </div>
              <input
                type="range"
                min={3}
                max={25}
                value={mathCount}
                onChange={(e) => setMathCount(Number(e.target.value))}
                className="w-full accent-blue-500 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-pink-300 font-bold">Történelem emelt (|T|):</span>
                <span className="font-mono text-white font-bold">{historyCount} fő</span>
              </div>
              <input
                type="range"
                min={3}
                max={25}
                value={historyCount}
                onChange={(e) => setHistoryCount(Number(e.target.value))}
                className="w-full accent-pink-500 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-purple-300 font-bold">Mindkettő emelt (|M ∩ T|):</span>
                <span className="font-mono text-white font-bold">{bothCount} fő</span>
              </div>
              <input
                type="range"
                min={0}
                max={Math.min(mathCount, historyCount)}
                value={bothCount}
                onChange={(e) => setBothCount(Number(e.target.value))}
                className="w-full accent-purple-500 cursor-pointer"
              />
            </div>
          </div>

          {/* Élő eredmények és logikai szita */}
          <div className="lg:col-span-7 bg-slate-900 p-4 rounded-xl border border-slate-800 space-y-3">
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-2 bg-slate-950 rounded-lg border border-slate-800">
                <span className="text-[10px] text-blue-400 block font-bold">Csak Matematika</span>
                <span className="text-base font-black text-white">{onlyMath} fő</span>
                <span className="text-[10px] text-slate-400 block font-mono">
                  {((onlyMath / totalStudents) * 100).toFixed(1)}%
                </span>
              </div>

              <div className="p-2 bg-slate-950 rounded-lg border border-purple-800/60">
                <span className="text-[10px] text-purple-400 block font-bold">Mindkettő (Metszet)</span>
                <span className="text-base font-black text-purple-300">{bothCount} fő</span>
                <span className="text-[10px] text-slate-400 block font-mono">
                  {((bothCount / totalStudents) * 100).toFixed(1)}%
                </span>
              </div>

              <div className="p-2 bg-slate-950 rounded-lg border border-slate-800">
                <span className="text-[10px] text-pink-400 block font-bold">Csak Történelem</span>
                <span className="text-base font-black text-white">{onlyHistory} fő</span>
                <span className="text-[10px] text-slate-400 block font-mono">
                  {((onlyHistory / totalStudents) * 100).toFixed(1)}%
                </span>
              </div>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1.5 font-mono">
              <div className="flex justify-between text-slate-300">
                <span>Legalább az egyik (|M ∪ T| = {onlyMath} + {onlyHistory} + {bothCount}):</span>
                <span className="font-bold text-rose-400">
                  {atLeastOne} fő ({(probAtLeastOne * 100).toFixed(1)}%)
                </span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Egyik sem (36 – {atLeastOne}):</span>
                <span className="font-bold text-emerald-400">
                  {neitherCount} fő ({(probNeither * 100).toFixed(1)}%)
                </span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Csak az egyik tárgy ({onlyMath} + {onlyHistory}):</span>
                <span className="font-bold text-cyan-400">
                  {onlyMath + onlyHistory} fő ({(probOnlyOne * 100).toFixed(1)}%)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Labor 2: Kétdimenziós Kereszttábla Vércsoport Interakció */}
      <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-2">
          <h4 className="font-bold text-sm text-rose-200">
            2. Vércsoport és Rh-faktor Kereszttábla (346 donor egység)
          </h4>
          <span className="text-[11px] text-slate-400">
            Kattints a cellákra a valószínűség azonnali leolvasásához!
          </span>
        </div>

        <div className="grid grid-cols-6 gap-1.5 text-center text-xs font-bold max-w-xl mx-auto">
          <div className="p-2 bg-slate-800 text-slate-400 rounded-lg">Rh / Csoport</div>
          {['0', 'A', 'B', 'AB', 'Össz.'].map((h) => (
            <div key={`th-${h}`} className="p-2 bg-slate-800 text-rose-300 rounded-lg">
              {h}
            </div>
          ))}

          {/* Rh+ sor */}
          <div className="p-2 bg-slate-800/80 text-emerald-400 rounded-lg flex items-center justify-center">
            Rh+
          </div>
          {[
            { label: '0, Rh+', val: 161 },
            { label: 'A, Rh+', val: 73 },
            { label: 'B, Rh+', val: 44 },
            { label: 'AB, Rh+', val: 14 }
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => setSelectedCell(`${item.label}: ${item.val} egység (P = ${(item.val / 346 * 100).toFixed(1)}%)`)}
              className="p-2 bg-slate-900 border border-slate-800 hover:bg-rose-950/60 rounded-lg text-slate-200 transition-all cursor-pointer"
            >
              {item.val}
            </button>
          ))}
          <div className="p-2 bg-slate-800 text-white rounded-lg flex items-center justify-center">
            292
          </div>

          {/* Rh- sor */}
          <div className="p-2 bg-slate-800/80 text-rose-400 rounded-lg flex items-center justify-center">
            Rh-
          </div>
          {[
            { label: '0, Rh-', val: 30 },
            { label: 'A, Rh-', val: 14 },
            { label: 'B, Rh-', val: 8 },
            { label: 'AB, Rh-', val: 2 }
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => setSelectedCell(`${item.label}: ${item.val} egység (P = ${(item.val / 346 * 100).toFixed(1)}%)`)}
              className="p-2 bg-slate-900 border border-slate-800 hover:bg-rose-950/60 rounded-lg text-slate-200 transition-all cursor-pointer"
            >
              {item.val}
            </button>
          ))}
          <div className="p-2 bg-slate-800 text-white rounded-lg flex items-center justify-center">
            54
          </div>

          {/* Margóösszeg sor */}
          <div className="p-2 bg-slate-800 text-white rounded-lg">Össz.</div>
          {[191, 87, 52, 16, 346].map((sumVal, sIdx) => (
            <div key={`s-${sIdx}`} className="p-2 bg-slate-800 text-rose-300 font-black rounded-lg">
              {sumVal}
            </div>
          ))}
        </div>

        {selectedCell && (
          <div className="p-2.5 bg-rose-950/40 rounded-xl border border-rose-800/60 text-center text-xs font-bold text-rose-200 animate-in fade-in">
            Kiválasztva: {selectedCell}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <TheoryTemplate
      title="Valószínűség a gyakorlatban"
      subtitle="Logikai szita, Venn-diagramok, kétdimenziós gyakorisági táblák, orvosi statisztikák és sorrendek"
      badge="10. OSZTÁLY • STATISZTIKA ÉS VALÓSZÍNŰSÉGSZÁMÍTÁS"
      themeColor="rose"
      documentId="grade10-practical-prob-theory"
      quickRule={{
        label: 'A LOGIKAI SZITA ÉS HALMAZOK ALAPSZABÁLYA',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-200 text-xs sm:text-sm">
            <div className="bg-rose-50/90 dark:bg-rose-950/40 p-2.5 rounded-xl border border-rose-200 dark:border-rose-800">
              <span className="font-black text-rose-900 dark:text-rose-300 block mb-1">
                Logikai szita és eseményalgebra:
              </span>
              <ul className="space-y-1 text-slate-700 dark:text-slate-300 font-medium">
                <li>• <strong>Logikai szita (unió):</strong> <MathText>{'P(A \\cup B) = P(A) + P(B) - P(A \\cap B)'}</MathText></li>
                <li>• <strong>Egyik sem (komplementer):</strong> <MathText>{'P(\\text{egyik sem}) = 1 - P(A \\cup B)'}</MathText></li>
                <li>• <strong>Csak az egyik:</strong> <MathText>{'P(\\text{csak egyik}) = P(A) + P(B) - 2 \\cdot P(A \\cap B)'}</MathText></li>
              </ul>
            </div>
            <div className="bg-amber-50 dark:bg-amber-950/40 p-2 rounded-lg border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300 text-[11px] leading-tight">
              <strong>⚠️ A KÉTSZER SZÁMOLÁS CSAPDÁJA:</strong> Amikor összeadjuk az <MathText>{'$A$'}</MathText> és <MathText>{'$B$'}</MathText> halmazok elemeit, a közös metszetet (<MathText>{'$A \\cap B$'}</MathText>) kétszer számoljuk! Ezért pontosan egyszer le kell vonni.
            </div>
          </div>
        )
      }}
      interactiveSection={interactiveSection}
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      practiceTitle="Teszteld a tudásodat a valószínűség gyakorlati alkalmazásából!"
      practiceSubtitle="Oldd meg a 30 válogatott kompetencia- és érettségi típusú feladatot!"
      practiceButtonText="Gyakorlati Kvíz indítása"
      tips={[
        {
          title: 'Mindig a metszettel kezdd a Venn-diagramot!',
          content: 'Ha szöveges feladatot oldasz meg (pl. 36 fős osztály), először mindig a mindkét tulajdonsággal rendelkező elemek számát (a metszetet) írd be a diagram közepébe. Ezután vond ki ezt az egyes halmazok létszámából a „csak A” és „csak B” értékekhez!'
        },
        {
          title: 'Kereszttáblák margóösszegei',
          content: 'Kétdimenziós táblázatoknál (pl. vércsoport és Rh-faktor) mindig számold ki a sor- és oszlopösszegeket. Egy esemény uniójának számításakor a két margó összegéből azonnal vond ki a közös cella értékét!'
        },
        {
          title: 'Egymás melletti elemek blokkolása',
          content: 'Ha két személynek vagy elemnek egymás után/egymás mellett kell szerepelnie a sorrendben (pl. Anna és Kati), kezeld őket egyetlen összetett blokknak! A belső sorrendjük 2!-féle lehet.'
        }
      ]}
    >
      {/* KIEMELT FONTOS SZABÁLYOK SZEKCIÓ A TANANYAG ELEJÉN */}
      <div className="bg-gradient-to-r from-rose-50 via-pink-50 to-orange-50 dark:from-rose-950/40 dark:via-pink-950/30 dark:to-orange-950/30 rounded-2xl sm:rounded-3xl p-5 sm:p-7 border-2 border-rose-300/80 dark:border-rose-800 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-rose-200/80 dark:border-rose-800/80 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 sm:p-3 bg-rose-600 text-white rounded-2xl shadow-md">
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-rose-100 dark:bg-rose-900/60 text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-700 mb-1">
                SZABÁLYTÁR &amp; MEMÓRIAPANELL
              </div>
              <h2 className="text-lg sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                Fontos szabályok a valószínűség gyakorlati alkalmazásában
              </h2>
            </div>
          </div>
          <span className="text-xs font-semibold text-rose-700 dark:text-rose-300 bg-rose-100/80 dark:bg-rose-900/40 px-3 py-1.5 rounded-xl border border-rose-200 dark:border-rose-800 self-start sm:self-auto">
            5 aranyszabály érettségi és felmérő feladatokhoz
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
          {/* 1. Szabály */}
          <div className="bg-white dark:bg-slate-900/90 p-4 rounded-2xl border border-rose-200 dark:border-rose-800/60 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-lg bg-rose-100 dark:bg-rose-900/60 text-rose-800 dark:text-rose-300 font-black text-xs flex items-center justify-center">1</span>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">A logikai szita képlete</h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Két tetszőleges (nem feltétlenül kizáró) esemény uniójának valószínűsége:
              </p>
              <div className="my-2 p-2 bg-rose-50 dark:bg-rose-950/50 rounded-xl text-center font-bold text-rose-800 dark:text-rose-300 text-xs sm:text-sm border border-rose-100 dark:border-rose-800">
                <MathText>{'P(A \\cup B) = P(A) + P(B) - P(A \\cap B)'}</MathText>
              </div>
            </div>
            <p className="text-[11px] text-rose-700 dark:text-rose-400 font-medium mt-1">
              💡 A metszetet le kell vonni, mert az összeadásban kétszer szerepelne!
            </p>
          </div>

          {/* 2. Szabály */}
          <div className="bg-white dark:bg-slate-900/90 p-4 rounded-2xl border border-pink-200 dark:border-pink-800/60 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-lg bg-pink-100 dark:bg-pink-900/60 text-pink-800 dark:text-pink-300 font-black text-xs flex items-center justify-center">2</span>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">„Egyik sem” esemény</h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Annak esélye, hogy sem az <MathText>{'$A$'}</MathText>, sem a <MathText>{'$B$'}</MathText> esemény nem következik be, az unió komplementere:
              </p>
              <div className="my-2 p-2 bg-pink-50 dark:bg-pink-950/50 rounded-xl text-center font-bold text-pink-800 dark:text-pink-300 text-xs sm:text-sm border border-pink-100 dark:border-pink-800">
                <MathText>{'P(\\overline{A \\cup B}) = 1 - P(A \\cup B)'}</MathText>
              </div>
            </div>
            <p className="text-[11px] text-pink-700 dark:text-pink-400 font-medium mt-1">
              💡 Példa: 36 fős osztályból 24 tanul legalább egy tárgyat ⟹ 12 nem tanul egyet sem (33,3%).
            </p>
          </div>

          {/* 3. Szabály */}
          <div className="bg-white dark:bg-slate-900/90 p-4 rounded-2xl border border-purple-200 dark:border-purple-800/60 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-lg bg-purple-100 dark:bg-purple-900/60 text-purple-800 dark:text-purple-300 font-black text-xs flex items-center justify-center">3</span>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">„Csak az egyik” (Szimmetrikus diff.)</h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Ha pontosan az egyik esemény valósul meg a kettő közül:
              </p>
              <div className="my-2 p-2 bg-purple-50 dark:bg-purple-950/50 rounded-xl text-center font-bold text-purple-800 dark:text-purple-300 text-xs sm:text-sm border border-purple-100 dark:border-purple-800">
                <MathText>{'P(\\text{csak egyik}) = P(A) + P(B) - 2 \\cdot P(A \\cap B)'}</MathText>
              </div>
            </div>
            <p className="text-[11px] text-purple-700 dark:text-purple-400 font-medium mt-1">
              💡 Vagy közvetlenül: <MathText>{'\\frac{|A \\setminus B| + |B \\setminus A|}{n}'}</MathText>.
            </p>
          </div>

          {/* 4. Szabály */}
          <div className="bg-white dark:bg-slate-900/90 p-4 rounded-2xl border border-blue-200 dark:border-blue-800/60 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-lg bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-blue-300 font-black text-xs flex items-center justify-center">4</span>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">Kétdimenziós kereszttáblák</h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Ha az adatokat két tulajdonság (pl. vércsoport és Rh-faktor) szerint rendszerezzük:
              </p>
              <div className="my-2 p-2 bg-blue-50 dark:bg-blue-950/50 rounded-xl text-center font-bold text-blue-800 dark:text-blue-300 text-xs sm:text-sm border border-blue-100 dark:border-blue-800">
                <MathText>{'P(Sor_i \\cup Oszlop_j) = \\frac{\\sum Sor_i + \\sum Oszlop_j - Cella_{i,j}}{N}'}</MathText>
              </div>
            </div>
            <p className="text-[11px] text-blue-700 dark:text-blue-400 font-medium mt-1">
              💡 A margóösszegekből a közös cellát egyszer le kell vonni.
            </p>
          </div>

          {/* 5. Szabály */}
          <div className="bg-white dark:bg-slate-900/90 p-4 rounded-2xl border border-emerald-200 dark:border-emerald-800/60 shadow-xs flex flex-col justify-between md:col-span-2 lg:col-span-2">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-lg bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 font-black text-xs flex items-center justify-center">5</span>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">Sorrendek és egymás melletti blokkosítás</h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Ha <MathText>{'$n$'}</MathText> személy közül kettőnek egymás után kell következnie (pl. Anna és Kati 5 barátnőből):
              </p>
              <div className="my-2 p-2 bg-emerald-50 dark:bg-emerald-950/50 rounded-xl text-center font-bold text-emerald-800 dark:text-emerald-300 text-xs sm:text-sm border border-emerald-100 dark:border-emerald-800">
                <MathText>{'P(\\text{egymás után}) = \\frac{(n - 1) \\cdot 2! \\cdot (n - 2)!}{n!} = \\frac{2}{n}'}</MathText>
              </div>
            </div>
            <p className="text-[11px] text-emerald-700 dark:text-emerald-400 font-medium mt-1">
              💡 5 barátnőnél: <MathText>{'2 / 5 = 40\\%'}</MathText>, míg a komplementer (nem egymás után): <MathText>{'1 - 2/5 = 3/5 = 60\\%'}</MathText>.
            </p>
          </div>
        </div>
      </div>

      {/* 1. SZEKCIÓ: A LOGIKAI SZITA MÓDSZERE ÉS A VENN-DIAGRAM */}
      <TheorySection
        number={1}
        title="A logikai szita módszere és a Venn-diagram"
        badge="ALAPTÉTEL"
        badgeColor="rose"
        icon={<Layers className="w-4 h-4 text-rose-600" />}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 space-y-4">
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
              Gyakran találkozunk olyan helyzetekkel, ahol két esemény nem zárja ki egymást: előfordulhat, hogy <b>mindkettő egyszerre</b> bekövetkezik. 
              Ilyenkor a valószínűségeket nem szabad egyszerűen összeadni, mert a metszetet kétszer vennénk figyelembe!
            </p>

            <TheoryCard
              title="A tankönyvi 36 fős osztály példája"
              badge="MINTAPÉLDA"
              color="rose"
            >
              <div className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                <p>Egy 36 fős osztályban 9 diák tanulja emelt szinten a matematikát, 18 a történelmet, és 3 diák mindkét tantárgyat.</p>
                <ul className="space-y-1 pl-1 font-mono text-xs">
                  <li>• Csak matematika emelt: 9 – 3 = <b>6 fő</b></li>
                  <li>• Csak történelem emelt: 18 – 3 = <b>15 fő</b></li>
                  <li>• Mindkét tárgy emelt: <b>3 fő</b></li>
                  <li>• Legalább az egyik: 6 + 15 + 3 = <b>24 fő</b> (vagy 9 + 18 – 3 = 24)</li>
                  <li>• Egyik tantárgy sem emelt: 36 – 24 = <b>12 fő</b></li>
                </ul>
              </div>
            </TheoryCard>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                <span className="font-bold text-rose-700 dark:text-rose-400 block mb-0.5">P(egyik tárgyat sem):</span>
                <MathText>{'P = \\frac{12}{36} = \\frac{1}{3} \\approx 33,3\\%'}</MathText>
              </div>
              <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                <span className="font-bold text-purple-700 dark:text-purple-400 block mb-0.5">P(csak az egyik tárgyat):</span>
                <MathText>{'P = \\frac{6 + 15}{36} = \\frac{21}{36} = \\frac{7}{12} \\approx 58,3\\%'}</MathText>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col items-center justify-center p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200 dark:border-slate-800">
            <VennSetSieveSvg size={280} />
            <span className="text-xs text-slate-500 dark:text-slate-400 mt-2 text-center">
              Venn-diagram: Matematika és Történelem emelt csoportok a 36 fős osztályban
            </span>
          </div>
        </div>
      </TheorySection>

      {/* 2. SZEKCIÓ: BIZTOSÍTÁSI ÜGYFELEK ÉS NAGY ADATHALMAZOK */}
      <TheorySection
        number={2}
        title="Biztosítási statisztikák és reprezentatív felmérések"
        badge="GYAKORLATI ALKALMAZÁS"
        badgeColor="orange"
        icon={<Target className="w-4 h-4 text-orange-600" />}
      >
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            Egy biztosítótársaság 1000 ügyfele közül <b>611</b>-nek van gépjármű-biztosítása, <b>389</b>-nek lakásbiztosítása, és <b>96</b>-nak mindkét fajta biztosítása van.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
              <span className="text-[11px] font-black uppercase text-blue-600 dark:text-blue-400 block">
                1. Legalább az egyik fajta
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Logikai szitával levonjuk a kétszer számolt metszetet:
              </p>
              <div className="p-2.5 bg-blue-50 dark:bg-blue-950/40 rounded-xl text-xs font-mono text-blue-900 dark:text-blue-200 font-bold border border-blue-200 dark:border-blue-800">
                611 + 389 – 96 = 904 fő
                <div className="text-blue-600 dark:text-blue-400 mt-1">P = 904/1000 = 90,4%</div>
              </div>
            </div>

            <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
              <span className="text-[11px] font-black uppercase text-rose-600 dark:text-rose-400 block">
                2. Egyik fajtával sem bír
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Az unió komplementereként azonnal megkapjuk:
              </p>
              <div className="p-2.5 bg-rose-50 dark:bg-rose-950/40 rounded-xl text-xs font-mono text-rose-900 dark:text-rose-200 font-bold border border-rose-200 dark:border-rose-800">
                1000 – 904 = 96 fő
                <div className="text-rose-600 dark:text-rose-400 mt-1">P = 96/1000 = 9,6%</div>
              </div>
            </div>

            <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
              <span className="text-[11px] font-black uppercase text-purple-600 dark:text-purple-400 block">
                3. Csak az egyik fajtája van
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Csak gépjármű (515) + csak lakás (293):
              </p>
              <div className="p-2.5 bg-purple-50 dark:bg-purple-950/40 rounded-xl text-xs font-mono text-purple-900 dark:text-purple-200 font-bold border border-purple-200 dark:border-purple-800">
                515 + 293 = 808 fő
                <div className="text-purple-600 dark:text-purple-400 mt-1">P = 808/1000 = 80,8%</div>
              </div>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 3. SZEKCIÓ: KÉTDIMENZIÓS KERESZTTÁBLÁK AZ EGÉSZSÉGÜGYBEN */}
      <TheorySection
        number={3}
        title="Kétdimenziós gyakorisági táblák az orvostudományban"
        badge="KERESZTTÁBLA"
        badgeColor="pink"
        icon={<Grid className="w-4 h-4 text-pink-600" />}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 space-y-4">
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
              A véradók nyilvántartása szerint a legutóbbi véradási akció során <b>346 egység</b> vért vettek le (292 Rh-pozitív, 54 Rh-negatív; 191 0-s, 87 A-s, 52 B-s, 16 AB-s).
            </p>

            <TheoryCard
              title="Tipikus feladatok megoldása a kereszttáblából"
              color="pink"
            >
              <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                <div>
                  • <b>AB-s vagy B-s vércsoport:</b> A két csoport kizárja egymást, így összeadódnak:
                  <div className="font-mono font-bold text-pink-700 dark:text-pink-300 mt-0.5">
                    P = (16 + 52) / 346 = 68 / 346 ≈ 19,7%
                  </div>
                </div>
                <div>
                  • <b>0-s VAGY Rh-pozitív:</b> Mivel vannak 0-s Rh+ véradók is (161 db), a metszetet levonjuk:
                  <div className="font-mono font-bold text-pink-700 dark:text-pink-300 mt-0.5">
                    P(0 ∪ Rh+) = (191 + 292 – 161) / 346 = 322 / 346 ≈ 93,1%
                  </div>
                </div>
                <div>
                  • <b>Nem AB és nem Rh-:</b> A megmaradó 3 cella összege:
                  <div className="font-mono font-bold text-pink-700 dark:text-pink-300 mt-0.5">
                    (161 + 73 + 44) / 346 = 278 / 346 ≈ 80,3%
                  </div>
                </div>
              </div>
            </TheoryCard>
          </div>

          <div className="lg:col-span-5 flex flex-col items-center justify-center p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200 dark:border-slate-800">
            <BloodDonorCrossTableSvg size={280} />
            <span className="text-xs text-slate-500 dark:text-slate-400 mt-2 text-center">
              A 346 véradási egység kétdimenziós gyakorisági mátrixa
            </span>
          </div>
        </div>
      </TheorySection>

      {/* 4. SZEKCIÓ: SORRENDEK ÉS BLOKKOSÍTÁSI KOMBINATORIKA */}
      <TheorySection
        number={4}
        title="Sorrendi permutációk és egymás melletti belépés"
        badge="KOMBINATORIKA"
        badgeColor="purple"
        icon={<Users className="w-4 h-4 text-purple-600" />}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 space-y-4">
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
              Öt barátnő érkezik az előadóterembe, köztük <b>Anna és Kati</b>. Véletlenszerű sorrendben, egyesével lépnek a terembe.
            </p>

            <div className="space-y-3">
              <TheoryCard
                title="1. Anna lép be legelsőnek"
                badge="P = 1/5"
                color="blue"
              >
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  Mivel 5 egyenrangú lány van, mindegyikük pontosan ugyanolyan eséllyel léphet be legelsőnek:
                  <br />
                  <b className="text-blue-700 dark:text-blue-300 font-mono">P = 1/5 = 0,2 = 20%</b>.
                </p>
              </TheoryCard>

              <TheoryCard
                title="2. Anna és Kati egymás után lépnek be (Blokkosítás)"
                badge="P = 2/5"
                color="purple"
              >
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  Kezeljük Annát és Katit egyetlen összetett blokknak [AK vagy KA]. 
                  Így 4 egységet rendezünk el (4!), a blokkon belül 2! sorrend lehetséges:
                  <br />
                  <span className="font-mono text-purple-700 dark:text-purple-300 font-bold">
                    Kedvező esetek: 4! · 2! = 48 db ⟹ P = 48 / 120 = 2/5 = 40%
                  </span>
                </p>
              </TheoryCard>

              <TheoryCard
                title="3. Anna és Kati NEM egymás után lépnek be"
                badge="P = 3/5"
                color="pink"
              >
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  A komplementer esemény tétele alapján egyszerű kivonással:
                  <br />
                  <span className="font-mono text-pink-700 dark:text-pink-300 font-bold">
                    P = 1 – P(egymás után) = 1 – 2/5 = 3/5 = 60%
                  </span>
                </p>
              </TheoryCard>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col items-center justify-center p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200 dark:border-slate-800">
            <QueuePermutationSvg size={260} />
            <span className="text-xs text-slate-500 dark:text-slate-400 mt-2 text-center">
              A blokkosítási technika szemléltetése 5 személy belépésekor
            </span>
          </div>
        </div>
      </TheorySection>

      {/* 5. SZEKCIÓ: VISSZATEVÉS NÉLKÜLI MINTAVÉTEL ÉS FELELÉSEK */}
      <TheorySection
        number={5}
        title="Feltételes sorsolás és a felelések esélye"
        badge="VALÓSZÍNŰSÉGI FA"
        badgeColor="teal"
        icon={<CheckCircle2 className="w-4 h-4 text-teal-600" />}
      >
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            Ha történelemből veled együtt már csak <b>hatan nem feleltetek</b>, és a mai órán a tanár úr <b>két embert feleltet</b> egymás után:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-teal-50 dark:bg-teal-950/40 rounded-2xl border border-teal-200 dark:border-teal-800 space-y-2">
              <h4 className="font-bold text-sm text-teal-900 dark:text-teal-200">
                1. és 2. felelő valószínűsége
              </h4>
              <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-1.5 leading-relaxed">
                <li>• <b>Te leszel az 1. felelő:</b> 6 diák közül 1: <b className="font-mono text-teal-800 dark:text-teal-300">1/6</b>.</li>
                <li>• <b>Te leszel a 2. felelő:</b> Elsőre nem téged szólít (5/6), másodszorra téged szólít az 5 diákból (1/5): <br />
                  <span className="font-mono font-bold text-teal-800 dark:text-teal-300">(5/6) · (1/5) = 1/6</span>.
                </li>
              </ul>
            </div>

            <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl border border-emerald-200 dark:border-emerald-800 space-y-2">
              <h4 className="font-bold text-sm text-emerald-900 dark:text-emerald-200">
                Felelni fogsz a mai órán (Összegzés)
              </h4>
              <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-1.5 leading-relaxed">
                <li>• <b>Felelni fogsz (1. VAGY 2. felelő):</b> Egymást kizáró esetek, így összeadódnak: <br />
                  <span className="font-mono font-bold text-emerald-800 dark:text-emerald-300">1/6 + 1/6 = 2/6 = 1/3 ≈ 33,3%</span>.
                </li>
                <li>• <b>NEM fogsz felelni ma:</b> Komplementer esemény: <br />
                  <span className="font-mono font-bold text-emerald-800 dark:text-emerald-300">1 – 1/3 = 2/3 ≈ 66,7%</span>.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default PracticalProbTheory;

