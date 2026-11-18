import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { Mult3G2Matcher } from './Mult3G2Matcher';
import { Mult3G2Sorter } from './Mult3G2Sorter';
import { MULT3_FONT, CloverPart, StickTrianglePart, TricyclePart, DotGroupsPart, DotArrayPart, JumpLine3Part } from './Mult3G2Parts';

// ---------------------------------------------------------------------------
// Kérdésábrák
// ---------------------------------------------------------------------------
const UNK = '#dc2626';

const QFig: React.FC<{ children: React.ReactNode; h?: number }> = ({ children, h = 110 }) => (
  <svg viewBox={`0 0 260 ${h}`} className="w-full max-w-[280px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={MULT3_FONT}>
    <rect x="1" y="1" width="258" height={h - 2} rx="12" fill="#f8fafc" stroke="#cbd5e1" />
    {children}
  </svg>
);

const CloverQ: React.FC<{ n: number }> = ({ n }) => (
  <QFig h={90}>
    {Array.from({ length: n }, (_, i) => (
      <CloverPart key={i} cx={130 + (i - (n - 1) / 2) * 50} cy={36} r={13} />
    ))}
  </QFig>
);

const GroupsQ: React.FC<{ groups: number }> = ({ groups }) => {
  const perRow = 5;
  const rows = Math.ceil(groups / perRow);
  const size = 34;
  const gap = 8;
  const w = Math.min(groups, perRow) * (size + gap) - gap;
  return (
    <QFig h={rows * (size + gap) + 18}>
      <DotGroupsPart x={130 - w / 2} y={12} groups={groups} size={size} gap={gap} perRow={perRow} />
    </QFig>
  );
};

const JumpQ: React.FC<{ jumps: number; start?: number; back?: boolean; endLabel?: string; min?: number; max?: number; labelEvery?: number }> = ({
  jumps,
  start = 0,
  back = false,
  endLabel = '?',
  min = 0,
  max = 30,
  labelEvery = 3
}) => {
  const unit = 228 / (max - min);
  return (
    <QFig h={92}>
      <JumpLine3Part x0={14} y={58} unit={unit} min={min} max={max} jumps={jumps} start={start} back={back} showEnd={false} endLabel={endLabel} labelEvery={labelEvery} />
    </QFig>
  );
};

const TriQ: React.FC<{ n: number; caption?: string }> = ({ n, caption }) => (
  <QFig h={caption ? 96 : 76}>
    {Array.from({ length: n }, (_, i) => (
      <StickTrianglePart key={i} x={130 + (i - (n - 1) / 2) * 52 - 20} y={14} s={40} w={4.5} />
    ))}
    {caption && (
      <text x="130" y="86" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#334155">
        {caption}
      </text>
    )}
  </QFig>
);

const ArrayQ: React.FC<{ rows: number; cols: number }> = ({ rows, cols }) => {
  const step = 26;
  const w = (cols - 1) * step;
  return (
    <QFig h={(rows - 1) * step + 40}>
      <DotArrayPart x={130 - w / 2} y={20} rows={rows} cols={cols} step={step} r={9} />
    </QFig>
  );
};

const ArrowQ: React.FC<{ from: string; to: string }> = ({ from, to }) => (
  <QFig h={84}>
    <rect x="22" y="20" width="60" height="44" rx="10" fill="#fff" stroke="#db2777" strokeWidth="3" />
    <text x="52" y="51" textAnchor="middle" fontSize="22" fontWeight="900" fill={from === '?' ? UNK : '#831843'}>
      {from}
    </text>
    <line x1="88" y1="42" x2="166" y2="42" stroke="#0891b2" strokeWidth="4" />
    <path d="M 160 34 L 172 42 L 160 50 Z" fill="#0891b2" />
    <text x="128" y="34" textAnchor="middle" fontSize="13" fontWeight="900" fill="#0e7490">
      háromszorosa
    </text>
    <rect x="178" y="20" width="60" height="44" rx="10" fill="#fff" stroke="#db2777" strokeWidth="3" />
    <text x="208" y="51" textAnchor="middle" fontSize="22" fontWeight="900" fill={to === '?' ? UNK : '#831843'}>
      {to}
    </text>
  </QFig>
);

const BikePart: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <g transform={`translate(${x} ${y})`}>
    <line x1="8" y1="26" x2="22" y2="12" stroke="#16a34a" strokeWidth="3.5" strokeLinecap="round" />
    <line x1="22" y1="12" x2="38" y2="26" stroke="#16a34a" strokeWidth="3.5" strokeLinecap="round" />
    <line x1="14" y1="9" x2="22" y2="9" stroke="#334155" strokeWidth="3" strokeLinecap="round" />
    <circle cx="8" cy="26" r="8" fill="#fff" stroke="#0f172a" strokeWidth="3" />
    <circle cx="38" cy="26" r="8" fill="#fff" stroke="#0f172a" strokeWidth="3" />
  </g>
);

const TricycleQ: React.FC<{ n: number; bikes?: number }> = ({ n, bikes = 0 }) => {
  const total = n + bikes;
  const dx = 50;
  const x0 = 130 - (total * dx) / 2 + 2;
  return (
    <QFig h={72}>
      {Array.from({ length: n }, (_, i) => (
        <TricyclePart key={i} x={x0 + i * dx} y={18} s={0.95} color={['#2563eb', '#db2777', '#f59e0b', '#7c3aed', '#0d9488', '#ea580c'][i % 6]} />
      ))}
      {Array.from({ length: bikes }, (_, i) => (
        <BikePart key={`b${i}`} x={x0 + (n + i) * dx} y={20} />
      ))}
    </QFig>
  );
};

const BasketQ: React.FC<{ n: number }> = ({ n }) => (
  <QFig h={74}>
    {Array.from({ length: n }, (_, i) => {
      const bx = 130 + (i - (n - 1) / 2) * 48 - 20;
      return (
        <g key={i}>
          <circle cx={bx + 11} cy={24} r="7" fill="#ef4444" stroke="#7f1d1d" strokeWidth="1.5" />
          <circle cx={bx + 29} cy={24} r="7" fill="#ef4444" stroke="#7f1d1d" strokeWidth="1.5" />
          <circle cx={bx + 20} cy={15} r="7" fill="#ef4444" stroke="#7f1d1d" strokeWidth="1.5" />
          <path d={`M ${bx} 30 L ${bx + 40} 30 L ${bx + 34} 58 L ${bx + 6} 58 Z`} fill="#d97706" stroke="#78350f" strokeWidth="2" />
          <line x1={bx + 4} y1={40} x2={bx + 36} y2={40} stroke="#78350f" strokeWidth="1.5" />
          <line x1={bx + 6} y1={49} x2={bx + 34} y2={49} stroke="#78350f" strokeWidth="1.5" />
        </g>
      );
    })}
  </QFig>
);

const BetweenQ: React.FC = () => {
  const X = (v: number) => 20 + (v - 20) * 22;
  return (
    <QFig h={92}>
      <line x1={X(20) - 4} y1={52} x2={X(30) + 6} y2={52} stroke="#334155" strokeWidth="2" />
      {Array.from({ length: 11 }, (_, i) => 20 + i).map((v) => (
        <g key={v}>
          <line x1={X(v)} y1={47} x2={X(v)} y2={57} stroke="#334155" strokeWidth={v === 24 || v === 27 ? 2.5 : 1.2} />
          <text x={X(v)} y={74} textAnchor="middle" fontSize="11" fontWeight="bold" fill={v === 24 || v === 27 ? '#7c3aed' : '#475569'}>
            {v}
          </text>
        </g>
      ))}
      <text x={X(24)} y={34} textAnchor="middle" fontSize="12" fontWeight="900" fill="#7c3aed">8 · 3</text>
      <text x={X(27)} y={34} textAnchor="middle" fontSize="12" fontWeight="900" fill="#7c3aed">9 · 3</text>
      <text x={X(25.5)} y={22} textAnchor="middle" fontSize="16" fontWeight="900" fill={UNK}>?</text>
    </QFig>
  );
};

const CloverTableQ: React.FC = () => {
  const cols = ['1', '2', '3', '7'];
  const vals = ['3', '6', '9', '?'];
  return (
    <QFig h={96}>
      <CloverPart cx={36} cy={28} r={8} />
      <text x="36" y="78" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#15803d">levél</text>
      <rect x="66" y="12" width="180" height="72" rx="8" fill="#fff" stroke="#86efac" />
      <line x1="66" y1="48" x2="246" y2="48" stroke="#86efac" />
      {cols.map((c, i) => (
        <g key={i}>
          <text x={88 + i * 45} y={37} textAnchor="middle" fontSize="16" fontWeight="900" fill="#0f172a">
            {c}
          </text>
          <text x={88 + i * 45} y={73} textAnchor="middle" fontSize="16" fontWeight="900" fill={vals[i] === '?' ? UNK : '#15803d'}>
            {vals[i]}
          </text>
        </g>
      ))}
    </QFig>
  );
};

const SplitGroupsQ: React.FC = () => (
  <QFig h={84}>
    <DotGroupsPart x={14} y={12} groups={4} size={28} gap={4} />
    <line x1="146" y1="8" x2="146" y2="50" stroke="#dc2626" strokeWidth="3" strokeDasharray="4 3" />
    <DotGroupsPart x={154} y={12} groups={3} size={28} gap={4} />
    <text x="72" y="70" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#334155">4 · 3</text>
    <text x="200" y="70" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#334155">3 · 3</text>
  </QFig>
);

const JumpPlusQ: React.FC = () => {
  const unit = 228 / 30;
  const X = (v: number) => 14 + v * unit;
  return (
    <QFig h={92}>
      <JumpLine3Part x0={14} y={58} unit={unit} jumps={6} showEnd labelEvery={6} />
      <path d={`M ${X(18)} 55 Q ${X(19)} 44 ${X(20)} 55`} fill="none" stroke="#16a34a" strokeWidth="2.6" />
      <text x={X(19)} y={38} textAnchor="middle" fontSize="12" fontWeight="900" fill="#16a34a">+ 2</text>
      <text x={X(20)} y={78} textAnchor="middle" fontSize="14" fontWeight="900" fill={UNK}>?</text>
    </QFig>
  );
};

// ---------------------------------------------------------------------------
// Kérdések
// ---------------------------------------------------------------------------
export const MULT3_G2_QUESTIONS: QuizQuestion[] = [
  // ---------- 1. szint ----------
  {
    id: 'mult3g2-q1',
    level: 1,
    questionTypeBadge: 'Lóherék',
    figure: <CloverQ n={2} />,
    question: 'Hány levél van összesen?',
    options: ['6', '5', '3', '9'],
    correctAnswer: 0,
    explanation: 'Mindegyik lóherén 3 levél van. 3 + 3 = 6, vagyis 2 · 3 = 6.'
  },
  {
    id: 'mult3g2-q2',
    level: 1,
    questionTypeBadge: 'Összeadás',
    figure: <GroupsQ groups={4} />,
    question: '3 + 3 + 3 + 3 = ?',
    options: ['12', '9', '15', '7'],
    correctAnswer: 0,
    explanation: 'Számolj hármasával: 3, 6, 9, 12. Négy hármas az 12.'
  },
  {
    id: 'mult3g2-q3',
    level: 1,
    questionTypeBadge: 'Kép és szorzás',
    figure: <GroupsQ groups={5} />,
    question: 'Melyik szorzás illik a képhez?',
    options: ['5 · 3', '5 + 3', '4 · 3', '5 · 2'],
    correctAnswer: 0,
    explanation: '5 karika van, mindegyikben 3 korong. 5-ször 3: 5 · 3.'
  },
  {
    id: 'mult3g2-q4',
    level: 1,
    questionTypeBadge: 'Ugrások',
    figure: <JumpQ jumps={2} labelEvery={10} />,
    question: '2 · 3 = ?',
    options: ['6', '5', '9', '3'],
    correctAnswer: 0,
    explanation: 'Két hármas ugrás: 3, 6. Tehát 2 · 3 = 6.'
  },
  {
    id: 'mult3g2-q5',
    level: 1,
    questionTypeBadge: 'Sorozat',
    figure: <JumpQ jumps={4} max={15} labelEvery={3} />,
    question: 'Folytasd: 3, 6, 9, ?',
    options: ['12', '10', '11', '15'],
    correctAnswer: 0,
    explanation: 'Mindig 3-mal több: 9 + 3 = 12.'
  },
  {
    id: 'mult3g2-q6',
    level: 1,
    questionTypeBadge: 'Tíz hármas',
    figure: <GroupsQ groups={10} />,
    question: '10 · 3 = ?',
    options: ['30', '13', '27', '33'],
    correctAnswer: 0,
    explanation: 'Tíz hármas: 3, 6, 9, 12, 15, 18, 21, 24, 27, 30. Tehát 10 · 3 = 30.'
  },
  {
    id: 'mult3g2-q7',
    level: 1,
    questionTypeBadge: 'Nulla',
    question: '0 · 3 = ?',
    options: ['0', '3', '1', '30'],
    correctAnswer: 0,
    explanation: 'Egyszer sem vesszük a 3-at, így nincs semmi: 0 · 3 = 0.'
  },
  {
    id: 'mult3g2-q8',
    level: 1,
    questionTypeBadge: 'Pálcikák',
    figure: <TriQ n={3} />,
    question: 'Hány pálcika kell a 3 háromszöghöz?',
    options: ['9', '6', '3', '12'],
    correctAnswer: 0,
    explanation: 'Egy háromszög 3 pálcika. 3 + 3 + 3 = 9, vagyis 3 · 3 = 9.'
  },
  {
    id: 'mult3g2-q9',
    level: 1,
    questionTypeBadge: 'Szorzás és összeadás',
    question: 'Melyik összeadás ugyanannyi, mint 3 · 3?',
    options: ['3 + 3 + 3', '3 + 3', '3 + 3 + 3 + 3', '3 + 0'],
    correctAnswer: 0,
    explanation: '3 · 3 azt jelenti: háromszor 3. Ez 3 + 3 + 3 = 9.'
  },
  {
    id: 'mult3g2-q10',
    level: 1,
    questionTypeBadge: 'Többszörös',
    question: 'Melyik szám a 3 többszöröse?',
    options: ['15', '14', '16', '10'],
    correctAnswer: 0,
    explanation: 'Hármasával: 3, 6, 9, 12, 15. A 15 benne van, a 14, 16, 10 nincs.'
  },

  // ---------- 2. szint ----------
  {
    id: 'mult3g2-q11',
    level: 2,
    questionTypeBadge: 'Számegyenes',
    figure: <JumpQ jumps={8} labelEvery={10} />,
    question: '8 · 3 = ?',
    options: ['24', '21', '27', '11'],
    correctAnswer: 0,
    explanation: 'Nyolc hármas ugrás: 3, 6, 9, 12, 15, 18, 21, 24. Tehát 8 · 3 = 24.'
  },
  {
    id: 'mult3g2-q12',
    level: 2,
    questionTypeBadge: 'Hiányzó szám',
    figure: <JumpQ jumps={6} endLabel="18" labelEvery={10} />,
    question: '□ · 3 = 18. Hány hármas ugrás kell?',
    options: ['6', '5', '7', '15'],
    correctAnswer: 0,
    explanation: 'Számold meg az íveket: 6 ugrás. 6 · 3 = 18, tehát □ = 6.'
  },
  {
    id: 'mult3g2-q13',
    level: 2,
    questionTypeBadge: 'Rácspontok',
    figure: <ArrayQ rows={3} cols={7} />,
    question: 'Hány pötty van?',
    options: ['21', '10', '24', '18'],
    correctAnswer: 0,
    explanation: '7 oszlop, mindegyikben 3 pötty: 7 · 3 = 21.'
  },
  {
    id: 'mult3g2-q14',
    level: 2,
    questionTypeBadge: 'Visszafelé',
    question: '9 · 3 = ?',
    options: ['27', '24', '12', '30'],
    correctAnswer: 0,
    explanation: '10 · 3 = 30. Egy hármassal kevesebb: 30 − 3 = 27.'
  },
  {
    id: 'mult3g2-q15',
    level: 2,
    questionTypeBadge: 'Háromszoros',
    figure: <ArrowQ from="4" to="?" />,
    question: 'Mennyi a 4 háromszorosa?',
    options: ['12', '7', '16', '8'],
    correctAnswer: 0,
    explanation: 'Háromszor annyi: 4 + 4 + 4 = 12.'
  },
  {
    id: 'mult3g2-q16',
    level: 2,
    questionTypeBadge: 'Összehasonlítás',
    question: 'Melyik jel kerül a □ helyére?   5 · 3 □ 3 + 3 + 3',
    options: ['>', '<', '='],
    correctAnswer: 0,
    explanation: '5 · 3 = 15, és 3 + 3 + 3 = 9. A 15 több, tehát 5 · 3 > 3 + 3 + 3.'
  },
  {
    id: 'mult3g2-q17',
    level: 2,
    questionTypeBadge: 'Triciklik',
    figure: <TricycleQ n={5} />,
    question: 'Minden triciklinek 3 kereke van. Hány kerék van összesen?',
    options: ['15', '8', '12', '18'],
    correctAnswer: 0,
    explanation: '5 tricikli, mindegyiken 3 kerék: 5 · 3 = 15.'
  },
  {
    id: 'mult3g2-q18',
    level: 2,
    questionTypeBadge: 'Nem többszörös',
    question: 'Melyik szám NEM a 3 többszöröse?',
    options: ['20', '21', '18', '27'],
    correctAnswer: 0,
    explanation: '18 = 6 · 3, 21 = 7 · 3, 27 = 9 · 3. A 20-ra nem érkezel hármasával: 18 után 21 jön.'
  },
  {
    id: 'mult3g2-q19',
    level: 2,
    questionTypeBadge: 'Sorozat visszafelé',
    figure: <JumpQ jumps={3} start={30} back min={15} max={30} labelEvery={3} />,
    question: 'Folytasd: 30, 27, 24, ?',
    options: ['21', '22', '20', '18'],
    correctAnswer: 0,
    explanation: 'Mindig 3-mal kevesebb: 24 − 3 = 21.'
  },
  {
    id: 'mult3g2-q20',
    level: 2,
    questionTypeBadge: 'Melyik szám?',
    figure: <ArrowQ from="?" to="27" />,
    question: 'Melyik számnak a háromszorosa a 27?',
    options: ['9', '8', '7', '24'],
    correctAnswer: 0,
    explanation: '9 · 3 = 27, tehát a 9 háromszorosa a 27.'
  },

  // ---------- 3. szint ----------
  {
    id: 'mult3g2-q21',
    level: 3,
    questionTypeBadge: 'Két lépés',
    figure: <BasketQ n={5} />,
    question: '5 kosárban 3-3 alma van. Megettünk 2 almát. Hány maradt?',
    options: ['13', '15', '17', '12'],
    correctAnswer: 0,
    explanation: 'Előbb: 5 · 3 = 15 alma. Aztán: 15 − 2 = 13 alma maradt.'
  },
  {
    id: 'mult3g2-q22',
    level: 3,
    questionTypeBadge: 'Nyitott mondat',
    figure: <BetweenQ />,
    question: '8 · 3 < □ < 9 · 3. Melyik szám lehet a □?',
    options: ['25', '24', '27', '28'],
    correctAnswer: 0,
    explanation: '8 · 3 = 24 és 9 · 3 = 27. A kettő között a 25 és a 26 van.'
  },
  {
    id: 'mult3g2-q23',
    level: 3,
    questionTypeBadge: 'Melyik igaz?',
    question: 'Melyik igaz?',
    options: ['6 · 3 = 5 · 3 + 3', '6 · 3 = 5 · 3 + 6', '6 · 3 = 6 + 3', '6 · 3 = 3 · 3 + 3'],
    correctAnswer: 0,
    explanation: '5 · 3 = 15, és még egy hármas: 15 + 3 = 18. 6 · 3 is 18.'
  },
  {
    id: 'mult3g2-q24',
    level: 3,
    questionTypeBadge: 'Maradt',
    figure: <TriQ n={4} caption="Lilinek 20 pálcikája volt." />,
    question: 'Lili 4 háromszöget rakott ki. Hány pálcika maradt?',
    options: ['8', '12', '9', '16'],
    correctAnswer: 0,
    explanation: '4 · 3 = 12 pálcikát használt. 20 − 12 = 8 maradt.'
  },
  {
    id: 'mult3g2-q25',
    level: 3,
    questionTypeBadge: 'Táblázat',
    figure: <CloverTableQ />,
    question: '7 lóherén hány levél van?',
    options: ['21', '18', '24', '10'],
    correctAnswer: 0,
    explanation: 'Egy lóherén 3 levél. 7 · 3 = 21.'
  },
  {
    id: 'mult3g2-q26',
    level: 3,
    questionTypeBadge: 'Közös többszörös',
    question: 'Melyik számra érkezel kettesével és hármasával ugrálva is?',
    options: ['12', '9', '10', '15'],
    correctAnswer: 0,
    explanation: '12 = 6 · 2 és 12 = 4 · 3. A 9 és a 15 csak hármasával, a 10 csak kettesével jön ki.'
  },
  {
    id: 'mult3g2-q27',
    level: 3,
    questionTypeBadge: 'Ugrás és lépés',
    figure: <JumpPlusQ />,
    question: 'Bence hatszor ugrott hármat, aztán még 2-t lépett. Hova ért?',
    options: ['20', '18', '21', '16'],
    correctAnswer: 0,
    explanation: '6 · 3 = 18. Még 2 lépés: 18 + 2 = 20.'
  },
  {
    id: 'mult3g2-q28',
    level: 3,
    questionTypeBadge: 'Kerekek',
    figure: <TricycleQ n={4} bikes={1} />,
    question: '4 tricikli és 1 bicikli áll itt. Hány kerék van összesen?',
    options: ['14', '12', '15', '5'],
    correctAnswer: 0,
    explanation: 'Triciklik: 4 · 3 = 12 kerék. A biciklinek 2 kereke van: 12 + 2 = 14.'
  },
  {
    id: 'mult3g2-q29',
    level: 3,
    questionTypeBadge: 'Szétszedés',
    figure: <SplitGroupsQ />,
    question: 'Melyik jel kerül a □ helyére?   7 · 3 □ 4 · 3 + 3 · 3',
    options: ['=', '>', '<'],
    correctAnswer: 0,
    explanation: '4 · 3 = 12 és 3 · 3 = 9. 12 + 9 = 21, és 7 · 3 is 21. Egyenlők!'
  },
  {
    id: 'mult3g2-q30',
    level: 3,
    questionTypeBadge: 'Mennyi hiányzik?',
    question: '9 dobozban 3-3 golyó van. Hány golyó hiányzik a 30-hoz?',
    options: ['3', '27', '4', '2'],
    correctAnswer: 0,
    explanation: '9 · 3 = 27 golyó van. 27 + 3 = 30, tehát 3 hiányzik.'
  }
];

export const Mult3G2Quiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => (
  <QuizTemplate
    grade={2}
    chapterId="szorzas"
    topicId="g2-szorzas-3-quiz"
    subtopicId="szorzas-3-mal"
    title="2. Szorzás 3-mal – Kvíz"
    subtitle="30 feladat 3 szinten: hármas csoportok, ugrások, a 3-as tábla, többszörösök és rövid szöveges feladatok."
    badge="2. OSZTÁLY • IV. SZORZÁS • KVÍZ"
    questions={MULT3_G2_QUESTIONS}
    cheatSheets={[
      {
        title: 'Mit jelent a 4 · 3?',
        items: ['4 · 3 = négyszer három', '4 · 3 = 3 + 3 + 3 + 3 = 12', 'Első szám: hányszor', 'Második szám: mennyi']
      },
      {
        title: 'A 3-as tábla',
        items: ['1 · 3 = 3, 2 · 3 = 6, 3 · 3 = 9', '4 · 3 = 12, 5 · 3 = 15, 6 · 3 = 18', '7 · 3 = 21, 8 · 3 = 24, 9 · 3 = 27', '10 · 3 = 30, 0 · 3 = 0']
      },
      {
        title: 'Trükkök',
        items: ['A következő mindig 3-mal több', '5 · 3 = 3 · 5 (felcserélés)', 'A 4 háromszorosa: 4 + 4 + 4 = 12', '8 · 3 < □ < 9 · 3: □ = 25 vagy 26']
      }
    ]}
    onBack={onBack}
    onSwitchToTheory={onSwitchToTheory}
    onSwitchToMatcher={onSwitchToMatcher}
    onSwitchToSorter={onSwitchToSorter}
    initialGameMode={initialGameMode}
    matcherComponent={<Mult3G2Matcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />}
    sorterComponent={<Mult3G2Sorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />}
  />
);

export default Mult3G2Quiz;
