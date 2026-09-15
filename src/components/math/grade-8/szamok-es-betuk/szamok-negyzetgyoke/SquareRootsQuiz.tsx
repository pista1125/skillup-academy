import React from 'react';
import { QuizTemplate, Question, CheatSheetCard } from '../QuizTemplate';
import { SquareRootsMatcher } from './SquareRootsMatcher';
import { SquareRootsSorter } from './SquareRootsSorter';
import { Target, Layers, Scale, Compass } from 'lucide-react';

interface SquareRootsQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    id: 'c1',
    title: 'Szorzat és Hányados Gyöke',
    icon: <Layers className="w-4 h-4 text-pink-600" />,
    formula: '√(a · b) = √a · √b  |  √(a / b) = √a / √b',
    note: 'Pl. √2 · √18 = √36 = 6;  √75 / √3 = √25 = 5.'
  },
  {
    id: 'c2',
    title: 'Kiemelés a Gyökjel Elé',
    icon: <Scale className="w-4 h-4 text-emerald-600" />,
    formula: '√(k² · a) = k√a',
    note: 'Pl. √50 = √(25 · 2) = 5√2;  √72 = 6√2;  √48 = 4√3.'
  },
  {
    id: 'c3',
    title: 'Bevitel a Gyökjel Alá',
    icon: <Target className="w-4 h-4 text-amber-600" />,
    formula: 'k√a = √(k² · a)',
    note: 'Pl. 3√5 = √(9 · 5) = √45;  4√3 = √(16 · 3) = √48.'
  },
  {
    id: 'c4',
    title: 'Irracionális Számok (ℚ*)',
    icon: <Compass className="w-4 h-4 text-blue-600" />,
    formula: 'Nem írhatók fel a/b alakban',
    note: '√2, √3, √5, √7, π. Végtelen nem szakaszos tizedestörtek.'
  }
];

const questions: Question[] = [
  // =========================================================================
  // --- 1. SZINT: ALAPVETŐ NÉGYZETSZÁMOK, SZORZAT ÉS HÁNYADOS GYÖKE (1-10) ---
  // =========================================================================
  {
    id: 'q1-1',
    level: 1,
    question: 'Mennyi a √225 négyzetgyök pontos értéke?',
    options: [
      '15',
      '25',
      '12.5',
      '14'
    ],
    correctAnswer: '15',
    explanation: '15 · 15 = 225, ezért √225 = 15.',
    hint: 'Melyik szám négyzete a 225? 15² = 225.',
    breakdown: [
      { label: 'Négyzetre emelés', value: '15² = 225' },
      { label: 'Gyökvonás', value: '√225 = 15' }
    ]
  },
  {
    id: 'q1-2',
    level: 1,
    question: 'Mennyi a √0.0049 tizedestört négyzetgyöke?',
    options: [
      '0.07',
      '0.7',
      '0.007',
      '0.049'
    ],
    correctAnswer: '0.07',
    explanation: '0.07 · 0.07 = 0.0049. A 4 tizedesjegy feleződik 2 tizedesjegyre: √0.0049 = 0.07.',
    hint: '√(49 / 10000) = 7 / 100 = 0.07.',
    breakdown: [
      { label: 'Tört alak', value: '√(49 / 10000) = 7 / 100' },
      { label: 'Tizedestört', value: '0.07' }
    ]
  },
  {
    id: 'q1-3',
    level: 1,
    question: 'Mennyi a √2 · √8 szorzat pontos értéke az azonosságok segítségével?',
    options: [
      '4',
      '√10',
      '16',
      '2'
    ],
    correctAnswer: '4',
    explanation: 'Szorzat négyzetgyöke: √2 · √8 = √(2 · 8) = √16 = 4.',
    hint: '√a · √b = √(a · b) ⟹ √(2 · 8) = √16 = 4.',
    breakdown: [
      { label: 'Azonosság', value: '√2 · √8 = √(2 · 8)' },
      { label: 'Kiszámolás', value: '√16 = 4' }
    ]
  },
  {
    id: 'q1-4',
    level: 1,
    question: 'Mennyi a √75 / √3 hányados pontos értéke?',
    options: [
      '5',
      '25',
      '√25 = ±5',
      '15'
    ],
    correctAnswer: '5',
    explanation: 'Hányados négyzetgyöke: √75 / √3 = √(75 / 3) = √25 = 5.',
    hint: '√a / √b = √(a / b) ⟹ √(75 / 3) = √25 = 5.',
    breakdown: [
      { label: 'Azonosság', value: '√75 / √3 = √(75 / 3)' },
      { label: 'Eredmény', value: '√25 = 5' }
    ]
  },
  {
    id: 'q1-5',
    level: 1,
    question: 'Mennyi a √400 - √169 kifejezés értéke?',
    options: [
      '7',
      '231',
      '√231',
      '17'
    ],
    correctAnswer: '7',
    explanation: '√400 = 20 és √169 = 13. Különbségük: 20 - 13 = 7.',
    hint: '20 - 13 = 7.',
    breakdown: [
      { label: '√400', value: '20' },
      { label: '√169', value: '13' },
      { label: 'Különbség', value: '20 - 13 = 7' }
    ]
  },
  {
    id: 'q1-6',
    level: 1,
    question: 'Mennyi a √3 · √27 szorzat pontos értéke?',
    options: [
      '9',
      '3',
      '27',
      '√30'
    ],
    correctAnswer: '9',
    explanation: '√3 · √27 = √(3 · 27) = √81 = 9.',
    hint: '3 · 27 = 81 ⟹ √81 = 9.',
    breakdown: [
      { label: 'Szorzat gyök alatt', value: '√(3 · 27) = √81' },
      { label: 'Gyökvonás', value: '9' }
    ]
  },
  {
    id: 'q1-7',
    level: 1,
    question: 'Mennyi a √98 / √2 hányados pontos értéke?',
    options: [
      '7',
      '49',
      '√49 = ±7',
      '14'
    ],
    correctAnswer: '7',
    explanation: '√98 / √2 = √(98 / 2) = √49 = 7.',
    hint: '98 / 2 = 49 ⟹ √49 = 7.',
    breakdown: [
      { label: 'Osztás gyök alatt', value: '√(98 / 2) = √49' },
      { label: 'Gyökvonás', value: '7' }
    ]
  },
  {
    id: 'q1-8',
    level: 1,
    question: 'Mennyi a √(0.04 · 0.25) szorzat gyöke?',
    options: [
      '0.1',
      '0.01',
      '0.2',
      '0.05'
    ],
    correctAnswer: '0.1',
    explanation: 'Tényezőnként gyököt vonva: √0.04 · √0.25 = 0.2 · 0.5 = 0.1.',
    hint: '√0.04 = 0.2 és √0.25 = 0.5. 0.2 · 0.5 = 0.1.',
    breakdown: [
      { label: 'Tényezők gyöke', value: '0.2 · 0.5' },
      { label: 'Szorzat', value: '0.1' }
    ]
  },
  {
    id: 'q1-9',
    level: 1,
    question: 'Mennyi a √289 négyzetgyök pontos értéke?',
    options: [
      '17',
      '19',
      '13',
      '27'
    ],
    correctAnswer: '17',
    explanation: '17 · 17 = 289, ezért √289 = 17.',
    hint: '17² = 289.',
    breakdown: [
      { label: 'Négyzet', value: '17² = 289' },
      { label: 'Gyök', value: '17' }
    ]
  },
  {
    id: 'q1-10',
    level: 1,
    question: 'Mennyi a √(64/121) tört négyzetgyöke?',
    options: [
      '8/11',
      '64/121',
      '8/121',
      '16/11'
    ],
    correctAnswer: '8/11',
    explanation: '√64 / √121 = 8/11.',
    hint: '√64 = 8 és √121 = 11.',
    breakdown: [
      { label: 'Számláló', value: '√64 = 8' },
      { label: 'Nevező', value: '√121 = 11' },
      { label: 'Tört', value: '8/11' }
    ]
  },

  // =========================================================================
  // --- 2. SZINT: GYÖKTÉNYEZŐ KIEMELÉSE ÉS BEVITELE (11-20) ---
  // =========================================================================
  {
    id: 'q2-1',
    level: 2,
    question: 'Melyik a √50 kifejezés legegyszerűbb alakja a gyökjel elé való kiemeléssel?',
    options: [
      '5√2',
      '2√5',
      '25√2',
      '5√10'
    ],
    correctAnswer: '5√2',
    explanation: '50 felbontása a legnagyobb négyzetszámmal: 50 = 25 · 2. Ekkor √50 = √25 · √2 = 5√2.',
    hint: '50 = 25 · 2. √25 = 5 ⟹ 5√2.',
    breakdown: [
      { label: 'Felbontás', value: '50 = 25 · 2' },
      { label: 'Kiemelés', value: '√25 · √2 = 5√2' }
    ]
  },
  {
    id: 'q2-2',
    level: 2,
    question: 'Melyik gyökkel egyenlő a 3√5 kifejezés a gyökjel alá vitel után?',
    options: [
      '√45',
      '√15',
      '√75',
      '√30'
    ],
    correctAnswer: '√45',
    explanation: 'A 3-at négyzetre emelve visszük be: 3√5 = √(3² · 5) = √(9 · 5) = √45.',
    hint: '3² = 9 ⟹ √(9 · 5) = √45.',
    breakdown: [
      { label: 'Négyzetre emelés', value: '3² = 9' },
      { label: 'Szorzás a gyök alatt', value: '9 · 5 = 45 ⟹ √45' }
    ]
  },
  {
    id: 'q2-3',
    level: 2,
    question: 'Melyik a √72 kifejezés legegyszerűbb alakja kiemeléssel?',
    options: [
      '6√2',
      '3√8',
      '2√18',
      '36√2'
    ],
    correctAnswer: '6√2',
    explanation: 'A 72 legnagyobb négyzetszám osztója a 36: 72 = 36 · 2. Így √72 = √36 · √2 = 6√2.',
    hint: '72 = 36 · 2. √36 = 6 ⟹ 6√2.',
    breakdown: [
      { label: 'Felbontás', value: '72 = 36 · 2' },
      { label: 'Kiemelés', value: '√36 · √2 = 6√2' }
    ]
  },
  {
    id: 'q2-4',
    level: 2,
    question: 'Mennyi a 2√3 + 5√3 - √3 kifejezés összevont értéke?',
    options: [
      '6√3',
      '7√3',
      '6√9 = 18',
      '6'
    ],
    correctAnswer: '6√3',
    explanation: 'Azonos gyöktényezők összevonása: (2 + 5 - 1)√3 = 6√3.',
    hint: '(2 + 5 - 1) · √3 = 6√3.',
    breakdown: [
      { label: 'Együtthatók művelete', value: '2 + 5 - 1 = 6' },
      { label: 'Eredmény', value: '6√3' }
    ]
  },
  {
    id: 'q2-5',
    level: 2,
    question: 'Mennyi a √20 + √45 kifejezés értéke a gyökjel elé kiemelés után?',
    options: [
      '5√5',
      '√65',
      '6√5',
      '13'
    ],
    correctAnswer: '5√5',
    explanation: '√20 = √(4 · 5) = 2√5, és √45 = √(9 · 5) = 3√5. Összegük: 2√5 + 3√5 = 5√5.',
    hint: '√20 = 2√5 és √45 = 3√5. 2√5 + 3√5 = 5√5.',
    breakdown: [
      { label: '√20 kiemelése', value: '2√5' },
      { label: '√45 kiemelése', value: '3√5' },
      { label: 'Összevonás', value: '2√5 + 3√5 = 5√5' }
    ]
  },
  {
    id: 'q2-6',
    level: 2,
    question: 'Melyik a √48 kifejezés helyes, legegyszerűbb alakja?',
    options: [
      '4√3',
      '2√12',
      '16√3',
      '3√4'
    ],
    correctAnswer: '4√3',
    explanation: '48 legnagyobb négyzetszám osztója a 16: 48 = 16 · 3. Ekkor √48 = √16 · √3 = 4√3.',
    hint: '48 = 16 · 3 ⟹ √16 · √3 = 4√3.',
    breakdown: [
      { label: 'Felbontás', value: '48 = 16 · 3' },
      { label: 'Kiemelés', value: '4√3' }
    ]
  },
  {
    id: 'q2-7',
    level: 2,
    question: 'Melyik a nagyobb szám: A = 4√2 vagy B = 3√3?',
    options: [
      'Az A szám a nagyobb (4√2 > 3√3).',
      'A B szám a nagyobb (3√3 > 4√2).',
      'A két szám pontosan egyenlő.',
      'Nem lehet összehasonlítani őket.'
    ],
    correctAnswer: 'Az A szám a nagyobb (4√2 > 3√3).',
    explanation: 'Vigyük be mindkét szorzót a gyökjel alá: A = 4√2 = √(16 · 2) = √32. B = 3√3 = √(9 · 3) = √27. Mivel 32 > 27, ezért 4√2 > 3√3.',
    hint: '4√2 = √32 és 3√3 = √27. √32 > √27.',
    breakdown: [
      { label: 'A gyök alatt', value: '√(16 · 2) = √32' },
      { label: 'B gyök alatt', value: '√(9 · 3) = √27' },
      { label: 'Összehasonlítás', value: '√32 > √27 ⟹ A > B' }
    ]
  },
  {
    id: 'q2-8',
    level: 2,
    question: 'Mennyi a √12 · √3 szorzat pontos értéke?',
    options: [
      '6',
      '36',
      '√15',
      '4'
    ],
    correctAnswer: '6',
    explanation: '√12 · √3 = √(12 · 3) = √36 = 6.',
    hint: '12 · 3 = 36 ⟹ √36 = 6.',
    breakdown: [
      { label: 'Szorzás', value: '√(12 · 3) = √36' },
      { label: 'Gyökvonás', value: '6' }
    ]
  },
  {
    id: 'q2-9',
    level: 2,
    question: 'Mennyi a (2√5)² kifejezés pontos értéke?',
    options: [
      '20',
      '10',
      '100',
      '40'
    ],
    correctAnswer: '20',
    explanation: '(2√5)² = 2² · (√5)² = 4 · 5 = 20.',
    hint: '2² = 4 és (√5)² = 5. 4 · 5 = 20.',
    breakdown: [
      { label: 'Tényezők négyzete', value: '2² · (√5)²' },
      { label: 'Szorzat', value: '4 · 5 = 20' }
    ]
  },
  {
    id: 'q2-10',
    level: 2,
    question: 'Melyik a √108 kifejezés legegyszerűbb kiemelt alakja?',
    options: [
      '6√3',
      '3√12',
      '2√27',
      '18√3'
    ],
    correctAnswer: '6√3',
    explanation: '108 = 36 · 3. Így √108 = √36 · √3 = 6√3.',
    hint: '108 = 36 · 3 ⟹ √36 · √3 = 6√3.',
    breakdown: [
      { label: 'Felbontás', value: '108 = 36 · 3' },
      { label: 'Kiemelés', value: '6√3' }
    ]
  },

  // =========================================================================
  // --- 3. SZINT: ÖSSZETETT GYÖKÖS KIFEJEZÉSEK ÉS BECSLÉSEK (21-30) ---
  // =========================================================================
  {
    id: 'q3-1',
    level: 3,
    question: 'Mennyi a √50 + √18 - √8 kifejezés pontos értéke legegyszerűbb alakban?',
    options: [
      '6√2',
      '10√2',
      '√60',
      '8√2'
    ],
    correctAnswer: '6√2',
    explanation: '√50 = 5√2, √18 = 3√2, √8 = 2√2. Ekkor: 5√2 + 3√2 - 2√2 = (5 + 3 - 2)√2 = 6√2.',
    hint: 'Emelj ki mindegyikből √2-t: 5√2 + 3√2 - 2√2 = 6√2.',
    breakdown: [
      { label: 'Kiemelések', value: '5√2 + 3√2 - 2√2' },
      { label: 'Összevonás', value: '6√2' }
    ]
  },
  {
    id: 'q3-2',
    level: 3,
    question: 'Melyik szám IRRACIONÁLIS az alábbiak közül: √16, √(25/9), √8, √0.04?',
    options: [
      '√8 (= 2√2)',
      '√16 (= 4)',
      '√(25/9) (= 5/3)',
      '√0.04 (= 0.2)'
    ],
    correctAnswer: '√8 (= 2√2)',
    explanation: '√16 = 4, √(25/9) = 5/3 és √0.04 = 0.2 mind racionális számok. A 8 nem négyzetszám, így √8 = 2√2 irracionális (végtelen nem szakaszos tizedestört).',
    hint: 'A nem négyzetszámok gyöke mindig irracionális.',
    breakdown: [
      { label: 'Racionális gyökök', value: '4, 5/3, 0.2 (felírhatók törtként)' },
      { label: 'Irracionális szám', value: '√8 = 2√2 (ℚ*)' }
    ]
  },
  {
    id: 'q3-3',
    level: 3,
    question: 'Mennyi a (√7 + √2) · (√7 - √2) szorzat pontos értéke a nevezetes azonosság segítségével?',
    options: [
      '5',
      '9',
      '√45',
      '3'
    ],
    correctAnswer: '5',
    explanation: '(a + b)(a - b) = a² - b² azonosság szerint: (√7)² - (√2)² = 7 - 2 = 5.',
    hint: '(a + b)(a - b) = a² - b² ⟹ (√7)² - (√2)² = 7 - 2 = 5.',
    breakdown: [
      { label: 'Azonosság', value: '(√7)² - (√2)²' },
      { label: 'Számítás', value: '7 - 2 = 5' }
    ]
  },
  {
    id: 'q3-4',
    level: 3,
    question: 'Mennyi a (√80 / √5) + (√27 / √3) kifejezés értéke?',
    options: [
      '7',
      '12',
      '5',
      '√107'
    ],
    correctAnswer: '7',
    explanation: '√80 / √5 = √(80 / 5) = √16 = 4. √27 / √3 = √(27 / 3) = √9 = 3. Összegük: 4 + 3 = 7.',
    hint: '√(80/5) = √16 = 4 és √(27/3) = √9 = 3. 4 + 3 = 7.',
    breakdown: [
      { label: '1. hányados', value: '√(80 / 5) = √16 = 4' },
      { label: '2. hányados', value: '√(27 / 3) = √9 = 3' },
      { label: 'Összeg', value: '4 + 3 = 7' }
    ]
  },
  {
    id: 'q3-5',
    level: 3,
    question: 'Mennyi a (3√2)² - (2√3)² különbség pontos értéke?',
    options: [
      '6',
      '12',
      '0',
      '18'
    ],
    correctAnswer: '6',
    explanation: '(3√2)² = 9 · 2 = 18. (2√3)² = 4 · 3 = 12. Különbségük: 18 - 12 = 6.',
    hint: '18 - 12 = 6.',
    breakdown: [
      { label: '(3√2)²', value: '9 · 2 = 18' },
      { label: '(2√3)²', value: '4 · 3 = 12' },
      { label: 'Különbség', value: '18 - 12 = 6' }
    ]
  },
  {
    id: 'q3-6',
    level: 3,
    question: 'Melyik két szomszédos egész szám közé esik a 2√10 értéke a számegyenesen?',
    options: [
      '6 és 7 közé (6 < 2√10 < 7)',
      '5 és 6 közé',
      '7 és 8 közé',
      '4 és 5 közé'
    ],
    correctAnswer: '6 és 7 közé (6 < 2√10 < 7)',
    explanation: 'Vigyük be a 2-t a gyökjel alá: 2√10 = √(4 · 10) = √40. Mivel 36 < 40 < 49, ezért 6 < √40 < 7.',
    hint: '2√10 = √40. Mivel 6² = 36 < 40 < 49 = 7², ezért 6 és 7 közé esik.',
    breakdown: [
      { label: 'Bevitel gyök alá', value: '2√10 = √(4 · 10) = √40' },
      { label: 'Négyzetszámok', value: '36 < 40 < 49' },
      { label: 'Intervallum', value: '6 < √40 < 7' }
    ]
  },
  {
    id: 'q3-7',
    level: 3,
    question: 'Mennyi a √200 - √32 kifejezés legegyszerűbb alakja?',
    options: [
      '6√2',
      '14√2',
      '√168',
      '4√2'
    ],
    correctAnswer: '6√2',
    explanation: '√200 = √(100 · 2) = 10√2, és √32 = √(16 · 2) = 4√2. Különbségük: 10√2 - 4√2 = 6√2.',
    hint: '10√2 - 4√2 = 6√2.',
    breakdown: [
      { label: '√200', value: '10√2' },
      { label: '√32', value: '4√2' },
      { label: 'Különbség', value: '10√2 - 4√2 = 6√2' }
    ]
  },
  {
    id: 'q3-8',
    level: 3,
    question: 'Mennyi a √2.5 · √10 szorzat pontos értéke?',
    options: [
      '5',
      '25',
      '√25 = ±5',
      '2.5'
    ],
    correctAnswer: '5',
    explanation: '√2.5 · √10 = √(2.5 · 10) = √25 = 5.',
    hint: '2.5 · 10 = 25 ⟹ √25 = 5.',
    breakdown: [
      { label: 'Szorzat gyök alatt', value: '√(2.5 · 10) = √25' },
      { label: 'Gyökvonás', value: '5' }
    ]
  },
  {
    id: 'q3-9',
    level: 3,
    question: 'Mennyi a √2 · (√8 + √18) kifejezés pontos egész értéke?',
    options: [
      '10',
      '8',
      '12',
      '√52'
    ],
    correctAnswer: '10',
    explanation: 'Zárójel felbontása: √2 · √8 + √2 · √18 = √16 + √36 = 4 + 6 = 10.',
    hint: '√2 · √8 = √16 = 4 és √2 · √18 = √36 = 6. 4 + 6 = 10.',
    breakdown: [
      { label: '1. szorzat', value: '√2 · √8 = √16 = 4' },
      { label: '2. szorzat', value: '√2 · √18 = √36 = 6' },
      { label: 'Összeg', value: '4 + 6 = 10' }
    ]
  },
  {
    id: 'q3-10',
    level: 3,
    question: 'Melyik szám a LEGNAGYOBB az alábbiak közül: A = 5√3, B = 6√2, C = 3√7, D = 2√15?',
    options: [
      'A = 5√3 (= √75)',
      'B = 6√2 (= √72)',
      'C = 3√7 (= √63)',
      'D = 2√15 (= √60)'
    ],
    correctAnswer: 'A = 5√3 (= √75)',
    explanation: 'Vigyük be mindegyiket a gyökjel alá: A = √(25 · 3) = √75; B = √(36 · 2) = √72; C = √(9 · 7) = √63; D = √(4 · 15) = √60. A legnagyobb a √75 = 5√3.',
    hint: 'Hasonlítsd össze a gyök alatti értékeket: √75 > √72 > √63 > √60.',
    breakdown: [
      { label: 'A', value: '√(25 · 3) = √75' },
      { label: 'B', value: '√(36 · 2) = √72' },
      { label: 'C', value: '√(9 · 7) = √63' },
      { label: 'D', value: '√(4 · 15) = √60' },
      { label: 'Legnagyobb', value: '√75 (5√3)' }
    ]
  }
];

export const SquareRootsQuiz: React.FC<SquareRootsQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      title="8. Számok négyzetgyöke – Kvíz"
      subtitle="30 feladat 3 nehézségi szinten: Négyzetszámok, szorzat és hányados gyöke, kiemelés és bevitel, összetett kifejezések"
      questions={questions}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      documentId="grade-8-szamok-betuk-szamok-negyzetgyoke-quiz"
      pdfFilename="8_osztaly_szamok_negyzetgyoke_kviz.pdf"
      badgeColor="pink"
      matcherComponent={<SquareRootsMatcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} />}
      sorterComponent={<SquareRootsSorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} />}
      cheatSheetCards={cheatSheetCards}
    />
  );
};

export default SquareRootsQuiz;
