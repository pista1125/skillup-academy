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
  StatementTruthDiagram,
  QuantifiersNegationDiagram,
  CounterexampleVisualizerDiagram,
  PigeonholePrincipleDiagram
} from './ProofDiagrams';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Lightbulb,
  CheckCircle2,
  XCircle,
  Sparkles,
  HelpCircle,
  Scale,
  ShieldCheck,
  ShieldAlert,
  Boxes,
  Split,
  Layers,
  ArrowRight,
  RotateCcw
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProofTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

export const ProofTheory: React.FC<ProofTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // Interactive Pigeonhole Sandbox State
  const [itemsCount, setItemsCount] = useState<number>(5);
  const [boxesCount, setBoxesCount] = useState<number>(4);

  // Computed max items in at least one box by generalized pigeonhole
  const guaranteedMinInAtLeastOne = Math.ceil(itemsCount / boxesCount);

  return (
    <TheoryTemplate
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      documentId="g7-logic-proofs-theory-doc"
      pdfFilename="7_osztaly_gondolkodjunk_igazold_cafold.pdf"
      badgeText="7. Osztály • Matematika I. Témakör"
      title="5. Igazold! Cáfold!"
      subtitle="Kijelentések, igazságértékek, tagadás, általános bizonyítások, ellenpéldák és a skatulya-elv"
      quickRule={{
        label: 'Fő Szabályok',
        formula: 'Igazolás: általános bizonyítás • Cáfolat: 1 ellenpélda • Skatulya: n+1 elem → n doboz'
      }}
      themeColor="cyan"
      practiceTitle="Készen állsz a logikai állítások, bizonyítások és ellenpéldák gyakorlására?"
      practiceSubtitle="30 válogatott feladat 3 nehézségi szinten, kártyás párosítóval és csoportosító játékkal!"
    >
      {/* SECTION 1: Kijelentések és Igazságértékek */}
      <TheorySection
        number={1}
        title="Kijelentések, Állítások és Igazságértékek"
        icon={<Lightbulb className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />}
        badgeColor="cyan"
      >
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
            A mindennapi beszédben rengetegféle mondatot használunk (kérdések, felszólítások, óhajok, vélemények). A matematikában azonban csak a <strong>kijelentésekkel (állításokkal)</strong> foglalkozunk, amelyekről objektíven megállapítható, hogy <strong>IGAZAK (I)</strong> vagy <strong>HAMISAK (H)</strong>.
          </p>

          <StatementTruthDiagram />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TheoryCard title="Mi számít Kijelentésnek?" variant="cyan">
              <div className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                <p>
                  Olyan kijelentő mondat, amelynek <strong>egyértelmű igazságértéke</strong> van:
                </p>
                <ul className="list-disc list-inside space-y-1">
                  <li>„A 36 négyzetszám.” → <strong>IGAZ</strong> (mert $6^2 = 36$).</li>
                  <li>„Minden prímszám páratlan.” → <strong>HAMIS</strong> (mert a 2 páros).</li>
                  <li>„A rombusz átlói merőlegesek egymásra.” → <strong>IGAZ</strong>.</li>
                </ul>
              </div>
            </TheoryCard>

            <TheoryCard title="Mi NEM Kijelentés?" variant="cyan">
              <div className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                <p>
                  Amelyhez <strong>nem rendelhető egyértelmű igazságérték</strong>:
                </p>
                <ul className="list-disc list-inside space-y-1">
                  <li><strong>Kérdés:</strong> „Osztható a 48 hattal?”</li>
                  <li><strong>Felszólítás:</strong> „Számold ki az eredményt!”</li>
                  <li><strong>Nyitott mondat (egyenlet változóval):</strong> „$x + 4 = 10$” (csak $x$ behelyettesítése után lesz igaz vagy hamis).</li>
                </ul>
              </div>
            </TheoryCard>
          </div>
        </div>
      </TheorySection>

      {/* SECTION 2: Tagadás és Logikai Kvantorok */}
      <TheorySection
        number={2}
        title="Tagadás (Negáció) és a „Minden” vs „Van olyan” Logikája"
        icon={<Split className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />}
        badgeColor="indigo"
      >
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
            Egy $A$ kijelentés <strong>tagadásán (negációján, jele: $\neg A$ vagy nem $A$)</strong> azt a kijelentést értjük, amely pontosan akkor igaz, ha $A$ hamis, és pontosan akkor hamis, ha $A$ igaz.
          </p>

          <QuantifiersNegationDiagram />

          <TheoryTable
            headers={['Eredeti Állítás', 'Igazságérték', 'Helyes Logikai Tagadás', 'Tagadás Értéke']}
            rows={[
              ['Minden szám négyzete pozitív.', 'HAMIS (a 0 négyzete 0)', 'Van olyan szám, melynek négyzete nem pozitív.', 'IGAZ (a 0 miatt)'],
              ['Minden páros szám osztható 4-gyel.', 'HAMIS (pl. a 6)', 'Van olyan páros szám, ami nem osztható 4-gyel.', 'IGAZ (pl. 2, 6, 10)'],
              ['Van olyan háromszög, ami szabályos.', 'IGAZ (60°-os szögekkel)', 'Egyetlen háromszög sem szabályos.', 'HAMIS'],
              ['Minden négyszög húrnégyszög.', 'HAMIS', 'Létezik olyan négyszög, amely nem húrnégyszög.', 'IGAZ (pl. általános paralelogramma)']
            ]}
          />

          <TheoryTrapBox title="Végletes tagadási csapda: „Mindenki” ellentéte NEM a „Senki”!">
            <p className="text-xs sm:text-sm">
              Gyakori hiba: Ha valaki azt mondja: „Az osztályban <em>mindenki</em> ötöst kapott”, ennek a tagadása <strong>NEM az</strong>, hogy „Senki sem kapott ötöst”! A cáfolathoz elég, ha <strong>legalább egyetlen diák nem kapott ötöst</strong>!
            </p>
          </TheoryTrapBox>
        </div>
      </TheorySection>

      {/* SECTION 3: Hogyan Igazolunk? (Általános Bizonyítás) */}
      <TheorySection
        number={3}
        title="Hogyan Igazolunk? (Az Általános Matematikai Bizonyítás)"
        icon={<ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />}
        badgeColor="emerald"
      >
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
            Egy általános érvényű matematikai tételt <strong>nem elég néhány számpéldával ellenőrizni</strong>. Olyan gondolatmenetet (levezetést) kell adnunk, amely a betűs kifejezések segítségével <strong>minden szóba jövő esetre</strong> érvényes!
          </p>

          <CounterexampleVisualizerDiagram />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TheoryCard title="Példa 1: Két páratlan szám összege" variant="emerald">
              <div className="space-y-2 text-xs sm:text-sm">
                <p><strong>Tétel:</strong> Két páratlan szám összege mindig páros.</p>
                <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 font-mono text-emerald-900 dark:text-emerald-100 text-xs">
                  Legyen a két szám: 2k + 1 és 2m + 1<br />
                  Összeg = (2k + 1) + (2m + 1) = 2k + 2m + 2<br />
                  Összeg = 2 · (k + m + 1)
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400">
                  Mivel a szorzatban szerepel a 2-es szorzótényező, az összeg <strong>mindig páros</strong>! ✓
                </p>
              </div>
            </TheoryCard>

            <TheoryCard title="Példa 2: Három egymást követő egész összege" variant="emerald">
              <div className="space-y-2 text-xs sm:text-sm">
                <p><strong>Tétel:</strong> Három egymást követő egész szám összege mindig osztható 3-mal.</p>
                <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 font-mono text-emerald-900 dark:text-emerald-100 text-xs">
                  Legyenek a számok: n - 1, n, n + 1<br />
                  Összeg = (n - 1) + n + (n + 1) = 3n
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400">
                  A $3n$ kifejezés a 3 többszöröse, így <strong>mindig osztható 3-mal</strong>! ✓
                </p>
              </div>
            </TheoryCard>
          </div>
        </div>
      </TheorySection>

      {/* SECTION 4: Hogyan Cáfolunk? (Az Ellenpélda Erejével) */}
      <TheorySection
        number={4}
        title="Hogyan Cáfolunk? (Az Ellenpélda Módszere)"
        icon={<ShieldAlert className="w-5 h-5 text-rose-600 dark:text-rose-400" />}
        badgeColor="rose"
      >
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
            Ha egy állítás azt állítja, hogy egy tulajdonság <em>minden</em> objektumra igaz, akkor az állítás hamisságának bizonyításához <strong>egyetlenegy működő ellenpélda (Counterexample)</strong> felmutatása elegendő!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <TheoryCard title="1. Oszthatósági Tévhit" variant="rose">
              <div className="space-y-1.5 text-xs">
                <p className="font-semibold text-rose-950 dark:text-rose-200">
                  „Ha egy szám osztható 6-tal és 8-cal, akkor osztható 48-cal is.”
                </p>
                <div className="p-1.5 rounded bg-rose-50 dark:bg-rose-950/50 font-mono font-bold text-rose-800 dark:text-rose-300 text-center">
                  Ellenpélda: 24
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400">
                  A 24 osztható 6-tal és 8-cal, de 48-cal nem! Az állítás <strong>HAMIS</strong>.
                </p>
              </div>
            </TheoryCard>

            <TheoryCard title="2. Prímszámos Képlet Tévhit" variant="rose">
              <div className="space-y-1.5 text-xs">
                <p className="font-semibold text-rose-950 dark:text-rose-200">
                  „Az $n^2 + n + 41$ kifejezés minden pozitív egész $n$-re prímszámot ad.”
                </p>
                <div className="p-1.5 rounded bg-rose-50 dark:bg-rose-950/50 font-mono font-bold text-rose-800 dark:text-rose-300 text-center">
                  Ellenpélda: n = 41
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400">
                  $41^2 + 41 + 41 = 41 \cdot 43$, ami összetett szám! Az állítás <strong>HAMIS</strong>.
                </p>
              </div>
            </TheoryCard>

            <TheoryCard title="3. Geometriai Tévhit" variant="rose">
              <div className="space-y-1.5 text-xs">
                <p className="font-semibold text-rose-950 dark:text-rose-200">
                  „Ha egy négyszög minden oldala egyenlő, akkor az négyzet.”
                </p>
                <div className="p-1.5 rounded bg-rose-50 dark:bg-rose-950/50 font-mono font-bold text-rose-800 dark:text-rose-300 text-center">
                  Ellenpélda: Rombusz (pl. 60°-120°)
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400">
                  Minden oldala egyenlő, de szögei nem derékszögek! Az állítás <strong>HAMIS</strong>.
                </p>
              </div>
            </TheoryCard>
          </div>
        </div>
      </TheorySection>

      {/* SECTION 5: A Skatulya-elv és Indirekt Bizonyítás */}
      <TheorySection
        number={5}
        title="A Skatulya-elv (Dirichlet-elv) és az Indirekt Gondolkodás"
        icon={<Boxes className="w-5 h-5 text-amber-600 dark:text-amber-400" />}
        badgeColor="amber"
      >
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
            A <strong>skatulya-elv (Dirichlet-elv)</strong> az egyik legerősebb és legegyszerűbb logikai eszköz: ha $n + 1$ galambot helyezünk el $n$ dúcban, akkor legalább egy dúcba <strong>legalább 2 galamb</strong> kerül!
          </p>

          <PigeonholePrincipleDiagram />

          {/* INTERAKTÍV SKATULYA-ELV KALKULÁTOR LABOR */}
          <div className="p-4 sm:p-5 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-slate-900 dark:to-slate-850 rounded-2xl border-2 border-amber-200 dark:border-amber-900/60 shadow-md">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 font-bold text-amber-900 dark:text-amber-200 text-sm sm:text-base">
                <Boxes className="w-5 h-5 text-amber-600" />
                <span>Interaktív Skatulya-elv Kalkulátor</span>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full bg-amber-200 dark:bg-amber-950 text-amber-800 dark:text-amber-300 font-mono font-bold">
                Dirichlet Labor
              </span>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400 mb-4">
              Állítsd be az elemek és a dobozok számát, és nézd meg a garantált minimális zsúfoltságot!
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center bg-white dark:bg-slate-850 p-4 rounded-xl border border-amber-200 dark:border-amber-800">
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Elemek száma: <span className="text-amber-600 font-mono font-bold text-sm">{itemsCount} db</span>
                  </label>
                  <input
                    type="range"
                    min="2"
                    max="20"
                    value={itemsCount}
                    onChange={(e) => setItemsCount(parseInt(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Skatulyák (dobozok/kategóriák) száma: <span className="text-indigo-600 font-mono font-bold text-sm">{boxesCount} db</span>
                  </label>
                  <input
                    type="range"
                    min="2"
                    max="10"
                    value={boxesCount}
                    onChange={(e) => setBoxesCount(parseInt(e.target.value))}
                    className="w-full accent-indigo-500 cursor-pointer"
                  />
                </div>
              </div>

              <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 text-center space-y-1.5">
                <div className="text-xs text-amber-800 dark:text-amber-300 font-bold uppercase tracking-wider">
                  Matematikai Garancia:
                </div>
                <div className="text-base sm:text-lg font-black text-amber-950 dark:text-amber-100">
                  Legalább egy skatulyában lesz legalább{' '}
                  <span className="text-amber-600 dark:text-amber-400 underline font-mono">
                    {guaranteedMinInAtLeastOne} db
                  </span>{' '}
                  elem!
                </div>
                <div className="text-[11px] text-slate-600 dark:text-slate-400">
                  Képlet: $\lceil {itemsCount} / {boxesCount} \rceil = {guaranteedMinInAtLeastOne}$
                </div>
              </div>
            </div>
          </div>

          <TheoryCallout variant="tip" title="Összefoglaló arany szabályok érveléshez és logikához">
            <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm">
              <li><strong>Igazolás:</strong> általánosan, minden lehetséges esetre (algebrai betűs levezetéssel) kell bizonyítani.</li>
              <li><strong>Cáfolat:</strong> egy „minden”-re vonatkozó állításnál egyetlenegy ellenpélda elegendő!</li>
              <li><strong>„Minden...” tagadása:</strong> „Van olyan, amelyik nem...”</li>
              <li><strong>„Van olyan...” tagadása:</strong> „Egyik sem...” (Mindenre nem igaz).</li>
              <li><strong>Skatulya-elv:</strong> ha több az elem mint a kategória, biztosan lesz átfedés/duplázódás!</li>
            </ul>
          </TheoryCallout>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};
