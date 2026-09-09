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
  ArrowRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface OperationsWithIntegersTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

export function OperationsWithIntegersTheory({ onBack, onStartQuiz }: OperationsWithIntegersTheoryProps) {
  // Interactive Simulator State
  const [numA, setNumA] = useState<number>(-5);
  const [op, setOp] = useState<'+' | '-'>('+');
  const [numB, setNumB] = useState<number>(8);

  // Computed Values for Simulator
  const rawExpression = `(${numA > 0 ? `+${numA}` : numA}) ${op} (${numB > 0 ? `+${numB}` : numB})`;

  let simplifiedSign = '+';
  let simplifiedB = numB;
  if (op === '+') {
    simplifiedSign = numB >= 0 ? '+' : '-';
    simplifiedB = Math.abs(numB);
  } else {
    // op === '-'
    simplifiedSign = numB >= 0 ? '-' : '+';
    simplifiedB = Math.abs(numB);
  }

  const simplifiedExpression = `${numA} ${simplifiedSign} ${simplifiedB}`;
  const result = op === '+' ? numA + numB : numA - numB;

  return (
    <TheoryTemplate
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      documentId="g6-sec1-operations-theory-content"
      pdfFilename="6_osztaly_1_muveletek_az_egesz_szamok_koreben_tananyag"
      badgeText="🔢 6. Osztály • I. Egész számok, oszthatóság"
      title="1. Műveletek az egész számok körében"
      subtitle="Mit tanultunk 5. osztályban? Egész számok halmaza, előjeles összeadás, kivonás és zárójelfelbontás"
      quickRule={{
        label: 'Alapszabály',
        formula: 'a - b = a + (-b)  |  -(-a) = +a'
      }}
      themeColor="blue"
      practiceTitle="Gyakorold az egész számos műveleteket!"
      practiceSubtitle="Tedd próbára a tudásod a 3 szintű kvízben 30 feladattal és azonnali magyarázatokkal!"
    >
      {/* 1. Szekció: Az egész számok halmaza */}
      <TheorySection
        number={1}
        title="Az egész számok halmaza (ℤ) és a számegyenes"
        icon={<Compass className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
        badgeColor="blue"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TheoryCard
            variant="blue"
            title="Pozitív egész számok (ℤ⁺)"
            badge="0-tól jobbra"
          >
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              A nullánál nagyobb egész számok. Eléjük tehetünk <span className="font-mono font-bold text-blue-600">+</span> előjelet, de el is hagyható.
            </p>
            <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-blue-200 dark:border-blue-900 font-mono font-bold text-blue-600 dark:text-blue-300 text-xs text-center">
              +1, +2, +3, +4, +5, ...
            </div>
          </TheoryCard>

          <TheoryCard
            variant="default"
            title="A nulla (0)"
            badge="Origó (Közép)"
          >
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              A nulla semleges szám: <strong>se nem pozitív, se nem negatív</strong>. A számegyenesen a pozitív és negatív számok határán, az origóban áll.
            </p>
            <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-mono font-bold text-slate-800 dark:text-slate-200 text-xs text-center">
              0 (önmaga ellentettje: 0)
            </div>
          </TheoryCard>

          <TheoryCard
            variant="rose"
            title="Negatív egész számok (ℤ⁻)"
            badge="0-tól balra"
          >
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              A nullánál kisebb egész számok. Előttük mindig kötelező kitenni a <span className="font-mono font-bold text-rose-600">-</span> előjelet.
            </p>
            <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-rose-200 dark:border-rose-900 font-mono font-bold text-rose-600 dark:text-rose-300 text-xs text-center">
              -1, -2, -3, -4, -5, ...
            </div>
          </TheoryCard>
        </div>

        <TheoryCallout variant="info" title="Számegyenes és abszolút érték összefüggés:">
          A számegyenesen jobbra haladva a számok <strong>növekednek</strong>, balra haladva <strong>csökkennek</strong>. Egy szám <em>abszolút értéke</em> ($|a|$) a nullától mért geometriai távolsága, ami sosem negatív: $|+7| = 7$, $|-7| = 7$, $|0| = 0$.
        </TheoryCallout>
      </TheorySection>

      {/* 2. Szekció: Azonos előjelű számok összeadása */}
      <TheorySection
        number={2}
        title="Azonos előjelű egész számok összeadása"
        icon={<Plus className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />}
        badgeColor="emerald"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard variant="emerald" title="Két pozitív szám összeadása (+ és +)">
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Az abszolút értékeket összeadjuk, az eredmény <strong>pozitív</strong> marad.
            </p>
            <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-800 text-xs font-mono space-y-1">
              <div className="font-bold text-emerald-700 dark:text-emerald-300">(+4) + (+6) = +10</div>
              <div className="text-[11px] text-slate-500">Példa: 4 °C volt, 6 °C-ot melegedett ➔ +10 °C lett.</div>
            </div>
          </TheoryCard>

          <TheoryCard variant="rose" title="Két negatív szám összeadása (- és -)">
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Az abszolút értékeket összeadjuk, és az eredmény elé kitesszük a közös <strong>mínusz (-)</strong> jelet.
            </p>
            <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-rose-200 dark:border-rose-800 text-xs font-mono space-y-1">
              <div className="font-bold text-rose-700 dark:text-rose-300">(-4) + (-6) = -10</div>
              <div className="text-[11px] text-slate-500">Példa: 4 Ft adósság mellé még 6 Ft adósság ➔ 10 Ft adósság (-10).</div>
            </div>
          </TheoryCard>
        </div>

        <TheoryCallout variant="tip" title="Ökölszabály azonos előjeleknél:">
          Ha az előjelek <strong>megegyeznek</strong>, a számok abszolút értékei <em>összeadódnak</em>, és az eredmény megőrzi a közös előjelet: $(+a) + (+b) = +(a+b)$, illetve $(-a) + (-b) = -(a+b)$.
        </TheoryCallout>
      </TheorySection>

      {/* 3. Szekció: Különböző előjelű számok összeadása */}
      <TheorySection
        number={3}
        title="Különböző előjelű egész számok összeadása"
        icon={<ArrowRightLeft className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />}
        badgeColor="indigo"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard variant="indigo" title="Pozitív többlet esete (Nagyobb a pozitív)">
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              A nagyobb abszolút értékű számból kivonjuk a kisebbet, és az eredmény <strong>pozitív</strong> lesz.
            </p>
            <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-indigo-200 dark:border-indigo-800 text-xs font-mono space-y-1">
              <div className="font-bold text-indigo-700 dark:text-indigo-300">(+9) + (-4) = +5</div>
              <div className="text-[11px] text-slate-500">Mert $|+9| = 9 &gt; |-4| = 4$, így $9 - 4 = 5$, előjele $+$.</div>
            </div>
          </TheoryCard>

          <TheoryCard variant="amber" title="Negatív többlet esete (Nagyobb a negatív)">
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              A nagyobb abszolút értékű számból kivonjuk a kisebbet, és az eredmény <strong>negatív</strong> lesz.
            </p>
            <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-800 text-xs font-mono space-y-1">
              <div className="font-bold text-amber-700 dark:text-amber-300">(-9) + (+4) = -5</div>
              <div className="text-[11px] text-slate-500">Mert $|-9| = 9 &gt; |+4| = 4$, így $9 - 4 = 5$, előjele $-$.</div>
            </div>
          </TheoryCard>
        </div>

        <TheoryCard variant="default" title="Különleges eset: Ellentett számok összege">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm">
            <p className="text-slate-600 dark:text-slate-300">
              Két ellentett szám összege <strong>mindig pontosan nulla (0)</strong>, mert a nullától egyenlő távolságra vannak ellentétes irányban:
            </p>
            <div className="px-4 py-2 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 font-mono font-bold text-blue-700 dark:text-blue-300 text-sm whitespace-nowrap">
              (+7) + (-7) = 0
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 4. Szekció: A kivonás és a zárójelfelbontás */}
      <TheorySection
        number={4}
        title="A kivonás átalakítása és a zárójelfelbontás szabályai"
        icon={<Minus className="w-5 h-5 text-rose-600 dark:text-rose-400" />}
        badgeColor="rose"
      >
        <TheoryCallout variant="warning" title="A kivonás alaptétele:">
          Egy szám kivonása megegyezik a <strong>szám ellentettjének a hozzáadásával</strong>: <span className="font-mono font-bold text-rose-700 dark:text-rose-400">a - b = a + (-b)</span>.
        </TheoryCallout>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
          <div className="p-3.5 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-center space-y-1">
            <div className="text-[10px] font-black uppercase text-emerald-800 dark:text-emerald-300">Azonos előjel</div>
            <div className="font-mono font-black text-base text-emerald-700 dark:text-emerald-300">+(+) ➔ +</div>
            <div className="text-[11px] font-mono text-slate-600 dark:text-slate-400">5 + (+3) = 5 + 3 = 8</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-rose-50/50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800 text-center space-y-1">
            <div className="text-[10px] font-black uppercase text-rose-800 dark:text-rose-300">Különböző előjel</div>
            <div className="font-mono font-black text-base text-rose-700 dark:text-rose-300">+(-) ➔ -</div>
            <div className="text-[11px] font-mono text-slate-600 dark:text-slate-400">5 + (-3) = 5 - 3 = 2</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-rose-50/50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800 text-center space-y-1">
            <div className="text-[10px] font-black uppercase text-rose-800 dark:text-rose-300">Különböző előjel</div>
            <div className="font-mono font-black text-base text-rose-700 dark:text-rose-300">-(+) ➔ -</div>
            <div className="text-[11px] font-mono text-slate-600 dark:text-slate-400">5 - (+3) = 5 - 3 = 2</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-center space-y-1">
            <div className="text-[10px] font-black uppercase text-emerald-800 dark:text-emerald-300">Azonos előjel</div>
            <div className="font-mono font-black text-base text-emerald-700 dark:text-emerald-300">-(-) ➔ +</div>
            <div className="text-[11px] font-mono text-slate-600 dark:text-slate-400">5 - (-3) = 5 + 3 = 8</div>
          </div>
        </div>
      </TheorySection>

      {/* 5. Szekció: Többtagú összevonások és műveleti sorrend */}
      <TheorySection
        number={5}
        title="Többtagú összevonások és csoportosítás"
        icon={<Layers className="w-5 h-5 text-purple-600 dark:text-purple-400" />}
        badgeColor="purple"
      >
        <TheoryCard variant="purple" title="A hatékony csoportosítás módszere:">
          <div className="space-y-3 text-xs sm:text-sm">
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Több tagból álló előjeles összeadás-kivonás esetén a leggyorsabb és legbiztosabb stratégia a zárójelek felbontása után a <strong>pozitív tagok és negatív tagok külön-külön történő összegzése</strong>:
            </p>
            <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-purple-200 dark:border-purple-800 font-mono space-y-2 text-xs">
              <div className="text-slate-400">1. Kiinduló feladat:</div>
              <div className="font-bold text-slate-900 dark:text-white">(-12) + (+8) - (-15) + (-6) - (+5)</div>

              <div className="text-slate-400 pt-1">2. Zárójelek felbontása:</div>
              <div className="font-bold text-slate-900 dark:text-white">= -12 + 8 + 15 - 6 - 5</div>

              <div className="text-slate-400 pt-1">3. Csoportosítás (pozitívak és negatívak külön):</div>
              <div className="text-emerald-600 dark:text-emerald-400 font-bold">Pozitívak: +8 + 15 = +23</div>
              <div className="text-rose-600 dark:text-rose-400 font-bold">Negatívak: -12 - 6 - 5 = -23</div>

              <div className="text-slate-400 pt-1">4. Végeredmény:</div>
              <div className="text-blue-600 dark:text-blue-400 font-black text-sm">23 - 23 = 0</div>
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* 6. Szekció: Interaktív Műveleti Szimulátor */}
      <TheorySection
        number={6}
        title="Interaktív Egész Számok Műveleti Szimulátor"
        icon={<Calculator className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
        badgeColor="blue"
      >
        <Card className="rounded-3xl border-2 border-slate-200/80 dark:border-slate-800 shadow-none bg-slate-50/60 dark:bg-slate-850/60 overflow-hidden">
          <div className="p-4 bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
                <Calculator className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                  Állíts be két számot és egy műveletet:
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Figyeld meg a zárójelfelbontás lépéseit és a végeredményt!
                </p>
              </div>
            </div>

            {/* Quick Presets */}
            <div className="flex flex-wrap gap-1.5">
              {[
                { a: -8, op: '+' as const, b: -5 },
                { a: -7, op: '-' as const, b: -12 },
                { a: 6, op: '-' as const, b: 10 },
                { a: -4, op: '+' as const, b: 9 }
              ].map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setNumA(preset.a);
                    setOp(preset.op);
                    setNumB(preset.b);
                  }}
                  className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 transition-all"
                >
                  {preset.a} {preset.op} ({preset.b})
                </button>
              ))}
            </div>
          </div>

          <CardContent className="p-4 sm:p-6 space-y-6">
            {/* Input Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* 1. Szám (a) */}
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 text-center">
                <div className="text-[10px] font-black uppercase text-slate-400">1. Szám (a)</div>
                <div className="text-2xl font-mono font-black text-blue-600 dark:text-blue-400">
                  {numA > 0 ? `+${numA}` : numA}
                </div>
                <input
                  type="range"
                  min={-15}
                  max={15}
                  value={numA}
                  onChange={(e) => setNumA(parseInt(e.target.value, 10))}
                  className="w-full accent-blue-600 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-400">
                  <span>-15</span>
                  <span>0</span>
                  <span>+15</span>
                </div>
              </div>

              {/* Műveleti jel (+ / -) */}
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 text-center flex flex-col justify-between">
                <div className="text-[10px] font-black uppercase text-slate-400">Művelet</div>
                <div className="flex items-center justify-center gap-3">
                  <button
                    onClick={() => setOp('+')}
                    className={cn(
                      "w-12 h-12 rounded-2xl font-mono text-xl font-black transition-all flex items-center justify-center",
                      op === '+'
                        ? "bg-emerald-600 text-white shadow-md shadow-emerald-500/30 scale-105"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200"
                    )}
                  >
                    +
                  </button>
                  <button
                    onClick={() => setOp('-')}
                    className={cn(
                      "w-12 h-12 rounded-2xl font-mono text-xl font-black transition-all flex items-center justify-center",
                      op === '-'
                        ? "bg-rose-600 text-white shadow-md shadow-rose-500/30 scale-105"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200"
                    )}
                  >
                    -
                  </button>
                </div>
                <div className="text-[11px] text-slate-500 font-medium">
                  {op === '+' ? 'Összeadás' : 'Kivonás'}
                </div>
              </div>

              {/* 2. Szám (b) */}
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 text-center">
                <div className="text-[10px] font-black uppercase text-slate-400">2. Szám (b)</div>
                <div className="text-2xl font-mono font-black text-indigo-600 dark:text-indigo-400">
                  {numB > 0 ? `+${numB}` : numB}
                </div>
                <input
                  type="range"
                  min={-15}
                  max={15}
                  value={numB}
                  onChange={(e) => setNumB(parseInt(e.target.value, 10))}
                  className="w-full accent-indigo-600 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-400">
                  <span>-15</span>
                  <span>0</span>
                  <span>+15</span>
                </div>
              </div>
            </div>

            {/* Levezetés és Eredmény Kártya */}
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 text-center sm:text-left">
              <div className="text-xs font-black uppercase tracking-wider text-slate-400 text-center">
                Lépésről lépésre levezetés
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800">
                  <div className="text-[10px] uppercase text-slate-400 font-bold">1. Eredeti alak</div>
                  <div className="font-mono font-bold text-sm text-slate-700 dark:text-slate-300 mt-1">
                    {rawExpression}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-850 border border-slate-200/80 dark:border-slate-800">
                  <div className="text-[10px] uppercase text-slate-400 font-bold">2. Zárójelbontás</div>
                  <div className="font-mono font-bold text-sm text-slate-700 dark:text-slate-300 mt-1">
                    = {simplifiedExpression}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-900">
                  <div className="text-[10px] uppercase text-blue-700 dark:text-blue-300 font-black">3. Végeredmény</div>
                  <div className="font-mono font-black text-xl text-blue-700 dark:text-blue-300 mt-0.5">
                    = {result > 0 ? `+${result}` : result}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TheorySection>

      {/* 7. Szekció: Gyakori hibák és tipikus csapdák */}
      <TheorySection
        number={7}
        title="Gyakori hibák és tipikus csapdák"
        icon={<Zap className="w-5 h-5 text-rose-600 dark:text-rose-400" />}
        badgeColor="rose"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryTrapBox
            title="1. Csapda: Két mínusz jel találkozása (-(-b))"
            wrong="-7 - (-5) = -12"
            correct="-7 - (-5) = -7 + 5 = -2"
            explanation="A két egymást követő mínusz jel pozitívra vált: a -5 kivonása megegyezik a +5 hozzáadásával."
          />

          <TheoryTrapBox
            title="2. Csapda: Kivonás negatív számból"
            wrong="-6 - 4 = -2"
            correct="-6 - 4 = -10"
            explanation="Ha -6-ból még 4-et elveszünk, a számegyenesen még 4 egységet balra lépünk, így -10-re érkezünk."
          />

          <TheoryTrapBox
            title="3. Csapda: Különböző előjelek összege"
            wrong="(-8) + (+12) = -4"
            correct="(-8) + (+12) = +4"
            explanation="Mivel a +12 abszolút értéke (12) nagyobb, mint a -8 abszolút értéke (8), a pozitív túlsúly érvényesül."
          />

          <TheoryTrapBox
            title="4. Csapda: Nulla a kivonásban"
            wrong="0 - (-8) = -8"
            correct="0 - (-8) = 0 + 8 = +8"
            explanation="A nullából levonva a -8-at, annak ellentettjét (+8) kapjuk eredményül."
          />
        </div>
      </TheorySection>

      {/* 8. Szekció: Összefoglaló táblázat */}
      <TheorySection
        number={8}
        title="Összefoglaló szabálytáblázat"
        icon={<BookOpen className="w-5 h-5 text-slate-700 dark:text-slate-300" />}
        badgeColor="slate"
      >
        <TheoryTable
          headers={['Művelet típusa', 'Előjelszabály', 'Példa levezetéssel', 'Geometriai elmozdulás']}
          rows={[
            [
              <strong className="text-emerald-700 dark:text-emerald-400">Azonos előjelű összeadás</strong>,
              <code className="font-mono text-xs">(+a) + (+b) | (-a) + (-b)</code>,
              <span className="font-mono">(-6) + (-3) = -9</span>,
              <span>Azonos irányba lépegetünk az origótól távolodva.</span>
            ],
            [
              <strong className="text-indigo-700 dark:text-indigo-400">Különböző előjelű összeadás</strong>,
              <code className="font-mono text-xs">Nagyobb absz. értékből kisebb</code>,
              <span className="font-mono">(-8) + (+13) = +5</span>,
              <span>Ellentétes irányú lépések, a hosszabb lépés iránya dönt.</span>
            ],
            [
              <strong className="text-rose-700 dark:text-rose-400">Kivonás átalakítása</strong>,
              <code className="font-mono text-xs">a - b = a + (-b)</code>,
              <span className="font-mono">7 - 12 = 7 + (-12) = -5</span>,
              <span>Kivonás helyett ellentett hozzáadása történik.</span>
            ],
            [
              <strong className="text-blue-700 dark:text-blue-400">Kettős mínusz felbontása</strong>,
              <code className="font-mono text-xs">-(-a) = +a</code>,
              <span className="font-mono">-4 - (-9) = -4 + 9 = +5</span>,
              <span>Az ellentett levonása pozitív elmozdulást eredményez.</span>
            ]
          ]}
        />
      </TheorySection>
    </TheoryTemplate>
  );
}
