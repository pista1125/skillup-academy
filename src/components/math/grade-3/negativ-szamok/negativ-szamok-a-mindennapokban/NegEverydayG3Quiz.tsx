import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { NegEverydayG3Matcher } from './NegEverydayG3Matcher';
import { NegEverydayG3Sorter } from './NegEverydayG3Sorter';
import { FONT, INK, ThermoSvg, ThermoRow, BuildingSvg, ForecastSvg, DiverSvg, LiftPanelSvg, FeverThermoIcon, BathThermoIcon, WallThermoIcon } from './NegEverydayG3Parts';
import { IconCard } from './NegEverydayG3CardFigures';

// ---------------------------------------------------------------------------
// Kérdésábrák
// ---------------------------------------------------------------------------
const T: React.FC<{ v: number; min?: number; max?: number; step?: number }> = ({ v, min = -10, max = 10, step = 5 }) => (
  <ThermoSvg value={v} min={min} max={max} labelStep={step} h={(max - min) * 6} className="w-full max-w-[150px] h-auto mx-auto" />
);

const Icon: React.FC<{ kind: React.ComponentProps<typeof IconCard>['kind'] }> = ({ kind }) => (
  <div className="w-full max-w-[220px] mx-auto">
    <IconCard kind={kind} small={false} />
  </div>
);

const SayIt: React.FC<{ text: string }> = ({ text }) => (
  <svg viewBox="0 0 200 80" className="w-full max-w-[240px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="10" y="10" width="180" height="60" rx="12" fill="#eff6ff" stroke="#2563eb" strokeWidth="3" />
    <text x="100" y="51" textAnchor="middle" fontSize="30" fontWeight="bold" fill={INK}>
      {text}
    </text>
  </svg>
);

const ThermoTypesRow: React.FC = () => (
  <svg viewBox="0 0 300 100" className="w-full max-w-[300px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <FeverThermoIcon x={50} y={40} k={1.1} />
    <BathThermoIcon x={148} y={40} k={1.1} />
    <WallThermoIcon x={250} y={40} k={0.9} />
    {['lázmérő', 'fürdővíz-hőmérő', 'kinti hőmérő'].map((t, i) => (
      <text key={t} x={50 + i * 100} y="94" textAnchor="middle" fontSize="12" fontWeight="bold" fill={INK}>
        {t}
      </text>
    ))}
  </svg>
);

export const NEG_EVERYDAY_G3_QUESTIONS: QuizQuestion[] = [
  // ------------------------------- 1. szint -------------------------------
  {
    id: 'neg-ev-g3-q1',
    level: 1,
    questionTypeBadge: 'Hőmérő',
    figure: <T v={-3} />,
    question: 'Hány °C-ot mutat a hőmérő?',
    options: ['–3 °C', '3 °C', '–2 °C', '–4 °C'],
    correctAnswer: 0,
    explanation: 'A piros oszlop a 0 alatt ér véget, 3 vonallal lejjebb. Ez –3 °C.'
  },
  {
    id: 'neg-ev-g3-q2',
    level: 1,
    questionTypeBadge: 'Kiolvasás',
    figure: <SayIt text="–5 °C" />,
    question: 'Hogyan olvassuk ki?',
    options: ['mínusz öt celziusz-fok', 'öt celziusz-fok', 'öt mínusz celziusz-fok', 'mínusz ötven celziusz-fok'],
    correctAnswer: 0,
    explanation: 'A „–” jelet mínusznak olvassuk, és előre mondjuk: mínusz öt celziusz-fok.'
  },
  {
    id: 'neg-ev-g3-q3',
    level: 1,
    questionTypeBadge: 'Fagypont',
    question: 'Hány °C-on fagy meg a víz?',
    options: ['0 °C', '1 °C', '–10 °C', '10 °C'],
    correctAnswer: 0,
    explanation: 'A víz 0 °C-on fagy meg. Ezért hívjuk a 0 °C-ot fagypontnak.'
  },
  {
    id: 'neg-ev-g3-q4',
    level: 1,
    questionTypeBadge: 'Fagypont',
    question: 'Melyik hőmérséklet van a fagypont alatt?',
    options: ['–2 °C', '2 °C', '0 °C', '12 °C'],
    correctAnswer: 0,
    explanation: 'A fagypont alatti hőmérséklet elé mínuszjelet írunk: –2 °C. A 0 °C maga a fagypont.'
  },
  {
    id: 'neg-ev-g3-q5',
    level: 1,
    questionTypeBadge: 'Leírás',
    question: 'Írd le számmal: mínusz hét celziusz-fok!',
    options: ['–7 °C', '7 °C', '–70 °C', '0 °C'],
    correctAnswer: 0,
    explanation: 'A „mínusz” szót a „–” jel mutatja a szám előtt: –7 °C.'
  },
  {
    id: 'neg-ev-g3-q6',
    level: 1,
    questionTypeBadge: 'Hőmérő',
    figure: <T v={8} />,
    question: 'Hány °C-ot mutat a hőmérő?',
    options: ['8 °C', '–8 °C', '7 °C', '9 °C'],
    correctAnswer: 0,
    explanation: 'Az oszlop a 0 fölött van: az 5 fölött még 3 vonal. 5 + 3 = 8, tehát 8 °C.'
  },
  {
    id: 'neg-ev-g3-q7',
    level: 1,
    questionTypeBadge: 'Lift',
    figure: (
      <BuildingSvg
        floors={[
          { n: 2, name: '2. emelet' },
          { n: 1, name: '1. emelet' },
          { n: 0, name: 'földszint' },
          { n: -1, name: 'pince', show: '?' }
        ]}
      />
    ),
    question: 'Milyen szám van a pince gombján?',
    options: ['–1', '1', '0', '–2'],
    correctAnswer: 0,
    explanation: 'A földszint a 0. A pince 1 szinttel lejjebb, a föld alatt van: –1.'
  },
  {
    id: 'neg-ev-g3-q8',
    level: 1,
    questionTypeBadge: 'Hőmérőfajták',
    figure: <Icon kind="sick" />,
    question: 'Melyikkel méred meg, hogy lázas vagy-e?',
    options: ['lázmérővel', 'fürdővíz-hőmérővel', 'kinti hőmérővel', 'vonalzóval'],
    correctAnswer: 0,
    explanation: 'A testünk hőmérsékletét lázmérővel mérjük.'
  },
  {
    id: 'neg-ev-g3-q9',
    level: 1,
    questionTypeBadge: 'Fagypont',
    figure: <T v={-4} />,
    question: 'A kinti hőmérő ennyit mutat. Fagy van?',
    options: ['Igen, mert 0 °C alatt van.', 'Nem, mert 0 °C fölött van.', 'Nem, mert éppen 0 °C van.', 'Ebből nem lehet tudni.'],
    correctAnswer: 0,
    explanation: 'A hőmérő –4 °C-ot mutat. Ez a fagypont alatt van, tehát fagy van.'
  },
  {
    id: 'neg-ev-g3-q10',
    level: 1,
    questionTypeBadge: 'Hőmérő',
    figure: <T v={0} />,
    question: 'Hány °C-ot mutat a hőmérő?',
    options: ['0 °C', '–1 °C', '1 °C', '–5 °C'],
    correctAnswer: 0,
    explanation: 'Az oszlop pontosan a 0-nál ér véget. Ez 0 °C, a fagypont.'
  },
  // ------------------------------- 2. szint -------------------------------
  {
    id: 'neg-ev-g3-q11',
    level: 2,
    questionTypeBadge: 'Hőmérő',
    figure: <T v={-8} />,
    question: 'Hány °C-ot mutat a hőmérő?',
    options: ['–8 °C', '8 °C', '–7 °C', '–12 °C'],
    correctAnswer: 0,
    explanation: 'A –5 alatt még 3 vonal van. Ez –8 °C. (A –10 fölött 2 vonallal.)'
  },
  {
    id: 'neg-ev-g3-q12',
    level: 2,
    questionTypeBadge: 'Hőmérő',
    figure: <T v={13} min={-5} max={20} />,
    question: 'Hány °C-ot mutat a hőmérő?',
    options: ['13 °C', '–13 °C', '12 °C', '17 °C'],
    correctAnswer: 0,
    explanation: 'A 10 fölött még 3 vonal van: 13 °C. A 0 fölött vagyunk, ezért nincs mínusz.'
  },
  {
    id: 'neg-ev-g3-q13',
    level: 2,
    questionTypeBadge: 'Hőmérő',
    figure: <T v={-6} min={-10} max={20} step={10} />,
    question: 'Itt csak 10-esével van felirat. Hány °C-ot mutat?',
    options: ['–6 °C', '–4 °C', '6 °C', '–5 °C'],
    correctAnswer: 0,
    explanation: 'A 0-tól lefelé számolj: 6 vonal. Ez –6 °C. Vigyázz, a –10-től fölfelé csak 4 vonal, de az is a –6.'
  },
  {
    id: 'neg-ev-g3-q14',
    level: 2,
    questionTypeBadge: 'Időjárás',
    figure: (
      <ForecastSvg
        days={[
          { day: 'hétfő', w: 'suncloud', hi: 7, lo: 3 },
          { day: 'kedd', w: 'snow', hi: 4, lo: -1 },
          { day: 'szerda', w: 'sun', hi: 8, lo: 2 },
          { day: 'csüt.', w: 'cloud', hi: 6, lo: 1 }
        ]}
      />
    ),
    question: 'Piros: nappal, kék: éjjel. Melyik éjszaka lesz fagy?',
    options: ['kedden', 'hétfőn', 'szerdán', 'csütörtökön'],
    correctAnswer: 0,
    explanation: 'Fagy akkor van, ha a hőmérséklet 0 °C alatt van. Csak kedd éjjel van mínusz: –1 °C.'
  },
  {
    id: 'neg-ev-g3-q15',
    level: 2,
    questionTypeBadge: 'Időjárás',
    figure: (
      <ForecastSvg
        days={[
          { day: 'hétfő', w: 'cloud', hi: 6, lo: 2 },
          { day: 'kedd', w: 'snow', hi: 3, lo: -1 },
          { day: 'szerda', w: 'cloud', hi: 4, lo: 0 },
          { day: 'csüt.', w: 'snow', hi: 2, lo: -3 },
          { day: 'péntek', w: 'sun', hi: 5, lo: 1 }
        ]}
      />
    ),
    question: 'Hány éjszakán megy a hőmérséklet a fagypont alá? (kék körök)',
    options: ['2', '3', '1', '4'],
    correctAnswer: 0,
    explanation: 'Mínusz csak kedden (–1 °C) és csütörtökön (–3 °C) van: 2 éjszaka. A szerdai 0 °C éppen fagypont, nem alatta.'
  },
  {
    id: 'neg-ev-g3-q16',
    level: 2,
    questionTypeBadge: 'Lift',
    figure: (
      <BuildingSvg
        car
        floors={[
          { n: 1, name: '1. emelet' },
          { n: 0, name: 'földszint' },
          { n: -1, name: 'pince' },
          { n: -2, name: 'mélygarázs', show: '?' }
        ]}
      />
    ),
    question: 'Melyik gombot nyomod meg, ha a mélygarázsba mész?',
    options: ['–2', '2', '–1', '–3'],
    correctAnswer: 0,
    explanation: 'A pince –1. A mélygarázs még egy szinttel lejjebb van: –2.'
  },
  {
    id: 'neg-ev-g3-q17',
    level: 2,
    questionTypeBadge: 'Hőmérőfajták',
    figure: <Icon kind="tub" />,
    question: 'Melyik a jó hőmérséklet a baba fürdővizének?',
    options: ['37 °C', '–37 °C', '7 °C', '73 °C'],
    correctAnswer: 0,
    explanation: 'A fürdővíz langyos: kb. 37 °C, mint a testünk. A 7 °C-os víz hideg, a 73 °C-os forró, a –37 °C pedig jég lenne.'
  },
  {
    id: 'neg-ev-g3-q18',
    level: 2,
    questionTypeBadge: 'Mit jelent?',
    figure: <T v={-10} min={-15} max={10} />,
    question: 'Reggel ennyit mutat a kinti hőmérő. Milyen idő van?',
    options: ['Nagy hideg: kell sapka, sál, kesztyű.', 'Strandidő van.', 'Éppen fagypont van.', 'Langyos tavaszi idő van.'],
    correctAnswer: 0,
    explanation: 'A hőmérő –10 °C-ot mutat. Ez 10 fokkal a fagypont alatt van: nagy hideg.'
  },
  {
    id: 'neg-ev-g3-q19',
    level: 2,
    questionTypeBadge: 'Hőmérő',
    figure: <T v={4} min={-10} max={20} step={10} />,
    question: 'Hány °C-ot mutat a hőmérő?',
    options: ['4 °C', '–4 °C', '6 °C', '14 °C'],
    correctAnswer: 0,
    explanation: 'A 0 fölött 4 vonal van: 4 °C. (A 10-től lefelé 6 vonal – ez is a 4.)'
  },
  {
    id: 'neg-ev-g3-q20',
    level: 2,
    questionTypeBadge: 'Fagypont',
    figure: (
      <ThermoRow
        items={[
          { value: 5, caption: 'A' },
          { value: 0, caption: 'B' },
          { value: -2, caption: 'C' }
        ]}
      />
    ),
    question: 'Melyik hőmérő mutat fagypont alatti hőmérsékletet?',
    options: ['a C', 'az A', 'a B', 'egyik sem'],
    correctAnswer: 0,
    explanation: 'A: 5 °C, B: 0 °C (éppen fagypont), C: –2 °C. Csak a C van a 0 alatt.'
  },
  // ------------------------------- 3. szint -------------------------------
  {
    id: 'neg-ev-g3-q21',
    level: 3,
    questionTypeBadge: 'Mit jelent?',
    question: 'Az udvaron 3 fokkal hidegebb van, mint a fagypont. Mit mutat a hőmérő?',
    options: ['–3 °C', '3 °C', '0 °C', '–30 °C'],
    correctAnswer: 0,
    explanation: 'A fagypont 0 °C. Ennél 3 fokkal hidegebb: 3 vonallal a 0 alatt. Ez –3 °C.'
  },
  {
    id: 'neg-ev-g3-q22',
    level: 3,
    questionTypeBadge: 'Víz alatt',
    figure: <DiverSvg depth={4} label="?" />,
    question: 'A vízfelszín a 0 m. Hogyan írjuk le, hol úszik a búvár?',
    options: ['–4 m', '4 m', '–3 m', '0 m'],
    correctAnswer: 0,
    explanation: 'A búvár 4 méterrel a vízfelszín alatt van. A víz alatti helyeket mínusszal írjuk: –4 m.'
  },
  {
    id: 'neg-ev-g3-q23',
    level: 3,
    questionTypeBadge: 'Fagypont',
    figure: (
      <ThermoRow
        items={[
          { value: -2, caption: 'reggel' },
          { value: 3, caption: 'délben' }
        ]}
      />
    ),
    question: 'Melyik mondat igaz?',
    options: ['Reggel fagy volt, délben nem.', 'Délben fagy volt, reggel nem.', 'Reggel is, délben is fagy volt.', 'Egyszer sem volt fagy.'],
    correctAnswer: 0,
    explanation: 'Reggel –2 °C volt: ez a fagypont alatt van, fagy volt. Délben 3 °C volt: ez a fagypont fölött van.'
  },
  {
    id: 'neg-ev-g3-q24',
    level: 3,
    questionTypeBadge: 'Hőmérő',
    figure: <T v={-13} min={-20} max={10} step={10} />,
    question: 'Hány °C-ot mutat a hőmérő?',
    options: ['–13 °C', '–7 °C', '13 °C', '–12 °C'],
    correctAnswer: 0,
    explanation: 'A –10 alatt még 3 vonal van: –13 °C. Lefelé haladva egyre hidegebb van.'
  },
  {
    id: 'neg-ev-g3-q25',
    level: 3,
    questionTypeBadge: 'Mit jelent?',
    figure: <Icon kind="ice" />,
    question: 'Reggelre befagyott a tócsa. Melyik hőmérséklet lehetett éjjel?',
    options: ['–4 °C', '4 °C', '14 °C', '24 °C'],
    correctAnswer: 0,
    explanation: 'A víz akkor fagy meg, ha 0 °C vagy annál hidegebb van. A felsoroltak közül csak a –4 °C ilyen.'
  },
  {
    id: 'neg-ev-g3-q26',
    level: 3,
    questionTypeBadge: 'Lift',
    figure: <LiftPanelSvg buttons={[3, 2, 1, 0, -1, -2]} />,
    question: 'Ezek a lift gombjai. Hány szint van a föld alatt?',
    options: ['2', '3', '1', '6'],
    correctAnswer: 0,
    explanation: 'A föld alatti szintek gombján mínusz van: –1 és –2. Ez 2 szint. A 0 a földszint.'
  },
  {
    id: 'neg-ev-g3-q27',
    level: 3,
    questionTypeBadge: 'Fagypont',
    question: 'Melyik NEM fagypont alatti hőmérséklet?',
    options: ['0 °C', '–1 °C', '–5 °C', '–9 °C'],
    correctAnswer: 0,
    explanation: 'A 0 °C maga a fagypont: nem alatta van. A –1 °C, –5 °C, –9 °C mind a fagypont alatt van.'
  },
  {
    id: 'neg-ev-g3-q28',
    level: 3,
    questionTypeBadge: 'Hőmérőfajták',
    figure: <ThermoTypesRow />,
    question: 'Melyik hőmérőn láthatsz télen –5 °C-ot?',
    options: ['a kinti hőmérőn', 'a lázmérőn', 'a fürdővíz-hőmérőn', 'mindhárom hőmérőn'],
    correctAnswer: 0,
    explanation: 'A lázmérő és a fürdővíz-hőmérő meleget mér (36–39 °C körül). A téli hideget a kinti hőmérő mutatja.'
  },
  {
    id: 'neg-ev-g3-q29',
    level: 3,
    questionTypeBadge: 'Időjárás',
    figure: (
      <ForecastSvg
        days={[
          { day: 'hétfő', w: 'cloud', hi: 5, lo: -1 },
          { day: 'kedd', w: 'sun', hi: 6, lo: 2 },
          { day: 'szerda', w: 'snow', hi: 1, lo: -3 },
          { day: 'csüt.', w: 'snow', hi: -2, lo: -6 }
        ]}
      />
    ),
    question: 'Melyik napon nem volt fagy sem nappal, sem éjjel?',
    options: ['kedden', 'hétfőn', 'szerdán', 'csütörtökön'],
    correctAnswer: 0,
    explanation: 'Mindkét körben 0 fölötti szám kell. Csak kedden: nappal 6 °C, éjjel 2 °C. A többi napon van mínusz.'
  },
  {
    id: 'neg-ev-g3-q30',
    level: 3,
    questionTypeBadge: 'Hőmérő',
    figure: <T v={-12} min={-15} max={15} />,
    question: 'Hány °C-ot mutat a hőmérő?',
    options: ['–12 °C', '–8 °C', '12 °C', '–13 °C'],
    correctAnswer: 0,
    explanation: 'A –10 alatt még 2 vonal van: –12 °C.'
  }
];

export const NegEverydayG3Quiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => {
  return (
    <QuizTemplate
      grade={3}
      chapterId="negativ-szamok"
      topicId="g3-neg-mindennapok-quiz"
      subtopicId="negativ-szamok-a-mindennapokban"
      title="1. Negatív számok a mindennapokban – Kvíz"
      subtitle="30 feladat 3 szinten: hőmérő leolvasása, fagypont, lift, víz alatt."
      badge="3. OSZTÁLY • IX. A NEGATÍV SZÁMOK • KVÍZ"
      questions={NEG_EVERYDAY_G3_QUESTIONS}
      cheatSheets={[
        {
          title: 'A hőmérő',
          items: ['°C: Celsius-fok', '1 vonal = 1 fok', 'Keresd meg a 0-t, onnan számolj!']
        },
        {
          title: 'Fagypont',
          items: ['0 °C: a víz megfagy', '0 alatt: mínusz, pl. –3 °C', '„mínusz három celziusz-fok”']
        },
        {
          title: 'Mínusz máshol is',
          items: ['lift: földszint 0, pince –1', 'mélygarázs: –2', 'víz alatt 3 m: –3 m']
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={<NegEverydayG3Matcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />}
      sorterComponent={<NegEverydayG3Sorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />}
    />
  );
};

export default NegEverydayG3Quiz;
