import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { RoundTens100G2Matcher } from './RoundTens100G2Matcher';
import { RoundTens100G2Sorter } from './RoundTens100G2Sorter';
import {
  QFig,
  RodsPart,
  rodsWidth,
  NumLine100Part,
  CoinPart,
  ArrowChainPart,
  PyramidPart,
  RT_UNK
} from './RoundTens100G2Parts';

// ---------------------------------------------------------------------------
// Kérdésábrák
// ---------------------------------------------------------------------------
const RodsQ: React.FC<{
  tens: number;
  ones?: number;
  add?: number;
  cross?: number;
  unknown?: number;
  caption?: string;
}> = ({ tens, ones = 0, add = 0, cross = 0, unknown = 0, caption }) => {
  const w = rodsWidth(tens + add + unknown, ones, 11, 6, 7);
  return (
    <QFig h={caption ? 112 : 92}>
      <RodsPart
        x={(260 - w) / 2}
        y={12}
        tens={tens}
        ones={ones}
        addTens={add}
        crossTens={cross}
        unknownTens={unknown}
        cell={7}
        rodW={11}
        gap={6}
        strokeW={1.5}
      />
      {caption && (
        <text x="130" y="102" textAnchor="middle" fontSize="15" fontWeight="900" fill="#0f172a">
          {caption}
        </text>
      )}
    </QFig>
  );
};

const AnalogyQ: React.FC<{ small: string; big: string }> = ({ small, big }) => (
  <QFig h={96}>
    <text x="20" y="38" fontSize="14" fontWeight="bold" fill="#065f46">Kistesó:</text>
    <text x="110" y="38" fontSize="20" fontWeight="900" fill="#065f46">{small}</text>
    <line x1="14" y1="52" x2="246" y2="52" stroke="#e2e8f0" strokeWidth="1.5" />
    <text x="20" y="78" fontSize="14" fontWeight="bold" fill="#92400e">Tízesek:</text>
    <text x="110" y="78" fontSize="20" fontWeight="900" fill="#92400e">
      {big.split('?')[0]}
      <tspan fill={RT_UNK}>?</tspan>
    </text>
  </QFig>
);

const LineQ: React.FC<{ start: number; hops: number; dir?: 1 | -1 }> = ({ start, hops, dir = 1 }) => (
  <QFig h={112}>
    <NumLine100Part x0={16} w={228} y={66} start={start} hops={hops} dir={dir} />
  </QFig>
);

const CoinsQ: React.FC<{ coins: (10 | 20 | 50)[] }> = ({ coins }) => {
  const step = 46;
  const x0 = 130 - ((coins.length - 1) * step) / 2;
  return (
    <QFig h={80}>
      {coins.map((c, i) => (
        <CoinPart key={i} cx={x0 + i * step} cy={40} value={c} scale={1.35} />
      ))}
    </QFig>
  );
};

const ChainQ: React.FC<{ boxes: string[]; ops: string[] }> = ({ boxes, ops }) => (
  <QFig h={92}>
    <ArrowChainPart y={36} boxes={boxes} ops={ops} />
  </QFig>
);

const PlaceTableQ: React.FC<{ rows: [string, string, string][] }> = ({ rows }) => (
  <QFig h={46 + rows.length * 30}>
    <rect x="70" y="10" width="60" height="26" fill="#ffedd5" stroke="#b45309" strokeWidth="1.5" />
    <rect x="130" y="10" width="60" height="26" fill="#d1fae5" stroke="#047857" strokeWidth="1.5" />
    <text x="100" y="28" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#92400e">tízes</text>
    <text x="160" y="28" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#065f46">egyes</text>
    {rows.map(([sign, t, e], i) => {
      const y = 36 + i * 30;
      const isQ = t === '?';
      return (
        <g key={i}>
          <text x="52" y={y + 21} textAnchor="middle" fontSize="20" fontWeight="900" fill="#334155">{sign}</text>
          <rect x="70" y={y} width="60" height="30" fill="#fff" stroke="#b45309" strokeWidth="1.5" />
          <rect x="130" y={y} width="60" height="30" fill="#fff" stroke="#047857" strokeWidth="1.5" />
          <text x="100" y={y + 22} textAnchor="middle" fontSize="20" fontWeight="900" fill={isQ ? RT_UNK : '#0f172a'}>{t}</text>
          <text x="160" y={y + 22} textAnchor="middle" fontSize="20" fontWeight="900" fill={e === '?' ? RT_UNK : '#0f172a'}>{e}</text>
        </g>
      );
    })}
  </QFig>
);

const PriceQ: React.FC<{ item: 'ball' | 'book'; price: number; coins: (10 | 20 | 50)[] }> = ({ item, price, coins }) => (
  <QFig h={100}>
    {item === 'ball' ? (
      <g>
        <circle cx="56" cy="50" r="28" fill="#f97316" stroke="#9a3412" strokeWidth="2.5" />
        <path d="M 30 42 Q 56 58 82 42 M 34 64 Q 56 48 78 64" fill="none" stroke="#fff" strokeWidth="3" />
      </g>
    ) : (
      <g>
        <rect x="30" y="24" width="52" height="54" rx="4" fill="#60a5fa" stroke="#1e3a8a" strokeWidth="2.5" />
        <line x1="40" y1="24" x2="40" y2="78" stroke="#1e3a8a" strokeWidth="2" />
      </g>
    )}
    <rect x="92" y="18" width="62" height="28" rx="6" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
    <text x="123" y="38" textAnchor="middle" fontSize="16" fontWeight="900" fill="#78350f">{price} Ft</text>
    <text x="123" y="72" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#475569">Neked van:</text>
    {coins.map((c, i) => (
      <CoinPart key={i} cx={190 + i * 38} cy={60} value={c} scale={1.25} />
    ))}
  </QFig>
);

const CardsQ: React.FC<{ items: string[] }> = ({ items }) => {
  const bw = 40;
  const gap = 8;
  const x0 = 130 - (items.length * bw + (items.length - 1) * gap) / 2;
  return (
    <QFig h={70}>
      {items.map((t, i) => (
        <g key={i}>
          <rect
            x={x0 + i * (bw + gap)}
            y="16"
            width={bw}
            height="38"
            rx="8"
            fill={t === '?' ? '#fee2e2' : '#fef3c7'}
            stroke={t === '?' ? RT_UNK : '#d97706'}
            strokeWidth="2"
          />
          <text x={x0 + i * (bw + gap) + bw / 2} y="42" textAnchor="middle" fontSize="18" fontWeight="900" fill={t === '?' ? RT_UNK : '#78350f'}>
            {t}
          </text>
        </g>
      ))}
    </QFig>
  );
};

const BeadsQ: React.FC<{ first: number; second: number }> = ({ first, second }) => (
  <QFig h={104}>
    {Array.from({ length: first + second }, (_, s) => (
      <g key={s}>
        <line x1="30" y1={14 + s * 11} x2="230" y2={14 + s * 11} stroke="#94a3b8" strokeWidth="1.2" />
        {Array.from({ length: 10 }, (_, b) => (
          <circle
            key={b}
            cx={40 + b * 19}
            cy={14 + s * 11}
            r="4.6"
            fill={s < first ? '#ec4899' : '#a855f7'}
            stroke={s < first ? '#9d174d' : '#581c87'}
            strokeWidth="1"
          />
        ))}
      </g>
    ))}
    <text x="245" y="98" textAnchor="end" fontSize="11" fill="#475569">1 sor = 10 gyöngy</text>
  </QFig>
);

// ---------------------------------------------------------------------------
// Kérdések
// ---------------------------------------------------------------------------
export const ROUND_TENS100_G2_QUESTIONS: QuizQuestion[] = [
  // ---------- 1. szint ----------
  {
    id: 'rt100g2-q1',
    level: 1,
    questionTypeBadge: 'Tízesrudak',
    figure: <RodsQ tens={3} add={5} caption="30 + 50 = ?" />,
    question: 'Mennyi 30 + 50?',
    options: ['80', '8', '70', '35'],
    correctAnswer: 0,
    explanation: '3 tízes + 5 tízes = 8 tízes. Ez 80.'
  },
  {
    id: 'rt100g2-q2',
    level: 1,
    questionTypeBadge: 'Kistesó',
    figure: <AnalogyQ small="2 + 4 = 6" big="20 + 40 = ?" />,
    question: 'Mennyi 20 + 40?',
    options: ['60', '6', '24', '50'],
    correctAnswer: 0,
    explanation: '2 + 4 = 6, ezért 2 tízes + 4 tízes = 6 tízes = 60.'
  },
  {
    id: 'rt100g2-q3',
    level: 1,
    questionTypeBadge: 'Elvétel',
    figure: <RodsQ tens={7} cross={3} caption="70 − 30 = ?" />,
    question: 'Mennyi 70 − 30?',
    options: ['40', '4', '100', '30'],
    correctAnswer: 0,
    explanation: '7 rúdból 3-at áthúztunk. Marad 4 rúd: 40.'
  },
  {
    id: 'rt100g2-q4',
    level: 1,
    questionTypeBadge: 'Kistesó',
    figure: <AnalogyQ small="9 − 4 = 5" big="90 − 40 = ?" />,
    question: 'Mennyi 90 − 40?',
    options: ['50', '5', '60', '40'],
    correctAnswer: 0,
    explanation: '9 − 4 = 5, ezért 9 tízes − 4 tízes = 5 tízes = 50.'
  },
  {
    id: 'rt100g2-q5',
    level: 1,
    questionTypeBadge: 'Kerek tízes',
    figure: <RodsQ tens={6} />,
    question: 'Hányat raktunk ki tízesrudakkal?',
    options: ['60', '6', '16', '70'],
    correctAnswer: 0,
    explanation: '6 tízesrúd van. 6 tízes = 60.'
  },
  {
    id: 'rt100g2-q6',
    level: 1,
    questionTypeBadge: 'Összeadás',
    question: 'Mennyi 10 + 80?',
    options: ['90', '18', '80', '100'],
    correctAnswer: 0,
    explanation: '1 tízes + 8 tízes = 9 tízes = 90.'
  },
  {
    id: 'rt100g2-q7',
    level: 1,
    questionTypeBadge: 'Számegyenes',
    figure: <LineQ start={40} hops={2} />,
    question: 'Hova érkezel? 40 + 20 = ?',
    options: ['60', '42', '50', '70'],
    correctAnswer: 0,
    explanation: 'Két tízes ugrás: 40 → 50 → 60.'
  },
  {
    id: 'rt100g2-q8',
    level: 1,
    questionTypeBadge: 'Elvétel 100-ból',
    figure: <RodsQ tens={10} cross={6} caption="100 − 60 = ?" />,
    question: 'Mennyi 100 − 60?',
    options: ['40', '50', '4', '60'],
    correctAnswer: 0,
    explanation: '10 tízesből 6-ot elveszünk. Marad 4 tízes: 40.'
  },
  {
    id: 'rt100g2-q9',
    level: 1,
    questionTypeBadge: 'Összeadás',
    question: 'Mennyi 50 + 50?',
    options: ['100', '10', '55', '90'],
    correctAnswer: 0,
    explanation: '5 tízes + 5 tízes = 10 tízes = 100.'
  },
  {
    id: 'rt100g2-q10',
    level: 1,
    questionTypeBadge: 'Pénz',
    figure: <CoinsQ coins={[20, 20, 10]} />,
    question: 'Mennyi pénz van itt?',
    options: ['50 Ft', '30 Ft', '40 Ft', '5 Ft'],
    correctAnswer: 0,
    explanation: '20 + 20 = 40, és 40 + 10 = 50 Ft.'
  },

  // ---------- 2. szint ----------
  {
    id: 'rt100g2-q11',
    level: 2,
    questionTypeBadge: 'Kétjegyű + tízes',
    figure: <RodsQ tens={4} ones={7} add={3} caption="47 + 30 = ?" />,
    question: 'Mennyi 47 + 30?',
    options: ['77', '50', '67', '87'],
    correctAnswer: 0,
    explanation: '4 tízes + 3 tízes = 7 tízes. A 7 egyes marad: 77.'
  },
  {
    id: 'rt100g2-q12',
    level: 2,
    questionTypeBadge: 'Kétjegyű − tízes',
    figure: <RodsQ tens={8} ones={6} cross={5} caption="86 − 50 = ?" />,
    question: 'Mennyi 86 − 50?',
    options: ['36', '81', '46', '30'],
    correctAnswer: 0,
    explanation: '8 tízes − 5 tízes = 3 tízes. A 6 egyes marad: 36.'
  },
  {
    id: 'rt100g2-q13',
    level: 2,
    questionTypeBadge: 'Számegyenes',
    figure: <LineQ start={25} hops={4} />,
    question: 'Hova érkezel? 25 + 40 = ?',
    options: ['65', '29', '55', '64'],
    correctAnswer: 0,
    explanation: 'Négy tízes ugrás: 25 → 35 → 45 → 55 → 65.'
  },
  {
    id: 'rt100g2-q14',
    level: 2,
    questionTypeBadge: 'Visszafelé ugrás',
    figure: <LineQ start={63} hops={2} dir={-1} />,
    question: 'Hova érkezel? 63 − 20 = ?',
    options: ['43', '61', '53', '83'],
    correctAnswer: 0,
    explanation: 'Két tízes ugrás vissza: 63 → 53 → 43.'
  },
  {
    id: 'rt100g2-q15',
    level: 2,
    questionTypeBadge: 'Hiányzó szám',
    figure: <RodsQ tens={3} unknown={5} caption="30 + ? = 80" />,
    question: 'Melyik szám illik a helyére? 30 + □ = 80',
    options: ['50', '5', '40', '60'],
    correctAnswer: 0,
    explanation: '3 tízeshez 5 tízes kell, hogy 8 tízes legyen. □ = 50.'
  },
  {
    id: 'rt100g2-q16',
    level: 2,
    questionTypeBadge: 'Hiányzó szám',
    question: 'Melyik szám illik a helyére? 90 − □ = 20',
    options: ['70', '7', '60', '80'],
    correctAnswer: 0,
    explanation: '9 tízesből 7 tízest kell elvenni, hogy 2 tízes maradjon. □ = 70.'
  },
  {
    id: 'rt100g2-q17',
    level: 2,
    questionTypeBadge: 'Helyiérték',
    figure: <PlaceTableQ rows={[[' ', '5', '2'], ['+', '4', '0'], ['=', '?', '?']]} />,
    question: 'Mennyi 52 + 40?',
    options: ['92', '56', '82', '96'],
    correctAnswer: 0,
    explanation: 'Tízesek: 5 + 4 = 9. Egyesek: 2 + 0 = 2. Tehát 92.'
  },
  {
    id: 'rt100g2-q18',
    level: 2,
    questionTypeBadge: 'Kétjegyű − tízes',
    figure: <RodsQ tens={7} ones={4} cross={4} caption="74 − 40 = ?" />,
    question: 'Mennyi 74 − 40?',
    options: ['34', '70', '44', '33'],
    correctAnswer: 0,
    explanation: '7 tízes − 4 tízes = 3 tízes. A 4 egyes marad: 34.'
  },
  {
    id: 'rt100g2-q19',
    level: 2,
    questionTypeBadge: 'Melyik az?',
    question: 'Melyik művelet eredménye 60?',
    options: ['20 + 40', '20 + 4', '80 − 10', '30 + 40'],
    correctAnswer: 0,
    explanation: '20 + 40 = 60. A többi: 20 + 4 = 24, 80 − 10 = 70, 30 + 40 = 70.'
  },
  {
    id: 'rt100g2-q20',
    level: 2,
    questionTypeBadge: 'Legnagyobb',
    question: 'Melyik a legnagyobb?',
    options: ['50 + 40', '60 + 20', '100 − 30', '40 + 40'],
    correctAnswer: 0,
    explanation: '50 + 40 = 90. A többi: 80, 70, 80. A 90 a legnagyobb.'
  },

  // ---------- 3. szint ----------
  {
    id: 'rt100g2-q21',
    level: 3,
    questionTypeBadge: 'Két lépés',
    figure: <ChainQ boxes={['80', '□', '?']} ops={['− 50', '− 20']} />,
    question: 'Mennyi 80 − 50 − 20?',
    options: ['10', '30', '0', '20'],
    correctAnswer: 0,
    explanation: 'Előbb 80 − 50 = 30. Aztán 30 − 20 = 10.'
  },
  {
    id: 'rt100g2-q22',
    level: 3,
    questionTypeBadge: 'Három tag',
    figure: <RodsQ tens={5} add={4} caption="30 + 20 + 40 = ?" />,
    question: 'Mennyi 30 + 20 + 40?',
    options: ['90', '80', '100', '9'],
    correctAnswer: 0,
    explanation: '30 + 20 = 50, és 50 + 40 = 90.'
  },
  {
    id: 'rt100g2-q23',
    level: 3,
    questionTypeBadge: '100 bontása',
    figure: <RodsQ tens={3} unknown={7} caption="100 = 30 + ?" />,
    question: 'Melyik szám illik a helyére? 100 = 30 + □',
    options: ['70', '60', '80', '7'],
    correctAnswer: 0,
    explanation: '10 tízes = 3 tízes + 7 tízes. □ = 70.'
  },
  {
    id: 'rt100g2-q24',
    level: 3,
    questionTypeBadge: 'Vásárlás',
    figure: <PriceQ item="ball" price={70} coins={[50]} />,
    question: 'A labda 70 Ft. Van 50 Ft-od. Hány Ft hiányzik még?',
    options: ['20 Ft', '30 Ft', '10 Ft', '50 Ft'],
    correctAnswer: 0,
    explanation: '50 + 20 = 70. Még 20 Ft kell.'
  },
  {
    id: 'rt100g2-q25',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    figure: <BeadsQ first={4} second={3} />,
    question: 'Lili 40 gyöngyöt fűzött fel. Még 30-at fűz. Hány gyöngy lesz a láncon?',
    options: ['70', '10', '43', '60'],
    correctAnswer: 0,
    explanation: '40 + 30 = 70 gyöngy. (4 sor + 3 sor = 7 sor.)'
  },
  {
    id: 'rt100g2-q26',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    figure: <ChainQ boxes={['90', '?']} ops={['− 60']} />,
    question: 'A polcon 90 könyv volt. 60-at kivittek. Hány könyv maradt?',
    options: ['30', '40', '20', '3'],
    correctAnswer: 0,
    explanation: '90 − 60 = 30. Mondd tízesekkel: 9 − 6 = 3 tízes.'
  },
  {
    id: 'rt100g2-q27',
    level: 3,
    questionTypeBadge: 'Hiányzó szám',
    question: 'Melyik szám illik a helyére? 58 + □ = 98',
    options: ['40', '4', '30', '50'],
    correctAnswer: 0,
    explanation: 'Az egyes (8) marad. 5 tízesből 9 tízes lesz: 4 tízes kell. □ = 40.'
  },
  {
    id: 'rt100g2-q28',
    level: 3,
    questionTypeBadge: 'Számpiramis',
    figure: (
      <QFig h={100}>
        <PyramidPart cx={130} y={12} rows={[['?'], ['30', '50'], ['10', '20', '30']]} />
      </QFig>
    ),
    question: 'Mi kerül a piramis tetejére? (Két szomszéd tégla összege kerül föléjük.)',
    options: ['80', '60', '50', '70'],
    correctAnswer: 0,
    explanation: '10 + 20 = 30, 20 + 30 = 50. A tetején: 30 + 50 = 80.'
  },
  {
    id: 'rt100g2-q29',
    level: 3,
    questionTypeBadge: 'Sorozat',
    figure: <CardsQ items={['15', '25', '35', '45', '?']} />,
    question: 'Hogyan folytatódik? 15, 25, 35, 45, …',
    options: ['55', '46', '50', '65'],
    correctAnswer: 0,
    explanation: 'Mindig 10-zel nő: 45 + 10 = 55.'
  },
  {
    id: 'rt100g2-q30',
    level: 3,
    questionTypeBadge: 'Gondoltam egy számot',
    question: 'Gondoltam egy számot. 30-cal nagyobb, mint 46. Melyik ez?',
    options: ['76', '16', '49', '66'],
    correctAnswer: 0,
    explanation: '30-cal nagyobb: 46 + 30 = 76.'
  }
];

export const RoundTens100G2Quiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => (
  <QuizTemplate
    grade={2}
    chapterId="szamolas-100-ig"
    topicId="g2-c100-kerek-quiz"
    subtopicId="osszeadas-kivonas-kerek-tizesekkel"
    title="4. Összeadás, kivonás kerek tízesekkel – Kvíz"
    subtitle="30 feladat 3 szinten: kerek tízesek, kétjegyű szám ± kerek tízes, hiányzó szám, pénz és rövid szöveges feladatok."
    badge="2. OSZTÁLY • III. SZÁMKÖRBŐVÍTÉS ÉS SZÁMOLÁS 100-IG • KVÍZ"
    questions={ROUND_TENS100_G2_QUESTIONS}
    cheatSheets={[
      {
        title: 'Kerek tízesek',
        items: ['1 tízesrúd = 10', '3 + 5 = 8 → 30 + 50 = 80', '9 − 4 = 5 → 90 − 40 = 50', '10 tízes = 100']
      },
      {
        title: 'Kétjegyű ± kerek tízes',
        items: ['47 + 30 = 77 (4 + 3 = 7 tízes)', '86 − 50 = 36 (8 − 5 = 3 tízes)', 'Az egyesek nem változnak!', '+ 40 = négy tízes ugrás']
      },
      {
        title: 'Hiányzó szám és pénz',
        items: ['30 + □ = 80 → □ = 50', '100 = 30 + 70', '70 Ft = 50 Ft + 20 Ft', 'Két lépésnél balról jobbra!']
      }
    ]}
    onBack={onBack}
    onSwitchToTheory={onSwitchToTheory}
    onSwitchToMatcher={onSwitchToMatcher}
    onSwitchToSorter={onSwitchToSorter}
    initialGameMode={initialGameMode}
    matcherComponent={
      <RoundTens100G2Matcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />
    }
    sorterComponent={
      <RoundTens100G2Sorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />
    }
  />
);

export default RoundTens100G2Quiz;
