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
  FingersToHandsSvg,
  SharePlatesSvg,
  FifthArrowsSvg,
  BackJumpsSvg,
  RemainderGroupsSvg
} from './Div5G2Figures';
import { PlatesLab, PackLab } from './Div5G2Parts';

const P: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300">{children}</p>
);

export const Div5G2Theory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => (
  <TheoryTemplate
    topicId="g2-division"
    subtopicId="osztas-5-tel"
    grade={2}
    chapterId="osztas"
    title="4. Osztás 5-tel"
    subtitle="Hány ötös van benne? Szétosztás 5 egyforma részre, az ötöde, és a maradékos osztás 5-tel."
    badge="2. OSZTÁLY • V. OSZTÁS • TANANYAG"
    themeColor="amber"
    pdfFilename="2_osztaly_osztas_5_tel_tananyag.pdf"
    practiceTitle="Készen állsz? Gyakoroljunk!"
    practiceSubtitle="Próbáld ki magad a 3 szintes kvízben és a játékokban!"
    onBack={onBack}
    onStartQuiz={onStartQuiz}
    quickRule={{
      label: 'FONTOS — OSZTÁS 5-TEL',
      align: 'left',
      formula: (
        <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
          <div className="p-2.5 rounded-xl bg-amber-50/90 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800/80 text-center font-mono text-sm sm:text-base font-black text-amber-900 dark:text-amber-200">
            30 : 5 = 6, mert 6 · 5 = 30
          </div>
          <ul className="list-disc pl-4 space-y-1 text-xs sm:text-sm">
            <li><strong>Hány 5 van benne?</strong> Számolj ötösével!</li>
            <li><strong>Az ötöde:</strong> osszuk 5 egyforma részre.</li>
            <li><strong>Maradékkal:</strong> 23 = 4 · 5 + 3. A maradék kisebb 5-nél.</li>
          </ul>
        </div>
      )
    }}
  >
    <TheorySection title="1. Mit tanulunk?" badge="Osztás 5-tel" badgeColor="amber">
      <div className="space-y-2">
        <P>Már tudod az 5-ös szorzótáblát. Most <strong>visszafelé</strong> gondolkodunk!</P>
        <P>Megnézzük, hány ötös van egy számban. Szétosztunk 5 egyforma részre. És megtanuljuk, mi történik, ha <strong>marad</strong> valami.</P>
      </div>
    </TheorySection>

    <TheorySection title="2. Hány ötös van benne?" badge="Bennfoglalás" badgeColor="orange">
      <FingersToHandsSvg />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TheoryCard title="Csoportosíts ötösével!" badge="15 : 5 = 3" badgeColor="orange">
          <P>15 ujjat látok. Ötösével karikázom: 3 karika lett. Ez 3 kéz.</P>
        </TheoryCard>
        <TheoryCard title="Pénzzel" badge="25 Ft" badgeColor="amber">
          <P>Hány 5 Ft-os kell 25 Ft-hoz? 5, 10, 15, 20, 25 – <strong>5 érme</strong>. 25 : 5 = 5.</P>
        </TheoryCard>
      </div>
      <BackJumpsSvg />
      <TheoryCallout type="tip" title="Ugrálj visszafelé!">
        A számegyenesen a 35-től ötösével visszaugrálsz a 0-ig. Számold az ugrásokat: 7. Tehát <strong>35 : 5 = 7</strong>.
      </TheoryCallout>
    </TheorySection>

    <TheorySection title="3. Szétosztás 5 egyforma részre" badge="Részekre osztás" badgeColor="sky">
      <SharePlatesSvg />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TheoryCard title="Körönként osztunk" badge="1, 2, 3, 4" badgeColor="sky">
          <P>Minden körben mind az 5 tányér kap 1 kekszet. 4 kör után elfogy a 20 keksz. Egy tányérra <strong>4</strong> jut.</P>
        </TheoryCard>
        <TheoryCard title="Ugyanaz a jel" badge="20 : 5 = 4" badgeColor="blue">
          <P>Mindkét kérdést így írjuk: <strong>20 : 5 = 4</strong>. Ellenőrizd: 4 · 5 = 20.</P>
        </TheoryCard>
      </div>
    </TheorySection>

    <TheorySection title="4. Ötszöröse és ötöde – az osztótábla" badge="Kapcsolat" badgeColor="emerald">
      <FifthArrowsSvg />
      <TheoryTable
        headers={['Szorzás', 'Osztás', 'Szorzás', 'Osztás']}
        rows={[
          ['1 · 5 = 5', '5 : 5 = 1', '6 · 5 = 30', '30 : 5 = 6'],
          ['2 · 5 = 10', '10 : 5 = 2', '7 · 5 = 35', '35 : 5 = 7'],
          ['3 · 5 = 15', '15 : 5 = 3', '8 · 5 = 40', '40 : 5 = 8'],
          ['4 · 5 = 20', '20 : 5 = 4', '9 · 5 = 45', '45 : 5 = 9'],
          ['5 · 5 = 25', '25 : 5 = 5', '10 · 5 = 50', '50 : 5 = 10']
        ]}
      />
      <TheoryCallout type="info" title="A nulla">
        <strong>0 : 5 = 0.</strong> Ha nincs mit szétosztani, senki nem kap semmit.
      </TheoryCallout>
    </TheorySection>

    <TheorySection title="5. Maradékos osztás 5-tel" badge="Maradék" badgeColor="rose">
      <RemainderGroupsSvg />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TheoryCard title="Mindig van teli ötös?" badge="23 golyó" badgeColor="rose">
          <P>23 golyót ötösével zacskózunk. 4 zacskó lesz tele (20 golyó). <strong>3 golyó marad.</strong></P>
        </TheoryCard>
        <TheoryCard title="Így írjuk le" badge="4 · 5 + 3 = 23" badgeColor="purple">
          <P>4 teli ötös, meg 3 maradék: <strong>4 · 5 + 3 = 23</strong>. Teli ötösök: □, maradék: ○.</P>
        </TheoryCard>
      </div>
      <TheoryTable
        headers={['Ennyi van', 'Teli ötös', 'Marad', 'Leírva']}
        rows={[
          ['12', '2', '2', '2 · 5 + 2 = 12'],
          ['29', '5', '4', '5 · 5 + 4 = 29'],
          ['36', '7', '1', '7 · 5 + 1 = 36'],
          ['40', '8', '0', '8 · 5 + 0 = 40']
        ]}
      />
    </TheorySection>

    <TheorySection title="6. Nézzük meg együtt!" badge="Mintapéldák" badgeColor="sky">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <TheoryCard title="A) Matricák" badge="35 : 5" badgeColor="sky">
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
            <li>5 barát 35 matricán osztozik.</li>
            <li>Melyik szám · 5 = 35? A 7.</li>
            <li>Mindenki <strong>7</strong> matricát kap.</li>
          </ul>
        </TheoryCard>
        <TheoryCard title="B) Körhinta" badge="maradékkal" badgeColor="orange">
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
            <li>32 zsetonod van, 1 menet 5 zseton.</li>
            <li>6 · 5 = 30, a 7 · 5 = 35 már sok.</li>
            <li><strong>6 menet</strong>, és 2 zseton marad.</li>
          </ul>
        </TheoryCard>
        <TheoryCard title="C) Ötször annyi" badge="40 : 5" badgeColor="emerald">
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
            <li>40 gyöngy ötször annyi, mint a gomb.</li>
            <li>A gomb a 40 ötöde.</li>
            <li>40 : 5 = <strong>8</strong> gomb.</li>
          </ul>
        </TheoryCard>
      </div>
    </TheorySection>

    <TheorySection title="7. Vigyázz!" badge="Csapda" badgeColor="rose">
      <TheoryTrapBox
        title="A maradék nem lehet 5 vagy több!"
        wrong="23 = 3 · 5 + 8"
        wrongExplanation="A 8-ból még kijön egy teli ötös! Akkor nem csomagoltál be mindent."
        correct="23 = 4 · 5 + 3"
        correctExplanation="4 teli ötös (20), és 3 marad. A 3 kisebb 5-nél."
        tip="Ellenőrizd: a maradék csak 0, 1, 2, 3 vagy 4 lehet."
      />
      <TheoryCallout type="warning" title="Figyeld a kérdést!">
        22 golyóból 4 zacskó lesz <strong>tele</strong>. De ha <strong>minden</strong> golyót el akarsz tenni, 5 zacskó kell, mert a maradék 2-nek is kell egy!
      </TheoryCallout>
    </TheorySection>

    <TheorySection title="8. Labor I: Szétosztás 5 tányérra" badge="Interaktív labor" badgeColor="orange">
      <PlatesLab />
    </TheorySection>

    <TheorySection title="9. Labor II: Csomagolj ötösével!" badge="Interaktív labor" badgeColor="blue">
      <PackLab />
    </TheorySection>
  </TheoryTemplate>
);

export default Div5G2Theory;
