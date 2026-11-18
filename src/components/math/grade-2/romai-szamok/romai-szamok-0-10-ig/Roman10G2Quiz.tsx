import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { Roman10G2Matcher } from './Roman10G2Matcher';
import { Roman10G2Sorter } from './Roman10G2Sorter';
import {
  StickQFig,
  ClockQFig,
  RomanBoardQFig,
  CompareQFig,
  RowQFig,
  LineQFig
} from '../romai-szamok-ertelmezese/RomanIntroG2Parts';

export const ROMAN10_G2_QUESTIONS: QuizQuestion[] = [
  // ---------------------------------------------------------------- 1. szint
  {
    id: 'r10g2-q1',
    level: 1,
    questionTypeBadge: 'Olvasd ki!',
    figure: <RomanBoardQFig label="III" />,
    question: 'Melyik szám ez?',
    options: ['3', '2', '4', '1'],
    correctAnswer: 0,
    explanation: 'Három I áll egymás mellett: 1 + 1 + 1 = 3.'
  },
  {
    id: 'r10g2-q2',
    level: 1,
    questionTypeBadge: 'Pálcikák',
    figure: <StickQFig value="VII" />,
    question: 'Melyik számot raktuk ki?',
    options: ['7', '6', '8', '3'],
    correctAnswer: 0,
    explanation: 'V és két I: 5 + 1 + 1 = 7.'
  },
  {
    id: 'r10g2-q3',
    level: 1,
    questionTypeBadge: 'Írd rómaiul',
    question: 'Hogyan írjuk a 2-t római számmal?',
    options: ['II', 'V', 'III', 'XI'],
    correctAnswer: 0,
    explanation: 'Két I egymás mellett: II = 1 + 1 = 2.'
  },
  {
    id: 'r10g2-q4',
    level: 1,
    questionTypeBadge: 'Írd rómaiul',
    question: 'Hogyan írjuk a 6-ot római számmal?',
    options: ['VI', 'IV', 'VII', 'IIIIII'],
    correctAnswer: 0,
    explanation: '6 = 5 + 1. Elöl a V, utána jobbra az I: VI.'
  },
  {
    id: 'r10g2-q5',
    level: 1,
    questionTypeBadge: 'Sorozat',
    figure: <RowQFig labels={['I', 'II', '?', 'IV']} />,
    question: 'Melyik római szám hiányzik?',
    options: ['III', 'V', 'IIII', 'VI'],
    correctAnswer: 0,
    explanation: 'Az 1, 2 után a 3 jön: III.'
  },
  {
    id: 'r10g2-q6',
    level: 1,
    questionTypeBadge: 'Óra',
    figure: <ClockQFig hour={3} />,
    question: 'Hány órát mutat az óra?',
    options: ['3 órát', '9 órát', '12 órát', '4 órát'],
    correctAnswer: 0,
    explanation: 'A piros kismutató a III-ra mutat, a nagymutató a XII-n áll. Ez 3 óra.'
  },
  {
    id: 'r10g2-q7',
    level: 1,
    questionTypeBadge: 'Olvasd ki!',
    figure: <RomanBoardQFig label="X" />,
    question: 'Melyik szám ez?',
    options: ['10', '2', '5', '9'],
    correctAnswer: 0,
    explanation: 'Az X jel 10-et ér.'
  },
  {
    id: 'r10g2-q8',
    level: 1,
    questionTypeBadge: 'Számegyenes',
    figure: <LineQFig from={0} to={10} marks={[{ value: 5, label: '?' }]} />,
    question: 'Melyik római szám kerül a ? helyére?',
    options: ['V', 'IV', 'VI', 'X'],
    correctAnswer: 0,
    explanation: 'A nyíl az 5-re mutat. Az 5 rómaiul: V.'
  },
  {
    id: 'r10g2-q9',
    level: 1,
    questionTypeBadge: 'Olvasd ki!',
    question: 'Melyik szám a VIII?',
    options: ['8', '7', '9', '3'],
    correctAnswer: 0,
    explanation: 'V és három I: 5 + 3 = 8.'
  },
  {
    id: 'r10g2-q10',
    level: 1,
    questionTypeBadge: 'Írd rómaiul',
    question: 'Hogyan írjuk a 10-et római számmal?',
    options: ['X', 'IX', 'VV', 'XI'],
    correctAnswer: 0,
    explanation: 'A 10-nek saját jele van: X. A VV nem jó írás.'
  },

  // ---------------------------------------------------------------- 2. szint
  {
    id: 'r10g2-q11',
    level: 2,
    questionTypeBadge: 'A 9',
    question: 'Hogyan írjuk a 9-et római számmal?',
    options: ['IX', 'XI', 'VIIII', 'IIX'],
    correctAnswer: 0,
    explanation: '9 = 10 − 1. Az I az X elé, balra kerül: IX.'
  },
  {
    id: 'r10g2-q12',
    level: 2,
    questionTypeBadge: 'Összehasonlítás',
    figure: <CompareQFig left="VII" right="IX" />,
    question: 'Melyik jel kerül a ? helyére?',
    options: ['<', '>', '=', '−'],
    correctAnswer: 0,
    explanation: 'VII = 7 és IX = 9. A 7 kisebb, mint a 9: VII < IX.'
  },
  {
    id: 'r10g2-q13',
    level: 2,
    questionTypeBadge: 'Összehasonlítás',
    figure: <CompareQFig left="VIII" right="VI" />,
    question: 'Melyik jel kerül a ? helyére?',
    options: ['>', '<', '=', '+'],
    correctAnswer: 0,
    explanation: 'VIII = 8 és VI = 6. A 8 nagyobb, mint a 6: VIII > VI.'
  },
  {
    id: 'r10g2-q14',
    level: 2,
    questionTypeBadge: 'Szomszéd',
    figure: <RowQFig labels={['V', 'VI', '?']} />,
    question: 'Melyik szám jön a VI után?',
    options: ['VII', 'VIII', 'IV', 'X'],
    correctAnswer: 0,
    explanation: 'A 6 után a 7 jön: VII = 5 + 2.'
  },
  {
    id: 'r10g2-q15',
    level: 2,
    questionTypeBadge: 'Szomszéd',
    figure: <RowQFig labels={['?', 'IV', 'V']} />,
    question: 'Melyik szám áll a IV előtt?',
    options: ['III', 'V', 'VI', 'II'],
    correctAnswer: 0,
    explanation: 'IV = 4. A 4 előtt a 3 áll: III.'
  },
  {
    id: 'r10g2-q16',
    level: 2,
    questionTypeBadge: 'Óra',
    figure: <ClockQFig hour={8} />,
    question: 'Hány órát mutat az óra?',
    options: ['8 órát', '4 órát', '7 órát', '9 órát'],
    correctAnswer: 0,
    explanation: 'A kismutató a VIII-ra mutat: 5 + 3 = 8. Ez 8 óra.'
  },
  {
    id: 'r10g2-q17',
    level: 2,
    questionTypeBadge: 'Óra',
    figure: <ClockQFig hour={9} />,
    question: 'Hány órát mutat az óra?',
    options: ['9 órát', '11 órát', '3 órát', '10 órát'],
    correctAnswer: 0,
    explanation: 'A kismutató a IX-re mutat: 10 − 1 = 9. Ez 9 óra.'
  },
  {
    id: 'r10g2-q18',
    level: 2,
    questionTypeBadge: 'Legnagyobb',
    question: 'Melyik a legnagyobb szám?',
    options: ['IX', 'VIII', 'VII', 'VI'],
    correctAnswer: 0,
    explanation: 'IX = 9, VIII = 8, VII = 7, VI = 6. A legnagyobb a 9. Nem a jelek száma számít!'
  },
  {
    id: 'r10g2-q19',
    level: 2,
    questionTypeBadge: 'Számegyenes',
    figure: <LineQFig from={0} to={10} marks={[{ value: 7, label: '?' }]} />,
    question: 'Melyik római szám kerül a ? helyére?',
    options: ['VII', 'VI', 'VIII', 'IX'],
    correctAnswer: 0,
    explanation: 'A nyíl a 7-re mutat. 7 = 5 + 2, rómaiul VII.'
  },
  {
    id: 'r10g2-q20',
    level: 2,
    questionTypeBadge: 'Jelek száma',
    question: 'Hány I jel van a VIII-ban?',
    options: ['3', '8', '2', '4'],
    correctAnswer: 0,
    explanation: 'VIII = V + I + I + I. Három I jel van benne.'
  },

  // ---------------------------------------------------------------- 3. szint
  {
    id: 'r10g2-q21',
    level: 3,
    questionTypeBadge: 'Sorba rendezés',
    figure: <RowQFig labels={['VII', 'IV', 'IX']} />,
    question: 'Melyik a jó sorrend a legkisebbtől a legnagyobbig?',
    options: ['IV, VII, IX', 'IX, VII, IV', 'VII, IV, IX', 'IV, IX, VII'],
    correctAnswer: 0,
    explanation: 'IV = 4, VII = 7, IX = 9. Növekvő sorrend: 4, 7, 9.'
  },
  {
    id: 'r10g2-q22',
    level: 3,
    questionTypeBadge: 'Óra',
    figure: <ClockQFig hour={5} />,
    question: 'Most ennyi óra van. 3 óra múlva hány óra lesz?',
    options: ['VIII', 'VII', 'II', 'IX'],
    correctAnswer: 0,
    explanation: 'Most 5 óra van. 5 + 3 = 8. Rómaiul: VIII.'
  },
  {
    id: 'r10g2-q23',
    level: 3,
    questionTypeBadge: 'Középen',
    figure: <RowQFig labels={['VI', '?', 'VIII']} />,
    question: 'Melyik szám van a VI és a VIII között?',
    options: ['VII', 'IX', 'V', 'IV'],
    correctAnswer: 0,
    explanation: 'A 6 és a 8 között a 7 van: VII.'
  },
  {
    id: 'r10g2-q24',
    level: 3,
    questionTypeBadge: 'Számolj!',
    figure: <RomanBoardQFig label="VI + III" caption="Írd át, aztán add össze!" />,
    question: 'Mennyi az eredmény?',
    options: ['9', '8', '10', '3'],
    correctAnswer: 0,
    explanation: 'VI = 6, III = 3. 6 + 3 = 9.'
  },
  {
    id: 'r10g2-q25',
    level: 3,
    questionTypeBadge: 'Számolj!',
    figure: <RomanBoardQFig label="X − IV" caption="Írd át, aztán vond ki!" />,
    question: 'Mennyi az eredmény?',
    options: ['6', '14', '5', '4'],
    correctAnswer: 0,
    explanation: 'X = 10, IV = 4. 10 − 4 = 6.'
  },
  {
    id: 'r10g2-q26',
    level: 3,
    questionTypeBadge: 'Hibakereső',
    question: 'Melyik írás hibás?',
    options: ['VIIII', 'VIII', 'IX', 'VII'],
    correctAnswer: 0,
    explanation: 'VIIII-ben négy I áll egymás mellett. Ez nem jó. A 9 helyesen: IX.'
  },
  {
    id: 'r10g2-q27',
    level: 3,
    questionTypeBadge: 'Lift',
    figure: <RomanBoardQFig label="III. emelet" />,
    question: 'A lift itt áll. Még 4 emeletet megy fel. Melyik emeleten áll meg?',
    options: ['VII.', 'VI.', 'VIII.', 'I.'],
    correctAnswer: 0,
    explanation: 'III = 3. 3 + 4 = 7. A VII. emeleten áll meg.'
  },
  {
    id: 'r10g2-q28',
    level: 3,
    questionTypeBadge: 'Pálcikaszámlálás',
    question: 'Hány pálcika kell a IX kirakásához?',
    options: ['3', '9', '2', '4'],
    correctAnswer: 0,
    explanation: 'Az I 1 pálcika, az X 2 pálcika: 1 + 2 = 3.'
  },
  {
    id: 'r10g2-q29',
    level: 3,
    questionTypeBadge: 'Szabály',
    figure: <RowQFig labels={['II', 'IV', 'VI', '?', 'X']} />,
    question: 'Melyik szám hiányzik a sorból?',
    options: ['VIII', 'VII', 'IX', 'IIX'],
    correctAnswer: 0,
    explanation: '2, 4, 6, … mindig 2-vel nő. 6 + 2 = 8: VIII.'
  },
  {
    id: 'r10g2-q30',
    level: 3,
    questionTypeBadge: 'Igaz vagy hamis?',
    question: 'Melyik állítás igaz?',
    options: ['IV < VI', 'IX < VII', 'V > VIII', 'X < IX'],
    correctAnswer: 0,
    explanation: 'IV = 4, VI = 6, és 4 < 6. A többi hamis: 9 > 7, 5 < 8, 10 > 9.'
  }
];

export const Roman10G2Quiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => (
  <QuizTemplate
    grade={2}
    chapterId="romai-szamok"
    topicId="g2-romai-10-quiz"
    subtopicId="romai-szamok-0-10-ig"
    title="2. Római számok 1-től 10-ig – Kvíz"
    subtitle="30 feladat 3 szinten: olvasás és írás 1-től 10-ig, a 4 és a 9, sorrend, összehasonlítás, római óra."
    badge="2. OSZTÁLY • VI. A RÓMAI SZÁMOK • KVÍZ"
    questions={ROMAN10_G2_QUESTIONS}
    cheatSheets={[
      {
        title: 'A sor 1-től 10-ig',
        items: ['I, II, III', 'IV = 5 − 1', 'V, VI, VII, VIII', 'IX = 10 − 1, X']
      },
      {
        title: 'Összehasonlítás',
        items: ['Előbb írd át arab számmá!', 'VIII < IX, mert 8 < 9', 'Nem a jelek száma számít', 'A VI szomszédai: V és VII']
      },
      {
        title: 'Római óra',
        items: ['Nagymutató a XII-n: egész óra', 'A kismutató mutatja az órát', 'VII-re mutat: 7 óra', 'Néha IIII áll a IV helyett']
      }
    ]}
    onBack={onBack}
    onSwitchToTheory={onSwitchToTheory}
    onSwitchToMatcher={onSwitchToMatcher}
    onSwitchToSorter={onSwitchToSorter}
    initialGameMode={initialGameMode}
    matcherComponent={
      <Roman10G2Matcher
        onBack={onBack}
        onSwitchToTheory={onSwitchToTheory}
        onSwitchToQuiz={() => {}}
        onSwitchToSorter={onSwitchToSorter}
      />
    }
    sorterComponent={
      <Roman10G2Sorter
        onBack={onBack}
        onSwitchToTheory={onSwitchToTheory}
        onSwitchToQuiz={() => {}}
        onSwitchToMatcher={onSwitchToMatcher}
      />
    }
  />
);

export default Roman10G2Quiz;
