import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { MulOneDigitG3Matcher } from './MulOneDigitG3Matcher';
import { MulOneDigitG3Sorter } from './MulOneDigitG3Sorter';
import { CoinsQ, BlocksQ, TagQ, ChainQ, SplitQ, NumLineQ, CardsQ } from './MulOneDigitG3Parts';

// ---------------------------------------------------------------------------
// Kérdések
// ---------------------------------------------------------------------------
export const MUL_ONE_DIGIT_G3_QUESTIONS: QuizQuestion[] = [
  // ---------------- 1. szint ----------------
  {
    id: 'mul1-q1',
    level: 1,
    questionTypeBadge: 'Pénz',
    figure: <CoinsQ a={340} m={2} caption="340 Ft · 2 = ?" />,
    question: 'Egy vonatjegy 340 Ft. Mennyibe kerül 2 jegy?',
    options: ['680 Ft', '640 Ft', '380 Ft', '600 Ft'],
    correctAnswer: 0,
    explanation: '2 · 3 százas = 6 százas, 2 · 4 tízes = 8 tízes. 600 + 80 = 680 Ft.'
  },
  {
    id: 'mul1-q2',
    level: 1,
    questionTypeBadge: 'Tízesekkel',
    figure: <BlocksQ n={120} m={3} caption="120 · 3 = ?" />,
    question: 'Mennyi 120 · 3?',
    options: ['360', '330', '123', '160'],
    correctAnswer: 0,
    explanation: '120 = 12 tízes. 12 tízes · 3 = 36 tízes = 360.'
  },
  {
    id: 'mul1-q3',
    level: 1,
    questionTypeBadge: 'Helyiérték',
    figure: <BlocksQ n={120} m={1} caption="120 = ? tízes" />,
    question: 'Hány tízes van a 120-ban?',
    options: ['12 tízes', '2 tízes', '120 tízes', '1 tízes'],
    correctAnswer: 0,
    explanation: '1 százas = 10 tízes. Meg még 2 tízes. Ez összesen 12 tízes.'
  },
  {
    id: 'mul1-q4',
    level: 1,
    questionTypeBadge: 'Tízesekkel',
    question: 'Mennyi 12 tízes · 3?',
    options: ['36 tízes', '15 tízes', '36 egyes', '32 tízes'],
    correctAnswer: 0,
    explanation: '12 · 3 = 36. Tízesekkel ugyanígy: 12 tízes · 3 = 36 tízes.'
  },
  {
    id: 'mul1-q5',
    level: 1,
    questionTypeBadge: 'Pénz',
    figure: <CoinsQ a={110} m={4} caption="4 · 110 Ft = ?" />,
    question: 'Mennyi 4 · 110?',
    options: ['440', '410', '114', '404'],
    correctAnswer: 0,
    explanation: '4 · 100 = 400, 4 · 10 = 40. 400 + 40 = 440.'
  },
  {
    id: 'mul1-q6',
    level: 1,
    questionTypeBadge: 'Fejben szorzás',
    question: 'Mennyi 230 · 3?',
    options: ['690', '233', '630', '609'],
    correctAnswer: 0,
    explanation: '200 · 3 = 600, 30 · 3 = 90. 600 + 90 = 690.'
  },
  {
    id: 'mul1-q7',
    level: 1,
    questionTypeBadge: 'Vásárlás',
    figure: <TagQ price="130 Ft" m={3} kind="pencil" caption="3 · 130 Ft = ?" />,
    question: 'Egy ceruza 130 Ft. Mennyibe kerül 3 ceruza?',
    options: ['390 Ft', '133 Ft', '360 Ft', '930 Ft'],
    correctAnswer: 0,
    explanation: '3 · 100 = 300, 3 · 30 = 90. 300 + 90 = 390 Ft.'
  },
  {
    id: 'mul1-q8',
    level: 1,
    questionTypeBadge: 'Felcserélés',
    question: 'Melyik ugyanannyi, mint 2 · 340?',
    options: ['340 · 2', '340 + 2', '34 · 2', '320 · 4'],
    correctAnswer: 0,
    explanation: 'A tényezők felcserélhetők: 2 · 340 = 340 · 2 = 680.'
  },
  {
    id: 'mul1-q9',
    level: 1,
    questionTypeBadge: 'Százasokkal',
    figure: <BlocksQ n={200} m={4} caption="200 · 4 = ?" s={20} />,
    question: 'Mennyi 200 · 4?',
    options: ['800', '204', '80', '600'],
    correctAnswer: 0,
    explanation: '2 százas · 4 = 8 százas = 800.'
  },
  {
    id: 'mul1-q10',
    level: 1,
    questionTypeBadge: 'Pénz',
    figure: <CoinsQ a={410} m={2} caption="410 Ft · 2 = ?" />,
    question: 'Mennyi 410 · 2?',
    options: ['820', '810', '412', '802'],
    correctAnswer: 0,
    explanation: '400 · 2 = 800, 10 · 2 = 20. 800 + 20 = 820.'
  },

  // ---------------- 2. szint ----------------
  {
    id: 'mul1-q11',
    level: 2,
    questionTypeBadge: 'Bontás',
    figure: <SplitQ a={280} m={2} p1="400" p2="160" />,
    question: 'Számold ki bontással! 280 · 2',
    options: ['560', '480', '460', '160'],
    correctAnswer: 0,
    explanation: '200 · 2 = 400, 80 · 2 = 160. 400 + 160 = 560.'
  },
  {
    id: 'mul1-q12',
    level: 2,
    questionTypeBadge: 'Bontás',
    figure: <BlocksQ n={170} m={4} caption="170 · 4" s={20} />,
    question: 'Melyik bontás jó? 170 · 4',
    options: ['100 · 4 + 70 · 4', '100 · 4 + 70', '100 + 70 · 4', '10 · 4 + 70 · 4'],
    correctAnswer: 0,
    explanation: 'A 170 = 100 + 70. Mindkét részt meg kell szorozni 4-gyel: 100 · 4 + 70 · 4.'
  },
  {
    id: 'mul1-q13',
    level: 2,
    questionTypeBadge: 'Fejben szorzás',
    question: 'Mennyi 140 · 5?',
    options: ['700', '540', '520', '750'],
    correctAnswer: 0,
    explanation: '100 · 5 = 500, 40 · 5 = 200. 500 + 200 = 700.'
  },
  {
    id: 'mul1-q14',
    level: 2,
    questionTypeBadge: 'Bontás',
    figure: <SplitQ a={190} m={4} p1="?" p2="?" />,
    question: 'Mennyi 190 · 4?',
    options: ['760', '436', '490', '740'],
    correctAnswer: 0,
    explanation: '100 · 4 = 400, 90 · 4 = 360. 400 + 360 = 760.'
  },
  {
    id: 'mul1-q15',
    level: 2,
    questionTypeBadge: 'Tízesekkel',
    question: 'Mennyi 130 · 7?',
    options: ['910', '730', '810', '970'],
    correctAnswer: 0,
    explanation: '130 = 13 tízes. 13 · 7 = 91, tehát 91 tízes = 910.'
  },
  {
    id: 'mul1-q16',
    level: 2,
    questionTypeBadge: 'Vásárlás',
    figure: <TagQ price="150 Ft" m={6} kind="cake" caption="6 · 150 Ft = ?" />,
    question: 'Egy sütemény 150 Ft. Mennyibe kerül 6 sütemény?',
    options: ['900 Ft', '650 Ft', '750 Ft', '960 Ft'],
    correctAnswer: 0,
    explanation: '100 · 6 = 600, 50 · 6 = 300. 600 + 300 = 900 Ft.'
  },
  {
    id: 'mul1-q17',
    level: 2,
    questionTypeBadge: 'Pénz',
    figure: <CoinsQ a={160} m={3} caption="3 · 160 Ft = ?" />,
    question: 'Mennyi 3 · 160?',
    options: ['480', '360', '380', '490'],
    correctAnswer: 0,
    explanation: '3 · 100 = 300, 3 · 60 = 180. 300 + 180 = 480.'
  },
  {
    id: 'mul1-q18',
    level: 2,
    questionTypeBadge: 'Szorzólánc',
    figure: <ChainQ vals={['140', '280', '?']} ops={['· 2', '· 2']} />,
    question: 'Melyik szám kerül a lánc végére?',
    options: ['560', '280', '420', '540'],
    correctAnswer: 0,
    explanation: '140 · 2 = 280, aztán 280 · 2 = 560.'
  },
  {
    id: 'mul1-q19',
    level: 2,
    questionTypeBadge: 'Fejben szorzás',
    question: 'Mennyi 290 · 3?',
    options: ['870', '690', '627', '880'],
    correctAnswer: 0,
    explanation: '200 · 3 = 600, 90 · 3 = 270. 600 + 270 = 870.'
  },
  {
    id: 'mul1-q20',
    level: 2,
    questionTypeBadge: 'Hiányzó szám',
    question: '□ · 40 = 280. Melyik szám kerül a □ helyére?',
    options: ['7', '6', '8', '70'],
    correctAnswer: 0,
    explanation: '28 tízes = □ · 4 tízes. 7 · 4 = 28, tehát 7 · 40 = 280.'
  },

  // ---------------- 3. szint ----------------
  {
    id: 'mul1-q21',
    level: 3,
    questionTypeBadge: 'Igaz-e?',
    figure: <NumLineQ max={400} step={40} marks={[200]} labelEvery={80} caption="Lépj 40-esével! □ · 40 < 200" />,
    question: '□ · 40 < 200. Melyik szám kerülhet a □ helyére?',
    options: ['4', '5', '6', '8'],
    correctAnswer: 0,
    explanation: '4 · 40 = 160, ez kisebb 200-nál. 5 · 40 = 200, ez már nem kisebb.'
  },
  {
    id: 'mul1-q22',
    level: 3,
    questionTypeBadge: 'Szöveges feladat',
    question: 'A bábszínházban 4 előadás volt. Mindegyiken 230 néző ült. Hány néző volt összesen?',
    options: ['920', '830', '234', '820'],
    correctAnswer: 0,
    explanation: '230 · 4: 200 · 4 = 800, 30 · 4 = 120. 800 + 120 = 920 néző.'
  },
  {
    id: 'mul1-q23',
    level: 3,
    questionTypeBadge: 'Két lépés',
    figure: <TagQ price="180 Ft" m={3} kind="book" caption="1000 Ft-tal fizet." />,
    question: 'Anya 3 füzetet vesz, darabja 180 Ft. 1000 Ft-tal fizet. Mennyit kap vissza?',
    options: ['460 Ft', '540 Ft', '820 Ft', '660 Ft'],
    correctAnswer: 0,
    explanation: '3 · 180 = 540 Ft a füzet. 1000 − 540 = 460 Ft-ot kap vissza.'
  },
  {
    id: 'mul1-q24',
    level: 3,
    questionTypeBadge: 'Bontás',
    figure: <BlocksQ n={124} m={3} caption="3 · 124 = ?" />,
    question: 'Bontsd három részre! Mennyi 3 · 124?',
    options: ['372', '362', '312', '374'],
    correctAnswer: 0,
    explanation: '3 · 100 = 300, 3 · 20 = 60, 3 · 4 = 12. 300 + 60 + 12 = 372.'
  },
  {
    id: 'mul1-q25',
    level: 3,
    questionTypeBadge: 'Bontás',
    question: 'Mennyi 2 · 312?',
    options: ['624', '614', '324', '622'],
    correctAnswer: 0,
    explanation: '2 · 300 = 600, 2 · 10 = 20, 2 · 2 = 4. 600 + 20 + 4 = 624.'
  },
  {
    id: 'mul1-q26',
    level: 3,
    questionTypeBadge: 'Összehasonlítás',
    figure: <CardsQ cards={['210 · 4', '310 · 2']} mid="?" w={84} />,
    question: 'Melyik szorzat a nagyobb?',
    options: ['210 · 4', '310 · 2', 'egyenlők', 'nem lehet tudni'],
    correctAnswer: 0,
    explanation: '210 · 4 = 840 és 310 · 2 = 620. A 840 a nagyobb.'
  },
  {
    id: 'mul1-q27',
    level: 3,
    questionTypeBadge: 'Szorzólánc',
    figure: <ChainQ vals={['70', '140', '420']} ops={['· 2', '· 3']} under="· ?" />,
    question: 'A 70-ből 420 lett. Hányszorosára nőtt összesen?',
    options: ['6', '5', '2', '3'],
    correctAnswer: 0,
    explanation: 'Előbb 2-vel, aztán 3-mal szoroztunk. 2 · 3 = 6. Valóban: 70 · 6 = 420.'
  },
  {
    id: 'mul1-q28',
    level: 3,
    questionTypeBadge: 'Gondoltam egy számot',
    question: 'Gondoltam egy számot. Megszoroztam 3-mal, és 450 lett. Melyik számra gondoltam?',
    options: ['150', '140', '160', '453'],
    correctAnswer: 0,
    explanation: 'Próbáld ki: 150 · 3 = 450. (140 · 3 = 420, 160 · 3 = 480.)'
  },
  {
    id: 'mul1-q29',
    level: 3,
    questionTypeBadge: 'Számkártyák',
    figure: <CardsQ cards={['2', '4', '0']} />,
    question: 'Rakd ki a kártyákból a legnagyobb, 0-ra végződő háromjegyű számot! Szorozd meg 2-vel! Mennyi lett?',
    options: ['840', '480', '820', '880'],
    correctAnswer: 0,
    explanation: 'A legnagyobb ilyen szám a 420. 420 · 2 = 840.'
  },
  {
    id: 'mul1-q30',
    level: 3,
    questionTypeBadge: 'Igaz-e?',
    question: 'Melyik szám van 120 · 4 és 210 · 3 között?',
    options: ['500', '470', '640', '480'],
    correctAnswer: 0,
    explanation: '120 · 4 = 480 és 210 · 3 = 630. Közöttük van az 500. A 480 nem jó, mert az pont egyenlő.'
  }
];

export const MulOneDigitG3Quiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => (
  <QuizTemplate
    grade={3}
    chapterId="irasbeli-szorzas"
    topicId="g3-wmul-egyjegyu-quiz"
    subtopicId="szorzas-egyjegyu-szammal"
    title="1. Szorzás egyjegyű számmal – Kvíz"
    subtitle="30 feladat 3 szinten: kerek tízesek szorzása pénzzel és tízesekkel, bontás, felcserélés, szorzólánc, szöveges feladatok."
    badge="3. OSZTÁLY • XIII. ÍRÁSBELI SZORZÁS • KVÍZ"
    questions={MUL_ONE_DIGIT_G3_QUESTIONS}
    cheatSheets={[
      { title: 'Tízesekkel', items: ['120 = 12 tízes', '12 tízes · 3 = 36 tízes', '120 · 3 = 360'] },
      { title: 'Bontás', items: ['280 = 200 + 80', '200 · 2 = 400, 80 · 2 = 160', '400 + 160 = 560'] },
      { title: 'Jó tudni', items: ['4 · 120 = 120 · 4', '·2, aztán ·2 = ·4', '3 · 124 = 300 + 60 + 12'] }
    ]}
    onBack={onBack}
    onSwitchToTheory={onSwitchToTheory}
    onSwitchToMatcher={onSwitchToMatcher}
    onSwitchToSorter={onSwitchToSorter}
    initialGameMode={initialGameMode}
    matcherComponent={<MulOneDigitG3Matcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToSorter={onSwitchToSorter} />}
    sorterComponent={<MulOneDigitG3Sorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} onSwitchToQuiz={() => {}} onSwitchToMatcher={onSwitchToMatcher} />}
  />
);

export default MulOneDigitG3Quiz;
