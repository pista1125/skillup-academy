import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { Count200ExamG3Matcher } from './Count200ExamG3Matcher';
import { Count200ExamG3Sorter } from './Count200ExamG3Sorter';
import {
  INK,
  UNK,
  QFig,
  Blocks,
  NumLine,
  CellRow,
  PlaceTable,
  ChartPart,
  BarChart,
  Chain,
  CoinSet,
  Cards,
  CoinRows,
  RodGroups,
  Rod,
  Plates,
  Jumps,
  BigEq,
  Tag,
  Box,
  Coin
} from './Count200ExamG3Parts';

// ---------------------------------------------------------------------------
// Kérdésábra-segédek
// ---------------------------------------------------------------------------
const EqFig: React.FC<{ text: string; fs?: number }> = ({ text, fs = 24 }) => (
  <QFig h={70}>
    <BigEq text={text} y={44} fs={fs} />
  </QFig>
);
const LinesFig: React.FC<{ lines: string[]; fs?: number }> = ({ lines, fs = 20 }) => (
  <QFig h={24 + lines.length * 30}>
    {lines.map((l, i) => (
      <BigEq key={i} text={l} y={40 + i * 30} fs={fs} />
    ))}
  </QFig>
);
const BlocksFig: React.FC<{ h: number; t: number; e: number }> = ({ h, t, e }) => (
  <QFig h={80}>
    <Blocks h={h} t={t} e={e} y={14} s={50} />
  </QFig>
);
const LineFig: React.FC<React.ComponentProps<typeof NumLine> & { h?: number }> = ({ h = 90, y = 56, ...p }) => (
  <QFig h={h}>
    <NumLine y={y} {...p} />
  </QFig>
);
const CoinFig: React.FC<{ values: (number | '?')[]; note?: string }> = ({ values, note }) => (
  <QFig h={note ? 84 : 70}>
    <CoinSet values={values} y={36} r={values.length > 5 ? 13 : 16} />
    {note && (
      <text x="120" y="74" textAnchor="middle" fontSize="12" fontWeight="bold" fill={INK}>
        {note}
      </text>
    )}
  </QFig>
);
const BoxesFig: React.FC<{ n: number; label: string; note?: string }> = ({ n, label, note }) => {
  const w = 34;
  const gap = Math.min(10, (220 - n * w) / Math.max(1, n - 1));
  const x0 = 120 - (n * w + (n - 1) * gap) / 2;
  return (
    <QFig h={note ? 84 : 66}>
      {Array.from({ length: n }).map((_, i) => (
        <Box key={i} x={x0 + i * (w + gap)} y={18} label={label} />
      ))}
      {note && (
        <text x="120" y="70" textAnchor="middle" fontSize="11" fill="#334155">
          {note}
        </text>
      )}
    </QFig>
  );
};
const BARS = [
  { label: 'gyalog', v: 70, color: '#22c55e' },
  { label: 'busszal', v: 90, color: '#f59e0b' },
  { label: 'biciklivel', v: 30, color: '#3b82f6' },
  { label: 'autóval', v: 50, color: '#ec4899' }
];
const BarFig: React.FC = () => (
  <QFig h={124}>
    <text x="120" y="14" textAnchor="middle" fontSize="10" fontWeight="bold" fill={INK}>
      Hogyan jönnek iskolába?
    </text>
    <BarChart data={BARS} max={100} step={10} y={22} />
  </QFig>
);
/** Tízesrudak két csoportban (összeadáshoz). */
const TwoRodsFig: React.FC<{ a: number; b: number }> = ({ a, b }) => {
  const step = 10;
  const total = (a + b) * step + 24;
  const x0 = 120 - total / 2;
  return (
    <QFig h={86}>
      {Array.from({ length: a }).map((_, i) => (
        <Rod key={`a${i}`} x={x0 + i * step} y={14} w={7} h={50} />
      ))}
      <text x={x0 + a * step + 7} y="44" textAnchor="middle" fontSize="16" fontWeight="bold" fill={INK}>
        +
      </text>
      {Array.from({ length: b }).map((_, i) => (
        <Rod key={`b${i}`} x={x0 + a * step + 18 + i * step} y={14} w={7} h={50} />
      ))}
      <text x="120" y="80" textAnchor="middle" fontSize="10" fill="#334155">
        Egy rúd 10.
      </text>
    </QFig>
  );
};

export const COUNT200_EXAM_G3_QUESTIONS: QuizQuestion[] = [
  // ======================================================================= 1. szint
  {
    id: 'c200e-q1',
    level: 1,
    questionTypeBadge: 'Számkép',
    figure: <BlocksFig h={1} t={4} e={6} />,
    question: 'Melyik számot raktuk ki? (piros = 100, kék = 10, sárga = 1)',
    options: ['146', '164', '140', '106'],
    correctAnswer: 0,
    explanation: '1 százas, 4 tízes, 6 egyes: 100 + 40 + 6 = 146.'
  },
  {
    id: 'c200e-q2',
    level: 1,
    questionTypeBadge: 'Számírás',
    question: 'Hogy írjuk számjegyekkel: százhuszonhét?',
    options: ['127', '172', '117', '107'],
    correctAnswer: 0,
    explanation: 'Száz = 1 százas, huszon = 2 tízes, hét = 7 egyes. Ez 127.'
  },
  {
    id: 'c200e-q3',
    level: 1,
    questionTypeBadge: 'Helyiérték',
    figure: (
      <QFig h={80}>
        <PlaceTable digits={['1', '5', '3']} y={12} />
      </QFig>
    ),
    question: 'Melyik számot írtuk a táblázatba?',
    options: ['153', '135', '150', '103'],
    correctAnswer: 0,
    explanation: '1 százas, 5 tízes, 3 egyes: 153.'
  },
  {
    id: 'c200e-q4',
    level: 1,
    questionTypeBadge: 'Számszomszéd',
    figure: (
      <QFig h={64}>
        <CellRow cells={['139', '?']} heads={['szám', 'nagyobb egyes szomszéd']} y={22} cw={90} />
      </QFig>
    ),
    question: 'Mi a 139 nagyobb egyes szomszédja?',
    options: ['140', '138', '149', '130'],
    correctAnswer: 0,
    explanation: 'Az egyes szomszéd 1-gyel nagyobb: 139 + 1 = 140.'
  },
  {
    id: 'c200e-q5',
    level: 1,
    questionTypeBadge: 'Számszomszéd',
    figure: <LineFig from={150} to={180} step={1} labelEvery={10} marks={[{ v: 167, label: '167' }]} />,
    question: 'Mi a 167 kisebb tízes szomszédja?',
    options: ['160', '170', '166', '100'],
    correctAnswer: 0,
    explanation: 'A 167 a 160 és a 170 között van. A kisebb tízes szomszéd a 160.'
  },
  {
    id: 'c200e-q6',
    level: 1,
    questionTypeBadge: 'Kerekítés',
    figure: <LineFig from={180} to={190} step={1} labelEvery={5} marks={[{ v: 184, label: '184' }]} />,
    question: 'Kerekítsd tízesre: 184 ≈ ?',
    options: ['180', '190', '185', '200'],
    correctAnswer: 0,
    explanation: 'A 184 a 180-hoz van közelebb (4 lépés), mint a 190-hez (6 lépés). 184 ≈ 180.'
  },
  {
    id: 'c200e-q7',
    level: 1,
    questionTypeBadge: 'Számegyenes',
    figure: <LineFig from={0} to={200} step={10} labelEvery={5} marks={[{ v: 120, label: '?' }]} />,
    question: 'Melyik számnál van a nyíl?',
    options: ['120', '110', '130', '102'],
    correctAnswer: 0,
    explanation: 'Egy kis osztás 10. A 100 után még 2 osztás: 120.'
  },
  {
    id: 'c200e-q8',
    level: 1,
    questionTypeBadge: 'Összeadás',
    question: 'Mennyi 120 + 50?',
    options: ['170', '125', '70', '160'],
    correctAnswer: 0,
    explanation: '12 tízes + 5 tízes = 17 tízes, ez 170.'
  },
  {
    id: 'c200e-q9',
    level: 1,
    questionTypeBadge: 'Kivonás',
    question: 'Mennyi 180 − 60?',
    options: ['120', '110', '140', '160'],
    correctAnswer: 0,
    explanation: '18 tízes − 6 tízes = 12 tízes, ez 120.'
  },
  {
    id: 'c200e-q10',
    level: 1,
    questionTypeBadge: 'Szorzás',
    figure: (
      <QFig h={60}>
        <CoinRows v={20} n={4} y={30} />
      </QFig>
    ),
    question: 'Négy darab 20 forintos. Mennyi ez? (4 · 20)',
    options: ['80 Ft', '8 Ft', '24 Ft', '60 Ft'],
    correctAnswer: 0,
    explanation: '4 · 20 = 4 · 2 tízes = 8 tízes = 80. Ez 80 Ft.'
  },
  {
    id: 'c200e-q11',
    level: 1,
    questionTypeBadge: 'Osztás',
    figure: (
      <QFig h={110}>
        <BigEq text="60" y={30} fs={20} />
        <Plates n={3} y={70} r={24} />
      </QFig>
    ),
    question: 'A 60-at 3 egyenlő részre osztjuk. Mennyi jut egy tányérra? (60 : 3)',
    options: ['20', '2', '57', '30'],
    correctAnswer: 0,
    explanation: '6 tízes : 3 = 2 tízes, ez 20. Ellenőrzés: 20 · 3 = 60.'
  },
  {
    id: 'c200e-q12',
    level: 1,
    questionTypeBadge: 'Pénz',
    figure: <CoinFig values={[100, 50, 20, 5]} />,
    question: 'Hány forint van a képen?',
    options: ['175 Ft', '170 Ft', '165 Ft', '185 Ft'],
    correctAnswer: 0,
    explanation: '100 + 50 = 150, 150 + 20 = 170, 170 + 5 = 175. Ez 175 Ft.'
  },
  {
    id: 'c200e-q13',
    level: 1,
    questionTypeBadge: 'Páros, páratlan',
    question: 'Melyik szám páros?',
    options: ['146', '133', '151', '197'],
    correctAnswer: 0,
    explanation: 'A páros szám egyesek helyén 0, 2, 4, 6 vagy 8 áll. A 146 végén 6 van.'
  },
  {
    id: 'c200e-q14',
    level: 1,
    questionTypeBadge: 'Összehasonlítás',
    question: 'Melyik a legkisebb szám?',
    options: ['109', '190', '119', '191'],
    correctAnswer: 0,
    explanation: 'Mindegyikben 1 százas van. A tízeseket nézzük: a 109-ben 0 tízes van, ez a legkevesebb.'
  },
  {
    id: 'c200e-q15',
    level: 1,
    questionTypeBadge: 'Számtábla',
    figure: (
      <QFig h={82}>
        <ChartPart start={132} rows={3} cols={6} unknown={145} hi={135} />
      </QFig>
    ),
    question: 'Ez a számtábla egy része. Melyik szám van a zöld 135 alatt?',
    options: ['145', '136', '125', '155'],
    correctAnswer: 0,
    explanation: 'A számtáblán lefelé lépve 10-zel nagyobb szám jön: 135 + 10 = 145.'
  },
  {
    id: 'c200e-q16',
    level: 1,
    questionTypeBadge: 'Sorozat',
    figure: (
      <QFig h={76}>
        <Chain values={['200', '190', '180', '?']} ops={['− 10', '− 10', '− 10']} />
      </QFig>
    ),
    question: 'Folytasd a sort! Melyik szám jön?',
    options: ['170', '160', '190', '179'],
    correctAnswer: 0,
    explanation: 'Mindig 10-zel kevesebb: 180 − 10 = 170.'
  },
  {
    id: 'c200e-q17',
    level: 1,
    questionTypeBadge: 'Számszomszéd',
    figure: <LineFig from={147} to={153} step={1} labelEvery={1} hideLabels={[150]} marks={[{ v: 150, label: '?' }]} />,
    question: 'Melyik szám van a 149 és a 151 között?',
    options: ['150', '148', '152', '140'],
    correctAnswer: 0,
    explanation: 'A 149 után a 150 jön, utána a 151.'
  },
  {
    id: 'c200e-q18',
    level: 1,
    questionTypeBadge: 'Helyiérték',
    question: 'A 172-ben melyik számjegy áll a tízesek helyén?',
    options: ['7', '1', '2', '70'],
    correctAnswer: 0,
    explanation: '172 = 1 százas + 7 tízes + 2 egyes. A tízesek helyén a 7 áll.'
  },
  {
    id: 'c200e-q19',
    level: 1,
    questionTypeBadge: 'Összeadás',
    figure: <TwoRodsFig a={9} b={3} />,
    question: 'Mennyi 90 + 30?',
    options: ['120', '110', '93', '130'],
    correctAnswer: 0,
    explanation: '9 tízes + 3 tízes = 12 tízes, ez 120.'
  },
  {
    id: 'c200e-q20',
    level: 1,
    questionTypeBadge: 'Kivonás',
    question: 'Mennyi 150 − 50?',
    options: ['100', '50', '200', '110'],
    correctAnswer: 0,
    explanation: '15 tízes − 5 tízes = 10 tízes, ez 100.'
  },
  {
    id: 'c200e-q21',
    level: 1,
    questionTypeBadge: 'Pótlás 200-ra',
    figure: <EqFig text="160 + □ = 200" />,
    question: 'Melyik szám kerül a □ helyére?',
    options: ['40', '60', '50', '140'],
    correctAnswer: 0,
    explanation: '160-tól 200-ig 4 tízes hiányzik: 160 + 40 = 200.'
  },
  {
    id: 'c200e-q22',
    level: 1,
    questionTypeBadge: 'Szorzás',
    question: 'Mennyi 2 · 90?',
    options: ['180', '18', '92', '160'],
    correctAnswer: 0,
    explanation: '2 · 9 tízes = 18 tízes, ez 180.'
  },
  {
    id: 'c200e-q23',
    level: 1,
    questionTypeBadge: 'Bennfoglalás',
    figure: (
      <QFig h={96}>
        <Jumps to={100} size={20} y={66} labelEvery={20} />
      </QFig>
    ),
    question: 'Hányszor van meg a 20 a 100-ban? Számold meg az ugrásokat!',
    options: ['5', '50', '80', '4'],
    correctAnswer: 0,
    explanation: '20, 40, 60, 80, 100: 5 ugrás. 100 : 20 = 5.'
  },
  {
    id: 'c200e-q24',
    level: 1,
    questionTypeBadge: 'Számkép',
    figure: <BlocksFig h={1} t={9} e={0} />,
    question: 'Melyik számot raktuk ki?',
    options: ['190', '109', '100', '199'],
    correctAnswer: 0,
    explanation: '1 százas és 9 tízes: 100 + 90 = 190. Egyes nincs, ezért a végén 0 áll.'
  },
  {
    id: 'c200e-q25',
    level: 1,
    questionTypeBadge: 'Számegyenes',
    figure: <LineFig from={100} to={200} step={10} labelEvery={5} marks={[{ v: 170, label: '?' }]} />,
    question: 'Melyik számnál van a nyíl?',
    options: ['170', '160', '180', '107'],
    correctAnswer: 0,
    explanation: 'A 150 után még 2 kis osztás: 160, 170.'
  },
  {
    id: 'c200e-q26',
    level: 1,
    questionTypeBadge: 'Összehasonlítás',
    figure: <EqFig text="158 ? 185" />,
    question: 'Melyik állítás igaz?',
    options: ['158 < 185', '158 > 185', '158 = 185', '185 < 158'],
    correctAnswer: 0,
    explanation: 'A százasok egyformák. A tízesek: 5 kevesebb, mint 8. Ezért 158 < 185.'
  },
  {
    id: 'c200e-q27',
    level: 1,
    questionTypeBadge: 'Pénz',
    figure: <CoinFig values={[100, 20]} note="+ 50 Ft" />,
    question: 'Van 120 forintod. Kapsz még 50 forintot. Mennyi pénzed lesz?',
    options: ['170 Ft', '70 Ft', '125 Ft', '160 Ft'],
    correctAnswer: 0,
    explanation: '120 + 50 = 170. 170 Ft-od lesz.'
  },
  {
    id: 'c200e-q28',
    level: 1,
    questionTypeBadge: 'Kerekítés',
    figure: <LineFig from={120} to={130} step={1} labelEvery={5} marks={[{ v: 125, label: '125' }]} />,
    question: 'Kerekítsd tízesre: 125 ≈ ?',
    options: ['130', '120', '100', '125'],
    correctAnswer: 0,
    explanation: 'A 125 pont középen van. Ha az egyesek helyén 5 áll, felfelé kerekítünk: 125 ≈ 130.'
  },
  {
    id: 'c200e-q29',
    level: 1,
    questionTypeBadge: 'Szorzás',
    figure: <BoxesFig n={5} label="30" />,
    question: 'Öt doboz, mindegyikben 30 kréta. Hány kréta van? (5 · 30)',
    options: ['150', '35', '15', '120'],
    correctAnswer: 0,
    explanation: '5 · 3 tízes = 15 tízes, ez 150.'
  },
  {
    id: 'c200e-q30',
    level: 1,
    questionTypeBadge: 'Tízesek',
    question: 'Egy csomagban 10 szalvéta van. Hány szalvéta van 16 csomagban?',
    options: ['160', '26', '106', '61'],
    correctAnswer: 0,
    explanation: '16 tízes = 160. Tehát 16 · 10 = 160 szalvéta.'
  },

  // ======================================================================= 2. szint
  {
    id: 'c200e-q31',
    level: 2,
    questionTypeBadge: 'Számkép',
    figure: <BlocksFig h={1} t={0} e={8} />,
    question: 'Melyik számot raktuk ki?',
    options: ['108', '180', '18', '118'],
    correctAnswer: 0,
    explanation: '1 százas, 0 tízes, 8 egyes. A tízesek helyére 0 kerül: 108.'
  },
  {
    id: 'c200e-q32',
    level: 2,
    questionTypeBadge: 'Bontás',
    figure: (
      <QFig h={80}>
        <Blocks h={0} t={16} e={3} y={12} s={50} />
      </QFig>
    ),
    question: '16 tízes és 3 egyes. Melyik szám ez?',
    options: ['163', '19', '160', '136'],
    correctAnswer: 0,
    explanation: '16 tízes = 160. 160 + 3 = 163.'
  },
  {
    id: 'c200e-q33',
    level: 2,
    questionTypeBadge: 'Bontás',
    figure: <EqFig text="1 sz + 8 t + 12 e = ?" fs={20} />,
    question: 'Melyik szám ez: 1 százas + 8 tízes + 12 egyes?',
    options: ['192', '182', '128', '180'],
    correctAnswer: 0,
    explanation: 'A 12 egyes = 1 tízes + 2 egyes. Így 1 százas + 9 tízes + 2 egyes = 192.'
  },
  {
    id: 'c200e-q34',
    level: 2,
    questionTypeBadge: 'Valódi érték',
    figure: (
      <QFig h={80}>
        <PlaceTable digits={['1', '7', '6']} y={12} hi={1} />
      </QFig>
    ),
    question: 'Mennyi a 7-es valódi értéke a 176-ban?',
    options: ['70', '7', '17', '100'],
    correctAnswer: 0,
    explanation: 'A 7 a tízesek helyén áll. 7 tízes valódi értéke 70.'
  },
  {
    id: 'c200e-q35',
    level: 2,
    questionTypeBadge: 'Számegyenes',
    figure: <LineFig from={100} to={200} step={10} labelEvery={10} marks={[{ v: 140, label: '?' }]} />,
    question: 'Melyik számnál van a nyíl? (Egy kis osztás 10.)',
    options: ['140', '104', '150', '130'],
    correctAnswer: 0,
    explanation: 'A 100-tól 4 kis osztást lépünk: 110, 120, 130, 140.'
  },
  {
    id: 'c200e-q36',
    level: 2,
    questionTypeBadge: 'Számegyenes',
    figure: <LineFig from={170} to={180} step={1} labelEvery={10} marks={[{ v: 176, label: '?' }]} />,
    question: 'Melyik számnál van a nyíl? (Egy kis osztás 1.)',
    options: ['176', '177', '175', '186'],
    correctAnswer: 0,
    explanation: 'A 170-től 6 kis osztást lépünk: 176.'
  },
  {
    id: 'c200e-q37',
    level: 2,
    questionTypeBadge: 'Számszomszéd',
    figure: (
      <QFig h={74}>
        <CellRow cells={['?', '195', '200']} heads={['kisebb tízes', 'szám', 'nagyobb tízes']} y={28} cw={64} />
      </QFig>
    ),
    question: 'Melyik szám hiányzik a táblázatból?',
    options: ['190', '194', '180', '185'],
    correctAnswer: 0,
    explanation: 'A 195 a 190 és a 200 között van. A kisebb tízes szomszéd a 190.'
  },
  {
    id: 'c200e-q38',
    level: 2,
    questionTypeBadge: 'Kerekítés',
    question: 'Melyik szám tízesre kerekített értéke 150?',
    options: ['146', '144', '155', '156'],
    correctAnswer: 0,
    explanation: '146 ≈ 150. A 144 ≈ 140, a 155 ≈ 160 (5-nél felfelé), a 156 ≈ 160.'
  },
  {
    id: 'c200e-q39',
    level: 2,
    questionTypeBadge: 'Kerekítés',
    figure: <LineFig from={190} to={200} step={1} labelEvery={5} marks={[{ v: 195, label: '195' }]} />,
    question: 'Kerekítsd tízesre: 195 ≈ ?',
    options: ['200', '190', '100', '195'],
    correctAnswer: 0,
    explanation: 'Az egyesek helyén 5 áll, ezért felfelé kerekítünk: 195 ≈ 200.'
  },
  {
    id: 'c200e-q40',
    level: 2,
    questionTypeBadge: 'Összeadás',
    figure: <LinesFig lines={['70 + 30 = 100', '70 + 60 = ?']} />,
    question: 'Mennyi 70 + 60?',
    options: ['130', '120', '140', '110'],
    correctAnswer: 0,
    explanation: 'Két lépésben: 70 + 30 = 100, aztán 100 + 30 = 130.'
  },
  {
    id: 'c200e-q41',
    level: 2,
    questionTypeBadge: 'Kivonás',
    figure: <LinesFig lines={['160 − 60 = 100', '160 − 80 = ?']} />,
    question: 'Mennyi 160 − 80?',
    options: ['80', '120', '90', '70'],
    correctAnswer: 0,
    explanation: 'Két lépésben: 160 − 60 = 100, aztán 100 − 20 = 80.'
  },
  {
    id: 'c200e-q42',
    level: 2,
    questionTypeBadge: 'Hiányzó szám',
    figure: <EqFig text="□ − 70 = 90" />,
    question: 'Melyik szám kerül a □ helyére?',
    options: ['160', '20', '150', '170'],
    correctAnswer: 0,
    explanation: 'Visszafelé: 90 + 70 = 160. Ellenőrzés: 160 − 70 = 90.'
  },
  {
    id: 'c200e-q43',
    level: 2,
    questionTypeBadge: 'Szorzás',
    question: 'Mennyi 8 · 20?',
    options: ['160', '16', '28', '180'],
    correctAnswer: 0,
    explanation: '8 · 2 tízes = 16 tízes, ez 160.'
  },
  {
    id: 'c200e-q44',
    level: 2,
    questionTypeBadge: 'Osztás',
    question: 'Mennyi 180 : 3?',
    options: ['60', '6', '90', '50'],
    correctAnswer: 0,
    explanation: '18 tízes : 3 = 6 tízes, ez 60. Ellenőrzés: 60 · 3 = 180.'
  },
  {
    id: 'c200e-q45',
    level: 2,
    questionTypeBadge: 'Bennfoglalás',
    figure: (
      <QFig h={96}>
        <Jumps to={200} size={30} showJumps={1} y={66} labelEvery={40} jumpLabel="+ 30" />
        <text x="190" y="34" textAnchor="middle" fontSize="12" fontWeight="bold" fill={UNK}>
          180-ig?
        </text>
      </QFig>
    ),
    question: 'Mennyi 180 : 30?',
    options: ['6', '60', '150', '5'],
    correctAnswer: 0,
    explanation: '18 tízes : 3 tízes = 6. Ellenőrzés: 6 · 30 = 180.'
  },
  {
    id: 'c200e-q46',
    level: 2,
    questionTypeBadge: 'Pénz',
    figure: (
      <QFig h={56}>
        <Tag x={90} y={16} text="160 Ft" w={62} />
      </QFig>
    ),
    question: 'Melyik érmékkel tudsz pontosan 160 forintot fizetni?',
    options: ['100 + 50 + 10', '100 + 50 + 20', '50 + 50 + 50', '100 + 20 + 20'],
    correctAnswer: 0,
    explanation: '100 + 50 + 10 = 160. A többi: 170, 150 és 140.'
  },
  {
    id: 'c200e-q47',
    level: 2,
    questionTypeBadge: 'Számtábla',
    figure: (
      <QFig h={82}>
        <ChartPart start={145} rows={3} cols={6} hi={147} hidden={[149, 159]} />
      </QFig>
    ),
    question: 'A zöld 147-től jobbra lépsz kettőt, aztán lefelé egyet. Melyik számra érsz?',
    options: ['159', '149', '157', '169'],
    correctAnswer: 0,
    explanation: 'Jobbra kettő: 149. Lefelé egy (10-zel több): 159.'
  },
  {
    id: 'c200e-q48',
    level: 2,
    questionTypeBadge: 'Sorozat',
    figure: (
      <QFig h={76}>
        <Chain values={['200', '170', '140', '?']} ops={['− 30', '− 30', '− 30']} />
      </QFig>
    ),
    question: 'Folytasd a sort! Melyik szám jön?',
    options: ['110', '120', '100', '130'],
    correctAnswer: 0,
    explanation: 'Mindig 30-cal kevesebb: 140 − 30 = 110.'
  },
  {
    id: 'c200e-q49',
    level: 2,
    questionTypeBadge: 'Nyitott mondat',
    figure: <EqFig text="60 + 70 < □ < 190 − 50" fs={19} />,
    question: 'Melyik szám teszi igazzá?',
    options: ['135', '130', '140', '145'],
    correctAnswer: 0,
    explanation: '60 + 70 = 130 és 190 − 50 = 140. A szám 130-nál nagyobb, 140-nél kisebb: 135 jó.'
  },
  {
    id: 'c200e-q50',
    level: 2,
    questionTypeBadge: 'Összehasonlítás',
    question: 'Melyik állítás igaz?',
    options: ['80 · 2 < 200', '80 · 2 > 200', '80 · 2 = 200', '200 < 80 · 2'],
    correctAnswer: 0,
    explanation: '80 · 2 = 160, és 160 kisebb, mint 200.'
  },
  {
    id: 'c200e-q51',
    level: 2,
    questionTypeBadge: 'Diagram',
    figure: <BarFig />,
    question: 'Hányan jönnek busszal az iskolába?',
    options: ['90', '80', '100', '9'],
    correctAnswer: 0,
    explanation: 'A narancssárga oszlop a 90-nél ér véget. 90 gyerek jön busszal.'
  },
  {
    id: 'c200e-q52',
    level: 2,
    questionTypeBadge: 'Diagram',
    figure: <BarFig />,
    question: 'Mennyivel többen jönnek gyalog, mint biciklivel?',
    options: ['40', '100', '30', '20'],
    correctAnswer: 0,
    explanation: 'Gyalog 70, biciklivel 30 gyerek jön. 70 − 30 = 40.'
  },
  {
    id: 'c200e-q53',
    level: 2,
    questionTypeBadge: 'Helyiérték',
    question: 'Melyik számban áll a 3 a tízesek helyén?',
    options: ['135', '153', '103', '113'],
    correctAnswer: 0,
    explanation: '135 = 1 százas + 3 tízes + 5 egyes. A többiben a 3 nem a tízesek helyén van.'
  },
  {
    id: 'c200e-q54',
    level: 2,
    questionTypeBadge: 'Számírás',
    question: 'Hogy írjuk számjegyekkel: száznyolcvanhét?',
    options: ['187', '178', '108', '177'],
    correctAnswer: 0,
    explanation: 'Száz = 1 százas, nyolcvan = 8 tízes, hét = 7 egyes: 187.'
  },
  {
    id: 'c200e-q55',
    level: 2,
    questionTypeBadge: 'Műveleti sorrend',
    figure: <EqFig text="100 + 60 : 2 = ?" />,
    question: 'Mennyi 100 + 60 : 2?',
    options: ['130', '80', '160', '132'],
    correctAnswer: 0,
    explanation: 'Előbb az osztás: 60 : 2 = 30. Aztán: 100 + 30 = 130.'
  },
  {
    id: 'c200e-q56',
    level: 2,
    questionTypeBadge: 'Szorzás',
    question: 'Egy kisbuszban 20 hely van. Hány hely van 9 kisbuszban?',
    options: ['180', '29', '160', '200'],
    correctAnswer: 0,
    explanation: '9 · 20 = 9 · 2 tízes = 18 tízes, ez 180.'
  },
  {
    id: 'c200e-q57',
    level: 2,
    questionTypeBadge: 'Pénz',
    figure: (
      <QFig h={56}>
        <Tag x={50} y={16} text="70 Ft" />
        <Tag x={136} y={16} text="70 Ft" />
      </QFig>
    ),
    question: 'Egy toll 70 Ft. Mennyibe kerül 2 toll?',
    options: ['140 Ft', '72 Ft', '90 Ft', '150 Ft'],
    correctAnswer: 0,
    explanation: '2 · 70 = 140. Két toll 140 Ft.'
  },
  {
    id: 'c200e-q58',
    level: 2,
    questionTypeBadge: 'Pénz',
    figure: <CoinFig values={[100, 50, '?', 20]} note="Összesen: 190 Ft" />,
    question: 'Melyik érmét takartuk le?',
    options: ['20 Ft', '10 Ft', '50 Ft', '5 Ft'],
    correctAnswer: 0,
    explanation: '100 + 50 + 20 = 170. 190-ig még 20 hiányzik. A letakart érme 20 Ft-os.'
  },
  {
    id: 'c200e-q59',
    level: 2,
    questionTypeBadge: 'Számszomszéd',
    figure: <LineFig from={90} to={120} step={1} labelEvery={10} marks={[{ v: 103, label: '103' }]} />,
    question: 'Melyik két kerek tízes között van a 103?',
    options: ['100 és 110', '90 és 100', '100 és 200', '103 és 110'],
    correctAnswer: 0,
    explanation: 'A 103 a 100 után jön, a 110 előtt. Tízes szomszédai: 100 és 110.'
  },
  {
    id: 'c200e-q60',
    level: 2,
    questionTypeBadge: 'Páros, páratlan',
    question: 'Melyik szám páratlan és nagyobb 180-nál?',
    options: ['183', '179', '186', '190'],
    correctAnswer: 0,
    explanation: 'A 183 nagyobb 180-nál, és a végén 3 áll, tehát páratlan. A 179 kisebb 180-nál, a 186 és a 190 páros.'
  },

  // ======================================================================= 3. szint
  {
    id: 'c200e-q61',
    level: 3,
    questionTypeBadge: 'Gondoltam egy számot',
    figure: (
      <QFig h={70}>
        <Cards cards={['3 tízes', '1 százas', '7 egyes']} y={18} w={66} />
      </QFig>
    ),
    question: 'Gondoltam egy számot. 3 tízesből, 1 százasból és 7 egyesből áll. Melyik ez?',
    options: ['137', '173', '130', '107'],
    correctAnswer: 0,
    explanation: 'Mindig a százassal kezdünk: 1 százas, 3 tízes, 7 egyes. Ez 137.'
  },
  {
    id: 'c200e-q62',
    level: 3,
    questionTypeBadge: 'Gondoltam egy számot',
    question: 'Melyik a legnagyobb páros szám, amely kisebb 200-nál?',
    options: ['198', '199', '200', '190'],
    correctAnswer: 0,
    explanation: 'A 199 páratlan, a 200 nem kisebb 200-nál. A 198 páros és kisebb 200-nál.'
  },
  {
    id: 'c200e-q63',
    level: 3,
    questionTypeBadge: 'Számjegyek',
    question: 'Melyik 200-nál kisebb háromjegyű számban egyforma mind a három számjegy?',
    options: ['111', '101', '110', '199'],
    correctAnswer: 0,
    explanation: 'A 111-ben mindhárom számjegy 1. A többiben van más számjegy is.'
  },
  {
    id: 'c200e-q64',
    level: 3,
    questionTypeBadge: 'Számjegyek',
    question: 'Melyik számban 12 a számjegyek összege?',
    options: ['165', '145', '175', '185'],
    correctAnswer: 0,
    explanation: '1 + 6 + 5 = 12. A többi: 1 + 4 + 5 = 10, 1 + 7 + 5 = 13, 1 + 8 + 5 = 14.'
  },
  {
    id: 'c200e-q65',
    level: 3,
    questionTypeBadge: 'Kerekítés',
    figure: <LineFig from={160} to={180} step={1} labelEvery={10} marks={[{ v: 170, label: '≈ 170' }]} />,
    question: 'Egy szám tízesre kerekítve 170. Melyik a legkisebb ilyen szám?',
    options: ['165', '160', '166', '174'],
    correctAnswer: 0,
    explanation: 'A 165 már felfelé kerekedik: 165 ≈ 170. A 164 ≈ 160. Ezért a legkisebb a 165.'
  },
  {
    id: 'c200e-q66',
    level: 3,
    questionTypeBadge: 'Kerekítés',
    question: 'Melyik a legnagyobb szám, amelynek tízesre kerekített értéke 170?',
    options: ['174', '175', '179', '170'],
    correctAnswer: 0,
    explanation: 'A 174 ≈ 170, de a 175 már 180 lesz (5-nél felfelé). A legnagyobb a 174.'
  },
  {
    id: 'c200e-q67',
    level: 3,
    questionTypeBadge: 'Pénz',
    figure: <CoinFig values={[50, 50, 20, 20, 20, 20]} />,
    question: 'Két 50 forintosod és négy 20 forintosod van. Mennyi pénzed van?',
    options: ['180 Ft', '140 Ft', '160 Ft', '170 Ft'],
    correctAnswer: 0,
    explanation: '2 · 50 = 100 és 4 · 20 = 80. 100 + 80 = 180 Ft.'
  },
  {
    id: 'c200e-q68',
    level: 3,
    questionTypeBadge: 'Pénz',
    figure: (
      <QFig h={60}>
        <Tag x={40} y={18} text="130 Ft" w={62} />
        <text x="128" y="34" fontSize="11" fill="#334155">
          Fizetsz:
        </text>
        <Coin cx={196} cy={30} v={200} r={19} />
      </QFig>
    ),
    question: 'Egy füzet 130 Ft. 200 forinttal fizetsz. Mennyit kapsz vissza?',
    options: ['70 Ft', '80 Ft', '130 Ft', '60 Ft'],
    correctAnswer: 0,
    explanation: '200 − 130 = 70. 70 Ft-ot kapsz vissza. Ellenőrzés: 130 + 70 = 200.'
  },
  {
    id: 'c200e-q69',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    figure: (
      <QFig h={76}>
        <Chain values={['150', '', '?']} ops={['− 60', '+ 30']} />
      </QFig>
    ),
    question: 'A könyvtárban 150 mesekönyv volt. 60-at kikölcsönöztek, aztán 30-at visszahoztak. Hány mesekönyv van most?',
    options: ['120', '90', '180', '150'],
    correctAnswer: 0,
    explanation: '150 − 60 = 90. Aztán 90 + 30 = 120 könyv van most.'
  },
  {
    id: 'c200e-q70',
    level: 3,
    questionTypeBadge: 'Műveleti sorrend',
    figure: <EqFig text="5 · 20 + 30 : 2 = ?" fs={22} />,
    question: 'Mennyi 5 · 20 + 30 : 2?',
    options: ['115', '65', '130', '100'],
    correctAnswer: 0,
    explanation: 'Előbb a szorzás és az osztás: 5 · 20 = 100, 30 : 2 = 15. Aztán: 100 + 15 = 115.'
  },
  {
    id: 'c200e-q71',
    level: 3,
    questionTypeBadge: 'Zárójel',
    figure: <EqFig text="(200 − 160) · 4 = ?" fs={22} />,
    question: 'Mennyi (200 − 160) · 4?',
    options: ['160', '40', '120', '196'],
    correctAnswer: 0,
    explanation: 'Előbb a zárójel: 200 − 160 = 40. Aztán: 40 · 4 = 160.'
  },
  {
    id: 'c200e-q72',
    level: 3,
    questionTypeBadge: 'Nyitott mondat',
    figure: <EqFig text="□ : 3 = 20 + 30" />,
    question: 'Melyik szám kerül a □ helyére?',
    options: ['150', '50', '90', '120'],
    correctAnswer: 0,
    explanation: 'A jobb oldal: 20 + 30 = 50. Melyik számot osztjuk 3-mal, hogy 50 legyen? 50 · 3 = 150.'
  },
  {
    id: 'c200e-q73',
    level: 3,
    questionTypeBadge: 'Összehasonlítás',
    question: 'Melyiknek a legnagyobb az eredménye?',
    options: ['3 · 60', '200 − 30', '4 · 40', '120 + 50'],
    correctAnswer: 0,
    explanation: '3 · 60 = 180, 200 − 30 = 170, 4 · 40 = 160, 120 + 50 = 170. A legnagyobb a 180.'
  },
  {
    id: 'c200e-q74',
    level: 3,
    questionTypeBadge: 'Diagram',
    figure: <BarFig />,
    question: 'Hányan jönnek járművel (busszal, biciklivel vagy autóval)?',
    options: ['170', '140', '190', '120'],
    correctAnswer: 0,
    explanation: '90 + 30 + 50 = 170 gyerek jön járművel.'
  },
  {
    id: 'c200e-q75',
    level: 3,
    questionTypeBadge: 'Számegyenes',
    figure: (
      <QFig h={100}>
        <NumLine from={100} to={200} step={10} labelEvery={2} y={70} />
        <circle cx="59.2" cy="70" r="5" fill="#16a34a" stroke="#14532d" strokeWidth="1.2" />
        <path d="M 59 60 Q 78 34 98 60" fill="none" stroke="#f97316" strokeWidth="2" />
        <text x="78" y="32" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#c2410c">
          + 20
        </text>
      </QFig>
    ),
    question: 'A béka a 120-tól háromszor ugrik jobbra, mindig 20-at. Hova ér?',
    options: ['180', '140', '160', '123'],
    correctAnswer: 0,
    explanation: '120 + 20 = 140, 140 + 20 = 160, 160 + 20 = 180. Vagy: 3 · 20 = 60, 120 + 60 = 180.'
  },
  {
    id: 'c200e-q76',
    level: 3,
    questionTypeBadge: 'Számegyenes',
    figure: <LineFig from={130} to={170} step={5} labelEvery={2} marks={[{ v: 135, label: '135' }, { v: 165, label: '165' }]} />,
    question: 'Melyik szám van pontosan középen a 135 és a 165 között?',
    options: ['150', '140', '145', '155'],
    correctAnswer: 0,
    explanation: '135-től 150-ig 15 a távolság, 150-től 165-ig is 15. A közép a 150.'
  },
  {
    id: 'c200e-q77',
    level: 3,
    questionTypeBadge: 'Sorozat',
    figure: (
      <QFig h={76}>
        <Chain values={['15', '30', '60', '120']} ops={['?', '?', '?']} />
      </QFig>
    ),
    question: 'Mi a sorozat szabálya?',
    options: ['· 2', '+ 15', '+ 30', ': 2'],
    correctAnswer: 0,
    explanation: '15 · 2 = 30, 30 · 2 = 60, 60 · 2 = 120. Mindig kétszeresére nő. (A + 15 csak az első lépésnél jó.)'
  },
  {
    id: 'c200e-q78',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    question: '120 tojást raknak tálcákra. A kis tálcára 20 fér, a nagyra 30. Hány tálcával kevesebb kell a nagyokból, mint a kicsikből?',
    options: ['2', '10', '4', '6'],
    correctAnswer: 0,
    explanation: 'Kis tálcából 120 : 20 = 6 kell, nagyból 120 : 30 = 4. 6 − 4 = 2 tálcával kevesebb.'
  },
  {
    id: 'c200e-q79',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    figure: <BoxesFig n={4} label="30" note="+ 50 tő" />,
    question: 'A kertben 4 sor paradicsom van, soronként 30 tő. Még 50 tövet ültetnek. Hány tő lesz?',
    options: ['170', '150', '120', '180'],
    correctAnswer: 0,
    explanation: '4 · 30 = 120 tő van. 120 + 50 = 170 tő lesz.'
  },
  {
    id: 'c200e-q80',
    level: 3,
    questionTypeBadge: 'Helyiérték',
    figure: <BlocksFig h={1} t={9} e={0} />,
    question: 'Melyik igaz a 190-re?',
    options: ['19 tízesből áll.', '1 százasból és 9 egyesből áll.', '9 tízesből áll.', '1 tízesből és 9 egyesből áll.'],
    correctAnswer: 0,
    explanation: '190 = 1 százas + 9 tízes = 10 tízes + 9 tízes = 19 tízes.'
  },
  {
    id: 'c200e-q81',
    level: 3,
    questionTypeBadge: 'Kerekítés',
    figure: <EqFig text="1□7 ≈ 150" />,
    question: 'Melyik számjegy hiányzik, ha a szám tízesre kerekítve 150?',
    options: ['4', '5', '3', '6'],
    correctAnswer: 0,
    explanation: '147 ≈ 150. A 157 ≈ 160, a 137 ≈ 140, a 167 ≈ 170.'
  },
  {
    id: 'c200e-q82',
    level: 3,
    questionTypeBadge: 'Pénz',
    figure: (
      <QFig h={70}>
        <text x="60" y="22" textAnchor="middle" fontSize="11" fill="#334155">
          neked
        </text>
        <text x="60" y="48" textAnchor="middle" fontSize="20" fontWeight="bold" fill={INK}>
          120 Ft
        </text>
        <text x="180" y="22" textAnchor="middle" fontSize="11" fill="#334155">
          a barátodnak
        </text>
        <text x="180" y="48" textAnchor="middle" fontSize="20" fontWeight="bold" fill={INK}>
          170 Ft
        </text>
      </QFig>
    ),
    question: 'Legalább mennyi pénzt kell kapnod forintérmékben, hogy neked legyen több? (Érmék: 5, 10, 20, 50, 100, 200 Ft.)',
    options: ['55 Ft', '50 Ft', '51 Ft', '60 Ft'],
    correctAnswer: 0,
    explanation: '50 Ft-tal pont 170 Ft lenne, az egyenlő, nem több. 51 Ft-ot nem lehet érmékből kirakni. A legkisebb, ami több 50-nél: 50 + 5 = 55 Ft.'
  },
  {
    id: 'c200e-q83',
    level: 3,
    questionTypeBadge: 'Számtábla',
    question: 'A számtáblán egy számtól lefelé léptél 3-at, és a 174-re értél. Honnan indultál?',
    options: ['144', '171', '177', '134'],
    correctAnswer: 0,
    explanation: 'Lefelé minden lépés 10-zel több. Visszafelé: 174 − 30 = 144.'
  },
  {
    id: 'c200e-q84',
    level: 3,
    questionTypeBadge: 'Számegyenes',
    figure: <LineFig from={150} to={160} step={1} labelEvery={10} />,
    question: 'Hány szám van, amely nagyobb 150-nél, de kisebb 160-nál?',
    options: ['9', '10', '11', '8'],
    correctAnswer: 0,
    explanation: '151, 152, 153, 154, 155, 156, 157, 158, 159: ez 9 szám. A 150 és a 160 nem számít bele.'
  },
  {
    id: 'c200e-q85',
    level: 3,
    questionTypeBadge: 'Számszomszéd',
    question: 'A 99 nagyobb tízes szomszédjához hozzáadsz 80-at. Mennyi lesz?',
    options: ['180', '179', '170', '190'],
    correctAnswer: 0,
    explanation: 'A 99 nagyobb tízes szomszédja a 100. 100 + 80 = 180.'
  },
  {
    id: 'c200e-q86',
    level: 3,
    questionTypeBadge: 'Műveleti sorrend',
    question: 'Melyik műveletsor eredménye 100?',
    options: ['200 − 5 · 20', '90 + 40 : 2', '(50 − 30) · 4', '3 · 40 − 10'],
    correctAnswer: 0,
    explanation: '200 − 5 · 20 = 200 − 100 = 100. A többi: 90 + 20 = 110, 20 · 4 = 80, 120 − 10 = 110.'
  },
  {
    id: 'c200e-q87',
    level: 3,
    questionTypeBadge: 'Gondoltam egy számot',
    question: 'Gondoltam egy számot. 40-nel nagyobb, mint 3 · 50. Melyik ez?',
    options: ['190', '110', '150', '170'],
    correctAnswer: 0,
    explanation: '3 · 50 = 150. 150 + 40 = 190.'
  },
  {
    id: 'c200e-q88',
    level: 3,
    questionTypeBadge: 'Pénz',
    figure: (
      <QFig h={100}>
        <CoinRows v={20} n={6} y={26} r={13} />
        <CoinRows v={10} n={3} y={70} r={13} />
      </QFig>
    ),
    question: 'Az egyik perselyben hat 20 forintos, a másikban három 10 forintos van. Mennyi pénz van a két perselyben együtt?',
    options: ['150 Ft', '9 Ft', '90 Ft', '180 Ft'],
    correctAnswer: 0,
    explanation: '6 · 20 = 120 és 3 · 10 = 30. 120 + 30 = 150 Ft.'
  },
  {
    id: 'c200e-q89',
    level: 3,
    questionTypeBadge: 'Összehasonlítás',
    figure: <LinesFig lines={['180 : 30', '120 : 40']} />,
    question: 'Melyik hányados a nagyobb, és mennyivel?',
    options: ['180 : 30, 3-mal', '120 : 40, 3-mal', '180 : 30, 2-vel', 'Egyenlők.'],
    correctAnswer: 0,
    explanation: '180 : 30 = 6 és 120 : 40 = 3. A 6 a nagyobb, 6 − 3 = 3-mal.'
  },
  {
    id: 'c200e-q90',
    level: 3,
    questionTypeBadge: 'Fejtörő',
    figure: (
      <QFig h={70}>
        <BigEq text="□ + △ = 150" y={30} fs={18} />
        <BigEq text="□ − △ = 50" y={58} fs={18} />
      </QFig>
    ),
    question: 'Melyik két szám összege 150, és különbsége 50?',
    options: ['100 és 50', '75 és 75', '120 és 30', '110 és 40'],
    correctAnswer: 0,
    explanation: '100 + 50 = 150 és 100 − 50 = 50. A többinél a különbség 0, 90 vagy 70.'
  }
];

export const Count200ExamG3Quiz: React.FC<{
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
      topicId="g3-c200-tudasproba-quiz"
      subtopicId="megallo"
      title="6. Megálló – tudáspróba – Kvíz"
      subtitle="90 feladat 3 szinten: számok 200-ig, számegyenes, szomszédok, kerekítés, a négy alapművelet, pénz, szöveges feladatok."
      badge="3. OSZTÁLY • III. SZÁMOLÁS 0-TÓL 200-IG • KVÍZ"
      questions={COUNT200_EXAM_G3_QUESTIONS}
      cheatSheets={[
        {
          title: 'Számok 200-ig',
          items: ['163 = 1 százas + 6 tízes + 3 egyes', '163 = 16 tízes + 3 egyes', 'Ha nincs tízes, 0 kerül a helyére: 108']
        },
        {
          title: 'Szomszédok, kerekítés',
          items: ['147: egyes szomszédok 146 és 148', 'tízes szomszédok 140 és 150', '143 ≈ 140, 145 ≈ 150 (5-nél felfelé)']
        },
        {
          title: 'Műveletek',
          items: ['60 + 50 = 60 + 40 + 10 = 110', '4 · 30 = 12 tízes = 120', 'Előbb · és :, aztán + és −']
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <Count200ExamG3Matcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />
      }
      sorterComponent={
        <Count200ExamG3Sorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />
      }
    />
  );
};

export default Count200ExamG3Quiz;
