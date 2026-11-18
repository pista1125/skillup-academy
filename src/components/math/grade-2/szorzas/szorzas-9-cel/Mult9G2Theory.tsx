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
  BeadStringsSvg,
  NineTableArraySvg,
  TenMinusOneSvg,
  FingerTrickSvg,
  ThreeSixNineTableSvg,
  ThreeNineJumpsSvg
} from './Mult9G2Figures';
import { GroupsLab, TenTrickLab } from './Mult9G2Parts';

const P: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300">{children}</p>
);

export const Mult9G2Theory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => (
  <TheoryTemplate
    topicId="g2-multiplication"
    subtopicId="szorzas-9-cel"
    grade={2}
    chapterId="szorzas"
    title="8. Szorzás 9-cel"
    subtitle="Kilencesével számolunk, megtanuljuk a 9-es szorzótáblát két trükkel, és megnézzük a 3-as, 6-os, 9-es tábla kapcsolatát."
    badge="2. OSZTÁLY • IV. SZORZÁS • TANANYAG"
    themeColor="orange"
    pdfFilename="2_osztaly_szorzas_9_cel_tananyag.pdf"
    practiceTitle="Készen állsz? Gyakoroljunk!"
    practiceSubtitle="Próbáld ki magad a 3 szintes kvízben és a játékokban!"
    onBack={onBack}
    onStartQuiz={onStartQuiz}
    quickRule={{
      label: 'FONTOS — A 9-ES SZORZÓTÁBLA',
      align: 'left',
      formula: (
        <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
          <div className="p-2.5 rounded-xl bg-orange-50/90 dark:bg-orange-950/50 border border-orange-200 dark:border-orange-800/80 text-center font-mono text-base sm:text-lg font-black text-orange-900 dark:text-orange-200">
            3 · 9 = 9 + 9 + 9 = 27
          </div>
          <ul className="list-disc pl-4 space-y-1 text-xs sm:text-sm">
            <li>Kilencesével: 9, 18, 27, 36, 45, 54, 63, 72, 81, 90.</li>
            <li><strong>Tízes trükk:</strong> 6 · 10 = 60, és vegyél el 6-ot: 6 · 9 = 54.</li>
            <li>A szorzat két jegyét összeadva mindig 9 jön ki: 5 + 4 = 9.</li>
          </ul>
        </div>
      )
    }}
  >
    <TheorySection title="1. Mit tanulunk?" badge="9-es tábla" badgeColor="orange">
      <div className="space-y-2">
        <P>A többi szorzótáblát már ismered.</P>
        <P>Most <strong>kilencesével</strong> számolunk.</P>
        <P>Két trükköt is tanulunk. Így a 9-es tábla könnyű lesz!</P>
      </div>
    </TheorySection>

    <TheorySection title="2. Mindig 9" badge="Ugyanannyi" badgeColor="emerald">
      <BeadStringsSvg />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TheoryCard title="Összeadással" badge="9 + 9 + 9" badgeColor="emerald">
          <P>Minden karkötőn 9 gyöngy van. 3 karkötő: 9 + 9 + 9 = <strong>27</strong> gyöngy.</P>
        </TheoryCard>
        <TheoryCard title="Szorzással" badge="3 · 9" badgeColor="orange">
          <P>Rövidebben: <strong>3 · 9 = 27</strong>. Olvasd így: háromszor kilenc.</P>
        </TheoryCard>
      </div>
    </TheorySection>

    <TheorySection title="3. A 9-es szorzótábla" badge="Tanuld meg!" badgeColor="orange">
      <NineTableArraySvg />
      <TheoryTable
        headers={['Hányszor?', 'Összeadással', 'Szorzással']}
        rows={[
          ['0', '0', '0 · 9 = 0'],
          ['1', '9', '1 · 9 = 9'],
          ['2', '9 + 9', '2 · 9 = 18'],
          ['3', '18 + 9', '3 · 9 = 27'],
          ['4', '27 + 9', '4 · 9 = 36'],
          ['5', '36 + 9', '5 · 9 = 45'],
          ['6', '45 + 9', '6 · 9 = 54'],
          ['7', '54 + 9', '7 · 9 = 63'],
          ['8', '63 + 9', '8 · 9 = 72'],
          ['9', '72 + 9', '9 · 9 = 81'],
          ['10', '81 + 9', '10 · 9 = 90']
        ]}
      />
      <TheoryCallout type="tip" title="Figyeld a számjegyeket!">
        18, 27, 36, 45 … A tízesek eggyel <strong>nőnek</strong>, az egyesek eggyel <strong>csökkennek</strong>. Add össze a két jegyet: 1 + 8 = 9, 2 + 7 = 9, 3 + 6 = 9. Mindig 9!
      </TheoryCallout>
    </TheorySection>

    <TheorySection title="4. Tízes trükk" badge="10-es tábla segít" badgeColor="sky">
      <TenMinusOneSvg />
      <P>A 9 eggyel kevesebb, mint a 10. Szorozz előbb 10-zel!</P>
      <P>Aztán minden sorból vegyél el 1-et. Annyit veszel el, ahány sor van.</P>
      <TheoryTable
        headers={['', '· 10', '· 9 (vegyél el!)']}
        rows={[
          ['4', '4 · 10 = 40', '40 − 4 = 36'],
          ['6', '6 · 10 = 60', '60 − 6 = 54'],
          ['7', '7 · 10 = 70', '70 − 7 = 63'],
          ['8', '8 · 10 = 80', '80 − 8 = 72']
        ]}
      />
    </TheorySection>

    <TheorySection title="5. Ujjtrükk" badge="Két kézzel" badgeColor="purple">
      <FingerTrickSvg />
      <P>Tedd le a két kezed! Számozd meg az ujjaidat balról: 1-től 10-ig.</P>
      <P>4 · 9 kell? Hajtsd be a <strong>4.</strong> ujjad! Előtte 3 ujj: <strong>3 tízes</strong>. Utána 6 ujj: <strong>6 egyes</strong>. Ez <strong>36</strong>.</P>
    </TheorySection>

    <TheorySection title="6. A 3-as, 6-os, 9-es tábla kapcsolata" badge="Rokon táblák" badgeColor="emerald">
      <ThreeNineJumpsSvg />
      <P>A 9 = 3 + 3 + 3. Egy szöcske-ugrás annyi, mint 3 béka-ugrás.</P>
      <P>Ezért a 9 minden többszöröse a 3-nak is többszöröse: 9, 18, 27 …</P>
      <ThreeSixNineTableSvg />
      <TheoryTable
        headers={['Ugyanannyi', 'Szorzások']}
        rows={[
          ['9', '3 · 3 = 1 · 9'],
          ['18', '3 · 6 = 6 · 3 = 2 · 9'],
          ['27', '3 · 9 = 9 · 3'],
          ['36', '6 · 6 = 4 · 9'],
          ['54', '6 · 9 = 9 · 6']
        ]}
      />
      <TheoryCallout type="info" title="Felcserélhetjük!">
        <strong>2 · 9 = 9 · 2 = 18</strong>. A 9-es tábla sok szorzatát már a többi táblából is ismered!
      </TheoryCallout>
    </TheorySection>

    <TheorySection title="7. Nézzük meg együtt!" badge="Mintapéldák" badgeColor="sky">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <TheoryCard title="A) Tízes trükkel" badge="8 · 9" badgeColor="sky">
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
            <li>Előbb 10-zel: 8 · 10 = <strong>80</strong>.</li>
            <li>Vegyél el 8-at: 80 − 8 = <strong>72</strong>.</li>
            <li>Tehát 8 · 9 = <strong>72</strong>.</li>
          </ul>
        </TheoryCard>
        <TheoryCard title="B) Szöveges feladat" badge="dobozok" badgeColor="orange">
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
            <li>Egy dobozban 9 bonbon van. Hány bonbon van 5 dobozban?</li>
            <li>5 · 9 = <strong>45</strong>.</li>
            <li>Válasz: 45 bonbon van.</li>
          </ul>
        </TheoryCard>
        <TheoryCard title="C) Hiányzó szám" badge="□ · 9 = 63" badgeColor="emerald">
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
            <li>Számolj kilencesével 63-ig!</li>
            <li>9, 18, 27, 36, 45, 54, 63: ez <strong>7</strong> szám.</li>
            <li>□ = <strong>7</strong>, mert 7 · 9 = 63.</li>
          </ul>
        </TheoryCard>
      </div>
    </TheorySection>

    <TheorySection title="8. Vigyázz!" badge="Csapda" badgeColor="rose">
      <TheoryTrapBox
        title="7 · 9 nem 69!"
        wrong="7 · 9 = 70 − 1 = 69"
        wrongExplanation="Nem csak 1-et kell elvenni. 7 sor van, minden sorból 1."
        correct="7 · 9 = 70 − 7 = 63"
        correctExplanation="Annyit veszel el, ahány kilences van: 7-et."
        tip="Próba: 6 + 3 = 9. Jó a szorzat!"
      />
      <TheoryCallout type="warning" title="Ne add össze!">
        <strong>9 · 9 = 81</strong>, és nem 18. A 18 a 9 + 9, az csak 2 kilences.
      </TheoryCallout>
    </TheorySection>

    <TheorySection title="9. Labor I: Kilences dobozok" badge="Interaktív labor" badgeColor="orange">
      <GroupsLab />
    </TheorySection>

    <TheorySection title="10. Labor II: Tízes trükk" badge="Interaktív labor" badgeColor="sky">
      <TenTrickLab />
    </TheorySection>
  </TheoryTemplate>
);

export default Mult9G2Theory;
