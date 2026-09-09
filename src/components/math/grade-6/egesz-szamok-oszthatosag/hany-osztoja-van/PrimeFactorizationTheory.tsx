import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable
} from '../TheoryTemplate';
import {
  Binary,
  Calculator,
  Compass,
  ArrowRightLeft,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  BookOpen,
  Sparkles,
  Layers,
  Repeat,
  Hash,
  Boxes
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface PrimeFactorizationTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

export function PrimeFactorizationTheory({ onBack, onStartQuiz }: PrimeFactorizationTheoryProps) {
  // Interactive Simulator State:
  const [num, setNum] = useState<number>(36);

  // Compute prime factorization
  const calculatePrimeFactors = (n: number) => {
    let temp = n;
    const factorCounts: Record<number, number> = {};
    const steps: { current: number; divisor: number }[] = [];

    let d = 2;
    while (temp > 1) {
      while (temp % d === 0) {
        steps.push({ current: temp, divisor: d });
        factorCounts[d] = (factorCounts[d] || 0) + 1;
        temp /= d;
      }
      d++;
      if (d * d > temp && temp > 1) {
        steps.push({ current: temp, divisor: temp });
        factorCounts[temp] = (factorCounts[temp] || 0) + 1;
        break;
      }
    }

    // Canonical form string
    const canonicalEntries = Object.entries(factorCounts).map(([prime, exp]) => ({
      prime: parseInt(prime),
      exp
    })).sort((a, b) => a.prime - b.prime);

    // Number of divisors d(N) = (a1 + 1)(a2 + 1)...
    const numberOfDivisors = canonicalEntries.reduce((acc, curr) => acc * (curr.exp + 1), 1);

    // List all divisors
    const allDivisors: number[] = [];
    for (let i = 1; i <= n; i++) {
      if (n % i === 0) allDivisors.push(i);
    }

    return { steps, canonicalEntries, numberOfDivisors, allDivisors };
  };

  const { steps, canonicalEntries, numberOfDivisors, allDivisors } = calculatePrimeFactors(num);
  const isSquare = Math.sqrt(num) % 1 === 0;

  return (
    <TheoryTemplate
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      topicBadge="🧱 6. Osztály • I. Egész számok"
      title="Hány osztója van? (Prímtényezők)"
      subtitle="Prímszámok, összetett számok, prímtényezős felbontás és az osztók számának kiszámítása"
      ruleTitle="Az osztók számának képlete"
      ruleFormula="d(n) = (α₁ + 1) · (α₂ + 1) · ... · (αₖ + 1)"
      themeColor="indigo"
      pdfElementId="prime-factorization-theory-content"
      pdfFilename="Prímtenyezok_Hany_Osztoja_Van_Tananyag"
    >
      {/* 1. Szekció: Prímszámok és összetett számok */}
      <TheorySection
        number={1}
        title="Prímszámok és összetett számok"
        icon={<Hash className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />}
        badgeColor="indigo"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="Mi a prímszám (törzsszám)?" icon={<CheckCircle2 className="w-4 h-4 text-emerald-500" />}>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-2">
              Olyan $1$-nél nagyobb természetes szám, amelynek <strong>pontosan két pozitív osztója van</strong>: az $1$ és önmaga.
            </p>
            <div className="p-3 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900 font-mono text-xs space-y-1">
              <div className="text-emerald-800 dark:text-emerald-300 font-bold">Első prímek 50-ig:</div>
              <div className="text-slate-700 dark:text-slate-300">
                2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47
              </div>
              <div className="text-[11px] text-emerald-700 dark:text-emerald-400 pt-1 font-sans">
                💡 A <strong>2</strong> az egyetlen páros prímszám és a legkisebb prím!
              </div>
            </div>
          </TheoryCard>

          <TheoryCard title="Összetett számok és az 1 száma" icon={<Boxes className="w-4 h-4 text-indigo-500" />}>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-2">
              Azok a számok, amelyeknek <strong>kettőnél több osztójuk van</strong>. Felépíthetők kisebb prímszámok szorzataként.
            </p>
            <div className="p-3 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900 text-xs space-y-1">
              <div className="font-bold text-indigo-800 dark:text-indigo-300">Példák összetett számokra:</div>
              <div className="text-slate-600 dark:text-slate-300 font-mono">4, 6, 8, 9, 10, 12, 14, 15, 16, 18, 20...</div>
              <div className="text-[11px] text-rose-600 dark:text-rose-400 font-bold pt-1">
                ⚠️ Az 1 NEM prím és NEM összetett (csak 1 db osztója van)!
              </div>
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 2. Szekció: A számelmélet alaptétele és prímfelbontás */}
      <TheorySection
        number={2}
        title="A Számelmélet Alaptétele és a Kanonikus Alak"
        icon={<Binary className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />}
        badgeColor="indigo"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="A Számelmélet Alaptétele" icon={<BookOpen className="w-4 h-4 text-violet-500" />}>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-2">
              Minden $1$-nél nagyobb összetett szám <strong>egyértelműen</strong> (a tényezők sorrendjétől eltekintve) felírható <strong>prímszámok szorzataként</strong>.
            </p>
            <div className="p-3 rounded-xl bg-slate-900 text-white font-mono text-xs space-y-1">
              <div className="text-indigo-400 font-bold">Kanonikus alak (prímhatványok növekvő sorrendben):</div>
              <div className="text-emerald-400 text-sm">360 = 2³ · 3² · 5¹</div>
              <div className="text-slate-400 text-[11px]">2, 3, 5 a prímtényezők; 3, 2, 1 a kitevők.</div>
            </div>
          </TheoryCard>

          <TheoryCard title="Hogyan bontunk fel egy számot? (Osztóoszlop)" icon={<Calculator className="w-4 h-4 text-teal-500" />}>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-2">
              Egy függőleges vonal jobb oldalára mindig a legkisebb lehetséges prím osztót írjuk, a bal oldalra az új hányadost, amíg el nem érjük az 1-et:
            </p>
            <div className="p-2.5 rounded-xl bg-teal-50 dark:bg-teal-950/30 border border-teal-100 dark:border-teal-900 font-mono text-xs flex justify-center gap-4">
              <div className="text-right">
                <div>60</div>
                <div>30</div>
                <div>15</div>
                <div>5</div>
                <div>1</div>
              </div>
              <div className="border-l-2 border-teal-500 pl-4 text-teal-700 dark:text-teal-300 font-bold">
                <div>2</div>
                <div>2</div>
                <div>3</div>
                <div>5</div>
                <div>&nbsp;</div>
              </div>
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 3. Szekció: Az osztók számának meghatározása képlettel */}
      <TheorySection
        number={3}
        title="Hány osztója van egy számnak? (A d(n) képlet)"
        icon={<Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />}
        badgeColor="indigo"
      >
        <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-indigo-800 dark:text-indigo-200">
            A képlet alkalmazása: Növeld 1-gyel a kitevőket és szorozd össze őket!
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Ha a szám prímfelbontása: <code className="font-bold">n = p₁ª · p₂ᵇ · p₃ᶜ</code>, akkor az osztók száma:
          </p>
          <div className="p-3 rounded-xl bg-white dark:bg-slate-900 text-center font-mono border border-slate-200 dark:border-slate-800">
            <span className="text-base sm:text-lg font-black text-indigo-600 dark:text-indigo-400">
              d(n) = (a + 1) · (b + 1) · (c + 1)
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
            <div className="p-2.5 rounded-lg bg-white/70 dark:bg-slate-900/60 border border-indigo-100 dark:border-indigo-900">
              <strong>Példa 1:</strong> 72 = 2³ · 3²<br />
              Kitevők: 3 és 2<br />
              <span className="text-indigo-600 font-bold">d(72) = (3 + 1) · (2 + 1) = 4 · 3 = 12 osztó</span>.
            </div>
            <div className="p-2.5 rounded-lg bg-white/70 dark:bg-slate-900/60 border border-indigo-100 dark:border-indigo-900">
              <strong>Példa 2:</strong> 100 = 2² · 5² (Négyzetszám)<br />
              Kitevők: 2 és 2<br />
              <span className="text-indigo-600 font-bold">d(100) = (2 + 1) · (2 + 1) = 3 · 3 = 9 osztó</span>.
            </div>
          </div>
        </div>

        <TheoryTrapBox title="Miért van a négyzetszámoknak PÁRATLAN sok osztójuk?">
          <p className="text-xs sm:text-sm leading-relaxed">
            Minden összetett szám osztói párokba állíthatók (pl. $24 = 1 \cdot 24 = 2 \cdot 12 = 3 \cdot 8 = 4 \cdot 6$, 8 db osztó).
            <br />
            A <strong>négyzetszámoknál</strong> viszont van egy olyan osztópár, amely két azonos számból áll ($36 = 6 \cdot 6$), így az egyik osztó nem kap párt!
            Ezért <strong>csak a négyzetszámoknak van páratlan számú osztójuk</strong>!
          </p>
        </TheoryTrapBox>
      </TheorySection>

      {/* 4. Szekció: Interaktív Prímtényezős Vizualizáló Laboratórium */}
      <TheorySection
        number={4}
        title="Interaktív Prímtényezős és Osztószámoló Laboratórium"
        icon={<Compass className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />}
        badgeColor="indigo"
      >
        <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-teal-500/10 border-2 border-indigo-200/60 dark:border-indigo-800/40">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            {/* Control Column */}
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Válassz egy számot:</span>
                  <span className="text-lg font-mono font-black px-3 py-0.5 rounded-lg bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-200">
                    N = {num}
                  </span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="120"
                  value={num}
                  onChange={(e) => setNum(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
              </div>

              {/* Preset buttons */}
              <div className="flex flex-wrap gap-2 pt-1">
                {[12, 17, 24, 36, 45, 60, 72, 100].map(val => (
                  <Button
                    key={val}
                    size="sm"
                    variant={num === val ? 'default' : 'outline'}
                    className="text-xs h-7 rounded-lg"
                    onClick={() => setNum(val)}
                  >
                    {val}
                  </Button>
                ))}
              </div>

              {/* Status summary */}
              <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs space-y-1">
                <div>
                  • Kanonikus alak:{' '}
                  <strong className="text-indigo-600 dark:text-indigo-400 font-mono">
                    {canonicalEntries.map(e => `${e.prime}${e.exp > 1 ? `^${e.exp}` : ''}`).join(' · ')}
                  </strong>
                </div>
                <div>
                  • Osztók száma:{' '}
                  <strong className="text-emerald-600 dark:text-emerald-400">
                    d({num}) = {canonicalEntries.map(e => `(${e.exp}+1)`).join('·')} = {numberOfDivisors} db
                  </strong>
                </div>
                <div>
                  • Tulajdonság:{' '}
                  <span className={cn("px-1.5 py-0.5 rounded font-bold text-[11px]", isSquare ? "bg-purple-100 text-purple-800" : "bg-slate-100 text-slate-700")}>
                    {isSquare ? 'Négyzetszám (páratlan sok osztó!)' : 'Nem négyzetszám (páros sok osztó)'}
                  </span>
                </div>
              </div>
            </div>

            {/* Visualizer Display Column */}
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  Prímtényezős osztóoszlop ({num}):
                </span>
                <div className="flex justify-center my-2">
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 font-mono text-xs flex gap-4 border border-slate-200/60 dark:border-slate-700">
                    <div className="text-right space-y-0.5">
                      {steps.map((s, i) => (
                        <div key={i}>{s.current}</div>
                      ))}
                      <div className="font-bold text-slate-400">1</div>
                    </div>
                    <div className="border-l-2 border-indigo-500 pl-4 text-indigo-600 dark:text-indigo-400 font-black space-y-0.5">
                      {steps.map((s, i) => (
                        <div key={i}>{s.divisor}</div>
                      ))}
                      <div>&nbsp;</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  A(z) {num} összes pozitív osztója ({numberOfDivisors} db):
                </span>
                <div className="flex flex-wrap gap-1 mt-1.5">
                  {allDivisors.map(d => (
                    <span key={d} className="px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-[11px] font-mono font-bold text-emerald-700 dark:text-emerald-300">
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* Összefoglaló táblázat */}
      <TheoryTable
        title="Gyakori számok prímfelbontása és osztóinak száma"
        headers={['Szám (N)', 'Prímtényezős alak', 'd(N) képlete', 'Osztók száma', 'Összes osztó']}
        rows={[
          ['12', '2² · 3¹', '(2+1) · (1+1) = 3 · 2', '6 db', '1, 2, 3, 4, 6, 12'],
          ['16 (négyzetszám)', '2⁴', '(4+1) = 5', '5 db (páratlan)', '1, 2, 4, 8, 16'],
          ['24', '2³ · 3¹', '(3+1) · (1+1) = 4 · 2', '8 db', '1, 2, 3, 4, 6, 8, 12, 24'],
          ['36 (négyzetszám)', '2² · 3²', '(2+1) · (2+1) = 3 · 3', '9 db (páratlan)', '1, 2, 3, 4, 6, 9, 12, 18, 36'],
          ['60', '2² · 3¹ · 5¹', '(2+1) · (1+1) · (1+1) = 3 · 2 · 2', '12 db', '1, 2, 3, 4, 5, 6, 10, 12, 15, 20, 30, 60'],
          ['72', '2³ · 3²', '(3+1) · (2+1) = 4 · 3', '12 db', '1, 2, 3, 4, 6, 8, 9, 12, 18, 24, 36, 72'],
          ['100 (négyzetszám)', '2² · 5²', '(2+1) · (2+1) = 3 · 3', '9 db (páratlan)', '1, 2, 4, 5, 10, 20, 25, 50, 100']
        ]}
      />
    </TheoryTemplate>
  );
}
