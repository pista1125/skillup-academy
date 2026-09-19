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
  Zap,
  Sliders,
  MoveRight,
  MoveLeft
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface DecimalMultiplicationTheoryProps {
  onBack?: () => void;
  onSwitchToQuiz?: () => void;
}

export function DecimalMultiplicationTheory({
  onBack,
  onSwitchToQuiz
}: DecimalMultiplicationTheoryProps) {
  // Workshop 1: Shifter Simulator (Multiplying by 10, 100, 1000)
  const [shiftBase, setShiftBase] = useState<string>('3,45');
  const [shiftMult, setShiftMult] = useState<number>(10);

  const parseNum = (str: string) => parseFloat(str.replace(',', '.')) || 0;
  const shiftResult = (parseNum(shiftBase) * shiftMult).toFixed(4).replace(/\.?0+$/, '').replace('.', ',');

  // Workshop 2: Decimal Multiplication Interactive Lab
  const [factorA, setFactorA] = useState<string>('2,4');
  const [factorB, setFactorB] = useState<string>('0,35');

  const cleanNumA = factorA.replace(',', '.');
  const cleanNumB = factorB.replace(',', '.');
  const valA = parseFloat(cleanNumA) || 0;
  const valB = parseFloat(cleanNumB) || 0;

  const decsA = factorA.includes(',') ? factorA.split(',')[1].length : factorA.includes('.') ? factorA.split('.')[1].length : 0;
  const decsB = factorB.includes(',') ? factorB.split(',')[1].length : factorB.includes('.') ? factorB.split('.')[1].length : 0;
  const totalDecs = decsA + decsB;

  const intA = Math.round(valA * Math.pow(10, decsA));
  const intB = Math.round(valB * Math.pow(10, decsB));
  const intProduct = intA * intB;
  const finalProduct = (valA * valB).toFixed(Math.max(totalDecs, 1)).replace(/\.?0+$/, '').replace('.', ',');

  // Workshop 3: Multiplier with 0.1, 0.01, 0.001
  const [smallBase, setSmallBase] = useState<string>('450');
  const [smallFactor, setSmallFactor] = useState<number>(0.1);

  const smallResult = (parseNum(smallBase) * smallFactor).toFixed(4).replace(/\.?0+$/, '').replace('.', ',');

  const sections: TheorySection[] = [
    // 1. SZORZÁS 10-ZEL, 100-ZAL, 1000-REL
    {
      id: 'mult-10-100-1000',
      title: '1. Szorzás 10-zel, 100-zal, 1000-rel',
      icon: <MoveRight className="w-5 h-5 text-amber-500" />,
      content: (
        <div className="space-y-6 text-slate-700 dark:text-slate-300 leading-relaxed">
          <p>
            Amikor egy tizedestörtet 10-zel, 100-zal, 1000-rel szorzunk, a szám minden helyiértéke 10-szer, 100-szor, 1000-szer nagyobb lesz.
            Ez a gyakorlatban azt jelenti, hogy a <strong>tizedesvesszőt annyi hellyel léptetjük JOBBRA</strong>, ahány nulla van a szorzóban:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center text-xs sm:text-sm">
            <div className="p-3 bg-amber-50 dark:bg-amber-950/30 rounded-xl border border-amber-200 dark:border-amber-800 space-y-1">
              <span className="font-bold text-amber-800 dark:text-amber-300 block">· 10 (1 nulla)</span>
              <span className="text-slate-600 dark:text-slate-400 block text-xs">1 hellyel jobbra</span>
              <div className="font-mono font-bold text-amber-600 dark:text-amber-400 text-base">3,45 · 10 = 34,5</div>
            </div>
            <div className="p-3 bg-amber-50 dark:bg-amber-950/30 rounded-xl border border-amber-200 dark:border-amber-800 space-y-1">
              <span className="font-bold text-amber-800 dark:text-amber-300 block">· 100 (2 nulla)</span>
              <span className="text-slate-600 dark:text-slate-400 block text-xs">2 hellyel jobbra</span>
              <div className="font-mono font-bold text-amber-600 dark:text-amber-400 text-base">3,45 · 100 = 345</div>
            </div>
            <div className="p-3 bg-amber-50 dark:bg-amber-950/30 rounded-xl border border-amber-200 dark:border-amber-800 space-y-1">
              <span className="font-bold text-amber-800 dark:text-amber-300 block">· 1000 (3 nulla)</span>
              <span className="text-slate-600 dark:text-slate-400 block text-xs">3 hellyel jobbra (0-val pótolva)</span>
              <div className="font-mono font-bold text-amber-600 dark:text-amber-400 text-base">3,45 · 1000 = 3450</div>
            </div>
          </div>

          {/* Workshop 1: Shifter Simulator */}
          <Card className="border-2 border-amber-200 dark:border-amber-800/60 shadow-md">
            <CardContent className="p-5 space-y-4">
              <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-500" />
                Interaktív Vessző-Eltoló Labor
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-500">Írj be egy tizedestörtet:</label>
                  <input
                    type="text"
                    value={shiftBase}
                    onChange={(e) => setShiftBase(e.target.value)}
                    className="w-full p-2.5 text-center text-lg font-bold border rounded-xl bg-white dark:bg-slate-900 font-mono"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-500">Válassz szorzót:</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[10, 100, 1000].map((m) => (
                      <button
                        key={m}
                        onClick={() => setShiftMult(m)}
                        className={cn(
                          "p-2 rounded-xl text-xs font-bold border transition-all",
                          shiftMult === m
                            ? "bg-amber-500 text-white border-amber-500 shadow"
                            : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200"
                        )}
                      >
                        · {m}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-4 bg-amber-50 dark:bg-amber-950/40 rounded-xl border border-amber-200 dark:border-amber-800 text-center space-y-1">
                <span className="text-xs text-amber-700 dark:text-amber-300 font-semibold block">Szorzás eredménye:</span>
                <span className="text-3xl font-extrabold text-amber-800 dark:text-amber-200 font-mono">
                  {shiftBase} · {shiftMult} = {shiftResult}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 block">
                  A tizedesvessző {shiftMult === 10 ? '1' : shiftMult === 100 ? '2' : '3'} hellyel tolódott jobbra!
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    },

    // 2. TIZEDESTÖRT SZORZÁSA EGÉSZ SZÁMMAL
    {
      id: 'mult-whole',
      title: '2. Tizedestört szorzása egész számmal',
      icon: <Calculator className="w-5 h-5 text-indigo-500" />,
      content: (
        <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed">
          <p>
            Tizedestörtet egész számmal úgy szorzunk, hogy:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-sm bg-indigo-50/70 dark:bg-indigo-950/20 p-4 rounded-2xl border border-indigo-200 dark:border-indigo-800/50">
            <li><strong>Figyelmen kívül hagyjuk a tizedesvesszőt</strong>, és elvégezzük a szorzást, mintha egész számok lennének.</li>
            <li>A szorzat végéről <strong>pontosan annyi tizedesjegyet választunk le a vesszővel</strong>, ahány a tizedestört tényezőben volt.</li>
          </ol>

          <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2 text-center">
            <span className="text-xs text-slate-500 uppercase font-bold tracking-wider">Példa</span>
            <div className="text-lg font-bold font-mono text-indigo-600 dark:text-indigo-400">
              <MathText>1,4 · 3 = 4,2</MathText>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Mivel <MathText>14 · 3 = 42</MathText>, és az 1,4-ben 1 tizedesjegy volt, a 42-ből 1 tizedesjegyet leválasztva kapjuk: <strong>4,2</strong>.
            </p>
          </div>
        </div>
      )
    },

    // 3. KÉT TIZEDESTÖRT SZORZÁSA - AZ ARANYSZABÁLY
    {
      id: 'mult-decimals',
      title: '3. Két tizedestört szorzása (Az Aranyszabály)',
      icon: <Sparkles className="w-5 h-5 text-violet-500" />,
      content: (
        <div className="space-y-6 text-slate-700 dark:text-slate-300 leading-relaxed">
          <div className="p-4 bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-950/30 dark:to-purple-950/30 rounded-2xl border-2 border-violet-200 dark:border-violet-800 space-y-3">
            <h4 className="font-extrabold text-violet-900 dark:text-violet-200 flex items-center gap-2 text-base">
              <CheckCircle2 className="w-5 h-5 text-violet-600" />
              A Tizedestört-Szorzás Aranyszabálya 3 Lépésben:
            </h4>
            <div className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-violet-600 text-white font-bold text-xs flex items-center justify-center shrink-0">1</span>
                <span><strong>Szorzás vessző nélkül:</strong> Szorozd össze a számokat úgy, mintha nem lennének tizedesvesszők!</span>
              </div>
              <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-violet-600 text-white font-bold text-xs flex items-center justify-center shrink-0">2</span>
                <span><strong>Tizedesjegyek összeadása:</strong> Számold meg mindkét tényező tizedesjegyeit, és <strong>add össze őket</strong> (<MathText>n_1 + n_2</MathText>)!</span>
              </div>
              <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border flex items-start gap-2">
                <span className="w-5 h-5 rounded-full bg-violet-600 text-white font-bold text-xs flex items-center justify-center shrink-0">3</span>
                <span><strong>Vessző kitétele:</strong> A szorzat végéről (jobbról balra) vágj le pontosan ennyi tizedesjegyet! Ha kell, balról pótolj nullákat!</span>
              </div>
            </div>
          </div>

          {/* Workshop 2: Multiplier Interactive Lab */}
          <Card className="border-2 border-violet-200 dark:border-violet-800/60 shadow-md">
            <CardContent className="p-5 space-y-4">
              <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                <Calculator className="w-5 h-5 text-violet-600" />
                Interaktív Tizedestört-Szorzó Műhely
              </span>

              <div className="flex flex-wrap items-center justify-center gap-3">
                <div className="text-center">
                  <label className="text-xs text-slate-500 block">1. tényező ({decsA} tizedesjegy)</label>
                  <input
                    type="text"
                    value={factorA}
                    onChange={(e) => setFactorA(e.target.value)}
                    className="w-24 p-2 text-center text-lg font-bold border rounded-xl bg-white dark:bg-slate-900 font-mono"
                  />
                </div>
                <span className="text-2xl font-bold text-slate-400 mt-4">·</span>
                <div className="text-center">
                  <label className="text-xs text-slate-500 block">2. tényező ({decsB} tizedesjegy)</label>
                  <input
                    type="text"
                    value={factorB}
                    onChange={(e) => setFactorB(e.target.value)}
                    className="w-24 p-2 text-center text-lg font-bold border rounded-xl bg-white dark:bg-slate-900 font-mono"
                  />
                </div>
              </div>

              <div className="p-4 bg-violet-50 dark:bg-violet-950/40 rounded-xl border border-violet-200 dark:border-violet-800 space-y-2">
                <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 space-y-1">
                  <div>1. lépés: Vessző nélkül: <span className="font-mono font-bold">{intA} · {intB} = {intProduct}</span></div>
                  <div>2. lépés: Összes tizedesjegy: <span className="font-mono font-bold text-violet-600 dark:text-violet-400">{decsA} + {decsB} = {totalDecs} tizedesjegy</span></div>
                </div>
                <div className="pt-2 border-t text-center">
                  <span className="text-xs text-violet-700 dark:text-violet-300 font-semibold block">Végeredmény:</span>
                  <span className="text-3xl font-extrabold text-violet-800 dark:text-violet-200 font-mono">
                    {factorA} · {factorB} = {finalProduct}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    },

    // 4. SZORZÁS 0,1-GYEL, 0,01-GYEL, 0,001-GYEL
    {
      id: 'mult-decimals-sub1',
      title: '4. Szorzás 0,1-gyel, 0,01-gyel, 0,001-gyel',
      icon: <MoveLeft className="w-5 h-5 text-teal-500" />,
      content: (
        <div className="space-y-6 text-slate-700 dark:text-slate-300 leading-relaxed">
          <p>
            Mivel <MathText>0,1 = 1/10</MathText>, <MathText>0,01 = 1/100</MathText> és <MathText>0,001 = 1/1000</MathText>, a velük való szorzás megegyezik a 10-zel, 100-zal, 1000-rel való <strong>osztással</strong>!
            Ezért a <strong>tizedesvessző BALRA lép</strong>:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center text-xs sm:text-sm">
            <div className="p-3 bg-teal-50 dark:bg-teal-950/30 rounded-xl border border-teal-200 dark:border-teal-800 space-y-1">
              <span className="font-bold text-teal-800 dark:text-teal-300 block">· 0,1 (= : 10)</span>
              <span className="text-slate-600 dark:text-slate-400 block text-xs">1 hellyel balra</span>
              <div className="font-mono font-bold text-teal-600 dark:text-teal-400 text-base">45 · 0,1 = 4,5</div>
            </div>
            <div className="p-3 bg-teal-50 dark:bg-teal-950/30 rounded-xl border border-teal-200 dark:border-teal-800 space-y-1">
              <span className="font-bold text-teal-800 dark:text-teal-300 block">· 0,01 (= : 100)</span>
              <span className="text-slate-600 dark:text-slate-400 block text-xs">2 hellyel balra</span>
              <div className="font-mono font-bold text-teal-600 dark:text-teal-400 text-base">45 · 0,01 = 0,45</div>
            </div>
            <div className="p-3 bg-teal-50 dark:bg-teal-950/30 rounded-xl border border-teal-200 dark:border-teal-800 space-y-1">
              <span className="font-bold text-teal-800 dark:text-teal-300 block">· 0,001 (= : 1000)</span>
              <span className="text-slate-600 dark:text-slate-400 block text-xs">3 hellyel balra</span>
              <div className="font-mono font-bold text-teal-600 dark:text-teal-400 text-base">45 · 0,001 = 0,045</div>
            </div>
          </div>

          {/* Workshop 3 */}
          <Card className="border-2 border-teal-200 dark:border-teal-800/60 shadow-md">
            <CardContent className="p-5 space-y-4">
              <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                <MoveLeft className="w-5 h-5 text-teal-600" />
                Interaktív Balra-Léptető Szimulátor
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-500">Szám:</label>
                  <input
                    type="text"
                    value={smallBase}
                    onChange={(e) => setSmallBase(e.target.value)}
                    className="w-full p-2.5 text-center text-lg font-bold border rounded-xl bg-white dark:bg-slate-900 font-mono"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-500">Szorzó:</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[0.1, 0.01, 0.001].map((f) => (
                      <button
                        key={f}
                        onClick={() => setSmallFactor(f)}
                        className={cn(
                          "p-2 rounded-xl text-xs font-bold border transition-all",
                          smallFactor === f
                            ? "bg-teal-600 text-white border-teal-600 shadow"
                            : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200"
                        )}
                      >
                        · {f}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-4 bg-teal-50 dark:bg-teal-950/40 rounded-xl border border-teal-200 dark:border-teal-800 text-center space-y-1">
                <span className="text-xs text-teal-700 dark:text-teal-300 font-semibold block">Eredmény:</span>
                <span className="text-3xl font-extrabold text-teal-800 dark:text-teal-200 font-mono">
                  {smallBase} · {smallFactor} = {smallResult}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    },

    // 5. GYAKORI CSAPDÁK ÉS TIPPEK
    {
      id: 'traps',
      title: '5. Gyakori csapdák és jó tanácsok',
      icon: <Flame className="w-5 h-5 text-rose-500" />,
      content: (
        <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-rose-50/70 dark:bg-rose-950/20 rounded-2xl border border-rose-200 dark:border-rose-800/50 space-y-2">
              <h4 className="font-bold text-rose-800 dark:text-rose-300 flex items-center gap-2">
                <X className="w-4 h-4 text-rose-600" />
                Tipikus hibák
              </h4>
              <ul className="text-xs sm:text-sm space-y-1.5 list-disc list-inside text-rose-900 dark:text-rose-200">
                <li><MathText>0,2 · 0,3 = 0,6</MathText> ❌ (Hibás! A helyes: <MathText>0,06</MathText>, mert 1 + 1 = 2 tizedesjegy kell!).</li>
                <li>Záró nulla elhagyása a vessző kitétele előtt (<MathText>0,5 · 0,4 = 0,20 = 0,2</MathText>).</li>
                <li>Azt gondolni, hogy a szorzás mindig növeli a számot (<MathText>8 · 0,5 = 4 &lt; 8</MathText>!).</li>
              </ul>
            </div>

            <div className="p-4 bg-emerald-50/70 dark:bg-emerald-950/20 rounded-2xl border border-emerald-200 dark:border-emerald-800/50 space-y-2">
              <h4 className="font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Biztonsági ellenőrzések
              </h4>
              <ul className="text-xs sm:text-sm space-y-1.5 list-disc list-inside text-emerald-900 dark:text-emerald-200">
                <li><strong>Becslés:</strong> pl. <MathText>4,9 · 2,1 \approx 5 · 2 = 10</MathText>, így a 10,29 ésszerű eredmény!</li>
                <li>Először tedd ki a tizedesvesszőt, és CSAK utána hagyd el a felesleges záró nullákat!</li>
                <li>Ha 1-nél kisebb pozitív számmal szorozzuk a számot, az eredmény kisebb lesz az eredetinél.</li>
              </ul>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <TheoryTemplate
      title="Szorzás tizedes törttel"
      subtitle="Szorzás 10-zel, 100-zal, tizedes tört szorzása egész számmal és tizedes törttel, tizedesjegyek számlálása és becslés."
      badgeText="⚡ 6. Osztály • II. Törtek"
      quickRule={{
        label: 'Szorzási szabály',
        formula: 'Tizedesjegyek száma: n₁ + n₂ | · 10^k ➔ k hely jobbra'
      }}
      themeColor="violet"
      sections={sections}
      topicId="g6-decimal-multiplication-theory"
      pdfFilename="6_osztaly_szorzas_tizedes_torttel_tananyag.pdf"
      onBack={onBack}
      onSwitchToQuiz={onSwitchToQuiz}
    />
  );
}

export default DecimalMultiplicationTheory;
