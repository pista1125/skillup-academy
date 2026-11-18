import React from 'react';
import { QuizTemplate, QuizQuestion } from '../QuizTemplate';
import { RomanIntroG2Matcher } from './RomanIntroG2Matcher';
import { RomanIntroG2Sorter } from './RomanIntroG2Sorter';
import { StickQFig, ClockQFig, RomanBoardQFig, CompareQFig, RowQFig } from './RomanIntroG2Parts';

export const ROMAN_INTRO_G2_QUESTIONS: QuizQuestion[] = [
  // ---------------------------------------------------------------- 1. szint
  {
    id: 'rig2-q1',
    level: 1,
    questionTypeBadge: 'A V jel',
    figure: <StickQFig value="V" />,
    question: 'Mennyit ér a V jel?',
    options: ['5', '1', '10', '2'],
    correctAnswer: 0,
    explanation: 'A V jel 5-öt ér. Két pálcikából áll, de nem 2!'
  },
  {
    id: 'rig2-q2',
    level: 1,
    questionTypeBadge: 'Az X jel',
    figure: <StickQFig value="X" caption="Két pálcika keresztben" />,
    question: 'Mennyit ér az X jel?',
    options: ['10', '2', '5', '1'],
    correctAnswer: 0,
    explanation: 'Az X jel 10-et ér. A két pálcika nem 2-t jelent!'
  },
  {
    id: 'rig2-q3',
    level: 1,
    questionTypeBadge: 'Az I jel',
    question: 'Melyik jel ér 1-et?',
    options: ['I', 'V', 'X', 'II'],
    correctAnswer: 0,
    explanation: 'Az I jel 1-et ér. A II már 2.'
  },
  {
    id: 'rig2-q4',
    level: 1,
    questionTypeBadge: 'Pálcikák',
    figure: <StickQFig value="III" />,
    question: 'Mennyit ér ez a római szám?',
    options: ['3', '4', '2', '1'],
    correctAnswer: 0,
    explanation: 'Három I áll egymás mellett: 1 + 1 + 1 = 3.'
  },
  {
    id: 'rig2-q5',
    level: 1,
    questionTypeBadge: 'Az óra teteje',
    figure: <ClockQFig questionAt={[12]} />,
    question: 'Melyik római szám áll az óra tetején, a ? helyén?',
    options: ['XII', 'X', 'II', 'XI'],
    correctAnswer: 0,
    explanation: 'Az óra tetején a 12 áll. Rómaiul: XII = 10 + 1 + 1.'
  },
  {
    id: 'rig2-q6',
    level: 1,
    questionTypeBadge: 'Király neve',
    figure: <RomanBoardQFig label="IV. Béla" />,
    question: 'Hogyan mondjuk ki?',
    options: ['negyedik Béla', 'hatodik Béla', 'ötödik Béla', 'első Béla'],
    correctAnswer: 0,
    explanation: 'IV = 5 − 1 = 4. A pont miatt így mondjuk: negyedik Béla.'
  },
  {
    id: 'rig2-q7',
    level: 1,
    questionTypeBadge: 'Római vagy nem?',
    question: 'Melyik írás római szám?',
    options: ['VII', '7', 'hét', '77'],
    correctAnswer: 0,
    explanation: 'A VII római szám: 5 + 1 + 1 = 7. A 7 arab számjegy.'
  },
  {
    id: 'rig2-q8',
    level: 1,
    questionTypeBadge: 'Pálcikák',
    figure: <StickQFig value="II" />,
    question: 'Mennyit ér ez a római szám?',
    options: ['2', '11', '3', '1'],
    correctAnswer: 0,
    explanation: 'Két I egymás mellett: 1 + 1 = 2. Nem 11!'
  },
  {
    id: 'rig2-q9',
    level: 1,
    questionTypeBadge: 'Számold a pálcikát',
    figure: <StickQFig value="V" />,
    question: 'Hány pálcikából raktuk ki a V jelet?',
    options: ['2', '1', '5', '3'],
    correctAnswer: 0,
    explanation: 'A V két ferde pálcika, alul összeérnek. Az értéke 5, de csak 2 pálcika.'
  },
  {
    id: 'rig2-q10',
    level: 1,
    questionTypeBadge: 'Melyik jel?',
    question: 'Melyik jel ér 10-et?',
    options: ['X', 'V', 'I', 'XX'],
    correctAnswer: 0,
    explanation: 'Az X ér 10-et. Az XX már 20.'
  },

  // ---------------------------------------------------------------- 2. szint
  {
    id: 'rig2-q11',
    level: 2,
    questionTypeBadge: 'Jobbra hozzáad',
    figure: <StickQFig value="VI" />,
    question: 'Mennyi a VI?',
    options: ['6', '4', '7', '5'],
    correctAnswer: 0,
    explanation: 'Az I a V jobb oldalán áll. Hozzáadjuk: 5 + 1 = 6.'
  },
  {
    id: 'rig2-q12',
    level: 2,
    questionTypeBadge: 'Balra elvesz',
    figure: <RomanBoardQFig label="IV" />,
    question: 'Mennyi a IV?',
    options: ['4', '6', '3', '5'],
    correctAnswer: 0,
    explanation: 'Az I a V előtt, balra áll. Elvesszük: 5 − 1 = 4.'
  },
  {
    id: 'rig2-q13',
    level: 2,
    questionTypeBadge: 'Balra elvesz',
    figure: <RomanBoardQFig label="IX" />,
    question: 'Mennyi a IX?',
    options: ['9', '11', '8', '10'],
    correctAnswer: 0,
    explanation: 'Az I az X előtt áll. Elvesszük: 10 − 1 = 9.'
  },
  {
    id: 'rig2-q14',
    level: 2,
    questionTypeBadge: 'Jobbra hozzáad',
    figure: <RomanBoardQFig label="XI" />,
    question: 'Mennyi a XI?',
    options: ['11', '9', '12', '10'],
    correctAnswer: 0,
    explanation: 'Az I az X után áll. Hozzáadjuk: 10 + 1 = 11.'
  },
  {
    id: 'rig2-q15',
    level: 2,
    questionTypeBadge: 'Hibakereső',
    question: 'Melyik írás NEM jó?',
    options: ['IIII', 'III', 'IV', 'VI'],
    correctAnswer: 0,
    explanation: 'Négy egyforma jel nem állhat egymás mellett. A 4 így helyes: IV.'
  },
  {
    id: 'rig2-q16',
    level: 2,
    questionTypeBadge: 'Szabály',
    question: 'Legfeljebb hány egyforma jel állhat egymás mellett?',
    options: ['3', '4', '2', '5'],
    correctAnswer: 0,
    explanation: 'Legfeljebb 3: III jó, XX jó, de IIII nem jó.'
  },
  {
    id: 'rig2-q17',
    level: 2,
    questionTypeBadge: 'Mit csinálunk?',
    figure: <StickQFig value="VI" caption="Az I a V jobb oldalán" />,
    question: 'Az I jobbra áll. Mit csinálunk vele?',
    options: ['hozzáadjuk', 'elvesszük', 'nem számít', 'kétszer vesszük'],
    correctAnswer: 0,
    explanation: 'Jobbra hozzáadunk. Ezért VI = 5 + 1 = 6.'
  },
  {
    id: 'rig2-q18',
    level: 2,
    questionTypeBadge: 'Pálcikák',
    figure: <StickQFig value="VIII" />,
    question: 'Mennyit ér ez a római szám?',
    options: ['8', '7', '9', '3'],
    correctAnswer: 0,
    explanation: 'V és három I: 5 + 1 + 1 + 1 = 8.'
  },
  {
    id: 'rig2-q19',
    level: 2,
    questionTypeBadge: 'Írd rómaiul',
    question: 'Hogyan írjuk a 4-et római számmal?',
    options: ['IV', 'IIII', 'VI', 'IIV'],
    correctAnswer: 0,
    explanation: '4 = 5 − 1, ezért az I a V elé kerül: IV.'
  },
  {
    id: 'rig2-q20',
    level: 2,
    questionTypeBadge: 'Hányadik?',
    figure: <RomanBoardQFig label="XIII. kerület" />,
    question: 'Hányadik kerület ez?',
    options: ['tizenharmadik', 'harmadik', 'tizenegyedik', 'tizennegyedik'],
    correctAnswer: 0,
    explanation: 'XIII = 10 + 1 + 1 + 1 = 13. Ez a tizenharmadik kerület.'
  },

  // ---------------------------------------------------------------- 3. szint
  {
    id: 'rig2-q21',
    level: 3,
    questionTypeBadge: 'Pálcikaszámlálás',
    question: 'Hány pálcika kell a VII kirakásához?',
    options: ['4', '7', '3', '5'],
    correctAnswer: 0,
    explanation: 'A V 2 pálcika, és még két I: 2 + 1 + 1 = 4 pálcika.'
  },
  {
    id: 'rig2-q22',
    level: 3,
    questionTypeBadge: 'Összehasonlítás',
    figure: <CompareQFig left="IV" right="VI" />,
    question: 'Melyik jel kerül a ? helyére?',
    options: ['<', '>', '=', '+'],
    correctAnswer: 0,
    explanation: 'IV = 4 és VI = 6. A 4 kisebb, mint a 6: IV < VI.'
  },
  {
    id: 'rig2-q23',
    level: 3,
    questionTypeBadge: 'Új pálcika',
    figure: <StickQFig value="X" caption="Tegyél egy I-t az X elé!" />,
    question: 'Bence egy I-t tett az X elé, balra. Mennyi lett?',
    options: ['9', '11', '10', '1'],
    correctAnswer: 0,
    explanation: 'Az I balra került: IX = 10 − 1 = 9.'
  },
  {
    id: 'rig2-q24',
    level: 3,
    questionTypeBadge: 'Elveszünk egyet',
    figure: <StickQFig value="VII" caption="Vegyél el a végéről egy I-t!" />,
    question: 'Mennyi lesz, ha elveszed az utolsó I-t?',
    options: ['6', '8', '5', '7'],
    correctAnswer: 0,
    explanation: 'VII-ből VI lesz. VI = 5 + 1 = 6.'
  },
  {
    id: 'rig2-q25',
    level: 3,
    questionTypeBadge: 'Óra',
    figure: <ClockQFig hour={5} />,
    question: 'A piros kismutató egy római számra mutat. Hány órát mutat az óra?',
    options: ['5 órát', '4 órát', '6 órát', '12 órát'],
    correctAnswer: 0,
    explanation: 'A kismutató a V-re mutat, a nagymutató a XII-re. Ez 5 óra.'
  },
  {
    id: 'rig2-q26',
    level: 3,
    questionTypeBadge: 'Írd rómaiul',
    question: 'Melyik római szám ér 15-öt?',
    options: ['XV', 'VX', 'XIV', 'XVI'],
    correctAnswer: 0,
    explanation: '15 = 10 + 5. Elöl az X, utána jobbra a V: XV.'
  },
  {
    id: 'rig2-q27',
    level: 3,
    questionTypeBadge: 'Sorozat',
    figure: <RowQFig labels={['I', 'II', 'III', '?']} />,
    question: 'Melyik római szám jön a ? helyére?',
    options: ['IV', 'IIII', 'V', 'VI'],
    correctAnswer: 0,
    explanation: 'A 3 után a 4 jön. A 4 helyesen: IV (nem IIII!).'
  },
  {
    id: 'rig2-q28',
    level: 3,
    questionTypeBadge: 'Két egyforma jel',
    question: 'A 20-at két egyforma jellel írjuk. Melyik ez?',
    options: ['XX', 'VV', 'XV', 'II'],
    correctAnswer: 0,
    explanation: 'XX = 10 + 10 = 20. A VV nem jó írás.'
  },
  {
    id: 'rig2-q29',
    level: 3,
    questionTypeBadge: 'Hányadik?',
    figure: <RomanBoardQFig label="IX. fejezet" />,
    question: 'Zsófi a könyvében itt tart. Hányadik fejezet ez?',
    options: ['kilencedik', 'tizenegyedik', 'negyedik', 'tizedik'],
    correctAnswer: 0,
    explanation: 'IX = 10 − 1 = 9. Ez a kilencedik fejezet.'
  },
  {
    id: 'rig2-q30',
    level: 3,
    questionTypeBadge: 'Pálcika-áthelyezés',
    figure: <StickQFig value="IV" caption="Tedd át az I-t a V jobb oldalára!" />,
    question: 'Mennyi lesz a szám?',
    options: ['6', '4', '5', '3'],
    correctAnswer: 0,
    explanation: 'IV-ből VI lesz. Jobbra hozzáadunk: 5 + 1 = 6.'
  }
];

export const RomanIntroG2Quiz: React.FC<{
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToSorter?: () => void;
  initialGameMode?: 'quiz' | 'matcher' | 'sorter';
}> = ({ onBack, onSwitchToTheory, onSwitchToMatcher, onSwitchToSorter, initialGameMode = 'quiz' }) => (
  <QuizTemplate
    grade={2}
    chapterId="romai-szamok"
    topicId="g2-romai-ertelmezes-quiz"
    subtopicId="romai-szamok-ertelmezese"
    title="1. Római számok értelmezése – Kvíz"
    subtitle="30 feladat 3 szinten: az I, V, X jelek, hol látunk római számot, legfeljebb 3 egyforma jel, jobbra hozzáad, balra elvesz."
    badge="2. OSZTÁLY • VI. A RÓMAI SZÁMOK • KVÍZ"
    questions={ROMAN_INTRO_G2_QUESTIONS}
    cheatSheets={[
      {
        title: 'A három jel',
        items: ['I = 1', 'V = 5', 'X = 10', 'A 0-nak nincs római jele.']
      },
      {
        title: 'Két szabály',
        items: [
          'Legfeljebb 3 egyforma jel: III jó, IIII nem jó',
          'Jobbra hozzáad: VI = 5 + 1 = 6',
          'Balra elvesz: IV = 5 − 1 = 4',
          'Balra csak egy I állhat: IX = 9'
        ]
      },
      {
        title: 'Hol látunk ilyet?',
        items: ['Óra számlapja: XII felül', 'IV. Béla = negyedik Béla', 'III. fejezet = harmadik fejezet', 'II. emelet = második emelet']
      }
    ]}
    onBack={onBack}
    onSwitchToTheory={onSwitchToTheory}
    onSwitchToMatcher={onSwitchToMatcher}
    onSwitchToSorter={onSwitchToSorter}
    initialGameMode={initialGameMode}
    matcherComponent={
      <RomanIntroG2Matcher
        onBack={onBack}
        onSwitchToTheory={onSwitchToTheory}
        onSwitchToQuiz={() => {}}
        onSwitchToSorter={onSwitchToSorter}
      />
    }
    sorterComponent={
      <RomanIntroG2Sorter
        onBack={onBack}
        onSwitchToTheory={onSwitchToTheory}
        onSwitchToQuiz={() => {}}
        onSwitchToMatcher={onSwitchToMatcher}
      />
    }
  />
);

export default RomanIntroG2Quiz;
