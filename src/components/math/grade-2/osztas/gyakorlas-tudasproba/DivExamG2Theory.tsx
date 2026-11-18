import React from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable,
} from '../TheoryTemplate';
import { GroupingSvg, SharingSvg, FamilySvg, PartsSvg, RemainderSvg, RoundUpSvg } from './DivExamG2Figures';
import { DivMixLab, RemainderLab } from './DivExamG2Parts';

const P: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300">{children}</p>
);

export const DivExamG2Theory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => (
  <TheoryTemplate
    topicId="g2-division"
    subtopicId="gyakorlas-tudasproba"
    grade={2}
    chapterId="osztas"
    title="10. Gyakorlás, tudáspróba"
    subtitle="Az V. témakör összefoglalása: bennfoglalás és szétosztás, az osztás minden táblája, ellenőrzés szorzással, maradékos osztás és „hány kell?”."
    badge="2. OSZTÁLY • V. OSZTÁS • TANANYAG"
    themeColor="purple"
    pdfFilename="2_osztaly_osztas_tudasproba_tananyag.pdf"
    practiceTitle="Készen állsz a nagy tudáspróbára?"
    practiceSubtitle="Próbáld ki magad a 90 feladatos, 3 szintes kvízben, vagy játssz a Párosítóval és a Csoportosítóval!"
    onBack={onBack}
    onStartQuiz={onStartQuiz}
    quickRule={{
      label: 'A LEGFONTOSABB SZABÁLYOK',
      align: 'left',
      formula: (
        <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
          <div className="p-2.5 rounded-xl bg-purple-50/90 dark:bg-purple-950/50 border border-purple-200 dark:border-purple-800/80 text-center font-mono text-base sm:text-lg font-black text-purple-900 dark:text-purple-200">
            24 : 6 = 4, mert 4 · 6 = 24
          </div>
          <ul className="list-disc pl-4 space-y-1 text-xs sm:text-sm">
            <li>Az osztást mindig ellenőrizd szorzással!</li>
            <li>
              Maradékos osztás: <strong>Ennyi csoport: 5, ennyi maradt: 3</strong>. Ellenőrzés: 5 · 4 + 3 = 23.
            </li>
            <li>A maradék mindig kevesebb, mint amivel osztunk.</li>
          </ul>
        </div>
      ),
    }}
  >
    <TheorySection title="1. Amit már tudsz" badge="Ismétlés" badgeColor="blue">
      <P>Megtanultad az osztást minden számmal 2-től 10-ig. Itt egy kis emlékeztető:</P>
      <TheoryTable
        headers={['Lecke', 'Osztások', 'Segítség']}
        rows={[
          ['1. Osztás 2-vel', '2 : 2 = 1 … 20 : 2 = 10', 'fele: párokba rakod'],
          ['2. Osztás 3-mal', '3 : 3 = 1 … 30 : 3 = 10', 'harmada'],
          ['3. Osztás 4-gyel', '4 : 4 = 1 … 40 : 4 = 10', 'negyede: felezd kétszer'],
          ['4. Osztás 5-tel', '5 : 5 = 1 … 50 : 5 = 10', 'ötöde: hány kéz?'],
          ['5. Osztás 6-tal', '6 : 6 = 1 … 60 : 6 = 10', 'hatoda'],
          ['6. Osztás 7-tel', '7 : 7 = 1 … 70 : 7 = 10', 'hetede: hány hét?'],
          ['7. Osztás 8-cal', '8 : 8 = 1 … 80 : 8 = 10', 'nyolcada: felezd háromszor'],
          ['8. Osztás 9-cel', '9 : 9 = 1 … 90 : 9 = 10', 'kilencede'],
          ['9. Osztás 10-zel', '10 : 10 = 1 … 100 : 10 = 10', 'tizede: hány tízes?'],
        ]}
      />
    </TheorySection>

    <TheorySection title="2. Kétféle osztás" badge="Csoportosítás és szétosztás" badgeColor="violet">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TheoryCard title="Hány csoport lesz?" badge="bennfoglalás" badgeColor="violet">
          <GroupingSvg />
        </TheoryCard>
        <TheoryCard title="Mennyi jut egyre?" badge="szétosztás" badgeColor="orange">
          <SharingSvg />
        </TheoryCard>
      </div>
      <TheoryCallout type="tip" title="Mindkettő osztás">
        A „hány 4-es van benne?” és a „mennyi jut egy tányérra?” kérdést is osztással oldjuk meg.
      </TheoryCallout>
    </TheorySection>

    <TheorySection title="3. A szorzás segít" badge="Műveletcsalád" badgeColor="purple">
      <FamilySvg />
      <P>
        Ha tudod, hogy <strong>6 · 8 = 48</strong>, akkor azt is tudod, hogy <strong>48 : 6 = 8</strong> és <strong>48 : 8 = 6</strong>.
      </P>
      <TheoryCallout type="success" title="Ellenőrzés">
        Az eredményt szorozd meg azzal, amivel osztottál. Ha visszakapod a kezdő számot, jól számoltál!
      </TheoryCallout>
    </TheorySection>

    <TheorySection title="4. Fele, harmada, negyede …" badge="-ad része" badgeColor="emerald">
      <PartsSvg />
      <P>
        A <strong>harmada</strong> azt jelenti: 3 egyenlő részre osztjuk. A 24 harmada: 24 : 3 = <strong>8</strong>.
      </P>
    </TheorySection>

    <TheorySection title="5. Maradékos osztás" badge="Marad valami" badgeColor="orange">
      <RemainderSvg />
      <TheoryTable
        headers={['Ennyi volt', 'Csoportosítsd', 'Ennyi csoport', 'Ennyi maradt', 'Ellenőrzés']}
        rows={[
          ['23', '4-esével', '5', '3', '5 · 4 + 3 = 23'],
          ['17', '5-ösével', '3', '2', '3 · 5 + 2 = 17'],
          ['40', '6-osával', '6', '4', '6 · 6 + 4 = 40'],
          ['58', '7-esével', '8', '2', '8 · 7 + 2 = 58'],
        ]}
      />
    </TheorySection>

    <TheorySection title="6. Hány kell?" badge="Mindenkinek legyen helye" badgeColor="sky">
      <RoundUpSvg />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TheoryCard title="Hány lesz tele?" badge="a maradék kimarad" badgeColor="emerald">
          <P>34 tojás, egy dobozba 6 fér: 5 doboz lesz tele (30 tojás), 4 tojás marad.</P>
        </TheoryCard>
        <TheoryCard title="Hány kell?" badge="+ 1 a maradéknak" badgeColor="rose">
          <P>Hogy mind a 34 tojás elférjen, kell még egy doboz: 5 + 1 = 6 doboz.</P>
        </TheoryCard>
      </div>
    </TheorySection>

    <TheorySection title="7. Nézzük meg együtt!" badge="Mintapéldák" badgeColor="sky">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <TheoryCard title="A) Szétosztás" badge="56 : 8" badgeColor="violet">
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
            <li>56 labdát 8 csapat kap egyformán.</li>
            <li>Hányszor 8 lesz 56? 7 · 8 = 56.</li>
            <li>Egy csapat <strong>7</strong> labdát kap.</li>
          </ul>
        </TheoryCard>
        <TheoryCard title="B) Maradékkal" badge="31 korong" badgeColor="orange">
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
            <li>31 korongot 9-esével rakunk.</li>
            <li>3 · 9 = 27, 4 · 9 = 36 már sok.</li>
            <li>Ennyi csoport: <strong>3</strong>, ennyi maradt: <strong>4</strong>.</li>
            <li>Ellenőrzés: 3 · 9 + 4 = 31.</li>
          </ul>
        </TheoryCard>
        <TheoryCard title="C) Két lépés" badge="a 40 negyedének fele" badgeColor="emerald">
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
            <li>Előbb: 40 : 4 = 10.</li>
            <li>Aztán: 10 : 2 = 5.</li>
            <li>A válasz: <strong>5</strong>.</li>
          </ul>
        </TheoryCard>
      </div>
    </TheorySection>

    <TheorySection title="8. Vigyázz!" badge="Csapda" badgeColor="rose">
      <TheoryTrapBox
        title="Túl nagy maradék"
        wrong="22 korong 5-ösével: 3 csoport, maradt 7"
        wrongExplanation="A 7-ből még egy 5-ös csoport kijön! A maradék nem lehet 5 vagy több."
        correct="4 csoport, maradt 2"
        correctExplanation="Ellenőrzés: 4 · 5 + 2 = 22, és a 2 kevesebb, mint 5."
        tip="Mindig nézd meg: a maradék kisebb, mint amivel osztasz?"
      />
      <TheoryCallout type="warning" title="Az osztás nem kivonás">
        A 24 : 6 nem 18! A 24 − 6 = 18 kivonás. Osztásnál azt keresed, hányszor van meg a 6 a 24-ben: <strong>4</strong>-szer.
      </TheoryCallout>
    </TheorySection>

    <TheorySection title="9. Labor I: Vegyes osztás-gyakorló" badge="Interaktív labor" badgeColor="violet">
      <P>Válaszd ki, mivel osztunk, és milyen feladatot kérsz. Minden jó válasz egy pont!</P>
      <DivMixLab />
    </TheorySection>

    <TheorySection title="10. Labor II: Maradék-edző" badge="Interaktív labor" badgeColor="amber">
      <P>Csoportosítsd fejben a korongokat! Jó válasz után kiszínezzük a csoportokat.</P>
      <RemainderLab />
    </TheorySection>
  </TheoryTemplate>
);

export default DivExamG2Theory;
