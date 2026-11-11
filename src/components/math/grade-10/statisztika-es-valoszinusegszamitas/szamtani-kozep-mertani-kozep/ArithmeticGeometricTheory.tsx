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
  AmGmThalesSvg,
  RectangleSquareComparisonSvg,
  ReciprocalSumGraphSvg,
  SalaryGrowthComparisonSvg
} from './ArithmeticGeometricFigures';
import {
  Scale,
  Sparkles,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  TrendingUp,
  Maximize2,
  Sliders,
  RotateCcw,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  HelpCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ArithmeticGeometricTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

export const ArithmeticGeometricTheory: React.FC<ArithmeticGeometricTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // --- 1. Interaktív Középérték & Szélsőérték Labor State ---
  const [aVal, setAVal] = useState<number>(18);
  const [bVal, setBVal] = useState<number>(50);

  // Számítások
  const arithMean = (aVal + bVal) / 2;
  const geomMean = Math.sqrt(aVal * bVal);
  const diff = arithMean - geomMean;
  const isEqual = Math.abs(aVal - bVal) < 0.001;

  // Téglalap és négyzet felületek
  const rectArea = aVal * bVal;
  const perimeter = 2 * (aVal + bVal);
  const squareSide = arithMean; // azonos kerületű négyzet oldala
  const squareArea = squareSide * squareSide;
  const areaSurplus = squareArea - rectArea;

  const handlePreset = (preset: 'equal' | 'salary' | 'rect' | 'extreme') => {
    if (preset === 'equal') {
      setAVal(25);
      setBVal(25);
    } else if (preset === 'salary') {
      setAVal(150);
      setBVal(216);
    } else if (preset === 'rect') {
      setAVal(27);
      setBVal(12);
    } else {
      setAVal(8);
      setBVal(98);
    }
  };

  const interactiveSection = (
    <div className="bg-gradient-to-br from-teal-900 via-slate-900 to-emerald-950 border-2 border-teal-500/30 rounded-3xl p-5 sm:p-7 text-white shadow-2xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-teal-800/60 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-teal-500 text-slate-950 rounded-2xl shadow-lg">
            <Sliders className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-black text-teal-100">
              Interaktív Középérték &amp; Szélsőérték Labor
            </h3>
            <p className="text-xs text-teal-300/80">
              Állítsd be az {'$a$'} és {'$b$'} pozitív értékeket, és figyeld meg az AM-GM egyenlőtlenség és a téglalap-terület viselkedését!
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          <Button
            size="sm"
            variant="outline"
            className="text-xs h-8 bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-teal-900"
            onClick={() => handlePreset('equal')}
          >
            Egyenlő (a = b)
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="text-xs h-8 bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-teal-900"
            onClick={() => handlePreset('rect')}
          >
            Téglalap (27; 12)
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="text-xs h-8 bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-teal-900"
            onClick={() => handlePreset('extreme')}
          >
            Nagy eltérés (8; 98)
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Bal oldali vezérlők és eredmények */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-slate-800/60 p-4 rounded-2xl border border-teal-700/40 space-y-3">
            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-blue-400">Első szám (a): {aVal}</span>
                <span className="text-slate-400">Tartomány: 1 – 150</span>
              </div>
              <input
                type="range"
                min="1"
                max="150"
                value={aVal}
                onChange={(e) => setAVal(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-purple-400">Második szám (b): {bVal}</span>
                <span className="text-slate-400">Tartomány: 1 – 250</span>
              </div>
              <input
                type="range"
                min="1"
                max="250"
                value={bVal}
                onChange={(e) => setBVal(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
              />
            </div>
          </div>

          {/* Számított közepek kártyái */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3.5 bg-emerald-950/60 border border-emerald-500/40 rounded-xl text-center">
              <div className="text-[11px] font-bold text-emerald-300 uppercase tracking-wider">
                Számtani közép (A)
              </div>
              <div className="text-xl sm:text-2xl font-black text-emerald-200 mt-0.5">
                {arithMean.toFixed(2)}
              </div>
              <div className="text-[10px] text-emerald-400/80 mt-1">
                ({aVal} + {bVal}) / 2
              </div>
            </div>

            <div className="p-3.5 bg-rose-950/60 border border-rose-500/40 rounded-xl text-center">
              <div className="text-[11px] font-bold text-rose-300 uppercase tracking-wider">
                Mértani közép (G)
              </div>
              <div className="text-xl sm:text-2xl font-black text-rose-200 mt-0.5">
                {geomMean.toFixed(2)}
              </div>
              <div className="text-[10px] text-rose-400/80 mt-1">
                √({aVal} · {bVal})
              </div>
            </div>
          </div>

          {/* Összehasonlító állapotjelző */}
          <div
            className={`p-3.5 rounded-xl border text-xs leading-relaxed font-bold flex items-center justify-between ${
              isEqual
                ? 'bg-emerald-900/50 border-emerald-400 text-emerald-200'
                : 'bg-teal-900/40 border-teal-500/50 text-teal-200'
            }`}
          >
            <span>
              {isEqual ? (
                <>⚖️ <b>EGYENLŐSÉG!</b> Mivel a = b = {aVal}, ezért A = G = {arithMean.toFixed(2)}</>
              ) : (
                <>
                  📈 <b>A &gt; G</b>: Számtani közép {diff.toFixed(2)}-del nagyobb a mértaninál!
                </>
              )}
            </span>
            <span className="text-xs bg-black/30 px-2 py-1 rounded">
              Δ = {diff.toFixed(2)}
            </span>
          </div>

          {/* Terület-optimalizálási statisztika */}
          <div className="bg-slate-800/40 p-3 rounded-xl border border-slate-700/60 text-[11px] text-slate-300 space-y-1">
            <div className="flex justify-between">
              <span>Azonos kerületű téglalap (K = {perimeter}):</span>
              <b className="text-blue-300">T = {rectArea.toFixed(1)}</b>
            </div>
            <div className="flex justify-between">
              <span>Azonos kerületű négyzet (s = {squareSide.toFixed(1)}):</span>
              <b className="text-emerald-300">T_max = {squareArea.toFixed(1)}</b>
            </div>
            <div className="flex justify-between pt-1 border-t border-slate-700 font-bold text-teal-200">
              <span>Négyzet területi többlete:</span>
              <span>+{areaSurplus.toFixed(1)} ({((areaSurplus / (rectArea || 1)) * 100).toFixed(1)}%)</span>
            </div>
          </div>
        </div>

        {/* Jobb oldali dinamikus grafikai megjelenítés */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center p-3 bg-slate-950/60 rounded-2xl border border-teal-800/50">
          <AmGmThalesSvg size={290} aVal={aVal} bVal={bVal} />
          <div className="text-[11px] text-teal-300/80 text-center mt-2">
            A Thálész-félkörben az érintési magasság: <span className="text-rose-400 font-bold">m = {geomMean.toFixed(2)}</span>,
            a kör sugara: <span className="text-emerald-400 font-bold">R = {arithMean.toFixed(2)}</span>.
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <TheoryTemplate
      title="Számtani közép, mértani közép"
      subtitle="A két nevezetes középérték definíciója, az egyenlőtlenség algebrai és geometriai bizonyítása, valamint szélsőérték-feladatok"
      badge="10. OSZTÁLY • STATISZTIKA ÉS VALÓSZÍNŰSÉGSZÁMÍTÁS"
      themeColor="teal"
      documentId="grade10-arithmetic-geometric-mean-theory"
      quickRule={{
        label: 'FONTOS SZABÁLYOK: AZ AM-GM EGYENLŐTLENSÉG',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-200 text-xs sm:text-sm">
            <div className="bg-teal-50/90 dark:bg-teal-950/40 p-2.5 rounded-xl border border-teal-200 dark:border-teal-800">
              <span className="font-black text-teal-900 dark:text-teal-300 block mb-1">
                Alaptétel és egyenlőség feltétele:
              </span>
              <ul className="space-y-1 text-slate-700 dark:text-slate-300 font-medium">
                <li>• <strong>Egyenlőtlenség:</strong> <MathText>{'$\\frac{a + b}{2} \\ge \\sqrt{a \\cdot b}$'}</MathText> (minden <MathText>{'$a, b > 0$'}</MathText> esetén)</li>
                <li>• <strong>Egyenlőség:</strong> <MathText>{'$\\frac{a+b}{2} = \\sqrt{ab} \\iff a = b$'}</MathText></li>
                <li>• <strong>Reciprok-összeg:</strong> <MathText>{'$a + \\frac{1}{a} \\ge 2$'}</MathText> (egyenlőség ha <MathText>{'$a = 1$'}</MathText>)</li>
              </ul>
            </div>
            <div className="bg-amber-50 dark:bg-amber-950/40 p-2 rounded-lg border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-300 text-[11px] leading-tight">
              <strong>💡 SZÉLSŐÉRTÉK SZABÁLY:</strong> Állandó kerülethez a <u>négyzet</u> területe maximális; állandó területhez a <u>négyzet</u> kerülete minimális!
            </div>
          </div>
        )
      }}
      interactiveSection={interactiveSection}
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      practiceTitle="Teszteld a tudásodat a számtani és mértani középből!"
      practiceSubtitle="Oldd meg a 30 válogatott kompetencia-, érettségi és emelt szintű feladatot!"
      practiceButtonText="Számtani és mértani közép Kvíz indítása"
      tips={[
        {
          title: 'Egyenlőség csak egyenlő számoknál',
          content: 'A számtani és mértani közép akkor és csakis akkor egyenlő, ha a = b. Ha két szám nem egyenlő, a számtani közép szigorúan nagyobb a mértani középnél!'
        },
        {
          title: 'Szélsőérték felismerése',
          content: 'Ha egy feladatban két változó összege állandó (pl. kerítés hossza), a szorzatuk (terület) négyzet esetén a legnagyobb. Ha a szorzatuk állandó, az összegük négyzetnél a legkisebb.'
        },
        {
          title: 'Pénzügyi és kamatos szorzók',
          content: 'Ha egy tőke egymást követő években q₁ és q₂-szeresére nő, az átlagos éves szorzó NEM a számtani, hanem a mértani közép: q_átlag = √(q₁ · q₂)!'
        }
      ]}
    >
      {/* KIEMELT FONTOS SZABÁLYOK SZEKCIÓ A TANANYAG ELEJÉN */}
      <div className="bg-gradient-to-r from-teal-50 via-emerald-50 to-cyan-50 dark:from-teal-950/40 dark:via-emerald-950/30 dark:to-cyan-950/30 rounded-2xl sm:rounded-3xl p-5 sm:p-7 border-2 border-teal-300/80 dark:border-teal-800 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-teal-200/80 dark:border-teal-800/80 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 sm:p-3 bg-teal-600 text-white rounded-2xl shadow-md">
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-teal-100 dark:bg-teal-900/60 text-teal-800 dark:text-teal-300 border border-teal-200 dark:border-teal-700 mb-1">
                SZABÁLYTÁR &amp; MEMÓRIAPANELL
              </div>
              <h2 className="text-lg sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                Fontos szabályok a számtani és mértani középhez
              </h2>
            </div>
          </div>
          <span className="text-xs font-semibold text-teal-700 dark:text-teal-300 bg-teal-100/80 dark:bg-teal-900/40 px-3 py-1.5 rounded-xl border border-teal-200 dark:border-teal-800 self-start sm:self-auto">
            5 aranyszabály minden feladathoz
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
          {/* 1. Szabály */}
          <div className="bg-white dark:bg-slate-900/90 p-4 rounded-2xl border border-teal-200 dark:border-teal-800/60 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-lg bg-teal-100 dark:bg-teal-900/60 text-teal-800 dark:text-teal-300 font-black text-xs flex items-center justify-center">1</span>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">A két középérték képlete</h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Két pozitív <MathText>{'$a, b$'}</MathText> valós szám számtani és mértani közepe:
              </p>
              <div className="my-2 p-2 bg-teal-50 dark:bg-teal-950/50 rounded-xl text-center font-bold text-teal-800 dark:text-teal-300 text-xs sm:text-sm border border-teal-100 dark:border-teal-800">
                <MathText>{'$A = \\frac{a + b}{2} \\quad \\text{és} \\quad G = \\sqrt{a \\cdot b}$'}</MathText>
              </div>
            </div>
            <p className="text-[11px] text-teal-700 dark:text-teal-400 font-medium mt-1">
              💡 A mértani közép csak nemnegatív számokra értelmezett valós értékként!
            </p>
          </div>

          {/* 2. Szabály */}
          <div className="bg-white dark:bg-slate-900/90 p-4 rounded-2xl border border-emerald-200 dark:border-emerald-800/60 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-lg bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 font-black text-xs flex items-center justify-center">2</span>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">Az AM-GM alaptétel</h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Bármely két pozitív szám számtani közepe legalább akkora, mint a mértani közepük:
              </p>
              <div className="my-2 p-2 bg-emerald-50 dark:bg-emerald-950/50 rounded-xl text-center font-bold text-emerald-800 dark:text-emerald-300 text-xs sm:text-sm border border-emerald-100 dark:border-emerald-800">
                <MathText>{'$\\frac{a + b}{2} \\ge \\sqrt{a \\cdot b}$'}</MathText>
              </div>
            </div>
            <p className="text-[11px] text-emerald-700 dark:text-emerald-400 font-medium mt-1">
              💡 A két szám közötti távolság növekedésével a különbség (A - G) is nő.
            </p>
          </div>

          {/* 3. Szabály */}
          <div className="bg-white dark:bg-slate-900/90 p-4 rounded-2xl border border-indigo-200 dark:border-indigo-800/60 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-lg bg-indigo-100 dark:bg-indigo-900/60 text-indigo-800 dark:text-indigo-300 font-black text-xs flex items-center justify-center">3</span>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">Egyenlőség szigorú feltétele</h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Egyenlőség <MathText>{'$A = G$'}</MathText> akkor és csakis akkor áll fenn, ha a két szám azonos:
              </p>
              <div className="my-2 p-2 bg-indigo-50 dark:bg-indigo-950/50 rounded-xl text-center font-bold text-indigo-800 dark:text-indigo-300 text-xs sm:text-sm border border-indigo-100 dark:border-indigo-800">
                <MathText>{'$\\frac{a + b}{2} = \\sqrt{a \\cdot b} \\iff a = b$'}</MathText>
              </div>
            </div>
            <p className="text-[11px] text-indigo-700 dark:text-indigo-400 font-medium mt-1">
              💡 Ha a ≠ b, akkor mindig szigorú egyenlőtlenség érvényes: A &gt; G!
            </p>
          </div>

          {/* 4. Szabály */}
          <div className="bg-white dark:bg-slate-900/90 p-4 rounded-2xl border border-purple-200 dark:border-purple-800/60 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-lg bg-purple-100 dark:bg-purple-900/60 text-purple-800 dark:text-purple-300 font-black text-xs flex items-center justify-center">4</span>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">A reciprok-összeg tétele</h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Minden <MathText>{'$a > 0$'}</MathText> pozitív valós szám és a reciproka összege legalább 2:
              </p>
              <div className="my-2 p-2 bg-purple-50 dark:bg-purple-950/50 rounded-xl text-center font-bold text-purple-800 dark:text-purple-300 text-xs sm:text-sm border border-purple-100 dark:border-purple-800">
                <MathText>{'$a + \\frac{1}{a} \\ge 2 \\quad (\\text{egyenlőség: } a = 1)$'}</MathText>
              </div>
            </div>
            <p className="text-[11px] text-purple-700 dark:text-purple-400 font-medium mt-1">
              💡 Negatív számokra ennek tükörképe érvényes: a + 1/a ≤ -2 (ha a &lt; 0).
            </p>
          </div>

          {/* 5. Szabály */}
          <div className="md:col-span-2 lg:col-span-2 bg-gradient-to-r from-amber-50 to-teal-50 dark:from-amber-950/40 dark:to-teal-950/40 p-4 rounded-2xl border-2 border-amber-300/80 dark:border-amber-800 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <Maximize2 className="w-5 h-5 text-amber-600 shrink-0" />
                <h3 className="font-black text-sm text-amber-950 dark:text-amber-200">
                  5. ARANYSZABÁLY: Szélsőérték és optimalizálás téglalapoknál
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2 text-xs text-slate-700 dark:text-slate-300">
                <div className="p-2.5 bg-white/80 dark:bg-slate-900/80 rounded-xl border border-amber-200 dark:border-amber-800/60">
                  <b className="text-amber-800 dark:text-amber-300 block mb-0.5">Állandó kerület (K = állandó):</b>
                  A téglalap területe (<MathText>{'$T = a \\cdot b$'}</MathText>) akkor maximális, ha a téglalap <b>négyzet</b> (<MathText>{'$a = b$'}</MathText>).
                </div>
                <div className="p-2.5 bg-white/80 dark:bg-slate-900/80 rounded-xl border border-teal-200 dark:border-teal-800/60">
                  <b className="text-teal-800 dark:text-teal-300 block mb-0.5">Állandó terület (T = állandó):</b>
                  A téglalap kerülete (<MathText>{'$K = 2(a+b)$'}</MathText>) akkor minimális, ha a téglalap <b>négyzet</b> (<MathText>{'$a = b$'}</MathText>).
                </div>
              </div>
            </div>
            <div className="mt-2 pt-2 border-t border-amber-200/80 dark:border-amber-800/80 flex items-center justify-between text-[11px] font-bold text-amber-900 dark:text-amber-300">
              <span>Alkalmazás: Telekbekerítés minimális kerítéssel, maximális termőterület kialakítása!</span>
              <span className="hidden sm:inline bg-amber-200/80 dark:bg-amber-900/60 px-2 py-0.5 rounded text-amber-950 dark:text-amber-200">Érettségi kulcsfeladat!</span>
            </div>
          </div>
        </div>
      </div>

      {/* 1. Szekció: Definíciók és történeti eredet */}
      <TheorySection
        number={1}
        title="A számtani és mértani közép fogalma, történeti eredete"
        badge="FOGALMAK ÉS ARÁNYOK"
        badgeColor="teal"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 space-y-4">
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              A matematikában két szám "közepét" többféleképpen is meghatározhatjuk attól függően, hogy milyen kapcsolatot (különbséget vagy arányt) tartunk állandónak.
            </p>

            <TheoryCard
              title="A két középérték matematikai definíciója"
              type="definition"
            >
              <div className="space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                <div>
                  <b>1. Számtani közép (aritmetikai közép):</b> Bármely két <MathText>{'$a, b$'}</MathText> valós szám esetén az összegük fele:
                  <div className="my-1.5 p-2 bg-teal-50 dark:bg-teal-950/40 rounded-xl text-center font-bold text-teal-800 dark:text-teal-300">
                    <MathText>{'$A = \\frac{a + b}{2}$'}</MathText>
                  </div>
                </div>
                <div>
                  <b>2. Mértani közép (geometriai közép):</b> Két nemnegatív <MathText>{'$a, b \\ge 0$'}</MathText> valós szám esetén a szorzatuk négyzetgyöke:
                  <div className="my-1.5 p-2 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl text-center font-bold text-emerald-800 dark:text-emerald-300">
                    <MathText>{'$G = \\sqrt{a \\cdot b}$'}</MathText>
                  </div>
                </div>
              </div>
            </TheoryCard>

            <TheoryCallout title="Honnan ered az elnevezés? (Történeti érdekesség)" type="example">
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                Az ókorban két szám különbségét <b>számtani aránynak</b>, két szám hányadosát pedig <b>mértani aránynak</b> nevezték.
                <br />
                • Ha <MathText>{'$a - x = x - b$'}</MathText> (egyenlő számtani különbségek), akkor rendezve <MathText>{'$2x = a + b \\implies x = \\frac{a+b}{2}$'}</MathText>. Ezt hívták <i>számtani középarányosnak</i>.
                <br />
                • Ha <MathText>{'$a : x = x : b$'}</MathText> (egyenlő geometriai hányadosok), akkor a belső és külső szorzatokból <MathText>{'$x^2 = a \\cdot b \\implies x = \\sqrt{ab}$'}</MathText>. Ezt hívták <i>mértani középarányosnak</i>.
              </p>
            </TheoryCallout>
          </div>

          <div className="lg:col-span-5 flex flex-col items-center justify-center p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <SalaryGrowthComparisonSvg size={260} />
            <span className="text-xs text-slate-500 dark:text-slate-400 mt-2 text-center font-medium">
              Antal fix összeggel növekvő bére (<MathText>{'$183$'}</MathText> ezer) meghaladja Benő fix szorzóval növekvő bérét (<MathText>{'$180$'}</MathText> ezer)
            </span>
          </div>
        </div>
      </TheorySection>

      {/* 2. Szekció: Az egyenlőtlenség algebrai bizonyítása */}
      <TheorySection
        number={2}
        title="A nevezetes egyenlőtlenség és algebrai bizonyítása"
        badge="TÉTEL ÉS BIZONYÍTÁS"
        badgeColor="indigo"
      >
        <div className="space-y-4">
          <TheoryCard
            title="A számtani és mértani közép közötti egyenlőtlenség tétele"
            type="theorem"
          >
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              Bármely két pozitív <MathText>{'$a, b > 0$'}</MathText> valós szám esetén a számtani közép nagyobb vagy egyenlő, mint a mértani közép:
            </p>
            <div className="my-2.5 p-3 bg-indigo-50 dark:bg-indigo-950/40 rounded-xl text-center font-black text-indigo-800 dark:text-indigo-300 text-sm sm:text-base border border-indigo-200 dark:border-indigo-800">
              <MathText>{'$\\frac{a + b}{2} \\ge \\sqrt{a \\cdot b}$'}</MathText>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Egyenlőség akkor és csak akkor áll fenn, ha a két szám pontosan megegyezik: <MathText>{'$a = b$'}</MathText>.
            </p>
          </TheoryCard>

          <div className="bg-slate-50 dark:bg-slate-800/50 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3">
            <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Lépésről lépésre: Az algebrai bizonyítás menete
            </h4>
            <div className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              <p>
                Mivel <MathText>{'$a, b > 0$'}</MathText>, mindkét oldal pozitív valós szám. Két pozitív szám közül az a nagyobb, amelyiknek a négyzete nagyobb. Négyzetre emelünk:
              </p>
              <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 font-mono text-center space-y-1">
                <div><MathText>{'$\\left(\\frac{a + b}{2}\\right)^2 \\ge (\\sqrt{ab})^2$'}</MathText></div>
                <div className="text-slate-400 text-xs">kifejtjük a számlálót és elvégezzük a négyzetre emelést:</div>
                <div><MathText>{'$\\frac{a^2 + 2ab + b^2}{4} \\ge ab$'}</MathText></div>
                <div className="text-slate-400 text-xs">beszorzunk 4-gyel (pozitív számmal szorozva az egyenlőtlenség iránya megmarad):</div>
                <div><MathText>{'$a^2 + 2ab + b^2 \\ge 4ab$'}</MathText></div>
                <div className="text-slate-400 text-xs">mindkét oldalból levonunk 4ab-t:</div>
                <div><MathText>{'$a^2 - 2ab + b^2 \\ge 0$'}</MathText></div>
                <div className="text-slate-400 text-xs">észrevesszük a teljes négyzet azonosságot:</div>
                <div className="text-emerald-700 dark:text-emerald-400 font-bold text-sm">
                  <MathText>{'$(a - b)^2 \\ge 0$'}</MathText>
                </div>
              </div>
              <p className="pt-1">
                <b>Következtetés:</b> Mivel bármely valós szám négyzete nemnegatív (<MathText>{'$(a - b)^2 \\ge 0$'}</MathText>), az egyenlőtlenség <b>minden valós számpárra igaz</b>. Visszafelé követve az ekvivalens átalakításokat, az eredeti állítás is maradéktalanul igaz.
                <br />
                Egyenlőség (<MathText>{'$(a - b)^2 = 0$'}</MathText>) pontosan akkor lehetséges, ha <MathText>{'$a - b = 0 \\iff a = b$'}</MathText>. Q.E.D.
              </p>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 3. Szekció: Geometriai szemléltetés és bizonyítás */}
      <TheorySection
        number={3}
        title="Geometriai bizonyítás Thálész-körrel és a magasságtétellel"
        badge="GEOMETRIAI BIZONYÍTÁS"
        badgeColor="emerald"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 space-y-4">
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              Az egyenlőtlenség csodálatos geometriai képet nyújt, ha felidézzük a derékszögű háromszögekre vonatkozó <b>Thálész-tételt</b> és a <b>magasságtételt</b>.
            </p>

            <TheoryCard
              title="A magasságtétel geometriai modellje"
              type="property"
            >
              <ul className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 space-y-2 list-disc list-inside">
                <li>
                  Vegyünk fel egy egyenesen egy <MathText>{'$a$'}</MathText> és egy <MathText>{'$b$'}</MathText> hosszúságú szakaszt egymás folytatásaként. A teljes szakasz hossza: <MathText>{'$a + b$'}</MathText>.
                </li>
                <li>
                  Rajzoljunk e szakasz fölé mint átmérő fölé egy félkört! A félkör sugara:
                  <span className="font-bold text-emerald-700 dark:text-emerald-400 pl-1">
                    <MathText>{'$R = \\frac{a + b}{2}$'}</MathText>
                  </span> (ez éppen a két szakasz <b>számtani közepe</b>).
                </li>
                <li>
                  Az <MathText>{'$a$'}</MathText> és <MathText>{'$b$'}</MathText> szakaszok találkozási pontjában emeljünk merőlegest a félkörívig! A magasságtétel szerint a derékszögű háromszög átfogóhoz tartozó magassága:
                  <span className="font-bold text-rose-600 dark:text-rose-400 pl-1">
                    <MathText>{'$m = \\sqrt{a \\cdot b}$'}</MathText>
                  </span> (ez a két szakasz <b>mértani közepe</b>).
                </li>
                <li>
                  <b>A geometriai bizonyítás kulcsa:</b> A körben a középpontból húzott merőleges a kör sugara (<MathText>{'$R$'}</MathText>). Bármely más pontból emelt merőleges szakasz hossza (<MathText>{'$m$'}</MathText>) egy derékszögű háromszög befogója vagy belső szakasza, így sosem haladhatja meg a sugarat:
                  <span className="font-black text-slate-900 dark:text-white pl-1">
                    <MathText>{'$m \\le R \\iff \\sqrt{ab} \\le \\frac{a + b}{2}$'}</MathText>
                  </span>!
                </li>
              </ul>
            </TheoryCard>
          </div>

          <div className="lg:col-span-5 flex flex-col items-center justify-center p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <AmGmThalesSvg size={270} aVal={60} bVal={140} />
            <span className="text-xs text-slate-500 dark:text-slate-400 mt-2 text-center font-medium">
              A merőleges magasság (<MathText>{'$\\sqrt{ab}$'}</MathText>) legfeljebb a kör sugaráig (<MathText>{'$\\frac{a+b}{2}$'}</MathText>) érhet el!
            </span>
          </div>
        </div>
      </TheorySection>

      {/* 4. Szekció: Szélsőérték-feladatok: Kerület és terület */}
      <TheorySection
        number={4}
        title="Szélsőérték-feladatok: Kerület és terület optimalizálása"
        badge="SZÉLSŐÉRTÉKEK ÉS GYAKORLAT"
        badgeColor="amber"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 space-y-4">
            <TheoryCard
              title="1. Feladat: Telek bekerítése adott kerítéssel (Maximális terület)"
              type="example"
            >
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                Legfeljebb mekkora lehet annak a téglalap alakú teleknek a területe, amelyet <b>52 méter</b> hosszú kerítéssel tudunk körbekeríteni?
              </p>
              <div className="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-xl text-xs sm:text-sm space-y-1.5 border border-amber-200 dark:border-amber-800 mt-2">
                <div><b>1. Lépés:</b> A kerület: <MathText>{'$2a + 2b = 52 \\implies a + b = 26$'}</MathText> méter.</div>
                <div><b>2. Lépés:</b> Az oldalak számtani közepe rögzített: <MathText>{'$\\frac{a + b}{2} = \\frac{26}{2} = 13$'}</MathText>.</div>
                <div><b>3. Lépés:</b> Alkalmazzuk a tételt: <MathText>{'$\\sqrt{a \\cdot b} \\le \\frac{a + b}{2} = 13$'}</MathText>.</div>
                <div><b>4. Lépés:</b> Négyzetre emelve: <MathText>{'$T = a \\cdot b \\le 13^2 = 169\\text{ m}^2$'}</MathText>.</div>
                <div className="font-bold text-amber-900 dark:text-amber-200 pt-1 border-t border-amber-200 dark:border-amber-700">
                  A maximális terület 169 m², amelyet pontosan akkor érünk el, ha a telek négyzet: <MathText>{'$a = b = 13\\text{ m}$'}</MathText>!
                </div>
              </div>
            </TheoryCard>

            <TheoryCard
              title="2. Feladat: Adott terület bekerítése (Minimális kerület)"
              type="example"
            >
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                Legalább mekkora kerítés szükséges egy <b>100 m²</b> területű téglalap alakú kert körbekerítéséhez?
              </p>
              <div className="p-3 bg-teal-50 dark:bg-teal-950/40 rounded-xl text-xs sm:text-sm space-y-1.5 border border-teal-200 dark:border-teal-800 mt-2">
                <div><b>1. Lépés:</b> A terület rögzített: <MathText>{'$a \\cdot b = 100 \\implies \\sqrt{ab} = \\sqrt{100} = 10$'}</MathText>.</div>
                <div><b>2. Lépés:</b> Alkalmazzuk a tételt: <MathText>{'$\\frac{a + b}{2} \\ge \\sqrt{ab} = 10 \\implies a + b \\ge 20$'}</MathText>.</div>
                <div><b>3. Lépés:</b> A kerület: <MathText>{'$K = 2(a + b) \\ge 2 \\cdot 20 = 40\\text{ m}$'}</MathText>.</div>
                <div className="font-bold text-teal-900 dark:text-teal-200 pt-1 border-t border-teal-200 dark:border-teal-700">
                  A minimális kerület 40 m, amelyhez a kertnek négyzet alakúnak kell lennie: <MathText>{'$a = b = 10\\text{ m}$'}</MathText>!
                </div>
              </div>
            </TheoryCard>
          </div>

          <div className="lg:col-span-5 flex flex-col items-center justify-center p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <RectangleSquareComparisonSvg size={270} />
            <span className="text-xs text-slate-500 dark:text-slate-400 mt-2 text-center font-medium">
              Ugyanazzal a kerülettel (<MathText>{'$K = 78$'}</MathText> cm) a négyzet területe (<MathText>{'$380,25$'}</MathText> cm²) jelentősen meghaladja a lapos téglalapét (<MathText>{'$324$'}</MathText> cm²)
            </span>
          </div>
        </div>
      </TheorySection>

      {/* 5. Szekció: A reciprok-összeg és pénzügyi alkalmazások */}
      <TheorySection
        number={5}
        title="A reciprok-összeg tétele és pénzügyi növekedési ráták"
        badge="EMELT TÉTELEK ÉS PÉNZÜGYEK"
        badgeColor="purple"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 space-y-4">
            <TheoryCard
              title="A reciprok-összeg nevezetes egyenlőtlensége"
              type="theorem"
            >
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                Bizonyítsuk be, hogy ha <MathText>{'$a > 0$'}</MathText> tetszőleges pozitív valós szám, akkor:
              </p>
              <div className="my-2 p-2.5 bg-purple-50 dark:bg-purple-950/40 rounded-xl text-center font-black text-purple-800 dark:text-purple-300 text-sm border border-purple-200 dark:border-purple-800">
                <MathText>{'$a + \\frac{1}{a} \\ge 2$'}</MathText>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                <b>Bizonyítás:</b> Alkalmazzuk a számtani és mértani közép egyenlőtlenségét az <MathText>{'$a$'}</MathText> és <MathText>{'$\\frac{1}{a}$'}</MathText> pozitív számokra:
                <br />
                <MathText>{'$\\frac{a + \\frac{1}{a}}{2} \\ge \\sqrt{a \\cdot \\frac{1}{a}} = \\sqrt{1} = 1$'}</MathText>.
                <br />
                Mindkét oldalt 2-vel megszorozva: <MathText>{'$a + \\frac{1}{a} \\ge 2$'}</MathText>. Egyenlőség csak akkor áll fenn, ha <MathText>{'$a = \\frac{1}{a} \\iff a^2 = 1 \\iff a = 1$'}</MathText>.
              </p>
            </TheoryCard>

            <TheoryTrapBox title="Pénzügyi csapda: Hogyan számoljunk átlagos éves növekedést?">
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                Egy 10 millió Ft-os befektetés az 1. évben <b>1,21-szeresére</b>, a 2. évben pedig <b>1,69-szeresére</b> nőtt. Mennyi volt az átlagos éves szorzó?
                <br />
                <span className="text-rose-600 font-bold">Hibás számtani közép:</span> <MathText>{'$(1,21 + 1,69) / 2 = 1,45$'}</MathText>. Ha évente 1,45-tel szoroznánk, a tőke <MathText>{'$1,45^2 = 2,1025$'}</MathText>-szörösére nőne, ami téves!
                <br />
                <span className="text-emerald-700 dark:text-emerald-400 font-bold">Helyes mértani közép:</span> A kétéves szorzat <MathText>{'$1,21 \\cdot 1,69 = 2,0449$'}</MathText>. Az átlagos éves szorzó ennek négyzetgyöke:
                <br />
                <MathText>{'$q = \\sqrt{1,21 \\cdot 1,69} = \\sqrt{1,21} \\cdot \\sqrt{1,69} = 1,1 \\cdot 1,3 = 1,43$'}</MathText>!
                <br />
                (Az átlagos éves hozam tehát <b>+43%</b>, és nem 45%!)
              </p>
            </TheoryTrapBox>
          </div>

          <div className="lg:col-span-5 flex flex-col items-center justify-center p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <ReciprocalSumGraphSvg size={260} />
            <span className="text-xs text-slate-500 dark:text-slate-400 mt-2 text-center font-medium">
              Az <MathText>{'$f(x) = x + 1/x$'}</MathText> függvény minimuma a <MathText>{'$(1; 2)$'}</MathText> pontban van
            </span>
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default ArithmeticGeometricTheory;

