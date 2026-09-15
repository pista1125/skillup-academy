import React from 'react';
import { QuizTemplate, Question, CheatSheetCard } from '../QuizTemplate';
import { FactoringMatcher } from './FactoringMatcher';
import { FactoringSorter } from './FactoringSorter';
import { Scissors, Sparkles, Layers, ArrowLeftRight } from 'lucide-react';

interface FactoringQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    id: 'c1',
    title: 'Egytagúak Szorzása',
    icon: <Scissors className="w-4 h-4 text-purple-600" />,
    formula: '(A · xⁿ) · (B · xᵐ) = (A · B) · xⁿ⁺ᵐ',
    note: 'Számok a számokkal (együtthatók szorzata), azonos betűk kitevői összeadódnak! Pl. 2x² · 3x³ = 6x⁵.'
  },
  {
    id: 'c2',
    title: 'Zárójelfelbontás (Disztributivitás)',
    icon: <Sparkles className="w-4 h-4 text-indigo-600" />,
    formula: 'k · (a + b - c) = k·a + k·b - k·c',
    note: 'A külső szorzóval a zárójel MINDEN tagját meg kell szorozni! Negatív szorzó esetén a belső előjelek megfordulnak.'
  },
  {
    id: 'c3',
    title: 'Közös Tényező Kiemelése',
    icon: <ArrowLeftRight className="w-4 h-4 text-emerald-600" />,
    formula: 'LNKO(együtthatók) · legkisebb kitevőjű közös változó',
    note: 'A zárójelbontás fordítottja: 6x² + 9x = 3x · (2x + 3). Ellenőrzés: bontsd fel fejben a zárójelet!'
  },
  {
    id: 'c4',
    title: 'Negatív Előjel Kiemelése',
    icon: <Layers className="w-4 h-4 text-rose-600" />,
    formula: '-Ax - B = -(Ax + B)  |  -4x - 8 = -4(x + 2)',
    note: 'Negatív szám kiemelésekor a zárójelbe kerülő tagok előjele az ellentétesére változik!'
  }
];

const questions: Question[] = [
  // =========================================================================
  // --- 1. SZINT: EGYTAGÚAK SZORZÁSA ÉS ALAPVETŐ ZÁRÓJELBONTÁS/KIEMELÉS (1-10) ---
  // =========================================================================
  {
    id: 'q1-1',
    level: 1,
    question: 'Végezd el a szorzást: 3x · 4y = ?',
    options: [
      '12xy',
      '7xy',
      '12x²y²',
      '7(x + y)'
    ],
    correctAnswer: '12xy',
    explanation: 'Az együtthatókat összeszorozzuk (3 · 4 = 12), a különböző változókat pedig egymás mellé írjuk: 12xy.',
    hint: '3 · 4 = 12, a betűk szorzata xy.',
    breakdown: [
      { label: 'Számok szorzata', value: '3 · 4 = 12' },
      { label: 'Betűs rész', value: 'x · y = xy' },
      { label: 'Eredmény', value: '12xy' }
    ]
  },
  {
    id: 'q1-2',
    level: 1,
    question: 'Végezd el az egytagúak szorzását: 2a² · 5a³ = ?',
    options: [
      '10a⁵',
      '10a⁶',
      '7a⁵',
      '10a'
    ],
    correctAnswer: '10a⁵',
    explanation: 'Az együtthatók szorzata: 2 · 5 = 10. Az azonos alapú hatványok kitevői összeadódnak: a² · a³ = a²⁺³ = a⁵. Így 10a⁵.',
    hint: 'A hatványkitevőket nem szorozzuk, hanem összeadjuk: 2 + 3 = 5!',
    breakdown: [
      { label: 'Együtthatók', value: '2 · 5 = 10' },
      { label: 'Kitevők összege', value: 'a²⁺³ = a⁵' },
      { label: 'Végeredmény', value: '10a⁵' }
    ]
  },
  {
    id: 'q1-3',
    level: 1,
    question: 'Számítsd ki a szorzatot: (-3x) · 2x = ?',
    options: [
      '-6x²',
      '-6x',
      '6x²',
      '-x²'
    ],
    correctAnswer: '-6x²',
    explanation: '(-3) · 2 = -6, és x · x = x¹⁺¹ = x². Az eredmény -6x².',
    hint: 'Negatív szám szorozva pozitívval negatív lesz, x · x = x².',
    breakdown: [
      { label: 'Előjeles szám', value: '(-3) · 2 = -6' },
      { label: 'Változó', value: 'x · x = x²' },
      { label: 'Szorzat', value: '-6x²' }
    ]
  },
  {
    id: 'q1-4',
    level: 1,
    question: 'Bontsd fel a zárójelet: 4(2a - 3) = ?',
    options: [
      '8a - 12',
      '8a - 3',
      '6a - 7',
      '8a + 12'
    ],
    correctAnswer: '8a - 12',
    explanation: 'A külső 4-gyel a zárójel minden tagját megszorozzuk: 4 · 2a - 4 · 3 = 8a - 12.',
    hint: '4 · 2a = 8a és 4 · (-3) = -12.',
    breakdown: [
      { label: '1. tag', value: '4 · 2a = 8a' },
      { label: '2. tag', value: '4 · (-3) = -12' },
      { label: 'Eredmény', value: '8a - 12' }
    ]
  },
  {
    id: 'q1-5',
    level: 1,
    question: 'Alakítsd szorzattá közös tényező kiemelésével: 6x + 9 = ?',
    options: [
      '3(2x + 3)',
      '6(x + 3)',
      '3(3x + 3)',
      '9(x + 1)'
    ],
    correctAnswer: '3(2x + 3)',
    explanation: 'A 6 és 9 legnagyobb közös osztója a 3. Kiemelve: 6x/3 = 2x és 9/3 = 3, így 3(2x + 3).',
    hint: 'Melyik a legnagyobb szám, amivel a 6 és a 9 is osztható? A 3.',
    breakdown: [
      { label: 'LNKO(6, 9)', value: '3' },
      { label: 'Belső tagok', value: '6x : 3 = 2x,  9 : 3 = 3' },
      { label: 'Szorzat alak', value: '3(2x + 3)' }
    ]
  },
  {
    id: 'q1-6',
    level: 1,
    question: 'Bontsd fel a zárójelet: -2(3x - 5) = ?',
    options: [
      '-6x + 10',
      '-6x - 10',
      '-6x - 5',
      '6x - 10'
    ],
    correctAnswer: '-6x + 10',
    explanation: '-2 · (3x) + (-2) · (-5) = -6x + 10. A negatív számmal való szorzás megfordítja az előjeleket.',
    hint: '(-2) · (-5) = +10!',
    breakdown: [
      { label: '-2 · 3x', value: '-6x' },
      { label: '-2 · (-5)', value: '+10' },
      { label: 'Eredmény', value: '-6x + 10' }
    ]
  },
  {
    id: 'q1-7',
    level: 1,
    question: 'Végezd el a műveletet: 5x · 2x² = ?',
    options: [
      '10x³',
      '10x²',
      '7x³',
      '10x⁴'
    ],
    correctAnswer: '10x³',
    explanation: '5 · 2 = 10, x¹ · x² = x¹⁺² = x³. Az eredmény 10x³.',
    hint: 'x¹ · x² = x³.',
    breakdown: [
      { label: 'Együtthatók', value: '5 · 2 = 10' },
      { label: 'Változók', value: 'x · x² = x³' },
      { label: 'Eredmény', value: '10x³' }
    ]
  },
  {
    id: 'q1-8',
    level: 1,
    question: 'Emelj ki közös tényezőt a 10a - 15 kifejezésből!',
    options: [
      '5(2a - 3)',
      '5(2a - 15)',
      '10(a - 1.5)',
      '2(5a - 7)'
    ],
    correctAnswer: '5(2a - 3)',
    explanation: 'LNKO(10, 15) = 5. Kiemelve: 10a/5 = 2a, -15/5 = -3. Szorzat alak: 5(2a - 3).',
    hint: 'Mindkét tag osztható 5-tel.',
    breakdown: [
      { label: 'Közös osztó', value: '5' },
      { label: 'Tagok osztása', value: '10a : 5 = 2a és -15 : 5 = -3' },
      { label: 'Eredmény', value: '5(2a - 3)' }
    ]
  },
  {
    id: 'q1-9',
    level: 1,
    question: 'Mi történik az azonos változók hatványkitevőivel, amikor algebrai kifejezéseket szorzunk össze?',
    options: [
      'A kitevők összeadódnak: xⁿ · xᵐ = xⁿ⁺ᵐ',
      'A kitevők összeszorzódnak: xⁿ · xᵐ = xⁿᵐ',
      'A kitevők változatlanok maradnak',
      'A nagyobb kitevőt tartjuk meg'
    ],
    correctAnswer: 'A kitevők összeadódnak: xⁿ · xᵐ = xⁿ⁺ᵐ',
    explanation: 'A hatványozás alaptulajdonsága szerint azonos alapú hatványok szorzásakor az alapot a kitevők összegére emeljük.',
    hint: 'Például x² · x³ = (x·x) · (x·x·x) = x⁵, mert 2 + 3 = 5.',
    breakdown: [
      { label: 'Azonosság', value: 'aⁿ · aᵐ = aⁿ⁺ᵐ' },
      { label: 'Példa', value: 'x² · x³ = x⁵' }
    ]
  },
  {
    id: 'q1-10',
    level: 1,
    question: 'Bontsd fel a zárójeleket és vonj össze: 2(x + 4) + 3(x - 2) = ?',
    options: [
      '5x + 2',
      '5x + 14',
      '5x - 2',
      '6x + 2'
    ],
    correctAnswer: '5x + 2',
    explanation: '2x + 8 + 3x - 6 = (2x + 3x) + (8 - 6) = 5x + 2.',
    hint: '2(x+4) = 2x + 8 és 3(x-2) = 3x - 6. Vond össze a hasonló tagokat!',
    breakdown: [
      { label: 'Felbontás', value: '2x + 8 + 3x - 6' },
      { label: 'Összevonás', value: '5x + 2' }
    ]
  },

  // =========================================================================
  // --- 2. SZINT: NEGATÍVOK, VÁLTOZÓS ZÁRÓJELBONTÁS ÉS KIEMELÉS (11-20) ------
  // =========================================================================
  {
    id: 'q2-1',
    level: 2,
    question: 'Bontsd fel a zárójelet: -3x · (2x - 4) = ?',
    options: [
      '-6x² + 12x',
      '-6x² - 12x',
      '-6x + 12',
      '6x² - 12x'
    ],
    correctAnswer: '-6x² + 12x',
    explanation: '-3x · 2x = -6x², és -3x · (-4) = +12x. Eredmény: -6x² + 12x.',
    hint: 'Ügyelj a (-3x) · (-4) előjelére: mínusz szorozva mínusszal plusz!',
    breakdown: [
      { label: '1. tag', value: '-3x · 2x = -6x²' },
      { label: '2. tag', value: '-3x · (-4) = +12x' },
      { label: 'Eredmény', value: '-6x² + 12x' }
    ]
  },
  {
    id: 'q2-2',
    level: 2,
    question: 'Végezd el a beszorzást: 2x(3x² - 4x + 1) = ?',
    options: [
      '6x³ - 8x² + 2x',
      '6x³ - 8x² + 1',
      '6x² - 8x + 2',
      '5x³ - 2x² + 2x'
    ],
    correctAnswer: '6x³ - 8x² + 2x',
    explanation: '2x · 3x² = 6x³, 2x · (-4x) = -8x², 2x · 1 = 2x. Eredmény: 6x³ - 8x² + 2x.',
    hint: 'A zárójel mind a 3 tagját szorozd meg 2x-szel!',
    breakdown: [
      { label: '2x · 3x²', value: '6x³' },
      { label: '2x · (-4x)', value: '-8x²' },
      { label: '2x · 1', value: '+2x' },
      { label: 'Eredmény', value: '6x³ - 8x² + 2x' }
    ]
  },
  {
    id: 'q2-3',
    level: 2,
    question: 'Emeld ki a legnagyobb közös tényezőt a 8x² - 12x kifejezésből!',
    options: [
      '4x(2x - 3)',
      '4(2x² - 3x)',
      '2x(4x - 6)',
      '8x(x - 1.5)'
    ],
    correctAnswer: '4x(2x - 3)',
    explanation: 'LNKO(8, 12) = 4, és a közös változó x. A kiemelt tényező 4x: 8x²/(4x) = 2x és -12x/(4x) = -3.',
    hint: 'A számokból 4, a betűkből x emelhető ki, így összesen 4x.',
    breakdown: [
      { label: 'Kiemelt tényező', value: '4x' },
      { label: 'Zárójelben maradt', value: '2x - 3' },
      { label: 'Szorzat', value: '4x(2x - 3)' }
    ]
  },
  {
    id: 'q2-4',
    level: 2,
    question: 'Egyszerűsítsd a kifejezést: -4(2x - 3) - 2(3x + 1) = ?',
    options: [
      '-14x + 10',
      '-14x + 14',
      '-2x + 10',
      '-14x - 14'
    ],
    correctAnswer: '-14x + 10',
    explanation: '-8x + 12 - 6x - 2 = (-8x - 6x) + (12 - 2) = -14x + 10.',
    hint: '-4 · (-3) = +12, és -2 · 1 = -2.',
    breakdown: [
      { label: '1. zárójel', value: '-8x + 12' },
      { label: '2. zárójel', value: '-6x - 2' },
      { label: 'Összevonás', value: '-14x + 10' }
    ]
  },
  {
    id: 'q2-5',
    level: 2,
    question: 'Emeld ki a közös tényezőt: 15a²b + 10ab² = ?',
    options: [
      '5ab(3a + 2b)',
      '5a²b²(3 + 2)',
      '5(3a²b + 2ab²)',
      '15ab(a + b)'
    ],
    correctAnswer: '5ab(3a + 2b)',
    explanation: 'LNKO(15, 10) = 5. Az a és b változók legkisebb közös kitevője 1, így 5ab emelhető ki: 15a²b/(5ab) = 3a és 10ab²/(5ab) = 2b.',
    hint: 'Számokból 5, betűkből a és b (azaz ab) emelhető ki.',
    breakdown: [
      { label: 'Közös tényező', value: '5ab' },
      { label: '1. tag osztása', value: '15a²b : 5ab = 3a' },
      { label: '2. tag osztása', value: '10ab² : 5ab = 2b' },
      { label: 'Eredmény', value: '5ab(3a + 2b)' }
    ]
  },
  {
    id: 'q2-6',
    level: 2,
    question: 'Egy téglalap egyik oldala 3x, a másik oldala 2x - 5. Mi a téglalap területének (T) felbontott kifejezése?',
    options: [
      '6x² - 15x',
      '5x - 5',
      '6x² - 5',
      '10x - 10'
    ],
    correctAnswer: '6x² - 15x',
    explanation: 'A téglalap területe: T = a · b = 3x · (2x - 5) = 6x² - 15x.',
    hint: 'T = a · b = 3x · (2x - 5). Szorozd be a zárójelet!',
    breakdown: [
      { label: 'Képlet', value: 'T = 3x · (2x - 5)' },
      { label: 'Zárójelbontás', value: '3x · 2x - 3x · 5' },
      { label: 'Terület', value: '6x² - 15x' }
    ]
  },
  {
    id: 'q2-7',
    level: 2,
    question: 'Emelj ki negatív számot a -6x - 18 kifejezésből!',
    options: [
      '-6(x + 3)',
      '-6(x - 3)',
      '6(-x - 3)',
      '-3(2x - 6)'
    ],
    correctAnswer: '-6(x + 3)',
    explanation: 'A -6 kiemelésével mindkét belső tag előjele pozitívvá válik: -6x / (-6) = +x és -18 / (-6) = +3. Így -6(x + 3).',
    hint: 'Negatív kiemelésekor a zárójelben plusz jelek lesznek: -18 / (-6) = +3.',
    breakdown: [
      { label: 'Kiemelt szám', value: '-6' },
      { label: 'Belső tagok', value: '-6x : (-6) = x,  -18 : (-6) = +3' },
      { label: 'Szorzat', value: '-6(x + 3)' }
    ]
  },
  {
    id: 'q2-8',
    level: 2,
    question: 'Végezd el a műveleteket és egyszerűsíts: 4x²(2x - 3) - 3x(x² - 4x) = ?',
    options: [
      '5x³',
      '5x³ - 24x²',
      '11x³ - 24x²',
      '5x³ + 24x²'
    ],
    correctAnswer: '5x³',
    explanation: '8x³ - 12x² - 3x³ + 12x² = (8x³ - 3x³) + (-12x² + 12x²) = 5x³ + 0 = 5x³.',
    hint: '-3x · (-4x) = +12x², ami kiejti a -12x² tagot!',
    breakdown: [
      { label: '1. szorzat', value: '8x³ - 12x²' },
      { label: '2. szorzat', value: '-3x³ + 12x²' },
      { label: 'Összevonás', value: '5x³' }
    ]
  },
  {
    id: 'q2-9',
    level: 2,
    question: 'Melyik kifejezés NEM egyenlő a 12x² - 18x kifejezéssel?',
    options: [
      '4x(3x - 4)',
      '6x(2x - 3)',
      '3x(4x - 6)',
      '-6x(-2x + 3)'
    ],
    correctAnswer: '4x(3x - 4)',
    explanation: '4x(3x - 4) = 12x² - 16x, ami nem 12x² - 18x! A többi mind 12x² - 18x-et ad: 6x(2x-3)=12x²-18x, 3x(4x-6)=12x²-18x, -6x(-2x+3)=12x²-18x.',
    hint: 'Bontsd fel a zárójeleket: 4x · (-4) = -16x, ami eltér a -18x-től!',
    breakdown: [
      { label: 'A opció', value: '4x(3x - 4) = 12x² - 16x (HIBÁS)' },
      { label: 'B opció', value: '6x(2x - 3) = 12x² - 18x' },
      { label: 'C opció', value: '3x(4x - 6) = 12x² - 18x' },
      { label: 'D opció', value: '-6x(-2x + 3) = 12x² - 18x' }
    ]
  },
  {
    id: 'q2-10',
    level: 2,
    question: 'Egyszerűsítsd a kifejezést: 7x(x - 2) - x(7x - 14) = ?',
    options: [
      '0',
      '14x² - 28x',
      '-28x',
      '7x²'
    ],
    correctAnswer: '0',
    explanation: '7x² - 14x - 7x² + 14x = (7x² - 7x²) + (-14x + 14x) = 0 + 0 = 0.',
    hint: '7x² - 14x - 7x² + 14x = 0.',
    breakdown: [
      { label: '1. zárójel', value: '7x² - 14x' },
      { label: '2. zárójel', value: '-7x² + 14x' },
      { label: 'Összeg', value: '0' }
    ]
  },

  // =========================================================================
  // --- 3. SZINT: TÖBBVÁLTOZÓS, TÖRTEK ÉS ÖSSZETETT KIEMELÉSEK (21-30) --------
  // =========================================================================
  {
    id: 'q3-1',
    level: 3,
    question: 'Számítsd ki a szorzatot: (-2a²b) · (3ab³) · (-4a) = ?',
    options: [
      '24a⁴b⁴',
      '-24a⁴b⁴',
      '24a³b⁴',
      '-24a³b³'
    ],
    correctAnswer: '24a⁴b⁴',
    explanation: 'Számok: (-2) · 3 · (-4) = +24. \'a\' betűk: a² · a¹ · a¹ = a²⁺¹⁺¹ = a⁴. \'b\' betűk: b¹ · b³ = b⁴. Eredmény: 24a⁴b⁴.',
    hint: 'Két negatív szám szorzata pozitív (+24), az \'a\' kitevői: 2 + 1 + 1 = 4.',
    breakdown: [
      { label: 'Együtthatók', value: '(-2) · 3 · (-4) = +24' },
      { label: '\'a\' kitevők', value: 'a²⁺¹⁺¹ = a⁴' },
      { label: '\'b\' kitevők', value: 'b¹⁺³ = b⁴' },
      { label: 'Eredmény', value: '24a⁴b⁴' }
    ]
  },
  {
    id: 'q3-2',
    level: 3,
    question: 'Egyszerűsítsd az algebrai törtet számláló-kiemeléssel: (6x² - 9x) / (3x) = ? (ha x ≠ 0)',
    options: [
      '2x - 3',
      '2x² - 3',
      '2x - 9',
      '3x(2x - 3)'
    ],
    correctAnswer: '2x - 3',
    explanation: 'Számlálóból kiemelve: 3x(2x - 3). A 3x-szel egyszerűsítve: 2x - 3.',
    hint: 'Emelj ki a számlálóból 3x-et: 3x(2x - 3) / (3x).',
    breakdown: [
      { label: 'Számláló kiemelése', value: '3x(2x - 3)' },
      { label: 'Egyszerűsítés 3x-szel', value: '2x - 3' }
    ]
  },
  {
    id: 'q3-3',
    level: 3,
    question: 'Emeld ki a legnagyobb közös tényezőt: 18x⁴ - 24x³ + 12x² = ?',
    options: [
      '6x²(3x² - 4x + 2)',
      '6x(3x³ - 4x² + 2x)',
      '3x²(6x² - 8x + 4)',
      '12x²(1.5x² - 2x + 1)'
    ],
    correctAnswer: '6x²(3x² - 4x + 2)',
    explanation: 'LNKO(18, 24, 12) = 6, és a legkisebb előforduló kitevő x². Kiemelve: 6x²(3x² - 4x + 2).',
    hint: 'LNKO(18, 24, 12) = 6, a legkisebb kitevőjű közös változó az x².',
    breakdown: [
      { label: 'Közös tényező', value: '6x²' },
      { label: 'Zárójel', value: '18x⁴:6x² - 24x³:6x² + 12x²:6x²' },
      { label: 'Eredmény', value: '6x²(3x² - 4x + 2)' }
    ]
  },
  {
    id: 'q3-4',
    level: 3,
    question: 'Egyszerűsítsd a törtet: (10a²b + 15ab²) / (5ab) = ? (ha ab ≠ 0)',
    options: [
      '2a + 3b',
      '2a² + 3b²',
      '2ab + 3ab',
      '5(2a + 3b)'
    ],
    correctAnswer: '2a + 3b',
    explanation: 'Számláló: 5ab(2a + 3b). 5ab-vel egyszerűsítve: 2a + 3b.',
    hint: 'Emelj ki a számlálóból 5ab-t!',
    breakdown: [
      { label: 'Kiemelés', value: '5ab · (2a + 3b)' },
      { label: 'Osztás 5ab-vel', value: '2a + 3b' }
    ]
  },
  {
    id: 'q3-5',
    level: 3,
    question: 'Végezd el a műveleteket: 2x(3x - 1) - 3x(2x - 4) + 5(2 - 2x) = ?',
    options: [
      '10',
      '0',
      '10x + 10',
      '-10'
    ],
    correctAnswer: '10',
    explanation: '6x² - 2x - 6x² + 12x + 10 - 10x = (6x² - 6x²) + (-2x + 12x - 10x) + 10 = 0 + 0 + 10 = 10.',
    hint: 'A másodfokú és az elsőfokú tagok összege is 0 lesz: 6x² - 6x² = 0, és -2x + 12x - 10x = 0.',
    breakdown: [
      { label: 'Bontások', value: '6x² - 2x - 6x² + 12x + 10 - 10x' },
      { label: 'x²-es tagok', value: '6x² - 6x² = 0' },
      { label: 'x-es tagok', value: '-2x + 12x - 10x = 0' },
      { label: 'Végeredmény', value: '10' }
    ]
  },
  {
    id: 'q3-6',
    level: 3,
    question: 'Mennyi a 4(2x - 3) - 3(2x - 4) kifejezés helyettesítési értéke, ha x = 199?',
    options: [
      '398',
      '199',
      '0',
      '796'
    ],
    correctAnswer: '398',
    explanation: 'Először egyszerűsítsünk: 8x - 12 - 6x + 12 = 2x. Ha x = 199, akkor 2 · 199 = 398.',
    hint: 'Bontsd fel a zárójeleket: 8x - 12 - 6x + 12 = 2x. Ezután szorozd meg a 199-et 2-vel!',
    breakdown: [
      { label: 'Egyszerűsítés', value: '8x - 12 - 6x + 12 = 2x' },
      { label: 'Helyettesítés', value: '2 · 199 = 398' }
    ]
  },
  {
    id: 'q3-7',
    level: 3,
    question: 'Egy téglatest élei \'a\', 2a és a + 3. Mi a téglatest térfogatának (V) felbontott kifejezése?',
    options: [
      '2a³ + 6a²',
      '2a² + 6a',
      '4a + 3',
      '2a³ + 3'
    ],
    correctAnswer: '2a³ + 6a²',
    explanation: 'V = a · b · c = a · (2a) · (a + 3) = 2a² · (a + 3) = 2a³ + 6a².',
    hint: 'V = a · (2a) · (a + 3) = 2a²(a + 3). Szorozd be a zárójelet!',
    breakdown: [
      { label: 'Térfogat képlet', value: 'V = a · 2a · (a + 3)' },
      { label: 'Szorzat', value: '2a² · (a + 3)' },
      { label: 'Felbontva', value: '2a³ + 6a²' }
    ]
  },
  {
    id: 'q3-8',
    level: 3,
    question: 'Alakítsd szorzattá előjelváltással: a(x - y) + b(y - x) = ?',
    options: [
      '(a - b)(x - y)',
      '(a + b)(x - y)',
      '(a - b)(x + y)',
      '(a + b)(y - x)'
    ],
    correctAnswer: '(a - b)(x - y)',
    explanation: 'Mivel (y - x) = -(x - y), ezért a(x - y) + b(y - x) = a(x - y) - b(x - y) = (a - b)(x - y).',
    hint: 'Vegyük észre, hogy (y - x) = -(x - y). Emeljünk ki mínuszt a második tagból!',
    breakdown: [
      { label: 'Előjelváltás', value: 'b(y - x) = -b(x - y)' },
      { label: 'Közös zárójel', value: '(x - y) kiemelése' },
      { label: 'Eredmény', value: '(a - b)(x - y)' }
    ]
  },
  {
    id: 'q3-9',
    level: 3,
    question: 'Számítsd ki: (4x² - 8x) / (2x) - (9x - 15) / 3 = ? (ha x ≠ 0)',
    options: [
      '-x + 1',
      '-x - 9',
      'x + 1',
      '5x - 9'
    ],
    correctAnswer: '-x + 1',
    explanation: '(4x² - 8x)/(2x) = 2x - 4. (9x - 15)/3 = 3x - 5. Kivonva: (2x - 4) - (3x - 5) = 2x - 4 - 3x + 5 = -x + 1.',
    hint: 'Egyszerűsítsd mindkét törtet külön-külön, majd vonj össze előjelfigyeléssel!',
    breakdown: [
      { label: '1. tört', value: '(4x² - 8x) : 2x = 2x - 4' },
      { label: '2. tört', value: '(9x - 15) : 3 = 3x - 5' },
      { label: 'Kivonás', value: '(2x - 4) - (3x - 5) = -x + 1' }
    ]
  },
  {
    id: 'q3-10',
    level: 3,
    question: 'Melyik kifejezés illik a pontozott helyre: 20x³y² - 15x²y³ = 5x²y² · (...) ?',
    options: [
      '4x - 3y',
      '4x² - 3y²',
      '4xy - 3',
      '15x - 10y'
    ],
    correctAnswer: '4x - 3y',
    explanation: '20x³y² / (5x²y²) = 4x, és -15x²y³ / (5x²y²) = -3y. A zárójelben (4x - 3y) áll.',
    hint: 'Oszd el a két tagot a kiemelt 5x²y² kifejezéssel!',
    breakdown: [
      { label: '1. tag osztása', value: '20x³y² : 5x²y² = 4x' },
      { label: '2. tag osztása', value: '-15x²y³ : 5x²y² = -3y' },
      { label: 'Zárójel tartalma', value: '4x - 3y' }
    ]
  }
];

export const FactoringQuiz: React.FC<FactoringQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      title="10. Betűs kifejezések szorzása és a kiemelés – Kvíz"
      subtitle="30 feladat 3 nehézségi szinten: Egytagúak szorzata, zárójelfelbontás (disztributivitás), közös tényező kiemelése és algebrai törtek"
      questions={questions}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      documentId="grade-8-szamok-betuk-factoring-quiz"
      pdfFilename="8_osztaly_betus_kifejezesek_szorzasa_kiemeles_kviz.pdf"
      badgeColor="purple"
      matcherComponent={<FactoringMatcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} />}
      sorterComponent={<FactoringSorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} />}
      cheatSheetCards={cheatSheetCards}
    />
  );
};

export default FactoringQuiz;
