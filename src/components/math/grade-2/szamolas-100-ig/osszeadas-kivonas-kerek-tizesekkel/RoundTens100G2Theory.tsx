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
  RoundTensStairsSvg,
  SmallBigAnalogySvg,
  KeepOnesAddSvg,
  TakeTensSvg,
  TensJumpLineSvg,
  HundredSplitCoinsSvg
} from './RoundTens100G2Figures';
import { RodsLab, CoinsLab } from './RoundTens100G2Parts';

const P: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">{children}</p>
);

export const RoundTens100G2Theory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => (
  <TheoryTemplate
    topicId="g2-numbers-to-100"
    subtopicId="osszeadas-kivonas-kerek-tizesekkel"
    grade={2}
    chapterId="szamolas-100-ig"
    title="4. Összeadás, kivonás kerek tízesekkel"
    subtitle="30 + 50, 90 − 40, 47 + 30, 86 − 50: tízesrudakkal, számegyenesen és pénzzel."
    badge="2. OSZTÁLY • III. SZÁMKÖRBŐVÍTÉS ÉS SZÁMOLÁS 100-IG • TANANYAG"
    themeColor="amber"
    pdfFilename="2_osztaly_osszeadas_kivonas_kerek_tizesekkel_tananyag.pdf"
    practiceTitle="Készen állsz? Gyakoroljunk!"
    practiceSubtitle="Próbáld ki magad a 3 szintes kvízben és a játékokban!"
    onBack={onBack}
    onStartQuiz={onStartQuiz}
    quickRule={{
      label: 'FONTOS — CSAK A TÍZESEK VÁLTOZNAK',
      align: 'left',
      formula: (
        <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
          <div className="p-2.5 rounded-xl bg-amber-50/90 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800/80 text-center font-mono text-base font-black text-amber-900 dark:text-amber-200">
            3 + 5 = 8 → 30 + 50 = 80
          </div>
          <ul className="list-disc pl-4 space-y-1 text-sm">
            <li><strong>47 + 30 = 77:</strong> 4 tízes + 3 tízes = 7 tízes.</li>
            <li><strong>86 − 50 = 36:</strong> 8 tízes − 5 tízes = 3 tízes.</li>
            <li>Az <strong>egyesek nem változnak</strong>!</li>
          </ul>
        </div>
      )
    }}
  >
    <TheorySection title="1. Mit tanulunk?" badge="0–100" badgeColor="amber">
      <div className="space-y-2">
        <P>A <strong>kerek tízesek</strong>: 10, 20, 30, 40, 50, 60, 70, 80, 90, 100.</P>
        <P>Ma kerek tízeseket adunk össze és vonunk ki.</P>
        <P>Aztán egy kétjegyű számhoz adunk vagy elveszünk kerek tízest.</P>
      </div>
    </TheorySection>

    <TheorySection title="2. Kerek tízesek tízesrudakkal" badge="1 rúd = 10" badgeColor="orange">
      <RoundTensStairsSvg />
      <TheoryCallout type="info" title="Egy rúd = 10 kocka">
        3 tízesrúd = <strong>30</strong>. 8 tízesrúd = <strong>80</strong>. 10 tízesrúd = <strong>100</strong>.
      </TheoryCallout>
    </TheorySection>

    <TheorySection title="3. Kerek tízes + kerek tízes, kerek tízes − kerek tízes" badge="Kistesó segít" badgeColor="emerald">
      <SmallBigAnalogySvg />
      <TheoryTable
        headers={['Kistesó', 'Kerek tízesekkel']}
        rows={[
          ['3 + 5 = 8', '30 + 50 = 80'],
          ['6 + 4 = 10', '60 + 40 = 100'],
          ['9 − 4 = 5', '90 − 40 = 50'],
          ['7 − 7 = 0', '70 − 70 = 0']
        ]}
      />
      <TheoryCallout type="info" title="Mondd tízesekkel!">
        <strong>90 − 40</strong>: 9 tízes − 4 tízes = 5 tízes, azaz <strong>50</strong>.
      </TheoryCallout>
    </TheorySection>

    <TheorySection title="4. Kétjegyű szám ± kerek tízes" badge="Az egyes marad" badgeColor="blue">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-center">
        <KeepOnesAddSvg />
        <TakeTensSvg />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TheoryCard title="Hozzáadás" badge="47 + 30" badgeColor="blue">
          <ul className="list-disc pl-5 space-y-1 text-base text-slate-700 dark:text-slate-300">
            <li>47 = 4 tízes és 7 egyes.</li>
            <li>Hozzáteszünk 3 tízest: 4 + 3 = <strong>7 tízes</strong>.</li>
            <li>A 7 egyes marad: <strong>77</strong>.</li>
          </ul>
        </TheoryCard>
        <TheoryCard title="Elvétel" badge="86 − 50" badgeColor="rose">
          <ul className="list-disc pl-5 space-y-1 text-base text-slate-700 dark:text-slate-300">
            <li>86 = 8 tízes és 6 egyes.</li>
            <li>Elveszünk 5 tízest: 8 − 5 = <strong>3 tízes</strong>.</li>
            <li>A 6 egyes marad: <strong>36</strong>.</li>
          </ul>
        </TheoryCard>
      </div>
    </TheorySection>

    <TheorySection title="5. Tízes ugrások a számegyenesen" badge="+10, +10, …" badgeColor="sky">
      <TensJumpLineSvg />
      <P>A <strong>+ 40</strong> négy tízes ugrás: 25 → 35 → 45 → 55 → <strong>65</strong>.</P>
      <P>A <strong>− 20</strong> két ugrás visszafelé: 63 → 53 → <strong>43</strong>.</P>
    </TheorySection>

    <TheorySection title="6. Bontsd a 100-at! Fizess érmékkel!" badge="100 = 30 + 70" badgeColor="purple">
      <HundredSplitCoinsSvg />
      <TheoryTable
        headers={['100 =', '+']}
        rows={[
          ['10', '90'],
          ['30', '70'],
          ['50', '50'],
          ['80', '20']
        ]}
      />
    </TheorySection>

    <TheorySection title="7. Nézzük meg együtt!" badge="Mintapéldák" badgeColor="teal">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <TheoryCard title="A) Hiányzó szám" badge="30 + □ = 80" badgeColor="emerald">
          <ul className="list-disc pl-5 space-y-1 text-base text-slate-700 dark:text-slate-300">
            <li>3 tízeshez mennyi kell a 8 tízeshez?</li>
            <li>3 + 5 = 8, tehát <strong>5 tízes</strong>.</li>
            <li>□ = <strong>50</strong>.</li>
          </ul>
        </TheoryCard>
        <TheoryCard title="B) Két lépés" badge="80 − 50 − 20" badgeColor="orange">
          <ul className="list-disc pl-5 space-y-1 text-base text-slate-700 dark:text-slate-300">
            <li>Előbb: 80 − 50 = 30.</li>
            <li>Aztán: 30 − 20 = <strong>10</strong>.</li>
            <li>Balról jobbra haladunk!</li>
          </ul>
        </TheoryCard>
        <TheoryCard title="C) Vásárlás" badge="90 Ft − 60 Ft" badgeColor="purple">
          <ul className="list-disc pl-5 space-y-1 text-base text-slate-700 dark:text-slate-300">
            <li>Van 90 Ft-od. A matrica 60 Ft.</li>
            <li>9 tízes − 6 tízes = 3 tízes.</li>
            <li>Marad <strong>30 Ft</strong>.</li>
          </ul>
        </TheoryCard>
      </div>
    </TheorySection>

    <TheorySection title="8. Vigyázz!" badge="Csapda" badgeColor="rose">
      <TheoryTrapBox
        title="47 + 30 — a 30 tízeseket jelent!"
        wrong="47 + 30 = 50"
        wrongExplanation="Itt a 3-at az egyesekhez adták (7 + 3). De a 30 = 3 tízes!"
        correct="47 + 30 = 77"
        correctExplanation="4 tízes + 3 tízes = 7 tízes. A 7 egyes marad."
        tip="Kerek tízesnél mindig a tízesek számjegye változik."
      />
      <TheoryCallout type="warning" title="Kivonásnál is!">
        <strong>86 − 50</strong> nem 81! Nem 5 egyest, hanem <strong>5 tízest</strong> veszünk el: 86 − 50 = <strong>36</strong>.
      </TheoryCallout>
    </TheorySection>

    <TheorySection title="9. Labor I: Tízesrudak" badge="Interaktív labor" badgeColor="orange">
      <P>Tegyél hozzá vagy vegyél el tízesrudakat, aztán válaszd ki az eredményt!</P>
      <RodsLab />
    </TheorySection>

    <TheorySection title="10. Labor II: Fizess kerek tízesekkel!" badge="Interaktív labor" badgeColor="emerald">
      <P>Tedd a tálcára a 10, 20 és 50 Ft-osokat! Pontosan annyi legyen, amennyi az ár.</P>
      <CoinsLab />
    </TheorySection>
  </TheoryTemplate>
);

export default RoundTens100G2Theory;
