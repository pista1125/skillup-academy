import React from 'react';
import { QuizTemplate, Question, DifficultyLevel } from '../QuizTemplate';
import { FractionMultiplyMatcher } from './FractionMultiplyMatcher';
import { FractionMultiplySorter } from './FractionMultiplySorter';

export interface FractionMultiplyQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

export const fractionMultiplyQuestions: Record<DifficultyLevel, Question[]> = {
  // 1. SZINT: KÖNNYŰ (10 feladat) - Alapszorzások számláló szorzásával, egész szorzók
  1: [
    {
      id: 'g5-fm-l1-1',
      question: 'Mennyi az 1/5 · 3 szorzás eredménye?',
      options: ['3/5', '3/15', '1/15', '4/5'],
      correctAnswer: '3/5',
      explanation: 'Törtet természetes számmal úgy szorzunk, hogy a számlálót megszorozzuk (1 · 3 = 3), a nevező változatlan marad (5). Eredmény: 3/5.',
      breakdown: [
        '1. lépés: A számlálót megszorozzuk az egész számmal: 1 · 3 = 3.',
        '2. lépés: A nevező változatlan marad: 5.',
        '3. lépés: Végeredmény: 3/5.'
      ],
      hint: 'Szorozd meg a felső számot a 3-mal!',
      formula: '1/5 · 3 = (1 · 3)/5 = 3/5'
    },
    {
      id: 'g5-fm-l1-2',
      question: 'Számítsd ki: 2/7 · 3!',
      options: ['6/7', '6/21', '5/7', '2/21'],
      correctAnswer: '6/7',
      explanation: '2/7 · 3 = (2 · 3)/7 = 6/7.',
      breakdown: [
        '1. lépés: Számláló szorzása: 2 · 3 = 6.',
        '2. lépés: Nevező változatlan: 7.',
        '3. lépés: Végeredmény: 6/7.'
      ],
      hint: '3 darab 2 heted szelet az összesen 6 heted.',
      formula: '2/7 · 3 = 6/7'
    },
    {
      id: 'g5-fm-l1-3',
      question: 'Mennyi az 1/4 · 4 szorzás eredménye?',
      options: ['1', '4/16', '1/16', '4/4'],
      correctAnswer: '1',
      explanation: '1/4 · 4 = 4/4 = 1 egész.',
      breakdown: [
        '1. lépés: 1/4 · 4 = 4/4.',
        '2. lépés: 4/4 = 1 teljes egész.'
      ],
      hint: '4 darab negyed szelet egy teljes egészet ad ki.',
      formula: '1/4 · 4 = 4/4 = 1'
    },
    {
      id: 'g5-fm-l1-4',
      question: 'Mennyi a 2/9 · 4 szorzás eredménye?',
      options: ['8/9', '8/36', '6/9', '2/36'],
      correctAnswer: '8/9',
      explanation: '2/9 · 4 = (2 · 4)/9 = 8/9.',
      breakdown: [
        '1. lépés: Számláló szorzása: 2 · 4 = 8.',
        '2. lépés: Nevező változatlan: 9.',
        '3. lépés: 8/9.'
      ],
      hint: 'Csak a 2-t szorozzuk meg 4-gyel!',
      formula: '2/9 · 4 = (2 · 4)/9 = 8/9'
    },
    {
      id: 'g5-fm-l1-5',
      question: 'Igaz vagy hamis: Ha egy törtet megszorzunk 2-vel, a nevezőjét is meg kell szoroznunk 2-vel?',
      options: ['Hamis, mert a nevező nem változik (különben bővítés lenne)', 'Igaz, mindkettőt szorozzuk', 'Csak akkor igaz, ha a tört nagyobb 1-nél', 'Igaz, így kapunk nagyobb törtet'],
      correctAnswer: 'Hamis, mert a nevező nem változik (különben bővítés lenne)',
      explanation: 'Ha a számlálót és a nevezőt is megszorozzuk, a tört értéke nem változik (bővítés). Szorzáskor csak a számlálót szorozzuk!',
      breakdown: [
        '1. lépés: A tört értékének növeléséhez csak a számlálót szorozzuk.',
        '2. lépés: Ha a nevezőt is megszoroznánk, az bővítés lenne, aminek értéke azonos marad.'
      ],
      hint: 'Gondolj arra: 2 szelet pizza duplája 4 szelet pizza (negyedek maradnak)!',
      formula: 'a/b · n = (a · n)/b ≠ (a · n)/(b · n)'
    },
    {
      id: 'g5-fm-l1-6',
      question: 'Mennyi az 1/8 · 5 szorzás eredménye?',
      options: ['5/8', '5/40', '1/40', '6/8'],
      correctAnswer: '5/8',
      explanation: '1/8 · 5 = (1 · 5)/8 = 5/8.',
      breakdown: [
        '1. lépés: 1 · 5 = 5.',
        '2. lépés: A nevező 8 marad.',
        '3. lépés: 5/8.'
      ],
      hint: '5 darab nyolcad szelet = 5/8.',
      formula: '1/8 · 5 = 5/8'
    },
    {
      id: 'g5-fm-l1-7',
      question: 'Számítsd ki: 3/10 · 3!',
      options: ['9/10', '9/30', '6/10', '3/30'],
      correctAnswer: '9/10',
      explanation: '3/10 · 3 = (3 · 3)/10 = 9/10.',
      breakdown: [
        '1. lépés: 3 · 3 = 9.',
        '2. lépés: Nevező: 10.',
        '3. lépés: 9/10.'
      ],
      hint: '3 · 3 tized = 9 tized.',
      formula: '3/10 · 3 = 9/10'
    },
    {
      id: 'g5-fm-l1-8',
      question: 'Mennyi a 2/3 · 3 szorzás eredménye?',
      options: ['2', '6/9', '2/9', '5/3'],
      correctAnswer: '2',
      explanation: '2/3 · 3 = 6/3 = 2 egész.',
      breakdown: [
        '1. lépés: 2 · 3 = 6.',
        '2. lépés: 6/3 = 6 : 3 = 2.'
      ],
      hint: '6 harmad pontosan hány egész?',
      formula: '2/3 · 3 = 6/3 = 2'
    },
    {
      id: 'g5-fm-l1-9',
      question: 'Mennyi a 4/11 · 2 szorzás eredménye?',
      options: ['8/11', '8/22', '6/11', '4/22'],
      correctAnswer: '8/11',
      explanation: '4/11 · 2 = (4 · 2)/11 = 8/11.',
      breakdown: [
        '1. lépés: 4 · 2 = 8.',
        '2. lépés: Nevező 11.',
        '3. lépés: 8/11.'
      ],
      hint: 'Szorozd a számlálót 2-vel!',
      formula: '4/11 · 2 = 8/11'
    },
    {
      id: 'g5-fm-l1-10',
      question: 'Mennyi az 1/6 · 5 szorzás eredménye?',
      options: ['5/6', '5/30', '6/6', '1/30'],
      correctAnswer: '5/6',
      explanation: '1/6 · 5 = (1 · 5)/6 = 5/6.',
      breakdown: [
        '1. lépés: 1 · 5 = 5.',
        '2. lépés: Nevező 6.',
        '3. lépés: 5/6.'
      ],
      hint: '1 hatod ötszöröse az 5 hatod.',
      formula: '1/6 · 5 = 5/6'
    }
  ],

  // 2. SZINT: KÖZEPES (10 feladat) - Nevező osztása, egyszerűsítés, áltört és vegyes tört alak
  2: [
    {
      id: 'g5-fm-l2-1',
      question: 'Mennyi a 3/8 · 2 szorzás eredménye a legegyszerűbb alakban?',
      options: ['3/4', '6/8', '6/16', '3/16'],
      correctAnswer: '3/4',
      explanation: 'Mivel a nevező (8) osztható 2-vel: 3/8 · 2 = 3/(8 : 2) = 3/4. (Vagy számláló szorzással: 6/8 = 3/4).',
      breakdown: [
        '1. lépés (1. módszer): A nevezőt osztjuk 2-vel: 3/(8 : 2) = 3/4.',
        '2. lépés (2. módszer): A számlálót szorozzuk: 6/8 = 3/4 (egyszerűsítve 2-vel).'
      ],
      hint: 'Oszd el a nevezőt (8) a 2-vel!',
      formula: '3/8 · 2 = 3/(8 : 2) = 3/4'
    },
    {
      id: 'g5-fm-l2-2',
      question: 'Számítsd ki a nevező osztásával: 5/12 · 3!',
      options: ['5/4', '15/12', '5/36', '15/36'],
      correctAnswer: '5/4',
      explanation: '5/12 · 3 = 5/(12 : 3) = 5/4 (= 1 1/4).',
      breakdown: [
        '1. lépés: A 12 osztható 3-mal: 12 : 3 = 4.',
        '2. lépés: A számláló 5 marad, a nevező 4 lesz.',
        '3. lépés: Eredmény: 5/4 = 1 1/4.'
      ],
      hint: 'A 12-t oszd el 3-mal!',
      formula: '5/12 · 3 = 5/(12 : 3) = 5/4 = 1 1/4'
    },
    {
      id: 'g5-fm-l2-3',
      question: 'Mennyi a 2/9 · 3 szorzás eredménye a legegyszerűbb alakban?',
      options: ['2/3', '6/9', '6/27', '2/27'],
      correctAnswer: '2/3',
      explanation: '2/9 · 3 = 2/(9 : 3) = 2/3 (vagy 6/9 = 2/3).',
      breakdown: [
        '1. lépés: 9 : 3 = 3.',
        '2. lépés: Eredmény: 2/3.'
      ],
      hint: 'Egyszerűsíts 3-mal a nevezőben!',
      formula: '2/9 · 3 = 2/3'
    },
    {
      id: 'g5-fm-l2-4',
      question: 'Mennyi a 3/4 · 3 szorzás eredménye vegyes tört alakban?',
      options: ['2 1/4', '9/4', '1 3/4', '2 3/4'],
      correctAnswer: '2 1/4',
      explanation: '3/4 · 3 = 9/4. Mivel 9 : 4 = 2, maradék 1, ezért 9/4 = 2 1/4.',
      breakdown: [
        '1. lépés: Számláló szorzása: 3 · 3 = 9.',
        '2. lépés: Tört: 9/4.',
        '3. lépés: Vegyes tört alak: 9/4 = 2 1/4.'
      ],
      hint: '9 negyed az hány egész és hány negyed?',
      formula: '3/4 · 3 = 9/4 = 2 1/4'
    },
    {
      id: 'g5-fm-l2-5',
      question: 'Számítsd ki: 3/10 · 5!',
      options: ['1 1/2', '15/10', '3/2', '1 3/10'],
      correctAnswer: '1 1/2',
      explanation: '3/10 · 5 = 3/(10 : 5) = 3/2 = 1 1/2.',
      breakdown: [
        '1. lépés: 10 : 5 = 2.',
        '2. lépés: Tört: 3/2.',
        '3. lépés: Vegyes tört alak: 3/2 = 1 1/2.'
      ],
      hint: 'Oszd el a 10-et 5-tel!',
      formula: '3/10 · 5 = 3/2 = 1 1/2'
    },
    {
      id: 'g5-fm-l2-6',
      question: 'Mennyi a 7/16 · 4 szorzás eredménye vegyes tört alakban?',
      options: ['1 3/4', '7/4', '28/16', '1 1/4'],
      correctAnswer: '1 3/4',
      explanation: '7/16 · 4 = 7/(16 : 4) = 7/4 = 1 3/4.',
      breakdown: [
        '1. lépés: 16 : 4 = 4.',
        '2. lépés: Tört: 7/4.',
        '3. lépés: Vegyes tört alak: 7/4 = 1 3/4.'
      ],
      hint: 'A 16 osztható 4-gyel, a kapott 7/4 vegyes törtként 1 3/4.',
      formula: '7/16 · 4 = 7/4 = 1 3/4'
    },
    {
      id: 'g5-fm-l2-7',
      question: 'Mennyi a 4/5 · 3 szorzás eredménye vegyes tört alakban?',
      options: ['2 2/5', '12/5', '1 2/5', '2 1/5'],
      correctAnswer: '2 2/5',
      explanation: '4/5 · 3 = 12/5 = 2 2/5.',
      breakdown: [
        '1. lépés: 4 · 3 = 12.',
        '2. lépés: 12 : 5 = 2, maradék 2.',
        '3. lépés: 2 2/5.'
      ],
      hint: '12 ötödben az 5 kétszer van meg, marad 2 ötöd.',
      formula: '4/5 · 3 = 12/5 = 2 2/5'
    },
    {
      id: 'g5-fm-l2-8',
      question: 'Melyik számmal kell megszorozni az 1/8-ot, hogy pontosan 3/4-et kapjunk?',
      options: ['6', '3', '4', '8'],
      correctAnswer: '6',
      explanation: '3/4 = 6/8. Tehát 1/8 · 6 = 6/8 = 3/4.',
      breakdown: [
        '1. lépés: A cél a 3/4, ami 8-adokban felírva 6/8.',
        '2. lépés: 1/8-ból 6/8-at 6-tal való szorzással kapunk.'
      ],
      hint: 'Hány nyolcad a 3/4?',
      formula: '1/8 · 6 = 6/8 = 3/4'
    },
    {
      id: 'g5-fm-l2-9',
      question: 'Mennyi az 5/6 · 4 szorzás eredménye vegyes tört alakban a legegyszerűbb formában?',
      options: ['3 1/3', '20/6', '10/3', '3 2/6'],
      correctAnswer: '3 1/3',
      explanation: '5/6 · 4 = 20/6 = 10/3 = 3 1/3.',
      breakdown: [
        '1. lépés: Szorzás: (5 · 4)/6 = 20/6.',
        '2. lépés: Egyszerűsítés 2-vel: 20/6 = 10/3.',
        '3. lépés: Vegyes tört alak: 10/3 = 3 1/3.'
      ],
      hint: '20 hatod egyszerűsítve 10 harmad.',
      formula: '5/6 · 4 = 20/6 = 10/3 = 3 1/3'
    },
    {
      id: 'g5-fm-l2-10',
      question: 'Számítsd ki: 3/4 · 8!',
      options: ['6', '24/4', '24/32', '8'],
      correctAnswer: '6',
      explanation: '3/4 · 8 = 3 · (8 : 4) = 3 · 2 = 6 egész.',
      breakdown: [
        '1. lépés: A 8 osztható 4-gyel: 8 : 4 = 2.',
        '2. lépés: 3 · 2 = 6 egész.'
      ],
      hint: '8 negyed az 2 egész, annak a 3-szorosa 6.',
      formula: '3/4 · 8 = 24/4 = 6'
    }
  ],

  // 3. SZINT: NEHÉZ (10 feladat) - Vegyes törtek szorzása, összetett műveletek, szöveges feladatok
  3: [
    {
      id: 'g5-fm-l3-1',
      question: 'Mennyi az 1 1/3 · 2 vegyes tört szorzás eredménye?',
      options: ['2 2/3', '2 1/3', '1 2/3', '8/3'],
      correctAnswer: '2 2/3',
      explanation: '1 1/3 · 2 = (1 · 2) + (1/3 · 2) = 2 + 2/3 = 2 2/3.',
      breakdown: [
        '1. lépés: Az egész rész szorzása: 1 · 2 = 2.',
        '2. lépés: A törtrész szorzása: 1/3 · 2 = 2/3.',
        '3. lépés: Összegzés: 2 + 2/3 = 2 2/3.'
      ],
      hint: 'Szorozd meg külön az 1 egészet és külön az 1 harmadot!',
      formula: '1 1/3 · 2 = (1 · 2) + (1/3 · 2) = 2 2/3'
    },
    {
      id: 'g5-fm-l3-2',
      question: 'Mennyi a 2 1/4 · 2 szorzás eredménye a legegyszerűbb alakban?',
      options: ['4 1/2', '4 2/4', '4 1/4', '5'],
      correctAnswer: '4 1/2',
      explanation: '2 1/4 · 2 = 4 + 2/4 = 4 2/4 = 4 1/2.',
      breakdown: [
        '1. lépés: 2 · 2 = 4 egész.',
        '2. lépés: 1/4 · 2 = 2/4 = 1/2.',
        '3. lépés: 4 + 1/2 = 4 1/2.'
      ],
      hint: 'A 2 negyed az fél!',
      formula: '2 1/4 · 2 = 4 2/4 = 4 1/2'
    },
    {
      id: 'g5-fm-l3-3',
      question: 'Számítsd ki: 1 2/5 · 3!',
      options: ['4 1/5', '3 6/5', '3 2/5', '4 2/5'],
      correctAnswer: '4 1/5',
      explanation: '1 2/5 · 3 = 3 + 6/5 = 3 + 1 1/5 = 4 1/5.',
      breakdown: [
        '1. lépés: 1 · 3 = 3 és 2/5 · 3 = 6/5.',
        '2. lépés: A 6/5 áltört: 6/5 = 1 1/5.',
        '3. lépés: 3 + 1 1/5 = 4 1/5.'
      ],
      hint: 'A 6 ötödből 1 egészet átviszünk az egészekhez!',
      formula: '1 2/5 · 3 = 3 6/5 = 4 1/5'
    },
    {
      id: 'g5-fm-l3-4',
      question: 'Mennyi a 2 1/2 · 4 szorzás eredménye?',
      options: ['10', '8 4/2', '8 1/2', '12'],
      correctAnswer: '10',
      explanation: '2 1/2 · 4 = 5/2 · 4 = 20/2 = 10 egész.',
      breakdown: [
        '1. lépés (1. mód): (2 · 4) + (1/2 · 4) = 8 + 2 = 10.',
        '2. lépés (2. mód): 5/2 · 4 = 20/2 = 10.'
      ],
      hint: '4 darab két és fél az összesen mennyi?',
      formula: '2 1/2 · 4 = (2 · 4) + (1/2 · 4) = 8 + 2 = 10'
    },
    {
      id: 'g5-fm-l3-5',
      question: 'Egy üvegbe 3/4 liter gyümölcslé fér. Hány liter lé fér 6 ilyen üvegbe?',
      options: ['4 1/2 liter', '18/4 liter', '4 liter', '5 liter'],
      correctAnswer: '4 1/2 liter',
      explanation: '3/4 · 6 = 18/4 = 9/2 = 4 1/2 liter.',
      breakdown: [
        '1. lépés: Művelet felírása: 3/4 · 6.',
        '2. lépés: Számítás: 18/4 = 9/2.',
        '3. lépés: Vegyes tört alak: 9/2 = 4 1/2 liter.'
      ],
      hint: '18 negyed liter az hány liter?',
      formula: '3/4 · 6 = 18/4 = 9/2 = 4 1/2'
    },
    {
      id: 'g5-fm-l3-6',
      question: 'Egy recepthez 2/3 bögre cukor kell 1 adaghoz. Hány bögre cukor kell 4 adag süteményhez?',
      options: ['2 2/3 bögre', '8/3 bögre', '2 1/3 bögre', '3 bögre'],
      correctAnswer: '2 2/3 bögre',
      explanation: '2/3 · 4 = 8/3 = 2 2/3 bögre.',
      breakdown: [
        '1. lépés: 2/3 · 4 = 8/3.',
        '2. lépés: 8 : 3 = 2, maradék 2.',
        '3. lépés: 2 2/3 bögre.'
      ],
      hint: '8 harmad bögre vegyes törtként 2 2/3.',
      formula: '2/3 · 4 = 8/3 = 2 2/3'
    },
    {
      id: 'g5-fm-l3-7',
      question: 'Számítsd ki a művelet eredményét a műveleti sorrend betartásával: 1/2 + 2/3 · 3!',
      options: ['2 1/2', '3 1/2', '7/2', '3'],
      correctAnswer: '2 1/2',
      explanation: 'Először a szorzást végezzük el: 2/3 · 3 = 2. Majd az összeadást: 1/2 + 2 = 2 1/2.',
      breakdown: [
        '1. lépés: Műveleti sorrend: először a szorzás: 2/3 · 3 = 6/3 = 2.',
        '2. lépés: Összeadás: 1/2 + 2 = 2 1/2.'
      ],
      hint: 'A szorzást végezd el legelőször!',
      formula: '1/2 + (2/3 · 3) = 1/2 + 2 = 2 1/2'
    },
    {
      id: 'g5-fm-l3-8',
      question: 'Egy kerékpáros 1 óra alatt 12 1/2 km-t tesz meg. Hány km-t tesz meg 3 óra alatt egyenletes tempóban?',
      options: ['37 1/2 km', '36 1/2 km', '37 km', '38 km'],
      correctAnswer: '37 1/2 km',
      explanation: '12 1/2 · 3 = (12 · 3) + (1/2 · 3) = 36 + 3/2 = 36 + 1 1/2 = 37 1/2 km.',
      breakdown: [
        '1. lépés: Egészek: 12 · 3 = 36.',
        '2. lépés: Törtrész: 1/2 · 3 = 3/2 = 1 1/2.',
        '3. lépés: Összesen: 36 + 1 1/2 = 37 1/2 km.'
      ],
      hint: '36 egészhez add hozzá a 3 fél km-t!',
      formula: '12 1/2 · 3 = 36 + 1 1/2 = 37 1/2'
    },
    {
      id: 'g5-fm-l3-9',
      question: 'Számítsd ki: (1/3 + 1/6) · 4!',
      options: ['2', '1/2 · 4', '4/2', '2 1/2'],
      correctAnswer: '2',
      explanation: 'Zárójelben: 1/3 + 1/6 = 2/6 + 1/6 = 3/6 = 1/2. Szorzás: 1/2 · 4 = 2.',
      breakdown: [
        '1. lépés: Zárójel kiszámítása: 1/3 + 1/6 = 2/6 + 1/6 = 3/6 = 1/2.',
        '2. lépés: Szorzás: 1/2 · 4 = 4/2 = 2 egész.'
      ],
      hint: 'Először a zárójelet számold ki: 1/3 + 1/6 = 1/2!',
      formula: '(1/3 + 1/6) · 4 = 1/2 · 4 = 2'
    },
    {
      id: 'g5-fm-l3-10',
      question: 'Mennyi a 3 1/3 · 3 szorzás eredménye?',
      options: ['10', '9 1/3', '9 3/3', '11'],
      correctAnswer: '10',
      explanation: '3 1/3 · 3 = (3 · 3) + (1/3 · 3) = 9 + 3/3 = 9 + 1 = 10.',
      breakdown: [
        '1. lépés: 3 · 3 = 9.',
        '2. lépés: 1/3 · 3 = 3/3 = 1.',
        '3. lépés: 9 + 1 = 10 egész.'
      ],
      hint: '9 egész és még 3 harmad az összesen 10 egész.',
      formula: '3 1/3 · 3 = 9 + 1 = 10'
    }
  ]
};

export function FractionMultiplyQuiz({ onBack, onSwitchToTheory }: FractionMultiplyQuizProps) {
  return (
    <QuizTemplate
      title="Tört szorzása természetes számmal kvíz"
      subtitle="Gyakorold a számláló szorzását, a nevező osztását és a vegyes törtek szorzását 3 nehézségi szinten!"
      badge="✖️ 5. Osztály • Törtek, tizedes törtek"
      topicId="g5-fraction-multiply-quiz"
      category="fraction-multiply"
      grade={5}
      questions={fractionMultiplyQuestions}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      themeColor="purple"
      renderMatcher={({ level, onNextLevel, onOpenRules }) => (
        <FractionMultiplyMatcher
          level={level}
          onNextLevel={onNextLevel}
          onOpenRules={onOpenRules}
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      )}
      renderSorter={({ level, onNextLevel, onOpenRules }) => (
        <FractionMultiplySorter
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

export default FractionMultiplyQuiz;
