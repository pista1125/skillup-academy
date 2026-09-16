import React from 'react';
import { QuizTemplate, Question, CheatSheetCard } from '../QuizTemplate';
import { RationalOperationsMatcher } from './RationalOperationsMatcher';
import { RationalOperationsSorter } from './RationalOperationsSorter';
import { Calculator, Layers, Sparkles, Scale, CheckCircle2 } from 'lucide-react';

interface RationalOperationsQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    id: 'c1',
    title: 'Műveleti Tulajdonságok',
    icon: <Layers className="w-4 h-4 text-cyan-600" />,
    formula: 'Kommutatív: a+b=b+a | Asszociatív: (a+b)+c=a+(b+c) | Disztributív: a(b+c)=ab+ac',
    note: 'Kiemelés: a·b + a·c = a·(b + c).'
  },
  {
    id: 'c2',
    title: 'Előjelszabályok (Szorzás/Osztás)',
    icon: <Calculator className="w-4 h-4 text-blue-600" />,
    formula: '(+) · (+) = (+) | (-) · (-) = (+) | (+) · (-) = (-) | (-) · (+) = (-)',
    note: 'Páros sok negatív ⟹ (+), páratlan sok negatív ⟹ (-).'
  },
  {
    id: 'c3',
    title: 'Műveleti Sorrend',
    icon: <Scale className="w-4 h-4 text-purple-600" />,
    formula: '1. Zárójel ⟹ 2. Hatványozás ⟹ 3. Szorzás/Osztás ⟹ 4. Összeadás/Kivonás',
    note: 'Szorzás és osztás balról jobbra egyenrangú!'
  },
  {
    id: 'c4',
    title: 'Törtműveletek',
    icon: <Sparkles className="w-4 h-4 text-teal-600" />,
    formula: '(a/b) : (c/d) = (a/b) · (d/c) | (a/b) / (c/d) = (a·d) / (b·c)',
    note: 'Összeadásnál/kivonásnál közös nevező, szorzásnál egyszerűsítés szorzás előtt.'
  }
];

const questions: Question[] = [
  // ==========================================
  // --- 1. SZINT: ALAPMŰVELETEK ÉS ELŐJELSZABÁLYOK (1-10) ---
  // ==========================================
  {
    id: 'q1-1',
    level: 1,
    question: 'Mennyi a következő szorzat pontos értéke: (-4) · (-3) · (-2)?',
    options: [
      '-24',
      '+24',
      '-12',
      '+12'
    ],
    correctAnswer: '-24',
    explanation: 'Páratlan sok (3 darab) negatív tényező szorzata negatív: (-4) · (-3) = +12, majd (+12) · (-2) = -24.',
    hint: 'Számold meg a negatív előjeleket: 3 darab van, tehát az eredmény negatív lesz!',
    breakdown: [
      { label: '1. Lépés', value: '(-4) · (-3) = +12' },
      { label: '2. Lépés', value: '(+12) · (-2) = -24' }
    ]
  },
  {
    id: 'q1-2',
    level: 1,
    question: 'Mennyi a (-6) - (-14) kifejezés értéke?',
    options: [
      '+8',
      '-20',
      '+20',
      '-8'
    ],
    correctAnswer: '+8',
    explanation: 'Negatív szám kivonása azonos a pozitív ellentettjének hozzáadásával: -6 - (-14) = -6 + 14 = +8.',
    hint: '-(-14) = +14.',
    breakdown: [
      { label: 'Átírás', value: '-6 - (-14) = -6 + 14' },
      { label: 'Eredmény', value: '+8' }
    ]
  },
  {
    id: 'q1-3',
    level: 1,
    question: 'Mi a különbség (-3)² és -3² között?',
    options: [
      '(-3)² = +9, míg -3² = -9.',
      'Mindkettő értéke +9.',
      'Mindkettő értéke -9.',
      '(-3)² = -9, míg -3² = +9.'
    ],
    correctAnswer: '(-3)² = +9, míg -3² = -9.',
    explanation: '(-3)² esetén a negatív szám van a négyzeten: (-3)·(-3) = +9. A -3² esetén a hatványozás előbbre való, mint az előjel: -(3·3) = -9.',
    hint: 'A zárójelbe tett negatív szám négyzete pozitív, zárójel nélkül a mínusz megmarad.',
    breakdown: [
      { label: '(-3)²', value: '(-3) · (-3) = +9' },
      { label: '-3²', value: '-(3 · 3) = -9' }
    ]
  },
  {
    id: 'q1-4',
    level: 1,
    question: 'Mennyi a (-18) : (-3) osztás eredménye?',
    options: [
      '+6',
      '-6',
      '+54',
      '-54'
    ],
    correctAnswer: '+6',
    explanation: 'Két negatív szám hányadosa pozitív: (-) : (-) = (+), 18 : 3 = 6.',
    hint: 'Azonos előjelek osztásakor az eredmény mindig pozitív!',
    breakdown: [
      { label: 'Előjel', value: '(-) : (-) = (+)' },
      { label: 'Hányados', value: '18 : 3 = 6' }
    ]
  },
  {
    id: 'q1-5',
    level: 1,
    question: 'Melyik műveleti tulajdonságot fejezi ki az a + b = b + a azonosság?',
    options: [
      'Kommutativitás (Felcserélhetőség)',
      'Asszociativitás (Csoportosíthatóság)',
      'Disztributivitás (Széttagolhatóság)',
      'Invertálhatóság'
    ],
    correctAnswer: 'Kommutativitás (Felcserélhetőség)',
    explanation: 'Az összeadás tagjainak felcserélhetőségét kommutativitásnak nevezzük.',
    hint: 'A latin „commutare” (felcserélni) szóból ered.',
    breakdown: [
      { label: 'Tulajdonság', value: 'Kommutatív (felcserélhető)' },
      { label: 'Szorzásra is', value: 'a · b = b · a' }
    ]
  },
  {
    id: 'q1-6',
    level: 1,
    question: 'Mennyi a (-1)²⁰²⁶ + (-1)²⁰²⁷ összeg pontos értéke?',
    options: [
      '0',
      '+2',
      '-2',
      '+1'
    ],
    correctAnswer: '0',
    explanation: '(-1) páros hatványa +1 ((-1)²⁰²⁶ = 1), míg páratlan hatványa -1 ((-1)²⁰²⁷ = -1). Összegük: 1 + (-1) = 0.',
    hint: '2026 páros szám, 2027 páratlan szám.',
    breakdown: [
      { label: '(-1)²⁰²⁶', value: '+1 (páros kitevő)' },
      { label: '(-1)²⁰²⁷', value: '-1 (páratlan kitevő)' },
      { label: 'Összeg', value: '1 + (-1) = 0' }
    ]
  },
  {
    id: 'q1-7',
    level: 1,
    question: 'Mennyi a 0 : (-5) osztás eredménye?',
    options: [
      '0',
      '-5',
      'Nem értelmezhető',
      '+5'
    ],
    correctAnswer: '0',
    explanation: 'A 0-t bármilyen nem nulla számmal elosztva az eredmény 0. (Csak a 0-val való osztás nem értelmezhető!).',
    hint: '0 osztva bármilyen számmal = 0.',
    breakdown: [
      { label: '0 : b (ha b ≠ 0)', value: 'Mindig 0' }
    ]
  },
  {
    id: 'q1-8',
    level: 1,
    question: 'Mennyi a -12 + 5 - (-3) - 8 kifejezés értéke?',
    options: [
      '-12',
      '-6',
      '-18',
      '0'
    ],
    correctAnswer: '-12',
    explanation: '-12 + 5 + 3 - 8 = (-12 + 8) - 8 = -4 - 8 = -12.',
    hint: 'Írd át a -(-3)-at +3-ra, majd végezd el az összevonást!',
    breakdown: [
      { label: 'Átírás', value: '-12 + 5 + 3 - 8' },
      { label: 'Pozitívak és negatívak', value: '(5 + 3) + (-12 - 8) = 8 - 20 = -12' }
    ]
  },
  {
    id: 'q1-9',
    level: 1,
    question: 'Ha 5 darab negatív és 2 darab pozitív számot szorzunk össze, mi lesz a szorzat előjele?',
    options: [
      'Negatív (-)',
      'Pozitív (+)',
      'Nulla',
      'Attól függ, melyik a nagyobb'
    ],
    correctAnswer: 'Negatív (-)',
    explanation: 'A pozitív tényezők nem változtatják meg az előjelet. 5 darab (páratlan sok) negatív szám szorzata negatív.',
    hint: 'A negatív tényezők száma határozza meg az előjelet: 5 páratlan szám!',
    breakdown: [
      { label: 'Negatív tényezők száma', value: '5 (páratlan)' },
      { label: 'Szorzat előjele', value: 'Negatív (-)' }
    ]
  },
  {
    id: 'q1-10',
    level: 1,
    question: 'Mennyi a (-4) · 0.25 szorzat értéke?',
    options: [
      '-1',
      '+1',
      '-0.1',
      '-10'
    ],
    correctAnswer: '-1',
    explanation: '0.25 = 1/4. (-4) · (1/4) = -4/4 = -1.',
    hint: '0.25 az egynegyed: 4 negyed az 1 egész, a negatív előjel miatt -1.',
    breakdown: [
      { label: '0.25 törtként', value: '1/4' },
      { label: 'Szorzat', value: '(-4) · (1/4) = -1' }
    ]
  },

  // ==========================================
  // --- 2. SZINT: TÖRTES MŰVELETEK ÉS MŰVELETI SORREND (11-20) ---
  // ==========================================
  {
    id: 'q2-1',
    level: 2,
    question: 'Mennyi a 3/4 + 2/5 összeg legegyszerűbb alakban?',
    options: [
      '23/20 = 1 3/20',
      '5/9',
      '6/20',
      '1'
    ],
    correctAnswer: '23/20 = 1 3/20',
    explanation: 'Közös nevező a 20: 3/4 = 15/20 és 2/5 = 8/20. Összegük: (15 + 8)/20 = 23/20.',
    hint: 'A 4 és 5 legkisebb közös többszöröse a 20.',
    breakdown: [
      { label: 'Közös nevező', value: '20' },
      { label: 'Bővítés', value: '15/20 + 8/20 = 23/20' }
    ]
  },
  {
    id: 'q2-2',
    level: 2,
    question: 'Mennyi az 5/6 - 7/9 különbség értéke?',
    options: [
      '1/18',
      '-2/3',
      '-2/18',
      '1/3'
    ],
    correctAnswer: '1/18',
    explanation: 'A 6 és 9 legkisebb közös többszöröse 18: 5/6 = 15/18 és 7/9 = 14/18. Különbség: 15/18 - 14/18 = 1/18.',
    hint: 'Közös nevező: 18 (bővíts 3-mal és 2-vel).',
    breakdown: [
      { label: 'Bővítés', value: '15/18 - 14/18' },
      { label: 'Kivonás', value: '1/18' }
    ]
  },
  {
    id: 'q2-3',
    level: 2,
    question: 'Mennyi a (3/8) · (4/9) szorzat értéke egyszerűsített tört alakban?',
    options: [
      '1/6',
      '12/72',
      '7/17',
      '1/4'
    ],
    correctAnswer: '1/6',
    explanation: 'Szorzás előtt egyszerűsítsünk keresztbe: a 3 és 9 egyszerűsíthető 3-mal (1 és 3), a 4 és 8 egyszerűsíthető 4-gyel (1 és 2). Eredmény: (1·1)/(2·3) = 1/6.',
    hint: 'Egyszerűsíts a szorzás előtt keresztbe!',
    breakdown: [
      { label: 'Keresztbe egyszerűsítés', value: '(1 · 1) / (2 · 3)' },
      { label: 'Szorzat', value: '1/6' }
    ]
  },
  {
    id: 'q2-4',
    level: 2,
    question: 'Mennyi az (5/12) : (15/16) osztás eredménye legegyszerűbb tört alakban?',
    options: [
      '4/9',
      '9/4',
      '75/192',
      '1/3'
    ],
    correctAnswer: '4/9',
    explanation: 'Törttel való osztás = szorzás a reciprokával: (5/12) · (16/15). Egyszerűsítve: (1·4)/(3·3) = 4/9.',
    hint: 'Szorozz a második tört reciprokával: 16/15-tel!',
    breakdown: [
      { label: 'Reciprokkal szorzás', value: '(5/12) · (16/15)' },
      { label: 'Egyszerűsítés', value: '5 és 15 ⟹ 1 és 3; 16 és 12 ⟹ 4 és 3' },
      { label: 'Eredmény', value: '(1 · 4) / (3 · 3) = 4/9' }
    ]
  },
  {
    id: 'q2-5',
    level: 2,
    question: 'Mennyi a következő kifejezés értéke a helyes műveleti sorrend szerint: 8 - 2 · 3 + 4?',
    options: [
      '6',
      '22',
      '18',
      '0'
    ],
    correctAnswer: '6',
    explanation: '1. Szorzás: 2 · 3 = 6. 2. Balról jobbra: 8 - 6 + 4 = 2 + 4 = 6.',
    hint: 'Először a szorzást végezd el: 2 · 3 = 6, utána balról jobbra a kivonást és összeadást!',
    breakdown: [
      { label: '1. Szorzás', value: '2 · 3 = 6' },
      { label: '2. Balról jobbra', value: '8 - 6 = 2' },
      { label: '3. Összeadás', value: '2 + 4 = 6' }
    ]
  },
  {
    id: 'q2-6',
    level: 2,
    question: 'Mennyi a 15 - 3 · (7 - 4) kifejezés értéke?',
    options: [
      '6',
      '36',
      '24',
      '0'
    ],
    correctAnswer: '6',
    explanation: '1. Zárójel belseje: 7 - 4 = 3. 2. Szorzás: 3 · 3 = 9. 3. Kivonás: 15 - 9 = 6.',
    hint: 'Zárójel belseje: 7 - 4 = 3, majd 3 · 3 = 9.',
    breakdown: [
      { label: '1. Zárójel', value: '7 - 4 = 3' },
      { label: '2. Szorzás', value: '3 · 3 = 9' },
      { label: '3. Kivonás', value: '15 - 9 = 6' }
    ]
  },
  {
    id: 'q2-7',
    level: 2,
    question: 'Mennyi a (2/3 - 1/2) : (5/6) kifejezés értéke?',
    options: [
      '1/5',
      '5/36',
      '1',
      '2/5'
    ],
    correctAnswer: '1/5',
    explanation: '1. Zárójel: 2/3 - 1/2 = 4/6 - 3/6 = 1/6. 2. Osztás: (1/6) : (5/6) = (1/6) · (6/5) = 1/5.',
    hint: '2/3 - 1/2 = 1/6. Ezután (1/6) : (5/6) = (1/6) · (6/5) = ?',
    breakdown: [
      { label: '1. Zárójel', value: '4/6 - 3/6 = 1/6' },
      { label: '2. Osztás', value: '(1/6) · (6/5) = 1/5' }
    ]
  },
  {
    id: 'q2-8',
    level: 2,
    question: 'Mennyi a (-3/4) · (-8/9) szorzat egyszerűsített értéke?',
    options: [
      '+2/3',
      '-2/3',
      '+24/36',
      '-24/36'
    ],
    correctAnswer: '+2/3',
    explanation: 'Két negatív szorzata pozitív: (+). Keresztbe egyszerűsítve: (1·2)/(1·3) = 2/3.',
    hint: '(-) · (-) = (+), egyszerűsíts 3-mal és 4-gyel!',
    breakdown: [
      { label: 'Előjel', value: '(-) · (-) = (+)' },
      { label: 'Egyszerűsítés', value: '(3/4) · (8/9) = 2/3' }
    ]
  },
  {
    id: 'q2-9',
    level: 2,
    question: 'Mennyi a (-2)³ + (-3)² kifejezés értéke?',
    options: [
      '+1',
      '-17',
      '+17',
      '-1'
    ],
    correctAnswer: '+1',
    explanation: '(-2)³ = -8 (páratlan hatvány), (-3)² = +9 (páros hatvány). Összegük: -8 + 9 = +1.',
    hint: '(-2) · (-2) · (-2) = -8 és (-3) · (-3) = +9.',
    breakdown: [
      { label: '(-2)³', value: '-8' },
      { label: '(-3)²', value: '+9' },
      { label: 'Összeg', value: '-8 + 9 = +1' }
    ]
  },
  {
    id: 'q2-10',
    level: 2,
    question: 'Mennyi a (1 - 1/3) · (1 - 1/4) · (1 - 1/5) láncszorzat értéke?',
    options: [
      '2/5 = 0.4',
      '1/5',
      '3/5',
      '1/60'
    ],
    correctAnswer: '2/5 = 0.4',
    explanation: '(2/3) · (3/4) · (4/5). A szomszédos számlálók és nevezők kiejtik egymást (teleszkópos szorzat): 2/5 = 0.4.',
    hint: 'Írd fel a zárójeleket törtként: (2/3) · (3/4) · (4/5), és nézd meg, mi esik ki!',
    breakdown: [
      { label: 'Tényezők', value: '(2/3) · (3/4) · (4/5)' },
      { label: 'Kiesések után', value: '2/5 = 0.4' }
    ]
  },

  // ==========================================
  // --- 3. SZINT: EMELETES TÖRTEK ÉS ÉSSZERŰ SZÁMOLÁS (21-30) ---
  // ==========================================
  {
    id: 'q3-1',
    level: 3,
    question: 'Mennyi az alábbi emeletes tört értéke: (2/3) / (4/9)?',
    options: [
      '3/2 = 1.5',
      '2/3',
      '8/27',
      '1'
    ],
    correctAnswer: '3/2 = 1.5',
    explanation: 'A fő törtvonal osztást jelent: (2/3) : (4/9) = (2/3) · (9/4) = (1·3)/(1·2) = 3/2 = 1.5.',
    hint: 'Számláló szorozva a nevező reciprokával: (2/3) · (9/4).',
    breakdown: [
      { label: 'Osztássá alakítás', value: '(2/3) · (9/4)' },
      { label: 'Egyszerűsítés', value: '(1 · 3) / (1 · 2) = 3/2' }
    ]
  },
  {
    id: 'q3-2',
    level: 3,
    question: 'Számítsd ki a lehető legésszerűbben: 2.5 · 39 · 0.4!',
    options: [
      '39',
      '390',
      '3.9',
      '97.5'
    ],
    correctAnswer: '39',
    explanation: 'Csoportosítsuk a 2.5-et és 0.4-et: 2.5 · 0.4 = 1. Ekkor 1 · 39 = 39.',
    hint: 'Mennyi 2.5 · 0.4? Pontosan 1!',
    breakdown: [
      { label: 'Csoportosítás', value: '(2.5 · 0.4) · 39' },
      { label: 'Szorzás', value: '1 · 39 = 39' }
    ]
  },
  {
    id: 'q3-3',
    level: 3,
    question: 'Számítsd ki kiemeléssel: 7.4 · 13.8 - 7.4 · 3.8!',
    options: [
      '74',
      '7.4',
      '740',
      '102.12'
    ],
    correctAnswer: '74',
    explanation: 'Emeljük ki a közös 7.4-et: 7.4 · (13.8 - 3.8) = 7.4 · 10 = 74.',
    hint: 'Emeld ki a közös 7.4 szorzót: 7.4 · (13.8 - 3.8).',
    breakdown: [
      { label: 'Kiemelés', value: '7.4 · (13.8 - 3.8)' },
      { label: 'Számolás', value: '7.4 · 10 = 74' }
    ]
  },
  {
    id: 'q3-4',
    level: 3,
    question: 'Mennyi a következő emeletes tört értéke: (1/2 + 1/3) / (1/2 - 1/3)?',
    options: [
      '5',
      '1',
      '5/6',
      '25/36'
    ],
    correctAnswer: '5',
    explanation: 'Számláló: 1/2 + 1/3 = 5/6. Nevező: 1/2 - 1/3 = 1/6. Emeletes tört: (5/6) / (1/6) = (5/6) : (1/6) = 5.',
    hint: 'Számláló = 5/6, Nevező = 1/6. 5/6 osztva 1/6-tal = ?',
    breakdown: [
      { label: 'Számláló', value: '3/6 + 2/6 = 5/6' },
      { label: 'Nevező', value: '3/6 - 2/6 = 1/6' },
      { label: 'Hányados', value: '(5/6) : (1/6) = 5' }
    ]
  },
  {
    id: 'q3-5',
    level: 3,
    question: 'Mennyi a 12 - 4 · [3 - 2 · (5 - 8)] összetett kifejezés értéke?',
    options: [
      '-24',
      '24',
      '0',
      '-48'
    ],
    correctAnswer: '-24',
    explanation: '1. Kerek zárójel: 5 - 8 = -3. 2. Szögletes zárójelben: 3 - 2 · (-3) = 3 + 6 = 9. 3. Szorzás: 4 · 9 = 36. 4. Kivonás: 12 - 36 = -24.',
    hint: 'Belsőtől kifelé: (5 - 8) = -3 ⟹ [3 - 2·(-3)] = [3 + 6] = 9.',
    breakdown: [
      { label: '1. Kerek zárójel', value: '5 - 8 = -3' },
      { label: '2. Szögletes zárójel', value: '3 - 2·(-3) = 3 + 6 = 9' },
      { label: '3. Külső szorzás és kivonás', value: '12 - 4 · 9 = 12 - 36 = -24' }
    ]
  },
  {
    id: 'q3-6',
    level: 3,
    question: 'Számítsd ki a lehető leggyorsabban: 125 · 7.8 · 0.8!',
    options: [
      '780',
      '78',
      '7800',
      '975'
    ],
    correctAnswer: '780',
    explanation: '125 · 0.8 = 100 (mivel 125 · 8 = 1000). Ekkor 100 · 7.8 = 780.',
    hint: '125 · 0.8 = 100.',
    breakdown: [
      { label: 'Csoportosítás', value: '(125 · 0.8) · 7.8' },
      { label: 'Szorzat', value: '100 · 7.8 = 780' }
    ]
  },
  {
    id: 'q3-7',
    level: 3,
    question: 'Mennyi a (-3/5 + 1/2) / (-1/10) kifejezés értéke?',
    options: [
      '+1',
      '-1',
      '+10',
      '-1/100'
    ],
    correctAnswer: '+1',
    explanation: 'Számláló: -3/5 + 1/2 = -6/10 + 5/10 = -1/10. Emeletes tört: (-1/10) / (-1/10) = +1.',
    hint: 'Számláló = -6/10 + 5/10 = -1/10.',
    breakdown: [
      { label: 'Számláló', value: '-6/10 + 5/10 = -1/10' },
      { label: 'Hányados', value: '(-1/10) / (-1/10) = +1' }
    ]
  },
  {
    id: 'q3-8',
    level: 3,
    question: 'Ha a = -2/3 és b = 3/4, mennyi az (a - b) · (a + b) kifejezés pontos értéke?',
    options: [
      '-17/144',
      '+17/144',
      '-25/144',
      '+25/144'
    ],
    correctAnswer: '-17/144',
    explanation: 'Azonosság: (a - b)(a + b) = a² - b². a² = (-2/3)² = 4/9 = 64/144. b² = (3/4)² = 9/16 = 81/144. Különbségük: 64/144 - 81/144 = -17/144.',
    hint: 'Alkalmazd az (a - b)(a + b) = a² - b² azonosságot!',
    breakdown: [
      { label: 'a² - b²', value: '(-2/3)² - (3/4)²' },
      { label: 'Közös nevezőre hozás', value: '4/9 - 9/16 = 64/144 - 81/144' },
      { label: 'Eredmény', value: '-17/144' }
    ]
  },
  {
    id: 'q3-9',
    level: 3,
    question: 'Számítsd ki a zárójel tagonkénti beszorzásával: 48 · (5/6 - 3/8 + 7/12)!',
    options: [
      '50',
      '48',
      '52',
      '46'
    ],
    correctAnswer: '50',
    explanation: '48 · (5/6) - 48 · (3/8) + 48 · (7/12) = (8 · 5) - (6 · 3) + (4 · 7) = 40 - 18 + 28 = 50.',
    hint: '48 : 6 = 8 ⟹ 8·5=40; 48 : 8 = 6 ⟹ 6·3=18; 48 : 12 = 4 ⟹ 4·7=28.',
    breakdown: [
      { label: 'Beszorzott tagok', value: '40 - 18 + 28' },
      { label: 'Összeg', value: '22 + 28 = 50' }
    ]
  },
  {
    id: 'q3-10',
    level: 3,
    question: 'Mennyi az 1 / (1 + 1 / (1 + 1/2)) lánctört pontos értéke?',
    options: [
      '3/5 = 0.6',
      '5/3',
      '2/3',
      '1/2'
    ],
    correctAnswer: '3/5 = 0.6',
    explanation: 'Alulról felfelé haladunk: 1. 1 + 1/2 = 3/2. 2. 1 / (3/2) = 2/3. 3. 1 + 2/3 = 5/3. 4. 1 / (5/3) = 3/5 = 0.6.',
    hint: 'Haladj a legbelső nevezőtől felfelé: 1 + 1/2 = 3/2 ⟹ 1 / (3/2) = 2/3 ⟹ 1 + 2/3 = 5/3.',
    breakdown: [
      { label: '1. Legalsó rész', value: '1 + 1/2 = 3/2' },
      { label: '2. Reciprok', value: '1 / (3/2) = 2/3' },
      { label: '3. Következő összeg', value: '1 + 2/3 = 5/3' },
      { label: '4. Végső reciprok', value: '1 / (5/3) = 3/5 = 0.6' }
    ]
  }
];

export const RationalOperationsQuiz: React.FC<RationalOperationsQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      topicId="g8-rational-operations"
      grade={8}
      chapterId="szamok-es-betuk"
      topicTitle="Mit tudunk a racionális számokról?"
      emoji="🎯"
      title="5. Mit tudunk a racionális számokról? – Kvíz"
      subtitle="30 feladat 3 nehézségi szinten: Műveleti azonosságok, előjelszabályok, műveleti sorrend, törtműveletek és ésszerű számolás"
      questions={questions}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      documentId="grade-8-szamok-betuk-racionalis-muveletek-quiz"
      pdfFilename="8_osztaly_mit_tudunk_a_racionalis_szamokrol_kviz.pdf"
      badgeColor="cyan"
      matcherComponent={<RationalOperationsMatcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} />}
      sorterComponent={<RationalOperationsSorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} />}
      cheatSheetCards={cheatSheetCards}
    />
  );
};

export default RationalOperationsQuiz;
