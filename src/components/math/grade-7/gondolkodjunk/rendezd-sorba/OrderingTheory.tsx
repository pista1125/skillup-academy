import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable
} from '../TheoryTemplate';
import {
  FactorialSlotsDiagram,
  PermutationTreeDiagram,
  ZeroConstraintDiagram,
  CirclePermutationDiagram
} from './OrderingDiagrams';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Sparkles,
  Layers,
  RotateCcw,
  Plus,
  Minus,
  Shuffle,
  Lightbulb,
  ListOrdered,
  Maximize2,
  Minimize2,
  ArrowRightLeft
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface OrderingTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

// Color palette for interactive lab items
const ITEM_COLORS = [
  { label: '🔴 Piros (A)', bg: 'bg-rose-500', text: 'text-white', border: 'border-rose-600', val: 'A' },
  { label: '🔵 Kék (B)', bg: 'bg-blue-500', text: 'text-white', border: 'border-blue-600', val: 'B' },
  { label: '🟢 Zöld (C)', bg: 'bg-emerald-500', text: 'text-white', border: 'border-emerald-600', val: 'C' },
  { label: '🟡 Sárga (D)', bg: 'bg-amber-500', text: 'text-white', border: 'border-amber-600', val: 'D' },
  { label: '🟣 Lila (E)', bg: 'bg-purple-500', text: 'text-white', border: 'border-purple-600', val: 'E' }
];

export const OrderingTheory: React.FC<OrderingTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // Interactive Lab State: Number of elements (2 to 5)
  const [numItems, setNumItems] = useState<number>(3);
  const [currentOrder, setCurrentOrder] = useState<number[]>([0, 1, 2]);

  // Factorial calculator
  const factorial = (n: number): number => {
    if (n <= 1) return 1;
    let res = 1;
    for (let i = 2; i <= n; i++) res *= i;
    return res;
  };

  // Generate all permutations of indices 0..n-1
  const getAllPermutations = (n: number): number[][] => {
    const results: number[][] = [];
    const helper = (arr: number[], current: number[]) => {
      if (arr.length === 0) {
        results.push(current);
        return;
      }
      for (let i = 0; i < arr.length; i++) {
        helper(
          arr.filter((_, idx) => idx !== i),
          [...current, arr[i]]
        );
      }
    };
    helper(Array.from({ length: n }, (_, i) => i), []);
    return results;
  };

  const handleItemCountChange = (count: number) => {
    const valid = Math.max(2, Math.min(5, count));
    setNumItems(valid);
    setCurrentOrder(Array.from({ length: valid }, (_, i) => i));
  };

  const swapItems = (idx1: number, idx2: number) => {
    const next = [...currentOrder];
    const temp = next[idx1];
    next[idx1] = next[idx2];
    next[idx2] = temp;
    setCurrentOrder(next);
  };

  const randomizeOrder = () => {
    const next = [...currentOrder];
    for (let i = next.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [next[i], next[j]] = [next[j], next[i]];
    }
    setCurrentOrder(next);
  };

  const allPerms = getAllPermutations(numItems);

  return (
    <TheoryTemplate
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      documentId="g7-logic-order-it-theory-doc"
      pdfFilename="7_osztaly_gondolkodjunk_rendezd_sorba.pdf"
      badgeText="7. Osztály • Matematika I. Témakör"
      title="2. Rendezd sorba!"
      subtitle="Sorrendek, permutációk, a faktoriális fogalma, sorbarendezés megkötésekkel és körasztal-szimmetria"
      quickRule={{
        label: 'Faktoriális & Sorbarendezés',
        formula: 'n! = n · (n - 1) ··· 1,   Körasztal: (n - 1)!'
      }}
      themeColor="violet"
      practiceTitle="Készen állsz a sorbarendezési feladatok gyakorlására?"
      practiceSubtitle="30 válogatott feladat 3 nehézségi szinten, lépésről lépésre megoldásokkal, kártyás párosítóval és csoportosítóval!"
    >
      {/* SECTION 1: Különböző elemek sorba rendezése és a Faktoriális */}
      <TheorySection
        number={1}
        title="Különböző elemek sorba rendezése és a Faktoriális (n!)"
        icon={<ListOrdered className="w-5 h-5 text-violet-600 dark:text-violet-400" />}
        badgeColor="violet"
      >
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
            Gyakran nemcsak az a kérdés, hogy mely elemeket választjuk ki, hanem az is, hogy <strong>milyen sorrendben</strong> helyezzük el őket. A különböző elemek sorrendjeinek számát a matematikában <strong>permutációnak</strong> nevezzük.
          </p>

          {/* SVG Factorial Slots Diagram */}
          <FactorialSlotsDiagram />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TheoryCard title="A Sorbarendezési Szabály (Helykitöltés)" variant="violet">
              <div className="space-y-2 text-xs sm:text-sm">
                <p>Ha <em>n</em> darab különböző tárgyat helyezünk el egy sorban:</p>
                <ul className="list-disc list-inside space-y-1 font-mono text-xs text-slate-700 dark:text-slate-300">
                  <li>1. helyre: <strong>n</strong> lehetőség</li>
                  <li>2. helyre: <strong>n - 1</strong> lehetőség</li>
                  <li>3. helyre: <strong>n - 2</strong> lehetőség</li>
                  <li>...</li>
                  <li>Utolsó helyre: <strong>1</strong> lehetőség</li>
                </ul>
                <div className="p-2.5 rounded-xl bg-violet-50 dark:bg-violet-950/50 font-mono font-bold text-violet-700 dark:text-violet-300 text-center">
                  Összes sorrend = n · (n - 1) · (n - 2) ··· 1 = n!
                </div>
              </div>
            </TheoryCard>

            <TheoryCard title="Gyakori Faktoriális Értékek" variant="indigo">
              <div className="space-y-1.5 text-xs sm:text-sm font-mono">
                <div className="flex justify-between p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800">
                  <span>1! = 1</span>
                  <span className="text-slate-500">(1 elem)</span>
                </div>
                <div className="flex justify-between p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800">
                  <span>2! = 2 · 1 = 2</span>
                  <span className="text-slate-500">(2 elem)</span>
                </div>
                <div className="flex justify-between p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800">
                  <span>3! = 3 · 2 · 1 = 6</span>
                  <span className="text-slate-500">(3 elem)</span>
                </div>
                <div className="flex justify-between p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 font-bold text-indigo-600 dark:text-indigo-400">
                  <span>4! = 4 · 3 · 2 · 1 = 24</span>
                  <span className="text-slate-500">(4 elem)</span>
                </div>
                <div className="flex justify-between p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 font-black text-violet-600 dark:text-violet-400">
                  <span>5! = 5 · 4 · 3 · 2 · 1 = 120</span>
                  <span className="text-slate-500">(5 elem)</span>
                </div>
              </div>
            </TheoryCard>
          </div>

          {/* SVG Tree Diagram */}
          <PermutationTreeDiagram />
        </div>
      </TheorySection>

      {/* SECTION 2: Megkötések a Sorbarendezésnél */}
      <TheorySection
        number={2}
        title="Megkötések a Sorbarendezésnél (0 az élen, Szomszédság)"
        icon={<Layers className="w-5 h-5 text-amber-600 dark:text-amber-400" />}
        badgeColor="amber"
      >
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
            A feladatokban gyakran előfordulnak speciális feltételek: egy bizonyos elem nem kerülhet egy adott pozícióba, vagy bizonyos elemeknek mindig <strong>egymás mellett</strong> (vagy éppen <strong>külön</strong>) kell állniuk.
          </p>

          {/* SVG Zero Constraint Diagram */}
          <ZeroConstraintDiagram />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TheoryCard title="1. Szomszédos elemek («Blokkosítás»)" variant="purple" badge="Trükk">
              <div className="space-y-2 text-xs sm:text-sm">
                <p>
                  Ha két személynek (pl. Annának és Bélának) <strong>mindig egymás mellett</strong> kell ülnie:
                </p>
                <div className="p-2.5 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-900 dark:text-purple-200 font-mono text-xs space-y-1">
                  <div>1. Tekintsük őket <strong>1etlen «blokknak»</strong> (AB vagy BA: 2 lehetőség).</div>
                  <div>2. A többi 2 emberrel együtt így 3 blokkot rendezünk sorba: 3! = 6.</div>
                  <div className="font-bold text-purple-700 dark:text-purple-300 pt-1">
                    Összesen = 2 · 3! = 2 · 6 = 12 ülésrend.
                  </div>
                </div>
              </div>
            </TheoryCard>

            <TheoryCard title="2. Nem szomszédos elemek (Komplementer)" variant="rose" badge="Módszer">
              <div className="space-y-2 text-xs sm:text-sm">
                <p>
                  Ha Anna és Béla <strong>NEM ülhetnek egymás mellett</strong>:
                </p>
                <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200 font-mono text-xs space-y-1">
                  <div>1. Összes ülésrend megkötés nélkül: 4! = 24.</div>
                  <div>2. Rossz esetek (egymás mellett ülnek): 12.</div>
                  <div className="font-bold text-rose-700 dark:text-rose-300 pt-1">
                    Nem szomszédos = 24 - 12 = 12 ülésrend.
                  </div>
                </div>
              </div>
            </TheoryCard>
          </div>

          <TheoryTrapBox
            wrongTitle="Gyakori Hiba (0 számjegy a szám elején)"
            wrongText="Hány 4-jegyű szám készíthető a 0, 2, 5, 8 jegyekből? Rossz válasz: 4! = 24 szám."
            correctTitle="Helyes Számítás (A 0 nem lehet az 1. helyen)"
            correctText="Az 1. helyre csak 3 számjegy (2, 5, 8) kerülhet. A 2. helyre a maradék 3, a 3. helyre 2, az utolsóra 1: 3 · 3 · 2 · 1 = 18 szám."
            explanation="A matematika szabályai szerint egy többjegyű szám nem kezdődhet 0-val (a 0258 nem négyjegyű szám, hanem háromjegyű: 258)."
          />
        </div>
      </TheorySection>

      {/* SECTION 3: Kör Alakú Elrendezés */}
      <TheorySection
        number={3}
        title="Kör Alakú Elrendezés (Körasztal Köré Ültetés)"
        icon={<RotateCcw className="w-5 h-5 text-teal-600 dark:text-teal-400" />}
        badgeColor="teal"
      >
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
            Ha embereket egyenes pad helyett <strong>körasztal köré</strong> ültetünk le, a székek elforgatásával a szomszédsági viszonyok nem változnak meg. Ezért a kör alakú sorbarendezés kevesebb különböző esetet eredményez!
          </p>

          {/* SVG Circle Diagram */}
          <CirclePermutationDiagram />

          <TheoryCallout type="tip" title="Hogyan számoljuk a körasztalos elrendezéseket?">
            <div className="space-y-1.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <p>
                <strong>n ember körasztal körüli elrendezéseinek száma: (n - 1)!</strong>
              </p>
              <ul className="list-disc list-inside space-y-1 text-xs">
                <li>3 ember körasztal körül: (3 - 1)! = 2! = <strong>2 elrendezés</strong></li>
                <li>4 ember körasztal körül: (4 - 1)! = 3! = <strong>6 elrendezés</strong></li>
                <li>5 ember körasztal körül: (5 - 1)! = 4! = <strong>24 elrendezés</strong></li>
              </ul>
              <p className="text-[11px] text-slate-500 pt-1">
                Magyarázat: Az 1. embert tetszőlegesen leültetjük (ez rögzíti a vonatkoztatási pontot), és a maradék n - 1 embert rendezzük el hozzá képest.
              </p>
            </div>
          </TheoryCallout>
        </div>
      </TheorySection>

      {/* SECTION 4: Anagrammák és Betűkeverés */}
      <TheorySection
        number={4}
        title="Betűk Sorrendje és Anagrammák"
        icon={<Sparkles className="w-5 h-5 text-pink-600 dark:text-pink-400" />}
        badgeColor="pink"
      >
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
            Az <strong>anagramma</strong> egy szó betűinek átrendezésével kapott új szó (vagy betűsorozat). A kombinatorikában mind az értelmes szavakat, mind az értelmetlen betűkombinációkat számoljuk.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TheoryCard title="Csupa különböző betű" variant="pink">
              <div className="space-y-2 text-xs sm:text-sm">
                <p>Hány 5-betűs szó képezhető a <strong>MATEK</strong> szó betűiből?</p>
                <div className="p-2.5 rounded-xl bg-pink-50 dark:bg-pink-950/50 font-mono font-bold text-pink-700 dark:text-pink-300">
                  5 különböző betű → 5! = 120 szó
                </div>
              </div>
            </TheoryCard>

            <TheoryCard title="Rögzített kezdő- vagy záróbetű" variant="violet">
              <div className="space-y-2 text-xs sm:text-sm">
                <p>Hány olyan szó képezhető a <strong>MATEK</strong> betűiből, amely <strong>M-mel kezdődik</strong>?</p>
                <div className="p-2.5 rounded-xl bg-violet-50 dark:bg-violet-950/50 font-mono text-xs text-slate-800 dark:text-slate-200">
                  <div>• 1. betű: <strong>1 lehetőség</strong> (csak M)</div>
                  <div>• Maradék 4 betű sorrendje: <strong>4! = 24</strong></div>
                  <div className="font-bold text-violet-600 dark:text-violet-400 pt-1">Összesen = 1 · 24 = 24 szó</div>
                </div>
              </div>
            </TheoryCard>
          </div>
        </div>
      </TheorySection>

      {/* SECTION 5: Interaktív Laboratórium */}
      <TheorySection
        number={5}
        title="Interaktív Laboratórium: Permutáció Generátor és Sorrendváltó"
        icon={<Sparkles className="w-5 h-5 text-amber-500" />}
        badgeColor="amber"
      >
        <Card className="rounded-3xl border-2 border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/60 p-4 sm:p-6 space-y-6">
          {/* Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                <span>Elemek száma (n):</span>
                <span className="text-base font-black text-violet-600 dark:text-violet-400">{numItems} db elem</span>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleItemCountChange(numItems - 1)}
                  disabled={numItems <= 2}
                  className="rounded-xl h-8 w-8 p-0"
                >
                  <Minus className="w-3.5 h-3.5" />
                </Button>
                <div className="flex-1 bg-slate-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                  <div className="bg-violet-600 h-full transition-all" style={{ width: `${((numItems - 2) / 3) * 100}%` }} />
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleItemCountChange(numItems + 1)}
                  disabled={numItems >= 5}
                  className="rounded-xl h-8 w-8 p-0"
                >
                  <Plus className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>

            <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-slate-500 dark:text-slate-400">
                  Összes lehetséges sorrend:
                </div>
                <div className="text-xl font-mono font-black text-violet-700 dark:text-violet-300 mt-1">
                  {numItems}! = {factorial(numItems)} sorrend
                </div>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={randomizeOrder}
                className="rounded-xl h-8 px-3 text-xs font-bold gap-1"
              >
                <Shuffle className="w-3.5 h-3.5" />
                Keverés
              </Button>
            </div>
          </div>

          {/* Interactive Item Row */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-slate-600 dark:text-slate-400 flex items-center justify-between">
              <span>Jelenlegi sorrend (kattints a nyilakra a felcseréléshez):</span>
            </div>

            <div className="flex flex-wrap gap-2 sm:gap-3 items-center justify-center p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
              {currentOrder.map((itemIdx, pos) => {
                const item = ITEM_COLORS[itemIdx];
                return (
                  <div key={pos} className="flex flex-col items-center gap-1.5 animate-in zoom-in-50">
                    <div className="text-[10px] font-bold text-slate-400">
                      {pos + 1}. hely
                    </div>
                    <div className={cn(
                      "w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex flex-col items-center justify-center shadow-md font-black text-lg transition-transform hover:scale-105",
                      item.bg,
                      item.text
                    )}>
                      <span>{item.val}</span>
                      <span className="text-[9px] font-medium opacity-80">{item.label.split(' ')[1]}</span>
                    </div>

                    {/* Swap Controls */}
                    <div className="flex items-center gap-1 mt-1">
                      {pos > 0 && (
                        <button
                          onClick={() => swapItems(pos, pos - 1)}
                          className="p-1 rounded-md bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-600 dark:text-slate-300 text-[10px]"
                          title="Csere balra"
                        >
                          ◀
                        </button>
                      )}
                      {pos < currentOrder.length - 1 && (
                        <button
                          onClick={() => swapItems(pos, pos + 1)}
                          className="p-1 rounded-md bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-600 dark:text-slate-300 text-[10px]"
                          title="Csere jobbra"
                        >
                          ▶
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Generated All Permutations Preview List */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-slate-600 dark:text-slate-400 flex items-center justify-between">
              <span>Az összes ({allPerms.length} db) permutáció lexikografikus listája:</span>
            </div>

            <div className="max-h-48 overflow-y-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 p-3 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 text-xs font-mono">
              {allPerms.map((perm, pIdx) => {
                const isCurrent = perm.every((v, i) => v === currentOrder[i]);
                return (
                  <div
                    key={pIdx}
                    onClick={() => setCurrentOrder(perm)}
                    className={cn(
                      "p-2 rounded-xl border text-center cursor-pointer transition-all flex items-center justify-between",
                      isCurrent
                        ? "bg-violet-100 dark:bg-violet-950/70 border-violet-500 font-black text-violet-800 dark:text-violet-200 shadow-xs"
                        : "bg-slate-50 dark:bg-slate-850 border-slate-200 dark:border-slate-700 hover:border-violet-300 text-slate-700 dark:text-slate-300"
                    )}
                  >
                    <span className="text-[10px] text-slate-400">{pIdx + 1}.</span>
                    <span>{perm.map(i => ITEM_COLORS[i].val).join(' ')}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </Card>
      </TheorySection>
    </TheoryTemplate>
  );
};
