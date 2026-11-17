import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { NumberLine200G3Matcher } from './NumberLine200G3Matcher';
import { NumberLine200G3Sorter } from './NumberLine200G3Sorter';
import { FONT, UNK, NLine, NLineMark, Hop, Grasshopper, Tape } from './NumberLine200G3Parts';

// ---------------------------------------------------------------------------
// Kérdésábrák
// ---------------------------------------------------------------------------
const QFig: React.FC<{ children: React.ReactNode; h?: number }> = ({ children, h = 90 }) => (
  <svg viewBox={`0 0 240 ${h}`} className="w-full max-w-[280px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="238" height={h - 2} rx="10" fill="#f8fafc" stroke="#cbd5e1" />
    {children}
  </svg>
);

const LX0 = 20;
const LX1 = 212;

/** Számegyenes-részlet a kérdéshez. */
const LineQ: React.FC<{
  lo: number;
  step: number;
  n: number;
  labels: number[];
  marks?: NLineMark[];
  seg?: [number, number];
  big?: number;
  mid?: number;
}> = ({ lo, step, n, labels, marks, seg, big = 10, mid }) => (
  <QFig h={90}>
    <NLine x0={LX0} x1={LX1} y={54} lo={lo} step={step} n={n} labels={labels} marks={marks} seg={seg} big={big} mid={mid} />
  </QFig>
);

/** Szöcske ugrásai: from → (lépések) → ?; egyes beosztás lo-tól lo + n-ig. */
const HopQ: React.FC<{ lo: number; n: number; from: number; hops: number[]; labels: number[]; hopLabels?: string[] }> = ({ lo, n, from, hops, labels, hopLabels }) => {
  const X = (v: number) => LX0 + ((LX1 - LX0) * (v - lo)) / n;
  const y = 70;
  let cur = from;
  const arcs = hops.map((d, k) => {
    const a = cur;
    cur += d;
    return <Hop key={k} xa={X(a)} xb={X(cur)} y={y - 8} h={k === 0 ? (hops.length > 1 ? 26 : 10 + Math.min(Math.abs(d), 10) * 1.2) : 9} text={hopLabels?.[k]} color={k === 0 ? '#16a34a' : '#7c3aed'} />;
  });
  return (
    <QFig h={110}>
      <Grasshopper x={hops[0] < 0 ? X(from) + 20 : X(from) - 20} y={y} s={0.8} flip={hops[0] < 0} />
      {arcs}
      <NLine
        x0={LX0}
        x1={LX1}
        y={y}
        lo={lo}
        step={1}
        n={n}
        mid={5}
        labels={labels.map((v) => v - lo)}
      />
      <text x={X(cur)} y={y + 36} textAnchor="middle" fontSize="13" fontWeight="bold" fill={UNK}>?</text>
    </QFig>
  );
};

/** Mérőszalag 0–200 cm jelölésekkel. */
const TapeQ: React.FC<{ marks: { cm: number; text: string; color?: string }[] }> = ({ marks }) => {
  const x0 = 20;
  const x1 = 214;
  const X = (cm: number) => x0 + ((x1 - x0) * cm) / 200;
  return (
    <QFig h={100}>
      <Tape x0={x0} x1={x1} y={46} h={30} />
      {marks.map((m, k) => (
        <g key={k}>
          <line x1={X(m.cm)} y1={28} x2={X(m.cm)} y2={80} stroke={m.color || UNK} strokeWidth="2" />
          <text x={X(m.cm)} y={22} textAnchor="middle" fontSize="12" fontWeight="bold" fill={m.color || UNK}>{m.text}</text>
        </g>
      ))}
      <text x="120" y="94" textAnchor="middle" fontSize="10" fill="#78350f">cm-ben; a kis vonások 5 cm-enként</text>
    </QFig>
  );
};

const Q = (i: number, text = '?'): NLineMark => ({ i, text });

// ---------------------------------------------------------------------------
// Kérdések
// ---------------------------------------------------------------------------
export const NUMBER_LINE_200_G3_QUESTIONS: QuizQuestion[] = [
  // ---------------- 1. szint ----------------
  {
    id: 'nl200g3-q1',
    level: 1,
    questionTypeBadge: 'Leolvasás',
    figure: <LineQ lo={0} step={10} n={10} labels={[0, 5, 10]} big={50} marks={[Q(7)]} />,
    question: 'Egy osztás 10-et ér. Melyik szám van a „?” helyén?',
    options: ['70', '7', '60', '80'],
    correctAnswer: 0,
    explanation: 'Tízesével lépünk: 10, 20, 30, 40, 50, 60, 70. A 7. vonás a 70.'
  },
  {
    id: 'nl200g3-q2',
    level: 1,
    questionTypeBadge: 'Leolvasás',
    figure: <LineQ lo={100} step={10} n={10} labels={[0, 5, 10]} big={50} marks={[Q(3)]} />,
    question: 'Egy osztás 10-et ér. Melyik szám van a „?” helyén?',
    options: ['130', '103', '140', '120'],
    correctAnswer: 0,
    explanation: '100-tól 3 tízes lépés: 110, 120, 130.'
  },
  {
    id: 'nl200g3-q3',
    level: 1,
    questionTypeBadge: 'Leolvasás',
    figure: <LineQ lo={140} step={1} n={10} labels={[0, 5, 10]} mid={5} marks={[Q(7)]} />,
    question: 'Egy osztás 1-et ér. Melyik szám van a „?” helyén?',
    options: ['147', '148', '146', '157'],
    correctAnswer: 0,
    explanation: 'A 145 után még 2 lépés: 146, 147.'
  },
  {
    id: 'nl200g3-q4',
    level: 1,
    questionTypeBadge: 'Számszomszéd',
    figure: <LineQ lo={125} step={1} n={6} labels={[0, 1, 2, 3]} big={1000} marks={[Q(4)]} />,
    question: 'Melyik szám áll közvetlenül a 128 után?',
    options: ['129', '127', '130', '138'],
    correctAnswer: 0,
    explanation: 'Jobbra lépve 1-gyel nagyobb a szám: 128 + 1 = 129.'
  },
  {
    id: 'nl200g3-q5',
    level: 1,
    questionTypeBadge: 'Összehasonlítás',
    question: 'Melyik szám van a számegyenesen a legjobbra?',
    options: ['199', '191', '119', '99'],
    correctAnswer: 0,
    explanation: 'Jobbra vannak a nagyobb számok. A legnagyobb a 199, ezért az van a legjobbra.'
  },
  {
    id: 'nl200g3-q6',
    level: 1,
    questionTypeBadge: 'Mérőszalag',
    figure: <TapeQ marks={[{ cm: 130, text: '?' }]} />,
    question: 'Milyen messze ugrott a gyerek?',
    options: ['130 cm', '103 cm', '140 cm', '30 cm'],
    correctAnswer: 0,
    explanation: 'A vonal a 100 cm után a 3. hosszabb vonásnál van. 100 + 30 = 130 cm.'
  },
  {
    id: 'nl200g3-q7',
    level: 1,
    questionTypeBadge: 'Szöcske',
    figure: <HopQ lo={155} n={10} from={160} hops={[3]} labels={[155, 160, 165]} hopLabels={['3']} />,
    question: 'A szöcske a 160-on ül. 3-at ugrik jobbra. Hová érkezik?',
    options: ['163', '157', '162', '170'],
    correctAnswer: 0,
    explanation: 'Jobbra a szám nő: 161, 162, 163.'
  },
  {
    id: 'nl200g3-q8',
    level: 1,
    questionTypeBadge: 'Leolvasás',
    figure: <LineQ lo={180} step={1} n={20} labels={[0, 10, 20]} mid={5} marks={[Q(13)]} />,
    question: 'Egy osztás 1-et ér. Melyik szám van a „?” helyén?',
    options: ['193', '183', '192', '197'],
    correctAnswer: 0,
    explanation: 'A 190 után még 3 lépés: 191, 192, 193.'
  },
  {
    id: 'nl200g3-q9',
    level: 1,
    questionTypeBadge: 'Között',
    figure: <LineQ lo={150} step={10} n={4} labels={[0, 1, 2, 3, 4]} big={1000} seg={[2, 3]} />,
    question: 'Melyik szám van a színes részen, a 170 és a 180 között?',
    options: ['174', '184', '107', '169'],
    correctAnswer: 0,
    explanation: 'A 170 és a 180 között vannak: 171, 172, … 179. A 174 ezek közül való.'
  },
  {
    id: 'nl200g3-q10',
    level: 1,
    questionTypeBadge: 'Között',
    figure: <LineQ lo={118} step={1} n={6} labels={[2, 4]} big={1000} marks={[Q(3)]} />,
    question: 'Melyik szám van a 120 és a 122 között?',
    options: ['121', '123', '119', '112'],
    correctAnswer: 0,
    explanation: 'A 120 és a 122 között csak egy szám van: a 121.'
  },

  // ---------------- 2. szint ----------------
  {
    id: 'nl200g3-q11',
    level: 2,
    questionTypeBadge: 'Beosztás',
    figure: <LineQ lo={100} step={5} n={10} labels={[0, 10]} big={50} marks={[Q(7)]} />,
    question: 'Melyik szám van a „?” helyén?',
    options: ['135', '107', '140', '130'],
    correctAnswer: 0,
    explanation: '100-tól 150-ig 10 lépés van. 10 darab 5 = 50, egy osztás 5. 100, 105, … a 7. lépés 135.'
  },
  {
    id: 'nl200g3-q12',
    level: 2,
    questionTypeBadge: 'Beosztás',
    figure: <LineQ lo={160} step={2} n={10} labels={[0, 5, 10]} marks={[Q(3)]} />,
    question: 'Melyik szám van a „?” helyén?',
    options: ['166', '163', '168', '164'],
    correctAnswer: 0,
    explanation: '160-tól 170-ig 5 lépés van, egy osztás 2. 162, 164, 166.'
  },
  {
    id: 'nl200g3-q13',
    level: 2,
    questionTypeBadge: 'Beosztás',
    figure: <LineQ lo={0} step={20} n={10} labels={[0, 5, 10]} big={100} marks={[Q(7)]} />,
    question: 'Melyik szám van a „?” helyén?',
    options: ['140', '70', '107', '120'],
    correctAnswer: 0,
    explanation: '0-tól 100-ig 5 lépés van, egy osztás 20. 20, 40, 60, 80, 100, 120, 140.'
  },
  {
    id: 'nl200g3-q14',
    level: 2,
    questionTypeBadge: 'Mérőszalag',
    figure: <TapeQ marks={[{ cm: 185, text: '?' }]} />,
    question: 'Milyen messze ugrott a gyerek?',
    options: ['185 cm', '180 cm', '175 cm', '190 cm'],
    correctAnswer: 0,
    explanation: 'A 150 cm után 3 hosszabb vonás 180 cm. Még egy kis vonás (5 cm): 185 cm.'
  },
  {
    id: 'nl200g3-q15',
    level: 2,
    questionTypeBadge: 'Szöcske',
    figure: <HopQ lo={120} n={15} from={130} hops={[-6]} labels={[120, 125, 130, 135]} hopLabels={['6']} />,
    question: 'A szöcske a 130-on ül. 6-ot ugrik balra. Hová érkezik?',
    options: ['124', '136', '126', '134'],
    correctAnswer: 0,
    explanation: 'Balra a szám csökken: 129, 128, 127, 126, 125, 124.'
  },
  {
    id: 'nl200g3-q16',
    level: 2,
    questionTypeBadge: 'Között',
    figure: <LineQ lo={100} step={10} n={10} labels={[0, 5, 10]} big={50} seg={[4, 5]} />,
    question: 'Melyik szám helye van a színes részen?',
    options: ['147', '157', '174', '137'],
    correctAnswer: 0,
    explanation: 'A színes rész a 140 és a 150 között van. Ott van a 147 helye.'
  },
  {
    id: 'nl200g3-q17',
    level: 2,
    questionTypeBadge: 'Beosztás',
    figure: <LineQ lo={155} step={5} n={5} labels={[0, 3]} big={1000} marks={[Q(4)]} />,
    question: 'Melyik szám van a „?” helyén?',
    options: ['175', '171', '180', '174'],
    correctAnswer: 0,
    explanation: '155-től 170-ig 3 lépés: 5 + 5 + 5 = 15. Egy osztás 5. A 170 után: 175.'
  },
  {
    id: 'nl200g3-q18',
    level: 2,
    questionTypeBadge: 'Távolság',
    figure: <LineQ lo={140} step={1} n={20} labels={[0, 10, 20]} mid={5} />,
    question: 'Melyik szám van a legközelebb a 150-hez?',
    options: ['148', '155', '143', '160'],
    correctAnswer: 0,
    explanation: '148-tól 2 lépés, 155-től 5, 143-tól 7, 160-tól 10 lépés. A 148 van a legközelebb.'
  },
  {
    id: 'nl200g3-q19',
    level: 2,
    questionTypeBadge: 'Pont középen',
    figure: <LineQ lo={160} step={1} n={10} labels={[0, 10]} mid={1000} marks={[Q(5)]} />,
    question: 'Melyik szám van pont középen a 160 és a 170 között?',
    options: ['165', '166', '164', '175'],
    correctAnswer: 0,
    explanation: 'A 165 a 160-tól 5 lépésre van, és a 170-től is 5 lépésre.'
  },
  {
    id: 'nl200g3-q20',
    level: 2,
    questionTypeBadge: 'Betűk',
    figure: (
      <LineQ
        lo={100}
        step={5}
        n={12}
        labels={[0, 10]}
        big={50}
        marks={[
          { i: 1, text: 'A', color: '#2563eb', kind: 'dot' },
          { i: 3, text: 'B', color: '#2563eb', kind: 'dot' },
          { i: 5, text: 'C', color: '#2563eb', kind: 'dot' },
          { i: 8, text: 'D', color: '#2563eb', kind: 'dot' }
        ]}
      />
    ),
    question: 'Melyik betű jelöli a 115 helyét?',
    options: ['B', 'A', 'C', 'D'],
    correctAnswer: 0,
    explanation: 'Egy osztás 5: A = 105, B = 115, C = 125, D = 140. A 115 a B.'
  },

  // ---------------- 3. szint ----------------
  {
    id: 'nl200g3-q21',
    level: 3,
    questionTypeBadge: 'Beosztás',
    figure: <LineQ lo={100} step={25} n={4} labels={[0, 4]} big={1000} marks={[Q(3)]} />,
    question: 'Melyik szám van a „?” helyén?',
    options: ['175', '130', '150', '103'],
    correctAnswer: 0,
    explanation: '100-tól 200-ig 4 lépés. A középső vonás a 150. Onnan még egy lépés: a 150 és a 200 között középen a 175.'
  },
  {
    id: 'nl200g3-q22',
    level: 3,
    questionTypeBadge: 'Szöcske',
    figure: <HopQ lo={140} n={20} from={145} hops={[8, -3]} labels={[140, 145, 160]} hopLabels={['8']} />,
    question: 'A szöcske a 145-ön ül. 8-at ugrik jobbra, aztán 3-at balra. Hová érkezik?',
    options: ['150', '156', '140', '134'],
    correctAnswer: 0,
    explanation: '145-től 8-at jobbra: 153. Onnan 3-at balra: 152, 151, 150.'
  },
  {
    id: 'nl200g3-q23',
    level: 3,
    questionTypeBadge: 'Igaz-hamis',
    question: 'Melyik állítás igaz?',
    options: ['A 158 a 149 és a 163 között van.', 'A 172 a 127 és a 171 között van.', 'A 139 a 141 és a 150 között van.', 'A 196 a 169 és a 186 között van.'],
    correctAnswer: 0,
    explanation: '149 < 158 < 163, ez igaz. A 172 nagyobb, mint 171. A 139 kisebb, mint 141. A 196 nagyobb, mint 186.'
  },
  {
    id: 'nl200g3-q24',
    level: 3,
    questionTypeBadge: 'Távolság',
    figure: (
      <LineQ
        lo={168}
        step={1}
        n={20}
        labels={[12]}
        mid={5}
        marks={[
          { i: 2, text: '170', color: '#2563eb', kind: 'dot' },
          { i: 9, text: '177', color: '#16a34a', kind: 'dot' },
          Q(16)
        ]}
      />
    ),
    question: 'A 170 a 177-től balra 7 lépésre van. Melyik szám van a 177-től jobbra ugyanennyire?',
    options: ['184', '180', '187', '183'],
    correctAnswer: 0,
    explanation: '177-től 7 lépés jobbra: 178, 179, 180, 181, 182, 183, 184.'
  },
  {
    id: 'nl200g3-q25',
    level: 3,
    questionTypeBadge: 'Mérőszalag',
    figure: (
      <TapeQ
        marks={[
          { cm: 145, text: 'A', color: '#2563eb' },
          { cm: 160, text: 'B', color: '#db2777' }
        ]}
      />
    ),
    question: 'Két gyerek ugrott: A 145 cm-t, B 160 cm-t. Mennyivel ugrott messzebb B?',
    options: ['15 cm', '25 cm', '5 cm', '10 cm'],
    correctAnswer: 0,
    explanation: '145-től 150-ig 5 cm, 150-től 160-ig 10 cm. 5 + 10 = 15 cm.'
  },
  {
    id: 'nl200g3-q26',
    level: 3,
    questionTypeBadge: 'Beosztás',
    figure: <LineQ lo={120} step={5} n={8} labels={[0, 4]} big={1000} marks={[Q(7)]} />,
    question: 'Melyik szám van a „?” helyén?',
    options: ['155', '127', '160', '150'],
    correctAnswer: 0,
    explanation: '120-tól 140-ig 4 lépés: egy osztás 5. 145, 150, 155: a 7. vonás a 155.'
  },
  {
    id: 'nl200g3-q27',
    level: 3,
    questionTypeBadge: 'Fejtörő',
    figure: <LineQ lo={128} step={1} n={14} labels={[2, 12]} mid={1000} seg={[2, 12]} />,
    question: 'A szám a 130 és a 140 között van. Páratlan. A két utolsó jegye egyforma. Melyik ez?',
    options: ['133', '134', '143', '131'],
    correctAnswer: 0,
    explanation: 'A 130 és 140 között a tízes jegy 3. Ha az egyes jegy is 3, a szám 133. Ez páratlan.'
  },
  {
    id: 'nl200g3-q28',
    level: 3,
    questionTypeBadge: 'Szöcske',
    figure: <HopQ lo={178} n={24} from={200} hops={[-10, -5]} labels={[180, 190, 200]} hopLabels={['10', '5']} />,
    question: 'A szöcske a 200-on ül. 10-et ugrik balra, aztán még 5-öt balra. Hová érkezik?',
    options: ['185', '195', '190', '175'],
    correctAnswer: 0,
    explanation: '200-tól 10-et balra: 190. Onnan 5-öt balra: 185.'
  },
  {
    id: 'nl200g3-q29',
    level: 3,
    questionTypeBadge: 'Között',
    figure: <LineQ lo={170} step={1} n={20} labels={[0, 10, 20]} mid={5} seg={[5, 15]} />,
    question: 'Melyik szám helye van a színes részen, és páros is?',
    options: ['178', '177', '188', '172'],
    correctAnswer: 0,
    explanation: 'A színes rész 175-től 185-ig tart. A 178 ott van, és páros. A 177 páratlan, a 188 és a 172 kívül esik.'
  },
  {
    id: 'nl200g3-q30',
    level: 3,
    questionTypeBadge: 'Között',
    figure: <LineQ lo={150} step={1} n={10} labels={[0, 10]} mid={5} />,
    question: 'Hány szám van a 150 és a 160 között? (A 150-et és a 160-at nem számoljuk.)',
    options: ['9', '10', '11', '8'],
    correctAnswer: 0,
    explanation: '151, 152, 153, 154, 155, 156, 157, 158, 159. Ez 9 szám.'
  }
];

export const NumberLine200G3Quiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => {
  return (
    <QuizTemplate
      grade={3}
      chapterId="szamolas-200-ig"
      topicId="g3-c200-szamegyenes-quiz"
      subtopicId="szamok-helye-a-szamegyenesen"
      title="2. Számok helye a számegyenesen – Kvíz"
      subtitle="30 feladat 3 szinten: leolvasás, mennyit ér egy osztás, mérőszalag, szöcskeugrások, között és középen."
      badge="3. OSZTÁLY • III. SZÁMOLÁS 0-TÓL 200-IG • KVÍZ"
      questions={NUMBER_LINE_200_G3_QUESTIONS}
      cheatSheets={[
        {
          title: 'A számegyenes',
          items: ['balra kisebb, jobbra nagyobb', '0 … 100 … 200', 'a 100 és 200 között középen: 150', 'a 160 és 170 között középen: 165']
        },
        {
          title: 'Mennyit ér egy osztás?',
          items: ['Keress két felírt számot!', 'Számold meg a lépéseket köztük!', '100 → 110 két lépés: egy osztás 5', '100 → 120 két lépés: egy osztás 10']
        },
        {
          title: 'Szöcskeugrás',
          items: ['jobbra: a szám nő', 'balra: a szám csökken', 'a lépéseket számold, ne a vonásokat', '152-től 5-öt jobbra: 157']
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <NumberLine200G3Matcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <NumberLine200G3Sorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default NumberLine200G3Quiz;
