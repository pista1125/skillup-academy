import React from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable
} from '../TheoryTemplate';
import { BalanceStatesSvg, SeesawSvg, KgExamplesSvg, ScaleTypesSvg, FeatherIronSvg } from './MassG2Figures';
import { WeightsBalanceLab, SeesawLab } from './MassG2Parts';

export const MassG2Theory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  return (
    <TheoryTemplate
      topicId="g2-measurements"
      subtopicId="tomeg-meres"
      grade={2}
      chapterId="meresek"
      title="2. A tömeg mérése"
      subtitle="Nehezebb, könnyebb, egyensúly, a kétkarú mérleg, a kilogramm, mérlegfajták és számolás kg-mal."
      badge="2. OSZTÁLY • VIII. MÉRÉSEK • TANANYAG"
      themeColor="emerald"
      pdfFilename="2_osztaly_tomeg_merese_tananyag.pdf"
      practiceTitle="Készen állsz? Gyakoroljunk!"
      practiceSubtitle="Próbáld ki magad a 3 szintes kvízben és a játékokban!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS — A MÉRLEG ÉS A KILOGRAMM',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-emerald-50/90 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/80 text-center font-mono text-sm sm:text-base font-black text-emerald-900 dark:text-emerald-200">
              A nehezebb oldal lemegy. • Mértékegység: kg
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li><strong>Egyensúly:</strong> a két oldal egyforma nehéz.</li>
              <li><strong>kg</strong> = kilogramm. 1 kg ≈ egy csomag liszt.</li>
            </ul>
          </div>
        )
      }}
    >
      <TheorySection title="1. Mit tanulunk?" badge="Tömeg" badgeColor="emerald">
        <div className="space-y-2 text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          <p>Melyik nehezebb: a táskád vagy a tolltartód?</p>
          <p>Ezt <strong>mérleggel</strong> tudjuk meg.</p>
          <p>A tömeg mértékegysége a <strong>kilogramm</strong>, röviden <strong>kg</strong>.</p>
        </div>
      </TheorySection>

      <TheorySection title="2. A kétkarú mérleg" badge="Nehezebb – könnyebb" badgeColor="sky">
        <BalanceStatesSvg />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="Lent van = nehezebb" badge="lemegy" badgeColor="rose">
            <p className="text-sm text-slate-700 dark:text-slate-300">
              Amelyik oldal <strong>lemegy</strong>, ott van a <strong>nehezebb</strong> tárgy. A fenti oldal a könnyebb.
            </p>
          </TheoryCard>
          <TheoryCard title="Vízszintes = egyensúly" badge="egyforma" badgeColor="emerald">
            <p className="text-sm text-slate-700 dark:text-slate-300">
              Ha a kar <strong>vízszintes</strong>, a mérleg <strong>egyensúlyban</strong> van. A két oldal egyforma nehéz.
            </p>
          </TheoryCard>
        </div>
      </TheorySection>

      <TheorySection title="3. A mérleghinta is mérleg!" badge="Játszótér" badgeColor="amber">
        <SeesawSvg />
        <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300">
          A mérleghintán is a <strong>nehezebb</strong> gyerek oldala száll le. Ha ugyanannyi kg-osak, egyensúlyban vannak.
        </p>
      </TheorySection>

      <TheorySection title="4. A kilogramm (kg)" badge="1 kg" badgeColor="orange">
        <KgExamplesSvg />
        <TheoryTable
          headers={['Könnyebb, mint 1 kg', 'Kb. 1 kg', 'Nehezebb, mint 1 kg']}
          rows={[
            ['egy alma', 'egy csomag liszt', 'egy zsák krumpli'],
            ['egy ceruza', 'egy csomag cukor', 'egy bicikli'],
            ['egy radír', 'kb. 5 alma', 'te magad']
          ]}
        />
        <FeatherIronSvg />
        <TheoryCallout type="info" title="1 kg az 1 kg!">
          1 kg tollból nagyon sok kell, vasból csak egy kicsi darab. De a tömegük <strong>ugyanannyi</strong>: 1 kg.
        </TheoryCallout>
      </TheorySection>

      <TheorySection title="5. Mérlegfajták" badge="Eszközök" badgeColor="teal">
        <ScaleTypesSvg />
        <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300">
          A konyhában a lisztet <strong>konyhai mérleggel</strong> mérjük. Magunkat <strong>személymérlegen</strong>. A boltban a gyümölcsöt <strong>bolti mérlegen</strong>.
        </p>
      </TheorySection>

      <TheorySection title="6. Nézzük meg együtt!" badge="Mintapéldák" badgeColor="indigo">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TheoryCard title="A) Súlyokkal" badge="5 kg + 2 kg" badgeColor="emerald">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
              <li>A dinnye egyensúlyban van.</li>
              <li>A másik oldalon 5 kg és 2 kg van.</li>
              <li>5 + 2 = 7, a dinnye <strong>7 kg</strong>.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="B) Hány kg még?" badge="9 kg ↔ 5 kg" badgeColor="sky">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
              <li>Bal oldalon 9 kg, jobbon 5 kg.</li>
              <li>5 + □ = 9.</li>
              <li>Még <strong>4 kg</strong> kell.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="C) Mennyivel nehezebb?" badge="32 kg és 27 kg" badgeColor="amber">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
              <li>Gábor 32 kg, Emma 27 kg.</li>
              <li>32 − 27 = <strong>5</strong>.</li>
              <li>Gábor 5 kg-mal nehezebb.</li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      <TheorySection title="7. Vigyázz!" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="A fenti oldal nem a nehezebb!"
          wrong="A labda fent van, tehát az a nehezebb."
          wrongExplanation="A mérlegen a könnyebb tárgy emelkedik fel."
          correct="A lent lévő oldal a nehezebb."
          correctExplanation="A nehéz tárgy lehúzza a serpenyőt."
          tip="Gondolj a mérleghintára: a nehezebb gyerek van lent!"
        />
        <TheoryCallout type="warning" title="A nagy nem mindig nehéz!">
          Egy nagy luftballon könnyebb, mint egy kis kő. Ne a méretet nézd, hanem mérj!
        </TheoryCallout>
      </TheorySection>

      <TheorySection title="8. Labor I: Kétkarú mérleg súlyokkal" badge="Interaktív labor" badgeColor="emerald">
        <WeightsBalanceLab />
      </TheorySection>

      <TheorySection title="9. Labor II: Mérleghinta" badge="Interaktív labor" badgeColor="sky">
        <SeesawLab />
      </TheorySection>
    </TheoryTemplate>
  );
};

export default MassG2Theory;
