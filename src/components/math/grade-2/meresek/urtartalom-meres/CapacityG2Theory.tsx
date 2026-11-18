import React from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable
} from '../TheoryTemplate';
import { ContainersSvg, PourCompareSvg, CupCountSvg, LiterDlSvg, JugScaleSvg } from './CapacityG2Figures';
import { PourLab, ReadJugLab } from './CapacityG2Parts';

export const CapacityG2Theory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  return (
    <TheoryTemplate
      topicId="g2-measurements"
      subtopicId="urtartalom-meres"
      grade={2}
      chapterId="meresek"
      title="3. Az űrtartalom mérése"
      subtitle="Melyikbe fér több? Mérés pohárral, a liter és a deciliter, a mérőedény leolvasása és számolás l-rel, dl-rel."
      badge="2. OSZTÁLY • VIII. MÉRÉSEK • TANANYAG"
      themeColor="violet"
      pdfFilename="2_osztaly_urtartalom_merese_tananyag.pdf"
      practiceTitle="Készen állsz? Gyakoroljunk!"
      practiceSubtitle="Próbáld ki magad a 3 szintes kvízben és a játékokban!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS — LITER ÉS DECILITER',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-violet-50/90 dark:bg-violet-950/50 border border-violet-200 dark:border-violet-800/80 text-center font-mono text-sm sm:text-base font-black text-violet-900 dark:text-violet-200">
              1 l = 10 dl &nbsp;•&nbsp; fél liter = 5 dl
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li><strong>l</strong> = liter, <strong>dl</strong> = deciliter.</li>
              <li>A mérőedényen minden kis vonás <strong>1 dl</strong>.</li>
            </ul>
          </div>
        )
      }}
    >
      <TheorySection title="1. Mit tanulunk?" badge="Űrtartalom" badgeColor="violet">
        <div className="space-y-2 text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          <p>Mennyi víz fér egy pohárba? És egy vödörbe?</p>
          <p>Ez az edény <strong>űrtartalma</strong>.</p>
          <p>Megismered a <strong>litert (l)</strong> és a <strong>decilitert (dl)</strong>.</p>
        </div>
      </TheorySection>

      <TheorySection title="2. Melyikbe fér több?" badge="Összehasonlítás" badgeColor="sky">
        <ContainersSvg />
        <PourCompareSvg />
        <TheoryCallout type="tip" title="Töltsd át!">
          Töltsd tele az egyik edényt, és öntsd át a másikba. Ha a másik nem telik meg, abba <strong>több</strong> fér.
        </TheoryCallout>
      </TheorySection>

      <TheorySection title="3. Mérés pohárral, bögrével" badge="Hányszor?" badgeColor="rose">
        <CupCountSvg />
        <TheoryCallout type="info" title="Kisebb pohár – több merítés">
          Ugyanaz a kancsó <strong>4 bögre</strong> vagy <strong>8 kis pohár</strong>. A kisebb pohárból többször kell meríteni.
        </TheoryCallout>
      </TheorySection>

      <TheorySection title="4. A liter és a deciliter" badge="l és dl" badgeColor="violet">
        <LiterDlSvg />
        <TheoryTable
          headers={['Deciliterrel (dl) mérjük', 'Literrel (l) mérjük']}
          rows={[
            ['egy pohár tej (kb. 2 dl)', 'egy üveg üdítő (1 l, 2 l)'],
            ['egy bögre tea (kb. 2–3 dl)', 'egy vödör víz (kb. 10 l)'],
            ['egy pohár joghurt', 'egy hordó (akár 100 l)']
          ]}
        />
      </TheorySection>

      <TheorySection title="5. A mérőedény leolvasása" badge="Vonások" badgeColor="blue">
        <JugScaleSvg />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="Alulról számolj!" badge="1 vonás = 1 dl" badgeColor="sky">
            <p className="text-sm text-slate-700 dark:text-slate-300">
              Nézd meg, meddig ér a víz. Számold a vonásokat <strong>alulról</strong>.
            </p>
          </TheoryCard>
          <TheoryCard title="Az 1 l fölött" badge="10 + 3" badgeColor="violet">
            <p className="text-sm text-slate-700 dark:text-slate-300">
              Az <strong>1 l</strong>-es vonás 10 dl. Ha fölötte még 3 vonás van: <strong>13 dl = 1 l 3 dl</strong>.
            </p>
          </TheoryCard>
        </div>
      </TheorySection>

      <TheorySection title="6. Nézzük meg együtt!" badge="Mintapéldák" badgeColor="indigo">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TheoryCard title="A) Zsúr" badge="6 dl + 9 dl + 5 dl" badgeColor="orange">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
              <li>6 + 9 = 15.</li>
              <li>15 + 5 = <strong>20 dl</strong>.</li>
              <li>20 dl = <strong>2 l</strong>.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="B) Átváltás" badge="1 l 6 dl" badgeColor="violet">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
              <li>1 l = <strong>10 dl</strong>.</li>
              <li>10 dl + 6 dl = <strong>16 dl</strong>.</li>
              <li>Tehát 1 l 6 dl = 16 dl.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="C) Hány pohár?" badge="1 l és 2 dl-es pohár" badgeColor="emerald">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
              <li>1 l = 10 dl.</li>
              <li>2, 4, 6, 8, 10.</li>
              <li><strong>5 pohár</strong> lesz tele.</li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      <TheorySection title="7. Vigyázz!" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="A nagyobb szám nem mindig több!"
          wrong="50 dl több, mint 8 l, mert 50 > 8."
          wrongExplanation="Más a mértékegység! Előbb írd át ugyanarra."
          correct="8 l = 80 dl, és 80 dl > 50 dl."
          correctExplanation="1 l = 10 dl, ezért 8 l = 80 dl."
          tip="Hasonlítás előtt mindig írd át mindkettőt dl-re!"
        />
        <TheoryCallout type="warning" title="Csak egyforma poharakat számolj!">
          Aki 6 kis pohárral ivott, nem biztos, hogy többet ivott, mint aki 5 nagy pohárral.
        </TheoryCallout>
      </TheorySection>

      <TheorySection title="8. Labor I: Töltsd meg dl-es pohárral!" badge="Interaktív labor" badgeColor="violet">
        <PourLab />
      </TheorySection>

      <TheorySection title="9. Labor II: Olvasd le a mérőedényt!" badge="Interaktív labor" badgeColor="sky">
        <ReadJugLab />
      </TheorySection>
    </TheoryTemplate>
  );
};

export default CapacityG2Theory;
