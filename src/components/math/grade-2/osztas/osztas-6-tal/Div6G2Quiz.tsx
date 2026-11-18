import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { Div6G2Matcher } from './Div6G2Matcher';
import { Div6G2Sorter } from './Div6G2Sorter';
import { DIV6_FONT, EggBoxesPart, LooseEggsPart, SixPlatesPart, DicePart, JumpLinePart, ArrowPairPart, ChainPart } from './Div6G2Parts';

// ---------------------------------------------------------------------------
// Kérdésábrák
// ---------------------------------------------------------------------------
const UNK = '#dc2626';

const QFig: React.FC<{ children: React.ReactNode; h?: number }> = ({ children, h = 100 }) => (
  <svg viewBox={`0 0 260 ${h}`} className="w-full max-w-[280px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={DIV6_FONT}>
    <rect x="1" y="1" width="258" height={h - 2} rx="12" fill="#f8fafc" stroke="#cbd5e1" />
    {children}
  </svg>
);

/** Laza tojások (dobozolás előtt). */
const QLoose: React.FC<{ n: number; caption?: string }> = ({ n, caption }) => {
  const perRow = 10;
  const step = 16;
  const rows = Math.ceil(n / perRow);
  const x0 = 130 - ((Math.min(n, perRow) - 1) * step) / 2;
  const H = 22 + (rows - 1) * step + (caption ? 34 : 16);
  return (
    <QFig h={H}>
      <LooseEggsPart x={x0} y={18} n={n} perRow={perRow} step={step} r={6} />
      {caption && (
        <text x="130" y={H - 12} textAnchor="middle" fontSize="13" fontWeight="bold" fill="#334155">
          {caption}
        </text>
      )}
    </QFig>
  );
};

/** Megtelt dobozok + kint maradt tojások. */
const QPacked: React.FC<{ boxes: number; rest: number; caption?: string; unknownBoxes?: boolean }> = ({ boxes, rest, caption, unknownBoxes }) => {
  const perRow = Math.min(boxes, 5);
  const rows = Math.ceil(boxes / perRow);
  const w = 36;
  const gap = 6;
  const h = w * 0.66;
  const restW = rest > 0 ? 50 : 0;
  const total = perRow * (w + gap) - gap + restW;
  const x0 = (260 - total) / 2;
  const boxesH = rows * (h + gap) - gap;
  const H = 18 + boxesH + (caption ? 32 : 12);
  return (
    <QFig h={H}>
      <EggBoxesPart x={x0} y={12} groups={boxes} w={w} gap={gap} perRow={perRow} unknown={unknownBoxes} />
      {rest > 0 && (
        <g>
          <rect x={x0 + total - 44} y={10} width="44" height={Math.max(boxesH, 28) + 4} rx="7" fill="#fff" stroke={UNK} strokeWidth="1.8" strokeDasharray="4 3" />
          <LooseEggsPart x={x0 + total - 33} y={20} n={rest} perRow={3} step={11} r={4.5} />
        </g>
      )}
      {caption && (
        <text x="130" y={H - 12} textAnchor="middle" fontSize="13" fontWeight="bold" fill="#334155">
          {caption}
        </text>
      )}
    </QFig>
  );
};

/** 6 tányér: vagy `each` süti, vagy „?”; fölötte a tálca szövege. */
const QPlates: React.FC<{ each?: number; q?: boolean; caption?: string }> = ({ each = 0, q = false, caption }) => (
  <QFig h={caption ? 128 : 108}>
    {caption && (
      <text x="130" y="20" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0c4a6e">
        {caption}
      </text>
    )}
    <SixPlatesPart x={70} y={caption ? 52 : 32} items={each} q={q} r={22} dx={60} dy={46} />
  </QFig>
);

const QDice: React.FC<{ n: number }> = ({ n }) => {
  const s = 30;
  const gap = 8;
  const x0 = (260 - (n * (s + gap) - gap)) / 2;
  return (
    <QFig h={56}>
      {Array.from({ length: n }, (_, i) => (
        <DicePart key={i} x={x0 + i * (s + gap)} y={13} s={s} color={['#fff', '#fef9c3', '#dbeafe', '#fce7f3', '#dcfce7', '#ede9fe'][i % 6]} />
      ))}
    </QFig>
  );
};

const QJumps: React.FC<{ jumps: number }> = ({ jumps }) => (
  <QFig h={92}>
    <JumpLinePart x0={12} y={58} unit={3.8} jumps={jumps} />
    <text x="130" y="20" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#6b21a8">
      Hatos ugrások
    </text>
  </QFig>
);

const QArrows: React.FC<{ small: string; big: string }> = ({ small, big }) => (
  <QFig h={110}>
    <ArrowPairPart x={60} y={38} small={small} big={big} w={140} />
  </QFig>
);

const QChain: React.FC<{ a: string; b: string; c: string; op1: string; op2: string }> = ({ a, b, c, op1, op2 }) => (
  <QFig h={92}>
    <ChainPart x={20} y={12} a={a} b={b} c={c} op1={op1} op2={op2} opAll=": 6" />
  </QFig>
);

const QDivPod: React.FC<{ total: number }> = ({ total }) => (
  <QFig h={92}>
    <circle cx="130" cy="32" r="21" fill="#fecdd3" stroke="#9f1239" strokeWidth="2.5" />
    <text x="130" y="39" textAnchor="middle" fontSize="20" fontWeight="900" fill="#881337">{total}</text>
    <circle cx="105" cy="72" r="13" fill="#ffe4e6" stroke="#9f1239" strokeWidth="2.5" />
    <text x="105" y="79" textAnchor="middle" fontSize="18" fontWeight="900" fill={UNK}>?</text>
    <text x="130" y="78" textAnchor="middle" fontSize="18" fontWeight="900" fill="#0f172a">·</text>
    <circle cx="155" cy="72" r="13" fill="#ffe4e6" stroke="#9f1239" strokeWidth="2.5" />
    <text x="155" y="79" textAnchor="middle" fontSize="18" fontWeight="900" fill="#0f172a">6</text>
  </QFig>
);

const QBench: React.FC = () => (
  <QFig h={84}>
    {Array.from({ length: 6 }, (_, i) => (
      <g key={i}>
        <circle cx={58 + i * 18} cy={24} r="6.5" fill={['#fcd34d', '#fca5a5', '#93c5fd', '#86efac', '#c4b5fd', '#fdba74'][i]} stroke="#1e293b" strokeWidth="1.3" />
        <rect x={52 + i * 18} y={32} width="12" height="10" rx="3" fill="#60a5fa" stroke="#1e3a8a" strokeWidth="1.1" />
      </g>
    ))}
    <rect x="44" y="42" width="120" height="7" rx="2" fill="#a16207" />
    <line x1="52" y1="49" x2="52" y2="62" stroke="#713f12" strokeWidth="3" />
    <line x1="156" y1="49" x2="156" y2="62" stroke="#713f12" strokeWidth="3" />
    <text x="104" y="77" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#334155">1 pad = 6 gyerek</text>
    <text x="214" y="40" textAnchor="middle" fontSize="15" fontWeight="900" fill="#0f172a">36</text>
    <text x="214" y="56" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#334155">gyerek</text>
  </QFig>
);

// ---------------------------------------------------------------------------
// Kérdések
// ---------------------------------------------------------------------------
export const DIV6_G2_QUESTIONS: QuizQuestion[] = [
  // ----- 1. szint -----
  {
    id: 'div6g2-q1',
    level: 1,
    questionTypeBadge: 'Dobozolás',
    figure: <QLoose n={18} caption="Egy dobozba 6 tojás fér." />,
    question: 'Hány doboz kell a 18 tojáshoz?',
    options: ['3', '12', '6', '2'],
    correctAnswer: 0,
    explanation: '6 + 6 + 6 = 18, tehát 3 doboz. 18 : 6 = 3.'
  },
  {
    id: 'div6g2-q2',
    level: 1,
    questionTypeBadge: 'Szétosztás',
    figure: <QPlates q caption="12 süti, 6 tányér" />,
    question: '12 sütit osztasz szét 6 tányérra egyenlően. Mennyi jut egy tányérra?',
    options: ['2', '6', '18', '3'],
    correctAnswer: 0,
    explanation: '12 : 6 = 2, mert 2 · 6 = 12.'
  },
  {
    id: 'div6g2-q3',
    level: 1,
    questionTypeBadge: 'Olvasás',
    question: 'Hogyan olvassuk ezt: 30 : 6 = 5?',
    options: ['30 osztva 6-tal egyenlő 5', '30 szorozva 6-tal egyenlő 5', '30 meg 6 egyenlő 5', '6 osztva 30-cal egyenlő 5'],
    correctAnswer: 0,
    explanation: 'A : jel az osztás jele. Olvasd: 30 osztva 6-tal egyenlő 5.'
  },
  {
    id: 'div6g2-q4',
    level: 1,
    questionTypeBadge: 'Hatos ugrások',
    figure: <QJumps jumps={4} />,
    question: 'Hány hatos ugrás kell a 24-ig? 24 : 6 = ?',
    options: ['4', '18', '30', '3'],
    correctAnswer: 0,
    explanation: '6, 12, 18, 24 — ez 4 ugrás. 24 : 6 = 4.'
  },
  {
    id: 'div6g2-q5',
    level: 1,
    questionTypeBadge: 'Osztótábla',
    question: '6 : 6 = ?',
    options: ['1', '0', '6', '12'],
    correctAnswer: 0,
    explanation: 'A 6-ban a 6 egyszer van meg. 6 : 6 = 1.'
  },
  {
    id: 'div6g2-q6',
    level: 1,
    questionTypeBadge: 'Szétosztás',
    figure: <QPlates q caption="18 süti, 6 tányér" />,
    question: '18 sütit osztasz szét 6 tányérra. Mennyi jut egy tányérra?',
    options: ['3', '12', '6', '24'],
    correctAnswer: 0,
    explanation: '18 : 6 = 3, mert 3 · 6 = 18.'
  },
  {
    id: 'div6g2-q7',
    level: 1,
    questionTypeBadge: 'Szorzás párja',
    question: '4 · 6 = 24. Mennyi a 24 : 6?',
    options: ['4', '6', '18', '30'],
    correctAnswer: 0,
    explanation: 'A szorzás és az osztás egy pár: 24 : 6 = 4.'
  },
  {
    id: 'div6g2-q8',
    level: 1,
    questionTypeBadge: '60 tojás',
    figure: <QPacked boxes={10} rest={0} caption="60 tojás" />,
    question: '60 : 6 = ?',
    options: ['10', '54', '6', '66'],
    correctAnswer: 0,
    explanation: '10 · 6 = 60, tehát 60 : 6 = 10.'
  },
  {
    id: 'div6g2-q9',
    level: 1,
    questionTypeBadge: 'Nulla',
    question: '0 : 6 = ?',
    options: ['0', '6', '1', '60'],
    correctAnswer: 0,
    explanation: 'Ha nincs süti, a 6 tányérra sem jut semmi. 0 : 6 = 0.'
  },
  {
    id: 'div6g2-q10',
    level: 1,
    questionTypeBadge: 'Hatoda',
    figure: <QArrows small="?" big="12" />,
    question: 'Mennyi a 12 hatoda?',
    options: ['2', '6', '18', '3'],
    correctAnswer: 0,
    explanation: 'A 12 hatoda: 12 : 6 = 2. A 2 hatszorosa 12.'
  },

  // ----- 2. szint -----
  {
    id: 'div6g2-q11',
    level: 2,
    questionTypeBadge: 'Osztótábla',
    figure: <QDivPod total={42} />,
    question: '42 : 6 = ?',
    options: ['7', '36', '48', '8'],
    correctAnswer: 0,
    explanation: '7 · 6 = 42, tehát 42 : 6 = 7.'
  },
  {
    id: 'div6g2-q12',
    level: 2,
    questionTypeBadge: 'Hatoda',
    figure: <QArrows small="?" big="54" />,
    question: 'Mennyi az 54 hatoda?',
    options: ['9', '48', '8', '60'],
    correctAnswer: 0,
    explanation: '9 · 6 = 54, tehát az 54 hatoda 9.'
  },
  {
    id: 'div6g2-q13',
    level: 2,
    questionTypeBadge: 'Dobókockák',
    figure: <QDice n={6} />,
    question: 'Minden kockán 6 pötty van. Összesen 36 pötty. Hány kocka ez?',
    options: ['6', '30', '42', '5'],
    correctAnswer: 0,
    explanation: '36 : 6 = 6, mert 6 · 6 = 36.'
  },
  {
    id: 'div6g2-q14',
    level: 2,
    questionTypeBadge: 'Hatos ugrások',
    figure: <QJumps jumps={8} />,
    question: 'Hány hatos ugrás kell a 48-ig?',
    options: ['8', '42', '7', '9'],
    correctAnswer: 0,
    explanation: '8 · 6 = 48, tehát 48 : 6 = 8 ugrás.'
  },
  {
    id: 'div6g2-q15',
    level: 2,
    questionTypeBadge: 'Hiányzó szám',
    figure: <QArrows small="5" big="?" />,
    question: '□ : 6 = 5. Melyik szám a □?',
    options: ['30', '11', '1', '35'],
    correctAnswer: 0,
    explanation: 'Ellenőrizz szorzással: 5 · 6 = 30. Tehát 30 : 6 = 5.'
  },
  {
    id: 'div6g2-q16',
    level: 2,
    questionTypeBadge: 'Maradék',
    figure: <QPacked boxes={2} rest={2} caption="14 tojás" />,
    question: '14 tojást dobozolsz hatosával. Hány tojás marad kint?',
    options: ['2', '4', '8', '0'],
    correctAnswer: 0,
    explanation: '2 doboz: 2 · 6 = 12. 14 − 12 = 2 tojás marad.'
  },
  {
    id: 'div6g2-q17',
    level: 2,
    questionTypeBadge: 'Tele dobozok',
    figure: <QLoose n={20} caption="20 tojás, dobozonként 6" />,
    question: 'Hány doboz telik meg?',
    options: ['3', '2', '4', '14'],
    correctAnswer: 0,
    explanation: '3 · 6 = 18, a 4 · 6 = 24 már sok. 3 doboz telik meg, 2 tojás marad.'
  },
  {
    id: 'div6g2-q18',
    level: 2,
    questionTypeBadge: 'Van maradék?',
    question: 'Melyik osztásnál NEM marad semmi?',
    options: ['30 : 6', '31 : 6', '28 : 6', '35 : 6'],
    correctAnswer: 0,
    explanation: '5 · 6 = 30, ezért a 30 : 6 maradék nélkül megy. A többinél marad.'
  },
  {
    id: 'div6g2-q19',
    level: 2,
    questionTypeBadge: 'Lépésenként',
    figure: <QChain a="24" b="8" c="?" op1=": 3" op2=": 2" />,
    question: '24 : 3 = 8. Mennyi a 24 : 6?',
    options: ['4', '8', '16', '18'],
    correctAnswer: 0,
    explanation: 'Előbb 3-mal, aztán 2-vel osztunk: 8 : 2 = 4. Tehát 24 : 6 = 4.'
  },
  {
    id: 'div6g2-q20',
    level: 2,
    questionTypeBadge: 'Ellenőrzés',
    question: 'Melyik szorzással ellenőrzöd: 42 : 6 = 7?',
    options: ['7 · 6 = 42', '6 + 7 = 13', '7 · 7 = 49', '6 · 6 = 36'],
    correctAnswer: 0,
    explanation: 'Az eredményt szorozd meg 6-tal: 7 · 6 = 42. Jó!'
  },

  // ----- 3. szint -----
  {
    id: 'div6g2-q21',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    figure: <QPlates q caption="48 szem cseresznye, 6 gyerek" />,
    question: '6 gyerek 48 szem cseresznyét oszt el egyenlően. Mennyi jut egynek?',
    options: ['8', '42', '6', '54'],
    correctAnswer: 0,
    explanation: '48 : 6 = 8, mert 8 · 6 = 48.'
  },
  {
    id: 'div6g2-q22',
    level: 3,
    questionTypeBadge: 'Padok',
    figure: <QBench />,
    question: 'Egy padra 6 gyerek fér. Hány pad kell 36 gyereknek?',
    options: ['6', '30', '42', '5'],
    correctAnswer: 0,
    explanation: '36 : 6 = 6, mert 6 · 6 = 36. 6 pad kell.'
  },
  {
    id: 'div6g2-q23',
    level: 3,
    questionTypeBadge: 'Maradékos osztás',
    figure: <QLoose n={27} caption="27 szál virág, csokronként 6" />,
    question: 'Zsófi csokrokat köt. Hány csokor lesz, és mennyi marad?',
    options: ['4 csokor, marad 3', '3 csokor, marad 9', '5 csokor, marad 2', '4 csokor, marad 1'],
    correctAnswer: 0,
    explanation: '4 · 6 = 24, és 27 − 24 = 3. Tehát 27 = 4 · 6 + 3.'
  },
  {
    id: 'div6g2-q24',
    level: 3,
    questionTypeBadge: 'Két lépés',
    question: 'Anya 30 tojást vett. 6-ot megsütött. A többit 6-os dobozokba teszi. Hány doboz kell?',
    options: ['4', '5', '24', '3'],
    correctAnswer: 0,
    explanation: '30 − 6 = 24 tojás maradt. 24 : 6 = 4 doboz.'
  },
  {
    id: 'div6g2-q25',
    level: 3,
    questionTypeBadge: 'Két lépés',
    question: '2 zacskó cukor van, mindegyikben 18 szem. 6 gyerek osztozik rajta egyenlően. Mennyi jut egynek?',
    options: ['6', '3', '36', '30'],
    correctAnswer: 0,
    explanation: '18 + 18 = 36 szem. 36 : 6 = 6 szem jut egynek.'
  },
  {
    id: 'div6g2-q26',
    level: 3,
    questionTypeBadge: 'Hatoda',
    figure: <QArrows small="?" big="42" />,
    question: 'Mennyi a 42 hatoda?',
    options: ['7', '36', '6', '48'],
    correctAnswer: 0,
    explanation: '42 : 6 = 7, mert 7 · 6 = 42.'
  },
  {
    id: 'div6g2-q27',
    level: 3,
    questionTypeBadge: 'Összehasonlítás',
    question: 'Melyik jel kerül a □ helyére? 48 : 6 □ 7',
    options: ['>', '<', '='],
    correctAnswer: 0,
    explanation: '48 : 6 = 8, és a 8 több, mint 7. Tehát 48 : 6 > 7.'
  },
  {
    id: 'div6g2-q28',
    level: 3,
    questionTypeBadge: 'Legnagyobb maradék',
    figure: <QPacked boxes={4} rest={5} caption="29 tojás" />,
    question: 'Hatosával dobozolsz. Legfeljebb hány tojás maradhat kint?',
    options: ['5', '6', '1', '0'],
    correctAnswer: 0,
    explanation: 'Ha 6 maradna kint, abból még egy doboz lenne. Ezért legfeljebb 5 maradhat.'
  },
  {
    id: 'div6g2-q29',
    level: 3,
    questionTypeBadge: 'Maradékos osztás',
    question: '50 matricát 6-osával csomagolsz. Hány csomag lesz, és mennyi marad?',
    options: ['8 csomag, marad 2', '9 csomag, marad 4', '7 csomag, marad 8', '8 csomag, marad 4'],
    correctAnswer: 0,
    explanation: '8 · 6 = 48, és 50 − 48 = 2. Tehát 50 = 8 · 6 + 2.'
  },
  {
    id: 'div6g2-q30',
    level: 3,
    questionTypeBadge: 'Fejtörő',
    figure: <QArrows small="4" big="?" />,
    question: 'Gondoltam egy számot. Elosztottam 6-tal, és 4 lett. Melyik számra gondoltam?',
    options: ['24', '10', '2', '30'],
    correctAnswer: 0,
    explanation: 'Visszafelé szorzunk: 4 · 6 = 24. Ellenőrzés: 24 : 6 = 4.'
  }
];

export const Div6G2Quiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => (
  <QuizTemplate
    grade={2}
    chapterId="osztas"
    topicId="g2-osztas-6-quiz"
    subtopicId="osztas-6-tal"
    title="5. Osztás 6-tal – Kvíz"
    subtitle="30 feladat 3 szinten: dobozolás és szétosztás 6-tal, hatoda, maradékos osztás, szöveges feladatok."
    badge="2. OSZTÁLY • V. OSZTÁS • KVÍZ"
    questions={DIV6_G2_QUESTIONS}
    cheatSheets={[
      {
        title: 'Osztás 6-tal',
        items: ['6 : 6 = 1, 12 : 6 = 2, 18 : 6 = 3', '24 : 6 = 4, 30 : 6 = 5, 36 : 6 = 6', '42 : 6 = 7, 48 : 6 = 8, 54 : 6 = 9', '60 : 6 = 10, 0 : 6 = 0']
      },
      {
        title: 'Ellenőrizz szorzással!',
        items: ['42 : 6 = 7, mert 7 · 6 = 42', 'A 30 hatoda 5', 'Az 5 hatszorosa 30', '24 : 3 = 8, 8 : 2 = 4, tehát 24 : 6 = 4']
      },
      {
        title: 'Maradék',
        items: ['23 tojás: 3 doboz, marad 5', '23 = 3 · 6 + 5', 'A maradék: 0, 1, 2, 3, 4 vagy 5', 'Ha 6 maradna, még egy doboz lenne!']
      }
    ]}
    onBack={onBack}
    onSwitchToTheory={onSwitchToTheory}
    onSwitchToMatcher={onSwitchToMatcher}
    onSwitchToSorter={onSwitchToSorter}
    initialGameMode={initialGameMode}
    matcherComponent={
      <Div6G2Matcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />
    }
    sorterComponent={
      <Div6G2Sorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />
    }
  />
);

export default Div6G2Quiz;
