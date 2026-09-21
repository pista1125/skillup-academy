import React from 'react';
import {
  TheoryTemplate,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable,
  TheorySectionData
} from '../TheoryTemplate';
import {
  SymmetryAxesOverviewDiagram,
  LetterSymmetryDiagram,
  InteractiveSymmetryExplorer
} from './AxialSymmetryDiagrams';
import { MathText } from '@/components/math/shared/MathText';
import {
  Sparkles,
  Layers,
  Compass,
  CheckCircle2,
  AlertTriangle,
  Target,
  RotateCcw,
  ShieldCheck,
  Lightbulb,
  Split,
  Eye,
  Type,
  Leaf
} from 'lucide-react';

export interface AxialSymmetryTheoryProps {
  onBack?: () => void;
  onStartQuiz?: () => void;
}

export function AxialSymmetryTheory({ onBack, onStartQuiz }: AxialSymmetryTheoryProps) {
  const sections: TheorySectionData[] = [
    // =========================================================================
    // 1. FEJEZET: A TENGELYES SZIMMETRIA FOGALMA
    // =========================================================================
    {
      id: 'definition',
      title: '1. A tengelyes szimmetria fogalma és lényege',
      icon: <Compass className="w-5 h-5 text-violet-500" />,
      content: (
        <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          <p>
            A geometriában és a mindennapi életben rengeteg olyan formával találkozunk, amelyek kiegyensúlyozottak, harmonikusak. Ha egy alakzatot egy egyenes mentén félbe tudunk hajtani úgy, hogy a két fele fedésbe kerüljön, akkor azt <strong>tengelyesen szimmetrikus alakzatnak</strong> nevezzük.
          </p>

          <TheoryCallout
            title="A tengelyesen szimmetrikus alakzat matematikai definíciója"
            variant="violet"
          >
            <div className="space-y-2">
              <p>
                Egy síkbeli alakzatot <strong>tengelyesen szimmetrikusnak</strong> nevezünk, ha létezik a síkban olyan <MathText>t</MathText> egyenes, amelyre tükrözve az alakzatot, az <strong>önmagába megy át</strong>:
              </p>
              <div className="p-2.5 rounded-xl bg-violet-100/70 dark:bg-violet-950/50 text-center font-black text-base text-violet-900 dark:text-violet-200">
                <MathText>{"R_t(F) = F"}</MathText>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                A <MathText>t</MathText> egyenest az alakzat <strong>szimmetriatengelyének</strong> (tükörtengelyének) nevezzük.
              </p>
            </div>
          </TheoryCallout>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-3">
            <TheoryCard title="Szimmetriatengely tulajdonságai" variant="indigo">
              <ul className="text-xs space-y-1.5 list-disc list-inside text-slate-600 dark:text-slate-300">
                <li>A szimmetriatengelyen fekvő alakzat-pontok saját maguk tükörképei (fixpontok).</li>
                <li>A tengelyre nem illeszkedő pontokhoz tartozik egy azonos távolságra lévő tükörkép pont az alakzat másik felén.</li>
                <li>A szimmetriatengely felezi és merőlegesen metszi az egymásnak megfelelő pontpárokat összekötő szakaszokat.</li>
              </ul>
            </TheoryCard>

            <TheoryCard title="Tükrözés vs. Szimmetria" variant="emerald">
              <p className="text-xs text-slate-600 dark:text-slate-300">
                <strong>Tengelyes tükrözés:</strong> geometriai transzformáció (művelet), amely bármely alakzatot átvisz a tükörképébe.<br />
                <strong>Tengelyes szimmetria:</strong> egy alakzat belső tulajdonsága, mely szerint a tükrözés után a kapott kép pontosan megegyezik az eredetivel.
              </p>
            </TheoryCard>
          </div>
        </div>
      )
    },

    // =========================================================================
    // 2. FEJEZET: NEVEZETES SÍKIDOMOK SZIMMETRIATENGELYEI
    // =========================================================================
    {
      id: 'shapes',
      title: '2. Nevezetes síkidomok szimmetriatengelyei',
      icon: <Layers className="w-5 h-5 text-indigo-500" />,
      content: (
        <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          <p>
            A különböző sokszögek és görbék különböző számú szimmetriatengellyel rendelkeznek. Lássuk a leggyakrabban előforduló síkidomokat!
          </p>

          <SymmetryAxesOverviewDiagram />

          <TheoryTable
            headers={['Síkidom neve', 'Szimmetriatengelyek száma', 'Tengelyek elhelyezkedése / Jellemzése']}
            rows={[
              ['Általános háromszög', '0', 'Nincs szimmetriatengelye (aszimmetrikus)'],
              ['Egyenlő szárú háromszög', '1', 'Az alaphoz tartozó oldalfelező merőleges (magasságvonal)'],
              ['Szabályos háromszög', '3', 'A 3 oldalfelező merőleges (amelyek egyben szögfelezők is)'],
              ['Téglalap', '2', 'A szemközti oldalak felezőmerőlegesei (az átlók NEM tengelyek!)'],
              ['Rombusz', '2', 'A két átló egyenese (merőlegesen felezik egymást)'],
              ['Deltoid', '1', 'A szimmetriaátlója (amely a csúcsszögeket felezi)'],
              ['Egyenlő szárú trapéz (húrtrapéz)', '1', 'A párhuzamos alapok közös felezőmerőlegese'],
              ['Négyzet', '4', '2 oldalfelező merőleges + 2 átló'],
              ['Szabályos n-szög', 'n', 'Páros csúcsszám esetén n/2 oldalfelező + n/2 átló; páratlannál n db csúcs-szemközti oldalfelező'],
              ['Kör', 'Végtelen sok (∞)', 'Bármely átmérő egyenese szimmetriatengely']
            ]}
          />

          <TheoryTrapBox title="Gyakori buktatók: Téglalap és Paralelogramma!">
            <div className="space-y-2 text-xs">
              <p>
                ⚠️ <strong>A téglalap átlói NEM szimmetriatengelyek!</strong> Ha egy nem négyzet téglalapot az átlója mentén hajtunk félbe, a csúcsok nem esnek egymásra. A téglalapnak csak 2 tengelye van: az oldalfelező merőlegesek.
              </p>
              <p>
                ⚠️ <strong>Az általános paralelogrammának 0 szimmetriatengelye van!</strong> Bár van középpontos szimmetriája, tengelyesen nem szimmetrikus, hacsak nem téglalap vagy rombusz.
              </p>
            </div>
          </TheoryTrapBox>

          <InteractiveSymmetryExplorer />
        </div>
      )
    },

    // =========================================================================
    // 3. FEJEZET: BETŰK ÉS SZIMBÓLUMOK SZIMMETRIÁJA
    // =========================================================================
    {
      id: 'letters',
      title: '3. Betűk, számjegyek és szimbólumok szimmetriája',
      icon: <Type className="w-5 h-5 text-emerald-500" />,
      content: (
        <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          <p>
            A magyar ábécé nyomtatott nagybetűi és a számjegyek kiváló példákat nyújtanak a tengelyes szimmetria vizsgálatára:
          </p>

          <LetterSymmetryDiagram />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 my-3">
            <TheoryCard title="Függőleges tengely" variant="sky">
              <div className="text-xs space-y-1">
                <div className="font-mono text-base font-black text-sky-700 dark:text-sky-300">A, M, T, U, V, W, Y</div>
                <p className="text-slate-600 dark:text-slate-400">Bal és jobb oldaluk tökéletes tükörképe egymásnak.</p>
              </div>
            </TheoryCard>

            <TheoryCard title="Vízszintes tengely" variant="emerald">
              <div className="text-xs space-y-1">
                <div className="font-mono text-base font-black text-emerald-700 dark:text-emerald-300">B, C, D, E, K</div>
                <p className="text-slate-600 dark:text-slate-400">Felső és alsó felük tükrös a vízszintes vonalra nézve.</p>
              </div>
            </TheoryCard>

            <TheoryCard title="Két tengely (Mindkettő)" variant="purple">
              <div className="text-xs space-y-1">
                <div className="font-mono text-base font-black text-purple-700 dark:text-purple-300">H, I, O, X</div>
                <p className="text-slate-600 dark:text-slate-400">Függőlegesen és vízszintesen is félbehajthatók.</p>
              </div>
            </TheoryCard>

            <TheoryCard title="Nem szimmetrikus" variant="rose">
              <div className="text-xs space-y-1">
                <div className="font-mono text-base font-black text-rose-700 dark:text-rose-300">F, G, J, L, P, Q, R</div>
                <p className="text-slate-600 dark:text-slate-400">Egyik tengelyre nézve sem tükrözhetők önmagukba.</p>
              </div>
            </TheoryCard>
          </div>

          <TheoryCallout title="A félrevezető S és Z betűk" variant="amber">
            <p className="text-xs">
              Az <strong>S</strong> és <strong>Z</strong> betűk nem rendelkeznek szimmetriatengellyel! Bár 180°-os elforgatással (középpontos tükrözéssel) önmagukba vihetők, ha félbehajtod őket, a szárak ellentétes oldalra fognak lógni.
            </p>
          </TheoryCallout>
        </div>
      )
    },

    // =========================================================================
    // 4. FEJEZET: SZIMMETRIA A TERMÉSZETBEN ÉS AZ ÉPÍTÉSZETBEN
    // =========================================================================
    {
      id: 'nature',
      title: '4. Szimmetria a természetben és az ember alkotta világban',
      icon: <Leaf className="w-5 h-5 text-teal-500" />,
      content: (
        <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          <p>
            A tengelyes szimmetria nem csupán elméleti matematika: a természet és a mérnöki tudomány alapvető építőköve.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 my-3">
            <TheoryCard title="Élővilág (Kétoldali szimmetria)" variant="rose">
              <p className="text-xs text-slate-600 dark:text-slate-300">
                A legtöbb mozgó állat (rovarok, madarak, emlősök) és az emberi test is <strong>kétoldali (bilaterális) szimmetriát</strong> mutat. A szimmetrikus testfelépítés elengedhetetlen az egyenes vonalú mozgáshoz, repüléshez és egyensúlyozáshoz.
              </p>
            </TheoryCard>

            <TheoryCard title="Kristályok és Hópelyhek" variant="cyan">
              <p className="text-xs text-slate-600 dark:text-slate-300">
                A vízmolekulák kötési szögei miatt a hópehely kristályok <strong>6 szimmetriatengellyel</strong> (hexagonális szerkezet) rendelkeznek. Minden egyes hópehely egyedi, mégis tökéletesen hatszögesen szimmetrikus.
              </p>
            </TheoryCard>

            <TheoryCard title="Építészet és Dizájn" variant="violet">
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Az ókori templomok, hidak, a Parlament vagy az Eiffel-torony mind szimmetrikus homlokzattal épültek. A szimmetria nemcsak esztétikus, de a terhek egyenletes eloszlásával <strong>statikai stabilitást</strong> is biztosít.
              </p>
            </TheoryCard>
          </div>

          <TheoryCallout title="Összefoglaló aranyszabályok" variant="emerald">
            <ul className="text-xs space-y-1 list-disc list-inside">
              <li>Egy alakzat akkor tengelyesen szimmetrikus, ha van olyan tengely, amelyre vett tükörképe az eredeti alakzat.</li>
              <li>A szabályos <MathText>n</MathText>-szögeknek mindig pontosan <MathText>n</MathText> szimmetriatengelyük van.</li>
              <li>A körnek végtelen sok szimmetriatengelye van (az átmérői).</li>
              <li>A szimmetriatengely az alakzatot két egybevágó részre osztja, de két egybevágó fél nem feltétlenül jelent tengelyes szimmetriát!</li>
            </ul>
          </TheoryCallout>
        </div>
      )
    }
  ];

  return (
    <TheoryTemplate
      grade={6}
      chapterId="g6-geometry"
      title="Tengelyes szimmetria"
      subtitle="Definíció, szimmetriatengelyek száma, betűk, szimbólumok és a természet szimmetriái"
      badge="📐 6. Osztály • III. Geometria • 8. Fejezet"
      topicId="g6-axial-symmetry-theory"
      themeColor="violet"
      pdfFilename="tengelyes-szimmetria-6-osztaly.pdf"
      quickRule={{
        label: 'Szimmetria alaptétele',
        formula: 'R_t(F) = F (az alakzat önmagába megy át)'
      }}
      sections={sections}
      onBack={onBack}
      onStartQuiz={onStartQuiz}
    />
  );
}
