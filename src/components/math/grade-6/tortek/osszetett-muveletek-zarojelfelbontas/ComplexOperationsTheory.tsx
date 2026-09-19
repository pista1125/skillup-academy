import React, { useState } from 'react';
import { TheoryTemplate, TheorySection } from '../TheoryTemplate';
import { MathText } from '@/components/math/shared/MathText';
import { Card, CardContent } from '@/components/ui/card';
import {
  Layers,
  ArrowRightLeft,
  Calculator,
  CheckCircle2,
  Sparkles,
  Lightbulb,
  X,
  Target,
  Flame,
  Divide,
  MoveRight,
  Zap,
  Sliders
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ComplexOperationsTheoryProps {
  onBack?: () => void;
  onSwitchToQuiz?: () => void;
}

export function ComplexOperationsTheory({
  onBack,
  onSwitchToQuiz
}: ComplexOperationsTheoryProps) {
  // Workshop 1: Order of operations step simulator
  const [w1A, setW1A] = useState<number>(10);
  const [w1B, setW1B] = useState<number>(2);
  const [w1C, setW1C] = useState<number>(3);
  const [w1WithBrackets, setW1WithBrackets] = useState<boolean>(false);

  const w1Result = w1WithBrackets
    ? (w1A - w1B) * w1C
    : w1A - (w1B * w1C);

  // Workshop 2: Sign-flip bracket simulator
  const [w2Sign, setW2Sign] = useState<'+' | '-'>('-');
  const [w2TermA, setW2TermA] = useState<string>('a');
  const [w2TermB, setW2TermB] = useState<string>('b');
  const [w2Op, setW2Op] = useState<'+' | '-'>('-');

  // Expanded result string
  const w2Expanded = w2Sign === '+'
    ? `${w2TermA} ${w2Op} ${w2TermB}`
    : `${w2Op === '+' ? `-${w2TermA} - ${w2TermB}` : `-${w2TermA} + ${w2TermB}`}`;

  // Workshop 3: Strategy selector (Fraction vs Decimal)
  const [fracNum, setFracNum] = useState<number>(1);
  const [fracDen, setFracDen] = useState<number>(4);
  const [decVal, setDecVal] = useState<string>('0,5');

  const isFiniteDecimal = (d: number): boolean => {
    let temp = d;
    while (temp % 2 === 0) temp /= 2;
    while (temp % 5 === 0) temp /= 5;
    return temp === 1;
  };

  const fracAsDec = isFiniteDecimal(fracDen)
    ? (fracNum / fracDen).toString().replace('.', ',')
    : null;

  const sections: TheorySection[] = [
    // 1. MŰVELETI SORREND ALAPSZABÁLYA
    {
      id: 'order-of-operations',
      title: '1. A műveleti sorrend alapszabálya (Prioritási piramis)',
      icon: <Layers className="w-5 h-5 text-cyan-500" />,
      content: (
        <div className="space-y-6 text-slate-700 dark:text-slate-300 leading-relaxed">
          <p>
            Összetett számításoknál, ahol többféle művelet és zárójel is szerepel, szigorú <strong>prioritási sorrendet</strong> kell követnünk:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-center text-xs sm:text-sm">
            <div className="p-4 bg-purple-50 dark:bg-purple-950/30 rounded-2xl border-2 border-purple-200 dark:border-purple-800 space-y-1.5">
              <div className="w-7 h-7 mx-auto rounded-full bg-purple-600 text-white font-black flex items-center justify-center text-xs">
                1
              </div>
              <span className="font-extrabold text-purple-900 dark:text-purple-300 block">Zárójelek</span>
              <span className="text-slate-600 dark:text-slate-400 block text-xs">Mindig belülről kifelé haladva: ( ), majd [ ], végül {'{ }'}</span>
              <div className="font-mono font-bold text-purple-700 dark:text-purple-400 text-sm">(2 + 3) · 4 = 5 · 4 = 20</div>
            </div>

            <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-2xl border-2 border-blue-200 dark:border-blue-800 space-y-1.5">
              <div className="w-7 h-7 mx-auto rounded-full bg-blue-600 text-white font-black flex items-center justify-center text-xs">
                2
              </div>
              <span className="font-extrabold text-blue-900 dark:text-blue-300 block">Szorzás és Osztás</span>
              <span className="text-slate-600 dark:text-slate-400 block text-xs">Magasabb rendű műveletek (balról jobbra haladva)</span>
              <div className="font-mono font-bold text-blue-700 dark:text-blue-400 text-sm">10 - 2 · 3 = 10 - 6 = 4</div>
            </div>

            <div className="p-4 bg-emerald-50 dark:bg-emerald-950/30 rounded-2xl border-2 border-emerald-200 dark:border-emerald-800 space-y-1.5">
              <div className="w-7 h-7 mx-auto rounded-full bg-emerald-600 text-white font-black flex items-center justify-center text-xs">
                3
              </div>
              <span className="font-extrabold text-emerald-900 dark:text-emerald-300 block">Összeadás és Kivonás</span>
              <span className="text-slate-600 dark:text-slate-400 block text-xs">Alacsonyabb rendű műveletek (balról jobbra haladva)</span>
              <div className="font-mono font-bold text-emerald-700 dark:text-emerald-400 text-sm">15 - 5 + 2 = 10 + 2 = 12</div>
            </div>
          </div>

          {/* Workshop 1 */}
          <Card className="border-2 border-cyan-200 dark:border-cyan-800/60 shadow-md">
            <CardContent className="p-5 space-y-4">
              <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                <Calculator className="w-5 h-5 text-cyan-600" />
                Interaktív Műveleti Sorrend Szimulátor
              </span>

              <div className="flex flex-wrap items-center justify-center gap-3">
                <div className="flex items-center gap-1">
                  {w1WithBrackets && <span className="text-2xl font-bold text-purple-600 font-mono">(</span>}
                  <input
                    type="number"
                    value={w1A}
                    onChange={(e) => setW1A(parseInt(e.target.value) || 0)}
                    className="w-16 p-2 text-center text-base font-bold border rounded-xl bg-white dark:bg-slate-900 font-mono"
                  />
                  <span className="text-xl font-bold text-slate-400 px-1">-</span>
                  <input
                    type="number"
                    value={w1B}
                    onChange={(e) => setW1B(parseInt(e.target.value) || 0)}
                    className="w-16 p-2 text-center text-base font-bold border rounded-xl bg-white dark:bg-slate-900 font-mono"
                  />
                  {w1WithBrackets && <span className="text-2xl font-bold text-purple-600 font-mono">)</span>}
                  <span className="text-xl font-bold text-slate-400 px-1">·</span>
                  <input
                    type="number"
                    value={w1C}
                    onChange={(e) => setW1C(parseInt(e.target.value) || 0)}
                    className="w-16 p-2 text-center text-base font-bold border rounded-xl bg-white dark:bg-slate-900 font-mono"
                  />
                </div>

                <button
                  onClick={() => setW1WithBrackets(!w1WithBrackets)}
                  className={cn(
                    "px-3 py-2 rounded-xl text-xs font-bold border transition-all",
                    w1WithBrackets
                      ? "bg-purple-600 text-white border-purple-600 shadow"
                      : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200"
                  )}
                >
                  {w1WithBrackets ? 'Zárójel: BEKAPCSOLVA ( )' : 'Zárójel: KIKAPCSOLVA'}
                </button>
              </div>

              <div className="p-4 bg-cyan-50 dark:bg-cyan-950/40 rounded-xl border border-cyan-200 dark:border-cyan-800 text-center space-y-1">
                <div className="text-xs text-cyan-700 dark:text-cyan-300 font-semibold">Lépésről lépésre kiértékelés:</div>
                <div className="font-mono text-xs text-slate-600 dark:text-slate-400">
                  {w1WithBrackets
                    ? `1. Zárójel elvégzése: (${w1A} - ${w1B}) = ${w1A - w1B} ➔ 2. Szorzás: ${w1A - w1B} · ${w1C}`
                    : `1. Szorzás előbb: ${w1B} · ${w1C} = ${w1B * w1C} ➔ 2. Kivonás: ${w1A} - ${w1B * w1C}`}
                </div>
                <div className="text-2xl font-extrabold text-cyan-800 dark:text-cyan-200 font-mono pt-1">
                  Eredmény = {w1Result}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    },

    // 2. ZÁRÓJELFELBONTÁSI SZABÁLYOK
    {
      id: 'bracket-expansion',
      title: '2. Zárójelfelbontási szabályok (Előjelek viselkedése)',
      icon: <Sparkles className="w-5 h-5 text-indigo-500" />,
      content: (
        <div className="space-y-6 text-slate-700 dark:text-slate-300 leading-relaxed">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-emerald-50/70 dark:bg-emerald-950/20 rounded-2xl border border-emerald-200 dark:border-emerald-800/50 space-y-2">
              <span className="font-bold text-emerald-900 dark:text-emerald-300 flex items-center gap-1.5 text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                1. Ha a zárójel előtt PLUSZ (+) jel áll:
              </span>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                A zárójel egyszerűen elhagyható, a benne lévő tagok előjele <strong>változatlan marad</strong>:
              </p>
              <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl font-mono text-center font-bold text-emerald-700 dark:text-emerald-300 border text-xs sm:text-sm">
                +(a - b) = a - b
              </div>
              <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl font-mono text-center text-xs border">
                5 + (3/4 - 1/2) = 5 + 3/4 - 1/2
              </div>
            </div>

            <div className="p-4 bg-rose-50/70 dark:bg-rose-950/20 rounded-2xl border border-rose-200 dark:border-rose-800/50 space-y-2">
              <span className="font-bold text-rose-900 dark:text-rose-300 flex items-center gap-1.5 text-sm">
                <X className="w-4 h-4 text-rose-600" />
                2. Ha a zárójel előtt MÍNUSZ (-) jel áll:
              </span>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                A zárójel elhagyásakor a benne lévő <strong>MINDEN tag előjele az ellentétére vált</strong>:
              </p>
              <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl font-mono text-center font-bold text-rose-700 dark:text-rose-300 border text-xs sm:text-sm">
                -(a - b) = -a + b  |  -(a + b) = -a - b
              </div>
              <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl font-mono text-center text-xs border">
                10 - (4 - 1,5) = 10 - 4 + 1,5 = 7,5
              </div>
            </div>
          </div>

          {/* Workshop 2 */}
          <Card className="border-2 border-indigo-200 dark:border-indigo-800/60 shadow-md">
            <CardContent className="p-5 space-y-4">
              <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                <ArrowRightLeft className="w-5 h-5 text-indigo-500" />
                Interaktív Zárójelfelbontó Labor
              </span>

              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={() => setW2Sign(w2Sign === '+' ? '-' : '+')}
                  className={cn(
                    "w-12 h-10 rounded-xl text-xl font-mono font-black border transition-all",
                    w2Sign === '+'
                      ? "bg-emerald-600 text-white border-emerald-600"
                      : "bg-rose-600 text-white border-rose-600"
                  )}
                >
                  {w2Sign}
                </button>

                <div className="flex items-center gap-1 font-mono text-lg font-bold">
                  <span>(</span>
                  <input
                    type="text"
                    value={w2TermA}
                    onChange={(e) => setW2TermA(e.target.value)}
                    className="w-14 p-1 text-center border rounded-lg bg-white dark:bg-slate-900"
                  />
                  <button
                    onClick={() => setW2Op(w2Op === '+' ? '-' : '+')}
                    className="px-2 py-1 rounded-lg border bg-slate-100 dark:bg-slate-800 font-bold"
                  >
                    {w2Op}
                  </button>
                  <input
                    type="text"
                    value={w2TermB}
                    onChange={(e) => setW2TermB(e.target.value)}
                    className="w-14 p-1 text-center border rounded-lg bg-white dark:bg-slate-900"
                  />
                  <span>)</span>
                </div>
              </div>

              <div className="p-4 bg-indigo-50 dark:bg-indigo-950/40 rounded-xl border border-indigo-200 dark:border-indigo-800 text-center space-y-1">
                <span className="text-xs text-indigo-700 dark:text-indigo-300 font-semibold block">Felbontott alak:</span>
                <span className="text-2xl font-extrabold text-indigo-800 dark:text-indigo-200 font-mono">
                  {w2Sign}({w2TermA} {w2Op} {w2TermB}) = {w2Expanded}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    },

    // 3. VEGYES KIFEJEZÉSEK: TÖRTEK ÉS TIZEDES TÖRTEK EGYÜTT
    {
      id: 'mixed-expressions',
      title: '3. Vegyes kifejezések: Közönséges tört és tizedes tört együtt',
      icon: <Target className="w-5 h-5 text-teal-500" />,
      content: (
        <div className="space-y-6 text-slate-700 dark:text-slate-300 leading-relaxed">
          <p>
            Gyakran találkozunk olyan feladatokkal, amelyekben <strong>közönséges tört és tizedes tört is egyszerre</strong> szerepel. Ilyenkor egységes alakra kell hozni a számokat:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
            <div className="p-4 bg-teal-50 dark:bg-teal-950/30 rounded-2xl border border-teal-200 dark:border-teal-800 space-y-1.5">
              <span className="font-bold text-teal-800 dark:text-teal-300 block">1. Stratégia: Számolás tizedestörtként</span>
              <p className="text-slate-600 dark:text-slate-400">
                Akkor érdemes használni, ha a tört <strong>véges tizedes tört</strong> (a nevező prímtényezői csak 2 és/vagy 5):
              </p>
              <div className="font-mono text-teal-700 dark:text-teal-300 font-bold">
                1/2 = 0,5  |  1/4 = 0,25  |  3/5 = 0,6
              </div>
              <div className="font-mono text-xs text-slate-700 dark:text-slate-300 pt-1">
                Példa: 1/4 + 0,3 = 0,25 + 0,3 = 0,55
              </div>
            </div>

            <div className="p-4 bg-amber-50 dark:bg-amber-950/30 rounded-2xl border border-amber-200 dark:border-amber-800 space-y-1.5">
              <span className="font-bold text-amber-800 dark:text-amber-300 block">2. Stratégia: Számolás közönséges törtként</span>
              <p className="text-slate-600 dark:text-slate-400">
                <strong>Kötelező</strong>, ha a tört végtelen szakaszos tizedestört (pl. 1/3, 2/3, 1/6, 1/7):
              </p>
              <div className="font-mono text-amber-700 dark:text-amber-300 font-bold">
                1/3 = 0,333... (nem kerekítünk menet közben!)
              </div>
              <div className="font-mono text-xs text-slate-700 dark:text-slate-300 pt-1">
                Példa: 1/3 + 0,5 = 1/3 + 1/2 = 2/6 + 3/6 = 5/6
              </div>
            </div>
          </div>
        </div>
      )
    },

    // 4. EMELETES ÉS TÖBBSZÖRÖS ZÁRÓJELEK
    {
      id: 'nested-brackets',
      title: '4. Emeletes és többszörös zárójelek levezetése',
      icon: <Zap className="w-5 h-5 text-violet-500" />,
      content: (
        <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed">
          <p>
            Többszörös zárójeleknél mindig a <strong>legbelső kerek zárójeltől ( )</strong> indulunk a <strong>külső szögletes zárójel [ ]</strong> felé:
          </p>

          <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border space-y-3">
            <span className="font-bold text-violet-700 dark:text-violet-300 text-sm block">
              Mintapélda lépésről lépésre:
            </span>
            <div className="font-mono text-sm bg-slate-50 dark:bg-slate-800/80 p-3 rounded-xl space-y-1.5 border">
              <div>Kifejezés: <strong className="text-violet-600 dark:text-violet-400">20 - [ 3 · (4 - 1,5) + 2 ]</strong></div>
              <div>1. Belső kerek zárójel: <MathText>(4 - 1,5) = 2,5</MathText></div>
              <div>2. Szögletes zárójelen belüli szorzás: <MathText>3 · 2,5 = 7,5</MathText></div>
              <div>3. Szögletes zárójel befejezése: <MathText>7,5 + 2 = 9,5</MathText></div>
              <div>4. Végső kivonás: <MathText>20 - 9,5 = \mathbf{10,5}</MathText></div>
            </div>
          </div>
        </div>
      )
    },

    // 5. GYAKORI CSAPDÁK ÉS ELLENŐRZÉS
    {
      id: 'traps',
      title: '5. Gyakori csapdák és biztonsági ellenőrzések',
      icon: <Flame className="w-5 h-5 text-rose-500" />,
      content: (
        <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-rose-50/70 dark:bg-rose-950/20 rounded-2xl border border-rose-200 dark:border-rose-800/50 space-y-2">
              <h4 className="font-bold text-rose-800 dark:text-rose-300 flex items-center gap-2">
                <X className="w-4 h-4 text-rose-600" />
                Gyakori hibák
              </h4>
              <ul className="text-xs sm:text-sm space-y-1.5 list-disc list-inside text-rose-900 dark:text-rose-200">
                <li>Összeadás elvégzése a szorzás előtt: <MathText>2 + 3 · 4 = 14</MathText> és <strong>nem 20</strong>!</li>
                <li>Zárójel előtti mínusznál csak az első tag előjelének megváltoztatása: <MathText>-(a - b) = -a + b</MathText>.</li>
                <li>Végtelen szakaszos tört kerekítése a számolás közben (<MathText>1/3 \ne 0,33</MathText>!).</li>
              </ul>
            </div>

            <div className="p-4 bg-emerald-50/70 dark:bg-emerald-950/20 rounded-2xl border border-emerald-200 dark:border-emerald-800/50 space-y-2">
              <h4 className="font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Biztonsági ellenőrzések
              </h4>
              <ul className="text-xs sm:text-sm space-y-1.5 list-disc list-inside text-emerald-900 dark:text-emerald-200">
                <li>Mindig keresd meg a zárójeleket legelőször!</li>
                <li>Jelöld be ceruzával a szorzásokat és osztásokat a kifejezésben!</li>
                <li>Végtelen szakaszos törteknél mindig válts át közönséges tört alakra!</li>
              </ul>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <TheoryTemplate
      title="Összetett műveletek, zárójelfelbontás"
      subtitle="Műveleti sorrend törtekkel és tizedes törtekkel, zárójelfelbontási szabályok, előjelek és többszörös zárójelek."
      badgeText="📐 6. Osztály • II. Törtek"
      quickRule={{
        label: 'Műveleti sorrend & Zárójelek',
        formula: '( ) ➔ · , : ➔ + , - | -(a - b) = -a + b'
      }}
      themeColor="cyan"
      sections={sections}
      topicId="g6-complex-operations-theory"
      pdfFilename="6_osztaly_osszetett_muveletek_zarojelfelbontas_tananyag.pdf"
      onBack={onBack}
      onSwitchToQuiz={onSwitchToQuiz}
    />
  );
}

export default ComplexOperationsTheory;
