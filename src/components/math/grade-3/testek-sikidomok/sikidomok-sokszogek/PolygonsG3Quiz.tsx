import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { PolygonsG3Matcher } from './PolygonsG3Matcher';
import { PolygonsG3Sorter } from './PolygonsG3Sorter';
import { FONT, INK, SHAPES, ShapeG, Stick, StickGrid } from './PolygonsG3Parts';
import { Solid } from '../a-testek/SolidsG3Parts';

// ---------------------------------------------------------------------------
// Kérdésábrák
// ---------------------------------------------------------------------------
const QFig: React.FC<{ children: React.ReactNode; h?: number }> = ({ children, h = 150 }) => (
  <svg viewBox={`0 0 240 ${h}`} className="w-full max-w-[280px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="238" height={h - 2} rx="10" fill="#f8fafc" stroke="#cbd5e1" />
    {children}
  </svg>
);
const Num: React.FC<{ x: number; y: number; children: React.ReactNode }> = ({ x, y, children }) => (
  <text x={x} y={y} textAnchor="middle" fontSize="14" fontWeight="bold" fill={INK}>
    {children}
  </text>
);

const One: React.FC<{ id: string; fill?: string }> = ({ id, fill }) => (
  <QFig h={140}>
    <ShapeG shape={SHAPES[id]} x={66} y={14} s={112} sw={3} fill={fill} />
  </QFig>
);

const Row: React.FC<{ ids: string[] }> = ({ ids }) => {
  const step = 240 / ids.length;
  const s = Math.min(48, step - 10);
  return (
    <QFig h={100}>
      {ids.map((id, i) => (
        <g key={i}>
          <ShapeG shape={SHAPES[id]} x={step * (i + 0.5) - s / 2} y={14} s={s} sw={2.2} />
          <Num x={step * (i + 0.5)} y={88}>{i + 1}.</Num>
        </g>
      ))}
    </QFig>
  );
};

/** Egy háromszög, a csúcsából az alap közepére húzott vonallal. */
const SplitTriangle: React.FC = () => (
  <QFig h={140}>
    <polygon points="30,120 210,120 120,18" fill="#fde68a" stroke={INK} strokeWidth="3" strokeLinejoin="round" />
    <line x1="120" y1="18" x2="120" y2="120" stroke={INK} strokeWidth="3" />
  </QFig>
);

// ---------------------------------------------------------------------------
// Kérdések
// ---------------------------------------------------------------------------
export const POLYGONS_G3_QUESTIONS: QuizQuestion[] = [
  // ----- 1. szint -----
  {
    id: 'pol-g3-q1',
    level: 1,
    questionTypeBadge: 'Sokszög',
    figure: <Row ids={['circle', 'tri1', 'moon', 'ellipse']} />,
    question: 'Melyik sokszög?',
    options: ['a 2.', 'az 1.', 'a 3.', 'a 4.'],
    correctAnswer: 0,
    explanation: 'A háromszöget csak egyenes vonalak határolják. A többit görbe vonal.'
  },
  {
    id: 'pol-g3-q2',
    level: 1,
    questionTypeBadge: 'Oldalak',
    figure: <One id="square" />,
    question: 'Hány oldala van ennek a sokszögnek?',
    options: ['4', '3', '5', '8'],
    correctAnswer: 0,
    explanation: 'Fönt, lent, jobbra, balra: 4 oldal.'
  },
  {
    id: 'pol-g3-q3',
    level: 1,
    questionTypeBadge: 'Sokszög neve',
    figure: <One id="hex" />,
    question: 'Mi ennek a sokszögnek a neve?',
    options: ['hatszög', 'ötszög', 'négyszög', 'háromszög'],
    correctAnswer: 0,
    explanation: 'Számold meg a csúcsait: 6. A 6 csúcsú sokszög a hatszög.'
  },
  {
    id: 'pol-g3-q4',
    level: 1,
    questionTypeBadge: 'Sokszög',
    figure: <One id="circle" />,
    question: 'Sokszög-e a kör?',
    options: ['Nem, mert görbe vonal határolja.', 'Igen, mert síkidom.', 'Igen, mert kerek.'],
    correctAnswer: 0,
    explanation: 'A sokszöget csak egyenes vonalak határolják. A kör széle görbe.'
  },
  {
    id: 'pol-g3-q5',
    level: 1,
    questionTypeBadge: 'Csúcsok',
    figure: <One id="house" />,
    question: 'Hány csúcsa van ennek a házikónak?',
    options: ['5', '4', '6', '3'],
    correctAnswer: 0,
    explanation: 'A tetején 3 csúcs, alul 2 csúcs: 3 + 2 = 5. Ez ötszög.'
  },
  {
    id: 'pol-g3-q6',
    level: 1,
    questionTypeBadge: 'Sokszög',
    question: 'Milyen vonalak határolják a sokszöget?',
    options: ['csak egyenes vonalak', 'csak görbe vonalak', 'egyenes és görbe vonalak is', 'hullámos vonalak'],
    correctAnswer: 0,
    explanation: 'Azokat a síkidomokat, amelyeket csak egyenes vonalak (szakaszok) határolnak, sokszögeknek nevezzük.'
  },
  {
    id: 'pol-g3-q7',
    level: 1,
    questionTypeBadge: 'Téglalap',
    figure: <One id="rect" />,
    question: 'Mi ennek a síkidomnak a neve?',
    options: ['téglalap', 'négyzet', 'háromszög', 'kör'],
    correctAnswer: 0,
    explanation: 'Négy oldala van, a szemközti oldalak egyenlők, a sarkai olyanok, mint a füzetlap sarka. A hosszabb oldalak miatt nem négyzet.'
  },
  {
    id: 'pol-g3-q8',
    level: 1,
    questionTypeBadge: 'Négyzet',
    figure: <One id="square" fill="#bbf7d0" />,
    question: 'Mi ennek a síkidomnak a neve?',
    options: ['négyzet', 'háromszög', 'kör', 'ötszög'],
    correctAnswer: 0,
    explanation: 'Mind a 4 oldala egyenlő, a sarkai olyanok, mint a füzetlap sarka: ez négyzet.'
  },
  {
    id: 'pol-g3-q9',
    level: 1,
    questionTypeBadge: 'Test vagy síkidom?',
    figure: (
      <QFig h={110}>
        <Solid kind="kocka" cx={40} by={76} s={46} sw={2.2} />
        <path d="M 92 60 Q 108 30 124 60 T 156 60" fill="none" stroke={INK} strokeWidth="3.5" strokeLinecap="round" />
        <ShapeG shape={SHAPES.tri5} x={176} y={30} s={50} sw={2.2} />
        <Num x={40} y={100}>1.</Num>
        <Num x={124} y={100}>2.</Num>
        <Num x={201} y={100}>3.</Num>
      </QFig>
    ),
    question: 'Melyik síkidom?',
    options: ['a 3.', 'az 1.', 'a 2.'],
    correctAnswer: 0,
    explanation: 'Az 1. test (kocka), a 2. csak egy vonal. A 3. lapos, vonalak határolják: síkidom.'
  },
  {
    id: 'pol-g3-q10',
    level: 1,
    questionTypeBadge: 'Oldalak',
    figure: <One id="trap" />,
    question: 'Hány oldala van ennek a sokszögnek?',
    options: ['4', '3', '5', '6'],
    correctAnswer: 0,
    explanation: 'Fönt 1, lent 1, a két ferde oldal: 4 oldal. Ez négyszög.'
  },

  // ----- 2. szint -----
  {
    id: 'pol-g3-q11',
    level: 2,
    questionTypeBadge: 'Sokszög',
    figure: <Row ids={['half', 'stadium', 'para', 'drop']} />,
    question: 'Melyik sokszög?',
    options: ['a 3.', 'az 1.', 'a 2.', 'a 4.'],
    correctAnswer: 0,
    explanation: 'Csak a 3.-at határolják egyenes vonalak. Az 1., a 2. és a 4. formának van görbe része is.'
  },
  {
    id: 'pol-g3-q12',
    level: 2,
    questionTypeBadge: 'Oldalak',
    figure: <One id="arrow5" />,
    question: 'Hány oldala van ennek a nyíl alakú sokszögnek?',
    options: ['5', '4', '6', '3'],
    correctAnswer: 0,
    explanation: 'Fönt 1, a csúcsnál 2 ferde, lent 1, hátul 1: 5 oldal. Ez ötszög.'
  },
  {
    id: 'pol-g3-q13',
    level: 2,
    questionTypeBadge: 'Sokszög neve',
    figure: <One id="hexL" />,
    question: 'Mi ennek a sokszögnek a neve?',
    options: ['hatszög', 'négyszög', 'ötszög', 'téglalap'],
    correctAnswer: 0,
    explanation: 'Menj körbe, és számold a sarkokat: 6 csúcs. Ez hatszög, nem téglalap.'
  },
  {
    id: 'pol-g3-q14',
    level: 2,
    questionTypeBadge: 'Csúcsok',
    figure: <One id="dart" />,
    question: 'Hány csúcsa van ennek a sokszögnek?',
    options: ['4', '3', '5', '2'],
    correctAnswer: 0,
    explanation: 'A befelé mutató sarok is csúcs! 3 + 1 = 4 csúcs: ez négyszög.'
  },
  {
    id: 'pol-g3-q15',
    level: 2,
    questionTypeBadge: 'Oldalak és csúcsok',
    question: 'Egy sokszögnek 6 csúcsa van. Hány oldala van?',
    options: ['6', '5', '7', '12'],
    correctAnswer: 0,
    explanation: 'Minden sokszögnek ugyanannyi oldala van, mint csúcsa: 6.'
  },
  {
    id: 'pol-g3-q16',
    level: 2,
    questionTypeBadge: 'Négyzet',
    figure: (
      <QFig h={110}>
        <defs>
          <pattern id="pol-q16-grid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#cbd5e1" strokeWidth="0.8" />
          </pattern>
        </defs>
        <rect x="4" y="4" width="232" height="70" fill="url(#pol-q16-grid)" />
        <rect x="10" y="20" width="50" height="40" fill="#93c5fd" stroke={INK} strokeWidth="2.5" />
        <polygon points="100,10 120,40 100,70 80,40" fill="#93c5fd" stroke={INK} strokeWidth="2.5" />
        <rect x="140" y="20" width="40" height="40" fill="#93c5fd" stroke={INK} strokeWidth="2.5" />
        <polygon points="200,60 230,60 222,20 208,20" fill="#93c5fd" stroke={INK} strokeWidth="2.5" />
        <Num x={35} y={96}>1.</Num>
        <Num x={100} y={96}>2.</Num>
        <Num x={160} y={96}>3.</Num>
        <Num x={215} y={96}>4.</Num>
      </QFig>
    ),
    question: 'Melyik négyzet? Nézd a négyzethálót!',
    options: ['a 3.', 'az 1.', 'a 2.', 'a 4.'],
    correctAnswer: 0,
    explanation: 'A 3. 4 kockányi széles és 4 kockányi magas, a sarkai egyenesek. Az 1. hosszúkás, a 2. és a 4. sarkai ferdék.'
  },
  {
    id: 'pol-g3-q17',
    level: 2,
    questionTypeBadge: 'Csúcsok',
    figure: <Row ids={['tri3', 'quadOdd', 'hexLong', 'pentOdd']} />,
    question: 'Melyiknek van a legtöbb csúcsa?',
    options: ['a 3.', 'az 1.', 'a 2.', 'a 4.'],
    correctAnswer: 0,
    explanation: 'Az 1.-nek 3, a 2.-nak 4, a 4.-nek 5 csúcsa van. A 3. hatszög: 6 csúcs.'
  },
  {
    id: 'pol-g3-q18',
    level: 2,
    questionTypeBadge: 'Igaz vagy hamis?',
    question: '„Van olyan négyszög, amelyet görbe vonal határol.” Igaz vagy hamis?',
    options: ['Hamis, a négyszöget 4 egyenes oldal határolja.', 'Igaz, a kör is négyszög.', 'Igaz, ha nagyon kicsi a görbe rész.'],
    correctAnswer: 0,
    explanation: 'A négyszög sokszög, a sokszöget csak egyenes vonalak határolják.'
  },
  {
    id: 'pol-g3-q19',
    level: 2,
    questionTypeBadge: 'Sokszög',
    figure: <One id="doorway" />,
    question: 'Sokszög-e ez az ajtó alakú síkidom?',
    options: ['Nem, mert a teteje görbe.', 'Igen, mert 3 egyenes oldala van.', 'Igen, mert van alja.'],
    correctAnswer: 0,
    explanation: 'Alul és oldalt egyenes, de a teteje íves. Ha egy görbe vonal is határolja, már nem sokszög.'
  },
  {
    id: 'pol-g3-q20',
    level: 2,
    questionTypeBadge: 'Pálcikák',
    figure: (
      <QFig h={120}>
        <StickGrid r={1} c={1} x={90} y={20} s={64} w={6} />
      </QFig>
    ),
    question: 'Ehhez a négyszöghöz 4 pálcika kell. Hány pálcika kell 2 külön négyszöghöz?',
    options: ['8', '4', '6', '7'],
    correctAnswer: 0,
    explanation: 'Egy négyszöghöz 4 pálcika kell. Kettőhöz: 4 + 4 = 8.'
  },

  // ----- 3. szint -----
  {
    id: 'pol-g3-q21',
    level: 3,
    questionTypeBadge: 'Pálcikák',
    figure: (
      <QFig h={110}>
        <Stick x1={40} y1={90} x2={110} y2={90} w={6} />
        <Stick x1={110} y1={90} x2={75} y2={28} w={6} />
        <Stick x1={75} y1={28} x2={40} y2={90} w={6} />
        <text x={175} y={66} textAnchor="middle" fontSize="18" fontWeight="bold" fill={INK}>12 pálcika</text>
      </QFig>
    ),
    question: '12 pálcikából külön-külön háromszögeket raksz ki. Hány háromszög lesz?',
    options: ['4', '3', '6', '9'],
    correctAnswer: 0,
    explanation: 'Egy háromszöghöz 3 pálcika kell. 12 : 3 = 4.'
  },
  {
    id: 'pol-g3-q22',
    level: 3,
    questionTypeBadge: 'Pálcikák',
    question: '17 pálcikából külön-külön négyszögeket raksz ki. Hány négyszög lesz, és hány pálcika marad?',
    options: ['4 négyszög, 1 pálcika marad', '4 négyszög, nem marad pálcika', '5 négyszög, 3 pálcika marad', '3 négyszög, 5 pálcika marad'],
    correctAnswer: 0,
    explanation: 'Egyhez 4 pálcika kell. 17 : 4 = 4, marad 1. 4 négyszög lesz, 1 pálcika marad.'
  },
  {
    id: 'pol-g3-q23',
    level: 3,
    questionTypeBadge: 'Téglalap',
    figure: <Row ids={['rect', 'square', 'para', 'rectTall', 'trap']} />,
    question: 'Hány téglalap van a képen? (A négyzet is téglalap!)',
    options: ['3', '2', '4', '5'],
    correctAnswer: 0,
    explanation: 'Az 1., a 2. (négyzet) és a 4. téglalap. A 3. és az 5. sarkai ferdék. 3 téglalap.'
  },
  {
    id: 'pol-g3-q24',
    level: 3,
    questionTypeBadge: 'Igaz vagy hamis?',
    question: 'Melyik állítás igaz?',
    options: ['Minden négyzet téglalap.', 'Minden téglalap négyzet.', 'Minden síkidom sokszög.', 'A kör sokszög.'],
    correctAnswer: 0,
    explanation: 'A négyzet olyan téglalap, amelynek minden oldala egyenlő. De nem minden téglalap négyzet, és a kör nem sokszög.'
  },
  {
    id: 'pol-g3-q25',
    level: 3,
    questionTypeBadge: 'Hány háromszög?',
    figure: <SplitTriangle />,
    question: 'Hány háromszöget látsz ezen az ábrán?',
    options: ['3', '2', '4', '1'],
    correctAnswer: 0,
    explanation: 'A bal oldali kicsi, a jobb oldali kicsi, és a kettő együtt is egy nagy háromszög: 3.'
  },
  {
    id: 'pol-g3-q26',
    level: 3,
    questionTypeBadge: 'Oldalak és csúcsok',
    figure: (
      <QFig h={120}>
        <ShapeG shape={SHAPES.tri1} x={20} y={14} s={90} sw={2.6} />
        <ShapeG shape={SHAPES.pent} x={130} y={12} s={92} sw={2.6} />
      </QFig>
    ),
    question: 'Hány oldala van a két sokszögnek összesen?',
    options: ['8', '7', '9', '5'],
    correctAnswer: 0,
    explanation: 'A háromszögnek 3, az ötszögnek 5 oldala van: 3 + 5 = 8.'
  },
  {
    id: 'pol-g3-q27',
    level: 3,
    questionTypeBadge: 'Sokszög neve',
    question: 'Egy sokszögnek 2-vel több csúcsa van, mint egy négyszögnek. Mi a neve?',
    options: ['hatszög', 'ötszög', 'háromszög', 'négyszög'],
    correctAnswer: 0,
    explanation: 'A négyszögnek 4 csúcsa van. 4 + 2 = 6 csúcs: hatszög.'
  },
  {
    id: 'pol-g3-q28',
    level: 3,
    questionTypeBadge: 'Pálcikák',
    figure: (
      <QFig h={150}>
        <StickGrid r={2} c={2} x={70} y={14} s={56} w={5} />
      </QFig>
    ),
    question: 'Hány négyzetet látsz ezen a pálcikás ábrán?',
    options: ['5', '4', '1', '6'],
    correctAnswer: 0,
    explanation: '4 kicsi négyzet van, és a 4 együtt egy nagy négyzetet ad: 4 + 1 = 5.'
  },
  {
    id: 'pol-g3-q29',
    level: 3,
    questionTypeBadge: 'Sokszög neve',
    figure: (
      <QFig h={150}>
        {([
          ['A', 40, 120],
          ['B', 40, 50],
          ['C', 110, 16],
          ['D', 200, 50],
          ['E', 170, 120]
        ] as [string, number, number][]).map(([l, x, y]) => (
          <g key={l}>
            <circle cx={x} cy={y} r={6} fill={INK} />
            <text x={x + (x < 100 ? -14 : 14)} y={y + 5} textAnchor="middle" fontSize="15" fontWeight="bold" fill={INK}>
              {l}
            </text>
          </g>
        ))}
      </QFig>
    ),
    question: 'Kösd össze a pontokat sorban: A, B, C, D, E, aztán vissza az A-hoz. Milyen sokszöget kapsz?',
    options: ['ötszöget', 'négyszöget', 'hatszöget', 'háromszöget'],
    correctAnswer: 0,
    explanation: '5 pont, mindegyik csúcs lesz: 5 csúcs, 5 oldal. Ez ötszög.'
  },
  {
    id: 'pol-g3-q30',
    level: 3,
    questionTypeBadge: 'Kakukktojás',
    figure: <Row ids={['square', 'rect', 'ellipse', 'trap']} />,
    question: 'Melyik nem illik a többi közé? Miért?',
    options: ['a 3., mert görbe vonal határolja', 'az 1., mert minden oldala egyenlő', 'a 2., mert hosszúkás', 'a 4., mert ferdék az oldalai'],
    correctAnswer: 0,
    explanation: 'Az 1., a 2. és a 4. négyszög, sokszög. A 3. nem sokszög: görbe vonal határolja.'
  }
];

export const PolygonsG3Quiz: React.FC<{
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
      topicId="g3-geom-sokszogek-quiz"
      subtopicId="sikidomok-sokszogek"
      title="3. Síkidomok, sokszögek – Kvíz"
      subtitle="30 feladat 3 szinten: sokszög vagy nem, oldalak és csúcsok, téglalap és négyzet, pálcikák."
      badge="3. OSZTÁLY • X. TESTEK, SÍKIDOMOK • KVÍZ"
      questions={POLYGONS_G3_QUESTIONS}
      cheatSheets={[
        {
          title: 'Sokszög',
          items: ['Csak egyenes vonalak határolják.', 'Ha görbe vonal is van: nem sokszög.', 'A kör nem sokszög.']
        },
        {
          title: 'Oldalak, csúcsok, nevek',
          items: ['Ahány oldal, annyi csúcs.', '3: háromszög, 4: négyszög', '5: ötszög, 6: hatszög']
        },
        {
          title: 'Téglalap, négyzet',
          items: ['Téglalap: minden sarka, mint a füzetlap sarka.', 'Négyzet: ráadásul 4 egyenlő oldal.', 'Minden négyzet téglalap.']
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={<PolygonsG3Matcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />}
      sorterComponent={<PolygonsG3Sorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />}
    />
  );
};

export default PolygonsG3Quiz;
