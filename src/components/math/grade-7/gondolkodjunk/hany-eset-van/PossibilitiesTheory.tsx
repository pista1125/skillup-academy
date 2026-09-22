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
  AdditionRuleDiagram,
  MultiplicationRuleDiagram,
  DecisionTreeDiagram,
  ReplacementCompareDiagram
} from './PossibilitiesDiagrams';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Sparkles,
  Layers,
  GitBranch,
  Plus,
  X,
  Shuffle,
  Lightbulb,
  Shirt,
  Utensils,
  KeyRound,
  RotateCcw,
  CheckCircle2,
  HelpCircle,
  ArrowRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface PossibilitiesTheoryProps {
  onBack: () => void;
  onStartQuiz?: () => void;
}

export const PossibilitiesTheory: React.FC<PossibilitiesTheoryProps> = ({
  onBack,
  onStartQuiz
}) => {
  // Interactive Menu / Outfit Builder Lab State
  const [numTops, setNumTops] = useState<number>(3); // Pólók
  const [numPants, setNumPants] = useState<number>(2); // Nadrágok
  const [numShoes, setNumShoes] = useState<number>(2); // Cipők

  // Selected item for preview
  const [selectedTop, setSelectedTop] = useState<number>(0);
  const [selectedPant, setSelectedPant] = useState<number>(0);
  const [selectedShoe, setSelectedShoe] = useState<number>(0);

  const topIcons = ['🔴 Piros póló', '🔵 Kék póló', '🟢 Zöld póló', '🟡 Sárga póló'];
  const pantIcons = ['👖 Farmer', '🩳 Rövidnadrág', '🥋 Melegítő'];
  const shoeIcons = ['👟 Edzőcipő', '👞 Bőrcipő', '🩴 Papucs'];

  const totalOutfits = numTops * numPants * numShoes;

  return (
    <TheoryTemplate
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      documentId="g7-logic-how-many-cases-theory-doc"
      pdfFilename="7_osztaly_gondolkodjunk_hany_eset_van.pdf"
      badgeText="7. Osztály • Matematika I. Témakör"
      title="3. Hány eset van?"
      subtitle="Összeadási és szorzási szabály, független döntések, fa-diagramok, esetszétválasztás és a visszatevés elve"
      quickRule={{
        label: 'Alapvető Szabályok',
        formula: 'VAGY: A + B,   ÉS (sorozat): p · q · r,   PIN kód: 10⁴'
      }}
      themeColor="blue"
      practiceTitle="Készen állsz a kombinatorikai döntési feladatok gyakorlására?"
      practiceSubtitle="30 válogatott feladat 3 nehézségi szinten, kártyás párosítóval és csoportosító játékkal!"
    >
      {/* SECTION 1: Az Összeadási Szabály (VAGY kapcsolat) */}
      <TheorySection
        number={1}
        title="Az Összeadási Szabály: VAGY kapcsolat (Egymást kizáró utak)"
        icon={<Plus className="w-5 h-5 text-amber-600 dark:text-amber-400" />}
        badgeColor="amber"
      >
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
            Amikor egy feladatban több <strong>különböző lehetőség</strong> közül választhatunk úgy, hogy ezek a lehetőségek <strong>egyszerre nem valósulhatnak meg</strong> (kölcsönösen kizárják egymást), akkor az egyes lehetőségek számát <strong>összeadjuk</strong>.
          </p>

          <AdditionRuleDiagram />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TheoryCard title="Mikor alkalmazzuk az összeadási szabályt?" variant="amber">
              <div className="space-y-2 text-xs sm:text-sm">
                <p>Keresd a feladatban a <strong>„VAGY”</strong> kapcsolatot és a kizáró eseteket:</p>
                <ul className="list-disc list-inside space-y-1 text-slate-700 dark:text-slate-300">
                  <li>Vagy vonattal megyünk (3 járat) VAGY busszal (4 járat) $\to 3 + 4 = 7$.</li>
                  <li>Vagy 1 gombóc fagylaltot kérünk tölcsérben (8 íz) VAGY 1 jégkrémet a hűtőből (5 fajta) $\to 8 + 5 = 13$.</li>
                  <li>Két külön dobozból választunk 1 db tárgyat.</li>
                </ul>
              </div>
            </TheoryCard>

            <TheoryCard title="Matematikai összefüggés" variant="amber">
              <div className="space-y-2 text-xs sm:text-sm">
                <p>Ha $A$ és $B$ diszjunkt halmazok (nincs közös elemük, $A \cap B = \emptyset$):</p>
                <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/50 font-mono font-bold text-amber-900 dark:text-amber-200 text-center text-sm">
                  |A ∪ B| = |A| + |B|
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">
                  Ha 3 vagy több kizáró lehetőségcsoport van: $|A_1 \cup A_2 \cup \dots \cup A_k| = |A_1| + |A_2| + \dots + |A_k|$.
                </p>
              </div>
            </TheoryCard>
          </div>

          <TheoryCallout variant="tip" title="Gyakorlati jó tanács">
            Mindig kérdezd meg magadtól: <em>„Egyszerre mindkettő megtörténhet, vagy választanom kell az utak között?”</em> Ha választanod kell (vagy-vagy), akkor <strong>összeadás</strong> a megoldás!
          </TheoryCallout>
        </div>
      </TheorySection>

      {/* SECTION 2: A Szorzási Szabály (Független döntések: ÉS kapcsolat) */}
      <TheorySection
        number={2}
        title="A Szorzási Szabály: ÉS kapcsolat (Többlépéses döntési sorozatok)"
        icon={<X className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />}
        badgeColor="indigo"
      >
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
            Ha egy összetett feladatot <strong>egymást követő, független rész-döntések sorozatára</strong> bontunk — ahol az 1. lépést $p$ féleképpen, a 2. lépést $q$ féleképpen, a 3. lépést $r$ féleképpen tehetjük meg —, akkor az összes lehetséges kombinációk száma a lehetőségek <strong>szorzata</strong>.
          </p>

          <MultiplicationRuleDiagram />

          {/* INTERAKTÍV ÖLTÖZKÖDÉS ÉS MENÜ LABOR */}
          <div className="p-4 sm:p-5 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-slate-900 dark:to-slate-850 rounded-2xl border-2 border-indigo-200 dark:border-indigo-900/60 shadow-md">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 font-bold text-indigo-900 dark:text-indigo-200 text-sm sm:text-base">
                <Shirt className="w-5 h-5 text-indigo-600" />
                <span>Interaktív Labor: Szorzási Szabály Szimulátor</span>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full bg-indigo-200 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300 font-mono font-bold">
                {numTops} · {numPants} · {numShoes} = {totalOutfits} szett
              </span>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-400 mb-4">
              Állítsd be a ruhadarabok darabszámát, és figyeld meg, hogyan növekszik a variációk száma szorzással!
            </p>

            {/* Vezérlők */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
              {/* Pólók */}
              <div className="bg-white dark:bg-slate-850 p-3 rounded-xl border border-indigo-200 dark:border-indigo-800">
                <div className="flex justify-between items-center mb-1.5 text-xs font-bold text-indigo-900 dark:text-indigo-200">
                  <span>👕 Pólók száma:</span>
                  <span className="font-mono text-indigo-600 font-black">{numTops} db</span>
                </div>
                <div className="flex gap-1">
                  {[2, 3, 4].map((cnt) => (
                    <button
                      key={cnt}
                      onClick={() => setNumTops(cnt)}
                      className={cn(
                        "flex-1 py-1 text-xs font-bold rounded-lg transition-all",
                        numTops === cnt
                          ? "bg-indigo-600 text-white shadow-xs"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-indigo-50"
                      )}
                    >
                      {cnt} db
                    </button>
                  ))}
                </div>
              </div>

              {/* Nadrágok */}
              <div className="bg-white dark:bg-slate-850 p-3 rounded-xl border border-indigo-200 dark:border-indigo-800">
                <div className="flex justify-between items-center mb-1.5 text-xs font-bold text-indigo-900 dark:text-indigo-200">
                  <span>👖 Nadrágok száma:</span>
                  <span className="font-mono text-indigo-600 font-black">{numPants} db</span>
                </div>
                <div className="flex gap-1">
                  {[1, 2, 3].map((cnt) => (
                    <button
                      key={cnt}
                      onClick={() => setNumPants(cnt)}
                      className={cn(
                        "flex-1 py-1 text-xs font-bold rounded-lg transition-all",
                        numPants === cnt
                          ? "bg-indigo-600 text-white shadow-xs"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-indigo-50"
                      )}
                    >
                      {cnt} db
                    </button>
                  ))}
                </div>
              </div>

              {/* Cipők */}
              <div className="bg-white dark:bg-slate-850 p-3 rounded-xl border border-indigo-200 dark:border-indigo-800">
                <div className="flex justify-between items-center mb-1.5 text-xs font-bold text-indigo-900 dark:text-indigo-200">
                  <span>👟 Cipők száma:</span>
                  <span className="font-mono text-indigo-600 font-black">{numShoes} db</span>
                </div>
                <div className="flex gap-1">
                  {[1, 2, 3].map((cnt) => (
                    <button
                      key={cnt}
                      onClick={() => setNumShoes(cnt)}
                      className={cn(
                        "flex-1 py-1 text-xs font-bold rounded-lg transition-all",
                        numShoes === cnt
                          ? "bg-indigo-600 text-white shadow-xs"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-indigo-50"
                      )}
                    >
                      {cnt} db
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Számítási Eredménykártya */}
            <div className="p-3.5 rounded-xl bg-white dark:bg-slate-850 border-2 border-indigo-300 dark:border-indigo-700 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
              <div>
                <div className="text-xs font-black uppercase text-indigo-600 dark:text-indigo-400 tracking-wider">
                  Kombinatorikai Kiszámítás
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-300">
                  {numTops} póló × {numPants} nadrág × {numShoes} cipő =
                </div>
              </div>
              <div className="px-4 py-2 rounded-xl bg-indigo-600 text-white font-mono font-black text-xl shadow-sm">
                {totalOutfits} különböző öltözék
              </div>
            </div>
          </div>
        </div>
      </TheorySection>

      {/* SECTION 3: Fa-diagram és Esetszétválasztás */}
      <TheorySection
        number={3}
        title="Fa-diagram és Esetszétválasztás (Döntési Fák)"
        icon={<GitBranch className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />}
        badgeColor="emerald"
      >
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
            Amikor a döntési lehetőségek száma nem minden ágon azonos, vagy speciális feltételek (megkötések) vannak, a <strong>fa-diagram (döntési fa)</strong> a legbiztosabb vizuális eszköz. Minden elágazás egy döntést jelent, és a fa levelei adják a végső eseteket.
          </p>

          <DecisionTreeDiagram />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TheoryCard title="Mikor érdemes fa-diagramot rajzolni?" variant="emerald">
              <div className="space-y-2 text-xs sm:text-sm">
                <ul className="list-disc list-inside space-y-1.5 text-slate-700 dark:text-slate-300">
                  <li><strong>Kevés lépéses kísérleteknél</strong>: Pl. 2-3 érmedobás, kockadobás és érmedobás kombinációja.</li>
                  <li><strong>Ha a következő lépés függ az előzőtől</strong>: Pl. ha fejet dobtunk, még egyszer dobunk, ha írást, akkor megállunk.</li>
                  <li><strong>Kieséses bajnokságoknál</strong> és mérkőzéssorozatoknál (pl. ki nyeri meg előbb a 2 mérkőzést).</li>
                </ul>
              </div>
            </TheoryCard>

            <TheoryCard title="A fa-diagram olvasási szabályai" variant="emerald">
              <div className="space-y-2 text-xs sm:text-sm">
                <ul className="list-disc list-inside space-y-1.5 text-slate-700 dark:text-slate-300">
                  <li><strong>Egy útvonal mentén (gyökértől levélig)</strong>: A lehetőségek SZORZÓDNAK (egy konkrét kimenetel).</li>
                  <li><strong>A párhuzamos ágak (levelek) között</strong>: A lehetőségek ÖSSZEADÓDNAK (különböző lehetséges végkimenetelek).</li>
                </ul>
                <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200 font-bold text-center text-xs">
                  Ágak szorzata ⟹ Levelek összege
                </div>
              </div>
            </TheoryCard>
          </div>
        </div>
      </TheorySection>

      {/* SECTION 4: Visszatevéssel vs Visszatevés nélkül */}
      <TheorySection
        number={4}
        title="Visszatevéssel (Ismétléses) és Visszatevés nélkül (Különböző elemek)"
        icon={<KeyRound className="w-5 h-5 text-purple-600 dark:text-purple-400" />}
        badgeColor="purple"
      >
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
            Kombinatorikai feladatoknál a legfontosabb kérdés: <strong>szerepelhet-e egy elem többször is</strong>, vagy minden kiválasztott elemnek különbözőnek kell lennie?
          </p>

          <ReplacementCompareDiagram />

          {/* Összehasonlító táblázat */}
          <TheoryTable
            headers={['Tulajdonság', 'Visszatevéssel (Ismétlés megengedett)', 'Visszatevés nélkül (Különböző elemek)']}
            rows={[
              ['Definíció', 'Az elemek többször is választhatók', 'Minden elemet legfeljebb egyszer használunk fel'],
              ['Lehetőségek száma lépésenként', 'Állandó marad: n · n · n ···', 'Lépésenként 1-gyel csökken: n · (n-1) · (n-2) ···'],
              ['Klasszikus példa', '4-jegyű bankkártya PIN kód: 10⁴ = 10 000', 'Dobogós helyezések futóversenyen: 8 · 7 · 6 = 336'],
              ['Számjegyek 1..5 jegyekből', '3 jegyű szám: 5 · 5 · 5 = 125', '3 jegyű különböző szám: 5 · 4 · 3 = 60']
            ]}
          />

          <TheoryTrapBox title="A 0 számjegy a számok elején!">
            <div className="space-y-1.5 text-xs sm:text-sm">
              <p>
                Többjegyű számok képzésénél a <strong>legelső helyiértékre (bal szélre) nem kerülhet 0</strong>, mert például a <code>035</code> nem 3-jegyű, hanem 2-jegyű szám (35)!
              </p>
              <div className="p-2 rounded-lg bg-rose-100 dark:bg-rose-950/60 font-mono font-bold text-rose-900 dark:text-rose-200 text-center">
                4-jegyű szám a 0, 1, 2, 3 jegyekből (különböző jegyek): 3 · 3 · 2 · 1 = 18 szám
              </div>
            </div>
          </TheoryTrapBox>
        </div>
      </TheorySection>

      {/* SECTION 5: A Szita-formula és a Komplementer módszer */}
      <TheorySection
        number={5}
        title="A Szita-formula és a Komplementer módszer (Összes - Tiltott)"
        icon={<Layers className="w-5 h-5 text-teal-600 dark:text-teal-400" />}
        badgeColor="teal"
      >
        <div className="space-y-4">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
            Gyakran a lehetőségek <strong>nem zárják ki teljesen egymást</strong> (van közös átfedésük), vagy közvetlenül nagyon nehéz lenne összeszámolni a jó eseteket. Ilyenkor két mesterfogást alkalmazunk:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TheoryCard title="1. A Kéthalmazos Szita-formula" variant="teal">
              <div className="space-y-2 text-xs sm:text-sm">
                <p>Ha két csoport között átfedés (metszet) van, az összeadáskor kétszer számoltuk volna a közös elemeket, így egyszer le kell vonni:</p>
                <div className="p-2.5 rounded-xl bg-teal-50 dark:bg-teal-950/50 font-mono font-bold text-teal-900 dark:text-teal-200 text-center text-sm">
                  |A ∪ B| = |A| + |B| - |A ∩ B|
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400">
                  <em>Példa:</em> Egy osztályban 18-an fociznak, 14-en kosaraznak, és 6-an mindkettőt űzik. Legalább az egyiket űzők: $18 + 14 - 6 = 26$ diák.
                </p>
              </div>
            </TheoryCard>

            <TheoryCard title="2. A Komplementer módszer" variant="teal">
              <div className="space-y-2 text-xs sm:text-sm">
                <p>Ha a jó eseteket túl sokféle részletben kellene vizsgálni, számold ki az összes esetet, és vond ki belőle a tiltott (rossz) eseteket:</p>
                <div className="p-2.5 rounded-xl bg-teal-50 dark:bg-teal-950/50 font-mono font-bold text-teal-900 dark:text-teal-200 text-center text-sm">
                  Jó esetek = Összes eset - Tiltott esetek
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400">
                  <em>Példa:</em> 3 érmedobásnál hány esetben kapunk legalább egy fejet? Összes eset (8) - Csupa írás (1) = $8 - 1 = 7$ eset!
                </p>
              </div>
            </TheoryCard>
          </div>

          <TheoryCallout variant="info" title="Összefoglaló aranyszabály">
            <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm">
              <li><strong>VAGY (kizáró esetek)</strong> $\implies$ Összeadás ($A + B$)</li>
              <li><strong>ÉS (független lépések)</strong> $\implies$ Szorzás ($p \cdot q \cdot r$)</li>
              <li><strong>Legalább egy</strong> $\implies$ Komplementer: Összes - Nullaszor előforduló</li>
              <li><strong>Közös átfedés</strong> $\implies$ Szita-elv: Levonjuk a duplán számolt metszetet</li>
            </ul>
          </TheoryCallout>
        </div>
      </TheorySection>
    </TheoryTemplate>
  );
};
