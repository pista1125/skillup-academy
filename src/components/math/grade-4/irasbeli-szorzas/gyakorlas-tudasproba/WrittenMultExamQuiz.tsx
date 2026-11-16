import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { WrittenMultExamMatcher } from './WrittenMultExamMatcher';
import { WrittenMultExamSorter } from './WrittenMultExamSorter';
import { WrittenMul2Layout, WrittenMul2LayoutProps } from '../irasbeli-szorzas/WrittenMulTwoDigitFigures';
import { BuffetPriceSvg, ForestTrainSvg, OrchardSvg, ArrowCycleSvg } from './WrittenMultExamFigures';

// ---------------------------------------------------------------------------
// Kérdésábrák – belső SVG-segédek
// ---------------------------------------------------------------------------
const C_UNK = '#dc2626';
const FIG = 'w-full max-w-[280px] h-auto mx-auto';

const QMul2: React.FC<WrittenMul2LayoutProps> = (props) => <WrittenMul2Layout {...props} className={FIG} />;

const QFig: React.FC<{ children: React.ReactNode; h?: number }> = ({ children, h = 150 }) => (
  <svg viewBox={`0 0 240 ${h}`} className={FIG} xmlns="http://www.w3.org/2000/svg" fontFamily="system-ui, sans-serif">
    <rect x="1" y="1" width="238" height={h - 2} rx="10" fill="#f8fafc" stroke="#cbd5e1" />
    {children}
  </svg>
);

/** Egyszerű adattáblázat. */
const QTable: React.FC<{ title: string; rows: { k: string; v: string }[] }> = ({ title, rows }) => (
  <QFig h={38 + rows.length * 22}>
    <text x="120" y="22" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1e293b">{title}</text>
    {rows.map((r, i) => (
      <g key={r.k}>
        <rect x="16" y={30 + i * 22} width="208" height="20" rx="4" fill={i % 2 ? '#fff1f2' : '#ffe4e6'} />
        <text x="24" y={44 + i * 22} fontSize="11" fontWeight="bold" fill="#334155">{r.k}</text>
        <text x="216" y={44 + i * 22} textAnchor="end" fontSize="12" fontWeight="bold" fill={r.v.includes('?') ? C_UNK : '#9f1239'}>{r.v}</text>
      </g>
    ))}
  </QFig>
);

/** Nyíllánc. */
const QChain: React.FC<{ start: string; ops: string[]; boxes: string[] }> = ({ start, ops, boxes }) => {
  const step = (230 - 40) / ops.length;
  return (
    <QFig h={96}>
      <defs>
        <marker id="weArr" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
          <path d="M0,0 L7,3.5 L0,7 z" fill="#2563eb" />
        </marker>
      </defs>
      <text x="22" y="60" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#0f172a">{start}</text>
      {ops.map((op, i) => {
        const x0 = 40 + i * step;
        const bx = x0 + step - 42;
        return (
          <g key={i}>
            <line x1={x0} y1="55" x2={bx - 2} y2="55" stroke="#2563eb" strokeWidth="1.8" markerEnd="url(#weArr)" />
            <text x={(x0 + bx) / 2} y="34" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#2563eb">{op}</text>
            <rect x={bx} y="40" width="42" height="28" rx="4" fill="#fff" stroke="#0f172a" strokeWidth="1.4" />
            <text x={bx + 21} y="59" textAnchor="middle" fontSize="12" fontWeight="bold" fill={boxes[i] === '?' ? C_UNK : '#1d4ed8'}>{boxes[i]}</text>
          </g>
        );
      })}
    </QFig>
  );
};

/** Kétsoros táblázat (mennyiség → ár). */
const QPairTable: React.FC<{ head: [string, string]; cols: [string, string][] }> = ({ head, cols }) => {
  const w = 180 / cols.length;
  return (
    <QFig h={96}>
      <rect x="10" y="16" width="44" height="30" fill="#0891b2" />
      <text x="32" y="36" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#fff">{head[0]}</text>
      <rect x="10" y="46" width="44" height="30" fill="#0e7490" />
      <text x="32" y="66" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#fff">{head[1]}</text>
      {cols.map(([t, b], i) => (
        <g key={`${t}-${i}`}>
          <rect x={54 + i * w} y="16" width={w} height="30" fill="#fff" stroke="#67e8f9" />
          <text x={54 + i * w + w / 2} y="36" textAnchor="middle" fontSize="12" fontWeight="bold" fill={t === '?' ? C_UNK : '#0f172a'}>{t}</text>
          <rect x={54 + i * w} y="46" width={w} height="30" fill="#f0fdfa" stroke="#67e8f9" />
          <text x={54 + i * w + w / 2} y="66" textAnchor="middle" fontSize="11" fontWeight="bold" fill={b === '?' ? C_UNK : '#0f766e'}>{b}</text>
        </g>
      ))}
    </QFig>
  );
};

/** Kerekítés tízesre: két kis számegyenes. */
const QRound: React.FC<{ a: number; b: number }> = ({ a, b }) => {
  const one = (n: number, y: number) => {
    const from = Math.floor(n / 10) * 10;
    const x = (v: number) => 30 + ((v - from) / 10) * 180;
    return (
      <g key={`${n}-${y}`}>
        <line x1="30" y1={y} x2="210" y2={y} stroke="#334155" strokeWidth="2" />
        {Array.from({ length: 11 }).map((_, i) => (
          <line key={i} x1={30 + i * 18} y1={y - (i % 5 === 0 ? 6 : 3)} x2={30 + i * 18} y2={y + (i % 5 === 0 ? 6 : 3)} stroke="#334155" />
        ))}
        <text x="30" y={y + 18} textAnchor="middle" fontSize="11" fontWeight="bold" fill="#334155">{from}</text>
        <text x="210" y={y + 18} textAnchor="middle" fontSize="11" fontWeight="bold" fill="#334155">{from + 10}</text>
        <circle cx={x(n)} cy={y} r="5" fill="#f97316" />
        <text x={x(n)} y={y - 9} textAnchor="middle" fontSize="12" fontWeight="bold" fill="#c2410c">{n}</text>
      </g>
    );
  };
  return (
    <QFig h={140}>
      {one(a, 34)}
      {one(b, 88)}
      <text x="120" y="130" textAnchor="middle" fontSize="13" fontWeight="bold" fill={C_UNK}>{a} · {b} ≈ ?</text>
    </QFig>
  );
};

/** Számkártyák. */
const QCards: React.FC<{ digits: string[]; note: string }> = ({ digits, note }) => (
  <QFig h={110}>
    {digits.map((d, i) => {
      const x = 120 - (digits.length * 44) / 2 + i * 44 + 4;
      return (
        <g key={i}>
          <rect x={x} y="18" width="36" height="46" rx="6" fill="#fef3c7" stroke="#d97706" strokeWidth="1.8" />
          <text x={x + 18} y="50" textAnchor="middle" fontSize="22" fontWeight="bold" fill="#92400e">{d}</text>
        </g>
      );
    })}
    <text x="120" y="92" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#334155">{note}</text>
  </QFig>
);

/** Számegyenes-szakasz két határral. */
const QBetween: React.FC<{ left: string; right: string }> = ({ left, right }) => (
  <QFig h={100}>
    <line x1="20" y1="55" x2="220" y2="55" stroke="#0f172a" strokeWidth="2" />
    <circle cx="50" cy="55" r="5" fill="#fff" stroke="#0f172a" strokeWidth="2" />
    <circle cx="190" cy="55" r="5" fill="#fff" stroke="#0f172a" strokeWidth="2" />
    <line x1="58" y1="55" x2="182" y2="55" stroke="#7c3aed" strokeWidth="5" opacity="0.4" />
    <text x="50" y="82" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#334155">{left}</text>
    <text x="190" y="82" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#334155">{right}</text>
    <text x="120" y="45" textAnchor="middle" fontSize="18" fontWeight="bold" fill={C_UNK}>?</text>
  </QFig>
);

/** Fák egy sorban egyenlő távolságra (Kitekintő 7.). */
const QTrees: React.FC<{ n: number; gap: string }> = ({ n, gap }) => (
  <QFig h={110}>
    {Array.from({ length: n }).map((_, i) => {
      const x = 18 + (i * 204) / (n - 1);
      return (
        <g key={i}>
          <rect x={x - 2} y="44" width="4" height="12" fill="#92400e" />
          <circle cx={x} cy="38" r="8" fill="#16a34a" />
        </g>
      );
    })}
    <line x1={18} y1="66" x2={18 + 204 / (n - 1)} y2="66" stroke="#0f172a" strokeWidth="1.5" />
    <text x={18 + 102 / (n - 1)} y="80" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#334155">{gap}</text>
    <line x1="18" y1="92" x2="222" y2="92" stroke={C_UNK} strokeWidth="1.5" strokeDasharray="4 3" />
    <text x="120" y="105" textAnchor="middle" fontSize="11" fontWeight="bold" fill={C_UNK}>{n} fa, első és utolsó között: ?</text>
  </QFig>
);

// ---------------------------------------------------------------------------
// Kérdések – 30 / 30 / 30
// ---------------------------------------------------------------------------
const WRITTEN_MULT_EXAM_QUESTIONS: QuizQuestion[] = [
  // ============================ 1. szint ============================
  {
    id: 'wme-e1',
    level: 1,
    questionTypeBadge: 'Kerek tízes',
    figure: <QChain start="28" ops={['· 6', '· 10']} boxes={['168', '?']} />,
    question: 'Mennyi 28 · 60?',
    options: ['1680', '168', '1600', '1860'],
    correctAnswer: 0,
    explanation: '28 · 6 = 168, és 10-zel szorozva 1680.'
  },
  {
    id: 'wme-e2',
    level: 1,
    questionTypeBadge: 'Kerek tízes',
    question: 'Mennyi 48 · 50?',
    options: ['2400', '240', '2000', '2450'],
    correctAnswer: 0,
    explanation: '48 · 5 = 240, és 10-zel szorozva 2400. Két 0 van a végén!'
  },
  {
    id: 'wme-e3',
    level: 1,
    questionTypeBadge: 'Kerek tízes',
    question: 'Mennyi 69 · 20?',
    options: ['1380', '138', '1180', '1400'],
    correctAnswer: 0,
    explanation: '69 · 2 = 138, és 10-zel szorozva 1380.'
  },
  {
    id: 'wme-e4',
    level: 1,
    questionTypeBadge: 'Kerek tízes',
    question: 'Mennyi 74 · 50?',
    options: ['3700', '370', '3500', '3750'],
    correctAnswer: 0,
    explanation: '74 · 5 = 370, és 10-zel szorozva 3700.'
  },
  {
    id: 'wme-e5',
    level: 1,
    questionTypeBadge: 'Kerek tízes',
    question: 'Mennyi 27 · 90?',
    options: ['2430', '243', '1830', '2700'],
    correctAnswer: 0,
    explanation: '27 · 9 = 243, és 10-zel szorozva 2430.'
  },
  {
    id: 'wme-e6',
    level: 1,
    questionTypeBadge: 'Kerek tízes',
    question: 'Mennyi 37 · 70?',
    options: ['2590', '259', '2190', '2470'],
    correctAnswer: 0,
    explanation: '37 · 7 = 259 (7 · 7 = 49, leírom a 9-et, maradt 4; 7 · 3 = 21, és még 4: 25). 10-zel szorozva 2590.'
  },
  {
    id: 'wme-e7',
    level: 1,
    questionTypeBadge: 'Kerek tízes',
    question: 'Mennyi 43 · 40?',
    options: ['1720', '172', '1600', '1740'],
    correctAnswer: 0,
    explanation: '43 · 4 = 172, és 10-zel szorozva 1720.'
  },
  {
    id: 'wme-e8',
    level: 1,
    questionTypeBadge: 'Kerek tízes',
    question: 'Mennyi 94 · 20?',
    options: ['1880', '188', '1800', '1840'],
    correctAnswer: 0,
    explanation: '94 · 2 = 188, és 10-zel szorozva 1880.'
  },
  {
    id: 'wme-e9',
    level: 1,
    questionTypeBadge: 'Kerek százas',
    figure: <QChain start="15" ops={['· 5', '· 100']} boxes={['75', '?']} />,
    question: 'Mennyi 15 · 500?',
    options: ['7500', '750', '5500', '7000'],
    correctAnswer: 0,
    explanation: '15 · 5 = 75, és 100-zal szorozva 7500.'
  },
  {
    id: 'wme-e10',
    level: 1,
    questionTypeBadge: 'Kerek százas',
    question: 'Mennyi 12 · 800?',
    options: ['9600', '960', '8600', '9800'],
    correctAnswer: 0,
    explanation: '12 · 8 = 96, és 100-zal szorozva 9600.'
  },
  {
    id: 'wme-e11',
    level: 1,
    questionTypeBadge: 'Kerek százas',
    question: 'Mennyi 27 · 300?',
    options: ['8100', '810', '2700', '9000'],
    correctAnswer: 0,
    explanation: '27 · 3 = 81, és 100-zal szorozva 8100.'
  },
  {
    id: 'wme-e12',
    level: 1,
    questionTypeBadge: 'Kerek százas',
    question: 'Mennyi 11 · 900?',
    options: ['9900', '990', '9000', '9100'],
    correctAnswer: 0,
    explanation: '11 · 9 = 99, és 100-zal szorozva 9900.'
  },
  {
    id: 'wme-e13',
    level: 1,
    questionTypeBadge: 'Kerek százas',
    question: 'Mennyi 19 · 400?',
    options: ['7600', '760', '7400', '8000'],
    correctAnswer: 0,
    explanation: '19 · 4 = 76, és 100-zal szorozva 7600. (A 8000 csak becslés: 20 · 400.)'
  },
  {
    id: 'wme-e14',
    level: 1,
    questionTypeBadge: 'Kerek százas',
    question: 'Mennyi 28 · 200?',
    options: ['5600', '560', '4600', '5800'],
    correctAnswer: 0,
    explanation: '28 · 2 = 56, és 100-zal szorozva 5600.'
  },
  {
    id: 'wme-e15',
    level: 1,
    questionTypeBadge: 'Kerek százas',
    question: 'Mennyi 15 · 600?',
    options: ['9000', '900', '6000', '9600'],
    correctAnswer: 0,
    explanation: '15 · 6 = 90, és 100-zal szorozva 9000.'
  },
  {
    id: 'wme-e16',
    level: 1,
    questionTypeBadge: 'Tízesek',
    figure: <QPairTable head={['tízes', 'érték']} cols={[['1', '10'], ['10', '100'], ['45', '?']]} />,
    question: 'Mennyit ér 45 tízes?',
    options: ['450', '45', '4500', '405'],
    correctAnswer: 0,
    explanation: '45 · 10 = 450.'
  },
  {
    id: 'wme-e17',
    level: 1,
    questionTypeBadge: 'Szorzás 10-zel',
    question: 'Mennyi 10 · 57?',
    options: ['570', '57', '5700', '517'],
    correctAnswer: 0,
    explanation: 'A tényezők felcserélhetők: 57 · 10 = 570.'
  },
  {
    id: 'wme-e18',
    level: 1,
    questionTypeBadge: 'Szorzás 10-zel',
    question: 'Mennyi 961 · 10?',
    options: ['9610', '961', '9601', '9160'],
    correctAnswer: 0,
    explanation: 'Minden számjegy egy hellyel balra lép, a végére 0 kerül: 9610.'
  },
  {
    id: 'wme-e19',
    level: 1,
    questionTypeBadge: 'Írásbeli szorzás',
    figure: <QMul2 a={13} b={12} showZero hide={['product']} />,
    question: 'Mennyi 13 · 12?',
    options: ['156', '39', '146', '166'],
    correctAnswer: 0,
    explanation: '13 · 2 = 26, 13 · 1 tízes = 130. 26 + 130 = 156.'
  },
  {
    id: 'wme-e20',
    level: 1,
    questionTypeBadge: 'Írásbeli szorzás',
    figure: <QMul2 a={21} b={42} showZero hide={['product']} />,
    question: 'Mennyi 21 · 42?',
    options: ['882', '126', '872', '842'],
    correctAnswer: 0,
    explanation: '21 · 2 = 42, 21 · 4 = 84 tízes = 840. 42 + 840 = 882. (A 126 akkor jön ki, ha a 84-et nem tolod el.)'
  },
  {
    id: 'wme-e21',
    level: 1,
    questionTypeBadge: 'Becslés',
    figure: <QRound a={21} b={42} />,
    question: 'Tízesre kerekítve mennyi a 21 · 42 becsült értéke?',
    options: ['800', '900', '1000', '600'],
    correctAnswer: 0,
    explanation: '21 ≈ 20, 42 ≈ 40, 20 · 40 = 800.'
  },
  {
    id: 'wme-e22',
    level: 1,
    questionTypeBadge: 'Becslés',
    figure: <QRound a={85} b={64} />,
    question: 'Tízesre kerekítve mennyi a 85 · 64 becsült értéke?',
    options: ['5400', '4800', '5600', '6300'],
    correctAnswer: 0,
    explanation: '85 ≈ 90 (az 5-öst felfelé kerekítjük), 64 ≈ 60, 90 · 60 = 5400.'
  },
  {
    id: 'wme-e23',
    level: 1,
    questionTypeBadge: 'Elnevezések',
    figure: <QMul2 a={12} b={14} showZero labels />,
    question: 'A 12 · 14 = 168 szorzásban hogyan nevezzük a 168-at?',
    options: ['szorzat', 'részletszorzat', 'szorzandó', 'szorzó'],
    correctAnswer: 0,
    explanation: 'A 12 és a 14 a tényezők (szorzandó és szorzó), a 48 és a 120 a részletszorzatok, a 168 a szorzat.'
  },
  {
    id: 'wme-e24',
    level: 1,
    questionTypeBadge: 'Ellenőrzés',
    question: 'Melyik szorzással ellenőrizheted a 23 · 31 szorzást?',
    options: ['31 · 23', '23 + 31', '23 · 13', '32 · 13'],
    correctAnswer: 0,
    explanation: 'A tényezők felcserélésével: 31 · 23 is 713.'
  },
  {
    id: 'wme-e25',
    level: 1,
    questionTypeBadge: 'Szorzat változása',
    figure: <QChain start="9" ops={['· 7', '· 10']} boxes={['63', '?']} />,
    question: '9 · 7 = 63. Mennyi 90 · 7?',
    options: ['630', '63', '6300', '97'],
    correctAnswer: 0,
    explanation: 'A szorzandó 10-szeresére nőtt (9 → 90), ezért a szorzat is: 63 · 10 = 630.'
  },
  {
    id: 'wme-e26',
    level: 1,
    questionTypeBadge: 'Következtetés',
    figure: <QPairTable head={['kg', 'Ft']} cols={[['10', '1400'], ['30', '?']]} />,
    question: '10 kg burgonya 1400 Ft. Mennyibe kerül 30 kg?',
    options: ['4200 Ft', '1430 Ft', '3400 Ft', '2800 Ft'],
    correctAnswer: 0,
    explanation: '30 kg a 10 kg háromszorosa: 1400 · 3 = 4200 Ft.'
  },
  {
    id: 'wme-e27',
    level: 1,
    questionTypeBadge: 'Gondolkodj!',
    question: 'Egy pizza 12 perc alatt sül meg. Mennyi idő alatt sül meg 3 pizza, ha egyszerre tesszük be a sütőbe?',
    options: ['12 perc', '36 perc', '4 perc', '15 perc'],
    correctAnswer: 0,
    explanation: 'Egyszerre sülnek, ezért 3 pizza is 12 perc alatt kész. Itt nem kell szorozni!'
  },
  {
    id: 'wme-e28',
    level: 1,
    questionTypeBadge: 'Írásbeli szorzás',
    figure: <QMul2 a={34} b={12} showZero hide={['product']} />,
    question: 'Mennyi 34 · 12?',
    options: ['408', '102', '398', '418'],
    correctAnswer: 0,
    explanation: '34 · 2 = 68, 34 · 1 tízes = 340. 68 + 340 = 408.'
  },
  {
    id: 'wme-e29',
    level: 1,
    questionTypeBadge: 'Szorzat változása',
    question: '61 · 80 = 4880. Mennyi 61 · 40?',
    options: ['2440', '4840', '9760', '4880'],
    correctAnswer: 0,
    explanation: 'A szorzó a felére csökkent (80 → 40), ezért a szorzat is a felére: 4880 : 2 = 2440.'
  },
  {
    id: 'wme-e30',
    level: 1,
    questionTypeBadge: 'Láncszorzás',
    figure: <QChain start="14" ops={['· 10', '· 10']} boxes={['140', '?']} />,
    question: 'A 14-et kétszer egymás után megszorozzuk 10-zel. Mit kapunk?',
    options: ['1400', '140', '1410', '2800'],
    correctAnswer: 0,
    explanation: '14 · 10 = 140, 140 · 10 = 1400. Ez ugyanaz, mint 14 · 100.'
  },

  // ============================ 2. szint ============================
  {
    id: 'wme-m1',
    level: 2,
    questionTypeBadge: 'Írásbeli szorzás',
    figure: <QMul2 a={362} b={26} hide={['product']} />,
    question: 'Mennyi 362 · 26?',
    options: ['9412', '2896', '9312', '9422'],
    correctAnswer: 0,
    explanation: '362 · 6 = 2172, 362 · 2 = 724 tízes = 7240. 2172 + 7240 = 9412.'
  },
  {
    id: 'wme-m2',
    level: 2,
    questionTypeBadge: 'Írásbeli szorzás',
    figure: <QMul2 a={291} b={32} hide={['product']} />,
    question: 'Mennyi 291 · 32?',
    options: ['9312', '1455', '9212', '9322'],
    correctAnswer: 0,
    explanation: '291 · 2 = 582, 291 · 3 = 873 tízes = 8730. 582 + 8730 = 9312. Becslés: 290 · 30 = 8700.'
  },
  {
    id: 'wme-m3',
    level: 2,
    questionTypeBadge: 'Írásbeli szorzás',
    figure: <QMul2 a={407} b={18} hide={['product']} />,
    question: 'Mennyi 407 · 18?',
    options: ['7326', '3663', '7226', '7336'],
    correctAnswer: 0,
    explanation: '407 · 8 = 3256, 407 · 1 tízes = 4070. 3256 + 4070 = 7326. (A 3663 akkor jön ki, ha a 407-et nem tolod el.)'
  },
  {
    id: 'wme-m4',
    level: 2,
    questionTypeBadge: 'Írásbeli szorzás',
    figure: <QMul2 a={178} b={53} hide={['product']} />,
    question: 'Mennyi 178 · 53?',
    options: ['9434', '1424', '9334', '9534'],
    correctAnswer: 0,
    explanation: '178 · 3 = 534, 178 · 5 = 890 tízes = 8900. 534 + 8900 = 9434.'
  },
  {
    id: 'wme-m5',
    level: 2,
    questionTypeBadge: 'Írásbeli szorzás',
    figure: <QMul2 a={514} b={16} hide={['product']} />,
    question: 'Mennyi 514 · 16?',
    options: ['8224', '3598', '8124', '8234'],
    correctAnswer: 0,
    explanation: '514 · 6 = 3084, 514 · 1 tízes = 5140. 3084 + 5140 = 8224.'
  },
  {
    id: 'wme-m6',
    level: 2,
    questionTypeBadge: 'Írásbeli szorzás',
    figure: <QMul2 a={85} b={64} hide={['product']} />,
    question: 'Mennyi 85 · 64?',
    options: ['5440', '850', '5340', '5540'],
    correctAnswer: 0,
    explanation: '85 · 4 = 340, 85 · 6 = 510 tízes = 5100. 340 + 5100 = 5440. Becslés: 90 · 60 = 5400.'
  },
  {
    id: 'wme-m7',
    level: 2,
    questionTypeBadge: 'Írásbeli szorzás',
    figure: <QMul2 a={204} b={38} hide={['product']} />,
    question: 'Mennyi 204 · 38?',
    options: ['7752', '2244', '7652', '7742'],
    correctAnswer: 0,
    explanation: '204 · 8 = 1632, 204 · 3 = 612 tízes = 6120. 1632 + 6120 = 7752.'
  },
  {
    id: 'wme-m8',
    level: 2,
    questionTypeBadge: 'Szöveges feladat',
    figure: <QPairTable head={['hónap', 'Ft']} cols={[['1', '385'], ['12', '?']]} />,
    question: 'Valter állatos magazinja havonta jelenik meg, egy szám 385 Ft. Mennyibe kerül egész évre (12 hónap)?',
    options: ['4620 Ft', '1155 Ft', '4520 Ft', '3850 Ft'],
    correctAnswer: 0,
    explanation: '385 · 12: 385 · 2 = 770, 385 · 1 tízes = 3850. 770 + 3850 = 4620 Ft.'
  },
  {
    id: 'wme-m9',
    level: 2,
    questionTypeBadge: 'Szöveges feladat',
    figure: <ForestTrainSvg className={FIG} />,
    question: 'Az erdei vasút hétvégén naponta háromszor teszi meg oda-vissza a 800 m-es utat. Hány métert tesz meg egy hétvégén (szombat és vasárnap)?',
    options: ['9600 m', '4800 m', '2400 m', '1600 m'],
    correctAnswer: 0,
    explanation: 'Oda-vissza: 800 · 2 = 1600 m. Naponta háromszor: 1600 · 3 = 4800 m. Két nap: 4800 · 2 = 9600 m.'
  },
  {
    id: 'wme-m10',
    level: 2,
    questionTypeBadge: 'Szöveges feladat',
    figure: <BuffetPriceSvg className={FIG} />,
    question: 'A büfében 12 gyerek bodzaszörpöt, 14 gyerek csipkebogyószörpöt vett. Mennyit fizettek összesen?',
    options: ['6920 Ft', '3920 Ft', '6720 Ft', '7020 Ft'],
    correctAnswer: 0,
    explanation: '12 · 250 = 3000 Ft és 14 · 280 = 3920 Ft. Összesen 3000 + 3920 = 6920 Ft.'
  },
  {
    id: 'wme-m11',
    level: 2,
    questionTypeBadge: 'Szöveges feladat',
    figure: <BuffetPriceSvg className={FIG} />,
    question: 'Gomolyasajtos szendvicset 21-en, gombakrémeset 5-en ettek. Mennyibe került ez összesen?',
    options: ['8590 Ft', '7140 Ft', '8490 Ft', '8690 Ft'],
    correctAnswer: 0,
    explanation: '21 · 340 = 7140 Ft és 5 · 290 = 1450 Ft. Összesen 7140 + 1450 = 8590 Ft.'
  },
  {
    id: 'wme-m12',
    level: 2,
    questionTypeBadge: 'Szöveges feladat',
    figure: <BuffetPriceSvg className={FIG} />,
    question: 'Mona 4 dl csipkebogyószörpöt és 4 db palacsintát vett. Mennyit fizetett? (Figyeld meg: a szörp ára 2 dl-re, a palacsintáé 2 db-ra szól!)',
    options: ['1200 Ft', '2400 Ft', '600 Ft', '1120 Ft'],
    correctAnswer: 0,
    explanation: '4 dl = 2 · 2 dl: 2 · 280 = 560 Ft. 4 db = 2 · 2 db: 2 · 320 = 640 Ft. Összesen 1200 Ft. (A 2400 Ft akkor jön ki, ha 4-gyel szorzol.)'
  },
  {
    id: 'wme-m13',
    level: 2,
    questionTypeBadge: 'Műveleti sorrend',
    question: 'Mennyi 448 · (28 − 16)?',
    options: ['5376', '7140', '5366', '5476'],
    correctAnswer: 0,
    explanation: 'Előbb a zárójel: 28 − 16 = 12. Aztán 448 · 12 = 896 + 4480 = 5376.'
  },
  {
    id: 'wme-m14',
    level: 2,
    questionTypeBadge: 'Műveleti sorrend',
    question: 'Mennyi 448 · 16 − 28?',
    options: ['7140', '5376', '7196', '7168'],
    correctAnswer: 0,
    explanation: 'Előbb szorzunk: 448 · 16 = 2688 + 4480 = 7168. Aztán kivonunk: 7168 − 28 = 7140.'
  },
  {
    id: 'wme-m15',
    level: 2,
    questionTypeBadge: 'Műveleti sorrend',
    question: 'Mennyi 448 − 28 · 16?',
    options: ['0', '6720', '420', '448'],
    correctAnswer: 0,
    explanation: 'Előbb szorzunk: 28 · 16 = 168 + 280 = 448. Aztán 448 − 448 = 0. (A 6720 a rossz sorrend: 420 · 16.)'
  },
  {
    id: 'wme-m16',
    level: 2,
    questionTypeBadge: 'Műveleti sorrend',
    question: 'Mennyi (168 − 89) · 51?',
    options: ['4029', '3950', '4019', '4129'],
    correctAnswer: 0,
    explanation: '168 − 89 = 79. 79 · 51 = 79 + 3950 = 4029.'
  },
  {
    id: 'wme-m17',
    level: 2,
    questionTypeBadge: 'Műveleti sorrend',
    question: 'Mennyi 51 · 168 + 89?',
    options: ['8657', '8568', '8647', '8757'],
    correctAnswer: 0,
    explanation: '168 · 51 = 168 + 8400 = 8568. Aztán 8568 + 89 = 8657.'
  },
  {
    id: 'wme-m18',
    level: 2,
    questionTypeBadge: 'Műveleti sorrend',
    question: 'Mennyi 168 + 51 · 89?',
    options: ['4707', '4539', '4697', '4807'],
    correctAnswer: 0,
    explanation: 'Előbb szorzunk: 51 · 89 = 89 · 51 = 89 + 4450 = 4539. Aztán 168 + 4539 = 4707.'
  },
  {
    id: 'wme-m19',
    level: 2,
    questionTypeBadge: 'Összehasonlítás',
    figure: <OrchardSvg className={FIG} />,
    question: 'Péter bácsinál 78 sorban soronként 36 almafa, Joli néninél 82 sorban soronként 28 almafa van. Melyik gyümölcsösben van több fa, és mennyivel?',
    options: ['Péter bácsinál, 512-vel', 'Joli néninél, 512-vel', 'Péter bácsinál, 412-vel', 'Ugyanannyi fa van.'],
    correctAnswer: 0,
    explanation: '78 · 36 = 468 + 2340 = 2808. 82 · 28 = 656 + 1640 = 2296. 2808 − 2296 = 512, Péter bácsinál több.'
  },
  {
    id: 'wme-m20',
    level: 2,
    questionTypeBadge: 'Szöveges feladat',
    figure: <QMul2 a={42} b={19} hide={['product']} />,
    question: 'Eszter a fahasábokból kirakott úton 42 · 19 lépést tett. Hány lépés ez?',
    options: ['798', '420', '788', '808'],
    correctAnswer: 0,
    explanation: '42 · 9 = 378, 42 · 1 tízes = 420. 378 + 420 = 798.'
  },
  {
    id: 'wme-m21',
    level: 2,
    questionTypeBadge: 'Szöveges feladat',
    question: 'A homokúton Eszter feleannyit lépett, mint a fahasábokon (798 lépés). Hányat lépett a homokon?',
    options: ['399', '798', '1596', '400'],
    correctAnswer: 0,
    explanation: 'Feleannyi: 798 : 2 = 399. (A 1596 a kétszerese lenne.)'
  },
  {
    id: 'wme-m22',
    level: 2,
    questionTypeBadge: 'Szöveges feladat',
    figure: <QMul2 a={27} b={21} hide={['product']} />,
    question: 'A patakmederben Eszter a 27-nek a 21-szeresét lépte. Hány lépés ez?',
    options: ['567', '81', '547', '577'],
    correctAnswer: 0,
    explanation: '27 · 21: 27 · 1 = 27, 27 · 2 tízes = 540. 27 + 540 = 567.'
  },
  {
    id: 'wme-m23',
    level: 2,
    questionTypeBadge: 'Szöveges feladat',
    question: 'A kukoricacsutkán tett lépések száma a 23 és a 18 szorzata. Hány lépés ez?',
    options: ['414', '207', '41', '404'],
    correctAnswer: 0,
    explanation: '23 · 8 = 184, 23 · 1 tízes = 230. 184 + 230 = 414. (A 41 csak az összegük.)'
  },
  {
    id: 'wme-m24',
    level: 2,
    questionTypeBadge: 'Szöveges feladat',
    question: 'A fenyőtoboz úton a 193 harmincötszörösénél 6500-zal kevesebbet lépett. Hány lépés ez?',
    options: ['255', '6755', '355', '155'],
    correctAnswer: 0,
    explanation: '193 · 35 = 965 + 5790 = 6755. 6500-zal kevesebb: 6755 − 6500 = 255.'
  },
  {
    id: 'wme-m25',
    level: 2,
    questionTypeBadge: 'Írásbeli szorzás',
    question: 'Mennyi 36 · 261? (Cseréld fel a tényezőket, ha így könnyebb!)',
    options: ['9396', '2349', '9296', '9496'],
    correctAnswer: 0,
    explanation: '261 · 36: 261 · 6 = 1566, 261 · 3 = 783 tízes = 7830. 1566 + 7830 = 9396.'
  },
  {
    id: 'wme-m26',
    level: 2,
    questionTypeBadge: 'Írásbeli szorzás',
    figure: <QMul2 a={132} b={29} hide={['product']} />,
    question: 'Mennyi 29 · 132?',
    options: ['3828', '1452', '3728', '3818'],
    correctAnswer: 0,
    explanation: '132 · 29: 132 · 9 = 1188, 132 · 2 = 264 tízes = 2640. 1188 + 2640 = 3828.'
  },
  {
    id: 'wme-m27',
    level: 2,
    questionTypeBadge: 'Írásbeli szorzás',
    question: 'Mennyi 47 · 108?',
    options: ['5076', '1188', '4976', '5176'],
    correctAnswer: 0,
    explanation: '108 · 47: 108 · 7 = 756, 108 · 4 = 432 tízes = 4320. 756 + 4320 = 5076.'
  },
  {
    id: 'wme-m28',
    level: 2,
    questionTypeBadge: 'Következtetés',
    question: 'A 120 Ft-os ceruzából 3 darabot vettem. Ugyanennyi pénzért hány darab 90 Ft-os radírt vehettem volna?',
    options: ['4', '3', '270', '5'],
    correctAnswer: 0,
    explanation: '3 · 120 = 360 Ft. 90 · 4 = 360, tehát 4 radírt.'
  },
  {
    id: 'wme-m29',
    level: 2,
    questionTypeBadge: 'Következtetés',
    question: 'Ha 50 ceruzát teszek egy dobozba, 60 doboz kell. Hány doboz kell ugyanennyi ceruzához, ha dobozonként csak 10 ceruza fér?',
    options: ['300', '12', '30', '3000'],
    correctAnswer: 0,
    explanation: 'Összesen 50 · 60 = 3000 ceruza. 10-esével: 3000 : 10 = 300 doboz. (A 10 az 50 ötöde, ezért ötször annyi doboz kell.)'
  },
  {
    id: 'wme-m30',
    level: 2,
    questionTypeBadge: 'Szorzat változása',
    question: 'Hogyan változtasd meg a 48 · 10 egyik tényezőjét, hogy a szorzat a kétszeresére nőjön?',
    options: ['48 · 20', '48 · 12', '50 · 10', '24 · 20'],
    correctAnswer: 0,
    explanation: '48 · 10 = 480, a kétszerese 960. 48 · 20 = 960. (A 24 · 20 = 480 ugyanannyi, mert az egyiket feleztük, a másikat dupláztuk.)'
  },

  // ============================ 3. szint ============================
  {
    id: 'wme-h1',
    level: 3,
    questionTypeBadge: 'Szorzat változása',
    question: '53 · 20 = 1060. Melyik szorzás eredménye ennek a tizede?',
    options: ['53 · 2', '53 · 200', '530 · 20', '53 · 10'],
    correctAnswer: 0,
    explanation: 'A tizede 1060 : 10 = 106. Ha a 20-at a tizedére (2) csökkentjük: 53 · 2 = 106. (Az 53 · 10 = 530 csak a fele.)'
  },
  {
    id: 'wme-h2',
    level: 3,
    questionTypeBadge: 'Szorzat változása',
    question: 'Melyik szorzás eredménye a 48 · 10 tízszerese?',
    options: ['48 · 100', '48 · 20', '58 · 10', '480 · 100'],
    correctAnswer: 0,
    explanation: '48 · 10 = 480, a tízszerese 4800 = 48 · 100. (A 480 · 100 már százszoros lenne.)'
  },
  {
    id: 'wme-h3',
    level: 3,
    questionTypeBadge: 'Szorzat változása',
    question: 'Melyik szorzás eredménye a 48 · 10 fele?',
    options: ['24 · 10', '48 · 20', '46 · 10', '96 · 5'],
    correctAnswer: 0,
    explanation: '48 · 10 = 480, a fele 240 = 24 · 10. (A 96 · 5 = 480 nem változott: az egyiket dupláztuk, a másikat feleztük.)'
  },
  {
    id: 'wme-h4',
    level: 3,
    questionTypeBadge: 'Nyitott mondat',
    question: 'Melyik szám teszi igazzá? 245 · 32 = □',
    options: ['7840', '1225', '7740', '7850'],
    correctAnswer: 0,
    explanation: '245 · 2 = 490, 245 · 3 = 735 tízes = 7350. 490 + 7350 = 7840.'
  },
  {
    id: 'wme-h5',
    level: 3,
    questionTypeBadge: 'Nyitott mondat',
    question: 'Melyik szám teszi igazzá? 373 · 25 < □',
    options: ['9400', '9325', '9300', '9235'],
    correctAnswer: 0,
    explanation: '373 · 25 = 1865 + 7460 = 9325. A □ ennél nagyobb kell legyen: a 9400 jó. A 9325 nem, mert nem nagyobb önmagánál.'
  },
  {
    id: 'wme-h6',
    level: 3,
    questionTypeBadge: 'Nyitott mondat',
    figure: <QBetween left="307 · 23" right="216 · 34" />,
    question: 'Melyik szám teszi igazzá? 216 · 34 > □ > 307 · 23',
    options: ['7200', '7061', '7344', '7400'],
    correctAnswer: 0,
    explanation: '216 · 34 = 864 + 6480 = 7344 és 307 · 23 = 921 + 6140 = 7061. A □ 7061 és 7344 között van: 7200.'
  },
  {
    id: 'wme-h7',
    level: 3,
    questionTypeBadge: 'Számkártyák',
    figure: <QCards digits={['3', '2', '4']} note="legnagyobb · 23 − legkisebb · 23 = ?" />,
    question: 'A 3, 2, 4 kártyákból háromjegyű számokat raksz ki. A legnagyobbat és a legkisebbet megszorzod 23-mal. Mennyi a két szorzat különbsége?',
    options: ['4554', '198', '4454', '9936'],
    correctAnswer: 0,
    explanation: 'Legnagyobb: 432, legkisebb: 234. 432 · 23 = 9936, 234 · 23 = 5382. 9936 − 5382 = 4554. (Rövidebben: (432 − 234) · 23 = 198 · 23 = 4554.)'
  },
  {
    id: 'wme-h8',
    level: 3,
    questionTypeBadge: 'Számkártyák',
    figure: <QCards digits={['3', '2', '4']} note="legnagyobb páros háromjegyű · 22 = ?" />,
    question: 'A 3, 2, 4 kártyákból kirakható legnagyobb páros háromjegyű számot megszorzod 22-vel. Mennyit kapsz?',
    options: ['9504', '7524', '1728', '9404'],
    correctAnswer: 0,
    explanation: 'A páros szám 2-re vagy 4-re végződik. A legnagyobb: 432. 432 · 22 = 864 + 8640 = 9504. (A 7524 a 342 · 22.)'
  },
  {
    id: 'wme-h9',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    figure: (
      <QTable
        title="Dévaványai túzokok"
        rows={[
          { k: 'összesen', v: '559 madár' },
          { k: 'kakas (kb. 14 kg)', v: '293' },
          { k: 'tyúk (kb. 5 kg)', v: '?' },
          { k: 'tömegük összesen', v: '? kg' }
        ]}
      />
    ),
    question: '559 túzokból 293 kakas, a többi tyúk. Egy kakas kb. 14 kg, egy tyúk kb. 5 kg. Mennyi a tömegük összesen?',
    options: ['5432 kg', '7826 kg', '2795 kg', '4102 kg'],
    correctAnswer: 0,
    explanation: 'Tyúkok: 559 − 293 = 266. Kakasok: 293 · 14 = 4102 kg. Tyúkok: 266 · 5 = 1330 kg. Összesen 4102 + 1330 = 5432 kg.'
  },
  {
    id: 'wme-h10',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    figure: (
      <QTable
        title="Előadótermek"
        rows={[
          { k: '2 terem', v: '50 fős' },
          { k: '2 másik terem', v: '25 fős' },
          { k: 'március', v: '31 nap' },
          { k: 'vendégek összesen', v: '?' }
        ]}
      />
    ),
    question: 'A látogatóközpontban két 50 fős és két 25 fős terem van. Márciusban (31 nap) minden teremben naponta egy előadás van. Legfeljebb hány vendég hallgathatja meg?',
    options: ['4650', '150', '4500', '2325'],
    correctAnswer: 0,
    explanation: 'Egy nap: 50 + 50 + 25 + 25 = 150 vendég. 31 nap: 150 · 31 = 150 + 4500 = 4650. (A 2325 akkor jön ki, ha minden teremből csak egyet számolsz.)'
  },
  {
    id: 'wme-h11',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    figure: <QMul2 a={375} b={26} hide={['product']} />,
    question: 'Egy vonatjegy 375 Ft. Mennyit fizetett 26 diák a jegyekért összesen?',
    options: ['9750 Ft', '3000 Ft', '9650 Ft', '9850 Ft'],
    correctAnswer: 0,
    explanation: '375 · 6 = 2250, 375 · 2 = 750 tízes = 7500. 2250 + 7500 = 9750 Ft.'
  },
  {
    id: 'wme-h12',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    figure: <QMul2 a={679} b={14} hide={['product']} />,
    question: 'A felnőttek vonatjegye 679 Ft. Mennyit fizetett 14 felnőtt összesen?',
    options: ['9506 Ft', '3395 Ft', '9406 Ft', '9516 Ft'],
    correctAnswer: 0,
    explanation: '679 · 4 = 2716, 679 · 1 tízes = 6790. 2716 + 6790 = 9506 Ft.'
  },
  {
    id: 'wme-h13',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    question: 'A 3 napos fesztiválon naponta 25 darab 13 literes és 25 darab 8 literes bográcsban főztek. Legfeljebb hány liter étel készült összesen?',
    options: ['1575 l', '525 l', '1050 l', '3150 l'],
    correctAnswer: 0,
    explanation: 'Egy nap: 25 · 13 + 25 · 8 = 25 · 21 = 525 l. Három nap: 525 · 3 = 1575 l.'
  },
  {
    id: 'wme-h14',
    level: 3,
    questionTypeBadge: 'Összehasonlítás',
    question: 'Melyik több, és mennyivel? 139 · 71 vagy 372 · 21 − 123 · 31',
    options: ['139 · 71, 5870-nel', '372 · 21 − 123 · 31, 5870-nel', '139 · 71, 5770-nel', 'Egyenlők.'],
    correctAnswer: 0,
    explanation: '139 · 71 = 9869. 372 · 21 = 7812, 123 · 31 = 3813, a különbség 3999. 9869 − 3999 = 5870.'
  },
  {
    id: 'wme-h15',
    level: 3,
    questionTypeBadge: 'Összehasonlítás',
    question: 'Melyik több, és mennyivel? 242 · 41 vagy 328 · 11 + 118 · 51',
    options: ['242 · 41, 296-tal', '328 · 11 + 118 · 51, 296-tal', '242 · 41, 396-tal', 'Egyenlők.'],
    correctAnswer: 0,
    explanation: '242 · 41 = 9922. 328 · 11 = 3608, 118 · 51 = 6018, összegük 9626. 9922 − 9626 = 296.'
  },
  {
    id: 'wme-h16',
    level: 3,
    questionTypeBadge: 'Nyílkör',
    figure: <ArrowCycleSvg className={FIG} />,
    question: 'Kövesd a nyilakat a 314-től! Melyik szám kerül a D helyére?',
    options: ['2458', '8745', '795', '3768'],
    correctAnswer: 0,
    explanation: 'A = 314 · 12 = 3768, B = 3768 − 2973 = 795, C = 795 · 11 = 8745, D = 8745 − 6287 = 2458.'
  },
  {
    id: 'wme-h17',
    level: 3,
    questionTypeBadge: 'Láncszorzás',
    figure: <QChain start="157" ops={['· 3', '· 11']} boxes={['471', '?']} />,
    question: 'A 157-et megszorozzuk 3-mal, aztán 11-gyel. Mi lesz a végeredmény?',
    options: ['5181', '471', '5171', '2198'],
    correctAnswer: 0,
    explanation: '157 · 3 = 471. 471 · 11 = 471 + 4710 = 5181.'
  },
  {
    id: 'wme-h18',
    level: 3,
    questionTypeBadge: 'Láncszorzás',
    figure: <QChain start="241" ops={['· 13', '· 2']} boxes={['?', '?']} />,
    question: 'A 241-et megszorozzuk 13-mal, aztán 2-vel. Mi lesz a végeredmény?',
    options: ['6266', '3133', '6276', '3626'],
    correctAnswer: 0,
    explanation: '241 · 13 = 723 + 2410 = 3133. 3133 · 2 = 6266.'
  },
  {
    id: 'wme-h19',
    level: 3,
    questionTypeBadge: 'Hibavadász',
    question: 'Karesz és Kitti füzetéből: melyik eredmény HELYES?',
    options: ['93 · 75 = 6975', '93 · 65 = 6035', '25 · 93 + 1677 = 4020', '52 · 39 + 5608 = 7663'],
    correctAnswer: 0,
    explanation: '93 · 75 = 465 + 6510 = 6975 ✔. Helyesen: 93 · 65 = 6045, 25 · 93 + 1677 = 4002, 52 · 39 + 5608 = 7636.'
  },
  {
    id: 'wme-h20',
    level: 3,
    questionTypeBadge: 'Hibavadász',
    question: 'Kitti szerint 412 · 23 − 1476 = 7000. Mi a helyes eredmény?',
    options: ['8000', '7000', '9476', '8100'],
    correctAnswer: 0,
    explanation: '412 · 23 = 1236 + 8240 = 9476. 9476 − 1476 = 8000.'
  },
  {
    id: 'wme-h21',
    level: 3,
    questionTypeBadge: 'Következtetés',
    figure: (
      <QTable
        title="Tanszerek"
        rows={[
          { k: 'radír', v: '□' },
          { k: 'füzet (2-szer annyi, mint a radír)', v: '?' },
          { k: 'toll (9-szer annyi, mint a füzet)', v: '?' },
          { k: 'együtt', v: '1890 Ft' }
        ]}
      />
    ),
    question: 'A füzet kétszer annyiba kerül, mint a radír, a toll kilencszer annyiba, mint a füzet. Együtt 1890 Ft. Mennyibe kerül a toll?',
    options: ['1620 Ft', '180 Ft', '90 Ft', '1710 Ft'],
    correctAnswer: 0,
    explanation: 'Ha a radír 1 rész, a füzet 2 rész, a toll 18 rész: összesen 21 rész = 1890 Ft, 1 rész 90 Ft. A toll 18 · 90 = 1620 Ft.'
  },
  {
    id: 'wme-h22',
    level: 3,
    questionTypeBadge: 'Távolság',
    figure: <QTrees n={10} gap="758 cm" />,
    question: 'Egy fasorban két szomszédos fa távolsága 758 cm. Milyen messze van egymástól az 1. és a 10. fa?',
    options: ['6822 cm', '7580 cm', '8338 cm', '6064 cm'],
    correctAnswer: 0,
    explanation: '10 fa között csak 9 köz van! 758 · 9 = 6822 cm. (A 7580 cm akkor jön ki, ha 10 közzel számolsz.)'
  },
  {
    id: 'wme-h23',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    question: 'A Lepkefutamon 170 felnőtt egyenként 29-féle lepkét látott. Hány lepke ez összesen?',
    options: ['4930', '4590', '1530', '5100'],
    correctAnswer: 0,
    explanation: '170 · 29: 170 · 9 = 1530, 170 · 2 = 340 tízes = 3400. 1530 + 3400 = 4930.'
  },
  {
    id: 'wme-h24',
    level: 3,
    questionTypeBadge: 'Szorzatkereső',
    question: 'A szalamandra foltjain lévő számok: 12, 98, 346, 43, 64, 207, 125. Melyik kettő szorzata 6272?',
    options: ['98 és 64', '98 és 43', '346 és 12', '207 és 43'],
    correctAnswer: 0,
    explanation: 'Becslés: 100 · 60 = 6000, ez közel van. 98 · 64 = 392 + 5880 = 6272. (98 · 43 = 4214, 346 · 12 = 4152, 207 · 43 = 8901.)'
  },
  {
    id: 'wme-h25',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    figure: <QMul2 a={126} b={22} hide={['product']} />,
    question: 'Ervin bácsi hétköznaponként 126 percet utazik. Hány percet utazik egy hónapban, amelyben 22 hétköznap van?',
    options: ['2772 perc', '504 perc', '2672 perc', '2782 perc'],
    correctAnswer: 0,
    explanation: '126 · 22: 126 · 2 = 252, 126 · 2 tízes = 2520. 252 + 2520 = 2772 perc.'
  },
  {
    id: 'wme-h26',
    level: 3,
    questionTypeBadge: 'Gondolkodj!',
    question: 'Egy bivaly az év 183 napján van kint a legelőn. Hány napig van kint 60 ugyanilyen bivaly, ha mind együtt legelnek?',
    options: ['183 napig', '10 980 napig', '3 napig', '243 napig'],
    correctAnswer: 0,
    explanation: 'Együtt vannak kint, ezért a 60 bivaly is ugyanannyi napig: 183 napig. Itt nem kell szorozni!'
  },
  {
    id: 'wme-h27',
    level: 3,
    questionTypeBadge: 'Láncszorzás',
    question: 'Mennyi 16 · 18 · 14?',
    options: ['4032', '288', '4022', '4132'],
    correctAnswer: 0,
    explanation: '16 · 18 = 128 + 160 = 288. 288 · 14 = 1152 + 2880 = 4032.'
  },
  {
    id: 'wme-h28',
    level: 3,
    questionTypeBadge: 'Számkártyák',
    figure: <QCards digits={['5', '2', '3', '7', '4']} note="kétjegyű · kétjegyű, 1000 és 3000 között" />,
    question: 'Az 5, 2, 3, 7, 4 kártyákból két kétjegyű számot raktunk ki. Melyik szorzat van 1000 és 3000 között?',
    options: ['52 · 37', '75 · 43', '74 · 53', '25 · 34'],
    correctAnswer: 0,
    explanation: '52 · 37 = 364 + 1560 = 1924, ez 1000 és 3000 között van. 75 · 43 = 3225, 74 · 53 = 3922, 25 · 34 = 850.'
  },
  {
    id: 'wme-h29',
    level: 3,
    questionTypeBadge: 'Írásbeli szorzás',
    figure: <QMul2 a={427} b={23} hide={['product']} />,
    question: 'A szorzótényezők a 23 és a 427. Mennyi a szorzat?',
    options: ['9821', '2135', '9721', '9831'],
    correctAnswer: 0,
    explanation: '427 · 23: 427 · 3 = 1281, 427 · 2 = 854 tízes = 8540. 1281 + 8540 = 9821.'
  },
  {
    id: 'wme-h30',
    level: 3,
    questionTypeBadge: 'Írásbeli szorzás',
    figure: <QMul2 a={384} b={24} hide={['p2', 'product']} />,
    question: 'A szorzandó a 384, a szorzó a 24. Mennyi a szorzat?',
    options: ['9216', '2304', '9116', '9226'],
    correctAnswer: 0,
    explanation: '384 · 4 = 1536, 384 · 2 = 768 tízes = 7680. 1536 + 7680 = 9216. Becslés: 380 · 20 = 7600 (a 24-et lefelé kerekítettük).'
  }
];

export const WrittenMultExamQuiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => {
  return (
    <QuizTemplate
      grade={4}
      chapterId="irasbeli-szorzas"
      topicId="g4-wmult-tudasproba-quiz"
      subtopicId="gyakorlas-tudasproba"
      title="4. Gyakorlás, tudáspróba – Kvíz"
      subtitle="Fejezetzáró kvíz: 90 feladat 3 szinten – kerek tízesek, írásbeli szorzás kétjegyű szorzóval, becslés, műveleti sorrend, összefüggések, szöveges feladatok."
      badge="4. OSZTÁLY • VII. ÍRÁSBELI SZORZÁS • KVÍZ"
      questions={WRITTEN_MULT_EXAM_QUESTIONS}
      cheatSheets={[
        {
          title: 'Kerek tízes, százas',
          items: [
            '28 · 60 = 28 · 6 · 10 = 1680',
            '15 · 500 = 15 · 5 · 100 = 7500',
            '· 10 · 10 = · 100',
            'Figyelj: 48 · 50 = 2400 (két 0!)'
          ]
        },
        {
          title: 'Írásbeli szorzás',
          items: [
            'Becslés: kerekíts tízesre!',
            '1. sor: szorzandó · egyesek',
            '2. sor: szorzandó · tízesek, egy hellyel balra',
            'Összeadás, ellenőrzés felcseréléssel'
          ]
        },
        {
          title: 'Összefüggések, sorrend',
          items: [
            'Előbb a zárójel, aztán a szorzás, végül + és −',
            'Egyik · 2, másik : 2 → a szorzat nem változik',
            '10 fa között 9 köz van!',
            'Egyszerre történik? Akkor nem kell szorozni!'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <WrittenMultExamMatcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <WrittenMultExamSorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default WrittenMultExamQuiz;
