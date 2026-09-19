import React from 'react';
import { QuizTemplate, Question, CheatSheetItem, CheatSheetCard } from '../QuizTemplate';
import { FractionMultiplicationMatcher } from './FractionMultiplicationMatcher';
import { FractionMultiplicationSorter } from './FractionMultiplicationSorter';
import { Sparkles, ArrowRightLeft, Grid, Flame, Layers } from 'lucide-react';

export interface FractionMultiplicationQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
}

export function FractionMultiplicationQuiz({
  onBack,
  onSwitchToTheory
}: FractionMultiplicationQuizProps) {
  const questions: Question[] = [
    // -------------------------------------------------------------------------
    // 1. SZINT: ALAPOK, SZORZÁS EGÉSZ SZÁMMAL ÉS RECIPROK (10 kérdés)
    // -------------------------------------------------------------------------
    {
      id: 'q1',
      level: 1,
      question: 'Mennyi a 2/5 közönséges tört reciproka?',
      questionTypeBadge: 'Reciprok',
      options: ['5/2', '2/5', '-2/5', '1/5'],
      correctAnswer: '5/2',
      explanation: 'Közönséges törtnél a reciprok képzésekor egyszerűen felcseréljük a számlálót és a nevezőt: a 2/5 reciproka 5/2.',
      steps: [
        { label: 'Eredeti tört', value: '2/5' },
        { label: 'Számláló és nevező felcserélése', value: '5/2' },
        { label: 'Ellenőrzés', value: '2/5 · 5/2 = 1' }
      ],
      hint: 'Cseréld meg a felső és alsó számot!',
      formula: 'a/b reciproka: b/a'
    },
    {
      id: 'q2',
      level: 1,
      question: 'Mennyi a 6 egész szám reciproka?',
      questionTypeBadge: 'Reciprok',
      options: ['1/6', '6/1', '-6', '6/6'],
      correctAnswer: '1/6',
      explanation: 'Egy egész szám tört alakban 6/1. Ennek megfordításával kapjuk az 1/6 reciprok értéket.',
      steps: [
        { label: 'Egész szám törtként', value: '6 = 6/1' },
        { label: 'Reciprokképzés', value: '1/6' },
        { label: 'Ellenőrzés', value: '6 · 1/6 = 1' }
      ],
      hint: 'Írd fel a számot törtként (6/1), majd cseréld fel a számlálót és nevezőt!',
      formula: 'n reciproka: 1/n'
    },
    {
      id: 'q3',
      level: 1,
      question: 'Végezd el a műveletet: 3/7 · 2!',
      questionTypeBadge: 'Egész számmal',
      options: ['6/7', '6/14', '3/14', '5/7'],
      correctAnswer: '6/7',
      explanation: 'Törtet egész számmal úgy szorzunk, hogy a számlálót megszorozzuk a számmal, a nevező változatlan marad: (3 · 2)/7 = 6/7.',
      steps: [
        { label: 'Kifejezés', value: '3/7 · 2' },
        { label: 'Számláló szorzása', value: '(3 · 2) / 7' },
        { label: 'Eredmény', value: '6/7' }
      ],
      hint: 'Csak a felső számot szorozd meg!',
      formula: '(a/b) · n = (a · n) / b'
    },
    {
      id: 'q4',
      level: 1,
      question: 'Mennyi az 1/2 · 1/3 szorzat értéke?',
      questionTypeBadge: 'Alapszorzás',
      options: ['1/6', '2/5', '1/5', '2/6'],
      correctAnswer: '1/6',
      explanation: 'Törtet törttel úgy szorzunk, hogy a számlálót a számlálóval, a nevezőt a nevezővel szorozzuk össze: (1 · 1)/(2 · 3) = 1/6.',
      steps: [
        { label: 'Művelet', value: '1/2 · 1/3' },
        { label: 'Számlálók és nevezők szorzata', value: '(1 · 1) / (2 · 3)' },
        { label: 'Végeredmény', value: '1/6' }
      ],
      hint: 'Felsőt a felsővel, alsót az alsóval szorozd össze!',
      formula: '(a/b) · (c/d) = (a · c) / (b · d)'
    },
    {
      id: 'q5',
      level: 1,
      question: 'Mennyi a 0 (nulla) reciproka?',
      questionTypeBadge: 'Szabály',
      options: ['A 0-nak nincs reciproka', '0', '1', 'Végtelen'],
      correctAnswer: 'A 0-nak nincs reciproka',
      explanation: 'A 0-nak nincs reciproka, mert semmilyen számmal megszorozva nem kaphatunk 1-et, és 0-val osztani sem lehet.',
      steps: [
        { label: 'Definíció', value: 'x · (reciprok) = 1' },
        { label: 'Nullával való szorzás', value: '0 · bármi = 0 ≠ 1' },
        { label: 'Következtetés', value: 'A 0-nak nincs reciproka' }
      ],
      hint: 'Lehet-e nullával osztani vagy nullát úgy szorozni, hogy 1 jöjjön ki?',
      formula: '0-nak nincs reciproka'
    },
    {
      id: 'q6',
      level: 1,
      question: 'Végezd el a szorzást: 3/8 · 4!',
      questionTypeBadge: 'Egész számmal',
      options: ['3/2 (= 1 1/2)', '12/32', '3/32', '7/8'],
      correctAnswer: '3/2 (= 1 1/2)',
      explanation: 'Mivel a 8 osztható 4-gyel, a nevezőt osztjuk: 3 / (8 : 4) = 3/2 = 1 1/2 (vagy 12/8 = 3/2).',
      steps: [
        { label: 'Művelet', value: '3/8 · 4' },
        { label: 'Nevező osztása 4-gyel', value: '3 / (8 : 4) = 3/2' },
        { label: 'Vegyes tört alak', value: '1 1/2' }
      ],
      hint: 'Oszd el a nevezőt 4-gyel a gyorsabb számoláshoz!',
      formula: '(a/b) · n = a / (b : n)'
    },
    {
      id: 'q7',
      level: 1,
      question: 'Mennyi az 1 egész szám reciproka?',
      questionTypeBadge: 'Reciprok',
      options: ['1', '0', '-1', '1/2'],
      correctAnswer: '1',
      explanation: 'Mivel 1 · 1 = 1, az 1 reciproka önmaga, vagyis 1.',
      steps: [
        { label: 'Tört alak', value: '1 = 1/1' },
        { label: 'Megfordítás', value: '1/1 = 1' },
        { label: 'Ellenőrzés', value: '1 · 1 = 1' }
      ],
      hint: 'Mivel szorozva lesz 1 az 1?',
      formula: '1 reciproka = 1'
    },
    {
      id: 'q8',
      level: 1,
      question: 'Mennyi a 2/3 · 3/2 szorzat értéke?',
      questionTypeBadge: 'Reciprok',
      options: ['1', '6/5', '4/9', '0'],
      correctAnswer: '1',
      explanation: 'Mivel a 2/3 és a 3/2 egymás reciprokai, a szorzatuk pontosan 1: (2 · 3)/(3 · 2) = 6/6 = 1.',
      steps: [
        { label: 'Szorzás', value: '(2 · 3) / (3 · 2)' },
        { label: 'Kiszámolva', value: '6/6' },
        { label: 'Egyszerűsítve', value: '1' }
      ],
      hint: 'Egymás megfordítottjai (reciprokai)!',
      formula: '(a/b) · (b/a) = 1'
    },
    {
      id: 'q9',
      level: 1,
      question: 'Mennyi a 2/3 · 1/4 szorzat legegyszerűbb alakja?',
      questionTypeBadge: 'Alapszorzás',
      options: ['1/6', '2/12', '3/7', '1/12'],
      correctAnswer: '1/6',
      explanation: '(2 · 1)/(3 · 4) = 2/12. Ezt 2-vel egyszerűsítve 1/6-ot kapunk.',
      steps: [
        { label: 'Számlálók és nevezők szorzása', value: '(2 · 1) / (3 · 4) = 2/12' },
        { label: 'Egyszerűsítés 2-vel', value: '(2 : 2) / (12 : 2) = 1/6' }
      ],
      hint: 'Szorozd össze, majd egyszerűsíts 2-vel!',
      formula: '2/12 = 1/6'
    },
    {
      id: 'q10',
      level: 1,
      question: 'Ha egy tört 1-nél kisebb pozitív szám, akkor a reciproka biztosan:',
      questionTypeBadge: 'Tulajdonság',
      options: ['1-nél nagyobb', '1-nél kisebb', 'Pontosan 1', 'Negatív szám'],
      correctAnswer: '1-nél nagyobb',
      explanation: 'Ha a számláló kisebb a nevezőnél (pl. 1/4), a megfordításakor a számláló lesz nagyobb (4/1 = 4), ami 1-nél nagyobb.',
      steps: [
        { label: 'Példa tört', value: '1/4 < 1' },
        { label: 'Reciproka', value: '4/1 = 4 > 1' },
        { label: 'Szabály', value: 'Valódi tört reciproka mindig > 1' }
      ],
      hint: 'Gondolj egy példára: 1/5 reciproka 5!',
      formula: 'x < 1 ⟹ 1/x > 1'
    },

    // -------------------------------------------------------------------------
    // 2. SZINT: KERESZTBE EGYSZERŰSÍTÉS ÉS SZORZATOK (10 kérdés)
    // -------------------------------------------------------------------------
    {
      id: 'q11',
      level: 2,
      question: 'Végezd el a szorzást keresztbe egyszerűsítéssel: 3/4 · 8/9!',
      questionTypeBadge: 'Keresztbe egyszerűsítés',
      options: ['2/3', '24/36', '3/4', '1/3'],
      correctAnswer: '2/3',
      explanation: 'A 3 és 9 osztható 3-mal (1 és 3); a 8 és 4 osztható 4-gyel (2 és 1). Így: (1 · 2)/(1 · 3) = 2/3.',
      steps: [
        { label: 'Eredeti feladat', value: '3/4 · 8/9' },
        { label: '3 és 9 osztása 3-mal', value: '1 és 3' },
        { label: '8 és 4 osztása 4-gyel', value: '2 és 1' },
        { label: 'Új szorzat', value: '(1 · 2) / (1 · 3) = 2/3' }
      ],
      hint: 'Egyszerűsítsd a 3-at a 9-cel, és a 8-at a 4-gyel a szorzás előtt!',
      formula: '(3/4) · (8/9) = (1/1) · (2/3) = 2/3'
    },
    {
      id: 'q12',
      level: 2,
      question: 'Mennyi az 5/6 · 3/10 szorzat legegyszerűbb alakja?',
      questionTypeBadge: 'Keresztbe egyszerűsítés',
      options: ['1/4', '15/60', '1/2', '3/8'],
      correctAnswer: '1/4',
      explanation: 'Az 5 és 10 egyszerűsödik 5-tel (1 és 2); a 3 és 6 egyszerűsödik 3-mal (1 és 2): (1 · 1)/(2 · 2) = 1/4.',
      steps: [
        { label: 'Keresztbe egyszerűsítés', value: '5 és 10 ⟹ 1 és 2; 3 és 6 ⟹ 1 és 2' },
        { label: 'Szorzás', value: '(1 · 1) / (2 · 2)' },
        { label: 'Végeredmény', value: '1/4' }
      ],
      hint: 'Egyszerűsíts keresztbe 5-tel és 3-mal!',
      formula: '(5/6) · (3/10) = (1/2) · (1/2) = 1/4'
    },
    {
      id: 'q13',
      level: 2,
      question: 'Mennyi az 1 2/3 vegyes tört reciproka?',
      questionTypeBadge: 'Vegyes tört reciprok',
      options: ['3/5', '5/3', '1 3/2', '2/3'],
      correctAnswer: '3/5',
      explanation: 'Először áltörtté alakítjuk: 1 2/3 = 5/3. Ennek megfordításával kapjuk a 3/5 értéket.',
      steps: [
        { label: 'Áltörtté alakítás', value: '1 2/3 = (1 · 3 + 2)/3 = 5/3' },
        { label: 'Reciprokképzés', value: '5/3 ⟹ 3/5' },
        { label: 'Ellenőrzés', value: '5/3 · 3/5 = 1' }
      ],
      hint: 'Először alakítsd áltörtté (5/3), majd fordítsd meg!',
      formula: '1 2/3 = 5/3 ⟹ Reciproka: 3/5'
    },
    {
      id: 'q14',
      level: 2,
      question: 'Végezd el a műveletet: 7/8 · 4/7!',
      questionTypeBadge: 'Keresztbe egyszerűsítés',
      options: ['1/2', '28/56', '7/14', '1/4'],
      correctAnswer: '1/2',
      explanation: 'A 7-esek 1-re egyszerűsödnek, a 4 és 8 pedig 4-gyel egyszerűsítve 1 és 2: (1 · 1)/(2 · 1) = 1/2.',
      steps: [
        { label: 'Keresztbe egyszerűsítés', value: '7 és 7 ⟹ 1 és 1; 4 és 8 ⟹ 1 és 2' },
        { label: 'Szorzás', value: '(1 · 1) / (2 · 1)' },
        { label: 'Eredmény', value: '1/2' }
      ],
      hint: 'A 7 és a 7 azonnal kiesik!',
      formula: '(7/8) · (4/7) = (1/2) · (1/1) = 1/2'
    },
    {
      id: 'q15',
      level: 2,
      question: 'Melyik számmal kell megszorozni a 4/5-öt, hogy szorzatul pontosan 1-et kapjunk?',
      questionTypeBadge: 'Egyenlet / Reciprok',
      options: ['5/4', '4/5', '1/5', '1'],
      correctAnswer: '5/4',
      explanation: 'Egy számot a reciprokával kell megszorozni, hogy 1-et kapjunk: 4/5 · 5/4 = 20/20 = 1.',
      steps: [
        { label: 'Egyenlet', value: '4/5 · x = 1' },
        { label: 'x meghatározása', value: 'x = 4/5 reciproka' },
        { label: 'Végeredmény', value: 'x = 5/4' }
      ],
      hint: 'A keresett szám a 4/5 reciproka!',
      formula: '(a/b) · x = 1 ⟹ x = b/a'
    },
    {
      id: 'q16',
      level: 2,
      question: 'Számítsd ki: 2/3 · 9/10!',
      questionTypeBadge: 'Keresztbe egyszerűsítés',
      options: ['3/5', '18/30', '4/5', '2/5'],
      correctAnswer: '3/5',
      explanation: 'A 2 és 10 egyszerűsödik 2-vel (1 és 5), a 9 és 3 egyszerűsödik 3-mal (3 és 1): (1 · 3)/(1 · 5) = 3/5.',
      steps: [
        { label: 'Egyszerűsítés', value: '2 és 10 ⟹ 1 és 5; 9 és 3 ⟹ 3 és 1' },
        { label: 'Szorzat', value: '(1 · 3) / (1 · 5)' },
        { label: 'Eredmény', value: '3/5' }
      ],
      hint: 'Egyszerűsíts keresztbe 2-vel és 3-mal!',
      formula: '(2/3) · (9/10) = (1/1) · (3/5) = 3/5'
    },
    {
      id: 'q17',
      level: 2,
      question: 'Mennyi a 6/11 · 22/18 szorzat értéke?',
      questionTypeBadge: 'Keresztbe egyszerűsítés',
      options: ['2/3', '132/198', '1/3', '1 1/3'],
      correctAnswer: '2/3',
      explanation: 'A 22 és 11 egyszerűsödik 11-gyel (2 és 1); a 6 és 18 egyszerűsödik 6-tal (1 és 3): (1 · 2)/(1 · 3) = 2/3.',
      steps: [
        { label: 'Egyszerűsítés 11-gyel', value: '22 / 11 = 2 és 11 / 11 = 1' },
        { label: 'Egyszerűsítés 6-tal', value: '6 / 6 = 1 és 18 / 6 = 3' },
        { label: 'Végeredmény', value: '(1 · 2) / (1 · 3) = 2/3' }
      ],
      hint: 'Vedd észre, hogy 22 = 2 · 11 és 18 = 3 · 6!',
      formula: '(6/11) · (22/18) = (1/1) · (2/3) = 2/3'
    },
    {
      id: 'q18',
      level: 2,
      question: 'Egy téglalap oldalai 3/4 m és 2/5 m hosszúak. Mennyi a területe?',
      questionTypeBadge: 'Geometria',
      options: ['3/10 m²', '6/20 m²', '5/9 m²', '1/2 m²'],
      correctAnswer: '3/10 m²',
      explanation: 'A téglalap területe T = a · b = 3/4 · 2/5 = (3 · 1)/(2 · 5) = 3/10 m².',
      steps: [
        { label: 'Képlet', value: 'T = a · b' },
        { label: 'Behelyettesítés', value: 'T = 3/4 · 2/5' },
        { label: 'Egyszerűsítés 2-vel', value: '(3 · 1) / (2 · 5) = 3/10 m²' }
      ],
      hint: 'Szorozd össze a két oldalt: T = a · b!',
      formula: 'T = (3/4) · (2/5) = 3/10 m²'
    },
    {
      id: 'q19',
      level: 2,
      question: 'Mennyi a 4/7 · 14/12 szorzat eredménye?',
      questionTypeBadge: 'Keresztbe egyszerűsítés',
      options: ['2/3', '56/84', '1/2', '4/3'],
      correctAnswer: '2/3',
      explanation: 'A 14 és 7 egyszerűsödik 7-tel (2 és 1); a 4 és 12 egyszerűsödik 4-gyel (1 és 3): (1 · 2)/(1 · 3) = 2/3.',
      steps: [
        { label: 'Keresztbe egyszerűsítés', value: '14/7 = 2; 4/12 = 1/3' },
        { label: 'Szorzás', value: '(1 · 2) / (1 · 3)' },
        { label: 'Eredmény', value: '2/3' }
      ],
      hint: 'Egyszerűsíts 7-tel és 4-gyel!',
      formula: '(4/7) · (14/12) = 2/3'
    },
    {
      id: 'q20',
      level: 2,
      question: 'Melyik állítás IGAZ a reciprokra vonatkozóan?',
      questionTypeBadge: 'Elmélet',
      options: [
        'Egy szám és a reciproka mindig azonos előjelű',
        'Egy szám és a reciproka összege mindig 1',
        'A 0 reciproka 0',
        'Minden szám reciproka kisebb önmagánál'
      ],
      correctAnswer: 'Egy szám és a reciproka mindig azonos előjelű',
      explanation: 'Mivel a szorzatuk +1 (ami pozitív), a két számnak azonos előjelűnek kell lennie: pozitív szám reciproka pozitív, negatívé negatív.',
      steps: [
        { label: 'Szabály', value: 'x · (1/x) = +1' },
        { label: 'Előjelszabály', value: '(+) · (+) = (+) és (-) · (-) = (+)' },
        { label: 'Következtetés', value: 'Az előjel mindig megegyezik' }
      ],
      hint: 'Gondold végig: két szám szorzata mikor lehet +1?',
      formula: 'Előjel(x) = Előjel(1/x)'
    },

    // -------------------------------------------------------------------------
    // 3. SZINT: VEGYES TÖRTEK, TÖBBTAGÚ SZORZATOK, SZÖVEGESEK (10 kérdés)
    // -------------------------------------------------------------------------
    {
      id: 'q21',
      level: 3,
      question: 'Mennyi az 1 1/2 · 1 1/3 szorzat értéke?',
      questionTypeBadge: 'Vegyes tört szorzás',
      options: ['2', '1 1/6', '2 1/6', '3/2'],
      correctAnswer: '2',
      explanation: 'Áltörtté alakítva: 1 1/2 = 3/2 és 1 1/3 = 4/3. A szorzat: 3/2 · 4/3 = (1 · 2)/(1 · 1) = 2.',
      steps: [
        { label: 'Áltörtté alakítás', value: '1 1/2 = 3/2 és 1 1/3 = 4/3' },
        { label: 'Keresztbe egyszerűsítés', value: '3 és 3 ⟹ 1; 4 és 2 ⟹ 2' },
        { label: 'Végeredmény', value: '(1 · 2) / (1 · 1) = 2' }
      ],
      hint: 'Mindkét vegyes törtet alakítsd át áltörtté (3/2 és 4/3)!',
      formula: '(3/2) · (4/3) = 2'
    },
    {
      id: 'q22',
      level: 3,
      question: 'Számítsd ki: 2 1/4 · 2/3!',
      questionTypeBadge: 'Vegyes tört szorzás',
      options: ['1 1/2 (= 3/2)', '4/12', '1 3/4', '2 2/12'],
      correctAnswer: '1 1/2 (= 3/2)',
      explanation: '2 1/4 = 9/4. Így 9/4 · 2/3 = (3 · 1)/(2 · 1) = 3/2 = 1 1/2.',
      steps: [
        { label: 'Áltört', value: '2 1/4 = 9/4' },
        { label: 'Egyszerűsítés', value: '9 és 3 ⟹ 3 és 1; 2 és 4 ⟹ 1 és 2' },
        { label: 'Eredmény', value: '3/2 = 1 1/2' }
      ],
      hint: '2 1/4 = 9/4, majd egyszerűsíts 3-mal és 2-vel!',
      formula: '(9/4) · (2/3) = 3/2 = 1 1/2'
    },
    {
      id: 'q23',
      level: 3,
      question: 'Végezd el a háromtagú szorzást: 2/3 · 3/4 · 4/5!',
      questionTypeBadge: 'Többtagú szorzat',
      options: ['2/5', '24/60', '1/5', '1/2'],
      correctAnswer: '2/5',
      explanation: 'A 3-asok és 4-esek keresztbe teljesen kiesnek (1-re egyszerűsödnek), így megmarad: 2/5.',
      steps: [
        { label: 'Felírás közös törtvonalon', value: '(2 · 3 · 4) / (3 · 4 · 5)' },
        { label: '3 és 4 egyszerűsítése', value: 'Kiesnek a számlálóból és nevezőből' },
        { label: 'Végeredmény', value: '2/5' }
      ],
      hint: 'Húzd át a felesleges azonos számokat a számlálóban és nevezőben!',
      formula: '(2·3·4)/(3·4·5) = 2/5'
    },
    {
      id: 'q24',
      level: 3,
      question: 'Mennyi a 2 1/2 · 1 3/5 szorzat eredménye?',
      questionTypeBadge: 'Vegyes tört szorzás',
      options: ['4', '2 3/10', '3 1/2', '5/2'],
      correctAnswer: '4',
      explanation: '2 1/2 = 5/2 és 1 3/5 = 8/5. A szorzat: 5/2 · 8/5 = (1 · 4)/(1 · 1) = 4.',
      steps: [
        { label: 'Áltörtek', value: '2 1/2 = 5/2 és 1 3/5 = 8/5' },
        { label: 'Egyszerűsítés', value: '5 és 5 ⟹ 1; 8 és 2 ⟹ 4' },
        { label: 'Végeredmény', value: '4' }
      ],
      hint: 'Alakítsd át őket 5/2-vé és 8/5-té!',
      formula: '(5/2) · (8/5) = 4'
    },
    {
      id: 'q25',
      level: 3,
      question: 'Egy 60 fős tábor lakóinak 3/4 része szeret túrázni, és a túrázók 2/3 része már felmászott a kilátóba. Hányan másztak fel a kilátóba?',
      questionTypeBadge: 'Szöveges feladat',
      options: ['30 fő', '45 fő', '40 fő', '20 fő'],
      correctAnswer: '30 fő',
      explanation: 'A táborozók 3/4 · 2/3 = 1/2 része mászott fel a kilátóba. 60 · 1/2 = 30 fő.',
      steps: [
        { label: 'Tört arány kiszámítása', value: '3/4 · 2/3 = 1/2 része' },
        { label: 'Összesen felmászott diák', value: '60 · 1/2 = 30 fő' }
      ],
      hint: 'Szorozd össze a törtrészeket (3/4 · 2/3), majd vedd a 60 ennyi részét!',
      formula: '60 · (3/4) · (2/3) = 60 · (1/2) = 30'
    },
    {
      id: 'q26',
      level: 3,
      question: 'Mennyi az 1 1/4 · 2 2/5 · 1/3 kifejezés értéke?',
      questionTypeBadge: 'Összetett szorzat',
      options: ['1', '5/4', '2/3', '1 1/2'],
      correctAnswer: '1',
      explanation: '1 1/4 = 5/4 és 2 2/5 = 12/5. Így (5/4 · 12/5) · 1/3 = 3 · 1/3 = 1.',
      steps: [
        { label: 'Áltörtek', value: '5/4 · 12/5 · 1/3' },
        { label: 'Első két tag', value: '5/4 · 12/5 = 3' },
        { label: 'Harmadik taggal szorozva', value: '3 · 1/3 = 1' }
      ],
      hint: '5/4 · 12/5 szorzata 3, ennek az 1/3-a mennyi?',
      formula: '(5/4) · (12/5) · (1/3) = 1'
    },
    {
      id: 'q27',
      level: 3,
      question: 'Mennyi a 3 1/3 vegyes tört reciprokának és a 2 1/2 számnak a szorzata?',
      questionTypeBadge: 'Összetett feladat',
      options: ['3/4', '10/3', '1', '1/2'],
      correctAnswer: '3/4',
      explanation: '3 1/3 = 10/3, ennek reciproka 3/10. 2 1/2 = 5/2. A szorzat: 3/10 · 5/2 = (3 · 1)/(2 · 2) = 3/4.',
      steps: [
        { label: '3 1/3 reciproka', value: '3 1/3 = 10/3 ⟹ Reciproka: 3/10' },
        { label: '2 1/2 áltörtként', value: '5/2' },
        { label: 'Szorzás', value: '3/10 · 5/2 = (3 · 1)/(2 · 2) = 3/4' }
      ],
      hint: '3 1/3 = 10/3, ennek a reciproka 3/10!',
      formula: '(3/10) · (5/2) = 3/4'
    },
    {
      id: 'q28',
      level: 3,
      question: 'Egy autó tankjában 48 liter benzin van. Az út első felén elfogyott a 3/8 része, a második felén a maradék 2/5 része. Hány liter fogyott a második szakaszon?',
      questionTypeBadge: 'Szöveges feladat',
      options: ['12 liter', '18 liter', '30 liter', '15 liter'],
      correctAnswer: '12 liter',
      explanation: 'Első szakasz után a megmaradt üzemanyag: 48 · 5/8 = 30 liter. A második szakaszon fogyott: 30 · 2/5 = 12 liter.',
      steps: [
        { label: 'Első szakaszon fogyott', value: '48 · 3/8 = 18 liter' },
        { label: 'Megmaradt üzemanyag', value: '48 - 18 = 30 liter (vagy 48 · 5/8 = 30 liter)' },
        { label: 'Második szakaszon fogyott', value: '30 · 2/5 = 12 liter' }
      ],
      hint: 'Először számold ki a megmaradt benzint (30 liter), majd annak a 2/5 részét!',
      formula: '(48 · 5/8) · (2/5) = 30 · (2/5) = 12'
    },
    {
      id: 'q29',
      level: 3,
      question: 'Számítsd ki: (1/2 + 1/3) · 6/5!',
      questionTypeBadge: 'Műveleti sorrend',
      options: ['1', '5/6', '6/5', '1/2'],
      correctAnswer: '1',
      explanation: 'A zárójelben: 1/2 + 1/3 = 3/6 + 2/6 = 5/6. Majd szorzás: 5/6 · 6/5 = 1.',
      steps: [
        { label: 'Zárójel kiszámítása', value: '1/2 + 1/3 = 3/6 + 2/6 = 5/6' },
        { label: 'Szorzás', value: '5/6 · 6/5' },
        { label: 'Reciprokok szorzata', value: '1' }
      ],
      hint: 'Először végezd el a zárójeles összeadást közös nevezővel (5/6)!',
      formula: '(5/6) · (6/5) = 1'
    },
    {
      id: 'q30',
      level: 3,
      question: 'Ha A = 3/4 és B az A reciproka, mennyi az (A + B) · 12 kifejezés pontos értéke?',
      questionTypeBadge: 'Algebrai fejtörő',
      options: ['25', '24', '12', '16'],
      correctAnswer: '25',
      explanation: 'A = 3/4, B = 4/3. A + B = 3/4 + 4/3 = 9/12 + 16/12 = 25/12. Ezt megszorozva 12-vel: (25/12) · 12 = 25.',
      steps: [
        { label: 'B meghatározása', value: 'B = 4/3' },
        { label: 'Összeg közös nevezővel', value: '3/4 + 4/3 = 9/12 + 16/12 = 25/12' },
        { label: 'Szorzás 12-vel', value: '(25/12) · 12 = 25' }
      ],
      hint: 'A = 3/4, B = 4/3. Hozd közös nevezőre őket, majd szorozz 12-vel!',
      formula: '(3/4 + 4/3) · 12 = (25/12) · 12 = 25'
    }
  ];

  const cheatSheetItems: CheatSheetItem[] = [
    {
      topic: 'Tört szorzása egész számmal',
      formula: '(a/b) · n = (a · n) / b  vagy  a / (b : n)',
      note: 'Számlálót szorozzuk a számmal, vagy ha lehet, a nevezőt osztjuk vele.'
    },
    {
      topic: 'Tört szorzása törttel',
      formula: '(a/b) · (c/d) = (a · c) / (b · d)',
      note: 'Számlálót a számlálóval, nevezőt a nevezővel szorozzuk. Szorzás előtt egyszerűsíts keresztbe!'
    },
    {
      topic: 'A reciprok fogalma',
      formula: 'x · (1/x) = 1  |  (a/b) · (b/a) = 1',
      note: 'Két szám szorzata 1. Közönséges törtnél felcseréljük a számlálót és nevezőt. 0-nak nincs reciproka!'
    },
    {
      topic: 'Vegyes törtek szorzása',
      formula: '1 1/2 · 1 1/3 = 3/2 · 4/3 = 2',
      note: 'Először mindig áltörtté alakítjuk a vegyes számokat, utána egyszerűsítünk és szorzunk!'
    }
  ];

  const cheatSheetCards: CheatSheetCard[] = [
    {
      id: 'cs1',
      title: 'Tört Szorzása Törttel',
      formula: '\\frac{a}{b} \\cdot \\frac{c}{d} = \\frac{a \\cdot c}{b \\cdot d}',
      note: 'Mindig érdemes szorzás ELŐTT keresztbe egyszerűsíteni a számokat a számlálóban és nevezőben!'
    },
    {
      id: 'cs2',
      title: 'A Reciprok Szabályai',
      formula: '\\frac{a}{b} \\leftrightarrow \\frac{b}{a} \\quad (n \\leftrightarrow \\frac{1}{n})',
      note: 'Egy szám és reciproka szorzata mindig 1. A 0-nak nincs reciproka, az 1 reciproka önmaga (1).'
    },
    {
      id: 'cs3',
      title: 'Vegyes Törtek Szorzása',
      formula: 'W\\frac{a}{b} \\longrightarrow \\frac{W \\cdot b + a}{b}',
      note: 'Vegyes törtnél tilos külön szorozni az egészeket! Mindig alakítsd át áltörtté a szorzás előtt!'
    }
  ];

  return (
    <QuizTemplate
      title="Szorzás törttel, a reciprok"
      subtitle="30 feladat: Tört szorzása egész számmal és törttel, keresztbe egyszerűsítés, reciprok és vegyes törtek szorzása."
      emoji="✖️"
      badgeText="✖️ 6. Osztály • II. Törtek"
      grade={6}
      chapterId="g6-fractions"
      topicId="g6-fraction-multiplication-quiz"
      questions={questions}
      cheatSheet={cheatSheetItems}
      cheatSheetCards={cheatSheetCards}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      matcherComponent={<FractionMultiplicationMatcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} />}
      sorterComponent={<FractionMultiplicationSorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} />}
    />
  );
}

export default FractionMultiplicationQuiz;
