import React from 'react';
import { QuizTemplate, Question, DifficultyLevel } from '../QuizTemplate';
import { DecimalDivisionMatcher } from './DecimalDivisionMatcher';
import { DecimalDivisionSorter } from './DecimalDivisionSorter';

export interface DecimalDivisionQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

export const decimalDivisionQuestions: Record<DifficultyLevel, Question[]> = {
  // 1. SZINT: KÖNNYŰ (10 feladat) - 10-zel, 100-zal való osztás és egyszerű egyjegyű egész osztók
  1: [
    {
      id: 'q1-1',
      level: 1,
      question: 'Számítsd ki: 45 : 10 = ?',
      options: ['4,5', '0,45', '450', '4,05'],
      correctAnswer: '4,5',
      explanation: '10-zel osztva a tizedesvessző 1 hellyel balra lép: 45 : 10 = 4,5.',
      steps: [
        { label: '1. Szabály', value: '10-zel osztás = 1 hellyel balra léptetjük a vesszőt' },
        { label: '2. Léptetés', value: '45,0 → 4,5' }
      ],
      hint: 'A tizedesvesszőt 1 hellyel balra toljuk!',
      formula: '45 : 10 = 4,5'
    },
    {
      id: 'q1-2',
      level: 1,
      question: 'Számítsd ki: 3,2 : 10 = ?',
      options: ['0,32', '32', '0,032', '3,02'],
      correctAnswer: '0,32',
      explanation: '10-zel osztva a vessző 1 hellyel balra lép a 3 elé: 3,2 : 10 = 0,32.',
      steps: [
        { label: '1. Léptetés', value: '3,2 → ,32' },
        { label: '2. Egész rész pótlása', value: '0,32' }
      ],
      hint: 'Tolj egyet a vesszőn balra, és tegyél elé egy 0-t!',
      formula: '3,2 : 10 = 0,32'
    },
    {
      id: 'q1-3',
      level: 1,
      question: 'Számítsd ki: 125 : 100 = ?',
      options: ['1,25', '12,5', '0,125', '1250'],
      correctAnswer: '1,25',
      explanation: '100-zal osztva a vessző 2 hellyel lép balra: 125 : 100 = 1,25.',
      steps: [
        { label: '1. Szabály', value: '100-zal osztás = 2 hellyel balra lépés' },
        { label: '2. Léptetés', value: '125,0 → 1,25' }
      ],
      hint: 'A 100-ban 2 nulla van, így 2 jegyet lépünk balra.',
      formula: '125 : 100 = 1,25'
    },
    {
      id: 'q1-4',
      level: 1,
      question: 'Számítsd ki: 7 : 100 = ?',
      options: ['0,07', '0,7', '0,007', '70'],
      correctAnswer: '0,07',
      explanation: '100-zal osztva a 7 elé két helyet kell lépni nullákkal pótolva: 7 : 100 = 0,07.',
      steps: [
        { label: '1. Nulla pótlása', value: '007,0' },
        { label: '2. Léptetés 2 hellyel balra', value: '0,07' }
      ],
      hint: '7 századrész tizedes tört alakban pontosan 0,07.',
      formula: '7 : 100 = 0,07'
    },
    {
      id: 'q1-5',
      level: 1,
      question: 'Számítsd ki: 6,8 : 2 = ?',
      options: ['3,4', '34', '0,34', '3,8'],
      correctAnswer: '3,4',
      explanation: '6 egész osztva 2-vel az 3 egész. 8 tized osztva 2-vel az 4 tized. Eredmény: 3,4.',
      steps: [
        { label: '1. Egész rész osztása', value: '6 : 2 = 3' },
        { label: '2. Vessző letétele és tizedek', value: '8 tized : 2 = 4 tized → 3,4' }
      ],
      hint: 'Oszd el külön a 6-ot 2-vel és a 8-at 2-vel!',
      formula: '6,8 : 2 = 3,4'
    },
    {
      id: 'q1-6',
      level: 1,
      question: 'Számítsd ki: 9,6 : 3 = ?',
      options: ['3,2', '32', '0,32', '3,3'],
      correctAnswer: '3,2',
      explanation: '9 : 3 = 3 egész, kitesszük a vesszőt: 3, majd 6 : 3 = 2 tized. Végeredmény: 3,2.',
      steps: [
        { label: '1. Egész rész', value: '9 : 3 = 3' },
        { label: '2. Tizedes rész', value: '6 : 3 = 2 → 3,2' }
      ],
      hint: '9 : 3 = 3 és 0,6 : 3 = 0,2 → 3,2.',
      formula: '9,6 : 3 = 3,2'
    },
    {
      id: 'q1-7',
      level: 1,
      question: 'Írd fel tizedes tört alakban az 1 : 2 osztás eredményét!',
      options: ['0,5', '0,2', '0,50', '2,0'],
      correctAnswer: '0,5',
      explanation: '1 : 2 = 0, maradék 1. Kitesszük a vesszőt: 0,, majd a maradék mellé 0-t írunk: 10 : 2 = 5 → 0,5.',
      steps: [
        { label: '1. Egész rész osztása', value: '1 : 2 = 0, maradék 1' },
        { label: '2. Vessző és 0 pótlása', value: '10 : 2 = 5 → 0,5' }
      ],
      hint: '1 egész fele = 0,5 (fél).',
      formula: '1 : 2 = 0,5'
    },
    {
      id: 'q1-8',
      level: 1,
      question: 'Számítsd ki: 3 : 2 = ?',
      options: ['1,5', '1,2', '1,50', '0,75'],
      correctAnswer: '1,5',
      explanation: '3 : 2 = 1, maradék 1. Vessző kirakása: 1,, majd 10 : 2 = 5 → 1,5.',
      steps: [
        { label: '1. Egész osztás', value: '3 : 2 = 1, maradék 1' },
        { label: '2. Tizedek osztása', value: '10 : 2 = 5 → 1,5' }
      ],
      hint: '3 pizzát elfelezve 1 és fél jut mindenkinek: 1,5.',
      formula: '3 : 2 = 1,5'
    },
    {
      id: 'q1-9',
      level: 1,
      question: 'Számítsd ki: 4,8 : 4 = ?',
      options: ['1,2', '12', '0,12', '1,4'],
      correctAnswer: '1,2',
      explanation: '4 : 4 = 1, majd a tizedeknél 8 : 4 = 2. Végeredmény: 1,2.',
      steps: [
        { label: '1. Egész rész', value: '4 : 4 = 1' },
        { label: '2. Tizedes rész', value: '8 : 4 = 2 → 1,2' }
      ],
      hint: '4 egész és 8 tized negyede 1 egész és 2 tized.',
      formula: '4,8 : 4 = 1,2'
    },
    {
      id: 'q1-10',
      level: 1,
      question: 'Számítsd ki: 8,4 : 2 = ?',
      options: ['4,2', '42', '0,42', '4,4'],
      correctAnswer: '4,2',
      explanation: '8 : 2 = 4, majd 4 : 2 = 2. Eredmény: 4,2.',
      steps: [
        { label: '1. Egész rész', value: '8 : 2 = 4' },
        { label: '2. Tizedek', value: '4 : 2 = 2 → 4,2' }
      ],
      hint: 'Felezd meg a 8-at és a 4 tizedet!',
      formula: '8,4 : 2 = 4,2'
    }
  ],

  // 2. SZINT: KÖZEPES (10 feladat) - Átlépések, 0 a hányadosban, tört átváltása tizedes törtre és szöveges feladatok
  2: [
    {
      id: 'q2-1',
      level: 2,
      question: 'Számítsd ki: 14,7 : 3 = ?',
      options: ['4,9', '49', '0,49', '4,2'],
      correctAnswer: '4,9',
      explanation: '14 : 3 = 4, maradék 2. Kitesszük a tizedesvesszőt: 4,, majd lehozzuk a 7-et: 27 : 3 = 9. Eredmény: 4,9.',
      steps: [
        { label: '1. Egész rész osztása', value: '14 : 3 = 4 (maradék 2)' },
        { label: '2. Vessző kirakása', value: '4,' },
        { label: '3. Tizedek osztása', value: '27 : 3 = 9 → 4,9' }
      ],
      hint: '14-ben a 3 megvan 4-szer, maradt 2. A 27-ben a 3 megvan 9-szer.',
      formula: '14,7 : 3 = 4,9'
    },
    {
      id: 'q2-2',
      level: 2,
      question: 'Számítsd ki: 1,25 : 5 = ?',
      options: ['0,25', '2,5', '0,025', '25'],
      correctAnswer: '0,25',
      explanation: '1 : 5 = 0, maradék 1. Vessző kirakása: 0,, lehozzuk a 2-t: 12 : 5 = 2, maradék 2. Lehozzuk az 5-öt: 25 : 5 = 5 → 0,25.',
      steps: [
        { label: '1. Egész rész', value: '1 : 5 = 0 (maradék 1) → 0,' },
        { label: '2. Tizedek', value: '12 : 5 = 2 (maradék 2)' },
        { label: '3. Századok', value: '25 : 5 = 5 → 0,25' }
      ],
      hint: 'Mivel az 1 kisebb mint 5, 0 egésszel kezdődik a hányados!',
      formula: '1,25 : 5 = 0,25'
    },
    {
      id: 'q2-3',
      level: 2,
      question: 'Számítsd ki: 6,18 : 6 = ?',
      options: ['1,03', '1,3', '1,30', '0,13'],
      correctAnswer: '1,03',
      explanation: '6 : 6 = 1, kitesszük a vesszőt: 1,. Lehozzuk az 1-et: 1-ben a 6 megvan 0-szor (maradék 1). Lehozzuk a 8-at: 18 : 6 = 3 → 1,03.',
      steps: [
        { label: '1. Egész rész', value: '6 : 6 = 1 (maradék 0) → 1,' },
        { label: '2. Tizedek (0 a hányadosba!)', value: '1 : 6 = 0 (maradék 1)' },
        { label: '3. Századok', value: '18 : 6 = 3 → 1,03' }
      ],
      hint: 'Vigyázat! Az 1-ben a 6 0-szor van meg, ezt kötelező kiírni a tizedek helyére!',
      formula: '6,18 : 6 = 1,03'
    },
    {
      id: 'q2-4',
      level: 2,
      question: 'Írd fel tizedes tört alakban a 3 : 4 osztás eredményét!',
      options: ['0,75', '0,34', '0,7', '0,8'],
      correctAnswer: '0,75',
      explanation: '3 : 4 = 0 (maradék 3) → 0,. 30 : 4 = 7 (maradék 2) → 20 : 4 = 5 → 0,75.',
      steps: [
        { label: '1. Egész rész', value: '3 : 4 = 0 (m: 3) → 0,' },
        { label: '2. Tizedek', value: '30 : 4 = 7 (m: 2)' },
        { label: '3. Századok', value: '20 : 4 = 5 → 0,75' }
      ],
      hint: 'A háromnegyed (3/4) tizedes tört alakja 0,75.',
      formula: '3 : 4 = 0,75'
    },
    {
      id: 'q2-5',
      level: 2,
      question: 'Számítsd ki: 15 : 4 = ?',
      options: ['3,75', '3,5', '3,25', '3,8'],
      correctAnswer: '3,75',
      explanation: '15 : 4 = 3 (maradék 3) → 3,. 30 : 4 = 7 (maradék 2) → 20 : 4 = 5 → 3,75.',
      steps: [
        { label: '1. Egész rész', value: '15 : 4 = 3 (m: 3) → 3,' },
        { label: '2. Tizedek', value: '30 : 4 = 7 (m: 2)' },
        { label: '3. Századok', value: '20 : 4 = 5 → 3,75' }
      ],
      hint: '15 : 4 = 3 és háromnegyed = 3,75.',
      formula: '15 : 4 = 3,75'
    },
    {
      id: 'q2-6',
      level: 2,
      question: 'Számítsd ki: 0,8 : 5 = ?',
      options: ['0,16', '0,4', '1,6', '0,016'],
      correctAnswer: '0,16',
      explanation: '0 : 5 = 0 → 0,. 8 : 5 = 1 (maradék 3). 30 : 5 = 6 → 0,16.',
      steps: [
        { label: '1. Egész rész', value: '0 : 5 = 0 → 0,' },
        { label: '2. Tizedek', value: '8 : 5 = 1 (maradék 3)' },
        { label: '3. Századok', value: '30 : 5 = 6 → 0,16' }
      ],
      hint: '8 tized osztva 5-tel: 80 század : 5 = 16 század = 0,16.',
      formula: '0,8 : 5 = 0,16'
    },
    {
      id: 'q2-7',
      level: 2,
      question: 'Számítsd ki: 53,4 : 6 = ?',
      options: ['8,9', '89', '0,89', '8,4'],
      correctAnswer: '8,9',
      explanation: '53 : 6 = 8 (maradék 5) → 8,. Lehozzuk a 4-et: 54 : 6 = 9 → 8,9.',
      steps: [
        { label: '1. Egész rész', value: '53 : 6 = 8 (maradék 5) → 8,' },
        { label: '2. Tizedek', value: '54 : 6 = 9 → 8,9' }
      ],
      hint: '53 : 6 = 8, maradék 5. 54 : 6 = 9.',
      formula: '53,4 : 6 = 8,9'
    },
    {
      id: 'q2-8',
      level: 2,
      question: 'Írd fel tizedes tört alakban az 1 : 8 osztás eredményét!',
      options: ['0,125', '0,8', '0,25', '0,0125'],
      correctAnswer: '0,125',
      explanation: '1 : 8 = 0 → 0,. 10 : 8 = 1 (m: 2) → 20 : 8 = 2 (m: 4) → 40 : 8 = 5 → 0,125.',
      steps: [
        { label: '1. Tizedek', value: '10 : 8 = 1 (maradék 2)' },
        { label: '2. Századok', value: '20 : 8 = 2 (maradék 4)' },
        { label: '3. Ezredek', value: '40 : 8 = 5 → 0,125' }
      ],
      hint: 'Egy nyolcad (1/8) = 125 ezred = 0,125.',
      formula: '1 : 8 = 0,125'
    },
    {
      id: 'q2-9',
      level: 2,
      question: 'Számítsd ki: 45,6 : 1000 = ?',
      options: ['0,0456', '0,456', '4,56', '0,00456'],
      correctAnswer: '0,0456',
      explanation: '1000-rel osztva 3 hellyel lépünk balra a vesszővel: 45,6 : 1000 = 0,0456.',
      steps: [
        { label: '1. Szabály', value: '3 hellyel balra léptetünk' },
        { label: '2. Nullák pótlása', value: '0045,6 → 0,0456' }
      ],
      hint: '3 lépés balra: 45,6 → 4,56 → 0,456 → 0,0456.',
      formula: '45,6 : 1000 = 0,0456'
    },
    {
      id: 'q2-10',
      level: 2,
      question: '4 egyforma doboz gyümölcslé összesen 7,2 liter. Hány liter egyetlen doboz?',
      options: ['1,8 liter', '1,6 liter', '18 liter', '0,18 liter'],
      correctAnswer: '1,8 liter',
      explanation: '7,2 : 4 = 1,8 liter (7 : 4 = 1, maradék 3 → 32 : 4 = 8 → 1,8).',
      steps: [
        { label: '1. Művelet felírása', value: '7,2 : 4' },
        { label: '2. Osztás elvégzése', value: '7:4 = 1 (m:3) → 32:4 = 8 → 1,8' },
        { label: '3. Végeredmény', value: '1,8 liter' }
      ],
      hint: 'Oszd el a 7,2-t 4-gyel!',
      formula: '7,2 : 4 = 1,8'
    }
  ],

  // 3. SZINT: NEHÉZ (10 feladat) - Kétjegyű egész osztók, összetett műveletek és életszerű feladatok
  3: [
    {
      id: 'q3-1',
      level: 3,
      question: 'Számítsd ki: 37,5 : 15 = ?',
      options: ['2,5', '25', '0,25', '2,25'],
      correctAnswer: '2,5',
      explanation: '37 : 15 = 2, maradék 7. Vessző letétele: 2,, majd 75 : 15 = 5 → 2,5.',
      steps: [
        { label: '1. Egész rész', value: '37 : 15 = 2 (maradék 7) → 2,' },
        { label: '2. Tizedek', value: '75 : 15 = 5 → 2,5' }
      ],
      hint: '37-ben a 15 megvan 2-szer (30), maradt 7. 75-ben a 15 megvan 5-ször.',
      formula: '37,5 : 15 = 2,5'
    },
    {
      id: 'q3-2',
      level: 3,
      question: 'Számítsd ki: 49,2 : 12 = ?',
      options: ['4,1', '41', '0,41', '4,2'],
      correctAnswer: '4,1',
      explanation: '49 : 12 = 4 (maradék 1) → 4,. 12 : 12 = 1 → 4,1.',
      steps: [
        { label: '1. Egész rész', value: '49 : 12 = 4 (maradék 1) → 4,' },
        { label: '2. Tizedek', value: '12 : 12 = 1 → 4,1' }
      ],
      hint: '48 : 12 = 4, és maradt 1,2 : 12 = 0,1 → 4,1.',
      formula: '49,2 : 12 = 4,1'
    },
    {
      id: 'q3-3',
      level: 3,
      question: 'Számítsd ki: 8,4 : 20 = ?',
      options: ['0,42', '4,2', '0,042', '42'],
      correctAnswer: '0,42',
      explanation: '8,4 : 20 = (8,4 : 2) : 10 = 4,2 : 10 = 0,42.',
      steps: [
        { label: '1. Osztás 2-vel', value: '8,4 : 2 = 4,2' },
        { label: '2. Osztás 10-zel', value: '4,2 : 10 = 0,42' }
      ],
      hint: 'Oszd el először 2-vel (4,2), majd 10-zel (0,42)!',
      formula: '8,4 : 20 = 0,42'
    },
    {
      id: 'q3-4',
      level: 3,
      question: 'Számítsd ki: 105 : 25 = ?',
      options: ['4,2', '4,25', '42', '0,42'],
      correctAnswer: '4,2',
      explanation: '105 : 25 = 4 (maradék 5) → 4,. 50 : 25 = 2 → 4,2.',
      steps: [
        { label: '1. Egész rész', value: '105 : 25 = 4 (maradék 5) → 4,' },
        { label: '2. Tizedek', value: '50 : 25 = 2 → 4,2' }
      ],
      hint: '100 : 25 = 4, maradt 5. 50 : 25 = 2 → 4,2.',
      formula: '105 : 25 = 4,2'
    },
    {
      id: 'q3-5',
      level: 3,
      question: 'Számítsd ki: 2,7 : 18 = ?',
      options: ['0,15', '0,18', '1,5', '0,015'],
      correctAnswer: '0,15',
      explanation: '2 : 18 = 0 → 0,. 27 : 18 = 1 (maradék 9). 90 : 18 = 5 → 0,15.',
      steps: [
        { label: '1. Egész rész', value: '2 : 18 = 0 → 0,' },
        { label: '2. Tizedek', value: '27 : 18 = 1 (maradék 9)' },
        { label: '3. Századok', value: '90 : 18 = 5 → 0,15' }
      ],
      hint: '2,7 : 18 = 27 : 180 = 3/20 = 15/100 = 0,15.',
      formula: '2,7 : 18 = 0,15'
    },
    {
      id: 'q3-6',
      level: 3,
      question: 'Számítsd ki: 54,6 : 14 = ?',
      options: ['3,9', '39', '0,39', '3,8'],
      correctAnswer: '3,9',
      explanation: '54 : 14 = 3 (maradék 12) → 3,. 126 : 14 = 9 → 3,9.',
      steps: [
        { label: '1. Egész rész', value: '54 : 14 = 3 (maradék 12) → 3,' },
        { label: '2. Tizedek', value: '126 : 14 = 9 → 3,9' }
      ],
      hint: '3 · 14 = 42, 54 - 42 = 12. 126 : 14 = 9.',
      formula: '54,6 : 14 = 3,9'
    },
    {
      id: 'q3-7',
      level: 3,
      question: 'Számítsd ki: 96,6 : 21 = ?',
      options: ['4,6', '46', '0,46', '4,3'],
      correctAnswer: '4,6',
      explanation: '96 : 21 = 4 (maradék 12) → 4,. 126 : 21 = 6 → 4,6.',
      steps: [
        { label: '1. Egész rész', value: '96 : 21 = 4 (maradék 12) → 4,' },
        { label: '2. Tizedek', value: '126 : 21 = 6 → 4,6' }
      ],
      hint: '4 · 21 = 84, 96 - 84 = 12. 126 : 21 = 6.',
      formula: '96,6 : 21 = 4,6'
    },
    {
      id: 'q3-8',
      level: 3,
      question: 'Számítsd ki a műveleti sorrend betartásával: 14,7 : 3 + 2,5 · 4 = ?',
      options: ['14,9', '15', '16,2', '14,4'],
      correctAnswer: '14,9',
      explanation: 'Elvégezzük az osztást és a szorzást: 14,7 : 3 = 4,9 és 2,5 · 4 = 10. Összeadva: 4,9 + 10 = 14,9.',
      steps: [
        { label: '1. Osztás', value: '14,7 : 3 = 4,9' },
        { label: '2. Szorzás', value: '2,5 · 4 = 10' },
        { label: '3. Összeadás', value: '4,9 + 10 = 14,9' }
      ],
      hint: 'Először a szorzás és osztás, majd az összeadás: 4,9 + 10.',
      formula: '14,7 : 3 + 2,5 · 4 = 14,9'
    },
    {
      id: 'q3-9',
      level: 3,
      question: '5 méter faanyag ára 687,50 Ft. Mennyibe kerül 1 méter ebből a fából?',
      options: ['137,5 Ft', '135,5 Ft', '1375 Ft', '13,75 Ft'],
      correctAnswer: '137,5 Ft',
      explanation: '687,5 : 5 = 137,5 Ft (687 : 5 = 137, maradék 2 → 25 : 5 = 5 → 137,5).',
      steps: [
        { label: '1. Művelet', value: '687,5 : 5' },
        { label: '2. Osztás', value: '687:5 = 137 (m:2) → 25:5 = 5 → 137,5' },
        { label: '3. Végeredmény', value: '137,5 Ft' }
      ],
      hint: 'Oszd el a 687,5-et 5-tel!',
      formula: '687,5 : 5 = 137,5'
    },
    {
      id: 'q3-10',
      level: 3,
      question: 'Egy 18,6 méteres kötelet 6 egyenlő részre vágnak. Milyen hosszú egyetlen darab kötél?',
      options: ['3,1 méter', '31 méter', '0,31 méter', '3,6 méter'],
      correctAnswer: '3,1 méter',
      explanation: '18,6 : 6 = 3,1 méter (18 : 6 = 3, vessző, majd 6 : 6 = 1 → 3,1).',
      steps: [
        { label: '1. Művelet felírása', value: '18,6 : 6' },
        { label: '2. Osztás', value: '18:6 = 3, 6:6 = 1 → 3,1' },
        { label: '3. Végeredmény', value: '3,1 méter' }
      ],
      hint: '18 : 6 = 3 és 0,6 : 6 = 0,1 → 3,1 méter.',
      formula: '18,6 : 6 = 3,1'
    }
  ]
};

export const DecimalDivisionQuiz: React.FC<DecimalDivisionQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      title="Tizedes tört osztása pozitív egész számmal kvíz"
      subtitle="Gyakorold a 10, 100, 1000-rel és természetes számokkal való osztást 3 nehézségi szinten!"
      questions={decimalDivisionQuestions}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      topicId="g5-decimal-divide-quiz"
      themeColor="indigo"
      renderMatcher={(matcherProps) => (
        <DecimalDivisionMatcher
          {...matcherProps}
          onBack={matcherProps.onBack}
          onSwitchToQuiz={matcherProps.onSwitchToQuiz}
          onSwitchToSorter={matcherProps.onSwitchToSorter}
          onSwitchToTheory={onSwitchToTheory}
        />
      )}
      renderSorter={(sorterProps) => (
        <DecimalDivisionSorter
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
export default DecimalDivisionQuiz;
