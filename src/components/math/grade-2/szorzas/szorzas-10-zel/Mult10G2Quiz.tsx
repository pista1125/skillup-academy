import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { Mult10G2Matcher } from './Mult10G2Matcher';
import { Mult10G2Sorter } from './Mult10G2Sorter';
import { MULT10_FONT, MULT10_UNK, RodG, CoinG, EggBoxG, CrateG, HandG, JumpLineG } from './Mult10G2Parts';

// ---------------------------------------------------------------------------
// Kérdésábrák
// ---------------------------------------------------------------------------
const QFig: React.FC<{ children: React.ReactNode; h?: number }> = ({ children, h = 120 }) => (
  <svg viewBox={`0 0 260 ${h}`} className="w-full max-w-[280px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily={MULT10_FONT}>
    <rect x="1" y="1" width="258" height={h - 2} rx="12" fill="#f8fafc" stroke="#cbd5e1" />
    {children}
  </svg>
);

const Caption: React.FC<{ y: number; children: React.ReactNode; color?: string }> = ({ y, children, color = '#334155' }) => (
  <text x="130" y={y} textAnchor="middle" fontSize="14" fontWeight="900" fill={color}>
    {children}
  </text>
);

/** n tízesrúd egy sorban. */
const RodsFig: React.FC<{ n: number; caption?: string }> = ({ n, caption }) => {
  const gap = 20;
  const startX = 130 - ((n - 1) * gap) / 2 - 4;
  const h = caption ? 120 : 98;
  return (
    <QFig h={h}>
      {Array.from({ length: n }, (_, i) => (
        <RodG key={i} x={startX + i * gap} y={10} c={8} />
      ))}
      {caption && <Caption y={h - 12}>{caption}</Caption>}
    </QFig>
  );
};

/** 10 Ft-os és 5 Ft-os érmék. */
const CoinsFig: React.FC<{ tens?: number; fives?: number; caption?: string }> = ({ tens = 0, fives = 0, caption }) => {
  const coins: number[] = [...Array(tens).fill(10), ...Array(fives).fill(5)];
  const n = coins.length;
  const perRow = n > 7 ? Math.ceil(n / 2) : n;
  const rows = n > 7 ? 2 : 1;
  const gap = 32;
  const startX = 130 - ((perRow - 1) * gap) / 2;
  const h = (rows === 2 ? 84 : 66) + (caption ? 22 : 0);
  return (
    <QFig h={h}>
      {coins.map((v, i) => (
        <CoinG
          key={i}
          cx={startX + (i % perRow) * gap}
          cy={rows === 2 ? 24 + Math.floor(i / perRow) * 34 : 33}
          r={v === 10 ? 15 : 12}
          value={v}
        />
      ))}
      {caption && <Caption y={h - 10}>{caption}</Caption>}
    </QFig>
  );
};

/** Számegyenes 0–100, tízes ugrásokkal. */
const JumpFig: React.FC<{ jumps: number; endLabel?: string }> = ({ jumps, endLabel = '?' }) => (
  <QFig h={90}>
    <JumpLineG x0={14} y={52} width={222} jumps={jumps} endLabel={endLabel} labelEvery={20} fontSize={11} />
  </QFig>
);

/** Számsor dobozokban. */
const SeqFig: React.FC<{ items: string[] }> = ({ items }) => {
  const w = 42;
  const startX = 130 - (items.length * (w + 6) - 6) / 2;
  return (
    <QFig h={74}>
      {items.map((t, i) => (
        <g key={i}>
          <rect
            x={startX + i * (w + 6)}
            y="16"
            width={w}
            height="40"
            rx="9"
            fill={t === '?' ? '#fee2e2' : '#ccfbf1'}
            stroke={t === '?' ? MULT10_UNK : '#0d9488'}
            strokeWidth="2"
          />
          <text x={startX + i * (w + 6) + w / 2} y="44" textAnchor="middle" fontSize="19" fontWeight="900" fill={t === '?' ? MULT10_UNK : '#134e4a'}>
            {t}
          </text>
        </g>
      ))}
    </QFig>
  );
};

/** Tojástartók (max. 8) és opcionálisan néhány külön tojás. */
const EggsFig: React.FC<{ boxes: number; loose?: number; caption?: string }> = ({ boxes, loose = 0, caption }) => {
  const perRow = boxes > 4 ? Math.ceil(boxes / 2) : boxes;
  const rows = boxes > 4 ? 2 : 1;
  const bw = 52;
  const totalW = perRow * (bw + 6) + (loose ? 14 + Math.ceil(loose / 2) * 13 : 0);
  const startX = 130 - totalW / 2;
  const h = rows * 34 + 18 + (caption ? 22 : 0);
  return (
    <QFig h={h}>
      {Array.from({ length: boxes }, (_, i) => (
        <EggBoxG key={i} x={startX + (i % perRow) * (bw + 6)} y={12 + Math.floor(i / perRow) * 34} s={bw / 60} />
      ))}
      {Array.from({ length: loose }, (_, i) => (
        <ellipse
          key={i}
          cx={startX + perRow * (bw + 6) + 14 + Math.floor(i / 2) * 13}
          cy={20 + (i % 2) * 14}
          rx="5"
          ry="6"
          fill="#fffbeb"
          stroke="#a16207"
          strokeWidth="1.2"
        />
      ))}
      {caption && <Caption y={h - 10}>{caption}</Caption>}
    </QFig>
  );
};

/** Mérleg ládákkal (két oszlopban), opcionálisan egy 5 kg-os zsákkal. */
const ScaleFig: React.FC<{ crates: number; sack?: boolean }> = ({ crates, sack = false }) => {
  const cols = crates > 4 ? 2 : 1;
  const perCol = Math.ceil(crates / cols);
  const plateY = 112;
  const crateH = 22;
  const colX = cols === 2 ? [70, 132] : [100];
  return (
    <QFig h={150}>
      {/* mérleg */}
      <rect x="56" y={plateY} width={sack ? 170 : 150} height="8" rx="3" fill="#64748b" />
      <rect x="64" y={plateY + 8} width="10" height="14" fill="#475569" />
      <rect x={sack ? 208 : 188} y={plateY + 8} width="10" height="14" fill="#475569" />
      <rect x="10" y="20" width="40" height="26" rx="4" fill="#1e293b" />
      <text x="30" y="38" textAnchor="middle" fontSize="13" fontWeight="900" fill={MULT10_UNK}>
        ?
      </text>
      <line x1="30" y1="46" x2="60" y2={plateY} stroke="#475569" strokeWidth="3" />
      {Array.from({ length: crates }, (_, i) => {
        const c = Math.floor(i / perCol);
        const r = i % perCol;
        return <CrateG key={i} x={colX[c]} y={plateY - (r + 1) * crateH} s={1} />;
      })}
      {sack && (
        <g>
          <path d="M 196 112 Q 192 88 200 84 L 222 84 Q 230 88 226 112 Z" fill="#e7d3a8" stroke="#92400e" strokeWidth="1.8" />
          <text x="211" y="104" textAnchor="middle" fontSize="10" fontWeight="900" fill="#78350f">
            5 kg
          </text>
        </g>
      )}
      <text x="130" y="142" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#334155">
        Egy láda: 10 kg
      </text>
    </QFig>
  );
};

/** n kéz két sorban, gyerekenként párban. */
const HandsFig: React.FC<{ kids: number; caption?: string }> = ({ kids, caption }) => {
  const perRow = kids > 3 ? Math.ceil(kids / 2) : kids;
  const rows = kids > 3 ? 2 : 1;
  const pw = 70;
  const startX = 130 - (perRow * pw) / 2;
  const h = rows * 42 + 14 + (caption ? 22 : 0);
  return (
    <QFig h={h}>
      {Array.from({ length: kids }, (_, i) => {
        const x = startX + (i % perRow) * pw;
        const y = 10 + Math.floor(i / perRow) * 42;
        return (
          <g key={i}>
            <rect x={x + 3} y={y - 2} width={pw - 6} height="38" rx="8" fill="#fff7ed" stroke="#fdba74" strokeWidth="1.5" />
            <HandG x={x + 7} y={y + 2} s={1.1} flip />
            <HandG x={x + 35} y={y + 2} s={1.1} />
          </g>
        );
      })}
      {caption && <Caption y={h - 10}>{caption}</Caption>}
    </QFig>
  );
};

/** Táblázat: felső és alsó sor. */
const TableFig: React.FC<{ top: string; bottom: string; cols: [string, string][] }> = ({ top, bottom, cols }) => {
  const cw = 46;
  const lw = 66;
  const startX = 130 - (lw + cols.length * cw) / 2;
  return (
    <QFig h={100}>
      <rect x={startX} y="14" width={lw} height="34" fill="#ccfbf1" stroke="#0d9488" />
      <rect x={startX} y="48" width={lw} height="34" fill="#ccfbf1" stroke="#0d9488" />
      <text x={startX + lw / 2} y="36" textAnchor="middle" fontSize="12" fontWeight="900" fill="#134e4a">
        {top}
      </text>
      <text x={startX + lw / 2} y="70" textAnchor="middle" fontSize="12" fontWeight="900" fill="#134e4a">
        {bottom}
      </text>
      {cols.map(([a, b], i) => (
        <g key={i}>
          <rect x={startX + lw + i * cw} y="14" width={cw} height="34" fill="#fff" stroke="#0d9488" />
          <rect x={startX + lw + i * cw} y="48" width={cw} height="34" fill="#fff" stroke="#0d9488" />
          <text x={startX + lw + i * cw + cw / 2} y="38" textAnchor="middle" fontSize="17" fontWeight="900" fill={a === '?' ? MULT10_UNK : '#0f172a'}>
            {a}
          </text>
          <text x={startX + lw + i * cw + cw / 2} y="72" textAnchor="middle" fontSize="17" fontWeight="900" fill={b === '?' ? MULT10_UNK : '#0f172a'}>
            {b}
          </text>
        </g>
      ))}
    </QFig>
  );
};

/** Nyíl: szám → művelet → ? */
const ArrowFig: React.FC<{ from: string; op: string; to?: string }> = ({ from, op, to = '?' }) => (
  <QFig h={84}>
    <circle cx="50" cy="42" r="24" fill="#ccfbf1" stroke="#0d9488" strokeWidth="2.5" />
    <text x="50" y="50" textAnchor="middle" fontSize="22" fontWeight="900" fill="#134e4a">
      {from}
    </text>
    <line x1="80" y1="42" x2="172" y2="42" stroke="#0d9488" strokeWidth="3" />
    <path d="M 172 34 L 184 42 L 172 50 Z" fill="#0d9488" />
    <text x="128" y="32" textAnchor="middle" fontSize="16" fontWeight="900" fill="#0f766e">
      {op}
    </text>
    <circle cx="212" cy="42" r="24" fill="#fee2e2" stroke={MULT10_UNK} strokeWidth="2.5" />
    <text x="212" y="50" textAnchor="middle" fontSize="22" fontWeight="900" fill={MULT10_UNK}>
      {to}
    </text>
  </QFig>
);

/** a darab `from` érme = ? darab `to` érme. */
const CoinsEqFig: React.FC<{ n: number; from: number; to: number }> = ({ n, from, to }) => {
  const perRow = n > 5 ? Math.ceil(n / 2) : n;
  const rows = n > 5 ? 2 : 1;
  return (
    <QFig h={100}>
      {Array.from({ length: n }, (_, i) => (
        <CoinG
          key={i}
          cx={26 + (i % perRow) * 28}
          cy={rows === 2 ? 34 + Math.floor(i / perRow) * 30 : 48}
          r={from === 10 ? 13 : 12}
          value={from}
        />
      ))}
      <text x="26" y="92" fontSize="11" fontWeight="bold" fill="#334155">
        {n} db {from} Ft-os
      </text>
      <text x="168" y="58" textAnchor="middle" fontSize="28" fontWeight="900" fill="#0f172a">
        =
      </text>
      <text x="204" y="60" textAnchor="middle" fontSize="26" fontWeight="900" fill={MULT10_UNK}>
        ?
      </text>
      <CoinG cx={236} cy={50} r={from === 10 ? 12 : 15} value={to} />
      <text x="220" y="92" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#334155">
        db {to} Ft-os
      </text>
    </QFig>
  );
};

/** Két kártya összehasonlítása. */
const CompareFig: React.FC<{ left: string; right: string }> = ({ left, right }) => (
  <QFig h={80}>
    <rect x="14" y="16" width="96" height="46" rx="12" fill="#ccfbf1" stroke="#0d9488" strokeWidth="2" />
    <text x="62" y="46" textAnchor="middle" fontSize="17" fontWeight="900" fill="#134e4a">
      {left}
    </text>
    <circle cx="130" cy="39" r="15" fill="#fee2e2" stroke={MULT10_UNK} strokeWidth="2" />
    <text x="130" y="45" textAnchor="middle" fontSize="16" fontWeight="900" fill={MULT10_UNK}>
      ?
    </text>
    <rect x="150" y="16" width="96" height="46" rx="12" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
    <text x="198" y="46" textAnchor="middle" fontSize="17" fontWeight="900" fill="#78350f">
      {right}
    </text>
  </QFig>
);

/** Két gyerek érméi két sorban. */
const TwoPursesFig: React.FC = () => (
  <QFig h={110}>
    <text x="14" y="34" fontSize="12" fontWeight="900" fill="#0f766e">Pisti</text>
    {Array.from({ length: 7 }, (_, i) => (
      <CoinG key={i} cx={68 + i * 26} cy={30} r={12} value={10} />
    ))}
    <line x1="10" y1="54" x2="250" y2="54" stroke="#e2e8f0" strokeWidth="2" />
    <text x="14" y="82" fontSize="12" fontWeight="900" fill="#b45309">Zoli</text>
    {Array.from({ length: 9 }, (_, i) => (
      <CoinG key={i} cx={64 + i * 22} cy={78} r={10} value={5} />
    ))}
  </QFig>
);

/** n matricás csomag, mindegyiken 10. */
const PacksFig: React.FC<{ n: number; minus: number }> = ({ n, minus }) => (
  <QFig h={96}>
    {Array.from({ length: n }, (_, i) => (
      <g key={i}>
        <rect x={16 + i * 30} y="16" width="26" height="36" rx="5" fill="#ddd6fe" stroke="#6d28d9" strokeWidth="2" />
        <circle cx={29 + i * 30} cy="27" r="5" fill="#fbbf24" stroke="#b45309" />
        <text x={29 + i * 30} y="47" textAnchor="middle" fontSize="11" fontWeight="900" fill="#4c1d95">
          10
        </text>
      </g>
    ))}
    <text x={30 + n * 30} y="42" fontSize="18" fontWeight="900" fill={MULT10_UNK}>
      − {minus}
    </text>
    <Caption y={80}>{n} csomag, mindben 10 matrica</Caption>
  </QFig>
);

// ---------------------------------------------------------------------------
// Kérdések
// ---------------------------------------------------------------------------
export const MULT10_G2_QUESTIONS: QuizQuestion[] = [
  // ---------- 1. szint ----------
  {
    id: 'mult10g2-q1',
    level: 1,
    questionTypeBadge: 'Tízesrudak',
    figure: <RodsFig n={3} />,
    question: 'Minden rúdban 10 kocka van. Hány kocka van összesen?',
    options: ['30', '13', '3', '40'],
    correctAnswer: 0,
    explanation: 'Számolj tízesével: 10, 20, 30. 3 · 10 = 30.'
  },
  {
    id: 'mult10g2-q2',
    level: 1,
    questionTypeBadge: 'Melyik szorzás?',
    figure: <RodsFig n={5} caption="10 + 10 + 10 + 10 + 10" />,
    question: 'Melyik szorzás illik a képhez?',
    options: ['5 · 10', '10 · 10', '5 + 10', '4 · 10'],
    correctAnswer: 0,
    explanation: '5 rúd van, mindegyikben 10. Ötször 10: 5 · 10.'
  },
  {
    id: 'mult10g2-q3',
    level: 1,
    questionTypeBadge: 'Számegyenes',
    figure: <JumpFig jumps={7} />,
    question: 'Hová érkezel 7 tízes ugrással?',
    options: ['70', '17', '60', '7'],
    correctAnswer: 0,
    explanation: '10, 20, 30, 40, 50, 60, 70. 7 · 10 = 70.'
  },
  {
    id: 'mult10g2-q4',
    level: 1,
    questionTypeBadge: 'Pénz',
    figure: <CoinsFig tens={4} />,
    question: 'Mennyi pénz van itt?',
    options: ['40 Ft', '14 Ft', '4 Ft', '50 Ft'],
    correctAnswer: 0,
    explanation: '4 darab 10 Ft-os: 4 · 10 = 40 Ft.'
  },
  {
    id: 'mult10g2-q5',
    level: 1,
    questionTypeBadge: 'Tojástartó',
    figure: <EggsFig boxes={2} />,
    question: 'Egy tartóban 10 tojás van. Hány tojás van a 2 tartóban?',
    options: ['20', '12', '10', '22'],
    correctAnswer: 0,
    explanation: '2 · 10 = 20 tojás.'
  },
  {
    id: 'mult10g2-q6',
    level: 1,
    questionTypeBadge: 'Megfordítva',
    question: 'Mennyi 10 · 6?',
    options: ['60', '16', '106', '50'],
    correctAnswer: 0,
    explanation: '10 · 6 ugyanannyi, mint 6 · 10. Ez 6 tízes: 60.'
  },
  {
    id: 'mult10g2-q7',
    level: 1,
    questionTypeBadge: 'Ujjak',
    figure: <HandsFig kids={3} caption="3 gyerek" />,
    question: '3 gyerek felteszi mindkét kezét. Hány ujj van fent?',
    options: ['30', '60', '13', '15'],
    correctAnswer: 0,
    explanation: 'Egy gyereknek 10 ujja van. 3 · 10 = 30 ujj.'
  },
  {
    id: 'mult10g2-q8',
    level: 1,
    questionTypeBadge: 'Számsor',
    figure: <SeqFig items={['10', '20', '30', '?', '50']} />,
    question: 'Melyik szám hiányzik?',
    options: ['40', '35', '31', '60'],
    correctAnswer: 0,
    explanation: 'Tízesével lépünk: 30 után 40 jön.'
  },
  {
    id: 'mult10g2-q9',
    level: 1,
    questionTypeBadge: 'Nulla',
    question: 'Mennyi 0 · 10?',
    options: ['0', '10', '1', '100'],
    correctAnswer: 0,
    explanation: 'Nullaszor 10 az 0. Ha nincs tojástartó, tojás sincs.'
  },
  {
    id: 'mult10g2-q10',
    level: 1,
    questionTypeBadge: 'Mérleg',
    figure: <ScaleFig crates={4} />,
    question: 'Mennyit mutat a mérleg?',
    options: ['40 kg', '14 kg', '4 kg', '50 kg'],
    correctAnswer: 0,
    explanation: '4 láda van, mindegyik 10 kg. 4 · 10 = 40 kg.'
  },

  // ---------- 2. szint ----------
  {
    id: 'mult10g2-q11',
    level: 2,
    questionTypeBadge: 'Hány ugrás?',
    figure: <JumpFig jumps={5} endLabel="50" />,
    question: 'Hány tízes ugrás vezet az 50-ig? □ · 10 = 50',
    options: ['5', '50', '4', '6'],
    correctAnswer: 0,
    explanation: 'Számold meg az íveket: 5 ugrás. 5 · 10 = 50.'
  },
  {
    id: 'mult10g2-q12',
    level: 2,
    questionTypeBadge: 'Hány tízes?',
    question: 'Melyik szám kerül a □ helyére? 80 = □ · 10',
    options: ['8', '80', '18', '7'],
    correctAnswer: 0,
    explanation: 'A 80 éppen 8 tízes. 8 · 10 = 80.'
  },
  {
    id: 'mult10g2-q13',
    level: 2,
    questionTypeBadge: 'Mérleg',
    figure: <ScaleFig crates={8} />,
    question: 'Mennyit mutat a mérleg?',
    options: ['80 kg', '18 kg', '70 kg', '8 kg'],
    correctAnswer: 0,
    explanation: 'Két oszlopban 4 + 4 = 8 láda. 8 · 10 = 80 kg.'
  },
  {
    id: 'mult10g2-q14',
    level: 2,
    questionTypeBadge: 'Váltsd át!',
    figure: <CoinsEqFig n={6} from={5} to={10} />,
    question: '6 db 5 Ft-os helyett hány 10 Ft-ost kapsz? 6 · 5 = □ · 10',
    options: ['3', '6', '30', '12'],
    correctAnswer: 0,
    explanation: '6 · 5 = 30 Ft. 30 Ft = 3 · 10. Két 5 Ft-os ér egy 10 Ft-ost.'
  },
  {
    id: 'mult10g2-q15',
    level: 2,
    questionTypeBadge: 'Összehasonlítás',
    figure: <CompareFig left="4 · 10" right="8 · 5" />,
    question: 'Melyik igaz?',
    options: ['4 · 10 = 8 · 5', '4 · 10 > 8 · 5', '4 · 10 < 8 · 5', '4 · 10 = 4 · 5'],
    correctAnswer: 0,
    explanation: '4 · 10 = 40 és 8 · 5 = 40. Egyformák!'
  },
  {
    id: 'mult10g2-q16',
    level: 2,
    questionTypeBadge: 'Vegyes érmék',
    figure: <CoinsFig tens={5} fives={1} />,
    question: 'Mennyi pénz van itt?',
    options: ['55 Ft', '60 Ft', '15 Ft', '51 Ft'],
    correctAnswer: 0,
    explanation: '5 · 10 = 50 Ft, meg még 5 Ft. 50 + 5 = 55 Ft.'
  },
  {
    id: 'mult10g2-q17',
    level: 2,
    questionTypeBadge: 'Táblázat',
    figure: (
      <TableFig
        top="doboz"
        bottom="ceruza"
        cols={[
          ['1', '10'],
          ['4', '40'],
          ['7', '?']
        ]}
      />
    ),
    question: 'Minden dobozban 10 ceruza van. Hány ceruza van 7 dobozban?',
    options: ['70', '47', '17', '60'],
    correctAnswer: 0,
    explanation: 'A szabály: · 10. 7 · 10 = 70 ceruza.'
  },
  {
    id: 'mult10g2-q18',
    level: 2,
    questionTypeBadge: '10-es tábla',
    question: 'Melyik szám van benne a 10-es szorzótáblában?',
    options: ['60', '65', '16', '6'],
    correctAnswer: 0,
    explanation: 'A 10-es tábla számai 0-ra végződnek. 60 = 6 · 10.'
  },
  {
    id: 'mult10g2-q19',
    level: 2,
    questionTypeBadge: 'Tíz tízes',
    figure: <RodsFig n={10} />,
    question: 'Hány kocka van a 10 rúdban?',
    options: ['100', '20', '1010', '90'],
    correctAnswer: 0,
    explanation: '10 · 10 = 100. Tíz tízes az száz.'
  },
  {
    id: 'mult10g2-q20',
    level: 2,
    questionTypeBadge: 'Tízszerese',
    figure: <ArrowFig from="4" op="· 10" />,
    question: 'Mennyi a 4 tízszerese?',
    options: ['40', '14', '44', '4'],
    correctAnswer: 0,
    explanation: 'Tízszerese: szorozd 10-zel. 4 · 10 = 40.'
  },

  // ---------- 3. szint ----------
  {
    id: 'mult10g2-q21',
    level: 3,
    questionTypeBadge: 'Tojások',
    figure: <EggsFig boxes={3} loose={4} />,
    question: '3 tartó tele van, és van még 4 tojás. Hány tojás van összesen?',
    options: ['34', '37', '70', '30'],
    correctAnswer: 0,
    explanation: '3 · 10 = 30. 30 + 4 = 34 tojás.'
  },
  {
    id: 'mult10g2-q22',
    level: 3,
    questionTypeBadge: 'Persely',
    figure: <CoinsFig tens={6} caption="Anna perselye" />,
    question: 'Anna kivesz 2 érmét a perselyből. Mennyi pénz marad benne?',
    options: ['40 Ft', '58 Ft', '60 Ft', '4 Ft'],
    correctAnswer: 0,
    explanation: '6 − 2 = 4 érme marad. 4 · 10 = 40 Ft.'
  },
  {
    id: 'mult10g2-q23',
    level: 3,
    questionTypeBadge: 'Két lépés',
    question: 'Mennyi 8 · 10 − 30?',
    options: ['50', '78', '40', '60'],
    correctAnswer: 0,
    explanation: 'Előbb szorzunk: 8 · 10 = 80. Aztán 80 − 30 = 50.'
  },
  {
    id: 'mult10g2-q24',
    level: 3,
    questionTypeBadge: 'Vegyes érmék',
    figure: <CoinsFig tens={4} fives={4} />,
    question: 'Mennyi pénz ez összesen?',
    options: ['60 Ft', '45 Ft', '80 Ft', '8 Ft'],
    correctAnswer: 0,
    explanation: '4 · 10 = 40 Ft. 4 · 5 = 20 Ft. 40 + 20 = 60 Ft.'
  },
  {
    id: 'mult10g2-q25',
    level: 3,
    questionTypeBadge: 'Mennyivel több?',
    figure: <TwoPursesFig />,
    question: 'Mennyivel több pénze van Pistinek, mint Zolinak?',
    options: ['25 Ft', '2 Ft', '35 Ft', '20 Ft'],
    correctAnswer: 0,
    explanation: 'Pisti: 7 · 10 = 70 Ft. Zoli: 9 · 5 = 45 Ft. 70 − 45 = 25 Ft.'
  },
  {
    id: 'mult10g2-q26',
    level: 3,
    questionTypeBadge: 'Mérleg',
    figure: <ScaleFig crates={3} sack />,
    question: '3 láda és egy 5 kg-os zsák van a mérlegen. Mennyit mutat?',
    options: ['35 kg', '18 kg', '45 kg', '8 kg'],
    correctAnswer: 0,
    explanation: '3 · 10 = 30 kg. 30 + 5 = 35 kg.'
  },
  {
    id: 'mult10g2-q27',
    level: 3,
    questionTypeBadge: 'Matricák',
    figure: <PacksFig n={6} minus={5} />,
    question: 'Lili kapott 6 csomagot. 5 matricát elajándékoz. Hány marad?',
    options: ['55', '65', '50', '11'],
    correctAnswer: 0,
    explanation: '6 · 10 = 60 matrica. 60 − 5 = 55.'
  },
  {
    id: 'mult10g2-q28',
    level: 3,
    questionTypeBadge: 'Váltsd fel!',
    figure: <CoinsEqFig n={5} from={10} to={5} />,
    question: '5 db 10 Ft-ost felváltasz 5 Ft-osokra. Hányat kapsz? 5 · 10 = □ · 5',
    options: ['10', '2', '50', '5'],
    correctAnswer: 0,
    explanation: '5 · 10 = 50 Ft. 50 = 10 · 5. Egy 10 Ft-os helyett két 5 Ft-os jár.'
  },
  {
    id: 'mult10g2-q29',
    level: 3,
    questionTypeBadge: 'Szabály',
    figure: (
      <TableFig
        top="nap"
        bottom="tojás"
        cols={[
          ['2', '20'],
          ['5', '50'],
          ['?', '90']
        ]}
      />
    ),
    question: 'A tyúkok minden nap 10 tojást tojnak. Hány nap alatt lesz 90 tojás?',
    options: ['9', '80', '10', '8'],
    correctAnswer: 0,
    explanation: 'A szabály: · 10. 9 · 10 = 90, tehát 9 nap.'
  },
  {
    id: 'mult10g2-q30',
    level: 3,
    questionTypeBadge: 'Melyik több?',
    figure: <CompareFig left="3 · 10 + 5" right="4 · 10 − 5" />,
    question: 'Melyik a több?',
    options: ['Ugyanannyi', 'A bal oldali', 'A jobb oldali', 'A jobb oldali 10-zel'],
    correctAnswer: 0,
    explanation: 'Bal: 30 + 5 = 35. Jobb: 40 − 5 = 35. Ugyanannyi!'
  }
];

export const Mult10G2Quiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => (
  <QuizTemplate
    grade={2}
    chapterId="szorzas"
    topicId="g2-szorzas-10-quiz"
    subtopicId="szorzas-10-zel"
    title="9. Szorzás 10-zel – Kvíz"
    subtitle="30 feladat 3 szinten: tízesével számolás, 10-es szorzótábla, 5-ös és 10-es tábla, pénz és szöveges feladatok."
    badge="2. OSZTÁLY • IV. SZORZÁS • KVÍZ"
    questions={MULT10_G2_QUESTIONS}
    cheatSheets={[
      {
        title: 'A 10-es tábla',
        items: ['1 · 10 = 10, 2 · 10 = 20, 3 · 10 = 30', '4 · 10 = 40, 5 · 10 = 50, 6 · 10 = 60', '7 · 10 = 70, 8 · 10 = 80', '9 · 10 = 90, 10 · 10 = 100']
      },
      {
        title: 'Trükkök',
        items: ['A vége mindig 0', '7 · 10 = 7 tízes = 70', '10 · 7 = 7 · 10', '0 · 10 = 0']
      },
      {
        title: '5 és 10',
        items: ['1 · 10 = 2 · 5', '3 · 10 = 6 · 5', '1 db 10 Ft-os = 2 db 5 Ft-os', '1 db 50 Ft-os = 5 db 10 Ft-os']
      }
    ]}
    onBack={onBack}
    onSwitchToTheory={onSwitchToTheory}
    onSwitchToMatcher={onSwitchToMatcher}
    onSwitchToSorter={onSwitchToSorter}
    initialGameMode={initialGameMode}
    matcherComponent={
      <Mult10G2Matcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />
    }
    sorterComponent={
      <Mult10G2Sorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />
    }
  />
);

export default Mult10G2Quiz;
