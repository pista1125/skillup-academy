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
  BalanceMeanSvg,
  DeviationLineSvg,
  WeightedMeanBlocksSvg,
  TargetShootingSvg,
  OutlierImpactSvg
} from './AverageArithmeticFigures';
import {
  Calculator,
  Scale,
  Sparkles,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  TrendingUp,
  Target,
  Sliders,
  Plus,
  Trash2,
  RotateCcw,
  BookOpen,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AverageArithmeticTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

export const AverageArithmeticTheory: React.FC<AverageArithmeticTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // --- 1. Interaktív Mérleg & Eltérés Labor State ---
  const [dataPoints, setDataPoints] = useState<number[]>([4, 6, 9, 11, 15]);
  const [newPointInput, setNewPointInput] = useState<string>('10');

  // Számítások
  const n = dataPoints.length;
  const sum = dataPoints.reduce((acc, val) => acc + val, 0);
  const mean = n > 0 ? sum / n : 0;
  const deviations = dataPoints.map((val) => ({ val, dev: val - mean }));
  const negDevSum = deviations.filter((d) => d.dev < 0).reduce((acc, d) => acc + d.dev, 0);
  const posDevSum = deviations.filter((d) => d.dev > 0).reduce((acc, d) => acc + d.dev, 0);
  const totalDevSum = deviations.reduce((acc, d) => acc + d.dev, 0);

  const handleAddPoint = () => {
    const num = parseFloat(newPointInput);
    if (!isNaN(num) && n < 10) {
      setDataPoints([...dataPoints, num]);
      setNewPointInput('10');
    }
  };

  const handleRemovePoint = (index: number) => {
    if (n > 2) {
      setDataPoints(dataPoints.filter((_, i) => i !== index));
    }
  };

  const handleResetData = () => {
    setDataPoints([4, 6, 9, 11, 15]);
  };

  // --- 2. Célátlag Kalkulátor State (Hányas kell még a bizonyítványba?) ---
  const [currentGrades, setCurrentGrades] = useState<number[]>([4, 3, 3, 5, 5, 3]);
  const [targetAverage, setTargetAverage] = useState<number>(3.51);

  const gradeSum = currentGrades.reduce((a, b) => a + b, 0);
  const gradeCount = currentGrades.length;
  const currentAvg = gradeCount > 0 ? gradeSum / gradeCount : 0;

  // Szükséges új jegy x: (gradeSum + x) / (gradeCount + 1) >= targetAverage
  // x >= (gradeCount + 1) * targetAverage - gradeSum
  const neededScoreRaw = (gradeCount + 1) * targetAverage - gradeSum;
  const neededScoreRounded = Math.ceil(neededScoreRaw * 100) / 100;
  const requiredGrade = Math.ceil(neededScoreRaw);

  let targetStatusText = '';
  let targetStatusColor = '';

  if (requiredGrade <= 1) {
    targetStatusText = `Már biztosan megvan a célátlag! Akár egy 1-essel is eléred (átlagod: ${((gradeSum + 1) / (gradeCount + 1)).toFixed(2)}).`;
    targetStatusColor = 'text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800';
  } else if (requiredGrade <= 5) {
    targetStatusText = `Legalább ${requiredGrade}-es dolgozatot kell írnod a legalább ${targetAverage}-es átlaghoz (pontos számított küszöb: ${neededScoreRounded}).`;
    targetStatusColor = 'text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800';
  } else {
    targetStatusText = `Sajnos még egy 5-össel sem érhető el a ${targetAverage}-es átlag (ahhoz ${neededScoreRounded} pont kellene, a maximum 5).`;
    targetStatusColor = 'text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800';
  }

  // --- 3. Súlyozott Átlag (Dolgozatok & Órai munkák) ---
  const [singleWeightSum, setSingleWeightSum] = useState<number>(14); // pl. feleletek, órai jegyek összege
  const [singleWeightCount, setSingleWeightCount] = useState<number>(4);
  const [doubleWeightSum, setDoubleWeightSum] = useState<number>(18); // pl. témazárók jegyeinek összege
  const [doubleWeightCount, setDoubleWeightCount] = useState<number>(4);

  const weightedNumerator = singleWeightSum * 1 + doubleWeightSum * 2;
  const weightedDenominator = singleWeightCount * 1 + doubleWeightCount * 2;
  const computedWeightedAvg = weightedDenominator > 0 ? weightedNumerator / weightedDenominator : 0;

  // Interaktív labor szekció
  const interactiveSection = (
    <div className="space-y-6">
      <div className="flex items-center gap-2.5 text-emerald-800 dark:text-emerald-300">
        <Scale className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
        <h3 className="text-lg sm:text-xl font-black">Interaktív Statisztikai Laboratórium</h3>
      </div>

      {/* Labor 1: Kétkarú Mérleghinta & Eltérés-vizsgáló */}
      <div className="bg-slate-50 dark:bg-slate-800/60 p-4 sm:p-6 rounded-2xl border-2 border-emerald-200/80 dark:border-emerald-900/60 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-700 pb-3">
          <div>
            <h4 className="font-black text-slate-900 dark:text-white text-base">
              1. Mérleghinta és Eltérések Kiegyenlítődése
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Figyeld meg, hogyan lesz az átlagtól vett előjeles eltérések összege pontosan 0!
            </p>
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={handleResetData}
            className="h-8 text-xs font-bold gap-1 self-start sm:self-auto border-slate-300 hover:border-emerald-300"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Visszaállítás
          </Button>
        </div>

        {/* Adatpontok szerkesztése */}
        <div className="space-y-3">
          <div className="text-xs font-bold text-slate-700 dark:text-slate-300">
            Jelenlegi adatsor ({n} db szám):
          </div>
          <div className="flex flex-wrap gap-2 items-center">
            {dataPoints.map((val, idx) => (
              <div
                key={idx}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-xs font-black shadow-2xs"
              >
                <span className="text-slate-900 dark:text-white">{val}</span>
                <button
                  type="button"
                  onClick={() => handleRemovePoint(idx)}
                  disabled={n <= 2}
                  className="text-slate-400 hover:text-rose-500 disabled:opacity-30 transition-colors"
                  title="Törlés"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}

            {n < 10 && (
              <div className="flex items-center gap-1.5">
                <input
                  type="number"
                  value={newPointInput}
                  onChange={(e) => setNewPointInput(e.target.value)}
                  className="w-16 h-8 px-2 text-xs font-bold rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white text-center focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <Button
                  size="sm"
                  onClick={handleAddPoint}
                  className="h-8 px-2.5 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Hozzáadás
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Eredménykártyák */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div className="p-3 bg-white dark:bg-slate-700 rounded-xl border border-slate-200 dark:border-slate-600">
            <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400">Adatok száma (n)</div>
            <div className="text-lg font-black text-slate-900 dark:text-white mt-0.5">{n} db</div>
          </div>
          <div className="p-3 bg-white dark:bg-slate-700 rounded-xl border border-slate-200 dark:border-slate-600">
            <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400">Összeg (Σxᵢ)</div>
            <div className="text-lg font-black text-slate-900 dark:text-white mt-0.5">{sum}</div>
          </div>
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-300 dark:border-emerald-800">
            <div className="text-[11px] font-bold text-emerald-800 dark:text-emerald-300">Számtani közép (x̄)</div>
            <div className="text-lg font-black text-emerald-600 dark:text-emerald-400 mt-0.5">{mean.toFixed(2)}</div>
          </div>
          <div className="p-3 bg-indigo-50 dark:bg-indigo-950/40 rounded-xl border border-indigo-300 dark:border-indigo-800">
            <div className="text-[11px] font-bold text-indigo-800 dark:text-indigo-300">Eltérések összege</div>
            <div className="text-lg font-black text-indigo-600 dark:text-indigo-400 mt-0.5">
              {Math.abs(totalDevSum) < 0.0001 ? '0.00' : totalDevSum.toFixed(2)}
            </div>
          </div>
        </div>

        {/* Eltérések táblázatos levezetése */}
        <div className="bg-white dark:bg-slate-900/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700 overflow-x-auto">
          <div className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
            Előjeles eltérések vizsgálata az átlagtól (x̄ = {mean.toFixed(2)}):
          </div>
          <table className="w-full text-xs text-center border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700 text-slate-500">
                <th className="py-1 px-2 text-left">Adat (xᵢ)</th>
                {deviations.map((d, i) => (
                  <th key={i} className="py-1 px-2 font-bold text-slate-800 dark:text-slate-200">{d.val}</th>
                ))}
                <th className="py-1 px-2 text-emerald-600 font-black">Összeg</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 px-2 text-left font-bold text-slate-600 dark:text-slate-400">Eltérés (xᵢ - x̄)</td>
                {deviations.map((d, i) => (
                  <td
                    key={i}
                    className={`py-2 px-2 font-black ${
                      d.dev < 0
                        ? 'text-rose-600 dark:text-rose-400'
                        : d.dev > 0
                        ? 'text-blue-600 dark:text-blue-400'
                        : 'text-slate-600'
                    }`}
                  >
                    {d.dev > 0 ? `+${d.dev.toFixed(2)}` : d.dev.toFixed(2)}
                  </td>
                ))}
                <td className="py-2 px-2 font-black text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 rounded-lg">
                  0.00
                </td>
              </tr>
            </tbody>
          </table>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 flex flex-wrap justify-between">
            <span>Bal oldali (negatív) eltérések: <b className="text-rose-600">{negDevSum.toFixed(2)}</b></span>
            <span>Jobb oldali (pozitív) eltérések: <b className="text-blue-600">+{posDevSum.toFixed(2)}</b></span>
            <span className="font-bold text-emerald-600">Σ = 0.00 (Tökéletes egyensúly!)</span>
          </div>
        </div>
      </div>

      {/* Labor 2: "Hányas kell még?" Célátlag Kalkulátor */}
      <div className="bg-slate-50 dark:bg-slate-800/60 p-4 sm:p-6 rounded-2xl border-2 border-blue-200/80 dark:border-blue-900/60 shadow-xs space-y-4">
        <div className="border-b border-slate-200 dark:border-slate-700 pb-3">
          <h4 className="font-black text-slate-900 dark:text-white text-base flex items-center gap-2">
            <Target className="w-5 h-5 text-blue-600" />
            2. Célátlag Kalkulátor – Félévi / Év végi jegyszámítás
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Számítsd ki, legalább mekkora dolgozatot kell írnod a kívánt félévi jegy eléréséhez!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Bal: Bemeneti adatok */}
          <div className="space-y-3">
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Eddigi jegyeid (vesszővel vagy kattintással):
              </label>
              <div className="flex gap-1.5 mb-2">
                {[1, 2, 3, 4, 5].map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setCurrentGrades([...currentGrades, g])}
                    className="flex-1 py-1.5 rounded-lg bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 hover:border-blue-400 text-xs font-black text-slate-800 dark:text-white transition-colors"
                  >
                    +{g}
                  </button>
                ))}
              </div>
              <div className="p-2.5 bg-white dark:bg-slate-700 rounded-xl border border-slate-200 dark:border-slate-600 flex flex-wrap items-center gap-1.5 min-h-[42px]">
                {currentGrades.map((g, i) => (
                  <span
                    key={i}
                    onClick={() => setCurrentGrades(currentGrades.filter((_, idx) => idx !== i))}
                    className="cursor-pointer px-2 py-0.5 rounded-md bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-blue-200 text-xs font-black hover:bg-rose-100 hover:text-rose-700 transition-colors"
                    title="Kattints a törléshez"
                  >
                    {g} ×
                  </span>
                ))}
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Célátlag:
                </label>
                <span className="text-xs font-black text-blue-600 dark:text-blue-400">{targetAverage.toFixed(2)}</span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min="2.0"
                  max="5.0"
                  step="0.01"
                  value={targetAverage}
                  onChange={(e) => setTargetAverage(parseFloat(e.target.value))}
                  className="flex-1 accent-blue-600"
                />
                <button
                  type="button"
                  onClick={() => setTargetAverage(3.51)}
                  className="px-2 py-1 text-[11px] font-bold bg-slate-200 dark:bg-slate-700 rounded hover:bg-slate-300 text-slate-700 dark:text-slate-300"
                >
                  3,51 (4-es)
                </button>
                <button
                  type="button"
                  onClick={() => setTargetAverage(4.51)}
                  className="px-2 py-1 text-[11px] font-bold bg-slate-200 dark:bg-slate-700 rounded hover:bg-slate-300 text-slate-700 dark:text-slate-300"
                >
                  4,51 (5-ös)
                </button>
              </div>
            </div>
          </div>

          {/* Jobb: Számítás és visszajelzés */}
          <div className="flex flex-col justify-between space-y-3">
            <div className="p-3 bg-white dark:bg-slate-700 rounded-xl border border-slate-200 dark:border-slate-600 text-xs space-y-1">
              <div>Eddigi jegyek száma: <b className="text-slate-900 dark:text-white">{gradeCount} db</b></div>
              <div>Eddigi jegyek összege: <b className="text-slate-900 dark:text-white">{gradeSum}</b></div>
              <div>Jelenlegi átlagod: <b className="text-blue-600 dark:text-blue-400">{currentAvg.toFixed(2)}</b></div>
              <div className="text-[11px] text-slate-500 pt-1 border-t border-slate-100 dark:border-slate-600">
                Szükséges összeg: ({gradeCount} + 1) · {targetAverage.toFixed(2)} = {((gradeCount + 1) * targetAverage).toFixed(2)}
              </div>
            </div>

            <div className={`p-3.5 rounded-xl border text-xs font-bold leading-relaxed ${targetStatusColor}`}>
              {targetStatusText}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <TheoryTemplate
      title="Átlag, számtani közép"
      subtitle="Egyszerű és súlyozott számtani közép, eltérések összege, mérési adatok és célátlagok meghatározása"
      badge="10. OSZTÁLY • STATISZTIKA ÉS VALÓSZÍNŰSÉGSZÁMÍTÁS"
      themeColor="emerald"
      documentId="grade10-average-arithmetic-theory"
      quickRule={{
        label: 'FONTOS SZABÁLYOK AZ ÁTLAGHOZ',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-200 text-xs sm:text-sm">
            <div className="bg-emerald-50/90 dark:bg-emerald-950/40 p-2.5 rounded-xl border border-emerald-200 dark:border-emerald-800">
              <span className="font-black text-emerald-900 dark:text-emerald-300 block mb-1">
                Alapvető statisztikai összefüggések:
              </span>
              <ul className="space-y-1.5 text-slate-700 dark:text-slate-300 font-medium">
                <li>
                  • <strong>Átlag és összeg:</strong> <MathText>{'$\\bar{x} = \\frac{\\sum x_i}{n} \\iff \\sum x_i = n \\cdot \\bar{x}$'}</MathText>{' '}
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 font-normal">
                    (a ∑ szumma jel az adatok összegét jelenti)
                  </span>
                </li>
                <li>
                  • <strong>Súlyozott átlag:</strong> <MathText>{'$\\bar{x}_{\\text{súlyozott}} = \\frac{\\sum f_i x_i}{\\sum f_i}$'}</MathText>
                </li>
                <li>
                  • <strong>Eltérések összege:</strong> <MathText>{'$\\sum (x_i - \\bar{x}) = 0$'}</MathText>{' '}
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 font-normal">
                    (az átlagtól vett előjeles eltérések összege mindig nulla)
                  </span>
                </li>
              </ul>
            </div>
            <div className="bg-rose-50 dark:bg-rose-950/40 p-2 rounded-lg border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-300 text-[11px] leading-tight">
              <strong>⚠️ FONTOS CSAPDA:</strong> Csoportátlagokat <u>csak akkor</u> szabad egyszerűen átlagolni, ha a létszámuk pontosan megegyezik!
            </div>
          </div>
        )
      }}
      interactiveSection={interactiveSection}
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      practiceTitle="Teszteld a tudásodat az átlagszámításból!"
      practiceSubtitle="Oldd meg a 30 válogatott kompetencia- és érettségi típusú feladatot!"
      practiceButtonText="Átlag Kvíz indítása"
      tips={[
        {
          title: 'Az összeg az aranykulcs',
          content: 'Ha ismered n szám átlagát (x̄), azonnal számold ki az összegüket: Σxᵢ = n · x̄. Ebből bármelyik hiányzó adat egyetlen kivonással megadható!'
        },
        {
          title: 'Csoportátlagok csapdája',
          content: 'Soha ne vedd az átlagok egyszerű számtani közepét, kivéve ha a csoportok létszáma garantáltan pontosan ugyanakkora! Minden más esetben súlyozott átlag kötelező.'
        },
        {
          title: 'Az eltérések ellenőrzése',
          content: 'Ha ellenőrizni akarod az átlagodat, vond ki az átlagot minden adatból. Ha a pozitív és negatív eltérések összege pontosan 0, a számításod hibátlan!'
        }
      ]}
    >
      {/* Kiemelt Fontos Szabályok Szekció a Tananyag elején */}
      <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-cyan-50 dark:from-emerald-950/40 dark:via-teal-950/30 dark:to-cyan-950/30 rounded-2xl sm:rounded-3xl p-5 sm:p-7 border-2 border-emerald-300/80 dark:border-emerald-800 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-emerald-200/80 dark:border-emerald-800/80 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 sm:p-3 bg-emerald-600 text-white rounded-2xl shadow-md">
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-700 mb-1">
                SZABÁLYTÁR &amp; MEMÓRIAPANELL
              </div>
              <h2 className="text-lg sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                Fontos szabályok az átlagszámításban
              </h2>
            </div>
          </div>
          <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-100/80 dark:bg-emerald-900/40 px-3 py-1.5 rounded-xl border border-emerald-200 dark:border-emerald-800 self-start sm:self-auto">
            5 aranyszabály minden feladathoz
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
          {/* 1. Szabály */}
          <div className="bg-white dark:bg-slate-900/90 p-4 rounded-2xl border border-emerald-200 dark:border-emerald-800/60 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-lg bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 font-black text-xs flex items-center justify-center">1</span>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">Az átlag és összeg kapcsolata</h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Ha ismered <MathText>{'$n$'}</MathText> adat átlagát (<MathText>{'$\\bar{x}$'}</MathText>), azonnal megvan az adatok összege is (a <MathText>{'$\\sum$'}</MathText> szumma jel az összegzést jelöli: <MathText>{'$x_1 + x_2 + \\dots + x_n$'}</MathText>):
              </p>
              <div className="my-2 p-2 bg-emerald-50 dark:bg-emerald-950/50 rounded-xl text-center font-bold text-emerald-800 dark:text-emerald-300 text-xs sm:text-sm border border-emerald-100 dark:border-emerald-800">
                <MathText>{'$\\sum_{i=1}^n x_i = n \\cdot \\bar{x}$'}</MathText>
              </div>
            </div>
            <p className="text-[11px] text-emerald-700 dark:text-emerald-400 font-medium mt-1">
              💡 Hiányzó adat kiszámításakor először mindig az összeget határozd meg!
            </p>
          </div>

          {/* 2. Szabály */}
          <div className="bg-white dark:bg-slate-900/90 p-4 rounded-2xl border border-teal-200 dark:border-teal-800/60 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-lg bg-teal-100 dark:bg-teal-900/60 text-teal-800 dark:text-teal-300 font-black text-xs flex items-center justify-center">2</span>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">A súlyozott átlag szabálya</h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Ha az adatok <MathText>{'$f_i$'}</MathText> gyakorisággal vagy eltérő súlyokkal szerepelnek:
              </p>
              <div className="my-2 p-2 bg-teal-50 dark:bg-teal-950/50 rounded-xl text-center font-bold text-teal-800 dark:text-teal-300 text-xs sm:text-sm border border-teal-100 dark:border-teal-800">
                <MathText>{'$\\bar{x}_{\\text{súlyozott}} = \\frac{\\sum f_i x_i}{\\sum f_i}$'}</MathText>
              </div>
            </div>
            <p className="text-[11px] text-teal-700 dark:text-teal-400 font-medium mt-1">
              💡 Az értékeket a súlyukkal szorozzuk, és az összesített súllyal osztunk.
            </p>
          </div>

          {/* 3. Szabály */}
          <div className="bg-white dark:bg-slate-900/90 p-4 rounded-2xl border border-indigo-200 dark:border-indigo-800/60 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-lg bg-indigo-100 dark:bg-indigo-900/60 text-indigo-800 dark:text-indigo-300 font-black text-xs flex items-center justify-center">3</span>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">Az eltérések aranyszabálya</h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Az átlagtól vett előjeles eltérések összege minden valós adatsornál pontosan nulla:
              </p>
              <div className="my-2 p-2 bg-indigo-50 dark:bg-indigo-950/50 rounded-xl text-center font-bold text-indigo-800 dark:text-indigo-300 text-xs sm:text-sm border border-indigo-100 dark:border-indigo-800">
                <MathText>{'$\\sum_{i=1}^n (x_i - \\bar{x}) = 0$'}</MathText>
              </div>
            </div>
            <p className="text-[11px] text-indigo-700 dark:text-indigo-400 font-medium mt-1">
              💡 A pozitív és negatív eltérések tökéletesen kiegyensúlyozzák a mérleget.
            </p>
          </div>

          {/* 4. Szabály */}
          <div className="bg-white dark:bg-slate-900/90 p-4 rounded-2xl border border-blue-200 dark:border-blue-800/60 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-lg bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-blue-300 font-black text-xs flex items-center justify-center">4</span>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">Lineáris változások hatása</h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Minden adat <MathText>{'$c$'}</MathText>-vel való növelése vagy szorzása az átlagot is módosítja:
              </p>
              <div className="my-2 p-2 bg-blue-50 dark:bg-blue-950/50 rounded-xl text-center font-bold text-blue-800 dark:text-blue-300 text-xs sm:text-sm border border-blue-100 dark:border-blue-800">
                <MathText>{'$\\overline{x + c} = \\bar{x} + c \\quad \\text{és} \\quad \\overline{c \\cdot x} = c \\cdot \\bar{x}$'}</MathText>
              </div>
            </div>
            <p className="text-[11px] text-blue-700 dark:text-blue-400 font-medium mt-1">
              💡 Pl. +2 pluszpont minden dolgozatra pontosan 2-vel növeli az átlagot.
            </p>
          </div>

          {/* 5. Szabály - Csapda */}
          <div className="md:col-span-2 lg:col-span-2 bg-gradient-to-r from-rose-50 to-amber-50 dark:from-rose-950/40 dark:to-amber-950/40 p-4 rounded-2xl border-2 border-rose-300/80 dark:border-rose-800 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
                <h3 className="font-black text-sm text-rose-950 dark:text-rose-200">
                  5. FONTOS CSAPDA: Csoportátlagok egyszerű átlagolása TILOS!
                </h3>
              </div>
              <p className="text-xs text-rose-900 dark:text-rose-300 leading-relaxed">
                Két vagy több csoport (pl. két osztály vagy két mintacsoport) átlagát <b>KIZÁRÓLAG AKKOR</b> szabad egyszerűen átlagolni, ha a létszámuk pontosan megegyezik (<MathText>{'$n_1 = n_2$'}</MathText>). Ha a létszámok különböznek, <b>kizárólag súlyozott átlaggal</b> kapható meg a helyes összesített átlag!
              </p>
            </div>
            <div className="mt-2 pt-2 border-t border-rose-200/80 dark:border-rose-800/80 flex items-center justify-between text-[11px] font-bold text-rose-800 dark:text-rose-300">
              <span>Helyes képlet: <MathText>{'$\\bar{x}_{\\text{össz}} = \\frac{n_1 \\bar{x}_1 + n_2 \\bar{x}_2}{n_1 + n_2}$'}</MathText></span>
              <span className="hidden sm:inline bg-rose-200/80 dark:bg-rose-900/60 px-2 py-0.5 rounded text-rose-900 dark:text-rose-200">Gyakori érettségi buktató!</span>
            </div>
          </div>
        </div>
      </div>

      {/* 1. Szekció: Az egyszerű számtani közép fogalma */}
      <TheorySection
        number={1}
        title="A számtani közép (átlag) alapfogalma és képlete"
        badge="ALAPFOGALOM"
        badgeColor="emerald"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 space-y-4">
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              A statisztikában az egyik leggyakrabban használt <b>középérték</b> (helyzetmutató) a <b>számtani közép</b>, amelyet a hétköznapi életben egyszerűen <b>átlagnak</b> nevezünk.
            </p>

            <TheoryCard
              title="A számtani közép definíciója"
              type="definition"
            >
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                Adott <MathText>$n$</MathText> darab valós szám: <MathText>$x_1, x_2, \dots, x_n$</MathText>. Ezen számok számtani közepét (jele: <MathText>{'$\\bar{x}$'}</MathText>, olvasd: <i>x-vonás</i>) úgy kapjuk meg, hogy <b>az elemek összegét elosztjuk a számok darabszámával</b>:
              </p>
              <div className="my-2 p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl text-center font-black text-emerald-800 dark:text-emerald-300 text-sm sm:text-base border border-emerald-200 dark:border-emerald-800">
                <MathText>{'$\\bar{x} = \\frac{x_1 + x_2 + \\dots + x_n}{n} = \\frac{\\sum_{i=1}^n x_i}{n}$'}</MathText>
              </div>
            </TheoryCard>

            <TheoryCallout title="Mintapélda az összeg visszaszámolására" type="example">
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                Egy 4 fős baráti társaság tagjainak átlagéletkora <b>15 év</b>. Mennyi az életkoraik összege?
                <br />
                Mivel <MathText>{'$\\bar{x} = 15$'}</MathText> és <MathText>$n = 4$</MathText>, ezért az összegük:
                <br />
                <span className="font-bold text-emerald-700 dark:text-emerald-300">
                  <MathText>{'$\\sum x_i = n \\cdot \\bar{x} = 4 \\cdot 15 = 60\\text{ év}$'}</MathText>
                </span>.
                <br />
                Ha egy új, 20 éves barát csatlakozik hozzájuk, az új átlag:
                <MathText>{'$\\bar{x}_{\\text{új}} = \\frac{60 + 20}{5} = \\frac{80}{5} = 16\\text{ év}$'}</MathText>.
              </p>
            </TheoryCallout>
          </div>

          <div className="lg:col-span-5 flex flex-col items-center justify-center p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <BalanceMeanSvg size={240} />
            <span className="text-xs text-slate-500 dark:text-slate-400 mt-2 text-center font-medium">
              Az átlag (<MathText>{'$\\bar{x}$'}</MathText>) az adatsor súlypontja: ahol a képzeletbeli mérleg egyensúlyban áll
            </span>
          </div>
        </div>
      </TheorySection>

      {/* 2. Szekció: Súlyozott számtani közép */}
      <TheorySection
        number={2}
        title="A súlyozott számtani közép"
        badge="GYAKORISÁG ÉS SÚLY"
        badgeColor="blue"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 space-y-4">
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              Gyakran előfordul, hogy egy-egy mérési érték vagy érdemjegy nem egyszer, hanem <b>többször is szerepel</b> egy adathalmazban (adott a gyakoriságuk), vagy egyes jegyeknek <b>nagyobb a jelentősége</b> (pl. a témazáró dolgozat duplán számít). Ilyenkor súlyozott átlagot számítunk.
            </p>

            <TheoryCard
              title="A súlyozott számtani közép képlete"
              type="theorem"
            >
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                Ha az <MathText>$x_1, x_2, \dots, x_k$</MathText> értékek rendre <MathText>$f_1, f_2, \dots, f_k$</MathText> gyakorisággal (vagy súllyal) szerepelnek, akkor a súlyozott átlag:
              </p>
              <div className="my-2 p-3 bg-blue-50 dark:bg-blue-950/40 rounded-xl text-center font-black text-blue-800 dark:text-blue-300 text-sm sm:text-base border border-blue-200 dark:border-blue-800">
                <MathText>{'$\\bar{x} = \\frac{f_1 x_1 + f_2 x_2 + \\dots + f_k x_k}{f_1 + f_2 + \\dots + f_k} = \\frac{\\sum_{i=1}^k f_i x_i}{\\sum_{i=1}^k f_i}$'}</MathText>
              </div>
            </TheoryCard>

            <TheoryCallout title="Tankönyvi feladat: Kata 20 kockadobása" type="example">
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                Kata 20-szor dobott egy szabályos dobókockával. Dobásainak gyakorisága:
                <br />
                • 1-es: 2 db, 2-es: 2 db, 3-as: 4 db, 4-es: 4 db, 5-ös: 5 db, 6-os: <MathText>$20 - 17 = 3$</MathText> db.
                <br />
                A dobások súlyozott átlaga:
                <br />
                <span className="font-bold text-blue-700 dark:text-blue-300">
                  <MathText>{'$\\bar{x} = \\frac{2\\cdot 1 + 2\\cdot 2 + 4\\cdot 3 + 4\\cdot 4 + 5\\cdot 5 + 3\\cdot 6}{20} = \\frac{2 + 4 + 12 + 16 + 25 + 18}{20} = \\frac{77}{20} = 3,85$'}</MathText>
                </span>
              </p>
            </TheoryCallout>
          </div>

          <div className="lg:col-span-5 flex flex-col items-center justify-center p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <WeightedMeanBlocksSvg size={250} />
            <span className="text-xs text-slate-500 dark:text-slate-400 mt-2 text-center font-medium">
              Súlyozott számtani közép: az értékek nagysága és a hozzájuk tartozó gyakorisági blokkok szorzata
            </span>
          </div>
        </div>
      </TheorySection>

      {/* 3. Szekció: Az átlag alaptulajdonságai */}
      <TheorySection
        number={3}
        title="Az átlag alapvető matematikai tulajdonságai"
        badge="TULAJDONSÁGOK ÉS TÉTELEK"
        badgeColor="indigo"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 space-y-4">
            <TheoryCard
              title="1. Tétel: Az átlagtól vett eltérések összege mindig nulla"
              type="theorem"
            >
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                Bármely valós adatsor esetén az adatok átlagtól való előjeles eltéréseinek összege pontosan 0:
              </p>
              <div className="my-2 p-2.5 bg-indigo-50 dark:bg-indigo-950/40 rounded-xl text-center font-black text-indigo-700 dark:text-indigo-300 text-sm border border-indigo-200 dark:border-indigo-800">
                <MathText>{'$\\sum_{i=1}^n (x_i - \\bar{x}) = 0$'}</MathText>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mt-1">
                <b>Bizonyítás:</b> Bontsuk fel az összeget két külön összegre:
                <br />
                <MathText>{'$\\sum_{i=1}^n (x_i - \\bar{x}) = \\sum_{i=1}^n x_i - \\sum_{i=1}^n \\bar{x} = (n \\cdot \\bar{x}) - (n \\cdot \\bar{x}) = 0$'}</MathText>. Q.E.D.
              </p>
            </TheoryCard>

            <TheoryCard
              title="2. Lineáris transzformációk (Állandó hozzáadása és szorzás)"
              type="property"
            >
              <ul className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 space-y-2 list-disc list-inside">
                <li>
                  <b>Állandó hozzáadása:</b> Ha minden adathoz hozzáadunk egy <MathText>$c$</MathText> konstans számot, az új adatsor átlaga is pontosan <MathText>$c$</MathText>-vel nő:
                  <br />
                  <span className="font-bold text-indigo-600 dark:text-indigo-400 pl-4">
                    <MathText>{'$\\overline{x + c} = \\bar{x} + c$'}</MathText>
                  </span>
                  <span className="text-xs text-slate-500 block pl-4">
                    (Pl. ha a tanár mindenkinek ad +2 pluszpontot a dolgozatra, az osztályátlag is 2 ponttal emelkedik.)
                  </span>
                </li>
                <li>
                  <b>Konstanssal szorzás:</b> Ha minden adatot megszorzunk egy <MathText>$c$</MathText> számmal, az új átlag is az eredeti átlag <MathText>$c$</MathText>-szerese lesz:
                  <br />
                  <span className="font-bold text-indigo-600 dark:text-indigo-400 pl-4">
                    <MathText>{'$\\overline{c \\cdot x} = c \\cdot \\bar{x}$'}</MathText>
                  </span>
                  <span className="text-xs text-slate-500 block pl-4">
                    (Pl. ha az árak 15%-kal nőnek, minden adat 1,15-szorosára változik, így az átlagár is 1,15-szörösére nő.)
                  </span>
                </li>
              </ul>
            </TheoryCard>
          </div>

          <div className="lg:col-span-5 flex flex-col items-center justify-center p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <DeviationLineSvg size={250} />
            <span className="text-xs text-slate-500 dark:text-slate-400 mt-2 text-center font-medium">
              A számegyenesen a negatív és pozitív eltérés-vektorok összege kiejti egymást (<MathText>{'$\\Sigma d_i = 0$'}</MathText>)
            </span>
          </div>
        </div>
      </TheorySection>

      {/* 4. Szekció: Csapdák és kiugró értékek */}
      <TheorySection
        number={4}
        title="Tipikus csapdák és az átlag érzékenysége"
        badge="CSAPDÁK ÉS BUKTATÓK"
        badgeColor="rose"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 space-y-4">
            <TheoryTrapBox title="1. Buktató: A kiugró értékek (outlierek) torzító hatása">
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                A számtani közép <b>nem robusztus</b> statisztikai mutató: rendkívül érzékeny a szélsőséges értékekre!
                <br />
                Képzeljünk el egy kisvállalkozást, ahol 4 dolgozó fizetése: 200, 210, 220 és 230 ezer Ft. Az átlag: <b>215 ezer Ft</b>, ami kiválóan reprezentálja a csapatot.
                <br />
                Ha azonban az ügyvezető havi 1 500 000 Ft-ot vesz fel, az 5 ember új átlagfizetése:
                <br />
                <span className="font-bold text-rose-600 dark:text-rose-400">
                  <MathText>{'$\\bar{x} = \\frac{200 + 210 + 220 + 230 + 1500}{5} = \\frac{2360}{5} = 472\\text{ ezer Ft}$'}</MathText>
                </span>.
                <br />
                Bár a statisztika 472 ezer forintos átlagbért mutat, <b>az 5 dolgozóból 4 jóval kevesebbet keres</b> ennél! Ezért félrevezető az átlag használata aszimmetrikus adatoknál.
              </p>
            </TheoryTrapBox>

            <TheoryTrapBox title="2. Buktató: Átlagok egyszerű átlagolása csoportoknál">
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                A 10.A osztály (30 fő) matematika átlaga <b>4,0</b>. A 10.B osztály (10 fő) átlaga <b>2,0</b>.
                <br />
                <span className="text-rose-600 font-bold">Hibás módszer:</span> <MathText>{'$(4,0 + 2,0) / 2 = 3,0$'}</MathText>.
                <br />
                <span className="text-emerald-700 dark:text-emerald-400 font-bold">Helyes módszer (súlyozott átlag):</span>
                <br />
                <MathText>{'$\\bar{x} = \\frac{30 \\cdot 4,0 + 10 \\cdot 2,0}{30 + 10} = \\frac{120 + 20}{40} = \\frac{140}{40} = 3,5$'}</MathText>!
              </p>
            </TheoryTrapBox>
          </div>

          <div className="lg:col-span-5 flex flex-col items-center justify-center p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <OutlierImpactSvg size={250} />
            <span className="text-xs text-slate-500 dark:text-slate-400 mt-2 text-center font-medium">
              Egyetlen kiugró adat eltolja a súlypontot, és megtévesztő képet ad a sokaságról
            </span>
          </div>
        </div>
      </TheorySection>

      {/* 5. Szekció: Kompetencia és érettségi alkalmazások */}
      <TheorySection
        number={5}
        title="Gyakorlati, kompetencia és érettségi feladatok"
        badge="VALÓS ALKALMAZÁSOK"
        badgeColor="teal"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 space-y-4">
            <TheoryCard
              title="Kompetenciamérés feladat: Feri lövészversenye"
              type="example"
            >
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                Feri 5 lövésből álló versenyen vesz részt. Az első négy találata: <b>8, 8, 9 és 10 pont</b>. A győzelemhez <b>8,6-nél szigorúan nagyobb találati átlag</b> szükséges. Legalább hány pontos találat kell az 5. lövésnél?
              </p>
              <div className="p-3 bg-teal-50 dark:bg-teal-950/40 rounded-xl text-xs sm:text-sm space-y-1.5 border border-teal-200 dark:border-teal-800">
                <div><b>1. Lépés:</b> Jelöljük az 5. lövést <MathText>$x$</MathText>-szel. A találatok átlaga: <MathText>{'$\\frac{8 + 8 + 9 + 10 + x}{5} > 8,6$'}</MathText></div>
                <div><b>2. Lépés:</b> Az eddigi pontok összege: <MathText>{'$35 + x > 5 \\cdot 8,6$'}</MathText></div>
                <div><b>3. Lépés:</b> <MathText>{'$35 + x > 43 \\implies x > 8$'}</MathText></div>
                <div className="font-bold text-teal-800 dark:text-teal-300 pt-1 border-t border-teal-200">
                  Mivel a találat egész szám és <MathText>{'$x > 8$'}</MathText>, ezért <b>legalább 9 pontos lövés</b> szükséges a győzelemhez!
                </div>
              </div>
            </TheoryCard>

            <TheoryCard
              title="Gergő kosárlabdázik (Kompetenciamérés, 2006)"
              type="example"
            >
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                Az utolsó előtti meccsig Gergő összesen <b>73 pontot</b> dobott, mérkőzésenkénti pontátlaga <b>14,6</b> volt. Az utolsó meccsen <b>20 pontot</b> dobott.
                <br />
                <b>a) Hány meccset játszott összesen?</b>
                <br />
                Eddigi meccsek száma: <MathText>{'$73 / 14,6 = 5$'}</MathText>. Az utolsó meccsel együtt: <MathText>$5 + 1 = 6$</MathText> meccset játszott.
                <br />
                <b>b) Mennyi lett az új pontátlaga?</b>
                <br />
                Új összpontszám: <MathText>$73 + 20 = 93$</MathText>. Új átlag: <MathText>{'$\\bar{x} = 93 / 6 = 15,5\\text{ pont}$'}</MathText>.
              </p>
            </TheoryCard>
          </div>

          <div className="lg:col-span-5 flex flex-col items-center justify-center p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <TargetShootingSvg size={240} />
            <span className="text-xs text-slate-500 dark:text-slate-400 mt-2 text-center font-medium">
              A céltábla pontszámai és az 5. döntő lövés határérték-számítása
            </span>
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default AverageArithmeticTheory;

