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
  PackingSvg,
  SharingSvg,
  DivSignSvg,
  MultDivLinkSvg,
  HalfDoubleSvg,
  RemainderSvg
} from './Div2G2Figures';
import { ShareLab, PackLab } from './Div2G2Parts';

const P: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300">{children}</p>
);

export const Div2G2Theory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => (
  <TheoryTemplate
    topicId="g2-division"
    subtopicId="osztas-2-vel"
    grade={2}
    chapterId="osztas"
    title="1. Osztás 2-vel"
    subtitle="Csomagolás kettesével és szétosztás két részre. Megtanuljuk a : jelet, a felét, és azt, mi a maradék."
    badge="2. OSZTÁLY • V. OSZTÁS • TANANYAG"
    themeColor="blue"
    pdfFilename="2_osztaly_osztas_2_vel_tananyag.pdf"
    practiceTitle="Készen állsz? Gyakoroljunk!"
    practiceSubtitle="Próbáld ki magad a 3 szintes kvízben és a játékokban!"
    onBack={onBack}
    onStartQuiz={onStartQuiz}
    quickRule={{
      label: 'FONTOS — AZ OSZTÁS A SZORZÁS PÁRJA',
      align: 'left',
      formula: (
        <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
          <div className="p-2.5 rounded-xl bg-blue-50/90 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800/80 text-center font-mono text-base sm:text-lg font-black text-blue-900 dark:text-blue-200">
            12 : 2 = 6, mert 6 · 2 = 12
          </div>
          <ul className="list-disc pl-4 space-y-1 text-xs sm:text-sm">
            <li>Olvasd így: <strong>12 osztva 2-vel egyenlő 6</strong>.</li>
            <li>Csomagolhatsz kettesével, vagy oszthatsz 2 egyenlő részre.</li>
            <li>A 12 <strong>fele</strong> 6.</li>
          </ul>
        </div>
      )
    }}
  >
    <TheorySection title="1. Mit tanulunk?" badge="Új művelet" badgeColor="blue">
      <div className="space-y-2">
        <P>Ma egy új műveletet tanulunk: az <strong>osztást</strong>.</P>
        <P>Kétféleképpen oszthatunk: <strong>csomagolunk</strong>, vagy <strong>szétosztunk</strong>.</P>
        <P>A szorzás segít ellenőrizni. A végén megnézzük, mi az a <strong>maradék</strong>.</P>
      </div>
    </TheorySection>

    <TheorySection title="2. Csomagolás kettesével (bennfoglalás)" badge="Hány csomag?" badgeColor="emerald">
      <PackingSvg />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TheoryCard title="Hányszor van meg?" badge="2 + 2 + 2 + 2 + 2" badgeColor="emerald">
          <P>Mindig 2 korongot teszel egy csomagba.</P>
          <P>5 csomag lesz, mert <strong>2 + 2 + 2 + 2 + 2 = 10</strong>.</P>
        </TheoryCard>
        <TheoryCard title="Így írjuk" badge="10 : 2 = 5" badgeColor="teal">
          <P>A 10-ben a 2 megvan <strong>5-ször</strong>.</P>
          <P>Ezt a műveletet <strong>bennfoglalásnak</strong> hívjuk.</P>
        </TheoryCard>
      </div>
    </TheorySection>

    <TheorySection title="3. Szétosztás 2 egyenlő részre" badge="Mennyi jut egynek?" badgeColor="sky">
      <SharingSvg />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TheoryCard title="Igazságosan osztunk" badge="1-1, 1-1 …" badgeColor="sky">
          <P>Mindkét tányérra 1-1 sütit teszel, amíg el nem fogy.</P>
          <P>Mindkét tányérra <strong>4</strong> süti jut.</P>
        </TheoryCard>
        <TheoryCard title="A fele" badge="8 : 2 = 4" badgeColor="blue">
          <P>Ha 2 egyenlő részre osztunk, megkapjuk a szám <strong>felét</strong>.</P>
          <P>Ez az <strong>egyenlő részekre osztás</strong>.</P>
        </TheoryCard>
      </div>
      <TheoryCallout type="info" title="Mindkettő osztás!">
        A bennfoglalást és az egyenlő részekre osztást is <strong>osztásnak</strong> nevezzük. A jele: <strong>:</strong>
      </TheoryCallout>
    </TheorySection>

    <TheorySection title="4. Az osztás jele és a szorzás" badge="Kapcsolat" badgeColor="purple">
      <DivSignSvg />
      <MultDivLinkSvg />
      <TheoryTable
        headers={['Szorzás', 'Osztás', 'Szorzás', 'Osztás']}
        rows={[
          ['1 · 2 = 2', '2 : 2 = 1', '6 · 2 = 12', '12 : 2 = 6'],
          ['2 · 2 = 4', '4 : 2 = 2', '7 · 2 = 14', '14 : 2 = 7'],
          ['3 · 2 = 6', '6 : 2 = 3', '8 · 2 = 16', '16 : 2 = 8'],
          ['4 · 2 = 8', '8 : 2 = 4', '9 · 2 = 18', '18 : 2 = 9'],
          ['5 · 2 = 10', '10 : 2 = 5', '10 · 2 = 20', '20 : 2 = 10']
        ]}
      />
      <HalfDoubleSvg />
      <TheoryCallout type="tip" title="Fele és kétszerese">
        A 18 <strong>fele</strong> 9. A 9 <strong>kétszerese</strong> 18. Ez is egy pár!
      </TheoryCallout>
    </TheorySection>

    <TheorySection title="5. Marad-e valami?" badge="Maradék" badgeColor="rose">
      <RemainderSvg />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TheoryCard title="Páros szám" badge="12 → 6 és 6" badgeColor="emerald">
          <P>A páros számot 2 felé osztva <strong>nem marad semmi</strong>.</P>
        </TheoryCard>
        <TheoryCard title="Páratlan szám" badge="11 → 5 és 5, marad 1" badgeColor="rose">
          <P>A páratlan számnál <strong>1 marad</strong>. Ennek a neve: <strong>maradék</strong>.</P>
        </TheoryCard>
      </div>
    </TheorySection>

    <TheorySection title="6. Nézzük meg együtt!" badge="Mintapéldák" badgeColor="amber">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <TheoryCard title="A) Kesztyűk" badge="16 : 2" badgeColor="amber">
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
            <li>16 kesztyű van. Hány pár ez?</li>
            <li>Egy pár = 2 kesztyű.</li>
            <li>16 : 2 = <strong>8</strong> pár, mert 8 · 2 = 16.</li>
          </ul>
        </TheoryCard>
        <TheoryCard title="B) Két testvér" badge="14 : 2" badgeColor="sky">
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
            <li>14 meggy, 2 testvér, egyenlően.</li>
            <li>A 14 fele: 7 + 7 = 14.</li>
            <li>Egy testvér <strong>7</strong> szemet kap.</li>
          </ul>
        </TheoryCard>
        <TheoryCard title="C) Maradék" badge="9 dió" badgeColor="rose">
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
            <li>9 diót csomagolsz kettesével.</li>
            <li>4 csomag: 4 · 2 = 8.</li>
            <li>9 − 8 = <strong>1</strong> dió marad.</li>
          </ul>
        </TheoryCard>
      </div>
    </TheorySection>

    <TheorySection title="7. Vigyázz!" badge="Csapda" badgeColor="rose">
      <TheoryTrapBox
        title="Az osztás nem kivonás!"
        wrong="12 : 2 = 10"
        wrongExplanation="Ez a 12 − 2 lenne! Osztásnál azt keressük, hányszor van meg a 2 a 12-ben."
        correct="12 : 2 = 6"
        correctExplanation="Ellenőrizd szorzással: 6 · 2 = 12. Jó!"
        tip="Mindig ellenőrizz szorzással!"
      />
      <TheoryCallout type="warning" title="A maradék kicsi">
        Ha 2-esével csomagolsz, legfeljebb <strong>1</strong> maradhat. Ha 2 maradna, abból még egy csomag lenne!
      </TheoryCallout>
    </TheorySection>

    <TheorySection title="8. Labor I: Szétosztás két tányérra" badge="Interaktív labor" badgeColor="sky">
      <ShareLab />
    </TheorySection>

    <TheorySection title="9. Labor II: Csomagolj kettesével!" badge="Interaktív labor" badgeColor="emerald">
      <PackLab />
    </TheorySection>
  </TheoryTemplate>
);

export default Div2G2Theory;
