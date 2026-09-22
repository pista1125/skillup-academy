import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable,
  LogicFigureCard
} from '../TheoryTemplate';
import {
  PigeonholePrincipleDiagram,
  TreeDiagram,
  VennDiagram,
  DiceGridDiagram
} from './CountingDiagrams';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Sparkles,
  Calculator,
  Layers,
  RotateCcw,
  Boxes,
  Network,
  Dices,
  Plus,
  Minus,
  Shuffle,
  Lightbulb
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { MathText } from '@/components/math/shared/MathText';

interface CountingTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

export const CountingTheory: React.FC<CountingTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // Interactive Lab 1: Dirichlet Simulator State
  const [numBoxes, setNumBoxes] = useState<number>(3);
  const [numBalls, setNumBalls] = useState<number>(7);
  const [ballDistribution, setBallDistribution] = useState<number[]>([3, 2, 2]);

  // Interactive Lab 2: Multiplication Rule & Tree State
  const [numTops, setNumTops] = useState<number>(3);
  const [numPants, setNumPants] = useState<number>(2);
  const [activeLabTab, setActiveLabTab] = useState<'dirichlet' | 'tree'>('dirichlet');

  // Distribute balls evenly or randomly
  const distributeEvenly = (boxes: number, balls: number) => {
    const arr = new Array(boxes).fill(0);
    for (let i = 0; i < balls; i++) {
      arr[i % boxes]++;
    }
    return arr;
  };

  const handleBoxChange = (newBoxes: number) => {
    const validBoxes = Math.max(2, Math.min(6, newBoxes));
    setNumBoxes(validBoxes);
    setBallDistribution(distributeEvenly(validBoxes, numBalls));
  };

  const handleBallChange = (newBalls: number) => {
    const validBalls = Math.max(1, Math.min(20, newBalls));
    setNumBalls(validBalls);
    setBallDistribution(distributeEvenly(numBoxes, validBalls));
  };

  const randomizeDistribution = () => {
    const arr = new Array(numBoxes).fill(0);
    for (let i = 0; i < numBalls; i++) {
      const randomBox = Math.floor(Math.random() * numBoxes);
      arr[randomBox]++;
    }
    setBallDistribution(arr);
  };

  const minMaxBallsInBox = Math.ceil(numBalls / numBoxes);
  const currentMaxInBox = Math.max(...ballDistribution);

  return (
    <TheoryTemplate
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      documentId="g7-logic-count-it-theory-doc"
      pdfFilename="7_osztaly_gondolkodjunk_szamold_ossze.pdf"
      badgeText="7. Osztály • Matematika I. Témakör"
      title="1. Számold össze!"
      subtitle="Rendszerezett összeszámlálás, lexikografikus felsorolás, fa-diagramok, a skatulya-elv és halmazok elemszáma"
      quickRule={{
        label: 'Skatulya-elv & Szita-formula',
        formula: '|A ∪ B| = |A| + |B| - |A ∩ B|,  ⌈N / K⌉'
      }}
      themeColor="blue"
      practiceTitle="Készen állsz az összeszámlálási feladatok tesztelésére?"
      practiceSubtitle="30 válogatott feladat 3 nehézségi szinten, lépésről lépésre megoldásokkal, kártyás párosítóval és csoportosítóval!"
    >
      {/* SECTION 1: Rendszerezett felsorolás és Fa-diagram */}
      <TheorySection
        number={1}
        title="Rendszerezett felsorolás és Fa-diagram (ágas diagram)"
        icon={<Network className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
        badgeColor="blue"
      >
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
            A hétköznapi életben és a matematikában is gyakran felmerül a kérdés: <strong>hányféle lehetőség, kimenetel vagy választás létezik?</strong> Ha találomra próbáljuk felírni a lehetőségeket, szinte biztosan kihagyunk néhányat, vagy duplán számolunk. Ezért elengedhetetlen a <strong>rendszeres és fegyelmezett leszámlálás</strong>.
          </p>

          {/* SVG Tree Diagram */}
          <TreeDiagram />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TheoryCard
              title="1. Lexikografikus (ábécé- vagy számrendi) rendezés"
              badge="Módszer"
              variant="blue"
            >
              <p className="text-xs sm:text-sm">
                Az eseteket szigorú, előre rögzített sorrendben írjuk fel (pl. mint a szótárban az ábécét vagy a növekvő számrendet).
              </p>
              <div className="mt-2 p-2.5 rounded-xl bg-blue-50/50 dark:bg-slate-800/80 border border-blue-100 dark:border-slate-700 text-xs font-mono space-y-1">
                <div className="text-blue-700 dark:text-blue-300 font-bold">Példa: 1, 2, 3 számjegyekből 3-jegyű számok:</div>
                <div className="text-slate-700 dark:text-slate-300">123, 132, 213, 231, 312, 321 (összesen 6 szám)</div>
              </div>
            </TheoryCard>

            <TheoryCard
              title="2. Fa-diagram (ágas döntési fa)"
              badge="Vizuális eszköz"
              variant="indigo"
            >
              <p className="text-xs sm:text-sm">
                A lehetőségeket lépésről lépésre elágazó fa formájában ábrázoljuk. Minden szint egy-egy döntési lépésnek felel meg, a végső ágak száma adja a kimenetelek összegét.
              </p>
              <div className="mt-2 p-2.5 rounded-xl bg-indigo-50/50 dark:bg-slate-800/80 border border-indigo-100 dark:border-slate-700 text-xs font-mono space-y-1">
                <div className="text-indigo-700 dark:text-indigo-300 font-bold">Fa struktúra:</div>
                <div className="text-slate-700 dark:text-slate-300">Kezdőpont → 1. döntés ágai → 2. döntés alágai → Eredmény</div>
              </div>
            </TheoryCard>
          </div>

          <TheoryCallout type="example" title="Mintapélda: Kétpénzes kísérlet fa-diagrammal">
            <div className="space-y-1.5 text-xs sm:text-sm">
              <p>Feldobunk két szabályos pénzérmét (Fej = F, Írás = Í). Hányféle kimenetel lehetséges?</p>
              <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-indigo-100 dark:border-indigo-950 font-mono space-y-1 text-slate-800 dark:text-slate-200">
                <div>• 1. érme lehet: <strong>F</strong> vagy <strong>Í</strong> (2 lehetőség)</div>
                <div>• 2. érme lehet: az F után <strong>(F, Í)</strong>, az Í után <strong>(F, Í)</strong></div>
                <div>• Összes lehetséges eset: <strong>(F, F), (F, Í), (Í, F), (Í, Í)</strong> → <strong>4 eset</strong>.</div>
              </div>
            </div>
          </TheoryCallout>
        </div>
      </TheorySection>

      {/* SECTION 2: A Szorzási Szabály és Táblázatok */}
      <TheorySection
        number={2}
        title="A Szorzási Szabály és Táblázatos elrendezés"
        icon={<Calculator className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />}
        badgeColor="indigo"
      >
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
            Ha több független döntést hozunk egymás után, nem szükséges minden egyes ágat lerajzolnunk: alkalmazhatjuk a <strong>kombinatorika alaptételét (a szorzási szabályt)</strong>.
          </p>

          <TheoryCallout type="info" title="A Szorzási Szabály">
            <p className="text-xs sm:text-sm leading-relaxed">
              Ha egy összetett választás első lépését <strong>p-féleképpen</strong> tehetjük meg, és ettől függetlenül a második lépést <strong>q-féleképpen</strong>, akkor a két lépést együttesen <strong>p · q</strong>-féleképpen választhatjuk ki.
              <br />
              Több lépés esetén a lehetőségek száma: <strong>n₁ · n₂ · n₃ ··· nₖ</strong>.
            </p>
          </TheoryCallout>

          {/* SVG Dice Grid Diagram */}
          <DiceGridDiagram />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TheoryCard title="Menüválasztás (3 fogásos ebéd)" variant="indigo">
              <div className="space-y-2 text-xs sm:text-sm">
                <p>Egy étteremben választhatunk 3 féle levest, 4 féle főételt és 2 féle desszertet. Hányféle különböző 3 fogásos menü állítható össze?</p>
                <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 font-mono font-bold text-indigo-600 dark:text-indigo-400">
                  Összes menü = 3 · 4 · 2 = 24 féle
                </div>
              </div>
            </TheoryCard>

            <TheoryCard title="Számképzés 0 nélkül és 0-val" variant="violet">
              <div className="space-y-2 text-xs sm:text-sm">
                <p>Hány 3-jegyű szám képezhető a 0, 4, 7, 9 számjegyekből, ha a jegyek nem ismétlődhetnek?</p>
                <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 font-mono text-slate-800 dark:text-slate-200">
                  <div>1. jegy (nem lehet 0!): <strong>3 lehetőség</strong> (4, 7, 9)</div>
                  <div>2. jegy (a maradék 3 jegyből): <strong>3 lehetőség</strong></div>
                  <div>3. jegy (a maradék 2 jegyből): <strong>2 lehetőség</strong></div>
                  <div className="font-bold text-violet-600 dark:text-violet-400 pt-1">Összesen = 3 · 3 · 2 = 18 szám</div>
                </div>
              </div>
            </TheoryCard>
          </div>
        </div>
      </TheorySection>

      {/* SECTION 3: A Skatulya-elv (Dirichlet-elv) */}
      <TheorySection
        number={3}
        title="A Skatulya-elv (Dirichlet-elv)"
        icon={<Boxes className="w-5 h-5 text-purple-600 dark:text-purple-400" />}
        badgeColor="purple"
      >
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
            A skatulya-elv (vagy Johann Peter Gustav Lejeune Dirichlet német matematikusról elnevezett Dirichlet-elv) a matematika egyik legegyszerűbb, mégis legmélyebb logikai elve.
          </p>

          {/* SVG Pigeonhole Principle Diagram */}
          <PigeonholePrincipleDiagram />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TheoryCard title="Az Alap Skatulya-elv" variant="purple" badge="Alapelv">
              <div className="space-y-2 text-xs sm:text-sm leading-relaxed">
                <p>
                  Ha <strong>n darab skatulyába</strong> legalább <strong>n + 1 darab tárgyat</strong> helyezünk el, akkor biztosan lesz legalább egy olyan skatulya, amelybe <strong>legalább 2 tárgy kerül</strong>.
                </p>
                <div className="p-2 rounded-lg bg-purple-50 dark:bg-purple-950/50 text-purple-800 dark:text-purple-200 font-mono text-xs">
                  Példa: 13 ember közül biztosan van legalább 2, akik ugyanabban a hónapban születtek (13 &gt; 12 hónap).
                </div>
              </div>
            </TheoryCard>

            <TheoryCard title="Az Általánosított Skatulya-elv" variant="violet" badge="Általános alak">
              <div className="space-y-2 text-xs sm:text-sm leading-relaxed">
                <p>
                  Ha <strong>n</strong> skatulyába <strong>k · n + 1</strong> tárgyat osztunk szét, akkor legalább egy skatulyába <strong>legalább k + 1 darab</strong> tárgy jut.
                </p>
                <div className="p-2 rounded-lg bg-violet-50 dark:bg-violet-950/50 text-violet-800 dark:text-violet-200 font-mono text-xs">
                  Képlet: Ha N tárgyat teszünk K skatulyába, a legnépesebb skatulyában legalább <strong>⌈N / K⌉</strong> tárgy van.
                </div>
              </div>
            </TheoryCard>
          </div>

          <TheoryTrapBox
            wrongTitle="Rossz megközelítés (Szerencse feltételezése)"
            wrongText="Ha kihúzok 2 zoknit a sötét fiókból, lehet hogy pont egy párt kapok, tehát elég 2-t húzni."
            correctTitle="Helyes megközelítés (Matematikai garancia)"
            correctText="A kérdés az, hogy hányat KELL húzni a BIZTOS párhoz (legrosszabb eset: 1 fekete + 1 fehér + 1 bármelyik = 3 db)."
            explanation="A skatulya-elv és a kombinatorikai feladatok a garantált, biztosan bekövetkező eseményekről szólnak, nem a szerencsés véletlenről!"
          />

          <TheoryCallout type="tip" title="Gyakori Skatulya Felismerési Analógiák">
            <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <li><strong>Hónapok:</strong> 12 skatulya → 13 embernél min. 2 azonos hónapban született.</li>
              <li><strong>Hét napjai:</strong> 7 skatulya → 8 embernél min. 2 azonos napon született.</li>
              <li><strong>Kártyaszínek:</strong> 4 szín (Kőr, Káró, Treff, Pikk) → 5 lapból min. 2 azonos színű.</li>
              <li><strong>Oszthatóság 5-tel:</strong> 5 lehetséges maradék (0, 1, 2, 3, 4) → 6 tetszőleges egész szám közül van kettő, amelyek 5-tel osztva azonos maradékot adnak (különbségük osztható 5-tel!).</li>
            </ul>
          </TheoryCallout>
        </div>
      </TheorySection>

      {/* SECTION 4: Halmazok elemszáma és Szita-módszer */}
      <TheorySection
        number={4}
        title="Halmazok elemszáma és a Szita-formula"
        icon={<Layers className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />}
        badgeColor="emerald"
      >
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
            Amikor csoportok, tulajdonságok vagy események unióját vizsgáljuk, a halmazelméleti eszközök segítenek elkerülni a többszörös számolást.
          </p>

          {/* SVG Venn Diagram */}
          <VennDiagram />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TheoryCard title="Diszjunkt (közös elem nélküli) halmazok" variant="emerald">
              <div className="space-y-2 text-xs sm:text-sm">
                <p>Ha az A és B halmazoknak nincs közös elemük (A ∩ B = ∅):</p>
                <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 font-mono font-bold text-emerald-700 dark:text-emerald-300 text-center">
                  |A ∪ B| = |A| + |B|
                </div>
              </div>
            </TheoryCard>

            <TheoryCard title="Metsző halmazok (Képhalmazos Szita-formula)" variant="teal">
              <div className="space-y-2 text-xs sm:text-sm">
                <p>Ha van közös rész, a metszetet mindkét halmazban megszámoltuk, ezért egyszer le kell vonni:</p>
                <div className="p-2.5 rounded-xl bg-teal-50 dark:bg-teal-950/50 font-mono font-bold text-teal-700 dark:text-teal-300 text-center">
                  |A ∪ B| = |A| + |B| - |A ∩ B|
                </div>
              </div>
            </TheoryCard>
          </div>

          <TheoryCallout type="example" title="Mintapélda: Nyelvvizsgázók egy osztályban">
            <div className="space-y-2 text-xs sm:text-sm">
              <p>Egy 30 fős osztályban 18 diák tanul angolul, 14 diák németül, és 6 diák mindkét nyelvet tanulja. Hányan nem tanulnak egyik nyelvet sem?</p>
              <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-xs space-y-1 text-slate-800 dark:text-slate-200">
                <div>1. Legalább egy nyelvet tanulók: |A ∪ N| = |A| + |N| - |A ∩ N| = 18 + 14 - 6 = 26 fő.</div>
                <div>2. Csak angolul tanulók: 18 - 6 = 12 fő.</div>
                <div>3. Csak németül tanulók: 14 - 6 = 8 fő.</div>
                <div className="font-bold text-emerald-600 dark:text-emerald-400 pt-1">
                  4. Egyik nyelvet sem tanulók: 30 - 26 = 4 fő.
                </div>
              </div>
            </div>
          </TheoryCallout>

          <TheoryCard title="A Komplementer módszer (Összes - Tiltott esetek)" variant="cyan">
            <div className="space-y-2 text-xs sm:text-sm">
              <p>
                Gyakran sokkal egyszerűbb a keresett tulajdonságú eseteket úgy megkapni, hogy az <strong>Összes lehetséges esetből kivonjuk a rossz (tiltott) eseteket</strong>.
              </p>
              <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 font-mono text-xs">
                <span className="font-bold text-cyan-600 dark:text-cyan-400">Példa:</span> Két kockával dobva hány esetben lesz a szorzat PÁROS?
                <br />
                • Összes dobás: 6 · 6 = 36 eset.
                <br />
                • Szorzat PÁRATLAN, ha mindkét kocka páratlan: 3 · 3 = 9 eset.
                <br />
                • <strong>Páros szorzat = 36 - 9 = 27 eset!</strong>
              </div>
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* SECTION 5: Interaktív Laboratórium */}
      <TheorySection
        number={5}
        title="Interaktív Laboratórium: Skatulya-elv & Szorzási Szabály Szimulátor"
        icon={<Sparkles className="w-5 h-5 text-amber-500" />}
        badgeColor="amber"
      >
        <Card className="rounded-3xl border-2 border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/60 p-4 sm:p-6 space-y-6">
          {/* Tab Navigation */}
          <div className="flex gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
            <Button
              size="sm"
              variant={activeLabTab === 'dirichlet' ? 'default' : 'outline'}
              onClick={() => setActiveLabTab('dirichlet')}
              className={cn(
                "rounded-xl text-xs font-bold",
                activeLabTab === 'dirichlet' ? "bg-blue-600 text-white" : ""
              )}
            >
              <Boxes className="w-4 h-4 mr-1.5" />
              1. Skatulya-elv Szimulátor
            </Button>
            <Button
              size="sm"
              variant={activeLabTab === 'tree' ? 'default' : 'outline'}
              onClick={() => setActiveLabTab('tree')}
              className={cn(
                "rounded-xl text-xs font-bold",
                activeLabTab === 'tree' ? "bg-indigo-600 text-white" : ""
              )}
            >
              <Network className="w-4 h-4 mr-1.5" />
              2. Szorzási Szabály & Esetfa
            </Button>
          </div>

          {activeLabTab === 'dirichlet' ? (
            /* Tab 1: Dirichlet Simulator */
            <div className="space-y-6">
              {/* Controls */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                    <span>Skatulyák (dobozok) száma (K):</span>
                    <span className="text-base font-black text-blue-600 dark:text-blue-400">{numBoxes} db</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleBoxChange(numBoxes - 1)}
                      disabled={numBoxes <= 2}
                      className="rounded-xl h-8 w-8 p-0"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </Button>
                    <div className="flex-1 bg-slate-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                      <div className="bg-blue-600 h-full transition-all" style={{ width: `${((numBoxes - 2) / 4) * 100}%` }} />
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleBoxChange(numBoxes + 1)}
                      disabled={numBoxes >= 6}
                      className="rounded-xl h-8 w-8 p-0"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>

                <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                    <span>Golyók (tárgyak) száma (N):</span>
                    <span className="text-base font-black text-indigo-600 dark:text-indigo-400">{numBalls} db</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleBallChange(numBalls - 1)}
                      disabled={numBalls <= 1}
                      className="rounded-xl h-8 w-8 p-0"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </Button>
                    <div className="flex-1 bg-slate-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                      <div className="bg-indigo-600 h-full transition-all" style={{ width: `${((numBalls - 1) / 19) * 100}%` }} />
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleBallChange(numBalls + 1)}
                      disabled={numBalls >= 20}
                      className="rounded-xl h-8 w-8 p-0"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Action Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  Kattints egy dobozra a golyók áthelyezéséhez, vagy használd a gombokat:
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setBallDistribution(distributeEvenly(numBoxes, numBalls))}
                    className="rounded-xl h-8 px-2.5 text-xs font-bold gap-1"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Egyenletes elosztás
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={randomizeDistribution}
                    className="rounded-xl h-8 px-2.5 text-xs font-bold gap-1"
                  >
                    <Shuffle className="w-3.5 h-3.5" />
                    Véletlen szórás
                  </Button>
                </div>
              </div>

              {/* Box Visualizer Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                {ballDistribution.map((count, idx) => {
                  const isMax = count === currentMaxInBox && count >= minMaxBallsInBox;
                  return (
                    <div
                      key={idx}
                      onClick={() => {
                        // Move a ball to next box on click
                        const next = [...ballDistribution];
                        const targetIdx = (idx + 1) % numBoxes;
                        if (next[idx] > 0) {
                          next[idx]--;
                          next[targetIdx]++;
                          setBallDistribution(next);
                        }
                      }}
                      className={cn(
                        "p-3 rounded-2xl border-2 transition-all flex flex-col items-center justify-between min-h-[140px] cursor-pointer",
                        isMax
                          ? "bg-amber-50/70 dark:bg-amber-950/40 border-amber-400 shadow-sm"
                          : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-blue-300"
                      )}
                    >
                      <div className="text-xs font-bold text-slate-500 dark:text-slate-400">
                        {idx + 1}. Skatulya
                      </div>

                      {/* Balls Inside Box */}
                      <div className="flex flex-wrap gap-1 items-center justify-center p-2 min-h-[60px] w-full">
                        {Array.from({ length: count }).map((_, bIdx) => (
                          <div
                            key={bIdx}
                            className="w-4 h-4 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 shadow-xs animate-in zoom-in-50"
                          />
                        ))}
                      </div>

                      <div className={cn(
                        "text-xs font-black font-mono px-2 py-0.5 rounded-md",
                        isMax ? "bg-amber-200 dark:bg-amber-900 text-amber-900 dark:text-amber-100" : "bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300"
                      )}>
                        {count} db
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Dirichlet Analysis Banner */}
              <div className="p-4 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-850 dark:via-slate-850 dark:to-slate-850 rounded-2xl border border-blue-200 dark:border-blue-900 space-y-2">
                <div className="flex items-center gap-2 text-xs font-black text-blue-900 dark:text-blue-300 uppercase tracking-wider">
                  <Lightbulb className="w-4 h-4 text-amber-500" />
                  <span>Dirichlet-elv Elemzés (N = {numBalls} golyó, K = {numBoxes} skatulya)</span>
                </div>
                <div className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-medium flex items-center gap-2 flex-wrap">
                  <span>Matematikai garancia:</span>
                  <span className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono font-black text-purple-700 dark:text-purple-300 shadow-xs">
                    ⌈N / K⌉ = ⌈{numBalls} / {numBoxes}⌉ = {minMaxBallsInBox}
                  </span>
                  <span>db golyó.</span>
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-400">
                  Bárhogy osztod szét a(z) <strong>{numBalls} golyót</strong> a(z) <strong>{numBoxes} skatulyába</strong>, <strong>biztosan lesz olyan skatulya, amelybe legalább {minMaxBallsInBox} golyó kerül!</strong>
                  {currentMaxInBox > minMaxBallsInBox && (
                    <span className="text-amber-600 dark:text-amber-400 font-bold ml-1">
                      (A jelenlegi eloszlásban a legtelítettebb skatulyában {currentMaxInBox} db golyó van).
                    </span>
                  )}
                </div>
              </div>
            </div>
          ) : (
            /* Tab 2: Multiplication Rule & Tree */
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                    <span>Felsők száma (p):</span>
                    <span className="text-base font-black text-blue-600 dark:text-blue-400">{numTops} db</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setNumTops(Math.max(1, numTops - 1))}
                      disabled={numTops <= 1}
                      className="rounded-xl h-8 w-8 p-0"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </Button>
                    <div className="flex-1 bg-slate-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                      <div className="bg-blue-600 h-full transition-all" style={{ width: `${(numTops / 5) * 100}%` }} />
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setNumTops(Math.min(5, numTops + 1))}
                      disabled={numTops >= 5}
                      className="rounded-xl h-8 w-8 p-0"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>

                <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                    <span>Nadrágok száma (q):</span>
                    <span className="text-base font-black text-indigo-600 dark:text-indigo-400">{numPants} db</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setNumPants(Math.max(1, numPants - 1))}
                      disabled={numPants <= 1}
                      className="rounded-xl h-8 w-8 p-0"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </Button>
                    <div className="flex-1 bg-slate-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                      <div className="bg-indigo-600 h-full transition-all" style={{ width: `${(numPants / 5) * 100}%` }} />
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setNumPants(Math.min(5, numPants + 1))}
                      disabled={numPants >= 5}
                      className="rounded-xl h-8 w-8 p-0"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Tree Representation Visualizer */}
              <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-4">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Döntési Fastruktúra & Kombinációk:
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {Array.from({ length: numTops }).map((_, tIdx) => (
                    <div key={tIdx} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 space-y-2">
                      <div className="text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1">
                        <span>👔 {tIdx + 1}. Felső</span>
                      </div>
                      <div className="space-y-1 pl-3 border-l-2 border-indigo-300 dark:border-indigo-800">
                        {Array.from({ length: numPants }).map((_, pIdx) => (
                          <div key={pIdx} className="text-xs font-mono text-slate-700 dark:text-slate-300 flex items-center justify-between">
                            <span>↳ 👖 {pIdx + 1}. Nadrág</span>
                            <span className="text-[10px] text-slate-400">Szett #{tIdx * numPants + pIdx + 1}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total Calculation Output */}
              <div className="p-4 bg-indigo-50 dark:bg-indigo-950/40 rounded-2xl border border-indigo-200 dark:border-indigo-800 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-indigo-700 dark:text-indigo-300 uppercase tracking-wider">
                    Összes összeállítható öltözet:
                  </div>
                  <div className="text-lg font-mono font-black text-indigo-950 dark:text-indigo-100">
                    {numTops} felső · {numPants} nadrág = <span className="text-indigo-600 dark:text-indigo-400">{numTops * numPants} különböző szett</span>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-base shadow-xs">
                  {numTops * numPants}
                </div>
              </div>
            </div>
          )}
        </Card>
      </TheorySection>
    </TheoryTemplate>
  );
};
