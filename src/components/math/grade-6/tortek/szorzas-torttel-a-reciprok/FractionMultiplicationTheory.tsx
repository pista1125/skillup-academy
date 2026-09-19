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
  Grid
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface FractionMultiplicationTheoryProps {
  onBack?: () => void;
  onSwitchToQuiz?: () => void;
}

export function FractionMultiplicationTheory({
  onBack,
  onSwitchToQuiz
}: FractionMultiplicationTheoryProps) {
  // Workshop 1: Area model / Fraction multiplier
  const [f1Num, setF1Num] = useState<number>(2);
  const [f1Den, setF1Den] = useState<number>(3);
  const [f2Num, setF2Num] = useState<number>(3);
  const [f2Den, setF2Den] = useState<number>(4);

  // Workshop 2: Reciprocal explorer
  const [recipType, setRecipType] = useState<'fraction' | 'whole' | 'mixed'>('fraction');
  const [rNum, setRNum] = useState<number>(3);
  const [rDen, setRDen] = useState<number>(5);
  const [rWhole, setRWhole] = useState<number>(1);

  // Helper gcd
  const gcd = (a: number, b: number): number => {
    return b === 0 ? a : gcd(b, a % b);
  };

  // Workshop 1 computations
  const rawNum = f1Num * f2Num;
  const rawDen = f1Den * f2Den;
  const crossGcd1 = gcd(f1Num, f2Den); // a and d
  const crossGcd2 = gcd(f2Num, f1Den); // c and b
  const simpF1Num = f1Num / crossGcd1;
  const simpF2Den = f2Den / crossGcd1;
  const simpF2Num = f2Num / crossGcd2;
  const simpF1Den = f1Den / crossGcd2;
  const finalNum = simpF1Num * simpF2Num;
  const finalDen = simpF1Den * simpF2Den;
  const overallGcd = gcd(finalNum, finalDen);
  const irreducibleNum = finalNum / overallGcd;
  const irreducibleDen = finalDen / overallGcd;

  // Workshop 2 computations
  let improperNum = rNum;
  let improperDen = rDen;
  if (recipType === 'whole') {
    improperNum = rWhole;
    improperDen = 1;
  } else if (recipType === 'mixed') {
    improperNum = rWhole * rDen + rNum;
    improperDen = rDen;
  }
  const recipNum = improperDen;
  const recipDen = improperNum;

  const sections: TheorySection[] = [
    // 1. TÖRT SZORZÁSA EGÉSZ SZÁMMAL
    {
      id: 'mult-whole',
      title: '1. Tört szorzása egész számmal',
      icon: <Calculator className="w-5 h-5 text-amber-500" />,
      content: (
        <div className="space-y-6 text-slate-700 dark:text-slate-300 leading-relaxed">
          <p>
            Már 5. osztályban megtanultuk, hogy a szorzás azonos tagok ismételt összeadása. Ha például a{' '}
            <MathText>2/7</MathText> törtet megszorozzuk <MathText>3</MathText>-mal, az azt jelenti, hogy 3 darab{' '}
            <MathText>2/7</MathText>-es részt veszünk:
          </p>

          <div className="p-4 bg-amber-50/70 dark:bg-amber-950/30 rounded-2xl border border-amber-200 dark:border-amber-800 text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              Szemléltetés összeadással
            </span>
            <div className="font-mono text-lg font-bold text-amber-800 dark:text-amber-200">
              <MathText>2/7 · 3 = 2/7 + 2/7 + 2/7 = (2 + 2 + 2)/7 = 6/7</MathText>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-indigo-50/50 dark:bg-indigo-950/30 rounded-xl border border-indigo-200 dark:border-indigo-800 space-y-2">
              <div className="flex items-center gap-2 font-bold text-indigo-700 dark:text-indigo-400">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>1. Módszer: Számláló szorzása</span>
              </div>
              <p className="text-sm">
                A számlálót megszorozzuk az egész számmal, a nevező változatlan marad:
              </p>
              <div className="p-2.5 bg-white dark:bg-slate-900 rounded-lg text-center font-bold font-mono text-indigo-600 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900">
                <MathText>a/b · n = (a · n)/b  (pl. 3/8 · 2 = 6/8 = 3/4)</MathText>
              </div>
            </div>

            <div className="p-4 bg-purple-50/50 dark:bg-purple-950/30 rounded-xl border border-purple-200 dark:border-purple-800 space-y-2">
              <div className="flex items-center gap-2 font-bold text-purple-700 dark:text-purple-400">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>2. Módszer: Nevező osztása (Gyorsabb!)</span>
              </div>
              <p className="text-sm">
                Ha a nevező osztható a számmal, egyszerűbb a nevezőt elosztani vele:
              </p>
              <div className="p-2.5 bg-white dark:bg-slate-900 rounded-lg text-center font-bold font-mono text-purple-600 dark:text-purple-300 border border-purple-100 dark:border-purple-900">
                <MathText>a/b · n = a/(b : n)  (pl. 3/8 · 2 = 3/(8 : 2) = 3/4)</MathText>
              </div>
            </div>
          </div>
        </div>
      )
    },

    // 2. TÖRT SZORZÁSA TÖRTTEL ÉS A TERÜLETI MODELL
    {
      id: 'mult-fractions',
      title: '2. Tört szorzása törttel (A fő szabály)',
      icon: <Grid className="w-5 h-5 text-blue-500" />,
      content: (
        <div className="space-y-6 text-slate-700 dark:text-slate-300 leading-relaxed">
          <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/40 rounded-2xl border border-blue-200 dark:border-blue-800 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" /> Az aranyszabály
            </span>
            <p className="text-base font-semibold">
              Törtet törttel úgy szorzunk, hogy a <strong>számlálót a számlálóval</strong>, a <strong>nevezőt pedig a nevezővel</strong> szorozzuk össze:
            </p>
            <div className="p-3 bg-white dark:bg-slate-900 rounded-xl text-center font-mono text-xl font-extrabold text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-900 shadow-sm">
              <MathText>a/b · c/d = (a · c)/(b · d)  (b ≠ 0, d ≠ 0)</MathText>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-500" />
              Miért így működik? A területi szemléltetés (Area Model)
            </h4>
            <p>
              Képzeljünk el egy 1 × 1-es négyzetet (területe = 1). Ha meg akarjuk határozni például a{' '}
              <MathText>2/3 · 3/4</MathText> szorzatot:
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm pl-2">
              <li>A négyzet szélességét felosztjuk <strong>3 egyenlő oszlopra</strong>, és veszünk <strong>2 oszlopot</strong> (<MathText>2/3</MathText>).</li>
              <li>A magasságát felosztjuk <strong>4 egyenlő sorra</strong>, és veszünk <strong>3 sort</strong> (<MathText>3/4</MathText>).</li>
              <li>A teljes négyzet <strong>3 · 4 = 12</strong> kis téglalapra oszlott, az átfedés pedig <strong>2 · 3 = 6</strong> kis téglalap.</li>
              <li>Az átfedő terület tehát: <MathText>6/12 = 1/2</MathText> része a teljes egységnek!</li>
            </ul>
          </div>

          {/* Vizuális Rács Szemléltető */}
          <div className="p-4 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-slate-800 dark:text-slate-200 flex items-center gap-2">
                <Target className="w-4 h-4 text-emerald-500" />
                Interaktív Területi Szorzó Modell
              </span>
              <span className="text-xs text-muted-foreground">Próbáld ki a csúszkákkal!</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <label className="text-xs text-muted-foreground block mb-1">1. Tört számláló ({f1Num})</label>
                <input
                  type="range"
                  min="1"
                  max={f1Den}
                  value={f1Num}
                  onChange={(e) => setF1Num(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground block mb-1">1. Tört nevező ({f1Den})</label>
                <input
                  type="range"
                  min="2"
                  max="6"
                  value={f1Den}
                  onChange={(e) => {
                    const newDen = parseInt(e.target.value);
                    setF1Den(newDen);
                    if (f1Num > newDen) setF1Num(newDen);
                  }}
                  className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground block mb-1">2. Tört számláló ({f2Num})</label>
                <input
                  type="range"
                  min="1"
                  max={f2Den}
                  value={f2Num}
                  onChange={(e) => setF2Num(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground block mb-1">2. Tört nevező ({f2Den})</label>
                <input
                  type="range"
                  min="2"
                  max="6"
                  value={f2Den}
                  onChange={(e) => {
                    const newDen = parseInt(e.target.value);
                    setF2Den(newDen);
                    if (f2Num > newDen) setF2Num(newDen);
                  }}
                  className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
              </div>
            </div>

            {/* Mátrix rács */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-2">
              <div
                className="grid gap-1 p-2 bg-white dark:bg-slate-950 rounded-xl border border-slate-300 dark:border-slate-700 shadow-inner"
                style={{
                  gridTemplateColumns: `repeat(${f1Den}, minmax(0, 1fr))`,
                  width: '180px',
                  height: '180px'
                }}
              >
                {Array.from({ length: f2Den }).map((_, rowIndex) =>
                  Array.from({ length: f1Den }).map((_, colIndex) => {
                    const inF1 = colIndex < f1Num;
                    const inF2 = rowIndex < f2Num;
                    const isOverlap = inF1 && inF2;

                    return (
                      <div
                        key={`${rowIndex}-${colIndex}`}
                        className={cn(
                          'rounded-sm border border-slate-200/50 dark:border-slate-800 flex items-center justify-center transition-all duration-300',
                          isOverlap
                            ? 'bg-emerald-500 text-white font-bold text-xs shadow-sm scale-[0.98]'
                            : inF1
                            ? 'bg-blue-300 dark:bg-blue-900/60'
                            : inF2
                            ? 'bg-indigo-300 dark:bg-indigo-900/60'
                            : 'bg-slate-100 dark:bg-slate-900'
                        )}
                      />
                    );
                  })
                )}
              </div>

              <div className="space-y-2 text-center sm:text-left">
                <div className="text-xs text-muted-foreground">Kiszámított szorzat:</div>
                <div className="text-lg font-mono font-bold text-indigo-700 dark:text-indigo-300 flex items-center justify-center sm:justify-start gap-2">
                  <MathText>{`${f1Num}/${f1Den} · ${f2Num}/${f2Den} = ${rawNum}/${rawDen}`}</MathText>
                  {rawNum !== irreducibleNum && (
                    <span className="text-emerald-600 dark:text-emerald-400">
                      <MathText>{`= ${irreducibleNum}/${irreducibleDen}`}</MathText>
                    </span>
                  )}
                </div>
                <div className="text-xs text-muted-foreground">
                  Zöld átfedő rész: <strong>{rawNum}</strong> db a(z) <strong>{rawDen}</strong> kis négyzetből.
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },

    // 3. KERESZTBE EGYSZERŰSÍTÉS
    {
      id: 'cross-cancel',
      title: '3. A keresztbe egyszerűsítés mesterfogása',
      icon: <ArrowRightLeft className="w-5 h-5 text-emerald-500" />,
      content: (
        <div className="space-y-6 text-slate-700 dark:text-slate-300 leading-relaxed">
          <p>
            Ha nagy számokkal dolgozunk, a számlálók és nevezők összeszorzása után nehéz és hosszadalmas lehet az egyszerűsítés. A jó hír az, hogy <strong>szorzás előtt keresztbe egyszerűsíthetünk</strong>!
          </p>

          <div className="p-4 bg-emerald-50/70 dark:bg-emerald-950/30 rounded-2xl border border-emerald-200 dark:border-emerald-800 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
              <Lightbulb className="w-4 h-4" /> Hogyan működik a keresztbe egyszerűsítés?
            </span>
            <p className="text-sm">
              Mivel a szorzás során egy közös törtvonal alá kerülnek a számlálók és nevezők (<MathText>(a · c)/(b · d)</MathText>), bármelyik felső számot egyszerűsíthetjük bármelyik alsó számmal a legnagyobb közös osztójukkal!
            </p>
          </div>

          <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
            <h5 className="font-bold text-sm text-slate-900 dark:text-white">Lépésről lépésre példa:</h5>
            <div className="font-mono text-center text-lg font-bold space-y-2 p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border">
              <div className="text-muted-foreground text-sm">Számítsuk ki:</div>
              <div className="text-indigo-600 dark:text-indigo-400">
                <MathText>3/4 · 8/9</MathText>
              </div>
              <div className="text-xs text-muted-foreground pt-1">
                Keresztbe egyszerűsítés: a 3 és 9 osztható 3-mal (1 és 3); a 8 és 4 osztható 4-gyel (2 és 1):
              </div>
              <div className="text-emerald-600 dark:text-emerald-400 pt-1">
                <MathText>1/1 · 2/3 = (1 · 2)/(1 · 3) = 2/3</MathText>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3.5 bg-blue-50/50 dark:bg-blue-950/30 rounded-xl border border-blue-200 dark:border-blue-800">
              <span className="font-bold text-blue-700 dark:text-blue-400 block mb-1 text-sm">2. Példa:</span>
              <div className="font-mono text-sm font-bold text-blue-800 dark:text-blue-200">
                <MathText>5/6 · 3/10 = 1/2 · 1/2 = 1/4</MathText>
              </div>
              <span className="text-xs text-muted-foreground mt-1 block">5 és 10 : 5; 3 és 6 : 3</span>
            </div>

            <div className="p-3.5 bg-purple-50/50 dark:bg-purple-950/30 rounded-xl border border-purple-200 dark:border-purple-800">
              <span className="font-bold text-purple-700 dark:text-purple-400 block mb-1 text-sm">3. Példa:</span>
              <div className="font-mono text-sm font-bold text-purple-800 dark:text-purple-200">
                <MathText>7/12 · 4/21 = 1/3 · 1/3 = 1/9</MathText>
              </div>
              <span className="text-xs text-muted-foreground mt-1 block">7 és 21 : 7; 4 és 12 : 4</span>
            </div>
          </div>
        </div>
      )
    },

    // 4. VEGYES TÖRTEK SZORZÁSA
    {
      id: 'mixed-fractions',
      title: '4. Vegyes törtek szorzása',
      icon: <Flame className="w-5 h-5 text-orange-500" />,
      content: (
        <div className="space-y-6 text-slate-700 dark:text-slate-300 leading-relaxed">
          <div className="p-4 bg-red-50/60 dark:bg-red-950/30 rounded-2xl border border-red-200 dark:border-red-800 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-400 flex items-center gap-1.5">
              <X className="w-4 h-4" /> Gyakori hiba, amit kerülni kell!
            </span>
            <p className="text-sm font-medium">
              Vegyes törteknél <strong>TILOS</strong> külön-külön megszorozni az egészeket és a törteket! Pl.{' '}
              <MathText>1 1/2 · 1 1/3 ≠ 1 1/6</MathText>!
            </p>
          </div>

          <div className="p-4 bg-indigo-50/50 dark:bg-indigo-950/30 rounded-2xl border border-indigo-200 dark:border-indigo-800 space-y-3">
            <h5 className="font-bold text-indigo-900 dark:text-indigo-200 text-sm">
              A helyes módszer 3 lépése:
            </h5>
            <ol className="list-decimal list-inside space-y-2 text-sm pl-1">
              <li>
                <strong>1. Lépés:</strong> Alakítsd át a vegyes törteket <strong>közönséges áltörtté</strong>!
              </li>
              <li>
                <strong>2. Lépés:</strong> Egyszerűsíts <strong>keresztbe</strong>, ha lehetséges!
              </li>
              <li>
                <strong>3. Lépés:</strong> Szorozd össze a számlálókat és a nevezőket, majd ha áltört jön ki, váltsd vissza <strong>vegyes törtté</strong>!
              </li>
            </ol>
          </div>

          <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 text-center space-y-3 shadow-sm">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Mintapélda</span>
            <div className="font-mono text-lg font-bold text-indigo-700 dark:text-indigo-300">
              <MathText>1 1/2 · 1 1/3 = 3/2 · 4/3 = 1/1 · 2/1 = 2/1 = 2</MathText>
            </div>
            <div className="font-mono text-lg font-bold text-purple-700 dark:text-purple-300 pt-2 border-t border-slate-100 dark:border-slate-800">
              <MathText>2 1/4 · 2/3 = 9/4 · 2/3 = 3/2 · 1/1 = 3/2 = 1 1/2</MathText>
            </div>
          </div>
        </div>
      )
    },

    // 5. A RECIPROK FOGALMA ÉS TULAJDONSÁGAI
    {
      id: 'reciprocal',
      title: '5. A reciprok fogalma és tulajdonságai',
      icon: <Sparkles className="w-5 h-5 text-amber-500" />,
      content: (
        <div className="space-y-6 text-slate-700 dark:text-slate-300 leading-relaxed">
          <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/40 dark:to-orange-950/40 rounded-2xl border border-amber-200 dark:border-amber-800 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
              A reciprok definíciója
            </span>
            <p className="text-base font-semibold text-slate-900 dark:text-white">
              Egy nullától különböző szám <strong>reciproka</strong> (vagy multiplikatív inverze) az a szám, amellyel megszorozva a szorzat <strong>1</strong>-gyel egyenlő:
            </p>
            <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl text-center font-mono text-xl font-bold text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-900">
              <MathText>x · 1/x = 1  illetve  a/b · b/a = 1</MathText>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-xl border border-blue-200 dark:border-blue-800 space-y-1">
              <span className="font-bold text-blue-700 dark:text-blue-400 text-sm">Közönséges tört</span>
              <p className="text-xs">Felcseréljük a számlálót és a nevezőt:</p>
              <div className="font-mono text-sm font-bold text-center pt-1">
                <MathText>3/5 ➔ 5/3</MathText>
              </div>
            </div>

            <div className="p-3 bg-indigo-50 dark:bg-indigo-950/30 rounded-xl border border-indigo-200 dark:border-indigo-800 space-y-1">
              <span className="font-bold text-indigo-700 dark:text-indigo-400 text-sm">Egész szám</span>
              <p className="text-xs">Törtként írjuk (<MathText>7 = 7/1</MathText>), majd megfordítjuk:</p>
              <div className="font-mono text-sm font-bold text-center pt-1">
                <MathText>7 ➔ 1/7</MathText>
              </div>
            </div>

            <div className="p-3 bg-purple-50 dark:bg-purple-950/30 rounded-xl border border-purple-200 dark:border-purple-800 space-y-1">
              <span className="font-bold text-purple-700 dark:text-purple-400 text-sm">Vegyes tört</span>
              <p className="text-xs">Áltörtté alakítjuk, majd megfordítjuk:</p>
              <div className="font-mono text-sm font-bold text-center pt-1">
                <MathText>1 2/3 = 5/3 ➔ 3/5</MathText>
              </div>
            </div>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
            <h5 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
              <Lightbulb className="w-4 h-4 text-amber-500" />
              Fontos észrevételek a reciprok kapcsán:
            </h5>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground pl-2">
              <li>A <strong>0-nak nincs reciproka</strong> (0-val való osztás és szorzás nem adhat 1-et).</li>
              <li>Az <strong>1 reciproka önmaga (1)</strong>, mert <MathText>1 · 1 = 1</MathText>.</li>
              <li>Ha egy szám 1-nél nagyobb, a reciproka 1-nél kisebb (pl. <MathText>2 ➔ 1/2</MathText>).</li>
              <li>Ha egy szám 0 és 1 közé esik, a reciproka 1-nél nagyobb (pl. <MathText>1/4 ➔ 4</MathText>).</li>
            </ul>
          </div>

          {/* Interaktív Reciprok Kalkulátor */}
          <div className="p-4 bg-white dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <ArrowRightLeft className="w-4 h-4 text-indigo-500" />
                Interaktív Reciprok Generátor
              </span>
              <div className="flex gap-1 bg-slate-100 dark:bg-slate-900 p-0.5 rounded-lg text-xs">
                <button
                  onClick={() => setRecipType('fraction')}
                  className={cn('px-2.5 py-1 rounded-md transition-all font-medium', recipType === 'fraction' ? 'bg-white dark:bg-slate-800 shadow text-indigo-600' : 'text-muted-foreground')}
                >
                  Tört
                </button>
                <button
                  onClick={() => setRecipType('whole')}
                  className={cn('px-2.5 py-1 rounded-md transition-all font-medium', recipType === 'whole' ? 'bg-white dark:bg-slate-800 shadow text-indigo-600' : 'text-muted-foreground')}
                >
                  Egész
                </button>
                <button
                  onClick={() => setRecipType('mixed')}
                  className={cn('px-2.5 py-1 rounded-md transition-all font-medium', recipType === 'mixed' ? 'bg-white dark:bg-slate-800 shadow text-indigo-600' : 'text-muted-foreground')}
                >
                  Vegyes
                </button>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 py-2">
              {recipType === 'whole' && (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">Egész szám:</span>
                  <input
                    type="number"
                    min="1"
                    max="50"
                    value={rWhole}
                    onChange={(e) => setRWhole(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-16 px-2 py-1 border rounded-md text-center font-mono font-bold text-sm bg-white dark:bg-slate-900"
                  />
                </div>
              )}

              {recipType === 'fraction' && (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">Tört:</span>
                  <div className="flex flex-col items-center gap-1">
                    <input
                      type="number"
                      min="1"
                      max="30"
                      value={rNum}
                      onChange={(e) => setRNum(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-14 px-1 py-0.5 border rounded text-center font-mono font-bold text-xs bg-white dark:bg-slate-900"
                    />
                    <div className="w-14 h-0.5 bg-slate-400" />
                    <input
                      type="number"
                      min="1"
                      max="30"
                      value={rDen}
                      onChange={(e) => setRDen(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-14 px-1 py-0.5 border rounded text-center font-mono font-bold text-xs bg-white dark:bg-slate-900"
                    />
                  </div>
                </div>
              )}

              {recipType === 'mixed' && (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">Vegyes tört:</span>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={rWhole}
                    onChange={(e) => setRWhole(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-12 px-1 py-1 border rounded text-center font-mono font-bold text-sm bg-white dark:bg-slate-900"
                  />
                  <div className="flex flex-col items-center gap-1">
                    <input
                      type="number"
                      min="1"
                      max="20"
                      value={rNum}
                      onChange={(e) => setRNum(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-12 px-1 py-0.5 border rounded text-center font-mono font-bold text-xs bg-white dark:bg-slate-900"
                    />
                    <div className="w-12 h-0.5 bg-slate-400" />
                    <input
                      type="number"
                      min="2"
                      max="20"
                      value={rDen}
                      onChange={(e) => setRDen(Math.max(2, parseInt(e.target.value) || 2))}
                      className="w-12 px-1 py-0.5 border rounded text-center font-mono font-bold text-xs bg-white dark:bg-slate-900"
                    />
                  </div>
                </div>
              )}

              <div className="text-2xl text-muted-foreground font-light px-2">➔</div>

              <div className="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-xl border border-amber-200 dark:border-amber-800 text-center space-y-1">
                <span className="text-xs font-bold text-amber-700 dark:text-amber-400 block">Reciprok érték</span>
                <div className="font-mono text-lg font-bold text-amber-800 dark:text-amber-200">
                  <MathText>{`${recipNum}/${recipDen}`}</MathText>
                  {recipDen === 1 && <span className="ml-1 text-sm font-normal">(= {recipNum})</span>}
                </div>
                <div className="text-[10px] text-muted-foreground">
                  Ellenőrzés: <MathText>{`${improperNum}/${improperDen} · ${recipNum}/${recipDen} = 1`}</MathText>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <TheoryTemplate
      title="Szorzás törttel, a reciprok"
      subtitle="Tört szorzása egész számmal és törttel, a területi modell, a keresztbe egyszerűsítés mesterfogása és a reciprokképzés szabályai."
      badge="✖️ 6. Osztály • II. Törtek"
      quickRule={{
        label: 'Szorzás & Reciprok',
        formula: 'a/b · c/d = (a · c)/(b · d) | a/b · b/a = 1'
      }}
      themeColor="blue"
      sections={sections}
      topicId="g6-fraction-multiplication-theory"
      pdfFilename="6_osztaly_szorzas_torttel_a_reciprok_tananyag.pdf"
      onBack={onBack}
      onSwitchToQuiz={onSwitchToQuiz}
    />
  );
}

export default FractionMultiplicationTheory;
