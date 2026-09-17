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
  ArrowRightLeft,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Calculator,
  Scale,
  Plus,
  Minus,
  Maximize2,
  Minimize2,
  TrendingUp,
  Layers
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { MathText } from '@/components/math/shared/MathText';

export interface FractionsExpandSimplifyTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

export function FractionsExpandSimplifyTheory({ onBack, onStartQuiz }: FractionsExpandSimplifyTheoryProps) {
  // Interactive Expanding/Simplifying State
  const [baseNum, setBaseNum] = useState<number>(2);
  const [baseDen, setBaseDen] = useState<number>(3);
  const [multiplier, setMultiplier] = useState<number>(3);

  // Interactive Fraction Comparator State
  const [compNum1, setCompNum1] = useState<number>(3);
  const [compDen1, setCompDen1] = useState<number>(4);
  const [compNum2, setCompNum2] = useState<number>(5);
  const [compDen2, setCompDen2] = useState<number>(6);

  // Expanded fraction values
  const expNum = baseNum * multiplier;
  const expDen = baseDen * multiplier;

  // Comparison logic
  const val1 = compDen1 > 0 ? compNum1 / compDen1 : 0;
  const val2 = compDen2 > 0 ? compNum2 / compDen2 : 0;

  // Common denominator calculation
  const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
  const lcm = (a: number, b: number): number => (a === 0 || b === 0 ? 0 : Math.abs(a * b) / gcd(a, b));
  const commonDen = lcm(compDen1, compDen2) || (compDen1 * compDen2);
  const factor1 = compDen1 > 0 ? commonDen / compDen1 : 1;
  const factor2 = compDen2 > 0 ? commonDen / compDen2 : 1;
  const expandedNum1 = compNum1 * factor1;
  const expandedNum2 = compNum2 * factor2;

  const compareResult = val1 > val2 ? '>' : val1 < val2 ? '<' : '=';
  const compareText = val1 > val2 ? 'nagyobb, mint' : val1 < val2 ? 'kisebb, mint' : 'pontosan megegyezik vele';

  return (
    <TheoryTemplate
      title="Törtek bővítése, egyszerűsítése, összehasonlítása"
      subtitle="Egyenértékű törtek előállítása, a legegyszerűbb alak megkeresése és törtek összevetése azonos vagy különböző nevezők esetén"
      documentId="fractions-expand-simplify-theory-content"
      pdfFilename="5_osztaly_tortek_bovitese_egyszerusitese_tananyag.pdf"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      themeColor="amber"
      badgeText="⚖️ 5. Osztály • II. Törtek, tizedes törtek"
      quickRule={{
        label: "Bővítés & Egyszerűsítés",
        formula: "Bővítés: (a·k)/(b·k) | Egyszerűsítés: (a:k)/(b:k) (k ≠ 0)"
      }}
      practiceTitle="Készen állsz a bővítés és egyszerűsítés gyakorlására?"
      practiceSubtitle="Tedd próbára tudásod a 3 szintű kvízben, a párosítóban vagy a csoportosítóban!"
    >
      {/* 1. SZAKASZ: EGYENLŐ ÉRTÉKŰ TÖRTEK ÉS A BŐVÍTÉS */}
      <TheorySection
        number={1}
        title="Egyenlő értékű törtek és a tört bővítése"
        icon={<Maximize2 className="w-5 h-5 text-orange-600 dark:text-orange-400" />}
        badgeColor="amber"
      >
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Gyakran előfordul, hogy ugyanazt a mennyiséget más-más törtalakban írjuk fel. Például fél tábla csokoládé pontosan ugyanannyi, mint 2 negyed tábla vagy 4 nyolcad tábla: <MathText>1/2 = 2/4 = 4/8</MathText>.
        </p>

        {/* Big Rule Box for Expanding */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white space-y-2 shadow-md">
          <div className="flex items-center gap-2 font-black text-sm uppercase tracking-wider">
            <Sparkles className="w-5 h-5 text-yellow-200" />
            <span>A Tört Bővítésének Szabálya</span>
          </div>
          <div className="text-xs sm:text-sm leading-relaxed">
            Egy törtet úgy <strong>bővítünk</strong>, hogy a számlálóját és a nevezőjét is <strong>ugyanazzal a nullától különböző számmal megszorozzuk</strong>. A tört értéke ekkor <strong>nem változik</strong>!
          </div>
          <div className="p-3 bg-white/10 rounded-xl text-center font-mono font-black text-base sm:text-lg tracking-wider border border-white/20">
            <MathText size="lg">a/b = (a · k)/(b · k) &nbsp;&nbsp;(k ≠ 0)</MathText>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
          <TheoryCard title="Példa: 2-vel való bővítés" badge="k = 2" variant="amber">
            <div className="text-center py-2 space-y-1">
              <div className="text-base sm:text-lg font-mono font-black text-orange-600 dark:text-orange-400">
                <MathText>3/4 = (3 · 2)/(4 · 2) = 6/8</MathText>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                A részek száma megduplázódott, de a kijelölt terület nagysága azonos maradt.
              </p>
            </div>
          </TheoryCard>

          <TheoryCard title="Példa: 3-mal való bővítés" badge="k = 3" variant="amber">
            <div className="text-center py-2 space-y-1">
              <div className="text-base sm:text-lg font-mono font-black text-orange-600 dark:text-orange-400">
                <MathText>2/5 = (2 · 3)/(5 · 3) = 6/15</MathText>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Mind a számlálót, mind a nevezőt pontoan 3-mal szoroztuk meg.
              </p>
            </div>
          </TheoryCard>

          <TheoryCard title="Példa: 5-tel való bővítés" badge="k = 5" variant="amber">
            <div className="text-center py-2 space-y-1">
              <div className="text-base sm:text-lg font-mono font-black text-orange-600 dark:text-orange-400">
                <MathText>1/2 = (1 · 5)/(2 · 5) = 5/10</MathText>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Így alakíthatjuk a közönséges törtet tizedes tört nevezőjűvé.
              </p>
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 2. SZAKASZ: A TÖRT EGYSZERŰSÍTÉSE ÉS A LEGEGYSZERŰBB ALAK */}
      <TheorySection
        number={2}
        title="A tört egyszerűsítése és a legegyszerűbb alak"
        icon={<Minimize2 className="w-5 h-5 text-orange-600 dark:text-orange-400" />}
        badgeColor="amber"
      >
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Az egyszerűsítés a bővítés megfordítása: nagyobb számlálójú és nevezőjű törtből állítunk elő kisebb számokkal felírt, de <strong>azonos értékű</strong> törtet.
        </p>

        {/* Big Rule Box for Simplifying */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white space-y-2 shadow-md">
          <div className="flex items-center gap-2 font-black text-sm uppercase tracking-wider">
            <Sparkles className="w-5 h-5 text-emerald-200" />
            <span>A Tört Egyszerűsítésének Szabálya</span>
          </div>
          <div className="text-xs sm:text-sm leading-relaxed">
            Egy törtet úgy <strong>egyszerűsítünk</strong>, hogy a számlálóját és a nevezőjét is <strong>elosztjuk egy közös osztójukkal</strong> (ugyanazzal a nullától különböző számmal).
          </div>
          <div className="p-3 bg-white/10 rounded-xl text-center font-mono font-black text-base sm:text-lg tracking-wider border border-white/20">
            <MathText size="lg">a/b = (a : k)/(b : k) &nbsp;&nbsp;(ahol k a számláló és nevező közös osztója)</MathText>
          </div>
        </div>

        {/* Irreducible / Simplest form */}
        <TheoryCard title="🌟 A tovább nem egyszerűsíthető (legegyszerűbb) alak" badge="Fontos cél" variant="emerald">
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            Egy tört akkor van a <strong>legegyszerűbb alakjában</strong>, ha a számlálójának és a nevezőjének az 1-en kívül <strong>nincs más közös osztója</strong> (a számláló és a nevező relatív prímek).
          </p>
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800 text-xs sm:text-sm text-emerald-900 dark:text-emerald-200">
            <strong>Példa:</strong> Egyszerűsítsük a <MathText>18/24</MathText> törtet a legegyszerűbb alakjáig!
            <div className="mt-1 font-mono font-bold text-center text-sm">
              <MathText>18/24 = (18 : 6)/(24 : 6) = 3/4</MathText>
            </div>
            <span className="text-[11px] text-slate-500 block text-center mt-0.5">
              (A 3-nak és a 4-nek már nincs 1-nél nagyobb közös osztója, így a <MathText>3/4</MathText> a legegyszerűbb alak.)
            </span>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 3. SZAKASZ: INTERAKTÍV BŐVÍTŐ ÉS EGYSZERŰSÍTŐ MŰHELY */}
      <TheorySection
        number={3}
        title="Interaktív Tört-Bővítő és Egyszerűsítő Műhely"
        icon={<Layers className="w-5 h-5 text-orange-600 dark:text-orange-400" />}
        badgeColor="amber"
      >
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Állítsd be az alaptörtet és a szorzót! Figyeld meg, hogyan változik a számláló és a nevező, miközben az érték és a beszínezett sáv aránya változatlan marad:
        </p>

        <div className="bg-slate-50/80 dark:bg-slate-850 p-5 sm:p-7 rounded-3xl border-2 border-orange-200 dark:border-slate-700 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Base Numerator */}
            <div className="p-3.5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-1.5">
              <span className="text-[11px] font-bold text-slate-500 uppercase">Kezdő Számláló</span>
              <div className="flex items-center justify-between">
                <Button size="sm" variant="outline" onClick={() => setBaseNum(Math.max(1, baseNum - 1))} className="h-7 w-7 p-0 rounded-lg">
                  <Minus className="w-3.5 h-3.5" />
                </Button>
                <span className="text-lg font-black font-mono text-orange-600 dark:text-orange-400">{baseNum}</span>
                <Button size="sm" variant="outline" onClick={() => setBaseNum(Math.min(baseDen - 1, baseNum + 1))} className="h-7 w-7 p-0 rounded-lg">
                  <Plus className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>

            {/* Base Denominator */}
            <div className="p-3.5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-1.5">
              <span className="text-[11px] font-bold text-slate-500 uppercase">Kezdő Nevező</span>
              <div className="flex items-center justify-between">
                <Button size="sm" variant="outline" onClick={() => setBaseDen(Math.max(baseNum + 1, baseDen - 1))} className="h-7 w-7 p-0 rounded-lg">
                  <Minus className="w-3.5 h-3.5" />
                </Button>
                <span className="text-lg font-black font-mono text-blue-600 dark:text-blue-400">{baseDen}</span>
                <Button size="sm" variant="outline" onClick={() => setBaseDen(Math.min(8, baseDen + 1))} className="h-7 w-7 p-0 rounded-lg">
                  <Plus className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>

            {/* Multiplier */}
            <div className="p-3.5 bg-white dark:bg-slate-900 rounded-2xl border border-amber-200 dark:border-slate-800 space-y-1.5">
              <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400 uppercase">Bővítés szorzója (k)</span>
              <div className="flex items-center justify-between">
                <Button size="sm" variant="outline" onClick={() => setMultiplier(Math.max(1, multiplier - 1))} className="h-7 w-7 p-0 rounded-lg">
                  <Minus className="w-3.5 h-3.5" />
                </Button>
                <span className="text-lg font-black font-mono text-amber-600 dark:text-amber-400">· {multiplier}</span>
                <Button size="sm" variant="outline" onClick={() => setMultiplier(Math.min(6, multiplier + 1))} className="h-7 w-7 p-0 rounded-lg">
                  <Plus className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          </div>

          {/* Visualization Bars */}
          <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-5">
            {/* Original Fraction Bar */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-bold text-slate-600 dark:text-slate-300">
                <span>Eredeti tört: <MathText size="md">{baseNum}/{baseDen}</MathText></span>
                <span className="font-mono text-slate-400">{baseNum} szelet a {baseDen}-ből</span>
              </div>
              <div className="w-full h-8 bg-slate-100 dark:bg-slate-800 rounded-xl overflow-hidden flex border-2 border-slate-300 dark:border-slate-700">
                {Array.from({ length: baseDen }).map((_, idx) => (
                  <div
                    key={idx}
                    className={cn(
                      "h-full flex-1 border-r last:border-r-0 border-white dark:border-slate-900 transition-colors flex items-center justify-center text-xs font-bold font-mono",
                      idx < baseNum ? "bg-orange-500 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-300"
                    )}
                  >
                    {idx < baseNum ? '1' : ''}
                  </div>
                ))}
              </div>
            </div>

            {/* Expanded Fraction Bar */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-bold text-amber-600 dark:text-amber-400">
                <span>Bővített tört ({multiplier}-szel): <MathText size="md">{expNum}/{expDen}</MathText></span>
                <span className="font-mono">{expNum} szelet a {expDen}-ből</span>
              </div>
              <div className="w-full h-8 bg-slate-100 dark:bg-slate-800 rounded-xl overflow-hidden flex border-2 border-amber-300 dark:border-amber-700">
                {Array.from({ length: expDen }).map((_, idx) => (
                  <div
                    key={idx}
                    className={cn(
                      "h-full flex-1 border-r last:border-r-0 border-white dark:border-slate-900 transition-colors flex items-center justify-center text-[10px] font-bold font-mono",
                      idx < expNum ? "bg-amber-500 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-300"
                    )}
                  >
                    {idx < expNum ? '•' : ''}
                  </div>
                ))}
              </div>
            </div>

            {/* Formula display */}
            <div className="p-3 bg-amber-50 dark:bg-slate-800 rounded-xl text-center font-mono font-bold text-xs sm:text-sm text-amber-900 dark:text-amber-200">
              <MathText>{baseNum}/{baseDen} = ({baseNum} · {multiplier}) / ({baseDen} · {multiplier}) = {expNum}/{expDen}</MathText>
              <div className="text-[11px] font-normal text-slate-500 dark:text-slate-400 mt-0.5">
                A két tört pontosan egyenlő: mindkettő értéke <span className="font-bold">{(baseNum / baseDen).toFixed(3).replace(/\.?0+$/, '')}</span>
              </div>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 4. SZAKASZ: TÖRTEK ÖSSZEHASONLÍTÁSA (3 SZABÁLY) */}
      <TheorySection
        number={4}
        title="Törtek összehasonlítása 3 lépésben"
        icon={<Scale className="w-5 h-5 text-orange-600 dark:text-orange-400" />}
        badgeColor="amber"
      >
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Két vagy több tört összehasonlításakor a számlálók és nevezők viszonya alapján három esetet különböztetünk meg:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
          {/* 1. Azonos nevező */}
          <div className="p-4 rounded-2xl border-2 border-blue-200 dark:border-blue-900/60 bg-blue-50/40 dark:bg-blue-950/20 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-black text-sm text-blue-800 dark:text-blue-300">
                1. Azonos nevezők
              </span>
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
                Egyszerű
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Az a tört a nagyobb, amelyiknek a <strong>számlálója nagyobb</strong> (több egyenlő szeletet vettünk).
            </p>
            <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl font-mono text-center text-sm font-bold text-blue-700 dark:text-blue-400">
              <MathText>5/7 &gt; 3/7</MathText>
            </div>
          </div>

          {/* 2. Azonos számláló */}
          <div className="p-4 rounded-2xl border-2 border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/40 dark:bg-emerald-950/20 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-black text-sm text-emerald-800 dark:text-emerald-300">
                2. Azonos számlálók
              </span>
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                Fordított
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Az a tört a nagyobb, amelyiknek a <strong>nevezője kisebb</strong> (nagyobbak az egyes szeletek).
            </p>
            <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl font-mono text-center text-sm font-bold text-emerald-700 dark:text-emerald-400">
              <MathText>2/3 &gt; 2/5</MathText>
            </div>
          </div>

          {/* 3. Különböző nevezők */}
          <div className="p-4 rounded-2xl border-2 border-amber-200 dark:border-amber-900/60 bg-amber-50/40 dark:bg-amber-950/20 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-black text-sm text-amber-800 dark:text-amber-300">
                3. Különböző nevezők
              </span>
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                Közös nevező
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              A törteket először <strong>közös nevezőre bővítjük</strong>, majd a kapott számlálókat hasonlítjuk össze.
            </p>
            <div className="p-2.5 bg-white dark:bg-slate-900 rounded-xl font-mono text-center text-xs font-bold text-amber-700 dark:text-amber-400">
              <MathText>3/4 (= 9/12) &gt; 2/3 (= 8/12)</MathText>
            </div>
          </div>
        </div>

        {/* Interactive Comparator Scale */}
        <div className="p-5 bg-slate-50 dark:bg-slate-850 rounded-3xl border-2 border-orange-200 dark:border-slate-700 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-bold text-sm text-slate-900 dark:text-white">
              <Scale className="w-4 h-4 text-orange-500" />
              <span>Interaktív Tört-Összehasonlító Mérleg</span>
            </div>
            <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-orange-100 dark:bg-orange-950 text-orange-700 dark:text-orange-300">
              Közös nevezőre hozás
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Fraction 1 Controls */}
            <div className="p-3.5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="text-xs font-bold text-slate-500 uppercase">1. Tört (<MathText size="sm">{compNum1}/{compDen1}</MathText>)</div>
              <div className="flex items-center gap-2">
                <div className="flex-1 space-y-1">
                  <label className="text-[10px] text-slate-400">Számláló</label>
                  <input
                    type="number"
                    value={compNum1}
                    onChange={(e) => setCompNum1(Math.max(1, Number(e.target.value) || 1))}
                    className="w-full px-2 py-1 rounded-lg border text-xs font-mono font-bold bg-slate-50 dark:bg-slate-800"
                  />
                </div>
                <div className="flex-1 space-y-1">
                  <label className="text-[10px] text-slate-400">Nevező</label>
                  <input
                    type="number"
                    value={compDen1}
                    onChange={(e) => setCompDen1(Math.max(1, Number(e.target.value) || 1))}
                    className="w-full px-2 py-1 rounded-lg border text-xs font-mono font-bold bg-slate-50 dark:bg-slate-800"
                  />
                </div>
              </div>
            </div>

            {/* Fraction 2 Controls */}
            <div className="p-3.5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="text-xs font-bold text-slate-500 uppercase">2. Tört (<MathText size="sm">{compNum2}/{compDen2}</MathText>)</div>
              <div className="flex items-center gap-2">
                <div className="flex-1 space-y-1">
                  <label className="text-[10px] text-slate-400">Számláló</label>
                  <input
                    type="number"
                    value={compNum2}
                    onChange={(e) => setCompNum2(Math.max(1, Number(e.target.value) || 1))}
                    className="w-full px-2 py-1 rounded-lg border text-xs font-mono font-bold bg-slate-50 dark:bg-slate-800"
                  />
                </div>
                <div className="flex-1 space-y-1">
                  <label className="text-[10px] text-slate-400">Nevező</label>
                  <input
                    type="number"
                    value={compDen2}
                    onChange={(e) => setCompDen2(Math.max(1, Number(e.target.value) || 1))}
                    className="w-full px-2 py-1 rounded-lg border text-xs font-mono font-bold bg-slate-50 dark:bg-slate-800"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Comparison Result Box */}
          <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-orange-200 dark:border-slate-800 text-center space-y-2">
            <div className="text-lg sm:text-xl font-black font-mono flex items-center justify-center gap-3">
              <span className="text-orange-600 dark:text-orange-400"><MathText size="lg">{compNum1}/{compDen1}</MathText></span>
              <span className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 flex items-center justify-center font-black text-base">
                {compareResult}
              </span>
              <span className="text-blue-600 dark:text-blue-400"><MathText size="lg">{compNum2}/{compDen2}</MathText></span>
            </div>

            <div className="p-2.5 bg-amber-50/70 dark:bg-slate-800 rounded-xl text-xs font-mono text-slate-700 dark:text-slate-300 space-y-1">
              <div>Közös nevező: <strong>{commonDen}</strong></div>
              <div>
                <MathText>{compNum1}/{compDen1} = {expandedNum1}/{commonDen}</MathText> &nbsp;|&nbsp; <MathText>{compNum2}/{compDen2} = {expandedNum2}/{commonDen}</MathText>
              </div>
              <div className="font-sans text-[11px] text-slate-500 pt-0.5">
                Mivel {expandedNum1} {compareResult} {expandedNum2}, ezért az első tört {compareText} a másodiknál.
              </div>
            </div>
          </div>
        </div>

        {/* Summary Table */}
        <TheoryTable
          title="Összefoglaló a törtek összehasonlításáról"
          headers={['Eset', 'Szabály', 'Példa', 'Magyarázat']}
          rows={[
            ['Azonos nevezők', 'Nagyobb számláló = nagyobb tört', '5/8 > 3/8', '5 szelet több, mint 3 ugyanakkora szelet'],
            ['Azonos számlálók', 'Kisebb nevező = nagyobb tört', '2/3 > 2/7', 'A harmad szeletek sokkal nagyobbak a hetedeknél'],
            ['Különböző nevezők', 'Közös nevezőre bővítés után számlálók összevetése', '3/4 (= 9/12) > 2/3 (= 8/12)', '12-ed részekre hozva 9 > 8'],
          ]}
        />
      </TheorySection>

      {/* 5. SZAKASZ: TIPIKUS HIBÁK ÉS CSAPDAHELYZETEK */}
      <TheorySection
        number={5}
        title="Tipikus csapdák és gyakori tévhitek"
        icon={<AlertTriangle className="w-5 h-5 text-rose-600 dark:text-rose-400" />}
        badgeColor="rose"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryTrapBox
            title="1. Csapda: Csak a számláló bővítése"
            wrong="A 3/4 bővítése 2-vel = 6/4."
            correct="3/4 = (3·2)/(4·2) = 6/8."
            explanation="Bővítéskor és egyszerűsítéskor a számlálót ÉS a nevezőt is kötelező megszorozni/elosztani ugyanazzal a számmal!"
          />

          <TheoryTrapBox
            title="2. Csapda: Bővítés összeadással?"
            wrong="A 2/3 bővítése 1-gyel = (2+1)/(3+1) = 3/4."
            correct="Bővíteni CSAK SZORZÁSSAL lehet! 2/3 = (2·2)/(3·2) = 4/6."
            explanation="Ha hozzáadunk egy számot, a tört értéke megváltozik, az nem bővítés!"
          />

          <TheoryTrapBox
            title="3. Csapda: Azonos számlálójú törtek összehasonlítása"
            wrong="3/8 nagyobb, mint 3/4, mert a 8 nagyobb a 4-nél."
            correct="3/4 > 3/8 (a negyed szeletek kétszer akkorák, mint a nyolcadok)."
            explanation="Azonos számlálónál a KISEBB nevezőjű tört a nagyobb!"
          />

          <TheoryTrapBox
            title="4. Csapda: Félbehagyott egyszerűsítés"
            wrong="A 12/24 legegyszerűbb alakja 6/12."
            correct="12/24 = 6/12 = 3/6 = 1/2 (a végső alak az 1/2)."
            explanation="Egészen addig kell egyszerűsíteni, amíg a számláló és a nevező relatív prímek nem lesznek (nincs több közös osztójuk)."
          />
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
}

export default FractionsExpandSimplifyTheory;
