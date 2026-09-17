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
  Plus,
  Minus,
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
  Scale
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { MathText } from '@/components/math/shared/MathText';

export interface FractionsDiffDenomTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
  onSwitchToQuiz?: () => void;
}

// Math helpers: GCD and LCM
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

function lcm(a: number, b: number): number {
  if (a === 0 || b === 0) return 0;
  return Math.abs(a * b) / gcd(a, b);
}

export const FractionsDiffDenomTheory: React.FC<FractionsDiffDenomTheoryProps> = ({
  onBack,
  onStartQuiz,
  onSwitchToQuiz
}) => {
  const handleStartQuiz = onStartQuiz || onSwitchToQuiz;

  // Interactive Math Lab State
  const [num1, setNum1] = useState<number>(1);
  const [den1, setDen1] = useState<number>(3);
  const [num2, setNum2] = useState<number>(1);
  const [den2, setDen2] = useState<number>(4);
  const [operation, setOperation] = useState<'+' | '-'>('+');

  // Interactive LCM & Common Denominator Finder State
  const [calcDen1, setCalcDen1] = useState<number>(4);
  const [calcDen2, setCalcDen2] = useState<number>(6);

  // Math Lab calculations
  const commonDen = lcm(den1, den2) || (den1 * den2);
  const mult1 = commonDen / den1;
  const mult2 = commonDen / den2;
  const expNum1 = num1 * mult1;
  const expNum2 = num2 * mult2;

  const resultNum = operation === '+' ? expNum1 + expNum2 : Math.max(0, expNum1 - expNum2);
  const resDivisor = gcd(resultNum, commonDen);
  const simpNum = resultNum / resDivisor;
  const simpDen = commonDen / resDivisor;
  const isSimplifiable = resDivisor > 1 && resultNum > 0;
  const isImproper = resultNum > commonDen;
  const wholePart = Math.floor(resultNum / commonDen);
  const remNum = resultNum % commonDen;

  // LCM finder tool calculations
  const toolLcm = lcm(calcDen1, calcDen2);
  const toolGcd = gcd(calcDen1, calcDen2);
  const toolMult1 = calcDen1 > 0 ? toolLcm / calcDen1 : 1;
  const toolMult2 = calcDen2 > 0 ? toolLcm / calcDen2 : 1;

  return (
    <TheoryTemplate
      title="Különböző nevezőjű törtek összeadása és kivonása"
      subtitle="A legkisebb közös többszörös (LKKT) és a közös nevező meghatározása, törtek bővítése azonos nevezőre, műveletvégzés és egyszerűsítés"
      documentId="fractions-diff-denom-theory-content"
      pdfFilename="5_osztaly_kulonbozo_nevezeju_tortek_osszeadasa_kivonasa_tananyag.pdf"
      onBack={onBack}
      onStartQuiz={handleStartQuiz}
      themeColor="teal"
      badgeText="➕ 5. Osztály • II. Törtek, tizedes törtek"
      quickRule={{
        label: "Közös Nevezőre Hozás és Művelet",
        formula: "a/b ± c/d = (a · k1)/(LKKT) ± (c · k2)/(LKKT) = (a·k1 ± c·k2)/(LKKT)"
      }}
      practiceTitle="Készen állsz a különböző nevezőjű törtek gyakorlására?"
      practiceSubtitle="Tedd próbára tudásod a 3 szintű kvízben, a párosítóban vagy a csoportosítóban!"
    >
      {/* 1. SZAKASZ: MIÉRT KELL KÖZÖS NEVEZŐ? */}
      <TheorySection
        number={1}
        title="Miért nem adhatunk össze különböző nevezőjű törteket közvetlenül?"
        icon={<PieChart className="w-5 h-5 text-teal-600 dark:text-teal-400" />}
        badgeColor="teal"
      >
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Ha két törtnek <strong>különböző a nevezője</strong>, az azt jelenti, hogy az egészeket <strong>más-más méretű szeletekre</strong> osztottuk fel. Például egy harmad pizza szelet sokkal nagyobb, mint egy negyed pizza szelet!
        </p>

        {/* Visual Callout */}
        <TheoryCallout variant="teal" title="A különböző szeletméretek szemléltetése">
          <div className="space-y-2 text-xs sm:text-sm">
            <p>
              Nem mondhatjuk azt, hogy 1 harmad szelet + 1 negyed szelet = 2 heted szelet! Ez olyan lenne, mintha 1 métert és 1 centimétert úgy adnánk össze, hogy az 2 valami.
            </p>
            <div className="p-3 bg-white dark:bg-slate-900 rounded-xl font-bold text-center text-teal-900 dark:text-teal-200 border border-teal-200 dark:border-teal-800">
              💡 <strong>Megoldás:</strong> Mindkét pizzát fel kell osztani még kisebb, de <strong>egymással teljesen egyenlő méretű</strong> szeletekre (közös nevezőre kell bővíteni őket)!
            </div>
          </div>
        </TheoryCallout>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
          <TheoryCard title="1. Harmad szelet" badge="3 egyenlő rész" variant="amber">
            <div className="text-center py-2 space-y-1">
              <div className="text-lg font-black text-amber-600 dark:text-amber-400">
                <MathText size="lg">1/3 = 4/12</MathText>
              </div>
              <p className="text-[11px] text-slate-500">
                A harmad szelet pontosan 4 darab tizenketted szeletnek felel meg.
              </p>
            </div>
          </TheoryCard>

          <TheoryCard title="2. Negyed szelet" badge="4 egyenlő rész" variant="blue">
            <div className="text-center py-2 space-y-1">
              <div className="text-lg font-black text-blue-600 dark:text-blue-400">
                <MathText size="lg">1/4 = 3/12</MathText>
              </div>
              <p className="text-[11px] text-slate-500">
                A negyed szelet pontosan 3 darab tizenketted szeletnek felel meg.
              </p>
            </div>
          </TheoryCard>

          <TheoryCard title="3. Összeadás tizenkettedekben" badge="Közös nevező: 12" variant="emerald">
            <div className="text-center py-2 space-y-1">
              <div className="text-lg font-black text-emerald-600 dark:text-emerald-400">
                <MathText size="lg">4/12 + 3/12 = 7/12</MathText>
              </div>
              <p className="text-[11px] text-slate-500">
                Most már azonos méretű szeleteket adunk össze: 4 + 3 = 7 szelet.
              </p>
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 2. SZAKASZ: A KÖZÖS NEVEZŐ MEGHATÁROZÁSA (LKKT) */}
      <TheorySection
        number={2}
        title="A legkisebb közös nevező (LKKT) megkeresése"
        icon={<Scale className="w-5 h-5 text-teal-600 dark:text-teal-400" />}
        badgeColor="teal"
      >
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          A közös nevezőnek olyan számnak kell lennie, amely <strong>mindkét eredeti nevezővel osztható</strong> (a nevezők közös többszöröse). A számolás akkor a legegyszerűbb, ha a <strong>legkisebb közös többszöröst (LKKT)</strong> választjuk:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
          <TheoryCard title="1. Eset: Az egyik nevező többszöröse a másiknak" badge="Leggyorsabb" variant="emerald">
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
              Ha a nagyobbik nevező osztható a kisebbikkel, akkor a <strong>nagyobbik szám maga a közös nevező</strong>!
            </p>
            <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl font-mono text-center text-xs font-bold text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
              Nevezők: 3 és 6 → Közös: <strong>6</strong>
              <br />
              Nevezők: 4 és 12 → Közös: <strong>12</strong>
            </div>
          </TheoryCard>

          <TheoryCard title="2. Eset: A nevezők relatív prímek" badge="Szorzás" variant="blue">
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
              Ha a két nevezőnek nincs 1-nél nagyobb közös osztója, a közös nevező a <strong>két szám szorzata</strong>:
            </p>
            <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl font-mono text-center text-xs font-bold text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
              Nevezők: 3 és 4 → 3 · 4 = <strong>12</strong>
              <br />
              Nevezők: 2 és 5 → 2 · 5 = <strong>10</strong>
            </div>
          </TheoryCard>

          <TheoryCard title="3. Eset: Van közös osztójuk" badge="LKKT keresés" variant="amber">
            <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
              Vegyük a nagyobb szám többszöröseit, és keressük meg az elsőt, ami a kisebbikkel is osztható:
            </p>
            <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl font-mono text-center text-xs font-bold text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
              Nevezők: 6 és 8 → 8, <strong>24</strong> osztható 6-tal!
              <br />
              Nevezők: 4 és 6 → 6, <strong>12</strong> osztható 4-gyel!
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 3. SZAKASZ: LÉPÉSRŐL LÉPÉSRE MŰVELETI ALGORITMUS */}
      <TheorySection
        number={3}
        title="Különböző nevezőjű törtek műveletei lépésről lépésre"
        icon={<Calculator className="w-5 h-5 text-teal-600 dark:text-teal-400" />}
        badgeColor="teal"
      >
        {/* Step by step procedure card */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-teal-600 via-emerald-600 to-teal-700 text-white space-y-3 shadow-md">
          <div className="flex items-center gap-2 font-black text-sm uppercase tracking-wider">
            <Sparkles className="w-5 h-5 text-teal-200" />
            <span>Az 5 Lépéses Aranyszabály</span>
          </div>
          <div className="space-y-1.5 text-xs sm:text-sm">
            <div className="flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-white/20 font-bold flex items-center justify-center shrink-0 text-xs">1</span>
              <span><strong>Közös nevező meghatározása:</strong> Megkeressük a nevezők legkisebb közös többszörösét (LKKT).</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-white/20 font-bold flex items-center justify-center shrink-0 text-xs">2</span>
              <span><strong>Bővítési szorzók kiszámítása:</strong> Elosztjuk a közös nevezőt az eredeti nevezőkkel (megtudjuk, hányszorosára bővítünk).</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-white/20 font-bold flex items-center justify-center shrink-0 text-xs">3</span>
              <span><strong>Törtek bővítése:</strong> A számlálókat megszorozzuk a megfelelő bővítési szorzókkal.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-white/20 font-bold flex items-center justify-center shrink-0 text-xs">4</span>
              <span><strong>Művelet elvégzése:</strong> A számlálókat összeadjuk vagy kivonjuk, a közös nevező változatlan marad.</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-white/20 font-bold flex items-center justify-center shrink-0 text-xs">5</span>
              <span><strong>Egyszerűsítés:</strong> Ha lehet, egyszerűsítünk, áltört esetén vegyes tört alakba írjuk.</span>
            </div>
          </div>
        </div>

        {/* Detailed Worked Examples */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          <TheoryCard title="1. Példa: Összeadás (3/4 + 1/6)" badge="Közös nevező: 12" variant="teal">
            <div className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1.5 font-mono">
                <div>1. LKKT(4, 6) = <strong>12</strong></div>
                <div>2. Szorzók: 12 : 4 = <span className="text-emerald-600 font-bold">3</span>, 12 : 6 = <span className="text-blue-600 font-bold">2</span></div>
                <div>3. Bővítés: <MathText>3/4 = 9/12</MathText>, <MathText>1/6 = 2/12</MathText></div>
                <div className="pt-1 text-base font-bold text-teal-700 dark:text-teal-300 border-t border-slate-100 dark:border-slate-800">
                  <MathText>3/4 + 1/6 = 9/12 + 2/12 = 11/12</MathText>
                </div>
              </div>
            </div>
          </TheoryCard>

          <TheoryCard title="2. Példa: Kivonás és egyszerűsítés (5/6 - 3/10)" badge="Közös nevező: 30" variant="teal">
            <div className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1.5 font-mono">
                <div>1. LKKT(6, 10) = <strong>30</strong></div>
                <div>2. Szorzók: 30 : 6 = <span className="text-emerald-600 font-bold">5</span>, 30 : 10 = <span className="text-blue-600 font-bold">3</span></div>
                <div>3. Bővítés: <MathText>5/6 = 25/30</MathText>, <MathText>3/10 = 9/30</MathText></div>
                <div className="pt-1 text-base font-bold text-teal-700 dark:text-teal-300 border-t border-slate-100 dark:border-slate-800">
                  <MathText>5/6 - 3/10 = 25/30 - 9/30 = 16/30 = 8/15</MathText>
                </div>
              </div>
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 4. SZAKASZ: VEGYES TÖRTEK KÜLÖNBÖZŐ NEVEZŐKKEL */}
      <TheorySection
        number={4}
        title="Vegyes törtek műveletei különböző nevezőkkel"
        icon={<Layers className="w-5 h-5 text-teal-600 dark:text-teal-400" />}
        badgeColor="teal"
      >
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Vegyes törteknél az egész részeket és a törtrészeket célszerű külön kezelni, a törtrészeket pedig közös nevezőre bővíteni:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          <TheoryCard title="➕ Vegyes törtek összeadása" badge="Közös nevezőre hozás" variant="emerald">
            <div className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <div className="p-3 bg-white dark:bg-slate-900 rounded-xl font-mono text-center border border-slate-200 dark:border-slate-800 space-y-1 font-bold">
                <div><MathText>1 1/2 + 2 1/3 = 1 3/6 + 2 2/6 = 3 5/6</MathText></div>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Az egészek: 1 + 2 = 3. A törtrészek: <MathText>3/6 + 2/6 = 5/6</MathText>.
              </p>
            </div>
          </TheoryCard>

          <TheoryCard title="➖ Vegyes törtek kivonása kölcsönkéréssel" badge="1 felváltása" variant="blue">
            <div className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <div className="p-3 bg-white dark:bg-slate-900 rounded-xl font-mono text-center border border-slate-200 dark:border-slate-800 space-y-1 font-bold">
                <div><MathText>3 1/4 - 1 2/3 = 3 3/12 - 1 8/12</MathText></div>
                <div className="text-teal-600 dark:text-teal-400"><MathText>= 2 15/12 - 1 8/12 = 1 7/12</MathText></div>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Mivel a 3/12-ből nem vonható ki a 8/12, a 3 egészből 1-et felváltottunk 12/12-re (3 + 12 = 15/12).
              </p>
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 5. SZAKASZ: INTERAKTÍV KÖZÖS NEVEZŐ ÉS MŰVELETI LABOR */}
      <TheorySection
        number={5}
        title="Interaktív Közös Nevező és Műveleti Labor"
        icon={<Sparkles className="w-5 h-5 text-teal-600 dark:text-teal-400" />}
        badgeColor="teal"
      >
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Kísérletezz két tetszőleges tört számlálóival és nevezőivel! Figyeld meg az automatikus LKKT keresést, a bővítési szorzókat és a lépésről lépésre történő levezetést:
        </p>

        <div className="bg-slate-50/80 dark:bg-slate-850 p-5 sm:p-7 rounded-3xl border-2 border-teal-200 dark:border-slate-700 space-y-6">
          {/* Operation Selector Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-teal-200/60 dark:border-slate-700">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Művelet kiválasztása
            </span>
            <div className="flex items-center gap-1 bg-white dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
              <Button
                size="sm"
                variant={operation === '+' ? 'default' : 'ghost'}
                onClick={() => setOperation('+')}
                className={cn(
                  "h-8 px-3 rounded-lg text-xs font-bold gap-1",
                  operation === '+' ? "bg-teal-600 hover:bg-teal-700 text-white shadow-xs" : "text-slate-700 dark:text-slate-300"
                )}
              >
                <Plus className="w-3.5 h-3.5" /> Összeadás (+)
              </Button>
              <Button
                size="sm"
                variant={operation === '-' ? 'default' : 'ghost'}
                onClick={() => {
                  setOperation('-');
                  if (num1 / den1 < num2 / den2) {
                    setNum1(num2);
                    setDen1(den2);
                    setNum2(num1);
                    setDen2(den1);
                  }
                }}
                className={cn(
                  "h-8 px-3 rounded-lg text-xs font-bold gap-1",
                  operation === '-' ? "bg-teal-600 hover:bg-teal-700 text-white shadow-xs" : "text-slate-700 dark:text-slate-300"
                )}
              >
                <Minus className="w-3.5 h-3.5" /> Kivonás (-)
              </Button>
            </div>
          </div>

          {/* Controls Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Fraction 1 Controls */}
            <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="flex justify-between text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase">
                <span>1. Tört</span>
                <span className="font-mono text-base"><MathText>{`${num1}/${den1}`}</MathText></span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400">Számláló (a)</label>
                  <input
                    type="number"
                    min={1}
                    max={12}
                    value={num1}
                    onChange={(e) => setNum1(Math.max(1, Number(e.target.value) || 1))}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 font-mono font-bold text-sm bg-slate-50 dark:bg-slate-800 text-emerald-600"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400">Nevező (b)</label>
                  <select
                    value={den1}
                    onChange={(e) => setDen1(Number(e.target.value))}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 font-mono font-bold text-sm bg-slate-50 dark:bg-slate-800"
                  >
                    {[2, 3, 4, 5, 6, 8, 10, 12].map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Fraction 2 Controls */}
            <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="flex justify-between text-xs font-bold text-blue-600 dark:text-blue-400 uppercase">
                <span>2. Tört</span>
                <span className="font-mono text-base"><MathText>{`${num2}/${den2}`}</MathText></span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400">Számláló (c)</label>
                  <input
                    type="number"
                    min={1}
                    max={12}
                    value={num2}
                    onChange={(e) => setNum2(Math.max(1, Number(e.target.value) || 1))}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 font-mono font-bold text-sm bg-slate-50 dark:bg-slate-800 text-blue-600"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-slate-400">Nevező (d)</label>
                  <select
                    value={den2}
                    onChange={(e) => setDen2(Number(e.target.value))}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 font-mono font-bold text-sm bg-slate-50 dark:bg-slate-800"
                  >
                    {[2, 3, 4, 5, 6, 8, 10, 12].map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Breakdown Steps & Visual Representation */}
          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border-2 border-teal-200 dark:border-slate-800 shadow-xs space-y-4">
            {/* Step Analysis Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-center text-xs font-mono">
              <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                <div className="text-slate-400 text-[10px] uppercase font-sans">Közös Nevező</div>
                <div className="font-bold text-teal-600 dark:text-teal-400 text-sm">LKKT({den1}, {den2}) = {commonDen}</div>
              </div>

              <div className="p-2.5 bg-emerald-50/60 dark:bg-emerald-950/30 rounded-xl border border-emerald-200 dark:border-emerald-800">
                <div className="text-emerald-700 dark:text-emerald-400 text-[10px] uppercase font-sans">1. Bővítés (·{mult1})</div>
                <div className="font-bold"><MathText>{`${num1}/${den1} = ${expNum1}/${commonDen}`}</MathText></div>
              </div>

              <div className="p-2.5 bg-blue-50/60 dark:bg-blue-950/30 rounded-xl border border-blue-200 dark:border-blue-800">
                <div className="text-blue-700 dark:text-blue-400 text-[10px] uppercase font-sans">2. Bővítés (·{mult2})</div>
                <div className="font-bold"><MathText>{`${num2}/${den2} = ${expNum2}/${commonDen}`}</MathText></div>
              </div>
            </div>

            {/* Formula Equation Line */}
            <div className="text-xl sm:text-2xl md:text-3xl font-mono font-black text-slate-900 dark:text-white flex items-center justify-center gap-2 sm:gap-3 flex-wrap pt-2">
              <span className="text-emerald-600 dark:text-emerald-400">
                <MathText size="xl">{`${num1}/${den1}`}</MathText>
              </span>
              <span className="text-teal-600 font-black">{operation}</span>
              <span className="text-blue-600 dark:text-blue-400">
                <MathText size="xl">{`${num2}/${den2}`}</MathText>
              </span>
              <span className="text-slate-400">=</span>
              <span className="text-emerald-600 dark:text-emerald-400">
                <MathText size="xl">{`${expNum1}/${commonDen}`}</MathText>
              </span>
              <span className="text-teal-600 font-black">{operation}</span>
              <span className="text-blue-600 dark:text-blue-400">
                <MathText size="xl">{`${expNum2}/${commonDen}`}</MathText>
              </span>
              <span className="text-slate-400">=</span>
              <span className="text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/60 px-3 py-1 rounded-xl border border-teal-200 dark:border-teal-800">
                <MathText size="xl">{`${resultNum}/${commonDen}`}</MathText>
              </span>

              {isSimplifiable && (
                <>
                  <span className="text-slate-400">=</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-xl border border-emerald-200 dark:border-emerald-800 text-lg sm:text-xl">
                    <MathText size="lg">{`${simpNum}/${simpDen}`}</MathText> <span className="text-xs text-emerald-600">(Egyszerűsítve)</span>
                  </span>
                </>
              )}

              {isImproper && (
                <>
                  <span className="text-slate-400">=</span>
                  <span className="text-indigo-600 dark:text-indigo-400 font-bold bg-indigo-50 dark:bg-indigo-950/60 px-2.5 py-1 rounded-xl border border-indigo-200 dark:border-indigo-800 text-lg sm:text-xl">
                    <MathText size="lg">{`${wholePart} ${remNum}/${commonDen}`}</MathText> <span className="text-xs text-indigo-600">(Vegyes tört)</span>
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 6. SZAKASZ: INTERAKTÍV LKKT KALKULÁTOR */}
      <TheorySection
        number={6}
        title="Interaktív LKKT és Bővítési Szorzó Kereső"
        icon={<Divide className="w-5 h-5 text-teal-600 dark:text-teal-400" />}
        badgeColor="teal"
      >
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Írj be két tetszőleges nevezőt, és nézd meg, mi a legkisebb közös nevezőjük és mekkora szorzóval kell őket bővíteni:
        </p>

        <div className="bg-teal-50/50 dark:bg-teal-950/20 p-5 rounded-3xl border-2 border-teal-200 dark:border-teal-900/60 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-500 uppercase">1. Nevező</label>
              <input
                type="number"
                min={2}
                max={50}
                value={calcDen1}
                onChange={(e) => setCalcDen1(Math.max(1, Number(e.target.value) || 1))}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-mono font-bold text-emerald-600"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-500 uppercase">2. Nevező</label>
              <input
                type="number"
                min={2}
                max={50}
                value={calcDen2}
                onChange={(e) => setCalcDen2(Math.max(1, Number(e.target.value) || 1))}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-mono font-bold text-blue-600"
              />
            </div>
          </div>

          <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-teal-200 dark:border-teal-900/60 space-y-2 text-center">
            <div className="text-lg sm:text-xl font-mono font-black text-teal-900 dark:text-teal-200">
              Legkisebb Közös Nevező: LKKT({calcDen1}, {calcDen2}) = <strong className="text-teal-600 dark:text-teal-400">{toolLcm}</strong>
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-300 font-mono flex items-center justify-center gap-4 flex-wrap pt-1">
              <span>1. Tört szorzója: {toolLcm} : {calcDen1} = <strong className="text-emerald-600">·{toolMult1}</strong></span>
              <span>2. Tört szorzója: {toolLcm} : {calcDen2} = <strong className="text-blue-600">·{toolMult2}</strong></span>
              {toolGcd > 1 ? (
                <span className="text-slate-400">(LNKO = {toolGcd})</span>
              ) : (
                <span className="text-indigo-600">(Relatív prímek)</span>
              )}
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 7. SZAKASZ: TIPIKUS HIBÁK ÉS CSAPDAHELYZETEK */}
      <TheorySection
        number={7}
        title="Tipikus csapdák és gyakori tévhitek"
        icon={<AlertTriangle className="w-5 h-5 text-rose-600 dark:text-rose-400" />}
        badgeColor="rose"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryTrapBox
            title="1. Csapda: Külön-külön számlálók és nevezők összeadása"
            wrong="1/2 + 1/3 = (1+1)/(2+3) = 2/5 (vagy 3/4 - 1/2 = 2/2 = 1)."
            correct="1/2 + 1/3 = 3/6 + 2/6 = 5/6 (először KÖZÖS NEVEZŐRE kell bővíteni!)."
            explanation="A különböző nevezőjű törteket TILOS közvetlenül összeadni vagy kivonni!"
          />

          <TheoryTrapBox
            title="2. Csapda: Csak az egyik tört bővítése a számlálóval"
            wrong="1/3 + 1/4 bővítése = (1·4)/12 + 1/12 = 5/12."
            correct="1/3 + 1/4 = (1·4)/12 + (1·3)/12 = 4/12 + 3/12 = 7/12."
            explanation="Mindkét törtet a saját bővítési szorzójával kell bővíteni!"
          />

          <TheoryTrapBox
            title="3. Csapda: Feleslegesen óriási közös nevező"
            wrong="1/4 + 1/6 esetén 4 · 6 = 24 használata és bonyolult számolás."
            correct="LKKT(4, 6) = 12 (sokkal egyszerűbb és kevesebb hibalehetőséggel jár!)."
            explanation="Bár a 24 is közös nevező, a legkisebb közös nevezővel (12) sokkal könnyebb fejszámolni."
          />

          <TheoryTrapBox
            title="4. Csapda: Egyszerűsítés elfelejtése a végén"
            wrong="5/6 - 1/6 = 4/6 és így hagyjuk a végeredményt."
            correct="4/6 = 2/3 (mindig hozzuk a legkisebb egész számokkal felírt legegyszerűbb alakra!)."
            explanation="A végeredményt mindig ellenőrizzük, hogy egyszerűsíthető-e még!"
          />
        </div>
      </TheorySection>

      {/* 8. SZAKASZ: ÖSSZEFOGLALÓ TÁBLÁZAT */}
      <TheorySection
        number={8}
        title="Összefoglaló műveleti táblázat"
        icon={<CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />}
        badgeColor="emerald"
      >
        <TheoryTable
          title="Műveletek különböző nevezőjű törtekkel"
          headers={['Nevezők viszonya', 'Hogyan keressük a közös nevezőt?', 'Példa feladat', 'Bővítés és eredmény']}
          rows={[
            ['Egyik a másik többszöröse', 'A nagyobbik nevező a közös nevező', '1/3 + 1/6', '2/6 + 1/6 = 3/6 = 1/2'],
            ['Relatív prímek (nincs közös osztó)', 'A két nevező szorzata a közös', '2/5 + 1/3', '6/15 + 5/15 = 11/15'],
            ['Van közös osztójuk', 'A nagyobb szám többszörösei (LKKT)', '3/4 - 1/6', '9/12 - 2/12 = 7/12'],
            ['Vegyes törtek összeadása', 'Egészek összeadása, törtrész közös nevezőre', '1 1/2 + 2 1/4', '1 2/4 + 2 1/4 = 3 3/4'],
            ['Vegyes tört kivonása kölcsönkéréssel', '1 egész felváltása a közös nevezőre', '2 1/3 - 1 1/2 = 2 2/6 - 1 3/6', '1 8/6 - 1 3/6 = 5/6'],
          ]}
        />
      </TheorySection>
    </TheoryTemplate>
  );
};

export default FractionsDiffDenomTheory;
