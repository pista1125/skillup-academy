import React from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable
} from '../TheoryTemplate';
import { UnitsOverviewSvg, ConversionSvg, ToolsSvg, MixedUnitsSvg } from './MeasExamG2Figures';
import { MixConvertLab, UnitPickLab } from './MeasExamG2Parts';

export const MeasExamG2Theory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  return (
    <TheoryTemplate
      topicId="g2-measurements"
      subtopicId="gyakorlas-tudasproba"
      grade={2}
      chapterId="meresek"
      title="5. Gyakorlás, tudáspróba"
      subtitle="Hosszúság, tömeg, űrtartalom és idő: mértékegységek, mérőeszközök, átváltás és szöveges feladatok."
      badge="2. OSZTÁLY • VIII. MÉRÉSEK • TANANYAG"
      themeColor="rose"
      pdfFilename="2_osztaly_meresek_tudasproba_tananyag.pdf"
      practiceTitle="Készen állsz a tudáspróbára?"
      practiceSubtitle="90 feladat 3 szinten – és a játékok!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS — A MÉRTÉKEGYSÉGEK',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-rose-50/90 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800/80 text-center font-mono text-sm sm:text-base font-black text-rose-900 dark:text-rose-200">
              1 dm = 10 cm • 1 m = 100 cm • 1 l = 10 dl • 1 óra = 60 perc
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li>Számolás előtt nézd meg: <strong>ugyanaz a mértékegység?</strong></li>
              <li>Ha nem, előbb <strong>váltsd át</strong>!</li>
            </ul>
          </div>
        )
      }}
    >
      <TheorySection title="1. Amit már tudsz a VIII. témakörből" badge="Ismétlés" badgeColor="rose">
        <UnitsOverviewSvg />
        <TheoryTable
          headers={['Mit mérünk?', 'Mértékegység', 'Mivel mérjük?']}
          rows={[
            ['hosszúság', 'cm, dm, m', 'vonalzó, mérőszalag'],
            ['tömeg', 'kg', 'mérleg'],
            ['űrtartalom', 'dl, l', 'mérőedény'],
            ['idő', 'perc, óra, nap, hét, hónap, év', 'óra, naptár']
          ]}
        />
      </TheorySection>

      <TheorySection title="2. Mérőeszközök" badge="Mivel?" badgeColor="sky">
        <ToolsSvg />
        <TheoryCallout type="tip" title="Mérés vonalzóval">
          Mindig a <strong>0-tól</strong> mérj! Ha nem a 0-nál kezdődik: <strong>vége − eleje</strong>.
        </TheoryCallout>
      </TheorySection>

      <TheorySection title="3. Átváltás" badge="Ugyanannyi" badgeColor="blue">
        <ConversionSvg />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="Kétféle név" badge="cm ↔ dm cm" badgeColor="blue">
            <p className="text-sm text-slate-700 dark:text-slate-300">
              <strong>34 cm = 3 dm 4 cm</strong>
              <br />
              <strong>15 dl = 1 l 5 dl</strong>
            </p>
          </TheoryCard>
          <TheoryCard title="Idő" badge="óra ↔ perc" badgeColor="amber">
            <p className="text-sm text-slate-700 dark:text-slate-300">
              <strong>1 óra 20 perc = 80 perc</strong>
              <br />
              <strong>2 hét 3 nap = 17 nap</strong>
            </p>
          </TheoryCard>
        </div>
      </TheorySection>

      <TheorySection title="4. Nézzük meg együtt!" badge="Mintapéldák" badgeColor="emerald">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TheoryCard title="A) Szalag" badge="1 m − 35 cm" badgeColor="blue">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
              <li>1 m = 100 cm.</li>
              <li>100 cm − 35 cm = <strong>65 cm</strong>.</li>
              <li>65 cm szalag maradt.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="B) Mérleg" badge="? + 4 kg = 10 kg" badgeColor="emerald">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
              <li>Bal: dinnye + 4 kg. Jobb: 10 kg.</li>
              <li>Egyensúly: a két oldal ugyanannyi.</li>
              <li>10 − 4 = 6, a dinnye <strong>6 kg</strong>.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="C) Poharak" badge="3 · 2 dl" badgeColor="sky">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
              <li>3 pohár, mindegyikben 2 dl.</li>
              <li>3 · 2 dl = 6 dl.</li>
              <li>Az 1 l-hez még 10 − 6 = <strong>4 dl</strong> kell.</li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      <TheorySection title="5. Vigyázz a tipikus csapdákra!" badge="Csapda" badgeColor="orange">
        <MixedUnitsSvg />
        <TheoryTrapBox
          title="Különböző mértékegységek"
          wrong="1 m − 30 cm = 70 m"
          wrongExplanation="70 m nagyon hosszú! A métert és a centimétert nem keverheted. Előbb ugyanarra a mértékegységre kell váltani."
          correct="1 m − 30 cm = 100 cm − 30 cm = 70 cm"
          correctExplanation="Az 1 m = 100 cm, így már kivonhatsz."
          tip="Mindig írd ki a mértékegységet is az eredmény mellé!"
        />
        <TheoryCallout type="warning" title="Az óra nem 100 perc!">
          1 óra = <strong>60 perc</strong>, nem 100. Így 1 óra 15 perc = 60 + 15 = <strong>75 perc</strong>.
        </TheoryCallout>
      </TheorySection>

      <TheorySection title="6. Labor I: Vegyes átváltó" badge="Interaktív labor" badgeColor="rose">
        <MixConvertLab />
      </TheorySection>

      <TheorySection title="7. Labor II: Melyik mértékegység illik?" badge="Interaktív labor" badgeColor="sky">
        <UnitPickLab />
      </TheorySection>
    </TheoryTemplate>
  );
};

export default MeasExamG2Theory;
