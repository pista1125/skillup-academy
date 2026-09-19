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
  PieChart
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface FractionDivisionTheoryProps {
  onBack?: () => void;
  onSwitchToQuiz?: () => void;
}

export function FractionDivisionTheory({
  onBack,
  onSwitchToQuiz
}: FractionDivisionTheoryProps) {
  // Workshop 1: Visual Division & "How many times" slider
  const [dNum, setDNum] = useState<number>(3);
  const [dDen, setDDen] = useState<number>(4);
  const [divNum, setDivNum] = useState<number>(1);
  const [divDen, setDivDen] = useState<number>(4);

  // Helper gcd
  const gcd = (a: number, b: number): number => {
    return b === 0 ? a : gcd(b, a % b);
  };

  // Workshop 1 computation: (dNum/dDen) : (divNum/divDen) = (dNum * divDen) / (dDen * divNum)
  const multNum = dNum * divDen;
  const multDen = dDen * divNum;
  const commonGcd = gcd(multNum, multDen);
  const simpNum = multNum / commonGcd;
  const simpDen = multDen / commonGcd;
  const isWholeResult = simpNum % simpDen === 0;
  const wholeVal = Math.floor(simpNum / simpDen);
  const remNum = simpNum % simpDen;

  const sections: TheorySection[] = [
    // 1. TÖRT OSZTÁSA EGÉSZ SZÁMMAL
    {
      id: 'div-whole',
      title: '1. Tört osztása egész számmal (Ismétlés)',
      icon: <Divide className="w-5 h-5 text-indigo-500" />,
      content: (
        <div className="space-y-6 text-slate-700 dark:text-slate-300 leading-relaxed">
          <p>
            Már 5. osztályban megismertük, hogyan osztunk el egy törtet természetes számmal. Két egyszerű szabály létezik attól függően, hogy a számláló osztható-e a számmal:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-emerald-50/60 dark:bg-emerald-950/30 rounded-2xl border border-emerald-200 dark:border-emerald-800 space-y-2">
              <div className="flex items-center gap-2 font-bold text-emerald-700 dark:text-emerald-400">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>1. Eset: A számláló osztható a számmal</span>
              </div>
              <p className="text-sm">
                Ekkor egyszerűen a <strong>számlálót osztjuk el</strong>, a nevező változatlan marad:
              </p>
              <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl text-center font-bold font-mono text-emerald-700 dark:text-emerald-300 border border-emerald-100 dark:border-emerald-900">
                <MathText>a/b : n = (a : n)/b  (pl. 6/7 : 2 = 3/7)</MathText>
              </div>
            </div>

            <div className="p-4 bg-blue-50/60 dark:bg-blue-950/30 rounded-2xl border border-blue-200 dark:border-blue-800 space-y-2">
              <div className="flex items-center gap-2 font-bold text-blue-700 dark:text-blue-400">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>2. Eset: A számláló nem osztható</span>
              </div>
              <p className="text-sm">
                Ekkor a <strong>nevezőt szorozzuk meg</strong> a számmal (a részeket még kisebbre vágjuk):
              </p>
              <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl text-center font-bold font-mono text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-900">
                <MathText>a/b : n = a/(b · n)  (pl. 5/8 : 3 = 5/24)</MathText>
              </div>
            </div>
          </div>
        </div>
      )
    },

    // 2. TÖRT OSZTÁSA TÖRTTEL (AZ ARANYSZABÁLY)
    {
      id: 'div-fractions',
      title: '2. Tört osztása törttel (Az aranyszabály)',
      icon: <Sparkles className="w-5 h-5 text-amber-500" />,
      content: (
        <div className="space-y-6 text-slate-700 dark:text-slate-300 leading-relaxed">
          <div className="p-4 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/40 dark:to-purple-950/40 rounded-2xl border border-indigo-200 dark:border-indigo-800 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" /> A törtosztás aranyszabálya
            </span>
            <p className="text-base font-semibold text-slate-900 dark:text-white">
              Törtet törttel úgy osztunk, hogy az osztandót <strong>megszorozzuk az osztó reciprok értékével</strong>:
            </p>
            <div className="p-3 bg-white dark:bg-slate-900 rounded-xl text-center font-mono text-xl font-extrabold text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900 shadow-sm">
              <MathText>a/b : c/d = a/b · d/c = (a · d)/(b · c)  (b ≠ 0, c ≠ 0, d ≠ 0)</MathText>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <PieChart className="w-4 h-4 text-emerald-500" />
              Mit jelent a törtosztás a valóságban? (Hányszor van meg benne?)
            </h4>
            <p>
              Gondoljunk egy pizzára! Ha van egy fél pizzánk (<MathText>1/2</MathText>), és negyed pizzás szeleteket (<MathText>1/4</MathText>) szeretnénk kiosztani:
            </p>
            <div className="p-3 bg-emerald-50/70 dark:bg-emerald-950/30 rounded-xl border border-emerald-200 dark:border-emerald-800 font-mono text-center font-bold text-emerald-800 dark:text-emerald-300">
              <MathText>1/2 : 1/4 = 1/2 · 4/1 = 4/2 = 2</MathText>
            </div>
            <p className="text-xs text-muted-foreground">
              A fél pizzában pontosan <strong>2 darab</strong> negyed szelet van meg!
            </p>
          </div>

          {/* Interaktív Szeletelő Modell */}
          <div className="p-4 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-slate-800 dark:text-slate-200 flex items-center gap-2">
                <Target className="w-4 h-4 text-indigo-500" />
                Interaktív Tört-Osztás Szemléltető
              </span>
              <span className="text-xs text-muted-foreground">Változtasd az értékeket!</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <label className="text-xs text-muted-foreground block mb-1">Osztandó számláló ({dNum})</label>
                <input
                  type="range"
                  min="1"
                  max={dDen}
                  value={dNum}
                  onChange={(e) => setDNum(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground block mb-1">Osztandó nevező ({dDen})</label>
                <input
                  type="range"
                  min="2"
                  max="8"
                  value={dDen}
                  onChange={(e) => {
                    const newDen = parseInt(e.target.value);
                    setDDen(newDen);
                    if (dNum > newDen) setDNum(newDen);
                  }}
                  className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground block mb-1">Osztó számláló ({divNum})</label>
                <input
                  type="range"
                  min="1"
                  max={divDen}
                  value={divNum}
                  onChange={(e) => setDivNum(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-600"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground block mb-1">Osztó nevező ({divDen})</label>
                <input
                  type="range"
                  min="2"
                  max="8"
                  value={divDen}
                  onChange={(e) => {
                    const newDen = parseInt(e.target.value);
                    setDivDen(newDen);
                    if (divNum > newDen) setDivNum(newDen);
                  }}
                  className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-purple-600"
                />
              </div>
            </div>

            {/* Vizuális összehasonlító sávok */}
            <div className="p-3 bg-white dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Osztandó készlet: <MathText>{`${dNum}/${dDen}`}</MathText></span>
                  <span>({Math.round((dNum / dDen) * 100)}%)</span>
                </div>
                <div className="w-full h-5 bg-slate-100 dark:bg-slate-900 rounded-md overflow-hidden flex border">
                  {Array.from({ length: dDen }).map((_, i) => (
                    <div
                      key={i}
                      className={cn(
                        'flex-1 border-r border-slate-300 dark:border-slate-700 last:border-r-0 transition-all',
                        i < dNum ? 'bg-indigo-500' : 'bg-transparent'
                      )}
                    />
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Egy adag mérete (osztó): <MathText>{`${divNum}/${divDen}`}</MathText></span>
                  <span>({Math.round((divNum / divDen) * 100)}%)</span>
                </div>
                <div className="w-full h-5 bg-slate-100 dark:bg-slate-900 rounded-md overflow-hidden flex border">
                  {Array.from({ length: divDen }).map((_, i) => (
                    <div
                      key={i}
                      className={cn(
                        'flex-1 border-r border-slate-300 dark:border-slate-700 last:border-r-0 transition-all',
                        i < divNum ? 'bg-purple-500' : 'bg-transparent'
                      )}
                    />
                  ))}
                </div>
              </div>

              <div className="p-3 bg-indigo-50/60 dark:bg-indigo-950/40 rounded-xl text-center space-y-1">
                <span className="text-xs text-indigo-600 dark:text-indigo-400 font-bold block">
                  Számítás reciprokkal való szorzással:
                </span>
                <div className="font-mono text-base sm:text-lg font-bold text-indigo-800 dark:text-indigo-200">
                  <MathText>{`${dNum}/${dDen} : ${divNum}/${divDen} = ${dNum}/${dDen} · ${divDen}/${divNum} = ${multNum}/${multDen}`}</MathText>
                  {multNum !== simpNum && (
                    <span className="ml-2 text-emerald-600 dark:text-emerald-400">
                      <MathText>{`= ${simpNum}/${simpDen}`}</MathText>
                    </span>
                  )}
                  {isWholeResult && <span className="ml-2 text-emerald-600 font-normal">(= {wholeVal})</span>}
                  {!isWholeResult && simpNum > simpDen && (
                    <span className="ml-2 text-purple-600 dark:text-purple-400 font-normal">
                      <MathText>{`(= ${wholeVal} ${remNum}/${simpDen})`}</MathText>
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },

    // 3. KERESZTBE EGYSZERŰSÍTÉS AZ ÁTALAKÍTÁS UTÁN
    {
      id: 'cross-cancel-div',
      title: '3. Keresztbe egyszerűsítés az átalakítás után',
      icon: <ArrowRightLeft className="w-5 h-5 text-emerald-500" />,
      content: (
        <div className="space-y-6 text-slate-700 dark:text-slate-300 leading-relaxed">
          <div className="p-4 bg-emerald-50/60 dark:bg-emerald-950/30 rounded-2xl border border-emerald-200 dark:border-emerald-800 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
              <Lightbulb className="w-4 h-4" /> Fontos szabály az egyszerűsítésnél:
            </span>
            <p className="text-sm">
              Keresztbe egyszerűsíteni <strong>csak azután szabad</strong>, miután az osztást átírtuk <strong>reciprokkal való szorzássá</strong>!
            </p>
          </div>

          <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3 shadow-sm">
            <h5 className="font-bold text-sm text-slate-900 dark:text-white">Lépésről lépésre mintapélda:</h5>
            <div className="font-mono text-center text-lg font-bold space-y-2 p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border">
              <div className="text-muted-foreground text-sm">Feladat:</div>
              <div className="text-indigo-600 dark:text-indigo-400">
                <MathText>3/4 : 9/8</MathText>
              </div>
              <div className="text-xs text-muted-foreground pt-1">
                1. Lépés: Reciprokkal való szorzás:
              </div>
              <div className="text-purple-600 dark:text-purple-400">
                <MathText>3/4 · 8/9</MathText>
              </div>
              <div className="text-xs text-muted-foreground pt-1">
                2. Lépés: Keresztbe egyszerűsítés (3 és 9 : 3 ⟹ 1 és 3; 8 és 4 : 4 ⟹ 2 és 1):
              </div>
              <div className="text-emerald-600 dark:text-emerald-400">
                <MathText>1/1 · 2/3 = (1 · 2)/(1 · 3) = 2/3</MathText>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3.5 bg-blue-50/50 dark:bg-blue-950/30 rounded-xl border border-blue-200 dark:border-blue-800">
              <span className="font-bold text-blue-700 dark:text-blue-400 block mb-1 text-sm">2. Példa:</span>
              <div className="font-mono text-sm font-bold text-blue-800 dark:text-blue-200">
                <MathText>5/6 : 10/3 = 5/6 · 3/10 = 1/2 · 1/2 = 1/4</MathText>
              </div>
              <span className="text-xs text-muted-foreground mt-1 block">5 és 10 : 5; 3 és 6 : 3</span>
            </div>

            <div className="p-3.5 bg-purple-50/50 dark:bg-purple-950/30 rounded-xl border border-purple-200 dark:border-purple-800">
              <span className="font-bold text-purple-700 dark:text-purple-400 block mb-1 text-sm">3. Példa:</span>
              <div className="font-mono text-sm font-bold text-purple-800 dark:text-purple-200">
                <MathText>7/10 : 14/5 = 7/10 · 5/14 = 1/2 · 1/2 = 1/4</MathText>
              </div>
              <span className="text-xs text-muted-foreground mt-1 block">7 és 14 : 7; 5 és 10 : 5</span>
            </div>
          </div>
        </div>
      )
    },

    // 4. VEGYES TÖRTEK ÉS EGÉSZ SZÁMOK OSZTÁSA
    {
      id: 'mixed-div',
      title: '4. Vegyes törtek és egész számok osztása',
      icon: <Flame className="w-5 h-5 text-orange-500" />,
      content: (
        <div className="space-y-6 text-slate-700 dark:text-slate-300 leading-relaxed">
          <div className="p-4 bg-indigo-50/50 dark:bg-indigo-950/30 rounded-2xl border border-indigo-200 dark:border-indigo-800 space-y-3">
            <h5 className="font-bold text-indigo-900 dark:text-indigo-200 text-sm">
              A vegyes törtek osztásának 4 lépése:
            </h5>
            <ol className="list-decimal list-inside space-y-2 text-sm pl-1">
              <li>
                <strong>1. Lépés:</strong> Alakítsd át a vegyes számokat <strong>közönséges áltörtté</strong>!
              </li>
              <li>
                <strong>2. Lépés:</strong> Írd át a műveletet az osztó <strong>reciprokával való szorzássá</strong>!
              </li>
              <li>
                <strong>3. Lépés:</strong> Egyszerűsíts <strong>keresztbe</strong>, mielőtt szoroznál!
              </li>
              <li>
                <strong>4. Lépés:</strong> Végezd el a szorzást, és szükség esetén alakítsd vissza vegyes törtté!
              </li>
            </ol>
          </div>

          <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 text-center space-y-3 shadow-sm">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Mintapélda vegyes törttel</span>
            <div className="font-mono text-lg font-bold text-indigo-700 dark:text-indigo-300">
              <MathText>2 1/2 : 1 1/4 = 5/2 : 5/4 = 5/2 · 4/5 = 1/1 · 2/1 = 2</MathText>
            </div>
          </div>

          <div className="p-4 bg-amber-50/60 dark:bg-amber-950/30 rounded-2xl border border-amber-200 dark:border-amber-800 space-y-2">
            <span className="font-bold text-amber-800 dark:text-amber-300 text-sm block">
              Egész szám osztása törttel:
            </span>
            <p className="text-sm">
              Az egész számot törtként (<MathText>6 = 6/1</MathText>) kezeljük, majd megszorozzuk a tört reciprokával:
            </p>
            <div className="font-mono text-base font-bold text-center text-amber-900 dark:text-amber-200 pt-1">
              <MathText>6 : 2/3 = 6/1 · 3/2 = 3/1 · 3/1 = 9</MathText>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <TheoryTemplate
      title="Osztás törttel"
      subtitle="Tört osztása egész számmal és törttel, a reciprokkal való szorzás aranyszabálya, keresztbe egyszerűsítés és vegyes törtek osztása."
      badge="➗ 6. Osztály • II. Törtek"
      quickRule={{
        label: 'Osztási alapszabály',
        formula: 'a/b : c/d = a/b · d/c = (a · d)/(b · c)'
      }}
      themeColor="indigo"
      sections={sections}
      topicId="g6-fraction-division-theory"
      pdfFilename="6_osztaly_osztas_torttel_tananyag.pdf"
      onBack={onBack}
      onSwitchToQuiz={onSwitchToQuiz}
    />
  );
}

export default FractionDivisionTheory;
