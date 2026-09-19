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
  MoveLeft,
  MoveRight,
  RefreshCw
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface DecimalDivisionTheoryProps {
  onBack?: () => void;
  onSwitchToQuiz?: () => void;
}

export function DecimalDivisionTheory({
  onBack,
  onSwitchToQuiz
}: DecimalDivisionTheoryProps) {
  // Workshop 1: Division by 10, 100, 1000
  const [divBase, setDivBase] = useState<string>('34,5');
  const [divDivisor, setDivDivisor] = useState<number>(10);

  const parseNum = (str: string) => parseFloat(str.replace(',', '.')) || 0;
  const divResult = (parseNum(divBase) / divDivisor).toFixed(4).replace(/\.?0+$/, '').replace('.', ',');

  // Workshop 2: Decimal Divisor Expansion Lab
  const [dividend, setDividend] = useState<string>('4,8');
  const [divisor, setDivisor] = useState<string>('0,6');

  const valDividend = parseNum(dividend);
  const valDivisor = parseNum(divisor) || 1;

  const getDivisorDecimals = (str: string) => {
    if (str.includes(',')) return str.split(',')[1].length;
    if (str.includes('.')) return str.split('.')[1].length;
    return 0;
  };

  const divisorDecs = getDivisorDecimals(divisor);
  const expansionFactor = Math.pow(10, divisorDecs);

  const expandedDividend = (valDividend * expansionFactor).toFixed(2).replace(/\.?0+$/, '').replace('.', ',');
  const expandedDivisor = (valDivisor * expansionFactor).toFixed(2).replace(/\.?0+$/, '').replace('.', ',');
  const quotient = (valDividend / valDivisor).toFixed(3).replace(/\.?0+$/, '').replace('.', ',');

  // Workshop 3: Division by 0.1, 0.01, 0.001
  const [smallDivBase, setSmallDivBase] = useState<string>('4,5');
  const [smallDivisor, setSmallDivisor] = useState<number>(0.1);

  const smallDivResult = (parseNum(smallDivBase) / smallDivisor).toFixed(2).replace(/\.?0+$/, '').replace('.', ',');

  const sections: TheorySection[] = [
    // 1. OSZTÁS 10-ZEL, 100-ZAL, 1000-REL
    {
      id: 'div-10-100-1000',
      title: '1. Osztás 10-zel, 100-zal, 1000-rel',
      icon: <MoveLeft className="w-5 h-5 text-rose-500" />,
      content: (
        <div className="space-y-6 text-slate-700 dark:text-slate-300 leading-relaxed">
          <p>
            Amikor egy számot 10-zel, 100-zal, 1000-rel osztunk, a szám értéke tizedére, századára, ezredére csökken.
            Ezért a <strong>tizedesvesszőt annyi hellyel léptetjük BALRA</strong>, ahány nulla van az osztóban:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center text-xs sm:text-sm">
            <div className="p-3 bg-rose-50 dark:bg-rose-950/30 rounded-xl border border-rose-200 dark:border-rose-800 space-y-1">
              <span className="font-bold text-rose-800 dark:text-rose-300 block">: 10 (1 nulla)</span>
              <span className="text-slate-600 dark:text-slate-400 block text-xs">1 hellyel balra</span>
              <div className="font-mono font-bold text-rose-600 dark:text-rose-400 text-base">34,5 : 10 = 3,45</div>
            </div>
            <div className="p-3 bg-rose-50 dark:bg-rose-950/30 rounded-xl border border-rose-200 dark:border-rose-800 space-y-1">
              <span className="font-bold text-rose-800 dark:text-rose-300 block">: 100 (2 nulla)</span>
              <span className="text-slate-600 dark:text-slate-400 block text-xs">2 hellyel balra</span>
              <div className="font-mono font-bold text-rose-600 dark:text-rose-400 text-base">34,5 : 100 = 0,345</div>
            </div>
            <div className="p-3 bg-rose-50 dark:bg-rose-950/30 rounded-xl border border-rose-200 dark:border-rose-800 space-y-1">
              <span className="font-bold text-rose-800 dark:text-rose-300 block">: 1000 (3 nulla)</span>
              <span className="text-slate-600 dark:text-slate-400 block text-xs">3 hellyel balra (0-val pótolva)</span>
              <div className="font-mono font-bold text-rose-600 dark:text-rose-400 text-base">34,5 : 1000 = 0,0345</div>
            </div>
          </div>

          {/* Workshop 1 */}
          <Card className="border-2 border-rose-200 dark:border-rose-800/60 shadow-md">
            <CardContent className="p-5 space-y-4">
              <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                <MoveLeft className="w-5 h-5 text-rose-500" />
                Interaktív Balra-Léptető Labor
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-500">Írj be egy számot:</label>
                  <input
                    type="text"
                    value={divBase}
                    onChange={(e) => setDivBase(e.target.value)}
                    className="w-full p-2.5 text-center text-lg font-bold border rounded-xl bg-white dark:bg-slate-900 font-mono"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-500">Válassz osztót:</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[10, 100, 1000].map((d) => (
                      <button
                        key={d}
                        onClick={() => setDivDivisor(d)}
                        className={cn(
                          "p-2 rounded-xl text-xs font-bold border transition-all",
                          divDivisor === d
                            ? "bg-rose-500 text-white border-rose-500 shadow"
                            : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200"
                        )}
                      >
                        : {d}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-4 bg-rose-50 dark:bg-rose-950/40 rounded-xl border border-rose-200 dark:border-rose-800 text-center space-y-1">
                <span className="text-xs text-rose-700 dark:text-rose-300 font-semibold block">Osztás eredménye:</span>
                <span className="text-3xl font-extrabold text-rose-800 dark:text-rose-200 font-mono">
                  {divBase} : {divDivisor} = {divResult}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    },

    // 2. TIZEDESTÖRT OSZTÁSA TERMÉSZETES SZÁMMAL
    {
      id: 'div-whole',
      title: '2. Tizedestört osztása természetes számmal',
      icon: <Divide className="w-5 h-5 text-indigo-500" />,
      content: (
        <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed">
          <p>
            Tizedestörtet egész számmal úgy osztunk el írásban, mint a természetes számokat, egyetlen <strong>fontos szabállyal</strong>:
          </p>

          <div className="p-4 bg-indigo-50/70 dark:bg-indigo-950/20 rounded-2xl border border-indigo-200 dark:border-indigo-800/50 space-y-2">
            <span className="text-base font-bold text-indigo-900 dark:text-indigo-200 block">
              📌 Amikor az osztás során elérjük és átlépjük a tizedesvesszőt az osztandóban, a hányadosba azonnal kitesszük a tizedesvesszőt!
            </span>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Ha az egész rész kisebb az osztónál, a hányados <strong>0 egésszel</strong> kezdődik (pl. <MathText>0,8 : 4 = 0,2</MathText> vagy <MathText>3,6 : 9 = 0,4</MathText>).
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-center text-xs sm:text-sm">
            <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border space-y-1">
              <span className="font-bold text-indigo-600 dark:text-indigo-400">Példa 1: Egész rész osztható</span>
              <div className="font-mono font-bold text-base">8,4 : 2 = 4,2</div>
              <span className="text-xs text-slate-500">8-ban a 2 megvan 4-szer, kitesszük a vesszőt, majd 4-ben a 2 megvan 2-szer.</span>
            </div>
            <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border space-y-1">
              <span className="font-bold text-indigo-600 dark:text-indigo-400">Példa 2: Egész rész kisebb</span>
              <div className="font-mono font-bold text-base">1,5 : 5 = 0,3</div>
              <span className="text-xs text-slate-500">1-ben az 5 megvan 0-szor, vessző, majd 15-ben az 5 megvan 3-szor.</span>
            </div>
          </div>
        </div>
      )
    },

    // 3. OSZTÁS TIZEDES TÖRTTEL - BŐVÍTÉS EGÉSZ OSZTÓRA
    {
      id: 'div-decimal-main',
      title: '3. Osztás tizedes törttel (Bővítés egész osztóra)',
      icon: <Sparkles className="w-5 h-5 text-purple-500" />,
      content: (
        <div className="space-y-6 text-slate-700 dark:text-slate-300 leading-relaxed">
          <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 rounded-2xl border-2 border-purple-200 dark:border-purple-800 space-y-3">
            <h4 className="font-extrabold text-purple-900 dark:text-purple-200 flex items-center gap-2 text-base">
              <CheckCircle2 className="w-5 h-5 text-purple-600" />
              Az Osztás Aranyszabálya: Az Osztót Egésszé Tegyük!
            </h4>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              Tizedes törttel közvetlenül nem osztunk. Először <strong>mindkét számot (az osztandót és az osztót is) megszorozzuk 10-zel, 100-zal vagy 1000-rel</strong> úgy, hogy az <strong>osztó egész szám legyen</strong>! A hányados értéke ekkor nem változik.
            </p>
            <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl font-mono text-center font-bold text-purple-700 dark:text-purple-300 border text-xs sm:text-sm">
              <MathText>a : b = (a · 10) : (b · 10) = (a · 100) : (b · 100)</MathText>
            </div>
          </div>

          {/* Workshop 2: Expansion & Division Calculator */}
          <Card className="border-2 border-purple-200 dark:border-purple-800/60 shadow-md">
            <CardContent className="p-5 space-y-4">
              <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                <Calculator className="w-5 h-5 text-purple-600" />
                Interaktív Bővítő és Osztó Műhely
              </span>

              <div className="flex flex-wrap items-center justify-center gap-3">
                <div className="text-center">
                  <label className="text-xs text-slate-500 block">Osztandó</label>
                  <input
                    type="text"
                    value={dividend}
                    onChange={(e) => setDividend(e.target.value)}
                    className="w-24 p-2 text-center text-lg font-bold border rounded-xl bg-white dark:bg-slate-900 font-mono"
                  />
                </div>
                <span className="text-2xl font-bold text-slate-400 mt-4">:</span>
                <div className="text-center">
                  <label className="text-xs text-slate-500 block">Osztó ({divisorDecs} tizedesjegy)</label>
                  <input
                    type="text"
                    value={divisor}
                    onChange={(e) => setDivisor(e.target.value)}
                    className="w-24 p-2 text-center text-lg font-bold border rounded-xl bg-white dark:bg-slate-900 font-mono"
                  />
                </div>
              </div>

              <div className="p-4 bg-purple-50 dark:bg-purple-950/40 rounded-xl border border-purple-200 dark:border-purple-800 space-y-2">
                <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 space-y-1">
                  <div>1. Lépés: Bővítés <span className="font-bold text-purple-600 dark:text-purple-400">{expansionFactor}-gyel</span> (hogy az osztó egész legyen):</div>
                  <div className="font-mono font-bold text-base text-slate-800 dark:text-slate-200">
                    {dividend} : {divisor} = {expandedDividend} : {expandedDivisor}
                  </div>
                </div>
                <div className="pt-2 border-t text-center">
                  <span className="text-xs text-purple-700 dark:text-purple-300 font-semibold block">Végeredmény (Hányados):</span>
                  <span className="text-3xl font-extrabold text-purple-800 dark:text-purple-200 font-mono">
                    {quotient}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    },

    // 4. OSZTÁS 0,1-GYEL, 0,01-GYEL, 0,001-GYEL
    {
      id: 'div-sub1',
      title: '4. Osztás 0,1-gyel, 0,01-gyel, 0,001-gyel',
      icon: <MoveRight className="w-5 h-5 text-teal-500" />,
      content: (
        <div className="space-y-6 text-slate-700 dark:text-slate-300 leading-relaxed">
          <p>
            Mivel a <MathText>0,1 = 1/10</MathText>, a <MathText>0,1</MathText>-gyel való osztás megegyezik a <MathText>10</MathText>-zel való <strong>szorzással</strong>!
            Ezért a <strong>tizedesvessző JOBBRA lép</strong>:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center text-xs sm:text-sm">
            <div className="p-3 bg-teal-50 dark:bg-teal-950/30 rounded-xl border border-teal-200 dark:border-teal-800 space-y-1">
              <span className="font-bold text-teal-800 dark:text-teal-300 block">: 0,1 (= · 10)</span>
              <span className="text-slate-600 dark:text-slate-400 block text-xs">1 hellyel jobbra</span>
              <div className="font-mono font-bold text-teal-600 dark:text-teal-400 text-base">4,5 : 0,1 = 45</div>
            </div>
            <div className="p-3 bg-teal-50 dark:bg-teal-950/30 rounded-xl border border-teal-200 dark:border-teal-800 space-y-1">
              <span className="font-bold text-teal-800 dark:text-teal-300 block">: 0,01 (= · 100)</span>
              <span className="text-slate-600 dark:text-slate-400 block text-xs">2 hellyel jobbra</span>
              <div className="font-mono font-bold text-teal-600 dark:text-teal-400 text-base">4,5 : 0,01 = 450</div>
            </div>
            <div className="p-3 bg-teal-50 dark:bg-teal-950/30 rounded-xl border border-teal-200 dark:border-teal-800 space-y-1">
              <span className="font-bold text-teal-800 dark:text-teal-300 block">: 0,001 (= · 1000)</span>
              <span className="text-slate-600 dark:text-slate-400 block text-xs">3 hellyel jobbra</span>
              <div className="font-mono font-bold text-teal-600 dark:text-teal-400 text-base">4,5 : 0,001 = 4500</div>
            </div>
          </div>

          {/* Workshop 3 */}
          <Card className="border-2 border-teal-200 dark:border-teal-800/60 shadow-md">
            <CardContent className="p-5 space-y-4">
              <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                <MoveRight className="w-5 h-5 text-teal-600" />
                Interaktív Jobbra-Léptető Labor
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-500">Szám:</label>
                  <input
                    type="text"
                    value={smallDivBase}
                    onChange={(e) => setSmallDivBase(e.target.value)}
                    className="w-full p-2.5 text-center text-lg font-bold border rounded-xl bg-white dark:bg-slate-900 font-mono"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-500">Osztó:</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[0.1, 0.01, 0.001].map((d) => (
                      <button
                        key={d}
                        onClick={() => setSmallDivisor(d)}
                        className={cn(
                          "p-2 rounded-xl text-xs font-bold border transition-all",
                          smallDivisor === d
                            ? "bg-teal-600 text-white border-teal-600 shadow"
                            : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200"
                        )}
                      >
                        : {d}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-4 bg-teal-50 dark:bg-teal-950/40 rounded-xl border border-teal-200 dark:border-teal-800 text-center space-y-1">
                <span className="text-xs text-teal-700 dark:text-teal-300 font-semibold block">Eredmény:</span>
                <span className="text-3xl font-extrabold text-teal-800 dark:text-teal-200 font-mono">
                  {smallDivBase} : {smallDivisor} = {smallDivResult}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    },

    // 5. GYAKORI CSAPDÁK ÉS ELLENŐRZÉS
    {
      id: 'traps',
      title: '5. Gyakori csapdák és ellenőrzés',
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
                <li>Csak az osztót szorozni, az osztandót nem (<MathText>3 : 0,5 ≠ 3 : 5</MathText>, hanem <MathText>30 : 5 = 6</MathText>!).</li>
                <li>Azt hinni, hogy az osztás mindig csökkent (<MathText>6 : 0,5 = 12 &gt; 6</MathText>!).</li>
                <li>A tizedesvessző kitételének elfelejtése az írásbeli osztásban.</li>
              </ul>
            </div>

            <div className="p-4 bg-emerald-50/70 dark:bg-emerald-950/20 rounded-2xl border border-emerald-200 dark:border-emerald-800/50 space-y-2">
              <h4 className="font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Biztonsági ellenőrzések
              </h4>
              <ul className="text-xs sm:text-sm space-y-1.5 list-disc list-inside text-emerald-900 dark:text-emerald-200">
                <li><strong>Ellenőrzés szorzással:</strong> <MathText>Hányados · Osztó = Osztandó</MathText> (pl. <MathText>8 · 0,6 = 4,8</MathText>).</li>
                <li>Ha 1-nél kisebb pozitív számmal osztunk, a hányados <strong>nagyobb</strong> lesz az osztandónál!</li>
                <li>Ha az osztandó nem osztható maradék nélkül, 0-kat írhatunk a végére a folytatáshoz.</li>
              </ul>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <TheoryTemplate
      title="Osztás tizedes törttel"
      subtitle="Osztás 10-zel, 100-zal, tizedes tört osztása egész számmal és tizedes törttel (bővítés egész osztóra), osztás 0,1-gyel és ellenőrzés."
      badgeText="➗ 6. Osztály • II. Törtek"
      quickRule={{
        label: 'Osztási aranyszabály',
        formula: 'a : b = (a · 10^k) : (b · 10^k) | : 10^k ➔ k hely balra'
      }}
      themeColor="rose"
      sections={sections}
      topicId="g6-decimal-division-theory"
      pdfFilename="6_osztaly_osztas_tizedes_torttel_tananyag.pdf"
      onBack={onBack}
      onSwitchToQuiz={onSwitchToQuiz}
    />
  );
}

export default DecimalDivisionTheory;
