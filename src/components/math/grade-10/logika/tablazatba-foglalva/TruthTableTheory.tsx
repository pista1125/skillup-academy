import React, { useState } from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable,
  GeometryFigureCard
} from '../TheoryTemplate';
import {
  TruthTableDnaSvg,
  SmullyanDoorsSvg,
  DeMorganVennSvg,
  EinsteinGridSvg
} from './TruthTableFigures';
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Lightbulb,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Scale,
  Brain,
  HelpCircle,
  Layers,
  Table as TableIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TruthTableTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

type FormulaMode = 'demorgan-and' | 'demorgan-or' | 'tautology' | 'contradiction';

export const TruthTableTheory: React.FC<TruthTableTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  const [selectedFormula, setSelectedFormula] = useState<FormulaMode>('demorgan-and');

  return (
    <TheoryTemplate
      badgeText="10. OSZTÁLY • I. LOGIKA"
      title="4. Igaz vagy hamis? Foglaljuk táblázatba!"
      description="Szisztematikus esetelemzés, igazságtáblázatok szerkesztése, De Morgan-azonosságok és híres logikai rejtvények"
      ruleFormula="¬(A ∧ B) ≡ ¬A ∨ ¬B   és   ¬(A ∨ B) ≡ ¬A ∧ ¬B (De Morgan-törvények)"
      ruleDescription="A táblázatos módszer alapelve: Ha egy logikai feladványban több feltétel és lehetőség van, az összes eset rendezett táblázatba foglalása garantálja a biztos és ellentmondásmentes megoldást!"
      ruleCard="A TÁBLÁZATOS ELEMZÉS ÉS DE MORGAN SZABÁLYA"
      pdfFileName="10_osztaly_igazsagtablazatok.pdf"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
    >
      {/* 1. SZAKASZ */}
      <TheorySection
        number={1}
        title="Miért foglaljuk táblázatba? A szisztematikus esetelemzés elve"
        badge="ALAPELV"
      >
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
            Amikor egy logikai feladványban vagy matematikai tételben több ismeretlen állítás szerepel, a puszta
            fejben való gondolkodás könnyen félrevezethet. Elég egyetlen esetet kifelejteni, és a következtetésünk
            máris téves lesz. A matematikai logika leghatékonyabb fegyvere az{' '}
            <strong className="text-emerald-600 dark:text-emerald-400">igazságtáblázat (esettáblázat)</strong>,
            amely a szóba jöhető összes lehetőséget áttekinthető rendszerbe foglalja.
          </p>

          <TheoryCard
            title="Hány sorból áll egy igazságtáblázat? (2ⁿ szabály)"
            subtitle="A kombinatorikai lehetőségek száma"
            color="emerald"
          >
            <div className="space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <p>
                Mivel a klasszikus logikában minden egyes kijelentésnek pontosan 2 lehetséges értéke van (IGAZ vagy HAMIS),
                ezért a független állítások számával az összes eset száma 2 hatványai szerint nő:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">
                  <div className="text-xs text-slate-500">1 állítás (A)</div>
                  <div className="text-base font-black text-emerald-600">2¹ = 2 sor</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">I, H</div>
                </div>

                <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">
                  <div className="text-xs text-slate-500">2 állítás (A, B)</div>
                  <div className="text-base font-black text-indigo-600">2² = 4 sor</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">(I,I), (I,H), (H,I), (H,H)</div>
                </div>

                <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">
                  <div className="text-xs text-slate-500">3 állítás (A, B, C)</div>
                  <div className="text-base font-black text-purple-600">2³ = 8 sor</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">8 kombináció</div>
                </div>
              </div>
            </div>
          </TheoryCard>
        </div>
      </TheorySection>

      {/* 2. SZAKASZ */}
      <TheorySection
        number={2}
        title="Igazságtáblázatok szerkesztése lépésről lépésre"
        badge="SZERKESZTÉS"
      >
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
            Egy összetett logikai kifejezés kiértékeléséhez a táblázatot mindig az alábbi logikai lépések szerint építjük fel:
            <br />
            1. <strong>Bemeneti oszlopok:</strong> Az alapváltozók (A, B) lehetséges igazságértékei.
            <br />
            2. <strong>Részműveletek oszlopai:</strong> A tagadások (¬A, ¬B) és zárójeles részkifejezések.
            <br />
            3. <strong>Főművelet oszlopa:</strong> A teljes kifejezés végeredménye.
          </p>

          <GeometryFigureCard
            title="Lépésről lépésre levezetés: ¬(A ∧ B) és ¬A ∨ ¬B"
            caption="Figyeld meg a táblázatban: a két kiemelt zöld oszlop minden sorban azonos (H, I, I, I), ami bizonyítja az azonosságukat!"
            badge="TÁBLÁZAT"
          >
            <TruthTableDnaSvg />
          </GeometryFigureCard>
        </div>
      </TheorySection>

      {/* 3. SZAKASZ */}
      <TheorySection
        number={3}
        title="A De Morgan-azonosságok (Az ÉS és VAGY tagadása)"
        badge="DE MORGAN"
      >
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
            Augustus De Morgan (1806–1871) brit matematikus fedezte fel az összetett logikai műveletek tagadásának
            két legfontosabb alaptörvényét. Ezek a szabályok megmutatják, hogyan alakul át az ÉS művelet VAGY műveletté
            a negálás során, és fordítva:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TheoryCard
              title="1. De Morgan-törvény (Az ÉS tagadása)"
              subtitle="¬(A ∧ B) ≡ ¬A ∨ ¬B"
              color="indigo"
            >
              <div className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                <p>
                  Két állítás konjunkciójának (ÉS) tagadása egyenértékű a két állítás tagadásainak diszjunkciójával (VAGY).
                </p>
                <div className="p-2.5 bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 rounded-lg text-xs">
                  <strong>Példa a mindennapi életből:</strong>
                  <br />
                  <em>„Peti kávét ÉS teát is iszik.”</em>
                  <br />
                  <strong>Tagadása:</strong> <em>„Peti nem iszik kávét VAGY nem iszik teát.”</em> (Elég, ha az egyiket nem issza, az ígéret máris megbukott!).
                </div>
              </div>
            </TheoryCard>

            <TheoryCard
              title="2. De Morgan-törvény (A VAGY tagadása)"
              subtitle="¬(A ∨ B) ≡ ¬A ∧ ¬B"
              color="emerald"
            >
              <div className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                <p>
                  Két állítás diszjunkciójának (VAGY) tagadása egyenértékű a két tagadás konjunkciójával (ÉS).
                </p>
                <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-lg text-xs">
                  <strong>Példa a mindennapi életből:</strong>
                  <br />
                  <em>„Peti pizzát VAGY hamburgert rendel.”</em>
                  <br />
                  <strong>Tagadása:</strong> <em>„Peti nem rendel pizzát ÉS nem rendel hamburgert sem.”</em> (Csak akkor hamis a VAGY, ha egyik sem valósul meg!).
                </div>
              </div>
            </TheoryCard>
          </div>

          <GeometryFigureCard
            title="A De Morgan-törvények Halmazelméleti Szemléltetése"
            caption="Balra: ¬(A ∪ B) az unió komplementere (kívül eső rész). Jobbra: ¬(A ∩ B) a metszet komplementere (minden, ami nem a közös rész)."
            badge="VENN-PÁRHUZAM"
          >
            <DeMorganVennSvg />
          </GeometryFigureCard>

          <TheoryTable
            title="Tankönyvi Mintafeladatok De Morgan Alkalmazására (23. oldal)"
            headers={['Eredeti Kijelentés', 'Logikai Szerkezet', 'Helyes Tagadás', 'Azonosság']}
            rows={[
              [
                'Minden szekrényünk barna vagy kétajtós.',
                '∀x (B(x) ∨ K(x))',
                'Van olyan szekrényünk, amely nem barna és nem kétajtós.',
                '¬(B ∨ K) ≡ ¬B ∧ ¬K'
              ],
              [
                'Van olyan biciklink, amely kényelmes és jól felszerelt.',
                '∃x (K(x) ∧ F(x))',
                'Minden biciklink kényelmetlen vagy nincs jól felszerelve.',
                '¬(K ∧ F) ≡ ¬K ∨ ¬F'
              ],
              [
                'A boltban van alma és narancs is.',
                'A ∧ N',
                'Nincs a boltban alma, vagy nincs narancs.',
                '¬(A ∧ N) ≡ ¬A ∨ ¬N'
              ]
            ]}
          />
        </div>
      </TheorySection>

      {/* 4. SZAKASZ */}
      <TheorySection
        number={4}
        title="Klasszikus logikai feladványok táblázatos megfejtése"
        badge="REJTVÉNYEK"
      >
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
            Raymond Smullyan amerikai matematikus és logikus tette világhírűvé a szobák, lányok és szörnyek
            fejtörőit. Nézzük meg a tankönyv 20. oldalán lévő hivatalos feladványt!
          </p>

          <TheoryCard
            title="Kvarkus Erődje: Lány vagy Szörny? (Tankönyv 20. oldal)"
            subtitle="Kovalens Kapitány próbatétele"
            color="purple"
          >
            <div className="space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
              <p>
                A toronyban két ajtó van. Mindkét ajtó mögött vagy egy lány, vagy egy szörny rejtőzik.
                <br />
                • <strong>1. ajtó felirata:</strong> <em>„Ebben a szobában lány van, a 2. szobában szörny.”</em>
                <br />
                • <strong>2. ajtó felirata:</strong> <em>„Az egyik szobában lány van, a másikban szörny.”</em>
                <br />
                • <strong>Kovalens Kapitány tudja:</strong> <em>Az egyik felirat IGAZ, a másik HAMIS.</em>
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-xs border border-slate-200 dark:border-slate-700 rounded-lg">
                  <thead className="bg-slate-100 dark:bg-slate-800">
                    <tr>
                      <th className="p-2 text-left">1. szoba</th>
                      <th className="p-2 text-left">2. szoba</th>
                      <th className="p-2 text-left">1. felirat értéke</th>
                      <th className="p-2 text-left">2. felirat értéke</th>
                      <th className="p-2 text-left">Feltétel (1 igaz, 1 hamis)?</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                    <tr>
                      <td className="p-2 font-bold text-slate-700">Lány</td>
                      <td className="p-2 font-bold text-slate-700">Lány</td>
                      <td className="p-2 text-rose-600 font-bold">HAMIS</td>
                      <td className="p-2 text-rose-600 font-bold">HAMIS</td>
                      <td className="p-2 text-rose-600 font-bold">Nem felel meg (mindkettő H)</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-bold text-slate-700">Lány</td>
                      <td className="p-2 font-bold text-slate-700">Szörny</td>
                      <td className="p-2 text-emerald-600 font-bold">IGAZ</td>
                      <td className="p-2 text-emerald-600 font-bold">IGAZ</td>
                      <td className="p-2 text-rose-600 font-bold">Nem felel meg (mindkettő I)</td>
                    </tr>
                    <tr className="bg-emerald-50 dark:bg-emerald-950/40">
                      <td className="p-2 font-black text-rose-600">Szörny</td>
                      <td className="p-2 font-black text-emerald-600">Lány</td>
                      <td className="p-2 text-rose-600 font-bold">HAMIS</td>
                      <td className="p-2 text-emerald-600 font-bold">IGAZ</td>
                      <td className="p-2 text-emerald-600 font-black">TÖKÉLETES MEGOLDÁS! ✓</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 text-xs">
                <strong>Következtetés:</strong> A táblázat egyértelműen megmutatja, hogy a feltétel kizárólag a 3. sorban teljesül.
                Ezért a Kapitánynak a <strong>2. szobát érdemes választania</strong>, mert ott biztosan a kiszabadítandó lány van!
              </div>
            </div>
          </TheoryCard>

          <GeometryFigureCard
            title="A Két Ajtó és a Feliratok Elemzése"
            caption="A szisztematikus táblázat kizárja a találgatást: pontosan egyetlen lehetséges kombináció elégíti ki a feltételt!"
            badge="SMULLYAN-MÓDSZER"
          >
            <SmullyanDoorsSvg />
          </GeometryFigureCard>
        </div>
      </TheorySection>

      {/* 5. SZAKASZ */}
      <TheorySection
        number={5}
        title="Einstein-típusú logikai rácsok és a kizárásos következtetés"
        badge="LOGIKAI RÁCS"
      >
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
            Amikor több különböző tulajdonsághalmaz elemeit kell egymáshoz rendelni (például pályák, iskolák, sapkaszínek
            és elért helyezések), a logikai rácstáblázat a leghatékonyabb eszköz. A táblázatban a kizárt lehetőségekhez
            <strong> ✗</strong>, a biztos összetartozásokhoz <strong>✓</strong> jelet teszünk.
          </p>

          <GeometryFigureCard
            title="Az Úszóverseny 4 Pályájának Esettáblázata (Tankönyv 21. oldal)"
            caption="A megadott feltételek (belső pálya, sapkák sorrendje) alapján egyértelműen meghatározható az összes versenyző adatai!"
            badge="EINSTEIN-RÁCS"
          >
            <EinsteinGridSvg />
          </GeometryFigureCard>
        </div>
      </TheorySection>

      {/* 6. SZAKASZ */}
      <TheorySection
        number={6}
        title="Logikai ekvivalencia és tautológiák igazolása"
        badge="EKVIVALENCIA"
      >
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
            Két logikai kifejezést <strong className="text-emerald-600 dark:text-emerald-400">ekvivalensnek (egyenértékűnek)</strong> nevezünk,
            ha az igazságtáblázatuk végeredmény oszlopa minden sorban tökéletesen megegyezik (jele: <strong>≡</strong> vagy <strong>⇔</strong>).
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1">
              <div className="font-bold text-slate-900 dark:text-slate-100">Kettős tagadás elve</div>
              <div className="font-mono text-xs text-emerald-600 font-bold">¬(¬A) ≡ A</div>
              <p className="text-slate-500 text-xs">Két egymást követő tagadás kioltja egymást.</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1">
              <div className="font-bold text-slate-900 dark:text-slate-100">Kizárt harmadik elve (Tautológia)</div>
              <div className="font-mono text-xs text-emerald-600 font-bold">A ∨ ¬A ≡ IGAZ</div>
              <p className="text-slate-500 text-xs">Minden sorban I értéket vesz fel.</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1">
              <div className="font-bold text-slate-900 dark:text-slate-100">Ellentmondásmentesség (Kontradikció)</div>
              <div className="font-mono text-xs text-rose-600 font-bold">A ∧ ¬A ≡ HAMIS</div>
              <p className="text-slate-500 text-xs">Minden sorban H értéket vesz fel, lehetetlen.</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1">
              <div className="font-bold text-slate-900 dark:text-slate-100">Elnyelési (Abszorpciós) törvény</div>
              <div className="font-mono text-xs text-emerald-600 font-bold">A ∨ (A ∧ B) ≡ A</div>
              <p className="text-slate-500 text-xs">A kifejezés értéke kizárólag A értékével egyezik meg.</p>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* 7. SZAKASZ: INTERAKTÍV LABOR A TANANYAG LEGÉGÉN */}
      <TheorySection
        number={7}
        title="Interaktív Igazságtáblázat és Logikai Rejtvény Labor"
        badge="GYAKORLÓ LABOR"
      >
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
            Válassz ki egy logikai tételt az alábbi gombokkal! Figyeld meg valós időben a 4 lehetséges sor
            lépésről lépésre történő kiszámítását és az azonosságok igazolását!
          </p>

          {/* Mode Switcher Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
            <button
              onClick={() => setSelectedFormula('demorgan-and')}
              className={`p-2.5 rounded-xl border text-xs font-bold transition-all text-left ${
                selectedFormula === 'demorgan-and'
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-md'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-emerald-400'
              }`}
            >
              <div>¬(A ∧ B) ≡ ¬A ∨ ¬B</div>
              <div className={`text-[10px] font-normal ${selectedFormula === 'demorgan-and' ? 'text-emerald-100' : 'text-slate-500'}`}>
                1. De Morgan-törvény
              </div>
            </button>

            <button
              onClick={() => setSelectedFormula('demorgan-or')}
              className={`p-2.5 rounded-xl border text-xs font-bold transition-all text-left ${
                selectedFormula === 'demorgan-or'
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-md'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-emerald-400'
              }`}
            >
              <div>¬(A ∨ B) ≡ ¬A ∧ ¬B</div>
              <div className={`text-[10px] font-normal ${selectedFormula === 'demorgan-or' ? 'text-emerald-100' : 'text-slate-500'}`}>
                2. De Morgan-törvény
              </div>
            </button>

            <button
              onClick={() => setSelectedFormula('tautology')}
              className={`p-2.5 rounded-xl border text-xs font-bold transition-all text-left ${
                selectedFormula === 'tautology'
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-md'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-emerald-400'
              }`}
            >
              <div>A ∨ ¬A ≡ IGAZ</div>
              <div className={`text-[10px] font-normal ${selectedFormula === 'tautology' ? 'text-emerald-100' : 'text-slate-500'}`}>
                Tautológia (Kizárt harmadik)
              </div>
            </button>

            <button
              onClick={() => setSelectedFormula('contradiction')}
              className={`p-2.5 rounded-xl border text-xs font-bold transition-all text-left ${
                selectedFormula === 'contradiction'
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-md'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-emerald-400'
              }`}
            >
              <div>A ∧ ¬A ≡ HAMIS</div>
              <div className={`text-[10px] font-normal ${selectedFormula === 'contradiction' ? 'text-emerald-100' : 'text-slate-500'}`}>
                Kontradikció (Ellentmondás)
              </div>
            </button>
          </div>

          {/* Interactive Truth Table Display */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-800/60 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  Élő Igazságtáblázat Elemzés
                </span>
                <h4 className="text-base sm:text-lg font-black text-slate-900 dark:text-slate-100 mt-0.5">
                  {selectedFormula === 'demorgan-and' && '1. De Morgan-törvény: ¬(A ∧ B) ≡ ¬A ∨ ¬B'}
                  {selectedFormula === 'demorgan-or' && '2. De Morgan-törvény: ¬(A ∨ B) ≡ ¬A ∧ ¬B'}
                  {selectedFormula === 'tautology' && 'Tautológia igazolása: A ∨ ¬A'}
                  {selectedFormula === 'contradiction' && 'Ellentmondás igazolása: A ∧ ¬A'}
                </h4>
              </div>
            </div>

            {/* Render selected table */}
            <div className="overflow-x-auto">
              <table className="w-full text-xs border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
                <thead className="bg-slate-900 text-white">
                  <tr>
                    <th className="p-2.5 text-center">A</th>
                    <th className="p-2.5 text-center">B</th>
                    {selectedFormula === 'demorgan-and' && (
                      <>
                        <th className="p-2.5 text-center text-slate-300">A ∧ B</th>
                        <th className="p-2.5 text-center bg-emerald-700 text-white font-black">¬(A ∧ B)</th>
                        <th className="p-2.5 text-center text-slate-300">¬A</th>
                        <th className="p-2.5 text-center text-slate-300">¬B</th>
                        <th className="p-2.5 text-center bg-emerald-700 text-white font-black">¬A ∨ ¬B</th>
                      </>
                    )}
                    {selectedFormula === 'demorgan-or' && (
                      <>
                        <th className="p-2.5 text-center text-slate-300">A ∨ B</th>
                        <th className="p-2.5 text-center bg-emerald-700 text-white font-black">¬(A ∨ B)</th>
                        <th className="p-2.5 text-center text-slate-300">¬A</th>
                        <th className="p-2.5 text-center text-slate-300">¬B</th>
                        <th className="p-2.5 text-center bg-emerald-700 text-white font-black">¬A ∧ ¬B</th>
                      </>
                    )}
                    {selectedFormula === 'tautology' && (
                      <>
                        <th className="p-2.5 text-center text-slate-300">¬A</th>
                        <th className="p-2.5 text-center bg-emerald-700 text-white font-black">A ∨ ¬A (Tautológia)</th>
                      </>
                    )}
                    {selectedFormula === 'contradiction' && (
                      <>
                        <th className="p-2.5 text-center text-slate-300">¬A</th>
                        <th className="p-2.5 text-center bg-rose-700 text-white font-black">A ∧ ¬A (Ellentmondás)</th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700 text-center font-bold">
                  {selectedFormula === 'demorgan-and' && (
                    <>
                      <tr>
                        <td className="p-2">I</td>
                        <td className="p-2">I</td>
                        <td className="p-2 text-slate-500 font-normal">I</td>
                        <td className="p-2 bg-emerald-50 dark:bg-emerald-950/30 text-rose-600 font-black">H</td>
                        <td className="p-2 text-slate-500 font-normal">H</td>
                        <td className="p-2 text-slate-500 font-normal">H</td>
                        <td className="p-2 bg-emerald-50 dark:bg-emerald-950/30 text-rose-600 font-black">H</td>
                      </tr>
                      <tr>
                        <td className="p-2">I</td>
                        <td className="p-2">H</td>
                        <td className="p-2 text-slate-500 font-normal">H</td>
                        <td className="p-2 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 font-black">I</td>
                        <td className="p-2 text-slate-500 font-normal">H</td>
                        <td className="p-2 text-slate-500 font-normal">I</td>
                        <td className="p-2 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 font-black">I</td>
                      </tr>
                      <tr>
                        <td className="p-2">H</td>
                        <td className="p-2">I</td>
                        <td className="p-2 text-slate-500 font-normal">H</td>
                        <td className="p-2 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 font-black">I</td>
                        <td className="p-2 text-slate-500 font-normal">I</td>
                        <td className="p-2 text-slate-500 font-normal">H</td>
                        <td className="p-2 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 font-black">I</td>
                      </tr>
                      <tr>
                        <td className="p-2">H</td>
                        <td className="p-2">H</td>
                        <td className="p-2 text-slate-500 font-normal">H</td>
                        <td className="p-2 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 font-black">I</td>
                        <td className="p-2 text-slate-500 font-normal">I</td>
                        <td className="p-2 text-slate-500 font-normal">I</td>
                        <td className="p-2 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 font-black">I</td>
                      </tr>
                    </>
                  )}

                  {selectedFormula === 'demorgan-or' && (
                    <>
                      <tr>
                        <td className="p-2">I</td>
                        <td className="p-2">I</td>
                        <td className="p-2 text-slate-500 font-normal">I</td>
                        <td className="p-2 bg-emerald-50 dark:bg-emerald-950/30 text-rose-600 font-black">H</td>
                        <td className="p-2 text-slate-500 font-normal">H</td>
                        <td className="p-2 text-slate-500 font-normal">H</td>
                        <td className="p-2 bg-emerald-50 dark:bg-emerald-950/30 text-rose-600 font-black">H</td>
                      </tr>
                      <tr>
                        <td className="p-2">I</td>
                        <td className="p-2">H</td>
                        <td className="p-2 text-slate-500 font-normal">I</td>
                        <td className="p-2 bg-emerald-50 dark:bg-emerald-950/30 text-rose-600 font-black">H</td>
                        <td className="p-2 text-slate-500 font-normal">H</td>
                        <td className="p-2 text-slate-500 font-normal">I</td>
                        <td className="p-2 bg-emerald-50 dark:bg-emerald-950/30 text-rose-600 font-black">H</td>
                      </tr>
                      <tr>
                        <td className="p-2">H</td>
                        <td className="p-2">I</td>
                        <td className="p-2 text-slate-500 font-normal">I</td>
                        <td className="p-2 bg-emerald-50 dark:bg-emerald-950/30 text-rose-600 font-black">H</td>
                        <td className="p-2 text-slate-500 font-normal">I</td>
                        <td className="p-2 text-slate-500 font-normal">H</td>
                        <td className="p-2 bg-emerald-50 dark:bg-emerald-950/30 text-rose-600 font-black">H</td>
                      </tr>
                      <tr>
                        <td className="p-2">H</td>
                        <td className="p-2">H</td>
                        <td className="p-2 text-slate-500 font-normal">H</td>
                        <td className="p-2 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 font-black">I</td>
                        <td className="p-2 text-slate-500 font-normal">I</td>
                        <td className="p-2 text-slate-500 font-normal">I</td>
                        <td className="p-2 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 font-black">I</td>
                      </tr>
                    </>
                  )}

                  {selectedFormula === 'tautology' && (
                    <>
                      <tr>
                        <td className="p-2">I</td>
                        <td className="p-2 text-slate-400 font-normal">-</td>
                        <td className="p-2 text-slate-500 font-normal">H</td>
                        <td className="p-2 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 font-black">IGAZ (1)</td>
                      </tr>
                      <tr>
                        <td className="p-2">H</td>
                        <td className="p-2 text-slate-400 font-normal">-</td>
                        <td className="p-2 text-slate-500 font-normal">I</td>
                        <td className="p-2 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 font-black">IGAZ (1)</td>
                      </tr>
                    </>
                  )}

                  {selectedFormula === 'contradiction' && (
                    <>
                      <tr>
                        <td className="p-2">I</td>
                        <td className="p-2 text-slate-400 font-normal">-</td>
                        <td className="p-2 text-slate-500 font-normal">H</td>
                        <td className="p-2 bg-rose-50 dark:bg-rose-950/30 text-rose-600 font-black">HAMIS (0)</td>
                      </tr>
                      <tr>
                        <td className="p-2">H</td>
                        <td className="p-2 text-slate-400 font-normal">-</td>
                        <td className="p-2 text-slate-500 font-normal">I</td>
                        <td className="p-2 bg-rose-50 dark:bg-rose-950/30 text-rose-600 font-black">HAMIS (0)</td>
                      </tr>
                    </>
                  )}
                </tbody>
              </table>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-400">
              <strong className="text-slate-900 dark:text-slate-100">Tanulság:</strong>{' '}
              {selectedFormula === 'demorgan-and' && 'A két kiemelt oszlop értéke mind a 4 sorban tökéletesen megegyezik: [H, I, I, I]. Ezzel matematikailag bizonyítottuk a De Morgan-azonosságot.'}
              {selectedFormula === 'demorgan-or' && 'A két kiemelt oszlop értéke mind a 4 sorban azonos: [H, H, H, I]. Ez igazolja a VAGY tagadásának De Morgan-szabályát.'}
              {selectedFormula === 'tautology' && 'Az A ∨ ¬A formula kimenete A bármely értékére (I vagy H) mindig IGAZ! Ezt a kifejezést tautológiának nevezzük.'}
              {selectedFormula === 'contradiction' && 'Az A ∧ ¬A kifejezés kimenete mindig HAMIS, semmilyen körülmények között sem lehet igaz. Ezt ellentmondásnak nevezzük.'}
            </div>
          </div>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};

export default TruthTableTheory;

