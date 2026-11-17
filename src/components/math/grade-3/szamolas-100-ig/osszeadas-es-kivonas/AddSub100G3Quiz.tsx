import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { AddSub100G3Matcher } from './AddSub100G3Matcher';
import { AddSub100G3Sorter } from './AddSub100G3Sorter';
import { Coin, JumpLine, Jump, FONT, UNK } from './AddSub100G3Parts';

// ---------------------------------------------------------------------------
// Kérdésábrák
// ---------------------------------------------------------------------------
const CLS = 'w-full max-w-[280px] h-auto mx-auto';

const QFig: React.FC<{ children: React.ReactNode; h?: number }> = ({ children, h = 150 }) => (
  <svg viewBox={`0 0 240 ${h}`} className={CLS} xmlns="http://www.w3.org/2000/svg" fontFamily={FONT}>
    <rect x="1" y="1" width="238" height={h - 2} rx="10" fill="#f8fafc" stroke="#cbd5e1" />
    {children}
  </svg>
);

const Jumps: React.FC<{ lo: number; hi: number; start: number; jumps: Jump[]; minus?: boolean }> = ({ lo, hi, start, jumps, minus }) => (
  <JumpLine lo={lo} hi={hi} start={start} jumps={jumps} hideEnd W={240} H={110} className={CLS} color={minus ? '#ea580c' : '#16a34a'} />
);

/** Két csoport 10 forintos. */
const TensCoinsFig: React.FC<{ a: number; b: number }> = ({ a, b }) => {
  const r = 11;
  const g = 2 * r + 3;
  const wA = a * g;
  const wB = b * g;
  const x0 = (240 - (wA + wB + 26)) / 2 + r;
  return (
    <QFig h={70}>
      {Array.from({ length: a }, (_, i) => (
        <Coin key={`a${i}`} cx={x0 + i * g} cy={35} v={10} r={r} />
      ))}
      <text x={x0 + wA - r + 13} y="41" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#334155">+</text>
      {Array.from({ length: b }, (_, i) => (
        <Coin key={`b${i}`} cx={x0 + wA + 26 + i * g} cy={35} v={10} r={r} />
      ))}
    </QFig>
  );
};

/** Egyenlet nagy betűkkel; a kiemelt rész alá nyíl. */
const EqFig: React.FC<{ parts: string[]; mark?: number; note?: string }> = ({ parts, mark, note }) => {
  const step = 200 / parts.length;
  const x = (i: number) => 20 + step * i + step / 2;
  return (
    <QFig h={note || mark !== undefined ? 96 : 66}>
      {parts.map((p, i) => (
        <text key={i} x={x(i)} y="42" textAnchor="middle" fontSize="24" fontWeight="bold" fill={i === mark ? UNK : p === '□' ? '#2563eb' : '#1e293b'}>{p}</text>
      ))}
      {mark !== undefined && (
        <g>
          <line x1={x(mark)} y1="52" x2={x(mark)} y2="72" stroke={UNK} strokeWidth="2" />
          <path d={`M ${x(mark) - 5} 58 L ${x(mark)} 51 L ${x(mark) + 5} 58`} fill="none" stroke={UNK} strokeWidth="2" />
          <text x={x(mark)} y="88" textAnchor="middle" fontSize="13" fontWeight="bold" fill={UNK}>?</text>
        </g>
      )}
      {note && mark === undefined && <text x="120" y="80" textAnchor="middle" fontSize="11.5" fill="#475569">{note}</text>}
    </QFig>
  );
};

/** Egész és részei csíkkal: total = known + ? */
const BarFig: React.FC<{ total: string; known: number; totalVal: number; unknownLeft?: boolean }> = ({ total, known, totalVal, unknownLeft }) => {
  const W = 200;
  const kw = Math.max(30, Math.round((W * known) / totalVal));
  const uw = W - kw;
  const x0 = 20;
  const kx = unknownLeft ? x0 + uw : x0;
  const ux = unknownLeft ? x0 : x0 + kw;
  return (
    <QFig h={96}>
      <text x="120" y="20" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0c4a6e">{total}</text>
      <path d={`M ${x0} 32 L ${x0} 26 L ${x0 + W} 26 L ${x0 + W} 32`} fill="none" stroke="#0c4a6e" strokeWidth="1.5" />
      <rect x={kx} y="40" width={kw} height="30" fill="#38bdf8" stroke="#0369a1" />
      <rect x={ux} y="40" width={uw} height="30" fill="#fee2e2" stroke={UNK} />
      <text x={kx + kw / 2} y="60" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#0c4a6e">{known}</text>
      <text x={ux + uw / 2} y="61" textAnchor="middle" fontSize="17" fontWeight="bold" fill={UNK}>?</text>
      <text x="120" y="88" textAnchor="middle" fontSize="10.5" fill="#475569">A két rész együtt adja az egészet.</text>
    </QFig>
  );
};

/** Sorozat dobozokban. */
const SeqFig: React.FC<{ items: string[] }> = ({ items }) => {
  const n = items.length;
  const w = 34;
  const gap = 6;
  const x0 = (240 - (n * w + (n - 1) * gap)) / 2;
  return (
    <QFig h={66}>
      {items.map((t, i) => (
        <g key={i}>
          <rect x={x0 + i * (w + gap)} y="16" width={w} height="34" rx="7" fill={t === '?' ? '#fee2e2' : '#ecfdf5'} stroke={t === '?' ? UNK : '#10b981'} strokeWidth="1.5" />
          <text x={x0 + i * (w + gap) + w / 2} y="39" textAnchor="middle" fontSize="15" fontWeight="bold" fill={t === '?' ? UNK : '#065f46'}>{t}</text>
        </g>
      ))}
    </QFig>
  );
};

/** Kétszintes számpiramis: a felső tégla = az alsó kettő összege. */
const PyramidFig: React.FC<{ top: string; left: string; right: string }> = ({ top, left, right }) => {
  const cell = (x: number, y: number, t: string) => (
    <g>
      <rect x={x} y={y} width="64" height="34" fill={t === '?' ? '#fee2e2' : '#fef3c7'} stroke={t === '?' ? UNK : '#d97706'} strokeWidth="1.5" />
      <text x={x + 32} y={y + 23} textAnchor="middle" fontSize="16" fontWeight="bold" fill={t === '?' ? UNK : '#78350f'}>{t}</text>
    </g>
  );
  return (
    <QFig h={104}>
      {cell(88, 14, top)}
      {cell(56, 48, left)}
      {cell(120, 48, right)}
      <text x="120" y="98" textAnchor="middle" fontSize="10.5" fill="#475569">A felső = a két alsó összege.</text>
    </QFig>
  );
};

/** Árcédulás tárgyak. */
const PriceFig: React.FC<{ items: { name: string; price: number; color: string }[]; wallet?: number }> = ({ items, wallet }) => (
  <QFig h={110}>
    {items.map((it, i) => {
      const cx = wallet ? 50 + i * 70 : 70 + i * 100;
      return (
        <g key={i}>
          {it.name === 'ceruza' ? (
            <g>
              <rect x={cx - 30} y="30" width="52" height="12" fill={it.color} stroke="#334155" />
              <path d={`M ${cx + 22} 30 L ${cx + 34} 36 L ${cx + 22} 42 Z`} fill="#fde68a" stroke="#334155" />
            </g>
          ) : it.name === 'radír' ? (
            <rect x={cx - 20} y="26" width="40" height="20" rx="4" fill={it.color} stroke="#334155" />
          ) : (
            <rect x={cx - 18} y="20" width="36" height="30" rx="3" fill={it.color} stroke="#334155" />
          )}
          <rect x={cx - 26} y="58" width="52" height="22" rx="5" fill="#fff" stroke="#475569" />
          <text x={cx} y="74" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0f172a">{it.price} Ft</text>
          <text x={cx} y="98" textAnchor="middle" fontSize="11" fill="#475569">{it.name}</text>
        </g>
      );
    })}
    {wallet && (
      <g>
        <Coin cx={192} cy={42} v={wallet} r={20} />
        <text x="192" y="98" textAnchor="middle" fontSize="10" fill="#475569">ennyi pénzed van</text>
      </g>
    )}
  </QFig>
);

/** Busz: kezdő utasszám, majd le- és felszállók. */
const BusFig: React.FC = () => (
  <QFig h={110}>
    <rect x="30" y="22" width="150" height="56" rx="10" fill="#fbbf24" stroke="#92400e" strokeWidth="2" />
    {[0, 1, 2, 3].map((i) => (
      <rect key={i} x={42 + i * 33} y="32" width="26" height="20" rx="3" fill="#e0f2fe" stroke="#92400e" />
    ))}
    <circle cx="62" cy="80" r="10" fill="#334155" />
    <circle cx="150" cy="80" r="10" fill="#334155" />
    <text x="105" y="71" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#78350f">45 utas</text>
    <text x="212" y="42" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#dc2626">−18</text>
    <text x="212" y="62" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#16a34a">+9</text>
    <text x="120" y="104" textAnchor="middle" fontSize="11" fill="#475569">leszálltak 18-an, felszálltak 9-en</text>
  </QFig>
);

/** Kétkarú mérleg egyensúlyban. */
const BalanceFig: React.FC<{ left: string; right: string }> = ({ left, right }) => (
  <QFig h={120}>
    <path d="M 120 34 L 108 104 L 132 104 Z" fill="#94a3b8" stroke="#475569" />
    <rect x="96" y="102" width="48" height="8" rx="2" fill="#64748b" />
    <line x1="30" y1="34" x2="210" y2="34" stroke="#475569" strokeWidth="4" />
    <circle cx="120" cy="34" r="5" fill="#475569" />
    <line x1="58" y1="34" x2="58" y2="52" stroke="#475569" />
    <line x1="182" y1="34" x2="182" y2="52" stroke="#475569" />
    <path d="M 18 52 L 98 52 L 88 66 L 28 66 Z" fill="#e2e8f0" stroke="#475569" />
    <path d="M 142 52 L 222 52 L 212 66 L 152 66 Z" fill="#e2e8f0" stroke="#475569" />
    <text x="58" y="24" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#1e293b">{left}</text>
    <text x="182" y="24" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#1e293b">{right}</text>
    <text x="58" y="86" textAnchor="middle" fontSize="10.5" fill="#475569">bal oldal</text>
    <text x="182" y="86" textAnchor="middle" fontSize="10.5" fill="#475569">jobb oldal</text>
  </QFig>
);

/** Két gyűjtemény oszlopa (több / együtt). */
const CompareBarsFig: React.FC = () => (
  <QFig h={104}>
    <text x="40" y="34" textAnchor="end" fontSize="12" fontWeight="bold" fill="#334155">Lili</text>
    <rect x="48" y="20" width="81" height="20" fill="#f9a8d4" stroke="#9d174d" />
    <text x="88" y="35" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#831843">27</text>
    <text x="40" y="70" textAnchor="end" fontSize="12" fontWeight="bold" fill="#334155">Bence</text>
    <rect x="48" y="56" width="81" height="20" fill="#93c5fd" stroke="#1e3a8a" />
    <text x="88" y="71" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1e3a8a">27</text>
    <rect x="129" y="56" width="45" height="20" fill="#bbf7d0" stroke="#166534" />
    <text x="151" y="71" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#166534">+15</text>
    <text x="120" y="96" textAnchor="middle" fontSize="10.5" fill="#475569">Együtt hány matrica?</text>
  </QFig>
);

/** Gyöngyös doboz – kezdő mennyiség és elhasznált részek. */
const BeadsFig: React.FC = () => (
  <QFig h={100}>
    <rect x="20" y="16" width="90" height="56" rx="8" fill="#ede9fe" stroke="#6d28d9" strokeWidth="1.5" />
    {Array.from({ length: 24 }, (_, i) => (
      <circle key={i} cx={32 + (i % 8) * 10} cy={30 + Math.floor(i / 8) * 13} r="4" fill={['#f472b6', '#60a5fa', '#facc15', '#34d399'][i % 4]} />
    ))}
    <text x="65" y="88" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#4c1d95">100 gyöngy</text>
    <text x="172" y="38" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#dc2626">Anna: −35</text>
    <text x="172" y="62" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#dc2626">Peti: −28</text>
  </QFig>
);

// ---------------------------------------------------------------------------
// Kérdések
// ---------------------------------------------------------------------------
export const ADD_SUB_100_G3_QUESTIONS: QuizQuestion[] = [
  // ---------------- 1. szint ----------------
  {
    id: 'as100g3-q1',
    level: 1,
    questionTypeBadge: 'Kerek tízesek',
    figure: <TensCoinsFig a={3} b={5} />,
    question: '30 + 50 = ?',
    options: ['80', '70', '90', '35'],
    correctAnswer: 0,
    explanation: '3 tízes + 5 tízes = 8 tízes. 30 + 50 = 80.'
  },
  {
    id: 'as100g3-q2',
    level: 1,
    questionTypeBadge: 'Kerek tízesek',
    question: '90 − 40 = ?',
    options: ['50', '60', '40', '130'],
    correctAnswer: 0,
    explanation: '9 − 4 = 5, ezért 9 tízes − 4 tízes = 5 tízes = 50.'
  },
  {
    id: 'as100g3-q3',
    level: 1,
    questionTypeBadge: 'Összeadás',
    figure: <Jumps lo={30} hi={42} start={34} jumps={[{ to: 39, label: '+5' }]} />,
    question: '34 + 5 = ?',
    options: ['39', '84', '38', '29'],
    correctAnswer: 0,
    explanation: 'Itt nincs tízesátlépés: 4 + 5 = 9. Így 34 + 5 = 39.'
  },
  {
    id: 'as100g3-q4',
    level: 1,
    questionTypeBadge: 'Kivonás',
    question: '67 − 4 = ?',
    options: ['63', '27', '64', '71'],
    correctAnswer: 0,
    explanation: 'Az egyesekből vesszük el: 7 − 4 = 3. Így 67 − 4 = 63.'
  },
  {
    id: 'as100g3-q5',
    level: 1,
    questionTypeBadge: 'Műveletek neve',
    figure: <EqFig parts={['59', '−', '24', '=', '35']} mark={2} />,
    question: 'Mi a neve a nyíllal jelölt számnak?',
    options: ['kivonandó', 'kisebbítendő', 'különbség', 'összeg'],
    correctAnswer: 0,
    explanation: '59 a kisebbítendő, 24 a kivonandó, 35 a különbség.'
  },
  {
    id: 'as100g3-q6',
    level: 1,
    questionTypeBadge: 'Felcserélés',
    question: 'Melyik ugyanannyi, mint 26 + 53?',
    options: ['53 + 26', '53 − 26', '62 + 35', '26 − 53'],
    correctAnswer: 0,
    explanation: 'Az összeadásban a tagok felcserélhetők: 26 + 53 = 53 + 26 = 79.'
  },
  {
    id: 'as100g3-q7',
    level: 1,
    questionTypeBadge: 'Tízesátlépés',
    figure: <Jumps lo={25} hi={37} start={28} jumps={[{ to: 30, label: '+2' }, { to: 34, label: '+4' }]} />,
    question: '28 + 6 = ?',
    options: ['34', '24', '33', '44'],
    correctAnswer: 0,
    explanation: 'Előbb a 30-ig: 28 + 2 = 30. A 6-ból még 4 maradt: 30 + 4 = 34.'
  },
  {
    id: 'as100g3-q8',
    level: 1,
    questionTypeBadge: 'Tízesátlépés',
    figure: <Jumps lo={35} hi={46} start={43} jumps={[{ to: 40, label: '−3' }, { to: 38, label: '−2' }]} minus />,
    question: '43 − 5 = ?',
    options: ['38', '42', '48', '37'],
    correctAnswer: 0,
    explanation: 'Előbb a 40-ig: 43 − 3 = 40. Az 5-ből még 2 maradt: 40 − 2 = 38.'
  },
  {
    id: 'as100g3-q9',
    level: 1,
    questionTypeBadge: 'Pótlás 100-ra',
    figure: <BarFig total="100" known={70} totalVal={100} />,
    question: '70 + □ = 100. Melyik szám kerül a □ helyére?',
    options: ['30', '40', '20', '170'],
    correctAnswer: 0,
    explanation: '7 tízes + 3 tízes = 10 tízes = 100. Tehát □ = 30.'
  },
  {
    id: 'as100g3-q10',
    level: 1,
    questionTypeBadge: 'Sorozat',
    figure: <SeqFig items={['25', '35', '45', '55', '?']} />,
    question: 'Mi a következő szám a sorban?',
    options: ['65', '56', '60', '75'],
    correctAnswer: 0,
    explanation: 'Mindig 10-zel több: 55 + 10 = 65.'
  },

  // ---------------- 2. szint ----------------
  {
    id: 'as100g3-q11',
    level: 2,
    questionTypeBadge: 'Kétjegyű összeadás',
    figure: <Jumps lo={35} hi={86} start={38} jumps={[{ to: 78, label: '+40' }, { to: 83, label: '+5' }]} />,
    question: '38 + 45 = ?',
    options: ['83', '73', '82', '93'],
    correctAnswer: 0,
    explanation: 'Előbb a tízesek: 38 + 40 = 78. Aztán az egyesek: 78 + 5 = 83. (Ha 73 jött ki, elfelejtetted a tízesátlépést.)'
  },
  {
    id: 'as100g3-q12',
    level: 2,
    questionTypeBadge: 'Kétjegyű kivonás',
    figure: <Jumps lo={50} hi={87} start={84} jumps={[{ to: 64, label: '−20' }, { to: 55, label: '−9' }]} minus />,
    question: '84 − 29 = ?',
    options: ['55', '65', '56', '45'],
    correctAnswer: 0,
    explanation: 'Előbb 84 − 20 = 64. Aztán 64 − 9: 64 − 4 = 60, 60 − 5 = 55.'
  },
  {
    id: 'as100g3-q13',
    level: 2,
    questionTypeBadge: 'Ellenőrzés',
    figure: <EqFig parts={['82', '−', '36', '=', '46']} note="Hogyan ellenőrzöd?" />,
    question: 'Melyik művelettel ellenőrizheted ezt a kivonást?',
    options: ['46 + 36 = 82', '46 − 36 = 10', '36 + 10 = 46', '82 − 6 = 76'],
    correctAnswer: 0,
    explanation: 'A különbséghez add hozzá a kivonandót! Ha a kisebbítendőt kapod, jó: 46 + 36 = 82.'
  },
  {
    id: 'as100g3-q14',
    level: 2,
    questionTypeBadge: 'Hiányzó szám',
    figure: <BarFig total="61" known={25} totalVal={61} unknownLeft />,
    question: '□ + 25 = 61. Melyik szám kerül a □ helyére?',
    options: ['36', '86', '44', '46'],
    correctAnswer: 0,
    explanation: 'Az egészből vedd el az ismert részt: 61 − 25 = 36. Ellenőrzés: 36 + 25 = 61.'
  },
  {
    id: 'as100g3-q15',
    level: 2,
    questionTypeBadge: 'Pótlás 100-ra',
    figure: <BarFig total="100" known={63} totalVal={100} />,
    question: '63 + □ = 100. Melyik szám kerül a □ helyére?',
    options: ['37', '47', '43', '27'],
    correctAnswer: 0,
    explanation: '63 + 7 = 70, aztán 70 + 30 = 100. Összesen 7 + 30 = 37.'
  },
  {
    id: 'as100g3-q16',
    level: 2,
    questionTypeBadge: 'Pénz',
    figure: <PriceFig items={[{ name: 'ceruza', price: 45, color: '#60a5fa' }, { name: 'radír', price: 30, color: '#f472b6' }]} />,
    question: 'Mennyit fizetsz a ceruzáért és a radírért együtt?',
    options: ['75 Ft', '15 Ft', '85 Ft', '70 Ft'],
    correctAnswer: 0,
    explanation: '45 + 30: a tízesek 4 + 3 = 7, az egyes 5 marad. 45 + 30 = 75 Ft.'
  },
  {
    id: 'as100g3-q17',
    level: 2,
    questionTypeBadge: 'Sorozat',
    figure: <SeqFig items={['15', '22', '29', '36', '?']} />,
    question: 'Mi a következő szám a sorban?',
    options: ['43', '42', '37', '46'],
    correctAnswer: 0,
    explanation: 'A szabály: +7. 36 + 7 = 36 + 4 + 3 = 43.'
  },
  {
    id: 'as100g3-q18',
    level: 2,
    questionTypeBadge: 'Kivonás',
    question: 'Melyik kivonás eredménye 27?',
    options: ['54 − 27', '54 − 37', '64 − 27', '45 − 27'],
    correctAnswer: 0,
    explanation: '54 − 27 = 27. A többi: 54 − 37 = 17, 64 − 27 = 37, 45 − 27 = 18.'
  },
  {
    id: 'as100g3-q19',
    level: 2,
    questionTypeBadge: 'Számpiramis',
    figure: <PyramidFig top="60" left="24" right="?" />,
    question: 'Melyik szám kerül a ? helyére?',
    options: ['36', '84', '44', '46'],
    correctAnswer: 0,
    explanation: '24 + ? = 60. Számold ki: 60 − 24 = 36. Ellenőrzés: 24 + 36 = 60.'
  },
  {
    id: 'as100g3-q20',
    level: 2,
    questionTypeBadge: 'Kétjegyű összeadás',
    question: '56 + 38 = ?',
    options: ['94', '84', '96', '92'],
    correctAnswer: 0,
    explanation: '56 + 30 = 86. Aztán 86 + 8: 86 + 4 = 90, 90 + 4 = 94.'
  },

  // ---------------- 3. szint ----------------
  {
    id: 'as100g3-q21',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    figure: <BusFig />,
    question: 'A buszon 45 utas ült. A megállóban 18-an leszálltak, 9-en felszálltak. Hányan ülnek most a buszon?',
    options: ['36', '18', '72', '54'],
    correctAnswer: 0,
    explanation: 'Előbb a leszállók: 45 − 18 = 27. Aztán a felszállók: 27 + 9 = 36.'
  },
  {
    id: 'as100g3-q22',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    figure: <CompareBarsFig />,
    question: 'Lilinek 27 matricája van. Bencének 15-tel több. Hány matricájuk van együtt?',
    options: ['69', '42', '54', '57'],
    correctAnswer: 0,
    explanation: 'Bence: 27 + 15 = 42. Együtt: 27 + 42 = 69. (A 42 csak Bence matricái!)'
  },
  {
    id: 'as100g3-q23',
    level: 3,
    questionTypeBadge: 'Gondoltam egy számra',
    question: 'Gondoltam egy számra. Ha 26-ot hozzáadok, 74-et kapok. Melyik számra gondoltam?',
    options: ['48', '100', '52', '58'],
    correctAnswer: 0,
    explanation: 'Visszafelé gondolkodj: 74 − 26 = 48. Ellenőrzés: 48 + 26 = 74.'
  },
  {
    id: 'as100g3-q24',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    figure: <BeadsFig />,
    question: 'Egy dobozban 100 gyöngy volt. Anna elhasznált 35-öt, Peti 28-at. Hány gyöngy maradt?',
    options: ['37', '63', '47', '65'],
    correctAnswer: 0,
    explanation: '100 − 35 = 65. Aztán 65 − 28 = 37. (A 63 az elhasznált gyöngyök száma.)'
  },
  {
    id: 'as100g3-q25',
    level: 3,
    questionTypeBadge: 'Gondoltam egy számra',
    question: 'A 82 kisebb egyes szomszédjánál 37-tel kisebb számra gondoltam. Melyik ez?',
    options: ['44', '45', '56', '34'],
    correctAnswer: 0,
    explanation: 'A 82 kisebb egyes szomszédja 81. 81 − 37 = 81 − 30 − 7 = 51 − 7 = 44.'
  },
  {
    id: 'as100g3-q26',
    level: 3,
    questionTypeBadge: 'Pénz',
    figure: <PriceFig wallet={100} items={[{ name: 'ceruza', price: 45, color: '#60a5fa' }, { name: 'radír', price: 30, color: '#f472b6' }]} />,
    question: 'Van 100 Ft-od. Megveszed a ceruzát és a radírt. Mennyi pénzed marad?',
    options: ['25 Ft', '75 Ft', '35 Ft', '15 Ft'],
    correctAnswer: 0,
    explanation: 'A két dolog ára: 45 + 30 = 75 Ft. Ami marad: 100 − 75 = 25 Ft.'
  },
  {
    id: 'as100g3-q27',
    level: 3,
    questionTypeBadge: 'Hiányzó számjegy',
    figure: <EqFig parts={['4□', '+', '27', '=', '73']} note="Melyik számjegy van a □ helyén?" />,
    question: 'Melyik számjegy hiányzik?',
    options: ['6', '4', '5', '3'],
    correctAnswer: 0,
    explanation: 'A hiányzó tag: 73 − 27 = 46. Tehát a □ helyén 6 áll. Ellenőrzés: 46 + 27 = 73.'
  },
  {
    id: 'as100g3-q28',
    level: 3,
    questionTypeBadge: 'Mérleg',
    figure: <BalanceFig left="38 + □" right="50 + 25" />,
    question: 'A mérleg egyensúlyban van. Melyik szám kerül a □ helyére?',
    options: ['37', '47', '63', '12'],
    correctAnswer: 0,
    explanation: 'A jobb oldal: 50 + 25 = 75. Akkor 38 + □ = 75, így □ = 75 − 38 = 37.'
  },
  {
    id: 'as100g3-q29',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    question: 'A kertben 64 tulipán nyílik. 28 piros, a többi sárga. Mennyivel több a sárga, mint a piros?',
    options: ['8', '36', '18', '92'],
    correctAnswer: 0,
    explanation: 'Sárga: 64 − 28 = 36. A különbség: 36 − 28 = 8. Ennyivel több a sárga.'
  },
  {
    id: 'as100g3-q30',
    level: 3,
    questionTypeBadge: 'Sorozat',
    figure: <SeqFig items={['91', '84', '77', '?', '63']} />,
    question: 'Melyik szám hiányzik a sorból?',
    options: ['70', '71', '69', '73'],
    correctAnswer: 0,
    explanation: 'A szabály: −7. 77 − 7 = 70, és 70 − 7 = 63. Stimmel!'
  }
];

export const AddSub100G3Quiz: React.FC<{
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
      topicId="g3-c100-osszeadas-quiz"
      subtopicId="osszeadas-es-kivonas"
      title="2. Összeadás és kivonás – Kvíz"
      subtitle="30 feladat 3 szinten: kerek tízesek, tízesátlépés, kétjegyű számok, ellenőrzés, szöveges feladatok."
      badge="3. OSZTÁLY • I. SZÁMOLÁS 0-TÓL 100-IG • KVÍZ"
      questions={ADD_SUB_100_G3_QUESTIONS}
      cheatSheets={[
        {
          title: 'Nevek',
          items: ['35 + 24 = 59: tag + tag = összeg', '59 − 24 = 35: kisebbítendő − kivonandó = különbség', 'A tagok felcserélhetők.', 'A kivonásban nem cserélhetsz!']
        },
        {
          title: 'Tízesátlépés',
          items: ['28 + 6 = 28 + 2 + 4 = 34', '43 − 5 = 43 − 3 − 2 = 38', 'Először mindig a kerek tízesig lépj!']
        },
        {
          title: 'Kétjegyű számok',
          items: ['47 + 25 = 47 + 20 + 5 = 72', '73 − 27 = 73 − 20 − 7 = 46', 'Ellenőrzés: 46 + 27 = 73', '□ + 18 = 45 → □ = 45 − 18 = 27']
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <AddSub100G3Matcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <AddSub100G3Sorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default AddSub100G3Quiz;
