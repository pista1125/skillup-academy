import React from 'react';
import { QuizTemplate, Question, CheatSheetItem, CheatSheetCard } from '../QuizTemplate';
import { DecimalDivisionMatcher } from './DecimalDivisionMatcher';
import { DecimalDivisionSorter } from './DecimalDivisionSorter';
import { Sparkles, ArrowRightLeft, Divide, Flame, Layers } from 'lucide-react';

export interface DecimalDivisionQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
}

export function DecimalDivisionQuiz({
  onBack,
  onSwitchToTheory
}: DecimalDivisionQuizProps) {
  const questions: Question[] = [
    // -------------------------------------------------------------------------
    // 1. SZINT: OSZTÁS 10, 100, 1000-REL ÉS EGÉSZ SZÁMMAL (10 kérdés)
    // -------------------------------------------------------------------------
    {
      id: 'q1',
      level: 1,
      question: 'Mennyi a 45 : 10 osztás eredménye?',
      questionTypeBadge: 'Osztás 10-zel',
      options: ['4,5', '0,45', '450', '4,05'],
      correctAnswer: '4,5',
      explanation: '10-zel osztva a tizedesvessző 1 hellyel balra lép: 45 : 10 = 4,5.',
      steps: [
        { label: 'Szabály', value: ': 10 -> 1 lépés balra' },
        { label: 'Eredmény', value: '4,5' }
      ],
      hint: 'Csúsztasd a vesszőt 1 hellyel balra!',
      formula: '45 : 10 = 4,5'
    },
    {
      id: 'q2',
      level: 1,
      question: 'Mennyi a 3,6 : 100 osztás eredménye?',
      questionTypeBadge: 'Osztás 100-zal',
      options: ['0,036', '0,36', '360', '0,0036'],
      correctAnswer: '0,036',
      explanation: '100-zal osztva a tizedesvessző 2 hellyel balra lép: 3,6 : 100 = 0,036.',
      steps: [
        { label: 'Szabály', value: ': 100 -> 2 lépés balra' },
        { label: 'Eredmény', value: '0,036' }
      ],
      hint: 'Léptesd a vesszőt 2 hellyel balra, szükség esetén pótolj 0-t!',
      formula: '3,6 : 100 = 0,036'
    },
    {
      id: 'q3',
      level: 1,
      question: 'Mennyi a 8,4 : 2 osztás eredménye?',
      questionTypeBadge: 'Osztás egésszel',
      options: ['4,2', '42', '0,42', '4,4'],
      correctAnswer: '4,2',
      explanation: '8-ban a 2 megvan 4-szer, kitesszük a vesszőt, majd 4-ben a 2 megvan 2-szer: 4,2.',
      steps: [
        { label: 'Egész rész', value: '8 : 2 = 4' },
        { label: 'Törtrész', value: '0,4 : 2 = 0,2' },
        { label: 'Eredmény', value: '4,2' }
      ],
      hint: 'Oszd el a 8-at is és a 4 tizedet is 2-vel!',
      formula: '8,4 : 2 = 4,2'
    },
    {
      id: 'q4',
      level: 1,
      question: 'Mennyi a 7,5 : 3 osztás eredménye?',
      questionTypeBadge: 'Osztás egésszel',
      options: ['2,5', '2,15', '25', '0,25'],
      correctAnswer: '2,5',
      explanation: '7-ben a 3 megvan 2-szer, maradt 1. A vessző átlépése után 15-ben a 3 megvan 5-ször: 2,5.',
      steps: [
        { label: 'Egész rész: 7 : 3', value: '2 (maradék 1)' },
        { label: 'Tizedek: 15 : 3', value: '5 -> 2,5' }
      ],
      hint: '7-ben a 3 megvan 2-szer, a maradék 1 mellé lehozod az 5-öt (15 : 3 = 5)!',
      formula: '7,5 : 3 = 2,5'
    },
    {
      id: 'q5',
      level: 1,
      question: 'Mennyi a 0,8 : 4 osztás értéke?',
      questionTypeBadge: 'Nulla egész',
      options: ['0,2', '0,02', '2', '0,4'],
      correctAnswer: '0,2',
      explanation: '0-ban a 4 megvan 0-szor, kitesszük a vesszőt, 8-ban a 4 megvan 2-szer: 0,2.',
      steps: [
        { label: 'Egész rész: 0 : 4', value: '0' },
        { label: 'Tizedek: 8 : 4', value: '2 -> 0,2' }
      ],
      hint: '8 tized osztva 4-gyel az 2 tized!',
      formula: '0,8 : 4 = 0,2'
    },
    {
      id: 'q6',
      level: 1,
      question: 'Mennyi a 120 : 1000 osztás értéke?',
      questionTypeBadge: 'Osztás 1000-rel',
      options: ['0,12', '1,2', '0,012', '12'],
      correctAnswer: '0,12',
      explanation: '1000-rel osztva a vessző 3 hellyel balra lép: 120 : 1000 = 0,120 = 0,12.',
      steps: [
        { label: '3 lépés balra', value: '120 -> 0,120' },
        { label: 'Egyszerűsítés', value: '0,12' }
      ],
      hint: '3 hellyel lép balra a vessző: 120 -> 0,12!',
      formula: '120 : 1000 = 0,12'
    },
    {
      id: 'q7',
      level: 1,
      question: 'Mennyi a 6,3 : 9 osztás értéke?',
      questionTypeBadge: 'Osztás egésszel',
      options: ['0,7', '7', '0,07', '0,9'],
      correctAnswer: '0,7',
      explanation: '6-ban a 9 megvan 0-szor, 63-ban a 9 megvan 7-szer: 0,7.',
      steps: [
        { label: '63 tized : 9', value: '7 tized = 0,7' }
      ],
      hint: '63-ban a 9 megvan 7-szer, így 6,3 : 9 = 0,7!',
      formula: '6,3 : 9 = 0,7'
    },
    {
      id: 'q8',
      level: 1,
      question: 'Hány hellyel lép balra a tizedesvessző, ha egy számot 100-zal osztunk?',
      questionTypeBadge: 'Szabályismeret',
      options: ['2 hellyel', '1 hellyel', '3 hellyel', 'Nem lép balra'],
      correctAnswer: '2 hellyel',
      explanation: 'Mivel a 100-ban 2 darab nulla van, a tizedesvessző pontosan 2 hellyel lép balra.',
      steps: [
        { label: 'Nullák száma a 100-ban', value: '2 nulla -> 2 lépés balra' }
      ],
      hint: 'A 100-ban lévő nullák számát nézd!',
      formula: 'x : 100 \\longrightarrow \\text{2 hely balra}'
    },
    {
      id: 'q9',
      level: 1,
      question: 'Mennyi a 15,5 : 5 osztás eredménye?',
      questionTypeBadge: 'Osztás egésszel',
      options: ['3,1', '3,5', '31', '0,31'],
      correctAnswer: '3,1',
      explanation: '15-ben az 5 megvan 3-szor, kitesszük a vesszőt, 5-ben az 5 megvan 1-szer: 3,1.',
      steps: [
        { label: '15 : 5', value: '3' },
        { label: '5 : 5', value: '1 -> 3,1' }
      ],
      hint: '15 : 5 = 3 és 0,5 : 5 = 0,1!',
      formula: '15,5 : 5 = 3,1'
    },
    {
      id: 'q10',
      level: 1,
      question: 'Mennyi a 0,05 : 10 osztás értéke?',
      questionTypeBadge: 'Osztás 10-zel',
      options: ['0,005', '0,5', '0,050', '5'],
      correctAnswer: '0,005',
      explanation: '10-zel osztva a vessző 1 hellyel balra lép: 0,05 : 10 = 0,005.',
      steps: [
        { label: '1 lépés balra', value: '0,05 -> 0,005' }
      ],
      hint: 'Egy nullával told balra a vesszőt!',
      formula: '0,05 : 10 = 0,005'
    },

    // -------------------------------------------------------------------------
    // 2. SZINT: OSZTÁS TIZEDES TÖRTTEL (BŐVÍTÉSSEL) (10 kérdés)
    // -------------------------------------------------------------------------
    {
      id: 'q11',
      level: 2,
      question: 'Hogyan alakítjuk át a 4,8 : 0,6 osztást, hogy az osztó egész szám legyen?',
      questionTypeBadge: 'Bővítés szabálya',
      options: ['48 : 6', '48 : 0,6', '4,8 : 6', '480 : 6'],
      correctAnswer: '48 : 6',
      explanation: 'Mindkét számot (osztandót és osztót is) megszorozzuk 10-zel: 4,8 · 10 = 48 és 0,6 · 10 = 6, így 48 : 6 lesz.',
      steps: [
        { label: 'Szorzás 10-zel', value: '(4,8 · 10) : (0,6 · 10)' },
        { label: 'Átalakított osztás', value: '48 : 6' }
      ],
      hint: 'Szorozd meg mindkét számot 10-zel!',
      formula: '4,8 : 0,6 = 48 : 6'
    },
    {
      id: 'q12',
      level: 2,
      question: 'Mennyi a 4,8 : 0,6 osztás pontos eredménye?',
      questionTypeBadge: 'Osztás tizedessel',
      options: ['8', '0,8', '80', '0,08'],
      correctAnswer: '8',
      explanation: 'Bővítve 10-zel: 48 : 6 = 8.',
      steps: [
        { label: 'Bővítés 10-zel', value: '48 : 6' },
        { label: 'Hányados', value: '8' }
      ],
      hint: '48 : 6 = 8!',
      formula: '4,8 : 0,6 = 48 : 6 = 8'
    },
    {
      id: 'q13',
      level: 2,
      question: 'Mennyi a 2,4 : 0,4 osztás értéke?',
      questionTypeBadge: 'Osztás tizedessel',
      options: ['6', '0,6', '60', '0,06'],
      correctAnswer: '6',
      explanation: 'Bővítve 10-zel: 24 : 4 = 6.',
      steps: [
        { label: 'Bővítés 10-zel', value: '24 : 4' },
        { label: 'Hányados', value: '6' }
      ],
      hint: '24-ben a 4 pontosan 6-szor van meg!',
      formula: '2,4 : 0,4 = 24 : 4 = 6'
    },
    {
      id: 'q14',
      level: 2,
      question: 'Mennyi a 3 : 0,5 osztás eredménye?',
      questionTypeBadge: 'Egész osztása tizedessel',
      options: ['6', '1,5', '0,6', '15'],
      correctAnswer: '6',
      explanation: 'Bővítve 10-zel: 30 : 5 = 6. (A 3 egészben pontosan 6 darab fél van meg).',
      steps: [
        { label: 'Bővítés 10-zel', value: '30 : 5' },
        { label: 'Hányados', value: '6' }
      ],
      hint: '30 : 5 = 6 (Hány fél van 3-ban?)',
      formula: '3 : 0,5 = 30 : 5 = 6'
    },
    {
      id: 'q15',
      level: 2,
      question: 'Mennyi a 0,35 : 0,7 osztás értéke?',
      questionTypeBadge: 'Osztás tizedessel',
      options: ['0,5', '5', '0,05', '50'],
      correctAnswer: '0,5',
      explanation: 'Bővítve 10-zel: 3,5 : 7 = 0,5.',
      steps: [
        { label: 'Bővítés 10-zel', value: '3,5 : 7' },
        { label: 'Hányados', value: '0,5' }
      ],
      hint: '3,5 : 7 = 0,5!',
      formula: '0,35 : 0,7 = 3,5 : 7 = 0,5'
    },
    {
      id: 'q16',
      level: 2,
      question: 'Végezd el az osztást: 1,5 : 0,3 = ?',
      questionTypeBadge: 'Osztás tizedessel',
      options: ['5', '0,5', '50', '0,05'],
      correctAnswer: '5',
      explanation: 'Bővítve 10-zel: 15 : 3 = 5.',
      steps: [
        { label: 'Bővítés 10-zel', value: '15 : 3' },
        { label: 'Hányados', value: '5' }
      ],
      hint: '15 : 3 = 5!',
      formula: '1,5 : 0,3 = 15 : 3 = 5'
    },
    {
      id: 'q17',
      level: 2,
      question: 'Mennyi a 0,72 : 0,9 osztás eredménye?',
      questionTypeBadge: 'Osztás tizedessel',
      options: ['0,8', '8', '0,08', '80'],
      correctAnswer: '0,8',
      explanation: 'Bővítve 10-zel: 7,2 : 9 = 0,8.',
      steps: [
        { label: 'Bővítés 10-zel', value: '7,2 : 9' },
        { label: 'Hányados', value: '0,8' }
      ],
      hint: '7,2 : 9 = 0,8!',
      formula: '0,72 : 0,9 = 7,2 : 9 = 0,8'
    },
    {
      id: 'q18',
      level: 2,
      question: 'Mennyi a 0,36 : 0,06 osztás eredménye?',
      questionTypeBadge: 'Bővítés 100-zal',
      options: ['6', '0,6', '60', '0,06'],
      correctAnswer: '6',
      explanation: 'Mivel az osztóban 2 tizedesjegy van, mindkettőt 100-zal szorozzuk: 36 : 6 = 6.',
      steps: [
        { label: 'Bővítés 100-zal', value: '36 : 6' },
        { label: 'Hányados', value: '6' }
      ],
      hint: 'Szorozz 100-zal: 36 : 6 = 6!',
      formula: '0,36 : 0,06 = 36 : 6 = 6'
    },
    {
      id: 'q19',
      level: 2,
      question: 'Mennyi a 2,5 : 0,5 osztás értéke?',
      questionTypeBadge: 'Osztás tizedessel',
      options: ['5', '0,5', '50', '25'],
      correctAnswer: '5',
      explanation: 'Bővítve 10-zel: 25 : 5 = 5.',
      steps: [
        { label: 'Bővítés 10-zel', value: '25 : 5' },
        { label: 'Hányados', value: '5' }
      ],
      hint: '25-ben az 5 pontosan 5-ször van meg!',
      formula: '2,5 : 0,5 = 25 : 5 = 5'
    },
    {
      id: 'q20',
      level: 2,
      question: 'Mennyi az 1,2 : 0,04 osztás értéke?',
      questionTypeBadge: 'Bővítés 100-zal',
      options: ['30', '3', '0,3', '300'],
      correctAnswer: '30',
      explanation: 'Bővítve 100-zal: 120 : 4 = 30.',
      steps: [
        { label: 'Bővítés 100-zal', value: '120 : 4' },
        { label: 'Hányados', value: '30' }
      ],
      hint: '1,2 · 100 = 120, így 120 : 4 = 30!',
      formula: '1,2 : 0,04 = 120 : 4 = 30'
    },

    // -------------------------------------------------------------------------
    // 3. SZINT: OSZTÁS 0,1-GYEL, EGYENLETEK, ÖSSZETETT FELADATOK (10 kérdés)
    // -------------------------------------------------------------------------
    {
      id: 'q21',
      level: 3,
      question: 'Mennyi a 7 : 0,1 osztás értéke?',
      questionTypeBadge: 'Osztás 0,1-gyel',
      options: ['70', '0,7', '7', '700'],
      correctAnswer: '70',
      explanation: '0,1-gyel osztani ugyanaz, mint 10-zel szorozni: 7 : 0,1 = 70 : 1 = 70.',
      steps: [
        { label: 'Szabály', value: ': 0,1 <=> · 10' },
        { label: 'Hányados', value: '70' }
      ],
      hint: '0,1-gyel osztva a szám 10-szeresét kapjuk!',
      formula: '7 : 0,1 = 70'
    },
    {
      id: 'q22',
      level: 3,
      question: 'Mennyi a 4,5 : 0,01 osztás eredménye?',
      questionTypeBadge: 'Osztás 0,01-gyel',
      options: ['450', '45', '0,45', '4500'],
      correctAnswer: '450',
      explanation: '0,01-gyel osztani megegyezik a 100-zal való szorzással: 4,5 · 100 = 450.',
      steps: [
        { label: 'Szabály', value: ': 0,01 <=> · 100' },
        { label: 'Hányados', value: '450' }
      ],
      hint: 'Szorozd meg 100-zal a 4,5-et!',
      formula: '4,5 : 0,01 = 450'
    },
    {
      id: 'q23',
      level: 3,
      question: 'Mennyi a 6 : 0,25 osztás értéke?',
      questionTypeBadge: 'Osztás negyeddel',
      options: ['24', '1,5', '12', '2,4'],
      correctAnswer: '24',
      explanation: '0,25 az 1/4. Mivel 1 egészben 4 darab negyed van, 6 egészben 6 · 4 = 24 negyed van (600 : 25 = 24).',
      steps: [
        { label: 'Bővítés 100-zal', value: '600 : 25' },
        { label: 'Hányados', value: '24' }
      ],
      hint: 'Hány negyed (0,25) van 6 egészben? 6 · 4 = 24!',
      formula: '6 : 0,25 = 600 : 25 = 24'
    },
    {
      id: 'q24',
      level: 3,
      question: 'Oldd meg az egyenletet: x · 0,4 = 1,2! Mennyi x értéke?',
      questionTypeBadge: 'Egyenlet',
      options: ['3', '0,3', '30', '4,8'],
      correctAnswer: '3',
      explanation: 'x = 1,2 : 0,4 = 12 : 4 = 3.',
      steps: [
        { label: 'Kifejezés', value: 'x = 1,2 : 0,4' },
        { label: 'Bővítés', value: '12 : 4 = 3' }
      ],
      hint: 'Oszd el az 1,2-t 0,4-gyel!',
      formula: 'x = 1,2 : 0,4 = 3'
    },
    {
      id: 'q25',
      level: 3,
      question: 'Egy 12,6 méteres szalagból 0,6 méteres darabokat vágunk le. Hány darab szalagot kapunk?',
      questionTypeBadge: 'Szöveges feladat',
      options: ['21 darab', '20 darab', '2,1 darab', '26 darab'],
      correctAnswer: '21 darab',
      explanation: '12,6 : 0,6 = 126 : 6 = 21 darab.',
      steps: [
        { label: 'Művelet', value: '12,6 : 0,6' },
        { label: 'Bővítés 10-zel', value: '126 : 6 = 21' }
      ],
      hint: '126 : 6 = 21 darab!',
      formula: '12,6 : 0,6 = 126 : 6 = 21'
    },
    {
      id: 'q26',
      level: 3,
      question: 'Egy autó 189 km-t tett meg 2,5 óra alatt. Mekkora volt az átlagsebessége?',
      questionTypeBadge: 'Sebességszámítás',
      options: ['75,6 km/h', '75 km/h', '76,5 km/h', '80 km/h'],
      correctAnswer: '75,6 km/h',
      explanation: 'v = s : t = 189 : 2,5 = 1890 : 25 = 75,6 km/h.',
      steps: [
        { label: 'Képlet', value: 'v = s : t' },
        { label: 'Bővítés 10-zel', value: '1890 : 25 = 75,6' }
      ],
      hint: 'v = 189 : 2,5 = 1890 : 25 = 75,6 km/h!',
      formula: 'v = 189 : 2,5 = 75,6\\text{ km/h}'
    },
    {
      id: 'q27',
      level: 3,
      question: 'Melyik állítás IGAZ, ha egy pozitív számot elosztunk 0,5-del?',
      questionTypeBadge: 'Tulajdonság',
      options: [
        'A hányados az eredeti szám kétszerese lesz',
        'A hányados az eredeti szám fele lesz',
        'A hányados kisebb lesz mint az eredeti szám',
        'A hányados 0 lesz'
      ],
      correctAnswer: 'A hányados az eredeti szám kétszerese lesz',
      explanation: 'Mivel 0,5 = 1/2, a törttel való osztás megegyezik a reciprokával (2-vel) való szorzással: x : 0,5 = x · 2.',
      steps: [
        { label: 'Szabály', value: 'x : 0,5 = x : (1/2) = x · 2' }
      ],
      hint: 'Féllel osztani ugyanaz, mint kettővel szorozni!',
      formula: 'x : 0,5 = 2x'
    },
    {
      id: 'q28',
      level: 3,
      question: 'Mennyi a (4,8 + 2,4) : 0,8 műveletsor eredménye?',
      questionTypeBadge: 'Műveleti sorrend',
      options: ['9', '0,9', '8', '90'],
      correctAnswer: '9',
      explanation: 'Zárójelben: 4,8 + 2,4 = 7,2. Majd az osztás: 7,2 : 0,8 = 72 : 8 = 9.',
      steps: [
        { label: '1. Zárójel', value: '4,8 + 2,4 = 7,2' },
        { label: '2. Osztás', value: '7,2 : 0,8 = 72 : 8 = 9' }
      ],
      hint: 'Először végezd el a zárójelbeli összeadást (7,2), majd oszd el 0,8-del!',
      formula: '7,2 : 0,8 = 9'
    },
    {
      id: 'q29',
      level: 3,
      question: 'Egy üvegbe 0,75 liter gyümölcslé fér. Hány ilyen üveg tölthető meg teljesen 15 liter gyümölcsléből?',
      questionTypeBadge: 'Szöveges feladat',
      options: ['20 üveg', '25 üveg', '15 üveg', '18 üveg'],
      correctAnswer: '20 üveg',
      explanation: '15 : 0,75 = 1500 : 75 = 20 üveg.',
      steps: [
        { label: 'Bővítés 100-zal', value: '1500 : 75' },
        { label: 'Hányados', value: '20' }
      ],
      hint: '1500 : 75 = 20!',
      formula: '15 : 0,75 = 1500 : 75 = 20'
    },
    {
      id: 'q30',
      level: 3,
      question: 'Mennyi a 0,15 : 0,05 + 2,4 : 0,6 műveletsor eredménye?',
      questionTypeBadge: 'Összetett művelet',
      options: ['7', '8', '0,7', '12'],
      correctAnswer: '7',
      explanation: '0,15 : 0,05 = 15 : 5 = 3. 2,4 : 0,6 = 24 : 6 = 4. Összegük: 3 + 4 = 7.',
      steps: [
        { label: '1. tag', value: '0,15 : 0,05 = 3' },
        { label: '2. tag', value: '2,4 : 0,6 = 4' },
        { label: 'Összeg', value: '3 + 4 = 7' }
      ],
      hint: 'Számold ki külön a két osztást (3 és 4), majd add össze őket!',
      formula: '3 + 4 = 7'
    }
  ];

  const cheatSheetItems: CheatSheetItem[] = [
    {
      topic: 'Osztás 10, 100, 1000-rel',
      formula: '34,5 : 10 = 3,45; \\quad 34,5 : 100 = 0,345',
      note: 'A tizedesvessző annyi hellyel lép BALRA, ahány nulla van az osztóban.'
    },
    {
      topic: 'Osztás tizedes törttel (Bővítés)',
      formula: '4,8 : 0,6 = 48 : 6 = 8; \\quad 3 : 0,25 = 300 : 25 = 12',
      note: 'Szorozd meg mindkét számot 10-zel vagy 100-zal, hogy az osztó egész szám legyen!'
    },
    {
      topic: 'Osztás 0,1-gyel, 0,01-gyel',
      formula: '7 : 0,1 = 70; \\quad 4,5 : 0,01 = 450',
      note: 'Megegyezik a 10-zel, 100-zal való szorzással: a tizedesvessző JOBBRA lép.'
    },
    {
      topic: 'Ellenőrzés szorzással',
      formula: '\\text{Hányados} \\cdot \\text{Osztó} = \\text{Osztandó}',
      note: 'Mindig ellenőrizheted az eredményt az osztó és a hányados összeszorzásával.'
    }
  ];

  const cheatSheetCards: CheatSheetCard[] = [
    {
      id: 'cs1',
      title: 'Bővítés Egész Osztóra',
      formula: 'a : b = (a \\cdot 10^k) : (b \\cdot 10^k)',
      note: 'Mindig bővíts annyival, ahány tizedesjegye az OSZTÓNAK van!'
    },
    {
      id: 'cs2',
      title: 'Osztás 0,1-gyel és 0,01-gyel',
      formula: 'x : 0,1 = x \\cdot 10 \\qquad x : 0,01 = x \\cdot 100',
      note: 'A tizedesvessző JOBBRA lép 1, illetve 2 hellyel!'
    },
    {
      id: 'cs3',
      title: '1-nél Kisebb Osztó Hatása',
      formula: 'x : 0,5 = 2x \\quad (\\text{nagyobb lesz!})',
      note: 'Ha 1-nél kisebb pozitív számmal osztunk, a hányados nagyobb lesz az osztandónál!'
    }
  ];

  return (
    <QuizTemplate
      title="Osztás tizedes törttel"
      subtitle="30 feladat: Osztás 10-zel, 100-zal, tizedes tört osztása egész számmal és tizedes törttel (bővítés egész osztóra), osztás 0,1-gyel és ellenőrzés."
      emoji="➗"
      badgeText="➗ 6. Osztály • II. Törtek"
      grade={6}
      chapterId="g6-fractions"
      topicId="g6-decimal-division-quiz"
      questions={questions}
      cheatSheet={cheatSheetItems}
      cheatSheetCards={cheatSheetCards}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      matcherComponent={<DecimalDivisionMatcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} />}
      sorterComponent={<DecimalDivisionSorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} />}
    />
  );
}

export default DecimalDivisionQuiz;
