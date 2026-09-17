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
import {
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Calculator,
  Layers,
  ArrowRight,
  Divide,
  HelpCircle,
  RefreshCw,
  PieChart,
  Maximize2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { MathText } from '@/components/math/shared/MathText';

export interface FractionDivideTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
  onSwitchToQuiz?: () => void;
}

// Math helpers: GCD
function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) {
    const t = b;
    b = a % b;
    a = t;
  }
  return a || 1;
}

export const FractionDivideTheory: React.FC<FractionDivideTheoryProps> = ({
  onBack,
  onStartQuiz,
  onSwitchToQuiz
}) => {
  const handleStartQuiz = onStartQuiz || onSwitchToQuiz;

  // Interactive Math Lab State
  const [num, setNum] = useState<number>(4);
  const [den, setDen] = useState<number>(5);
  const [divisor, setDivisor] = useState<number>(2);

  // Rule 1: Check if numerator is divisible by divisor
  const isNumDivisible = num % divisor === 0;
  const rule1Num = isNumDivisible ? num / divisor : null;
  const rule1Den = den;

  // Rule 2: Multiply denominator
  const rule2Num = num;
  const rule2Den = den * divisor;
  const d2 = gcd(rule2Num, rule2Den);
  const simplifiedNum = rule2Num / d2;
  const simplifiedDen = rule2Den / d2;

  return (
    <TheoryTemplate
      title="Tört osztása pozitív egész számmal"
      subtitle="Ismerd meg a tört osztásának 2 alapvető szabályát: mikor osztjuk a számlálót, és mikor szorozzuk a nevezőt!"
      badgeText="🍕 5. Osztály • II. Törtek, tizedes törtek"
      documentId="fraction-divide-theory-content"
      pdfFilename="5_osztaly_tort_osztasa_pozitiv_egesz_szammal_tananyag.pdf"
      quickRule={{
        label: 'TÖRT OSZTÁSA TERMÉSZETES SZÁMMAL',
        formula: 'a/b : n = (a : n)/b | vagy a/b : n = a/(b · n)'
      }}
      themeColor="indigo"
      onBack={onBack}
      onStartQuiz={handleStartQuiz}
    >
      {/* 1. SZAKASZ: MIT JELENT EGY TÖRTET ELOSZTANI EGY EGÉSZ SZÁMMAL? */}
      <TheorySection
        number={1}
        title="Mit jelent a tört osztása természetes számmal?"
        icon={<PieChart className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />}
        badgeColor="indigo"
      >
        <TheoryCard
          title="A felosztás és egyenlő elosztás szemlélete"
          icon={<Lightbulb className="w-5 h-5 text-amber-500" />}
        >
          <div className="space-y-4">
            <p className="leading-relaxed">
              Képzeld el, hogy a hűtőben van <MathText>4/5</MathText> tábla csoki (azaz 4 darab ötödrész szelet), és ezt <strong className="text-indigo-600 dark:text-indigo-400">2 gyerek között egyenlően elosztjuk</strong>!
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-2">
              <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800">
                <div className="text-xs font-black text-indigo-700 dark:text-indigo-300 uppercase tracking-wider mb-2">
                  1. Eset: A szeletek száma osztható (4 szelet : 2 gyerek)
                </div>
                <p className="text-sm">
                  Mivel 4 darab ötöd szeletünk van, mindkét gyereknek jut <strong className="text-indigo-600 dark:text-indigo-300">4 : 2 = 2 darab ötöd szelet</strong>, azaz <MathText>2/5</MathText> tábla.
                </p>
                <div className="mt-2 text-center text-base font-black text-indigo-900 dark:text-indigo-200 font-mono bg-white dark:bg-slate-900 py-1.5 rounded-xl border border-indigo-100 dark:border-indigo-800">
                  <MathText>4/5 : 2 = (4 : 2)/5 = 2/5</MathText>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-purple-50/70 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800">
                <div className="text-xs font-black text-purple-700 dark:text-purple-300 uppercase tracking-wider mb-2">
                  2. Eset: A szeletek nem oszthatók (1 szelet : 2 gyerek)
                </div>
                <p className="text-sm">
                  Ha csak <MathText>1/4</MathText> pizzánk van és 2 embernek kell felezni, a negyed szeletet <strong className="text-purple-600 dark:text-purple-300">tovább kell felezni</strong>. Így a szeletek mérete felére csökken (nyolcadok lesznek): <MathText>1/8</MathText>.
                </p>
                <div className="mt-2 text-center text-base font-black text-purple-900 dark:text-purple-200 font-mono bg-white dark:bg-slate-900 py-1.5 rounded-xl border border-purple-100 dark:border-purple-800">
                  <MathText>1/4 : 2 = 1/(4 · 2) = 1/8</MathText>
                </div>
              </div>
            </div>

            <TheoryCallout variant="info" title="Aranyszabály">
              Tört osztásakor a végeredmény <strong>kisebb</strong> lesz, mint az eredeti tört (ha 1-nél nagyobb egész számmal osztunk). A tortaszeletek vagy darabszámra csökkennek, vagy még apróbbra vágjuk őket!
            </TheoryCallout>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 2. SZAKASZ: A KÉT ALAPVETŐ SZABÁLY */}
      <TheorySection
        number={2}
        title="A tört osztásának 2 alapszabálya"
        icon={<Divide className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />}
        badgeColor="indigo"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Szabály 1: Számláló osztása */}
          <TheoryCard
            title="1. Szabály: Számláló osztása"
            icon={<CheckCircle2 className="w-5 h-5 text-emerald-500" />}
          >
            <div className="space-y-3">
              <p className="text-sm">
                <strong>Csak akkor alkalmazható</strong>, ha a számláló maradék nélkül osztható az egész számmal:
              </p>
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border-2 border-emerald-200 dark:border-emerald-800 text-center">
                <div className="text-lg font-black text-emerald-900 dark:text-emerald-200 font-mono">
                  <MathText>a/b : n = (a : n)/b</MathText>
                </div>
                <div className="text-xs text-emerald-700 dark:text-emerald-300 mt-1">
                  (ha az <MathText>a</MathText> osztható <MathText>n</MathText>-nel)
                </div>
              </div>

              <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                <div className="flex items-center gap-1.5">
                  <span className="text-emerald-500 font-bold">•</span>
                  <span><MathText>6/7 : 3 = (6 : 3)/7 = 2/7</MathText></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-emerald-500 font-bold">•</span>
                  <span><MathText>8/11 : 4 = (8 : 4)/11 = 2/11</MathText></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-emerald-500 font-bold">•</span>
                  <span><MathText>15/17 : 5 = (15 : 5)/17 = 3/17</MathText></span>
                </div>
              </div>
            </div>
          </TheoryCard>

          {/* Szabály 2: Nevező szorzása */}
          <TheoryCard
            title="2. Szabály: Nevező szorzása"
            icon={<Sparkles className="w-5 h-5 text-purple-500" />}
          >
            <div className="space-y-3">
              <p className="text-sm">
                <strong>Mindig működik!</strong> Ha a számláló nem osztható a számmal, a nevezőt szorozzuk meg:
              </p>
              <div className="p-3 bg-purple-50 dark:bg-purple-950/40 rounded-xl border-2 border-purple-200 dark:border-purple-800 text-center">
                <div className="text-lg font-black text-purple-900 dark:text-purple-200 font-mono">
                  <MathText>a/b : n = a/(b · n)</MathText>
                </div>
                <div className="text-xs text-purple-700 dark:text-purple-300 mt-1">
                  (univerzális módszer)
                </div>
              </div>

              <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                <div className="flex items-center gap-1.5">
                  <span className="text-purple-500 font-bold">•</span>
                  <span><MathText>3/4 : 2 = 3/(4 · 2) = 3/8</MathText></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-purple-500 font-bold">•</span>
                  <span><MathText>2/5 : 3 = 2/(5 · 3) = 2/15</MathText></span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-purple-500 font-bold">•</span>
                  <span><MathText>5/7 : 2 = 5/(7 · 2) = 5/14</MathText></span>
                </div>
              </div>
            </div>
          </TheoryCard>
        </div>

        <TheoryCallout variant="tip" title="Melyik módszert válasszam?">
          Mindig nézd meg először a számlálót! Ha osztható a számmal, válaszd az <strong>1. szabályt (számláló osztása)</strong>, mert azonnal a legegyszerűbb alakot kapod. Ha nem osztható, használd a <strong>2. szabályt (nevező szorzása)</strong>!
        </TheoryCallout>
      </TheorySection>

      {/* 3. SZAKASZ: INTERAKTÍV OSZTÁS-LABORATÓRIUM */}
      <TheorySection
        number={3}
        title="Interaktív Osztás-Laboratórium"
        icon={<Calculator className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />}
        badgeColor="indigo"
      >
        <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-slate-900 dark:to-slate-850 border-2 border-indigo-200 dark:border-indigo-800">
          <div className="text-center mb-5">
            <h3 className="text-lg font-black text-slate-900 dark:text-white">
              Állítsd be a törtet és az osztót!
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Figyeld meg mindkét szabály működését és az eredmény egyszerűsítését!
            </p>
          </div>

          {/* Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="bg-white dark:bg-slate-800 p-3 rounded-xl border border-indigo-100 dark:border-slate-700 text-center">
              <label className="text-xs font-bold text-slate-500 uppercase block mb-1">Számláló ({num})</label>
              <input
                type="range"
                min={1}
                max={12}
                value={num}
                onChange={(e) => setNum(Number(e.target.value))}
                className="w-full accent-indigo-600"
              />
            </div>
            <div className="bg-white dark:bg-slate-800 p-3 rounded-xl border border-indigo-100 dark:border-slate-700 text-center">
              <label className="text-xs font-bold text-slate-500 uppercase block mb-1">Nevező ({den})</label>
              <input
                type="range"
                min={2}
                max={12}
                value={den}
                onChange={(e) => setDen(Number(e.target.value))}
                className="w-full accent-indigo-600"
              />
            </div>
            <div className="bg-white dark:bg-slate-800 p-3 rounded-xl border border-indigo-100 dark:border-slate-700 text-center">
              <label className="text-xs font-bold text-slate-500 uppercase block mb-1">Osztó ({divisor})</label>
              <input
                type="range"
                min={2}
                max={6}
                value={divisor}
                onChange={(e) => setDivisor(Number(e.target.value))}
                className="w-full accent-purple-600"
              />
            </div>
          </div>

          {/* Visualization Card */}
          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-indigo-200 dark:border-indigo-800 shadow-xs space-y-4 text-center">
            <div className="text-2xl sm:text-3xl font-mono font-black text-indigo-700 dark:text-indigo-300">
              <MathText>{num}/{den} : {divisor} = ?</MathText>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left pt-2">
              {/* Rule 1 panel */}
              <div className={cn(
                "p-4 rounded-xl border-2 transition-all",
                isNumDivisible
                  ? "bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-400 dark:border-emerald-700"
                  : "bg-slate-50/80 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700 opacity-60"
              )}>
                <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-1 flex items-center justify-between">
                  <span>1. Módszer: Számláló osztása</span>
                  {isNumDivisible ? (
                    <span className="text-[10px] bg-emerald-200 dark:bg-emerald-800 text-emerald-900 dark:text-emerald-100 px-2 py-0.5 rounded-full font-bold">Működik! ✨</span>
                  ) : (
                    <span className="text-[10px] bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400 px-2 py-0.5 rounded-full font-bold">Nem osztható</span>
                  )}
                </div>
                {isNumDivisible ? (
                  <div className="text-sm font-bold text-slate-800 dark:text-slate-100 space-y-1">
                    <div>Lépés: <MathText>({num} : {divisor})/{den} = {rule1Num}/{rule1Den}</MathText></div>
                    <div className="text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
                      A számláló ({num}) osztható {divisor}-val, így azonnal a legegyszerűbb alakot kapjuk!
                    </div>
                  </div>
                ) : (
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    A {num} nem osztható maradék nélkül {divisor}-val, ezért a 2. szabályt használjuk!
                  </div>
                )}
              </div>

              {/* Rule 2 panel */}
              <div className="p-4 rounded-xl border-2 bg-purple-50/80 dark:bg-purple-950/40 border-purple-400 dark:border-purple-700 text-left">
                <div className="text-xs font-bold uppercase tracking-wider text-purple-700 dark:text-purple-400 mb-1 flex items-center justify-between">
                  <span>2. Módszer: Nevező szorzása</span>
                  <span className="text-[10px] bg-purple-200 dark:bg-purple-800 text-purple-900 dark:text-purple-100 px-2 py-0.5 rounded-full font-bold">Mindig érvényes 🎯</span>
                </div>
                <div className="text-sm font-bold text-slate-800 dark:text-slate-100 space-y-1">
                  <div>Lépés: <MathText>{rule2Num}/({den} · {divisor}) = {rule2Num}/{rule2Den}</MathText></div>
                  {d2 > 1 ? (
                    <div className="text-purple-600 dark:text-purple-300 text-xs font-semibold">
                      Egyszerűsítve ({d2}-vel osztva): <MathText>{simplifiedNum}/{simplifiedDen}</MathText>
                    </div>
                  ) : (
                    <div className="text-purple-600 dark:text-purple-300 text-xs font-semibold">
                      Ez a végeredmény már tovább nem egyszerűsíthető!
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Visual Slices Bar */}
            <div className="pt-3 border-t border-indigo-100 dark:border-slate-800">
              <div className="text-xs font-bold text-slate-500 mb-2">Vizuális reprezentáció (1 egységhez képest):</div>
              <div className="w-full h-8 bg-slate-100 dark:bg-slate-800 rounded-xl overflow-hidden flex border border-slate-300 dark:border-slate-700">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-[11px] font-bold text-white transition-all duration-300"
                  style={{ width: `${Math.min(100, (simplifiedNum / simplifiedDen) * 100)}%` }}
                >
                  <MathText>{simplifiedNum}/{simplifiedDen}</MathText>
                </div>
              </div>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 4. SZAKASZ: VEGYES TÖRTEK OSZTÁSA */}
      <TheorySection
        number={4}
        title="Vegyes törtek osztása egész számmal"
        icon={<Layers className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />}
        badgeColor="indigo"
      >
        <TheoryCard
          title="3 lépéses algoritmus vegyes törtekhez"
          icon={<CheckCircle2 className="w-5 h-5 text-amber-500" />}
        >
          <div className="space-y-4">
            <p className="leading-relaxed">
              Ha vegyes törtet kell elosztanunk egész számmal, azt <strong>mindig alakítsuk át áltörtté</strong> az osztás elvégzése előtt!
            </p>

            <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 space-y-2">
              <div className="font-bold text-amber-900 dark:text-amber-200">
                Példa: Számítsd ki a <MathText>1 1/2 : 3</MathText> műveletet!
              </div>
              <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-amber-200 dark:bg-amber-800 text-amber-900 dark:text-amber-100 flex items-center justify-center font-bold shrink-0">1</span>
                  <span><strong>Átalakítás áltörtté:</strong> <MathText>1 1/2 = 3/2</MathText>.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-amber-200 dark:bg-amber-800 text-amber-900 dark:text-amber-100 flex items-center justify-center font-bold shrink-0">2</span>
                  <span><strong>Osztás elvégzése:</strong> Mivel a számláló (3) osztható 3-mal, a számlálót osztjuk: <MathText>3/2 : 3 = (3 : 3)/2 = 1/2</MathText>.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-amber-200 dark:bg-amber-800 text-amber-900 dark:text-amber-100 flex items-center justify-center font-bold shrink-0">3</span>
                  <span><strong>Végeredmény:</strong> <MathText>1/2</MathText>.</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 space-y-2">
              <div className="font-bold text-indigo-900 dark:text-indigo-200">
                2. Példa: Számítsd ki a <MathText>2 1/4 : 3</MathText> műveletet!
              </div>
              <div className="space-y-1 text-xs text-slate-700 dark:text-slate-300 font-mono">
                <div><MathText>2 1/4 = 9/4</MathText></div>
                <div><MathText>9/4 : 3 = (9 : 3)/4 = 3/4</MathText></div>
              </div>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 5. SZAKASZ: GYAKORI HIBÁK ÉS TÍPUSCSAPDÁK */}
      <TheorySection
        number={5}
        title="Gyakori hibák és csapdák"
        icon={<AlertTriangle className="w-5 h-5 text-rose-500" />}
        badgeColor="rose"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryTrapBox
            title="1. Csapda: Számláló és nevező egyidejű osztása"
            wrong="4/6 : 2 = (4:2)/(6:2) = 2/3"
            correct="4/6 : 2 = (4:2)/6 = 2/6 = 1/3"
            explanation="Ha a számlálót és a nevezőt is elosztod 2-vel, az egyszerűsítés, a tört értéke nem csökkenne! Osztáskor csak az egyiket módosítjuk!"
          />

          <TheoryTrapBox
            title="2. Csapda: Nevező osztása szorzás helyett"
            wrong="3/4 : 2 = 3/(4:2) = 3/2"
            correct="3/4 : 2 = 3/(4·2) = 3/8"
            explanation="Ha a nevezőt osztod, a tört értéke NŐNE! Ha a nevezőt módosítod, SZOROZNI kell a számmal, hogy a tört értéke csökkenjen!"
          />

          <TheoryTrapBox
            title="3. Csapda: Vegyes tört közvetlen osztása"
            wrong="2 1/2 : 2 = (2:2) és 1/2 = 1 1/2"
            correct="2 1/2 : 2 = 5/2 : 2 = 5/4 = 1 1/4"
            explanation="A vegyes törtet MINDIG áltörtté kell alakítani az osztás előtt, különben hibás eredményt kapunk!"
          />

          <TheoryTrapBox
            title="4. Csapda: Egyszerűsítés elhagyása a végén"
            wrong="4/5 : 2 = 4/(5·2) = 4/10 (így hagyva)"
            correct="4/5 : 2 = 2/5 (vagy 4/10 = 2/5)"
            explanation="A végeredményt mindig hozzuk a legegyszerűbb alakra (tovább nem egyszerűsíthető tört)!"
          />
        </div>
      </TheorySection>

      {/* 6. SZAKASZ: ÖSSZEFOGLALÓ TÁBLÁZAT */}
      <TheorySection
        number={6}
        title="Összefoglaló osztási táblázat"
        icon={<CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />}
        badgeColor="emerald"
      >
        <TheoryTable
          title="Tört osztása egész számmal - szabályok és példák"
          headers={['Eset', 'Alkalmazott szabály', 'Példa feladat', 'Végeredmény']}
          rows={[
            ['Számláló osztható', 'Számláló : egész, nevező marad', '6/7 : 2', '3/7'],
            ['Számláló nem osztható', 'Számláló marad, nevező · egész', '3/5 : 2', '3/10'],
            ['Egyszerűsíthető eredmény', 'Nevező szorzása, majd egyszerűsítés', '4/9 : 2 = 4/18', '2/9'],
            ['Vegyes tört osztása', 'Áltörtté alakítás, majd osztás', '1 1/3 : 2 = 4/3 : 2', '2/3'],
            ['Tört osztása önmaga számlálójával', 'Számláló osztása 1-re', '5/8 : 5', '1/8'],
          ]}
        />
      </TheorySection>
    </TheoryTemplate>
  );
};

export default FractionDivideTheory;
