import React from 'react';
import { QuizTemplate, Question, CheatSheetCard } from '../QuizTemplate';
import { SqrtConceptMatcher } from './SqrtConceptMatcher';
import { SqrtConceptSorter } from './SqrtConceptSorter';
import { Square, ShieldAlert, Scale, Compass } from 'lucide-react';

interface SqrtConceptQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    id: 'c1',
    title: 'A Négyzetgyök Definíciója',
    icon: <Square className="w-4 h-4 text-rose-600" />,
    formula: '√a = b ⟺ b ≥ 0 és b² = a (a ≥ 0)',
    note: '√25 = 5 (nem -5!), √0 = 0, √(-9) nem értelmezhető.'
  },
  {
    id: 'c2',
    title: 'Értelmezési Tartomány',
    icon: <ShieldAlert className="w-4 h-4 text-amber-600" />,
    formula: 'Gyök alatti kifejezés ≥ 0',
    note: '√(x - 5) ⟹ x ≥ 5;  √(6 - 2x) ⟹ x ≤ 3.'
  },
  {
    id: 'c3',
    title: 'Négyzet és Gyök Kapcsolata',
    icon: <Scale className="w-4 h-4 text-purple-600" />,
    formula: '√(a²) = |a|  |  (√a)² = a (ha a ≥ 0)',
    note: '√((-7)²) = |-7| = 7, de (√(-7))² nem értelmezhető!'
  },
  {
    id: 'c4',
    title: 'Négyzetgyök Becslése',
    icon: <Compass className="w-4 h-4 text-blue-600" />,
    formula: 'a < x < b ⟹ √a < √x < √b',
    note: '49 < 54 < 64 ⟹ 7 < √54 < 8.'
  }
];

const questions: Question[] = [
  // =========================================================================
  // --- 1. SZINT: ALAP NÉGYZETGYÖKÖK, DEFINÍCIÓ ÉS NÉGYZETSZÁMOK (1-10) ---
  // =========================================================================
  {
    id: 'q1-1',
    level: 1,
    question: 'Mennyi a √64 négyzetgyök pontos értéke?',
    options: [
      '8',
      '±8',
      '32',
      '16'
    ],
    correctAnswer: '8',
    explanation: 'A négyzetgyök definíciója szerint √64 az a nemnegatív szám, amelynek négyzete 64. Mivel 8 ≥ 0 és 8² = 64, ezért √64 = 8.',
    hint: 'Melyik pozitív szám négyzete 64? 8 · 8 = 64.',
    breakdown: [
      { label: 'Definíció', value: 'b ≥ 0 és b² = 64' },
      { label: 'Érték', value: '8' }
    ]
  },
  {
    id: 'q1-2',
    level: 1,
    question: 'Mit nevezünk a matematikában egy nemnegatív a szám négyzetgyökének (√a)?',
    options: [
      'Azt a nemnegatív számot, amelynek négyzete a.',
      'Azt a két számot (+ és -), amelyek négyzete a.',
      'Az a szám felét.',
      'Bármely számot, amely kisebb mint a.'
    ],
    correctAnswer: 'Azt a nemnegatív számot, amelynek négyzete a.',
    explanation: 'A négyzetgyök definíció szerint egyértelmű és nemnegatív: √a ≥ 0 és (√a)² = a.',
    hint: 'A négyzetgyök értéke definíció szerint sosem negatív!',
    breakdown: [
      { label: 'Kikötés 1', value: '√a ≥ 0' },
      { label: 'Kikötés 2', value: '(√a)² = a (a ≥ 0)' }
    ]
  },
  {
    id: 'q1-3',
    level: 1,
    question: 'Mennyi a √0 pontos értéke?',
    options: [
      '0',
      '1',
      'Nem értelmezhető',
      '±0'
    ],
    correctAnswer: '0',
    explanation: 'Mivel 0² = 0 és 0 ≥ 0, ezért √0 = 0.',
    hint: 'Melyik nemnegatív szám négyzete 0? A 0.',
    breakdown: [
      { label: 'Számolás', value: '0² = 0 ⟹ √0 = 0' }
    ]
  },
  {
    id: 'q1-4',
    level: 1,
    question: 'Mennyi a √0.36 négyzetgyök pontos értéke tizedestört alakban?',
    options: [
      '0.6',
      '0.06',
      '6',
      '0.18'
    ],
    correctAnswer: '0.6',
    explanation: 'Mivel 0.6 · 0.6 = 0.36 és 0.6 ≥ 0, ezért √0.36 = 0.6.',
    hint: '0.6 · 0.6 = 0.36. Tört alakban: √(36/100) = 6/10 = 0.6.',
    breakdown: [
      { label: 'Tört alak', value: '√(36/100) = 6/10' },
      { label: 'Tizedestört', value: '0.6' }
    ]
  },
  {
    id: 'q1-5',
    level: 1,
    question: 'Mennyi a √(49/81) tört négyzetgyöke egyszerűsített tört alakban?',
    options: [
      '7/9',
      '49/81',
      '7/81',
      '14/18'
    ],
    correctAnswer: '7/9',
    explanation: 'Törtből úgy vonunk gyököt, hogy a számlálóból és nevezőből is gyököt vonunk: √49 / √81 = 7/9.',
    hint: '√49 = 7 és √81 = 9.',
    breakdown: [
      { label: 'Számláló gyöke', value: '√49 = 7' },
      { label: 'Nevező gyöke', value: '√81 = 9' },
      { label: 'Eredmény', value: '7/9' }
    ]
  },
  {
    id: 'q1-6',
    level: 1,
    question: 'Mennyi a -√100 kifejezés pontos értéke?',
    options: [
      '-10',
      '+10',
      'Nem értelmezhető',
      '100'
    ],
    correctAnswer: '-10',
    explanation: 'A gyökvonás elvégzése: √100 = 10. A gyökjel előtt lévő negatív előjel miatt: -(10) = -10.',
    hint: 'Először számold ki a √100-at (10), majd tedd elé a mínusz előjelet!',
    breakdown: [
      { label: 'Gyökérték', value: '√100 = 10' },
      { label: 'Előjellel', value: '-(10) = -10' }
    ]
  },
  {
    id: 'q1-7',
    level: 1,
    question: 'Mi a √(-16) kifejezés értéke a valós számok halmazán?',
    options: [
      'Nem értelmezhető (a valós számok körében nincs megoldása).',
      '-4',
      '+4',
      '±4'
    ],
    correctAnswer: 'Nem értelmezhető (a valós számok körében nincs megoldása).',
    explanation: 'Nincs olyan valós szám, amelynek a négyzete negatív (-16) lenne. Ezért a valós számok halmazán negatív számból nem lehet négyzetgyököt vonni.',
    hint: 'Egyetlen valós szám négyzete sem negatív (pl. (-4)² = +16).',
    breakdown: [
      { label: 'Szabály', value: '√a csak akkor létezik valós számként, ha a ≥ 0' },
      { label: 'Következmény', value: '√(-16) nem értelmezhető' }
    ]
  },
  {
    id: 'q1-8',
    level: 1,
    question: 'Mennyi a √(1 és 9/16) vegyestört négyzetgyöke tizedestört alakban?',
    options: [
      '1.25 (5/4)',
      '1.75',
      '1.3',
      '0.75'
    ],
    correctAnswer: '1.25 (5/4)',
    explanation: '1. Alakítsuk át a vegyestörtet áltörtté: 1 és 9/16 = 25/16. 2. Vonjunk gyököt: √(25/16) = 5/4 = 1.25.',
    hint: '1 és 9/16 = 25/16. √(25/16) = 5/4 = 1.25.',
    breakdown: [
      { label: 'Áltört alak', value: '1 + 9/16 = 25/16' },
      { label: 'Gyökvonás', value: '√25 / √16 = 5/4' },
      { label: 'Tizedestört', value: '1.25' }
    ]
  },
  {
    id: 'q1-9',
    level: 1,
    question: 'Melyik állítás IGAZ a √49 értékére vonatkozóan?',
    options: [
      '√49 = 7 (kizárólag a pozitív 7-tel egyenlő).',
      '√49 = ±7 (egyszerre +7 és -7).',
      '√49 = -7.',
      '√49 nem értelmezhető.'
    ],
    correctAnswer: '√49 = 7 (kizárólag a pozitív 7-tel egyenlő).',
    explanation: 'A négyzetgyök művelet egyértelmű függvény: a gyökérték mindig a nemnegatív számot adja vissza, így √49 = 7.',
    hint: 'A √ jel definíció szerint mindig nemnegatív számot eredményez.',
    breakdown: [
      { label: 'Szabály', value: '√a ≥ 0' },
      { label: 'Érték', value: '√49 = +7' }
    ]
  },
  {
    id: 'q1-10',
    level: 1,
    question: 'Mennyi a √144 - √25 kifejezés pontos értéke?',
    options: [
      '7',
      '119',
      '√119',
      '17'
    ],
    correctAnswer: '7',
    explanation: '√144 = 12 és √25 = 5. Különbségük: 12 - 5 = 7.',
    hint: '12 - 5 = 7.',
    breakdown: [
      { label: '√144', value: '12' },
      { label: '√25', value: '5' },
      { label: 'Különbség', value: '12 - 5 = 7' }
    ]
  },

  // =========================================================================
  // --- 2. SZINT: ÉRTELMEZÉSI TARTOMÁNY, √(a²) = |a| ÉS (√a)² = a (11-20) ---
  // =========================================================================
  {
    id: 'q2-1',
    level: 2,
    question: 'Mennyi a √((-9)²) kifejezés pontos értéke?',
    options: [
      '+9',
      '-9',
      '±9',
      'Nem értelmezhető'
    ],
    correctAnswer: '+9',
    explanation: '(-9)² = +81. Ekkor √81 = +9. Általánosan: √(a²) = |a|, így √((-9)²) = |-9| = 9.',
    hint: '√(a²) = |a| ⟹ |-9| = 9. A gyökvonás eredménye mindig pozitív vagy 0!',
    breakdown: [
      { label: 'Négyzetre emelés', value: '(-9)² = 81' },
      { label: 'Gyökvonás', value: '√81 = 9 = |-9|' }
    ]
  },
  {
    id: 'q2-2',
    level: 2,
    question: 'Milyen x valós számokra értelmezhető a √(x - 5) kifejezés?',
    options: [
      'x ≥ 5',
      'x > 5',
      'x ≤ 5',
      'Minden valós számra'
    ],
    correctAnswer: 'x ≥ 5',
    explanation: 'A négyzetgyök alatti kifejezésnek nemnegatívnak kell lennie: x - 5 ≥ 0 ⟹ x ≥ 5.',
    hint: 'Kikötés: a gyökjel alatti kifejezés ≥ 0! x - 5 ≥ 0 ⟹ ?',
    breakdown: [
      { label: 'Kikötés', value: 'x - 5 ≥ 0' },
      { label: 'Rendezés', value: 'x ≥ 5' }
    ]
  },
  {
    id: 'q2-3',
    level: 2,
    question: 'Mennyi a (√17)² kifejezés pontos értéke?',
    options: [
      '17',
      '√17',
      '289',
      '±17'
    ],
    correctAnswer: '17',
    explanation: 'Ha a ≥ 0, akkor a négyzetgyök definíciója szerint (√a)² = a. Ezért (√17)² = 17.',
    hint: 'A négyzetre emelés és a négyzetgyökvonás egymás megfordításai: (√a)² = a.',
    breakdown: [
      { label: 'Azonosság', value: '(√a)² = a (ha a ≥ 0)' },
      { label: 'Eredmény', value: '17' }
    ]
  },
  {
    id: 'q2-4',
    level: 2,
    question: 'Milyen x valós számokra értelmezhető a √(8 - 2x) kifejezés?',
    options: [
      'x ≤ 4',
      'x ≥ 4',
      'x ≥ 8',
      'x ≤ -4'
    ],
    correctAnswer: 'x ≤ 4',
    explanation: 'Kikötés: 8 - 2x ≥ 0 ⟹ 8 ≥ 2x ⟹ 4 ≥ x, azaz x ≤ 4.',
    hint: '8 - 2x ≥ 0 ⟹ 2x ≤ 8 ⟹ x ≤ 4.',
    breakdown: [
      { label: 'Kikötés', value: '8 - 2x ≥ 0' },
      { label: 'Átrendezés', value: '8 ≥ 2x' },
      { label: 'Megoldás', value: 'x ≤ 4' }
    ]
  },
  {
    id: 'q2-5',
    level: 2,
    question: 'Mennyi a √((-12)²) + √(12²) összeg értéke?',
    options: [
      '24',
      '0',
      '-24',
      '144'
    ],
    correctAnswer: '24',
    explanation: '√((-12)²) = |-12| = 12 és √(12²) = |12| = 12. Összegük: 12 + 12 = 24.',
    hint: 'Mindkét kifejezés értéke +12. 12 + 12 = 24.',
    breakdown: [
      { label: 'Első tag', value: '√((-12)²) = |-12| = 12' },
      { label: 'Második tag', value: '√(12²) = 12' },
      { label: 'Összeg', value: '12 + 12 = 24' }
    ]
  },
  {
    id: 'q2-6',
    level: 2,
    question: 'Melyik matematikai kifejezéssel egyenlő tetszőleges a valós szám esetén a √(a²)?',
    options: [
      '|a| (a abszolút értéke)',
      'a',
      '±a',
      'a²'
    ],
    correctAnswer: '|a| (a abszolút értéke)',
    explanation: 'Mivel a lehet negatív is (pl. a = -5), de a gyökvonás eredménye mindig nemnegatív (+5), ezért √(a²) = |a|.',
    hint: 'Ha a = -5, akkor √((-5)²) = 5 = |-5|.',
    breakdown: [
      { label: 'Azonosság', value: '√(a²) = |a|' },
      { label: 'Indoklás', value: 'A gyökérték sohasem lehet negatív' }
    ]
  },
  {
    id: 'q2-7',
    level: 2,
    question: 'Milyen x valós számokra értelmezhető a √(-x) kifejezés a valós számok körében?',
    options: [
      'x ≤ 0 (nempozitív számokra)',
      'x ≥ 0 (nemnegatív számokra)',
      'Csak x = 0-ra',
      'Egyetlen valós számra sem'
    ],
    correctAnswer: 'x ≤ 0 (nempozitív számokra)',
    explanation: 'Kikötés: a gyökjel alatti kifejezés ≥ 0, azaz -x ≥ 0 ⟹ x ≤ 0. (Például ha x = -9, akkor √(-(-9)) = √9 = 3).',
    hint: 'Ha x negatív (pl. -9), akkor -x pozitív (+9), így van gyöke!',
    breakdown: [
      { label: 'Kikötés', value: '-x ≥ 0' },
      { label: 'Szorzás (-1)-gyel', value: 'x ≤ 0' }
    ]
  },
  {
    id: 'q2-8',
    level: 2,
    question: 'Melyik állítás IGAZ az x² = 36 egyenletre és a √36 kifejezésre?',
    options: [
      'Az egyenletnek két gyöke van (x₁ = 6, x₂ = -6), de maga a √36 = 6.',
      'Az egyenletnek egy gyöke van (x = 6), és √36 = ±6.',
      'Mindkettő értéke pontosan ±6.',
      'Az egyenletnek nincs megoldása.'
    ],
    correctAnswer: 'Az egyenletnek két gyöke van (x₁ = 6, x₂ = -6), de maga a √36 = 6.',
    explanation: 'Az egyenlet két számra is igaz: 6² = 36 és (-6)² = 36. A √36 szimbólum viszont definíció szerint egyetlen nemnegatív számot jelöl: 6.',
    hint: 'Egyenlet gyökei: x = ±√36 = ±6. Gyökművelet: √36 = 6.',
    breakdown: [
      { label: 'Egyenlet megoldása', value: 'x = ±√36 = ±6' },
      { label: 'Négyzetgyök értéke', value: '√36 = +6' }
    ]
  },
  {
    id: 'q2-9',
    level: 2,
    question: 'Milyen x számokra értelmezhető a √(x² + 9) kifejezés?',
    options: [
      'Minden valós számra (x ∈ ℝ)',
      'x ≥ 3',
      'x ≥ -3',
      'Csak pozitív számokra'
    ],
    correctAnswer: 'Minden valós számra (x ∈ ℝ)',
    explanation: 'Bármely x valós szám esetén x² ≥ 0. Ezért x² + 9 ≥ 9 > 0 mindig teljesül, a gyök alatti szám sosem negatív.',
    hint: 'x² mindig legalább 0, így x² + 9 legalább 9, ami mindig pozitív!',
    breakdown: [
      { label: 'x² értékkészlete', value: 'x² ≥ 0' },
      { label: 'Gyök alatti rész', value: 'x² + 9 ≥ 9 > 0' },
      { label: 'Értelmezés', value: 'Minden valós számra (x ∈ ℝ)' }
    ]
  },
  {
    id: 'q2-10',
    level: 2,
    question: 'Mennyi a √((-5)²) - (√5)² különbség pontos értéke?',
    options: [
      '0',
      '-10',
      '10',
      'Nem értelmezhető'
    ],
    correctAnswer: '0',
    explanation: '√((-5)²) = |-5| = 5, és (√5)² = 5. Különbségük: 5 - 5 = 0.',
    hint: '√((-5)²) = 5 és (√5)² = 5. 5 - 5 = ?',
    breakdown: [
      { label: '1. tag', value: '√((-5)²) = 5' },
      { label: '2. tag', value: '(√5)² = 5' },
      { label: 'Különbség', value: '5 - 5 = 0' }
    ]
  },

  // =========================================================================
  // --- 3. SZINT: BECSLÉSEK, ÖSSZETETT FELADATOK ÉS EGYENLETEK (21-30) ---
  // =========================================================================
  {
    id: 'q3-1',
    level: 3,
    question: 'Melyik két szomszédos egész szám közé esik a √54 értéke a számegyenesen?',
    options: [
      '7 és 8 közé (7 < √54 < 8)',
      '6 és 7 közé (6 < √54 < 7)',
      '8 és 9 közé (8 < √54 < 9)',
      '26 és 28 közé'
    ],
    correctAnswer: '7 és 8 közé (7 < √54 < 8)',
    explanation: 'Keressük meg a két legközelebbi négyzetszámot: 7² = 49 és 8² = 64. Mivel 49 < 54 < 64, ezért 7 < √54 < 8.',
    hint: '7² = 49 és 8² = 64. 49 < 54 < 64.',
    breakdown: [
      { label: 'Négyzetszámok', value: '49 < 54 < 64' },
      { label: 'Gyökvonás', value: '√49 < √54 < √64' },
      { label: 'Intervallum', value: '7 < √54 < 8' }
    ]
  },
  {
    id: 'q3-2',
    level: 3,
    question: 'Melyik a helyes nagyságrendi sorrend az alábbi számok között: A = √20, B = 4.5, C = √25?',
    options: [
      'A < B < C',
      'B < A < C',
      'C < A < B',
      'A < C < B'
    ],
    correctAnswer: 'A < B < C',
    explanation: 'Négyzetre emelve őket: A² = 20, B² = 4.5² = 20.25, C² = 25. Mivel 20 < 20.25 < 25, ezért √20 < 4.5 < √25.',
    hint: 'Emeld mindhármat négyzetre: (√20)² = 20, 4.5² = 20.25, (√25)² = 25.',
    breakdown: [
      { label: 'A²', value: '20' },
      { label: 'B²', value: '4.5² = 20.25' },
      { label: 'C²', value: '25' },
      { label: 'Sorrend', value: '√20 < 4.5 < 5' }
    ]
  },
  {
    id: 'q3-3',
    level: 3,
    question: 'Mennyi a √(3² + 4²) kifejezés pontos értéke?',
    options: [
      '5',
      '7 (3 + 4)',
      '25',
      '√7'
    ],
    correctAnswer: '5',
    explanation: 'Először a négyzeteket számoljuk ki a gyök alatt: 3² = 9 és 4² = 16. Összegük: 9 + 16 = 25. Végül √25 = 5. (Pitagorasz-tétel alapja!)',
    hint: 'Először végezd el a műveleteket a gyökjel alatt: √(9 + 16) = √25 = 5.',
    breakdown: [
      { label: 'Gyök alatti műveletek', value: '3² + 4² = 9 + 16 = 25' },
      { label: 'Gyökvonás', value: '√25 = 5' }
    ]
  },
  {
    id: 'q3-4',
    level: 3,
    question: 'Melyik állítás IGAZ a √(9 + 16) és √9 + √16 kifejezések összehasonlítására?',
    options: [
      '√(9 + 16) = 5, míg √9 + √16 = 7 (azaz nem lehet tagonként gyököt vonni!).',
      'Mindkét kifejezés értéke pontosan 7.',
      'Mindkét kifejezés értéke pontosan 5.',
      '√(9 + 16) nem értelmezhető.'
    ],
    correctAnswer: '√(9 + 16) = 5, míg √9 + √16 = 7 (azaz nem lehet tagonként gyököt vonni!).',
    explanation: '√(9 + 16) = √25 = 5. Ezzel szemben √9 + √16 = 3 + 4 = 7. Mivel 5 ≠ 7, az összeg gyöke nem egyenlő a gyökök összegével!',
    hint: '√(a + b) ≠ √a + √b!',
    breakdown: [
      { label: '√(9 + 16)', value: '√25 = 5' },
      { label: '√9 + √16', value: '3 + 4 = 7' },
      { label: 'Következtetés', value: '5 ≠ 7' }
    ]
  },
  {
    id: 'q3-5',
    level: 3,
    question: 'Melyik két szomszédos egész szám közé esik a -√30 értéke?',
    options: [
      '-6 és -5 közé (-6 < -√30 < -5)',
      '-5 és -4 közé (-5 < -√30 < -4)',
      '5 és 6 közé',
      '-30 és -29 közé'
    ],
    correctAnswer: '-6 és -5 közé (-6 < -√30 < -5)',
    explanation: 'Mivel 25 < 30 < 36, ezért 5 < √30 < 6. A negatív előjel megfordítja a relációt: -6 < -√30 < -5.',
    hint: '√25 = 5 és √36 = 6 ⟹ 5 < √30 < 6 ⟹ -6 < -√30 < -5.',
    breakdown: [
      { label: 'Pozitív gyök', value: '5 < √30 < 6' },
      { label: 'Negatív előjel', value: '-6 < -√30 < -5' }
    ]
  },
  {
    id: 'q3-6',
    level: 3,
    question: 'Mennyi a √(100 - 64) kifejezés pontos értéke?',
    options: [
      '6',
      '2 (10 - 8)',
      '36',
      '√36 = ±6'
    ],
    correctAnswer: '6',
    explanation: '100 - 64 = 36. Ekkor √36 = 6. (Vigyázat: nem 10 - 8 = 2!).',
    hint: 'Először végezd el a kivonást a gyök alatt: 100 - 64 = 36 ⟹ √36 = 6.',
    breakdown: [
      { label: 'Kivonás', value: '100 - 64 = 36' },
      { label: 'Gyökvonás', value: '√36 = 6' }
    ]
  },
  {
    id: 'q3-7',
    level: 3,
    question: 'Egy négyzet területe 169 cm². Mekkora a négyzet kerülete?',
    options: [
      '52 cm',
      '13 cm',
      '26 cm',
      '65 cm'
    ],
    correctAnswer: '52 cm',
    explanation: 'A négyzet oldala: a = √T = √169 = 13 cm. A kerület: K = 4 · a = 4 · 13 = 52 cm.',
    hint: 'a = √169 = 13 cm. Kerület: K = 4 · a.',
    breakdown: [
      { label: 'Oldalhossz', value: 'a = √169 = 13 cm' },
      { label: 'Kerület', value: 'K = 4 · 13 = 52 cm' }
    ]
  },
  {
    id: 'q3-8',
    level: 3,
    question: 'Mennyi az x értéke az alábbi egyenletben: √(2x + 1) = 5?',
    options: [
      'x = 12',
      'x = 2',
      'x = 13',
      'x = 24'
    ],
    correctAnswer: 'x = 12',
    explanation: 'Emeljük mindkét oldalt négyzetre: 2x + 1 = 5² = 25 ⟹ 2x = 24 ⟹ x = 12. Ellenőrzés: √(2·12 + 1) = √25 = 5 (helyes).',
    hint: 'Négyzetre emelés: 2x + 1 = 25 ⟹ 2x = 24.',
    breakdown: [
      { label: 'Négyzetre emelés', value: '2x + 1 = 25' },
      { label: '1 kivonása', value: '2x = 24' },
      { label: 'Osztás 2-vel', value: 'x = 12' }
    ]
  },
  {
    id: 'q3-9',
    level: 3,
    question: 'Mennyi a √0.0004 + √0.09 összeg pontos értéke tizedestörtben?',
    options: [
      '0.32',
      '0.05',
      '0.302',
      '0.032'
    ],
    correctAnswer: '0.32',
    explanation: '√0.0004 = 0.02 (mert 0.02² = 0.0004) és √0.09 = 0.3 (mert 0.3² = 0.09). Összegük: 0.02 + 0.3 = 0.32.',
    hint: '0.02 + 0.3 = 0.32.',
    breakdown: [
      { label: '√0.0004', value: '0.02' },
      { label: '√0.09', value: '0.3' },
      { label: 'Összeg', value: '0.02 + 0.3 = 0.32' }
    ]
  },
  {
    id: 'q3-10',
    level: 3,
    question: 'Melyik egész szám van a legközelebb a √83 értékéhez a számegyenesen?',
    options: [
      '9 (mert 9² = 81 áll legközelebb a 83-hoz)',
      '8',
      '10',
      '83'
    ],
    correctAnswer: '9 (mert 9² = 81 áll legközelebb a 83-hoz)',
    explanation: '9² = 81 és 10² = 100. A 83 a 81-hez van sokkal közelebb (távolság: 2), mint a 100-hoz (távolság: 17). Ezért √83 ≈ 9.11, legközelebbi egész a 9.',
    hint: '81 és 100 négyzetszámok közül a 83 a 81-hez van közelebb: 9² = 81.',
    breakdown: [
      { label: 'Négyzetszámok távolsága', value: '|83 - 81| = 2  vs  |100 - 83| = 17' },
      { label: 'Legközelebbi egész', value: '9' }
    ]
  }
];

export const SqrtConceptQuiz: React.FC<SqrtConceptQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      topicId="g8-sqrt-concept"
      grade={8}
      chapterId="szamok-es-betuk"
      topicTitle="A négyzetgyök fogalma"
      emoji="🎯"
      title="7. A négyzetgyök fogalma – Kvíz"
      subtitle="30 feladat 3 nehézségi szinten: A négyzetgyök definíciója, nemnegativitás, értelmezési tartomány, √(a²) = |a| és becslések"
      questions={questions}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      documentId="grade-8-szamok-betuk-negyzetgyok-fogalom-quiz"
      pdfFilename="8_osztaly_negyzetgyok_fogalma_kviz.pdf"
      badgeColor="rose"
      matcherComponent={<SqrtConceptMatcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} />}
      sorterComponent={<SqrtConceptSorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} />}
      cheatSheetCards={cheatSheetCards}
    />
  );
};

export default SqrtConceptQuiz;
