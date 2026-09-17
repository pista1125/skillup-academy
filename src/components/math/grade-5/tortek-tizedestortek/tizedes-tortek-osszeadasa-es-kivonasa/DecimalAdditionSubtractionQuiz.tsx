import React from 'react';
import { QuizTemplate, Question, DifficultyLevel } from '../QuizTemplate';
import { DecimalAdditionSubtractionMatcher } from './DecimalAdditionSubtractionMatcher';
import { DecimalAdditionSubtractionSorter } from './DecimalAdditionSubtractionSorter';

export interface DecimalAdditionSubtractionQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

export const decimalAdditionSubtractionQuestions: Record<DifficultyLevel, Question[]> = {
  // 1. SZINT: KÖNNYŰ (10 feladat) - Egyszerű, átlépés nélküli összeadás és kivonás
  1: [
    {
      id: 'q1-1',
      level: 1,
      question: 'Számítsd ki a művelet eredményét: 3,4 + 2,5 = ?',
      options: ['5,9', '5,8', '6,1', '5,10'],
      correctAnswer: '5,9',
      explanation: 'Összeadjuk a tizedeket: 4 + 5 = 9 tized. Összeadjuk az egészeket: 3 + 2 = 5 egész. Eredmény: 5,9.',
      steps: [
        { label: '1. Tizedek összege', value: '4 tized + 5 tized = 9 tized (0,9)' },
        { label: '2. Egészek összege', value: '3 egész + 2 egész = 5 egész' },
        { label: '3. Végeredmény', value: '5,9' }
      ],
      hint: 'Add össze külön az egész részeket és a tizedeket!',
      formula: '3,4 + 2,5 = 5,9'
    },
    {
      id: 'q1-2',
      level: 1,
      question: 'Számítsd ki a különbséget: 6,8 - 2,3 = ?',
      options: ['4,5', '4,3', '4,8', '5,5'],
      correctAnswer: '4,5',
      explanation: 'A tizedekből kivonjuk a tizedeket: 8 - 3 = 5 tized. Az egészekből az egészeket: 6 - 2 = 4 egész. Eredmény: 4,5.',
      steps: [
        { label: '1. Tizedek különbsége', value: '8 tized - 3 tized = 5 tized' },
        { label: '2. Egészek különbsége', value: '6 egész - 2 egész = 4 egész' },
        { label: '3. Végeredmény', value: '4,5' }
      ],
      hint: 'Vonj ki tizedet a tizedből, egészet az egészből!',
      formula: '6,8 - 2,3 = 4,5'
    },
    {
      id: 'q1-3',
      level: 1,
      question: 'Számítsd ki: 0,4 + 0,35 = ?',
      options: ['0,75', '0,39', '0,435', '0,85'],
      correctAnswer: '0,75',
      explanation: 'A 0,4 tizedet kiegészítjük nullával századokig: 0,40. Így 0,40 + 0,35 = 0,75.',
      steps: [
        { label: '1. Nullák pótlása', value: '0,4 = 0,40' },
        { label: '2. Összeadás', value: '0,40 + 0,35 = 0,75' }
      ],
      hint: 'Pótolj egy 0-t a 0,4 végére: 40 század + 35 század.',
      formula: '0,40 + 0,35 = 0,75'
    },
    {
      id: 'q1-4',
      level: 1,
      question: 'Mennyi az 1,0 - 0,4 kivonás eredménye?',
      options: ['0,6', '0,4', '1,4', '0,7'],
      correctAnswer: '0,6',
      explanation: '1 egész az 10 tized. 10 tizedből kivonva 4 tizedet 6 tizedet kapunk (0,6).',
      steps: [
        { label: '1. Átváltás tizedekre', value: '1,0 = 10 tized' },
        { label: '2. Kivonás', value: '10 tized - 4 tized = 6 tized' },
        { label: '3. Eredmény', value: '0,6' }
      ],
      hint: '1 egészből vegyél el 4 tizedet!',
      formula: '1,0 - 0,4 = 0,6'
    },
    {
      id: 'q1-5',
      level: 1,
      question: 'Mi a legfontosabb aranyszabály a tizedes törtek írásbeli összeadásakor és kivonásakor?',
      options: [
        'A tizedesvesszőknek pontosan egymás alá kell kerülniük',
        'Mindig a számok jobb szélét kell egymáshoz igazítani',
        'A tizedesvesszőt el kell hagyni a számolás során',
        'Csak egész számokat szabad összeadni'
      ],
      correctAnswer: 'A tizedesvesszőknek pontosan egymás alá kell kerülniük',
      explanation: 'Csak az azonos helyiértékeket adhatjuk össze és vonhatjuk ki egymásból, ezért a tizedesvesszőknek pontosan egymás alá kell kerülniük.',
      steps: [
        { label: '1. Aranyszabály', value: 'Vessző a vessző alá!' },
        { label: '2. Cél', value: 'Azonos helyiértékek pontos egymás alá illesztése' }
      ],
      hint: 'Gondolj arra, hogy tizedet csak tizedhez adhatsz hozzá.',
      formula: 'vessző a vessző alá'
    },
    {
      id: 'q1-6',
      level: 1,
      question: 'Számítsd ki: 5,2 + 3,7 = ?',
      options: ['8,9', '8,7', '9,0', '8,10'],
      correctAnswer: '8,9',
      explanation: '2 tized + 7 tized = 9 tized; 5 egész + 3 egész = 8 egész. Eredmény: 8,9.',
      steps: [
        { label: '1. Tizedek', value: '2 + 7 = 9' },
        { label: '2. Egészek', value: '5 + 3 = 8' },
        { label: '3. Végeredmény', value: '8,9' }
      ],
      hint: 'Átlépés nélküli összeadás: 5,2 + 3,7.',
      formula: '5,2 + 3,7 = 8,9'
    },
    {
      id: 'q1-7',
      level: 1,
      question: 'Számítsd ki: 9,6 - 5,4 = ?',
      options: ['4,2', '4,4', '3,2', '5,2'],
      correctAnswer: '4,2',
      explanation: '6 tized - 4 tized = 2 tized; 9 egész - 5 egész = 4 egész. Eredmény: 4,2.',
      steps: [
        { label: '1. Tizedek', value: '6 - 4 = 2' },
        { label: '2. Egészek', value: '9 - 5 = 4' },
        { label: '3. Végeredmény', value: '4,2' }
      ],
      hint: 'Egyszerű kivonás helyiértékenként.',
      formula: '9,6 - 5,4 = 4,2'
    },
    {
      id: 'q1-8',
      level: 1,
      question: 'Mennyi a 0,6 + 0,4 összeadás eredménye?',
      options: ['1,0 (vagy 1)', '0,10', '0,8', '1,2'],
      correctAnswer: '1,0 (vagy 1)',
      explanation: '6 tized + 4 tized = 10 tized = 1 egész (1,0).',
      steps: [
        { label: '1. Tizedek összege', value: '6 + 4 = 10 tized' },
        { label: '2. Átváltás egészre', value: '10 tized = 1 egész (1,0)' }
      ],
      hint: '6 tized meg 4 tized éppen 10 tized, vagyis 1 egész.',
      formula: '0,6 + 0,4 = 1,0'
    },
    {
      id: 'q1-9',
      level: 1,
      question: 'Számítsd ki: 4,55 + 0,05 = ?',
      options: ['4,60 (4,6)', '4,50', '4,65', '5,00'],
      correctAnswer: '4,60 (4,6)',
      explanation: '55 század + 5 század = 60 század = 6 tized. Eredmény: 4,60 = 4,6.',
      steps: [
        { label: '1. Századok összege', value: '55 + 5 = 60 század' },
        { label: '2. Végeredmény', value: '4 egész 60 század = 4,6' }
      ],
      hint: '55 századhoz adj 5 századot!',
      formula: '4,55 + 0,05 = 4,60 = 4,6'
    },
    {
      id: 'q1-10',
      level: 1,
      question: 'Számítsd ki: 7,8 - 4,8 = ?',
      options: ['3,0 (vagy 3)', '3,8', '2,8', '4,0'],
      correctAnswer: '3,0 (vagy 3)',
      explanation: '8 tized - 8 tized = 0 tized; 7 - 4 = 3 egész. Eredmény: 3,0 = 3.',
      steps: [
        { label: '1. Tizedek', value: '8 - 8 = 0' },
        { label: '2. Egészek', value: '7 - 4 = 3' },
        { label: '3. Végeredmény', value: '3,0 = 3' }
      ],
      hint: 'A tizedek kiejtik egymást, pontosan 3 egész marad.',
      formula: '7,8 - 4,8 = 3,0 = 3'
    }
  ],

  // 2. SZINT: KÖZEPES (10 feladat) - Átlépéses műveletek, nullák pótlása, becslés
  2: [
    {
      id: 'q2-1',
      level: 2,
      question: 'Számítsd ki az átlépéses összeadást: 4,8 + 3,7 = ?',
      options: ['8,5', '7,5', '8,15', '7,15'],
      correctAnswer: '8,5',
      explanation: '8 + 7 = 15 tized = 1 egész 5 tized. Az egészeknél 4 + 3 + 1 = 8 egész. Eredmény: 8,5.',
      steps: [
        { label: '1. Tizedek összege', value: '8 + 7 = 15 (leírom az 5-öt, maradt 1 egész)' },
        { label: '2. Egészek összege', value: '4 + 3 + 1 = 8' },
        { label: '3. Végeredmény', value: '8,5' }
      ],
      hint: '8 + 7 = 15, maradt az 1 egész az egészekhez!',
      formula: '4,8 + 3,7 = 8,5'
    },
    {
      id: 'q2-2',
      level: 2,
      question: 'Számítsd ki a kölcsönzéses kivonást: 8,2 - 3,7 = ?',
      options: ['4,5', '5,5', '4,7', '5,7'],
      correctAnswer: '4,5',
      explanation: '2 tizedből nem lehet 7-et kivonni. Kölcsönveszünk 1 egészet: 12 - 7 = 5 tized. Az egészeknél 7 - 3 = 4 egész. Eredmény: 4,5.',
      steps: [
        { label: '1. Tizedek kivonása', value: '12 - 7 = 5 (maradt 1 a levonáshoz)' },
        { label: '2. Egészek kivonása', value: '8 - 3 - 1 = 4' },
        { label: '3. Végeredmény', value: '4,5' }
      ],
      hint: '7-hez hogy 12 legyen kell az 5, maradt 1.',
      formula: '8,2 - 3,7 = 4,5'
    },
    {
      id: 'q2-3',
      level: 2,
      question: 'Számítsd ki: 12,4 - 4,75 = ?',
      options: ['7,65', '8,65', '7,35', '8,35'],
      correctAnswer: '7,65',
      explanation: 'A 12,4-et kiegészítjük nullával: 12,40. Így 12,40 - 4,75 = 7,65.',
      steps: [
        { label: '1. Nullák pótlása', value: '12,4 = 12,40' },
        { label: '2. Írásbeli kivonás', value: '12,40 - 4,75' },
        { label: '3. Végeredmény', value: '7,65' }
      ],
      hint: 'Pótolj nullát a 12,4 végére: 12,40 - 4,75.',
      formula: '12,40 - 4,75 = 7,65'
    },
    {
      id: 'q2-4',
      level: 2,
      question: 'Számítsd ki: 5 - 2,34 = ?',
      options: ['2,66', '3,34', '3,66', '2,34'],
      correctAnswer: '2,66',
      explanation: 'Az 5 egész tizedes tört alakja 5,00. Elvégezve a kivonást: 5,00 - 2,34 = 2,66.',
      steps: [
        { label: '1. Egész átírása tizedessé', value: '5 = 5,00' },
        { label: '2. Írásbeli kivonás', value: '5,00 - 2,34' },
        { label: '3. Végeredmény', value: '2,66' }
      ],
      hint: 'Írd fel az 5-öt 5,00-ként, és úgy vond ki a 2,34-et!',
      formula: '5,00 - 2,34 = 2,66'
    },
    {
      id: 'q2-5',
      level: 2,
      question: 'Számítsd ki: 6,85 + 2,4 = ?',
      options: ['9,25', '8,89', '9,29', '8,25'],
      correctAnswer: '9,25',
      explanation: 'Pótoljuk a nullát: 6,85 + 2,40. 85 + 40 = 125 század = 1 egész 25 század. 6 + 2 + 1 = 9 egész. Eredmény: 9,25.',
      steps: [
        { label: '1. Nullák pótlása', value: '2,4 = 2,40' },
        { label: '2. Összeadás', value: '6,85 + 2,40 = 9,25' }
      ],
      hint: 'Vigyázz: 2,4 az 2,40-et jelent!',
      formula: '6,85 + 2,40 = 9,25'
    },
    {
      id: 'q2-6',
      level: 2,
      question: 'Mennyi a 10 - 3,65 kivonás pontos értéke?',
      options: ['6,35', '7,35', '6,45', '7,45'],
      correctAnswer: '6,35',
      explanation: '10 = 10,00. 10,00 - 3,65 = 6,35.',
      steps: [
        { label: '1. Nullák pótlása', value: '10 = 10,00' },
        { label: '2. Kivonás', value: '10,00 - 3,65 = 6,35' }
      ],
      hint: '10,00-ból vonj ki 3,65-öt!',
      formula: '10,00 - 3,65 = 6,35'
    },
    {
      id: 'q2-7',
      level: 2,
      question: 'Becsüld meg az összeget a számok egészre kerekítésével: 19,8 + 31,4 ≈ ?',
      options: ['20 + 31 = 51', '19 + 31 = 50', '20 + 32 = 52', '19 + 32 = 51'],
      correctAnswer: '20 + 31 = 51',
      explanation: '19,8 egészre kerekítve 20, a 31,4 egészre kerekítve 31. A becsült összeg 20 + 31 = 51.',
      steps: [
        { label: '1. 19,8 kerekítése', value: '19,8 ≈ 20' },
        { label: '2. 31,4 kerekítése', value: '31,4 ≈ 31' },
        { label: '3. Becsült összeg', value: '20 + 31 = 51' }
      ],
      hint: 'Kerekítsd mindkét számot a legközelebbi egészre!',
      formula: '19,8 + 31,4 ≈ 20 + 31 = 51'
    },
    {
      id: 'q2-8',
      level: 2,
      question: 'Számítsd ki: 7,6 + 8,9 = ?',
      options: ['16,5', '15,5', '16,15', '15,15'],
      correctAnswer: '16,5',
      explanation: '6 + 9 = 15 tized = 1 egész 5 tized; 7 + 8 + 1 = 16 egész. Eredmény: 16,5.',
      steps: [
        { label: '1. Tizedek', value: '6 + 9 = 15 (5 tized, maradt 1 egész)' },
        { label: '2. Egészek', value: '7 + 8 + 1 = 16' },
        { label: '3. Végeredmény', value: '16,5' }
      ],
      hint: 'Ne felejtsd el az 1 egész átvitelt hozzáadni!',
      formula: '7,6 + 8,9 = 16,5'
    },
    {
      id: 'q2-9',
      level: 2,
      question: 'Számítsd ki: 15,3 - 8,85 = ?',
      options: ['6,45', '7,45', '6,55', '7,55'],
      correctAnswer: '6,45',
      explanation: '15,30 - 8,85 = 6,45.',
      steps: [
        { label: '1. Nullák pótlása', value: '15,3 = 15,30' },
        { label: '2. Kivonás', value: '15,30 - 8,85 = 6,45' }
      ],
      hint: 'Pótolj 0-t: 15,30 - 8,85.',
      formula: '15,30 - 8,85 = 6,45'
    },
    {
      id: 'q2-10',
      level: 2,
      question: 'Péter 3,45 kg almát és 1,8 kg körtét vásárolt a piacon. Hány kg gyümölcsöt vásárolt összesen?',
      options: ['5,25 kg', '4,25 kg', '5,53 kg', '4,53 kg'],
      correctAnswer: '5,25 kg',
      explanation: '3,45 + 1,8 = 3,45 + 1,80 = 5,25 kg.',
      steps: [
        { label: '1. Művelet felírása', value: '3,45 + 1,80' },
        { label: '2. Összeadás', value: '3,45 + 1,80 = 5,25 kg' }
      ],
      hint: 'Add össze a két tömeget: 3,45 + 1,80.',
      formula: '3,45 + 1,80 = 5,25'
    }
  ],

  // 3. SZINT: NEHÉZ (10 feladat) - Ezredes műveletek, szöveges feladatok, egyenletek
  3: [
    {
      id: 'q3-1',
      level: 3,
      question: 'Számítsd ki: 14,65 + 8,786 = ?',
      options: ['23,436', '23,336', '22,436', '23,446'],
      correctAnswer: '23,436',
      explanation: '14,650 + 8,786 = 23,436.',
      steps: [
        { label: '1. Nullák kiegészítése ezredekig', value: '14,65 = 14,650' },
        { label: '2. Írásbeli összeadás', value: '14,650 + 8,786' },
        { label: '3. Végeredmény', value: '23,436' }
      ],
      hint: 'Egészítsd ki a 14,65-öt ezredekig nullával: 14,650.',
      formula: '14,650 + 8,786 = 23,436'
    },
    {
      id: 'q3-2',
      level: 3,
      question: 'Számítsd ki: 25,1 - 9,485 = ?',
      options: ['15,615', '16,615', '15,715', '16,715'],
      correctAnswer: '15,615',
      explanation: '25,100 - 9,485 = 15,615.',
      steps: [
        { label: '1. Nullák pótlása', value: '25,1 = 25,100' },
        { label: '2. Írásbeli kivonás', value: '25,100 - 9,485' },
        { label: '3. Végeredmény', value: '15,615' }
      ],
      hint: 'Írj két nullát a 25,1 végére: 25,100 - 9,485.',
      formula: '25,100 - 9,485 = 15,615'
    },
    {
      id: 'q3-3',
      level: 3,
      question: 'Mennyi a 0,785 + 0,215 művelet pontos eredménye?',
      options: ['1,000 (vagy 1)', '0,990', '1,100', '0,900'],
      correctAnswer: '1,000 (vagy 1)',
      explanation: '785 ezred + 215 ezred = 1000 ezred = 1 egész (1,000 = 1).',
      steps: [
        { label: '1. Ezredek összege', value: '785 + 215 = 1000 ezred' },
        { label: '2. Átváltás egészre', value: '1000 ezred = 1 egész' }
      ],
      hint: '785 + 215 = 1000, azaz pontosan 1 egész.',
      formula: '0,785 + 0,215 = 1,000 = 1'
    },
    {
      id: 'q3-4',
      level: 3,
      question: 'Számítsd ki: 50 - 18,475 = ?',
      options: ['31,525', '32,525', '31,625', '32,625'],
      correctAnswer: '31,525',
      explanation: '50,000 - 18,475 = 31,525.',
      steps: [
        { label: '1. Nullák pótlása', value: '50 = 50,000' },
        { label: '2. Kivonás', value: '50,000 - 18,475 = 31,525' }
      ],
      hint: '50,000-ból vonj ki 18,475-öt!',
      formula: '50,000 - 18,475 = 31,525'
    },
    {
      id: 'q3-5',
      level: 3,
      question: 'Számítsd ki a három tizedes tört összegét: 4,5 + 2,35 + 1,15 = ?',
      options: ['8,0', '7,9', '8,1', '8,05'],
      correctAnswer: '8,0',
      explanation: 'Érdemes csoportosítani: 2,35 + 1,15 = 3,50. Ezután 4,5 + 3,5 = 8,0.',
      steps: [
        { label: '1. Csoportosítás', value: '2,35 + 1,15 = 3,50' },
        { label: '2. További összeadás', value: '4,50 + 3,50 = 8,00 = 8,0' }
      ],
      hint: 'Add össze először a 2,35-öt és az 1,15-öt, mert kerek értéket adnak!',
      formula: '4,5 + (2,35 + 1,15) = 4,5 + 3,5 = 8,0'
    },
    {
      id: 'q3-6',
      level: 3,
      question: 'Egy 20 méteres szalagból levágtak egy 4,65 méteres és egy 8,7 méteres darabot. Hány méter szalag maradt?',
      options: ['6,65 m', '7,65 m', '6,75 m', '7,75 m'],
      correctAnswer: '6,65 m',
      explanation: 'A levágott részek összege: 4,65 + 8,70 = 13,35 m. A megmaradt szalag: 20,00 - 13,35 = 6,65 m.',
      steps: [
        { label: '1. Levágott részek összege', value: '4,65 + 8,70 = 13,35 m' },
        { label: '2. Kivonás a teljes hosszból', value: '20,00 - 13,35 = 6,65 m' }
      ],
      hint: 'Számold ki a levágott darabok összegét, majd vond ki a 20-ból!',
      formula: '20 - (4,65 + 8,7) = 20 - 13,35 = 6,65'
    },
    {
      id: 'q3-7',
      level: 3,
      question: 'Melyik szám hiányzik az egyenletből: x + 6,85 = 15,2 ?',
      options: ['8,35', '9,35', '8,45', '9,45'],
      correctAnswer: '8,35',
      explanation: 'x = 15,2 - 6,85 = 15,20 - 6,85 = 8,35.',
      steps: [
        { label: '1. Ismeretlen kifejezése', value: 'x = 15,20 - 6,85' },
        { label: '2. Kivonás elvégzése', value: 'x = 8,35' },
        { label: '3. Ellenőrzés', value: '8,35 + 6,85 = 15,20' }
      ],
      hint: 'A keresett számot úgy kapod meg, ha az összegből kivonod az ismert tagot.',
      formula: 'x = 15,20 - 6,85 = 8,35'
    },
    {
      id: 'q3-8',
      level: 3,
      question: 'Melyik szám hiányzik az egyenletből: 20,4 - y = 7,65 ?',
      options: ['12,75', '13,75', '12,85', '13,85'],
      correctAnswer: '12,75',
      explanation: 'y = 20,4 - 7,65 = 20,40 - 7,65 = 12,75.',
      steps: [
        { label: '1. Kivonandó kifejezése', value: 'y = 20,40 - 7,65' },
        { label: '2. Kivonás elvégzése', value: 'y = 12,75' },
        { label: '3. Ellenőrzés', value: '20,40 - 12,75 = 7,65' }
      ],
      hint: 'A kivonandót a kisebbítendő és a különbség különbségeként kapjuk meg.',
      formula: 'y = 20,40 - 7,65 = 12,75'
    },
    {
      id: 'q3-9',
      level: 3,
      question: 'Egy tartályban 45,5 liter víz volt. Kiengedtek belőle 12,75 litert, majd hozzáöntöttek 8,4 litert. Hány liter víz van most a tartályban?',
      options: ['41,15 liter', '40,15 liter', '41,25 liter', '42,15 liter'],
      correctAnswer: '41,15 liter',
      explanation: '45,50 - 12,75 = 32,75 liter. Ezután 32,75 + 8,40 = 41,15 liter.',
      steps: [
        { label: '1. Kiengedés után', value: '45,50 - 12,75 = 32,75 liter' },
        { label: '2. Hozzáöntés után', value: '32,75 + 8,40 = 41,15 liter' }
      ],
      hint: 'Végezd el lépésről lépésre a kivonást, majd az összeadást!',
      formula: '45,5 - 12,75 + 8,4 = 32,75 + 8,4 = 41,15'
    },
    {
      id: 'q3-10',
      level: 3,
      question: 'Számítsd ki a kifejezés értékét: (15,4 - 6,85) + (10 - 3,45) = ?',
      options: ['15,1', '14,1', '15,2', '16,1'],
      correctAnswer: '15,1',
      explanation: 'Első zárójel: 15,40 - 6,85 = 8,55. Második zárójel: 10,00 - 3,45 = 6,55. Összegük: 8,55 + 6,55 = 15,10 = 15,1.',
      steps: [
        { label: '1. Első zárójel', value: '15,40 - 6,85 = 8,55' },
        { label: '2. Második zárójel', value: '10,00 - 3,45 = 6,55' },
        { label: '3. Összeg', value: '8,55 + 6,55 = 15,10 = 15,1' }
      ],
      hint: 'Számold ki külön a két zárójel értékét, majd add őket össze!',
      formula: '8,55 + 6,55 = 15,1'
    }
  ]
};

export function DecimalAdditionSubtractionQuiz({ onBack, onSwitchToTheory }: DecimalAdditionSubtractionQuizProps) {
  return (
    <QuizTemplate
      title="Tizedes törtek összeadása és kivonása kvíz"
      subtitle="Mérd fel a tudásodat a tizedes törtek írásbeli műveleteiről, nullák kiegészítéséről és szöveges feladatairól 30 feladaton keresztül!"
      badge="➕➖ 5. Osztály • Tizedes törtek"
      topicId="g5-decimal-add-sub-quiz"
      category="decimal-fractions-add-sub"
      grade={5}
      questions={decimalAdditionSubtractionQuestions}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      themeColor="cyan"
      renderMatcher={({ level, onNextLevel, onOpenRules }) => (
        <DecimalAdditionSubtractionMatcher
          level={level}
          onNextLevel={onNextLevel}
          onOpenRules={onOpenRules}
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      )}
      renderSorter={({ level, onNextLevel, onOpenRules }) => (
        <DecimalAdditionSubtractionSorter
          level={level}
          onNextLevel={onNextLevel}
          onOpenRules={onOpenRules}
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      )}
    />
  );
}

export default DecimalAdditionSubtractionQuiz;
