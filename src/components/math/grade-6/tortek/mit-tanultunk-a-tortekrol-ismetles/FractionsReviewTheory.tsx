import React, { useState } from 'react';
import { TheoryTemplate, TheorySection } from '../TheoryTemplate';
import { MathText } from '@/components/math/shared/MathText';
import { Card, CardContent } from '@/components/ui/card';
import {
  PieChart,
  Layers,
  ArrowRightLeft,
  Divide,
  Calculator,
  CheckCircle2,
  Sparkles,
  Lightbulb,
  Plus,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface FractionsReviewTheoryProps {
  onBack?: () => void;
  onSwitchToQuiz?: () => void;
}

export function FractionsReviewTheory({
  onBack,
  onSwitchToQuiz
}: FractionsReviewTheoryProps) {
  // Workshop 1: Fraction Visualizer & Simplifier state
  const [num, setNum] = useState<number>(3);
  const [den, setDen] = useState<number>(4);

  // Workshop 2: Common Denominator & Addition step-by-step state
  const [f1Num, setF1Num] = useState<number>(1);
  const [f1Den, setF1Den] = useState<number>(2);
  const [f2Num, setF2Num] = useState<number>(1);
  const [f2Den, setF2Den] = useState<number>(3);

  // Helper gcd & lcm
  const gcd = (a: number, b: number): number => {
    return b === 0 ? a : gcd(b, a % b);
  };
  const lcm = (a: number, b: number): number => {
    return (a * b) / gcd(a, b);
  };

  const currentGcd = gcd(num, den);
  const simpNum = num / currentGcd;
  const simpDen = den / currentGcd;
  const isProper = num < den;
  const isWhole = num % den === 0;
  const wholePart = Math.floor(num / den);
  const remainderNum = num % den;

  // Workshop 2 computations
  const commonDen = lcm(f1Den, f2Den);
  const mult1 = commonDen / f1Den;
  const mult2 = commonDen / f2Den;
  const expanded1Num = f1Num * mult1;
  const expanded2Num = f2Num * mult2;
  const sumNum = expanded1Num + expanded2Num;
  const sumGcd = gcd(sumNum, commonDen);
  const finalSumNum = sumNum / sumGcd;
  const finalSumDen = commonDen / sumGcd;

  const sections: TheorySection[] = [
    // 1. SZAKASZ: A TÖRT FOGALMA ÉS ÉRTELMEZÉSE
    {
      id: 'sec-concept',
      title: '1. A tört fogalma, felépítése és típusai',
      icon: <PieChart className="w-5 h-5 text-amber-500" />,
      content: (
        <div className="space-y-6">
          <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
            Az 5. osztályban megtanultuk, hogy ha egy egészet <strong>egyenlő részekre</strong> osztunk,
            akkor <strong>törteket</strong> kapunk. A törtvonal mindig <strong>osztást</strong> jelent!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border-2 border-amber-200 dark:border-amber-800 bg-amber-50/40 dark:bg-amber-950/20">
              <CardContent className="p-4 space-y-2">
                <div className="text-xs font-black uppercase text-amber-600 dark:text-amber-400">
                  Számláló (felső szám)
                </div>
                <div className="text-xl font-bold font-mono text-slate-900 dark:text-white">
                  <MathText>a</MathText>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Megmutatja, hogy a kijelölt egyenlő részekből <strong>hány darabot vettünk</strong>.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-purple-200 dark:border-purple-800 bg-purple-50/40 dark:bg-purple-950/20">
              <CardContent className="p-4 space-y-2">
                <div className="text-xs font-black uppercase text-purple-600 dark:text-purple-400">
                  Törtvonal (osztásjel)
                </div>
                <div className="text-xl font-bold font-mono text-slate-900 dark:text-white">
                  <MathText>a/b = a : b</MathText>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  A törtvonal műveleti szempontból pontosan egy <strong>osztásnak</strong> felel meg!
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-blue-200 dark:border-blue-800 bg-blue-50/40 dark:bg-blue-950/20">
              <CardContent className="p-4 space-y-2">
                <div className="text-xs font-black uppercase text-blue-600 dark:text-blue-400">
                  Nevező (alsó szám)
                </div>
                <div className="text-xl font-bold font-mono text-slate-900 dark:text-white">
                  <MathText>b (b ≠ 0)</MathText>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Megmutatja, <strong>hány egyenlő részre osztottuk</strong> az 1 egészet. Nullával nem osztunk!
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Törtek fajtái */}
          <div className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              Törtek csoportosítása értékük szerint:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs sm:text-sm">
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl border border-emerald-200 dark:border-emerald-800 space-y-1">
                <span className="font-bold text-emerald-700 dark:text-emerald-400">Valódi tört (&lt; 1)</span>
                <p className="text-slate-600 dark:text-slate-300">A számláló kisebb a nevezőnél.</p>
                <div className="font-mono font-bold text-emerald-800 dark:text-emerald-300 pt-1">
                  <MathText>2/5,  3/4,  7/10</MathText>
                </div>
              </div>

              <div className="p-3 bg-amber-50 dark:bg-amber-950/30 rounded-xl border border-amber-200 dark:border-amber-800 space-y-1">
                <span className="font-bold text-amber-700 dark:text-amber-400">Áltört (≥ 1)</span>
                <p className="text-slate-600 dark:text-slate-300">A számláló egyenlő vagy nagyobb a nevezőnél.</p>
                <div className="font-mono font-bold text-amber-800 dark:text-amber-300 pt-1">
                  <MathText>4/4 = 1,  7/4,  11/3</MathText>
                </div>
              </div>

              <div className="p-3 bg-purple-50 dark:bg-purple-950/30 rounded-xl border border-purple-200 dark:border-purple-800 space-y-1">
                <span className="font-bold text-purple-700 dark:text-purple-400">Vegyes tört</span>
                <p className="text-slate-600 dark:text-slate-300">Egész számból és valódi törtből áll.</p>
                <div className="font-mono font-bold text-purple-800 dark:text-purple-300 pt-1">
                  <MathText>7/4 = 1 3/4,  11/3 = 3 2/3</MathText>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },

    // 2. SZAKASZ: BŐVÍTÉS ÉS EGYSZERŰSÍTÉS (INTERAKTÍV MŰHELY)
    {
      id: 'sec-expand-simplify',
      title: '2. Bővítés, egyszerűsítés és a legkisebb alak',
      icon: <ArrowRightLeft className="w-5 h-5 text-indigo-500" />,
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800 space-y-2">
              <div className="text-xs font-black uppercase text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
                <Plus className="w-3.5 h-3.5" /> Bővítés
              </div>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                A számlálót és a nevezőt is <strong>ugyanazzal a nullától különböző egész számmal szorozzuk</strong>.
                A tört értéke <strong>nem változik</strong>!
              </p>
              <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl font-mono text-center font-bold text-indigo-700 dark:text-indigo-300 border">
                <MathText>2/3 = (2 · 4)/(3 · 4) = 8/12</MathText>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 space-y-2">
              <div className="text-xs font-black uppercase text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                <Divide className="w-3.5 h-3.5" /> Egyszerűsítés
              </div>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                A számlálót és a nevezőt is <strong>ugyanazzal a közös osztóval osztjuk</strong>.
                Ha a számláló és nevező relatív prímek (<MathText>lnko = 1</MathText>), a tört <strong>tovább nem egyszerűsíthető</strong>!
              </p>
              <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl font-mono text-center font-bold text-emerald-700 dark:text-emerald-300 border">
                <MathText>18/24 = (18 : 6)/(24 : 6) = 3/4</MathText>
              </div>
            </div>
          </div>

          {/* Interaktív Tört-Labor */}
          <div className="bg-gradient-to-br from-indigo-500/10 via-amber-500/5 to-purple-500/10 border-2 border-indigo-200 dark:border-indigo-800/80 rounded-2xl p-4 sm:p-5 space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Calculator className="w-4 h-4 text-indigo-500" />
                  Interaktív Tört-Laboratórium
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Állítsd be a számlálót és nevezőt, nézd meg a vizuális modellt és az egyszerűsített alakot!
                </p>
              </div>
            </div>

            {/* Vezérlők */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                <div className="flex justify-between text-xs font-bold text-slate-600 dark:text-slate-300">
                  <span>Számláló (<MathText>a</MathText>): {num}</span>
                  <span className="text-amber-600 font-bold">{num} rész</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="24"
                  value={num}
                  onChange={(e) => setNum(parseInt(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer"
                />
              </div>

              <div className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                <div className="flex justify-between text-xs font-bold text-slate-600 dark:text-slate-300">
                  <span>Nevező (<MathText>b</MathText>): {den}</span>
                  <span className="text-blue-600 font-bold">{den} egyenlő rész</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="24"
                  value={den}
                  onChange={(e) => setDen(parseInt(e.target.value))}
                  className="w-full accent-blue-500 cursor-pointer"
                />
              </div>
            </div>

            {/* Eredmény kártya */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
              <div className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                <div className="text-[11px] font-bold text-slate-400 uppercase">Beállított tört</div>
                <div className="text-2xl font-black text-amber-600 dark:text-amber-400 font-mono my-1">
                  <MathText size="xl">{`${num}/${den}`}</MathText>
                </div>
                <div className="text-xs text-slate-500">
                  {isProper ? 'Valódi tört' : isWhole ? 'Egész szám' : 'Áltört / Vegyes tört'}
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                <div className="text-[11px] font-bold text-slate-400 uppercase">Legkisebb alak (LNKO: {currentGcd})</div>
                <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono my-1">
                  <MathText size="xl">{`${simpNum}/${simpDen}`}</MathText>
                </div>
                <div className="text-xs text-slate-500">
                  {currentGcd === 1 ? 'Már a legegyszerűbb alakban van' : `Egyszerűsítve ${currentGcd}-vel`}
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                <div className="text-[11px] font-bold text-slate-400 uppercase">Vegyes tört / Érték</div>
                <div className="text-lg font-black text-purple-600 dark:text-purple-400 font-mono my-1">
                  {num >= den ? (
                    remainderNum === 0 ? (
                      <MathText>{String(wholePart)}</MathText>
                    ) : (
                      <MathText>{`${wholePart} ${remainderNum}/${den}`}</MathText>
                    )
                  ) : (
                    <MathText>{`≈ ${(num / den).toFixed(3)}`}</MathText>
                  )}
                </div>
                <div className="text-xs text-slate-500">
                  Érték: {(num / den).toFixed(3)}
                </div>
              </div>
            </div>

            {/* Vizuális sáv modell */}
            <div className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="text-xs font-bold text-slate-500 dark:text-slate-400">
                Vizuális sáv modell (1 egység osztása {den} részre, kijelölve {num} rész):
              </div>
              <div className="w-full h-8 bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden border border-slate-300 dark:border-slate-700 flex">
                {Array.from({ length: Math.min(den, 36) }).map((_, i) => (
                  <div
                    key={i}
                    style={{ width: `${100 / Math.min(den, 36)}%` }}
                    className={cn(
                      'h-full border-r last:border-r-0 border-slate-300 dark:border-slate-700 transition-colors',
                      i < num
                        ? 'bg-amber-500 dark:bg-amber-600'
                        : 'bg-slate-200/50 dark:bg-slate-800'
                    )}
                  />
                ))}
              </div>
              {num > den && (
                <div className="text-[11px] text-amber-600 dark:text-amber-400 font-medium">
                  Megjegyzés: Mivel <MathText>{`${num} > ${den}`}</MathText>, a tört értéke 1-nél nagyobb ({Math.floor(num / den)} teljes egész és még <MathText>{`${num % den}/${den}`}</MathText>)!
                </div>
              )}
            </div>
          </div>
        </div>
      )
    },

    // 3. SZAKASZ: ÖSSZEADÁS ÉS KIVONÁS (KÖZÖS NEVEZŐ)
    {
      id: 'sec-add-sub',
      title: '3. Törtek összeadása és kivonása',
      icon: <Layers className="w-5 h-5 text-blue-500" />,
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-blue-50/50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 space-y-2">
              <h4 className="text-xs font-black uppercase text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> 1. Azonos nevezőjű törtek
              </h4>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                A <strong>számlálókat összeadjuk (vagy kivonjuk)</strong>, a <strong>nevezőt változatlanul hagyjuk</strong>.
              </p>
              <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl font-mono text-center font-bold text-blue-700 dark:text-blue-300 border text-xs sm:text-sm">
                <MathText>a/c ± b/c = (a ± b)/c</MathText>
                <div className="text-xs text-slate-500 mt-1 font-normal">
                  Példa: <MathText>3/7 + 2/7 = 5/7</MathText>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50/50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 space-y-2">
              <h4 className="text-xs font-black uppercase text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> 2. Különböző nevezőjű törtek
              </h4>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                1. Keressük meg a <strong>közös nevezőt</strong> (a nevezők legkisebb közös többszörösét - LKKT).<br />
                2. <strong>Bővítjük</strong> a törteket az új közös nevezőre.<br />
                3. Elvégezzük a számlálók műveletét, majd ha lehet, <strong>egyszerűsítünk</strong>!
              </p>
            </div>
          </div>

          {/* Interaktív Közös Nevező Műhely */}
          <div className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              Lépésről-lépésre Összeadó & Közös Nevező Kereső:
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-500">1. tört számláló:</label>
                <input
                  type="number"
                  min="1"
                  max="12"
                  value={f1Num}
                  onChange={(e) => setF1Num(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full p-2 rounded-lg border bg-slate-50 dark:bg-slate-800 font-mono font-bold"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-500">1. tört nevező:</label>
                <input
                  type="number"
                  min="2"
                  max="12"
                  value={f1Den}
                  onChange={(e) => setF1Den(Math.max(2, parseInt(e.target.value) || 2))}
                  className="w-full p-2 rounded-lg border bg-slate-50 dark:bg-slate-800 font-mono font-bold"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-500">2. tört számláló:</label>
                <input
                  type="number"
                  min="1"
                  max="12"
                  value={f2Num}
                  onChange={(e) => setF2Num(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full p-2 rounded-lg border bg-slate-50 dark:bg-slate-800 font-mono font-bold"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-500">2. tört nevező:</label>
                <input
                  type="number"
                  min="2"
                  max="12"
                  value={f2Den}
                  onChange={(e) => setF2Den(Math.max(2, parseInt(e.target.value) || 2))}
                  className="w-full p-2 rounded-lg border bg-slate-50 dark:bg-slate-800 font-mono font-bold"
                />
              </div>
            </div>

            {/* Számítás levezetése */}
            <div className="p-4 bg-slate-50 dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3">
              <div className="text-xs font-bold text-slate-500 dark:text-slate-400">
                Feladat: <MathText size="md">{`${f1Num}/${f1Den} + ${f2Num}/${f2Den}`}</MathText>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-2.5 bg-white dark:bg-slate-900 rounded-lg border">
                  <div className="font-bold text-amber-600">1. Közös nevező (LKKT)</div>
                  <div className="font-mono text-slate-800 dark:text-slate-200 mt-1">
                    <MathText>{`lkkt(${f1Den}, ${f2Den}) = ${commonDen}`}</MathText>
                  </div>
                </div>

                <div className="p-2.5 bg-white dark:bg-slate-900 rounded-lg border">
                  <div className="font-bold text-blue-600">2. Bővítés</div>
                  <div className="font-mono text-slate-800 dark:text-slate-200 mt-1">
                    <MathText>{`(${f1Num} · ${mult1})/${commonDen} + (${f2Num} · ${mult2})/${commonDen} = ${expanded1Num}/${commonDen} + ${expanded2Num}/${commonDen}`}</MathText>
                  </div>
                </div>

                <div className="p-2.5 bg-white dark:bg-slate-900 rounded-lg border">
                  <div className="font-bold text-emerald-600">3. Végeredmény</div>
                  <div className="font-mono text-slate-800 dark:text-slate-200 mt-1 font-black">
                    <MathText>{`= ${sumNum}/${commonDen} ${sumGcd > 1 ? `= ${finalSumNum}/${finalSumDen}` : ''}`}</MathText>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },

    // 4. SZAKASZ: SZORZÁS ÉS OSZTÁS EGÉSZ SZÁMMAL (5. OSZTÁLYOS ISMÉTLÉS)
    {
      id: 'sec-mult-div-whole',
      title: '4. Tört szorzása és osztása természetes számmal',
      icon: <X className="w-5 h-5 text-rose-500" />,
      content: (
        <div className="space-y-6">
          <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
            Az 5. osztályban megtanultuk a törtek természetes számmal való szorzásának és osztásának alapszabályait.
            6. osztályban ezekre építve fogjuk megtanulni a <strong>törttel való szorzást</strong> és <strong>osztást</strong>!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Szorzás egész számmal */}
            <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/30 border-2 border-amber-200 dark:border-amber-800 space-y-3">
              <div className="text-xs font-black uppercase text-amber-700 dark:text-amber-400 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" /> Tört szorzása egész számmal (· n)
              </div>
              <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 space-y-1.5">
                <p>Törtet egész számmal úgy szorzunk, hogy:</p>
                <ul className="list-disc pl-4 space-y-1">
                  <li><strong>A számlálót megszorozzuk</strong> a számmal, a nevezőt változatlanul hagyjuk: <MathText>a/b · n = (a · n)/b</MathText></li>
                  <li><strong>VAGY a nevezőt osztjuk</strong> a számmal (ha osztható): <MathText>a/b · n = a/(b : n)</MathText></li>
                </ul>
              </div>
              <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl font-mono text-center font-bold text-amber-700 dark:text-amber-300 border text-xs sm:text-sm">
                <MathText>3/8 · 2 = 3/(8 : 2) = 3/4</MathText>
                <div className="text-xs text-slate-500 font-normal mt-0.5">
                  vagy <MathText>(3 · 2)/8 = 6/8 = 3/4</MathText>
                </div>
              </div>
            </div>

            {/* Osztás egész számmal */}
            <div className="p-4 rounded-2xl bg-purple-50/60 dark:bg-purple-950/30 border-2 border-purple-200 dark:border-purple-800 space-y-3">
              <div className="text-xs font-black uppercase text-purple-700 dark:text-purple-400 flex items-center gap-1.5">
                <Divide className="w-4 h-4" /> Tört osztása egész számmal (: n)
              </div>
              <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 space-y-1.5">
                <p>Törtet egész számmal úgy osztunk, hogy:</p>
                <ul className="list-disc pl-4 space-y-1">
                  <li><strong>A számlálót elosztjuk</strong> a számmal (ha osztható): <MathText>a/b : n = (a : n)/b</MathText></li>
                  <li><strong>VAGY a nevezőt megszorozzuk</strong> a számmal: <MathText>a/b : n = a/(b · n)</MathText></li>
                </ul>
              </div>
              <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl font-mono text-center font-bold text-purple-700 dark:text-purple-300 border text-xs sm:text-sm">
                <MathText>6/7 : 3 = (6 : 3)/7 = 2/7</MathText>
                <div className="text-xs text-slate-500 font-normal mt-0.5">
                  és <MathText>3/4 : 2 = 3/(4 · 2) = 3/8</MathText>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },

    // 5. SZAKASZ: ÖSSZEFOGLALÓ KISOKOS ÉS TÍPUSHIBÁK
    {
      id: 'sec-summary-tips',
      title: '5. Gyors összefoglaló és tipikus hibák elkerülése',
      icon: <Lightbulb className="w-5 h-5 text-emerald-500" />,
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-rose-50/60 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800 space-y-2">
              <div className="text-xs font-black uppercase text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
                ⚠️ Gyakori típushiba!
              </div>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                <strong>HIBA:</strong> A nevezők összeadása összeadáskor:
              </p>
              <div className="p-2 bg-white dark:bg-slate-900 rounded-lg font-mono text-center text-xs text-rose-600 line-through border border-rose-200">
                <MathText>1/3 + 1/3 = 2/6</MathText> (HELYTELEN!)
              </div>
              <div className="p-2 bg-white dark:bg-slate-900 rounded-lg font-mono text-center text-xs text-emerald-600 font-bold border border-emerald-200">
                <MathText>1/3 + 1/3 = (1 + 1)/3 = 2/3</MathText> (HELYES!)
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 space-y-2">
              <div className="text-xs font-black uppercase text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                💡 Arany szabály
              </div>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                A végeredményt <strong>mindig egyszerűsítsd</strong> a lehető legkisebb alakra, és ha 1-nél nagyobb áltörtet kapsz, érdemes <strong>vegyes tört alakba</strong> is átírni!
              </p>
              <div className="p-2.5 bg-white dark:bg-slate-900 rounded-lg font-mono text-center text-xs text-emerald-700 dark:text-emerald-300 font-bold border">
                <MathText>10/8 = 5/4 = 1 1/4</MathText>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <TheoryTemplate
      title="Mit tanultunk a törtekről? Ismétlés"
      subtitle="5. osztályos törttani ismeretek átfogó felelevenítése és felkészülés a 6. osztályos új műveletekre."
      emoji="🍕"
      badgeText="🍕 6. Osztály • II. Törtek"
      quickRule={{
        label: 'Alapszabályok',
        formula: 'a/b = (a · k)/(b · k) | a/b ± c/b = (a ± c)/b'
      }}
      themeColor="amber"
      sections={sections}
      onBack={onBack}
      onSwitchToQuiz={onSwitchToQuiz}
      topicId="g6-fractions-review-theory"
      pdfFilename="6_osztaly_tortek_ismetles_tananyag.pdf"
    />
  );
}

export default FractionsReviewTheory;
