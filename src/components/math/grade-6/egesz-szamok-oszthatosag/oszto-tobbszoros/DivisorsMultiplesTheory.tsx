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
  Calculator,
  Compass,
  ArrowRightLeft,
  MoveHorizontal,
  Plus,
  Minus,
  Check,
  Zap,
  TrendingDown,
  TrendingUp,
  Layers,
  HelpCircle,
  Lightbulb,
  BookOpen,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  RotateCcw,
  ArrowRight,
  Hash,
  Binary,
  Repeat
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface DivisorsMultiplesTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

export function DivisorsMultiplesTheory({ onBack, onStartQuiz }: DivisorsMultiplesTheoryProps) {
  // Interactive Simulator State: number N (1..60)
  const [num, setNum] = useState<number>(24);

  // Compute divisors of num
  const divisors: number[] = [];
  const divisorPairs: [number, number][] = [];
  for (let i = 1; i <= num; i++) {
    if (num % i === 0) {
      divisors.push(i);
      if (i <= num / i) {
        divisorPairs.push([i, num / i]);
      }
    }
  }

  // Compute first 6 positive multiples
  const multiples = [1, 2, 3, 4, 5, 6].map(k => k * num);

  const isPrime = divisors.length === 2;

  return (
    <TheoryTemplate
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      topicBadge="🔄 6. Osztály • I. Egész számok"
      title="Osztó, többszörös"
      subtitle="Az osztó és a többszörös fogalma, osztópárok, véges osztók és végtelen többszörösök"
      ruleTitle="Alapszabály"
      ruleFormula="a | b ⇔ b = k · a (ahol a ≠ 0, k ∈ Z)"
      themeColor="emerald"
      pdfElementId="divisors-multiples-theory-content"
      pdfFilename="Oszto_Tobbszoros_Tananyag"
    >
      {/* 1. Szekció: Az osztó és többszörös definíciója */}
      <TheorySection
        number={1}
        title="Az osztó és a többszörös fogalma"
        icon={<Hash className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />}
        badgeColor="emerald"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="Mi az osztó? (Jelölése: a | b)" icon={<CheckCircle2 className="w-4 h-4 text-emerald-500" />}>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-2">
              Az <code className="font-bold">a</code> nem nulla természetes szám <strong>osztója</strong> a <code className="font-bold">b</code> számnak, ha a <code className="font-bold">b : a</code> osztás maradék nélkül elvégezhető (a maradék 0).
            </p>
            <div className="p-3 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900 font-mono text-xs space-y-1">
              <div className="text-emerald-800 dark:text-emerald-300 font-bold">6 | 24 (Olvasd: „6 osztója 24-nek”)</div>
              <div className="text-slate-600 dark:text-slate-400">Mert 24 : 6 = 4 és a maradék 0.</div>
            </div>
          </TheoryCard>

          <TheoryCard title="Mi a többszörös?" icon={<Repeat className="w-4 h-4 text-indigo-500" />}>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-2">
              A <code className="font-bold">b</code> szám <strong>többszöröse</strong> az <code className="font-bold">a</code> számnak, ha <code className="font-bold">b</code> megkapható úgy, hogy <code className="font-bold">a</code>-t megszorozzuk egy egész számmal (<code className="font-bold">b = k · a</code>).
            </p>
            <div className="p-3 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900 font-mono text-xs space-y-1">
              <div className="text-indigo-800 dark:text-indigo-300 font-bold">24 többszöröse a 6-nak</div>
              <div className="text-slate-600 dark:text-slate-400">Mert 24 = 4 · 6 (a 6 négyszerese).</div>
            </div>
          </TheoryCard>
        </div>

        <TheoryCallout type="tip" title="Kölcsönös kapcsolat">
          <p className="text-xs sm:text-sm leading-relaxed">
            Az osztó és a többszörös ugyanazt a kapcsolatot fejezi ki más szemszögből:
            ha <strong>6 osztója a 24-nek</strong>, akkor <strong>24 többszöröse a 6-nak</strong>!
          </p>
        </TheoryCallout>
      </TheorySection>

      {/* 2. Szekció: Hogyan keressük meg egy szám összes osztóját? */}
      <TheorySection
        number={2}
        title="Az osztópárok módszere (Hogyan találjuk meg az összes osztót?)"
        icon={<Layers className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />}
        badgeColor="emerald"
      >
        <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-400">
            Példa: Keressük meg a 36 összes osztóját szorzópárokkal!
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs font-mono">
            <div className="p-2 rounded-lg bg-slate-800 border border-slate-700 text-center">1 · 36 = 36</div>
            <div className="p-2 rounded-lg bg-slate-800 border border-slate-700 text-center">2 · 18 = 36</div>
            <div className="p-2 rounded-lg bg-slate-800 border border-slate-700 text-center">3 · 12 = 36</div>
            <div className="p-2 rounded-lg bg-slate-800 border border-slate-700 text-center">4 · 9 = 36</div>
            <div className="p-2 rounded-lg bg-slate-800 border border-slate-700 text-center">6 · 6 = 36</div>
          </div>
          <p className="text-xs text-slate-300">
            A 36 osztói növekvő sorrendben: <strong className="text-emerald-400">1, 2, 3, 4, 6, 9, 12, 18, 36</strong> (összesen 9 osztója van).
          </p>
        </div>
      </TheorySection>

      {/* 3. Szekció: Különleges szabályok és veszélyes csapdák */}
      <TheorySection
        number={3}
        title="Különleges szabályok és tipikus csapdák"
        icon={<AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />}
        badgeColor="amber"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryTrapBox title="1. Az 1 és a 0 különleges szerepe">
            <ul className="space-y-2 text-xs sm:text-sm">
              <li className="flex items-start gap-2">
                <span className="font-bold text-emerald-600">• Az 1:</span>
                <span>Minden természetes számnak osztója (<code className="font-bold">1 | a</code>). Neki magának csak 1 db osztója van (önmaga).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-rose-600">• A 0:</span>
                <span>Minden számnak <strong>többszöröse</strong> (<code className="font-bold">0 = 0 · a</code>), de a 0 <strong>NEM osztója semminek</strong> (0-val nem osztunk)!</span>
              </li>
            </ul>
          </TheoryTrapBox>

          <TheoryTrapBox title="2. Véges sok osztó vs. Végtelen sok többszörös">
            <div className="space-y-2 text-xs sm:text-sm">
              <p className="leading-relaxed">
                Minden pozitív egész számnak <strong>véges számú osztója</strong> van (a legkisebb az 1, a legnagyobb önmaga).
              </p>
              <p className="leading-relaxed">
                Viszont minden pozitív egész számnak <strong>végtelen sok pozitív többszöröse</strong> van (pl. 7 többszörösei: 7, 14, 21, 28, 35, 42, ... a végtelenségig).
              </p>
            </div>
          </TheoryTrapBox>
        </div>
      </TheorySection>

      {/* 4. Szekció: Interaktív Osztó és Többszörös Vizualizáló */}
      <TheorySection
        number={4}
        title="Interaktív Osztó és Többszörös Laboratórium"
        icon={<Compass className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />}
        badgeColor="emerald"
      >
        <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-green-500/10 border-2 border-emerald-200/60 dark:border-emerald-800/40">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Control Column */}
            <div className="w-full md:w-1/2 space-y-4">
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Válassz egy számot:</span>
                  <span className="text-base font-mono font-black px-3 py-0.5 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-200">
                    N = {num}
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="60"
                  step="1"
                  value={num}
                  onChange={(e) => setNum(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                  <span>1</span>
                  <span>30</span>
                  <span>60</span>
                </div>
              </div>

              {/* Quick preset buttons */}
              <div className="flex flex-wrap gap-2 pt-1">
                {[12, 17, 24, 36, 45, 60].map(val => (
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

              {/* Summary stat box */}
              <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs space-y-1">
                <div>• Osztók száma: <strong>{divisors.length} darab</strong></div>
                <div>• Típus: <span className={cn("font-bold px-1.5 py-0.5 rounded text-[11px]", isPrime ? "bg-amber-100 text-amber-800" : num === 1 ? "bg-slate-100 text-slate-700" : "bg-emerald-100 text-emerald-800")}>{num === 1 ? 'Egység (1)' : isPrime ? 'Prímszám (csak 1 és önmaga)' : 'Összetett szám'}</span></div>
              </div>
            </div>

            {/* Visualizer Display Column */}
            <div className="w-full md:w-1/2 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  A(z) {num} összes pozitív osztója ({divisors.length} db):
                </span>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {divisors.map(d => (
                    <span key={d} className="px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-xs font-mono font-bold text-emerald-700 dark:text-emerald-300">
                      {d}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  A(z) {num} első 6 pozitív többszöröse:
                </span>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {multiples.map(m => (
                    <span key={m} className="px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800 text-xs font-mono font-bold text-indigo-700 dark:text-indigo-300">
                      {m}
                    </span>
                  ))}
                  <span className="text-xs text-slate-400 self-center">...</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* Összefoglaló táblázat */}
      <TheoryTable
        title="Osztók és többszörösök tulajdonságai összefoglalás"
        headers={['Fogalom', 'Jelölés / Definíció', 'Példa', 'Darabszám', 'Legkisebb / Legnagyobb']}
        rows={[
          ['Osztó', 'a | b (b : a maradék = 0)', '6 osztója 18-nak', 'Véges sok (pl. 18-nak 6 db)', 'Legkisebb: 1, Legnagyobb: önmaga'],
          ['Többszörös', 'b = k · a (k ∈ Z⁺)', '18 többszöröse a 6-nak', 'Végtelen sok (6, 12, 18, ...)', 'Legkisebb pozitív: önmaga'],
          ['Az 1 száma', 'Minden szám osztója', '1 | 5, 1 | 100', 'Pontosan 1 db osztója van', 'Sem nem prím, sem nem összetett'],
          ['A 0 száma', 'Minden szám többszöröse', '0 = 0 · 8', 'Nem lehet osztó (0 | a tilos!)', '0 többszöröse minden számnak'],
          ['Prímszám', 'Pontosan 2 db osztója van', '2, 3, 5, 7, 11, 13, 17, 19', '2 osztó (1 és önmaga)', 'Egyetlen páros prím a 2']
        ]}
      />
    </TheoryTemplate>
  );
}
