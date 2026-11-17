import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { MassG3Matcher } from './MassG3Matcher';
import { MassG3Sorter } from './MassG3Sorter';
import { FONT, UNK, Weight, WeightRow, KitchenScale, MassBarChart, PANTRY } from './MassG3Parts';
import { Ico, BalanceIcon, SackIcon, AppleIcon, ChildIcon } from '../mit-mivel-merunk/WhatToMeasureG3Parts';

// ---------------------------------------------------------------------------
// Kérdésábrák
// ---------------------------------------------------------------------------
const QFig: React.FC<{ children: React.ReactNode; h?: number }> = ({ children, h = 150 }) => (
  <svg viewBox={`0 0 240 ${h}`} className="w-full max-w-[280px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="238" height={h - 2} rx="10" fill="#f8fafc" stroke="#cbd5e1" />
    {children}
  </svg>
);

/** Nagy kétkarú mérleg; a serpenyők tartalma a serpenyő közepéhez képest (0,0 = serpenyő felülete). */
const Balance: React.FC<{ tilt: -1 | 0 | 1; left?: React.ReactNode; right?: React.ReactNode; h?: number }> = ({ tilt, left, right, h = 160 }) => {
  const s = 1.7;
  const a = (tilt * 12 * Math.PI) / 180;
  const lx = 50 - 38 * Math.cos(a);
  const ly = 34 - 38 * Math.sin(a);
  const rx = 50 + 38 * Math.cos(a);
  const ry = 34 + 38 * Math.sin(a);
  const X = 120 - 50 * s;
  const Y = h - 8 - 94 * s;
  return (
    <QFig h={h}>
      <Ico x={X} y={Y} s={s}>
        <BalanceIcon tilt={tilt} sw={2.2} />
      </Ico>
      {left && <g transform={`translate(${X + lx * s} ${Y + (ly + 24) * s})`}>{left}</g>}
      {right && <g transform={`translate(${X + rx * s} ${Y + (ry + 24) * s})`}>{right}</g>}
    </QFig>
  );
};

/** Zsák; a hosszú feliratot („1 kg 35 dkg”) két sorba tördeli. cx, by: közép, alsó szél. */
const SackL: React.FC<{ label: string; s?: number; color?: string; cx?: number; by?: number; fs?: number }> = ({ label, s = 0.5, color, cx = 0, by = 0, fs = 11 }) => {
  const m = label.match(/^([0-9]+ kg) ([0-9]+ dkg)$/);
  const lines = m ? [m[1], m[2]] : [label];
  const cy = by - 32 * s;
  return (
    <g>
      <Ico x={cx - 50 * s} y={by - 96 * s} s={s}>
        <SackIcon color={color} />
      </Ico>
      {lines.map((t, i) => (
        <text key={i} x={cx} y={cy + (i - (lines.length - 1) / 2) * fs * 1.1 + fs * 0.36} textAnchor="middle" fontSize={fs} fontWeight="bold" fill="#1f2937">{t}</text>
      ))}
    </g>
  );
};
const Sack: React.FC<{ label: string; s?: number; color?: string }> = ({ label, s = 0.5, color }) => <SackL label={label} s={s} color={color} fs={label.length > 4 ? 9 : 12} />;

const Dial: React.FC<{ value: number; max?: number; step?: number; labelEvery?: number }> = ({ value, max = 100, step = 10, labelEvery = 10 }) => (
  <QFig h={170}>
    <KitchenScale x={50} y={8} value={value} max={max} step={step} labelEvery={labelEvery} s={1.02} />
  </QFig>
);

const Chart: React.FC<{ q?: number }> = ({ q }) => (
  <QFig h={160}>
    <MassBarChart data={PANTRY} x={62} y={10} w={150} showQ={q} />
  </QFig>
);

const Labels: React.FC<{ items: string[] }> = ({ items }) => {
  const w = 236 / items.length;
  return (
    <QFig h={110}>
      {items.map((t, i) => (
        <SackL key={i} label={t} cx={2 + i * w + w / 2} by={100} s={items.length > 3 ? 0.62 : 0.72} fs={11} color={['#fcd34d', '#fca5a5', '#86efac', '#93c5fd'][i % 4]} />
      ))}
    </QFig>
  );
};

const BigText: React.FC<{ text: string }> = ({ text }) => (
  <QFig h={80}>
    <text x="120" y="48" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#0f172a">{text}</text>
  </QFig>
);

// ---------------------------------------------------------------------------
// Kérdések
// ---------------------------------------------------------------------------
export const MASS_G3_QUESTIONS: QuizQuestion[] = [
  // ---------------- 1. szint ----------------
  {
    id: 'mass-g3-q1',
    level: 1,
    questionTypeBadge: 'Mértékváltás',
    figure: <BigText text="1 kg = ? dkg" />,
    question: 'Hány dekagramm 1 kilogramm?',
    options: ['100 dkg', '10 dkg', '1000 dkg', '1 dkg'],
    correctAnswer: 0,
    explanation: '1 kg = 100 dkg. Ezt jól jegyezd meg!'
  },
  {
    id: 'mass-g3-q2',
    level: 1,
    questionTypeBadge: 'Leolvasás',
    figure: <Dial value={30} />,
    question: 'Mennyit mutat a konyhai mérleg?',
    options: ['30 dkg', '3 dkg', '40 dkg', '300 dkg'],
    correctAnswer: 0,
    explanation: 'A piros mutató a 30-nál áll. A számlapon dkg van, ez 30 dkg.'
  },
  {
    id: 'mass-g3-q3',
    level: 1,
    questionTypeBadge: 'Mérleg',
    figure: <Balance tilt={1} left={<Weight cx={0} by={0} w={34} label="1 kg" kg fs={10} />} right={<Sack label="" />} />,
    question: 'Melyik a nehezebb?',
    options: ['a zsák', 'az 1 kg-os súly', 'egyformák', 'nem lehet tudni'],
    correctAnswer: 0,
    explanation: 'A nehezebb oldal van lent. A zsák oldala van lent, tehát a zsák nehezebb 1 kg-nál.'
  },
  {
    id: 'mass-g3-q4',
    level: 1,
    questionTypeBadge: 'Súlyok',
    figure: (
      <QFig h={90}>
        <WeightRow ws={[50, 20, 10]} x={54} by={70} w={40} gap={6} fs={18} />
      </QFig>
    ),
    question: 'Mennyi a három súly együtt?',
    options: ['80 dkg', '70 dkg', '3 dkg', '90 dkg'],
    correctAnswer: 0,
    explanation: '50 + 20 + 10 = 80. A súlyok együtt 80 dkg.'
  },
  {
    id: 'mass-g3-q5',
    level: 1,
    questionTypeBadge: 'Mértékegység',
    question: 'Melyik a kisebb mértékegység?',
    options: ['a dkg', 'a kg', 'egyformák', 'nem lehet tudni'],
    correctAnswer: 0,
    explanation: 'A dkg a kisebb. 100 dkg kell ahhoz, hogy 1 kg legyen.'
  },
  {
    id: 'mass-g3-q6',
    level: 1,
    questionTypeBadge: 'Becslés',
    figure: (
      <QFig h={130}>
        <Ico x={70} y={14} s={1}>
          <AppleIcon />
        </Ico>
      </QFig>
    ),
    question: 'Milyen nehéz lehet egy alma?',
    options: ['15 dkg', '15 kg', '150 dkg', '1 dkg'],
    correctAnswer: 0,
    explanation: 'Egy alma kb. 15 dkg. 15 kg olyan nehéz, mint egy nagy kutya!'
  },
  {
    id: 'mass-g3-q7',
    level: 1,
    questionTypeBadge: 'Mérleg',
    figure: (
      <QFig h={130}>
        <Ico x={70} y={14} s={1}>
          <ChildIcon />
        </Ico>
      </QFig>
    ),
    question: 'Melyik mérleggel méred meg a saját tömegedet?',
    options: ['személymérleggel', 'konyhai mérleggel', 'vonalzóval', 'mérőkancsóval'],
    correctAnswer: 0,
    explanation: 'Ráállsz a személymérlegre. A konyhai mérlegre csak kis dolgok férnek.'
  },
  {
    id: 'mass-g3-q8',
    level: 1,
    questionTypeBadge: 'Mértékváltás',
    question: '2 kg = ? dkg',
    options: ['200 dkg', '20 dkg', '102 dkg', '2000 dkg'],
    correctAnswer: 0,
    explanation: '1 kg = 100 dkg. 2 kg = 100 dkg + 100 dkg = 200 dkg.'
  },
  {
    id: 'mass-g3-q9',
    level: 1,
    questionTypeBadge: 'Mérleg',
    figure: (
      <Balance
        tilt={0}
        left={<Sack label="?" />}
        right={<WeightRow ws={[50, 20]} x={-31} by={0} w={30} gap={2} fs={13} />}
      />
    ),
    question: 'A mérleg egyensúlyban van. Milyen nehéz a zacskó?',
    options: ['70 dkg', '50 dkg', '20 dkg', '30 dkg'],
    correctAnswer: 0,
    explanation: 'Egyensúly: a két oldal ugyanannyi. 50 + 20 = 70, tehát a zacskó 70 dkg.'
  },
  {
    id: 'mass-g3-q10',
    level: 1,
    questionTypeBadge: 'Mértékváltás',
    question: '100 dkg = ? kg',
    options: ['1 kg', '10 kg', '100 kg', '2 kg'],
    correctAnswer: 0,
    explanation: '100 dkg pontosan 1 kg.'
  },

  // ---------------- 2. szint ----------------
  {
    id: 'mass-g3-q11',
    level: 2,
    questionTypeBadge: 'Mértékváltás',
    figure: <BigText text="1 kg 40 dkg = ? dkg" />,
    question: '1 kg 40 dkg hány dkg?',
    options: ['140 dkg', '41 dkg', '1040 dkg', '104 dkg'],
    correctAnswer: 0,
    explanation: '1 kg = 100 dkg. 100 dkg + 40 dkg = 140 dkg.'
  },
  {
    id: 'mass-g3-q12',
    level: 2,
    questionTypeBadge: 'Mértékváltás',
    question: 'Írd át kg-ra és dkg-ra! 175 dkg = ?',
    options: ['1 kg 75 dkg', '17 kg 5 dkg', '1 kg 7 dkg', '175 kg'],
    correctAnswer: 0,
    explanation: '175 dkg = 100 dkg + 75 dkg. A 100 dkg 1 kg. Tehát 1 kg 75 dkg.'
  },
  {
    id: 'mass-g3-q13',
    level: 2,
    questionTypeBadge: 'Összehasonlítás',
    figure: <BigText text="1 kg 20 dkg  ○  102 dkg" />,
    question: 'Melyik jel kerül a körbe?',
    options: ['>', '<', '=', 'nem lehet összehasonlítani'],
    correctAnswer: 0,
    explanation: '1 kg 20 dkg = 120 dkg. 120 dkg > 102 dkg. A bal oldal a nagyobb.'
  },
  {
    id: 'mass-g3-q14',
    level: 2,
    questionTypeBadge: 'Összehasonlítás',
    figure: <Labels items={['105 dkg', '1 kg 50 dkg', '99 dkg', '20 dkg']} />,
    question: 'Melyik zsák a legnehezebb?',
    options: ['1 kg 50 dkg', '105 dkg', '99 dkg', '20 dkg'],
    correctAnswer: 0,
    explanation: 'Válts át dkg-ra: 1 kg 50 dkg = 150 dkg. 150 a legnagyobb: 150 > 105 > 99 > 20.'
  },
  {
    id: 'mass-g3-q15',
    level: 2,
    questionTypeBadge: 'Egész kg',
    figure: <BigText text="1 kg < 137 dkg < ? kg" />,
    question: 'Melyik egész kg jön a 137 dkg után?',
    options: ['2 kg', '1 kg', '3 kg', '14 kg'],
    correctAnswer: 0,
    explanation: '137 dkg = 1 kg 37 dkg. Ez több 1 kg-nál, de kevesebb 2 kg-nál (200 dkg).'
  },
  {
    id: 'mass-g3-q16',
    level: 2,
    questionTypeBadge: 'Leolvasás',
    figure: <Dial value={130} max={200} step={10} labelEvery={20} />,
    question: 'Mennyit mutat a mérleg?',
    options: ['130 dkg', '103 dkg', '120 dkg', '140 dkg'],
    correctAnswer: 0,
    explanation: 'A mutató a 120 és a 140 között, a kis vonalon áll. A kis vonal 10 dkg-ot ér: 120 + 10 = 130 dkg.'
  },
  {
    id: 'mass-g3-q17',
    level: 2,
    questionTypeBadge: 'Diagram',
    figure: <Chart />,
    question: 'Melyik élelmiszerből van pontosan 1 kg?',
    options: ['rizs', 'zab', 'alma', 'mazsola'],
    correctAnswer: 0,
    explanation: '1 kg = 100 dkg. A rizs oszlopa pontosan a 100-ig ér.'
  },
  {
    id: 'mass-g3-q18',
    level: 2,
    questionTypeBadge: 'Diagram',
    figure: <Chart q={0} />,
    question: 'Hány dkg zab van a kamrában?',
    options: ['60 dkg', '6 dkg', '50 dkg', '70 dkg'],
    correctAnswer: 0,
    explanation: 'A zab oszlopa a 60-as vonalig ér. Ez 60 dkg.'
  },
  {
    id: 'mass-g3-q19',
    level: 2,
    questionTypeBadge: 'Mérleg',
    figure: (
      <Balance
        tilt={0}
        left={<Weight cx={0} by={0} w={34} label="1 kg" kg fs={10} />}
        right={
          <g>
            <WeightRow ws={[20, '?']} x={-23} by={0} w={22} gap={2} fs={10} />
            <WeightRow ws={[50, 20]} x={-23} by={-21} w={22} gap={2} fs={10} />
          </g>
        }
      />
    ),
    question: 'A mérleg egyensúlyban van. Melyik súly hiányzik?',
    options: ['10 dkg', '20 dkg', '90 dkg', '1 dkg'],
    correctAnswer: 0,
    explanation: '1 kg = 100 dkg. 50 + 20 + 20 = 90. 90 + 10 = 100. A 10 dkg-os hiányzik.'
  },
  {
    id: 'mass-g3-q20',
    level: 2,
    questionTypeBadge: 'Mértékváltás',
    question: 'Melyik egyenlő 1 kg-mal?',
    options: ['50 dkg + 50 dkg', '50 dkg + 5 dkg', '10 dkg + 10 dkg', '100 dkg + 1 dkg'],
    correctAnswer: 0,
    explanation: '50 + 50 = 100 dkg = 1 kg. A 100 dkg + 1 dkg már 101 dkg, az több.'
  },

  // ---------------- 3. szint ----------------
  {
    id: 'mass-g3-q21',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    figure: <Labels items={['40 dkg', '25 dkg', '1 kg']} />,
    question: 'Vettél 40 dkg sajtot, 25 dkg sonkát és 1 kg kenyeret. Mennyi ez együtt?',
    options: ['1 kg 65 dkg', '66 dkg', '1 kg 56 dkg', '165 kg'],
    correctAnswer: 0,
    explanation: '1 kg = 100 dkg. 40 + 25 + 100 = 165 dkg. Ez 1 kg 65 dkg.'
  },
  {
    id: 'mass-g3-q22',
    level: 3,
    questionTypeBadge: 'Diagram',
    figure: <Chart />,
    question: 'Mennyivel több az alma 1 kg-nál?',
    options: ['30 dkg', '130 dkg', '3 dkg', '70 dkg'],
    correctAnswer: 0,
    explanation: 'Alma: 130 dkg. 1 kg = 100 dkg. 130 − 100 = 30 dkg.'
  },
  {
    id: 'mass-g3-q23',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    question: 'Az üres tál 30 dkg. Almával együtt 1 kg 20 dkg. Mennyi az alma?',
    options: ['90 dkg', '1 kg 50 dkg', '1 kg 20 dkg', '80 dkg'],
    correctAnswer: 0,
    explanation: '1 kg 20 dkg = 120 dkg. Vedd el a tálat: 120 − 30 = 90 dkg.'
  },
  {
    id: 'mass-g3-q24',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    question: 'Egy doboz keksz 20 dkg. Mennyi 6 doboz keksz?',
    options: ['1 kg 20 dkg', '1 kg 2 dkg', '26 dkg', '12 kg'],
    correctAnswer: 0,
    explanation: '6 · 20 = 120. 120 dkg = 1 kg 20 dkg.'
  },
  {
    id: 'mass-g3-q25',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    question: 'Egy adag süteményhez 30 dkg liszt és 15 dkg cukor kell. Mennyi liszt és cukor kell együtt a dupla adaghoz?',
    options: ['90 dkg', '45 dkg', '75 dkg', '60 dkg'],
    correctAnswer: 0,
    explanation: 'Egy adag: 30 + 15 = 45 dkg. Dupla adag: 45 + 45 = 90 dkg.'
  },
  {
    id: 'mass-g3-q26',
    level: 3,
    questionTypeBadge: 'Sorba rendezés',
    figure: <Labels items={['110 dkg', '1 kg 1 dkg', '1 kg 50 dkg', '99 dkg']} />,
    question: 'Melyik a jó sorrend a legkönnyebbtől a legnehezebbig?',
    options: [
      '99 dkg, 1 kg 1 dkg, 110 dkg, 1 kg 50 dkg',
      '1 kg 1 dkg, 99 dkg, 110 dkg, 1 kg 50 dkg',
      '99 dkg, 110 dkg, 1 kg 1 dkg, 1 kg 50 dkg',
      '1 kg 50 dkg, 110 dkg, 1 kg 1 dkg, 99 dkg'
    ],
    correctAnswer: 0,
    explanation: 'Válts át dkg-ra: 1 kg 1 dkg = 101 dkg, 1 kg 50 dkg = 150 dkg. Sorban: 99, 101, 110, 150.'
  },
  {
    id: 'mass-g3-q27',
    level: 3,
    questionTypeBadge: 'Mennyi hiányzik?',
    figure: (
      <Balance
        tilt={-1}
        left={<WeightRow ws={['1kg', '1kg']} x={-35} by={0} w={33} gap={4} fs={13} />}
        right={<Sack label="1 kg 35 dkg" s={0.56} />}
        h={170}
      />
    ),
    question: 'A kosárban 1 kg 35 dkg alma van. Mennyi kell még, hogy 2 kg legyen?',
    options: ['65 dkg', '75 dkg', '35 dkg', '1 kg 65 dkg'],
    correctAnswer: 0,
    explanation: '2 kg = 200 dkg, 1 kg 35 dkg = 135 dkg. 135 + 65 = 200. Még 65 dkg kell.'
  },
  {
    id: 'mass-g3-q28',
    level: 3,
    questionTypeBadge: 'Mértékváltás',
    question: 'Melyik igaz?',
    options: ['1 kg 5 dkg = 105 dkg', '1 kg 5 dkg = 15 dkg', '1 kg 5 dkg = 150 dkg', '1 kg 5 dkg = 1005 dkg'],
    correctAnswer: 0,
    explanation: '1 kg = 100 dkg. 100 dkg + 5 dkg = 105 dkg. A 150 dkg az 1 kg 50 dkg lenne.'
  },
  {
    id: 'mass-g3-q29',
    level: 3,
    questionTypeBadge: 'Mérleg',
    figure: (
      <Balance
        tilt={0}
        left={
          <g>
            {[-22, 0, 22].map((dx) => (
              <Ico key={dx} x={dx - 10} y={-19} s={0.2}>
                <AppleIcon sw={10} />
              </Ico>
            ))}
          </g>
        }
        right={<WeightRow ws={[50, 10]} x={-31} by={0} w={30} gap={2} fs={13} />}
      />
    ),
    question: 'A 3 egyforma alma egyensúlyban van a súlyokkal. Mennyi egy alma?',
    options: ['20 dkg', '30 dkg', '60 dkg', '57 dkg'],
    correctAnswer: 0,
    explanation: 'A súlyok: 50 + 10 = 60 dkg. 3 alma 60 dkg, ezért 1 alma 60 : 3 = 20 dkg.'
  },
  {
    id: 'mass-g3-q30',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    question: 'Az üres táska 5 dkg. Beleteszel 50 dkg almát és 1 kg krumplit. Milyen nehéz a teli táska?',
    options: ['1 kg 55 dkg', '1 kg 50 dkg', '56 dkg', '1 kg 45 dkg'],
    correctAnswer: 0,
    explanation: '5 + 50 + 100 = 155 dkg. Ez 1 kg 55 dkg. A táskát is számold bele!'
  }
];

export const MassG3Quiz: React.FC<{
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
      topicId="g3-meas-tomeg-quiz"
      subtopicId="a-tomeg-merese"
      title="2. A tömeg mérése – Kvíz"
      subtitle="30 feladat 3 szinten: kg és dkg, mérlegek, átváltás, összehasonlítás, szöveges feladatok."
      badge="3. OSZTÁLY • IV. MÉRÉSEK • KVÍZ"
      questions={MASS_G3_QUESTIONS}
      cheatSheets={[
        {
          title: 'kg és dkg',
          items: ['1 kg = 100 dkg', '2 kg = 200 dkg', 'a dkg a kisebb']
        },
        {
          title: 'Átváltás',
          items: ['1 kg 35 dkg = 135 dkg', '172 dkg = 1 kg 72 dkg', '1 kg 5 dkg = 105 dkg']
        },
        {
          title: 'Kétkarú mérleg',
          items: ['a nehezebb oldal lent van', 'egyensúly: a két oldal egyforma', 'előbb válts át, aztán hasonlíts!']
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={<MassG3Matcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />}
      sorterComponent={<MassG3Sorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />}
    />
  );
};

export default MassG3Quiz;
