import React from 'react';
import { QuizTemplate, Question, CheatSheetCard } from '../QuizTemplate';
import { PowersMatcher } from './PowersMatcher';
import { PowersSorter } from './PowersSorter';
import { Zap, Calculator, Layers, Sparkles, Divide } from 'lucide-react';

interface PowersQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    id: 'c1',
    title: 'A Hatvány Fogalma és 0. Kitevő',
    icon: <Zap className="w-4 h-4 text-amber-600" />,
    formula: 'aⁿ = a · a · ... · a  |  a⁰ = 1 (a ≠ 0)',
    note: 'Pl. 3⁴ = 81, (-2)⁴ = +16, (-2)³ = -8, 7⁰ = 1. (0⁰ nincs értelmezve).'
  },
  {
    id: 'c2',
    title: 'Azonos Alapú Hatványok',
    icon: <Layers className="w-4 h-4 text-blue-600" />,
    formula: 'aⁿ · aᵐ = aⁿ⁺ᵐ  |  aⁿ : aᵐ = aⁿ⁻ᵐ  |  (aⁿ)ᵐ = aⁿ·ᵐ',
    note: 'Szorzáskor kitevők összeadása, osztáskor kivonása, hatványozáskor szorzása.'
  },
  {
    id: 'c3',
    title: 'Azonos Kitevőjű Hatványok (Szorzás & Osztás)',
    icon: <Divide className="w-4 h-4 text-purple-600" />,
    formula: 'aⁿ : bⁿ = (a : b)ⁿ = (a/b)ⁿ  |  aⁿ · bⁿ = (a · b)ⁿ',
    note: 'Pl. 12³ : 4³ = (12:4)³ = 3³ = 27, 2⁴ · 5⁴ = 10⁴ = 10 000.'
  },
  {
    id: 'c4',
    title: 'Nagy Számok Normálalakja',
    icon: <Sparkles className="w-4 h-4 text-emerald-600" />,
    formula: 'a · 10ᵏ  (ahol 1 ≤ a < 10 és k ∈ ℕ⁺)',
    note: '450 000 = 4.5 · 10⁵, 3 844 000 = 3.844 · 10⁶.'
  }
];

const questions: Question[] = [
  // =========================================================================
  // --- 1. SZINT: ALAP HATVÁNYOK, 0 KITEVŐ, ELŐJELEK ÉS TÖRTEK (1-10) ---
  // =========================================================================
  {
    id: 'q1-1',
    level: 1,
    question: 'Mennyi a 3⁴ hatvány pontos értéke a tízes számrendszerben?',
    options: [
      '81',
      '12',
      '27',
      '64'
    ],
    correctAnswer: '81',
    explanation: 'A pozitív egész kitevő definíciója szerint: 3⁴ = 3 · 3 · 3 · 3 = 81.',
    hint: '3 · 3 = 9, 9 · 3 = 27, 27 · 3 = 81.',
    breakdown: [
      { label: 'Képlet', value: '3⁴ = 3 · 3 · 3 · 3' },
      { label: 'Számolás', value: '9 · 9 = 81' }
    ]
  },
  {
    id: 'q1-2',
    level: 1,
    question: 'Mennyi a (-7)⁰ hatvány pontos értéke?',
    options: [
      '1',
      '0',
      '-7',
      '-1'
    ],
    correctAnswer: '1',
    explanation: 'Bármely nem nulla valós szám nulladik hatványa pontosan 1: a⁰ = 1.',
    hint: 'Minden nem nulla szám 0. hatványa 1.',
    breakdown: [
      { label: 'Szabály', value: 'a⁰ = 1 (ha a ≠ 0)' },
      { label: 'Eredmény', value: '(-7)⁰ = 1' }
    ]
  },
  {
    id: 'q1-3',
    level: 1,
    question: 'Mennyi a (2/3)³ tört hatvány értéke legegyszerűbb tört alakban?',
    options: [
      '8/27',
      '6/9',
      '8/9',
      '4/9'
    ],
    correctAnswer: '8/27',
    explanation: 'Tört hatványozásakor a számlálót és a nevezőt is a hatványra emeljük: (2/3)³ = 2³ / 3³ = 8 / 27.',
    hint: '(a/b)ⁿ = aⁿ / bⁿ ⟹ 2³ = 8 és 3³ = 27.',
    breakdown: [
      { label: 'Számláló', value: '2³ = 8' },
      { label: 'Nevező', value: '3³ = 27' },
      { label: 'Eredmény', value: '8/27' }
    ]
  },
  {
    id: 'q1-4',
    level: 1,
    question: 'Mi a különbség (-2)⁴ és -2⁴ értéke között?',
    options: [
      '(-2)⁴ = +16, míg -2⁴ = -16.',
      'Mindkettő értéke +16.',
      'Mindkettő értéke -16.',
      '(-2)⁴ = -8, míg -2⁴ = +8.'
    ],
    correctAnswer: '(-2)⁴ = +16, míg -2⁴ = -16.',
    explanation: '(-2)⁴ = (-2)·(-2)·(-2)·(-2) = +16 (páros kitevő esetén pozitív). A -2⁴ esetén a hatványozás megelőzi az előjelet: -(2⁴) = -16.',
    hint: 'A zárójelben lévő negatív szám páros hatványa pozitív, zárójel nélkül az előjel megmarad negatívnak.',
    breakdown: [
      { label: '(-2)⁴', value: '+16' },
      { label: '-2⁴', value: '-(16) = -16' }
    ]
  },
  {
    id: 'q1-5',
    level: 1,
    question: 'Mennyi a (-1)⁵⁰ + (-1)⁵¹ összeg pontos értéke?',
    options: [
      '0',
      '2',
      '-2',
      '1'
    ],
    correctAnswer: '0',
    explanation: '(-1)⁵⁰ = +1 (páros kitevő) és (-1)⁵¹ = -1 (páratlan kitevő). Ekkor 1 + (-1) = 0.',
    hint: '(-1) páros hatványa +1, páratlan hatványa -1. 1 + (-1) = ?',
    breakdown: [
      { label: '(-1)⁵⁰', value: '+1' },
      { label: '(-1)⁵¹', value: '-1' },
      { label: 'Összeg', value: '1 + (-1) = 0' }
    ]
  },
  {
    id: 'q1-6',
    level: 1,
    question: 'Mennyi a (5/4)² tört hatványának értéke vegyestört alakban?',
    options: [
      '1 és 9/16',
      '25/8',
      '1 és 1/4',
      '1 és 7/16'
    ],
    correctAnswer: '1 és 9/16',
    explanation: '(5/4)² = 25 / 16. Mivel 25-ben a 16 megvan 1-szer, a maradék 9, így 1 és 9/16.',
    hint: '5² / 4² = 25 / 16 = 1 és 9/16.',
    breakdown: [
      { label: 'Négyzet', value: '5² / 4² = 25/16' },
      { label: 'Vegyes tört', value: '25/16 = 1 és 9/16' }
    ]
  },
  {
    id: 'q1-7',
    level: 1,
    question: 'Melyik állítás IGAZ a nulladik hatványra vonatkozóan?',
    options: [
      'Bármely nem nulla szám nulladik hatványa 1, de 0⁰ nem értelmezhető.',
      'Minden szám nulladik hatványa 0.',
      'Csak a pozitív számok nulladik hatványa 1, a negatívaké -1.',
      'A 0⁰ értéke pontosan 1.'
    ],
    correctAnswer: 'Bármely nem nulla szám nulladik hatványa 1, de 0⁰ nem értelmezhető.',
    explanation: 'Ha a ≠ 0, akkor a⁰ = 1. A 0⁰ kifejezés a matematikában nincs értelmezve.',
    hint: '(-5)⁰ = 1, 8⁰ = 1, de 0⁰-t nem tudjuk értelmezni.',
    breakdown: [
      { label: 'Szabály', value: 'a⁰ = 1 (a ≠ 0)' },
      { label: 'Kivétel', value: '0⁰ nem értelmezhető' }
    ]
  },
  {
    id: 'q1-8',
    level: 1,
    question: 'Mennyi a -(-3)³ kifejezés pontos értéke?',
    options: [
      '+27',
      '-27',
      '+9',
      '-9'
    ],
    correctAnswer: '+27',
    explanation: '(-3)³ = (-3)·(-3)·(-3) = -27 (páratlan kitevő). Ennek az ellentettje: -(-27) = +27.',
    hint: '(-3)³ = -27, az előtte lévő mínusz jel megváltoztatja az előjelet.',
    breakdown: [
      { label: '1. lépés: (-3)³', value: '-27' },
      { label: '2. lépés: -(-27)', value: '+27' }
    ]
  },
  {
    id: 'q1-9',
    level: 1,
    question: 'Mennyi a 0⁶ hatvány értéke?',
    options: [
      '0',
      '1',
      '6',
      'Nem értelmezhető'
    ],
    correctAnswer: '0',
    explanation: 'A 0 pozitív egész hatványa mindig 0: 0 · 0 · 0 · 0 · 0 · 0 = 0.',
    hint: '0-t szorozzuk önmagával 6-szor.',
    breakdown: [
      { label: 'Számolás', value: '0⁶ = 0' }
    ]
  },
  {
    id: 'q1-10',
    level: 1,
    question: 'Mennyi a (0.1)³ tizedestört hatvány pontos értéke?',
    options: [
      '0.001',
      '0.01',
      '0.0001',
      '0.3'
    ],
    correctAnswer: '0.001',
    explanation: '(0.1)³ = 0.1 · 0.1 · 0.1 = 0.001 (egy ezred).',
    hint: '(1/10)³ = 1/1000 = 0.001.',
    breakdown: [
      { label: 'Tört alakban', value: '(1/10)³ = 1/1000' },
      { label: 'Tizedestörtként', value: '0.001' }
    ]
  },

  // =========================================================================
  // --- 2. SZINT: HATVÁNYOZÁS AZONOSSÁGAI (KIEMELTEN AZ OSZTÁS) (11-20) ---
  // =========================================================================
  {
    id: 'q2-1',
    level: 2,
    question: 'Mennyi a 12³ : 4³ művelet eredménye azonos kitevőjű hatványok osztásával kiszámolva?',
    options: [
      '27 (3³)',
      '3',
      '81',
      '9'
    ],
    correctAnswer: '27 (3³)',
    explanation: 'Azonos kitevő esetén az alapokat elosztjuk, a kitevő változatlan: 12³ : 4³ = (12 : 4)³ = 3³ = 27.',
    hint: 'aⁿ : bⁿ = (a : b)ⁿ ⟹ (12 : 4)³ = 3³.',
    breakdown: [
      { label: 'Azonosság', value: 'aⁿ : bⁿ = (a : b)ⁿ' },
      { label: 'Alapok osztása', value: '(12 : 4)³ = 3³' },
      { label: 'Eredmény', value: '3 · 3 · 3 = 27' }
    ]
  },
  {
    id: 'q2-2',
    level: 2,
    question: 'Mennyi a 2⁸ : 2⁵ azonos alapú hatványok osztásának pontos értéke?',
    options: [
      '8 (2³)',
      '16',
      '4',
      '2'
    ],
    correctAnswer: '8 (2³)',
    explanation: 'Azonos alapú hatványok osztásakor az alapot változatlanul hagyjuk, a kitevőket kivonjuk: 2⁸⁻⁵ = 2³ = 8.',
    hint: '2⁸ : 2⁵ = 2⁸⁻⁵ = 2³ = 8.',
    breakdown: [
      { label: 'Azonosság', value: 'aⁿ : aᵐ = aⁿ⁻ᵐ' },
      { label: 'Kitevők kivonása', value: '8 - 5 = 3 ⟹ 2³' },
      { label: 'Érték', value: '8' }
    ]
  },
  {
    id: 'q2-3',
    level: 2,
    question: 'Mennyi az (5²)³ : 5⁴ kifejezés értéke?',
    options: [
      '25 (5²)',
      '5',
      '125',
      '1'
    ],
    correctAnswer: '25 (5²)',
    explanation: '1. Hatvány hatványozása: (5²)³ = 5²·³ = 5⁶. 2. Azonos alapúak osztása: 5⁶ : 5⁴ = 5⁶⁻⁴ = 5² = 25.',
    hint: '(5²)³ = 5⁶, majd 5⁶ : 5⁴ = 5² = 25.',
    breakdown: [
      { label: '1. Hatványozás', value: '(5²)³ = 5⁶' },
      { label: '2. Osztás', value: '5⁶ : 5⁴ = 5² = 25' }
    ]
  },
  {
    id: 'q2-4',
    level: 2,
    question: 'Mennyi a 2⁵ · 5⁵ szorzat pontos értéke a tízes számrendszerben?',
    options: [
      '100 000 (10⁵)',
      '10 000',
      '1 000 000',
      '10¹⁰'
    ],
    correctAnswer: '100 000 (10⁵)',
    explanation: 'Azonos kitevő esetén az alapokat összeszorozzuk: 2⁵ · 5⁵ = (2 · 5)⁵ = 10⁵ = 100 000.',
    hint: 'aⁿ · bⁿ = (a · b)ⁿ ⟹ (2 · 5)⁵ = 10⁵.',
    breakdown: [
      { label: 'Azonosság', value: 'aⁿ · bⁿ = (a · b)ⁿ' },
      { label: 'Szorzat', value: '(2 · 5)⁵ = 10⁵ = 100 000' }
    ]
  },
  {
    id: 'q2-5',
    level: 2,
    question: 'Mennyi az 50² : 25² hányados értéke az azonosságok segítségével egyszerűen?',
    options: [
      '4 (2²)',
      '2',
      '25',
      '100'
    ],
    correctAnswer: '4 (2²)',
    explanation: 'Azonos kitevőjű hatványok osztása: 50² : 25² = (50 : 25)² = 2² = 4.',
    hint: '(50 : 25)² = 2² = 4.',
    breakdown: [
      { label: 'Azonosság', value: 'aⁿ : bⁿ = (a : b)ⁿ' },
      { label: 'Számolás', value: '(50 : 25)² = 2² = 4' }
    ]
  },
  {
    id: 'q2-6',
    level: 2,
    question: 'Mennyi a 24⁴ : 6⁴ osztás pontos értéke?',
    options: [
      '256 (4⁴)',
      '64',
      '16',
      '4'
    ],
    correctAnswer: '256 (4⁴)',
    explanation: '24⁴ : 6⁴ = (24 : 6)⁴ = 4⁴ = 4 · 4 · 4 · 4 = 256.',
    hint: '(24 : 6)⁴ = 4⁴. 4⁴ = 256.',
    breakdown: [
      { label: 'Alapok osztása', value: '(24 : 6)⁴ = 4⁴' },
      { label: 'Kiszámolás', value: '4⁴ = 256' }
    ]
  },
  {
    id: 'q2-7',
    level: 2,
    question: 'Mennyi a 100³ : 20³ kifejezés értéke?',
    options: [
      '125 (5³)',
      '25',
      '5',
      '625'
    ],
    correctAnswer: '125 (5³)',
    explanation: '100³ : 20³ = (100 : 20)³ = 5³ = 5 · 5 · 5 = 125.',
    hint: '100 : 20 = 5, majd 5³ = 125.',
    breakdown: [
      { label: 'Azonosság', value: '(100 : 20)³ = 5³' },
      { label: 'Eredmény', value: '5³ = 125' }
    ]
  },
  {
    id: 'q2-8',
    level: 2,
    question: 'Írd fel 3 egyetlen hatványaként és add meg az értékét: 3⁴ · 3³ : 3⁵!',
    options: [
      '3² = 9',
      '3¹² = 531441',
      '3¹ = 3',
      '3³ = 27'
    ],
    correctAnswer: '3² = 9',
    explanation: 'Azonos alapúak szorzása és osztása: 3⁴⁺³⁻⁵ = 3² = 9.',
    hint: 'Kitevők művelete: 4 + 3 - 5 = 2 ⟹ 3² = 9.',
    breakdown: [
      { label: 'Kitevők összevonása', value: '4 + 3 - 5 = 2' },
      { label: 'Hatvány értéke', value: '3² = 9' }
    ]
  },
  {
    id: 'q2-9',
    level: 2,
    question: 'Melyik kifejezéssel egyenlő az (a³ · b²)³ hatvány?',
    options: [
      'a⁹ · b⁶',
      'a⁶ · b⁵',
      'a⁹ · b⁵',
      'a²⁷ · b⁸'
    ],
    correctAnswer: 'a⁹ · b⁶',
    explanation: 'A szorzat minden tényezőjének kitevőjét megszorozzuk a külső kitevővel: (a³)³ · (b²)³ = a⁹ · b⁶.',
    hint: 'Szorozd meg a belső kitevőket a 3-assal: 3·3=9 és 2·3=6.',
    breakdown: [
      { label: 'a kitevője', value: '3 · 3 = 9' },
      { label: 'b kitevője', value: '2 · 3 = 6' },
      { label: 'Eredmény', value: 'a⁹ · b⁶' }
    ]
  },
  {
    id: 'q2-10',
    level: 2,
    question: 'Mennyi a (4³ · 2⁴) / 8² tört értéke 2 hatványaként kifejezve?',
    options: [
      '2⁴ = 16',
      '2⁶ = 64',
      '2²',
      '2⁸'
    ],
    correctAnswer: '2⁴ = 16',
    explanation: 'Írjuk át mindent 2-es alapra: 4³ = (2²)³ = 2⁶, 8² = (2³)² = 2⁶. Tört: (2⁶ · 2⁴) / 2⁶ = 2¹⁰ / 2⁶ = 2⁴ = 16.',
    hint: '4 = 2² és 8 = 2³. Írd át a számlálót és nevezőt 2 hatványára!',
    breakdown: [
      { label: 'Számláló', value: '(2²)³ · 2⁴ = 2⁶ · 2⁴ = 2¹⁰' },
      { label: 'Nevező', value: '(2³)² = 2⁶' },
      { label: 'Hányados', value: '2¹⁰ : 2⁶ = 2⁴ = 16' }
    ]
  },

  // =========================================================================
  // --- 3. SZINT: NORMÁLALAK (NAGY SZÁMOK) ÉS ÖSSZETETT FELADATOK (21-30) ---
  // =========================================================================
  {
    id: 'q3-1',
    level: 3,
    question: 'Mi a 450 000 000 szám helyes normálalakja?',
    options: [
      '4.5 · 10⁸',
      '45 · 10⁷',
      '0.45 · 10⁹',
      '4.5 · 10⁷'
    ],
    correctAnswer: '4.5 · 10⁸',
    explanation: 'A mantisszának 1 és 10 közé kell esnie: 4.5. A tizedesvesszőt 8 hellyel toltuk balra, így 4.5 · 10⁸.',
    hint: 'A mantissza 1 ≤ a < 10 közötti (4.5). 8 helyiértéket léptél balra.',
    breakdown: [
      { label: 'Mantissza', value: '4.5 (1 és 10 között)' },
      { label: 'Kitevő', value: '8 helyiérték ⟹ 10⁸' },
      { label: 'Normálalak', value: '4.5 · 10⁸' }
    ]
  },
  {
    id: 'q3-2',
    level: 3,
    question: 'Mennyi a (3 · 10⁵) · (4 · 10³) szorzat eredménye helyes normálalakban?',
    options: [
      '1.2 · 10⁹',
      '12 · 10⁸',
      '1.2 · 10⁸',
      '7 · 10⁸'
    ],
    correctAnswer: '1.2 · 10⁹',
    explanation: '(3 · 4) · 10⁵⁺³ = 12 · 10⁸. Mivel 12 ≥ 10, normálalakra hozzuk: 12 = 1.2 · 10¹, így 1.2 · 10⁹.',
    hint: '3 · 4 = 12, 10⁵ · 10³ = 10⁸. 12 · 10⁸ normálalakban = 1.2 · 10⁹.',
    breakdown: [
      { label: 'Köztes szorzat', value: '(3 · 4) · 10⁵⁺³ = 12 · 10⁸' },
      { label: 'Normálalak korrekció', value: '1.2 · 10¹ · 10⁸ = 1.2 · 10⁹' }
    ]
  },
  {
    id: 'q3-3',
    level: 3,
    question: 'Mennyi a (8.4 · 10⁸) : (2.1 · 10³) osztás eredménye normálalakban?',
    options: [
      '4 · 10⁵',
      '4 · 10¹¹',
      '4 · 10⁶',
      '4.2 · 10⁵'
    ],
    correctAnswer: '4 · 10⁵',
    explanation: '(8.4 : 2.1) · 10⁸⁻³ = 4 · 10⁵.',
    hint: '8.4 : 2.1 = 4 és 10⁸ : 10³ = 10⁵.',
    breakdown: [
      { label: 'Számok osztása', value: '8.4 : 2.1 = 4' },
      { label: 'Hatványok osztása', value: '10⁸⁻³ = 10⁵' },
      { label: 'Eredmény', value: '4 · 10⁵' }
    ]
  },
  {
    id: 'q3-4',
    level: 3,
    question: 'Mennyi a (2 · 10⁴) + (3 · 10³) összeg értéke normálalakban kifejezve?',
    options: [
      '2.3 · 10⁴',
      '5 · 10⁷',
      '5 · 10⁴',
      '2.3 · 10³'
    ],
    correctAnswer: '2.3 · 10⁴',
    explanation: '2 · 10⁴ = 20 000 és 3 · 10³ = 3 000. Összegük: 23 000 = 2.3 · 10⁴.',
    hint: '20 000 + 3 000 = 23 000 = 2.3 · 10⁴.',
    breakdown: [
      { label: 'Számok értéke', value: '20 000 + 3 000 = 23 000' },
      { label: 'Normálalak', value: '2.3 · 10⁴' }
    ]
  },
  {
    id: 'q3-5',
    level: 3,
    question: 'A fény sebessége kb. 3 · 10⁸ m/s. Hány métert tesz meg a fény 1 perc (60 másodperc) alatt normálalakban?',
    options: [
      '1.8 · 10¹⁰ m',
      '18 · 10⁹ m',
      '1.8 · 10⁹ m',
      '3 · 10¹⁰ m'
    ],
    correctAnswer: '1.8 · 10¹⁰ m',
    explanation: 's = v · t = (3 · 10⁸) · 60 = 180 · 10⁸ = 1.8 · 10¹⁰ m.',
    hint: '3 · 10⁸ · 60 = 180 · 10⁸ = 1.8 · 10¹⁰.',
    breakdown: [
      { label: 'Képlet', value: 's = v · t = (3 · 10⁸ m/s) · 60 s' },
      { label: 'Szorzat', value: '180 · 10⁸ = 1.8 · 10¹⁰ m' }
    ]
  },
  {
    id: 'q3-6',
    level: 3,
    question: 'Mennyi a (18³ : 6³) · 2³ kifejezés pontos értéke?',
    options: [
      '216 (6³)',
      '27',
      '1728',
      '54'
    ],
    correctAnswer: '216 (6³)',
    explanation: '1. lépés: 18³ : 6³ = (18 : 6)³ = 3³. 2. lépés: 3³ · 2³ = (3 · 2)³ = 6³ = 216.',
    hint: 'Először végezd el az osztást azonos kitevővel: (18:6)³ = 3³, majd 3³ · 2³ = 6³.',
    breakdown: [
      { label: '1. Osztás', value: '18³ : 6³ = (18:6)³ = 3³' },
      { label: '2. Szorzás', value: '3³ · 2³ = (3·2)³ = 6³ = 216' }
    ]
  },
  {
    id: 'q3-7',
    level: 3,
    question: 'Mennyi a (60⁴ : 30⁴) · 5⁴ kifejezés értéke a tízes számrendszerben?',
    options: [
      '10 000 (10⁴)',
      '1 000',
      '100 000',
      '2000'
    ],
    correctAnswer: '10 000 (10⁴)',
    explanation: '1. lépés: 60⁴ : 30⁴ = (60 : 30)⁴ = 2⁴. 2. lépés: 2⁴ · 5⁴ = (2 · 5)⁴ = 10⁴ = 10 000.',
    hint: '(60:30)⁴ = 2⁴, majd 2⁴ · 5⁴ = 10⁴ = 10 000.',
    breakdown: [
      { label: '1. Osztás', value: '(60:30)⁴ = 2⁴' },
      { label: '2. Szorzás', value: '2⁴ · 5⁴ = 10⁴ = 10 000' }
    ]
  },
  {
    id: 'q3-8',
    level: 3,
    question: 'Melyik szám a nagyobb: A = 4.2 · 10⁶ vagy B = 9.8 · 10⁵?',
    options: [
      'Az A szám a nagyobb (4.2 · 10⁶ > 9.8 · 10⁵).',
      'A B szám a nagyobb (9.8 > 4.2 miatt).',
      'A két szám pontosan egyenlő.',
      'Nem lehet összehasonlítani őket.'
    ],
    correctAnswer: 'Az A szám a nagyobb (4.2 · 10⁶ > 9.8 · 10⁵).',
    explanation: 'A = 4 200 000, míg B = 980 000. Mivel 10⁶ > 10⁵, a nagyobb 10-es hatványú szám nagyságrendekkel nagyobb.',
    hint: 'A 10⁶ milliós, a 10⁵ százezres nagyságrend: 4 200 000 > 980 000.',
    breakdown: [
      { label: 'A értéke', value: '4 200 000' },
      { label: 'B értéke', value: '980 000' },
      { label: 'Összehasonlítás', value: '4 200 000 > 980 000' }
    ]
  },
  {
    id: 'q3-9',
    level: 3,
    question: 'Mennyi a (10⁷ · 6⁴) / (2⁴ · 3⁴ · 10⁵) tört pontos értéke?',
    options: [
      '100 (10²)',
      '10',
      '1000',
      '1'
    ],
    correctAnswer: '100 (10²)',
    explanation: 'A nevezőben 2⁴ · 3⁴ = (2 · 3)⁴ = 6⁴. Így a 6⁴ egyszerűsíthető a számlálóval! Marad: 10⁷ / 10⁵ = 10⁷⁻⁵ = 10² = 100.',
    hint: 'Nevező: 2⁴ · 3⁴ = 6⁴. Egyszerűsíts 6⁴-nel, majd számold ki 10⁷ : 10⁵-t!',
    breakdown: [
      { label: 'Azonos kitevő a nevezőben', value: '2⁴ · 3⁴ = 6⁴' },
      { label: 'Egyszerűsítés', value: '6⁴ / 6⁴ = 1' },
      { label: '10-es hatványok osztása', value: '10⁷ : 10⁵ = 10² = 100' }
    ]
  },
  {
    id: 'q3-10',
    level: 3,
    question: 'Melyik x számra teljesül az alábbi egyenlet: 3ˣ · 9ˣ⁺¹ = 27³?',
    options: [
      'x = 7/3',
      'x = 2',
      'x = 3',
      'x = 1'
    ],
    correctAnswer: 'x = 7/3',
    explanation: 'Írjuk át 3 alapra: 9 = 3², 27 = 3³. 3ˣ · (3²)^(x+1) = (3³)³ ⟹ 3ˣ · 3^(2x+2) = 3⁹ ⟹ 3^(3x+2) = 3⁹ ⟹ 3x + 2 = 9 ⟹ 3x = 7 ⟹ x = 7/3.',
    hint: '9 = 3² és 27 = 3³. 3ˣ · 3^(2x+2) = 3⁹ ⟹ x + 2x + 2 = 9.',
    breakdown: [
      { label: '3-as alapra hozás', value: '3ˣ · 3^(2x+2) = 3⁹' },
      { label: 'Kitevők egyenlősége', value: '3x + 2 = 9' },
      { label: 'Megoldás', value: '3x = 7 ⟹ x = 7/3' }
    ]
  }
];

export const PowersQuiz: React.FC<PowersQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      title="6. Hatványozás – Kvíz"
      subtitle="30 feladat 3 nehézségi szinten: Hatvány fogalma, 0 kitevő, hatványozás azonosságai (kiemelten az osztás) és nagy számok normálalakja"
      questions={questions}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      documentId="grade-8-szamok-betuk-hatvanyozas-quiz"
      pdfFilename="8_osztaly_hatvanyozas_kviz.pdf"
      badgeColor="amber"
      matcherComponent={<PowersMatcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} />}
      sorterComponent={<PowersSorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} />}
      cheatSheetCards={cheatSheetCards}
    />
  );
};

export default PowersQuiz;
