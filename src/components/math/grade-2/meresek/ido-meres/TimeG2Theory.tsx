import React from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable
} from '../TheoryTemplate';
import { DayPartsSvg, Clock24Svg, HandsSvg, MinuteSectorsSvg, WeekSvg, YearSvg } from './TimeG2Figures';
import { ClockSetterLab, CalendarLab } from './TimeG2Parts';

export const TimeG2Theory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => {
  return (
    <TheoryTemplate
      topicId="g2-measurements"
      subtopicId="ido-meres"
      grade={2}
      chapterId="meresek"
      title="4. Az idő mérése"
      subtitle="Napszakok, az óra leolvasása, óra és perc, a hét napjai, hónapok, évszakok és a naptár."
      badge="2. OSZTÁLY • VIII. MÉRÉSEK • TANANYAG"
      themeColor="amber"
      pdfFilename="2_osztaly_ido_merese_tananyag.pdf"
      practiceTitle="Készen állsz? Gyakoroljunk!"
      practiceSubtitle="Próbáld ki magad a 3 szintes kvízben és a játékokban!"
      onBack={onBack}
      onStartQuiz={onStartQuiz}
      quickRule={{
        label: 'FONTOS — AZ IDŐ MÉRTÉKEGYSÉGEI',
        align: 'left',
        formula: (
          <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
            <div className="p-2.5 rounded-xl bg-amber-50/90 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800/80 text-center font-mono text-sm sm:text-base font-black text-amber-900 dark:text-amber-200">
              1 óra = 60 perc • 1 nap = 24 óra • 1 hét = 7 nap • 1 év = 12 hónap
            </div>
            <ul className="list-disc pl-4 space-y-1 text-xs">
              <li><strong>Kismutató:</strong> az órát mutatja. <strong>Nagymutató:</strong> a percet.</li>
              <li><strong>fél óra</strong> = 30 perc.</li>
              <li>Délután 3 óra = <strong>15 óra</strong>.</li>
            </ul>
          </div>
        )
      }}
    >
      <TheorySection title="1. Mit tanulunk?" badge="Idő" badgeColor="amber">
        <div className="space-y-2 text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          <p>Mikor kelsz fel? Meddig tart a szünet? Hány nap van még a születésnapodig?</p>
          <p>Ezt az <strong>órával</strong> és a <strong>naptárral</strong> tudjuk megmérni.</p>
          <p>Az idő mértékegységei: <strong>perc, óra, nap, hét, hónap, év</strong>.</p>
        </div>
      </TheorySection>

      <TheorySection title="2. A napszakok" badge="Egy nap" badgeColor="orange">
        <DayPartsSvg />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="Így követik egymást" badge="sorrend" badgeColor="orange">
            <p className="text-sm text-slate-700 dark:text-slate-300">
              hajnal → reggel → délelőtt → <strong>dél</strong> → délután → este → éjjel
            </p>
          </TheoryCard>
          <TheoryCard title="Dél és éjfél" badge="12 óra, 24 óra" badgeColor="indigo">
            <p className="text-sm text-slate-700 dark:text-slate-300">
              <strong>Dél</strong> = 12 óra. Ekkor jár a Nap a legmagasabban.
              <br />
              <strong>Éjfél</strong> = 24 óra. Ekkor ér véget a nap.
            </p>
          </TheoryCard>
        </div>
      </TheorySection>

      <TheorySection title="3. Egy nap 24 óra" badge="Két név" badgeColor="blue">
        <Clock24Svg />
        <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300">
          A kismutató egy nap alatt <strong>kétszer</strong> megy körbe. Ezért minden időnek két neve van.
        </p>
        <TheoryTable
          headers={['Az óra mutatja', 'Délelőtt', 'Délután, este']}
          rows={[
            ['3 óra', '3 óra', '15 óra'],
            ['6 óra', '6 óra', '18 óra'],
            ['9 óra', '9 óra', '21 óra'],
            ['12 óra', '12 óra (dél)', '24 óra (éjfél)']
          ]}
        />
        <TheoryCallout type="tip" title="Trükk">
          Délután adj hozzá 12-t! Délután 4 óra: 4 + 12 = <strong>16 óra</strong>.
        </TheoryCallout>
      </TheorySection>

      <TheorySection title="4. Óra és perc" badge="1 óra = 60 perc" badgeColor="emerald">
        <HandsSvg />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="A nagymutató" badge="5, 10, 15 …" badgeColor="emerald">
            <p className="text-sm text-slate-700 dark:text-slate-300">
              Egyik számtól a következőig <strong>5 perc</strong> telik el. Számolj ötösével: 5, 10, 15, 20 …
            </p>
          </TheoryCard>
          <TheoryCard title="Egy teljes kör" badge="60 perc" badgeColor="teal">
            <p className="text-sm text-slate-700 dark:text-slate-300">
              Ha a nagymutató egyszer körbemegy, <strong>1 óra</strong> telik el. Közben a kismutató egy számmal továbblép.
            </p>
          </TheoryCard>
        </div>
        <MinuteSectorsSvg />
        <TheoryCallout type="info" title="Digitális óra">
          A <strong>7:30</strong> azt jelenti: <strong>7 óra 30 perc</strong>. Elöl az óra, a kettőspont után a perc.
        </TheoryCallout>
      </TheorySection>

      <TheorySection title="5. A hét napjai" badge="1 hét = 7 nap" badgeColor="purple">
        <WeekSvg />
        <TheoryTable
          headers={['Hetek', '1 hét', '2 hét', '3 hét', '4 hét']}
          rows={[['Napok', '7 nap', '14 nap', '21 nap', '28 nap']]}
        />
        <TheoryCallout type="tip" title="Egy hét múlva">
          Egy hét múlva ugyanaz a nap jön újra. Ha ma kedd van, 7 nap múlva is kedd lesz.
        </TheoryCallout>
      </TheorySection>

      <TheorySection title="6. Hónapok és évszakok" badge="1 év = 12 hónap" badgeColor="rose">
        <YearSvg />
        <TheoryTable
          headers={['Hány napos?', 'Hónapok']}
          rows={[
            ['31 napos', 'január, március, május, július, augusztus, október, december'],
            ['30 napos', 'április, június, szeptember, november'],
            ['28 napos', 'február (szökőévben 29 napos)']
          ]}
        />
        <TheoryCallout type="info" title="Szökőév">
          Minden 4. év szökőév. Ilyenkor a február 29 napos.
        </TheoryCallout>
      </TheorySection>

      <TheorySection title="7. Időpont vagy időtartam?" badge="Mikor? Meddig?" badgeColor="sky">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TheoryCard title="Időpont: Mikor?" badge="pont" badgeColor="rose">
            <p className="text-sm text-slate-700 dark:text-slate-300">
              8 óra 15 perc, május 3., kedd. <br />
              Megmondja, <strong>mikor</strong> történik valami.
            </p>
          </TheoryCard>
          <TheoryCard title="Időtartam: Meddig?" badge="hossz" badgeColor="sky">
            <p className="text-sm text-slate-700 dark:text-slate-300">
              20 perc, 3 óra, 2 hét. <br />
              Megmondja, <strong>mennyi ideig</strong> tart valami.
            </p>
          </TheoryCard>
        </div>
      </TheorySection>

      <TheorySection title="8. Nézzük meg együtt!" badge="Mintapéldák" badgeColor="amber">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TheoryCard title="A) Hány óra telik el?" badge="9 órától 14 óráig" badgeColor="orange">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
              <li>A nagyobb időből vedd el a kisebbet.</li>
              <li>14 − 9 = <strong>5</strong>.</li>
              <li><strong>5 óra</strong> telik el.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="B) Mennyi lesz az idő?" badge="6 óra 40 perc + 20 perc" badgeColor="emerald">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
              <li>40 perc + 20 perc = 60 perc.</li>
              <li>60 perc = 1 óra, így a kismutató továbblép.</li>
              <li>Az idő: <strong>7 óra</strong>.</li>
            </ul>
          </TheoryCard>
          <TheoryCard title="C) Hány nap?" badge="3 hét" badgeColor="purple">
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700 dark:text-slate-300">
              <li>1 hét = 7 nap.</li>
              <li>3 hét = 7 + 7 + 7.</li>
              <li>3 · 7 = <strong>21 nap</strong>.</li>
            </ul>
          </TheoryCard>
        </div>
      </TheorySection>

      <TheorySection title="9. Vigyázz!" badge="Csapda" badgeColor="rose">
        <TheoryTrapBox
          title="Melyik mutató melyik?"
          wrong="A rövid mutató a 3-on, a hosszú a 6-on: 6 óra 15 perc"
          wrongExplanation="Felcserélted a mutatókat! A rövid kismutató mutatja az órát."
          correct="A hosszú nagymutató a 6-on: 30 perc. Ez 3 óra 30 perc."
          correctExplanation="A 6-os számnál a nagymutató 30 percet mutat, nem 6 percet. A kismutató ilyenkor a 3 és a 4 között van."
          tip="A nagymutatónál mindig ötösével számolj: 6 szám = 30 perc!"
        />
        <TheoryCallout type="warning" title="Éjfélen át">
          Este 21 órától reggel 6 óráig: 21-től 24-ig 3 óra, aztán 6 óra. Összesen 3 + 6 = <strong>9 óra</strong>.
        </TheoryCallout>
      </TheorySection>

      <TheorySection title="10. Labor I: Állítsd be az órát!" badge="Interaktív labor" badgeColor="orange">
        <ClockSetterLab />
      </TheorySection>

      <TheorySection title="11. Labor II: Naptárjáték" badge="Interaktív labor" badgeColor="blue">
        <CalendarLab />
      </TheorySection>
    </TheoryTemplate>
  );
};

export default TimeG2Theory;
