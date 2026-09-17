import React from 'react';
import { QuizTemplate, Question, DifficultyLevel } from '../QuizTemplate';
import { FractionToDecimalMatcher } from './FractionToDecimalMatcher';
import { FractionToDecimalSorter } from './FractionToDecimalSorter';

export interface FractionToDecimalQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

export const fractionToDecimalQuestions: Record<DifficultyLevel, Question[]> = {
  // 1. SZINT: KÖNNYŰ (10 feladat) - Nevezetes törtek (kettedek, negyedek, ötödök, tizedek)
  1: [
    {
      id: 'q1-1',
      level: 1,
      question: 'Mennyi az 1/2 tizedes tört alakja?',
      options: ['0,5', '0,2', '0,05', '1,2'],
      correctAnswer: '0,5',
      explanation: 'Az 1/2 a fél, bővítve 5-tel 5/10 = 0,5.',
      steps: [
        { label: '1. Bővítés 10-re', value: '1/2 = 5/10' },
        { label: '2. Tizedes alak', value: '5/10 = 0,5' }
      ],
      hint: 'Gondolj a félre: 1 : 2 = 0,5!',
      formula: '1/2 = 5/10 = 0,5'
    },
    {
      id: 'q1-2',
      level: 1,
      question: 'Mennyi az 1/4 tizedes tört alakja?',
      options: ['0,25', '0,4', '0,04', '0,5'],
      correctAnswer: '0,25',
      explanation: 'A negyed (1/4) tizedes tört alakja 0,25 (100-ra bővítve 25/100).',
      steps: [
        { label: '1. Bővítés 100-ra', value: '1/4 = 25/100 (25-tel szorozva)' },
        { label: '2. Tizedes alak', value: '25/100 = 0,25' }
      ],
      hint: 'A negyed = 25 század = 0,25!',
      formula: '1/4 = 25/100 = 0,25'
    },
    {
      id: 'q1-3',
      level: 1,
      question: 'Mennyi a 3/4 tizedes tört alakja?',
      options: ['0,75', '0,34', '0,3', '0,43'],
      correctAnswer: '0,75',
      explanation: 'A háromnegyed (3/4) = 3 · 0,25 = 0,75 (vagy 75/100).',
      steps: [
        { label: '1. Bővítés 100-ra', value: '3/4 = (3 · 25)/(4 · 25) = 75/100' },
        { label: '2. Tizedes alak', value: '75/100 = 0,75' }
      ],
      hint: '3 darab 25 százados = 75 század!',
      formula: '3/4 = 75/100 = 0,75'
    },
    {
      id: 'q1-4',
      level: 1,
      question: 'Mennyi az 1/5 tizedes tört alakja?',
      options: ['0,2', '0,5', '0,15', '0,02'],
      correctAnswer: '0,2',
      explanation: 'Az 1/5 bővítve 2-vel 2/10 = 0,2.',
      steps: [
        { label: '1. Bővítés 10-re', value: '1/5 = (1 · 2)/(5 · 2) = 2/10' },
        { label: '2. Tizedes alak', value: '2/10 = 0,2' }
      ],
      hint: 'Bővítsd a nevezőt 10-re (szorozz 2-vel)!',
      formula: '1/5 = 2/10 = 0,2'
    },
    {
      id: 'q1-5',
      level: 1,
      question: 'Mennyi a 2/5 tizedes tört alakja?',
      options: ['0,4', '0,25', '0,2', '0,04'],
      correctAnswer: '0,4',
      explanation: 'A 2/5 bővítve 2-vel 4/10 = 0,4.',
      steps: [
        { label: '1. Bővítés 10-re', value: '2/5 = (2 · 2)/(5 · 2) = 4/10' },
        { label: '2. Tizedes alak', value: '4/10 = 0,4' }
      ],
      hint: '2 ötöd = 2 · 0,2 = 0,4!',
      formula: '2/5 = 4/10 = 0,4'
    },
    {
      id: 'q1-6',
      level: 1,
      question: 'Mennyi a 3/5 tizedes tört alakja?',
      options: ['0,6', '0,35', '0,3', '0,06'],
      correctAnswer: '0,6',
      explanation: 'A 3/5 bővítve 2-vel 6/10 = 0,6.',
      steps: [
        { label: '1. Bővítés 10-re', value: '3/5 = (3 · 2)/(5 · 2) = 6/10' },
        { label: '2. Tizedes alak', value: '6/10 = 0,6' }
      ],
      hint: '3 · 0,2 = 0,6 vagy 6 tized!',
      formula: '3/5 = 6/10 = 0,6'
    },
    {
      id: 'q1-7',
      level: 1,
      question: 'Mennyi a 4/5 tizedes tört alakja?',
      options: ['0,8', '0,45', '0,4', '0,08'],
      correctAnswer: '0,8',
      explanation: 'A 4/5 bővítve 2-vel 8/10 = 0,8.',
      steps: [
        { label: '1. Bővítés 10-re', value: '4/5 = 8/10' },
        { label: '2. Tizedes alak', value: '8/10 = 0,8' }
      ],
      hint: '4 · 0,2 = 0,8!',
      formula: '4/5 = 8/10 = 0,8'
    },
    {
      id: 'q1-8',
      level: 1,
      question: 'Írd fel tizedes tört alakban: 7/10 = ?',
      options: ['0,7', '7,0', '0,07', '0,70'],
      correctAnswer: '0,7',
      explanation: 'A 7 tized közvetlenül felírható: 0,7.',
      steps: [
        { label: '1. Helyi érték', value: '7 tized = a tizedesvessző utáni első helyen áll a 7-es' },
        { label: '2. Eredmény', value: '0,7' }
      ],
      hint: '7 tized = 0 egész 7 tized!',
      formula: '7/10 = 0,7'
    },
    {
      id: 'q1-9',
      level: 1,
      question: 'Írd fel tizedes tört alakban: 3/100 = ?',
      options: ['0,03', '0,3', '0,003', '3,00'],
      correctAnswer: '0,03',
      explanation: 'A 3 század a vessző utáni 2. helyi értéken áll: 0,03.',
      steps: [
        { label: '1. Helyi érték', value: '3 század = 2 tizedesjegy' },
        { label: '2. Tizedek helye', value: '0 tized és 3 század → 0,03' }
      ],
      hint: 'Századoknál 2 tizedesjegy van a vessző után!',
      formula: '3/100 = 0,03'
    },
    {
      id: 'q1-10',
      level: 1,
      question: 'Melyik közönséges tört egyenlő 0,1-gyel?',
      options: ['1/10', '1/100', '1/2', '1/5'],
      correctAnswer: '1/10',
      explanation: 'A 0,1 kiolvasva 1 tized, vagyis 1/10.',
      steps: [
        { label: '1. Kiolvasás', value: '0,1 = 1 tized' },
        { label: '2. Tört alak', value: '1/10' }
      ],
      hint: '0,1 = egy tized = 1/10!',
      formula: '0,1 = 1/10'
    }
  ],

  // 2. SZINT: KÖZEPES (10 feladat) - Nyolcadok, huszadok, huszonötödök, ötvenedek, vegyes törtek
  2: [
    {
      id: 'q2-1',
      level: 2,
      question: 'Mennyi az 1/8 tizedes tört alakja?',
      options: ['0,125', '0,8', '0,08', '0,18'],
      correctAnswer: '0,125',
      explanation: 'Az 1/8-at 125-tel bővítjük 1000-re: 125/1000 = 0,125.',
      steps: [
        { label: '1. Bővítés 1000-re', value: '1/8 = (1 · 125)/(8 · 125) = 125/1000' },
        { label: '2. Tizedes alak', value: '125/1000 = 0,125' }
      ],
      hint: 'A 8-at 125-tel szorozva kapunk 1000-et!',
      formula: '1/8 = 125/1000 = 0,125'
    },
    {
      id: 'q2-2',
      level: 2,
      question: 'Mennyi a 3/8 tizedes tört alakja?',
      options: ['0,375', '0,38', '0,125', '0,35'],
      correctAnswer: '0,375',
      explanation: 'A 3/8 = 3 · 0,125 = 0,375 (bővítve 375/1000).',
      steps: [
        { label: '1. Bővítés 125-tel', value: '3 · 125 = 375' },
        { label: '2. Tizedes alak', value: '375/1000 = 0,375' }
      ],
      hint: '3 · 125 ezred = 375 ezred!',
      formula: '3/8 = 375/1000 = 0,375'
    },
    {
      id: 'q2-3',
      level: 2,
      question: 'Mennyi a 5/8 tizedes tört alakja?',
      options: ['0,625', '0,58', '0,525', '0,65'],
      correctAnswer: '0,625',
      explanation: 'Az 5/8 = 5 · 0,125 = 0,625 (vagy 625/1000).',
      steps: [
        { label: '1. Számolás', value: '5 · 125 = 625' },
        { label: '2. Tizedes alak', value: '625/1000 = 0,625' }
      ],
      hint: '5 · 125 = 625!',
      formula: '5/8 = 625/1000 = 0,625'
    },
    {
      id: 'q2-4',
      level: 2,
      question: 'Mennyi a 7/8 tizedes tört alakja?',
      options: ['0,875', '0,78', '0,85', '0,775'],
      correctAnswer: '0,875',
      explanation: 'A 7/8 = 7 · 0,125 = 0,875 (vagy 1 - 0,125 = 0,875).',
      steps: [
        { label: '1. Számolás', value: '7 · 125 = 875' },
        { label: '2. Tizedes alak', value: '875/1000 = 0,875' }
      ],
      hint: '1 egészből vegyél el 1/8-ot (0,125-öt): 1 - 0,125 = 0,875!',
      formula: '7/8 = 875/1000 = 0,875'
    },
    {
      id: 'q2-5',
      level: 2,
      question: 'Mennyi a 7/20 tizedes tört alakja?',
      options: ['0,35', '0,7', '0,035', '0,14'],
      correctAnswer: '0,35',
      explanation: 'A 20-as nevezőt 5-tel bővítjük 100-ra: 7 · 5 = 35, így 35/100 = 0,35.',
      steps: [
        { label: '1. Bővítés 5-tel', value: '7/20 = (7 · 5)/(20 · 5) = 35/100' },
        { label: '2. Tizedes alak', value: '35/100 = 0,35' }
      ],
      hint: 'Bővíts 5-tel, hogy a nevező 100 legyen!',
      formula: '7/20 = 35/100 = 0,35'
    },
    {
      id: 'q2-6',
      level: 2,
      question: 'Mennyi a 9/25 tizedes tört alakja?',
      options: ['0,36', '0,9', '0,45', '0,09'],
      correctAnswer: '0,36',
      explanation: 'A 25-öt 4-gyel szorozva 100-at kapunk: 9 · 4 = 36, tehát 36/100 = 0,36.',
      steps: [
        { label: '1. Bővítés 4-gyel', value: '9/25 = (9 · 4)/(25 · 4) = 36/100' },
        { label: '2. Tizedes alak', value: '36/100 = 0,36' }
      ],
      hint: 'Bővítsd a 25-öt 4-gyel!',
      formula: '9/25 = 36/100 = 0,36'
    },
    {
      id: 'q2-7',
      level: 2,
      question: 'Mennyi a 3/50 tizedes tört alakja?',
      options: ['0,06', '0,6', '0,15', '0,006'],
      correctAnswer: '0,06',
      explanation: 'Az 50-et 2-vel bővítve: 3 · 2 = 6, 6/100 = 0,06.',
      steps: [
        { label: '1. Bővítés 2-vel', value: '3/50 = 6/100' },
        { label: '2. Tizedes alak', value: '6/100 = 0,06' }
      ],
      hint: '6 század = 0,06 (nem 0,6)!',
      formula: '3/50 = 6/100 = 0,06'
    },
    {
      id: 'q2-8',
      level: 2,
      question: 'Írd fel tizedes tört alakban az 1 egész 1/2-et!',
      options: ['1,5', '1,2', '1,05', '0,15'],
      correctAnswer: '1,5',
      explanation: 'Az 1 egész megmarad egésznek, az 1/2 pedig 0,5: 1 + 0,5 = 1,5.',
      steps: [
        { label: '1. Egész rész', value: '1' },
        { label: '2. Tört rész', value: '1/2 = 0,5' },
        { label: '3. Összeg', value: '1 + 0,5 = 1,5' }
      ],
      hint: '1 egész és egy fél = másfél = 1,5!',
      formula: '1 1/2 = 1,5'
    },
    {
      id: 'q2-9',
      level: 2,
      question: 'Írd fel tizedes tört alakban: 2 egész 3/4 = ?',
      options: ['2,75', '2,34', '2,5', '2,43'],
      correctAnswer: '2,75',
      explanation: 'A 2 egészhez hozzáadjuk a 3/4-et (0,75): 2 + 0,75 = 2,75.',
      steps: [
        { label: '1. Egész rész', value: '2' },
        { label: '2. Tört rész', value: '3/4 = 0,75' },
        { label: '3. Összeg', value: '2,75' }
      ],
      hint: '2 egész + 75 század = 2,75!',
      formula: '2 3/4 = 2,75'
    },
    {
      id: 'q2-10',
      level: 2,
      question: 'Írd fel tizedes törtként: 13/1000 = ?',
      options: ['0,013', '0,13', '0,0013', '1,300'],
      correctAnswer: '0,013',
      explanation: '13 ezrednél 3 tizedesjegynek kell lennie: 0,013.',
      steps: [
        { label: '1. Ezredes helyi érték', value: '3 tizedesjegy szükséges' },
        { label: '2. Nulla pótlása', value: '0 tized, 1 század, 3 ezred → 0,013' }
      ],
      hint: '1000-ben 3 nulla van, ezért 3 jegy van a vessző után!',
      formula: '13/1000 = 0,013'
    }
  ],

  // 3. SZINT: NEHÉZ / HALADÓ (10 feladat) - Áltörtek, írásbeli osztás, vegyes műveletek és szöveges feladatok
  3: [
    {
      id: 'q3-1',
      level: 3,
      question: 'Mennyi az 5/4 tizedes tört alakja?',
      options: ['1,25', '1,4', '0,54', '1,5'],
      correctAnswer: '1,25',
      explanation: '5/4 = 1 egész 1/4 = 1 + 0,25 = 1,25 (vagy 5 · 25 / 100 = 125/100 = 1,25).',
      steps: [
        { label: '1. Vegyes tört alak', value: '5/4 = 1 egész 1/4' },
        { label: '2. Tizedes alak', value: '1 + 0,25 = 1,25' }
      ],
      hint: '5 negyed az 1 egész és még 1 negyed!',
      formula: '5/4 = 125/100 = 1,25'
    },
    {
      id: 'q3-2',
      level: 3,
      question: 'Mennyi a 13/20 tizedes tört alakja?',
      options: ['0,65', '0,13', '0,26', '0,60'],
      correctAnswer: '0,65',
      explanation: '5-tel bővítve: 13 · 5 = 65, 20 · 5 = 100, tehát 65/100 = 0,65.',
      steps: [
        { label: '1. Bővítés 5-tel', value: '13 · 5 = 65' },
        { label: '2. Tört alak', value: '65/100' },
        { label: '3. Tizedes alak', value: '0,65' }
      ],
      hint: '13 · 5 = 65, a nevező 100.',
      formula: '13/20 = 65/100 = 0,65'
    },
    {
      id: 'q3-3',
      level: 3,
      question: 'Mennyi a 17/25 tizedes tört alakja?',
      options: ['0,68', '0,17', '0,34', '0,85'],
      correctAnswer: '0,68',
      explanation: '4-gyel bővítve: 17 · 4 = 68, 25 · 4 = 100 → 68/100 = 0,68.',
      steps: [
        { label: '1. Bővítés 4-gyel', value: '17 · 4 = 68' },
        { label: '2. Tizedes alak', value: '68/100 = 0,68' }
      ],
      hint: 'Szorozd a számlálót 4-gyel: 17 · 4 = 68!',
      formula: '17/25 = 68/100 = 0,68'
    },
    {
      id: 'q3-4',
      level: 3,
      question: 'Számítsd ki írásbeli osztással: 3 : 8 = ?',
      options: ['0,375', '0,38', '0,35', '0,425'],
      correctAnswer: '0,375',
      explanation: '3 : 8 = 0, marad 3 → 30 : 8 = 3, marad 6 → 60 : 8 = 7, marad 4 → 40 : 8 = 5, marad 0. Eredmény: 0,375.',
      steps: [
        { label: '1. Egész osztása', value: '3 : 8 = 0, marad 3' },
        { label: '2. Tizedek', value: '30 : 8 = 3, marad 6' },
        { label: '3. Századok', value: '60 : 8 = 7, marad 4' },
        { label: '4. Ezredek', value: '40 : 8 = 5, marad 0' }
      ],
      hint: 'Írj nullákat a 3 mögé: 3,000 : 8!',
      formula: '3 : 8 = 0,375'
    },
    {
      id: 'q3-5',
      level: 3,
      question: 'Számítsd ki: 1/2 + 0,35 = ?',
      options: ['0,85', '0,4', '0,55', '0,37'],
      correctAnswer: '0,85',
      explanation: '1/2 = 0,5, így 0,5 + 0,35 = 0,85.',
      steps: [
        { label: '1. Átváltás', value: '1/2 = 0,50' },
        { label: '2. Összeadás', value: '0,50 + 0,35 = 0,85' }
      ],
      hint: 'Váltsd át az 1/2-et 0,5-re, és add össze őket!',
      formula: '1/2 + 0,35 = 0,50 + 0,35 = 0,85'
    },
    {
      id: 'q3-6',
      level: 3,
      question: 'Számítsd ki: 3/4 - 0,2 = ?',
      options: ['0,55', '0,25', '0,73', '0,14'],
      correctAnswer: '0,55',
      explanation: '3/4 = 0,75, így 0,75 - 0,2 = 0,55.',
      steps: [
        { label: '1. Átváltás', value: '3/4 = 0,75' },
        { label: '2. Kivonás', value: '0,75 - 0,20 = 0,55' }
      ],
      hint: '3/4 = 0,75. Mennyi 0,75 - 0,20?',
      formula: '3/4 - 0,2 = 0,75 - 0,20 = 0,55'
    },
    {
      id: 'q3-7',
      level: 3,
      question: 'Számítsd ki tizedes tört alakban: 1/4 + 2/5 = ?',
      options: ['0,65', '0,39', '0,7', '0,55'],
      correctAnswer: '0,65',
      explanation: '1/4 = 0,25 és 2/5 = 0,4. Összegük: 0,25 + 0,40 = 0,65.',
      steps: [
        { label: '1. Első tört', value: '1/4 = 0,25' },
        { label: '2. Második tört', value: '2/5 = 0,40' },
        { label: '3. Összeg', value: '0,25 + 0,40 = 0,65' }
      ],
      hint: '1/4 = 0,25 és 2/5 = 0,40!',
      formula: '1/4 + 2/5 = 0,25 + 0,40 = 0,65'
    },
    {
      id: 'q3-8',
      level: 3,
      question: 'Melyik állítás igaz az alábbiak közül?',
      options: ['3/5 > 0,58', '3/5 < 0,58', '3/5 = 0,58', '3/5 = 0,35'],
      correctAnswer: '3/5 > 0,58',
      explanation: '3/5 = 0,6 = 0,60. Mivel 0,60 > 0,58, ezért 3/5 > 0,58.',
      steps: [
        { label: '1. Átváltás', value: '3/5 = 0,60' },
        { label: '2. Összehasonlítás', value: '0,60 > 0,58' }
      ],
      hint: '3/5 = 0,60, hasonlítsd össze 0,58-cal!',
      formula: '3/5 = 0,60 > 0,58'
    },
    {
      id: 'q3-9',
      level: 3,
      question: 'Egy 2 méteres szalagból levágtunk 3/4 métert. Hány méter szalag maradt?',
      options: ['1,25 m', '1,75 m', '1,5 m', '0,75 m'],
      correctAnswer: '1,25 m',
      explanation: '3/4 m = 0,75 m. A maradvány: 2 - 0,75 = 1,25 m.',
      steps: [
        { label: '1. Átváltás', value: '3/4 m = 0,75 m' },
        { label: '2. Kivonás', value: '2,00 - 0,75 = 1,25 m' }
      ],
      hint: '2 egészből vonj ki 0,75-öt!',
      formula: '2 - 3/4 = 2,00 - 0,75 = 1,25 m'
    },
    {
      id: 'q3-10',
      level: 3,
      question: 'Anna reggel 1/5 liter, este 0,45 liter tejet ivott. Összesen hány litert ivott?',
      options: ['0,65 liter', '0,5 liter', '0,7 liter', '0,47 liter'],
      correctAnswer: '0,65 liter',
      explanation: '1/5 liter = 0,2 liter = 0,20 liter. Összesen: 0,20 + 0,45 = 0,65 liter.',
      steps: [
        { label: '1. Reggeli mennyiség', value: '1/5 = 0,20 liter' },
        { label: '2. Esti mennyiség', value: '0,45 liter' },
        { label: '3. Összesen', value: '0,20 + 0,45 = 0,65 liter' }
      ],
      hint: '1/5 = 0,20 liter. Add hozzá a 0,45 litert!',
      formula: '1/5 + 0,45 = 0,20 + 0,45 = 0,65'
    }
  ]
};

export const FractionToDecimalQuiz: React.FC<FractionToDecimalQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      topicId="g5-fraction-to-decimal-quiz"
      title="Közönséges törtek tizedes tört alakja kvíz"
      subtitle="Gyakorold a törtek tizedes alakba váltását három nehézségi szinten!"
      questions={fractionToDecimalQuestions}
      themeColor="purple"
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      renderMatcher={(matcherProps) => (
        <FractionToDecimalMatcher
          {...matcherProps}
          onBack={matcherProps.onBack}
          onSwitchToQuiz={matcherProps.onSwitchToQuiz}
          onSwitchToSorter={matcherProps.onSwitchToSorter}
          onSwitchToTheory={onSwitchToTheory}
        />
      )}
      renderSorter={(sorterProps) => (
        <FractionToDecimalSorter
          {...sorterProps}
          onBack={sorterProps.onBack}
          onSwitchToQuiz={sorterProps.onSwitchToQuiz}
          onSwitchToMatcher={sorterProps.onSwitchToMatcher}
          onSwitchToTheory={onSwitchToTheory}
        />
      )}
    />
  );
};
export default FractionToDecimalQuiz;
