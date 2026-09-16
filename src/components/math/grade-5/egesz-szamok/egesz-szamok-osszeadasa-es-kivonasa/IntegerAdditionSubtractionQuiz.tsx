import React from 'react';
import { QuizTemplate, QuizLevelConfig, CheatSheetItem, DifficultyLevel } from '../QuizTemplate';
import { IntegerAdditionSubtractionMatcher } from './IntegerAdditionSubtractionMatcher';
import { IntegerAdditionSubtractionSorter } from './IntegerAdditionSubtractionSorter';

export type { DifficultyLevel };

export interface IntegerAdditionSubtractionQuizProps {
  onBack: () => void;
  onSwitchToTheory?: () => void;
}

export const INTEGER_MATH_CHEAT_SHEET: CheatSheetItem[] = [
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

export const INTEGER_QUIZ_LEVELS: Record<DifficultyLevel, QuizLevelConfig> = {
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

export function IntegerAdditionSubtractionQuiz({
  onBack,
  onSwitchToTheory
}: IntegerAdditionSubtractionQuizProps) {
  return (
    <QuizTemplate
      topicId="g5-integer-addition-subtraction"
      topicTitle="Egész számok összeadása és kivonása"
      grade={5}
      chapterId="egesz-szamok"
      title="Egész számok összeadása és kivonása - Gyakorló Kvíz"
      topicBadge="➕➖ 5. Osztály • I. Az egész számok"
      badgeText="➕➖ 5. Osztály • I. Az egész számok"
      badgeColor="blue"
      levels={INTEGER_QUIZ_LEVELS}
      cheatSheet={INTEGER_MATH_CHEAT_SHEET}
      onBack={onBack}
      onSwitchToTheory={onSwitchToTheory}
      matcherComponent={<IntegerAdditionSubtractionMatcher onBack={onBack} onSwitchToTheory={onSwitchToTheory} />}
      sorterComponent={<IntegerAdditionSubtractionSorter onBack={onBack} onSwitchToTheory={onSwitchToTheory} />}
    />
  );
}

export default IntegerAdditionSubtractionQuiz;
