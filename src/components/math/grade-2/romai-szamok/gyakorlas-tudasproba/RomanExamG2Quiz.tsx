import React from 'react';
import { QuizTemplate, QuizQuestion, DifficultyLevel } from '../QuizTemplate';
import { RomanExamG2Matcher } from './RomanExamG2Matcher';
import { RomanExamG2Sorter } from './RomanExamG2Sorter';
import {
  toRoman,
  StickQFig,
  ClockQFig,
  RomanBoardQFig,
  CompareQFig,
  RowQFig,
  LineQFig
} from '../romai-szamok-ertelmezese/RomanIntroG2Parts';
import { romanBreakdown } from './RomanExamG2Parts';

type Fig = 'stick' | 'board' | 'none';

/** Olvasás: római → arab. */
const readQ = (id: number, level: DifficultyLevel, n: number, wrong: number[], fig: Fig = 'board'): QuizQuestion => ({
  id: `rexg2-q${id}`,
  level,
  questionTypeBadge: fig === 'stick' ? 'Pálcikák' : 'Olvasd ki!',
  figure: fig === 'stick' ? <StickQFig value={toRoman(n)} /> : fig === 'board' ? <RomanBoardQFig label={toRoman(n)} /> : undefined,
  question: fig === 'none' ? `Melyik szám a ${toRoman(n)}?` : 'Melyik szám ez?',
  options: [String(n), ...wrong.map(String)],
  correctAnswer: 0,
  explanation: `${romanBreakdown(n)}.`
});

/** Írás: arab → római. */
const writeQ = (id: number, level: DifficultyLevel, n: number, wrong: string[]): QuizQuestion => ({
  id: `rexg2-q${id}`,
  level,
  questionTypeBadge: 'Írd rómaiul',
  question: `Melyik római szám ér ennyit: ${n}?`,
  options: [toRoman(n), ...wrong],
  correctAnswer: 0,
  explanation: `${romanBreakdown(n)}.`
});

/** Összehasonlítás ábrával. */
const compareQ = (id: number, level: DifficultyLevel, a: number, b: number): QuizQuestion => {
  const sign = a < b ? '<' : a > b ? '>' : '=';
  const rest = ['<', '>', '=', '+'].filter((s) => s !== sign);
  return {
    id: `rexg2-q${id}`,
    level,
    questionTypeBadge: 'Összehasonlítás',
    figure: <CompareQFig left={toRoman(a)} right={toRoman(b)} />,
    question: 'Melyik jel kerül a ? helyére?',
    options: [sign, ...rest],
    correctAnswer: 0,
    explanation: `${toRoman(a)} = ${a} és ${toRoman(b)} = ${b}. Ezért ${toRoman(a)} ${sign} ${toRoman(b)}.`
  };
};

/** Óra leolvasása. */
const clockQ = (id: number, level: DifficultyLevel, h: number, wrong: number[]): QuizQuestion => ({
  id: `rexg2-q${id}`,
  level,
  questionTypeBadge: 'Római óra',
  figure: <ClockQFig hour={h} />,
  question: 'Hány órát mutat az óra?',
  options: [`${h} órát`, ...wrong.map((w) => `${w} órát`)],
  correctAnswer: 0,
  explanation: `A piros kismutató a ${toRoman(h)} jelre mutat, a nagymutató a XII-n áll. ${romanBreakdown(h)}, tehát ${h} óra.`
});

/** Számegyenes: melyik római szám kerül a ? helyére. */
const lineQ = (id: number, level: DifficultyLevel, n: number, wrong: string[], to = 20): QuizQuestion => ({
  id: `rexg2-q${id}`,
  level,
  questionTypeBadge: 'Számegyenes',
  figure: <LineQFig from={0} to={to} marks={[{ value: n, label: '?' }]} />,
  question: 'Melyik római szám kerül a ? helyére?',
  options: [toRoman(n), ...wrong],
  correctAnswer: 0,
  explanation: `A nyíl a ${n} helyére mutat. ${romanBreakdown(n)}.`
});

/** Hiányzó tag egy sorban. */
const rowQ = (
  id: number,
  level: DifficultyLevel,
  labels: string[],
  right: string,
  wrong: string[],
  explanation: string,
  badge = 'Sorozat'
): QuizQuestion => ({
  id: `rexg2-q${id}`,
  level,
  questionTypeBadge: badge,
  figure: <RowQFig labels={labels} />,
  question: 'Melyik római szám kerül a ? helyére?',
  options: [right, ...wrong],
  correctAnswer: 0,
  explanation
});

/** Számolás átírással. */
const calcQ = (id: number, level: DifficultyLevel, a: number, op: '+' | '−', b: number, wrong: number[]): QuizQuestion => {
  const res = op === '+' ? a + b : a - b;
  return {
    id: `rexg2-q${id}`,
    level,
    questionTypeBadge: 'Számolj!',
    figure: (
      <RomanBoardQFig
        label={`${toRoman(a)} ${op} ${toRoman(b)}`}
        caption={op === '+' ? 'Írd át, aztán add össze!' : 'Írd át, aztán vond ki!'}
      />
    ),
    question: 'Mennyi az eredmény?',
    options: [String(res), ...wrong.map(String)],
    correctAnswer: 0,
    explanation: `${toRoman(a)} = ${a}, ${toRoman(b)} = ${b}. ${a} ${op} ${b} = ${res}.`
  };
};

export const ROMAN_EXAM_G2_QUESTIONS: QuizQuestion[] = [
  // ================================================================ 1. szint
  readQ(1, 1, 5, [1, 10, 2], 'stick'),
  readQ(2, 1, 10, [2, 5, 1], 'stick'),
  readQ(3, 1, 3, [4, 2, 1]),
  readQ(4, 1, 6, [4, 7, 5], 'stick'),
  readQ(5, 1, 8, [7, 9, 3]),
  readQ(6, 1, 12, [11, 2, 13]),
  readQ(7, 1, 15, [5, 16, 14], 'stick'),
  readQ(8, 1, 20, [2, 10, 11]),
  writeQ(9, 1, 2, ['V', 'III', 'XI']),
  writeQ(10, 1, 7, ['IIV', 'VI', 'VIII']),
  writeQ(11, 1, 10, ['IX', 'VV', 'XI']),
  writeQ(12, 1, 12, ['IIX', 'XI', 'XIII']),
  {
    id: 'rexg2-q13',
    level: 1,
    questionTypeBadge: 'Az V jel',
    question: 'Melyik jel ér 5-öt?',
    options: ['V', 'X', 'I', 'IIIII'],
    correctAnswer: 0,
    explanation: 'A V jel ér 5-öt. Öt I-t nem írunk egymás mellé.'
  },
  clockQ(14, 1, 3, [9, 12, 4]),
  clockQ(15, 1, 6, [12, 4, 7]),
  {
    id: 'rexg2-q16',
    level: 1,
    questionTypeBadge: 'Az óra teteje',
    figure: <ClockQFig questionAt={[12]} />,
    question: 'Melyik római szám áll az óra tetején, a ? helyén?',
    options: ['XII', 'X', 'II', 'XI'],
    correctAnswer: 0,
    explanation: 'Az óra tetején a 12 áll: XII = 10 + 2.'
  },
  rowQ(17, 1, ['I', 'II', '?', 'IV'], 'III', ['V', 'IIII', 'VI'], 'Az 1 és a 2 után a 3 jön: III.'),
  rowQ(18, 1, ['V', 'VI', 'VII', '?'], 'VIII', ['IX', 'VIIII', 'VI'], 'A 7 után a 8 jön: VIII = 5 + 3.'),
  lineQ(19, 1, 5, ['IV', 'VI', 'X'], 10),
  lineQ(20, 1, 10, ['XX', 'IX', 'XI']),
  {
    id: 'rexg2-q21',
    level: 1,
    questionTypeBadge: 'Király neve',
    figure: <RomanBoardQFig label="IV. Béla" />,
    question: 'Hogyan mondjuk ki?',
    options: ['negyedik Béla', 'hatodik Béla', 'ötödik Béla', 'első Béla'],
    correctAnswer: 0,
    explanation: 'IV = 5 − 1 = 4. A pont miatt: negyedik Béla.'
  },
  {
    id: 'rexg2-q22',
    level: 1,
    questionTypeBadge: 'Emelet',
    figure: <RomanBoardQFig label="II. emelet" />,
    question: 'Hányadik emelet ez?',
    options: ['második', 'tizenegyedik', 'harmadik', 'első'],
    correctAnswer: 0,
    explanation: 'II = 1 + 1 = 2. Ez a második emelet, nem a tizenegyedik!'
  },
  {
    id: 'rexg2-q23',
    level: 1,
    questionTypeBadge: 'Nincs nulla',
    question: 'Hogyan írjuk a nullát római számmal?',
    options: ['Sehogy: nincs rá jel', 'O', 'I', 'X'],
    correctAnswer: 0,
    explanation: 'A rómaiaknak nem volt jelük a nullára. A római számok I-gyel kezdődnek.'
  },
  {
    id: 'rexg2-q24',
    level: 1,
    questionTypeBadge: 'Római vagy nem?',
    question: 'Melyik írás római szám?',
    options: ['XIV', '14', 'tizennégy', '41'],
    correctAnswer: 0,
    explanation: 'A XIV római szám: 10 + 4 = 14. A 14 arab számjegyekkel van írva.'
  },
  {
    id: 'rexg2-q25',
    level: 1,
    questionTypeBadge: 'Számold a pálcikát',
    figure: <StickQFig value="X" />,
    question: 'Hány pálcikából raktuk ki az X jelet?',
    options: ['2', '10', '1', '4'],
    correctAnswer: 0,
    explanation: 'Az X két keresztbe tett pálcika. Az értéke 10, de csak 2 pálcika.'
  },
  compareQ(26, 1, 2, 5),
  compareQ(27, 1, 10, 8),
  {
    id: 'rexg2-q28',
    level: 1,
    questionTypeBadge: 'Melyik nagyobb?',
    question: 'Melyik ér többet: a V vagy az X?',
    options: ['az X', 'a V', 'egyformák', 'nem lehet tudni'],
    correctAnswer: 0,
    explanation: 'V = 5, X = 10. A 10 több, mint az 5.'
  },
  readQ(29, 1, 11, [9, 10, 12], 'none'),
  readQ(30, 1, 7, [6, 8, 2], 'none'),

  // ================================================================ 2. szint
  readQ(31, 2, 4, [6, 3, 5]),
  readQ(32, 2, 9, [11, 8, 10], 'stick'),
  readQ(33, 2, 14, [16, 15, 4]),
  readQ(34, 2, 19, [11, 18, 9], 'stick'),
  readQ(35, 2, 18, [13, 17, 8]),
  readQ(36, 2, 16, [14, 6, 15], 'stick'),
  writeQ(37, 2, 4, ['IIII', 'VI', 'IIV']),
  writeQ(38, 2, 9, ['VIIII', 'XI', 'IIX']),
  writeQ(39, 2, 14, ['XIIII', 'XVI', 'IVX']),
  writeQ(40, 2, 19, ['XVIIII', 'IXX', 'XVIII']),
  compareQ(41, 2, 9, 11),
  compareQ(42, 2, 14, 12),
  compareQ(43, 2, 16, 16),
  compareQ(44, 2, 8, 9),
  rowQ(45, 2, ['XVII', '?', 'XIX'], 'XVIII', ['XVI', 'XX', 'XIIX'], 'A 17 és a 19 között a 18 van: XVIII.', 'Középen'),
  rowQ(46, 2, ['?', 'XIV', 'XV'], 'XIII', ['XII', 'XVI', 'IIIX'], 'A 14 előtt a 13 áll: XIII.', 'Szomszéd'),
  rowQ(47, 2, ['IX', 'X', '?'], 'XI', ['XII', 'IIX', 'XX'], 'A 10 után a 11 jön: XI = 10 + 1.', 'Szomszéd'),
  clockQ(48, 2, 9, [11, 3, 10]),
  clockQ(49, 2, 4, [6, 8, 5]),
  clockQ(50, 2, 11, [9, 1, 10]),
  lineQ(51, 2, 14, ['XVI', 'XIIII', 'XV']),
  lineQ(52, 2, 19, ['XVIII', 'XX', 'IXX']),
  lineQ(53, 2, 7, ['VI', 'VIII', 'XVII']),
  {
    id: 'rexg2-q54',
    level: 2,
    questionTypeBadge: 'Hibakereső',
    question: 'Melyik írás NEM jó?',
    options: ['IIII', 'III', 'IV', 'VI'],
    correctAnswer: 0,
    explanation: 'Négy egyforma jel nem állhat egymás mellett. A 4 helyesen: IV.'
  },
  {
    id: 'rexg2-q55',
    level: 2,
    questionTypeBadge: 'Hibakereső',
    question: 'Melyik írás NEM jó?',
    options: ['VV', 'XV', 'XX', 'V'],
    correctAnswer: 0,
    explanation: 'A V jel csak egyszer szerepelhet. A 10 helyesen: X.'
  },
  {
    id: 'rexg2-q56',
    level: 2,
    questionTypeBadge: 'Szabály',
    question: 'Legfeljebb hány egyforma jel állhat egymás mellett?',
    options: ['3', '4', '2', '5'],
    correctAnswer: 0,
    explanation: 'Legfeljebb 3: III és XX jó, IIII nem jó.'
  },
  {
    id: 'rexg2-q57',
    level: 2,
    questionTypeBadge: 'Mit csinálunk?',
    figure: <StickQFig value="IV" caption="Az I a V bal oldalán" />,
    question: 'Az I balra áll. Mit csinálunk vele?',
    options: ['elvesszük', 'hozzáadjuk', 'nem számít', 'kétszer vesszük'],
    correctAnswer: 0,
    explanation: 'Balra elveszünk: IV = 5 − 1 = 4.'
  },
  {
    id: 'rexg2-q58',
    level: 2,
    questionTypeBadge: 'Minta',
    figure: <RowQFig labels={['VII', '→', 'XVII']} />,
    question: 'Melyik jelet tettük a VII elé, hogy XVII legyen?',
    options: ['X', 'I', 'V', 'XX'],
    correctAnswer: 0,
    explanation: 'Elé tettük az X-et: X + VII = 10 + 7 = 17.'
  },
  {
    id: 'rexg2-q59',
    level: 2,
    questionTypeBadge: 'Legnagyobb',
    question: 'Melyik a legnagyobb szám?',
    options: ['XIX', 'XVIII', 'XVII', 'XVI'],
    correctAnswer: 0,
    explanation: 'XIX = 19 a legnagyobb, pedig a XVIII-ban több a jel. Nem a jelek száma számít!'
  },
  {
    id: 'rexg2-q60',
    level: 2,
    questionTypeBadge: 'Hányadik?',
    figure: <RomanBoardQFig label="XIII. kerület" />,
    question: 'Hányadik kerület ez?',
    options: ['tizenharmadik', 'harmadik', 'tizenegyedik', 'tizennegyedik'],
    correctAnswer: 0,
    explanation: 'XIII = 10 + 3 = 13. Ez a tizenharmadik kerület.'
  },

  // ================================================================ 3. szint
  {
    id: 'rexg2-q61',
    level: 3,
    questionTypeBadge: 'Sorba rendezés',
    figure: <RowQFig labels={['XV', 'IX', 'XIX', 'XII']} />,
    question: 'Melyik a jó sorrend a legkisebbtől a legnagyobbig?',
    options: ['IX, XII, XV, XIX', 'XIX, XV, XII, IX', 'IX, XV, XII, XIX', 'XII, IX, XV, XIX'],
    correctAnswer: 0,
    explanation: 'Írd át: 15, 9, 19, 12. Sorban: 9, 12, 15, 19.'
  },
  {
    id: 'rexg2-q62',
    level: 3,
    questionTypeBadge: 'Sorba rendezés',
    figure: <RowQFig labels={['VI', 'XVI', 'XI', 'IV']} />,
    question: 'Melyik a jó sorrend a legnagyobbtól a legkisebbig?',
    options: ['XVI, XI, VI, IV', 'IV, VI, XI, XVI', 'XI, XVI, VI, IV', 'XVI, VI, XI, IV'],
    correctAnswer: 0,
    explanation: 'Írd át: 6, 16, 11, 4. A legnagyobbtól: 16, 11, 6, 4.'
  },
  calcQ(63, 3, 7, '+', 5, [2, 11, 13]),
  calcQ(64, 3, 20, '−', 8, [11, 13, 8]),
  calcQ(65, 3, 14, '+', 4, [16, 10, 17]),
  calcQ(66, 3, 19, '−', 9, [1, 9, 11]),
  {
    id: 'rexg2-q67',
    level: 3,
    questionTypeBadge: 'Számolj rómaiul!',
    figure: <RomanBoardQFig label="IX + VI" caption="Az eredményt írd rómaiul!" />,
    question: 'Melyik római szám az eredmény?',
    options: ['XV', 'XIV', 'XVI', 'VX'],
    correctAnswer: 0,
    explanation: 'IX = 9, VI = 6. 9 + 6 = 15. Rómaiul: XV.'
  },
  {
    id: 'rexg2-q68',
    level: 3,
    questionTypeBadge: 'Lift',
    figure: <RomanBoardQFig label="IV. emelet" />,
    question: 'A lift itt áll. Még 5 emeletet megy fel. Melyik emeleten áll meg?',
    options: ['IX.', 'XI.', 'VIII.', 'I.'],
    correctAnswer: 0,
    explanation: 'IV = 4. 4 + 5 = 9. A IX. emeleten áll meg.'
  },
  {
    id: 'rexg2-q69',
    level: 3,
    questionTypeBadge: 'Különbség',
    figure: <RomanBoardQFig label="XVII − XII" caption="Írd át, aztán vond ki!" />,
    question: 'Mennyi a különbség?',
    options: ['5', '6', '4', '15'],
    correctAnswer: 0,
    explanation: 'XVII = 17, XII = 12. 17 − 12 = 5.'
  },
  {
    id: 'rexg2-q70',
    level: 3,
    questionTypeBadge: 'Óra',
    figure: <ClockQFig hour={8} />,
    question: 'Most ennyi óra van. 2 óra múlva hány óra lesz?',
    options: ['X', 'VI', 'IX', 'XI'],
    correctAnswer: 0,
    explanation: 'Most 8 óra van. 8 + 2 = 10. Rómaiul: X.'
  },
  {
    id: 'rexg2-q71',
    level: 3,
    questionTypeBadge: 'Óra',
    figure: <ClockQFig hour={11} />,
    question: 'Most ennyi óra van. 1 órával előbb hány óra volt?',
    options: ['X', 'XII', 'IX', 'VIII'],
    correctAnswer: 0,
    explanation: 'Most 11 óra van. 11 − 1 = 10. Rómaiul: X.'
  },
  {
    id: 'rexg2-q72',
    level: 3,
    questionTypeBadge: 'Óra',
    figure: <ClockQFig hour={7} />,
    question: 'Az óra VII órát mutat. Hány óra múlva lesz X óra?',
    options: ['3', '17', '4', '2'],
    correctAnswer: 0,
    explanation: 'VII = 7, X = 10. 7-től 10-ig 3 óra telik el.'
  },
  {
    id: 'rexg2-q73',
    level: 3,
    questionTypeBadge: 'Pálcika-áthelyezés',
    figure: <StickQFig value="VI" caption="Tedd át az I-t a V bal oldalára!" />,
    question: 'Mennyi lesz a szám?',
    options: ['4', '6', '5', '7'],
    correctAnswer: 0,
    explanation: 'VI-ból IV lesz. Balra elveszünk: 5 − 1 = 4.'
  },
  {
    id: 'rexg2-q74',
    level: 3,
    questionTypeBadge: 'Pálcika-áthelyezés',
    figure: <StickQFig value="XI" caption="Tedd át az I-t az X elé!" />,
    question: 'Mennyi lesz a szám?',
    options: ['9', '11', '10', '12'],
    correctAnswer: 0,
    explanation: 'XI-ből IX lesz. Balra elveszünk: 10 − 1 = 9.'
  },
  {
    id: 'rexg2-q75',
    level: 3,
    questionTypeBadge: 'Pálcikaszámlálás',
    question: 'Hány pálcika kell a XVIII kirakásához?',
    options: ['7', '18', '5', '8'],
    correctAnswer: 0,
    explanation: 'X = 2 pálcika, V = 2 pálcika, és még 3 I: 2 + 2 + 3 = 7.'
  },
  {
    id: 'rexg2-q76',
    level: 3,
    questionTypeBadge: 'Pálcikaszámlálás',
    question: 'Melyik számot rakhatod ki pontosan 3 pálcikával?',
    options: ['IX', 'XX', 'VIII', 'VII'],
    correctAnswer: 0,
    explanation: 'IX: I = 1 pálcika, X = 2 pálcika, együtt 3. XX = 4, VIII = 5, VII = 4 pálcika.'
  },
  rowQ(77, 3, ['XX', 'XVIII', 'XVI', '?'], 'XIV', ['XV', 'XIII', 'XII'], '20, 18, 16, … mindig 2-vel csökken. 16 − 2 = 14: XIV.', 'Szabály'),
  rowQ(78, 3, ['V', 'X', 'XV', '?'], 'XX', ['XVI', 'XIX', 'VV'], '5, 10, 15, … mindig 5-tel nő. 15 + 5 = 20: XX.', 'Szabály'),
  {
    id: 'rexg2-q79',
    level: 3,
    questionTypeBadge: 'Igaz vagy hamis?',
    question: 'Melyik állítás igaz?',
    options: ['XIV < XVI', 'IX > XI', 'XVIII < XIII', 'XX < XIX'],
    correctAnswer: 0,
    explanation: 'XIV = 14 és XVI = 16. 14 < 16, ez igaz. A többi hamis.'
  },
  {
    id: 'rexg2-q80',
    level: 3,
    questionTypeBadge: 'Szomszédok',
    figure: <LineQFig marks={[{ value: 17, label: 'XVII' }]} />,
    question: 'Melyik két szám között van a XVII?',
    options: ['XVI és XVIII', 'XV és XVII', 'VI és VIII', 'XVIII és XX'],
    correctAnswer: 0,
    explanation: 'XVII = 17. A 17 a 16 és a 18 között van: XVI és XVIII.'
  },
  {
    id: 'rexg2-q81',
    level: 3,
    questionTypeBadge: 'Fejtörő',
    question: 'Egy római szám két jelből áll. Az első X, a második I. Mennyi ez?',
    options: ['11', '9', '2', '10'],
    correctAnswer: 0,
    explanation: 'XI: az I jobbra áll, hozzáadjuk. 10 + 1 = 11.'
  },
  rowQ(82, 3, ['XIII', '?', 'XV'], 'XIV', ['XIIII', 'XVI', 'XII'], 'A 13 és a 15 között a 14 van: XIV.', 'Középen'),
  {
    id: 'rexg2-q83',
    level: 3,
    questionTypeBadge: 'Óra-fejtörő',
    figure: <ClockQFig />,
    question: 'Az óra számai közül hányban van X jel?',
    options: ['4', '3', '1', '2'],
    correctAnswer: 0,
    explanation: 'IX, X, XI és XII: ez 4 szám, mindegyikben van X.'
  },
  {
    id: 'rexg2-q84',
    level: 3,
    questionTypeBadge: 'Hányadik?',
    figure: <RomanBoardQFig label="XIX. fejezet" />,
    question: 'Hányadik fejezet ez?',
    options: ['tizenkilencedik', 'tizenegyedik', 'kilencedik', 'tizennyolcadik'],
    correctAnswer: 0,
    explanation: 'XIX = X + IX = 10 + 9 = 19. Ez a tizenkilencedik fejezet.'
  },
  {
    id: 'rexg2-q85',
    level: 3,
    questionTypeBadge: 'Sorban állás',
    question: 'Peti a XV. helyen áll a sorban. Hányan állnak előtte?',
    options: ['14', '15', '16', '5'],
    correctAnswer: 0,
    explanation: 'XV = 15. Ha Peti a 15., akkor előtte 15 − 1 = 14 gyerek áll.'
  },
  {
    id: 'rexg2-q86',
    level: 3,
    questionTypeBadge: 'Hónapok',
    figure: <RomanBoardQFig label="X. hónap" />,
    question: 'Melyik hónap ez? (Az I. hónap a január.)',
    options: ['október', 'november', 'szeptember', 'december'],
    correctAnswer: 0,
    explanation: 'X = 10. Az év tizedik hónapja az október.'
  },
  {
    id: 'rexg2-q87',
    level: 3,
    questionTypeBadge: 'Két lépés',
    figure: <RomanBoardQFig label="X + X − V" caption="Írd át, és számolj balról jobbra!" />,
    question: 'Mennyi az eredmény?',
    options: ['15', '5', '10', '16'],
    correctAnswer: 0,
    explanation: '10 + 10 = 20, és 20 − 5 = 15.'
  },
  {
    id: 'rexg2-q88',
    level: 3,
    questionTypeBadge: 'Összehasonlítás',
    figure: <CompareQFig left="XIX" right="XVIII+I" />,
    question: 'Melyik jel kerül a ? helyére?',
    options: ['=', '<', '>', '+'],
    correctAnswer: 0,
    explanation: 'XIX = 19. XVIII + I = 18 + 1 = 19. A kettő egyenlő.'
  },
  {
    id: 'rexg2-q89',
    level: 3,
    questionTypeBadge: 'Nincs nulla',
    question: 'Melyik számot NEM tudjuk római számmal leírni?',
    options: ['0', '1', '10', '20'],
    correctAnswer: 0,
    explanation: 'A 0-nak nincs római jele. Az 1 = I, a 10 = X, a 20 = XX.'
  },
  {
    id: 'rexg2-q90',
    level: 3,
    questionTypeBadge: 'Fejtörő',
    question: 'Anna egy I-gyel kezdődő római számot írt. Melyiket írhatta?',
    options: ['IX', 'XI', 'VI', 'XV'],
    correctAnswer: 0,
    explanation: 'A IX első jele az I. A XI, a VI és a XV más jellel kezdődik.'
  }
];

export const RomanExamG2Quiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => (
  <QuizTemplate
    grade={2}
    chapterId="romai-szamok"
    topicId="g2-romai-tudasproba-quiz"
    subtopicId="gyakorlas-tudasproba"
    title="4. Gyakorlás, tudáspróba – Tudáspróba Kvíz"
    subtitle="90 feladat 3 szinten: az I, V, X jelek és szabályaik, római számok 1-től 20-ig, összehasonlítás, sorrend, római óra, számolás átírással."
    badge="2. OSZTÁLY • VI. A RÓMAI SZÁMOK • TUDÁSPRÓBA"
    questions={ROMAN_EXAM_G2_QUESTIONS}
    cheatSheets={[
      {
        title: 'Jelek és szabályok',
        items: ['I = 1, V = 5, X = 10', 'Legfeljebb 3 egyforma jel', 'Jobbra hozzáad: VI = 6, XI = 11', 'Balra elvesz: IV = 4, IX = 9']
      },
      {
        title: 'Számok 1-től 20-ig',
        items: ['I II III IV V VI VII VIII IX X', '11–20: elöl X, pl. XVII = 17', 'XX = 20', 'Nincs római nulla']
      },
      {
        title: 'Összehasonlítás, óra, számolás',
        items: ['Előbb írd át arab számmá!', 'Nem a jelek száma számít', 'Nagymutató a XII-n: egész óra', 'XII + V = 12 + 5 = 17']
      }
    ]}
    onBack={onBack}
    onSwitchToTheory={onSwitchToTheory}
    onSwitchToMatcher={onSwitchToMatcher}
    onSwitchToSorter={onSwitchToSorter}
    initialGameMode={initialGameMode}
    matcherComponent={
      <RomanExamG2Matcher
        onBack={onBack}
        onSwitchToTheory={onSwitchToTheory}
        onSwitchToQuiz={() => {}}
        onSwitchToSorter={onSwitchToSorter}
      />
    }
    sorterComponent={
      <RomanExamG2Sorter
        onBack={onBack}
        onSwitchToTheory={onSwitchToTheory}
        onSwitchToQuiz={() => {}}
        onSwitchToMatcher={onSwitchToMatcher}
      />
    }
  />
);

export default RomanExamG2Quiz;
