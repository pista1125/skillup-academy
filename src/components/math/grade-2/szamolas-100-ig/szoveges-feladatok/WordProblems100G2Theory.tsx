import React from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox
} from '../TheoryTemplate';
import {
  FiveSteps100Svg,
  PartWhole100Svg,
  CompareMore100Svg,
  InverseCompare100Svg,
  TwoStep100Svg,
  KeyWords100Svg
} from './WordProblems100G2Figures';
import { OperationLab, BarLab } from './WordProblems100G2Parts';

const P: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">{children}</p>
);

const Steps: React.FC<{ items: [string, string][] }> = ({ items }) => (
  <ol className="list-decimal pl-5 space-y-1 text-base text-slate-700 dark:text-slate-300">
    {items.map(([k, v]) => (
      <li key={k}>
        <strong>{k}:</strong> {v}
      </li>
    ))}
  </ol>
);

export const WordProblems100G2Theory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => (
  <TheoryTemplate
    topicId="g2-numbers-to-100"
    subtopicId="szoveges-feladatok"
    grade={2}
    chapterId="szamolas-100-ig"
    title="5. Szöveges feladatok"
    subtitle="Összesen, maradt, mennyi kell még, ennyivel több vagy kevesebb – 100-ig, szalagos ábrával."
    badge="2. OSZTÁLY • III. SZÁMKÖRBŐVÍTÉS ÉS SZÁMOLÁS 100-IG • TANANYAG"
    themeColor="rose"
    pdfFilename="2_osztaly_szoveges_feladatok_100_ig_tananyag.pdf"
    practiceTitle="Készen állsz? Gyakoroljunk!"
    practiceSubtitle="Próbáld ki magad a 3 szintes kvízben és a játékokban!"
    onBack={onBack}
    onStartQuiz={onStartQuiz}
    quickRule={{
      label: 'FONTOS — AZ 5 LÉPÉS',
      align: 'left',
      formula: (
        <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
          <div className="p-2.5 rounded-xl bg-rose-50/90 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800/80 text-center text-base font-black text-rose-900 dark:text-rose-200">
            Adatok → Terv → Számolás → Ellenőrzés → Válasz
          </div>
          <ul className="list-disc pl-4 space-y-1 text-sm">
            <li>Rajzolj <strong>szalagot</strong>! Látod, mi az egész és mi a rész.</li>
            <li>Kinek van <strong>több</strong>? Az ő szalagja hosszabb.</li>
            <li>A válasz <strong>egész mondat</strong>, mértékegységgel.</li>
          </ul>
        </div>
      )
    }}
  >
    <TheorySection title="1. Mit tanulunk?" badge="Az 5 lépés" badgeColor="rose">
      <div className="space-y-2">
        <P>A szöveges feladat egy rövid történet, a végén kérdéssel.</P>
        <P>Most már <strong>100-ig</strong> számolunk benne.</P>
        <P>Mindig ugyanaz az 5 lépés segít.</P>
      </div>
      <FiveSteps100Svg />
    </TheorySection>

    <TheorySection title="2. Összesen vagy maradt?" badge="Rész és egész" badgeColor="sky">
      <PartWhole100Svg />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TheoryCard title="Összesen? (+)" badge="23 + 14" badgeColor="blue">
          <P>Hanna 23 piros és 14 kék gyöngyöt fűzött fel. Hány gyöngy ez összesen?</P>
          <Steps
            items={[
              ['Adatok', '23 piros, 14 kék.'],
              ['Terv', '23 + 14 = □'],
              ['Számolás', '23 + 10 = 33, 33 + 4 = 37.'],
              ['Ellenőrzés', '37 − 14 = 23. Jó!'],
              ['Válasz', 'Összesen 37 gyöngy.']
            ]}
          />
        </TheoryCard>
        <TheoryCard title="Maradt? (−)" badge="48 − 15" badgeColor="rose">
          <P>A kosárban 48 alma volt. 15-öt megettek. Hány maradt?</P>
          <Steps
            items={[
              ['Adatok', 'volt 48, megettek 15-öt.'],
              ['Terv', '48 − 15 = □'],
              ['Számolás', '48 − 10 = 38, 38 − 5 = 33.'],
              ['Ellenőrzés', '33 + 15 = 48. Jó!'],
              ['Válasz', '33 alma maradt.']
            ]}
          />
        </TheoryCard>
      </div>
    </TheorySection>

    <TheorySection title="3. Mennyi kell még? Mennyivel több?" badge="Különbség" badgeColor="purple">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TheoryCard title="Mennyi kell még?" badge="50 − 30" badgeColor="purple">
          <P>Az albumba 50 matrica fér. 30 már benne van. Hány hiányzik?</P>
          <P>
            30 + □ = 50, tehát □ = 50 − 30 = <strong>20</strong>.
          </P>
        </TheoryCard>
        <TheoryCard title="Mennyivel több?" badge="63 − 40" badgeColor="emerald">
          <P>Hanna 63 pontot gyűjtött, Ábel 40-et. Mennyivel több Hannáé?</P>
          <P>
            A nagyobbikból kivonjuk a kisebbet: 63 − 40 = <strong>23</strong>.
          </P>
        </TheoryCard>
      </div>
      <KeyWords100Svg />
    </TheorySection>

    <TheorySection title="4. Ennyivel több, ennyivel kevesebb" badge="Összehasonlítás" badgeColor="blue">
      <CompareMore100Svg />
      <P>
        Kristóf 26 kavicsot talált. Emma 10-zel többet. Emma szalagja hosszabb: 26 + 10 = <strong>36</strong>.
      </P>
      <TheoryCallout type="info" title="Kevesebb → rövidebb szalag">
        A piros toll 45 Ft. A kék 20 Ft-tal olcsóbb. 45 − 20 = <strong>25 Ft</strong>.
      </TheoryCallout>
    </TheorySection>

    <TheorySection title="5. Két lépés" badge="Előbb az egyik, aztán a másik" badgeColor="orange">
      <TwoStep100Svg />
      <P>A buszon 42-en ültek. 17-en leszálltak, aztán 9-en felszálltak. Hányan ülnek most?</P>
      <P>
        1. lépés: 42 − 17 = 25. 2. lépés: 25 + 9 = <strong>34</strong>. Válasz: Most 34-en ülnek a buszon.
      </P>
    </TheorySection>

    <TheorySection title="6. Vigyázz!" badge="Csapda" badgeColor="rose">
      <InverseCompare100Svg />
      <TheoryTrapBox
        title="„Ez 12-vel több, mint Emmáé” — kinek van több?"
        wrong="47 + 12 = 59"
        wrongExplanation="A „több” szóra sokan összeadnak. De itt Kristófnak van több, Emmának kevesebb!"
        correct="47 − 12 = 35"
        correctExplanation="Emma a rövidebb szalag. Ellenőrzés: 35 + 12 = 47. Jó!"
        tip="Ne csak a szót nézd! Kérdezd meg: kinek van több? Rajzold le!"
      />
      <TheoryCallout type="warning" title="A válasz egész mondat!">
        Ne csak számot írj! Mondd ki: „<strong>35 kártyája van Emmának.</strong>”
      </TheoryCallout>
    </TheorySection>

    <TheorySection title="7. Labor I: Melyik művelet kell?" badge="Interaktív labor" badgeColor="rose">
      <P>Olvasd el a történetet! Válaszd ki a műveletet, aztán az eredményt!</P>
      <OperationLab />
    </TheorySection>

    <TheorySection title="8. Labor II: Szalagos ábra" badge="Interaktív labor" badgeColor="sky">
      <P>Állítsd be a második szalagot a gombokkal! Több → hosszabb, kevesebb → rövidebb.</P>
      <BarLab />
    </TheorySection>
  </TheoryTemplate>
);

export default WordProblems100G2Theory;
