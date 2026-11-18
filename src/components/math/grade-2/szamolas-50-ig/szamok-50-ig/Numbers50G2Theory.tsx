import React from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable
} from '../TheoryTemplate';
import {
  PlaceValueBlocksSvg,
  NeighboursSvg,
  NumberLine2050Svg,
  CompareBlocksSvg,
  EvenOddPairsSvg,
  CoinsAndEggsSvg
} from './Numbers50G2Figures';
import { BlocksBuilderLab, NumberLineLab } from './Numbers50G2Parts';

export const Numbers50G2Theory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => (
  <TheoryTemplate
    topicId="g2-numbers-to-50"
    subtopicId="szamok-50-ig"
    grade={2}
    chapterId="szamolas-50-ig"
    title="1. Számok 50-ig"
    subtitle="Tízesek és egyesek, számszomszédok, számegyenes, összehasonlítás, páros és páratlan számok 50-ig."
    badge="2. OSZTÁLY • II. SZÁMKÖRBŐVÍTÉS ÉS SZÁMOLÁS 50-IG • TANANYAG"
    themeColor="blue"
    pdfFilename="2_osztaly_szamok_50_ig_tananyag.pdf"
    practiceTitle="Készen állsz? Gyakoroljunk!"
    practiceSubtitle="Próbáld ki magad a 3 szintes kvízben és a játékokban!"
    onBack={onBack}
    onStartQuiz={onStartQuiz}
    quickRule={{
      label: 'FONTOS — TÍZESEK ÉS EGYESEK',
      align: 'left',
      formula: (
        <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
          <div className="p-2.5 rounded-xl bg-blue-50/90 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800/80 text-center font-mono text-sm sm:text-base font-black text-blue-900 dark:text-blue-200">
            34 = 3 tízes + 4 egyes = 30 + 4
          </div>
          <ul className="list-disc pl-4 space-y-1 text-xs">
            <li><strong>Egyes szomszédok:</strong> 33 &lt; 34 &lt; 35</li>
            <li><strong>Tízes szomszédok:</strong> 30 &lt; 34 &lt; 40</li>
            <li><strong>Páros</strong>, ha a végén 0, 2, 4, 6 vagy 8 áll.</li>
          </ul>
        </div>
      )
    }}
  >
    <TheorySection title="1. Mit tanulunk?" badge="20-tól 50-ig" badgeColor="blue">
      <div className="space-y-2 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
        <p>20-ig már jól számolsz. Most tovább megyünk, egészen <strong>50-ig</strong>!</p>
        <p>Minden szám tízesekből és egyesekből áll. Ha ezt tudod, minden számot ki tudsz rakni.</p>
      </div>
    </TheorySection>

    <TheorySection title="2. Tízesek és egyesek" badge="Helyiérték" badgeColor="purple">
      <PlaceValueBlocksSvg />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TheoryCard title="1 rúd = 1 tízes = 10" badge="10 kocka = 1 rúd" badgeColor="purple">
          <p className="text-sm text-slate-700 dark:text-slate-300">
            Egy rúdban 10 kocka van. Ha 10 kockád van, cseréld be <strong>1 rúdra</strong>!
          </p>
        </TheoryCard>
        <TheoryCard title="Előbb a tízes, aztán az egyes" badge="T | E" badgeColor="emerald">
          <p className="text-sm text-slate-700 dark:text-slate-300">
            A 34-ben a <strong>3</strong> a tízes, a <strong>4</strong> az egyes. 34 = 30 + 4.
          </p>
        </TheoryCard>
      </div>
      <TheoryTable
        headers={['Szám', 'Tízes', 'Egyes', 'Így is írhatod', 'Betűvel']}
        rows={[
          ['23', '2', '3', '20 + 3', 'huszonhárom'],
          ['30', '3', '0', '30 + 0', 'harminc'],
          ['38', '3', '8', '30 + 8', 'harmincnyolc'],
          ['41', '4', '1', '40 + 1', 'negyvenegy'],
          ['50', '5', '0', '50 + 0', 'ötven']
        ]}
      />
    </TheorySection>

    <TheorySection title="3. Tízesek a hétköznapokban" badge="Pénz, tojás" badgeColor="amber">
      <CoinsAndEggsSvg />
      <TheoryCallout type="info" title="Számolj tízesekkel!">
        A 10 Ft-os egy tízes. A 20 Ft-os két tízes. Egy teli tojástartóban 10 tojás van.
      </TheoryCallout>
    </TheorySection>

    <TheorySection title="4. Számegyenes 20-tól 50-ig" badge="Sorrend" badgeColor="sky">
      <NumberLine2050Svg />
      <p className="text-sm text-slate-700 dark:text-slate-300">
        A hosszú vonalaknál kerek tízesek vannak: 20, 30, 40, 50. Közöttük 1-esével lépkedünk.
      </p>
    </TheorySection>

    <TheorySection title="5. Számszomszédok" badge="Egyes, páros, tízes" badgeColor="teal">
      <NeighboursSvg />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <TheoryCard title="Egyes szomszédok" badge="36 < 37 < 38" badgeColor="sky">
          <p className="text-sm text-slate-700 dark:text-slate-300">1-gyel kisebb és 1-gyel nagyobb szám.</p>
        </TheoryCard>
        <TheoryCard title="Páros szomszédok" badge="22 < 24 < 26" badgeColor="emerald">
          <p className="text-sm text-slate-700 dark:text-slate-300">
            A legközelebbi páros számok. A 24-é: <strong>22 &lt; 24 &lt; 26</strong>.
          </p>
        </TheoryCard>
        <TheoryCard title="Tízes szomszédok" badge="30 < 37 < 40" badgeColor="purple">
          <p className="text-sm text-slate-700 dark:text-slate-300">A két legközelebbi kerek tízes.</p>
        </TheoryCard>
      </div>
    </TheorySection>

    <TheorySection title="6. Melyik a nagyobb?" badge="Összehasonlítás" badgeColor="orange">
      <CompareBlocksSvg />
      <TheoryTable
        headers={['Lépés', 'Példa', 'Eredmény']}
        rows={[
          ['1. Nézd a tízeseket!', '29 és 31: 2 tízes < 3 tízes', '29 < 31'],
          ['2. Ha a tízes egyforma, nézd az egyeseket!', '46 és 43: 6 > 3', '46 > 43'],
          ['3. Ha minden egyforma', '35 és 35', '35 = 35']
        ]}
      />
    </TheorySection>

    <TheorySection title="7. Páros és páratlan" badge="Párba állítás" badgeColor="emerald">
      <EvenOddPairsSvg />
      <p className="text-sm text-slate-700 dark:text-slate-300">
        Elég az <strong>utolsó számjegyet</strong> nézni! 48 páros, mert 8 a vége. 45 páratlan, mert 5 a vége.
      </p>
    </TheorySection>

    <TheorySection title="8. Nézzük meg együtt!" badge="Mintapéldák" badgeColor="sky">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <TheoryCard title="A) Rakd ki a 27-et!" badge="2 rúd + 7 kocka" badgeColor="purple">
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
            <li>A 2 a tízes: tegyél le <strong>2 rudat</strong>.</li>
            <li>A 7 az egyes: tegyél le <strong>7 kockát</strong>.</li>
            <li>20 + 7 = <strong>27</strong>.</li>
          </ul>
        </TheoryCard>
        <TheoryCard title="B) Szomszédok: 43" badge="egyes és tízes" badgeColor="teal">
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
            <li>1-gyel kisebb: 42. 1-gyel nagyobb: 44.</li>
            <li><strong>42 &lt; 43 &lt; 44</strong></li>
            <li>Kerek tízesek: <strong>40 &lt; 43 &lt; 50</strong></li>
          </ul>
        </TheoryCard>
        <TheoryCard title="C) Rakd sorba!" badge="32, 23, 41" badgeColor="orange">
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
            <li>Tízesek: 3, 2, 4.</li>
            <li>A legkisebb a 23, a legnagyobb a 41.</li>
            <li><strong>23 &lt; 32 &lt; 41</strong></li>
          </ul>
        </TheoryCard>
      </div>
    </TheorySection>

    <TheorySection title="9. Vigyázz!" badge="Csapda" badgeColor="rose">
      <TheoryTrapBox
        title="Ne cseréld fel a tízest és az egyest!"
        wrong="3 tízes + 4 egyes = 43"
        wrongExplanation="A 43-ban 4 tízes van, nem 3."
        correct="3 tízes + 4 egyes = 34"
        correctExplanation="A tízes kerül előre: 30 + 4 = 34."
        tip="Akkor is figyelj, ha fordítva mondják: 4 egyes + 3 tízes is 34!"
      />
      <TheoryCallout type="warning" title="10 kocka már 1 rúd!">
        2 rúd és 12 kocka nem „212”! A 12 kockából 10 kocka = 1 rúd. Így 3 rúd és 2 kocka: <strong>32</strong>.
      </TheoryCallout>
    </TheorySection>

    <TheorySection title="10. Labor I: Rakd ki rudakkal és kockákkal!" badge="Interaktív labor" badgeColor="purple">
      <BlocksBuilderLab />
    </TheorySection>

    <TheorySection title="11. Labor II: Számegyenes-nyomozó" badge="Interaktív labor" badgeColor="sky">
      <NumberLineLab />
    </TheorySection>
  </TheoryTemplate>
);

export default Numbers50G2Theory;
