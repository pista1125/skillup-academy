import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { MulDiv10000Matcher } from './MulDiv10000Matcher';
import { MulDiv10000Sorter } from './MulDiv10000Sorter';
import { PlaceShiftTable, PiggyBank, CoinGrid, ProductPyramid } from './MulDiv10000Figures';

// ---------------------------------------------------------------------------
// Kérdésábrák – belső SVG-segédek
// ---------------------------------------------------------------------------
const UNK = '#dc2626';

const QFig: React.FC<{ children: React.ReactNode; h?: number }> = ({ children, h = 150 }) => (
  <svg viewBox={`0 0 240 ${h}`} className="w-full max-w-[280px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
    <rect x="1" y="1" width="238" height={h - 2} rx="10" fill="#f8fafc" stroke="#cbd5e1" />
    {children}
  </svg>
);

const ShiftFig: React.FC<{ top: string[]; label: string; from: number; to: number }> = ({ top, label, from, to }) => (
  <QFig h={80}>
    <PlaceShiftTable x={50} y={10} top={top} bottom={['?', '?', '?', '?']} label={label} from={from} to={to} cw={30} />
  </QFig>
);

const PiggyFig: React.FC<{ coin: string; color: string; text: string }> = ({ coin, color, text }) => (
  <QFig h={110}>
    <PiggyBank x={95} y={52} color={color} coin={coin} />
    <text x="175" y="50" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#334155">{text}</text>
    <text x="175" y="72" textAnchor="middle" fontSize="16" fontWeight="bold" fill={UNK}>?</text>
  </QFig>
);

const CoinsFig: React.FC<{ rows: number; cols: number; value: number; groups?: boolean }> = ({ rows, cols, value }) => (
  <QFig h={rows * 25 + 30}>
    <CoinGrid x={120 - ((cols - 1) * 25) / 2} y={20} rows={rows} cols={cols} value={value} />
    <text x="120" y={rows * 25 + 22} textAnchor="middle" fontSize="11" fontWeight="bold" fill={UNK}>Összesen: ?</text>
  </QFig>
);

const PyrFig: React.FC<{ rows: (number | string | null)[][] }> = ({ rows }) => (
  <QFig h={118}>
    <ProductPyramid rows={rows} y={8} w={50} />
  </QFig>
);

const BasketsFig: React.FC = () => (
  <QFig h={100}>
    <text x="120" y="20" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#365314">150 dkg vargánya, 1 gomba = 10 dkg</text>
    {[0, 1, 2, 3, 4].map((i) => {
      const x = 32 + i * 44;
      return (
        <g key={i}>
          <path d={`M ${x - 18} 52 L ${x + 18} 52 L ${x + 13} 78 L ${x - 13} 78 Z`} fill="#d97706" stroke="#78350f" strokeWidth="1.3" />
          <path d={`M ${x - 15} 52 Q ${x} 30 ${x + 15} 52`} fill="none" stroke="#78350f" strokeWidth="1.8" />
          <text x={x} y="70" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#fff">?</text>
        </g>
      );
    })}
    <text x="120" y="94" textAnchor="middle" fontSize="10.5" fill="#365314">5 kosár, mindegyikben ugyanannyi</text>
  </QFig>
);

const GemTableFig: React.FC = () => {
  const cols = [
    { n: 'smaragd', all: '10 000', part: 'fele', c: '#16a34a' },
    { n: 'rubin', all: '1600', part: 'negyede', c: '#dc2626' },
    { n: 'zafír', all: '2700', part: 'harmada', c: '#2563eb' },
    { n: 'topáz', all: '3500', part: 'ötöde', c: '#ca8a04' },
    { n: 'gyémánt', all: '1000', part: 'tizede', c: '#64748b' }
  ];
  return (
    <QFig h={100}>
      {cols.map((c, i) => {
        const x = 10 + i * 44;
        return (
          <g key={c.n}>
            <rect x={x} y="12" width="44" height="22" fill={c.c} stroke="#1e293b" strokeWidth="0.8" />
            <text x={x + 22} y="27" textAnchor="middle" fontSize="8.5" fontWeight="bold" fill="#fff">{c.n}</text>
            <rect x={x} y="34" width="44" height="24" fill="#fff" stroke="#1e293b" strokeWidth="0.8" />
            <text x={x + 22} y="50" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#0f172a">{c.all}</text>
            <rect x={x} y="58" width="44" height="24" fill="#f1f5f9" stroke="#1e293b" strokeWidth="0.8" />
            <text x={x + 22} y="74" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#334155">{c.part}</text>
          </g>
        );
      })}
      <text x="120" y="95" textAnchor="middle" fontSize="10" fill="#334155">bányászott db / ennyi része került a csillékbe</text>
    </QFig>
  );
};

export const MUL_DIV_10000_QUESTIONS: QuizQuestion[] = [
  // ---------------------------- 1. szint ----------------------------
  {
    id: 'md10k-q1',
    level: 1,
    questionTypeBadge: 'Szorzás 100-zal',
    figure: <ShiftFig top={['', '', '', '9']} label="· 100" from={3} to={1} />,
    question: '9 · 100 = ?',
    options: ['900', '90', '9000', '109'],
    correctAnswer: 0,
    explanation: '100-zal szorzáskor a szám végére 2 nullát írunk: 9 · 100 = 900.'
  },
  {
    id: 'md10k-q2',
    level: 1,
    questionTypeBadge: 'Szorzás 1000-rel',
    question: '7 · 1000 = ?',
    options: ['7000', '700', '1007', '70'],
    correctAnswer: 0,
    explanation: '1000-rel szorzáskor 3 nullát írunk a szám végére: 7000.'
  },
  {
    id: 'md10k-q3',
    level: 1,
    questionTypeBadge: 'Osztás 10-zel',
    figure: <ShiftFig top={['', '3', '8', '0']} label=": 10" from={2} to={3} />,
    question: '380 : 10 = ?',
    options: ['38', '3800', '308', '370'],
    correctAnswer: 0,
    explanation: '10-zel osztáskor a szám végéről 1 nullát elhagyunk: 380 : 10 = 38.'
  },
  {
    id: 'md10k-q4',
    figure: <ShiftFig top={['1', '5', '0', '0']} label=": 100" from={1} to={3} />,
    level: 1,
    questionTypeBadge: 'Osztás 100-zal',
    question: '1500 : 100 = ?',
    options: ['15', '150', '1500', '105'],
    correctAnswer: 0,
    explanation: '100-zal osztáskor 2 nullát hagyunk el: 1500 : 100 = 15.'
  },
  {
    id: 'md10k-q5',
    level: 1,
    questionTypeBadge: 'Osztás 1000-rel',
    figure: <ShiftFig top={['9', '0', '0', '0']} label=": 1000" from={0} to={3} />,
    question: '9000 : 1000 = ?',
    options: ['9', '90', '900', '9000'],
    correctAnswer: 0,
    explanation: '1000-rel osztáskor 3 nullát hagyunk el: 9000 : 1000 = 9.'
  },
  {
    id: 'md10k-q6',
    level: 1,
    questionTypeBadge: 'Szöveges feladat',
    question: 'Tatinak 1000 fabatkája van, Tádénak háromszor ennyi. Hány fabatkája van Tádénak?',
    options: ['3000', '1003', '4000', '333'],
    correctAnswer: 0,
    explanation: 'Háromszor ennyi: 3 · 1000 = 3000. (A 4000 az lenne, ha Tatiéhoz hozzáadnánk a 3000-et.)'
  },
  {
    id: 'md10k-q7',
    level: 1,
    questionTypeBadge: 'Persely',
    figure: <PiggyFig coin="10" color="#60a5fa" text="8 érme" />,
    question: 'Teó perselyében 8 darab 10 fabatkás van. Hány fabatkája van?',
    options: ['80', '18', '800', '8'],
    correctAnswer: 0,
    explanation: '8 · 10 = 80 fabatka.'
  },
  {
    id: 'md10k-q8',
    level: 1,
    questionTypeBadge: 'Persely',
    figure: <PiggyFig coin="1000" color="#4ade80" text="6000 fabatka" />,
    question: 'Tódi perselyében csak 1000 fabatkások vannak, összesen 6000 fabatka. Hány érme van benne?',
    options: ['6', '60', '600', '6000'],
    correctAnswer: 0,
    explanation: '6000 : 1000 = 6 érme.'
  },
  {
    id: 'md10k-q9',
    level: 1,
    questionTypeBadge: 'Kerek szám',
    figure: <CoinsFig rows={3} cols={6} value={100} />,
    question: '3 · 600 = ?',
    options: ['1800', '180', '603', '2400'],
    correctAnswer: 0,
    explanation: '3 · 6 sz = 18 sz = 1800. A képen 3 sor van, soronként 6 darab 100-as: 1800.'
  },
  {
    id: 'md10k-q10',
    level: 1,
    questionTypeBadge: 'Kerek szám',
    question: '3600 : 6 = ?',
    options: ['600', '60', '6000', '3000'],
    correctAnswer: 0,
    explanation: '36 sz : 6 = 6 sz = 600. Ellenőrzés: 6 · 600 = 3600.'
  },

  // ---------------------------- 2. szint ----------------------------
  {
    id: 'md10k-q11',
    level: 2,
    questionTypeBadge: 'Kerek tízesek',
    question: '30 · 60 = ?',
    options: ['1800', '180', '900', '1200'],
    correctAnswer: 0,
    explanation: '3 · 6 = 18, és a két tényezőben összesen 2 nulla van: 1800.'
  },
  {
    id: 'md10k-q12',
    level: 2,
    questionTypeBadge: 'Kerek tízesek',
    question: '70 · 40 = ?',
    options: ['2800', '280', '1100', '2700'],
    correctAnswer: 0,
    explanation: '7 · 4 = 28, és még 2 nulla: 2800.'
  },
  {
    id: 'md10k-q13',
    level: 2,
    questionTypeBadge: 'Osztás',
    question: '2400 : 60 = ?',
    options: ['40', '400', '4', '240'],
    correctAnswer: 0,
    explanation: '2400 : 60 = 240 : 6 = 40. Ellenőrzés: 40 · 60 = 2400.'
  },
  {
    id: 'md10k-q14',
    level: 2,
    questionTypeBadge: 'Osztás',
    question: '6400 : 80 = ?',
    options: ['80', '800', '8', '64'],
    correctAnswer: 0,
    explanation: '6400 : 80 = 640 : 8 = 80. Ellenőrzés: 80 · 80 = 6400.'
  },
  {
    id: 'md10k-q15',
    level: 2,
    questionTypeBadge: 'Csoportosítás',
    question: 'Csoportosítsd ügyesen a tényezőket! 4 · 25 · 21 = ?',
    options: ['2100', '210', '2400', '1050'],
    correctAnswer: 0,
    explanation: '4 · 25 = 100, és 100 · 21 = 2100.'
  },
  {
    id: 'md10k-q16',
    level: 2,
    questionTypeBadge: 'Csoportosítás',
    question: '2 · 250 · 2 · 9 = ?',
    options: ['9000', '4500', '900', '5000'],
    correctAnswer: 0,
    explanation: '2 · 250 · 2 = 1000, és 1000 · 9 = 9000.'
  },
  {
    id: 'md10k-q17',
    level: 2,
    questionTypeBadge: 'Szöveges feladat',
    figure: <BasketsFig />,
    question: 'Tóni 150 dkg vargányát szedett, egy gomba 10 dkg. Egyenlően szétosztotta 5 kosárba. Hány gomba került egy kosárba?',
    options: ['3', '30', '15', '5'],
    correctAnswer: 0,
    explanation: '150 : 10 = 15 gomba. 15 : 5 = 3 gomba kerül egy kosárba.'
  },
  {
    id: 'md10k-q18',
    level: 2,
    questionTypeBadge: 'Képről',
    figure: <CoinsFig rows={4} cols={7} value={100} />,
    question: 'Hány fabatka van a képen?',
    options: ['2800', '28', '280', '1100'],
    correctAnswer: 0,
    explanation: '4 sor, soronként 7 darab 100-as: 4 · 700 = 2800 (vagy 7 · 400 = 2800).'
  },
  {
    id: 'md10k-q19',
    level: 2,
    questionTypeBadge: 'Pénz',
    question: 'Bella egy üveg harmatcseppet vesz 2000 fabatkáért. Hány darab 200 fabatkással tudja kifizetni?',
    options: ['10', '100', '4', '1000'],
    correctAnswer: 0,
    explanation: '2000 : 200 = 20 : 2 = 10 darab.'
  },
  {
    id: 'md10k-q20',
    level: 2,
    questionTypeBadge: 'Gondoltam egy számra',
    question: 'Melyik számra gondoltam? A 3200 negyede.',
    options: ['800', '400', '8000', '1600'],
    correctAnswer: 0,
    explanation: 'A negyede: 3200 : 4 = 800 (32 sz : 4 = 8 sz). Az 1600 csak a fele lenne.'
  },

  // ---------------------------- 3. szint ----------------------------
  {
    id: 'md10k-q21',
    level: 3,
    questionTypeBadge: 'Szorzatpiramis',
    figure: <PyrFig rows={[[10, null, null, 1], [null, 10, 5], [null, null], [null]]} />,
    question: 'A szorzatpiramisban mindig az alatta lévő két szám szorzata áll. Melyik szám kerül a csúcsra?',
    options: ['10 000', '1000', '2500', '250'],
    correctAnswer: 0,
    explanation: 'Alul: ? · 1 = 5, tehát 5; ? · 5 = 10, tehát 2. A 2. sor: 10 · 2 = 20. A 3. sor: 20 · 10 = 200 és 10 · 5 = 50. Csúcs: 200 · 50 = 10 000.'
  },
  {
    id: 'md10k-q22',
    level: 3,
    questionTypeBadge: 'Szorzatpiramis',
    figure: <PyrFig rows={[[2, '?', null, null], [10, null, 10], [null, 100], [null]]} />,
    question: 'Melyik szám kerül az alsó sorban a 2 mellé (az első „?” helyére)?',
    options: ['5', '8', '20', '12'],
    correctAnswer: 0,
    explanation: 'A 2 és a keresett szám szorzata 10. Mivel 2 · 5 = 10, a keresett szám 5.'
  },
  {
    id: 'md10k-q23',
    level: 3,
    questionTypeBadge: 'Gondolkodj!',
    question: 'A tavirózsa mindennap kétszer akkora területet borít be. A 100. napon ellepi az egész tavat. Hányadik napon borítja be a tó felét?',
    options: ['A 99. napon', 'Az 50. napon', 'A 98. napon', 'Az 51. napon'],
    correctAnswer: 0,
    explanation: 'Egy nap alatt a terület kétszeresére nő. Ha a 100. napon tele van, akkor egy nappal korábban, a 99. napon volt félig.'
  },
  {
    id: 'md10k-q24',
    level: 3,
    questionTypeBadge: 'Műveleti sorrend',
    question: '30 · 6 + 120 : 2 = ?',
    options: ['240', '150', '300', '186'],
    correctAnswer: 0,
    explanation: 'Előbb szorzunk és osztunk: 30 · 6 = 180, 120 : 2 = 60. Aztán összeadunk: 180 + 60 = 240. (A 150 akkor jönne ki, ha balról jobbra haladnál.)'
  },
  {
    id: 'md10k-q25',
    level: 3,
    questionTypeBadge: 'Műveleti sorrend',
    question: '500 · 7 − 50 · 40 = ?',
    options: ['1500', '3450', '2000', '5500'],
    correctAnswer: 0,
    explanation: '500 · 7 = 3500 és 50 · 40 = 2000. 3500 − 2000 = 1500.'
  },
  {
    id: 'md10k-q26',
    level: 3,
    questionTypeBadge: 'Zárójel',
    question: '10 000 − (300 · 30) = ?',
    options: ['1000', '9000', '9970', '100'],
    correctAnswer: 0,
    explanation: 'Előbb a zárójel: 300 · 30 = 9000. Aztán 10 000 − 9000 = 1000.'
  },
  {
    id: 'md10k-q27',
    level: 3,
    questionTypeBadge: 'Törtrész',
    figure: <GemTableFig />,
    question: 'A koboldok a kibányászott drágakövek egy részét tették a csillékbe (lásd a táblázatot). Hány drágakő került a csillékbe összesen?',
    options: ['7100', '7000', '6200', '8000'],
    correctAnswer: 0,
    explanation: '10 000 : 2 = 5000; 1600 : 4 = 400; 2700 : 3 = 900; 3500 : 5 = 700; 1000 : 10 = 100. Összesen: 5000 + 400 + 900 + 700 + 100 = 7100.'
  },
  {
    id: 'md10k-q28',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    question: 'Debridában 2300 marha van, kétszer annyi sertés, és a sertések számánál 1950-nel kevesebb kecske. Hány állat van összesen?',
    options: ['9550', '6900', '2650', '8550'],
    correctAnswer: 0,
    explanation: 'Sertés: 2 · 2300 = 4600. Kecske: 4600 − 1950 = 2650. Összesen: 2300 + 4600 + 2650 = 9550.'
  },
  {
    id: 'md10k-q29',
    level: 3,
    questionTypeBadge: 'Nyitott mondat',
    question: '□ · 40 > 2400. Melyik szám teszi igazzá?',
    options: ['70', '60', '50', '6'],
    correctAnswer: 0,
    explanation: '70 · 40 = 2800, ez nagyobb 2400-nál. A 60 · 40 = 2400 pont egyenlő, nem nagyobb!'
  },
  {
    id: 'md10k-q30',
    level: 3,
    questionTypeBadge: 'Gondoltam egy számra',
    question: 'Melyik számra gondoltam? A 6000 felénél 2500-zal nagyobb.',
    options: ['5500', '500', '8500', '4250'],
    correctAnswer: 0,
    explanation: 'A 6000 fele: 6000 : 2 = 3000. Ennél 2500-zal nagyobb: 3000 + 2500 = 5500.'
  }
];

export const MulDiv10000Quiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => {
  return (
    <QuizTemplate
      grade={4}
      chapterId="szamolas-10000-ig"
      topicId="g4-count-szorzas-10000-quiz"
      subtopicId="szorzas-osztas-10000-ig"
      title="12. Szorzás és osztás 10 000-ig – Kvíz"
      subtitle="30 feladat 3 szinten: szorzás és osztás 10-zel, 100-zal, 1000-rel, kerek számokkal, műveleti sorrend."
      badge="4. OSZTÁLY • I. SZÁMOLÁS 0-TÓL 10 000-IG • KVÍZ"
      questions={MUL_DIV_10000_QUESTIONS}
      cheatSheets={[
        {
          title: '10, 100, 1000',
          items: [
            '· 10 → 1 nulla a végére (9 · 10 = 90)',
            '· 100 → 2 nulla (9 · 100 = 900)',
            '· 1000 → 3 nulla (9 · 1000 = 9000)',
            ': 10, : 100, : 1000 → 1, 2, 3 nullát elhagyunk (1500 : 100 = 15)'
          ]
        },
        {
          title: 'Kerek számok',
          items: [
            '3 · 600 = 18 sz = 1800',
            '70 · 40: 7 · 4 = 28 → 2800',
            '3600 : 6 = 36 sz : 6 = 600',
            '2400 : 60 = 240 : 6 = 40'
          ]
        },
        {
          title: 'Ügyes trükkök',
          items: [
            '4 · 25 = 100, 2 · 50 = 100, 4 · 250 = 1000',
            'Műveleti sorrend: zárójel → · és : → + és −',
            'Ellenőrizz fordított művelettel: 40 · 60 = 2400',
            'fele = : 2, harmada = : 3, negyede = : 4'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <MulDiv10000Matcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <MulDiv10000Sorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default MulDiv10000Quiz;
