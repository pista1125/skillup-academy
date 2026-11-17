import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { NegNumberLineG3Matcher } from './NegNumberLineG3Matcher';
import { NegNumberLineG3Sorter } from './NegNumberLineG3Sorter';
import { FONT, NLSvg, NumberLine, NLPoint, VNumberLine, Thermo, ThermoSvg } from './NegNumberLineG3Parts';

// ---------------------------------------------------------------------------
// Kérdésábrák
// ---------------------------------------------------------------------------
const q = '?';

/** Álló számegyenes nyíllal. */
const VLine: React.FC<{ from: number; to: number; labels: number | number[]; v: number }> = ({ from, to, labels, v }) => {
  const h = Math.min(200, (to - from) * 12);
  return (
    <svg viewBox={`0 0 160 ${h + 50}`} className="w-full max-w-[170px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg">
      <VNumberLine from={from} to={to} x={62} y0={h + 26} y1={26} labels={labels} fs={13} arrow={{ v, text: q }} />
    </svg>
  );
};

/** Hőmérő és mellette fekvő számegyenes betűs pontokkal. */
const ThermoAndLine: React.FC<{ value: number | null; points?: NLPoint[]; labels?: 'all' | number[] }> = ({ value, points = [], labels = [0] }) => (
  <svg viewBox="0 0 340 170" className="w-full max-w-[340px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <Thermo cx={50} yTop={30} yBot={130} min={-5} max={5} value={value} labelStep={5} fs={12} />
    <NumberLine from={-5} to={5} x0={106} x1={312} y={100} labels={labels} fs={13} points={points} />
  </svg>
);

export const NEG_NUMBERLINE_G3_QUESTIONS: QuizQuestion[] = [
  // ------------------------------- 1. szint -------------------------------
  {
    id: 'neg-nl-g3-q1',
    level: 1,
    questionTypeBadge: 'Hiányzó szám',
    figure: <NLSvg from={-5} to={5} labels="all" unknown={[-2]} />,
    question: 'Melyik szám hiányzik a számegyenesről?',
    options: ['–2', '2', '–3', '–1'],
    correctAnswer: 0,
    explanation: 'A 0-tól balra így jönnek a számok: –1, –2, –3 … A kérdőjel a 0-tól 2 lépésre balra van: –2.'
  },
  {
    id: 'neg-nl-g3-q2',
    level: 1,
    questionTypeBadge: 'Nyíl',
    figure: <NLSvg from={-6} to={6} labels={[-1, 0, 1]} arrows={[{ v: -3, text: q }]} />,
    question: 'Melyik számot mutatja a nyíl?',
    options: ['–3', '3', '–4', '–2'],
    correctAnswer: 0,
    explanation: 'A 0-tól 3 lépés balra: –1, –2, –3. A 0-t ne számold lépésnek!'
  },
  {
    id: 'neg-nl-g3-q3',
    level: 1,
    questionTypeBadge: 'Balra vagy jobbra?',
    figure: <NLSvg from={-6} to={6} labels={[0]} />,
    question: 'Merre van a –4 a 0-tól a számegyenesen?',
    options: ['balra', 'jobbra', 'pont a 0-n', 'nincs rajta'],
    correctAnswer: 0,
    explanation: 'A mínuszos (negatív) számok a 0-tól balra vannak. A –4 4 lépéssel balra van.'
  },
  {
    id: 'neg-nl-g3-q4',
    level: 1,
    questionTypeBadge: 'Lépések',
    figure: <NLSvg from={-6} to={2} labels="all" points={[{ v: -5 }]} />,
    question: 'Hány lépésre van a –5 a 0-tól?',
    options: ['5', '4', '6', '1'],
    correctAnswer: 0,
    explanation: 'A 0-tól balra lépkedünk: –1, –2, –3, –4, –5. Ez 5 lépés.'
  },
  {
    id: 'neg-nl-g3-q5',
    level: 1,
    questionTypeBadge: 'Nyíl',
    figure: <NLSvg from={-6} to={6} labels={[-1, 0, 1]} arrows={[{ v: 4, text: q }]} />,
    question: 'Melyik számot mutatja a nyíl?',
    options: ['4', '–4', '5', '3'],
    correctAnswer: 0,
    explanation: 'A 0-tól 4 lépés jobbra: 1, 2, 3, 4. Jobbra nincs mínusz.'
  },
  {
    id: 'neg-nl-g3-q6',
    level: 1,
    questionTypeBadge: 'Hiányzó szám',
    figure: <NLSvg from={-4} to={4} labels={[-2, 0]} unknown={[-1]} />,
    question: 'Melyik szám van a –2 és a 0 között?',
    options: ['–1', '1', '0', '–3'],
    correctAnswer: 0,
    explanation: 'A –2 és a 0 között egy vonal van: a –1. Az 1 a 0-tól jobbra van.'
  },
  {
    id: 'neg-nl-g3-q7',
    level: 1,
    questionTypeBadge: 'Hőmérő',
    figure: <ThermoSvg value={null} min={-10} max={10} h={120} zeroLine />,
    question: 'A hőmérő is számegyenes, csak áll. Hol vannak rajta a negatív számok?',
    options: ['a 0 alatt', 'a 0 fölött', 'a legtetején', 'sehol'],
    correctAnswer: 0,
    explanation: 'A hőmérőn lefelé van a hideg: a negatív számok a 0 alatt vannak (–5, –10).'
  },
  {
    id: 'neg-nl-g3-q8',
    level: 1,
    questionTypeBadge: 'Visszafelé számolás',
    figure: <NLSvg from={-4} to={4} labels={[0, 1, 2, 3]} hops={[{ from: 3, to: 0 }]} arrows={[{ v: -1, text: q }]} />,
    question: 'Folytasd: 3, 2, 1, 0, …',
    options: ['–1', '1', '0', '10'],
    correctAnswer: 0,
    explanation: 'A 0 után is tovább lépünk balra: a következő szám a –1.'
  },
  {
    id: 'neg-nl-g3-q9',
    level: 1,
    questionTypeBadge: 'Balra vagy jobbra?',
    question: 'Melyik szám van a 0-tól jobbra a számegyenesen?',
    options: ['6', '–6', '–1', '–10'],
    correctAnswer: 0,
    explanation: 'A 0-tól jobbra a mínusz nélküli számok vannak: 1, 2, 3 … A 6 ilyen.'
  },
  {
    id: 'neg-nl-g3-q10',
    level: 1,
    questionTypeBadge: 'Pont',
    figure: <NLSvg from={-5} to={5} labels={[-5, 0, 5]} points={[{ v: -1 }]} />,
    question: 'Melyik számot jelöli a piros pont?',
    options: ['–1', '1', '0', '–2'],
    correctAnswer: 0,
    explanation: 'A pont a 0 mellett van, 1 lépéssel balra: ez a –1.'
  },
  // ------------------------------- 2. szint -------------------------------
  {
    id: 'neg-nl-g3-q11',
    level: 2,
    questionTypeBadge: 'Nyíl',
    figure: <NLSvg from={-9} to={4} labels={[-1, 0, 1]} arrows={[{ v: -7, text: q }]} />,
    question: 'Melyik számot mutatja a nyíl?',
    options: ['–7', '–6', '7', '–8'],
    correctAnswer: 0,
    explanation: 'A –1-től tovább balra: –2, –3, –4, –5, –6, –7. A nyíl a –7-et mutatja.'
  },
  {
    id: 'neg-nl-g3-q12',
    level: 2,
    questionTypeBadge: 'Nyíl',
    figure: <NLSvg from={-8} to={2} labels={[-5, 0]} arrows={[{ v: -6, text: q }]} />,
    question: 'Melyik számot mutatja a nyíl?',
    options: ['–6', '–4', '6', '–7'],
    correctAnswer: 0,
    explanation: 'A nyíl a –5-től 1 lépéssel balra van: –6. (Jobbra lépve a –4 lenne.)'
  },
  {
    id: 'neg-nl-g3-q13',
    level: 2,
    questionTypeBadge: 'Nyíl',
    figure: <NLSvg from={-10} to={10} labels={5} arrows={[{ v: -3, text: q }]} />,
    question: 'Itt 5-önként vannak a számok kiírva. Melyik számot mutatja a nyíl?',
    options: ['–3', '–2', '3', '–8'],
    correctAnswer: 0,
    explanation: 'A 0-tól 3 lépés balra: –3. (A –5-től 2 lépés jobbra – ez is a –3.)'
  },
  {
    id: 'neg-nl-g3-q14',
    level: 2,
    questionTypeBadge: 'Betűk',
    figure: (
      <NLSvg
        from={-6}
        to={6}
        labels={[0]}
        points={[
          { v: -5, letter: 'A' },
          { v: -4, letter: 'B', color: '#2563eb' },
          { v: -3, letter: 'C', color: '#059669' },
          { v: 4, letter: 'D', color: '#7c3aed' }
        ]}
      />
    ),
    question: 'Melyik betű jelöli a –4-et?',
    options: ['B', 'A', 'C', 'D'],
    correctAnswer: 0,
    explanation: 'A –4 a 0-tól 4 lépéssel balra van: ott a B. A D a 4-et jelöli, a 0 másik oldalán.'
  },
  {
    id: 'neg-nl-g3-q15',
    level: 2,
    questionTypeBadge: 'Hőmérő és számegyenes',
    figure: (
      <ThermoAndLine
        value={-2}
        points={[
          { v: -3, letter: 'A' },
          { v: -2, letter: 'B', color: '#2563eb' },
          { v: -1, letter: 'C', color: '#059669' },
          { v: 2, letter: 'D', color: '#7c3aed' }
        ]}
      />
    ),
    question: 'Melyik betű mutatja a számegyenesen ugyanazt, mint a hőmérő?',
    options: ['B', 'A', 'C', 'D'],
    correctAnswer: 0,
    explanation: 'A hőmérő –2 °C-ot mutat: 2 vonallal a 0 alatt. A számegyenesen a –2 a 0-tól 2 lépéssel balra van: B.'
  },
  {
    id: 'neg-nl-g3-q16',
    level: 2,
    questionTypeBadge: 'Visszafelé számolás',
    figure: <NLSvg from={-5} to={3} labels={[0, 1]} hops={[{ from: 1, to: -2 }]} arrows={[{ v: -3, text: q }]} />,
    question: 'Folytasd: 1, 0, –1, –2, …',
    options: ['–3', '3', '–1', '0'],
    correctAnswer: 0,
    explanation: 'Mindig egyet lépünk balra. A –2 után a –3 jön.'
  },
  {
    id: 'neg-nl-g3-q17',
    level: 2,
    questionTypeBadge: 'Ugyanolyan messze',
    figure: <NLSvg from={-7} to={7} labels={[0, 6]} arrows={[{ v: -6, text: q }]} />,
    question: 'A nyíl a 0 másik oldalán van, ugyanolyan messze, mint a 6. Melyik szám ez?',
    options: ['–6', '6', '–5', '0'],
    correctAnswer: 0,
    explanation: 'A 6 a 0-tól 6 lépéssel jobbra van. 6 lépés balra: –6.'
  },
  {
    id: 'neg-nl-g3-q18',
    level: 2,
    questionTypeBadge: 'Álló számegyenes',
    figure: <VLine from={-6} to={6} labels={[-5, 0, 5]} v={-3} />,
    question: 'Ez egy álló számegyenes, mint a hőmérő. Melyik számot mutatja a nyíl?',
    options: ['–3', '3', '–2', '–8'],
    correctAnswer: 0,
    explanation: 'A nyíl a 0 alatt van, 3 vonallal lejjebb: –3.'
  },
  {
    id: 'neg-nl-g3-q19',
    level: 2,
    questionTypeBadge: 'Hiányzó szám',
    figure: <NLSvg from={-7} to={1} labels={[-5, -3, 0]} unknown={[-4]} />,
    question: 'Melyik szám van a –5 és a –3 között?',
    options: ['–4', '4', '–2', '–6'],
    correctAnswer: 0,
    explanation: 'A –5 és a –3 között egy vonal van: a –4.'
  },
  {
    id: 'neg-nl-g3-q20',
    level: 2,
    questionTypeBadge: 'Lépések',
    question: 'A 0-tól 8 lépést lépsz balra. Melyik számhoz érsz?',
    options: ['–8', '8', '–7', '0'],
    correctAnswer: 0,
    explanation: 'Balra a negatív számok vannak. 8 lépés balra: –8.'
  },
  // ------------------------------- 3. szint -------------------------------
  {
    id: 'neg-nl-g3-q21',
    level: 3,
    questionTypeBadge: 'Nyíl',
    figure: <NLSvg from={-6} to={12} labels={[0, 10]} arrows={[{ v: -4, text: q }]} />,
    question: 'Csak a 0 és a 10 van kiírva. Melyik számot mutatja a nyíl?',
    options: ['–4', '4', '–5', '–3'],
    correctAnswer: 0,
    explanation: 'A nyíl a 0-tól balra van, 4 lépésre: –4.'
  },
  {
    id: 'neg-nl-g3-q22',
    level: 3,
    questionTypeBadge: 'Nyíl',
    figure: <NLSvg from={-8} to={4} labels={2} arrows={[{ v: -5, text: q }]} />,
    question: 'Itt 2-esével vannak a számok kiírva. Melyik számot mutatja a nyíl?',
    options: ['–5', '–4', '–6', '5'],
    correctAnswer: 0,
    explanation: 'A nyíl a –4 és a –6 között, a középső vonalon van: –5.'
  },
  {
    id: 'neg-nl-g3-q23',
    level: 3,
    questionTypeBadge: 'Nyíl',
    figure: <NLSvg from={-20} to={20} labels={10} arrows={[{ v: -15, text: q }]} />,
    question: 'Itt 10-esével vannak a számok kiírva. Melyik számot mutatja a nyíl?',
    options: ['–15', '–5', '15', '–14'],
    correctAnswer: 0,
    explanation: 'A nyíl a –10 és a –20 között, éppen középen van. A –10-től még 5 lépés balra: –15.'
  },
  {
    id: 'neg-nl-g3-q24',
    level: 3,
    questionTypeBadge: 'Sorozat',
    figure: <NLSvg from={-7} to={3} labels={[-6, -4, 0, 2]} arrows={[{ v: -2, text: q }]} />,
    question: 'Melyik szám hiányzik? –6, –4, ?, 0, 2',
    options: ['–2', '–3', '–1', '2'],
    correctAnswer: 0,
    explanation: 'Mindig 2-t lépünk jobbra: –6, –4, –2, 0, 2.'
  },
  {
    id: 'neg-nl-g3-q25',
    level: 3,
    questionTypeBadge: 'Számolás',
    figure: <NLSvg from={-5} to={1} labels={[-4, 0]} />,
    question: 'Hány szám van a –4 és a 0 között? (A –4-et és a 0-t ne számold!)',
    options: ['3', '4', '5', '2'],
    correctAnswer: 0,
    explanation: 'A –4 és a 0 között: –3, –2, –1. Ez 3 szám.'
  },
  {
    id: 'neg-nl-g3-q26',
    level: 3,
    questionTypeBadge: 'Betűk',
    figure: (
      <NLSvg
        from={-8}
        to={6}
        labels={[0, 5]}
        points={[
          { v: -7, letter: 'A' },
          { v: -6, letter: 'B', color: '#2563eb' },
          { v: -4, letter: 'C', color: '#059669' },
          { v: 6, letter: 'D', color: '#7c3aed' }
        ]}
      />
    ),
    question: 'Melyik betű jelöli a –6-ot?',
    options: ['B', 'A', 'C', 'D'],
    correctAnswer: 0,
    explanation: 'A –6 a 0-tól 6 lépéssel balra van: ott a B. A D a 6-ot jelöli, jobbra.'
  },
  {
    id: 'neg-nl-g3-q27',
    level: 3,
    questionTypeBadge: 'Igaz vagy hamis?',
    figure: <NLSvg from={-4} to={4} labels="all" />,
    question: 'Melyik mondat igaz?',
    options: ['A –2 a 0-tól balra van.', 'A –2 a 0-tól jobbra van.', 'A –2 a 2-től jobbra van.', 'A 0 negatív szám.'],
    correctAnswer: 0,
    explanation: 'A –2 a 0-tól balra van, így a 2-től is balra. A 0 nem negatív szám: ő a határ.'
  },
  {
    id: 'neg-nl-g3-q28',
    level: 3,
    questionTypeBadge: 'Hőmérő és számegyenes',
    figure: <ThermoAndLine value={null} labels="all" />,
    question: 'A hőmérőn a 0 fölötti számok vannak fent. Hol vannak ezek a fekvő számegyenesen?',
    options: ['a 0-tól jobbra', 'a 0-tól balra', 'a 0-n', 'sehol'],
    correctAnswer: 0,
    explanation: 'A hőmérő „fent” része a számegyenes jobb oldala: 1, 2, 3 … A „lent” rész a bal oldal: –1, –2 …'
  },
  {
    id: 'neg-nl-g3-q29',
    level: 3,
    questionTypeBadge: 'Ugyanolyan messze',
    figure: (
      <NLSvg
        from={-5}
        to={5}
        labels={[0]}
        arrows={[
          { v: -3, text: '–3', color: '#2563eb' },
          { v: 3, text: q }
        ]}
      />
    ),
    question: 'A bal oldali nyíl a –3-at mutatja. Melyik számot mutatja a jobb oldali?',
    options: ['3', '–3', '4', '2'],
    correctAnswer: 0,
    explanation: 'Mindkét nyíl 3 lépésre van a 0-tól, csak a másik oldalon. Jobbra: 3.'
  },
  {
    id: 'neg-nl-g3-q30',
    level: 3,
    questionTypeBadge: 'Álló számegyenes',
    figure: <VLine from={-12} to={12} labels={[-10, 0, 10]} v={-7} />,
    question: 'Melyik számot mutatja a nyíl az álló számegyenesen?',
    options: ['–7', '–3', '7', '–8'],
    correctAnswer: 0,
    explanation: 'A nyíl a 0 alatt van, 7 vonallal lejjebb: –7. (A –10-től 3 vonallal feljebb.)'
  }
];

export const NegNumberLineG3Quiz: React.FC<{
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
      topicId="g3-neg-szamegyenes-quiz"
      subtopicId="szamegyenes-es-a-nulla"
      title="2. A számegyenes és a nulla – Kvíz"
      subtitle="30 feladat 3 szinten: számok a 0-tól balra és jobbra, leolvasás, álló számegyenes."
      badge="3. OSZTÁLY • IX. A NEGATÍV SZÁMOK • KVÍZ"
      questions={NEG_NUMBERLINE_G3_QUESTIONS}
      cheatSheets={[
        {
          title: 'A számegyenes',
          items: ['0-tól jobbra: 1, 2, 3 …', '0-tól balra: –1, –2, –3 …', 'A 0 nem negatív: ő a határ.']
        },
        {
          title: 'Leolvasás',
          items: ['Keresd meg a 0-t!', 'Számold a lépéseket (a 0 nem lépés).', 'Balra: mínusz. Jobbra: nincs mínusz.']
        },
        {
          title: 'A hőmérő',
          items: ['álló számegyenes', 'fent = jobbra (0 fölött)', 'lent = balra (0 alatt, mínusz)']
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={<NegNumberLineG3Matcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />}
      sorterComponent={<NegNumberLineG3Sorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />}
    />
  );
};

export default NegNumberLineG3Quiz;
