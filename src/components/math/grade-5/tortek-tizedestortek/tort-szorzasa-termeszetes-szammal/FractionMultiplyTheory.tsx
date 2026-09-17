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

export interface FractionMultiplyTheoryProps {
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

export const FractionMultiplyTheory: React.FC<FractionMultiplyTheoryProps> = ({
  onBack,
  onStartQuiz,
  onSwitchToQuiz
}) => {
  const handleStartQuiz = onStartQuiz || onSwitchToQuiz;

  // Interactive Math Lab State
  const [num, setNum] = useState<number>(2);
  const [den, setDen] = useState<number>(5);
  const [multiplier, setMultiplier] = useState<number>(3);

  // Method 1: Multiply numerator
  const rawNum = num * multiplier;
  const rawDen = den;
  const div1 = gcd(rawNum, rawDen);
  const simpNum = rawNum / div1;
  const simpDen = rawDen / div1;

  // Method 2: Divide denominator if divisible
  const canDivideDen = den % multiplier === 0;
  const divDenResult = canDivideDen ? den / multiplier : null;

  // Mixed number conversion
  const isImproper = simpNum >= simpDen && simpDen > 1;
  const wholePart = Math.floor(simpNum / simpDen);
  const remNum = simpNum % simpDen;
  const isWholeNumber = simpDen === 1;

  return (
    <TheoryTemplate
      title="Tört szorzása természetes számmal"
      subtitle="A szorzás mint ismételt összeadás, a számláló szorzása, a nevező osztása, egyszerűsítés a szorzás előtt és vegyes törtek szorzása"
      documentId="fraction-multiply-theory-content"
      pdfFilename="5_osztaly_tort_szorzasa_termeszetes_szammal_tananyag.pdf"
      onBack={onBack}
      onStartQuiz={handleStartQuiz}
      themeColor="purple"
      badgeText="✖️ 5. Osztály • II. Törtek, tizedes törtek"
      quickRule={{
        label: "Tört Szorzása Természetes Számmal",
        formula: "a/b · n = (a · n)/b  |  vagy  a/b · n = a/(b : n) (ha b osztható n-nel)"
      }}
      practiceTitle="Készen állsz a tört szorzásának gyakorlására?"
      practiceSubtitle="Tedd próbára tudásod a 3 szintű kvízben, a párosítóban vagy a csoportosítóban!"
    >
      {/* 1. SZAKASZ: A SZORZÁS MINT ISMÉTELT ÖSSZEADÁS */}
      <TheorySection
        number={1}
        title="Mit jelent egy törtet megszorozni egy egész számmal?"
        icon={<PieChart className="w-5 h-5 text-purple-600 dark:text-purple-400" />}
        badgeColor="purple"
      >
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Ahogyan az egész számoknál, úgy a törteknél is a <strong>szorzás az azonos tagú összeadás rövidítése</strong>. Ha egy törtet megszorzunk egy természetes számmal, azt a törtet annyiszor adjuk össze önmagával:
        </p>

        {/* Visual Callout */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 text-white space-y-2 shadow-md">
          <div className="flex items-center gap-2 font-black text-sm uppercase tracking-wider">
            <Sparkles className="w-5 h-5 text-yellow-200" />
            <span>Szemléletes Jelentés: Pizza Szeletek</span>
          </div>
          <p className="text-xs sm:text-sm leading-relaxed">
            Ha 3 barát mindegyike kap <MathText>2/7</MathText> pizza szeletet, összesen hány szelet fogyott?
          </p>
          <div className="p-3 bg-white/10 rounded-xl text-center font-mono font-black text-base sm:text-xl tracking-wider border border-white/20">
            <MathText size="xl">2/7 · 3 = 2/7 + 2/7 + 2/7 = (2 · 3)/7 = 6/7</MathText>
          </div>
          <p className="text-xs opacity-90 text-center">
            A szeletek száma a 3-szorosára nőtt (2 · 3 = 6), de a szeletek mérete (hetedek) nem változott!
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
          <TheoryCard title="1. Példa (Valódi tört)" badge="Egyszerű szorzás" variant="purple">
            <div className="text-center py-2 space-y-1">
              <div className="text-lg font-black text-purple-700 dark:text-purple-300">
                <MathText size="lg">1/5 · 3 = (1 · 3)/5 = 3/5</MathText>
              </div>
              <p className="text-[11px] text-slate-500">
                3 darab egyötöd szelet az összesen 3 ötöd.
              </p>
            </div>
          </TheoryCard>

          <TheoryCard title="2. Példa (Egész szám)" badge="Teljes egész" variant="purple">
            <div className="text-center py-2 space-y-1">
              <div className="text-lg font-black text-purple-700 dark:text-purple-300">
                <MathText size="lg">1/4 · 4 = (1 · 4)/4 = 4/4 = 1</MathText>
              </div>
              <p className="text-[11px] text-slate-500">
                4 darab negyed szelet pontosan 1 egész pizzát ad ki.
              </p>
            </div>
          </TheoryCard>

          <TheoryCard title="3. Példa (Áltört és Vegyes)" badge="Átlépés" variant="purple">
            <div className="text-center py-2 space-y-1">
              <div className="text-lg font-black text-purple-700 dark:text-purple-300">
                <MathText size="lg">3/4 · 3 = (3 · 3)/4 = 9/4 = 2 1/4</MathText>
              </div>
              <p className="text-[11px] text-slate-500">
                9 negyed az 2 egész és még 1 negyed szelet.
              </p>
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 2. SZAKASZ: A KÉT MŰVELETI SZABÁLY */}
      <TheorySection
        number={2}
        title="A tört szorzásának két alapszabálya"
        icon={<Calculator className="w-5 h-5 text-purple-600 dark:text-purple-400" />}
        badgeColor="purple"
      >
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Törtet természetes számmal kétféleképpen szorozhatunk meg úgy, hogy a tört értéke megnőjön:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          {/* 1. Szabály: Számláló szorzása */}
          <div className="p-5 rounded-2xl border-2 border-purple-200 dark:border-purple-900/60 bg-purple-50/40 dark:bg-purple-950/20 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-black text-sm text-purple-900 dark:text-purple-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-purple-600" />
                1. SZABÁLY: A számlálót szorozzuk
              </span>
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300">
                Mindig működik
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              A számlálót <strong>megszorozzuk a természetes számmal</strong>, a <strong>nevezőt változatlanul hagyjuk</strong>.
            </p>
            <div className="p-3 bg-white dark:bg-slate-900 rounded-xl font-mono text-center text-sm sm:text-base font-bold text-purple-800 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
              <MathText>a/b · n = (a · n)/b</MathText>
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-400 font-mono text-center">
              <MathText>2/9 · 4 = (2 · 4)/9 = 8/9</MathText>
            </div>
          </div>

          {/* 2. Szabály: Nevező osztása */}
          <div className="p-5 rounded-2xl border-2 border-indigo-200 dark:border-indigo-900/60 bg-indigo-50/40 dark:bg-indigo-950/20 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-black text-sm text-indigo-900 dark:text-indigo-300 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                2. SZABÁLY: A nevezőt osztjuk
              </span>
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300">
                Kisebb számok
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Ha a nevező <strong>osztható a számmal</strong>, a nevezőt <strong>elosztjuk a számmal</strong>, a számlálót változatlanul hagyjuk!
            </p>
            <div className="p-3 bg-white dark:bg-slate-900 rounded-xl font-mono text-center text-sm sm:text-base font-bold text-indigo-800 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
              <MathText>a/b · n = a/(b : n) &nbsp;&nbsp;(ha b osztható n-nel)</MathText>
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-400 font-mono text-center">
              <MathText>3/8 · 2 = 3/(8 : 2) = 3/4</MathText>
            </div>
          </div>
        </div>

        <TheoryCallout variant="indigo" title="Miért kényelmes a 2. szabály (nevező osztása)?">
          <p className="text-xs sm:text-sm leading-relaxed">
            Mert így a végeredmény <strong>azonnal a legegyszerűbb alakban</strong> jelenik meg, nem kell a végén nagy számokat egyszerűsíteni!
            <br />
            Például: <MathText>5/12 · 4 = 5/(12 : 4) = 5/3 = 1 2/3</MathText> (szemben azzal: <MathText>(5 · 4)/12 = 20/12 = 5/3</MathText>).
          </p>
        </TheoryCallout>
      </TheorySection>

      {/* 3. SZAKASZ: EGYSZERŰSÍTÉS A SZORZÁS ELŐTT */}
      <TheorySection
        number={3}
        title="Egyszerűsítés a szorzás elvégzése előtt (Keresztbe egyszerűsítés)"
        icon={<Maximize2 className="w-5 h-5 text-purple-600 dark:text-purple-400" />}
        badgeColor="purple"
      >
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Nagyobb számok esetén érdemes még a szorzás elvégzése előtt megvizsgálni, hogy az egész szorzó és a nevező egyszerűsíthető-e egy közös osztóval:
        </p>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Mintapélda: <MathText size="md">7/18 · 6</MathText> kiszámítása
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm font-mono">
            <div className="p-3.5 bg-rose-50 dark:bg-rose-950/30 rounded-xl border border-rose-200 dark:border-rose-900">
              <div className="text-rose-700 dark:text-rose-300 font-bold mb-1">Hagyományos módszer (későbbi egyszerűsítés):</div>
              <div><MathText>7/18 · 6 = (7 · 6)/18 = 42/18</MathText></div>
              <div className="text-slate-500 mt-1">42 és 18 egyszerűsítése 6-tal: <MathText>42/18 = 7/3 = 2 1/3</MathText></div>
            </div>

            <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl border border-emerald-200 dark:border-emerald-900">
              <div className="text-emerald-700 dark:text-emerald-300 font-bold mb-1">Okos módszer (egyszerűsítés előre):</div>
              <div>A 6 és a 18 egyszerűsíthető 6-tal (6:6 = 1, 18:6 = 3):</div>
              <div className="text-emerald-800 dark:text-emerald-200 font-bold mt-1"><MathText>7/18 · 6 = 7/3 · 1 = 7/3 = 2 1/3</MathText></div>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 4. SZAKASZ: VEGYES TÖRTEK SZORZÁSA */}
      <TheorySection
        number={4}
        title="Vegyes törtek szorzása természetes számmal"
        icon={<Layers className="w-5 h-5 text-purple-600 dark:text-purple-400" />}
        badgeColor="purple"
      >
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Vegyes törtek szorzásakor kétféle biztonságos módszer közül választhatunk:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          <TheoryCard title="1. Módszer: Tagok külön szorzása" badge="Bontási elv" variant="purple">
            <div className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Külön megszorozzuk az egész részt és a törtrészt, majd összeadjuk őket:
              </p>
              <div className="p-3 bg-white dark:bg-slate-900 rounded-xl font-mono font-bold text-center border border-slate-200 dark:border-slate-800">
                <MathText>2 1/4 · 3 = (2 · 3) + (1/4 · 3) = 6 + 3/4 = 6 3/4</MathText>
              </div>
            </div>
          </TheoryCard>

          <TheoryCard title="2. Módszer: Átírás áltörtté" badge="Univerzális" variant="purple">
            <div className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <p className="text-xs text-slate-600 dark:text-slate-400">
                A vegyes törtet átírjuk áltörtté, megszorozzuk, majd visszaváltjuk:
              </p>
              <div className="p-3 bg-white dark:bg-slate-900 rounded-xl font-mono font-bold text-center border border-slate-200 dark:border-slate-800">
                <MathText>1 2/5 · 4 = 7/5 · 4 = 28/5 = 5 3/5</MathText>
              </div>
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 5. SZAKASZ: INTERAKTÍV TÖRT-SZORZÓ LABOR */}
      <TheorySection
        number={5}
        title="Interaktív Tört-Szorzó Vizuális Labor"
        icon={<Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400" />}
        badgeColor="purple"
      >
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Állítsd be a tört számlálóját, nevezőjét és az egész szorzót! Figyeld meg valós időben a szorzás mindkét szabályát és a legegyszerűbb alakot:
        </p>

        <div className="bg-slate-50/80 dark:bg-slate-850 p-5 sm:p-7 rounded-3xl border-2 border-purple-200 dark:border-slate-700 space-y-6">
          {/* Controls Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
            {/* Numerator */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-500 uppercase">Számláló (a)</label>
              <input
                type="number"
                min={1}
                max={12}
                value={num}
                onChange={(e) => setNum(Math.max(1, Number(e.target.value) || 1))}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 font-mono font-bold text-sm bg-slate-50 dark:bg-slate-800 text-purple-600"
              />
            </div>

            {/* Denominator */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-500 uppercase">Nevező (b)</label>
              <select
                value={den}
                onChange={(e) => setDen(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 font-mono font-bold text-sm bg-slate-50 dark:bg-slate-800"
              >
                {[2, 3, 4, 5, 6, 8, 9, 10, 12].map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            {/* Multiplier */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-500 uppercase">Egész szorzó (n)</label>
              <input
                type="number"
                min={1}
                max={10}
                value={multiplier}
                onChange={(e) => setMultiplier(Math.max(1, Number(e.target.value) || 1))}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 font-mono font-bold text-sm bg-slate-50 dark:bg-slate-800 text-amber-600"
              />
            </div>
          </div>

          {/* Equation Line */}
          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border-2 border-purple-200 dark:border-slate-800 shadow-xs text-center space-y-4">
            <div className="text-xl sm:text-2xl md:text-3xl font-mono font-black text-slate-900 dark:text-white flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
              <span className="text-purple-600 dark:text-purple-400">
                <MathText size="xl">{`${num}/${den}`}</MathText>
              </span>
              <span className="text-amber-600 font-black">·</span>
              <span className="text-amber-600 font-bold">{multiplier}</span>
              <span className="text-slate-400">=</span>
              <span className="text-purple-600 dark:text-purple-400">
                <MathText size="xl">{`(${num} · ${multiplier})/${den}`}</MathText>
              </span>
              <span className="text-slate-400">=</span>
              <span className="text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/60 px-3 py-1 rounded-xl border border-purple-200 dark:border-purple-800">
                <MathText size="xl">{`${rawNum}/${rawDen}`}</MathText>
              </span>

              {div1 > 1 && !isWholeNumber && (
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
                    <MathText size="lg">{`${wholePart} ${remNum}/${simpDen}`}</MathText> <span className="text-xs text-indigo-600">(Vegyes tört)</span>
                  </span>
                </>
              )}

              {isWholeNumber && (
                <>
                  <span className="text-slate-400">=</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 rounded-xl border border-emerald-200 dark:border-emerald-800 text-xl sm:text-2xl">
                    {simpNum} <span className="text-xs text-emerald-600">(Egész szám)</span>
                  </span>
                </>
              )}
            </div>

            {canDivideDen && (
              <div className="p-2.5 bg-indigo-50 dark:bg-indigo-950/40 rounded-xl text-xs font-mono text-indigo-900 dark:text-indigo-200 border border-indigo-200 dark:border-indigo-800">
                💡 <strong>Nevező osztásával is számolható:</strong> <MathText>{`${num}/${den} · ${multiplier} = ${num}/(${den} : ${multiplier}) = ${num}/${divDenResult}`}</MathText>
              </div>
            )}
          </div>
        </div>
      </TheorySection>

      {/* 6. SZAKASZ: TIPIKUS HIBÁK ÉS CSAPDAHELYZETEK */}
      <TheorySection
        number={6}
        title="Tipikus csapdák és gyakori tévhitek"
        icon={<AlertTriangle className="w-5 h-5 text-rose-600 dark:text-rose-400" />}
        badgeColor="rose"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryTrapBox
            title="1. Csapda: A nevező megszorzása is"
            wrong="2/3 · 2 = 4/6 (mindkettőt megszoroztuk)."
            correct="2/3 · 2 = (2·2)/3 = 4/3 = 1 1/3."
            explanation="Ha a számlálót és nevezőt is megszorozzuk, az BŐVÍTÉS, a tört értéke nem nő! Szorzáskor csak a számlálót szorozzuk!"
          />

          <TheoryTrapBox
            title="2. Csapda: Vegyes törtnél csak az egész szorzása"
            wrong="2 1/3 · 3 = 6 1/3 (a törtrész lemaradt)."
            correct="2 1/3 · 3 = (2·3) + (1/3·3) = 6 + 3/3 = 6 + 1 = 7."
            explanation="A vegyes tört egységének minden részét meg kell szorozni!"
          />

          <TheoryTrapBox
            title="3. Csapda: A szorzó hozzáadása a számlálóhoz"
            wrong="2/7 · 3 = (2+3)/7 = 5/7."
            correct="2/7 · 3 = (2·3)/7 = 6/7."
            explanation="A művelet szorzás, nem összeadás!"
          />

          <TheoryTrapBox
            title="4. Csapda: Egyszerűsítés elfelejtése"
            wrong="3/8 · 2 = 6/8 és így hagyjuk."
            correct="3/8 · 2 = 6/8 = 3/4 (vagy 3/(8:2) = 3/4)."
            explanation="A végeredményt mindig hozzuk a legegyszerűbb alakra!"
          />
        </div>
      </TheorySection>

      {/* 7. SZAKASZ: ÖSSZEFOGLALÓ TÁBLÁZAT */}
      <TheorySection
        number={7}
        title="Összefoglaló szorzási táblázat"
        icon={<CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />}
        badgeColor="emerald"
      >
        <TheoryTable
          title="Tört szorzási szabályok és példák"
          headers={['Szituáció', 'Alkalmazott szabály', 'Példa feladat', 'Végeredmény']}
          rows={[
            ['Számláló szorzása (általános)', 'Számláló · egész, nevező marad', '2/9 · 4', '8/9'],
            ['Nevező osztása (ha osztható)', 'Számláló marad, nevező : egész', '3/10 · 2', '3/5'],
            ['Keresztbe egyszerűsítés', 'Egész és nevező osztása közös osztóval', '5/12 · 4 = 5/3 · 1', '1 2/3'],
            ['Egész számot adó szorzás', 'Számláló többszöröse lesz a nevezőnek', '3/4 · 8', '24/4 = 6'],
            ['Vegyes tört szorzása', 'Egész és törtrész külön szorzása', '1 1/4 · 3', '3 3/4'],
          ]}
        />
      </TheorySection>
    </TheoryTemplate>
  );
};

export default FractionMultiplyTheory;
