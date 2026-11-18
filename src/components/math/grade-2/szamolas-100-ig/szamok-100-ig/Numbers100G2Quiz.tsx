import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { Numbers100G2Matcher } from './Numbers100G2Matcher';
import { Numbers100G2Sorter } from './Numbers100G2Sorter';
import {
  N100_FONT,
  N100_COLORS,
  RodsPart,
  rodsWidth,
  NumberLinePart,
  LineMark,
  HundredChartPart,
  CoinPart,
  PlaceTablePart
} from './Numbers100G2Parts';

// ---------------------------------------------------------------------------
// Kérdésábrák
// ---------------------------------------------------------------------------
const UNK = N100_COLORS.unknown;

const QFig: React.FC<{ children: React.ReactNode; h?: number }> = ({ children, h = 130 }) => (
  <svg
    viewBox={`0 0 260 ${h}`}
    className="w-full max-w-[280px] h-auto mx-auto"
    xmlns="http://www.w3.org/2000/svg"
    fontFamily={N100_FONT}
  >
    <rect x="1" y="1" width="258" height={h - 2} rx="12" fill="#f8fafc" stroke="#cbd5e1" />
    {children}
  </svg>
);

const RodsFig: React.FC<{ tens: number; ones: number; caption?: string }> = ({ tens, ones, caption }) => {
  const u = 9;
  const w = rodsWidth(tens, ones, u);
  return (
    <QFig h={caption ? 128 : 112}>
      <RodsPart x={130 - w / 2} y={12} tens={tens} ones={ones} u={u} />
      {caption && (
        <text x="130" y="120" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#334155">
          {caption}
        </text>
      )}
    </QFig>
  );
};

const TwoRodsFig: React.FC<{ a: [number, number]; b: [number, number] }> = ({ a, b }) => {
  const u = 7;
  const wa = rodsWidth(a[0], a[1], u);
  const wb = rodsWidth(b[0], b[1], u);
  return (
    <QFig h={112}>
      <line x1="130" y1="10" x2="130" y2="102" stroke="#cbd5e1" strokeWidth="2" />
      <RodsPart x={65 - wa / 2} y={14} tens={a[0]} ones={a[1]} u={u} />
      <RodsPart x={195 - wb / 2} y={14} tens={b[0]} ones={b[1]} u={u} />
      <text x="65" y="104" textAnchor="middle" fontSize="16" fontWeight="900" fill="#1d4ed8">A</text>
      <text x="195" y="104" textAnchor="middle" fontSize="16" fontWeight="900" fill="#1d4ed8">B</text>
    </QFig>
  );
};

const LineFig: React.FC<{
  from: number;
  to: number;
  marks?: LineMark[];
  extraLabels?: number[];
  labelEvery?: number;
}> = ({ from, to, marks = [], extraLabels = [], labelEvery = 10 }) => (
  <QFig h={100}>
    <NumberLinePart x={18} y={60} width={214} from={from} to={to} marks={marks} extraLabels={extraLabels} labelEvery={labelEvery} fontSize={11} />
  </QFig>
);

const ChartFig: React.FC<{
  firstRow: number;
  rowCount: number;
  highlight?: Record<number, string>;
  hidden?: number[];
}> = ({ firstRow, rowCount, highlight, hidden }) => (
  <QFig h={rowCount * 24 + 20}>
    <HundredChartPart x={10} y={10} cell={24} firstRow={firstRow} rowCount={rowCount} highlight={highlight} hidden={hidden} fontSize={11} />
  </QFig>
);

const CoinsFig: React.FC<{ coins: (10 | 20 | 50 | 100)[]; caption?: string }> = ({ coins, caption }) => {
  const step = coins.length > 6 ? 28 : 36;
  const x0 = 130 - ((coins.length - 1) * step) / 2;
  return (
    <QFig h={caption ? 96 : 76}>
      {coins.map((v, i) => (
        <CoinPart key={i} cx={x0 + i * step} cy={38} value={v} r={coins.length > 6 ? 12 : 15} />
      ))}
      {caption && (
        <text x="130" y="84" textAnchor="middle" fontSize="15" fontWeight="900" fill={UNK}>
          {caption}
        </text>
      )}
    </QFig>
  );
};

const CardsFig: React.FC<{ items: string[] }> = ({ items }) => {
  const w = 50;
  const gap = 10;
  const x0 = 130 - (items.length * w + (items.length - 1) * gap) / 2;
  return (
    <QFig h={74}>
      {items.map((t, i) => (
        <g key={i}>
          <rect x={x0 + i * (w + gap)} y={14} width={w} height={46} rx={8} fill="#dbeafe" stroke="#2563eb" strokeWidth="2" />
          <text x={x0 + i * (w + gap) + w / 2} y={45} textAnchor="middle" fontSize="21" fontWeight="900" fill="#1e3a8a">
            {t}
          </text>
        </g>
      ))}
    </QFig>
  );
};

const PlaceFig: React.FC<{ tens: string; ones: string }> = ({ tens, ones }) => (
  <QFig h={76}>
    <PlaceTablePart x={78} y={11} tens={tens} ones={ones} w={52} />
  </QFig>
);

// ---------------------------------------------------------------------------
// Kérdések
// ---------------------------------------------------------------------------
export const NUMBERS100_G2_QUESTIONS: QuizQuestion[] = [
  // ----- 1. szint -----
  {
    id: 'n100g2-q1',
    level: 1,
    questionTypeBadge: 'Rudak és kockák',
    figure: <RodsFig tens={6} ones={3} caption="1 rúd = 10, 1 kocka = 1" />,
    question: 'Melyik számot raktuk ki?',
    options: ['63', '36', '9', '53'],
    correctAnswer: 0,
    explanation: '6 rúd = 60, és még 3 kocka. 60 + 3 = 63.'
  },
  {
    id: 'n100g2-q2',
    level: 1,
    questionTypeBadge: 'Számolj tízesével',
    figure: <RodsFig tens={9} ones={0} />,
    question: 'Egy rúdban 10 kocka van. Hány kocka van 9 rúdban?',
    options: ['90', '9', '19', '99'],
    correctAnswer: 0,
    explanation: 'Tízesével számolunk: 10, 20, 30 … 90. Tehát 9 tízes = 90.'
  },
  {
    id: 'n100g2-q3',
    level: 1,
    questionTypeBadge: 'Képről a szám',
    figure: <RodsFig tens={7} ones={8} />,
    question: 'Melyik szám ez?',
    options: ['78', '87', '15', '68'],
    correctAnswer: 0,
    explanation: '7 rúd = 70, és 8 kocka. 70 + 8 = 78.'
  },
  {
    id: 'n100g2-q4',
    level: 1,
    questionTypeBadge: 'Tízes és egyes',
    question: 'Hány tízes és hány egyes van az 54-ben?',
    options: ['5 tízes és 4 egyes', '4 tízes és 5 egyes', '54 tízes', '5 tízes és 0 egyes'],
    correctAnswer: 0,
    explanation: 'Az első számjegy a tízes: 5. Az utolsó az egyes: 4. 54 = 50 + 4.'
  },
  {
    id: 'n100g2-q5',
    level: 1,
    questionTypeBadge: 'Kerek tízes',
    question: 'Melyik szám áll 6 tízesből és 0 egyesből?',
    options: ['60', '6', '66', '16'],
    correctAnswer: 0,
    explanation: '6 tízes = 60. A 0 egyes azt jelenti, hogy nincs több kocka.'
  },
  {
    id: 'n100g2-q6',
    level: 1,
    questionTypeBadge: 'Egyes szomszédok',
    figure: (
      <LineFig
        from={74}
        to={84}
        labelEvery={100}
        marks={[
          { value: 78, label: '?', color: '#16a34a' },
          { value: 79, label: '79', color: UNK, arrow: true },
          { value: 80, label: '?', color: '#16a34a' }
        ]}
      />
    ),
    question: 'Mik a 79 egyes szomszédai?',
    options: ['78 és 80', '70 és 80', '77 és 81', '78 és 79'],
    correctAnswer: 0,
    explanation: 'Az egyes szomszéd 1-gyel kisebb és 1-gyel nagyobb: 78 < 79 < 80.'
  },
  {
    id: 'n100g2-q7',
    level: 1,
    questionTypeBadge: 'Pénz',
    figure: <CoinsFig coins={[10, 10, 10, 10, 10, 10, 10, 10]} />,
    question: 'Hány forint van itt?',
    options: ['80 Ft', '8 Ft', '18 Ft', '70 Ft'],
    correctAnswer: 0,
    explanation: '8 darab 10 forintos van. Tízesével: 10, 20 … 80. Ez 80 Ft.'
  },
  {
    id: 'n100g2-q8',
    level: 1,
    questionTypeBadge: 'Százas tábla',
    figure: <ChartFig firstRow={6} rowCount={2} hidden={[76]} />,
    question: 'Melyik szám bújt el a ? helyén?',
    options: ['76', '67', '75', '77'],
    correctAnswer: 0,
    explanation: 'A 75 után a 76 jön, utána a 77. Tehát a ? helyén 76 áll.'
  },
  {
    id: 'n100g2-q9',
    level: 1,
    questionTypeBadge: 'Összehasonlítás',
    question: 'Melyik jel kerül a □ helyére?  58 □ 85',
    options: ['<', '>', '='],
    correctAnswer: 0,
    explanation: 'Nézd a tízeseket! 5 tízes kevesebb, mint 8 tízes. Tehát 58 < 85.'
  },
  {
    id: 'n100g2-q10',
    level: 1,
    questionTypeBadge: 'Számírás',
    question: 'Hogyan írjuk le számjegyekkel: hetvenkettő?',
    options: ['72', '27', '702', '70'],
    correctAnswer: 0,
    explanation: 'Hetven = 7 tízes, kettő = 2 egyes. 70 + 2 = 72.'
  },

  // ----- 2. szint -----
  {
    id: 'n100g2-q11',
    level: 2,
    questionTypeBadge: 'Számegyenes',
    figure: <LineFig from={60} to={80} marks={[{ value: 74, label: '?', arrow: true }]} />,
    question: 'Melyik számra mutat a nyíl?',
    options: ['74', '73', '64', '76'],
    correctAnswer: 0,
    explanation: 'A nyíl a 70 után van. Számolj tovább: 71, 72, 73, 74.'
  },
  {
    id: 'n100g2-q12',
    level: 2,
    questionTypeBadge: 'Tízes szomszédok',
    figure: (
      <LineFig
        from={58}
        to={72}
        labelEvery={100}
        marks={[
          { value: 60, label: '?', color: '#ea580c' },
          { value: 63, label: '63', color: UNK, arrow: true },
          { value: 70, label: '?', color: '#ea580c' }
        ]}
      />
    ),
    question: 'Mik a 63 tízes szomszédai?',
    options: ['60 és 70', '62 és 64', '50 és 60', '60 és 63'],
    correctAnswer: 0,
    explanation: 'A tízes szomszédok a legközelebbi kerek tízesek: 60 < 63 < 70.'
  },
  {
    id: 'n100g2-q13',
    level: 2,
    questionTypeBadge: 'Kerek tízes szomszédai',
    question: 'Mik a 90 tízes szomszédai?',
    options: ['80 és 100', '89 és 91', '80 és 90', '90 és 100'],
    correctAnswer: 0,
    explanation: 'A 90 maga kerek tízes. Előtte a 80, utána a 100 jön: 80 < 90 < 100.'
  },
  {
    id: 'n100g2-q14',
    level: 2,
    questionTypeBadge: 'Lefelé a táblán',
    figure: <ChartFig firstRow={5} rowCount={2} highlight={{ 57: '#fde047' }} hidden={[67]} />,
    question: 'A ? az 57 alatt van. Melyik szám az?',
    options: ['67', '58', '56', '77'],
    correctAnswer: 0,
    explanation: 'Lefelé lépve 10-zel nő a szám: 57 + 10 = 67.'
  },
  {
    id: 'n100g2-q15',
    level: 2,
    questionTypeBadge: 'Páros szám',
    question: 'Melyik szám páros?',
    options: ['86', '75', '93', '61'],
    correctAnswer: 0,
    explanation: 'Az utolsó számjegyet nézd! A 86 vége 6, és a 6 páros.'
  },
  {
    id: 'n100g2-q16',
    level: 2,
    questionTypeBadge: 'Legnagyobb szám',
    figure: <CardsFig items={['89', '98', '91', '79']} />,
    question: 'Melyik a legnagyobb szám?',
    options: ['98', '91', '89', '79'],
    correctAnswer: 0,
    explanation: 'A 98-ban és a 91-ben is 9 tízes van. Az egyesek: 8 > 1, tehát a 98 a legnagyobb.'
  },
  {
    id: 'n100g2-q17',
    level: 2,
    questionTypeBadge: 'Vegyes érmék',
    figure: <CoinsFig coins={[50, 20, 10, 10]} />,
    question: 'Hány forint van itt összesen?',
    options: ['90 Ft', '4 Ft', '80 Ft', '100 Ft'],
    correctAnswer: 0,
    explanation: '50 + 20 = 70, 70 + 10 = 80, 80 + 10 = 90. Ez 90 Ft.'
  },
  {
    id: 'n100g2-q18',
    level: 2,
    questionTypeBadge: 'Melyik a több?',
    figure: <TwoRodsFig a={[5, 9]} b={[6, 1]} />,
    question: 'Melyik képen van több kocka?',
    options: ['A B képen', 'Az A képen', 'Mindkettőn ugyanannyi'],
    correctAnswer: 0,
    explanation: 'A = 59, B = 61. A B-ben 6 tízes van, az A-ban csak 5. Tehát a B a több.'
  },
  {
    id: 'n100g2-q19',
    level: 2,
    questionTypeBadge: 'Nyitott mondat',
    figure: <LineFig from={65} to={71} labelEvery={100} extraLabels={[66, 67, 68, 69, 70]} marks={[{ value: 67, color: '#2563eb' }, { value: 69, color: '#2563eb' }]} />,
    question: 'Melyik szám illik a □ helyére?  67 < □ < 69',
    options: ['68', '66', '70', '67'],
    correctAnswer: 0,
    explanation: 'Nagyobb a 67-nél és kisebb a 69-nél. Csak a 68 van közöttük.'
  },
  {
    id: 'n100g2-q20',
    level: 2,
    questionTypeBadge: 'Helyiérték-táblázat',
    figure: <PlaceFig tens="8" ones="3" />,
    question: 'Melyik szám áll a táblázatban?',
    options: ['83', '38', '11', '803'],
    correctAnswer: 0,
    explanation: '8 tízes és 3 egyes: 80 + 3 = 83.'
  },

  // ----- 3. szint -----
  {
    id: 'n100g2-q21',
    level: 3,
    questionTypeBadge: 'Csere: 10 egyes = 1 tízes',
    figure: <RodsFig tens={5} ones={14} caption="5 rúd és 14 kocka" />,
    question: 'Melyik szám ez?',
    options: ['64', '514', '54', '19'],
    correctAnswer: 0,
    explanation: '14 kocka = 1 tízes + 4 egyes. Így 6 tízes és 4 egyes van: 64.'
  },
  {
    id: 'n100g2-q22',
    level: 3,
    questionTypeBadge: 'Gondoltam egy számra',
    figure: <LineFig from={80} to={90} marks={[{ value: 80, color: '#ea580c' }, { value: 90, color: '#ea580c' }]} />,
    question: 'Tízes szomszédai a 80 és a 90. Az egyesek helyén 5 áll. Melyik szám ez?',
    options: ['85', '58', '80', '95'],
    correctAnswer: 0,
    explanation: '80 és 90 között a 8 tízes számok vannak. 5 egyessel: 85.'
  },
  {
    id: 'n100g2-q23',
    level: 3,
    questionTypeBadge: 'Számjegyek összege',
    question: 'A szám 60 és 70 között van. A két számjegye együtt 10. Melyik ez?',
    options: ['64', '46', '55', '73'],
    correctAnswer: 0,
    explanation: '60 és 70 között 6 tízes van. 6 + 4 = 10, tehát a szám 64.'
  },
  {
    id: 'n100g2-q24',
    level: 3,
    questionTypeBadge: 'Két lépés a táblán',
    figure: <ChartFig firstRow={4} rowCount={3} highlight={{ 45: '#fde047' }} />,
    question: 'Indulj a 45-ről! Lépj 2 mezőt lefelé, aztán 1 mezőt jobbra! Hová érsz?',
    options: ['66', '65', '56', '47'],
    correctAnswer: 0,
    explanation: 'Lefelé: 45 → 55 → 65. Jobbra 1: 65 → 66.'
  },
  {
    id: 'n100g2-q25',
    level: 3,
    questionTypeBadge: 'Hány szám van közte?',
    figure: <LineFig from={85} to={93} labelEvery={100} extraLabels={[86, 92]} marks={[{ value: 86, color: '#2563eb' }, { value: 92, color: '#2563eb' }]} />,
    question: 'Hány szám van a 86 és a 92 között?',
    options: ['5', '6', '7', '4'],
    correctAnswer: 0,
    explanation: 'Közöttük: 87, 88, 89, 90, 91. Ez 5 szám. A 86 és a 92 nem számít.'
  },
  {
    id: 'n100g2-q26',
    level: 3,
    questionTypeBadge: 'Növekvő sorrend',
    question: 'Melyik sor van növekvő sorrendben?',
    options: ['59, 65, 71, 80', '65, 59, 71, 80', '59, 71, 65, 80', '80, 71, 65, 59'],
    correctAnswer: 0,
    explanation: 'Növekvő: a legkisebbtől a legnagyobbig. 59 < 65 < 71 < 80.'
  },
  {
    id: 'n100g2-q27',
    level: 3,
    questionTypeBadge: 'Mennyi hiányzik?',
    figure: <CoinsFig coins={[50, 20]} caption="+ ? = 100 Ft" />,
    question: 'Van 50 Ft-od és 20 Ft-od. Mennyi hiányzik a 100 Ft-hoz?',
    options: ['30 Ft', '70 Ft', '20 Ft', '40 Ft'],
    correctAnswer: 0,
    explanation: '50 + 20 = 70. A 70-től a 100-ig: 80, 90, 100. Ez 3 tízes, vagyis 30 Ft.'
  },
  {
    id: 'n100g2-q28',
    level: 3,
    questionTypeBadge: '10-zel nagyobb',
    figure: <ChartFig firstRow={6} rowCount={2} highlight={{ 68: '#fde047' }} hidden={[78]} />,
    question: 'Melyik szám 10-zel nagyobb, mint a 68?',
    options: ['78', '69', '58', '79'],
    correctAnswer: 0,
    explanation: '10-zel nagyobb = egy mezővel lejjebb a táblán. 68 + 10 = 78.'
  },
  {
    id: 'n100g2-q29',
    level: 3,
    questionTypeBadge: 'Pont középen',
    figure: <LineFig from={60} to={70} marks={[{ value: 65, label: '?', arrow: true }]} />,
    question: 'Melyik szám van pont középen a 60 és a 70 között?',
    options: ['65', '64', '66', '75'],
    correctAnswer: 0,
    explanation: 'A 60-tól 5 lépés a 65, és a 65-től is 5 lépés a 70.'
  },
  {
    id: 'n100g2-q30',
    level: 3,
    questionTypeBadge: 'Két feltétel',
    question: 'Melyik szám páratlan, és nagyobb, mint 80?',
    options: ['87', '78', '84', '79'],
    correctAnswer: 0,
    explanation: 'A 87 vége 7, ez páratlan. És 87 > 80. A 79 páratlan, de kisebb, mint 80.'
  }
];

export const Numbers100G2Quiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => (
  <QuizTemplate
    grade={2}
    chapterId="szamolas-100-ig"
    topicId="g2-c100-szamok-quiz"
    subtopicId="szamok-100-ig"
    title="1. Számok 100-ig – Kvíz"
    subtitle="30 feladat 3 szinten: tízesek és egyesek, szomszédok, százas tábla, számegyenes, összehasonlítás."
    badge="2. OSZTÁLY • III. SZÁMKÖRBŐVÍTÉS ÉS SZÁMOLÁS 100-IG • KVÍZ"
    questions={NUMBERS100_G2_QUESTIONS}
    cheatSheets={[
      {
        title: 'Tízesek és egyesek',
        items: ['1 rúd = 10, 1 kocka = 1', '63 = 6 tízes + 3 egyes = 60 + 3', '10 egyes = 1 tízes', '10 tízes = 100']
      },
      {
        title: 'Szomszédok',
        items: ['Egyes szomszéd: 82 < 83 < 84', 'Tízes szomszéd: 80 < 83 < 90', 'A 70 tízes szomszédai: 60 és 80', 'Páros vége: 0, 2, 4, 6, 8']
      },
      {
        title: 'Százas tábla és összehasonlítás',
        items: ['Jobbra +1, balra −1', 'Lefelé +10, felfelé −10', 'Előbb a tízeseket hasonlítsd!', '68 < 86, 74 > 71']
      }
    ]}
    onBack={onBack}
    onSwitchToTheory={onSwitchToTheory}
    onSwitchToMatcher={onSwitchToMatcher}
    onSwitchToSorter={onSwitchToSorter}
    initialGameMode={initialGameMode}
    matcherComponent={
      <Numbers100G2Matcher
        onBack={onBack}
        onSwitchToTheory={onSwitchToTheory}
        onSwitchToQuiz={() => {}}
        onSwitchToSorter={onSwitchToSorter}
      />
    }
    sorterComponent={
      <Numbers100G2Sorter
        onBack={onBack}
        onSwitchToTheory={onSwitchToTheory}
        onSwitchToQuiz={() => {}}
        onSwitchToMatcher={onSwitchToMatcher}
      />
    }
  />
);

export default Numbers100G2Quiz;
