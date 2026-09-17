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
  PieChart
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { MathText } from '@/components/math/shared/MathText';

export interface FractionsSameDenomTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
  onSwitchToQuiz?: () => void;
}

// Helper GCD
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

export const FractionsSameDenomTheory: React.FC<FractionsSameDenomTheoryProps> = ({
  onBack,
  onStartQuiz,
  onSwitchToQuiz
}) => {
  const handleStartQuiz = onStartQuiz || onSwitchToQuiz;

  // Interactive Math Lab State
  const [denom, setDenom] = useState<number>(6);
  const [num1, setNum1] = useState<number>(2);
  const [num2, setNum2] = useState<number>(3);
  const [operation, setOperation] = useState<'+' | '-'>('+');

  // Interactive Whole Number Subtraction Tool State
  const [wholeNum, setWholeNum] = useState<number>(2);
  const [subNum, setSubNum] = useState<number>(3);
  const [subDenom, setSubDenom] = useState<number>(5);

  // Calculate results for Math Lab
  const resultNum = operation === '+' ? num1 + num2 : Math.max(0, num1 - num2);
  const divisor = gcd(resultNum, denom);
  const simplifiedNum = resultNum / divisor;
  const simplifiedDenom = denom / divisor;
  const isSimplifiable = divisor > 1 && resultNum > 0;
  const isImproper = resultNum > denom;
  const wholePart = Math.floor(resultNum / denom);
  const remNum = resultNum % denom;

  // Calculate Whole subtraction
  const wholeConvertedNum = wholeNum * subDenom;
  const wholeResultNum = wholeConvertedNum - subNum;
  const wholeResultWhole = Math.floor(wholeResultNum / subDenom);
  const wholeResultRem = wholeResultNum % subDenom;

  return (
    <TheoryTemplate
      title="Egyenlő nevezőjű törtek összeadása és kivonása"
      subtitle="Tanuld meg az azonos nevezőjű törtek összeadásának és kivonásának szabályait, az egészből való kivonást, a vegyes törtek műveleteit és az eredmény egyszerűsítését!"
      documentId="fractions-same-denom-theory-content"
      pdfFilename="5_osztaly_egyenlo_nevezeju_tortek_osszeadasa_kivonasa_tananyag.pdf"
      onBack={onBack}
      onStartQuiz={handleStartQuiz}
      themeColor="amber"
      badgeText="➕ 5. Osztály • II. Törtek, tizedes törtek"
      quickRule={{
        label: "Azonos Nevezőjű Törtek Műveletei",
        formula: "a/c + b/c = (a + b)/c  |  a/c - b/c = (a - b)/c  (c ≠ 0)"
      }}
      practiceTitle="Készen állsz az egyenlő nevezőjű törtek gyakorlására?"
      practiceSubtitle="Tedd próbára tudásod a 3 szintű kvízben, a párosítóban vagy a csoportosítóban!"
    >
      {/* 1. SZAKASZ: AZONOS NEVEZŐJŰ TÖRTEK ÖSSZEADÁSA */}
      <TheorySection
        number={1}
        title="Azonos nevezőjű törtek összeadása"
        icon={<Plus className="w-5 h-5 text-amber-600 dark:text-amber-400" />}
        badgeColor="amber"
      >
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Ha a törtek <strong>nevezője megegyezik</strong>, az azt jelenti, hogy az egészeket ugyanolyan méretű szeletekre osztottuk. Ezért az összeadás rendkívül egyszerű és szemléletes:
        </p>

        {/* Big Rule Box */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white space-y-2 shadow-md">
          <div className="flex items-center gap-2 font-black text-sm uppercase tracking-wider">
            <Sparkles className="w-5 h-5 text-yellow-200" />
            <span>Összeadási Szabály</span>
          </div>
          <div className="text-xs sm:text-sm leading-relaxed">
            Azonos nevezőjű törteket úgy adunk össze, hogy a <strong>számlálókat összeadjuk</strong>, a <strong>nevezőt pedig változatlanul hagyjuk</strong>.
          </div>
          <div className="p-3 bg-white/10 rounded-xl text-center font-mono font-black text-base sm:text-xl tracking-wider border border-white/20">
            <MathText size="xl">a/c + b/c = (a + b)/c</MathText>
          </div>
        </div>

        {/* Examples Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
          <TheoryCard title="1. Példa (Valódi tört)" badge="Alapeset" variant="amber">
            <div className="text-center py-2 space-y-1">
              <div className="text-base sm:text-lg font-mono font-black text-amber-700 dark:text-amber-300">
                <MathText>1/5 + 2/5 = 3/5</MathText>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                1 ötöd szelet + 2 ötöd szelet = 3 ötöd szelet pizza.
              </p>
            </div>
          </TheoryCard>

          <TheoryCard title="2. Példa (Egész szám)" badge="1 Egész" variant="amber">
            <div className="text-center py-2 space-y-1">
              <div className="text-base sm:text-lg font-mono font-black text-amber-700 dark:text-amber-300">
                <MathText>3/7 + 4/7 = 7/7 = 1</MathText>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                7 heted szelet pontosan 1 teljes egész pizzát ad ki.
              </p>
            </div>
          </TheoryCard>

          <TheoryCard title="3. Példa (Áltört és Egyszerűsítés)" badge="Több lépés" variant="amber">
            <div className="text-center py-2 space-y-1">
              <div className="text-base sm:text-lg font-mono font-black text-amber-700 dark:text-amber-300">
                <MathText>3/4 + 3/4 = 6/4 = 1 2/4 = 1 1/2</MathText>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Egész rész kiemelése + tört egyszerűsítése 2-vel.
              </p>
            </div>
          </TheoryCard>
        </div>

        <TheoryCallout variant="amber" title="Miért nem adjuk össze a nevezőket?">
          <p className="text-xs sm:text-sm leading-relaxed">
            A nevező csak a <strong>szelet méretét (fajtáját)</strong> jelöli meg, nem a mennyiségét! Ha van 2 darab harmad szeleted és hozzáadsz 1 darab harmad szeletet, akkor 3 darab harmad szeleted (<MathText>3/3 = 1</MathText>) lesz, és nem 3 hatodod!
          </p>
        </TheoryCallout>
      </TheorySection>

      {/* 2. SZAKASZ: AZONOS NEVEZŐJŰ TÖRTEK KIVONÁSA */}
      <TheorySection
        number={2}
        title="Azonos nevezőjű törtek kivonása"
        icon={<Minus className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
        badgeColor="blue"
      >
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          A kivonás az összeadáshoz hasonlóan történik: mivel a részek mérete azonos, csupán a darabszámokból kell levonni a kivonandó részeket.
        </p>

        {/* Big Rule Box */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white space-y-2 shadow-md">
          <div className="flex items-center gap-2 font-black text-sm uppercase tracking-wider">
            <Sparkles className="w-5 h-5 text-blue-200" />
            <span>Kivonási Szabály</span>
          </div>
          <div className="text-xs sm:text-sm leading-relaxed">
            Azonos nevezőjű törtek kivonásakor a <strong>kisebbítendő számlálójából kivonjuk a kivonandó számlálóját</strong>, a <strong>nevezőt pedig változatlanul leírjuk</strong>.
          </div>
          <div className="p-3 bg-white/10 rounded-xl text-center font-mono font-black text-base sm:text-xl tracking-wider border border-white/20">
            <MathText size="xl">a/c - b/c = (a - b)/c &nbsp;&nbsp;(ahol a ≥ b)</MathText>
          </div>
        </div>

        {/* Examples Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
          <TheoryCard title="1. Példa (Egyszerűsítéssel)" badge="3-mal egyszerűsítve" variant="blue">
            <div className="text-center py-2 space-y-1">
              <div className="text-base sm:text-lg font-mono font-black text-blue-700 dark:text-blue-300">
                <MathText>7/9 - 4/9 = 3/9 = 1/3</MathText>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                7 kilencedből 4 kilenced az 3 kilenced, ami egyszerűsítve 1 harmad.
              </p>
            </div>
          </TheoryCard>

          <TheoryCard title="2. Példa (Nulla eredmény)" badge="Önmagából kivonva" variant="blue">
            <div className="text-center py-2 space-y-1">
              <div className="text-base sm:text-lg font-mono font-black text-blue-700 dark:text-blue-300">
                <MathText>5/8 - 5/8 = 0/8 = 0</MathText>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Ha minden részt megeszünk vagy elveszünk, a maradék 0.
              </p>
            </div>
          </TheoryCard>

          <TheoryCard title="3. Példa (Tizedek kivonása)" badge="2-vel egyszerűsítve" variant="blue">
            <div className="text-center py-2 space-y-1">
              <div className="text-base sm:text-lg font-mono font-black text-blue-700 dark:text-blue-300">
                <MathText>9/10 - 3/10 = 6/10 = 3/5</MathText>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                9 tizedből 3 tized az 6 tized, ami 2-vel egyszerűsítve 3 ötöd.
              </p>
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 3. SZAKASZ: MŰVELETEK EGÉSZ SZÁMOKKAL */}
      <TheorySection
        number={3}
        title="Műveletek egész számokkal (Kivonás 1 egészből és nagyobb egészből)"
        icon={<Layers className="w-5 h-5 text-amber-600 dark:text-amber-400" />}
        badgeColor="amber"
      >
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Amikor egy egész számból vonunk ki egy törtet, az egész számot <strong>átváltjuk a kivonandó tört nevezőjének megfelelő szeletekre</strong>:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          {/* Kivonás 1 egészből */}
          <div className="p-4 rounded-2xl border-2 border-amber-200 dark:border-amber-900/60 bg-amber-50/40 dark:bg-amber-950/20 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="font-black text-sm text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-600" />
                1. Kivonás 1 egészből
              </span>
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                1 = c/c
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Az 1 egészet olyan törtként írjuk fel, amelynek számlálója és nevezője is megegyezik a levonandó tört nevezőjével:
            </p>
            <div className="space-y-2">
              <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl font-mono text-center text-xs sm:text-sm font-bold text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-900">
                <MathText>1 - 3/5 = 5/5 - 3/5 = 2/5</MathText>
              </div>
              <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl font-mono text-center text-xs sm:text-sm font-bold text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-900">
                <MathText>1 - 5/8 = 8/8 - 5/8 = 3/8</MathText>
              </div>
            </div>
          </div>

          {/* Kivonás 1-nél nagyobb egészből */}
          <div className="p-4 rounded-2xl border-2 border-indigo-200 dark:border-indigo-900/60 bg-indigo-50/40 dark:bg-indigo-950/20 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="font-black text-sm text-indigo-800 dark:text-indigo-300 flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4 text-indigo-600" />
                2. Kivonás 1-nél nagyobb egészből
              </span>
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300">
                1 felváltása
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Az egészből 1 egészet felváltunk a tört nevezőjének megfelelő szeletekre, a maradék egészek megmaradnak:
            </p>
            <div className="space-y-2">
              <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl font-mono text-center text-xs sm:text-sm font-bold text-indigo-800 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-900">
                <MathText>3 - 2/7 = 2 7/7 - 2/7 = 2 5/7</MathText>
              </div>
              <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl font-mono text-center text-xs sm:text-sm font-bold text-indigo-800 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-900">
                <MathText>5 - 3/4 = 4 4/4 - 3/4 = 4 1/4</MathText>
              </div>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 4. SZAKASZ: VEGYES TÖRTEK ÖSSZEADÁSA ÉS KIVONÁSA */}
      <TheorySection
        number={4}
        title="Vegyes törtek összeadása és kivonása"
        icon={<Calculator className="w-5 h-5 text-amber-600 dark:text-amber-400" />}
        badgeColor="amber"
      >
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Vegyes törtek műveleteinél az aranyszabály: <strong>egészhez az egészet, törtrészhez a törtrészt</strong> rendeljük!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          <TheoryCard title="➕ Vegyes törtek összeadása" badge="Egész + Tört" variant="emerald">
            <div className="space-y-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <div className="p-3 bg-white dark:bg-slate-900 rounded-xl font-mono font-bold text-center border border-slate-200 dark:border-slate-800">
                <MathText>2 1/5 + 1 3/5 = (2 + 1) + (1/5 + 3/5) = 3 4/5</MathText>
              </div>
              <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl text-xs text-emerald-900 dark:text-emerald-200">
                <strong>Átlépés esetén:</strong> Ha a törtrész összege áltört lesz, az egészeket növeljük:
                <div className="font-mono font-bold text-center mt-1 text-sm">
                  <MathText>2 4/5 + 1 3/5 = 3 7/5 = 4 2/5</MathText>
                </div>
              </div>
            </div>
          </TheoryCard>

          <TheoryCard title="➖ Vegyes törtek kivonása" badge="Egész - Tört" variant="blue">
            <div className="space-y-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <div className="p-3 bg-white dark:bg-slate-900 rounded-xl font-mono font-bold text-center border border-slate-200 dark:border-slate-800">
                <MathText>4 5/7 - 2 2/7 = (4 - 2) + (5/7 - 2/7) = 2 3/7</MathText>
              </div>
              <div className="p-2.5 bg-blue-50 dark:bg-blue-950/40 rounded-xl text-xs text-blue-900 dark:text-blue-200">
                <strong>Kölcsönkérés esetén:</strong> Ha a kisebbítendő törtrésze kisebb:
                <div className="font-mono font-bold text-center mt-1 text-sm">
                  <MathText>4 1/5 - 1 3/5 = 3 6/5 - 1 3/5 = 2 3/5</MathText>
                </div>
              </div>
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 5. SZAKASZ: INTERAKTÍV TÖRT-MŰVELET VIZUÁLIS LABOR */}
      <TheorySection
        number={5}
        title="Interaktív Tört-Művelet Vizuális Labor"
        icon={<PieChart className="w-5 h-5 text-amber-600 dark:text-amber-400" />}
        badgeColor="amber"
      >
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Állítsd be a nevezőt és a két számlálót! Figyeld meg az összeadás és kivonás lépéseit, a szeleteléses vizualizációt és az automatikus egyszerűsítést:
        </p>

        <div className="bg-slate-50/80 dark:bg-slate-850 p-5 sm:p-7 rounded-3xl border-2 border-amber-200 dark:border-slate-700 space-y-6">
          {/* Operation Switcher Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-amber-200/60 dark:border-slate-700">
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
                  operation === '+' ? "bg-amber-600 hover:bg-amber-700 text-white shadow-xs" : "text-slate-700 dark:text-slate-300"
                )}
              >
                <Plus className="w-3.5 h-3.5" /> Összeadás (+)
              </Button>
              <Button
                size="sm"
                variant={operation === '-' ? 'default' : 'ghost'}
                onClick={() => {
                  setOperation('-');
                  if (num1 < num2) setNum1(num2);
                }}
                className={cn(
                  "h-8 px-3 rounded-lg text-xs font-bold gap-1",
                  operation === '-' ? "bg-amber-600 hover:bg-amber-700 text-white shadow-xs" : "text-slate-700 dark:text-slate-300"
                )}
              >
                <Minus className="w-3.5 h-3.5" /> Kivonás (-)
              </Button>
            </div>
          </div>

          {/* Controls Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
            {/* Denominator Selector */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-black text-slate-700 dark:text-slate-300">
                <span>Közös Nevező (c):</span>
                <span className="font-mono text-amber-600 font-bold">{denom}</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {[3, 4, 5, 6, 8, 10, 12].map((d) => (
                  <button
                    key={d}
                    onClick={() => {
                      setDenom(d);
                      if (num1 > d && operation === '-') setNum1(d);
                    }}
                    className={cn(
                      "px-2.5 py-1 rounded-lg text-xs font-bold transition-all",
                      denom === d
                        ? "bg-amber-600 text-white shadow-xs"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200"
                    )}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* Num 1 */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-black text-slate-700 dark:text-slate-300">
                <span>1. Számláló (a):</span>
                <span className="font-mono text-emerald-600 font-bold">{num1}</span>
              </div>
              <input
                type="range"
                min={operation === '-' ? num2 : 0}
                max={denom * 2}
                value={num1}
                onChange={(e) => setNum1(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
              <div className="text-[10px] text-slate-400 flex justify-between">
                <span>0</span>
                <span>Tört: <MathText size="sm">{`${num1}/${denom}`}</MathText></span>
                <span>{denom * 2}</span>
              </div>
            </div>

            {/* Num 2 */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-black text-slate-700 dark:text-slate-300">
                <span>2. Számláló (b):</span>
                <span className="font-mono text-blue-600 font-bold">{num2}</span>
              </div>
              <input
                type="range"
                min={0}
                max={operation === '-' ? num1 : denom * 2}
                value={num2}
                onChange={(e) => setNum2(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="text-[10px] text-slate-400 flex justify-between">
                <span>0</span>
                <span>Tört: <MathText size="sm">{`${num2}/${denom}`}</MathText></span>
                <span>{operation === '-' ? num1 : denom * 2}</span>
              </div>
            </div>
          </div>

          {/* Result Calculation Display */}
          <div className="bg-white dark:bg-slate-900 p-4 sm:p-6 rounded-2xl border-2 border-amber-200 dark:border-slate-800 shadow-xs text-center space-y-4">
            <div className="text-xl sm:text-2xl md:text-3xl font-mono font-black text-slate-900 dark:text-white flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
              <span className="text-emerald-600 dark:text-emerald-400">
                <MathText size="xl">{`${num1}/${denom}`}</MathText>
              </span>
              <span className="text-amber-600 font-black">{operation}</span>
              <span className="text-blue-600 dark:text-blue-400">
                <MathText size="xl">{`${num2}/${denom}`}</MathText>
              </span>
              <span className="text-slate-400">=</span>
              <span className="text-purple-600 dark:text-purple-400">
                <MathText size="xl">{`(${num1} ${operation} ${num2})/${denom}`}</MathText>
              </span>
              <span className="text-slate-400">=</span>
              <span className="text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-3 py-1 rounded-xl border border-amber-200 dark:border-amber-800">
                <MathText size="xl">{`${resultNum}/${denom}`}</MathText>
              </span>

              {isSimplifiable && (
                <>
                  <span className="text-slate-400">=</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-xl border border-emerald-200 dark:border-emerald-800 text-lg sm:text-xl">
                    <MathText size="lg">{`${simplifiedNum}/${simplifiedDenom}`}</MathText> <span className="text-xs text-emerald-600">(Egyszerűsítve)</span>
                  </span>
                </>
              )}

              {isImproper && (
                <>
                  <span className="text-slate-400">=</span>
                  <span className="text-indigo-600 dark:text-indigo-400 font-bold bg-indigo-50 dark:bg-indigo-950/60 px-2.5 py-1 rounded-xl border border-indigo-200 dark:border-indigo-800 text-lg sm:text-xl">
                    <MathText size="lg">{`${wholePart} ${remNum}/${denom}`}</MathText> <span className="text-xs text-indigo-600">(Vegyes tört)</span>
                  </span>
                </>
              )}
            </div>

            {/* Segment Bar Visualization */}
            <div className="max-w-xl mx-auto space-y-2 text-left">
              <div className="text-xs font-bold text-slate-500 dark:text-slate-400 flex justify-between">
                <span>Vizuális szeletelés ({denom} egyenlő részre osztva):</span>
                <span>{resultNum} / {denom} szelet</span>
              </div>

              <div className="w-full h-8 bg-slate-100 dark:bg-slate-800 rounded-xl overflow-hidden border border-slate-300 dark:border-slate-700 flex">
                {Array.from({ length: Math.max(denom, resultNum) }).map((_, idx) => {
                  const isNum1 = idx < num1;
                  const isResult = idx < resultNum;

                  return (
                    <div
                      key={idx}
                      className={cn(
                        "h-full flex-1 border-r border-slate-300/60 dark:border-slate-700/80 transition-all flex items-center justify-center text-[10px] font-mono font-bold",
                        isResult
                          ? isNum1
                            ? "bg-emerald-500 text-white"
                            : "bg-blue-500 text-white"
                          : "bg-transparent text-slate-400"
                      )}
                      title={`Szelet #${idx + 1}`}
                    >
                      {isResult ? idx + 1 : ''}
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 px-1 pt-1">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" /> 1. Tört (<MathText size="sm">{`${num1}/${denom}`}</MathText>)
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-3 h-3 rounded-full bg-blue-500 inline-block" /> 2. Tört (<MathText size="sm">{`${num2}/${denom}`}</MathText>)
                  </span>
                </div>
                <span className="font-bold text-amber-600">Összesen aktív: {resultNum} szelet</span>
              </div>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 6. SZAKASZ: INTERAKTÍV EGÉSZBŐL KIVONÓ KALKULÁTOR */}
      <TheorySection
        number={6}
        title="Interaktív Egészből Kivonó Műhely"
        icon={<Layers className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />}
        badgeColor="indigo"
      >
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Gyakorold az egész számból történő kivonást! Állítsd be az egész számot és a levonandó törtet:
        </p>

        <div className="bg-indigo-50/50 dark:bg-indigo-950/20 p-5 rounded-3xl border-2 border-indigo-200 dark:border-indigo-900/60 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-500 uppercase">Egész szám</label>
              <input
                type="number"
                min={1}
                max={10}
                value={wholeNum}
                onChange={(e) => setWholeNum(Math.max(1, Number(e.target.value) || 1))}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-mono font-bold text-indigo-600"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-500 uppercase">Kivonandó Számláló</label>
              <input
                type="number"
                min={1}
                max={subDenom - 1}
                value={subNum}
                onChange={(e) => setSubNum(Math.min(subDenom - 1, Math.max(1, Number(e.target.value) || 1)))}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-mono font-bold text-rose-600"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-500 uppercase">Kivonandó Nevező</label>
              <input
                type="number"
                min={2}
                max={12}
                value={subDenom}
                onChange={(e) => setSubDenom(Math.max(2, Number(e.target.value) || 2))}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-mono font-bold text-blue-600"
              />
            </div>
          </div>

          <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-indigo-200 dark:border-indigo-900/60 space-y-2 text-center">
            <div className="text-lg sm:text-xl font-mono font-black text-slate-900 dark:text-white">
              <MathText size="lg">{`${wholeNum} - ${subNum}/${subDenom} = ${wholeNum - 1} ${subDenom}/${subDenom} - ${subNum}/${subDenom} = ${wholeNum - 1 > 0 ? `${wholeNum - 1} ` : ''}${subDenom - subNum}/${subDenom}`}</MathText>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Az 1 egészet felváltottuk <MathText size="sm">{`${subDenom}/${subDenom}`}</MathText>-re, így maradt {wholeNum - 1} egész és <MathText size="sm">{`${subDenom - subNum}/${subDenom}`}</MathText>.
            </p>
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
            title="1. Csapda: A nevezők összeadása"
            wrong="1/4 + 2/4 = 3/8 (a nevezőket is összeadtuk)."
            correct="1/4 + 2/4 = 3/4 (a nevező változatlan marad!)."
            explanation="A nevező a szeletek méretét adja meg, az összeadásnál csak a szeletek darabszáma (számláló) nő."
          />

          <TheoryTrapBox
            title="2. Csapda: Egyszerűsítés elfelejtése"
            wrong="3/8 + 1/8 = 4/8 és itt megállunk."
            correct="3/8 + 1/8 = 4/8 = 1/2 (mindig hozzuk a legkisebb számokkal felírt legegyszerűbb alakra!)."
            explanation="A 4/8 matematikailag helyes érték, de az 1/2 a teljes pontértékű legegyszerűbb alak."
          />

          <TheoryTrapBox
            title="3. Csapda: Egészből kivonás felváltás nélkül"
            wrong="3 - 2/5 = 1 3/5 vagy 3/5."
            correct="3 - 2/5 = 2 5/5 - 2/5 = 2 3/5."
            explanation="A 3 egészből csak 1-et váltunk fel 5/5-re, így 2 egész megmarad!"
          />

          <TheoryTrapBox
            title="4. Csapda: Vegyes tört összeadásnál áltört marad"
            wrong="2 4/5 + 1 3/5 = 3 7/5 és így hagyjuk."
            correct="2 4/5 + 1 3/5 = 3 7/5 = 4 2/5 (a 7/5-ből 1 egészet átviszünk az egész részhez!)."
            explanation="Vegyes tört törtrésze sosem lehet áltört (1-nél nagyobb tört)."
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
          title="Műveletek azonos nevezőjű törtekkel"
          headers={['Művelet típusa', 'Szabály', 'Példa', 'Végeredmény']}
          rows={[
            ['Törtek összeadása', 'Számlálókat összeadjuk, nevező marad', '2/7 + 3/7', '5/7'],
            ['Törtek kivonása', 'Számlálókat kivonjuk, nevező marad', '7/9 - 4/9 = 3/9', '1/3 (egyszerűsítve)'],
            ['Kivonás 1 egészből', '1 átváltása azonos nevezőjű áltörtté (c/c)', '1 - 3/8 = 8/8 - 3/8', '5/8'],
            ['Kivonás egészből', '1 egész felváltása c/c-re', '4 - 1/6 = 3 6/6 - 1/6', '3 5/6'],
            ['Vegyes törtek összeadása', 'Egészhez egész, törthöz tört', '2 1/4 + 1 2/4', '3 3/4'],
            ['Vegyes törtek átlépéssel', 'Áltört átváltása további egészre', '2 3/4 + 1 3/4 = 3 6/4', '4 2/4 = 4 1/2'],
          ]}
        />
      </TheorySection>
    </TheoryTemplate>
  );
};

export default FractionsSameDenomTheory;
