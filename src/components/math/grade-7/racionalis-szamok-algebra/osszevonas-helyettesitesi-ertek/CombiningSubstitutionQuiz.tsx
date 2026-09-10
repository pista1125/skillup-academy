import React from 'react';
import { QuizTemplate, LevelConfig, CheatSheetCard } from '../QuizTemplate';
import { CombiningSubstitutionMatcher } from './CombiningSubstitutionMatcher';
import { CombiningSubstitutionSorter } from './CombiningSubstitutionSorter';
import {
  Sparkles,
  Layers,
  Target,
  CheckCircle2,
  AlertTriangle,
  Calculator,
  Equal,
  Zap,
  Hash,
  Scale
} from 'lucide-react';

interface CombiningSubstitutionQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    id: 'c1',
    title: 'Mikor egynemű két tag?',
    icon: <Layers className="w-4 h-4 text-amber-600" />,
    formula: 'Betűrész és hatványkitevő EGYEZIK ⟹ 4x² és -7x²',
    note: 'Csak a számszorzójukban (együttható) különbözhetnek. A 3x és 3x² NEM egyneműek!'
  },
  {
    id: 'c2',
    title: 'Összevonás alapszabálya',
    icon: <Calculator className="w-4 h-4 text-emerald-600" />,
    formula: '5a - 8a = (5 - 8)a = -3a',
    note: 'Az együtthatókat előjelesen összeadjuk, a betűrészt változatlanul melléírjuk.'
  },
  {
    id: 'c3',
    title: 'Rejtett együtthatók az összevonásban',
    icon: <Hash className="w-4 h-4 text-blue-600" />,
    formula: 'x + x = 1x + 1x = 2x,  4x - x = 4x - 1x = 3x',
    note: 'A puszta x együtthatója +1, a -x együtthatója -1.'
  },
  {
    id: 'c4',
    title: 'Helyettesítési érték számítása',
    icon: <Target className="w-4 h-4 text-purple-600" />,
    formula: '2x + 5, ha x = 3 ⟹ 2 · 3 + 5 = 11',
    note: 'A betű helyére konkrét számot írunk és betartjuk a műveleti sorrendet.'
  },
  {
    id: 'c5',
    title: 'Negatív szám négyzete',
    icon: <AlertTriangle className="w-4 h-4 text-rose-600" />,
    formula: '(-3)² = +9, de -3² = -9',
    note: 'Behelyettesítéskor a negatív számot mindig zárójelben emeljük négyzetre!'
  },
  {
    id: 'c6',
    title: 'Összevonás behelyettesítés előtt',
    icon: <Sparkles className="w-4 h-4 text-amber-600" />,
    formula: '5x + 3 - 2x = 3x + 3',
    note: 'Mindig érdemes előbb egyszerűbb alakra hozni a kifejezést az összevonással!'
  }
];

const quizLevels: Record<1 | 2 | 3, LevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Egynemű Tagok & Alap Összevonás',
    subtitle: 'Egynemű tagok felismerése és egyszerű egynemű kifejezések összevonása',
    range: '1 - 10. feladat',
    focus: 'Egynemű tagok & Alap összevonás',
    badgeBg: 'bg-amber-50 dark:bg-amber-950/40',
    badgeBorder: 'border-amber-200 dark:border-amber-800',
    badgeText: 'text-amber-700 dark:text-amber-300',
    iconBg: 'bg-amber-600 text-white',
    questions: [
      {
        id: 'q1-1',
        prompt: 'Melyik pár tagjai EGYNEMŰEK egymással?',
        question: 'Melyik pár tagjai EGYNEMŰEK egymással?',
        options: ['4x és -9x', '3x és 3x²', '2a és 2b', '5xy és 5x'],
        correctAnswer: '4x és -9x',
        explanation: 'A 4x és -9x betűrésze (x) teljesen megegyezik, csak az együtthatójuk tér el.',
        breakdown: [
          { label: '4x és -9x', value: 'Egyneműek (azonos változó: x)' },
          { label: '3x és 3x²', value: 'Nem egyneműek (eltérő kitevő)' }
        ]
      },
      {
        id: 'q1-2',
        prompt: 'Mennyi a 4x + 7x kifejezés összevont alakja?',
        question: 'Mennyi a 4x + 7x kifejezés összevont alakja?',
        options: ['11x', '11x²', '28x', '11'],
        correctAnswer: '11x',
        explanation: 'Az együtthatókat összeadjuk: 4 + 7 = 11, az x változatlan marad: 11x.',
        breakdown: [
          { label: 'Együtthatók összege', value: '4 + 7 = 11' },
          { label: 'Összevont alak', value: '11x' }
        ]
      },
      {
        id: 'q1-3',
        prompt: 'Mennyi a 8a - 3a kifejezés összevont értéke?',
        question: 'Mennyi a 8a - 3a kifejezés összevont értéke?',
        options: ['5a', '5', '11a', '-5a'],
        correctAnswer: '5a',
        explanation: '8 - 3 = 5, így az összevont alak: 5a.',
        breakdown: [
          { label: 'Kivonás', value: '8 - 3 = 5' },
          { label: 'Eredmény', value: '5a' }
        ]
      },
      {
        id: 'q1-4',
        prompt: 'Mennyi az x + x + x összevonva?',
        question: 'Mennyi az x + x + x összevonva?',
        options: ['3x', 'x³', '3 + x', '3x³'],
        correctAnswer: '3x',
        explanation: 'Minden x előtt rejtett 1-es együttható áll: 1x + 1x + 1x = 3x.',
        breakdown: [
          { label: 'Együtthatók', value: '1 + 1 + 1 = 3' },
          { label: 'Eredmény', value: '3x' }
        ]
      },
      {
        id: 'q1-5',
        prompt: 'Mennyi a 6y - y kifejezés összevonva?',
        question: 'Mennyi a 6y - y kifejezés összevonva?',
        options: ['5y', '6', '5', '7y'],
        correctAnswer: '5y',
        explanation: 'Az y együtthatója 1: 6y - 1y = (6 - 1)y = 5y.',
        breakdown: [
          { label: 'Kivonás', value: '6 - 1 = 5' },
          { label: 'Eredmény', value: '5y' }
        ]
      },
      {
        id: 'q1-6',
        prompt: 'Mennyi a 2x - 7x kifejezés összevonva?',
        question: 'Mennyi a 2x - 7x kifejezés összevonva?',
        options: ['-5x', '5x', '-9x', '-5'],
        correctAnswer: '-5x',
        explanation: '2 - 7 = -5, tehát az eredmény: -5x.',
        breakdown: [
          { label: 'Előjeles összeg', value: '2 - 7 = -5' },
          { label: 'Eredmény', value: '-5x' }
        ]
      },
      {
        id: 'q1-7',
        prompt: 'Mennyi a -3b - 5b kifejezés összevont értéke?',
        question: 'Mennyi a -3b - 5b kifejezés összevont értéke?',
        options: ['-8b', '+2b', '-2b', '15b'],
        correctAnswer: '-8b',
        explanation: '-3 + (-5) = -8, így az eredmény: -8b.',
        breakdown: [
          { label: 'Együtthatók', value: '-3 - 5 = -8' },
          { label: 'Eredmény', value: '-8b' }
        ]
      },
      {
        id: 'q1-8',
        prompt: 'Mennyi a 4a - 4a kifejezés értéke?',
        question: 'Mennyi a 4a - 4a kifejezés értéke?',
        options: ['0', 'a', '0a', '1'],
        correctAnswer: '0',
        explanation: '4 - 4 = 0, és 0 · a = 0. A tag teljesen megszűnik.',
        breakdown: [
          { label: 'Számolás', value: '(4 - 4)a = 0a = 0' }
        ]
      },
      {
        id: 'q1-9',
        prompt: 'Összevonható-e a 2x + 3x² kifejezés egyetlen taggá?',
        question: 'Összevonható-e a 2x + 3x² kifejezés egyetlen taggá?',
        options: [
          'Nem, mert a hatványkitevőjük különbözik',
          'Igen, 5x³ lesz',
          'Igen, 5x² lesz',
          'Igen, 6x³ lesz'
        ],
        correctAnswer: 'Nem, mert a hatványkitevőjük különbözik',
        explanation: 'Csak azonos hatványon lévő betűs tagok vonhatók össze. 2x és 3x² nem egyneműek.',
        breakdown: [
          { label: '1. tag kitevője', value: '1 (x¹)' },
          { label: '2. tag kitevője', value: '2 (x²)' },
          { label: 'Következtetés', value: 'Nem vonhatók össze' }
        ]
      },
      {
        id: 'q1-10',
        prompt: 'Mennyi a 3x + 5 + 4x kifejezés összevont legegyszerűbb alakja?',
        question: 'Mennyi a 3x + 5 + 4x kifejezés összevont legegyszerűbb alakja?',
        options: ['7x + 5', '12x', '7x + 5x = 12x', '12'],
        correctAnswer: '7x + 5',
        explanation: 'Az x-es tagokat összevonjuk: 3x + 4x = 7x. Az 5 konstans tag változatlan marad: 7x + 5.',
        breakdown: [
          { label: 'x-es tagok', value: '3x + 4x = 7x' },
          { label: 'Szám tag', value: '+5' },
          { label: 'Végeredmény', value: '7x + 5' }
        ]
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Többváltozós & Zárójeles Kifejezések',
    subtitle: 'Több különböző változót és zárójelet tartalmazó kifejezések egyszerűsítése',
    range: '11 - 20. feladat',
    focus: 'Többváltozós & Zárójeles kifejezések',
    badgeBg: 'bg-indigo-50 dark:bg-indigo-950/40',
    badgeBorder: 'border-indigo-200 dark:border-indigo-800',
    badgeText: 'text-indigo-700 dark:text-indigo-300',
    iconBg: 'bg-indigo-600 text-white',
    questions: [
      {
        id: 'q2-1',
        prompt: 'Mennyi az 5a + 3b + 2a - 7b kifejezés összevont alakja?',
        question: 'Mennyi az 5a + 3b + 2a - 7b kifejezés összevont alakja?',
        options: ['7a - 4b', '7a + 10b', '3a - 4b', '3ab'],
        correctAnswer: '7a - 4b',
        explanation: 'Az a-s tagok: 5a + 2a = 7a; a b-s tagok: 3b - 7b = -4b ⟹ 7a - 4b.',
        breakdown: [
          { label: 'a tagok', value: '5a + 2a = 7a' },
          { label: 'b tagok', value: '3b - 7b = -4b' },
          { label: 'Eredmény', value: '7a - 4b' }
        ]
      },
      {
        id: 'q2-2',
        prompt: 'Egyszerűsítsd: 4x - (2x - 5)!',
        question: 'Egyszerűsítsd: 4x - (2x - 5)!',
        options: ['2x + 5', '2x - 5', '6x - 5', '2x'],
        correctAnswer: '2x + 5',
        explanation: 'A zárójel előtti mínusz megfordítja a jeleket: 4x - 2x + 5 = 2x + 5.',
        breakdown: [
          { label: 'Zárójelfelbontás', value: '4x - 2x + 5' },
          { label: 'Összevonás', value: '2x + 5' }
        ]
      },
      {
        id: 'q2-3',
        prompt: 'Mennyi a 3(2x + 4) - 5x kifejezés összevont alakja?',
        question: 'Mennyi a 3(2x + 4) - 5x kifejezés összevont alakja?',
        options: ['x + 12', 'x + 4', '11x + 12', '6x + 7'],
        correctAnswer: 'x + 12',
        explanation: 'Beszorzunk: 3 · 2x + 3 · 4 = 6x + 12. Ebből levonunk 5x-et: 6x - 5x + 12 = x + 12.',
        breakdown: [
          { label: 'Beszorzás', value: '6x + 12' },
          { label: 'Összevonás', value: '6x - 5x + 12 = x + 12' }
        ]
      },
      {
        id: 'q2-4',
        prompt: 'Egyszerűsítsd: 4x² + 3x - 2x² + 5x!',
        question: 'Egyszerűsítsd: 4x² + 3x - 2x² + 5x!',
        options: ['2x² + 8x', '10x³', '2x² + 2x', '6x² + 8x'],
        correctAnswer: '2x² + 8x',
        explanation: 'Az x²-es tagok: 4x² - 2x² = 2x²; az x-es tagok: 3x + 5x = 8x ⟹ 2x² + 8x.',
        breakdown: [
          { label: 'x² tagok', value: '4x² - 2x² = 2x²' },
          { label: 'x tagok', value: '3x + 5x = 8x' },
          { label: 'Eredmény', value: '2x² + 8x' }
        ]
      },
      {
        id: 'q2-5',
        prompt: 'Mennyi a 10 - 3(x + 2) kifejezés egyszerűsített alakja?',
        question: 'Mennyi a 10 - 3(x + 2) kifejezés egyszerűsített alakja?',
        options: ['4 - 3x', '16 - 3x', '7 - 3x', '4 + 3x'],
        correctAnswer: '4 - 3x',
        explanation: 'Beszorozzuk a -3-mal: 10 - 3x - 6. Konstansok összevonása: 10 - 6 = 4 ⟹ 4 - 3x.',
        breakdown: [
          { label: 'Beszorzás', value: '10 - 3x - 6' },
          { label: 'Összevonás', value: '4 - 3x' }
        ]
      },
      {
        id: 'q2-6',
        prompt: 'Egyszerűsítsd: 2(a + 3b) + 3(2a - b)!',
        question: 'Egyszerűsítsd: 2(a + 3b) + 3(2a - b)!',
        options: ['8a + 3b', '8a + 5b', '4a + 9b', '5a + 2b'],
        correctAnswer: '8a + 3b',
        explanation: '2a + 6b + 6a - 3b = (2a + 6a) + (6b - 3b) = 8a + 3b.',
        breakdown: [
          { label: 'Beszorzás', value: '2a + 6b + 6a - 3b' },
          { label: 'Összevonás', value: '8a + 3b' }
        ]
      },
      {
        id: 'q2-7',
        prompt: 'Mennyi az 1/3 x + 2/3 x kifejezés összevonva?',
        question: 'Mennyi az 1/3 x + 2/3 x kifejezés összevonva?',
        options: ['x', '3/6 x', '2/9 x', '3x'],
        correctAnswer: 'x',
        explanation: '1/3 + 2/3 = 3/3 = 1. Tehát 1x = x.',
        breakdown: [
          { label: 'Törtek összege', value: '1/3 + 2/3 = 3/3 = 1' },
          { label: 'Eredmény', value: '1x = x' }
        ]
      },
      {
        id: 'q2-8',
        prompt: 'Egyszerűsítsd: -(3x - 4) + (2x - 1)!',
        question: 'Egyszerűsítsd: -(3x - 4) + (2x - 1)!',
        options: ['-x + 3', '-x - 5', '5x + 3', '-5x + 5'],
        correctAnswer: '-x + 3',
        explanation: '-3x + 4 + 2x - 1 = (-3x + 2x) + (4 - 1) = -x + 3.',
        breakdown: [
          { label: 'Felbontás', value: '-3x + 4 + 2x - 1' },
          { label: 'Összevonás', value: '-x + 3' }
        ]
      },
      {
        id: 'q2-9',
        prompt: 'Mennyi a 7ab - 2ba kifejezés összevont értéke?',
        question: 'Mennyi a 7ab - 2ba kifejezés összevont értéke?',
        options: ['5ab', '9ab', 'Nem vonható össze', '5a²b²'],
        correctAnswer: '5ab',
        explanation: 'A szorzás tényezői felcserélhetők: ba = ab, tehát a két tag egynemű: 7ab - 2ab = 5ab.',
        breakdown: [
          { label: 'Azonosság', value: 'ba = ab' },
          { label: 'Számolás', value: '7ab - 2ab = 5ab' }
        ]
      },
      {
        id: 'q2-10',
        prompt: 'Egy háromszög oldalai: x, x + 3 és 2x - 1. Mennyi a kerülete (K) összevonva?',
        question: 'Egy háromszög oldalai: x, x + 3 és 2x - 1. Mennyi a kerülete (K) összevonva?',
        options: ['4x + 2', '4x + 4', '2x + 2', '3x + 2'],
        correctAnswer: '4x + 2',
        explanation: 'K = x + (x + 3) + (2x - 1) = (1 + 1 + 2)x + (3 - 1) = 4x + 2.',
        breakdown: [
          { label: 'Oldalak összege', value: 'x + x + 3 + 2x - 1' },
          { label: 'Összevonás', value: '4x + 2' }
        ]
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Helyettesítési Érték & Hatványok',
    subtitle: 'Kifejezések pontos számértékének meghatározása negatív számok és törtek esetén',
    range: '21 - 30. feladat',
    focus: 'Helyettesítési érték & Hatványok',
    badgeBg: 'bg-emerald-50 dark:bg-emerald-950/40',
    badgeBorder: 'border-emerald-200 dark:border-emerald-800',
    badgeText: 'text-emerald-700 dark:text-emerald-300',
    iconBg: 'bg-emerald-600 text-white',
    questions: [
      {
        id: 'q3-1',
        prompt: 'Számítsd ki a 3x + 7 kifejezés helyettesítési értékét, ha x = 4!',
        question: 'Számítsd ki a 3x + 7 kifejezés helyettesítési értékét, ha x = 4!',
        options: ['19', '34', '14', '25'],
        correctAnswer: '19',
        explanation: 'Behelyettesítünk: 3 · (4) + 7 = 12 + 7 = 19.',
        breakdown: [
          { label: 'Szorzás', value: '3 · 4 = 12' },
          { label: 'Összeadás', value: '12 + 7 = 19' }
        ]
      },
      {
        id: 'q3-2',
        prompt: 'Mennyi a 2x - 9 kifejezés értéke, ha x = -3?',
        question: 'Mennyi a 2x - 9 kifejezés értéke, ha x = -3?',
        options: ['-15', '-3', '15', '-12'],
        correctAnswer: '-15',
        explanation: '2 · (-3) - 9 = -6 - 9 = -15.',
        breakdown: [
          { label: 'Szorzás', value: '2 · (-3) = -6' },
          { label: 'Kivonás', value: '-6 - 9 = -15' }
        ]
      },
      {
        id: 'q3-3',
        prompt: 'Mennyi az x² kifejezés értéke, ha x = -5?',
        question: 'Mennyi az x² kifejezés értéke, ha x = -5?',
        options: ['25', '-25', '-10', '10'],
        correctAnswer: '25',
        explanation: '(-5)² = (-5) · (-5) = +25. Negatív szám négyzete mindig pozitív!',
        breakdown: [
          { label: 'Behelyettesítés', value: '(-5)²' },
          { label: 'Számolás', value: '(-5) · (-5) = 25' }
        ]
      },
      {
        id: 'q3-4',
        prompt: 'Mennyi a -x² kifejezés értéke, ha x = 4?',
        question: 'Mennyi a -x² kifejezés értéke, ha x = 4?',
        options: ['-16', '16', '-8', '8'],
        correctAnswer: '-16',
        explanation: 'Előbb a 4 négyzete: 4² = 16, majd elé kerül a mínuszjel: -16.',
        breakdown: [
          { label: 'Hatványozás', value: '4² = 16' },
          { label: 'Mínuszjel', value: '-16' }
        ]
      },
      {
        id: 'q3-5',
        prompt: 'Mennyi a 2x² - 3x + 1 kifejezés értéke, ha x = -2?',
        question: 'Mennyi a 2x² - 3x + 1 kifejezés értéke, ha x = -2?',
        options: ['15', '3', '-1', '13'],
        correctAnswer: '15',
        explanation: '2 · (-2)² - 3 · (-2) + 1 = 2 · 4 - (-6) + 1 = 8 + 6 + 1 = 15.',
        breakdown: [
          { label: '1. tag (négyzet)', value: '2 · 4 = 8' },
          { label: '2. tag (szorzás)', value: '-3 · (-2) = +6' },
          { label: 'Összeg', value: '8 + 6 + 1 = 15' }
        ]
      },
      {
        id: 'q3-6',
        prompt: 'Mennyi a 3a - 2b kifejezés értéke, ha a = 4 és b = -3?',
        question: 'Mennyi a 3a - 2b kifejezés értéke, ha a = 4 és b = -3?',
        options: ['18', '6', '-18', '12'],
        correctAnswer: '18',
        explanation: '3 · (4) - 2 · (-3) = 12 - (-6) = 12 + 6 = 18.',
        breakdown: [
          { label: '3a', value: '3 · 4 = 12' },
          { label: '-2b', value: '-2 · (-3) = +6' },
          { label: 'Összeg', value: '12 + 6 = 18' }
        ]
      },
      {
        id: 'q3-7',
        prompt: 'Mennyi a (2x - 6) / (x + 1) törtkifejezés értéke, ha x = 5?',
        question: 'Mennyi a (2x - 6) / (x + 1) törtkifejezés értéke, ha x = 5?',
        options: ['4/6 = 2/3', '4/5', '1', '2'],
        correctAnswer: '4/6 = 2/3',
        explanation: 'Számláló: 2 · 5 - 6 = 10 - 6 = 4. Nevező: 5 + 1 = 6. Eredmény: 4/6 = 2/3.',
        breakdown: [
          { label: 'Számláló', value: '2 · 5 - 6 = 4' },
          { label: 'Nevező', value: '5 + 1 = 6' },
          { label: 'Tört értéke', value: '4/6 = 2/3' }
        ]
      },
      {
        id: 'q3-8',
        prompt: 'Milyen x érték esetén lesz a 3x - 12 kifejezés értéke 0?',
        question: 'Milyen x érték esetén lesz a 3x - 12 kifejezés értéke 0?',
        options: ['x = 4', 'x = -4', 'x = 12', 'x = 0'],
        correctAnswer: 'x = 4',
        explanation: '3 · 4 - 12 = 12 - 12 = 0.',
        breakdown: [
          { label: 'Ellenőrzés (x=4)', value: '3 · 4 - 12 = 12 - 12 = 0' }
        ]
      },
      {
        id: 'q3-9',
        prompt: 'Mennyi a (x + 3)² kifejezés értéke, ha x = -7?',
        question: 'Mennyi a (x + 3)² kifejezés értéke, ha x = -7?',
        options: ['16', '-16', '100', '40'],
        correctAnswer: '16',
        explanation: 'Először a zárójel: -7 + 3 = -4. Majd a négyzet: (-4)² = 16.',
        breakdown: [
          { label: 'Zárójel belseje', value: '-7 + 3 = -4' },
          { label: 'Négyzetre emelés', value: '(-4)² = 16' }
        ]
      },
      {
        id: 'q3-10',
        prompt: 'Mennyi a 4(x - 2) - 3(x - 5) kifejezés értéke, ha x = 100?',
        question: 'Mennyi a 4(x - 2) - 3(x - 5) kifejezés értéke, ha x = 100?',
        options: ['107', '100', '93', '115'],
        correctAnswer: '107',
        explanation: 'Előbb összevonunk: 4x - 8 - 3x + 15 = x + 7. Ha x = 100 ⟹ 100 + 7 = 107.',
        breakdown: [
          { label: 'Összevonás', value: '4x - 8 - 3x + 15 = x + 7' },
          { label: 'Behelyettesítés (x=100)', value: '100 + 7 = 107' }
        ]
      }
    ]
  }
};

export const CombiningSubstitutionQuiz: React.FC<CombiningSubstitutionQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      title="7. Összevonás és Helyettesítési Érték Kvíz"
      subtitle="Teszteld a tudásodat az egynemű tagok összevonásában és a kifejezések helyettesítési értékének kiszámításában!"
      documentId="grade-7-racionalis-szamok-algebra-osszevonas-ertek-quiz"
      badgeText="7. Osztály • Algebra Műveletek"
      themeColor="amber"
      cheatSheetCards={cheatSheetCards}
      levels={quizLevels}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      matcherComponent={<CombiningSubstitutionMatcher />}
      sorterComponent={<CombiningSubstitutionSorter />}
    />
  );
};
