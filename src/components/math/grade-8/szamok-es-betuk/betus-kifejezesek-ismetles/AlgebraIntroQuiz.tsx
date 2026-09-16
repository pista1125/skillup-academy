import React from 'react';
import { QuizTemplate, Question, CheatSheetCard } from '../QuizTemplate';
import { AlgebraIntroMatcher } from './AlgebraIntroMatcher';
import { AlgebraIntroSorter } from './AlgebraIntroSorter';
import { Variable, ShieldAlert, Sparkles, Binary } from 'lucide-react';

interface AlgebraIntroQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    id: 'c1',
    title: 'Egynemű Kifejezések és Összevonás',
    icon: <Variable className="w-4 h-4 text-blue-600" />,
    formula: 'a · xⁿ + b · xⁿ = (a + b) · xⁿ',
    note: 'Csak azonos változójú és hatványkitevőjű tagok vonhatók össze! Pl. 3x² + 5x² = 8x², de 2x² + 3x nem vonható össze.'
  },
  {
    id: 'c2',
    title: 'Zárójelfelbontás és Előjelek',
    icon: <Sparkles className="w-4 h-4 text-amber-600" />,
    formula: '-(a - b) = -a + b  |  k · (a + b) = k·a + k·b',
    note: 'A zárójel előtti mínuszjel minden belső tag előjelét az ellentétesére változtatja: -(3x - 5) = -3x + 5.'
  },
  {
    id: 'c3',
    title: 'Helyettesítési Érték Szabálya',
    icon: <Binary className="w-4 h-4 text-emerald-600" />,
    formula: 'x = -3 ⟹ x² = 9, de -x² = -9',
    note: 'Negatív szám behelyettesítésekor mindig tegyük zárójelbe az alapokat: (-3)² = +9!'
  },
  {
    id: 'c4',
    title: 'Algebrai Törtek & Értelmezési Tartomány',
    icon: <ShieldAlert className="w-4 h-4 text-purple-600" />,
    formula: '(a + b) / c = a/c + b/c  (c ≠ 0)',
    note: 'Nullával való osztás nem értelmezhető, a tört nevezője sosem lehet 0! Pl. 5/(x - 3) esetén x ≠ 3.'
  }
];

const questions: Question[] = [
  // =========================================================================
  // --- 1. SZINT: ALAPFOGALMAK, EGYÜTTHATÓK ÉS EGYSZERŰ ÖSSZEVONÁS (1-10) ---
  // =========================================================================
  {
    id: 'q1-1',
    level: 1,
    question: 'Mi a -7x³ algebrai kifejezés együtthatója?',
    options: [
      '-7',
      '7',
      '3',
      'x³'
    ],
    correctAnswer: '-7',
    explanation: 'Az együttható a változók (betűs rész) előtt álló szorzótényező az előjelével együtt: -7.',
    hint: 'Keresd a betűk előtt álló előjeles számot!',
    breakdown: [
      { label: 'Kifejezés', value: '-7 · x³' },
      { label: 'Együttható', value: '-7' },
      { label: 'Változós rész', value: 'x³' }
    ]
  },
  {
    id: 'q1-2',
    level: 1,
    question: 'Melyik kifejezés egynemű a 4ab² kifejezéssel?',
    options: [
      '-0.5ab²',
      '4a²b',
      '4ab',
      '4a²b²'
    ],
    correctAnswer: '-0.5ab²',
    explanation: 'Két kifejezés egynemű, ha a változóik és azok hatványkitevői pontosan megegyeznek (itt: a¹ · b²). Az együttható lehet bármilyen nemnulla szám.',
    hint: 'A betűs résznek pontosan a · b² alakúnak kell lennie!',
    breakdown: [
      { label: 'Keresett betűs rész', value: 'a · b²' },
      { label: 'Megfelelő tag', value: '-0.5 · (ab²)' }
    ]
  },
  {
    id: 'q1-3',
    level: 1,
    question: 'Végezd el az összevonást: 5x - 9x + 2x = ?',
    options: [
      '-2x',
      '2x',
      '-6x',
      '-2x³'
    ],
    correctAnswer: '-2x',
    explanation: 'Az egynemű tagok együtthatóit összeadjuk: 5 - 9 + 2 = -2, így az eredmény -2x.',
    hint: 'Számold ki az együtthatók összegét: 5 - 9 = -4, és -4 + 2 = -2.',
    breakdown: [
      { label: 'Együtthatók', value: '(5 - 9 + 2) · x' },
      { label: 'Eredmény', value: '-2x' }
    ]
  },
  {
    id: 'q1-4',
    level: 1,
    question: 'Végezd el az összevonást: 3a + 7b - 5a + 2b = ?',
    options: [
      '-2a + 9b',
      '2a + 9b',
      '-2a + 5b',
      '7ab'
    ],
    correctAnswer: '-2a + 9b',
    explanation: 'Csak az azonos betűs tagokat vonhatjuk össze: (3a - 5a) + (7b + 2b) = -2a + 9b.',
    hint: 'Csoportosítsd külön az \'a\' betűs és külön a \'b\' betűs tagokat!',
    breakdown: [
      { label: '\'a\' tagok', value: '3a - 5a = -2a' },
      { label: '\'b\' tagok', value: '7b + 2b = +9b' },
      { label: 'Összesítve', value: '-2a + 9b' }
    ]
  },
  {
    id: 'q1-5',
    level: 1,
    question: 'Mennyi a 3x - 5 kifejezés helyettesítési értéke, ha x = 4?',
    options: [
      '7',
      '12',
      '-7',
      '17'
    ],
    correctAnswer: '7',
    explanation: 'Behelyettesítjük x helyére a 4-et: 3 · 4 - 5 = 12 - 5 = 7.',
    hint: '3 · 4 = 12, ebből vond ki az 5-öt.',
    breakdown: [
      { label: 'Behelyettesítés', value: '3 · (4) - 5' },
      { label: 'Szorzás', value: '12 - 5' },
      { label: 'Eredmény', value: '7' }
    ]
  },
  {
    id: 'q1-6',
    level: 1,
    question: 'Mi a -x algebrai tag együtthatója?',
    options: [
      '-1',
      '0',
      '1',
      '-x'
    ],
    correctAnswer: '-1',
    explanation: 'Ha egy betű előtt csak egy mínuszjel áll, az a -1-gyel való szorzást jelenti: -x = -1 · x.',
    hint: 'Ha a szám nincs kiírva, az 1 vagy -1.',
    breakdown: [
      { label: 'Kifejezés', value: '-x = -1 · x' },
      { label: 'Együttható', value: '-1' }
    ]
  },
  {
    id: 'q1-7',
    level: 1,
    question: 'Végezd el az összevonást: 4x² + 3x - 2x² + 5x = ?',
    options: [
      '2x² + 8x',
      '10x³',
      '2x² + 2x',
      '10x²'
    ],
    correctAnswer: '2x² + 8x',
    explanation: 'Külön vonjuk össze az x²-es és az x-es tagokat: (4x² - 2x²) + (3x + 5x) = 2x² + 8x.',
    hint: 'Az x² és az x nem vonható össze, külön csoportot alkotnak!',
    breakdown: [
      { label: 'x²-es tagok', value: '4x² - 2x² = 2x²' },
      { label: 'x-es tagok', value: '3x + 5x = 8x' },
      { label: 'Végeredmény', value: '2x² + 8x' }
    ]
  },
  {
    id: 'q1-8',
    level: 1,
    question: 'Bontsd fel a zárójelet: 3(2a - 4) = ?',
    options: [
      '6a - 12',
      '6a - 4',
      '5a - 7',
      '6a + 12'
    ],
    correctAnswer: '6a - 12',
    explanation: 'A zárójelen kívüli 3-mal a zárójel minden tagját meg kell szorozni: 3 · 2a - 3 · 4 = 6a - 12.',
    hint: '3 · 2a = 6a és 3 · (-4) = -12.',
    breakdown: [
      { label: '1. tag szorzása', value: '3 · 2a = 6a' },
      { label: '2. tag szorzása', value: '3 · (-4) = -12' },
      { label: 'Eredmény', value: '6a - 12' }
    ]
  },
  {
    id: 'q1-9',
    level: 1,
    question: 'Bontsd fel a zárójelet a zárójel előtti mínuszjel szabályával: -(4x - 7) = ?',
    options: [
      '-4x + 7',
      '-4x - 7',
      '4x + 7',
      '4x - 7'
    ],
    correctAnswer: '-4x + 7',
    explanation: 'A zárójel előtti mínuszjel hatására a belső tagok előjele az ellentétesére változik: +4x-ből -4x, -7-ből +7 lesz.',
    hint: 'Mínusz szorozva mínusszal plusz!',
    breakdown: [
      { label: 'Eredeti tagok', value: '+4x és -7' },
      { label: 'Előjelváltás', value: '-4x és +7' },
      { label: 'Eredmény', value: '-4x + 7' }
    ]
  },
  {
    id: 'q1-10',
    level: 1,
    question: 'Mi a 2x² - 5x + 8 többtagú kifejezés konstans (szabad) tagja?',
    options: [
      '+8',
      '-5',
      '2',
      '8x'
    ],
    correctAnswer: '+8',
    explanation: 'A konstans (szabad) tag az a tag, amely nem tartalmaz változót, azaz csupán egy önálló szám: +8.',
    hint: 'Keresd azt a tagot, amely mellett nincs \'x\' betű!',
    breakdown: [
      { label: 'Másodfokú tag', value: '2x²' },
      { label: 'Elsőfokú tag', value: '-5x' },
      { label: 'Konstans tag', value: '+8' }
    ]
  },

  // =========================================================================
  // --- 2. SZINT: HELYETTESÍTÉS NEGATÍVOKKAL, ZÁRÓJELEK ÉS ELŐJELEK (11-20) -
  // =========================================================================
  {
    id: 'q2-1',
    level: 2,
    question: 'Mennyi az x² - 4x kifejezés helyettesítési értéke, ha x = -3?',
    options: [
      '21',
      '-3',
      '-21',
      '3'
    ],
    correctAnswer: '21',
    explanation: '(-3)² - 4 · (-3) = 9 - (-12) = 9 + 12 = 21.',
    hint: '(-3)² = +9, és -4 · (-3) = +12.',
    breakdown: [
      { label: 'Négyzetre emelés', value: '(-3)² = 9' },
      { label: 'Szorzás', value: '-4 · (-3) = +12' },
      { label: 'Összeg', value: '9 + 12 = 21' }
    ]
  },
  {
    id: 'q2-2',
    level: 2,
    question: 'Mennyi a 2a - 3b kifejezés értéke, ha a = -2 és b = 5?',
    options: [
      '-19',
      '-11',
      '11',
      '19'
    ],
    correctAnswer: '-19',
    explanation: '2 · (-2) - 3 · 5 = -4 - 15 = -19.',
    hint: '2 · (-2) = -4, ebből vonj ki 15-öt.',
    breakdown: [
      { label: '1. szorzat', value: '2 · (-2) = -4' },
      { label: '2. szorzat', value: '3 · 5 = 15' },
      { label: 'Különbség', value: '-4 - 15 = -19' }
    ]
  },
  {
    id: 'q2-3',
    level: 2,
    question: 'Bontsd fel a zárójelet: -2(3x - 5) = ?',
    options: [
      '-6x + 10',
      '-6x - 10',
      '-6x - 5',
      '6x - 10'
    ],
    correctAnswer: '-6x + 10',
    explanation: '-2 · (3x) + (-2) · (-5) = -6x + 10.',
    hint: 'Figyelj a negatív számmal való szorzás előjeleire: (-2) · (-5) = +10.',
    breakdown: [
      { label: '-2 · 3x', value: '-6x' },
      { label: '-2 · (-5)', value: '+10' },
      { label: 'Eredmény', value: '-6x + 10' }
    ]
  },
  {
    id: 'q2-4',
    level: 2,
    question: 'Egyszerűsítsd a kifejezést: 5x - (3x - 4) + 2 = ?',
    options: [
      '2x + 6',
      '2x - 2',
      '8x + 6',
      '2x - 6'
    ],
    correctAnswer: '2x + 6',
    explanation: '5x - 3x + 4 + 2 = (5x - 3x) + (4 + 2) = 2x + 6.',
    hint: 'A zárójel felbontásakor: -(3x - 4) = -3x + 4.',
    breakdown: [
      { label: 'Zárójelfelbontás', value: '5x - 3x + 4 + 2' },
      { label: 'Összevonás', value: '2x + 6' }
    ]
  },
  {
    id: 'q2-5',
    level: 2,
    question: 'Mennyi a (2x + 6) / (x - 1) tört helyettesítési értéke, ha x = 3?',
    options: [
      '6',
      '12',
      '3',
      '4'
    ],
    correctAnswer: '6',
    explanation: 'Számláló: 2 · 3 + 6 = 12. Nevező: 3 - 1 = 2. A tört értéke: 12 / 2 = 6.',
    hint: 'Számold ki külön a számlálót (12) és a nevezőt (2), majd oszd el őket!',
    breakdown: [
      { label: 'Számláló', value: '2 · 3 + 6 = 12' },
      { label: 'Nevező', value: '3 - 1 = 2' },
      { label: 'Hányados', value: '12 / 2 = 6' }
    ]
  },
  {
    id: 'q2-6',
    level: 2,
    question: 'Bontsd fel a zárójeleket és vonj össze: 2(x + 3) - 3(x - 2) = ?',
    options: [
      '-x + 12',
      '-x',
      '-x + 6',
      '5x + 12'
    ],
    correctAnswer: '-x + 12',
    explanation: '2x + 6 - 3x + 6 = (2x - 3x) + (6 + 6) = -x + 12.',
    hint: 'Vigyázz: -3 · (-2) = +6!',
    breakdown: [
      { label: '1. zárójel', value: '2x + 6' },
      { label: '2. zárójel', value: '-3x + 6' },
      { label: 'Összevonás', value: '(2x - 3x) + (6 + 6) = -x + 12' }
    ]
  },
  {
    id: 'q2-7',
    level: 2,
    question: 'Mennyi a -x² + 2x kifejezés helyettesítési értéke, ha x = -4?',
    options: [
      '-24',
      '8',
      '-8',
      '24'
    ],
    correctAnswer: '-24',
    explanation: '-(-4)² + 2 · (-4) = -(16) + (-8) = -16 - 8 = -24.',
    hint: 'A mínuszjel a négyzet előtt áll: -(-4)² = -(16) = -16!',
    breakdown: [
      { label: '-x²', value: '-(-4)² = -16' },
      { label: '2x', value: '2 · (-4) = -8' },
      { label: 'Összeg', value: '-16 + (-8) = -24' }
    ]
  },
  {
    id: 'q2-8',
    level: 2,
    question: 'Összevonható-e közvetlenül a 3x² és a 2x tag?',
    options: [
      'Nem, mert a hatványkitevőjük különbözik (2 vs 1)',
      'Igen, az eredmény 5x³',
      'Igen, az eredmény 5x²',
      'Csak akkor, ha x pozitív szám'
    ],
    correctAnswer: 'Nem, mert a hatványkitevőjük különbözik (2 vs 1)',
    explanation: 'Két tag csak akkor egynemű és vonható össze közvetlenül, ha a változóik és azok hatványkitevői azonosak. Az x² és az x nem egynemű.',
    hint: 'Csak az azonos kitevőjű hatványok együtthatói adhatók össze!',
    breakdown: [
      { label: '1. tag kitevője', value: '2 (x²)' },
      { label: '2. tag kitevője', value: '1 (x¹)' },
      { label: 'Következtetés', value: 'Nem egyneműek' }
    ]
  },
  {
    id: 'q2-9',
    level: 2,
    question: 'Írd fel algebrai kifejezéssel: "Egy x számnál 7-tel kisebb szám 4-szerese"!',
    options: [
      '4(x - 7)',
      '4x - 7',
      '4 - 7x',
      '(x - 4) · 7'
    ],
    correctAnswer: '4(x - 7)',
    explanation: 'A 7-tel kisebb szám: (x - 7). Ennek a négyszerese: 4 · (x - 7) = 4(x - 7).',
    hint: 'Előbb ki kell vonni a 7-et (ezért kell zárójel), majd meg kell szorozni 4-gyel!',
    breakdown: [
      { label: '7-tel kisebb szám', value: 'x - 7' },
      { label: 'Négyszerese', value: '4 · (x - 7)' }
    ]
  },
  {
    id: 'q2-10',
    level: 2,
    question: 'Melyik valós x érték esetén NEM értelmezhető az 5x / (x - 4) algebrai tört?',
    options: [
      'x = 4',
      'x = 0',
      'x = -4',
      'x = 5'
    ],
    correctAnswer: 'x = 4',
    explanation: 'A tört nevezője nem lehet 0. Ha x = 4, akkor x - 4 = 4 - 4 = 0, és nullával nem lehet osztani.',
    hint: 'Mikor lesz a nevező (x - 4) értéke 0?',
    breakdown: [
      { label: 'Kikötés', value: 'x - 4 ≠ 0' },
      { label: 'Kizárt érték', value: 'x = 4' }
    ]
  },

  // =========================================================================
  // --- 3. SZINT: ÖSSZETETT ALGEBRAI ÁTALAKÍTÁSOK, TÖRTEK ÉS SZÖVEGES (21-30) -
  // =========================================================================
  {
    id: 'q3-1',
    level: 3,
    question: 'Mennyi az a² - 2ab + b² kifejezés helyettesítési értéke, ha a = 5 és b = -3?',
    options: [
      '64',
      '4',
      '16',
      '-4'
    ],
    correctAnswer: '64',
    explanation: 'a² - 2ab + b² = (a - b)² = (5 - (-3))² = (5 + 3)² = 8² = 64. Vagy: 25 - 2·5·(-3) + 9 = 25 + 30 + 9 = 64.',
    hint: 'Használhatod az azonosságot: a² - 2ab + b² = (a - b)². (5 - (-3)) = 8!',
    breakdown: [
      { label: 'Képlet', value: '(a - b)²' },
      { label: 'Behelyettesítés', value: '(5 - (-3))² = 8²' },
      { label: 'Eredmény', value: '64' }
    ]
  },
  {
    id: 'q3-2',
    level: 3,
    question: 'Egyszerűsítsd az algebrai törtet: (8x - 12) / 4 = ?',
    options: [
      '2x - 3',
      '2x - 12',
      '8x - 3',
      '4x - 6'
    ],
    correctAnswer: '2x - 3',
    explanation: 'A számláló minden tagját elosztjuk 4-gyel: 8x / 4 - 12 / 4 = 2x - 3.',
    hint: 'Kiemelhetsz a számlálóból 4-et: 4(2x - 3) / 4 = 2x - 3.',
    breakdown: [
      { label: 'Kiemelés', value: '4(2x - 3) / 4' },
      { label: 'Egyszerűsítés', value: '2x - 3' }
    ]
  },
  {
    id: 'q3-3',
    level: 3,
    question: 'Hozd közös nevezőre és vond össze: x/2 + x/3 = ?',
    options: [
      '5x / 6',
      '2x / 5',
      'x / 6',
      '5x / 5'
    ],
    correctAnswer: '5x / 6',
    explanation: 'A közös nevező 6. x/2 = 3x/6 és x/3 = 2x/6. Összeadva: (3x + 2x) / 6 = 5x / 6.',
    hint: '2 és 3 legkisebb közös többszöröse 6. Bővítsd az első törtet 3-mal, a másodikat 2-vel!',
    breakdown: [
      { label: 'Bővítés', value: '3x/6 + 2x/6' },
      { label: 'Összeg', value: '(3x + 2x) / 6 = 5x / 6' }
    ]
  },
  {
    id: 'q3-4',
    level: 3,
    question: 'Végezd el a műveleteket és egyszerűsíts: 4(2x - 1) - 3(3x - 2) + x = ?',
    options: [
      '2',
      '0',
      '-2x + 2',
      '2x - 2'
    ],
    correctAnswer: '2',
    explanation: '8x - 4 - 9x + 6 + x = (8x - 9x + x) + (-4 + 6) = 0x + 2 = 2.',
    hint: '8x - 9x + x = 0x = 0, a konstansok összege: -4 + 6 = 2.',
    breakdown: [
      { label: 'Zárójelfelbontás', value: '8x - 4 - 9x + 6 + x' },
      { label: 'x-es tagok', value: '8x - 9x + x = 0' },
      { label: 'Számok', value: '-4 + 6 = 2' },
      { label: 'Végeredmény', value: '2' }
    ]
  },
  {
    id: 'q3-5',
    level: 3,
    question: 'Egy téglalap egyik oldala \'a\', a másik oldala 2a - 3. Mi a téglalap kerületének (K) kifejezése?',
    options: [
      '6a - 6',
      '3a - 3',
      '2a² - 3a',
      '4a - 6'
    ],
    correctAnswer: '6a - 6',
    explanation: 'A téglalap kerülete K = 2(oldal1 + oldal2) = 2(a + 2a - 3) = 2(3a - 3) = 6a - 6.',
    hint: 'K = 2(a + b). Add össze az oldalakat (a + 2a - 3 = 3a - 3), majd szorozd meg 2-vel!',
    breakdown: [
      { label: 'Oldalak összege', value: 'a + 2a - 3 = 3a - 3' },
      { label: 'Kerület', value: '2 · (3a - 3) = 6a - 6' }
    ]
  },
  {
    id: 'q3-6',
    level: 3,
    question: 'Írd fel és egyszerűsítsd három egymást követő egész szám összegét, ha a legkisebb szám \'n\'!',
    options: [
      '3n + 3',
      '3n + 1',
      'n³ + 3',
      '3n'
    ],
    correctAnswer: '3n + 3',
    explanation: 'A három egymást követő szám: n, n+1 és n+2. Összegük: n + (n + 1) + (n + 2) = 3n + 3 = 3(n + 1).',
    hint: 'A következő számok n+1 és n+2.',
    breakdown: [
      { label: 'Számok', value: 'n,  n + 1,  n + 2' },
      { label: 'Összeg', value: 'n + n + 1 + n + 2 = 3n + 3' }
    ]
  },
  {
    id: 'q3-7',
    level: 3,
    question: 'Mennyi a |2x - 5| - 3x kifejezés helyettesítési értéke, ha x = -2?',
    options: [
      '15',
      '3',
      '-3',
      '9'
    ],
    correctAnswer: '15',
    explanation: '|2 · (-2) - 5| - 3 · (-2) = |-4 - 5| - (-6) = |-9| + 6 = 9 + 6 = 15.',
    hint: 'Az abszolútérték jeleken belül: |-4 - 5| = |-9| = 9. És -3 · (-2) = +6.',
    breakdown: [
      { label: 'Abszolútérték', value: '|2(-2) - 5| = |-9| = 9' },
      { label: 'Levonás', value: '-3 · (-2) = +6' },
      { label: 'Összeg', value: '9 + 6 = 15' }
    ]
  },
  {
    id: 'q3-8',
    level: 3,
    question: 'Számítsd ki az alábbi kifejezés egyszerűsített alakját: (2x - 4)/2 - (3x - 9)/3 = ?',
    options: [
      '1',
      '-1',
      '2x - 5',
      '0'
    ],
    correctAnswer: '1',
    explanation: '(2x - 4)/2 = x - 2. (3x - 9)/3 = x - 3. Kivonás: (x - 2) - (x - 3) = x - 2 - x + 3 = 1.',
    hint: 'Egyszerűsítsd külön a két törtet tagról tagra, majd ügyelj a zárójel előtti mínuszjelre!',
    breakdown: [
      { label: '1. tört', value: '(2x - 4) / 2 = x - 2' },
      { label: '2. tört', value: '(3x - 9) / 3 = x - 3' },
      { label: 'Kivonás', value: '(x - 2) - (x - 3) = x - 2 - x + 3 = 1' }
    ]
  },
  {
    id: 'q3-9',
    level: 3,
    question: 'Egy termék eredeti ára \'p\' Ft. Az árat 20%-kal megnövelik. Melyik kifejezés adja meg az új árat?',
    options: [
      '1.2p',
      'p + 20',
      '0.2p',
      'p + 0.02'
    ],
    correctAnswer: '1.2p',
    explanation: 'A 20%-os növekedés azt jelenti, hogy az új ár az eredeti 100% + 20% = 120%-a, azaz 1.2 · p.',
    hint: 'p + 0.20 · p = (1 + 0.20) · p = 1.2p.',
    breakdown: [
      { label: 'Eredeti ár', value: '100% = 1.0p' },
      { label: 'Növekmény', value: '20% = 0.2p' },
      { label: 'Új ár', value: '1.2p' }
    ]
  },
  {
    id: 'q3-10',
    level: 3,
    question: 'Melyik kifejezés NEM egyenlő a 6x - 18 kifejezéssel az alábbiak közül?',
    options: [
      '2(3x - 6)',
      '6(x - 3)',
      '3(2x - 6)',
      '-2(-3x + 9)'
    ],
    correctAnswer: '2(3x - 6)',
    explanation: '2(3x - 6) = 6x - 12, ami nem egyenlő a 6x - 18-cal! A többi mind 6x - 18-at ad felbontás után: 6(x-3)=6x-18, 3(2x-6)=6x-18, -2(-3x+9)=6x-18.',
    hint: 'Bontsd fel mind a 4 opcióban a zárójelet: 2 · (-6) = -12, nem -18!',
    breakdown: [
      { label: 'A opció', value: '2(3x - 6) = 6x - 12 (HIBÁS)' },
      { label: 'B opció', value: '6(x - 3) = 6x - 18 (Helyes)' },
      { label: 'C opció', value: '3(2x - 6) = 6x - 18 (Helyes)' },
      { label: 'D opció', value: '-2(-3x + 9) = 6x - 18 (Helyes)' }
    ]
  }
];

export const AlgebraIntroQuiz: React.FC<AlgebraIntroQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      topicId="g8-algebra-intro"
      grade={8}
      chapterId="szamok-es-betuk"
      topicTitle="Betűs kifejezések (ismétlés)"
      emoji="🎯"
      title="9. Betűs kifejezések (ismétlés) – Kvíz"
      subtitle="30 feladat 3 nehézségi szinten: Együtthatók, egynemű tagok összevonása, helyettesítési érték negatív számokkal és zárójelfelbontás"
      questions={questions}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      documentId="grade-8-szamok-betuk-algebra-intro-quiz"
      pdfFilename="8_osztaly_betus_kifejezesek_ismetles_kviz.pdf"
      badgeColor="blue"
      matcherComponent={<AlgebraIntroMatcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} />}
      sorterComponent={<AlgebraIntroSorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} />}
      cheatSheetCards={cheatSheetCards}
    />
  );
};

export default AlgebraIntroQuiz;
