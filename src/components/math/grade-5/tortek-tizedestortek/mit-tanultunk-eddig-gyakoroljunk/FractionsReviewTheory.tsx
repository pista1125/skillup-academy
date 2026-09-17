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
  Binary,
  BookOpen,
  Award
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { MathText } from '@/components/math/shared/MathText';

export interface FractionsReviewTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
  onSwitchToQuiz?: () => void;
}

// Math helpers
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
  return (a * b) / gcd(a, b);
}

export const FractionsReviewTheory: React.FC<FractionsReviewTheoryProps> = ({
  onBack,
  onStartQuiz,
  onSwitchToQuiz
}) => {
  const handleStartQuiz = onStartQuiz || onSwitchToQuiz;

  // Interactive Universal Review Calculator State
  const [op, setOp] = useState<'+' | '-' | '·' | ':'>('+');
  const [num1, setNum1] = useState<number>(1);
  const [den1, setDen1] = useState<number>(2);
  const [num2, setNum2] = useState<number>(1);
  const [den2, setDen2] = useState<number>(3);
  const [scalar, setScalar] = useState<number>(2);

  // Compute result dynamically
  let resNum = 0;
  let resDen = 1;
  let stepExplanation = '';

  if (op === '+') {
    const common = lcm(den1, den2);
    const m1 = common / den1;
    const m2 = common / den2;
    resNum = num1 * m1 + num2 * m2;
    resDen = common;
    stepExplanation = `Közös nevező az LKKT(${den1}, ${den2}) = ${common}. Bővítve: ${num1 * m1}/${common} + ${num2 * m2}/${common} = ${resNum}/${common}.`;
  } else if (op === '-') {
    const common = lcm(den1, den2);
    const m1 = common / den1;
    const m2 = common / den2;
    resNum = num1 * m1 - num2 * m2;
    resDen = common;
    stepExplanation = `Közös nevező az LKKT(${den1}, ${den2}) = ${common}. Bővítve: ${num1 * m1}/${common} - ${num2 * m2}/${common} = ${resNum}/${common}.`;
  } else if (op === '·') {
    resNum = num1 * scalar;
    resDen = den1;
    stepExplanation = `Számláló szorzása az egész számmal: (${num1} · ${scalar})/${den1} = ${resNum}/${resDen}.`;
  } else if (op === ':') {
    if (num1 % scalar === 0) {
      resNum = num1 / scalar;
      resDen = den1;
      stepExplanation = `A számláló osztható ${scalar}-val: (${num1} : ${scalar})/${den1} = ${resNum}/${resDen}.`;
    } else {
      resNum = num1;
      resDen = den1 * scalar;
      stepExplanation = `A számláló nem osztható, a nevezőt szorozzuk: ${num1}/(${den1} · ${scalar}) = ${resNum}/${resDen}.`;
    }
  }

  const g = gcd(Math.abs(resNum), resDen);
  const simpNum = resNum / g;
  const simpDen = resDen / g;

  return (
    <TheoryTemplate
      title="Mit tanultunk eddig a törtekről? – Átfogó összefoglalás"
      subtitle="Ismételd át a közönséges törtek legfontosabb fogalmait, a bővítést, egyszerűsítést, a számegyenest és a 4 alapműveletet!"
      badgeText="🍕 5. Osztály • II. Törtek, tizedes törtek"
      documentId="fractions-review-theory-content"
      pdfFilename="5_osztaly_tortek_atfogo_osszefoglalas_tananyag.pdf"
      quickRule={{
        label: 'TÖRTALAPOK ÉS MŰVELETI ÖSSZEFOGLALÓ',
        formula: 'a/b ± c/d (közös nevező) | a/b · n = (a · n)/b | a/b : n = a/(b · n)'
      }}
      themeColor="rose"
      onBack={onBack}
      onStartQuiz={handleStartQuiz}
    >
      {/* 1. SZAKASZ: TÖRTFOGALOM ÉS ALAPOK ÁTTEKINTÉSE */}
      <TheorySection
        number={1}
        title="Törtfogalom és a törtek típusai"
        icon={<PieChart className="w-5 h-5 text-rose-600 dark:text-rose-400" />}
        badgeColor="rose"
      >
        <TheoryCard
          title="Mit fejez ki a tört és hogyan csoportosítjuk?"
          icon={<Lightbulb className="w-5 h-5 text-amber-500" />}
        >
          <div className="space-y-4">
            <p className="leading-relaxed">
              A <strong>tört</strong> egy egésznek az egyenlő részekre való felosztását és ezen részek számbavételét jelenti:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-2 text-center">
              <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800">
                <div className="text-xs font-bold text-slate-500 uppercase">Számláló (felső szám)</div>
                <div className="text-lg font-black text-amber-700 dark:text-amber-300 font-mono mt-1">Hány részt vettünk?</div>
                <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">Pl. <MathText>3/4</MathText>-ben a 3</div>
              </div>

              <div className="p-3.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800">
                <div className="text-xs font-bold text-slate-500 uppercase">Törtvonal (középen)</div>
                <div className="text-lg font-black text-indigo-700 dark:text-indigo-300 font-mono mt-1">Osztást jelent (:)</div>
                <div className="text-xs text-slate-600 dark:text-slate-400 mt-1"><MathText>3/4 = 3 : 4</MathText></div>
              </div>

              <div className="p-3.5 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800">
                <div className="text-xs font-bold text-slate-500 uppercase">Nevező (alsó szám)</div>
                <div className="text-lg font-black text-purple-700 dark:text-purple-300 font-mono mt-1">Hány egyenlő részre osztottuk?</div>
                <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">Pl. <MathText>3/4</MathText>-ben a 4 (nem lehet 0!)</div>
              </div>
            </div>

            {/* Törtek 3 alaptípusa */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800">
                <div className="text-xs font-black text-emerald-700 dark:text-emerald-300 uppercase">1. Valódi tört (&lt; 1)</div>
                <div className="text-xs text-slate-700 dark:text-slate-300 mt-1">
                  Számláló &lt; Nevező. Értéke kisebb 1 egésznél. Pl. <MathText>1/2, 3/4, 5/8</MathText>.
                </div>
              </div>

              <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800">
                <div className="text-xs font-black text-blue-700 dark:text-blue-300 uppercase">2. Egész számmal egyenlő (= 1, 2...)</div>
                <div className="text-xs text-slate-700 dark:text-slate-300 mt-1">
                  Számláló többszöröse a nevezőnek. Pl. <MathText>4/4 = 1, 8/4 = 2, 12/3 = 4</MathText>.
                </div>
              </div>

              <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800">
                <div className="text-xs font-black text-amber-700 dark:text-amber-300 uppercase">3. Áltört (&gt; 1) & Vegyes tört</div>
                <div className="text-xs text-slate-700 dark:text-slate-300 mt-1">
                  Számláló &gt; Nevező. Átírható egész és törtrész összegére: <MathText>7/4 = 1 3/4</MathText>.
                </div>
              </div>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 2. SZAKASZ: BŐVÍTÉS, EGYSZERŰSÍTÉS ÉS ÖSSZEHASONLÍTÁS */}
      <TheorySection
        number={2}
        title="Bővítés, egyszerűsítés és összehasonlítás"
        icon={<Layers className="w-5 h-5 text-rose-600 dark:text-rose-400" />}
        badgeColor="rose"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <TheoryCard
            title="Bővítés és Egyszerűsítés"
            icon={<RefreshCw className="w-5 h-5 text-indigo-500" />}
          >
            <div className="space-y-3 text-sm">
              <div>
                <strong className="text-indigo-600 dark:text-indigo-400">Bővítés:</strong> A számlálót és a nevezőt is <strong>ugyanazzal a pozitív egész számmal szorozzuk</strong>. A tört értéke NEM változik!
                <div className="p-2 bg-indigo-50 dark:bg-indigo-950/40 rounded-lg text-center font-mono my-1 font-bold text-xs">
                  <MathText>2/3 = (2 · 4)/(3 · 4) = 8/12</MathText>
                </div>
              </div>
              <div>
                <strong className="text-emerald-600 dark:text-emerald-400">Egyszerűsítés:</strong> A számlálót és a nevezőt is <strong>ugyanazzal a közös osztóval osztjuk</strong>. A legegyszerűbb alakban a számláló és nevező relatív prím!
                <div className="p-2 bg-emerald-50 dark:bg-emerald-950/40 rounded-lg text-center font-mono my-1 font-bold text-xs">
                  <MathText>18/24 = (18 : 6)/(24 : 6) = 3/4</MathText>
                </div>
              </div>
            </div>
          </TheoryCard>

          <TheoryCard
            title="Törtek összehasonlítása"
            icon={<CheckCircle2 className="w-5 h-5 text-emerald-500" />}
          >
            <div className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300">
              <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <strong>1. Azonos nevezők:</strong> A nagyobb számlálójú tört a nagyobb (több szelet).
                <div className="font-mono text-emerald-600 dark:text-emerald-400 font-bold mt-0.5"><MathText>5/8 &gt; 3/8</MathText></div>
              </div>
              <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <strong>2. Azonos számlálók:</strong> A kisebb nevezőjű tört a nagyobb (nagyobbak a szeletek!).
                <div className="font-mono text-emerald-600 dark:text-emerald-400 font-bold mt-0.5"><MathText>3/4 &gt; 3/5 &gt; 3/10</MathText></div>
              </div>
              <div className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <strong>3. Különböző nevezők:</strong> Közös nevezőre hozzuk őket bővítéssel!
                <div className="font-mono text-emerald-600 dark:text-emerald-400 font-bold mt-0.5"><MathText>2/3 = 8/12 &gt; 3/4 = 9/12 → 3/4 &gt; 2/3</MathText></div>
              </div>
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 3. SZAKASZ: A 4 ALAPMŰVELET ÖSSZEFOGLALÁSA */}
      <TheorySection
        number={3}
        title="A 4 alapművelet törtekkel – Szuperösszegzés"
        icon={<Calculator className="w-5 h-5 text-rose-600 dark:text-rose-400" />}
        badgeColor="rose"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Összeadás és kivonás */}
          <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/40 border-2 border-amber-200 dark:border-amber-800 space-y-2">
            <div className="text-xs font-black text-amber-800 dark:text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
              <span>➕ ➖ Összeadás és Kivonás</span>
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              Csak <strong>azonos nevezőjű</strong> törteket adhatunk össze vagy vonhatunk ki! A számlálókat összeadjuk/kivonjuk, a <strong>nevező változatlan marad</strong>! Ha különbözőek a nevezők, előbb közös nevezőre (LKKT) bővítünk.
            </p>
            <div className="p-2 bg-white dark:bg-slate-900 rounded-xl font-mono text-xs font-bold text-center border border-amber-100 dark:border-amber-900">
              <MathText>1/3 + 1/4 = 4/12 + 3/12 = 7/12</MathText>
            </div>
          </div>

          {/* Szorzás és osztás egész számmal */}
          <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border-2 border-indigo-200 dark:border-indigo-800 space-y-2">
            <div className="text-xs font-black text-indigo-800 dark:text-indigo-300 uppercase tracking-wider flex items-center gap-1.5">
              <span>✖️ ➗ Szorzás és Osztás természetes számmal</span>
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              <strong>Szorzáskor:</strong> a számlálót szorozzuk (vagy a nevezőt osztjuk).<br />
              <strong>Osztáskor:</strong> a számlálót osztjuk (ha osztható), vagy a nevezőt szorozzuk!
            </p>
            <div className="p-2 bg-white dark:bg-slate-900 rounded-xl font-mono text-xs font-bold text-center border border-indigo-100 dark:border-indigo-900 space-y-1">
              <div><MathText>2/7 · 3 = 6/7</MathText></div>
              <div><MathText>4/5 : 2 = 2/5</MathText> és <MathText>3/4 : 2 = 3/8</MathText></div>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 4. SZAKASZ: INTERAKTÍV ÖSSZEFOGLALÓ KALKULÁTOR */}
      <TheorySection
        number={4}
        title="Interaktív Gyakorló- és Ellenőrző Laboratórium"
        icon={<Award className="w-5 h-5 text-rose-600 dark:text-rose-400" />}
        badgeColor="rose"
      >
        <div className="p-5 rounded-2xl bg-gradient-to-br from-rose-50 to-orange-50 dark:from-slate-900 dark:to-slate-850 border-2 border-rose-200 dark:border-rose-800">
          <div className="text-center mb-4">
            <h3 className="text-lg font-black text-slate-900 dark:text-white">
              Próbálj ki bármilyen műveletet valós időben!
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Válaszd ki a műveleti jelet, állítsd be a számokat, és figyeld a levezetést!
            </p>
          </div>

          {/* Operation Selector Tabs */}
          <div className="flex justify-center gap-2 mb-5">
            {(['+', '-', '·', ':'] as const).map((oper) => (
              <button
                key={oper}
                onClick={() => setOp(oper)}
                className={cn(
                  "w-12 h-10 rounded-xl font-black text-base transition-all border-2 cursor-pointer flex items-center justify-center",
                  op === oper
                    ? "bg-rose-600 border-rose-700 text-white shadow-xs"
                    : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-rose-400"
                )}
              >
                {oper}
              </button>
            ))}
          </div>

          {/* Dynamic Inputs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
            <div className="bg-white dark:bg-slate-800 p-2.5 rounded-xl border text-center">
              <label className="text-[11px] font-bold text-slate-500 block">1. Számláló ({num1})</label>
              <input type="range" min={1} max={9} value={num1} onChange={(e) => setNum1(Number(e.target.value))} className="w-full accent-rose-600" />
            </div>
            <div className="bg-white dark:bg-slate-800 p-2.5 rounded-xl border text-center">
              <label className="text-[11px] font-bold text-slate-500 block">1. Nevező ({den1})</label>
              <input type="range" min={2} max={12} value={den1} onChange={(e) => setDen1(Number(e.target.value))} className="w-full accent-rose-600" />
            </div>

            {op === '+' || op === '-' ? (
              <>
                <div className="bg-white dark:bg-slate-800 p-2.5 rounded-xl border text-center">
                  <label className="text-[11px] font-bold text-slate-500 block">2. Számláló ({num2})</label>
                  <input type="range" min={1} max={9} value={num2} onChange={(e) => setNum2(Number(e.target.value))} className="w-full accent-rose-600" />
                </div>
                <div className="bg-white dark:bg-slate-800 p-2.5 rounded-xl border text-center">
                  <label className="text-[11px] font-bold text-slate-500 block">2. Nevező ({den2})</label>
                  <input type="range" min={2} max={12} value={den2} onChange={(e) => setDen2(Number(e.target.value))} className="w-full accent-rose-600" />
                </div>
              </>
            ) : (
              <div className="col-span-2 bg-white dark:bg-slate-800 p-2.5 rounded-xl border text-center">
                <label className="text-[11px] font-bold text-slate-500 block">Egész szám ({scalar})</label>
                <input type="range" min={2} max={6} value={scalar} onChange={(e) => setScalar(Number(e.target.value))} className="w-full accent-rose-600" />
              </div>
            )}
          </div>

          {/* Calculator Result Box */}
          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-rose-200 dark:border-rose-800 shadow-xs space-y-3 text-center">
            <div className="text-2xl sm:text-3xl font-mono font-black text-rose-700 dark:text-rose-300 flex items-center justify-center">
              {op === '+' || op === '-' ? (
                <MathText size="xl">{num1}/{den1} {op} {num2}/{den2} = ?</MathText>
              ) : (
                <MathText size="xl">{num1}/{den1} {op} {scalar} = ?</MathText>
              )}
            </div>

            <div className="p-3 bg-rose-50/70 dark:bg-rose-950/40 rounded-xl text-left text-xs space-y-1 text-slate-700 dark:text-slate-300">
              <div className="font-bold text-rose-900 dark:text-rose-200">Levezetés:</div>
              <div><MathText>{stepExplanation}</MathText></div>
            </div>

            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300">Legegyszerűbb végeredmény:</span>
              <span className="text-xl font-mono font-black text-emerald-900 dark:text-emerald-100">
                <MathText size="lg">{simpNum}/{simpDen}</MathText>
              </span>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 5. SZAKASZ: GYAKORI HIBÁK ÉS CSAPDÁK */}
      <TheorySection
        number={5}
        title="Gyakori hibák – Amit soha ne kövess el!"
        icon={<AlertTriangle className="w-5 h-5 text-rose-500" />}
        badgeColor="rose"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryTrapBox
            title="1. Nevezők összeadása"
            wrong="1/3 + 1/4 = 2/7"
            correct="1/3 + 1/4 = 4/12 + 3/12 = 7/12"
            explanation="Nevezőket SOHA nem adunk össze! A nevező csak a részek méretét jelzi, előbb közös nevezőre kell hozni a törteket!"
          />

          <TheoryTrapBox
            title="2. Nevező szorzása szorzáskor"
            wrong="2/5 · 3 = 6/15"
            correct="2/5 · 3 = 6/5 = 1 1/5"
            explanation="Ha a számlálót és nevezőt is megszorzod, az bővítés! Szorzáskor csak a számlálót szorozzuk!"
          />

          <TheoryTrapBox
            title="3. Nevező osztása osztáskor"
            wrong="3/4 : 2 = 3/(4:2) = 3/2"
            correct="3/4 : 2 = 3/(4·2) = 3/8"
            explanation="Ha a nevezőt osztod, a tört értéke nőne! Ha a nevezőt módosítod osztáskor, SZOROZNI kell a számmal!"
          />

          <TheoryTrapBox
            title="4. Egyszerűsítés elfelejtése"
            wrong="4/8 végeredményként"
            correct="4/8 = 1/2"
            explanation="A végeredményt mindig a tovább nem egyszerűsíthető alakra hozzuk és a számlálót-nevezőt relatív prímekké alakítjuk!"
          />
        </div>
      </TheorySection>

      {/* 6. SZAKASZ: ÖSSZEFOGLALÓ TÁBLÁZAT */}
      <TheorySection
        number={6}
        title="Nagy törtszámítási összefoglaló táblázat"
        icon={<CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />}
        badgeColor="emerald"
      >
        <TheoryTable
          title="Minden törtszabály egy helyen"
          headers={['Művelet / Tevékenység', 'Szabály', 'Mintapélda', 'Végeredmény']}
          rows={[
            ['Tört bővítése', 'Számláló és nevező szorzása ugyanazzal', '3/4 bővítve 3-mal', '9/12'],
            ['Tört egyszerűsítése', 'Számláló és nevező osztása közös osztóval', '12/18 egyszerűsítve 6-tal', '2/3'],
            ['Azonos nevezőjű összeadás', 'Számlálók összege, nevező marad', '2/7 + 3/7', '5/7'],
            ['Különböző nevezőjű kivonás', 'Közös nevezőre bővítés után kivonás', '5/6 - 1/2 = 5/6 - 3/6', '2/6 = 1/3'],
            ['Szorzás természetes számmal', 'Számláló · egész, nevező marad', '3/10 · 3', '9/10'],
            ['Osztás természetes számmal', 'Számláló : egész vagy nevező · egész', '6/7 : 3 és 1/4 : 2', '2/7 és 1/8'],
            ['Vegyes tört áltörtté alakítása', 'Egész · nevező + számláló', '2 1/3', '7/3'],
            ['Műveletek sorrendje', 'Zárójel → Szorzás/Osztás → Összeadás/Kivonás', '1/2 + 1/2 · 2', '1/2 + 1 = 1 1/2']
          ]}
        />
      </TheorySection>
    </TheoryTemplate>
  );
};

export default FractionsReviewTheory;
