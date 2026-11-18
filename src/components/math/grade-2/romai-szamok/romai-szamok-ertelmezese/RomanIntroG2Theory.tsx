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
  WhereWeMeetRomanSvg,
  ThreeSignsSticksSvg,
  MaxThreeSignsSvg,
  LeftRightRuleSvg,
  NoZeroRomanSvg
} from './RomanIntroG2Figures';
import { StickBuilderLab, LeftRightLab } from './RomanIntroG2Parts';

const R: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <strong style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>{children}</strong>
);

export const RomanIntroG2Theory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => (
  <TheoryTemplate
    topicId="g2-roman-numbers"
    subtopicId="romai-szamok-ertelmezese"
    grade={2}
    chapterId="romai-szamok"
    title="1. Római számok értelmezése"
    subtitle="Hol látunk római számokat? Az I, V, X jelek pálcikával, legfeljebb 3 egyforma jel, jobbra hozzáadunk, balra elveszünk."
    badge="2. OSZTÁLY • VI. A RÓMAI SZÁMOK • TANANYAG"
    themeColor="blue"
    pdfFilename="2_osztaly_romai_szamok_ertelmezese_tananyag.pdf"
    practiceTitle="Készen állsz? Gyakoroljunk!"
    practiceSubtitle="Próbáld ki magad a 3 szintes kvízben és a játékokban!"
    onBack={onBack}
    onStartQuiz={onStartQuiz}
    quickRule={{
      label: 'FONTOS — HÁROM JEL, KÉT SZABÁLY',
      align: 'left',
      formula: (
        <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
          <div
            className="p-2.5 rounded-xl bg-blue-50/90 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800/80 text-center text-lg font-black text-blue-900 dark:text-blue-200"
            style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
          >
            I = 1 &nbsp;•&nbsp; V = 5 &nbsp;•&nbsp; X = 10
          </div>
          <ul className="list-disc pl-4 space-y-1 text-xs">
            <li><strong>Jobbra hozzáadunk:</strong> VI = 5 + 1 = 6.</li>
            <li><strong>Balra elveszünk:</strong> IV = 5 − 1 = 4.</li>
            <li><strong>Legfeljebb 3</strong> egyforma jel állhat egymás mellett: III jó, IIII nem jó.</li>
          </ul>
        </div>
      )
    }}
  >
    <TheorySection title="1. Mit tanulunk?" badge="Új számírás" badgeColor="blue">
      <div className="space-y-2 text-base text-slate-700 dark:text-slate-300 leading-relaxed">
        <p>A számokat eddig így írtad: 1, 2, 3 …</p>
        <p>Nagyon régen a <strong>rómaiak</strong> másképp írták. Betűszerű <strong>jeleket</strong> használtak.</p>
        <p>Ma is találkozunk velük. Nézzük meg, hol!</p>
      </div>
    </TheorySection>

    <TheorySection title="2. Hol látunk római számokat?" badge="Körülöttünk" badgeColor="sky">
      <WhereWeMeetRomanSvg />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TheoryCard title="Az órán" badge="Óra" badgeColor="blue">
          <p className="text-base text-slate-700 dark:text-slate-300">
            Sok óra számlapján római számok vannak. Felül a <R>XII</R> áll, ez a 12.
          </p>
        </TheoryCard>
        <TheoryCard title="Királyok nevében" badge="IV. Béla" badgeColor="amber">
          <p className="text-base text-slate-700 dark:text-slate-300">
            <R>I.</R> István = első István. <R>IV.</R> Béla = negyedik Béla.
          </p>
        </TheoryCard>
        <TheoryCard title="Könyvekben" badge="Fejezet" badgeColor="emerald">
          <p className="text-base text-slate-700 dark:text-slate-300">
            <R>III.</R> fejezet = harmadik fejezet.
          </p>
        </TheoryCard>
        <TheoryCard title="Házakban, városban" badge="Emelet" badgeColor="purple">
          <p className="text-base text-slate-700 dark:text-slate-300">
            <R>II.</R> emelet = második emelet. <R>XIII.</R> kerület = tizenharmadik kerület.
          </p>
        </TheoryCard>
      </div>
      <TheoryCallout type="info" title="A pont is számít!">
        Ha pont áll a római szám után, „hányadik”-at mondunk: <R>V.</R> = ötödik.
      </TheoryCallout>
    </TheorySection>

    <TheorySection title="3. A három jel: I, V, X" badge="Pálcikával" badgeColor="amber">
      <ThreeSignsSticksSvg />
      <TheoryTable
        headers={['Jel', 'Ennyit ér', 'Pálcika']}
        rows={[
          [<R key="i">I</R>, '1', '1 pálcika, állva'],
          [<R key="v">V</R>, '5', '2 pálcika, alul összeér'],
          [<R key="x">X</R>, '10', '2 pálcika, keresztben']
        ]}
      />
      <TheoryCallout type="tip" title="Rakd ki te is!">
        Vegyél elő pálcikát vagy gyufaszálat. Rakd ki: <R>I</R>, <R>V</R>, <R>X</R>!
      </TheoryCallout>
    </TheorySection>

    <TheorySection title="4. Legfeljebb 3 egyforma jel" badge="1. szabály" badgeColor="emerald">
      <MaxThreeSignsSvg />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TheoryCard title="Ez jó" badge="III = 3" badgeColor="emerald">
          <p className="text-base text-slate-700 dark:text-slate-300">
            <R>II</R> = 1 + 1 = 2. <R>III</R> = 1 + 1 + 1 = 3. <R>XX</R> = 10 + 10 = 20.
          </p>
        </TheoryCard>
        <TheoryCard title="Ez nem jó" badge="IIII" badgeColor="rose">
          <p className="text-base text-slate-700 dark:text-slate-300">
            Négy I-t nem írunk egymás mellé. A 4 így néz ki: <R>IV</R>.
          </p>
        </TheoryCard>
      </div>
      <TheoryCallout type="warning" title="A V-ből csak egy!">
        <R>VV</R> nem jó. A 10-et egy jellel írjuk: <R>X</R>.
      </TheoryCallout>
    </TheorySection>

    <TheorySection title="5. Jobbra hozzáadunk, balra elveszünk" badge="2. szabály" badgeColor="purple">
      <LeftRightRuleSvg />
      <TheoryTable
        headers={['Római szám', 'Hol az I?', 'Számolás', 'Érték']}
        rows={[
          [<R key="a">VI</R>, 'jobbra', '5 + 1', '6'],
          [<R key="b">IV</R>, 'balra', '5 − 1', '4'],
          [<R key="c">XI</R>, 'jobbra', '10 + 1', '11'],
          [<R key="d">IX</R>, 'balra', '10 − 1', '9']
        ]}
      />
      <TheoryCallout type="info" title="Balra csak egy I!">
        A V vagy az X elé csak <strong>egy</strong> I kerülhet. <R>IIX</R> nem jó, a 8 így van: <R>VIII</R>.
      </TheoryCallout>
    </TheorySection>

    <TheorySection title="6. Nincs nulla!" badge="Érdekesség" badgeColor="teal">
      <NoZeroRomanSvg />
      <p className="text-base text-slate-700 dark:text-slate-300">
        A rómaiak <strong>nem írtak nullát</strong>. A római számok az <R>I</R>-gyel kezdődnek.
      </p>
    </TheorySection>

    <TheorySection title="7. Nézzük meg együtt!" badge="Mintapéldák" badgeColor="sky">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <TheoryCard title="A) Mennyi a VII?" badge="jobbra" badgeColor="emerald">
          <ul className="list-disc pl-5 space-y-1 text-base text-slate-700 dark:text-slate-300">
            <li>Elöl a <R>V</R>: 5.</li>
            <li>Utána két <R>I</R>: + 1 + 1.</li>
            <li>5 + 2 = <strong>7</strong>.</li>
          </ul>
        </TheoryCard>
        <TheoryCard title="B) Mennyi a IX?" badge="balra" badgeColor="rose">
          <ul className="list-disc pl-5 space-y-1 text-base text-slate-700 dark:text-slate-300">
            <li>A nagy jel az <R>X</R>: 10.</li>
            <li>Az <R>I</R> előtte áll: elveszünk 1-et.</li>
            <li>10 − 1 = <strong>9</strong>.</li>
          </ul>
        </TheoryCard>
        <TheoryCard title="C) Hányadik?" badge="XII." badgeColor="amber">
          <ul className="list-disc pl-5 space-y-1 text-base text-slate-700 dark:text-slate-300">
            <li><R>XII.</R> kerület.</li>
            <li><R>X</R> + <R>I</R> + <R>I</R> = 10 + 1 + 1 = 12.</li>
            <li>Ez a <strong>tizenkettedik</strong> kerület.</li>
          </ul>
        </TheoryCard>
      </div>
    </TheorySection>

    <TheorySection title="8. Vigyázz!" badge="Csapda" badgeColor="rose">
      <TheoryTrapBox
        title="IV vagy VI?"
        wrong="IV = 6"
        wrongExplanation="Itt az I a V előtt, balra áll. Balra elveszünk!"
        correct="IV = 5 − 1 = 4,  VI = 5 + 1 = 6"
        correctExplanation="Mindig nézd meg, hol áll a kis jel: balra vagy jobbra?"
        tip="Balra: elvesz. Jobbra: hozzáad."
      />
      <TheoryCallout type="warning" title="Az órán néha IIII áll!">
        Néhány régi órán a 4 helyén <R>IIII</R> látható. Ez díszítés. Mi mindig <R>IV</R>-et írunk.
      </TheoryCallout>
    </TheorySection>

    <TheorySection title="9. Labor I: Pálcika-építő" badge="Interaktív labor" badgeColor="orange">
      <p className="text-base text-slate-700 dark:text-slate-300">Koppints az I, V, X jelekre. Rakd ki a kért számot!</p>
      <StickBuilderLab min={1} max={20} first={7} />
    </TheorySection>

    <TheorySection title="10. Labor II: Balra vagy jobbra?" badge="Interaktív labor" badgeColor="purple">
      <p className="text-base text-slate-700 dark:text-slate-300">Hova tegyed az I-t? Balra elvesz, jobbra hozzáad.</p>
      <LeftRightLab />
    </TheorySection>
  </TheoryTemplate>
);

export default RomanIntroG2Theory;
