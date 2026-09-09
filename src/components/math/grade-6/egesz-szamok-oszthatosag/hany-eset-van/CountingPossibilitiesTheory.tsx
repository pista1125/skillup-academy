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
  Dices,
  GitFork,
  Coins,
  Shirt,
  Boxes
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface CountingPossibilitiesTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

export function CountingPossibilitiesTheory({ onBack, onStartQuiz }: CountingPossibilitiesTheoryProps) {
  // Interactive Simulator State:
  // Clothing combination calculator: tops (2..5), bottoms (2..4), shoes (1..3)
  const [tops, setTops] = useState<number>(3);
  const [bottoms, setBottoms] = useState<number>(2);
  const [shoes, setShoes] = useState<number>(2);

  const totalCombinations = tops * bottoms * shoes;

  return (
    <TheoryTemplate
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      topicBadge="🎲 6. Osztály • I. Egész számok"
      title="Hány eset van? Számoljuk össze!"
      subtitle="Rendszerezett összeszámolás, fastruktúra (fa-diagram) és a szorzási szabály"
      ruleTitle="Alapszabály"
      ruleFormula="Összes eset = n₁ · n₂ · n₃ · ... · nₖ"
      themeColor="amber"
      pdfElementId="counting-possibilities-theory-content"
      pdfFilename="Hany_Eset_Van_Tananyag"
    >
      {/* 1. Szekció: Miért fontos a rendszerezés? */}
      <TheorySection
        number={1}
        title="A rendszerezett összeszámolás alapelve"
        icon={<Dices className="w-5 h-5 text-amber-600 dark:text-amber-400" />}
        badgeColor="amber"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="Mi a kombinatorika célja?" icon={<Lightbulb className="w-4 h-4 text-amber-500" />}>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-2">
              A kombinatorika azt vizsgálja, hogy bizonyos feltételeknek megfelelő elemeket hányféleképpen választhatunk ki, rendezhetünk el vagy kombinálhatunk.
            </p>
            <div className="p-3 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900 text-xs space-y-1">
              <div className="font-bold text-amber-800 dark:text-amber-300">💡 Aranyszabály:</div>
              <div className="text-slate-600 dark:text-slate-300">
                Soha ne találomra, össze-vissza próbálgassunk! Alakítsunk ki egy <strong>szigorú sorrendet</strong> (pl. nagyság szerint, ábécé szerint, vagy pozíciók szerint), hogy egyetlen esetet se hagyjunk ki és semmit se számoljunk duplán.
              </div>
            </div>
          </TheoryCard>

          <TheoryCard title="Gyakori mindennapi példák" icon={<Sparkles className="w-4 h-4 text-indigo-500" />}>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
              <li className="flex items-start gap-2">
                <span className="font-bold text-amber-600">👗 Ruhatár:</span>
                <span>Hányféleképpen öltözhetünk fel adott pólókból, nadrágokból és cipőkből?</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-amber-600">🔢 PIN-kódok & Jelszavak:</span>
                <span>Hány különböző 4-jegyű PIN kód létezik a számjegyekből?</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-amber-600">🏁 Versenyek & Rangsorok:</span>
                <span>Hányféle sorrendben érhet célba 4 futó a döntőben?</span>
              </li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 2. Szekció: A Fastruktúra (Fa-diagram) */}
      <TheorySection
        number={2}
        title="A Fastruktúra (Fa-diagram) módszere"
        icon={<GitFork className="w-5 h-5 text-amber-600 dark:text-amber-400" />}
        badgeColor="amber"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="Hogyan épül fel a fa-diagram?" icon={<BookOpen className="w-4 h-4 text-emerald-500" />}>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-2">
              A fa-diagram minden döntési pontból annyi ágat indít, ahány lehetőség van. Az ágak mentén végighaladva kapjuk meg az egyes kimeneteleket:
            </p>
            <div className="p-3 rounded-xl bg-slate-900 text-white font-mono text-xs space-y-1.5">
              <div className="text-amber-400 font-bold">Példa: 2 érmedobás fa-diagramja</div>
              <div>1. dobás: Fej (F) vagy Írás (I) &nbsp;[2 ág]</div>
              <div>2. dobás: Mindkettőből (F) vagy (I) &nbsp;[2 · 2 = 4 ág]</div>
              <div className="text-emerald-400 font-bold pt-1">Kimenetelek: (F,F), (F,I), (I,F), (I,I) $\to$ 4 eset</div>
            </div>
          </TheoryCard>

          <TheoryCard title="A szorzási szabály (Független választások)" icon={<Calculator className="w-4 h-4 text-violet-500" />}>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-2">
              Ha az 1. lépésben <code className="font-bold">a</code> lehetőség van, a 2. lépésben <code className="font-bold">b</code> lehetőség, a 3. lépésben <code className="font-bold">c</code> lehetőség, akkor az összes lehetőség száma:
            </p>
            <div className="p-3 rounded-xl bg-violet-50 dark:bg-violet-950/30 border border-violet-100 dark:border-violet-900 text-center font-mono">
              <div className="text-base font-black text-violet-700 dark:text-violet-300">Összes eset = a · b · c</div>
              <div className="text-[11px] text-slate-500 mt-1">Pl. 3 fagylaltíz · 2 féle tölcsér · 4 féle szórás = 3 · 2 · 4 = <strong>24 féle fagylaltkehely</strong>.</div>
            </div>
          </TheoryCard>
        </div>

        <TheoryCallout type="tip" title="Fontos szabály a számképzésnél">
          <p className="text-xs sm:text-sm leading-relaxed">
            Ha többjegyű számokat alkotunk megadott számjegyekből (pl. 0, 3, 5, 8), a <strong>legelső számjegy (a legnagyobb helyiérték) NEM LEHET NULLA (0)</strong>, mert akkor az nem négyjegyű, hanem háromjegyű szám lenne!
          </p>
        </TheoryCallout>
      </TheorySection>

      {/* 3. Szekció: Tipikus feladattípusok és buktatók */}
      <TheorySection
        number={3}
        title="Gyakori feladattípusok 6. osztályban"
        icon={<AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />}
        badgeColor="amber"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryTrapBox title="1. Elemek sorbaállítása (Ismétlés nélkül)">
            <div className="space-y-2 text-xs sm:text-sm">
              <p className="leading-relaxed">
                Hányféleképpen ülhet le 4 gyerek (Anna, Béla, Cili, Dani) 4 egymás melletti székre?
              </p>
              <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 font-mono text-xs space-y-1">
                <div>• 1. székre: 4 gyerek közül választhatunk</div>
                <div>• 2. székre: a maradék 3 gyerek közül</div>
                <div>• 3. székre: a maradék 2 gyerek közül</div>
                <div>• 4. székre: az utolsó 1 gyerek ül</div>
                <div className="text-emerald-600 dark:text-emerald-400 font-bold pt-1">Összesen: 4 · 3 · 2 · 1 = 24 különböző ülésrend!</div>
              </div>
            </div>
          </TheoryTrapBox>

          <TheoryTrapBox title="2. Számjegyek ismétlődhetnek vagy nem?">
            <div className="space-y-2 text-xs sm:text-sm">
              <p className="leading-relaxed">
                Hány 3-jegyű szám képezhető az <code className="font-bold">1, 2, 3</code> számjegyekből?
              </p>
              <div className="space-y-1.5 text-xs">
                <div className="p-2 rounded-lg bg-rose-50 dark:bg-rose-950/30 text-rose-900 dark:text-rose-200">
                  <strong>A) Ha a számjegyek NEM ismétlődhetnek:</strong><br />
                  3 · 2 · 1 = <strong>6 darab</strong> (123, 132, 213, 231, 312, 321).
                </div>
                <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 text-emerald-900 dark:text-emerald-200">
                  <strong>B) Ha a számjegyek ISMÉTLŐDHETNEK:</strong><br />
                  3 · 3 · 3 = <strong>27 darab</strong> (111, 112, 113, ..., 333).
                </div>
              </div>
            </div>
          </TheoryTrapBox>
        </div>
      </TheorySection>

      {/* 4. Szekció: Interaktív Ruházat és Kombináció Laboratórium */}
      <TheorySection
        number={4}
        title="Interaktív Eset-összeszámláló Laboratórium"
        icon={<Compass className="w-5 h-5 text-amber-600 dark:text-amber-400" />}
        badgeColor="amber"
      >
        <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-yellow-500/10 border-2 border-amber-200/60 dark:border-amber-800/40">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Control Column */}
            <div className="w-full md:w-1/2 space-y-4">
              <div className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
                Állítsd be a választási lehetőségeket:
              </div>

              {/* Tops */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-semibold text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
                    <span>👕 Felső ruhák (pólók, ingek):</span>
                  </span>
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300">
                    {tops} db
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="6"
                  step="1"
                  value={tops}
                  onChange={(e) => setTops(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-600"
                />
              </div>

              {/* Bottoms */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-semibold text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
                    <span>👖 Nadrágok / Szoknyák:</span>
                  </span>
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-orange-100 dark:bg-orange-950 text-orange-700 dark:text-orange-300">
                    {bottoms} db
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  step="1"
                  value={bottoms}
                  onChange={(e) => setBottoms(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-orange-600"
                />
              </div>

              {/* Shoes */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-semibold text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
                    <span>👟 Cipők / Lábbelik:</span>
                  </span>
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-yellow-100 dark:bg-yellow-950 text-yellow-700 dark:text-yellow-300">
                    {shoes} pár
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="4"
                  step="1"
                  value={shoes}
                  onChange={(e) => setShoes(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-yellow-600"
                />
              </div>
            </div>

            {/* Visualizer Result */}
            <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm text-center">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-2">
                Szorzási szabály alkalmazása
              </span>

              <div className="flex items-center justify-center gap-2 text-xl sm:text-2xl font-mono font-black text-slate-900 dark:text-slate-100 my-3">
                <span className="text-amber-600">{tops}</span>
                <span className="text-slate-400">·</span>
                <span className="text-orange-600">{bottoms}</span>
                <span className="text-slate-400">·</span>
                <span className="text-yellow-600">{shoes}</span>
                <span className="text-slate-400">=</span>
                <span className="px-3.5 py-1 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-200 text-3xl font-black">
                  {totalCombinations}
                </span>
              </div>

              <div className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                Összesen <strong>{totalCombinations} különböző öltözék-szett</strong> állítható össze!
              </div>
              <p className="text-[11px] text-slate-400 mt-2 max-w-xs">
                Minden egyes felsőhöz {bottoms} nadrágot, és azok mindegyikéhez {shoes} cipőt választhatunk.
              </p>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* Összefoglaló táblázat */}
      <TheoryTable
        title="Kombinatorikai és összeszámolási módszerek összefoglalása"
        headers={['Módszer neve', 'Mikor használjuk?', 'Kiszámítás módja', 'Példa', 'Eredmény']}
        rows={[
          ['Szorzási szabály', 'Független döntési lépések esetén', 'a · b · c · ...', '3 nadrág, 4 póló, 2 cipő', '3 · 4 · 2 = 24 szett'],
          ['Sorbaállítás (Permutáció)', 'n különböző elem összes lehetséges sorrendje', 'n · (n-1) · ... · 1', '3 gyerek leülése 3 székre', '3 · 2 · 1 = 6 sorrend'],
          ['Érmedobások', 'n darab pénzérme feldobása (Fej/Írás)', '2 · 2 · ... · 2 (2ⁿ)', '3 érme feldobása', '2 · 2 · 2 = 8 eset'],
          ['Kockadobások', 'n darab dobókocka feldobása (1-től 6-ig)', '6 · 6 · ... · 6 (6ⁿ)', '2 kocka feldobása', '6 · 6 = 36 eset'],
          ['Számképzés 0 nélkül', 'Számjegyekből többjegyű számok (nem ismétlődhetnek)', 'a · (a-1) · (a-2)', '3-jegyű számok 1, 2, 3-ból', '3 · 2 · 1 = 6 szám'],
          ['Számképzés 0-val', 'Ha 0 is szerepel, az első helyre nem kerülhet 0', '(a-1) · (a-1) · (a-2)', '3-jegyű számok 0, 1, 2-ből (különböző)', '2 · 2 · 1 = 4 szám (102, 120, 201, 210)']
        ]}
      />
    </TheoryTemplate>
  );
}
