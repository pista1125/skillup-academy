import React from 'react';
import { QuizTemplate, Question, CheatSheetItem, CheatSheetCard } from '../QuizTemplate';
import { FractionsSummaryMatcher } from './FractionsSummaryMatcher';
import { FractionsSummarySorter } from './FractionsSummarySorter';
import { Sparkles, Trophy, Award, Layers, Calculator } from 'lucide-react';

export interface FractionsSummaryQuizProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
}

export function FractionsSummaryQuiz({
  onBack,
  onSwitchToTheory
}: FractionsSummaryQuizProps) {
  const questions: Question[] = [
    // =========================================================================
    // 1. SZINT: ALAPISMERETEK, EGYSZERŰ MŰVELETEK ÉS ÁTVÁLTÁSOK (30 kérdés)
    // =========================================================================
    {
      id: 'q1',
      level: 1,
      question: 'Mennyi a 3/4 + 1/4 összeadás eredménye?',
      questionTypeBadge: 'Törtek összeadása',
      options: ['1', '4/8', '1/2', '2/4'],
      correctAnswer: '1',
      explanation: 'Azonos nevezőjű törteknél a számlálókat összeadjuk: (3 + 1)/4 = 4/4 = 1.',
      steps: [
        { label: '1. Számlálók összeadása', value: '3 + 1 = 4' },
        { label: '2. Tört egyszerűsítése', value: '4/4 = 1' }
      ],
      hint: 'A nevező változatlan marad, csak a számlálókat add össze!',
      formula: '\\frac{3}{4} + \\frac{1}{4} = \\frac{4}{4} = 1'
    },
    {
      id: 'q2',
      level: 1,
      question: 'Mennyi az 5/6 - 2/6 kivonás eredménye a legegyszerűbb alakban?',
      questionTypeBadge: 'Törtek kivonása',
      options: ['1/2', '3/6', '3/0', '7/6'],
      correctAnswer: '1/2',
      explanation: '5/6 - 2/6 = 3/6, amit 3-mal egyszerűsítve 1/2-et kapunk.',
      steps: [
        { label: '1. Kivonás', value: '5/6 - 2/6 = 3/6' },
        { label: '2. Egyszerűsítés 3-mal', value: '3/6 = 1/2' }
      ],
      hint: 'Vonj ki, majd egyszerűsítsd az eredményt 3-mal!',
      formula: '\\frac{5}{6} - \\frac{2}{6} = \\frac{3}{6} = \\frac{1}{2}'
    },
    {
      id: 'q3',
      level: 1,
      question: 'Mennyi a 2/3 · 6 szorzás eredménye?',
      questionTypeBadge: 'Tört szorzása egésszel',
      options: ['4', '12/18', '2', '6'],
      correctAnswer: '4',
      explanation: 'Törtet egész számmal úgy szorzunk, hogy a számlálót szorozzuk: (2 · 6)/3 = 12/3 = 4.',
      steps: [
        { label: '1. Számláló szorzása', value: '2 · 6 = 12' },
        { label: '2. Osztás a nevezővel', value: '12 : 3 = 4' }
      ],
      hint: 'Egyszerűsíthetsz a 3-mal és 6-tal is: 2 · 2 = 4!',
      formula: '\\frac{2}{3} \\cdot 6 = \\frac{12}{3} = 4'
    },
    {
      id: 'q4',
      level: 1,
      question: 'Mi a 4/5 szám reciproka?',
      questionTypeBadge: 'Reciprok fogalma',
      options: ['5/4', '-4/5', '-5/4', '1/5'],
      correctAnswer: '5/4',
      explanation: 'Egy tört reciprokát a számláló és a nevező felcserélésével kapjuk: 4/5 reciproka 5/4.',
      steps: [
        { label: '1. Felcserélés', value: '4/5 \\rightarrow 5/4' },
        { label: '2. Ellenőrzés', value: '4/5 · 5/4 = 20/20 = 1' }
      ],
      hint: 'A számláló és a nevező helyet cserél!',
      formula: '\\left(\\frac{4}{5}\\right)^{-1} = \\frac{5}{4}'
    },
    {
      id: 'q5',
      level: 1,
      question: 'Mennyi a 8 : 1/2 osztás eredménye?',
      questionTypeBadge: 'Osztás törttel',
      options: ['16', '4', '8,5', '1/16'],
      correctAnswer: '16',
      explanation: 'Törttel való osztáskor a tört reciprokával szorzunk: 8 : 1/2 = 8 · 2 = 16.',
      steps: [
        { label: '1. Reciprokkal szorzás', value: '8 : 1/2 = 8 · 2/1' },
        { label: '2. Szorzás', value: '8 · 2 = 16' }
      ],
      hint: 'A felével való osztás megegyezik a kettővel való szorzással!',
      formula: '8 : \\frac{1}{2} = 8 \\cdot 2 = 16'
    },
    {
      id: 'q6',
      level: 1,
      question: 'Mennyi a 3,45 · 10 szorzás eredménye?',
      questionTypeBadge: 'Tizedes szorzása 10-zel',
      options: ['34,5', '345', '0,345', '3,450'],
      correctAnswer: '34,5',
      explanation: '10-zel való szorzáskor a tizedesvessző 1 hellyel jobbra lép: 3,45 · 10 = 34,5.',
      steps: [
        { label: '1. Vesszőmozgatás', value: '3,45 \\rightarrow 34,5' }
      ],
      hint: '10-zel szorozva a szám 10-szer nagyobb lesz, a vessző jobbra megy!',
      formula: '3,45 \\cdot 10 = 34,5'
    },
    {
      id: 'q7',
      level: 1,
      question: 'Mennyi a 45 : 100 osztás eredménye?',
      questionTypeBadge: 'Tizedes osztása 100-zal',
      options: ['0,45', '4,5', '0,045', '450'],
      correctAnswer: '0,45',
      explanation: '100-zal való osztáskor a tizedesvessző 2 hellyel balra lép: 45 : 100 = 0,45.',
      steps: [
        { label: '1. Vesszőmozgatás', value: '45,0 \\rightarrow 0,45' }
      ],
      hint: 'Két nullával osztunk, 2 hellyel lépj balra!',
      formula: '45 : 100 = 0,45'
    },
    {
      id: 'q8',
      level: 1,
      question: 'Melyik tizedes tört alak felel meg az 1/2 közönséges törtnek?',
      questionTypeBadge: 'Tört tizedes alakja',
      options: ['0,5', '0,2', '0,12', '1,2'],
      correctAnswer: '0,5',
      explanation: '1/2 bővítve 5-tel 5/10 = 0,5, vagy 1 : 2 = 0,5.',
      steps: [
        { label: '1. Bővítés 5-tel', value: '1/2 = 5/10' },
        { label: '2. Tizedestört alak', value: '5/10 = 0,5' }
      ],
      hint: 'Gondolj a félre: 0,5 liter = fél liter!',
      formula: '\\frac{1}{2} = \\frac{5}{10} = 0,5'
    },
    {
      id: 'q9',
      level: 1,
      question: 'Mennyi a 0,3 · 0,4 szorzat értéke?',
      questionTypeBadge: 'Tizedesek szorzása',
      options: ['0,12', '1,2', '0,012', '0,7'],
      correctAnswer: '0,12',
      explanation: '3 · 4 = 12. Mivel 1 + 1 = 2 tizedesjegy van a tényezőkben, a szorzat 0,12.',
      steps: [
        { label: '1. Egészként szorzás', value: '3 · 4 = 12' },
        { label: '2. Tizedesjegyek száma', value: '1 + 1 = 2 jegy \\rightarrow 0,12' }
      ],
      hint: 'Összesen 2 tizedesjegynek kell lennie az eredményben!',
      formula: '0,3 \\cdot 0,4 = 0,12'
    },
    {
      id: 'q10',
      level: 1,
      question: 'Mennyi a 4,8 : 6 osztás értéke?',
      questionTypeBadge: 'Tizedes osztása egésszel',
      options: ['0,8', '8', '0,08', '0,6'],
      correctAnswer: '0,8',
      explanation: '48 : 6 = 8, így 4,8 : 6 = 0,8.',
      steps: [
        { label: '1. Osztás', value: '48 : 6 = 8' },
        { label: '2. Tizedesvessző', value: '0,8' }
      ],
      hint: '48 tized osztva 6-tal = 8 tized = 0,8.',
      formula: '4,8 : 6 = 0,8'
    },
    {
      id: 'q11',
      level: 1,
      question: 'Hogyan írható fel a 3/5 tizedes tört alakban?',
      questionTypeBadge: 'Tört átváltása',
      options: ['0,6', '0,35', '0,3', '3,5'],
      correctAnswer: '0,6',
      explanation: '3/5 bővítve 2-vel = 6/10 = 0,6.',
      steps: [
        { label: '1. Bővítés 2-vel', value: '3/5 = 6/10' },
        { label: '2. Tizedestört', value: '6/10 = 0,6' }
      ],
      hint: 'Bővítsd a törtet 10-es nevezőre!',
      formula: '\\frac{3}{5} = \\frac{6}{10} = 0,6'
    },
    {
      id: 'q12',
      level: 1,
      question: 'Melyik a 0,25 legegyszerűbb közönséges tört alakja?',
      questionTypeBadge: 'Tizedes tört közönségessé',
      options: ['1/4', '25/10', '2/5', '1/25'],
      correctAnswer: '1/4',
      explanation: '0,25 = 25/100, amit 25-tel egyszerűsítve 1/4-et kapunk.',
      steps: [
        { label: '1. Tört alak', value: '25/100' },
        { label: '2. Egyszerűsítés 25-tel', value: '1/4' }
      ],
      hint: '25 századrész = egy negyedrész!',
      formula: '0,25 = \\frac{25}{100} = \\frac{1}{4}'
    },
    {
      id: 'q13',
      level: 1,
      question: 'Hogyan írható fel a 7/2 vegyes tört alakban?',
      questionTypeBadge: 'Vegyes tört alak',
      options: ['3 1/2', '2 1/2', '3 2/7', '7 1/2'],
      correctAnswer: '3 1/2',
      explanation: '7 : 2 = 3, a maradék 1, tehát 7/2 = 3 1/2.',
      steps: [
        { label: '1. Maradékos osztás', value: '7 : 2 = 3, \\text{ maradék } 1' },
        { label: '2. Vegyes tört alak', value: '3 1/2' }
      ],
      hint: 'Hányszor van meg a 2 a 7-ben, és mennyi a maradék?',
      formula: '\\frac{7}{2} = 3 \\frac{1}{2}'
    },
    {
      id: 'q14',
      level: 1,
      question: 'Hogyan írható fel a 2 1/3 közönséges áltört alakban?',
      questionTypeBadge: 'Áltört alak',
      options: ['7/3', '5/3', '6/3', '21/3'],
      correctAnswer: '7/3',
      explanation: '2 egész az 6/3, hozzáadva 1/3-ot kapjuk a 7/3-ot: (2 · 3 + 1)/3 = 7/3.',
      steps: [
        { label: '1. Számláló képzése', value: '2 · 3 + 1 = 7' },
        { label: '2. Áltört alak', value: '7/3' }
      ],
      hint: 'Egész szorozva a nevezővel plusz a számláló!',
      formula: '2 \\frac{1}{3} = \\frac{2 \\cdot 3 + 1}{3} = \\frac{7}{3}'
    },
    {
      id: 'q15',
      level: 1,
      question: 'Mennyi a 10 - 2 · 3 kifejezés értéke?',
      questionTypeBadge: 'Műveleti sorrend',
      options: ['4', '24', '16', '8'],
      correctAnswer: '4',
      explanation: 'Először a szorzást végezzük el: 2 · 3 = 6, majd 10 - 6 = 4.',
      steps: [
        { label: '1. Szorzás', value: '2 · 3 = 6' },
        { label: '2. Kivonás', value: '10 - 6 = 4' }
      ],
      hint: 'A szorzás mindig megelőzi a kivonást!',
      formula: '10 - (2 \\cdot 3) = 10 - 6 = 4'
    },
    {
      id: 'q16',
      level: 1,
      question: 'Mennyi a (10 - 2) · 3 kifejezés értéke?',
      questionTypeBadge: 'Zárójeles művelet',
      options: ['24', '4', '16', '12'],
      correctAnswer: '24',
      explanation: 'A zárójel prioritást élvez: (10 - 2) = 8, majd 8 · 3 = 24.',
      steps: [
        { label: '1. Zárójel', value: '10 - 2 = 8' },
        { label: '2. Szorzás', value: '8 · 3 = 24' }
      ],
      hint: 'Először végezd el a zárójelben lévő kivonást!',
      formula: '(10 - 2) \\cdot 3 = 8 \\cdot 3 = 24'
    },
    {
      id: 'q17',
      level: 1,
      question: 'Mennyi a 15 : 3 + 2 kifejezés értéke?',
      questionTypeBadge: 'Műveleti sorrend',
      options: ['7', '3', '5', '1'],
      correctAnswer: '7',
      explanation: 'Először az osztás: 15 : 3 = 5, majd 5 + 2 = 7.',
      steps: [
        { label: '1. Osztás', value: '15 : 3 = 5' },
        { label: '2. Összeadás', value: '5 + 2 = 7' }
      ],
      hint: 'Az osztást végezd el előbb!',
      formula: '(15 : 3) + 2 = 5 + 2 = 7'
    },
    {
      id: 'q18',
      level: 1,
      question: 'Mennyi a 15 : (3 + 2) kifejezés értéke?',
      questionTypeBadge: 'Zárójeles osztás',
      options: ['3', '7', '5', '1'],
      correctAnswer: '3',
      explanation: 'A zárójelben: 3 + 2 = 5, majd 15 : 5 = 3.',
      steps: [
        { label: '1. Zárójel', value: '3 + 2 = 5' },
        { label: '2. Osztás', value: '15 : 5 = 3' }
      ],
      hint: 'Először add össze a zárójelben lévő számokat!',
      formula: '15 : (3 + 2) = 15 : 5 = 3'
    },
    {
      id: 'q19',
      level: 1,
      question: 'Mennyi az 1 - 0,35 kivonás értéke?',
      questionTypeBadge: 'Tizedes kivonása 1-ből',
      options: ['0,65', '0,75', '0,35', '1,35'],
      correctAnswer: '0,65',
      explanation: '1,00 - 0,35 = 0,65.',
      steps: [
        { label: '1. Kivonás', value: '1,00 - 0,35 = 0,65' }
      ],
      hint: '100 századból vonj ki 35 századot!',
      formula: '1,00 - 0,35 = 0,65'
    },
    {
      id: 'q20',
      level: 1,
      question: 'Mennyi a 2,4 + 1,75 összeadás értéke?',
      questionTypeBadge: 'Tizedesek összeadása',
      options: ['4,15', '3,15', '4,115', '3,79'],
      correctAnswer: '4,15',
      explanation: '2,40 + 1,75 = 4,15.',
      steps: [
        { label: '1. Helyiértékek egyeztetése', value: '2,40 + 1,75' },
        { label: '2. Összeadás', value: '4,15' }
      ],
      hint: 'Egészítsd ki nullával: 2,40 + 1,75!',
      formula: '2,40 + 1,75 = 4,15'
    },
    {
      id: 'q21',
      level: 1,
      question: 'Mennyi az 1/4 + 1/2 összeadás eredménye?',
      questionTypeBadge: 'Közös nevezőre hozás',
      options: ['3/4', '2/6', '1/6', '2/4'],
      correctAnswer: '3/4',
      explanation: 'Az 1/2 bővítve 2/4. Így 1/4 + 2/4 = 3/4.',
      steps: [
        { label: '1. Bővítés', value: '1/2 = 2/4' },
        { label: '2. Összeadás', value: '1/4 + 2/4 = 3/4' }
      ],
      hint: 'A közös nevező a 4!',
      formula: '\\frac{1}{4} + \\frac{2}{4} = \\frac{3}{4}'
    },
    {
      id: 'q22',
      level: 1,
      question: 'Mennyi a 3/4 - 1/8 kivonás eredménye?',
      questionTypeBadge: 'Különböző nevezők kivonása',
      options: ['5/8', '2/4', '1/4', '2/8'],
      correctAnswer: '5/8',
      explanation: '3/4 = 6/8. Így 6/8 - 1/8 = 5/8.',
      steps: [
        { label: '1. Bővítés 2-vel', value: '3/4 = 6/8' },
        { label: '2. Kivonás', value: '6/8 - 1/8 = 5/8' }
      ],
      hint: 'Bővítsd a 3/4-et 8-as nevezőre!',
      formula: '\\frac{6}{8} - \\frac{1}{8} = \\frac{5}{8}'
    },
    {
      id: 'q23',
      level: 1,
      question: 'Mennyi az 1/3 · 3/5 szorzás eredménye a legegyszerűbb alakban?',
      questionTypeBadge: 'Törtek szorzása egyszerűsítéssel',
      options: ['1/5', '3/15', '4/8', '3/8'],
      correctAnswer: '1/5',
      explanation: 'A 3-asokkal keresztbe egyszerűsítünk: 1/1 · 1/5 = 1/5.',
      steps: [
        { label: '1. Keresztbe egyszerűsítés 3-mal', value: '(1 · 1)/(1 · 5)' },
        { label: '2. Eredmény', value: '1/5' }
      ],
      hint: 'Egyszerűsíts 3-mal még a szorzás előtt!',
      formula: '\\frac{1}{\\cancel{3}} \\cdot \\frac{\\cancel{3}}{5} = \\frac{1}{5}'
    },
    {
      id: 'q24',
      level: 1,
      question: 'Mennyi a 2/7 : 2/7 osztás eredménye?',
      questionTypeBadge: 'Azonos törtek osztása',
      options: ['1', '0', '4/49', '2/7'],
      correctAnswer: '1',
      explanation: 'Bármely nem nulla számot önmagával osztva 1-et kapunk.',
      steps: [
        { label: '1. Reciprokkal szorzás', value: '2/7 · 7/2 = 14/14 = 1' }
      ],
      hint: 'Egy szám önmagával osztva mindig 1!',
      formula: '\\frac{2}{7} : \\frac{2}{7} = 1'
    },
    {
      id: 'q25',
      level: 1,
      question: 'Melyik pozitív egész szám reciproka egyenlő önmagával?',
      questionTypeBadge: 'Reciprok tulajdonsága',
      options: ['1', '2', '0', '10'],
      correctAnswer: '1',
      explanation: '1 reciproka 1/1 = 1, mert 1 · 1 = 1.',
      steps: [
        { label: '1. Reciprok', value: '1/1 = 1' }
      ],
      hint: '1 osztva 1-gyel az mennyi?',
      formula: '1^{-1} = 1'
    },
    {
      id: 'q26',
      level: 1,
      question: 'Mennyi a 0 reciproka?',
      questionTypeBadge: 'Nulla reciproka',
      options: ['Nincs értelmezve', '0', '1', 'Végtelen'],
      correctAnswer: 'Nincs értelmezve',
      explanation: 'A 0-nak nincs reciproka, mert 0-val nem lehet osztani (1/0 nincs értelmezve).',
      steps: [
        { label: '1. Szabály', value: '\\text{Nullával való osztás nincs értelmezve!}' }
      ],
      hint: 'Lehet-e nullával osztani?',
      formula: '\\frac{1}{0} \\quad (\\text{értelmetlen})'
    },
    {
      id: 'q27',
      level: 1,
      question: 'Mennyi a 0,7 · 100 szorzás eredménye?',
      questionTypeBadge: 'Szorzás 100-zal',
      options: ['70', '7', '700', '0,07'],
      correctAnswer: '70',
      explanation: 'A tizedesvessző 2 hellyel jobbra lép: 0,70 · 100 = 70.',
      steps: [
        { label: '1. Vesszőmozgatás 2 jeggyel jobbra', value: '0,7 \\rightarrow 70' }
      ],
      hint: 'Lépj 2 hellyel jobbra a vesszővel!',
      formula: '0,7 \\cdot 100 = 70'
    },
    {
      id: 'q28',
      level: 1,
      question: 'Mennyi az 5,6 : 10 osztás eredménye?',
      questionTypeBadge: 'Osztás 10-zel',
      options: ['0,56', '56', '0,056', '5,06'],
      correctAnswer: '0,56',
      explanation: 'A tizedesvessző 1 hellyel balra lép: 5,6 : 10 = 0,56.',
      steps: [
        { label: '1. Vesszőmozgatás balra', value: '5,6 \\rightarrow 0,56' }
      ],
      hint: '10-zel osztva 1 hellyel lépj balra!',
      formula: '5,6 : 10 = 0,56'
    },
    {
      id: 'q29',
      level: 1,
      question: 'Kerekítsd a 3,846 számot tizedekre!',
      questionTypeBadge: 'Tizedes kerekítés',
      options: ['3,8', '3,9', '3,85', '4,0'],
      correctAnswer: '3,8',
      explanation: 'A tizedek helyén 8 áll, az utána következő századok jegye 4, így lefelé kerekítünk: 3,8.',
      steps: [
        { label: '1. Következő jegy vizsgálata', value: '4 < 5 \\rightarrow \\text{lefelé kerekítés}' },
        { label: '2. Kerekített érték', value: '3,8' }
      ],
      hint: 'A 4-es lefelé kerekít!',
      formula: '3,846 \\approx 3,8'
    },
    {
      id: 'q30',
      level: 1,
      question: 'Kerekítsd a 7,295 számot századokra!',
      questionTypeBadge: 'Századokra kerekítés',
      options: ['7,30', '7,29', '7,20', '7,35'],
      correctAnswer: '7,30',
      explanation: 'A századok helyén 9 áll, az ezredek helyén 5, így felfelé kerekítünk: 29 századból 30 század lesz (7,30).',
      steps: [
        { label: '1. Következő jegy vizsgálata', value: '5 \\ge 5 \\rightarrow \\text{felfelé kerekítés}' },
        { label: '2. Kerekített érték', value: '7,30' }
      ],
      hint: 'Az 5-ös felfelé kerekíti a 9-est!',
      formula: '7,295 \\approx 7,30'
    },

    // =========================================================================
    // 2. SZINT: KÖZÉPSZINT, VEGYES MŰVELETEK, TIZEDESTÖRTEK OSZTÁSA (30 kérdés)
    // =========================================================================
    {
      id: 'q31',
      level: 2,
      question: 'Mennyi a 3/4 · 8/9 szorzás eredménye a legegyszerűbb alakban?',
      questionTypeBadge: 'Törtek szorzása',
      options: ['2/3', '24/36', '6/9', '3/4'],
      correctAnswer: '2/3',
      explanation: 'Keresztbe egyszerűsítünk: 3 és 9 egyszerűsíthető 3-mal (1 és 3), 8 és 4 egyszerűsíthető 4-gyel (2 és 1). Így (1 · 2)/(1 · 3) = 2/3.',
      steps: [
        { label: '1. Keresztbe egyszerűsítés', value: '\\frac{3}{4} \\cdot \\frac{8}{9} = \\frac{1}{1} \\cdot \\frac{2}{3}' },
        { label: '2. Szorzás', value: '2/3' }
      ],
      hint: 'Egyszerűsíts keresztbe a 3-mal és a 4-gyel!',
      formula: '\\frac{\\cancel{3}^1}{\\cancel{4}_1} \\cdot \\frac{\\cancel{8}^2}{\\cancel{9}_3} = \\frac{2}{3}'
    },
    {
      id: 'q32',
      level: 2,
      question: 'Mennyi az 5/6 : 5/12 osztás eredménye?',
      questionTypeBadge: 'Törtek osztása',
      options: ['2', '1/2', '25/72', '1'],
      correctAnswer: '2',
      explanation: 'Reciprokkal szorzunk: 5/6 · 12/5 = (5 · 12)/(6 · 5) = 12/6 = 2.',
      steps: [
        { label: '1. Reciprokkal szorzás', value: '5/6 · 12/5' },
        { label: '2. Egyszerűsítés 5-tel és 6-tal', value: '12/6 = 2' }
      ],
      hint: 'Fordítsd meg a második törtet és egyszerűsíts!',
      formula: '\\frac{5}{6} : \\frac{5}{12} = \\frac{5}{6} \\cdot \\frac{12}{5} = 2'
    },
    {
      id: 'q33',
      level: 2,
      question: 'Mennyi a 4,8 : 0,6 osztás értéke?',
      questionTypeBadge: 'Osztás tizedessel',
      options: ['8', '0,8', '80', '0,08'],
      correctAnswer: '8',
      explanation: 'Bővítünk 10-zel: 48 : 6 = 8.',
      steps: [
        { label: '1. Bővítés 10-zel', value: '4,8 : 0,6 = 48 : 6' },
        { label: '2. Osztás', value: '48 : 6 = 8' }
      ],
      hint: 'Bővítsd mindkét számot 10-zel, hogy egész számokkal oszthass!',
      formula: '4,8 : 0,6 = 48 : 6 = 8'
    },
    {
      id: 'q34',
      level: 2,
      question: 'Mennyi a 3 : 0,25 osztás értéke?',
      questionTypeBadge: 'Egész osztása tizedessel',
      options: ['12', '0,75', '7,5', '0,12'],
      correctAnswer: '12',
      explanation: 'Bővítünk 100-zal: 300 : 25 = 12 (vagy 3 : 1/4 = 3 · 4 = 12).',
      steps: [
        { label: '1. Bővítés 100-zal', value: '300 : 25' },
        { label: '2. Osztás', value: '300 : 25 = 12' }
      ],
      hint: 'Hányszor van meg a negyed a 3 egészben?',
      formula: '3 : 0,25 = 300 : 25 = 12'
    },
    {
      id: 'q35',
      level: 2,
      question: 'Mennyi a 0,08 · 0,5 szorzat értéke?',
      questionTypeBadge: 'Több tizedesjegy szorzása',
      options: ['0,04', '0,4', '0,004', '0,040'],
      correctAnswer: '0,04',
      explanation: '8 · 5 = 40. A 2 + 1 = 3 tizedesjegy miatt 0,040 = 0,04.',
      steps: [
        { label: '1. Szorzás', value: '8 · 5 = 40' },
        { label: '2. Vessző kihelyezése 3 jeggyel', value: '0,040 = 0,04' }
      ],
      hint: 'A szorzás a felével megegyezik a felezéssel: 0,08 fele 0,04!',
      formula: '0,08 \\cdot 0,5 = 0,04'
    },
    {
      id: 'q36',
      level: 2,
      question: 'Mennyi az 1 1/2 · 2/3 szorzás eredménye?',
      questionTypeBadge: 'Vegyes tört szorzása',
      options: ['1', '3/3', '2/6', '1 1/3'],
      correctAnswer: '1',
      explanation: '1 1/2 = 3/2. Így 3/2 · 2/3 = 1 (egymás reciprokai!).',
      steps: [
        { label: '1. Átírás áltörtbe', value: '1 1/2 = 3/2' },
        { label: '2. Szorzás', value: '3/2 · 2/3 = 1' }
      ],
      hint: 'Alakítsd át áltörtté a vegyes törtet!',
      formula: '1 \\frac{1}{2} \\cdot \\frac{2}{3} = \\frac{3}{2} \\cdot \\frac{2}{3} = 1'
    },
    {
      id: 'q37',
      level: 2,
      question: 'Mennyi a 2 1/4 : 3/4 osztás eredménye?',
      questionTypeBadge: 'Vegyes tört osztása',
      options: ['3', '1 1/2', '9/16', '2'],
      correctAnswer: '3',
      explanation: '2 1/4 = 9/4. Így 9/4 : 3/4 = 9/4 · 4/3 = 9/3 = 3.',
      steps: [
        { label: '1. Áltört alak', value: '2 1/4 = 9/4' },
        { label: '2. Reciprokkal szorzás', value: '9/4 · 4/3 = 3' }
      ],
      hint: '9 negyedben a 3 negyed hányszor van meg?',
      formula: '2 \\frac{1}{4} : \\frac{3}{4} = \\frac{9}{4} \\cdot \\frac{4}{3} = 3'
    },
    {
      id: 'q38',
      level: 2,
      question: 'Mennyi az 1/3 + 2/5 összeadás eredménye?',
      questionTypeBadge: 'Különböző nevezők összeadása',
      options: ['11/15', '3/8', '3/15', '7/15'],
      correctAnswer: '11/15',
      explanation: 'Közös nevező az LKKT(3, 5) = 15. Bővítve: 5/15 + 6/15 = 11/15.',
      steps: [
        { label: '1. Bővítés 15-re', value: '5/15 + 6/15' },
        { label: '2. Összeadás', value: '11/15' }
      ],
      hint: 'A közös nevező a 15!',
      formula: '\\frac{1}{3} + \\frac{2}{5} = \\frac{5}{15} + \\frac{6}{15} = \\frac{11}{15}'
    },
    {
      id: 'q39',
      level: 2,
      question: 'Mennyi az 5/6 - 3/8 kivonás eredménye a legegyszerűbb alakban?',
      questionTypeBadge: 'Különböző nevezők kivonása',
      options: ['11/24', '2/2', '2/24', '1/12'],
      correctAnswer: '11/24',
      explanation: 'LKKT(6, 8) = 24. Bővítve: 20/24 - 9/24 = 11/24.',
      steps: [
        { label: '1. Közös nevező (24)', value: '20/24 - 9/24' },
        { label: '2. Kivonás', value: '11/24' }
      ],
      hint: '6 és 8 legkisebb közös többszöröse a 24!',
      formula: '\\frac{5}{6} - \\frac{3}{8} = \\frac{20}{24} - \\frac{9}{24} = \\frac{11}{24}'
    },
    {
      id: 'q40',
      level: 2,
      question: 'Mennyi a 10 - 3 · 1,5 kifejezés értéke?',
      questionTypeBadge: 'Műveleti sorrend tizedessel',
      options: ['5,5', '10,5', '6,5', '4,5'],
      correctAnswer: '5,5',
      explanation: 'Először a szorzás: 3 · 1,5 = 4,5, majd 10 - 4,5 = 5,5.',
      steps: [
        { label: '1. Szorzás', value: '3 · 1,5 = 4,5' },
        { label: '2. Kivonás', value: '10 - 4,5 = 5,5' }
      ],
      hint: 'A szorzást végezd el előbb!',
      formula: '10 - (3 \\cdot 1,5) = 10 - 4,5 = 5,5'
    },
    {
      id: 'q41',
      level: 2,
      question: 'Mennyi az (5 - 1,2) · 2 kifejezés értéke?',
      questionTypeBadge: 'Zárójeles művelet',
      options: ['7,6', '8,6', '2,6', '9,6'],
      correctAnswer: '7,6',
      explanation: 'A zárójelben: 5 - 1,2 = 3,8, majd 3,8 · 2 = 7,6.',
      steps: [
        { label: '1. Zárójel', value: '5 - 1,2 = 3,8' },
        { label: '2. Szorzás', value: '3,8 · 2 = 7,6' }
      ],
      hint: 'Először a zárójelben vonj ki!',
      formula: '(5 - 1,2) \\cdot 2 = 3,8 \\cdot 2 = 7,6'
    },
    {
      id: 'q42',
      level: 2,
      question: 'Mennyi a -(4 - 7) kifejezés értéke?',
      questionTypeBadge: 'Előjeles zárójelfelbontás',
      options: ['3', '-3', '-11', '11'],
      correctAnswer: '3',
      explanation: 'Zárójelben: 4 - 7 = -3. Ennek ellentettje: -(-3) = 3 (vagy zárójelfelbontással: -4 + 7 = 3).',
      steps: [
        { label: '1. Zárójelfelbontás', value: '-4 + 7 = 3' }
      ],
      hint: 'A zárójel előtti mínusz előjelet vált!',
      formula: '-(4 - 7) = -4 + 7 = 3'
    },
    {
      id: 'q43',
      level: 2,
      question: 'Hogyan néz ki az -(a - 2b) kifejezés a zárójel felbontása után?',
      questionTypeBadge: 'Betűs zárójelfelbontás',
      options: ['-a + 2b', '-a - 2b', 'a - 2b', 'a + 2b'],
      correctAnswer: '-a + 2b',
      explanation: 'A zárójel előtti mínusz miatt minden tag ellentétes előjelű lesz: -(a - 2b) = -a + 2b.',
      steps: [
        { label: '1. Előjelváltás', value: '-(+a) = -a, -(-2b) = +2b' }
      ],
      hint: 'Minden tag előjele megfordul!',
      formula: '-(a - 2b) = -a + 2b'
    },
    {
      id: 'q44',
      level: 2,
      question: 'Bontsd fel a zárójelet: 3(x + 4) = ?',
      questionTypeBadge: 'Disztributivitás',
      options: ['3x + 12', '3x + 4', 'x + 12', '7x'],
      correctAnswer: '3x + 12',
      explanation: 'A szorzóval a zárójel minden tagját meg kell szorozni: 3 · x + 3 · 4 = 3x + 12.',
      steps: [
        { label: '1. Szorzás tagonként', value: '3 · x + 3 · 4 = 3x + 12' }
      ],
      hint: 'A 3-mal az x-et és a 4-et is meg kell szorozni!',
      formula: '3(x + 4) = 3x + 12'
    },
    {
      id: 'q45',
      level: 2,
      question: 'Bontsd fel a zárójelet: 2(3x - 5) = ?',
      questionTypeBadge: 'Zárójel szorzása',
      options: ['6x - 10', '6x - 5', '5x - 7', '6x + 10'],
      correctAnswer: '6x - 10',
      explanation: '2 · 3x - 2 · 5 = 6x - 10.',
      steps: [
        { label: '1. Szorzás', value: '2 · 3x = 6x, 2 · (-5) = -10' }
      ],
      hint: 'Szorozz be mindkét taggal!',
      formula: '2(3x - 5) = 6x - 10'
    },
    {
      id: 'q46',
      level: 2,
      question: 'Mennyi a 0,45 : 0,09 osztás értéke?',
      questionTypeBadge: 'Osztás századokkal',
      options: ['5', '0,5', '50', '0,05'],
      correctAnswer: '5',
      explanation: 'Bővítünk 100-zal: 45 : 9 = 5.',
      steps: [
        { label: '1. Bővítés 100-zal', value: '45 : 9 = 5' }
      ],
      hint: 'Bővítsd mindkét számot 100-zal: 45 osztva 9-cel!',
      formula: '0,45 : 0,09 = 45 : 9 = 5'
    },
    {
      id: 'q47',
      level: 2,
      question: 'Mennyi a 12 : 0,04 osztás értéke?',
      questionTypeBadge: 'Osztás századdal',
      options: ['300', '30', '3', '0,48'],
      correctAnswer: '300',
      explanation: 'Bővítünk 100-zal: 1200 : 4 = 300.',
      steps: [
        { label: '1. Bővítés 100-zal', value: '1200 : 4 = 300' }
      ],
      hint: '1200 : 4 = 300.',
      formula: '12 : 0,04 = 1200 : 4 = 300'
    },
    {
      id: 'q48',
      level: 2,
      question: 'Mennyi a 3,2 · 1,5 szorzat értéke?',
      questionTypeBadge: 'Tizedesek szorzása',
      options: ['4,8', '4,80', '3,8', '48'],
      correctAnswer: '4,8',
      explanation: '32 · 15 = 480. Két tizedesjeggyel: 4,80 = 4,8 (vagy 3,2 + 1,6 = 4,8).',
      steps: [
        { label: '1. Szorzás', value: '32 · 15 = 480' },
        { label: '2. Tizedesvessző', value: '4,80 = 4,8' }
      ],
      hint: '3,2 szorozva másféllel: 3,2 + 1,6 = 4,8!',
      formula: '3,2 \\cdot 1,5 = 4,8'
    },
    {
      id: 'q49',
      level: 2,
      question: 'Mennyi a 3/4 + 0,5 összeadás értéke tizedes tört alakban?',
      questionTypeBadge: 'Vegyes számforma összeadás',
      options: ['1,25', '1,5', '0,85', '1,75'],
      correctAnswer: '1,25',
      explanation: '3/4 = 0,75. Így 0,75 + 0,50 = 1,25 (vagy törtben 3/4 + 2/4 = 5/4 = 1,25).',
      steps: [
        { label: '1. Átváltás tizedessé', value: '3/4 = 0,75' },
        { label: '2. Összeadás', value: '0,75 + 0,50 = 1,25' }
      ],
      hint: '3/4 az 0,75, add hozzá a 0,5-öt!',
      formula: '\\frac{3}{4} + 0,5 = 0,75 + 0,5 = 1,25'
    },
    {
      id: 'q50',
      level: 2,
      question: 'Mennyi az 1/2 - 0,2 kivonás értéke tizedes tört alakban?',
      questionTypeBadge: 'Vegyes számforma kivonás',
      options: ['0,3', '0,7', '0,25', '0,35'],
      correctAnswer: '0,3',
      explanation: '1/2 = 0,5. Így 0,5 - 0,2 = 0,3.',
      steps: [
        { label: '1. Átváltás', value: '1/2 = 0,5' },
        { label: '2. Kivonás', value: '0,5 - 0,2 = 0,3' }
      ],
      hint: '0,5-ből vonj ki 0,2-t!',
      formula: '\\frac{1}{2} - 0,2 = 0,5 - 0,2 = 0,3'
    },
    {
      id: 'q51',
      level: 2,
      question: 'Mennyi a 2/3 · 0,6 szorzás értéke tizedes törtben?',
      questionTypeBadge: 'Tört és tizedes szorzása',
      options: ['0,4', '0,3', '0,6', '0,2'],
      correctAnswer: '0,4',
      explanation: '0,6 = 6/10 = 3/5. Így 2/3 · 3/5 = 2/5 = 0,4.',
      steps: [
        { label: '1. Átírás törtbe', value: '0,6 = 3/5' },
        { label: '2. Szorzás', value: '2/3 · 3/5 = 2/5 = 0,4' }
      ],
      hint: '0,6 kétharmad része = 0,4!',
      formula: '\\frac{2}{3} \\cdot 0,6 = \\frac{2}{3} \\cdot \\frac{3}{5} = \\frac{2}{5} = 0,4'
    },
    {
      id: 'q52',
      level: 2,
      question: 'Mennyi a 0,8 : 4/5 osztás értéke?',
      questionTypeBadge: 'Tizedes és tört osztása',
      options: ['1', '0,64', '0,8', '1,25'],
      correctAnswer: '1',
      explanation: '4/5 = 0,8. Így 0,8 : 0,8 = 1.',
      steps: [
        { label: '1. Átváltás', value: '4/5 = 0,8' },
        { label: '2. Osztás', value: '0,8 : 0,8 = 1' }
      ],
      hint: 'A 4/5 pontosan egyenlő 0,8-del!',
      formula: '0,8 : \\frac{4}{5} = 0,8 : 0,8 = 1'
    },
    {
      id: 'q53',
      level: 2,
      question: 'Egy könyv 120 oldalas. Péter elolvasta a könyv 3/4 részét. Hány oldal maradt még hátra?',
      questionTypeBadge: 'Szöveges feladat törtrésszel',
      options: ['30 oldal', '90 oldal', '40 oldal', '25 oldal'],
      correctAnswer: '30 oldal',
      explanation: '120 · 3/4 = 90 oldalt olvasott el. Hátramaradt: 120 - 90 = 30 oldal (vagy a könyv 1/4 része: 120 · 1/4 = 30).',
      steps: [
        { label: '1. Maradék törtrész', value: '1 - 3/4 = 1/4' },
        { label: '2. Oldalszám', value: '120 · 1/4 = 30' }
      ],
      hint: 'A könyv 1/4 része maradt hátra!',
      formula: '120 \\cdot \\left(1 - \\frac{3}{4}\\right) = 120 \\cdot \\frac{1}{4} = 30'
    },
    {
      id: 'q54',
      level: 2,
      question: 'Egy téglalap oldalai a = 3,5 cm és b = 2,4 cm. Mennyi a téglalap területe?',
      questionTypeBadge: 'Területszámítás tizedesekkel',
      options: ['8,4 cm²', '11,8 cm²', '7,2 cm²', '84 cm²'],
      correctAnswer: '8,4 cm²',
      explanation: 'T = a · b = 3,5 · 2,4 = 8,4 cm².',
      steps: [
        { label: '1. Képlet', value: 'T = a · b' },
        { label: '2. Szorzás', value: '3,5 · 2,4 = 8,4' }
      ],
      hint: 'Szorozd össze a két oldalhosszt!',
      formula: 'T = 3,5 \\cdot 2,4 = 8,4\\text{ cm}^2'
    },
    {
      id: 'q55',
      level: 2,
      question: 'Egy 15 méteres kötelet 0,75 méteres darabokra vágunk. Hány darab kötelet kapunk?',
      questionTypeBadge: 'Szöveges osztás',
      options: ['20 darab', '15 darab', '12 darab', '25 darab'],
      correctAnswer: '20 darab',
      explanation: '15 : 0,75 = 1500 : 75 = 20 darab (vagy 15 : 3/4 = 15 · 4/3 = 20).',
      steps: [
        { label: '1. Osztás', value: '15 : 0,75 = 1500 : 75' },
        { label: '2. Eredmény', value: '20' }
      ],
      hint: '0,75 m = 3/4 m. 15 : 3/4 = 15 · 4/3 = 20.',
      formula: '15 : 0,75 = 20'
    },
    {
      id: 'q56',
      level: 2,
      question: 'Mennyi a 3 1/3 és 2 2/5 számok szorzata?',
      questionTypeBadge: 'Vegyes törtek szorzása',
      options: ['8', '6 2/15', '7 1/2', '9'],
      correctAnswer: '8',
      explanation: '3 1/3 = 10/3, 2 2/5 = 12/5. Így 10/3 · 12/5 = (10 · 12)/(3 · 5) = 120/15 = 8.',
      steps: [
        { label: '1. Áltörtek', value: '10/3 \\text{ és } 12/5' },
        { label: '2. Keresztbe egyszerűsítés', value: '(2 · 4)/(1 · 1) = 8' }
      ],
      hint: 'Alakítsd mindkettőt áltörtté, majd egyszerűsíts keresztbe!',
      formula: '\\frac{10}{3} \\cdot \\frac{12}{5} = \\frac{2}{1} \\cdot \\frac{4}{1} = 8'
    },
    {
      id: 'q57',
      level: 2,
      question: 'Mennyi a 4 1/2 : 1 1/2 osztás eredménye?',
      questionTypeBadge: 'Vegyes törtek osztása',
      options: ['3', '2 1/2', '4', '6'],
      correctAnswer: '3',
      explanation: '4 1/2 = 9/2, 1 1/2 = 3/2. Így 9/2 : 3/2 = 9/2 · 2/3 = 9/3 = 3.',
      steps: [
        { label: '1. Áltörtek', value: '9/2 \\text{ és } 3/2' },
        { label: '2. Osztás', value: '9/2 · 2/3 = 3' }
      ],
      hint: 'Másfél hányszor van meg a négy és félben?',
      formula: '\\frac{9}{2} : \\frac{3}{2} = \\frac{9}{3} = 3'
    },
    {
      id: 'q58',
      level: 2,
      question: 'Mennyi az (1/2 + 1/3) · 6 kifejezés értéke?',
      questionTypeBadge: 'Zárójel törtekkel és szorzás',
      options: ['5', '6', '4', '5/6'],
      correctAnswer: '5',
      explanation: '1/2 + 1/3 = 5/6. Majd 5/6 · 6 = 5 (vagy felbontással: 1/2 · 6 + 1/3 · 6 = 3 + 2 = 5).',
      steps: [
        { label: '1. Zárójelfelbontás', value: '1/2 · 6 + 1/3 · 6 = 3 + 2' },
        { label: '2. Összeadás', value: '3 + 2 = 5' }
      ],
      hint: 'Használhatod a disztributivitást is: 3 + 2 = 5!',
      formula: '\\left(\\frac{1}{2} + \\frac{1}{3}\\right) \\cdot 6 = 3 + 2 = 5'
    },
    {
      id: 'q59',
      level: 2,
      question: 'Mennyi a 20 - 4 · (2 + 1,5) kifejezés értéke?',
      questionTypeBadge: 'Összetett műveleti sorrend',
      options: ['6', '14', '56', '8'],
      correctAnswer: '6',
      explanation: 'Zárójel: 2 + 1,5 = 3,5. Szorzás: 4 · 3,5 = 14. Kivonás: 20 - 14 = 6.',
      steps: [
        { label: '1. Zárójel', value: '2 + 1,5 = 3,5' },
        { label: '2. Szorzás', value: '4 · 3,5 = 14' },
        { label: '3. Kivonás', value: '20 - 14 = 6' }
      ],
      hint: 'Zárójel ➔ Szorzás ➔ Kivonás!',
      formula: '20 - 4 \\cdot 3,5 = 20 - 14 = 6'
    },
    {
      id: 'q60',
      level: 2,
      question: 'Mennyi a 7,5 - [2 · (1,5 + 0,5)] kifejezés értéke?',
      questionTypeBadge: 'Többszörös zárójel',
      options: ['3,5', '4,5', '5,5', '2,5'],
      correctAnswer: '3,5',
      explanation: 'Belső kerek zárójel: 1,5 + 0,5 = 2. Szögletes zárójel: 2 · 2 = 4. Végül: 7,5 - 4 = 3,5.',
      steps: [
        { label: '1. Kerek zárójel', value: '1,5 + 0,5 = 2' },
        { label: '2. Szögletes zárójel', value: '2 · 2 = 4' },
        { label: '3. Kivonás', value: '7,5 - 4 = 3,5' }
      ],
      hint: 'Mindig a legbelső zárójeltől indulj!',
      formula: '7,5 - [2 \\cdot 2] = 7,5 - 4 = 3,5'
    },

    // =========================================================================
    // 3. SZINT: MESTER SZINT, ÖSSZETETT KIFEJEZÉSEK ÉS FEJEZETI NAGYFELADATOK (30 kérdés)
    // =========================================================================
    {
      id: 'q61',
      level: 3,
      question: 'Mennyi a 20 - [3 · (4 - 1,5) + 2] kifejezés értéke?',
      questionTypeBadge: 'Mester művelet',
      options: ['10,5', '9,5', '11,5', '8,5'],
      correctAnswer: '10,5',
      explanation: 'Kerek zárójel: 4 - 1,5 = 2,5. Szögletes zárójelben a szorzás: 3 · 2,5 = 7,5, majd + 2 = 9,5. Végül: 20 - 9,5 = 10,5.',
      steps: [
        { label: '1. Kerek zárójel', value: '4 - 1,5 = 2,5' },
        { label: '2. Szögletes zárójel', value: '3 · 2,5 + 2 = 7,5 + 2 = 9,5' },
        { label: '3. Kivonás', value: '20 - 9,5 = 10,5' }
      ],
      hint: 'Belülről kifelé haladj a zárójelekkel!',
      formula: '20 - [7,5 + 2] = 20 - 9,5 = 10,5'
    },
    {
      id: 'q62',
      level: 3,
      question: 'Mennyi a [(2/3 + 1/3) · 6] : 0,5 kifejezés értéke?',
      questionTypeBadge: 'Vegyes többszörös zárójel',
      options: ['12', '3', '6', '24'],
      correctAnswer: '12',
      explanation: 'Kerek zárójel: 2/3 + 1/3 = 1. Szögletes zárójel: 1 · 6 = 6. Osztás: 6 : 0,5 = 6 · 2 = 12.',
      steps: [
        { label: '1. Kerek zárójel', value: '2/3 + 1/3 = 1' },
        { label: '2. Szögletes zárójel', value: '1 · 6 = 6' },
        { label: '3. Osztás', value: '6 : 0,5 = 12' }
      ],
      hint: '0,5-del osztani ugyanaz, mint 2-vel szorozni!',
      formula: '[1 \\cdot 6] : 0,5 = 6 : 0,5 = 12'
    },
    {
      id: 'q63',
      level: 3,
      question: 'Mennyi a [3 - (1/2 + 0,5)] · 4 kifejezés értéke?',
      questionTypeBadge: 'Tört és tizedes összetett',
      options: ['8', '10', '6', '12'],
      correctAnswer: '8',
      explanation: 'Kerek zárójel: 1/2 + 0,5 = 0,5 + 0,5 = 1. Szögletes zárójel: 3 - 1 = 2. Szorzás: 2 · 4 = 8.',
      steps: [
        { label: '1. Kerek zárójel', value: '0,5 + 0,5 = 1' },
        { label: '2. Szögletes zárójel', value: '3 - 1 = 2' },
        { label: '3. Szorzás', value: '2 · 4 = 8' }
      ],
      hint: '1/2 az 0,5, így a zárójel értéke 1!',
      formula: '[3 - 1] \\cdot 4 = 2 \\cdot 4 = 8'
    },
    {
      id: 'q64',
      level: 3,
      question: 'Mennyi a 2 · [5 - 2 · (1 + 0,5)] kifejezés értéke?',
      questionTypeBadge: 'Emeletes zárójeles számítás',
      options: ['4', '6', '2', '8'],
      correctAnswer: '4',
      explanation: 'Kerek zárójel: 1 + 0,5 = 1,5. Szögletesben a szorzás: 2 · 1,5 = 3, majd 5 - 3 = 2. Végül: 2 · 2 = 4.',
      steps: [
        { label: '1. Kerek zárójel', value: '1 + 0,5 = 1,5' },
        { label: '2. Szögletes zárójel', value: '5 - 2 · 1,5 = 5 - 3 = 2' },
        { label: '3. Külső szorzás', value: '2 · 2 = 4' }
      ],
      hint: 'Figyelj a szögletes zárójelen belüli szorzásra!',
      formula: '2 \\cdot [5 - 3] = 2 \\cdot 2 = 4'
    },
    {
      id: 'q65',
      level: 3,
      question: 'Mennyi a 15 : [2 · (1,5 + 1)] kifejezés értéke?',
      questionTypeBadge: 'Zárójeles osztás',
      options: ['3', '5', '1', '2,5'],
      correctAnswer: '3',
      explanation: 'Kerek zárójel: 1,5 + 1 = 2,5. Szögletes zárójel: 2 · 2,5 = 5. Végül: 15 : 5 = 3.',
      steps: [
        { label: '1. Kerek zárójel', value: '1,5 + 1 = 2,5' },
        { label: '2. Szögletes zárójel', value: '2 · 2,5 = 5' },
        { label: '3. Osztás', value: '15 : 5 = 3' }
      ],
      hint: 'A nevezőben / osztóban 2 · 2,5 = 5 lesz!',
      formula: '15 : [2 \\cdot 2,5] = 15 : 5 = 3'
    },
    {
      id: 'q66',
      level: 3,
      question: 'Mennyi a [1,5 · 4 - (2 - 0,5)] : 0,5 kifejezés értéke?',
      questionTypeBadge: 'Összetett tizedes mesterfeladat',
      options: ['9', '7,5', '8', '10'],
      correctAnswer: '9',
      explanation: 'Szögletesben: 1,5 · 4 = 6, és 2 - 0,5 = 1,5. A különbség: 6 - 1,5 = 4,5. Osztás: 4,5 : 0,5 = 9.',
      steps: [
        { label: '1. Részműveletek', value: '1,5 · 4 = 6, \\ 2 - 0,5 = 1,5' },
        { label: '2. Szögletes zárójel', value: '6 - 1,5 = 4,5' },
        { label: '3. Osztás', value: '4,5 : 0,5 = 9' }
      ],
      hint: '4,5 osztva 0,5-del = 4,5 · 2 = 9.',
      formula: '[6 - 1,5] : 0,5 = 4,5 : 0,5 = 9'
    },
    {
      id: 'q67',
      level: 3,
      question: 'Mennyi a [4 - (1/4 + 0,75)] · 5 kifejezés értéke?',
      questionTypeBadge: 'Tört és tizedes zárójelben',
      options: ['15', '20', '12', '10'],
      correctAnswer: '15',
      explanation: '1/4 = 0,25, így 0,25 + 0,75 = 1. Szögletes zárójel: 4 - 1 = 3. Szorzás: 3 · 5 = 15.',
      steps: [
        { label: '1. Kerek zárójel', value: '0,25 + 0,75 = 1' },
        { label: '2. Szögletes zárójel', value: '4 - 1 = 3' },
        { label: '3. Szorzás', value: '3 · 5 = 15' }
      ],
      hint: '1/4 + 0,75 = 1 egész!',
      formula: '[4 - 1] \\cdot 5 = 3 \\cdot 5 = 15'
    },
    {
      id: 'q68',
      level: 3,
      question: 'Egyszerűsítsd a betűs kifejezést: 3(x - 2) - 2(x - 3) = ?',
      questionTypeBadge: 'Algebrai zárójelfelbontás',
      options: ['x', 'x - 12', '5x', 'x - 6'],
      correctAnswer: 'x',
      explanation: 'Felbontás: 3x - 6 - 2x + 6 = (3x - 2x) + (-6 + 6) = x.',
      steps: [
        { label: '1. Zárójelfelbontás', value: '3x - 6 - 2x + 6' },
        { label: '2. Összevonás', value: 'x + 0 = x' }
      ],
      hint: 'Figyelj a -2 · (-3) = +6 előjelére!',
      formula: '3x - 6 - 2x + 6 = x'
    },
    {
      id: 'q69',
      level: 3,
      question: 'Egyszerűsítsd a betűs kifejezést: 4(2a - 1) - 3(a - 2) = ?',
      questionTypeBadge: 'Algebrai kifejezések',
      options: ['5a + 2', '5a - 10', '5a - 2', '11a + 2'],
      correctAnswer: '5a + 2',
      explanation: 'Felbontás: 8a - 4 - 3a + 6 = (8a - 3a) + (-4 + 6) = 5a + 2.',
      steps: [
        { label: '1. Zárójelfelbontás', value: '8a - 4 - 3a + 6' },
        { label: '2. Összevonás', value: '5a + 2' }
      ],
      hint: '-3 · (-2) = +6!',
      formula: '8a - 4 - 3a + 6 = 5a + 2'
    },
    {
      id: 'q70',
      level: 3,
      question: 'Egyszerűsítsd: -(2x - 3) + 3(x - 1) = ?',
      questionTypeBadge: 'Előjeles összevonás',
      options: ['x', 'x - 6', '5x', '-x'],
      correctAnswer: 'x',
      explanation: 'Felbontás: -2x + 3 + 3x - 3 = (-2x + 3x) + (3 - 3) = x.',
      steps: [
        { label: '1. Felbontás', value: '-2x + 3 + 3x - 3' },
        { label: '2. Összevonás', value: 'x' }
      ],
      hint: '+3 és -3 kiejtik egymást!',
      formula: '-2x + 3 + 3x - 3 = x'
    },
    {
      id: 'q71',
      level: 3,
      question: 'Mennyi a (3/4 - 1/6) : (5/12 + 1/4) kifejezés értéke a legegyszerűbb alakban?',
      questionTypeBadge: 'Törtek összetett művelete',
      options: ['7/8', '1', '3/4', '5/6'],
      correctAnswer: '7/8',
      explanation: 'Első zárójel: 9/12 - 2/12 = 7/12. Második zárójel: 5/12 + 3/12 = 8/12. Osztás: 7/12 : 8/12 = 7/8.',
      steps: [
        { label: '1. Első zárójel', value: '9/12 - 2/12 = 7/12' },
        { label: '2. Második zárójel', value: '5/12 + 3/12 = 8/12' },
        { label: '3. Osztás', value: '7/12 · 12/8 = 7/8' }
      ],
      hint: 'Azonos nevezőjű törteknél az osztás megegyezik a számlálók hányadosával: 7 : 8 = 7/8!',
      formula: '\\frac{7}{12} : \\frac{8}{12} = \\frac{7}{8}'
    },
    {
      id: 'q72',
      level: 3,
      question: 'Mennyi az [(1 1/3 · 3/4) + 1/2] : 0,25 kifejezés értéke?',
      questionTypeBadge: 'Vegyes tört és tizedes lánc',
      options: ['6', '4', '8', '1,5'],
      correctAnswer: '6',
      explanation: '1 1/3 = 4/3. Szorzás: 4/3 · 3/4 = 1. Összeadás: 1 + 1/2 = 1,5. Osztás: 1,5 : 0,25 = 6 (vagy 3/2 : 1/4 = 3/2 · 4 = 6).',
      steps: [
        { label: '1. Szorzás', value: '4/3 · 3/4 = 1' },
        { label: '2. Összeadás', value: '1 + 0,5 = 1,5' },
        { label: '3. Osztás', value: '1,5 : 0,25 = 6' }
      ],
      hint: '1,5-ben a negyed 6-szor van meg!',
      formula: '[1 + 0,5] : 0,25 = 1,5 : 0,25 = 6'
    },
    {
      id: 'q73',
      level: 3,
      question: 'Mennyi a 2,5 · [4 - 2 · (0,8 + 0,2)] kifejezés értéke?',
      questionTypeBadge: 'Emeletes zárójel tizedessel',
      options: ['5', '7,5', '2,5', '10'],
      correctAnswer: '5',
      explanation: 'Kerek zárójel: 0,8 + 0,2 = 1. Szögletesben: 4 - 2 · 1 = 4 - 2 = 2. Végül: 2,5 · 2 = 5.',
      steps: [
        { label: '1. Kerek zárójel', value: '0,8 + 0,2 = 1' },
        { label: '2. Szögletes zárójel', value: '4 - 2 = 2' },
        { label: '3. Szorzás', value: '2,5 · 2 = 5' }
      ],
      hint: '0,8 + 0,2 = 1 egész!',
      formula: '2,5 \\cdot [4 - 2] = 2,5 \\cdot 2 = 5'
    },
    {
      id: 'q74',
      level: 3,
      question: 'Mennyi a [5,6 : 0,7 - (3,2 - 1,2)] · 1,5 kifejezés értéke?',
      questionTypeBadge: 'Mester tizedes kifejezés',
      options: ['9', '6', '12', '7,5'],
      correctAnswer: '9',
      explanation: '5,6 : 0,7 = 8. Kerek zárójel: 3,2 - 1,2 = 2. Szögletes zárójel: 8 - 2 = 6. Végül: 6 · 1,5 = 9.',
      steps: [
        { label: '1. Részműveletek', value: '5,6 : 0,7 = 8, \\ 3,2 - 1,2 = 2' },
        { label: '2. Szögletes zárójel', value: '8 - 2 = 6' },
        { label: '3. Szorzás', value: '6 · 1,5 = 9' }
      ],
      hint: '6 szorozva 1,5-del: 6 + 3 = 9.',
      formula: '[8 - 2] \\cdot 1,5 = 6 \\cdot 1,5 = 9'
    },
    {
      id: 'q75',
      level: 3,
      question: 'Mennyi a (2/5 + 0,6) · (1 1/2 - 0,5) kifejezés értéke?',
      questionTypeBadge: 'Két zárójel szorzata',
      options: ['1', '2', '0,5', '1,5'],
      correctAnswer: '1',
      explanation: 'Első zárójel: 2/5 = 0,4, így 0,4 + 0,6 = 1. Második zárójel: 1,5 - 0,5 = 1. Szorzat: 1 · 1 = 1.',
      steps: [
        { label: '1. Első zárójel', value: '0,4 + 0,6 = 1' },
        { label: '2. Második zárójel', value: '1,5 - 0,5 = 1' },
        { label: '3. Szorzás', value: '1 · 1 = 1' }
      ],
      hint: 'Mindkét zárójel értéke pontosan 1!',
      formula: '1 \\cdot 1 = 1'
    },
    {
      id: 'q76',
      level: 3,
      question: 'Mennyi a 18 : [3 · (1/3 + 1/6) · 4] kifejezés értéke?',
      questionTypeBadge: 'Összetett osztási lánc',
      options: ['3', '6', '1', '2'],
      correctAnswer: '3',
      explanation: 'Kerek zárójel: 1/3 + 1/6 = 2/6 + 1/6 = 3/6 = 1/2. Szögletes zárójel: 3 · 1/2 · 4 = 3 · 2 = 6. Osztás: 18 : 6 = 3.',
      steps: [
        { label: '1. Kerek zárójel', value: '1/3 + 1/6 = 1/2' },
        { label: '2. Szögletes zárójel', value: '3 · 1/2 · 4 = 6' },
        { label: '3. Osztás', value: '18 : 6 = 3' }
      ],
      hint: '1/2 · 4 = 2, 3 · 2 = 6!',
      formula: '18 : [3 \\cdot 0,5 \\cdot 4] = 18 : 6 = 3'
    },
    {
      id: 'q77',
      level: 3,
      question: 'Mennyi a [10 - 2 · (1,5 + 2,5)] : (0,5 · 0,4) kifejezés értéke?',
      questionTypeBadge: 'Mester számláló és nevező',
      options: ['10', '5', '20', '2'],
      correctAnswer: '10',
      explanation: 'Számláló: 1,5 + 2,5 = 4; 2 · 4 = 8; 10 - 8 = 2. Nevező: 0,5 · 0,4 = 0,2. Osztás: 2 : 0,2 = 10.',
      steps: [
        { label: '1. Első zárójel', value: '10 - 2 · 4 = 10 - 8 = 2' },
        { label: '2. Második zárójel', value: '0,5 · 0,4 = 0,2' },
        { label: '3. Osztás', value: '2 : 0,2 = 10' }
      ],
      hint: '2 : 0,2 = 20 : 2 = 10.',
      formula: '2 : 0,2 = 10'
    },
    {
      id: 'q78',
      level: 3,
      question: 'Mennyi az 5 - [2,4 : 0,6 + (1/2 - 0,5)] kifejezés értéke?',
      questionTypeBadge: 'Zárójelek kivonása',
      options: ['1', '0', '2', '3'],
      correctAnswer: '1',
      explanation: '2,4 : 0,6 = 4. Kerek zárójel: 1/2 - 0,5 = 0. Szögletes zárójel: 4 + 0 = 4. Végül: 5 - 4 = 1.',
      steps: [
        { label: '1. Részműveletek', value: '2,4 : 0,6 = 4, \\ 1/2 - 0,5 = 0' },
        { label: '2. Szögletes zárójel', value: '4 + 0 = 4' },
        { label: '3. Kivonás', value: '5 - 4 = 1' }
      ],
      hint: '1/2 - 0,5 = 0!',
      formula: '5 - [4 + 0] = 5 - 4 = 1'
    },
    {
      id: 'q79',
      level: 3,
      question: 'Anna a zsebpénzének 2/5 részét könyvre költötte, a megmaradt pénzének a felét pedig mozijegyre. Így még 3000 Ft-ja maradt. Mennyi pénze volt eredetileg?',
      questionTypeBadge: 'Összetett szöveges feladat',
      options: ['10 000 Ft', '12 000 Ft', '8 000 Ft', '15 000 Ft'],
      correctAnswer: '10 000 Ft',
      explanation: 'A könyv után megmaradt 3/5 rész. Ennek a fele (3/10 rész) ment mozira, és 3/10 rész maradt meg. Ha 3/10 rész = 3000 Ft, akkor 1/10 rész = 1000 Ft, a teljes pénz pedig 10 · 1000 = 10 000 Ft.',
      steps: [
        { label: '1. Maradék aránya', value: '1 - 2/5 = 3/5' },
        { label: '2. Végleges maradék', value: '3/5 · 1/2 = 3/10' },
        { label: '3. Teljes összeg', value: '3000 : 3/10 = 10 000 \\text{ Ft}' }
      ],
      hint: 'A megmaradt pénz a teljes összeg 3/10 része!',
      formula: 'x \\cdot \\frac{3}{10} = 3000 \\implies x = 10\\,000'
    },
    {
      id: 'q80',
      level: 3,
      question: 'Egy víztartály 3/4 részéig van vízzel. Ha leengedünk belőle 60 litert, akkor a tartály pontosan félig (1/2-ig) lesz tele. Hány literes a teljes tartály?',
      questionTypeBadge: 'Szöveges egyenletes törtfeladat',
      options: ['240 liter', '180 liter', '120 liter', '300 liter'],
      correctAnswer: '240 liter',
      explanation: 'A vízszint csökkenése: 3/4 - 1/2 = 3/4 - 2/4 = 1/4 rész. Ha a tartály 1/4 része 60 liter, akkor a teljes űrtartalom 4 · 60 = 240 liter.',
      steps: [
        { label: '1. Vízszint különbség', value: '3/4 - 2/4 = 1/4' },
        { label: '2. Teljes tartály', value: '60 · 4 = 240 \\text{ liter}' }
      ],
      hint: 'A 60 liter a tartály 1/4 részének felel meg!',
      formula: '\\frac{1}{4} V = 60 \\implies V = 240'
    },
    {
      id: 'q81',
      level: 3,
      question: 'Egy téglalap egyik oldala a = 4,5 cm, a másik oldala b = 3 1/3 cm. Mennyi a téglalap területe?',
      questionTypeBadge: 'Téglalap vegyes adatokkal',
      options: ['15 cm²', '14,5 cm²', '16 cm²', '13 1/2 cm²'],
      correctAnswer: '15 cm²',
      explanation: '4,5 = 9/2 cm és 3 1/3 = 10/3 cm. Terület: T = a · b = 9/2 · 10/3 = (9 · 10)/(2 · 3) = 90/6 = 15 cm².',
      steps: [
        { label: '1. Átírás közönséges törtbe', value: '4,5 = 9/2, \\ 3 1/3 = 10/3' },
        { label: '2. Terület szorzása', value: '9/2 · 10/3 = 15 \\text{ cm}^2' }
      ],
      hint: 'Írd át mindkét oldalt tört alakba és egyszerűsíts keresztbe!',
      formula: 'T = \\frac{9}{2} \\cdot \\frac{10}{3} = \\frac{3}{1} \\cdot \\frac{5}{1} = 15\\text{ cm}^2'
    },
    {
      id: 'q82',
      level: 3,
      question: 'Egyszerűsítsd a 4(x - 1,5) - 2(x - 3) kifejezést!',
      questionTypeBadge: 'Algebra és tizedes',
      options: ['2x', '2x - 12', '2x - 6', '6x'],
      correctAnswer: '2x',
      explanation: '4 · x - 4 · 1,5 - 2 · x + 2 · 3 = 4x - 6 - 2x + 6 = 2x.',
      steps: [
        { label: '1. Zárójelfelbontás', value: '4x - 6 - 2x + 6' },
        { label: '2. Összevonás', value: '2x' }
      ],
      hint: '4 · 1,5 = 6 és -2 · (-3) = +6 kiejtik egymást!',
      formula: '4x - 6 - 2x + 6 = 2x'
    },
    {
      id: 'q83',
      level: 3,
      question: 'Mennyi a [3 · (2,5 - 0,5) - 2 · (1,2 + 0,8)] : 0,5 kifejezés értéke?',
      questionTypeBadge: 'Összetett zárójellánc',
      options: ['4', '2', '8', '6'],
      correctAnswer: '4',
      explanation: 'Első tag: 3 · 2 = 6. Második tag: 2 · 2 = 4. Szögletes zárójel: 6 - 4 = 2. Osztás: 2 : 0,5 = 4.',
      steps: [
        { label: '1. Kerek zárójelek', value: '2,5 - 0,5 = 2, \\ 1,2 + 0,8 = 2' },
        { label: '2. Szögletes zárójel', value: '3 · 2 - 2 · 2 = 6 - 4 = 2' },
        { label: '3. Osztás', value: '2 : 0,5 = 4' }
      ],
      hint: '2 : 0,5 = 4.',
      formula: '[6 - 4] : 0,5 = 2 : 0,5 = 4'
    },
    {
      id: 'q84',
      level: 3,
      question: 'Mennyi a (7/8 - 3/4) : (1/2 - 3/8) kifejezés értéke?',
      questionTypeBadge: 'Törtek hányadosa',
      options: ['1', '1/8', '2', '1/2'],
      correctAnswer: '1',
      explanation: 'Számláló: 7/8 - 6/8 = 1/8. Nevező: 4/8 - 3/8 = 1/8. Osztás: 1/8 : 1/8 = 1.',
      steps: [
        { label: '1. Első zárójel', value: '7/8 - 6/8 = 1/8' },
        { label: '2. Második zárójel', value: '4/8 - 3/8 = 1/8' },
        { label: '3. Osztás', value: '1/8 : 1/8 = 1' }
      ],
      hint: 'Mindkét zárójel értéke 1/8!',
      formula: '\\frac{1}{8} : \\frac{1}{8} = 1'
    },
    {
      id: 'q85',
      level: 3,
      question: 'Mennyi a 3 3/4 · 1 3/5 : 2 2/3 kifejezés értéke vegyes tört alakban?',
      questionTypeBadge: 'Vegyes törtek lánca',
      options: ['2 1/4', '3 1/2', '1 7/8', '2 1/2'],
      correctAnswer: '2 1/4',
      explanation: 'Áltörtek: 15/4 · 8/5 : 8/3. Szorzás: 15/4 · 8/5 = (3 · 2)/(1 · 1) = 6. Osztás: 6 : 8/3 = 6 · 3/8 = 18/8 = 9/4 = 2 1/4.',
      steps: [
        { label: '1. Első szorzás', value: '15/4 · 8/5 = 6' },
        { label: '2. Osztás reciprokkal', value: '6 · 3/8 = 18/8 = 9/4' },
        { label: '3. Vegyes tört', value: '9/4 = 2 1/4' }
      ],
      hint: 'Alakítsd áltörtté az összes számot!',
      formula: '6 : \\frac{8}{3} = 6 \\cdot \\frac{3}{8} = \\frac{9}{4} = 2 \\frac{1}{4}'
    },
    {
      id: 'q86',
      level: 3,
      question: 'Mennyi a 12 - [4,5 · 2 - (3,6 : 0,9 - 1)] kifejezés értéke?',
      questionTypeBadge: 'Mester műveleti sorrend',
      options: ['6', '8', '4', '10'],
      correctAnswer: '6',
      explanation: 'Kerek zárójelben: 3,6 : 0,9 = 4, majd 4 - 1 = 3. Szögletesben: 4,5 · 2 = 9, majd 9 - 3 = 6. Végül: 12 - 6 = 6.',
      steps: [
        { label: '1. Kerek zárójel', value: '4 - 1 = 3' },
        { label: '2. Szögletes zárójel', value: '9 - 3 = 6' },
        { label: '3. Kivonás', value: '12 - 6 = 6' }
      ],
      hint: '3,6 : 0,9 = 36 : 9 = 4!',
      formula: '12 - [9 - 3] = 12 - 6 = 6'
    },
    {
      id: 'q87',
      level: 3,
      question: 'Egyszerűsítsd a [2(3a - 4) - 4(a - 2)] : 2 kifejezést!',
      questionTypeBadge: 'Algebrai osztás',
      options: ['a', '2a', 'a - 1', 'a + 1'],
      correctAnswer: 'a',
      explanation: 'Szögletes zárójelben: 6a - 8 - 4a + 8 = 2a. Osztva 2-vel: 2a : 2 = a.',
      steps: [
        { label: '1. Zárójelfelbontás', value: '6a - 8 - 4a + 8 = 2a' },
        { label: '2. Osztás', value: '2a : 2 = a' }
      ],
      hint: '-8 és +8 kiejtik egymást!',
      formula: '\\frac{2a}{2} = a'
    },
    {
      id: 'q88',
      level: 3,
      question: 'Egy túrázó a teljes út 1/3 részét tette meg délelőtt, a megmaradt út 3/4 részét délután. Estére még 4 km gyaloglás maradt hátra. Milyen hosszú volt a teljes túraútvonal?',
      questionTypeBadge: 'Gondolkodtató túra feladat',
      options: ['24 km', '18 km', '36 km', '30 km'],
      correctAnswer: '24 km',
      explanation: 'Délelőtt után maradt 2/3 rész. Délután megtette a 2/3 · 3/4 = 6/12 = 1/2 részt. Összesen megtett 1/3 + 1/2 = 5/6 részt. A megmaradt 1/6 rész felel meg 4 km-nek. A teljes út: 6 · 4 = 24 km.',
      steps: [
        { label: '1. Délutáni szakasz', value: '2/3 · 3/4 = 1/2' },
        { label: '2. Megtett út összesen', value: '1/3 + 1/2 = 5/6' },
        { label: '3. Maradék és teljes út', value: '1/6 \\text{ rész} = 4 \\text{ km} \\implies 24 \\text{ km}' }
      ],
      hint: 'A megmaradt 4 km a teljes út pontosan 1/6 része!',
      formula: 'x \\cdot \\frac{1}{6} = 4 \\implies x = 24\\text{ km}'
    },
    {
      id: 'q89',
      level: 3,
      question: 'Mennyi a 0,75 · 4/3 + 0,25 : 1/4 kifejezés értéke?',
      questionTypeBadge: 'Szimmetrikus vegyes kifejezés',
      options: ['2', '1', '1,5', '2,5'],
      correctAnswer: '2',
      explanation: '0,75 = 3/4, így 3/4 · 4/3 = 1. Második tag: 0,25 = 1/4, így 1/4 : 1/4 = 1. Összeg: 1 + 1 = 2.',
      steps: [
        { label: '1. Első szorzat', value: '3/4 · 4/3 = 1' },
        { label: '2. Második hányados', value: '1/4 : 1/4 = 1' },
        { label: '3. Összeadás', value: '1 + 1 = 2' }
      ],
      hint: 'Mindkét tag pontosan 1-gyel egyenlő!',
      formula: '1 + 1 = 2'
    },
    {
      id: 'q90',
      level: 3,
      question: 'Mennyi a [10 - (2 1/2 · 2 - 1,5 · 2)] : 0,5 kifejezés értéke?',
      questionTypeBadge: 'Záró mesterfeladat',
      options: ['16', '12', '18', '20'],
      correctAnswer: '16',
      explanation: 'Kerek zárójelben: 2 1/2 · 2 = 5/2 · 2 = 5, és 1,5 · 2 = 3. Különbségük: 5 - 3 = 2. Szögletes zárójel: 10 - 2 = 8. Végül: 8 : 0,5 = 16.',
      steps: [
        { label: '1. Kerek zárójel', value: '5 - 3 = 2' },
        { label: '2. Szögletes zárójel', value: '10 - 2 = 8' },
        { label: '3. Osztás', value: '8 : 0,5 = 16' }
      ],
      hint: '8 osztva 0,5-del = 8 · 2 = 16!',
      formula: '[10 - 2] : 0,5 = 8 : 0,5 = 16'
    }
  ];

  const cheatSheetItems: CheatSheetItem[] = [
    {
      topic: 'Törtek szorzása és reciproka',
      formula: '\\frac{a}{b} \\cdot \\frac{c}{d} = \\frac{a \\cdot c}{b \\cdot d} \\qquad \\left(\\frac{a}{b}\\right)^{-1} = \\frac{b}{a}',
      note: 'Számlálót a számlálóval, nevezőt a nevezővel. Szorzás előtt mindig egyszerűsíts keresztbe!'
    },
    {
      topic: 'Törtek osztása',
      formula: '\\frac{a}{b} : \\frac{c}{d} = \\frac{a}{b} \\cdot \\frac{d}{c}',
      note: 'Törttel úgy osztunk, hogy az osztó reciprokával szorzunk.'
    },
    {
      topic: 'Tizedes tört műveletek',
      formula: 'a : 0,b = (a \\cdot 10) : b \\qquad 1,2 \\cdot 0,04 = 0,048',
      note: 'Osztáskor bővítsünk, hogy az osztó egész legyen. Szorzáskor a tizedesjegyek száma összeadódik.'
    },
    {
      topic: 'Műveleti hierarchia és zárójelek',
      formula: '( \\ ) \\longrightarrow [ \\ ] \\longrightarrow \\{ \\} \\qquad \\cdot, : \\longrightarrow +, -',
      note: 'Zárójel előtti mínusz minden belső tag előjelét megfordítja: -(a - b) = -a + b.'
    }
  ];

  const cheatSheetCards: CheatSheetCard[] = [
    {
      id: 'cs1',
      title: 'Törtek Fejezeti Mesterképlete',
      formula: '\\frac{a}{b} \\cdot \\frac{c}{d} = \\frac{ac}{bd} \\quad | \\quad \\frac{a}{b} : \\frac{c}{d} = \\frac{a}{b} \\cdot \\frac{d}{c}',
      note: 'Vegyes törtet mindig alakíts át áltörtté a művelet előtt!'
    },
    {
      id: 'cs2',
      title: 'Tizedes Vesszőmozgatás',
      formula: 'x \\cdot 10^k \\rightarrow \\text{jobbra} \\qquad x : 10^k \\rightarrow \\text{balra}',
      note: 'Annyi hellyel léptetünk, ahány nulla van a 10 hatványában.'
    },
    {
      id: 'cs3',
      title: 'Előjeles Zárójelfelbontás',
      formula: '-(x - y + z) = -x + y - z',
      note: 'A zárójel előtti negatív előjel minden tagnak az ellentettjét veszi.'
    }
  ];

  return (
    <QuizTemplate
      title="II. Törtek és Tizedes Törtek — Fejezeti Összefoglaló Kvíz"
      subtitle="Átfogó 90 feladatos szintfelmérő (30-30-30 feladat 3 szinten): Törtek és tizedesek minden művelete, reciprok, átváltások és mesterfeladatok."
      emoji="🏆"
      badgeText="🏆 6. Osztály • II. Törtek • Összefoglalás"
      grade={6}
      chapterId="g6-fractions"
      topicId="g6-fractions-summary-quiz"
      questions={questions}
      cheatSheet={cheatSheetItems}
      cheatSheetCards={cheatSheetCards}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      matcherComponent={<FractionsSummaryMatcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} />}
      sorterComponent={<FractionsSummarySorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} />}
    />
  );
}

export default FractionsSummaryQuiz;
