import React from 'react';
import { QuizTemplate, Question, DifficultyLevel } from '../QuizTemplate';
import { DecimalMultiplicationMatcher } from './DecimalMultiplicationMatcher';
import { DecimalMultiplicationSorter } from './DecimalMultiplicationSorter';

export interface DecimalMultiplicationQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

export const decimalMultiplicationQuestions: Record<DifficultyLevel, Question[]> = {
  // 1. SZINT: KÖNNYŰ (10 feladat) - 10-zel, 100-zal való szorzás és alapvető egyjegyű szorzások
  1: [
    {
      id: 'q1-1',
      level: 1,
      question: 'Számítsd ki: 3,2 · 10 = ?',
      options: ['32', '320', '0,32', '3,20'],
      correctAnswer: '32',
      explanation: '10-zel szorozva a tizedesvessző 1 hellyel jobbra lép: 3,2 · 10 = 32.',
      steps: [
        { label: '1. Szabály', value: '10-zel szorzás = 1 hellyel jobbra léptetjük a vesszőt' },
        { label: '2. Léptetés', value: '3,2 → 32' }
      ],
      hint: 'A tizedesvesszőt 1 hellyel jobbra kell tolni!',
      formula: '3,2 · 10 = 32'
    },
    {
      id: 'q1-2',
      level: 1,
      question: 'Számítsd ki: 0,45 · 10 = ?',
      options: ['4,5', '45', '0,450', '0,045'],
      correctAnswer: '4,5',
      explanation: '10-zel szorozva a vessző 1 hellyel jobbra lép: 0,45 · 10 = 4,5.',
      steps: [
        { label: '1. Léptetés', value: '0,45 → 4,5' },
        { label: '2. Végeredmény', value: '4,5' }
      ],
      hint: 'Tolj egyet a vesszőn jobbra!',
      formula: '0,45 · 10 = 4,5'
    },
    {
      id: 'q1-3',
      level: 1,
      question: 'Számítsd ki: 1,25 · 100 = ?',
      options: ['125', '12,5', '1250', '1,250'],
      correctAnswer: '125',
      explanation: '100-zal szorozva a vessző 2 hellyel jobbra lép: 1,25 · 100 = 125.',
      steps: [
        { label: '1. Szabály', value: '100-zal szorzás = 2 hellyel jobbra lép a vessző' },
        { label: '2. Léptetés', value: '1,25 → 125' }
      ],
      hint: 'A 100-ban 2 nulla van, így 2 hellyel toljuk jobbra a vesszőt!',
      formula: '1,25 · 100 = 125'
    },
    {
      id: 'q1-4',
      level: 1,
      question: 'Számítsd ki: 0,08 · 100 = ?',
      options: ['8', '0,8', '80', '800'],
      correctAnswer: '8',
      explanation: '100-zal szorozva a vessző 2 hellyel jobbra lép: 0,08 · 100 = 8.',
      steps: [
        { label: '1. Léptetés', value: '0,08 → 008, azaz 8' },
        { label: '2. Végeredmény', value: '8' }
      ],
      hint: '2 hellyel jobbra lép a vessző a 8 mögé.',
      formula: '0,08 · 100 = 8'
    },
    {
      id: 'q1-5',
      level: 1,
      question: 'Számítsd ki: 0,3 · 4 = ?',
      options: ['1,2', '12', '0,12', '0,7'],
      correctAnswer: '1,2',
      explanation: 'Először szorzunk: 3 · 4 = 12. Mivel 1 tizedesjegy volt a tényezőben, levágunk 1 jegyet: 1,2.',
      steps: [
        { label: '1. Szorzás egész számként', value: '3 · 4 = 12' },
        { label: '2. Tizedesjegy elhelyezése', value: '1 tizedesjegy levágása → 1,2' }
      ],
      hint: '3 tized négyszer az 12 tized, vagyis 1 egész és 2 tized.',
      formula: '0,3 · 4 = 1,2'
    },
    {
      id: 'q1-6',
      level: 1,
      question: 'Számítsd ki: 1,2 · 3 = ?',
      options: ['3,6', '36', '0,36', '3,5'],
      correctAnswer: '3,6',
      explanation: '12 · 3 = 36. 1 tizedesjegyet levágva: 3,6.',
      steps: [
        { label: '1. Szorzás', value: '12 · 3 = 36' },
        { label: '2. Tizedesvessző', value: '1 jegy jobbról → 3,6' }
      ],
      hint: '1 egész háromszor az 3, 2 tized háromszor az 6 tized.',
      formula: '1,2 · 3 = 3,6'
    },
    {
      id: 'q1-7',
      level: 1,
      question: 'Számítsd ki: 2,1 · 4 = ?',
      options: ['8,4', '84', '0,84', '8,1'],
      correctAnswer: '8,4',
      explanation: '21 · 4 = 84. 1 tizedesjegyet levágva: 8,4.',
      steps: [
        { label: '1. Szorzás', value: '21 · 4 = 84' },
        { label: '2. Tizedesvessző', value: '8,4' }
      ],
      hint: '2 · 4 = 8 és 0,1 · 4 = 0,4 → 8,4.',
      formula: '2,1 · 4 = 8,4'
    },
    {
      id: 'q1-8',
      level: 1,
      question: 'Számítsd ki és egyszerűsítsd: 0,5 · 6 = ?',
      options: ['3', '3,0', '0,30', '30'],
      correctAnswer: '3',
      explanation: '5 · 6 = 30. 1 tizedesjegyet levágva: 3,0, a felesleges 0-t elhagyva pontosan 3.',
      steps: [
        { label: '1. Szorzás', value: '5 · 6 = 30' },
        { label: '2. Vessző letétele', value: '3,0' },
        { label: '3. Egyszerűsítés', value: '3,0 = 3 egész' }
      ],
      hint: 'Fél hatszor az 3 egész.',
      formula: '0,5 · 6 = 3'
    },
    {
      id: 'q1-9',
      level: 1,
      question: 'Számítsd ki: 0,25 · 4 = ?',
      options: ['1', '1,0', '0,100', '10'],
      correctAnswer: '1',
      explanation: '25 · 4 = 100. 2 tizedesjegyet levágva 1,00 = 1 egész.',
      steps: [
        { label: '1. Szorzás', value: '25 · 4 = 100' },
        { label: '2. Vessző letétele', value: '2 jegy levágása: 1,00' },
        { label: '3. Záró nullák elhagyása', value: '1,00 = 1' }
      ],
      hint: 'Egy negyed (0,25) négyszer az éppen 1 egész.',
      formula: '0,25 · 4 = 1'
    },
    {
      id: 'q1-10',
      level: 1,
      question: 'Számítsd ki: 4,2 · 100 = ?',
      options: ['420', '42', '4200', '0,42'],
      correctAnswer: '420',
      explanation: '100-zal szorozva a vesszőt 2 hellyel léptetjük jobbra. Mivel csak 1 tizedesjegy van, egy 0-t pótolunk: 4,20 · 100 = 420.',
      steps: [
        { label: '1. Nulla pótlása', value: '4,2 = 4,20' },
        { label: '2. Léptetés 2 hellyel', value: '4,20 · 100 = 420' }
      ],
      hint: 'Pótolj egy nullát a 2 mögé a 2 lépéshez: 4,20 -> 420.',
      formula: '4,2 · 100 = 420'
    }
  ],

  // 2. SZINT: KÖZEPES (10 feladat) - Átlépések, ezredek, záró nullák és egyszerű szöveges feladatok
  2: [
    {
      id: 'q2-1',
      level: 2,
      question: 'Számítsd ki: 2,35 · 4 = ?',
      options: ['9,4', '9,40', '94', '0,94'],
      correctAnswer: '9,4',
      explanation: '235 · 4 = 940. 2 tizedesjegyet levágva: 9,40. A végén lévő felesleges 0-t elhagyjuk: 9,4.',
      steps: [
        { label: '1. Egész szorzat', value: '235 · 4 = 940' },
        { label: '2. Vessző letétele', value: '2 tizedesjegy → 9,40' },
        { label: '3. Egyszerűsítés', value: '9,40 = 9,4' }
      ],
      hint: '235 · 4 = 940, majd vágj le 2 tizedesjegyet!',
      formula: '2,35 · 4 = 9,4'
    },
    {
      id: 'q2-2',
      level: 2,
      question: 'Számítsd ki: 0,08 · 25 = ?',
      options: ['2', '2,00', '0,2', '20'],
      correctAnswer: '2',
      explanation: '8 · 25 = 200. 2 tizedesjegyet levágva: 2,00 = 2.',
      steps: [
        { label: '1. Szorzás', value: '8 · 25 = 200' },
        { label: '2. Vessző letétele', value: '2 jegy levágása: 2,00' },
        { label: '3. Végeredmény', value: '2' }
      ],
      hint: '8 · 25 = 200, ebből vágj le 2 tizedesjegyet.',
      formula: '0,08 · 25 = 2'
    },
    {
      id: 'q2-3',
      level: 2,
      question: 'Számítsd ki: 4,15 · 6 = ?',
      options: ['24,9', '24,90', '249', '2,49'],
      correctAnswer: '24,9',
      explanation: '415 · 6 = 2490. 2 tizedesjegyet levágva: 24,90 = 24,9.',
      steps: [
        { label: '1. Szorzás', value: '415 · 6 = 2490' },
        { label: '2. Vessző letétele', value: '24,90 = 24,9' }
      ],
      hint: '415 · 6 = 2490, majd 2 tizedesjegy levágása.',
      formula: '4,15 · 6 = 24,9'
    },
    {
      id: 'q2-4',
      level: 2,
      question: 'Számítsd ki: 0,005 · 8 = ?',
      options: ['0,04', '0,040', '0,4', '0,004'],
      correctAnswer: '0,04',
      explanation: '5 · 8 = 40. 3 tizedesjegyet kell levágni: 0,040. A záró nullát elhagyva: 0,04.',
      steps: [
        { label: '1. Szorzás', value: '5 · 8 = 40' },
        { label: '2. 3 tizedesjegy levágása', value: '0,040' },
        { label: '3. Egyszerűsítés', value: '0,04' }
      ],
      hint: '5 ezred · 8 = 40 ezred = 4 század (0,04).',
      formula: '0,005 · 8 = 0,04'
    },
    {
      id: 'q2-5',
      level: 2,
      question: 'Számítsd ki: 12,5 · 8 = ?',
      options: ['100', '100,0', '10', '1000'],
      correctAnswer: '100',
      explanation: '125 · 8 = 1000. 1 tizedesjegyet levágva: 100,0 = 100.',
      steps: [
        { label: '1. Szorzás', value: '125 · 8 = 1000' },
        { label: '2. Tizedesvessző', value: '1 jegy levágása: 100,0 = 100' }
      ],
      hint: '125 · 8 = 1000, 1 tizedesjegyet levágva 100.',
      formula: '12,5 · 8 = 100'
    },
    {
      id: 'q2-6',
      level: 2,
      question: 'Számítsd ki: 3,08 · 5 = ?',
      options: ['15,4', '15,40', '154', '1,54'],
      correctAnswer: '15,4',
      explanation: '308 · 5 = 1540. 2 tizedesjegyet levágva: 15,40 = 15,4.',
      steps: [
        { label: '1. Szorzás', value: '308 · 5 = 1540' },
        { label: '2. Vessző elhelyezése', value: '15,40 = 15,4' }
      ],
      hint: '308 · 5 = 1540, vágj le 2 jegyet.',
      formula: '3,08 · 5 = 15,4'
    },
    {
      id: 'q2-7',
      level: 2,
      question: 'Számítsd ki: 0,45 · 6 = ?',
      options: ['2,7', '2,70', '27', '0,27'],
      correctAnswer: '2,7',
      explanation: '45 · 6 = 270. 2 tizedesjegyet levágva: 2,70 = 2,7.',
      steps: [
        { label: '1. Szorzás', value: '45 · 6 = 270' },
        { label: '2. Vessző elhelyezése', value: '2,70 = 2,7' }
      ],
      hint: '45 · 6 = 270, 2 jegy levágása után 2,7.',
      formula: '0,45 · 6 = 2,7'
    },
    {
      id: 'q2-8',
      level: 2,
      question: 'Számítsd ki: 1,025 · 1000 = ?',
      options: ['1025', '102,5', '10250', '10,25'],
      correctAnswer: '1025',
      explanation: '1000-rel szorozva a tizedesvessző 3 hellyel lép jobbra: 1,025 · 1000 = 1025.',
      steps: [
        { label: '1. Szabály', value: '1000-rel szorzás = 3 hellyel jobbra lépés' },
        { label: '2. Léptetés', value: '1,025 → 1025' }
      ],
      hint: 'Pontosan 3 tizedesjegy van, így egész szám lesz belőle.',
      formula: '1,025 · 1000 = 1025'
    },
    {
      id: 'q2-9',
      level: 2,
      question: 'Számítsd ki: 0,15 · 8 = ?',
      options: ['1,2', '1,20', '12', '0,12'],
      correctAnswer: '1,2',
      explanation: '15 · 8 = 120. 2 tizedesjegyet levágva: 1,20 = 1,2.',
      steps: [
        { label: '1. Szorzás', value: '15 · 8 = 120' },
        { label: '2. Vessző letétele', value: '1,20 = 1,2' }
      ],
      hint: '15 · 8 = 120, levágva 2 tizedesjegyet 1,2.',
      formula: '0,15 · 8 = 1,2'
    },
    {
      id: 'q2-10',
      level: 2,
      question: '1 kg alma ára 420,5 Ft. Mennyibe kerül 3 kg alma?',
      options: ['1261,5 Ft', '1260,5 Ft', '12615 Ft', '126,15 Ft'],
      correctAnswer: '1261,5 Ft',
      explanation: '420,5 · 3 = 1261,5 Ft (4205 · 3 = 12615, 1 tizedesjegyet levágva 1261,5).',
      steps: [
        { label: '1. Művelet felírása', value: '420,5 · 3' },
        { label: '2. Szorzás', value: '4205 · 3 = 12615' },
        { label: '3. Végeredmény', value: '1261,5 Ft' }
      ],
      hint: 'Szorozd meg a 420,5-et 3-mal!',
      formula: '420,5 · 3 = 1261,5'
    }
  ],

  // 3. SZINT: NEHÉZ (10 feladat) - Kétjegyű egész szorzók, összetett műveleti sorrend és életszerű feladatok
  3: [
    {
      id: 'q3-1',
      level: 3,
      question: 'Számítsd ki: 3,25 · 12 = ?',
      options: ['39', '39,0', '390', '3,9'],
      correctAnswer: '39',
      explanation: '325 · 12 = 3900. 2 tizedesjegyet levágva: 39,00 = 39.',
      steps: [
        { label: '1. Egész szorzat', value: '325 · 12 = 3900' },
        { label: '2. Vessző letétele', value: '39,00' },
        { label: '3. Egyszerűsítés', value: '39' }
      ],
      hint: '325 · 12 = 3900, vágj le 2 tizedesjegyet.',
      formula: '3,25 · 12 = 39'
    },
    {
      id: 'q3-2',
      level: 3,
      question: 'Számítsd ki: 0,65 · 20 = ?',
      options: ['13', '13,0', '130', '1,3'],
      correctAnswer: '13',
      explanation: '65 · 20 = 1300. 2 tizedesjegyet levágva: 13,00 = 13.',
      steps: [
        { label: '1. Szorzás', value: '65 · 20 = 1300' },
        { label: '2. Vessző elhelyezése', value: '13,00 = 13' }
      ],
      hint: '0,65 · 10 = 6,5, és 6,5 · 2 = 13.',
      formula: '0,65 · 20 = 13'
    },
    {
      id: 'q3-3',
      level: 3,
      question: 'Számítsd ki: 4,8 · 15 = ?',
      options: ['72', '72,0', '720', '7,2'],
      correctAnswer: '72',
      explanation: '48 · 15 = 720. 1 tizedesjegyet levágva: 72,0 = 72.',
      steps: [
        { label: '1. Szorzás', value: '48 · 15 = 720' },
        { label: '2. Tizedesvessző', value: '72,0 = 72' }
      ],
      hint: '48 · 15 = 720, vágj le 1 tizedesjegyet.',
      formula: '4,8 · 15 = 72'
    },
    {
      id: 'q3-4',
      level: 3,
      question: 'Számítsd ki: 1,05 · 40 = ?',
      options: ['42', '42,0', '420', '4,2'],
      correctAnswer: '42',
      explanation: '105 · 40 = 4200. 2 tizedesjegyet levágva: 42,00 = 42.',
      steps: [
        { label: '1. Szorzás', value: '105 · 40 = 4200' },
        { label: '2. Vessző letétele', value: '42,00 = 42' }
      ],
      hint: '1,05 · 40 = 10,5 · 4 = 42.',
      formula: '1,05 · 40 = 42'
    },
    {
      id: 'q3-5',
      level: 3,
      question: 'Számítsd ki: 0,075 · 60 = ?',
      options: ['4,5', '45', '0,45', '450'],
      correctAnswer: '4,5',
      explanation: '75 · 60 = 4500. 3 tizedesjegyet levágva: 4,500 = 4,5.',
      steps: [
        { label: '1. Szorzás', value: '75 · 60 = 4500' },
        { label: '2. 3 tizedesjegy levágása', value: '4,500 = 4,5' }
      ],
      hint: '75 ezred · 60 = 4500 ezred = 4,5 egész.',
      formula: '0,075 · 60 = 4,5'
    },
    {
      id: 'q3-6',
      level: 3,
      question: 'Számítsd ki: 2,5 · 24 = ?',
      options: ['60', '60,0', '600', '6'],
      correctAnswer: '60',
      explanation: '25 · 24 = 600. 1 tizedesjegyet levágva: 60,0 = 60.',
      steps: [
        { label: '1. Szorzás', value: '25 · 24 = 600' },
        { label: '2. Vessző letétele', value: '60,0 = 60' }
      ],
      hint: '2,5 · 4 = 10, és 10 · 6 = 60.',
      formula: '2,5 · 24 = 60'
    },
    {
      id: 'q3-7',
      level: 3,
      question: 'Számítsd ki: 15,4 · 25 = ?',
      options: ['385', '38,5', '3850', '3,85'],
      correctAnswer: '385',
      explanation: '154 · 25 = 3850. 1 tizedesjegyet levágva: 385,0 = 385.',
      steps: [
        { label: '1. Szorzás', value: '154 · 25 = 3850' },
        { label: '2. Vessző letétele', value: '385,0 = 385' }
      ],
      hint: '154 · 25 = 3850, 1 jegyet levágva 385.',
      formula: '15,4 · 25 = 385'
    },
    {
      id: 'q3-8',
      level: 3,
      question: 'Számítsd ki a műveleti sorrendnek megfelelően: 2,5 · 4 + 3,2 · 5 = ?',
      options: ['26', '25', '27,4', '26,5'],
      correctAnswer: '26',
      explanation: 'Először elvégezzük a szorzásokat: 2,5 · 4 = 10 és 3,2 · 5 = 16. Majd összeadjuk: 10 + 16 = 26.',
      steps: [
        { label: '1. Első szorzás', value: '2,5 · 4 = 10' },
        { label: '2. Második szorzás', value: '3,2 · 5 = 16' },
        { label: '3. Összeadás', value: '10 + 16 = 26' }
      ],
      hint: 'A szorzások megelőzik az összeadást: 10 + 16.',
      formula: '2,5 · 4 + 3,2 · 5 = 26'
    },
    {
      id: 'q3-9',
      level: 3,
      question: 'Egy autó állandó sebességgel haladva óránként 72,5 km-t tesz meg. Hány km utat jár be 4 óra alatt?',
      options: ['290 km', '288 km', '29,0 km', '2900 km'],
      correctAnswer: '290 km',
      explanation: '72,5 · 4 = 290,0 = 290 km.',
      steps: [
        { label: '1. Szorzás felírása', value: '72,5 · 4' },
        { label: '2. Egész szorzat', value: '725 · 4 = 2900' },
        { label: '3. Vessző letétele', value: '290,0 km = 290 km' }
      ],
      hint: '72,5 · 4 = 290 km.',
      formula: '72,5 · 4 = 290'
    },
    {
      id: 'q3-10',
      level: 3,
      question: 'Egy méter díszszalag ára 185,50 Ft. Mennyibe kerül 14 méter ebből a szalagból?',
      options: ['2597 Ft', '259,70 Ft', '25970 Ft', '2600 Ft'],
      correctAnswer: '2597 Ft',
      explanation: '185,5 · 14 = 2597 Ft (1855 · 14 = 25970, 1 tizedesjegy levágásával 2597).',
      steps: [
        { label: '1. Művelet felírása', value: '185,5 · 14' },
        { label: '2. Szorzás', value: '1855 · 14 = 25970' },
        { label: '3. Végeredmény', value: '2597 Ft' }
      ],
      hint: '185,5 · 14 = 2597 Ft.',
      formula: '185,5 · 14 = 2597'
    }
  ]
};

export const DecimalMultiplicationQuiz: React.FC<DecimalMultiplicationQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      title="Tizedes tört szorzása természetes számmal kvíz"
      subtitle="Gyakorold a 10, 100, 1000-rel és természetes számokkal való szorzást 3 nehézségi szinten!"
      questions={decimalMultiplicationQuestions}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      topicId="g5-decimal-multiply-quiz"
      themeColor="emerald"
      renderMatcher={(matcherProps) => (
        <DecimalMultiplicationMatcher
          {...matcherProps}
          onBack={matcherProps.onBack}
          onSwitchToQuiz={matcherProps.onSwitchToQuiz}
          onSwitchToSorter={matcherProps.onSwitchToSorter}
          onSwitchToTheory={onSwitchToTheory}
        />
      )}
      renderSorter={(sorterProps) => (
        <DecimalMultiplicationSorter
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
export default DecimalMultiplicationQuiz;
