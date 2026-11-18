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
  AnalogySubSvg,
  FromRoundTenSvg,
  TakeTensSvg,
  BackBridgeSvg,
  TwoDigitBackSvg,
  CheckByAddingSvg
} from './Sub50G2Figures';
import { BackJumpLab, TakeAwayLab } from './Sub50G2Parts';

export const Sub50G2Theory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => (
  <TheoryTemplate
    topicId="g2-numbers-to-50"
    subtopicId="kivonas-50-es-szamkor"
    grade={2}
    chapterId="szamolas-50-ig"
    title="3. Kivonás 50-es számkör"
    subtitle="Kivonás tízesátlépés nélkül és tízesátlépéssel (vissza a kerek tízesig), kerek tízesből, kétjegyű szám kivonása, ellenőrzés összeadással."
    badge="2. OSZTÁLY • II. SZÁMKÖRBŐVÍTÉS ÉS SZÁMOLÁS 50-IG • TANANYAG"
    themeColor="violet"
    pdfFilename="2_osztaly_kivonas_50_es_szamkor_tananyag.pdf"
    practiceTitle="Készen állsz? Gyakoroljunk!"
    practiceSubtitle="Próbáld ki magad a 3 szintes kvízben és a játékokban!"
    onBack={onBack}
    onStartQuiz={onStartQuiz}
    quickRule={{
      label: 'FONTOS — ELŐBB VISSZA A KEREK TÍZESIG!',
      align: 'left',
      formula: (
        <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
          <div className="p-2.5 rounded-xl bg-violet-50/90 dark:bg-violet-950/50 border border-violet-200 dark:border-violet-800/80 text-center font-mono text-sm sm:text-base font-black text-violet-900 dark:text-violet-200">
            32 − 5 = 32 − 2 − 3 = 30 − 3 = 27
          </div>
          <ul className="list-disc pl-4 space-y-1 text-xs">
            <li><strong>Tízesátlépés nélkül:</strong> 37 − 3 = 34 (mert 7 − 3 = 4).</li>
            <li><strong>Kétjegyű szám:</strong> előbb a tízest, aztán az egyest: 28 − 13 = 18 − 3 = 15.</li>
            <li><strong>Ellenőrzés:</strong> 27 + 5 = 32.</li>
          </ul>
        </div>
      )
    }}
  >
    <TheorySection title="1. Mit tanulunk?" badge="Kivonás 50-ig" badgeColor="violet">
      <div className="space-y-2 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
        <p>20-ig már ügyesen vonsz ki. Most <strong>50-ig</strong> számolunk!</p>
        <p>Ha kevés az egyes, <strong>előbb ugorj vissza a kerek tízesig</strong>, aztán tovább.</p>
      </div>
    </TheorySection>

    <TheorySection title="2. Tízesátlépés nélkül — a kistesó segít" badge="Analógia" badgeColor="teal">
      <AnalogySubSvg />
      <TheoryTable
        headers={['Kicsi', 'Nagy', 'Még nagyobb']}
        rows={[
          ['8 − 6 = 2', '28 − 6 = 22', '48 − 6 = 42'],
          ['9 − 2 = 7', '29 − 2 = 27', '39 − 2 = 37'],
          ['6 − 6 = 0', '36 − 6 = 30', '46 − 6 = 40']
        ]}
      />
    </TheorySection>

    <TheorySection title="3. Tízesek elvétele és kerek tízesből" badge="Rudak" badgeColor="purple">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
        <TakeTensSvg />
        <FromRoundTenSvg />
      </div>
      <TheoryCallout type="info" title="Ha nincs elég kocka">
        A 30-ban nincs egyes. Bonts fel <strong>1 rudat 10 kockára</strong>, és abból vegyél el: 30 − 4 = 26.
      </TheoryCallout>
    </TheorySection>

    <TheorySection title="4. Tízesátlépéssel — bontás" badge="Fő módszer" badgeColor="orange">
      <BackBridgeSvg />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <TheoryCard title="1. Vissza a kerek tízesig" badge="32 → 30" badgeColor="emerald">
          <p className="text-sm text-slate-700 dark:text-slate-300">A 32-ből <strong>2</strong>-t vegyél el: 30.</p>
        </TheoryCard>
        <TheoryCard title="2. Bontsd fel!" badge="5 = 2 + 3" badgeColor="blue">
          <p className="text-sm text-slate-700 dark:text-slate-300">Az 5-ből 2 már megvan. Még <strong>3</strong> kell.</p>
        </TheoryCard>
        <TheoryCard title="3. Tovább!" badge="30 − 3" badgeColor="amber">
          <p className="text-sm text-slate-700 dark:text-slate-300">30 − 3 = <strong>27</strong>. Tehát 32 − 5 = 27.</p>
        </TheoryCard>
      </div>
      <TheoryTable
        headers={['Feladat', 'Vissza a kerek tízesig', 'Még ennyit', 'Eredmény']}
        rows={[
          ['41 − 6', '41 − 1 = 40', '5', '35'],
          ['34 − 8', '34 − 4 = 30', '4', '26'],
          ['23 − 7', '23 − 3 = 20', '4', '16'],
          ['46 − 9', '46 − 6 = 40', '3', '37']
        ]}
      />
    </TheorySection>

    <TheorySection title="5. Kétjegyű szám kivonása" badge="Tízes, aztán egyes" badgeColor="purple">
      <TwoDigitBackSvg />
      <TheoryCallout type="info" title="Két lépésben">
        Először vedd el a <strong>tízest</strong>, aztán az <strong>egyest</strong>. Ha kell, az egyesnél ugorj vissza a kerek tízesig!
      </TheoryCallout>
    </TheorySection>

    <TheorySection title="6. Ellenőrzés összeadással" badge="Visszafelé" badgeColor="emerald">
      <CheckByAddingSvg />
      <p className="text-sm text-slate-700 dark:text-slate-300">
        Ami maradt, meg amit elvettél: együtt ugyanannyi, amennyi volt. Így a <strong>hiányzó számot</strong> is megtalálod: 50 − □ = 41 → 41 + 9 = 50, □ = 9.
      </p>
    </TheorySection>

    <TheorySection title="7. Nézzük meg együtt!" badge="Mintapéldák" badgeColor="sky">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <TheoryCard title="A) 43 − 7" badge="tízesátlépés" badgeColor="orange">
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
            <li>43 − 3 = 40.</li>
            <li>7 = 3 + <strong>4</strong>.</li>
            <li>40 − 4 = <strong>36</strong>.</li>
          </ul>
        </TheoryCard>
        <TheoryCard title="B) 45 − 18" badge="kétjegyű" badgeColor="purple">
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
            <li>Tízes: 45 − 10 = 35.</li>
            <li>Egyes: 35 − 8 = 35 − 5 − 3.</li>
            <li>30 − 3 = <strong>27</strong>.</li>
          </ul>
        </TheoryCard>
        <TheoryCard title="C) Ellenőrizd!" badge="27 + 18" badgeColor="emerald">
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
            <li>27 + 10 = 37.</li>
            <li>37 + 8 = 37 + 3 + 5 = 45.</li>
            <li>Megvan a 45, tehát jó!</li>
          </ul>
        </TheoryCard>
      </div>
    </TheorySection>

    <TheorySection title="8. Vigyázz!" badge="Csapda" badgeColor="rose">
      <TheoryTrapBox
        title="Ne fordítsd meg az egyeseket!"
        wrong="32 − 5 = 33"
        wrongExplanation="Itt valaki 5 − 2 = 3-at számolt. De a 32-ből kell elvenni az 5-öt, nem fordítva!"
        correct="32 − 5 = 32 − 2 − 3 = 27"
        correctExplanation="Előbb vissza a 30-ig, aztán még 3-at."
        tip="Kivonásnál az eredmény mindig kisebb, mint amiből elvettél!"
      />
      <TheoryCallout type="warning" title="Vigyázz a jelre!">
        A <strong>−</strong> jel elvételt jelent. 29 − 6 = 23, nem 35! A 35 az összeadás eredménye lenne.
      </TheoryCallout>
    </TheorySection>

    <TheorySection title="9. Labor I: Visszaugrás a kerek tízesig" badge="Interaktív labor" badgeColor="violet">
      <BackJumpLab />
    </TheorySection>

    <TheorySection title="10. Labor II: Vegyél el rudakból és kockákból!" badge="Interaktív labor" badgeColor="amber">
      <TakeAwayLab />
    </TheorySection>
  </TheoryTemplate>
);

export default Sub50G2Theory;
