import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { EqualPartsG3Matcher } from './EqualPartsG3Matcher';
import { EqualPartsG3Sorter } from './EqualPartsG3Sorter';
import { FONT, INK, PAPER, CAKE_TOP, Pie, Bar, Grid, DiagSquare, Txt, equalAngles, equalCuts, sectorPath } from './EqualPartsG3Parts';

// ---------------------------------------------------------------------------
// Kérdésábrák
// ---------------------------------------------------------------------------
const QFig: React.FC<{ children: React.ReactNode; h?: number }> = ({ children, h = 150 }) => (
  <svg viewBox={`0 0 240 ${h}`} className="w-full max-w-[280px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="238" height={h - 2} rx="10" fill="#f8fafc" stroke="#cbd5e1" />
    {children}
  </svg>
);
const YEL = '#fde68a';

const OnePie: React.FC<{ bounds: number[]; colored?: boolean[]; cake?: boolean }> = ({ bounds, colored, cake }) => (
  <QFig h={150}>
    <Pie cx={120} cy={75} r={60} bounds={bounds} colored={colored} cake={cake} base={YEL} color="#ef4444" />
  </QFig>
);
const OneBar: React.FC<{ cuts: number[]; colored?: boolean[]; dashed?: boolean; red?: boolean; label?: string }> = ({ cuts, colored, dashed, red, label }) => (
  <QFig h={110}>
    <Bar x={20} y={30} w={200} h={46} cuts={red ? [] : cuts} colored={colored} base={YEL} dashed={dashed} />
    {red &&
      cuts.map((c, i) => <line key={i} x1={20 + c * 200} x2={20 + c * 200} y1={20} y2={86} stroke="#dc2626" strokeWidth={3} strokeDasharray="6 4" />)}
    {label && <Txt x={120} y={102} s={13} c="#475569">{label}</Txt>}
  </QFig>
);
const OneGrid: React.FC<{ rows: number; cols: number; dashed?: boolean; choc?: boolean }> = ({ rows, cols, dashed, choc }) => (
  <QFig h={130}>
    <g>
      {choc && <rect x={36} y={21} width={172} height={92} rx={4} fill="#78350f" />}
      <Grid x={40} y={25} w={160} h={84} rows={rows} cols={cols} dashed={dashed} colored={choc ? Array(rows * cols).fill(true) : []} color="#92400e" />
    </g>
  </QFig>
);
/** Betűvel jelölt ábrák egy sorban. */
const Lettered: React.FC<{ items: ((cx: number, cy: number) => React.ReactNode)[]; h?: number }> = ({ items, h = 130 }) => {
  const step = 240 / items.length;
  return (
    <QFig h={h}>
      {items.map((f, i) => (
        <g key={i}>
          {f(step * (i + 0.5), (h - 26) / 2 + 4)}
          <Txt x={step * (i + 0.5)} y={h - 10} s={15}>{String.fromCharCode(65 + i)}</Txt>
        </g>
      ))}
    </QFig>
  );
};
const smallPie = (bounds: number[], colored?: boolean[]) => (cx: number, cy: number) => <Pie cx={cx} cy={cy} r={Math.min(40, 240 / 9)} bounds={bounds} colored={colored} base={YEL} color="#ef4444" />;
const smallBar = (cuts: number[]) => (cx: number, cy: number) => <Bar x={cx - 34} y={cy - 22} w={68} h={44} cuts={cuts} base={YEL} />;
const smallSq = (draw: 'grid' | 'strip' | 'diag' | 'bad') => (cx: number, cy: number) => {
  const s = 46;
  const x = cx - s / 2;
  const y = cy - s / 2;
  if (draw === 'grid') return <Grid x={x} y={y} w={s} h={s} rows={2} cols={2} />;
  if (draw === 'strip') return <Bar x={x} y={y} w={s} h={s} cuts={equalCuts(4)} base={PAPER} />;
  if (draw === 'diag') return <DiagSquare x={x} y={y} s={s} />;
  return <Bar x={x} y={y} w={s} h={s} cuts={[0.15, 0.4, 0.8]} base={PAPER} />;
};
/** Félbehajtás nyíllal. */
const FoldOnce: React.FC<{ times: number }> = ({ times }) => (
  <QFig h={120}>
    <rect x={40} y={22} width={110} height={74} fill={PAPER} stroke={INK} strokeWidth={2.5} />
    <line x1={95} y1={22} x2={95} y2={96} stroke={INK} strokeWidth={2} strokeDasharray="6 4" />
    <path d="M 65 42 Q 95 22 125 42" fill="none" stroke="#2563eb" strokeWidth={3} />
    <path d="M 125 42 l -10 -2 m 10 2 l -4 -9" stroke="#2563eb" strokeWidth={3} strokeLinecap="round" />
    <Txt x={195} y={58} s={22} c="#1d4ed8">{times} ×</Txt>
    <Txt x={195} y={80} s={12} c="#475569">félbe</Txt>
    <Txt x={120} y={113} s={12} c="#475569">Aztán kinyitod. Hány rész?</Txt>
  </QFig>
);

const BOUNDS_UNEQ3 = [0, 160, 250, 360];
const BOUNDS_UNEQ4 = [10, 70, 190, 260, 370];

// ---------------------------------------------------------------------------
// Kérdések
// ---------------------------------------------------------------------------
export const EQUAL_PARTS_G3_QUESTIONS: QuizQuestion[] = [
  // ----- 1. szint -----
  {
    id: 'eqp-g3-q1',
    level: 1,
    questionTypeBadge: 'Hány rész?',
    figure: <OnePie bounds={equalAngles(6)} cake />,
    question: 'Hány egyenlő részre vágtuk a tortát?',
    options: ['6', '5', '7', '3'],
    correctAnswer: 0,
    explanation: 'Számold meg a szeleteket körbe: 1, 2, 3, 4, 5, 6. A torta 6 egyenlő részből áll.'
  },
  {
    id: 'eqp-g3-q2',
    level: 1,
    questionTypeBadge: 'Hány rész?',
    figure: <OneBar cuts={equalCuts(5)} />,
    question: 'Hány egyenlő részre osztottuk a csíkot?',
    options: ['5', '4', '6', '10'],
    correctAnswer: 0,
    explanation: 'A részeket számold, ne a vonalakat! 4 vonal van, de 5 rész.'
  },
  {
    id: 'eqp-g3-q3',
    level: 1,
    questionTypeBadge: 'Egyenlő részek',
    figure: <OnePie bounds={BOUNDS_UNEQ3} />,
    question: 'Egyenlő részekre vágtuk a pizzát?',
    options: ['Nem, a részek nem egyformák.', 'Igen, mert 3 része van.', 'Igen, mert kerek.', 'Igen, minden rész ugyanakkora.'],
    correctAnswer: 0,
    explanation: 'Az egyik szelet sokkal nagyobb, mint a többi. Ezek nem egyenlő részek.'
  },
  {
    id: 'eqp-g3-q4',
    level: 1,
    questionTypeBadge: 'Egyenlő részek',
    figure: <Lettered items={[smallPie(BOUNDS_UNEQ4), smallPie([0, 100, 200, 360]), smallPie(equalAngles(3)), smallPie([0, 60, 180, 360])]} />,
    question: 'Melyik kört osztottuk egyenlő részekre?',
    options: ['C', 'A', 'B', 'D'],
    correctAnswer: 0,
    explanation: 'A C kör 3 része ugyanakkora. A többi körben van nagy és kicsi rész is.'
  },
  {
    id: 'eqp-g3-q5',
    level: 1,
    questionTypeBadge: 'Hajtogatás',
    figure: <FoldOnce times={1} />,
    question: 'Egyszer félbehajtod a lapot, aztán kinyitod. Hány egyenlő rész lesz?',
    options: ['2', '1', '3', '4'],
    correctAnswer: 0,
    explanation: 'Félbehajtva a lap 2 egyenlő részre oszlik. A hajtásvonal pont középen van.'
  },
  {
    id: 'eqp-g3-q6',
    level: 1,
    questionTypeBadge: 'Hajtogatás',
    figure: <OneGrid rows={2} cols={4} dashed />,
    question: 'Ezt a lapot kinyitottuk. Hány egyenlő rész van rajta?',
    options: ['8', '6', '4', '7'],
    correctAnswer: 0,
    explanation: 'Felül 4 rész, alul is 4 rész. 4 + 4 = 8 egyenlő rész.'
  },
  {
    id: 'eqp-g3-q7',
    level: 1,
    questionTypeBadge: 'A rész neve',
    figure: <OnePie bounds={equalAngles(4)} colored={[true]} />,
    question: '4 egyenlő részre vágtuk. Mi a neve egy résznek?',
    options: ['1 negyed', '1 harmad', '1 ketted', '1 ötöd'],
    correctAnswer: 0,
    explanation: '4 egyenlő rész → egy rész 1 negyed.'
  },
  {
    id: 'eqp-g3-q8',
    level: 1,
    questionTypeBadge: 'A rész neve',
    figure: (
      <QFig h={130}>
        <path d="M 110 30 A 42 42 0 0 0 110 114 Z" fill="#ef4444" stroke={INK} strokeWidth={2.5} />
        <path d="M 102 36 A 36 36 0 0 0 102 108 Z" fill="#fef9c3" />
        <path d="M 130 30 A 42 42 0 0 1 130 114 Z" fill="#ef4444" stroke={INK} strokeWidth={2.5} />
        <path d="M 138 36 A 36 36 0 0 1 138 108 Z" fill="#fef9c3" />
        <path d="M 110 30 q 2 -12 10 -16" fill="none" stroke="#78350f" strokeWidth={3} strokeLinecap="round" />
      </QFig>
    ),
    question: 'Az almát 2 egyenlő részre vágtuk. Hogy hívjuk az egyik részét?',
    options: ['fél', 'negyed', 'harmad', 'egész'],
    correctAnswer: 0,
    explanation: '2 egyenlő rész → egy rész 1 ketted, más néven fél alma.'
  },
  {
    id: 'eqp-g3-q9',
    level: 1,
    questionTypeBadge: 'A rész neve',
    figure: <OneBar cuts={equalCuts(3)} colored={[true]} />,
    question: 'A csíkot 3 egyenlő részre osztottuk. Mi a neve egy résznek?',
    options: ['1 harmad', '1 hatod', '1 negyed', '1 ketted'],
    correctAnswer: 0,
    explanation: '3 egyenlő rész → egy rész 1 harmad.'
  },
  {
    id: 'eqp-g3-q10',
    level: 1,
    questionTypeBadge: 'Szeletek nagysága',
    figure: <Lettered items={[(cx, cy) => <Pie cx={cx} cy={cy} r={44} bounds={equalAngles(2)} cake />, (cx, cy) => <Pie cx={cx} cy={cy} r={44} bounds={equalAngles(8)} cake />]} />,
    question: 'Két ugyanakkora tortát vágtunk fel. Melyikből kapsz nagyobb szeletet?',
    options: ['az A-ból', 'a B-ből', 'egyformák a szeletek', 'nem lehet tudni'],
    correctAnswer: 0,
    explanation: 'Az A tortát csak 2 részre vágtuk, a B-t 8 részre. Kevesebb rész → nagyobb szelet.'
  },
  // ----- 2. szint -----
  {
    id: 'eqp-g3-q11',
    level: 2,
    questionTypeBadge: 'Hány rész?',
    figure: <OnePie bounds={equalAngles(8)} cake />,
    question: 'Hány egyenlő szeletre vágtuk a tortát?',
    options: ['8', '6', '7', '4'],
    correctAnswer: 0,
    explanation: 'Számold körbe a szeleteket! Jelöld meg, honnan indultál. 8 szelet van.'
  },
  {
    id: 'eqp-g3-q12',
    level: 2,
    questionTypeBadge: 'Hány rész?',
    figure: <OneGrid rows={2} cols={3} choc />,
    question: 'Hány egyenlő darabból áll ez a csokitábla?',
    options: ['6', '3', '5', '4'],
    correctAnswer: 0,
    explanation: '2 sor, mindegyikben 3 darab. 3 + 3 = 6 darab.'
  },
  {
    id: 'eqp-g3-q13',
    level: 2,
    questionTypeBadge: 'Egyenlő részek',
    figure: <Lettered items={[smallBar([0.2, 0.55, 0.75]), smallBar(equalCuts(4)), smallBar(equalCuts(3))]} />,
    question: 'Melyik csíkot osztottuk 4 egyenlő részre?',
    options: ['B', 'A', 'C', 'egyiket sem'],
    correctAnswer: 0,
    explanation: 'Az A csíknak 4 része van, de nem egyformák. A C csík 3 részből áll. Csak a B jó.'
  },
  {
    id: 'eqp-g3-q14',
    level: 2,
    questionTypeBadge: 'Hajtogatás',
    figure: <FoldOnce times={2} />,
    question: 'Kétszer félbehajtod a lapot, aztán kinyitod. Hány egyenlő rész lesz?',
    options: ['4', '2', '3', '6'],
    correctAnswer: 0,
    explanation: '1. hajtás: 2 rész. 2. hajtás: kétszer annyi, 4 rész.'
  },
  {
    id: 'eqp-g3-q15',
    level: 2,
    questionTypeBadge: 'Hajtogatás',
    figure: <FoldOnce times={3} />,
    question: 'Háromszor félbehajtod a lapot, aztán kinyitod. Hány egyenlő rész lesz?',
    options: ['8', '6', '3', '9'],
    correctAnswer: 0,
    explanation: 'Minden hajtás kétszer annyi részt ad: 2, aztán 4, aztán 8.'
  },
  {
    id: 'eqp-g3-q16',
    level: 2,
    questionTypeBadge: 'Vágás',
    figure: <OneBar cuts={equalCuts(5)} red label="A piros vonalaknál vágod el." />,
    question: 'A szalagot 4 helyen vágod el. Hány darab lesz?',
    options: ['5', '4', '3', '8'],
    correctAnswer: 0,
    explanation: '1 vágás 2 darabot ad. Minden újabb vágás még 1 darabot. 4 vágás → 5 darab.'
  },
  {
    id: 'eqp-g3-q17',
    level: 2,
    questionTypeBadge: 'Egyenlő részek',
    figure: <Lettered items={[smallSq('grid'), smallSq('bad'), smallSq('strip'), smallSq('diag')]} h={110} />,
    question: 'Hány négyzetet osztottunk 4 egyenlő részre?',
    options: ['3', '4', '1', '2'],
    correctAnswer: 0,
    explanation: 'Az A, a C és a D négyzet 4 egyenlő részből áll. A B négyzet csíkjai nem egyformák.'
  },
  {
    id: 'eqp-g3-q18',
    level: 2,
    questionTypeBadge: 'Szeletek nagysága',
    figure: <Lettered items={[(cx, cy) => <Pie cx={cx} cy={cy} r={44} bounds={equalAngles(6)} cake />, (cx, cy) => <Pie cx={cx} cy={cy} r={44} bounds={equalAngles(3)} cake />]} />,
    question: 'Két ugyanakkora tortát vágtunk fel. Melyiknek nagyobb egy szelete?',
    options: ['a B-nek, mert kevesebb részre vágtuk', 'az A-nak, mert több részre vágtuk', 'egyformák', 'az A-nak, mert a 6 több, mint a 3'],
    correctAnswer: 0,
    explanation: 'A B tortát 3 részre, az A-t 6 részre vágtuk. Minél több a rész, annál kisebb egy szelet.'
  },
  {
    id: 'eqp-g3-q19',
    level: 2,
    questionTypeBadge: 'A rész neve',
    figure: <OnePie bounds={equalAngles(6)} colored={[true]} />,
    question: 'Mi a neve a piros résznek?',
    options: ['1 hatod', '1 ötöd', '1 nyolcad', '1 harmad'],
    correctAnswer: 0,
    explanation: 'A kört 6 egyenlő részre osztottuk. Egy rész: 1 hatod.'
  },
  {
    id: 'eqp-g3-q20',
    level: 2,
    questionTypeBadge: 'A rész neve',
    question: 'Egy szelet a tortából 1 nyolcad. Hány egyenlő részre vágtuk a tortát?',
    options: ['8', '4', '1', '10'],
    correctAnswer: 0,
    explanation: 'Nyolcad = 8 egyenlő rész egyike. A tortát 8 részre vágtuk.'
  },
  // ----- 3. szint -----
  {
    id: 'eqp-g3-q21',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    figure: (
      <QFig h={150}>
        <Pie cx={120} cy={75} r={60} bounds={equalAngles(8).slice(3)} base={CAKE_TOP} />
        {[0, 1, 2].map((i) => (
          <path key={i} d={sectorPath(120, 75, 60, i * 45, (i + 1) * 45)} fill="none" stroke="#94a3b8" strokeWidth={2} strokeDasharray="5 4" />
        ))}
      </QFig>
    ),
    question: 'A tortát 8 egyenlő szeletre vágtuk. 3 szelet elfogyott. Hány szelet maradt?',
    options: ['5', '3', '8', '11'],
    correctAnswer: 0,
    explanation: '8 szelet volt, 3 elfogyott. 8 − 3 = 5 szelet maradt.'
  },
  {
    id: 'eqp-g3-q22',
    level: 3,
    questionTypeBadge: 'A rész neve',
    figure: <OnePie bounds={[0, 360]} />,
    question: '4 gyerek egyenlően osztozik egy pizzán. Hány részre vágjuk? Mi a neve egy gyerek részének?',
    options: ['4 részre, 1 negyed', '4 részre, 1 ketted', '2 részre, 1 ketted', '8 részre, 1 nyolcad'],
    correctAnswer: 0,
    explanation: '4 gyerek → 4 egyenlő rész. Egy rész neve: 1 negyed.'
  },
  {
    id: 'eqp-g3-q23',
    level: 3,
    questionTypeBadge: 'Hajtogatás',
    figure: <OneGrid rows={2} cols={2} dashed />,
    question: 'Hányszor hajtottuk félbe a lapot, hogy kinyitva ez a 4 egyenlő rész lett?',
    options: ['2-szer', '4-szer', '1-szer', '3-szor'],
    correctAnswer: 0,
    explanation: '1-szer félbe: 2 rész. 2-szer félbe: 4 rész.'
  },
  {
    id: 'eqp-g3-q24',
    level: 3,
    questionTypeBadge: 'Hajtogatás',
    question: 'Hányszor kell félbehajtani a lapot, hogy kinyitva 8 egyenlő rész legyen?',
    options: ['3-szor', '8-szor', '4-szer', '2-szer'],
    correctAnswer: 0,
    explanation: '1-szer: 2 rész, 2-szer: 4 rész, 3-szor: 8 rész.'
  },
  {
    id: 'eqp-g3-q25',
    level: 3,
    questionTypeBadge: 'A rész neve',
    figure: <OneGrid rows={2} cols={5} choc />,
    question: 'Hány egyenlő darabra törheted ezt a csokit? Mi a neve egy darabnak?',
    options: ['10 darab, 1 tized', '7 darab, 1 hatod', '10 darab, 1 ötöd', '5 darab, 1 ötöd'],
    correctAnswer: 0,
    explanation: '2 sor, soronként 5 darab: 5 + 5 = 10. 10 egyenlő rész → egy darab 1 tized.'
  },
  {
    id: 'eqp-g3-q26',
    level: 3,
    questionTypeBadge: 'Vágás',
    figure: <OneBar cuts={equalCuts(4)} red label="3 vágás" />,
    question: 'A kalácsot 3 vágással egyenlő szeletekre vágtad. Hány szelet lett? Mi a neve egy szeletnek?',
    options: ['4 szelet, 1 negyed', '3 szelet, 1 harmad', '4 szelet, 1 harmad', '6 szelet, 1 hatod'],
    correctAnswer: 0,
    explanation: '3 vágás → 4 szelet. 4 egyenlő rész → egy szelet 1 negyed.'
  },
  {
    id: 'eqp-g3-q27',
    level: 3,
    questionTypeBadge: 'Szeletek nagysága',
    question: 'Lili egy tortát 6 egyenlő szeletre vágott. Bence ugyanakkora tortát 4 egyenlő szeletre. Kinek a szelete nagyobb?',
    options: ['Bencéé, mert kevesebb részre vágta', 'Lilié, mert több részre vágta', 'egyformák', 'nem lehet tudni'],
    correctAnswer: 0,
    explanation: 'Ugyanakkora a két torta. Bence kevesebb részre vágta, ezért az ő szelete nagyobb.'
  },
  {
    id: 'eqp-g3-q28',
    level: 3,
    questionTypeBadge: 'Egyenlő részek',
    figure: <OnePie bounds={[0, 120, 180, 300, 360]} />,
    question: '4 gyerek így osztozna a pizzán. Igazságos így?',
    options: ['Nem, mert a szeletek nem egyenlők.', 'Igen, mert 4 szelet van.', 'Igen, mert mindenki kap egyet.', 'Nem, mert 4 szelet kevés.'],
    correctAnswer: 0,
    explanation: 'Két szelet nagy, kettő kicsi. Igazságos csak akkor, ha 4 egyenlő részre vágjuk.'
  },
  {
    id: 'eqp-g3-q29',
    level: 3,
    questionTypeBadge: 'Vágás',
    figure: <OneBar cuts={[]} label="6 egyenlő darab kell. Hány vágás?" />,
    question: 'A szalagot 6 egyenlő darabra akarod vágni. Hány vágás kell?',
    options: ['5', '6', '7', '3'],
    correctAnswer: 0,
    explanation: 'Az utolsó darab vágás nélkül marad. 6 darabhoz 5 vágás kell.'
  },
  {
    id: 'eqp-g3-q30',
    level: 3,
    questionTypeBadge: 'A rész neve',
    figure: (
      <QFig h={150}>
        <Pie cx={120} cy={75} r={60} bounds={[0, 360]} cake />
        <line x1={120} y1={10} x2={120} y2={140} stroke="#dc2626" strokeWidth={3} strokeDasharray="7 5" />
        <Txt x={200} y={80} s={13} c="#b91c1c">1. vágás</Txt>
      </QFig>
    ),
    question: 'A tortát félbevágod. Aztán mindkét felét újra félbe. Hány egyenlő szelet lesz? Mi a neve egy szeletnek?',
    options: ['4 szelet, 1 negyed', '3 szelet, 1 harmad', '4 szelet, 1 ketted', '2 szelet, 1 ketted'],
    correctAnswer: 0,
    explanation: 'Félbe: 2 rész. Mindkettőt félbe: 2 + 2 = 4 rész. 4 egyenlő rész → 1 negyed.'
  }
];

export const EqualPartsG3Quiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => {
  return (
    <QuizTemplate
      grade={3}
      chapterId="tortes-szamok"
      topicId="g3-frac-reszek-quiz"
      subtopicId="bevezetes"
      title="1. Egyenlő részekre osztás – Kvíz"
      subtitle="30 feladat 3 szinten: egyenlő részek, hány rész, hajtogatás, a rész neve."
      badge="3. OSZTÁLY • XIV. ISMERKEDÉS A TÖRTEKKEL • KVÍZ"
      questions={EQUAL_PARTS_G3_QUESTIONS}
      cheatSheets={[
        {
          title: 'Egyenlő részek',
          items: ['Egyenlő részek: mind ugyanakkora.', 'Ha van nagy és kicsi rész is, nem egyenlők.', 'A részeket számold, ne a vágásokat!']
        },
        {
          title: 'Hajtogatás',
          items: ['1-szer félbe: 2 rész.', '2-szer félbe: 4 rész.', '3-szor félbe: 8 rész.']
        },
        {
          title: 'A rész neve',
          items: ['2 egyenlő rész: 1 ketted (fél).', '3: 1 harmad, 4: 1 negyed, 5: 1 ötöd.', '6: 1 hatod, 8: 1 nyolcad, 10: 1 tized.']
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={<EqualPartsG3Matcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />}
      sorterComponent={<EqualPartsG3Sorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />}
    />
  );
};

export default EqualPartsG3Quiz;
