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
  Table,
  Sliders
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface DecimalFractionsTheoryProps {
  onBack?: () => void;
  onSwitchToQuiz?: () => void;
}

export function DecimalFractionsTheory({
  onBack,
  onSwitchToQuiz
}: DecimalFractionsTheoryProps) {
  // Workshop 1: Place-Value Interactive Explorer
  const [tens, setTens] = useState<number>(3);
  const [ones, setOnes] = useState<number>(4);
  const [tenths, setTenths] = useState<number>(5);
  const [hundredths, setHundredths] = useState<number>(2);
  const [thousandths, setThousandths] = useState<number>(8);

  const fullDecimalString = `${tens * 10 + ones},${tenths}${hundredths}${thousandths}`;
  const fullDecimalValue = tens * 10 + ones + tenths * 0.1 + hundredths * 0.01 + thousandths * 0.001;

  // Workshop 2: Fraction to Decimal Converter
  const [fracNum, setFracNum] = useState<number>(3);
  const [fracDen, setFracDen] = useState<number>(4);

  const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
  const fracGcd = gcd(fracNum, fracDen);
  const simpNum = fracNum / fracGcd;
  const simpDen = fracDen / fracGcd;
  const decimalVal = fracDen !== 0 ? (fracNum / fracDen).toFixed(4).replace(/\.?0+$/, '').replace('.', ',') : '0';

  // Workshop 3: Rounding Explorer
  const [roundInput, setRoundInput] = useState<string>('14,836');
  const [roundPlace, setRoundPlace] = useState<'ones' | 'tenths' | 'hundredths'>('tenths');

  const parseHungarianNumber = (str: string) => parseFloat(str.replace(',', '.'));
  const parsedNum = parseHungarianNumber(roundInput) || 0;

  const getRoundedDetails = () => {
    let factor = 1;
    let placeName = 'egészre';
    let decimals = 0;
    if (roundPlace === 'ones') {
      factor = 1;
      placeName = 'egészre (1)';
      decimals = 0;
    } else if (roundPlace === 'tenths') {
      factor = 10;
      placeName = 'tizedre (0,1)';
      decimals = 1;
    } else if (roundPlace === 'hundredths') {
      factor = 100;
      placeName = 'századra (0,01)';
      decimals = 2;
    }

    const rounded = (Math.round(parsedNum * factor) / factor).toFixed(decimals).replace('.', ',');
    return { placeName, rounded };
  };

  const roundedInfo = getRoundedDetails();

  // Workshop 4: Column Addition / Subtraction
  const [opA, setOpA] = useState<string>('14,85');
  const [opB, setOpB] = useState<string>('6,472');
  const [operation, setOperation] = useState<'+' | '-'>('+');

  const valA = parseHungarianNumber(opA) || 0;
  const valB = parseHungarianNumber(opB) || 0;
  const resultVal = operation === '+' ? valA + valB : valA - valB;
  const resultFormatted = resultVal.toFixed(3).replace(/\.?0+$/, '').replace('.', ',');

  const sections: TheorySection[] = [
    // 1. A TIZEDES TÖRT FOGALMA ÉS HELYIÉRTÉKEI
    {
      id: 'place-values',
      title: '1. A tizedes tört fogalma és a helyiértékek',
      icon: <Table className="w-5 h-5 text-emerald-500" />,
      content: (
        <div className="space-y-6 text-slate-700 dark:text-slate-300 leading-relaxed">
          <p>
            A <strong>tizedes tört</strong> a törtek egy olyan különleges írásmódja, amelyben a tízes alapú helyiértékes számrendszert kiterjesztjük az 1-nél kisebb részekre.
            Az egész részt és a törtrészt Magyarországon <strong>tizedesvesszővel</strong> választjuk el.
          </p>

          <div className="p-4 bg-emerald-50/70 dark:bg-emerald-950/20 rounded-2xl border border-emerald-200 dark:border-emerald-800/50 space-y-3">
            <h4 className="font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              A tizedes helyiérték-táblázat (Balról jobbra tizedelődik)
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 text-center text-xs sm:text-sm font-medium">
              <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                <span className="text-slate-500 block text-xs">Tízesek (T)</span>
                <span className="font-bold text-slate-800 dark:text-slate-200 text-base">10</span>
              </div>
              <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                <span className="text-slate-500 block text-xs">Egyesek (E)</span>
                <span className="font-bold text-slate-800 dark:text-slate-200 text-base">1</span>
              </div>
              <div className="p-2.5 bg-emerald-100 dark:bg-emerald-900/40 rounded-xl border border-emerald-300 dark:border-emerald-700">
                <span className="text-emerald-700 dark:text-emerald-300 block text-xs">Tizedesvessző</span>
                <span className="font-extrabold text-emerald-800 dark:text-emerald-200 text-base">,</span>
              </div>
              <div className="p-2.5 bg-teal-50 dark:bg-teal-950/30 rounded-xl border border-teal-200 dark:border-teal-800">
                <span className="text-teal-600 dark:text-teal-400 block text-xs">Tizedek (t)</span>
                <span className="font-bold text-teal-800 dark:text-teal-200 text-base">0,1 = 1/10</span>
              </div>
              <div className="p-2.5 bg-cyan-50 dark:bg-cyan-950/30 rounded-xl border border-cyan-200 dark:border-cyan-800">
                <span className="text-cyan-600 dark:text-cyan-400 block text-xs">Századok (sz)</span>
                <span className="font-bold text-cyan-800 dark:text-cyan-200 text-base">0,01 = 1/100</span>
              </div>
              <div className="p-2.5 bg-indigo-50 dark:bg-indigo-950/30 rounded-xl border border-indigo-200 dark:border-indigo-800">
                <span className="text-indigo-600 dark:text-indigo-400 block text-xs">Ezredek (e)</span>
                <span className="font-bold text-indigo-800 dark:text-indigo-200 text-base">0,001 = 1/1000</span>
              </div>
            </div>
          </div>

          {/* Workshop 1: Place-Value Explorer */}
          <Card className="border-2 border-emerald-200 dark:border-emerald-800/60 shadow-md">
            <CardContent className="p-5 space-y-4">
              <div className="flex items-center justify-between border-b pb-2">
                <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                  <Sliders className="w-5 h-5 text-emerald-600" />
                  Interaktív Helyiérték-Bontó Műhely
                </span>
                <span className="text-xs px-2.5 py-1 bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300 rounded-full font-semibold">
                  Próbáld ki a csúszkákat!
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block">Tízesek: {tens}</label>
                  <input
                    type="range"
                    min="0"
                    max="9"
                    value={tens}
                    onChange={(e) => setTens(Number(e.target.value))}
                    className="w-full accent-emerald-600"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block">Egyesek: {ones}</label>
                  <input
                    type="range"
                    min="0"
                    max="9"
                    value={ones}
                    onChange={(e) => setOnes(Number(e.target.value))}
                    className="w-full accent-emerald-600"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-teal-600 dark:text-teal-400 block">Tizedek: {tenths}</label>
                  <input
                    type="range"
                    min="0"
                    max="9"
                    value={tenths}
                    onChange={(e) => setTenths(Number(e.target.value))}
                    className="w-full accent-teal-600"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-cyan-600 dark:text-cyan-400 block">Századok: {hundredths}</label>
                  <input
                    type="range"
                    min="0"
                    max="9"
                    value={hundredths}
                    onChange={(e) => setHundredths(Number(e.target.value))}
                    className="w-full accent-cyan-600"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 block">Ezredek: {thousandths}</label>
                  <input
                    type="range"
                    min="0"
                    max="9"
                    value={thousandths}
                    onChange={(e) => setThousandths(Number(e.target.value))}
                    className="w-full accent-indigo-600"
                  />
                </div>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-center space-y-2">
                <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 tracking-wider font-mono">
                  {fullDecimalString}
                </div>
                <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-mono">
                  = {tens} · 10 + {ones} · 1 + {tenths} · 0,1 + {hundredths} · 0,01 + {thousandths} · 0,001
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 italic">
                  Kiolvasva: <strong>{tens * 10 + ones} egész {tenths}{hundredths}{thousandths} ezred</strong>
                </div>
              </div>

              <div className="p-3 bg-amber-50 dark:bg-amber-950/20 rounded-xl border border-amber-200 dark:border-amber-800/40 text-xs text-amber-900 dark:text-amber-200 space-y-1">
                <strong>Záró nullák szabálya:</strong> A tizedestört végére írt vagy onnan elhagyott nullák <em>nem változtatják meg</em> a szám értékét!
                (Pl. <MathText>3,500 = 3,50 = 3,5</MathText>). De a szám belsejében lévő nullákat <strong>tilos elhagyni</strong> (<MathText>3,05 \ne 3,5</MathText>)!
              </div>
            </CardContent>
          </Card>
        </div>
      )
    },

    // 2. KÖZÖNSÉGES TÖRT ÉS TIZEDESTÖRT ÁTVÁLTÁSA
    {
      id: 'conversion',
      title: '2. Közönséges tört ⇄ Tizedestört átváltása',
      icon: <ArrowRightLeft className="w-5 h-5 text-teal-500" />,
      content: (
        <div className="space-y-6 text-slate-700 dark:text-slate-300 leading-relaxed">
          <p>
            Bármely közönséges tört átírható tizedestört alakba, és a véges tizedestörtek mind átírhatók közönséges törtté.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-teal-50/70 dark:bg-teal-950/20 rounded-2xl border border-teal-200 dark:border-teal-800/50 space-y-2">
              <h4 className="font-bold text-teal-800 dark:text-teal-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-600" />
                1. Törtből Tizedestört: Bővítés vagy Osztás
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                <strong>A) Bővítés:</strong> Ha a nevező bővíthető 10, 100 vagy 1000-re:
              </p>
              <div className="p-2 bg-white dark:bg-slate-900 rounded-lg font-mono text-xs sm:text-sm text-center border">
                <MathText>3/4 = (3 · 25)/(4 · 25) = 75/100 = 0,75</MathText>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                <strong>B) Számláló osztása a nevezővel:</strong>
              </p>
              <div className="p-2 bg-white dark:bg-slate-900 rounded-lg font-mono text-xs sm:text-sm text-center border">
                <MathText>3/8 = 3 : 8 = 0,375</MathText>
              </div>
            </div>

            <div className="p-4 bg-cyan-50/70 dark:bg-cyan-950/20 rounded-2xl border border-cyan-200 dark:border-cyan-800/50 space-y-2">
              <h4 className="font-bold text-cyan-800 dark:text-cyan-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-600" />
                2. Tizedestörtből Közönséges Tört: Egyszerűsítés
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                A tizedestörtet felírjuk 10, 100 vagy 1000 nevezőjű törtként, majd egyszerűsítjük a legnagyobb közös osztóval:
              </p>
              <div className="p-2 bg-white dark:bg-slate-900 rounded-lg font-mono text-xs sm:text-sm text-center border">
                <MathText>0,4 = 4/10 = 2/5</MathText>
              </div>
              <div className="p-2 bg-white dark:bg-slate-900 rounded-lg font-mono text-xs sm:text-sm text-center border">
                <MathText>0,125 = 125/1000 = 1/8</MathText>
              </div>
            </div>
          </div>

          {/* Nevezetes Törtek Gyors Táblázata */}
          <div className="p-4 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
            <h4 className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2 text-sm">
              <Sparkles className="w-4 h-4 text-amber-500" />
              Nevezetes törtek (Ezeket érdemes fejből tudni!)
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs sm:text-sm">
              <div className="p-2 bg-white dark:bg-slate-800 rounded-xl border">
                <span className="font-bold text-indigo-600 dark:text-indigo-400">1/2 = 0,5</span>
              </div>
              <div className="p-2 bg-white dark:bg-slate-800 rounded-xl border">
                <span className="font-bold text-indigo-600 dark:text-indigo-400">1/4 = 0,25</span>
              </div>
              <div className="p-2 bg-white dark:bg-slate-800 rounded-xl border">
                <span className="font-bold text-indigo-600 dark:text-indigo-400">3/4 = 0,75</span>
              </div>
              <div className="p-2 bg-white dark:bg-slate-800 rounded-xl border">
                <span className="font-bold text-indigo-600 dark:text-indigo-400">1/5 = 0,2</span>
              </div>
              <div className="p-2 bg-white dark:bg-slate-800 rounded-xl border">
                <span className="font-bold text-teal-600 dark:text-teal-400">2/5 = 0,4</span>
              </div>
              <div className="p-2 bg-white dark:bg-slate-800 rounded-xl border">
                <span className="font-bold text-teal-600 dark:text-teal-400">1/8 = 0,125</span>
              </div>
              <div className="p-2 bg-white dark:bg-slate-800 rounded-xl border">
                <span className="font-bold text-teal-600 dark:text-teal-400">3/8 = 0,375</span>
              </div>
              <div className="p-2 bg-white dark:bg-slate-800 rounded-xl border">
                <span className="font-bold text-teal-600 dark:text-teal-400">1/10 = 0,1</span>
              </div>
            </div>
          </div>

          {/* Workshop 2: Fraction Converter */}
          <Card className="border-2 border-teal-200 dark:border-teal-800/60 shadow-md">
            <CardContent className="p-5 space-y-4">
              <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                <Calculator className="w-5 h-5 text-teal-600" />
                Interaktív Tört ⇄ Tizedestört Átváltó
              </span>

              <div className="flex flex-wrap items-center justify-center gap-4 text-center">
                <div className="flex flex-col items-center gap-1">
                  <label className="text-xs font-semibold text-slate-500">Számláló</label>
                  <input
                    type="number"
                    value={fracNum}
                    onChange={(e) => setFracNum(Number(e.target.value) || 0)}
                    className="w-20 p-2 text-center text-lg font-bold border rounded-xl bg-white dark:bg-slate-900"
                  />
                  <div className="w-16 h-0.5 bg-slate-400 dark:bg-slate-600 my-1" />
                  <label className="text-xs font-semibold text-slate-500">Nevező</label>
                  <input
                    type="number"
                    min="1"
                    value={fracDen}
                    onChange={(e) => setFracDen(Math.max(1, Number(e.target.value) || 1))}
                    className="w-20 p-2 text-center text-lg font-bold border rounded-xl bg-white dark:bg-slate-900"
                  />
                </div>

                <div className="text-2xl font-bold text-slate-400">=</div>

                <div className="p-4 bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 rounded-2xl text-center space-y-1">
                  <span className="text-xs text-teal-600 dark:text-teal-400 font-semibold block">Tizedestört alak</span>
                  <span className="text-3xl font-extrabold text-teal-700 dark:text-teal-300 font-mono">
                    {decimalVal}
                  </span>
                  <span className="text-xs text-slate-500 block">
                    (Osztás: {fracNum} : {fracDen})
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    },

    // 3. ÖSSZEHASONLÍTÁS ÉS KEREKÍTÉS
    {
      id: 'compare-round',
      title: '3. Összehasonlítás, nagyságrend és kerekítés',
      icon: <Target className="w-5 h-5 text-indigo-500" />,
      content: (
        <div className="space-y-6 text-slate-700 dark:text-slate-300 leading-relaxed">
          <p>
            Tizedes törtek összehasonlításakor először az <strong>egész részeket</strong> hasonlítjuk össze. Ha azok egyenlők, akkor a tizedesvessző után balról jobbra haladva a <strong>tizedeket, századokat, ezredeket</strong> vetjük össze.
          </p>

          <div className="p-4 bg-indigo-50/70 dark:bg-indigo-950/20 rounded-2xl border border-indigo-200 dark:border-indigo-800/50 space-y-3">
            <h4 className="font-bold text-indigo-800 dark:text-indigo-300 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-indigo-600" />
              Összehasonlítási Trükk: Nullák Pótlása
            </h4>
            <p className="text-sm">
              Gyakori hiba azt gondolni, hogy a hosszabb tizedestört a nagyobb. Mindig pótold a nullákat azonos hosszúságra a könnyű összehasonlításhoz!
            </p>
            <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border text-center font-mono text-sm">
              <span className="text-slate-600 dark:text-slate-400">0,4 és 0,385 összehasonlítása: </span>
              <strong className="text-indigo-600 dark:text-indigo-400">0,400 &gt; 0,385</strong> (mert 400 ezred &gt; 385 ezred)
            </div>
          </div>

          {/* Workshop 3: Rounding Explorer */}
          <Card className="border-2 border-indigo-200 dark:border-indigo-800/60 shadow-md">
            <CardContent className="p-5 space-y-4">
              <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                <Sliders className="w-5 h-5 text-indigo-600" />
                Interaktív Kerekítő Műhely
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-500">Írj be egy tizedestörtet (vesszővel vagy ponttal):</label>
                  <input
                    type="text"
                    value={roundInput}
                    onChange={(e) => setRoundInput(e.target.value)}
                    className="w-full p-2.5 text-center text-lg font-bold border rounded-xl bg-white dark:bg-slate-900 font-mono"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-500">Kerekítés pontossága:</label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => setRoundPlace('ones')}
                      className={cn(
                        "p-2 rounded-xl text-xs font-bold border transition-all",
                        roundPlace === 'ones'
                          ? "bg-indigo-600 text-white border-indigo-600 shadow"
                          : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200"
                      )}
                    >
                      Egészre (1)
                    </button>
                    <button
                      onClick={() => setRoundPlace('tenths')}
                      className={cn(
                        "p-2 rounded-xl text-xs font-bold border transition-all",
                        roundPlace === 'tenths'
                          ? "bg-indigo-600 text-white border-indigo-600 shadow"
                          : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200"
                      )}
                    >
                      Tizedre (0,1)
                    </button>
                    <button
                      onClick={() => setRoundPlace('hundredths')}
                      className={cn(
                        "p-2 rounded-xl text-xs font-bold border transition-all",
                        roundPlace === 'hundredths'
                          ? "bg-indigo-600 text-white border-indigo-600 shadow"
                          : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200"
                      )}
                    >
                      Századra (0,01)
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-indigo-50 dark:bg-indigo-950/40 rounded-xl border border-indigo-200 dark:border-indigo-800 text-center space-y-1">
                <span className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold block">
                  Kerekítve {roundedInfo.placeName}:
                </span>
                <span className="text-3xl font-extrabold text-indigo-700 dark:text-indigo-300 font-mono">
                  {roundInput} ≈ {roundedInfo.rounded}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 block">
                  Szabály: A kerekítendő helyiérték utáni számjegy ha 0, 1, 2, 3, 4 $\to$ lefelé kerekítünk; ha 5, 6, 7, 8, 9 $\to$ felfelé kerekítünk!
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    },

    // 4. ÖSSZEADÁS ÉS KIVONÁS
    {
      id: 'addition-subtraction',
      title: '4. Tizedes törtek összeadása és kivonása',
      icon: <Calculator className="w-5 h-5 text-cyan-500" />,
      content: (
        <div className="space-y-6 text-slate-700 dark:text-slate-300 leading-relaxed">
          <p>
            Tizedes törtek összeadásakor és kivonásakor az <strong>egyetlen legfontosabb aranyszabály</strong>:
          </p>

          <div className="p-4 bg-cyan-50/70 dark:bg-cyan-950/20 rounded-2xl border border-cyan-200 dark:border-cyan-800/50 text-center space-y-2">
            <span className="text-base sm:text-lg font-bold text-cyan-900 dark:text-cyan-200">
              📌 A tizedesvesszőknek pontosan egymás alá kell kerülniük!
            </span>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Így a tizedek a tizedek alá, az egyesek az egyesek alá, a századok a századok alá kerülnek. A hiányzó helyiértékeket mindig pótold nullával!
            </p>
          </div>

          {/* Workshop 4: Column Math Interactive */}
          <Card className="border-2 border-cyan-200 dark:border-cyan-800/60 shadow-md">
            <CardContent className="p-5 space-y-4">
              <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                <Calculator className="w-5 h-5 text-cyan-600" />
                Írásbeli Összeadás és Kivonás Szemléltető
              </span>

              <div className="flex flex-wrap items-center justify-center gap-3">
                <input
                  type="text"
                  value={opA}
                  onChange={(e) => setOpA(e.target.value)}
                  className="w-24 p-2 text-center text-base font-bold border rounded-xl bg-white dark:bg-slate-900 font-mono"
                />
                <button
                  onClick={() => setOperation(operation === '+' ? '-' : '+')}
                  className="px-3 py-2 bg-cyan-600 text-white rounded-xl font-bold hover:bg-cyan-700 transition-colors"
                >
                  {operation}
                </button>
                <input
                  type="text"
                  value={opB}
                  onChange={(e) => setOpB(e.target.value)}
                  className="w-24 p-2 text-center text-base font-bold border rounded-xl bg-white dark:bg-slate-900 font-mono"
                />
                <span className="text-xl font-bold text-slate-400">=</span>
                <span className="text-2xl font-extrabold text-cyan-700 dark:text-cyan-300 font-mono px-3 py-1 bg-cyan-50 dark:bg-cyan-950/40 rounded-xl border border-cyan-200 dark:border-cyan-800">
                  {resultFormatted}
                </span>
              </div>

              <div className="p-3 bg-amber-50 dark:bg-amber-950/20 rounded-xl border border-amber-200 dark:border-amber-800/40 text-xs text-amber-900 dark:text-amber-200 space-y-1">
                <strong>Vigyázat kivonásnál egész számból!</strong><br />
                Például: <MathText>5 - 2,37 = 5,00 - 2,37 = 2,63</MathText>. Ne felejtsd el kitenni az <MathText>5,00</MathText> nulláit a levonáshoz!
              </div>
            </CardContent>
          </Card>
        </div>
      )
    },

    // 5. TIPUSOS CSAPDÁK ÉS GYORS ÖSSZEFOGLALÓ
    {
      id: 'traps-summary',
      title: '5. Gyakori csapdák és jó tanácsok',
      icon: <Flame className="w-5 h-5 text-rose-500" />,
      content: (
        <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-rose-50/70 dark:bg-rose-950/20 rounded-2xl border border-rose-200 dark:border-rose-800/50 space-y-2">
              <h4 className="font-bold text-rose-800 dark:text-rose-300 flex items-center gap-2">
                <X className="w-4 h-4 text-rose-600" />
                Gyakori hiba
              </h4>
              <ul className="text-xs sm:text-sm space-y-1.5 list-disc list-inside text-rose-900 dark:text-rose-200">
                <li>A hosszabb tizedestörtet nagyobbnak gondolni (<MathText>0,28 &lt; 0,3</MathText> mert <MathText>0,28 &lt; 0,30</MathText>!).</li>
                <li>Belső nullák elhagyása (<MathText>4,05 \ne 4,5</MathText>).</li>
                <li>Egész számból kivonáskor a tizedesjegyek változatlan leírása (<MathText>10 - 3,4 \ne 7,4</MathText>, hanem <MathText>6,6</MathText>!).</li>
              </ul>
            </div>

            <div className="p-4 bg-emerald-50/70 dark:bg-emerald-950/20 rounded-2xl border border-emerald-200 dark:border-emerald-800/50 space-y-2">
              <h4 className="font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Helyes módszer
              </h4>
              <ul className="text-xs sm:text-sm space-y-1.5 list-disc list-inside text-emerald-900 dark:text-emerald-200">
                <li>Pótold a hiányzó helyiértékeket 0-val összehasonlítás előtt!</li>
                <li>Összeadásnál és kivonásnál: vessző a vessző alá!</li>
                <li>Kerekítésnél a megadott helyiérték utáni <em>egyetlen</em> számjegyet figyeld!</li>
              </ul>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <TheoryTemplate
      title="Mit tanultunk a tizedes törtekről? Ismétlés"
      subtitle="Tizedestört helyiértékek, átváltás közönséges törtté és vissza, kerekítés, összeadás és kivonás."
      badgeText="🧮 6. Osztály • II. Törtek"
      quickRule={{
        label: 'Tizedestört Alapok',
        formula: '0,1 = 1/10 | 0,01 = 1/100 | Vessző a vessző alá (±)'
      }}
      themeColor="emerald"
      sections={sections}
      topicId="g6-decimal-fractions-theory"
      pdfFilename="6_osztaly_tizedes_tortek_ismetles_tananyag.pdf"
      onBack={onBack}
      onSwitchToQuiz={onSwitchToQuiz}
    />
  );
}

export default DecimalFractionsTheory;
