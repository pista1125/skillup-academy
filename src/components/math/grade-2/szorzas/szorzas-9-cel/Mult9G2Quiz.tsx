import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { Mult9G2Matcher } from './Mult9G2Matcher';
import { Mult9G2Sorter } from './Mult9G2Sorter';
import { BOX_COLORS, DotArrayPart, NineBoxPart, JumpLinePart, MULT9_FONT } from './Mult9G2Parts';

// ---------------------------------------------------------------------------
// Kérdésábrák
// ---------------------------------------------------------------------------
const UNK = '#dc2626';

const QFig: React.FC<{ children: React.ReactNode; h?: number }> = ({ children, h = 120 }) => (
  <svg viewBox={`0 0 260 ${h}`} className="w-full max-w-[280px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={MULT9_FONT}>
    <rect x="1" y="1" width="258" height={h - 2} rx="12" fill="#f8fafc" stroke="#cbd5e1" />
    {children}
  </svg>
);

const BEADS = ['#f97316', '#8b5cf6', '#0ea5e9', '#10b981'];

/** n karkötő, mindegyiken 9 gyöngy. */
const BeadsFig: React.FC<{ n: number }> = ({ n }) => {
  const h = 24 + n * 28;
  return (
    <QFig h={h}>
      {Array.from({ length: n }, (_, r) => {
        const y = 26 + r * 28;
        return (
          <g key={r}>
            <line x1="22" y1={y} x2="238" y2={y} stroke="#78350f" strokeWidth="2.5" strokeLinecap="round" />
            {Array.from({ length: 9 }, (_, i) => (
              <circle key={i} cx={38 + i * 23} cy={y} r="9.5" fill={BEADS[r % BEADS.length]} stroke="#1e293b" strokeWidth="1.5" />
            ))}
          </g>
        );
      })}
    </QFig>
  );
};

/** n kilences doboz. */
const GroupsFig: React.FC<{ n: number }> = ({ n }) => {
  const perRow = Math.min(n, 5);
  const rows = Math.ceil(n / perRow);
  const size = 40;
  const gx = 47;
  const x0 = 130 - ((perRow - 1) * gx + size) / 2;
  const h = 24 + rows * 50;
  return (
    <QFig h={h}>
      {Array.from({ length: n }, (_, i) => (
        <NineBoxPart key={i} x={x0 + (i % perRow) * gx} y={14 + Math.floor(i / perRow) * 50} size={size} color={BOX_COLORS[i % BOX_COLORS.length]} />
      ))}
    </QFig>
  );
};

/** Két gyerek dobozai elválasztva. */
const SplitBoxesFig: React.FC<{ a: number; b: number; names: [string, string] }> = ({ a, b, names }) => (
  <QFig h={100}>
    <text x="64" y="24" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#334155">
      {names[0]}
    </text>
    {Array.from({ length: a }, (_, i) => (
      <NineBoxPart key={`a${i}`} x={64 - (a * 36 - 4) / 2 + i * 36} y={40} size={32} color="#f97316" />
    ))}
    <line x1="130" y1="12" x2="130" y2="90" stroke="#cbd5e1" strokeWidth="2" />
    <text x="196" y="24" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#334155">
      {names[1]}
    </text>
    {Array.from({ length: b }, (_, i) => (
      <NineBoxPart key={`b${i}`} x={196 - (b * 30 - 3) / 2 + i * 30} y={42} size={27} color="#8b5cf6" />
    ))}
  </QFig>
);

/** ? darab kilences doboz = total */
const BoxesQFig: React.FC<{ total: number }> = ({ total }) => (
  <QFig h={90}>
    <text x="58" y="56" textAnchor="middle" fontSize="30" fontWeight="bold" fill={UNK}>
      ?
    </text>
    <text x="84" y="56" textAnchor="middle" fontSize="28" fontWeight="bold" fill="#334155">
      ·
    </text>
    <NineBoxPart x={100} y={22} size={46} color="#f97316" />
    <text x="196" y="56" textAnchor="middle" fontSize="28" fontWeight="bold" fill="#334155">
      = {total}
    </text>
  </QFig>
);

/** Szöcske-számegyenes 0–90. */
const JumpsFig: React.FC<{ jumps: number; endQuestion?: boolean; target?: number; band?: [number, number] }> = ({
  jumps,
  endQuestion = true,
  target,
  band
}) => {
  const x = 18;
  const w = 222;
  const u = w / 90;
  return (
    <QFig h={110}>
      {band && <rect x={x + band[0] * u} y={40} width={(band[1] - band[0]) * u} height={40} fill="#fde68a" opacity="0.7" rx="4" />}
      {target !== undefined ? (
        <>
          <JumpLinePart x={x} y={70} w={w} max={90} jumps={1} step={9} fontSize={10} />
          <text x={x + 4.5 * u} y={38} textAnchor="middle" fontSize="12" fontWeight="bold" fill="#ea580c">
            9
          </text>
          <circle cx={x + target * u} cy={70} r="5" fill={UNK} />
          <text x={x + target * u} y={50} textAnchor="middle" fontSize="16" fontWeight="bold" fill={UNK}>
            {target}
          </text>
        </>
      ) : (
        <JumpLinePart x={x} y={70} w={w} max={90} jumps={jumps} step={9} endQuestion={endQuestion} fontSize={10} />
      )}
    </QFig>
  );
};

/** rows sor, soronként 9 korong. */
const ArrayFig: React.FC<{ rows: number; emptyLast?: number }> = ({ rows, emptyLast = 0 }) => {
  const gap = rows > 6 ? 13 : 16;
  const h = 26 + rows * gap;
  return (
    <QFig h={h}>
      <DotArrayPart x={130 - 4 * gap} y={20} rows={rows} cols={9} gap={gap} r={gap * 0.36} emptyLast={emptyLast} />
    </QFig>
  );
};

/** rows sor, soronként 10 korong, az utolsó oszlop áthúzva. */
const TenMinusFig: React.FC<{ rows: number }> = ({ rows }) => {
  const gap = 13;
  const h = 30 + rows * gap;
  return (
    <QFig h={h}>
      <DotArrayPart x={22} y={20} rows={rows} cols={10} gap={gap} r={4.7} colorA="#0ea5e9" crossCol={9} />
      <text x="200" y={h / 2 - 4} textAnchor="middle" fontSize="15" fontWeight="bold" fill="#075985">
        {rows} · 10 = {rows * 10}
      </text>
      <text x="200" y={h / 2 + 18} textAnchor="middle" fontSize="15" fontWeight="bold" fill="#7c2d12">
        {rows} · 9 = <tspan fill={UNK}>?</tspan>
      </text>
    </QFig>
  );
};

/** Számsor dobozokban. */
const SeqFig: React.FC<{ items: string[] }> = ({ items }) => {
  const w = 42;
  const gap = 6;
  const x0 = 130 - (items.length * w + (items.length - 1) * gap) / 2;
  return (
    <QFig h={70}>
      {items.map((t, i) => (
        <g key={i}>
          <rect x={x0 + i * (w + gap)} y={16} width={w} height={38} rx="8" fill={t === '?' ? '#fee2e2' : '#ffedd5'} stroke={t === '?' ? UNK : '#ea580c'} strokeWidth="2" />
          <text x={x0 + i * (w + gap) + w / 2} y={43} textAnchor="middle" fontSize="20" fontWeight="bold" fill={t === '?' ? UNK : '#7c2d12'}>
            {t}
          </text>
        </g>
      ))}
    </QFig>
  );
};

/** a sor × b oszlop és b sor × a oszlop. */
const CommuteFig: React.FC<{ a: number; b: number; question?: boolean }> = ({ a, b, question = false }) => {
  const g1 = 13;
  const g2 = 10;
  const h = Math.max(30 + a * g1, 30 + b * g2) + 20;
  return (
    <QFig h={h}>
      <DotArrayPart x={18} y={22} rows={a} cols={b} gap={g1} r={4.6} colorA="#0ea5e9" />
      <text x={18 + ((b - 1) * g1) / 2} y={h - 10} textAnchor="middle" fontSize="14" fontWeight="bold" fill="#075985">
        {a} · {b}
      </text>
      <DotArrayPart x={200} y={18} rows={b} cols={a} gap={g2} r={3.8} colorA="#f97316" />
      <text x={200 + ((a - 1) * g2) / 2} y={h - 10} textAnchor="middle" fontSize="14" fontWeight="bold" fill="#9a3412">
        {b} · {a}
        {question && <tspan fill={UNK}> = ?</tspan>}
      </text>
    </QFig>
  );
};

/** 3 · 6 és 2 · 9 tömb. */
const TwoArraysFig: React.FC = () => (
  <QFig h={110}>
    <DotArrayPart x={22} y={24} rows={3} cols={6} gap={14} r={5.2} colorA="#10b981" />
    <text x="57" y="96" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#047857">
      3 · 6
    </text>
    <DotArrayPart x={132} y={30} rows={2} cols={9} gap={13} r={5} colorA="#f97316" />
    <text x="184" y="96" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#9a3412">
      ? · 9
    </text>
  </QFig>
);

/** Számegyenes 0–30: béka 3-asával (lent), szöcske 9-esével (fent). */
const ThreeNineLineFig: React.FC = () => (
  <QFig h={160}>
    <text x="12" y="18" fontSize="12" fontWeight="bold" fill="#ea580c">
      9-es ugrások
    </text>
    <JumpLinePart x={20} y={58} w={220} max={30} jumps={3} step={9} color="#ea580c" unitTicks labelEvery={9} fontSize={11} />
    <text x="12" y="94" fontSize="12" fontWeight="bold" fill="#16a34a">
      3-as ugrások
    </text>
    <JumpLinePart x={20} y={130} w={220} max={30} jumps={10} step={3} color="#16a34a" unitTicks labelEvery={3} fontSize={10} />
  </QFig>
);

/** Két kéz, a `bent`-edik ujj behajtva. */
const FingersFig: React.FC<{ bent: number }> = ({ bent }) => {
  const hs = [36, 50, 56, 52, 40, 40, 52, 56, 50, 36];
  return (
    <QFig h={120}>
      <rect x="10" y="80" width="114" height="28" rx="12" fill="#fed7aa" stroke="#9a3412" strokeWidth="2" />
      <rect x="128" y="80" width="116" height="28" rx="12" fill="#fed7aa" stroke="#9a3412" strokeWidth="2" />
      {hs.map((hh, k) => {
        const i = k + 1;
        const isBent = i === bent;
        const h = isBent ? 12 : hh;
        const x = 16 + k * 22 + (i > 5 ? 8 : 0);
        return (
          <rect
            key={i}
            x={x}
            y={86 - h}
            width="16"
            height={h + 4}
            rx="7"
            fill={isBent ? '#e2e8f0' : i < bent ? '#c4b5fd' : '#fdba74'}
            stroke={isBent ? '#64748b' : '#7c2d12'}
            strokeWidth="2"
          />
        );
      })}
      <text x={24 + (bent - 1) * 22 + (bent > 5 ? 8 : 0)} y="22" textAnchor="middle" fontSize="13" fontWeight="bold" fill={UNK}>
        {bent}.
      </text>
    </QFig>
  );
};

const MachineFig: React.FC<{ start: number; ops: string[] }> = ({ start, ops }) => {
  const n = ops.length + 1;
  const w = 40;
  const gap = (240 - n * w) / ops.length;
  return (
    <QFig h={84}>
      {Array.from({ length: n }, (_, i) => {
        const bx = 10 + i * (w + gap);
        const label = i === 0 ? String(start) : i === n - 1 ? '?' : '';
        return (
          <g key={i}>
            <rect x={bx} y={36} width={w} height={34} rx="8" fill={label === '?' ? '#fee2e2' : '#ffedd5'} stroke={label === '?' ? UNK : '#ea580c'} strokeWidth="2" />
            <text x={bx + w / 2} y={60} textAnchor="middle" fontSize="18" fontWeight="bold" fill={label === '?' ? UNK : '#7c2d12'}>
              {label}
            </text>
            {i < ops.length && (
              <>
                <path d={`M ${bx + w + 2} 46 Q ${bx + w + gap / 2} 22 ${bx + w + gap - 2} 46`} fill="none" stroke="#7c3aed" strokeWidth="2" />
                <text x={bx + w + gap / 2} y={24} textAnchor="middle" fontSize="15" fontWeight="bold" fill="#6d28d9">
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

/** Szalagos ábra: felső sáv 1 egység, alsó `times` egység. */
const BarsFig: React.FC<{ unit: string; times: number; names: [string, string] }> = ({ unit, times, names }) => {
  const cw = 19;
  const x0 = 52;
  return (
    <QFig h={100}>
      <text x="10" y="34" fontSize="13" fontWeight="bold" fill="#334155">
        {names[0]}
      </text>
      <rect x={x0} y="18" width={cw} height="24" fill="#fde68a" stroke="#b45309" strokeWidth="2" />
      <text x={x0 + cw / 2} y="35" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#78350f">
        {unit}
      </text>
      <text x="10" y="76" fontSize="13" fontWeight="bold" fill="#334155">
        {names[1]}
      </text>
      {Array.from({ length: times }, (_, i) => (
        <g key={i}>
          <rect x={x0 + i * cw} y="60" width={cw} height="24" fill="#fed7aa" stroke="#c2410c" strokeWidth="2" />
          <text x={x0 + i * cw + cw / 2} y="77" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#7c2d12">
            {unit}
          </text>
        </g>
      ))}
      <text x={x0 + times * cw + 14} y="77" textAnchor="middle" fontSize="16" fontWeight="bold" fill={UNK}>
        ?
      </text>
    </QFig>
  );
};

/** Kisvonat: `cars` kocsi, kocsinként 9 ülés (3 × 3). */
const TrainFig: React.FC<{ cars: number }> = ({ cars }) => (
  <QFig h={90}>
    <rect x="8" y="30" width="26" height="36" rx="5" fill="#ef4444" stroke="#7f1d1d" strokeWidth="2" />
    <rect x="14" y="18" width="10" height="14" fill="#7f1d1d" />
    {Array.from({ length: cars }, (_, i) => (
      <g key={i}>
        <line x1={34 + i * 35} y1="54" x2={38 + i * 35} y2="54" stroke="#334155" strokeWidth="2" />
        <NineBoxPart x={38 + i * 35} y={30} size={31} color="#0ea5e9" />
        <circle cx={46 + i * 35} cy="68" r="4" fill="#334155" />
        <circle cx={61 + i * 35} cy="68" r="4" fill="#334155" />
      </g>
    ))}
    <circle cx="16" cy="70" r="5" fill="#334155" />
    <circle cx="28" cy="70" r="5" fill="#334155" />
  </QFig>
);

// ---------------------------------------------------------------------------
// Kérdések
// ---------------------------------------------------------------------------
export const MULT9_G2_QUESTIONS: QuizQuestion[] = [
  // ----- 1. szint -----
  {
    id: 'mult9g2-q1',
    level: 1,
    questionTypeBadge: 'Gyöngyök',
    figure: <BeadsFig n={2} />,
    question: 'Minden karkötőn 9 gyöngy van. Hány gyöngy van összesen?',
    options: ['18', '11', '16', '19'],
    correctAnswer: 0,
    explanation: '9 + 9 = 18. Szorzással: 2 · 9 = 18.'
  },
  {
    id: 'mult9g2-q2',
    level: 1,
    questionTypeBadge: 'Összeadásból szorzás',
    figure: <GroupsFig n={4} />,
    question: '9 + 9 + 9 + 9. Melyik szorzás ez?',
    options: ['4 · 9', '9 · 9', '4 + 9', '3 · 9'],
    correctAnswer: 0,
    explanation: '4 darab kilences van. Ez 4 · 9.'
  },
  {
    id: 'mult9g2-q3',
    level: 1,
    questionTypeBadge: 'Számegyenes',
    figure: <JumpsFig jumps={5} />,
    question: 'A szöcske 5-öt ugrott, mindig 9-et. Hová érkezett?',
    options: ['45', '40', '54', '14'],
    correctAnswer: 0,
    explanation: '9, 18, 27, 36, 45. Tehát 5 · 9 = 45.'
  },
  {
    id: 'mult9g2-q4',
    level: 1,
    questionTypeBadge: 'Pontrács',
    figure: <ArrayFig rows={3} />,
    question: 'Hány korong van? Mennyi 3 · 9?',
    options: ['27', '12', '24', '36'],
    correctAnswer: 0,
    explanation: '3 sor, soronként 9 korong: 9 + 9 + 9 = 27.'
  },
  {
    id: 'mult9g2-q5',
    level: 1,
    questionTypeBadge: 'Kilencesével',
    figure: <SeqFig items={['9', '18', '27', '36', '?']} />,
    question: 'Számolj kilencesével! Mi jön a 36 után?',
    options: ['45', '44', '37', '54'],
    correctAnswer: 0,
    explanation: '36 + 9 = 45. A 37 csak eggyel több.'
  },
  {
    id: 'mult9g2-q6',
    level: 1,
    questionTypeBadge: 'Tízszer kilenc',
    question: 'Mennyi 10 · 9?',
    options: ['90', '19', '100', '81'],
    correctAnswer: 0,
    explanation: '10 · 9 = 9 · 10 = 90. A 100 az 10 · 10 lenne.'
  },
  {
    id: 'mult9g2-q7',
    level: 1,
    questionTypeBadge: 'Nulla',
    question: 'Mennyi 0 · 9?',
    options: ['0', '9', '1', '90'],
    correctAnswer: 0,
    explanation: 'Nincs egy kilences sem. 0 · 9 = 0.'
  },
  {
    id: 'mult9g2-q8',
    level: 1,
    questionTypeBadge: 'Felcserélés',
    figure: <CommuteFig a={2} b={9} question />,
    question: '2 · 9 = 18. Mennyi 9 · 2?',
    options: ['18', '11', '20', '16'],
    correctAnswer: 0,
    explanation: 'Ugyanannyi korong van mindkét képen. 9 · 2 = 2 · 9 = 18.'
  },
  {
    id: 'mult9g2-q9',
    level: 1,
    questionTypeBadge: 'Székek',
    figure: <ArrayFig rows={6} />,
    question: 'A teremben 6 sor szék van. Minden sorban 9 szék. Hány szék van?',
    options: ['54', '15', '56', '45'],
    correctAnswer: 0,
    explanation: '6 · 9 = 54. A 15 az lenne, ha összeadnád: 6 + 9.'
  },
  {
    id: 'mult9g2-q10',
    level: 1,
    questionTypeBadge: 'Melyik szorzás?',
    figure: <GroupsFig n={7} />,
    question: 'Minden dobozban 9 golyó van. Melyik szorzás illik a képhez?',
    options: ['7 · 9', '9 · 9', '7 + 9', '6 · 9'],
    correctAnswer: 0,
    explanation: '7 doboz, mindegyikben 9 golyó: 7 · 9.'
  },

  // ----- 2. szint -----
  {
    id: 'mult9g2-q11',
    level: 2,
    questionTypeBadge: 'Hány doboz?',
    figure: <BoxesQFig total={72} />,
    question: 'Hány kilences doboz kell, hogy 72 golyó legyen?',
    options: ['8', '7', '9', '63'],
    correctAnswer: 0,
    explanation: '8 · 9 = 72. Számolj kilencesével: 9, 18, 27, 36, 45, 54, 63, 72. Ez 8 szám.'
  },
  {
    id: 'mult9g2-q12',
    level: 2,
    questionTypeBadge: 'Tízes trükk',
    figure: <TenMinusFig rows={7} />,
    question: '7 · 10 = 70. Mennyi 7 · 9?',
    options: ['63', '69', '60', '71'],
    correctAnswer: 0,
    explanation: 'Minden sorból 1 korong eltűnik. Ez 7 korong. 70 − 7 = 63.'
  },
  {
    id: 'mult9g2-q13',
    level: 2,
    questionTypeBadge: 'Benne van a táblában?',
    question: 'Melyik szám van a 9-es táblában?',
    options: ['81', '71', '82', '80'],
    correctAnswer: 0,
    explanation: '9 · 9 = 81. Próba: 8 + 1 = 9.'
  },
  {
    id: 'mult9g2-q14',
    level: 2,
    questionTypeBadge: 'Hány ugrás?',
    figure: <JumpsFig jumps={0} target={63} />,
    question: 'A szöcske mindig 9-et ugrik. Hány ugrással ér a 63-ra?',
    options: ['7', '6', '8', '9'],
    correctAnswer: 0,
    explanation: '7 · 9 = 63. Tehát 7 ugrás kell.'
  },
  {
    id: 'mult9g2-q15',
    level: 2,
    questionTypeBadge: 'Melyik nagyobb?',
    question: 'Melyik a nagyobb: 6 · 9 vagy 5 · 10?',
    options: ['6 · 9 a nagyobb', '5 · 10 a nagyobb', 'Egyenlők'],
    correctAnswer: 0,
    explanation: '6 · 9 = 54 és 5 · 10 = 50. Az 54 a nagyobb.'
  },
  {
    id: 'mult9g2-q16',
    level: 2,
    questionTypeBadge: '3-as és 9-es tábla',
    figure: <TwoArraysFig />,
    question: '3 · 6 = 18. Melyik szorzás eredménye is 18?',
    options: ['2 · 9', '3 · 9', '6 · 9', '1 · 9'],
    correctAnswer: 0,
    explanation: '2 · 9 = 9 + 9 = 18. Mindkét képen 18 korong van.'
  },
  {
    id: 'mult9g2-q17',
    level: 2,
    questionTypeBadge: 'Rokon táblák',
    figure: <ThreeNineLineFig />,
    question: 'Melyik szám van a 3-as ÉS a 9-es táblában is?',
    options: ['27', '24', '21', '15'],
    correctAnswer: 0,
    explanation: 'A 27 = 3 · 9 = 9 · 3. A 24, 21, 15 csak a 3-as táblában van.'
  },
  {
    id: 'mult9g2-q18',
    level: 2,
    questionTypeBadge: 'Hiányzó szám',
    question: 'Mi kerül a □ helyére? 9 · □ = 54',
    options: ['6', '5', '7', '45'],
    correctAnswer: 0,
    explanation: '9 · 6 = 6 · 9 = 54. A 45 az 5 · 9.'
  },
  {
    id: 'mult9g2-q19',
    level: 2,
    questionTypeBadge: '6-os és 9-es tábla',
    question: '6 · 6 = 36. Melyik 9-es szorzás egyenlő vele?',
    options: ['4 · 9', '6 · 9', '3 · 9', '5 · 9'],
    correctAnswer: 0,
    explanation: '4 · 9 = 36. Kilencesével: 9, 18, 27, 36.'
  },
  {
    id: 'mult9g2-q20',
    level: 2,
    questionTypeBadge: 'Ujjtrükk',
    figure: <FingersFig bent={8} />,
    question: 'A 8. ujjadat hajtod be. Előtte 7, utána 2 ujj áll. Mennyi 8 · 9?',
    options: ['72', '27', '81', '64'],
    correctAnswer: 0,
    explanation: '7 tízes és 2 egyes: 72. A 27 rossz: előre jönnek a tízesek!'
  },

  // ----- 3. szint -----
  {
    id: 'mult9g2-q21',
    level: 3,
    questionTypeBadge: 'Két gyerek krétái',
    figure: <SplitBoxesFig a={3} b={4} names={['Bori', 'Dani']} />,
    question: 'Bori 3, Dani 4 doboz krétát kapott. Minden dobozban 9 kréta van. Hány kréta van összesen?',
    options: ['63', '27', '36', '16'],
    correctAnswer: 0,
    explanation: '3 + 4 = 7 doboz. 7 · 9 = 63. (Vagy: 27 + 36 = 63.)'
  },
  {
    id: 'mult9g2-q22',
    level: 3,
    questionTypeBadge: 'Szorzás és kivonás',
    question: 'Mennyi 9 · 9 − 1?',
    options: ['80', '81', '82', '72'],
    correctAnswer: 0,
    explanation: 'Előbb szorozz: 9 · 9 = 81. Aztán vonj ki: 81 − 1 = 80.'
  },
  {
    id: 'mult9g2-q23',
    level: 3,
    questionTypeBadge: 'Melyik igaz?',
    figure: <CommuteFig a={3} b={9} />,
    question: 'Melyik egyenlőség igaz?',
    options: ['3 · 9 = 9 · 3', '3 · 9 = 3 + 9', '3 · 9 = 6 · 6', '3 · 9 = 9 + 9'],
    correctAnswer: 0,
    explanation: 'Mindkét képen 27 korong van. 3 · 9 = 9 · 3 = 27.'
  },
  {
    id: 'mult9g2-q24',
    level: 3,
    questionTypeBadge: 'Számológép',
    figure: <MachineFig start={4} ops={['· 9', '+ 5']} />,
    question: 'Kezdd a 4-gyel! Szorozd meg 9-cel, aztán adj hozzá 5-öt! Mit kapsz?',
    options: ['41', '81', '36', '18'],
    correctAnswer: 0,
    explanation: '4 · 9 = 36, és 36 + 5 = 41. A 81 rossz sorrend: 4 + 5 = 9, 9 · 9.'
  },
  {
    id: 'mult9g2-q25',
    level: 3,
    questionTypeBadge: 'Kilencszer annyi',
    figure: <BarsFig unit="5" times={9} names={['Lili', 'Ádám']} />,
    question: 'Lili 5 matricát kapott. Ádám 9-szer annyit. Hány matricát kapott Ádám?',
    options: ['45', '14', '54', '40'],
    correctAnswer: 0,
    explanation: '9-szer 5: 9 · 5 = 5 · 9 = 45. A 14 az 5 + 9.'
  },
  {
    id: 'mult9g2-q26',
    level: 3,
    questionTypeBadge: 'Üres székek',
    figure: <ArrayFig rows={8} emptyLast={4} />,
    question: '8 sorban 9 szék van. 4 szék üres. Hány gyerek ül a széken?',
    options: ['68', '72', '76', '64'],
    correctAnswer: 0,
    explanation: '8 · 9 = 72 szék. 72 − 4 = 68 gyerek ül.'
  },
  {
    id: 'mult9g2-q27',
    level: 3,
    questionTypeBadge: 'Hiányzó szám',
    question: 'Mi kerül a □ helyére? □ · 9 = 45 + 9',
    options: ['6', '5', '54', '7'],
    correctAnswer: 0,
    explanation: '45 + 9 = 54, és 6 · 9 = 54. Tehát □ = 6.'
  },
  {
    id: 'mult9g2-q28',
    level: 3,
    questionTypeBadge: 'Számegyenes',
    figure: <JumpsFig jumps={10} endQuestion={false} band={[30, 60]} />,
    question: 'A szöcske 0-tól 90-ig ugrál. Hány számra ugrik a sárga részen, 30 és 60 között?',
    options: ['3', '4', '2', '30'],
    correctAnswer: 0,
    explanation: 'A 30 és 60 közötti kilences számok: 36, 45, 54. Ez 3 szám.'
  },
  {
    id: 'mult9g2-q29',
    level: 3,
    questionTypeBadge: 'Kisvonat',
    figure: <TrainFig cars={6} />,
    question: 'A kisvonatnak 6 kocsija van. Minden kocsiban 9 hely. 50 gyerek ül fel. Hány hely marad üresen?',
    options: ['4', '54', '6', '14'],
    correctAnswer: 0,
    explanation: '6 · 9 = 54 hely. 54 − 50 = 4 hely marad üresen.'
  },
  {
    id: 'mult9g2-q30',
    level: 3,
    questionTypeBadge: 'Legnagyobb',
    question: 'Melyik a legnagyobb?',
    options: ['9 · 6', '6 · 8', '3 · 10', '6 · 6'],
    correctAnswer: 0,
    explanation: '9 · 6 = 54, 6 · 8 = 48, 3 · 10 = 30, 6 · 6 = 36. Az 54 a legnagyobb.'
  }
];

export const Mult9G2Quiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => (
  <QuizTemplate
    grade={2}
    chapterId="szorzas"
    topicId="g2-szorzas-9-quiz"
    subtopicId="szorzas-9-cel"
    title="8. Szorzás 9-cel – Kvíz"
    subtitle="30 feladat 3 szinten: kilences csoportok, a 9-es szorzótábla, tízes trükk, a 3-as, 6-os, 9-es tábla kapcsolata, szöveges feladatok."
    badge="2. OSZTÁLY • IV. SZORZÁS • KVÍZ"
    questions={MULT9_G2_QUESTIONS}
    cheatSheets={[
      {
        title: 'A 9-es szorzótábla',
        items: ['1 · 9 = 9, 2 · 9 = 18, 3 · 9 = 27', '4 · 9 = 36, 5 · 9 = 45, 6 · 9 = 54', '7 · 9 = 63, 8 · 9 = 72', '9 · 9 = 81, 10 · 9 = 90']
      },
      {
        title: 'Trükkök',
        items: ['Tízes trükk: 7 · 10 = 70, 70 − 7 = 63', 'A jegyek összege 9: 6 + 3 = 9', 'Ujjtrükk: hajtsd be az ujjad!', '3 · 6 = 2 · 9 = 18, 6 · 6 = 4 · 9 = 36']
      },
      {
        title: 'Jó tudni',
        items: ['0 · 9 = 0', '2 · 9 = 9 · 2', 'Kilencesével: 9, 18, 27, 36, 45 …', 'Előbb szorozz, aztán adj hozzá!']
      }
    ]}
    onBack={onBack}
    onSwitchToTheory={onSwitchToTheory}
    onSwitchToMatcher={onSwitchToMatcher}
    onSwitchToSorter={onSwitchToSorter}
    initialGameMode={initialGameMode}
    matcherComponent={<Mult9G2Matcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />}
    sorterComponent={<Mult9G2Sorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />}
  />
);

export default Mult9G2Quiz;
