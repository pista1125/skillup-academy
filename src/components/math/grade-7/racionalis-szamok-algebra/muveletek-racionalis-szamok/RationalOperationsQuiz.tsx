import React from 'react';
import { QuizTemplate, LevelConfig, CheatSheetCard } from '../QuizTemplate';
import { RationalOperationsMatcher } from './RationalOperationsMatcher';
import { RationalOperationsSorter } from './RationalOperationsSorter';
import {
  Sparkles,
  Layers,
  Scale,
  Calculator,
  Zap,
  LayoutGrid,
  ArrowRightLeft,
  Binary,
  Divide,
  Percent
} from 'lucide-react';

interface RationalOperationsQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    id: 'c1',
    title: 'Összeadás & Kivonás',
    icon: <Scale className="w-4 h-4 text-purple-600" />,
    formula: 'a/c ± b/c = (a ± b)/c',
    note: 'Különböző nevezőknél először közös nevezőre (LKKT) bővítünk! Pl. 1/2 + 1/3 = 3/6 + 2/6 = 5/6.'
  },
  {
    id: 'c2',
    title: 'Szorzás & Egyszerűsítés',
    icon: <Zap className="w-4 h-4 text-amber-600" />,
    formula: '(a/b) · (c/d) = (a · c) / (b · d)',
    note: 'Számlálót a számlálóval, nevezőt a nevezővel. Szorzás előtt mindig egyszerűsíts keresztbe!'
  },
  {
    id: 'c3',
    title: 'A Reciprok fogalma',
    icon: <ArrowRightLeft className="w-4 h-4 text-indigo-600" />,
    formula: 'x · (1/x) = 1,  a/b ⟹ b/a',
    note: 'Két szám szorzata 1. Pl. 3/5 reciproka 5/3, -4 reciproka -1/4. A 0-nak NINCS reciproka!'
  },
  {
    id: 'c4',
    title: 'Osztás törttel',
    icon: <Divide className="w-4 h-4 text-rose-600" />,
    formula: '(a/b) : (c/d) = (a/b) · (d/c)',
    note: 'Törttel úgy osztunk, hogy megszorozzuk az osztó reciprokával! Pl. (2/3) : (4/5) = (2/3) · (5/4) = 5/6.'
  },
  {
    id: 'c5',
    title: 'Előjelszabályok a Q-ban',
    icon: <Binary className="w-4 h-4 text-emerald-600" />,
    formula: '-(a/b) = (-a)/b = a/(-b)',
    note: '(-) · (-) = +,  (-) · (+) = -,  (-) : (-) = +,  (-) : (+) = -. Páros sok negatív szorzata pozitív.'
  },
  {
    id: 'c6',
    title: 'Vegyes számok műveletei',
    icon: <Layers className="w-4 h-4 text-cyan-600" />,
    formula: '2 1/3 = 7/3,  -2 1/3 = -7/3',
    note: 'Szorzás és osztás előtt a vegyes számokat MINDIG alakítsd át áltörtté!'
  }
];

const quizLevels: Record<1 | 2 | 3, LevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Alapműveletek és Reciprok',
    subtitle: 'Azonos nevezőjű összeadás/kivonás, szorzás alapjai és reciprok fogalma',
    range: '1 - 10. feladat',
    focus: 'Alapműveletek & Reciprok',
    badgeBg: 'bg-emerald-50 dark:bg-emerald-950/40',
    badgeBorder: 'border-emerald-200 dark:border-emerald-800',
    badgeText: 'text-emerald-700 dark:text-emerald-300',
    iconBg: 'bg-emerald-600 text-white',
    questions: [
      {
        id: 'q1',
        title: 'Mennyi a 2/7 + 3/7 összeadás eredménye?',
        options: ['5/7', '5/14', '6/7', '1/7'],
        correctAnswer: '5/7',
        hint: 'Azonos nevezőnél a számlálókat összeadjuk, a nevező változatlan marad.',
        explanation: 'A két tört nevezője megegyezik (7), így egyszerűen összeadjuk a számlálókat: 2/7 + 3/7 = (2 + 3)/7 = 5/7.',
        steps: [
          { label: 'Közös nevező', value: '7' },
          { label: 'Számlálók összege', value: '2 + 3 = 5' },
          { label: 'Eredmény', value: '5/7' }
        ]
      },
      {
        id: 'q2',
        title: 'Mennyi a 7/9 - 4/9 kivonás legegyszerűbb eredménye?',
        options: ['1/3', '3/9', '3/0', '11/9'],
        correctAnswer: '1/3',
        hint: '7 - 4 = 3, így 3/9-et kapsz, amit egyszerűsíts 3-mal!',
        explanation: '7/9 - 4/9 = 3/9. A számlálót és nevezőt 3-mal osztva a legegyszerűbb alak 1/3.',
        steps: [
          { label: 'Kivonás', value: '7/9 - 4/9 = 3/9' },
          { label: 'Egyszerűsítés 3-mal', value: '3/9 = 1/3' }
        ]
      },
      {
        id: 'q3',
        title: 'Mennyi az 1/2 + 1/4 összeg értéke?',
        options: ['3/4', '2/6', '2/4', '1/8'],
        correctAnswer: '3/4',
        hint: 'Bővítsd az 1/2 törtet 4-es nevezőre: 1/2 = 2/4.',
        explanation: 'Különböző nevezők esetén közös nevezőre hozunk: 1/2 = 2/4. Így 2/4 + 1/4 = 3/4.',
        steps: [
          { label: 'Bővítés', value: '1/2 = 2/4' },
          { label: 'Összeadás', value: '2/4 + 1/4 = 3/4' }
        ]
      },
      {
        id: 'q4',
        title: 'Mennyi a (2/3) · (4/5) szorzat értéke?',
        options: ['8/15', '6/8', '8/8', '2/5'],
        correctAnswer: '8/15',
        hint: 'Számlálót a számlálóval (2 · 4), nevezőt a nevezővel (3 · 5) szorozzuk.',
        explanation: 'Törtek szorzásakor a számlálók és a nevezők szorzatát képezzük: (2 · 4) / (3 · 5) = 8/15.',
        steps: [
          { label: 'Számlálók szorzata', value: '2 · 4 = 8' },
          { label: 'Nevezők szorzata', value: '3 · 5 = 15' },
          { label: 'Eredmény', value: '8/15' }
        ]
      },
      {
        id: 'q5',
        title: 'Mennyi a 4/7 tört reciproka?',
        options: ['7/4', '-4/7', '-7/4', '1/4'],
        correctAnswer: '7/4',
        hint: 'A tört számlálóját és nevezőjét felcseréljük.',
        explanation: 'Az a/b tört reciproka b/a, mivel (4/7) · (7/4) = 28/28 = 1. Így a 4/7 reciproka a 7/4.',
        steps: [
          { label: 'Számláló és nevező csere', value: '4/7 ⟹ 7/4' },
          { label: 'Ellenőrzés', value: '(4/7) · (7/4) = 1' }
        ]
      },
      {
        id: 'q6',
        title: 'Mennyi az 5 egész szám reciproka?',
        options: ['1/5', '-5', '5/1', '0,5'],
        correctAnswer: '1/5',
        hint: 'Az 5 felírható törtként: 5 = 5/1.',
        explanation: 'Az 5 = 5/1 tört reciproka az 1/5, mert 5 · (1/5) = 1.',
        steps: [
          { label: 'Tört alak', value: '5 = 5/1' },
          { label: 'Reciprok', value: '1/5' }
        ]
      },
      {
        id: 'q7',
        title: 'Hogyan osztunk egy törtet egy másik törttel?',
        options: [
          'Megszorozzuk az osztó reciprokával',
          'Elosztjuk a számlálót a számlálóval és a nevezőt a nevezővel',
          'Összeadjuk a két törtet',
          'Megfordítjuk az osztandót és szorzunk'
        ],
        correctAnswer: 'Megszorozzuk az osztó reciprokával',
        hint: '(a/b) : (c/d) = (a/b) · (d/c).',
        explanation: 'Törttel való osztásnál az osztandó változatlan marad, és megszorozzuk a második tört (az osztó) reciprokával.',
        steps: [
          { label: 'Szabály', value: '(a/b) : (c/d) = (a/b) · (d/c)' }
        ]
      },
      {
        id: 'q8',
        title: 'Mennyi a (3/4) : (3/4) osztás eredménye?',
        options: ['1', '0', '9/16', '3/4'],
        correctAnswer: '1',
        hint: 'Bármely nem nulla számot önmagával elosztva 1-et kapunk.',
        explanation: '(3/4) : (3/4) = (3/4) · (4/3) = 12/12 = 1. Minden nem nulla szám önmagával osztva 1.',
        steps: [
          { label: 'Osztás reciprok szorzással', value: '(3/4) · (4/3) = 12/12 = 1' }
        ]
      },
      {
        id: 'q9',
        title: 'Mennyi a 3 · (2/5) szorzat értéke?',
        options: ['6/5', '6/15', '5/5', '2/15'],
        correctAnswer: '6/5',
        hint: 'Egész számmal való szorzáskor csak a számlálót szorozzuk!',
        explanation: '3 · (2/5) = (3 · 2) / 5 = 6/5 = 1 egész 1/5.',
        steps: [
          { label: 'Számláló szorzása', value: '3 · 2 = 6' },
          { label: 'Nevező marad', value: '5' },
          { label: 'Eredmény', value: '6/5' }
        ]
      },
      {
        id: 'q10',
        title: 'Mennyi az 1 - 3/8 kivonás eredménye?',
        options: ['5/8', '2/8', '3/8', '7/8'],
        correctAnswer: '5/8',
        hint: 'Írd fel az 1 egészet 8/8-ként: 8/8 - 3/8.',
        explanation: '1 egész az 8 nyolcad. Így 8/8 - 3/8 = 5/8.',
        steps: [
          { label: '1 egész nyolcadokban', value: '1 = 8/8' },
          { label: 'Kivonás', value: '8/8 - 3/8 = 5/8' }
        ]
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Különböző Nevezők, Egyszerűsítés és Negatív Törtek',
    subtitle: 'LKKT közös nevező, keresztbe egyszerűsítés, osztás és negatív előjelek',
    range: '11 - 20. feladat',
    focus: 'Gyakorlat & Műveleti Biztonság',
    badgeBg: 'bg-amber-50 dark:bg-amber-950/40',
    badgeBorder: 'border-amber-200 dark:border-amber-800',
    badgeText: 'text-amber-700 dark:text-amber-300',
    iconBg: 'bg-amber-600 text-white',
    questions: [
      {
        id: 'q11',
        title: 'Mennyi a 2/3 + 3/5 összeadás eredménye?',
        options: ['19/15', '5/8', '6/15', '17/15'],
        correctAnswer: '19/15',
        hint: 'Közös nevező: LKKT(3, 5) = 15. Bővíts: 10/15 + 9/15.',
        explanation: '2/3 = 10/15 és 3/5 = 9/15. Összeadva: (10 + 9)/15 = 19/15 = 1 egész 4/15.',
        steps: [
          { label: 'Közös nevező (LKKT)', value: '15' },
          { label: 'Bővítés', value: '2/3 = 10/15,  3/5 = 9/15' },
          { label: 'Összeg', value: '10/15 + 9/15 = 19/15' }
        ]
      },
      {
        id: 'q12',
        title: 'Mennyi az 5/6 - 3/4 kivonás eredménye?',
        options: ['1/12', '2/2', '2/12', '1/6'],
        correctAnswer: '1/12',
        hint: 'Közös nevező: LKKT(6, 4) = 12. Bővíts: 10/12 - 9/12.',
        explanation: '5/6 = 10/12 és 3/4 = 9/12. Kivonva: (10 - 9)/12 = 1/12.',
        steps: [
          { label: 'Közös nevező (LKKT)', value: '12' },
          { label: 'Bővítés', value: '5/6 = 10/12,  3/4 = 9/12' },
          { label: 'Különbség', value: '10/12 - 9/12 = 1/12' }
        ]
      },
      {
        id: 'q13',
        title: 'Mennyi a (4/9) · (3/8) szorzat legegyszerűbb alakja?',
        options: ['1/6', '12/72', '2/3', '1/12'],
        correctAnswer: '1/6',
        hint: 'Egyszerűsíts keresztbe szorzás előtt: 4 és 8 egyszerűsödik 4-gyel, 3 és 9 egyszerűsödik 3-mal.',
        explanation: '(4/9) · (3/8) = (1/3) · (1/2) = 1/6. (Vagy 12/72 = 1/6).',
        steps: [
          { label: 'Keresztbe egyszerűsítés', value: '4 és 8 ⟹ 1 és 2;  3 és 9 ⟹ 1 és 3' },
          { label: 'Egyszerűsített szorzás', value: '(1 · 1) / (3 · 2) = 1/6' }
        ]
      },
      {
        id: 'q14',
        title: 'Mennyi a (2/3) : (4/5) osztás eredménye?',
        options: ['5/6', '8/15', '6/5', '10/12'],
        correctAnswer: '5/6',
        hint: 'Szorozz a reciprokával: (2/3) · (5/4) és egyszerűsíts a 2-vel!',
        explanation: '(2/3) : (4/5) = (2/3) · (5/4) = 10/12 = 5/6.',
        steps: [
          { label: 'Reciprok szorzása', value: '(2/3) · (5/4)' },
          { label: 'Számolás & Egyszerűsítés', value: '10/12 = 5/6' }
        ]
      },
      {
        id: 'q15',
        title: 'Mennyi a -3/4 + 1/2 összeg értéke?',
        options: ['-1/4', '+1/4', '-2/4', '-1/2'],
        correctAnswer: '-1/4',
        hint: '1/2 = 2/4. Számold ki: -3/4 + 2/4 = (-3 + 2)/4.',
        explanation: '-3/4 + 1/2 = -3/4 + 2/4 = (-3 + 2)/4 = -1/4.',
        steps: [
          { label: 'Közös nevező', value: '1/2 = 2/4' },
          { label: 'Számlálók összeadása', value: '-3 + 2 = -1' },
          { label: 'Eredmény', value: '-1/4' }
        ]
      },
      {
        id: 'q16',
        title: 'Mennyi a (-2/5) · (-15/4) szorzat értéke?',
        options: ['+3/2', '-3/2', '+6/20', '+30/20'],
        correctAnswer: '+3/2',
        hint: 'Két negatív szám szorzata POZITÍV! Egyszerűsíts 2-vel és 5-tel.',
        explanation: '(-) · (-) = +. (2/5) · (15/4) = (1/1) · (3/2) = 3/2 = 1 egész 1/2.',
        steps: [
          { label: 'Előjel', value: '(-) · (-) = +' },
          { label: 'Keresztbe egyszerűsítés', value: '2 és 4 ⟹ 1 és 2;  5 és 15 ⟹ 1 és 3' },
          { label: 'Eredmény', value: '+3/2' }
        ]
      },
      {
        id: 'q17',
        title: 'Mennyi a -2/3 negatív szám reciproka?',
        options: ['-3/2', '+3/2', '-2/3', '+2/3'],
        correctAnswer: '-3/2',
        hint: 'A reciprok képzésénél az előjel NEM változik meg, csak a számláló és nevező cserél helyet!',
        explanation: '(-2/3) · (-3/2) = +6/6 = 1. A reciprok előjele mindig megegyezik az eredeti szám előjelével, így -3/2.',
        steps: [
          { label: 'Szabály', value: '-a/b reciproka: -b/a' },
          { label: 'Reciprok', value: '-3/2' }
        ]
      },
      {
        id: 'q18',
        title: 'Mennyi az 1 és 1/2 szorozva 2 és 2/3 értékével?',
        options: ['4', '2 és 2/6', '3', '12/6'],
        correctAnswer: '4',
        hint: 'Alakítsd áltörtté: 1 és 1/2 = 3/2, 2 és 2/3 = 8/3.',
        explanation: '1 és 1/2 = 3/2, 2 és 2/3 = 8/3. (3/2) · (8/3) = (3 · 8)/(2 · 3) = 24/6 = 4.',
        steps: [
          { label: 'Áltörtek', value: '1 és 1/2 = 3/2,  2 és 2/3 = 8/3' },
          { label: 'Szorzás', value: '(3/2) · (8/3) = 24/6 = 4' }
        ]
      },
      {
        id: 'q19',
        title: 'Mennyi a (6/7) : 3 osztás eredménye?',
        options: ['2/7', '18/7', '2/21', '6/21'],
        correctAnswer: '2/7',
        hint: 'A 3 reciproka 1/3: (6/7) · (1/3). Vagy a számlálót oszd 3-mal: 6 : 3 = 2.',
        explanation: '(6/7) : 3 = (6/7) · (1/3) = 6/21 = 2/7 (vagy mivel a számláló osztható 3-mal: (6 : 3)/7 = 2/7).',
        steps: [
          { label: 'Osztás', value: '(6/7) · (1/3) = 2/7' }
        ]
      },
      {
        id: 'q20',
        title: 'Mennyi az (1/2 + 1/3) · 6 kifejezés pontos értéke?',
        options: ['5', '6', '2 és 1/2', '4'],
        correctAnswer: '5',
        hint: 'Zárójelben: 1/2 + 1/3 = 3/6 + 2/6 = 5/6. Ezt szorozd meg 6-tal!',
        explanation: '1/2 + 1/3 = 3/6 + 2/6 = 5/6. Ezután: (5/6) · 6 = 5. (Vagy zárójelfelbontással: 1/2 · 6 + 1/3 · 6 = 3 + 2 = 5).',
        steps: [
          { label: 'Zárójel kiszámítása', value: '1/2 + 1/3 = 5/6' },
          { label: 'Szorzás 6-tal', value: '(5/6) · 6 = 5' }
        ]
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Összetett Racionális Feladatok és Mesterfok',
    subtitle: 'Emeletes törtek, műveleti sorrend, ismeretlen meghatározása és hatványozás',
    range: '21 - 30. feladat',
    focus: 'Mesterfok & Logika',
    badgeBg: 'bg-purple-50 dark:bg-purple-950/40',
    badgeBorder: 'border-purple-200 dark:border-purple-800',
    badgeText: 'text-purple-700 dark:text-purple-300',
    iconBg: 'bg-purple-600 text-white',
    questions: [
      {
        id: 'q21',
        title: 'Mennyi az 1/2 + 2/3 - 3/4 műveletsor eredménye?',
        options: ['5/12', '7/12', '1/12', '11/12'],
        correctAnswer: '5/12',
        hint: 'Közös nevező a 12: 6/12 + 8/12 - 9/12.',
        explanation: 'LKKT(2, 3, 4) = 12. 1/2 = 6/12, 2/3 = 8/12, 3/4 = 9/12. Művelet: (6 + 8 - 9)/12 = 5/12.',
        steps: [
          { label: 'Közös nevező (LKKT)', value: '12' },
          { label: 'Bővítés', value: '6/12 + 8/12 - 9/12' },
          { label: 'Számolás', value: '(6 + 8 - 9)/12 = 5/12' }
        ]
      },
      {
        id: 'q22',
        title: 'Mennyi az alábbi emeletes tört értéke: (2/3 + 1/6) / (3/4 - 1/2) ?',
        options: ['10/3 (azaz 3 és 1/3)', '5/6', '1/4', '20/3'],
        correctAnswer: '10/3 (azaz 3 és 1/3)',
        hint: 'Számold ki külön a számlálót (2/3 + 1/6 = 5/6) és a nevezőt (3/4 - 1/2 = 1/4), majd oszd el őket!',
        explanation: 'Számláló: 4/6 + 1/6 = 5/6. Nevező: 3/4 - 2/4 = 1/4. Osztás: (5/6) : (1/4) = (5/6) · (4/1) = 20/6 = 10/3 = 3 egész 1/3.',
        steps: [
          { label: 'Számláló', value: '4/6 + 1/6 = 5/6' },
          { label: 'Nevező', value: '3/4 - 2/4 = 1/4' },
          { label: 'Hányados', value: '(5/6) : (1/4) = (5/6) · 4 = 10/3' }
        ]
      },
      {
        id: 'q23',
        title: 'Mennyi a (-2/3)³ hatvány értéke?',
        options: ['-8/27', '+8/27', '-6/9', '+6/9'],
        correctAnswer: '-8/27',
        hint: 'Páratlan kitevő esetén a negatív előjel megmarad: (-2)³ / 3³.',
        explanation: '(-2/3)³ = (-2/3) · (-2/3) · (-2/3) = - (2 · 2 · 2) / (3 · 3 · 3) = -8/27.',
        steps: [
          { label: 'Előjel (páratlan kitevő)', value: '(-1)³ = -1' },
          { label: 'Hatványozás', value: '2³ / 3³ = 8/27' },
          { label: 'Eredmény', value: '-8/27' }
        ]
      },
      {
        id: 'q24',
        title: 'Határozd meg x értékét, ha (3/5) · x = 9/20 !',
        options: ['3/4', '4/3', '27/100', '1/4'],
        correctAnswer: '3/4',
        hint: 'x kiszámításához oszd el a szorzatot az ismert tényezővel: (9/20) : (3/5).',
        explanation: 'x = (9/20) : (3/5) = (9/20) · (5/3) = (9 · 5) / (20 · 3) = (3 · 1) / (4 · 1) = 3/4.',
        steps: [
          { label: 'Egyenlet átrendezése', value: 'x = (9/20) : (3/5)' },
          { label: 'Reciprok szorzás & egyszerűsítés', value: '(9/20) · (5/3) = 3/4' }
        ]
      },
      {
        id: 'q25',
        title: 'Mennyi a (-2 és 1/4) : (1 és 1/2) osztás eredménye?',
        options: ['-3/2', '+3/2', '-9/8', '-3/4'],
        correctAnswer: '-3/2',
        hint: 'Áltörtek: -9/4 és 3/2. (-9/4) : (3/2) = (-9/4) · (2/3).',
        explanation: '-2 és 1/4 = -9/4,  1 és 1/2 = 3/2. (-9/4) · (2/3) = -18/12 = -3/2 = -1 egész 1/2.',
        steps: [
          { label: 'Áltört alakok', value: '-9/4 és 3/2' },
          { label: 'Szorzás reciprokkal', value: '(-9/4) · (2/3) = -3/2' }
        ]
      },
      {
        id: 'q26',
        title: 'Mennyi a 2 - (3/4) · (8/9) kifejezés pontos értéke?',
        options: ['4/3 (azaz 1 és 1/3)', '2/3', '1/3', '5/3'],
        correctAnswer: '4/3 (azaz 1 és 1/3)',
        hint: 'A műveleti sorrend szerint először a szorzást kell elvégezni: (3/4) · (8/9) = 2/3.',
        explanation: 'Szorzás: (3/4) · (8/9) = (1/1) · (2/3) = 2/3. Kivonás: 2 - 2/3 = 6/3 - 2/3 = 4/3 = 1 egész 1/3.',
        steps: [
          { label: 'Szorzás', value: '(3/4) · (8/9) = 2/3' },
          { label: 'Kivonás 2-ből', value: '2 - 2/3 = 6/3 - 2/3 = 4/3' }
        ]
      },
      {
        id: 'q27',
        title: 'Mennyi a 2/3 és a 3/2 számok reciprokainak az összege?',
        options: ['13/6 (azaz 2 és 1/6)', '1', '5/6', '25/6'],
        correctAnswer: '13/6 (azaz 2 és 1/6)',
        hint: '2/3 reciproka 3/2, a 3/2 reciproka 2/3. Számold ki: 3/2 + 2/3.',
        explanation: 'A reciprok értékek: 3/2 és 2/3. Összegük: 3/2 + 2/3 = 9/6 + 4/6 = 13/6 = 2 egész 1/6.',
        steps: [
          { label: 'Reciprokok', value: '3/2 és 2/3' },
          { label: 'Összeg közös nevezővel', value: '9/6 + 4/6 = 13/6' }
        ]
      },
      {
        id: 'q28',
        title: 'Melyik az az ismeretlen szám, amelynek a 3/4 részének a 2/3 része pontosan 10?',
        options: ['20', '15', '30', '25'],
        correctAnswer: '20',
        hint: '(3/4) · (2/3) = 6/12 = 1/2. Tehát a szám fele (1/2 része) 10.',
        explanation: '(3/4) · (2/3) = 1/2. Tehát a keresett szám felére (1/2 részére) 10-et kapunk, így az egész szám: 10 : (1/2) = 10 · 2 = 20.',
        steps: [
          { label: 'Törtrészek szorzata', value: '(3/4) · (2/3) = 1/2' },
          { label: 'Egész szám kiszámítása', value: '10 : (1/2) = 20' }
        ]
      },
      {
        id: 'q29',
        title: 'Mennyi a (-1/2) · (-2/3) · (-3/4) · (-4/5) szorzatsorozat értéke?',
        options: ['+1/5', '-1/5', '+1/120', '-1/120'],
        correctAnswer: '+1/5',
        hint: '4 negatív tényező van, így az előjel POZITÍV (+). Keresztben a 2, 3, 4 egyszerűsödik!',
        explanation: 'Mivel 4 (páros sok) negatív tényező van, a szorzat pozitív. A számlálók és nevezők láncszerűen egyszerűsödnek: (1·2·3·4)/(2·3·4·5) = 1/5.',
        steps: [
          { label: 'Előjel', value: '4 negatív tényező ⟹ +' },
          { label: 'Lánc-egyszerűsítés', value: '(1 · 2 · 3 · 4) / (2 · 3 · 4 · 5) = 1/5' }
        ]
      },
      {
        id: 'q30',
        title: 'Ha a = 1/2 és b = -1/3, mennyi az (a - b) / (a + b) kifejezés értéke?',
        options: ['5', '1/5', '-5', '2/3'],
        correctAnswer: '5',
        hint: 'Számláló: 1/2 - (-1/3) = 1/2 + 1/3 = 5/6. Nevező: 1/2 + (-1/3) = 1/2 - 1/3 = 1/6.',
        explanation: 'Számláló: 1/2 - (-1/3) = 3/6 + 2/6 = 5/6. Nevező: 1/2 + (-1/3) = 3/6 - 2/6 = 1/6. Hányados: (5/6) : (1/6) = (5/6) · (6/1) = 5.',
        steps: [
          { label: 'Számláló', value: '1/2 - (-1/3) = 5/6' },
          { label: 'Nevező', value: '1/2 + (-1/3) = 1/6' },
          { label: 'Hányados', value: '(5/6) : (1/6) = 5' }
        ]
      }
    ]
  }
};

export const RationalOperationsQuiz: React.FC<RationalOperationsQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      onBack={onBack}
      emoji="🔢"
      topicBadge="7. Osztály • Matematika II. Témakör"
      badgeText="7. Osztály • Matematika II. Témakör"
      title="3. Műveletek a racionális számok halmazán Kvíz"
      cheatSheetTitle="Racionális Műveletek Szabálytár"
      cheatSheetCards={cheatSheetCards}
      levels={quizLevels}
      themeColor="purple"
      hintText="💡 Törttel való osztásnál szorozz az osztó reciprokával, szorzás előtt pedig egyszerűsíts keresztbe!"
      customGameModes={[
        {
          id: 'matcher',
          title: 'Kártyás Párosító',
          subtitle: 'Párosítsd a műveleteket az eredményekkel!',
          badgeText: '8 Pár szintenként',
          icon: <ArrowRightLeft className="w-4 h-4 text-purple-500" />,
          render: ({ level, onNextLevel, onOpenRules }) => (
            <RationalOperationsMatcher
              level={level}
              onNextLevel={onNextLevel}
              onOpenRules={onOpenRules}
            />
          )
        },
        {
          id: 'sorter',
          title: 'Csoportosító',
          subtitle: 'Kategorizáld a kifejezéseket az eredményük szerint!',
          badgeText: '10 Elem szintenként',
          icon: <LayoutGrid className="w-4 h-4 text-indigo-500" />,
          render: ({ level, onNextLevel, onOpenRules }) => (
            <RationalOperationsSorter
              level={level}
              onNextLevel={onNextLevel}
              onOpenRules={onOpenRules}
            />
          )
        }
      ]}
    />
  );
};
