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
  TwoDiceSumGridSvg,
  RockPaperScissorsLizardSpockSvg,
  CardDrawTreeGraphSvg
} from './ClassicalProbFigures';
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
  Play,
  Grid
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ClassicalProbTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

export const ClassicalProbTheory: React.FC<ClassicalProbTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // --- Interaktív Két Dobókocka Laboratórium State ---
  const [selectedSum, setSelectedSum] = useState<number | null>(7);
  const [gridMode, setGridMode] = useState<'sum' | 'product'>('sum');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'square' | 'even' | 'six'>('all');

  // Szimulációs kísérletek state
  const [simRolls, setSimRolls] = useState<number>(0);
  const [sumCounts, setSumCounts] = useState<number[]>(Array(13).fill(0));

  const handleSelectSum = (val: number) => {
    setSelectedSum(val);
    setGridMode('sum');
  };

  const handleSimulateRolls = (count: number) => {
    const newCounts = [...sumCounts];
    for (let i = 0; i < count; i++) {
      const d1 = Math.floor(Math.random() * 6) + 1;
      const d2 = Math.floor(Math.random() * 6) + 1;
      newCounts[d1 + d2]++;
    }
    setSumCounts(newCounts);
    setSimRolls((prev) => prev + count);
  };

  const handleResetSim = () => {
    setSimRolls(0);
    setSumCounts(Array(13).fill(0));
    setSelectedSum(7);
  };

  // Elméleti kedvező esetek számítása két kocka összegére
  const theoreticalSums: Record<number, number> = {
    2: 1, 3: 2, 4: 3, 5: 4, 6: 5, 7: 6, 8: 5, 9: 4, 10: 3, 11: 2, 12: 1
  };

  // Interaktív labor szekció JSX
  const interactiveSection = (
    <div className="bg-slate-900 text-white p-5 sm:p-7 rounded-2xl sm:rounded-3xl shadow-xl space-y-6 border border-purple-800/50">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-purple-800/60 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-purple-600 text-white rounded-2xl shadow-lg">
            <Dices className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-black text-purple-100">
              Interaktív Két Dobókocka Rácslaboratórium
            </h3>
            <p className="text-xs text-purple-300/80">
              Kattints az összegekre vagy szorzatokra, és figyeld meg a kedvező rácsmezők eloszlását a 36 elemi esemény között!
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            className={`text-xs h-8 ${gridMode === 'sum' ? 'bg-purple-600 text-white border-purple-400' : 'bg-slate-800 text-slate-300 border-slate-700'}`}
            onClick={() => setGridMode('sum')}
          >
            Összegek vizsgálata
          </Button>
          <Button
            size="sm"
            variant="outline"
            className={`text-xs h-8 ${gridMode === 'product' ? 'bg-purple-600 text-white border-purple-400' : 'bg-slate-800 text-slate-300 border-slate-700'}`}
            onClick={() => setGridMode('product')}
          >
            Szorzatok vizsgálata
          </Button>
        </div>
      </div>

      {gridMode === 'sum' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* 6x6 Interaktív Rács */}
          <div className="lg:col-span-7 bg-slate-950 p-4 sm:p-5 rounded-2xl border border-slate-800">
            <div className="flex items-center justify-between mb-3 text-xs text-slate-400">
              <span className="font-bold text-slate-300">Két kocka összege (6 × 6 = 36 mező)</span>
              <span>1. kocka (sorok) / 2. kocka (oszlopok)</span>
            </div>

            <div className="grid grid-cols-7 gap-1.5 text-center text-xs sm:text-sm font-bold">
              {/* Fejléc oszlop */}
              <div className="p-2 text-slate-500 font-normal">🎲</div>
              {[1, 2, 3, 4, 5, 6].map((col) => (
                <div key={`head-${col}`} className="p-2 bg-slate-800/80 text-purple-300 rounded-lg">
                  {col}
                </div>
              ))}

              {/* Rácssorok */}
              {[1, 2, 3, 4, 5, 6].map((row) => (
                <React.Fragment key={`row-${row}`}>
                  <div className="p-2 bg-slate-800/80 text-purple-300 rounded-lg flex items-center justify-center">
                    {row}
                  </div>
                  {[1, 2, 3, 4, 5, 6].map((col) => {
                    const sum = row + col;
                    const isSelected = selectedSum === sum;
                    const isSeven = sum === 7;
                    const isEight = sum === 8;

                    let bgClass = 'bg-slate-800/40 text-slate-300 border border-slate-700/50 hover:bg-slate-700/60';
                    if (isSelected) {
                      bgClass = 'bg-purple-600 text-white font-black border-2 border-purple-300 scale-105 shadow-md z-10';
                    } else if (isSeven) {
                      bgClass = 'bg-emerald-950/40 text-emerald-300 border border-emerald-800/50';
                    } else if (isEight) {
                      bgClass = 'bg-amber-950/40 text-amber-300 border border-amber-800/50';
                    }

                    return (
                      <button
                        key={`cell-${row}-${col}`}
                        onClick={() => setSelectedSum(sum)}
                        className={`p-2 rounded-lg transition-all flex flex-col items-center justify-center cursor-pointer ${bgClass}`}
                        title={`Dobás: (${row}, ${col}) → Összeg: ${sum}`}
                      >
                        <span className="text-xs sm:text-sm">{sum}</span>
                        <span className="text-[9px] opacity-60 font-normal hidden sm:inline">({row},{col})</span>
                      </button>
                    );
                  })}
                </React.Fragment>
              ))}
            </div>

            {/* Összegválasztó gombok */}
            <div className="mt-4 pt-3 border-t border-slate-800 flex flex-wrap items-center gap-1.5 justify-center">
              <span className="text-xs text-slate-400 mr-1">Válassz összeget:</span>
              {[2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((s) => (
                <Button
                  key={`btn-sum-${s}`}
                  size="sm"
                  variant={selectedSum === s ? 'default' : 'outline'}
                  className={`h-7 px-2 text-xs font-bold rounded-lg ${
                    selectedSum === s
                      ? 'bg-purple-600 text-white hover:bg-purple-500'
                      : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                  }`}
                  onClick={() => setSelectedSum(s)}
                >
                  {s}
                </Button>
              ))}
            </div>
          </div>

          {/* Részletes valószínűségi adatlap & Zsombor csapdája */}
          <div className="lg:col-span-5 space-y-4">
            {selectedSum !== null ? (
              <div className="bg-slate-950 p-5 rounded-2xl border border-purple-800/60 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-[10px] font-black uppercase text-purple-400 tracking-wider">Kiválasztott esemény</span>
                    <h4 className="text-xl font-black text-white">Összeg = {selectedSum}</h4>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-black text-purple-400">
                      {theoreticalSums[selectedSum]}/36
                    </span>
                    <span className="block text-[11px] text-slate-400">
                      ≈ {((theoreticalSums[selectedSum] / 36) * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>

                <div className="text-xs text-slate-300 space-y-2">
                  <div className="font-semibold text-purple-200">Kedvező kimenetelek listája ({theoreticalSums[selectedSum]} db):</div>
                  <div className="flex flex-wrap gap-1.5">
                    {[1, 2, 3, 4, 5, 6].map((row) =>
                      [1, 2, 3, 4, 5, 6]
                        .filter((col) => row + col === selectedSum)
                        .map((col) => (
                          <span
                            key={`pair-${row}-${col}`}
                            className="px-2 py-1 rounded bg-purple-900/60 text-purple-200 text-xs font-mono font-bold border border-purple-700/50"
                          >
                            ({row}, {col})
                          </span>
                        ))
                    )}
                  </div>
                </div>

                {/* Zsombor csapdája hívás ha 7 vagy 8 */}
                {(selectedSum === 7 || selectedSum === 8) && (
                  <div className="p-3 bg-amber-950/40 rounded-xl border border-amber-800/60 text-xs text-amber-200 space-y-1">
                    <div className="font-bold flex items-center gap-1.5 text-amber-300">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>Zsombor csapdája: 7 vs. 8</span>
                    </div>
                    <p className="text-[11px] leading-relaxed text-amber-100/90">
                      Mindkét szám felírható 3 számpár összegeként (7 = 1+6, 2+5, 3+4 és 8 = 2+6, 3+5, 4+4). De a 4+4 kockadobásnál csak <b>1 rácsmezőt</b> jelent, míg az eltérő párok <b>2-2 mezőt</b> (pl. (2,6) és (6,2)). Ezért a 7 esélye <b>6/36 (16,7%)</b>, a 8 esélye pedig csak <b>5/36 (13,9%)</b>!
                    </p>
                  </div>
                )}

                {/* Élő szimulációs sáv */}
                <div className="pt-3 border-t border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Összes szimulált dobás:</span>
                    <span className="font-bold text-white">{simRolls} db</span>
                  </div>
                  {simRolls > 0 && (
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400">Kísérleti relatív gyakoriság:</span>
                      <span className="font-bold text-emerald-400">
                        {sumCounts[selectedSum]}/{simRolls} ({((sumCounts[selectedSum] / simRolls) * 100).toFixed(1)}%)
                      </span>
                    </div>
                  )}

                  <div className="flex items-center gap-2 pt-1">
                    <Button
                      size="sm"
                      onClick={() => handleSimulateRolls(50)}
                      className="flex-1 h-8 text-xs font-bold bg-purple-700 hover:bg-purple-600 text-white"
                    >
                      +50 dobás
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleSimulateRolls(200)}
                      className="flex-1 h-8 text-xs font-bold bg-indigo-700 hover:bg-indigo-600 text-white"
                    >
                      +200 dobás
                    </Button>
                    {simRolls > 0 && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={handleResetSim}
                        className="h-8 px-2 text-xs border-slate-700 text-slate-300 hover:bg-slate-800"
                        title="Szimuláció visszaállítása"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      ) : (
        /* Szorzatok vizsgálata */
        <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div>
              <h4 className="font-bold text-sm text-purple-200">Két kocka pontjainak szorzata</h4>
              <p className="text-xs text-slate-400">Szűrj a speciális kimenetelekre!</p>
            </div>
            <div className="flex flex-wrap gap-1.5">
              <Button
                size="sm"
                variant={selectedFilter === 'all' ? 'default' : 'outline'}
                className="h-7 text-xs"
                onClick={() => setSelectedFilter('all')}
              >
                Összes szorzat
              </Button>
              <Button
                size="sm"
                variant={selectedFilter === 'square' ? 'default' : 'outline'}
                className="h-7 text-xs bg-emerald-900/60 border-emerald-700 text-emerald-200"
                onClick={() => setSelectedFilter('square')}
              >
                Négyzetszámok (8 db)
              </Button>
              <Button
                size="sm"
                variant={selectedFilter === 'six' ? 'default' : 'outline'}
                className="h-7 text-xs bg-cyan-900/60 border-cyan-700 text-cyan-200"
                onClick={() => setSelectedFilter('six')}
              >
                Szorzat = 6 (4 db)
              </Button>
              <Button
                size="sm"
                variant={selectedFilter === 'even' ? 'default' : 'outline'}
                className="h-7 text-xs bg-indigo-900/60 border-indigo-700 text-indigo-200"
                onClick={() => setSelectedFilter('even')}
              >
                Páros szorzat (27 db)
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1.5 text-center text-xs font-bold max-w-xl mx-auto">
            <div className="p-2 text-slate-500 font-normal">✖</div>
            {[1, 2, 3, 4, 5, 6].map((col) => (
              <div key={`p-head-${col}`} className="p-2 bg-slate-800 text-purple-300 rounded-lg">
                {col}
              </div>
            ))}

            {[1, 2, 3, 4, 5, 6].map((row) => (
              <React.Fragment key={`p-row-${row}`}>
                <div className="p-2 bg-slate-800 text-purple-300 rounded-lg flex items-center justify-center">
                  {row}
                </div>
                {[1, 2, 3, 4, 5, 6].map((col) => {
                  const prod = row * col;
                  const isSquare = [1, 4, 9, 16, 25, 36].includes(prod);
                  const isSix = prod === 6;
                  const isEven = prod % 2 === 0;

                  let highlight = false;
                  if (selectedFilter === 'square' && isSquare) highlight = true;
                  if (selectedFilter === 'six' && isSix) highlight = true;
                  if (selectedFilter === 'even' && isEven) highlight = true;

                  return (
                    <div
                      key={`p-cell-${row}-${col}`}
                      className={`p-2 rounded-lg border transition-all ${
                        highlight
                          ? 'bg-purple-600 text-white font-black border-purple-300 scale-105 shadow-sm'
                          : 'bg-slate-900 text-slate-300 border-slate-800'
                      }`}
                    >
                      {prod}
                    </div>
                  );
                })}
              </React.Fragment>
            ))}
          </div>

          <div className="text-xs text-slate-400 text-center">
            {selectedFilter === 'square' && (
              <span>Négyzetszámok (1, 4, 9, 16, 25, 36) kedvező esetei: <b>8 / 36 = 2/9 ≈ 22,2%</b>. Figyeld meg: a 4 szorzat 3 mezőben szerepel ((1,4), (2,2), (4,1))!</span>
            )}
            {selectedFilter === 'six' && (
              <span>A szorzat pontosan 6: négy kedvező eset ((1,6), (2,3), (3,2), (6,1)) → <b>4 / 36 = 1/9 ≈ 11,1%</b>.</span>
            )}
            {selectedFilter === 'even' && (
              <span>A szorzat páros: csak akkor páratlan, ha mindkét kocka páratlan (3 × 3 = 9 eset). Ezért páros szorzat: 36 - 9 = <b>27 / 36 = 3/4 = 75%</b>!</span>
            )}
            {selectedFilter === 'all' && (
              <span>A 36 mezőben a lehetséges szorzatok értéke 1 és 36 között változik, de nem egyenletes eloszlásúak!</span>
            )}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <TheoryTemplate
      title="Megismerhető véletlen & Klasszikus valószínűség"
      subtitle="Véletlen kísérletek, Laplace-modell, két dobókocka rácsa és szimmetrikus játékok valószínűségi elemzése"
      badge="10. OSZTÁLY • STATISZTIKA ÉS VALÓSZÍNŰSÉGSZÁMÍTÁS"
      themeColor="purple"
      documentId="grade10-classical-prob-theory"
      quickRule={{
        label: 'A KLASSZIKUS VALÓSZÍNŰSÉG ALAPTÖRVÉNYEI',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-200 text-xs sm:text-sm">
            <div className="bg-purple-50/90 dark:bg-purple-950/40 p-2.5 rounded-xl border border-purple-200 dark:border-purple-800">
              <span className="font-black text-purple-900 dark:text-purple-300 block mb-1">
                Laplace-modell &amp; Elemi események:
              </span>
              <ul className="space-y-1 text-slate-700 dark:text-slate-300 font-medium">
                <li>• <strong>Klasszikus valószínűség:</strong> <MathText>{'P(A) = \\frac{\\text{kedvező elemi események}}{\\text{összes elemi esemény}} = \\frac{k}{n}'}</MathText></li>
                <li>• <strong>Két dobókocka összes esete:</strong> <MathText>{'6 \\times 6 = 36'}</MathText> mikroszkopikus elemi esemény</li>
                <li>• <strong>Zsombor csapdája:</strong> <MathText>{'P(\\text{összeg}=7) = \\frac{6}{36} > P(\\text{összeg}=8) = \\frac{5}{36}'}</MathText></li>
              </ul>
            </div>
            <div className="bg-rose-50 dark:bg-rose-950/40 p-2 rounded-lg border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-300 text-[11px] leading-tight">
              <strong>⚠️ FONTOS ALAPSZABÁLY:</strong> A természet a két teljesen egyforma kockát és érmét is megkülönbözteti! Csak a megkülönböztetett mikroszkopikus elemi események (36 rácsmező) egyenlően valószínűek.
            </div>
          </div>
        )
      }}
      interactiveSection={interactiveSection}
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      practiceTitle="Teszteld a tudásodat a klasszikus valószínűségszámításból!"
      practiceSubtitle="Oldd meg a 30 válogatott kompetencia- és érettségi típusú feladatot!"
      practiceButtonText="Valószínűség Kvíz indítása"
      tips={[
        {
          title: 'Két kockánál mindig rajzolj 6×6-os rácsot!',
          content: 'Ne próbáld fejben összeszámolni az eseteket, mert a szimmetrikus párok (pl. 2+6 és 6+2) könnyen elfelejtődnek, vagy a dupla (4+4) tévesen kétszer számolódik. A rácsból azonnal látszik a kedvező mezők pontos száma!'
        },
        {
          title: 'A komplementer (ellentett) esemény trükkje',
          content: 'Ha a feladat azt kérdezi, hogy "legalább egyszer fejet dobunk" vagy "a szorzat legalább 10", gyakran sokkal gyorsabb az ellentett esemény valószínűségét kiszámolni és kivonni 1-ből: P(A) = 1 - P(nem A).'
        },
        {
          title: 'Visszatevéssel vs. visszatevés nélkül',
          content: 'Golyók vagy kártyák húzásánál mindig vizsgáld meg, hogy visszatesszük-e a kihúzott elemet! Visszatevés nélkül az összes lehetőség száma n-ről (n-1)-re csökken a második lépésben.'
        }
      ]}
    >
      {/* KIEMELT FONTOS SZABÁLYOK SZEKCIÓ A TANANYAG ELEJÉN */}
      <div className="bg-gradient-to-r from-purple-50 via-indigo-50 to-pink-50 dark:from-purple-950/40 dark:via-indigo-950/30 dark:to-pink-950/30 rounded-2xl sm:rounded-3xl p-5 sm:p-7 border-2 border-purple-300/80 dark:border-purple-800 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-purple-200/80 dark:border-purple-800/80 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 sm:p-3 bg-purple-600 text-white rounded-2xl shadow-md">
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-purple-100 dark:bg-purple-900/60 text-purple-800 dark:text-purple-300 border border-purple-200 dark:border-purple-700 mb-1">
                SZABÁLYTÁR &amp; MEMÓRIAPANELL
              </div>
              <h2 className="text-lg sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                Fontos szabályok a klasszikus valószínűségszámításban
              </h2>
            </div>
          </div>
          <span className="text-xs font-semibold text-purple-700 dark:text-purple-300 bg-purple-100/80 dark:bg-purple-900/40 px-3 py-1.5 rounded-xl border border-purple-200 dark:border-purple-800 self-start sm:self-auto">
            5 aranyszabály minden feladathoz
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
          {/* 1. Szabály */}
          <div className="bg-white dark:bg-slate-900/90 p-4 rounded-2xl border border-purple-200 dark:border-purple-800/60 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-lg bg-purple-100 dark:bg-purple-900/60 text-purple-800 dark:text-purple-300 font-black text-xs flex items-center justify-center">1</span>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">A Laplace-modell képlete</h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Ha egy véletlen kísérletnek <b>véges sok és egyenlően valószínű</b> elemi eseménye van:
              </p>
              <div className="my-2 p-2 bg-purple-50 dark:bg-purple-950/50 rounded-xl text-center font-bold text-purple-800 dark:text-purple-300 text-xs sm:text-sm border border-purple-100 dark:border-purple-800">
                <MathText>{'P(A) = \\frac{k}{n} = \\frac{\\text{kedvező esetek}}{\\text{összes eset}}'}</MathText>
              </div>
            </div>
            <p className="text-[11px] text-purple-700 dark:text-purple-400 font-medium mt-1">
              💡 Bármely esemény valószínűsége 0 és 1 közötti szám: <MathText>{'0 \\le P(A) \\le 1'}</MathText>.
            </p>
          </div>

          {/* 2. Szabály */}
          <div className="bg-white dark:bg-slate-900/90 p-4 rounded-2xl border border-indigo-200 dark:border-indigo-800/60 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-lg bg-indigo-100 dark:bg-indigo-900/60 text-indigo-800 dark:text-indigo-300 font-black text-xs flex items-center justify-center">2</span>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">Két kocka: 36 elemi esemény</h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Két kocka feldobásakor nem 11 (2-től 12-ig), és nem 21 kimenetel van, hanem pontosan <b>36 rendezett pár</b>:
              </p>
              <div className="my-2 p-2 bg-indigo-50 dark:bg-indigo-950/50 rounded-xl text-center font-bold text-indigo-800 dark:text-indigo-300 text-xs sm:text-sm border border-indigo-100 dark:border-indigo-800">
                <MathText>{'|\\Omega| = 6 \\times 6 = 36'}</MathText>
              </div>
            </div>
            <p className="text-[11px] text-indigo-700 dark:text-indigo-400 font-medium mt-1">
              💡 A fizikai valóságban még a megszólalásig egyforma kockák is megkülönböztethetők!
            </p>
          </div>

          {/* 3. Szabály */}
          <div className="bg-white dark:bg-slate-900/90 p-4 rounded-2xl border border-amber-200 dark:border-amber-800/60 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-lg bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-300 font-black text-xs flex items-center justify-center">3</span>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">Zsombor csapdájának elve</h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                A 7 és a 8 összeg nem egyformán esélyes! Bár mindkettő 3 párra bontható, a 4+4 csak 1 rácsmező, míg az eltérő párok kétszer fordulnak elő:
              </p>
              <div className="my-2 p-2 bg-amber-50 dark:bg-amber-950/50 rounded-xl text-center font-bold text-amber-800 dark:text-amber-300 text-xs sm:text-sm border border-amber-100 dark:border-amber-800">
                <MathText>{'P(7) = \\frac{6}{36} = \\frac{1}{6} \\quad > \\quad P(8) = \\frac{5}{36}'}</MathText>
              </div>
            </div>
            <p className="text-[11px] text-amber-700 dark:text-amber-400 font-medium mt-1">
              💡 A 7 a leggyakoribb összeg a kétkockás társasjátékokban (16,7%).
            </p>
          </div>

          {/* 4. Szabály */}
          <div className="bg-white dark:bg-slate-900/90 p-4 rounded-2xl border border-pink-200 dark:border-pink-800/60 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-lg bg-pink-100 dark:bg-pink-900/60 text-pink-800 dark:text-pink-300 font-black text-xs flex items-center justify-center">4</span>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">Szimmetrikus (Fair) játékok</h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Egy játék akkor igazságos (fair), ha a szabályok szimmetriája miatt mindkét játékos győzelmi esélye megegyezik:
              </p>
              <div className="my-2 p-2 bg-pink-50 dark:bg-pink-950/50 rounded-xl text-center font-bold text-pink-800 dark:text-pink-300 text-xs sm:text-sm border border-pink-100 dark:border-pink-800">
                <MathText>{'P(\\text{nyer}) = P(\\text{veszít}) = \\frac{1 - P(\\text{döntetlen})}{2}'}</MathText>
              </div>
            </div>
            <p className="text-[11px] text-pink-700 dark:text-pink-400 font-medium mt-1">
              💡 Kő-papír-ollónál a döntetlen esélye 1/3, míg a Gyík-Spock bővítésnél 1/5.
            </p>
          </div>

          {/* 5. Szabály */}
          <div className="bg-white dark:bg-slate-900/90 p-4 rounded-2xl border border-teal-200 dark:border-teal-800/60 shadow-xs flex flex-col justify-between md:col-span-2 lg:col-span-2">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-lg bg-teal-100 dark:bg-teal-900/60 text-teal-800 dark:text-teal-300 font-black text-xs flex items-center justify-center">5</span>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">Visszatevés nélküli mintavétel</h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Ha n különböző elemből húzunk egymás után kettőt <b>visszatevés nélkül</b>, az első lépésben n, a második lépésben már csak n - 1 választásunk marad. A kimenetelek száma:
              </p>
              <div className="my-2 p-2 bg-teal-50 dark:bg-teal-950/50 rounded-xl text-center font-bold text-teal-800 dark:text-teal-300 text-xs sm:text-sm border border-teal-100 dark:border-teal-800">
                <MathText>{'|\\Omega_{\\text{visszatevés nélkül}}| = n \\cdot (n - 1) \\quad \\text{vs.} \\quad |\\Omega_{\\text{visszatevéssel}}| = n^2'}</MathText>
              </div>
            </div>
            <p className="text-[11px] text-teal-700 dark:text-teal-400 font-medium mt-1">
              💡 Négy betűkártyánál {`{A, E, M, Z}`} visszatevés nélkül 4 × 3 = 12 kimenetel adódik (AZ, EZ, MA szavak: 3/12 = 1/4).
            </p>
          </div>
        </div>
      </div>

      {/* 1. SZEKCIÓ: VÉLETLEN JELENSÉG ÉS ELEMI ESEMÉNYEK */}
      <TheorySection
        number={1}
        title="Véletlen jelenség, véletlen kísérlet és elemi események"
        badge="ALAPFOGALMAK"
        badgeColor="purple"
        icon={<BookOpen className="w-4 h-4 text-purple-600" />}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 space-y-4">
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
              A <b>valószínűségszámítás</b> a természet és a mindennapi élet véletlen jelenségeinek matematikai leírásával foglalkozik. 
              Amikor egy ilyen véletlen jelenséget szándékosan, azonos feltételek között megfigyelünk, <b>véletlen kísérletet</b> végzünk.
            </p>

            <TheoryCard
              title="Elemi esemény és eseménytér (Ω)"
              badge="DEFINÍCIÓ"
              color="purple"
            >
              <div className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                <p>
                  • <b>Elemi esemény:</b> A véletlen kísérlet egyetlen lehetséges, tovább nem bontható legfinomabb kimenetele.
                </p>
                <p>
                  • <b>Eseménytér (<MathText>{'\\Omega'}</MathText>):</b> Az összes lehetséges elemi esemény összessége (halmaza).
                </p>
                <p>
                  • <b>Összetett esemény (<MathText>{'A \\subseteq \\Omega'}</MathText>):</b> A kísérlet kimenetelére vonatkozó olyan állítás, amely több elemi esemény megvalósulásakor is igaz (pl. „a dobott szám páros”).
                </p>
              </div>
            </TheoryCard>

            <TheoryCallout type="info" title="Miért különbözteti meg a természet az egyforma kockákat is?">
              Gyakran felmerül a kérdés: ha két teljesen egyforma fehér kockával dobunk, miért tekintjük különbözőnek az (1, 6) és (6, 1) dobásokat?
              A fizikai valóságban a két kocka sohasem azonos térrészben landol, egymástól független pályát jár be. A számtalan valós kísérlet igazolja, hogy <b>a valóságot a megkülönböztetett mikroszkopikus elemi események modellje írja le helyesen</b>!
            </TheoryCallout>
          </div>

          <div className="lg:col-span-5 flex flex-col items-center justify-center p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200 dark:border-slate-800">
            <TwoDiceSumGridSvg size={280} />
            <span className="text-xs text-slate-500 dark:text-slate-400 mt-2 text-center">
              A 36 elemi esemény rendezett rácsa két kocka dobásakor
            </span>
          </div>
        </div>
      </TheorySection>

      {/* 2. SZEKCIÓ: A KLASSZIKUS VALÓSZÍNŰSÉGI MODELL */}
      <TheorySection
        number={2}
        title="A klasszikus valószínűségi mező (Laplace-modell)"
        badge="ALAPTÉTEL"
        badgeColor="indigo"
        icon={<Scale className="w-4 h-4 text-indigo-600" />}
      >
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            A francia matematikus, <b>Pierre-Simon de Laplace</b> (1749–1827) alkotta meg a valószínűség klasszikus definícióját olyan véletlen kísérletekre, ahol a kimenetelek száma véges, és a szimmetria alapján minden kimenetelnek pontosan ugyanakkora az esélye.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TheoryCard
              title="A klasszikus valószínűség képlete"
              formula="P(A) = \frac{k}{n} = \frac{\text{kedvező kimenetelek száma}}{\text{összes lehetséges kimenetel száma}}"
              color="indigo"
            >
              <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                <li>• <MathText>{'n = |\\Omega|'}</MathText>: az összes elemi esemény száma.</li>
                <li>• <MathText>{'k = |A|'}</MathText>: az A eseményhez tartozó kedvező esetek száma.</li>
                <li>• <b>Alapfeltétel:</b> Az elemi események száma véges és <u>egyenlően valószínű</u>!</li>
              </ul>
            </TheoryCard>

            <TheoryCard
              title="Nevezetes valószínűségek és tulajdonságok"
              badge="TULAJDONSÁGOK"
              color="indigo"
            >
              <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                <li>• <b>Biztos esemény (<MathText>{'I'}</MathText>):</b> Mindig bekövetkezik, <MathText>{'P(I) = 1 = 100\\%'}</MathText>.</li>
                <li>• <b>Lehetetlen esemény (<MathText>{'\\emptyset'}</MathText>):</b> Sohasem következhet be, <MathText>{'P(\\emptyset) = 0'}</MathText>.</li>
                <li>• <b>Ellentett (komplementer) esemény (<MathText>{'\\bar{A}'}</MathText>):</b> <MathText>{'P(\\bar{A}) = 1 - P(A)'}</MathText>.</li>
                <li>• <b>Értékkészlet:</b> Tetszőleges eseményre <MathText>{'0 \\le P(A) \\le 1'}</MathText>.</li>
              </ul>
            </TheoryCard>
          </div>

          <TheoryTrapBox
            trap="3 kimenetel egyenlő esélyének téves feltételezése két érménél"
            wrong="Két érménél 3 kimenetel van: 2 fej, 2 írás, vagy 1 fej és 1 írás. Ezért P(1 fej, 1 írás) = 1/3."
            wrongExplanation="A 'fej-írás' kimenetel kétféleképpen valósulhat meg (FI és IF). Ezek nem egyformán valószínűek!"
            correct="Összes elemi esemény: FF, FI, IF, II (összesen 4 db). Ebből a kedvező: FI és IF (2 db). Valószínűség: 2/4 = 1/2 = 50%."
            correctExplanation="Csak a mikroszkopikusan megkülönböztetett 4 elemi esemény egyenlően valószínű!"
          />
        </div>
      </TheorySection>

      {/* 3. SZEKCIÓ: KÉT DOBÓKOCKA ÖSSZEGE ÉS ZSOMBOR CSAPDÁJA */}
      <TheorySection
        number={3}
        title="Két dobókocka összege és Zsombor csapdája"
        badge="KLASSZIKUS PÉLDA"
        badgeColor="amber"
        icon={<AlertTriangle className="w-4 h-4 text-amber-600" />}
      >
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            A tankönyv egyik legfontosabb feladata <b>Zsombor felbontási paradoxona</b>. Zsombor úgy gondolta, hogy két dobókockával ugyanolyan eséllyel dobhatunk 7-et, mint 8-at, hiszen:
          </p>

          <div className="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-xl border border-amber-200 dark:border-amber-800 text-center font-mono text-xs sm:text-sm font-bold text-amber-900 dark:text-amber-200">
            {'7 = 1 + 6 = 2 + 5 = 3 + 4 (3 számpár)'} &nbsp; és &nbsp; {'8 = 2 + 6 = 3 + 5 = 4 + 4 (3 számpár)'}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
              <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <span>Miért 6 eset adja a 7-es összeget?</span>
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Mivel a tagok különbözőek (1≠6, 2≠5, 3≠4), mindegyik pár <b>kétféle sorrendben</b> (két különböző rácsmezőben) jelenik meg:
              </p>
              <div className="text-xs font-mono bg-slate-50 dark:bg-slate-800 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200">
                (1,6), (6,1), (2,5), (5,2), (3,4), (4,3) → <b>6 mező</b>
              </div>
              <div className="text-xs font-bold text-emerald-700 dark:text-emerald-400">
                <MathText>{'P(7) = \\frac{6}{36} = \\frac{1}{6} \\approx 16,67\\%'}</MathText>
              </div>
            </div>

            <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
              <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                <span>Miért csak 5 eset adja a 8-as összeget?</span>
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                A 8-as összegnél a (2,6) és (3,5) párok két-két mezőt adnak, viszont a <b>4 + 4</b> esetében a két kocka értéke megegyezik, így az csak <b>egyetlen rácsmezőt</b> jelent:
              </p>
              <div className="text-xs font-mono bg-slate-50 dark:bg-slate-800 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200">
                (2,6), (6,2), (3,5), (5,3), (4,4) → <b>5 mező</b>
              </div>
              <div className="text-xs font-bold text-amber-700 dark:text-amber-400">
                <MathText>{'P(8) = \\frac{5}{36} \\approx 13,89\\%'}</MathText>
              </div>
            </div>
          </div>

          {/* Két kocka összegeinek eloszlása táblázat */}
          <TheoryTable
            headers={['Összeg (S)', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']}
            rows={[
              ['Kedvező mezők', '1', '2', '3', '4', '5', '6', '5', '4', '3', '2', '1'],
              ['Valószínűség (P)', '1/36', '2/36', '3/36', '4/36', '5/36', '6/36', '5/36', '4/36', '3/36', '2/36', '1/36'],
              ['Százalékos esély', '2,8%', '5,6%', '8,3%', '11,1%', '13,9%', '16,7%', '13,9%', '11,1%', '8,3%', '5,6%', '2,8%']
            ]}
          />
        </div>
      </TheorySection>

      {/* 4. SZEKCIÓ: KÉT DOBÓKOCKA SZORZATA */}
      <TheorySection
        number={4}
        title="Két dobókocka szorzata és összetett események"
        badge="SZORZATTÁBLÁZAT"
        badgeColor="teal"
        icon={<Grid className="w-4 h-4 text-teal-600" />}
      >
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            Ha két kockával dobunk, a pontok szorzata 1 és 36 közé esik, de a lehetséges értékek száma nem 36 (sok szorzat ismétlődik, pl. a 6 négyszer is előfordul: (1,6), (2,3), (3,2), (6,1)).
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-teal-50 dark:bg-teal-950/40 rounded-2xl border border-teal-200 dark:border-teal-800 space-y-2">
              <h4 className="font-bold text-sm text-teal-900 dark:text-teal-200">A szorzat pontosan 6</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Négy rácsmező felel meg neki: (1,6), (2,3), (3,2), (6,1).
              </p>
              <div className="p-2 bg-white dark:bg-slate-900 rounded-xl text-center font-bold text-teal-700 dark:text-teal-300 text-xs border border-teal-200 dark:border-teal-700">
                <MathText>{'P(\\text{szorzat} = 6) = \\frac{4}{36} = \\frac{1}{9} \\approx 11,1\\%'}</MathText>
              </div>
            </div>

            <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl border border-emerald-200 dark:border-emerald-800 space-y-2">
              <h4 className="font-bold text-sm text-emerald-900 dark:text-emerald-200">A szorzat négyzetszám</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Lehetséges négyzetszámok: 1, 4, 9, 16, 25, 36. Összesen 8 rácsmező adja!
              </p>
              <div className="p-2 bg-white dark:bg-slate-900 rounded-xl text-center font-bold text-emerald-700 dark:text-emerald-300 text-xs border border-emerald-200 dark:border-emerald-700">
                <MathText>{'P(\\text{négyzet}) = \\frac{8}{36} = \\frac{2}{9} \\approx 22,2\\%'}</MathText>
              </div>
            </div>

            <div className="p-4 bg-indigo-50 dark:bg-indigo-950/40 rounded-2xl border border-indigo-200 dark:border-indigo-800 space-y-2">
              <h4 className="font-bold text-sm text-indigo-900 dark:text-indigo-200">A szorzat páros szám</h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Csak akkor páratlan, ha mindkettő páratlan (3 × 3 = 9 eset). Ezért páros: 36 - 9 = 27 eset.
              </p>
              <div className="p-2 bg-white dark:bg-slate-900 rounded-xl text-center font-bold text-indigo-700 dark:text-indigo-300 text-xs border border-indigo-200 dark:border-indigo-700">
                <MathText>{'P(\\text{páros}) = \\frac{27}{36} = \\frac{3}{4} = 75\\%'}</MathText>
              </div>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 5. SZEKCIÓ: JÁTÉKOK ÉS KÁRTYÁK HÚZÁSA */}
      <TheorySection
        number={5}
        title="Szimmetrikus játékok és kombinatorikus húzások"
        badge="ALKALMAZÁSOK"
        badgeColor="pink"
        icon={<Target className="w-4 h-4 text-pink-600" />}
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-7 space-y-4">
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                Kő-papír-olló és Kő-papír-olló-gyík-Spock
              </h3>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
                A <b>kő-papír-olló</b> egy fair játék, mert mindkét játékos 3 szimbólum közül választhat (<MathText>{'3 \\times 3 = 9'}</MathText> kimenetel). 
                A döntetlen esélye <MathText>{'3/9 = 1/3'}</MathText>, mindkét játékos nyerési esélye pedig <MathText>{'3/9 = 1/3'}</MathText>.
              </p>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
                A <b>kő-papír-olló-gyík-Spock</b> bővítésben (Sam Kass játéka, az Agymenők sorozatból ismert) minden választás pontosan 2 másikat győz le és 2 másiktól kap ki. 
                Itt az elemi események száma <MathText>{'5 \\times 5 = 25'}</MathText>, a döntetlen esélye pedig <MathText>{'5/25 = 1/5 = 20\\%'}</MathText>.
              </p>
            </div>

            <div className="lg:col-span-5 flex flex-col items-center justify-center p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200 dark:border-slate-800">
              <RockPaperScissorsLizardSpockSvg size={280} />
              <span className="text-xs text-slate-500 dark:text-slate-400 mt-2 text-center">
                A 9 és 25 kimenetelű szimmetrikus játékmátrixok
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center pt-4 border-t border-slate-200 dark:border-slate-800">
            <div className="lg:col-span-5 flex flex-col items-center justify-center p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200 dark:border-slate-800 order-2 lg:order-1">
              <CardDrawTreeGraphSvg size={260} />
              <span className="text-xs text-slate-500 dark:text-slate-400 mt-2 text-center">
                Betűkártyák fadiagramja visszatevés nélkül
              </span>
            </div>

            <div className="lg:col-span-7 space-y-4 order-1 lg:order-2">
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                Betűkártyák húzása visszatevés nélkül {`{A, E, M, Z}`}
              </h3>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
                Négy betűkártyából húzunk egymás után kettőt visszatevés nélkül. 
                Az első kártya 4-féle lehet, a második már csak 3-féle. Az elemi események száma:
              </p>
              <div className="p-3 bg-indigo-50 dark:bg-indigo-950/40 rounded-xl border border-indigo-200 dark:border-indigo-800 font-mono text-center font-bold text-indigo-900 dark:text-indigo-200 text-xs sm:text-sm">
                {'|Ω| = 4 × 3 = 12 elemi esemény'}
              </div>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
                A 12 lehetséges betűpárból pontosan 3 képez értelmes magyar szót: <b>AZ, EZ, MA</b>.
              </p>
              <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800 font-bold text-emerald-800 dark:text-emerald-300 text-center text-xs sm:text-sm">
                <MathText>{'P(\\text{értelmes szó}) = \\frac{3}{12} = \\frac{1}{4} = 25\\%'}</MathText>
              </div>
            </div>
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default ClassicalProbTheory;

