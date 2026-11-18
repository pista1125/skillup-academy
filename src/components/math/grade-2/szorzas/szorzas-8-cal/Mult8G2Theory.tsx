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
  SpiderGroupsSvg,
  EightTableArraySvg,
  EightJumpsLineSvg,
  DoubleChainSvg,
  RodsSvg,
  CommuteArraySvg
} from './Mult8G2Figures';
import { GroupsLab, DoubleLab } from './Mult8G2Parts';

const P: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300">{children}</p>
);

export const Mult8G2Theory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => (
  <TheoryTemplate
    topicId="g2-multiplication"
    subtopicId="szorzas-8-cal"
    grade={2}
    chapterId="szorzas"
    title="7. Szorzás 8-cal"
    subtitle="Nyolcasával számolunk, megtanuljuk a 8-as szorzótáblát, és meglátjuk: a 2-es, a 4-es és a 8-as tábla rokonok."
    badge="2. OSZTÁLY • IV. SZORZÁS • TANANYAG"
    themeColor="indigo"
    pdfFilename="2_osztaly_szorzas_8_cal_tananyag.pdf"
    practiceTitle="Készen állsz? Gyakoroljunk!"
    practiceSubtitle="Próbáld ki magad a 3 szintes kvízben és a játékokban!"
    onBack={onBack}
    onStartQuiz={onStartQuiz}
    quickRule={{
      label: 'FONTOS — A 8-AS SZORZÓTÁBLA',
      align: 'left',
      formula: (
        <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
          <div className="p-2.5 rounded-xl bg-indigo-50/90 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800/80 text-center font-mono text-base sm:text-lg font-black text-indigo-900 dark:text-indigo-200">
            3 · 8 = 8 + 8 + 8 = 24
          </div>
          <ul className="list-disc pl-4 space-y-1 text-xs sm:text-sm">
            <li>Nyolcasával: 8, 16, 24, 32, 40, 48, 56, 64, 72, 80.</li>
            <li><strong>Trükk:</strong> a 8-szoros a 4-szeres duplája. 6 · 4 = 24, 24 + 24 = 48.</li>
            <li>9 · 8 = 80 − 8 = 72. És 0 · 8 = 0.</li>
          </ul>
        </div>
      )
    }}
  >
    <TheorySection title="1. Mit tanulunk?" badge="8-as tábla" badgeColor="indigo">
      <div className="space-y-2">
        <P>A 2-es és a 4-es szorzótáblát már tudod.</P>
        <P>Most <strong>nyolcasával</strong> számolunk.</P>
        <P>A végén meglátod: a 8-as tábla a 4-es tábla <strong>duplája</strong>!</P>
      </div>
    </TheorySection>

    <TheorySection title="2. Mindig 8" badge="Ugyanannyi" badgeColor="emerald">
      <SpiderGroupsSvg />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TheoryCard title="Összeadással" badge="8 + 8 + 8" badgeColor="emerald">
          <P>Minden póknak 8 lába van. 3 pók: 8 + 8 + 8 = <strong>24</strong> láb.</P>
        </TheoryCard>
        <TheoryCard title="Szorzással" badge="3 · 8" badgeColor="indigo">
          <P>Rövidebben: <strong>3 · 8 = 24</strong>. Olvasd így: háromszor nyolc.</P>
        </TheoryCard>
      </div>
      <TheoryCallout type="info" title="Hol van 8?">
        8 lába van a póknak. 8 karja van a polipnak. 8 cikkre vágjuk a tortát.
      </TheoryCallout>
    </TheorySection>

    <TheorySection title="3. A 8-as szorzótábla" badge="Tanuld meg!" badgeColor="indigo">
      <EightTableArraySvg />
      <TheoryTable
        headers={['Hányszor?', 'Összeadással', 'Szorzással']}
        rows={[
          ['0', '0', '0 · 8 = 0'],
          ['1', '8', '1 · 8 = 8'],
          ['2', '8 + 8', '2 · 8 = 16'],
          ['3', '8 + 8 + 8', '3 · 8 = 24'],
          ['4', '8 + 8 + 8 + 8', '4 · 8 = 32'],
          ['5', '8 + 8 + 8 + 8 + 8', '5 · 8 = 40'],
          ['6', '40 + 8', '6 · 8 = 48'],
          ['7', '48 + 8', '7 · 8 = 56'],
          ['8', '56 + 8', '8 · 8 = 64'],
          ['9', '64 + 8', '9 · 8 = 72'],
          ['10', '72 + 8', '10 · 8 = 80']
        ]}
      />
    </TheorySection>

    <TheorySection title="4. Nyolcas ugrások" badge="A 8 többszörösei" badgeColor="orange">
      <EightJumpsLineSvg />
      <P>0, 8, 16, 24, 32, 40, 48, 56, 64, 72, 80. Ezek a <strong>8 többszörösei</strong>.</P>
      <TheoryCallout type="tip" title="Figyeld a végüket!">
        8, 16, 24, 32, 40 – a végük 8, 6, 4, 2, 0. Aztán 48, 56, 64, 72, 80 – megint 8, 6, 4, 2, 0! Mind páros szám.
      </TheoryCallout>
    </TheorySection>

    <TheorySection title="5. A 2-es, a 4-es és a 8-as tábla kapcsolata" badge="Duplázás" badgeColor="orange">
      <DoubleChainSvg />
      <P>A 4 a 2 duplája. A 8 a 4 duplája. Ezért a 8-as tábla a 4-es tábla <strong>duplája</strong>.</P>
      <TheoryTable
        headers={['', '· 2', '· 4', '· 8']}
        rows={[
          ['3', '6', '12', '24'],
          ['5', '10', '20', '40'],
          ['6', '12', '24', '48'],
          ['7', '14', '28', '56'],
          ['9', '18', '36', '72']
        ]}
      />
      <RodsSvg />
      <TheoryCallout type="info" title="Színes rudak">
        A bordó rúd 8 hosszú. Ugyanolyan hosszú, mint 2 rózsaszín (4 + 4), vagy 4 piros (2 + 2 + 2 + 2).
      </TheoryCallout>
    </TheorySection>

    <TheorySection title="6. Trükk: a 10 · 8 segít" badge="80 − 8" badgeColor="sky">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TheoryCard title="9 · 8" badge="egy nyolcassal kevesebb" badgeColor="sky">
          <P>10 · 8 = 80. A 9 · 8 egy nyolcassal kevesebb: 80 − 8 = <strong>72</strong>.</P>
        </TheoryCard>
        <TheoryCard title="6 · 8" badge="egy nyolcassal több" badgeColor="emerald">
          <P>5 · 8 = 40. A 6 · 8 egy nyolcassal több: 40 + 8 = <strong>48</strong>.</P>
        </TheoryCard>
      </div>
    </TheorySection>

    <TheorySection title="7. Felcserélhetjük!" badge="3 · 8 = 8 · 3" badgeColor="sky">
      <CommuteArraySvg />
      <P>Fordítsd el a képet! Ugyanannyi korong marad. <strong>3 · 8 = 8 · 3 = 24</strong>.</P>
    </TheorySection>

    <TheorySection title="8. Nézzük meg együtt!" badge="Mintapéldák" badgeColor="sky">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <TheoryCard title="A) Duplázással" badge="7 · 8" badgeColor="orange">
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
            <li>Előbb 4-gyel: 7 · 4 = <strong>28</strong>.</li>
            <li>Duplázd meg: 28 + 28 = <strong>56</strong>.</li>
            <li>Tehát 7 · 8 = <strong>56</strong>.</li>
          </ul>
        </TheoryCard>
        <TheoryCard title="B) Szöveges feladat" badge="zsírkréta" badgeColor="indigo">
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
            <li>Egy dobozban 8 zsírkréta van. Hány kréta van 4 dobozban?</li>
            <li>4 · 8 = <strong>32</strong>.</li>
            <li>Válasz: 32 zsírkréta van.</li>
          </ul>
        </TheoryCard>
        <TheoryCard title="C) Hiányzó szám" badge="□ · 8 = 48" badgeColor="emerald">
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
            <li>Számolj nyolcasával 48-ig!</li>
            <li>8, 16, 24, 32, 40, 48: ez <strong>6</strong> szám.</li>
            <li>□ = <strong>6</strong>, mert 6 · 8 = 48.</li>
          </ul>
        </TheoryCard>
      </div>
    </TheorySection>

    <TheorySection title="9. Vigyázz!" badge="Csapda" badgeColor="rose">
      <TheoryTrapBox
        title="8 · 8 nem 16!"
        wrong="8 · 8 = 16"
        wrongExplanation="A 16 a 8 + 8. Az csak 2 nyolcas."
        correct="8 · 8 = 64"
        correctExplanation="Nyolcszor nyolc: 8 darab nyolcas. 8 · 4 = 32, 32 + 32 = 64."
        tip="A · jelnél ne adj össze! Számold, hány nyolcas van."
      />
      <TheoryCallout type="warning" title="Nulla nyolcas">
        Ha nincs egy doboz sem, golyó sincs: <strong>0 · 8 = 0</strong>.
      </TheoryCallout>
    </TheorySection>

    <TheorySection title="10. Labor I: Nyolcas dobozok" badge="Interaktív labor" badgeColor="indigo">
      <GroupsLab />
    </TheorySection>

    <TheorySection title="11. Labor II: Duplázz háromszor!" badge="Interaktív labor" badgeColor="orange">
      <DoubleLab />
    </TheorySection>
  </TheoryTemplate>
);

export default Mult8G2Theory;
