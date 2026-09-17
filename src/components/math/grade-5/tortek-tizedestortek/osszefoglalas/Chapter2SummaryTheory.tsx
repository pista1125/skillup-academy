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
  ArrowRightLeft,
  ArrowRight,
  HelpCircle,
  RefreshCw,
  BookOpen,
  Calculator,
  Sliders,
  PieChart,
  Layers,
  Repeat,
  Trophy,
  Scale,
  Hash,
  Plus,
  Minus
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { MathText } from '@/components/math/shared/MathText';

export interface Chapter2SummaryTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
  onSwitchToQuiz?: () => void;
}

export const Chapter2SummaryTheory: React.FC<Chapter2SummaryTheoryProps> = ({
  onBack,
  onStartQuiz,
  onSwitchToQuiz
}) => {
  const handleStartQuiz = onStartQuiz || onSwitchToQuiz;

  // Interactive Hub Active Tab
  const [activeTab, setActiveTab] = useState<'fractions' | 'decimals' | 'conversion'>('fractions');

  // Fraction Simulator States
  const [f1Num, setF1Num] = useState<number>(1);
  const [f1Den, setF1Den] = useState<number>(3);
  const [fOp, setFOp] = useState<'+' | '-'>('+');
  const [f2Num, setF2Num] = useState<number>(1);
  const [f2Den, setF2Den] = useState<number>(6);

  // Decimal Simulator States
  const [decA, setDecA] = useState<number>(4.75);
  const [decOp, setDecOp] = useState<'+' | '-' | '*'>('+');
  const [decB, setDecB] = useState<number>(2.5);

  // Conversion Simulator States
  const [convNum, setConvNum] = useState<number>(3);
  const [convDen, setConvDen] = useState<number>(4);

  // Helper gcd and lcm for fraction math
  const gcd = (a: number, b: number): number => {
    return b === 0 ? a : gcd(b, a % b);
  };
  const lcm = (a: number, b: number): number => {
    return (a * b) / gcd(a, b);
  };

  const commonDen = lcm(f1Den, f2Den);
  const m1 = commonDen / f1Den;
  const m2 = commonDen / f2Den;
  const expF1Num = f1Num * m1;
  const expF2Num = f2Num * m2;
  const resNumRaw = fOp === '+' ? expF1Num + expF2Num : expF1Num - expF2Num;
  const g = gcd(Math.abs(resNumRaw), commonDen) || 1;
  const simplifiedNum = resNumRaw / g;
  const simplifiedDen = commonDen / g;

  // Decimal calculation
  let decResult = 0;
  if (decOp === '+') decResult = Math.round((decA + decB) * 1000) / 1000;
  if (decOp === '-') decResult = Math.round((decA - decB) * 1000) / 1000;
  if (decOp === '*') decResult = Math.round((decA * decB) * 1000) / 1000;

  // Conversion calculation
  const convDec = Math.round((convNum / convDen) * 10000) / 10000;
  const convDecStr = convDec.toString().replace('.', ',');

  return (
    <TheoryTemplate
      title="Törtek és tizedes törtek összefoglalása"
      subtitle="A teljes II. fejezet átfogó, rendszerező áttekintése: fogalmak, műveleti szabályok, átváltások és felkészülés a témazáró dolgozatra!"
      badgeText="🏆 5. Osztály • II. Fejezet Összefoglalás"
      documentId="chapter2-summary-theory-content"
      pdfFilename="5_osztaly_tortek_tizedestortek_osszefoglalas_tananyag.pdf"
      quickRule={{
        label: 'FEJEZETI ALAPSZABÁLYOK',
        formula: 'Tört: a/b (b részre osztásból a) | Tizedes: vessző a vessző alá | 1/2 = 0,5 | 1/4 = 0,25'
      }}
      themeColor="purple"
      onBack={onBack}
      onStartQuiz={handleStartQuiz}
    >
      {/* 1. SZAKASZ: A KÉT NAGY VILÁG KAPCSOLATA */}
      <TheorySection
        number={1}
        title="A tört és a tizedes tört világa"
        icon={<Layers className="w-5 h-5 text-purple-600 dark:text-purple-400" />}
        badgeColor="purple"
      >
        <TheoryCard
          title="Mi a közös a közönséges törtekben és a tizedes törtekben?"
          icon={<Lightbulb className="w-5 h-5 text-amber-500" />}
        >
          <div className="space-y-4">
            <p className="leading-relaxed">
              Az egész számok mellett a valóságban sokszor találkozunk <strong>nem egész mennyiségekkel</strong> (pl. fél alma, <MathText>3/4</MathText> óra, <MathText>0,5</MathText> liter víz, <MathText>1,25</MathText> méter deszka). 
              A matematika két egyenrangú írásmódot használ ezek leírására:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 space-y-2">
                <div className="flex items-center gap-2 font-bold text-purple-900 dark:text-purple-200">
                  <PieChart className="w-5 h-5 text-purple-600" />
                  <span>1. Közönséges tört alak: <MathText>a/b</MathText></span>
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  A nevező (<MathText>b</MathText>) megmutatja, hány egyenlő részre osztottuk az egészet, a számláló (<MathText>a</MathText>) pedig, hogy hány ilyen részt vettünk.
                </p>
                <div className="text-sm font-black font-mono text-purple-700 dark:text-purple-300 bg-white dark:bg-slate-900 p-2 rounded-lg border text-center">
                  <span className="text-purple-700 dark:text-purple-300 font-bold"><MathText>3/4</MathText> pizza = 3 szelet a 4 egyenlőből</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 space-y-2">
                <div className="flex items-center gap-2 font-bold text-emerald-900 dark:text-emerald-200">
                  <Hash className="w-5 h-5 text-emerald-600" />
                  <span>2. Tizedes tört alak: <MathText>0,75</MathText></span>
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  A tízes számrendszer helyiértékeit kiterjesztjük 1-nél kisebb egységekre: tizedek (<MathText>0,1</MathText>), századok (<MathText>0,01</MathText>), ezredek (<MathText>0,001</MathText>).
                </p>
                <div className="text-sm font-black font-mono text-emerald-700 dark:text-emerald-300 bg-white dark:bg-slate-900 p-2 rounded-lg border text-center">
                  <span className="text-emerald-700 dark:text-emerald-300 font-bold"><MathText>0,75</MathText> = 7 tized + 5 század</span>
                </div>
              </div>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 2. SZAKASZ: KÖZÖNSÉGES TÖRTEK TUDÁSTÁRA */}
      <TheorySection
        number={2}
        title="Közönséges törtek: fogalmak és műveletek"
        icon={<PieChart className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />}
        badgeColor="indigo"
      >
        <div className="space-y-4">
          <TheoryCard
            title="A legfontosabb alapszabályok és műveletek"
            icon={<BookOpen className="w-5 h-5 text-indigo-500" />}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border space-y-1.5">
                <span className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px] block">
                  Bővítés és Egyszerűsítés
                </span>
                <p className="text-slate-600 dark:text-slate-300">
                  <strong>Bővítés:</strong> számlálót és nevezőt ugyanazzal a 0-tól különböző számmal szorozzuk: <MathText>2/3 = 4/6 = 6/9</MathText>.
                </p>
                <p className="text-slate-600 dark:text-slate-300">
                  <strong>Egyszerűsítés:</strong> számlálót és nevezőt ugyanazzal a számmal osztjuk: <MathText>6/8 = 3/4</MathText>.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border space-y-1.5">
                <span className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px] block">
                  Összeadás és Kivonás
                </span>
                <p className="text-slate-600 dark:text-slate-300">
                  <strong>Azonos nevezőnél:</strong> a számlálókat összeadjuk/kivonjuk, a nevező változatlan: <MathText>2/7 + 3/7 = 5/7</MathText>.
                </p>
                <p className="text-slate-600 dark:text-slate-300">
                  <strong>Különböző nevezőnél:</strong> közös nevezőre bővítünk (legkisebb közös többszörös), majd összeadunk: <MathText>1/2 + 1/3 = 3/6 + 2/6 = 5/6</MathText>.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border space-y-1.5">
                <span className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px] block">
                  Szorzás Természetes Számmal
                </span>
                <p className="text-slate-600 dark:text-slate-300">
                  A számlálót megszorozzuk a természetes számmal, a nevező változatlan: <MathText>3/7 \cdot 2 = 6/7</MathText>.
                </p>
                <p className="text-slate-500 dark:text-slate-400 italic">
                  Vagy ha a nevező osztható a számmal, a nevezőt osztjuk: <MathText>3/8 \cdot 2 = 3/4</MathText>.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border space-y-1.5">
                <span className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px] block">
                  Osztás Természetes Számmal
                </span>
                <p className="text-slate-600 dark:text-slate-300">
                  Ha a számláló osztható, a számlálót osztjuk: <MathText>6/7 : 2 = 3/7</MathText>.
                </p>
                <p className="text-slate-600 dark:text-slate-300">
                  Ha a számláló nem osztható, a nevezőt szorozzuk: <MathText>3/5 : 2 = 3/10</MathText>.
                </p>
              </div>
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 3. SZAKASZ: TIZEDES TÖRTEK TUDÁSTÁRA */}
      <TheorySection
        number={3}
        title="Tizedes törtek: helyiérték és műveletek"
        icon={<Calculator className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />}
        badgeColor="emerald"
      >
        <TheoryCard
          title="A tizedes törtek legfontosabb műveleti szabályai"
          icon={<CheckCircle2 className="w-5 h-5 text-emerald-500" />}
        >
          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 space-y-1.5">
                <div className="font-bold text-emerald-900 dark:text-emerald-200">1. Összeadás & Kivonás</div>
                <p className="text-slate-600 dark:text-slate-300">
                  Mindig <strong>vessző a vessző alá</strong> kerüljön! Ha szükséges, a törtrészt nullákkal pótoljuk egyenlő hosszúságúra.
                </p>
                <div className="font-mono text-center bg-white dark:bg-slate-900 p-1.5 rounded border">
                  <MathText>3,40 + 1,25 = 4,65</MathText>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 space-y-1.5">
                <div className="font-bold text-blue-900 dark:text-blue-200">2. Szorzás 10, 100, 1000-rel</div>
                <p className="text-slate-600 dark:text-slate-300">
                  A tizedesvesszőt annyi hellyel léptetjük <strong>jobbra</strong>, ahány nulla van a szorzóban.
                </p>
                <div className="font-mono text-center bg-white dark:bg-slate-900 p-1.5 rounded border">
                  <MathText>0,375 \cdot 100 = 37,5</MathText>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800 space-y-1.5">
                <div className="font-bold text-indigo-900 dark:text-indigo-200">3. Osztás 10, 100, 1000-rel</div>
                <p className="text-slate-600 dark:text-slate-300">
                  A tizedesvesszőt annyi hellyel léptetjük <strong>balra</strong>, ahány nulla van az osztóban.
                </p>
                <div className="font-mono text-center bg-white dark:bg-slate-900 p-1.5 rounded border">
                  <MathText>45,6 : 10 = 4,56</MathText>
                </div>
              </div>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 4. SZAKASZ: INTERAKTÍV ÖSSZEFOGLALÓ SZIMULÁTOR */}
      <TheorySection
        number={4}
        title="Interaktív fejezeti műveleti laboratórium"
        icon={<Sliders className="w-5 h-5 text-purple-600 dark:text-purple-400" />}
        badgeColor="purple"
      >
        <TheoryCard
          title="Próbáld ki a műveleteket és átváltásokat élőben!"
          icon={<Sparkles className="w-5 h-5 text-purple-500" />}
        >
          <div className="space-y-4">
            {/* Simulator Tabs */}
            <div className="flex flex-wrap gap-2 border-b pb-2">
              <Button
                variant={activeTab === 'fractions' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveTab('fractions')}
                className="text-xs font-bold"
              >
                <PieChart className="w-4 h-4 mr-1" />
                Közönséges tört műveletek
              </Button>
              <Button
                variant={activeTab === 'decimals' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveTab('decimals')}
                className="text-xs font-bold"
              >
                <Calculator className="w-4 h-4 mr-1" />
                Tizedes tört műveletek
              </Button>
              <Button
                variant={activeTab === 'conversion' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveTab('conversion')}
                className="text-xs font-bold"
              >
                <ArrowRightLeft className="w-4 h-4 mr-1" />
                Tört ↔ Tizedes átváltó
              </Button>
            </div>

            {/* TAB 1: FRACTION MATH */}
            {activeTab === 'fractions' && (
              <div className="p-4 rounded-xl bg-purple-50/50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center text-center">
                  {/* Fraction 1 Controls */}
                  <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border">
                    <span className="text-xs font-bold text-slate-500 block mb-1">1. Tört</span>
                    <div className="flex justify-center gap-2 items-center">
                      <input
                        type="number"
                        min="1"
                        max="20"
                        value={f1Num}
                        onChange={(e) => setF1Num(Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-12 h-8 text-center font-bold border rounded"
                      />
                      <span className="font-bold">/</span>
                      <input
                        type="number"
                        min="1"
                        max="20"
                        value={f1Den}
                        onChange={(e) => setF1Den(Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-12 h-8 text-center font-bold border rounded"
                      />
                    </div>
                  </div>

                  {/* Operator */}
                  <div className="flex justify-center gap-2">
                    <Button
                      variant={fOp === '+' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setFOp('+')}
                      className="w-10 h-10 text-lg font-bold"
                    >
                      +
                    </Button>
                    <Button
                      variant={fOp === '-' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setFOp('-')}
                      className="w-10 h-10 text-lg font-bold"
                    >
                      -
                    </Button>
                  </div>

                  {/* Fraction 2 Controls */}
                  <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border">
                    <span className="text-xs font-bold text-slate-500 block mb-1">2. Tört</span>
                    <div className="flex justify-center gap-2 items-center">
                      <input
                        type="number"
                        min="1"
                        max="20"
                        value={f2Num}
                        onChange={(e) => setF2Num(Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-12 h-8 text-center font-bold border rounded"
                      />
                      <span className="font-bold">/</span>
                      <input
                        type="number"
                        min="1"
                        max="20"
                        value={f2Den}
                        onChange={(e) => setF2Den(Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-12 h-8 text-center font-bold border rounded"
                      />
                    </div>
                  </div>
                </div>

                {/* Calculation Output */}
                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border text-center space-y-2">
                  <div className="text-xs font-bold text-slate-500 uppercase">Levezetés és Eredmény:</div>
                  <div className="text-base sm:text-lg font-black font-mono text-purple-700 dark:text-purple-300">
                    <MathText>
                      {`${f1Num}/${f1Den} ${fOp} ${f2Num}/${f2Den} = ${expF1Num}/${commonDen} ${fOp} ${expF2Num}/${commonDen} = ${resNumRaw}/${commonDen}`}
                    </MathText>
                    {g > 1 && (
                      <span className="text-emerald-600 dark:text-emerald-400 ml-2">
                        <MathText>{`= ${simplifiedNum}/${simplifiedDen}`}</MathText>
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500">Közös nevező: {commonDen} (bővítők: {m1} és {m2})</p>
                </div>
              </div>
            )}

            {/* TAB 2: DECIMAL MATH */}
            {activeTab === 'decimals' && (
              <div className="p-4 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center text-center">
                  <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border">
                    <span className="text-xs font-bold text-slate-500 block mb-1">1. Tizedes tört</span>
                    <input
                      type="number"
                      step="0.05"
                      value={decA}
                      onChange={(e) => setDecA(parseFloat(e.target.value) || 0)}
                      className="w-24 h-8 text-center font-bold border rounded mx-auto"
                    />
                  </div>

                  <div className="flex justify-center gap-2">
                    {(['+', '-', '*'] as const).map((op) => (
                      <Button
                        key={op}
                        variant={decOp === op ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setDecOp(op)}
                        className="w-10 h-10 text-lg font-bold"
                      >
                        {op === '*' ? '·' : op}
                      </Button>
                    ))}
                  </div>

                  <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border">
                    <span className="text-xs font-bold text-slate-500 block mb-1">2. Tizedes tört / Szorzó</span>
                    <input
                      type="number"
                      step="0.05"
                      value={decB}
                      onChange={(e) => setDecB(parseFloat(e.target.value) || 0)}
                      className="w-24 h-8 text-center font-bold border rounded mx-auto"
                    />
                  </div>
                </div>

                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border text-center space-y-1">
                  <div className="text-xs font-bold text-slate-500 uppercase">Számítás eredménye:</div>
                  <div className="text-xl font-black font-mono text-emerald-700 dark:text-emerald-300">
                    <MathText>{`${decA.toString().replace('.', ',')} ${decOp === '*' ? '·' : decOp} ${decB.toString().replace('.', ',')} = ${decResult.toString().replace('.', ',')}`}</MathText>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: CONVERSION */}
            {activeTab === 'conversion' && (
              <div className="p-4 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800 space-y-4">
                <div className="flex justify-center items-center gap-4">
                  <div className="text-center">
                    <span className="text-xs font-bold text-slate-500 block mb-1">Számláló</span>
                    <input
                      type="number"
                      min="1"
                      max="50"
                      value={convNum}
                      onChange={(e) => setConvNum(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-16 h-8 text-center font-bold border rounded"
                    />
                  </div>
                  <span className="text-xl font-bold">/</span>
                  <div className="text-center">
                    <span className="text-xs font-bold text-slate-500 block mb-1">Nevező</span>
                    <input
                      type="number"
                      min="2"
                      max="100"
                      value={convDen}
                      onChange={(e) => setConvDen(Math.max(2, parseInt(e.target.value) || 2))}
                      className="w-16 h-8 text-center font-bold border rounded"
                    />
                  </div>
                </div>

                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border text-center space-y-2">
                  <div className="text-xs font-bold text-slate-500 uppercase">Tizedes tört alak osztással:</div>
                  <div className="text-xl font-black font-mono text-indigo-700 dark:text-indigo-300">
                    <MathText>{`${convNum}/${convDen} = ${convNum} : ${convDen} = ${convDecStr}`}</MathText>
                  </div>
                </div>
              </div>
            )}
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 5. SZAKASZ: TIPIKUS TÉMAZÁRÓ CSAPDÁK */}
      <TheorySection
        number={5}
        title="Tipikus témazáró csapdák és hibák"
        icon={<AlertTriangle className="w-5 h-5 text-rose-600 dark:text-rose-400" />}
        badgeColor="rose"
      >
        <div className="space-y-4">
          <TheoryTrapBox
            title="1. Csapda: Nevezők összeadása közönséges törteknél"
            wrong="1/3 + 1/3 = 2/6 (a nevezőket is összeadták)."
            correct="1/3 + 1/3 = 2/3! A nevező a részek méretét jelzi, az nem változik összeadáskor!"
            explanation="Gondolj a pizzára: ha megeszel egy harmadot és még egy harmadot, akkor két harmadot ettél meg, nem két hatodot!"
          />

          <TheoryTrapBox
            title="2. Csapda: Vessző rossz helyre illesztése tizedes kivonásnál"
            wrong="5 - 0,3 = 0,2 (mert az 5-ből elvonták a 3-at rossz helyiértéken)."
            correct="5,0 - 0,3 = 4,7! Az 5 egész az 5,0, ebből 3 tizedet levonva 4 egész 7 tizedet kapunk."
            explanation="Egész számból tizedestörtet kivonva mindig írj ki tizedesvesszőt és nullát az egész után: 5 = 5,0."
          />

          <TheoryTrapBox
            title="3. Csapda: Szorzásnál mind a számláló, mind a nevező megszorzása"
            wrong="2/5 · 3 = 6/15 (mindkettőt megszorozták 3-mal, ami csak bővítés lenne!)."
            correct="2/5 · 3 = 6/5 = 1 egész 1/5! Csak a számlálót szorozzuk, a részek mérete marad ötöd!"
            explanation="Ha a számlálót és nevezőt is szorozzuk, a tört értéke nem változik (bővítés). Egész számmal szorozva a mennyiség nő, így csak a számlálót szorozzuk."
          />
        </div>
      </TheorySection>

      {/* 6. SZAKASZ: ÖSSZEFOGLALÓ KÉPLETTÁR */}
      <TheorySection
        number={6}
        title="Fejezeti összefoglaló képlet- és szabálytár"
        icon={<BookOpen className="w-5 h-5 text-purple-600 dark:text-purple-400" />}
        badgeColor="purple"
      >
        <TheoryTable
          headers={['Témakör', 'Művelet / Szabály', 'Példa', 'Kulcsfontosságú tudnivaló']}
          rows={[
            ['Tört összeadás', 'a/c + b/c = (a+b)/c', '2/5 + 1/5 = 3/5', 'A nevező változatlan marad!'],
            ['Közös nevező', 'Bővítés az LKKT-re', '1/4 + 1/6 = 3/12 + 2/12 = 5/12', 'Előbb azonos méretű részekre váltunk.'],
            ['Tört szorzása', 'a/b · c = (a·c)/b', '3/8 · 2 = 6/8 = 3/4', 'Csak a számlálót szorozzuk!'],
            ['Tört osztása', 'a/b : c = (a:c)/b vagy a/(b·c)', '4/5 : 2 = 2/5 | 3/5 : 2 = 3/10', 'Ha számláló osztható, azt osztjuk, egyébként a nevezőt szorozzuk.'],
            ['Tizedes összeadás', 'Vessző a vessző alá', '12,4 + 3,85 = 16,25', 'Nullák pótlása a tizedesjegyek végén.'],
            ['Szorzás 10/100-zal', 'Vessző jobbra léptetése', '0,45 · 100 = 45', 'Annyi helyet lép, ahány nulla van.'],
            ['Osztás 10/100-zal', 'Vessző balra léptetése', '3,5 : 10 = 0,35', 'Annyi helyet lép balra, ahány nulla van.'],
            ['Nevezetes törtek', 'Tört → Tizedes alak', '1/2=0,5 | 1/4=0,25 | 3/4=0,75 | 1/5=0,2 | 1/8=0,125', 'Érdemes fejből megjegyezni!']
          ]}
        />
      </TheorySection>
    </TheoryTemplate>
  );
};
export default Chapter2SummaryTheory;
