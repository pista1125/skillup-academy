import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { Numbers500G3Matcher } from './Numbers500G3Matcher';
import { Numbers500G3Sorter } from './Numbers500G3Sorter';
import { FONT, UNK, BlockRow, blockRowWidth, Abacus, Coin, NumLine500, Mark, DigitCardRow } from './Numbers500G3Parts';

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

/** Százas lapok, tízesrudak, egyeskockák. */
const BlocksFig: React.FC<{ sz: number; t: number; e: number }> = ({ sz, t, e }) => {
  const s = blockRowWidth(sz, t, e, 5) > 220 ? 4 : 5;
  const w = blockRowWidth(sz, t, e, s);
  return (
    <QFig h={s * 10 + 44}>
      <BlockRow x={(240 - w) / 2} y={12} sz={sz} t={t} e={e} s={s} />
      <text x="120" y={s * 10 + 34} textAnchor="middle" fontSize="10.5" fill="#475569">lap = 100, rúd = 10, kocka = 1</text>
    </QFig>
  );
};

/** Golyós számoló: piros = 100, kék = 10, sárga = 1. */
const AbacusFig: React.FC<{ sz: number; t: number; e: number }> = ({ sz, t, e }) => {
  const m = Math.max(sz, t, e, 7);
  const beadH = m * 9.8 + 12;
  const top = 10;
  const H = top + beadH + 32;
  return (
    <QFig h={H}>
      <Abacus x={70} y={top} h={beadH} sz={sz} t={t} e={e} gap={40} />
      <circle cx="190" cy={top + 14} r="4.6" fill="#ef4444" stroke="#991b1b" />
      <text x="198" y={top + 18} fontSize="10.5" fill="#334155">= 100</text>
      <circle cx="190" cy={top + 32} r="4.6" fill="#38bdf8" stroke="#0369a1" />
      <text x="198" y={top + 36} fontSize="10.5" fill="#334155">= 10</text>
      <circle cx="190" cy={top + 50} r="4.6" fill="#facc15" stroke="#a16207" />
      <text x="198" y={top + 54} fontSize="10.5" fill="#334155">= 1</text>
      <text x="70" y={H - 8} textAnchor="middle" fontSize="10" fill="#991b1b">százas</text>
      <text x="110" y={H - 8} textAnchor="middle" fontSize="10" fill="#0369a1">tízes</text>
      <text x="150" y={H - 8} textAnchor="middle" fontSize="10" fill="#a16207">egyes</text>
    </QFig>
  );
};

/** Érmék sorban. */
const CoinsFig: React.FC<{ coins: number[] }> = ({ coins }) => {
  const step = Math.min(46, 216 / coins.length);
  const x0 = 120 - ((coins.length - 1) * step) / 2;
  return (
    <QFig h={78}>
      {coins.map((v, i) => (
        <Coin key={i} cx={x0 + i * step} cy={39} v={v} r={Math.min(v >= 100 ? 21 : v >= 50 ? 19 : v >= 20 ? 17 : 15, step / 2 - 1)} />
      ))}
    </QFig>
  );
};

/** Dobozsor: '?' = keresett szám. */
const RowFig: React.FC<{ items: string[]; sep?: string }> = ({ items, sep }) => {
  const n = items.length;
  const w = n > 4 ? 40 : 46;
  const gap = sep ? 18 : 8;
  const x0 = (240 - (n * w + (n - 1) * gap)) / 2;
  return (
    <QFig h={66}>
      {items.map((t, i) => {
        const q = t === '?';
        return (
          <g key={i}>
            <rect x={x0 + i * (w + gap)} y="14" width={w} height="36" rx="8" fill={q ? '#fee2e2' : '#ecfeff'} stroke={q ? UNK : '#0891b2'} strokeWidth="1.6" />
            <text x={x0 + i * (w + gap) + w / 2} y="39" textAnchor="middle" fontSize={t.length > 3 ? 15 : 17} fontWeight="bold" fill={q ? UNK : '#164e63'}>{t}</text>
            {sep && i < n - 1 && (
              <text x={x0 + i * (w + gap) + w + gap / 2} y="39" textAnchor="middle" fontSize="18" fontWeight="bold" fill={UNK}>{sep}</text>
            )}
          </g>
        );
      })}
    </QFig>
  );
};

/** Számegyenes-részlet. */
const LineFig: React.FC<{ lo: number; hi: number; tick: number; big: number; labels: number[]; marks: Mark[] }> = ({ lo, hi, tick, big, labels, marks }) => (
  <NumLine500 lo={lo} hi={hi} tickEvery={tick} bigEvery={big} labels={labels} marks={marks} W={240} H={92} className={CLS} />
);

/** Szám, egy jegye bekeretezve. */
const BoxedFig: React.FC<{ num: string; idx: number }> = ({ num, idx }) => {
  const W = 40;
  const x0 = 120 - (num.length * W) / 2;
  return (
    <QFig h={78}>
      {num.split('').map((d, i) => (
        <g key={i}>
          {i === idx && <rect x={x0 + i * W + 3} y="10" width={W - 6} height="58" rx="7" fill="#fef3c7" stroke="#d97706" strokeWidth="2.5" />}
          <text x={x0 + i * W + W / 2} y="55" textAnchor="middle" fontSize="40" fontWeight="bold" fill="#1e293b">{d}</text>
        </g>
      ))}
    </QFig>
  );
};

/** Számkártyák. */
const CardsFig: React.FC<{ digits: string[] }> = ({ digits }) => {
  const s = 34;
  const w = digits.length * (s + 6) - 6;
  return (
    <QFig h={66}>
      <DigitCardRow x={(240 - w) / 2} y={11} digits={digits} s={s} colors={['#fef9c3', '#dcfce7', '#e0f2fe', '#fae8ff']} />
    </QFig>
  );
};

/** Számtábla-részlet: [sor, oszlop, szöveg, kiemelés]. */
const FragFig: React.FC<{ cells: [number, number, string, ('start' | 'q')?][]; rows: number; cols: number }> = ({ cells, rows, cols }) => {
  const S = 36;
  const x0 = (240 - cols * S) / 2;
  const h = 14 + rows * S + 12;
  const map = new Map(cells.map((c) => [`${c[0]}-${c[1]}`, c]));
  return (
    <QFig h={h}>
      {Array.from({ length: rows * cols }, (_, k) => {
        const r = Math.floor(k / cols);
        const c = k % cols;
        const cell = map.get(`${r}-${c}`);
        const kind = cell?.[3];
        return (
          <g key={k}>
            <rect x={x0 + c * S} y={12 + r * S} width={S} height={S} fill={kind === 'start' ? '#fde68a' : kind === 'q' ? '#fee2e2' : '#fff'} stroke="#64748b" />
            {cell && (
              <text x={x0 + c * S + S / 2} y={12 + r * S + S / 2 + 5} textAnchor="middle" fontSize="13" fontWeight="bold" fill={kind === 'q' ? UNK : '#1e293b'}>{cell[2]}</text>
            )}
          </g>
        );
      })}
    </QFig>
  );
};

// ---------------------------------------------------------------------------
// Kérdések
// ---------------------------------------------------------------------------
export const NUMBERS_500_G3_QUESTIONS: QuizQuestion[] = [
  // ---------------- 1. szint ----------------
  {
    id: 'n500g3-q1',
    level: 1,
    questionTypeBadge: 'Kirakás',
    figure: <BlocksFig sz={2} t={3} e={5} />,
    question: 'Melyik szám van kirakva?',
    options: ['235', '253', '352', '325'],
    correctAnswer: 0,
    explanation: '2 lap = 200, 3 rúd = 30, 5 kocka = 5. 200 + 30 + 5 = 235.'
  },
  {
    id: 'n500g3-q2',
    level: 1,
    questionTypeBadge: 'Golyós számoló',
    figure: <AbacusFig sz={4} t={1} e={6} />,
    question: 'Melyik számot mutatja a golyós számoló?',
    options: ['416', '461', '146', '164'],
    correctAnswer: 0,
    explanation: '4 piros = 400, 1 kék = 10, 6 sárga = 6. Ez 416.'
  },
  {
    id: 'n500g3-q3',
    level: 1,
    questionTypeBadge: 'Számsor',
    figure: <RowFig items={['398', '399', '?']} />,
    question: 'Melyik szám jön a 399 után?',
    options: ['400', '398', '390', '3910'],
    correctAnswer: 0,
    explanation: '399 + 1 = 400. A 9 egyes és 1 egyes együtt 1 tízes, a 9 tízes és 1 tízes együtt 1 százas.'
  },
  {
    id: 'n500g3-q4',
    level: 1,
    questionTypeBadge: 'Számok betűvel',
    question: 'Írd le számjegyekkel: háromszázhetvenkettő!',
    options: ['372', '327', '30072', '3072'],
    correctAnswer: 0,
    explanation: 'háromszáz = 300, hetven = 70, kettő = 2. Együtt 372.'
  },
  {
    id: 'n500g3-q5',
    level: 1,
    questionTypeBadge: 'Valódi érték',
    figure: <BoxedFig num="284" idx={1} />,
    question: 'Mennyit ér a bekeretezett számjegy?',
    options: ['80', '8', '84', '28'],
    correctAnswer: 0,
    explanation: 'A 8-as a tízesek helyén áll. 8 tízes = 80.'
  },
  {
    id: 'n500g3-q6',
    level: 1,
    questionTypeBadge: 'Pénz',
    figure: <CoinsFig coins={[200, 100, 50, 20, 5]} />,
    question: 'Mennyi pénz van itt?',
    options: ['375 Ft', '370 Ft', '355 Ft', '475 Ft'],
    correctAnswer: 0,
    explanation: '200 + 100 = 300. 300 + 50 = 350. 350 + 20 = 370. 370 + 5 = 375 Ft.'
  },
  {
    id: 'n500g3-q7',
    level: 1,
    questionTypeBadge: 'Számsor',
    figure: <RowFig items={['100', '150', '200', '?']} />,
    question: 'Ötvenesével lépünk. Melyik szám jön?',
    options: ['250', '210', '300', '205'],
    correctAnswer: 0,
    explanation: 'Mindig 50-nel több jön: 200 + 50 = 250.'
  },
  {
    id: 'n500g3-q8',
    level: 1,
    questionTypeBadge: 'Összehasonlítás',
    figure: <RowFig items={['409', '490']} />,
    question: 'Melyik szám a nagyobb?',
    options: ['490', '409', 'Egyformák', 'Nem lehet tudni'],
    correctAnswer: 0,
    explanation: 'A százasok egyformák (4). A tízeseket nézzük: 9 tízes több, mint 0 tízes. 490 > 409.'
  },
  {
    id: 'n500g3-q9',
    level: 1,
    questionTypeBadge: 'Százasok',
    question: 'Hány százas lap kell az 500 kirakásához?',
    options: ['5', '50', '500', '10'],
    correctAnswer: 0,
    explanation: 'Egy lap 100. 100, 200, 300, 400, 500 – ez 5 lap.'
  },
  {
    id: 'n500g3-q10',
    level: 1,
    questionTypeBadge: 'Számegyenes',
    figure: <LineFig lo={300} hi={400} tick={10} big={50} labels={[300, 350, 400]} marks={[{ v: 370, label: '?' }]} />,
    question: 'Melyik számot jelöli a pont?',
    options: ['370', '307', '360', '380'],
    correctAnswer: 0,
    explanation: 'Egy osztás 10-et ér. A 350-től még 2 lépés: 360, 370.'
  },

  // ---------------- 2. szint ----------------
  {
    id: 'n500g3-q11',
    level: 2,
    questionTypeBadge: 'Kirakás',
    figure: <BlocksFig sz={4} t={0} e={7} />,
    question: 'Melyik szám van kirakva?',
    options: ['407', '470', '47', '4007'],
    correctAnswer: 0,
    explanation: '4 lap = 400. Rúd nincs, ezért a tízesek helyére 0 kerül. 7 kocka = 7. Ez 407.'
  },
  {
    id: 'n500g3-q12',
    level: 2,
    questionTypeBadge: 'Golyós számoló',
    figure: <AbacusFig sz={3} t={5} e={0} />,
    question: 'Melyik számot mutatja a golyós számoló?',
    options: ['350', '305', '35', '360'],
    correctAnswer: 0,
    explanation: '3 piros = 300, 5 kék = 50. A sárga rúd üres, oda 0 kerül. Ez 350.'
  },
  {
    id: 'n500g3-q13',
    level: 2,
    questionTypeBadge: 'Számok betűvel',
    figure: <RowFig items={['408']} />,
    question: 'Hogyan írjuk betűvel ezt a számot?',
    options: ['négyszáznyolc', 'negyvennyolc', 'négyszáznyolcvan', 'nyolcszáznégy'],
    correctAnswer: 0,
    explanation: '408 = 400 + 8. Négyszáz és nyolc: négyszáznyolc. Tízes nincs benne.'
  },
  {
    id: 'n500g3-q14',
    level: 2,
    questionTypeBadge: 'Számegyenes',
    figure: (
      <LineFig
        lo={0}
        hi={500}
        tick={50}
        big={100}
        labels={[0, 100, 200, 300, 400, 500]}
        marks={[
          { v: 150, label: 'A', color: '#7c3aed' },
          { v: 350, label: 'B', color: '#059669' },
          { v: 450, label: 'C', color: '#ea580c' }
        ]}
      />
    ),
    question: 'Melyik betű jelöli a 450-et?',
    options: ['C', 'B', 'A', 'Egyik sem'],
    correctAnswer: 0,
    explanation: 'A 450 a 400 és az 500 között van, pont középen. Ott a C betű áll.'
  },
  {
    id: 'n500g3-q15',
    level: 2,
    questionTypeBadge: 'Helyiérték',
    question: 'Melyik számban ér a 3-as 300-at?',
    options: ['362', '236', '423', '143'],
    correctAnswer: 0,
    explanation: 'A 3-as akkor ér 300-at, ha a százasok helyén áll. Ez a 362.'
  },
  {
    id: 'n500g3-q16',
    level: 2,
    questionTypeBadge: 'Számtábla',
    figure: (
      <FragFig
        rows={2}
        cols={3}
        cells={[
          [0, 0, '344'],
          [0, 1, '345', 'start'],
          [0, 2, '346'],
          [1, 1, '?', 'q']
        ]}
      />
    ),
    question: 'Ez a 301–400 tábla egy darabja. Melyik szám áll a 345 alatt?',
    options: ['355', '346', '445', '335'],
    correctAnswer: 0,
    explanation: 'A táblán lefelé lépve 10-zel több jön: 345 + 10 = 355.'
  },
  {
    id: 'n500g3-q17',
    level: 2,
    questionTypeBadge: 'Számsor',
    figure: <RowFig items={['480', '460', '440', '?']} />,
    question: 'Húszasával lépünk visszafelé. Melyik szám jön?',
    options: ['420', '430', '400', '410'],
    correctAnswer: 0,
    explanation: 'Mindig 20-szal kevesebb: 440 − 20 = 420.'
  },
  {
    id: 'n500g3-q18',
    level: 2,
    questionTypeBadge: 'Pénz',
    figure: <CoinsFig coins={[200, 200, 50, 10, 10, 5]} />,
    question: 'Mennyi pénz van itt?',
    options: ['475 Ft', '465 Ft', '275 Ft', '485 Ft'],
    correctAnswer: 0,
    explanation: '200 + 200 = 400. 400 + 50 = 450. 450 + 10 + 10 = 470. 470 + 5 = 475 Ft.'
  },
  {
    id: 'n500g3-q19',
    level: 2,
    questionTypeBadge: 'Bontás',
    question: 'Melyik szám ez? 4 sz + 2 t + 9 e',
    options: ['429', '492', '249', '4209'],
    correctAnswer: 0,
    explanation: '4 százas = 400, 2 tízes = 20, 9 egyes = 9. 400 + 20 + 9 = 429.'
  },
  {
    id: 'n500g3-q20',
    level: 2,
    questionTypeBadge: 'Összehasonlítás',
    figure: <RowFig items={['318', '?', '381']} />,
    question: 'Melyik jel kerül a „?” helyére?',
    options: ['<', '>', '=', 'Bármelyik jó'],
    correctAnswer: 0,
    explanation: 'A százasok egyformák (3). A tízesek: 1 kevesebb, mint 8. Ezért 318 < 381.'
  },

  // ---------------- 3. szint ----------------
  {
    id: 'n500g3-q21',
    level: 3,
    questionTypeBadge: 'Beváltás',
    figure: <BlocksFig sz={2} t={12} e={4} />,
    question: 'Ennyi lap, rúd és kocka van az asztalon. Melyik szám ez?',
    options: ['324', '2124', '224', '342'],
    correctAnswer: 0,
    explanation: '12 rúd = 10 rúd + 2 rúd. A 10 rúd 1 lap. Így 3 lap, 2 rúd, 4 kocka: 324.'
  },
  {
    id: 'n500g3-q22',
    level: 3,
    questionTypeBadge: 'Beváltás',
    question: 'Melyik szám ez? 3 sz + 15 t + 8 e',
    options: ['458', '3158', '368', '358'],
    correctAnswer: 0,
    explanation: '15 tízes = 150. 300 + 150 + 8 = 458.'
  },
  {
    id: 'n500g3-q23',
    level: 3,
    questionTypeBadge: 'Beváltás',
    question: 'Melyik szám ez? 41 t + 6 e',
    options: ['416', '4106', '47', '461'],
    correctAnswer: 0,
    explanation: '41 tízes = 410. 410 + 6 = 416.'
  },
  {
    id: 'n500g3-q24',
    level: 3,
    questionTypeBadge: 'Számkártyák',
    figure: <CardsFig digits={['1', '4', '0']} />,
    question: 'Mindhárom kártyát felhasználod. Melyik a legnagyobb háromjegyű szám?',
    options: ['410', '401', '140', '104'],
    correctAnswer: 0,
    explanation: 'Előre tesszük a legnagyobb jegyet (4), aztán a következőt (1), végül a 0-t: 410.'
  },
  {
    id: 'n500g3-q25',
    level: 3,
    questionTypeBadge: 'Számkártyák',
    figure: <CardsFig digits={['1', '4', '0']} />,
    question: 'Hány háromjegyű számot tudsz kirakni ezekből a kártyákból? Mindegyiket egyszer használod.',
    options: ['4', '6', '3', '2'],
    correctAnswer: 0,
    explanation: '104, 140, 401, 410. A 0 nem állhat elöl, ezért a 014 és a 041 nem háromjegyű. Ez 4 szám.'
  },
  {
    id: 'n500g3-q26',
    level: 3,
    questionTypeBadge: 'Gondoltam egy számot',
    figure: <CardsFig digits={['4', '0', '?']} />,
    question: 'A százasok helyén 4, a tízesek helyén 0 áll. Az egyes 1-gyel több, mint a százas. Melyik szám ez?',
    options: ['405', '450', '415', '45'],
    correctAnswer: 0,
    explanation: 'Az egyes: 4 + 1 = 5. A szám: 4 százas, 0 tízes, 5 egyes = 405.'
  },
  {
    id: 'n500g3-q27',
    level: 3,
    questionTypeBadge: 'Pénz',
    figure: <CoinsFig coins={[200, 50, 50, 50]} />,
    question: 'Egy 200 Ft-osod és három 50 Ft-osod van. Hány forintod van?',
    options: ['350 Ft', '250 Ft', '300 Ft', '400 Ft'],
    correctAnswer: 0,
    explanation: 'Három 50 Ft-os: 50 + 50 + 50 = 150 Ft. 200 + 150 = 350 Ft.'
  },
  {
    id: 'n500g3-q28',
    level: 3,
    questionTypeBadge: 'Sorba rendezés',
    figure: <RowFig items={['342', '324', '432', '243']} />,
    question: 'Melyik a növekvő sorrend?',
    options: ['243, 324, 342, 432', '243, 342, 324, 432', '432, 342, 324, 243', '324, 243, 342, 432'],
    correctAnswer: 0,
    explanation: 'Előbb a százasokat nézzük: 2 < 3 < 4. A két 3 százasnál a tízesek döntenek: 324 < 342.'
  },
  {
    id: 'n500g3-q29',
    level: 3,
    questionTypeBadge: 'Számegyenes',
    figure: <LineFig lo={400} hi={500} tick={5} big={50} labels={[400, 450, 500]} marks={[{ v: 465, label: '?' }]} />,
    question: 'Egy kis osztás 5-öt ér. Melyik számot jelöli a pont?',
    options: ['465', '460', '470', '430'],
    correctAnswer: 0,
    explanation: 'A 450-től 3 kis lépés: 455, 460, 465.'
  },
  {
    id: 'n500g3-q30',
    level: 3,
    questionTypeBadge: 'Kirakás',
    figure: <BlocksFig sz={2} t={8} e={0} />,
    question: 'A 287-et szeretnéd kirakni. Ennyi van már az asztalon. Hány kocka kell még?',
    options: ['7', '87', '8', '17'],
    correctAnswer: 0,
    explanation: 'Az asztalon 2 lap és 8 rúd van: 280. A 287-hez még 7 kocka kell.'
  }
];

export const Numbers500G3Quiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => {
  return (
    <QuizTemplate
      grade={3}
      chapterId="szamolas-500-ig"
      topicId="g3-c500-szamok-quiz"
      subtopicId="szamok-500-ig"
      title="1. Számok 500-ig – Kvíz"
      subtitle="30 feladat 3 szinten: kirakás, golyós számoló, helyiérték, beváltás, számsorok, számegyenes."
      badge="3. OSZTÁLY • V. SZÁMOLÁS 0-TÓL 500-IG • KVÍZ"
      questions={NUMBERS_500_G3_QUESTIONS}
      cheatSheets={[
        {
          title: 'Százas, tízes, egyes',
          items: ['1 lap = 100, 1 rúd = 10, 1 kocka = 1', '347 = 300 + 40 + 7', 'Ha egy helyen nincs semmi, 0-t írunk: 407']
        },
        {
          title: 'Beváltás',
          items: ['10 egyes = 1 tízes', '10 tízes = 1 százas', '2 sz + 13 t + 6 e = 336', '41 t + 6 e = 416']
        },
        {
          title: 'Összehasonlítás',
          items: ['Először a százasokat nézd!', 'Ha egyformák, a tízeseket.', 'Ha azok is, az egyeseket: 318 < 381']
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <Numbers500G3Matcher
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToSorter={onSwitchToSorter}
        />
      }
      sorterComponent={
        <Numbers500G3Sorter
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
          onSwitchToQuiz={() => {}}
          onSwitchToMatcher={onSwitchToMatcher}
        />
      }
    />
  );
};

export default Numbers500G3Quiz;
