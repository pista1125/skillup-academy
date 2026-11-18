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
  TenPlusPatternSvg,
  XPlusSticksSvg,
  RomanLine20Svg,
  CompareTwentySvg,
  ClockElevenTwelveSvg
} from './Roman20G2Figures';
import { RomanLineLab, RomanOrderLab } from './Roman20G2Parts';

const R: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <strong style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>{children}</strong>
);

export const Roman20G2Theory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => (
  <TheoryTemplate
    topicId="g2-roman-numbers"
    subtopicId="romai-szamok-11-20-ig"
    grade={2}
    chapterId="romai-szamok"
    title="3. Római számok 11-től 20-ig"
    subtitle="X + az első tízes: XI-től XX-ig. Összehasonlítás, sorba rendezés, számegyenes, XI és XII az órán, számolás átírással."
    badge="2. OSZTÁLY • VI. A RÓMAI SZÁMOK • TANANYAG"
    themeColor="violet"
    pdfFilename="2_osztaly_romai_szamok_11_20_tananyag.pdf"
    practiceTitle="Készen állsz? Gyakoroljunk!"
    practiceSubtitle="Próbáld ki magad a 3 szintes kvízben és a játékokban!"
    onBack={onBack}
    onStartQuiz={onStartQuiz}
    quickRule={{
      label: 'FONTOS — ELÖL AZ X, UTÁNA AZ EGYESEK',
      align: 'left',
      formula: (
        <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
          <div
            className="p-2.5 rounded-xl bg-violet-50/90 dark:bg-violet-950/50 border border-violet-200 dark:border-violet-800/80 text-center text-lg font-black text-violet-900 dark:text-violet-200"
            style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
          >
            XVII = X + VII = 10 + 7 = 17
          </div>
          <ul className="list-disc pl-4 space-y-1 text-xs">
            <li><strong>11–19:</strong> X, utána az 1–9 római alakja: XIV = 14, XIX = 19.</li>
            <li><strong>20:</strong> két X: XX = 10 + 10.</li>
            <li><strong>Összehasonlítás:</strong> írd át arab számmá, vagy nézd az X utáni részt!</li>
          </ul>
        </div>
      )
    }}
  >
    <TheorySection title="1. Mit tanulunk?" badge="11–20" badgeColor="violet">
      <div className="space-y-2 text-base text-slate-700 dark:text-slate-300 leading-relaxed">
        <p>Már tudod a római számokat 1-től 10-ig.</p>
        <p>Most jön a <strong>második tízes</strong>: 11-től 20-ig.</p>
        <p>Jó hír: nem kell új jel! Csak egy <R>X</R>-et teszünk elöl.</p>
      </div>
    </TheorySection>

    <TheorySection title="2. Elöl az X, utána a régi ismerős" badge="Minta" badgeColor="purple">
      <TenPlusPatternSvg />
      <TheoryTable
        headers={['Első tízes', 'Második tízes', 'Így gondold']}
        rows={[
          [<R key="a">I = 1</R>, <R key="b">XI = 11</R>, '10 + 1'],
          [<R key="c">IV = 4</R>, <R key="d">XIV = 14</R>, '10 + 4'],
          [<R key="e">VIII = 8</R>, <R key="f">XVIII = 18</R>, '10 + 8'],
          [<R key="g">IX = 9</R>, <R key="h">XIX = 19</R>, '10 + 9'],
          [<R key="i">X = 10</R>, <R key="j">XX = 20</R>, '10 + 10']
        ]}
      />
    </TheorySection>

    <TheorySection title="3. Rakd ki pálcikákkal!" badge="X + VII" badgeColor="orange">
      <XPlusSticksSvg />
      <TheoryCallout type="tip" title="Két lépésben">
        1. Tegyél le egy <R>X</R>-et: ez a 10. &nbsp;2. Mellé rakd ki az egyeseket: <R>VII</R> = 7. Együtt <R>XVII</R> = 17.
      </TheoryCallout>
    </TheorySection>

    <TheorySection title="4. A számegyenesen" badge="0–20" badgeColor="blue">
      <RomanLine20Svg />
      <p className="text-base text-slate-700 dark:text-slate-300">
        Minél jobbra van egy szám, annál nagyobb. <R>XVI</R> jobbra van a <R>XII</R>-től, tehát nagyobb.
      </p>
    </TheorySection>

    <TheorySection title="5. Összehasonlítás és sorba rendezés" badge="<, >" badgeColor="emerald">
      <CompareTwentySvg />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TheoryCard title="1. út: írd át!" badge="XIX > XVII" badgeColor="emerald">
          <p className="text-base text-slate-700 dark:text-slate-300">
            <R>XIX</R> = 19, <R>XVII</R> = 17. 19 &gt; 17, tehát <R>XIX</R> &gt; <R>XVII</R>.
          </p>
        </TheoryCard>
        <TheoryCard title="2. út: nézd az X után!" badge="XIV < XVI" badgeColor="sky">
          <p className="text-base text-slate-700 dark:text-slate-300">
            Ha mindkettő X-szel kezdődik, csak a többit nézd: <R>IV</R> &lt; <R>VI</R>.
          </p>
        </TheoryCard>
      </div>
      <TheoryCallout type="info" title="Sorba rendezés">
        <R>XV, IX, XIX, XII</R> → írd át: 15, 9, 19, 12 → sorban: <R>IX, XII, XV, XIX</R>.
      </TheoryCallout>
    </TheorySection>

    <TheorySection title="6. XI és XII az órán" badge="Egész órák" badgeColor="blue">
      <ClockElevenTwelveSvg />
      <p className="text-base text-slate-700 dark:text-slate-300">
        Az óra számlapján a legnagyobb szám a <R>XII</R>. A <R>XI</R> = 11 a bal oldalán van.
      </p>
    </TheorySection>

    <TheorySection title="7. Nézzük meg együtt!" badge="Mintapéldák" badgeColor="sky">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <TheoryCard title="A) Írd rómaiul: 16" badge="16 = 10 + 6" badgeColor="purple">
          <ul className="list-disc pl-5 space-y-1 text-base text-slate-700 dark:text-slate-300">
            <li>A 10: <R>X</R>.</li>
            <li>A 6: <R>VI</R>.</li>
            <li>Együtt: <R>XVI</R>.</li>
          </ul>
        </TheoryCard>
        <TheoryCard title="B) Mennyi a XIX?" badge="X + IX" badgeColor="rose">
          <ul className="list-disc pl-5 space-y-1 text-base text-slate-700 dark:text-slate-300">
            <li>Elöl az <R>X</R>: 10.</li>
            <li>Utána <R>IX</R>: 9.</li>
            <li>10 + 9 = <strong>19</strong>.</li>
          </ul>
        </TheoryCard>
        <TheoryCard title="C) Számolj!" badge="XII + V" badgeColor="amber">
          <ul className="list-disc pl-5 space-y-1 text-base text-slate-700 dark:text-slate-300">
            <li>Írd át: <R>XII</R> = 12, <R>V</R> = 5.</li>
            <li>12 + 5 = 17.</li>
            <li>Rómaiul: <R>XVII</R>.</li>
          </ul>
        </TheoryCard>
      </div>
    </TheorySection>

    <TheorySection title="8. Vigyázz!" badge="Csapda" badgeColor="rose">
      <TheoryTrapBox
        title="XI vagy IX?"
        wrong="XI = 9"
        wrongExplanation="Itt az I az X után, jobbra áll. Jobbra hozzáadunk!"
        correct="XI = 10 + 1 = 11,  IX = 10 − 1 = 9"
        correctExplanation="Nézd meg, melyik oldalon van az I!"
        tip="Az X legyen elöl, ha 10-nél nagyobb számot írsz."
      />
      <TheoryCallout type="warning" title="XIIII nem jó!">
        A 14-ben is a 4 rejtőzik: <R>XIV</R>. Négy I nem állhat egymás mellett.
      </TheoryCallout>
    </TheorySection>

    <TheorySection title="9. Labor I: Hol van a számegyenesen?" badge="Interaktív labor" badgeColor="purple">
      <p className="text-base text-slate-700 dark:text-slate-300">Vidd a lila nyilat a római szám helyére!</p>
      <RomanLineLab />
    </TheorySection>

    <TheorySection title="10. Labor II: Rakd sorba!" badge="Interaktív labor" badgeColor="amber">
      <p className="text-base text-slate-700 dark:text-slate-300">Koppints a legkisebbre, aztán a következőre!</p>
      <RomanOrderLab />
    </TheorySection>
  </TheoryTemplate>
);

export default Roman20G2Theory;
