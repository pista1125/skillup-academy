import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { Add50G2Matcher } from './Add50G2Matcher';
import { Add50G2Sorter } from './Add50G2Sorter';
import {
  A50QFig,
  ADD50_UNK,
  FillBlocksPart,
  TwoNumberBlocksPart,
  JumpsPart,
  Hop,
  PyramidPart,
  BalancePart
} from './Add50G2Parts';
import { CoinPart, EggTrayPart, EggPart } from '../szamok-50-ig/Numbers50G2Parts';

// ---------------------------------------------------------------------------
// Kérdésábrák
// ---------------------------------------------------------------------------

const AddBlocksFig: React.FC<{ a: number; b: number }> = ({ a, b }) => (
  <A50QFig h={104}>
    <TwoNumberBlocksPart cx={130} y={12} a={a} b={b} unit={7} gap={4} />
    <text x="130" y="98" textAnchor="middle" fontSize="14" fontWeight="900" fill="#1e293b">
      {a} + {b} = <tspan fill={ADD50_UNK}>?</tspan>
    </text>
  </A50QFig>
);

const FillFig: React.FC<{ tens: number; ones: number; caption: string }> = ({ tens, ones, caption }) => (
  <A50QFig h={112}>
    <FillBlocksPart x={70} y={10} tens={tens} ones={ones} added={0} unit={8} gap={6} />
    {Array.from({ length: 10 - ones }, (_, k) => {
      const i = ones + k;
      const col = Math.floor(i / 5);
      const row = i % 5;
      const onesX = 70 + tens * 14 + 10;
      return (
        <rect
          key={k}
          x={onesX + col * 12}
          y={10 + 80 - (row + 1) * 11 + 3}
          width="8"
          height="8"
          rx="1.5"
          fill="#ffffff"
          stroke={ADD50_UNK}
          strokeWidth="1.4"
          strokeDasharray="2 1.5"
        />
      );
    })}
    <text x="130" y="106" textAnchor="middle" fontSize="14" fontWeight="900" fill="#1e293b">{caption}</text>
  </A50QFig>
);

const JumpFig: React.FC<{
  from: number;
  to: number;
  hops: Hop[];
  endValue?: number;
  labelEvery?: number;
}> = ({ from, to, hops, endValue, labelEvery = 10 }) => (
  <A50QFig h={124}>
    <JumpsPart x={18} y={76} width={222} from={from} to={to} hops={hops} startLabel={String(hops[0]?.from ?? from)} endValue={endValue} labelEvery={labelEvery} fontSize={11} />
  </A50QFig>
);

const PyramidFig: React.FC<{ left: string; right: string; top: string }> = ({ left, right, top }) => (
  <A50QFig h={92}>
    <PyramidPart cx={130} y={12} left={left} right={right} top={top} bw={64} bh={34} fontSize={20} />
  </A50QFig>
);

const BalanceFig: React.FC<{ left: string; right: string }> = ({ left, right }) => (
  <A50QFig h={92}>
    <BalancePart cx={130} y={10} left={left} right={right} w={230} fontSize={18} />
  </A50QFig>
);

const CoinsTwoFig: React.FC<{ a: (5 | 10 | 20)[]; b: (5 | 10 | 20)[] }> = ({ a, b }) => (
  <A50QFig h={84}>
    {a.map((c, i) => (
      <CoinPart key={`a${i}`} cx={30 + i * 38} cy={42} value={c} />
    ))}
    <text x="130" y="50" textAnchor="middle" fontSize="24" fontWeight="900" fill="#1e293b">+</text>
    {b.map((c, i) => (
      <CoinPart key={`b${i}`} cx={168 + i * 38} cy={42} value={c} />
    ))}
  </A50QFig>
);

const EggsFig: React.FC<{ trays: number; eggs: number; extra: number }> = ({ trays, eggs, extra }) => (
  <A50QFig h={104}>
    {Array.from({ length: trays }, (_, t) => (
      <EggTrayPart key={t} x={12 + (t % 2) * 62} y={12 + Math.floor(t / 2) * 32} />
    ))}
    {Array.from({ length: eggs }, (_, i) => (
      <EggPart key={i} cx={150 + Math.floor(i / 3) * 15} cy={22 + (i % 3) * 20} s={1.05} />
    ))}
    <text x="203" y="52" textAnchor="middle" fontSize="20" fontWeight="900" fill="#1e293b">+</text>
    {Array.from({ length: extra }, (_, i) => (
      <ellipse key={`x${i}`} cx={222 + Math.floor(i / 3) * 14} cy={22 + (i % 3) * 20} rx="5" ry="6.5" fill="#bfdbfe" stroke="#1d4ed8" strokeWidth="1.4" />
    ))}
    <text x="130" y="96" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#475569">1 tálca = 10 tojás</text>
  </A50QFig>
);

const CardsFig: React.FC<{ items: string[] }> = ({ items }) => {
  const bw = Math.min(56, 236 / items.length);
  const x0 = 130 - (items.length * bw) / 2;
  return (
    <A50QFig h={74}>
      {items.map((t, i) => (
        <g key={i}>
          <rect x={x0 + i * bw + 3} y="16" width={bw - 6} height="42" rx="8" fill={t === '?' ? '#fee2e2' : '#e0f2fe'} stroke={t === '?' ? ADD50_UNK : '#0369a1'} strokeWidth="2" />
          <text x={x0 + i * bw + bw / 2} y="44" textAnchor="middle" fontSize="18" fontWeight="900" fill={t === '?' ? ADD50_UNK : '#0c4a6e'}>{t}</text>
        </g>
      ))}
    </A50QFig>
  );
};

const RowsFig: React.FC<{ rows: string[] }> = ({ rows }) => (
  <A50QFig h={30 + rows.length * 34}>
    {rows.map((r, i) => (
      <text key={i} x="130" y={42 + i * 34} textAnchor="middle" fontSize="22" fontWeight="900" fill={r.includes('?') ? '#1d4ed8' : '#334155'}>
        {r}
      </text>
    ))}
  </A50QFig>
);

// ---------------------------------------------------------------------------
// Kérdések
// ---------------------------------------------------------------------------

export const ADD50_G2_QUESTIONS: QuizQuestion[] = [
  // ----- 1. szint: egy lépés, tízesátlépés nélkül -----
  {
    id: 'add50g2-q1',
    level: 1,
    questionTypeBadge: 'Kerek tízes + egyes',
    figure: <AddBlocksFig a={20} b={6} />,
    question: 'Mennyi 20 + 6?',
    options: ['26', '8', '62', '206'],
    correctAnswer: 0,
    explanation: '2 rúd és 6 kocka: 20 + 6 = 26. A 0 helyére kerül a 6.'
  },
  {
    id: 'add50g2-q2',
    level: 1,
    questionTypeBadge: 'Kerek tízes + kétjegyű',
    figure: <AddBlocksFig a={30} b={14} />,
    question: 'Mennyi 30 + 14?',
    options: ['44', '34', '17', '43'],
    correctAnswer: 0,
    explanation: 'Rudak: 3 + 1 = 4 tízes. Kockák: 4 egyes. 30 + 14 = 44.'
  },
  {
    id: 'add50g2-q3',
    level: 1,
    questionTypeBadge: 'Kistesó segít',
    figure: <RowsFig rows={['4 + 3 = 7', '24 + 3 = ?']} />,
    question: 'Mennyi 24 + 3?',
    options: ['27', '54', '26', '28'],
    correctAnswer: 0,
    explanation: '4 + 3 = 7. A 2 tízes marad. Így 24 + 3 = 27.'
  },
  {
    id: 'add50g2-q4',
    level: 1,
    questionTypeBadge: 'Felcserélés',
    question: 'Mennyi 3 + 34?',
    options: ['37', '64', '7', '36'],
    correctAnswer: 0,
    explanation: 'Cseréld meg a tagokat: 34 + 3 = 37. Az összeg ugyanannyi.'
  },
  {
    id: 'add50g2-q5',
    level: 1,
    questionTypeBadge: 'Kerek tízesig',
    figure: <FillFig tens={2} ones={3} caption="23 + 7 = ?" />,
    question: 'Mennyi 23 + 7?',
    options: ['30', '20', '29', '40'],
    correctAnswer: 0,
    explanation: '3 + 7 = 10, ez egy új tízes. 20 + 10 = 30.'
  },
  {
    id: 'add50g2-q6',
    level: 1,
    questionTypeBadge: 'Ugrás a számegyenesen',
    figure: <JumpFig from={40} to={50} hops={[{ from: 41, to: 46, label: '+5' }]} endValue={46} labelEvery={10} />,
    question: 'Hová érkezünk? 41 + 5 = ?',
    options: ['46', '45', '47', '91'],
    correctAnswer: 0,
    explanation: '1 + 5 = 6, és a 4 tízes marad: 41 + 5 = 46.'
  },
  {
    id: 'add50g2-q7',
    level: 1,
    questionTypeBadge: 'Tojások',
    figure: <EggsFig trays={3} eggs={2} extra={6} />,
    question: 'Volt 32 tojás. Hozzáteszünk 6-ot. Hány tojás lett?',
    options: ['38', '37', '39', '35'],
    correctAnswer: 0,
    explanation: '2 + 6 = 8 szabad tojás és 3 teli tálca: 32 + 6 = 38.'
  },
  {
    id: 'add50g2-q8',
    level: 1,
    questionTypeBadge: 'Melyik az összeg?',
    question: 'Melyik összeadás eredménye 29?',
    options: ['25 + 4', '25 + 3', '20 + 7', '22 + 8'],
    correctAnswer: 0,
    explanation: '25 + 4 = 29. (25 + 3 = 28, 20 + 7 = 27, 22 + 8 = 30.)'
  },
  {
    id: 'add50g2-q9',
    level: 1,
    questionTypeBadge: '10 hozzáadása',
    figure: <AddBlocksFig a={10} b={27} />,
    question: 'Mennyi 10 + 27?',
    options: ['37', '28', '17', '47'],
    correctAnswer: 0,
    explanation: 'Egy rúddal több lesz: 2 + 1 = 3 tízes, és a 7 egyes marad. 37.'
  },
  {
    id: 'add50g2-q10',
    level: 1,
    questionTypeBadge: 'Ugrás a számegyenesen',
    figure: <JumpFig from={40} to={50} hops={[{ from: 44, to: 48, label: '+4' }]} endValue={48} labelEvery={10} />,
    question: 'Mennyi 44 + 4?',
    options: ['48', '84', '47', '49'],
    correctAnswer: 0,
    explanation: '4 + 4 = 8, és a 4 tízes marad: 44 + 4 = 48.'
  },

  // ----- 2. szint: tízesátlépés -----
  {
    id: 'add50g2-q11',
    level: 2,
    questionTypeBadge: 'Bontás',
    figure: (
      <JumpFig
        from={24}
        to={36}
        hops={[
          { from: 26, to: 30, label: '+4' },
          { from: 30, to: 33, label: '+?' }
        ]}
        labelEvery={2}
      />
    ),
    question: '26 + 7 = 26 + 4 + □. Mi kerül a □ helyére?',
    options: ['3', '4', '7', '2'],
    correctAnswer: 0,
    explanation: 'A 7-ből 4-et már hozzáadtunk. 7 = 4 + 3, tehát még 3 kell.'
  },
  {
    id: 'add50g2-q12',
    level: 2,
    questionTypeBadge: 'Tízesátlépés',
    figure: (
      <JumpFig
        from={26}
        to={36}
        hops={[
          { from: 28, to: 30, label: '+2' },
          { from: 30, to: 33, label: '+3' }
        ]}
        endValue={33}
        labelEvery={2}
      />
    ),
    question: 'Mennyi 28 + 5?',
    options: ['33', '23', '32', '34'],
    correctAnswer: 0,
    explanation: '28 + 2 = 30, és még 3: 30 + 3 = 33.'
  },
  {
    id: 'add50g2-q13',
    level: 2,
    questionTypeBadge: 'Rudak és kockák',
    figure: <AddBlocksFig a={37} b={6} />,
    question: 'Mennyi 37 + 6?',
    options: ['43', '33', '42', '313'],
    correctAnswer: 0,
    explanation: '7 + 6 = 13 kocka. 10 kocka = 1 új rúd. 3 + 1 = 4 rúd és 3 kocka: 43.'
  },
  {
    id: 'add50g2-q14',
    level: 2,
    questionTypeBadge: 'Tízesátlépés',
    question: 'Mennyi 19 + 8?',
    options: ['27', '17', '26', '28'],
    correctAnswer: 0,
    explanation: '19 + 1 = 20, és még 7: 20 + 7 = 27.'
  },
  {
    id: 'add50g2-q15',
    level: 2,
    questionTypeBadge: 'Pont 50',
    question: 'Mennyi 45 + 5?',
    options: ['50', '40', '49', '45'],
    correctAnswer: 0,
    explanation: '5 + 5 = 10, ez egy új tízes. 40 + 10 = 50.'
  },
  {
    id: 'add50g2-q16',
    level: 2,
    questionTypeBadge: 'Kétjegyű hozzáadása',
    figure: (
      <JumpFig
        from={10}
        to={30}
        hops={[
          { from: 15, to: 25, label: '+10' },
          { from: 25, to: 28, label: '+3' }
        ]}
        endValue={28}
        labelEvery={5}
      />
    ),
    question: 'Mennyi 15 + 13?',
    options: ['28', '25', '18', '38'],
    correctAnswer: 0,
    explanation: 'Előbb a tízest: 15 + 10 = 25. Aztán az egyest: 25 + 3 = 28.'
  },
  {
    id: 'add50g2-q17',
    level: 2,
    questionTypeBadge: 'Kétjegyű + kétjegyű',
    figure: <AddBlocksFig a={22} b={25} />,
    question: 'Mennyi 22 + 25?',
    options: ['47', '27', '45', '37'],
    correctAnswer: 0,
    explanation: 'Tízesek: 20 + 20 = 40. Egyesek: 2 + 5 = 7. 40 + 7 = 47.'
  },
  {
    id: 'add50g2-q18',
    level: 2,
    questionTypeBadge: 'Pénz',
    figure: <CoinsTwoFig a={[20, 5]} b={[10, 5]} />,
    question: 'Mennyi pénz van összesen?',
    options: ['40 Ft', '35 Ft', '30 Ft', '45 Ft'],
    correctAnswer: 0,
    explanation: '20 + 5 = 25 Ft és 10 + 5 = 15 Ft. 25 + 15 = 40 Ft.'
  },
  {
    id: 'add50g2-q19',
    level: 2,
    questionTypeBadge: 'Pótlás kerek tízesig',
    figure: <FillFig tens={3} ones={3} caption="33 + ? = 40" />,
    question: '33 + □ = 40. Mi kerül a □ helyére?',
    options: ['7', '3', '17', '6'],
    correctAnswer: 0,
    explanation: 'A 3 kockához még 7 kell, hogy 10 legyen. 33 + 7 = 40.'
  },
  {
    id: 'add50g2-q20',
    level: 2,
    questionTypeBadge: 'Három tag',
    question: 'Mennyi 18 + 4 + 6?',
    options: ['28', '22', '24', '38'],
    correctAnswer: 0,
    explanation: 'Keress 10-es párt: 4 + 6 = 10. 18 + 10 = 28.'
  },

  // ----- 3. szint: legfeljebb két lépés -----
  {
    id: 'add50g2-q21',
    level: 3,
    questionTypeBadge: 'Két ugrás',
    figure: (
      <JumpFig
        from={15}
        to={40}
        hops={[
          { from: 16, to: 26, label: '+10' },
          { from: 26, to: 35, label: '+9' }
        ]}
        endValue={35}
        labelEvery={5}
      />
    ),
    question: 'Mennyi 16 + 19?',
    options: ['35', '25', '34', '36'],
    correctAnswer: 0,
    explanation: '16 + 10 = 26. Aztán 26 + 9 = 26 + 4 + 5 = 35.'
  },
  {
    id: 'add50g2-q22',
    level: 3,
    questionTypeBadge: 'Kétjegyű tízesátlépéssel',
    figure: <AddBlocksFig a={27} b={16} />,
    question: 'Mennyi 27 + 16?',
    options: ['43', '33', '41', '53'],
    correctAnswer: 0,
    explanation: '27 + 10 = 37. Aztán 37 + 6 = 37 + 3 + 3 = 43.'
  },
  {
    id: 'add50g2-q23',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    question: 'Bori 24 matricát gyűjtött, Dani 17-et. Hány matricájuk van együtt?',
    options: ['41', '31', '7', '42'],
    correctAnswer: 0,
    explanation: '24 + 17: 24 + 10 = 34, és 34 + 7 = 34 + 6 + 1 = 41.'
  },
  {
    id: 'add50g2-q24',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    question: 'A dobozban 28 kréta van. Teszünk bele még 8-at. Hány kréta lesz benne?',
    options: ['36', '26', '35', '20'],
    correctAnswer: 0,
    explanation: '28 + 2 = 30, és még 6: 30 + 6 = 36 kréta.'
  },
  {
    id: 'add50g2-q25',
    level: 3,
    questionTypeBadge: 'Számpiramis',
    figure: <PyramidFig left="14" right="19" top="?" />,
    question: 'Mi kerül a piramis tetejére?',
    options: ['33', '23', '32', '5'],
    correctAnswer: 0,
    explanation: 'Fent a két alsó szám összege áll: 14 + 19 = 14 + 10 + 9 = 24 + 9 = 33.'
  },
  {
    id: 'add50g2-q26',
    level: 3,
    questionTypeBadge: 'Pótlás 50-ig',
    figure: (
      <JumpFig
        from={20}
        to={50}
        hops={[
          { from: 26, to: 30, label: '+4' },
          { from: 30, to: 50, label: '+?' }
        ]}
        labelEvery={10}
      />
    ),
    question: '26 + □ = 50. Mi kerül a □ helyére?',
    options: ['24', '34', '26', '14'],
    correctAnswer: 0,
    explanation: '26 + 4 = 30. A 30-tól az 50-ig még 20 kell. 4 + 20 = 24.'
  },
  {
    id: 'add50g2-q27',
    level: 3,
    questionTypeBadge: 'Szabály',
    figure: <CardsFig items={['18', '24', '30', '36', '?']} />,
    question: 'Mindig ugyanannyit adunk hozzá. Mi jön?',
    options: ['42', '40', '41', '46'],
    correctAnswer: 0,
    explanation: 'Mindig 6-tal nő: 36 + 6 = 36 + 4 + 2 = 42.'
  },
  {
    id: 'add50g2-q28',
    level: 3,
    questionTypeBadge: 'Mérleg',
    figure: <BalanceFig left="29 + 6" right="30 + ?" />,
    question: 'A mérleg egyensúlyban van. Mennyi a ?',
    options: ['5', '6', '4', '35'],
    correctAnswer: 0,
    explanation: 'Bal oldal: 29 + 6 = 35. Jobb oldal: 30 + 5 = 35. A ? = 5.'
  },
  {
    id: 'add50g2-q29',
    level: 3,
    questionTypeBadge: 'Tojások',
    figure: <EggsFig trays={3} eggs={7} extra={5} />,
    question: 'Volt 37 tojás. Kaptunk még 5-öt. Hány tojás lett?',
    options: ['42', '32', '41', '12'],
    correctAnswer: 0,
    explanation: '37 + 3 = 40, és még 2: 40 + 2 = 42 tojás.'
  },
  {
    id: 'add50g2-q30',
    level: 3,
    questionTypeBadge: 'Nagyobb, mint 40',
    question: 'Melyik összeg nagyobb 40-nél?',
    options: ['23 + 19', '25 + 14', '18 + 21', '31 + 8'],
    correctAnswer: 0,
    explanation: '23 + 19 = 42, ez több 40-nél. A többi összeg 39.'
  }
];

export const Add50G2Quiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => {
  return (
    <QuizTemplate
      grade={2}
      chapterId="szamolas-50-ig"
      topicId="g2-c50-osszeadas-quiz"
      subtopicId="osszeadas-50-es-szamkor"
      title="2. Összeadás 50-es számkör – Kvíz"
      subtitle="30 feladat 3 szinten: tízesátlépés nélkül, kerek tízesig, tízesátlépéssel, kétjegyű számok összeadása."
      badge="2. OSZTÁLY • II. SZÁMKÖRBŐVÍTÉS ÉS SZÁMOLÁS 50-IG • KVÍZ"
      questions={ADD50_G2_QUESTIONS}
      cheatSheets={[
        {
          title: 'Tízesátlépés nélkül',
          items: ['30 + 6 = 36', '4 + 3 = 7 → 24 + 3 = 27', '3 + 34 = 34 + 3 = 37', '23 + 7 = 30 (pont kerek tízes)']
        },
        {
          title: 'Tízesátlépéssel',
          items: ['Előbb a kerek tízesig!', '26 + 7 = 26 + 4 + 3 = 33', '28 + 5 = 28 + 2 + 3 = 33', '10 kocka = 1 új rúd']
        },
        {
          title: 'Kétjegyű számok',
          items: ['Előbb a tízest, aztán az egyest', '15 + 13 = 15 + 10 + 3 = 28', '16 + 19 = 26 + 9 = 35', 'Piramis: lent két szám, fent az összeg']
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <Add50G2Matcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <Add50G2Sorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default Add50G2Quiz;
