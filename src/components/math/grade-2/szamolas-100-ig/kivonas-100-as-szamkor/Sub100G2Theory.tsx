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
  NoCrossSubSvg,
  RoundTenSubSvg,
  BridgeBackSvg,
  RodBreakSvg,
  TensThenOnesBackSvg,
  CheckWithAddSvg
} from './Sub100G2Figures';
import { RodSubLab } from './Sub100G2Parts';
import { HopLab } from '../osszeadas-100-as-szamkor/Add100G2Parts';

export const Sub100G2Theory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => (
  <TheoryTemplate
    topicId="g2-numbers-to-100"
    subtopicId="kivonas-100-as-szamkor"
    grade={2}
    chapterId="szamolas-100-ig"
    title="3. Kivonás 100-as számkör"
    subtitle="Kivonás tízesátlépés nélkül és tízesátlépéssel, kétjegyű − kétjegyű szám, ellenőrzés összeadással."
    badge="2. OSZTÁLY • III. SZÁMKÖRBŐVÍTÉS ÉS SZÁMOLÁS 100-IG • TANANYAG"
    themeColor="violet"
    pdfFilename="2_osztaly_kivonas_100_as_szamkor_tananyag.pdf"
    practiceTitle="Készen állsz? Gyakoroljunk!"
    practiceSubtitle="Próbáld ki magad a 3 szintes kvízben és a játékokban!"
    onBack={onBack}
    onStartQuiz={onStartQuiz}
    quickRule={{
      label: 'FONTOS — ELŐBB A TÍZESEKET VEDD EL, AZTÁN AZ EGYESEKET',
      align: 'left',
      formula: (
        <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
          <div className="p-2.5 rounded-xl bg-violet-50/90 dark:bg-violet-950/50 border border-violet-200 dark:border-violet-800/80 text-center font-mono text-sm sm:text-base font-black text-violet-900 dark:text-violet-200">
            66 − 27 = 66 − 20 − 7 = 46 − 7 = 39
          </div>
          <ul className="list-disc pl-4 space-y-1 text-xs">
            <li><strong>Tízesátlépés nélkül:</strong> 68 − 5 = 63 (8 − 5 = 3).</li>
            <li><strong>Tízesátlépéssel:</strong> 63 − 7 = 63 − 3 − 4 = 56.</li>
            <li><strong>Ellenőrizz összeadással:</strong> 56 + 7 = 63.</li>
          </ul>
        </div>
      )
    }}
  >
    {/* 1. Mit tanulunk? */}
    <TheorySection title="1. Mit tanulunk?" badge="0–100 számkör" badgeColor="violet">
      <div className="space-y-2 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
        <p>Most 100-ig vonunk ki!</p>
        <p>Ha kevés az egyes, <strong>bontunk</strong>: 1 tízes = 10 egyes.</p>
        <p>A végén mindig <strong>ellenőrizz összeadással</strong>!</p>
      </div>
    </TheorySection>

    {/* 2. Tízesátlépés nélkül */}
    <TheorySection title="2. Tízesátlépés nélkül — a kistesó segít!" badge="68 − 5" badgeColor="blue">
      <NoCrossSubSvg />
      <TheoryTable
        headers={['Kistesó', 'Nagy szám']}
        rows={[
          ['8 − 5 = 3', '68 − 5 = 63'],
          ['9 − 6 = 3', '79 − 6 = 73'],
          ['5 − 4 = 1', '95 − 4 = 91'],
          ['7 − 7 = 0', '57 − 7 = 50']
        ]}
      />
    </TheorySection>

    {/* 3. Kerek tízesre, kerek tízesből */}
    <TheorySection title="3. Kerek tízesre és kerek tízesből" badge="74 − 4, 80 − 6" badgeColor="rose">
      <RoundTenSubSvg />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TheoryCard title="Kerek tízesre" badge="74 − 4 = 70" badgeColor="rose">
          <p className="text-sm text-slate-700 dark:text-slate-300">
            Ha minden egyest elveszel, kerek tízes marad: <strong>86 − 6 = 80</strong>.
          </p>
        </TheoryCard>
        <TheoryCard title="Kerek tízesből" badge="80 − 6 = 74" badgeColor="blue">
          <p className="text-sm text-slate-700 dark:text-slate-300">
            10 − 6 = 4, ezért <strong>80 − 6 = 74</strong>. Így: <strong>100 − 9 = 91</strong>.
          </p>
        </TheoryCard>
      </div>
    </TheorySection>

    {/* 4. Tízesátlépéssel */}
    <TheorySection title="4. Tízesátlépéssel — lépj vissza a kerek tízesig!" badge="63 − 7" badgeColor="orange">
      <BridgeBackSvg />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <TheoryCard title="1. lépés" badge="63 − 3 = 60" badgeColor="orange">
          <p className="text-sm text-slate-700 dark:text-slate-300">Vedd el az egyeseket a kerek tízesig: <strong>3</strong>.</p>
        </TheoryCard>
        <TheoryCard title="2. lépés" badge="7 = 3 + 4" badgeColor="blue">
          <p className="text-sm text-slate-700 dark:text-slate-300">A 7-ből 3-at már elvettél. Még <strong>4</strong> kell.</p>
        </TheoryCard>
        <TheoryCard title="3. lépés" badge="60 − 4 = 56" badgeColor="emerald">
          <p className="text-sm text-slate-700 dark:text-slate-300">Most könnyű: <strong>60 − 4 = 56</strong>.</p>
        </TheoryCard>
      </div>
      <TheoryTable
        headers={['Feladat', 'Kerek tízesig', 'Így számolj', 'Különbség']}
        rows={[
          ['52 − 8', '52 − 2 = 50', '52 − 2 − 6', '44'],
          ['71 − 5', '71 − 1 = 70', '71 − 1 − 4', '66'],
          ['85 − 9', '85 − 5 = 80', '85 − 5 − 4', '76']
        ]}
      />
      <RodBreakSvg />
      <TheoryCallout type="info" title="Rudakkal: bonts!">
        Ha kevés a kocka, bonts fel egy rudat: <strong>1 tízes = 10 egyes</strong>. Utána már el tudod venni.
      </TheoryCallout>
    </TheorySection>

    {/* 5. Kétjegyű − kétjegyű */}
    <TheorySection title="5. Kétjegyű − kétjegyű: előbb a tízesek!" badge="66 − 27" badgeColor="purple">
      <TensThenOnesBackSvg />
      <TheoryTable
        headers={['Feladat', 'Tízesek', 'Egyesek', 'Különbség']}
        rows={[
          ['78 − 35', '78 − 30 = 48', '48 − 5', '43'],
          ['96 − 42', '96 − 40 = 56', '56 − 2', '54'],
          ['83 − 46', '83 − 40 = 43', '43 − 6 = 43 − 3 − 3', '37']
        ]}
      />
    </TheorySection>

    {/* 6. Ellenőrzés */}
    <TheorySection title="6. Ellenőrizz összeadással!" badge="82 − 47" badgeColor="sky">
      <CheckWithAddSvg />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TheoryCard title="Visszafelé is igaz" badge="35 + 47 = 82" badgeColor="sky">
          <p className="text-sm text-slate-700 dark:text-slate-300">
            Ha <strong>82 − 47 = 35</strong>, akkor <strong>35 + 47 = 82</strong>. Ha nem jön ki, számolj újra!
          </p>
        </TheoryCard>
        <TheoryCard title="Hiányzó szám" badge="65 − □ = 56" badgeColor="amber">
          <p className="text-sm text-slate-700 dark:text-slate-300">
            Mennyit lépsz vissza a 65-től az 56-ig? 65 → 60 az 5, 60 → 56 a 4. Együtt <strong>9</strong>.
          </p>
        </TheoryCard>
      </div>
    </TheorySection>

    {/* 7. Nézzük meg együtt! */}
    <TheorySection title="7. Nézzük meg együtt!" badge="Mintapéldák" badgeColor="emerald">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <TheoryCard title="A) Tízesátlépés" badge="91 − 6" badgeColor="orange">
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
            <li>91 − 1 = <strong>90</strong>.</li>
            <li>A 6-ból marad: <strong>5</strong>.</li>
            <li>90 − 5 = <strong>85</strong>.</li>
          </ul>
        </TheoryCard>
        <TheoryCard title="B) Két kétjegyű" badge="74 − 38" badgeColor="purple">
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
            <li>Tízesek: 74 − 30 = <strong>44</strong>.</li>
            <li>Egyesek: 44 − 8 = 44 − 4 − 4 = <strong>36</strong>.</li>
            <li>Ellenőrzés: 36 + 38 = 74.</li>
          </ul>
        </TheoryCard>
        <TheoryCard title="C) Szöveges feladat" badge="Hány maradt?" badgeColor="emerald">
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
            <li>Egy dobozban 64 gomb van. Elveszünk 28-at.</li>
            <li>„Elveszünk” → kivonás: 64 − 28.</li>
            <li>64 − 20 = 44, 44 − 8 = <strong>36</strong> gomb marad.</li>
          </ul>
        </TheoryCard>
      </div>
    </TheorySection>

    {/* 8. Vigyázz! */}
    <TheorySection title="8. Vigyázz!" badge="Csapda" badgeColor="rose">
      <TheoryTrapBox
        title="52 − 8 — ne fordítsd meg!"
        wrong="52 − 8 = 56"
        wrongExplanation="Itt 8 − 2 = 6-ot számoltál. De a 2-ből kell elvenni 8-at, és az nem megy! Bontani kell."
        correct="52 − 8 = 52 − 2 − 6 = 44"
        correctExplanation="Előbb 52 − 2 = 50, aztán 50 − 6 = 44."
        tip="Ellenőrizz: 44 + 8 = 52. Jó!"
      />
      <TheoryCallout type="warning" title="A különbség kisebb!">
        Kivonásnál az eredmény mindig <strong>kisebb</strong>, mint amiből elvettél. Ha nagyobb jött ki, hiba van!
      </TheoryCallout>
    </TheorySection>

    {/* 9. Labor I */}
    <TheorySection title="9. Labor I: Vegyél el rudakat és kockákat!" badge="Interaktív labor" badgeColor="violet">
      <p className="text-sm text-slate-700 dark:text-slate-300">
        Vedd el a rudakat és a kockákat! Ha kevés a kocka, bonts fel egy rudat. Aztán válaszd ki, mennyi maradt!
      </p>
      <RodSubLab />
    </TheorySection>

    {/* 10. Labor II */}
    <TheorySection title="10. Labor II: Ugrálj visszafelé!" badge="Interaktív labor" badgeColor="sky">
      <p className="text-sm text-slate-700 dark:text-slate-300">
        Ugorj vissza először tízeseket (− 10), aztán egyeseket (− 1)! Ha célba értél, nyomd meg az Ellenőrzés gombot.
      </p>
      <HopLab mode="sub" />
    </TheorySection>
  </TheoryTemplate>
);

export default Sub100G2Theory;
