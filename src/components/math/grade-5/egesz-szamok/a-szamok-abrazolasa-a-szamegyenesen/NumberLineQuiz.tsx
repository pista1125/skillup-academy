import React from 'react';
import { QuizTemplate, Question } from '../QuizTemplate';
import { NumberLineMatcher } from './NumberLineMatcher';
import { NumberLineSorter } from './NumberLineSorter';

export interface NumberLineQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const questions: Question[] = [
  // =========================================================
  // --- 1. SZINT: KÖNNYŰ (0–100 közötti skálák és alapok) ---
  // =========================================================
  {
    id: 'l1-q1',
    level: 1,
    prompt: 'A számegyenesen 0 és 10 között 10 egyenlő beosztás (köz) található. Milyen számot jelöl a 6 utáni első vonás (A pont)?',
    highlightValue: '0 ── 6 ─ A(?) ── 10',
    questionTypeBadge: 'Szám leolvasása (1-es lépésköz)',
    options: ['7', '8', '6', '9'],
    correctAnswer: '7',
    explanation: 'A 10 egység 10 egyenlő részre van osztva, így a lépésköz 1. A 6 után közvetlenül a 7 következik.',
    hint: 'Lépésköz: 10 : 10 = 1 egység.',
    breakdown: [
      { label: 'Lépésköz', value: '1' },
      { label: 'Kiindulás', value: '6' },
      { label: 'A pont', value: '6 + 1 = 7' }
    ]
  },
  {
    id: 'l1-q2',
    level: 1,
    prompt: 'Melyik szám található pontosan félúton a 0 és a 10 között a számegyenesen?',
    highlightValue: '0 és 10 felezőpontja',
    questionTypeBadge: 'Felezőpont',
    options: ['5', '4', '6', '5,5'],
    correctAnswer: '5',
    explanation: 'A 0 és 10 felezőpontja (0 + 10) / 2 = 5.',
    hint: 'Számold ki az átlagukat: (0 + 10) / 2.',
    breakdown: [
      { label: 'Összeg', value: '0 + 10 = 10' },
      { label: 'Felezve', value: '10 / 2 = 5' }
    ]
  },
  {
    id: 'l1-q3',
    level: 1,
    prompt: 'Egy kettesével lépkedő számegyenesen (0, 2, 4, ...) a 12 és a 16 közötti vonás jelöli az A pontot. Mennyi az A pont értéke?',
    highlightValue: '12 ── A(?) ── 16 (lépésköz: 2)',
    questionTypeBadge: 'Szám leolvasása (2-es lépésköz)',
    options: ['14', '13', '15', '18'],
    correctAnswer: '14',
    explanation: 'A lépésköz 2 egység, így a 12 utáni következő beosztás 12 + 2 = 14.',
    hint: 'Kettesével haladsz előre: 12 + 2.',
    breakdown: [
      { label: 'Előző érték', value: '12' },
      { label: 'Lépésköz', value: '+2' },
      { label: 'A pont', value: '14' }
    ]
  },
  {
    id: 'l1-q4',
    level: 1,
    prompt: 'Hány egység távolságra van egymástól a 3 és a 11 a számegyenesen?',
    highlightValue: 'Távolság: 3 és 11 között',
    questionTypeBadge: 'Távolság számítása',
    options: ['8 egység', '7 egység', '9 egység', '14 egység'],
    correctAnswer: '8 egység',
    explanation: 'A távolság a két szám különbsége: 11 - 3 = 8 egység.',
    hint: 'Nagyobb szám - kisebb szám: 11 - 3.',
    breakdown: [
      { label: 'Kivonás', value: '11 - 3' },
      { label: 'Távolság', value: '8 egység' }
    ]
  },
  {
    id: 'l1-q5',
    level: 1,
    prompt: 'Egy számegyenesen a 0 és az 50 között 10 egyenlő köz van. Mekkora egyetlen beosztási lépésköz értéke?',
    highlightValue: '0 és 50 között 10 osztásköz',
    questionTypeBadge: 'Lépésköz meghatározása',
    options: ['5 egység', '10 egység', '2 egység', '1 egység'],
    correctAnswer: '5 egység',
    explanation: 'A teljes távolság 50 - 0 = 50. Mivel 10 egyenlő közre van osztva: 50 : 10 = 5 egység.',
    hint: 'Oszd el a különbséget (50) a közök számával (10)!',
    breakdown: [
      { label: 'Különbség', value: '50 - 0 = 50' },
      { label: 'Közök száma', value: '10' },
      { label: 'Lépésköz', value: '50 : 10 = 5' }
    ]
  },
  {
    id: 'l1-q6',
    level: 1,
    prompt: 'Melyek a 47 közvetlen egyes szomszédai a számegyenesen?',
    highlightValue: '47 egyes szomszédai',
    questionTypeBadge: 'Szomszédok',
    options: ['46 és 48', '40 és 50', '45 és 50', '46 és 50'],
    correctAnswer: '46 és 48',
    explanation: 'A közvetlen egyes szomszédok a szám - 1 és a szám + 1: 46 és 48.',
    hint: 'Egyes szomszéd = közvetlenül előtte és utána álló szám.',
    breakdown: [
      { label: 'Kisebb szomszéd', value: '47 - 1 = 46' },
      { label: 'Nagyobb szomszéd', value: '47 + 1 = 48' }
    ]
  },
  {
    id: 'l1-q7',
    level: 1,
    prompt: 'Melyek a 47 kerek tízes szomszédai a számegyenesen?',
    highlightValue: '47 kerek tízes szomszédai',
    questionTypeBadge: 'Kerek tízes szomszédok',
    options: ['40 és 50', '46 és 48', '30 és 50', '40 és 60'],
    correctAnswer: '40 és 50',
    explanation: 'A 47-et közrefogó két legközelebbi kerek tízes a 40 és az 50.',
    hint: 'Melyik két 0-ra végződő tízes közé esik a 47?',
    breakdown: [
      { label: 'Kisebb tízes', value: '40' },
      { label: 'Nagyobb tízes', value: '50' }
    ]
  },
  {
    id: 'l1-q8',
    level: 1,
    prompt: 'A 47 kerek tízes szomszédai közül (40 és 50) melyikhez van közelebb a 47 a számegyenesen?',
    highlightValue: '47 távolsága a 40-től és 50-től',
    questionTypeBadge: 'Közelebbi szomszéd',
    options: ['Az 50-hez (távolság: 3)', 'A 40-hez (távolság: 7)', 'Egyenlő távolságra van', 'A 45-höz'],
    correctAnswer: 'Az 50-hez (távolság: 3)',
    explanation: '47 - 40 = 7, míg 50 - 47 = 3. Mivel 3 < 7, az 50-hez van közelebb.',
    hint: '50 - 47 = 3, 47 - 40 = 7.',
    breakdown: [
      { label: 'Távolság 40-től', value: '7 egység' },
      { label: 'Távolság 50-től', value: '3 egység' },
      { label: 'Közelebbi', value: '50' }
    ]
  },
  {
    id: 'l1-q9',
    level: 1,
    prompt: 'A számegyenesen a 20-tól 8 egységgel jobbra lépünk. Milyen számhoz érkezünk?',
    highlightValue: '20-tól 8 egység jobbra',
    questionTypeBadge: 'Lépés a számegyenesen',
    options: ['28', '12', '24', '30'],
    correctAnswer: '28',
    explanation: 'A számegyenesen jobbra lépve növekednek a számok: 20 + 8 = 28.',
    hint: 'Jobbra haladva hozzáadunk: 20 + 8.',
    breakdown: [
      { label: 'Kezdőpont', value: '20' },
      { label: 'Művelet', value: '+ 8' },
      { label: 'Célpont', value: '28' }
    ]
  },
  {
    id: 'l1-q10',
    level: 1,
    prompt: 'A számegyenesen a 35-től 12 egységgel balra lépünk. Milyen számhoz érkezünk?',
    highlightValue: '35-től 12 egység balra',
    questionTypeBadge: 'Lépés a számegyenesen',
    options: ['23', '47', '22', '25'],
    correctAnswer: '23',
    explanation: 'A számegyenesen balra lépve csökkennek a számok: 35 - 12 = 23.',
    hint: 'Balra haladva kivonunk: 35 - 12.',
    breakdown: [
      { label: 'Kezdőpont', value: '35' },
      { label: 'Művelet', value: '- 12' },
      { label: 'Célpont', value: '23' }
    ]
  },

  // ===============================================================
  // --- 2. SZINT: KÖZEPES (0–1000 közötti skálák, százas szomszédok) ---
  // ===============================================================
  {
    id: 'l2-q1',
    level: 2,
    prompt: 'A számegyenesen 0 és 1000 között 10 egyenlő beosztás van. Mekkora egyetlen beosztáskőz értéke?',
    highlightValue: '0 ── 1000 (10 osztásköz)',
    questionTypeBadge: 'Százas lépésköz',
    options: ['100 egység', '10 egység', '50 egység', '500 egység'],
    correctAnswer: '100 egység',
    explanation: '1000 : 10 = 100 egység. Minden vonás egy kerek százast jelent.',
    hint: '1000 : 10 = 100.',
    breakdown: [
      { label: 'Különbség', value: '1000' },
      { label: 'Közök száma', value: '10' },
      { label: 'Lépésköz', value: '100 egység' }
    ]
  },
  {
    id: 'l2-q2',
    level: 2,
    prompt: 'Melyik szám a 200 és 600 pontos felezőpontja a számegyenesen?',
    highlightValue: '200 és 600 felezőpontja',
    questionTypeBadge: 'Felezőpont számítás',
    options: ['400', '350', '500', '450'],
    correctAnswer: '400',
    explanation: '(200 + 600) / 2 = 800 / 2 = 400.',
    hint: 'Add össze a két számot és oszd el 2-vel: (200 + 600) / 2.',
    breakdown: [
      { label: 'Összeg', value: '200 + 600 = 800' },
      { label: 'Felezve', value: '800 / 2 = 400' }
    ]
  },
  {
    id: 'l2-q3',
    level: 2,
    prompt: 'Melyek a 348 kerek százas szomszédai a számegyenesen?',
    highlightValue: '348 kerek százas szomszédai',
    questionTypeBadge: 'Százas szomszédok',
    options: ['300 és 400', '340 és 350', '200 és 400', '300 és 500'],
    correctAnswer: '300 és 400',
    explanation: 'A 348-at közrefogó két kerek százas a 300 és a 400.',
    hint: 'Melyik két 00-ra végződő százas közé esik a 348?',
    breakdown: [
      { label: 'Kisebb százas', value: '300' },
      { label: 'Nagyobb százas', value: '400' }
    ]
  },
  {
    id: 'l2-q4',
    level: 2,
    prompt: 'A 348 a kerek százas szomszédai közül (300 és 400) melyikhez van közelebb?',
    highlightValue: '348 távolsága a 300-tól és 400-tól',
    questionTypeBadge: 'Közelebbi százas',
    options: ['A 300-hoz (távolság: 48)', 'A 400-hoz (távolság: 52)', 'Egyenlő távolságra van', 'A 350-hez'],
    correctAnswer: 'A 300-hoz (távolság: 48)',
    explanation: '348 - 300 = 48, míg 400 - 348 = 52. Mivel 48 < 52, a 300-hoz van közelebb.',
    hint: '348 - 300 = 48, 400 - 348 = 52.',
    breakdown: [
      { label: 'Távolság 300-tól', value: '48' },
      { label: 'Távolság 400-tól', value: '52' },
      { label: 'Közelebbi', value: '300' }
    ]
  },
  {
    id: 'l2-q5',
    level: 2,
    prompt: 'Hány egység a távolság a 240 és a 710 között a számegyenesen?',
    highlightValue: 'Távolság: 240 és 710 között',
    questionTypeBadge: 'Távolság számítása',
    options: ['470 egység', '480 egység', '570 egység', '500 egység'],
    correctAnswer: '470 egység',
    explanation: '710 - 240 = 470 egység.',
    hint: '710 - 240 = 470.',
    breakdown: [
      { label: 'Kivonás', value: '710 - 240' },
      { label: 'Távolság', value: '470 egység' }
    ]
  },
  {
    id: 'l2-q6',
    level: 2,
    prompt: 'Egy 50-esével beosztott számegyenesen (0, 50, 100, 150, ...) a 350 utáni 3. vonás milyen számot jelöl?',
    highlightValue: '350 utáni 3. vonás (lépésköz: 50)',
    questionTypeBadge: 'Lépéssorozat',
    options: ['500', '450', '550', '400'],
    correctAnswer: '500',
    explanation: '350 + 3 · 50 = 350 + 150 = 500.',
    hint: '3 beosztás = 3 · 50 = 150 egység előre.',
    breakdown: [
      { label: 'Kezdőpont', value: '350' },
      { label: '3 lépés', value: '3 · 50 = 150' },
      { label: 'Érkezés', value: '350 + 150 = 500' }
    ]
  },
  {
    id: 'l2-q7',
    level: 2,
    prompt: 'Melyik szám fekszik pontosan a 150 és a 250 között félúton?',
    highlightValue: '150 és 250 felezőpontja',
    questionTypeBadge: 'Felezőpont',
    options: ['200', '190', '210', '205'],
    correctAnswer: '200',
    explanation: '(150 + 250) / 2 = 400 / 2 = 200.',
    hint: '150 + 50 = 200, 250 - 50 = 200.',
    breakdown: [
      { label: 'Összeg', value: '150 + 250 = 400' },
      { label: 'Felezve', value: '400 / 2 = 200' }
    ]
  },
  {
    id: 'l2-q8',
    level: 2,
    prompt: 'Melyek a 785 kerek tízes szomszédai a számegyenesen?',
    highlightValue: '785 kerek tízes szomszédai',
    questionTypeBadge: 'Tízes szomszédok',
    options: ['780 és 790', '700 és 800', '784 és 786', '770 és 790'],
    correctAnswer: '780 és 790',
    explanation: 'A 785 közvetlen tízes szomszédai a 780 és a 790 (pontosan félúton van közöttük).',
    hint: 'Melyik két tízes közé esik a 785?',
    breakdown: [
      { label: 'Kisebb tízes', value: '780' },
      { label: 'Nagyobb tízes', value: '790' }
    ]
  },
  {
    id: 'l2-q9',
    level: 2,
    prompt: 'A számegyenesen a P pont a 400-nál van. Ha balra lépünk 150 egységet, majd jobbra 80 egységet, hol állunk meg?',
    highlightValue: '400 - 150 + 80',
    questionTypeBadge: 'Kombinált elmozdulás',
    options: ['330', '350', '320', '480'],
    correctAnswer: '330',
    explanation: '400 - 150 = 250, majd 250 + 80 = 330.',
    hint: 'Először 400 - 150 = 250, majd 250 + 80.',
    breakdown: [
      { label: 'Balra lépés', value: '400 - 150 = 250' },
      { label: 'Jobbra lépés', value: '250 + 80 = 330' }
    ]
  },
  {
    id: 'l2-q10',
    level: 2,
    prompt: 'Ha a számegyenesen az A pont a 120, a B pont a 280, hol van a szakasz harmadolópontja A-hoz közelebb?',
    highlightValue: '120 és 280 közelebbi harmadolópontja',
    questionTypeBadge: 'Arányos osztás',
    options: ['A távolság nem osztható 3-mal egészre (kb. 173,3)', '200', '160', '180'],
    correctAnswer: 'A távolság nem osztható 3-mal egészre (kb. 173,3)',
    explanation: 'A távolság 280 - 120 = 160. Mivel 160 nem osztható 3-mal maradék nélkül (160/3 = 53,33), az első harmadolópont 120 + 53,33 = 173,33.',
    hint: 'Távolság: 280 - 120 = 160, harmada: 160 / 3.',
    breakdown: [
      { label: 'Teljes távolság', value: '280 - 120 = 160' },
      { label: '1/3 rész', value: '160 : 3 = 53,33...' }
    ]
  },

  // ================================================================
  // --- 3. SZINT: NEHÉZ (Ezres skálák, 10 000-ig, összetett logika) ---
  // ================================================================
  {
    id: 'l3-q1',
    level: 3,
    prompt: 'Melyek a 4 670 kerek ezres szomszédai a számegyenesen?',
    highlightValue: '4 670 kerek ezres szomszédai',
    questionTypeBadge: 'Ezres szomszédok',
    options: ['4 000 és 5 000', '4 600 és 4 700', '4 660 és 4 680', '3 000 és 5 000'],
    correctAnswer: '4 000 és 5 000',
    explanation: 'A 4 670-et közrefogó két kerek ezres a 4 000 és az 5 000.',
    hint: 'Melyik két 000-ra végződő szám közé esik a 4 670?',
    breakdown: [
      { label: 'Kisebb ezres', value: '4 000' },
      { label: 'Nagyobb ezres', value: '5 000' }
    ]
  },
  {
    id: 'l3-q2',
    level: 3,
    prompt: 'A 4 670 melyik kerek ezres szomszédjához van közelebb a számegyenesen?',
    highlightValue: '4 670 közelebbi ezrese',
    questionTypeBadge: 'Közelebbi ezres',
    options: ['Az 5 000-hez (távolság: 330)', 'A 4 000-hez (távolság: 670)', 'Egyenlő távolságra van', 'A 4 500-hoz'],
    correctAnswer: 'Az 5 000-hez (távolság: 330)',
    explanation: '5000 - 4670 = 330, míg 4670 - 4000 = 670. Mivel 330 < 670, az 5 000-hez van közelebb.',
    hint: '5000 - 4670 = 330.',
    breakdown: [
      { label: 'Távolság 5000-től', value: '330' },
      { label: 'Távolság 4000-től', value: '670' },
      { label: 'Közelebbi', value: '5 000' }
    ]
  },
  {
    id: 'l3-q3',
    level: 3,
    prompt: 'Melyik szám a 3 400 és a 7 800 pontos felezőpontja a számegyenesen?',
    highlightValue: '3 400 és 7 800 felezőpontja',
    questionTypeBadge: 'Felezőpont számítás',
    options: ['5 600', '5 400', '5 800', '5 500'],
    correctAnswer: '5 600',
    explanation: '(3 400 + 7 800) / 2 = 11 200 / 2 = 5 600.',
    hint: '(3400 + 7800) / 2 = 11200 / 2.',
    breakdown: [
      { label: 'Összeg', value: '3 400 + 7 800 = 11 200' },
      { label: 'Felezve', value: '11 200 / 2 = 5 600' }
    ]
  },
  {
    id: 'l3-q4',
    level: 3,
    prompt: 'A számegyenesen 0 és 10 000 között 20 darab egyenlő beosztásköz található. Mekkora egyetlen lépésköz értéke?',
    highlightValue: '0 ── 10 000 (20 osztásköz)',
    questionTypeBadge: 'Nagy lépésköz',
    options: ['500 egység', '1 000 egység', '200 egység', '250 egység'],
    correctAnswer: '500 egység',
    explanation: '10 000 : 20 = 500 egység.',
    hint: '10 000 osztva 20-szal = 500.',
    breakdown: [
      { label: 'Különbség', value: '10 000' },
      { label: 'Közök száma', value: '20' },
      { label: 'Lépésköz', value: '10 000 : 20 = 500' }
    ]
  },
  {
    id: 'l3-q5',
    level: 3,
    prompt: 'Ha a számegyenesen az A pont értéke 1 250, a B pont értéke 4 750, mekkora a távolságuk, és hol van a felezőpontjuk?',
    highlightValue: 'A = 1 250, B = 4 750',
    questionTypeBadge: 'Távolság és felezőpont',
    options: [
      'Távolság: 3 500, Felezőpont: 3 000',
      'Távolság: 3 000, Felezőpont: 3 000',
      'Távolság: 3 500, Felezőpont: 3 500',
      'Távolság: 4 000, Felezőpont: 2 500'
    ],
    correctAnswer: 'Távolság: 3 500, Felezőpont: 3 000',
    explanation: 'Távolság: 4 750 - 1 250 = 3 500. Felezőpont: (1 250 + 4 750) / 2 = 6 000 / 2 = 3 000.',
    hint: 'Távolság = 4750 - 1250 = 3500; Felezőpont = 6000 / 2 = 3000.',
    breakdown: [
      { label: 'Távolság', value: '4 750 - 1 250 = 3 500' },
      { label: 'Felezőpont', value: '(1 250 + 4 750) / 2 = 3 000' }
    ]
  },
  {
    id: 'l3-q6',
    level: 3,
    prompt: 'A számegyenesen melyik szám van pontosan 450 egység távolságra az 1 200-tól balra?',
    highlightValue: '1 200-tól 450 balra',
    questionTypeBadge: 'Balra lépés',
    options: ['750', '1 650', '850', '650'],
    correctAnswer: '750',
    explanation: '1 200 - 450 = 750.',
    hint: '1 200 - 450 = 750.',
    breakdown: [
      { label: 'Kiindulás', value: '1 200' },
      { label: 'Kivonás', value: '- 450' },
      { label: 'Eredmény', value: '750' }
    ]
  },
  {
    id: 'l3-q7',
    level: 3,
    prompt: 'A számegyenesen melyik szám van pontosan 1 350 egység távolságra a 2 800-tól jobbra?',
    highlightValue: '2 800-tól 1 350 jobbra',
    questionTypeBadge: 'Jobbra lépés',
    options: ['4 150', '4 250', '3 150', '1 450'],
    correctAnswer: '4 150',
    explanation: '2 800 + 1 350 = 4 150.',
    hint: '2 800 + 1 350 = 4 150.',
    breakdown: [
      { label: 'Kiindulás', value: '2 800' },
      { label: 'Hozzáadás', value: '+ 1 350' },
      { label: 'Eredmény', value: '4 150' }
    ]
  },
  {
    id: 'l3-q8',
    level: 3,
    prompt: 'Egy számegyenesen a 0, 100, 200 jelölések vannak feltüntetve, de a 100 és 200 között még 4 darab közbülső osztásvonal van (összesen 5 köz). Mekkora az A pont értéke, ha a 100 utáni 3. vonásnál áll?',
    highlightValue: '100 és 200 között 5 köz, A = 3. vonás',
    questionTypeBadge: 'Részletes beosztás',
    options: ['160', '150', '175', '130'],
    correctAnswer: '160',
    explanation: 'A 100 és 200 közötti 100 egység 5 közre van osztva, így a lépésköz 100 : 5 = 20. A 3. vonás: 100 + 3 · 20 = 160.',
    hint: 'Egy köz = 100 : 5 = 20 egység. 100 + 3 · 20 = 160.',
    breakdown: [
      { label: 'Szakasz', value: '200 - 100 = 100' },
      { label: '1 köz', value: '100 : 5 = 20' },
      { label: 'A pont', value: '100 + 3 · 20 = 160' }
    ]
  },
  {
    id: 'l3-q9',
    level: 3,
    prompt: 'Egy számegyenesen két pont: A = 4 500 és B = 9 500. Hol helyezkedik el a szakasz negyedelőpontja A-hoz közelebb?',
    highlightValue: 'A = 4 500, B = 9 500 negyedelőpontja',
    questionTypeBadge: 'Negyedelőpont',
    options: ['5 750', '5 500', '7 000', '6 000'],
    correctAnswer: '5 750',
    explanation: 'A távolság 9 500 - 4 500 = 5 000. A negyede: 5 000 : 4 = 1 250. Az A-hoz közelebbi negyedelőpont: 4 500 + 1 250 = 5 750.',
    hint: 'Távolság = 5000, 1/4 része = 1250. 4500 + 1250 = 5750.',
    breakdown: [
      { label: 'Távolság', value: '9 500 - 4 500 = 5 000' },
      { label: '1/4 rész', value: '5 000 : 4 = 1 250' },
      { label: 'Negyedelőpont', value: '4 500 + 1 250 = 5 750' }
    ]
  },
  {
    id: 'l3-q10',
    level: 3,
    prompt: 'A számegyenesen az X szám pontosan félúton van a 2 300 és a 4 700 között. Melyek az X szám kerek százas szomszédai?',
    highlightValue: 'X = (2 300 + 4 700)/2 százas szomszédai',
    questionTypeBadge: 'Összetett feladat',
    options: ['3 400 és 3 600 (maga a 3 500 a kerek százas)', '3 000 és 4 000', '3 490 és 3 510', '2 000 és 5 000'],
    correctAnswer: '3 400 és 3 600 (maga a 3 500 a kerek százas)',
    explanation: 'X = (2 300 + 4 700) / 2 = 7 000 / 2 = 3 500. Mivel a 3 500 maga is kerek százas, a szomszédos százasai a 3 400 és a 3 600.',
    hint: 'X = 7000 / 2 = 3500. Százas szomszédai: 3400 és 3600.',
    breakdown: [
      { label: 'X értéke', value: '(2 300 + 4 700) / 2 = 3 500' },
      { label: 'Kisebb százas', value: '3 400' },
      { label: 'Nagyobb százas', value: '3 600' }
    ]
  }
];

export const NumberLineQuiz: React.FC<NumberLineQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      topicId="g5-number-line"
      topicTitle="A számok ábrázolása a számegyenesen"
      grade={5}
      chapterId="egesz-szamok"
      title="A számok ábrázolása a számegyenesen Kvíz"
      subtitle="Gyakorold a pontok leolvasását, a lépésközök meghatározását, a felezőpontokat és szomszédokat!"
      topicBadge="5. Osztály • I. Az egész számok"
      questions={questions}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      matcherComponent={<NumberLineMatcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} />}
      sorterComponent={<NumberLineSorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} />}
      levelHubProps={{
        level1: {
          title: '1. Szint: Alapok',
          subtitle: '0–100 közötti skálák',
          focus: 'Lépésközök (1, 2, 5, 10), pontok leolvasása és tízes szomszédok'
        },
        level2: {
          title: '2. Szint: Közepes',
          subtitle: '0–1 000 közötti skálák',
          focus: 'Százas szomszédok, felezőpontok és távolságszámítás'
        },
        level3: {
          title: '3. Szint: Haladó',
          subtitle: 'Nagy számok 10 000-ig',
          focus: 'Ezres skálák, összetett elmozdulások és arányos osztópontok'
        }
      }}
      cheatSheetContent={
        <div className="space-y-4 text-xs">
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800">
            <h4 className="font-bold text-emerald-800 dark:text-emerald-300 mb-1">Lépésköz és Távolság:</h4>
            <p className="text-slate-700 dark:text-slate-300">
              • <strong>Lépésköz:</strong> Két felirat különbsége osztva a közök számával.<br />
              • <strong>Távolság:</strong> Nagyobb szám - Kisebb szám.<br />
              • <strong>Felezőpont:</strong> (Első szám + Második szám) / 2.
            </p>
          </div>

          <div className="p-3 bg-blue-50 dark:bg-blue-950/40 rounded-xl border border-blue-200 dark:border-blue-800">
            <h4 className="font-bold text-blue-800 dark:text-blue-300 mb-1">Szomszédok fajtái (pl. 348 esetén):</h4>
            <p className="text-slate-700 dark:text-slate-300">
              • <strong>Egyes szomszédok:</strong> 347 &lt; 348 &lt; 349<br />
              • <strong>Kerek tízes szomszédok:</strong> 340 &lt; 348 &lt; 350 (50-hez közelebb)<br />
              • <strong>Kerek százas szomszédok:</strong> 300 &lt; 348 &lt; 400 (300-hoz közelebb)
            </p>
          </div>
        </div>
      }
    />
  );
};

export default NumberLineQuiz;
