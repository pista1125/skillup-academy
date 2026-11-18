import React from 'react';
import { TheoryTemplate, TheorySection, TheoryCard, TheoryCallout, TheoryTrapBox, TheoryTable } from '../TheoryTemplate';
import { MirrorKidSvg, FoldCutSvg, GridMirrorSvg, SymmetricLettersSvg, ShapeAxesSvg, WaterReflectionSvg } from './SymmetryG2Figures';
import { MirrorDrawLab, SymmetryCheckLab } from './SymmetryG2Parts';

export const SymmetryG2Theory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => (
  <TheoryTemplate
    topicId="g2-geometry"
    subtopicId="szimmetria-tukrozes"
    grade={2}
    chapterId="geometria"
    title="3. Szimmetria, tükrözés"
    subtitle="Tükörkép, tükörtengely, félbehajtás, tükrözés négyzetrácson, tükrös betűk, számok és síkidomok."
    badge="2. OSZTÁLY • VII. GEOMETRIA • TANANYAG"
    themeColor="violet"
    pdfFilename="2_osztaly_szimmetria_tukrozes_tananyag.pdf"
    practiceTitle="Készen állsz? Gyakoroljunk!"
    practiceSubtitle="Próbáld ki magad a 3 szintes kvízben és a játékokban!"
    onBack={onBack}
    onStartQuiz={onStartQuiz}
    quickRule={{
      label: 'FONTOS — A TÜKÖRTENGELY',
      align: 'left',
      formula: (
        <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
          <div className="p-2.5 rounded-xl bg-violet-50/90 dark:bg-violet-950/50 border border-violet-200 dark:border-violet-800/80 text-center text-sm sm:text-base font-black text-violet-900 dark:text-violet-200">
            Hajtsd félbe a tengely mentén: a két fél pontosan fedi egymást!
          </div>
          <ul className="list-disc pl-4 space-y-1 text-xs">
            <li>A tükörben a <strong>jobb</strong> és a <strong>bal</strong> felcserélődik.</li>
            <li>Ami közel van a tükörhöz, a tükörképe is közel van.</li>
            <li>Számold a mezőket a tengelytől!</li>
          </ul>
        </div>
      )
    }}
  >
    <TheorySection title="1. Mit tanulunk?" badge="Tükör" badgeColor="violet">
      <div className="space-y-2 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
        <p>Megnézzük, mit mutat a <strong>tükör</strong>.</p>
        <p>Megkeressük a <strong>tükörtengelyt</strong>, és tükrözünk a négyzetrácson.</p>
        <p>Végül tükrös betűket, számokat és síkidomokat keresünk.</p>
      </div>
    </TheorySection>

    <TheorySection title="2. A tükörkép" badge="Jobb és bal" badgeColor="sky">
      <MirrorKidSvg />
      <TheoryCallout type="info" title="Mit csinál a tükörkép?">
        Zoli a <strong>jobb</strong> kezét emeli. A tükörképe a <strong>bal</strong> kezét emeli. A tükörkép ugyanakkora, és ugyanolyan messze van a tükörtől, mint Zoli.
      </TheoryCallout>
      <WaterReflectionSvg />
      <TheoryCallout type="tip" title="A víz is tükör">
        A víz tükrében a fa <strong>fejjel lefelé</strong> látszik. Itt a tükör vízszintes: a víz széle.
      </TheoryCallout>
    </TheorySection>

    <TheorySection title="3. Félbehajtás – a tükörtengely" badge="Hajtogatás" badgeColor="rose">
      <FoldCutSvg />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TheoryCard title="Tükörtengely" badgeColor="violet">
          <p className="text-sm text-slate-700 dark:text-slate-300">Az a vonal, amely mentén félbehajtva a két rész pontosan fedi egymást.</p>
        </TheoryCard>
        <TheoryCard title="Szimmetrikus (tükrös)" badgeColor="rose">
          <p className="text-sm text-slate-700 dark:text-slate-300">Az az alakzat, amelynek van tükörtengelye. Például a lepke, a szív, a fenyőfa.</p>
        </TheoryCard>
      </div>
    </TheorySection>

    <TheorySection title="4. Tükrözés négyzetrácson" badge="Mezők" badgeColor="indigo">
      <GridMirrorSvg />
      <TheoryCallout type="tip" title="Így tükrözz!">
        Nézz meg egy mezőt! Számold meg, hányadik a tengelytől. A túloldalon is ugyanannyit lépj a tengelytől, ugyanabban a sorban!
      </TheoryCallout>
    </TheorySection>

    <TheorySection title="5. Tükrös betűk, számok, síkidomok" badge="Tengelyek" badgeColor="emerald">
      <SymmetricLettersSvg />
      <ShapeAxesSvg />
      <TheoryTable
        headers={['Alakzat', 'Tükörtengely']}
        rows={[
          ['négyzet', '4'],
          ['téglalap', '2 (az átló nem tengely!)'],
          ['egyenlő szárú háromszög', '1'],
          ['kör', 'nagyon sok'],
          ['A, T, M betű', '1 függőleges'],
          ['E, K, B betű, 3-as számjegy', '1 vízszintes'],
          ['F, L, R betű', 'nincs']
        ]}
      />
    </TheorySection>

    <TheorySection title="6. Nézzük meg együtt!" badge="Mintapéldák" badgeColor="sky">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <TheoryCard title="A) Mező tükrözése" badge="8 oszlop" badgeColor="indigo">
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
            <li>A tengely a 4. és az 5. oszlop között van.</li>
            <li>A kék mező a 2. oszlopban: a tengelytől a 3. mező.</li>
            <li>Jobbra is 3 mező: a <strong>7. oszlop</strong>.</li>
          </ul>
        </TheoryCard>
        <TheoryCard title="B) Tengely-e az átló?" badge="téglalap" badgeColor="rose">
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
            <li>Hajtsd félbe a téglalapot az átlója mentén!</li>
            <li>A két csúcs kilóg, nem fedik egymást.</li>
            <li>Az átló <strong>nem</strong> tükörtengely.</li>
          </ul>
        </TheoryCard>
        <TheoryCard title="C) Tükrös szó" badge="AHA" badgeColor="emerald">
          <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
            <li>Az A és a H betű is tükrös.</li>
            <li>Az AHA visszafelé is AHA.</li>
            <li>Ezért függőleges tükörben is <strong>AHA</strong> marad.</li>
          </ul>
        </TheoryCard>
      </div>
    </TheorySection>

    <TheorySection title="7. Vigyázz!" badge="Csapda" badgeColor="rose">
      <TheoryTrapBox
        title="Tükrözés vagy áttolás?"
        wrong="A mintát egyszerűen átmásolom a tengely másik oldalára, ugyanúgy."
        wrongExplanation="Ez csak áttolás. A tükörben ami a tengelyhez közel van, az a túloldalon is közel van."
        correct="Minden mezőt a tengelytől ugyanannyira teszek a túloldalon."
        correctExplanation="Így a kép megfordul, mint a tükörben."
        tip="Ellenőrizd: hajtsd félbe gondolatban! Fedi a két fél egymást?"
      />
    </TheorySection>

    <TheorySection title="8. Labor I: Tükörrajzoló" badge="Interaktív labor" badgeColor="violet">
      <MirrorDrawLab />
    </TheorySection>

    <TheorySection title="9. Labor II: Tükrös vagy nem?" badge="Interaktív labor" badgeColor="rose">
      <SymmetryCheckLab />
    </TheorySection>
  </TheoryTemplate>
);

export default SymmetryG2Theory;
