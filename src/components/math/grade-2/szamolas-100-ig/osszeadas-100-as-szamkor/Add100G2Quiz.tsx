import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { Add100G2Matcher } from './Add100G2Matcher';
import { Add100G2Sorter } from './Add100G2Sorter';
import { N100_FONT, N100_COLORS, NumberLinePart, LineHop, LineMark } from '../szamok-100-ig/Numbers100G2Parts';
import { RodsAddPart, rodsAddWidth } from './Add100G2Parts';

// ---------------------------------------------------------------------------
// Kérdésábrák
// ---------------------------------------------------------------------------
const UNK = N100_COLORS.unknown;

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

const RodsAddFig: React.FC<{ a: number; b: number }> = ({ a, b }) => {
  const u = 8;
  const w = rodsAddWidth(a, b, u);
  return (
    <QFig h={122}>
      <RodsAddPart x={130 - w / 2} y={10} a={a} b={b} u={u} />
      <text x="130" y="112" textAnchor="middle" fontSize="15" fontWeight="900" fill="#334155">
        {a} + {b} = <tspan fill={UNK}>?</tspan>
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

const PriceFig: React.FC<{ items: { name: string; price: number }[] }> = ({ items }) => (
  <QFig h={92}>
    {items.map((it, i) => {
      const x = 30 + i * 115;
      return (
        <g key={i}>
          <path d={`M ${x} 22 L ${x + 80} 22 L ${x + 96} 46 L ${x + 80} 70 L ${x} 70 Z`} fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
          <circle cx={x + 82} cy={46} r="4" fill="#ffffff" stroke="#d97706" strokeWidth="1.5" />
          <text x={x + 38} y={42} textAnchor="middle" fontSize="13" fontWeight="bold" fill="#78350f">{it.name}</text>
          <text x={x + 38} y={62} textAnchor="middle" fontSize="17" fontWeight="900" fill="#0f172a">{it.price} Ft</text>
        </g>
      );
    })}
  </QFig>
);

const Basket: React.FC<{ x: number; n: number; color: string }> = ({ x, n, color }) => (
  <g>
    <path d={`M ${x} 44 L ${x + 80} 44 L ${x + 70} 92 L ${x + 10} 92 Z`} fill="#fde68a" stroke="#92400e" strokeWidth="2" />
    <path d={`M ${x + 10} 44 Q ${x + 40} 8 ${x + 70} 44`} fill="none" stroke="#92400e" strokeWidth="3" />
    {[0, 1, 2].map((i) => (
      <circle key={i} cx={x + 22 + i * 18} cy={40} r="8" fill={color} stroke="#7f1d1d" strokeWidth="1" />
    ))}
    <text x={x + 40} y={76} textAnchor="middle" fontSize="20" fontWeight="900" fill="#0f172a">{n}</text>
  </g>
);

const BasketsFig: React.FC<{ a: number; b: number }> = ({ a, b }) => (
  <QFig h={104}>
    <Basket x={30} n={a} color="#ef4444" />
    <text x="130" y="72" textAnchor="middle" fontSize="24" fontWeight="900" fill="#334155">+</text>
    <Basket x={150} n={b} color="#84cc16" />
  </QFig>
);

/** Szakaszos ábra: „ennyivel több”. */
const BarFig: React.FC<{ base: number; more: number; nameA: string; nameB: string }> = ({ base, more, nameA, nameB }) => {
  const unit = 2.6;
  const wa = base * unit;
  const wb = more * unit;
  return (
    <QFig h={104}>
      <text x="14" y="34" fontSize="13" fontWeight="bold" fill="#334155">{nameA}</text>
      <rect x="66" y="20" width={wa} height="20" rx="4" fill="#93c5fd" stroke="#1d4ed8" strokeWidth="1.5" />
      <text x={66 + wa / 2} y="35" textAnchor="middle" fontSize="13" fontWeight="900" fill="#1e3a8a">{base}</text>
      <text x="14" y="74" fontSize="13" fontWeight="bold" fill="#334155">{nameB}</text>
      <rect x="66" y="60" width={wa} height="20" rx="4" fill="#93c5fd" stroke="#1d4ed8" strokeWidth="1.5" />
      <rect x={66 + wa} y="60" width={wb} height="20" rx="4" fill="#86efac" stroke="#15803d" strokeWidth="1.5" />
      <text x={66 + wa + wb / 2} y="75" textAnchor="middle" fontSize="12" fontWeight="900" fill="#14532d">+{more}</text>
      <path d={`M 66 88 L 66 94 L ${66 + wa + wb} 94 L ${66 + wa + wb} 88`} fill="none" stroke={UNK} strokeWidth="1.8" />
      <text x={66 + (wa + wb) / 2} y="92" textAnchor="middle" fontSize="13" fontWeight="900" fill={UNK} dy="9">?</text>
    </QFig>
  );
};

const BalanceFig: React.FC<{ left: string; right: string }> = ({ left, right }) => (
  <QFig h={110}>
    <polygon points="130,56 112,96 148,96" fill="#475569" />
    <line x1="34" y1="56" x2="226" y2="56" stroke="#1e293b" strokeWidth="4" strokeLinecap="round" />
    <rect x="18" y="16" width="94" height="34" rx="8" fill="#dbeafe" stroke="#2563eb" strokeWidth="2" />
    <text x="65" y="39" textAnchor="middle" fontSize="16" fontWeight="900" fill="#1e3a8a">{left}</text>
    <rect x="148" y="16" width="94" height="34" rx="8" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
    <text x="195" y="39" textAnchor="middle" fontSize="16" fontWeight="900" fill="#92400e">{right}</text>
  </QFig>
);

const PyramidFig: React.FC<{ rows: string[][] }> = ({ rows }) => {
  const bw = 52;
  const bh = 26;
  return (
    <QFig h={rows.length * bh + 22}>
      {rows.map((row, r) => {
        const x0 = 130 - (row.length * bw) / 2;
        return row.map((t, c) => (
          <g key={`${r}-${c}`}>
            <rect x={x0 + c * bw} y={11 + r * bh} width={bw} height={bh} fill={t === '?' ? '#fee2e2' : '#fed7aa'} stroke="#9a3412" strokeWidth="1.5" />
            <text x={x0 + c * bw + bw / 2} y={11 + r * bh + 18} textAnchor="middle" fontSize="15" fontWeight="900" fill={t === '?' ? UNK : '#0f172a'}>
              {t}
            </text>
          </g>
        ));
      })}
    </QFig>
  );
};

const RuleTableFig: React.FC<{ rule: string; ins: string[]; outs: string[] }> = ({ rule, ins, outs }) => {
  const cw = 48;
  const x0 = 130 - ((ins.length + 1) * cw) / 2;
  return (
    <QFig h={84}>
      <rect x={x0} y={14} width={cw} height={56} fill="#d1fae5" stroke="#047857" strokeWidth="1.5" />
      <text x={x0 + cw / 2} y={47} textAnchor="middle" fontSize="15" fontWeight="900" fill="#065f46">{rule}</text>
      {ins.map((t, i) => (
        <g key={i}>
          <rect x={x0 + (i + 1) * cw} y={14} width={cw} height={28} fill="#ffffff" stroke="#047857" strokeWidth="1.5" />
          <text x={x0 + (i + 1.5) * cw} y={34} textAnchor="middle" fontSize="15" fontWeight="900" fill="#0f172a">{t}</text>
          <rect x={x0 + (i + 1) * cw} y={42} width={cw} height={28} fill={outs[i] === '?' ? '#fee2e2' : '#f0fdf4'} stroke="#047857" strokeWidth="1.5" />
          <text x={x0 + (i + 1.5) * cw} y={62} textAnchor="middle" fontSize="15" fontWeight="900" fill={outs[i] === '?' ? UNK : '#0f172a'}>
            {outs[i]}
          </text>
        </g>
      ))}
    </QFig>
  );
};

const CardsFig: React.FC<{ items: string[] }> = ({ items }) => {
  const w = 50;
  const gap = 22;
  const x0 = 130 - (items.length * w + (items.length - 1) * gap) / 2;
  return (
    <QFig h={74}>
      {items.map((t, i) => (
        <g key={i}>
          <rect x={x0 + i * (w + gap)} y={14} width={w} height={46} rx={8} fill="#d1fae5" stroke="#059669" strokeWidth="2" />
          <text x={x0 + i * (w + gap) + w / 2} y={45} textAnchor="middle" fontSize="21" fontWeight="900" fill="#064e3b">{t}</text>
          {i < items.length - 1 && (
            <text x={x0 + i * (w + gap) + w + gap / 2} y={45} textAnchor="middle" fontSize="20" fontWeight="900" fill="#334155">+</text>
          )}
        </g>
      ))}
    </QFig>
  );
};

const G = '#16a34a';
const B = '#2563eb';
const O = '#ea580c';

// ---------------------------------------------------------------------------
// Kérdések
// ---------------------------------------------------------------------------
export const ADD100_G2_QUESTIONS: QuizQuestion[] = [
  // ----- 1. szint -----
  {
    id: 'add100g2-q1',
    level: 1,
    questionTypeBadge: 'Kerek tízes + egyes',
    figure: <RodsAddFig a={60} b={7} />,
    question: 'Mennyi 60 + 7?',
    options: ['67', '13', '76', '607'],
    correctAnswer: 0,
    explanation: '6 rúd és 7 kocka: 6 tízes és 7 egyes. Ez 67.'
  },
  {
    id: 'add100g2-q2',
    level: 1,
    questionTypeBadge: 'Rudak és kockák',
    figure: <RodsAddFig a={52} b={6} />,
    question: 'Mennyi 52 + 6?',
    options: ['58', '57', '59', '68'],
    correctAnswer: 0,
    explanation: 'A tízesek maradnak. Az egyesek: 2 + 6 = 8. Tehát 52 + 6 = 58.'
  },
  {
    id: 'add100g2-q3',
    level: 1,
    questionTypeBadge: 'Felcserélés',
    question: 'Mennyi 4 + 73?',
    options: ['77', '78', '113', '76'],
    correctAnswer: 0,
    explanation: 'Cseréld meg a tagokat: 73 + 4. Az egyesek: 3 + 4 = 7. Tehát 77. A 4 egyes, nem tízes!'
  },
  {
    id: 'add100g2-q4',
    level: 1,
    questionTypeBadge: 'Számegyenes',
    figure: (
      <HopFig
        from={78}
        to={90}
        labelEvery={100}
        extraLabels={[81]}
        hops={[{ from: 81, to: 86, color: B, label: '+5', h: 16 }]}
        marks={[{ value: 81, color: '#7c3aed' }, { value: 86, color: UNK, label: '?' }]}
      />
    ),
    question: 'Hová érkezel? 81 + 5 = ?',
    options: ['86', '85', '87', '91'],
    correctAnswer: 0,
    explanation: '1 + 5 = 6, ezért 81 + 5 = 86.'
  },
  {
    id: 'add100g2-q5',
    level: 1,
    questionTypeBadge: 'Kistesó',
    question: '3 + 4 = 7. Akkor mennyi 83 + 4?',
    options: ['87', '86', '88', '97'],
    correctAnswer: 0,
    explanation: 'A 8 tízes marad. Az egyesek: 3 + 4 = 7. Tehát 83 + 4 = 87.'
  },
  {
    id: 'add100g2-q6',
    level: 1,
    questionTypeBadge: 'Kerek tízes + egyes',
    figure: <RodsAddFig a={70} b={9} />,
    question: 'Mennyi 70 + 9?',
    options: ['79', '97', '16', '89'],
    correctAnswer: 0,
    explanation: '7 tízes és 9 egyes: 70 + 9 = 79.'
  },
  {
    id: 'add100g2-q7',
    level: 1,
    questionTypeBadge: 'Ugrás előre',
    figure: (
      <HopFig
        from={60}
        to={72}
        labelEvery={100}
        extraLabels={[65]}
        hops={[{ from: 65, to: 69, color: B, label: '+4', h: 16 }]}
        marks={[{ value: 65, color: '#7c3aed' }, { value: 69, color: UNK, label: '?' }]}
      />
    ),
    question: 'Mennyi 65 + 4?',
    options: ['69', '68', '70', '61'],
    correctAnswer: 0,
    explanation: 'Számolj tovább a 65-től: 66, 67, 68, 69. Tehát 69.'
  },
  {
    id: 'add100g2-q8',
    level: 1,
    questionTypeBadge: 'Melyik művelet?',
    question: 'Melyik összeadás eredménye 58?',
    options: ['54 + 4', '54 + 5', '45 + 4', '50 + 4'],
    correctAnswer: 0,
    explanation: '54 + 4: az egyesek 4 + 4 = 8, ez 58. A többi: 59, 49, 54.'
  },
  {
    id: 'add100g2-q9',
    level: 1,
    questionTypeBadge: 'Majdnem 100',
    figure: <RodsAddFig a={92} b={7} />,
    question: 'Mennyi 92 + 7?',
    options: ['99', '98', '100', '97'],
    correctAnswer: 0,
    explanation: 'Az egyesek: 2 + 7 = 9. A 9 tízes marad: 92 + 7 = 99.'
  },
  {
    id: 'add100g2-q10',
    level: 1,
    questionTypeBadge: 'Hány tízes lesz?',
    question: 'Hány tízes lesz az 56 + 3 összegben?',
    options: ['5 tízes', '6 tízes', '8 tízes', '9 tízes'],
    correctAnswer: 0,
    explanation: '56 + 3 = 59. Nincs tízesátlépés, ezért marad az 5 tízes.'
  },

  // ----- 2. szint -----
  {
    id: 'add100g2-q11',
    level: 2,
    questionTypeBadge: 'Pótlás a kerek tízesig',
    figure: (
      <HopFig
        from={64}
        to={76}
        labelEvery={100}
        extraLabels={[67, 70]}
        hops={[
          { from: 67, to: 70, color: G, label: '+3', h: 16 },
          { from: 70, to: 72, color: B, label: '+2', h: 12 }
        ]}
        marks={[{ value: 67, color: '#7c3aed' }, { value: 70, color: G }, { value: 72, color: UNK, label: '?' }]}
      />
    ),
    question: 'Mennyi 67 + 5?',
    options: ['72', '62', '71', '73'],
    correctAnswer: 0,
    explanation: '67 + 3 = 70, és az 5-ből még 2 marad: 70 + 2 = 72.'
  },
  {
    id: 'add100g2-q12',
    level: 2,
    questionTypeBadge: 'Csere rudakkal',
    figure: <RodsAddFig a={58} b={7} />,
    question: 'Mennyi 58 + 7?',
    options: ['65', '55', '64', '66'],
    correctAnswer: 0,
    explanation: '8 + 7 = 15 kocka. 10 kockából 1 rúd lesz: 6 rúd és 5 kocka = 65.'
  },
  {
    id: 'add100g2-q13',
    level: 2,
    questionTypeBadge: 'Bontás',
    question: 'Mi kerül a □ helyére?  86 + 6 = 86 + 4 + □',
    options: ['2', '6', '3', '4'],
    correctAnswer: 0,
    explanation: 'A 86-hoz 4 kell a 90-ig. A 6-ból 4-et már hozzáadtál, marad 2.'
  },
  {
    id: 'add100g2-q14',
    level: 2,
    questionTypeBadge: '100-ig',
    figure: (
      <HopFig
        from={88}
        to={100}
        labelEvery={1000}
        labelEnds={false}
        extraLabels={[90, 94]}
        hops={[{ from: 94, to: 100, color: G, label: '+6', h: 16 }]}
        marks={[{ value: 94, color: '#7c3aed' }, { value: 100, color: UNK, label: '?' }]}
      />
    ),
    question: 'Mennyi 94 + 6?',
    options: ['100', '90', '99', '910'],
    correctAnswer: 0,
    explanation: '4 + 6 = 10, ez egy újabb tízes. 9 tízes + 1 tízes = 10 tízes = 100.'
  },
  {
    id: 'add100g2-q15',
    level: 2,
    questionTypeBadge: 'Előbb a tízesek',
    figure: (
      <HopFig
        from={40}
        to={70}
        extraLabels={[45]}
        hops={[
          { from: 45, to: 55, color: G, label: '+10', h: 16 },
          { from: 55, to: 65, color: G, label: '+10', h: 16 },
          { from: 65, to: 68, color: B, label: '+3', h: 9 }
        ]}
        marks={[{ value: 45, color: '#7c3aed' }, { value: 68, color: UNK, label: '?' }]}
      />
    ),
    question: 'Mennyi 45 + 23?',
    options: ['68', '67', '48', '86'],
    correctAnswer: 0,
    explanation: 'Előbb a tízesek: 45 + 20 = 65. Aztán az egyesek: 65 + 3 = 68.'
  },
  {
    id: 'add100g2-q16',
    level: 2,
    questionTypeBadge: 'Két kétjegyű',
    figure: <RodsAddFig a={52} b={34} />,
    question: 'Mennyi 52 + 34?',
    options: ['86', '68', '56', '85'],
    correctAnswer: 0,
    explanation: 'Rudak: 5 + 3 = 8 tízes. Kockák: 2 + 4 = 6 egyes. Tehát 86.'
  },
  {
    id: 'add100g2-q17',
    level: 2,
    questionTypeBadge: 'Tízesátlépés?',
    question: 'Melyik összeadásban van tízesátlépés?',
    options: ['76 + 8', '72 + 5', '61 + 7', '83 + 6'],
    correctAnswer: 0,
    explanation: 'Az egyeseket nézd: 6 + 8 = 14, ez több, mint 10. A többinél 7, 8 és 9 jön ki.'
  },
  {
    id: 'add100g2-q18',
    level: 2,
    questionTypeBadge: 'Szabály: + 5',
    figure: <RuleTableFig rule="+ 5" ins={['56', '66', '76']} outs={['61', '71', '?']} />,
    question: 'A szabály: + 5. Mi kerül a ? helyére?',
    options: ['81', '71', '80', '82'],
    correctAnswer: 0,
    explanation: '76 + 4 = 80, és még 1: 76 + 5 = 81.'
  },
  {
    id: 'add100g2-q19',
    level: 2,
    questionTypeBadge: 'Vásárlás',
    figure: <PriceFig items={[{ name: 'radír', price: 35 }, { name: 'ceruza', price: 24 }]} />,
    question: 'Mennyibe kerül a radír és a ceruza együtt?',
    options: ['59 Ft', '11 Ft', '69 Ft', '58 Ft'],
    correctAnswer: 0,
    explanation: '35 + 20 = 55, és 55 + 4 = 59. Együtt 59 Ft.'
  },
  {
    id: 'add100g2-q20',
    level: 2,
    questionTypeBadge: 'Honnan indultunk?',
    figure: (
      <HopFig
        from={50}
        to={70}
        extraLabels={[63]}
        hops={[{ from: 56, to: 63, color: B, label: '+7', h: 16 }]}
        marks={[{ value: 56, color: UNK, label: '?' }, { value: 63, color: '#7c3aed' }]}
      />
    ),
    question: 'Mi kerül a □ helyére?  □ + 7 = 63',
    options: ['56', '57', '70', '66'],
    correctAnswer: 0,
    explanation: 'Gondolj vissza: 63-ból 7-et visszalépve 56-hoz érsz. Ellenőrzés: 56 + 7 = 63.'
  },

  // ----- 3. szint -----
  {
    id: 'add100g2-q21',
    level: 3,
    questionTypeBadge: 'Kétjegyű tízesátlépéssel',
    figure: (
      <HopFig
        from={40}
        to={80}
        extraLabels={[47, 67]}
        hops={[
          { from: 47, to: 67, color: G, label: '+20', h: 20 },
          { from: 67, to: 70, color: O, label: '+3', h: 9 },
          { from: 70, to: 75, color: B, label: '+5', h: 10 }
        ]}
        marks={[{ value: 47, color: '#7c3aed' }, { value: 75, color: UNK, label: '?' }]}
      />
    ),
    question: 'Mennyi 47 + 28?',
    options: ['75', '65', '615', '74'],
    correctAnswer: 0,
    explanation: '47 + 20 = 67. A 8-at bontsd: 67 + 3 = 70, és 70 + 5 = 75.'
  },
  {
    id: 'add100g2-q22',
    level: 3,
    questionTypeBadge: 'Csere rudakkal',
    figure: <RodsAddFig a={38} b={25} />,
    question: 'Mennyi 38 + 25?',
    options: ['63', '53', '513', '64'],
    correctAnswer: 0,
    explanation: 'Rudak: 3 + 2 = 5. Kockák: 8 + 5 = 13 = 1 rúd + 3 kocka. Összesen 6 rúd és 3 kocka: 63.'
  },
  {
    id: 'add100g2-q23',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    figure: <BasketsFig a={36} b={47} />,
    question: 'Az egyik kosárban 36 alma van, a másikban 47. Hány alma van összesen?',
    options: ['83', '73', '713', '84'],
    correctAnswer: 0,
    explanation: '36 + 40 = 76, aztán 76 + 7 = 83. Összesen 83 alma.'
  },
  {
    id: 'add100g2-q24',
    level: 3,
    questionTypeBadge: 'Ennyivel több',
    figure: <BarFig base={27} more={19} nameA="Panni" nameB="Bence" />,
    question: 'Panninak 27 matricája van. Bencének 19-cel több. Hány matricája van Bencének?',
    options: ['46', '8', '36', '45'],
    correctAnswer: 0,
    explanation: '„19-cel több” – ezért összeadunk: 27 + 10 = 37, 37 + 9 = 46.'
  },
  {
    id: 'add100g2-q25',
    level: 3,
    questionTypeBadge: 'Melyik a több?',
    question: 'Melyik összeg a nagyobb?',
    options: ['39 + 27', '28 + 37', 'Egyformák'],
    correctAnswer: 0,
    explanation: '39 + 27 = 66 és 28 + 37 = 65. A 66 a nagyobb.'
  },
  {
    id: 'add100g2-q26',
    level: 3,
    questionTypeBadge: 'Mérleg',
    figure: <BalanceFig left="46 + 18" right="50 + □" />,
    question: 'A mérleg egyensúlyban van. Mi kerül a □ helyére?',
    options: ['14', '4', '64', '24'],
    correctAnswer: 0,
    explanation: 'Bal oldal: 46 + 18 = 64. A jobb oldal is 64: 50 + 14 = 64. Tehát □ = 14.'
  },
  {
    id: 'add100g2-q27',
    level: 3,
    questionTypeBadge: 'Három tag',
    figure: <CardsFig items={['25', '30', '15']} />,
    question: 'Mennyi 25 + 30 + 15?',
    options: ['70', '60', '80', '65'],
    correctAnswer: 0,
    explanation: 'Ügyes sorrend: 25 + 15 = 40, aztán 40 + 30 = 70.'
  },
  {
    id: 'add100g2-q28',
    level: 3,
    questionTypeBadge: 'Hiányzó tag',
    figure: (
      <HopFig
        from={30}
        to={80}
        extraLabels={[38, 74]}
        hops={[{ from: 38, to: 74, color: G, label: '+?', h: 22 }]}
        marks={[{ value: 38, color: '#7c3aed' }, { value: 74, color: '#7c3aed' }]}
      />
    ),
    question: 'Mi kerül a □ helyére?  38 + □ = 74',
    options: ['36', '46', '34', '44'],
    correctAnswer: 0,
    explanation: '38 + 30 = 68. 68-tól 74-ig még 6. Tehát □ = 30 + 6 = 36. Ellenőrzés: 38 + 36 = 74.'
  },
  {
    id: 'add100g2-q29',
    level: 3,
    questionTypeBadge: 'Számpiramis',
    figure: <PyramidFig rows={[['?'], ['52', '?'], ['24', '28', '19']]} />,
    question: 'Két szomszéd tégla összege kerül föléjük. Mi kerül a csúcsra?',
    options: ['99', '89', '71', '100'],
    correctAnswer: 0,
    explanation: 'Előbb: 28 + 19 = 47. Aztán a csúcs: 52 + 47 = 99.'
  },
  {
    id: 'add100g2-q30',
    level: 3,
    questionTypeBadge: 'Két lépés',
    question: 'Zsófi felfűzött 28 gyöngyöt, aztán még 18-at, végül még 25-öt. Hány gyöngy van a láncán?',
    options: ['71', '61', '70', '81'],
    correctAnswer: 0,
    explanation: '28 + 18 = 46. Aztán 46 + 25 = 71 gyöngy.'
  }
];

export const Add100G2Quiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => (
  <QuizTemplate
    grade={2}
    chapterId="szamolas-100-ig"
    topicId="g2-c100-osszeadas-quiz"
    subtopicId="osszeadas-100-as-szamkor"
    title="2. Összeadás 100-as számkör – Kvíz"
    subtitle="30 feladat 3 szinten: tízesátlépés nélkül és tízesátlépéssel, kétjegyű + kétjegyű, szöveges feladatok."
    badge="2. OSZTÁLY • III. SZÁMKÖRBŐVÍTÉS ÉS SZÁMOLÁS 100-IG • KVÍZ"
    questions={ADD100_G2_QUESTIONS}
    cheatSheets={[
      {
        title: 'Tízesátlépés nélkül',
        items: ['60 + 7 = 67', '3 + 5 = 8 → 63 + 5 = 68', 'A tagok felcserélhetők: 4 + 73 = 73 + 4', 'A tízesek nem változnak']
      },
      {
        title: 'Tízesátlépéssel',
        items: ['67 + 5 = 67 + 3 + 2 = 72', '58 + 7 = 58 + 2 + 5 = 65', '94 + 6 = 100', '10 egyes = 1 tízes']
      },
      {
        title: 'Kétjegyű + kétjegyű',
        items: ['Előbb a tízesek, aztán az egyesek', '45 + 23 = 45 + 20 + 3 = 68', '47 + 28 = 67 + 8 = 75', '„Ennyivel több” → összeadás']
      }
    ]}
    onBack={onBack}
    onSwitchToTheory={onSwitchToTheory}
    onSwitchToMatcher={onSwitchToMatcher}
    onSwitchToSorter={onSwitchToSorter}
    initialGameMode={initialGameMode}
    matcherComponent={
      <Add100G2Matcher
        onBack={onBack}
        onSwitchToTheory={onSwitchToTheory}
        onSwitchToQuiz={() => {}}
        onSwitchToSorter={onSwitchToSorter}
      />
    }
    sorterComponent={
      <Add100G2Sorter
        onBack={onBack}
        onSwitchToTheory={onSwitchToTheory}
        onSwitchToQuiz={() => {}}
        onSwitchToMatcher={onSwitchToMatcher}
      />
    }
  />
);

export default Add100G2Quiz;
