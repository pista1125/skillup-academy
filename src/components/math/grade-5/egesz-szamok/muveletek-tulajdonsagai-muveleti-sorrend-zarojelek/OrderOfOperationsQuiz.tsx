import React from 'react';
import { QuizTemplate, Question, CheatSheetSection } from '../QuizTemplate';
import { OrderOfOperationsMatcher } from './OrderOfOperationsMatcher';
import { OrderOfOperationsSorter } from './OrderOfOperationsSorter';

export interface OrderOfOperationsQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const orderOfOperationsQuestions: Question[] = [
  // ==========================================
  // LEVEL 1: Kétműveletes alapok, szorzás/osztás vs összeadás/kivonás (10 kérdés)
  // ==========================================
  {
    id: 'ooo-l1-q1',
    level: 1,
    question: 'Mennyi a 18 + 4 · 5 kifejezés pontos értéke?',
    highlightValue: '18 + 4 · 5',
    options: ['38', '110', '90', '27'],
    correctAnswer: 0,
    hint: 'A szorzást végezd el először: 4 · 5 = 20.',
    explanation: 'A szorzás megelőzi az összeadást: 18 + (4 · 5) = 18 + 20 = 38. (Hibás lenne előbb összeadni: 22 · 5 = 110!).',
    breakdown: [
      { label: '1. lépés (szorzás)', value: '4 · 5 = 20' },
      { label: '2. lépés (összeadás)', value: '18 + 20 = 38' }
    ]
  },
  {
    id: 'ooo-l1-q2',
    level: 1,
    question: 'Mennyi az (18 + 4) · 5 kifejezés pontos értéke?',
    highlightValue: '(18 + 4) · 5',
    options: ['110', '38', '90', '42'],
    correctAnswer: 0,
    hint: 'A zárójelben lévő művelet a legelső: 18 + 4 = 22.',
    explanation: 'A zárójel felülírja a sorrendet: (18 + 4) · 5 = 22 · 5 = 110.',
    breakdown: [
      { label: '1. lépés (zárójel)', value: '18 + 4 = 22' },
      { label: '2. lépés (szorzás)', value: '22 · 5 = 110' }
    ]
  },
  {
    id: 'ooo-l1-q3',
    level: 1,
    question: 'Mennyi az 50 – 30 : 5 kifejezés értéke?',
    highlightValue: '50 – 30 : 5',
    options: ['44', '4', '10', '36'],
    correctAnswer: 0,
    hint: 'Az osztást kell előbb elvégezni: 30 : 5 = 6.',
    explanation: '50 – (30 : 5) = 50 – 6 = 44. (Nem (50 – 30) : 5 = 4!).',
    breakdown: [
      { label: '1. lépés (osztás)', value: '30 : 5 = 6' },
      { label: '2. lépés (kivonás)', value: '50 – 6 = 44' }
    ]
  },
  {
    id: 'ooo-l1-q4',
    level: 1,
    question: 'Mennyi az (50 – 30) : 5 kifejezés értéke?',
    highlightValue: '(50 – 30) : 5',
    options: ['4', '44', '10', '20'],
    correctAnswer: 0,
    hint: 'A zárójel miatt először a kivonást végezzük el.',
    explanation: '(50 – 30) : 5 = 20 : 5 = 4.',
    breakdown: [
      { label: '1. lépés (zárójel)', value: '50 – 30 = 20' },
      { label: '2. lépés (osztás)', value: '20 : 5 = 4' }
    ]
  },
  {
    id: 'ooo-l1-q5',
    level: 1,
    question: 'Mennyi a 6 · 8 – 12 kifejezés értéke?',
    highlightValue: '6 · 8 – 12',
    options: ['36', '48', '24', '42'],
    correctAnswer: 0,
    hint: '6 · 8 = 48, majd 48 – 12.',
    explanation: '6 · 8 = 48 ⟹ 48 – 12 = 36.',
    breakdown: [
      { label: '1. lépés (szorzás)', value: '6 · 8 = 48' },
      { label: '2. lépés (kivonás)', value: '48 – 12 = 36' }
    ]
  },
  {
    id: 'ooo-l1-q6',
    level: 1,
    question: 'Melyik műveletnek van a LEGMAGASABB rangja a műveleti hierarchiában?',
    highlightValue: 'Műveleti hierarchia rangsor',
    options: ['Zárójelben lévő művelet ( )', 'Szorzás és osztás', 'Összeadás és kivonás', 'Mindegyik azonos'],
    correctAnswer: 0,
    hint: 'A zárójel minden más szabályt felülír.',
    explanation: '1. rang: Zárójelek ⟹ 2. rang: Szorzás/Osztás ⟹ 3. rang: Összeadás/Kivonás.',
    breakdown: [
      { label: '1. szint', value: 'Zárójelek ( ) és [ ]' },
      { label: '2. szint', value: 'Szorzás (·) és Osztás (:)' },
      { label: '3. szint', value: 'Összeadás (+) és Kivonás (–)' }
    ]
  },
  {
    id: 'ooo-l1-q7',
    level: 1,
    question: 'Mennyi a 100 – 4 · 20 kifejezés értéke?',
    highlightValue: '100 – 4 · 20',
    options: ['20', '1 920', '80', '0'],
    correctAnswer: 0,
    hint: 'Először 4 · 20 = 80.',
    explanation: '100 – (4 · 20) = 100 – 80 = 20.',
    breakdown: [
      { label: 'Szorzás', value: '4 · 20 = 80' },
      { label: 'Kivonás', value: '100 – 80 = 20' }
    ]
  },
  {
    id: 'ooo-l1-q8',
    level: 1,
    question: 'Mennyi a (100 – 4) · 0 kifejezés értéke?',
    highlightValue: '(100 – 4) · 0',
    options: ['0', '96', '100', '1'],
    correctAnswer: 0,
    hint: 'Bármilyen számot megszorozva 0-val...',
    explanation: '96 · 0 = 0.',
    breakdown: [
      { label: 'Zárójel', value: '100 – 4 = 96' },
      { label: 'Szorzás 0-val', value: '96 · 0 = 0' }
    ]
  },
  {
    id: 'ooo-l1-q9',
    level: 1,
    question: 'Mennyi a 25 + 15 : 5 kifejezés értéke?',
    highlightValue: '25 + 15 : 5',
    options: ['28', '8', '26', '30'],
    correctAnswer: 0,
    hint: '15 : 5 = 3, majd 25 + 3.',
    explanation: '25 + (15 : 5) = 25 + 3 = 28.',
    breakdown: [
      { label: 'Osztás', value: '15 : 5 = 3' },
      { label: 'Összeadás', value: '25 + 3 = 28' }
    ]
  },
  {
    id: 'ooo-l1-q10',
    level: 1,
    question: 'Hova kell tenni a zárójelet a 6 · 8 – 2 kifejezésben, hogy az eredmény 36 legyen?',
    highlightValue: '6 · (8 – 2) = 36',
    options: ['6 · (8 – 2)', '(6 · 8) – 2', 'Nincs szükség zárójelre', 'Egyik sem'],
    correctAnswer: 0,
    hint: '8 – 2 = 6, és 6 · 6 = 36.',
    explanation: '6 · (8 – 2) = 6 · 6 = 36. Zárójel nélkül: 48 – 2 = 46 lenne.',
    breakdown: [
      { label: 'Zárójellel', value: '6 · (8 – 2) = 6 · 6 = 36 ✓' }
    ]
  },

  // ==========================================
  // LEVEL 2: Balról jobbra szabály, többműveletes feladatok (10 kérdés)
  // ==========================================
  {
    id: 'ooo-l2-q1',
    level: 2,
    question: 'Mennyi a 24 : 6 · 2 kifejezés helyes értéke a balról jobbra szabály szerint?',
    highlightValue: '24 : 6 · 2',
    options: ['8', '2', '4', '12'],
    correctAnswer: 0,
    hint: 'Az osztás és a szorzás azonos rangú, ezért balról jobbra haladunk: (24 : 6) = 4, majd 4 · 2.',
    explanation: '24 : 6 = 4 ⟹ 4 · 2 = 8. (Gyakori hiba a jobb oldali szorzást előrevenni: 24 : 12 = 2 HIBÁS!).',
    breakdown: [
      { label: '1. lépés (bal oldali osztás)', value: '24 : 6 = 4' },
      { label: '2. lépés (szorzás)', value: '4 · 2 = 8' }
    ]
  },
  {
    id: 'ooo-l2-q2',
    level: 2,
    question: 'Mennyi a 24 : (6 · 2) kifejezés értéke?',
    highlightValue: '24 : (6 · 2)',
    options: ['2', '8', '4', '12'],
    correctAnswer: 0,
    hint: 'A zárójelben lévő szorzás az első: 6 · 2 = 12.',
    explanation: '24 : (6 · 2) = 24 : 12 = 2.',
    breakdown: [
      { label: 'Zárójel', value: '6 · 2 = 12' },
      { label: 'Osztás', value: '24 : 12 = 2' }
    ]
  },
  {
    id: 'ooo-l2-q3',
    level: 2,
    question: 'Mennyi a 40 – 15 + 5 kifejezés értéke?',
    highlightValue: '40 – 15 + 5',
    options: ['30', '20', '25', '35'],
    correctAnswer: 0,
    hint: 'A kivonás és összeadás azonos rangú: balról jobbra haladunk! 40 – 15 = 25, majd 25 + 5.',
    explanation: '40 – 15 = 25 ⟹ 25 + 5 = 30. (Nem 40 – (15+5) = 20!).',
    breakdown: [
      { label: '1. lépés (balról kivonás)', value: '40 – 15 = 25' },
      { label: '2. lépés (összeadás)', value: '25 + 5 = 30' }
    ]
  },
  {
    id: 'ooo-l2-q4',
    level: 2,
    question: 'Mennyi a 40 – (15 + 5) kifejezés értéke?',
    highlightValue: '40 – (15 + 5)',
    options: ['20', '30', '25', '35'],
    correctAnswer: 0,
    hint: 'Először a zárójelben: 15 + 5 = 20.',
    explanation: '40 – 20 = 20.',
    breakdown: [
      { label: 'Zárójel', value: '15 + 5 = 20' },
      { label: 'Kivonás', value: '40 – 20 = 20' }
    ]
  },
  {
    id: 'ooo-l2-q5',
    level: 2,
    question: 'Mennyi a 12 + 8 · 3 – 10 kifejezés értéke?',
    highlightValue: '12 + 8 · 3 – 10',
    options: ['26', '50', '36', '40'],
    correctAnswer: 0,
    hint: '1. Szorzás: 8 · 3 = 24. 2. Balról jobbra: 12 + 24 – 10.',
    explanation: '12 + 24 – 10 = 36 – 10 = 26.',
    breakdown: [
      { label: '1. Szorzás', value: '8 · 3 = 24' },
      { label: '2. Összeadás', value: '12 + 24 = 36' },
      { label: '3. Kivonás', value: '36 – 10 = 26' }
    ]
  },
  {
    id: 'ooo-l2-q6',
    level: 2,
    question: 'Mennyi a (12 + 8) · (10 – 7) kifejezés értéke?',
    highlightValue: '(12 + 8) · (10 – 7)',
    options: ['60', '50', '70', '40'],
    correctAnswer: 0,
    hint: 'Mindkét zárójelet kiszámoljuk: 20 · 3.',
    explanation: '(12 + 8) · (10 – 7) = 20 · 3 = 60.',
    breakdown: [
      { label: '1. Zárójel', value: '12 + 8 = 20' },
      { label: '2. Zárójel', value: '10 – 7 = 3' },
      { label: 'Szorzás', value: '20 · 3 = 60' }
    ]
  },
  {
    id: 'ooo-l2-q7',
    level: 2,
    question: 'Mennyi a 100 : 5 : 2 kifejezés értéke a balról jobbra szabály szerint?',
    highlightValue: '100 : 5 : 2',
    options: ['10', '40', '25', '20'],
    correctAnswer: 0,
    hint: '100 : 5 = 20, majd 20 : 2.',
    explanation: '100 : 5 = 20 ⟹ 20 : 2 = 10.',
    breakdown: [
      { label: '1. Osztás', value: '100 : 5 = 20' },
      { label: '2. Osztás', value: '20 : 2 = 10' }
    ]
  },
  {
    id: 'ooo-l2-q8',
    level: 2,
    question: 'Melyik számítás adja a legnagyobb eredményt?',
    highlightValue: 'Kifejezések összehasonlítása',
    options: ['(5 + 5) · (5 + 5)', '5 + 5 · 5 + 5', '5 · 5 + 5 · 5', '5 + 5 + 5 · 5'],
    correctAnswer: 0,
    hint: '(10) · (10) = 100.',
    explanation: '(5+5) · (5+5) = 10 · 10 = 100. (A többi: 5+25+5=35, 25+25=50, 10+25=35).',
    breakdown: [
      { label: '(5+5)·(5+5)', value: '100' },
      { label: '5+5·5+5', value: '35' },
      { label: '5·5+5·5', value: '50' }
    ]
  },
  {
    id: 'ooo-l2-q9',
    level: 2,
    question: 'Mennyi a 70 – 5 · (4 + 6) kifejezés értéke?',
    highlightValue: '70 – 5 · (4 + 6)',
    options: ['20', '650', '40', '0'],
    correctAnswer: 0,
    hint: '1. Zárójel: 4 + 6 = 10. 2. Szorzás: 5 · 10 = 50. 3. Kivonás: 70 – 50.',
    explanation: '70 – 5 · 10 = 70 – 50 = 20.',
    breakdown: [
      { label: 'Zárójel', value: '4 + 6 = 10' },
      { label: 'Szorzás', value: '5 · 10 = 50' },
      { label: 'Kivonás', value: '70 – 50 = 20' }
    ]
  },
  {
    id: 'ooo-l2-q10',
    level: 2,
    question: 'Mennyi a 80 : (20 – 16) + 5 · 4 kifejezés értéke?',
    highlightValue: '80 : (20 – 16) + 5 · 4',
    options: ['40', '25', '35', '50'],
    correctAnswer: 0,
    hint: 'Zárójel: 20 – 16 = 4. 80 : 4 = 20. 5 · 4 = 20. 20 + 20 = 40.',
    explanation: '80 : 4 + 20 = 20 + 20 = 40.',
    breakdown: [
      { label: '1. Zárójel', value: '20 – 16 = 4' },
      { label: '2. Osztás és Szorzás', value: '80:4 = 20 és 5·4 = 20' },
      { label: '3. Összeadás', value: '20 + 20 = 40' }
    ]
  },

  // ==========================================
  // LEVEL 3: Egymásba ágyazott zárójelek, okos csoportosítás, azonosságok (10 kérdés)
  // ==========================================
  {
    id: 'ooo-l3-q1',
    level: 3,
    question: 'Mennyi a 100 – [20 + (15 – 5) · 3] kifejezés értéke?',
    highlightValue: '100 – [20 + (15 – 5) · 3]',
    options: ['50', '60', '40', '70'],
    correctAnswer: 0,
    hint: '1. Kerek zárójel: 15 – 5 = 10. 2. Szorzás: 10 · 3 = 30. 3. Szögletes: 20 + 30 = 50. 4. 100 – 50 = 50.',
    explanation: '100 – [20 + 10 · 3] = 100 – [20 + 30] = 100 – 50 = 50.',
    breakdown: [
      { label: '1. Belső kerek zárójel', value: '15 – 5 = 10' },
      { label: '2. Szorzás a szögletesben', value: '10 · 3 = 30' },
      { label: '3. Szögletes zárójel', value: '20 + 30 = 50' },
      { label: '4. Kivonás', value: '100 – 50 = 50' }
    ]
  },
  {
    id: 'ooo-l3-q2',
    level: 3,
    question: 'Mennyi a [(45 – 5) : 8 + 7] · 3 kifejezés értéke?',
    highlightValue: '[(45 – 5) : 8 + 7] · 3',
    options: ['36', '42', '30', '48'],
    correctAnswer: 0,
    hint: '45 – 5 = 40. 40 : 8 = 5. 5 + 7 = 12. 12 · 3 = 36.',
    explanation: '[40 : 8 + 7] · 3 = [5 + 7] · 3 = 12 · 3 = 36.',
    breakdown: [
      { label: '1. Kerek zárójel', value: '45 – 5 = 40' },
      { label: '2. Osztás a szögletesben', value: '40 : 8 = 5' },
      { label: '3. Szögletes zárójel', value: '5 + 7 = 12' },
      { label: '4. Szorzás', value: '12 · 3 = 36' }
    ]
  },
  {
    id: 'ooo-l3-q3',
    level: 3,
    question: 'Hogyan számoljuk ki a 4 · 39 · 25 szorzatot a leggyorsabban fejben?',
    highlightValue: '4 · 39 · 25',
    options: ['(4 · 25) · 39 = 100 · 39 = 3 900', '4 · 39 = 156, majd 156 · 25', '39 · 25 = 975, majd 975 · 4', 'Egyik sem'],
    correctAnswer: 0,
    hint: '4 · 25 = 100, ami kerek szám!',
    explanation: 'A szorzás felcserélhetősége és csoportosíthatósága miatt: (4 · 25) · 39 = 100 · 39 = 3 900.',
    breakdown: [
      { label: 'Csoportosítás', value: '(4 · 25) = 100' },
      { label: 'Szorzat', value: '100 · 39 = 3 900' }
    ]
  },
  {
    id: 'ooo-l3-q4',
    level: 3,
    question: 'Mennyi a 17 · 4 + 17 · 6 kifejezés értéke közös szorzó kiemelésével?',
    highlightValue: '17 · 4 + 17 · 6',
    options: ['170', '160', '180', '150'],
    correctAnswer: 0,
    hint: 'Emeld ki a közös 17-et: 17 · (4 + 6).',
    explanation: '17 · (4 + 6) = 17 · 10 = 170.',
    breakdown: [
      { label: 'Kiemelés', value: '17 · (4 + 6)' },
      { label: 'Számolás', value: '17 · 10 = 170' }
    ]
  },
  {
    id: 'ooo-l3-q5',
    level: 3,
    question: 'Mennyi a 250 – [30 + 2 · (40 – 15)] kifejezés értéke?',
    highlightValue: '250 – [30 + 2 · (40 – 15)]',
    options: ['170', '180', '160', '190'],
    correctAnswer: 0,
    hint: '40 – 15 = 25. 2 · 25 = 50. 30 + 50 = 80. 250 – 80 = 170.',
    explanation: '250 – [30 + 2 · 25] = 250 – [30 + 50] = 250 – 80 = 170.',
    breakdown: [
      { label: '1. Kerek zárójel', value: '40 – 15 = 25' },
      { label: '2. Szorzás', value: '2 · 25 = 50' },
      { label: '3. Szögletes zárójel', value: '30 + 50 = 80' },
      { label: '4. Kivonás', value: '250 – 80 = 170' }
    ]
  },
  {
    id: 'ooo-l3-q6',
    level: 3,
    question: 'Mennyi a 18 · 49 + 18 kifejezés értéke a legokosabb módszerrel?',
    highlightValue: '18 · 49 + 18',
    options: ['900', '882', '918', '890'],
    correctAnswer: 0,
    hint: '18 · 49 + 18 · 1 = 18 · (49 + 1) = 18 · 50 = 900.',
    explanation: '18 · (49 + 1) = 18 · 50 = 900.',
    breakdown: [
      { label: 'Kiemelés', value: '18 · (49 + 1)' },
      { label: 'Számolás', value: '18 · 50 = 900' }
    ]
  },
  {
    id: 'ooo-l3-q7',
    level: 3,
    question: 'Melyik zárójelezés teszi IGAZZÁ az egyenlőséget: 8 + 12 : 4 · 2 = 10?',
    highlightValue: '8 + 12 : 4 · 2 = ?',
    options: ['(8 + 12) : (4 · 2)', '8 + (12 : 4) · 2', '(8 + 12 : 4) · 2', 'Nincs szükség zárójelre'],
    correctAnswer: 0,
    hint: '(20) : (8) nem egész. De (8 + 12) : (4 · 2) = 20 : 8? Nem! 8 + (12 : 4 · 2) = 8 + 6 = 14. Vizsgáljuk meg: (8 + 12) : 4 · 2 = 20 : 4 · 2 = 5 · 2 = 10!',
    explanation: '(8 + 12) : 4 · 2 = 20 : 4 · 2 = 5 · 2 = 10.',
    breakdown: [
      { label: 'Zárójel', value: '8 + 12 = 20' },
      { label: 'Balról jobbra', value: '20 : 4 = 5 ⟹ 5 · 2 = 10 ✓' }
    ]
  },
  {
    id: 'ooo-l3-q8',
    level: 3,
    question: 'Mennyi az 500 – (120 – 20 · 4) kifejezés értéke?',
    highlightValue: '500 – (120 – 20 · 4)',
    options: ['460', '420', '380', '440'],
    correctAnswer: 0,
    hint: 'Zárójelen belül szorzás előbb: 20 · 4 = 80. 120 – 80 = 40. 500 – 40 = 460.',
    explanation: '500 – (120 – 80) = 500 – 40 = 460.',
    breakdown: [
      { label: '1. Szorzás a zárójelben', value: '20 · 4 = 80' },
      { label: '2. Zárójel értéke', value: '120 – 80 = 40' },
      { label: '3. Kivonás', value: '500 – 40 = 460' }
    ]
  },
  {
    id: 'ooo-l3-q9',
    level: 3,
    question: 'Mennyi a 8 · 125 · 7 kifejezés értéke?',
    highlightValue: '8 · 125 · 7',
    options: ['7 000', '700', '70 000', '6 500'],
    correctAnswer: 0,
    hint: '8 · 125 = 1 000. 1 000 · 7 = 7 000.',
    explanation: '(8 · 125) · 7 = 1 000 · 7 = 7 000.',
    breakdown: [
      { label: 'Csoportosítás', value: '8 · 125 = 1 000' },
      { label: 'Szorzat', value: '1 000 · 7 = 7 000' }
    ]
  },
  {
    id: 'ooo-l3-q10',
    level: 3,
    question: 'Melyik állítás HAMIS a műveleti szabályokra vonatkozóan?',
    highlightValue: 'Műveleti szabályok állításai',
    options: [
      'Ha nincs zárójel, mindig balról jobbra végzünk el minden műveletet a típustól függetlenül',
      'A zárójel minden más műveleti sorrendet felülír',
      'A szorzás és osztás megelőzi az összeadást és kivonást',
      'Azonos rangú műveleteknél balról jobbra haladunk'
    ],
    correctAnswer: 0,
    hint: 'Zárójel nélkül a szorzás és osztás akkor is megelőzi az összeadást, ha hátrébb áll!',
    explanation: 'Az első állítás hamis: nem szabad egyszerűen balról jobbra számolni, mert a szorzás és osztás erősebb az összeadásnál és kivonásnál.',
    breakdown: [
      { label: 'Példa', value: '2 + 3 · 4 = 2 + 12 = 14 (és nem 5 · 4 = 20!)' }
    ]
  }
];

const orderOfOperationsCheatSheet: CheatSheetSection[] = [
  {
    title: 'A 3 Szintű Műveleti Sorrend',
    items: [
      { label: '1. szint (Legmagasabb)', value: 'Zárójelek ( ), majd [ ] (belülről kifelé)' },
      { label: '2. szint (Magasabb)', value: 'Szorzás (·) és Osztás (:) (balról jobbra)' },
      { label: '3. szint (Alapszint)', value: 'Összeadás (+) és Kivonás (–) (balról jobbra)' }
    ]
  },
  {
    title: 'Gyakori Csapdák',
    items: [
      { label: 'Balról jobbra szabály', value: '24 : 6 · 2 = (24 : 6) · 2 = 4 · 2 = 8' },
      { label: 'Kivonás zárójel nélkül', value: '40 – 15 + 5 = (40 – 15) + 5 = 25 + 5 = 30' }
    ]
  },
  {
    title: 'Okos Számolási Fogások',
    items: [
      { label: 'Kerek szorzatok', value: '4 · 25 = 100 és 8 · 125 = 1 000' },
      { label: 'Kiemelés', value: 'a · b + a · c = a · (b + c)' }
    ]
  }
];

export function OrderOfOperationsQuiz({ onBack, onSwitchToTheory }: OrderOfOperationsQuizProps) {
  return (
    <QuizTemplate
      title="Műveleti sorrend, zárójelek Kvíz"
      subtitle="Gyakorold a műveleti hierarchiát, a zárójelek kezelését, a balról jobbra szabályt és az okos azonosságokat!"
      questions={orderOfOperationsQuestions}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      cheatSheetSections={orderOfOperationsCheatSheet}
      matcherComponent={<OrderOfOperationsMatcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} />}
      sorterComponent={<OrderOfOperationsSorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} />}
    />
  );
}

export default OrderOfOperationsQuiz;
