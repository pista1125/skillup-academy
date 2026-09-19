import React from 'react';
import { QuizTemplate, Question, CheatSheetItem, CheatSheetCard } from '../QuizTemplate';
import { DecimalMultiplicationMatcher } from './DecimalMultiplicationMatcher';
import { DecimalMultiplicationSorter } from './DecimalMultiplicationSorter';
import { Sparkles, ArrowRightLeft, Zap, Flame, Layers } from 'lucide-react';

export interface DecimalMultiplicationQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
}

export function DecimalMultiplicationQuiz({
  onBack,
  onSwitchToTheory
}: DecimalMultiplicationQuizProps) {
  const questions: Question[] = [
    // -------------------------------------------------------------------------
    // 1. SZINT: SZORZÁS 10, 100, 1000-REL ÉS EGÉSZ SZÁMMAL (10 kérdés)
    // -------------------------------------------------------------------------
    {
      id: 'q1',
      level: 1,
      question: 'Mennyi a 3,45 · 10 szorzás eredménye?',
      questionTypeBadge: 'Szorzás 10-zel',
      options: ['34,5', '345', '0,345', '34,05'],
      correctAnswer: '34,5',
      explanation: '10-zel szorozva a tizedesvessző 1 hellyel jobbra lép: 3,45 · 10 = 34,5.',
      steps: [
        { label: 'Szabály', value: '10-zel szorzás -> 1 lépés jobbra' },
        { label: 'Eredmény', value: '34,5' }
      ],
      hint: 'Csúsztasd a tizedesvesszőt 1 hellyel jobbra!',
      formula: '3,45 \\cdot 10 = 34,5'
    },
    {
      id: 'q2',
      level: 1,
      question: 'Mennyi a 0,28 · 100 szorzás eredménye?',
      questionTypeBadge: 'Szorzás 100-zal',
      options: ['28', '2,8', '280', '0,0028'],
      correctAnswer: '28',
      explanation: '100-zal szorozva a tizedesvessző 2 hellyel jobbra lép: 0,28 · 100 = 28.',
      steps: [
        { label: 'Szabály', value: '100-zal szorzás -> 2 lépés jobbra' },
        { label: 'Eredmény', value: '28' }
      ],
      hint: 'A 100-ban két nulla van, léptesd a vesszőt 2 hellyel jobbra!',
      formula: '0,28 \\cdot 100 = 28'
    },
    {
      id: 'q3',
      level: 1,
      question: 'Mennyi a 0,05 · 1000 szorzás eredménye?',
      questionTypeBadge: 'Szorzás 1000-rel',
      options: ['50', '5', '500', '0,5'],
      correctAnswer: '50',
      explanation: '1000-rel szorozva a tizedesvessző 3 hellyel lép jobbra, a hiányzó helyre nullát írunk: 0,050 · 1000 = 50.',
      steps: [
        { label: 'Nulla pótlása', value: '0,050' },
        { label: '3 lépés jobbra', value: '50' }
      ],
      hint: '3 lépés jobbra: 0,05 -> 0,5 -> 5 -> 50!',
      formula: '0,05 \\cdot 1000 = 50'
    },
    {
      id: 'q4',
      level: 1,
      question: 'Mennyi az 1,2 · 3 szorzás eredménye?',
      questionTypeBadge: 'Szorzás egésszel',
      options: ['3,6', '0,36', '36', '3,2'],
      correctAnswer: '3,6',
      explanation: '12 · 3 = 36. Mivel 1 tizedesjegy volt, a szorzatból 1 tizedesjegyet választunk le: 3,6.',
      steps: [
        { label: 'Vessző nélkül', value: '12 · 3 = 36' },
        { label: '1 tizedesjegy', value: '3,6' }
      ],
      hint: 'Szorozd meg a 12-t 3-mal, majd tedd vissza a vesszőt!',
      formula: '1,2 \\cdot 3 = 3,6'
    },
    {
      id: 'q5',
      level: 1,
      question: 'Mennyi a 2,5 · 4 szorzás pontos eredménye?',
      questionTypeBadge: 'Szorzás egésszel',
      options: ['10', '10,0', '8,5', '100'],
      correctAnswer: '10',
      explanation: '25 · 4 = 100. Egy tizedesjegyet leválasztva 10,0 = 10.',
      steps: [
        { label: 'Vessző nélkül', value: '25 · 4 = 100' },
        { label: '1 tizedesjegy levágása', value: '10,0 = 10' }
      ],
      hint: 'Négyszer két és fél = tíz!',
      formula: '2,5 \\cdot 4 = 10'
    },
    {
      id: 'q6',
      level: 1,
      question: 'Mennyi a 0,15 · 2 szorzás értéke?',
      questionTypeBadge: 'Szorzás egésszel',
      options: ['0,3', '0,30', '0,03', '3,0'],
      correctAnswer: '0,3',
      explanation: '15 · 2 = 30. Két tizedesjegyet leválasztva: 0,30 = 0,3.',
      steps: [
        { label: 'Vessző nélkül', value: '15 · 2 = 30' },
        { label: '2 tizedesjegy', value: '0,30 = 0,3' }
      ],
      hint: '15 század szorozva 2-vel az 30 század, azaz 3 tized!',
      formula: '0,15 \\cdot 2 = 0,3'
    },
    {
      id: 'q7',
      level: 1,
      question: 'Hány hellyel lép jobbra a tizedesvessző, ha egy tizedestörtet 100-zal szorzunk?',
      questionTypeBadge: 'Szabályismeret',
      options: ['2 hellyel', '1 hellyel', '3 hellyel', 'Nem lép sehovvá'],
      correctAnswer: '2 hellyel',
      explanation: 'Mivel a 100-ban 2 darab nulla van, a tizedesvessző pontosan 2 hellyel lép jobbra.',
      steps: [
        { label: 'Nullák száma a 100-ban', value: '2 nulla -> 2 lépés jobbra' }
      ],
      hint: 'A 100-ban lévő nullák számát nézd!',
      formula: 'x \\cdot 100 \\longrightarrow \\text{2 hely jobbra}'
    },
    {
      id: 'q8',
      level: 1,
      question: 'Mennyi a 0,8 · 5 szorzás értéke?',
      questionTypeBadge: 'Szorzás egésszel',
      options: ['4', '4,0', '0,4', '40'],
      correctAnswer: '4',
      explanation: '8 · 5 = 40. Egy tizedesjegyet leválasztva 4,0 = 4.',
      steps: [
        { label: 'Vessző nélkül', value: '8 · 5 = 40' },
        { label: '1 tizedesjegy levágása', value: '4,0 = 4' }
      ],
      hint: '8 tized · 5 = 40 tized = 4 egész!',
      formula: '0,8 \\cdot 5 = 4'
    },
    {
      id: 'q9',
      level: 1,
      question: 'Mennyi a 12,05 · 10 szorzás eredménye?',
      questionTypeBadge: 'Szorzás 10-zel',
      options: ['120,5', '12,5', '1205', '1,205'],
      correctAnswer: '120,5',
      explanation: 'A tizedesvessző 1 hellyel lép jobbra a 0 és az 5 közé: 120,5.',
      steps: [
        { label: '1 lépés jobbra', value: '12,05 -> 120,5' }
      ],
      hint: 'Tedd át a vesszőt a 0 mögé!',
      formula: '12,05 \\cdot 10 = 120,5'
    },
    {
      id: 'q10',
      level: 1,
      question: 'Mennyi a 0,004 · 100 értéke?',
      questionTypeBadge: 'Szorzás 100-zal',
      options: ['0,4', '0,04', '4', '0,0004'],
      correctAnswer: '0,4',
      explanation: '100-zal szorozva a tizedesvessző 2 hellyel lép jobbra: 0,004 -> 0,4.',
      steps: [
        { label: '2 lépés jobbra', value: '0,004 -> 0,04 -> 0,4' }
      ],
      hint: 'Léptesd át a vesszőt két nullán!',
      formula: '0,004 \\cdot 100 = 0,4'
    },

    // -------------------------------------------------------------------------
    // 2. SZINT: KÉT TIZEDESTÖRT SZORZÁSA (10 kérdés)
    // -------------------------------------------------------------------------
    {
      id: 'q11',
      level: 2,
      question: 'Hány tizedesjegye van a 0,35 · 1,4 szorzatnak a záró nullák elhagyása előtt?',
      questionTypeBadge: 'Tizedesjegy-számlálás',
      options: ['3', '2', '1', '4'],
      correctAnswer: '3',
      explanation: 'A 0,35-nek 2 tizedesjegye van, az 1,4-nek 1 tizedesjegye van. Összesen 2 + 1 = 3 tizedesjegy lesz a szorzatban.',
      steps: [
        { label: '1. tényező jegyei', value: '2 jegy (35)' },
        { label: '2. tényező jegyei', value: '1 jegy (4)' },
        { label: 'Összes tizedesjegy', value: '2 + 1 = 3 tizedesjegy' }
      ],
      hint: 'Add össze a két tényező tizedesjegyeinek számát!',
      formula: '2 + 1 = 3 \\text{ tizedesjegy}'
    },
    {
      id: 'q12',
      level: 2,
      question: 'Mennyi a 0,3 · 0,4 szorzás pontos értéke?',
      questionTypeBadge: 'Tizedes szorzása tizedessel',
      options: ['0,12', '1,2', '0,012', '0,7'],
      correctAnswer: '0,12',
      explanation: '3 · 4 = 12. Mivel mindkét számban 1-1 tizedesjegy van, a szorzatban 1 + 1 = 2 tizedesjegy lesz: 0,12.',
      steps: [
        { label: 'Vessző nélkül', value: '3 · 4 = 12' },
        { label: '2 tizedesjegy levágása', value: '0,12' }
      ],
      hint: '3 · 4 = 12, és 2 tizedesjegyet kell levágni a végéről!',
      formula: '0,3 \\cdot 0,4 = 0,12'
    },
    {
      id: 'q13',
      level: 2,
      question: 'Mennyi a 0,2 · 0,5 szorzás értéke egyszerűsített tizedestörtként?',
      questionTypeBadge: 'Tizedes szorzás',
      options: ['0,1', '0,10', '0,01', '1,0'],
      correctAnswer: '0,1',
      explanation: '2 · 5 = 10. Két tizedesjegyet levágva: 0,10 = 0,1.',
      steps: [
        { label: 'Vessző nélkül', value: '2 · 5 = 10' },
        { label: '2 tizedesjegy', value: '0,10' },
        { label: 'Záró nulla elhagyása', value: '0,1' }
      ],
      hint: '2 · 5 = 10, levágsz 2 jegyet -> 0,10 = 0,1!',
      formula: '0,2 \\cdot 0,5 = 0,1'
    },
    {
      id: 'q14',
      level: 2,
      question: 'Mennyi a 0,04 · 0,3 szorzat értéke?',
      questionTypeBadge: 'Tizedes szorzás',
      options: ['0,012', '0,12', '0,0012', '1,2'],
      correctAnswer: '0,012',
      explanation: '4 · 3 = 12. A tizedesjegyek száma: 2 + 1 = 3. Balról nullát pótolva: 0,012.',
      steps: [
        { label: 'Vessző nélkül', value: '4 · 3 = 12' },
        { label: '3 tizedesjegy', value: '0,012' }
      ],
      hint: '12-ből 3 tizedesjegyet vágj le: 0,012!',
      formula: '0,04 \\cdot 0,3 = 0,012'
    },
    {
      id: 'q15',
      level: 2,
      question: 'Végezd el a szorzást: 1,5 · 0,2 = ?',
      questionTypeBadge: 'Tizedes szorzás',
      options: ['0,3', '0,30', '3', '0,03'],
      correctAnswer: '0,3',
      explanation: '15 · 2 = 30. Két tizedesjegyet levágva: 0,30 = 0,3.',
      steps: [
        { label: 'Vessző nélkül', value: '15 · 2 = 30' },
        { label: '2 tizedesjegy', value: '0,30 = 0,3' }
      ],
      hint: '15 · 2 = 30, a végeredmény 0,30 = 0,3!',
      formula: '1,5 \\cdot 0,2 = 0,3'
    },
    {
      id: 'q16',
      level: 2,
      question: 'Mennyi a 0,6 · 0,7 szorzás eredménye?',
      questionTypeBadge: 'Tizedes szorzás',
      options: ['0,42', '4,2', '0,042', '0,13'],
      correctAnswer: '0,42',
      explanation: '6 · 7 = 42. Két tizedesjegy levágásával: 0,42.',
      steps: [
        { label: 'Vessző nélkül', value: '6 · 7 = 42' },
        { label: '2 tizedesjegy', value: '0,42' }
      ],
      hint: '6 · 7 = 42, 2 tizedesjegy -> 0,42!',
      formula: '0,6 \\cdot 0,7 = 0,42'
    },
    {
      id: 'q17',
      level: 2,
      question: 'Mennyi az 1,2 · 1,2 szorzat értéke?',
      questionTypeBadge: 'Négyzetre emelés',
      options: ['1,44', '14,4', '0,144', '2,4'],
      correctAnswer: '1,44',
      explanation: '12 · 12 = 144. Két tizedesjegy levágásával: 1,44.',
      steps: [
        { label: 'Vessző nélkül', value: '12 · 12 = 144' },
        { label: '2 tizedesjegy', value: '1,44' }
      ],
      hint: '12 · 12 = 144, tegyél be 2 tizedesjegyet!',
      formula: '1,2 \\cdot 1,2 = 1,44'
    },
    {
      id: 'q18',
      level: 2,
      question: 'Mennyi a 0,25 · 0,4 szorzás eredménye?',
      questionTypeBadge: 'Tizedes szorzás',
      options: ['0,1', '0,100', '0,01', '1'],
      correctAnswer: '0,1',
      explanation: '25 · 4 = 100. Három tizedesjegyet levágva: 0,100 = 0,1.',
      steps: [
        { label: 'Vessző nélkül', value: '25 · 4 = 100' },
        { label: '3 tizedesjegy', value: '0,100 = 0,1' }
      ],
      hint: '25 · 4 = 100, levágva 3 jegyet: 0,100 = 0,1!',
      formula: '0,25 \\cdot 0,4 = 0,1'
    },
    {
      id: 'q19',
      level: 2,
      question: 'Mennyi a 2,5 · 1,2 szorzat értéke?',
      questionTypeBadge: 'Tizedes szorzás',
      options: ['3', '3,00', '0,3', '30'],
      correctAnswer: '3',
      explanation: '25 · 12 = 300. Két tizedesjegyet levágva: 3,00 = 3.',
      steps: [
        { label: 'Vessző nélkül', value: '25 · 12 = 300' },
        { label: '2 tizedesjegy levágása', value: '3,00 = 3' }
      ],
      hint: '25 · 12 = 300, 2 tizedesjegy levágva = 3!',
      formula: '2,5 \\cdot 1,2 = 3'
    },
    {
      id: 'q20',
      level: 2,
      question: 'Mennyi a 0,08 · 0,5 szorzás eredménye?',
      questionTypeBadge: 'Tizedes szorzás',
      options: ['0,04', '0,040', '0,4', '0,004'],
      correctAnswer: '0,04',
      explanation: '8 · 5 = 40. Három tizedesjegyet levágva: 0,040 = 0,04.',
      steps: [
        { label: 'Vessző nélkül', value: '8 · 5 = 40' },
        { label: '3 tizedesjegy', value: '0,040 = 0,04' }
      ],
      hint: '8 · 5 = 40, levágva 3 tizedesjegyet = 0,040 = 0,04!',
      formula: '0,08 \\cdot 0,5 = 0,04'
    },

    // -------------------------------------------------------------------------
    // 3. SZINT: SZORZÁS 0,1-GYEL, ÖSSZETETT ÉS SZÖVEGES FELADATOK (10 kérdés)
    // -------------------------------------------------------------------------
    {
      id: 'q21',
      level: 3,
      question: 'Mennyi a 450 · 0,01 szorzat értéke?',
      questionTypeBadge: 'Szorzás 0,01-gyel',
      options: ['4,5', '45', '0,45', '4500'],
      correctAnswer: '4,5',
      explanation: '0,01-gyel szorozni ugyanaz, mint 100-zal osztani: 450 : 100 = 4,5 (2 hellyel lép balra a vessző).',
      steps: [
        { label: 'Szabály', value: '· 0,01 <=> : 100 (2 lépés balra)' },
        { label: 'Eredmény', value: '4,5' }
      ],
      hint: 'Léptesd a vesszőt 2 hellyel balra!',
      formula: '450 \\cdot 0,01 = 4,5'
    },
    {
      id: 'q22',
      level: 3,
      question: 'Mennyi a 0,05 · 0,06 szorzás eredménye?',
      questionTypeBadge: 'Sok tizedesjegy',
      options: ['0,003', '0,03', '0,0030', '0,0003'],
      correctAnswer: '0,003',
      explanation: '5 · 6 = 30. Összesen 2 + 2 = 4 tizedesjegy kell: 0,0030 = 0,003.',
      steps: [
        { label: 'Vessző nélkül', value: '5 · 6 = 30' },
        { label: '4 tizedesjegy', value: '0,0030 = 0,003' }
      ],
      hint: '5 · 6 = 30, és 4 tizedesjegyet kell levágni balról!',
      formula: '0,05 \\cdot 0,06 = 0,003'
    },
    {
      id: 'q23',
      level: 3,
      question: 'Mennyi a 0,2 · 0,3 · 0,4 többtényezős szorzat értéke?',
      questionTypeBadge: 'Három tényező',
      options: ['0,024', '0,24', '0,0024', '2,4'],
      correctAnswer: '0,024',
      explanation: '2 · 3 · 4 = 24. A tizedesjegyek száma: 1 + 1 + 1 = 3 tizedesjegy: 0,024.',
      steps: [
        { label: 'Vessző nélkül', value: '2 · 3 · 4 = 24' },
        { label: '3 tizedesjegy', value: '0,024' }
      ],
      hint: 'Szorozd össze a számokat (24), majd vágj le 3 tizedesjegyet!',
      formula: '0,2 \\cdot 0,3 \\cdot 0,4 = 0,024'
    },
    {
      id: 'q24',
      level: 3,
      question: 'Egy téglalap oldalai a = 3,5 cm és b = 2,4 cm. Mekkora a téglalap területe?',
      questionTypeBadge: 'Területszámítás',
      options: ['8,4 cm²', '8,40 cm²', '5,9 cm²', '84 cm²'],
      correctAnswer: '8,4 cm²',
      explanation: 'T = a · b = 3,5 · 2,4. Vessző nélkül: 35 · 24 = 840. Két tizedesjegyet levágva: 8,40 = 8,4 cm².',
      steps: [
        { label: 'Képlet', value: 'T = a · b' },
        { label: 'Szorzás', value: '3,5 · 2,4 = 8,4' }
      ],
      hint: 'T = a · b, szorozd össze a 3,5-et és a 2,4-et!',
      formula: 'T = 3,5 \\cdot 2,4 = 8,4 \\text{ cm}^2'
    },
    {
      id: 'q25',
      level: 3,
      question: '1 liter benzin ára 620 Ft. Mennyibe kerül 4,5 liter benzin?',
      questionTypeBadge: 'Szöveges feladat',
      options: ['2790 Ft', '2480 Ft', '2850 Ft', '3100 Ft'],
      correctAnswer: '2790 Ft',
      explanation: '620 · 4,5 = 62 · 45 = 2790 Ft.',
      steps: [
        { label: '4 liter ára', value: '4 · 620 = 2480 Ft' },
        { label: '0,5 liter ára', value: '620 : 2 = 310 Ft' },
        { label: 'Összesen', value: '2480 + 310 = 2790 Ft' }
      ],
      hint: 'Számold ki a 4 liter (2480) és a fél liter (310) árát!',
      formula: '620 \\cdot 4,5 = 2790\\text{ Ft}'
    },
    {
      id: 'q26',
      level: 3,
      question: 'Melyik állítás IGAZ, ha egy pozitív számot megszorzunk 0,8-del?',
      questionTypeBadge: 'Tulajdonság',
      options: [
        'A szorzat kisebb lesz az eredeti számnál',
        'A szorzat nagyobb lesz az eredeti számnál',
        'A szorzat pontosan megegyezik az eredeti számmal',
        'A szorzat negatív szám lesz'
      ],
      correctAnswer: 'A szorzat kisebb lesz az eredeti számnál',
      explanation: 'Ha egy pozitív számot 1-nél kisebb pozitív számmal (pl. 0,8-del) szorzunk, az értéke csökken (a 80%-a lesz).',
      steps: [
        { label: 'Szabály', value: 'Ha 0 < szorzó < 1 -> szorzat < eredeti szám' }
      ],
      hint: 'A 0,8 kisebb mint 1, így a szorzás csökkenti az értéket!',
      formula: 'x \\cdot 0,8 < x \\quad (x > 0)'
    },
    {
      id: 'q27',
      level: 3,
      question: 'Mennyi a 0,15 · 0,4 + 0,04 műveletsor eredménye?',
      questionTypeBadge: 'Műveleti sorrend',
      options: ['0,1', '0,06', '0,10', '0,01'],
      correctAnswer: '0,1',
      explanation: 'Először a szorzás: 0,15 · 0,4 = 0,060 = 0,06. Majd az összeadás: 0,06 + 0,04 = 0,10 = 0,1.',
      steps: [
        { label: '1. Szorzás', value: '0,15 · 0,4 = 0,06' },
        { label: '2. Összeadás', value: '0,06 + 0,04 = 0,1' }
      ],
      hint: 'Először szorozz (0,06), utána adj hozzá 0,04-et!',
      formula: '0,06 + 0,04 = 0,1'
    },
    {
      id: 'q28',
      level: 3,
      question: 'Egy autó átlagsebessége 72,5 km/h. Hány kilométert tesz meg 2,4 óra alatt?',
      questionTypeBadge: 'Szöveges feladat',
      options: ['174 km', '170 km', '145 km', '180 km'],
      correctAnswer: '174 km',
      explanation: 's = v · t = 72,5 · 2,4 = 174,00 = 174 km.',
      steps: [
        { label: 'Képlet', value: 's = v · t' },
        { label: 'Szorzás', value: '72,5 · 2,4 = 174 km' }
      ],
      hint: 'Szorozd össze a sebességet (72,5) és az időt (2,4)!',
      formula: 's = 72,5 \\cdot 2,4 = 174\\text{ km}'
    },
    {
      id: 'q29',
      level: 3,
      question: 'Mennyi a 12,5 · 0,8 · 0,5 szorzat értéke?',
      questionTypeBadge: 'Ügyes számolás',
      options: ['5', '5,0', '0,5', '50'],
      correctAnswer: '5',
      explanation: '0,8 · 0,5 = 0,4. Majd 12,5 · 0,4 = 5,00 = 5.',
      steps: [
        { label: '1. lépés', value: '0,8 · 0,5 = 0,4' },
        { label: '2. lépés', value: '12,5 · 0,4 = 5' }
      ],
      hint: 'Érdemes először a 0,8 · 0,5 = 0,4-et kiszámolni!',
      formula: '12,5 \\cdot 0,4 = 5'
    },
    {
      id: 'q30',
      level: 3,
      question: 'Egy 2,5 méteres deszkából levágtunk 4 darab 0,45 méteres darabot. Hány méter deszka maradt meg?',
      questionTypeBadge: 'Összetett szöveges',
      options: ['0,7 m', '0,8 m', '1,8 m', '0,65 m'],
      correctAnswer: '0,7 m',
      explanation: 'A levágott rész: 4 · 0,45 = 1,80 = 1,8 m. A maradék: 2,5 - 1,8 = 0,7 m.',
      steps: [
        { label: 'Levágott összesen', value: '4 · 0,45 = 1,8 m' },
        { label: 'Megmaradt deszka', value: '2,5 - 1,8 = 0,7 m' }
      ],
      hint: 'Számold ki a 4 darab összhosszát (1,8 m), majd vond ki 2,5-ből!',
      formula: '2,5 - (4 \\cdot 0,45) = 2,5 - 1,8 = 0,7\\text{ m}'
    }
  ];

  const cheatSheetItems: CheatSheetItem[] = [
    {
      topic: 'Szorzás 10, 100, 1000-rel',
      formula: '3,45 · 10 = 34,5; \\quad 3,45 · 100 = 345',
      note: 'A tizedesvessző annyi hellyel lép JOBBRA, ahány nulla van a szorzóban.'
    },
    {
      topic: 'Két tizedestört szorzása',
      formula: '0,3 · 0,4 = 0,12; \\quad 1,2 · 0,3 = 0,36',
      note: 'Vessző nélkül szorzunk, majd a tényezők tizedesjegyeinek összegét levágjuk a szorzatból.'
    },
    {
      topic: 'Szorzás 0,1-gyel, 0,01-gyel',
      formula: '45 · 0,1 = 4,5; \\quad 45 · 0,01 = 0,45',
      note: 'Megegyezik a 10-zel, 100-zal való osztással: a tizedesvessző BALRA lép.'
    },
    {
      topic: 'Záró nullák levágása',
      formula: '0,25 · 0,4 = 0,100 = 0,1',
      note: 'Először tedd ki a tizedesvesszőt, és CSAK utána hagyd el a felesleges záró nullákat!'
    }
  ];

  const cheatSheetCards: CheatSheetCard[] = [
    {
      id: 'cs1',
      title: 'Vessző Lépés Jobbra (· 10, 100, 1000)',
      formula: 'x \\cdot 10^k \\longrightarrow k \\text{ hely jobbra}',
      note: 'Minden nulla eggyel jobbra tolja a tizedesvesszőt!'
    },
    {
      id: 'cs2',
      title: 'Tizedesjegyek Összeadása',
      formula: 'n_1 \\text{ jegy} + n_2 \\text{ jegy} = n_1 + n_2 \\text{ jegy a szorzatban}',
      note: 'Szorozz vessző nélkül, majd vágd le a tizedesjegyek összegét a végéről!'
    },
    {
      id: 'cs3',
      title: 'Szorzás 0,1-gyel és 0,01-gyel',
      formula: 'x \\cdot 0,1 = x : 10 \\qquad x \\cdot 0,01 = x : 100',
      note: 'A tizedesvessző BALRA lép 1, illetve 2 hellyel!'
    }
  ];

  return (
    <QuizTemplate
      title="Szorzás tizedes törttel"
      subtitle="30 feladat: Szorzás 10-zel, 100-zal, tizedes tört szorzása egész számmal és tizedes törttel, tizedesjegyek számlálása és becslés."
      emoji="⚡"
      badgeText="⚡ 6. Osztály • II. Törtek"
      grade={6}
      chapterId="g6-fractions"
      topicId="g6-decimal-multiplication-quiz"
      questions={questions}
      cheatSheet={cheatSheetItems}
      cheatSheetCards={cheatSheetCards}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      matcherComponent={<DecimalMultiplicationMatcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} />}
      sorterComponent={<DecimalMultiplicationSorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} />}
    />
  );
}

export default DecimalMultiplicationQuiz;
