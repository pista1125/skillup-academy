import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable
} from '../TheoryTemplate';
import { Button } from '@/components/ui/button';
import {
  Layers,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Sparkles,
  Calculator,
  ArrowRight,
  HelpCircle,
  Shapes,
  Maximize2
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SetOperationsTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

export const SetOperationsTheory: React.FC<SetOperationsTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // Interactive Venn visualizer state
  const [activeOperation, setActiveOperation] = useState<'intersection' | 'union' | 'diffAB' | 'diffBA' | 'compA'>('intersection');

  // Interactive Sieve Formula state
  const [sizeA, setSizeA] = useState<number>(18);
  const [sizeB, setSizeB] = useState<number>(16);
  const [sizeIntersection, setSizeIntersection] = useState<number>(6);

  const calculatedUnion = sizeA + sizeB - sizeIntersection;
  const onlyA = sizeA - sizeIntersection;
  const onlyB = sizeB - sizeIntersection;

  // Mini self-test question state
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  const sampleA = [1, 2, 3, 4];
  const sampleB = [3, 4, 5, 6];
  const sampleUniverse = [1, 2, 3, 4, 5, 6, 7, 8];

  const getActiveElements = () => {
    switch (activeOperation) {
      case 'intersection':
        return '{3, 4} (közös elemek)';
      case 'union':
        return '{1, 2, 3, 4, 5, 6} (összes elem egyszer)';
      case 'diffAB':
        return '{1, 2} (csak az A-ban)';
      case 'diffBA':
        return '{5, 6} (csak a B-ben)';
      case 'compA':
        return '{5, 6, 7, 8} (minden ami nem az A-ban van)';
    }
  };

  return (
    <TheoryTemplate
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      documentId="grade-8-szamok-betuk-halmaz-muveletek"
      pdfFilename="8_osztaly_muveletek_halmazokkal_tananyag.pdf"
      title="3. Műveletek halmazokkal"
      subtitle="Halmazok metszete (∩), uniója (∪), különbsége (\\), komplementere (A'), Venn-diagramos ábrázolás, Szita-formula és felvételi szöveges feladatok"
      quickRule={{
        label: "Szita-formula két halmazra",
        formula: "|A ∪ B| = |A| + |B| - |A ∩ B|   és   |A \\ B| = |A| - |A ∩ B|"
      }}
      themeColor="indigo"
    >
      {/* 1. FEJEZET: METSZET ÉS UNIÓ */}
      <TheorySection
        number={1}
        title="A két alapművelet: Metszet (∩) és Unió (∪)"
        icon={<Layers className="w-5 h-5 text-indigo-600" />}
        badgeColor="indigo"
      >
        <TheoryCallout variant="info" title="Miért van szükség halmazműveletekre?">
          Ahogyan a számokkal végezhetünk alapműveleteket (összeadás, szorzás), úgy halmazokból is előállíthatunk új halmazokat logikai feltételek alapján. A két legalapvetőbb művelet a <strong>metszet</strong> (közös rész) és az <strong>unió</strong> (egyesítés).
        </TheoryCallout>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <TheoryCard
            title="1. Metszet (Közös rész: A ∩ B)"
            badge="ÉS kapcsolat"
            badgeColor="indigo"
          >
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              Az $A$ és $B$ halmazok <strong>metszete</strong> azon elemek halmaza, amelyek <strong>mindkét</strong> halmazhoz hozzátartoznak egyszerre ($x \in A$ <strong>ÉS</strong> $x \in B$).
            </p>
            <div className="mt-3 p-3 bg-indigo-50/70 dark:bg-indigo-950/40 rounded-xl border border-indigo-200 dark:border-indigo-800 text-xs font-mono font-bold text-indigo-900 dark:text-indigo-200">
              A ∩ B = &#123; x | x ∈ A és x ∈ B &#125;
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
              💡 <em>Ha két halmaznak nincs közös eleme ($A \cap B = \emptyset$), akkor azokat <strong>diszjunkt halmazoknak</strong> nevezzük.</em>
            </p>
          </TheoryCard>

          <TheoryCard
            title="2. Unió (Egyesítés: A ∪ B)"
            badge="VAGY kapcsolat"
            badgeColor="purple"
          >
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              Az $A$ és $B$ halmazok <strong>uniója</strong> (egyesítése) azon elemek halmaza, amelyek <strong>legalább az egyik</strong> halmaznak elemei ($x \in A$ <strong>VAGY</strong> $x \in B$).
            </p>
            <div className="mt-3 p-3 bg-purple-50/70 dark:bg-purple-950/40 rounded-xl border border-purple-200 dark:border-purple-800 text-xs font-mono font-bold text-purple-900 dark:text-purple-200">
              A ∪ B = &#123; x | x ∈ A vagy x ∈ B &#125;
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
              💡 <em>Az unióban a közös elemeket is csak <strong>egyszer</strong> tüntetjük fel!</em>
            </p>
          </TheoryCard>
        </div>

        {/* Interaktív Venn-diagram vizualizáció */}
        <div className="mt-5 p-4 sm:p-6 bg-slate-50 dark:bg-slate-850 rounded-2xl border-2 border-indigo-200 dark:border-slate-700 space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className="text-xs font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              Interaktív Művelet-megjelenítő (A = &#123;1, 2, 3, 4&#125;, B = &#123;3, 4, 5, 6&#125;, U = &#123;1..8&#125;)
            </span>
            <span className="text-xs font-bold text-slate-500">Kattints egy műveletre:</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {[
              { id: 'intersection', label: 'A ∩ B (Metszet)' },
              { id: 'union', label: 'A ∪ B (Unió)' },
              { id: 'diffAB', label: 'A \\ B (Különbség A-B)' },
              { id: 'diffBA', label: 'B \\ A (Különbség B-A)' },
              { id: 'compA', label: "A' vagy Ā (Komplementer)" }
            ].map((op) => (
              <Button
                key={op.id}
                size="sm"
                variant={activeOperation === op.id ? 'default' : 'outline'}
                onClick={() => setActiveOperation(op.id as any)}
                className={cn(
                  'rounded-xl text-xs font-bold transition-all',
                  activeOperation === op.id
                    ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                )}
              >
                {op.label}
              </Button>
            ))}
          </div>

          {/* Eredmény kártya */}
          <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              <div className="text-xs text-slate-400 font-bold uppercase">Kiválasztott művelet eredménye:</div>
              <div className="text-base sm:text-lg font-mono font-black text-indigo-600 dark:text-indigo-400">
                {getActiveElements()}
              </div>
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-400 max-w-xs text-right">
              {activeOperation === 'intersection' && 'Csak a 3 és 4 van benne mindkét halmazban.'}
              {activeOperation === 'union' && 'Minden elem benne van, de a 3 és 4 csak egyszer szerepel.'}
              {activeOperation === 'diffAB' && 'Az 1 és 2 csak az A-ban van meg, a B-ben nincs.'}
              {activeOperation === 'diffBA' && 'Az 5 és 6 csak a B-ben van meg, az A-ban nincs.'}
              {activeOperation === 'compA' && 'Az alaphalmaz elemei az A halmaz nélkül.'}
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 2. FEJEZET: KÜLÖNBSÉG ÉS KOMPLEMENTER */}
      <TheorySection
        number={2}
        title="Halmazok különbsége (\\) és Komplementere (Ā / A')"
        icon={<Shapes className="w-5 h-5 text-indigo-600" />}
        badgeColor="indigo"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard
            title="Halmazok Különbsége (A \\ B)"
            badge="Kivonás"
            badgeColor="rose"
          >
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              Az $A \setminus B$ („A mínusz B”) azon elemek összessége, amelyek <strong>benne vannak $A$-ban, de nincsenek benne $B$-ben</strong>.
            </p>
            <div className="mt-3 p-3 bg-rose-50/70 dark:bg-rose-950/40 rounded-xl border border-rose-200 dark:border-rose-800 text-xs font-mono font-bold text-rose-900 dark:text-rose-200">
              A \ B = &#123; x | x ∈ A és x ∉ B &#125;
            </div>
          </TheoryCard>

          <TheoryCard
            title="Komplementer Halmaz (Ā vagy A')"
            badge="Kiegészítés"
            badgeColor="cyan"
          >
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              Egy U alaphalmaz esetén az A halmaz <strong>komplementere</strong> az alaphalmaz azon elemei, amelyek <strong>nem tartoznak</strong> A-hoz: Ā = U \ A.
            </p>
            <div className="mt-3 p-3 bg-cyan-50/70 dark:bg-cyan-950/40 rounded-xl border border-cyan-200 dark:border-cyan-800 text-xs font-mono font-bold text-cyan-900 dark:text-cyan-200">
              Ā = &#123; x ∈ U | x ∉ A &#125;
            </div>
          </TheoryCard>
        </div>

        <TheoryTrapBox title="Gyakori Hiba: A halmazkivonás NEM megfordítható!">
          <p>
            A számok kivonásához hasonlóan A \ B ≠ B \ A!
            Például ha A = &#123;1, 2, 3&#125; és B = &#123;3, 4&#125;, akkor:
            <br />
            • A \ B = &#123;1, 2&#125;
            <br />
            • B \ A = &#123;4&#125;
            <br />
            A két halmaz teljesen különböző!
          </p>
        </TheoryTrapBox>

        {/* Fontos alaptulajdonságok táblázat */}
        <div className="mt-4">
          <TheoryTable
            headers={['Azonosság', 'Matematikai Felírás', 'Jelentése és Magyarázat']}
            rows={[
              ['Metszet önmagával', 'A ∩ A = A', 'Egy halmaz közös része önmagával önmaga.'],
              ['Unió önmagával', 'A ∪ A = A', 'Egy halmaz egyesítése önmagával nem változtatja meg a halmazt.'],
              ['Metszet üres halmazzal', 'A ∩ ∅ = ∅', 'Nincs közös elem, így az eredmény az üres halmaz.'],
              ['Unió üres halmazzal', 'A ∪ ∅ = A', 'Az üres halmaz hozzáadása nem hoz új elemet.'],
              ['Komplementer egyesítése', 'A ∪ Ā = U', 'Egy halmaz és kiegészítője együtt kiadja a teljes alaphalmazt.'],
              ['Komplementer metszete', 'A ∩ Ā = ∅', 'Egy elem vagy benne van a halmazban, vagy a komplementerében (nincs átfedés).'],
              ['Kettős komplementer', 'Ā̄ = A', 'A komplementer komplementere visszakapja az eredeti halmazt.']
            ]}
          />
        </div>
      </TheorySection>

      {/* 3. FEJEZET: A SZITA-FORMULA ÉS ELEMSZÁMOK */}
      <TheorySection
        number={3}
        title="A Szita-formula és elemek számlálása"
        icon={<Calculator className="w-5 h-5 text-indigo-600" />}
        badgeColor="indigo"
      >
        <TheoryCallout variant="warning" title="Miért nem adhatjuk össze egyszerűen a két halmaz elemszámát?">
          Ha egyszerűen összeadjuk $|A| + |B|$-t, akkor a közös részben lévő elemeket ($|A \cap B|$) <strong>kétszer számolnánk meg</strong> (egyszer $A$-ban, egyszer $B$-ben). Ezért a metszetet egyszer le kell vonni!
        </TheoryCallout>

        <div className="p-4 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-slate-850 dark:to-slate-800 rounded-2xl border-2 border-indigo-300 dark:border-slate-700 text-center space-y-2 mt-4">
          <div className="text-xs font-black uppercase text-indigo-700 dark:text-indigo-300 tracking-wider">
            A Szita-formula 2 halmazra
          </div>
          <div className="text-xl sm:text-2xl font-mono font-black text-slate-900 dark:text-white">
            |A ∪ B| = |A| + |B| - |A ∩ B|
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Átrendezve a metszet kiszámítására: <strong>|A ∩ B| = |A| + |B| - |A ∪ B|</strong>
          </p>
        </div>

        {/* Interaktív Szita-kalkulátor */}
        <div className="mt-5 p-5 bg-white dark:bg-slate-900 rounded-2xl border-2 border-indigo-200 dark:border-slate-800 space-y-4">
          <div className="text-xs font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400 flex items-center gap-2">
            <Calculator className="w-4 h-4" />
            Interaktív Szita-formula Számoló (Próbáld ki más számokkal!)
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
              <label className="text-xs font-bold text-slate-600 dark:text-slate-400 block mb-1">
                |A| (A halmaz elemszáma):
              </label>
              <input
                type="number"
                min="0"
                value={sizeA}
                onChange={(e) => setSizeA(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full h-9 px-3 rounded-lg border border-slate-300 dark:border-slate-700 font-mono font-bold text-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              />
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
              <label className="text-xs font-bold text-slate-600 dark:text-slate-400 block mb-1">
                |B| (B halmaz elemszáma):
              </label>
              <input
                type="number"
                min="0"
                value={sizeB}
                onChange={(e) => setSizeB(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full h-9 px-3 rounded-lg border border-slate-300 dark:border-slate-700 font-mono font-bold text-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              />
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
              <label className="text-xs font-bold text-slate-600 dark:text-slate-400 block mb-1">
                |A ∩ B| (Közös elemek):
              </label>
              <input
                type="number"
                min="0"
                max={Math.min(sizeA, sizeB)}
                value={sizeIntersection}
                onChange={(e) => setSizeIntersection(Math.max(0, Math.min(parseInt(e.target.value) || 0, Math.min(sizeA, sizeB))))}
                className="w-full h-9 px-3 rounded-lg border border-slate-300 dark:border-slate-700 font-mono font-bold text-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          {/* Venn-diagramos részeredmények */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
            <div className="p-3 bg-indigo-50/80 dark:bg-indigo-950/40 rounded-xl border border-indigo-200 dark:border-indigo-800 text-center">
              <div className="text-[10px] font-bold uppercase text-slate-500">Csak A (|A \ B|)</div>
              <div className="text-lg font-black font-mono text-indigo-600 dark:text-indigo-300">{onlyA} db</div>
            </div>
            <div className="p-3 bg-purple-50/80 dark:bg-purple-950/40 rounded-xl border border-purple-200 dark:border-purple-800 text-center">
              <div className="text-[10px] font-bold uppercase text-slate-500">Közös (|A ∩ B|)</div>
              <div className="text-lg font-black font-mono text-purple-600 dark:text-purple-300">{sizeIntersection} db</div>
            </div>
            <div className="p-3 bg-indigo-50/80 dark:bg-indigo-950/40 rounded-xl border border-indigo-200 dark:border-indigo-800 text-center">
              <div className="text-[10px] font-bold uppercase text-slate-500">Csak B (|B \ A|)</div>
              <div className="text-lg font-black font-mono text-indigo-600 dark:text-indigo-300">{onlyB} db</div>
            </div>
            <div className="p-3 bg-emerald-50/80 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800 text-center">
              <div className="text-[10px] font-bold uppercase text-slate-500">Összesen (|A ∪ B|)</div>
              <div className="text-lg font-black font-mono text-emerald-600 dark:text-emerald-300">{calculatedUnion} db</div>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 4. FEJEZET: FELVÉTELI TÍPUSÚ SZÖVEGES MINTAPÉLDÁK */}
      <TheorySection
        number={4}
        title="Felvételi mintafeladatok és levezetésük"
        icon={<Sparkles className="w-5 h-5 text-indigo-600" />}
        badgeColor="indigo"
      >
        <TheoryCard
          title="1. Mintafeladat: Nyelvtanulók az osztályban"
          badge="Tipikus felvételi"
          badgeColor="emerald"
        >
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium mb-3">
            Egy 30 fős osztályban mindenki tanul legalább egy nyelvet. 20-an tanulnak angolul és 15-en németül. Hányan tanulják mindkét nyelvet, és hányan tanulnak csak angolul?
          </p>

          <div className="space-y-2 p-3.5 bg-slate-50 dark:bg-slate-850 rounded-xl border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300">
            <div className="font-bold text-indigo-700 dark:text-indigo-400">Levezetés lépésről lépésre:</div>
            <div>1. Legyen $A$ az angolosok, $N$ a németesek halmaza: $|A| = 20$, $|N| = 15$.</div>
            <div>2. Mivel mindenki tanul nyelvet, az unió: $|A \cup N| = 30$.</div>
            <div>3. Szita-formula alkalmazása a közös részre:
              <br />
              <span className="font-mono font-bold text-indigo-600 dark:text-indigo-300 ml-3">
                |A ∩ N| = |A| + |N| - |A ∪ N| = 20 + 15 - 30 = 35 - 30 = 5 diák.
              </span>
            </div>
            <div>4. A csak angolul tanulók száma:
              <br />
              <span className="font-mono font-bold text-indigo-600 dark:text-indigo-300 ml-3">
                |A \ N| = |A| - |A ∩ N| = 20 - 5 = 15 diák.
              </span>
            </div>
            <div className="font-bold text-emerald-600 dark:text-emerald-400 pt-1">
              ✓ Válasz: 5 diák tanulja mindkét nyelvet, és 15-en tanulnak csak angolul.
            </div>
          </div>
        </TheoryCard>

        {/* Gyors Ellenőrző Tesztkérdés */}
        <div className="mt-5 p-5 bg-gradient-to-br from-indigo-50/70 to-purple-50/70 dark:from-slate-850 dark:to-slate-900 rounded-2xl border-2 border-indigo-200 dark:border-slate-800 space-y-3">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-indigo-600" />
            <h4 className="text-sm font-black text-slate-900 dark:text-white">
              Önellenőrző Kérdés: Mennyi az A \ B elemszáma?
            </h4>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Adott A = &#123;1, 3, 5, 7, 9&#125; és B = &#123;5, 7, 11&#125;. Hány eleme van az A \ B halmaznak?
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
            {[
              { text: '2 elem', value: 2 },
              { text: '3 elem ({1, 3, 9})', value: 3 },
              { text: '4 elem', value: 4 },
              { text: '5 elem', value: 5 }
            ].map((opt, idx) => (
              <button
                key={idx}
                disabled={quizSubmitted}
                onClick={() => setQuizAnswer(opt.value)}
                className={cn(
                  'p-2.5 rounded-xl text-xs font-bold transition-all border text-center',
                  quizAnswer === opt.value
                    ? 'bg-indigo-600 text-white border-indigo-700 shadow-sm'
                    : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-indigo-400'
                )}
              >
                {opt.text}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between pt-2">
            {!quizSubmitted ? (
              <Button
                size="sm"
                disabled={quizAnswer === null}
                onClick={() => setQuizSubmitted(true)}
                className="rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-4"
              >
                Válasz ellenőrzése
              </Button>
            ) : (
              <div className="flex items-center gap-2 text-xs font-bold">
                {quizAnswer === 3 ? (
                  <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> Helyes! Az A-ból elhagyjuk az 5-öt és 7-et, marad &#123;1, 3, 9&#125; (3 elem).
                  </span>
                ) : (
                  <span className="text-rose-600 dark:text-rose-400 flex items-center gap-1">
                    <XCircle className="w-4 h-4" /> Nem jó! Az 5 és 7 a közös elem, így A \ B = &#123;1, 3, 9&#125;, azaz 3 darab.
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default SetOperationsTheory;
