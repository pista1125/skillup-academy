import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { Sub100G2Matcher } from './Sub100G2Matcher';
import { Sub100G2Sorter } from './Sub100G2Sorter';
import { N100_FONT, N100_COLORS, NumberLinePart, LineHop, LineMark } from '../szamok-100-ig/Numbers100G2Parts';
import { RodsSubPart, rodsSubWidth } from './Sub100G2Parts';

// ---------------------------------------------------------------------------
// Kérdésábrák
// ---------------------------------------------------------------------------
const UNK = N100_COLORS.unknown;
const R = '#e11d48';
const B = '#2563eb';
const O = '#ea580c';
const G = '#16a34a';
const P = '#7c3aed';

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

/** a − b rudakkal: az elvett rész áthúzva (ha kell, egy rúd már szét van bontva). */
const RodsSubFig: React.FC<{ a: number; b: number; caption?: string }> = ({ a, b, caption }) => {
  const u = 8;
  const w = rodsSubWidth(a, b, u);
  return (
    <QFig h={122}>
      <RodsSubPart x={130 - w / 2} y={10} a={a} b={b} u={u} />
      <text x="130" y="112" textAnchor="middle" fontSize="15" fontWeight="900" fill="#334155">
        {caption ?? (
          <>
            {a} − {b} = <tspan fill={UNK}>?</tspan>
          </>
        )}
      </text>
    </QFig>
  );
};

const HopFig: React.FC<{
  from: number;
  to: number;
  hops: LineHop[];
  marks?: LineMark[];
  extraLabels?: number[];
  labelEvery?: number;
  labelEnds?: boolean;
}> = ({ from, to, hops, marks = [], extraLabels = [], labelEvery = 10, labelEnds = true }) => (
  <QFig h={108}>
    <NumberLinePart
      x={18}
      y={72}
      width={214}
      from={from}
      to={to}
      hops={hops}
      marks={marks}
      extraLabels={extraLabels}
      labelEvery={labelEvery}
      labelEnds={labelEnds}
      fontSize={11}
    />
  </QFig>
);

const BagFig: React.FC<{ total: number; take: number; what: string }> = ({ total, take, what }) => (
  <QFig h={104}>
    <path d="M 40 40 Q 30 92 80 94 Q 130 92 120 40 Z" fill="#d6b88a" stroke="#78350f" strokeWidth="2" />
    <path d="M 52 40 L 108 40 L 100 28 L 60 28 Z" fill="#b08455" stroke="#78350f" strokeWidth="2" />
    <text x="80" y="74" textAnchor="middle" fontSize="22" fontWeight="900" fill="#0f172a">{total}</text>
    <text x="80" y="22" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#78350f">{what}</text>
    <path d="M 132 62 L 168 62" stroke={R} strokeWidth="3" />
    <polygon points="170,62 160,56 160,68" fill={R} />
    <circle cx="205" cy="62" r="26" fill="#ffe4e6" stroke={R} strokeWidth="2" />
    <text x="205" y="69" textAnchor="middle" fontSize="20" fontWeight="900" fill={R}>−{take}</text>
  </QFig>
);

const BoxFig: React.FC<{ total: number; take: number }> = ({ total, take }) => (
  <QFig h={100}>
    <rect x="34" y="30" width="96" height="58" rx="6" fill="#bfdbfe" stroke="#1d4ed8" strokeWidth="2" />
    <path d="M 34 30 L 50 14 L 146 14 L 130 30 Z" fill="#93c5fd" stroke="#1d4ed8" strokeWidth="2" />
    <text x="82" y="66" textAnchor="middle" fontSize="22" fontWeight="900" fill="#0f172a">{total}</text>
    {[0, 1, 2].map((i) => (
      <g key={i}>
        <circle cx={170 + i * 26} cy="40" r="10" fill="#fde047" stroke="#a16207" strokeWidth="1.5" />
        <circle cx={167 + i * 26} cy="38" r="1.6" fill="#a16207" />
        <circle cx={173 + i * 26} cy="38" r="1.6" fill="#a16207" />
        <circle cx={167 + i * 26} cy="43" r="1.6" fill="#a16207" />
        <circle cx={173 + i * 26} cy="43" r="1.6" fill="#a16207" />
      </g>
    ))}
    <text x="196" y="80" textAnchor="middle" fontSize="20" fontWeight="900" fill={R}>−{take}</text>
  </QFig>
);

/** Szakaszos ábra: egész és rész. */
const PartWholeFig: React.FC<{ whole: string; part: string; rest: string; unit: number; wholeVal: number; partVal: number }> = ({
  whole,
  part,
  rest,
  unit,
  wholeVal,
  partVal
}) => {
  const x0 = 20;
  const ww = wholeVal * unit;
  const wp = partVal * unit;
  return (
    <QFig h={92}>
      <path d={`M ${x0} 30 L ${x0} 22 L ${x0 + ww} 22 L ${x0 + ww} 30`} fill="none" stroke="#0f172a" strokeWidth="2" />
      <text x={x0 + ww / 2} y="17" textAnchor="middle" fontSize="14" fontWeight="900" fill="#0f172a">{whole}</text>
      <rect x={x0} y={36} width={wp} height={30} rx="5" fill="#c4b5fd" stroke="#6d28d9" strokeWidth="2" />
      <text x={x0 + wp / 2} y={56} textAnchor="middle" fontSize="15" fontWeight="900" fill="#4c1d95">{part}</text>
      <rect x={x0 + wp} y={36} width={ww - wp} height={30} rx="5" fill={rest === '?' ? '#fee2e2' : '#bbf7d0'} stroke={rest === '?' ? UNK : '#15803d'} strokeWidth="2" />
      <text x={x0 + wp + (ww - wp) / 2} y={56} textAnchor="middle" fontSize="15" fontWeight="900" fill={rest === '?' ? UNK : '#14532d'}>{rest}</text>
    </QFig>
  );
};

/** Két szalag: a második rövidebb. */
const RibbonsFig: React.FC<{ long: number; shorter: number }> = ({ long, shorter }) => {
  const unit = 2.6;
  const x0 = 54;
  return (
    <QFig h={96}>
      <text x="14" y="36" fontSize="13" fontWeight="bold" fill="#1d4ed8">kék</text>
      <rect x={x0} y={22} width={long * unit} height={18} rx="4" fill="#60a5fa" stroke="#1d4ed8" strokeWidth="1.5" />
      <text x={x0 + (long * unit) / 2} y={36} textAnchor="middle" fontSize="13" fontWeight="900" fill="#0f172a">{long} cm</text>
      <text x="14" y="70" fontSize="13" fontWeight="bold" fill="#be123c">piros</text>
      <rect x={x0} y={56} width={(long - shorter) * unit} height={18} rx="4" fill="#fda4af" stroke="#be123c" strokeWidth="1.5" />
      <text x={x0 + ((long - shorter) * unit) / 2} y={70} textAnchor="middle" fontSize="14" fontWeight="900" fill={UNK}>?</text>
      <rect x={x0 + (long - shorter) * unit} y={56} width={shorter * unit} height={18} rx="4" fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4 3" />
      <text x={x0 + (long - shorter / 2) * unit} y={70} textAnchor="middle" fontSize="12" fontWeight="bold" fill="#64748b">{shorter} cm</text>
    </QFig>
  );
};

const ChainFig: React.FC<{ start: number; ops: string[] }> = ({ start, ops }) => {
  const bw = 46;
  const gap = 34;
  const n = ops.length + 1;
  const x0 = 130 - (n * bw + (n - 1) * gap) / 2;
  return (
    <QFig h={80}>
      {Array.from({ length: n }, (_, i) => {
        const x = x0 + i * (bw + gap);
        const last = i === n - 1;
        return (
          <g key={i}>
            <rect x={x} y={28} width={bw} height={32} rx="8" fill={i === 0 ? '#ede9fe' : last ? '#fee2e2' : '#ffffff'} stroke="#6d28d9" strokeWidth="2" />
            <text x={x + bw / 2} y={50} textAnchor="middle" fontSize="16" fontWeight="900" fill={last ? UNK : '#0f172a'}>
              {i === 0 ? start : last ? '?' : '□'}
            </text>
            {i < n - 1 && (
              <g>
                <line x1={x + bw + 2} y1={44} x2={x + bw + gap - 4} y2={44} stroke={R} strokeWidth="2" />
                <polygon points={`${x + bw + gap - 2},44 ${x + bw + gap - 9},40 ${x + bw + gap - 9},48`} fill={R} />
                <text x={x + bw + gap / 2} y={22} textAnchor="middle" fontSize="13" fontWeight="900" fill={R}>{ops[i]}</text>
              </g>
            )}
          </g>
        );
      })}
    </QFig>
  );
};

const BalanceFig: React.FC<{ left: string; right: string }> = ({ left, right }) => (
  <QFig h={110}>
    <polygon points="130,56 112,96 148,96" fill="#475569" />
    <line x1="34" y1="56" x2="226" y2="56" stroke="#1e293b" strokeWidth="4" strokeLinecap="round" />
    <rect x="18" y="16" width="94" height="34" rx="8" fill="#ede9fe" stroke="#6d28d9" strokeWidth="2" />
    <text x="65" y="39" textAnchor="middle" fontSize="16" fontWeight="900" fill="#4c1d95">{left}</text>
    <rect x="148" y="16" width="94" height="34" rx="8" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
    <text x="195" y="39" textAnchor="middle" fontSize="16" fontWeight="900" fill="#92400e">{right}</text>
  </QFig>
);

const CardsFig: React.FC<{ items: string[] }> = ({ items }) => {
  const w = 50;
  const gap = 10;
  const x0 = 130 - (items.length * w + (items.length - 1) * gap) / 2;
  return (
    <QFig h={74}>
      {items.map((t, i) => (
        <g key={i}>
          <rect x={x0 + i * (w + gap)} y={14} width={w} height={46} rx={8} fill="#ede9fe" stroke="#7c3aed" strokeWidth="2" />
          <text x={x0 + i * (w + gap) + w / 2} y={45} textAnchor="middle" fontSize="21" fontWeight="900" fill="#4c1d95">{t}</text>
        </g>
      ))}
    </QFig>
  );
};

// ---------------------------------------------------------------------------
// Kérdések
// ---------------------------------------------------------------------------
export const SUB100_G2_QUESTIONS: QuizQuestion[] = [
  // ----- 1. szint -----
  {
    id: 'sub100g2-q1',
    level: 1,
    questionTypeBadge: 'Elvétel rudakból',
    figure: <RodsSubFig a={68} b={5} />,
    question: 'Elvettünk 5 kockát. Mennyi maradt? 68 − 5 = ?',
    options: ['63', '73', '62', '13'],
    correctAnswer: 0,
    explanation: 'A 6 rúd marad. A kockák: 8 − 5 = 3. Tehát 68 − 5 = 63.'
  },
  {
    id: 'sub100g2-q2',
    level: 1,
    questionTypeBadge: 'Kistesó',
    question: '8 − 5 = 3. Akkor mennyi 78 − 5?',
    options: ['73', '72', '83', '3'],
    correctAnswer: 0,
    explanation: 'A 7 tízes marad. Az egyesek: 8 − 5 = 3. Tehát 78 − 5 = 73.'
  },
  {
    id: 'sub100g2-q3',
    level: 1,
    questionTypeBadge: 'Visszafelé ugrás',
    figure: (
      <HopFig
        from={80}
        to={92}
        labelEvery={1000}
        extraLabels={[80, 89]}
        labelEnds={false}
        hops={[{ from: 89, to: 83, color: R, label: '−6', h: 16 }]}
        marks={[{ value: 89, color: P }, { value: 83, color: UNK, label: '?' }]}
      />
    ),
    question: 'Hová érkezel? 89 − 6 = ?',
    options: ['83', '82', '84', '95'],
    correctAnswer: 0,
    explanation: '9 − 6 = 3, ezért 89 − 6 = 83. Visszafelé ugrunk, a szám kisebb lesz.'
  },
  {
    id: 'sub100g2-q4',
    level: 1,
    questionTypeBadge: 'Kerek tízesre',
    figure: <RodsSubFig a={74} b={4} />,
    question: 'Mennyi 74 − 4?',
    options: ['70', '78', '71', '60'],
    correctAnswer: 0,
    explanation: 'Mind a 4 kockát elvettük. Csak a 7 rúd marad: 70.'
  },
  {
    id: 'sub100g2-q5',
    level: 1,
    questionTypeBadge: 'Kivonás',
    question: 'Mennyi 96 − 3?',
    options: ['93', '99', '92', '63'],
    correctAnswer: 0,
    explanation: 'Az egyesek: 6 − 3 = 3. A 9 tízes marad: 93.'
  },
  {
    id: 'sub100g2-q6',
    level: 1,
    questionTypeBadge: 'Minden egyes elfogy',
    figure: <RodsSubFig a={57} b={7} />,
    question: 'Mennyi 57 − 7?',
    options: ['50', '40', '51', '64'],
    correctAnswer: 0,
    explanation: '7 − 7 = 0. A tízesek maradnak: 57 − 7 = 50.'
  },
  {
    id: 'sub100g2-q7',
    level: 1,
    questionTypeBadge: 'Számegyenes',
    figure: (
      <HopFig
        from={50}
        to={62}
        labelEvery={1000}
        extraLabels={[50, 59]}
        labelEnds={false}
        hops={[{ from: 59, to: 55, color: R, label: '−4', h: 16 }]}
        marks={[{ value: 59, color: P }, { value: 55, color: UNK, label: '?' }]}
      />
    ),
    question: 'Mennyi 59 − 4?',
    options: ['55', '54', '56', '63'],
    correctAnswer: 0,
    explanation: 'Lépj vissza 4-et: 58, 57, 56, 55. Tehát 55.'
  },
  {
    id: 'sub100g2-q8',
    level: 1,
    questionTypeBadge: 'Melyik művelet?',
    question: 'Melyik kivonás eredménye 81?',
    options: ['86 − 5', '86 − 4', '81 − 5', '87 − 5'],
    correctAnswer: 0,
    explanation: '86 − 5: az egyesek 6 − 5 = 1, ez 81. A többi: 82, 76, 82.'
  },
  {
    id: 'sub100g2-q9',
    level: 1,
    questionTypeBadge: 'Hány tízes marad?',
    question: 'Hány tízes marad a 67 − 4 különbségben?',
    options: ['6 tízes', '4 tízes', '2 tízes', '3 tízes'],
    correctAnswer: 0,
    explanation: '67 − 4 = 63. Csak egyest vettünk el, ezért a 6 tízes marad.'
  },
  {
    id: 'sub100g2-q10',
    level: 1,
    questionTypeBadge: 'Hány maradt?',
    figure: <BagFig total={75} take={3} what="dió" />,
    question: 'A zsákban 75 dió volt. Megettünk 3-at. Hány dió maradt?',
    options: ['72', '78', '73', '45'],
    correctAnswer: 0,
    explanation: '„Megettünk” → elvétel: 75 − 3. Az egyesek 5 − 3 = 2, tehát 72 dió.'
  },

  // ----- 2. szint -----
  {
    id: 'sub100g2-q11',
    level: 2,
    questionTypeBadge: 'Vissza a kerek tízesig',
    figure: (
      <HopFig
        from={50}
        to={66}
        labelEvery={10}
        extraLabels={[63]}
        hops={[
          { from: 63, to: 60, color: O, label: '−3', h: 16 },
          { from: 60, to: 56, color: R, label: '−4', h: 16 }
        ]}
        marks={[{ value: 63, color: P }, { value: 60, color: O }, { value: 56, color: UNK, label: '?' }]}
      />
    ),
    question: 'Mennyi 63 − 7?',
    options: ['56', '64', '57', '66'],
    correctAnswer: 0,
    explanation: '63 − 3 = 60. A 7-ből még 4 marad: 60 − 4 = 56.'
  },
  {
    id: 'sub100g2-q12',
    level: 2,
    questionTypeBadge: 'Rúd bontása',
    figure: <RodsSubFig a={52} b={8} caption="1 rudat felbontottunk: 52 − 8 = ?" />,
    question: 'Mennyi 52 − 8?',
    options: ['44', '56', '54', '34'],
    correctAnswer: 0,
    explanation: '2 kocka kevés. Bontunk: 4 rúd és 12 kocka. 12 − 8 = 4. Marad 4 rúd és 4 kocka: 44.'
  },
  {
    id: 'sub100g2-q13',
    level: 2,
    questionTypeBadge: 'Bontás',
    question: 'Mi kerül a □ helyére?  71 − 5 = 71 − 1 − □',
    options: ['4', '5', '6', '1'],
    correctAnswer: 0,
    explanation: '71 − 1 = 70. Az 5-ből 1-et már elvettél, még 4 kell.'
  },
  {
    id: 'sub100g2-q14',
    level: 2,
    questionTypeBadge: 'Kerek tízesből',
    figure: (
      <HopFig
        from={70}
        to={84}
        labelEvery={1000}
        extraLabels={[70, 80]}
        labelEnds={false}
        hops={[{ from: 80, to: 74, color: R, label: '−6', h: 16 }]}
        marks={[{ value: 80, color: P }, { value: 74, color: UNK, label: '?' }]}
      />
    ),
    question: 'Mennyi 80 − 6?',
    options: ['74', '76', '84', '64'],
    correctAnswer: 0,
    explanation: '10 − 6 = 4, ezért 80 − 6 = 74.'
  },
  {
    id: 'sub100g2-q15',
    level: 2,
    questionTypeBadge: '100-ból',
    figure: (
      <HopFig
        from={88}
        to={100}
        labelEvery={1000}
        extraLabels={[90, 100]}
        labelEnds={false}
        hops={[{ from: 100, to: 91, color: R, label: '−9', h: 16 }]}
        marks={[{ value: 100, color: P }, { value: 91, color: UNK, label: '?' }]}
      />
    ),
    question: 'Mennyi 100 − 9?',
    options: ['91', '99', '90', '19'],
    correctAnswer: 0,
    explanation: '100 = 90 + 10. A 10-ből 9-et elveszel, marad 1. Tehát 100 − 9 = 91.'
  },
  {
    id: 'sub100g2-q16',
    level: 2,
    questionTypeBadge: 'Két kétjegyű',
    figure: <RodsSubFig a={78} b={35} />,
    question: 'Mennyi 78 − 35?',
    options: ['43', '33', '53', '47'],
    correctAnswer: 0,
    explanation: 'Rudak: 7 − 3 = 4. Kockák: 8 − 5 = 3. Marad 4 rúd és 3 kocka: 43.'
  },
  {
    id: 'sub100g2-q17',
    level: 2,
    questionTypeBadge: 'Előbb a tízesek',
    figure: (
      <HopFig
        from={50}
        to={100}
        extraLabels={[96]}
        hops={[
          { from: 96, to: 56, color: G, label: '−40', h: 22 },
          { from: 56, to: 54, color: R, label: '−2', h: 9 }
        ]}
        marks={[{ value: 96, color: P }, { value: 54, color: UNK, label: '?' }]}
      />
    ),
    question: 'Mennyi 96 − 42?',
    options: ['54', '52', '64', '44'],
    correctAnswer: 0,
    explanation: 'Előbb a tízesek: 96 − 40 = 56. Aztán az egyesek: 56 − 2 = 54.'
  },
  {
    id: 'sub100g2-q18',
    level: 2,
    questionTypeBadge: 'Tízesátlépés?',
    question: 'Melyik kivonásban kell bontani (tízesátlépés)?',
    options: ['54 − 7', '58 − 7', '69 − 4', '87 − 6'],
    correctAnswer: 0,
    explanation: 'Az 54-ben csak 4 egyes van, és 7-et kell elvenni. Ez kevés, bontani kell.'
  },
  {
    id: 'sub100g2-q19',
    level: 2,
    questionTypeBadge: 'Hiányzó szám',
    figure: (
      <HopFig
        from={50}
        to={70}
        extraLabels={[56, 65]}
        hops={[{ from: 65, to: 56, color: R, label: '−?', h: 18 }]}
        marks={[{ value: 65, color: P }, { value: 56, color: P }]}
      />
    ),
    question: 'Mi kerül a □ helyére?  65 − □ = 56',
    options: ['9', '11', '19', '8'],
    correctAnswer: 0,
    explanation: '65-től 60-ig 5 lépés, 60-tól 56-ig még 4. Együtt 9. Ellenőrzés: 56 + 9 = 65.'
  },
  {
    id: 'sub100g2-q20',
    level: 2,
    questionTypeBadge: 'Ellenőrzés',
    figure: <PartWholeFig whole="82" part="47" rest="35" unit={2.6} wholeVal={82} partVal={47} />,
    question: 'Melyik összeadással ellenőrzöd ezt: 82 − 47 = 35?',
    options: ['35 + 47 = 82', '82 + 35 = 47', '47 − 35 = 12', '82 + 47 = 35'],
    correctAnswer: 0,
    explanation: 'A maradékhoz add hozzá, amit elvettél: 35 + 47 = 82. Így ellenőrizünk.'
  },

  // ----- 3. szint -----
  {
    id: 'sub100g2-q21',
    level: 3,
    questionTypeBadge: 'Kétjegyű tízesátlépéssel',
    figure: (
      <HopFig
        from={30}
        to={70}
        extraLabels={[46, 66]}
        hops={[
          { from: 66, to: 46, color: G, label: '−20', h: 20 },
          { from: 46, to: 40, color: O, label: '−6', h: 10 },
          { from: 40, to: 39, color: R, label: '−1', h: 7 }
        ]}
        marks={[{ value: 66, color: P }, { value: 39, color: UNK, label: '?' }]}
      />
    ),
    question: 'Mennyi 66 − 27?',
    options: ['39', '41', '49', '43'],
    correctAnswer: 0,
    explanation: '66 − 20 = 46. A 7-et bontsd: 46 − 6 = 40, és 40 − 1 = 39.'
  },
  {
    id: 'sub100g2-q22',
    level: 3,
    questionTypeBadge: 'Bontás rudakkal',
    figure: <RodsSubFig a={74} b={38} caption="1 rudat felbontottunk: 74 − 38 = ?" />,
    question: 'Mennyi 74 − 38?',
    options: ['36', '44', '46', '34'],
    correctAnswer: 0,
    explanation: '74 − 30 = 44. Aztán 44 − 8 = 44 − 4 − 4 = 36. Ellenőrzés: 36 + 38 = 74.'
  },
  {
    id: 'sub100g2-q23',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    figure: <BoxFig total={64} take={28} />,
    question: 'Egy dobozban 64 gomb volt. Elvettünk 28-at. Hány gomb maradt?',
    options: ['36', '44', '92', '46'],
    correctAnswer: 0,
    explanation: '64 − 20 = 44, aztán 44 − 8 = 36. Ennyi gomb maradt.'
  },
  {
    id: 'sub100g2-q24',
    level: 3,
    questionTypeBadge: 'Hányan maradtak?',
    figure: <PartWholeFig whole="53" part="18" rest="?" unit={4.2} wholeVal={53} partVal={18} />,
    question: 'A buszon 53 ember ült. 18-an leszálltak. Hányan maradtak a buszon?',
    options: ['35', '45', '71', '36'],
    correctAnswer: 0,
    explanation: '53 − 10 = 43. Aztán 43 − 8 = 43 − 3 − 5 = 35.'
  },
  {
    id: 'sub100g2-q25',
    level: 3,
    questionTypeBadge: 'Ennyivel rövidebb',
    figure: <RibbonsFig long={72} shorter={25} />,
    question: 'A kék szalag 72 cm. A piros 25 cm-rel rövidebb. Milyen hosszú a piros?',
    options: ['47 cm', '97 cm', '53 cm', '57 cm'],
    correctAnswer: 0,
    explanation: '„Rövidebb” → kivonás: 72 − 20 = 52, 52 − 5 = 47 cm.'
  },
  {
    id: 'sub100g2-q26',
    level: 3,
    questionTypeBadge: 'Mennyivel több?',
    figure: (
      <HopFig
        from={50}
        to={100}
        extraLabels={[56, 91]}
        hops={[{ from: 56, to: 91, color: B, label: '?', h: 22 }]}
        marks={[{ value: 56, color: P }, { value: 91, color: P }]}
      />
    ),
    question: 'Mennyivel több a 91, mint az 56?',
    options: ['35', '45', '25', '36'],
    correctAnswer: 0,
    explanation: 'Kivonással: 91 − 56. 91 − 50 = 41, 41 − 6 = 35. Ellenőrzés: 56 + 35 = 91.'
  },
  {
    id: 'sub100g2-q27',
    level: 3,
    questionTypeBadge: 'Műveletlánc',
    figure: <ChainFig start={85} ops={['− 9', '− 8']} />,
    question: 'Számolj a nyilak szerint! Mi kerül a végére?',
    options: ['68', '69', '67', '78'],
    correctAnswer: 0,
    explanation: '85 − 9 = 76. Aztán 76 − 8 = 68.'
  },
  {
    id: 'sub100g2-q28',
    level: 3,
    questionTypeBadge: 'Nyitott mondat',
    question: 'Melyik szám illik a □ helyére?  70 − 26 < □ < 92 − 46',
    options: ['45', '44', '46', '43'],
    correctAnswer: 0,
    explanation: '70 − 26 = 44 és 92 − 46 = 46. A 44 és a 46 között csak a 45 van.'
  },
  {
    id: 'sub100g2-q29',
    level: 3,
    questionTypeBadge: 'Mérleg',
    figure: <BalanceFig left="90 − 35" right="70 − □" />,
    question: 'A mérleg egyensúlyban van. Mi kerül a □ helyére?',
    options: ['15', '25', '5', '55'],
    correctAnswer: 0,
    explanation: 'Bal oldal: 90 − 35 = 55. A jobb oldal is 55: 70 − 15 = 55. Tehát □ = 15.'
  },
  {
    id: 'sub100g2-q30',
    level: 3,
    questionTypeBadge: 'Számkártyák',
    figure: <CardsFig items={['54', '81', '36', '65']} />,
    question: 'Melyik két kártya különbsége 27?',
    options: ['81 és 54', '65 és 36', '81 és 65', '54 és 36'],
    correctAnswer: 0,
    explanation: '81 − 54 = 27. A többi: 65 − 36 = 29, 81 − 65 = 16, 54 − 36 = 18.'
  }
];

export const Sub100G2Quiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => (
  <QuizTemplate
    grade={2}
    chapterId="szamolas-100-ig"
    topicId="g2-c100-kivonas-quiz"
    subtopicId="kivonas-100-as-szamkor"
    title="3. Kivonás 100-as számkör – Kvíz"
    subtitle="30 feladat 3 szinten: tízesátlépés nélkül és tízesátlépéssel, kétjegyű − kétjegyű, ellenőrzés, szöveges feladatok."
    badge="2. OSZTÁLY • III. SZÁMKÖRBŐVÍTÉS ÉS SZÁMOLÁS 100-IG • KVÍZ"
    questions={SUB100_G2_QUESTIONS}
    cheatSheets={[
      {
        title: 'Tízesátlépés nélkül',
        items: ['8 − 5 = 3 → 68 − 5 = 63', '74 − 4 = 70', '80 − 6 = 74 (10 − 6 = 4)', 'A tízesek nem változnak']
      },
      {
        title: 'Tízesátlépéssel',
        items: ['63 − 7 = 63 − 3 − 4 = 56', 'Kevés a kocka? Bonts fel egy rudat!', '1 tízes = 10 egyes', '100 − 9 = 91']
      },
      {
        title: 'Kétjegyű − kétjegyű',
        items: ['Előbb a tízeseket vedd el', '66 − 27 = 46 − 7 = 39', 'Ellenőrzés: 39 + 27 = 66', '„Rövidebb, kevesebb, elvesz” → kivonás']
      }
    ]}
    onBack={onBack}
    onSwitchToTheory={onSwitchToTheory}
    onSwitchToMatcher={onSwitchToMatcher}
    onSwitchToSorter={onSwitchToSorter}
    initialGameMode={initialGameMode}
    matcherComponent={
      <Sub100G2Matcher
        onBack={onBack}
        onSwitchToTheory={onSwitchToTheory}
        onSwitchToQuiz={() => {}}
        onSwitchToSorter={onSwitchToSorter}
      />
    }
    sorterComponent={
      <Sub100G2Sorter
        onBack={onBack}
        onSwitchToTheory={onSwitchToTheory}
        onSwitchToQuiz={() => {}}
        onSwitchToMatcher={onSwitchToMatcher}
      />
    }
  />
);

export default Sub100G2Quiz;
