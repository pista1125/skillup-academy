import React from 'react';
import { QuizTemplate, Question, CheatSheetSection } from '../QuizTemplate';
import { SubtractionMatcher } from './SubtractionMatcher';
import { SubtractionSorter } from './SubtractionSorter';

export interface SubtractionQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const subtractionQuestions: Question[] = [
  // ==========================================
  // LEVEL 1: Fejszámolás, alaptulajdonságok és kerek tízesek (10 kérdés)
  // ==========================================
  {
    id: 'sub-l1-q1',
    level: 1,
    question: 'A 85 – 32 = 53 műveletben melyik szám a KISEBBÍTENDŐ?',
    highlightValue: '85 – 32 = 53',
    options: ['85', '32', '53', 'Egyik sem'],
    correctAnswer: 0,
    hint: 'A kisebbítendő az a szám, amiből elvesszük a másikat (a kivonás első tagja).',
    explanation: 'A kivonás tagjai: Kisebbítendő (85) – Kivonandó (32) = Különbség (53).',
    breakdown: [
      { label: 'Első tag (amiből kivonunk)', value: '85 (Kisebbítendő)' },
      { label: 'Második tag (amennyit kivonunk)', value: '32 (Kivonandó)' },
      { label: 'Végeredmény', value: '53 (Különbség)' }
    ]
  },
  {
    id: 'sub-l1-q2',
    level: 1,
    question: 'Mennyi a 100 – 37 művelet eredménye?',
    highlightValue: '100 – 37',
    options: ['63', '73', '67', '53'],
    correctAnswer: 0,
    hint: 'Bontsd fel a 37-et: 100 – 30 = 70, majd 70 – 7.',
    explanation: '100 – 30 = 70; 70 – 7 = 63. Ellenőrzés: 63 + 37 = 100.',
    breakdown: [
      { label: '1. lépés (tízesek levonása)', value: '100 – 30 = 70' },
      { label: '2. lépés (egyesek levonása)', value: '70 – 7 = 63' }
    ]
  },
  {
    id: 'sub-l1-q3',
    level: 1,
    question: 'Mennyi a 74 – 28 kivonás eredménye fejben?',
    highlightValue: '74 – 28',
    options: ['46', '56', '44', '54'],
    correctAnswer: 0,
    hint: '74 – 20 = 54, majd 54 – 8.',
    explanation: '74 – 20 = 54; 54 – 8 = 46. Ellenőrzés: 46 + 28 = 74.',
    breakdown: [
      { label: '1. lépés', value: '74 – 20 = 54' },
      { label: '2. lépés', value: '54 – 8 = 46' }
    ]
  },
  {
    id: 'sub-l1-q4',
    level: 1,
    question: 'Mit kapunk, ha egy számból 0-t vonunk ki (a – 0)?',
    highlightValue: 'a – 0',
    options: ['Önmagát (a)', '0-t', '1-et', 'Nem értelmezhető'],
    correctAnswer: 0,
    hint: 'Ha semmit sem veszünk el egy mennyiségből, megmarad az eredeti érték.',
    explanation: 'Bármely számból 0-t kivonva a szám értéke változatlan marad: a – 0 = a.',
    breakdown: [
      { label: 'Alapszabály', value: 'a – 0 = a' },
      { label: 'Példa', value: '48 – 0 = 48' }
    ]
  },
  {
    id: 'sub-l1-q5',
    level: 1,
    question: 'Mit kapunk, ha egy számból önmagát vonjuk ki (a – a)?',
    highlightValue: 'a – a',
    options: ['0', '1', 'a', '-a'],
    correctAnswer: 0,
    hint: 'Ha egy dobozból az összes golyót kivesszük, mi marad benne?',
    explanation: 'Ha egy számból kivonjuk önmagát, az eredmény mindig 0: a – a = 0.',
    breakdown: [
      { label: 'Alapszabály', value: 'a – a = 0' },
      { label: 'Példa', value: '154 – 154 = 0' }
    ]
  },
  {
    id: 'sub-l1-q6',
    level: 1,
    question: 'Hogyan ellenőrizzük helyesen a 92 – 38 = 54 kivonást?',
    highlightValue: '92 – 38 = 54',
    options: ['54 + 38 = 92', '92 + 38 = 130', '54 – 38 = 16', '92 + 54 = 146'],
    correctAnswer: 0,
    hint: 'A különbséghez hozzáadjuk a kivonandót, és a kisebbítendőt kell kapnunk.',
    explanation: 'A kivonás inverz művelete az összeadás: Különbség (54) + Kivonandó (38) = Kisebbítendő (92).',
    breakdown: [
      { label: 'Képlet', value: 'Különbség + Kivonandó = Kisebbítendő' },
      { label: 'Számolás', value: '54 + 38 = 92 ✓' }
    ]
  },
  {
    id: 'sub-l1-q7',
    level: 1,
    question: 'Mennyi a 250 – 80 értéke?',
    highlightValue: '250 – 80',
    options: ['170', '180', '160', '190'],
    correctAnswer: 0,
    hint: '250 – 50 = 200, majd 200 – 30.',
    explanation: '250 – 50 = 200, 200 – 30 = 170. Ellenőrzés: 170 + 80 = 250.',
    breakdown: [
      { label: 'Bontás', value: '80 = 50 + 30' },
      { label: 'Számolás', value: '250 – 50 = 200 ⟹ 200 – 30 = 170' }
    ]
  },
  {
    id: 'sub-l1-q8',
    level: 1,
    question: 'Melyik állítás IGAZ a természetes számok körében a kivonásra?',
    highlightValue: 'Kivonás tulajdonságai',
    options: [
      'A kivonás NEM felcserélhető (a – b ≠ b – a)',
      'A kivonás mindig felcserélhető',
      'A kivonás tetszőlegesen csoportosítható',
      '0-ból bármely pozitív szám kivonható'
    ],
    correctAnswer: 0,
    hint: '8 – 3 nem ugyanaz, mint 3 – 8!',
    explanation: 'A kivonás nem felcserélhető és nem csoportosítható.',
    breakdown: [
      { label: 'Példa', value: '8 – 3 = 5, de 3 – 8 nem értelmezhető a természetes számoknál' }
    ]
  },
  {
    id: 'sub-l1-q9',
    level: 1,
    question: 'Mennyi a hiányzó szám: x – 45 = 55?',
    highlightValue: 'x – 45 = 55',
    options: ['100', '10', '90', '110'],
    correctAnswer: 0,
    hint: 'A kisebbítendőt úgy kapjuk meg, hogy a különbséghez hozzáadjuk a kivonandót.',
    explanation: 'x = 55 + 45 = 100.',
    breakdown: [
      { label: 'Összefüggés', value: 'x = 55 + 45' },
      { label: 'Eredmény', value: 'x = 100' }
    ]
  },
  {
    id: 'sub-l1-q10',
    level: 1,
    question: 'Mennyi a hiányzó szám: 90 – x = 34?',
    highlightValue: '90 – x = 34',
    options: ['56', '66', '54', '124'],
    correctAnswer: 0,
    hint: 'A kivonandót úgy kapjuk meg, hogy a kisebbítendőből kivonjuk a különbséget.',
    explanation: 'x = 90 – 34 = 56.',
    breakdown: [
      { label: 'Összefüggés', value: 'x = 90 – 34' },
      { label: 'Eredmény', value: 'x = 56' }
    ]
  },

  // ==========================================
  // LEVEL 2: Írásbeli kivonás 3-jegyű számokkal, átváltásokkal (10 kérdés)
  // ==========================================
  {
    id: 'sub-l2-q1',
    level: 2,
    question: 'Mennyi a 685 – 241 írásbeli kivonás eredménye?',
    highlightValue: '685 – 241',
    options: ['444', '446', '434', '454'],
    correctAnswer: 0,
    hint: 'Itt egyetlen helyiértéken sincs átváltás (5-1=4, 8-4=4, 6-2=4).',
    explanation: 'Egyesek: 5 – 1 = 4. Tízesek: 8 – 4 = 4. Százasok: 6 – 2 = 4. Végeredmény: 444.',
    breakdown: [
      { label: 'Egyesek', value: '5 – 1 = 4' },
      { label: 'Tízesek', value: '8 – 4 = 4' },
      { label: 'Százasok', value: '6 – 2 = 4' }
    ]
  },
  {
    id: 'sub-l2-q2',
    level: 2,
    question: 'Mennyi a 645 – 287 írásbeli kivonás eredménye?',
    highlightValue: '645 – 287',
    options: ['358', '368', '458', '348'],
    correctAnswer: 0,
    hint: '7-hez hogy 15 legyen kell 8 (maradt 1). 8+1=9-hez hogy 14 legyen kell 5 (maradt 1). 2+1=3-hoz hogy 6 legyen kell 3.',
    explanation: 'Pótlási módszerrel: egyeseknél 8 (maradék 1), tízeseknél 5 (maradék 1), százasoknál 3. Eredmény: 358.',
    breakdown: [
      { label: 'Egyesek', value: '7-hez hogy 15 legyen: 8, maradt az 1' },
      { label: 'Tízesek', value: '8 + 1 = 9-hez hogy 14 legyen: 5, maradt az 1' },
      { label: 'Százasok', value: '2 + 1 = 3-hoz hogy 6 legyen: 3' }
    ]
  },
  {
    id: 'sub-l2-q3',
    level: 2,
    question: 'Mennyi a 700 – 238 kivonás eredménye?',
    highlightValue: '700 – 238',
    options: ['462', '472', '562', '468'],
    correctAnswer: 0,
    hint: 'A nullák miatt láncolt átváltás történik: 8-hoz hogy 10 legyen kell 2 (maradt 1).',
    explanation: '8-hoz hogy 10 legyen = 2 (maradt 1); 3+1=4-hez hogy 10 legyen = 6 (maradt 1); 2+1=3-hoz hogy 7 legyen = 4. Eredmény: 462.',
    breakdown: [
      { label: 'Egyesek', value: '8-hoz hogy 10 legyen: 2, maradt 1' },
      { label: 'Tízesek', value: '3 + 1 = 4-hez hogy 10 legyen: 6, maradt 1' },
      { label: 'Százasok', value: '2 + 1 = 3-hoz hogy 7 legyen: 4' }
    ]
  },
  {
    id: 'sub-l2-q4',
    level: 2,
    question: 'Mennyi a 832 – 456 eredménye?',
    highlightValue: '832 – 456',
    options: ['376', '386', '476', '366'],
    correctAnswer: 0,
    hint: '6-hoz hogy 12 legyen kell 6 (maradt 1). 5+1=6-hoz hogy 13 legyen kell 7 (maradt 1). 4+1=5-höz hogy 8 legyen kell 3.',
    explanation: 'Egyesek: 6, Tízesek: 7, Százasok: 3. Eredmény: 376.',
    breakdown: [
      { label: 'Lépések', value: '12 – 6 = 6; 13 – 6 = 7; 8 – 5 = 3' },
      { label: 'Ellenőrzés', value: '376 + 456 = 832 ✓' }
    ]
  },
  {
    id: 'sub-l2-q5',
    level: 2,
    question: 'Kerekítéssel becsülve mennyi a 812 – 389 nagyságrendje?',
    highlightValue: '812 – 389 (százasra kerekítve)',
    options: ['400', '500', '300', '450'],
    correctAnswer: 0,
    hint: '812 ≈ 800, 389 ≈ 400. 800 – 400 = ?',
    explanation: '812 ≈ 800, 389 ≈ 400. A becsült érték: 800 – 400 = 400. (A pontos érték: 423).',
    breakdown: [
      { label: 'Kerekítés', value: '812 ≈ 800; 389 ≈ 400' },
      { label: 'Becslés', value: '800 – 400 = 400' }
    ]
  },
  {
    id: 'sub-l2-q6',
    level: 2,
    question: 'Mennyi a 905 – 418 írásbeli kivonás eredménye?',
    highlightValue: '905 – 418',
    options: ['487', '497', '587', '477'],
    correctAnswer: 0,
    hint: '8-hoz hogy 15 legyen kell 7 (maradt 1). 1+1=2-höz hogy 10 legyen kell 8 (maradt 1). 4+1=5-höz hogy 9 legyen kell 4.',
    explanation: 'Egyesek: 7 (maradt 1), Tízesek: 8 (maradt 1), Százasok: 4. Eredmény: 487.',
    breakdown: [
      { label: 'Egyesek', value: '15 – 8 = 7, maradt 1' },
      { label: 'Tízesek', value: '10 – 2 = 8, maradt 1' },
      { label: 'Százasok', value: '9 – 5 = 4' }
    ]
  },
  {
    id: 'sub-l2-q7',
    level: 2,
    question: 'Egy üzletben 850 Ft-ba kerül egy könyv. 1000 Ft-tal fizetünk. Mennyi visszajárót kapunk?',
    highlightValue: '1 000 Ft – 850 Ft',
    options: ['150 Ft', '250 Ft', '100 Ft', '200 Ft'],
    correctAnswer: 0,
    hint: '1000 – 800 = 200, 200 – 50 = 150.',
    explanation: '1000 – 850 = 150 Ft.',
    breakdown: [
      { label: 'Művelet', value: '1 000 – 850 = 150' },
      { label: 'Válasz', value: '150 Ft visszajáró jár' }
    ]
  },
  {
    id: 'sub-l2-q8',
    level: 2,
    question: 'Mennyi az 1 000 – 648 kivonás eredménye?',
    highlightValue: '1 000 – 648',
    options: ['352', '452', '362', '342'],
    correctAnswer: 0,
    hint: '8-hoz hogy 10 legyen kell 2 (m 1). 4+1=5-höz hogy 10 legyen kell 5 (m 1). 6+1=7-hez hogy 10 legyen kell 3.',
    explanation: '1000 – 648 = 352. Ellenőrzés: 352 + 648 = 1000.',
    breakdown: [
      { label: 'Számolás', value: '1000 – 600 = 400 ⟹ 400 – 48 = 352' }
    ]
  },
  {
    id: 'sub-l2-q9',
    level: 2,
    question: 'Melyik számjegyet kell a ? helyére írni: 5?4 – 238 = 336?',
    highlightValue: '5?4 – 238 = 336',
    options: ['7', '6', '8', '5'],
    correctAnswer: 0,
    hint: 'Ellenőrizd összeadással: 336 + 238 = 574!',
    explanation: '336 + 238 = 574, tehát a hiányzó számjegy a 7.',
    breakdown: [
      { label: 'Ellenőrzés', value: '336 + 238 = 574' },
      { label: 'Hiányzó számjegy', value: '7' }
    ]
  },
  {
    id: 'sub-l2-q10',
    level: 2,
    question: 'Mennyi a 754 – 389 írásbeli kivonás eredménye?',
    highlightValue: '754 – 389',
    options: ['365', '375', '465', '355'],
    correctAnswer: 0,
    hint: '9-hez hogy 14 legyen kell 5 (m 1). 8+1=9-hez hogy 15 legyen kell 6 (m 1). 3+1=4-hez hogy 7 legyen kell 3.',
    explanation: '754 – 389 = 365. Ellenőrzés: 365 + 389 = 754.',
    breakdown: [
      { label: 'Egyesek', value: '14 – 9 = 5' },
      { label: 'Tízesek', value: '15 – 9 = 6' },
      { label: 'Százasok', value: '7 – 4 = 3' }
    ]
  },

  // ==========================================
  // LEVEL 3: Négyjegyű és többjegyű kivonás, rejtvények és szöveges feladatok (10 kérdés)
  // ==========================================
  {
    id: 'sub-l3-q1',
    level: 3,
    question: 'Mennyi a 7 432 – 2 856 írásbeli kivonás eredménye?',
    highlightValue: '7 432 – 2 856',
    options: ['4 576', '4 676', '5 576', '4 586'],
    correctAnswer: 0,
    hint: 'Minden oszlopban átváltás történik (pótlási módszer maradékokkal).',
    explanation: '6-hoz hogy 12 legyen = 6 (m 1); 5+1=6-hoz hogy 13 legyen = 7 (m 1); 8+1=9-hez hogy 14 legyen = 5 (m 1); 2+1=3-hoz hogy 7 legyen = 4. Eredmény: 4 576.',
    breakdown: [
      { label: 'Egyesek', value: '12 – 6 = 6 (m 1)' },
      { label: 'Tízesek', value: '13 – 6 = 7 (m 1)' },
      { label: 'Százasok', value: '14 – 9 = 5 (m 1)' },
      { label: 'Ezresek', value: '7 – 3 = 4' }
    ]
  },
  {
    id: 'sub-l3-q2',
    level: 3,
    question: 'Mennyi az 5 000 – 1 734 kivonás eredménye?',
    highlightValue: '5 000 – 1 734',
    options: ['3 266', '3 366', '4 266', '3 276'],
    correctAnswer: 0,
    hint: '4-hez hogy 10 legyen = 6 (m 1); 3+1=4-hez hogy 10 = 6 (m 1); 7+1=8-hoz hogy 10 = 2 (m 1); 1+1=2-höz hogy 5 = 3.',
    explanation: '5000 – 1734 = 3266. Ellenőrzés: 3266 + 1734 = 5000.',
    breakdown: [
      { label: 'Lépések', value: '10 – 4 = 6; 10 – 4 = 6; 10 – 8 = 2; 5 – 2 = 3' }
    ]
  },
  {
    id: 'sub-l3-q3',
    level: 3,
    question: 'Mennyi a 10 000 – 3 480 eredménye?',
    highlightValue: '10 000 – 3 480',
    options: ['6 520', '7 520', '6 620', '6 480'],
    correctAnswer: 0,
    hint: '10 000 – 3 000 = 7 000, majd 7 000 – 480.',
    explanation: '10 000 – 3 480 = 6 520. Ellenőrzés: 6 520 + 3 480 = 10 000.',
    breakdown: [
      { label: 'Bontás', value: '10 000 – 3 000 = 7 000' },
      { label: 'További levonás', value: '7 000 – 480 = 6 520' }
    ]
  },
  {
    id: 'sub-l3-q4',
    level: 3,
    question: 'Mennyi a 8 210 – 4 675 kivonás eredménye?',
    highlightValue: '8 210 – 4 675',
    options: ['3 535', '3 635', '4 535', '3 545'],
    correctAnswer: 0,
    hint: '5-höz hogy 10 legyen = 5 (m 1); 7+1=8-hoz hogy 11 = 3 (m 1); 6+1=7-hez hogy 12 = 5 (m 1); 4+1=5-höz hogy 8 = 3.',
    explanation: '8 210 – 4 675 = 3 535. Ellenőrzés: 3 535 + 4 675 = 8 210.',
    breakdown: [
      { label: 'Lépések', value: '10-5=5; 11-8=3; 12-7=5; 8-5=3' }
    ]
  },
  {
    id: 'sub-l3-q5',
    level: 3,
    question: 'Egy raktárban 12 500 kg búza volt. Elszállítottak belőle 4 800 kg-ot, majd később még 3 200 kg-ot. Hány kg búza maradt?',
    highlightValue: '12 500 – (4 800 + 3 200)',
    options: ['4 500 kg', '5 500 kg', '4 200 kg', '5 000 kg'],
    correctAnswer: 0,
    hint: 'Összes elszállított búza: 4 800 + 3 200 = 8 000 kg. 12 500 – 8 000 = ?',
    explanation: 'Összesen elszállítottak: 4 800 + 3 200 = 8 000 kg-ot. Maradt: 12 500 – 8 000 = 4 500 kg.',
    breakdown: [
      { label: '1. lépés (összes levonás)', value: '4 800 + 3 200 = 8 000 kg' },
      { label: '2. lépés (maradék)', value: '12 500 – 8 000 = 4 500 kg' }
    ]
  },
  {
    id: 'sub-l3-q6',
    level: 3,
    question: 'Mennyi a 9 004 – 3 568 írásbeli kivonás értéke?',
    highlightValue: '9 004 – 3 568',
    options: ['5 436', '5 536', '6 436', '5 446'],
    correctAnswer: 0,
    hint: '8-hoz hogy 14 legyen = 6 (m 1); 6+1=7-hez hogy 10 = 3 (m 1); 5+1=6-hoz hogy 10 = 4 (m 1); 3+1=4-hez hogy 9 = 5.',
    explanation: '9 004 – 3 568 = 5 436. Ellenőrzés: 5 436 + 3 568 = 9 004.',
    breakdown: [
      { label: 'Számolás', value: '14 – 8 = 6; 10 – 7 = 3; 10 – 6 = 4; 9 – 4 = 5' }
    ]
  },
  {
    id: 'sub-l3-q7',
    level: 3,
    question: 'Ha a kisebbítendőt 50-nel növeljük, és a kivonandót is 50-nel növeljük, hogyan változik a különbség?',
    highlightValue: '(a + 50) – (b + 50)',
    options: [
      'Nem változik',
      '50-nel nő',
      '100-zal nő',
      '50-nel csökken'
    ],
    correctAnswer: 0,
    hint: 'Példa: 100 – 40 = 60. Ha mindkettőhöz adunk 50-et: 150 – 90 = 60!',
    explanation: 'Ez az azonos változtatás elve: ha mindkét taghoz ugyanazt a számot adjuk, a különbség változatlan marad.',
    breakdown: [
      { label: 'Szabály', value: '(a + c) – (b + c) = a – b' },
      { label: 'Eredmény', value: 'A különbség nem változik' }
    ]
  },
  {
    id: 'sub-l3-q8',
    level: 3,
    question: 'Mennyi a hiányzó számjegy A és B értéke a rejtvényben: 6 A 4 – 2 8 B = 3 4 7?',
    highlightValue: '6 A 4 – 2 8 B = 3 4 7',
    options: ['A = 3, B = 7', 'A = 2, B = 7', 'A = 4, B = 7', 'A = 3, B = 8'],
    correctAnswer: 0,
    hint: 'Ellenőrzés: 347 + 28B = 6A4. 7 + B végződése 4 ⟹ B = 7. 347 + 287 = 634 ⟹ A = 3.',
    explanation: '347 + 287 = 634, így A = 3 és B = 7.',
    breakdown: [
      { label: 'Összeadás', value: '347 + 287 = 634' },
      { label: 'A és B', value: 'A = 3, B = 7' }
    ]
  },
  {
    id: 'sub-l3-q9',
    level: 3,
    question: 'Mennyi a 20 000 – 8 450 kivonás eredménye?',
    highlightValue: '20 000 – 8 450',
    options: ['11 550', '12 550', '11 650', '11 450'],
    correctAnswer: 0,
    hint: '20 000 – 8 000 = 12 000, 12 000 – 450 = ?',
    explanation: '20 000 – 8 450 = 11 550. Ellenőrzés: 11 550 + 8 450 = 20 000.',
    breakdown: [
      { label: 'Lépések', value: '20 000 – 8 000 = 12 000 ⟹ 12 000 – 450 = 11 550' }
    ]
  },
  {
    id: 'sub-l3-q10',
    level: 3,
    question: 'Melyik zárójeles kifejezés adja a helyes eredményt: 100 – (40 – 20)?',
    highlightValue: '100 – (40 – 20)',
    options: ['80', '40', '60', '120'],
    correctAnswer: 0,
    hint: 'Először a zárójelben lévő műveletet végezzük el: 40 – 20 = 20.',
    explanation: '100 – (40 – 20) = 100 – 20 = 80. (Figyelem: (100 – 40) – 20 = 60 – 20 = 40 lenne, a zárójel helye számít!).',
    breakdown: [
      { label: '1. lépés (zárójel)', value: '40 – 20 = 20' },
      { label: '2. lépés', value: '100 – 20 = 80' }
    ]
  }
];

const subtractionCheatSheet: CheatSheetSection[] = [
  {
    title: 'A Kivonás Alapfogalmai',
    items: [
      { label: 'Művelet felépítése', value: 'Kisebbítendő – Kivonandó = Különbség' },
      { label: 'Ellenőrzés', value: 'Különbség + Kivonandó = Kisebbítendő' },
      { label: '0 a kivonásban', value: 'a – 0 = a, és a – a = 0' }
    ]
  },
  {
    title: 'Írásbeli Kivonás Szabályai',
    items: [
      { label: 'Elrendezés', value: 'Helyiérték szerint pontosan egymás alá' },
      { label: 'Irány', value: 'Jobbról balra (egyesek, tízesek, százasok...)' },
      { label: 'Pótlási módszer', value: 'Alsóhoz mennyit kell adni, hogy a felső legyen' },
      { label: 'Átvitel (maradék)', value: 'Ha a felső számjegy kisebb, +10 és a következő helyiértéken 1-et levonunk/hozzáadunk' }
    ]
  },
  {
    title: 'Fontos Figyelmeztetések',
    items: [
      { label: 'Nem felcserélhető', value: 'a – b ≠ b – a (a sorrend szigorú)' },
      { label: 'Nem csoportosítható', value: '(a – b) – c ≠ a – (b – c)' },
      { label: 'Azonos változtatás', value: '(a + c) – (b + c) = a – b' }
    ]
  }
];

export function SubtractionQuiz({ onBack, onSwitchToTheory }: SubtractionQuizProps) {
  return (
    <QuizTemplate
      topicId="g5-subtraction"
      topicTitle="Kivonás, írásbeli kivonás"
      grade={5}
      chapterId="egesz-szamok"
      title="Kivonás, írásbeli kivonás Kvíz"
      subtitle="Gyakorold a fejben és írásban történő kivonást, a pótlási technikát és a szöveges feladatokat!"
      questions={subtractionQuestions}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      cheatSheetSections={subtractionCheatSheet}
      matcherComponent={<SubtractionMatcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} />}
      sorterComponent={<SubtractionSorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} />}
    />
  );
}

export default SubtractionQuiz;
