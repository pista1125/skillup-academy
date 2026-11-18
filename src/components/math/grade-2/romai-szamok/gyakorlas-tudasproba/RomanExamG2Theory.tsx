import React from 'react';
import { TheoryTemplate, TheorySection, TheoryCard, TheoryCallout, TheoryTrapBox } from '../TheoryTemplate';
import { RomanRecapRulesSvg, RomanFullTableSvg, RomanReadStepsSvg, RomanMistakesSvg } from './RomanExamG2Figures';
import { RomanMixedLab, RomanValidityLab } from './RomanExamG2Parts';

const R: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <strong style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>{children}</strong>
);

export const RomanExamG2Theory: React.FC<{
  onBack?: () => void;
  onStartQuiz?: () => void;
}> = ({ onBack, onStartQuiz }) => (
  <TheoryTemplate
    topicId="g2-roman-numbers"
    subtopicId="gyakorlas-tudasproba"
    grade={2}
    chapterId="romai-szamok"
    title="4. Gyakorlás, tudáspróba"
    subtitle="A VI. témakör összefoglalása: az I, V, X jelek, a két szabály, római számok 1-től 20-ig, összehasonlítás, római óra és számolás átírással."
    badge="2. OSZTÁLY • VI. A RÓMAI SZÁMOK • TANANYAG"
    themeColor="amber"
    pdfFilename="2_osztaly_romai_szamok_tudasproba_tananyag.pdf"
    practiceTitle="Készen állsz a tudáspróbára?"
    practiceSubtitle="Próbáld ki magad a 90 feladatos, 3 szintes összefoglaló kvízben, vagy játssz a Párosítóval és a Csoportosítóval!"
    onBack={onBack}
    onStartQuiz={onStartQuiz}
    quickRule={{
      label: 'ÖSSZEFOGLALÓ — RÓMAI SZÁMOK 1-TŐL 20-IG',
      align: 'left',
      formula: (
        <div className="space-y-2 text-slate-800 dark:text-slate-100 font-normal">
          <div
            className="p-2.5 rounded-xl bg-amber-50/90 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800/80 text-center text-lg font-black text-amber-900 dark:text-amber-200"
            style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
          >
            I = 1 • V = 5 • X = 10
          </div>
          <ul className="list-disc pl-4 space-y-1 text-xs">
            <li>Legfeljebb 3 egyforma jel egymás mellett.</li>
            <li>Jobbra hozzáad (VI = 6), balra elvesz (IV = 4).</li>
            <li>11–20: elöl az X, utána az 1–10 római alakja (XVII = 17).</li>
            <li>Összehasonlítás és számolás előtt írd át arab számmá!</li>
          </ul>
        </div>
      )
    }}
  >
    <TheorySection title="1. Amit már tudsz a VI. témakörből" badge="Ismétlés" badgeColor="blue">
      <RomanRecapRulesSvg />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <TheoryCard title="Értelmezés" badge="1. lecke" badgeColor="blue">
          <p className="text-base text-slate-700 dark:text-slate-300">
            Órán, könyvben, királyok nevében látunk római számot. <R>IV.</R> Béla = negyedik Béla.
          </p>
        </TheoryCard>
        <TheoryCard title="1-től 10-ig" badge="2. lecke" badgeColor="emerald">
          <p className="text-base text-slate-700 dark:text-slate-300">
            <R>I II III IV V VI VII VIII IX X</R>. A 4 és a 9: egy hiányzik.
          </p>
        </TheoryCard>
        <TheoryCard title="11-től 20-ig" badge="3. lecke" badgeColor="purple">
          <p className="text-base text-slate-700 dark:text-slate-300">
            Elöl az <R>X</R>, utána a régi ismerős: <R>XIX</R> = 10 + 9 = 19.
          </p>
        </TheoryCard>
      </div>
    </TheorySection>

    <TheorySection title="2. A teljes tábla" badge="1–20" badgeColor="sky">
      <RomanFullTableSvg />
      <TheoryCallout type="info" title="Figyeld a két sort!">
        Az alsó sor minden száma ugyanaz, mint a felső, csak egy <R>X</R> áll előtte.
      </TheoryCallout>
    </TheorySection>

    <TheorySection title="3. Így olvasd ki!" badge="3 lépés" badgeColor="emerald">
      <RomanReadStepsSvg />
    </TheorySection>

    <TheorySection title="4. Vigyázz a tipikus hibákra!" badge="Csapda" badgeColor="rose">
      <RomanMistakesSvg />
      <TheoryTrapBox
        title="Több jel = nagyobb szám?"
        wrong="XVIII > XIX, mert több benne a jel"
        wrongExplanation="Nem a jeleket számoljuk, hanem az értéküket!"
        correct="XVIII = 18,  XIX = 19,  tehát XVIII < XIX"
        correctExplanation="Mindig írd át arab számmá, és úgy hasonlítsd össze."
        tip="Balra elvesz: IX = 9, de XI = 11."
      />
    </TheorySection>

    <TheorySection title="5. Nézzük meg együtt!" badge="Vegyes feladatok" badgeColor="amber">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TheoryCard title="A) Mennyi a XIX?" badge="Olvasás" badgeColor="blue">
          <ul className="list-disc pl-5 space-y-1 text-base text-slate-700 dark:text-slate-300">
            <li>Bontsd: <R>X</R> és <R>IX</R>.</li>
            <li>10 és 10 − 1 = 9.</li>
            <li>10 + 9 = <strong>19</strong>.</li>
          </ul>
        </TheoryCard>
        <TheoryCard title="B) Írd rómaiul: 17" badge="Írás" badgeColor="emerald">
          <ul className="list-disc pl-5 space-y-1 text-base text-slate-700 dark:text-slate-300">
            <li>17 = 10 + 7.</li>
            <li>10 = <R>X</R>, 7 = <R>VII</R>.</li>
            <li>Együtt: <R>XVII</R>.</li>
          </ul>
        </TheoryCard>
        <TheoryCard title="C) Római óra" badge="3 óra múlva" badgeColor="sky">
          <ul className="list-disc pl-5 space-y-1 text-base text-slate-700 dark:text-slate-300">
            <li>A kismutató a <R>VIII</R>-ra mutat: 8 óra.</li>
            <li>3 óra múlva: 8 + 3 = 11.</li>
            <li>Rómaiul: <R>XI</R> óra.</li>
          </ul>
        </TheoryCard>
        <TheoryCard title="D) Számolj átírással!" badge="XX − VII" badgeColor="rose">
          <ul className="list-disc pl-5 space-y-1 text-base text-slate-700 dark:text-slate-300">
            <li><R>XX</R> = 20, <R>VII</R> = 7.</li>
            <li>20 − 7 = 13.</li>
            <li>Rómaiul: <R>XIII</R>.</li>
          </ul>
        </TheoryCard>
      </div>
    </TheorySection>

    <TheorySection title="6. Labor I: Vegyes feladatgenerátor" badge="Labor" badgeColor="amber">
      <p className="text-base text-slate-700 dark:text-slate-300">Válassz feladattípust, vagy kérj vegyeset! Hányat találsz el elsőre?</p>
      <RomanMixedLab />
    </TheorySection>

    <TheorySection title="7. Labor II: Szabályos vagy hibás?" badge="Labor" badgeColor="sky">
      <p className="text-base text-slate-700 dark:text-slate-300">Nézd meg a jeleket! Jól írták, vagy hibás?</p>
      <RomanValidityLab />
    </TheorySection>
  </TheoryTemplate>
);

export default RomanExamG2Theory;
