import React from 'react';
import { QuizTemplate, Question, CheatSheetCard } from '../QuizTemplate';
import { PolynomialMultMatcher } from './PolynomialMultMatcher';
import { PolynomialMultSorter } from './PolynomialMultSorter';
import { Boxes, Sparkles, Square, Scale } from 'lucide-react';

interface PolynomialMultQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    id: 'c1',
    title: 'Kéttagú Szorzása Kéttagúval',
    icon: <Boxes className="w-4 h-4 text-indigo-600" />,
    formula: '(a + b)(c + d) = ac + ad + bc + bd',
    note: 'Minden tagot minden taggal megszorzunk (összesen 4 tag), majd az egynemű tagokat összevonjuk.'
  },
  {
    id: 'c2',
    title: '1. & 2. Azonosság (Teljes Négyzetek)',
    icon: <Square className="w-4 h-4 text-emerald-600" />,
    formula: '(a ± b)² = a² ± 2ab + b²',
    note: 'Sose felejtsd el a középső kétszeres szorzatot (±2ab)! Pl. (x + 3)² = x² + 6x + 9 (nem x² + 9!).'
  },
  {
    id: 'c3',
    title: '3. Azonosság (Négyzetek Különbsége)',
    icon: <Scale className="w-4 h-4 text-purple-600" />,
    formula: '(a + b)(a - b) = a² - b²',
    note: 'A középső tagok (+ab - ab = 0) kiejtik egymást. Pl. (x + 5)(x - 5) = x² - 25.'
  },
  {
    id: 'c4',
    title: 'Szorzattá Alakítás & Fejszámolási Trükk',
    icon: <Sparkles className="w-4 h-4 text-amber-600" />,
    formula: 'a² - b² = (a + b)(a - b)',
    note: 'Fejszámolás: 52 · 48 = (50 + 2)(50 - 2) = 50² - 2² = 2500 - 4 = 2496!'
  }
];

const questions: Question[] = [
  // =========================================================================
  // --- 1. SZINT: ALAPVETŐ KÉTTAGÚ SZORZÁSOK ÉS NEVEZETES AZONOSSÁGOK (1-10) -
  // =========================================================================
  {
    id: 'q1-1',
    level: 1,
    question: 'Végezd el a szorzást: (x + 2)(x + 3) = ?',
    options: [
      'x² + 5x + 6',
      'x² + 6x + 5',
      'x² + 5x + 5',
      '2x + 5'
    ],
    correctAnswer: 'x² + 5x + 6',
    explanation: '(x + 2)(x + 3) = x · x + x · 3 + 2 · x + 2 · 3 = x² + 3x + 2x + 6 = x² + 5x + 6.',
    hint: 'x · x = x², a középső tagok: 3x + 2x = 5x, a konstans: 2 · 3 = 6.',
    breakdown: [
      { label: 'Beszorzás', value: 'x² + 3x + 2x + 6' },
      { label: 'Összevonás', value: 'x² + 5x + 6' }
    ]
  },
  {
    id: 'q1-2',
    level: 1,
    question: 'Hány tag keletkezik az összevonás ELŐTT, amikor egy kéttagú kifejezést megszorzunk egy másik kéttagúval?',
    options: [
      '4 tag (2 · 2 = 4)',
      '2 tag',
      '3 tag',
      '6 tag'
    ],
    correctAnswer: '4 tag (2 · 2 = 4)',
    explanation: 'Mivel az első zárójel mindkét tagját megszorozzuk a második zárójel mindkét tagjával, 2 · 2 = 4 részszorzat (tag) keletkezik: ac + ad + bc + bd.',
    hint: '2 tag az elsőben, 2 a másodikban: 2 · 2 = 4.',
    breakdown: [
      { label: 'Tagok száma', value: '2 × 2 = 4 tag' }
    ]
  },
  {
    id: 'q1-3',
    level: 1,
    question: 'Fejtsd ki a nevezetes azonossággal: (x + 5)² = ?',
    options: [
      'x² + 10x + 25',
      'x² + 25',
      'x² + 5x + 25',
      '2x + 10'
    ],
    correctAnswer: 'x² + 10x + 25',
    explanation: '(a + b)² = a² + 2ab + b² alapján: x² + 2 · x · 5 + 5² = x² + 10x + 25.',
    hint: 'Ne feledd a kétszeres szorzatot: 2 · x · 5 = 10x!',
    breakdown: [
      { label: 'Első tag négyzete', value: 'x²' },
      { label: 'Kétszeres szorzat', value: '2 · x · 5 = 10x' },
      { label: 'Második tag négyzete', value: '5² = 25' },
      { label: 'Eredmény', value: 'x² + 10x + 25' }
    ]
  },
  {
    id: 'q1-4',
    level: 1,
    question: 'Fejtsd ki a különbség négyzetét: (x - 4)² = ?',
    options: [
      'x² - 8x + 16',
      'x² - 16',
      'x² - 4x + 16',
      'x² + 8x + 16'
    ],
    correctAnswer: 'x² - 8x + 16',
    explanation: '(a - b)² = a² - 2ab + b² alapján: x² - 2 · x · 4 + 4² = x² - 8x + 16.',
    hint: 'A középső tag előjele negatív: -2 · 4x = -8x, míg a (-4)² = +16.',
    breakdown: [
      { label: 'Első tag négyzete', value: 'x²' },
      { label: 'Kétszeres szorzat', value: '-2 · x · 4 = -8x' },
      { label: 'Második tag négyzete', value: '(-4)² = 16' },
      { label: 'Eredmény', value: 'x² - 8x + 16' }
    ]
  },
  {
    id: 'q1-5',
    level: 1,
    question: 'Végezd el a szorzást a négyzetek különbsége azonossággal: (x + 6)(x - 6) = ?',
    options: [
      'x² - 36',
      'x² + 36',
      'x² - 12x - 36',
      'x² - 12'
    ],
    correctAnswer: 'x² - 36',
    explanation: '(a + b)(a - b) = a² - b² alapján: x² - 6² = x² - 36.',
    hint: 'A középső tagok (+6x és -6x) kiejtik egymást: x² - 6² = x² - 36.',
    breakdown: [
      { label: 'Azonosság', value: '(a + b)(a - b) = a² - b²' },
      { label: 'Behelyettesítés', value: 'x² - 6²' },
      { label: 'Eredmény', value: 'x² - 36' }
    ]
  },
  {
    id: 'q1-6',
    level: 1,
    question: 'Végezd el a szorzást és vonj össze: (x - 3)(x + 4) = ?',
    options: [
      'x² + x - 12',
      'x² - x - 12',
      'x² + 7x - 12',
      'x² - 12'
    ],
    correctAnswer: 'x² + x - 12',
    explanation: 'x · x + x · 4 - 3 · x - 3 · 4 = x² + 4x - 3x - 12 = x² + x - 12.',
    hint: '4x - 3x = +1x = +x, és (-3) · 4 = -12.',
    breakdown: [
      { label: 'Részszorzatok', value: 'x² + 4x - 3x - 12' },
      { label: 'Összevonás', value: 'x² + x - 12' }
    ]
  },
  {
    id: 'q1-7',
    level: 1,
    question: 'Fejtsd ki a kéttagú összeget: (a + 1)² = ?',
    options: [
      'a² + 2a + 1',
      'a² + 1',
      'a² + a + 1',
      '2a + 2'
    ],
    correctAnswer: 'a² + 2a + 1',
    explanation: 'a² + 2 · a · 1 + 1² = a² + 2a + 1.',
    hint: '2 · a · 1 = 2a.',
    breakdown: [
      { label: 'Azonosság', value: 'a² + 2(a)(1) + 1²' },
      { label: 'Eredmény', value: 'a² + 2a + 1' }
    ]
  },
  {
    id: 'q1-8',
    level: 1,
    question: 'Végezd el a szorzást: (2x + 1)(x + 2) = ?',
    options: [
      '2x² + 5x + 2',
      '2x² + 4x + 2',
      '2x² + 3x + 2',
      '3x² + 5x + 2'
    ],
    correctAnswer: '2x² + 5x + 2',
    explanation: '2x · x + 2x · 2 + 1 · x + 1 · 2 = 2x² + 4x + x + 2 = 2x² + 5x + 2.',
    hint: '4x + x = 5x.',
    breakdown: [
      { label: 'Kifejtés', value: '2x² + 4x + x + 2' },
      { label: 'Összevonás', value: '2x² + 5x + 2' }
    ]
  },
  {
    id: 'q1-9',
    level: 1,
    question: 'Melyik azonosság fejezi ki a kéttagú összeg négyzetét a matematikában?',
    options: [
      '(a + b)² = a² + 2ab + b²',
      '(a + b)² = a² + b²',
      '(a + b)² = a² + ab + b²',
      '(a + b)² = 2a + 2b'
    ],
    correctAnswer: '(a + b)² = a² + 2ab + b²',
    explanation: 'A kéttagú összeg négyzete egyenlő az első tag négyzetének, a két tag kétszeres szorzatának (+2ab) és a második tag négyzetének összegével.',
    hint: 'Mindig szerepel a +2ab középső tag!',
    breakdown: [
      { label: 'Képlet', value: '(a + b)² = a² + 2ab + b²' }
    ]
  },
  {
    id: 'q1-10',
    level: 1,
    question: 'Végezd el a szorzást: (x - 7)(x - 2) = ?',
    options: [
      'x² - 9x + 14',
      'x² - 9x - 14',
      'x² + 9x + 14',
      'x² - 5x + 14'
    ],
    correctAnswer: 'x² - 9x + 14',
    explanation: 'x · x - 2x - 7x + (-7) · (-2) = x² - 9x + 14.',
    hint: '(-2x) + (-7x) = -9x, és (-7) · (-2) = +14.',
    breakdown: [
      { label: 'Kifejtés', value: 'x² - 2x - 7x + 14' },
      { label: 'Összevonás', value: 'x² - 9x + 14' }
    ]
  },

  // =========================================================================
  // --- 2. SZINT: EGYÜTTHATÓK, ELŐJELEK ÉS ÖSSZETETT KIFEJEZÉSEK (11-20) -----
  // =========================================================================
  {
    id: 'q2-1',
    level: 2,
    question: 'Fejtsd ki az azonossággal: (2x + 3)² = ?',
    options: [
      '4x² + 12x + 9',
      '4x² + 6x + 9',
      '2x² + 12x + 9',
      '4x² + 9'
    ],
    correctAnswer: '4x² + 12x + 9',
    explanation: '(2x)² + 2 · (2x) · 3 + 3² = 4x² + 12x + 9.',
    hint: '(2x)² = 4x², a kétszeres szorzat pedig: 2 · 2x · 3 = 12x.',
    breakdown: [
      { label: '(2x)²', value: '4x²' },
      { label: '2 · 2x · 3', value: '12x' },
      { label: '3²', value: '9' },
      { label: 'Eredmény', value: '4x² + 12x + 9' }
    ]
  },
  {
    id: 'q2-2',
    level: 2,
    question: 'Fejtsd ki: (3x - 4)² = ?',
    options: [
      '9x² - 24x + 16',
      '9x² - 12x + 16',
      '9x² - 16',
      '9x² - 24x - 16'
    ],
    correctAnswer: '9x² - 24x + 16',
    explanation: '(3x)² - 2 · (3x) · 4 + 4² = 9x² - 24x + 16.',
    hint: '(3x)² = 9x², a középső tag: -2 · 3x · 4 = -24x, a konstans: (-4)² = +16.',
    breakdown: [
      { label: 'Első tag', value: '(3x)² = 9x²' },
      { label: 'Kétszeres szorzat', value: '-2 · 3x · 4 = -24x' },
      { label: 'Második tag', value: '(-4)² = +16' },
      { label: 'Eredmény', value: '9x² - 24x + 16' }
    ]
  },
  {
    id: 'q2-3',
    level: 2,
    question: 'Végezd el a szorzást: (4x + 5)(4x - 5) = ?',
    options: [
      '16x² - 25',
      '16x² + 25',
      '16x² - 40x - 25',
      '8x² - 25'
    ],
    correctAnswer: '16x² - 25',
    explanation: '(4x)² - 5² = 16x² - 25.',
    hint: '(a+b)(a-b) = a² - b². (4x)² = 16x² és 5² = 25.',
    breakdown: [
      { label: '(4x)²', value: '16x²' },
      { label: '5²', value: '25' },
      { label: 'Különbség', value: '16x² - 25' }
    ]
  },
  {
    id: 'q2-4',
    level: 2,
    question: 'Végezd el a szorzást és egyszerűsíts: (2x - 3)(3x + 2) = ?',
    options: [
      '6x² - 5x - 6',
      '6x² + 5x - 6',
      '6x² - 13x - 6',
      '6x² - 6'
    ],
    correctAnswer: '6x² - 5x - 6',
    explanation: '2x · 3x + 2x · 2 - 3 · 3x - 3 · 2 = 6x² + 4x - 9x - 6 = 6x² - 5x - 6.',
    hint: '4x - 9x = -5x.',
    breakdown: [
      { label: 'Kifejtés', value: '6x² + 4x - 9x - 6' },
      { label: 'Összevonás', value: '6x² - 5x - 6' }
    ]
  },
  {
    id: 'q2-5',
    level: 2,
    question: 'Egyszerűsítsd a kifejezést: (x + 3)² - (x - 3)² = ?',
    options: [
      '12x',
      '0',
      '2x² + 18',
      '6x'
    ],
    correctAnswer: '12x',
    explanation: '(x² + 6x + 9) - (x² - 6x + 9) = x² + 6x + 9 - x² + 6x - 9 = 12x.',
    hint: 'x² és 9 kiejtik egymást: 6x - (-6x) = 12x.',
    breakdown: [
      { label: '1. azonosság', value: 'x² + 6x + 9' },
      { label: '2. azonosság levonva', value: '- x² + 6x - 9' },
      { label: 'Eredmény', value: '12x' }
    ]
  },
  {
    id: 'q2-6',
    level: 2,
    question: 'Fejtsd ki a kétváltozós azonosságot: (3a + 2b)² = ?',
    options: [
      '9a² + 12ab + 4b²',
      '9a² + 6ab + 4b²',
      '9a² + 4b²',
      '3a² + 12ab + 2b²'
    ],
    correctAnswer: '9a² + 12ab + 4b²',
    explanation: '(3a)² + 2 · (3a) · (2b) + (2b)² = 9a² + 12ab + 4b².',
    hint: '2 · (3a) · (2b) = 12ab.',
    breakdown: [
      { label: '(3a)²', value: '9a²' },
      { label: '2 · 3a · 2b', value: '12ab' },
      { label: '(2b)²', value: '4b²' },
      { label: 'Eredmény', value: '9a² + 12ab + 4b²' }
    ]
  },
  {
    id: 'q2-7',
    level: 2,
    question: 'Számítsd ki: (x + 4)(x - 4) + 16 = ?',
    options: [
      'x²',
      'x² + 32',
      'x² - 32',
      '2x²'
    ],
    correctAnswer: 'x²',
    explanation: '(x + 4)(x - 4) = x² - 16. Hozzáadva 16-ot: x² - 16 + 16 = x².',
    hint: 'x² - 16 + 16 = x².',
    breakdown: [
      { label: 'Szorzat', value: 'x² - 16' },
      { label: '+16 hozzáadása', value: 'x² - 16 + 16 = x²' }
    ]
  },
  {
    id: 'q2-8',
    level: 2,
    question: 'Egy \'x\' oldalú négyzet oldalát minden irányban megnöveljük 3 cm-rel. Mennyivel nő meg a területe?',
    options: [
      '6x + 9',
      '9',
      '3x + 9',
      'x² + 9'
    ],
    correctAnswer: '6x + 9',
    explanation: 'Az új négyzet területe (x + 3)² = x² + 6x + 9. A növekmény: (x² + 6x + 9) - x² = 6x + 9.',
    hint: '(x + 3)² - x² = x² + 6x + 9 - x² = 6x + 9.',
    breakdown: [
      { label: 'Új terület', value: '(x + 3)² = x² + 6x + 9' },
      { label: 'Régi terület levonása', value: 'x² + 6x + 9 - x²' },
      { label: 'Növekmény', value: '6x + 9' }
    ]
  },
  {
    id: 'q2-9',
    level: 2,
    question: 'Végezd el a szorzást: (5x - 2y)(5x + 2y) = ?',
    options: [
      '25x² - 4y²',
      '25x² + 4y²',
      '25x² - 20xy - 4y²',
      '10x² - 4y²'
    ],
    correctAnswer: '25x² - 4y²',
    explanation: '(5x)² - (2y)² = 25x² - 4y².',
    hint: '(a - b)(a + b) = a² - b². (5x)² = 25x² és (2y)² = 4y².',
    breakdown: [
      { label: '(5x)²', value: '25x²' },
      { label: '(2y)²', value: '4y²' },
      { label: 'Eredmény', value: '25x² - 4y²' }
    ]
  },
  {
    id: 'q2-10',
    level: 2,
    question: 'Melyik kifejezés az (x - 6)² azonosság helyes kibontott alakja?',
    options: [
      'x² - 12x + 36',
      'x² - 36',
      'x² - 6x + 36',
      'x² + 12x + 36'
    ],
    correctAnswer: 'x² - 12x + 36',
    explanation: 'x² - 2 · x · 6 + 6² = x² - 12x + 36.',
    hint: 'A középső tag -12x, a konstans tag (+36).',
    breakdown: [
      { label: 'Azonosság', value: 'x² - 2·6x + 6²' },
      { label: 'Kifejtve', value: 'x² - 12x + 36' }
    ]
  },

  // =========================================================================
  // --- 3. SZINT: SZORZATTÁ ALAKÍTÁS, TÖRTEK ÉS FEJSZÁMOLÁSI TRÜKKÖK (21-30) -
  // =========================================================================
  {
    id: 'q3-1',
    level: 3,
    question: 'Alakítsd szorzattá a négyzetek különbsége azonossággal: x² - 81 = ?',
    options: [
      '(x + 9)(x - 9)',
      '(x - 9)²',
      '(x + 9)²',
      '(x - 81)(x + 1)'
    ],
    correctAnswer: '(x + 9)(x - 9)',
    explanation: 'Mivel 81 = 9², ezért a² - b² = (a + b)(a - b) alapján x² - 81 = (x + 9)(x - 9).',
    hint: '√81 = 9, így (x + 9)(x - 9).',
    breakdown: [
      { label: 'Négyzetek', value: 'x² - 9²' },
      { label: 'Szorzat alak', value: '(x + 9)(x - 9)' }
    ]
  },
  {
    id: 'q3-2',
    level: 3,
    question: 'Alakítsd szorzattá: 4x² - 49 = ?',
    options: [
      '(2x + 7)(2x - 7)',
      '(4x + 7)(4x - 7)',
      '(2x - 7)²',
      '(2x + 49)(2x - 1)'
    ],
    correctAnswer: '(2x + 7)(2x - 7)',
    explanation: '4x² = (2x)² és 49 = 7², így (2x + 7)(2x - 7).',
    hint: '√(4x²) = 2x és √49 = 7.',
    breakdown: [
      { label: 'Négyzetek', value: '(2x)² - 7²' },
      { label: 'Szorzat', value: '(2x + 7)(2x - 7)' }
    ]
  },
  {
    id: 'q3-3',
    level: 3,
    question: 'Ismerd fel a teljes négyzetet és alakítsd szorzattá: x² - 14x + 49 = ?',
    options: [
      '(x - 7)²',
      '(x + 7)²',
      '(x - 7)(x + 7)',
      '(x - 14)²'
    ],
    correctAnswer: '(x - 7)²',
    explanation: 'x² - 2 · x · 7 + 7² = (x - 7)². A középső tag negatív, így kéttagú különbség négyzete.',
    hint: '√49 = 7, és 2 · 7 = 14. Mivel a középső tag negatív (-14x), ezért (x - 7)²',
    breakdown: [
      { label: 'Ellenőrzés', value: '2 · x · 7 = 14x' },
      { label: 'Szorzat alak', value: '(x - 7)²' }
    ]
  },
  {
    id: 'q3-4',
    level: 3,
    question: 'Egyszerűsítsd az algebrai törtet számláló-átalakítással: (x² - 25) / (x - 5) = ? (ha x ≠ 5)',
    options: [
      'x + 5',
      'x - 5',
      'x + 25',
      '5'
    ],
    correctAnswer: 'x + 5',
    explanation: 'Számláló: x² - 25 = (x - 5)(x + 5). Az (x - 5)-tel egyszerűsítve: x + 5.',
    hint: 'Bontsd fel a számlálót (x - 5)(x + 5)-re, majd egyszerűsíts!',
    breakdown: [
      { label: 'Számláló szorzattá alakítása', value: '(x - 5)(x + 5)' },
      { label: 'Egyszerűsítés (x - 5)-tel', value: 'x + 5' }
    ]
  },
  {
    id: 'q3-5',
    level: 3,
    question: 'Számítsd ki fejben a négyzetek különbsége segítségével: 52 · 48 = ?',
    options: [
      '2496',
      '2500',
      '2494',
      '2504'
    ],
    correctAnswer: '2496',
    explanation: '52 · 48 = (50 + 2)(50 - 2) = 50² - 2² = 2500 - 4 = 2496.',
    hint: '(50 + 2)(50 - 2) = 50² - 2² = 2500 - 4.',
    breakdown: [
      { label: 'Felbontás', value: '(50 + 2) · (50 - 2)' },
      { label: 'Azonosság', value: '50² - 2² = 2500 - 4' },
      { label: 'Eredmény', value: '2496' }
    ]
  },
  {
    id: 'q3-6',
    level: 3,
    question: 'Számítsd ki fejben a trükk segítségével: 103 · 97 = ?',
    options: [
      '9991',
      '9999',
      '9981',
      '10009'
    ],
    correctAnswer: '9991',
    explanation: '103 · 97 = (100 + 3)(100 - 3) = 100² - 3² = 10000 - 9 = 9991.',
    hint: '100² - 3² = 10000 - 9 = 9991.',
    breakdown: [
      { label: 'Felbontás', value: '(100 + 3) · (100 - 3)' },
      { label: 'Azonosság', value: '10000 - 9' },
      { label: 'Eredmény', value: '9991' }
    ]
  },
  {
    id: 'q3-7',
    level: 3,
    question: 'Egyszerűsítsd a törtet: (x² + 6x + 9) / (x + 3) = ? (ha x ≠ -3)',
    options: [
      'x + 3',
      'x - 3',
      'x² + 3',
      '1'
    ],
    correctAnswer: 'x + 3',
    explanation: 'Számláló: x² + 6x + 9 = (x + 3)². Egyszerűsítve (x + 3)-mal: x + 3.',
    hint: 'A számláló (x + 3)² teljes négyzet.',
    breakdown: [
      { label: 'Számláló', value: '(x + 3)²' },
      { label: 'Egyszerűsítés', value: '(x + 3)² / (x + 3) = x + 3' }
    ]
  },
  {
    id: 'q3-8',
    level: 3,
    question: 'Végezd el a műveleteket és egyszerűsíts: (2x - 1)(x + 4) - (x + 2)² = ?',
    options: [
      'x² + 3x - 8',
      'x² + 7x - 8',
      'x² + 3x',
      '3x² + 11x'
    ],
    correctAnswer: 'x² + 3x - 8',
    explanation: '(2x² + 8x - x - 4) - (x² + 4x + 4) = (2x² + 7x - 4) - (x² + 4x + 4) = x² + 3x - 8.',
    hint: '1. szorzat: 2x² + 7x - 4. 2. tag felbontva: x² + 4x + 4. Ügyelj a zárójel előtti mínuszra!',
    breakdown: [
      { label: '1. szorzat', value: '2x² + 7x - 4' },
      { label: '2. tag levonva', value: '- x² - 4x - 4' },
      { label: 'Összevonás', value: 'x² + 3x - 8' }
    ]
  },
  {
    id: 'q3-9',
    level: 3,
    question: 'Melyik tag hiányzik a pontozott helyről: 9x² + ... + 25 = (3x + 5)² ?',
    options: [
      '30x',
      '15x',
      '60x',
      '30x²'
    ],
    correctAnswer: '30x',
    explanation: 'A kétszeres szorzat: 2 · (3x) · 5 = 30x.',
    hint: '2 · (első tag) · (második tag) = 2 · 3x · 5 = 30x.',
    breakdown: [
      { label: 'Kétszeres szorzat', value: '2 · 3x · 5 = 30x' }
    ]
  },
  {
    id: 'q3-10',
    level: 3,
    question: 'Számítsd ki a 65² - 35² kifejezés pontos értékét négyzetre emelés nélkül, a négyzetek különbsége azonossággal!',
    options: [
      '3000',
      '900',
      '3600',
      '1200'
    ],
    correctAnswer: '3000',
    explanation: 'a² - b² = (a + b)(a - b) alapján: (65 + 35)(65 - 35) = 100 · 30 = 3000.',
    hint: '(65 + 35) · (65 - 35) = 100 · 30 = 3000.',
    breakdown: [
      { label: 'Azonosság', value: '(65 + 35) · (65 - 35)' },
      { label: 'Számolás', value: '100 · 30' },
      { label: 'Eredmény', value: '3000' }
    ]
  }
];

export const PolynomialMultQuiz: React.FC<PolynomialMultQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      topicId="g8-polynomial-mult"
      grade={8}
      chapterId="szamok-es-betuk"
      topicTitle="Többtagú kifejezések szorzata"
      emoji="🎯"
      title="11. Többtagú kifejezések szorzata – Kvíz"
      subtitle="30 feladat 3 nehézségi szinten: Kéttagú szorzatok, a 3 nevezetes azonosság, szorzattá alakítás és fejszámolási trükkök"
      questions={questions}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      documentId="grade-8-szamok-betuk-polynomial-mult-quiz"
      pdfFilename="8_osztaly_tobbtagu_kifejezesek_szorzata_kviz.pdf"
      badgeColor="indigo"
      matcherComponent={<PolynomialMultMatcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} />}
      sorterComponent={<PolynomialMultSorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} />}
      cheatSheetCards={cheatSheetCards}
    />
  );
};

export default PolynomialMultQuiz;
