import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { Mult4G2Matcher } from './Mult4G2Matcher';
import { Mult4G2Sorter } from './Mult4G2Sorter';
import { BOX_COLORS, DotArrayPart, FourBoxPart, JumpLinePart, MULT4_FONT } from './Mult4G2Parts';

// ---------------------------------------------------------------------------
// Kérdésábrák
// ---------------------------------------------------------------------------
const UNK = '#dc2626';

const QFig: React.FC<{ children: React.ReactNode; h?: number }> = ({ children, h = 120 }) => (
  <svg viewBox={`0 0 260 ${h}`} className="w-full max-w-[280px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={MULT4_FONT}>
    <rect x="1" y="1" width="258" height={h - 2} rx="12" fill="#f8fafc" stroke="#cbd5e1" />
    {children}
  </svg>
);

const MiniClover: React.FC<{ cx: number; cy: number; s?: number }> = ({ cx, cy, s = 1 }) => (
  <g transform={`translate(${cx} ${cy}) scale(${s})`}>
    <path d="M 0 4 Q 3 16 -3 24" fill="none" stroke="#15803d" strokeWidth="2.5" strokeLinecap="round" />
    {[
      [-6, -6],
      [6, -6],
      [-6, 6],
      [6, 6]
    ].map(([dx, dy], i) => (
      <circle key={i} cx={dx} cy={dy} r="6.5" fill="#22c55e" stroke="#166534" strokeWidth="1.5" />
    ))}
  </g>
);

/** n lóhere; ha `split` meg van adva, két csoport (pl. Bence és Panni). */
const CloversFig: React.FC<{ n: number; split?: number; names?: [string, string] }> = ({ n, split, names }) => {
  if (split !== undefined && names) {
    const m = n - split;
    return (
      <QFig h={112}>
        <text x="66" y="22" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#334155">
          {names[0]}
        </text>
        {Array.from({ length: split }, (_, i) => (
          <MiniClover key={`a${i}`} cx={18 + i * 24} cy={56} s={0.85} />
        ))}
        <line x1="134" y1="12" x2="134" y2="100" stroke="#cbd5e1" strokeWidth="2" />
        <text x="196" y="22" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#334155">
          {names[1]}
        </text>
        {Array.from({ length: m }, (_, i) => (
          <MiniClover key={`b${i}`} cx={170 + i * 26} cy={56} s={0.85} />
        ))}
      </QFig>
    );
  }
  const gap = Math.min(60, 220 / n);
  const x0 = 130 - ((n - 1) * gap) / 2;
  return (
    <QFig h={100}>
      {Array.from({ length: n }, (_, i) => (
        <MiniClover key={i} cx={x0 + i * gap} cy={42} s={1.3} />
      ))}
    </QFig>
  );
};

/** n négyes doboz. */
const GroupsFig: React.FC<{ n: number }> = ({ n }) => {
  const perRow = Math.min(n, 5);
  const rows = Math.ceil(n / perRow);
  const size = 38;
  const gx = 46;
  const x0 = 130 - ((perRow - 1) * gx + size) / 2;
  const h = 24 + rows * 48;
  return (
    <QFig h={h}>
      {Array.from({ length: n }, (_, i) => (
        <FourBoxPart key={i} x={x0 + (i % perRow) * gx} y={14 + Math.floor(i / perRow) * 48} size={size} color={BOX_COLORS[i % BOX_COLORS.length]} />
      ))}
    </QFig>
  );
};

/** ? darab négyes doboz = total */
const BoxesQFig: React.FC<{ total: number }> = ({ total }) => (
  <QFig h={90}>
    <text x="58" y="56" textAnchor="middle" fontSize="30" fontWeight="bold" fill={UNK}>
      ?
    </text>
    <text x="84" y="56" textAnchor="middle" fontSize="28" fontWeight="bold" fill="#334155">
      ·
    </text>
    <FourBoxPart x={100} y={22} size={44} color="#8b5cf6" />
    <text x="196" y="56" textAnchor="middle" fontSize="28" fontWeight="bold" fill="#334155">
      = {total}
    </text>
  </QFig>
);

/** Kenguru-számegyenes 0–40. */
const JumpsFig: React.FC<{ jumps: number; endQuestion?: boolean; target?: number; band?: [number, number] }> = ({
  jumps,
  endQuestion = true,
  target,
  band
}) => {
  const x = 20;
  const w = 220;
  const u = w / 40;
  return (
    <QFig h={110}>
      {band && <rect x={x + band[0] * u} y={40} width={(band[1] - band[0]) * u} height={40} fill="#fde68a" opacity="0.7" rx="4" />}
      {target !== undefined ? (
        <>
          <JumpLinePart x={x} y={70} w={w} max={40} jumps={1} step={4} />
          <text x={x + 2 * u} y={38} textAnchor="middle" fontSize="12" fontWeight="bold" fill="#7c3aed">
            4
          </text>
          <circle cx={x + target * u} cy={70} r="5" fill={UNK} />
          <text x={x + target * u} y={50} textAnchor="middle" fontSize="16" fontWeight="bold" fill={UNK}>
            {target}
          </text>
        </>
      ) : (
        <JumpLinePart x={x} y={70} w={w} max={40} jumps={jumps} step={4} endQuestion={endQuestion} />
      )}
    </QFig>
  );
};

/** rows sor, soronként 4 korong. */
const ArrayFig: React.FC<{ rows: number }> = ({ rows }) => {
  const gap = rows > 6 ? 13 : 16;
  const h = 26 + rows * gap;
  return (
    <QFig h={h}>
      <DotArrayPart x={104} y={20} rows={rows} cols={4} gap={gap} r={gap * 0.36} />
    </QFig>
  );
};

/** Számsor dobozokban. */
const SeqFig: React.FC<{ items: string[] }> = ({ items }) => {
  const w = 44;
  const gap = 6;
  const x0 = 130 - (items.length * w + (items.length - 1) * gap) / 2;
  return (
    <QFig h={70}>
      {items.map((t, i) => (
        <g key={i}>
          <rect x={x0 + i * (w + gap)} y={16} width={w} height={38} rx="8" fill={t === '?' ? '#fee2e2' : '#ede9fe'} stroke={t === '?' ? UNK : '#7c3aed'} strokeWidth="2" />
          <text x={x0 + i * (w + gap) + w / 2} y={43} textAnchor="middle" fontSize="20" fontWeight="bold" fill={t === '?' ? UNK : '#4c1d95'}>
            {t}
          </text>
        </g>
      ))}
    </QFig>
  );
};

/** Egyszerű négylábú kutya. */
const Dog: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <g transform={`translate(${x} ${y})`}>
    <rect x="0" y="0" width="44" height="18" rx="9" fill="#d97706" stroke="#78350f" strokeWidth="2" />
    <circle cx="48" cy="-4" r="10" fill="#d97706" stroke="#78350f" strokeWidth="2" />
    <circle cx="51" cy="-6" r="1.8" fill="#1e293b" />
    <path d="M 0 4 L -10 -6" stroke="#78350f" strokeWidth="3" strokeLinecap="round" />
    {[5, 14, 30, 39].map((lx) => (
      <line key={lx} x1={lx} y1="16" x2={lx} y2="32" stroke="#78350f" strokeWidth="3.5" strokeLinecap="round" />
    ))}
  </g>
);

/** Egyszerű kétlábú tyúk. */
const Hen: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <g transform={`translate(${x} ${y})`}>
    <ellipse cx="16" cy="6" rx="16" ry="12" fill="#f8fafc" stroke="#475569" strokeWidth="2" />
    <circle cx="32" cy="-6" r="7" fill="#f8fafc" stroke="#475569" strokeWidth="2" />
    <path d="M 30 -13 L 33 -18 L 36 -13" fill="#ef4444" />
    <path d="M 39 -6 L 44 -4 L 39 -2" fill="#f59e0b" />
    {[11, 21].map((lx) => (
      <line key={lx} x1={lx} y1="17" x2={lx} y2="30" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round" />
    ))}
  </g>
);

const AnimalsFig: React.FC<{ dogs: number; hens?: number }> = ({ dogs, hens = 0 }) => (
  <QFig h={96}>
    {Array.from({ length: dogs }, (_, i) => (
      <Dog key={`d${i}`} x={22 + i * 66} y={44} />
    ))}
    {Array.from({ length: hens }, (_, i) => (
      <Hen key={`h${i}`} x={22 + dogs * 66 + i * 52} y={50} />
    ))}
  </QFig>
);

/** n · 2 tömb és mellette a duplája kérdőjellel. */
const DoubleFig: React.FC<{ n: number }> = ({ n }) => {
  const gap = 12;
  const h = 46 + n * gap;
  return (
    <QFig h={h}>
      <DotArrayPart x={40} y={18} rows={n} cols={2} gap={gap} r={4.5} />
      <text x="46" y={h - 10} textAnchor="middle" fontSize="13" fontWeight="bold" fill="#6d28d9">
        {n} · 2 = {n * 2}
      </text>
      <text x="104" y={18 + (n * gap) / 2} textAnchor="middle" fontSize="22" fontWeight="bold" fill="#334155">
        →
      </text>
      <DotArrayPart x={140} y={18} rows={n} cols={4} gap={gap} r={4.5} splitCol={2} />
      <text x="168" y={h - 10} textAnchor="middle" fontSize="13" fontWeight="bold" fill="#c2410c">
        {n} · 4 = <tspan fill={UNK}>?</tspan>
      </text>
    </QFig>
  );
};

const CommuteFig: React.FC = () => (
  <QFig h={110}>
    <DotArrayPart x={30} y={24} rows={3} cols={4} gap={18} r={6.5} colorA="#0ea5e9" />
    <text x="57" y="96" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#075985">
      3 · 4
    </text>
    <text x="130" y="50" textAnchor="middle" fontSize="26" fontWeight="bold" fill="#334155">
      =
    </text>
    <DotArrayPart x={180} y={18} rows={4} cols={3} gap={16} r={6} colorA="#f97316" />
    <text x="196" y="96" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#9a3412">
      4 · <tspan fill={UNK}>?</tspan>
    </text>
  </QFig>
);

const CompareFig: React.FC<{ left: string; right: string }> = ({ left, right }) => (
  <QFig h={80}>
    <rect x="18" y="18" width="88" height="44" rx="10" fill="#ede9fe" stroke="#7c3aed" strokeWidth="2" />
    <text x="62" y="47" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#4c1d95">
      {left}
    </text>
    <circle cx="130" cy="40" r="17" fill="#fee2e2" stroke={UNK} strokeWidth="2" />
    <text x="130" y="47" textAnchor="middle" fontSize="18" fontWeight="bold" fill={UNK}>
      ?
    </text>
    <rect x="154" y="18" width="88" height="44" rx="10" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
    <text x="198" y="47" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#075985">
      {right}
    </text>
  </QFig>
);

const TwoArraysFig: React.FC = () => (
  <QFig h={110}>
    <DotArrayPart x={36} y={20} rows={4} cols={4} gap={18} r={6.5} />
    <text x="63" y="100" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#4c1d95">
      4 · 4
    </text>
    <DotArrayPart x={130} y={16} rows={2} cols={8} gap={14} r={5.5} colorA="#10b981" />
    <text x="179" y="70" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#047857">
      8 · 2
    </text>
  </QFig>
);

const MachineFig: React.FC<{ start: number; ops: string[] }> = ({ start, ops }) => {
  const n = ops.length + 1;
  const w = 40;
  const gap = (240 - (n + 0) * w) / ops.length;
  return (
    <QFig h={84}>
      {Array.from({ length: n }, (_, i) => {
        const bx = 10 + i * (w + gap);
        const label = i === 0 ? String(start) : i === n - 1 ? '?' : '';
        return (
          <g key={i}>
            <rect x={bx} y={36} width={w} height={34} rx="8" fill={label === '?' ? '#fee2e2' : '#ede9fe'} stroke={label === '?' ? UNK : '#7c3aed'} strokeWidth="2" />
            <text x={bx + w / 2} y={60} textAnchor="middle" fontSize="18" fontWeight="bold" fill={label === '?' ? UNK : '#4c1d95'}>
              {label}
            </text>
            {i < ops.length && (
              <>
                <path d={`M ${bx + w + 2} 46 Q ${bx + w + gap / 2} 22 ${bx + w + gap - 2} 46`} fill="none" stroke="#ea580c" strokeWidth="2" />
                <text x={bx + w + gap / 2} y={24} textAnchor="middle" fontSize="15" fontWeight="bold" fill="#c2410c">
                  {ops[i]}
                </text>
              </>
            )}
          </g>
        );
      })}
    </QFig>
  );
};

const CarTop: React.FC<{ x: number; y: number }> = ({ x, y }) => (
  <g transform={`translate(${x} ${y})`}>
    {[
      [-4, 4],
      [30, 4],
      [-4, 30],
      [30, 30]
    ].map(([wx, wy], i) => (
      <rect key={i} x={wx} y={wy} width="8" height="12" rx="2" fill="#1e293b" />
    ))}
    <rect x="0" y="0" width="34" height="46" rx="9" fill="#3b82f6" stroke="#1e3a8a" strokeWidth="2" />
    <rect x="6" y="8" width="22" height="10" rx="3" fill="#bfdbfe" />
  </g>
);

const WheelsFig: React.FC = () => (
  <QFig h={90}>
    {[0, 1, 2].map((i) => (
      <CarTop key={i} x={22 + i * 52} y={22} />
    ))}
    <g transform="translate(196 44)">
      <circle cx="0" cy="12" r="12" fill="none" stroke="#1e293b" strokeWidth="3" />
      <circle cx="36" cy="12" r="12" fill="none" stroke="#1e293b" strokeWidth="3" />
      <path d="M 0 12 L 14 -6 L 30 -6 L 36 12 M 14 -6 L 18 12" fill="none" stroke="#dc2626" strokeWidth="3" strokeLinecap="round" />
    </g>
  </QFig>
);

const BarsFig: React.FC<{ unit: string; times: number; names: [string, string] }> = ({ unit, times, names }) => (
  <QFig h={96}>
    <text x="14" y="34" fontSize="13" fontWeight="bold" fill="#334155">
      {names[0]}
    </text>
    <rect x="70" y="18" width="40" height="24" rx="4" fill="#c4b5fd" stroke="#6d28d9" strokeWidth="2" />
    <text x="90" y="35" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#4c1d95">
      {unit}
    </text>
    <text x="14" y="76" fontSize="13" fontWeight="bold" fill="#334155">
      {names[1]}
    </text>
    {Array.from({ length: times }, (_, i) => (
      <g key={i}>
        <rect x={70 + i * 40} y="60" width="40" height="24" rx="4" fill="#fed7aa" stroke="#c2410c" strokeWidth="2" />
        <text x={90 + i * 40} y="77" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#9a3412">
          {unit}
        </text>
      </g>
    ))}
    <text x={70 + times * 40 + 14} y="78" textAnchor="middle" fontSize="18" fontWeight="bold" fill={UNK}>
      ?
    </text>
  </QFig>
);

// ---------------------------------------------------------------------------
// Kérdések
// ---------------------------------------------------------------------------
export const MULT4_G2_QUESTIONS: QuizQuestion[] = [
  // ---------- 1. szint ----------
  {
    id: 'mult4g2-q1',
    level: 1,
    questionTypeBadge: 'Lóherék',
    figure: <CloversFig n={3} />,
    question: 'Minden lóherének 4 levele van. Hány levél van összesen?',
    options: ['12', '7', '16', '8'],
    correctAnswer: 0,
    explanation: '3 lóhere, mindegyiken 4 levél: 4 + 4 + 4 = 12. Szorzással: 3 · 4 = 12.'
  },
  {
    id: 'mult4g2-q2',
    level: 1,
    questionTypeBadge: 'Összeadásból szorzás',
    figure: <GroupsFig n={5} />,
    question: 'Melyik szorzás illik a képhez?',
    options: ['5 · 4', '4 + 5', '6 · 4', '4 · 4'],
    correctAnswer: 0,
    explanation: '5 doboz van, mindegyikben 4 golyó. 4 + 4 + 4 + 4 + 4 = 5 · 4.'
  },
  {
    id: 'mult4g2-q3',
    level: 1,
    questionTypeBadge: 'Két négyes',
    figure: <GroupsFig n={2} />,
    question: 'Mennyi 2 · 4?',
    options: ['8', '6', '10', '4'],
    correctAnswer: 0,
    explanation: '2 · 4 = 4 + 4 = 8. Nem 6, mert nem 2 + 4-et számolunk!'
  },
  {
    id: 'mult4g2-q4',
    level: 1,
    questionTypeBadge: 'Kenguruugrás',
    figure: <JumpsFig jumps={3} />,
    question: 'A kenguru mindig 4-et ugrik. Hová ér 3 ugrással?',
    options: ['12', '3', '7', '16'],
    correctAnswer: 0,
    explanation: '4, 8, 12. Három ugrás: 3 · 4 = 12.'
  },
  {
    id: 'mult4g2-q5',
    level: 1,
    questionTypeBadge: 'Pontrács',
    figure: <ArrayFig rows={5} />,
    question: '5 sor, minden sorban 4 korong. Hány korong van?',
    options: ['20', '9', '24', '16'],
    correctAnswer: 0,
    explanation: '5 · 4 = 20. Négyesével: 4, 8, 12, 16, 20.'
  },
  {
    id: 'mult4g2-q6',
    level: 1,
    questionTypeBadge: 'Tízszer négy',
    question: 'Mennyi 10 · 4?',
    options: ['40', '14', '44', '36'],
    correctAnswer: 0,
    explanation: '10 darab négyes: 10 · 4 = 40. A 14 az összeadás lenne (10 + 4).'
  },
  {
    id: 'mult4g2-q7',
    level: 1,
    questionTypeBadge: 'Négyesével számolj',
    figure: <SeqFig items={['4', '8', '12', '16', '?']} />,
    question: 'Mi jön a ? helyére?',
    options: ['20', '17', '18', '24'],
    correctAnswer: 0,
    explanation: 'Mindig 4-gyel több: 16 + 4 = 20.'
  },
  {
    id: 'mult4g2-q8',
    level: 1,
    questionTypeBadge: 'Kutyalábak',
    figure: <AnimalsFig dogs={2} />,
    question: 'Egy kutyának 4 lába van. Hány lába van 2 kutyának?',
    options: ['8', '6', '4', '10'],
    correctAnswer: 0,
    explanation: '2 · 4 = 4 + 4 = 8 láb.'
  },
  {
    id: 'mult4g2-q9',
    level: 1,
    questionTypeBadge: 'A 4 többszöröse',
    question: 'Melyik szám van benne a 4-es szorzótáblában?',
    options: ['28', '18', '30', '14'],
    correctAnswer: 0,
    explanation: '7 · 4 = 28. A 18 és a 14 a 2-es táblában van, a 30 a 3-asban, de egyik sem a 4-esben.'
  },
  {
    id: 'mult4g2-q10',
    level: 1,
    questionTypeBadge: 'Egyszer négy',
    figure: <GroupsFig n={1} />,
    question: 'Mennyi 1 · 4?',
    options: ['4', '5', '1', '0'],
    correctAnswer: 0,
    explanation: 'Egy doboz, benne 4 golyó: 1 · 4 = 4. Nem adunk össze, ezért nem 5.'
  },

  // ---------- 2. szint ----------
  {
    id: 'mult4g2-q11',
    level: 2,
    questionTypeBadge: 'Hat sor',
    figure: <ArrayFig rows={6} />,
    question: 'Mennyi 6 · 4?',
    options: ['24', '20', '28', '10'],
    correctAnswer: 0,
    explanation: '5 · 4 = 20, és még egy négyes: 20 + 4 = 24.'
  },
  {
    id: 'mult4g2-q12',
    level: 2,
    questionTypeBadge: 'Szorzótábla',
    question: 'Mennyi 7 · 4?',
    options: ['28', '24', '32', '11'],
    correctAnswer: 0,
    explanation: '7 · 2 = 14, és ennek a duplája 14 + 14 = 28.'
  },
  {
    id: 'mult4g2-q13',
    level: 2,
    questionTypeBadge: 'Szorzótábla',
    question: 'Mennyi 8 · 4?',
    options: ['32', '28', '36', '12'],
    correctAnswer: 0,
    explanation: '8 · 2 = 16, és 16 + 16 = 32.'
  },
  {
    id: 'mult4g2-q14',
    level: 2,
    questionTypeBadge: 'Kilenc ugrás',
    figure: <JumpsFig jumps={9} />,
    question: 'A kenguru 9-et ugrik, mindig 4-et. Hová ér?',
    options: ['36', '32', '40', '13'],
    correctAnswer: 0,
    explanation: '10 ugrással 40-re érne. Egy ugrással kevesebb: 40 − 4 = 36.'
  },
  {
    id: 'mult4g2-q15',
    level: 2,
    questionTypeBadge: 'Hány doboz?',
    figure: <BoxesQFig total={20} />,
    question: 'Hány négyes doboz kell 20 golyóhoz? □ · 4 = 20',
    options: ['5', '4', '6', '16'],
    correctAnswer: 0,
    explanation: 'Számolj négyesével 20-ig: 4, 8, 12, 16, 20. Ez 5 szám, tehát 5 · 4 = 20.'
  },
  {
    id: 'mult4g2-q16',
    level: 2,
    questionTypeBadge: '2-es és 4-es tábla',
    figure: <DoubleFig n={7} />,
    question: '7 · 2 = 14. Mennyi 7 · 4?',
    options: ['28', '16', '21', '14'],
    correctAnswer: 0,
    explanation: 'A 4-szeres a 2-szeres duplája: 14 + 14 = 28.'
  },
  {
    id: 'mult4g2-q17',
    level: 2,
    questionTypeBadge: 'Felcserélés',
    figure: <CommuteFig />,
    question: 'Mi kerül a □ helyére? 3 · 4 = 4 · □',
    options: ['3', '4', '12', '7'],
    correctAnswer: 0,
    explanation: 'A két szám helyet cserélhet: 3 · 4 = 4 · 3 = 12.'
  },
  {
    id: 'mult4g2-q18',
    level: 2,
    questionTypeBadge: 'Nulla',
    question: 'Mennyi 0 · 4?',
    options: ['0', '4', '40', '1'],
    correctAnswer: 0,
    explanation: 'Nulla darab négyes: nincs semmi. 0 · 4 = 0.'
  },
  {
    id: 'mult4g2-q19',
    level: 2,
    questionTypeBadge: 'Összehasonlítás',
    figure: <CompareFig left="6 · 4" right="25" />,
    question: 'Melyik jel kerül a ? helyére?',
    options: ['<', '>', '='],
    correctAnswer: 0,
    explanation: '6 · 4 = 24. A 24 kisebb, mint 25, ezért 6 · 4 < 25.'
  },
  {
    id: 'mult4g2-q20',
    level: 2,
    questionTypeBadge: 'Hány ugrás?',
    figure: <JumpsFig jumps={0} target={32} />,
    question: 'A kenguru mindig 4-et ugrik. Hány ugrással ér a 32-re?',
    options: ['8', '7', '9', '16'],
    correctAnswer: 0,
    explanation: '8 · 4 = 32, tehát 8 ugrás kell. A 16 ugrás a békáé lenne, aki 2-t ugrik.'
  },

  // ---------- 3. szint ----------
  {
    id: 'mult4g2-q21',
    level: 3,
    questionTypeBadge: 'Muffinos dobozok',
    figure: <GroupsFig n={7} />,
    question: 'Egy dobozban 4 muffin van. Lili 7 dobozt vett. Hány muffint vett?',
    options: ['28', '11', '24', '32'],
    correctAnswer: 0,
    explanation: '7 · 4 = 28 muffin. A 11 az lenne, ha összeadnád: 7 + 4.'
  },
  {
    id: 'mult4g2-q22',
    level: 3,
    questionTypeBadge: 'Két gyerek lóherét gyűjt',
    figure: <CloversFig n={8} split={5} names={['Bence', 'Panni']} />,
    question: 'Bence 5, Panni 3 lóherét talált. Mindegyiknek 4 levele van. Hány levél van összesen?',
    options: ['32', '20', '12', '28'],
    correctAnswer: 0,
    explanation: '5 + 3 = 8 lóhere. 8 · 4 = 32 levél. (Vagy: 20 + 12 = 32.)'
  },
  {
    id: 'mult4g2-q23',
    level: 3,
    questionTypeBadge: 'Szorzás és kivonás',
    question: 'Mennyi 8 · 4 − 2?',
    options: ['30', '32', '34', '28'],
    correctAnswer: 0,
    explanation: 'Előbb szorozz: 8 · 4 = 32. Aztán vonj ki: 32 − 2 = 30.'
  },
  {
    id: 'mult4g2-q24',
    level: 3,
    questionTypeBadge: 'Melyik igaz?',
    figure: <TwoArraysFig />,
    question: 'Melyik egyenlőség igaz?',
    options: ['4 · 4 = 8 · 2', '3 · 4 = 6 · 3', '5 · 4 = 10 · 4', '2 · 4 = 4 + 2'],
    correctAnswer: 0,
    explanation: '4 · 4 = 16 és 8 · 2 = 16. Mindkét oldalon 16 korong van.'
  },
  {
    id: 'mult4g2-q25',
    level: 3,
    questionTypeBadge: 'Számológép',
    figure: <MachineFig start={2} ops={['· 4', '+ 3']} />,
    question: 'Kezdd a 2-vel! Szorozd meg 4-gyel, aztán adj hozzá 3-at! Mit kapsz?',
    options: ['11', '20', '9', '14'],
    correctAnswer: 0,
    explanation: '2 · 4 = 8, és 8 + 3 = 11. Figyelj a sorrendre!'
  },
  {
    id: 'mult4g2-q26',
    level: 3,
    questionTypeBadge: 'Kerekek',
    figure: <WheelsFig />,
    question: '3 autó és 1 bicikli áll az udvaron. Hány kerekük van összesen?',
    options: ['14', '12', '16', '9'],
    correctAnswer: 0,
    explanation: '3 autónak 3 · 4 = 12 kereke van. A biciklinek 2. 12 + 2 = 14.'
  },
  {
    id: 'mult4g2-q27',
    level: 3,
    questionTypeBadge: 'Négyszer annyi',
    figure: <BarsFig unit="9" times={4} names={['Peti', 'Nóra']} />,
    question: 'Peti 9 matricát kapott. Nóra 4-szer annyit. Hány matricát kapott Nóra?',
    options: ['36', '13', '32', '40'],
    correctAnswer: 0,
    explanation: '4-szer 9: 9 + 9 + 9 + 9 = 36. Ez ugyanannyi, mint 9 · 4 = 36.'
  },
  {
    id: 'mult4g2-q28',
    level: 3,
    questionTypeBadge: 'Hiányzó szám',
    question: 'Mi kerül a □ helyére? 4 · □ = 24',
    options: ['6', '20', '5', '7'],
    correctAnswer: 0,
    explanation: '4 · 6 = 6 · 4 = 24. A 20 rossz, mert az 24 − 4.'
  },
  {
    id: 'mult4g2-q29',
    level: 3,
    questionTypeBadge: 'Számegyenes',
    figure: <JumpsFig jumps={10} endQuestion={false} band={[10, 30]} />,
    question: 'A kenguru 0-tól 40-ig ugrál. Hány számra ugrik a sárga részen, 10 és 30 között?',
    options: ['5', '4', '6', '20'],
    correctAnswer: 0,
    explanation: 'A 10 és 30 közötti négyes számok: 12, 16, 20, 24, 28. Ez 5 szám.'
  },
  {
    id: 'mult4g2-q30',
    level: 3,
    questionTypeBadge: 'Lábak',
    figure: <AnimalsFig dogs={2} hens={1} />,
    question: 'Az udvaron 2 kutya és 1 tyúk van. Hány lábuk van összesen?',
    options: ['10', '12', '8', '6'],
    correctAnswer: 0,
    explanation: '2 kutyának 2 · 4 = 8 lába van. A tyúknak 2. 8 + 2 = 10 láb.'
  }
];

export const Mult4G2Quiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => (
  <QuizTemplate
    grade={2}
    chapterId="szorzas"
    topicId="g2-szorzas-4-quiz"
    subtopicId="szorzas-4-gyel"
    title="3. Szorzás 4-gyel – Kvíz"
    subtitle="30 feladat 3 szinten: négyes csoportok, a 4-es szorzótábla, kapcsolat a 2-es táblával, szöveges feladatok."
    badge="2. OSZTÁLY • IV. SZORZÁS • KVÍZ"
    questions={MULT4_G2_QUESTIONS}
    cheatSheets={[
      {
        title: 'A 4-es szorzótábla',
        items: ['1 · 4 = 4, 2 · 4 = 8, 3 · 4 = 12', '4 · 4 = 16, 5 · 4 = 20, 6 · 4 = 24', '7 · 4 = 28, 8 · 4 = 32', '9 · 4 = 36, 10 · 4 = 40']
      },
      {
        title: 'Duplázás',
        items: ['4 = 2 + 2', 'Előbb · 2, aztán duplázd!', '6 · 2 = 12 → 6 · 4 = 24', '9 · 2 = 18 → 9 · 4 = 36']
      },
      {
        title: 'Jó tudni',
        items: ['0 · 4 = 0', '3 · 4 = 4 · 3', 'Négyesével: 4, 8, 12, 16, 20 …', 'Előbb szorozz, aztán adj hozzá!']
      }
    ]}
    onBack={onBack}
    onSwitchToTheory={onSwitchToTheory}
    onSwitchToMatcher={onSwitchToMatcher}
    onSwitchToSorter={onSwitchToSorter}
    initialGameMode={initialGameMode}
    matcherComponent={<Mult4G2Matcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />}
    sorterComponent={<Mult4G2Sorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />}
  />
);

export default Mult4G2Quiz;
