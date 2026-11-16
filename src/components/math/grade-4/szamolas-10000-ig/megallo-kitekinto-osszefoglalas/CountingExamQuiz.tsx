import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { CountingExamMatcher } from './CountingExamMatcher';
import { CountingExamSorter } from './CountingExamSorter';
import {
  UNKNOWN_COLOR,
  SumPyramid,
  RoundBox,
  PuzzleRow,
  FAIRY_ROWS,
  Wing,
  WING_COLORS,
  OpChain,
  Tent,
  TENT_COLORS,
  ProductGrid,
  ColumnOp,
  PlaceTable,
  NumberLine,
  LogicShape,
  LOGIC_COLORS
} from './CountingExamFigures';

// ---------------------------------------------------------------------------
// Kérdésábrák – belső segédek
// ---------------------------------------------------------------------------
const QFig: React.FC<{ children: React.ReactNode; h?: number }> = ({ children, h = 120 }) => (
  <svg viewBox={`0 0 240 ${h}`} className="w-full max-w-[280px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
    <rect x="1" y="1" width="238" height={h - 2} rx="10" fill="#f8fafc" stroke="#cbd5e1" />
    {children}
  </svg>
);

const PlaceFig: React.FC<{ heads: string[]; values: string[] }> = ({ heads, values }) => (
  <QFig h={70}>
    <PlaceTable x={120 - (heads.length * 34) / 2} y={12} heads={heads} values={values} />
  </QFig>
);

const LineFig: React.FC<{ from: number; to: number; step: number; labelEvery?: number; marks: { v: number; label: string }[] }> = (p) => (
  <QFig h={80}>
    <NumberLine x={20} y={48} w={196} {...p} />
  </QFig>
);

const ColFig: React.FC<{ top: string; bottom: string; op: string; result?: string }> = ({ top, bottom, op, result }) => {
  const n = Math.max(top.length, bottom.length) + 1;
  return (
    <QFig h={90}>
      <ColumnOp x={120 - ((n + 1) * 16) / 2} y={30} top={top} bottom={bottom} op={op} result={result ?? '?'.repeat(n - 1)} />
    </QFig>
  );
};

/** Írásbeli szorzás a tankönyv szerint: a szorzandó és a szorzó egy sorban, az eredmény a szorzandó alatt. */
const MulFig: React.FC<{ a: string; b: string; resultLen: number }> = ({ a, b, resultLen }) => {
  const cw = 20;
  const cells = [...a.split(''), '·', ...b.split('')];
  const x0 = 120 - (cells.length * cw) / 2;
  const right = x0 + a.length * cw;
  return (
    <QFig h={84}>
      <g fontFamily="ui-monospace, monospace">
        {Array.from({ length: cells.length + 2 }).map((_, i) => (
          <g key={i}>
            <rect x={x0 + (i - 1) * cw} y={14} width={cw} height={26} fill="none" stroke="#e2e8f0" />
            <rect x={x0 + (i - 1) * cw} y={44} width={cw} height={26} fill="none" stroke="#e2e8f0" />
          </g>
        ))}
        {cells.map((c, i) => (
          <text key={i} x={x0 + i * cw + cw / 2} y={33} textAnchor="middle" fontSize="16" fontWeight="bold" fill={c === '·' ? '#7c3aed' : '#1e293b'}>
            {c}
          </text>
        ))}
        <line x1={x0 - cw} y1={41} x2={right} y2={41} stroke="#1e293b" strokeWidth="1.6" />
        {Array.from({ length: resultLen }).map((_, i) => (
          <text key={i} x={right - (resultLen - i - 0.5) * cw} y={63} textAnchor="middle" fontSize="16" fontWeight="bold" fill={UNKNOWN_COLOR}>
            ?
          </text>
        ))}
      </g>
    </QFig>
  );
};

const PyrFig: React.FC<{ rows: (string | number)[][]; fill?: string; stroke?: string }> = ({ rows, fill, stroke }) => (
  <QFig h={rows.length * 24 + 22}>
    <SumPyramid rows={rows} cx={120} y={11} w={50} h={24} fill={fill} stroke={stroke} />
  </QFig>
);

const NeighbourFig: React.FC<{ num: string; side: 'kisebb' | 'nagyobb'; kind: string }> = ({ num, side, kind }) => (
  <QFig h={80}>
    <rect x="15" y="14" width="80" height="22" fill="#fde68a" stroke="#b45309" />
    <text x="55" y="23" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#78350f">Kisebb</text>
    <text x="55" y="33" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#78350f">szomszéd</text>
    <rect x="95" y="14" width="50" height="22" fill="#fde68a" stroke="#b45309" />
    <text x="120" y="29" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#78350f">Szám</text>
    <rect x="145" y="14" width="80" height="22" fill="#fde68a" stroke="#b45309" />
    <text x="185" y="23" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#78350f">Nagyobb</text>
    <text x="185" y="33" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#78350f">szomszéd</text>
    <rect x="15" y="36" width="80" height="28" fill="#fff" stroke="#b45309" />
    <rect x="95" y="36" width="50" height="28" fill="#fff" stroke="#b45309" />
    <rect x="145" y="36" width="80" height="28" fill="#fff" stroke="#b45309" />
    <text x="120" y="55" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#1e293b">{num}</text>
    <text x={side === 'kisebb' ? 55 : 185} y="55" textAnchor="middle" fontSize="13" fontWeight="bold" fill={UNKNOWN_COLOR}>
      {kind}: ?
    </text>
  </QFig>
);

const CardsFig: React.FC<{ cards: string[]; color?: string }> = ({ cards, color = '#0284c7' }) => {
  const w = Math.min(44, 220 / cards.length);
  return (
    <QFig h={60}>
      {cards.map((c, i) => {
        const x = 120 - (cards.length * w) / 2 + i * w + 2;
        return (
          <g key={i}>
            <rect x={x} y="15" width={w - 4} height="30" rx="7" fill="#fff" stroke={color} strokeWidth="1.6" />
            <text x={x + (w - 4) / 2} y="35" textAnchor="middle" fontSize={c.length > 3 ? 11 : 15} fontWeight="bold" fill="#1e293b">
              {c}
            </text>
          </g>
        );
      })}
    </QFig>
  );
};

const ChainFig: React.FC<{ start: string; ops: string[]; values: string[] }> = ({ start, ops, values }) => (
  <QFig h={74}>
    <OpChain start={start} ops={ops} values={values} y={50} x={28} step={Math.min(70, 190 / ops.length)} />
  </QFig>
);

const RoundBoxFig: React.FC<{ value: number; factors: number[]; color?: string; pick: number }> = ({ value, factors, color, pick }) => (
  <QFig h={84}>
    <RoundBox x={40} y={22} value={value} factors={factors} color={color} />
    <text x="120" y="78" textAnchor="middle" fontSize="10.5" fill="#334155">
      tízesre kerekítve · {pick} = ?
    </text>
  </QFig>
);

const FairyFig: React.FC<{ ask: 'brown' | 'green' }> = ({ ask }) => (
  <QFig h={130}>
    <g transform="translate(2 4) scale(0.7)">
      {FAIRY_ROWS.map((r, i) => (
        <PuzzleRow key={i} y={22 + i * 30} items={r} x={24} />
      ))}
    </g>
    <Wing x={40} y={110} color={WING_COLORS.blue} />
    <text x="56" y="115" fontSize="13" fontWeight="bold" fill="#334155">= 60</text>
    <text x="140" y="115" fontSize="12" fontWeight="bold" fill={UNKNOWN_COLOR}>
      {ask === 'brown' ? 'barna sapka = ?' : 'zöld szárny = ?'}
    </text>
  </QFig>
);

const Dice: React.FC<{ x: number; y: number; n: number }> = ({ x, y, n }) => {
  const P: Record<number, [number, number][]> = {
    1: [[0, 0]],
    2: [[-1, -1], [1, 1]],
    3: [[-1, -1], [0, 0], [1, 1]],
    4: [[-1, -1], [1, -1], [-1, 1], [1, 1]],
    5: [[-1, -1], [1, -1], [0, 0], [-1, 1], [1, 1]],
    6: [[-1, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [1, 1]]
  };
  return (
    <g>
      <rect x={x - 18} y={y - 18} width="36" height="36" rx="7" fill="#ef4444" stroke="#7f1d1d" />
      {P[n].map(([a, b], i) => (
        <circle key={i} cx={x + a * 10} cy={y + b * 10} r="3.4" fill="#fff" />
      ))}
    </g>
  );
};

const DiceFig: React.FC = () => (
  <QFig h={96}>
    <Dice x={50} y={38} n={3} />
    <Dice x={100} y={38} n={5} />
    <Dice x={170} y={38} n={6} />
    <text x="75" y="78" textAnchor="middle" fontSize="10.5" fill="#334155">összeg · 10</text>
    <text x="170" y="78" textAnchor="middle" fontSize="10.5" fill="#334155">· harmadik</text>
  </QFig>
);

const RuleTableFig: React.FC<{ sq: string[]; tri: string[] }> = ({ sq, tri }) => (
  <QFig h={92}>
    <text x="120" y="20" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1e293b">20 · ■ + ▲ = 1500</text>
    {['■', '▲'].map((h, r) => (
      <g key={h}>
        <rect x="20" y={30 + r * 26} width="36" height="26" fill="#bbf7d0" stroke="#15803d" />
        <text x="38" y={48 + r * 26} textAnchor="middle" fontSize="13" fill={r === 0 ? '#1e3a8a' : '#db2777'}>{h}</text>
        {(r === 0 ? sq : tri).map((v, i) => (
          <g key={i}>
            <rect x={56 + i * 54} y={30 + r * 26} width="54" height="26" fill="#f0fdf4" stroke="#15803d" />
            <text x={83 + i * 54} y={48 + r * 26} textAnchor="middle" fontSize="13" fontWeight="bold" fill={v === '?' ? UNKNOWN_COLOR : '#1e293b'}>
              {v}
            </text>
          </g>
        ))}
      </g>
    ))}
  </QFig>
);

const LogicFig: React.FC<{ items: { shape: 'kor' | 'negyzet' | 'haromszog'; color: string; big?: boolean; holed?: boolean }[]; tail?: string }> = ({
  items,
  tail
}) => (
  <QFig h={80}>
    {items.map((it, i) => (
      <LogicShape key={i} x={36 + i * 52} y={40} {...it} />
    ))}
    {tail && (
      <text x={36 + items.length * 52} y="46" textAnchor="middle" fontSize="18" fontWeight="bold" fill={UNKNOWN_COLOR}>
        {tail}
      </text>
    )}
  </QFig>
);

const PierFig: React.FC = () => (
  <QFig h={96}>
    <rect x="1" y="60" width="238" height="35" fill="#bae6fd" />
    <path d="M 18 50 L 32 36 L 46 50 Z" fill="#b45309" />
    <rect x="21" y="50" width="22" height="14" fill="#fde68a" stroke="#92400e" />
    <line x1="46" y1="62" x2="150" y2="62" stroke="#65a30d" strokeWidth="4" />
    <rect x="150" y="60" width="70" height="6" fill="#92400e" />
    <line x1="32" y1="76" x2="150" y2="76" stroke="#1e293b" strokeWidth="1" />
    <text x="91" y="88" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1e293b">683 m</text>
    <line x1="150" y1="76" x2="220" y2="76" stroke="#1e293b" strokeWidth="1" />
    <text x="185" y="88" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1e293b">87 m</text>
    <text x="120" y="22" textAnchor="middle" fontSize="12" fontWeight="bold" fill={UNKNOWN_COLOR}>tanya → stég vége: ? m</text>
    <text x="185" y="54" textAnchor="middle" fontSize="10" fill="#334155">stég</text>
  </QFig>
);

const DistanceFig: React.FC = () => (
  <QFig h={86}>
    <circle cx="25" cy="44" r="7" fill="#2563eb" />
    <text x="25" y="68" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1e3a8a">Tóni</text>
    <circle cx="215" cy="44" r="7" fill="#16a34a" />
    <text x="215" y="68" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#166534">Tati</text>
    <circle cx="105" cy="44" r="7" fill="#f97316" />
    <text x="105" y="68" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#9a3412">Teó</text>
    <line x1="32" y1="44" x2="98" y2="44" stroke="#1e293b" strokeDasharray="4 3" />
    <line x1="112" y1="44" x2="208" y2="44" stroke="#1e293b" />
    <text x="160" y="36" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1e293b">5640 m-rel közelebb</text>
    <text x="65" y="36" textAnchor="middle" fontSize="12" fontWeight="bold" fill={UNKNOWN_COLOR}>?</text>
    <text x="120" y="18" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1e293b">Tóni – Tati: 8350 m</text>
  </QFig>
);

const RomanFig: React.FC<{ text: string }> = ({ text }) => (
  <QFig h={70}>
    <rect x="50" y="12" width="140" height="44" rx="8" fill="#fef3c7" stroke="#b45309" strokeWidth="2" />
    <text x="120" y="44" textAnchor="middle" fontSize="26" fontWeight="bold" fill="#78350f" fontFamily="Georgia, serif">
      {text}
    </text>
  </QFig>
);

const B = { blue: '#38bdf8', green: '#86efac' };

// ---------------------------------------------------------------------------
// Kérdések – 30 / szint
// ---------------------------------------------------------------------------
export const COUNTING_EXAM_QUESTIONS: QuizQuestion[] = [
  // ===================== 1. SZINT =====================
  {
    id: 'g4ex-q1',
    level: 1,
    questionTypeBadge: 'Helyiérték',
    question: 'Melyik számra gondoltam? 3 sz + 4 t + 8 e',
    figure: <PlaceFig heads={['sz', 't', 'e']} values={['3', '4', '8']} />,
    options: ['348', '843', '3048', '384'],
    correctAnswer: 0,
    explanation: '3 százas = 300, 4 tízes = 40, 8 egyes = 8. Együtt: 300 + 40 + 8 = 348.'
  },
  {
    id: 'g4ex-q2',
    level: 1,
    questionTypeBadge: 'Helyiérték',
    question: 'Melyik számra gondoltam? 15 t + 8 sz + 9 e',
    options: ['959', '1589', '8159', '869'],
    correctAnswer: 0,
    explanation: '15 tízes = 150, 8 százas = 800, 9 egyes = 9. Összeadva: 800 + 150 + 9 = 959. Vigyázz, a sorrend itt össze van keverve!'
  },
  {
    id: 'g4ex-q3',
    level: 1,
    questionTypeBadge: 'Számegyenes',
    question: 'Melyik szám helyét jelöli a kérdőjel a számegyenesen?',
    figure: <LineFig from={0} to={1000} step={100} labelEvery={10} marks={[{ v: 600, label: '?' }]} />,
    options: ['600', '60', '700', '500'],
    correctAnswer: 0,
    explanation: 'A számegyenes 0-tól 1000-ig tart, egy osztás 100. A kérdőjel a 6. osztásnál van: 6 · 100 = 600.'
  },
  {
    id: 'g4ex-q4',
    level: 1,
    questionTypeBadge: 'Sorozat',
    question: 'Folytasd a sorozatot! 375, 400, 425, 450, ?',
    options: ['475', '460', '500', '455'],
    correctAnswer: 0,
    explanation: 'A sorozat 25-ösével nő: 375 + 25 = 400, 400 + 25 = 425 … 450 + 25 = 475.'
  },
  {
    id: 'g4ex-q5',
    level: 1,
    questionTypeBadge: 'Számszomszéd',
    question: 'Melyik az 589 nagyobb tízes számszomszédja?',
    figure: <NeighbourFig num="589" side="nagyobb" kind="tízes" />,
    options: ['590', '600', '580', '599'],
    correctAnswer: 0,
    explanation: 'Az 589 két tízes között van: 580 és 590. A nagyobb tízes szomszéd az 590.'
  },
  {
    id: 'g4ex-q6',
    level: 1,
    questionTypeBadge: 'Kerekítés',
    question: 'Mennyi a 75 tízesre kerekített értéke?',
    figure: <LineFig from={70} to={80} step={1} labelEvery={5} marks={[{ v: 75, label: '75' }]} />,
    options: ['80', '70', '100', '75'],
    correctAnswer: 0,
    explanation: 'Az 5-ös egyesre végződő számot felfelé kerekítjük: 75 ≈ 80.'
  },
  {
    id: 'g4ex-q7',
    level: 1,
    questionTypeBadge: 'Fejszámolás',
    question: 'Mennyi 450 + 220?',
    options: ['670', '650', '690', '570'],
    correctAnswer: 0,
    explanation: '450 + 200 = 650, aztán 650 + 20 = 670.'
  },
  {
    id: 'g4ex-q8',
    level: 1,
    questionTypeBadge: 'Fejszámolás',
    question: 'Mennyi 530 − 180?',
    options: ['350', '450', '360', '710'],
    correctAnswer: 0,
    explanation: '530 − 100 = 430, aztán 430 − 80 = 350.'
  },
  {
    id: 'g4ex-q9',
    level: 1,
    questionTypeBadge: 'Szorzás',
    question: 'Mennyi 7 · 40?',
    options: ['280', '28', '2800', '47'],
    correctAnswer: 0,
    explanation: '7 · 4 = 28, és a 40-ben van egy nulla, ezért 7 · 40 = 280.'
  },
  {
    id: 'g4ex-q10',
    level: 1,
    questionTypeBadge: 'Osztás',
    question: 'Mennyi 810 : 90?',
    options: ['9', '90', '8', '900'],
    correctAnswer: 0,
    explanation: '810 : 90 = 81 : 9 = 9. Ellenőrzés: 9 · 90 = 810.'
  },
  {
    id: 'g4ex-q11',
    level: 1,
    questionTypeBadge: 'Műveleti sorrend',
    question: 'Mennyi 610 − 490 : 7?',
    options: ['540', '17', '600', '480'],
    correctAnswer: 0,
    explanation: 'Előbb osztunk: 490 : 7 = 70. Aztán kivonunk: 610 − 70 = 540.'
  },
  {
    id: 'g4ex-q12',
    level: 1,
    questionTypeBadge: 'Nyitott mondat',
    question: 'Melyik szám kerül a ▲ helyére? ▲ + 254 = 522',
    options: ['268', '776', '278', '258'],
    correctAnswer: 0,
    explanation: 'A hiányzó tagot kivonással kapjuk: 522 − 254 = 268. Ellenőrzés: 268 + 254 = 522.'
  },
  {
    id: 'g4ex-q13',
    level: 1,
    questionTypeBadge: 'Nyitott mondat',
    question: 'Melyik szám kerül a ▲ helyére? ▲ · 6 = 480',
    options: ['80', '8', '486', '800'],
    correctAnswer: 0,
    explanation: '480 : 6 = 80, mert 80 · 6 = 480.'
  },
  {
    id: 'g4ex-q14',
    level: 1,
    questionTypeBadge: 'Szöveges feladat',
    question: 'Egy szarvasbika tömege 240 kg, a tehéné ennek a fele. Hány kilogramm a tehén?',
    options: ['120 kg', '480 kg', '220 kg', '260 kg'],
    correctAnswer: 0,
    explanation: 'A fele: 240 : 2 = 120. A tehén 120 kg-os.'
  },
  {
    id: 'g4ex-q15',
    level: 1,
    questionTypeBadge: 'Római szám',
    question: 'Melyik számot jelöli ez a római szám?',
    figure: <RomanFig text="XXVI" />,
    options: ['26', '24', '16', '36'],
    correctAnswer: 0,
    explanation: 'X + X + V + I = 10 + 10 + 5 + 1 = 26.'
  },
  {
    id: 'g4ex-q16',
    level: 1,
    questionTypeBadge: 'Római szám',
    question: 'Hogyan írjuk a 19-et római számmal?',
    options: ['XIX', 'XVIIII', 'IXX', 'XXI'],
    correctAnswer: 0,
    explanation: '19 = 10 + 9, a 9 = IX (az I a X előtt: 10 − 1). Tehát XIX. Négy egyforma jel (IIII) nem állhat egymás mellett!'
  },
  {
    id: 'g4ex-q17',
    level: 1,
    questionTypeBadge: 'Logikai lapok',
    question: 'Hány lap van a logikai készletben? (4 szín, 3 forma, 2 méret, lyukas vagy nem lyukas)',
    options: ['48', '24', '12', '36'],
    correctAnswer: 0,
    explanation: '4 · 3 = 12, 12 · 2 = 24 (nagy és kicsi), 24 · 2 = 48 (lyukas és nem lyukas).'
  },
  {
    id: 'g4ex-q18',
    level: 1,
    questionTypeBadge: 'Logikai lapok',
    question: 'Melyik tulajdonság változott az első laptól a másodikig?',
    figure: (
      <LogicFig
        items={[
          { shape: 'negyzet', color: LOGIC_COLORS.sarga },
          { shape: 'negyzet', color: LOGIC_COLORS.sarga, big: true }
        ]}
      />
    ),
    options: ['a mérete', 'a színe', 'a formája', 'a lyukassága'],
    correctAnswer: 0,
    explanation: 'Mindkettő sárga, nem lyukas négyzet. Csak a méret változott: kicsiből nagy lett.'
  },
  {
    id: 'g4ex-q19',
    level: 1,
    questionTypeBadge: 'Számok 10 000-ig',
    question: 'Melyik számot mutatja a helyiérték-táblázat?',
    figure: <PlaceFig heads={['E', 'sz', 't', 'e']} values={['4', '5', '0', '6']} />,
    options: ['4506', '456', '4560', '4056'],
    correctAnswer: 0,
    explanation: '4 ezres, 5 százas, 0 tízes, 6 egyes: 4506. A tízesek helyén a 0-t is le kell írni!'
  },
  {
    id: 'g4ex-q20',
    level: 1,
    questionTypeBadge: 'Számok 10 000-ig',
    question: 'Melyik szám a „hatezer-ötszázhuszonnyolc”?',
    options: ['6528', '60 528', '6258', '652'],
    correctAnswer: 0,
    explanation: 'hatezer = 6000, ötszáz = 500, huszonnyolc = 28. Együtt: 6528.'
  },
  {
    id: 'g4ex-q21',
    level: 1,
    questionTypeBadge: 'Sorozat',
    question: 'Folytasd a sorozatot! 3750, 3800, 3850, 3900, ?',
    figure: (
      <LineFig
        from={3700}
        to={4000}
        step={50}
        labelEvery={2}
        marks={[
          { v: 3750, label: '•' },
          { v: 3800, label: '•' },
          { v: 3850, label: '•' },
          { v: 3900, label: '•' },
          { v: 3950, label: '?' }
        ]}
      />
    ),
    options: ['3950', '4000', '3910', '4900'],
    correctAnswer: 0,
    explanation: 'A sorozat 50-esével nő: 3900 + 50 = 3950.'
  },
  {
    id: 'g4ex-q22',
    level: 1,
    questionTypeBadge: 'Fele, negyede',
    question: 'Mennyi az 1000 negyede?',
    options: ['250', '500', '100', '400'],
    correctAnswer: 0,
    explanation: 'A negyede: 1000 : 4 = 250. (A fele 500, a tizede 100.)'
  },
  {
    id: 'g4ex-q23',
    level: 1,
    questionTypeBadge: 'Számszomszéd',
    question: 'Melyik a 4999 nagyobb egyes számszomszédja?',
    options: ['5000', '4998', '5999', '4000'],
    correctAnswer: 0,
    explanation: '4999 + 1 = 5000. A 4998 a kisebb szomszédja.'
  },
  {
    id: 'g4ex-q24',
    level: 1,
    questionTypeBadge: 'Kerekítés',
    question: 'Mennyi a 3862 tízesre kerekített értéke?',
    figure: <LineFig from={3860} to={3870} step={1} labelEvery={10} marks={[{ v: 3862, label: '3862' }]} />,
    options: ['3860', '3870', '3900', '3800'],
    correctAnswer: 0,
    explanation: 'Az egyesek helyén 2 áll (0, 1, 2, 3, 4 → lefelé). 3862 ≈ 3860.'
  },
  {
    id: 'g4ex-q25',
    level: 1,
    questionTypeBadge: 'Fejszámolás',
    question: 'Mennyi 3000 + 4500?',
    options: ['7500', '4800', '7000', '8500'],
    correctAnswer: 0,
    explanation: '3 ezres + 4 ezres = 7 ezres, és még 500: 7500.'
  },
  {
    id: 'g4ex-q26',
    level: 1,
    questionTypeBadge: 'Fejszámolás',
    question: 'Mennyi 10 000 − 3000?',
    options: ['7000', '6000', '9700', '3000'],
    correctAnswer: 0,
    explanation: '10 000 = 10 ezres. 10 ezres − 3 ezres = 7 ezres = 7000.'
  },
  {
    id: 'g4ex-q27',
    level: 1,
    questionTypeBadge: 'Szorzás 1000-rel',
    question: 'Mennyi 9 · 1000?',
    options: ['9000', '900', '9100', '1009'],
    correctAnswer: 0,
    explanation: '1000-rel szorzáskor 3 nullát írunk a szám végére: 9 · 1000 = 9000.'
  },
  {
    id: 'g4ex-q28',
    level: 1,
    questionTypeBadge: 'Osztás',
    question: 'Melyik szám kerül a kérdőjel helyére?',
    figure: <ChainFig start="6400" ops={[': 20']} values={['?']} />,
    options: ['320', '32', '3200', '420'],
    correctAnswer: 0,
    explanation: '6400 : 20 = 640 : 2 = 320. Ellenőrzés: 320 · 20 = 6400.'
  },
  {
    id: 'g4ex-q29',
    level: 1,
    questionTypeBadge: 'Írásbeli összeadás',
    question: 'Számold ki írásban: 277 + 565 = ?',
    figure: <ColFig top="277" bottom="565" op="+" />,
    options: ['842', '732', '832', '742'],
    correctAnswer: 0,
    explanation: '7 + 5 = 12, leírom a 2-t, maradt 1. 7 + 6 + 1 = 14, leírom a 4-et, maradt 1. 2 + 5 + 1 = 8. Az összeg 842.'
  },
  {
    id: 'g4ex-q30',
    level: 1,
    questionTypeBadge: 'Páros, páratlan',
    question: 'Melyik szám páros?',
    options: ['694', '471', '479', '963'],
    correctAnswer: 0,
    explanation: 'Páros az a szám, amelynek az egyesek helyén 0, 2, 4, 6 vagy 8 áll. A 694 végén 4 van.'
  },

  // ===================== 2. SZINT =====================
  {
    id: 'g4ex-q31',
    level: 2,
    questionTypeBadge: 'Helyiérték',
    question: 'Melyik számra gondoltam? 18 e + 35 t',
    options: ['368', '1835', '3518', '53'],
    correctAnswer: 0,
    explanation: '35 tízes = 350, 18 egyes = 18. Összeadva: 350 + 18 = 368.'
  },
  {
    id: 'g4ex-q32',
    level: 2,
    questionTypeBadge: 'Sorba rendezés',
    question: 'Melyik a csökkenő sorrend?',
    figure: <CardsFig cards={['471', '694', '368', '479', '963']} color="#ea580c" />,
    options: ['963, 694, 479, 471, 368', '368, 471, 479, 694, 963', '963, 694, 471, 479, 368', '963, 479, 471, 694, 368'],
    correctAnswer: 0,
    explanation: 'Csökkenő: a legnagyobbtól a legkisebbig. 963 > 694 > 479 > 471 > 368 (a 479 és 471 közül a tízesek egyformák, az egyesek döntenek).'
  },
  {
    id: 'g4ex-q33',
    level: 2,
    questionTypeBadge: 'Valódi érték',
    question: 'Melyik számban 300 a százasok valódi értéke?',
    figure: <CardsFig cards={['471', '694', '368', '479', '963']} color="#ea580c" />,
    options: ['368', '963', '694', '471'],
    correctAnswer: 0,
    explanation: 'A 368-ban a százasok helyén 3 áll, ennek valódi értéke 300. A 963-ban a 3 az egyesek helyén van, ott csak 3-at ér.'
  },
  {
    id: 'g4ex-q34',
    level: 2,
    questionTypeBadge: 'Számszomszéd',
    question: 'Melyik a 951 nagyobb százas számszomszédja?',
    figure: <NeighbourFig num="951" side="nagyobb" kind="százas" />,
    options: ['1000', '960', '952', '900'],
    correctAnswer: 0,
    explanation: 'A 951 a 900 és az 1000 között van. A nagyobb százas szomszéd az 1000.'
  },
  {
    id: 'g4ex-q35',
    level: 2,
    questionTypeBadge: 'Összegpiramis',
    question: 'Felülre mindig az alatta lévő két szám összege kerül. Melyik szám kerül az A helyére?',
    figure: <PyrFig rows={[['A'], ['', ''], [321, 135, 228]]} />,
    options: ['819', '684', '456', '363'],
    correctAnswer: 0,
    explanation: 'Középen: 321 + 135 = 456 és 135 + 228 = 363. A csúcson: 456 + 363 = 819. (Nem elég a három alsó számot összeadni: az 684 lenne.)'
  },
  {
    id: 'g4ex-q36',
    level: 2,
    questionTypeBadge: 'Kerekítés',
    question: 'Mennyi a 128 százasra kerekített értéke?',
    figure: <LineFig from={100} to={200} step={10} labelEvery={10} marks={[{ v: 128, label: '128' }]} />,
    options: ['100', '130', '200', '120'],
    correctAnswer: 0,
    explanation: 'Százasra kerekítésnél a tízesek számjegye dönt: 2 → lefelé. 128 ≈ 100. (A 130 a tízesre kerekített érték.)'
  },
  {
    id: 'g4ex-q37',
    level: 2,
    questionTypeBadge: 'Nyitott mondat',
    question: 'Melyik szám teszi igazzá? 860 − 470 < □ < 290 + 190',
    options: ['400', '390', '480', '500'],
    correctAnswer: 0,
    explanation: '860 − 470 = 390 és 290 + 190 = 480. Tehát 390 < □ < 480. A 400 jó; a 390 és a 480 nem, mert egyenlő nem lehet.'
  },
  {
    id: 'g4ex-q38',
    level: 2,
    questionTypeBadge: 'Nyitott mondat',
    question: 'Hány szám teszi igazzá? 810 : 90 > □ > 160 : 80 · 2',
    options: ['4', '5', '3', '6'],
    correctAnswer: 0,
    explanation: '810 : 90 = 9, és 160 : 80 · 2 = 2 · 2 = 4. Tehát 9 > □ > 4: az 5, 6, 7, 8 – ez 4 szám.'
  },
  {
    id: 'g4ex-q39',
    level: 2,
    questionTypeBadge: 'Műveleti sorrend',
    question: 'Mennyi (370 + 170) : 60?',
    options: ['9', '90', '8', '540'],
    correctAnswer: 0,
    explanation: 'Először a zárójel: 370 + 170 = 540. Aztán 540 : 60 = 9.'
  },
  {
    id: 'g4ex-q40',
    level: 2,
    questionTypeBadge: 'Becslés',
    question: 'Becsüld meg az 564 + 138 összeget százasra kerekített értékekkel!',
    options: ['700', '600', '800', '702'],
    correctAnswer: 0,
    explanation: '564 ≈ 600, 138 ≈ 100. A becslés: 600 + 100 = 700. (A 702 a pontos összeg, nem a becslés.)'
  },
  {
    id: 'g4ex-q41',
    level: 2,
    questionTypeBadge: 'Írásbeli kivonás',
    question: 'Számold ki írásban: 944 − 576 = ?',
    figure: <ColFig top="944" bottom="576" op="−" />,
    options: ['368', '432', '478', '468'],
    correctAnswer: 0,
    explanation: '6 meg 8 az 14, leírom a 8-at, maradt 1. 7 + 1 = 8, 8 meg 6 az 14, leírom a 6-ot, maradt 1. 5 + 1 = 6, 6 meg 3 az 9. Az eredmény 368. Ellenőrzés: 368 + 576 = 944.'
  },
  {
    id: 'g4ex-q42',
    level: 2,
    questionTypeBadge: 'Írásbeli szorzás',
    question: 'Számold ki írásban: 243 · 4 = ?',
    figure: <MulFig a="243" b="4" resultLen={3} />,
    options: ['972', '862', '962', '872'],
    correctAnswer: 0,
    explanation: '4 · 3 = 12, leírom a 2-t, maradt 1. 4 · 4 = 16, meg 1 az 17, leírom a 7-et, maradt 1. 4 · 2 = 8, meg 1 az 9. A szorzat 972.'
  },
  {
    id: 'g4ex-q43',
    level: 2,
    questionTypeBadge: 'Gondoltam egy számra',
    question: 'Melyik számra gondoltam? A 134 kétszeresénél 184-gyel nagyobb.',
    options: ['452', '636', '318', '84'],
    correctAnswer: 0,
    explanation: 'A 134 kétszerese: 134 · 2 = 268. Ennél 184-gyel nagyobb: 268 + 184 = 452.'
  },
  {
    id: 'g4ex-q44',
    level: 2,
    questionTypeBadge: 'Szöveges feladat',
    question: 'Pista bácsi tanyája 683 m-re van a tóparttól, ahol egy 87 m hosszú stég van. Hány métert sétál a stég túlsó végéig?',
    figure: <PierFig />,
    options: ['770 m', '596 m', '760 m', '670 m'],
    correctAnswer: 0,
    explanation: 'A partig 683 m, aztán végig a stégen 87 m: 683 + 87 = 770 m.'
  },
  {
    id: 'g4ex-q45',
    level: 2,
    questionTypeBadge: 'Szöveges feladat',
    question: 'Egy előadáson 280 gyerek 10 év alatti, 460 gyerek 10 és 18 év közötti volt. A felnőttekkel együtt 1000-en voltak. Hány felnőtt volt ott?',
    options: ['260', '740', '280', '360'],
    correctAnswer: 0,
    explanation: 'A gyerekek: 280 + 460 = 740. A felnőttek: 1000 − 740 = 260.'
  },
  {
    id: 'g4ex-q46',
    level: 2,
    questionTypeBadge: 'Szöveges feladat',
    question: 'Karesz 4 napos kerékpártúrán volt. Az első 3 napon 56–56 km-t tekertek. A teljes út 213 km. Hány km jutott az utolsó napra?',
    options: ['45 km', '157 km', '101 km', '168 km'],
    correctAnswer: 0,
    explanation: 'Az első 3 nap: 3 · 56 = 168 km. Az utolsó nap: 213 − 168 = 45 km.'
  },
  {
    id: 'g4ex-q47',
    level: 2,
    questionTypeBadge: 'Római szám',
    question: 'Melyik számot jelöli ez a római szám?',
    figure: <RomanFig text="XXXIX" />,
    options: ['39', '41', '31', '29'],
    correctAnswer: 0,
    explanation: 'XXX = 30, IX = 9 (az I a X előtt áll, ezért 10 − 1). 30 + 9 = 39.'
  },
  {
    id: 'g4ex-q48',
    level: 2,
    questionTypeBadge: 'Római szám',
    question: 'Melyik római szám a legnagyobb?',
    options: ['XXIV', 'XIX', 'XXI', 'XVIII'],
    correctAnswer: 0,
    explanation: 'XXIV = 24, XIX = 19, XXI = 21, XVIII = 18. A legnagyobb a XXIV.'
  },
  {
    id: 'g4ex-q49',
    level: 2,
    questionTypeBadge: 'Logikai lapok',
    question: 'A 48 lapból csak azok maradnak, amelyekre igaz: „Négyzet vagy kör.” Hány lap marad?',
    figure: (
      <LogicFig
        items={[
          { shape: 'negyzet', color: LOGIC_COLORS.kek, big: true },
          { shape: 'kor', color: LOGIC_COLORS.piros, big: true },
          { shape: 'haromszog', color: LOGIC_COLORS.zold, big: true }
        ]}
      />
    ),
    options: ['32', '16', '24', '36'],
    correctAnswer: 0,
    explanation: 'Mindhárom formából 16 lap van (48 : 3 = 16). A háromszögek kimennek: 48 − 16 = 32.'
  },
  {
    id: 'g4ex-q50',
    level: 2,
    questionTypeBadge: 'Logikai lapok',
    question: 'Hány piros lap van a logikai készletben?',
    options: ['12', '4', '24', '16'],
    correctAnswer: 0,
    explanation: '4 szín van, és mindegyikből ugyanannyi: 48 : 4 = 12 piros lap.'
  },
  {
    id: 'g4ex-q51',
    level: 2,
    questionTypeBadge: 'Sorozat',
    question: 'Folytasd a sorozatot! 8010, 8000, 7990, 7980, ?',
    options: ['7970', '7880', '7960', '8000'],
    correctAnswer: 0,
    explanation: 'A sorozat 10-esével csökken: 7980 − 10 = 7970.'
  },
  {
    id: 'g4ex-q52',
    level: 2,
    questionTypeBadge: 'Sorba rendezés',
    question: 'Melyik a legkisebb szám?',
    figure: <CardsFig cards={['6855', '6585', '6558', '5856', '5865', '5586']} color="#db2777" />,
    options: ['5586', '5856', '6558', '5865'],
    correctAnswer: 0,
    explanation: 'Először az ezreseket nézzük: az 5-ös kezdetűek kisebbek. Közülük a százasok: 5586-ban 5 százas van, a többiben 8. A legkisebb: 5586.'
  },
  {
    id: 'g4ex-q53',
    level: 2,
    questionTypeBadge: 'Fele, negyede',
    question: 'Mennyi a 10 000 negyede?',
    options: ['2500', '5000', '250', '1000'],
    correctAnswer: 0,
    explanation: 'A 10 000 fele 5000, ennek a fele 2500. A negyede tehát 2500.'
  },
  {
    id: 'g4ex-q54',
    level: 2,
    questionTypeBadge: 'Műveletlánc',
    question: 'Melyik szám kerül a kérdőjel helyére?',
    figure: <ChainFig start="6400" ops={[': 20', '· 5']} values={['320', '?']} />,
    options: ['1600', '320', '1500', '160'],
    correctAnswer: 0,
    explanation: '6400 : 20 = 320, aztán 320 · 5 = 1600.'
  },
  {
    id: 'g4ex-q55',
    level: 2,
    questionTypeBadge: 'Írásbeli kivonás',
    question: 'Tónitól Tati 8350 m-re lakik, Teó 5640 m-rel közelebb. Milyen messze lakik Tónitól Teó?',
    figure: <DistanceFig />,
    options: ['2710 m', '3710 m', '3310 m', '2610 m'],
    correctAnswer: 0,
    explanation: '„Közelebb” → kivonás: 8350 − 5640 = 2710 m. A százasoknál 3-ból nem tudunk 6-ot elvenni, ezért váltunk: 13 − 6 = 7.'
  },
  {
    id: 'g4ex-q56',
    level: 2,
    questionTypeBadge: 'Kerekítés',
    question: 'Mennyi a 7451 százasra kerekített értéke?',
    figure: <LineFig from={7400} to={7500} step={10} labelEvery={10} marks={[{ v: 7451, label: '7451' }]} />,
    options: ['7500', '7400', '7450', '8000'],
    correctAnswer: 0,
    explanation: 'A tízesek helyén 5 áll → felfelé kerekítünk: 7451 ≈ 7500.'
  },
  {
    id: 'g4ex-q57',
    level: 2,
    questionTypeBadge: 'Szöveges feladat',
    question: 'Az Öreg Tölgy falatozóban hétfőtől péntekig 4000 kobold ebédelt, minden nap ugyanannyi. Hányan ebédeltek egy nap?',
    options: ['800', '1000', '8000', '80'],
    correctAnswer: 0,
    explanation: 'Hétfőtől péntekig 5 nap van. 4000 : 5 = 800 kobold naponta. (A 1000 akkor lenne, ha 4 nappal osztanál.)'
  },
  {
    id: 'g4ex-q58',
    level: 2,
    questionTypeBadge: 'Írásbeli összeadás',
    question: 'Számold ki írásban: 3842 + 2569 = ?',
    figure: <ColFig top="3842" bottom="2569" op="+" />,
    options: ['6411', '5301', '5411', '6401'],
    correctAnswer: 0,
    explanation: '2 + 9 = 11 (1, maradt 1); 4 + 6 + 1 = 11 (1, maradt 1); 8 + 5 + 1 = 14 (4, maradt 1); 3 + 2 + 1 = 6. Az összeg 6411.'
  },
  {
    id: 'g4ex-q59',
    level: 2,
    questionTypeBadge: 'Nyitott mondat',
    question: 'Melyik szám kerül a ● helyére? ● − 539 = 289',
    options: ['828', '250', '818', '728'],
    correctAnswer: 0,
    explanation: 'A kisebbítendőt összeadással kapjuk: 289 + 539 = 828. Ellenőrzés: 828 − 539 = 289.'
  },
  {
    id: 'g4ex-q60',
    level: 2,
    questionTypeBadge: 'Szöveges feladat',
    question: 'Zsolti bácsi 2 db 280 dkg-os pontyot és 10 db 20 dkg-os keszeget fogott. Hány dekagramm hal ez összesen?',
    options: ['760 dkg', '580 dkg', '310 dkg', '660 dkg'],
    correctAnswer: 0,
    explanation: 'Pontyok: 2 · 280 = 560 dkg. Keszegek: 10 · 20 = 200 dkg. Együtt: 560 + 200 = 760 dkg (ez majdnem 8 kg).'
  },

  // ===================== 3. SZINT =====================
  {
    id: 'g4ex-q61',
    level: 3,
    questionTypeBadge: 'Összegpiramis',
    question: 'Felülre a két alatta lévő szám összege kerül. Melyik szám kerül az E helyére?',
    figure: <PyrFig rows={[['962'], ['D', '453'], ['E', '128', 'F']]} fill="#bae6fd" stroke="#0284c7" />,
    options: ['381', '834', '325', '637'],
    correctAnswer: 0,
    explanation: 'Előbb a D: 962 − 453 = 509. Aztán E + 128 = 509, tehát E = 509 − 128 = 381.'
  },
  {
    id: 'g4ex-q62',
    level: 3,
    questionTypeBadge: 'Összegpiramis',
    question: 'Melyik szám kerül a piramis csúcsára, az I helyére?',
    figure: <PyrFig rows={[['I'], ['H', '376'], ['292', 'G', '137']]} fill="#bbf7d0" stroke="#16a34a" />,
    options: ['907', '805', '531', '770'],
    correctAnswer: 0,
    explanation: 'G = 376 − 137 = 239. H = 292 + 239 = 531. I = 531 + 376 = 907.'
  },
  {
    id: 'g4ex-q63',
    level: 3,
    questionTypeBadge: 'Kerekítés',
    question: 'A zöld piramis számai: 292, 239, 137, 531, 376, 907. Melyeknek egyezik meg a tízesre kerekített értéke a kisebb tízes számszomszédjával?',
    options: ['292 és 531', '137 és 907', '239 és 376', '292, 531 és 907'],
    correctAnswer: 0,
    explanation: 'Lefelé kerekítünk, ha az egyesek helyén 0, 1, 2, 3, 4 áll: 292 ≈ 290 és 531 ≈ 530. A 907 ≈ 910, az felfelé megy.'
  },
  {
    id: 'g4ex-q64',
    level: 3,
    questionTypeBadge: 'Kerekítés és szorzás',
    question: 'A téglalapban lévő szám tízesre kerekített értékét szorozd meg 9-cel!',
    figure: <RoundBoxFig value={75} factors={[6, 8, 9, 7]} pick={9} />,
    options: ['720', '675', '630', '810'],
    correctAnswer: 0,
    explanation: '75 ≈ 80 (az 5-öst felfelé kerekítjük). 80 · 9 = 720. (A 675 a kerekítés nélküli szorzat.)'
  },
  {
    id: 'g4ex-q65',
    level: 3,
    questionTypeBadge: 'Kerekítés és szorzás',
    question: 'A téglalapban lévő szám tízesre kerekített értékét szorozd meg 4-gyel!',
    figure: <RoundBoxFig value={115} factors={[2, 3, 4, 5]} color="#ea580c" pick={4} />,
    options: ['480', '460', '440', '400'],
    correctAnswer: 0,
    explanation: '115 ≈ 120. 120 · 4 = 480.'
  },
  {
    id: 'g4ex-q66',
    level: 3,
    questionTypeBadge: 'Műveletek szövegből',
    question: 'Hány km a Fonyód–Siófok út? „A 312-nek és a 89 háromszorosának a különbsége.”',
    options: ['45 km', '669 km', '223 km', '579 km'],
    correctAnswer: 0,
    explanation: 'Előbb a háromszoros: 89 · 3 = 267. A különbség: 312 − 267 = 45 km. (A 669 akkor jön ki, ha előbb kivonsz, aztán szorzol.)'
  },
  {
    id: 'g4ex-q67',
    level: 3,
    questionTypeBadge: 'Műveletek szövegből',
    question: 'Hány km a Keszthely–Balatonfüred út? „A 154 négyszeresének és az 539-nek a különbsége.”',
    options: ['77 km', '616 km', '177 km', '87 km'],
    correctAnswer: 0,
    explanation: '154 · 4 = 616. A különbség: 616 − 539 = 77 km.'
  },
  {
    id: 'g4ex-q68',
    level: 3,
    questionTypeBadge: 'Nyitott mondat',
    question: 'Melyik a LEGNAGYOBB szám, amely igazzá teszi? 37 · 10 − 350 > □',
    options: ['19', '20', '350', '2'],
    correctAnswer: 0,
    explanation: '37 · 10 = 370, 370 − 350 = 20. A 20 > □ igaz: 0, 1, 2 … 19. A legnagyobb a 19 (a 20 nem, mert 20 > 20 hamis).'
  },
  {
    id: 'g4ex-q69',
    level: 3,
    questionTypeBadge: 'Műveletsor',
    question: 'Mennyi 980 − 450 − 50 + 320 + 170?',
    options: ['970', '870', '1070', '470'],
    correctAnswer: 0,
    explanation: 'Balról jobbra: 980 − 450 = 530, 530 − 50 = 480, 480 + 320 = 800, 800 + 170 = 970.'
  },
  {
    id: 'g4ex-q70',
    level: 3,
    questionTypeBadge: 'Fejtörő',
    question: 'Az azonos színű képek azonos számot takarnak. Melyik számot takarja a barna sapka?',
    figure: <FairyFig ask="brown" />,
    options: ['30', '40', '120', '180'],
    correctAnswer: 0,
    explanation: 'Kék szárny = 60, így a zöld sapka = 60 + 60 + 60 = 180. 60 + rózsaszín = 180, tehát rózsaszín = 120. 120 − 3 barna = 1 barna, vagyis 4 barna = 120, egy barna = 30.'
  },
  {
    id: 'g4ex-q71',
    level: 3,
    questionTypeBadge: 'Fejtörő',
    question: 'Az azonos színű képek azonos számot takarnak. Melyik számot takarja a zöld szárny?',
    figure: <FairyFig ask="green" />,
    options: ['70', '60', '210', '90'],
    correctAnswer: 0,
    explanation: 'Zöld sapka = 180, barna sapka = 30. Három zöld szárny = 30 + 180 = 210, egy zöld szárny = 210 : 3 = 70.'
  },
  {
    id: 'g4ex-q72',
    level: 3,
    questionTypeBadge: 'Műveletlánc',
    question: 'Melyik szám kerül a lánc végére?',
    figure: <ChainFig start="6400" ops={[': 20', '· 5', ': 80', '· 100']} values={['', '', '', '?']} />,
    options: ['2000', '20', '200', '1600'],
    correctAnswer: 0,
    explanation: '6400 : 20 = 320; 320 · 5 = 1600; 1600 : 80 = 20; 20 · 100 = 2000.'
  },
  {
    id: 'g4ex-q73',
    level: 3,
    questionTypeBadge: 'Dobókocka-játék',
    question: 'Az első két kocka pöttyeinek összegét megszorozzuk 10-zel, aztán a harmadik kocka számával. Mi az eredmény?',
    figure: <DiceFig />,
    options: ['480', '303', '140', '4800'],
    correctAnswer: 0,
    explanation: '(3 + 5) · 10 · 6 = 8 · 10 · 6 = 80 · 6 = 480. A zárójel miatt előbb összeadunk!'
  },
  {
    id: 'g4ex-q74',
    level: 3,
    questionTypeBadge: 'Római szám',
    question: 'Melyik római szám áll ugyanazokból a jelekből (X, V, I), mint a XVI, de kisebb nála?',
    figure: <RomanFig text="XVI" />,
    options: ['XIV', 'XV', 'XVII', 'IVX'],
    correctAnswer: 0,
    explanation: 'XVI = 16. Ha az I a V elé kerül, kivonunk: XIV = 10 + 4 = 14. Az IVX nem helyes római szám.'
  },
  {
    id: 'g4ex-q75',
    level: 3,
    questionTypeBadge: 'Zárójel',
    question: 'Hová kell a zárójelet tenni, hogy az eredmény 302 legyen? 6 · 180 + 120 : 4 + 2',
    options: ['(6 · 180 + 120) : 4 + 2', '6 · (180 + 120) : 4 + 2', '6 · 180 + 120 : (4 + 2)', '6 · 180 + (120 : 4 + 2)'],
    correctAnswer: 0,
    explanation: '(1080 + 120) : 4 + 2 = 1200 : 4 + 2 = 300 + 2 = 302. A többi: 452, 1100 és 1112.'
  },
  {
    id: 'g4ex-q76',
    level: 3,
    questionTypeBadge: 'Igazságos osztozás',
    question: 'Teó egy tálra 360 mogyorót és 240 diót tett. Mindenkinek ugyanannyi mogyoró és ugyanannyi dió jutott, és nem maradt semmi. Legfeljebb hányan ehettek?',
    options: ['120', '600', '60', '240'],
    correctAnswer: 0,
    explanation: '120-an: 360 : 120 = 3 mogyoró és 240 : 120 = 2 dió mindenkinek. Többen nem lehetnek, mert akkor már nem jönne ki egyformán.'
  },
  {
    id: 'g4ex-q77',
    level: 3,
    questionTypeBadge: 'Szorzatrács',
    question: 'A téglalapok 40 és 140 közötti kerek tízeseket rejtenek. A vonalon a két szám szorzata áll. Melyik számot rejti az A?',
    figure: (
      <QFig h={130}>
        <ProductGrid x={60} y={30} show={['A', 'B', 'D', 'E']} dx={120} dy={70} />
      </QFig>
    ),
    options: ['110', '80', '100', '120'],
    correctAnswer: 0,
    explanation: 'A · D = 5500 és A · B = 8800. Ha A = 110, akkor D = 50 és B = 80 – mindkettő kerek tízes 40 és 140 között. Ellenőrzés: B · E = 80 · 120 = 9600, D · E = 50 · 120 = 6000. ✓'
  },
  {
    id: 'g4ex-q78',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    question: 'Tódi hétfőtől kezdve minden nap 10 fabatkát tett a perselyébe. Egy este a persely eltört, és 3550 fabatka szóródott ki. Melyik napon történt?',
    options: ['pénteken', 'csütörtökön', 'szombaton', 'hétfőn'],
    correctAnswer: 0,
    explanation: '3550 : 10 = 355 nap. 50 hét = 350 nap, ez hétfőtől vasárnapig ér véget. Utána még 5 nap: hétfő, kedd, szerda, csütörtök, péntek.'
  },
  {
    id: 'g4ex-q79',
    level: 3,
    questionTypeBadge: 'Szabály',
    question: 'Melyik szám kerül a kérdőjel helyére?',
    figure: <RuleTableFig sq={['50', '25', '70']} tri={['500', '1000', '?']} />,
    options: ['100', '1430', '1400', '200'],
    correctAnswer: 0,
    explanation: '20 · 70 = 1400. 1400 + ▲ = 1500, tehát ▲ = 100.'
  },
  {
    id: 'g4ex-q80',
    level: 3,
    questionTypeBadge: 'Szabály',
    question: 'Melyik szám kerül a kérdőjel helyére?',
    figure: <RuleTableFig sq={['50', '?']} tri={['500', '900']} />,
    options: ['30', '600', '60', '300'],
    correctAnswer: 0,
    explanation: '1500 − 900 = 600, tehát 20 · ■ = 600. ■ = 600 : 20 = 30.'
  },
  {
    id: 'g4ex-q81',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    question: 'Levendulás szörpből 2700 dl fogyott. Bodzásból 1300 dl-rel több, kamillásból 1400 dl-rel kevesebb, mint levendulásból. Mennyi fogyott összesen?',
    options: ['8000 dl', '5300 dl', '10 800 dl', '5400 dl'],
    correctAnswer: 0,
    explanation: 'Bodzás: 2700 + 1300 = 4000 dl. Kamillás: 2700 − 1400 = 1300 dl. Összesen: 2700 + 4000 + 1300 = 8000 dl.'
  },
  {
    id: 'g4ex-q82',
    level: 3,
    questionTypeBadge: 'Gondoltam egy számra',
    question: 'Melyik számra gondoltam? A 156 és a 168 összegének a háromszorosa.',
    options: ['972', '660', '324', '962'],
    correctAnswer: 0,
    explanation: 'Előbb az összeg: 156 + 168 = 324. A háromszorosa: 324 · 3 = 972. (A 660 akkor jön ki, ha csak a 168-at szorzod.)'
  },
  {
    id: 'g4ex-q83',
    level: 3,
    questionTypeBadge: 'Gondoltam egy számra',
    question: 'Melyik számra gondoltam? Az 1000 negyedénél 163-mal nagyobb.',
    options: ['413', '87', '663', '1163'],
    correctAnswer: 0,
    explanation: 'Az 1000 negyede: 1000 : 4 = 250. Ennél 163-mal nagyobb: 250 + 163 = 413.'
  },
  {
    id: 'g4ex-q84',
    level: 3,
    questionTypeBadge: 'Műveleti sorrend',
    question: 'Mennyi 870 − 490 : 7?',
    options: ['800', '380', '830', '54'],
    correctAnswer: 0,
    explanation: 'Előbb osztunk: 490 : 7 = 70. Aztán: 870 − 70 = 800. (Ha balról jobbra számolsz, 380 : 7 nem is jön ki maradék nélkül!)'
  },
  {
    id: 'g4ex-q85',
    level: 3,
    questionTypeBadge: 'Számkártyák',
    question: 'Melyik a legnagyobb páros négyjegyű szám, amit ezekből a kártyákból kirakhatsz? (Mindet egyszer használd!)',
    figure: <CardsFig cards={['5', '2', '7', '1']} />,
    options: ['7512', '7521', '7152', '5712'],
    correctAnswer: 0,
    explanation: 'Páros számnak a végére a 2 kell. A többit csökkenő sorrendben tesszük elé: 7, 5, 1. Így 7512. A 7521 nagyobb, de páratlan.'
  },
  {
    id: 'g4ex-q86',
    level: 3,
    questionTypeBadge: 'Kerekítés',
    question: 'Melyik a LEGKISEBB szám, amelynek ezresre kerekített értéke 6000?',
    figure: <LineFig from={5000} to={7000} step={500} labelEvery={2} marks={[{ v: 6000, label: '6000' }]} />,
    options: ['5500', '5000', '5999', '6499'],
    correctAnswer: 0,
    explanation: 'Ezresre kerekítésnél a százasok döntenek: 5500-tól már felfelé, 6000-re kerekítünk. 5499 ≈ 5000 lenne. (A 6499 a legnagyobb ilyen szám.)'
  },
  {
    id: 'g4ex-q87',
    level: 3,
    questionTypeBadge: 'Írásbeli szorzás',
    question: 'Számold ki írásban: 327 · 3 = ?',
    figure: <MulFig a="327" b="3" resultLen={3} />,
    options: ['981', '961', '9621', '971'],
    correctAnswer: 0,
    explanation: '3 · 7 = 21, leírom az 1-et, maradt 2. 3 · 2 = 6, meg 2 az 8. 3 · 3 = 9. A szorzat 981. Becslés: 300 · 3 = 900 – közel van.'
  },
  {
    id: 'g4ex-q88',
    level: 3,
    questionTypeBadge: 'Írásbeli kivonás',
    question: 'Számold ki: 10 000 − 3768 = ?',
    figure: <ColFig top="10000" bottom="3768" op="−" result="????" />,
    options: ['6232', '7232', '6342', '7768'],
    correctAnswer: 0,
    explanation: 'Ellenőrizd összeadással: 6232 + 3768 = 10 000. ✓ Pótlással is mehet: 3768-tól 3770 (2), 3800 (30), 4000 (200), 10 000 (6000): 6232.'
  },
  {
    id: 'g4ex-q89',
    level: 3,
    questionTypeBadge: 'Rontó játék',
    question: 'A sorra igaz: „Minden elem sárga.” Melyik lap rontja el az állítást, ha a sorhoz teszed?',
    figure: (
      <LogicFig
        items={[
          { shape: 'haromszog', color: LOGIC_COLORS.sarga, holed: true },
          { shape: 'kor', color: LOGIC_COLORS.sarga }
        ]}
        tail="+ ?"
      />
    ),
    options: ['kicsi kék kör', 'nagy sárga négyzet', 'kicsi sárga lyukas kör', 'nagy sárga háromszög'],
    correctAnswer: 0,
    explanation: 'Az állítás csak akkor romlik el, ha nem sárga lap kerül a sorba. A kicsi kék kör ilyen.'
  },
  {
    id: 'g4ex-q90',
    level: 3,
    questionTypeBadge: 'Logikai feladat',
    question: 'Attila és Zoli nem zöld sátorban lakott. Zoli, Norbi és Levente nem páros sorszámú sátorban. Botond Levente szomszédja. Ki lakott a 4. sátorban?',
    figure: (
      <QFig h={100}>
        <g transform="scale(0.8)">
          {TENT_COLORS.map((c, i) => (
            <Tent key={i} x={35 + i * 57.5} y={56} color={c} n={i + 1} name={i === 3 ? '?' : ''} />
          ))}
        </g>
      </QFig>
    ),
    options: ['Botond', 'Levente', 'Norbi', 'Attila'],
    correctAnswer: 0,
    explanation: 'Attila és Zoli a sárga (2., 5.) sátrakban van; Zoli páratlan, így az 5.-ben, Attila a 2.-ban. Norbi és Levente nem lehet a 4.-ben, így ott Botond lakik (Levente a 3.-ban, mellette).'
  }
];

export const CountingExamQuiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => {
  return (
    <QuizTemplate
      grade={4}
      chapterId="szamolas-10000-ig"
      topicId="g4-count-tudasproba-quiz"
      subtopicId="megallo-kitekinto-osszefoglalas"
      title="13. Megálló, Kitekintő – tudáspróba"
      subtitle="90 feladat 3 szinten: az egész I. fejezet – számok 10 000-ig, kerekítés, fejszámolás, írásbeli műveletek, műveleti sorrend, nyitott mondatok, szöveges feladatok, római számok, logikai lapok."
      badge="4. OSZTÁLY • I. SZÁMOLÁS 0-TÓL 10 000-IG • TUDÁSPRÓBA"
      questions={COUNTING_EXAM_QUESTIONS}
      cheatSheets={[
        {
          title: 'Számok és kerekítés',
          items: [
            'Helyiértékek: E (ezres), sz (százas), t (tízes), e (egyes): 4506 = 4 E + 5 sz + 0 t + 6 e',
            'Számszomszédok: 589 → tízes: 580 és 590, százas: 500 és 600',
            'Kerekítés: 0, 1, 2, 3, 4 → le; 5, 6, 7, 8, 9 → fel (75 ≈ 80, 7451 ≈ 7500)',
            'Római számok: I = 1, V = 5, X = 10; IV = 4, IX = 9, XIX = 19'
          ]
        },
        {
          title: 'Műveletek',
          items: [
            'Műveleti sorrend: zárójel → szorzás, osztás → összeadás, kivonás',
            '· 10, · 100, · 1000: 1, 2, 3 nulla a végére; : 10, : 100, : 1000: elhagyjuk őket',
            'Írásban jobbról balra számolunk, a maradékot (átvitelt) nem felejtjük el',
            'Ellenőrzés: kivonást összeadással, osztást szorzással'
          ]
        },
        {
          title: 'Feladatmegoldás',
          items: [
            'Nyitott mondat: □ + 254 = 522 → □ = 522 − 254 = 268',
            '„kétszerese” = · 2, „fele” = : 2, „negyede” = : 4, „tizede” = : 10',
            '„-val nagyobb” = +, „-val kisebb / közelebb” = −',
            'Logikai lapok: 4 szín · 3 forma · 2 méret · 2 (lyukas, nem lyukas) = 48 lap'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <CountingExamMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <CountingExamSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default CountingExamQuiz;
