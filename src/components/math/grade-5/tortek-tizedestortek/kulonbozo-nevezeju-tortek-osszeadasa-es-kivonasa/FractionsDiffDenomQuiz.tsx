import React from 'react';
import { QuizTemplate, Question, DifficultyLevel } from '../QuizTemplate';
import { FractionsDiffDenomMatcher } from './FractionsDiffDenomMatcher';
import { FractionsDiffDenomSorter } from './FractionsDiffDenomSorter';

export interface FractionsDiffDenomQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

export const fractionsDiffDenomQuestions: Record<DifficultyLevel, Question[]> = {
  // 1. SZINT: KÖNNYŰ (10 feladat) - Egyik nevező a másik többszöröse vagy egyszerű relatív prímek
  1: [
    {
      id: 'g5-fdd-l1-1',
      question: 'Mennyi a következő összeadás eredménye: 1/2 + 1/4?',
      options: ['3/4', '2/6', '2/4', '1/6'],
      correctAnswer: '3/4',
      explanation: 'A közös nevező a 4. Az 1/2 bővítve 2-vel = 2/4. Így 2/4 + 1/4 = 3/4.',
      breakdown: [
        '1. lépés: Közös nevező megkeresése: LKKT(2, 4) = 4.',
        '2. lépés: Bővítés: 1/2 = (1·2)/(2·2) = 2/4.',
        '3. lépés: Összeadás: 2/4 + 1/4 = 3/4.'
      ],
      hint: 'Hozd az 1/2-et 4-edekre!',
      formula: '1/2 + 1/4 = 2/4 + 1/4 = 3/4'
    },
    {
      id: 'g5-fdd-l1-2',
      question: 'Mennyi a 3/4 - 1/2 kivonás eredménye?',
      options: ['1/4', '2/2', '2/4', '1/2'],
      correctAnswer: '1/4',
      explanation: 'A közös nevező 4. Az 1/2 bővítve 2/4. 3/4 - 2/4 = 1/4.',
      breakdown: [
        '1. lépés: Közös nevező: 4.',
        '2. lépés: 1/2 = 2/4.',
        '3. lépés: 3/4 - 2/4 = 1/4.'
      ],
      hint: 'Vonj ki 2 negyedet a 3 negyedből!',
      formula: '3/4 - 1/2 = 3/4 - 2/4 = 1/4'
    },
    {
      id: 'g5-fdd-l1-3',
      question: 'Mennyi a legkisebb közös nevezője az 1/3 és 1/6 törteknek?',
      options: ['6', '3', '18', '9'],
      correctAnswer: '6',
      explanation: 'Mivel a 6 osztható 3-mal, a legkisebb közös többszörös maga a 6.',
      breakdown: [
        '1. lépés: Megvizsgáljuk a nagyobb nevezőt (6).',
        '2. lépés: 6 osztható 3-mal (6 : 3 = 2), tehát a 6 a legkisebb közös nevező.'
      ],
      hint: 'Osztható-e a 6 a 3-mal?',
      formula: 'LKKT(3, 6) = 6'
    },
    {
      id: 'g5-fdd-l1-4',
      question: 'Számítsd ki: 1/3 + 1/6!',
      options: ['1/2', '2/9', '2/6', '4/6'],
      correctAnswer: '1/2',
      explanation: '1/3 = 2/6. 2/6 + 1/6 = 3/6. Egyszerűsítve 3-mal: 3/6 = 1/2.',
      breakdown: [
        '1. lépés: Közös nevezőre hozás: 1/3 = 2/6.',
        '2. lépés: Összeadás: 2/6 + 1/6 = 3/6.',
        '3. lépés: Egyszerűsítés 3-mal: 3/6 = 1/2.'
      ],
      hint: 'Ne felejtsd el az egyszerűsítést a végén!',
      formula: '1/3 + 1/6 = 2/6 + 1/6 = 3/6 = 1/2'
    },
    {
      id: 'g5-fdd-l1-5',
      question: 'Mennyi a 5/6 - 1/3 kivonás eredménye a legegyszerűbb alakban?',
      options: ['1/2', '4/3', '3/6', '4/6'],
      correctAnswer: '1/2',
      explanation: '5/6 - 2/6 = 3/6 = 1/2.',
      breakdown: [
        '1. lépés: 1/3 bővítése 2-vel = 2/6.',
        '2. lépés: Kivonás: 5/6 - 2/6 = 3/6.',
        '3. lépés: Legegyszerűbb alak: 3/6 = 1/2.'
      ],
      hint: '5 hatodból vonj ki 2 hatodot!',
      formula: '5/6 - 2/6 = 3/6 = 1/2'
    },
    {
      id: 'g5-fdd-l1-6',
      question: 'Mi a legkisebb közös nevezője az 1/2 és 1/3 törteknek?',
      options: ['6', '5', '3', '12'],
      correctAnswer: '6',
      explanation: 'A 2 és a 3 relatív prímek (nincs 1-nél nagyobb közös osztójuk), így közös nevezőjük a szorzatuk: 2 · 3 = 6.',
      breakdown: [
        '1. lépés: 2 és 3 relatív prímek.',
        '2. lépés: LKKT(2, 3) = 2 · 3 = 6.'
      ],
      hint: 'Szorozd össze a két prímszámot!',
      formula: 'LKKT(2, 3) = 2 · 3 = 6'
    },
    {
      id: 'g5-fdd-l1-7',
      question: 'Mennyi az 1/2 + 1/3 összeadás eredménye?',
      options: ['5/6', '2/5', '2/6', '3/5'],
      correctAnswer: '5/6',
      explanation: 'Közös nevező 6. 1/2 = 3/6, 1/3 = 2/6. 3/6 + 2/6 = 5/6.',
      breakdown: [
        '1. lépés: Közös nevező: 6.',
        '2. lépés: Bővítések: 1/2 = 3/6 és 1/3 = 2/6.',
        '3. lépés: Összeadás: 3/6 + 2/6 = 5/6.'
      ],
      hint: 'Mindkét törtet 6-odokra kell bővíteni!',
      formula: '1/2 + 1/3 = 3/6 + 2/6 = 5/6'
    },
    {
      id: 'g5-fdd-l1-8',
      question: 'Mennyi az 1/2 - 1/3 kivonás eredménye?',
      options: ['1/6', '0', '1/5', '2/6'],
      correctAnswer: '1/6',
      explanation: '1/2 = 3/6, 1/3 = 2/6. 3/6 - 2/6 = 1/6.',
      breakdown: [
        '1. lépés: Bővítés 6-odokra: 3/6 és 2/6.',
        '2. lépés: Kivonás: 3/6 - 2/6 = 1/6.'
      ],
      hint: '3 hatodból vonj ki 2 hatodot!',
      formula: '1/2 - 1/3 = 3/6 - 2/6 = 1/6'
    },
    {
      id: 'g5-fdd-l1-9',
      question: 'Mennyi a 2/5 + 3/10 összeadás eredménye?',
      options: ['7/10', '5/15', '5/10', '1/2'],
      correctAnswer: '7/10',
      explanation: '2/5 = 4/10. 4/10 + 3/10 = 7/10.',
      breakdown: [
        '1. lépés: Közös nevező a 10.',
        '2. lépés: 2/5 = 4/10.',
        '3. lépés: 4/10 + 3/10 = 7/10.'
      ],
      hint: 'Bővítsd a 2/5-öt 2-vel tizedekre!',
      formula: '2/5 + 3/10 = 4/10 + 3/10 = 7/10'
    },
    {
      id: 'g5-fdd-l1-10',
      question: 'Mennyi a 7/8 - 1/2 kivonás eredménye?',
      options: ['3/8', '6/6', '5/8', '1/4'],
      correctAnswer: '3/8',
      explanation: '1/2 = 4/8. 7/8 - 4/8 = 3/8.',
      breakdown: [
        '1. lépés: 1/2 = 4/8.',
        '2. lépés: 7/8 - 4/8 = 3/8.'
      ],
      hint: 'Az 1/2 az 4 nyolcad.',
      formula: '7/8 - 1/2 = 7/8 - 4/8 = 3/8'
    }
  ],

  // 2. SZINT: KÖZEPES (10 feladat) - Különböző nevezők LKKT-val, egyszerűsítéssel, áltörtté válással
  2: [
    {
      id: 'g5-fdd-l2-1',
      question: 'Mennyi az 1/3 + 1/4 összeadás eredménye?',
      options: ['7/12', '2/7', '2/12', '5/12'],
      correctAnswer: '7/12',
      explanation: 'LKKT(3, 4) = 12. 1/3 = 4/12, 1/4 = 3/12. 4/12 + 3/12 = 7/12.',
      breakdown: [
        '1. lépés: Közös nevező: 3 · 4 = 12.',
        '2. lépés: Bővítések: 1/3 = 4/12 és 1/4 = 3/12.',
        '3. lépés: Összeadás: 4/12 + 3/12 = 7/12.'
      ],
      hint: 'A 3 és 4 legkisebb közös nevezője a 12.',
      formula: '1/3 + 1/4 = 4/12 + 3/12 = 7/12'
    },
    {
      id: 'g5-fdd-l2-2',
      question: 'Mennyi a 3/4 - 1/3 kivonás eredménye?',
      options: ['5/12', '2/1', '2/12', '1/12'],
      correctAnswer: '5/12',
      explanation: '3/4 = 9/12, 1/3 = 4/12. 9/12 - 4/12 = 5/12.',
      breakdown: [
        '1. lépés: Közös nevező a 12.',
        '2. lépés: 3/4 = 9/12, 1/3 = 4/12.',
        '3. lépés: 9/12 - 4/12 = 5/12.'
      ],
      hint: 'Bővítsd a 3/4-et 3-mal, az 1/3-ot 4-gyel!',
      formula: '3/4 - 1/3 = 9/12 - 4/12 = 5/12'
    },
    {
      id: 'g5-fdd-l2-3',
      question: 'Mi a legkisebb közös nevezője a 4 és a 6 nevezőknek?',
      options: ['12', '24', '10', '16'],
      correctAnswer: '12',
      explanation: 'Bár a 24 is közös többszörös, a legkisebb a 12 (12 osztható 4-gyel és 6-tal is).',
      breakdown: [
        '1. lépés: 6 többszörösei: 6, 12, 18, 24...',
        '2. lépés: A 12 osztható 4-gyel is (12 : 4 = 3).',
        '3. lépés: Tehát a legkisebb közös nevező a 12.'
      ],
      hint: 'Vegyük a 6 többszöröseit: melyik az első, ami osztható 4-gyel?',
      formula: 'LKKT(4, 6) = 12'
    },
    {
      id: 'g5-fdd-l2-4',
      question: 'Számítsd ki: 3/4 + 1/6!',
      options: ['11/12', '4/10', '4/12', '5/6'],
      correctAnswer: '11/12',
      explanation: 'LKKT(4, 6) = 12. 3/4 = 9/12, 1/6 = 2/12. 9/12 + 2/12 = 11/12.',
      breakdown: [
        '1. lépés: Közös nevező a 12.',
        '2. lépés: 3/4 = 9/12 és 1/6 = 2/12.',
        '3. lépés: 9/12 + 2/12 = 11/12.'
      ],
      hint: 'A közös nevező 12, a szorzók 3 és 2.',
      formula: '3/4 + 1/6 = 9/12 + 2/12 = 11/12'
    },
    {
      id: 'g5-fdd-l2-5',
      question: 'Mennyi az 5/6 - 3/4 kivonás eredménye?',
      options: ['1/12', '2/2', '2/12', '1/6'],
      correctAnswer: '1/12',
      explanation: '5/6 = 10/12, 3/4 = 9/12. 10/12 - 9/12 = 1/12.',
      breakdown: [
        '1. lépés: Közös nevező: 12.',
        '2. lépés: 5/6 = 10/12 és 3/4 = 9/12.',
        '3. lépés: 10/12 - 9/12 = 1/12.'
      ],
      hint: '10 tizenkettedből vonj ki 9 tizenkettedet!',
      formula: '5/6 - 3/4 = 10/12 - 9/12 = 1/12'
    },
    {
      id: 'g5-fdd-l2-6',
      question: 'Mennyi a 2/5 + 1/2 összeadás eredménye?',
      options: ['9/10', '3/7', '3/10', '1 1/10'],
      correctAnswer: '9/10',
      explanation: 'Közös nevező 10. 2/5 = 4/10, 1/2 = 5/10. 4/10 + 5/10 = 9/10.',
      breakdown: [
        '1. lépés: LKKT(5, 2) = 10.',
        '2. lépés: 2/5 = 4/10 és 1/2 = 5/10.',
        '3. lépés: 4/10 + 5/10 = 9/10.'
      ],
      hint: 'Bővítsd mindkét törtet tizedekre!',
      formula: '2/5 + 1/2 = 4/10 + 5/10 = 9/10'
    },
    {
      id: 'g5-fdd-l2-7',
      question: 'Számítsd ki és egyszerűsítsd: 5/6 - 3/10!',
      options: ['8/15', '2/4', '16/30', '1/2'],
      correctAnswer: '8/15',
      explanation: 'LKKT(6, 10) = 30. 5/6 = 25/30, 3/10 = 9/30. 25/30 - 9/30 = 16/30 = 8/15.',
      breakdown: [
        '1. lépés: Közös nevező: 30.',
        '2. lépés: 5/6 = 25/30 és 3/10 = 9/30.',
        '3. lépés: Kivonás: 25/30 - 9/30 = 16/30.',
        '4. lépés: Egyszerűsítés 2-vel: 16/30 = 8/15.'
      ],
      hint: 'A 16/30 egyszerűsíthető 2-vel!',
      formula: '5/6 - 3/10 = 25/30 - 9/30 = 16/30 = 8/15'
    },
    {
      id: 'g5-fdd-l2-8',
      question: 'Mennyi a 2/3 + 3/4 összeadás eredménye vegyes tört alakban?',
      options: ['1 5/12', '5/7', '17/12', '1 7/12'],
      correctAnswer: '1 5/12',
      explanation: '2/3 = 8/12, 3/4 = 9/12. 8/12 + 9/12 = 17/12 = 1 5/12.',
      breakdown: [
        '1. lépés: Közös nevező 12: 8/12 + 9/12.',
        '2. lépés: Számlálók összege: 17/12.',
        '3. lépés: Vegyes tört alak: 17/12 = 1 5/12.'
      ],
      hint: '17 tizenkettedből 12 tizenketted kiad 1 egészet, marad 5 tizenketted.',
      formula: '2/3 + 3/4 = 8/12 + 9/12 = 17/12 = 1 5/12'
    },
    {
      id: 'g5-fdd-l2-9',
      question: 'Mennyi a 7/10 - 2/5 kivonás eredménye a legegyszerűbb alakban?',
      options: ['3/10', '5/5', '1/5', '5/10'],
      correctAnswer: '3/10',
      explanation: '2/5 = 4/10. 7/10 - 4/10 = 3/10.',
      breakdown: [
        '1. lépés: 2/5 = 4/10.',
        '2. lépés: 7/10 - 4/10 = 3/10.'
      ],
      hint: 'A 2/5 az 4 tized.',
      formula: '7/10 - 2/5 = 7/10 - 4/10 = 3/10'
    },
    {
      id: 'g5-fdd-l2-10',
      question: 'Melyik tört hiányzik az egyenlőségből: 1/4 + ... = 5/8?',
      options: ['3/8', '4/4', '1/2', '1/8'],
      correctAnswer: '3/8',
      explanation: '5/8 - 1/4 = 5/8 - 2/8 = 3/8.',
      breakdown: [
        '1. lépés: A hiányzó tag kivonással számolható: 5/8 - 1/4.',
        '2. lépés: 1/4 = 2/8.',
        '3. lépés: 5/8 - 2/8 = 3/8.'
      ],
      hint: 'Vonj ki 1/4-et (azaz 2/8-ot) az 5/8-ból!',
      formula: '5/8 - 1/4 = 5/8 - 2/8 = 3/8'
    }
  ],

  // 3. SZINT: NEHÉZ (10 feladat) - Vegyes törtek, 3 tagú műveletek, szöveges feladatok
  3: [
    {
      id: 'g5-fdd-l3-1',
      question: 'Mennyi a következő vegyes törtek összege: 1 1/2 + 2 1/3?',
      options: ['3 5/6', '3 2/5', '3 2/6', '4 1/6'],
      correctAnswer: '3 5/6',
      explanation: 'Egészek: 1 + 2 = 3. Törtrész: 1/2 + 1/3 = 3/6 + 2/6 = 5/6. Eredmény: 3 5/6.',
      breakdown: [
        '1. lépés: Egész részek összege: 1 + 2 = 3.',
        '2. lépés: Törtrészek közös nevezőre hozása: 1/2 = 3/6, 1/3 = 2/6.',
        '3. lépés: Törtrészek összege: 3/6 + 2/6 = 5/6.',
        '4. lépés: Összesen: 3 5/6.'
      ],
      hint: 'Add össze külön az egészeket, és külön a 6-odokra bővített törteket!',
      formula: '1 1/2 + 2 1/3 = 1 3/6 + 2 2/6 = 3 5/6'
    },
    {
      id: 'g5-fdd-l3-2',
      question: 'Számítsd ki: 3 1/2 - 1 1/4!',
      options: ['2 1/4', '2 1/2', '2 0/2', '1 3/4'],
      correctAnswer: '2 1/4',
      explanation: '3 1/2 = 3 2/4. 3 2/4 - 1 1/4 = 2 1/4.',
      breakdown: [
        '1. lépés: Közös nevező a 4: 1/2 = 2/4.',
        '2. lépés: 3 2/4 - 1 1/4 = (3 - 1) + (2/4 - 1/4) = 2 1/4.'
      ],
      hint: 'A fél az 2 negyed.',
      formula: '3 2/4 - 1 1/4 = 2 1/4'
    },
    {
      id: 'g5-fdd-l3-3',
      question: 'Mennyi a 2 1/3 - 1 1/2 kivonás eredménye?',
      options: ['5/6', '1 1/6', '1 2/1', '1 1/1'],
      correctAnswer: '5/6',
      explanation: '2 1/3 = 2 2/6 = 1 8/6. 1 1/2 = 1 3/6. 1 8/6 - 1 3/6 = 5/6.',
      breakdown: [
        '1. lépés: Közös nevező: 6. 2 1/3 = 2 2/6, 1 1/2 = 1 3/6.',
        '2. lépés: Mivel 2/6 < 3/6, 1 egészet felváltunk: 2 2/6 = 1 8/6.',
        '3. lépés: Kivonás: 1 8/6 - 1 3/6 = 5/6.'
      ],
      hint: 'A 2 2/6-ból kölcsön kell venni 1 egészet (ami 6/6), így 1 8/6 lesz!',
      formula: '2 1/3 - 1 1/2 = 2 2/6 - 1 3/6 = 1 8/6 - 1 3/6 = 5/6'
    },
    {
      id: 'g5-fdd-l3-4',
      question: 'Számítsd ki a 3 tagú műveletet: 1 - 1/3 - 1/4!',
      options: ['5/12', '7/12', '1/7', '1/12'],
      correctAnswer: '5/12',
      explanation: '1 = 12/12, 1/3 = 4/12, 1/4 = 3/12. 12/12 - 4/12 - 3/12 = 5/12.',
      breakdown: [
        '1. lépés: Közös nevező a 12.',
        '2. lépés: 1 = 12/12, 1/3 = 4/12, 1/4 = 3/12.',
        '3. lépés: 12/12 - 4/12 = 8/12.',
        '4. lépés: 8/12 - 3/12 = 5/12.'
      ],
      hint: 'Írd fel az 1 egészet 12/12-ként!',
      formula: '12/12 - 4/12 - 3/12 = 5/12'
    },
    {
      id: 'g5-fdd-l3-5',
      question: 'Számítsd ki: 1/2 + 1/3 + 1/6!',
      options: ['1', '5/6', '3/11', '1 1/6'],
      correctAnswer: '1',
      explanation: '1/2 = 3/6, 1/3 = 2/6, 1/6 = 1/6. 3/6 + 2/6 + 1/6 = 6/6 = 1.',
      breakdown: [
        '1. lépés: Közös nevező: 6.',
        '2. lépés: 3/6 + 2/6 + 1/6 = 6/6.',
        '3. lépés: 6/6 = 1 egész.'
      ],
      hint: 'Hozd mindhárom törtet 6-odokra!',
      formula: '3/6 + 2/6 + 1/6 = 6/6 = 1'
    },
    {
      id: 'g5-fdd-l3-6',
      question: 'Peti megevett a tortából 1/4 részt, Anna 1/3 részt. A torta hányadrésze maradt meg?',
      options: ['5/12', '7/12', '2/7', '1/12'],
      correctAnswer: '5/12',
      explanation: 'Megeszegetett rész: 1/4 + 1/3 = 3/12 + 4/12 = 7/12. Maradék: 1 - 7/12 = 12/12 - 7/12 = 5/12.',
      breakdown: [
        '1. lépés: Összesen elfogyott: 1/4 + 1/3 = 3/12 + 4/12 = 7/12.',
        '2. lépés: A teljes torta 1 egész = 12/12.',
        '3. lépés: Maradék: 12/12 - 7/12 = 5/12.'
      ],
      hint: 'Először add össze, mennyit ettek meg ketten összesen!',
      formula: '1 - (1/4 + 1/3) = 12/12 - 7/12 = 5/12'
    },
    {
      id: 'g5-fdd-l3-7',
      question: 'Mennyi a 3 1/4 - 1 2/3 kivonás eredménye?',
      options: ['1 7/12', '2 1/1', '1 5/12', '2 5/12'],
      correctAnswer: '1 7/12',
      explanation: '3 1/4 = 3 3/12 = 2 15/12. 1 2/3 = 1 8/12. 2 15/12 - 1 8/12 = 1 7/12.',
      breakdown: [
        '1. lépés: Közös nevező 12: 3 3/12 és 1 8/12.',
        '2. lépés: Kölcsönkérés az egészből: 3 3/12 = 2 15/12.',
        '3. lépés: Kivonás: (2 - 1) + (15/12 - 8/12) = 1 7/12.'
      ],
      hint: 'A 3 3/12-ből 1 egészet fel kell váltani 12/12-re, így 2 15/12 lesz.',
      formula: '3 1/4 - 1 2/3 = 2 15/12 - 1 8/12 = 1 7/12'
    },
    {
      id: 'g5-fdd-l3-8',
      question: 'Egy kiránduláson az út 2/5 részét délelőtt, 1/3 részét kora délután tettük meg. Az út hányadrésze van még hátra?',
      options: ['4/15', '11/15', '3/8', '1/5'],
      correctAnswer: '4/15',
      explanation: 'Megtett út: 2/5 + 1/3 = 6/15 + 5/15 = 11/15. Hátralévő: 1 - 11/15 = 4/15.',
      breakdown: [
        '1. lépés: Megtett út összege: 2/5 + 1/3 = 6/15 + 5/15 = 11/15.',
        '2. lépés: Hátralévő rész: 15/15 - 11/15 = 4/15.'
      ],
      hint: 'Közös nevező a 15 (5 · 3 = 15).',
      formula: '1 - (2/5 + 1/3) = 15/15 - 11/15 = 4/15'
    },
    {
      id: 'g5-fdd-l3-9',
      question: 'Számítsd ki és egyszerűsítsd: 5/8 + 7/12 - 1/4!',
      options: ['23/24', '11/12', '19/24', '1'],
      correctAnswer: '23/24',
      explanation: 'LKKT(8, 12, 4) = 24. 5/8 = 15/24, 7/12 = 14/24, 1/4 = 6/24. 15/24 + 14/24 - 6/24 = 23/24.',
      breakdown: [
        '1. lépés: Közös nevező a 24.',
        '2. lépés: Bővítések: 5/8 = 15/24, 7/12 = 14/24, 1/4 = 6/24.',
        '3. lépés: Műveletek: 15/24 + 14/24 = 29/24; 29/24 - 6/24 = 23/24.'
      ],
      hint: 'A 8, 12 és 4 legkisebb közös nevezője a 24.',
      formula: '15/24 + 14/24 - 6/24 = 23/24'
    },
    {
      id: 'g5-fdd-l3-10',
      question: 'Mennyi a 2 2/3 + 1 3/4 összeadás eredménye a legegyszerűbb vegyes tört alakban?',
      options: ['4 5/12', '3 5/7', '3 17/12', '4 1/12'],
      correctAnswer: '4 5/12',
      explanation: '2 8/12 + 1 9/12 = 3 17/12 = 4 5/12.',
      breakdown: [
        '1. lépés: Közös nevező a 12: 2 8/12 + 1 9/12.',
        '2. lépés: Összeg: 3 17/12.',
        '3. lépés: 17/12 = 1 5/12, így az egészek száma 3 + 1 = 4. Végeredmény: 4 5/12.'
      ],
      hint: 'A 3 17/12-ben a 17/12 áltört, abból 1 egészet átviszünk!',
      formula: '2 8/12 + 1 9/12 = 3 17/12 = 4 5/12'
    }
  ]
};

export function FractionsDiffDenomQuiz({ onBack, onSwitchToTheory }: FractionsDiffDenomQuizProps) {
  return (
    <QuizTemplate
      title="Különböző nevezőjű törtek összeadása és kivonása kvíz"
      subtitle="Gyakorold a közös nevezőre hozást, a bővítést és a műveleteket 3 nehézségi szinten!"
      badge="➕ 5. Osztály • Törtek, tizedes törtek"
      topicId="g5-fractions-diff-denom-quiz"
      category="fractions-diff-denom"
      grade={5}
      questions={fractionsDiffDenomQuestions}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      themeColor="teal"
      renderMatcher={({ level, onNextLevel, onOpenRules }) => (
        <FractionsDiffDenomMatcher
          level={level}
          onNextLevel={onNextLevel}
          onOpenRules={onOpenRules}
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      )}
      renderSorter={({ level, onNextLevel, onOpenRules }) => (
        <FractionsDiffDenomSorter
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

export default FractionsDiffDenomQuiz;
