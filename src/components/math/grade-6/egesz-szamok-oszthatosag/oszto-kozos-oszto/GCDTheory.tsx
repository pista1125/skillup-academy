import React, { useState, useMemo } from 'react';
import { TheoryTemplate, TheorySection, TheoryCard } from '../TheoryTemplate';
import {
  Target,
  Zap,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Split,
  Binary,
  HelpCircle,
  ShieldCheck,
  RefreshCw,
  Hash,
  Scissors
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface GCDTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

// Helper: Greatest Common Divisor
function calculateGCD(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a || 1;
}

// Helper: Euclidean algorithm steps
function getEuclideanSteps(a: number, b: number): { step: number; dividend: number; divisor: number; quotient: number; remainder: number }[] {
  let x = Math.max(Math.abs(a), Math.abs(b));
  let y = Math.min(Math.abs(a), Math.abs(b));
  const steps: { step: number; dividend: number; divisor: number; quotient: number; remainder: number }[] = [];

  if (y === 0) return steps;

  let stepCount = 1;
  while (y !== 0) {
    const q = Math.floor(x / y);
    const r = x % y;
    steps.push({
      step: stepCount++,
      dividend: x,
      divisor: y,
      quotient: q,
      remainder: r,
    });
    x = y;
    y = r;
  }
  return steps;
}

// Helper: Prime factor decomposition map (prime -> exponent)
function getPrimeFactorsMap(n: number): Record<number, number> {
  const map: Record<number, number> = {};
  let temp = Math.abs(n);
  if (temp < 2) return map;

  for (let d = 2; d * d <= temp; d++) {
    while (temp % d === 0) {
      map[d] = (map[d] || 0) + 1;
      temp = Math.floor(temp / d);
    }
  }
  if (temp > 1) {
    map[temp] = (map[temp] || 0) + 1;
  }
  return map;
}

function formatPrimeDecomposition(map: Record<number, number>): string {
  const primes = Object.keys(map).map(Number).sort((a, b) => a - b);
  if (primes.length === 0) return '1';
  return primes
    .map((p) => (map[p] > 1 ? `${p}^${map[p]}` : `${p}`))
    .join(' · ');
}

function getAllDivisors(n: number): number[] {
  const num = Math.abs(n);
  if (num === 0) return [];
  const divisors: number[] = [];
  for (let i = 1; i * i <= num; i++) {
    if (num % i === 0) {
      divisors.push(i);
      if (i * i !== num) {
        divisors.push(num / i);
      }
    }
  }
  return divisors.sort((a, b) => a - b);
}

export function GCDTheory({ onBack, onStartQuiz }: GCDTheoryProps) {
  // Interactive Lab state
  const [numAInput, setNumAInput] = useState('24');
  const [numBInput, setNumBInput] = useState('36');

  const numA = useMemo(() => {
    const val = parseInt(numAInput.trim(), 10);
    return isNaN(val) || val <= 0 ? 24 : Math.min(val, 9999);
  }, [numAInput]);

  const numB = useMemo(() => {
    const val = parseInt(numBInput.trim(), 10);
    return isNaN(val) || val <= 0 ? 36 : Math.min(val, 9999);
  }, [numBInput]);

  const primeMapA = useMemo(() => getPrimeFactorsMap(numA), [numA]);
  const primeMapB = useMemo(() => getPrimeFactorsMap(numB), [numB]);

  const commonPrimes = useMemo(() => {
    const setA = new Set(Object.keys(primeMapA).map(Number));
    const setB = new Set(Object.keys(primeMapB).map(Number));
    return Array.from(setA).filter((p) => setB.has(p)).sort((a, b) => a - b);
  }, [primeMapA, primeMapB]);

  const calculatedGCD = useMemo(() => calculateGCD(numA, numB), [numA, numB]);
  const calculatedLCM = useMemo(() => {
    if (numA === 0 || numB === 0) return 0;
    return (numA * numB) / calculatedGCD;
  }, [numA, numB, calculatedGCD]);

  const gcdDecompositionMap = useMemo(() => {
    const map: Record<number, number> = {};
    for (const p of commonPrimes) {
      const expA = primeMapA[p] || 0;
      const expB = primeMapB[p] || 0;
      map[p] = Math.min(expA, expB);
    }
    return map;
  }, [commonPrimes, primeMapA, primeMapB]);

  const divisorsA = useMemo(() => getAllDivisors(numA), [numA]);
  const divisorsB = useMemo(() => getAllDivisors(numB), [numB]);
  const commonDivisors = useMemo(() => {
    const setB = new Set(divisorsB);
    return divisorsA.filter((d) => setB.has(d));
  }, [divisorsA, divisorsB]);

  const euclideanSteps = useMemo(() => getEuclideanSteps(numA, numB), [numA, numB]);

  const generateRandomPair = () => {
    const pairs = [
      [24, 36],
      [18, 42],
      [30, 45],
      [28, 70],
      [48, 64],
      [36, 60],
      [40, 56],
      [54, 72],
      [15, 28],
      [16, 24],
    ];
    const [a, b] = pairs[Math.floor(Math.random() * pairs.length)];
    setNumAInput(a.toString());
    setNumBInput(b.toString());
  };

  return (
    <TheoryTemplate
      title="Osztó, közös osztó (LNKO)"
      description="Ismerd meg az osztókat, a közös osztókat, a Legnagyobb Közös Osztó (a, b) meghatározását prímtényezőkkel, a relatív prímeket és az Euklideszi algoritmust!"
      badgeText="6. Osztály • Oszthatóság"
      themeColor="indigo"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      pdfElementId="gcd-theory-content"
      pdfFilename="Osztó_LNKO_Tananyag"
    >
      {/* 1. Szekció: Az osztó és a közös osztó fogalma */}
      <TheorySection
        number={1}
        title="Az osztó és a közös osztó fogalma"
        icon={<Target className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />}
        badgeColor="indigo"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard
            title="Egy szám osztói és osztópárok"
            icon={<Hash className="w-4 h-4 text-indigo-500" />}
          >
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
              Egy $a$ egész számnak a $b$ egész szám <strong>osztója</strong> ($b \mid a$), ha az $a$-t $b$-vel osztva a maradék 0.
              Minden pozitív egész számnak <strong>véges számú osztója van</strong>, amelyek mindig osztópárokat alkotnak!
            </p>
            <div className="p-3 rounded-xl bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 text-xs text-indigo-950 dark:text-indigo-200 font-mono space-y-1">
              <div>A 24 osztópárjai: 1 · 24 = 2 · 12 = 3 · 8 = 4 · 6 = 24</div>
              <div>A 24 osztói: <strong>1, 2, 3, 4, 6, 8, 12, 24</strong> (8 db)</div>
              <div>A 36 osztói: <strong>1, 2, 3, 4, 6, 9, 12, 18, 36</strong> (9 db)</div>
            </div>
          </TheoryCard>

          <TheoryCard
            title="Közös osztók és a Legnagyobb Közös Osztó (a, b)"
            icon={<ShieldCheck className="w-4 h-4 text-indigo-500" />}
          >
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-2">
              Két vagy több szám <strong>közös osztói</strong> azok a számok, amelyek <em>mindegyik számnak egyszerre osztói</em>.
            </p>
            <div className="p-3 rounded-xl bg-slate-900 text-white font-mono text-xs space-y-1 shadow-md">
              <div className="text-indigo-300 font-bold">
                24 és 36 közös osztói: 1, 2, 3, 4, 6, 12
              </div>
              <div className="text-slate-300 text-[11px]">
                A legnagyobb ezek közül a <strong>12</strong>.
              </div>
            </div>
            <div className="mt-2 text-xs text-slate-600 dark:text-slate-300">
              <strong>Jelölése:</strong> LNKO(24, 36) = 12 vagy kerek zárójellel: <strong>(24, 36) = 12</strong>.
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 2. Szekció: Hogyan határozzuk meg az LNKO-t? */}
      <TheorySection
        number={2}
        title="Módszerek a Legnagyobb Közös Osztó meghatározására"
        icon={<Zap className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />}
        badgeColor="indigo"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TheoryCard
            title="1. Osztók felírása"
            icon={<Hash className="w-4 h-4 text-indigo-500" />}
          >
            <p className="text-xs text-slate-600 dark:text-slate-300 mb-2">
              Kisebb számok esetén felírjuk az összes osztót, megkeressük a közöseket, és kiválasztjuk a legnagyobbat:
            </p>
            <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-xs text-indigo-900 dark:text-indigo-200 font-mono space-y-1">
              <div>(12, 18) = ?</div>
              <div>12 osztói: 1, 2, 3, 4, <strong>6</strong>, 12</div>
              <div>18 osztói: 1, 2, 3, <strong>6</strong>, 9, 18</div>
              <div className="font-bold text-emerald-600">⟹ (12, 18) = 6</div>
            </div>
          </TheoryCard>

          <TheoryCard
            title="2. Prímtényezős aranyszabály"
            icon={<Binary className="w-4 h-4 text-indigo-500" />}
          >
            <p className="text-xs text-slate-600 dark:text-slate-300 mb-2">
              Felbontjuk mindkét számot prímek szorzatára. Az LNKO-ba <strong>CSAK A KÖZÖS prímtényezőket vesszük be a LEGKISEBB kitevőjükön</strong>!
            </p>
            <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 text-xs font-mono space-y-1">
              <div>24 = 2³ · 3¹</div>
              <div>36 = 2² · 3²</div>
              <div className="text-indigo-600 dark:text-indigo-300 font-bold">
                (24, 36) = 2² · 3¹ = 4 · 3 = 12
              </div>
            </div>
          </TheoryCard>

          <TheoryCard
            title="3. Euklideszi algoritmus"
            icon={<Split className="w-4 h-4 text-indigo-500" />}
          >
            <p className="text-xs text-slate-600 dark:text-slate-300 mb-2">
              Nagy számoknál maradékos osztásokat végzünk, amíg a maradék 0 nem lesz. Az utolsó nem nulla maradék az LNKO!
            </p>
            <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-xs font-mono space-y-1">
              <div>36 : 24 = 1, maradék 12</div>
              <div>24 : 12 = 2, maradék 0</div>
              <div className="font-bold text-emerald-700 dark:text-emerald-300">
                ⟹ LNKO = 12
              </div>
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 3. Szekció: Relatív prímek és különleges esetek */}
      <TheorySection
        number={3}
        title="Relatív prímek és fontos tulajdonságok"
        icon={<Lightbulb className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />}
        badgeColor="indigo"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard
            title="Relatív prímek fogalma (LNKO = 1)"
            icon={<CheckCircle2 className="w-4 h-4 text-emerald-500" />}
          >
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-2">
              Két szám <strong>relatív prím</strong>, ha a legnagyobb közös osztójuk 1, vagyis nincs 1-nél nagyobb közös osztójuk: <strong>(a, b) = 1</strong>.
            </p>
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-950 dark:text-emerald-200 font-mono space-y-1">
              <div>(8, 9) = 1 (8 összetett, 9 összetett, de relatív prímek!)</div>
              <div>(15, 28) = 1 (15 = 3 · 5, 28 = 2² · 7 ⟹ nincs közös prím)</div>
              <div>(7, 13) = 1 (két különböző prímszám mindig relatív prím)</div>
            </div>
          </TheoryCard>

          <TheoryCard
            title="Ha az egyik szám osztója a másiknak"
            icon={<CheckCircle2 className="w-4 h-4 text-indigo-500" />}
          >
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-2">
              Ha $a$ osztója $b$-nek ($a \mid b$), akkor a legnagyobb közös osztójuk a <strong>kisebbik szám ($a$)</strong>:
            </p>
            <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 text-xs text-indigo-950 dark:text-indigo-200 font-mono space-y-1">
              <div>(6, 18) = <strong>6</strong> (mert 6 osztója 18-nak)</div>
              <div>(12, 48) = <strong>12</strong></div>
              <div>(7, 35) = <strong>7</strong></div>
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 4. Szekció: Interaktív LNKO Labor */}
      <TheorySection
        number={4}
        title="Interaktív LNKO Kalkulátor és Elemző Labor"
        icon={<Target className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />}
        badgeColor="indigo"
      >
        <div className="p-4 sm:p-6 rounded-2xl bg-gradient-to-br from-indigo-50/70 via-white to-blue-50/70 dark:from-slate-900 dark:via-slate-900/90 dark:to-indigo-950/40 border border-indigo-200/80 dark:border-indigo-800/80 shadow-md space-y-6">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Binary className="w-5 h-5 text-indigo-600" />
                Valós Idejű LNKO Elemző
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Adj meg két számot, és nézd meg a prímfelbontásaikat, a közös prímek legkisebb hatványait és az Euklideszi algoritmust!
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={generateRandomPair}
              className="border-indigo-300 text-indigo-700 hover:bg-indigo-50 dark:border-indigo-700 dark:text-indigo-300 flex items-center gap-1.5"
            >
              <RefreshCw className="w-4 h-4" />
              Véletlen Számpár
            </Button>
          </div>

          {/* Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 block">
                1. Szám (a):
              </label>
              <div className="relative">
                <Input
                  type="text"
                  value={numAInput}
                  onChange={(e) => setNumAInput(e.target.value.replace(/[^0-9]/g, ''))}
                  placeholder="pl. 24"
                  maxLength={5}
                  className="font-mono text-base font-bold text-indigo-950 dark:text-indigo-100 bg-white dark:bg-slate-800"
                />
                <Hash className="w-4 h-4 absolute right-3 top-3 text-slate-400" />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 block">
                2. Szám (b):
              </label>
              <div className="relative">
                <Input
                  type="text"
                  value={numBInput}
                  onChange={(e) => setNumBInput(e.target.value.replace(/[^0-9]/g, ''))}
                  placeholder="pl. 36"
                  maxLength={5}
                  className="font-mono text-base font-bold text-indigo-950 dark:text-indigo-100 bg-white dark:bg-slate-800"
                />
                <Hash className="w-4 h-4 absolute right-3 top-3 text-slate-400" />
              </div>
            </div>
          </div>

          {/* Prime factorizations display */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800/80 border border-indigo-200/80 dark:border-slate-700 space-y-1">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                {numA} prímfelbontása:
              </span>
              <div className="font-mono font-bold text-base text-indigo-700 dark:text-indigo-300">
                {numA} = {formatPrimeDecomposition(primeMapA)}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800/80 border border-indigo-200/80 dark:border-slate-700 space-y-1">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                {numB} prímfelbontása:
              </span>
              <div className="font-mono font-bold text-base text-indigo-700 dark:text-indigo-300">
                {numB} = {formatPrimeDecomposition(primeMapB)}
              </div>
            </div>
          </div>

          {/* Common prime factors comparison */}
          <div className="p-4 rounded-xl bg-white dark:bg-slate-800/80 border border-indigo-100 dark:border-slate-700 shadow-sm space-y-3">
            <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
              Közös prímtényezők és a legkisebb kitevők kiválasztása:
            </h4>
            {commonPrimes.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {commonPrimes.map((p) => {
                  const expA = primeMapA[p] || 0;
                  const expB = primeMapB[p] || 0;
                  const minExp = Math.min(expA, expB);
                  return (
                    <div key={p} className="p-2 rounded-lg bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800/60 text-xs font-mono text-center">
                      <div className="font-bold text-slate-700 dark:text-slate-300">Közös prím: {p}</div>
                      <div className="text-[11px] text-slate-500">
                        a-ban: {p}^{expA} | b-ben: {p}^{expB}
                      </div>
                      <div className="text-indigo-700 dark:text-indigo-300 font-bold mt-0.5">
                        Min: {p}^{minExp}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 text-xs font-medium">
                Nincs közös 1-nél nagyobb prímtényező ⟹ A két szám <strong>relatív prím</strong>, LNKO({numA}, {numB}) = 1.
              </div>
            )}
          </div>

          {/* Result Banner */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-md text-center space-y-2">
            <div className="text-xs font-semibold uppercase tracking-wider opacity-90">
              Legnagyobb Közös Osztó Eredmény:
            </div>
            <div className="text-xl sm:text-2xl font-black font-mono">
              ({numA}, {numB}) = {calculatedGCD}
            </div>
            <div className="text-xs font-mono opacity-90">
              Kanonikus alakban: ({numA}, {numB}) = {formatPrimeDecomposition(gcdDecompositionMap)}
            </div>
            <div className="text-[11px] opacity-80 pt-1 border-t border-white/20">
              Kapcsolat az LKKT-vel: [{numA}, {numB}] = {calculatedLCM} | Szorzat: {numA} · {numB} = {numA * numB} = ({numA}, {numB}) · [{numA}, {numB}]
            </div>
          </div>

          {/* Euclidean steps & Divisors */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs space-y-1.5">
              <div className="font-bold text-slate-700 dark:text-slate-300">
                Euklideszi algoritmus levezetése:
              </div>
              <div className="space-y-1 font-mono text-[11px] text-slate-600 dark:text-slate-300">
                {euclideanSteps.map((s) => (
                  <div key={s.step}>
                    {s.step}. lépés: {s.dividend} = {s.divisor} · {s.quotient} + <strong className={s.remainder === 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-indigo-600 dark:text-indigo-400'}>{s.remainder}</strong>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs space-y-1.5">
              <div className="font-bold text-slate-700 dark:text-slate-300">
                Közös osztók listája:
              </div>
              <div className="font-mono text-[11px] text-slate-600 dark:text-slate-400">
                • {numA} osztói: {divisorsA.join(', ')}
              </div>
              <div className="font-mono text-[11px] text-slate-600 dark:text-slate-400">
                • {numB} osztói: {divisorsB.join(', ')}
              </div>
              <div className="font-mono text-[11px] text-indigo-700 dark:text-indigo-300 font-bold">
                • Közös osztók: {commonDivisors.join(', ')} (összesen {commonDivisors.length} db)
              </div>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 5. Szekció: Gyakorlati alkalmazások */}
      <TheorySection
        number={5}
        title="Gyakorlati alkalmazások: Törtek egyszerűsítése és egyenlő szétosztás"
        icon={<HelpCircle className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />}
        badgeColor="indigo"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard
            title="Törtek egyszerűsítése a lehető legegyszerűbb alakra"
            icon={<Scissors className="w-4 h-4 text-indigo-500" />}
          >
            <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              <p>
                Egy törtet akkor tudunk <strong>egy lépésben tovább nem egyszerűsíthető alakra</strong> hozni, ha a számlálót és a nevezőt elosztjuk a legnagyobb közös osztójukkal:
              </p>
              <div className="p-2.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 text-[11px] space-y-1 font-mono">
                <div>Egyszerűsítsük a 24/36 törtet!</div>
                <div>(24, 36) = 12.</div>
                <div>24 : 12 = 2 és 36 : 12 = 3 ⟹ 24/36 = <strong>2/3</strong>.</div>
              </div>
            </div>
          </TheoryCard>

          <TheoryCard
            title="Egyenlő ajándékcsomagok és csempézés"
            icon={<Target className="w-4 h-4 text-indigo-500" />}
          >
            <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              <p>
                <strong>Szöveges feladat:</strong> Van 48 csokoládénk és 72 cukorkánk. Legfeljebb hány egyforma ajándékcsomagot készíthetünk úgy, hogy semmi sem marad ki?
              </p>
              <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-[11px] space-y-1">
                <div>• A csomagok száma osztója kell legyen 48-nak és 72-nek is.</div>
                <div className="font-bold text-emerald-800 dark:text-emerald-300">
                  ⟹ A válasz az LNKO(48, 72) = 24 csomag! (Minden csomagba 2 csoki és 3 cukor kerül).
                </div>
              </div>
            </div>
          </TheoryCard>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
}
