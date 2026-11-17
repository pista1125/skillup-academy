import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { CuboidG3Matcher } from './CuboidG3Matcher';
import { CuboidG3Sorter } from './CuboidG3Sorter';
import { FONT, Solid, SolidKind, FitBuilding, Txt } from '../a-testek/SolidsG3Parts';
import { Box, cuboidPlan, NetGrid, CUBE_NETS_OK, CUBE_NETS_BAD, DieFace, Cell } from './CuboidG3Parts';

// ---------------------------------------------------------------------------
// Kérdésábrák
// ---------------------------------------------------------------------------
const QFig: React.FC<{ children: React.ReactNode; h?: number }> = ({ children, h = 150 }) => (
  <svg viewBox={`0 0 240 ${h}`} className="w-full max-w-[280px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="238" height={h - 2} rx="10" fill="#f8fafc" stroke="#cbd5e1" />
    {children}
  </svg>
);

const OneBox: React.FC<{ l: number; h: number; d: number; color?: string; faceFill?: (i: number) => string | undefined }> = ({ l, h, d, color, faceFill }) => (
  <QFig h={140}>
    <Box l={l} h={h} d={d} x={30} y={12} w={180} hh={116} color={color} sw={2.6} faceFill={faceFill} maxU={60} />
  </QFig>
);

const Build: React.FC<{ plan: number[][] }> = ({ plan }) => (
  <QFig h={140}>
    <FitBuilding plan={plan} x={20} y={10} w={200} h={120} maxU={30} />
  </QFig>
);

const Row: React.FC<{ kinds: SolidKind[] }> = ({ kinds }) => {
  const step = 240 / kinds.length;
  return (
    <QFig h={112}>
      {kinds.map((k, i) => (
        <g key={i}>
          <Solid kind={k} cx={step * (i + 0.5)} by={76} s={Math.min(46, step - 14)} sw={2} />
          <Txt x={step * (i + 0.5)} y={102} s={14}>{i + 1}.</Txt>
        </g>
      ))}
    </QFig>
  );
};

const Nets: React.FC<{ nets: Cell[][] }> = ({ nets }) => (
  <QFig h={130}>
    {nets.map((n, i) => (
      <g key={i}>
        <NetGrid cells={n} x={6 + i * 58} y={10} w={54} h={86} maxCell={16} fill="#bfdbfe" sw={1.8} />
        <Txt x={33 + i * 58} y={118} s={14}>{i + 1}.</Txt>
      </g>
    ))}
  </QFig>
);

const tall = [1, 2.2, 1] as const;

// ---------------------------------------------------------------------------
// Kérdések
// ---------------------------------------------------------------------------
export const CUBOID_G3_QUESTIONS: QuizQuestion[] = [
  // ----- 1. szint -----
  {
    id: 'cub-g3-q1',
    level: 1,
    questionTypeBadge: 'Lapok száma',
    figure: <OneBox l={2} h={1.1} d={1} />,
    question: 'Hány lapja van a téglatestnek?',
    options: ['6', '4', '8', '5'],
    correctAnswer: 0,
    explanation: 'Elöl, hátul, fölül, alul, jobbra, balra: 6 lap. A takart lapokat is számold!'
  },
  {
    id: 'cub-g3-q2',
    level: 1,
    questionTypeBadge: 'Kocka',
    figure: <OneBox l={1} h={1} d={1} color="#3b82f6" />,
    question: 'Milyen alakú a kocka minden lapja?',
    options: ['négyzet', 'kör', 'háromszög', 'hatszög'],
    correctAnswer: 0,
    explanation: 'A kockát 6 egyforma négyzet határolja.'
  },
  {
    id: 'cub-g3-q3',
    level: 1,
    questionTypeBadge: 'Téglatest',
    figure: <OneBox l={2.2} h={0.8} d={1.2} color="#22c55e" />,
    question: 'Milyen alakú lapok határolják ezt a téglatestet?',
    options: ['téglalap', 'kör', 'háromszög', 'csak négyzet'],
    correctAnswer: 0,
    explanation: 'A téglatestet 6 téglalap alakú lap határolja. Ennek egyik lapja sem négyzet.'
  },
  {
    id: 'cub-g3-q4',
    level: 1,
    questionTypeBadge: 'Kocka',
    figure: <Row kinds={['teglatest', 'kocka', 'piramis4', 'henger']} />,
    question: 'Melyik test a kocka?',
    options: ['a 2.', 'az 1.', 'a 3.', 'a 4.'],
    correctAnswer: 0,
    explanation: 'A 2. testnek minden lapja egyforma négyzet. Az 1. téglatest, de nem kocka.'
  },
  {
    id: 'cub-g3-q5',
    level: 1,
    questionTypeBadge: 'Kocka',
    question: 'Melyik tárgy kocka alakú?',
    options: ['a dobókocka', 'a tégla', 'a cipősdoboz', 'a konzervdoboz'],
    correctAnswer: 0,
    explanation: 'A dobókocka minden lapja egyforma négyzet. A tégla és a cipősdoboz téglatest, de nem kocka.'
  },
  {
    id: 'cub-g3-q6',
    level: 1,
    questionTypeBadge: 'Kis kockák',
    figure: <Build plan={[[2, 2, 2]]} />,
    question: 'Hány kis kockából áll ez a téglatest?',
    options: ['6', '3', '4', '8'],
    correctAnswer: 0,
    explanation: 'Egy sorban 3 kocka, 2 réteg: 3 + 3 = 6.'
  },
  {
    id: 'cub-g3-q7',
    level: 1,
    questionTypeBadge: 'Szemközti lapok',
    figure: <OneBox l={2} h={1.2} d={1} faceFill={(i) => (i === 0 ? '#fca5a5' : undefined)} />,
    question: 'Milyen a piros lappal szemben lévő, hátsó lap?',
    options: ['ugyanakkora', 'kisebb', 'nagyobb', 'háromszög alakú'],
    correctAnswer: 0,
    explanation: 'A téglatest szemben lévő lapjai mindig egyformák.'
  },
  {
    id: 'cub-g3-q8',
    level: 1,
    questionTypeBadge: 'Testháló',
    figure: (
      <QFig h={140}>
        <NetGrid cells={CUBE_NETS_OK[0]} x={40} y={10} w={160} h={120} maxCell={36} fill="#bfdbfe" sw={2.4} />
      </QFig>
    ),
    question: 'Ez a kocka hálója. Hány négyzetből áll?',
    options: ['6', '4', '5', '8'],
    correctAnswer: 0,
    explanation: 'A kockának 6 lapja van, ezért a hálója is 6 négyzetből áll.'
  },
  {
    id: 'cub-g3-q9',
    level: 1,
    questionTypeBadge: 'Kocka',
    figure: <OneBox l={1} h={1} d={1} color="#f43f5e" />,
    question: 'Igaz-e: a kocka is téglatest?',
    options: ['Igaz, minden lapja egyforma négyzet.', 'Nem igaz, mert a kocka kicsi.', 'Nem igaz, mert nincs lapja.'],
    correctAnswer: 0,
    explanation: 'A kocka olyan téglatest, amelynek mind a 6 lapja egyforma négyzet.'
  },
  {
    id: 'cub-g3-q10',
    level: 1,
    questionTypeBadge: 'Kis kockák',
    figure: <Build plan={cuboidPlan(2, 2, 1)} />,
    question: 'Hány kis kockából áll ez a téglatest?',
    options: ['4', '2', '3', '6'],
    correctAnswer: 0,
    explanation: 'Elöl 2, hátul 2 kocka: 2 + 2 = 4.'
  },

  // ----- 2. szint -----
  {
    id: 'cub-g3-q11',
    level: 2,
    questionTypeBadge: 'Kis kockák',
    figure: <Build plan={cuboidPlan(3, 2, 2)} />,
    question: 'Hány kis kockából áll ez a téglatest?',
    options: ['12', '8', '6', '10'],
    correctAnswer: 0,
    explanation: 'Egy réteg: 3 · 2 = 6. Két réteg: 6 + 6 = 12. Nem csak a látható kockákat kell számolni!'
  },
  {
    id: 'cub-g3-q12',
    level: 2,
    questionTypeBadge: 'Szemközti lapok',
    figure: <OneBox l={2.2} h={1.2} d={0.8} color="#a855f7" />,
    question: 'Hányféle méretű lapja van ennek a téglatestnek?',
    options: ['3', '6', '2', '1'],
    correctAnswer: 0,
    explanation: 'A szemben lévő lapok egyformák. 6 lap, párosával: 3-féle méret.'
  },
  {
    id: 'cub-g3-q13',
    level: 2,
    questionTypeBadge: 'Téglatest',
    figure: <OneBox l={tall[0]} h={tall[1]} d={tall[2]} color="#06b6d4" />,
    question: 'Ennek a téglatestnek a teteje és az alja négyzet. Hány négyzet alakú lapja van?',
    options: ['2', '4', '0', '6'],
    correctAnswer: 0,
    explanation: 'Csak a teteje és az alja négyzet. A 4 oldallapja hosszúkás téglalap.'
  },
  {
    id: 'cub-g3-q14',
    level: 2,
    questionTypeBadge: 'Testháló',
    figure: <Nets nets={[CUBE_NETS_BAD[0], CUBE_NETS_BAD[1], CUBE_NETS_OK[2], CUBE_NETS_BAD[2]]} />,
    question: 'Melyikből lehet kockát hajtogatni?',
    options: ['a 3.', 'az 1.', 'a 2.', 'a 4.'],
    correctAnswer: 0,
    explanation: 'A 3.-ból: középen 4 négyzet egy sorban, fölötte és alatta 1-1. A többinél két lap egymásra kerülne.'
  },
  {
    id: 'cub-g3-q15',
    level: 2,
    questionTypeBadge: 'Kiegészítés kockává',
    figure: <Build plan={cuboidPlan(2, 2, 1)} />,
    question: 'Ezt kockává akarod kiegészíteni. Legalább hány kis kocka kell még?',
    options: ['4', '8', '2', '6'],
    correctAnswer: 0,
    explanation: 'A legkisebb ilyen kocka 2 · 2 · 2 = 8 kockából áll. 8 − 4 = 4 kell még.'
  },
  {
    id: 'cub-g3-q16',
    level: 2,
    questionTypeBadge: 'Dobókocka',
    figure: (
      <QFig h={110}>
        <DieFace n={2} x={50} y={20} s={64} />
        <DieFace n="?" x={130} y={20} s={64} />
        <Txt x={82} y={102} s={12} c="#475569">elöl</Txt>
        <Txt x={162} y={102} s={12} c="#475569">hátul</Txt>
      </QFig>
    ),
    question: 'A dobókocka szemközti lapjain összesen 7 pötty van. Elöl 2 pötty van. Hány pötty van hátul?',
    options: ['5', '4', '6', '7'],
    correctAnswer: 0,
    explanation: '7 − 2 = 5. Hátul 5 pötty van.'
  },
  {
    id: 'cub-g3-q17',
    level: 2,
    questionTypeBadge: 'Lapok száma',
    figure: (
      <QFig h={130}>
        <Box l={2} h={1} d={1} x={10} y={20} w={110} hh={90} color="#f59e0b" sw={2.4} />
        <Box l={1} h={1.8} d={0.8} x={140} y={14} w={90} hh={104} color="#22c55e" sw={2.4} />
      </QFig>
    ),
    question: 'Hány lapja van a két téglatestnek összesen?',
    options: ['12', '6', '10', '8'],
    correctAnswer: 0,
    explanation: 'Mindkettőnek 6 lapja van: 6 + 6 = 12.'
  },
  {
    id: 'cub-g3-q18',
    level: 2,
    questionTypeBadge: 'Kis kockák',
    figure: <Build plan={cuboidPlan(4, 1, 1)} />,
    question: 'Hány ilyen 4 kockás rudat kell egymásra tenned, hogy 12 kockás téglatest legyen?',
    options: ['3', '4', '2', '8'],
    correctAnswer: 0,
    explanation: '4 + 4 + 4 = 12, tehát 3 rúd kell.'
  },
  {
    id: 'cub-g3-q19',
    level: 2,
    questionTypeBadge: 'Téglatest',
    figure: <Row kinds={['kocka', 'teglatest', 'sator', 'kocka']} />,
    question: 'Melyik NEM téglatest?',
    options: ['a 3.', 'az 1.', 'a 2.', 'a 4.'],
    correctAnswer: 0,
    explanation: 'A 3.-nak háromszög alakú lapjai is vannak. A kocka is téglatest!'
  },
  {
    id: 'cub-g3-q20',
    level: 2,
    questionTypeBadge: 'Kis kockák',
    figure: <Build plan={cuboidPlan(2, 2, 2)} />,
    question: 'Hány kis kockából áll ez a nagy kocka?',
    options: ['8', '7', '4', '6'],
    correctAnswer: 0,
    explanation: 'Egy réteg: 2 · 2 = 4. Két réteg: 4 + 4 = 8. Egy kocka hátul, alul el van takarva.'
  },

  // ----- 3. szint -----
  {
    id: 'cub-g3-q21',
    level: 3,
    questionTypeBadge: 'Kis kockák',
    question: '12 kis kockából 1 rétegű téglatestet raksz ki, 3 sorban. Hány kocka lesz egy sorban?',
    options: ['4', '3', '9', '6'],
    correctAnswer: 0,
    explanation: '3 sor, mindegyikben ugyanannyi: 12 : 3 = 4.'
  },
  {
    id: 'cub-g3-q22',
    level: 3,
    questionTypeBadge: 'Kis kockák',
    figure: <Build plan={cuboidPlan(4, 3, 2)} />,
    question: 'Hány kis kockából áll ez a téglatest?',
    options: ['24', '12', '18', '20'],
    correctAnswer: 0,
    explanation: 'Egy réteg: 4 · 3 = 12. Két réteg: 12 + 12 = 24.'
  },
  {
    id: 'cub-g3-q23',
    level: 3,
    questionTypeBadge: 'Kiegészítés kockává',
    figure: <Build plan={cuboidPlan(3, 3, 1)} />,
    question: 'Ezt 3 · 3 · 3-as kockává egészíted ki. Hány kis kocka kell még?',
    options: ['18', '9', '27', '6'],
    correctAnswer: 0,
    explanation: 'Egy réteg 9 kocka. A kockához 3 réteg kell, még 2 réteg hiányzik: 9 + 9 = 18.'
  },
  {
    id: 'cub-g3-q24',
    level: 3,
    questionTypeBadge: 'Kiegészítés kockává',
    figure: <Build plan={cuboidPlan(2, 1, 1)} />,
    question: 'Ezt kockává akarod kiegészíteni. Legalább hány kis kocka kell még?',
    options: ['6', '2', '4', '8'],
    correctAnswer: 0,
    explanation: 'A legkisebb kocka, amibe belefér: 2 · 2 · 2 = 8 kocka. 8 − 2 = 6.'
  },
  {
    id: 'cub-g3-q25',
    level: 3,
    questionTypeBadge: 'Dobókocka',
    figure: (
      <QFig h={110}>
        <DieFace n={6} x={12} y={22} s={46} />
        <DieFace n="?" x={64} y={22} s={46} />
        <DieFace n={3} x={130} y={22} s={46} />
        <DieFace n="?" x={182} y={22} s={46} />
        <Txt x={61} y={92} s={12} c="#475569">szemben</Txt>
        <Txt x={179} y={92} s={12} c="#475569">szemben</Txt>
      </QFig>
    ),
    question: 'A dobókocka szemközti lapjain összesen 7 pötty van. Mi van a 6-tal és a 3-mal szemben?',
    options: ['1 és 4', '1 és 3', '4 és 6', '2 és 5'],
    correctAnswer: 0,
    explanation: '7 − 6 = 1, és 7 − 3 = 4.'
  },
  {
    id: 'cub-g3-q26',
    level: 3,
    questionTypeBadge: 'Szemközti lapok',
    figure: <OneBox l={2} h={1.2} d={1} faceFill={(i) => ['#fca5a5', undefined, undefined, '#93c5fd', undefined, '#fde68a'][i]} />,
    question: 'Ennek a doboznak a szemben lévő lapjai egyforma színűek. Milyen színű az alja?',
    options: ['kék', 'piros', 'sárga', 'zöld'],
    correctAnswer: 0,
    explanation: 'Az alja a tetejével van szemben. A teteje kék, tehát az alja is kék.'
  },
  {
    id: 'cub-g3-q27',
    level: 3,
    questionTypeBadge: 'Testháló',
    figure: (
      <QFig h={140}>
        <NetGrid cells={CUBE_NETS_OK[0]} x={40} y={10} w={160} h={120} maxCell={34} fill="#fef3c7" labels={['E', 'A', 'B', 'C', 'D', 'F']} sw={2.4} fs={18} />
      </QFig>
    ),
    question: 'Ebből a hálóból kockát hajtogatsz. Melyik lap lesz szemben az A lappal?',
    options: ['C', 'B', 'E', 'D'],
    correctAnswer: 0,
    explanation: 'A 4 négyzetes sorban egyet kihagyva kerülnek szembe a lapok: A és C, B és D. Az E és az F is szemben lesz.'
  },
  {
    id: 'cub-g3-q28',
    level: 3,
    questionTypeBadge: 'Kis kockák',
    question: 'Egy nagy kocka 3 kis kocka hosszú, 3 széles és 3 magas. Hány kis kockából áll?',
    options: ['27', '9', '18', '12'],
    correctAnswer: 0,
    explanation: 'Egy réteg: 3 · 3 = 9. Három réteg: 9 + 9 + 9 = 27.'
  },
  {
    id: 'cub-g3-q29',
    level: 3,
    questionTypeBadge: 'Lapok száma',
    figure: <Build plan={cuboidPlan(6, 1, 1)} />,
    question: 'Ez a rúd 6 kis kockából áll. Hány lapja van a rúdnak, mint egy téglatestnek?',
    options: ['6', '12', '24', '4'],
    correctAnswer: 0,
    explanation: 'A rúd is téglatest, és minden téglatestnek 6 lapja van. A kis kockák számától ez nem függ.'
  },
  {
    id: 'cub-g3-q30',
    level: 3,
    questionTypeBadge: 'Lapok száma',
    figure: (
      <QFig h={110}>
        {[0, 1, 2].map((i) => (
          <Box key={i} l={1} h={1} d={1} x={14 + i * 74} y={18} w={64} hh={74} color={['#3b82f6', '#22c55e', '#f59e0b'][i]} sw={2.4} />
        ))}
      </QFig>
    ),
    question: '3 kocka alakú doboz minden lapjára 1 matricát ragasztasz. Hány matrica kell?',
    options: ['18', '6', '12', '9'],
    correctAnswer: 0,
    explanation: 'Egy doboznak 6 lapja van. 3 doboz: 6 + 6 + 6 = 18.'
  }
];

export const CuboidG3Quiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => {
  return (
    <QuizTemplate
      grade={3}
      chapterId="testek-sikidomok"
      topicId="g3-geom-teglatest-quiz"
      subtopicId="a-teglatest-es-a-kocka"
      title="2. A téglatest és a kocka – Kvíz"
      subtitle="30 feladat 3 szinten: lapok, szemközti lapok, testháló, kis kockák."
      badge="3. OSZTÁLY • X. TESTEK, SÍKIDOMOK • KVÍZ"
      questions={CUBOID_G3_QUESTIONS}
      cheatSheets={[
        {
          title: 'Téglatest és kocka',
          items: ['Téglatest: 6 téglalap alakú lap.', 'Kocka: 6 egyforma négyzet.', 'A kocka is téglatest.']
        },
        {
          title: 'Szemközti lapok',
          items: ['A szemben lévő lapok egyformák.', 'Legfeljebb 3-féle lap van.', 'Dobókocka: szemben összesen 7 pötty.']
        },
        {
          title: 'Kis kockák',
          items: ['Egy réteg: egy sorban · sorok száma.', 'Utána: annyiszor, ahány réteg.', 'A takart kockákat is számold!']
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={<CuboidG3Matcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />}
      sorterComponent={<CuboidG3Sorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />}
    />
  );
};

export default CuboidG3Quiz;

