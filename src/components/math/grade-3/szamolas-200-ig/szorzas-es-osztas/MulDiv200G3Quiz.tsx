import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { MulDiv200G3Matcher } from './MulDiv200G3Matcher';
import { MulDiv200G3Sorter } from './MulDiv200G3Sorter';
import { QFig, RodGroups, CoinRows, Coin, Jumps, Plates, BigEq, Tag, Box, UNK, INK } from './MulDiv200G3Parts';

// ---------------------------------------------------------------------------
// Kérdésábrák
// ---------------------------------------------------------------------------

/** Dobozok sorban, mindegyiken egy felirat. */
const BoxesFig: React.FC<{ n: number; label: string; extra?: React.ReactNode; h?: number; y?: number }> = ({ n, label, extra, h = 80, y = 22 }) => {
  const w = 34;
  const gap = Math.min(10, (220 - n * w) / Math.max(1, n - 1));
  const x0 = 120 - (n * w + (n - 1) * gap) / 2;
  return (
    <QFig h={h}>
      {Array.from({ length: n }).map((_, i) => (
        <Box key={i} x={x0 + i * (w + gap)} y={y} label={label} />
      ))}
      {extra}
    </QFig>
  );
};

/** Műveletlánc: értékek körben, köztük nyilak. */
const ChainFig: React.FC<{ values: string[]; ops: string[] }> = ({ values, ops }) => {
  const n = values.length;
  const step = 200 / (n - 1);
  return (
    <QFig h={80}>
      {values.map((v, i) => {
        const cx = 20 + i * step;
        const unk = v.includes('?');
        return (
          <g key={i}>
            <circle cx={cx} cy="46" r="16" fill={unk ? '#fee2e2' : '#fff'} stroke={unk ? UNK : '#2563eb'} strokeWidth="2" />
            <text x={cx} y="51" textAnchor="middle" fontSize="13" fontWeight="bold" fill={unk ? UNK : INK}>
              {v}
            </text>
          </g>
        );
      })}
      {ops.map((o, i) => {
        const a = 20 + i * step + 18;
        const b = 20 + (i + 1) * step - 18;
        return (
          <g key={i}>
            <line x1={a} y1="46" x2={b - 2} y2="46" stroke="#f97316" strokeWidth="2" />
            <path d={`M ${b} 46 l -7 -4 v 8 Z`} fill="#f97316" />
            <text x={(a + b) / 2} y="30" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#c2410c">
              {o}
            </text>
          </g>
        );
      })}
    </QFig>
  );
};

/** Két-három sorban felírt műveletek; a ?-es sor piros. */
const LinesFig: React.FC<{ lines: string[] }> = ({ lines }) => (
  <QFig h={24 + lines.length * 30}>
    {lines.map((l, i) => (
      <BigEq key={i} text={l} y={40 + i * 30} fs={20} />
    ))}
  </QFig>
);

/** Széksorok: n sor, mindegyik végén a darabszám. */
const SeatRowsFig: React.FC<{ rows: number; per: string }> = ({ rows, per }) => (
  <QFig h={24 + rows * 14}>
    {Array.from({ length: rows }).map((_, r) => (
      <g key={r}>
        {Array.from({ length: 8 }).map((__, k) => (
          <rect key={k} x={24 + k * 15 + (k >= 6 ? 22 : 0)} y={14 + r * 14} width="11" height="9" rx="2" fill="#a78bfa" stroke="#5b21b6" strokeWidth="0.8" />
        ))}
        <text x="125" y={22 + r * 14} textAnchor="middle" fontSize="10" fill="#334155">
          …
        </text>
        <text x="182" y={22 + r * 14} fontSize="10" fill="#334155">
          {per} szék
        </text>
      </g>
    ))}
  </QFig>
);

export const MUL_DIV_200_G3_QUESTIONS: QuizQuestion[] = [
  // ------------------------------------------------------------------ 1. szint
  {
    id: 'md200-q1',
    level: 1,
    questionTypeBadge: 'Tízesrudak',
    figure: (
      <QFig h={88}>
        <RodGroups groups={2} per={6} y={16} rodH={56} />
      </QFig>
    ),
    question: 'Egy kék rúd 10-et ér. Mennyit ér a két csoport együtt?',
    options: ['120', '12', '60', '140'],
    correctAnswer: 0,
    explanation: '2 csoport, mindegyikben 6 tízes. 2 · 6 tízes = 12 tízes, ez 120. Tehát 2 · 60 = 120.'
  },
  {
    id: 'md200-q2',
    level: 1,
    questionTypeBadge: 'Szorzás',
    question: 'Mennyi 3 · 50?',
    options: ['150', '15', '53', '120'],
    correctAnswer: 0,
    explanation: '50 = 5 tízes. 3 · 5 tízes = 15 tízes, ez 150.'
  },
  {
    id: 'md200-q3',
    level: 1,
    questionTypeBadge: 'Pénz',
    figure: (
      <QFig h={60}>
        <CoinRows v={20} n={6} y={30} />
      </QFig>
    ),
    question: 'Hány forint van a képen?',
    options: ['120 Ft', '12 Ft', '100 Ft', '140 Ft'],
    correctAnswer: 0,
    explanation: '6 darab 20 forintos: 6 · 20 = 120. Ez 120 Ft.'
  },
  {
    id: 'md200-q4',
    level: 1,
    questionTypeBadge: 'Osztás',
    question: 'Mennyi 80 : 2?',
    options: ['40', '4', '78', '160'],
    correctAnswer: 0,
    explanation: '80 = 8 tízes. 8 tízes : 2 = 4 tízes, ez 40. Ellenőrzés: 40 · 2 = 80.'
  },
  {
    id: 'md200-q5',
    level: 1,
    questionTypeBadge: 'Részekre osztás',
    figure: (
      <QFig h={124}>
        <BigEq text="90 Ft" y={34} fs={20} />
        <Plates n={3} y={74} r={24} label="3 persely" />
      </QFig>
    ),
    question: '90 forintot 3 perselybe teszel, egyformán. Mennyi kerül egy perselybe?',
    options: ['30 Ft', '3 Ft', '87 Ft', '20 Ft'],
    correctAnswer: 0,
    explanation: '90 : 3 = 30, mert 9 tízes : 3 = 3 tízes. Mindegyik perselybe 30 Ft kerül.'
  },
  {
    id: 'md200-q6',
    level: 1,
    questionTypeBadge: 'Összeadásból szorzás',
    figure: <BoxesFig n={4} label="40" h={70} y={20} />,
    question: 'Melyik szorzás illik ehhez: 40 + 40 + 40 + 40?',
    options: ['4 · 40', '40 · 40', '4 + 40', '3 · 40'],
    correctAnswer: 0,
    explanation: 'Négyszer adtuk össze a 40-et. Ez 4 · 40 = 160.'
  },
  {
    id: 'md200-q7',
    level: 1,
    questionTypeBadge: 'Szorzás',
    question: 'Mennyi 7 · 20?',
    options: ['140', '14', '27', '120'],
    correctAnswer: 0,
    explanation: '7 · 2 tízes = 14 tízes, ez 140.'
  },
  {
    id: 'md200-q8',
    level: 1,
    questionTypeBadge: 'Bennfoglalás',
    figure: (
      <QFig h={100}>
        <Jumps to={120} size={30} y={70} labelEvery={30} />
      </QFig>
    ),
    question: 'A béka 30-asával ugrál a 0-tól. Hány ugrással ér a 120-hoz?',
    options: ['4', '3', '30', '90'],
    correctAnswer: 0,
    explanation: '30, 60, 90, 120: ez 4 ugrás. 120 : 30 = 4.'
  },
  {
    id: 'md200-q9',
    level: 1,
    questionTypeBadge: 'Osztás',
    question: 'Mennyi 200 : 10?',
    options: ['20', '2', '190', '100'],
    correctAnswer: 0,
    explanation: 'A 200 éppen 20 tízes. Ezért 200 : 10 = 20. Ellenőrzés: 20 · 10 = 200.'
  },
  {
    id: 'md200-q10',
    level: 1,
    questionTypeBadge: 'A számok neve',
    figure: (
      <QFig h={90}>
        <BigEq text="4 · 30 = 120" y={46} fs={26} />
        <path d="M 185 56 L 185 70" stroke={UNK} strokeWidth="2" />
        <path d="M 180 62 L 185 56 L 190 62" stroke={UNK} strokeWidth="2" fill="none" />
        <text x="185" y="84" textAnchor="middle" fontSize="13" fontWeight="bold" fill={UNK}>
          ?
        </text>
      </QFig>
    ),
    question: 'Hogy hívjuk a 120-at ebben a szorzásban?',
    options: ['szorzat', 'tényező', 'hányados', 'osztó'],
    correctAnswer: 0,
    explanation: 'Tényező · tényező = szorzat. A 4 és a 30 a tényezők, a 120 a szorzat.'
  },

  // ------------------------------------------------------------------ 2. szint
  {
    id: 'md200-q11',
    level: 2,
    questionTypeBadge: 'Szorzótábla segít',
    figure: <LinesFig lines={['6 · 3 = 18', '6 · 30 = ?']} />,
    question: 'Tudod, hogy 6 · 3 = 18. Mennyi 6 · 30?',
    options: ['180', '18', '160', '36'],
    correctAnswer: 0,
    explanation: 'A 30 tízszer akkora, mint a 3. Ezért a szorzat is tízszer akkora: 6 · 30 = 180.'
  },
  {
    id: 'md200-q12',
    level: 2,
    questionTypeBadge: 'Bennfoglalás',
    figure: (
      <QFig h={100}>
        <Jumps to={200} size={40} showJumps={1} y={72} labelEvery={40} jumpLabel="+ 40" />
        <text x="188" y="40" textAnchor="middle" fontSize="12" fontWeight="bold" fill={UNK}>
          160-ig?
        </text>
      </QFig>
    ),
    question: 'Mennyi 160 : 40?',
    options: ['4', '40', '120', '8'],
    correctAnswer: 0,
    explanation: 'Hányszor van meg a 40 a 160-ban? 40, 80, 120, 160: négyszer. 16 tízes : 4 tízes = 4.'
  },
  {
    id: 'md200-q13',
    level: 2,
    questionTypeBadge: 'Hiányzó tényező',
    figure: (
      <QFig h={70}>
        <BigEq text="□ · 50 = 200" y={44} fs={26} />
      </QFig>
    ),
    question: 'Melyik szám kerül a □ helyére?',
    options: ['4', '40', '150', '5'],
    correctAnswer: 0,
    explanation: '50, 100, 150, 200: négy 50-es kell. 4 · 50 = 200.'
  },
  {
    id: 'md200-q14',
    level: 2,
    questionTypeBadge: 'Hiányzó osztó',
    figure: (
      <QFig h={70}>
        <BigEq text="180 : □ = 20" y={44} fs={26} />
      </QFig>
    ),
    question: 'Melyik szám kerül a □ helyére?',
    options: ['9', '90', '160', '8'],
    correctAnswer: 0,
    explanation: 'Ellenőrizz szorzással: 20 · 9 = 180. Tehát 180 : 9 = 20.'
  },
  {
    id: 'md200-q15',
    level: 2,
    questionTypeBadge: 'Bennfoglalás',
    figure: (
      <QFig h={88}>
        <RodGroups groups={3} per={5} y={16} rodH={56} />
      </QFig>
    ),
    question: '150-et 50-esével csoportosítottunk. Hányszor van meg az 50 a 150-ben?',
    options: ['3', '30', '5', '100'],
    correctAnswer: 0,
    explanation: '3 csoport lett, mindegyikben 5 tízes. 150 : 50 = 3, mert 3 · 50 = 150.'
  },
  {
    id: 'md200-q16',
    level: 2,
    questionTypeBadge: 'Összehasonlítás',
    question: 'Melyik szorzat a legnagyobb?',
    options: ['4 · 40', '3 · 50', '2 · 70', '5 · 20'],
    correctAnswer: 0,
    explanation: '4 · 40 = 160, 3 · 50 = 150, 2 · 70 = 140, 5 · 20 = 100. A legnagyobb a 160.'
  },
  {
    id: 'md200-q17',
    level: 2,
    questionTypeBadge: 'Pénz',
    figure: (
      <QFig h={86}>
        <CoinRows v={20} n={9} perRow={5} y={24} />
      </QFig>
    ),
    question: 'Hány forint van a képen?',
    options: ['180 Ft', '18 Ft', '160 Ft', '200 Ft'],
    correctAnswer: 0,
    explanation: '9 darab 20 forintos: 9 · 20 = 180. Ez 180 Ft.'
  },
  {
    id: 'md200-q18',
    level: 2,
    questionTypeBadge: 'Pénzváltás',
    figure: (
      <QFig h={70}>
        <text x="60" y="42" textAnchor="middle" fontSize="20" fontWeight="bold" fill={INK}>
          140 Ft =
        </text>
        <text x="118" y="42" textAnchor="middle" fontSize="20" fontWeight="bold" fill={UNK}>
          ?
        </text>
        <text x="132" y="42" fontSize="16" fill={INK}>
          ·
        </text>
        <Coin cx={168} cy={36} v={10} r={17} />
      </QFig>
    ),
    question: 'Hány darab 10 forintos ér annyit, mint 140 forint?',
    options: ['14', '4', '140', '13'],
    correctAnswer: 0,
    explanation: '140 = 14 tízes. 140 : 10 = 14, tehát 14 darab 10 forintos kell.'
  },
  {
    id: 'md200-q19',
    level: 2,
    questionTypeBadge: 'Részekre osztás',
    figure: (
      <QFig h={100}>
        <BigEq text="120" y={30} fs={20} />
        <Plates n={4} rods={3} y={68} r={24} />
      </QFig>
    ),
    question: 'A 120-at szétosztottuk a tányérokra. Melyik osztás illik a képhez?',
    options: ['120 : 4 = 30', '120 : 3 = 40', '12 : 4 = 3', '120 : 40 = 3'],
    correctAnswer: 0,
    explanation: '4 tányér van, mindegyiken 3 tízes, vagyis 30. Tehát 120 : 4 = 30.'
  },
  {
    id: 'md200-q20',
    level: 2,
    questionTypeBadge: 'Összefüggés',
    figure: <LinesFig lines={['12 : 3 = 4', '120 : 30 = ?']} />,
    question: 'Tudod, hogy 12 : 3 = 4. Mennyi 120 : 30?',
    options: ['4', '40', '400', '90'],
    correctAnswer: 0,
    explanation: 'Az osztandó és az osztó is tízszer akkora lett. A hányados ugyanannyi marad: 120 : 30 = 4. Ellenőrzés: 4 · 30 = 120.'
  },

  // ------------------------------------------------------------------ 3. szint
  {
    id: 'md200-q21',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    figure: <BoxesFig n={4} label="30" h={70} y={20} />,
    question: 'Dorka 4 csomag matricát vett. Egy csomagban 30 matrica van. 50 matricát elajándékozott. Hány matricája maradt?',
    options: ['70', '120', '170', '60'],
    correctAnswer: 0,
    explanation: 'Először: 4 · 30 = 120 matrica. Aztán: 120 − 50 = 70. Dorka 70 matricája maradt.'
  },
  {
    id: 'md200-q22',
    level: 3,
    questionTypeBadge: 'Pénz',
    figure: (
      <QFig h={70}>
        <Tag x={22} y={14} text="60 Ft" />
        <Tag x={92} y={14} text="60 Ft" />
        <Tag x={162} y={14} text="60 Ft" />
        <text x="120" y="58" textAnchor="middle" fontSize="12" fill="#334155">
          Fizetsz: 200 Ft
        </text>
      </QFig>
    ),
    question: 'Egy gombóc fagyi 60 Ft. Három gombócot veszel, és 200 forinttal fizetsz. Mennyit kapsz vissza?',
    options: ['20 Ft', '180 Ft', '140 Ft', '40 Ft'],
    correctAnswer: 0,
    explanation: 'A fagyi ára: 3 · 60 = 180 Ft. A visszajáró: 200 − 180 = 20 Ft.'
  },
  {
    id: 'md200-q23',
    level: 3,
    questionTypeBadge: 'Nyitott mondat',
    figure: (
      <QFig h={70}>
        <BigEq text="60 < □ · 30 < 150" y={44} fs={22} />
      </QFig>
    ),
    question: 'Melyik szám teszi igazzá?',
    options: ['3', '2', '5', '1'],
    correctAnswer: 0,
    explanation: '3 · 30 = 90, és 90 a 60 és a 150 között van. 2 · 30 = 60 nem nagyobb 60-nál, 5 · 30 = 150 nem kisebb 150-nél.'
  },
  {
    id: 'md200-q24',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    figure: <SeatRowsFig rows={7} per="20" />,
    question: 'A bábszínházban 7 sor van, egy sorban 20 szék. 30 néző még nem érkezett meg, a többi szék foglalt. Hányan ülnek már?',
    options: ['110', '140', '170', '120'],
    correctAnswer: 0,
    explanation: 'Összesen 7 · 20 = 140 szék van. Még 30 üres: 140 − 30 = 110 néző ül már.'
  },
  {
    id: 'md200-q25',
    level: 3,
    questionTypeBadge: 'Műveletlánc',
    figure: <ChainFig values={['4', '', '?']} ops={['· 30', ': 2']} />,
    question: 'Kövesd a nyilakat! Melyik szám van a végén?',
    options: ['60', '120', '30', '80'],
    correctAnswer: 0,
    explanation: '4 · 30 = 120. Aztán 120 : 2 = 60.'
  },
  {
    id: 'md200-q26',
    level: 3,
    questionTypeBadge: 'Szorzat',
    question: 'Melyik szorzás eredménye NEM 120?',
    options: ['5 · 20', '3 · 40', '6 · 20', '2 · 60'],
    correctAnswer: 0,
    explanation: '5 · 20 = 100. A többi mind 120: 3 · 40 = 120, 6 · 20 = 120, 2 · 60 = 120.'
  },
  {
    id: 'md200-q27',
    level: 3,
    questionTypeBadge: 'Összefüggés',
    figure: (
      <QFig h={130}>
        <RodGroups groups={6} per={3} y={14} rodH={34} />
        <text x="120" y="122" textAnchor="middle" fontSize="11" fill="#334155">
          Hány tízessel több 6 csoport, mint 5?
        </text>
      </QFig>
    ),
    question: 'Mennyivel több 6 · 30, mint 5 · 30?',
    options: ['30', '1', '6', '60'],
    correctAnswer: 0,
    explanation: '6 · 30 = 180 és 5 · 30 = 150. A különbség 30, mert csak egy 30-as csoporttal van több.'
  },
  {
    id: 'md200-q28',
    level: 3,
    questionTypeBadge: 'Pénz',
    figure: (
      <QFig h={70}>
        <Tag x={50} y={14} text="90 Ft" color="#dbeafe" />
        <Tag x={130} y={14} text="90 Ft" color="#dbeafe" />
        <text x="120" y="58" textAnchor="middle" fontSize="12" fill="#334155">
          2 füzet
        </text>
      </QFig>
    ),
    question: 'Egy füzet 90 Ft. Két füzetet veszel. Hány darab 20 forintossal tudsz pontosan fizetni?',
    options: ['9', '18', '90', '8'],
    correctAnswer: 0,
    explanation: 'Két füzet: 2 · 90 = 180 Ft. 180 : 20 = 9, mert 9 · 20 = 180. Tehát 9 darab 20 forintos kell.'
  },
  {
    id: 'md200-q29',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    figure: (
      <BoxesFig
        n={5}
        label="30"
        h={96}
        y={14}
        extra={
          <g>
            <text x="120" y="62" textAnchor="middle" fontSize="12" fill="#334155">
              3 egyforma kosárba
            </text>
            {[0, 1, 2].map((i) => (
              <g key={i}>
                <path d={`M ${70 + i * 50} 70 h 30 l -4 18 h -22 Z`} fill="#fde68a" stroke="#b45309" strokeWidth="1.3" />
                <text x={85 + i * 50} y="84" textAnchor="middle" fontSize="11" fontWeight="bold" fill={UNK}>
                  ?
                </text>
              </g>
            ))}
          </g>
        }
      />
    ),
    question: 'A pékségben 5 tálca kifli sült, egy tálcán 30 darab. Az összeset 3 kosárba rakják, egyformán. Hány kifli kerül egy kosárba?',
    options: ['50', '150', '10', '45'],
    correctAnswer: 0,
    explanation: 'Először: 5 · 30 = 150 kifli. Aztán: 150 : 3 = 50, mert 15 tízes : 3 = 5 tízes.'
  },
  {
    id: 'md200-q30',
    level: 3,
    questionTypeBadge: 'Nyitott mondat',
    figure: (
      <QFig h={70}>
        <BigEq text="□ : 4 = 50 − 10" y={44} fs={24} />
      </QFig>
    ),
    question: 'Melyik szám kerül a □ helyére?',
    options: ['160', '40', '10', '200'],
    correctAnswer: 0,
    explanation: 'A jobb oldal: 50 − 10 = 40. Melyik számot osztjuk 4-gyel, hogy 40 legyen? 40 · 4 = 160. Tehát 160 : 4 = 40.'
  }
];

export const MulDiv200G3Quiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => {
  return (
    <QuizTemplate
      grade={3}
      chapterId="szamolas-200-ig"
      topicId="g3-c200-szorzas-quiz"
      subtopicId="szorzas-es-osztas"
      title="5. Szorzás és osztás – Kvíz"
      subtitle="30 feladat 3 szinten: kerek tízesek szorzása és osztása, pénz, hiányzó számok, szöveges feladatok."
      badge="3. OSZTÁLY • III. SZÁMOLÁS 0-TÓL 200-IG • KVÍZ"
      questions={MUL_DIV_200_G3_QUESTIONS}
      cheatSheets={[
        {
          title: 'Számolj tízesekkel!',
          items: ['4 · 30 = 4 · 3 tízes = 12 tízes = 120', '150 : 3 = 15 tízes : 3 = 5 tízes = 50']
        },
        {
          title: 'Kétféle osztás',
          items: ['Mennyi jut egyre? 160 : 4 = 40', 'Hányszor van meg? 160 : 40 = 4', 'Ellenőrizz szorzással: 40 · 4 = 160']
        },
        {
          title: 'Összefüggések',
          items: ['6 · 3 = 18 → 6 · 30 = 180', '12 : 3 = 4 → 120 : 30 = 4', 'A tényezők felcserélhetők: 3 · 40 = 40 · 3']
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <MulDiv200G3Matcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />
      }
      sorterComponent={
        <MulDiv200G3Sorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />
      }
    />
  );
};

export default MulDiv200G3Quiz;
