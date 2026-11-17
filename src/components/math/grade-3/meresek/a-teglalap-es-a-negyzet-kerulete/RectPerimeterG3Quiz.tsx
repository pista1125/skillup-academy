import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { RectPerimeterG3Matcher } from './RectPerimeterG3Matcher';
import { RectPerimeterG3Sorter } from './RectPerimeterG3Sorter';
import { FONT, RectShape, GridRect } from './RectPerimeterG3Parts';

// ---------------------------------------------------------------------------
// Kérdésábrák
// ---------------------------------------------------------------------------
const UNK = '#dc2626';

const QFig: React.FC<{ children: React.ReactNode; h?: number }> = ({ children, h = 120 }) => (
  <svg viewBox={`0 0 240 ${h}`} className="w-full max-w-[280px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="238" height={h - 2} rx="10" fill="#f8fafc" stroke="#cbd5e1" />
    {children}
  </svg>
);

/** Méretarányos téglalap. a, b: a vízszintes és a függőleges oldal (azonos egységben). labels: [felső, jobb, alsó, bal] */
const RectFig: React.FC<{ a: number; b: number; labels: (string | null)[]; note?: string; fill?: string; square?: boolean; maxW?: number }> = ({
  a,
  b,
  labels,
  note,
  fill,
  square = false,
  maxW = 140
}) => {
  const maxH = 72;
  const k = Math.min(maxW / a, maxH / b);
  const w = a * k;
  const h = b * k;
  const x = (note ? 96 : 120) - w / 2;
  const y = 24 + (maxH - h) / 2;
  return (
    <QFig>
      <RectShape x={x} y={y} w={w} h={h} labels={labels} fill={fill ?? (square ? '#dcfce7' : '#fef9c3')} same={square} markR={Math.min(11, h / 3)} />
      {note && (
        <text x="232" y="20" textAnchor="end" fontSize="12" fontWeight="bold" fill="#334155">{note}</text>
      )}
    </QFig>
  );
};

const GridRectFig: React.FC<{ w: number; h: number }> = ({ w, h }) => {
  const s = 22;
  const cols = w + 2;
  const rows = h + 2;
  const x = (240 - cols * s) / 2;
  return (
    <QFig h={rows * s + 40}>
      <GridRect x={x} y={10} s={s} cols={cols} rows={rows} c0={1} r0={1} w={w} h={h} />
      <text x="120" y={rows * s + 32} textAnchor="middle" fontSize="12" fill="#334155">1 kis négyzet oldala = 1 egység</text>
    </QFig>
  );
};

const TwoGridRectsFig: React.FC = () => (
  <QFig h={124}>
    <GridRect x={10} y={12} s={18} cols={7} rows={4} c0={1} r0={1} w={5} h={1} />
    <GridRect x={138} y={12} s={18} cols={5} rows={4} c0={1} r0={1} w={3} h={2} fill="#bbf7d0" stroke="#15803d" />
    <text x="73" y="108" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#1d4ed8">A</text>
    <text x="183" y="108" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#15803d">B</text>
  </QFig>
);

const SquareVsRectFig: React.FC = () => (
  <QFig h={124}>
    <RectShape x={26} y={30} w={60} h={60} labels={['6 cm', null, null, null]} same fill="#dcfce7" markR={9} />
    <RectShape x={118} y={50} w={80} h={40} labels={['8 cm', '4 cm', null, null]} markR={9} />
  </QFig>
);

const WireFig: React.FC = () => (
  <QFig h={110}>
    <path d="M 16 40 h 80" stroke="#64748b" strokeWidth="4" strokeLinecap="round" />
    <text x="56" y="30" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#0f172a">1 m drót</text>
    <path d="M 104 40 l 14 0 m -6 -6 l 6 6 l -6 6" stroke="#0f172a" strokeWidth="2" fill="none" />
    <RectShape x={140} y={22} w={60} h={60} labels={['?', null, null, null]} same fill="#f1f5f9" markR={9} />
  </QFig>
);

const TwoSquaresFig: React.FC = () => (
  <QFig h={110}>
    <RectShape x={60} y={30} w={60} h={60} labels={['5 cm', null, null, '5 cm']} same fill="#dcfce7" markR={9} />
    <RectShape x={120} y={30} w={60} h={60} labels={['5 cm', null, null, null]} same fill="#dcfce7" markR={9} />
  </QFig>
);

const BoxRibbonFig: React.FC = () => (
  <QFig h={120}>
    <RectShape x={24} y={34} w={90} h={60} labels={["30 cm", "20 cm", null, null]} fill="#fde68a" markR={10} />
    <text x="202" y="50" textAnchor="middle" fontSize="12" fill="#334155">szalag:</text>
    <text x="202" y="68" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#db2777">1 m 20 cm</text>
  </QFig>
);

const GateRectFig: React.FC = () => {
  const k = 8;
  const x = 40;
  const y = 22;
  return (
    <QFig h={124}>
      <RectShape x={x} y={y} w={15 * k} h={10 * k} labels={['15 m', '10 m', null, null]} fill="#d9f99d" markR={10} />
      <line x1={x + 6 * k} y1={y + 10 * k} x2={x + 9 * k} y2={y + 10 * k} stroke="#d9f99d" strokeWidth="6" />
      <line x1={x + 6 * k} y1={y + 10 * k - 6} x2={x + 6 * k} y2={y + 10 * k + 6} stroke="#1e293b" strokeWidth="2" />
      <line x1={x + 9 * k} y1={y + 10 * k - 6} x2={x + 9 * k} y2={y + 10 * k + 6} stroke="#1e293b" strokeWidth="2" />
      <text x={x + 7.5 * k} y={y + 10 * k + 18} textAnchor="middle" fontSize="11" fontWeight="bold" fill="#7c3aed">kapu: 3 m</text>
    </QFig>
  );
};

// ---------------------------------------------------------------------------
// Kérdések
// ---------------------------------------------------------------------------
export const RECT_PERIMETER_G3_QUESTIONS: QuizQuestion[] = [
  // ---------------- 1. szint ----------------
  {
    id: 'rper3-q1',
    level: 1,
    questionTypeBadge: 'Téglalap',
    figure: <RectFig a={5} b={2} labels={['5 cm', '2 cm', null, null]} />,
    question: 'Mennyi a téglalap kerülete?',
    options: ['14 cm', '7 cm', '10 cm', '12 cm'],
    correctAnswer: 0,
    explanation: 'A szemben lévő oldalak egyenlők: 5 + 2 + 5 + 2 = 14 cm.'
  },
  {
    id: 'rper3-q2',
    level: 1,
    questionTypeBadge: 'Téglalap',
    question: 'Mit tudunk a téglalap szemben lévő oldalairól?',
    options: ['Egyenlő hosszúak.', 'Mindig különböző hosszúak.', 'Összesen 10 cm-esek.', 'Az egyik mindig 1 cm.'],
    correctAnswer: 0,
    explanation: 'A téglalap szemben lévő oldalai egyenlő hosszúak. Ezért elég két oldalt megmérni.'
  },
  {
    id: 'rper3-q3',
    level: 1,
    questionTypeBadge: 'Négyzet',
    figure: <RectFig a={3} b={3} labels={['3 cm', null, null, null]} square />,
    question: 'Mennyi a négyzet kerülete?',
    options: ['12 cm', '9 cm', '6 cm', '3 cm'],
    correctAnswer: 0,
    explanation: 'A négyzet minden oldala 3 cm. 3 + 3 + 3 + 3 = 12 cm.'
  },
  {
    id: 'rper3-q4',
    level: 1,
    questionTypeBadge: 'Szemben lévő oldal',
    figure: <RectFig a={4} b={3} labels={['4 cm', null, '? cm', '3 cm']} />,
    question: 'Milyen hosszú a téglalap alsó oldala?',
    options: ['4 cm', '3 cm', '7 cm', '8 cm'],
    correctAnswer: 0,
    explanation: 'Az alsó oldal a felsővel szemben van. A szemben lévő oldalak egyenlők, tehát 4 cm.'
  },
  {
    id: 'rper3-q5',
    level: 1,
    questionTypeBadge: 'Négyzet',
    question: 'Melyik igaz a négyzetre?',
    options: ['Minden oldala egyenlő hosszú.', 'Csak két oldala egyenlő.', 'Három oldala van.', 'Nincs derékszöge.'],
    correctAnswer: 0,
    explanation: 'A négyzet olyan téglalap, amelynek minden oldala egyenlő hosszú. 4 derékszöge van.'
  },
  {
    id: 'rper3-q6',
    level: 1,
    questionTypeBadge: 'Négyzetrács',
    figure: <GridRectFig w={4} h={2} />,
    question: 'Hány egység a téglalap kerülete?',
    options: ['12 egység', '8 egység', '6 egység', '10 egység'],
    correctAnswer: 0,
    explanation: 'Hossza 4, szélessége 2 egység. 4 + 2 + 4 + 2 = 12 egység.'
  },
  {
    id: 'rper3-q7',
    level: 1,
    questionTypeBadge: 'Négyzet',
    figure: <RectFig a={10} b={10} labels={['10 cm', null, null, null]} square />,
    question: 'Egy négyzet oldala 10 cm. Mennyi a kerülete?',
    options: ['40 cm', '20 cm', '100 cm', '14 cm'],
    correctAnswer: 0,
    explanation: '4 egyforma oldal: 10 + 10 + 10 + 10 = 40 cm.'
  },
  {
    id: 'rper3-q8',
    level: 1,
    questionTypeBadge: 'Téglalap',
    figure: <RectFig a={6} b={4} labels={['6 m', '4 m', null, null]} fill="#fef08a" />,
    question: 'A homokozó 6 m hosszú és 4 m széles. Hány m a kerülete?',
    options: ['20 m', '10 m', '24 m', '16 m'],
    correctAnswer: 0,
    explanation: '6 + 4 + 6 + 4 = 20 m.'
  },
  {
    id: 'rper3-q9',
    level: 1,
    questionTypeBadge: 'Négyzetrács',
    figure: <GridRectFig w={3} h={3} />,
    question: 'Hány egység a négyzet kerülete?',
    options: ['12 egység', '9 egység', '8 egység', '6 egység'],
    correctAnswer: 0,
    explanation: 'Minden oldala 3 egység. 4 · 3 = 12 egység. A 9 a kis négyzetek száma.'
  },
  {
    id: 'rper3-q10',
    level: 1,
    questionTypeBadge: 'Négyzet',
    question: 'Hány egyforma hosszú oldala van a négyzetnek?',
    options: ['4', '2', '3', 'nincs egyforma'],
    correctAnswer: 0,
    explanation: 'A négyzet mind a 4 oldala egyforma hosszú.'
  },
  // ---------------- 2. szint ----------------
  {
    id: 'rper3-q11',
    level: 2,
    questionTypeBadge: 'Téglalap',
    figure: <RectFig a={25} b={15} labels={['25 cm', '15 cm', null, null]} fill="#fde68a" />,
    question: 'Egy képkeret 25 cm hosszú és 15 cm széles. Mennyi a kerülete?',
    options: ['80 cm', '40 cm', '65 cm', '100 cm'],
    correctAnswer: 0,
    explanation: '25 + 15 + 25 + 15 = 80 cm. (A 40 cm csak két oldal.)'
  },
  {
    id: 'rper3-q12',
    level: 2,
    questionTypeBadge: 'Négyzet',
    figure: <RectFig a={1} b={1} labels={['125 cm', null, null, null]} square fill="#fbcfe8" />,
    question: 'Egy négyzet alakú virágágyás oldala 125 cm. Hány cm szegély kell köré?',
    options: ['500 cm', '250 cm', '129 cm', '400 cm'],
    correctAnswer: 0,
    explanation: '4 · 125 cm. 4 · 100 = 400, 4 · 25 = 100. 400 + 100 = 500 cm.'
  },
  {
    id: 'rper3-q13',
    level: 2,
    questionTypeBadge: 'Mértékváltás',
    figure: <RectFig a={100} b={40} labels={['1 m', '40 cm', null, null]} />,
    question: 'Egy téglalap oldalai 1 m és 40 cm. Hány cm a kerülete?',
    options: ['280 cm', '82 cm', '140 cm', '240 cm'],
    correctAnswer: 0,
    explanation: '1 m = 100 cm. 100 + 40 + 100 + 40 = 280 cm.'
  },
  {
    id: 'rper3-q14',
    level: 2,
    questionTypeBadge: 'Téglalap',
    figure: <RectFig a={35} b={20} labels={['35 m', '20 m', null, null]} fill="#bae6fd" />,
    question: 'Hány métert sétálsz, ha egyszer körbejárod a medencét?',
    options: ['110 m', '55 m', '90 m', '140 m'],
    correctAnswer: 0,
    explanation: '35 + 20 + 35 + 20 = 110 m.'
  },
  {
    id: 'rper3-q15',
    level: 2,
    questionTypeBadge: 'Összehasonlítás',
    figure: <TwoGridRectsFig />,
    question: 'Melyik téglalapnak nagyobb a kerülete?',
    options: ['Az A-nak', 'A B-nek', 'Egyforma a kerületük.', 'Nem lehet megszámolni.'],
    correctAnswer: 0,
    explanation: 'A: 5 + 1 + 5 + 1 = 12 egység. B: 3 + 2 + 3 + 2 = 10 egység. Az A kerülete nagyobb.'
  },
  {
    id: 'rper3-q16',
    level: 2,
    questionTypeBadge: 'Négyzet',
    question: 'Egy négyzet alakú asztallap oldala 8 dm. Mennyi a kerülete?',
    options: ['32 dm', '16 dm', '12 dm', '64 dm'],
    correctAnswer: 0,
    explanation: '4 · 8 dm = 32 dm.'
  },
  {
    id: 'rper3-q17',
    level: 2,
    questionTypeBadge: 'Téglalap',
    figure: <RectFig a={120} b={80} labels={['120 m', '80 m', null, null]} fill="#bbf7d0" />,
    question: 'A sportpálya 120 m hosszú és 80 m széles. Mennyi a kerülete?',
    options: ['400 m', '200 m', '280 m', '480 m'],
    correctAnswer: 0,
    explanation: '120 + 80 + 120 + 80 = 400 m.'
  },
  {
    id: 'rper3-q18',
    level: 2,
    questionTypeBadge: 'Téglalap',
    question: 'Egy téglalap 18 dm hosszú és 7 dm széles. Mennyi a kerülete?',
    options: ['50 dm', '25 dm', '43 dm', '72 dm'],
    correctAnswer: 0,
    explanation: '18 + 18 = 36. 7 + 7 = 14. 36 + 14 = 50 dm.'
  },
  {
    id: 'rper3-q19',
    level: 2,
    questionTypeBadge: 'Négyzet',
    figure: <RectFig a={1} b={1} labels={['15 cm', null, null, null]} square fill="#e0f2fe" />,
    question: 'Egy négyzet alakú fénykép oldala 15 cm. Mennyi a kerülete?',
    options: ['60 cm', '30 cm', '45 cm', '19 cm'],
    correctAnswer: 0,
    explanation: '15 + 15 + 15 + 15 = 60 cm.'
  },
  {
    id: 'rper3-q20',
    level: 2,
    questionTypeBadge: 'Szöveges feladat',
    question: 'A kutya körbefut a téglalap alakú udvaron. Az udvar 9 m hosszú és 6 m széles. Hány métert fut?',
    options: ['30 m', '15 m', '24 m', '36 m'],
    correctAnswer: 0,
    explanation: '9 + 6 + 9 + 6 = 30 m.'
  },
  // ---------------- 3. szint ----------------
  {
    id: 'rper3-q21',
    level: 3,
    questionTypeBadge: 'Visszafelé',
    figure: <RectFig a={1} b={1} labels={['? cm', null, null, null]} square note="kerület: 36 cm" />,
    question: 'Egy négyzet kerülete 36 cm. Milyen hosszú egy oldala?',
    options: ['9 cm', '18 cm', '32 cm', '40 cm'],
    correctAnswer: 0,
    explanation: 'A négyzetnek 4 egyforma oldala van. 36 : 4 = 9. Egy oldala 9 cm.'
  },
  {
    id: 'rper3-q22',
    level: 3,
    questionTypeBadge: 'Két lépés',
    figure: <RectFig a={8} b={5} labels={['8 cm', '? cm', null, null]} note="3 cm-rel rövidebb" />,
    question: 'Egy téglalap hosszabb oldala 8 cm. A rövidebb oldala 3 cm-rel rövidebb. Mennyi a kerülete?',
    options: ['26 cm', '16 cm', '22 cm', '13 cm'],
    correctAnswer: 0,
    explanation: 'A rövidebb oldal: 8 − 3 = 5 cm. A kerület: 8 + 5 + 8 + 5 = 26 cm.'
  },
  {
    id: 'rper3-q23',
    level: 3,
    questionTypeBadge: 'Visszafelé',
    figure: <RectFig a={7} b={3} labels={['7 cm', '? cm', null, null]} note="kerület: 20 cm" />,
    question: 'Egy téglalap kerülete 20 cm. A hosszabb oldala 7 cm. Milyen hosszú a rövidebb oldala?',
    options: ['3 cm', '6 cm', '13 cm', '10 cm'],
    correctAnswer: 0,
    explanation: 'A két hosszabb oldal: 7 + 7 = 14 cm. Marad 20 − 14 = 6 cm a két rövidebbre. 6 : 2 = 3 cm.'
  },
  {
    id: 'rper3-q24',
    level: 3,
    questionTypeBadge: 'Kerítés',
    figure: <GateRectFig />,
    question: 'A kert 15 m hosszú és 10 m széles. A 3 m-es kapuhoz nem kell kerítés. Hány m kerítés kell?',
    options: ['47 m', '50 m', '53 m', '22 m'],
    correctAnswer: 0,
    explanation: 'A kerület: 15 + 10 + 15 + 10 = 50 m. A kapu nélkül: 50 − 3 = 47 m.'
  },
  {
    id: 'rper3-q25',
    level: 3,
    questionTypeBadge: 'Két lépés',
    question: 'A futópálya téglalap alakú: 60 m hosszú és 40 m széles. Hány métert futsz 2 kör alatt?',
    options: ['400 m', '200 m', '100 m', '800 m'],
    correctAnswer: 0,
    explanation: 'Egy kör: 60 + 40 + 60 + 40 = 200 m. Két kör: 200 + 200 = 400 m.'
  },
  {
    id: 'rper3-q26',
    level: 3,
    questionTypeBadge: 'Összehasonlítás',
    figure: <SquareVsRectFig />,
    question: 'Melyiknek nagyobb a kerülete: a négyzetnek vagy a téglalapnak?',
    options: ['Egyforma a kerületük.', 'A négyzeté nagyobb.', 'A téglalapé nagyobb.', 'Nem lehet kiszámolni.'],
    correctAnswer: 0,
    explanation: 'Négyzet: 6 + 6 + 6 + 6 = 24 cm. Téglalap: 8 + 4 + 8 + 4 = 24 cm. Egyformák!'
  },
  {
    id: 'rper3-q27',
    level: 3,
    questionTypeBadge: 'Négyzetrács',
    question: 'Melyik téglalap kerülete 16 egység?',
    options: ['6 egység hosszú, 2 egység széles', '8 egység hosszú, 8 egység széles', '10 egység hosszú, 6 egység széles', '16 egység hosszú, 1 egység széles'],
    correctAnswer: 0,
    explanation: '6 + 2 + 6 + 2 = 16. A többi: 8 + 8 + 8 + 8 = 32, 10 + 6 + 10 + 6 = 32, 16 + 1 + 16 + 1 = 34.'
  },
  {
    id: 'rper3-q28',
    level: 3,
    questionTypeBadge: 'Visszafelé',
    figure: <WireFig />,
    question: 'Egy 1 m hosszú drótból négyzetet hajlítunk, nem marad semmi. Milyen hosszú egy oldala?',
    options: ['25 cm', '4 cm', '50 cm', '96 cm'],
    correctAnswer: 0,
    explanation: '1 m = 100 cm. A négyzetnek 4 egyforma oldala van: 100 : 4 = 25 cm.'
  },
  {
    id: 'rper3-q29',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    figure: <BoxRibbonFig />,
    question: 'A doboz teteje körül szalagot ragasztunk. 1 m 20 cm szalagunk van. Mennyi marad?',
    options: ['20 cm', '100 cm', '70 cm', '50 cm'],
    correctAnswer: 0,
    explanation: 'A kerület: 30 + 20 + 30 + 20 = 100 cm. 1 m 20 cm = 120 cm. 120 − 100 = 20 cm marad.'
  },
  {
    id: 'rper3-q30',
    level: 3,
    questionTypeBadge: 'Két lépés',
    figure: <TwoSquaresFig />,
    question: 'Két egyforma, 5 cm oldalú négyzetet egymás mellé teszünk. Mennyi az új téglalap kerülete?',
    options: ['30 cm', '40 cm', '20 cm', '25 cm'],
    correctAnswer: 0,
    explanation: 'Az új téglalap 10 cm hosszú és 5 cm széles. 10 + 5 + 10 + 5 = 30 cm. A középső vonal belül van, nem számít.'
  }
];

export const RectPerimeterG3Quiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => {
  return (
    <QuizTemplate
      grade={3}
      chapterId="meresek"
      topicId="g3-meas-teglalap-kerulet-quiz"
      subtopicId="a-teglalap-es-a-negyzet-kerulete"
      title="6. A téglalap és a négyzet kerülete – Kvíz"
      subtitle="30 feladat 3 szinten: szemben lévő oldalak, téglalap és négyzet kerülete, kerítés, visszafelé számolás."
      badge="3. OSZTÁLY • IV. MÉRÉSEK • KVÍZ"
      questions={RECT_PERIMETER_G3_QUESTIONS}
      cheatSheets={[
        {
          title: 'Téglalap',
          items: ['A szemben lévő oldalak egyenlők', '6 cm és 3 cm: 6 + 3 + 6 + 3 = 18 cm', 'vagy: 6 + 6 + 3 + 3 = 18 cm']
        },
        {
          title: 'Négyzet',
          items: ['Minden oldala egyenlő', 'oldala 5 cm: 4 · 5 cm = 20 cm', 'kerülete 28 cm: 28 : 4 = 7 cm']
        },
        {
          title: 'Vigyázz!',
          items: ['Ne csak két oldalt adj össze!', 'Azonos egység: 1 m = 100 cm', 'Kapu: a kerületből vond le']
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <RectPerimeterG3Matcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <RectPerimeterG3Sorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default RectPerimeterG3Quiz;
