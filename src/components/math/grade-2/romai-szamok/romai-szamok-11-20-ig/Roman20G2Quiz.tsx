import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { Roman20G2Matcher } from './Roman20G2Matcher';
import { Roman20G2Sorter } from './Roman20G2Sorter';
import {
  StickQFig,
  ClockQFig,
  RomanBoardQFig,
  CompareQFig,
  RowQFig,
  LineQFig
} from '../romai-szamok-ertelmezese/RomanIntroG2Parts';

export const ROMAN20_G2_QUESTIONS: QuizQuestion[] = [
  // ---------------------------------------------------------------- 1. szint
  {
    id: 'r20g2-q1',
    level: 1,
    questionTypeBadge: 'Olvasd ki!',
    figure: <RomanBoardQFig label="XII" />,
    question: 'Melyik szám ez?',
    options: ['12', '11', '2', '13'],
    correctAnswer: 0,
    explanation: 'XII = X + II = 10 + 2 = 12.'
  },
  {
    id: 'r20g2-q2',
    level: 1,
    questionTypeBadge: 'Pálcikák',
    figure: <StickQFig value="XV" />,
    question: 'Melyik számot raktuk ki?',
    options: ['15', '5', '16', '14'],
    correctAnswer: 0,
    explanation: 'X és V: 10 + 5 = 15.'
  },
  {
    id: 'r20g2-q3',
    level: 1,
    questionTypeBadge: 'Írd rómaiul',
    question: 'Hogyan írjuk a 13-at római számmal?',
    options: ['XIII', 'IIIX', 'XII', 'XIV'],
    correctAnswer: 0,
    explanation: '13 = 10 + 3. Elöl az X, utána III: XIII.'
  },
  {
    id: 'r20g2-q4',
    level: 1,
    questionTypeBadge: 'Írd rómaiul',
    question: 'Hogyan írjuk a 16-ot római számmal?',
    options: ['XVI', 'XIV', 'VIX', 'XVII'],
    correctAnswer: 0,
    explanation: '16 = 10 + 6. X és VI: XVI.'
  },
  {
    id: 'r20g2-q5',
    level: 1,
    questionTypeBadge: 'Óra',
    figure: <ClockQFig hour={11} />,
    question: 'Hány órát mutat az óra?',
    options: ['11 órát', '9 órát', '1 órát', '12 órát'],
    correctAnswer: 0,
    explanation: 'A kismutató a XI-re mutat: 10 + 1 = 11. Ez 11 óra.'
  },
  {
    id: 'r20g2-q6',
    level: 1,
    questionTypeBadge: 'Sorozat',
    figure: <RowQFig labels={['XI', 'XII', '?', 'XIV']} />,
    question: 'Melyik római szám hiányzik?',
    options: ['XIII', 'XIIII', 'XV', 'III'],
    correctAnswer: 0,
    explanation: 'A 11 és a 12 után a 13 jön: XIII.'
  },
  {
    id: 'r20g2-q7',
    level: 1,
    questionTypeBadge: 'Olvasd ki!',
    figure: <RomanBoardQFig label="XVIII" />,
    question: 'Melyik szám ez?',
    options: ['18', '13', '17', '8'],
    correctAnswer: 0,
    explanation: 'X és VIII: 10 + 8 = 18.'
  },
  {
    id: 'r20g2-q8',
    level: 1,
    questionTypeBadge: 'X + egyesek',
    figure: <RomanBoardQFig label="XVII" caption="X és VII" />,
    question: 'Mennyi ez a szám?',
    options: ['17', '7', '16', '18'],
    correctAnswer: 0,
    explanation: 'X = 10 és VII = 7. 10 + 7 = 17.'
  },
  {
    id: 'r20g2-q9',
    level: 1,
    questionTypeBadge: 'Olvasd ki!',
    question: 'Melyik szám a XX?',
    options: ['20', '2', '10', '11'],
    correctAnswer: 0,
    explanation: 'Két X: 10 + 10 = 20.'
  },
  {
    id: 'r20g2-q10',
    level: 1,
    questionTypeBadge: 'Számegyenes',
    figure: <LineQFig marks={[{ value: 15, label: '?' }]} />,
    question: 'Melyik római szám kerül a ? helyére?',
    options: ['XV', 'XIV', 'XVI', 'V'],
    correctAnswer: 0,
    explanation: 'A nyíl a 15-re mutat. 15 = 10 + 5: XV.'
  },

  // ---------------------------------------------------------------- 2. szint
  {
    id: 'r20g2-q11',
    level: 2,
    questionTypeBadge: 'Írd rómaiul',
    question: 'Hogyan írjuk a 14-et római számmal?',
    options: ['XIV', 'XVI', 'XIIII', 'IVX'],
    correctAnswer: 0,
    explanation: '14 = 10 + 4. A 4 rómaiul IV. Együtt: XIV.'
  },
  {
    id: 'r20g2-q12',
    level: 2,
    questionTypeBadge: 'Olvasd ki!',
    figure: <RomanBoardQFig label="XIX" />,
    question: 'Melyik szám ez?',
    options: ['19', '11', '18', '9'],
    correctAnswer: 0,
    explanation: 'X és IX: 10 + 9 = 19.'
  },
  {
    id: 'r20g2-q13',
    level: 2,
    questionTypeBadge: 'Összehasonlítás',
    figure: <CompareQFig left="XIV" right="XVI" />,
    question: 'Melyik jel kerül a ? helyére?',
    options: ['<', '>', '=', '+'],
    correctAnswer: 0,
    explanation: 'XIV = 14 és XVI = 16. A 14 kisebb: XIV < XVI.'
  },
  {
    id: 'r20g2-q14',
    level: 2,
    questionTypeBadge: 'Összehasonlítás',
    figure: <CompareQFig left="XVII" right="XIII" />,
    question: 'Melyik jel kerül a ? helyére?',
    options: ['>', '<', '=', '−'],
    correctAnswer: 0,
    explanation: 'XVII = 17 és XIII = 13. A 17 nagyobb: XVII > XIII.'
  },
  {
    id: 'r20g2-q15',
    level: 2,
    questionTypeBadge: 'Középen',
    figure: <RowQFig labels={['XVII', '?', 'XIX']} />,
    question: 'Melyik szám hiányzik?',
    options: ['XVIII', 'XVI', 'XX', 'XIIX'],
    correctAnswer: 0,
    explanation: 'A 17 és a 19 között a 18 van: XVIII.'
  },
  {
    id: 'r20g2-q16',
    level: 2,
    questionTypeBadge: 'Óra',
    figure: <ClockQFig hour={12} />,
    question: 'Mindkét mutató felfelé áll. Hány órát mutat az óra?',
    options: ['12 órát', '11 órát', '6 órát', '1 órát'],
    correctAnswer: 0,
    explanation: 'A kismutató is a XII-re mutat. Ez 12 óra.'
  },
  {
    id: 'r20g2-q17',
    level: 2,
    questionTypeBadge: 'Legkisebb',
    question: 'Melyik a legkisebb szám?',
    options: ['XI', 'XIX', 'XIV', 'XVI'],
    correctAnswer: 0,
    explanation: 'XI = 11, XIX = 19, XIV = 14, XVI = 16. A legkisebb a 11.'
  },
  {
    id: 'r20g2-q18',
    level: 2,
    questionTypeBadge: 'Számegyenes',
    figure: <LineQFig marks={[{ value: 19, label: '?' }]} />,
    question: 'Melyik római szám kerül a ? helyére?',
    options: ['XIX', 'XVIII', 'XX', 'IXX'],
    correctAnswer: 0,
    explanation: 'A nyíl a 19-re mutat, egy hiányzik a 20-hoz. 19 = 10 + 9: XIX.'
  },
  {
    id: 'r20g2-q19',
    level: 2,
    questionTypeBadge: 'Szomszéd',
    question: 'Melyik szám áll közvetlenül a XX előtt?',
    options: ['XIX', 'XVIII', 'IXX', 'X'],
    correctAnswer: 0,
    explanation: 'A 20 előtt a 19 áll: XIX.'
  },
  {
    id: 'r20g2-q20',
    level: 2,
    questionTypeBadge: 'Minta',
    figure: <RowQFig labels={['VI', '→', 'XVI']} />,
    question: 'Melyik jelet tettük a VI elé, hogy XVI legyen?',
    options: ['X', 'I', 'V', 'XX'],
    correctAnswer: 0,
    explanation: 'Elé tettük az X-et: X + VI = 10 + 6 = 16.'
  },

  // ---------------------------------------------------------------- 3. szint
  {
    id: 'r20g2-q21',
    level: 3,
    questionTypeBadge: 'Sorba rendezés',
    figure: <RowQFig labels={['XV', 'XII', 'XIX', 'XI']} />,
    question: 'Melyik a jó sorrend a legkisebbtől a legnagyobbig?',
    options: ['XI, XII, XV, XIX', 'XIX, XV, XII, XI', 'XII, XI, XV, XIX', 'XI, XV, XII, XIX'],
    correctAnswer: 0,
    explanation: 'Írd át: 15, 12, 19, 11. Sorban: 11, 12, 15, 19.'
  },
  {
    id: 'r20g2-q22',
    level: 3,
    questionTypeBadge: 'Számolj!',
    figure: <RomanBoardQFig label="XII + V" caption="Írd át, aztán add össze!" />,
    question: 'Mennyi az eredmény?',
    options: ['17', '18', '7', '16'],
    correctAnswer: 0,
    explanation: 'XII = 12, V = 5. 12 + 5 = 17.'
  },
  {
    id: 'r20g2-q23',
    level: 3,
    questionTypeBadge: 'Számolj!',
    figure: <RomanBoardQFig label="XX − VI" caption="Írd át, aztán vond ki!" />,
    question: 'Mennyi az eredmény?',
    options: ['14', '16', '15', '4'],
    correctAnswer: 0,
    explanation: 'XX = 20, VI = 6. 20 − 6 = 14.'
  },
  {
    id: 'r20g2-q24',
    level: 3,
    questionTypeBadge: 'Hibakereső',
    question: 'Melyik írás hibás?',
    options: ['XIIII', 'XIV', 'XIII', 'XVI'],
    correctAnswer: 0,
    explanation: 'XIIII-ben négy I áll egymás mellett. A 14 helyesen: XIV.'
  },
  {
    id: 'r20g2-q25',
    level: 3,
    questionTypeBadge: 'Lapozz!',
    figure: <RomanBoardQFig label="XV. oldal" />,
    question: 'Ezt az oldalt nézed. Lapozz előre 3 oldalt! Hányadik oldalon vagy?',
    options: ['XVIII.', 'XII.', 'XVII.', 'XIX.'],
    correctAnswer: 0,
    explanation: 'XV = 15. 15 + 3 = 18. A XVIII. oldalon vagy.'
  },
  {
    id: 'r20g2-q26',
    level: 3,
    questionTypeBadge: 'Óra',
    figure: <ClockQFig hour={9} />,
    question: 'Most ennyi óra van. 3 óra múlva hány óra lesz?',
    options: ['XII', 'XI', 'VI', 'X'],
    correctAnswer: 0,
    explanation: 'Most 9 óra van. 9 + 3 = 12. Rómaiul: XII.'
  },
  {
    id: 'r20g2-q27',
    level: 3,
    questionTypeBadge: 'Szomszédok',
    figure: <LineQFig marks={[{ value: 14, label: 'XIV' }]} />,
    question: 'Melyik két szám között van a XIV?',
    options: ['XIII és XV', 'XII és XIV', 'XV és XVII', 'IV és VI'],
    correctAnswer: 0,
    explanation: 'XIV = 14. A 14 a 13 és a 15 között van: XIII és XV.'
  },
  {
    id: 'r20g2-q28',
    level: 3,
    questionTypeBadge: 'Igaz vagy hamis?',
    question: 'Melyik állítás igaz?',
    options: ['XIX > XVII', 'XI > XIV', 'XV < XII', 'XX < XIX'],
    correctAnswer: 0,
    explanation: 'XIX = 19 és XVII = 17. 19 > 17, ez igaz. A többi hamis.'
  },
  {
    id: 'r20g2-q29',
    level: 3,
    questionTypeBadge: 'Szabály',
    figure: <RowQFig labels={['X', 'XII', 'XIV', '?', 'XVIII']} />,
    question: 'Melyik szám hiányzik a sorból?',
    options: ['XVI', 'XV', 'XVII', 'XX'],
    correctAnswer: 0,
    explanation: '10, 12, 14, … mindig 2-vel nő. 14 + 2 = 16: XVI.'
  },
  {
    id: 'r20g2-q30',
    level: 3,
    questionTypeBadge: 'Fejtörő',
    question: 'Egy római szám így kezdődik: X. Utána IV áll. Melyik szám ez?',
    options: ['14', '16', '6', '15'],
    correctAnswer: 0,
    explanation: 'XIV = X + IV = 10 + 4 = 14.'
  }
];

export const Roman20G2Quiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => (
  <QuizTemplate
    grade={2}
    chapterId="romai-szamok"
    topicId="g2-romai-20-quiz"
    subtopicId="romai-szamok-11-20-ig"
    title="3. Római számok 11-től 20-ig – Kvíz"
    subtitle="30 feladat 3 szinten: X + az első tízes, olvasás és írás 11-től 20-ig, összehasonlítás, sorrend, számegyenes."
    badge="2. OSZTÁLY • VI. A RÓMAI SZÁMOK • KVÍZ"
    questions={ROMAN20_G2_QUESTIONS}
    cheatSheets={[
      {
        title: 'X + az első tízes',
        items: ['XI = 10 + 1', 'XIV = 10 + 4', 'XIX = 10 + 9', 'XX = 10 + 10']
      },
      {
        title: 'Összehasonlítás',
        items: ['Írd át arab számmá!', 'Ha mindkettő X-szel kezdődik, nézd a többit', 'XIV < XVI, mert IV < VI', 'Jobbra a számegyenesen = nagyobb']
      },
      {
        title: 'Számolás és óra',
        items: ['Előbb írd át: XII + V = 12 + 5 = 17', 'XX − VI = 20 − 6 = 14', 'Az óra tetején XII áll', 'A XI = 11 a XII mellett van']
      }
    ]}
    onBack={onBack}
    onSwitchToTheory={onSwitchToTheory}
    onSwitchToMatcher={onSwitchToMatcher}
    onSwitchToSorter={onSwitchToSorter}
    initialGameMode={initialGameMode}
    matcherComponent={
      <Roman20G2Matcher
        onBack={onBack}
        onSwitchToTheory={onSwitchToTheory}
        onSwitchToQuiz={() => {}}
        onSwitchToSorter={onSwitchToSorter}
      />
    }
    sorterComponent={
      <Roman20G2Sorter
        onBack={onBack}
        onSwitchToTheory={onSwitchToTheory}
        onSwitchToQuiz={() => {}}
        onSwitchToMatcher={onSwitchToMatcher}
      />
    }
  />
);

export default Roman20G2Quiz;
