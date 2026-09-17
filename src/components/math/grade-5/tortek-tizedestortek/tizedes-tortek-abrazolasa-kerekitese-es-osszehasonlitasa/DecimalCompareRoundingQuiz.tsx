import React from 'react';
import { QuizTemplate, Question, DifficultyLevel } from '../QuizTemplate';
import { DecimalCompareRoundingMatcher } from './DecimalCompareRoundingMatcher';
import { DecimalCompareRoundingSorter } from './DecimalCompareRoundingSorter';

export interface DecimalCompareRoundingQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

export const decimalCompareRoundingQuestions: Record<DifficultyLevel, Question[]> = {
  // 1. SZINT: KÖNNYŰ (10 feladat) - Egészre kerekítés, számegyenes és alapvető összehasonlítás
  1: [
    {
      id: 'q1-1',
      level: 1,
      question: 'A számegyenesen a 0 és 1 közötti szakaszt 10 egyenlő részre osztjuk. Mennyit ér 1 kis beosztásköz?',
      options: ['0,1 (egy tized)', '0,01 (egy század)', '0,5 (fél)', '1,0 (egy egész)'],
      correctAnswer: '0,1 (egy tized)',
      explanation: 'Ha az 1 egész egységet 10 egyenlő részre osztjuk, minden egyes kis szakasz értéke 1/10 = 0,1 (egy tized).',
      steps: [
        { label: '1. Egész szakasz', value: '1 egész egység' },
        { label: '2. Felosztás', value: '1 : 10 = 1/10' },
        { label: '3. Tizedes tört alak', value: '0,1' }
      ],
      hint: 'Gondolj a vonalzó millimétereire vagy a tízes számrendszerre: 1 egység tizede 0,1.',
      formula: '1 / 10 = 0,1'
    },
    {
      id: 'q1-2',
      level: 1,
      question: 'Melyik relációs jel illik a két szám közé: 3,7  ___  3,5 ?',
      options: ['>', '<', '=', '<='],
      correctAnswer: '>',
      explanation: 'Az egész részek megegyeznek (3 = 3), a tizedeknél pedig 7 > 5, ezért 3,7 > 3,5.',
      steps: [
        { label: '1. Egész részek', value: '3 = 3' },
        { label: '2. Tizedek összehasonlítása', value: '7 > 5' },
        { label: '3. Eredmény', value: '3,7 > 3,5' }
      ],
      hint: 'Hasonlítsd össze az egész részeket, majd a tizedesvessző utáni első számjegyet!',
      formula: '3,7 > 3,5'
    },
    {
      id: 'q1-3',
      level: 1,
      question: 'Kerekítsd a 4,8 tizedes törtet a legközelebbi egész számra!',
      options: ['5', '4', '4,5', '5,8'],
      correctAnswer: '5',
      explanation: 'A tizedek helyén 8 áll. Mivel 8 >= 5, ezért felfelé kerekítünk: a 4 egészből 5 egész lesz.',
      steps: [
        { label: '1. Kerekítendő helyiérték', value: 'egyesek (4)' },
        { label: '2. Döntő számjegy', value: 'tizedek (8)' },
        { label: '3. Szabály', value: '8 >= 5, ezért felfelé kerekítünk: 4 + 1 = 5' }
      ],
      hint: 'Ha a tizedesjegy 5, 6, 7, 8 vagy 9, akkor felfelé kerekítünk az egészekre.',
      formula: '4,8 ≈ 5'
    },
    {
      id: 'q1-4',
      level: 1,
      question: 'Kerekítsd a 7,2 tizedes törtet a legközelebbi egész számra!',
      options: ['7', '8', '7,0', '7,5'],
      correctAnswer: '7',
      explanation: 'A tizedek helyén 2 áll. Mivel 2 < 5, lefelé kerekítünk: a 7 egész megmarad.',
      steps: [
        { label: '1. Kerekítendő helyiérték', value: 'egyesek (7)' },
        { label: '2. Döntő számjegy', value: 'tizedek (2)' },
        { label: '3. Szabály', value: '2 < 5, ezért lefelé kerekítünk: 7 megmarad' }
      ],
      hint: 'Ha a döntő jegy 0, 1, 2, 3 vagy 4, lefelé kerekítünk.',
      formula: '7,2 ≈ 7'
    },
    {
      id: 'q1-5',
      level: 1,
      question: 'Melyik szám található a számegyenesen a 2 és a 3 pontosan félútján?',
      options: ['2,5', '2,1', '2,9', '3,5'],
      correctAnswer: '2,5',
      explanation: 'A 2 és 3 távolsága 1 egész, ennek a fele 0,5. Így a felezőpont 2 + 0,5 = 2,5.',
      steps: [
        { label: '1. Szakasz hossza', value: '3 - 2 = 1' },
        { label: '2. Fél szakasz', value: '1 / 2 = 0,5' },
        { label: '3. Felezőpont', value: '2 + 0,5 = 2,5' }
      ],
      hint: 'A fél 0,5-öt jelent tizedes tört alakban.',
      formula: '2 + 0,5 = 2,5'
    },
    {
      id: 'q1-6',
      level: 1,
      question: 'Melyik szám a nagyobb: 0,9 vagy 1,1?',
      options: ['1,1', '0,9', 'Egyenlők', 'Nem hasonlíthatók össze'],
      correctAnswer: '1,1',
      explanation: 'Először mindig az egész részeket hasonlítjuk össze: 1 > 0, ezért 1,1 > 0,9.',
      steps: [
        { label: '1. Egész részek', value: '1 > 0' },
        { label: '2. Következtetés', value: '1,1 > 0,9' }
      ],
      hint: 'Először mindig az egész részeket nézd meg!',
      formula: '1,1 > 0,9'
    },
    {
      id: 'q1-7',
      level: 1,
      question: 'Mennyi a 9,5 egészre kerekített értéke?',
      options: ['10', '9', '9,0', '10,5'],
      correctAnswer: '10',
      explanation: 'A döntő számjegy 5. Az 5-ös szabály szerint felfelé kerekítünk: 9 + 1 = 10.',
      steps: [
        { label: '1. Döntő számjegy', value: '5 (tized)' },
        { label: '2. Szabály', value: '5-nél felfelé kerekítünk' },
        { label: '3. Eredmény', value: '9 + 1 = 10' }
      ],
      hint: 'Az 5-ös számnál mindig felfelé kerekítünk.',
      formula: '9,5 ≈ 10'
    },
    {
      id: 'q1-8',
      level: 1,
      question: 'Melyik relációs jel helyes a két szám közé: 5,40  ___  5,4 ?',
      options: ['=', '>', '<', '≠'],
      correctAnswer: '=',
      explanation: 'A tizedes tört végére írt nullák nem változtatják meg a szám értékét: 5,40 = 5,4.',
      steps: [
        { label: '1. Értelmezés', value: '5 egész és 40 század = 5 egész és 4 tized' },
        { label: '2. Záró nullák szabálya', value: 'A végén lévő 0 elhagyható' },
        { label: '3. Eredmény', value: '5,40 = 5,4' }
      ],
      hint: 'A tizedesvessző utáni záró nullák nem változtatják meg a szám értékét.',
      formula: '5,40 = 5,4'
    },
    {
      id: 'q1-9',
      level: 1,
      question: 'Melyik a legkisebb szám a felsoroltak közül: 4,2; 3,9; 4,05; 3,8 ?',
      options: ['3,8', '3,9', '4,05', '4,2'],
      correctAnswer: '3,8',
      explanation: 'Az egész részek közül a 3-as a kisebb (3,9 és 3,8). A tizedeknél 8 < 9, így a legkisebb a 3,8.',
      steps: [
        { label: '1. Egész részek kiválasztása', value: '3,9 és 3,8 kisebb mint 4-gyel kezdődők' },
        { label: '2. Tizedek összehasonlítása', value: '3,8 tizede (8) < 3,9 tizede (9)' },
        { label: '3. Legkisebb', value: '3,8' }
      ],
      hint: 'Keresd meg a legkisebb egész résszel rendelkező számokat!',
      formula: '3,8 < 3,9 < 4,05 < 4,2'
    },
    {
      id: 'q1-10',
      level: 1,
      question: 'Mennyi az 1,49 tizedes tört egészre kerekített értéke?',
      options: ['1', '2', '1,5', '1,4'],
      correctAnswer: '1',
      explanation: 'Egészre kerekítésnél kizárólag a tizedek helyén álló első jegyet (a 4-est) nézzük! Mivel 4 < 5, lefelé kerekítünk: 1.',
      steps: [
        { label: '1. Kerekítési cél', value: 'egészre kerekítés' },
        { label: '2. Döntő jegy', value: 'a tizedek (4)' },
        { label: '3. Szabály', value: '4 < 5, ezért lefelé kerekítünk: 1' }
      ],
      hint: 'Ne tévesszen meg a 9-es a végén! Egészre kerekítésnél csak az első tizedesjegy dönt.',
      formula: '1,49 ≈ 1'
    }
  ],

  // 2. SZINT: KÖZEPES (10 feladat) - Tizedre kerekítés, nullák kiegészítése, relációk
  2: [
    {
      id: 'q2-1',
      level: 2,
      question: 'Kerekítsd a 4,73 tizedes törtet tizedekre!',
      options: ['4,7', '4,8', '5,0', '4,70'],
      correctAnswer: '4,7',
      explanation: 'Tizedre kerekítéskor a századok helyén álló jegy (a 3-as) a döntő. Mivel 3 < 5, a tizedek értéke (7) változatlan marad: 4,7.',
      steps: [
        { label: '1. Kerekítendő hely', value: 'tizedek (7)' },
        { label: '2. Döntő jegy', value: 'századok (3)' },
        { label: '3. Döntés', value: '3 < 5 -> lefelé kerekítés: 4,7' }
      ],
      hint: 'Nézd meg a második tizedesjegyet (századok)!',
      formula: '4,73 ≈ 4,7'
    },
    {
      id: 'q2-2',
      level: 2,
      question: 'Kerekítsd a 6,28 tizedes törtet tizedekre!',
      options: ['6,3', '6,2', '6,0', '6,25'],
      correctAnswer: '6,3',
      explanation: 'A századok helyén 8 áll. Mivel 8 >= 5, felfelé kerekítünk: 2 + 1 = 3 tized lesz, azaz 6,3.',
      steps: [
        { label: '1. Kerekítendő hely', value: 'tizedek (2)' },
        { label: '2. Döntő jegy', value: 'századok (8)' },
        { label: '3. Döntés', value: '8 >= 5 -> felfelé kerekítés: 6,3' }
      ],
      hint: 'A 8-as századjegy miatt a 2 tizedből 3 tized lesz.',
      formula: '6,28 ≈ 6,3'
    },
    {
      id: 'q2-3',
      level: 2,
      question: 'Melyik relációs jel helyes: 3,4  ___  3,38 ?',
      options: ['>', '<', '=', '<='],
      correctAnswer: '>',
      explanation: 'Pótoljunk egy nullát a 3,4 végére: 3,40. Mivel 3,40 > 3,38 (a tizedeknél 4 > 3), ezért 3,4 > 3,38.',
      steps: [
        { label: '1. Nullák kiegészítése', value: '3,4 = 3,40' },
        { label: '2. Összehasonlítás', value: '3,40 > 3,38 (mert 40 század > 38 század)' },
        { label: '3. Eredmény', value: '3,4 > 3,38' }
      ],
      hint: 'Egészítsd ki a rövidebb számot gondolatban 0-val: 3,4 = 3,40.',
      formula: '3,4 = 3,40 > 3,38'
    },
    {
      id: 'q2-4',
      level: 2,
      question: 'Kerekítsd a 0,45 tizedes törtet tizedekre!',
      options: ['0,5', '0,4', '1,0', '0,40'],
      correctAnswer: '0,5',
      explanation: 'A századok helyén 5 áll. Az 5-ös szabály miatt felfelé kerekítünk: a 4 tizedhez hozzáadunk 1-et, így 0,5 lesz.',
      steps: [
        { label: '1. Döntő jegy', value: 'századok (5)' },
        { label: '2. Szabály', value: '5 esetén felfelé kerekítünk' },
        { label: '3. Eredmény', value: '0,4 + 0,1 = 0,5' }
      ],
      hint: 'Ha a döntő jegy pontosan 5, felfelé kerekítünk.',
      formula: '0,45 ≈ 0,5'
    },
    {
      id: 'q2-5',
      level: 2,
      question: 'A számegyenesen melyik szám van közelebb a 4 egészhez: a 3,85 vagy a 4,1 ?',
      options: ['4,1', '3,85', 'Egyforma távolságra vannak', 'Egyik sem'],
      correctAnswer: '4,1',
      explanation: 'Számítsuk ki a távolságokat a 4-től: |4 - 3,85| = 0,15, míg |4,1 - 4| = 0,10. Mivel 0,10 < 0,15, a 4,1 van közelebb.',
      steps: [
        { label: '1. Távolság 3,85-től', value: '4,00 - 3,85 = 0,15' },
        { label: '2. Távolság 4,1-től', value: '4,10 - 4,00 = 0,10' },
        { label: '3. Összehasonlítás', value: '0,10 < 0,15 -> 4,1 közelebb van' }
      ],
      hint: 'Számold ki a különbséget mindkét szám és a 4 között!',
      formula: '|4,1 - 4| = 0,1 < 0,15 = |4 - 3,85|'
    },
    {
      id: 'q2-6',
      level: 2,
      question: 'Kerekítsd a 8,96 tizedes törtet tizedekre!',
      options: ['9,0', '9', '8,9', '9,1'],
      correctAnswer: '9,0',
      explanation: 'A századok helyén 6 áll (6 >= 5), ezért a 9 tizedhez 1-et adunk: 9 + 1 = 10 tized, ami 1 egésszel növeli az egészet (8 + 1 = 9), és a tized helyén 0 marad. Tizedre kerekítéskor a 9,0 alakot kötelező kiírni!',
      steps: [
        { label: '1. Döntő jegy', value: 'századok (6 >= 5 -> felfelé)' },
        { label: '2. Átfordulás', value: '8 egész 9 tized + 1 tized = 9 egész 0 tized' },
        { label: '3. Pontosság jelölése', value: '9,0 (a 0 kiírása kötelező tizedre kerekítésnél)' }
      ],
      hint: 'Ha 9 tizedre kerekítünk felfelé, az átfordul 0 tizedre és növeli az egész részt.',
      formula: '8,96 ≈ 9,0'
    },
    {
      id: 'q2-7',
      level: 2,
      question: 'Melyik relációs jel helyes: 0,5  ___  0,489 ?',
      options: ['>', '<', '=', '≤'],
      correctAnswer: '>',
      explanation: 'Egészítsük ki ezredekig nullákkal: 0,5 = 0,500. Mivel a tizedeknél 5 > 4 (és 500 > 489), ezért 0,5 > 0,489.',
      steps: [
        { label: '1. Nullák pótlása', value: '0,5 = 0,500' },
        { label: '2. Tizedek összehasonlítása', value: '5 > 4' },
        { label: '3. Eredmény', value: '0,5 > 0,489' }
      ],
      hint: 'Ne a szám hosszát nézd: a tizedek helyén 5 nagyobb, mint 4!',
      formula: '0,5 = 0,500 > 0,489'
    },
    {
      id: 'q2-8',
      level: 2,
      question: 'Melyik tizedes tört található a számegyenesen a 3,2 és a 3,3 pontos felezőpontjánál?',
      options: ['3,25', '3,21', '3,5', '3,29'],
      correctAnswer: '3,25',
      explanation: '3,2 = 3,20 és 3,3 = 3,30. A 20 és 30 század pontos közepe a 25 század, azaz 3,25.',
      steps: [
        { label: '1. Századokká alakítás', value: '3,20 és 3,30' },
        { label: '2. Felezőpont', value: '(3,20 + 3,30) / 2 = 3,25' }
      ],
      hint: 'Gondolj a 3,20 és 3,30 közötti felezőpontra!',
      formula: '(3,2 + 3,3) / 2 = 3,25'
    },
    {
      id: 'q2-9',
      level: 2,
      question: 'Kerekítsd a 12,04 tizedes törtet tizedekre!',
      options: ['12,0', '12', '12,1', '12,00'],
      correctAnswer: '12,0',
      explanation: 'A századok helyén 4 áll. Mivel 4 < 5, lefelé kerekítünk: a tized helyén megmarad a 0, így 12,0.',
      steps: [
        { label: '1. Döntő jegy', value: 'századok (4 < 5)' },
        { label: '2. Eredmény', value: '12,0 (tizedre kerekítve kiírjuk a 0-t)' }
      ],
      hint: 'Mivel 4 < 5, lefelé kerekítünk, és kiírjuk a 0 tizedet.',
      formula: '12,04 ≈ 12,0'
    },
    {
      id: 'q2-10',
      level: 2,
      question: 'Rendezd növekvő sorrendbe: 2,05; 2,5; 2,15; 2,005! Melyik a második legkisebb szám?',
      options: ['2,05', '2,005', '2,15', '2,5'],
      correctAnswer: '2,05',
      explanation: 'Egészítsük ki ezredekig: 2,005 < 2,050 < 2,150 < 2,500. A növekvő sorrendben a második a 2,05.',
      steps: [
        { label: '1. Nullák kiegészítése', value: '2,005; 2,050; 2,150; 2,500' },
        { label: '2. Növekvő sorrend', value: '2,005 < 2,05 < 2,15 < 2,5' },
        { label: '3. Második legkisebb', value: '2,05' }
      ],
      hint: 'Hozd az összes számot 3 tizedesjegyre nullák pótlásával!',
      formula: '2,005 < 2,05 < 2,15 < 2,5'
    }
  ],

  // 3. SZINT: NEHÉZ (10 feladat) - Századra kerekítés, átfordulások, szöveges problémák
  3: [
    {
      id: 'q3-1',
      level: 3,
      question: 'Kerekítsd az 5,426 tizedes törtet századokra!',
      options: ['5,43', '5,42', '5,4', '5,420'],
      correctAnswer: '5,43',
      explanation: 'Századra kerekítéskor a harmadik tizedesjegy (ezred, 6) a döntő. Mivel 6 >= 5, a századok helyén 2 + 1 = 3 lesz: 5,43.',
      steps: [
        { label: '1. Kerekítendő hely', value: 'századok (2)' },
        { label: '2. Döntő jegy', value: 'ezredek (6)' },
        { label: '3. Szabály', value: '6 >= 5 -> felfelé kerekítés: 5,43' }
      ],
      hint: 'Századra kerekítésnél az ezredek helyén álló számjegyet kell nézni.',
      formula: '5,426 ≈ 5,43'
    },
    {
      id: 'q3-2',
      level: 3,
      question: 'Kerekítsd a 2,814 tizedes törtet századokra!',
      options: ['2,81', '2,82', '2,8', '2,810'],
      correctAnswer: '2,81',
      explanation: 'Az ezredek helyén 4 áll. Mivel 4 < 5, lefelé kerekítünk: a századok helyén megmarad az 1, azaz 2,81.',
      steps: [
        { label: '1. Döntő jegy', value: 'ezredek (4)' },
        { label: '2. Szabály', value: '4 < 5 -> lefelé kerekítés: 2,81' }
      ],
      hint: 'A 4-es miatt a századjegy nem változik.',
      formula: '2,814 ≈ 2,81'
    },
    {
      id: 'q3-3',
      level: 3,
      question: 'Kerekítsd a 0,398 tizedes törtet századokra!',
      options: ['0,40', '0,39', '0,4', '0,400'],
      correctAnswer: '0,40',
      explanation: 'Az ezredek helyén 8 áll (8 >= 5). A 9 századhoz 1-et adva 10 század = 1 tized lesz, így a 3 tizedből 4 tized lesz, és 0 század marad. Századra kerekítésnél kötelező a 0,40 alak!',
      steps: [
        { label: '1. Döntő jegy', value: 'ezredek (8 >= 5 -> felfelé)' },
        { label: '2. Átfordulás', value: '39 század + 1 század = 40 század' },
        { label: '3. Eredmény', value: '0,40 (a század helyén a 0 kötelező)' }
      ],
      hint: 'A 39 századhoz adj 1 századot a felfelé kerekítés miatt!',
      formula: '0,398 ≈ 0,40'
    },
    {
      id: 'q3-4',
      level: 3,
      question: 'Kerekítsd a 7,996 tizedes törtet századokra!',
      options: ['8,00', '8', '7,99', '8,0'],
      correctAnswer: '8,00',
      explanation: 'Az ezred 6 (6 >= 5), ezért 7,99 + 0,01 = 8,00. A százados pontosság miatt a két záró nullát kötelező kiírni.',
      steps: [
        { label: '1. Döntő jegy', value: 'ezredek (6 >= 5)' },
        { label: '2. Számítás', value: '7,99 + 0,01 = 8,00' },
        { label: '3. Eredmény', value: '8,00' }
      ],
      hint: '99 századhoz 1 századot adva 1 egész keletkezik, a két tizedeshelyre 00 kerül.',
      formula: '7,996 ≈ 8,00'
    },
    {
      id: 'q3-5',
      level: 3,
      question: 'Melyik a legnagyobb szám a következők közül: 0,099; 0,1; 0,0899; 0,09 ?',
      options: ['0,1', '0,099', '0,0899', '0,09'],
      correctAnswer: '0,1',
      explanation: 'A tizedek helyét vizsgálva: a 0,1-nél a tizedek értéke 1, míg az összes többinél 0. Mivel 1 tized > 0 tized, a 0,1 a legnagyobb.',
      steps: [
        { label: '1. Tizedek vizsgálata', value: '0,1-nél 1 tized van; a többieknél 0 tized' },
        { label: '2. Nullák pótlásával', value: '0,1000 > 0,0990 > 0,0900 > 0,0899' },
        { label: '3. Legnagyobb', value: '0,1' }
      ],
      hint: 'Nézd meg a tizedesvessző utáni legelső számjegyet!',
      formula: '0,1 > 0,099 > 0,09 > 0,0899'
    },
    {
      id: 'q3-6',
      level: 3,
      question: 'Egy futóversenyen a mért idők: Anna: 12,48 s; Béla: 12,5 s; Cili: 12,405 s; Dániel: 12,45 s. Ki futotta a leggyorsabb (legkisebb) időt?',
      options: ['Cili (12,405 s)', 'Anna (12,48 s)', 'Béla (12,5 s)', 'Dániel (12,45 s)'],
      correctAnswer: 'Cili (12,405 s)',
      explanation: 'Egészítsük ki ezredekig: 12,405 < 12,450 < 12,480 < 12,500. A legkisebb idő 12,405 s, tehát Cili nyert.',
      steps: [
        { label: '1. Idők összehasonlítása', value: '12,405; 12,450; 12,480; 12,500' },
        { label: '2. Legkisebb érték', value: '12,405 s' },
        { label: '3. Győztes', value: 'Cili' }
      ],
      hint: 'A futásban a legkisebb időeredmény a legjobb!',
      formula: '12,405 < 12,45 < 12,48 < 12,5'
    },
    {
      id: 'q3-7',
      level: 3,
      question: 'Melyik két szomszédos egész szám közé esik a 6,738 a számegyenesen, és melyikhez van közelebb?',
      options: [
        '6 és 7 közé, a 7-hez van közelebb',
        '6 és 7 közé, a 6-hoz van közelebb',
        '7 és 8 közé, a 7-hez van közelebb',
        '5 és 6 közé, a 6-hoz van közelebb'
      ],
      correctAnswer: '6 és 7 közé, a 7-hez van közelebb',
      explanation: 'A 6,738 nagyobb mint 6 és kisebb mint 7. Mivel a felezőpont 6,5, és 6,738 > 6,5, ezért a 7-hez van közelebb (egészre kerekítve 7).',
      steps: [
        { label: '1. Szomszédos egészek', value: '6 < 6,738 < 7' },
        { label: '2. Távolságok', value: '|6,738 - 6| = 0,738 és |7 - 6,738| = 0,262' },
        { label: '3. Közelebb lévő egész', value: '7 (mert 0,262 < 0,738)' }
      ],
      hint: 'Hasonlítsd a 6,5 felezőponthoz: nagyobb-e nála?',
      formula: '6 < 6,738 < 7; 6,738 ≈ 7'
    },
    {
      id: 'q3-8',
      level: 3,
      question: 'Egy csomag tömege 3,456 kg. Mennyi a tömege tizedekre, illetve századokra kerekítve?',
      options: [
        '3,5 kg és 3,46 kg',
        '3,4 kg és 3,45 kg',
        '3,5 kg és 3,45 kg',
        '4,0 kg és 3,50 kg'
      ],
      correctAnswer: '3,5 kg és 3,46 kg',
      explanation: 'Tizedre kerekítve: a század 5 -> 3,5 kg. Századra kerekítve: az ezred 6 -> 3,46 kg.',
      steps: [
        { label: '1. Tizedre kerekítés', value: '3,456 -> század 5 >= 5 -> 3,5 kg' },
        { label: '2. Századra kerekítés', value: '3,456 -> ezred 6 >= 5 -> 3,46 kg' }
      ],
      hint: 'Tizedre a 2. jegy (5), századra a 3. jegy (6) dönt.',
      formula: '3,456 ≈ 3,5 (tizedre) és 3,456 ≈ 3,46 (századra)'
    },
    {
      id: 'q3-9',
      level: 3,
      question: 'Melyik állítás IGAZ az alábbiak közül?',
      options: [
        'A 3,400 és a 3,4 értéke pontosan megegyezik',
        'A 0,38 mindig nagyobb, mint a 0,4',
        'Kerekítéskor a tizedesvessző előtti számok sosem változhatnak',
        'A 4,49 egészre kerekítve 5'
      ],
      correctAnswer: 'A 3,400 és a 3,4 értéke pontosan megegyezik',
      explanation: 'A tizedes tört végére tetszőleges számú 0 írható anélkül, hogy a szám értéke megváltozna: 3,400 = 3,4.',
      steps: [
        { label: '1. Helyes állítás', value: '3,400 = 3,4' },
        { label: '2. Hibásak magyarázata', value: '0,38 < 0,40; 9,9-nél változhat az egész; 4,49 ≈ 4' }
      ],
      hint: 'Gondolj a tizedes tört végén lévő nullák szabályára!',
      formula: '3,400 = 3,4'
    },
    {
      id: 'q3-10',
      level: 3,
      question: 'Egy k tizedes törtet tizedekre kerekítve 5,8-at kapunk. Melyik lehet a k értéke a megadottak közül?',
      options: ['5,78', '5,86', '5,74', '5,89'],
      correctAnswer: '5,78',
      explanation: 'Az 5,78 tizedre kerekítve 5,8 (mert 8 >= 5). Az 5,86 kerekítve 5,9; az 5,74 kerekítve 5,7; az 5,89 kerekítve 5,9.',
      steps: [
        { label: '1. Kerekítési teszt 5,78-ra', value: 'század 8 >= 5 -> 5,8 (helyes)' },
        { label: '2. Többi ellenőrzése', value: '5,86 ≈ 5,9; 5,74 ≈ 5,7; 5,89 ≈ 5,9' }
      ],
      hint: 'Melyik szám van az 5,75 és 5,84 tartományban?',
      formula: '5,75 <= k < 5,85'
    }
  ]
};

export function DecimalCompareRoundingQuiz({ onBack, onSwitchToTheory }: DecimalCompareRoundingQuizProps) {
  return (
    <QuizTemplate
      title="Tizedes törtek ábrázolása, kerekítése és összehasonlítása kvíz"
      subtitle="Mérd fel a tudásodat a tizedes törtek számegyenesen való elhelyezéséről, relációiról és kerekítéséről 30 feladaton keresztül!"
      badge="📏 5. Osztály • Tizedes törtek"
      topicId="g5-decimal-compare-rounding-quiz"
      category="decimal-fractions-compare-rounding"
      grade={5}
      questions={decimalCompareRoundingQuestions}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      themeColor="blue"
      renderMatcher={({ level, onNextLevel, onOpenRules }) => (
        <DecimalCompareRoundingMatcher
          level={level}
          onNextLevel={onNextLevel}
          onOpenRules={onOpenRules}
          onBack={onBack}
          onSwitchToTheory={onSwitchToTheory}
        />
      )}
      renderSorter={({ level, onNextLevel, onOpenRules }) => (
        <DecimalCompareRoundingSorter
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

export default DecimalCompareRoundingQuiz;
