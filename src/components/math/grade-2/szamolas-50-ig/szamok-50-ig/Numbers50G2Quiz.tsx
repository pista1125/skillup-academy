import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { Numbers50G2Matcher } from './Numbers50G2Matcher';
import { Numbers50G2Sorter } from './Numbers50G2Sorter';
import {
  N50QFig,
  N50_UNK,
  BlocksPart,
  NumberLinePart,
  CoinPart,
  EggTrayPart,
  EggPart
} from './Numbers50G2Parts';

// ---------------------------------------------------------------------------
// Kérdésábrák
// ---------------------------------------------------------------------------

const BlocksFig: React.FC<{ tens: number; ones: number }> = ({ tens, ones }) => {
  const unit = 8;
  const gap = 6;
  const w = tens * (unit + gap) + (tens > 0 ? 10 : 0) + Math.ceil(ones / 5) * (unit + 4);
  return (
    <N50QFig h={104}>
      <BlocksPart x={130 - w / 2} y={12} tens={tens} ones={ones} unit={unit} gap={gap} />
      <text x="130" y="98" textAnchor="middle" fontSize="13" fontWeight="bold" fill={N50_UNK}>= ?</text>
    </N50QFig>
  );
};

const TEFig: React.FC<{ t: string; e: string }> = ({ t, e }) => (
  <N50QFig h={96}>
    <rect x="70" y="12" width="60" height="28" fill="#ede9fe" stroke="#6b21a8" strokeWidth="2" />
    <rect x="130" y="12" width="60" height="28" fill="#dcfce7" stroke="#15803d" strokeWidth="2" />
    <text x="100" y="32" textAnchor="middle" fontSize="15" fontWeight="900" fill="#4c1d95">tízes</text>
    <text x="160" y="32" textAnchor="middle" fontSize="15" fontWeight="900" fill="#14532d">egyes</text>
    <rect x="70" y="40" width="60" height="44" fill="#fff" stroke="#6b21a8" strokeWidth="2" />
    <rect x="130" y="40" width="60" height="44" fill="#fff" stroke="#15803d" strokeWidth="2" />
    <text x="100" y="72" textAnchor="middle" fontSize="28" fontWeight="900" fill={t === '?' ? N50_UNK : '#4c1d95'}>{t}</text>
    <text x="160" y="72" textAnchor="middle" fontSize="28" fontWeight="900" fill={e === '?' ? N50_UNK : '#14532d'}>{e}</text>
  </N50QFig>
);

const LineFig: React.FC<{ from: number; to: number; arrowAt?: number; labelEvery?: number; marks?: { value: number; label?: string; color?: string }[] }> = ({
  from,
  to,
  arrowAt,
  labelEvery = 10,
  marks
}) => (
  <N50QFig h={100}>
    <NumberLinePart x={18} y={62} width={222} from={from} to={to} arrowAt={arrowAt} labelEvery={labelEvery} marks={marks} fontSize={12} />
  </N50QFig>
);

const CoinsFig: React.FC<{ coins: (5 | 10 | 20)[] }> = ({ coins }) => {
  const span = 40;
  return (
    <N50QFig h={84}>
      {coins.map((c, i) => (
        <CoinPart key={i} cx={130 - ((coins.length - 1) * span) / 2 + i * span} cy={42} value={c} r={c === 20 ? 18 : c === 10 ? 16 : 14} />
      ))}
    </N50QFig>
  );
};

const EggsFig: React.FC<{ trays: number; eggs: number }> = ({ trays, eggs }) => (
  <N50QFig h={100}>
    {Array.from({ length: trays }, (_, t) => (
      <EggTrayPart key={t} x={16 + (t % 2) * 64} y={14 + Math.floor(t / 2) * 34} />
    ))}
    {Array.from({ length: eggs }, (_, i) => (
      <EggPart key={i} cx={164 + Math.floor(i / 3) * 18} cy={26 + (i % 3) * 22} s={1.15} />
    ))}
  </N50QFig>
);

const CardsFig: React.FC<{ items: string[] }> = ({ items }) => {
  const bw = Math.min(56, 230 / items.length);
  const x0 = 130 - (items.length * bw) / 2;
  return (
    <N50QFig h={74}>
      {items.map((t, i) => (
        <g key={i}>
          <rect x={x0 + i * bw + 3} y="16" width={bw - 6} height="42" rx="8" fill={t === '?' ? '#fee2e2' : '#e0f2fe'} stroke={t === '?' ? N50_UNK : '#0369a1'} strokeWidth="2" />
          <text x={x0 + i * bw + bw / 2} y="45" textAnchor="middle" fontSize="20" fontWeight="900" fill={t === '?' ? N50_UNK : '#0c4a6e'}>{t}</text>
        </g>
      ))}
    </N50QFig>
  );
};

const CompareFig: React.FC<{ a: [number, number]; b: [number, number] }> = ({ a, b }) => (
  <N50QFig h={120}>
    <BlocksPart x={14} y={10} tens={a[0]} ones={a[1]} unit={7} gap={5} />
    <BlocksPart x={150} y={10} tens={b[0]} ones={b[1]} unit={7} gap={5} />
    <text x="60" y="108" textAnchor="middle" fontSize="20" fontWeight="900" fill="#1e293b">{a[0] * 10 + a[1]}</text>
    <rect x="114" y="86" width="32" height="28" rx="6" fill="#fee2e2" stroke={N50_UNK} strokeWidth="2" />
    <text x="130" y="107" textAnchor="middle" fontSize="18" fontWeight="900" fill={N50_UNK}>?</text>
    <text x="196" y="108" textAnchor="middle" fontSize="20" fontWeight="900" fill="#1e293b">{b[0] * 10 + b[1]}</text>
  </N50QFig>
);

// ---------------------------------------------------------------------------
// Kérdések
// ---------------------------------------------------------------------------

export const NUMBERS50_G2_QUESTIONS: QuizQuestion[] = [
  // ----- 1. szint -----
  {
    id: 'n50g2-q1',
    level: 1,
    questionTypeBadge: 'Rudak és kockák',
    figure: <BlocksFig tens={3} ones={4} />,
    question: 'Melyik számot raktuk ki?',
    options: ['34', '43', '7', '304'],
    correctAnswer: 0,
    explanation: '3 rúd = 3 tízes = 30. 4 kocka = 4 egyes. 30 + 4 = 34.'
  },
  {
    id: 'n50g2-q2',
    level: 1,
    questionTypeBadge: 'Csak tízesek',
    figure: <BlocksFig tens={4} ones={0} />,
    question: 'Melyik számot raktuk ki?',
    options: ['40', '4', '14', '30'],
    correctAnswer: 0,
    explanation: '4 rúd = 4 tízes. Egyes nincs, ezért 0 kerül a végére: 40.'
  },
  {
    id: 'n50g2-q3',
    level: 1,
    questionTypeBadge: 'Helyiérték-tábla',
    figure: <TEFig t="2" e="7" />,
    question: 'Melyik szám áll a táblában?',
    options: ['27', '72', '9', '207'],
    correctAnswer: 0,
    explanation: '2 tízes és 7 egyes: 20 + 7 = 27.'
  },
  {
    id: 'n50g2-q4',
    level: 1,
    questionTypeBadge: 'Számolvasás',
    question: 'Melyik szám a negyvenegy?',
    options: ['41', '14', '40', '31'],
    correctAnswer: 0,
    explanation: 'Negyven = 4 tízes, egy = 1 egyes. Így 41.'
  },
  {
    id: 'n50g2-q5',
    level: 1,
    questionTypeBadge: 'Ki jön utána?',
    figure: <LineFig from={20} to={35} labelEvery={5} marks={[{ value: 29, label: '29', color: '#2563eb' }]} arrowAt={30} />,
    question: 'Melyik szám jön a 29 után?',
    options: ['30', '28', '39', '20'],
    correctAnswer: 0,
    explanation: 'A 29 után 1-gyel nagyobb szám jön: 29 + 1 = 30. Itt kezdődik az új tízes!'
  },
  {
    id: 'n50g2-q6',
    level: 1,
    questionTypeBadge: 'Összehasonlítás',
    figure: <CompareFig a={[3, 8]} b={[4, 1]} />,
    question: 'Melyik jel kerül a ? helyére? 38 ? 41',
    options: ['<', '>', '='],
    correctAnswer: 0,
    explanation: 'Nézd a tízeseket: 3 tízes kevesebb, mint 4 tízes. Ezért 38 < 41.'
  },
  {
    id: 'n50g2-q7',
    level: 1,
    questionTypeBadge: 'Páros szám',
    question: 'Melyik szám páros?',
    options: ['36', '27', '41', '33'],
    correctAnswer: 0,
    explanation: 'A páros szám végén 0, 2, 4, 6 vagy 8 áll. A 36 végén 6 van.'
  },
  {
    id: 'n50g2-q8',
    level: 1,
    questionTypeBadge: 'Pénz',
    figure: <CoinsFig coins={[20, 10, 5]} />,
    question: 'Mennyi pénz van itt?',
    options: ['35 Ft', '3 Ft', '25 Ft', '30 Ft'],
    correctAnswer: 0,
    explanation: '20 + 10 = 30, és még 5: 30 + 5 = 35 Ft.'
  },
  {
    id: 'n50g2-q9',
    level: 1,
    questionTypeBadge: 'Tojástartó',
    figure: <EggsFig trays={3} eggs={6} />,
    question: 'Egy tálcában 10 tojás van. Hány tojás van összesen?',
    options: ['36', '9', '63', '33'],
    correctAnswer: 0,
    explanation: '3 teli tálca = 30 tojás. Még 6 tojás: 30 + 6 = 36.'
  },
  {
    id: 'n50g2-q10',
    level: 1,
    questionTypeBadge: 'Számegyenes',
    figure: <LineFig from={20} to={30} arrowAt={25} labelEvery={10} />,
    question: 'Melyik számra mutat a nyíl?',
    options: ['25', '24', '26', '35'],
    correctAnswer: 0,
    explanation: 'A 20 és a 30 pont közepén a 25 van. Számolj a 20-tól 5 lépést!'
  },

  // ----- 2. szint -----
  {
    id: 'n50g2-q11',
    level: 2,
    questionTypeBadge: 'Hány tízes?',
    figure: <TEFig t="?" e="7" />,
    question: 'Hány tízes van a 47-ben?',
    options: ['4', '7', '11', '3'],
    correctAnswer: 0,
    explanation: 'A 47 elején álló 4 a tízesek száma. A 7 az egyes.'
  },
  {
    id: 'n50g2-q12',
    level: 2,
    questionTypeBadge: 'Tízes szomszéd',
    figure: <CardsFig items={['30', '<', '34', '<', '?']} />,
    question: 'Mi a 34 nagyobb tízes szomszédja?',
    options: ['40', '35', '33', '50'],
    correctAnswer: 0,
    explanation: 'A 34 a 30 és a 40 között van. A nagyobb kerek tízes a 40.'
  },
  {
    id: 'n50g2-q13',
    level: 2,
    questionTypeBadge: 'Egyes szomszédok',
    figure: <CardsFig items={['?', '<', '40', '<', '?']} />,
    question: 'Melyik a 40 két egyes szomszédja?',
    options: ['39 és 41', '30 és 50', '38 és 42', '39 és 40'],
    correctAnswer: 0,
    explanation: 'Egyes szomszéd: 1-gyel kisebb és 1-gyel nagyobb. 40 − 1 = 39, 40 + 1 = 41.'
  },
  {
    id: 'n50g2-q14',
    level: 2,
    questionTypeBadge: 'Csere: 10 kocka = 1 rúd',
    figure: <BlocksFig tens={2} ones={13} />,
    question: 'Melyik számot raktuk ki?',
    options: ['33', '213', '23', '15'],
    correctAnswer: 0,
    explanation: '13 kockából 10 kocka = 1 rúd. Így 3 rúd és 3 kocka lesz: 33.'
  },
  {
    id: 'n50g2-q15',
    level: 2,
    questionTypeBadge: 'Felcserélt sorrend',
    figure: <CardsFig items={['5 egyes', '+', '3 tízes']} />,
    question: 'Melyik szám ez?',
    options: ['35', '53', '8', '305'],
    correctAnswer: 0,
    explanation: 'Mindegy, mit mondunk előbb! 3 tízes = 30, és 5 egyes. 30 + 5 = 35.'
  },
  {
    id: 'n50g2-q16',
    level: 2,
    questionTypeBadge: 'Számegyenes',
    figure: <LineFig from={30} to={50} arrowAt={46} labelEvery={10} />,
    question: 'Melyik számra mutat a nyíl?',
    options: ['46', '44', '47', '36'],
    correctAnswer: 0,
    explanation: 'A nyíl a 40 után van. Számolj tovább: 41, 42, 43, 44, 45, 46.'
  },
  {
    id: 'n50g2-q17',
    level: 2,
    questionTypeBadge: 'Legnagyobb szám',
    figure: <CardsFig items={['39', '42', '24', '41']} />,
    question: 'Melyik a legnagyobb szám?',
    options: ['42', '39', '41', '24'],
    correctAnswer: 0,
    explanation: 'A 42 és a 41 is 4 tízes. Az egyeseknél 2 > 1, ezért a 42 a legnagyobb.'
  },
  {
    id: 'n50g2-q18',
    level: 2,
    questionTypeBadge: 'Páros szomszédok',
    figure: <LineFig from={30} to={36} labelEvery={1} marks={[{ value: 33, color: '#d97706' }]} />,
    question: 'Melyik a 33 két páros szomszédja?',
    options: ['32 és 34', '31 és 35', '30 és 40', '32 és 33'],
    correctAnswer: 0,
    explanation: 'A 33 előtti páros szám a 32, utána a 34 jön.'
  },
  {
    id: 'n50g2-q19',
    level: 2,
    questionTypeBadge: 'Pénz',
    figure: <CoinsFig coins={[10, 10, 10, 5, 5]} />,
    question: 'Mennyi pénz van itt?',
    options: ['40 Ft', '35 Ft', '30 Ft', '5 Ft'],
    correctAnswer: 0,
    explanation: '10 + 10 + 10 = 30. Két 5 Ft-os 10 Ft. 30 + 10 = 40 Ft.'
  },
  {
    id: 'n50g2-q20',
    level: 2,
    questionTypeBadge: 'Számsor',
    figure: <CardsFig items={['26', '28', '30', '?', '34']} />,
    question: 'Melyik szám hiányzik?',
    options: ['32', '31', '33', '40'],
    correctAnswer: 0,
    explanation: 'Mindig 2-vel nő: 30 + 2 = 32. Utána 32 + 2 = 34.'
  },

  // ----- 3. szint -----
  {
    id: 'n50g2-q21',
    level: 3,
    questionTypeBadge: 'Ki vagyok?',
    question: 'A tízesem 3. Az egyesem 1-gyel több. Ki vagyok?',
    options: ['34', '43', '32', '31'],
    correctAnswer: 0,
    explanation: 'A tízes 3. Az egyes 3 + 1 = 4. A szám 34.'
  },
  {
    id: 'n50g2-q22',
    level: 3,
    questionTypeBadge: 'Párosak számolása',
    figure: <LineFig from={40} to={50} labelEvery={1} />,
    question: 'Hány páros szám van a 40 és az 50 között? (A 40 és az 50 nem számít.)',
    options: ['4', '5', '6', '3'],
    correctAnswer: 0,
    explanation: 'Ezek: 42, 44, 46, 48. Ez 4 szám.'
  },
  {
    id: 'n50g2-q23',
    level: 3,
    questionTypeBadge: 'Mi fér közé?',
    figure: <CardsFig items={['35', '<', '?', '<', '39']} />,
    question: 'Hány szám írható a ? helyére?',
    options: ['3', '4', '5', '2'],
    correctAnswer: 0,
    explanation: 'A 35 és a 39 közötti számok: 36, 37, 38. Ez 3 szám.'
  },
  {
    id: 'n50g2-q24',
    level: 3,
    questionTypeBadge: 'Fizetés',
    figure: <CoinsFig coins={[20, 20]} />,
    question: 'Lili 45 Ft-ot fizet. Van két 20 Ft-osa. Mi kell még?',
    options: ['egy 5 Ft-os', 'egy 10 Ft-os', 'két 5 Ft-os', 'egy 20 Ft-os'],
    correctAnswer: 0,
    explanation: '20 + 20 = 40 Ft. A 45-höz még 5 Ft kell.'
  },
  {
    id: 'n50g2-q25',
    level: 3,
    questionTypeBadge: 'Számkártyák',
    figure: <CardsFig items={['2', '4']} />,
    question: 'Melyik a legnagyobb szám, amit a két kártyából kirakhatsz?',
    options: ['42', '24', '44', '6'],
    correctAnswer: 0,
    explanation: 'A nagyobb számjegy menjen a tízesek helyére: 42. (A 44-hez két 4-es kártya kellene.)'
  },
  {
    id: 'n50g2-q26',
    level: 3,
    questionTypeBadge: 'Közelebbi tízes',
    figure: <LineFig from={30} to={40} labelEvery={10} marks={[{ value: 38, label: '38', color: '#d97706' }]} />,
    question: 'A 38 két tízes szomszédja közül melyik van közelebb?',
    options: ['40', '30', '39', '50'],
    correctAnswer: 0,
    explanation: 'A 38-tól a 40 csak 2 lépés. A 30 viszont 8 lépés.'
  },
  {
    id: 'n50g2-q27',
    level: 3,
    questionTypeBadge: 'Visszafelé ugrálás',
    figure: <CardsFig items={['41', '39', '37', '?']} />,
    question: 'Kettesével ugrálunk visszafelé. Mi jön?',
    options: ['35', '36', '33', '34'],
    correctAnswer: 0,
    explanation: 'Mindig 2-vel kevesebb: 37 − 2 = 35.'
  },
  {
    id: 'n50g2-q28',
    level: 3,
    questionTypeBadge: 'Teli tálca',
    figure: <EggsFig trays={3} eggs={8} />,
    question: 'Hány tojás kell még, hogy 4 teli tálca legyen?',
    options: ['2', '8', '12', '40'],
    correctAnswer: 0,
    explanation: '3 tálca és 8 tojás = 38 tojás. 4 teli tálca = 40 tojás. 38 + 2 = 40.'
  },
  {
    id: 'n50g2-q29',
    level: 3,
    questionTypeBadge: 'Igaz vagy hamis?',
    question: 'Melyik állítás igaz?',
    options: ['27 < 32', '45 < 39', '30 > 33', '18 > 41'],
    correctAnswer: 0,
    explanation: 'A 27-ben 2 tízes van, a 32-ben 3 tízes. Ezért 27 < 32 igaz.'
  },
  {
    id: 'n50g2-q30',
    level: 3,
    questionTypeBadge: 'Szomszéd-rejtvény',
    figure: <CardsFig items={['29', '<', '?', '<', '31']} />,
    question: 'Az egyes szomszédjaim a 29 és a 31. Ki vagyok?',
    options: ['30', '29', '31', '20'],
    correctAnswer: 0,
    explanation: 'A 29 és a 31 között csak a 30 van.'
  }
];

export const Numbers50G2Quiz: React.FC<{
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
      topicId="g2-c50-szamok-quiz"
      subtopicId="szamok-50-ig"
      title="1. Számok 50-ig – Kvíz"
      subtitle="30 feladat 3 szinten: tízesek és egyesek, számegyenes, szomszédok, összehasonlítás, páros és páratlan."
      badge="2. OSZTÁLY • II. SZÁMKÖRBŐVÍTÉS ÉS SZÁMOLÁS 50-IG • KVÍZ"
      questions={NUMBERS50_G2_QUESTIONS}
      cheatSheets={[
        {
          title: 'Tízesek és egyesek',
          items: ['34 = 3 tízes + 4 egyes = 30 + 4', '10 egyes = 1 tízes', '40 = 4 tízes + 0 egyes', 'Előbb a tízes, utána az egyes!']
        },
        {
          title: 'Szomszédok',
          items: ['Egyes szomszéd: 36 < 37 < 38', 'Tízes szomszéd: 30 < 37 < 40', 'Páros szomszéd: 32 < 33 < 34', 'Számegyenesen jobbra nő a szám']
        },
        {
          title: 'Összehasonlítás, páros',
          items: ['Előbb a tízeseket nézd: 38 < 41', 'Ha egyforma a tízes, jöhet az egyes: 42 > 41', 'Páros vége: 0, 2, 4, 6, 8', 'Páratlan vége: 1, 3, 5, 7, 9']
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <Numbers50G2Matcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <Numbers50G2Sorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default Numbers50G2Quiz;
