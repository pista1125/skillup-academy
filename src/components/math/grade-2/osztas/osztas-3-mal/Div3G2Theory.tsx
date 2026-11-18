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
  GroupByThreeSvg,
  ShareThreePlatesSvg,
  TripleThirdSvg,
  RemainderGroupsSvg,
  JumpBackRemSvg,
  RemainderRuleSvg
} from './Div3G2Figures';
import { ShareLab3, GroupLab3 } from './Div3G2Parts';

const P: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">{children}</p>
);

export const Div3G2Theory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => (
  <TheoryTemplate
    topicId="g2-division"
    subtopicId="osztas-3-mal"
    grade={2}
    chapterId="osztas"
    title="2. Osztás 3-mal"
    subtitle="Csoportosítás hármasával, szétosztás 3 egyenlő részre, a harmada, ellenőrzés szorzással és maradékos osztás 3-mal."
    badge="2. OSZTÁLY • V. OSZTÁS • TANANYAG"
    themeColor="emerald"
    pdfFilename="2_osztaly_osztas_3_mal_tananyag.pdf"
    practiceTitle="Készen állsz? Gyakoroljunk!"
    practiceSubtitle="Próbáld ki magad a 3 szintes kvízben és a játékokban!"
    onBack={onBack}
    onStartQuiz={onStartQuiz}
    quickRule={{
      label: 'FONTOS — OSZTÁS 3-MAL',
      align: 'left',
      formula: (
        <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
          <div className="p-2.5 rounded-xl bg-emerald-50/90 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/80 text-center font-mono text-base sm:text-lg font-black text-emerald-900 dark:text-emerald-200">
            18 : 3 = 6, mert 6 · 3 = 18
          </div>
          <ul className="list-disc pl-4 space-y-1 text-xs sm:text-sm">
            <li>Hány hármas csoport lesz? Vagy: mennyi jut egynek, ha 3 felé osztunk?</li>
            <li>A 18 <strong>harmada</strong> 6.</li>
            <li>Ha marad valami, az csak <strong>1 vagy 2</strong> lehet.</li>
          </ul>
        </div>
      )
    }}
  >
    <TheorySection title="1. Mit tanulunk?" badge="Osztás 3-mal" badgeColor="emerald">
      <div className="space-y-2">
        <P>A 3-as szorzótáblát már tudod. Most <strong>3-mal osztunk</strong>.</P>
        <P>Kétféle feladat van: <strong>hármasával csoportosítunk</strong>, vagy <strong>3 egyenlő részre osztunk</strong>.</P>
        <P>A végén megnézzük, mi történik, ha <strong>marad</strong> valami.</P>
      </div>
    </TheorySection>

    <TheorySection title="2. Csoportosítás hármasával" badge="Hány csoport?" badgeColor="blue">
      <GroupByThreeSvg />
      <TheoryCard title="Hányszor van meg a 3 a 12-ben?" badge="12 : 3" badgeColor="blue">
        <P>Karikázz be mindig 3-at! 4 karika lett. Tehát <strong>12 : 3 = 4</strong>. Ellenőrzés: 4 · 3 = 12.</P>
      </TheoryCard>
    </TheorySection>

    <TheorySection title="3. Szétosztás 3 egyenlő részre" badge="Mennyi jut egynek?" badgeColor="rose">
      <ShareThreePlatesSvg />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TheoryCard title="Körbe, egyesével" badge="Körbeosztás" badgeColor="rose">
          <P>Mindhárom tányérra tegyél egyet, aztán megint egyet-egyet, amíg el nem fogy.</P>
        </TheoryCard>
        <TheoryCard title="A harmada" badge="15 : 3 = 5" badgeColor="amber">
          <P>Ha 3 egyenlő részre osztod a 15-öt, egy rész 5. A 15 <strong>harmada</strong> 5.</P>
        </TheoryCard>
      </div>
    </TheorySection>

    <TheorySection title="4. Osztás és szorzás – a 3-as tábla" badge="Kapcsolat" badgeColor="purple">
      <TripleThirdSvg />
      <TheoryTable
        headers={['Osztás', 'Mert', 'Osztás', 'Mert']}
        rows={[
          ['3 : 3 = 1', '1 · 3 = 3', '18 : 3 = 6', '6 · 3 = 18'],
          ['6 : 3 = 2', '2 · 3 = 6', '21 : 3 = 7', '7 · 3 = 21'],
          ['9 : 3 = 3', '3 · 3 = 9', '24 : 3 = 8', '8 · 3 = 24'],
          ['12 : 3 = 4', '4 · 3 = 12', '27 : 3 = 9', '9 · 3 = 27'],
          ['15 : 3 = 5', '5 · 3 = 15', '30 : 3 = 10', '10 · 3 = 30']
        ]}
      />
      <TheoryCallout type="info" title="0 : 3 = 0">
        Ha nincs semmi, 3 felé osztva is mindenkinek <strong>0</strong> jut: <strong>0 : 3 = 0</strong>.
      </TheoryCallout>
    </TheorySection>

    <TheorySection title="5. Maradékos osztás 3-mal" badge="Maradék" badgeColor="amber">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
        <RemainderGroupsSvg />
        <JumpBackRemSvg />
      </div>
      <P>
        Nem mindig jön ki pontosan. 14 korongból 4 hármas csoport lesz, és <strong>2 marad</strong>. Így mondjuk: <strong>14-ben a 3 megvan 4-szer, maradt 2</strong>.
      </P>
      <RemainderRuleSvg />
      <TheoryCallout type="tip" title="A maradék kisebb, mint 3">
        Hármasával csoportosítva csak <strong>0, 1 vagy 2</strong> maradhat. Ha 3 maradna, abból még egy csoport lenne!
      </TheoryCallout>
    </TheorySection>

    <TheorySection title="6. Nézzük meg együtt!" badge="Mintapéldák" badgeColor="sky">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <TheoryCard title="A) Tolltartók" badge="21 : 3" badgeColor="sky">
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
            <li>21 ceruza, 3 tolltartó, egyenlően.</li>
            <li>Melyik szám · 3 = 21? A <strong>7</strong>.</li>
            <li>Egy tolltartóba <strong>7</strong> ceruza jut.</li>
          </ul>
        </TheoryCard>
        <TheoryCard title="B) Golyók dobozban" badge="17 golyó" badgeColor="amber">
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
            <li>Egy dobozba 3 golyó fér.</li>
            <li>5 · 3 = 15, a 6 · 3 = 18 már sok.</li>
            <li><strong>5 doboz</strong> telik meg, maradt <strong>2</strong>.</li>
          </ul>
        </TheoryCard>
        <TheoryCard title="C) Melyik szám harmada?" badge="□ : 3 = 4" badgeColor="emerald">
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
            <li>Melyik szám harmada a 4?</li>
            <li>Szorozz vissza: 4 · 3 = 12.</li>
            <li>□ = <strong>12</strong>, mert 12 : 3 = 4.</li>
          </ul>
        </TheoryCard>
      </div>
    </TheorySection>

    <TheorySection title="7. Vigyázz!" badge="Csapda" badgeColor="rose">
      <TheoryTrapBox
        title="Túl nagy maradék"
        wrong="16 korong: 4 csoport, maradt 4"
        wrongExplanation="A 4 maradékból még egy hármas csoport lesz!"
        correct="16 korong: 5 csoport, maradt 1"
        correctExplanation="5 · 3 = 15, és 15 + 1 = 16."
        tip="A maradék mindig kisebb, mint 3."
      />
      <TheoryCallout type="warning" title="Az osztás nem kivonás!">
        <strong>12 : 3</strong> nem 9! A 12 − 3 = 9 kivonás. Osztásnál azt keressük: hányszor van meg a 3 a 12-ben? <strong>4-szer</strong>.
      </TheoryCallout>
    </TheorySection>

    <TheorySection title="8. Labor I: Szétosztás 3 tányérra" badge="Interaktív labor" badgeColor="sky">
      <ShareLab3 />
    </TheorySection>

    <TheorySection title="9. Labor II: Karikázz hármasával!" badge="Interaktív labor" badgeColor="emerald">
      <GroupLab3 />
    </TheorySection>
  </TheoryTemplate>
);

export default Div3G2Theory;
