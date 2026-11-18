import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { Sub50G2Matcher } from './Sub50G2Matcher';
import { Sub50G2Sorter } from './Sub50G2Sorter';
import { S50QFig, SUB50_UNK, TakeBlocksPart, takeBlocksWidth } from './Sub50G2Parts';
import { JumpsPart, Hop, PyramidPart, BalancePart } from '../osszeadas-50-es-szamkor/Add50G2Parts';
import { CoinPart, EggTrayPart, EggPart } from '../szamok-50-ig/Numbers50G2Parts';

// ---------------------------------------------------------------------------
// Kérdésábrák
// ---------------------------------------------------------------------------

const TakeFig: React.FC<{ a: number; takeOnes?: number; takeTens?: number; breakRod?: boolean; caption: string }> = ({
  a,
  takeOnes = 0,
  takeTens = 0,
  breakRod = false,
  caption
}) => {
  const w = takeBlocksWidth(a, breakRod, 8, 6);
  return (
    <S50QFig h={112}>
      <TakeBlocksPart x={130 - w / 2} y={10} a={a} takeOnes={takeOnes} takeTens={takeTens} breakRod={breakRod} unit={8} gap={6} />
      <text x="130" y="106" textAnchor="middle" fontSize="14" fontWeight="900" fill="#1e293b">{caption}</text>
    </S50QFig>
  );
};

const JumpFig: React.FC<{ from: number; to: number; hops: Hop[]; endValue?: number; labelEvery?: number }> = ({
  from,
  to,
  hops,
  endValue,
  labelEvery = 10
}) => (
  <S50QFig h={124}>
    <JumpsPart x={18} y={76} width={222} from={from} to={to} hops={hops} startLabel={String(hops[0]?.from ?? from)} endValue={endValue} labelEvery={labelEvery} fontSize={11} />
  </S50QFig>
);

const RowsFig: React.FC<{ rows: string[] }> = ({ rows }) => (
  <S50QFig h={30 + rows.length * 34}>
    {rows.map((r, i) => (
      <text key={i} x="130" y={42 + i * 34} textAnchor="middle" fontSize="22" fontWeight="900" fill={r.includes('?') ? '#1d4ed8' : '#334155'}>
        {r}
      </text>
    ))}
  </S50QFig>
);

const CardsFig: React.FC<{ items: string[] }> = ({ items }) => {
  const bw = Math.min(56, 236 / items.length);
  const x0 = 130 - (items.length * bw) / 2;
  return (
    <S50QFig h={74}>
      {items.map((t, i) => (
        <g key={i}>
          <rect x={x0 + i * bw + 3} y="16" width={bw - 6} height="42" rx="8" fill={t === '?' ? '#fee2e2' : '#e0f2fe'} stroke={t === '?' ? SUB50_UNK : '#0369a1'} strokeWidth="2" />
          <text x={x0 + i * bw + bw / 2} y="44" textAnchor="middle" fontSize="18" fontWeight="900" fill={t === '?' ? SUB50_UNK : '#0c4a6e'}>{t}</text>
        </g>
      ))}
    </S50QFig>
  );
};

const CoinsCrossFig: React.FC<{ coins: (5 | 10 | 20)[]; crossed: number[] }> = ({ coins, crossed }) => {
  const span = 44;
  return (
    <S50QFig h={84}>
      {coins.map((c, i) => {
        const cx = 130 - ((coins.length - 1) * span) / 2 + i * span;
        return (
          <g key={i}>
            <CoinPart cx={cx} cy={42} value={c} r={c === 20 ? 18 : c === 10 ? 16 : 14} />
            {crossed.includes(i) && (
              <g stroke={SUB50_UNK} strokeWidth="3" strokeLinecap="round">
                <line x1={cx - 18} y1={24} x2={cx + 18} y2={60} />
                <line x1={cx - 18} y1={60} x2={cx + 18} y2={24} />
              </g>
            )}
          </g>
        );
      })}
    </S50QFig>
  );
};

const EggsTakeFig: React.FC<{ trays: number; eggs: number; take: number }> = ({ trays, eggs, take }) => (
  <S50QFig h={104}>
    {Array.from({ length: trays }, (_, t) => (
      <EggTrayPart key={t} x={14 + (t % 2) * 64} y={12 + Math.floor(t / 2) * 32} />
    ))}
    {Array.from({ length: eggs }, (_, i) => {
      const cx = 156 + Math.floor(i / 3) * 18;
      const cy = 22 + (i % 3) * 22;
      const crossed = i >= eggs - take;
      return (
        <g key={i}>
          <EggPart cx={cx} cy={cy} s={1.1} />
          {crossed && (
            <g stroke={SUB50_UNK} strokeWidth="2.2" strokeLinecap="round">
              <line x1={cx - 7} y1={cy - 8} x2={cx + 7} y2={cy + 8} />
              <line x1={cx - 7} y1={cy + 8} x2={cx + 7} y2={cy - 8} />
            </g>
          )}
        </g>
      );
    })}
    <text x="130" y="96" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#475569">1 tálca = 10 tojás • áthúzva: elhasználtuk</text>
  </S50QFig>
);

const PyramidFig: React.FC<{ left: string; right: string; top: string }> = ({ left, right, top }) => (
  <S50QFig h={92}>
    <PyramidPart cx={130} y={12} left={left} right={right} top={top} bw={64} bh={34} fontSize={20} />
  </S50QFig>
);

const BalanceFig: React.FC<{ left: string; right: string }> = ({ left, right }) => (
  <S50QFig h={92}>
    <BalancePart cx={130} y={10} left={left} right={right} w={230} fontSize={18} />
  </S50QFig>
);

// ---------------------------------------------------------------------------
// Kérdések
// ---------------------------------------------------------------------------

export const SUB50_G2_QUESTIONS: QuizQuestion[] = [
  // ----- 1. szint -----
  {
    id: 'sub50g2-q1',
    level: 1,
    questionTypeBadge: 'Elvétel kockákkal',
    figure: <TakeFig a={27} takeOnes={3} caption="27 − 3 = ?" />,
    question: 'Mennyi maradt?',
    options: ['24', '21', '30', '23'],
    correctAnswer: 0,
    explanation: '7 kockából 3-at elvettünk, maradt 4. A 2 rúd marad: 24.'
  },
  {
    id: 'sub50g2-q2',
    level: 1,
    questionTypeBadge: 'Kistesó segít',
    figure: <RowsFig rows={['7 − 5 = 2', '37 − 5 = ?']} />,
    question: 'Mennyi 37 − 5?',
    options: ['32', '2', '42', '31'],
    correctAnswer: 0,
    explanation: '7 − 5 = 2. A 3 tízes marad. Így 37 − 5 = 32.'
  },
  {
    id: 'sub50g2-q3',
    level: 1,
    questionTypeBadge: 'Kerek tízesig',
    figure: <JumpFig from={35} to={50} hops={[{ from: 45, to: 40, label: '−5' }]} endValue={40} labelEvery={5} />,
    question: 'Mennyi 45 − 5?',
    options: ['40', '50', '39', '4'],
    correctAnswer: 0,
    explanation: 'Az 5 egyest mind elvesszük. Csak a 4 tízes marad: 40.'
  },
  {
    id: 'sub50g2-q4',
    level: 1,
    questionTypeBadge: 'Kerek tízesből',
    figure: <TakeFig a={30} breakRod takeOnes={4} caption="30 − 4 = ?" />,
    question: 'Egy rudat 10 kockára bontottunk. Mennyi maradt?',
    options: ['26', '34', '24', '27'],
    correctAnswer: 0,
    explanation: '10 kockából 4-et elvettünk, maradt 6. Még 2 rúd van: 26.'
  },
  {
    id: 'sub50g2-q5',
    level: 1,
    questionTypeBadge: '10 elvétele',
    figure: <TakeFig a={48} takeTens={1} caption="48 − 10 = ?" />,
    question: 'Mennyi 48 − 10?',
    options: ['38', '47', '28', '39'],
    correctAnswer: 0,
    explanation: 'Egy rudat veszünk el: 4 − 1 = 3 tízes. A 8 egyes marad: 38.'
  },
  {
    id: 'sub50g2-q6',
    level: 1,
    questionTypeBadge: 'Visszaugrás',
    figure: <JumpFig from={20} to={30} hops={[{ from: 29, to: 23, label: '−6' }]} endValue={23} labelEvery={10} />,
    question: 'Hová érkezünk? 29 − 6 = ?',
    options: ['23', '35', '22', '24'],
    correctAnswer: 0,
    explanation: '9 − 6 = 3, és a 2 tízes marad: 29 − 6 = 23. (A 35 összeadás lenne!)'
  },
  {
    id: 'sub50g2-q7',
    level: 1,
    questionTypeBadge: 'Pénz',
    figure: <CoinsCrossFig coins={[20, 20, 10]} crossed={[0]} />,
    question: 'Volt 50 Ft. Egy 20 Ft-ost elköltöttünk. Mennyi maradt?',
    options: ['30 Ft', '20 Ft', '40 Ft', '10 Ft'],
    correctAnswer: 0,
    explanation: '50 − 20 = 30 Ft. Maradt egy 20-as és egy 10-es: 20 + 10 = 30.'
  },
  {
    id: 'sub50g2-q8',
    level: 1,
    questionTypeBadge: 'Pont kerek tízes',
    question: 'Mennyi 36 − 6?',
    options: ['30', '36', '29', '42'],
    correctAnswer: 0,
    explanation: 'Mind a 6 egyest elvesszük. Marad 3 tízes: 30.'
  },
  {
    id: 'sub50g2-q9',
    level: 1,
    questionTypeBadge: 'Melyik a különbség?',
    question: 'Melyik kivonás eredménye 21?',
    options: ['25 − 4', '25 − 3', '28 − 6', '29 − 9'],
    correctAnswer: 0,
    explanation: '25 − 4 = 21. (25 − 3 = 22, 28 − 6 = 22, 29 − 9 = 20.)'
  },
  {
    id: 'sub50g2-q10',
    level: 1,
    questionTypeBadge: 'Tojások',
    figure: <EggsTakeFig trays={3} eggs={8} take={5} />,
    question: 'Volt 38 tojás. 5-öt elhasználtunk. Hány maradt?',
    options: ['33', '43', '32', '34'],
    correctAnswer: 0,
    explanation: '8 − 5 = 3 szabad tojás maradt, és 3 teli tálca: 33.'
  },

  // ----- 2. szint -----
  {
    id: 'sub50g2-q11',
    level: 2,
    questionTypeBadge: 'Bontás',
    figure: (
      <JumpFig
        from={24}
        to={36}
        hops={[
          { from: 32, to: 30, label: '−2' },
          { from: 30, to: 27, label: '−?' }
        ]}
        labelEvery={2}
      />
    ),
    question: '32 − 5 = 32 − 2 − □. Mi kerül a □ helyére?',
    options: ['3', '5', '2', '7'],
    correctAnswer: 0,
    explanation: 'Az 5-ből 2-t már elvettünk. 5 = 2 + 3, tehát még 3-at kell.'
  },
  {
    id: 'sub50g2-q12',
    level: 2,
    questionTypeBadge: 'Tízesátlépés',
    figure: (
      <JumpFig
        from={30}
        to={45}
        hops={[
          { from: 41, to: 40, label: '−1' },
          { from: 40, to: 35, label: '−5' }
        ]}
        endValue={35}
        labelEvery={5}
      />
    ),
    question: 'Mennyi 41 − 6?',
    options: ['35', '45', '36', '25'],
    correctAnswer: 0,
    explanation: '41 − 1 = 40, és még 5: 40 − 5 = 35. (A 45 hibás: nem 6 − 1!)'
  },
  {
    id: 'sub50g2-q13',
    level: 2,
    questionTypeBadge: 'Rúd bontása',
    figure: <TakeFig a={34} breakRod takeOnes={8} caption="34 − 8 = ?" />,
    question: 'Mennyi maradt?',
    options: ['26', '36', '34', '27'],
    correctAnswer: 0,
    explanation: '4 kockából nem vehetsz el 8-at. Bonts fel 1 rudat: 14 kocka − 8 = 6. Marad 2 rúd: 26.'
  },
  {
    id: 'sub50g2-q14',
    level: 2,
    questionTypeBadge: 'Kerek tízesből',
    question: 'Mennyi 50 − 7?',
    options: ['43', '47', '42', '33'],
    correctAnswer: 0,
    explanation: 'Bonts fel egy tízest: 10 − 7 = 3. Marad 4 tízes és 3 egyes: 43. (43 + 7 = 50)'
  },
  {
    id: 'sub50g2-q15',
    level: 2,
    questionTypeBadge: 'Kétjegyű kivonása',
    figure: (
      <JumpFig
        from={10}
        to={30}
        hops={[
          { from: 28, to: 18, label: '−10' },
          { from: 18, to: 15, label: '−3' }
        ]}
        endValue={15}
        labelEvery={5}
      />
    ),
    question: 'Mennyi 28 − 13?',
    options: ['15', '18', '25', '41'],
    correctAnswer: 0,
    explanation: 'Előbb a tízest: 28 − 10 = 18. Aztán az egyest: 18 − 3 = 15.'
  },
  {
    id: 'sub50g2-q16',
    level: 2,
    questionTypeBadge: 'Tízes a tízesből',
    figure: <TakeFig a={39} takeTens={2} takeOnes={4} caption="39 − 24 = ?" />,
    question: 'Mennyi maradt?',
    options: ['15', '25', '13', '16'],
    correctAnswer: 0,
    explanation: 'Tízesek: 3 − 2 = 1. Egyesek: 9 − 4 = 5. Marad 15.'
  },
  {
    id: 'sub50g2-q17',
    level: 2,
    questionTypeBadge: 'Hiányzó szám',
    figure: <RowsFig rows={['40 − ? = 33']} />,
    question: 'Mennyit vettünk el a 40-ből, ha 33 maradt?',
    options: ['7', '3', '13', '6'],
    correctAnswer: 0,
    explanation: '33-tól a 40-ig 7 kell: 33 + 7 = 40. Tehát 40 − 7 = 33.'
  },
  {
    id: 'sub50g2-q18',
    level: 2,
    questionTypeBadge: 'Ellenőrzés',
    question: 'Mivel ellenőrizheted: 44 − 18 = 26?',
    options: ['26 + 18 = 44', '26 − 18 = 8', '18 + 8 = 26', '44 − 4 = 40'],
    correctAnswer: 0,
    explanation: 'A maradékhoz add hozzá, amit elvettél: 26 + 18 = 44. Visszakapod a 44-et!'
  },
  {
    id: 'sub50g2-q19',
    level: 2,
    questionTypeBadge: 'Pénz',
    figure: <CoinsCrossFig coins={[20, 20, 5]} crossed={[1]} />,
    question: 'Volt 45 Ft. Egy 20 Ft-ost elköltöttünk. Mennyi maradt?',
    options: ['25 Ft', '20 Ft', '35 Ft', '40 Ft'],
    correctAnswer: 0,
    explanation: '45 − 20 = 25 Ft. Maradt egy 20-as és egy 5-ös.'
  },
  {
    id: 'sub50g2-q20',
    level: 2,
    questionTypeBadge: 'Szabály',
    figure: <CardsFig items={['47', '43', '39', '35', '?']} />,
    question: 'Mindig ugyanannyit veszünk el. Mi jön?',
    options: ['31', '32', '30', '27'],
    correctAnswer: 0,
    explanation: 'Mindig 4-gyel csökken: 35 − 4 = 31, mert 5 − 4 = 1.'
  },

  // ----- 3. szint -----
  {
    id: 'sub50g2-q21',
    level: 3,
    questionTypeBadge: 'Három ugrás',
    figure: (
      <JumpFig
        from={15}
        to={40}
        hops={[
          { from: 36, to: 26, label: '−10' },
          { from: 26, to: 20, label: '−6' },
          { from: 20, to: 17, label: '−3' }
        ]}
        endValue={17}
        labelEvery={5}
      />
    ),
    question: 'Mennyi 36 − 19?',
    options: ['17', '23', '27', '16'],
    correctAnswer: 0,
    explanation: '36 − 10 = 26. Aztán 26 − 9 = 26 − 6 − 3 = 17.'
  },
  {
    id: 'sub50g2-q22',
    level: 3,
    questionTypeBadge: 'Kétjegyű tízesátlépéssel',
    figure: <TakeFig a={42} takeTens={1} breakRod takeOnes={7} caption="42 − 17 = ?" />,
    question: 'Mennyi maradt?',
    options: ['25', '35', '24', '15'],
    correctAnswer: 0,
    explanation: '42 − 10 = 32. Aztán 32 − 7 = 32 − 2 − 5 = 25.'
  },
  {
    id: 'sub50g2-q23',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    question: 'A kosárban 34 alma volt. Megettünk 8-at. Hány alma maradt?',
    options: ['26', '42', '24', '36'],
    correctAnswer: 0,
    explanation: '34 − 4 = 30, és még 4: 30 − 4 = 26 alma.'
  },
  {
    id: 'sub50g2-q24',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    question: 'Zsófinak 50 Ft-ja van. Vesz egy 23 Ft-os ceruzát. Mennyi pénze marad?',
    options: ['27 Ft', '33 Ft', '37 Ft', '23 Ft'],
    correctAnswer: 0,
    explanation: '50 − 20 = 30, és 30 − 3 = 27 Ft. Ellenőrzés: 27 + 23 = 50.'
  },
  {
    id: 'sub50g2-q25',
    level: 3,
    questionTypeBadge: 'Számpiramis',
    figure: <PyramidFig left="26" right="?" top="41" />,
    question: 'Melyik szám hiányzik a piramisból?',
    options: ['15', '25', '16', '14'],
    correctAnswer: 0,
    explanation: '26 + ? = 41. 41 − 26 = 41 − 20 − 6 = 21 − 6 = 15.'
  },
  {
    id: 'sub50g2-q26',
    level: 3,
    questionTypeBadge: 'Miből vettünk el?',
    figure: <RowsFig rows={['? − 12 = 25']} />,
    question: 'Melyik számból vettünk el 12-t, ha 25 maradt?',
    options: ['37', '13', '27', '38'],
    correctAnswer: 0,
    explanation: 'Add vissza, amit elvettél: 25 + 12 = 37.'
  },
  {
    id: 'sub50g2-q27',
    level: 3,
    questionTypeBadge: 'Mérleg',
    figure: <BalanceFig left="35 − 8" right="20 + ?" />,
    question: 'A mérleg egyensúlyban van. Mennyi a ?',
    options: ['7', '8', '27', '3'],
    correctAnswer: 0,
    explanation: 'Bal oldal: 35 − 8 = 27. Jobb oldal: 20 + 7 = 27. A ? = 7.'
  },
  {
    id: 'sub50g2-q28',
    level: 3,
    questionTypeBadge: 'Két lépés',
    question: 'Volt 45 matricám. Pannának adtam 10-et, Tominak 6-ot. Hány maradt?',
    options: ['29', '39', '35', '31'],
    correctAnswer: 0,
    explanation: '45 − 10 = 35. Aztán 35 − 6 = 35 − 5 − 1 = 29.'
  },
  {
    id: 'sub50g2-q29',
    level: 3,
    questionTypeBadge: 'Legkisebb különbség',
    question: 'Melyik különbség a legkisebb?',
    options: ['41 − 28', '43 − 27', '45 − 30', '50 − 36'],
    correctAnswer: 0,
    explanation: '41 − 28 = 13, 43 − 27 = 16, 45 − 30 = 15, 50 − 36 = 14. A legkisebb a 13.'
  },
  {
    id: 'sub50g2-q30',
    level: 3,
    questionTypeBadge: 'Mennyivel több?',
    figure: (
      <JumpFig
        from={20}
        to={45}
        hops={[
          { from: 26, to: 30, label: '+4' },
          { from: 30, to: 43, label: '+13' }
        ]}
        labelEvery={5}
      />
    ),
    question: 'Mennyivel több a 43, mint a 26?',
    options: ['17', '23', '27', '16'],
    correctAnswer: 0,
    explanation: 'Ugorj a 26-tól a 43-ig: 4 + 13 = 17. Vagy: 43 − 26 = 17.'
  }
];

export const Sub50G2Quiz: React.FC<{
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
      topicId="g2-c50-kivonas-quiz"
      subtopicId="kivonas-50-es-szamkor"
      title="3. Kivonás 50-es számkör – Kvíz"
      subtitle="30 feladat 3 szinten: tízesátlépés nélkül, kerek tízesig, tízesátlépéssel, kétjegyű számok kivonása, ellenőrzés."
      badge="2. OSZTÁLY • II. SZÁMKÖRBŐVÍTÉS ÉS SZÁMOLÁS 50-IG • KVÍZ"
      questions={SUB50_G2_QUESTIONS}
      cheatSheets={[
        {
          title: 'Tízesátlépés nélkül',
          items: ['7 − 3 = 4 → 37 − 3 = 34', '36 − 6 = 30 (pont kerek tízes)', '48 − 10 = 38 (1 rúd el)', '30 − 4: bonts fel 1 rudat!']
        },
        {
          title: 'Tízesátlépéssel',
          items: ['Előbb vissza a kerek tízesig!', '32 − 5 = 32 − 2 − 3 = 27', '41 − 6 = 41 − 1 − 5 = 35', 'Vigyázz: 32 − 5 nem 33!']
        },
        {
          title: 'Kétjegyű számok, ellenőrzés',
          items: ['Előbb a tízest, aztán az egyest', '28 − 13 = 18 − 3 = 15', '36 − 19 = 26 − 9 = 17', 'Ellenőrzés: 17 + 19 = 36']
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <Sub50G2Matcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <Sub50G2Sorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default Sub50G2Quiz;
