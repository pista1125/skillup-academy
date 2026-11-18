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
  EqualGroupsSvg,
  MultSignSvg,
  ArrayCommuteSvg,
  TwoTableLineSvg,
  BikesDoubleSvg,
  DoubleSvg
} from './Mult2G2Figures';
import { BagsLab, JumpLab } from './Mult2G2Parts';

const P: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300">{children}</p>
);

export const Mult2G2Theory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => (
  <TheoryTemplate
    topicId="g2-multiplication"
    subtopicId="szorzas-2-vel"
    grade={2}
    chapterId="szorzas"
    title="1. Szorzás 2-vel"
    subtitle="Ugyanannyit adunk össze — így születik a szorzás. Megtanuljuk a · jelet, a sorokat és oszlopokat, és a 2-es szorzótáblát."
    badge="2. OSZTÁLY • IV. SZORZÁS • TANANYAG"
    themeColor="blue"
    pdfFilename="2_osztaly_szorzas_2_vel_tananyag.pdf"
    practiceTitle="Készen állsz? Gyakoroljunk!"
    practiceSubtitle="Próbáld ki magad a 3 szintes kvízben és a játékokban!"
    onBack={onBack}
    onStartQuiz={onStartQuiz}
    quickRule={{
      label: 'FONTOS — MIT JELENT A SZORZÁS?',
      align: 'left',
      formula: (
        <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
          <div className="p-2.5 rounded-xl bg-blue-50/90 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800/80 text-center font-mono text-base sm:text-lg font-black text-blue-900 dark:text-blue-200">
            3 · 2 = 2 + 2 + 2 = 6
          </div>
          <ul className="list-disc pl-4 space-y-1 text-xs sm:text-sm">
            <li>Olvasd így: <strong>háromszor kettő</strong>.</li>
            <li>Az első szám: <strong>hányszor</strong>. A második: <strong>mennyit</strong>.</li>
            <li>A 2-es tábla: 2, 4, 6, 8, 10, 12, 14, 16, 18, 20.</li>
          </ul>
        </div>
      )
    }}
  >
    <TheorySection title="1. Mit tanulunk?" badge="Új művelet" badgeColor="blue">
      <div className="space-y-2">
        <P>Ma egy <strong>új műveletet</strong> tanulunk: a <strong>szorzást</strong>.</P>
        <P>Akkor szorzunk, ha <strong>ugyanannyit</strong> adunk össze többször.</P>
        <P>A végén tudni fogod a <strong>2-es szorzótáblát</strong>!</P>
      </div>
    </TheorySection>

    <TheorySection title="2. Ugyanannyi, ugyanannyi, ugyanannyi" badge="Előkészítés" badgeColor="orange">
      <EqualGroupsSvg />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TheoryCard title="Egyenlő csoportok" badge="2 + 2 + 2 + 2" badgeColor="orange">
          <P>Minden zacskóban <strong>2</strong> golyó van. 4 zacskó van.</P>
          <P>Összeadjuk: <strong>2 + 2 + 2 + 2 = 8</strong>.</P>
        </TheoryCard>
        <TheoryCard title="Kettesével számolunk" badge="2, 4, 6, 8" badgeColor="amber">
          <P>Mutass a zacskókra, és mondd: <strong>2, 4, 6, 8</strong>.</P>
          <P>Így gyorsabb, mint egyesével!</P>
        </TheoryCard>
      </div>
    </TheorySection>

    <TheorySection title="3. A szorzás jele: ·" badge="Szorzás" badgeColor="blue">
      <MultSignSvg />
      <TheoryTable
        headers={['Összeadás', 'Így mondjuk', 'Így írjuk', 'Eredmény']}
        rows={[
          ['2 + 2 + 2', 'háromszor kettő', '3 · 2', '6'],
          ['2 + 2 + 2 + 2 + 2', 'ötször kettő', '5 · 2', '10'],
          ['2 + 2', 'kétszer kettő', '2 · 2', '4']
        ]}
      />
      <TheoryCallout type="info" title="A számok neve">
        A <strong>3 · 2 = 6</strong> szorzásban a 3 és a 2 a <strong>tényezők</strong>. A 6 a <strong>szorzat</strong>.
      </TheoryCallout>
    </TheorySection>

    <TheorySection title="4. Sorok és oszlopok — felcserélhetőség" badge="Rácspontok" badgeColor="emerald">
      <ArrayCommuteSvg />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TheoryCard title="Sorokban nézem" badge="2 · 5" badgeColor="emerald">
          <P>2 sor van, mindegyikben 5 pötty: <strong>2 · 5 = 10</strong>.</P>
        </TheoryCard>
        <TheoryCard title="Oszlopokban nézem" badge="5 · 2" badgeColor="teal">
          <P>5 oszlop van, mindegyikben 2 pötty: <strong>5 · 2 = 10</strong>.</P>
        </TheoryCard>
      </div>
      <TheoryCallout type="success" title="Felcserélhetők!">
        A tényezők helyet cserélhetnek, a szorzat nem változik: <strong>2 · 5 = 5 · 2</strong>.
      </TheoryCallout>
    </TheorySection>

    <TheorySection title="5. A 2-es szorzótábla" badge="Tábla" badgeColor="purple">
      <TwoTableLineSvg />
      <TheoryTable
        headers={['Szorzás', 'Eredmény', 'Szorzás', 'Eredmény']}
        rows={[
          ['0 · 2', '0', '6 · 2', '12'],
          ['1 · 2', '2', '7 · 2', '14'],
          ['2 · 2', '4', '8 · 2', '16'],
          ['3 · 2', '6', '9 · 2', '18'],
          ['4 · 2', '8', '10 · 2', '20'],
          ['5 · 2', '10', '', '']
        ]}
      />
      <DoubleSvg />
      <TheoryCallout type="tip" title="Kétszerese">
        Egy szám <strong>kétszerese</strong> azt jelenti: kétszer annyi. A 7 kétszerese <strong>7 + 7 = 14</strong>.
      </TheoryCallout>
    </TheorySection>

    <TheorySection title="6. Nézzük meg együtt!" badge="Mintapéldák" badgeColor="sky">
      <BikesDoubleSvg />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <TheoryCard title="A) Biciklik" badge="6 · 2" badgeColor="sky">
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
            <li>6 bicikli van.</li>
            <li>Mindegyiknek 2 kereke van.</li>
            <li>6 · 2 = <strong>12</strong> kerék.</li>
          </ul>
        </TheoryCard>
        <TheoryCard title="B) Zoknipárok" badge="4 · 2" badgeColor="rose">
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
            <li>4 pár zokni lóg a szárítón.</li>
            <li>Egy pár = 2 zokni.</li>
            <li>4 · 2 = <strong>8</strong> zokni.</li>
          </ul>
        </TheoryCard>
        <TheoryCard title="C) Hiányzó tényező" badge="□ · 2 = 14" badgeColor="purple">
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
            <li>Ugorj kettesével a 14-ig.</li>
            <li>2, 4, 6, 8, 10, 12, 14 — ez 7 ugrás.</li>
            <li>□ = <strong>7</strong>, mert 7 · 2 = 14.</li>
          </ul>
        </TheoryCard>
      </div>
    </TheorySection>

    <TheorySection title="7. Vigyázz!" badge="Csapda" badgeColor="rose">
      <TheoryTrapBox
        title="A · nem ugyanaz, mint a +"
        wrong="4 · 2 = 6"
        wrongExplanation="Ez a 4 + 2 lenne! A szorzásnál a 2-t négyszer adjuk össze."
        correct="4 · 2 = 2 + 2 + 2 + 2 = 8"
        correctExplanation="Négyszer kettő: 2, 4, 6, 8."
        tip="Nézd meg a jelet, mielőtt számolsz!"
      />
      <TheoryCallout type="warning" title="A nulla különleges">
        <strong>0 · 2 = 0</strong>. Ha nincs egy zacskó sem, golyó sincs!
      </TheoryCallout>
    </TheorySection>

    <TheorySection title="8. Labor I: Zacskó-töltő" badge="Interaktív labor" badgeColor="orange">
      <BagsLab />
    </TheorySection>

    <TheorySection title="9. Labor II: Kettes ugrások" badge="Interaktív labor" badgeColor="purple">
      <JumpLab />
    </TheorySection>
  </TheoryTemplate>
);

export default Mult2G2Theory;
