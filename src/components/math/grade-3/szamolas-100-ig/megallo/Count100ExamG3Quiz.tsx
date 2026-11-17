import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { Count100ExamG3Matcher } from './Count100ExamG3Matcher';
import { Count100ExamG3Sorter } from './Count100ExamG3Sorter';
import {
  QFig,
  TensOnes,
  NumLine,
  SimpleTable,
  Cards,
  Coins,
  Plates,
  DotGroups,
  Chain,
  ShapeEq,
  Tile,
  TILE_COLORS,
  Bars,
  Stairs,
  Routes,
  DominoSquare,
  Choco,
  DinnerTables,
  MulTable,
  INK,
  UNK
} from './Count100ExamG3Parts';

// ---------------------------------------------------------------------------
// Kis segédek a kérdésábrákhoz
// ---------------------------------------------------------------------------
const NeighbourFig: React.FC<{ heads: string[]; values: (string | number)[] }> = ({ heads, values }) => {
  const colW = heads.length === 3 ? 74 : 54;
  return (
    <QFig h={72}>
      <SimpleTable x={120 - (heads.length * colW) / 2} y={10} heads={heads} rows={[values]} colW={colW} highlightCol={heads.indexOf('Szám')} />
    </QFig>
  );
};

const CardsFig: React.FC<{ cards: string[] }> = ({ cards }) => (
  <QFig h={60}>
    <Cards cards={cards} />
  </QFig>
);

const T = (shape: 'kor' | 'negyzet' | 'haromszog', color: keyof typeof TILE_COLORS) => ({ shape, color: TILE_COLORS[color] });

const red = '#ef4444';
const blue = '#3b82f6';
const green = '#22c55e';
const rep = (c: string, n: number) => Array.from({ length: n }, () => c);

export const COUNT100_EXAM_G3_QUESTIONS: QuizQuestion[] = [
  // =========================================================================
  // 1. SZINT – egy lépés, könnyű számok
  // =========================================================================
  {
    id: 'g3c100ex-q1',
    level: 1,
    questionTypeBadge: 'Helyiérték',
    question: 'Melyik számot raktuk ki?',
    figure: (
      <QFig h={84}>
        <TensOnes x={52} y={12} tens={6} ones={3} cell={6} rodGap={13} onesCols={3} />
      </QFig>
    ),
    options: ['63', '36', '9', '603'],
    correctAnswer: 0,
    explanation: '6 tízesrúd = 60, és 3 egyeskocka = 3. Együtt 63.'
  },
  {
    id: 'g3c100ex-q2',
    level: 1,
    questionTypeBadge: 'Helyiérték',
    question: 'Hány tízes van a 85-ben?',
    options: ['8', '5', '85', '13'],
    correctAnswer: 0,
    explanation: 'A 85 = 8 tízes és 5 egyes. A tízesek helyén a 8 áll.'
  },
  {
    id: 'g3c100ex-q3',
    level: 1,
    questionTypeBadge: 'Számírás',
    question: 'Írd le számjegyekkel: hetvenkilenc!',
    options: ['79', '97', '709', '70'],
    correctAnswer: 0,
    explanation: 'Hetven = 7 tízes, kilenc = 9 egyes. Így 79.'
  },
  {
    id: 'g3c100ex-q4',
    level: 1,
    questionTypeBadge: 'Számegyenes',
    question: 'Melyik szám helyét jelöli a kérdőjel?',
    figure: (
      <QFig h={80}>
        <NumLine from={0} to={100} step={10} labelEvery={5} marks={[{ v: 60, label: '?' }]} />
      </QFig>
    ),
    options: ['60', '50', '70', '6'],
    correctAnswer: 0,
    explanation: 'Minden kis lépés 10. Az 50-től még egyet lépünk: 60.'
  },
  {
    id: 'g3c100ex-q5',
    level: 1,
    questionTypeBadge: 'Számszomszédok',
    question: 'Mi a 38 nagyobb egyes szomszédja?',
    figure: <NeighbourFig heads={['Kisebb egyes\nszomszéd', 'Szám', 'Nagyobb egyes\nszomszéd']} values={['37', '38', '?']} />,
    options: ['39', '37', '40', '48'],
    correctAnswer: 0,
    explanation: 'Az egyes szomszéd 1-gyel nagyobb: 38 + 1 = 39.'
  },
  {
    id: 'g3c100ex-q6',
    level: 1,
    questionTypeBadge: 'Számszomszédok',
    question: 'Mi az 54 kisebb tízes szomszédja?',
    figure: <NeighbourFig heads={['Kisebb tízes\nszomszéd', 'Szám', 'Nagyobb tízes\nszomszéd']} values={['?', '54', '60']} />,
    options: ['50', '60', '53', '44'],
    correctAnswer: 0,
    explanation: 'Az 54 az 50 és a 60 között van. A kisebb tízes szomszéd az 50.'
  },
  {
    id: 'g3c100ex-q7',
    level: 1,
    questionTypeBadge: 'Páros, páratlan',
    question: 'Melyik szám páratlan?',
    figure: <CardsFig cards={['42', '58', '67', '90']} />,
    options: ['67', '42', '58', '90'],
    correctAnswer: 0,
    explanation: 'A páratlan szám 1, 3, 5, 7 vagy 9 egyesre végződik. A 67 végén 7 áll.'
  },
  {
    id: 'g3c100ex-q8',
    level: 1,
    questionTypeBadge: 'Sorozat',
    question: 'Mi jön a sorozatban?',
    figure: <CardsFig cards={['20', '25', '30', '35', '?']} />,
    options: ['40', '36', '45', '50'],
    correctAnswer: 0,
    explanation: 'Mindig 5-tel nő: 35 + 5 = 40.'
  },
  {
    id: 'g3c100ex-q9',
    level: 1,
    questionTypeBadge: 'Pénz',
    question: 'Mennyi pénz van a pénztárcában?',
    figure: (
      <QFig h={80}>
        <Coins values={[50, 20, 20, 5]} y={40} />
      </QFig>
    ),
    options: ['95 Ft', '4 Ft', '90 Ft', '75 Ft'],
    correctAnswer: 0,
    explanation: '50 + 20 + 20 = 90, és még 5: összesen 95 Ft.'
  },
  {
    id: 'g3c100ex-q10',
    level: 1,
    questionTypeBadge: 'Összeadás',
    question: 'Mennyi 46 + 3?',
    figure: (
      <QFig h={84}>
        <TensOnes x={50} y={12} tens={4} ones={6} cell={6} rodGap={13} onesCols={3} />
        <text x="148" y="50" fontSize="18" fontWeight="bold" fill={INK}>+</text>
        <TensOnes x={164} y={12} tens={0} ones={3} cell={6} rodGap={13} onesCols={3} oneColor="#22c55e" />
      </QFig>
    ),
    options: ['49', '76', '43', '50'],
    correctAnswer: 0,
    explanation: 'Csak az egyesekhez adunk: 6 + 3 = 9. A 4 tízes marad. 46 + 3 = 49.'
  },
  {
    id: 'g3c100ex-q11',
    level: 1,
    questionTypeBadge: 'Kivonás',
    question: 'Mennyi 58 − 6?',
    options: ['52', '64', '51', '42'],
    correctAnswer: 0,
    explanation: 'Az egyesekből veszünk el: 8 − 6 = 2. Az 5 tízes marad: 52.'
  },
  {
    id: 'g3c100ex-q12',
    level: 1,
    questionTypeBadge: 'Szorzás',
    question: '7 tányéron 5-5 korong van. Hány korong van összesen?',
    figure: (
      <QFig h={80}>
        <Plates n={7} dots={rep('#f97316', 5)} y={40} r={16} />
      </QFig>
    ),
    options: ['35', '12', '30', '40'],
    correctAnswer: 0,
    explanation: '7-szer 5 korong: 7 · 5 = 35.'
  },
  {
    id: 'g3c100ex-q13',
    level: 1,
    questionTypeBadge: 'Szorzótábla',
    question: 'Mennyi 4 · 9?',
    options: ['36', '13', '27', '45'],
    correctAnswer: 0,
    explanation: '4 · 9 = 9 + 9 + 9 + 9 = 36.'
  },
  {
    id: 'g3c100ex-q14',
    level: 1,
    questionTypeBadge: 'Osztás',
    question: '24 korongot 6 tányérra osztunk egyformán. Mennyi jut egy tányérra?',
    figure: (
      <QFig h={86}>
        <text x="120" y="20" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#c2410c">24 korong</text>
        <Plates n={6} dots="?" y={52} r={17} />
      </QFig>
    ),
    options: ['4', '3', '6', '18'],
    correctAnswer: 0,
    explanation: '24 : 6 = 4, mert 4 · 6 = 24.'
  },
  {
    id: 'g3c100ex-q15',
    level: 1,
    questionTypeBadge: 'Osztás',
    question: 'Mennyi 63 : 9?',
    options: ['7', '6', '8', '54'],
    correctAnswer: 0,
    explanation: '63 : 9 = 7, mert 7 · 9 = 63.'
  },
  {
    id: 'g3c100ex-q16',
    level: 1,
    questionTypeBadge: 'Szorzótábla',
    question: 'Melyik szám kerül a kérdőjel helyére?',
    figure: (
      <QFig h={80}>
        <MulTable x={75} y={10} head={[5, 6]} rows={[[8, 40, '?']]} c={30} />
      </QFig>
    ),
    options: ['48', '42', '56', '14'],
    correctAnswer: 0,
    explanation: 'A sor és az oszlop számát szorozzuk: 8 · 6 = 48.'
  },
  {
    id: 'g3c100ex-q17',
    level: 1,
    questionTypeBadge: 'Maradékos osztás',
    question: 'Hány korong maradt ki a csoportokból?',
    figure: (
      <QFig h={84}>
        <DotGroups total={17} size={5} grouped y={14} />
      </QFig>
    ),
    options: ['2', '3', '5', '12'],
    correctAnswer: 0,
    explanation: '3 teli ötös csoport lett, 2 korong kimaradt. 17 : 5 = 3, marad 2.'
  },
  {
    id: 'g3c100ex-q18',
    level: 1,
    questionTypeBadge: 'Maradékos osztás',
    question: 'Melyik osztásnál marad valami?',
    options: ['23 : 4', '20 : 4', '18 : 3', '25 : 5'],
    correctAnswer: 0,
    explanation: '23 : 4 = 5, marad 3. A többi pontosan megy: 20 : 4 = 5, 18 : 3 = 6, 25 : 5 = 5.'
  },
  {
    id: 'g3c100ex-q19',
    level: 1,
    questionTypeBadge: 'Maradékos osztás',
    question: '13 korongot párokba rakunk. 13 : 2 = 6, marad ?',
    figure: (
      <QFig h={60}>
        <DotGroups total={13} grouped={false} y={14} perRow={13} />
      </QFig>
    ),
    options: ['1', '2', '0', '3'],
    correctAnswer: 0,
    explanation: '6 pár = 12 korong. 13 − 12 = 1 korong marad.'
  },
  {
    id: 'g3c100ex-q20',
    level: 1,
    questionTypeBadge: 'Műveleti sorrend',
    question: 'Mennyi 3 + 4 · 2?',
    figure: (
      <QFig h={80}>
        <g transform="translate(-82,0)">
          <Plates n={1} dots={rep(red, 3)} y={36} r={18} />
        </g>
        <text x="71" y="42" textAnchor="middle" fontSize="18" fontWeight="bold" fill={INK}>+</text>
        <g transform="translate(38,0)">
          <Plates n={4} dots={rep(blue, 2)} y={36} r={15} />
        </g>
        <text x="120" y="72" textAnchor="middle" fontSize="10" fill="#334155">3 korong, és még 4 tányéron 2-2 korong</text>
      </QFig>
    ),
    options: ['11', '14', '9', '10'],
    correctAnswer: 0,
    explanation: 'Előbb a szorzás: 4 · 2 = 8. Aztán az összeadás: 3 + 8 = 11.'
  },
  {
    id: 'g3c100ex-q21',
    level: 1,
    questionTypeBadge: 'Műveleti sorrend',
    question: 'Mennyi 20 − 8 − 2?',
    options: ['10', '14', '12', '6'],
    correctAnswer: 0,
    explanation: 'Csak kivonás van, ezért balról jobbra számolunk: 20 − 8 = 12, 12 − 2 = 10.'
  },
  {
    id: 'g3c100ex-q22',
    level: 1,
    questionTypeBadge: 'Zárójel',
    question: 'Mennyi (5 + 3) · 2?',
    figure: (
      <QFig h={76}>
        <Plates n={2} dots={[...rep(red, 5), ...rep(green, 3)]} y={36} r={24} />
        <text x="120" y="70" textAnchor="middle" fontSize="10" fill="#334155">2 tányéron 5 piros és 3 zöld korong</text>
      </QFig>
    ),
    options: ['16', '11', '13', '10'],
    correctAnswer: 0,
    explanation: 'Előbb a zárójel: 5 + 3 = 8. Aztán 8 · 2 = 16.'
  },
  {
    id: 'g3c100ex-q23',
    level: 1,
    questionTypeBadge: 'Műveleti sorrend',
    question: 'Melyik műveletet végzed el először? 9 + 6 : 3',
    options: ['6 : 3', '9 + 6', 'Mindegy', '9 + 3'],
    correctAnswer: 0,
    explanation: 'Az osztás előbb jön, mint az összeadás: 6 : 3 = 2, aztán 9 + 2 = 11.'
  },
  {
    id: 'g3c100ex-q24',
    level: 1,
    questionTypeBadge: 'Szöveges feladat',
    question: 'A kosárban 34 alma van. Beletesznek még 5-öt. Hány alma lesz benne?',
    figure: (
      <QFig h={72}>
        <Bars total="?" parts={[{ label: '34', len: 34 }, { label: '5', len: 8 }]} y={16} />
      </QFig>
    ),
    options: ['39', '29', '84', '35'],
    correctAnswer: 0,
    explanation: '34 + 5 = 39. A kosárban 39 alma lesz.'
  },
  {
    id: 'g3c100ex-q25',
    level: 1,
    questionTypeBadge: 'Szöveges feladat',
    question: '6 tányéron 3-3 sütemény van. Hány sütemény van összesen?',
    figure: (
      <QFig h={76}>
        <Plates n={6} dots={rep('#a16207', 3)} y={38} r={17} />
      </QFig>
    ),
    options: ['18', '9', '15', '63'],
    correctAnswer: 0,
    explanation: '6-szor 3 sütemény: 6 · 3 = 18.'
  },
  {
    id: 'g3c100ex-q26',
    level: 1,
    questionTypeBadge: 'Logikai lapok',
    question: 'Melyik számot takarja a kék kör?',
    figure: (
      <QFig h={60}>
        <ShapeEq parts={[T('kor', 'kek'), '+ 20 = 50']} y={30} />
      </QFig>
    ),
    options: ['30', '70', '20', '25'],
    correctAnswer: 0,
    explanation: 'Mennyit kell adni a 20-hoz, hogy 50 legyen? 50 − 20 = 30.'
  },
  {
    id: 'g3c100ex-q27',
    level: 1,
    questionTypeBadge: 'Összehasonlítás',
    question: 'Melyik a több: 7 · 3 vagy 4 · 5?',
    options: ['7 · 3 a több', '4 · 5 a több', 'Egyenlők', 'Nem lehet eldönteni'],
    correctAnswer: 0,
    explanation: '7 · 3 = 21 és 4 · 5 = 20. A 21 a több, 1-gyel.'
  },
  {
    id: 'g3c100ex-q28',
    level: 1,
    questionTypeBadge: 'Számok sorrendje',
    question: 'Melyik a legkisebb szám?',
    figure: <CardsFig cards={['71', '17', '70', '27']} />,
    options: ['17', '71', '70', '27'],
    correctAnswer: 0,
    explanation: 'Előbb a tízeseket nézzük: a 17-ben csak 1 tízes van. Ez a legkisebb.'
  },
  {
    id: 'g3c100ex-q29',
    level: 1,
    questionTypeBadge: 'Százas tábla',
    question: 'Ez a százas tábla egy darabja. Melyik szám van a kérdőjel helyén?',
    figure: (
      <QFig h={104}>
        <SimpleTable
          x={72}
          y={-14}
          heads={[]}
          rows={[
            ['36', '37', '38'],
            ['46', '?', '48'],
            ['56', '57', '58']
          ]}
          colW={32}
          headH={24}
          rowH={26}
        />
      </QFig>
    ),
    options: ['47', '37', '57', '49'],
    correctAnswer: 0,
    explanation: 'A sorban 46 után 47 jön. Fölötte 37, alatta 57: lefelé 10-zel nő.'
  },
  {
    id: 'g3c100ex-q30',
    level: 1,
    questionTypeBadge: 'Ellenőrzés',
    question: 'Melyik szorzással ellenőrizheted ezt: 35 : 7 = 5?',
    options: ['5 · 7 = 35', '35 · 7 = 5', '35 + 7 = 42', '7 + 5 = 12'],
    correctAnswer: 0,
    explanation: 'Az osztást szorzással ellenőrizzük: a hányados · az osztó = az osztandó. 5 · 7 = 35.'
  },

  // =========================================================================
  // 2. SZINT – egy lépés, nehezebb számok vagy ábra leolvasása
  // =========================================================================
  {
    id: 'g3c100ex-q31',
    level: 2,
    questionTypeBadge: 'Számegyenes',
    question: 'Melyik szám helyét jelöli a kérdőjel?',
    figure: (
      <QFig h={80}>
        <NumLine from={40} to={60} step={1} labelEvery={10} marks={[{ v: 47, label: '?' }]} />
      </QFig>
    ),
    options: ['47', '46', '48', '57'],
    correctAnswer: 0,
    explanation: 'Minden kis lépés 1. A 40-től 7-et lépünk jobbra: 47.'
  },
  {
    id: 'g3c100ex-q32',
    level: 2,
    questionTypeBadge: 'Számegyenes',
    question: 'Melyik szám helyét jelöli a kérdőjel?',
    figure: (
      <QFig h={80}>
        <NumLine from={0} to={100} step={5} labelEvery={10} marks={[{ v: 35, label: '?' }]} />
      </QFig>
    ),
    options: ['35', '30', '40', '7'],
    correctAnswer: 0,
    explanation: 'Itt egy kis lépés 5. A 0-tól 7 lépés: 7 · 5 = 35.'
  },
  {
    id: 'g3c100ex-q33',
    level: 2,
    questionTypeBadge: 'Helyiérték',
    question: '3 tízes és 14 egyes. Melyik szám ez?',
    figure: (
      <QFig h={84}>
        <TensOnes x={62} y={12} tens={3} ones={14} cell={6} rodGap={13} onesCols={5} />
      </QFig>
    ),
    options: ['44', '314', '17', '34'],
    correctAnswer: 0,
    explanation: '14 egyes = 1 tízes és 4 egyes. Így 3 + 1 = 4 tízes és 4 egyes: 44.'
  },
  {
    id: 'g3c100ex-q34',
    level: 2,
    questionTypeBadge: 'Helyiérték',
    question: '6 tízes és 25 egyes. Melyik szám ez?',
    figure: (
      <QFig h={84}>
        <TensOnes x={48} y={12} tens={6} ones={25} cell={6} rodGap={13} onesCols={5} />
      </QFig>
    ),
    options: ['85', '625', '31', '65'],
    correctAnswer: 0,
    explanation: '6 tízes = 60, 25 egyes = 25. 60 + 25 = 85.'
  },
  {
    id: 'g3c100ex-q35',
    level: 2,
    questionTypeBadge: 'Számszomszédok',
    question: 'Mi a 70 kisebb egyes szomszédja?',
    figure: <NeighbourFig heads={['Kisebb egyes\nszomszéd', 'Szám', 'Nagyobb egyes\nszomszéd']} values={['?', '70', '71']} />,
    options: ['69', '60', '71', '79'],
    correctAnswer: 0,
    explanation: 'Az egyes szomszéd 1-gyel kisebb: 70 − 1 = 69. Vigyázz, itt tízest is váltunk!'
  },
  {
    id: 'g3c100ex-q36',
    level: 2,
    questionTypeBadge: 'Sorozat',
    question: 'Mi jön a sorozatban?',
    figure: <CardsFig cards={['92', '85', '78', '71', '?']} />,
    options: ['64', '63', '65', '74'],
    correctAnswer: 0,
    explanation: 'Mindig 7-tel csökken: 71 − 7 = 64.'
  },
  {
    id: 'g3c100ex-q37',
    level: 2,
    questionTypeBadge: 'Sorozat',
    question: 'Két szabály váltja egymást. Mi jön?',
    figure: <CardsFig cards={['12', '14', '20', '22', '28', '?']} />,
    options: ['30', '34', '36', '32'],
    correctAnswer: 0,
    explanation: 'Felváltva +2 és +6: 12, 14, 20, 22, 28. Most +2 jön: 30.'
  },
  {
    id: 'g3c100ex-q38',
    level: 2,
    questionTypeBadge: 'Összeadás',
    question: 'Mennyi 68 + 25?',
    figure: (
      <QFig h={84}>
        <TensOnes x={22} y={12} tens={6} ones={8} cell={5} rodGap={10} onesCols={4} />
        <text x="128" y="50" fontSize="18" fontWeight="bold" fill={INK}>+</text>
        <TensOnes x={146} y={12} tens={2} ones={5} cell={5} rodGap={10} onesCols={4} oneColor="#22c55e" />
      </QFig>
    ),
    options: ['93', '83', '813', '43'],
    correctAnswer: 0,
    explanation: '68 + 20 = 88, 88 + 5 = 93. A 8 + 5 = 13 egyesből 1 új tízes lesz!'
  },
  {
    id: 'g3c100ex-q39',
    level: 2,
    questionTypeBadge: 'Kivonás',
    question: 'Mennyi 83 − 47?',
    options: ['36', '44', '46', '34'],
    correctAnswer: 0,
    explanation: '83 − 40 = 43, 43 − 7 = 36. Ellenőrzés: 36 + 47 = 83.'
  },
  {
    id: 'g3c100ex-q40',
    level: 2,
    questionTypeBadge: 'Hiányzó szám',
    question: 'Melyik számot takarja a piros négyzet?',
    figure: (
      <QFig h={60}>
        <ShapeEq parts={[T('negyzet', 'piros'), '+ 36 = 100']} y={30} />
      </QFig>
    ),
    options: ['64', '74', '136', '66'],
    correctAnswer: 0,
    explanation: '100 − 36 = 64. Ellenőrzés: 64 + 36 = 100.'
  },
  {
    id: 'g3c100ex-q41',
    level: 2,
    questionTypeBadge: 'Hiányzó szám',
    question: 'Melyik számot takarja a zöld háromszög?',
    figure: (
      <QFig h={60}>
        <ShapeEq parts={['71 −', T('haromszog', 'zold'), '= 45']} y={30} />
      </QFig>
    ),
    options: ['26', '116', '34', '36'],
    correctAnswer: 0,
    explanation: 'Mennyit vegyünk el a 71-ből, hogy 45 maradjon? 71 − 45 = 26.'
  },
  {
    id: 'g3c100ex-q42',
    level: 2,
    questionTypeBadge: 'Pénz',
    question: 'Ennyi pénzed van. Mennyi hiányzik 100 Ft-hoz?',
    figure: (
      <QFig h={80}>
        <Coins values={[50, 20, 10, 5]} y={40} />
      </QFig>
    ),
    options: ['15 Ft', '85 Ft', '25 Ft', '5 Ft'],
    correctAnswer: 0,
    explanation: '50 + 20 + 10 + 5 = 85 Ft. 100 − 85 = 15 Ft hiányzik.'
  },
  {
    id: 'g3c100ex-q43',
    level: 2,
    questionTypeBadge: 'Szorzótábla',
    question: 'Melyik szám kerül a kérdőjel helyére?',
    figure: (
      <QFig h={80}>
        <MulTable x={90} y={10} head={[7]} rows={[['?', 56]]} c={30} />
      </QFig>
    ),
    options: ['8', '7', '9', '49'],
    correctAnswer: 0,
    explanation: 'Melyik számot szorozzuk 7-tel, hogy 56 legyen? 8 · 7 = 56.'
  },
  {
    id: 'g3c100ex-q44',
    level: 2,
    questionTypeBadge: 'Osztás',
    question: '54 matricát 6 gyerek kap meg egyformán. Hány jut egy gyereknek?',
    figure: (
      <QFig h={86}>
        <text x="120" y="20" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#c2410c">54 matrica</text>
        <Plates n={6} dots="?" y={52} r={17} />
      </QFig>
    ),
    options: ['9', '8', '48', '60'],
    correctAnswer: 0,
    explanation: '54 : 6 = 9, mert 9 · 6 = 54.'
  },
  {
    id: 'g3c100ex-q45',
    level: 2,
    questionTypeBadge: 'Szorzótábla',
    question: 'Melyik szám hétszerese a 63?',
    options: ['9', '7', '56', '70'],
    correctAnswer: 0,
    explanation: '9 · 7 = 63, tehát a 63 a 9 hétszerese. (63 : 7 = 9)'
  },
  {
    id: 'g3c100ex-q46',
    level: 2,
    questionTypeBadge: 'Maradékos osztás',
    question: 'Mennyi 38 : 7?',
    options: ['5, marad 3', '4, marad 10', '5, marad 2', '6, marad 4'],
    correctAnswer: 0,
    explanation: '5 · 7 = 35, és 38 − 35 = 3. A maradék (3) kisebb, mint az osztó (7). Jó!'
  },
  {
    id: 'g3c100ex-q47',
    level: 2,
    questionTypeBadge: 'Maradékos osztás',
    question: 'Melyik osztás illik a képhez?',
    figure: (
      <QFig h={84}>
        <DotGroups total={23} size={4} grouped y={12} />
      </QFig>
    ),
    options: ['23 : 4 = 5, marad 3', '23 : 5 = 4, marad 3', '20 : 4 = 5', '23 : 4 = 6'],
    correctAnswer: 0,
    explanation: '23 korongból 5 négyes csoport lett, és 3 kimaradt: 23 : 4 = 5, marad 3.'
  },
  {
    id: 'g3c100ex-q48',
    level: 2,
    questionTypeBadge: 'Maradékos osztás',
    question: 'Ha 5-tel osztasz, mennyi lehet a legnagyobb maradék?',
    options: ['4', '5', '6', '1'],
    correctAnswer: 0,
    explanation: 'A maradék mindig kisebb, mint az osztó. 5-nél kisebb a 0, 1, 2, 3, 4. A legnagyobb a 4.'
  },
  {
    id: 'g3c100ex-q49',
    level: 2,
    questionTypeBadge: 'Műveleti sorrend',
    question: 'Mennyi 50 − 4 · 8?',
    options: ['18', '28', '42', '22'],
    correctAnswer: 0,
    explanation: 'Előbb a szorzás: 4 · 8 = 32. Aztán 50 − 32 = 18.'
  },
  {
    id: 'g3c100ex-q50',
    level: 2,
    questionTypeBadge: 'Műveleti sorrend',
    question: 'Mennyi 36 : 4 + 5 · 3?',
    options: ['24', '42', '27', '18'],
    correctAnswer: 0,
    explanation: 'Előbb az osztás és a szorzás: 36 : 4 = 9 és 5 · 3 = 15. Aztán 9 + 15 = 24.'
  },
  {
    id: 'g3c100ex-q51',
    level: 2,
    questionTypeBadge: 'Zárójel',
    question: 'Mennyi 4 · (12 − 5)?',
    options: ['28', '43', '7', '35'],
    correctAnswer: 0,
    explanation: 'Előbb a zárójel: 12 − 5 = 7. Aztán 4 · 7 = 28.'
  },
  {
    id: 'g3c100ex-q52',
    level: 2,
    questionTypeBadge: 'Zárójel',
    question: 'Mennyi (48 + 6) : 6?',
    options: ['9', '49', '8', '54'],
    correctAnswer: 0,
    explanation: 'Előbb a zárójel: 48 + 6 = 54. Aztán 54 : 6 = 9.'
  },
  {
    id: 'g3c100ex-q53',
    level: 2,
    questionTypeBadge: 'Zárójel',
    question: 'Melyik igaz?',
    options: ['(6 + 4) · 5 = 50', '6 + 4 · 5 = 50', '(6 + 4) · 5 = 26', '6 + 4 · 5 = 30'],
    correctAnswer: 0,
    explanation: '(6 + 4) · 5 = 10 · 5 = 50. Zárójel nélkül: 6 + 4 · 5 = 6 + 20 = 26.'
  },
  {
    id: 'g3c100ex-q54',
    level: 2,
    questionTypeBadge: 'Szöveges feladat',
    question: 'Egy 45 cm-es szalagból levágtak 18 cm-t. Milyen hosszú maradt?',
    figure: (
      <QFig h={72}>
        <Bars total="45 cm" parts={[{ label: '18 cm', len: 18 }, { label: '? cm', len: 27 }]} y={16} />
      </QFig>
    ),
    options: ['27 cm', '63 cm', '37 cm', '33 cm'],
    correctAnswer: 0,
    explanation: '45 − 18 = 27. A szalag 27 cm hosszú maradt. Ellenőrzés: 27 + 18 = 45.'
  },
  {
    id: 'g3c100ex-q55',
    level: 2,
    questionTypeBadge: 'Szöveges feladat',
    question: '42 ceruzát 7 gyerek kap meg egyformán. Hány ceruza jut egy gyereknek?',
    figure: (
      <QFig h={86}>
        <text x="120" y="20" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#c2410c">42 ceruza</text>
        <Plates n={7} dots="?" y={52} r={15} />
      </QFig>
    ),
    options: ['6', '7', '35', '49'],
    correctAnswer: 0,
    explanation: '42 : 7 = 6, mert 6 · 7 = 42. Minden gyerek 6 ceruzát kap.'
  },
  {
    id: 'g3c100ex-q56',
    level: 2,
    questionTypeBadge: 'Logikai lapok',
    question: 'Egy kör 20-at, egy háromszög 5-öt ér. Mennyit ér az egész ábra?',
    figure: (
      <QFig h={70}>
        <Tile shape="kor" color={TILE_COLORS.kek} cx={50} cy={35} s={30} />
        <Tile shape="kor" color={TILE_COLORS.piros} cx={88} cy={35} s={30} />
        <Tile shape="haromszog" color={TILE_COLORS.sarga} cx={130} cy={37} s={26} />
        <Tile shape="haromszog" color={TILE_COLORS.zold} cx={162} cy={37} s={26} />
        <Tile shape="haromszog" color={TILE_COLORS.piros} cx={194} cy={37} s={26} />
      </QFig>
    ),
    options: ['55', '25', '50', '45'],
    correctAnswer: 0,
    explanation: '2 kör: 20 + 20 = 40. 3 háromszög: 5 + 5 + 5 = 15. Együtt 40 + 15 = 55.'
  },
  {
    id: 'g3c100ex-q57',
    level: 2,
    questionTypeBadge: 'Minta',
    question: 'Hány kocka kell a 4. lépcsőhöz?',
    figure: (
      <QFig h={96}>
        <Stairs x={20} y={72} steps={1} c={11} label="1" />
        <Stairs x={58} y={72} steps={2} c={11} label="3" />
        <Stairs x={108} y={72} steps={3} c={11} label="6" />
        <rect x="170" y="22" width="50" height="50" rx="6" fill="#fff1f2" stroke={UNK} strokeDasharray="4 3" />
        <text x="195" y="53" textAnchor="middle" fontSize="18" fontWeight="bold" fill={UNK}>?</text>
      </QFig>
    ),
    options: ['10', '9', '8', '12'],
    correctAnswer: 0,
    explanation: 'Minden lépcső eggyel magasabb oszloppal nő: 1, 1 + 2 = 3, 3 + 3 = 6, 6 + 4 = 10.'
  },
  {
    id: 'g3c100ex-q58',
    level: 2,
    questionTypeBadge: 'Összehasonlítás',
    question: 'Mennyivel több a 4 · 5, mint a 6 · 3?',
    options: ['2', '38', '3', '12'],
    correctAnswer: 0,
    explanation: '4 · 5 = 20, 6 · 3 = 18. 20 − 18 = 2.'
  },
  {
    id: 'g3c100ex-q59',
    level: 2,
    questionTypeBadge: 'Páros, páratlan',
    question: 'Hány páros szám van a 41 és az 51 között?',
    figure: (
      <QFig h={80}>
        <NumLine from={40} to={52} step={1} labelEvery={2} marks={[{ v: 41, label: '41' }, { v: 51, label: '51' }]} />
      </QFig>
    ),
    options: ['5', '4', '6', '10'],
    correctAnswer: 0,
    explanation: 'A 41 és az 51 között: 42, 44, 46, 48, 50. Ez 5 páros szám.'
  },
  {
    id: 'g3c100ex-q60',
    level: 2,
    questionTypeBadge: 'Számkártyák',
    question: 'Rakd ki a legnagyobb kétjegyű számot! Egy kártyát egyszer használhatsz.',
    figure: <CardsFig cards={['4', '7', '0']} />,
    options: ['74', '70', '47', '740'],
    correctAnswer: 0,
    explanation: 'A tízesek helyére a legnagyobb jegy kerül (7), az egyesekére a következő (4): 74.'
  },

  // =========================================================================
  // 3. SZINT – legfeljebb két lépés, rövid szöveges feladatok, Kitekintő
  // =========================================================================
  {
    id: 'g3c100ex-q61',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    question: 'A buszon 45 ülés van. 9 ülés üres. Hány utas ül a buszon?',
    figure: (
      <QFig h={72}>
        <Bars total="45 ülés" parts={[{ label: '? utas', len: 36 }, { label: '9 üres', len: 12, color: '#e2e8f0' }]} y={16} />
      </QFig>
    ),
    options: ['36', '54', '44', '34'],
    correctAnswer: 0,
    explanation: '45 − 9 = 36. 36 utas ül a buszon. Ellenőrzés: 36 + 9 = 45.'
  },
  {
    id: 'g3c100ex-q62',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    question: 'Bence 27 matricát gyűjtött, Lili 8-cal többet. Hány matricájuk van együtt?',
    figure: (
      <QFig h={86}>
        <text x="14" y="30" fontSize="11" fontWeight="bold" fill={INK}>Bence</text>
        <rect x="56" y="18" width="104" height="18" fill="#38bdf8" stroke={INK} />
        <text x="108" y="31" textAnchor="middle" fontSize="11" fontWeight="bold" fill={INK}>27</text>
        <text x="14" y="62" fontSize="11" fontWeight="bold" fill={INK}>Lili</text>
        <rect x="56" y="50" width="104" height="18" fill="#fbbf24" stroke={INK} />
        <rect x="160" y="50" width="31" height="18" fill="#fde68a" stroke={INK} />
        <text x="108" y="63" textAnchor="middle" fontSize="11" fontWeight="bold" fill={INK}>27</text>
        <text x="175" y="63" textAnchor="middle" fontSize="11" fontWeight="bold" fill={INK}>8</text>
        <text x="212" y="47" textAnchor="middle" fontSize="16" fontWeight="bold" fill={UNK}>? </text>
      </QFig>
    ),
    options: ['62', '35', '54', '72'],
    correctAnswer: 0,
    explanation: 'Lili: 27 + 8 = 35 matrica. Együtt: 27 + 35 = 62.'
  },
  {
    id: 'g3c100ex-q63',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    question: 'A dobozban 4 sor sütemény van, soronként 6. Megettek 7-et. Hány maradt?',
    figure: (
      <QFig h={100}>
        <Choco x={66} y={14} rows={4} cols={6} c={18} frame="#fce7f3" fill="#f9a8d4" stroke="#be185d" round />
      </QFig>
    ),
    options: ['17', '24', '31', '10'],
    correctAnswer: 0,
    explanation: 'Összesen 4 · 6 = 24 sütemény. 24 − 7 = 17 maradt.'
  },
  {
    id: 'g3c100ex-q64',
    level: 3,
    questionTypeBadge: 'Zárójel',
    question: '5 zacskó van. Mindegyikben 3 piros és 4 kék golyó. Hány golyó van összesen?',
    figure: (
      <QFig h={80}>
        <Plates n={5} dots={[...rep(red, 3), ...rep(blue, 4)]} y={40} r={20} />
      </QFig>
    ),
    options: ['35', '19', '23', '12'],
    correctAnswer: 0,
    explanation: 'Egy zacskóban 3 + 4 = 7 golyó. 5 zacskóban: 5 · (3 + 4) = 5 · 7 = 35.'
  },
  {
    id: 'g3c100ex-q65',
    level: 3,
    questionTypeBadge: 'Maradékos osztás',
    question: '30 gyerek és 3 felnőtt csónakázik. Egy csónakba 4 ember fér. Hány csónak kell, hogy mindenki beférjen?',
    options: ['9', '8', '7', '33'],
    correctAnswer: 0,
    explanation: '30 + 3 = 33 ember. 33 : 4 = 8, marad 1. Az 1 embernek is kell csónak, így 8 + 1 = 9 csónak kell.'
  },
  {
    id: 'g3c100ex-q66',
    level: 3,
    questionTypeBadge: 'Maradékos osztás',
    question: '29 tojást 6-os dobozokba raksz. Hány tele doboz lesz, és hány tojás marad ki?',
    figure: (
      <QFig h={66}>
        <DotGroups total={29} grouped={false} y={10} color="#fef3c7" perRow={15} noun="tojás" />
      </QFig>
    ),
    options: ['4 doboz, marad 5', '5 doboz, marad 1', '4 doboz, marad 3', '3 doboz, marad 11'],
    correctAnswer: 0,
    explanation: '4 · 6 = 24, és 29 − 24 = 5. A maradék (5) kisebb, mint 6. 29 : 6 = 4, marad 5.'
  },
  {
    id: 'g3c100ex-q67',
    level: 3,
    questionTypeBadge: 'Műveleti sorrend',
    question: 'Mennyi 7 · 8 − 6 · 9?',
    options: ['2', '4', '12', '8'],
    correctAnswer: 0,
    explanation: 'Előbb a két szorzás: 7 · 8 = 56 és 6 · 9 = 54. Aztán 56 − 54 = 2.'
  },
  {
    id: 'g3c100ex-q68',
    level: 3,
    questionTypeBadge: 'Zárójel',
    question: 'Mennyi (63 − 27) : 4?',
    options: ['9', '8', '36', '46'],
    correctAnswer: 0,
    explanation: 'Előbb a zárójel: 63 − 27 = 36. Aztán 36 : 4 = 9.'
  },
  {
    id: 'g3c100ex-q69',
    level: 3,
    questionTypeBadge: 'Melyik számra gondoltam?',
    question: 'A 9 hatszorosánál 17-tel kisebb számra gondoltam. Melyik ez?',
    options: ['37', '71', '47', '43'],
    correctAnswer: 0,
    explanation: 'A 9 hatszorosa: 6 · 9 = 54. Ennél 17-tel kisebb: 54 − 17 = 37.'
  },
  {
    id: 'g3c100ex-q70',
    level: 3,
    questionTypeBadge: 'Melyik számra gondoltam?',
    question: 'A 24 és a 16 összegét elosztom 8-cal. Mennyi lesz?',
    options: ['5', '26', '40', '4'],
    correctAnswer: 0,
    explanation: 'Előbb az összeg: 24 + 16 = 40. Aztán 40 : 8 = 5. Műveletsorral: (24 + 16) : 8 = 5.'
  },
  {
    id: 'g3c100ex-q71',
    level: 3,
    questionTypeBadge: 'Kitekintő',
    question: 'A kisebbítendő a legnagyobb kétjegyű páratlan szám. A különbség 40. Mennyi a kivonandó?',
    figure: (
      <QFig h={78}>
        <rect x="30" y="14" width="50" height="30" rx="6" fill="#fff" stroke="#0369a1" strokeWidth="1.6" />
        <text x="96" y="35" textAnchor="middle" fontSize="20" fontWeight="bold" fill={INK}>−</text>
        <rect x="110" y="14" width="40" height="30" rx="6" fill="#ffe4e6" stroke={UNK} strokeWidth="1.6" strokeDasharray="4 3" />
        <text x="130" y="35" textAnchor="middle" fontSize="18" fontWeight="bold" fill={UNK}>?</text>
        <text x="164" y="35" textAnchor="middle" fontSize="20" fontWeight="bold" fill={INK}>=</text>
        <rect x="178" y="14" width="44" height="30" rx="6" fill="#fff" stroke="#0369a1" strokeWidth="1.6" />
        <text x="200" y="35" textAnchor="middle" fontSize="16" fontWeight="bold" fill={INK}>40</text>
        <text x="55" y="62" textAnchor="middle" fontSize="9.5" fill="#334155">kisebbítendő</text>
        <text x="130" y="62" textAnchor="middle" fontSize="9.5" fill={UNK}>kivonandó</text>
        <text x="200" y="62" textAnchor="middle" fontSize="9.5" fill="#334155">különbség</text>
      </QFig>
    ),
    options: ['59', '49', '60', '139'],
    correctAnswer: 0,
    explanation: 'A legnagyobb kétjegyű páratlan szám a 99. 99 − 59 = 40, tehát a kivonandó 59.'
  },
  {
    id: 'g3c100ex-q72',
    level: 3,
    questionTypeBadge: 'Műveletlánc',
    question: 'Számolj a nyilak szerint! Mi kerül a kérdőjel helyére?',
    figure: (
      <QFig h={76}>
        <Chain values={['4', '', '', '?']} ops={['+ 3', '· 2', '− 5']} y={30} />
      </QFig>
    ),
    options: ['9', '14', '11', '7'],
    correctAnswer: 0,
    explanation: '4 + 3 = 7, 7 · 2 = 14, 14 − 5 = 9.'
  },
  {
    id: 'g3c100ex-q73',
    level: 3,
    questionTypeBadge: 'Műveletlánc',
    question: 'Visszafelé gondolkodj! Melyik szám volt az elején?',
    figure: (
      <QFig h={76}>
        <Chain values={['?', '', '40']} ops={['· 6', '− 8']} y={30} />
      </QFig>
    ),
    options: ['8', '48', '7', '32'],
    correctAnswer: 0,
    explanation: 'Visszafelé: 40 + 8 = 48, 48 : 6 = 8. Próba: 8 · 6 = 48, 48 − 8 = 40.'
  },
  {
    id: 'g3c100ex-q74',
    level: 3,
    questionTypeBadge: 'Logikai lapok',
    question: 'Két egyforma háromszög együtt 30. A kör 6-tal több egy háromszögnél. Mennyi a kör?',
    figure: (
      <QFig h={84}>
        <ShapeEq parts={[T('haromszog', 'sarga'), '+', T('haromszog', 'sarga'), '= 30']} y={26} s={24} />
        <ShapeEq parts={[T('kor', 'kek'), '=', T('haromszog', 'sarga'), '+ 6']} y={62} s={24} />
      </QFig>
    ),
    options: ['21', '36', '15', '24'],
    correctAnswer: 0,
    explanation: 'Egy háromszög: 30 : 2 = 15. A kör: 15 + 6 = 21.'
  },
  {
    id: 'g3c100ex-q75',
    level: 3,
    questionTypeBadge: 'Logikai lapok',
    question: 'Egy kör 25-öt ér. Két kör és egy négyzet együtt 70. Mennyit ér a négyzet?',
    figure: (
      <QFig h={60}>
        <ShapeEq parts={[T('kor', 'piros'), '+', T('kor', 'piros'), '+', T('negyzet', 'zold'), '= 70']} y={30} s={24} />
      </QFig>
    ),
    options: ['20', '45', '95', '25'],
    correctAnswer: 0,
    explanation: 'Két kör: 25 + 25 = 50. A négyzet: 70 − 50 = 20.'
  },
  {
    id: 'g3c100ex-q76',
    level: 3,
    questionTypeBadge: 'Kitekintő',
    question: 'A táborban 5 asztal van, mindegyiknél 6 szék. Mindenki leült, de maradt üres szék. 26-nál többen vannak. Hányan lehetnek?',
    figure: (
      <QFig h={80}>
        <DinnerTables n={5} seats={6} y={40} />
      </QFig>
    ),
    options: ['28', '26', '30', '32'],
    correctAnswer: 0,
    explanation: '5 · 6 = 30 szék van. Volt üres szék, tehát 30-nál kevesebben vannak. 26-nál többen: 27, 28 vagy 29. A válaszok közül a 28 jó.'
  },
  {
    id: 'g3c100ex-q77',
    level: 3,
    questionTypeBadge: 'Kitekintő',
    question: 'Petra: „A 6 ötszörösénél 4-gyel kevesebb matricám van.” Gergő: „A 40 és a 12 különbségénél 3-mal kevesebb.” Kinek van több?',
    options: ['Petrának', 'Gergőnek', 'Ugyanannyi', 'Nem lehet tudni'],
    correctAnswer: 0,
    explanation: 'Petra: 6 · 5 = 30, 30 − 4 = 26. Gergő: 40 − 12 = 28, 28 − 3 = 25. A 26 a több: Petrának.'
  },
  {
    id: 'g3c100ex-q78',
    level: 3,
    questionTypeBadge: 'Kitekintő',
    question: 'Hányféleképpen juthatsz el a Faluból a Tóhoz, ha a Városon át mész?',
    figure: (
      <QFig h={120}>
        <Routes y={60} />
      </QFig>
    ),
    options: ['6', '5', '3', '9'],
    correctAnswer: 0,
    explanation: 'Mindhárom út után 2-féleképpen mehetsz tovább: 3 · 2 = 6 lehetőség.'
  },
  {
    id: 'g3c100ex-q79',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    question: 'Az osztályba 13 lány jár. A fiúk 4-gyel kevesebben vannak. Hány gyerek jár az osztályba?',
    figure: (
      <QFig h={86}>
        <text x="14" y="30" fontSize="11" fontWeight="bold" fill={INK}>lányok</text>
        <rect x="64" y="18" width="130" height="18" fill="#f9a8d4" stroke={INK} />
        <text x="129" y="31" textAnchor="middle" fontSize="11" fontWeight="bold" fill={INK}>13</text>
        <text x="14" y="62" fontSize="11" fontWeight="bold" fill={INK}>fiúk</text>
        <rect x="64" y="50" width="90" height="18" fill="#93c5fd" stroke={INK} />
        <rect x="154" y="50" width="40" height="18" fill="none" stroke={INK} strokeDasharray="3 3" />
        <text x="174" y="63" textAnchor="middle" fontSize="10" fill="#334155">4</text>
        <text x="216" y="47" textAnchor="middle" fontSize="16" fontWeight="bold" fill={UNK}>?</text>
      </QFig>
    ),
    options: ['22', '17', '30', '9'],
    correctAnswer: 0,
    explanation: 'Fiúk: 13 − 4 = 9. Összesen: 13 + 9 = 22 gyerek.'
  },
  {
    id: 'g3c100ex-q80',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    question: 'A könyv 60 oldalas. Hétfőn 18, kedden 25 oldalt olvastál el. Hány oldal van még hátra?',
    figure: (
      <QFig h={72}>
        <Bars total="60 oldal" parts={[{ label: '18', len: 18 }, { label: '25', len: 25 }, { label: '?', len: 17 }]} y={16} />
      </QFig>
    ),
    options: ['17', '43', '33', '27'],
    correctAnswer: 0,
    explanation: '18 + 25 = 43 oldalt olvastál el. 60 − 43 = 17 oldal van hátra.'
  },
  {
    id: 'g3c100ex-q81',
    level: 3,
    questionTypeBadge: 'Pénz',
    question: 'Van 100 Ft-od. Veszel 3 ceruzát, darabja 20 Ft. Mennyi pénzed marad?',
    figure: (
      <QFig h={96}>
        <g transform="translate(-50,0)">
          <Coins values={[100]} y={42} />
        </g>
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(${150 + i * 26},16)`}>
            <rect x="0" y="0" width="8" height="44" rx="1" fill="#facc15" stroke="#854d0e" />
            <path d="M 0 44 L 4 54 L 8 44 Z" fill="#fde68a" stroke="#854d0e" />
            <text x="4" y="70" textAnchor="middle" fontSize="9" fontWeight="bold" fill={INK}>20 Ft</text>
          </g>
        ))}
      </QFig>
    ),
    options: ['40 Ft', '80 Ft', '60 Ft', '20 Ft'],
    correctAnswer: 0,
    explanation: '3 ceruza: 3 · 20 = 60 Ft. 100 − 60 = 40 Ft marad. Műveletsorral: 100 − 3 · 20 = 40.'
  },
  {
    id: 'g3c100ex-q82',
    level: 3,
    questionTypeBadge: 'Zárójel',
    question: 'Hova kell tenni a zárójelet, hogy igaz legyen? 2 · 8 + 4 = 24',
    options: ['2 · (8 + 4) = 24', '(2 · 8) + 4 = 24', '(2 · 8 + 4) = 24', 'Nem kell zárójel'],
    correctAnswer: 0,
    explanation: 'Zárójel nélkül 2 · 8 + 4 = 16 + 4 = 20. Így viszont: 2 · (8 + 4) = 2 · 12 = 24.'
  },
  {
    id: 'g3c100ex-q83',
    level: 3,
    questionTypeBadge: 'Műveleti sorrend',
    question: 'Melyik műveletsor eredménye a legnagyobb?',
    options: ['(9 + 6) · 4', '9 + 6 · 4', '9 · 6 − 4', '9 · (6 − 4)'],
    correctAnswer: 0,
    explanation: '(9 + 6) · 4 = 60, 9 + 6 · 4 = 33, 9 · 6 − 4 = 50, 9 · (6 − 4) = 18. A legnagyobb a 60.'
  },
  {
    id: 'g3c100ex-q84',
    level: 3,
    questionTypeBadge: 'Melyik számra gondoltam?',
    question: 'Gondoltam egy számot. Megszoroztam 7-tel, majd hozzáadtam 6-ot. 69 lett. Melyik számra gondoltam?',
    figure: (
      <QFig h={76}>
        <Chain values={['?', '', '69']} ops={['· 7', '+ 6']} y={30} />
      </QFig>
    ),
    options: ['9', '11', '8', '75'],
    correctAnswer: 0,
    explanation: 'Visszafelé: 69 − 6 = 63, 63 : 7 = 9. Próba: 9 · 7 = 63, 63 + 6 = 69.'
  },
  {
    id: 'g3c100ex-q85',
    level: 3,
    questionTypeBadge: 'Maradékos osztás',
    question: 'Egy számot 8-cal osztottam. A hányados 7, a maradék 5. Melyik számot osztottam?',
    options: ['61', '56', '51', '63'],
    correctAnswer: 0,
    explanation: '7 · 8 = 56, és hozzá a maradék: 56 + 5 = 61. Próba: 61 : 8 = 7, marad 5.'
  },
  {
    id: 'g3c100ex-q86',
    level: 3,
    questionTypeBadge: 'Hibakeresés',
    question: 'Melyik osztás HIBÁS?',
    options: ['26 : 4 = 5, marad 6', '26 : 4 = 6, marad 2', '31 : 5 = 6, marad 1', '19 : 3 = 6, marad 1'],
    correctAnswer: 0,
    explanation: 'A maradék nem lehet 6, ha 4-gyel osztunk: a maradék mindig kisebb az osztónál. Helyesen: 26 : 4 = 6, marad 2.'
  },
  {
    id: 'g3c100ex-q87',
    level: 3,
    questionTypeBadge: 'Nyitott mondat',
    question: 'Melyik szám teszi igazzá? 76 − 18 > □ > 7 · 8',
    options: ['57', '56', '58', '55'],
    correctAnswer: 0,
    explanation: '76 − 18 = 58 és 7 · 8 = 56. A szám 58-nál kisebb és 56-nál nagyobb: csak az 57.'
  },
  {
    id: 'g3c100ex-q88',
    level: 3,
    questionTypeBadge: 'Műveletlánc',
    question: 'Két szabály váltja egymást: − 10, aztán : 2. Mi jön a 15 után?',
    figure: (
      <QFig h={76}>
        <Chain values={['90', '80', '40', '30', '15', '?']} ops={['− 10', ': 2', '− 10', ': 2', '− 10']} y={30} />
      </QFig>
    ),
    options: ['5', '25', '10', '8'],
    correctAnswer: 0,
    explanation: 'A 15 után a − 10 következik: 15 − 10 = 5.'
  },
  {
    id: 'g3c100ex-q89',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    question: 'A csokiban 4 sor van, soronként 6 kocka. Megettél 10 kockát. Hány kocka maradt?',
    figure: (
      <QFig h={100}>
        <Choco x={66} y={14} rows={4} cols={6} c={18} />
      </QFig>
    ),
    options: ['14', '20', '10', '24'],
    correctAnswer: 0,
    explanation: 'A csokiban 4 · 6 = 24 kocka van. 24 − 10 = 14 kocka maradt.'
  },
  {
    id: 'g3c100ex-q90',
    level: 3,
    questionTypeBadge: 'Kitekintő',
    question: 'A dominók minden oldalán 9 pötty van összesen. Hány pötty van a kérdőjel helyén?',
    figure: (
      <QFig h={116}>
        <DominoSquare x={75} y={8} s={33} v={[3, 2, 4, 0, 5, 3, 1, '?']} />
      </QFig>
    ),
    options: ['5', '4', '6', '3'],
    correctAnswer: 0,
    explanation: 'A bal oldalon: 3 + ? + 1 = 9. 3 + 1 = 4, és 9 − 4 = 5.'
  }
];

export const Count100ExamG3Quiz: React.FC<{
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
      topicId="g3-c100-tudasproba-quiz"
      subtopicId="megallo"
      title="8. Megálló – tudáspróba"
      subtitle="90 feladat 3 szinten: számok 100-ig, összeadás és kivonás, szorzótábla, maradékos osztás, szöveges feladatok, műveleti sorrend és zárójel."
      badge="3. OSZTÁLY • I. SZÁMOLÁS 0-TÓL 100-IG • TUDÁSPRÓBA"
      questions={COUNT100_EXAM_G3_QUESTIONS}
      cheatSheets={[
        {
          title: 'Számok 100-ig',
          items: [
            '47 = 4 tízes + 7 egyes = 40 + 7',
            'A 47 egyes szomszédai: 46 és 48; tízes szomszédai: 40 és 50',
            'Páros szám végén: 0, 2, 4, 6, 8. Páratlan végén: 1, 3, 5, 7, 9',
            '14 egyes = 1 tízes + 4 egyes'
          ]
        },
        {
          title: 'Műveletek',
          items: [
            'A kivonást összeadással, az osztást szorzással ellenőrizd',
            '17 : 5 = 3, marad 2, mert 3 · 5 + 2 = 17',
            'A maradék mindig kisebb, mint az osztó',
            'Hiányzó szám: □ + 36 = 100 → □ = 100 − 36 = 64'
          ]
        },
        {
          title: 'Sorrend és szöveges feladat',
          items: [
            'Először a zárójel, aztán a szorzás és osztás, végül az összeadás és kivonás',
            'Ha csak + és − van (vagy csak · és :), balról jobbra számolj',
            '„8-cal több” = + 8, „4-gyel kevesebb” = − 4, „hatszorosa” = · 6',
            'Szöveges feladat: adatok → terv → számolás → ellenőrzés → válasz'
          ]
        }
      ]}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      onSwitchToMatcher={onSwitchToMatcher}
      onSwitchToSorter={onSwitchToSorter}
      initialGameMode={initialGameMode}
      matcherComponent={
        <Count100ExamG3Matcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />
      }
      sorterComponent={
        <Count100ExamG3Sorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />
      }
    />
  );
};

export default Count100ExamG3Quiz;
