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
  CloverGroupsSvg,
  FourTableArraySvg,
  KangarooFrogLineSvg,
  DoubleDoubleSvg,
  CommuteArraySvg
} from './Mult4G2Figures';
import { GroupsLab, DoubleLab } from './Mult4G2Parts';

const P: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300">{children}</p>
);

export const Mult4G2Theory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => (
  <TheoryTemplate
    topicId="g2-multiplication"
    subtopicId="szorzas-4-gyel"
    grade={2}
    chapterId="szorzas"
    title="3. Szorzás 4-gyel"
    subtitle="Négyesével számolunk, megtanuljuk a 4-es szorzótáblát, és meglátjuk: a 4-es tábla a 2-es tábla duplája."
    badge="2. OSZTÁLY • IV. SZORZÁS • TANANYAG"
    themeColor="violet"
    pdfFilename="2_osztaly_szorzas_4_gyel_tananyag.pdf"
    practiceTitle="Készen állsz? Gyakoroljunk!"
    practiceSubtitle="Próbáld ki magad a 3 szintes kvízben és a játékokban!"
    onBack={onBack}
    onStartQuiz={onStartQuiz}
    quickRule={{
      label: 'FONTOS — A 4-ES SZORZÓTÁBLA',
      align: 'left',
      formula: (
        <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
          <div className="p-2.5 rounded-xl bg-violet-50/90 dark:bg-violet-950/50 border border-violet-200 dark:border-violet-800/80 text-center font-mono text-base sm:text-lg font-black text-violet-900 dark:text-violet-200">
            3 · 4 = 4 + 4 + 4 = 12
          </div>
          <ul className="list-disc pl-4 space-y-1 text-xs sm:text-sm">
            <li>Négyesével: 4, 8, 12, 16, 20, 24, 28, 32, 36, 40.</li>
            <li><strong>Trükk:</strong> szorozz 2-vel, aztán duplázd meg! 7 · 2 = 14, 14 + 14 = 28.</li>
            <li>0 · 4 = 0.</li>
          </ul>
        </div>
      )
    }}
  >
    <TheorySection title="1. Mit tanulunk?" badge="4-es tábla" badgeColor="violet">
      <div className="space-y-2">
        <P>A 2-es és a 3-as szorzótáblát már ismered.</P>
        <P>Most <strong>négyesével</strong> számolunk.</P>
        <P>A végén meglátod: a 4-es tábla a 2-es tábla <strong>duplája</strong>!</P>
      </div>
    </TheorySection>

    <TheorySection title="2. Mindig 4" badge="Ugyanannyi" badgeColor="emerald">
      <CloverGroupsSvg />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TheoryCard title="Összeadással" badge="4 + 4 + 4" badgeColor="emerald">
          <P>Minden lóherének 4 levele van. 3 lóhere: 4 + 4 + 4 = <strong>12</strong> levél.</P>
        </TheoryCard>
        <TheoryCard title="Szorzással" badge="3 · 4" badgeColor="violet">
          <P>Rövidebben: <strong>3 · 4 = 12</strong>. Olvasd így: háromszor négy.</P>
        </TheoryCard>
      </div>
      <TheoryCallout type="info" title="Hol van 4?">
        Négy levél a lóherén. Négy kerék az autón. Négy láb a kutyán. Négy évszak egy évben.
      </TheoryCallout>
    </TheorySection>

    <TheorySection title="3. A 4-es szorzótábla" badge="Tanuld meg!" badgeColor="violet">
      <FourTableArraySvg />
      <TheoryTable
        headers={['Hányszor?', 'Összeadással', 'Szorzással']}
        rows={[
          ['0', '0', '0 · 4 = 0'],
          ['1', '4', '1 · 4 = 4'],
          ['2', '4 + 4', '2 · 4 = 8'],
          ['3', '4 + 4 + 4', '3 · 4 = 12'],
          ['4', '4 + 4 + 4 + 4', '4 · 4 = 16'],
          ['5', '4 + 4 + 4 + 4 + 4', '5 · 4 = 20'],
          ['6', '20 + 4', '6 · 4 = 24'],
          ['7', '24 + 4', '7 · 4 = 28'],
          ['8', '28 + 4', '8 · 4 = 32'],
          ['9', '32 + 4', '9 · 4 = 36'],
          ['10', '36 + 4', '10 · 4 = 40']
        ]}
      />
      <TheoryCallout type="tip" title="Figyeld a végüket!">
        4, 8, 12, 16, 20 és 24, 28, 32, 36, 40. A végük ugyanaz: 4, 8, 2, 6, 0!
      </TheoryCallout>
    </TheorySection>

    <TheorySection title="4. A kenguru ugrásai" badge="A 4 többszörösei" badgeColor="orange">
      <KangarooFrogLineSvg />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TheoryCard title="Kenguru" badge="+ 4" badgeColor="violet">
          <P>0, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40. Ezek a <strong>4 többszörösei</strong>.</P>
        </TheoryCard>
        <TheoryCard title="Béka" badge="+ 2" badgeColor="emerald">
          <P>A béka minden számra ugrik, ahová a kenguru. Közben még egyre: 2, 6, 10 …</P>
        </TheoryCard>
      </div>
    </TheorySection>

    <TheorySection title="5. A 2-es és a 4-es tábla kapcsolata" badge="Duplázás" badgeColor="orange">
      <DoubleDoubleSvg />
      <P>A 4 = 2 + 2. Ezért a 4-szeres a 2-szeres <strong>duplája</strong>.</P>
      <TheoryTable
        headers={['', '· 2', '· 4 (duplája)']}
        rows={[
          ['3', '3 · 2 = 6', '3 · 4 = 12'],
          ['5', '5 · 2 = 10', '5 · 4 = 20'],
          ['7', '7 · 2 = 14', '7 · 4 = 28'],
          ['9', '9 · 2 = 18', '9 · 4 = 36']
        ]}
      />
      <TheoryCallout type="info" title="Pingvin és jegesmedve">
        A pingvinnek 2 lába van, a jegesmedvének 4. 6 jegesmedvének kétszer annyi lába van, mint 6 pingvinnek: 12 és 24.
      </TheoryCallout>
    </TheorySection>

    <TheorySection title="6. Felcserélhetjük!" badge="3 · 4 = 4 · 3" badgeColor="sky">
      <CommuteArraySvg />
      <P>Fordítsd el a képet! Ugyanannyi korong marad. <strong>3 · 4 = 4 · 3 = 12</strong>.</P>
    </TheorySection>

    <TheorySection title="7. Nézzük meg együtt!" badge="Mintapéldák" badgeColor="sky">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <TheoryCard title="A) Duplázással" badge="8 · 4" badgeColor="orange">
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
            <li>Előbb 2-vel: 8 · 2 = <strong>16</strong>.</li>
            <li>Duplázd meg: 16 + 16 = <strong>32</strong>.</li>
            <li>Tehát 8 · 4 = <strong>32</strong>.</li>
          </ul>
        </TheoryCard>
        <TheoryCard title="B) Szöveges feladat" badge="dobozok" badgeColor="violet">
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
            <li>Egy dobozban 4 muffin van. Hány muffin van 6 dobozban?</li>
            <li>6 · 4 = <strong>24</strong>.</li>
            <li>Válasz: 24 muffin van.</li>
          </ul>
        </TheoryCard>
        <TheoryCard title="C) Hiányzó szám" badge="□ · 4 = 28" badgeColor="emerald">
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
            <li>Számolj négyesével 28-ig!</li>
            <li>4, 8, 12, 16, 20, 24, 28: ez <strong>7</strong> szám.</li>
            <li>□ = <strong>7</strong>, mert 7 · 4 = 28.</li>
          </ul>
        </TheoryCard>
      </div>
    </TheorySection>

    <TheorySection title="8. Vigyázz!" badge="Csapda" badgeColor="rose">
      <TheoryTrapBox
        title="4 · 4 nem 8!"
        wrong="4 · 4 = 8"
        wrongExplanation="A 8 a 4 + 4. Az csak 2 négyes."
        correct="4 · 4 = 4 + 4 + 4 + 4 = 16"
        correctExplanation="Négyszer négy: 4 darab négyes."
        tip="A · jelnél ne adj össze! Számold, hány négyes van."
      />
      <TheoryCallout type="warning" title="Nulla négyes">
        Ha nincs egy doboz sem, golyó sincs: <strong>0 · 4 = 0</strong>.
      </TheoryCallout>
    </TheorySection>

    <TheorySection title="9. Labor I: Négyes dobozok" badge="Interaktív labor" badgeColor="violet">
      <GroupsLab />
    </TheorySection>

    <TheorySection title="10. Labor II: Szorozz 2-vel, és duplázd meg!" badge="Interaktív labor" badgeColor="orange">
      <DoubleLab />
    </TheorySection>
  </TheoryTemplate>
);

export default Mult4G2Theory;
