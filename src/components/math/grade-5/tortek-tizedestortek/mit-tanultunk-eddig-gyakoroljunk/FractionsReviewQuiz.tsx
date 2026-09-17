import React from 'react';
import { QuizTemplate, Question, DifficultyLevel } from '../QuizTemplate';
import { FractionsReviewMatcher } from './FractionsReviewMatcher';
import { FractionsReviewSorter } from './FractionsReviewSorter';

export interface FractionsReviewQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

export const fractionsReviewQuestions: Record<DifficultyLevel, Question[]> = {
  // 1. SZINT: KÖNNYŰ (10 feladat) - Törtfogalom, bővítés, egyszerűsítés, azonos nevezőjű műveletek
  1: [
    {
      id: 'g5-fr-l1-1',
      question: 'Melyik tört fejezi ki egy egész 3 egyenlő részéből 2 részt?',
      options: ['2/3', '3/2', '1/3', '2/5'],
      correctAnswer: '2/3',
      explanation: 'A számláló (2) a kijelölt részek száma, a nevező (3) az egész részekre osztásának száma: 2/3.',
      breakdown: [
        '1. lépés: 3 egyenlő részre osztottuk az egészet → Nevező = 3.',
        '2. lépés: 2 részt vettünk belőle → Számláló = 2.',
        '3. lépés: A keresett tört: 2/3.'
      ],
      hint: 'A felső szám a darabszám (2), az alsó az összes rész (3).',
      formula: '2/3'
    },
    {
      id: 'g5-fr-l1-2',
      question: 'Egyszerűsítsd a 12/18 törtet a legegyszerűbb alakra!',
      options: ['2/3', '6/9', '4/6', '3/4'],
      correctAnswer: '2/3',
      explanation: 'A 12 és 18 legnagyobb közös osztója a 6. (12 : 6)/(18 : 6) = 2/3.',
      breakdown: [
        '1. lépés: Megkeressük 12 és 18 legnagyobb közös osztóját: LKO(12, 18) = 6.',
        '2. lépés: Számláló és nevező osztása 6-tal: 12 : 6 = 2, 18 : 6 = 3.',
        '3. lépés: Legegyszerűbb alak: 2/3.'
      ],
      hint: 'Oszd el a számlálót és a nevezőt is 6-tal!',
      formula: '12/18 = (12 : 6)/(18 : 6) = 2/3'
    },
    {
      id: 'g5-fr-l1-3',
      question: 'Bővítsd a 3/5 törtet 4-gyel!',
      options: ['12/20', '7/9', '12/5', '3/20'],
      correctAnswer: '12/20',
      explanation: 'Bővítéskor a számlálót és a nevezőt is megszorozzuk 4-gyel: (3 · 4)/(5 · 4) = 12/20.',
      breakdown: [
        '1. lépés: Számláló szorzása: 3 · 4 = 12.',
        '2. lépés: Nevező szorzása: 5 · 4 = 20.',
        '3. lépés: Bővített tört: 12/20.'
      ],
      hint: 'Szorozd meg a felső és alsó számot is 4-gyel!',
      formula: '3/5 = (3 · 4)/(5 · 4) = 12/20'
    },
    {
      id: 'g5-fr-l1-4',
      question: 'Mennyi az 1/7 + 4/7 összeadás eredménye?',
      options: ['5/7', '5/14', '4/7', '5/49'],
      correctAnswer: '5/7',
      explanation: 'Azonos nevezőjű törtek összeadásakor a számlálókat összeadjuk (1 + 4 = 5), a nevező változatlan marad (7).',
      breakdown: [
        '1. lépés: Nevezők azonosak (7).',
        '2. lépés: Számlálók összege: 1 + 4 = 5.',
        '3. lépés: Végeredmény: 5/7.'
      ],
      hint: 'A nevezőt nem adjuk össze, az 7 marad!',
      formula: '1/7 + 4/7 = 5/7'
    },
    {
      id: 'g5-fr-l1-5',
      question: 'Számítsd ki és egyszerűsítsd: 5/9 - 2/9!',
      options: ['1/3 (azaz 3/9)', '3/0', '7/9', '3/18'],
      correctAnswer: '1/3 (azaz 3/9)',
      explanation: '5/9 - 2/9 = 3/9. Egyszerűsítve 3-mal: 3/9 = 1/3.',
      breakdown: [
        '1. lépés: Kivonás: 5/9 - 2/9 = 3/9.',
        '2. lépés: Egyszerűsítés 3-mal: (3:3)/(9:3) = 1/3.'
      ],
      hint: '5 kilencedből 2 kilenced = 3 kilenced = 1 harmad.',
      formula: '5/9 - 2/9 = 3/9 = 1/3'
    },
    {
      id: 'g5-fr-l1-6',
      question: 'Mennyi a 2/9 · 4 szorzás eredménye?',
      options: ['8/9', '8/36', '6/9', '2/36'],
      correctAnswer: '8/9',
      explanation: 'Tört szorzása egész számmal: a számlálót szorozzuk: (2 · 4)/9 = 8/9.',
      breakdown: [
        '1. lépés: Számláló szorzása: 2 · 4 = 8.',
        '2. lépés: Nevező marad: 9.',
        '3. lépés: 8/9.'
      ],
      hint: 'Csak a számlálót szorozzuk 4-gyel!',
      formula: '2/9 · 4 = 8/9'
    },
    {
      id: 'g5-fr-l1-7',
      question: 'Számítsd ki: 6/11 : 3!',
      options: ['2/11', '6/33', '2/33', '3/11'],
      correctAnswer: '2/11',
      explanation: 'Mivel a 6 osztható 3-mal, a számlálót osztjuk: (6 : 3)/11 = 2/11.',
      breakdown: [
        '1. lépés: 6 : 3 = 2.',
        '2. lépés: Nevező: 11.',
        '3. lépés: Végeredmény: 2/11.'
      ],
      hint: '6 tizenegyed harmada 2 tizenegyed.',
      formula: '6/11 : 3 = 2/11'
    },
    {
      id: 'g5-fr-l1-8',
      question: 'Melyik tört nagyobb: 3/5 vagy 3/7?',
      options: ['3/5, mert kisebb a nevezője, így nagyobbak a részek', '3/7, mert a 7 nagyobb szám', 'Egyenlőek, mert mindkettő számlálója 3', 'Nem lehet eldönteni'],
      correctAnswer: '3/5, mert kisebb a nevezője, így nagyobbak a részek',
      explanation: 'Azonos számlálójú törtek közül az a nagyobb, amelyiknek a nevezője KISEBB, mert az egészet kevesebb, azaz nagyobb szeletekre osztottuk fel.',
      breakdown: [
        '1. lépés: Számlálók azonosak (3).',
        '2. lépés: Az 5-részre osztott szelet nagyobb, mint a 7-részre osztott.',
        '3. lépés: 3/5 > 3/7.'
      ],
      hint: '3 ötöd szelet pizza több, mint 3 heted szelet!',
      formula: '3/5 > 3/7'
    },
    {
      id: 'g5-fr-l1-9',
      question: 'Alakítsd át az 1 3/4 vegyes törtet áltörtté!',
      options: ['7/4', '4/4', '6/4', '4/7'],
      correctAnswer: '7/4',
      explanation: '1 egész = 4/4. Ehhez hozzáadva a 3/4-et: 4/4 + 3/4 = 7/4. (Gyorsan: 1 · 4 + 3 = 7).',
      breakdown: [
        '1. lépés: 1 · 4 = 4 negyed.',
        '2. lépés: 4 + 3 = 7 negyed.',
        '3. lépés: 7/4.'
      ],
      hint: 'Egész szorozva nevezővel plusz számláló.',
      formula: '1 3/4 = (1 · 4 + 3)/4 = 7/4'
    },
    {
      id: 'g5-fr-l1-10',
      question: 'Mit jelent a törtvonal a matematikában?',
      options: ['Osztást', 'Szorzást', 'Összeadást', 'Kivonást'],
      correctAnswer: 'Osztást',
      explanation: 'A törtvonal osztást jelent: a számlálót osztjuk a nevezővel. Pl. 6/2 = 6 : 2 = 3.',
      breakdown: [
        '1. lépés: A törtvonal az osztásművelet (: ) egy másik jelölése.',
        '2. lépés: a/b = a : b.'
      ],
      hint: 'Pl. 4/2 = 4 : 2 = 2.',
      formula: 'a/b = a : b'
    }
  ],

  // 2. SZINT: KÖZEPES (10 feladat) - Különböző nevezők, műveletek, vegyes törtek, szöveges feladatok
  2: [
    {
      id: 'g5-fr-l2-1',
      question: 'Számítsd ki: 1/2 + 1/3!',
      options: ['5/6', '2/5', '1/6', '5/5'],
      correctAnswer: '5/6',
      explanation: 'Közös nevező a 6. 1/2 = 3/6 és 1/3 = 2/6. Összeg: 3/6 + 2/6 = 5/6.',
      breakdown: [
        '1. lépés: LKKT(2, 3) = 6.',
        '2. lépés: Bővítés: 1/2 = 3/6, 1/3 = 2/6.',
        '3. lépés: Összeadás: 3/6 + 2/6 = 5/6.'
      ],
      hint: 'Hozz közös nevezőre (6)!',
      formula: '1/2 + 1/3 = 3/6 + 2/6 = 5/6'
    },
    {
      id: 'g5-fr-l2-2',
      question: 'Mennyi a 3/4 - 1/6 kivonás eredménye?',
      options: ['7/12', '2/12', '1/2', '2/4'],
      correctAnswer: '7/12',
      explanation: 'Közös nevező a 12. 3/4 = 9/12 és 1/6 = 2/12. 9/12 - 2/12 = 7/12.',
      breakdown: [
        '1. lépés: LKKT(4, 6) = 12.',
        '2. lépés: Bővítés: 3/4 = 9/12, 1/6 = 2/12.',
        '3. lépés: Kivonás: 9/12 - 2/12 = 7/12.'
      ],
      hint: 'Közös nevező a 12.',
      formula: '3/4 - 1/6 = 9/12 - 2/12 = 7/12'
    },
    {
      id: 'g5-fr-l2-3',
      question: 'Számítsd ki: 3/5 : 2!',
      options: ['3/10', '6/5', '3/7', '1/5'],
      correctAnswer: '3/10',
      explanation: 'Mivel a 3 nem osztható 2-vel, a nevezőt szorozzuk meg: 3/(5 · 2) = 3/10.',
      breakdown: [
        '1. lépés: A 3 nem osztható 2-vel.',
        '2. lépés: Nevező szorzása: 5 · 2 = 10.',
        '3. lépés: Végeredmény: 3/10.'
      ],
      hint: 'Szorozd meg a nevezőt 2-vel!',
      formula: '3/5 : 2 = 3/(5 · 2) = 3/10'
    },
    {
      id: 'g5-fr-l2-4',
      question: 'Mennyi a 3/8 · 4 szorzás legegyszerűbb alakja?',
      options: ['1 1/2 (azaz 3/2)', '12/8', '3/32', '1 3/8'],
      correctAnswer: '1 1/2 (azaz 3/2)',
      explanation: '3/8 · 4 = 12/8 = 3/2 = 1 1/2 (vagy nevező osztásával: 3/(8:4) = 3/2).',
      breakdown: [
        '1. lépés: 3/8 · 4 = 12/8.',
        '2. lépés: Egyszerűsítés 4-gyel: 12/8 = 3/2.',
        '3. lépés: Vegyes törtként: 1 1/2.'
      ],
      hint: '12 nyolcad egyszerűsítve 3 ketted.',
      formula: '3/8 · 4 = 3/2 = 1 1/2'
    },
    {
      id: 'g5-fr-l2-5',
      question: 'Számítsd ki: 1 1/3 + 2 1/6!',
      options: ['3 1/2 (azaz 3 3/6)', '3 2/9', '3 2/6', '4'],
      correctAnswer: '3 1/2 (azaz 3 3/6)',
      explanation: '1 1/3 = 1 2/6. Összeg: (1 + 2) + (2/6 + 1/6) = 3 3/6 = 3 1/2.',
      breakdown: [
        '1. lépés: Törtrészek közös nevezőre hozása: 1/3 = 2/6.',
        '2. lépés: Egészek: 1 + 2 = 3.',
        '3. lépés: Törtek: 2/6 + 1/6 = 3/6 = 1/2.',
        '4. lépés: Összesen: 3 1/2.'
      ],
      hint: '1/3 = 2/6.',
      formula: '1 2/6 + 2 1/6 = 3 3/6 = 3 1/2'
    },
    {
      id: 'g5-fr-l2-6',
      question: 'Mennyi a 2 - 3/7 kivonás eredménye?',
      options: ['1 4/7', '1 3/7', '2 3/7', '4/7'],
      correctAnswer: '1 4/7',
      explanation: '2 egészből felbontunk 1 egészet: 2 = 1 7/7. Kivonva: 1 7/7 - 3/7 = 1 4/7.',
      breakdown: [
        '1. lépés: 2 = 1 + 7/7.',
        '2. lépés: 7/7 - 3/7 = 4/7.',
        '3. lépés: Végeredmény: 1 4/7.'
      ],
      hint: '1 egész = 7/7, 7-ből vonj ki 3-at!',
      formula: '2 - 3/7 = 1 7/7 - 3/7 = 1 4/7'
    },
    {
      id: 'g5-fr-l2-7',
      question: 'Egy torta 3/8 részét megette Anna, 2/8 részét Béla. A torta hányadrésze maradt meg?',
      options: ['3/8 része', '5/8 része', '1/8 része', '1/2 része'],
      correctAnswer: '3/8 része',
      explanation: 'Megették: 3/8 + 2/8 = 5/8. Maradt: 1 - 5/8 = 8/8 - 5/8 = 3/8.',
      breakdown: [
        '1. lépés: Összes elfogyasztott: 3/8 + 2/8 = 5/8.',
        '2. lépés: Maradék az egészből: 8/8 - 5/8 = 3/8.'
      ],
      hint: '8 szeletből megették az 5-öt, hány maradt?',
      formula: '1 - (3/8 + 2/8) = 8/8 - 5/8 = 3/8'
    },
    {
      id: 'g5-fr-l2-8',
      question: 'Hány perc egy óra 3/4 része?',
      options: ['45 perc', '30 perc', '15 perc', '40 perc'],
      correctAnswer: '45 perc',
      explanation: '1 óra = 60 perc. 60 : 4 = 15 perc (1/4 rész), majd 15 · 3 = 45 perc (3/4 rész).',
      breakdown: [
        '1. lépés: 1 óra = 60 perc.',
        '2. lépés: 1/4 rész: 60 : 4 = 15 perc.',
        '3. lépés: 3/4 rész: 15 · 3 = 45 perc.'
      ],
      hint: '60 perc osztva 4-gyel szorozva 3-mal.',
      formula: '60 : 4 · 3 = 45 perc'
    },
    {
      id: 'g5-fr-l2-9',
      question: 'Mennyi a (1/2 + 1/4) · 4 műveletsor értéke?',
      options: ['3', '2', '1 1/2', '4'],
      correctAnswer: '3',
      explanation: 'Zárójelben: 2/4 + 1/4 = 3/4. Szorzás: 3/4 · 4 = 3.',
      breakdown: [
        '1. lépés: Zárójel: 1/2 + 1/4 = 3/4.',
        '2. lépés: Szorzás: 3/4 · 4 = 3.'
      ],
      hint: 'Előbb a zárójel (3/4), majd szorzás 4-gyel.',
      formula: '(1/2 + 1/4) · 4 = 3/4 · 4 = 3'
    },
    {
      id: 'g5-fr-l2-10',
      question: 'Alakítsd át a 11/3 áltörtet vegyes tört alakba!',
      options: ['3 2/3', '3 1/3', '2 3/3', '4 1/3'],
      correctAnswer: '3 2/3',
      explanation: '11 : 3 = 3 egész, a maradék 2. Így 11/3 = 3 2/3.',
      breakdown: [
        '1. lépés: 11-ben a 3 megvan 3-szor (3 · 3 = 9).',
        '2. lépés: Maradék: 11 - 9 = 2.',
        '3. lépés: Vegyes tört alak: 3 2/3.'
      ],
      hint: 'Hányszor van meg a 3 a 11-ben és mennyi a maradék?',
      formula: '11/3 = 3 2/3'
    }
  ],

  // 3. SZINT: HALADÓ (10 feladat) - Összetett műveleti sorrend, vegyes törtek, fejtörők, szöveges feladatok
  3: [
    {
      id: 'g5-fr-l3-1',
      question: 'Számítsd ki: 1 1/2 : 3 + 1/2 · 3!',
      options: ['2', '1 1/2', '2 1/2', '1'],
      correctAnswer: '2',
      explanation: '1 1/2 : 3 = 3/2 : 3 = 1/2. Másik tag: 1/2 · 3 = 3/2. Összeg: 1/2 + 3/2 = 4/2 = 2.',
      breakdown: [
        '1. lépés: Első művelet: 1 1/2 = 3/2 → 3/2 : 3 = 1/2.',
        '2. lépés: Második művelet: 1/2 · 3 = 3/2.',
        '3. lépés: Összeadás: 1/2 + 3/2 = 4/2 = 2 egész.'
      ],
      hint: 'Fél plusz három fél = négy fél = 2 egész.',
      formula: '1/2 + 3/2 = 4/2 = 2'
    },
    {
      id: 'g5-fr-l3-2',
      question: 'Mennyi a 2 1/4 : 3 osztás eredménye?',
      options: ['3/4', '9/12', '1/4', '2 1/12'],
      correctAnswer: '3/4',
      explanation: '2 1/4 = 9/4. 9/4 : 3 = (9 : 3)/4 = 3/4.',
      breakdown: [
        '1. lépés: Átalakítás: 2 1/4 = 9/4.',
        '2. lépés: Számláló osztása 3-mal: 9 : 3 = 3.',
        '3. lépés: Végeredmény: 3/4.'
      ],
      hint: '2 1/4 = 9/4, a 9 osztható 3-mal.',
      formula: '2 1/4 : 3 = 9/4 : 3 = 3/4'
    },
    {
      id: 'g5-fr-l3-3',
      question: 'Számítsd ki: 1 - (1/3 + 1/4)!',
      options: ['5/12', '7/12', '1/12', '1/2'],
      correctAnswer: '5/12',
      explanation: 'Zárójelben: 4/12 + 3/12 = 7/12. Kivonva 1-ből: 12/12 - 7/12 = 5/12.',
      breakdown: [
        '1. lépés: Zárójel: 1/3 + 1/4 = 4/12 + 3/12 = 7/12.',
        '2. lépés: 1 egészből kivonva: 12/12 - 7/12 = 5/12.'
      ],
      hint: '12/12 - 7/12.',
      formula: '1 - 7/12 = 5/12'
    },
    {
      id: 'g5-fr-l3-4',
      question: 'Egy 30 fős osztály 2/5 része fiú. Hány LÁNY jár az osztályba?',
      options: ['18 lány', '12 lány', '15 lány', '20 lány'],
      correctAnswer: '18 lány',
      explanation: 'Fiúk száma: 30 : 5 · 2 = 12 fő. Lányok száma: 30 - 12 = 18 fő (vagy 30 · 3/5 = 18).',
      breakdown: [
        '1. lépés: 1/5 rész: 30 : 5 = 6 fő.',
        '2. lépés: Fiúk: 6 · 2 = 12 fő.',
        '3. lépés: Lányok: 30 - 12 = 18 fő.'
      ],
      hint: 'Ha a fiúk 2/5 rész, akkor a lányok a 3/5 rész!',
      formula: '30 - 12 = 18'
    },
    {
      id: 'g5-fr-l3-5',
      question: 'Számítsd ki: (2/3 + 1/6) : 5!',
      options: ['1/6', '5/6', '1/5', '1/30'],
      correctAnswer: '1/6',
      explanation: 'Zárójel: 4/6 + 1/6 = 5/6. Osztás 5-tel: 5/6 : 5 = (5 : 5)/6 = 1/6.',
      breakdown: [
        '1. lépés: 2/3 = 4/6 → 4/6 + 1/6 = 5/6.',
        '2. lépés: 5/6 : 5 = 1/6.'
      ],
      hint: '5/6 ötödrésze 1/6.',
      formula: '(2/3 + 1/6) : 5 = 5/6 : 5 = 1/6'
    },
    {
      id: 'g5-fr-l3-6',
      question: 'Melyik tört hiányzik a négyzetből: 3/4 + ■ = 1 1/4?',
      options: ['1/2 (azaz 2/4)', '1/4', '3/4', '1'],
      correctAnswer: '1/2 (azaz 2/4)',
      explanation: '1 1/4 = 5/4. A hiányzó tag: 5/4 - 3/4 = 2/4 = 1/2.',
      breakdown: [
        '1. lépés: 1 1/4 = 5/4.',
        '2. lépés: 5/4 - 3/4 = 2/4.',
        '3. lépés: 2/4 = 1/2.'
      ],
      hint: '3 negyedhez mennyit kell adni, hogy 5 negyed legyen?',
      formula: '5/4 - 3/4 = 2/4 = 1/2'
    },
    {
      id: 'g5-fr-l3-7',
      question: 'Számítsd ki: 2 · (3/4 - 1/2) + 1/2!',
      options: ['1', '1/2', '1 1/2', '2'],
      correctAnswer: '1',
      explanation: 'Zárójel: 3/4 - 2/4 = 1/4. Szorzás: 2 · 1/4 = 2/4 = 1/2. Összeadás: 1/2 + 1/2 = 1.',
      breakdown: [
        '1. lépés: Zárójel: 3/4 - 1/2 = 1/4.',
        '2. lépés: Szorzás: 2 · 1/4 = 1/2.',
        '3. lépés: Összeadás: 1/2 + 1/2 = 1.'
      ],
      hint: 'Lépésenként: 2 · 1/4 = 1/2, majd 1/2 + 1/2 = 1.',
      formula: '2 · 1/4 + 1/2 = 1/2 + 1/2 = 1'
    },
    {
      id: 'g5-fr-l3-8',
      question: 'Péter zsebpénzének 1/4 részét csokira költötte, 1/2 részét könyvre, és maradt 500 Ft-ja. Mennyi volt az összes zsebpénze?',
      options: ['2000 Ft', '1500 Ft', '1000 Ft', '2500 Ft'],
      correctAnswer: '2000 Ft',
      explanation: 'Elköltött: 1/4 + 1/2 = 3/4 részt. A maradék 1/4 rész = 500 Ft. Az egész zsebpénz: 500 · 4 = 2000 Ft.',
      breakdown: [
        '1. lépés: Elköltött törtrész: 1/4 + 2/4 = 3/4.',
        '2. lépés: Maradék törtrész: 4/4 - 3/4 = 1/4.',
        '3. lépés: Ha 1/4 rész = 500 Ft, akkor a 4/4 rész = 500 · 4 = 2000 Ft.'
      ],
      hint: 'A megmaradt 500 Ft a zsebpénz egynegyede.',
      formula: '500 · 4 = 2000 Ft'
    },
    {
      id: 'g5-fr-l3-9',
      question: 'Mennyi a 3 1/3 : 5 · 3 kifejezés értéke?',
      options: ['2', '1', '3', '2/3'],
      correctAnswer: '2',
      explanation: '3 1/3 = 10/3. Balról jobbra haladva: 10/3 : 5 = 2/3. Ezután 2/3 · 3 = 6/3 = 2.',
      breakdown: [
        '1. lépés: 3 1/3 = 10/3.',
        '2. lépés: 10/3 : 5 = 2/3.',
        '3. lépés: 2/3 · 3 = 2.'
      ],
      hint: '10/3 osztva 5-tel az 2/3, szorozva 3-mal az 2.',
      formula: '10/3 : 5 · 3 = 2/3 · 3 = 2'
    },
    {
      id: 'g5-fr-l3-10',
      question: 'Melyik relációs jel tehető a kettő közé: 2/3 + 1/4 ■ 1?',
      options: ['< (kisebb)', '> (nagyobb)', '= (egyenlő)', '≤ (kisebb vagy egyenlő)'],
      correctAnswer: '< (kisebb)',
      explanation: '2/3 + 1/4 = 8/12 + 3/12 = 11/12. Mivel 11/12 < 12/12 (1 egész), ezért a jel: <.',
      breakdown: [
        '1. lépés: Közös nevező a 12: 2/3 = 8/12, 1/4 = 3/12.',
        '2. lépés: 8/12 + 3/12 = 11/12.',
        '3. lépés: 11/12 < 1.'
      ],
      hint: '11 tizenketted kevesebb mint 12 tizenketted (1 egész).',
      formula: '11/12 < 1'
    }
  ]
};

export function FractionsReviewQuiz({ onBack, onSwitchToTheory }: FractionsReviewQuizProps) {
  return (
    <QuizTemplate
      title="Törtek átfogó gyakorló kvíz"
      subtitle="Mérd fel a tudásodat a közönséges törtek minden témaköréből 30 feladaton keresztül!"
      badge="📚 5. Osztály • Törtek összefoglalása"
      topicId="g5-fractions-review-quiz"
      category="fractions-review"
      grade={5}
      questions={fractionsReviewQuestions}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      themeColor="rose"
      renderMatcher={({ level, onNextLevel, onOpenRules }) => (
        <FractionsReviewMatcher
          level={level}
          onNextLevel={onNextLevel}
          onOpenRules={onOpenRules}
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      )}
      renderSorter={({ level, onNextLevel, onOpenRules }) => (
        <FractionsReviewSorter
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

export default FractionsReviewQuiz;
