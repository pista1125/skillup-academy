import React from 'react';
import { QuizTemplate, LevelConfig, CheatSheetCard } from '../QuizTemplate';
import { RationalSummaryMatcher } from './RationalSummaryMatcher';
import { RationalSummarySorter } from './RationalSummarySorter';
import {
  Trophy,
  Layers,
  CheckCircle2,
  AlertTriangle,
  Calculator,
  ArrowRightLeft,
  Sparkles,
  Zap,
  Hash,
  Divide,
  Scale
} from 'lucide-react';

interface RationalSummaryQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

const cheatSheetCards: CheatSheetCard[] = [
  {
    id: 'c1',
    title: 'Racionális számok műveletei',
    icon: <Calculator className="w-4 h-4 text-rose-600" />,
    formula: '(a/b) : (c/d) = (a/b) · (d/c)',
    note: 'Összeadásnál közös nevező, szorzásnál számláló·számláló, osztásnál szorzás a reciprokkal.'
  },
  {
    id: 'c2',
    title: 'Műveleti sorrend (KÖSZO)',
    icon: <Layers className="w-4 h-4 text-purple-600" />,
    formula: '1. Zárójel ⟹ 2. Hatvány ⟹ 3. Szorzás/Osztás ⟹ 4. Összeadás/Kivonás',
    note: 'Azonos rendű műveleteket balról jobbra a felbukkanás sorrendjében végzünk.'
  },
  {
    id: 'c3',
    title: 'Előjelszabályok és zárójelek',
    icon: <AlertTriangle className="w-4 h-4 text-amber-600" />,
    formula: '-(a - b) = -a + b,  -c(a - b) = -ca + cb',
    note: 'Negatív szorzó vagy mínuszjel esetén minden zárójelen belüli előjel megfordul!'
  },
  {
    id: 'c4',
    title: 'Egynemű tagok összevonása',
    icon: <Hash className="w-4 h-4 text-indigo-600" />,
    formula: 'ax + bx = (a + b)x',
    note: 'Csak az azonos betűk és azonos kitevők vonhatók össze. A 2x és 3x² nem vonható össze!'
  },
  {
    id: 'c5',
    title: 'Helyettesítési érték & Hatvány',
    icon: <CheckCircle2 className="w-4 h-4 text-emerald-600" />,
    formula: '(-3)² = +9, de -3² = -9',
    note: 'Negatív számot behelyettesítéskor mindig zárójelben emelünk négyzetre.'
  },
  {
    id: 'c6',
    title: 'Kiemelés & Faktorizálás',
    icon: <ArrowRightLeft className="w-4 h-4 text-cyan-600" />,
    formula: 'ab + ac = a(b + c),  5x + 5 = 5(x + 1)',
    note: 'A legnagyobb közös osztót kiemeljük, és a teljes tag helyén kötelezően 1-es marad.'
  }
];

const quizLevels: Record<1 | 2 | 3, LevelConfig> = {
  1: {
    level: 1,
    title: '1. Szint: Racionális Számok & Alapműveletek',
    subtitle: 'Törtek, tizedestörtek, ellentett, reciprok, előjelek és alapvető műveletek (30 feladat)',
    range: '1 - 30. feladat',
    focus: 'Racionális Számok & Alapműveletek',
    badgeBg: 'bg-rose-50 dark:bg-rose-950/40',
    badgeBorder: 'border-rose-200 dark:border-rose-800',
    badgeText: 'text-rose-700 dark:text-rose-300',
    iconBg: 'bg-rose-600 text-white',
    questions: [
      {
        id: 'q1-1',
        prompt: 'Mennyi a -3/4 szám ellentettje?',
        question: 'Mennyi a -3/4 szám ellentettje?',
        options: ['+3/4', '-4/3', '+4/3', '-3/4'],
        correctAnswer: '+3/4',
        explanation: 'Egy szám ellentettje az azonos abszolút értékű, de ellenkező előjelű szám: -(-3/4) = +3/4.',
        breakdown: [{ label: 'Eredeti', value: '-3/4' }, { label: 'Ellentett', value: '+3/4' }]
      },
      {
        id: 'q1-2',
        prompt: 'Mennyi a -2/5 szám reciproka?',
        question: 'Mennyi a -2/5 szám reciproka?',
        options: ['-5/2', '+5/2', '+2/5', '-2/5'],
        correctAnswer: '-5/2',
        explanation: 'A reciprok a számláló és nevező felcserélése, az előjel változatlan marad: -5/2.',
        breakdown: [{ label: 'Eredeti', value: '-2/5' }, { label: 'Reciprok', value: '-5/2' }]
      },
      {
        id: 'q1-3',
        prompt: 'Mennyi a |-8.4| abszolút érték?',
        question: 'Mennyi a |-8.4| abszolút érték?',
        options: ['8.4', '-8.4', '0', '1/8.4'],
        correctAnswer: '8.4',
        explanation: 'Bármely nem nulla szám abszolút értéke (a nullától való távolsága) pozitív szám: 8.4.',
        breakdown: [{ label: 'Abszolút érték', value: '|-8.4| = 8.4' }]
      },
      {
        id: 'q1-4',
        prompt: 'Mennyi az 1/3 + 1/6 művelet eredménye legegyszerűbb alakban?',
        question: 'Mennyi az 1/3 + 1/6 művelet eredménye legegyszerűbb alakban?',
        options: ['1/2', '2/9', '2/6', '3/6'],
        correctAnswer: '1/2',
        explanation: 'Közös nevező 6: 2/6 + 1/6 = 3/6 = 1/2.',
        breakdown: [{ label: 'Bővítés', value: '2/6 + 1/6 = 3/6' }, { label: 'Egyszerűsítve', value: '1/2' }]
      },
      {
        id: 'q1-5',
        prompt: 'Mennyi a 3/4 - 1/2 eredménye?',
        question: 'Mennyi a 3/4 - 1/2 eredménye?',
        options: ['1/4', '2/2 = 1', '1/2', '2/4'],
        correctAnswer: '1/4',
        explanation: '3/4 - 2/4 = 1/4.',
        breakdown: [{ label: 'Közös nevező', value: '3/4 - 2/4 = 1/4' }]
      },
      {
        id: 'q1-6',
        prompt: 'Mennyi a (-3) · (-7) szorzat értéke?',
        question: 'Mennyi a (-3) · (-7) szorzat értéke?',
        options: ['+21', '-21', '-10', '+10'],
        correctAnswer: '+21',
        explanation: 'Két negatív szám szorzata mindig pozitív: (-3) · (-7) = +21.',
        breakdown: [{ label: 'Előjel', value: '(-) · (-) = (+)' }, { label: 'Érték', value: '3 · 7 = 21' }]
      },
      {
        id: 'q1-7',
        prompt: 'Mennyi a (-24) : 6 hányados értéke?',
        question: 'Mennyi a (-24) : 6 hányados értéke?',
        options: ['-4', '+4', '-18', '-30'],
        correctAnswer: '-4',
        explanation: 'Eltérő előjelű számok osztásakor az eredmény negatív: -24 : 6 = -4.',
        breakdown: [{ label: 'Számolás', value: '-24 : 6 = -4' }]
      },
      {
        id: 'q1-8',
        prompt: 'Mennyi a 2/3 · 3/4 szorzat legegyszerűbb alakja?',
        question: 'Mennyi a 2/3 · 3/4 szorzat legegyszerűbb alakja?',
        options: ['1/2', '6/12', '5/7', '8/9'],
        correctAnswer: '1/2',
        explanation: 'A 3-asokkal és a 2-essel egyszerűsítve: (2 · 3) / (3 · 4) = 6/12 = 1/2.',
        breakdown: [{ label: 'Szorzás', value: '6/12' }, { label: 'Egyszerűsítés', value: '1/2' }]
      },
      {
        id: 'q1-9',
        prompt: 'Mennyi a (3/5) : (2/5) osztás eredménye?',
        question: 'Mennyi a (3/5) : (2/5) osztás eredménye?',
        options: ['3/2', '6/25', '1', '2/3'],
        correctAnswer: '3/2',
        explanation: '(3/5) · (5/2) = 15/10 = 3/2 = 1.5.',
        breakdown: [{ label: 'Reciprokkal szorzás', value: '3/5 · 5/2 = 3/2' }]
      },
      {
        id: 'q1-10',
        prompt: 'Mennyi 200 Ft 3/4 része?',
        question: 'Mennyi 200 Ft 3/4 része?',
        options: ['150 Ft', '100 Ft', '50 Ft', '175 Ft'],
        correctAnswer: '150 Ft',
        explanation: '200 · 3/4 = (200 : 4) · 3 = 50 · 3 = 150 Ft.',
        breakdown: [{ label: 'Számolás', value: '200 · 3/4 = 150 Ft' }]
      },
      {
        id: 'q1-11',
        prompt: 'Ha egy szám 2/3 része 60, mennyi a teljes szám?',
        question: 'Ha egy szám 2/3 része 60, mennyi a teljes szám?',
        options: ['90', '40', '120', '180'],
        correctAnswer: '90',
        explanation: '60 : (2/3) = 60 · (3/2) = 30 · 3 = 90.',
        breakdown: [{ label: 'Visszaszámolás', value: '60 · 3/2 = 90' }]
      },
      {
        id: 'q1-12',
        prompt: 'Melyik szám nagyobb: -3/4 vagy -1/2?',
        question: 'Melyik szám nagyobb: -3/4 vagy -1/2?',
        options: ['-1/2', '-3/4', 'Egyenlőek', 'Nem összehasonlíthatók'],
        correctAnswer: '-1/2',
        explanation: '-1/2 = -0.5, míg -3/4 = -0.75. A számegyenesen a -0.5 jobbra van, tehát nagyobb.',
        breakdown: [{ label: 'Tizedestört alak', value: '-0.5 > -0.75' }]
      },
      {
        id: 'q1-13',
        prompt: 'Mennyi a (-5) + (-8) összeadás eredménye?',
        question: 'Mennyi a (-5) + (-8) összeadás eredménye?',
        options: ['-13', '+13', '-3', '+3'],
        correctAnswer: '-13',
        explanation: 'Két negatív szám összege negatív: -5 - 8 = -13.',
        breakdown: [{ label: 'Összeg', value: '-5 - 8 = -13' }]
      },
      {
        id: 'q1-14',
        prompt: 'Mennyi a 7 - (-4) kivonás értéke?',
        question: 'Mennyi a 7 - (-4) kivonás értéke?',
        options: ['11', '3', '-11', '-3'],
        correctAnswer: '11',
        explanation: 'A negatív szám kivonása az ellentettjének hozzáadásával egyenlő: 7 + 4 = 11.',
        breakdown: [{ label: 'Átalakítás', value: '7 + 4 = 11' }]
      },
      {
        id: 'q1-15',
        prompt: 'Mennyi a 0.25 közönséges tört alakban legegyszerűbben?',
        question: 'Mennyi a 0.25 közönséges tört alakban legegyszerűbben?',
        options: ['1/4', '25/10', '1/5', '2/5'],
        correctAnswer: '1/4',
        explanation: '25/100 = 1/4.',
        breakdown: [{ label: 'Tört alak', value: '25/100 = 1/4' }]
      },
      {
        id: 'q1-16',
        prompt: 'Mennyi a 3/5 tizedestört alakja?',
        question: 'Mennyi a 3/5 tizedestört alakja?',
        options: ['0.6', '0.35', '0.53', '0.3'],
        correctAnswer: '0.6',
        explanation: '3/5 = 6/10 = 0.6.',
        breakdown: [{ label: 'Bővítés 10-re', value: '6/10 = 0.6' }]
      },
      {
        id: 'q1-17',
        prompt: 'Mennyi a (-2)³ hatvány értéke?',
        question: 'Mennyi a (-2)³ hatvány értéke?',
        options: ['-8', '+8', '-6', '+6'],
        correctAnswer: '-8',
        explanation: '(-2) · (-2) · (-2) = 4 · (-2) = -8 (páratlan kitevő esetén negatív).',
        breakdown: [{ label: 'Szorzás', value: '(-2) · (-2) · (-2) = -8' }]
      },
      {
        id: 'q1-18',
        prompt: 'Mennyi a (-3)² hatvány értéke?',
        question: 'Mennyi a (-3)² hatvány értéke?',
        options: ['+9', '-9', '+6', '-6'],
        correctAnswer: '+9',
        explanation: '(-3) · (-3) = +9 (páros kitevő esetén mindig pozitív).',
        breakdown: [{ label: 'Szorzás', value: '(-3) · (-3) = +9' }]
      },
      {
        id: 'q1-19',
        prompt: 'Mennyi a -3² értéke (zárójel nélkül)?',
        question: 'Mennyi a -3² értéke (zárójel nélkül)?',
        options: ['-9', '+9', '-6', '+6'],
        correctAnswer: '-9',
        explanation: 'A négyzetre emelés csak a 3-ra vonatkozik: -(3 · 3) = -9.',
        breakdown: [{ label: 'Hierarchia', value: '-(3²) = -9' }]
      },
      {
        id: 'q1-20',
        prompt: 'Mennyi a 0 reciproka?',
        question: 'Mennyi a 0 reciproka?',
        options: ['Nincs értelmezve (nem létezik)', '0', '1', 'Végtelen'],
        correctAnswer: 'Nincs értelmezve (nem létezik)',
        explanation: '0-val nem lehet osztani (1/0 nincs értelmezve), ezért a 0 az egyetlen szám, aminek nincs reciproka.',
        breakdown: [{ label: 'Szabály', value: '0-nak nincs reciproka' }]
      },
      {
        id: 'q1-21',
        prompt: 'Mennyi az 1 és a -1 szorzata?',
        question: 'Mennyi az 1 és a -1 szorzata?',
        options: ['-1', '+1', '0', '-2'],
        correctAnswer: '-1',
        explanation: '1 · (-1) = -1.',
        breakdown: [{ label: 'Számolás', value: '1 · (-1) = -1' }]
      },
      {
        id: 'q1-22',
        prompt: 'Mennyi a -12 és -15 összege?',
        question: 'Mennyi a -12 és -15 összege?',
        options: ['-27', '+27', '-3', '+3'],
        correctAnswer: '-27',
        explanation: '-12 + (-15) = -27.',
        breakdown: [{ label: 'Összeg', value: '-12 - 15 = -27' }]
      },
      {
        id: 'q1-23',
        prompt: 'Mennyi a 4/7 és 3/7 összege?',
        question: 'Mennyi a 4/7 és 3/7 összege?',
        options: ['1', '7/14', '12/49', '1/7'],
        correctAnswer: '1',
        explanation: '4/7 + 3/7 = 7/7 = 1.',
        breakdown: [{ label: 'Összeg', value: '7/7 = 1' }]
      },
      {
        id: 'q1-24',
        prompt: 'Mennyi az 5 : (1/2) művelet eredménye?',
        question: 'Mennyi az 5 : (1/2) művelet eredménye?',
        options: ['10', '2.5', '5/2', '1'],
        correctAnswer: '10',
        explanation: '5 · (2/1) = 10.',
        breakdown: [{ label: 'Reciprokkal szorzás', value: '5 · 2 = 10' }]
      },
      {
        id: 'q1-25',
        prompt: 'Hány racionális szám található a 0 és az 1 között a számegyenesen?',
        question: 'Hány racionális szám található a 0 és az 1 között a számegyenesen?',
        options: ['Végtelen sok', 'Pontosan 10', 'Pontosan 100', 'Csak az 1/2'],
        correctAnswer: 'Végtelen sok',
        explanation: 'A racionális számok halmaza sűrű: bármely két szám között végtelen sok racionális szám található.',
        breakdown: [{ label: 'Tulajdonság', value: 'Sűrűség (végtelen sok tört)' }]
      },
      {
        id: 'q1-26',
        prompt: 'Mennyi a -0.75 és 0.25 összege?',
        question: 'Mennyi a -0.75 és 0.25 összege?',
        options: ['-0.5', '+0.5', '-1.0', '-0.25'],
        correctAnswer: '-0.5',
        explanation: '-0.75 + 0.25 = -0.50 = -0.5.',
        breakdown: [{ label: 'Összeadás', value: '-0.75 + 0.25 = -0.5' }]
      },
      {
        id: 'q1-27',
        prompt: 'Milyen előjelű 5 darab negatív szám szorzata?',
        question: 'Milyen előjelű 5 darab negatív szám szorzata?',
        options: ['Negatív', 'Pozitív', 'Nulla', 'Attól függ'],
        correctAnswer: 'Negatív',
        explanation: 'Páratlan számú (5 db) negatív tényező szorzata mindig negatív.',
        breakdown: [{ label: 'Szabály', value: 'Páratlan negatív tényező ⟹ negatív' }]
      },
      {
        id: 'q1-28',
        prompt: 'Milyen előjelű 4 darab negatív szám szorzata?',
        question: 'Milyen előjelű 4 darab negatív szám szorzata?',
        options: ['Pozitív', 'Negatív', 'Nulla', 'Nem meghatározható'],
        correctAnswer: 'Pozitív',
        explanation: 'Páros számú (4 db) negatív tényező szorzata mindig pozitív.',
        breakdown: [{ label: 'Szabály', value: 'Páros negatív tényező ⟹ pozitív' }]
      },
      {
        id: 'q1-29',
        prompt: 'Mennyi a (-1)¹⁰⁰ értéke?',
        question: 'Mennyi a (-1)¹⁰⁰ értéke?',
        options: ['+1', '-1', '100', '-100'],
        correctAnswer: '+1',
        explanation: 'A 100 páros kitevő, ezért (-1)¹⁰⁰ = +1.',
        breakdown: [{ label: 'Páros kitevő', value: '(-1)¹⁰⁰ = +1' }]
      },
      {
        id: 'q1-30',
        prompt: 'Mennyi a (-1)⁹⁹ értéke?',
        question: 'Mennyi a (-1)⁹⁹ értéke?',
        options: ['-1', '+1', '-99', '99'],
        correctAnswer: '-1',
        explanation: 'A 99 páratlan kitevő, ezért (-1)⁹⁹ = -1.',
        breakdown: [{ label: 'Páratlan kitevő', value: '(-1)⁹⁹ = -1' }]
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Szint: Zárójelek, Törtek & Algebranyelv',
    subtitle: 'Műveleti hierarchia, összetett zárójelek, kifejezések szöveges átírása és betűs felírás (30 feladat)',
    range: '31 - 60. feladat',
    focus: 'Zárójelek, Törtek & Algebranyelv',
    badgeBg: 'bg-purple-50 dark:bg-purple-950/40',
    badgeBorder: 'border-purple-200 dark:border-purple-800',
    badgeText: 'text-purple-700 dark:text-purple-300',
    iconBg: 'bg-purple-600 text-white',
    questions: [
      {
        id: 'q2-1',
        prompt: 'Mennyi a 10 - 2 · 3 kifejezés értéke?',
        question: 'Mennyi a 10 - 2 · 3 kifejezés értéke?',
        options: ['4', '24', '16', '-4'],
        correctAnswer: '4',
        explanation: 'Szorzás előbb: 2 · 3 = 6, majd 10 - 6 = 4.',
        breakdown: [{ label: '1. lépés', value: '2 · 3 = 6' }, { label: '2. lépés', value: '10 - 6 = 4' }]
      },
      {
        id: 'q2-2',
        prompt: 'Mennyi a (10 - 2) · 3 kifejezés értéke?',
        question: 'Mennyi a (10 - 2) · 3 kifejezés értéke?',
        options: ['24', '4', '16', '30'],
        correctAnswer: '24',
        explanation: 'Zárójel előbb: 10 - 2 = 8, majd 8 · 3 = 24.',
        breakdown: [{ label: 'Zárójel', value: '8 · 3 = 24' }]
      },
      {
        id: 'q2-3',
        prompt: 'Mennyi a 15 - 3 · (4 - 7) kifejezés értéke?',
        question: 'Mennyi a 15 - 3 · (4 - 7) kifejezés értéke?',
        options: ['24', '6', '-24', '12'],
        correctAnswer: '24',
        explanation: 'Zárójel: 4 - 7 = -3. Szorzás: 3 · (-3) = -9. Kivonás: 15 - (-9) = 15 + 9 = 24.',
        breakdown: [{ label: 'Zárójel', value: '4 - 7 = -3' }, { label: 'Szorzás', value: '-3 · (-3) = +9' }, { label: 'Összeg', value: '15 + 9 = 24' }]
      },
      {
        id: 'q2-4',
        prompt: 'Mennyi a 20 - [4 + 2 · (8 - 5)] kifejezés értéke?',
        question: 'Mennyi a 20 - [4 + 2 · (8 - 5)] kifejezés értéke?',
        options: ['10', '14', '8', '2'],
        correctAnswer: '10',
        explanation: 'Kerek zárójel: 8 - 5 = 3. Szögletes: 4 + 2 · 3 = 4 + 6 = 10. Kivonás: 20 - 10 = 10.',
        breakdown: [{ label: 'Belső zárójel', value: '3' }, { label: 'Szögletes', value: '4 + 6 = 10' }, { label: 'Végeredmény', value: '20 - 10 = 10' }]
      },
      {
        id: 'q2-5',
        prompt: 'Mennyi a (18 - 6) / (2 + 4) tört értéke?',
        question: 'Mennyi a (18 - 6) / (2 + 4) tört értéke?',
        options: ['2', '12', '3', '6'],
        correctAnswer: '2',
        explanation: 'Számláló: 18 - 6 = 12. Nevező: 2 + 4 = 6. Osztás: 12 / 6 = 2.',
        breakdown: [{ label: 'Számláló', value: '12' }, { label: 'Nevező', value: '6' }, { label: 'Hányados', value: '2' }]
      },
      {
        id: 'q2-6',
        prompt: 'Hogyan írjuk fel: „egy szám 4-szeresénél 7-tel több” (ha a szám x)?',
        question: 'Hogyan írjuk fel: „egy szám 4-szeresénél 7-tel több” (ha a szám x)?',
        options: ['4x + 7', '4(x + 7)', '7x + 4', '4x - 7'],
        correctAnswer: '4x + 7',
        explanation: 'A szám 4-szerese: 4x, ehhez adunk 7-et ⟹ 4x + 7.',
        breakdown: [{ label: 'Szorzás', value: '4x' }, { label: 'Összeg', value: '4x + 7' }]
      },
      {
        id: 'q2-7',
        prompt: 'Hogyan írjuk fel: „egy szám 7-tel növelt értékének a négyszerese” (ha a szám x)?',
        question: 'Hogyan írjuk fel: „egy szám 7-tel növelt értékének a négyszerese” (ha a szám x)?',
        options: ['4(x + 7)', '4x + 7', '4x + 28', 'x + 28'],
        correctAnswer: '4(x + 7)',
        explanation: 'Először a növelés (x + 7), majd ezt szorozzuk 4-gyel: 4(x + 7).',
        breakdown: [{ label: 'Összeg', value: '(x + 7)' }, { label: '4-szerese', value: '4(x + 7)' }]
      },
      {
        id: 'q2-8',
        prompt: 'Hogyan írjuk fel: „két szám összegének négyzete”?',
        question: 'Hogyan írjuk fel: „két szám összegének négyzete”?',
        options: ['(a + b)²', 'a² + b²', '2(a + b)', 'a²b²'],
        correctAnswer: '(a + b)²',
        explanation: 'Az egész összeget emeljük négyzetre: (a + b)².',
        breakdown: [{ label: 'Kifejezés', value: '(a + b)²' }]
      },
      {
        id: 'q2-9',
        prompt: 'Hogyan írjuk fel: „két szám négyzetének összege”?',
        question: 'Hogyan írjuk fel: „két szám négyzetének összege”?',
        options: ['a² + b²', '(a + b)²', '2a + 2b', 'ab²'],
        correctAnswer: 'a² + b²',
        explanation: 'A két szám négyzeteit adjuk össze: a² + b².',
        breakdown: [{ label: 'Kifejezés', value: 'a² + b²' }]
      },
      {
        id: 'q2-10',
        prompt: 'Mi a -5x kifejezésben az együttható?',
        question: 'Mi a -5x kifejezésben az együttható?',
        options: ['-5', '5', 'x', '-5x'],
        correctAnswer: '-5',
        explanation: 'Az együttható a változót szorzó számérték az előjelével együtt: -5.',
        breakdown: [{ label: 'Együttható', value: '-5' }]
      },
      {
        id: 'q2-11',
        prompt: 'Mi az együttható a -x kifejezésben?',
        question: 'Mi az együttható a -x kifejezésben?',
        options: ['-1', '0', '1', '-x'],
        correctAnswer: '-1',
        explanation: '-x = -1 · x, így az együttható -1.',
        breakdown: [{ label: 'Együttható', value: '-1' }]
      },
      {
        id: 'q2-12',
        prompt: 'Bontsd fel a zárójelet: -(3x - 5)!',
        question: 'Bontsd fel a zárójelet: -(3x - 5)!',
        options: ['-3x + 5', '-3x - 5', '3x - 5', '3x + 5'],
        correctAnswer: '-3x + 5',
        explanation: 'A mínuszjel minden belső előjelet megfordít: -3x + 5.',
        breakdown: [{ label: 'Előjelváltás', value: '-(3x - 5) = -3x + 5' }]
      },
      {
        id: 'q2-13',
        prompt: 'Bontsd fel a zárójelet: 3 · (2a - 4)!',
        question: 'Bontsd fel a zárójelet: 3 · (2a - 4)!',
        options: ['6a - 12', '6a - 4', '5a - 12', '6a + 12'],
        correctAnswer: '6a - 12',
        explanation: '3 · 2a = 6a és 3 · (-4) = -12 ⟹ 6a - 12.',
        breakdown: [{ label: 'Beszorzás', value: '6a - 12' }]
      },
      {
        id: 'q2-14',
        prompt: 'Bontsd fel a zárójelet: -2 · (4x + 3)!',
        question: 'Bontsd fel a zárójelet: -2 · (4x + 3)!',
        options: ['-8x - 6', '-8x + 6', '8x - 6', '-8x + 3'],
        correctAnswer: '-8x - 6',
        explanation: '(-2) · 4x = -8x és (-2) · 3 = -6 ⟹ -8x - 6.',
        breakdown: [{ label: 'Beszorzás', value: '-8x - 6' }]
      },
      {
        id: 'q2-15',
        prompt: 'Bontsd fel a zárójelet: x · (x - 6)!',
        question: 'Bontsd fel a zárójelet: x · (x - 6)!',
        options: ['x² - 6x', '2x - 6x', 'x² - 6', 'x - 6x'],
        correctAnswer: 'x² - 6x',
        explanation: 'x · x = x² és x · (-6) = -6x ⟹ x² - 6x.',
        breakdown: [{ label: 'Szorzás', value: 'x² - 6x' }]
      },
      {
        id: 'q2-16',
        prompt: 'Bontsd fel a zárójelet: -3a · (2a - 5)!',
        question: 'Bontsd fel a zárójelet: -3a · (2a - 5)!',
        options: ['-6a² + 15a', '-6a² - 15a', '-6a + 15a', '6a² - 15a'],
        correctAnswer: '-6a² + 15a',
        explanation: '(-3a) · 2a = -6a² és (-3a) · (-5) = +15a ⟹ -6a² + 15a.',
        breakdown: [{ label: 'Szorzás', value: '-6a² + 15a' }]
      },
      {
        id: 'q2-17',
        prompt: 'Egy a oldalú négyzet kerülete és területe:',
        question: 'Egy a oldalú négyzet kerülete és területe:',
        options: ['K = 4a, T = a²', 'K = a², T = 4a', 'K = 2a, T = a²', 'K = 4a, T = 2a'],
        correctAnswer: 'K = 4a, T = a²',
        explanation: 'Négyzet kerülete 4 · oldal (4a), területe oldal a négyzeten (a²).',
        breakdown: [{ label: 'Képletek', value: 'K = 4a, T = a²' }]
      },
      {
        id: 'q2-18',
        prompt: 'Egy a, b oldalú téglalap kerülete:',
        question: 'Egy a, b oldalú téglalap kerülete:',
        options: ['K = 2(a + b)', 'K = ab', 'K = a + b', 'K = 4(a + b)'],
        correctAnswer: 'K = 2(a + b)',
        explanation: 'K = 2a + 2b = 2(a + b).',
        breakdown: [{ label: 'Kerület', value: 'K = 2(a + b)' }]
      },
      {
        id: 'q2-19',
        prompt: 'Ha 1 füzet ára x Ft és 1 ceruza 80 Ft, mennyibe kerül 4 füzet és 2 ceruza?',
        question: 'Ha 1 füzet ára x Ft és 1 ceruza 80 Ft, mennyibe kerül 4 füzet és 2 ceruza?',
        options: ['4x + 160 Ft', '4x + 80 Ft', '6x + 80 Ft', '4(x + 160) Ft'],
        correctAnswer: '4x + 160 Ft',
        explanation: '4 · x + 2 · 80 = 4x + 160 Ft.',
        breakdown: [{ label: 'Füzetek', value: '4x' }, { label: 'Ceruzák', value: '160' }, { label: 'Összeg', value: '4x + 160 Ft' }]
      },
      {
        id: 'q2-20',
        prompt: 'Hogyan írjuk fel: „két egymást követő páros szám összege” (ha a kisebbik 2k)?',
        question: 'Hogyan írjuk fel: „két egymást követő páros szám összege” (ha a kisebbik 2k)?',
        options: ['2k + (2k + 2)', '2k + (2k + 1)', '2k · 2k', '4k + 1'],
        correctAnswer: '2k + (2k + 2)',
        explanation: 'A következő páros szám 2-vel nagyobb: (2k + 2). Összegük: 2k + (2k + 2) = 4k + 2.',
        breakdown: [{ label: '1. szám', value: '2k' }, { label: '2. szám', value: '2k + 2' }, { label: 'Összeg', value: '2k + (2k + 2)' }]
      },
      {
        id: 'q2-21',
        prompt: 'Mennyi a 12 - 4 · (2 - 5) értéke?',
        question: 'Mennyi a 12 - 4 · (2 - 5) értéke?',
        options: ['24', '0', '-24', '18'],
        correctAnswer: '24',
        explanation: '2 - 5 = -3. Majd 12 - 4 · (-3) = 12 - (-12) = 12 + 12 = 24.',
        breakdown: [{ label: 'Zárójel', value: '-3' }, { label: 'Szorzás', value: '-4 · (-3) = +12' }, { label: 'Összeg', value: '12 + 12 = 24' }]
      },
      {
        id: 'q2-22',
        prompt: 'Mennyi a -2 · [10 - 3 · 4] kifejezés értéke?',
        question: 'Mennyi a -2 · [10 - 3 · 4] kifejezés értéke?',
        options: ['4', '-4', '28', '-28'],
        correctAnswer: '4',
        explanation: 'Szögletes: 10 - 12 = -2. Szorzás: (-2) · (-2) = +4.',
        breakdown: [{ label: 'Belső érték', value: '10 - 12 = -2' }, { label: 'Szorzás', value: '(-2) · (-2) = 4' }]
      },
      {
        id: 'q2-23',
        prompt: 'Mennyi az 5 - (3 - 8 + 2) értéke?',
        question: 'Mennyi az 5 - (3 - 8 + 2) értéke?',
        options: ['8', '2', '-8', '12'],
        correctAnswer: '8',
        explanation: '3 - 8 + 2 = -3. Majd 5 - (-3) = 5 + 3 = 8.',
        breakdown: [{ label: 'Zárójel', value: '-3' }, { label: 'Kivonás', value: '5 - (-3) = 8' }]
      },
      {
        id: 'q2-24',
        prompt: 'Egyszerűsítsd: 3(x + 2) - 2(x - 3)!',
        question: 'Egyszerűsítsd: 3(x + 2) - 2(x - 3)!',
        options: ['x + 12', 'x', '5x + 12', 'x - 12'],
        correctAnswer: 'x + 12',
        explanation: '3x + 6 - 2x + 6 = (3x - 2x) + (6 + 6) = x + 12.',
        breakdown: [{ label: 'Bontás', value: '3x + 6 - 2x + 6' }, { label: 'Összevonás', value: 'x + 12' }]
      },
      {
        id: 'q2-25',
        prompt: 'Egyszerűsítsd: 4(2a - 1) - 3(a - 2)!',
        question: 'Egyszerűsítsd: 4(2a - 1) - 3(a - 2)!',
        options: ['5a + 2', '5a - 10', '5a - 2', '11a + 2'],
        correctAnswer: '5a + 2',
        explanation: '8a - 4 - 3a + 6 = 5a + 2.',
        breakdown: [{ label: 'Bontás', value: '8a - 4 - 3a + 6' }, { label: 'Összeg', value: '5a + 2' }]
      },
      {
        id: 'q2-26',
        prompt: 'Hogyan írjuk fel: „egy szám harmadánál 4-gyel kevesebb” (ha a szám y)?',
        question: 'Hogyan írjuk fel: „egy szám harmadánál 4-gyel kevesebb” (ha a szám y)?',
        options: ['y/3 - 4', '(y - 4)/3', '3y - 4', '4 - y/3'],
        correctAnswer: 'y/3 - 4',
        explanation: 'A szám harmada: y/3, ebből vonunk ki 4-et ⟹ y/3 - 4.',
        breakdown: [{ label: 'Kifejezés', value: 'y/3 - 4' }]
      },
      {
        id: 'q2-27',
        prompt: 'Hogyan írjuk fel: „egy szám 4-gyel csökkentett értékének a harmada” (ha a szám y)?',
        question: 'Hogyan írjuk fel: „egy szám 4-gyel csökkentett értékének a harmada” (ha a szám y)?',
        options: ['(y - 4) / 3', 'y/3 - 4', '3(y - 4)', 'y - 4/3'],
        correctAnswer: '(y - 4) / 3',
        explanation: 'Előbb csökkentjük: (y - 4), majd ezt osztjuk 3-mal: (y - 4) / 3.',
        breakdown: [{ label: 'Kifejezés', value: '(y - 4) / 3' }]
      },
      {
        id: 'q2-28',
        prompt: 'Mennyi a 2 · (x + 3) + 3 · (x - 2) kifejezés összevont értéke?',
        question: 'Mennyi a 2 · (x + 3) + 3 · (x - 2) kifejezés összevont értéke?',
        options: ['5x', '5x + 12', '5x - 12', 'x'],
        correctAnswer: '5x',
        explanation: '2x + 6 + 3x - 6 = 5x + 0 = 5x.',
        breakdown: [{ label: 'Bontás', value: '2x + 6 + 3x - 6' }, { label: 'Összeg', value: '5x' }]
      },
      {
        id: 'q2-29',
        prompt: 'Mennyi az 5 - 2(3 - x) kifejezés egyszerűsített alakja?',
        question: 'Mennyi az 5 - 2(3 - x) kifejezés egyszerűsített alakja?',
        options: ['2x - 1', '-1 - 2x', '2x + 1', '11 - 2x'],
        correctAnswer: '2x - 1',
        explanation: '5 - 6 + 2x = -1 + 2x = 2x - 1.',
        breakdown: [{ label: 'Bontás', value: '5 - 6 + 2x' }, { label: 'Összeg', value: '2x - 1' }]
      },
      {
        id: 'q2-30',
        prompt: 'Egy kétjegyű szám tízes helyiértékén x, egyes helyiértékén y áll. Mennyi a szám értéke?',
        question: 'Egy kétjegyű szám tízes helyiértékén x, egyes helyiértékén y áll. Mennyi a szám értéke?',
        options: ['10x + y', 'xy', 'x + y', '10(x + y)'],
        correctAnswer: '10x + y',
        explanation: 'Helyiértékes összeg: 10 · x + 1 · y = 10x + y.',
        breakdown: [{ label: 'Érték', value: '10x + y' }]
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Szint: Összevonás, Kiemelés & Helyettesítés',
    subtitle: 'Egynemű tagok összevonása, faktorizálás, negatív behelyettesítés és törtes algebra (30 feladat)',
    range: '61 - 90. feladat',
    focus: 'Összevonás, Kiemelés & Helyettesítés',
    badgeBg: 'bg-emerald-50 dark:bg-emerald-950/40',
    badgeBorder: 'border-emerald-200 dark:border-emerald-800',
    badgeText: 'text-emerald-700 dark:text-emerald-300',
    iconBg: 'bg-emerald-600 text-white',
    questions: [
      {
        id: 'q3-1',
        prompt: 'Von össze az egynemű tagokat: 4x + 7x - 3x!',
        question: 'Von össze az egynemű tagokat: 4x + 7x - 3x!',
        options: ['8x', '8x³', '14x', '8'],
        correctAnswer: '8x',
        explanation: '(4 + 7 - 3)x = 8x.',
        breakdown: [{ label: 'Számolás', value: '4 + 7 - 3 = 8 ⟹ 8x' }]
      },
      {
        id: 'q3-2',
        prompt: 'Von össze: 5a + 3b - 2a + 4b!',
        question: 'Von össze: 5a + 3b - 2a + 4b!',
        options: ['3a + 7b', '7a + 7b', '3a - b', '10ab'],
        correctAnswer: '3a + 7b',
        explanation: '(5a - 2a) + (3b + 4b) = 3a + 7b.',
        breakdown: [{ label: 'a tagok', value: '3a' }, { label: 'b tagok', value: '7b' }]
      },
      {
        id: 'q3-3',
        prompt: 'Von össze: 3x² + 4x - x² + 5x!',
        question: 'Von össze: 3x² + 4x - x² + 5x!',
        options: ['2x² + 9x', '11x³', '2x² - x', '4x² + 9x'],
        correctAnswer: '2x² + 9x',
        explanation: '(3x² - x²) + (4x + 5x) = 2x² + 9x.',
        breakdown: [{ label: 'x² tagok', value: '2x²' }, { label: 'x tagok', value: '9x' }]
      },
      {
        id: 'q3-4',
        prompt: 'Emelj ki közös tényezőt a 6x + 15 kifejezésből!',
        question: 'Emelj ki közös tényezőt a 6x + 15 kifejezésből!',
        options: ['3(2x + 5)', '6(x + 15)', '3(2x + 15)', '5(x + 3)'],
        correctAnswer: '3(2x + 5)',
        explanation: 'LKKT(6, 15) = 3 ⟹ 3(2x + 5).',
        breakdown: [{ label: 'Közös osztó', value: '3' }, { label: 'Szorzat', value: '3(2x + 5)' }]
      },
      {
        id: 'q3-5',
        prompt: 'Emelj ki közös tényezőt: 8a² - 12ab!',
        question: 'Emelj ki közös tényezőt: 8a² - 12ab!',
        options: ['4a(2a - 3b)', '4(2a² - 3ab)', '2a(4a - 6b)', '8a(a - 2b)'],
        correctAnswer: '4a(2a - 3b)',
        explanation: 'Közös szám a 4, közös betű az a ⟹ 4a(2a - 3b).',
        breakdown: [{ label: 'Közös tényező', value: '4a' }, { label: 'Szorzat', value: '4a(2a - 3b)' }]
      },
      {
        id: 'q3-6',
        prompt: 'Emeld ki a közös tényezőt: 5x + 5!',
        question: 'Emeld ki a közös tényezőt: 5x + 5!',
        options: ['5(x + 1)', '5x', '5(x + 0)', '5(x + 5)'],
        correctAnswer: '5(x + 1)',
        explanation: 'Az 5 kiemelése után az 5 helyén +1 marad: 5(x + 1).',
        breakdown: [{ label: 'Megmaradó 1-es', value: '5(x + 1)' }]
      },
      {
        id: 'q3-7',
        prompt: 'Emeld ki a -2-t a -2x - 8 kifejezésből!',
        question: 'Emeld ki a -2-t a -2x - 8 kifejezésből!',
        options: ['-2(x + 4)', '-2(x - 4)', '2(-x - 4)', '-2(x + 8)'],
        correctAnswer: '-2(x + 4)',
        explanation: 'Negatív kiemeléskor a belső jelek megfordulnak: -2(x + 4).',
        breakdown: [{ label: 'Kiemelés', value: '-2(x + 4)' }]
      },
      {
        id: 'q3-8',
        prompt: 'Számítsd ki a 3x + 4 értékét, ha x = -2!',
        question: 'Számítsd ki a 3x + 4 értékét, ha x = -2!',
        options: ['-2', '+10', '-10', '+2'],
        correctAnswer: '-2',
        explanation: '3 · (-2) + 4 = -6 + 4 = -2.',
        breakdown: [{ label: 'Számolás', value: '3 · (-2) + 4 = -6 + 4 = -2' }]
      },
      {
        id: 'q3-9',
        prompt: 'Mennyi a 2x² - 5x + 3 értéke, ha x = -2?',
        question: 'Mennyi a 2x² - 5x + 3 értéke, ha x = -2?',
        options: ['21', '1', '5', '-15'],
        correctAnswer: '21',
        explanation: '2 · (-2)² - 5 · (-2) + 3 = 2 · 4 - (-10) + 3 = 8 + 10 + 3 = 21.',
        breakdown: [{ label: '1. tag', value: '2 · 4 = 8' }, { label: '2. tag', value: '-5 · (-2) = 10' }, { label: 'Összeg', value: '8 + 10 + 3 = 21' }]
      },
      {
        id: 'q3-10',
        prompt: 'Mennyi a (3x - 6) / (x + 1) tört értéke, ha x = 4?',
        question: 'Mennyi a (3x - 6) / (x + 1) tört értéke, ha x = 4?',
        options: ['6/5 = 1.2', '1', '2', '6/4'],
        correctAnswer: '6/5 = 1.2',
        explanation: 'Számláló: 3 · 4 - 6 = 6. Nevező: 4 + 1 = 5. Érték: 6/5 = 1.2.',
        breakdown: [{ label: 'Számláló', value: '6' }, { label: 'Nevező', value: '5' }, { label: 'Hányados', value: '6/5' }]
      },
      {
        id: 'q3-11',
        prompt: 'Egyszerűsítsd a törtet: (6x + 12) / 3!',
        question: 'Egyszerűsítsd a törtet: (6x + 12) / 3!',
        options: ['2x + 4', '2x + 12', '6x + 4', '3x + 4'],
        correctAnswer: '2x + 4',
        explanation: '3(2x + 4) / 3 = 2x + 4.',
        breakdown: [{ label: 'Kiemelés', value: '3(2x + 4) / 3 = 2x + 4' }]
      },
      {
        id: 'q3-12',
        prompt: 'Egyszerűsítsd a törtet: (5a - 10) / (a - 2)!',
        question: 'Egyszerűsítsd a törtet: (5a - 10) / (a - 2)!',
        options: ['5', '5a', 'a - 2', '10'],
        correctAnswer: '5',
        explanation: '5(a - 2) / (a - 2) = 5.',
        breakdown: [{ label: 'Kiemelés', value: '5(a - 2)' }, { label: 'Egyszerűsítés', value: '5' }]
      },
      {
        id: 'q3-13',
        prompt: 'Mennyi a -x² + 2x értéke, ha x = -3?',
        question: 'Mennyi a -x² + 2x értéke, ha x = -3?',
        options: ['-15', '+3', '+15', '-3'],
        correctAnswer: '-15',
        explanation: '-(-3)² + 2 · (-3) = -(9) + (-6) = -9 - 6 = -15.',
        breakdown: [{ label: '1. tag', value: '-(-3)² = -9' }, { label: '2. tag', value: '2 · (-3) = -6' }, { label: 'Összeg', value: '-9 - 6 = -15' }]
      },
      {
        id: 'q3-14',
        prompt: 'Von össze: 7xy - 3yx + 2xy!',
        question: 'Von össze: 7xy - 3yx + 2xy!',
        options: ['6xy', '9xy', '4xy', '6x²y²'],
        correctAnswer: '6xy',
        explanation: 'Mivel yx = xy, ezért: (7 - 3 + 2)xy = 6xy.',
        breakdown: [{ label: 'Összevonás', value: '(7 - 3 + 2)xy = 6xy' }]
      },
      {
        id: 'q3-15',
        prompt: 'Emelj ki közös tényezőt: 10a²b - 15ab²!',
        question: 'Emelj ki közös tényezőt: 10a²b - 15ab²!',
        options: ['5ab(2a - 3b)', '5(2a²b - 3ab²)', '5a(2ab - 3b²)', '10ab(a - b)'],
        correctAnswer: '5ab(2a - 3b)',
        explanation: 'Közös szám 5, közös betűk ab ⟹ 5ab(2a - 3b).',
        breakdown: [{ label: 'Közös tényező', value: '5ab' }, { label: 'Szorzat', value: '5ab(2a - 3b)' }]
      },
      {
        id: 'q3-16',
        prompt: 'Mennyi a 4(x - 2) - 2(2x - 4) kifejezés értéke?',
        question: 'Mennyi a 4(x - 2) - 2(2x - 4) kifejezés értéke?',
        options: ['0', '8x', '-16', '4'],
        correctAnswer: '0',
        explanation: '4x - 8 - 4x + 8 = 0.',
        breakdown: [{ label: 'Bontás', value: '4x - 8 - 4x + 8 = 0' }]
      },
      {
        id: 'q3-17',
        prompt: 'Milyen x érték esetén lesz 2x - 8 = 0?',
        question: 'Milyen x érték esetén lesz 2x - 8 = 0?',
        options: ['x = 4', 'x = -4', 'x = 8', 'x = 2'],
        correctAnswer: 'x = 4',
        explanation: '2 · 4 - 8 = 8 - 8 = 0.',
        breakdown: [{ label: 'Megoldás', value: '2x = 8 ⟹ x = 4' }]
      },
      {
        id: 'q3-18',
        prompt: 'Mennyi a (2x - 1)² értéke, ha x = -2?',
        question: 'Mennyi a (2x - 1)² értéke, ha x = -2?',
        options: ['25', '-25', '9', '-9'],
        correctAnswer: '25',
        explanation: '2 · (-2) - 1 = -4 - 1 = -5. Majd (-5)² = 25.',
        breakdown: [{ label: 'Belső érték', value: '-5' }, { label: 'Négyzet', value: '(-5)² = 25' }]
      },
      {
        id: 'q3-19',
        prompt: 'Von össze: 1/2 a + 1/3 a!',
        question: 'Von össze: 1/2 a + 1/3 a!',
        options: ['5/6 a', '2/5 a', '1/6 a', '5/6 a²'],
        correctAnswer: '5/6 a',
        explanation: '3/6 a + 2/6 a = 5/6 a.',
        breakdown: [{ label: 'Közös nevező', value: '3/6 + 2/6 = 5/6 a' }]
      },
      {
        id: 'q3-20',
        prompt: 'Emeld ki a közös tényezőt: 3x² - 12x + 18!',
        question: 'Emeld ki a közös tényezőt: 3x² - 12x + 18!',
        options: ['3(x² - 4x + 6)', '3x(x - 4 + 6)', 'x(3x - 12 + 18)', '3(x² - 12x + 18)'],
        correctAnswer: '3(x² - 4x + 6)',
        explanation: 'Mindhárom tag osztható 3-mal: 3(x² - 4x + 6).',
        breakdown: [{ label: 'Kiemelés', value: '3(x² - 4x + 6)' }]
      },
      {
        id: 'q3-21',
        prompt: 'Egy téglalap oldalai (2x + 1) és 3. Mennyi a kerülete?',
        question: 'Egy téglalap oldalai (2x + 1) és 3. Mennyi a kerülete?',
        options: ['4x + 8', '6x + 3', '2x + 4', '4x + 4'],
        correctAnswer: '4x + 8',
        explanation: 'K = 2(oldal1 + oldal2) = 2(2x + 1 + 3) = 2(2x + 4) = 4x + 8.',
        breakdown: [{ label: 'Képlet', value: '2 · (2x + 4) = 4x + 8' }]
      },
      {
        id: 'q3-22',
        prompt: 'Egy négyzet oldala (x + 2). Mennyi a kerülete?',
        question: 'Egy négyzet oldala (x + 2). Mennyi a kerülete?',
        options: ['4x + 8', 'x² + 4', '4x + 2', '2x + 4'],
        correctAnswer: '4x + 8',
        explanation: 'K = 4 · (x + 2) = 4x + 8.',
        breakdown: [{ label: 'Kerület', value: '4 · (x + 2) = 4x + 8' }]
      },
      {
        id: 'q3-23',
        prompt: 'Mennyi a 3a - [2b - (a - b)] kifejezés egyszerűsített alakja?',
        question: 'Mennyi a 3a - [2b - (a - b)] kifejezés egyszerűsített alakja?',
        options: ['4a - 3b', '2a - 3b', '4a - b', '2a + 3b'],
        correctAnswer: '4a - 3b',
        explanation: 'Belső: 2b - a + b = 3b - a. Külső: 3a - (3b - a) = 3a - 3b + a = 4a - 3b.',
        breakdown: [{ label: 'Szögletes', value: '3b - a' }, { label: 'Bontás', value: '3a - 3b + a = 4a - 3b' }]
      },
      {
        id: 'q3-24',
        prompt: 'Mennyi az (a + 2b) · 3 - 2 · (2a - b) értéke?',
        question: 'Mennyi az (a + 2b) · 3 - 2 · (2a - b) értéke?',
        options: ['-a + 8b', '-a + 4b', '7a + 4b', '-a - 8b'],
        correctAnswer: '-a + 8b',
        explanation: '3a + 6b - 4a + 2b = -a + 8b.',
        breakdown: [{ label: 'Bontás', value: '3a + 6b - 4a + 2b' }, { label: 'Összeg', value: '-a + 8b' }]
      },
      {
        id: 'q3-25',
        prompt: 'Mennyi az a² - b² értéke, ha a = 5 és b = -3?',
        question: 'Mennyi az a² - b² értéke, ha a = 5 és b = -3?',
        options: ['16', '34', '-16', '64'],
        correctAnswer: '16',
        explanation: '5² - (-3)² = 25 - 9 = 16.',
        breakdown: [{ label: '5²', value: '25' }, { label: '(-3)²', value: '9' }, { label: 'Különbség', value: '25 - 9 = 16' }]
      },
      {
        id: 'q3-26',
        prompt: 'Emeld ki a közös tényezőt: 14x²y + 21xy²!',
        question: 'Emeld ki a közös tényezőt: 14x²y + 21xy²!',
        options: ['7xy(2x + 3y)', '7(2x²y + 3xy²)', 'xy(14x + 21y)', '14xy(x + y)'],
        correctAnswer: '7xy(2x + 3y)',
        explanation: 'LKKT(14, 21) = 7, közös változók xy ⟹ 7xy(2x + 3y).',
        breakdown: [{ label: 'Közös tényező', value: '7xy' }, { label: 'Szorzat', value: '7xy(2x + 3y)' }]
      },
      {
        id: 'q3-27',
        prompt: 'Mennyi a (10x - 5) / 5 kifejezés egyszerűsített alakja?',
        question: 'Mennyi a (10x - 5) / 5 kifejezés egyszerűsített alakja?',
        options: ['2x - 1', '2x - 5', '10x - 1', '2x'],
        correctAnswer: '2x - 1',
        explanation: '5(2x - 1) / 5 = 2x - 1.',
        breakdown: [{ label: 'Egyszerűsítés', value: '2x - 1' }]
      },
      {
        id: 'q3-28',
        prompt: 'Melyik egyenlőség IGAZ minden x valós számra?',
        question: 'Melyik egyenlőség IGAZ minden x valós számra?',
        options: ['3(x - 2) + 6 = 3x', '2(x + 1) = 2x + 1', 'x² + x = x³', '4 - x = x - 4'],
        correctAnswer: '3(x - 2) + 6 = 3x',
        explanation: '3x - 6 + 6 = 3x. Ez egy matematikai azonosság.',
        breakdown: [{ label: 'Bontás', value: '3x - 6 + 6 = 3x (azonosság)' }]
      },
      {
        id: 'q3-29',
        prompt: 'Mennyi a 2(3x - 1) - 3(2x - 1) kifejezés értéke?',
        question: 'Mennyi a 2(3x - 1) - 3(2x - 1) kifejezés értéke?',
        options: ['1', '-1', '0', '12x - 5'],
        correctAnswer: '1',
        explanation: '6x - 2 - 6x + 3 = (6x - 6x) + (-2 + 3) = 1.',
        breakdown: [{ label: 'Bontás', value: '6x - 2 - 6x + 3' }, { label: 'Összeg', value: '1' }]
      },
      {
        id: 'q3-30',
        prompt: 'Mennyi a -2x³ kifejezés értéke, ha x = -2?',
        question: 'Mennyi a -2x³ kifejezés értéke, ha x = -2?',
        options: ['+16', '-16', '+12', '-12'],
        correctAnswer: '+16',
        explanation: '(-2)³ = -8. Majd (-2) · (-8) = +16.',
        breakdown: [{ label: 'x³', value: '(-2)³ = -8' }, { label: 'Szorzás', value: '-2 · (-8) = +16' }]
      }
    ]
  }
};

export const RationalSummaryQuiz: React.FC<RationalSummaryQuizProps> = ({
  onBack,
  onSwitchToTheory
}) => {
  return (
    <QuizTemplate
      title="9. Nagy Fejezeti Összefoglaló Kvíz (90 Kérdés)"
      subtitle="A II. Racionális számok és betűs kifejezések fejezet teljes tudáspróbája 3 nehézségi szinten (30-30-30 feladat)!"
      documentId="grade-7-racionalis-szamok-algebra-osszefoglalas-quiz"
      badgeText="7. Osztály • Záró Nagykvíz (90 Kérdés)"
      themeColor="rose"
      cheatSheetCards={cheatSheetCards}
      levels={quizLevels}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      matcherComponent={<RationalSummaryMatcher />}
      sorterComponent={<RationalSummarySorter />}
    />
  );
};
