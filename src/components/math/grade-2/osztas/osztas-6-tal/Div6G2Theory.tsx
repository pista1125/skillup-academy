import React from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable
} from '../TheoryTemplate';
import { PackSixSvg, ShareSixSvg, MultDivPairSvg, SixthSvg, StepDivSvg, RemainderSixSvg } from './Div6G2Figures';
import { PackLab6, ShareLab6 } from './Div6G2Parts';

const P: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300">{children}</p>
);

export const Div6G2Theory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => (
  <TheoryTemplate
    topicId="g2-division"
    subtopicId="osztas-6-tal"
    grade={2}
    chapterId="osztas"
    title="5. Osztás 6-tal"
    subtitle="Dobozolás hatosával és szétosztás 6 egyenlő részre. Megtanuljuk a hatodát és a maradékos osztást 6-tal."
    badge="2. OSZTÁLY • V. OSZTÁS • TANANYAG"
    themeColor="rose"
    pdfFilename="2_osztaly_osztas_6_tal_tananyag.pdf"
    practiceTitle="Készen állsz? Gyakoroljunk!"
    practiceSubtitle="Próbáld ki magad a 3 szintes kvízben és a játékokban!"
    onBack={onBack}
    onStartQuiz={onStartQuiz}
    quickRule={{
      label: 'FONTOS — OSZTÁS 6-TAL',
      align: 'left',
      formula: (
        <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
          <div className="p-2.5 rounded-xl bg-rose-50/90 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800/80 text-center font-mono text-base sm:text-lg font-black text-rose-900 dark:text-rose-200">
            24 : 6 = 4, mert 4 · 6 = 24
          </div>
          <ul className="list-disc pl-4 space-y-1 text-xs sm:text-sm">
            <li>Olvasd így: <strong>24 osztva 6-tal egyenlő 4</strong>.</li>
            <li>A 24 <strong>hatoda</strong> 4.</li>
            <li>6-os dobozolásnál legfeljebb <strong>5</strong> maradhat.</li>
          </ul>
        </div>
      )
    }}
  >
    <TheorySection title="1. Mit tanulunk?" badge="Osztás 6-tal" badgeColor="rose">
      <div className="space-y-2">
        <P>Ma <strong>6-tal</strong> osztunk.</P>
        <P>Dobozolunk hatosával, és szétosztunk 6 tányérra.</P>
        <P>A 6-os szorzótábla segít. A végén megnézzük, mi marad.</P>
      </div>
    </TheorySection>

    <TheorySection title="2. Dobozolás hatosával (bennfoglalás)" badge="Hány doboz?" badgeColor="amber">
      <PackSixSvg />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TheoryCard title="Hányszor van meg?" badge="6 + 6 + 6" badgeColor="amber">
          <P>Minden dobozba 6 tojás kerül.</P>
          <P>3 doboz lesz, mert <strong>6 + 6 + 6 = 18</strong>.</P>
        </TheoryCard>
        <TheoryCard title="Így írjuk" badge="18 : 6 = 3" badgeColor="rose">
          <P>A 18-ban a 6 megvan <strong>3-szor</strong>.</P>
          <P>Olvasd: 18 osztva 6-tal egyenlő 3.</P>
        </TheoryCard>
      </div>
    </TheorySection>

    <TheorySection title="3. Szétosztás 6 egyenlő részre" badge="Mennyi jut egynek?" badgeColor="sky">
      <ShareSixSvg />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TheoryCard title="Igazságosan osztunk" badge="1-1, 1-1 …" badgeColor="sky">
          <P>Minden tányérra 1-1 sütit teszel, amíg el nem fogy.</P>
          <P>Minden tányérra <strong>2</strong> süti jut.</P>
        </TheoryCard>
        <TheoryCard title="A hatoda" badge="12 : 6 = 2" badgeColor="blue">
          <P>Ha 6 egyenlő részre osztunk, megkapjuk a szám <strong>hatodát</strong>.</P>
          <P>A 12 hatoda <strong>2</strong>.</P>
        </TheoryCard>
      </div>
    </TheorySection>

    <TheorySection title="4. Osztás és szorzás párban" badge="Ellenőrzés" badgeColor="purple">
      <MultDivPairSvg />
      <TheoryTable
        headers={['Szorzás', 'Osztás', 'Szorzás', 'Osztás']}
        rows={[
          ['1 · 6 = 6', '6 : 6 = 1', '6 · 6 = 36', '36 : 6 = 6'],
          ['2 · 6 = 12', '12 : 6 = 2', '7 · 6 = 42', '42 : 6 = 7'],
          ['3 · 6 = 18', '18 : 6 = 3', '8 · 6 = 48', '48 : 6 = 8'],
          ['4 · 6 = 24', '24 : 6 = 4', '9 · 6 = 54', '54 : 6 = 9'],
          ['5 · 6 = 30', '30 : 6 = 5', '10 · 6 = 60', '60 : 6 = 10']
        ]}
      />
      <TheoryCallout type="tip" title="Ellenőrizz szorzással!">
        <strong>42 : 6 = 7</strong>, mert <strong>7 · 6 = 42</strong>. Ha a szorzás jó, az osztás is jó.
      </TheoryCallout>
      <SixthSvg />
      <TheoryCallout type="info" title="Hatoda és hatszorosa">
        A 30 <strong>hatoda</strong> 5. Az 5 <strong>hatszorosa</strong> 30. Ez egy pár!
      </TheoryCallout>
    </TheorySection>

    <TheorySection title="5. Lépésenként: előbb 3-mal, aztán 2-vel" badge="Kapcsolat" badgeColor="emerald">
      <StepDivSvg />
      <P>
        6-tal osztani ugyanaz, mint előbb 3-mal, aztán 2-vel osztani. Például: <strong>24 : 3 = 8</strong>, és{' '}
        <strong>8 : 2 = 4</strong>. Tehát <strong>24 : 6 = 4</strong>.
      </P>
    </TheorySection>

    <TheorySection title="6. Maradékos osztás 6-tal" badge="Maradék" badgeColor="rose">
      <RemainderSixSvg />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TheoryCard title="Mi marad kint?" badge="23 tojás" badgeColor="rose">
          <P>3 doboz megtelik: 3 · 6 = 18.</P>
          <P>23 − 18 = <strong>5</strong> tojás marad kint. Ez a <strong>maradék</strong>.</P>
        </TheoryCard>
        <TheoryCard title="Így írjuk le" badge="23 = 3 · 6 + 5" badgeColor="amber">
          <P>3 doboz lett, és maradt 5.</P>
          <P>Ellenőrzés: <strong>3 · 6 + 5 = 23</strong>.</P>
        </TheoryCard>
      </div>
      <TheoryTable
        headers={['Tojás', 'Doboz', 'Maradt', 'Ellenőrzés']}
        rows={[
          ['24', '4', '0', '4 · 6 = 24'],
          ['25', '4', '1', '4 · 6 + 1 = 25'],
          ['27', '4', '3', '4 · 6 + 3 = 27'],
          ['29', '4', '5', '4 · 6 + 5 = 29'],
          ['30', '5', '0', '5 · 6 = 30']
        ]}
      />
    </TheorySection>

    <TheorySection title="7. Nézzük meg együtt!" badge="Mintapéldák" badgeColor="orange">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <TheoryCard title="A) Tojásdobozok" badge="42 : 6" badgeColor="amber">
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
            <li>42 tojás van. Egy dobozba 6 fér.</li>
            <li>7 · 6 = 42.</li>
            <li>Tehát <strong>7</strong> doboz kell.</li>
          </ul>
        </TheoryCard>
        <TheoryCard title="B) Hat barát" badge="30 : 6" badgeColor="sky">
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
            <li>30 szem szőlő, 6 barát, egyenlően.</li>
            <li>5 · 6 = 30.</li>
            <li>Egy barát <strong>5</strong> szemet kap.</li>
          </ul>
        </TheoryCard>
        <TheoryCard title="C) Maradék" badge="40 virág" badgeColor="rose">
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
            <li>40 szál virág, csokronként 6.</li>
            <li>6 · 6 = 36, a 7 · 6 = 42 már sok.</li>
            <li><strong>6</strong> csokor lesz, 40 − 36 = <strong>4</strong> szál marad.</li>
          </ul>
        </TheoryCard>
      </div>
    </TheorySection>

    <TheorySection title="8. Vigyázz!" badge="Csapda" badgeColor="rose">
      <TheoryTrapBox
        title="Az osztás nem kivonás!"
        wrong="24 : 6 = 18"
        wrongExplanation="Ez a 24 − 6 lenne! Osztásnál azt keressük, hányszor van meg a 6 a 24-ben."
        correct="24 : 6 = 4"
        correctExplanation="Ellenőrizd szorzással: 4 · 6 = 24. Jó!"
        tip="Mindig ellenőrizz szorzással!"
      />
      <TheoryCallout type="warning" title="A maradék kisebb, mint 6">
        A maradék csak 0, 1, 2, 3, 4 vagy 5 lehet. Ha 6 maradna, abból még egy doboz lenne!
      </TheoryCallout>
    </TheorySection>

    <TheorySection title="9. Labor I: Dobozolj hatosával!" badge="Interaktív labor" badgeColor="amber">
      <PackLab6 />
    </TheorySection>

    <TheorySection title="10. Labor II: Szétosztás 6 tányérra" badge="Interaktív labor" badgeColor="sky">
      <ShareLab6 />
    </TheorySection>
  </TheoryTemplate>
);

export default Div6G2Theory;
