import React from 'react';
import { QuizTemplate, LevelConfig, CheatSheetCard } from '../QuizTemplate';
import { ComplexOperationsMatcher } from './ComplexOperationsMatcher';
import { ComplexOperationsSorter } from './ComplexOperationsSorter';
import {
  Sparkles,
  Layers,
  Scale,
  Calculator,
  Zap,
  LayoutGrid,
  ArrowRightLeft,
  Brackets,
  Divide,
  FolderTree,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

interface ComplexOperationsQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    id: 'c1',
    title: 'A műveletek sorrendje',
    icon: <FolderTree className="w-4 h-4 text-cyan-600" />,
    formula: '1. Zárójel ⟹ 2. Hatvány ⟹ 3. Szorzás/Osztás ⟹ 4. Összeadás/Kivonás',
    note: 'Az azonos rendű műveleteket (pl. szorzás és osztás, vagy összeadás és kivonás) balról jobbra a felbukkanás sorrendjében végezzük el!'
  },
  {
    id: 'c2',
    title: '+ jel a zárójel előtt',
    icon: <CheckCircle2 className="w-4 h-4 text-emerald-600" />,
    formula: '+(a - b + c) = a - b + c',
    note: 'A zárójel egyszerűen elhagyható, a benne lévő tagok előjele nem változik. Pl. 10 + (4 - 7) = 10 + 4 - 7 = 7.'
  },
  {
    id: 'c3',
    title: '- jel a zárójel előtt',
    icon: <AlertTriangle className="w-4 h-4 text-rose-600" />,
    formula: '-(a - b + c) = -a + b - c',
    note: 'A zárójel elhagyásakor minden belső tag előjele az ellenkezőjére vált! Pl. 12 - (5 - 8) = 12 - 5 + 8 = 15.'
  },
  {
    id: 'c4',
    title: 'Zárójelfelbontás szorzással',
    icon: <Calculator className="w-4 h-4 text-purple-600" />,
    formula: 'c · (a ± b) = c · a ± c · b',
    note: 'Minden tagot megszorzunk. Ha a szorzó negatív, az előjelek is megfordulnak: -2 · (3x - 4) = -6x + 8.'
  },
  {
    id: 'c5',
    title: 'Törtvonal mint zárójel',
    icon: <Divide className="w-4 h-4 text-amber-600" />,
    formula: '(a + b) / (c - d) = (a + b) : (c - d)',
    note: 'A számlálót és a nevezőt külön-külön kiszámoljuk, mielőtt elvégeznénk az osztást.'
  },
  {
    id: 'c6',
    title: 'Többszörös zárójelek',
    icon: <Brackets className="w-4 h-4 text-indigo-600" />,
    formula: '{ [ ( ... ) ] }',
    note: 'Mindig a legbelső kerek ( ) zárójeltől haladunk kifelé a szögletes [ ] és kapcsos { } zárójelek felé!'
  }
];

const quizLevels: Record<1 | 2 | 3, LevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Műveleti Sorrend & Alap Zárójelek',
    subtitle: 'Alapműveletek helyes sorrendje, egyetlen zárójel felbontása és kiszámítása',
    range: '1 - 10. feladat',
    focus: 'Műveleti sorrend & Egyszerű zárójelek',
    badgeBg: 'bg-emerald-50 dark:bg-emerald-950/40',
    badgeBorder: 'border-emerald-200 dark:border-emerald-800',
    badgeText: 'text-emerald-700 dark:text-emerald-300',
    iconBg: 'bg-emerald-600 text-white',
    questions: [
      {
        id: 'q1-1',
        prompt: 'Mennyi a 10 - 2 · 3 kifejezés értéke?',
        question: 'Mennyi a 10 - 2 · 3 kifejezés értéke?',
        options: ['4', '24', '16', '-4'],
        correctAnswer: '4',
        explanation: 'A szorzás megelőzi a kivonást: 2 · 3 = 6, majd 10 - 6 = 4.',
        breakdown: [
          { label: '1. lépés (szorzás)', value: '2 · 3 = 6' },
          { label: '2. lépés (kivonás)', value: '10 - 6 = 4' }
        ]
      },
      {
        id: 'q1-2',
        prompt: 'Mennyi a (10 - 2) · 3 kifejezés értéke?',
        question: 'Mennyi a (10 - 2) · 3 kifejezés értéke?',
        options: ['24', '4', '16', '30'],
        correctAnswer: '24',
        explanation: 'A zárójelben lévő műveletet végezzük el először: 10 - 2 = 8, majd 8 · 3 = 24.',
        breakdown: [
          { label: '1. lépés (zárójel)', value: '10 - 2 = 8' },
          { label: '2. lépés (szorzás)', value: '8 · 3 = 24' }
        ]
      },
      {
        id: 'q1-3',
        prompt: 'Mennyi a 20 : 4 + 2 · 3 műveletsor eredménye?',
        question: 'Mennyi a 20 : 4 + 2 · 3 műveletsor eredménye?',
        options: ['11', '21', '8', '30'],
        correctAnswer: '11',
        explanation: 'Először az osztást és a szorzást végezzük el: 20 : 4 = 5 és 2 · 3 = 6. Végül: 5 + 6 = 11.',
        breakdown: [
          { label: 'Osztás', value: '20 : 4 = 5' },
          { label: 'Szorzás', value: '2 · 3 = 6' },
          { label: 'Összeg', value: '5 + 6 = 11' }
        ]
      },
      {
        id: 'q1-4',
        prompt: 'Mennyi a 15 - (6 - 2) értéke?',
        question: 'Mennyi a 15 - (6 - 2) értéke?',
        options: ['11', '7', '19', '9'],
        correctAnswer: '11',
        explanation: 'Zárójelben: 6 - 2 = 4. Majd 15 - 4 = 11. (Vagy zárójelfelbontással: 15 - 6 + 2 = 11).',
        breakdown: [
          { label: 'Zárójel', value: '6 - 2 = 4' },
          { label: 'Kivonás', value: '15 - 4 = 11' }
        ]
      },
      {
        id: 'q1-5',
        prompt: 'Hogyan alakul a 12 - (5 - 8) kifejezés a zárójel felbontása után?',
        question: 'Hogyan alakul a 12 - (5 - 8) kifejezés a zárójel felbontása után?',
        options: ['12 - 5 + 8', '12 - 5 - 8', '12 + 5 - 8', '12 + 5 + 8'],
        correctAnswer: '12 - 5 + 8',
        explanation: 'Mivel mínuszjel áll a zárójel előtt, a zárójelen belüli minden tag előjele megfordul: -(+5 - 8) = -5 + 8. Így: 12 - 5 + 8 = 15.',
        breakdown: [
          { label: 'Szabály', value: '-(+a - b) = -a + b' },
          { label: 'Alak', value: '12 - 5 + 8' }
        ]
      },
      {
        id: 'q1-6',
        prompt: 'Mennyi a 8 + 3 · (5 - 2) értéke?',
        question: 'Mennyi a 8 + 3 · (5 - 2) értéke?',
        options: ['17', '33', '11', '21'],
        correctAnswer: '17',
        explanation: '1. Zárójel: 5 - 2 = 3. 2. Szorzás: 3 · 3 = 9. 3. Összeadás: 8 + 9 = 17.',
        breakdown: [
          { label: 'Zárójel', value: '5 - 2 = 3' },
          { label: 'Szorzás', value: '3 · 3 = 9' },
          { label: 'Végeredmény', value: '8 + 9 = 17' }
        ]
      },
      {
        id: 'q1-7',
        prompt: 'Mennyi a 24 : (3 · 2) értéke?',
        question: 'Mennyi a 24 : (3 · 2) értéke?',
        options: ['4', '16', '6', '12'],
        correctAnswer: '4',
        explanation: 'A zárójelben lévő szorzást kell először elvégezni: 3 · 2 = 6, majd 24 : 6 = 4.',
        breakdown: [
          { label: 'Zárójel', value: '3 · 2 = 6' },
          { label: 'Osztás', value: '24 : 6 = 4' }
        ]
      },
      {
        id: 'q1-8',
        prompt: 'Mennyi a 24 : 3 · 2 műveletsor eredménye (zárójel nélkül)?',
        question: 'Mennyi a 24 : 3 · 2 műveletsor eredménye (zárójel nélkül)?',
        options: ['16', '4', '12', '8'],
        correctAnswer: '16',
        explanation: 'Mivel az osztás és szorzás azonos rendű, balról jobbra haladunk: 24 : 3 = 8, majd 8 · 2 = 16.',
        breakdown: [
          { label: '1. lépés (balról)', value: '24 : 3 = 8' },
          { label: '2. lépés', value: '8 · 2 = 16' }
        ]
      },
      {
        id: 'q1-9',
        prompt: 'Mennyi a -3 · 4 + 10 kifejezés értéke?',
        question: 'Mennyi a -3 · 4 + 10 kifejezés értéke?',
        options: ['-2', '+2', '-22', '+22'],
        correctAnswer: '-2',
        explanation: 'Először a szorzás: (-3) · 4 = -12. Majd -12 + 10 = -2.',
        breakdown: [
          { label: 'Szorzás', value: '(-3) · 4 = -12' },
          { label: 'Összeadás', value: '-12 + 10 = -2' }
        ]
      },
      {
        id: 'q1-10',
        prompt: 'Mennyi a 18 - 2 · (10 - 6) értéke?',
        question: 'Mennyi a 18 - 2 · (10 - 6) értéke?',
        options: ['10', '64', '14', '8'],
        correctAnswer: '10',
        explanation: 'Zárójel: 10 - 6 = 4. Szorzás: 2 · 4 = 8. Kivonás: 18 - 8 = 10.',
        breakdown: [
          { label: 'Zárójel', value: '10 - 6 = 4' },
          { label: 'Szorzás', value: '2 · 4 = 8' },
          { label: 'Kivonás', value: '18 - 8 = 10' }
        ]
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Előjelszabályok, Negatív Szorzók & Törtvonalak',
    subtitle: 'Többlépéses feladatok negatív számokkal, törtvonal alatti műveletek és zárójelfelbontás',
    range: '11 - 20. feladat',
    focus: 'Negatív szorzók & Törtvonal',
    badgeBg: 'bg-amber-50 dark:bg-amber-950/40',
    badgeBorder: 'border-amber-200 dark:border-amber-800',
    badgeText: 'text-amber-700 dark:text-amber-300',
    iconBg: 'bg-amber-600 text-white',
    questions: [
      {
        id: 'q2-1',
        prompt: 'Mennyi a 15 - 3 · (4 - 7) kifejezés pontos értéke?',
        question: 'Mennyi a 15 - 3 · (4 - 7) kifejezés pontos értéke?',
        options: ['24', '6', '-24', '18'],
        correctAnswer: '24',
        explanation: 'Zárójel: 4 - 7 = -3. Szorzás: -3 · (-3) = +9. Így 15 + 9 = 24.',
        breakdown: [
          { label: 'Zárójel', value: '4 - 7 = -3' },
          { label: 'Szorzás', value: '-3 · (-3) = +9' },
          { label: 'Összeg', value: '15 + 9 = 24' }
        ]
      },
      {
        id: 'q2-2',
        prompt: 'Mennyi a (18 - 3 · 2) / (3 - 7) tört értéke?',
        question: 'Mennyi a (18 - 3 · 2) / (3 - 7) tört értéke?',
        options: ['-3', '3', '-4', '4'],
        correctAnswer: '-3',
        explanation: 'Számláló: 18 - 6 = 12. Nevező: 3 - 7 = -4. A tört: 12 / (-4) = -3.',
        breakdown: [
          { label: 'Számláló', value: '18 - 6 = 12' },
          { label: 'Nevező', value: '3 - 7 = -4' },
          { label: 'Osztás', value: '12 : (-4) = -3' }
        ]
      },
      {
        id: 'q2-3',
        prompt: 'Hogyan bontható fel a -3 · (2x - 5) kifejezés zárójele?',
        question: 'Hogyan bontható fel a -3 · (2x - 5) kifejezés zárójele?',
        options: ['-6x + 15', '-6x - 15', '6x - 15', '-6x - 5'],
        correctAnswer: '-6x + 15',
        explanation: '(-3) · 2x = -6x és (-3) · (-5) = +15. Így a felbontott alak: -6x + 15.',
        breakdown: [
          { label: '1. tag szorzása', value: '(-3) · 2x = -6x' },
          { label: '2. tag szorzása', value: '(-3) · (-5) = +15' }
        ]
      },
      {
        id: 'q2-4',
        prompt: 'Mennyi a -4 · (-2 + 5) - 3 · (1 - 4) értéke?',
        question: 'Mennyi a -4 · (-2 + 5) - 3 · (1 - 4) értéke?',
        options: ['-3', '-21', '+3', '+21'],
        correctAnswer: '-3',
        explanation: '1. Zárójelek: -2 + 5 = 3 és 1 - 4 = -3. 2. Szorzások: -4 · 3 = -12 és -3 · (-3) = +9. 3. Összeg: -12 + 9 = -3.',
        breakdown: [
          { label: '1. rész', value: '-4 · 3 = -12' },
          { label: '2. rész', value: '-3 · (-3) = +9' },
          { label: 'Végeredmény', value: '-12 + 9 = -3' }
        ]
      },
      {
        id: 'q2-5',
        prompt: 'Mennyi a 20 - [ 4 + 2 · (8 - 5) ] kifejezés értéke?',
        question: 'Mennyi a 20 - [ 4 + 2 · (8 - 5) ] kifejezés értéke?',
        options: ['10', '16', '14', '8'],
        correctAnswer: '10',
        explanation: 'Kerek zárójel: 8 - 5 = 3. Szögletes zárójelen belül: 4 + 2 · 3 = 4 + 6 = 10. Végül: 20 - 10 = 10.',
        breakdown: [
          { label: 'Kerek zárójel', value: '8 - 5 = 3' },
          { label: 'Szögletes zárójel', value: '4 + 6 = 10' },
          { label: 'Végső kivonás', value: '20 - 10 = 10' }
        ]
      },
      {
        id: 'q2-6',
        prompt: 'Mennyi a 3/4 - 1/2 · (2/3 + 1/6) értéke?',
        question: 'Mennyi a 3/4 - 1/2 · (2/3 + 1/6) értéke?',
        options: ['1/3', '5/12', '1/4', '7/12'],
        correctAnswer: '1/3',
        explanation: 'Zárójelben: 2/3 + 1/6 = 4/6 + 1/6 = 5/6. Szorzás: 1/2 · 5/6 = 5/12. Kivonás: 3/4 - 5/12 = 9/12 - 5/12 = 4/12 = 1/3.',
        breakdown: [
          { label: 'Zárójel', value: '2/3 + 1/6 = 5/6' },
          { label: 'Szorzás', value: '1/2 · 5/6 = 5/12' },
          { label: 'Kivonás & egyszerűsítés', value: '9/12 - 5/12 = 4/12 = 1/3' }
        ]
      },
      {
        id: 'q2-7',
        prompt: 'Mennyi a -18 : (-3) - 2 · (-4) értéke?',
        question: 'Mennyi a -18 : (-3) - 2 · (-4) értéke?',
        options: ['14', '-2', '2', '-14'],
        correctAnswer: '14',
        explanation: 'Osztás: -18 : (-3) = +6. Szorzás és kivonás: -2 · (-4) = +8. Összeg: 6 + 8 = 14.',
        breakdown: [
          { label: 'Osztás', value: '-18 : (-3) = 6' },
          { label: 'Szorzás', value: '-2 · (-4) = +8' },
          { label: 'Összeg', value: '6 + 8 = 14' }
        ]
      },
      {
        id: 'q2-8',
        prompt: 'Mennyi az (5 - 3 · 4) · (2 - 7) kifejezés értéke?',
        question: 'Mennyi az (5 - 3 · 4) · (2 - 7) kifejezés értéke?',
        options: ['35', '-35', '49', '-49'],
        correctAnswer: '35',
        explanation: '1. zárójel: 5 - 12 = -7. 2. zárójel: 2 - 7 = -5. Szorzat: (-7) · (-5) = +35.',
        breakdown: [
          { label: '1. zárójel', value: '5 - 12 = -7' },
          { label: '2. zárójel', value: '2 - 7 = -5' },
          { label: 'Szorzat', value: '(-7) · (-5) = 35' }
        ]
      },
      {
        id: 'q2-9',
        prompt: 'Mennyi a 4 · (1/2 + 3/4) - 2 értéke?',
        question: 'Mennyi a 4 · (1/2 + 3/4) - 2 értéke?',
        options: ['3', '5', '4', '2'],
        correctAnswer: '3',
        explanation: 'Disztributivitással: 4 · 1/2 + 4 · 3/4 = 2 + 3 = 5. Majd 5 - 2 = 3.',
        breakdown: [
          { label: 'Szorzás felbontva', value: '2 + 3 = 5' },
          { label: 'Kivonás', value: '5 - 2 = 3' }
        ]
      },
      {
        id: 'q2-10',
        prompt: 'Mennyi a (10 - 2) : (-4) + 5 értéke?',
        question: 'Mennyi a (10 - 2) : (-4) + 5 értéke?',
        options: ['3', '-3', '7', '-7'],
        correctAnswer: '3',
        explanation: 'Zárójel: 10 - 2 = 8. Osztás: 8 : (-4) = -2. Összeadás: -2 + 5 = 3.',
        breakdown: [
          { label: 'Zárójel', value: '10 - 2 = 8' },
          { label: 'Osztás', value: '8 : (-4) = -2' },
          { label: 'Összeg', value: '-2 + 5 = 3' }
        ]
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Többszörös Zárójelek & Emeletes Törtek',
    subtitle: 'Összetett láncolt műveletsorok, kapcsos zárójelek, emeletes törtek és algebrai kifejezések',
    range: '21 - 30. feladat',
    focus: 'Többszörös zárójelek & Emeletes törtek',
    badgeBg: 'bg-purple-50 dark:bg-purple-950/40',
    badgeBorder: 'border-purple-200 dark:border-purple-800',
    badgeText: 'text-purple-700 dark:text-purple-300',
    iconBg: 'bg-purple-600 text-white',
    questions: [
      {
        id: 'q3-1',
        prompt: 'Mennyi a 30 - 2 · [ 12 - (3 - 5) · 3 ] kifejezés értéke?',
        question: 'Mennyi a 30 - 2 · [ 12 - (3 - 5) · 3 ] kifejezés értéke?',
        options: ['-6', '6', '12', '-12'],
        correctAnswer: '-6',
        explanation: '1. Kerek zárójel: 3 - 5 = -2. 2. Szögletes zárójelen belül: 12 - (-2) · 3 = 12 - (-6) = 12 + 6 = 18. 3. Külső szorzás és kivonás: 30 - 2 · 18 = 30 - 36 = -6.',
        breakdown: [
          { label: 'Kerek zárójel', value: '3 - 5 = -2' },
          { label: 'Szögletes zárójel', value: '12 + 6 = 18' },
          { label: 'Végeredmény', value: '30 - 36 = -6' }
        ]
      },
      {
        id: 'q3-2',
        prompt: 'Mennyi a (2/3) / (4/9) emeletes tört egyszerűsített értéke?',
        question: 'Mennyi a (2/3) / (4/9) emeletes tört egyszerűsített értéke?',
        options: ['3/2 (1,5)', '2/3', '8/27', '4/6'],
        correctAnswer: '3/2 (1,5)',
        explanation: '(2/3) : (4/9) = (2/3) · (9/4). Keresztbe egyszerűsítve: (1 · 3) / (1 · 2) = 3/2 = 1,5.',
        breakdown: [
          { label: 'Reciprokkal szorzás', value: '(2/3) · (9/4)' },
          { label: 'Egyszerűsítés', value: '3/2 = 1,5' }
        ]
      },
      {
        id: 'q3-3',
        prompt: 'Mennyi a (1/2 + 1/3) / (1/2 - 1/3) kifejezés értéke?',
        question: 'Mennyi a (1/2 + 1/3) / (1/2 - 1/3) kifejezés értéke?',
        options: ['5', '1/5', '5/6', '1/6'],
        correctAnswer: '5',
        explanation: 'Számláló: 1/2 + 1/3 = 3/6 + 2/6 = 5/6. Nevező: 1/2 - 1/3 = 3/6 - 2/6 = 1/6. Osztás: (5/6) : (1/6) = (5/6) · 6 = 5.',
        breakdown: [
          { label: 'Számláló', value: '5/6' },
          { label: 'Nevező', value: '1/6' },
          { label: 'Osztás', value: '(5/6) : (1/6) = 5' }
        ]
      },
      {
        id: 'q3-4',
        prompt: 'Hogyan bontható fel és vonható össze a 2 · (3x - 4) - 3 · (x - 2) kifejezés?',
        question: 'Hogyan bontható fel és vonható össze a 2 · (3x - 4) - 3 · (x - 2) kifejezés?',
        options: ['3x - 2', '3x - 14', '3x + 2', '5x - 2'],
        correctAnswer: '3x - 2',
        explanation: '1. Felbontás: 6x - 8 - 3x + 6. 2. Összevonás: (6x - 3x) + (-8 + 6) = 3x - 2.',
        breakdown: [
          { label: 'Zárójelfelbontás', value: '6x - 8 - 3x + 6' },
          { label: 'Összevonás', value: '3x - 2' }
        ]
      },
      {
        id: 'q3-5',
        prompt: 'Mennyi a -5 + 2 · [ 3 - 4 · (-2) ] értéke?',
        question: 'Mennyi a -5 + 2 · [ 3 - 4 · (-2) ] értéke?',
        options: ['17', '-17', '21', '-21'],
        correctAnswer: '17',
        explanation: 'Szögletes zárójelben: 3 - 4 · (-2) = 3 - (-8) = 3 + 8 = 11. Majd: -5 + 2 · 11 = -5 + 22 = 17.',
        breakdown: [
          { label: 'Szögletes zárójel', value: '3 + 8 = 11' },
          { label: 'Szorzás', value: '2 · 11 = 22' },
          { label: 'Összeg', value: '-5 + 22 = 17' }
        ]
      },
      {
        id: 'q3-6',
        prompt: 'Mennyi a (2 - 3/4 · 2) / (1/2 + 1/4) értéke?',
        question: 'Mennyi a (2 - 3/4 · 2) / (1/2 + 1/4) értéke?',
        options: ['2/3', '1/2', '3/4', '1'],
        correctAnswer: '2/3',
        explanation: 'Számláló: 2 - 3/2 = 4/2 - 3/2 = 1/2. Nevező: 1/2 + 1/4 = 2/4 + 1/4 = 3/4. Osztás: (1/2) : (3/4) = (1/2) · (4/3) = 2/3.',
        breakdown: [
          { label: 'Számláló', value: '2 - 3/2 = 1/2' },
          { label: 'Nevező', value: '3/4' },
          { label: 'Osztás', value: '(1/2) · (4/3) = 2/3' }
        ]
      },
      {
        id: 'q3-7',
        prompt: 'Mennyi a 10 - { 4 + 2 · [ 5 - (8 - 6) ] } kifejezés értéke?',
        question: 'Mennyi a 10 - { 4 + 2 · [ 5 - (8 - 6) ] } kifejezés értéke?',
        options: ['0', '2', '-2', '4'],
        correctAnswer: '0',
        explanation: '1. Kerek: 8 - 6 = 2. 2. Szögletes: 5 - 2 = 3. 3. Kapcsos: 4 + 2 · 3 = 4 + 6 = 10. 4. Végső: 10 - 10 = 0.',
        breakdown: [
          { label: 'Kerek zárójel', value: '8 - 6 = 2' },
          { label: 'Szögletes zárójel', value: '5 - 2 = 3' },
          { label: 'Kapcsos zárójel', value: '4 + 6 = 10' },
          { label: 'Végeredmény', value: '10 - 10 = 0' }
        ]
      },
      {
        id: 'q3-8',
        prompt: 'Mennyi a -3 · (2 - 5) - 4 · (1 - 3) + 2 · (-5) értéke?',
        question: 'Mennyi a -3 · (2 - 5) - 4 · (1 - 3) + 2 · (-5) értéke?',
        options: ['7', '-7', '17', '-17'],
        correctAnswer: '7',
        explanation: '1. tag: -3 · (-3) = +9. 2. tag: -4 · (-2) = +8. 3. tag: 2 · (-5) = -10. Összeg: 9 + 8 - 10 = 7.',
        breakdown: [
          { label: '1. rész', value: '-3 · (-3) = 9' },
          { label: '2. rész', value: '-4 · (-2) = 8' },
          { label: '3. rész', value: '2 · (-5) = -10' },
          { label: 'Összeg', value: '9 + 8 - 10 = 7' }
        ]
      },
      {
        id: 'q3-9',
        prompt: 'Mennyi az 1 - [ 2 - (3 - 4) ] kifejezés értéke?',
        question: 'Mennyi az 1 - [ 2 - (3 - 4) ] kifejezés értéke?',
        options: ['-2', '0', '2', '-4'],
        correctAnswer: '-2',
        explanation: 'Kerek zárójel: 3 - 4 = -1. Szögletes zárójel: 2 - (-1) = 2 + 1 = 3. Végeredmény: 1 - 3 = -2.',
        breakdown: [
          { label: 'Kerek zárójel', value: '3 - 4 = -1' },
          { label: 'Szögletes zárójel', value: '2 + 1 = 3' },
          { label: 'Végeredmény', value: '1 - 3 = -2' }
        ]
      },
      {
        id: 'q3-10',
        prompt: 'Mennyi a (1/3 - 1/4) · 12 + (1/2 + 1/3) · 6 értéke?',
        question: 'Mennyi a (1/3 - 1/4) · 12 + (1/2 + 1/3) · 6 értéke?',
        options: ['6', '5', '7', '4'],
        correctAnswer: '6',
        explanation: 'Disztributivitással: (12/3 - 12/4) + (6/2 + 6/3) = (4 - 3) + (3 + 2) = 1 + 5 = 6.',
        breakdown: [
          { label: '1. rész felbontva', value: '4 - 3 = 1' },
          { label: '2. rész felbontva', value: '3 + 2 = 5' },
          { label: 'Összeg', value: '1 + 5 = 6' }
        ]
      }
    ]
  }
};

export const ComplexOperationsQuiz: React.FC<ComplexOperationsQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      subject="math"
      grade="grade-7"
      topicId="racionalis-szamok-algebra"
      subtopicId="osszetett-muveletek-zarojelfelbontas"
      emoji="🧮"
      topicBadge="7. Osztály • Matematika II. Témakör"
      badgeText="7. Osztály • Matematika II. Témakör"
      title="5. Összetett műveletek, zárójelfelbontás Kvíz"
      cheatSheetTitle="Műveleti Sorrend & Zárójelszabályok"
      cheatSheetCards={cheatSheetCards}
      levels={quizLevels}
      themeColor="cyan"
      hintText="💡 Mindig a legbelső zárójellel kezdj, és tartsd be a szorzás/osztás prioritását az összeadás/kivonás előtt!"
      customGameModes={[
        {
          id: 'matcher',
          title: 'Kártyás Párosító',
          subtitle: 'Párosítsd az összetett kifejezéseket az eredményekkel!',
          badgeText: '8 Pár szintenként',
          icon: <ArrowRightLeft className="w-4 h-4 text-cyan-500" />,
          render: ({ level, onNextLevel, onOpenRules }) => (
            <ComplexOperationsMatcher
              level={level}
              onNextLevel={onNextLevel}
              onOpenRules={onOpenRules}
            />
          )
        },
        {
          id: 'sorter',
          title: 'Csoportosító',
          subtitle: 'Kategorizáld a kifejezéseket a prioritás vagy előjelszabály szerint!',
          badgeText: '10 Elem szintenként',
          icon: <LayoutGrid className="w-4 h-4 text-indigo-500" />,
          render: ({ level, onNextLevel, onOpenRules }) => (
            <ComplexOperationsSorter
              level={level}
              onNextLevel={onNextLevel}
              onOpenRules={onOpenRules}
            />
          )
        }
      ]}
    />
  );
};
