import React from 'react';
import {
  TheoryTemplate,
  TheorySection,
  TheoryCard,
  TheoryCallout,
  TheoryTrapBox,
  TheoryTable
} from '../TheoryTemplate';
import { Roman1To10TableSvg, FiveFamilySvg, OneMissingSvg, RomanLine10Svg, RomanClockSevenSvg } from './Roman10G2Figures';
import { ConverterLab, ClockSetLab } from './Roman10G2Parts';

const R: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <strong style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>{children}</strong>
);

export const Roman10G2Theory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => (
  <TheoryTemplate
    topicId="g2-roman-numbers"
    subtopicId="romai-szamok-0-10-ig"
    grade={2}
    chapterId="romai-szamok"
    title="2. Római számok 1-től 10-ig"
    subtitle="I, II, III, a 4 és a 9 (egy hiányzik), a V-család, sorrend a számegyenesen, összehasonlítás és a római óra egész óráknál."
    badge="2. OSZTÁLY • VI. A RÓMAI SZÁMOK • TANANYAG"
    themeColor="emerald"
    pdfFilename="2_osztaly_romai_szamok_1_10_tananyag.pdf"
    practiceTitle="Készen állsz? Gyakoroljunk!"
    practiceSubtitle="Próbáld ki magad a 3 szintes kvízben és a játékokban!"
    onBack={onBack}
    onStartQuiz={onStartQuiz}
    quickRule={{
      label: 'FONTOS — 1-TŐL 10-IG',
      align: 'left',
      formula: (
        <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
          <div
            className="p-2.5 rounded-xl bg-emerald-50/90 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/80 text-center text-base sm:text-lg font-black text-emerald-900 dark:text-emerald-200"
            style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
          >
            I II III IV V VI VII VIII IX X
          </div>
          <ul className="list-disc pl-4 space-y-1 text-xs">
            <li><strong>1, 2, 3:</strong> I-eket teszünk egymás mellé.</li>
            <li><strong>6, 7, 8:</strong> a V után I-ek jönnek: VII = 5 + 2.</li>
            <li><strong>4 és 9:</strong> egy hiányzik: IV = 5 − 1, IX = 10 − 1.</li>
          </ul>
        </div>
      )
    }}
  >
    <TheorySection title="1. Mit tanulunk?" badge="1–10" badgeColor="emerald">
      <div className="space-y-2 text-base text-slate-700 dark:text-slate-300 leading-relaxed">
        <p>Már ismered a három jelet: <R>I</R> = 1, <R>V</R> = 5, <R>X</R> = 10.</p>
        <p>Most megírjuk velük az összes számot <strong>1-től 10-ig</strong>.</p>
        <p>Nullát nem írunk, mert a rómaiaknak nem volt rá jelük.</p>
      </div>
    </TheorySection>

    <TheorySection title="2. Az egész sor 1-től 10-ig" badge="Táblázat" badgeColor="blue">
      <Roman1To10TableSvg />
      <TheoryTable
        headers={['Szám', 'Rómaiul', 'Így gondold']}
        rows={[
          ['1, 2, 3', <R key="a">I, II, III</R>, '1-et, 2-t, 3-at teszek egymás mellé'],
          ['4', <R key="b">IV</R>, '5 − 1'],
          ['5', <R key="c">V</R>, 'egy jel'],
          ['6, 7, 8', <R key="d">VI, VII, VIII</R>, '5 + 1, 5 + 2, 5 + 3'],
          ['9', <R key="e">IX</R>, '10 − 1'],
          ['10', <R key="f">X</R>, 'egy jel']
        ]}
      />
    </TheorySection>

    <TheorySection title="3. A V-család: 6, 7, 8" badge="Jobbra hozzáad" badgeColor="emerald">
      <FiveFamilySvg />
      <TheoryCallout type="info" title="Előbb az 5, utána a többi">
        Elöl áll a <R>V</R>. Utána annyi <R>I</R>, amennyivel több 5-nél: <R>VIII</R> = 5 + 3 = 8.
      </TheoryCallout>
    </TheorySection>

    <TheorySection title="4. A 4 és a 9: egy hiányzik" badge="Balra elvesz" badgeColor="rose">
      <OneMissingSvg />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TheoryCard title="4 = IV" badge="5 − 1" badgeColor="rose">
          <p className="text-base text-slate-700 dark:text-slate-300">
            A 4-nek egy kell az 5-höz. Ezért az <R>I</R> a <R>V</R> elé kerül: <R>IV</R>.
          </p>
        </TheoryCard>
        <TheoryCard title="9 = IX" badge="10 − 1" badgeColor="rose">
          <p className="text-base text-slate-700 dark:text-slate-300">
            A 9-nek egy kell a 10-hez. Ezért az <R>I</R> az <R>X</R> elé kerül: <R>IX</R>.
          </p>
        </TheoryCard>
      </div>
    </TheorySection>

    <TheorySection title="5. Sorrend és összehasonlítás" badge="Számegyenes" badgeColor="sky">
      <RomanLine10Svg />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TheoryCard title="Melyik a nagyobb?" badge="IX > VII" badgeColor="sky">
          <p className="text-base text-slate-700 dark:text-slate-300">
            Írd át arab számmá! <R>IX</R> = 9, <R>VII</R> = 7. 9 &gt; 7, tehát <R>IX</R> &gt; <R>VII</R>.
          </p>
        </TheoryCard>
        <TheoryCard title="Szomszédok" badge="V, VI, VII" badgeColor="emerald">
          <p className="text-base text-slate-700 dark:text-slate-300">
            A <R>VI</R> előtt az <R>V</R> áll, utána a <R>VII</R> jön.
          </p>
        </TheoryCard>
      </div>
    </TheorySection>

    <TheorySection title="6. A római óra" badge="Egész órák" badgeColor="blue">
      <RomanClockSevenSvg />
      <p className="text-base text-slate-700 dark:text-slate-300">
        Ha a nagymutató a <R>XII</R>-n áll, <strong>egész óra</strong> van. A kismutató mutatja, hány óra: itt <R>VII</R>, vagyis 7 óra.
      </p>
    </TheorySection>

    <TheorySection title="7. Nézzük meg együtt!" badge="Mintapéldák" badgeColor="sky">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <TheoryCard title="A) Írd rómaiul: 8" badge="8 = 5 + 3" badgeColor="emerald">
          <ul className="list-disc pl-5 space-y-1 text-base text-slate-700 dark:text-slate-300">
            <li>A 8-ban van egy 5: <R>V</R>.</li>
            <li>Még 3 kell: <R>III</R>.</li>
            <li>Együtt: <R>VIII</R>.</li>
          </ul>
        </TheoryCard>
        <TheoryCard title="B) IV vagy VI?" badge="<, >" badgeColor="rose">
          <ul className="list-disc pl-5 space-y-1 text-base text-slate-700 dark:text-slate-300">
            <li><R>IV</R> = 5 − 1 = 4.</li>
            <li><R>VI</R> = 5 + 1 = 6.</li>
            <li>4 &lt; 6, tehát <R>IV</R> &lt; <R>VI</R>.</li>
          </ul>
        </TheoryCard>
        <TheoryCard title="C) Számolj!" badge="III + V" badgeColor="amber">
          <ul className="list-disc pl-5 space-y-1 text-base text-slate-700 dark:text-slate-300">
            <li>Írd át: <R>III</R> = 3, <R>V</R> = 5.</li>
            <li>3 + 5 = 8.</li>
            <li>Rómaiul: <R>VIII</R>.</li>
          </ul>
        </TheoryCard>
      </div>
    </TheorySection>

    <TheorySection title="8. Vigyázz!" badge="Csapda" badgeColor="rose">
      <TheoryTrapBox
        title="Több jel = nagyobb szám?"
        wrong="VIII > IX, mert több a jel"
        wrongExplanation="A VIII-ban 4 jel van, a IX-ben csak 2. De nem a jeleket számoljuk!"
        correct="VIII = 8,  IX = 9,  tehát VIII < IX"
        correctExplanation="Mindig írd át arab számmá, és úgy hasonlítsd össze!"
        tip="Nem a jelek száma, hanem az értékük számít."
      />
      <TheoryCallout type="warning" title="VIIII nem jó!">
        A 9-et nem írjuk <R>VIIII</R>-nek (négy I egymás mellett). Helyesen: <R>IX</R>.
      </TheoryCallout>
    </TheorySection>

    <TheorySection title="9. Labor I: Átváltó játék" badge="Interaktív labor" badgeColor="emerald">
      <p className="text-base text-slate-700 dark:text-slate-300">Válaszd ki a jó számot! Hányat találsz el egymás után?</p>
      <ConverterLab min={1} max={10} />
    </TheorySection>

    <TheorySection title="10. Labor II: Állítsd be a római órát!" badge="Interaktív labor" badgeColor="blue">
      <p className="text-base text-slate-700 dark:text-slate-300">Forgasd a piros kismutatót a kért órára!</p>
      <ClockSetLab minHour={1} maxHour={10} first={7} />
    </TheorySection>
  </TheoryTemplate>
);

export default Roman10G2Theory;
