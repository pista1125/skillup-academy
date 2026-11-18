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
  GroupingBoxesSvg,
  SharingPlatesSvg,
  EighthArrowsSvg,
  HalveThriceSvg,
  RemainderGroupsSvg,
  RoundUpTablesSvg
} from './Div8G2Figures';
import { ShareLab, RemainderLab } from './Div8G2Parts';

const P: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300">{children}</p>
);

export const Div8G2Theory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => (
  <TheoryTemplate
    topicId="g2-division"
    subtopicId="osztas-8-cal"
    grade={2}
    chapterId="osztas"
    title="7. Osztás 8-cal"
    subtitle="Nyolcasával csoportosítunk, 8 részre osztunk, megkeressük a nyolcadát, és megtanuljuk a maradékos osztást 8-cal."
    badge="2. OSZTÁLY • V. OSZTÁS • TANANYAG"
    themeColor="indigo"
    pdfFilename="2_osztaly_osztas_8_cal_tananyag.pdf"
    practiceTitle="Készen állsz? Gyakoroljunk!"
    practiceSubtitle="Próbáld ki magad a 3 szintes kvízben és a játékokban!"
    onBack={onBack}
    onStartQuiz={onStartQuiz}
    quickRule={{
      label: 'FONTOS — OSZTÁS 8-CAL',
      align: 'left',
      formula: (
        <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
          <div className="p-2.5 rounded-xl bg-indigo-50/90 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800/80 text-center font-mono text-base sm:text-lg font-black text-indigo-900 dark:text-indigo-200">
            56 : 8 = 7, mert 7 · 8 = 56
          </div>
          <ul className="list-disc pl-4 space-y-1 text-xs sm:text-sm">
            <li>A szorzás segít: keresd meg a 8-as táblában!</li>
            <li><strong>Nyolcada:</strong> 8 egyenlő részre osztjuk. Trükk: felezd háromszor!</li>
            <li><strong>Maradék:</strong> mindig kevesebb, mint 8.</li>
          </ul>
        </div>
      )
    }}
  >
    <TheorySection title="1. Mit tanulunk?" badge="Osztás 8-cal" badgeColor="indigo">
      <div className="space-y-2">
        <P>A 8-as szorzótáblát már tudod.</P>
        <P>Most visszafelé számolunk: <strong>osztunk 8-cal</strong>.</P>
        <P>A végén azt is megnézzük, mi történik, ha <strong>marad</strong> valami.</P>
      </div>
    </TheorySection>

    <TheorySection title="2. Hány nyolcas van benne?" badge="Csoportosítás" badgeColor="emerald">
      <GroupingBoxesSvg />
      <P>24 golyó van. Egy dobozba 8 fér. Hány doboz telik meg?</P>
      <P>Rakd őket nyolcasával: 3 doboz lett. <strong>24 : 8 = 3</strong>.</P>
    </TheorySection>

    <TheorySection title="3. Osszuk szét 8 részre!" badge="Szétosztás" badgeColor="amber">
      <SharingPlatesSvg />
      <P>16 sütit 8 tányérra teszünk, mindegyikre ugyanannyit.</P>
      <P>Minden tányér kap egyet, aztán még egyet. Egy tányérra 2 jut. <strong>16 : 8 = 2</strong>.</P>
      <TheoryCallout type="info" title="Mindkettő osztás">
        Nyolcasával csoportosítunk, vagy 8 részre osztunk szét: mindkettőt így írjuk: <strong>16 : 8</strong>.
      </TheoryCallout>
    </TheorySection>

    <TheorySection title="4. A 8-as bennfoglaló tábla" badge="Szorzás segít" badgeColor="indigo">
      <TheoryTable
        headers={['Osztás', 'Mert…']}
        rows={[
          ['0 : 8 = 0', '0 · 8 = 0'],
          ['8 : 8 = 1', '1 · 8 = 8'],
          ['16 : 8 = 2', '2 · 8 = 16'],
          ['24 : 8 = 3', '3 · 8 = 24'],
          ['32 : 8 = 4', '4 · 8 = 32'],
          ['40 : 8 = 5', '5 · 8 = 40'],
          ['48 : 8 = 6', '6 · 8 = 48'],
          ['56 : 8 = 7', '7 · 8 = 56'],
          ['64 : 8 = 8', '8 · 8 = 64'],
          ['72 : 8 = 9', '9 · 8 = 72'],
          ['80 : 8 = 10', '10 · 8 = 80']
        ]}
      />
    </TheorySection>

    <TheorySection title="5. Nyolcszorosa és nyolcada" badge="Oda-vissza" badgeColor="orange">
      <EighthArrowsSvg />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TheoryCard title="Nyolcszorosa" badge="· 8" badgeColor="emerald">
          <P>Az 5 nyolcszorosa: 5 · 8 = <strong>40</strong>.</P>
        </TheoryCard>
        <TheoryCard title="Nyolcada" badge=": 8" badgeColor="rose">
          <P>A 40 nyolcada: 40 : 8 = <strong>5</strong>.</P>
        </TheoryCard>
      </div>
    </TheorySection>

    <TheorySection title="6. Trükk: felezd háromszor!" badge="2-es, 4-es, 8-as" badgeColor="sky">
      <HalveThriceSvg />
      <P>A fele fele a <strong>negyede</strong>. A negyede fele a <strong>nyolcada</strong>.</P>
      <P>48 : 8 → 48 fele 24 → 24 fele 12 → 12 fele <strong>6</strong>.</P>
      <TheoryCallout type="tip" title="A 2-es és a 4-es tábla segít">
        A 8-as tábla a 4-es duplája. Ezért a nyolcad a negyed fele: 32 negyede 8, a 8 fele <strong>4</strong>. Tehát 32 : 8 = 4.
      </TheoryCallout>
    </TheorySection>

    <TheorySection title="7. Maradékos osztás 8-cal" badge="Marad valami" badgeColor="orange">
      <RemainderGroupsSvg />
      <P>35 korongot karikázunk be nyolcasával. 4 csoport lesz, és 3 korong kimarad.</P>
      <P>A kimaradt korongok száma a <strong>maradék</strong>.</P>
      <TheoryTable
        headers={['Ennyi volt', 'Ennyi csoport', 'Ennyi maradt', 'Ellenőrzés']}
        rows={[
          ['19', '2', '3', '2 · 8 + 3 = 19'],
          ['34', '4', '2', '4 · 8 + 2 = 34'],
          ['45', '5', '5', '5 · 8 + 5 = 45'],
          ['63', '7', '7', '7 · 8 + 7 = 63'],
          ['72', '9', '0', '9 · 8 = 72']
        ]}
      />
      <RoundUpTablesSvg />
      <TheoryCallout type="tip" title="Hány asztal kell?">
        30 gyerek ül le, egy asztalhoz 8 fér. 3 asztal tele lesz, 6 gyerek marad. Nekik is kell egy asztal: <strong>4 asztal kell</strong>.
      </TheoryCallout>
    </TheorySection>

    <TheorySection title="8. Nézzük meg együtt!" badge="Mintapéldák" badgeColor="sky">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <TheoryCard title="A) Szorzás segít" badge="64 : 8" badgeColor="indigo">
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
            <li>Melyik szám · 8 = 64?</li>
            <li>8 · 8 = <strong>64</strong>.</li>
            <li>Tehát 64 : 8 = <strong>8</strong>.</li>
          </ul>
        </TheoryCard>
        <TheoryCard title="B) Szétosztás" badge="8 gyerek" badgeColor="amber">
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
            <li>8 gyerek 40 szem cseresznyén osztozik.</li>
            <li>40 : 8 = <strong>5</strong>.</li>
            <li>Mindenki 5 szemet kap.</li>
          </ul>
        </TheoryCard>
        <TheoryCard title="C) Maradékkal" badge="43 süti" badgeColor="orange">
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
            <li>43 sütit teszünk dobozba nyolcasával.</li>
            <li>5 · 8 = 40, a 6 · 8 = 48 már túl sok.</li>
            <li><strong>5 doboz</strong> lesz, és <strong>3 süti</strong> marad. 5 · 8 + 3 = 43.</li>
          </ul>
        </TheoryCard>
      </div>
    </TheorySection>

    <TheorySection title="9. Vigyázz!" badge="Csapda" badgeColor="rose">
      <TheoryTrapBox
        title="A maradék kevesebb, mint 8!"
        wrong="50 korong: 5 csoport, maradt 10"
        wrongExplanation="10 korongból még egy nyolcas csoport kijön!"
        correct="50 korong: 6 csoport, maradt 2"
        correctExplanation="6 · 8 = 48, és 48 + 2 = 50."
        tip="Ha a maradék 8 vagy több, rakj ki még egy csoportot!"
      />
      <TheoryCallout type="warning" title="Ne keverd össze!">
        Az osztásnál nem vonunk ki 8-at: <strong>40 : 8 = 5</strong>, és nem 32!
      </TheoryCallout>
    </TheorySection>

    <TheorySection title="10. Labor I: Szétosztás 8 tányérra" badge="Interaktív labor" badgeColor="indigo">
      <ShareLab />
    </TheorySection>

    <TheorySection title="11. Labor II: Maradékos osztás 8-cal" badge="Interaktív labor" badgeColor="orange">
      <RemainderLab />
    </TheorySection>
  </TheoryTemplate>
);

export default Div8G2Theory;
