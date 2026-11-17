import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { AddSub200G3Matcher } from './AddSub200G3Matcher';
import { AddSub200G3Sorter } from './AddSub200G3Sorter';
import { FONT, UNK, Coin, TensJumpLine, Jump, PriceTag, PointsChart } from './AddSub200G3Parts';

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
  <TensJumpLine lo={lo} hi={hi} start={start} jumps={jumps} hideEnd W={240} H={110} className={CLS} color={minus ? '#ea580c' : '#16a34a'} />
);

/** Érmék sorban; két csoport között „+”. '?' = letakart érme. */
const CoinsFig: React.FC<{ groups: (number | string)[][]; caption?: string }> = ({ groups, caption }) => {
  const n = groups.reduce((a, gr) => a + gr.length, 0);
  const r = Math.min(15, ((226 - (groups.length - 1) * 22) / n - 4) / 2);
  const g = 2 * r + 4;
  const widths = groups.map((gr) => gr.length * g);
  const total = widths.reduce((a, b) => a + b, 0) + (groups.length - 1) * 22;
  let x = (240 - total) / 2 + r + 2;
  const items: React.ReactNode[] = [];
  groups.forEach((gr, gi) => {
    gr.forEach((v, i) => {
      items.push(<Coin key={`${gi}-${i}`} cx={x} cy={38} v={v} r={typeof v === 'number' && v >= 100 ? r + 2 : r} />);
      x += g;
    });
    if (gi < groups.length - 1) {
      items.push(<text key={`p${gi}`} x={x - r + 6} y="45" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#334155">+</text>);
      x += 22;
    }
  });
  return (
    <QFig h={caption ? 88 : 72}>
      {items}
      {caption && <text x="120" y="78" textAnchor="middle" fontSize="12.5" fontWeight="bold" fill="#92400e">{caption}</text>}
    </QFig>
  );
};

/** Csíkmodell: a felső szám az egész, alul a két rész. '?' = ismeretlen. */
const BarFig: React.FC<{ total: string; left: string; right: string; leftVal: number; totalVal: number }> = ({ total, left, right, leftVal, totalVal }) => {
  const W = 200;
  const lw = Math.round((W * leftVal) / totalVal);
  const x0 = 20;
  const cell = (x: number, w: number, t: string, fill: string, stroke: string) => (
    <g>
      <rect x={x} y="40" width={w} height="30" fill={t === '?' ? '#fee2e2' : fill} stroke={t === '?' ? UNK : stroke} strokeWidth="1.5" />
      <text x={x + w / 2} y="61" textAnchor="middle" fontSize="15" fontWeight="bold" fill={t === '?' ? UNK : '#0c4a6e'}>{t}</text>
    </g>
  );
  return (
    <QFig h={84}>
      <text x="120" y="22" textAnchor="middle" fontSize="15" fontWeight="bold" fill={total === '?' ? UNK : '#0c4a6e'}>{total}</text>
      <path d={`M ${x0} 34 L ${x0} 28 L ${x0 + W} 28 L ${x0 + W} 34`} fill="none" stroke="#0c4a6e" strokeWidth="1.5" />
      {cell(x0, lw, left, '#38bdf8', '#0369a1')}
      {cell(x0 + lw, W - lw, right, '#a7f3d0', '#047857')}
    </QFig>
  );
};

/** Pénz + árcédulák. */
const ShopFig: React.FC<{ money: number; items: { name: string; price: number; color: string }[] }> = ({ money, items }) => (
  <QFig h={96}>
    <Coin cx={40} cy={40} v={money} r={22} />
    <text x="40" y="84" textAnchor="middle" fontSize="10.5" fill="#475569">a pénzed</text>
    {items.map((it, i) => {
      const cx = 112 + i * 76;
      return (
        <g key={it.name}>
          {it.name === 'ceruza' ? (
            <g>
              <rect x={cx - 26} y="22" width="40" height="11" fill={it.color} stroke="#334155" />
              <path d={`M ${cx + 14} 22 L ${cx + 25} 27.5 L ${cx + 14} 33 Z`} fill="#fde68a" stroke="#334155" />
            </g>
          ) : (
            <rect x={cx - 18} y="18" width="36" height="18" rx="4" fill={it.color} stroke="#334155" />
          )}
          <PriceTag x={cx - 28} y={46} w={60} text={`${it.price} Ft`} />
          <text x={cx} y="84" textAnchor="middle" fontSize="10.5" fill="#475569">{it.name}</text>
        </g>
      );
    })}
  </QFig>
);

/** Út: otthon → megálló → iskola. */
const RouteFig: React.FC<{ a: number; b: number }> = ({ a, b }) => (
  <QFig h={96}>
    <path d="M 30 52 L 210 52" stroke="#94a3b8" strokeWidth="6" strokeLinecap="round" />
    {/* ház */}
    <path d="M 18 46 L 30 34 L 42 46 Z" fill="#f87171" stroke="#7f1d1d" />
    <rect x="21" y="46" width="18" height="14" fill="#fde68a" stroke="#7f1d1d" />
    {/* megálló */}
    <line x1="120" y1="28" x2="120" y2="52" stroke="#334155" strokeWidth="2.5" />
    <rect x="110" y="20" width="20" height="12" rx="2" fill="#facc15" stroke="#334155" />
    <text x="120" y="30" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#334155">H</text>
    {/* iskola */}
    <rect x="196" y="32" width="30" height="28" fill="#93c5fd" stroke="#1e3a8a" />
    <path d="M 192 32 L 211 20 L 230 32 Z" fill="#60a5fa" stroke="#1e3a8a" />
    <text x="75" y="44" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0f172a">{a} m</text>
    <text x="163" y="44" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0f172a">{b} m</text>
    <text x="30" y="80" textAnchor="middle" fontSize="10.5" fill="#475569">otthon</text>
    <text x="120" y="80" textAnchor="middle" fontSize="10.5" fill="#475569">megálló</text>
    <text x="211" y="80" textAnchor="middle" fontSize="10.5" fill="#475569">iskola</text>
  </QFig>
);

/** Busz: utasok, le- és felszállók. */
const BusFig: React.FC = () => (
  <QFig h={100}>
    <rect x="22" y="18" width="150" height="54" rx="10" fill="#34d399" stroke="#065f46" strokeWidth="2" />
    {[0, 1, 2, 3].map((i) => (
      <rect key={i} x={34 + i * 33} y="27" width="26" height="18" rx="3" fill="#e0f2fe" stroke="#065f46" />
    ))}
    <circle cx="54" cy="74" r="10" fill="#334155" />
    <circle cx="142" cy="74" r="10" fill="#334155" />
    <text x="97" y="64" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#064e3b">120 utas</text>
    <text x="208" y="40" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#dc2626">−50</text>
    <text x="208" y="62" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#16a34a">+30</text>
    <text x="120" y="96" textAnchor="middle" fontSize="10.5" fill="#475569">leszállt 50, felszállt 30</text>
  </QFig>
);

/** Tízesrudak két csoportban. */
const RodsFig: React.FC<{ a: number; b: number }> = ({ a, b }) => {
  const w = 9;
  const step = 13;
  const total = (a + b) * step + 24;
  const x0 = (240 - total) / 2;
  const rod = (x: number, color: string, key: string) => (
    <g key={key}>
      {Array.from({ length: 10 }, (_, k) => (
        <rect key={k} x={x} y={12 + k * 5.5} width={w} height="5.5" fill={color} stroke="#1e3a8a" strokeWidth="0.5" />
      ))}
    </g>
  );
  return (
    <QFig h={90}>
      {Array.from({ length: a }, (_, i) => rod(x0 + i * step, '#60a5fa', `a${i}`))}
      <text x={x0 + a * step + 8} y="48" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#334155">+</text>
      {Array.from({ length: b }, (_, i) => rod(x0 + a * step + 24 + i * step, '#f472b6', `b${i}`))}
      <text x="120" y="82" textAnchor="middle" fontSize="11.5" fill="#475569">Egy rúd = 10</text>
    </QFig>
  );
};

const ChartFig: React.FC = () => <PointsChart className={CLS} />;

// ---------------------------------------------------------------------------
// Kérdések
// ---------------------------------------------------------------------------
export const ADD_SUB_200_G3_QUESTIONS: QuizQuestion[] = [
  // ---------------- 1. szint ----------------
  {
    id: 'as200g3-q1',
    level: 1,
    questionTypeBadge: 'Kerek tízesek',
    figure: <CoinsFig groups={[[100, 10, 10], [10, 10, 10]]} />,
    question: '120 + 30 = ?',
    options: ['150', '123', '140', '160'],
    correctAnswer: 0,
    explanation: '12 tízes + 3 tízes = 15 tízes. 120 + 30 = 150.'
  },
  {
    id: 'as200g3-q2',
    level: 1,
    questionTypeBadge: 'Kerek tízesek',
    question: '170 − 40 = ?',
    options: ['130', '110', '140', '120'],
    correctAnswer: 0,
    explanation: '17 tízes − 4 tízes = 13 tízes. 170 − 40 = 130.'
  },
  {
    id: 'as200g3-q3',
    level: 1,
    questionTypeBadge: 'Kerek százas',
    figure: <CoinsFig groups={[[100], [10, 10, 10, 10, 10, 10]]} />,
    question: '100 + 60 = ?',
    options: ['160', '106', '150', '170'],
    correctAnswer: 0,
    explanation: '1 százas és 6 tízes: 160. Nem 106, mert a 6 itt tízeseket jelent!'
  },
  {
    id: 'as200g3-q4',
    level: 1,
    questionTypeBadge: 'Kerek százas',
    question: '180 − 100 = ?',
    options: ['80', '100', '90', '70'],
    correctAnswer: 0,
    explanation: 'A 180-ból elveszed a százast. Marad 8 tízes: 80.'
  },
  {
    id: 'as200g3-q5',
    level: 1,
    questionTypeBadge: 'Összeadás',
    figure: <Jumps lo={40} hi={120} start={60} jumps={[{ to: 100, label: '+40' }]} />,
    question: '60 + 40 = ?',
    options: ['100', '110', '90', '80'],
    correctAnswer: 0,
    explanation: '6 tízes + 4 tízes = 10 tízes. Ez pont 100.'
  },
  {
    id: 'as200g3-q6',
    level: 1,
    questionTypeBadge: 'Kerek tízesek',
    question: '150 + 50 = ?',
    options: ['200', '100', '190', '155'],
    correctAnswer: 0,
    explanation: '15 tízes + 5 tízes = 20 tízes. 150 + 50 = 200.'
  },
  {
    id: 'as200g3-q7',
    level: 1,
    questionTypeBadge: 'Tízesekkel',
    question: '14 tízes + 3 tízes. Melyik szám ez?',
    options: ['170', '143', '17', '140'],
    correctAnswer: 0,
    explanation: '14 + 3 = 17. 17 tízes = 170.'
  },
  {
    id: 'as200g3-q8',
    level: 1,
    questionTypeBadge: 'Pénz',
    figure: <CoinsFig groups={[[100, 50, 20]]} caption="Ennyi van a perselyben." />,
    question: 'Mennyi pénz van a perselyben?',
    options: ['170 Ft', '160 Ft', '150 Ft', '180 Ft'],
    correctAnswer: 0,
    explanation: '100 + 50 = 150, és még 20: 150 + 20 = 170 Ft.'
  },
  {
    id: 'as200g3-q9',
    level: 1,
    questionTypeBadge: 'Kivonás',
    question: '200 − 50 = ?',
    options: ['150', '160', '140', '100'],
    correctAnswer: 0,
    explanation: '20 tízes − 5 tízes = 15 tízes. 200 − 50 = 150.'
  },
  {
    id: 'as200g3-q10',
    level: 1,
    questionTypeBadge: 'Kivonás',
    figure: <Jumps lo={110} hi={200} start={190} jumps={[{ to: 130, label: '−60' }]} minus />,
    question: '190 − 60 = ?',
    options: ['130', '120', '140', '150'],
    correctAnswer: 0,
    explanation: '19 tízes − 6 tízes = 13 tízes. 190 − 60 = 130.'
  },

  // ---------------- 2. szint ----------------
  {
    id: 'as200g3-q11',
    level: 2,
    questionTypeBadge: 'Átlépés a 100-on',
    figure: <Jumps lo={50} hi={150} start={70} jumps={[{ to: 100, label: '+30' }, { to: 130, label: '+30' }]} />,
    question: '70 + 60 = ?',
    options: ['130', '120', '13', '140'],
    correctAnswer: 0,
    explanation: 'Előbb a 100-ig: 70 + 30 = 100. A 60-ból még 30 maradt: 100 + 30 = 130.'
  },
  {
    id: 'as200g3-q12',
    level: 2,
    questionTypeBadge: 'Átlépés a 100-on',
    question: '80 + 90 = ?',
    options: ['170', '160', '180', '17'],
    correctAnswer: 0,
    explanation: '8 tízes + 9 tízes = 17 tízes = 170. Vagy: 80 + 20 = 100, 100 + 70 = 170.'
  },
  {
    id: 'as200g3-q13',
    level: 2,
    questionTypeBadge: 'Átlépés a 100-on',
    figure: <Jumps lo={60} hi={160} start={140} jumps={[{ to: 100, label: '−40' }, { to: 80, label: '−20' }]} minus />,
    question: '140 − 60 = ?',
    options: ['80', '120', '90', '70'],
    correctAnswer: 0,
    explanation: 'Előbb vissza a 100-ig: 140 − 40 = 100. Még 20: 100 − 20 = 80. (A 120 rossz: ott 6 − 4-et számolt valaki.)'
  },
  {
    id: 'as200g3-q14',
    level: 2,
    questionTypeBadge: 'Átlépés a 100-on',
    question: '160 − 90 = ?',
    options: ['70', '130', '80', '60'],
    correctAnswer: 0,
    explanation: '16 tízes − 9 tízes = 7 tízes = 70. Ellenőrzés: 70 + 90 = 160.'
  },
  {
    id: 'as200g3-q15',
    level: 2,
    questionTypeBadge: 'Tízesekkel',
    figure: <RodsFig a={6} b={5} />,
    question: '6 + 5 = 11. Mennyi 60 + 50?',
    options: ['110', '11', '100', '120'],
    correctAnswer: 0,
    explanation: '6 tízes + 5 tízes = 11 tízes. 11 tízes = 110.'
  },
  {
    id: 'as200g3-q16',
    level: 2,
    questionTypeBadge: 'Pótlás 200-ra',
    figure: <BarFig total="200" left="140" right="?" leftVal={140} totalVal={200} />,
    question: '140 + □ = 200. Mennyi a □?',
    options: ['60', '70', '160', '40'],
    correctAnswer: 0,
    explanation: '14 tízes van, 20 tízes kell. Hiányzik 6 tízes: 60. Ellenőrzés: 140 + 60 = 200.'
  },
  {
    id: 'as200g3-q17',
    level: 2,
    questionTypeBadge: 'Pénz',
    figure: <CoinsFig groups={[[100, 50, 20, '?']]} caption="Összesen 190 Ft." />,
    question: 'Melyik érmét takartuk le?',
    options: ['20 Ft', '10 Ft', '50 Ft', '100 Ft'],
    correctAnswer: 0,
    explanation: '100 + 50 + 20 = 170. A 190-hez még 20 kell. Ez a 20 forintos.'
  },
  {
    id: 'as200g3-q18',
    level: 2,
    questionTypeBadge: 'Összehasonlítás',
    question: 'Melyik eredmény a nagyobb: 90 + 50 vagy 200 − 70?',
    options: ['90 + 50', '200 − 70', 'Egyenlők', 'Nem lehet eldönteni'],
    correctAnswer: 0,
    explanation: '90 + 50 = 140 és 200 − 70 = 130. A 140 a nagyobb.'
  },
  {
    id: 'as200g3-q19',
    level: 2,
    questionTypeBadge: 'Hiányzó szám',
    figure: <BarFig total="?" left="90" right="70" leftVal={90} totalVal={160} />,
    question: '□ − 70 = 90. Mennyi a □?',
    options: ['160', '20', '150', '170'],
    correctAnswer: 0,
    explanation: 'A maradék és az elvett rész együtt adja az egészet: 90 + 70 = 160. Ellenőrzés: 160 − 70 = 90.'
  },
  {
    id: 'as200g3-q20',
    level: 2,
    questionTypeBadge: 'Hiányzó szám',
    figure: <BarFig total="120" left="50" right="?" leftVal={50} totalVal={120} />,
    question: '120 − □ = 50. Mennyi a □?',
    options: ['70', '170', '60', '80'],
    correctAnswer: 0,
    explanation: '50-ből 120 lesz, ha 70-et adsz hozzá: 50 + 50 = 100, 100 + 20 = 120. Tehát □ = 70.'
  },

  // ---------------- 3. szint ----------------
  {
    id: 'as200g3-q21',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    figure: <RouteFig a={90} b={70} />,
    question: 'Otthonról a megállóig 90 m, onnan az iskoláig 70 m. Milyen hosszú az út összesen?',
    options: ['160 m', '150 m', '20 m', '170 m'],
    correctAnswer: 0,
    explanation: '90 + 70 = 90 + 10 + 60 = 160. Az út 160 m.'
  },
  {
    id: 'as200g3-q22',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    figure: <ShopFig money={200} items={[{ name: 'ceruza', price: 70, color: '#22c55e' }, { name: 'radír', price: 80, color: '#60a5fa' }]} />,
    question: 'Megveszed a ceruzát és a radírt is. Mennyi pénzed marad?',
    options: ['50 Ft', '150 Ft', '130 Ft', '60 Ft'],
    correctAnswer: 0,
    explanation: 'Együtt 70 + 80 = 150 Ft. 200 − 150 = 50 Ft marad.'
  },
  {
    id: 'as200g3-q23',
    level: 3,
    questionTypeBadge: 'Diagram',
    figure: <ChartFig />,
    question: 'Mennyivel több pontot gyűjtött a 3.b, mint a 3.c?',
    options: ['50', '40', '190', '60'],
    correctAnswer: 0,
    explanation: 'A 3.b 120, a 3.c 70 pontot gyűjtött. 120 − 70 = 50.'
  },
  {
    id: 'as200g3-q24',
    level: 3,
    questionTypeBadge: 'Diagram',
    figure: <ChartFig />,
    question: 'Hány pontot gyűjtött együtt a 3.a és a 3.c?',
    options: ['160', '150', '170', '20'],
    correctAnswer: 0,
    explanation: 'A 3.a 90, a 3.c 70 pontot gyűjtött. 90 + 70 = 160.'
  },
  {
    id: 'as200g3-q25',
    level: 3,
    questionTypeBadge: 'Műveletsor',
    figure: <Jumps lo={80} hi={200} start={200} jumps={[{ to: 140, label: '−60' }, { to: 100, label: '−40' }]} minus />,
    question: '200 − 60 − 40 = ?',
    options: ['100', '180', '140', '120'],
    correctAnswer: 0,
    explanation: 'Balról jobbra: 200 − 60 = 140, aztán 140 − 40 = 100.'
  },
  {
    id: 'as200g3-q26',
    level: 3,
    questionTypeBadge: 'Mennyivel kisebb?',
    figure: <Jumps lo={60} hi={170} start={150} jumps={[{ to: 100, label: '−50' }, { to: 80, label: '−20' }]} minus />,
    question: 'Melyik szám 70-nel kisebb a 150-nél?',
    options: ['80', '120', '90', '70'],
    correctAnswer: 0,
    explanation: '150 − 70 = 150 − 50 − 20 = 80.'
  },
  {
    id: 'as200g3-q27',
    level: 3,
    questionTypeBadge: 'Két lépés',
    question: 'Melyik az a szám, amelyik a 60 és a 70 összegénél 50-nel kisebb?',
    options: ['80', '130', '70', '90'],
    correctAnswer: 0,
    explanation: 'Az összeg: 60 + 70 = 130. Ennél 50-nel kisebb: 130 − 50 = 80.'
  },
  {
    id: 'as200g3-q28',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    figure: <BusFig />,
    question: 'A buszon 120 utas ült. Leszállt 50, felszállt 30. Hányan utaznak most?',
    options: ['100', '140', '70', '110'],
    correctAnswer: 0,
    explanation: '120 − 50 = 70. Aztán 70 + 30 = 100 utas.'
  },
  {
    id: 'as200g3-q29',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    question: 'A mesekönyv 180 oldalas. Boti hétfőn 60, kedden 50 oldalt olvasott el. Hány oldal van még hátra?',
    options: ['70', '110', '80', '60'],
    correctAnswer: 0,
    explanation: 'Két nap alatt: 60 + 50 = 110 oldal. 180 − 110 = 70 oldal van hátra.'
  },
  {
    id: 'as200g3-q30',
    level: 3,
    questionTypeBadge: 'Műveletsor',
    question: 'Melyik műveletsor eredménye NEM 150?',
    options: ['130 + 50 − 40', '190 − 70 + 30', '100 + 80 − 30', '200 − 20 − 30'],
    correctAnswer: 0,
    explanation: '130 + 50 − 40 = 180 − 40 = 140. A többi mind 150: 120 + 30, 180 − 30, 180 − 30.'
  }
];

export const AddSub200G3Quiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => {
  return (
    <QuizTemplate
      grade={3}
      chapterId="szamolas-200-ig"
      topicId="g3-c200-osszeadas-quiz"
      subtopicId="osszeadas-es-kivonas"
      title="4. Összeadás és kivonás – Kvíz"
      subtitle="30 feladat 3 szinten: kerek tízesek, átlépés a 100-on, pótlás, pénz, diagram, szöveges feladatok."
      badge="3. OSZTÁLY • III. SZÁMOLÁS 0-TÓL 200-IG • KVÍZ"
      questions={ADD_SUB_200_G3_QUESTIONS}
      cheatSheets={[
        {
          title: 'Tízesekkel',
          items: ['120 + 30: 12 t + 3 t = 15 t = 150', '170 − 40: 17 t − 4 t = 13 t = 130', '100 + 60 = 160 (nem 106!)']
        },
        {
          title: 'Átlépés a 100-on',
          items: ['60 + 50 = 60 + 40 + 10 = 110', '130 − 50 = 130 − 30 − 20 = 80', 'Először mindig a 100-ig lépj!']
        },
        {
          title: 'Pótlás, ellenőrzés',
          items: ['140 + □ = 200 → □ = 60', '□ − 70 = 90 → □ = 90 + 70 = 160', 'Ellenőrzés: 80 + 70 = 150']
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <AddSub200G3Matcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <AddSub200G3Sorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default AddSub200G3Quiz;
