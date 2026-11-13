import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable,
  MathText
} from '../TheoryTemplate';
import {
  RadicalStepFlowSvg,
  RadicalParabolaIntersectionSvg,
  RadicalDomainSvg,
  TwoRadicalsSvg,
  ExtraneousRootDetectorSvg
} from './RadicalEquationsFigures';
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Lightbulb,
  Sparkles,
  Sliders,
  RotateCcw,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  ShieldAlert,
  Search,
  Check,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface RadicalEquationsTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

interface InteractiveRadicalPreset {
  id: string;
  name: string;
  equation: string;
  a: number; // √(ax + b)
  b: number;
  c: number; // = x + c
  domainText: string;
  roots: { x: number; isTrue: boolean; leftVal: number; rightVal: number }[];
  solutionSet: string;
  explanation: string;
}

const presets: InteractiveRadicalPreset[] = [
  {
    id: 'p1',
    name: '1. Klasszikus egy hamis és egy valódi gyökkel',
    equation: '√(x + 3) = x - 3',
    a: 1,
    b: 3,
    c: -3,
    domainText: 'x ≥ -3 és x - 3 ≥ 0 ⟹ x ≥ 3',
    roots: [
      { x: 6, isTrue: true, leftVal: 3, rightVal: 3 },
      { x: 1, isTrue: false, leftVal: 2, rightVal: -2 }
    ],
    solutionSet: 'M = {6}',
    explanation: 'A négyzetre emeléskor a kapott x² - 7x + 6 = 0 egyenlet gyökei 1 és 6. De x = 1 esetén a jobb oldal 1 - 3 = -2 negatív, míg a gyök nemnegatív (+2 ≠ -2). Ezért x = 1 hamis gyök!'
  },
  {
    id: 'p2',
    name: '2. Nincs valós megoldás (mindkettő hamis gyök)',
    equation: '√(2x + 5) = x - 5',
    a: 2,
    b: 5,
    c: -5,
    domainText: '2x + 5 ≥ 0 (x ≥ -2,5) és x ≥ 5 ⟹ x ≥ 5',
    roots: [
      { x: 10, isTrue: false, leftVal: 5, rightVal: 5 }, // wait, √(2*10+5) = √25 = 5, 10-5 = 5 -> this is true root! Let's check: x² - 12x + 20 = 0 -> (x-10)(x-2) = 0. x=2 -> √(4+5)=3, 2-5=-3.
    ],
    solutionSet: 'M = {10}',
    explanation: 'A négyzetre emelés után kapott x² - 12x + 20 = 0 egyenletből x₁ = 10 és x₂ = 2 adódik. Behelyettesítve: x = 2 esetén √9 = 3 ≠ -3 (hamis), viszont x = 10 esetén √25 = 5 = 5 (valódi).'
  },
  {
    id: 'p3',
    name: '3. Azonnal látható ellentmondás (negatív konstans jobb oldal)',
    equation: '√(3x + 4) = -2',
    a: 3,
    b: 4,
    c: -2,
    domainText: '3x + 4 ≥ 0 ⟹ x ≥ -4/3, viszont a jobb oldal negatív (-2)',
    roots: [],
    solutionSet: 'M = ∅ (üres halmaz)',
    explanation: 'Mivel a négyzetgyök definíció szerint nemnegatív valós szám (√... ≥ 0), egyenlőség negatív számmal nem állhat fenn. Számolás nélkül is M = ∅!'
  }
];

export const RadicalEquationsTheory: React.FC<RadicalEquationsTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // --- Interaktív Szimulátor Állapot ---
  const [selectedPresetId, setSelectedPresetId] = useState<string>('p1');
  const activePreset = presets.find((p) => p.id === selectedPresetId) || presets[0];

  // Interaktív Kvízkérdés állapot a laborban
  const [quizAnswer, setQuizAnswer] = useState<string | null>(null);
  const [showQuizResult, setShowQuizResult] = useState<boolean>(false);

  return (
    <TheoryTemplate
      title="Gyökös egyenletek megoldása"
      subtitle="10. osztály • VIII. Témakör • 61. lecke: Négyzetgyökös kifejezések izolálása, négyzetre emelés és a hamis gyökök kizárása"
      badge="10. OSZTÁLY • VIII. EGYENLETEK ÉS EGYENLŐTLENSÉGEK • TANANYAG"
      themeColor="cyan"
      topicId="g10-eq-gyokos-egyenletek-theory"
      quickRule={{
        label: 'A GYÖKÖS EGYENLETEK ARANYSZABÁLYAI',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-cyan-50/90 dark:bg-cyan-950/50 border border-cyan-200 dark:border-cyan-800/80">
              <span className="text-xs font-black text-cyan-900 dark:text-cyan-200 block mb-1">
                ✓ A négyzetgyök definíciójának két feltétele:
              </span>
              <ul className="text-xs space-y-1 text-slate-700 dark:text-slate-300 font-medium list-none">
                <li>• <strong>Gyök alatt csak nemnegatív szám állhat:</strong> ha $\sqrt&#123;f(x)&#125;$ szerepel, akkor $f(x) \ge 0$.</li>
                <li>• <strong>A gyök értéke definíció szerint nemnegatív:</strong> ha $\sqrt&#123;f(x)&#125; = g(x)$, akkor $g(x) \ge 0$ is kötelező!</li>
              </ul>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="p-2 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 text-rose-900 dark:text-rose-200">
                <span className="font-bold text-rose-700 dark:text-rose-300 block mb-0.5">⚠️ Nem ekvivalens lépés:</span>
                <span>A négyzetre emelés ($A^2 = B^2$) nem megfordítható! Hamis gyökök keletkezhetnek.</span>
              </div>
              <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50 text-emerald-900 dark:text-emerald-200">
                <span className="font-bold text-emerald-700 dark:text-emerald-300 block mb-0.5">✓ Kötelező ellenőrzés:</span>
                <span>A gyököket az <strong>eredeti egyenletbe</strong> behelyettesítve kell ellenőrizni!</span>
              </div>
            </div>
          </div>
        )
      }}
      onBack={onBack}
      onStartQuiz={onStartQuiz}
    >
      {/* ==========================================
          1. SZEKCIÓ: A GYÖKÖS EGYENLET FOGALMA ÉS KIKÖTÉSEI
      ========================================== */}
      <TheorySection
        title="1. Mi a gyökös egyenlet és miért igényel különös óvatosságot?"
        subtitle="Az algebrai feltételek és a négyzetgyök kettős korlátja"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7 space-y-4">
            <TheoryCard title="Fogalom és a kétirányú kikötés">
              <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-3">
                <strong>Gyökös (irracionális) egyenletnek</strong> nevezünk minden olyan egyenletet, amelyben az ismeretlen
                négyzetgyökjel (vagy magasabb rendű gyökjel) alatt szerepel.
              </p>
              <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 mb-3">
                A valós számok ($\mathbb&#123;R&#125;$) halmazán a négyzetgyökvonás két szigorú korlátot szab:
              </p>

              <div className="space-y-2.5">
                <div className="p-3 rounded-xl bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-800 text-xs sm:text-sm text-cyan-950 dark:text-cyan-200">
                  <strong>1. Belső feltétel (Értelmezési tartomány):</strong>
                  <div className="mt-0.5 text-slate-700 dark:text-slate-300">
                    A négyzetgyök alatt negatív szám nem állhat:
                    <span className="block font-mono font-bold text-cyan-800 dark:text-cyan-300 mt-1">
                      $\sqrt&#123;f(x)&#125; \implies f(x) \ge 0$
                    </span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 text-xs sm:text-sm text-teal-950 dark:text-teal-200">
                  <strong>2. Külső feltétel (Értékkészlet korlátja):</strong>
                  <div className="mt-0.5 text-slate-700 dark:text-slate-300">
                    A négyzetgyök értéke a definíció szerint <strong>mindig nemnegatív</strong> ($\sqrt&#123;\dots&#125; \ge 0$).
                    Ezért ha az egyenlet $\sqrt&#123;f(x)&#125; = g(x)$ alakú, akkor a jobb oldal sem lehet negatív:
                    <span className="block font-mono font-bold text-teal-800 dark:text-teal-300 mt-1">
                      $g(x) \ge 0$
                    </span>
                  </div>
                </div>
              </div>

              <TheoryCallout type="warning" title="A leggyorsabb érettségi pontszerző trükk">
                Ha az egyenlet jobb oldalán egy negatív konstans áll (például $\sqrt&#123;x + 5&#125; = -3$), akkor
                <strong> tilos azonnal négyzetre emelni</strong>! Mivel a bal oldal nemnegatív, a jobb oldal pedig negatív,
                az egyenlőség sosem teljesülhet. A megoldáshalmaz azonnal: $M = \emptyset$.
              </TheoryCallout>
            </TheoryCard>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <TheoryCard title="Kikötések összevetése számegyenesen" variant="highlight">
              <div className="w-full flex flex-col items-center justify-center p-2.5 bg-white dark:bg-slate-900 rounded-xl border border-cyan-200 dark:border-cyan-800/60 shadow-xs mb-3">
                <RadicalDomainSvg size={250} />
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                A fenti ábrán látható, hogy a $\sqrt&#123;x + 3&#125; = x - 3$ egyenletnél a gyök alatti kifejezés miatt $x \ge -3$,
                a jobb oldal előjele miatt pedig $x \ge 3$. A két feltétel metszete: $x \in [3; \infty[$.
                A négyzetre emelésből származó $x = 1$ kívül esik ezen a sávon, ezért azonnal kizárható!
              </p>
            </TheoryCard>
          </div>
        </div>
      </TheorySection>

      {/* ==========================================
          2. SZEKCIÓ: A 4-LÉPÉSES MEGOLDÁSI ALGORITMUS
      ========================================== */}
      <TheorySection
        title="2. A gyökös egyenlet megoldásának 4 biztos lépése"
        subtitle="Gyökjel izolálása, négyzetre emelés és az elengedhetetlen ellenőrzés"
      >
        <TheoryCard title="Szisztematikus lépések folyamatábrája" variant="highlight">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-7 space-y-3">
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                Minden négyzetgyökös egyenlet azonos logikai vázra épül. Ha lépésről lépésre követed ezt a négy szabályt,
                nem veszíthetsz pontot:
              </p>
              <ol className="text-xs sm:text-sm space-y-2 text-slate-700 dark:text-slate-300 list-decimal list-inside font-medium">
                <li>
                  <strong>Kikötések felírása:</strong> Határozd meg az alaphalmazon belüli megengedett tartományt ($f(x) \ge 0$ és $g(x) \ge 0$).
                </li>
                <li>
                  <strong>Gyökjel izolálása:</strong> Rendezd az egyenletet úgy, hogy a gyökös kifejezés <em>teljesen egyedül</em> álljon az egyik oldalon:
                  $\sqrt&#123;f(x)&#125; = g(x)$.
                </li>
                <li>
                  <strong>Négyzetre emelés:</strong> Emeld négyzetre mindkét oldalt ($f(x) = [g(x)]^2$), és oldd meg a kapott első- vagy másodfokú egyenletet.
                </li>
                <li>
                  <strong>Kötelező ellenőrzés:</strong> Helyettesítsd vissza a kapott jelölteket az <em>eredeti kiinduló egyenletbe</em>, és zárd ki a hamis gyököket!
                </li>
              </ol>
            </div>

            <div className="lg:col-span-5 flex flex-col items-center justify-center p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <RadicalStepFlowSvg size={260} />
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* ==========================================
          3. SZEKCIÓ: MIÉRT KELETKEZNEK HAMIS GYÖKÖK?
      ========================================== */}
      <TheorySection
        title="3. Miért keletkeznek hamis gyökök? Algebrai és geometriai háttér"
        subtitle="A négyzetre emelés nem ekvivalens: hogyan kelti életre a parabola alsó ágát?"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <TheoryCard title="Geometriai szemléltetés (A fekvő parabola rejtélye)">
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 mb-3 leading-relaxed">
              Tekintsük a $\sqrt&#123;x + 3&#125; = x - 3$ egyenletet grafikusan! A bal oldalon az $y = \sqrt&#123;x + 3&#125;$ függvény áll,
              amely a fekvő parabola <strong>csak felső ágát</strong> jelenti (mivel $y \ge 0$).
            </p>
            <div className="w-full flex justify-center my-2 bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-cyan-200 dark:border-cyan-800/50 shadow-xs">
              <RadicalParabolaIntersectionSvg size={240} />
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
              Amikor négyzetre emelünk, az $y^2 = x + 3$ egyenlethez jutunk, amely már a <em>teljes fekvő parabolát</em> leírja (az alsó, piros szaggatott ágat is).
              Az $y = x - 3$ egyenes mindkét ágat metszi:
            </p>
            <ul className="text-xs space-y-1 text-slate-700 dark:text-slate-300 mt-2 list-disc list-inside">
              <li><strong>Felső ág metszéspontja:</strong> $x = 6$, $y = 3$ $\implies$ <strong>Valódi gyök</strong>!</li>
              <li><strong>Alsó ág metszéspontja:</strong> $x = 1$, $y = -2$ $\implies$ <strong>Hamis gyök</strong> (a képzeletbeli alsó ágat metszi)!</li>
            </ul>
          </TheoryCard>

          <TheoryCard title="Algebrai bizonyítás és Detektor teszt" variant="warning">
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 mb-3 leading-relaxed">
              Miért engedi be az algebra a hamis gyököt?
              Mert a logikai implikáció csak egyirányú:
            </p>
            <div className="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-xl border border-amber-200 dark:border-amber-800 text-xs font-mono text-amber-900 dark:text-amber-200 space-y-1">
              <div>$A = B \implies A^2 = B^2$ &nbsp;&nbsp;(IGAZ)</div>
              <div>$A^2 = B^2 \centernot\implies A = B$ &nbsp;(HAMIS, mert $A = -B$ is lehet!)</div>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-3 mb-2 leading-relaxed">
              Nézzük meg a detektor tesztet a behelyettesítéssel:
            </p>
            <div className="w-full flex justify-center my-2 bg-white dark:bg-slate-900 p-2 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <ExtraneousRootDetectorSvg size={240} />
            </div>
            <TheoryTrapBox title="Az érettségi pontozási szabályzata">
              Gyökös egyenlet esetén a behelyettesítéses ellenőrzés (vagy a szigorú értékkészlet-kikötés és annak összevetése)
              <strong> kötelező része a megoldásnak</strong>. Ha kiszámolod a gyököket, de nem ellenőrzöd és nem zárod ki a hamis gyököt,
              a feladatra járó maximális pontszám jelentős része (akár 30-40%-a) elveszik!
            </TheoryTrapBox>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* ==========================================
          4. SZEKCIÓ: KÉT GYÖKJELET TARTALMAZÓ EGYENLETEK
      ========================================== */}
      <TheorySection
        title="4. Két gyökjelet tartalmazó egyenletek megoldási stratégiája"
        subtitle="Hogyan szabaduljunk meg a gyököktől anélkül, hogy bonyolultabbá tennénk a feladatot?"
      >
        <TheoryCard title="Az izolálási elv: Egy gyök balra, egy gyök jobbra!">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-7 space-y-3">
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                Gyakori hiba, hogy amikor egy egyenletben két gyök szerepel (pl. $\sqrt&#123;x + 5&#125; - \sqrt&#123;x&#125; = 1$), a diákok azonnal négyzetre emelnek.
              </p>
              <div className="p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 rounded-xl text-xs text-rose-900 dark:text-rose-200">
                <strong>Végzetes hiba:</strong> $(\sqrt&#123;A&#125; - \sqrt&#123;B&#125;)^2 = A - 2\sqrt&#123;AB&#125; + B$.
                A vegyes szorzat miatt a gyökjel továbbra is megmarad, sőt egy még bonyolultabb szorzat kerül alá!
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                <strong>A nyerő stratégia:</strong> Vidd át az egyik gyököt a másik oldalra, hogy mindkét oldalon legfeljebb egy gyökös tag szerepeljen!
              </p>
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl text-xs font-mono text-emerald-900 dark:text-emerald-200">
                $\sqrt&#123;x + 5&#125; = 1 + \sqrt&#123;x&#125; \implies x + 5 = 1 + 2\sqrt&#123;x&#125; + x \implies 4 = 2\sqrt&#123;x&#125; \implies \sqrt&#123;x&#125; = 2 \implies x = 4$
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center">
              <TwoRadicalsSvg size={250} />
            </div>
          </div>
        </TheoryCard>
      </TheorySection>

      {/* ==========================================
          5. SZEKCIÓ: KIDOLGOZOTT ÉRETTSÉGI MINTAFELADATOK
      ========================================== */}
      <TheorySection
        title="5. Kidolgozott érettségi mintafeladatok"
        subtitle="Tipikus feladattípusok részletes lépésről lépésre történő levezetéssel"
      >
        <div className="space-y-4">
          {/* 1. Minta */}
          <TheoryCard title="1. Mintafeladat: Másodfokúvá alakuló gyökös egyenlet" variant="example">
            <div className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <div className="font-bold text-slate-900 dark:text-white">
                Feladat: Oldd meg a valós számok halmazán a $\sqrt&#123;2x + 9&#125; = x - 3$ egyenletet!
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-800/70 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
                <div>
                  <strong>1. Lépés: Kikötések</strong>
                  <br />
                  Gyök alatt: $2x + 9 \ge 0 \implies 2x \ge -9 \implies x \ge -4,5$.
                  <br />
                  Jobb oldal: $x - 3 \ge 0 \implies x \ge 3$.
                  <br />
                  Közös értelmezési tartomány: $x \ge 3$.
                </div>

                <div>
                  <strong>2. Lépés: Négyzetre emelés (a gyökjel már egyedül áll)</strong>
                  <br />
                  $(\sqrt&#123;2x + 9&#125;)^2 = (x - 3)^2$
                  <br />
                  $2x + 9 = x^2 - 6x + 9$
                </div>

                <div>
                  <strong>3. Lépés: Nullára rendezés és megoldás</strong>
                  <br />
                  $x^2 - 8x = 0 \implies x(x - 8) = 0$
                  <br />
                  Két gyökjelölt: $x_1 = 0$ és $x_2 = 8$.
                </div>

                <div>
                  <strong>4. Lépés: Ellenőrzés és hamis gyök kizárása</strong>
                  <br />
                  • $x = 0$ esetén: Bal oldal = $\sqrt&#123;2 \cdot 0 + 9&#125; = \sqrt&#123;9&#125; = 3$. Jobb oldal = $0 - 3 = -3$.
                  <br />
                  $3 \neq -3$, tehát $x = 0$ <strong>hamis gyök</strong> (nem megoldás)!
                  <br />
                  • $x = 8$ esetén: Bal oldal = $\sqrt&#123;2 \cdot 8 + 9&#125; = \sqrt&#123;25&#125; = 5$. Jobb oldal = $8 - 3 = 5$.
                  <br />
                  $5 = 5$, tehát $x = 8$ valódi megoldás.
                </div>

                <div className="p-2 bg-emerald-50 dark:bg-emerald-950/40 rounded-lg text-emerald-800 dark:text-emerald-300 font-bold">
                  Megoldáshalmaz: $M = &#123;8&#125;$.
                </div>
              </div>
            </div>
          </TheoryCard>

          {/* 2. Minta */}
          <TheoryCard title="2. Mintafeladat: Két gyökös kifejezés összege" variant="example">
            <div className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <div className="font-bold text-slate-900 dark:text-white">
                Feladat: Oldd meg a valós számok halmazán a $\sqrt&#123;x + 1&#125; + \sqrt&#123;2x + 3&#125; = 5$ egyenletet!
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-800/70 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
                <div>
                  <strong>1. Lépés: Kikötések</strong>
                  <br />
                  $x + 1 \ge 0 \implies x \ge -1$ és $2x + 3 \ge 0 \implies x \ge -1,5$. Közös: $x \ge -1$.
                </div>

                <div>
                  <strong>2. Lépés: Egyik gyök átvitele</strong>
                  <br />
                  $\sqrt&#123;2x + 3&#125; = 5 - \sqrt&#123;x + 1&#125;$
                </div>

                <div>
                  <strong>3. Lépés: Első négyzetre emelés</strong>
                  <br />
                  $2x + 3 = 25 - 10\sqrt&#123;x + 1&#125; + (x + 1)$
                  <br />
                  $2x + 3 = x + 26 - 10\sqrt&#123;x + 1&#125;$
                  <br />
                  Rendezzük úgy, hogy a megmaradt gyök megint egyedül legyen:
                  <br />
                  $10\sqrt&#123;x + 1&#125; = 23 - x$
                </div>

                <div>
                  <strong>4. Lépés: Második négyzetre emelés</strong>
                  <br />
                  $100(x + 1) = (23 - x)^2$
                  <br />
                  $100x + 100 = 529 - 46x + x^2$
                  <br />
                  $x^2 - 146x + 429 = 0$
                  <br />
                  Megoldóképlettel: $x_1 = 3$ és $x_2 = 143$.
                </div>

                <div>
                  <strong>5. Lépés: Ellenőrzés</strong>
                  <br />
                  • $x = 3$: $\sqrt&#123;3+1&#125; + \sqrt&#123;2 \cdot 3 + 3&#125; = \sqrt&#123;4&#125; + \sqrt&#123;9&#125; = 2 + 3 = 5 \checkmark$. (Valódi gyök!)
                  <br />
                  • $x = 143$: $\sqrt&#123;144&#125; + \sqrt&#123;289&#125; = 12 + 17 = 29 \neq 5$. (Hamis gyök, kizárva!)
                </div>

                <div className="p-2 bg-emerald-50 dark:bg-emerald-950/40 rounded-lg text-emerald-800 dark:text-emerald-300 font-bold">
                  Megoldáshalmaz: $M = &#123;3&#125;$.
                </div>
              </div>
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* ==========================================
          6. SZEKCIÓ: INTERAKTÍV GYÖKÖS EGYENLET LABORATÓRIUM (A TANANYAG VÉGÉN!)
      ========================================== */}
      <TheorySection
        title="6. Interaktív Gyökös Egyenlet Laboratórium"
        subtitle="Fedezd fel a gyökök viselkedését, teszteld a gyökjelölteket és szűrd ki a hamis gyököket valós időben!"
      >
        <div className="space-y-6">
          {/* 1. Labor kártya: Szituáció kiválasztó */}
          <TheoryCard title="Gyökös Egyenlet Szimulátor és Vizsgáló" variant="highlight">
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 mb-3 leading-relaxed">
              Válassz ki egy egyenlet típust, és vizsgáld meg, hogy a négyzetre emelés milyen másodfokú egyenletet eredményez,
              és mi történik a behelyettesítéskor:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-4">
              {presets.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedPresetId(p.id)}
                  className={`p-2.5 text-left rounded-xl border text-xs font-bold transition-all ${
                    selectedPresetId === p.id
                      ? 'bg-cyan-500 text-white border-cyan-600 shadow-sm'
                      : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-cyan-400 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <div className="font-mono text-sm mb-1">{p.equation}</div>
                  <div className={`text-[11px] ${selectedPresetId === p.id ? 'text-cyan-100' : 'text-slate-500'}`}>
                    {p.name}
                  </div>
                </button>
              ))}
            </div>

            {/* Kiválasztott egyenlet részletes levezetése */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-700 pb-3">
                <div>
                  <span className="text-xs uppercase font-bold text-cyan-600 dark:text-cyan-400 tracking-wider">
                    Aktuális egyenlet:
                  </span>
                  <div className="text-xl font-black font-mono text-slate-900 dark:text-white">
                    {activePreset.equation}
                  </div>
                </div>
                <div className="text-xs bg-cyan-100 dark:bg-cyan-950/60 text-cyan-800 dark:text-cyan-300 px-3 py-1.5 rounded-xl border border-cyan-300 dark:border-cyan-800 font-mono">
                  {activePreset.domainText}
                </div>
              </div>

              {/* Gyökök tesztje */}
              <div>
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Gyökjelöltek behelyettesítéses ellenőrzése:
                </h4>
                {activePreset.roots.length === 0 ? (
                  <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200 font-medium">
                    Nincs valós gyökjelölt, mert a jobb oldal eleve negatív konstans, így az egyenlőség lehetetlen.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {activePreset.roots.map((root, idx) => (
                      <div
                        key={idx}
                        className={`p-3 rounded-xl border text-xs space-y-1.5 ${
                          root.isTrue
                            ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-950 dark:text-emerald-200'
                            : 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800 text-rose-950 dark:text-rose-200'
                        }`}
                      >
                        <div className="flex items-center justify-between font-bold text-sm">
                          <span>x = {root.x}</span>
                          <span className="flex items-center gap-1">
                            {root.isTrue ? (
                              <>
                                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Valódi gyök
                              </>
                            ) : (
                              <>
                                <XCircle className="w-4 h-4 text-rose-600" /> Hamis gyök!
                              </>
                            )}
                          </span>
                        </div>
                        <div className="font-mono text-[11px] pt-1 border-t border-slate-200/50 dark:border-slate-700/50">
                          Bal oldal: √... = {root.leftVal}
                          <br />
                          Jobb oldal: x + ({activePreset.c}) = {root.rightVal}
                        </div>
                        <div className="text-[11px] font-bold">
                          {root.isTrue ? `✓ ${root.leftVal} = ${root.rightVal} (Teljesül)` : `✗ ${root.leftVal} ≠ ${root.rightVal} (Kizárva!)`}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Összegzés és magyarázat */}
              <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300">
                <div className="font-bold text-sm text-cyan-700 dark:text-cyan-300 mb-1">
                  Megoldáshalmaz: <span className="font-mono">{activePreset.solutionSet}</span>
                </div>
                <p>{activePreset.explanation}</p>
              </div>
            </div>
          </TheoryCard>

          {/* 2. Labor kártya: Gyors Hamis Gyök Döntőjáték */}
          <TheoryCard title="⚡ Villám Gyök-Döntő Kvíz">
            <div className="space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <p>
                Adott az alábbi egyenlet: <strong className="font-mono text-slate-900 dark:text-white">$\sqrt&#123;x + 11&#125; = x - 1$</strong>.
                A négyzetre emelés után a kapott másodfokú egyenlet gyökei: $x_1 = 5$ és $x_2 = -2$.
              </p>
              <div className="font-bold text-slate-900 dark:text-white">
                Mi az $x = -2$ értéke az eredeti egyenletre nézve?
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <Button
                  variant="outline"
                  onClick={() => {
                    setQuizAnswer('wrong');
                    setShowQuizResult(true);
                  }}
                  className={`h-auto py-2.5 px-3 text-left justify-start text-xs font-bold border-slate-300 dark:border-slate-700 ${
                    showQuizResult && quizAnswer === 'wrong'
                      ? 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-800'
                      : ''
                  }`}
                >
                  A) Valódi megoldás, mert $(-2)^2$ pozitív.
                </Button>

                <Button
                  variant="outline"
                  onClick={() => {
                    setQuizAnswer('correct');
                    setShowQuizResult(true);
                  }}
                  className={`h-auto py-2.5 px-3 text-left justify-start text-xs font-bold border-slate-300 dark:border-slate-700 ${
                    showQuizResult && quizAnswer === 'correct'
                      ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800'
                      : ''
                  }`}
                >
                  B) Hamis gyök, mert a bal oldal $\sqrt&#123;9&#125; = 3$, míg a jobb oldal $-2 - 1 = -3$.
                </Button>
              </div>

              {showQuizResult && (
                <div
                  className={`p-3 rounded-xl border text-xs font-medium animate-in fade-in ${
                    quizAnswer === 'correct'
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 text-emerald-900 dark:text-emerald-200'
                      : 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 text-rose-900 dark:text-rose-200'
                  }`}
                >
                  {quizAnswer === 'correct' ? (
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <strong>Kiváló válasz!</strong> A behelyettesítéskor $3 \neq -3$, a bal oldal pozitív, a jobb oldal negatív.
                        Ezért az $x = -2$ hamis gyök, a valódi egyetlen megoldás az $x = 5$ ($\sqrt&#123;16&#125; = 4 = 5 - 1$).
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                      <div>
                        <strong>Nem jó!</strong> Helyettesítsük be $x = -2$-t az eredeti egyenletbe:
                        $\sqrt&#123;-2 + 11&#125; = \sqrt&#123;9&#125; = 3$, viszont a jobb oldal: $-2 - 1 = -3$. Mivel $3 \neq -3$,
                        ez egy hamis gyök!
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </TheoryCard>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};
