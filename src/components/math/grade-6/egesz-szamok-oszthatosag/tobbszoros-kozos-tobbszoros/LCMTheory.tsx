import React, { useState, useMemo } from 'react';
import { TheoryTemplate, TheorySection, TheoryCard } from '../TheoryTemplate';
import {
  Sparkles,
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
  Clock,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface LCMTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

// Helper: Greatest Common Divisor
function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a || 1;
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

export function LCMTheory({ onBack, onStartQuiz }: LCMTheoryProps) {
  // Interactive Lab state
  const [numAInput, setNumAInput] = useState('12');
  const [numBInput, setNumBInput] = useState('18');

  const numA = useMemo(() => {
    const val = parseInt(numAInput.trim(), 10);
    return isNaN(val) || val <= 0 ? 12 : Math.min(val, 9999);
  }, [numAInput]);

  const numB = useMemo(() => {
    const val = parseInt(numBInput.trim(), 10);
    return isNaN(val) || val <= 0 ? 18 : Math.min(val, 9999);
  }, [numBInput]);

  const primeMapA = useMemo(() => getPrimeFactorsMap(numA), [numA]);
  const primeMapB = useMemo(() => getPrimeFactorsMap(numB), [numB]);

  const allPrimes = useMemo(() => {
    const set = new Set<number>([
      ...Object.keys(primeMapA).map(Number),
      ...Object.keys(primeMapB).map(Number),
    ]);
    return Array.from(set).sort((a, b) => a - b);
  }, [primeMapA, primeMapB]);

  const calculatedGCD = useMemo(() => gcd(numA, numB), [numA, numB]);
  const calculatedLCM = useMemo(() => {
    if (numA === 0 || numB === 0) return 0;
    return (numA * numB) / calculatedGCD;
  }, [numA, numB, calculatedGCD]);

  const lcmDecompositionMap = useMemo(() => {
    const map: Record<number, number> = {};
    for (const p of allPrimes) {
      const expA = primeMapA[p] || 0;
      const expB = primeMapB[p] || 0;
      map[p] = Math.max(expA, expB);
    }
    return map;
  }, [allPrimes, primeMapA, primeMapB]);

  // First 6 multiples of A and B
  const multiplesA = useMemo(() => [1, 2, 3, 4, 5, 6].map((k) => k * numA), [numA]);
  const multiplesB = useMemo(() => [1, 2, 3, 4, 5, 6].map((k) => k * numB), [numB]);

  const generateRandomPair = () => {
    const pairs = [
      [12, 18],
      [8, 12],
      [15, 20],
      [14, 21],
      [16, 24],
      [9, 15],
      [24, 36],
      [18, 27],
      [10, 15],
      [6, 8],
    ];
    const [a, b] = pairs[Math.floor(Math.random() * pairs.length)];
    setNumAInput(a.toString());
    setNumBInput(b.toString());
  };

  return (
    <TheoryTemplate
      title="Többszörös, közös többszörös (LKKT)"
      description="Ismerd meg a többszörösöket, a közös többszörösöket és a Legkisebb Közös Többszörös [a, b] meghatározását prímfelbontással!"
      badgeText="6. Osztály • Oszthatóság"
      themeColor="amber"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      pdfElementId="lcm-theory-content"
      pdfFilename="Többszörös_LKKT_Tananyag"
    >
      {/* 1. Szekció: Mi a többszörös és közös többszörös? */}
      <TheorySection
        number={1}
        title="A többszörös és a közös többszörös fogalma"
        icon={<Sparkles className="w-5 h-5 text-amber-600 dark:text-amber-400" />}
        badgeColor="amber"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard
            title="Egy szám többszörösei"
            icon={<Hash className="w-4 h-4 text-amber-500" />}
          >
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
              Egy $a$ egész szám <strong>többszörösein</strong> azokat a számokat értjük, amelyeket úgy kapunk, hogy az $a$-t megszorozzuk egy egész számmal ($k \cdot a$, ahol $k \in \mathbb{Z}$).
            </p>
            <div className="p-3 rounded-xl bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs text-amber-950 dark:text-amber-200 font-mono space-y-1">
              <div>A 6 pozitív többszörösei: <strong>6, 12, 18, 24, 30, 36, 42, 48...</strong></div>
              <div>A 8 pozitív többszörösei: <strong>8, 16, 24, 32, 40, 48, 56...</strong></div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400 font-sans mt-1">
                Minden nem nulla egész számnak <strong>végtelen sok többszöröse</strong> van!
              </div>
            </div>
          </TheoryCard>

          <TheoryCard
            title="Közös többszörösök és a Legkisebb Közös Többszörös [a, b]"
            icon={<ShieldCheck className="w-4 h-4 text-amber-500" />}
          >
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-2">
              Két vagy több szám <strong>közös többszörösei</strong> azok a számok, amelyek <em>mindegyik számnak egyszerre többszörösei</em>.
            </p>
            <div className="p-3 rounded-xl bg-slate-900 text-white font-mono text-xs space-y-1 shadow-md">
              <div className="text-amber-300 font-bold">
                6 és 8 közös többszörösei: 24, 48, 72, 96, 120...
              </div>
              <div className="text-slate-300 text-[11px]">
                A legkisebb pozitív közös többszörös a <strong>24</strong>.
              </div>
            </div>
            <div className="mt-2 text-xs text-slate-600 dark:text-slate-300">
              <strong>Jelölése:</strong> LKKT(6, 8) = 24 vagy szögletes zárójellel: <strong>[6, 8] = 24</strong>.
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 2. Szekció: Hogyan számoljuk ki az LKKT-t? */}
      <TheorySection
        number={2}
        title="Módszerek az LKKT kiszámítására"
        icon={<Zap className="w-5 h-5 text-amber-600 dark:text-amber-400" />}
        badgeColor="amber"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TheoryCard
            title="1. Felsorolásos módszer"
            icon={<Clock className="w-4 h-4 text-amber-500" />}
          >
            <p className="text-xs text-slate-600 dark:text-slate-300 mb-2">
              Kis számok esetén felírjuk a nagyobb szám többszöröseit, és megnézzük, melyik osztható a másikkal:
            </p>
            <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-xs text-amber-900 dark:text-amber-200 font-mono space-y-1">
              <div>[4, 6] = ?</div>
              <div>6 többszörösei: 6 (4-gyel nem), <strong>12 (4-gyel osztható!)</strong></div>
              <div className="font-bold text-emerald-600">⟹ [4, 6] = 12</div>
            </div>
          </TheoryCard>

          <TheoryCard
            title="2. Prímtényezős módszer (Általános)"
            icon={<Binary className="w-4 h-4 text-amber-500" />}
          >
            <p className="text-xs text-slate-600 dark:text-slate-300 mb-2">
              Felbontjuk mindkét számot prímek szorzatára. Az LKKT-be <strong>minden előforduló prímtényezőt a LEGNAGYOBB kitevőjén</strong> veszünk be!
            </p>
            <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 text-xs font-mono space-y-1">
              <div>12 = 2² · 3¹</div>
              <div>18 = 2¹ · 3²</div>
              <div className="text-amber-600 dark:text-amber-300 font-bold">
                [12, 18] = 2² · 3² = 4 · 9 = 36
              </div>
            </div>
          </TheoryCard>

          <TheoryCard
            title="3. Összefüggés az LNKO-val"
            icon={<Split className="w-4 h-4 text-amber-500" />}
          >
            <p className="text-xs text-slate-600 dark:text-slate-300 mb-2">
              Bármely két pozitív egész szám szorzata egyenlő az LNKO-juk és az LKKT-jük szorzatával:
            </p>
            <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-xs font-mono space-y-1">
              <div className="font-bold text-indigo-700 dark:text-indigo-300">
                a · b = (a, b) · [a, b]
              </div>
              <div className="text-[11px] text-slate-600 dark:text-slate-400">
                ⟹ [a, b] = (a · b) / (a, b)
              </div>
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 3. Szekció: Különleges esetek */}
      <TheorySection
        number={3}
        title="Különleges és gyors esetek"
        icon={<Lightbulb className="w-5 h-5 text-amber-600 dark:text-amber-400" />}
        badgeColor="amber"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard
            title="1. Eset: Relatív prímek LKKT-je"
            icon={<CheckCircle2 className="w-4 h-4 text-emerald-500" />}
          >
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-2">
              Ha két számnak nincs 1-nél nagyobb közös osztója (LNKO(a, b) = 1), akkor az LKKT egyszerűen a <strong>két szám szorzata</strong>:
            </p>
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-950 dark:text-emerald-200 font-mono space-y-1">
              <div>[5, 7] = 5 · 7 = <strong>35</strong> (mivel mindkettő prím)</div>
              <div>[8, 9] = 8 · 9 = <strong>72</strong> (mivel 8 és 9 relatív prímek)</div>
              <div>[4, 15] = 4 · 15 = <strong>60</strong></div>
            </div>
          </TheoryCard>

          <TheoryCard
            title="2. Eset: Ha az egyik szám osztója a másiknak"
            icon={<CheckCircle2 className="w-4 h-4 text-amber-500" />}
          >
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-2">
              Ha a osztója b-nek (a | b), akkor a közös többszörösük a <strong>nagyobb szám (b)</strong>:
            </p>
            <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs text-amber-950 dark:text-amber-200 font-mono space-y-1">
              <div>[6, 18] = <strong>18</strong> (mert 18 osztható 6-tal)</div>
              <div>[7, 28] = <strong>28</strong> (mert 28 osztható 7-tel)</div>
              <div>[15, 60] = <strong>60</strong></div>
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 4. Szekció: Interaktív LKKT Labor */}
      <TheorySection
        number={4}
        title="Interaktív LKKT Kalkulátor és Prímfelbontó Labor"
        icon={<Sparkles className="w-5 h-5 text-amber-600 dark:text-amber-400" />}
        badgeColor="amber"
      >
        <div className="p-4 sm:p-6 rounded-2xl bg-gradient-to-br from-amber-50/70 via-white to-orange-50/70 dark:from-slate-900 dark:via-slate-900/90 dark:to-amber-950/40 border border-amber-200/80 dark:border-amber-800/80 shadow-md space-y-6">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Binary className="w-5 h-5 text-amber-600" />
                Valós Idejű LKKT Elemző
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Adj meg két számot, és figyeld meg a prímfelbontásaikat és a legnagyobb hatványok kiválasztását!
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={generateRandomPair}
              className="border-amber-300 text-amber-700 hover:bg-amber-50 dark:border-amber-700 dark:text-amber-300 flex items-center gap-1.5"
            >
              <RefreshCw className="w-4 h-4" />
              Véletlen Számpár
            </Button>
          </div>

          {/* Number inputs */}
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
                  placeholder="pl. 12"
                  maxLength={5}
                  className="font-mono text-base font-bold text-amber-950 dark:text-amber-100 bg-white dark:bg-slate-800"
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
                  placeholder="pl. 18"
                  maxLength={5}
                  className="font-mono text-base font-bold text-amber-950 dark:text-amber-100 bg-white dark:bg-slate-800"
                />
                <Hash className="w-4 h-4 absolute right-3 top-3 text-slate-400" />
              </div>
            </div>
          </div>

          {/* Prime factorizations display */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800/80 border border-amber-200/80 dark:border-slate-700 space-y-1">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                {numA} prímfelbontása:
              </span>
              <div className="font-mono font-bold text-base text-amber-700 dark:text-amber-300">
                {numA} = {formatPrimeDecomposition(primeMapA)}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800/80 border border-amber-200/80 dark:border-slate-700 space-y-1">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                {numB} prímfelbontása:
              </span>
              <div className="font-mono font-bold text-base text-amber-700 dark:text-amber-300">
                {numB} = {formatPrimeDecomposition(primeMapB)}
              </div>
            </div>
          </div>

          {/* Max powers selection breakdown */}
          <div className="p-4 rounded-xl bg-white dark:bg-slate-800/80 border border-amber-100 dark:border-slate-700 shadow-sm space-y-3">
            <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
              Prímtényezők és a legnagyobb kitevők kiválasztása:
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {allPrimes.map((p) => {
                const expA = primeMapA[p] || 0;
                const expB = primeMapB[p] || 0;
                const maxExp = Math.max(expA, expB);
                return (
                  <div key={p} className="p-2 rounded-lg bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 text-xs font-mono text-center">
                    <div className="font-bold text-slate-700 dark:text-slate-300">Prím: {p}</div>
                    <div className="text-[11px] text-slate-500">
                      a-ban: {p}^{expA} | b-ben: {p}^{expB}
                    </div>
                    <div className="text-amber-700 dark:text-amber-300 font-bold mt-0.5">
                      Max: {p}^{maxExp}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Result Banner */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-md text-center space-y-2">
            <div className="text-xs font-semibold uppercase tracking-wider opacity-90">
              Legkisebb Közös Többszörös Eredmény:
            </div>
            <div className="text-xl sm:text-2xl font-black font-mono">
              [{numA}, {numB}] = {calculatedLCM}
            </div>
            <div className="text-xs font-mono opacity-90">
              Kanonikus alakban: [{numA}, {numB}] = {formatPrimeDecomposition(lcmDecompositionMap)}
            </div>
            <div className="text-[11px] opacity-80 pt-1 border-t border-white/20">
              Összehasonlításképp: LNKO({numA}, {numB}) = {calculatedGCD} | Szorzat ellenőrzés: {numA} · {numB} = {numA * numB} = {calculatedGCD} · {calculatedLCM}
            </div>
          </div>

          {/* First multiples preview */}
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs space-y-1">
            <div className="font-bold text-slate-700 dark:text-slate-300 mb-1">
              Első néhány többszörös áttekintése:
            </div>
            <div className="font-mono text-[11px] text-slate-600 dark:text-slate-400">
              • {numA} többszörösei: {multiplesA.join(', ')}...
            </div>
            <div className="font-mono text-[11px] text-slate-600 dark:text-slate-400">
              • {numB} többszörösei: {multiplesB.join(', ')}...
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 5. Szekció: Gyakorlati szöveges feladatok modellje */}
      <TheorySection
        number={5}
        title="Gyakorlati alkalmazások: Találkozások és periódusok"
        icon={<HelpCircle className="w-5 h-5 text-amber-600 dark:text-amber-400" />}
        badgeColor="amber"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard
            title="Körpályán futók és buszjáratok"
            icon={<Clock className="w-4 h-4 text-amber-500" />}
          >
            <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              <p>
                <strong>Gyakori feladattípus:</strong> Két futó egy körpályán egyszerre indul a rajtvonalról. Az egyik 6 perc alatt, a másik 8 perc alatt tesz meg egy kört. Mikor találkoznak újra a rajtnál?
              </p>
              <div className="p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-[11px] space-y-1">
                <div>• Az 1. futó a rajtnál van: 6, 12, 18, <strong>24</strong>, 30... percben.</div>
                <div>• A 2. futó a rajtnál van: 8, 16, <strong>24</strong>, 32... percben.</div>
                <div className="font-bold text-amber-800 dark:text-amber-200">
                  ⟹ A válasz az LKKT(6, 8) = 24 perc múlva! (Az 1. futó 4 kört, a 2. futó 3 kört tett meg).
                </div>
              </div>
            </div>
          </TheoryCard>

          <TheoryCard
            title="Törtek közös nevezőre hozása"
            icon={<Sparkles className="w-4 h-4 text-amber-500" />}
          >
            <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              <p>
                Törtek összeadásánál és kivonásánál a <strong>legkisebb közös nevező pontosan a nevezők LKKT-je</strong>!
              </p>
              <div className="p-2.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 text-[11px] space-y-1 font-mono">
                <div>1/12 + 5/18 = ?</div>
                <div>Nevezők LKKT-je: [12, 18] = 36.</div>
                <div>1/12 = 3/36 és 5/18 = 10/36 ⟹ 3/36 + 10/36 = 13/36.</div>
              </div>
            </div>
          </TheoryCard>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
}
