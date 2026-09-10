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
import { Card, CardContent } from '@/components/ui/card';
import {
  Sparkles,
  Calculator,
  Layers,
  ArrowRightLeft,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Zap,
  Scale,
  Binary,
  Compass,
  ArrowRight,
  HelpCircle,
  Divide,
  Percent
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface RationalOperationsTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

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

export const RationalOperationsTheory: React.FC<RationalOperationsTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // Interactive Calculator State
  const [numA, setNumA] = useState<number>(2);
  const [denA, setDenA] = useState<number>(3);
  const [op, setOp] = useState<'+' | '-' | '*' | '/'>('+');
  const [numB, setNumB] = useState<number>(3);
  const [denB, setDenB] = useState<number>(4);

  // Safe Calculation
  const calculateFraction = () => {
    if (denA === 0 || denB === 0) {
      return { error: 'A nevező nem lehet 0!' };
    }
    if (op === '/' && numB === 0) {
      return { error: 'Nullával való osztás értelmetlen!' };
    }

    let rawNum = 0;
    let rawDen = 1;
    let stepsText = '';

    if (op === '+' || op === '-') {
      const commonDen = lcm(denA, denB);
      const multA = commonDen / denA;
      const multB = commonDen / denB;
      const expNumA = numA * multA;
      const expNumB = numB * multB;

      if (op === '+') {
        rawNum = expNumA + expNumB;
        stepsText = `Közös nevező (LKKT): ${commonDen}. Bővítés: ${numA}/${denA} = ${expNumA}/${commonDen}, és ${numB}/${denB} = ${expNumB}/${commonDen}. Összeadás: (${expNumA} + ${expNumB}) / ${commonDen} = ${rawNum}/${commonDen}.`;
      } else {
        rawNum = expNumA - expNumB;
        stepsText = `Közös nevező (LKKT): ${commonDen}. Bővítés: ${numA}/${denA} = ${expNumA}/${commonDen}, és ${numB}/${denB} = ${expNumB}/${commonDen}. Kivonás: (${expNumA} - ${expNumB}) / ${commonDen} = ${rawNum}/${commonDen}.`;
      }
      rawDen = commonDen;
    } else if (op === '*') {
      rawNum = numA * numB;
      rawDen = denA * denB;
      stepsText = `Szorzás: számlálót számlálóval (${numA} · ${numB} = ${rawNum}), nevezőt nevezővel (${denA} · ${denB} = ${rawDen}) szorzunk.`;
    } else {
      // Division: multiply by reciprocal
      rawNum = numA * denB;
      rawDen = denA * numB;
      if (rawDen < 0) {
        rawNum = -rawNum;
        rawDen = -rawDen;
      }
      stepsText = `Osztás a reciprok szorzásával: (${numA}/${denA}) : (${numB}/${denB}) = (${numA}/${denA}) · (${denB}/${numB}) = (${numA} · ${denB}) / (${denA} · ${numB}) = ${rawNum}/${rawDen}.`;
    }

    const g = gcd(rawNum, rawDen);
    const finalNum = rawNum / g;
    const finalDen = rawDen / g;
    const decVal = finalDen !== 0 ? (finalNum / finalDen).toFixed(3).replace('.', ',') : '0';

    return {
      rawNum,
      rawDen,
      finalNum,
      finalDen,
      g,
      stepsText,
      decVal,
      isSimp: g === 1
    };
  };

  const res = calculateFraction();

  return (
    <TheoryTemplate
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      documentId="g7-rational-operations-theory-doc"
      pdfFilename="7_osztaly_muveletek_racionalis_szamokkal.pdf"
      badgeText="7. Osztály • Matematika II. Témakör"
      title="3. Műveletek a racionális számok halmazán"
      subtitle="Összeadás, kivonás, szorzás, reciprokképzés, osztás és műveleti tulajdonságok a racionális számok (Q) halmazán"
      quickRule={{
        label: 'Törttel való osztás aranyszabálya',
        formula: '(a/b) : (c/d) = (a/b) · (d/c) = (a·d) / (b·c)  (c ≠ 0)'
      }}
      themeColor="purple"
      practiceTitle="Készen állsz a racionális műveletek tesztelésére?"
      practiceSubtitle="30 válogatott feladat 3 nehézségi szinten részletes levezetésekkel, kártyás párosítóval és csoportosítóval!"
    >
      {/* SECTION 1: A Racionális számok halmaza (Q) */}
      <TheorySection
        number={1}
        title="A racionális számok halmaza (Q) és előjelszabályok"
        icon={<Binary className="w-5 h-5 text-purple-600" />}
        badgeColor="purple"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard
            title="A racionális számok halmaza (Q)"
            badge="Halmazelmélet"
            variant="purple"
          >
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 mb-2">
              <strong>Racionális számnak</strong> nevezzük mindazokat a számokat, amelyek felírhatók két egész szám hányadosaként, azaz <strong>a/b tört alakban</strong>, ahol <em>a, b ∈ Z és b ≠ 0</em>.
            </p>
            <div className="p-2.5 bg-purple-50 dark:bg-purple-950/40 rounded-xl border border-purple-200 dark:border-purple-800 text-center font-mono text-sm font-bold text-purple-900 dark:text-purple-200 mb-2">
              N ⊂ Z ⊂ Q
            </div>
            <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-400">
              <li>• Minden természetes szám racionális szám: pl. 5 = 5/1.</li>
              <li>• Minden egész szám racionális szám: pl. -3 = -3/1.</li>
              <li>• Minden véges és végtelen szakaszos tizedestört racionális szám.</li>
            </ul>
          </TheoryCard>

          <TheoryCard
            title="Előjelszabályok a törtvonalon"
            badge="Előjelek"
            variant="indigo"
          >
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 mb-2">
              A negatív előjel elhelyezése a törtnél szabadon felcserélhető, a tört értéke ugyanaz marad:
            </p>
            <div className="p-2.5 bg-indigo-50 dark:bg-indigo-950/40 rounded-xl border border-indigo-200 dark:border-indigo-800 text-center font-mono text-sm font-bold text-indigo-900 dark:text-indigo-200 mb-2">
              -(a/b) = (-a)/b = a/(-b)
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
              <div>• <strong>Példa:</strong> -(3/4) = (-3)/4 = 3/(-4) = -0,75.</div>
              <div>• <strong>Két mínuszjel:</strong> (-a)/(-b) = +(a/b), mert két negatív hányadosa pozitív!</div>
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* SECTION 2: Törtek összeadása és kivonása */}
      <TheorySection
        number={2}
        title="Racionális számok összeadása és kivonása"
        icon={<Scale className="w-5 h-5 text-indigo-600" />}
        badgeColor="indigo"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard
            title="Azonos nevezőjű törtek"
            badge="Alapeset"
            variant="emerald"
          >
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 mb-2">
              Azonos nevező esetén a <strong>számlálókat összeadjuk vagy kivonjuk</strong>, a <strong>nevezőt változatlanul leírjuk</strong>:
            </p>
            <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800 text-center font-mono text-sm font-bold text-emerald-900 dark:text-emerald-200 mb-2">
              a/c + b/c = (a + b)/c
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-400">
              <strong>Példa:</strong> 3/7 + 2/7 = 5/7 &nbsp;|&nbsp; 5/9 - 8/9 = -3/9 = -1/3.
            </div>
          </TheoryCard>

          <TheoryCard
            title="Különböző nevezőjű törtek (Közös nevező)"
            badge="LKKT bővítés"
            variant="blue"
          >
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 mb-2">
              Különböző nevezők esetén először <strong>közös nevezőre (a nevezők legkisebb közös többszörösére, LKKT)</strong> bővítünk:
            </p>
            <div className="p-2.5 bg-blue-50 dark:bg-blue-950/40 rounded-xl border border-blue-200 dark:border-blue-800 text-center font-mono text-xs sm:text-sm font-bold text-blue-900 dark:text-blue-200 mb-2">
              2/3 + 3/5 = 10/15 + 9/15 = 19/15 = 1 és 4/15
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-400">
              <strong>Lépések:</strong> 1. LKKT megkeresése ⟹ 2. Bővítő szorzók meghatározása ⟹ 3. Művelet elvégzése ⟹ 4. Egyszerűsítés.
            </div>
          </TheoryCard>
        </div>

        <TheoryTrapBox
          title="Gyakori Hiba összeadásnál"
          trap="3/5 + 2/3 = (3+2)/(5+3) = 5/8 (a számlálók és nevezők külön összeadása hibás!)."
          correction="A nevezőket SOHA nem adjuk össze! Mindig közös nevezőre hozunk: 3/5 + 2/3 = 9/15 + 10/15 = 19/15!"
        />
      </TheorySection>

      {/* SECTION 3: Törtek szorzása */}
      <TheorySection
        number={3}
        title="Törtek szorzása és a keresztbe egyszerűsítés"
        icon={<Zap className="w-5 h-5 text-amber-600" />}
        badgeColor="amber"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard
            title="A szorzás szabálya"
            badge="Számláló × Számláló"
            variant="amber"
          >
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 mb-2">
              Törtet törttel úgy szorzunk, hogy a <strong>számlálót a számlálóval</strong>, a <strong>nevezőt a nevezővel</strong> szorozzuk:
            </p>
            <div className="p-2.5 bg-amber-50 dark:bg-amber-950/40 rounded-xl border border-amber-200 dark:border-amber-800 text-center font-mono text-sm font-bold text-amber-900 dark:text-amber-200 mb-2">
              (a/b) · (c/d) = (a · c) / (b · d)
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-400">
              <strong>Egész számmal szorzás:</strong> (a/b) · c = (a · c) / b (csak a számlálót szorozzuk!).
            </div>
          </TheoryCard>

          <TheoryCard
            title="Keresztbe egyszerűsítés szorzás előtt"
            badge="Gyorsító technika"
            variant="emerald"
          >
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 mb-2">
              Szorzás előtt célszerű bármelyik számlálót bármelyik nevezővel <strong>egyszerűsíteni</strong> a közös osztójukkal:
            </p>
            <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800 text-center font-mono text-xs sm:text-sm font-bold text-emerald-900 dark:text-emerald-200 mb-2">
              (4/9) · (3/8) = (1/3) · (1/2) = 1/6
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-400">
              4 és 8 egyszerűsödik 4-gyel (1 és 2), a 3 és 9 egyszerűsödik 3-mal (1 és 3).
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* SECTION 4: Reciprok és Osztás */}
      <TheorySection
        number={4}
        title="A reciprok fogalma és törttel való osztás"
        icon={<Divide className="w-5 h-5 text-rose-600" />}
        badgeColor="rose"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard
            title="A reciprok (reciprokérték) fogalma"
            badge="x · (1/x) = 1"
            variant="rose"
          >
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 mb-2">
              Két szám egymás <strong>reciproka</strong>, ha szorzatuk pontosan <strong>1</strong>.
            </p>
            <ul className="space-y-1 text-xs text-slate-700 dark:text-slate-300 font-mono">
              <li>• a/b tört reciproka: <strong>b/a</strong> (a, b ≠ 0). Pl.: 3/5 reciproka 5/3.</li>
              <li>• Egész szám (a) reciproka: <strong>1/a</strong>. Pl.: 4 reciproka 1/4.</li>
              <li>• Negatív számnál: -2/3 reciproka <strong>-3/2</strong> (az előjel megmarad!).</li>
              <li>• <strong>A 0-nak NINCS reciproka</strong>, mert 0-val nem oszthatunk!</li>
            </ul>
          </TheoryCard>

          <TheoryCard
            title="Törttel való osztás szabálya"
            badge="Szorzás a reciprokkal"
            variant="purple"
          >
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 mb-2">
              Törttel úgy osztunk, hogy az osztandót <strong>megszorozzuk az osztó reciprokával</strong>:
            </p>
            <div className="p-2.5 bg-purple-50 dark:bg-purple-950/40 rounded-xl border border-purple-200 dark:border-purple-800 text-center font-mono text-sm font-bold text-purple-900 dark:text-purple-200 mb-2">
              (a/b) : (c/d) = (a/b) · (d/c) = (a · d) / (b · c)
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-400">
              <strong>Példa:</strong> (2/3) : (4/5) = (2/3) · (5/4) = 10/12 = 5/6.
            </div>
          </TheoryCard>
        </div>

        <TheoryTable
          title="Összefoglaló: Műveletek racionális számokkal"
          columns={['Művelet', 'Szabály', 'Példa', 'Kulcslépés']}
          rows={[
            ['Összeadás (+)', 'Közös nevezőre hozás', '1/3 + 1/2 = 2/6 + 3/6 = 5/6', 'LKKT megkeresése'],
            ['Kivonás (-)', 'Közös nevezőre hozás', '3/4 - 1/6 = 9/12 - 2/12 = 7/12', 'Bővítés mindkét törtnél'],
            ['Szorzás (·)', 'Számláló × Számláló, Nevező × Nevező', '(2/5) · (3/4) = 6/20 = 3/10', 'Keresztbe egyszerűsítés'],
            ['Osztás (:)', 'Szorzás az osztó reciprokával', '(3/4) : (2/3) = (3/4) · (3/2) = 9/8', 'Osztó megfordítása'],
          ]}
        />
      </TheorySection>

      {/* SECTION 5: Interaktív Racionális Műveleti Labor */}
      <TheorySection
        number={5}
        title="Interaktív Racionális Műveleti Laboratórium"
        icon={<Calculator className="w-5 h-5 text-purple-600" />}
        badgeColor="purple"
      >
        <Card className="border-2 border-purple-200 dark:border-purple-850 bg-gradient-to-br from-purple-50/60 via-white to-indigo-50/40 dark:from-slate-900 dark:via-slate-850 dark:to-slate-900 shadow-md">
          <CardContent className="p-4 sm:p-6 space-y-6">
            <div className="text-center max-w-xl mx-auto">
              <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center justify-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-600" />
                Dinamikus Törtműveleti Kalkulátor & Levezető
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                Állítsd be a két tört számlálóját és nevezőjét, válassz műveletet, és figyeld a részletes levezetést!
              </p>
            </div>

            {/* Fraction Inputs and Operator Selection */}
            <div className="flex flex-wrap items-center justify-center gap-3 max-w-2xl mx-auto">
              {/* Fraction A */}
              <div className="bg-white dark:bg-slate-800 p-3 rounded-2xl border border-purple-200 dark:border-slate-700 shadow-xs flex flex-col items-center">
                <span className="text-[10px] font-bold text-purple-600 uppercase mb-1">1. Tört (A)</span>
                <input
                  type="number"
                  value={numA}
                  onChange={(e) => setNumA(parseInt(e.target.value) || 0)}
                  className="w-16 h-8 text-center font-bold font-mono border rounded-lg dark:bg-slate-900 dark:border-slate-700"
                  title="Számláló A"
                />
                <div className="w-16 h-0.5 bg-slate-400 dark:bg-slate-600 my-1" />
                <input
                  type="number"
                  value={denA}
                  onChange={(e) => setDenA(parseInt(e.target.value) || 1)}
                  className="w-16 h-8 text-center font-bold font-mono border rounded-lg dark:bg-slate-900 dark:border-slate-700"
                  title="Nevező A"
                />
              </div>

              {/* Operation Buttons */}
              <div className="flex flex-col gap-1">
                {(['+', '-', '*', '/'] as const).map((oper) => (
                  <Button
                    key={oper}
                    size="sm"
                    variant={op === oper ? 'default' : 'outline'}
                    onClick={() => setOp(oper)}
                    className={cn(
                      "w-9 h-8 text-sm font-black rounded-lg",
                      op === oper ? "bg-purple-600 text-white" : ""
                    )}
                  >
                    {oper === '*' ? '·' : oper === '/' ? ':' : oper}
                  </Button>
                ))}
              </div>

              {/* Fraction B */}
              <div className="bg-white dark:bg-slate-800 p-3 rounded-2xl border border-indigo-200 dark:border-slate-700 shadow-xs flex flex-col items-center">
                <span className="text-[10px] font-bold text-indigo-600 uppercase mb-1">2. Tört (B)</span>
                <input
                  type="number"
                  value={numB}
                  onChange={(e) => setNumB(parseInt(e.target.value) || 0)}
                  className="w-16 h-8 text-center font-bold font-mono border rounded-lg dark:bg-slate-900 dark:border-slate-700"
                  title="Számláló B"
                />
                <div className="w-16 h-0.5 bg-slate-400 dark:bg-slate-600 my-1" />
                <input
                  type="number"
                  value={denB}
                  onChange={(e) => setDenB(parseInt(e.target.value) || 1)}
                  className="w-16 h-8 text-center font-bold font-mono border rounded-lg dark:bg-slate-900 dark:border-slate-700"
                  title="Nevező B"
                />
              </div>

              <div className="text-xl font-black text-slate-400">=</div>

              {/* Result Box */}
              <div className="bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-purple-950/60 dark:to-indigo-950/60 p-3.5 rounded-2xl border-2 border-purple-300 dark:border-purple-700 shadow-sm flex flex-col items-center min-w-[110px]">
                <span className="text-[10px] font-black text-purple-700 dark:text-purple-300 uppercase mb-1">Eredmény</span>
                {'error' in res ? (
                  <span className="text-xs text-rose-600 font-bold">{res.error}</span>
                ) : (
                  <>
                    <div className="text-lg font-black font-mono text-purple-900 dark:text-purple-100">
                      {res.finalNum}
                    </div>
                    {res.finalDen !== 1 && (
                      <>
                        <div className="w-12 h-0.5 bg-purple-400 dark:bg-purple-500 my-0.5" />
                        <div className="text-lg font-black font-mono text-purple-900 dark:text-purple-100">
                          {res.finalDen}
                        </div>
                      </>
                    )}
                    <div className="text-[10px] text-slate-600 dark:text-slate-300 font-mono mt-1">
                      ≈ {res.decVal}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Quick Presets */}
            <div className="flex flex-wrap items-center justify-center gap-1.5">
              <span className="text-[11px] font-bold text-slate-400">Mintafeladatok:</span>
              {[
                { na: 2, da: 3, op: '+' as const, nb: 3, db: 4, label: '2/3 + 3/4' },
                { na: 5, da: 6, op: '-' as const, nb: 1, db: 4, label: '5/6 - 1/4' },
                { na: 4, da: 9, op: '*' as const, nb: 3, db: 8, label: '4/9 · 3/8' },
                { na: 2, da: 3, op: '/' as const, nb: 4, db: 5, label: '2/3 : 4/5' },
                { na: -3, da: 4, op: '+' as const, nb: 1, db: 2, label: '-3/4 + 1/2' },
              ].map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setNumA(preset.na);
                    setDenA(preset.da);
                    setOp(preset.op);
                    setNumB(preset.nb);
                    setDenB(preset.db);
                  }}
                  className="px-2 py-1 rounded-lg text-xs font-bold bg-purple-50 hover:bg-purple-100 dark:bg-purple-950/40 dark:hover:bg-purple-900/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800 transition-colors"
                >
                  {preset.label}
                </button>
              ))}
            </div>

            {/* Step-by-Step Breakdown Box */}
            {'stepsText' in res && (
              <div className="p-4 bg-white/90 dark:bg-slate-800/90 rounded-2xl border border-purple-100 dark:border-slate-700 text-xs sm:text-sm text-slate-800 dark:text-slate-200 space-y-1.5">
                <div className="font-bold text-purple-600 dark:text-purple-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  Lépésről lépésre levezetés:
                </div>
                <p className="leading-relaxed">{res.stepsText}</p>
                {!res.isSimp && (
                  <p className="text-emerald-600 dark:text-emerald-400 font-medium">
                    Egyszerűsítés LNKO={res.g}-val: {res.rawNum}/{res.rawDen} = {res.finalNum}/{res.finalDen}.
                  </p>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </TheorySection>
    </TheoryTemplate>
  );
};
