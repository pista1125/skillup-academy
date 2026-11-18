import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { Div5G2Matcher } from './Div5G2Matcher';
import { Div5G2Sorter } from './Div5G2Sorter';
import { DIV5_FONT, DIV5_UNK, HandG, CoinG, TokenG, JumpLineG, GroupedDotsG, PlateG, CookieG } from './Div5G2Parts';

// ---------------------------------------------------------------------------
// Kérdésábrák
// ---------------------------------------------------------------------------
const QFig: React.FC<{ children: React.ReactNode; h?: number }> = ({ children, h = 120 }) => (
  <svg
    viewBox={`0 0 260 ${h}`}
    className="w-full max-w-[280px] h-auto mx-auto"
    xmlns="http://www.w3.org/2000/svg"
    fontFamily={DIV5_FONT}
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

/** Kezek (max. 10). */
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

/** Pöttyök ötösével csoportosítva (teli ötösök karikában, maradék piros). */
const GroupedFig: React.FC<{ total: number; caption?: string; ring?: boolean }> = ({ total, caption, ring = true }) => {
  const slots = Math.ceil(total / 5);
  const rows = slots > 5 ? 2 : 1;
  const h = rows * 46 + (caption ? 34 : 14);
  return (
    <QFig h={h}>
      <GroupedDotsG x={15} y={7} total={total} cols={5} cellW={46} cellH={46} d={9} r={3.8} ring={ring} />
      {caption && <Caption y={h - 12}>{caption}</Caption>}
    </QFig>
  );
};

/** Pöttyök sorban, csoportosítás nélkül. */
const LooseDotsFig: React.FC<{ total: number; color?: string }> = ({ total, color = '#3b82f6' }) => {
  const perRow = 10;
  const rows = Math.ceil(total / perRow);
  return (
    <QFig h={rows * 22 + 20}>
      {Array.from({ length: total }, (_, i) => (
        <circle key={i} cx={34 + (i % perRow) * 21.5} cy={20 + Math.floor(i / perRow) * 22} r="7" fill={color} stroke="#1e3a8a" strokeWidth="1.2" />
      ))}
    </QFig>
  );
};

/** 5 tányér „?”-lel, fent a kekszek. */
const PlatesFig: React.FC<{ total: number }> = ({ total }) => {
  const perRow = 10;
  const rows = Math.ceil(total / perRow);
  const top = rows * 15 + 14;
  return (
    <QFig h={top + 52}>
      {Array.from({ length: total }, (_, i) => (
        <CookieG key={i} cx={40 + (i % perRow) * 20} cy={16 + Math.floor(i / perRow) * 15} r={6} />
      ))}
      {Array.from({ length: 5 }, (_, p) => (
        <g key={p}>
          <PlateG cx={34 + p * 48} cy={top + 26} rx={21} ry={9} />
          <text x={34 + p * 48} y={top + 22} textAnchor="middle" fontSize="15" fontWeight="900" fill={DIV5_UNK}>?</text>
        </g>
      ))}
    </QFig>
  );
};

/** „? darab 5 Ft-os = összeg”. */
const CoinTargetFig: React.FC<{ total: number }> = ({ total }) => (
  <QFig h={82}>
    <CoinG cx={50} cy={40} r={22} value={5} showFt />
    <text x="92" y="48" fontSize="22" fontWeight="900" fill="#0f172a">·</text>
    <text x="114" y="50" fontSize="26" fontWeight="900" fill={DIV5_UNK}>?</text>
    <text x="146" y="49" fontSize="22" fontWeight="900" fill="#0f172a">= {total} Ft</text>
  </QFig>
);

/** Érmék. */
const CoinsFig: React.FC<{ fives?: number; tens?: number; caption?: string }> = ({ fives = 0, tens = 0, caption }) => {
  const h = caption ? 104 : 80;
  const coins: number[] = [...Array(tens).fill(10), ...Array(fives).fill(5)];
  const gap = 30;
  const startX = 130 - ((coins.length - 1) * gap) / 2;
  return (
    <QFig h={h}>
      {coins.map((v, i) => (
        <CoinG key={i} cx={startX + i * gap} cy={40} r={v === 10 ? 14 : 12} value={v} />
      ))}
      {caption && <Caption y={h - 12}>{caption}</Caption>}
    </QFig>
  );
};

/** „ötöde” nyíl. */
const FifthFig: React.FC<{ from: number }> = ({ from }) => (
  <QFig h={90}>
    <circle cx="60" cy="50" r="24" fill="#dbeafe" stroke="#2563eb" strokeWidth="3" />
    <text x="60" y="58" textAnchor="middle" fontSize="22" fontWeight="900" fill="#1e3a8a">{from}</text>
    <path d="M 88 50 L 170 50" stroke="#dc2626" strokeWidth="3.5" />
    <path d="M 168 42 L 180 50 L 168 58 Z" fill="#dc2626" />
    <text x="130" y="38" textAnchor="middle" fontSize="15" fontWeight="900" fill="#b91c1c">ötöde</text>
    <rect x="186" y="30" width="40" height="40" rx="8" fill="#fff" stroke="#dc2626" strokeWidth="3" />
    <text x="206" y="58" textAnchor="middle" fontSize="22" fontWeight="900" fill={DIV5_UNK}>?</text>
  </QFig>
);

/** Kétsoros táblázat. */
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
            <text x={x + cw / 2} y="36" textAnchor="middle" fontSize="17" fontWeight="900" fill={a === '?' ? DIV5_UNK : '#0f172a'}>{a}</text>
            <text x={x + cw / 2} y="70" textAnchor="middle" fontSize="17" fontWeight="900" fill={b === '?' ? DIV5_UNK : '#0f172a'}>{b}</text>
          </g>
        );
      })}
    </QFig>
  );
};

/** Két kifejezés összehasonlítása. */
const CompareFig: React.FC<{ left: string; right: string }> = ({ left, right }) => (
  <QFig h={80}>
    <rect x="14" y="20" width="92" height="40" rx="10" fill="#fef3c7" stroke="#d97706" strokeWidth="2" />
    <text x="60" y="47" textAnchor="middle" fontSize="18" fontWeight="900" fill="#78350f">{left}</text>
    <circle cx="130" cy="40" r="17" fill="#fff" stroke={DIV5_UNK} strokeWidth="2.5" />
    <text x="130" y="47" textAnchor="middle" fontSize="18" fontWeight="900" fill={DIV5_UNK}>?</text>
    <rect x="154" y="20" width="92" height="40" rx="10" fill="#dbeafe" stroke="#2563eb" strokeWidth="2" />
    <text x="200" y="47" textAnchor="middle" fontSize="18" fontWeight="900" fill="#1e3a8a">{right}</text>
  </QFig>
);

/** Számegyenes visszafelé ugrásokkal. */
const BackJumpFig: React.FC<{ from: number }> = ({ from }) => (
  <QFig h={96}>
    <JumpLineG x0={16} y={56} width={220} jumps={from / 5} color="#7c3aed" labelEvery={10} fontSize={11} />
    <text x={16 + (from / 50) * 220} y="20" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#6d28d9">innen</text>
    <text x="130" y="90" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#475569">Hány ötös ugrás vezet a 0-ig?</text>
  </QFig>
);

/** Gyerekek (5) és matricák. */
const KidsFig: React.FC<{ total: number }> = ({ total }) => (
  <QFig h={110}>
    {Array.from({ length: total }, (_, i) => (
      <rect key={i} x={20 + (i % 15) * 15} y={10 + Math.floor(i / 15) * 14} width="10" height="10" rx="2" fill="#a78bfa" stroke="#5b21b6" strokeWidth="1" />
    ))}
    {Array.from({ length: 5 }, (_, k) => {
      const cx = 34 + k * 48;
      return (
        <g key={k}>
          <circle cx={cx} cy={66} r="9" fill="#fed7aa" stroke="#9a3412" strokeWidth="1.5" />
          <path d={`M ${cx - 13} 98 Q ${cx} 72 ${cx + 13} 98 Z`} fill={['#60a5fa', '#f472b6', '#34d399', '#fbbf24', '#f87171'][k]} />
          <text x={cx} y="70" textAnchor="middle" fontSize="10" fontWeight="900" fill={DIV5_UNK}>?</text>
        </g>
      );
    })}
  </QFig>
);

/** Szakaszos ábra: valami ötször annyi, mint a másik. */
const StripFig: React.FC<{ big: number; nameA: string; nameB: string }> = ({ big, nameA, nameB }) => (
  <QFig h={96}>
    <text x="14" y="34" fontSize="13" fontWeight="bold" fill="#334155">{nameA}</text>
    {Array.from({ length: 5 }, (_, i) => (
      <rect key={i} x={74 + i * 30} y="18" width="30" height="24" rx="4" fill="#fde68a" stroke="#b45309" strokeWidth="2" />
    ))}
    <text x="250" y="35" textAnchor="end" fontSize="13" fontWeight="900" fill="#78350f">{big}</text>
    <text x="14" y="74" fontSize="13" fontWeight="bold" fill="#334155">{nameB}</text>
    <rect x="74" y="58" width="30" height="24" rx="4" fill="#fee2e2" stroke={DIV5_UNK} strokeWidth="2" />
    <text x="89" y="75" textAnchor="middle" fontSize="15" fontWeight="900" fill={DIV5_UNK}>?</text>
  </QFig>
);

/** Padok 5 hellyel, a gyerekek sorban leülnek. */
const BenchFig: React.FC<{ kids: number; benches: number }> = ({ kids, benches }) => (
  <QFig h={112}>
    {Array.from({ length: benches }, (_, b) => {
      const x = 14 + (b % 4) * 60;
      const y = 22 + Math.floor(b / 4) * 42;
      return (
        <g key={b}>
          <rect x={x} y={y + 14} width="52" height="6" rx="2" fill="#a16207" />
          {Array.from({ length: 5 }, (_, s) => {
            const sitting = b * 5 + s < kids;
            return (
              <circle
                key={s}
                cx={x + 6 + s * 10}
                cy={y + 7}
                r="4.4"
                fill={sitting ? '#22c55e' : '#fff'}
                stroke={sitting ? '#166534' : '#94a3b8'}
                strokeWidth="1.5"
                strokeDasharray={sitting ? undefined : '2 2'}
              />
            );
          })}
        </g>
      );
    })}
  </QFig>
);

/** Zsetonok és körhinta-jegy. */
const TokensFig: React.FC<{ a: number; b: number }> = ({ a, b }) => (
  <QFig h={100}>
    <TokenG cx={50} cy={36} r={20} value={a} />
    <text x="50" y="76" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#4c1d95">Anna</text>
    <text x="84" y="43" fontSize="20" fontWeight="900" fill="#0f172a">+</text>
    <TokenG cx={118} cy={36} r={20} value={b} />
    <text x="118" y="76" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#4c1d95">Bori</text>
    <rect x="160" y="16" width="86" height="44" rx="8" fill="#fef9c3" stroke="#ca8a04" strokeWidth="2" strokeDasharray="5 3" />
    <text x="203" y="36" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#713f12">1 menet</text>
    <text x="203" y="53" textAnchor="middle" fontSize="15" fontWeight="900" fill="#713f12">5 zseton</text>
    <text x="203" y="84" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#475569">körhinta</text>
  </QFig>
);

// ---------------------------------------------------------------------------
// Kérdések
// ---------------------------------------------------------------------------
export const DIV5_G2_QUESTIONS: QuizQuestion[] = [
  // ---------------- 1. szint ----------------
  {
    id: 'div5g2-q1',
    level: 1,
    questionTypeBadge: 'Kezek',
    figure: <HandsFig n={4} caption="20 ujj" />,
    question: '20 ujjat látsz. Hány kéz ez?',
    options: ['4', '5', '15', '25'],
    correctAnswer: 0,
    explanation: 'Egy kézen 5 ujj van. Hány 5 van a 20-ban? 20 : 5 = 4 kéz.'
  },
  {
    id: 'div5g2-q2',
    level: 1,
    questionTypeBadge: 'Bennfoglalás',
    figure: <GroupedFig total={15} caption="15 : 5 = ?" />,
    question: 'Mennyi 15 : 5?',
    options: ['3', '10', '20', '5'],
    correctAnswer: 0,
    explanation: 'A 15 pöttyből 3 ötös csoport lett. 15 : 5 = 3, mert 3 · 5 = 15.'
  },
  {
    id: 'div5g2-q3',
    level: 1,
    questionTypeBadge: 'Szétosztás',
    figure: <PlatesFig total={20} />,
    question: '20 kekszet 5 tányérra osztunk igazságosan. Hány jut egy tányérra?',
    options: ['4', '5', '15', '25'],
    correctAnswer: 0,
    explanation: 'Minden körben mind az 5 tányér kap 1-et. 4 kör után elfogy: 20 : 5 = 4.'
  },
  {
    id: 'div5g2-q4',
    level: 1,
    questionTypeBadge: 'Osztótábla',
    question: 'Mennyi 35 : 5?',
    options: ['7', '30', '6', '8'],
    correctAnswer: 0,
    explanation: '7 · 5 = 35, ezért 35 : 5 = 7.'
  },
  {
    id: 'div5g2-q5',
    level: 1,
    questionTypeBadge: 'Pénz',
    figure: <CoinTargetFig total={25} />,
    question: 'Hány darab 5 Ft-os kell 25 Ft-hoz?',
    options: ['5', '20', '4', '6'],
    correctAnswer: 0,
    explanation: 'Ötösével: 5, 10, 15, 20, 25 – ez 5 érme. 25 : 5 = 5.'
  },
  {
    id: 'div5g2-q6',
    level: 1,
    questionTypeBadge: 'Osztótábla',
    question: 'Mennyi 50 : 5?',
    options: ['10', '45', '5', '9'],
    correctAnswer: 0,
    explanation: '10 · 5 = 50, ezért 50 : 5 = 10.'
  },
  {
    id: 'div5g2-q7',
    level: 1,
    questionTypeBadge: 'Önmagával',
    figure: <HandsFig n={1} caption="5 ujj" />,
    question: 'Mennyi 5 : 5?',
    options: ['1', '0', '5', '10'],
    correctAnswer: 0,
    explanation: '5 ujj pontosan 1 kéz. 5 : 5 = 1.'
  },
  {
    id: 'div5g2-q8',
    level: 1,
    questionTypeBadge: 'Szorzás és osztás',
    figure: <GroupedFig total={30} caption="6 · 5 = 30" />,
    question: 'Tudod, hogy 6 · 5 = 30. Melyik osztás igaz?',
    options: ['30 : 5 = 6', '30 : 5 = 5', '30 : 6 = 30', '6 : 5 = 30'],
    correctAnswer: 0,
    explanation: '6 csoport, mindegyikben 5. Ha a 30-at ötösével csoportosítod, 6 csoport lesz: 30 : 5 = 6.'
  },
  {
    id: 'div5g2-q9',
    level: 1,
    questionTypeBadge: 'Nulla',
    figure: <PlatesFig total={0} />,
    question: 'Nincs egy keksz sem. 5 tányérra osztjuk. Mennyi 0 : 5?',
    options: ['0', '5', '1', '50'],
    correctAnswer: 0,
    explanation: 'Ha nincs mit szétosztani, egyik tányérra sem jut semmi. 0 : 5 = 0.'
  },
  {
    id: 'div5g2-q10',
    level: 1,
    questionTypeBadge: 'Ötöde',
    figure: <FifthFig from={40} />,
    question: 'Mennyi a 40 ötöde?',
    options: ['8', '35', '45', '4'],
    correctAnswer: 0,
    explanation: 'Az ötöde azt jelenti: osszuk el 5-tel. 40 : 5 = 8, mert 8 · 5 = 40.'
  },

  // ---------------- 2. szint ----------------
  {
    id: 'div5g2-q11',
    level: 2,
    questionTypeBadge: 'Visszafelé ugrás',
    figure: <BackJumpFig from={45} />,
    question: 'Mennyi 45 : 5?',
    options: ['9', '40', '8', '50'],
    correctAnswer: 0,
    explanation: 'A 45-től ötösével visszafelé 9 ugrás a 0. 45 : 5 = 9.'
  },
  {
    id: 'div5g2-q12',
    level: 2,
    questionTypeBadge: 'Táblázat',
    figure: <TableFig top="tojás" bottom="doboz" cols={[['10', '2'], ['20', '4'], ['30', '?']]} />,
    question: 'Egy dobozba 5 tojás fér. Hány doboz kell 30 tojáshoz?',
    options: ['6', '25', '5', '35'],
    correctAnswer: 0,
    explanation: '30 : 5 = 6 doboz, mert 6 · 5 = 30.'
  },
  {
    id: 'div5g2-q13',
    level: 2,
    questionTypeBadge: 'Hiányzó szám',
    question: 'Melyik szám kerül a □ helyére? □ : 5 = 7',
    options: ['35', '12', '2', '30'],
    correctAnswer: 0,
    explanation: 'Melyik számban van meg 7-szer az 5? 7 · 5 = 35, tehát □ = 35.'
  },
  {
    id: 'div5g2-q14',
    level: 2,
    questionTypeBadge: 'Igaz vagy hamis',
    question: 'Melyik osztás helyes?',
    options: ['40 : 5 = 8', '40 : 5 = 6', '30 : 5 = 5', '35 : 5 = 8'],
    correctAnswer: 0,
    explanation: 'Ellenőrizd szorzással: 8 · 5 = 40, ez jó. A többi rossz: 6 · 5 csak 30, 5 · 5 csak 25, és 8 · 5 nem 35, hanem 40.'
  },
  {
    id: 'div5g2-q15',
    level: 2,
    questionTypeBadge: 'Összehasonlítás',
    figure: <CompareFig left="45 : 5" right="2 · 5" />,
    question: 'Melyik a nagyobb?',
    options: ['2 · 5', '45 : 5', 'Egyenlők', 'Nem lehet tudni'],
    correctAnswer: 0,
    explanation: '45 : 5 = 9 és 2 · 5 = 10. A 10 nagyobb, mint a 9.'
  },
  {
    id: 'div5g2-q16',
    level: 2,
    questionTypeBadge: 'Maradék',
    figure: <GroupedFig total={17} />,
    question: '17 pöttyöt ötösével csoportosítottunk. Hány teli csoport lett, és hány pötty maradt?',
    options: ['3 csoport, 2 maradt', '2 csoport, 7 maradt', '3 csoport, 3 maradt', '4 csoport, 0 maradt'],
    correctAnswer: 0,
    explanation: '3 karika van, mindegyikben 5: ez 15. A 17-ből még 2 maradt. 3 · 5 + 2 = 17.'
  },
  {
    id: 'div5g2-q17',
    level: 2,
    questionTypeBadge: 'Maradékos művelet',
    figure: <GroupedFig total={22} />,
    question: 'Melyik művelet illik a képhez?',
    options: ['4 · 5 + 2 = 22', '4 · 5 + 3 = 22', '3 · 5 + 2 = 22', '4 + 5 + 2 = 22'],
    correctAnswer: 0,
    explanation: '4 teli ötös: 4 · 5 = 20. Maradt 2. 20 + 2 = 22.'
  },
  {
    id: 'div5g2-q18',
    level: 2,
    questionTypeBadge: 'Vásárban',
    figure: <TableFig top="zsetonom" bottom="1 perec" cols={[['28', '5']]} />,
    question: '28 zsetonod van. Egy perec 5 zseton. Hány perecet veszel? Mennyi zseton marad?',
    options: ['5 perec, 3 marad', '4 perec, 8 marad', '6 perec, 2 marad', '5 perec, 2 marad'],
    correctAnswer: 0,
    explanation: '5 perec: 5 · 5 = 25 zseton. 28 − 25 = 3 marad. 6 perecre (30) már nem elég.'
  },
  {
    id: 'div5g2-q19',
    level: 2,
    questionTypeBadge: 'Mennyi a maradék?',
    figure: <GroupedFig total={34} />,
    question: 'Melyik szám kerül a ○ helyére? 6 · 5 + ○ = 34',
    options: ['4', '9', '6', '3'],
    correctAnswer: 0,
    explanation: '6 · 5 = 30. A 30-tól a 34-ig még 4 kell: ○ = 4.'
  },
  {
    id: 'div5g2-q20',
    level: 2,
    questionTypeBadge: 'Maradék szabály',
    question: 'Ötösével csoportosítasz. Melyik maradék NEM lehet?',
    options: ['5', '4', '3', '0'],
    correctAnswer: 0,
    explanation: 'Ha 5 maradna, abból még egy teli ötös lenne! A maradék mindig kisebb 5-nél: 0, 1, 2, 3 vagy 4.'
  },

  // ---------------- 3. szint ----------------
  {
    id: 'div5g2-q21',
    level: 3,
    questionTypeBadge: 'Szétosztás',
    figure: <KidsFig total={30} />,
    question: '5 gyerek 30 matricán osztozik igazságosan. Hány matricát kap egy gyerek?',
    options: ['6', '25', '35', '5'],
    correctAnswer: 0,
    explanation: '30 : 5 = 6. Ellenőrzés: 6 · 5 = 30.'
  },
  {
    id: 'div5g2-q22',
    level: 3,
    questionTypeBadge: 'Pénz',
    figure: <CoinTargetFig total={40} />,
    question: 'Zoli perselyében 40 Ft van, csupa 5 Ft-osban. Hány érme van benne?',
    options: ['8', '35', '45', '4'],
    correctAnswer: 0,
    explanation: '40 : 5 = 8 érme. (A 4 akkor lenne jó, ha 10 Ft-osok lennének.)'
  },
  {
    id: 'div5g2-q23',
    level: 3,
    questionTypeBadge: 'Csomagolás',
    figure: <LooseDotsFig total={47} color="#f97316" />,
    question: '47 ceruzát ötösével dobozba teszünk. Hány doboz lesz tele, és hány ceruza marad ki?',
    options: ['9 doboz, 2 marad', '8 doboz, 7 marad', '9 doboz, 3 marad', '10 doboz, 0 marad'],
    correctAnswer: 0,
    explanation: '9 · 5 = 45, és 45 + 2 = 47. Tehát 9 teli doboz, 2 ceruza kimarad. A 7 maradék nem lehet, mert az több 5-nél.'
  },
  {
    id: 'div5g2-q24',
    level: 3,
    questionTypeBadge: 'Két lépés',
    figure: <TokensFig a={20} b={15} />,
    question: 'Anna és Bori összeteszi a zsetonjait. Egy körhinta-menet 5 zseton. Hány menetre elég?',
    options: ['7', '35', '4', '3'],
    correctAnswer: 0,
    explanation: 'Előbb összeadunk: 20 + 15 = 35 zseton. Aztán osztunk: 35 : 5 = 7 menet.'
  },
  {
    id: 'div5g2-q25',
    level: 3,
    questionTypeBadge: 'Ötödrésze',
    figure: <StripFig big={35} nameA="kifli" nameB="zsemle" />,
    question: 'A pékségben 35 kifli van. Ez ötször annyi, mint a zsemle. Hány zsemle van?',
    options: ['7', '40', '30', '5'],
    correctAnswer: 0,
    explanation: 'A kifli ötször annyi, tehát a zsemle a 35 ötöde: 35 : 5 = 7.'
  },
  {
    id: 'div5g2-q26',
    level: 3,
    questionTypeBadge: 'Két művelet',
    question: 'Melyik szám kerül a □ helyére? □ = 50 : 5 + 5',
    options: ['15', '10', '5', '50'],
    correctAnswer: 0,
    explanation: 'Előbb az osztás: 50 : 5 = 10. Aztán hozzáadjuk az 5-öt: 10 + 5 = 15.'
  },
  {
    id: 'div5g2-q27',
    level: 3,
    questionTypeBadge: 'Legnagyobb szám',
    figure: <GroupedFig total={39} ring={false} />,
    question: 'Írd a □-be a lehető legnagyobb számot! 39 = □ · 5 + ○',
    options: ['7', '8', '6', '9'],
    correctAnswer: 0,
    explanation: '7 · 5 = 35, és 35 + 4 = 39. A 8 már túl sok: 8 · 5 = 40. A 6 is jó lenne, de az nem a legnagyobb.'
  },
  {
    id: 'div5g2-q28',
    level: 3,
    questionTypeBadge: 'Maradék a szövegben',
    figure: <BenchFig kids={32} benches={7} />,
    question: 'Egy padra 5 gyerek fér. 32 gyerek jön. Hány pad lesz tele? Hányan ülnek a következő padon?',
    options: ['6 pad, 2 gyerek', '5 pad, 7 gyerek', '6 pad, 3 gyerek', '7 pad, 2 gyerek'],
    correctAnswer: 0,
    explanation: '6 · 5 = 30 gyerek ül a 6 teli padon. 32 − 30 = 2 gyerek ül a 7. padon.'
  },
  {
    id: 'div5g2-q29',
    level: 3,
    questionTypeBadge: 'Gondolkodj!',
    figure: <GroupedFig total={22} caption="22 golyó" />,
    question: '22 golyót ötösével zacskóba teszünk. Hány zacskó kell, hogy MINDEN golyó bekerüljön?',
    options: ['5', '4', '2', '17'],
    correctAnswer: 0,
    explanation: '4 zacskó lesz tele (4 · 5 = 20). A maradék 2 golyónak is kell egy zacskó. Ez 4 + 1 = 5 zacskó.'
  },
  {
    id: 'div5g2-q30',
    level: 3,
    questionTypeBadge: '5 és 10',
    figure: <CoinsFig tens={3} caption="30 Ft" />,
    question: '30 Ft-ot akarsz kifizetni. Melyik igaz?',
    options: [
      '6 db 5 Ft-os vagy 3 db 10 Ft-os',
      '3 db 5 Ft-os vagy 6 db 10 Ft-os',
      '6 db 5 Ft-os vagy 6 db 10 Ft-os',
      '5 db 5 Ft-os vagy 3 db 10 Ft-os'
    ],
    correctAnswer: 0,
    explanation: '30 : 5 = 6 és 30 : 10 = 3. 5 Ft-osból kétszer annyi kell, mint 10 Ft-osból.'
  }
];

export const Div5G2Quiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => (
  <QuizTemplate
    grade={2}
    chapterId="osztas"
    topicId="g2-osztas-5-quiz"
    subtopicId="osztas-5-tel"
    title="4. Osztás 5-tel – Kvíz"
    subtitle="30 feladat 3 szinten: bennfoglalás és szétosztás 5-tel, ötöde, maradékos osztás, vásári szöveges feladatok."
    badge="2. OSZTÁLY • V. OSZTÁS • KVÍZ"
    questions={DIV5_G2_QUESTIONS}
    cheatSheets={[
      {
        title: 'Osztás 5-tel',
        items: ['5 : 5 = 1, 10 : 5 = 2, 15 : 5 = 3', '20 : 5 = 4, 25 : 5 = 5, 30 : 5 = 6', '35 : 5 = 7, 40 : 5 = 8', '45 : 5 = 9, 50 : 5 = 10']
      },
      {
        title: 'Szorzással ellenőrizz!',
        items: ['30 : 5 = 6, mert 6 · 5 = 30', 'A 30 ötöde: 30 : 5 = 6', '0 : 5 = 0', '25 Ft = 5 db 5 Ft-os']
      },
      {
        title: 'Maradékos osztás',
        items: ['23 = 4 · 5 + 3', 'Teli ötösök: □, maradék: ○', 'A maradék kisebb 5-nél', '0, 1, 2, 3 vagy 4 maradhat']
      }
    ]}
    onBack={onBack}
    onSwitchToTheory={onSwitchToTheory}
    onSwitchToMatcher={onSwitchToMatcher}
    onSwitchToSorter={onSwitchToSorter}
    initialGameMode={initialGameMode}
    matcherComponent={
      <Div5G2Matcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />
    }
    sorterComponent={
      <Div5G2Sorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />
    }
  />
);

export default Div5G2Quiz;
