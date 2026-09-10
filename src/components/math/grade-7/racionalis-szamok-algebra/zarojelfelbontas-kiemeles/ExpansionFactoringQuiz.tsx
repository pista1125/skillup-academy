import React from 'react';
import { QuizTemplate, LevelConfig, CheatSheetCard } from '../QuizTemplate';
import { ExpansionFactoringMatcher } from './ExpansionFactoringMatcher';
import { ExpansionFactoringSorter } from './ExpansionFactoringSorter';
import {
  Sparkles,
  Zap,
  Layers,
  CheckCircle2,
  AlertTriangle,
  Calculator,
  ArrowRightLeft,
  Divide,
  Hash,
  Scale
} from 'lucide-react';

interface ExpansionFactoringQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    id: 'c1',
    title: 'Disztributivitás képlete',
    icon: <Zap className="w-4 h-4 text-orange-600" />,
    formula: 'c · (a + b) = c · a + c · b',
    note: 'A zárójel minden egyes tagját meg kell szorozni a külső tényezővel.'
  },
  {
    id: 'c2',
    title: 'Negatív számmal való szorzás',
    icon: <AlertTriangle className="w-4 h-4 text-rose-600" />,
    formula: '-3(2x - 5) = -6x + 15',
    note: 'A negatív szorzó megfordítja az összes zárójelen belüli tag előjelét!'
  },
  {
    id: 'c3',
    title: 'Változóval való beszorzás',
    icon: <Hash className="w-4 h-4 text-indigo-600" />,
    formula: '2x · (3x - 4) = 6x² - 8x',
    note: 'x · x = x², a számokat és a betűket külön szorozzuk össze.'
  },
  {
    id: 'c4',
    title: 'Közös tényező kiemelése',
    icon: <ArrowRightLeft className="w-4 h-4 text-emerald-600" />,
    formula: 'ab + ac = a(b + c)',
    note: 'A zárójelfelbontás megfordítása: a közös számtényezőt és betűt kiemeljük a zárójel elé.'
  },
  {
    id: 'c5',
    title: 'A megmaradó 1-es szabálya',
    icon: <CheckCircle2 className="w-4 h-4 text-purple-600" />,
    formula: '4x + 4 = 4(x + 1)',
    note: 'Ha a teljes tagot kiemeljük, a helyén kötelezően +1 vagy -1 marad (nem 0 vagy üres hely!).'
  },
  {
    id: 'c6',
    title: 'Ellenőrzés beszorzással',
    icon: <Calculator className="w-4 h-4 text-amber-600" />,
    formula: '3(2x + 5) ⟹ 3 · 2x + 3 · 5 = 6x + 15',
    note: 'Kiemelés után azonnal fejben ellenőrizheted az eredményt vissza-beszorzással!'
  }
];

const quizLevels: Record<1 | 2 | 3, LevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Alapvető Zárójelfelbontás',
    subtitle: 'Zárójelek felbontása pozitív számtényezővel, a disztributivitás alapszabálya',
    range: '1 - 10. feladat',
    focus: 'Alap Zárójelfelbontás',
    badgeBg: 'bg-orange-50 dark:bg-orange-950/40',
    badgeBorder: 'border-orange-200 dark:border-orange-800',
    badgeText: 'text-orange-700 dark:text-orange-300',
    iconBg: 'bg-orange-600 text-white',
    questions: [
      {
        id: 'q1-1',
        prompt: 'Bontsd fel a zárójelet: 3 · (x + 4)!',
        question: 'Bontsd fel a zárójelet: 3 · (x + 4)!',
        options: ['3x + 12', '3x + 4', 'x + 12', '7x'],
        correctAnswer: '3x + 12',
        explanation: '3 · x = 3x és 3 · 4 = 12 ⟹ 3x + 12.',
        breakdown: [
          { label: '1. szorzat', value: '3 · x = 3x' },
          { label: '2. szorzat', value: '3 · 4 = 12' },
          { label: 'Összeg', value: '3x + 12' }
        ]
      },
      {
        id: 'q1-2',
        prompt: 'Mennyi az 5 · (2a - 3) kifejezés értéke?',
        question: 'Mennyi az 5 · (2a - 3) kifejezés értéke?',
        options: ['10a - 15', '10a - 3', '7a - 15', '10a + 15'],
        correctAnswer: '10a - 15',
        explanation: '5 · 2a = 10a és 5 · (-3) = -15 ⟹ 10a - 15.',
        breakdown: [
          { label: '1. szorzat', value: '5 · 2a = 10a' },
          { label: '2. szorzat', value: '5 · (-3) = -15' },
          { label: 'Eredmény', value: '10a - 15' }
        ]
      },
      {
        id: 'q1-3',
        prompt: 'Bontsd fel a zárójelet: 4 · (3y + 2)!',
        question: 'Bontsd fel a zárójelet: 4 · (3y + 2)!',
        options: ['12y + 8', '12y + 2', '7y + 8', '12y + 6'],
        correctAnswer: '12y + 8',
        explanation: '4 · 3y = 12y és 4 · 2 = 8 ⟹ 12y + 8.',
        breakdown: [
          { label: 'Szorzás', value: '4 · 3y + 4 · 2 = 12y + 8' }
        ]
      },
      {
        id: 'q1-4',
        prompt: 'Mennyi a 2 · (5 - x) kifejezés kifejtett alakja?',
        question: 'Mennyi a 2 · (5 - x) kifejezés kifejtett alakja?',
        options: ['10 - 2x', '10 - x', '7 - 2x', '2x - 10'],
        correctAnswer: '10 - 2x',
        explanation: '2 · 5 = 10 és 2 · (-x) = -2x ⟹ 10 - 2x.',
        breakdown: [
          { label: 'Szorzás', value: '2 · 5 - 2 · x = 10 - 2x' }
        ]
      },
      {
        id: 'q1-5',
        prompt: 'Bontsd fel a zárójelet: 6 · (a + b - 2)!',
        question: 'Bontsd fel a zárójelet: 6 · (a + b - 2)!',
        options: ['6a + 6b - 12', '6a + b - 2', '6a + 6b - 2', '6ab - 12'],
        correctAnswer: '6a + 6b - 12',
        explanation: 'Mind a 3 tagot megszorozzuk 6-tal: 6a + 6b - 12.',
        breakdown: [
          { label: '1. tag', value: '6 · a = 6a' },
          { label: '2. tag', value: '6 · b = 6b' },
          { label: '3. tag', value: '6 · (-2) = -12' }
        ]
      },
      {
        id: 'q1-6',
        prompt: 'Mennyi a 7 · (2x - 1) kifejezés értéke?',
        question: 'Mennyi a 7 · (2x - 1) kifejezés értéke?',
        options: ['14x - 7', '14x - 1', '9x - 7', '14x + 7'],
        correctAnswer: '14x - 7',
        explanation: '7 · 2x = 14x és 7 · (-1) = -7 ⟹ 14x - 7.',
        breakdown: [
          { label: 'Beszorzás', value: '7 · 2x - 7 · 1 = 14x - 7' }
        ]
      },
      {
        id: 'q1-7',
        prompt: 'Bontsd fel a zárójelet: 1/2 · (4x + 6)!',
        question: 'Bontsd fel a zárójelet: 1/2 · (4x + 6)!',
        options: ['2x + 3', '2x + 6', '4x + 3', '8x + 12'],
        correctAnswer: '2x + 3',
        explanation: '1/2 · 4x = 2x és 1/2 · 6 = 3 ⟹ 2x + 3.',
        breakdown: [
          { label: 'Felezések', value: '4x / 2 = 2x,  6 / 2 = 3' },
          { label: 'Eredmény', value: '2x + 3' }
        ]
      },
      {
        id: 'q1-8',
        prompt: 'Mennyi a 3 · (x + 2) + 4 kifejezés legegyszerűbb alakja?',
        question: 'Mennyi a 3 · (x + 2) + 4 kifejezés legegyszerűbb alakja?',
        options: ['3x + 10', '3x + 6', '3x + 18', '7x + 6'],
        correctAnswer: '3x + 10',
        explanation: 'Beszorzás: 3x + 6. Hozzáadva a 4-et: 3x + 6 + 4 = 3x + 10.',
        breakdown: [
          { label: 'Beszorzás', value: '3x + 6' },
          { label: 'Összevonás', value: '3x + 6 + 4 = 3x + 10' }
        ]
      },
      {
        id: 'q1-9',
        prompt: 'Egy téglalap oldalai 5 és (x + 3). Mennyi a területe?',
        question: 'Egy téglalap oldalai 5 és (x + 3). Mennyi a területe?',
        options: ['5x + 15', '5x + 3', 'x + 15', '10x + 6'],
        correctAnswer: '5x + 15',
        explanation: 'T = a · b = 5 · (x + 3) = 5x + 15.',
        breakdown: [
          { label: 'Képlet', value: 'T = 5 · (x + 3)' },
          { label: 'Bontás', value: '5x + 15' }
        ]
      },
      {
        id: 'q1-10',
        prompt: 'Melyik lépés a helyes a 4 · (3a + 5) felbontásakor?',
        question: 'Melyik lépés a helyes a 4 · (3a + 5) felbontásakor?',
        options: [
          '4 · 3a + 4 · 5',
          '4 · 3a + 5',
          '3a + 4 · 5',
          '(4 + 3a) · (4 + 5)'
        ],
        correctAnswer: '4 · 3a + 4 · 5',
        explanation: 'A disztributivitás szerint a külső szorzóval mindkét belső tagot meg kell szorozni.',
        breakdown: [
          { label: 'Helyes disztributív lépés', value: '4 · 3a + 4 · 5 = 12a + 20' }
        ]
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Negatív Szorzók & Változók',
    subtitle: 'Negatív tényezővel és betűkkel való beszorzás, algebrai kifejezések összevonása',
    range: '11 - 20. feladat',
    focus: 'Negatív Szorzók & Változók',
    badgeBg: 'bg-indigo-50 dark:bg-indigo-950/40',
    badgeBorder: 'border-indigo-200 dark:border-indigo-800',
    badgeText: 'text-indigo-700 dark:text-indigo-300',
    iconBg: 'bg-indigo-600 text-white',
    questions: [
      {
        id: 'q2-1',
        prompt: 'Bontsd fel a zárójelet: -2 · (3x - 5)!',
        question: 'Bontsd fel a zárójelet: -2 · (3x - 5)!',
        options: ['-6x + 10', '-6x - 10', '6x - 10', '-6x - 5'],
        correctAnswer: '-6x + 10',
        explanation: '(-2) · 3x = -6x és (-2) · (-5) = +10 ⟹ -6x + 10.',
        breakdown: [
          { label: '1. szorzat', value: '-2 · 3x = -6x' },
          { label: '2. szorzat', value: '-2 · (-5) = +10' },
          { label: 'Eredmény', value: '-6x + 10' }
        ]
      },
      {
        id: 'q2-2',
        prompt: 'Mennyi a -4 · (2a + 3b) kifejezés értéke?',
        question: 'Mennyi a -4 · (2a + 3b) kifejezés értéke?',
        options: ['-8a - 12b', '-8a + 12b', '8a - 12b', '-8a + 3b'],
        correctAnswer: '-8a - 12b',
        explanation: '(-4) · 2a = -8a és (-4) · 3b = -12b ⟹ -8a - 12b.',
        breakdown: [
          { label: 'Szorzás', value: '-4 · 2a + (-4) · 3b = -8a - 12b' }
        ]
      },
      {
        id: 'q2-3',
        prompt: 'Bontsd fel a zárójelet: x · (x + 4)!',
        question: 'Bontsd fel a zárójelet: x · (x + 4)!',
        options: ['x² + 4x', '2x + 4x', 'x² + 4', '4x²'],
        correctAnswer: 'x² + 4x',
        explanation: 'x · x = x² és x · 4 = 4x ⟹ x² + 4x.',
        breakdown: [
          { label: 'x · x', value: 'x²' },
          { label: 'x · 4', value: '4x' },
          { label: 'Összeg', value: 'x² + 4x' }
        ]
      },
      {
        id: 'q2-4',
        prompt: 'Mennyi a 2a · (3a - 5) kifejezés kifejtve?',
        question: 'Mennyi a 2a · (3a - 5) kifejezés kifejtve?',
        options: ['6a² - 10a', '6a - 10a', '6a² - 5', '5a² - 10a'],
        correctAnswer: '6a² - 10a',
        explanation: '2a · 3a = 6a² és 2a · (-5) = -10a ⟹ 6a² - 10a.',
        breakdown: [
          { label: 'Beszorzás', value: '2a · 3a - 2a · 5 = 6a² - 10a' }
        ]
      },
      {
        id: 'q2-5',
        prompt: 'Bontsd fel a zárójelet: -3x · (2x - 1)!',
        question: 'Bontsd fel a zárójelet: -3x · (2x - 1)!',
        options: ['-6x² + 3x', '-6x² - 3x', '-6x + 3', '6x² + 3x'],
        correctAnswer: '-6x² + 3x',
        explanation: '(-3x) · 2x = -6x² és (-3x) · (-1) = +3x ⟹ -6x² + 3x.',
        breakdown: [
          { label: '1. tag', value: '-3x · 2x = -6x²' },
          { label: '2. tag', value: '-3x · (-1) = +3x' }
        ]
      },
      {
        id: 'q2-6',
        prompt: 'Egyszerűsítsd: 5(2x - 3) - 3(3x - 4)!',
        question: 'Egyszerűsítsd: 5(2x - 3) - 3(3x - 4)!',
        options: ['x - 3', 'x - 27', '19x - 3', 'x + 3'],
        correctAnswer: 'x - 3',
        explanation: '10x - 15 - 9x + 12 = (10x - 9x) + (-15 + 12) = x - 3.',
        breakdown: [
          { label: '1. zárójel', value: '10x - 15' },
          { label: '2. zárójel', value: '-9x + 12' },
          { label: 'Összevonás', value: '10x - 9x - 15 + 12 = x - 3' }
        ]
      },
      {
        id: 'q2-7',
        prompt: 'Bontsd fel a zárójelet: -5 · (1 - 2x)!',
        question: 'Bontsd fel a zárójelet: -5 · (1 - 2x)!',
        options: ['-5 + 10x', '-5 - 10x', '5 - 10x', '10x + 5'],
        correctAnswer: '-5 + 10x',
        explanation: '(-5) · 1 = -5 és (-5) · (-2x) = +10x ⟹ -5 + 10x.',
        breakdown: [
          { label: 'Szorzás', value: '-5 · 1 + (-5) · (-2x) = -5 + 10x' }
        ]
      },
      {
        id: 'q2-8',
        prompt: 'Egyszerűsítsd: 4(x - 2) + 2(3 - 2x)!',
        question: 'Egyszerűsítsd: 4(x - 2) + 2(3 - 2x)!',
        options: ['-2', '8x - 2', '0', '2'],
        correctAnswer: '-2',
        explanation: '4x - 8 + 6 - 4x = (4x - 4x) + (-8 + 6) = 0x - 2 = -2.',
        breakdown: [
          { label: 'Beszorzás', value: '4x - 8 + 6 - 4x' },
          { label: 'Összevonás', value: '-8 + 6 = -2' }
        ]
      },
      {
        id: 'q2-9',
        prompt: 'Mennyi a -1/3 · (9x - 6) kifejezés értéke?',
        question: 'Mennyi a -1/3 · (9x - 6) kifejezés értéke?',
        options: ['-3x + 2', '-3x - 2', '3x - 2', '-3x + 6'],
        correctAnswer: '-3x + 2',
        explanation: '(-1/3) · 9x = -3x és (-1/3) · (-6) = +2 ⟹ -3x + 2.',
        breakdown: [
          { label: 'Szorzás', value: '-9x/3 + 6/3 = -3x + 2' }
        ]
      },
      {
        id: 'q2-10',
        prompt: 'Bontsd fel a zárójelet: 3a · (a² - 2a + 4)!',
        question: 'Bontsd fel a zárójelet: 3a · (a² - 2a + 4)!',
        options: ['3a³ - 6a² + 12a', '3a³ - 2a + 4', '3a² - 6a + 12', '3a³ - 6a² + 4'],
        correctAnswer: '3a³ - 6a² + 12a',
        explanation: '3a · a² = 3a³, 3a · (-2a) = -6a², 3a · 4 = 12a.',
        breakdown: [
          { label: '1. tag', value: '3a · a² = 3a³' },
          { label: '2. tag', value: '3a · (-2a) = -6a²' },
          { label: '3. tag', value: '3a · 4 = 12a' }
        ]
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Közös Tényező Kiemelése',
    subtitle: 'Közös szám- és betűtényezők kiemelése, szorzattá alakítás és algebrai törtek egyszerűsítése',
    range: '21 - 30. feladat',
    focus: 'Közös Tényező Kiemelése',
    badgeBg: 'bg-emerald-50 dark:bg-emerald-950/40',
    badgeBorder: 'border-emerald-200 dark:border-emerald-800',
    badgeText: 'text-emerald-700 dark:text-emerald-300',
    iconBg: 'bg-emerald-600 text-white',
    questions: [
      {
        id: 'q3-1',
        prompt: 'Emelj ki közös tényezőt a 6x + 15 kifejezésből!',
        question: 'Emelj ki közös tényezőt a 6x + 15 kifejezésből!',
        options: ['3(2x + 5)', '6(x + 15)', '3(2x + 15)', '5(x + 3)'],
        correctAnswer: '3(2x + 5)',
        explanation: '6 és 15 legnagyobb közös osztója 3 ⟹ 3 · 2x + 3 · 5 = 3(2x + 5).',
        breakdown: [
          { label: 'Közös osztó', value: '3' },
          { label: 'Zárójelben maradó tagok', value: '6x : 3 = 2x,  15 : 3 = 5' },
          { label: 'Szorzat', value: '3(2x + 5)' }
        ]
      },
      {
        id: 'q3-2',
        prompt: 'Emelj ki közös tényezőt a 8a - 12b kifejezésből!',
        question: 'Emelj ki közös tényezőt a 8a - 12b kifejezésből!',
        options: ['4(2a - 3b)', '2(4a - 6b)', '4(2a + 3b)', '8(a - 4b)'],
        correctAnswer: '4(2a - 3b)',
        explanation: 'A 8 és 12 legnagyobb közös osztója a 4 ⟹ 4(2a - 3b).',
        breakdown: [
          { label: 'Legnagyobb közös osztó', value: '4' },
          { label: 'Kiemelés', value: '4(2a - 3b)' }
        ]
      },
      {
        id: 'q3-3',
        prompt: 'Emeld ki a közös tényezőt: 5x + 5!',
        question: 'Emeld ki a közös tényezőt: 5x + 5!',
        options: ['5(x + 1)', '5x', '5(x + 0)', '5(x + 5)'],
        correctAnswer: '5(x + 1)',
        explanation: 'Az 5 kiemelése után az 5 helyén +1 marad: 5 · x + 5 · 1 = 5(x + 1).',
        breakdown: [
          { label: 'Tagok bontása', value: '5 · x + 5 · 1' },
          { label: 'Kiemelés', value: '5(x + 1)' }
        ]
      },
      {
        id: 'q3-4',
        prompt: 'Alakítsd szorzattá: 4x² + 6x!',
        question: 'Alakítsd szorzattá: 4x² + 6x!',
        options: ['2x(2x + 3)', '2(2x² + 3x)', 'x(4x + 6)', '4x(x + 2)'],
        correctAnswer: '2x(2x + 3)',
        explanation: 'A 4 és 6 közös osztója 2, az x² és x közös betűje x ⟹ Közös tényező: 2x ⟹ 2x(2x + 3).',
        breakdown: [
          { label: 'Közös szám', value: '2' },
          { label: 'Közös változó', value: 'x' },
          { label: 'Kiemelt szorzat', value: '2x(2x + 3)' }
        ]
      },
      {
        id: 'q3-5',
        prompt: 'Emeld ki a -3-at a -3a - 6b kifejezésből!',
        question: 'Emeld ki a -3-at a -3a - 6b kifejezésből!',
        options: ['-3(a + 2b)', '-3(a - 2b)', '3(-a - 2b)', '-3(a + 6b)'],
        correctAnswer: '-3(a + 2b)',
        explanation: 'Negatív szám kiemelésekor a belső tagok előjele megfordul: -3(a + 2b).',
        breakdown: [
          { label: 'Kiemelés', value: '-3 · a + (-3) · 2b = -3(a + 2b)' }
        ]
      },
      {
        id: 'q3-6',
        prompt: 'Alakítsd szorzattá: 10xy - 15x!',
        question: 'Alakítsd szorzattá: 10xy - 15x!',
        options: ['5x(2y - 3)', '5(2xy - 3x)', 'x(10y - 15)', '5x(2y + 3)'],
        correctAnswer: '5x(2y - 3)',
        explanation: 'A közös szám 5, a közös változó x ⟹ 5x(2y - 3).',
        breakdown: [
          { label: 'Közös tényező', value: '5x' },
          { label: 'Szorzat', value: '5x(2y - 3)' }
        ]
      },
      {
        id: 'q3-7',
        prompt: 'Egyszerűsítsd a törtet a közös tényező kiemelésével: (6x + 9) / 3!',
        question: 'Egyszerűsítsd a törtet a közös tényező kiemelésével: (6x + 9) / 3!',
        options: ['2x + 3', '2x + 9', '6x + 3', '3x + 3'],
        correctAnswer: '2x + 3',
        explanation: 'A számlálóból kiemeljük a 3-at: 3(2x + 3) / 3. A 3-mal egyszerűsítve: 2x + 3.',
        breakdown: [
          { label: 'Kiemelés a számlálóból', value: '3(2x + 3)' },
          { label: 'Egyszerűsítés 3-mal', value: '2x + 3' }
        ]
      },
      {
        id: 'q3-8',
        prompt: 'Emeld ki a közös tényezőt: 7x - 7!',
        question: 'Emeld ki a közös tényezőt: 7x - 7!',
        options: ['7(x - 1)', '7x', '7(x - 7)', '7(x + 1)'],
        correctAnswer: '7(x - 1)',
        explanation: '7 · x - 7 · 1 = 7(x - 1). A -7 helyén -1 marad.',
        breakdown: [
          { label: 'Kiemelés', value: '7(x - 1)' }
        ]
      },
      {
        id: 'q3-9',
        prompt: 'Alakítsd szorzattá: 12a²b - 18ab²!',
        question: 'Alakítsd szorzattá: 12a²b - 18ab²!',
        options: ['6ab(2a - 3b)', '6(2a²b - 3ab²)', '6a(2ab - 3b²)', '12ab(a - b)'],
        correctAnswer: '6ab(2a - 3b)',
        explanation: 'A 12 és 18 közös osztója 6, a közös változók ab ⟹ 6ab(2a - 3b).',
        breakdown: [
          { label: 'Közös tényező', value: '6ab' },
          { label: 'Kiemelés után', value: '6ab(2a - 3b)' }
        ]
      },
      {
        id: 'q3-10',
        prompt: 'Egyszerűsítsd a törtet: (4a - 8) / (2a - 4)!',
        question: 'Egyszerűsítsd a törtet: (4a - 8) / (2a - 4)!',
        options: ['2', '4', '2a', '1'],
        correctAnswer: '2',
        explanation: 'Számláló: 4(a - 2), Nevező: 2(a - 2). Az (a - 2) zárójellel egyszerűsítve: 4/2 = 2.',
        breakdown: [
          { label: 'Számláló kiemelése', value: '4(a - 2)' },
          { label: 'Nevező kiemelése', value: '2(a - 2)' },
          { label: 'Egyszerűsítés', value: '4/2 = 2' }
        ]
      }
    ]
  }
};

export const ExpansionFactoringQuiz: React.FC<ExpansionFactoringQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      title="8. Zárójelfelbontás és Kiemelés Kvíz"
      subtitle="Teszteld a tudásodat a beszorzás, előjelszabályok, szorzattá alakítás és kiemelés területén!"
      documentId="grade-7-racionalis-szamok-algebra-zarojelfelbontas-kiemeles-quiz"
      badgeText="7. Osztály • Zárójelek és Kiemelés"
      themeColor="orange"
      cheatSheetCards={cheatSheetCards}
      levels={quizLevels}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      matcherComponent={<ExpansionFactoringMatcher />}
      sorterComponent={<ExpansionFactoringSorter />}
    />
  );
};
