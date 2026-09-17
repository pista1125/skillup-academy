import React from 'react';
import { QuizTemplate, Question, CheatSheetItem, DifficultyLevel } from '../QuizTemplate';
import { Chapter2SummaryMatcher } from './Chapter2SummaryMatcher';
import { Chapter2SummarySorter } from './Chapter2SummarySorter';

export interface Chapter2SummaryQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

export const CHAPTER2_SUMMARY_CHEAT_SHEET: CheatSheetItem[] = [
  {
    topic: '1. Törtek fogalma & Értelmezése',
    formula: 'a/b = a : b (számláló / nevező)',
    note: 'Nevező: hány egyenlő részre osztottuk az egészet. Számláló: hány részt vettünk belőle. Törtrész kiszámítása: alap : nevező · számláló.'
  },
  {
    topic: '2. Bővítés & Egyszerűsítés',
    formula: 'Bővítés: (a·k)/(b·k) | Egyszerűsítés: (a:k)/(b:k)',
    note: 'A tört értéke nem változik, ha a számlálót és a nevezőt ugyanazzal a 0-tól különböző számmal szorozzuk vagy osztjuk.'
  },
  {
    topic: '3. Tört összeadása & Kivonása',
    formula: 'Azonos nevező: (a±c)/b | Különböző: közös nevezőre hozás',
    note: 'Azonos nevezőnél csak a számlálókat adjuk össze vagy vonjuk ki, a nevező változatlan! Különböző nevezőnél előbb legkisebb közös többszörösre bővítünk.'
  },
  {
    topic: '4. Tört szorzása & Osztása egész számmal',
    formula: 'Szorzás: (a·k)/b | Osztás: (a:k)/b vagy a/(b·k)',
    note: 'Szorzáskor csak a számlálót szorozzuk (vagy nevezőt osztjuk). Osztáskor ha a számláló osztható, azt osztjuk, egyébként a nevezőt szorozzuk.'
  },
  {
    topic: '5. Műveleti sorrend',
    formula: '1. Zárójel () → 2. Szorzás, osztás (·, :) → 3. Összeadás, kivonás (+, -)',
    note: 'Azonos prioritású műveleteket balról jobbra haladva végzünk el.'
  },
  {
    topic: '6. Tizedes törtek helyiértékei',
    formula: '..., E , t , sz , ez ... (0,1; 0,01; 0,001)',
    note: 'A tizedesvessző választja el az egész részt a törtrésztől. Összeadásnál és kivonásnál vessző a vessző alá kerül!'
  },
  {
    topic: '7. Tizedes törtek szorzása & Osztása 10, 100, 1000-rel',
    formula: 'Szorzás: vessző jobbra → | Osztás: vessző balra ←',
    note: 'Annyi hellyel léptetjük a vesszőt, ahány 0 van a 10, 100, 1000-ben. Ha elfogynak a számjegyek, nullákkal pótoljuk.'
  },
  {
    topic: '8. Közönséges tört ↔ Tizedes tört',
    formula: '1/2=0,5 | 1/4=0,25 | 3/4=0,75 | 1/5=0,2 | 1/8=0,125',
    note: 'Átváltás bővítéssel 10, 100, 1000 nevezőre, vagy a számláló nevezővel való írásbeli elosztásával.'
  }
];

export const chapter2SummaryQuestions: Record<DifficultyLevel, Question[]> = {
  // 1. SZINT: KÖNNYŰ (30 feladat) - Alapfogalmak, alapműveletek, helyiértékek és nevezetes törtek
  1: [
    {
      id: 'q1-1',
      level: 1,
      question: 'A 3/7 közönséges törtben mi a 7-es szám elnevezése?',
      options: ['Nevező', 'Számláló', 'Törtvonal', 'Hányados'],
      correctAnswer: 'Nevező',
      explanation: 'A törtvonal alatti szám a nevező, amely megnevezi, hogy hány egyenlő részre osztottuk az egészet.',
      steps: [{ label: '1. Szabály', value: 'Fent van a számláló, lent a nevező' }],
      hint: 'A nevező megnevezi a részeket (lent áll)!',
      formula: 'a/b = számláló / nevező'
    },
    {
      id: 'q1-2',
      level: 1,
      question: 'A 4/9 közönséges törtben mi a 4-es szám elnevezése?',
      options: ['Számláló', 'Nevező', 'Osztó', 'Különbség'],
      correctAnswer: 'Számláló',
      explanation: 'A törtvonal feletti szám a számláló, amely megszámolja, hány részt vettünk.',
      steps: [{ label: '1. Szabály', value: 'A felső szám a számláló' }],
      hint: 'A számláló számlálja a részeket (fent áll)!',
      formula: 'a/b = számláló / nevező'
    },
    {
      id: 'q1-3',
      level: 1,
      question: 'Mennyi a 20-nak a 3/4 része?',
      options: ['15', '12', '16', '5'],
      correctAnswer: '15',
      explanation: '20 : 4 = 5 (egy negyed), majd 5 · 3 = 15 (három negyed).',
      steps: [
        { label: '1. Egy rész', value: '20 : 4 = 5' },
        { label: '2. Három rész', value: '5 · 3 = 15' }
      ],
      hint: 'Oszd el a nevezővel (4), majd szorozd a számlálóval (3)!',
      formula: '20 · 3/4 = (20 : 4) · 3 = 15'
    },
    {
      id: 'q1-4',
      level: 1,
      question: 'Mennyi a 30-nak a 2/5 része?',
      options: ['12', '15', '6', '18'],
      correctAnswer: '12',
      explanation: '30 : 5 = 6 (egy ötöd), majd 6 · 2 = 12 (két ötöd).',
      steps: [
        { label: '1. Egy rész', value: '30 : 5 = 6' },
        { label: '2. Két rész', value: '6 · 2 = 12' }
      ],
      hint: 'Oszd el 5-tel, majd szorozd 2-vel!',
      formula: '30 · 2/5 = (30 : 5) · 2 = 12'
    },
    {
      id: 'q1-5',
      level: 1,
      question: 'Bővítsd az 1/3 törtet 4-gyel!',
      options: ['4/12', '4/3', '1/12', '5/7'],
      correctAnswer: '4/12',
      explanation: 'Bővítéskor a számlálót és a nevezőt is megszorozzuk 4-gyel: (1 · 4)/(3 · 4) = 4/12.',
      steps: [{ label: '1. Bővítés', value: '(1 · 4)/(3 · 4) = 4/12' }],
      hint: 'Szorozd meg mindkét számot 4-gyel!',
      formula: '1/3 = (1 · 4)/(3 · 4) = 4/12'
    },
    {
      id: 'q1-6',
      level: 1,
      question: 'Bővítsd a 2/5 törtet 3-mal!',
      options: ['6/15', '6/5', '2/15', '5/8'],
      correctAnswer: '6/15',
      explanation: '2 · 3 = 6 és 5 · 3 = 15, így 6/15.',
      steps: [{ label: '1. Bővítés', value: '(2 · 3)/(5 · 3) = 6/15' }],
      hint: 'Szorozd a felsőt és az alsót is 3-mal!',
      formula: '2/5 = 6/15'
    },
    {
      id: 'q1-7',
      level: 1,
      question: 'Egyszerűsítsd a 6/8 törtet a legegyszerűbb alakra!',
      options: ['3/4', '2/4', '3/8', '6/4'],
      correctAnswer: '3/4',
      explanation: 'A számlálót és nevezőt is elosztjuk 2-vel: 6 : 2 = 3, 8 : 2 = 4, így 3/4.',
      steps: [{ label: '1. Osztás 2-vel', value: '(6 : 2)/(8 : 2) = 3/4' }],
      hint: 'Oszd el mindkettőt 2-vel!',
      formula: '6/8 = 3/4'
    },
    {
      id: 'q1-8',
      level: 1,
      question: 'Egyszerűsítsd a 10/15 törtet 5-tel!',
      options: ['2/3', '2/5', '1/3', '5/15'],
      correctAnswer: '2/3',
      explanation: '10 : 5 = 2 és 15 : 5 = 3, így 2/3.',
      steps: [{ label: '1. Osztás 5-tel', value: '(10 : 5)/(15 : 5) = 2/3' }],
      hint: 'Oszd el a számlálót és a nevezőt is 5-tel!',
      formula: '10/15 = 2/3'
    },
    {
      id: 'q1-9',
      level: 1,
      question: 'Számítsd ki: 2/7 + 3/7 = ?',
      options: ['5/7', '5/14', '6/7', '1/7'],
      correctAnswer: '5/7',
      explanation: 'Azonos nevezőnél a számlálókat összeadjuk: 2 + 3 = 5, a nevező marad 7.',
      steps: [{ label: '1. Összeadás', value: '(2 + 3)/7 = 5/7' }],
      hint: 'Csak a számlálókat add össze, a nevező nem változik!',
      formula: '2/7 + 3/7 = 5/7'
    },
    {
      id: 'q1-10',
      level: 1,
      question: 'Számítsd ki: 5/9 - 2/9 = ?',
      options: ['3/9 (1/3)', '3/0', '7/9', '3/18'],
      correctAnswer: '3/9 (1/3)',
      explanation: '5/9 - 2/9 = 3/9, ami egyszerűsítve 1/3.',
      steps: [{ label: '1. Kivonás', value: '(5 - 2)/9 = 3/9 = 1/3' }],
      hint: '5 - 2 = 3 a kilencedek száma.',
      formula: '5/9 - 2/9 = 3/9 = 1/3'
    },
    {
      id: 'q1-11',
      level: 1,
      question: 'Számítsd ki: 7/12 + 1/12 = ?',
      options: ['8/12 (2/3)', '8/24', '6/12', '8/1'],
      correctAnswer: '8/12 (2/3)',
      explanation: '7/12 + 1/12 = 8/12, 4-gyel egyszerűsítve 2/3.',
      steps: [{ label: '1. Összeg', value: '8/12 = 2/3' }],
      hint: '7 + 1 = 8 tizenketted, egyszerűsíts 4-gyel!',
      formula: '7/12 + 1/12 = 8/12 = 2/3'
    },
    {
      id: 'q1-12',
      level: 1,
      question: 'Számítsd ki: 1 egész - 3/5 = ?',
      options: ['2/5', '3/5', '1/5', '4/5'],
      correctAnswer: '2/5',
      explanation: '1 egész = 5/5. Ebből kivonva 3/5-öt: 5/5 - 3/5 = 2/5.',
      steps: [
        { label: '1. Átírás', value: '1 = 5/5' },
        { label: '2. Kivonás', value: '5/5 - 3/5 = 2/5' }
      ],
      hint: '1 egész az 5 ötöd!',
      formula: '1 - 3/5 = 5/5 - 3/5 = 2/5'
    },
    {
      id: 'q1-13',
      level: 1,
      question: 'Számítsd ki: 2/3 · 2 = ?',
      options: ['4/3 (1 1/3)', '4/6', '2/6', '1/3'],
      correctAnswer: '4/3 (1 1/3)',
      explanation: 'Csak a számlálót szorozzuk: 2 · 2 = 4, a nevező 3 marad → 4/3 = 1 egész 1/3.',
      steps: [{ label: '1. Szorzás', value: '(2 · 2)/3 = 4/3 = 1 1/3' }],
      hint: 'Csak a felső számot szorozd meg 2-vel!',
      formula: '2/3 · 2 = 4/3'
    },
    {
      id: 'q1-14',
      level: 1,
      question: 'Számítsd ki: 1/5 · 4 = ?',
      options: ['4/5', '4/20', '1/20', '5/4'],
      correctAnswer: '4/5',
      explanation: '1 · 4 = 4, a nevező 5 → 4/5.',
      steps: [{ label: '1. Szorzás', value: '(1 · 4)/5 = 4/5' }],
      hint: '1 ötöd négyszerese = 4 ötöd!',
      formula: '1/5 · 4 = 4/5'
    },
    {
      id: 'q1-15',
      level: 1,
      question: 'Számítsd ki: 4/7 : 2 = ?',
      options: ['2/7', '4/14', '2/14', '8/7'],
      correctAnswer: '2/7',
      explanation: 'Mivel a számláló (4) osztható 2-vel, azt osztjuk: 4 : 2 = 2, a nevező 7 marad → 2/7.',
      steps: [{ label: '1. Számláló osztása', value: '(4 : 2)/7 = 2/7' }],
      hint: 'Oszd el a 4-et 2-vel!',
      formula: '4/7 : 2 = 2/7'
    },
    {
      id: 'q1-16',
      level: 1,
      question: 'Számítsd ki: 6/11 : 3 = ?',
      options: ['2/11', '6/33', '2/33', '18/11'],
      correctAnswer: '2/11',
      explanation: '6 : 3 = 2, a nevező 11 marad → 2/11.',
      steps: [{ label: '1. Számláló osztása', value: '(6 : 3)/11 = 2/11' }],
      hint: '6-ban a 3 megvan 2-szer!',
      formula: '6/11 : 3 = 2/11'
    },
    {
      id: 'q1-17',
      level: 1,
      question: 'Hogyan olvassuk ki a 0,4 tizedes törtet?',
      options: ['4 tized', '4 század', '4 ezred', '4 egész'],
      correctAnswer: '4 tized',
      explanation: 'A tizedesvessző utáni első hely a tizedek helye: 0,4 = 4 tized = 4/10.',
      steps: [{ label: '1. Helyi érték', value: '1. jegy = tized' }],
      hint: 'Egy tizedesjegy = tized!',
      formula: '0,4 = 4/10'
    },
    {
      id: 'q1-18',
      level: 1,
      question: 'Hogyan írjuk le tizedes törtként a 7 századot?',
      options: ['0,07', '0,7', '0,007', '7,00'],
      correctAnswer: '0,07',
      explanation: 'A század a 2. tizedesjegy: 0 tized, 7 század → 0,07.',
      steps: [{ label: '1. Helyi érték', value: '2 tizedesjegy szükséges: 0,07' }],
      hint: 'Két helyi érték kell a vessző után!',
      formula: '7/100 = 0,07'
    },
    {
      id: 'q1-19',
      level: 1,
      question: 'Hogyan írjuk le tizedes törtként az 5 ezredet?',
      options: ['0,005', '0,05', '0,5', '5,000'],
      correctAnswer: '0,005',
      explanation: 'Az ezred a 3. tizedesjegy: 0,005.',
      steps: [{ label: '1. Helyi érték', value: '3 tizedesjegy: 0,005' }],
      hint: 'Három hely kell a vessző után: 0,005!',
      formula: '5/1000 = 0,005'
    },
    {
      id: 'q1-20',
      level: 1,
      question: 'Számítsd ki fejben: 3,2 + 1,5 = ?',
      options: ['4,7', '4,8', '3,7', '5,7'],
      correctAnswer: '4,7',
      explanation: '3 + 1 = 4 egész, 0,2 + 0,5 = 0,7 tized → 4,7.',
      steps: [{ label: '1. Összeg', value: '3,2 + 1,5 = 4,7' }],
      hint: 'Egészekhez egészeket, tizedekhez tizedeket adj!',
      formula: '3,2 + 1,5 = 4,7'
    },
    {
      id: 'q1-21',
      level: 1,
      question: 'Számítsd ki: 5,8 - 2,3 = ?',
      options: ['3,5', '3,6', '2,5', '7,1'],
      correctAnswer: '3,5',
      explanation: '5 - 2 = 3, 0,8 - 0,3 = 0,5 → 3,5.',
      steps: [{ label: '1. Kivonás', value: '5,8 - 2,3 = 3,5' }],
      hint: '5 - 2 = 3 és 8 - 3 = 5!',
      formula: '5,8 - 2,3 = 3,5'
    },
    {
      id: 'q1-22',
      level: 1,
      question: 'Számítsd ki: 0,45 · 10 = ?',
      options: ['4,5', '45', '0,045', '450'],
      correctAnswer: '4,5',
      explanation: '10-zel szorozva a vessző 1 hellyel jobbra lép: 0,45 · 10 = 4,5.',
      steps: [{ label: '1. Vessző léptetése', value: '0,45 → 4,5' }],
      hint: 'Tolj egyet a vesszőn jobbra!',
      formula: '0,45 · 10 = 4,5'
    },
    {
      id: 'q1-23',
      level: 1,
      question: 'Számítsd ki: 0,08 · 100 = ?',
      options: ['8', '0,8', '80', '800'],
      correctAnswer: '8',
      explanation: '100-zal szorozva 2 hellyel lép jobbra a vessző: 0,08 · 100 = 8.',
      steps: [{ label: '1. Léptetés 2 hellyel', value: '0,08 → 8' }],
      hint: '100-ban 2 nulla van, 2 jegyet lépünk jobbra!',
      formula: '0,08 · 100 = 8'
    },
    {
      id: 'q1-24',
      level: 1,
      question: 'Számítsd ki: 35,6 : 10 = ?',
      options: ['3,56', '0,356', '356', '35,06'],
      correctAnswer: '3,56',
      explanation: '10-zel osztva 1 hellyel balra lép a vessző: 35,6 : 10 = 3,56.',
      steps: [{ label: '1. Vessző balra', value: '35,6 → 3,56' }],
      hint: '10-zel osztásnál 1-et lép balra a vessző!',
      formula: '35,6 : 10 = 3,56'
    },
    {
      id: 'q1-25',
      level: 1,
      question: 'Számítsd ki: 128 : 100 = ?',
      options: ['1,28', '12,8', '0,128', '1280'],
      correctAnswer: '1,28',
      explanation: '100-zal osztva 2 hellyel balra lép a vessző: 128 : 100 = 1,28.',
      steps: [{ label: '1. Léptetés 2 hellyel balra', value: '128,0 → 1,28' }],
      hint: '100-zal osztás = 2 hely balra.',
      formula: '128 : 100 = 1,28'
    },
    {
      id: 'q1-26',
      level: 1,
      question: 'Mennyi az 1/2 tizedes tört alakja?',
      options: ['0,5', '0,2', '0,05', '1,2'],
      correctAnswer: '0,5',
      explanation: '1/2 = 5/10 = 0,5 (fél).',
      steps: [{ label: '1. Tizedes alak', value: '1/2 = 0,5' }],
      hint: 'A fél az 0,5!',
      formula: '1/2 = 0,5'
    },
    {
      id: 'q1-27',
      level: 1,
      question: 'Mennyi az 1/4 tizedes tört alakja?',
      options: ['0,25', '0,4', '0,04', '0,5'],
      correctAnswer: '0,25',
      explanation: '1/4 = 25/100 = 0,25 (negyed).',
      steps: [{ label: '1. Tizedes alak', value: '1/4 = 0,25' }],
      hint: 'A negyed az 25 század = 0,25!',
      formula: '1/4 = 0,25'
    },
    {
      id: 'q1-28',
      level: 1,
      question: 'Mennyi a 3/4 tizedes tört alakja?',
      options: ['0,75', '0,34', '0,3', '0,43'],
      correctAnswer: '0,75',
      explanation: '3/4 = 75/100 = 0,75 (háromnegyed).',
      steps: [{ label: '1. Tizedes alak', value: '3/4 = 0,75' }],
      hint: '3 · 0,25 = 0,75!',
      formula: '3/4 = 0,75'
    },
    {
      id: 'q1-29',
      level: 1,
      question: 'Mennyi az 1/5 tizedes tört alakja?',
      options: ['0,2', '0,5', '0,15', '0,02'],
      correctAnswer: '0,2',
      explanation: '1/5 = 2/10 = 0,2.',
      steps: [{ label: '1. Bővítés 2-vel', value: '1/5 = 2/10 = 0,2' }],
      hint: 'Bővítsd 2-vel a nevezőt 10-re!',
      formula: '1/5 = 0,2'
    },
    {
      id: 'q1-30',
      level: 1,
      question: 'Melyik szám a nagyobb: 0,4 vagy 0,39?',
      options: ['0,4', '0,39', 'Egyenlőek', 'Nem összehasonlíthatóak'],
      correctAnswer: '0,4',
      explanation: '0,4 = 0,40. Mivel 40 század > 39 század, a 0,4 a nagyobb.',
      steps: [
        { label: '1. Nullák kiegészítése', value: '0,40 vs 0,39' },
        { label: '2. Összehasonlítás', value: '0,40 > 0,39' }
      ],
      hint: '0,40 nagyobb, mint 0,39!',
      formula: '0,4 > 0,39'
    }
  ],

  // 2. SZINT: KÖZEPES (30 feladat) - Különböző nevezők, írásbeli műveletek, vegyes törtek, kerekítés
  2: [
    {
      id: 'q2-1',
      level: 2,
      question: 'Számítsd ki: 1/2 + 1/3 = ?',
      options: ['5/6', '2/5', '2/6', '1/6'],
      correctAnswer: '5/6',
      explanation: 'Közös nevező a 6: 3/6 + 2/6 = 5/6.',
      steps: [
        { label: '1. Közös nevező', value: 'LKKT(2,3) = 6' },
        { label: '2. Bővítés', value: '3/6 + 2/6 = 5/6' }
      ],
      hint: 'Bővíts 6-odokra: 3/6 + 2/6!',
      formula: '1/2 + 1/3 = 3/6 + 2/6 = 5/6'
    },
    {
      id: 'q2-2',
      level: 2,
      question: 'Számítsd ki: 3/4 - 1/2 = ?',
      options: ['1/4', '2/2', '2/4', '1/2'],
      correctAnswer: '1/4',
      explanation: '1/2 = 2/4. Így 3/4 - 2/4 = 1/4.',
      steps: [{ label: '1. Bővítés', value: '3/4 - 2/4 = 1/4' }],
      hint: '3 negyedből vegyél el 2 negyedet!',
      formula: '3/4 - 1/2 = 3/4 - 2/4 = 1/4'
    },
    {
      id: 'q2-3',
      level: 2,
      question: 'Számítsd ki: 2/3 + 1/4 = ?',
      options: ['11/12', '3/7', '3/12', '8/12'],
      correctAnswer: '11/12',
      explanation: 'Közös nevező a 12: 8/12 + 3/12 = 11/12.',
      steps: [
        { label: '1. Bővítés 12-re', value: '2/3 = 8/12, 1/4 = 3/12' },
        { label: '2. Összeg', value: '8/12 + 3/12 = 11/12' }
      ],
      hint: 'Közös nevező a 12 (8/12 + 3/12).',
      formula: '2/3 + 1/4 = 8/12 + 3/12 = 11/12'
    },
    {
      id: 'q2-4',
      level: 2,
      question: 'Számítsd ki: 5/6 - 1/3 = ?',
      options: ['1/2 (3/6)', '4/3', '4/6', '2/3'],
      correctAnswer: '1/2 (3/6)',
      explanation: '1/3 = 2/6. Így 5/6 - 2/6 = 3/6 = 1/2.',
      steps: [{ label: '1. Kivonás', value: '5/6 - 2/6 = 3/6 = 1/2' }],
      hint: '5/6 - 2/6 = 3/6, amit egyszerűsíthetsz!',
      formula: '5/6 - 1/3 = 3/6 = 1/2'
    },
    {
      id: 'q2-5',
      level: 2,
      question: 'Számítsd ki: 3/8 + 1/4 = ?',
      options: ['5/8', '4/12', '4/8', '1/2'],
      correctAnswer: '5/8',
      explanation: '1/4 = 2/8. Így 3/8 + 2/8 = 5/8.',
      steps: [{ label: '1. Összeg', value: '3/8 + 2/8 = 5/8' }],
      hint: '1/4 az 2/8. Add hozzá a 3/8-hoz!',
      formula: '3/8 + 1/4 = 5/8'
    },
    {
      id: 'q2-6',
      level: 2,
      question: 'Számítsd ki: 7/10 - 2/5 = ?',
      options: ['3/10', '5/5', '5/10', '1/2'],
      correctAnswer: '3/10',
      explanation: '2/5 = 4/10. Így 7/10 - 4/10 = 3/10.',
      steps: [{ label: '1. Bővítés', value: '7/10 - 4/10 = 3/10' }],
      hint: '2/5 = 4 tized. 7 tizedből vonj ki 4 tizedet!',
      formula: '7/10 - 2/5 = 3/10'
    },
    {
      id: 'q2-7',
      level: 2,
      question: 'Számítsd ki: 1 egész 1/2 + 2 egész 1/4 = ?',
      options: ['3 egész 3/4', '3 egész 2/6', '4 egész', '3 egész 1/4'],
      correctAnswer: '3 egész 3/4',
      explanation: 'Egészek összege: 1 + 2 = 3. Törtek összege: 2/4 + 1/4 = 3/4 → 3 egész 3/4.',
      steps: [
        { label: '1. Egészek', value: '1 + 2 = 3' },
        { label: '2. Törtek', value: '2/4 + 1/4 = 3/4' },
        { label: '3. Eredmény', value: '3 egész 3/4' }
      ],
      hint: '1 + 2 = 3 egész, 2/4 + 1/4 = 3/4!',
      formula: '1 1/2 + 2 1/4 = 3 3/4'
    },
    {
      id: 'q2-8',
      level: 2,
      question: 'Számítsd ki: 3 egész 1/3 - 1 egész 2/3 = ?',
      options: ['1 egész 2/3', '2 egész 1/3', '1 egész 1/3', '2 egész'],
      correctAnswer: '1 egész 2/3',
      explanation: '3 egész 1/3 = 2 egész 4/3. Ebből levonva 1 egész 2/3-ot: 1 egész 2/3.',
      steps: [
        { label: '1. Felbontás', value: '3 1/3 = 2 4/3' },
        { label: '2. Kivonás', value: '2 4/3 - 1 2/3 = 1 2/3' }
      ],
      hint: 'Válts fel 1 egészet 3 harmadra a kivonáshoz!',
      formula: '3 1/3 - 1 2/3 = 1 2/3'
    },
    {
      id: 'q2-9',
      level: 2,
      question: 'Számítsd ki: 3/5 · 3 = ?',
      options: ['9/5 (1 4/5)', '9/15', '1/5', '6/5'],
      correctAnswer: '9/5 (1 4/5)',
      explanation: '3 · 3 = 9, nevező 5 → 9/5 = 1 egész 4/5.',
      steps: [{ label: '1. Szorzás', value: '(3 · 3)/5 = 9/5 = 1 4/5' }],
      hint: '3 · 3 = 9 ötöd!',
      formula: '3/5 · 3 = 9/5 = 1 4/5'
    },
    {
      id: 'q2-10',
      level: 2,
      question: 'Számítsd ki: 5/8 · 4 = ?',
      options: ['5/2 (2 1/2)', '20/32', '5/32', '20/8 (2 4/8)'],
      correctAnswer: '5/2 (2 1/2)',
      explanation: '5/8 · 4 = 20/8 = 5/2 = 2 egész 1/2 (vagy 8 : 4 = 2 miatt közvetlenül 5/2).',
      steps: [{ label: '1. Egyszerűsítés', value: '5/8 · 4 = 5/2 = 2 1/2' }],
      hint: 'Oszd el a nevezőt 4-gyel: 5/2 = 2 és fél!',
      formula: '5/8 · 4 = 5/2 = 2 1/2'
    },
    {
      id: 'q2-11',
      level: 2,
      question: 'Számítsd ki: 2/7 : 3 = ?',
      options: ['2/21', '6/7', '2/10', '6/21'],
      correctAnswer: '2/21',
      explanation: 'Mivel a 2 nem osztható 3-mal, a nevezőt szorozzuk: 7 · 3 = 21 → 2/21.',
      steps: [{ label: '1. Nevező szorzása', value: '2 / (7 · 3) = 2/21' }],
      hint: 'Szorozd a nevezőt 3-mal: 7 · 3 = 21!',
      formula: '2/7 : 3 = 2/21'
    },
    {
      id: 'q2-12',
      level: 2,
      question: 'Számítsd ki: 3/4 : 2 = ?',
      options: ['3/8', '6/4', '3/2', '1/4'],
      correctAnswer: '3/8',
      explanation: 'A számláló (3) nem osztható 2-vel, így a nevezőt szorozzuk 2-vel: 4 · 2 = 8 → 3/8.',
      steps: [{ label: '1. Nevező szorzása', value: '3 / (4 · 2) = 3/8' }],
      hint: '4 · 2 = 8 a nevezőben.',
      formula: '3/4 : 2 = 3/8'
    },
    {
      id: 'q2-13',
      level: 2,
      question: 'Számítsd ki: 4/5 : 2 = ?',
      options: ['2/5', '4/10', '2/10', '8/5'],
      correctAnswer: '2/5',
      explanation: 'Mivel a 4 osztható 2-vel, a számlálót osztjuk: 4 : 2 = 2 → 2/5.',
      steps: [{ label: '1. Számláló osztása', value: '(4 : 2)/5 = 2/5' }],
      hint: '4 osztva 2-vel az 2!',
      formula: '4/5 : 2 = 2/5'
    },
    {
      id: 'q2-14',
      level: 2,
      question: 'Számítsd ki írásban: 12,45 + 3,8 = ?',
      options: ['16,25', '15,53', '16,53', '15,25'],
      correctAnswer: '16,25',
      explanation: '12,45 + 3,80 = 16,25.',
      steps: [
        { label: '1. Kiegészítés', value: '12,45 + 03,80' },
        { label: '2. Összeadás', value: '16,25' }
      ],
      hint: 'Írj egy nullát a 3,8 mögé (3,80)!',
      formula: '12,45 + 3,80 = 16,25'
    },
    {
      id: 'q2-15',
      level: 2,
      question: 'Számítsd ki írásban: 7,2 - 3,45 = ?',
      options: ['3,75', '3,85', '4,25', '4,75'],
      correctAnswer: '3,75',
      explanation: '7,20 - 3,45 = 3,75.',
      steps: [
        { label: '1. Kiegészítés', value: '7,20 - 3,45' },
        { label: '2. Kivonás', value: '3,75' }
      ],
      hint: '7,20-ból vonj ki 3,45-öt!',
      formula: '7,20 - 3,45 = 3,75'
    },
    {
      id: 'q2-16',
      level: 2,
      question: 'Számítsd ki: 15 - 4,32 = ?',
      options: ['10,68', '11,68', '10,78', '11,32'],
      correctAnswer: '10,68',
      explanation: '15,00 - 4,32 = 10,68.',
      steps: [{ label: '1. Kivonás', value: '15,00 - 4,32 = 10,68' }],
      hint: '15,00-ból vonj ki 4,32-t!',
      formula: '15,00 - 4,32 = 10,68'
    },
    {
      id: 'q2-17',
      level: 2,
      question: 'Számítsd ki: 2,34 · 1000 = ?',
      options: ['2340', '234', '23400', '23,4'],
      correctAnswer: '2340',
      explanation: '1000-rel szorozva 3 hellyel jobbra lépünk (nulla pótlásával): 2,340 · 1000 = 2340.',
      steps: [{ label: '1. Léptetés 3 hellyel', value: '2,340 → 2340' }],
      hint: '3-at kell lépni jobbra, tegyél egy nullát a végére!',
      formula: '2,34 · 1000 = 2340'
    },
    {
      id: 'q2-18',
      level: 2,
      question: 'Számítsd ki: 5,4 : 100 = ?',
      options: ['0,054', '0,54', '0,0054', '54'],
      correctAnswer: '0,054',
      explanation: '100-zal osztva 2 hellyel balra lép a vessző: 5,4 : 100 = 0,054.',
      steps: [{ label: '1. Léptetés balra', value: '005,4 → 0,054' }],
      hint: 'Tolj 2-t balra a vesszőn nullákkal pótolva!',
      formula: '5,4 : 100 = 0,054'
    },
    {
      id: 'q2-19',
      level: 2,
      question: 'Számítsd ki: 2,5 · 4 = ?',
      options: ['10', '10,5', '8,5', '100'],
      correctAnswer: '10',
      explanation: '2,5 · 4 = 10,0 = 10.',
      steps: [{ label: '1. Szorzás', value: '2,5 · 4 = 10' }],
      hint: '4 darab két és fél az pontosan 10!',
      formula: '2,5 · 4 = 10'
    },
    {
      id: 'q2-20',
      level: 2,
      question: 'Számítsd ki: 1,25 · 6 = ?',
      options: ['7,5', '7,25', '6,5', '7,55'],
      correctAnswer: '7,5',
      explanation: '1 · 6 = 6 és 0,25 · 6 = 1,5 → 6 + 1,5 = 7,5.',
      steps: [{ label: '1. Szorzás', value: '1,25 · 6 = 7,50 = 7,5' }],
      hint: '6 egész + 6 negyed (1,5) = 7,5!',
      formula: '1,25 · 6 = 7,5'
    },
    {
      id: 'q2-21',
      level: 2,
      question: 'Számítsd ki: 8,4 : 4 = ?',
      options: ['2,1', '2,2', '1,1', '21'],
      correctAnswer: '2,1',
      explanation: '8 : 4 = 2 és 0,4 : 4 = 0,1 → 2,1.',
      steps: [{ label: '1. Osztás', value: '8,4 : 4 = 2,1' }],
      hint: '8 : 4 = 2 és 4 : 4 = 1 tized!',
      formula: '8,4 : 4 = 2,1'
    },
    {
      id: 'q2-22',
      level: 2,
      question: 'Számítsd ki: 15,6 : 3 = ?',
      options: ['5,2', '5,3', '4,2', '52'],
      correctAnswer: '5,2',
      explanation: '15 : 3 = 5, maradék 0, majd vessző kirakása után 6 : 3 = 2 → 5,2.',
      steps: [{ label: '1. Osztás', value: '15,6 : 3 = 5,2' }],
      hint: '15-ben a 3 megvan 5-ször, 6 tizedben 2-szer!',
      formula: '15,6 : 3 = 5,2'
    },
    {
      id: 'q2-23',
      level: 2,
      question: 'Kerekítsd a 4,37 tizedes törtet tizedekre!',
      options: ['4,4', '4,3', '4,0', '4,5'],
      correctAnswer: '4,4',
      explanation: 'A tizedek utáni jegy a 7 (5 vagy nagyobb), így felfelé kerekítünk: 4,4.',
      steps: [
        { label: '1. Következő jegy', value: '7 (felfelé kerekít)' },
        { label: '2. Eredmény', value: '4,4' }
      ],
      hint: 'A 7-es miatt 3-ból 4 lesz!',
      formula: '4,37 ≈ 4,4'
    },
    {
      id: 'q2-24',
      level: 2,
      question: 'Kerekítsd a 8,245 tizedes törtet századokra!',
      options: ['8,25', '8,24', '8,20', '8,30'],
      correctAnswer: '8,25',
      explanation: 'Az ezredek helyén 5 áll, ami felfelé kerekítést jelent: 8,25.',
      steps: [{ label: '1. Kerekítés', value: '8,245 → 8,25' }],
      hint: 'Az 5-ös felfelé kerekíti a századokat!',
      formula: '8,245 ≈ 8,25'
    },
    {
      id: 'q2-25',
      level: 2,
      question: 'Mennyi az 1/8 tizedes tört alakja?',
      options: ['0,125', '0,8', '0,08', '0,18'],
      correctAnswer: '0,125',
      explanation: '1/8 = 125/1000 = 0,125.',
      steps: [{ label: '1. Bővítés 125-tel', value: '1/8 = 125/1000 = 0,125' }],
      hint: '1 : 8 = 0,125!',
      formula: '1/8 = 0,125'
    },
    {
      id: 'q2-26',
      level: 2,
      question: 'Mennyi a 3/8 tizedes tört alakja?',
      options: ['0,375', '0,38', '0,35', '0,125'],
      correctAnswer: '0,375',
      explanation: '3 · 0,125 = 0,375.',
      steps: [{ label: '1. Számolás', value: '3 · 125 = 375 ezred = 0,375' }],
      hint: '3 · 0,125 = 0,375!',
      formula: '3/8 = 0,375'
    },
    {
      id: 'q2-27',
      level: 2,
      question: 'Mennyi a 7/20 tizedes tört alakja?',
      options: ['0,35', '0,7', '0,035', '0,14'],
      correctAnswer: '0,35',
      explanation: '5-tel bővítve 100-ra: 7 · 5 = 35, így 35/100 = 0,35.',
      steps: [{ label: '1. Bővítés 5-tel', value: '7/20 = 35/100 = 0,35' }],
      hint: 'Bővítsd a 20-at 5-tel 100-ra!',
      formula: '7/20 = 35/100 = 0,35'
    },
    {
      id: 'q2-28',
      level: 2,
      question: 'Mennyi a 9/25 tizedes tört alakja?',
      options: ['0,36', '0,9', '0,45', '0,09'],
      correctAnswer: '0,36',
      explanation: '4-gyel bővítve: 9 · 4 = 36, 25 · 4 = 100 → 36/100 = 0,36.',
      steps: [{ label: '1. Bővítés 4-gyel', value: '9/25 = 36/100 = 0,36' }],
      hint: '9 · 4 = 36 század!',
      formula: '9/25 = 36/100 = 0,36'
    },
    {
      id: 'q2-29',
      level: 2,
      question: 'Írd fel a 0,6 tizedes törtet a legegyszerűbb közönséges tört alakban!',
      options: ['3/5', '6/10', '1/6', '2/3'],
      correctAnswer: '3/5',
      explanation: '0,6 = 6/10, 2-vel egyszerűsítve 3/5.',
      steps: [{ label: '1. Egyszerűsítés', value: '6/10 = 3/5' }],
      hint: '6/10 egyszerűsítve 2-vel!',
      formula: '0,6 = 6/10 = 3/5'
    },
    {
      id: 'q2-30',
      level: 2,
      question: 'Írd fel a 0,25 tizedes törtet a legegyszerűbb közönséges tört alakban!',
      options: ['1/4', '25/100', '2/5', '1/25'],
      correctAnswer: '1/4',
      explanation: '0,25 = 25/100 = 1/4.',
      steps: [{ label: '1. Egyszerűsítés', value: '25/100 = 1/4' }],
      hint: '25 század = 1 negyed!',
      formula: '0,25 = 1/4'
    }
  ],

  // 3. SZINT: NEHÉZ / TÉMAZÁRÓ SZINT (30 feladat) - Összetett műveleti sorrend, vegyes műveletek, szöveges feladatok
  3: [
    {
      id: 'q3-1',
      level: 3,
      question: 'Számítsd ki a műveleti sorrend alapján: (1/2 + 1/4) · 2 = ?',
      options: ['1,5 (3/2)', '1', '2', '0,75'],
      correctAnswer: '1,5 (3/2)',
      explanation: 'Zárójelben: 2/4 + 1/4 = 3/4. Szorzás: 3/4 · 2 = 6/4 = 3/2 = 1,5.',
      steps: [
        { label: '1. Zárójel', value: '1/2 + 1/4 = 3/4' },
        { label: '2. Szorzás', value: '3/4 · 2 = 6/4 = 3/2 = 1,5' }
      ],
      hint: 'Először a zárójel (3/4), majd szorozz 2-vel!',
      formula: '(1/2 + 1/4) · 2 = 3/4 · 2 = 3/2 = 1,5'
    },
    {
      id: 'q3-2',
      level: 3,
      question: 'Számítsd ki: 3/4 - 1/2 : 2 = ?',
      options: ['1/2', '1/4', '1/8', '0'],
      correctAnswer: '1/2',
      explanation: 'Először az osztás: 1/2 : 2 = 1/4. Majd a kivonás: 3/4 - 1/4 = 2/4 = 1/2.',
      steps: [
        { label: '1. Osztás', value: '1/2 : 2 = 1/4' },
        { label: '2. Kivonás', value: '3/4 - 1/4 = 2/4 = 1/2' }
      ],
      hint: 'Az osztás megelőzi a kivonást!',
      formula: '3/4 - (1/2 : 2) = 3/4 - 1/4 = 1/2'
    },
    {
      id: 'q3-3',
      level: 3,
      question: 'Számítsd ki: (5/6 - 1/3) : 2 = ?',
      options: ['1/4', '1/2', '1/6', '2/3'],
      correctAnswer: '1/4',
      explanation: 'Zárójelben: 5/6 - 2/6 = 3/6 = 1/2. Osztás: 1/2 : 2 = 1/4.',
      steps: [
        { label: '1. Zárójel', value: '5/6 - 2/6 = 3/6 = 1/2' },
        { label: '2. Osztás', value: '1/2 : 2 = 1/4' }
      ],
      hint: 'A zárójel értéke 1/2, ezt oszd 2-vel!',
      formula: '(5/6 - 1/3) : 2 = 1/2 : 2 = 1/4'
    },
    {
      id: 'q3-4',
      level: 3,
      question: 'Számítsd ki: 2 · (1/3 + 1/5) = ?',
      options: ['16/15 (1 1/15)', '4/15', '8/15', '2/15'],
      correctAnswer: '16/15 (1 1/15)',
      explanation: 'Zárójelben: 5/15 + 3/15 = 8/15. Szorzás 2-vel: 16/15 = 1 egész 1/15.',
      steps: [
        { label: '1. Zárójel', value: '5/15 + 3/15 = 8/15' },
        { label: '2. Szorzás', value: '8/15 · 2 = 16/15 = 1 1/15' }
      ],
      hint: 'Közös nevező a 15 (8/15), majd szorozz 2-vel!',
      formula: '2 · (8/15) = 16/15'
    },
    {
      id: 'q3-5',
      level: 3,
      question: 'Számítsd ki vegyes alakban: 1/2 + 0,25 = ?',
      options: ['0,75 (3/4)', '0,35', '0,7', '0,8'],
      correctAnswer: '0,75 (3/4)',
      explanation: '1/2 = 0,50. Összeg: 0,50 + 0,25 = 0,75 = 3/4.',
      steps: [{ label: '1. Összeg', value: '0,50 + 0,25 = 0,75' }],
      hint: 'Fél + negyed = háromnegyed = 0,75!',
      formula: '1/2 + 0,25 = 0,75'
    },
    {
      id: 'q3-6',
      level: 3,
      question: 'Számítsd ki: 3/4 - 0,2 = ?',
      options: ['0,55', '0,25', '0,73', '0,14'],
      correctAnswer: '0,55',
      explanation: '3/4 = 0,75. Kivonás: 0,75 - 0,20 = 0,55.',
      steps: [{ label: '1. Kivonás', value: '0,75 - 0,20 = 0,55' }],
      hint: '3/4 = 0,75. 0,75 - 0,20 = 0,55!',
      formula: '3/4 - 0,2 = 0,55'
    },
    {
      id: 'q3-7',
      level: 3,
      question: 'Számítsd ki: 2/5 + 0,35 = ?',
      options: ['0,75 (3/4)', '0,45', '0,55', '0,39'],
      correctAnswer: '0,75 (3/4)',
      explanation: '2/5 = 0,40. Összeg: 0,40 + 0,35 = 0,75 = 3/4.',
      steps: [{ label: '1. Összeg', value: '0,40 + 0,35 = 0,75' }],
      hint: '2/5 = 0,40. Add hozzá a 0,35-öt!',
      formula: '2/5 + 0,35 = 0,75'
    },
    {
      id: 'q3-8',
      level: 3,
      question: 'Számítsd ki: 1/8 + 0,875 = ?',
      options: ['1,0 (1 egész)', '0,9', '1,1', '0,95'],
      correctAnswer: '1,0 (1 egész)',
      explanation: '1/8 = 0,125. Összeg: 0,125 + 0,875 = 1,000 = 1 egész.',
      steps: [{ label: '1. Összeg', value: '0,125 + 0,875 = 1,0' }],
      hint: '1/8 = 0,125. Add hozzá a 0,875-öt!',
      formula: '1/8 + 0,875 = 1,0'
    },
    {
      id: 'q3-9',
      level: 3,
      question: 'Számítsd ki: 14,8 - 2,5 · 3 = ?',
      options: ['7,3', '36,9', '8,3', '6,3'],
      correctAnswer: '7,3',
      explanation: 'Szorzás először: 2,5 · 3 = 7,5. Kivonás: 14,8 - 7,5 = 7,3.',
      steps: [
        { label: '1. Szorzás', value: '2,5 · 3 = 7,5' },
        { label: '2. Kivonás', value: '14,8 - 7,5 = 7,3' }
      ],
      hint: 'Előbb szorozz (7,5), utána vonj ki!',
      formula: '14,8 - 7,5 = 7,3'
    },
    {
      id: 'q3-10',
      level: 3,
      question: 'Számítsd ki: (4,2 + 3,8) : 4 = ?',
      options: ['2,0', '2,5', '1,8', '3,2'],
      correctAnswer: '2,0',
      explanation: 'Zárójelben: 4,2 + 3,8 = 8,0. Osztás: 8,0 : 4 = 2,0.',
      steps: [
        { label: '1. Zárójel', value: '4,2 + 3,8 = 8,0' },
        { label: '2. Osztás', value: '8,0 : 4 = 2,0' }
      ],
      hint: '4,2 + 3,8 = 8. Mennyi 8 : 4?',
      formula: '(4,2 + 3,8) : 4 = 8 : 4 = 2'
    },
    {
      id: 'q3-11',
      level: 3,
      question: 'Számítsd ki: 10 - 2,4 · 2,5 = ?',
      options: ['4,0', '19,0', '3,5', '5,0'],
      correctAnswer: '4,0',
      explanation: 'Szorzás: 2,4 · 2,5 = 6,0. Kivonás: 10 - 6,0 = 4,0.',
      steps: [
        { label: '1. Szorzás', value: '2,4 · 2,5 = 6,0' },
        { label: '2. Kivonás', value: '10 - 6,0 = 4,0' }
      ],
      hint: '2,4 · 2,5 = 6. 10 - 6 = 4!',
      formula: '10 - 6 = 4'
    },
    {
      id: 'q3-12',
      level: 3,
      question: 'Egy 60 fős évfolyam 2/5 része fiú. Hány lány jár az évfolyamra?',
      options: ['36 lány', '24 lány', '30 lány', '40 lány'],
      correctAnswer: '36 lány',
      explanation: 'Fiúk száma: 60 : 5 · 2 = 24. Lányok száma: 60 - 24 = 36 lány (vagy 60-nak a 3/5 része: 12 · 3 = 36).',
      steps: [
        { label: '1. Fiúk száma', value: '60 · 2/5 = 24' },
        { label: '2. Lányok száma', value: '60 - 24 = 36' }
      ],
      hint: 'A lányok az évfolyam 3/5 részét teszik ki!',
      formula: '60 · 3/5 = 36'
    },
    {
      id: 'q3-13',
      level: 3,
      question: 'Péternek 4800 Ft-ja volt. Elköltötte a 3/8 részét. Hány forintja maradt?',
      options: ['3000 Ft', '1800 Ft', '3200 Ft', '2400 Ft'],
      correctAnswer: '3000 Ft',
      explanation: 'Költött: 4800 : 8 · 3 = 1800 Ft. Maradt: 4800 - 1800 = 3000 Ft (vagy a megmaradt 5/8 rész: 600 · 5 = 3000 Ft).',
      steps: [
        { label: '1. Költés', value: '4800 · 3/8 = 1800 Ft' },
        { label: '2. Maradék', value: '4800 - 1800 = 3000 Ft' }
      ],
      hint: 'A pénz 5/8 része maradt meg!',
      formula: '4800 · 5/8 = 3000 Ft'
    },
    {
      id: 'q3-14',
      level: 3,
      question: 'Egy autó 100 km-en 6,4 liter benzint fogyaszt. Hány litert fogyaszt 250 km-en?',
      options: ['16 liter', '15,4 liter', '14,8 liter', '18 liter'],
      correctAnswer: '16 liter',
      explanation: '250 km = 2,5-szer 100 km. Fogyasztás: 6,4 · 2,5 = 16 liter.',
      steps: [
        { label: '1. Aránypár', value: '250 / 100 = 2,5' },
        { label: '2. Szorzás', value: '6,4 · 2,5 = 16,0 liter' }
      ],
      hint: 'Szorozd meg a 6,4-et 2,5-del!',
      formula: '6,4 · 2,5 = 16 liter'
    },
    {
      id: 'q3-15',
      level: 3,
      question: 'Egy 5 méteres szalagból levágtunk 1 egész 3/4 métert és 1,5 métert. Hány méter szalag maradt?',
      options: ['1,75 m (1 3/4 m)', '2,25 m', '1,25 m', '2,0 m'],
      correctAnswer: '1,75 m (1 3/4 m)',
      explanation: '1 3/4 m = 1,75 m. Összes levágás: 1,75 + 1,50 = 3,25 m. Maradt: 5,00 - 3,25 = 1,75 m.',
      steps: [
        { label: '1. Levágások összege', value: '1,75 + 1,50 = 3,25 m' },
        { label: '2. Maradék', value: '5,00 - 3,25 = 1,75 m' }
      ],
      hint: '1 3/4 = 1,75 m. 5 - (1,75 + 1,5) = 1,75 m.',
      formula: '5 - 3,25 = 1,75 m'
    },
    {
      id: 'q3-16',
      level: 3,
      question: 'Melyik szám a legnagyobb az alábbiak közül?',
      options: ['0,62', '3/5 (0,6)', '0,58', '4/7 (kb. 0,571)'],
      correctAnswer: '0,62',
      explanation: '3/5 = 0,60; 4/7 ≈ 0,571; 0,58; és 0,62. A legnagyobb a 0,62.',
      steps: [
        { label: '1. Tizedes alakok', value: '3/5 = 0,60; 4/7 ≈ 0,57; 0,58; 0,62' },
        { label: '2. Sorrend', value: '0,62 a legnagyobb' }
      ],
      hint: 'Váltsd át mindet tizedes alakra!',
      formula: '0,62 > 0,60 > 0,58 > 0,571'
    },
    {
      id: 'q3-17',
      level: 3,
      question: 'Melyik szám a legkisebb az alábbiak közül?',
      options: ['0,199', '1/4 (0,25)', '0,22', '3/10 (0,30)'],
      correctAnswer: '0,199',
      explanation: '1/4 = 0,250; 0,22 = 0,220; 3/10 = 0,300; és 0,199. A legkisebb a 0,199 (199 ezred < 220 ezred).',
      steps: [{ label: '1. Összehasonlítás ezredekre', value: '0,199 < 0,220 < 0,250 < 0,300' }],
      hint: '199 ezred kevesebb, mint 220 vagy 250 ezred!',
      formula: '0,199 < 0,22 < 0,25 < 0,3'
    },
    {
      id: 'q3-18',
      level: 3,
      question: 'Mennyi a 3/4 és a 0,4 szorzata tizedes tört alakban?',
      options: ['0,3', '0,12', '0,7', '0,25'],
      correctAnswer: '0,3',
      explanation: '3/4 = 0,75. Szorzat: 0,75 · 0,4 = 0,300 = 0,3 (vagy 3/4 · 2/5 = 6/20 = 3/10 = 0,3).',
      steps: [{ label: '1. Szorzás', value: '0,75 · 0,4 = 0,3' }],
      hint: '3/4 · 2/5 = 6/20 = 3/10 = 0,3!',
      formula: '3/4 · 0,4 = 0,3'
    },
    {
      id: 'q3-19',
      level: 3,
      question: 'Mennyi a 4,5 és a 1/2 hányadosa (4,5 : 0,5)?',
      options: ['9', '2,25', '4,0', '9,5'],
      correctAnswer: '9',
      explanation: 'Féllel osztani ugyanaz, mint 2-vel szorozni: 4,5 : 0,5 = 45 : 5 = 9.',
      steps: [{ label: '1. Osztás', value: '4,5 : 0,5 = 45 : 5 = 9' }],
      hint: '4,5-ben a fél megvan pontosan 9-szer!',
      formula: '4,5 : 0,5 = 9'
    },
    {
      id: 'q3-20',
      level: 3,
      question: 'Mennyi az 1 egész 3/8 tizedes tört alakja?',
      options: ['1,375', '1,38', '1,125', '1,35'],
      correctAnswer: '1,375',
      explanation: '1 egész + 3/8 = 1 + 0,375 = 1,375.',
      steps: [{ label: '1. Átváltás', value: '1 + 0,375 = 1,375' }],
      hint: '3/8 = 0,375. Add hozzá az 1 egészhez!',
      formula: '1 3/8 = 1,375'
    },
    {
      id: 'q3-21',
      level: 3,
      question: 'Mennyi a 2 egész 7/20 tizedes tört alakja?',
      options: ['2,35', '2,7', '2,035', '2,14'],
      correctAnswer: '2,35',
      explanation: '7/20 = 35/100 = 0,35. Eredmény: 2 + 0,35 = 2,35.',
      steps: [{ label: '1. Bővítés', value: '2 + 35/100 = 2,35' }],
      hint: '7/20 = 0,35!',
      formula: '2 7/20 = 2,35'
    },
    {
      id: 'q3-22',
      level: 3,
      question: 'Egy tartályban 120 liter víz van, ami a teljes kapacitás 3/4 része. Hány literes a tartály?',
      options: ['160 liter', '150 liter', '90 liter', '180 liter'],
      correctAnswer: '160 liter',
      explanation: 'Ha 3/4 rész = 120 liter, akkor 1/4 rész = 120 : 3 = 40 liter. A teljes 4/4 rész: 40 · 4 = 160 liter.',
      steps: [
        { label: '1. Egy negyed', value: '120 : 3 = 40 liter' },
        { label: '2. Egész tartály', value: '40 · 4 = 160 liter' }
      ],
      hint: 'Oszd el 3-mal, majd szorozd 4-gyel!',
      formula: '120 : 3/4 = 120 · 4/3 = 160 liter'
    },
    {
      id: 'q3-23',
      level: 3,
      question: 'Ha egy szám 2/3 része 18, akkor mennyi maga az egész szám?',
      options: ['27', '12', '36', '24'],
      correctAnswer: '27',
      explanation: '1/3 rész: 18 : 2 = 9. Az egész szám (3/3): 9 · 3 = 27.',
      steps: [
        { label: '1. Egy harmad', value: '18 : 2 = 9' },
        { label: '2. Három harmad', value: '9 · 3 = 27' }
      ],
      hint: '18-nak a fele 9, 9 · 3 = 27!',
      formula: '18 : 2 · 3 = 27'
    },
    {
      id: 'q3-24',
      level: 3,
      question: 'Ha egy ismeretlen szám 0,4 része 12, akkor mennyi az eredeti szám?',
      options: ['30', '48', '4,8', '24'],
      correctAnswer: '30',
      explanation: '0,4 rész = 4/10 rész. 12 : 0,4 = 120 : 4 = 30.',
      steps: [{ label: '1. Osztás', value: '12 : 0,4 = 30' }],
      hint: '12 : 0,4 = 120 : 4 = 30!',
      formula: '12 : 0,4 = 30'
    },
    {
      id: 'q3-25',
      level: 3,
      question: 'Írd fel a 0,375 tizedes törtet a legegyszerűbb közönséges tört alakban!',
      options: ['3/8', '375/1000', '3/4', '7/20'],
      correctAnswer: '3/8',
      explanation: '0,375 = 375/1000, 125-tel egyszerűsítve: 375 : 125 = 3 és 1000 : 125 = 8 → 3/8.',
      steps: [{ label: '1. Egyszerűsítés 125-tel', value: '375/1000 = 3/8' }],
      hint: '375 ezred egyszerűsítve = 3 nyolcad!',
      formula: '0,375 = 3/8'
    },
    {
      id: 'q3-26',
      level: 3,
      question: 'Írd fel a 0,08 tizedes törtet a legegyszerűbb közönséges tört alakban!',
      options: ['2/25', '8/100', '4/50', '1/12'],
      correctAnswer: '2/25',
      explanation: '0,08 = 8/100, 4-gyel egyszerűsítve: 8 : 4 = 2, 100 : 4 = 25 → 2/25.',
      steps: [{ label: '1. Egyszerűsítés 4-gyel', value: '8/100 = 2/25' }],
      hint: '8/100-at ossz le 4-gyel!',
      formula: '0,08 = 2/25'
    },
    {
      id: 'q3-27',
      level: 3,
      question: 'Számítsd ki: 2,4 : 0,6 = ?',
      options: ['4', '0,4', '40', '1,44'],
      correctAnswer: '4',
      explanation: 'Mindkét tagot 10-zel szorozva: 24 : 6 = 4.',
      steps: [{ label: '1. Bővítés 10-zel', value: '24 : 6 = 4' }],
      hint: 'Hányszor van meg a 0,6 a 2,4-ben?',
      formula: '2,4 : 0,6 = 4'
    },
    {
      id: 'q3-28',
      level: 3,
      question: 'Számítsd ki: 3/5 + 1/4 + 0,15 = ?',
      options: ['1,0 (1 egész)', '0,95', '1,15', '0,85'],
      correctAnswer: '1,0 (1 egész)',
      explanation: '3/5 = 0,60 és 1/4 = 0,25. Összeg: 0,60 + 0,25 + 0,15 = 1,00 = 1 egész.',
      steps: [
        { label: '1. Tizedes alakok', value: '0,60 + 0,25 + 0,15' },
        { label: '2. Összeg', value: '1,00' }
      ],
      hint: '0,60 + 0,25 + 0,15 = 1,00!',
      formula: '0,60 + 0,25 + 0,15 = 1,0'
    },
    {
      id: 'q3-29',
      level: 3,
      question: 'Egy téglalap oldalai a = 3,5 cm és b = 2,4 cm. Mennyi a téglalap területe?',
      options: ['8,4 cm²', '11,8 cm²', '5,9 cm²', '8,2 cm²'],
      correctAnswer: '8,4 cm²',
      explanation: 'Terület = a · b = 3,5 · 2,4 = 8,4 cm².',
      steps: [
        { label: '1. Képlet', value: 'T = a · b' },
        { label: '2. Számolás', value: '3,5 · 2,4 = 8,4 cm²' }
      ],
      hint: 'Szorozd össze a két oldal hosszát!',
      formula: 'T = 3,5 · 2,4 = 8,4 \\text{ cm}^2'
    },
    {
      id: 'q3-30',
      level: 3,
      question: 'Egy négyzet kerülete 14,8 cm. Mennyi a négyzet egy oldalának hossza?',
      options: ['3,7 cm', '3,6 cm', '7,4 cm', '2,96 cm'],
      correctAnswer: '3,7 cm',
      explanation: 'K = 4 · a → a = K : 4 = 14,8 : 4 = 3,7 cm.',
      steps: [
        { label: '1. Képlet', value: 'a = K : 4' },
        { label: '2. Számolás', value: '14,8 : 4 = 3,7 cm' }
      ],
      hint: 'Oszd el a kerületet 4-gyel!',
      formula: 'a = 14,8 : 4 = 3,7 \\text{ cm}'
    }
  ]
};

export const Chapter2SummaryQuiz: React.FC<Chapter2SummaryQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      topicId="g5-chapter2-summary-quiz"
      title="Törtek és tizedestörtek témazáró kvíz"
      subtitle="Átfogó témazáró felkészítő 90 feladattal (3×30), párosítóval és csoportosítóval!"
      questions={chapter2SummaryQuestions}
      cheatSheet={CHAPTER2_SUMMARY_CHEAT_SHEET}
      themeColor="purple"
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      renderMatcher={(matcherProps) => (
        <Chapter2SummaryMatcher
          {...matcherProps}
          onBack={matcherProps.onBack}
          onSwitchToQuiz={matcherProps.onSwitchToQuiz}
          onSwitchToSorter={matcherProps.onSwitchToSorter}
          onSwitchToTheory={onSwitchToTheory}
        />
      )}
      renderSorter={(sorterProps) => (
        <Chapter2SummarySorter
          {...sorterProps}
          onBack={sorterProps.onBack}
          onSwitchToQuiz={sorterProps.onSwitchToQuiz}
          onSwitchToMatcher={sorterProps.onSwitchToMatcher}
          onSwitchToTheory={onSwitchToTheory}
        />
      )}
    />
  );
};
export default Chapter2SummaryQuiz;
