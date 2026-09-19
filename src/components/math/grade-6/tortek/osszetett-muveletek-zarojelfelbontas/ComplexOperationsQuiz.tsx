import React from 'react';
import { QuizTemplate, Question, CheatSheetItem, CheatSheetCard } from '../QuizTemplate';
import { ComplexOperationsMatcher } from './ComplexOperationsMatcher';
import { ComplexOperationsSorter } from './ComplexOperationsSorter';
import { Sparkles, ArrowRightLeft, Layers, Flame, Calculator } from 'lucide-react';

export interface ComplexOperationsQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
}

export function ComplexOperationsQuiz({
  onBack,
  onSwitchToTheory
}: ComplexOperationsQuizProps) {
  const questions: Question[] = [
    // -------------------------------------------------------------------------
    // 1. SZINT: MŰVELETI SORREND ALAPJAI (10 kérdés)
    // -------------------------------------------------------------------------
    {
      id: 'q1',
      level: 1,
      question: 'Mennyi a 10 - 2 · 3 kifejezés értéke?',
      questionTypeBadge: 'Műveleti sorrend',
      options: ['4', '24', '16', '8'],
      correctAnswer: '4',
      explanation: 'Először a szorzást kell elvégezni: 2 · 3 = 6, majd 10 - 6 = 4.',
      steps: [
        { label: '1. Szorzás', value: '2 · 3 = 6' },
        { label: '2. Kivonás', value: '10 - 6 = 4' }
      ],
      hint: 'A szorzás megelőzi a kivonást!',
      formula: '10 - (2 · 3) = 10 - 6 = 4'
    },
    {
      id: 'q2',
      level: 1,
      question: 'Mennyi a (10 - 2) · 3 kifejezés értéke?',
      questionTypeBadge: 'Zárójeles művelet',
      options: ['24', '4', '16', '12'],
      correctAnswer: '24',
      explanation: 'A zárójelben lévő kivonást végezzük el először: (10 - 2) = 8, majd 8 · 3 = 24.',
      steps: [
        { label: '1. Zárójel', value: '10 - 2 = 8' },
        { label: '2. Szorzás', value: '8 · 3 = 24' }
      ],
      hint: 'A zárójel a legmagasabb prioritású!',
      formula: '(10 - 2) · 3 = 8 · 3 = 24'
    },
    {
      id: 'q3',
      level: 1,
      question: 'Mennyi az 1/2 · 8 + 3 kifejezés értéke?',
      questionTypeBadge: 'Tört szorzása és összeadás',
      options: ['7', '5,5', '11', '8'],
      correctAnswer: '7',
      explanation: 'Először a szorzást végezzük el: 1/2 · 8 = 4, majd 4 + 3 = 7.',
      steps: [
        { label: '1. Szorzás', value: '1/2 · 8 = 4' },
        { label: '2. Összeadás', value: '4 + 3 = 7' }
      ],
      hint: 'Felezd meg a 8-at, majd adj hozzá 3-at!',
      formula: '1/2 · 8 + 3 = 4 + 3 = 7'
    },
    {
      id: 'q4',
      level: 1,
      question: 'Mennyi az 1/2 · (8 + 4) kifejezés értéke?',
      questionTypeBadge: 'Zárójeles törtszorzás',
      options: ['6', '8', '12', '7'],
      correctAnswer: '6',
      explanation: 'Először a zárójelben lévő összeadás: (8 + 4) = 12, majd 1/2 · 12 = 6.',
      steps: [
        { label: '1. Zárójel', value: '8 + 4 = 12' },
        { label: '2. Szorzás', value: '1/2 · 12 = 6' }
      ],
      hint: 'Add össze a számokat a zárójelben, majd vedd a felét!',
      formula: '1/2 · (8 + 4) = 1/2 · 12 = 6'
    },
    {
      id: 'q5',
      level: 1,
      question: 'Mennyi a 15 - 6 : 2 kifejezés értéke?',
      questionTypeBadge: 'Osztás és kivonás',
      options: ['12', '4,5', '6', '10'],
      correctAnswer: '12',
      explanation: 'Először az osztást végezzük el: 6 : 2 = 3, majd 15 - 3 = 12.',
      steps: [
        { label: '1. Osztás', value: '6 : 2 = 3' },
        { label: '2. Kivonás', value: '15 - 3 = 12' }
      ],
      hint: 'Az osztás megelőzi a kivonást!',
      formula: '15 - (6 : 2) = 15 - 3 = 12'
    },
    {
      id: 'q6',
      level: 1,
      question: 'Mennyi a (15 - 6) : 3 kifejezés értéke?',
      questionTypeBadge: 'Zárójeles osztás',
      options: ['3', '13', '9', '1'],
      correctAnswer: '3',
      explanation: 'Zárójel először: 15 - 6 = 9, majd 9 : 3 = 3.',
      steps: [
        { label: '1. Zárójel', value: '15 - 6 = 9' },
        { label: '2. Osztás', value: '9 : 3 = 3' }
      ],
      hint: 'Vond ki a 6-ot a 15-ből, majd oszd el 3-mal!',
      formula: '(15 - 6) : 3 = 9 : 3 = 3'
    },
    {
      id: 'q7',
      level: 1,
      question: 'Mennyi a 3,5 + 2 · 1,5 kifejezés értéke?',
      questionTypeBadge: 'Tizedestört művelet',
      options: ['6,5', '8,25', '7', '5,5'],
      correctAnswer: '6,5',
      explanation: 'Szorzás előbb: 2 · 1,5 = 3, majd 3,5 + 3 = 6,5.',
      steps: [
        { label: '1. Szorzás', value: '2 · 1,5 = 3' },
        { label: '2. Összeadás', value: '3,5 + 3 = 6,5' }
      ],
      hint: 'Szorozd meg az 1,5-öt 2-vel, majd add a 3,5-höz!',
      formula: '3,5 + (2 · 1,5) = 3,5 + 3 = 6,5'
    },
    {
      id: 'q8',
      level: 1,
      question: 'Mennyi a (3,5 + 1,5) · 2 kifejezés értéke?',
      questionTypeBadge: 'Zárójeles tizedestört',
      options: ['10', '6,5', '8', '7'],
      correctAnswer: '10',
      explanation: 'Zárójel: 3,5 + 1,5 = 5, majd 5 · 2 = 10.',
      steps: [
        { label: '1. Zárójel', value: '3,5 + 1,5 = 5' },
        { label: '2. Szorzás', value: '5 · 2 = 10' }
      ],
      hint: 'Add össze a két tizedestörtet, szép egész számot kapsz!',
      formula: '(3,5 + 1,5) · 2 = 5 · 2 = 10'
    },
    {
      id: 'q9',
      level: 1,
      question: 'Mennyi a 3/4 + 1/4 · 8 kifejezés értéke?',
      questionTypeBadge: 'Tört szorzása és összeadása',
      options: ['11/4 (2 3/4)', '8', '2', '5/4'],
      correctAnswer: '11/4 (2 3/4)',
      explanation: 'Szorzás előbb: 1/4 · 8 = 2 = 8/4, majd 3/4 + 8/4 = 11/4 = 2 3/4.',
      steps: [
        { label: '1. Szorzás', value: '1/4 · 8 = 2' },
        { label: '2. Összeadás', value: '3/4 + 2 = 2 3/4 = 11/4' }
      ],
      hint: '1/4-nek a 8-szorosa 2 egész!',
      formula: '3/4 + 2 = 2 3/4'
    },
    {
      id: 'q10',
      level: 1,
      question: 'Mennyi a (3/4 + 1/4) · 8 kifejezés értéke?',
      questionTypeBadge: 'Zárójeles törtek',
      options: ['8', '2', '11/4', '4'],
      correctAnswer: '8',
      explanation: 'Zárójel: 3/4 + 1/4 = 4/4 = 1, majd 1 · 8 = 8.',
      steps: [
        { label: '1. Zárójel', value: '3/4 + 1/4 = 1' },
        { label: '2. Szorzás', value: '1 · 8 = 8' }
      ],
      hint: '3/4 + 1/4 pontosan 1 egész!',
      formula: '(3/4 + 1/4) · 8 = 1 · 8 = 8'
    },

    // -------------------------------------------------------------------------
    // 2. SZINT: ZÁRÓJELFELBONTÁS ÉS VEGYES MŰVELETEK (10 kérdés)
    // -------------------------------------------------------------------------
    {
      id: 'q11',
      level: 2,
      question: 'Hogyan alakul a -(a - b) kifejezés a zárójel felbontása után?',
      questionTypeBadge: 'Zárójelfelbontás szabállyal',
      options: ['-a + b', '-a - b', 'a - b', 'a + b'],
      correctAnswer: '-a + b',
      explanation: 'A zárójel előtti mínusz jel minden belső tag előjelét az ellentétére váltja: -a és +b.',
      steps: [
        { label: 'Szabály', value: 'Mínusz a zárójel előtt ➔ minden előjel fordul' },
        { label: 'Eredmény', value: '-a + b' }
      ],
      hint: 'A b előtti mínuszból plusz lesz!',
      formula: '-(a - b) = -a + b'
    },
    {
      id: 'q12',
      level: 2,
      question: 'Mennyi az 5 - (3/4 - 1/2) kifejezés értéke?',
      questionTypeBadge: 'Törtes zárójelfelbontás',
      options: ['4 3/4', '4 1/4', '5 1/4', '3 3/4'],
      correctAnswer: '4 3/4',
      explanation: 'Zárójelben: 3/4 - 1/2 = 3/4 - 2/4 = 1/4. Ezt kivonva az 5-ből: 5 - 1/4 = 4 3/4.',
      steps: [
        { label: '1. Zárójel', value: '3/4 - 2/4 = 1/4' },
        { label: '2. Kivonás', value: '5 - 1/4 = 4 3/4' }
      ],
      hint: 'Hozd közös nevezőre a zárójelben lévő törteket!',
      formula: '5 - 1/4 = 4 3/4'
    },
    {
      id: 'q13',
      level: 2,
      question: 'Mennyi az 1/2 + 0,75 · 4 kifejezés értéke?',
      questionTypeBadge: 'Vegyes: tört és tizedestört',
      options: ['3,5', '5', '4', '2,5'],
      correctAnswer: '3,5',
      explanation: 'Szorzás előbb: 0,75 · 4 = 3, majd 1/2 + 3 = 0,5 + 3 = 3,5.',
      steps: [
        { label: '1. Szorzás', value: '0,75 · 4 = 3' },
        { label: '2. Összeadás', value: '0,5 + 3 = 3,5' }
      ],
      hint: '0,75 négyszerese pontosan 3 egész!',
      formula: '1/2 + (0,75 · 4) = 0,5 + 3 = 3,5'
    },
    {
      id: 'q14',
      level: 2,
      question: 'Mennyi a (1/3 + 2/3) : 0,5 kifejezés értéke?',
      questionTypeBadge: 'Zárójeles osztás tizedessel',
      options: ['2', '0,5', '1', '4'],
      correctAnswer: '2',
      explanation: 'Zárójelben: 1/3 + 2/3 = 1. Majd 1 : 0,5 = 2.',
      steps: [
        { label: '1. Zárójel', value: '1/3 + 2/3 = 1' },
        { label: '2. Osztás', value: '1 : 0,5 = 2' }
      ],
      hint: '0,5-del osztani ugyanaz, mint 2-vel szorozni!',
      formula: '1 : 0,5 = 2'
    },
    {
      id: 'q15',
      level: 2,
      question: 'Mennyi a 10 - (4 - 1,5) kifejezés értéke?',
      questionTypeBadge: 'Zárójeles tizedestört kivonás',
      options: ['7,5', '4,5', '6,5', '8,5'],
      correctAnswer: '7,5',
      explanation: 'Zárójelben: 4 - 1,5 = 2,5. Majd 10 - 2,5 = 7,5.',
      steps: [
        { label: '1. Zárójel', value: '4 - 1,5 = 2,5' },
        { label: '2. Kivonás', value: '10 - 2,5 = 7,5' }
      ],
      hint: 'Számítsd ki a zárójelet először!',
      formula: '10 - (4 - 1,5) = 10 - 2,5 = 7,5'
    },
    {
      id: 'q16',
      level: 2,
      question: 'Mennyi a 3 · (2/3 + 1/3) - 1 kifejezés értéke?',
      questionTypeBadge: 'Háromlépéses művelet',
      options: ['2', '3', '1', '4'],
      correctAnswer: '2',
      explanation: 'Zárójel: 2/3 + 1/3 = 1. Szorzás: 3 · 1 = 3. Kivonás: 3 - 1 = 2.',
      steps: [
        { label: '1. Zárójel', value: '2/3 + 1/3 = 1' },
        { label: '2. Szorzás', value: '3 · 1 = 3' },
        { label: '3. Kivonás', value: '3 - 1 = 2' }
      ],
      hint: 'A zárójel 1 egész, ezzel szorozzuk a 3-at!',
      formula: '3 · 1 - 1 = 2'
    },
    {
      id: 'q17',
      level: 2,
      question: 'Mennyi a 4 · 0,25 + 2/5 · 10 kifejezés értéke?',
      questionTypeBadge: 'Összetett két szorzással',
      options: ['5', '4', '6', '3'],
      correctAnswer: '5',
      explanation: 'Első szorzás: 4 · 0,25 = 1. Második szorzás: 2/5 · 10 = 4. Összeg: 1 + 4 = 5.',
      steps: [
        { label: '1. Első szorzat', value: '4 · 0,25 = 1' },
        { label: '2. Második szorzat', value: '2/5 · 10 = 4' },
        { label: '3. Összeg', value: '1 + 4 = 5' }
      ],
      hint: 'Mindkét szorzást végezd el először, majd add össze őket!',
      formula: '1 + 4 = 5'
    },
    {
      id: 'q18',
      level: 2,
      question: 'Hogyan bontható fel a -(2x - 3y) kifejezés?',
      questionTypeBadge: 'Algebrai zárójelfelbontás',
      options: ['-2x + 3y', '-2x - 3y', '2x - 3y', '2x + 3y'],
      correctAnswer: '-2x + 3y',
      explanation: 'A - jel hatására a 2x-ből -2x lesz, a -3y-ból pedig +3y.',
      steps: [
        { label: 'Előjelváltás', value: '+2x ➔ -2x  és  -3y ➔ +3y' },
        { label: 'Végeredmény', value: '-2x + 3y' }
      ],
      hint: 'Minden tagnál fordul az előjel!',
      formula: '-(2x - 3y) = -2x + 3y'
    },
    {
      id: 'q19',
      level: 2,
      question: 'Mennyi a 2/3 + 1/2 : 1/4 kifejezés értéke?',
      questionTypeBadge: 'Törtosztás és összeadás',
      options: ['8/3 (2 2/3)', '4/3', '2', '7/6'],
      correctAnswer: '8/3 (2 2/3)',
      explanation: 'Osztás először: 1/2 : 1/4 = 1/2 · 4/1 = 2. Majd 2/3 + 2 = 2 2/3 = 8/3.',
      steps: [
        { label: '1. Osztás', value: '1/2 : 1/4 = 2' },
        { label: '2. Összeadás', value: '2/3 + 2 = 8/3' }
      ],
      hint: 'Törttel osztás = reciprokával való szorzás!',
      formula: '2/3 + 2 = 8/3'
    },
    {
      id: 'q20',
      level: 2,
      question: 'Mennyi a (2,4 + 1,6) : 0,5 - 3 kifejezés értéke?',
      questionTypeBadge: 'Összetett zárójeles lánc',
      options: ['5', '8', '2', '3'],
      correctAnswer: '5',
      explanation: 'Zárójel: 2,4 + 1,6 = 4. Osztás: 4 : 0,5 = 8. Kivonás: 8 - 3 = 5.',
      steps: [
        { label: '1. Zárójel', value: '2,4 + 1,6 = 4' },
        { label: '2. Osztás', value: '4 : 0,5 = 8' },
        { label: '3. Kivonás', value: '8 - 3 = 5' }
      ],
      hint: 'Zárójel ➔ Osztás ➔ Kivonás a sorrend!',
      formula: '(4 : 0,5) - 3 = 8 - 3 = 5'
    },

    // -------------------------------------------------------------------------
    // 3. SZINT: EMELETES ÉS ÖSSZETETT KIFEJEZÉSEK, SZÖVEGES FELADATOK (10 kérdés)
    // -------------------------------------------------------------------------
    {
      id: 'q21',
      level: 3,
      question: 'Mennyi a 20 - [3 · (4 - 1,5) + 2] kifejezés értéke?',
      questionTypeBadge: 'Többszörös zárójelek',
      options: ['10,5', '9,5', '12,5', '8'],
      correctAnswer: '10,5',
      explanation: '1. Kerek zárójel: 4 - 1,5 = 2,5. 2. Szögletes zárójelen belül: 3 · 2,5 + 2 = 7,5 + 2 = 9,5. 3. Kivonás: 20 - 9,5 = 10,5.',
      steps: [
        { label: '1. Kerek zárójel', value: '4 - 1,5 = 2,5' },
        { label: '2. Szögletes zárójel', value: '3 · 2,5 + 2 = 9,5' },
        { label: '3. Kivonás', value: '20 - 9,5 = 10,5' }
      ],
      hint: 'Haladj belülről kifelé!',
      formula: '20 - 9,5 = 10,5'
    },
    {
      id: 'q22',
      level: 3,
      question: 'Mennyi a [(2/3 + 1/3) · 6] : 0,5 kifejezés értéke?',
      questionTypeBadge: 'Emeletes zárójel',
      options: ['12', '6', '3', '24'],
      correctAnswer: '12',
      explanation: '1. Kerek zárójel: 2/3 + 1/3 = 1. 2. Szögletes zárójel: 1 · 6 = 6. 3. Osztás: 6 : 0,5 = 12.',
      steps: [
        { label: '1. Kerek zárójel', value: '2/3 + 1/3 = 1' },
        { label: '2. Szögletes zárójel', value: '1 · 6 = 6' },
        { label: '3. Osztás', value: '6 : 0,5 = 12' }
      ],
      hint: 'A szögletes zárójelben 6 lesz, ezt osztjuk 0,5-del!',
      formula: '6 : 0,5 = 12'
    },
    {
      id: 'q23',
      level: 3,
      question: 'Mennyi a 2 · [5 - 2 · (1 + 0,5)] kifejezés értéke?',
      questionTypeBadge: 'Zárójel zárójelben',
      options: ['4', '2', '6', '8'],
      correctAnswer: '4',
      explanation: '1. Kerek zárójel: 1 + 0,5 = 1,5. 2. Szögletes zárójel: 5 - 2 · 1,5 = 5 - 3 = 2. 3. Külső szorzás: 2 · 2 = 4.',
      steps: [
        { label: '1. Kerek zárójel', value: '1 + 0,5 = 1,5' },
        { label: '2. Szögletes zárójel', value: '5 - 3 = 2' },
        { label: '3. Szorzás', value: '2 · 2 = 4' }
      ],
      hint: 'A szögletes zárójelben először a szorzást végezd el: 2 · 1,5 = 3!',
      formula: '2 · 2 = 4'
    },
    {
      id: 'q24',
      level: 3,
      question: 'Mennyi a [3 - (1/2 + 0,5)] · 4 kifejezés értéke?',
      questionTypeBadge: 'Vegyes többszörös zárójel',
      options: ['8', '10', '4', '6'],
      correctAnswer: '8',
      explanation: '1. Kerek zárójel: 1/2 + 0,5 = 0,5 + 0,5 = 1. 2. Szögletes zárójel: 3 - 1 = 2. 3. Szorzás: 2 · 4 = 8.',
      steps: [
        { label: '1. Kerek zárójel', value: '1/2 + 0,5 = 1' },
        { label: '2. Szögletes zárójel', value: '3 - 1 = 2' },
        { label: '3. Szorzás', value: '2 · 4 = 8' }
      ],
      hint: '1/2 + 0,5 pontosan 1 egész!',
      formula: '[3 - 1] · 4 = 2 · 4 = 8'
    },
    {
      id: 'q25',
      level: 3,
      question: 'Mennyi a 15 : [2 · (1,5 + 1)] kifejezés értéke?',
      questionTypeBadge: 'Összetett osztó',
      options: ['3', '5', '2,5', '6'],
      correctAnswer: '3',
      explanation: '1. Kerek zárójel: 1,5 + 1 = 2,5. 2. Szögletes zárójel: 2 · 2,5 = 5. 3. Osztás: 15 : 5 = 3.',
      steps: [
        { label: '1. Kerek zárójel', value: '1,5 + 1 = 2,5' },
        { label: '2. Szögletes zárójel', value: '2 · 2,5 = 5' },
        { label: '3. Osztás', value: '15 : 5 = 3' }
      ],
      hint: 'A teljes osztó értéke a szögletes zárójel (5)!',
      formula: '15 : 5 = 3'
    },
    {
      id: 'q26',
      level: 3,
      question: 'Mennyi a [1,5 · 4 - (2 - 0,5)] : 0,5 kifejezés értéke?',
      questionTypeBadge: 'Összetett tizedestört művelet',
      options: ['9', '4,5', '8', '10'],
      correctAnswer: '9',
      explanation: '1. 1,5 · 4 = 6 és (2 - 0,5) = 1,5. 2. Szögletes zárójel: 6 - 1,5 = 4,5. 3. Osztás: 4,5 : 0,5 = 9.',
      steps: [
        { label: '1. Belső műveletek', value: '6 és 1,5' },
        { label: '2. Szögletes zárójel', value: '6 - 1,5 = 4,5' },
        { label: '3. Osztás', value: '4,5 : 0,5 = 9' }
      ],
      hint: '4,5 : 0,5 megegyezik 45 : 5-tel!',
      formula: '4,5 : 0,5 = 9'
    },
    {
      id: 'q27',
      level: 3,
      question: 'Mennyi a [4 - (1/4 + 0,75)] · 5 kifejezés értéke?',
      questionTypeBadge: 'Tört és tizedes kombináció',
      options: ['15', '12', '20', '10'],
      correctAnswer: '15',
      explanation: '1. Kerek zárójel: 1/4 + 0,75 = 0,25 + 0,75 = 1. 2. Szögletes zárójel: 4 - 1 = 3. 3. Szorzás: 3 · 5 = 15.',
      steps: [
        { label: '1. Kerek zárójel', value: '0,25 + 0,75 = 1' },
        { label: '2. Szögletes zárójel', value: '4 - 1 = 3' },
        { label: '3. Szorzás', value: '3 · 5 = 15' }
      ],
      hint: '1/4 = 0,25, így a belső összeg 1 egész!',
      formula: '[4 - 1] · 5 = 3 · 5 = 15'
    },
    {
      id: 'q28',
      level: 3,
      question: 'Egyszerűsítsd a 3 · (x - 2) - 2 · (x - 3) kifejezést!',
      questionTypeBadge: 'Algebrai zárójelfelbontás és összevonás',
      options: ['x', 'x - 12', '5x', 'x + 6'],
      correctAnswer: 'x',
      explanation: '1. Zárójelek felbontása: 3x - 6 - 2x + 6. 2. Összevonás: (3x - 2x) + (-6 + 6) = x + 0 = x.',
      steps: [
        { label: '1. Felbontás', value: '3x - 6 - 2x + 6' },
        { label: '2. Összevonás', value: 'x + 0 = x' }
      ],
      hint: '-2 · (-3) = +6 ! Ügyelj az előjelekre!',
      formula: '3x - 6 - 2x + 6 = x'
    },
    {
      id: 'q29',
      level: 3,
      question: 'Peti vett 3 db 250 Ft-os füzetet és 2 db 180 Ft-os ceruzát. A vásárlás teljes összegére 10% kedvezményt kapott (azaz 0,9-szeresét fizette). Mennyit fizetett?',
      questionTypeBadge: 'Szöveges összetett feladat',
      options: ['999 Ft', '1110 Ft', '1000 Ft', '950 Ft'],
      correctAnswer: '999 Ft',
      explanation: 'Kifejezés: (3 · 250 + 2 · 180) · 0,9 = (750 + 360) · 0,9 = 1110 · 0,9 = 999 Ft.',
      steps: [
        { label: '1. Eredeti összeg', value: '3 · 250 + 2 · 180 = 1110 Ft' },
        { label: '2. Kedvezményes ár', value: '1110 · 0,9 = 999 Ft' }
      ],
      hint: 'Írd fel egyetlen zárójeles kifejezéssel!',
      formula: '(750 + 360) · 0,9 = 1110 · 0,9 = 999\\text{ Ft}'
    },
    {
      id: 'q30',
      level: 3,
      question: 'Egy téglalap oldalai a = 3,5 cm és b = 2 cm. Ha mindkét oldalt megnöveljük 1,5 cm-rel, mennyivel nő meg a téglalap kerülete?',
      questionTypeBadge: 'Geometriai összetett feladat',
      options: ['6 cm-rel', '3 cm-rel', '12 cm-rel', '4,5 cm-rel'],
      correctAnswer: '6 cm-rel',
      explanation: 'Eredeti kerület: K₁ = 2 · (3,5 + 2) = 11 cm. Új kerület: K₂ = 2 · (5 + 3,5) = 17 cm. Növekedés: 17 - 11 = 6 cm (vagy: 2 · (1,5 + 1,5) = 6 cm).',
      steps: [
        { label: '1. Eredeti kerület', value: '2 · (3,5 + 2) = 11 cm' },
        { label: '2. Új kerület', value: '2 · (5 + 3,5) = 17 cm' },
        { label: '3. Különbség', value: '17 - 11 = 6 cm' }
      ],
      hint: 'A kerület képlete: K = 2 · (a + b). Mindkét oldal növekedése kétszer számít!',
      formula: '\\Delta K = 2 · (1,5 + 1,5) = 6\\text{ cm}'
    }
  ];

  const cheatSheetItems: CheatSheetItem[] = [
    {
      topic: 'Műveleti sorrend',
      formula: '1. \\ ( \\ ), [ \\ ], \\{ \\} \\quad 2. \\ \\cdot, : \\quad 3. \\ +, -',
      note: 'Azonos műveleti szinten balról jobbra haladunk!'
    },
    {
      topic: 'Zárójelfelbontás (+) és (-)',
      formula: '+(a - b) = a - b \\qquad -(a - b) = -a + b',
      note: 'A zárójel előtti mínusz minden belső előjelet az ellentétére vált!'
    },
    {
      topic: 'Disztributivitás',
      formula: 'k \\cdot (a + b) = k \\cdot a + k \\cdot b',
      note: 'A szorzóval a zárójel minden tagját meg kell szorozni.'
    },
    {
      topic: 'Tört és tizedestört együtt',
      formula: '1/4 = 0,25 \\quad (\\text{tizedesként}) \\qquad 1/3 \\quad (\\text{csak törtként!})',
      note: 'Végtelen szakaszos törteknél mindig kötelező közönséges tört alakban számolni.'
    }
  ];

  const cheatSheetCards: CheatSheetCard[] = [
    {
      id: 'cs1',
      title: 'Prioritási Piramis',
      formula: '( \\ ) \\longrightarrow \\cdot, : \\longrightarrow +, -',
      note: 'A zárójel felülír minden más műveleti szabályt!'
    },
    {
      id: 'cs2',
      title: 'Zárójel előtti Mínusz',
      formula: '-(x - y + z) = -x + y - z',
      note: 'Minden egyes belső tag előjele megfordul!'
    },
    {
      id: 'cs3',
      title: 'Emeletes Zárójelek',
      formula: '[ \\dots ( \\dots ) \\dots ]',
      note: 'Mindig a legbelső kerek zárójeltől haladj a külső szögletes felé!'
    }
  ];

  return (
    <QuizTemplate
      title="Összetett műveletek, zárójelfelbontás"
      subtitle="30 feladat: Műveleti sorrend törtekkel és tizedes törtekkel, zárójelfelbontási szabályok, előjelek és többszörös zárójelek."
      emoji="📐"
      badgeText="📐 6. Osztály • II. Törtek"
      grade={6}
      chapterId="g6-fractions"
      topicId="g6-complex-operations-quiz"
      questions={questions}
      cheatSheet={cheatSheetItems}
      cheatSheetCards={cheatSheetCards}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      matcherComponent={<ComplexOperationsMatcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} />}
      sorterComponent={<ComplexOperationsSorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} />}
    />
  );
}

export default ComplexOperationsQuiz;
