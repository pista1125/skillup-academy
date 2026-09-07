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
  Target,
  Maximize2,
  Minimize2,
  ArrowRightLeft,
  Calculator,
  Minus
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { SubtractionMatcher } from './SubtractionMatcher';
import { SubtractionSorter } from './SubtractionSorter';

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

const SUBTRACTION_CHEAT_SHEET = [
  { topic: 'Fogalmak', formula: 'Kisebbítendő - Kivonandó = Különbség', note: 'Kisebbítendő (amiből elveszünk), kivonandó (amennyit elveszünk), különbség (eredmény).' },
  { topic: '0 tulajdonságai', formula: 'a - 0 = a,  a - a = 0', note: '0 kivonásakor a szám nem változik; önmagát kivonva az eredmény 0.' },
  { topic: 'NEM felcserélhető', formula: 'a - b ≠ b - a', note: 'A kivonás nem felcserélhető és nem csoportosítható (pl. 100 - 30 ≠ 30 - 100).' },
  { topic: 'Ellenőrzés (Próba)', formula: 'Különbség + Kivonandó = Kisebbítendő', note: 'A kivonást mindig ellenőrizhetjük összeadással.' },
  { topic: 'Pótlási szabály', formula: '„Alsóhoz hogy felső legyen...”', note: 'Helyiérték szerint egymás alá írjuk, jobbról balra pótoljuk a számjegyeket.' },
  { topic: 'Átlépés / Maradék', formula: 'Felső + 10, köv. alsó + 1', note: 'Ha a felső számjegy kisebb, 10-et adunk hozzá, és a következő alsóhoz 1-et adunk (maradék).' },
  { topic: 'Állandó különbség', formula: '(a + c) - (b + c) = a - b', note: 'Mindkét tagot ugyanazzal a számmal növelve a különbség nem változik.' },
  { topic: 'Előzetes becslés', formula: 'B ≈ Kü', note: 'Művelet előtt kerekítünk a durva számolási hibák elkerülésére.' }
];

const QUIZ_LEVELS: Record<DifficultyLevel, LevelConfig> = {
  1: {
    level: 1,
    title: '1. Könnyű szint',
    subtitle: 'Fejszámolás, tulajdonságok és egyszerű kivonás 1–1 000 között',
    range: '1 – 1 000',
    focus: 'Tagok elnevezése, 0 szerepe, pótlási elv, egyszerű átlépés, ellenőrzés',
    color: 'rose',
    badgeBg: 'bg-rose-50 dark:bg-rose-950/40',
    badgeBorder: 'border-rose-200 dark:border-rose-800',
    badgeText: 'text-rose-700 dark:text-rose-300',
    accentGradient: 'from-rose-500 to-pink-600',
    iconBg: 'bg-rose-500 text-white',
    questions: [
      {
        id: 'q1-1',
        prompt: 'Hogyan nevezzük a kivonás műveletében részt vevő tagokat és az eredményt?',
        highlightValue: 'a - b = c',
        questionTypeBadge: 'Alapfogalmak',
        options: ['Kisebbítendő, kivonandó, különbség', 'Összeadandók és összeg', 'Tényezők és szorzat', 'Osztandó, osztó, hányados'],
        correctAnswer: 'Kisebbítendő, kivonandó, különbség',
        explanation: 'A szám, amiből kivonunk a kisebbítendő, amit kivonunk a kivonandó, az eredmény pedig a különbség.',
        breakdown: [
          { label: 'Első tag', value: 'Kisebbítendő' },
          { label: 'Második tag', value: 'Kivonandó' },
          { label: 'Eredmény', value: 'Különbség' }
        ]
      },
      {
        id: 'q1-2',
        prompt: 'Mennyi a 750 - 320 művelet különbsége?',
        highlightValue: '750 - 320 = ?',
        questionTypeBadge: 'Fejszámolás',
        options: ['430', '530', '420', '450'],
        correctAnswer: '430',
        explanation: '700 - 300 = 400, és 50 - 20 = 30. 400 + 30 = 430.',
        breakdown: [
          { label: 'Százasok', value: '700 - 300 = 400' },
          { label: 'Tízesek', value: '50 - 20 = 30' },
          { label: 'Különbség', value: '430' }
        ]
      },
      {
        id: 'q1-3',
        prompt: 'Felcserélhetők-e a kivonás tagjai (pl. 100 - 30 = 30 - 100)?',
        highlightValue: '100 - 30 ≠ 30 - 100',
        questionTypeBadge: 'Tulajdonságok',
        options: ['Nem, a kivonás nem felcserélhető és nem csoportosítható', 'Igen, az eredmény mindig ugyanaz', 'Csak ha mindkét szám páros', 'Csak 0 esetén felcserélhető'],
        correctAnswer: 'Nem, a kivonás nem felcserélhető és nem csoportosítható',
        explanation: 'A kivonás NEM felcserélhető művelet: 100 - 30 = 70, de 30 - 100 a természetes számok körében nem végezhető el.',
        breakdown: [
          { label: 'Szabály', value: 'a - b ≠ b - a' }
        ]
      },
      {
        id: 'q1-4',
        prompt: 'Melyik összefüggéssel ellenőrizhetjük helyesen a kivonást?',
        highlightValue: 'Kivonás próbája',
        questionTypeBadge: 'Ellenőrzés',
        options: ['Különbség + Kivonandó = Kisebbítendő', 'Különbség - Kivonandó = Kisebbítendő', 'Kisebbítendő + Kivonandó = Különbség', 'Kivonandó - Különbség = Kisebbítendő'],
        correctAnswer: 'Különbség + Kivonandó = Kisebbítendő',
        explanation: 'A kivonás megfordított művelete az összeadás: ha a különbséghez hozzáadjuk a kivonandót, pontosan a kisebbítendőt kell kapnunk.',
        breakdown: [
          { label: 'Próba', value: 'Kü + K = Kisebbítendő' }
        ]
      },
      {
        id: 'q1-5',
        prompt: 'Mennyi a 624 - 258 művelet pontos különbsége?',
        highlightValue: '624 - 258 = ?',
        questionTypeBadge: 'Írásbeli kivonás',
        options: ['366', '376', '466', '356'],
        correctAnswer: '366',
        explanation: 'Egyesek: 8-hoz hogy 14 legyen kell 6, maradt 1. Tízesek: 5 + 1 = 6; 6-hoz hogy 12 legyen kell 6, maradt 1. Százasok: 2 + 1 = 3; 3-hoz hogy 6 legyen kell 3. Eredmény: 366.',
        breakdown: [
          { label: 'Egyesek', value: '8-hoz 14 ➔ 6 (maradt 1)' },
          { label: 'Tízesek', value: '6-hoz 12 ➔ 6 (maradt 1)' },
          { label: 'Százasok', value: '3-hoz 6 ➔ 3' }
        ]
      },
      {
        id: 'q1-6',
        prompt: 'Mi történik, ha egy tetszőleges számból 0-t vonunk ki (a - 0)?',
        highlightValue: 'a - 0 = ?',
        questionTypeBadge: 'A 0 tulajdonsága',
        options: ['A szám értéke változatlan marad (a)', 'Az eredmény mindig 0 lesz', 'A szám értéke 1-gyel nő', 'A szám feleződik'],
        correctAnswer: 'A szám értéke változatlan marad (a)',
        explanation: 'Ha semmit (0-t) nem veszünk el egy számból, a szám értéke nem változik (pl. 85 - 0 = 85).',
        breakdown: [
          { label: 'Szabály', value: 'a - 0 = a' }
        ]
      },
      {
        id: 'q1-7',
        prompt: 'Mennyi a 452 - 98 művelet értéke fejszámolási kerekítéssel?',
        highlightValue: '452 - 98 = ?',
        questionTypeBadge: 'Fejszámolási trükk',
        options: ['354', '352', '344', '364'],
        correctAnswer: '354',
        explanation: 'A 98 közel van a 100-hoz: 452 - 100 = 352. Mivel 2-vel többet vontunk ki, 2-t visszaadunk: 352 + 2 = 354.',
        breakdown: [
          { label: '1. lépés', value: '452 - 100 = 352' },
          { label: '2. lépés', value: '352 + 2 = 354' }
        ]
      },
      {
        id: 'q1-8',
        prompt: 'Melyik szám hiányzik az egyenlőségből: 800 - 🔲 = 340?',
        highlightValue: '800 - 🔲 = 340',
        questionTypeBadge: 'Hiányos művelet',
        options: ['460', '560', '440', '1 140'],
        correctAnswer: '460',
        explanation: 'A kivonandó kiszámítása: Kisebbítendő - Különbség = Kivonandó. 800 - 340 = 460.',
        breakdown: [
          { label: 'Számolás', value: '800 - 340 = 460' }
        ]
      },
      {
        id: 'q1-9',
        prompt: 'Melyik szám hiányzik a négyzet helyéről: 🔲 - 270 = 450?',
        highlightValue: '🔲 - 270 = 450',
        questionTypeBadge: 'Hiányos művelet',
        options: ['720', '620', '180', '820'],
        correctAnswer: '720',
        explanation: 'A kisebbítendő kiszámítása: Különbség + Kivonandó = Kisebbítendő. 450 + 270 = 720.',
        breakdown: [
          { label: 'Számolás', value: '450 + 270 = 720' }
        ]
      },
      {
        id: 'q1-10',
        prompt: 'Egy könyvtárban 420 könyv volt a polcon, kikölcsönöztek 185-öt. Hány könyv maradt a polcon?',
        highlightValue: '420 - 185 = ?',
        questionTypeBadge: 'Szöveges feladat',
        options: ['235 könyv', '245 könyv', '335 könyv', '225 könyv'],
        correctAnswer: '235 könyv',
        explanation: '420 - 185 = 420 - 100 - 80 - 5 = 320 - 80 - 5 = 240 - 5 = 235 könyv maradt.',
        breakdown: [
          { label: 'Kivonás', value: '420 - 185 = 235' }
        ]
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Közepes szint',
    subtitle: 'Többjegyű írásbeli kivonás és átlépések 1 000–100 000 között',
    range: '1 000 – 100 000',
    focus: 'Többjegyű írásbeli kivonás, nullás átlépések, kerekített becslés, állandó különbség',
    color: 'pink',
    badgeBg: 'bg-pink-50 dark:bg-pink-950/40',
    badgeBorder: 'border-pink-200 dark:border-pink-800',
    badgeText: 'text-pink-700 dark:text-pink-300',
    accentGradient: 'from-pink-500 to-rose-600',
    iconBg: 'bg-pink-600 text-white',
    questions: [
      {
        id: 'q2-1',
        prompt: 'Mennyi a 8 433 - 3 648 írásbeli kivonás pontos különbsége?',
        highlightValue: '8 433 - 3 648 = ?',
        questionTypeBadge: 'Írásbeli kivonás',
        options: ['4 785', '4 885', '4 795', '5 785'],
        correctAnswer: '4 785',
        explanation: '8-hoz 13: 5 (m: 1) ➔ 5-höz 13: 8 (m: 1) ➔ 7-hez 14: 7 (m: 1) ➔ 4-hez 8: 4. Eredmény: 4 785.',
        breakdown: [
          { label: 'Egyesek', value: '8-hoz 13 ➔ 5 (maradt 1)' },
          { label: 'Tízesek', value: '5-höz 13 ➔ 8 (maradt 1)' },
          { label: 'Százasok', value: '7-hez 14 ➔ 7 (maradt 1)' },
          { label: 'Ezresek', value: '4-hez 8 ➔ 4' }
        ]
      },
      {
        id: 'q2-2',
        prompt: 'Mennyi a 10 000 - 3 450 művelet eredménye?',
        highlightValue: '10 000 - 3 450 = ?',
        questionTypeBadge: 'Nullás átlépés',
        options: ['6 550', '6 650', '7 550', '6 450'],
        correctAnswer: '6 550',
        explanation: '10 000 - 3 000 = 7 000, 7 000 - 400 = 6 600, 6 600 - 50 = 6 550.',
        breakdown: [
          { label: 'Lépésenként', value: '10 000 - 3 450 = 6 550' }
        ]
      },
      {
        id: 'q2-3',
        prompt: 'Mennyi a 45 680 - 18 295 írásbeli kivonás pontos eredménye?',
        highlightValue: '45 680 - 18 295 = ?',
        questionTypeBadge: 'Ötjegyű kivonás',
        options: ['27 385', '27 485', '26 385', '28 385'],
        correctAnswer: '27 385',
        explanation: '5-höz 10: 5 (m: 1) ➔ 10-hez 18: 8 (m: 1) ➔ 3-hoz 6: 3 (m: 0) ➔ 8-hoz 15: 7 (m: 1) ➔ 2-höz 4: 2. Különbség: 27 385.',
        breakdown: [
          { label: 'Eredmény', value: '27 385' },
          { label: 'Ellenőrzés', value: '27 385 + 18 295 = 45 680' }
        ]
      },
      {
        id: 'q2-4',
        prompt: 'Melyik a legcélszerűbb tízezresekre kerekített becslés a 84 750 - 38 900 műveletre?',
        highlightValue: '84 750 - 38 900 ≈ ?',
        questionTypeBadge: 'Kerekítéses becslés',
        options: ['80 000 - 40 000 = 40 000', '90 000 - 30 000 = 60 000', '80 000 - 30 000 = 50 000', '100 000 - 40 000 = 60 000'],
        correctAnswer: '80 000 - 40 000 = 40 000',
        explanation: '84 750 tízezresre kerekítve 80 000, 38 900 pedig 40 000. Becsült különbség: 80 000 - 40 000 = 40 000.',
        breakdown: [
          { label: 'Kisebbítendő', value: '84 750 ≈ 80 000' },
          { label: 'Kivonandó', value: '38 900 ≈ 40 000' },
          { label: 'Becslés', value: '40 000' }
        ]
      },
      {
        id: 'q2-5',
        prompt: 'Mennyi az 5 000 - 1 347 művelet pontos értéke?',
        highlightValue: '5 000 - 1 347 = ?',
        questionTypeBadge: 'Láncolt átlépés',
        options: ['3 653', '3 753', '4 653', '3 663'],
        correctAnswer: '3 653',
        explanation: '7-hez 10: 3 (m: 1) ➔ 5-höz 10: 5 (m: 1) ➔ 4-hez 10: 6 (m: 1) ➔ 2-höz 5: 3. Eredmény: 3 653.',
        breakdown: [
          { label: 'Különbség', value: '3 653' },
          { label: 'Próba', value: '3 653 + 1 347 = 5 000' }
        ]
      },
      {
        id: 'q2-6',
        prompt: 'Melyik szám hiányzik az egyenletből: 🔲 - 14 500 = 23 800?',
        highlightValue: '🔲 - 14 500 = 23 800',
        questionTypeBadge: 'Hiányos művelet',
        options: ['38 300', '37 300', '9 300', '39 300'],
        correctAnswer: '38 300',
        explanation: 'A kisebbítendő = Különbség + Kivonandó = 23 800 + 14 500 = 38 300.',
        breakdown: [
          { label: 'Összeadás', value: '23 800 + 14 500 = 38 300' }
        ]
      },
      {
        id: 'q2-7',
        prompt: 'Mennyi a 64 000 - 27 650 művelet különbsége?',
        highlightValue: '64 000 - 27 650 = ?',
        questionTypeBadge: 'Írásbeli kivonás',
        options: ['36 350', '37 350', '36 450', '46 350'],
        correctAnswer: '36 350',
        explanation: '64 000 - 27 650 = 36 350. Próba: 36 350 + 27 650 = 64 000.',
        breakdown: [
          { label: 'Eredmény', value: '36 350' }
        ]
      },
      {
        id: 'q2-8',
        prompt: 'Az állandó különbség elvét alkalmazva mennyi az 5 342 - 1 997 művelet legegyszerűbb alakja?',
        highlightValue: '5 342 - 1 997 = ?',
        questionTypeBadge: 'Állandó különbség',
        options: ['5 345 - 2 000 = 3 345', '5 342 - 2 000 = 3 342', '5 340 - 2 000 = 3 340', '5 345 - 1 990 = 3 355'],
        correctAnswer: '5 345 - 2 000 = 3 345',
        explanation: 'Mindkét taghoz hozzáadunk 3-at: (5 342 + 3) - (1 997 + 3) = 5 345 - 2 000 = 3 345.',
        breakdown: [
          { label: 'Hozzáadás', value: '+3 mindkét taghoz' },
          { label: 'Új alak', value: '5 345 - 2 000 = 3 345' }
        ]
      },
      {
        id: 'q2-9',
        prompt: 'Egy iskola felújítási kerete 50 000 euró volt. Elköltöttek 34 820 eurót. Mennyi pénz maradt meg?',
        highlightValue: '50 000 - 34 820 = ?',
        questionTypeBadge: 'Szöveges feladat',
        options: ['15 180 euró', '16 180 euró', '15 280 euró', '14 180 euró'],
        correctAnswer: '15 180 euró',
        explanation: '50 000 - 34 820 = 15 180 euró maradt meg a keretből.',
        breakdown: [
          { label: 'Kivonás', value: '50 000 - 34 820 = 15 180' }
        ]
      },
      {
        id: 'q2-10',
        prompt: 'Mennyi a 92 105 - 46 879 írásbeli kivonás pontos eredménye?',
        highlightValue: '92 105 - 46 879 = ?',
        questionTypeBadge: 'Írásbeli kivonás',
        options: ['45 226', '46 226', '45 326', '55 226'],
        correctAnswer: '45 226',
        explanation: '9-hez 15: 6 (m: 1) ➔ 8-hoz 10: 2 (m: 1) ➔ 9-hez 11: 2 (m: 1) ➔ 7-hez 12: 5 (m: 1) ➔ 5-höz 9: 4. Eredmény: 45 226.',
        breakdown: [
          { label: 'Különbség', value: '45 226' },
          { label: 'Ellenőrzés', value: '45 226 + 46 879 = 92 105' }
        ]
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Nehéz szint',
    subtitle: 'Nagy számok, milliós különbségek és összetett műveleti sorrend',
    range: '100 000 – 10 000 000',
    focus: 'Milliós írásbeli kivonások, láncolt nullák, zárójeles műveleti sorrend, valós problémák',
    color: 'red',
    badgeBg: 'bg-red-50 dark:bg-red-950/40',
    badgeBorder: 'border-red-200 dark:border-red-800',
    badgeText: 'text-red-700 dark:text-red-300',
    accentGradient: 'from-red-600 via-rose-600 to-pink-600',
    iconBg: 'bg-red-600 text-white',
    questions: [
      {
        id: 'q3-1',
        prompt: 'Mennyi az 1 000 000 - 345 820 művelet különbsége?',
        highlightValue: '1 000 000 - 345 820 = ?',
        questionTypeBadge: 'Egymillióból kivonás',
        options: ['654 180', '654 280', '754 180', '664 180'],
        correctAnswer: '654 180',
        explanation: '1 000 000 - 345 820 = 654 180. Próba: 654 180 + 345 820 = 1 000 000.',
        breakdown: [
          { label: 'Különbség', value: '654 180' }
        ]
      },
      {
        id: 'q3-2',
        prompt: 'Mennyi a 4 580 000 - 1 890 000 művelet eredménye?',
        highlightValue: '4 580 000 - 1 890 000 = ?',
        questionTypeBadge: 'Milliós kivonás',
        options: ['2 690 000', '2 790 000', '3 690 000', '2 590 000'],
        correctAnswer: '2 690 000',
        explanation: '4 580 000 - 1 890 000 = (4 580 - 1 890) ezer = 2 690 ezer = 2 690 000.',
        breakdown: [
          { label: 'Eredmény', value: '2 690 000' }
        ]
      },
      {
        id: 'q3-3',
        prompt: 'Mennyi az 5 000 000 - 1 648 235 pontos különbsége?',
        highlightValue: '5 000 000 - 1 648 235 = ?',
        questionTypeBadge: 'Láncolt nullás átlépés',
        options: ['3 351 765', '3 451 765', '4 351 765', '3 351 865'],
        correctAnswer: '3 351 765',
        explanation: 'Írásbeli pótlás: 5-höz 10: 5 (m:1), 4-hez 10: 6 (m:1), 3-hoz 10: 7 (m:1), 9-hez 10: 1 (m:1), 5-höz 10: 5 (m:1), 7-hez 10: 3 (m:1), 2-höz 5: 3. Eredmény: 3 351 765.',
        breakdown: [
          { label: 'Különbség', value: '3 351 765' }
        ]
      },
      {
        id: 'q3-4',
        prompt: 'Mennyi a 7 240 500 - 3 850 600 írásbeli kivonás eredménye?',
        highlightValue: '7 240 500 - 3 850 600 = ?',
        questionTypeBadge: 'Hétjegyű kivonás',
        options: ['3 389 900', '3 489 900', '4 389 900', '3 399 900'],
        correctAnswer: '3 389 900',
        explanation: '7 240 500 - 3 850 600 = 3 389 900. Próba: 3 389 900 + 3 850 600 = 7 240 500.',
        breakdown: [
          { label: 'Különbség', value: '3 389 900' }
        ]
      },
      {
        id: 'q3-5',
        prompt: 'Melyik szám hiányzik: 8 500 000 - 🔲 = 3 750 000?',
        highlightValue: '8 500 000 - 🔲 = 3 750 000',
        questionTypeBadge: 'Hiányos művelet',
        options: ['4 750 000', '5 750 000', '4 850 000', '12 250 000'],
        correctAnswer: '4 750 000',
        explanation: 'Kivonandó = Kisebbítendő - Különbség = 8 500 000 - 3 750 000 = 4 750 000.',
        breakdown: [
          { label: 'Számolás', value: '8 500 000 - 3 750 000 = 4 750 000' }
        ]
      },
      {
        id: 'q3-6',
        prompt: 'Mennyi a (4 500 000 + 1 200 000) - 2 850 000 művelet eredménye?',
        highlightValue: '(4 500 000 + 1 200 000) - 2 850 000 = ?',
        questionTypeBadge: 'Műveleti sorrend',
        options: ['2 850 000', '2 950 000', '3 850 000', '1 850 000'],
        correctAnswer: '2 850 000',
        explanation: 'Először a zárójelben lévő összeadást végezzük el: 4 500 000 + 1 200 000 = 5 700 000. Ezután kivonunk: 5 700 000 - 2 850 000 = 2 850 000.',
        breakdown: [
          { label: '1. Zárójel', value: '5 700 000' },
          { label: '2. Kivonás', value: '5 700 000 - 2 850 000 = 2 850 000' }
        ]
      },
      {
        id: 'q3-7',
        prompt: 'Mennyi a 10 000 000 - 1 művelet pontos eredménye?',
        highlightValue: '10 000 000 - 1 = ?',
        questionTypeBadge: 'Szomszédos számok',
        options: ['9 999 999', '9 999 990', '9 900 000', '10 000 001'],
        correctAnswer: '9 999 999',
        explanation: 'A 10 millió közvetlen bal oldali egyes szomszédja (kisebb számszomszédja) a 9 millió 999 ezer 999.',
        breakdown: [
          { label: 'Különbség', value: '9 999 999' }
        ]
      },
      {
        id: 'q3-8',
        prompt: 'Mennyi a 6 345 820 - 4 198 750 pontos különbsége?',
        highlightValue: '6 345 820 - 4 198 750 = ?',
        questionTypeBadge: 'Írásbeli kivonás',
        options: ['2 147 070', '2 247 070', '2 147 170', '1 147 070'],
        correctAnswer: '2 147 070',
        explanation: '0-hoz 0: 0 ➔ 5-höz 12: 7 (m: 1) ➔ 8-hoz 8: 0 (m: 0) ➔ 8-hoz 15: 7 (m: 1) ➔ 10-hez 14: 4 (m: 1) ➔ 2-höz 3: 1 (m: 0) ➔ 4-hez 6: 2. Eredmény: 2 147 070.',
        breakdown: [
          { label: 'Eredmény', value: '2 147 070' }
        ]
      },
      {
        id: 'q3-9',
        prompt: 'Egy nagyváros lakossága 1 250 000 fő, a környező kistérségé 875 400 fő. Hány fővel élnek többen a nagyvárosban?',
        highlightValue: '1 250 000 - 875 400 = ?',
        questionTypeBadge: 'Szöveges feladat',
        options: ['374 600 fővel', '384 600 fővel', '474 600 fővel', '375 600 fővel'],
        correctAnswer: '374 600 fővel',
        explanation: '1 250 000 - 875 400 = 374 600 fővel nagyobb a lakosság.',
        breakdown: [
          { label: 'Különbség', value: '374 600 fő' }
        ]
      },
      {
        id: 'q3-10',
        prompt: 'Mennyi a 8 000 000 - (3 450 000 - 1 250 000) kifejezés pontos értéke?',
        highlightValue: '8 000 000 - (3 450 000 - 1 250 000) = ?',
        questionTypeBadge: 'Zárójeles művelet',
        options: ['5 800 000', '6 800 000', '4 800 000', '5 700 000'],
        correctAnswer: '5 800 000',
        explanation: 'Zárójelben: 3 450 000 - 1 250 000 = 2 200 000. Ezután: 8 000 000 - 2 200 000 = 5 800 000.',
        breakdown: [
          { label: '1. Zárójel', value: '2 200 000' },
          { label: '2. Kivonás', value: '8 000 000 - 2 200 000 = 5 800 000' }
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

interface SubtractionQuizProps {
  onBack: () => void;
}

export function SubtractionQuiz({ onBack }: SubtractionQuizProps) {
  const [selectedLevel, setSelectedLevel] = useState<DifficultyLevel | null>(null);
  const [gameMode, setGameMode] = useState<GameMode>('quiz');
  const [showCheatSheet, setShowCheatSheet] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Active Quiz State
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);

  const containerRef = useRef<HTMLDivElement>(null);

  // Toggle fullscreen
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      if (containerRef.current?.requestFullscreen) {
        containerRef.current.requestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const handleStartLevel = (level: DifficultyLevel, mode: GameMode = gameMode) => {
    setSelectedLevel(level);
    setGameMode(mode);
    setCurrentIndex(0);
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setSelectedOption(null);
    setIsAnswerChecked(false);
    setIsCompleted(false);

    // Prepare questions with shuffled options
    const levelQuestions = QUIZ_LEVELS[level].questions.map((q) => ({
      ...q,
      options: shuffleArray(q.options)
    }));
    setQuestions(levelQuestions);
  };

  const handleOptionSelect = (option: string) => {
    if (isAnswerChecked) return;
    setSelectedOption(option);
    setIsAnswerChecked(true);

    const currentQ = questions[currentIndex];
    if (option === currentQ.correctAnswer) {
      setScore((prev) => prev + 1);
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > bestStreak) setBestStreak(newStreak);
    } else {
      setStreak(0);
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerChecked(false);
    } else {
      setIsCompleted(true);
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    }
  };

  // Keyboard shortcut listener [1, 2, 3, 4]
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedLevel === null || gameMode !== 'quiz' || isCompleted) return;

      const currentQ = questions[currentIndex];
      if (!currentQ) return;

      if (!isAnswerChecked) {
        if (['1', '2', '3', '4'].includes(e.key)) {
          const optIdx = parseInt(e.key, 10) - 1;
          if (currentQ.options[optIdx]) {
            handleOptionSelect(currentQ.options[optIdx]);
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
  }, [selectedLevel, gameMode, currentIndex, isAnswerChecked, isCompleted, questions]);

  // 1. Initial Difficulty Level Selection Screen
  if (selectedLevel === null) {
    return (
      <div
        ref={containerRef}
        className={cn(
          "w-full max-w-5xl mx-auto px-2 sm:px-4 py-3 animate-in fade-in duration-300 text-left",
          isFullscreen && "fixed inset-0 z-50 max-w-none w-screen h-screen bg-slate-100 dark:bg-slate-950 p-4 sm:p-6 overflow-y-auto"
        )}
      >
        {/* Top Header */}
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
              className="h-8 rounded-xl px-2.5 border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-medium text-xs hover:bg-slate-100 dark:hover:bg-slate-800"
              title={isFullscreen ? 'Kilépés a teljes képernyőből' : 'Teljes képernyős mód'}
            >
              {isFullscreen ? (
                <>
                  <Minimize2 className="w-3.5 h-3.5 mr-1 text-rose-600 dark:text-rose-400" />
                  <span className="hidden sm:inline">Kilépés</span>
                </>
              ) : (
                <>
                  <Maximize2 className="w-3.5 h-3.5 mr-1 text-slate-500" />
                  <span className="hidden sm:inline">Teljes képernyő</span>
                </>
              )}
            </Button>

            <Button
              size="sm"
              variant="outline"
              onClick={() => setShowCheatSheet(!showCheatSheet)}
              className="h-8 rounded-xl px-2.5 border-rose-300 bg-rose-50/50 text-rose-800 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800 hover:bg-rose-100 text-xs font-bold"
            >
              <BookOpen className="w-3.5 h-3.5 mr-1 text-rose-600" />
              Szabályzat
            </Button>
          </div>
        </div>

        {/* Hero Header */}
        <div className="text-center max-w-2xl mx-auto mb-4 sm:mb-5">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight flex items-center justify-center gap-2 mb-1">
            <span className="text-2xl">➖</span>
            <span>Kivonás, írásbeli kivonás Kvíz</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Gyakorold a fejszámolást, a pótlási elvet és a többjegyű írásbeli kivonást átlépésekkel!
          </p>

          {/* Quick Mode Switcher in selection */}
          <div className="inline-flex flex-wrap items-center justify-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl mt-3 border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setGameMode('quiz')}
              className={cn(
                "flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all",
                gameMode === 'quiz'
                  ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
              )}
            >
              <FileQuestion className="w-3.5 h-3.5 text-rose-500" />
              Klasszikus Kvíz
            </button>
            <button
              onClick={() => setGameMode('matcher')}
              className={cn(
                "flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all",
                gameMode === 'matcher'
                  ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
              )}
            >
              <LayoutGrid className="w-3.5 h-3.5 text-pink-500" />
              Kártyás Párosító
            </button>
            <button
              onClick={() => setGameMode('sorter')}
              className={cn(
                "flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all",
                gameMode === 'sorter'
                  ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
              )}
            >
              <ArrowRightLeft className="w-3.5 h-3.5 text-purple-500" />
              Csoportosító (Húzd a helyére)
            </button>
          </div>
        </div>

        {/* Cheat sheet popover/card */}
        {showCheatSheet && (
          <div className="mb-4 p-4 sm:p-5 bg-gradient-to-br from-rose-50 to-pink-50 dark:from-slate-900 dark:to-slate-850 rounded-2xl border-2 border-rose-200 dark:border-rose-900/60 shadow-md animate-in fade-in duration-200">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm sm:text-base font-black text-rose-900 dark:text-rose-200 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-rose-600" />
                Kivonás szabályai és összefoglaló
              </h3>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setShowCheatSheet(false)}
                className="text-rose-800 dark:text-rose-300 hover:bg-rose-200/50 rounded-lg h-7 px-2 text-xs"
              >
                Bezárás
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
              {SUBTRACTION_CHEAT_SHEET.map((item, idx) => (
                <div key={idx} className="bg-white/95 dark:bg-slate-800/95 p-2.5 rounded-xl border border-rose-100 dark:border-slate-700 shadow-xs text-left">
                  <div className="text-xs font-black text-rose-600 dark:text-rose-400">{item.topic}</div>
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
                className="group relative bg-white dark:bg-slate-900 rounded-2xl p-5 border-2 border-slate-200/80 dark:border-slate-800 hover:border-rose-500 dark:hover:border-rose-500 shadow-sm hover:shadow-lg transition-all duration-200 cursor-pointer flex flex-col justify-between overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-rose-500/10 to-transparent rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform" />

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform shadow-inner text-white font-black text-lg", cfg.iconBg)}>
                      {level}
                    </div>

                    <span className={cn("px-2.5 py-1 rounded-full text-[11px] font-black uppercase tracking-wider border", cfg.badgeBg, cfg.badgeBorder, cfg.badgeText)}>
                      {gameMode === 'quiz' ? '10 Kérdés' : gameMode === 'matcher' ? '8 Pár' : '10-11 Elem (3 csoport)'}
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-slate-900 dark:text-white mb-0.5 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
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
                      <span className="font-bold text-rose-600 dark:text-rose-400 text-right truncate max-w-[140px]" title={cfg.focus}>{cfg.focus}</span>
                    </div>
                  </div>
                </div>

                <Button
                  className={cn(
                    "w-full h-10 rounded-xl font-bold text-sm shadow-xs transition-all flex items-center justify-center gap-1.5",
                    level === 1
                      ? "bg-rose-600 hover:bg-rose-700 text-white"
                      : level === 2
                      ? "bg-pink-600 hover:bg-pink-700 text-white"
                      : "bg-red-600 hover:bg-red-700 text-white"
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
          <div className="w-20 h-20 mx-auto mb-4 rounded-3xl bg-gradient-to-br from-rose-400 to-pink-600 flex items-center justify-center text-white shadow-lg shadow-rose-500/30">
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
              <div className="text-2xl font-black text-rose-600 dark:text-rose-400">{score} / {totalQuestions}</div>
            </div>
            <div className="border-x border-slate-200 dark:border-slate-700">
              <div className="text-[11px] uppercase font-bold text-slate-400 mb-0.5">Eredmény</div>
              <div className="text-2xl font-black text-slate-800 dark:text-slate-100">{percentage}%</div>
            </div>
            <div>
              <div className="text-[11px] uppercase font-bold text-slate-400 mb-0.5">Legjobb széria</div>
              <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 flex items-center justify-center gap-1">
                <Zap className="w-4 h-4 fill-current" /> {bestStreak}
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2.5">
            {selectedLevel < 3 && (
              <Button
                onClick={() => handleStartLevel((selectedLevel + 1) as DifficultyLevel, 'quiz')}
                className="flex-1 h-11 rounded-xl text-sm font-bold bg-rose-600 hover:bg-rose-700 text-white shadow-md flex items-center justify-center gap-1.5"
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

          <Button
            variant="outline"
            size="sm"
            onClick={toggleFullscreen}
            className="h-8 rounded-xl px-2.5 border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-medium text-xs hover:bg-slate-100 dark:hover:bg-slate-800"
            title={isFullscreen ? 'Kilépés a teljes képernyőből' : 'Teljes képernyős mód'}
          >
            {isFullscreen ? (
              <>
                <Minimize2 className="w-3.5 h-3.5 mr-1 text-rose-600 dark:text-rose-400" />
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
              <div className="flex items-center gap-1 font-black text-rose-600 dark:text-rose-400">
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
            <div className="flex items-center gap-1.5 bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 px-3 py-1 rounded-xl border border-purple-200 dark:border-purple-800 text-xs font-bold">
              <ArrowRightLeft className="w-3.5 h-3.5" />
              <span>Csoportosító Mód</span>
            </div>
          )}
        </div>
      </div>

      {/* Main Container with Wordwall Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* LEFT / CENTER: Main Game Area */}
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
                  color={selectedLevel === 1 ? 'rose' : selectedLevel === 2 ? 'pink' : 'purple'}
                />
              </div>

              {/* 2-Column Workspace Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 items-start">
                {/* Left: Question Card + Explanation */}
                <div className="flex flex-col gap-2.5">
                  <Card className="border-2 border-slate-200/90 dark:border-slate-800 rounded-2xl shadow-xs overflow-hidden">
                    <div className="px-3.5 py-2 bg-slate-50 dark:bg-slate-850 border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                        {currentIndex + 1}. Kérdés • {currentQuestion.questionTypeBadge}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
                        {levelConfig.title}
                      </span>
                    </div>

                    <CardContent className="p-4 sm:p-5 text-center">
                      <p className="text-xs sm:text-sm font-bold text-slate-600 dark:text-slate-300 mb-2.5">
                        {currentQuestion.prompt}
                      </p>

                      <div className="inline-block px-6 py-2.5 bg-gradient-to-br from-rose-50 to-pink-50/60 dark:from-slate-850 dark:to-slate-800 rounded-2xl border-2 border-rose-200/80 dark:border-slate-700 shadow-inner">
                        <span className="text-2xl sm:text-3xl font-mono font-black tracking-wider text-slate-900 dark:text-rose-300">
                          {currentQuestion.highlightValue}
                        </span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Explanation & Next Step */}
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
                                    className="text-[10px] bg-white/80 dark:bg-slate-900/80 px-2 py-0.5 rounded-md font-mono border border-slate-200/80 dark:border-slate-700 font-bold"
                                  >
                                    <span className="text-slate-400 mr-1">{item.label}:</span>
                                    <span className="text-slate-800 dark:text-slate-200">{item.value}</span>
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <Button
                        onClick={handleNextQuestion}
                        className="w-full h-11 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm shadow-md flex items-center justify-center gap-1.5 animate-pulse"
                      >
                        {currentIndex < questions.length - 1 ? (
                          <>
                            <span>Következő kérdés</span>
                            <ArrowRight className="w-4 h-4" />
                          </>
                        ) : (
                          <>
                            <span>Eredmények megtekintése</span>
                            <Trophy className="w-4 h-4" />
                          </>
                        )}
                      </Button>
                    </div>
                  )}
                </div>

                {/* Right: Options Grid */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between px-1">
                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Válassz megoldást:</span>
                    <span className="text-[10px] text-slate-400 italic">Gyorsbillentyűk: [1, 2, 3, 4]</span>
                  </div>

                  <div className="grid grid-cols-1 gap-2">
                    {currentQuestion.options.map((option, idx) => {
                      const isSelected = selectedOption === option;
                      const isCorrect = option === currentQuestion.correctAnswer;

                      return (
                        <button
                          key={idx}
                          onClick={() => handleOptionSelect(option)}
                          disabled={isAnswerChecked}
                          className={cn(
                            "w-full p-3.5 rounded-2xl border-2 text-left font-mono text-xs sm:text-sm font-bold transition-all flex items-center justify-between select-none shadow-xs group",
                            !isAnswerChecked && [
                              "bg-white dark:bg-slate-900 border-slate-200/90 dark:border-slate-800",
                              "hover:border-rose-400 dark:hover:border-rose-500 hover:bg-rose-50/40 dark:hover:bg-rose-950/30",
                              "active:scale-[0.99]"
                            ],
                            isAnswerChecked && isCorrect && [
                              "bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-900 dark:text-emerald-100 ring-2 ring-emerald-500/20"
                            ],
                            isAnswerChecked && isSelected && !isCorrect && [
                              "bg-rose-50 dark:bg-rose-950/60 border-rose-500 text-rose-900 dark:text-rose-100"
                            ],
                            isAnswerChecked && !isSelected && !isCorrect && [
                              "opacity-40 bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-800"
                            ]
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
                    <div className="p-2.5 bg-rose-50/60 dark:bg-slate-850/80 rounded-xl border border-rose-200/50 dark:border-slate-800 text-[11px] text-rose-900 dark:text-rose-300 flex items-center gap-1.5 mt-0.5">
                      <Sparkles className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                      <span>Tipp: Figyeld a helyiértékeket és a pótlási elvet!</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : gameMode === 'matcher' ? (
            /* MATCHER MODE WORKSPACE */
            <SubtractionMatcher
              level={selectedLevel}
              onNextLevel={
                selectedLevel < 3
                  ? () => handleStartLevel((selectedLevel + 1) as DifficultyLevel, 'matcher')
                  : undefined
              }
              onOpenRules={() => setShowCheatSheet(true)}
            />
          ) : (
            /* SORTER MODE WORKSPACE */
            <SubtractionSorter
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

        {/* RIGHT: Wordwall-style Activity & Controls Sidebar */}
        <div className="lg:col-span-3 flex flex-col gap-3">
          {/* Wordwall Mode Card */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-3.5 border-2 border-slate-200/80 dark:border-slate-800 shadow-xs">
            <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2.5 px-1">
              <Layers className="w-3.5 h-3.5 text-rose-500" />
              <span>Sablon / Játékmód</span>
            </div>

            <div className="flex flex-col gap-1.5">
              {/* Quiz Mode Button */}
              <button
                onClick={() => setGameMode('quiz')}
                className={cn(
                  "w-full p-2.5 rounded-xl text-left font-bold text-xs transition-all flex items-center gap-2.5 border-2",
                  gameMode === 'quiz'
                    ? "bg-rose-50 dark:bg-rose-950/50 border-rose-400 text-rose-900 dark:text-rose-200 shadow-xs"
                    : "bg-slate-50/80 dark:bg-slate-800/60 border-transparent hover:border-slate-200 text-slate-600 dark:text-slate-400"
                )}
              >
                <div className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                  gameMode === 'quiz' ? "bg-rose-500 text-white" : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
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
                    ? "bg-pink-50 dark:bg-pink-950/50 border-pink-400 text-pink-900 dark:text-pink-200 shadow-xs"
                    : "bg-slate-50/80 dark:bg-slate-800/60 border-transparent hover:border-slate-200 text-slate-600 dark:text-slate-400"
                )}
              >
                <div className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                  gameMode === 'matcher' ? "bg-pink-500 text-white" : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
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
                    ? "bg-purple-50 dark:bg-purple-950/50 border-purple-400 text-purple-900 dark:text-purple-200 shadow-xs"
                    : "bg-slate-50/80 dark:bg-slate-800/60 border-transparent hover:border-slate-200 text-slate-600 dark:text-slate-400"
                )}
              >
                <div className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                  gameMode === 'sorter' ? "bg-purple-500 text-white" : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
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
                      ? "bg-slate-900 text-white dark:bg-rose-600 dark:text-white"
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
                  <Minimize2 className="w-3.5 h-3.5 mr-2 text-rose-600" />
                  Kilépés a teljes képernyőből
                </>
              ) : (
                <>
                  <Maximize2 className="w-3.5 h-3.5 mr-2 text-rose-600" />
                  Teljes képernyős mód
                </>
              )}
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowCheatSheet(!showCheatSheet)}
              className="w-full h-9 rounded-xl border-rose-300 bg-rose-50/50 text-rose-800 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800 hover:bg-rose-100 text-xs font-bold justify-start"
            >
              <BookOpen className="w-3.5 h-3.5 mr-2 text-rose-600" />
              Kivonási segédlet
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
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border-2 border-rose-300 dark:border-rose-900 shadow-2xl max-w-2xl w-full text-left">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-rose-600" />
                A kivonás szabályai és tulajdonságai
              </h3>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setShowCheatSheet(false)}
                className="rounded-xl h-8 px-2 text-xs"
              >
                Bezárás
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5 mb-4">
              {SUBTRACTION_CHEAT_SHEET.map((item, idx) => (
                <div key={idx} className="bg-slate-50 dark:bg-slate-850 p-3 rounded-xl border border-slate-200/80 dark:border-slate-700">
                  <div className="text-xs font-black text-rose-600 dark:text-rose-400">{item.topic}</div>
                  <div className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200 mt-0.5">{item.formula}</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">{item.note}</div>
                </div>
              ))}
            </div>

            <div className="text-xs text-slate-600 dark:text-slate-400 bg-rose-50/80 dark:bg-rose-950/40 p-3 rounded-xl border border-rose-200 dark:border-rose-900/60 leading-relaxed mb-4 space-y-1">
              <p><strong>Pótlási elv:</strong> <em>„Alsó számhoz mennyit kell adni, hogy a felsőt kapjuk?”</em></p>
              <p><strong>Állandó különbség:</strong> <em>(a + c) - (b + c) = a - b</em> (mindkét tag növelése).</p>
              <p><strong>Írásbeli kivonás:</strong> Jobbra igazítva egymás alá írjuk a helyiértékeket, jobbról balra haladunk, és a maradékot az alsó számhoz adjuk a következő oszlopban.</p>
            </div>

            <Button
              onClick={() => setShowCheatSheet(false)}
              className="w-full h-10 rounded-xl font-bold bg-rose-600 hover:bg-rose-700 text-white"
            >
              Értem, folytatom a játékot!
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SubtractionQuiz;
