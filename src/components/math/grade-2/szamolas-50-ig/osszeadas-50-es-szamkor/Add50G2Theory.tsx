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
  RoundTenPlusOnesSvg,
  AnalogyTensSvg,
  FillToTenSvg,
  BridgeJumpSvg,
  TwoDigitJumpSvg,
  BlocksSumPyramidSvg
} from './Add50G2Figures';
import { BridgeJumpLab, FillUpLab } from './Add50G2Parts';

export const Add50G2Theory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => (
  <TheoryTemplate
    topicId="g2-numbers-to-50"
    subtopicId="osszeadas-50-es-szamkor"
    grade={2}
    chapterId="szamolas-50-ig"
    title="2. Összeadás 50-es számkör"
    subtitle="Kerek tízes + egyesek, összeadás tízesátlépés nélkül és tízesátlépéssel (kerek tízesig pótlással), kétjegyű számok összeadása."
    badge="2. OSZTÁLY • II. SZÁMKÖRBŐVÍTÉS ÉS SZÁMOLÁS 50-IG • TANANYAG"
    themeColor="emerald"
    pdfFilename="2_osztaly_osszeadas_50_es_szamkor_tananyag.pdf"
    practiceTitle="Készen állsz? Gyakoroljunk!"
    practiceSubtitle="Próbáld ki magad a 3 szintes kvízben és a játékokban!"
    onBack={onBack}
    onStartQuiz={onStartQuiz}
    quickRule={{
      label: 'FONTOS — ELŐBB A KEREK TÍZESIG!',
      align: 'left',
      formula: (
        <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
          <div className="p-2.5 rounded-xl bg-emerald-50/90 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/80 text-center font-mono text-sm sm:text-base font-black text-emerald-900 dark:text-emerald-200">
            26 + 7 = 26 + 4 + 3 = 30 + 3 = 33
          </div>
          <ul className="list-disc pl-4 space-y-1 text-xs">
            <li><strong>Tízesátlépés nélkül:</strong> 24 + 3 = 27 (mert 4 + 3 = 7).</li>
            <li><strong>Kétjegyű szám:</strong> előbb a tízest, aztán az egyest: 15 + 13 = 25 + 3 = 28.</li>
          </ul>
        </div>
      )
    }}
  >
    <TheorySection title="1. Mit tanulunk?" badge="Összeadás 50-ig" badgeColor="emerald">
      <div className="space-y-2 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
        <p>20-ig már ügyesen adsz össze. Most ugyanígy számolunk <strong>50-ig</strong>!</p>
        <p>A legfontosabb trükk: ha átlépjük a tízest, <strong>előbb ugorj a kerek tízesig</strong>, aztán tovább.</p>
      </div>
    </TheorySection>

    <TheorySection title="2. Kerek tízes + egyesek" badge="30 + 6" badgeColor="purple">
      <RoundTenPlusOnesSvg />
      <TheoryTable
        headers={['Feladat', 'Eredmény', 'Fordítva']}
        rows={[
          ['20 + 8', '28', '8 + 20 = 28'],
          ['30 + 6', '36', '6 + 30 = 36'],
          ['40 + 3', '43', '3 + 40 = 43'],
          ['30 + 14', '44', '14 + 30 = 44']
        ]}
      />
    </TheorySection>

    <TheorySection title="3. Tízesátlépés nélkül — a kistesó segít" badge="Analógia" badgeColor="teal">
      <AnalogyTensSvg />
      <TheoryCallout type="info" title="Csak az egyeseket nézd!">
        Ha az egyesek összege kisebb 10-nél, a tízesek nem változnak: <strong>32 + 5 = 37</strong>, mert 2 + 5 = 7.
      </TheoryCallout>
    </TheorySection>

    <TheorySection title="4. Pótlás kerek tízesig" badge="Pont 10" badgeColor="sky">
      <FillToTenSvg />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <TheoryCard title="23 + 7" badge="3 + 7 = 10" badgeColor="sky">
          <p className="text-sm text-slate-700 dark:text-slate-300">Az egyesekből egy új tízes lesz: <strong>30</strong>.</p>
        </TheoryCard>
        <TheoryCard title="38 + 2" badge="8 + 2 = 10" badgeColor="sky">
          <p className="text-sm text-slate-700 dark:text-slate-300">3 tízesből 4 tízes lesz: <strong>40</strong>.</p>
        </TheoryCard>
        <TheoryCard title="44 + □ = 50" badge="4 + 6 = 10" badgeColor="sky">
          <p className="text-sm text-slate-700 dark:text-slate-300">A 4-hez 6 kell a 10-hez. □ = <strong>6</strong>.</p>
        </TheoryCard>
      </div>
    </TheorySection>

    <TheorySection title="5. Tízesátlépéssel — bontás" badge="Fő módszer" badgeColor="orange">
      <BridgeJumpSvg />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <TheoryCard title="1. Mennyi kell a kerek tízesig?" badge="26 → 30" badgeColor="emerald">
          <p className="text-sm text-slate-700 dark:text-slate-300">A 26-hoz <strong>4</strong> kell, hogy 30 legyen.</p>
        </TheoryCard>
        <TheoryCard title="2. Bontsd fel a másik számot!" badge="7 = 4 + 3" badgeColor="blue">
          <p className="text-sm text-slate-700 dark:text-slate-300">A 7-ből 4-et elhasználtunk, maradt <strong>3</strong>.</p>
        </TheoryCard>
        <TheoryCard title="3. Ugorj tovább!" badge="30 + 3" badgeColor="amber">
          <p className="text-sm text-slate-700 dark:text-slate-300">30 + 3 = <strong>33</strong>. Tehát 26 + 7 = 33.</p>
        </TheoryCard>
      </div>
      <TheoryTable
        headers={['Feladat', 'Kerek tízesig', 'Maradék', 'Eredmény']}
        rows={[
          ['28 + 5', '28 + 2 = 30', '3', '33'],
          ['37 + 6', '37 + 3 = 40', '3', '43'],
          ['19 + 8', '19 + 1 = 20', '7', '27'],
          ['45 + 5', '45 + 5 = 50', '0', '50']
        ]}
      />
    </TheorySection>

    <TheorySection title="6. Kétjegyű szám hozzáadása" badge="Tízes, aztán egyes" badgeColor="purple">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
        <BlocksSumPyramidSvg />
        <TwoDigitJumpSvg />
      </div>
      <TheoryCallout type="info" title="Két lépésben">
        Először add hozzá a <strong>tízest</strong>, aztán az <strong>egyest</strong>. Ha kell, az egyesnél ugorj a kerek tízesig!
      </TheoryCallout>
    </TheorySection>

    <TheorySection title="7. Nézzük meg együtt!" badge="Mintapéldák" badgeColor="sky">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <TheoryCard title="A) 34 + 8" badge="tízesátlépés" badgeColor="orange">
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
            <li>34-hez 6 kell a 40-hez.</li>
            <li>8 = 6 + <strong>2</strong>.</li>
            <li>40 + 2 = <strong>42</strong>.</li>
          </ul>
        </TheoryCard>
        <TheoryCard title="B) 27 + 15" badge="kétjegyű" badgeColor="purple">
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
            <li>Tízes: 27 + 10 = 37.</li>
            <li>Egyes: 37 + 5 = 37 + 3 + 2.</li>
            <li>40 + 2 = <strong>42</strong>.</li>
          </ul>
        </TheoryCard>
        <TheoryCard title="C) 17 + 6 + 3" badge="három tag" badgeColor="teal">
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
            <li>17 + 3 = 20, ez kerek tízes!</li>
            <li>20 + 6 = <strong>26</strong>.</li>
            <li>A tagok sorrendje cserélhető.</li>
          </ul>
        </TheoryCard>
      </div>
    </TheorySection>

    <TheorySection title="8. Vigyázz!" badge="Csapda" badgeColor="rose">
      <TheoryTrapBox
        title="Ne felejtsd el az új tízest!"
        wrong="37 + 6 = 33"
        wrongExplanation="7 + 6 = 13. A 13-ból 10 egy új tízes, azt is hozzá kell adni!"
        correct="37 + 6 = 37 + 3 + 3 = 43"
        correctExplanation="37 + 3 = 40, és 40 + 3 = 43."
        tip="Ellenőrizd: az eredmény mindig nagyobb, mint a nagyobbik tag!"
      />
      <TheoryCallout type="warning" title="Tízest a tízeshez!">
        22 + 25-nél ne írd egymás mellé a számjegyeket! 20 + 20 = 40, 2 + 5 = 7, így <strong>47</strong>.
      </TheoryCallout>
    </TheorySection>

    <TheorySection title="9. Labor I: Ugrás a kerek tízesig" badge="Interaktív labor" badgeColor="emerald">
      <BridgeJumpLab />
    </TheorySection>

    <TheorySection title="10. Labor II: Mennyi kell még?" badge="Interaktív labor" badgeColor="blue">
      <FillUpLab />
    </TheorySection>
  </TheoryTemplate>
);

export default Add50G2Theory;
