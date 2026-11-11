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
  StatisticsProbabilityOverviewMapSvg,
  AppleMarketWeightedAverageSvg,
  MathExamGradeDistributionSvg
} from './ChapterSynthesisFigures';
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
  Grid,
  TrendingUp,
  BarChart3,
  Calculator,
  PieChart
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ChapterSynthesisTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

export const ChapterSynthesisTheory: React.FC<ChapterSynthesisTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // --- 1. Interaktív Laboratórium Állapotok ---
  const [activeTab, setActiveTab] = useState<'apples' | 'grades' | 'dice'>('apples');

  // Tab 1: Jánosék almái (Kompetenciamérés 2016)
  const [monPrice, setMonPrice] = useState<number>(125);
  const [monKg, setMonKg] = useState<number>(40);
  const [tuePrice, setTuePrice] = useState<number>(120);
  const [tueKg, setTueKg] = useState<number>(40);
  const [wedPrice, setWedPrice] = useState<number>(100);
  const [wedKg, setWedKg] = useState<number>(80);
  const [thuPrice, setThuPrice] = useState<number>(140);
  const [thuKg, setThuKg] = useState<number>(30);
  const [friPrice, setFriPrice] = useState<number>(80);
  const [friKg, setFriKg] = useState<number>(90);

  const monRev = monPrice * monKg;
  const tueRev = tuePrice * tueKg;
  const wedRev = wedPrice * wedKg;
  const thuRev = thuPrice * thuKg;
  const friRev = friPrice * friKg;
  const totalRev = monRev + tueRev + wedRev + thuRev + friRev;
  const avgDailyRev = totalRev / 5;
  const totalKg = monKg + tueKg + wedKg + thuKg + friKg;
  const avgPricePerKg = totalKg > 0 ? totalRev / totalKg : 0;

  const handleResetApples = () => {
    setMonPrice(125); setMonKg(40);
    setTuePrice(120); setTueKg(40);
    setWedPrice(100); setWedKg(80);
    setThuPrice(140); setThuKg(30);
    setFriPrice(80); setFriKg(90);
  };

  // Tab 2: 30 fős osztály matematika érettségi jegyei (Érettségi 2017)
  const [gradesCount, setGradesCount] = useState<Record<number, number>>({
    1: 2,
    2: 5,
    3: 12,
    4: 7,
    5: 4
  });

  const totalStudents = Object.values(gradesCount).reduce((a, b) => a + b, 0);
  const sumGrades = (1 * gradesCount[1]) + (2 * gradesCount[2]) + (3 * gradesCount[3]) + (4 * gradesCount[4]) + (5 * gradesCount[5]);
  const calcAvg = totalStudents > 0 ? (sumGrades / totalStudents) : 0;

  // Módusz kiszámítása
  let calcMode = 1;
  let maxFreq = -1;
  for (let g = 1; g <= 5; g++) {
    if (gradesCount[g] > maxFreq) {
      maxFreq = gradesCount[g];
      calcMode = g;
    }
  }

  // Medián kiszámítása
  const expandedList: number[] = [];
  for (let g = 1; g <= 5; g++) {
    for (let c = 0; c < gradesCount[g]; c++) {
      expandedList.push(g);
    }
  }
  let calcMedian = 0;
  if (expandedList.length > 0) {
    const mid = Math.floor(expandedList.length / 2);
    if (expandedList.length % 2 === 1) {
      calcMedian = expandedList[mid];
    } else {
      calcMedian = (expandedList[mid - 1] + expandedList[mid]) / 2;
    }
  }

  const handleResetGrades = () => {
    setGradesCount({ 1: 2, 2: 5, 3: 12, 4: 7, 5: 4 });
  };

  // Tab 3: Kétkockás kétjegyű számok szűrője
  const [diceFilter, setDiceFilter] = useState<'all' | 'square' | 'equal' | 'sumLe9'>('all');

  const diceMatrix: Array<{ black: number; white: number; num: number; isSquare: boolean; isEqual: boolean; isSumLe9: boolean }> = [];
  for (let b = 1; b <= 6; b++) {
    for (let w = 1; w <= 6; w++) {
      const val = b * 10 + w;
      diceMatrix.push({
        black: b,
        white: w,
        num: val,
        isSquare: [16, 25, 36, 64].includes(val),
        isEqual: b === w,
        isSumLe9: (b + w) <= 9
      });
    }
  }

  const filteredDiceCount = diceMatrix.filter(item => {
    if (diceFilter === 'square') return item.isSquare;
    if (diceFilter === 'equal') return item.isEqual;
    if (diceFilter === 'sumLe9') return item.isSumLe9;
    return true;
  }).length;

  const diceProb = (filteredDiceCount / 36) * 100;

  // Interaktív laboratórium blokk
  const interactiveSection = (
    <div className="bg-slate-900 text-white p-5 sm:p-7 rounded-2xl sm:rounded-3xl shadow-xl space-y-6 border border-emerald-800/50">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-emerald-800/60 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-emerald-600 text-white rounded-2xl shadow-lg">
            <Calculator className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-black text-emerald-100">
              Interaktív Fejezeti Tudáspróba Laboratórium
            </h3>
            <p className="text-xs text-emerald-300/80">
              Teszteld a reprezentatív érettségi és kompetenciamérési feladatok matematikai modelljeit élő szimulációkban!
            </p>
          </div>
        </div>

        {/* Tab váltó gombok */}
        <div className="flex items-center gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab('apples')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'apples'
                ? 'bg-emerald-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Jánosék almái
          </button>
          <button
            onClick={() => setActiveTab('grades')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'grades'
                ? 'bg-emerald-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            30 fős érettségi
          </button>
          <button
            onClick={() => setActiveTab('dice')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'dice'
                ? 'bg-emerald-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Kétkockás számok
          </button>
        </div>
      </div>

      {/* 1. TAB: JÁNOSÉK ALMÁI */}
      {activeTab === 'apples' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h4 className="font-bold text-base text-emerald-200">
                Jánosék almaárusítása a piacon (Kompetenciamérés 2016)
              </h4>
              <p className="text-xs text-slate-400">
                A napi bevétel az ár és az eladott kilogrammok szorzata. Az 5 nap átlagos napi bevétele: Összes bevétel / 5.
              </p>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={handleResetApples}
              className="h-8 text-xs border-slate-700 text-slate-300 hover:bg-slate-800"
            >
              <RotateCcw className="w-3.5 h-3.5 mr-1" /> Tankönyvi alapértékek
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-3 text-xs">
            {/* Hétfő */}
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2">
              <span className="font-bold text-emerald-400">Hétfő</span>
              <div>
                <span className="text-slate-400">Ár: {monPrice} Ft/kg</span>
                <input
                  type="range" min="60" max="180" step="5" value={monPrice}
                  onChange={(e) => setMonPrice(Number(e.target.value))}
                  className="w-full h-1 bg-slate-700 rounded-lg accent-emerald-500"
                />
              </div>
              <div>
                <span className="text-slate-400">Eladva: {monKg} kg</span>
                <input
                  type="range" min="10" max="120" step="5" value={monKg}
                  onChange={(e) => setMonKg(Number(e.target.value))}
                  className="w-full h-1 bg-slate-700 rounded-lg accent-emerald-500"
                />
              </div>
              <div className="text-right font-mono font-bold text-white pt-1 border-t border-slate-800">
                {monRev.toLocaleString('hu-HU')} Ft
              </div>
            </div>

            {/* Kedd */}
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2">
              <span className="font-bold text-emerald-400">Kedd</span>
              <div>
                <span className="text-slate-400">Ár: {tuePrice} Ft/kg</span>
                <input
                  type="range" min="60" max="180" step="5" value={tuePrice}
                  onChange={(e) => setTuePrice(Number(e.target.value))}
                  className="w-full h-1 bg-slate-700 rounded-lg accent-emerald-500"
                />
              </div>
              <div>
                <span className="text-slate-400">Eladva: {tueKg} kg</span>
                <input
                  type="range" min="10" max="120" step="5" value={tueKg}
                  onChange={(e) => setTueKg(Number(e.target.value))}
                  className="w-full h-1 bg-slate-700 rounded-lg accent-emerald-500"
                />
              </div>
              <div className="text-right font-mono font-bold text-white pt-1 border-t border-slate-800">
                {tueRev.toLocaleString('hu-HU')} Ft
              </div>
            </div>

            {/* Szerda */}
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2">
              <span className="font-bold text-emerald-400">Szerda</span>
              <div>
                <span className="text-slate-400">Ár: {wedPrice} Ft/kg</span>
                <input
                  type="range" min="60" max="180" step="5" value={wedPrice}
                  onChange={(e) => setWedPrice(Number(e.target.value))}
                  className="w-full h-1 bg-slate-700 rounded-lg accent-emerald-500"
                />
              </div>
              <div>
                <span className="text-slate-400">Eladva: {wedKg} kg</span>
                <input
                  type="range" min="10" max="120" step="5" value={wedKg}
                  onChange={(e) => setWedKg(Number(e.target.value))}
                  className="w-full h-1 bg-slate-700 rounded-lg accent-emerald-500"
                />
              </div>
              <div className="text-right font-mono font-bold text-white pt-1 border-t border-slate-800">
                {wedRev.toLocaleString('hu-HU')} Ft
              </div>
            </div>

            {/* Csütörtök */}
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2">
              <span className="font-bold text-emerald-400">Csütörtök</span>
              <div>
                <span className="text-slate-400">Ár: {thuPrice} Ft/kg</span>
                <input
                  type="range" min="60" max="180" step="5" value={thuPrice}
                  onChange={(e) => setThuPrice(Number(e.target.value))}
                  className="w-full h-1 bg-slate-700 rounded-lg accent-emerald-500"
                />
              </div>
              <div>
                <span className="text-slate-400">Eladva: {thuKg} kg</span>
                <input
                  type="range" min="10" max="120" step="5" value={thuKg}
                  onChange={(e) => setThuKg(Number(e.target.value))}
                  className="w-full h-1 bg-slate-700 rounded-lg accent-emerald-500"
                />
              </div>
              <div className="text-right font-mono font-bold text-white pt-1 border-t border-slate-800">
                {thuRev.toLocaleString('hu-HU')} Ft
              </div>
            </div>

            {/* Péntek */}
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2">
              <span className="font-bold text-emerald-400">Péntek</span>
              <div>
                <span className="text-slate-400">Ár: {friPrice} Ft/kg</span>
                <input
                  type="range" min="60" max="180" step="5" value={friPrice}
                  onChange={(e) => setFriPrice(Number(e.target.value))}
                  className="w-full h-1 bg-slate-700 rounded-lg accent-emerald-500"
                />
              </div>
              <div>
                <span className="text-slate-400">Eladva: {friKg} kg</span>
                <input
                  type="range" min="10" max="120" step="5" value={friKg}
                  onChange={(e) => setFriKg(Number(e.target.value))}
                  className="w-full h-1 bg-slate-700 rounded-lg accent-emerald-500"
                />
              </div>
              <div className="text-right font-mono font-bold text-white pt-1 border-t border-slate-800">
                {friRev.toLocaleString('hu-HU')} Ft
              </div>
            </div>
          </div>

          {/* Eredmény kártyák */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-950 p-4 rounded-xl border border-slate-800 text-center">
            <div>
              <span className="text-xs text-slate-400">Összes heti bevétel</span>
              <p className="text-xl font-black text-white font-mono">{totalRev.toLocaleString('hu-HU')} Ft</p>
            </div>
            <div className="border-x border-slate-800">
              <span className="text-xs text-emerald-400 font-bold">Napi átlagos bevétel (Feladat kérdése)</span>
              <p className="text-2xl font-black text-emerald-400 font-mono">{avgDailyRev.toLocaleString('hu-HU')} Ft/nap</p>
            </div>
            <div>
              <span className="text-xs text-slate-400">Súlyozott kg-onkénti átlagár</span>
              <p className="text-xl font-black text-blue-400 font-mono">{avgPricePerKg.toFixed(1)} Ft/kg</p>
            </div>
          </div>
        </div>
      )}

      {/* 2. TAB: 30 FŐS ÉRETTSÉGI JEGYELOSZLÁS */}
      {activeTab === 'grades' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h4 className="font-bold text-base text-emerald-200">
                30 fős osztály matematika érettségi jegyei (Érettségi 2017)
              </h4>
              <p className="text-xs text-slate-400">
                Állítsd az érdemjegyek gyakoriságát, és kövesd valós időben az átlag, a medián és a módusz elmozdulását!
              </p>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={handleResetGrades}
              className="h-8 text-xs border-slate-700 text-slate-300 hover:bg-slate-800"
            >
              <RotateCcw className="w-3.5 h-3.5 mr-1" /> Eredeti érettségi eloszlás
            </Button>
          </div>

          <div className="grid grid-cols-5 gap-2 text-center text-xs">
            {[1, 2, 3, 4, 5].map((g) => (
              <div key={g} className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 space-y-1.5">
                <span className="font-bold text-emerald-300">{g}-es jegy</span>
                <p className="text-lg font-black text-white">{gradesCount[g]} fő</p>
                <div className="flex justify-center gap-1">
                  <button
                    onClick={() => setGradesCount(prev => ({ ...prev, [g]: Math.max(0, prev[g] - 1) }))}
                    className="w-6 h-6 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold"
                  >
                    –
                  </button>
                  <button
                    onClick={() => setGradesCount(prev => ({ ...prev, [g]: prev[g] + 1 }))}
                    className="w-6 h-6 rounded bg-emerald-700 hover:bg-emerald-600 text-white font-bold"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 bg-slate-950 p-4 rounded-xl border border-slate-800 text-center">
            <div>
              <span className="text-xs text-slate-400">Összes tanuló</span>
              <p className="text-xl font-black text-white font-mono">{totalStudents} fő</p>
            </div>
            <div>
              <span className="text-xs text-emerald-400 font-bold">Számtani közép (Átlag: x̄)</span>
              <p className="text-2xl font-black text-emerald-400 font-mono">{calcAvg.toFixed(2)}</p>
            </div>
            <div>
              <span className="text-xs text-blue-400 font-bold">Medián (Me)</span>
              <p className="text-2xl font-black text-blue-400 font-mono">{calcMedian}</p>
            </div>
            <div>
              <span className="text-xs text-purple-400 font-bold">Módusz (Mo)</span>
              <p className="text-2xl font-black text-purple-400 font-mono">{calcMode} ({maxFreq} fő)</p>
            </div>
          </div>
        </div>
      )}

      {/* 3. TAB: KÉTKOCKÁS KÉTJEGYŰ SZÁMOK MÁTRIX */}
      {activeTab === 'dice' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h4 className="font-bold text-base text-emerald-200">
                Kétkockás kétjegyű számok eseménytere (Érettségi 2009)
              </h4>
              <p className="text-xs text-slate-400">
                Fekete kocka: tízes helyiérték (1–6), Fehér kocka: egyes helyiérték (1–6). Összesen 36 egyenlően esélyes szám!
              </p>
            </div>

            {/* Szűrő gombok */}
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => setDiceFilter('all')}
                className={`px-2.5 py-1 rounded text-xs font-bold transition-all ${
                  diceFilter === 'all' ? 'bg-slate-700 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                Összes (36)
              </button>
              <button
                onClick={() => setDiceFilter('square')}
                className={`px-2.5 py-1 rounded text-xs font-bold transition-all ${
                  diceFilter === 'square' ? 'bg-amber-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                Négyzetszám (4)
              </button>
              <button
                onClick={() => setDiceFilter('equal')}
                className={`px-2.5 py-1 rounded text-xs font-bold transition-all ${
                  diceFilter === 'equal' ? 'bg-cyan-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                Azonos jegyek (6)
              </button>
              <button
                onClick={() => setDiceFilter('sumLe9')}
                className={`px-2.5 py-1 rounded text-xs font-bold transition-all ${
                  diceFilter === 'sumLe9' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                Összeg ≤ 9 (30)
              </button>
            </div>
          </div>

          {/* 6x6 Rács */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <div className="grid grid-cols-6 gap-2 text-center text-xs font-mono font-bold">
              {diceMatrix.map((item) => {
                let isHighlighted = false;
                let bgClass = 'bg-slate-900 text-slate-400 border-slate-800';
                if (diceFilter === 'all') {
                  isHighlighted = true;
                  bgClass = 'bg-slate-800 text-white border-slate-700';
                } else if (diceFilter === 'square' && item.isSquare) {
                  isHighlighted = true;
                  bgClass = 'bg-amber-500 text-slate-950 border-amber-400 scale-105 shadow-md shadow-amber-500/20';
                } else if (diceFilter === 'equal' && item.isEqual) {
                  isHighlighted = true;
                  bgClass = 'bg-cyan-500 text-slate-950 border-cyan-400 scale-105 shadow-md shadow-cyan-500/20';
                } else if (diceFilter === 'sumLe9' && item.isSumLe9) {
                  isHighlighted = true;
                  bgClass = 'bg-emerald-600 text-white border-emerald-400 scale-105 shadow-md shadow-emerald-500/20';
                }

                return (
                  <div
                    key={`${item.black}-${item.white}`}
                    className={`py-2 px-1 rounded-lg border transition-all ${bgClass}`}
                  >
                    <span>{item.num}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Valószínűségi mutató */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs">
            <div>
              <span className="text-slate-400">Kiválasztott kimenetelek száma: </span>
              <span className="font-bold text-emerald-400 text-sm font-mono">{filteredDiceCount} / 36</span>
            </div>
            <div>
              <span className="text-slate-400">Klasszikus valószínűség: </span>
              <span className="font-black text-white text-base font-mono">
                {diceFilter === 'square' && '4/36 = 1/9 ≈ 11,11%'}
                {diceFilter === 'equal' && '6/36 = 1/6 ≈ 16,67%'}
                {diceFilter === 'sumLe9' && '30/36 = 5/6 ≈ 83,33%'}
                {diceFilter === 'all' && '36/36 = 100%'}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <TheoryTemplate
      topicTitle="10. OSZTÁLY • STATISZTIKA ÉS VALÓSZÍNŰSÉGSZÁMÍTÁS"
      subtopicTitle="Gyakorlás, tudáspróba"
      description="A teljes fejezet átfogó szintézise: számtani és mértani közép, helyzeti és szóródási mutatók, osztályba sorolás, relatív gyakoriság, Laplace-modell és érettségi reprezentatív típusfeladatok."
      quickRule="A statisztikai minták elemzésénél mindig használd a kiegyenlítődési tételt (Σ(xᵢ – x̄) = 0), a valószínűségi feladatoknál pedig vizsgáld meg, hogy a komplementer eseménnyel (P(Ā) = 1 – P(A)) vagy blokkosítással gyorsabban célba érsz-e!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      interactiveSection={interactiveSection}
      cheatSheetItems={[
        {
          title: 'Számtani és mértani közép',
          content: 'Két nemnegatív számra mindig A ≥ G, azaz (a + b) / 2 ≥ √(a · b). Egyenlőség akkor és csakis akkor áll fenn, ha a = b.'
        },
        {
          title: 'Az átlag kiegyenlítődési törvénye',
          content: 'Az adatok átlagtól vett előjeles eltéréseinek algebrai összege mindig pontosan nulla: Σ(xᵢ – x̄) = 0.'
        },
        {
          title: 'Medián vs. Módusz',
          content: 'A medián (Me) a nagyság szerint rendezett adatsor középső eleme (párosnál a 2 középső számtani közepe). A módusz (Mo) a leggyakrabban előforduló érték.'
        },
        {
          title: 'Logikai szita 2 eseményre',
          content: 'P(A ∪ B) = P(A) + P(B) – P(A ∩ B). Az unió komplementere: P(egyik sem) = 1 – P(A ∪ B).'
        },
        {
          title: 'Két kocka és permutációk',
          content: 'Két megkülönböztethető kocka esetén 36 egyenlően esélyes eset van. Egymás melletti elemeknél alkalmazz blokkosítást (két elem egy blokk: 2! belső sorrend).'
        }
      ]}
    >
      {/* KIEMELT FONTOS SZABÁLYOK SZEKCIÓ A TANANYAG ELEJÉN */}
      <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-cyan-50 dark:from-emerald-950/40 dark:via-teal-950/30 dark:to-cyan-950/30 rounded-2xl sm:rounded-3xl p-5 sm:p-7 border-2 border-emerald-300/80 dark:border-emerald-800 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-emerald-200/80 dark:border-emerald-800/80 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 sm:p-3 bg-emerald-600 text-white rounded-2xl shadow-md">
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-700 mb-1">
                SZABÁLYTÁR &amp; MEMÓRIAPANEL
              </div>
              <h2 className="text-lg sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                Fontos szabályok a teljes fejezet szintéziséhez
              </h2>
            </div>
          </div>
          <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-100/80 dark:bg-emerald-900/40 px-3 py-1.5 rounded-xl border border-emerald-200 dark:border-emerald-800 self-start sm:self-auto">
            5 aranyszabály érettségi és témazáró vizsgákhoz
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
          {/* 1. Szabály */}
          <div className="bg-white dark:bg-slate-900/90 p-4 rounded-2xl border border-emerald-200 dark:border-emerald-800/60 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-lg bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 font-black text-xs flex items-center justify-center">1</span>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">Számtani és mértani közép egyenlőtlensége</h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Tetszőleges nemnegatív <MathText>{'$a, b \\ge 0$'}</MathText> számokra mindig érvényes: <MathText>{'$\\frac{a+b}{2} \\ge \\sqrt{a \\cdot b}$'}</MathText>. Az egyenlőség kizárólag <MathText>{'$a = b$'}</MathText> esetén áll fenn.
              </p>
            </div>
            <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] font-mono font-semibold text-emerald-600 dark:text-emerald-400">
              <span>A ≥ G tétel</span>
              <span>Egyenlő ha a = b</span>
            </div>
          </div>

          {/* 2. Szabály */}
          <div className="bg-white dark:bg-slate-900/90 p-4 rounded-2xl border border-emerald-200 dark:border-emerald-800/60 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-lg bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 font-black text-xs flex items-center justify-center">2</span>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">Eltérések összege mindig nulla</h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Az adatok átlagtól vett előjeles eltéréseinek összege algebrailag mindig kiejti egymást: <MathText>{'$\\sum_{i=1}^n (x_i - \\bar{x}) = 0$'}</MathText>. Ezzel bármely hiányzó adat azonnal ellenőrizhető.
              </p>
            </div>
            <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] font-mono font-semibold text-emerald-600 dark:text-emerald-400">
              <span>Kiegyenlítődés</span>
              <span>Σ(xᵢ – x̄) = 0</span>
            </div>
          </div>

          {/* 3. Szabály */}
          <div className="bg-white dark:bg-slate-900/90 p-4 rounded-2xl border border-emerald-200 dark:border-emerald-800/60 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-lg bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 font-black text-xs flex items-center justify-center">3</span>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">Medián páros adatszám esetén</h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                A medián keresésekor az adatokat <b>kötelező nagyság szerint rendezni</b>. Páros <MathText>{'$n$'}</MathText> adatnál az <MathText>{'$\\frac{n}{2}$'}</MathText>-edik és <MathText>{'$\\left(\\frac{n}{2} + 1\\right)$'}</MathText>-edik értékek számtani közepe adja a mediánt.
              </p>
            </div>
            <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] font-mono font-semibold text-emerald-600 dark:text-emerald-400">
              <span>Rendezés kötelező!</span>
              <span>Páros n: átlagolni</span>
            </div>
          </div>

          {/* 4. Szabály */}
          <div className="bg-white dark:bg-slate-900/90 p-4 rounded-2xl border border-emerald-200 dark:border-emerald-800/60 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-lg bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 font-black text-xs flex items-center justify-center">4</span>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">A logikai szita és a komplementer</h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Két esemény uniójára: <MathText>{'$P(A \\cup B) = P(A) + P(B) - P(A \\cap B)$'}</MathText>. Ha egy feladatban a „legalább egy” kifejezés szerepel, a komplementer szabállyal gyorsabb: <MathText>{'$P(\\text{legalább egy}) = 1 - P(\\text{egyik sem})$'}</MathText>.
              </p>
            </div>
            <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] font-mono font-semibold text-emerald-600 dark:text-emerald-400">
              <span>Szita formula</span>
              <span>1 – P(egyik sem)</span>
            </div>
          </div>

          {/* 5. Szabály */}
          <div className="bg-white dark:bg-slate-900/90 p-4 rounded-2xl border border-emerald-200 dark:border-emerald-800/60 shadow-xs flex flex-col justify-between md:col-span-2 lg:col-span-1">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-lg bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 font-black text-xs flex items-center justify-center">5</span>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">Laplace-modell és a sorrend szerepe</h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                A klasszikus képlet <MathText>{'$P = \\frac{k}{n}$'}</MathText> csak akkor érvényes, ha az elemi események egyenlően valószínűek. Két kockánál a (3; 4) és (4; 3) két külön kimenetel, az összes eset száma <MathText>{'$6 \\times 6 = 36$'}</MathText>.
              </p>
            </div>
            <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] font-mono font-semibold text-emerald-600 dark:text-emerald-400">
              <span>Egyenlő esélyesség</span>
              <span>Összes eset: 36</span>
            </div>
          </div>
        </div>
      </div>

      {/* 1. SZEKCIÓ: KÖZÉPÉRTÉKEK ÉS EGYENLŐTLENSÉGEK SZINTÉZISE */}
      <TheorySection
        number={1}
        title="Középértékek szintézise: számtani és mértani közép"
        badge="ALAPPILLÉR"
        badgeColor="emerald"
        icon={<TrendingUp className="w-4 h-4 text-emerald-600" />}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 space-y-4">
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
              A fejezet elején megismertük a számtani közepet (egyszerű és súlyozott változatban) és a mértani közepet. 
              Minden statisztikai elemzés alapja a reprezentatív középérték helyes megválasztása.
            </p>

            <div className="space-y-3">
              <TheoryCard
                title="Egyszerű és súlyozott számtani közép"
                badge="x̄"
                color="emerald"
              >
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  Ha az adatok különböző darabszámmal (súllyal) szerepelnek, súlyozott átlagot számolunk:
                  <br />
                  <span className="font-mono text-emerald-700 dark:text-emerald-300 font-bold">
                    {'$\\bar{x}_w = \\frac{\\sum (w_i \\cdot x_i)}{\\sum w_i}$'}
                  </span>
                  <br />
                  Példa: Jánosék almái heti kilogrammonkénti átlagára a heti összbevétel osztva az összes eladott kilogrammal.
                </p>
              </TheoryCard>

              <TheoryCard
                title="Számtani és mértani közép tétele"
                badge="A ≥ G"
                color="blue"
              >
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  Két nemnegatív számra: <MathText>{'$\\frac{a+b}{2} \\ge \\sqrt{a \\cdot b}$'}</MathText>.
                  <br />
                  Geometriai jelentés: egy adott kerületű téglalapok közül a négyzetnek a legnagyobb a területe, 
                  illetve egy adott területű téglalapok közül a négyzetnek a legkisebb a kerülete.
                </p>
              </TheoryCard>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col items-center justify-center p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200 dark:border-slate-800">
            <AppleMarketWeightedAverageSvg size={260} />
            <span className="text-xs text-slate-500 dark:text-slate-400 mt-2 text-center">
              A súlyozott számtani közép és a napi bevételek struktúrája (Jánosék almái)
            </span>
          </div>
        </div>
      </TheorySection>

      {/* 2. SZEKCIÓ: HELYZETI ÉS SZÓRÓDÁSI MUTATÓK */}
      <TheorySection
        number={2}
        title="Helyzeti és szóródási mutatók: medián, módusz, szórás"
        badge="STATISZTIKA"
        badgeColor="blue"
        icon={<BarChart3 className="w-4 h-4 text-blue-600" />}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 space-y-4">
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
              Az átlag önmagában nem elegendő az adatsor jellemzésére: a kiugró értékek könnyen eltorzítják. 
              Ezért alkalmazunk helyzeti mutatókat (módusz, medián) és szóródási mutatókat (terjedelem, szórás).
            </p>

            <div className="space-y-3">
              <TheoryCard
                title="A 30 fős osztály érettségi jegyei (Érettségi 2017)"
                badge="3,20 átlag"
                color="indigo"
              >
                <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-1 leading-relaxed">
                  <li>• <b>Módusz (Mo):</b> A leggyakoribb jegy a 3-as (12 diák kapta).</li>
                  <li>• <b>Medián (Me):</b> A rendezett adatsor 15. és 16. tanulójának jegye mindkettő 3-as: <MathText>{'$\\frac{3+3}{2} = 3$'}</MathText>.</li>
                  <li>• <b>Átlag:</b> <MathText>{'$\\bar{x} = \\frac{2\\cdot 1 + 5\\cdot 2 + 12\\cdot 3 + 7\\cdot 4 + 4\\cdot 5}{30} = \\frac{96}{30} = 3,20$'}</MathText>.</li>
                  <li>• <b>Terjedelem (R):</b> <MathText>{'$5 - 1 = 4$'}</MathText>.</li>
                </ul>
              </TheoryCard>

              <TheoryTrapBox
                title="Típushiba a medián számításakor!"
                trap="Sokan az érdemjegyek lehetséges értékeinek számtani közepét veszik ((1+5)/2 = 3), vagy rendezetlen adatsorból választják a középső számot."
                correction="A mediánhoz MINDIG a gyakoriságok figyelembevételével, nagyság szerint rendezett teljes adatsorból kell megkeresni a középső elemet!"
              />
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col items-center justify-center p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200 dark:border-slate-800">
            <MathExamGradeDistributionSvg size={260} />
            <span className="text-xs text-slate-500 dark:text-slate-400 mt-2 text-center">
              A 30 fős osztály matematika érettségi vizsgajegyeinek oszlopdiagramja
            </span>
          </div>
        </div>
      </TheorySection>

      {/* 3. SZEKCIÓ: VÁLTOZÁSOK ÉS OSZTÁLYBA SOROLÁS */}
      <TheorySection
        number={3}
        title="Változások mértéke és az osztályba sorolás sajátosságai"
        badge="ANALÍZIS"
        badgeColor="amber"
        icon={<TrendingUp className="w-4 h-4 text-amber-600" />}
      >
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            Gyakorlati statisztikában gyakran találkozunk időbeli változásokkal és nagyméretű, folytonos adathalmazok osztályba sorolásával.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-amber-50 dark:bg-amber-950/40 rounded-2xl border border-amber-200 dark:border-amber-800 space-y-2">
              <h4 className="font-bold text-sm text-amber-900 dark:text-amber-200">
                Abszolút vs. Relatív megváltozás
              </h4>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                • <b>Abszolút változás:</b> <MathText>{'$\\Delta x = x_2 - x_1$'}</MathText> (mértékegységgel bíró különbség).
                <br />
                • <b>Relatív változás:</b> <MathText>{'$\\frac{x_2 - x_1}{x_1} = \\frac{\\Delta x}{x_1}$'}</MathText> (arány vagy százalék).
                <br />
                Vigyázat! Egy 20%-os majd 10%-os áremelés nem egyenlő 30%-os emeléssel: <MathText>{'$1,20 \\cdot 1,10 = 1,32$'}</MathText> (+32%).
              </p>
            </div>

            <div className="p-4 bg-orange-50 dark:bg-orange-950/40 rounded-2xl border border-orange-200 dark:border-orange-800 space-y-2">
              <h4 className="font-bold text-sm text-orange-900 dark:text-orange-200">
                Osztályközép és hisztogram csapda
              </h4>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                • Osztályba soroláskor az osztályba tartozó elemeket az <b>osztályközéppel</b> (<MathText>{'$\\frac{a+b}{2}$'}</MathText>) helyettesítjük.
                <br />
                • <b>Az átlagok átlagának veszélye:</b> Részcsoportok átlagait csak akkor szabad egyszerűen átlagolni, ha a csoportok létszáma azonos. Különben súlyozott átlagot kell képezni!
              </p>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 4. SZEKCIÓ: A VALÓSZÍNŰSÉG ALAPJAI ÉS A LAPLACE-MODELL */}
      <TheorySection
        number={4}
        title="A valószínűségszámítás alapjai és a klasszikus Laplace-modell"
        badge="VALÓSZÍNŰSÉG"
        badgeColor="purple"
        icon={<Dices className="w-4 h-4 text-purple-600" />}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 space-y-4">
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
              Véletlen kísérleteknél a kísérletek sokszori ismétlésével a <b>relatív gyakoriság</b> (<MathText>{'$g_k = \\frac{k}{n}$'}</MathText>) egy stabil érték körül ingadozik: ez a valószínűség objektív tartalma.
            </p>

            <div className="space-y-3">
              <TheoryCard
                title="Klasszikus valószínűségi mező (Laplace-modell)"
                badge="P = k / n"
                color="purple"
              >
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  Ha az eseménytér véges és minden elemi kimenetel egyenlően valószínű:
                  <br />
                  <span className="font-mono text-purple-700 dark:text-purple-300 font-bold">
                    {'P(A) = \\frac{\\text{kedvező esetek száma}}{\\text{összes lehetséges eset száma}}'}
                  </span>
                </p>
              </TheoryCard>

              <TheoryCard
                title="Kétkockás kétjegyű számok (Érettségi 2009)"
                badge="36 kimenetel"
                color="pink"
              >
                <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-1 leading-relaxed">
                  <li>• Fekete kocka (tízes), fehér kocka (egyes): 36 eset (11-től 66-ig).</li>
                  <li>• <b>Négyzetszámok:</b> 16, 25, 36, 64 ⟹ 4 eset: <MathText>{'$P = \\frac{4}{36} = \\frac{1}{9}$'}</MathText>.</li>
                  <li>• <b>Azonos számjegyek:</b> 11, 22, 33, 44, 55, 66 ⟹ 6 eset: <MathText>{'$P = \\frac{6}{36} = \\frac{1}{6}$'}</MathText>.</li>
                  <li>• <b>Számjegyek összege ≤ 9:</b> Komplementerrel összeg &gt; 9 (10, 11, 12: 6 eset) ⟹ <MathText>{'$P = \\frac{30}{36} = \\frac{5}{6}$'}</MathText>.</li>
                </ul>
              </TheoryCard>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col items-center justify-center p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200 dark:border-slate-800">
            <StatisticsProbabilityOverviewMapSvg size={260} />
            <span className="text-xs text-slate-500 dark:text-slate-400 mt-2 text-center">
              A fejezet elméleti elmetérképe: Statisztika és Valószínűségszámítás szintézise
            </span>
          </div>
        </div>
      </TheorySection>

      {/* 5. SZEKCIÓ: ÉRETTSÉGI ÉS KOMPETENCIAMÉRÉSI MESTERFELADATOK */}
      <TheorySection
        number={5}
        title="Érettségi és kompetenciamérési mesterfeladatok levezetése"
        badge="MESTERKURZUS"
        badgeColor="teal"
        icon={<CheckCircle2 className="w-4 h-4 text-teal-600" />}
      >
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
            Tekintsük át a tankönyv legfontosabb reprezentatív, összetett feladatait részletes matematikai levezetéssel!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Feladat 1: Két iskola versenyátlaga */}
            <div className="p-4 bg-teal-50 dark:bg-teal-950/40 rounded-2xl border border-teal-200 dark:border-teal-800 space-y-2">
              <h4 className="font-bold text-sm text-teal-900 dark:text-teal-200">
                1. Két iskola versenyátlaga (Csorba u. és Konkoly u.)
              </h4>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                Csorba u. átlaga 34, Konkoly u. átlaga 42, együttes átlaguk 36 pont.
                <br />
                <span className="font-mono text-teal-800 dark:text-teal-300 font-bold">
                  {'34n_1 + 42n_2 = 36(n_1 + n_2) \\implies 2n_1 = 6n_2 \\implies n_1 = 3n_2'}
                </span>
                <br />
                A Csorba utcai iskolából <b>háromszor annyian</b> indultak. Ha 40-nel többen indultak onnan: <MathText>{'$3n_2 - n_2 = 40 \\implies 2n_2 = 40 \\implies n_2 = 20$'}</MathText>, így <MathText>{'$n_1 = 60$'}</MathText> fő indult.
              </p>
            </div>

            {/* Feladat 2: Kamarakórus feladat */}
            <div className="p-4 bg-cyan-50 dark:bg-cyan-950/40 rounded-2xl border border-cyan-200 dark:border-cyan-800 space-y-2">
              <h4 className="font-bold text-sm text-cyan-900 dark:text-cyan-200">
                2. A kamarakórus korelnöke
              </h4>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                Minden tag legalább 40 éves, korelnök 54 éves, átlagéletkor 43 év. Ha a korelnök hiányzik, az átlag 42 év.
                <br />
                <span className="font-mono text-cyan-800 dark:text-cyan-300 font-bold">
                  {'43n - 54 = 42(n - 1) \\implies 43n - 54 = 42n - 42 \\implies n = 12 \\text{ fő}'}
                </span>
                <br />
                A kórus létszáma <b>12 fő</b>. A 11 tag összéletkora <MathText>{'$11 \\cdot 42 = 462$'}</MathText>. Ha a 10 legfiatalabb 40 éves (össz: 400), a második legidősebb <b>legfeljebb 54 éves</b> lehet (mivel senki sem idősebb a korelnöknél, aki 54).
              </p>
            </div>

            {/* Feladat 3: Zoknihúzás a kollégiumban */}
            <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl border border-emerald-200 dark:border-emerald-800 space-y-2">
              <h4 className="font-bold text-sm text-emerald-900 dark:text-emerald-200">
                3. A kollégista zoknihúzása (18 kék csíkos, 12 fekete)
              </h4>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                9 pár kék csíkos (18 db) és 6 pár fekete (12 db), összesen 30 zokni. Két zoknit húzunk visszatevés nélkül:
                <br />
                <span className="font-mono text-emerald-800 dark:text-emerald-300 font-bold">
                  {'P(\\text{azonos szín}) = \\frac{18 \\cdot 17 + 12 \\cdot 11}{30 \\cdot 29} = \\frac{306 + 132}{870} = \\frac{438}{870} \\approx 50,34\\%'}
                </span>
              </p>
            </div>

            {/* Feladat 4: Peti és a 4 fénykép (Érettségi 2010) */}
            <div className="p-4 bg-purple-50 dark:bg-purple-950/40 rounded-2xl border border-purple-200 dark:border-purple-800 space-y-2">
              <h4 className="font-bold text-sm text-purple-900 dark:text-purple-200">
                4. Peti 4 fényképe és borítékjai (Érettségi 2010)
              </h4>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                Összes kiosztás: <MathText>{'$4! = 24$'}</MathText> permutáció.
                <br />
                • <b>Pontosan egy kapja a sajátját:</b> Kiválasztjuk a szerencsést (4 lehetőség), a maradék 3 ember között senki sem kaphatja a sajátját (<MathText>{'$D_3 = 2$'}</MathText> lehetőség) ⟹ <MathText>{'$4 \\cdot 2 = 8$'}</MathText> eset (<MathText>{'$8/24 = 33,3\\%'}</MathText>).
                <br />
                • <b>Senki sem kapja a sajátját (zavart permutációk, <MathText>{'$D_4$'}</MathText>):</b> Pontosan <b>9 eset</b> ⟹ <MathText>{'$9/24 = 37,5\\%'}</MathText>.
                <br />
                Ezért a <b>B) eseménynél valószínűbb az A) esemény</b>!
              </p>
            </div>
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default ChapterSynthesisTheory;

