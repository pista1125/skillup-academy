import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ProgressBar } from '@/components/ProgressBar';
import {
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  Trophy,
  Sparkles,
  CheckCircle2,
  XCircle,
  BookOpen,
  Zap,
  ChevronRight,
  Layers,
  LayoutGrid,
  FileQuestion,
  Flame,
  Maximize2,
  Minimize2,
  ArrowRightLeft
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { IntegerAdditionSubtractionMatcher } from './IntegerAdditionSubtractionMatcher';
import { IntegerAdditionSubtractionSorter } from './IntegerAdditionSubtractionSorter';

export type DifficultyLevel = 1 | 2 | 3;
export type GameMode = 'quiz' | 'matcher' | 'sorter';

export interface QuizQuestion {
  id: string;
  prompt: string;
  highlightValue: string;
  questionTypeBadge: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  breakdown?: { label: string; value: string }[];
}

interface LevelConfig {
  level: DifficultyLevel;
  title: string;
  subtitle: string;
  range: string;
  focus: string;
  color: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  accentGradient: string;
  iconBg: string;
  questions: QuizQuestion[];
}

const INTEGER_MATH_CHEAT_SHEET = [
  {
    topic: 'Pozitív hozzáadása (+ +)',
    formula: 'a + (+b) = a + b',
    note: 'Jobbra lépünk a számegyenesen (megtakarítás nő, hőmérséklet emelkedik).'
  },
  {
    topic: 'Negatív hozzáadása (+ -)',
    formula: 'a + (-b) = a - b',
    note: 'Balra lépünk a számegyenesen (tartozás nő, hőmérséklet csökken).'
  },
  {
    topic: 'Pozitív kivonása (- +)',
    formula: 'a - (+b) = a - b',
    note: 'Balra lépünk a számegyenesen (pénz kiadása / csökkenés).'
  },
  {
    topic: 'Negatív kivonása (- -)',
    formula: 'a - (-b) = a + b',
    note: 'Jobbra lépünk a számegyenesen (két mínusz pluszra vált, adósság elengedése = nyereség!).'
  },
  {
    topic: 'Azonos előjelűek összeadása',
    formula: '(-3) + (-5) = -8',
    note: 'Összeadjuk az abszolút értékeket, és megtartjuk a közös előjelet.'
  },
  {
    topic: 'Különböző előjelűek összeadása',
    formula: '(+7) + (-10) = -3',
    note: 'Nagyobb abszolút értékből kivonjuk a kisebbet, és a nagyobb előjelét kapja.'
  },
  {
    topic: 'Kivonás mint ellentett hozzáadása',
    formula: 'a - b = a + (-b)',
    note: 'A kivonást mindig átírhatjuk az ellentett hozzáadására.'
  },
  {
    topic: 'Ellentett számok összege',
    formula: 'a + (-a) = 0',
    note: 'Bármely szám és az ellentettjének összege mindig pontosan 0 (pl. -15 + 15 = 0).'
  }
];

const QUIZ_LEVELS: Record<DifficultyLevel, LevelConfig> = {
  1: {
    level: 1,
    title: '1. Könnyű szint',
    subtitle: 'Alapvető összeadás és kivonás azonos és különböző előjelekkel',
    range: '-20 – +20',
    focus: 'Azonos előjelek összeadása, ellentettek összege, egyszerű kivonás',
    color: 'emerald',
    badgeBg: 'bg-emerald-50 dark:bg-emerald-950/40',
    badgeBorder: 'border-emerald-200 dark:border-emerald-800',
    badgeText: 'text-emerald-700 dark:text-emerald-300',
    accentGradient: 'from-emerald-500 to-teal-600',
    iconBg: 'bg-emerald-600 text-white',
    questions: [
      {
        id: 'q1-1',
        prompt: 'Mennyi a (+6) + (+7) művelet eredménye?',
        highlightValue: '(+6) + (+7)',
        questionTypeBadge: 'Pozitív számok összeadása',
        options: ['+13', '-13', '+1', '-1'],
        correctAnswer: '+13',
        explanation: 'Két pozitív szám összege pozitív szám: 6 + 7 = 13.',
        breakdown: [
          { label: 'Összeadás', value: '6 + 7' },
          { label: 'Eredmény', value: '+13' }
        ]
      },
      {
        id: 'q1-2',
        prompt: 'Mennyi a (-4) + (-5) művelet eredménye?',
        highlightValue: '(-4) + (-5)',
        questionTypeBadge: 'Negatív számok összeadása',
        options: ['-9', '+9', '-1', '+1'],
        correctAnswer: '-9',
        explanation: 'Azonos negatív előjeleknél az abszolút értékeket összeadjuk és kitesszük a mínusz jelet: -(4 + 5) = -9.',
        breakdown: [
          { label: 'Abszolút értékek', value: '4 + 5 = 9' },
          { label: 'Közös előjel', value: '-9' }
        ]
      },
      {
        id: 'q1-3',
        prompt: 'Mennyi a (+8) + (-3) művelet eredménye?',
        highlightValue: '(+8) + (-3)',
        questionTypeBadge: 'Különböző előjelek',
        options: ['+5', '-5', '+11', '-11'],
        correctAnswer: '+5',
        explanation: '8 + (-3) = 8 - 3 = +5. A 8 nagyobb abszolút értékű, mint a 3, így pozitív marad.',
        breakdown: [
          { label: 'Egyszerűsítés', value: '8 - 3' },
          { label: 'Eredmény', value: '+5' }
        ]
      },
      {
        id: 'q1-4',
        prompt: 'Mennyi a (-10) + (+4) művelet eredménye?',
        highlightValue: '(-10) + (+4)',
        questionTypeBadge: 'Különböző előjelek',
        options: ['-6', '+6', '-14', '+14'],
        correctAnswer: '-6',
        explanation: 'A nagyobb abszolút értékű 10-ből kivonjuk a 4-et: 10 - 4 = 6, és a 10 negatív előjelét kapja: -6.',
        breakdown: [
          { label: 'Kivonás', value: '10 - 4 = 6' },
          { label: 'Nagyobb előjele', value: '-6' }
        ]
      },
      {
        id: 'q1-5',
        prompt: 'Mennyi a (+15) + (-15) összeadás eredménye?',
        highlightValue: '(+15) + (-15)',
        questionTypeBadge: 'Ellentettek összege',
        options: ['0', '+30', '-30', '1'],
        correctAnswer: '0',
        explanation: 'Egy szám és a saját ellentettjének összege mindig pontosan 0.',
        breakdown: [
          { label: 'Ellentétes tagok', value: '+15 és -15' },
          { label: 'Összeg', value: '0' }
        ]
      },
      {
        id: 'q1-6',
        prompt: 'A hőmérséklet -2 °C volt reggel, majd délre emelkedett 6 °C-ot (-2 + 6). Hány fok lett délben?',
        highlightValue: '-2 °C + 6 °C',
        questionTypeBadge: 'Hőmérséklet változás',
        options: ['+4 °C', '-4 °C', '+8 °C', '-8 °C'],
        correctAnswer: '+4 °C',
        explanation: '-2-től jobbra lépünk 6 egységet a számegyenesen: -2 + 6 = +4 °C.',
        breakdown: [
          { label: 'Kezdőpont', value: '-2 °C' },
          { label: 'Emelkedés', value: '+6 °C' },
          { label: 'Déli hőmérséklet', value: '+4 °C' }
        ]
      },
      {
        id: 'q1-7',
        prompt: 'Mennyi a 7 - (+10) kivonás eredménye?',
        highlightValue: '7 - (+10)',
        questionTypeBadge: 'Egész szám kivonása',
        options: ['-3', '+3', '-17', '+17'],
        correctAnswer: '-3',
        explanation: '7 - (+10) = 7 - 10 = -3.',
        breakdown: [
          { label: 'Átírás', value: '7 - 10' },
          { label: 'Eredmény', value: '-3' }
        ]
      },
      {
        id: 'q1-8',
        prompt: 'Mennyi a 0 + (-12) művelet értéke?',
        highlightValue: '0 + (-12)',
        questionTypeBadge: 'Nulla szerepe',
        options: ['-12', '+12', '0', '-24'],
        correctAnswer: '-12',
        explanation: 'Nullához bármit hozzáadva az eredeti számot kapjuk: 0 + (-12) = -12.',
        breakdown: [
          { label: 'Origó', value: '0' },
          { label: 'Eredmény', value: '-12' }
        ]
      },
      {
        id: 'q1-9',
        prompt: 'Mennyi a (-8) + (-12) összeadás eredménye?',
        highlightValue: '(-8) + (-12)',
        questionTypeBadge: 'Azonos negatív előjelek',
        options: ['-20', '+20', '-4', '+4'],
        correctAnswer: '-20',
        explanation: 'Mindkét szám negatív: -(8 + 12) = -20.',
        breakdown: [
          { label: 'Összegzés', value: '-(8 + 12)' },
          { label: 'Eredmény', value: '-20' }
        ]
      },
      {
        id: 'q1-10',
        prompt: 'Ha Petinek van 500 Ft-ja, de kölcsönkér 1 200 Ft-ot és azt is elkölti (500 - 1200), mekkora az egyenlege?',
        highlightValue: '500 Ft - 1 200 Ft',
        questionTypeBadge: 'Pénzügyi egyenleg',
        options: ['-700 Ft', '+700 Ft', '-1 700 Ft', '0 Ft'],
        correctAnswer: '-700 Ft',
        explanation: '500 - 1200 = -700 Ft tartozás keletkezik.',
        breakdown: [
          { label: 'Kezdő egyenleg', value: '+500 Ft' },
          { label: 'Kiadás', value: '-1 200 Ft' },
          { label: 'Végegyenleg', value: '-700 Ft' }
        ]
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Közepes szint',
    subtitle: 'Zárójelfelbontás, negatív szám kivonása, két mínusz összeolvadása',
    range: '-100 – +100',
    focus: 'a - (-b) = a + b szabály, zárójelek nélküli alak, hiányzó tagok',
    color: 'amber',
    badgeBg: 'bg-amber-50 dark:bg-amber-950/40',
    badgeBorder: 'border-amber-200 dark:border-amber-800',
    badgeText: 'text-amber-700 dark:text-amber-300',
    accentGradient: 'from-amber-500 to-orange-600',
    iconBg: 'bg-amber-600 text-white',
    questions: [
      {
        id: 'q2-1',
        prompt: 'Mennyi a 12 - (-5) kivonás eredménye a két mínusz összeolvadása után?',
        highlightValue: '12 - (-5)',
        questionTypeBadge: 'Negatív kivonása',
        options: ['17 (12 + 5)', '7 (12 - 5)', '-17', '-7'],
        correctAnswer: '17 (12 + 5)',
        explanation: 'A kivonás és a negatív előjel összeolvad pluszra: 12 - (-5) = 12 + 5 = 17.',
        breakdown: [
          { label: 'Szabály', value: '-(-b) = +b' },
          { label: 'Átírva', value: '12 + 5 = 17' }
        ]
      },
      {
        id: 'q2-2',
        prompt: 'Mennyi a (-6) - (-14) kifejezés értéke?',
        highlightValue: '(-6) - (-14)',
        questionTypeBadge: 'Két negatív művelete',
        options: ['+8 (-6 + 14)', '-20', '-8', '+20'],
        correctAnswer: '+8 (-6 + 14)',
        explanation: '(-6) - (-14) = -6 + 14 = 14 - 6 = +8.',
        breakdown: [
          { label: 'Zárójel feloldása', value: '-6 + 14' },
          { label: 'Eredmény', value: '+8' }
        ]
      },
      {
        id: 'q2-3',
        prompt: 'Mennyi a (-9) - (+7) kivonás pontos eredménye?',
        highlightValue: '(-9) - (+7)',
        questionTypeBadge: 'Pozitív elvétele negatívból',
        options: ['-16', '-2', '+16', '+2'],
        correctAnswer: '-16',
        explanation: '(-9) - (+7) = -9 - 7 = -16 (még 7-tel balrább lépünk).',
        breakdown: [
          { label: 'Átírva', value: '-9 - 7' },
          { label: 'Eredmény', value: '-16' }
        ]
      },
      {
        id: 'q2-4',
        prompt: 'Hogyan írható fel egyszerűbb alakban zárójelek nélkül az alábbi kifejezés: (+15) + (-8) - (-4) ?',
        highlightValue: '(+15) + (-8) - (-4)',
        questionTypeBadge: 'Zárójelek elhagyása',
        options: ['15 - 8 + 4', '15 + 8 - 4', '15 - 8 - 4', '15 + 8 + 4'],
        correctAnswer: '15 - 8 + 4',
        explanation: '+(-8) ➔ -8, és -(-4) ➔ +4, tehát 15 - 8 + 4.',
        breakdown: [
          { label: '+(-8)', value: '-8' },
          { label: '-(-4)', value: '+4' },
          { label: 'Alak', value: '15 - 8 + 4' }
        ]
      },
      {
        id: 'q2-5',
        prompt: 'Mennyi a 15 - 8 + 4 műveletsor végeredménye?',
        highlightValue: '15 - 8 + 4',
        questionTypeBadge: 'Műveletsor elvégzése',
        options: ['11', '3', '19', '27'],
        correctAnswer: '11',
        explanation: 'Balról jobbra haladva: 15 - 8 = 7, majd 7 + 4 = 11.',
        breakdown: [
          { label: '1. lépés', value: '15 - 8 = 7' },
          { label: '2. lépés', value: '7 + 4 = 11' }
        ]
      },
      {
        id: 'q2-6',
        prompt: 'Mennyi a (-25) - (-25) kifejezés értéke?',
        highlightValue: '(-25) - (-25)',
        questionTypeBadge: 'Önmagából kivonás',
        options: ['0', '-50', '+50', '1'],
        correctAnswer: '0',
        explanation: 'Bármely számból kivonva önmagát 0-t kapunk: -25 + 25 = 0.',
        breakdown: [
          { label: 'Átírva', value: '-25 + 25' },
          { label: 'Eredmény', value: '0' }
        ]
      },
      {
        id: 'q2-7',
        prompt: 'Mennyi a -18 - 7 művelet eredménye a számegyenesen lépkedve?',
        highlightValue: '-18 - 7',
        questionTypeBadge: 'Negatív szám csökkentése',
        options: ['-25', '-11', '+11', '+25'],
        correctAnswer: '-25',
        explanation: 'A -18-tól balra lépünk 7 egységet: -18 - 7 = -25.',
        breakdown: [
          { label: 'Kezdőpont', value: '-18' },
          { label: 'Lépés balra', value: '7 egység' },
          { label: 'Érkezés', value: '-25' }
        ]
      },
      {
        id: 'q2-8',
        prompt: 'Mennyi a -30 + 50 kifejezés eredménye?',
        highlightValue: '-30 + 50',
        questionTypeBadge: 'Összeg felcserélése',
        options: ['+20', '-20', '+80', '-80'],
        correctAnswer: '+20',
        explanation: '-30 + 50 felcserélhető: 50 - 30 = +20.',
        breakdown: [
          { label: 'Tagok cseréje', value: '50 - 30' },
          { label: 'Eredmény', value: '+20' }
        ]
      },
      {
        id: 'q2-9',
        prompt: 'Melyik szám hiányzik a pontozott helyről: (-8) + ... = +5 ?',
        highlightValue: '(-8) + x = +5',
        questionTypeBadge: 'Hiányzó tag meghatározása',
        options: ['+13', '-13', '+3', '-3'],
        correctAnswer: '+13',
        explanation: '-8-hoz 13-at kell adni, hogy elérjük a +5-öt: 5 - (-8) = 5 + 8 = 13.',
        breakdown: [
          { label: 'Egyenlet', value: 'x = 5 - (-8)' },
          { label: 'Megoldás', value: 'x = +13' }
        ]
      },
      {
        id: 'q2-10',
        prompt: 'Mennyi a 100 - (-80) kivonás eredménye?',
        highlightValue: '100 - (-80)',
        questionTypeBadge: 'Nagyobb számok kivonása',
        options: ['180', '20', '-180', '-20'],
        correctAnswer: '180',
        explanation: '100 - (-80) = 100 + 80 = 180.',
        breakdown: [
          { label: 'Átírás', value: '100 + 80' },
          { label: 'Eredmény', value: '180' }
        ]
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Nehéz szint',
    subtitle: 'Többtagú műveletsorok, abszolút értékkel kombinált feladatok, egyenletek',
    range: 'Összetett feladatok és szöveges kontextus',
    focus: 'Többtagú összegek, abszolút érték + előjelek, szöveges feladványok',
    color: 'purple',
    badgeBg: 'bg-purple-50 dark:bg-purple-950/40',
    badgeBorder: 'border-purple-200 dark:border-purple-800',
    badgeText: 'text-purple-700 dark:text-purple-300',
    accentGradient: 'from-blue-600 to-indigo-700',
    iconBg: 'bg-purple-600 text-white',
    questions: [
      {
        id: 'q3-1',
        prompt: 'Mennyi az alábbi műveletsor értéke: (-15) + 30 - 25 - (-10) ?',
        highlightValue: '(-15) + 30 - 25 - (-10)',
        questionTypeBadge: 'Többtagú műveletsor',
        options: ['0', '10', '-20', '-10'],
        correctAnswer: '0',
        explanation: '-15 + 30 - 25 + 10 = 15 - 25 + 10 = -10 + 10 = 0.',
        breakdown: [
          { label: 'Zárójel felbontás', value: '-15 + 30 - 25 + 10' },
          { label: 'Pozitív tagok', value: '30 + 10 = 40' },
          { label: 'Negatív tagok', value: '-15 - 25 = -40' },
          { label: 'Összeg', value: '40 - 40 = 0' }
        ]
      },
      {
        id: 'q3-2',
        prompt: 'Mennyi az alábbi kifejezés értéke: -8 - (-15) + (-12) - 5 ?',
        highlightValue: '-8 - (-15) + (-12) - 5',
        questionTypeBadge: 'Összetett előjelváltás',
        options: ['-10', '+10', '-40', '0'],
        correctAnswer: '-10',
        explanation: '-8 + 15 - 12 - 5 = 7 - 12 - 5 = -5 - 5 = -10.',
        breakdown: [
          { label: 'Egyszerűsítve', value: '-8 + 15 - 12 - 5' },
          { label: 'Részeredmény', value: '7 - 17' },
          { label: 'Végeredmény', value: '-10' }
        ]
      },
      {
        id: 'q3-3',
        prompt: 'Melyik x érték teszi igazzá az egyenletet: x - (-12) = 5 ?',
        highlightValue: 'x - (-12) = 5',
        questionTypeBadge: 'Egyenlet megoldása',
        options: ['x = -7', 'x = 7', 'x = 17', 'x = -17'],
        correctAnswer: 'x = -7',
        explanation: 'x + 12 = 5 ➔ Mindkét oldalból kivonunk 12-t: x = 5 - 12 = -7.',
        breakdown: [
          { label: 'Átírás', value: 'x + 12 = 5' },
          { label: 'Kivonás', value: 'x = 5 - 12' },
          { label: 'Gyök', value: 'x = -7' }
        ]
      },
      {
        id: 'q3-4',
        prompt: 'Mennyi a | -14 + 6 | - | 5 - 12 | kifejezés értéke?',
        highlightValue: '| -14 + 6 | - | 5 - 12 |',
        questionTypeBadge: 'Abszolút érték műveletekkel',
        options: ['1 (8 - 7 = 1)', '-1', '15', '-15'],
        correctAnswer: '1 (8 - 7 = 1)',
        explanation: '|-14 + 6| = |-8| = 8. És |5 - 12| = |-7| = 7. Különbség: 8 - 7 = 1.',
        breakdown: [
          { label: '1. tag', value: '|-8| = 8' },
          { label: '2. tag', value: '|-7| = 7' },
          { label: 'Különbség', value: '8 - 7 = 1' }
        ]
      },
      {
        id: 'q3-5',
        prompt: 'Egy búvár a tengerszint alatt 18 méteren tartózkodik (-18 m). Leereszkedik még 7 métert, majd felúszik 15 métert. Hol tartózkodik most?',
        highlightValue: '-18 m - 7 m + 15 m',
        questionTypeBadge: 'Szöveges tengerszint feladat',
        options: [
          '-10 m (10 méterrel a víz alatt)',
          '-40 m',
          '-26 m',
          '+4 m'
        ],
        correctAnswer: '-10 m (10 méterrel a víz alatt)',
        explanation: '-18 - 7 + 15 = -25 + 15 = -10 m.',
        breakdown: [
          { label: 'Kezdő mélység', value: '-18 m' },
          { label: 'Merülés (-7 m)', value: '-25 m' },
          { label: 'Emelkedés (+15 m)', value: '-10 m' }
        ]
      },
      {
        id: 'q3-6',
        prompt: 'Mennyi a -(-10) + (-20) - (-30) + (-40) műveletsor összege?',
        highlightValue: '-(-10) + (-20) - (-30) + (-40)',
        questionTypeBadge: 'Vegyes előjelű műveletsor',
        options: ['-20 (10 - 20 + 30 - 40)', '+20', '0', '-100'],
        correctAnswer: '-20 (10 - 20 + 30 - 40)',
        explanation: '10 - 20 + 30 - 40 = (10 + 30) - (20 + 40) = 40 - 60 = -20.',
        breakdown: [
          { label: 'Zárójelek nélkül', value: '10 - 20 + 30 - 40' },
          { label: 'Pozitív összeg', value: '+40' },
          { label: 'Negatív összeg', value: '-60' },
          { label: 'Végeredmény', value: '-20' }
        ]
      },
      {
        id: 'q3-7',
        prompt: 'Melyik relációs jel illik az alábbi két kifejezés közé? (-7) - (-10) ___ (-4) + (-2)',
        highlightValue: '(-7) - (-10) ___ (-4) + (-2)',
        questionTypeBadge: 'Kifejezések összehasonlítása',
        options: ['> (mert +3 > -6)', '< (mert +3 < -6)', '= (egyenlőek)', '≤'],
        correctAnswer: '> (mert +3 > -6)',
        explanation: 'Bal oldal: -7 + 10 = +3. Jobb oldal: -4 - 2 = -6. Mivel +3 > -6, a > jel a helyes.',
        breakdown: [
          { label: 'Bal oldal', value: '+3' },
          { label: 'Jobb oldal', value: '-6' },
          { label: 'Reláció', value: '+3 > -6' }
        ]
      },
      {
        id: 'q3-8',
        prompt: 'Ha a = -5 és b = -8, mennyi az a - b kifejezés értéke?',
        highlightValue: 'Ha a = -5, b = -8, mennyi a - b ?',
        questionTypeBadge: 'Behelyettesítéses feladat',
        options: [
          '+3 (-5 - (-8) = -5 + 8)',
          '-3',
          '-13',
          '+13'
        ],
        correctAnswer: '+3 (-5 - (-8) = -5 + 8)',
        explanation: 'a - b = -5 - (-8) = -5 + 8 = +3.',
        breakdown: [
          { label: 'Behelyettesítés', value: '-5 - (-8)' },
          { label: 'Átírás', value: '-5 + 8' },
          { label: 'Eredmény', value: '+3' }
        ]
      },
      {
        id: 'q3-9',
        prompt: 'Mennyi a (-1) + (+2) + (-3) + (+4) + (-5) + (+6) összeg értéke?',
        highlightValue: '(-1) + 2 - 3 + 4 - 5 + 6',
        questionTypeBadge: 'Párosításos összegzés',
        options: ['+3 (1 + 1 + 1 = 3)', '-3', '0', '+21'],
        correctAnswer: '+3 (1 + 1 + 1 = 3)',
        explanation: '(-1 + 2) + (-3 + 4) + (-5 + 6) = 1 + 1 + 1 = +3.',
        breakdown: [
          { label: '1. pár', value: '-1 + 2 = 1' },
          { label: '2. pár', value: '-3 + 4 = 1' },
          { label: '3. pár', value: '-5 + 6 = 1' },
          { label: 'Összeg', value: '3' }
        ]
      },
      {
        id: 'q3-10',
        prompt: 'Mennyi a -50 - (-120) - 70 műveletsor eredménye?',
        highlightValue: '-50 - (-120) - 70',
        questionTypeBadge: 'Nagyobb számok műveletsora',
        options: ['0 (-50 + 120 - 70)', '+140', '-240', '-100'],
        correctAnswer: '0 (-50 + 120 - 70)',
        explanation: '-50 + 120 - 70 = 70 - 70 = 0.',
        breakdown: [
          { label: '1. lépés', value: '-50 + 120 = 70' },
          { label: '2. lépés', value: '70 - 70 = 0' }
        ]
      }
    ]
  }
};

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

interface IntegerAdditionSubtractionQuizProps {
  onBack: () => void;
}

export function IntegerAdditionSubtractionQuiz({ onBack }: IntegerAdditionSubtractionQuizProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState<DifficultyLevel | null>(null);
  const [gameMode, setGameMode] = useState<GameMode>('quiz');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showCheatSheet, setShowCheatSheet] = useState(false);

  // Fullscreen toggler
  const toggleFullscreen = async () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      try {
        if (containerRef.current.requestFullscreen) {
          await containerRef.current.requestFullscreen();
        }
      } catch (err) {
        console.error('Fullscreen request failed:', err);
      }
    } else {
      if (document.exitFullscreen) {
        await document.exitFullscreen();
      }
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Confetti on completion
  useEffect(() => {
    if (isCompleted) {
      const duration = 2.5 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };

      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) {
          return clearInterval(interval);
        }
        const particleCount = 50 * (timeLeft / duration);
        confetti({ ...defaults, particleCount, origin: { x: 0.2, y: 0.6 } });
        confetti({ ...defaults, particleCount, origin: { x: 0.8, y: 0.6 } });
      }, 350);

      return () => clearInterval(interval);
    }
  }, [isCompleted]);

  const handleStartLevel = (level: DifficultyLevel, mode: GameMode = gameMode) => {
    setSelectedLevel(level);
    setGameMode(mode);
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswerChecked(false);
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setIsCompleted(false);

    const prepared = QUIZ_LEVELS[level].questions.map((q) => ({
      ...q,
      options: shuffleArray(q.options)
    }));
    setQuestions(prepared);
  };

  const handleOptionClick = (option: string) => {
    if (isAnswerChecked) return;
    setSelectedOption(option);
    setIsAnswerChecked(true);

    const currentQ = questions[currentIndex] || (selectedLevel ? QUIZ_LEVELS[selectedLevel].questions[currentIndex] : null);
    if (!currentQ) return;

    const isCorrect = option === currentQ.correctAnswer;

    if (isCorrect) {
      const nextScore = score + 1;
      const nextStreak = streak + 1;
      setScore(nextScore);
      setStreak(nextStreak);
      if (nextStreak > bestStreak) {
        setBestStreak(nextStreak);
      }
    } else {
      setStreak(0);
    }
  };

  const handleNextQuestion = () => {
    const total = questions.length || (selectedLevel ? QUIZ_LEVELS[selectedLevel].questions.length : 0);

    if (currentIndex < total - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerChecked(false);
    } else {
      setIsCompleted(true);
    }
  };

  // Keyboard shortcut listener (1, 2, 3, 4, Enter, Space)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameMode !== 'quiz' || isCompleted || !selectedLevel) return;

      if (!isAnswerChecked) {
        const keyMap: { [key: string]: number } = {
          '1': 0,
          '2': 1,
          '3': 2,
          '4': 3
        };
        if (e.key in keyMap) {
          const optionIdx = keyMap[e.key];
          const currentQ = questions[currentIndex] || (selectedLevel ? QUIZ_LEVELS[selectedLevel].questions[currentIndex] : null);
          if (currentQ && currentQ.options[optionIdx]) {
            handleOptionClick(currentQ.options[optionIdx]);
          }
        }
      } else {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleNextQuestion();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameMode, isAnswerChecked, isCompleted, selectedLevel, currentIndex, questions]);

  // 1. Initial Level Selection Screen
  if (selectedLevel === null) {
    return (
      <div
        ref={containerRef}
        className={cn(
          "w-full max-w-5xl mx-auto px-2 sm:px-4 py-2 animate-in fade-in duration-300 text-left",
          isFullscreen && "fixed inset-0 z-50 max-w-none w-screen h-screen bg-slate-100 dark:bg-slate-950 p-4 sm:p-6 overflow-y-auto"
        )}
      >
        {/* Top bar with back button, fullscreen toggle and cheat sheet */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Vissza a témakörökhöz
          </Button>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleFullscreen}
              className="rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              title={isFullscreen ? "Kilépés a teljes képernyőből" : "Teljes képernyő"}
            >
              {isFullscreen ? (
                <>
                  <Minimize2 className="w-3.5 h-3.5 mr-1" />
                  Ablak
                </>
              ) : (
                <>
                  <Maximize2 className="w-3.5 h-3.5 mr-1" />
                  Teljes képernyő
                </>
              )}
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowCheatSheet(!showCheatSheet)}
              className="rounded-xl h-8 px-3 text-xs font-bold border-blue-300 bg-blue-50/50 text-blue-800 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800 hover:bg-blue-100"
            >
              <BookOpen className="w-3.5 h-3.5 mr-1.5 text-blue-600" />
              Műveleti segédlet
            </Button>
          </div>
        </div>

        {/* Hero Header */}
        <div className="text-center max-w-2xl mx-auto mb-4 sm:mb-5">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight flex items-center justify-center gap-2 mb-1">
            <span className="text-2xl">➕➖</span>
            <span>Egész számok összeadása és kivonása Kvíz</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Gyakorold az előjeles számok összeadását, a negatív számok kivonását és a zárójelek felbontását!
          </p>

          {/* Quick Mode Switcher in selection */}
          <div className="inline-flex flex-wrap items-center justify-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl mt-3 border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setGameMode('quiz')}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all",
                gameMode === 'quiz'
                  ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
              )}
            >
              <FileQuestion className="w-3.5 h-3.5 text-blue-500" />
              Klasszikus Kvíz
            </button>
            <button
              onClick={() => setGameMode('matcher')}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all",
                gameMode === 'matcher'
                  ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
              )}
            >
              <LayoutGrid className="w-3.5 h-3.5 text-emerald-500" />
              Kártyás Párosító
            </button>
            <button
              onClick={() => setGameMode('sorter')}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all",
                gameMode === 'sorter'
                  ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
              )}
            >
              <ArrowRightLeft className="w-3.5 h-3.5 text-cyan-500" />
              Csoportosító (Húzd a helyére)
            </button>
          </div>
        </div>

        {/* Cheat sheet popover/card */}
        {showCheatSheet && (
          <div className="mb-4 p-4 sm:p-5 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-slate-850 rounded-2xl border-2 border-blue-200 dark:border-blue-900/60 shadow-md animate-in fade-in duration-200">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm sm:text-base font-black text-blue-900 dark:text-blue-200 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-blue-600" />
                Előjeles műveletek szabályai és összefoglaló
              </h3>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setShowCheatSheet(false)}
                className="text-blue-800 dark:text-blue-300 hover:bg-blue-200/50 rounded-lg h-7 px-2 text-xs"
              >
                Bezárás
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
              {INTEGER_MATH_CHEAT_SHEET.map((item, idx) => (
                <div key={idx} className="bg-white/95 dark:bg-slate-800/95 p-2.5 rounded-xl border border-blue-100 dark:border-slate-700 shadow-xs text-left">
                  <div className="text-xs font-black text-blue-600 dark:text-blue-400">{item.topic}</div>
                  <div className="text-xs font-mono font-bold text-slate-800 dark:text-slate-100 mt-0.5">{item.formula}</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight mt-0.5">{item.note}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Difficulty Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {([1, 2, 3] as DifficultyLevel[]).map((level) => {
            const cfg = QUIZ_LEVELS[level];
            return (
              <div
                key={level}
                onClick={() => handleStartLevel(level, gameMode)}
                className="group relative bg-white dark:bg-slate-900 rounded-2xl p-5 border-2 border-slate-200/80 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 shadow-sm hover:shadow-lg transition-all duration-200 cursor-pointer flex flex-col justify-between overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-blue-500/10 to-transparent rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform" />

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform shadow-inner text-white font-black text-lg", cfg.iconBg)}>
                      {level}
                    </div>

                    <span className={cn("px-2.5 py-1 rounded-full text-[11px] font-black uppercase tracking-wider border", cfg.badgeBg, cfg.badgeBorder, cfg.badgeText)}>
                      {gameMode === 'quiz' ? '10 Kérdés' : gameMode === 'matcher' ? '8 Pár' : '10 Elem (3 csoport)'}
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-slate-900 dark:text-white mb-0.5 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {cfg.title}
                  </h3>

                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-3">
                    {cfg.subtitle}
                  </p>

                  <div className="space-y-1.5 pt-2.5 border-t border-slate-100 dark:border-slate-800 mb-4">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500 dark:text-slate-400">Tartomány:</span>
                      <span className="font-bold text-slate-800 dark:text-slate-200">{cfg.range}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500 dark:text-slate-400">Fókusz:</span>
                      <span className="font-bold text-blue-600 dark:text-blue-400 text-right truncate max-w-[140px]" title={cfg.focus}>{cfg.focus}</span>
                    </div>
                  </div>
                </div>

                <Button
                  className={cn(
                    "w-full h-10 rounded-xl font-bold text-sm shadow-xs transition-all flex items-center justify-center gap-1.5",
                    level === 1
                      ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                      : level === 2
                      ? "bg-amber-600 hover:bg-amber-700 text-white"
                      : "bg-purple-600 hover:bg-purple-700 text-white"
                  )}
                >
                  {gameMode === 'quiz' ? 'Kvíz Indítása' : gameMode === 'matcher' ? 'Párosító Indítása' : 'Csoportosító Indítása'}
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // 2. Completion Screen
  const levelConfig = QUIZ_LEVELS[selectedLevel];
  const totalQuestions = questions.length || levelConfig.questions.length;

  if (isCompleted) {
    const percentage = Math.round((score / totalQuestions) * 100);
    const isPerfect = score === totalQuestions;
    const isGood = percentage >= 70;

    return (
      <div
        ref={containerRef}
        className={cn(
          "w-full max-w-2xl mx-auto px-4 py-8 animate-in zoom-in-95 duration-300 text-center",
          isFullscreen && "fixed inset-0 z-50 max-w-none w-screen h-screen bg-slate-100 dark:bg-slate-950 p-4 sm:p-6 overflow-y-auto flex items-center justify-center"
        )}
      >
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border-2 border-slate-200/80 dark:border-slate-800 shadow-xl max-w-xl w-full">
          <div className="w-20 h-20 mx-auto mb-4 rounded-3xl bg-gradient-to-br from-amber-400 to-blue-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
            <Trophy className="w-10 h-10" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mb-1">
            {isPerfect ? 'Tökéletes Eredmény! 🏆' : isGood ? 'Szép Munka! 🌟' : 'Gyakorolj még egy kicsit! 💪'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-5">
            Sikeresen befejezted a <span className="font-bold text-slate-800 dark:text-slate-200">{levelConfig.title}</span> feladatait!
          </p>

          <div className="grid grid-cols-3 gap-3 bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 mb-6">
            <div>
              <div className="text-[11px] uppercase font-bold text-slate-400 mb-0.5">Pontszám</div>
              <div className="text-2xl font-black text-blue-600 dark:text-blue-400">{score} / {totalQuestions}</div>
            </div>
            <div className="border-x border-slate-200 dark:border-slate-700">
              <div className="text-[11px] uppercase font-bold text-slate-400 mb-0.5">Eredmény</div>
              <div className="text-2xl font-black text-slate-800 dark:text-slate-100">{percentage}%</div>
            </div>
            <div>
              <div className="text-[11px] uppercase font-bold text-slate-400 mb-0.5">Legjobb széria</div>
              <div className="text-2xl font-black text-amber-500 flex items-center justify-center gap-1">
                <Zap className="w-4 h-4 fill-current" /> {bestStreak}
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2.5">
            {selectedLevel < 3 && (
              <Button
                onClick={() => handleStartLevel((selectedLevel + 1) as DifficultyLevel, 'quiz')}
                className="flex-1 h-11 rounded-xl text-sm font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md flex items-center justify-center gap-1.5"
              >
                Következő szint: {selectedLevel + 1}. szint
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            )}

            <Button
              variant="outline"
              onClick={() => handleStartLevel(selectedLevel, 'quiz')}
              className="flex-1 h-11 rounded-xl text-sm font-bold border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <RotateCcw className="w-4 h-4 mr-1 text-slate-500" />
              Újrapróbálom
            </Button>

            <Button
              variant="ghost"
              onClick={() => setSelectedLevel(null)}
              className="h-11 rounded-xl text-sm font-bold hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Szintek
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // 3. Active View with Right-side Wordwall Sidebar
  const currentQuestion = questions[currentIndex] || levelConfig.questions[currentIndex];

  return (
    <div
      ref={containerRef}
      className={cn(
        "w-full max-w-6xl mx-auto px-2 sm:px-4 py-1 animate-in fade-in duration-200 text-left",
        isFullscreen && "fixed inset-0 z-50 max-w-none w-screen h-screen bg-slate-100 dark:bg-slate-950 p-4 sm:p-6 overflow-y-auto"
      )}
    >
      {/* Top Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 mb-2.5">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSelectedLevel(null)}
            className="h-8 rounded-xl px-2.5 border border-slate-200/80 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium text-xs"
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Szint választás
          </Button>

          {/* Fullscreen button */}
          <Button
            variant="outline"
            size="sm"
            onClick={toggleFullscreen}
            className="h-8 rounded-xl px-2.5 border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-medium text-xs hover:bg-slate-100 dark:hover:bg-slate-800"
            title={isFullscreen ? 'Kilépés a teljes képernyőből' : 'Teljes képernyős mód'}
          >
            {isFullscreen ? (
              <>
                <Minimize2 className="w-3.5 h-3.5 mr-1 text-blue-600 dark:text-blue-400" />
                <span className="hidden sm:inline">Kilépés</span>
              </>
            ) : (
              <>
                <Maximize2 className="w-3.5 h-3.5 mr-1 text-slate-500" />
                <span className="hidden sm:inline">Teljes képernyő</span>
              </>
            )}
          </Button>
        </div>

        {/* Level pills in header */}
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl border border-slate-200/60 dark:border-slate-700/60">
          {([1, 2, 3] as DifficultyLevel[]).map((lvl) => (
            <button
              key={lvl}
              onClick={() => handleStartLevel(lvl, gameMode)}
              className={cn(
                "px-2.5 py-1 rounded-lg text-xs font-black transition-all",
                selectedLevel === lvl
                  ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
              )}
            >
              {lvl === 1 ? '1. Könnyű' : lvl === 2 ? '2. Közepes' : '3. Nehéz'}
            </button>
          ))}
        </div>

        {/* Mode / Score indicator */}
        <div className="flex items-center gap-2">
          {gameMode === 'quiz' ? (
            <div className="flex items-center gap-2 bg-white dark:bg-slate-900 px-3 py-1 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-xs text-xs">
              <div className="flex items-center gap-1 font-black text-blue-600 dark:text-blue-400">
                <Trophy className="w-3.5 h-3.5" />
                <span>{score} pont</span>
              </div>
              {streak > 1 && (
                <>
                  <div className="w-px h-3 bg-slate-200 dark:bg-slate-700" />
                  <div className="flex items-center gap-1 font-black text-emerald-600 dark:text-emerald-400 animate-pulse">
                    <Zap className="w-3.5 h-3.5 fill-current" />
                    <span>{streak}x</span>
                  </div>
                </>
              )}
            </div>
          ) : gameMode === 'matcher' ? (
            <div className="flex items-center gap-1.5 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 px-3 py-1 rounded-xl border border-emerald-200 dark:border-emerald-800 text-xs font-bold">
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Párosító Mód</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 bg-cyan-50 dark:bg-cyan-950/60 text-cyan-700 dark:text-cyan-300 px-3 py-1 rounded-xl border border-cyan-200 dark:border-cyan-800 text-xs font-bold">
              <ArrowRightLeft className="w-3.5 h-3.5" />
              <span>Csoportosító Mód</span>
            </div>
          )}
        </div>
      </div>

      {/* Main Container with Wordwall Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* LEFT / CENTER: Main Game Area (9 cols on large screen) */}
        <div className="lg:col-span-9 flex flex-col gap-3">
          {gameMode === 'quiz' ? (
            /* QUIZ MODE WORKSPACE */
            <div className="space-y-3">
              {/* Slim Progress Bar */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 dark:text-slate-400 px-1">
                  <span>{levelConfig.title} feladványai</span>
                  <span>{currentIndex + 1} / {levelConfig.questions.length}</span>
                </div>
                <ProgressBar
                  current={currentIndex + 1}
                  total={levelConfig.questions.length}
                  color={selectedLevel === 1 ? 'emerald' : selectedLevel === 2 ? 'amber' : 'purple'}
                />
              </div>

              {/* 2-Column Responsive Workspace Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 items-start">
                {/* Left: Question Card + Explanation */}
                <div className="flex flex-col gap-2.5">
                  <Card className="border-2 border-slate-200/90 dark:border-slate-800 rounded-2xl shadow-xs overflow-hidden">
                    <div className="px-3.5 py-2 bg-slate-50 dark:bg-slate-850 border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                        {currentIndex + 1}. Kérdés • {currentQuestion.questionTypeBadge}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                        {levelConfig.title}
                      </span>
                    </div>

                    <CardContent className="p-4 sm:p-5 text-center">
                      <p className="text-xs sm:text-sm font-bold text-slate-600 dark:text-slate-300 mb-2.5">
                        {currentQuestion.prompt}
                      </p>

                      <div className="inline-block px-6 py-2.5 bg-gradient-to-br from-blue-50 to-indigo-50/60 dark:from-slate-850 dark:to-slate-800 rounded-2xl border-2 border-blue-200/80 dark:border-slate-700 shadow-inner">
                        <span className="text-2xl sm:text-3xl font-mono font-black tracking-wider text-slate-900 dark:text-blue-300">
                          {currentQuestion.highlightValue}
                        </span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Explanation & Next Step below question */}
                  {isAnswerChecked && (
                    <div className="space-y-2.5 animate-in fade-in slide-in-from-bottom-2 duration-200">
                      <div className={cn(
                        "p-3.5 rounded-2xl border-2 shadow-xs text-left",
                        selectedOption === currentQuestion.correctAnswer
                          ? "bg-emerald-50/90 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800/80"
                          : "bg-rose-50/90 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800/80"
                      )}>
                        <div className="flex items-start gap-2.5">
                          <div className={cn(
                            "w-7 h-7 rounded-xl flex items-center justify-center shrink-0 mt-0.5",
                            selectedOption === currentQuestion.correctAnswer
                              ? "bg-emerald-500 text-white"
                              : "bg-rose-500 text-white"
                          )}>
                            {selectedOption === currentQuestion.correctAnswer ? (
                              <CheckCircle2 className="w-4 h-4" />
                            ) : (
                              <XCircle className="w-4 h-4" />
                            )}
                          </div>

                          <div className="flex-1">
                            <h4 className={cn(
                              "text-xs sm:text-sm font-black mb-0.5",
                              selectedOption === currentQuestion.correctAnswer
                                ? "text-emerald-900 dark:text-emerald-200"
                                : "text-rose-900 dark:text-rose-200"
                            )}>
                              {selectedOption === currentQuestion.correctAnswer ? 'Helyes Válasz! 🎉' : 'Nem jó válasz! 🤔'}
                            </h4>
                            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium mb-1.5">
                              {currentQuestion.explanation}
                            </p>

                            {currentQuestion.breakdown && (
                              <div className="flex flex-wrap items-center gap-1.5 pt-1.5 border-t border-slate-200/60 dark:border-slate-700/60">
                                <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400">Levezetés:</span>
                                {currentQuestion.breakdown.map((item, bIdx) => (
                                  <span
                                    key={bIdx}
                                    className="px-1.5 py-0.5 rounded-md bg-white/90 dark:bg-slate-800/90 text-[10px] font-bold font-mono text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
                                  >
                                    {item.label}: <span className="text-blue-600 dark:text-blue-400">{item.value}</span>
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <Button
                        onClick={handleNextQuestion}
                        className="w-full h-10 rounded-xl text-sm font-bold bg-slate-900 hover:bg-slate-800 text-white dark:bg-blue-600 dark:hover:bg-blue-700 shadow-sm transition-all flex items-center justify-center gap-1.5"
                      >
                        {currentIndex < levelConfig.questions.length - 1 ? (
                          <>
                            Következő Feladat
                            <ArrowRight className="w-4 h-4 ml-1" />
                          </>
                        ) : (
                          <>
                            Eredmények Megtekintése
                            <Trophy className="w-4 h-4 ml-1 text-yellow-400" />
                          </>
                        )}
                      </Button>
                    </div>
                  )}
                </div>

                {/* Right: 4 Answer Options */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between px-1">
                    <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Válaszd ki a helyes eredményt:
                    </span>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500">
                      Gombok: [1, 2, 3, 4]
                    </span>
                  </div>

                  <div className="flex flex-col gap-2">
                    {currentQuestion.options.map((option, idx) => {
                      const isSelected = selectedOption === option;
                      const isCorrect = option === currentQuestion.correctAnswer;

                      let buttonStyle = "bg-white dark:bg-slate-900 border-2 border-slate-200/90 dark:border-slate-800 text-slate-800 dark:text-slate-100 hover:border-blue-500 hover:shadow-xs dark:hover:border-blue-500";

                      if (isAnswerChecked) {
                        if (isCorrect) {
                          buttonStyle = "bg-emerald-50 dark:bg-emerald-950/60 border-2 border-emerald-500 text-emerald-800 dark:text-emerald-200 shadow-xs";
                        } else if (isSelected && !isCorrect) {
                          buttonStyle = "bg-rose-50 dark:bg-rose-950/60 border-2 border-rose-500 text-rose-800 dark:text-rose-200 shadow-xs";
                        } else {
                          buttonStyle = "bg-slate-50/60 dark:bg-slate-900/40 border-slate-200/40 dark:border-slate-800/40 text-slate-400 dark:text-slate-600 opacity-60";
                        }
                      }

                      return (
                        <button
                          key={idx}
                          onClick={() => handleOptionClick(option)}
                          disabled={isAnswerChecked}
                          className={cn(
                            "relative min-h-13 sm:min-h-14 py-2 rounded-xl font-bold text-xs sm:text-sm transition-all duration-150 flex items-center justify-between px-4 text-left",
                            buttonStyle
                          )}
                        >
                          <span className="flex items-center gap-2.5">
                            <span className="w-6 h-6 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-xs font-sans font-bold flex items-center justify-center border border-slate-200 dark:border-slate-700 shrink-0">
                              {idx + 1}
                            </span>
                            <span className="font-bold leading-snug">{option}</span>
                          </span>

                          {isAnswerChecked && isCorrect && (
                            <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 animate-in zoom-in shrink-0 ml-2" />
                          )}
                          {isAnswerChecked && isSelected && !isCorrect && (
                            <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 animate-in zoom-in shrink-0 ml-2" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {!isAnswerChecked && (
                    <div className="p-2.5 bg-blue-50/60 dark:bg-slate-850/80 rounded-xl border border-blue-200/50 dark:border-slate-800 text-[11px] text-blue-900 dark:text-blue-300 flex items-center gap-1.5 mt-0.5">
                      <Sparkles className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span>💡 a - (-b) = a + b! A két mínusz találkozásakor mindig összeadást végzünk.</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : gameMode === 'matcher' ? (
            /* MATCHER MODE WORKSPACE */
            <IntegerAdditionSubtractionMatcher
              level={selectedLevel}
              onNextLevel={
                selectedLevel < 3
                  ? () => handleStartLevel((selectedLevel + 1) as DifficultyLevel, 'matcher')
                  : undefined
              }
              onOpenRules={() => setShowCheatSheet(true)}
            />
          ) : (
            /* SORTER / GROUPING MODE WORKSPACE */
            <IntegerAdditionSubtractionSorter
              level={selectedLevel}
              onNextLevel={
                selectedLevel < 3
                  ? () => handleStartLevel((selectedLevel + 1) as DifficultyLevel, 'sorter')
                  : undefined
              }
              onOpenRules={() => setShowCheatSheet(true)}
            />
          )}
        </div>

        {/* RIGHT: Wordwall-style Activity & Controls Sidebar (3 cols on large screen) */}
        <div className="lg:col-span-3 flex flex-col gap-3">
          {/* Wordwall Mode Card */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-3.5 border-2 border-slate-200/80 dark:border-slate-800 shadow-xs">
            <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2.5 px-1">
              <Layers className="w-3.5 h-3.5 text-blue-500" />
              <span>Sablon / Játékmód</span>
            </div>

            <div className="flex flex-col gap-1.5">
              {/* Quiz Mode Button */}
              <button
                onClick={() => setGameMode('quiz')}
                className={cn(
                  "w-full p-2.5 rounded-xl text-left font-bold text-xs transition-all flex items-center gap-2.5 border-2",
                  gameMode === 'quiz'
                    ? "bg-blue-50 dark:bg-blue-950/50 border-blue-400 text-blue-900 dark:text-blue-200 shadow-xs"
                    : "bg-slate-50/80 dark:bg-slate-800/60 border-transparent hover:border-slate-200 text-slate-600 dark:text-slate-400"
                )}
              >
                <div className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                  gameMode === 'quiz' ? "bg-blue-500 text-white" : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                )}>
                  <FileQuestion className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-black text-xs">Klasszikus Kvíz</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 font-normal">10 feladat, 4 opció</div>
                </div>
              </button>

              {/* Matcher Mode Button */}
              <button
                onClick={() => setGameMode('matcher')}
                className={cn(
                  "w-full p-2.5 rounded-xl text-left font-bold text-xs transition-all flex items-center gap-2.5 border-2",
                  gameMode === 'matcher'
                    ? "bg-emerald-50 dark:bg-emerald-950/50 border-emerald-400 text-emerald-900 dark:text-emerald-200 shadow-xs"
                    : "bg-slate-50/80 dark:bg-slate-800/60 border-transparent hover:border-slate-200 text-slate-600 dark:text-slate-400"
                )}
              >
                <div className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                  gameMode === 'matcher' ? "bg-emerald-500 text-white" : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                )}>
                  <LayoutGrid className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-black text-xs">Kártyanyitogató</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 font-normal">8 pár megkeresése</div>
                </div>
              </button>

              {/* Sorter Mode Button */}
              <button
                onClick={() => setGameMode('sorter')}
                className={cn(
                  "w-full p-2.5 rounded-xl text-left font-bold text-xs transition-all flex items-center gap-2.5 border-2",
                  gameMode === 'sorter'
                    ? "bg-cyan-50 dark:bg-cyan-950/50 border-cyan-400 text-cyan-900 dark:text-cyan-200 shadow-xs"
                    : "bg-slate-50/80 dark:bg-slate-800/60 border-transparent hover:border-slate-200 text-slate-600 dark:text-slate-400"
                )}
              >
                <div className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                  gameMode === 'sorter' ? "bg-cyan-500 text-white" : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                )}>
                  <ArrowRightLeft className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-black text-xs">Csoportosító</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 font-normal">Húzd a helyére (3 csoport)</div>
                </div>
              </button>
            </div>
          </div>

          {/* Quick Level Switcher in Sidebar */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-3.5 border-2 border-slate-200/80 dark:border-slate-800 shadow-xs">
            <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2 px-1">
              <Flame className="w-3.5 h-3.5 text-orange-500" />
              <span>Nehézségi szint</span>
            </div>

            <div className="flex flex-col gap-1">
              {([1, 2, 3] as DifficultyLevel[]).map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => handleStartLevel(lvl, gameMode)}
                  className={cn(
                    "w-full px-3 py-1.5 rounded-xl text-xs font-bold transition-all text-left flex items-center justify-between",
                    selectedLevel === lvl
                      ? "bg-slate-900 text-white dark:bg-blue-600 dark:text-white"
                      : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400"
                  )}
                >
                  <span>{lvl}. {lvl === 1 ? 'Könnyű szint' : lvl === 2 ? 'Közepes szint' : 'Nehéz szint'}</span>
                  {selectedLevel === lvl && <CheckCircle2 className="w-3.5 h-3.5" />}
                </button>
              ))}
            </div>
          </div>

          {/* Tools & Rules Actions */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-3.5 border-2 border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col gap-1.5">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleFullscreen}
              className="w-full h-9 rounded-xl border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold justify-start"
            >
              {isFullscreen ? (
                <>
                  <Minimize2 className="w-3.5 h-3.5 mr-2 text-blue-600" />
                  Kilépés a teljes képernyőből
                </>
              ) : (
                <>
                  <Maximize2 className="w-3.5 h-3.5 mr-2 text-blue-600" />
                  Teljes képernyős mód
                </>
              )}
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowCheatSheet(!showCheatSheet)}
              className="w-full h-9 rounded-xl border-blue-300 bg-blue-50/50 text-blue-800 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800 hover:bg-blue-100 text-xs font-bold justify-start"
            >
              <BookOpen className="w-3.5 h-3.5 mr-2 text-blue-600" />
              Segédlet & Szabályok
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleStartLevel(selectedLevel, gameMode)}
              className="w-full h-9 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-medium justify-start"
            >
              <RotateCcw className="w-3.5 h-3.5 mr-2" />
              Játék újraindítása
            </Button>
          </div>
        </div>
      </div>

      {/* Rules Modal Overlay */}
      {showCheatSheet && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border-2 border-blue-300 dark:border-blue-900 shadow-2xl max-w-2xl w-full text-left max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-600" />
                Az egész számok összeadásának és kivonásának szabályai
              </h3>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setShowCheatSheet(false)}
                className="text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 rounded-lg h-7 px-2 text-xs"
              >
                Bezárás
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-4">
              {INTEGER_MATH_CHEAT_SHEET.map((item, idx) => (
                <div key={idx} className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
                  <div className="text-xs font-bold text-blue-600 dark:text-blue-400">{item.topic}</div>
                  <div className="text-xs font-mono font-bold text-slate-900 dark:text-white">{item.formula}</div>
                  <div className="text-[11px] text-slate-600 dark:text-slate-300">{item.note}</div>
                </div>
              ))}
            </div>

            <Button
              onClick={() => setShowCheatSheet(false)}
              className="w-full h-10 rounded-xl font-bold bg-blue-600 hover:bg-blue-700 text-white"
            >
              Értem, bezárás
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
