import React from 'react';
import { QuizTemplate, Question, DifficultyLevel } from '../QuizTemplate';
import { FractionDivideMatcher } from './FractionDivideMatcher';
import { FractionDivideSorter } from './FractionDivideSorter';

export interface FractionDivideQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

export const fractionDivideQuestions: Record<DifficultyLevel, Question[]> = {
  // 1. SZINT: KÖNNYŰ (10 feladat) - Számláló osztása, alapszabályok
  1: [
    {
      id: 'g5-fd-l1-1',
      question: 'Mennyi a 4/5 : 2 osztás eredménye?',
      options: ['2/5', '4/10', '2/10', '8/5'],
      correctAnswer: '2/5',
      explanation: 'Mivel a számláló (4) osztható 2-vel, a számlálót osztjuk: 4 : 2 = 2, a nevező változatlan marad (5). Eredmény: 2/5.',
      breakdown: [
        '1. lépés: Megvizsgáljuk, hogy a számláló (4) osztható-e 2-vel. Igen, 4 : 2 = 2.',
        '2. lépés: A nevező változatlanul 5 marad.',
        '3. lépés: Végeredmény: 2/5.'
      ],
      hint: 'Oszd el a felső számot 2-vel!',
      formula: '4/5 : 2 = (4 : 2)/5 = 2/5'
    },
    {
      id: 'g5-fd-l1-2',
      question: 'Számítsd ki: 6/7 : 3!',
      options: ['2/7', '6/21', '2/21', '3/7'],
      correctAnswer: '2/7',
      explanation: '6/7 : 3 = (6 : 3)/7 = 2/7.',
      breakdown: [
        '1. lépés: Számláló osztása: 6 : 3 = 2.',
        '2. lépés: Nevező változatlan: 7.',
        '3. lépés: Végeredmény: 2/7.'
      ],
      hint: '6 heted szeletet 3 felé osztva mindenkinek 2 heted szelet jut.',
      formula: '6/7 : 3 = 2/7'
    },
    {
      id: 'g5-fd-l1-3',
      question: 'Mennyi a 8/9 : 4 osztás eredménye?',
      options: ['2/9', '8/36', '2/36', '4/9'],
      correctAnswer: '2/9',
      explanation: '8/9 : 4 = (8 : 4)/9 = 2/9.',
      breakdown: [
        '1. lépés: Számláló osztása: 8 : 4 = 2.',
        '2. lépés: Nevező marad: 9.',
        '3. lépés: Eredmény: 2/9.'
      ],
      hint: '8 kilenced harmada vagy negyede: 8 : 4 = 2.',
      formula: '8/9 : 4 = 2/9'
    },
    {
      id: 'g5-fd-l1-4',
      question: 'Mennyi a 9/10 : 3 osztás eredménye?',
      options: ['3/10', '9/30', '3/30', '1/10'],
      correctAnswer: '3/10',
      explanation: '9/10 : 3 = (9 : 3)/10 = 3/10.',
      breakdown: [
        '1. lépés: 9 : 3 = 3.',
        '2. lépés: Nevező: 10.',
        '3. lépés: Végeredmény: 3/10.'
      ],
      hint: '9 tized harmadrésze.',
      formula: '9/10 : 3 = 3/10'
    },
    {
      id: 'g5-fd-l1-5',
      question: 'Melyik szabály igaz a tört egész számmal való osztására?',
      options: [
        'Ha a számláló osztható a számmal, a számlálót osztjuk; különben a nevezőt szorozzuk.',
        'Mindig a számlálót és a nevezőt is el kell osztani.',
        'Mindig a nevezőt kell elosztani a számmal.',
        'Törtet nem lehet természetes számmal osztani.'
      ],
      correctAnswer: 'Ha a számláló osztható a számmal, a számlálót osztjuk; különben a nevezőt szorozzuk.',
      explanation: 'Törtet természetes számmal úgy osztunk, hogy a számlálóját elosztjuk (ha osztható), vagy a nevezőjét megszorozzuk az egész számmal.',
      breakdown: [
        '1. szabály: Ha a számláló osztható: a/b : n = (a : n)/b.',
        '2. szabály: Ha nem osztható (vagy általánosan): a/b : n = a/(b · n).'
      ],
      hint: 'Gondolj a 2 tanult módszerre!',
      formula: 'a/b : n = (a : n)/b vagy a/(b · n)'
    },
    {
      id: 'g5-fd-l1-6',
      question: 'Mennyi a 10/11 : 5 osztás eredménye?',
      options: ['2/11', '10/55', '2/55', '5/11'],
      correctAnswer: '2/11',
      explanation: '10/11 : 5 = (10 : 5)/11 = 2/11.',
      breakdown: [
        '1. lépés: 10 : 5 = 2.',
        '2. lépés: Nevező változatlan: 11.',
        '3. lépés: Végeredmény: 2/11.'
      ],
      hint: '10 tizenegyedet osztunk 5 felé.',
      formula: '10/11 : 5 = 2/11'
    },
    {
      id: 'g5-fd-l1-7',
      question: 'Mennyi a 6/13 : 6 osztás eredménye?',
      options: ['1/13', '6/78', '1', '1/6'],
      correctAnswer: '1/13',
      explanation: '6/13 : 6 = (6 : 6)/13 = 1/13.',
      breakdown: [
        '1. lépés: 6 : 6 = 1.',
        '2. lépés: A nevező 13 marad.',
        '3. lépés: Végeredmény: 1/13.'
      ],
      hint: '6 darab tizenharmad szeletet osztunk 6 gyereknek.',
      formula: '6/13 : 6 = 1/13'
    },
    {
      id: 'g5-fd-l1-8',
      question: 'Számítsd ki: 12/17 : 4!',
      options: ['3/17', '12/68', '3/68', '4/17'],
      correctAnswer: '3/17',
      explanation: '12/17 : 4 = (12 : 4)/17 = 3/17.',
      breakdown: [
        '1. lépés: 12 : 4 = 3.',
        '2. lépés: Nevező: 17.',
        '3. lépés: Végeredmény: 3/17.'
      ],
      hint: '12 : 4 = 3.',
      formula: '12/17 : 4 = 3/17'
    },
    {
      id: 'g5-fd-l1-9',
      question: 'Mennyi a 15/19 : 3 osztás eredménye?',
      options: ['5/19', '15/57', '5/57', '3/19'],
      correctAnswer: '5/19',
      explanation: '15/19 : 3 = (15 : 3)/19 = 5/19.',
      breakdown: [
        '1. lépés: 15 : 3 = 5.',
        '2. lépés: Nevező: 19.',
        '3. lépés: Végeredmény: 5/19.'
      ],
      hint: '15 tizenkilenced harmada.',
      formula: '15/19 : 3 = 5/19'
    },
    {
      id: 'g5-fd-l1-10',
      question: 'Miért hibás a következő számolás: 4/6 : 2 = 2/3?',
      options: [
        'Mert a számlálót és a nevezőt is elosztotta, ami egyszerűsítés, így a tört értéke nem csökkent',
        'Mert a 4 nem osztható 2-vel',
        'Mert a 2/3 nem létező tört',
        'Nem hibás, teljesen helyes'
      ],
      correctAnswer: 'Mert a számlálót és a nevezőt is elosztotta, ami egyszerűsítés, így a tört értéke nem csökkent',
      explanation: 'Ha a számlálót és a nevezőt is elosztjuk 2-vel, a tört értéke változatlan marad (egyszerűsítés). Osztáskor csak a számlálót osztjuk: 4/6 : 2 = 2/6 = 1/3.',
      breakdown: [
        '1. lépés: 4/6 : 2 = (4 : 2)/6 = 2/6.',
        '2. lépés: Egyszerűsítve: 2/6 = 1/3.',
        '3. lépés: A 2/3 az eredeti 4/6-dal egyenlő, tehát nem lett elfelezve!'
      ],
      hint: 'Ha mindkettőt osztod, az egyszerűsítés!',
      formula: '4/6 : 2 = 2/6 = 1/3 ≠ 2/3'
    }
  ],

  // 2. SZINT: KÖZEPES (10 feladat) - Nevező szorzása, egyszerűsítés, szöveges feladatok
  2: [
    {
      id: 'g5-fd-l2-1',
      question: 'Mennyi az 1/3 : 2 osztás eredménye?',
      options: ['1/6', '2/3', '1/1', '1/5'],
      correctAnswer: '1/6',
      explanation: 'Mivel az 1 nem osztható 2-vel, a nevezőt szorozzuk meg: 1/(3 · 2) = 1/6.',
      breakdown: [
        '1. lépés: A számláló (1) nem osztható 2-vel, ezért a nevezőt szorozzuk.',
        '2. lépés: 3 · 2 = 6.',
        '3. lépés: Végeredmény: 1/6.'
      ],
      hint: 'Egy harmadrész fele egy hatodrész.',
      formula: '1/3 : 2 = 1/(3 · 2) = 1/6'
    },
    {
      id: 'g5-fd-l2-2',
      question: 'Számítsd ki: 3/4 : 2!',
      options: ['3/8', '6/4', '3/2', '1/4'],
      correctAnswer: '3/8',
      explanation: '3/4 : 2 = 3/(4 · 2) = 3/8.',
      breakdown: [
        '1. lépés: A számláló (3) nem osztható 2-vel.',
        '2. lépés: Nevező szorzása: 4 · 2 = 8.',
        '3. lépés: Végeredmény: 3/8.'
      ],
      hint: 'A negyedeket tovább felezzük nyolcadokká.',
      formula: '3/4 : 2 = 3/8'
    },
    {
      id: 'g5-fd-l2-3',
      question: 'Mennyi a 2/5 : 3 osztás eredménye?',
      options: ['2/15', '6/5', '2/8', '1/15'],
      correctAnswer: '2/15',
      explanation: '2/5 : 3 = 2/(5 · 3) = 2/15.',
      breakdown: [
        '1. lépés: A 2 nem osztható 3-mal.',
        '2. lépés: Nevező szorzása: 5 · 3 = 15.',
        '3. lépés: Végeredmény: 2/15.'
      ],
      hint: 'Szorozd meg az alsó számot 3-mal!',
      formula: '2/5 : 3 = 2/15'
    },
    {
      id: 'g5-fd-l2-4',
      question: 'Mennyi az 1/4 : 3 osztás eredménye?',
      options: ['1/12', '3/4', '1/7', '4/3'],
      correctAnswer: '1/12',
      explanation: '1/4 : 3 = 1/(4 · 3) = 1/12.',
      breakdown: [
        '1. lépés: 1/(4 · 3) = 1/12.'
      ],
      hint: '4 · 3 = 12.',
      formula: '1/4 : 3 = 1/12'
    },
    {
      id: 'g5-fd-l2-5',
      question: 'Számítsd ki és egyszerűsítsd: 4/9 : 2!',
      options: ['2/9', '4/18', '2/18', '8/9'],
      correctAnswer: '2/9',
      explanation: '4/9 : 2 = (4 : 2)/9 = 2/9. (Vagy nevező szorzásával: 4/18 = 2/9).',
      breakdown: [
        '1. lépés: Számláló osztása: 4 : 2 = 2.',
        '2. lépés: A nevező 9 marad.',
        '3. lépés: Végeredmény: 2/9.'
      ],
      hint: 'A számláló (4) páros, így azonnal osztható 2-vel!',
      formula: '4/9 : 2 = 2/9'
    },
    {
      id: 'g5-fd-l2-6',
      question: 'Mennyi az 5/7 : 2 osztás eredménye?',
      options: ['5/14', '10/7', '5/9', '2/14'],
      correctAnswer: '5/14',
      explanation: '5/7 : 2 = 5/(7 · 2) = 5/14.',
      breakdown: [
        '1. lépés: 5 nem osztható 2-vel.',
        '2. lépés: 7 · 2 = 14.',
        '3. lépés: 5/14.'
      ],
      hint: '7 · 2 = 14 a nevezőben.',
      formula: '5/7 : 2 = 5/14'
    },
    {
      id: 'g5-fd-l2-7',
      question: 'Egy 3/4 literes üveg szörpöt 3 pohárba egyenlően szétöntünk. Hány liter szörp kerül egy pohárba?',
      options: ['1/4 liter', '3/12 liter', '9/4 liter', '1/3 liter'],
      correctAnswer: '1/4 liter',
      explanation: '3/4 : 3 = (3 : 3)/4 = 1/4 liter.',
      breakdown: [
        '1. lépés: A 3/4 litert elosztjuk 3-mal: 3/4 : 3.',
        '2. lépés: Számláló osztása: 3 : 3 = 1.',
        '3. lépés: Nevező marad: 4. Végeredmény: 1/4 liter.'
      ],
      hint: '3 negyed liter osztva 3 felé.',
      formula: '3/4 : 3 = 1/4'
    },
    {
      id: 'g5-fd-l2-8',
      question: 'Számítsd ki és egyszerűsítsd: 6/11 : 4!',
      options: ['3/22', '6/44', '3/11', '1/22'],
      correctAnswer: '3/22',
      explanation: '6/11 : 4 = 6/(11 · 4) = 6/44 = 3/22 (2-vel egyszerűsítve).',
      breakdown: [
        '1. lépés: Nevező szorzása: 11 · 4 = 44, kapjuk a 6/44-et.',
        '2. lépés: Egyszerűsítés 2-vel: 6:2 = 3 és 44:2 = 22.',
        '3. lépés: Végeredmény: 3/22.'
      ],
      hint: '6/44 egyszerűsítve.',
      formula: '6/11 : 4 = 6/44 = 3/22'
    },
    {
      id: 'g5-fd-l2-9',
      question: 'Mennyi a 3/5 : 4 osztás eredménye?',
      options: ['3/20', '12/5', '3/9', '1/20'],
      correctAnswer: '3/20',
      explanation: '3/5 : 4 = 3/(5 · 4) = 3/20.',
      breakdown: [
        '1. lépés: 5 · 4 = 20.',
        '2. lépés: Végeredmény: 3/20.'
      ],
      hint: 'Nevező: 5 · 4.',
      formula: '3/5 : 4 = 3/20'
    },
    {
      id: 'g5-fd-l2-10',
      question: 'Egy 4/5 méteres szalagot 4 egyenlő darabra vágunk. Milyen hosszú egy darab?',
      options: ['1/5 méter', '4/20 méter', '16/5 méter', '1 méter'],
      correctAnswer: '1/5 méter',
      explanation: '4/5 : 4 = (4 : 4)/5 = 1/5 méter.',
      breakdown: [
        '1. lépés: 4/5 : 4 = 1/5 méter.'
      ],
      hint: '4 darab ötöd szelet 4 részre osztva.',
      formula: '4/5 : 4 = 1/5'
    }
  ],

  // 3. SZINT: HALADÓ (10 feladat) - Vegyes törtek osztása, összetett feladatok, egyenletek
  3: [
    {
      id: 'g5-fd-l3-1',
      question: 'Mennyi az 1 1/2 : 3 osztás eredménye?',
      options: ['1/2', '1 1/6', '3/6', '1/3'],
      correctAnswer: '1/2',
      explanation: '1 1/2 = 3/2. Ezután 3/2 : 3 = (3 : 3)/2 = 1/2.',
      breakdown: [
        '1. lépés: Vegyes tört átalakítása áltörtté: 1 1/2 = 3/2.',
        '2. lépés: Osztás elvégzése: 3/2 : 3 = (3 : 3)/2 = 1/2.',
        '3. lépés: Végeredmény: 1/2.'
      ],
      hint: 'Először váltsd át az 1 1/2-et 3/2-re!',
      formula: '1 1/2 : 3 = 3/2 : 3 = 1/2'
    },
    {
      id: 'g5-fd-l3-2',
      question: 'Számítsd ki: 1 1/3 : 2!',
      options: ['2/3', '1 1/6', '4/6', '1/3'],
      correctAnswer: '2/3',
      explanation: '1 1/3 = 4/3. Ezután 4/3 : 2 = (4 : 2)/3 = 2/3.',
      breakdown: [
        '1. lépés: 1 1/3 = 4/3.',
        '2. lépés: 4/3 : 2 = (4 : 2)/3 = 2/3.'
      ],
      hint: '1 1/3 = 4/3, ennek a fele.',
      formula: '1 1/3 : 2 = 4/3 : 2 = 2/3'
    },
    {
      id: 'g5-fd-l3-3',
      question: 'Mennyi a 2 1/4 : 3 osztás eredménye?',
      options: ['3/4', '2 1/12', '9/12', '1/4'],
      correctAnswer: '3/4',
      explanation: '2 1/4 = 9/4. Ezután 9/4 : 3 = (9 : 3)/4 = 3/4.',
      breakdown: [
        '1. lépés: 2 1/4 = 9/4.',
        '2. lépés: 9/4 : 3 = (9 : 3)/4 = 3/4.'
      ],
      hint: '2 1/4 = 9/4, a 9 osztható 3-mal!',
      formula: '2 1/4 : 3 = 9/4 : 3 = 3/4'
    },
    {
      id: 'g5-fd-l3-4',
      question: 'Számítsd ki: 2 2/3 : 4!',
      options: ['2/3', '8/12', '1/3', '1 1/3'],
      correctAnswer: '2/3',
      explanation: '2 2/3 = 8/3. Ezután 8/3 : 4 = (8 : 4)/3 = 2/3.',
      breakdown: [
        '1. lépés: 2 2/3 = 8/3.',
        '2. lépés: 8/3 : 4 = 2/3.'
      ],
      hint: '8/3 osztva 4-gyel.',
      formula: '2 2/3 : 4 = 8/3 : 4 = 2/3'
    },
    {
      id: 'g5-fd-l3-5',
      question: 'Melyik számmal osztottuk el a 6/7-et, ha az eredmény 2/7 lett?',
      options: ['3', '2', '4', '1/3'],
      correctAnswer: '3',
      explanation: '6/7 : x = 2/7. Mivel 6 : x = 2, így x = 3.',
      breakdown: [
        '1. lépés: 6/7 : x = 2/7.',
        '2. lépés: A számláló 6-ról 2-re csökkent, tehát 6 : 3 = 2.',
        '3. lépés: Az osztó a 3.'
      ],
      hint: 'Hányszor van meg a 2 a 6-ban?',
      formula: '6/7 : 3 = 2/7'
    },
    {
      id: 'g5-fd-l3-6',
      question: 'Mennyi az 1 3/7 : 5 osztás eredménye?',
      options: ['2/7', '10/35', '1/7', '3/35'],
      correctAnswer: '2/7',
      explanation: '1 3/7 = 10/7. Ezután 10/7 : 5 = (10 : 5)/7 = 2/7.',
      breakdown: [
        '1. lépés: 1 3/7 = 10/7.',
        '2. lépés: 10/7 : 5 = (10 : 5)/7 = 2/7.'
      ],
      hint: '1 3/7 = 10/7, a 10 osztható 5-tel!',
      formula: '1 3/7 : 5 = 10/7 : 5 = 2/7'
    },
    {
      id: 'g5-fd-l3-7',
      question: 'Számítsd ki a kifejezés értékét: (3/5 + 1/5) : 2!',
      options: ['2/5', '4/10', '4/5', '1/5'],
      correctAnswer: '2/5',
      explanation: 'Zárójelben: 3/5 + 1/5 = 4/5. Ezután 4/5 : 2 = (4 : 2)/5 = 2/5.',
      breakdown: [
        '1. lépés: Zárójeles összeadás: 3/5 + 1/5 = 4/5.',
        '2. lépés: Osztás: 4/5 : 2 = 2/5.'
      ],
      hint: 'Először végezd el a zárójelben lévő összeadást!',
      formula: '(3/5 + 1/5) : 2 = 4/5 : 2 = 2/5'
    },
    {
      id: 'g5-fd-l3-8',
      question: 'Mennyi a 3 1/3 : 5 osztás eredménye?',
      options: ['2/3', '10/15', '1/3', '3/15'],
      correctAnswer: '2/3',
      explanation: '3 1/3 = 10/3. Ezután 10/3 : 5 = (10 : 5)/3 = 2/3.',
      breakdown: [
        '1. lépés: 3 1/3 = 10/3.',
        '2. lépés: 10/3 : 5 = (10 : 5)/3 = 2/3.'
      ],
      hint: '3 1/3 = 10/3.',
      formula: '3 1/3 : 5 = 10/3 : 5 = 2/3'
    },
    {
      id: 'g5-fd-l3-9',
      question: 'Egy 5/6 kg-os tortát 5 egyenlő szeletre vágunk, majd 2 szeletet megeszünk. Hány kg torta maradt?',
      options: ['1/2 kg (azaz 3/6 kg)', '3/5 kg', '2/6 kg', '1/3 kg'],
      correctAnswer: '1/2 kg (azaz 3/6 kg)',
      explanation: '1 szelet: 5/6 : 5 = 1/6 kg. Maradt 3 szelet: 3 · 1/6 = 3/6 = 1/2 kg.',
      breakdown: [
        '1. lépés: 1 szelet tömege: 5/6 : 5 = 1/6 kg.',
        '2. lépés: 5 szeletből 2-t megettünk, 3 szelet maradt.',
        '3. lépés: Maradék tömege: 3 · 1/6 = 3/6 = 1/2 kg.'
      ],
      hint: 'Számold ki 1 szelet tömegét, majd szorozd meg a maradék 3 szelettel!',
      formula: '5/6 : 5 = 1/6; 3 · 1/6 = 3/6 = 1/2'
    },
    {
      id: 'g5-fd-l3-10',
      question: 'Számítsd ki a műveletet: (1 - 1/4) : 3!',
      options: ['1/4', '3/12', '3/4', '1/3'],
      correctAnswer: '1/4',
      explanation: '1 - 1/4 = 3/4. Ezután 3/4 : 3 = (3 : 3)/4 = 1/4.',
      breakdown: [
        '1. lépés: 1 - 1/4 = 4/4 - 1/4 = 3/4.',
        '2. lépés: 3/4 : 3 = (3 : 3)/4 = 1/4.'
      ],
      hint: '1 egészből elveszel 1/4-et = 3/4, majd elosztod 3-mal.',
      formula: '(1 - 1/4) : 3 = 3/4 : 3 = 1/4'
    }
  ]
};

export function FractionDivideQuiz({ onBack, onSwitchToTheory }: FractionDivideQuizProps) {
  return (
    <QuizTemplate
      title="Tört osztása pozitív egész számmal kvíz"
      subtitle="Gyakorold a számláló osztását, a nevező szorzását és a vegyes törtek osztását 3 nehézségi szinten!"
      badge="➗ 5. Osztály • Törtek, tizedes törtek"
      topicId="g5-fraction-divide-quiz"
      category="fraction-divide"
      grade={5}
      questions={fractionDivideQuestions}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      themeColor="indigo"
      renderMatcher={({ level, onNextLevel, onOpenRules }) => (
        <FractionDivideMatcher
          level={level}
          onNextLevel={onNextLevel}
          onOpenRules={onOpenRules}
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      )}
      renderSorter={({ level, onNextLevel, onOpenRules }) => (
        <FractionDivideSorter
          level={level}
          onNextLevel={onNextLevel}
          onOpenRules={onOpenRules}
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      )}
    />
  );
}

export default FractionDivideQuiz;
