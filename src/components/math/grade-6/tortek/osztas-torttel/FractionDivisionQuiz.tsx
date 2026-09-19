import React from 'react';
import { QuizTemplate, Question, CheatSheetItem, CheatSheetCard } from '../QuizTemplate';
import { FractionDivisionMatcher } from './FractionDivisionMatcher';
import { FractionDivisionSorter } from './FractionDivisionSorter';
import { Sparkles, ArrowRightLeft, Divide, Flame, Layers } from 'lucide-react';

export interface FractionDivisionQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
}

export function FractionDivisionQuiz({
  onBack,
  onSwitchToTheory
}: FractionDivisionQuizProps) {
  const questions: Question[] = [
    // -------------------------------------------------------------------------
    // 1. SZINT: ALAP OSZTÁSOK, EGÉSZ SZÁMMAL VALÓ OSZTÁS (10 kérdés)
    // -------------------------------------------------------------------------
    {
      id: 'q1',
      level: 1,
      question: 'Hogyan osztunk egy közönséges törtet egy másik törttel?',
      questionTypeBadge: 'Alapszabály',
      options: [
        'Az osztandót megszorozzuk az osztó reciprokával',
        'A számlálót a számlálóval, nevezőt nevezővel osztjuk',
        'Keresztbe szorzunk és összeadjuk a számokat',
        'Közös nevezőre hozzuk és kivonjuk a számlálókat'
      ],
      correctAnswer: 'Az osztandót megszorozzuk az osztó reciprokával',
      explanation: 'Törttel úgy osztunk, hogy az első törtet (osztandó) megszorozzuk a második tört (osztó) megfordítottjával (reciprokával).',
      steps: [
        { label: 'Képlet', value: 'a/b : c/d = a/b · d/c' },
        { label: 'Szabály', value: 'Osztandó szorozva az osztó reciprokával' }
      ],
      hint: 'A második törtet meg kell fordítani és szorozni kell vele!',
      formula: 'a/b : c/d = a/b · d/c'
    },
    {
      id: 'q2',
      level: 1,
      question: 'Mennyi az 1/2 : 1/4 osztás eredménye?',
      questionTypeBadge: 'Alaposztás',
      options: ['2', '1/8', '1/2', '4'],
      correctAnswer: '2',
      explanation: '1/2 : 1/4 = 1/2 · 4/1 = 4/2 = 2. A fél egységben pontosan 2 darab negyed van meg.',
      steps: [
        { label: 'Reciprokkal szorzás', value: '1/2 · 4/1' },
        { label: 'Szorzás elvégzése', value: '(1 · 4) / (2 · 1) = 4/2' },
        { label: 'Egész szám alak', value: '2' }
      ],
      hint: 'Szorozd meg az 1/2-et a 4/1-gyel!',
      formula: '1/2 : 1/4 = 1/2 · 4/1 = 2'
    },
    {
      id: 'q3',
      level: 1,
      question: 'Végezd el az osztást: 4/5 : 2!',
      questionTypeBadge: 'Egész számmal',
      options: ['2/5', '4/10', '8/5', '2/10'],
      correctAnswer: '2/5',
      explanation: 'Mivel a számláló (4) osztható 2-vel, elosztjuk: (4 : 2)/5 = 2/5.',
      steps: [
        { label: 'Számláló osztása 2-vel', value: '(4 : 2) / 5' },
        { label: 'Végeredmény', value: '2/5' }
      ],
      hint: 'Oszd el a felső számot (4) 2-vel!',
      formula: '(a/b) : n = (a : n) / b'
    },
    {
      id: 'q4',
      level: 1,
      question: 'Mennyi a 3/7 : 2 művelet eredménye?',
      questionTypeBadge: 'Egész számmal',
      options: ['3/14', '6/7', '3/9', '1 1/2'],
      correctAnswer: '3/14',
      explanation: 'Mivel a 3 nem osztható 2-vel, a nevezőt szorozzuk meg 2-vel: 3 / (7 · 2) = 3/14.',
      steps: [
        { label: 'Nevező szorzása', value: '3 / (7 · 2)' },
        { label: 'Végeredmény', value: '3/14' }
      ],
      hint: 'Ha a számláló nem osztható, a nevezőt szorozd meg 2-vel!',
      formula: '(a/b) : n = a / (b · n)'
    },
    {
      id: 'q5',
      level: 1,
      question: 'Mennyi a 2/3 : 1/3 hányados értéke?',
      questionTypeBadge: 'Azonos nevező',
      options: ['2', '2/9', '1/3', '3/2'],
      correctAnswer: '2',
      explanation: '2/3 : 1/3 = 2/3 · 3/1 = 6/3 = 2. Azonos nevezőjű törteknél a számlálók hányadosa: 2 : 1 = 2.',
      steps: [
        { label: 'Reciprokkal szorzás', value: '2/3 · 3/1' },
        { label: '3-asok egyszerűsítése', value: '2/1 = 2' }
      ],
      hint: 'A 2/3-ban hányszor van meg az 1/3?',
      formula: '2/3 : 1/3 = 2'
    },
    {
      id: 'q6',
      level: 1,
      question: 'Végezd el az osztást: 3/4 : 3/4!',
      questionTypeBadge: 'Önmagával osztva',
      options: ['1', '9/16', '0', '6/8'],
      correctAnswer: '1',
      explanation: 'Bármely nullától különböző szám önmagával elosztva pontosan 1-et ad: 3/4 : 3/4 = 3/4 · 4/3 = 1.',
      steps: [
        { label: 'Szabály', value: 'x : x = 1 (ha x ≠ 0)' },
        { label: 'Számítás', value: '3/4 · 4/3 = 1' }
      ],
      hint: 'Mennyit kapunk, ha egy számot elosztunk önmagával?',
      formula: '(a/b) : (a/b) = 1'
    },
    {
      id: 'q7',
      level: 1,
      question: 'Mennyi a 4 : 1/2 osztás eredménye?',
      questionTypeBadge: 'Egész osztva törttel',
      options: ['8', '2', '1/8', '4/2'],
      correctAnswer: '8',
      explanation: '4 : 1/2 = 4/1 · 2/1 = 8. 4 egészben pontosan 8 darab fél van.',
      steps: [
        { label: 'Egész szám törtként', value: '4 = 4/1' },
        { label: 'Szorzás a reciprokával', value: '4/1 · 2/1 = 8' }
      ],
      hint: 'Hány fél egység fér el 4 egészben?',
      formula: 'n : (1/2) = n · 2'
    },
    {
      id: 'q8',
      level: 1,
      question: 'Mennyi az 1 : 1/5 művelet értéke?',
      questionTypeBadge: 'Egy osztva törttel',
      options: ['5', '1/5', '0', '5/5'],
      correctAnswer: '5',
      explanation: '1-et egy törttel elosztva a tört reciprokát kapjuk: 1 : 1/5 = 1 · 5/1 = 5.',
      steps: [
        { label: 'Szorzás a reciprokával', value: '1 · 5/1 = 5' }
      ],
      hint: '1 : (a/b) mindig egyenlő a reciprokával (b/a)!',
      formula: '1 : (1/n) = n'
    },
    {
      id: 'q9',
      level: 1,
      question: 'Mennyi a 6/7 : 3 osztás eredménye?',
      questionTypeBadge: 'Egész számmal',
      options: ['2/7', '6/21', '18/7', '2/21'],
      correctAnswer: '2/7',
      explanation: 'A 6 osztható 3-mal, így: (6 : 3)/7 = 2/7.',
      steps: [
        { label: 'Számláló osztása 3-mal', value: '(6 : 3) / 7' },
        { label: 'Végeredmény', value: '2/7' }
      ],
      hint: 'Oszd el a 6-ot 3-mal a számlálóban!',
      formula: '(6/7) : 3 = 2/7'
    },
    {
      id: 'q10',
      level: 1,
      question: 'Végezd el a műveletet: 1/3 : 1/2!',
      questionTypeBadge: 'Alaposztás',
      options: ['2/3', '1/6', '3/2', '1'],
      correctAnswer: '2/3',
      explanation: '1/3 : 1/2 = 1/3 · 2/1 = 2/3.',
      steps: [
        { label: 'Reciprokkal szorzás', value: '1/3 · 2/1' },
        { label: 'Számlálók és nevezők szorzata', value: '(1 · 2) / (3 · 1) = 2/3' }
      ],
      hint: 'Fordítsd meg a második törtet: 1/3 · 2/1!',
      formula: '1/3 : 1/2 = 2/3'
    },

    // -------------------------------------------------------------------------
    // 2. SZINT: KERESZTBE EGYSZERŰSÍTÉS ÉS TÖRT OSZTÁSA TÖRTTEL (10 kérdés)
    // -------------------------------------------------------------------------
    {
      id: 'q11',
      level: 2,
      question: 'Végezd el az osztást keresztbe egyszerűsítéssel: 3/4 : 9/8!',
      questionTypeBadge: 'Keresztbe egyszerűsítés',
      options: ['2/3', '27/32', '3/8', '1/2'],
      correctAnswer: '2/3',
      explanation: '3/4 : 9/8 = 3/4 · 8/9. A 3 és 9 egyszerűsödik 3-mal (1 és 3); a 8 és 4 egyszerűsödik 4-gyel (2 és 1): (1 · 2)/(1 · 3) = 2/3.',
      steps: [
        { label: 'Szorzássá alakítás', value: '3/4 · 8/9' },
        { label: 'Egyszerűsítés', value: '3 és 9 ⟹ 1 és 3; 8 és 4 ⟹ 2 és 1' },
        { label: 'Végeredmény', value: '(1 · 2) / (1 · 3) = 2/3' }
      ],
      hint: 'Írd át szorzássá (3/4 · 8/9), majd egyszerűsíts 3-mal és 4-gyel!',
      formula: '(3/4) : (9/8) = (3/4) · (8/9) = 2/3'
    },
    {
      id: 'q12',
      level: 2,
      question: 'Mennyi az 5/6 : 10/3 művelet legegyszerűbb alakja?',
      questionTypeBadge: 'Keresztbe egyszerűsítés',
      options: ['1/4', '50/18', '1/2', '2/3'],
      correctAnswer: '1/4',
      explanation: '5/6 : 10/3 = 5/6 · 3/10 = (1 · 1)/(2 · 2) = 1/4.',
      steps: [
        { label: 'Reciprokkal szorzás', value: '5/6 · 3/10' },
        { label: 'Egyszerűsítés', value: '5 és 10 ⟹ 1 és 2; 3 és 6 ⟹ 1 és 2' },
        { label: 'Hányados', value: '1/4' }
      ],
      hint: '5/6 · 3/10 ⟹ egyszerűsíts 5-tel és 3-mal!',
      formula: '(5/6) : (10/3) = 1/4'
    },
    {
      id: 'q13',
      level: 2,
      question: 'Mennyi a 7/10 : 14/5 osztás eredménye?',
      questionTypeBadge: 'Keresztbe egyszerűsítés',
      options: ['1/4', '98/50', '1/2', '2/5'],
      correctAnswer: '1/4',
      explanation: '7/10 : 14/5 = 7/10 · 5/14 = (1 · 1)/(2 · 2) = 1/4.',
      steps: [
        { label: 'Szorzássá alakítás', value: '7/10 · 5/14' },
        { label: 'Egyszerűsítés', value: '7 és 14 ⟹ 1 és 2; 5 és 10 ⟹ 1 és 2' },
        { label: 'Végeredmény', value: '1/4' }
      ],
      hint: 'Egyszerűsíts 7-tel és 5-tel!',
      formula: '(7/10) : (14/5) = 1/4'
    },
    {
      id: 'q14',
      level: 2,
      question: 'Végezd el az osztást: 2/3 : 4/9!',
      questionTypeBadge: 'Keresztbe egyszerűsítés',
      options: ['1 1/2 (= 3/2)', '8/27', '2/3', '3/4'],
      correctAnswer: '1 1/2 (= 3/2)',
      explanation: '2/3 : 4/9 = 2/3 · 9/4 = (1 · 3)/(1 · 2) = 3/2 = 1 1/2.',
      steps: [
        { label: 'Szorzássá alakítás', value: '2/3 · 9/4' },
        { label: 'Egyszerűsítés', value: '2 és 4 ⟹ 1 és 2; 9 és 3 ⟹ 3 és 1' },
        { label: 'Eredmény', value: '3/2 = 1 1/2' }
      ],
      hint: '2/3 · 9/4 ⟹ egyszerűsíts 2-vel és 3-mal!',
      formula: '(2/3) : (4/9) = 3/2 = 1 1/2'
    },
    {
      id: 'q15',
      level: 2,
      question: 'Melyik számmal kell elosztani a 3/5-öt, hogy hányadosul pontosan 1-et kapjunk?',
      questionTypeBadge: 'Egyenlet',
      options: ['3/5', '5/3', '1', '0'],
      correctAnswer: '3/5',
      explanation: 'Egy nem nulla számot önmagával kell elosztani, hogy 1-et kapjunk: 3/5 : 3/5 = 1.',
      steps: [
        { label: 'Egyenlet', value: '3/5 : x = 1' },
        { label: 'x értéke', value: 'x = 3/5' }
      ],
      hint: 'Bármely szám önmagával osztva ad 1-et!',
      formula: 'x : x = 1'
    },
    {
      id: 'q16',
      level: 2,
      question: 'Számítsd ki: 4/5 : 8/15!',
      questionTypeBadge: 'Keresztbe egyszerűsítés',
      options: ['1 1/2 (= 3/2)', '32/75', '2/3', '1 1/3'],
      correctAnswer: '1 1/2 (= 3/2)',
      explanation: '4/5 : 8/15 = 4/5 · 15/8 = (1 · 3)/(1 · 2) = 3/2 = 1 1/2.',
      steps: [
        { label: 'Szorzás a reciprokával', value: '4/5 · 15/8' },
        { label: 'Egyszerűsítés', value: '4 és 8 ⟹ 1 és 2; 15 és 5 ⟹ 3 és 1' },
        { label: 'Eredmény', value: '3/2 = 1 1/2' }
      ],
      hint: 'Egyszerűsíts 4-gyel és 5-tel!',
      formula: '(4/5) : (8/15) = 3/2 = 1 1/2'
    },
    {
      id: 'q17',
      level: 2,
      question: 'Mennyi a 3/8 : 9/16 osztás értéke?',
      questionTypeBadge: 'Keresztbe egyszerűsítés',
      options: ['2/3', '27/128', '3/4', '1/2'],
      correctAnswer: '2/3',
      explanation: '3/8 : 9/16 = 3/8 · 16/9 = (1 · 2)/(1 · 3) = 2/3.',
      steps: [
        { label: 'Reciprokkal szorzás', value: '3/8 · 16/9' },
        { label: 'Egyszerűsítés', value: '3 és 9 ⟹ 1 és 3; 16 és 8 ⟹ 2 és 1' },
        { label: 'Végeredmény', value: '2/3' }
      ],
      hint: '3/8 · 16/9 ⟹ 16/8 = 2 és 3/9 = 1/3!',
      formula: '(3/8) : (9/16) = 2/3'
    },
    {
      id: 'q18',
      level: 2,
      question: 'Egy téglalap területe 3/4 m², egyik oldala 9/8 m. Milyen hosszú a másik oldala?',
      questionTypeBadge: 'Geometria',
      options: ['2/3 m', '27/32 m', '3/8 m', '1 1/2 m'],
      correctAnswer: '2/3 m',
      explanation: 'A hiányzó oldal b = T : a = 3/4 : 9/8 = 3/4 · 8/9 = 2/3 m.',
      steps: [
        { label: 'Képlet', value: 'b = T : a' },
        { label: 'Behelyettesítés', value: 'b = 3/4 : 9/8 = 3/4 · 8/9' },
        { label: 'Keresztbe egyszerűsítés', value: 'b = (1 · 2) / (1 · 3) = 2/3 m' }
      ],
      hint: 'Oszd el a területet az ismert oldallal: b = T : a!',
      formula: 'b = (3/4) : (9/8) = 2/3 m'
    },
    {
      id: 'q19',
      level: 2,
      question: 'Mennyi a 6/7 : 2/7 művelet eredménye?',
      questionTypeBadge: 'Azonos nevező',
      options: ['3', '12/49', '4/7', '1/3'],
      correctAnswer: '3',
      explanation: '6/7 : 2/7 = 6/7 · 7/2 = 6/2 = 3. Azonos nevező esetén a számlálókat osztjuk: 6 : 2 = 3.',
      steps: [
        { label: 'Reciprokkal szorzás', value: '6/7 · 7/2' },
        { label: '7-esek egyszerűsítése', value: '6/2 = 3' }
      ],
      hint: 'A 7-esek azonnal kiesnek: 6 : 2 = 3!',
      formula: '(6/7) : (2/7) = 3'
    },
    {
      id: 'q20',
      level: 2,
      question: 'Melyik állítás HAMIS a törtosztásra vonatkozóan?',
      questionTypeBadge: 'Elmélet',
      options: [
        'A törtosztásnál a tagok tetszőlegesen felcserélhetők (kommutatív)',
        'Törttel úgy osztunk, hogy az osztandót megszorozzuk az osztó reciprokával',
        'Nullával tilos osztani',
        'Egy valódi törtet 1-nél kisebb pozitív törttel osztva az eredmény nagyobb lesz az eredeti törtnél'
      ],
      correctAnswer: 'A törtosztásnál a tagok tetszőlegesen felcserélhetők (kommutatív)',
      explanation: 'Az osztás NEM felcserélhető! Például: 1/2 : 1/4 = 2, viszont 1/4 : 1/2 = 1/2.',
      steps: [
        { label: 'Ellenőrzés', value: '1/2 : 1/4 = 2' },
        { label: 'Megfordítva', value: '1/4 : 1/2 = 1/2 ≠ 2' },
        { label: 'Következtetés', value: 'Az osztás nem kommutatív' }
      ],
      hint: 'Vajon 1/2 : 1/4 ugyanannyi, mint 1/4 : 1/2?',
      formula: 'a : b ≠ b : a'
    },

    // -------------------------------------------------------------------------
    // 3. SZINT: VEGYES TÖRTEK, TÖBBMŰVELETES ÉS SZÖVEGES FELADATOK (10 kérdés)
    // -------------------------------------------------------------------------
    {
      id: 'q21',
      level: 3,
      question: 'Mennyi a 2 1/2 : 1 1/4 osztás értéke?',
      questionTypeBadge: 'Vegyes tört osztás',
      options: ['2', '1 1/2', '3 1/8', '1'],
      correctAnswer: '2',
      explanation: 'Áltörtté alakítva: 2 1/2 = 5/2 és 1 1/4 = 5/4. 5/2 : 5/4 = 5/2 · 4/5 = 4/2 = 2.',
      steps: [
        { label: 'Áltörtté alakítás', value: '2 1/2 = 5/2 és 1 1/4 = 5/4' },
        { label: 'Reciprokkal szorzás', value: '5/2 · 4/5' },
        { label: 'Egyszerűsítés', value: '5 és 5 ⟹ 1; 4/2 = 2' }
      ],
      hint: 'Alakítsd őket 5/2-vé és 5/4-té, majd szorozz a 4/5-tel!',
      formula: '(5/2) : (5/4) = (5/2) · (4/5) = 2'
    },
    {
      id: 'q22',
      level: 3,
      question: 'Számítsd ki: 3 1/3 : 5!',
      questionTypeBadge: 'Vegyes tört osztva egésszel',
      options: ['2/3', '16 2/3', '5/3', '1 1/3'],
      correctAnswer: '2/3',
      explanation: '3 1/3 = 10/3. 10/3 : 5 = (10 : 5)/3 = 2/3 (vagy 10/3 · 1/5 = 2/3).',
      steps: [
        { label: 'Áltört alak', value: '3 1/3 = 10/3' },
        { label: 'Számláló osztása 5-tel', value: '(10 : 5) / 3 = 2/3' }
      ],
      hint: '3 1/3 = 10/3, majd oszd a 10-et 5-tel!',
      formula: '(10/3) : 5 = 2/3'
    },
    {
      id: 'q23',
      level: 3,
      question: 'Mennyi az 1 1/2 : 3/4 osztás eredménye?',
      questionTypeBadge: 'Vegyes tört osztás',
      options: ['2', '9/8', '1/2', '1 1/4'],
      correctAnswer: '2',
      explanation: '1 1/2 = 3/2. 3/2 : 3/4 = 3/2 · 4/3 = (1 · 2)/(1 · 1) = 2.',
      steps: [
        { label: 'Áltört', value: '1 1/2 = 3/2' },
        { label: 'Szorzás 4/3-mal', value: '3/2 · 4/3' },
        { label: 'Egyszerűsítés', value: '3 és 3 ⟹ 1; 4/2 = 2' }
      ],
      hint: '3/2 · 4/3 ⟹ 3-asok kiesnek, 4/2 = 2!',
      formula: '(3/2) : (3/4) = 2'
    },
    {
      id: 'q24',
      level: 3,
      question: 'Végezd el a műveletet: 2 1/4 : 3/8!',
      questionTypeBadge: 'Vegyes tört osztás',
      options: ['6', '27/32', '3', '4 1/2'],
      correctAnswer: '6',
      explanation: '2 1/4 = 9/4. 9/4 : 3/8 = 9/4 · 8/3 = (3 · 2)/(1 · 1) = 6.',
      steps: [
        { label: 'Áltört', value: '2 1/4 = 9/4' },
        { label: 'Szorzás 8/3-mal', value: '9/4 · 8/3' },
        { label: 'Keresztbe egyszerűsítés', value: '9 és 3 ⟹ 3 és 1; 8 és 4 ⟹ 2 és 1' },
        { label: 'Végeredmény', value: '3 · 2 = 6' }
      ],
      hint: '9/4 · 8/3 ⟹ 9/3 = 3 és 8/4 = 2!',
      formula: '(9/4) : (3/8) = 6'
    },
    {
      id: 'q25',
      level: 3,
      question: 'Egy kancsóban 1 1/2 liter narancslé van. Hány darab 1/4 literes poharat tudunk teljesen megtölteni belőle?',
      questionTypeBadge: 'Szöveges feladat',
      options: ['6 pohár', '4 pohár', '8 pohár', '5 pohár'],
      correctAnswer: '6 pohár',
      explanation: '1 1/2 : 1/4 = 3/2 : 1/4 = 3/2 · 4/1 = 6 pohár.',
      steps: [
        { label: 'Adatok', value: 'Összesen: 1 1/2 l = 3/2 l, Pohár: 1/4 l' },
        { label: 'Művelet', value: '3/2 : 1/4 = 3/2 · 4/1' },
        { label: 'Eredmény', value: '6 pohár' }
      ],
      hint: 'Oszd el a teljes mennyiséget egy pohár űrtartalmával: 3/2 : 1/4!',
      formula: '(3/2) : (1/4) = 6'
    },
    {
      id: 'q26',
      level: 3,
      question: 'Egy szabó 4 1/2 méter szalagból 3/4 méteres darabokat vág le. Hány darab szalagot kap?',
      questionTypeBadge: 'Szöveges feladat',
      options: ['6 darab', '5 darab', '7 darab', '4 darab'],
      correctAnswer: '6 darab',
      explanation: '4 1/2 : 3/4 = 9/2 : 3/4 = 9/2 · 4/3 = (3 · 2)/(1 · 1) = 6 darab.',
      steps: [
        { label: 'Áltört', value: '4 1/2 = 9/2 m' },
        { label: 'Osztás', value: '9/2 : 3/4 = 9/2 · 4/3' },
        { label: 'Egyszerűsítés', value: '(3 · 2) / 1 = 6 darab' }
      ],
      hint: '9/2 : 3/4 = 9/2 · 4/3!',
      formula: '(9/2) : (3/4) = 6'
    },
    {
      id: 'q27',
      level: 3,
      question: 'Mennyi az (1/2 + 1/4) : 3/8 kifejezés pontos értéke?',
      questionTypeBadge: 'Műveleti sorrend',
      options: ['2', '3/4', '1/2', '9/32'],
      correctAnswer: '2',
      explanation: 'A zárójelben: 1/2 + 1/4 = 2/4 + 1/4 = 3/4. Majd: 3/4 : 3/8 = 3/4 · 8/3 = 2.',
      steps: [
        { label: 'Zárójel kiszámítása', value: '1/2 + 1/4 = 3/4' },
        { label: 'Osztás', value: '3/4 : 3/8 = 3/4 · 8/3' },
        { label: 'Eredmény', value: '2' }
      ],
      hint: 'Először végezd el a zárójeles összeadást (3/4), majd oszd el 3/8-dal!',
      formula: '(3/4) : (3/8) = 2'
    },
    {
      id: 'q28',
      level: 3,
      question: 'Számítsd ki a láncműveletet balról jobbra: 2/3 : 4/9 : 3/2!',
      questionTypeBadge: 'Láncművelet',
      options: ['1', '9/4', '2/3', '4/9'],
      correctAnswer: '1',
      explanation: 'Első osztás: 2/3 : 4/9 = 2/3 · 9/4 = 3/2. Második osztás: 3/2 : 3/2 = 1.',
      steps: [
        { label: '1. Művelet', value: '2/3 : 4/9 = 2/3 · 9/4 = 3/2' },
        { label: '2. Művelet', value: '3/2 : 3/2 = 1' }
      ],
      hint: 'Végezd el az első osztást (3/2 jön ki), majd azt oszd el 3/2-del!',
      formula: '(2/3 : 4/9) : 3/2 = (3/2) : (3/2) = 1'
    },
    {
      id: 'q29',
      level: 3,
      question: 'Mennyi a 2 2/3 : 1 1/3 osztás eredménye?',
      questionTypeBadge: 'Vegyes tört osztás',
      options: ['2', '1', '1 1/2', '3 5/9'],
      correctAnswer: '2',
      explanation: '2 2/3 = 8/3 és 1 1/3 = 4/3. 8/3 : 4/3 = 8/3 · 3/4 = 8/4 = 2.',
      steps: [
        { label: 'Áltörtek', value: '2 2/3 = 8/3 és 1 1/3 = 4/3' },
        { label: 'Reciprokkal szorzás', value: '8/3 · 3/4' },
        { label: 'Végeredmény', value: '8/4 = 2' }
      ],
      hint: '8/3 : 4/3 ⟹ azonos nevező esetén 8 : 4 = 2!',
      formula: '(8/3) : (4/3) = 2'
    },
    {
      id: 'q30',
      level: 3,
      question: 'Ha egy ismeretlen x számra igaz, hogy x : 2/3 = 3/4, akkor mennyi az x értéke?',
      questionTypeBadge: 'Egyenlet',
      options: ['1/2', '9/8', '2/3', '1/4'],
      correctAnswer: '1/2',
      explanation: 'Az osztandó meghatározásához megszorozzuk a hányadost az osztóval: x = 3/4 · 2/3 = (1 · 1)/(2 · 1) = 1/2. Ellenőrzés: 1/2 : 2/3 = 1/2 · 3/2 = 3/4.',
      steps: [
        { label: 'Egyenlet átrendezése', value: 'x = 3/4 · 2/3' },
        { label: 'Keresztbe egyszerűsítés', value: '3 és 3 ⟹ 1; 2 és 4 ⟹ 1 és 2' },
        { label: 'x értéke', value: '1/2' }
      ],
      hint: 'Szorozd össze a hányadost és az osztót: x = 3/4 · 2/3!',
      formula: 'x = (3/4) · (2/3) = 1/2'
    }
  ];

  const cheatSheetItems: CheatSheetItem[] = [
    {
      topic: 'Tört osztása egész számmal',
      formula: '(a/b) : n = (a : n) / b  vagy  a / (b · n)',
      note: 'Ha a számláló osztható, elosztjuk; ha nem, a nevezőt szorozzuk a számmal.'
    },
    {
      topic: 'Tört osztása törttel',
      formula: '(a/b) : (c/d) = (a/b) · (d/c) = (a · d) / (b · c)',
      note: 'Az osztandót megszorozzuk az osztó reciprokával (a második törtet megfordítjuk).'
    },
    {
      topic: 'Egész szám osztása törttel',
      formula: 'n : (a/b) = (n/1) · (b/a) = (n · b) / a',
      note: 'Az egész számot törtként írjuk fel, majd megszorozzuk a tört reciprokával.'
    },
    {
      topic: 'Vegyes törtek osztása',
      formula: '2 1/2 : 1 1/4 = 5/2 : 5/4 = 5/2 · 4/5 = 2',
      note: 'Mindig alakítsd át áltörtté a vegyes számokat az osztás átírása előtt!'
    }
  ];

  const cheatSheetCards: CheatSheetCard[] = [
    {
      id: 'cs1',
      title: 'Tört Osztása Törttel',
      formula: '\\frac{a}{b} : \\frac{c}{d} = \\frac{a}{b} \\cdot \\frac{d}{c}',
      note: 'Aranyszabály: az osztásból szorzás lesz az osztó megfordításával (reciprokával)!'
    },
    {
      id: 'cs2',
      title: 'Keresztbe Egyszerűsítés',
      formula: '\\frac{a}{b} \\cdot \\frac{d}{c}',
      note: 'Keresztbe egyszerűsíteni CSAK azután szabad, miután szorzássá írtuk át a műveletet!'
    },
    {
      id: 'cs3',
      title: 'Vegyes Törtek Osztása',
      formula: 'W\\frac{a}{b} \\longrightarrow \\frac{W \\cdot b + a}{b}',
      note: 'Először mindig alakítsd áltörtté a vegyes számokat, utána fordítsd meg az osztót és szorozz!'
    }
  ];

  return (
    <QuizTemplate
      title="Osztás törttel"
      subtitle="30 feladat: Tört osztása egész számmal és törttel, reciprokkal való szorzás, keresztbe egyszerűsítés és vegyes törtek osztása."
      emoji="➗"
      badgeText="➗ 6. Osztály • II. Törtek"
      grade={6}
      chapterId="g6-fractions"
      topicId="g6-fraction-division-quiz"
      questions={questions}
      cheatSheet={cheatSheetItems}
      cheatSheetCards={cheatSheetCards}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      matcherComponent={<FractionDivisionMatcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} />}
      sorterComponent={<FractionDivisionSorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} />}
    />
  );
}

export default FractionDivisionQuiz;
