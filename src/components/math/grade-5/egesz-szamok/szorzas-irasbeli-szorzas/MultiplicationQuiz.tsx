import React from 'react';
import { QuizTemplate, Question, CheatSheetSection } from '../QuizTemplate';
import { MultiplicationMatcher } from './MultiplicationMatcher';
import { MultiplicationSorter } from './MultiplicationSorter';

export interface MultiplicationQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const multiplicationQuestions: Question[] = [
  // ==========================================
  // LEVEL 1: Fejszámolás, szorzótábla, 0, 1 és 10 hatványai (10 kérdés)
  // ==========================================
  {
    id: 'mul-l1-q1',
    level: 1,
    question: 'A 24 · 5 = 120 műveletben melyik szám a SZORZAT?',
    highlightValue: '24 · 5 = 120',
    options: ['120', '24', '5', 'Egyik sem'],
    correctAnswer: 0,
    hint: 'A szorzat a szorzás végeredménye.',
    explanation: 'A szorzás tagjai: 1. tényező (24) · 2. tényező (5) = Szorzat (120).',
    breakdown: [
      { label: 'Tényezők', value: '24 és 5' },
      { label: 'Szorzat (eredmény)', value: '120' }
    ]
  },
  {
    id: 'mul-l1-q2',
    level: 1,
    question: 'Mennyi a 45 · 10 szorzás eredménye?',
    highlightValue: '45 · 10',
    options: ['450', '4 500', '45', '55'],
    correctAnswer: 0,
    hint: '10-zel szorozva a szám végére egyetlen nullát írunk.',
    explanation: '45 · 10 = 450.',
    breakdown: [
      { label: 'Szabály', value: '1 nullával bővül' },
      { label: 'Eredmény', value: '450' }
    ]
  },
  {
    id: 'mul-l1-q3',
    level: 1,
    question: 'Mennyi a 72 · 100 szorzás eredménye?',
    highlightValue: '72 · 100',
    options: ['7 200', '720', '72 000', '702'],
    correctAnswer: 0,
    hint: '100-zal szorozva a szám végére két nullát írunk.',
    explanation: '72 · 100 = 7 200.',
    breakdown: [
      { label: 'Szabály', value: '2 nullával bővül' },
      { label: 'Eredmény', value: '7 200' }
    ]
  },
  {
    id: 'mul-l1-q4',
    level: 1,
    question: 'Mit kapunk, ha egy számot 0-val szorzunk (a · 0)?',
    highlightValue: 'a · 0',
    options: ['0', 'a', '1', 'Nem értelmezhető'],
    correctAnswer: 0,
    hint: 'Ha 0 darab van valamiből, az semmi.',
    explanation: 'Bármely számot 0-val szorozva az eredmény mindig 0: a · 0 = 0.',
    breakdown: [
      { label: 'Alapszabály', value: 'a · 0 = 0' },
      { label: 'Példa', value: '876 · 0 = 0' }
    ]
  },
  {
    id: 'mul-l1-q5',
    level: 1,
    question: 'Mit kapunk, ha egy számot 1-gyel szorzunk (a · 1)?',
    highlightValue: 'a · 1',
    options: ['Önmagát (a)', '1-et', '0-t', 'a + 1-et'],
    correctAnswer: 0,
    hint: 'Az 1 a szorzás semleges eleme.',
    explanation: 'Bármely szám 1-szerese önmaga: a · 1 = a.',
    breakdown: [
      { label: 'Alapszabály', value: 'a · 1 = a' },
      { label: 'Példa', value: '542 · 1 = 542' }
    ]
  },
  {
    id: 'mul-l1-q6',
    level: 1,
    question: 'Mennyi a 14 · 30 szorzás értéke fejben?',
    highlightValue: '14 · 30',
    options: ['420', '430', '320', '4 200'],
    correctAnswer: 0,
    hint: 'Először 14 · 3 = 42, majd a végére egy 0.',
    explanation: '14 · 3 = 42, 42 · 10 = 420.',
    breakdown: [
      { label: '1. lépés', value: '14 · 3 = 42' },
      { label: '2. lépés', value: '42 · 10 = 420' }
    ]
  },
  {
    id: 'mul-l1-q7',
    level: 1,
    question: 'Melyik szorzat értéke pontosan 100?',
    highlightValue: 'Szorzat = 100',
    options: ['25 · 4', '15 · 6', '35 · 3', '20 · 6'],
    correctAnswer: 0,
    hint: '4 darab 25-ös pontosan 100.',
    explanation: '25 · 4 = 100. (15 · 6 = 90, 35 · 3 = 105, 20 · 6 = 120).',
    breakdown: [
      { label: 'Számolás', value: '25 · 4 = 100' }
    ]
  },
  {
    id: 'mul-l1-q8',
    level: 1,
    question: 'Melyik azonosság fejezi ki a szorzás FELCSERÉLHETŐSÉGÉT?',
    highlightValue: 'Felcserélhetőség',
    options: ['a · b = b · a', '(a · b) · c = a · (b · c)', 'a · (b + c) = a·b + a·c', 'a · 1 = a'],
    correctAnswer: 0,
    hint: 'A tényezők sorrendje felcserélhető.',
    explanation: 'A kommutativitás képlete: a · b = b · a.',
    breakdown: [
      { label: 'Szabály', value: 'a · b = b · a' }
    ]
  },
  {
    id: 'mul-l1-q9',
    level: 1,
    question: 'Mennyi a 80 · 50 szorzás értéke?',
    highlightValue: '80 · 50',
    options: ['4 000', '400', '40 000', '450'],
    correctAnswer: 0,
    hint: '8 · 5 = 40, és utána 2 nullát írunk.',
    explanation: '8 · 5 = 40 ⟹ 40 után 2 nulla = 4 000.',
    breakdown: [
      { label: 'Alapszorzat', value: '8 · 5 = 40' },
      { label: 'Nullák', value: '40 + két 0 = 4 000' }
    ]
  },
  {
    id: 'mul-l1-q10',
    level: 1,
    question: 'Mennyi a 125 · 8 értéke fejben?',
    highlightValue: '125 · 8',
    options: ['1 000', '100', '10 000', '900'],
    correctAnswer: 0,
    hint: '125 · 2 = 250, 250 · 4 = 1000.',
    explanation: '125 · 8 = 1 000 (fontos kerek szorzópár!).',
    breakdown: [
      { label: 'Bontás', value: '125 · 2 · 4 = 250 · 4 = 1 000' }
    ]
  },

  // ==========================================
  // LEVEL 2: Írásbeli szorzás egyjegyűvel, széttagolás (10 kérdés)
  // ==========================================
  {
    id: 'mul-l2-q1',
    level: 2,
    question: 'Mennyi a 348 · 6 írásbeli szorzás eredménye?',
    highlightValue: '348 · 6',
    options: ['2 088', '2 078', '1 988', '2 188'],
    correctAnswer: 0,
    hint: '6 · 8 = 48 (m 4); 6 · 4 = 24 + 4 = 28 (m 2); 6 · 3 = 18 + 2 = 20.',
    explanation: 'Egyesek: 8 (m 4), Tízesek: 8 (m 2), Százasok: 20. Eredmény: 2 088.',
    breakdown: [
      { label: '6 · 8', value: '48 ⟹ 8, maradt 4' },
      { label: '6 · 4 + 4', value: '28 ⟹ 8, maradt 2' },
      { label: '6 · 3 + 2', value: '20 ⟹ 20' }
    ]
  },
  {
    id: 'mul-l2-q2',
    level: 2,
    question: 'Hogyan számoljuk ki gyorsan a 6 · 23 szorzatot széttagolással?',
    highlightValue: '6 · (20 + 3)',
    options: ['6 · 20 + 6 · 3 = 120 + 18 = 138', '6 · 20 + 3 = 123', '6 · 2 + 3 = 15', '6 · 20 · 3 = 360'],
    correctAnswer: 0,
    hint: 'Mindkét tagot megszorozzuk 6-tal és összeadjuk.',
    explanation: '6 · 20 = 120, 6 · 3 = 18. 120 + 18 = 138.',
    breakdown: [
      { label: 'Széttagolás', value: '6 · 20 = 120 és 6 · 3 = 18' },
      { label: 'Összeg', value: '120 + 18 = 138' }
    ]
  },
  {
    id: 'mul-l2-q3',
    level: 2,
    question: 'Mennyi a 475 · 4 írásbeli szorzás értéke?',
    highlightValue: '475 · 4',
    options: ['1 900', '1 800', '1 950', '2 000'],
    correctAnswer: 0,
    hint: '4 · 400 = 1600, 4 · 75 = 300. 1600 + 300 = ?',
    explanation: '4 · 5 = 20 (m 2); 4 · 7 = 28 + 2 = 30 (m 3); 4 · 4 = 16 + 3 = 19. Eredmény: 1 900.',
    breakdown: [
      { label: 'Lépések', value: '4 · 475 = 1 900' }
    ]
  },
  {
    id: 'mul-l2-q4',
    level: 2,
    question: 'Kerekítéssel becsülve mennyi a 629 · 7 szorzat nagyságrendje?',
    highlightValue: '629 · 7 (becslés)',
    options: ['600 · 7 = 4 200', '700 · 7 = 4 900', '600 · 10 = 6 000', '500 · 7 = 3 500'],
    correctAnswer: 0,
    hint: '629 ≈ 600. 600 · 7 = 4 200.',
    explanation: '629 ≈ 600. Becslés: 600 · 7 = 4 200. (A pontos érték: 4 403).',
    breakdown: [
      { label: 'Kerekítés', value: '629 ≈ 600' },
      { label: 'Becsült szorzat', value: '600 · 7 = 4 200' }
    ]
  },
  {
    id: 'mul-l2-q5',
    level: 2,
    question: 'Mennyi a 629 · 7 pontos írásbeli szorzat értéke?',
    highlightValue: '629 · 7',
    options: ['4 403', '4 393', '4 413', '4 203'],
    correctAnswer: 0,
    hint: '7 · 9 = 63 (m 6); 7 · 2 = 14 + 6 = 20 (m 2); 7 · 6 = 42 + 2 = 44.',
    explanation: '7 · 9 = 63 (m 6); 7 · 2 + 6 = 20 (m 2); 7 · 6 + 2 = 44. Eredmény: 4 403.',
    breakdown: [
      { label: 'Egyesek', value: '63 ⟹ 3, maradt 6' },
      { label: 'Tízesek', value: '14 + 6 = 20 ⟹ 0, maradt 2' },
      { label: 'Százasok', value: '42 + 2 = 44' }
    ]
  },
  {
    id: 'mul-l2-q6',
    level: 2,
    question: 'Egy dobozban 24 csomag kártya van, csomagonként 8 lappal. Összesen hány lap van a dobozban?',
    highlightValue: '24 · 8',
    options: ['192', '182', '196', '168'],
    correctAnswer: 0,
    hint: '8 · 20 = 160, 8 · 4 = 32. 160 + 32 = ?',
    explanation: '24 · 8 = 192 lap.',
    breakdown: [
      { label: 'Szorzás', value: '20 · 8 + 4 · 8 = 160 + 32 = 192' }
    ]
  },
  {
    id: 'mul-l2-q7',
    level: 2,
    question: 'Mennyi a 816 · 5 írásbeli szorzás értéke?',
    highlightValue: '816 · 5',
    options: ['4 080', '4 050', '4 180', '4 000'],
    correctAnswer: 0,
    hint: '5-tel szorozni olyan, mint 10-zel szorozni és felezni: 8160 : 2 = 4080.',
    explanation: '816 · 5 = 4 080.',
    breakdown: [
      { label: 'Számolás', value: '800 · 5 + 16 · 5 = 4000 + 80 = 4 080' }
    ]
  },
  {
    id: 'mul-l2-q8',
    level: 2,
    question: 'Melyik számjegy hiányzik: 2?4 · 3 = 762?',
    highlightValue: '2?4 · 3 = 762',
    options: ['5', '4', '6', '7'],
    correctAnswer: 0,
    hint: '3 · 4 = 12 (maradt 1). 3 · ? + 1 végződése 6 ⟹ 3 · ? = 15 ⟹ ? = 5.',
    explanation: '254 · 3 = 762, így a hiányzó számjegy az 5.',
    breakdown: [
      { label: 'Számítás', value: '762 : 3 = 254' },
      { label: 'Hiányzó jegy', value: '5' }
    ]
  },
  {
    id: 'mul-l2-q9',
    level: 2,
    question: 'Mennyi az 1 250 · 6 szorzás értéke?',
    highlightValue: '1 250 · 6',
    options: ['7 500', '7 250', '6 500', '8 000'],
    correctAnswer: 0,
    hint: '6 · 1000 = 6000, 6 · 250 = 1500.',
    explanation: '1 250 · 6 = 7 500.',
    breakdown: [
      { label: 'Bontás', value: '6 000 + 1 500 = 7 500' }
    ]
  },
  {
    id: 'mul-l2-q10',
    level: 2,
    question: 'Mennyi a 309 · 9 szorzat értéke?',
    highlightValue: '309 · 9',
    options: ['2 781', '2 701', '2 791', '2 881'],
    correctAnswer: 0,
    hint: '9 · 300 = 2700, 9 · 9 = 81.',
    explanation: '309 · 9 = 2 700 + 81 = 2 781.',
    breakdown: [
      { label: 'Számolás', value: '2 700 + 81 = 2 781' }
    ]
  },

  // ==========================================
  // LEVEL 3: Írásbeli szorzás kétjegyűvel, rejtvények, nagyszámok (10 kérdés)
  // ==========================================
  {
    id: 'mul-l3-q1',
    level: 3,
    question: 'Mennyi a 36 · 23 írásbeli szorzás eredménye?',
    highlightValue: '36 · 23',
    options: ['828', '818', '728', '838'],
    correctAnswer: 0,
    hint: '1. részszorzat: 20 · 36 = 720. 2. részszorzat: 3 · 36 = 108. 720 + 108 = ?',
    explanation: '720 + 108 = 828.',
    breakdown: [
      { label: '1. részszorzat (20-szal)', value: '720' },
      { label: '2. részszorzat (3-mal)', value: '108' },
      { label: 'Összeg', value: '720 + 108 = 828' }
    ]
  },
  {
    id: 'mul-l3-q2',
    level: 3,
    question: 'Mennyi a 45 · 32 írásbeli szorzás eredménye?',
    highlightValue: '45 · 32',
    options: ['1 440', '1 450', '1 340', '1 540'],
    correctAnswer: 0,
    hint: '45 · 30 = 1350, 45 · 2 = 90. 1350 + 90 = ?',
    explanation: '45 · 30 = 1 350; 45 · 2 = 90. 1 350 + 90 = 1 440.',
    breakdown: [
      { label: '30 · 45', value: '1 350' },
      { label: '2 · 45', value: '90' },
      { label: 'Összeg', value: '1 440' }
    ]
  },
  {
    id: 'mul-l3-q3',
    level: 3,
    question: 'Mennyi a 124 · 25 szorzás értéke a leggyorsabb módszerrel?',
    highlightValue: '124 · 25',
    options: ['3 100', '3 000', '3 200', '2 900'],
    correctAnswer: 0,
    hint: '25 = 100 : 4 ⟹ 124 : 4 = 31 ⟹ 31 · 100 = 3100.',
    explanation: '124 · 25 = (124 : 4) · 100 = 31 · 100 = 3 100.',
    breakdown: [
      { label: 'Trükk', value: '124 : 4 = 31' },
      { label: 'Szorzat', value: '31 · 100 = 3 100' }
    ]
  },
  {
    id: 'mul-l3-q4',
    level: 3,
    question: 'Mennyi a 312 · 42 írásbeli szorzás értéke?',
    highlightValue: '312 · 42',
    options: ['13 104', '13 004', '12 904', '13 204'],
    correctAnswer: 0,
    hint: '312 · 40 = 12 480; 312 · 2 = 624. 12 480 + 624 = ?',
    explanation: '12 480 + 624 = 13 104.',
    breakdown: [
      { label: '40 · 312', value: '12 480' },
      { label: '2 · 312', value: '624' },
      { label: 'Összeg', value: '13 104' }
    ]
  },
  {
    id: 'mul-l3-q5',
    level: 3,
    question: 'Egy iskola 35 osztályának mindegyikében 28 tanuló van. Hány tanuló jár az iskolába?',
    highlightValue: '35 · 28',
    options: ['980', '960', '1 020', '940'],
    correctAnswer: 0,
    hint: '35 · 20 = 700, 35 · 8 = 280. 700 + 280 = ?',
    explanation: '35 · 28 = 700 + 280 = 980 tanuló.',
    breakdown: [
      { label: 'Számolás', value: '35 · 28 = 980' }
    ]
  },
  {
    id: 'mul-l3-q6',
    level: 3,
    question: 'Mennyi a 78 · 15 szorzat értéke?',
    highlightValue: '78 · 15',
    options: ['1 170', '1 180', '1 150', '1 270'],
    correctAnswer: 0,
    hint: '78 · 10 = 780, 78 · 5 = 390. 780 + 390 = ?',
    explanation: '78 · 10 = 780, 78 · 5 = 390. 780 + 390 = 1 170.',
    breakdown: [
      { label: 'Széttagolás', value: '780 + 390 = 1 170' }
    ]
  },
  {
    id: 'mul-l3-q7',
    level: 3,
    question: 'Hogyan változik a szorzat, ha az egyik tényezőt 3-szorosára, a másikat 2-szeresére növeljük?',
    highlightValue: '(3 · a) · (2 · b)',
    options: ['6-szorosára nő', '5-szörösére nő', 'Nem változik', '9-szeresére nő'],
    correctAnswer: 0,
    hint: '3 · 2 = 6, tehát a szorzat 6-szoros lesz.',
    explanation: '(3 · a) · (2 · b) = (3 · 2) · (a · b) = 6 · (a · b).',
    breakdown: [
      { label: 'Szabály', value: 'A tényezők szorzóinak szorzata: 3 · 2 = 6' }
    ]
  },
  {
    id: 'mul-l3-q8',
    level: 3,
    question: 'Mennyi a hiányzó számjegy X és Y értéke: 4 X · 3 = 1 3 Y, ha X = 5?',
    highlightValue: '45 · 3 = 135',
    options: ['Y = 5', 'Y = 0', 'Y = 2', 'Y = 8'],
    correctAnswer: 0,
    hint: '45 · 3 = 135.',
    explanation: '45 · 3 = 135, tehát Y = 5.',
    breakdown: [
      { label: 'Szorzat', value: '45 · 3 = 135' }
    ]
  },
  {
    id: 'mul-l3-q9',
    level: 3,
    question: 'Mennyi a 250 · 400 szorzás eredménye?',
    highlightValue: '250 · 400',
    options: ['100 000', '10 000', '1 000 000', '25 000'],
    correctAnswer: 0,
    hint: '25 · 4 = 100, utána még 3 nullát teszünk (1 a 250-ből, 2 a 400-ból).',
    explanation: '25 · 4 = 100 ⟹ 100 + három 0 = 100 000.',
    breakdown: [
      { label: 'Alapszorzat', value: '25 · 4 = 100' },
      { label: 'Nullák száma', value: '1 + 2 = 3 nulla ⟹ 100 000' }
    ]
  },
  {
    id: 'mul-l3-q10',
    level: 3,
    question: 'Mennyi az 5 · 199 · 2 kifejezés értéke a legokosabb csoportosítással?',
    highlightValue: '(5 · 2) · 199',
    options: ['1 990', '1 890', '1 980', '2 000'],
    correctAnswer: 0,
    hint: 'Először 5 · 2 = 10, majd 10 · 199 = 1990.',
    explanation: '(5 · 2) · 199 = 10 · 199 = 1 990.',
    breakdown: [
      { label: 'Csoportosítás', value: '5 · 2 = 10' },
      { label: 'Szorzat', value: '10 · 199 = 1 990' }
    ]
  }
];

const multiplicationCheatSheet: CheatSheetSection[] = [
  {
    title: 'A Szorzás Alapfogalmai',
    items: [
      { label: 'Művelet felépítése', value: '1. Tényező · 2. Tényező = Szorzat' },
      { label: '0 a szorzásban', value: 'a · 0 = 0 (mindig 0)' },
      { label: '1 a szorzásban', value: 'a · 1 = a (semleges elem)' }
    ]
  },
  {
    title: 'A Szorzás Tulajdonságai',
    items: [
      { label: 'Felcserélhetőség', value: 'a · b = b · a' },
      { label: 'Csoportosíthatóság', value: '(a · b) · c = a · (b · c)' },
      { label: 'Széttagolhatóság', value: 'a · (b + c) = a·b + a·c' }
    ]
  },
  {
    title: 'Szorzás 10 Hatványaival',
    items: [
      { label: '· 10', value: '1 nulla a szám végére (45 · 10 = 450)' },
      { label: '· 100', value: '2 nulla a szám végére (72 · 100 = 7 200)' },
      { label: '· 1 000', value: '3 nulla a szám végére (38 · 1000 = 38 000)' }
    ]
  }
];

export function MultiplicationQuiz({ onBack, onSwitchToTheory }: MultiplicationQuizProps) {
  return (
    <QuizTemplate
      title="Szorzás, írásbeli szorzás Kvíz"
      subtitle="Gyakorold a fejben és írásban történő szorzást, a szorzás azonosságait és a szöveges feladatokat!"
      questions={multiplicationQuestions}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      cheatSheetSections={multiplicationCheatSheet}
      matcherComponent={<MultiplicationMatcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} />}
      sorterComponent={<MultiplicationSorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} />}
    />
  );
}

export default MultiplicationQuiz;
