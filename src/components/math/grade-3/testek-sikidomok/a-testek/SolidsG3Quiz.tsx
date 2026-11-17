import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { SolidsG3Matcher } from './SolidsG3Matcher';
import { SolidsG3Sorter } from './SolidsG3Sorter';
import { FONT, Solid, SolidKind, FitBuilding, PlanGrid, Txt, CylinderShape, ConeShape } from './SolidsG3Parts';

// ---------------------------------------------------------------------------
// Kérdésábrák
// ---------------------------------------------------------------------------
const QFig: React.FC<{ children: React.ReactNode; h?: number }> = ({ children, h = 150 }) => (
  <svg viewBox={`0 0 240 ${h}`} className="w-full max-w-[280px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="238" height={h - 2} rx="10" fill="#f8fafc" stroke="#cbd5e1" />
    {children}
  </svg>
);

/** Egy test nagyban. */
const One: React.FC<{ kind: SolidKind; color?: string }> = ({ kind, color }) => (
  <QFig h={140}>
    <Solid kind={kind} cx={120} by={120} s={96} sw={2.6} color={color} />
  </QFig>
);

/** Számozott testek egy sorban. */
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

/** Építmény kis kockákból. */
const Build: React.FC<{ plan: number[][]; label?: string }> = ({ plan, label }) => (
  <QFig h={140}>
    <FitBuilding plan={plan} x={20} y={10} w={200} h={label ? 104 : 120} maxU={34} />
    {label && <Txt x={120} y={132} s={13}>{label}</Txt>}
  </QFig>
);

/** Alaprajz. */
const Plan: React.FC<{ plan: (number | string | null)[][]; note?: string }> = ({ plan, note }) => {
  const C = Math.max(...plan.map((r) => r.length));
  const cell = 40;
  const x = 120 - (C * cell) / 2;
  return (
    <QFig h={60 + plan.length * cell}>
      <Txt x={120} y={20} s={12} c="#475569">hátul</Txt>
      <PlanGrid plan={plan} x={x} y={28} cell={cell} fs={22} sw={2.5} />
      <Txt x={120} y={46 + plan.length * cell} s={12} c="#475569">{note ?? 'elöl'}</Txt>
    </QFig>
  );
};

// ---------------------------------------------------------------------------
// Kérdések
// ---------------------------------------------------------------------------
export const SOLIDS_G3_QUESTIONS: QuizQuestion[] = [
  // ----- 1. szint -----
  {
    id: 'sol-g3-q1',
    level: 1,
    questionTypeBadge: 'Testek körülöttünk',
    figure: <Row kinds={['kocka', 'henger', 'gomb', 'kup']} />,
    question: 'Melyik test hasonlít a labdára?',
    options: ['a 3.', 'az 1.', 'a 2.', 'a 4.'],
    correctAnswer: 0,
    explanation: 'A labda gömbölyű, mint a gömb. A gömb a 3.'
  },
  {
    id: 'sol-g3-q2',
    level: 1,
    questionTypeBadge: 'Test neve',
    figure: <One kind="kocka" />,
    question: 'Mi ennek a testnek a neve?',
    options: ['kocka', 'gömb', 'négyzet', 'piramis'],
    correctAnswer: 0,
    explanation: 'Ez kocka, mint a dobókocka. A négyzet nem test, hanem a kocka lapjának alakja.'
  },
  {
    id: 'sol-g3-q3',
    level: 1,
    questionTypeBadge: 'Test neve',
    figure: <One kind="teglatest" />,
    question: 'Mi ennek a testnek a neve?',
    options: ['téglatest', 'kocka', 'téglalap', 'gömb'],
    correctAnswer: 0,
    explanation: 'Olyan, mint egy cipősdoboz: ez téglatest. A téglalap csak a lapja alakja.'
  },
  {
    id: 'sol-g3-q4',
    level: 1,
    questionTypeBadge: 'Görbe rész',
    figure: <One kind="henger" />,
    question: 'Van görbe része ennek a testnek?',
    options: ['Igen, az oldala görbe.', 'Nem, csak lapok határolják.', 'Nem, egyáltalán nincs lapja.'],
    correctAnswer: 0,
    explanation: 'A konzervdoboz oldala görbe. Ezért tud gurulni, ha az oldalára fekteted.'
  },
  {
    id: 'sol-g3-q5',
    level: 1,
    questionTypeBadge: 'Testek körülöttünk',
    question: 'Melyik tárgy hasonlít a téglatestre?',
    options: ['a cipősdoboz', 'a labda', 'a fagyitölcsér', 'a konzervdoboz'],
    correctAnswer: 0,
    explanation: 'A cipősdobozt 6 téglalap alakú lap határolja, mint a téglatestet.'
  },
  {
    id: 'sol-g3-q6',
    level: 1,
    questionTypeBadge: 'Lapok alakja',
    figure: <One kind="piramis4" />,
    question: 'Milyen alakú lapok határolják ezt a testet?',
    options: ['négyzet és háromszög', 'csak háromszög', 'kör és háromszög', 'csak négyzet'],
    correctAnswer: 0,
    explanation: 'Az alja négyzet, oldalt 4 háromszög van. Az alját is számold!'
  },
  {
    id: 'sol-g3-q7',
    level: 1,
    questionTypeBadge: 'Lapok alakja',
    figure: <One kind="kocka" color="#22c55e" />,
    question: 'Milyen alakúak a kocka lapjai?',
    options: ['négyzet', 'kör', 'háromszög', 'hatszög'],
    correctAnswer: 0,
    explanation: 'A kocka minden lapja négyzet. Ha körberajzolod, négyzetet kapsz.'
  },
  {
    id: 'sol-g3-q8',
    level: 1,
    questionTypeBadge: 'Csak lapok',
    figure: <Row kinds={['henger', 'gomb', 'teglatest', 'kup']} />,
    question: 'Melyik testet határolják csak lapok?',
    options: ['a 3.', 'az 1.', 'a 2.', 'a 4.'],
    correctAnswer: 0,
    explanation: 'A téglatestnek nincs görbe része. A többinek van, azok gurulnak.'
  },
  {
    id: 'sol-g3-q9',
    level: 1,
    questionTypeBadge: 'Görbe rész',
    figure: <Row kinds={['kup', 'kocka', 'felgomb', 'gomb']} />,
    question: 'Melyik testnek nincs egyetlen lapja sem?',
    options: ['a 4.', 'az 1.', 'a 2.', 'a 3.'],
    correctAnswer: 0,
    explanation: 'A gömböt csak görbe rész határolja. A tölcsérnek és a tálnak van egy kör alakú lapja.'
  },
  {
    id: 'sol-g3-q10',
    level: 1,
    questionTypeBadge: 'Építés kockákból',
    figure: <Build plan={[[2, 1, 1]]} />,
    question: 'Hány kis kockából áll ez az építmény?',
    options: ['4', '3', '5', '6'],
    correctAnswer: 0,
    explanation: 'Balra 2 kocka áll egymáson, mellette 1 és 1. 2 + 1 + 1 = 4.'
  },

  // ----- 2. szint -----
  {
    id: 'sol-g3-q11',
    level: 2,
    questionTypeBadge: 'Lapok száma',
    figure: <One kind="henger" color="#a855f7" />,
    question: 'Hány lapja van ennek a testnek?',
    options: ['2', '3', '1', '0'],
    correctAnswer: 0,
    explanation: 'Az alja és a teteje lap, mindkettő kör. Az oldala görbe, az nem lap. Tehát 2.'
  },
  {
    id: 'sol-g3-q12',
    level: 2,
    questionTypeBadge: 'Lapok száma',
    figure: <One kind="kup" />,
    question: 'Hány lapja van ennek a testnek?',
    options: ['1', '0', '2', '3'],
    correctAnswer: 0,
    explanation: 'Csak az alja lapos, az kör alakú. A többi része görbe. Tehát 1 lapja van.'
  },
  {
    id: 'sol-g3-q13',
    level: 2,
    questionTypeBadge: 'Lapok alakja',
    figure: <One kind="sator" />,
    question: 'Milyen alakú lapjai vannak ennek a sátor alakú testnek?',
    options: ['háromszög és téglalap', 'csak háromszög', 'háromszög és kör', 'csak téglalap'],
    correctAnswer: 0,
    explanation: 'Elöl és hátul 1-1 háromszög van. Az alja és a két oldala téglalap.'
  },
  {
    id: 'sol-g3-q14',
    level: 2,
    questionTypeBadge: 'Lapok száma',
    figure: <One kind="piramis3" />,
    question: 'Hány lapja van ennek a testnek?',
    options: ['4', '3', '5', '6'],
    correctAnswer: 0,
    explanation: 'Elöl 2 háromszöget látsz, hátul van még 1, és az alja is háromszög. 2 + 1 + 1 = 4.'
  },
  {
    id: 'sol-g3-q15',
    level: 2,
    questionTypeBadge: 'Lapok száma',
    figure: <One kind="piramis4" color="#f59e0b" />,
    question: 'Hány háromszög alakú lapja van ennek a testnek?',
    options: ['4', '5', '2', '1'],
    correctAnswer: 0,
    explanation: 'Elöl 2 háromszöget látsz, hátul van még 2. Az alja négyzet, azt most nem számoljuk.'
  },
  {
    id: 'sol-g3-q16',
    level: 2,
    questionTypeBadge: 'Lapok alakja',
    figure: (
      <QFig h={150}>
        <circle cx={34} cy={60} r={22} fill="#fde047" stroke="#1e293b" strokeWidth="2.5" />
        <Txt x={34} y={102} s={12} c="#475569">ilyen lap</Txt>
        {(['kocka', 'piramis4', 'henger', 'teglatest'] as SolidKind[]).map((k, i) => (
          <g key={k}>
            <Solid kind={k} cx={82 + i * 44} by={82} s={36} sw={2} />
            <Txt x={82 + i * 44} y={110} s={13}>{i + 1}.</Txt>
          </g>
        ))}
      </QFig>
    ),
    question: 'Melyik testnek van ilyen alakú lapja?',
    options: ['a 3.', 'az 1.', 'a 2.', 'a 4.'],
    correctAnswer: 0,
    explanation: 'A konzervdoboz alja és teteje kör. A kocka, a piramis és a téglatest lapjai nem kerekek.'
  },
  {
    id: 'sol-g3-q17',
    level: 2,
    questionTypeBadge: 'Alaprajz',
    figure: <Plan plan={[[2, 1], [1, 1]]} />,
    question: 'Ez egy építmény alaprajza. Hány kis kocka kell hozzá?',
    options: ['5', '4', '6', '3'],
    correctAnswer: 0,
    explanation: 'A számokat kell összeadni: 2 + 1 + 1 + 1 = 5. A 4 csak a négyzetek száma.'
  },
  {
    id: 'sol-g3-q18',
    level: 2,
    questionTypeBadge: 'Építés kockákból',
    figure: <Build plan={[[2, 2], [1, 1]]} />,
    question: 'Hány kis kockából áll ez az építmény?',
    options: ['6', '4', '5', '8'],
    correctAnswer: 0,
    explanation: 'Hátul 2 torony van, mindkettő 2 kocka magas. Elöl 1 és 1. 2 + 2 + 1 + 1 = 6. Az alsó hátsó kockák el vannak takarva, de ott vannak.'
  },
  {
    id: 'sol-g3-q19',
    level: 2,
    questionTypeBadge: 'Gurul?',
    figure: <Row kinds={['henger', 'kocka', 'gomb', 'kup']} />,
    question: 'Melyik test gurul el, akárhogyan teszed le?',
    options: ['a 3.', 'az 1.', 'a 2.', 'a 4.'],
    correctAnswer: 0,
    explanation: 'A gömbnek nincs lapja, ezért mindig gurul. A konzervdoboz és a tölcsér a lapján megáll.'
  },
  {
    id: 'sol-g3-q20',
    level: 2,
    questionTypeBadge: 'Építés kockákból',
    figure: <Build plan={[[3, 2, 1]]} label="lépcső" />,
    question: 'Hány kis kockából épült ez a lépcső?',
    options: ['6', '3', '5', '7'],
    correctAnswer: 0,
    explanation: 'A tornyok 3, 2 és 1 kocka magasak. 3 + 2 + 1 = 6.'
  },

  // ----- 3. szint -----
  {
    id: 'sol-g3-q21',
    level: 3,
    questionTypeBadge: 'Melyik test?',
    figure: <Row kinds={['kup', 'felgomb', 'henger', 'gomb']} />,
    question: 'Van görbe része. 2 kör alakú lapja van. Melyik test ez?',
    options: ['a 3.', 'az 1.', 'a 2.', 'a 4.'],
    correctAnswer: 0,
    explanation: 'Mindegyiknek van görbe része. De 2 kör alakú lapja csak a konzervdoboznak van.'
  },
  {
    id: 'sol-g3-q22',
    level: 3,
    questionTypeBadge: 'Melyik test?',
    figure: <Row kinds={['kocka', 'piramis4', 'sator', 'piramis3']} />,
    question: 'Csak háromszög alakú lapok határolják. Melyik test ez?',
    options: ['a 4.', 'az 1.', 'a 2.', 'a 3.'],
    correctAnswer: 0,
    explanation: 'A 4. testnek mind a 4 lapja háromszög. A 2.-nak az alja négyzet, a 3.-nak 3 lapja téglalap.'
  },
  {
    id: 'sol-g3-q23',
    level: 3,
    questionTypeBadge: 'Melyik test?',
    figure: <Row kinds={['sator', 'piramis3', 'piramis4', 'teglatest']} />,
    question: '1 négyzet és 4 háromszög alakú lap határolja. Melyik test ez?',
    options: ['a 3.', 'az 1.', 'a 2.', 'a 4.'],
    correctAnswer: 0,
    explanation: 'A piramis alja négyzet, oldalt 4 háromszög. A sátornak csak 2 háromszöge van.'
  },
  {
    id: 'sol-g3-q24',
    level: 3,
    questionTypeBadge: 'Alaprajz',
    figure: <Plan plan={[[3, 2, 1], [2, 1, 1]]} />,
    question: 'Hány kis kocka kell ehhez az építményhez?',
    options: ['10', '6', '9', '11'],
    correctAnswer: 0,
    explanation: 'Hátul: 3 + 2 + 1 = 6. Elöl: 2 + 1 + 1 = 4. Összesen 6 + 4 = 10.'
  },
  {
    id: 'sol-g3-q25',
    level: 3,
    questionTypeBadge: 'Alaprajz',
    figure: <Plan plan={[[4, 4, 4]]} note="elöl" />,
    question: '3 egyforma tornyot építesz. Minden torony 4 kocka magas. Hány kocka kell?',
    options: ['12', '7', '4', '16'],
    correctAnswer: 0,
    explanation: '3 torony, mindegyikben 4 kocka: 3 · 4 = 12.'
  },
  {
    id: 'sol-g3-q26',
    level: 3,
    questionTypeBadge: 'Lapok száma',
    figure: (
      <QFig h={120}>
        <Solid kind="kocka" cx={80} by={100} s={70} sw={2.4} />
        <Solid kind="kocka" cx={170} by={100} s={70} sw={2.4} color="#f43f5e" />
      </QFig>
    ),
    question: 'Két kocka minden lapját körberajzolod. Hány négyzetet rajzolsz?',
    options: ['12', '6', '8', '10'],
    correctAnswer: 0,
    explanation: 'Egy kockának 6 lapja van. Két kockának 6 + 6 = 12.'
  },
  {
    id: 'sol-g3-q27',
    level: 3,
    questionTypeBadge: 'Lapok száma',
    figure: (
      <QFig h={130}>
        <CylinderShape cx={80} by={100} r={30} h={66} color="#06b6d4" sw={2.4} />
        <ConeShape cx={170} by={100} r={32} h={76} color="#f97316" sw={2.4} />
      </QFig>
    ),
    question: 'Hány kör alakú lapja van a két testnek összesen?',
    options: ['3', '2', '4', '1'],
    correctAnswer: 0,
    explanation: 'A konzervdoboznak 2 kör alakú lapja van, a tölcsérnek 1. 2 + 1 = 3.'
  },
  {
    id: 'sol-g3-q28',
    level: 3,
    questionTypeBadge: 'Építés kockákból',
    figure: (
      <QFig h={140}>
        <FitBuilding plan={[[2, 1], [1, 1]]} x={10} y={14} w={100} h={96} maxU={30} />
        <FitBuilding plan={[[3, 2], [1, 1]]} x={128} y={14} w={100} h={96} maxU={30} color="#22c55e" />
        <Txt x={60} y={130} s={14}>A</Txt>
        <Txt x={178} y={130} s={14}>B</Txt>
      </QFig>
    ),
    question: 'Hány kockával van több a B építményben, mint az A-ban?',
    options: ['2', '1', '3', '7'],
    correctAnswer: 0,
    explanation: 'A: 2 + 1 + 1 + 1 = 5. B: 3 + 2 + 1 + 1 = 7. 7 − 5 = 2.'
  },
  {
    id: 'sol-g3-q29',
    level: 3,
    questionTypeBadge: 'Alaprajz',
    figure: <Plan plan={[[3, 2], ['?', 1]]} />,
    question: 'Az építmény 9 kockából áll. Melyik szám kerül a ? helyére?',
    options: ['3', '2', '4', '6'],
    correctAnswer: 0,
    explanation: '3 + 2 + 1 = 6. 9 − 6 = 3. A ? helyére 3 kerül.'
  },
  {
    id: 'sol-g3-q30',
    level: 3,
    questionTypeBadge: 'Kakukktojás',
    figure: <Row kinds={['kocka', 'teglatest', 'gomb', 'piramis4']} />,
    question: 'Melyik test nem illik a többi közé? Miért?',
    options: ['a 3., mert görbe rész határolja', 'az 1., mert kicsi', 'a 4., mert hegyes', 'a 2., mert hosszúkás'],
    correctAnswer: 0,
    explanation: 'Az 1., a 2. és a 4. testet csak lapok határolják. A gömbnek nincs lapja, csak görbe része.'
  }
];

export const SolidsG3Quiz: React.FC<{
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
      topicId="g3-geom-testek-quiz"
      subtopicId="a-testek"
      title="1. A testek – Kvíz"
      subtitle="30 feladat 3 szinten: testek neve, lapjai, görbe része, építés kockákból."
      badge="3. OSZTÁLY • X. TESTEK, SÍKIDOMOK • KVÍZ"
      questions={SOLIDS_G3_QUESTIONS}
      cheatSheets={[
        {
          title: 'Testek nevei',
          items: ['kocka – mint a dobókocka', 'téglatest – mint a cipősdoboz', 'gömb – mint a labda']
        },
        {
          title: 'Lapok és görbe rész',
          items: ['A lap lapos: négyzet, téglalap, háromszög vagy kör.', 'A görbe rész nem lap.', 'Konzervdoboz: 2 kör lap. Tölcsér: 1 kör lap. Gömb: 0 lap.']
        },
        {
          title: 'Alaprajz',
          items: ['A szám: hány kocka áll ott egymáson.', 'Az összes kocka: add össze a számokat!', 'A rejtett kockákat is számold!']
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={<SolidsG3Matcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />}
      sorterComponent={<SolidsG3Sorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />}
    />
  );
};

export default SolidsG3Quiz;

