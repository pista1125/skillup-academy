import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { Mult5G2Matcher } from './Mult5G2Matcher';
import { Mult5G2Sorter } from './Mult5G2Sorter';
import {
  MULT5_FONT,
  MULT5_UNK,
  HandG,
  CoinG,
  TokenG,
  FiveDotsG,
  JumpLineG,
  PretzelG,
  BalloonG,
  LollipopG
} from './Mult5G2Parts';

// ---------------------------------------------------------------------------
// Kérdésábrák
// ---------------------------------------------------------------------------
const QFig: React.FC<{ children: React.ReactNode; h?: number }> = ({ children, h = 120 }) => (
  <svg
    viewBox={`0 0 260 ${h}`}
    className="w-full max-w-[280px] h-auto mx-auto"
    xmlns="http://www.w3.org/2000/svg"
    fontFamily={MULT5_FONT}
  >
    <rect x="1" y="1" width="258" height={h - 2} rx="12" fill="#f8fafc" stroke="#cbd5e1" />
    {children}
  </svg>
);

const Caption: React.FC<{ y: number; children: React.ReactNode; color?: string }> = ({ y, children, color = '#334155' }) => (
  <text x="130" y={y} textAnchor="middle" fontSize="14" fontWeight="900" fill={color}>
    {children}
  </text>
);

/** n kéz (max. 10), két sorban. */
const HandsFig: React.FC<{ n: number; caption?: string }> = ({ n, caption }) => {
  const perRow = n > 5 ? 5 : n;
  const rows = Math.ceil(n / 5);
  const h = rows * 40 + (caption ? 34 : 14);
  const startX = 130 - (perRow * 44) / 2;
  return (
    <QFig h={h}>
      {Array.from({ length: n }, (_, i) => (
        <HandG key={i} x={startX + (i % 5) * 44 + 4} y={10 + Math.floor(i / 5) * 40} s={1.25} />
      ))}
      {caption && <Caption y={h - 12}>{caption}</Caption>}
    </QFig>
  );
};

/** g darab 5-ös pöttycsoport bekarikázva. */
const DotGroupsFig: React.FC<{ groups: number; caption?: string; color?: string }> = ({ groups, caption, color = '#f59e0b' }) => {
  const perRow = groups > 5 ? 5 : groups;
  const rows = Math.ceil(groups / 5);
  const h = rows * 46 + (caption ? 34 : 14);
  const startX = 130 - (perRow * 46) / 2;
  return (
    <QFig h={h}>
      {Array.from({ length: groups }, (_, i) => {
        const cx = startX + (i % 5) * 46 + 23;
        const cy = 30 + Math.floor(i / 5) * 46;
        return (
          <g key={i}>
            <circle cx={cx} cy={cy} r="19" fill="#fff" stroke="#94a3b8" strokeWidth="2" />
            <FiveDotsG cx={cx} cy={cy} d={8} r={3.6} fill={color} />
          </g>
        );
      })}
      {caption && <Caption y={h - 12}>{caption}</Caption>}
    </QFig>
  );
};

/** Érmék két csoportban (5 Ft-os és 10 Ft-os). */
const CoinsFig: React.FC<{ fives?: number; tens?: number; caption?: string }> = ({ fives = 0, tens = 0, caption }) => {
  const h = caption ? 104 : 80;
  const coins: number[] = [...Array(tens).fill(10), ...Array(fives).fill(5)];
  const n = coins.length;
  const perRow = n > 7 ? Math.ceil(n / 2) : n;
  const rows = n > 7 ? 2 : 1;
  const gap = 32;
  const startX = 130 - ((perRow - 1) * gap) / 2;
  return (
    <QFig h={h}>
      {coins.map((v, i) => (
        <CoinG
          key={i}
          cx={startX + (i % perRow) * gap}
          cy={rows === 2 ? 24 + Math.floor(i / perRow) * 32 : 40}
          r={v === 10 ? 15 : 13}
          value={v}
        />
      ))}
      {caption && <Caption y={h - 12}>{caption}</Caption>}
    </QFig>
  );
};

/** Számegyenes 0–50, ugrásokkal. */
const JumpFig: React.FC<{ jumps: number; step?: number; endLabel?: string }> = ({ jumps, step = 5, endLabel = '?' }) => (
  <QFig h={90}>
    <JumpLineG x0={16} y={52} width={220} jumps={jumps} step={step} endLabel={endLabel} labelEvery={10} fontSize={11} />
  </QFig>
);

/** Számsor dobozokban. */
const SeqFig: React.FC<{ items: string[] }> = ({ items }) => {
  const w = 46;
  const startX = 130 - (items.length * (w + 8) - 8) / 2;
  return (
    <QFig h={74}>
      {items.map((t, i) => (
        <g key={i}>
          <rect x={startX + i * (w + 8)} y="16" width={w} height="40" rx="9" fill={t === '?' ? '#fee2e2' : '#fef3c7'} stroke={t === '?' ? MULT5_UNK : '#d97706'} strokeWidth="2" />
          <text x={startX + i * (w + 8) + w / 2} y="44" textAnchor="middle" fontSize="20" fontWeight="900" fill={t === '?' ? MULT5_UNK : '#78350f'}>
            {t}
          </text>
        </g>
      ))}
    </QFig>
  );
};

/** Kétsoros táblázat (pl. doboz → ceruza). */
const TableFig: React.FC<{ top: string; bottom: string; cols: [string, string][] }> = ({ top, bottom, cols }) => {
  const head = 70;
  const cw = (240 - head) / cols.length;
  return (
    <QFig h={92}>
      <rect x="10" y="12" width="240" height="68" rx="6" fill="#fff" stroke="#94a3b8" strokeWidth="1.5" />
      <line x1="10" y1="46" x2="250" y2="46" stroke="#94a3b8" strokeWidth="1.5" />
      <rect x="10" y="12" width={head} height="68" rx="6" fill="#e0f2fe" />
      <text x={10 + head / 2} y="34" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#0c4a6e">{top}</text>
      <text x={10 + head / 2} y="68" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#0c4a6e">{bottom}</text>
      {cols.map(([a, b], i) => {
        const x = 10 + head + i * cw;
        return (
          <g key={i}>
            <line x1={x} y1="12" x2={x} y2="80" stroke="#94a3b8" strokeWidth="1.5" />
            <text x={x + cw / 2} y="36" textAnchor="middle" fontSize="17" fontWeight="900" fill={a === '?' ? MULT5_UNK : '#0f172a'}>{a}</text>
            <text x={x + cw / 2} y="70" textAnchor="middle" fontSize="17" fontWeight="900" fill={b === '?' ? MULT5_UNK : '#0f172a'}>{b}</text>
          </g>
        );
      })}
    </QFig>
  );
};

/** Vásári árucikkek árcédulával (zseton). */
const PriceFig: React.FC<{ items: { kind: 'pretzel' | 'balloon' | 'lollipop'; price: number; count: number }[] }> = ({ items }) => {
  const colW = 240 / items.length;
  return (
    <QFig h={112}>
      {items.map((it, k) => {
        const cx = 10 + colW * k + colW / 2;
        const Draw = it.kind === 'pretzel' ? PretzelG : it.kind === 'balloon' ? BalloonG : LollipopG;
        return (
          <g key={k}>
            <Draw x={cx - 30} y={14} s={1.2} />
            <TokenG cx={cx + 24} cy={30} r={13} value={it.price} />
            <text x={cx} y="78" textAnchor="middle" fontSize="15" fontWeight="900" fill="#4c1d95">
              {it.count} db
            </text>
            <text x={cx} y="98" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#6b21a8">
              1 db = {it.price} zseton
            </text>
          </g>
        );
      })}
    </QFig>
  );
};

/** Vonat: kocsik, kocsinként 5 utas. */
const TrainFig: React.FC<{ cars: number }> = ({ cars }) => (
  <QFig h={92}>
    <rect x="12" y="26" width="36" height="34" rx="6" fill="#ef4444" stroke="#7f1d1d" strokeWidth="2" />
    <rect x="20" y="14" width="10" height="14" fill="#7f1d1d" />
    {Array.from({ length: cars }, (_, i) => {
      const x = 54 + i * 48;
      return (
        <g key={i}>
          <rect x={x} y="24" width="42" height="36" rx="6" fill="#bfdbfe" stroke="#1d4ed8" strokeWidth="2" />
          <FiveDotsG cx={x + 21} cy={42} d={9} r={3.6} fill="#f97316" stroke="#9a3412" />
          <circle cx={x + 10} cy={64} r="5" fill="#334155" />
          <circle cx={x + 32} cy={64} r="5" fill="#334155" />
        </g>
      );
    })}
    <circle cx="22" cy="64" r="5" fill="#334155" />
    <circle cx="40" cy="64" r="5" fill="#334155" />
    <line x1="8" y1="70" x2="252" y2="70" stroke="#64748b" strokeWidth="2" />
    <text x="130" y="86" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#475569">● = 1 gyerek</text>
  </QFig>
);

/** Padok: mindegyiken 5 hely; a megadott számú hely üres. */
const BenchFig: React.FC<{ benches: number; empty: number }> = ({ benches, empty }) => {
  const total = benches * 5;
  return (
    <QFig h={112}>
      {Array.from({ length: benches }, (_, b) => {
        const col = b % 4;
        const row = Math.floor(b / 4);
        const x = 14 + col * 60;
        const y = 22 + row * 42;
        return (
          <g key={b}>
            <rect x={x} y={y + 14} width="52" height="6" rx="2" fill="#a16207" />
            {Array.from({ length: 5 }, (_, s) => {
              const idx = b * 5 + s;
              const isEmpty = idx >= total - empty;
              return (
                <circle
                  key={s}
                  cx={x + 6 + s * 10}
                  cy={y + 7}
                  r="4.4"
                  fill={isEmpty ? '#fff' : '#22c55e'}
                  stroke={isEmpty ? '#94a3b8' : '#166534'}
                  strokeWidth="1.5"
                  strokeDasharray={isEmpty ? '2 2' : undefined}
                />
              );
            })}
          </g>
        );
      })}
    </QFig>
  );
};

/** Szakaszos ábra: egy rész és ötször annyi. */
const StripFig: React.FC<{ part: string; times: number; nameA: string; nameB: string }> = ({ part, times, nameA, nameB }) => (
  <QFig h={96}>
    <text x="14" y="34" fontSize="13" fontWeight="bold" fill="#334155">{nameA}</text>
    <rect x="66" y="18" width="34" height="24" rx="4" fill="#fde68a" stroke="#b45309" strokeWidth="2" />
    <text x="83" y="35" textAnchor="middle" fontSize="13" fontWeight="900" fill="#78350f">{part}</text>
    <text x="14" y="74" fontSize="13" fontWeight="bold" fill="#334155">{nameB}</text>
    {Array.from({ length: times }, (_, i) => (
      <g key={i}>
        <rect x={66 + i * 34} y="58" width="34" height="24" rx="4" fill="#fde68a" stroke="#b45309" strokeWidth="2" />
        <text x={83 + i * 34} y="75" textAnchor="middle" fontSize="13" fontWeight="900" fill="#78350f">{part}</text>
      </g>
    ))}
    <text x={70 + times * 34} y="76" fontSize="18" fontWeight="900" fill={MULT5_UNK}>?</text>
  </QFig>
);

/** Két persely: napok · forint. */
const PiggyFig: React.FC = () => (
  <QFig h={110}>
    {[
      { x: 66, label: 'Peti', days: 4, coin: 10, color: '#fbcfe8' },
      { x: 194, label: 'Öccse', days: 8, coin: 5, color: '#bae6fd' }
    ].map((p) => (
      <g key={p.label}>
        <ellipse cx={p.x} cy="44" rx="34" ry="24" fill={p.color} stroke="#475569" strokeWidth="2" />
        <rect x={p.x - 10} y="20" width="20" height="4" rx="2" fill="#475569" />
        <circle cx={p.x + 18} cy="38" r="2.5" fill="#334155" />
        <CoinG cx={p.x - 14} cy={46} r={12} value={p.coin} />
        <text x={p.x} y="86" textAnchor="middle" fontSize="13" fontWeight="900" fill="#0f172a">{p.label}</text>
        <text x={p.x} y="102" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#475569">
          {p.days} nap, naponta {p.coin} Ft
        </text>
      </g>
    ))}
  </QFig>
);

/** Ötágú csillagok. */
const StarsFig: React.FC<{ a: number; b: number }> = ({ a, b }) => {
  const star = (cx: number, cy: number, fill: string, key: string) => {
    const pts = Array.from({ length: 10 }, (_, i) => {
      const r = i % 2 === 0 ? 13 : 5.5;
      const ang = -Math.PI / 2 + (i * Math.PI) / 5;
      return `${(cx + r * Math.cos(ang)).toFixed(1)},${(cy + r * Math.sin(ang)).toFixed(1)}`;
    }).join(' ');
    return <polygon key={key} points={pts} fill={fill} stroke="#a16207" strokeWidth="1.5" />;
  };
  return (
    <QFig h={84}>
      {Array.from({ length: a }, (_, i) => star(22 + i * 26, 34, '#fde047', `a${i}`))}
      <text x={22 + a * 26 - 6} y="40" fontSize="18" fontWeight="900" fill="#0f172a">+</text>
      {Array.from({ length: b }, (_, i) => star(22 + (a + 1) * 26 + i * 26, 34, '#fdba74', `b${i}`))}
      <text x="130" y="72" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#475569">Minden csillagnak 5 ága van.</text>
    </QFig>
  );
};

/** 5-ös és 10-es ugrások egy számegyenesen. */
const TwoLinesFig: React.FC<{ mark: number }> = ({ mark }) => (
  <QFig h={110}>
    <JumpLineG x0={16} y={56} width={220} jumps={mark / 5} step={5} color="#f97316" labelEvery={10} fontSize={11} />
    <JumpLineG x0={16} y={56} width={220} jumps={mark / 10} step={10} color="#2563eb" labelEvery={0} arcUp={false} />
    <circle cx={16 + (mark / 50) * 220} cy={56} r="7" fill="none" stroke="#16a34a" strokeWidth="2.5" />
    <text x="16" y="20" fontSize="11" fontWeight="bold" fill="#c2410c">ötösével</text>
    <text x="16" y="102" fontSize="11" fontWeight="bold" fill="#1d4ed8">tízesével: hány ugrás?</text>
  </QFig>
);

/** Két érmecsoport egymás mellett, összehasonlításhoz. */
const CompareCoinsFig: React.FC<{ fives: number; tens: number }> = ({ fives, tens }) => (
  <QFig h={104}>
    {Array.from({ length: fives }, (_, i) => (
      <CoinG key={`f${i}`} cx={22 + (i % 4) * 26} cy={28 + Math.floor(i / 4) * 28} r={11} value={5} />
    ))}
    <text x="130" y="52" textAnchor="middle" fontSize="22" fontWeight="900" fill={MULT5_UNK}>?</text>
    {Array.from({ length: tens }, (_, i) => (
      <CoinG key={`t${i}`} cx={168 + (i % 3) * 32} cy={42} r={14} value={10} />
    ))}
    <text x="62" y="96" textAnchor="middle" fontSize="12" fontWeight="900" fill="#92400e">{fives} · 5</text>
    <text x="200" y="96" textAnchor="middle" fontSize="12" fontWeight="900" fill="#334155">{tens} · 10</text>
  </QFig>
);

/** Végződések: páros szorzók szorzatai. */
const EndingsFig: React.FC = () => (
  <QFig h={100}>
    {['2 · 5 = 1', '4 · 5 = 2', '6 · 5 = 3', '8 · 5 = 4'].map((t, i) => (
      <text key={i} x={i < 2 ? 70 : 190} y={i % 2 === 0 ? 38 : 72} textAnchor="middle" fontSize="16" fontWeight="900" fill="#0f172a">
        {t}
        <tspan fill={MULT5_UNK}>?</tspan>
      </text>
    ))}
  </QFig>
);

/** Hiányzó tag: érmék + ? = összeg. */
const CoinsPlusFig: React.FC<{ fives: number; total: number }> = ({ fives, total }) => (
  <QFig h={84}>
    {Array.from({ length: fives }, (_, i) => (
      <CoinG key={i} cx={26 + i * 30} cy={38} r={13} value={5} />
    ))}
    <text x={26 + fives * 30} y="45" fontSize="20" fontWeight="900" fill="#0f172a">+</text>
    <rect x={44 + fives * 30} y="22" width="34" height="32" rx="6" fill="#fee2e2" stroke={MULT5_UNK} strokeWidth="2" />
    <text x={61 + fives * 30} y="45" textAnchor="middle" fontSize="20" fontWeight="900" fill={MULT5_UNK}>?</text>
    <text x={90 + fives * 30} y="45" fontSize="18" fontWeight="900" fill="#0f172a">= {total} Ft</text>
  </QFig>
);

// ---------------------------------------------------------------------------
// Kérdések
// ---------------------------------------------------------------------------
export const MULT5_G2_QUESTIONS: QuizQuestion[] = [
  // ---------------- 1. szint ----------------
  {
    id: 'mult5g2-q1',
    level: 1,
    questionTypeBadge: 'Kezek, ujjak',
    figure: <HandsFig n={3} />,
    question: 'Hány ujj van 3 kézen?',
    options: ['15', '8', '20', '10'],
    correctAnswer: 0,
    explanation: 'Egy kézen 5 ujj van. Ötösével: 5, 10, 15. Tehát 3 · 5 = 15.'
  },
  {
    id: 'mult5g2-q2',
    level: 1,
    questionTypeBadge: 'Összeadásból szorzás',
    figure: <DotGroupsFig groups={4} caption="5 + 5 + 5 + 5" />,
    question: 'Melyik szorzás ugyanez: 5 + 5 + 5 + 5?',
    options: ['4 · 5', '5 · 5', '4 + 5', '3 · 5'],
    correctAnswer: 0,
    explanation: 'Négyszer adtuk össze az 5-öt. Ez 4 · 5 = 20.'
  },
  {
    id: 'mult5g2-q3',
    level: 1,
    questionTypeBadge: 'Ugrások',
    figure: <JumpFig jumps={6} />,
    question: 'Mennyi 6 · 5?',
    options: ['30', '11', '35', '25'],
    correctAnswer: 0,
    explanation: '6 ugrás ötösével: 5, 10, 15, 20, 25, 30. Tehát 6 · 5 = 30.'
  },
  {
    id: 'mult5g2-q4',
    level: 1,
    questionTypeBadge: 'Pénz',
    figure: <CoinsFig fives={2} />,
    question: 'Mennyi pénz ez összesen?',
    options: ['10 Ft', '7 Ft', '5 Ft', '15 Ft'],
    correctAnswer: 0,
    explanation: 'Két 5 Ft-os érme: 2 · 5 = 10 Ft.'
  },
  {
    id: 'mult5g2-q5',
    level: 1,
    questionTypeBadge: 'Szorzótábla',
    question: 'Mennyi 8 · 5?',
    options: ['40', '45', '35', '13'],
    correctAnswer: 0,
    explanation: 'Ötösével 8-at lépünk: 5, 10, 15, 20, 25, 30, 35, 40. A 8 · 5 = 40.'
  },
  {
    id: 'mult5g2-q6',
    level: 1,
    questionTypeBadge: 'Számegyenes',
    figure: <JumpFig jumps={5} />,
    question: 'A nyuszi ötösével ugrál. Hová ér 5 ugrással?',
    options: ['25', '20', '30', '10'],
    correctAnswer: 0,
    explanation: '5, 10, 15, 20, 25. Öt ugrás után a 25-nél van: 5 · 5 = 25.'
  },
  {
    id: 'mult5g2-q7',
    level: 1,
    questionTypeBadge: 'Ötösével számolás',
    figure: <SeqFig items={['15', '20', '25', '?']} />,
    question: 'Melyik szám jön ezután?',
    options: ['30', '26', '35', '40'],
    correctAnswer: 0,
    explanation: 'Mindig 5-tel több: 25 + 5 = 30.'
  },
  {
    id: 'mult5g2-q8',
    level: 1,
    questionTypeBadge: 'Tíz kéz',
    figure: <HandsFig n={10} />,
    question: 'Hány ujj van 10 kézen?',
    options: ['50', '15', '45', '100'],
    correctAnswer: 0,
    explanation: '10 · 5 = 50. Két sor kéz: egy sorban 25 ujj, 25 + 25 = 50.'
  },
  {
    id: 'mult5g2-q9',
    level: 1,
    questionTypeBadge: 'Nullával',
    question: 'Mennyi 0 · 5?',
    options: ['0', '5', '1', '50'],
    correctAnswer: 0,
    explanation: 'Nulla darab ötös: nincs semmi. 0 · 5 = 0.'
  },
  {
    id: 'mult5g2-q10',
    level: 1,
    questionTypeBadge: 'Benne van?',
    question: 'Melyik szám van benne az 5-ös szorzótáblában?',
    options: ['35', '32', '27', '44'],
    correctAnswer: 0,
    explanation: 'Az 5-ös tábla számai 0-ra vagy 5-re végződnek. A 35 = 7 · 5.'
  },

  // ---------------- 2. szint ----------------
  {
    id: 'mult5g2-q11',
    level: 2,
    questionTypeBadge: 'Pénz',
    figure: <CoinsFig fives={7} />,
    question: 'Hány forint ez a 7 darab 5 Ft-os?',
    options: ['35 Ft', '12 Ft', '30 Ft', '40 Ft'],
    correctAnswer: 0,
    explanation: '7 · 5 = 35. Ötösével: 5, 10, 15, 20, 25, 30, 35 Ft.'
  },
  {
    id: 'mult5g2-q12',
    level: 2,
    questionTypeBadge: 'Hiányzó szám',
    figure: <JumpFig jumps={9} endLabel="45" />,
    question: 'Melyik szám kerül a □ helyére? □ · 5 = 45',
    options: ['9', '8', '40', '5'],
    correctAnswer: 0,
    explanation: 'Számold meg az ugrásokat a 45-ig: 9 ugrás. Tehát 9 · 5 = 45.'
  },
  {
    id: 'mult5g2-q13',
    level: 2,
    questionTypeBadge: 'Végződés',
    figure: <EndingsFig />,
    question: 'Páros számot szorzol 5-tel. Mire végződik a szorzat?',
    options: ['0-ra', '5-re', '2-re', 'Bármire'],
    correctAnswer: 0,
    explanation: '2 · 5 = 10, 4 · 5 = 20, 6 · 5 = 30, 8 · 5 = 40. Mind 0-ra végződik.'
  },
  {
    id: 'mult5g2-q14',
    level: 2,
    questionTypeBadge: '5-ös és 10-es',
    figure: <TwoLinesFig mark={30} />,
    question: 'Melyik szám kerül a □ helyére? 6 · 5 = □ · 10',
    options: ['3', '6', '12', '30'],
    correctAnswer: 0,
    explanation: '6 · 5 = 30. A 30-hoz tízesével 3 ugrás kell: 3 · 10 = 30.'
  },
  {
    id: 'mult5g2-q15',
    level: 2,
    questionTypeBadge: 'Igaz állítás',
    figure: <CoinsFig fives={4} tens={2} />,
    question: 'Melyik igaz?',
    options: ['4 · 5 = 2 · 10', '4 · 5 = 4 · 10', '3 · 5 = 3 · 10', '5 · 5 = 10 · 10'],
    correctAnswer: 0,
    explanation: '4 · 5 = 20 és 2 · 10 = 20. Két ötös ér egy tízest.'
  },
  {
    id: 'mult5g2-q16',
    level: 2,
    questionTypeBadge: 'Táblázat',
    figure: <TableFig top="doboz" bottom="ceruza" cols={[['1', '5'], ['2', '10'], ['3', '15'], ['4', '?']]} />,
    question: 'Egy dobozban 5 ceruza van. Hány ceruza van 4 dobozban?',
    options: ['20', '9', '25', '15'],
    correctAnswer: 0,
    explanation: 'Dobozonként 5-tel több: 15 + 5 = 20. Vagy: 4 · 5 = 20.'
  },
  {
    id: 'mult5g2-q17',
    level: 2,
    questionTypeBadge: 'Összehasonlítás',
    figure: <CompareCoinsFig fives={7} tens={3} />,
    question: 'Melyik ér többet?',
    options: ['7 · 5', '3 · 10', 'Egyenlők', 'Nem lehet tudni'],
    correctAnswer: 0,
    explanation: '7 · 5 = 35 és 3 · 10 = 30. A 35 több, mint a 30.'
  },
  {
    id: 'mult5g2-q18',
    level: 2,
    questionTypeBadge: 'Többszörös',
    question: 'Melyik szám van benne az 5-ös táblában, de a 10-esben nincs?',
    options: ['25', '20', '40', '24'],
    correctAnswer: 0,
    explanation: 'A 25 = 5 · 5, és 5-re végződik, ezért a 10-es táblában nincs. A 20 és a 40 mindkettőben benne van, a 24 egyikben sincs.'
  },
  {
    id: 'mult5g2-q19',
    level: 2,
    questionTypeBadge: 'Csoportok',
    figure: <DotGroupsFig groups={9} color="#ec4899" />,
    question: 'Minden karikában 5 cukor van. Hány cukor van összesen?',
    options: ['45', '40', '14', '50'],
    correctAnswer: 0,
    explanation: '9 karika, mindegyikben 5: 9 · 5 = 45.'
  },
  {
    id: 'mult5g2-q20',
    level: 2,
    questionTypeBadge: 'Szomszéd szorzat',
    figure: <HandsFig n={9} caption="9 kéz = 10 kéz − 1 kéz" />,
    question: 'Melyik szám kerül a □ helyére? 9 · 5 = 50 − □',
    options: ['5', '1', '10', '9'],
    correctAnswer: 0,
    explanation: '9 kéz eggyel kevesebb, mint 10 kéz. Egy kéz 5 ujj: 50 − 5 = 45.'
  },

  // ---------------- 3. szint ----------------
  {
    id: 'mult5g2-q21',
    level: 3,
    questionTypeBadge: 'Vásárban',
    figure: <PriceFig items={[{ kind: 'pretzel', price: 5, count: 6 }]} />,
    question: 'Egy perec 5 zseton. Lili 6 perecet vesz. Hány zsetont fizet?',
    options: ['30', '11', '35', '25'],
    correctAnswer: 0,
    explanation: '6 perec, mindegyik 5 zseton: 6 · 5 = 30 zseton.'
  },
  {
    id: 'mult5g2-q22',
    level: 3,
    questionTypeBadge: 'Kisvonat',
    figure: <TrainFig cars={4} />,
    question: 'A kisvonatnak 4 kocsija van. Minden kocsiban 5 gyerek ül. Hány gyerek utazik?',
    options: ['20', '9', '25', '16'],
    correctAnswer: 0,
    explanation: '4 kocsi, mindegyikben 5 gyerek: 4 · 5 = 20 gyerek.'
  },
  {
    id: 'mult5g2-q23',
    level: 3,
    questionTypeBadge: 'Pénz két lépésben',
    figure: <CoinsFig tens={3} fives={2} />,
    question: 'Bence ezeket az érméket találta. Hány forintja van?',
    options: ['40 Ft', '35 Ft', '5 Ft', '50 Ft'],
    correctAnswer: 0,
    explanation: '3 · 10 = 30 Ft és 2 · 5 = 10 Ft. Együtt 30 + 10 = 40 Ft.'
  },
  {
    id: 'mult5g2-q24',
    level: 3,
    questionTypeBadge: 'Ötször annyi',
    figure: <StripFig part="5" times={5} nameA="Dóri" nameB="Zsófi" />,
    question: 'Dóri 5 matricát kapott. Zsófi ötször annyit. Hány matricát kapott Zsófi?',
    options: ['25', '10', '20', '30'],
    correctAnswer: 0,
    explanation: 'Ötször annyi: 5 · 5 = 25 matrica. (A 10 az lenne, ha csak 5-tel többet kapott volna.)'
  },
  {
    id: 'mult5g2-q25',
    level: 3,
    questionTypeBadge: 'Két lépés',
    figure: <BenchFig benches={7} empty={3} />,
    question: 'Egy padon 5 hely van. 7 pad van, és 3 hely üres. Hány gyerek ül a padokon?',
    options: ['32', '35', '38', '15'],
    correctAnswer: 0,
    explanation: 'Összes hely: 7 · 5 = 35. Ebből 3 üres: 35 − 3 = 32 gyerek.'
  },
  {
    id: 'mult5g2-q26',
    level: 3,
    questionTypeBadge: 'Persely',
    figure: <PiggyFig />,
    question: 'Peti 4 napig tett naponta 10 Ft-ot a perselybe. Az öccse 8 napig naponta 5 Ft-ot. Ki gyűjtött többet?',
    options: ['Ugyanannyit gyűjtöttek', 'Peti', 'Az öccse', 'Nem lehet tudni'],
    correctAnswer: 0,
    explanation: 'Peti: 4 · 10 = 40 Ft. Az öccse: 8 · 5 = 40 Ft. Egyforma!'
  },
  {
    id: 'mult5g2-q27',
    level: 3,
    questionTypeBadge: 'Csillagok',
    figure: <StarsFig a={6} b={2} />,
    question: 'Az asztalon 6 csillag van, és még 2 kerül melléjük. Hány ága van az összes csillagnak?',
    options: ['40', '32', '30', '13'],
    correctAnswer: 0,
    explanation: '6 + 2 = 8 csillag. 8 · 5 = 40 ág.'
  },
  {
    id: 'mult5g2-q28',
    level: 3,
    questionTypeBadge: 'Mennyi hiányzik?',
    figure: <CoinsPlusFig fives={3} total={20} />,
    question: 'Melyik szám kerül a □ helyére? 3 · 5 + □ = 20',
    options: ['5', '15', '2', '17'],
    correctAnswer: 0,
    explanation: '3 · 5 = 15. A 15-höz 5 kell, hogy 20 legyen.'
  },
  {
    id: 'mult5g2-q29',
    level: 3,
    questionTypeBadge: 'Szabály',
    figure: <TableFig top="doboz" bottom="tojás" cols={[['2', '10'], ['5', '25'], ['?', '40']]} />,
    question: 'Minden dobozban ugyanannyi tojás van. Hány doboz kell 40 tojáshoz?',
    options: ['8', '35', '9', '7'],
    correctAnswer: 0,
    explanation: 'A szabály: · 5. 2 · 5 = 10, 5 · 5 = 25, és 8 · 5 = 40.'
  },
  {
    id: 'mult5g2-q30',
    level: 3,
    questionTypeBadge: 'Bevásárlás',
    figure: (
      <PriceFig
        items={[
          { kind: 'balloon', price: 10, count: 2 },
          { kind: 'lollipop', price: 5, count: 3 }
        ]}
      />
    ),
    question: 'Anna 2 lufit és 3 nyalókát vesz. Hány zsetont fizet?',
    options: ['35', '25', '30', '50'],
    correctAnswer: 0,
    explanation: 'Lufik: 2 · 10 = 20. Nyalókák: 3 · 5 = 15. Együtt 20 + 15 = 35 zseton.'
  }
];

export const Mult5G2Quiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => (
  <QuizTemplate
    grade={2}
    chapterId="szorzas"
    topicId="g2-szorzas-5-quiz"
    subtopicId="szorzas-5-tel"
    title="4. Szorzás 5-tel – Kvíz"
    subtitle="30 feladat 3 szinten: ötösével számolás, 5-ös szorzótábla, 5-ös és 10-es tábla, vásári szöveges feladatok."
    badge="2. OSZTÁLY • IV. SZORZÁS • KVÍZ"
    questions={MULT5_G2_QUESTIONS}
    cheatSheets={[
      {
        title: 'Az 5-ös tábla',
        items: ['1 · 5 = 5, 2 · 5 = 10, 3 · 5 = 15', '4 · 5 = 20, 5 · 5 = 25, 6 · 5 = 30', '7 · 5 = 35, 8 · 5 = 40', '9 · 5 = 45, 10 · 5 = 50']
      },
      {
        title: 'Trükkök',
        items: ['A vége mindig 0 vagy 5', 'Páros · 5 → 0 a vége', 'Páratlan · 5 → 5 a vége', '9 · 5 = 50 − 5 = 45']
      },
      {
        title: '5 és 10',
        items: ['2 · 5 = 1 · 10', '6 · 5 = 3 · 10', '2 db 5 Ft-os = 1 db 10 Ft-os', 'Ötször annyi: · 5']
      }
    ]}
    onBack={onBack}
    onSwitchToTheory={onSwitchToTheory}
    onSwitchToMatcher={onSwitchToMatcher}
    onSwitchToSorter={onSwitchToSorter}
    initialGameMode={initialGameMode}
    matcherComponent={
      <Mult5G2Matcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />
    }
    sorterComponent={
      <Mult5G2Sorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />
    }
  />
);

export default Mult5G2Quiz;
