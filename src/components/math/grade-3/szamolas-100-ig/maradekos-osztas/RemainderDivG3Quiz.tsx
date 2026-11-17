import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { RemainderDivG3Matcher } from './RemainderDivG3Matcher';
import { RemainderDivG3Sorter } from './RemainderDivG3Sorter';

// ---------------------------------------------------------------------------
// Kérdésábrák
// ---------------------------------------------------------------------------
const UNK = '#dc2626';

const QFig: React.FC<{ children: React.ReactNode; h?: number }> = ({ children, h = 150 }) => (
  <svg viewBox={`0 0 240 ${h}`} className="w-full max-w-[280px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
    <rect x="1" y="1" width="238" height={h - 2} rx="10" fill="#f8fafc" stroke="#cbd5e1" />
    {children}
  </svg>
);

/**
 * total darab kör; az első `circledGroups` csoport (size darab) karikázva.
 * A maradék körök a sor végén lazán.
 */
const GroupFig: React.FC<{ total: number; size: number; circledGroups: number; color?: string; label?: string }> = ({
  total,
  size,
  circledGroups,
  color = '#ef4444',
  label
}) => {
  const perRow = 10;
  const sp = 21;
  const rows = Math.ceil(total / perRow);
  const top = label ? 34 : 22;
  const h = top + rows * 26 + 10;
  const items = Array.from({ length: total }, (_, i) => ({ x: 26 + (i % perRow) * sp, y: top + 6 + Math.floor(i / perRow) * 26 }));
  return (
    <QFig h={h}>
      {label && (
        <text x="120" y="20" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#334155">
          {label}
        </text>
      )}
      {Array.from({ length: circledGroups }, (_, g) => {
        const first = items[g * size];
        const last = items[g * size + size - 1];
        if (!first || !last || first.y !== last.y) return null;
        return <rect key={g} x={first.x - 10} y={first.y - 11} width={last.x - first.x + 20} height="22" rx="11" fill="none" stroke="#2563eb" strokeWidth="2" />;
      })}
      {items.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="7.5" fill={color} stroke="#334155" strokeWidth="0.8" />
      ))}
    </QFig>
  );
};

/** Csoportok külön dobozokban + kimaradók. */
const BagsFig: React.FC<{ bags: number; size: number; left: number; color?: string; label?: string; bagName?: string }> = ({
  bags,
  size,
  left,
  color = '#22c55e',
  label
}) => {
  const bw = 46;
  const per = size > 3 ? Math.ceil(size / 2) : size;
  return (
    <QFig h={94}>
      {label && (
        <text x="120" y="20" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#334155">
          {label}
        </text>
      )}
      {Array.from({ length: bags }, (_, b) => (
        <g key={b}>
          <rect x={10 + b * (bw + 6)} y="34" width={bw} height="46" rx="8" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.5" />
          {Array.from({ length: size }, (_, k) => {
            const row = Math.floor(k / per);
            const inLine = row === 0 ? per : size - per;
            return (
              <circle
                key={k}
                cx={10 + b * (bw + 6) + bw / 2 - ((inLine - 1) * 11) / 2 + (k % per) * 11}
                cy={48 + row * 18}
                r="4.8"
                fill={color}
                stroke="#334155"
                strokeWidth="0.6"
              />
            );
          })}
        </g>
      ))}
      {Array.from({ length: left }, (_, k) => (
        <circle key={`l${k}`} cx={20 + bags * (bw + 6) + k * 13} cy="57" r="4.8" fill={color} stroke="#334155" strokeWidth="0.6" />
      ))}
    </QFig>
  );
};

/** Füzetes lejegyzés: a maradék helyén "?". */
const GridNoteFig: React.FC<{ cells: string[]; under: number }> = ({ cells, under }) => {
  const c = 28;
  const x0 = 120 - (cells.length * c) / 2;
  return (
    <QFig h={100}>
      {[0, 1].map((r) =>
        cells.map((_, i) => <rect key={`${r}-${i}`} x={x0 + i * c} y={20 + r * c} width={c} height={c} fill="#fff" stroke="#bae6fd" />)
      )}
      {cells.map((t, i) => (
        <text key={i} x={x0 + i * c + c / 2} y={20 + 20} textAnchor="middle" fontSize="18" fontWeight="bold" fill="#0f172a">
          {t}
        </text>
      ))}
      <rect x={x0 + under * c + 3} y={20 + c + 3} width={c - 6} height={c - 6} rx="4" fill="#fee2e2" stroke={UNK} />
      <text x={x0 + under * c + c / 2} y={20 + c + 20} textAnchor="middle" fontSize="16" fontWeight="bold" fill={UNK}>
        ?
      </text>
      <text x="120" y="92" textAnchor="middle" fontSize="11" fill="#475569">
        a maradék az egyesek alá kerül
      </text>
    </QFig>
  );
};

/** Pálcikák halomban + egy minta-háromszög. */
const SticksFig: React.FC<{ n: number }> = ({ n }) => (
  <QFig h={120}>
    <text x="60" y="20" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#334155">minta: 3 pálcika</text>
    <g strokeWidth="4" strokeLinecap="round">
      <line x1="36" y1="80" x2="84" y2="80" stroke="#dc2626" />
      <line x1="36" y1="80" x2="60" y2="38" stroke="#2563eb" />
      <line x1="84" y1="80" x2="60" y2="38" stroke="#16a34a" />
    </g>
    <text x="172" y="20" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#334155">{`${n} pálcika`}</text>
    {Array.from({ length: n }, (_, i) => (
      <line key={i} x1={118 + (i % 8) * 14} y1={34 + Math.floor(i / 8) * 36} x2={124 + (i % 8) * 14} y2={64 + Math.floor(i / 8) * 36} stroke="#eab308" strokeWidth="4" strokeLinecap="round" />
    ))}
  </QFig>
);

/** Tojástartók: 6 hely dobozonként. */
const EggFig: React.FC<{ boxes: number; left: number }> = ({ boxes, left }) => (
  <QFig h={110}>
    <text x="120" y="20" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#334155">19 tojás, egy dobozba 6 fér</text>
    {Array.from({ length: boxes }, (_, b) => (
      <g key={b}>
        <rect x={12 + b * 62} y="34" width="54" height="40" rx="6" fill="#d6d3d1" stroke="#78716c" strokeWidth="1.5" />
        {Array.from({ length: 6 }, (_, e) => (
          <ellipse key={e} cx={24 + b * 62 + (e % 3) * 15} cy={46 + Math.floor(e / 3) * 16} rx="6" ry="7" fill="#fef3c7" stroke="#a16207" strokeWidth="0.8" />
        ))}
      </g>
    ))}
    {Array.from({ length: left }, (_, k) => (
      <ellipse key={k} cx={208 + k * 14} cy="54" rx="6" ry="7" fill="#fef3c7" stroke="#a16207" strokeWidth="0.8" />
    ))}
    <text x="120" y="96" textAnchor="middle" fontSize="13" fontWeight="bold" fill={UNK}>Hány tele doboz? Mennyi marad?</text>
  </QFig>
);

/** Táblázat: osztások egymás alatt, az utolsó maradéka "?". */
const RowsFig: React.FC<{ d: number; nums: number[] }> = ({ d, nums }) => (
  <QFig h={30 + nums.length * 26}>
    {nums.map((n, i) => {
      const last = i === nums.length - 1;
      return (
        <g key={n}>
          <text x="40" y={34 + i * 26} fontSize="15" fontWeight="bold" fill="#1e293b">{`${n} : ${d} = ${Math.floor(n / d)}`}</text>
          <text x="140" y={34 + i * 26} fontSize="15" fontWeight="bold" fill={last ? UNK : '#b91c1c'}>{last ? 'marad ?' : `marad ${n % d}`}</text>
        </g>
      );
    })}
  </QFig>
);

/** Táblára írt (hibás) megoldás. */
const BoardFig: React.FC<{ text: string }> = ({ text }) => (
  <QFig h={100}>
    <rect x="20" y="16" width="200" height="64" rx="6" fill="#14532d" stroke="#78350f" strokeWidth="5" />
    <text x="120" y="54" textAnchor="middle" fontSize="17" fontWeight="bold" fill="#f8fafc">{text}</text>
    <text x="120" y="94" textAnchor="middle" fontSize="12" fontWeight="bold" fill={UNK}>Jó ez?</text>
  </QFig>
);

/** Dominó 6 pöttyel és egy szám. */
const DominoFig: React.FC<{ n: number }> = ({ n }) => (
  <QFig h={100}>
    <rect x="30" y="24" width="56" height="44" rx="6" fill="#fef3c7" stroke="#b45309" strokeWidth="2" />
    <text x="58" y="54" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#78350f">{n}</text>
    <text x="104" y="54" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#334155">:</text>
    <rect x="122" y="24" width="88" height="44" rx="6" fill="#db2777" stroke="#831843" strokeWidth="2" />
    <line x1="166" y1="24" x2="166" y2="68" stroke="#fce7f3" strokeWidth="1.5" />
    {[0, 1, 2].map((c) =>
      [0, 1].map((r) => <circle key={`${c}-${r}`} cx={134 + c * 10} cy={38 + r * 16} r="3.2" fill="#fff" />)
    )}
    <text x="120" y="88" textAnchor="middle" fontSize="11" fill="#475569">oszd el a pöttyök számával</text>
  </QFig>
);

/** Csónakok és gyerekek. */
const BoatsFig: React.FC = () => (
  <QFig h={110}>
    <text x="120" y="20" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#334155">26 gyerek, egy csónakba 4 fér</text>
    <rect x="2" y="70" width="236" height="36" fill="#bae6fd" />
    <path d="M 70 62 L 170 62 L 156 82 L 84 82 Z" fill="#b45309" stroke="#78350f" strokeWidth="1.5" />
    {[0, 1, 2, 3].map((k) => (
      <g key={k}>
        <circle cx={92 + k * 18} cy="46" r="6" fill="#fde68a" stroke="#b45309" />
        <rect x={87 + k * 18} y="52" width="10" height="10" rx="2" fill="#f97316" />
      </g>
    ))}
    <text x="200" y="56" textAnchor="middle" fontSize="18" fontWeight="bold" fill={UNK}>?</text>
  </QFig>
);

/** Karkötő 8 gyönggyel. */
const BraceletFig: React.FC = () => (
  <QFig h={110}>
    <text x="70" y="20" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#334155">1 karkötő: 8 gyöngy</text>
    <circle cx="70" cy="64" r="30" fill="none" stroke="#94a3b8" strokeWidth="1.5" />
    {Array.from({ length: 8 }, (_, k) => {
      const a = (k / 8) * Math.PI * 2;
      return <circle key={k} cx={70 + 30 * Math.cos(a)} cy={64 + 30 * Math.sin(a)} r="6" fill={['#ec4899', '#8b5cf6', '#06b6d4', '#f59e0b'][k % 4]} stroke="#334155" strokeWidth="0.6" />;
    })}
    <rect x="140" y="44" width="84" height="40" rx="10" fill="#fdf2f8" stroke="#db2777" />
    <text x="182" y="69" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#9d174d">45 gyöngy</text>
  </QFig>
);

/** Pénz és ár. */
const MoneyFig: React.FC = () => (
  <QFig h={110}>
    {[20, 20, 10].map((v, i) => (
      <g key={i}>
        <circle cx={34 + i * 40} cy="56" r="17" fill={v === 20 ? '#fde68a' : '#e5e7eb'} stroke="#92400e" strokeWidth="1.5" />
        <text x={34 + i * 40} y="61" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#78350f">{v}</text>
      </g>
    ))}
    <text x="74" y="96" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#334155">50 Ft</text>
    <rect x="150" y="30" width="70" height="52" rx="8" fill="#ecfeff" stroke="#0891b2" strokeWidth="1.5" />
    <circle cx="185" cy="50" r="10" fill="#facc15" stroke="#a16207" />
    <text x="185" y="76" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#0e7490">9 Ft</text>
  </QFig>
);

/** 4 gyerek és a golyós doboz. */
const MarblesFig: React.FC = () => (
  <QFig h={110}>
    <text x="120" y="20" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#334155">30 golyó, 4 gyerek</text>
    {[0, 1, 2, 3].map((k) => {
      const cx = 30 + k * 44;
      return (
        <g key={k}>
          <circle cx={cx} cy="48" r="11" fill="#fde68a" stroke="#b45309" />
          <circle cx={cx - 4} cy="46" r="1.5" fill="#334155" />
          <circle cx={cx + 4} cy="46" r="1.5" fill="#334155" />
          <rect x={cx - 11} y="64" width="22" height="18" rx="4" fill="#ede9fe" stroke="#7c3aed" />
          <text x={cx} y="78" textAnchor="middle" fontSize="11" fontWeight="bold" fill={UNK}>?</text>
        </g>
      );
    })}
    <rect x="198" y="52" width="32" height="30" rx="4" fill="#d6d3d1" stroke="#57534e" />
    <text x="214" y="98" textAnchor="middle" fontSize="10" fill="#475569">doboz</text>
  </QFig>
);

/** Sorok a tornateremben. */
const LinesFig: React.FC = () => (
  <QFig h={130}>
    <text x="120" y="18" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#334155">31 gyerek, 4 egyforma sor</text>
    {[0, 1, 2, 3].map((r) => (
      <g key={r}>
        <text x="16" y={42 + r * 18} fontSize="10" fill="#475569">{`${r + 1}.`}</text>
        {Array.from({ length: 3 }, (_, k) => (
          <circle key={k} cx={40 + k * 16} cy={38 + r * 18} r="5.5" fill="#38bdf8" stroke="#0369a1" />
        ))}
        <text x="104" y={42 + r * 18} fontSize="12" fill="#475569">…</text>
      </g>
    ))}
    <rect x="150" y="96" width="76" height="12" rx="3" fill="#a16207" />
    <text x="188" y="88" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#334155">pad: ?</text>
  </QFig>
);

/** Fánkok dobozban. */
const DonutFig: React.FC = () => (
  <QFig h={110}>
    <text x="120" y="20" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#334155">20 fánk + még 5 fánk</text>
    <rect x="20" y="36" width="90" height="50" rx="6" fill="#fef3c7" stroke="#b45309" strokeWidth="1.5" />
    {Array.from({ length: 6 }, (_, k) => (
      <g key={k}>
        <circle cx={36 + (k % 3) * 29} cy={50 + Math.floor(k / 3) * 22} r="9" fill="#f472b6" stroke="#9d174d" />
        <circle cx={36 + (k % 3) * 29} cy={50 + Math.floor(k / 3) * 22} r="3" fill="#fef3c7" />
      </g>
    ))}
    <text x="65" y="102" textAnchor="middle" fontSize="11" fill="#475569">egy dobozba 6 fér</text>
    <text x="180" y="66" textAnchor="middle" fontSize="15" fontWeight="bold" fill={UNK}>? doboz</text>
  </QFig>
);

/** Ismeretlen osztandó. */
const MysteryFig: React.FC = () => (
  <QFig h={80}>
    <rect x="22" y="22" width="40" height="36" rx="6" fill="#fee2e2" stroke={UNK} />
    <text x="42" y="47" textAnchor="middle" fontSize="18" fontWeight="bold" fill={UNK}>?</text>
    <text x="140" y="47" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#1e293b">: 7 = 5 marad 3</text>
  </QFig>
);

// ---------------------------------------------------------------------------
// Kérdések
// ---------------------------------------------------------------------------
export const REMAINDER_DIV_G3_QUESTIONS: QuizQuestion[] = [
  // ---------------- 1. szint ----------------
  {
    id: 'rdiv-q1',
    level: 1,
    questionTypeBadge: 'Csoportosítás',
    figure: <GroupFig total={11} size={2} circledGroups={1} label="11 korong, kettesével" />,
    question: 'Rakd kettesével a korongokat! Hány csoport lesz, és mennyi marad?',
    options: ['5 csoport, marad 1', '6 csoport, marad 0', '5 csoport, marad 2', '4 csoport, marad 3'],
    correctAnswer: 0,
    explanation: '5 · 2 = 10, és 11 − 10 = 1. Tehát 11 : 2 = 5 marad 1.'
  },
  {
    id: 'rdiv-q2',
    level: 1,
    questionTypeBadge: 'Maradékos osztás',
    figure: <BagsFig bags={3} size={4} left={2} color="#ef4444" label="14 alma, egy zacskóba 4 kerül" />,
    question: 'Melyik osztás illik a képhez?',
    options: ['14 : 4 = 3 marad 2', '14 : 3 = 4 marad 2', '14 : 4 = 2 marad 3', '12 : 4 = 3'],
    correctAnswer: 0,
    explanation: '3 zacskóban 4-4 alma van, kint maradt 2. 14 : 4 = 3 marad 2.'
  },
  {
    id: 'rdiv-q3',
    level: 1,
    questionTypeBadge: 'Maradékos osztás',
    question: 'Mennyi 9 : 2?',
    options: ['4 marad 1', '3 marad 3', '5 marad 1', '4 marad 0'],
    correctAnswer: 0,
    explanation: '4 · 2 = 8, és 9 − 8 = 1. Tehát 9 : 2 = 4 marad 1.'
  },
  {
    id: 'rdiv-q4',
    level: 1,
    questionTypeBadge: 'Maradékos osztás',
    question: 'Mennyi 17 : 5?',
    options: ['3 marad 2', '2 marad 7', '3 marad 3', '4 marad 2'],
    correctAnswer: 0,
    explanation: '3 · 5 = 15, és 17 − 15 = 2. Tehát 17 : 5 = 3 marad 2.'
  },
  {
    id: 'rdiv-q5',
    level: 1,
    questionTypeBadge: 'Pálcikák',
    figure: <SticksFig n={16} />,
    question: 'Hány háromszöget rakhatsz ki 16 pálcikából?',
    options: ['5 háromszöget, marad 1 pálcika', '6 háromszöget, marad 2 pálcika', '5 háromszöget, marad 2 pálcika', '4 háromszöget, marad 4 pálcika'],
    correctAnswer: 0,
    explanation: 'Egy háromszöghöz 3 pálcika kell. 5 · 3 = 15, marad 1. 16 : 3 = 5 marad 1.'
  },
  {
    id: 'rdiv-q6',
    level: 1,
    questionTypeBadge: 'Maradék nélkül',
    figure: <GroupFig total={20} size={5} circledGroups={2} label="20 korong, ötösével" color="#f59e0b" />,
    question: 'Rakd ötösével a 20 korongot! Mennyi marad?',
    options: ['0', '5', '4', '1'],
    correctAnswer: 0,
    explanation: '4 · 5 = 20. Nem marad semmi: 20 : 5 = 4, a maradék 0.'
  },
  {
    id: 'rdiv-q7',
    level: 1,
    questionTypeBadge: 'Ellenőrzés',
    figure: (
      <QFig h={70}>
        <text x="120" y="42" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#1e293b">13 : 4 = 3 marad 1</text>
      </QFig>
    ),
    question: 'Melyik az osztás ellenőrzése?',
    options: ['3 · 4 + 1 = 13', '3 · 4 − 1 = 11', '3 + 4 + 1 = 8', '4 · 4 + 1 = 17'],
    correctAnswer: 0,
    explanation: 'hányados · osztó + maradék = osztandó: 3 · 4 + 1 = 13.'
  },
  {
    id: 'rdiv-q8',
    level: 1,
    questionTypeBadge: 'Lejegyzés',
    figure: <GridNoteFig cells={['2', '3', ':', '7', '=', '3']} under={1} />,
    question: '23 : 7 = 3. Melyik szám kerül a ? helyére?',
    options: ['2', '3', '1', '4'],
    correctAnswer: 0,
    explanation: '3 · 7 = 21, és 23 − 21 = 2. A maradék 2.'
  },
  {
    id: 'rdiv-q9',
    level: 1,
    questionTypeBadge: 'Maradékos osztás',
    question: 'Mennyi 25 : 3?',
    options: ['8 marad 1', '7 marad 4', '8 marad 2', '9 marad 1'],
    correctAnswer: 0,
    explanation: '8 · 3 = 24, és 25 − 24 = 1. A 9 · 3 = 27 már túl sok.'
  },
  {
    id: 'rdiv-q10',
    level: 1,
    questionTypeBadge: 'Csomagolás',
    figure: <EggFig boxes={3} left={1} />,
    question: '19 tojást csomagolsz. Egy dobozba 6 fér. Hány tele doboz lesz?',
    options: ['3 tele doboz, marad 1 tojás', '4 tele doboz, marad 0 tojás', '3 tele doboz, marad 2 tojás', '2 tele doboz, marad 7 tojás'],
    correctAnswer: 0,
    explanation: '3 · 6 = 18, és 19 − 18 = 1. 19 : 6 = 3 marad 1.'
  },

  // ---------------- 2. szint ----------------
  {
    id: 'rdiv-q11',
    level: 2,
    questionTypeBadge: 'Maradék szabály',
    question: '5-tel osztasz. Melyik szám NEM lehet a maradék?',
    options: ['5', '4', '0', '2'],
    correctAnswer: 0,
    explanation: 'A maradék mindig kisebb, mint az osztó. 5-tel osztva csak 0, 1, 2, 3 vagy 4 maradhat.'
  },
  {
    id: 'rdiv-q12',
    level: 2,
    questionTypeBadge: 'Maradékos osztás',
    question: 'Mennyi 47 : 6?',
    options: ['7 marad 5', '8 marad 1', '6 marad 11', '7 marad 4'],
    correctAnswer: 0,
    explanation: '7 · 6 = 42, és 47 − 42 = 5. A 8 · 6 = 48 már több, mint 47.'
  },
  {
    id: 'rdiv-q13',
    level: 2,
    questionTypeBadge: 'Maradékos osztás',
    question: 'Mennyi 38 : 9?',
    options: ['4 marad 2', '3 marad 11', '4 marad 1', '5 marad 2'],
    correctAnswer: 0,
    explanation: '4 · 9 = 36, és 38 − 36 = 2. Tehát 38 : 9 = 4 marad 2.'
  },
  {
    id: 'rdiv-q14',
    level: 2,
    questionTypeBadge: 'Képről',
    figure: <GroupFig total={29} size={4} circledGroups={2} label="29 korong, négyesével" color="#8b5cf6" />,
    question: 'Rakd négyesével a 29 korongot! Mit írsz le?',
    options: ['29 : 4 = 7 marad 1', '29 : 4 = 6 marad 5', '29 : 4 = 7 marad 2', '29 : 4 = 8 marad 1'],
    correctAnswer: 0,
    explanation: '7 · 4 = 28, és 29 − 28 = 1. A 6 marad 5 rossz, mert az 5 nagyobb, mint a 4.'
  },
  {
    id: 'rdiv-q15',
    level: 2,
    questionTypeBadge: 'Maradékok változása',
    figure: <RowsFig d={4} nums={[24, 25, 26, 27]} />,
    question: 'Figyeld a maradékokat! Mennyi a 27 : 4 maradéka?',
    options: ['3', '4', '0', '2'],
    correctAnswer: 0,
    explanation: 'Az osztandó mindig 1-gyel nő, a maradék is: 0, 1, 2, 3. 6 · 4 + 3 = 27.'
  },
  {
    id: 'rdiv-q16',
    level: 2,
    questionTypeBadge: 'Hiányzó szám',
    question: 'Melyik szám kerül a □ helyére? 55 = 6 · 8 + □',
    options: ['7', '8', '6', '9'],
    correctAnswer: 0,
    explanation: '6 · 8 = 48, és 55 − 48 = 7.'
  },
  {
    id: 'rdiv-q17',
    level: 2,
    questionTypeBadge: 'Szöveges feladat',
    question: 'Egy csokorba 5 szál virág kell. 32 szálad van. Hány csokor lesz?',
    options: ['6 csokor, marad 2 szál', '7 csokor, marad 3 szál', '6 csokor, marad 1 szál', '5 csokor, marad 7 szál'],
    correctAnswer: 0,
    explanation: '6 · 5 = 30, és 32 − 30 = 2. 32 : 5 = 6 marad 2.'
  },
  {
    id: 'rdiv-q18',
    level: 2,
    questionTypeBadge: 'Maradék',
    question: 'Melyik osztásnál marad 3?',
    options: ['23 : 4', '24 : 4', '22 : 4', '21 : 4'],
    correctAnswer: 0,
    explanation: '23 : 4 = 5 marad 3. A 24 : 4-nél 0, a 22 : 4-nél 2, a 21 : 4-nél 1 marad.'
  },
  {
    id: 'rdiv-q19',
    level: 2,
    questionTypeBadge: 'Hibakeresés',
    figure: <BoardFig text="50 : 7 = 6 marad 8" />,
    question: 'Ezt írta valaki a táblára. Mi a hiba?',
    options: ['A maradék nagyobb az osztónál. Jó: 7 marad 1', 'Nincs hiba, ez jó', 'Jó: 8 marad 6', 'Jó: 6 marad 2'],
    correctAnswer: 0,
    explanation: 'A 8 nagyobb, mint a 7, abból még egy 7-es csoport lesz. 7 · 7 = 49, marad 1.'
  },
  {
    id: 'rdiv-q20',
    level: 2,
    questionTypeBadge: 'Dominó',
    figure: <DominoFig n={40} />,
    question: 'Oszd el a 40-et a dominó pöttyeinek számával!',
    options: ['6 marad 4', '7 marad 2', '6 marad 3', '5 marad 10'],
    correctAnswer: 0,
    explanation: 'A dominón 6 pötty van. 6 · 6 = 36, és 40 − 36 = 4.'
  },

  // ---------------- 3. szint ----------------
  {
    id: 'rdiv-q21',
    level: 3,
    questionTypeBadge: 'Gondolkodj!',
    figure: <BoatsFig />,
    question: '26 gyerek csónakázik. Egy csónakba 4 gyerek fér. Hány csónak kell, hogy mindenki beüljön?',
    options: ['7', '6', '8', '2'],
    correctAnswer: 0,
    explanation: '26 : 4 = 6 marad 2. A 2 gyereknek is kell csónak, ezért 6 + 1 = 7 csónak kell.'
  },
  {
    id: 'rdiv-q22',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    figure: <BraceletFig />,
    question: 'Karkötőket fűzöl. Egyhez 8 gyöngy kell. 45 gyöngyöd van. Hány karkötő lesz kész?',
    options: ['5 karkötő, marad 5 gyöngy', '6 karkötő, marad 3 gyöngy', '5 karkötő, marad 3 gyöngy', '4 karkötő, marad 13 gyöngy'],
    correctAnswer: 0,
    explanation: '5 · 8 = 40, és 45 − 40 = 5. 45 : 8 = 5 marad 5.'
  },
  {
    id: 'rdiv-q23',
    level: 3,
    questionTypeBadge: 'Hiányzó szám',
    question: 'Írd a □ helyére a lehető legnagyobb számot! □ · 4 + △ = 31',
    options: ['7', '8', '6', '27'],
    correctAnswer: 0,
    explanation: '7 · 4 = 28, és △ = 3. A 8 · 4 = 32 már több, mint 31.'
  },
  {
    id: 'rdiv-q24',
    level: 3,
    questionTypeBadge: 'Visszafelé',
    figure: <MysteryFig />,
    question: 'Melyik számot osztottuk el 7-tel?',
    options: ['38', '35', '15', '32'],
    correctAnswer: 0,
    explanation: 'Ellenőrzéssel: 5 · 7 + 3 = 35 + 3 = 38.'
  },
  {
    id: 'rdiv-q25',
    level: 3,
    questionTypeBadge: 'Pénz',
    figure: <MoneyFig />,
    question: 'Egy matrica 9 Ft. 50 Ft-od van. Hány matricát veszel, és mennyi pénzed marad?',
    options: ['5 matrica, marad 5 Ft', '6 matrica, marad 4 Ft', '5 matrica, marad 4 Ft', '4 matrica, marad 14 Ft'],
    correctAnswer: 0,
    explanation: '5 · 9 = 45, és 50 − 45 = 5. 50 : 9 = 5 marad 5.'
  },
  {
    id: 'rdiv-q26',
    level: 3,
    questionTypeBadge: 'Összehasonlítás',
    question: 'Melyik osztásnak nagyobb a maradéka: 39 : 5 vagy 39 : 6?',
    options: ['39 : 5, mert 4 > 3', '39 : 6, mert 3 > 4', 'Egyforma a maradékuk', '39 : 6, mert a 6 nagyobb'],
    correctAnswer: 0,
    explanation: '39 : 5 = 7 marad 4. 39 : 6 = 6 marad 3. A 4 a nagyobb.'
  },
  {
    id: 'rdiv-q27',
    level: 3,
    questionTypeBadge: 'Részekre osztás',
    figure: <MarblesFig />,
    question: '30 golyót 4 gyerek oszt el egyformán. Ami marad, visszakerül a dobozba. Hány golyó jut egy gyereknek?',
    options: ['7', '8', '2', '26'],
    correctAnswer: 0,
    explanation: '30 : 4 = 7 marad 2. Mindenki 7 golyót kap, 2 a dobozba kerül.'
  },
  {
    id: 'rdiv-q28',
    level: 3,
    questionTypeBadge: 'Maradék',
    question: 'Melyik számot osztva 9-cel marad 2?',
    options: ['29', '27', '30', '28'],
    correctAnswer: 0,
    explanation: '29 = 3 · 9 + 2. A 27-nél 0, a 30-nál 3, a 28-nál 1 marad.'
  },
  {
    id: 'rdiv-q29',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    figure: <LinesFig />,
    question: '31 gyerek 4 egyforma sorba áll. Aki nem fér be, leül a padra. Hányan ülnek a padon?',
    options: ['3', '7', '1', '4'],
    correctAnswer: 0,
    explanation: '31 : 4 = 7 marad 3. Minden sorban 7 gyerek áll, 3 gyerek ül a padon.'
  },
  {
    id: 'rdiv-q30',
    level: 3,
    questionTypeBadge: 'Két lépés',
    figure: <DonutFig />,
    question: 'Van 20 fánkod, és sütsz még 5-öt. Egy dobozba 6 fér. Hány tele doboz lesz?',
    options: ['4 tele doboz, marad 1 fánk', '3 tele doboz, marad 2 fánk', '5 tele doboz, marad 0 fánk', '4 tele doboz, marad 5 fánk'],
    correctAnswer: 0,
    explanation: '20 + 5 = 25 fánk. 25 : 6 = 4 marad 1, mert 4 · 6 + 1 = 25.'
  }
];

export const RemainderDivG3Quiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => {
  return (
    <QuizTemplate
      grade={3}
      chapterId="szamolas-100-ig"
      topicId="g3-c100-maradekos-quiz"
      subtopicId="maradekos-osztas"
      title="4. Maradékos osztás – Kvíz"
      subtitle="30 feladat 3 szinten: csoportosítás, maradékos osztás, ellenőrzés, szöveges feladatok."
      badge="3. OSZTÁLY • I. SZÁMOLÁS 0-TÓL 100-IG • KVÍZ"
      questions={REMAINDER_DIV_G3_QUESTIONS}
      cheatSheets={[
        {
          title: 'Így számolj',
          items: ['29 : 4 = ?', 'A 4-es sorban a 28 a legnagyobb, ami belefér: 7 · 4 = 28', '29 − 28 = 1', '29 : 4 = 7 marad 1']
        },
        {
          title: 'A maradék szabálya',
          items: ['A maradék mindig kisebb, mint az osztó.', '4-gyel osztva a maradék: 0, 1, 2 vagy 3.', 'Ha 0 marad, az osztás maradék nélküli.']
        },
        {
          title: 'Ellenőrzés',
          items: ['hányados · osztó + maradék = osztandó', '7 · 4 + 1 = 29', 'Hány csónak kell? Ha marad valaki, kell még egy!']
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <RemainderDivG3Matcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />
      }
      sorterComponent={
        <RemainderDivG3Sorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />
      }
    />
  );
};

export default RemainderDivG3Quiz;
