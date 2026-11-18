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
  WeekStripsSvg,
  SevenTableArraySvg,
  SevenJumpsSvg,
  FivePlusTwoSvg,
  CommuteSevenSvg,
  LadybugsSvg
} from './Mult7G2Figures';
import { WeeksLab, FivePlusTwoLab } from './Mult7G2Parts';

const P: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300">{children}</p>
);

export const Mult7G2Theory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => (
  <TheoryTemplate
    topicId="g2-multiplication"
    subtopicId="szorzas-7-tel"
    grade={2}
    chapterId="szorzas"
    title="6. Szorzás 7-tel"
    subtitle="Hetesével számolunk: egy hét 7 nap. Megtanuljuk a 7-es szorzótáblát, és egy ügyes trükköt: 7 = 5 + 2."
    badge="2. OSZTÁLY • IV. SZORZÁS • TANANYAG"
    themeColor="cyan"
    pdfFilename="2_osztaly_szorzas_7_tel_tananyag.pdf"
    practiceTitle="Készen állsz? Gyakoroljunk!"
    practiceSubtitle="Próbáld ki magad a 3 szintes kvízben és a játékokban!"
    onBack={onBack}
    onStartQuiz={onStartQuiz}
    quickRule={{
      label: 'FONTOS — A 7-ES SZORZÓTÁBLA',
      align: 'left',
      formula: (
        <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
          <div className="p-2.5 rounded-xl bg-cyan-50/90 dark:bg-cyan-950/50 border border-cyan-200 dark:border-cyan-800/80 text-center font-mono text-base sm:text-lg font-black text-cyan-900 dark:text-cyan-200">
            3 · 7 = 7 + 7 + 7 = 21
          </div>
          <ul className="list-disc pl-4 space-y-1 text-xs sm:text-sm">
            <li>Hetesével: 7, 14, 21, 28, 35, 42, 49, 56, 63, 70.</li>
            <li><strong>Trükk:</strong> 7 = 5 + 2. Például 6 · 5 = 30, 6 · 2 = 12, 30 + 12 = 42.</li>
            <li>0 · 7 = 0.</li>
          </ul>
        </div>
      )
    }}
  >
    <TheorySection title="1. Mit tanulunk?" badge="7-es tábla" badgeColor="cyan">
      <div className="space-y-2">
        <P>A 2-es, 3-as, 4-es, 5-ös és 6-os táblát már ismered.</P>
        <P>Most <strong>hetesével</strong> számolunk.</P>
        <P>Az 5-ös és a 2-es tábla segít majd!</P>
      </div>
    </TheorySection>

    <TheorySection title="2. Mindig 7" badge="Egy hét" badgeColor="emerald">
      <WeekStripsSvg />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TheoryCard title="Összeadással" badge="7 + 7 + 7" badgeColor="emerald">
          <P>Egy hét 7 nap. 3 hét: 7 + 7 + 7 = <strong>21</strong> nap.</P>
        </TheoryCard>
        <TheoryCard title="Szorzással" badge="3 · 7" badgeColor="cyan">
          <P>Rövidebben: <strong>3 · 7 = 21</strong>. Olvasd így: háromszor hét.</P>
        </TheoryCard>
      </div>
      <TheoryCallout type="info" title="Hol van 7?">
        Egy hétben 7 nap van. A szivárványnak 7 színe van. A hétpettyes katicának 7 pettye van.
      </TheoryCallout>
    </TheorySection>

    <TheorySection title="3. A 7-es szorzótábla" badge="Tanuld meg!" badgeColor="cyan">
      <SevenTableArraySvg />
      <TheoryTable
        headers={['Hányszor?', 'Összeadással', 'Szorzással']}
        rows={[
          ['0', '0', '0 · 7 = 0'],
          ['1', '7', '1 · 7 = 7'],
          ['2', '7 + 7', '2 · 7 = 14'],
          ['3', '7 + 7 + 7', '3 · 7 = 21'],
          ['4', '21 + 7', '4 · 7 = 28'],
          ['5', '28 + 7', '5 · 7 = 35'],
          ['6', '35 + 7', '6 · 7 = 42'],
          ['7', '42 + 7', '7 · 7 = 49'],
          ['8', '49 + 7', '8 · 7 = 56'],
          ['9', '56 + 7', '9 · 7 = 63'],
          ['10', '63 + 7', '10 · 7 = 70']
        ]}
      />
      <TheoryCallout type="tip" title="Páros, páratlan, páros …">
        7 páratlan, 14 páros, 21 páratlan, 28 páros … A 7-es tábla számai felváltva páratlanok és párosak.
      </TheoryCallout>
    </TheorySection>

    <TheorySection title="4. A szöcske ugrásai" badge="A 7 többszörösei" badgeColor="emerald">
      <SevenJumpsSvg />
      <P>A szöcske 0-ról indul, és mindig 7-et ugrik.</P>
      <P>Ahová leér, azok a <strong>7 többszörösei</strong>: 7, 14, 21, 28, 35, 42, 49, 56, 63, 70.</P>
    </TheorySection>

    <TheorySection title="5. Trükk: 7 = 5 + 2" badge="5-ös és 2-es tábla" badgeColor="orange">
      <FivePlusTwoSvg />
      <P>Minden sorban 5 kék és 2 narancs korong van. Ez 7.</P>
      <P>Számold külön a kékeket és a narancsokat, aztán add össze!</P>
      <TheoryTable
        headers={['', '· 5', '· 2', '· 7 (összeadva)']}
        rows={[
          ['4', '20', '8', '20 + 8 = 28'],
          ['6', '30', '12', '30 + 12 = 42'],
          ['8', '40', '16', '40 + 16 = 56'],
          ['9', '45', '18', '45 + 18 = 63']
        ]}
      />
    </TheorySection>

    <TheorySection title="6. Felcserélhetjük!" badge="3 · 7 = 7 · 3" badgeColor="sky">
      <CommuteSevenSvg />
      <P>Fordítsd el a képet! Ugyanannyi korong marad. <strong>3 · 7 = 7 · 3 = 21</strong>.</P>
      <P>Sok szorzást már tudsz: 2 · 7 = 7 · 2, 5 · 7 = 7 · 5.</P>
    </TheorySection>

    <TheorySection title="7. Bogarak, rovarok" badge="Szöveges feladatok" badgeColor="rose">
      <LadybugsSvg />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TheoryCard title="Katicák" badge="4 · 7" badgeColor="rose">
          <P>Egy levélen 4 katica ül. Mindegyiknek 7 pettye van.</P>
          <P>4 · 7 = <strong>28</strong> petty.</P>
        </TheoryCard>
        <TheoryCard title="7-szer annyi" badge="5 · 7" badgeColor="amber">
          <P>A fán 5 csiga van. Hangya 7-szer annyi.</P>
          <P>5 · 7 = <strong>35</strong> hangya.</P>
        </TheoryCard>
      </div>
    </TheorySection>

    <TheorySection title="8. Nézzük meg együtt!" badge="Mintapéldák" badgeColor="sky">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <TheoryCard title="A) 5 + 2 trükkel" badge="8 · 7" badgeColor="orange">
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
            <li>8 · 5 = <strong>40</strong>.</li>
            <li>8 · 2 = <strong>16</strong>.</li>
            <li>40 + 16 = 56, tehát 8 · 7 = <strong>56</strong>.</li>
          </ul>
        </TheoryCard>
        <TheoryCard title="B) Szöveges feladat" badge="hetek" badgeColor="cyan">
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
            <li>Zoli 4 hétig jár úszni. Hány nap ez?</li>
            <li>4 · 7 = <strong>28</strong>.</li>
            <li>Válasz: 28 nap.</li>
          </ul>
        </TheoryCard>
        <TheoryCard title="C) Hiányzó szám" badge="□ · 7 = 35" badgeColor="emerald">
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
            <li>Számolj hetesével 35-ig!</li>
            <li>7, 14, 21, 28, 35: ez <strong>5</strong> szám.</li>
            <li>□ = <strong>5</strong>, mert 5 · 7 = 35.</li>
          </ul>
        </TheoryCard>
      </div>
    </TheorySection>

    <TheorySection title="9. Vigyázz!" badge="Csapda" badgeColor="rose">
      <TheoryTrapBox
        title="7 · 7 nem 14!"
        wrong="7 · 7 = 14"
        wrongExplanation="A 14 a 7 + 7. Az csak 2 darab hetes."
        correct="7 · 7 = 49"
        correctExplanation="Hétszer hét: 7 darab hetes. 35 + 14 = 49."
        tip="A · jelnél ne adj össze! Számold, hány hetes van."
      />
      <TheoryCallout type="warning" title="Nulla hetes">
        Ha egy katica sincs, petty sincs: <strong>0 · 7 = 0</strong>.
      </TheoryCallout>
    </TheorySection>

    <TheorySection title="10. Labor I: Hetes csíkok" badge="Interaktív labor" badgeColor="cyan">
      <WeeksLab />
    </TheorySection>

    <TheorySection title="11. Labor II: 5 + 2 trükk" badge="Interaktív labor" badgeColor="orange">
      <FivePlusTwoLab />
    </TheorySection>
  </TheoryTemplate>
);

export default Mult7G2Theory;
