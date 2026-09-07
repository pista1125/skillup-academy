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
  ArrowRightLeft,
  Calculator
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { DivisionMatcher } from './DivisionMatcher';
import { DivisionSorter } from './DivisionSorter';

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

const DIVISION_CHEAT_SHEET = [
  { topic: 'Tagok', formula: 'osztandó : osztó = hányados', note: 'Az osztandó a szétosztandó szám, az osztó amivel osztunk, az eredmény a hányados.' },
  { topic: '0 a nevezőben / osztóban', formula: 'a : 0 = ÉRTELMETLEN!', note: 'Nullával való osztás szigorúan tilos és értelmetlen a matematikában.' },
  { topic: '0 osztása', formula: '0 : a = 0 (ha a ≠ 0)', note: 'Ha nullát osztunk el egy számmal, a hányados mindig nulla.' },
  { topic: 'Maradék szabálya', formula: '0 ≤ Maradék < Osztó', note: 'A maradék soha nem lehet nagyobb vagy egyenlő az osztóval.' },
  { topic: 'Ellenőrzés', formula: 'Osztandó = Osztó · Hányados + Maradék', note: 'Visszaszorzással és a maradék hozzáadásával ellenőrizzük a helyes megoldást.' },
  { topic: '10, 100, 1000 osztása', formula: 'Nullák elhagyása', note: 'Záró nullák elhagyása a helyiérték eltolásnak megfelelően.' },
  { topic: 'Kétjegyű osztás', formula: 'Kijelölés ➔ Becslés ➔ Visszaszorzás ➔ Lehozás', note: 'Balról kijelölünk, kerekítve megbecsüljük a hányadosjegyet, levonjuk a maradékot és lehozzuk a következő jegyet.' }
];

const QUIZ_LEVELS: Record<DifficultyLevel, LevelConfig> = {
  1: {
    level: 1,
    title: '1. Könnyű szint',
    subtitle: 'Alapfogalmak, fejszámolás, nullák szabályai és maradékos osztás alapjai 1–1 000 között',
    range: '1 – 1 000',
    focus: 'Osztandó, osztó, hányados, maradék feltétele, 0 szabályai, 10-zel/100-zal osztás',
    color: 'indigo',
    badgeBg: 'bg-indigo-50 dark:bg-indigo-950/40',
    badgeBorder: 'border-indigo-200 dark:border-indigo-800',
    badgeText: 'text-indigo-700 dark:text-indigo-300',
    accentGradient: 'from-indigo-500 to-blue-600',
    iconBg: 'bg-indigo-600 text-white',
    questions: [
      {
        id: 'q1-1',
        prompt: 'Hogyan nevezzük az osztás műveletében a tagokat és az eredményt?',
        highlightValue: 'a : b = c',
        questionTypeBadge: 'Alapfogalmak',
        options: ['Osztandó, osztó, hányados', 'Tényezők és szorzat', 'Kisebbítendő, kivonandó, különbség', 'Tagok és összeg'],
        correctAnswer: 'Osztandó, osztó, hányados',
        explanation: 'Az osztásban az "a" az osztandó, a "b" az osztó, a "c" pedig a hányados.',
        breakdown: [
          { label: 'Első tag (a)', value: 'Osztandó' },
          { label: 'Második tag (b)', value: 'Osztó' },
          { label: 'Eredmény (c)', value: 'Hányados' }
        ]
      },
      {
        id: 'q1-2',
        prompt: 'Mennyi a 540 : 10 művelet hányadosa?',
        highlightValue: '540 : 10 = ?',
        questionTypeBadge: 'Fejszámolás',
        options: ['54', '540', '5,4', '5400'],
        correctAnswer: '54',
        explanation: '10-zel osztva egy nullát hagyunk el a szám végéről: 540 : 10 = 54.',
        breakdown: [
          { label: 'Szabály', value: '1 nulla elhagyása' },
          { label: 'Hányados', value: '54' }
        ]
      },
      {
        id: 'q1-3',
        prompt: 'Mi a helyes válasz a 84 : 0 műveletre?',
        highlightValue: '84 : 0 = ?',
        questionTypeBadge: '0-val való osztás',
        options: ['Értelmetlen (0-val nem osztunk)', '0', '84', '1'],
        correctAnswer: 'Értelmetlen (0-val nem osztunk)',
        explanation: 'A matematikában nullával osztani szigorúan tilos és értelmetlen!',
        breakdown: [
          { label: 'Szabály', value: 'Nullával nem osztunk!' }
        ]
      },
      {
        id: 'q1-4',
        prompt: 'Mennyi a 0 : 8 művelet eredménye?',
        highlightValue: '0 : 8 = ?',
        questionTypeBadge: 'Nulla osztása',
        options: ['0', '8', 'Értelmetlen', '1'],
        correctAnswer: '0',
        explanation: 'Nullát bármilyen nullától különböző számmal elosztva az eredmény mindig 0 (0 : 8 = 0).',
        breakdown: [
          { label: 'Szabály', value: '0 : a = 0 (ha a ≠ 0)' }
        ]
      },
      {
        id: 'q1-5',
        prompt: 'Mennyi a 72 : 8 fejszámolási művelet pontos eredménye?',
        highlightValue: '72 : 8 = ?',
        questionTypeBadge: 'Szorzótábla ismeret',
        options: ['9', '8', '7', '6'],
        correctAnswer: '9',
        explanation: 'Mivel 9 · 8 = 72, ezért 72 : 8 = 9.',
        breakdown: [
          { label: 'Visszaszorzás', value: '9 · 8 = 72' }
        ]
      },
      {
        id: 'q1-6',
        prompt: 'Mennyi a 45 : 7 maradékos osztás hányadosa és maradéka?',
        highlightValue: '45 : 7 = ?',
        questionTypeBadge: 'Maradékos osztás',
        options: ['6, maradék: 3', '6, maradék: 5', '7, maradék: 3', '5, maradék: 10'],
        correctAnswer: '6, maradék: 3',
        explanation: '6 · 7 = 42, és 45 - 42 = 3. A hányados 6, a maradék 3 (3 < 7 ✓).',
        breakdown: [
          { label: 'Szorzat', value: '6 · 7 = 42' },
          { label: 'Maradék', value: '45 - 42 = 3' }
        ]
      },
      {
        id: 'q1-7',
        prompt: 'Melyik feltételnek kell MINDIG teljesülnie a maradékra természetes számok osztásakor?',
        highlightValue: '0 ≤ Maradék < Osztó',
        questionTypeBadge: 'Maradék feltétele',
        options: ['A maradék mindig kisebb az osztónál', 'A maradék mindig nagyobb az osztónál', 'A maradék bármekkora szám lehet', 'A maradék mindig páros szám'],
        correctAnswer: 'A maradék mindig kisebb az osztónál',
        explanation: 'A maradékos osztás alaptétele szerint a maradéknak kisebbnek kell lennie az osztónál (0 ≤ maradék < osztó).',
        breakdown: [
          { label: 'Képlet', value: '0 ≤ r < b' }
        ]
      },
      {
        id: 'q1-8',
        prompt: 'Mennyi a 84 : 4 fejszámolás hányadosa?',
        highlightValue: '84 : 4 = ?',
        questionTypeBadge: 'Szétbontásos osztás',
        options: ['21', '24', '18', '22'],
        correctAnswer: '21',
        explanation: '80 : 4 = 20, 4 : 4 = 1 ➔ 20 + 1 = 21.',
        breakdown: [
          { label: '80 : 4', value: '20' },
          { label: '4 : 4', value: '1' },
          { label: 'Összeg', value: '21' }
        ]
      },
      {
        id: 'q1-9',
        prompt: 'Mennyi a 2 400 : 60 művelet hányadosa?',
        highlightValue: '2 400 : 60 = ?',
        questionTypeBadge: 'Nullák elhagyása',
        options: ['40', '400', '4', '24'],
        correctAnswer: '40',
        explanation: 'Mindkét szám végéről elhagyunk 1 nullát: 240 : 6 = 40.',
        breakdown: [
          { label: 'Egyszerűsítés', value: '240 : 6' },
          { label: 'Hányados', value: '40' }
        ]
      },
      {
        id: 'q1-10',
        prompt: 'Melyik a helyes képlet a maradékos osztás ellenőrzésére?',
        highlightValue: 'Ellenőrzés képlete',
        questionTypeBadge: 'Ellenőrzés',
        options: [
          'Osztandó = Osztó · Hányados + Maradék',
          'Osztandó = Osztó + Hányados · Maradék',
          'Hányados = Osztandó · Osztó - Maradék',
          'Maradék = Osztandó · Osztó'
        ],
        correctAnswer: 'Osztandó = Osztó · Hányados + Maradék',
        explanation: 'A maradékos osztás helyességét úgy ellenőrizzük, hogy az osztót megszorozzuk a hányadossal, és hozzáadjuk a maradékot.',
        breakdown: [
          { label: 'Képlet', value: 'a = b · q + r' }
        ]
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Közepes szint',
    subtitle: 'Írásbeli osztás egy- és kétjegyű osztóval, becslés és levezetés 100–10 000 között',
    range: '100 – 10 000',
    focus: 'Kétjegyű írásbeli osztás, lehozás, becslés, maradék meghatározása',
    color: 'teal',
    badgeBg: 'bg-teal-50 dark:bg-teal-950/40',
    badgeBorder: 'border-teal-200 dark:border-teal-800',
    badgeText: 'text-teal-700 dark:text-teal-300',
    accentGradient: 'from-teal-600 to-indigo-600',
    iconBg: 'bg-teal-600 text-white',
    questions: [
      {
        id: 'q2-1',
        prompt: 'Mennyi a 842 : 26 írásbeli osztás hányadosa és végső maradéka?',
        highlightValue: '842 : 26 = ?',
        questionTypeBadge: 'Kétjegyű osztás',
        options: ['32, maradék: 10', '31, maradék: 16', '33, maradék: 2', '32, maradék: 0'],
        correctAnswer: '32, maradék: 10',
        explanation: '84-ben a 26 megvan 3-szor (3 · 26 = 78), maradék 6. Lehozzuk a 2-t ➔ 62-ben a 26 megvan 2-szer (2 · 26 = 52), maradék 10. Ellenőrzés: 26 · 32 + 10 = 832 + 10 = 842.',
        breakdown: [
          { label: '1. lépés (84 : 26)', value: '3 (marad 6)' },
          { label: '2. lépés (62 : 26)', value: '2 (marad 10)' },
          { label: 'Hányados', value: '32' },
          { label: 'Maradék', value: '10' }
        ]
      },
      {
        id: 'q2-2',
        prompt: 'Mennyi a 738 : 6 írásbeli osztás pontos eredménye?',
        highlightValue: '738 : 6 = ?',
        questionTypeBadge: 'Egyjegyű osztó',
        options: ['123', '113', '128', '133'],
        correctAnswer: '123',
        explanation: '7-ben a 6 megvan 1-szer, maradt 1. 13-ban a 6 megvan 2-szer, maradt 1. 18-ban a 6 megvan 3-szor, maradt 0 ➔ 123.',
        breakdown: [
          { label: '7 : 6', value: '1 (m=1)' },
          { label: '13 : 6', value: '2 (m=1)' },
          { label: '18 : 6', value: '3 (m=0)' },
          { label: 'Hányados', value: '123' }
        ]
      },
      {
        id: 'q2-3',
        prompt: 'Mennyi a 945 : 35 írásbeli osztás pontos hányadosa?',
        highlightValue: '945 : 35 = ?',
        questionTypeBadge: 'Kétjegyű osztás',
        options: ['27', '25', '29', '31'],
        correctAnswer: '27',
        explanation: '94-ben a 35 megvan 2-szer (2 · 35 = 70), maradék 24. Lehozzuk az 5-öt ➔ 245-ben a 35 pontosan 7-szer van meg (7 · 35 = 245), maradék 0 ➔ 27.',
        breakdown: [
          { label: '94 : 35', value: '2 (m=24)' },
          { label: '245 : 35', value: '7 (m=0)' },
          { label: 'Eredmény', value: '27' }
        ]
      },
      {
        id: 'q2-4',
        prompt: 'Mennyi az 1 248 : 24 írásbeli osztás hányadosa?',
        highlightValue: '1 248 : 24 = ?',
        questionTypeBadge: 'Kétjegyű osztás',
        options: ['52', '48', '54', '62'],
        correctAnswer: '52',
        explanation: '12-ben nincs meg a 24, ezért 124-et jelölünk ki. 124-ben a 24 megvan 5-ször (5 · 24 = 120), maradt 4. Lehozzuk a 8-at ➔ 48-ban a 24 megvan 2-szer ➔ 52.',
        breakdown: [
          { label: '124 : 24', value: '5 (m=4)' },
          { label: '48 : 24', value: '2 (m=0)' },
          { label: 'Hányados', value: '52' }
        ]
      },
      {
        id: 'q2-5',
        prompt: 'Mennyi a 672 : 21 írásbeli osztás hányadosa?',
        highlightValue: '672 : 21 = ?',
        questionTypeBadge: 'Kétjegyű osztás',
        options: ['32', '31', '34', '28'],
        correctAnswer: '32',
        explanation: '67-ben a 21 megvan 3-szor (3 · 21 = 63), maradt 4. Lehozzuk a 2-t ➔ 42-ben a 21 megvan 2-szer (2 · 21 = 42), maradék 0 ➔ 32.',
        breakdown: [
          { label: '67 : 21', value: '3 (m=4)' },
          { label: '42 : 21', value: '2 (m=0)' },
          { label: 'Hányados', value: '32' }
        ]
      },
      {
        id: 'q2-6',
        prompt: 'Mit kell legelőször megtenni az írásbeli osztás megkezdésekor?',
        highlightValue: 'Írásbeli osztás 1. lépése',
        questionTypeBadge: 'Algoritmus',
        options: [
          'Balról kijelöljük az osztandóból a legelső olyan részt, amiben az osztó legalább egyszer megvan',
          'Összeadjuk az összes számjegyet',
          'A legutolsó számjeggyel kezdünk osztani',
          'Kivonjuk az osztót az osztandóból'
        ],
        correctAnswer: 'Balról kijelöljük az osztandóból a legelső olyan részt, amiben az osztó legalább egyszer megvan',
        explanation: 'Az írásbeli osztás első lépése a kijelölés balról, hogy megállapítsuk, hány számjegyű lesz a hányados.',
        breakdown: [
          { label: '1. Lépés', value: 'Kijelölés balról' }
        ]
      },
      {
        id: 'q2-7',
        prompt: 'Mennyi a 4 800 : 100 osztás pontos értéke?',
        highlightValue: '4 800 : 100 = ?',
        questionTypeBadge: '100-zal osztás',
        options: ['48', '480', '4,8', '4800'],
        correctAnswer: '48',
        explanation: '100-zal osztva 2 nullát hagyunk el a szám végéről: 48.',
        breakdown: [
          { label: 'Szabály', value: '2 nulla le' },
          { label: 'Hányados', value: '48' }
        ]
      },
      {
        id: 'q2-8',
        prompt: 'Ha a 842 : 26 osztást kerekítéssel becsüljük (800 : 30), körülbelül mekkora hányadost várunk?',
        highlightValue: '842 : 26 ≈ ?',
        questionTypeBadge: 'Becslés kerekítéssel',
        options: ['Kb. 25 – 30', 'Kb. 80 – 90', 'Kb. 5 – 10', 'Kb. 300'],
        correctAnswer: 'Kb. 25 – 30',
        explanation: '800 : 30 = 80 : 3 ≈ 26-27, a pontos hányados 32 (maradék 10), ami szépen illeszkedik a nagyságrendi becsléshez.',
        breakdown: [
          { label: 'Kerekítés', value: '800 : 30 ≈ 27' }
        ]
      },
      {
        id: 'q2-9',
        prompt: 'Mennyi a 89 : 12 maradékos osztás hányadosa és maradéka?',
        highlightValue: '89 : 12 = ?',
        questionTypeBadge: 'Kétjegyű maradékos osztás',
        options: ['7, maradék: 5', '6, maradék: 17', '7, maradék: 3', '8, maradék: 1'],
        correctAnswer: '7, maradék: 5',
        explanation: '7 · 12 = 84, és 89 - 84 = 5. Hányados 7, maradék 5 (5 < 12 ✓).',
        breakdown: [
          { label: '7 · 12', value: '84' },
          { label: 'Maradék', value: '89 - 84 = 5' }
        ]
      },
      {
        id: 'q2-10',
        prompt: 'Egy osztásban az osztó 15. Lehet-e a maradék 18?',
        highlightValue: 'Osztó = 15, Maradék = 18 ?',
        questionTypeBadge: 'Maradék vizsgálat',
        options: [
          'Nem, mert a maradék nem lehet nagyobb az osztónál (18 > 15)',
          'Igen, bármekkora lehet a maradék',
          'Igen, ha az osztandó páros',
          'Nem, mert a maradék csak 0 lehet'
        ],
        correctAnswer: 'Nem, mert a maradék nem lehet nagyobb az osztónál (18 > 15)',
        explanation: 'A maradéknak szigorúan kisebbnek kell lennie az osztónál (0 ≤ maradék < osztó). 18-ban a 15 még egyszer megvan!',
        breakdown: [
          { label: 'Szabály', value: 'Maradék < Osztó' }
        ]
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Nehéz szint',
    subtitle: 'Nagy számok osztása, többjegyű maradékos osztás és összetett feladatok 1 000–1 000 000 között',
    range: '1 000 – 1 000 000',
    focus: 'Többjegyű osztók, milliós nagyságrend, szöveges feladatok, hibakeresés',
    color: 'purple',
    badgeBg: 'bg-purple-50 dark:bg-purple-950/40',
    badgeBorder: 'border-purple-200 dark:border-purple-800',
    badgeText: 'text-purple-700 dark:text-purple-300',
    accentGradient: 'from-purple-600 to-indigo-700',
    iconBg: 'bg-purple-600 text-white',
    questions: [
      {
        id: 'q3-1',
        prompt: 'Mennyi az 1 386 : 42 írásbeli osztás pontos hányadosa?',
        highlightValue: '1 386 : 42 = ?',
        questionTypeBadge: 'Kétjegyű osztás',
        options: ['33', '32', '35', '29'],
        correctAnswer: '33',
        explanation: '138-ban a 42 megvan 3-szor (3 · 42 = 126), maradt 12. Lehozzuk a 6-ot ➔ 126-ban a 42 megvan 3-szor (3 · 42 = 126), maradék 0 ➔ 33.',
        breakdown: [
          { label: '138 : 42', value: '3 (m=12)' },
          { label: '126 : 42', value: '3 (m=0)' },
          { label: 'Hányados', value: '33' }
        ]
      },
      {
        id: 'q3-2',
        prompt: 'Mennyi a 5 429 : 37 írásbeli osztás hányadosa és maradéka?',
        highlightValue: '5 429 : 37 = ?',
        questionTypeBadge: 'Összetett írásbeli osztás',
        options: ['146, maradék: 27', '145, maradék: 32', '146, maradék: 0', '147, maradék: 15'],
        correctAnswer: '146, maradék: 27',
        explanation: '54 : 37 = 1 (m=17) ➔ 172 : 37 = 4 (4 · 37 = 148, m=24) ➔ 249 : 37 = 6 (6 · 37 = 222, m=27). Ellenőrzés: 37 · 146 + 27 = 5402 + 27 = 5429.',
        breakdown: [
          { label: '54 : 37', value: '1 (m=17)' },
          { label: '172 : 37', value: '4 (m=24)' },
          { label: '249 : 37', value: '6 (m=27)' },
          { label: 'Végeredmény', value: '146 (m=27)' }
        ]
      },
      {
        id: 'q3-3',
        prompt: 'Mennyi a 12 500 : 50 művelet pontos eredménye?',
        highlightValue: '12 500 : 50 = ?',
        questionTypeBadge: 'Nullák elhagyása',
        options: ['250', '25', '2 500', '500'],
        correctAnswer: '250',
        explanation: 'Mindkét szám végéről elhagyunk 1 nullát: 1 250 : 5 = 250.',
        breakdown: [
          { label: 'Egyszerűsítés', value: '1 250 : 5' },
          { label: 'Hányados', value: '250' }
        ]
      },
      {
        id: 'q3-4',
        prompt: 'Mennyi az 1 000 000 : 125 nagy számú osztás értéke?',
        highlightValue: '1 000 000 : 125 = ?',
        questionTypeBadge: 'Háromjegyű osztó',
        options: ['8 000', '800', '80 000', '12 500'],
        correctAnswer: '8 000',
        explanation: 'Mivel 1 000 : 125 = 8, ezért 1 000 000 : 125 = 8 000.',
        breakdown: [
          { label: '1 000 : 125', value: '8' },
          { label: '3 nulla utána', value: '8 000' }
        ]
      },
      {
        id: 'q3-5',
        prompt: 'Mennyi a 480 000 : 800 művelet hányadosa?',
        highlightValue: '480 000 : 800 = ?',
        questionTypeBadge: 'Kerek számok osztása',
        options: ['600', '60', '6 000', '480'],
        correctAnswer: '600',
        explanation: 'Mindkét számból 2 nullát elhagyva: 4 800 : 8 = 600.',
        breakdown: [
          { label: 'Egyszerűsítés', value: '4 800 : 8' },
          { label: 'Hányados', value: '600' }
        ]
      },
      {
        id: 'q3-6',
        prompt: '35 egyforma dobozba összesen 1 050 darab könyvet csomagoltak. Hány könyv került egy dobozba?',
        highlightValue: '1 050 : 35 = ?',
        questionTypeBadge: 'Szöveges feladat',
        options: ['30', '35', '25', '28'],
        correctAnswer: '30',
        explanation: '1 050 : 35 = 30 könyv dobozonként (mert 30 · 35 = 1 050).',
        breakdown: [
          { label: 'Művelet', value: '1 050 : 35' },
          { label: 'Eredmény', value: '30 könyv' }
        ]
      },
      {
        id: 'q3-7',
        prompt: 'Mennyi a 14 400 : 120 osztás eredménye?',
        highlightValue: '14 400 : 120 = ?',
        questionTypeBadge: 'Fejszámolás',
        options: ['120', '12', '1 200', '140'],
        correctAnswer: '120',
        explanation: '1440 : 12 = 120 (mivel 12 · 12 = 144).',
        breakdown: [
          { label: '1 440 : 12', value: '120' }
        ]
      },
      {
        id: 'q3-8',
        prompt: 'Egy osztásban az osztó 42, a hányados 33 és a maradék 0. Mennyi volt az osztandó?',
        highlightValue: 'Osztó = 42, Hányados = 33 ➔ Osztandó = ?',
        questionTypeBadge: 'Ellenőrzés fordítva',
        options: ['1 386', '1 286', '1 420', '1 346'],
        correctAnswer: '1 386',
        explanation: 'Az ellenőrzés képlete szerint: Osztandó = Osztó · Hányados = 42 · 33 = 1 386.',
        breakdown: [
          { label: '42 · 30', value: '1 260' },
          { label: '42 · 3', value: '126' },
          { label: 'Összeg', value: '1 386' }
        ]
      },
      {
        id: 'q3-9',
        prompt: 'Mennyi a 3 750 : 25 írásbeli osztás hányadosa?',
        highlightValue: '3 750 : 25 = ?',
        questionTypeBadge: 'Írásbeli osztás',
        options: ['150', '125', '175', '140'],
        correctAnswer: '150',
        explanation: '37-ben a 25 megvan 1-szer (m=12). 125-ben a 25 megvan 5-ször (m=0). 0-ban a 25 megvan 0-szor ➔ 150.',
        breakdown: [
          { label: '37 : 25', value: '1 (m=12)' },
          { label: '125 : 25', value: '5 (m=0)' },
          { label: '0 : 25', value: '0' },
          { label: 'Hányados', value: '150' }
        ]
      },
      {
        id: 'q3-10',
        prompt: 'Mennyi a 2 500 : 75 maradékos osztás hányadosa és maradéka?',
        highlightValue: '2 500 : 75 = ?',
        questionTypeBadge: 'Maradékos osztás',
        options: ['33, maradék: 25', '32, maradék: 50', '33, maradék: 0', '34, maradék: 15'],
        correctAnswer: '33, maradék: 25',
        explanation: '75 · 33 = 2 475, és 2 500 - 2 475 = 25. Hányados: 33, maradék: 25 (25 < 75 ✓).',
        breakdown: [
          { label: '75 · 33', value: '2 475' },
          { label: 'Maradék', value: '2 500 - 2 475 = 25' }
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

interface DivisionQuizProps {
  onBack: () => void;
}

export function DivisionQuiz({ onBack }: DivisionQuizProps) {
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
          "w-full px-2 sm:px-4 py-3 animate-in fade-in duration-300 text-left",
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
                  <Minimize2 className="w-3.5 h-3.5 mr-1 text-indigo-600 dark:text-indigo-400" />
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
              className="h-8 rounded-xl px-2.5 border-indigo-300 bg-indigo-50/50 text-indigo-800 dark:bg-indigo-950/40 dark:text-indigo-300 dark:border-indigo-800 hover:bg-indigo-100 text-xs font-bold"
            >
              <BookOpen className="w-3.5 h-3.5 mr-1 text-indigo-600" />
              Szabályzat
            </Button>
          </div>
        </div>

        {/* Hero Header */}
        <div className="text-center max-w-2xl mx-auto mb-4 sm:mb-5">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight flex items-center justify-center gap-2 mb-1">
            <span className="text-2xl">➗</span>
            <span>Osztás, írásbeli osztás Kvíz</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Gyakorold a fejszámolást, a maradékos osztást és a kétjegyű írásbeli lépcsős osztást!
          </p>

          {/* Quick Mode Switcher in selection */}
          <div className="inline-flex flex-wrap items-center justify-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl mt-3 border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setGameMode('quiz')}
              className={cn(
                "flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer",
                gameMode === 'quiz'
                  ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
              )}
            >
              <FileQuestion className="w-3.5 h-3.5 text-indigo-500" />
              Klasszikus Kvíz
            </button>
            <button
              onClick={() => setGameMode('matcher')}
              className={cn(
                "flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer",
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
                "flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer",
                gameMode === 'sorter'
                  ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs"
                  : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
              )}
            >
              <ArrowRightLeft className="w-3.5 h-3.5 text-amber-500" />
              Csoportosító (Húzd a helyére)
            </button>
          </div>
        </div>

        {/* Cheat sheet popover/card */}
        {showCheatSheet && (
          <div className="mb-4 p-4 sm:p-5 bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-slate-900 dark:to-slate-850 rounded-2xl border-2 border-indigo-200 dark:border-indigo-900/60 shadow-md animate-in fade-in duration-200">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm sm:text-base font-black text-indigo-900 dark:text-indigo-200 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                Osztás szabályai és összefoglaló
              </h3>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setShowCheatSheet(false)}
                className="text-indigo-800 dark:text-indigo-300 hover:bg-indigo-200/50 rounded-lg h-7 px-2 text-xs"
              >
                Bezárás
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
              {DIVISION_CHEAT_SHEET.map((item, idx) => (
                <div key={idx} className="bg-white/95 dark:bg-slate-800/95 p-2.5 rounded-xl border border-indigo-100 dark:border-slate-700 shadow-xs text-left">
                  <div className="text-xs font-black text-indigo-600 dark:text-indigo-400">{item.topic}</div>
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
                className="group relative bg-white dark:bg-slate-900 rounded-2xl p-5 border-2 border-slate-200/80 dark:border-slate-800 hover:border-indigo-500 dark:hover:border-indigo-500 shadow-sm hover:shadow-lg transition-all duration-200 cursor-pointer flex flex-col justify-between overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-indigo-500/10 to-transparent rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform" />

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform shadow-inner text-white font-black text-lg", cfg.iconBg)}>
                      {level}
                    </div>

                    <span className={cn("px-2.5 py-1 rounded-full text-[11px] font-black uppercase tracking-wider border", cfg.badgeBg, cfg.badgeBorder, cfg.badgeText)}>
                      {gameMode === 'quiz' ? '10 Kérdés' : gameMode === 'matcher' ? '8 Pár' : '10 Elem (3 csoport)'}
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-slate-900 dark:text-white mb-0.5 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
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
                      <span className="font-bold text-indigo-600 dark:text-indigo-400 text-right truncate max-w-[140px]" title={cfg.focus}>{cfg.focus}</span>
                    </div>
                  </div>
                </div>

                <Button
                  className={cn(
                    "w-full h-10 rounded-xl font-bold text-sm shadow-xs transition-all flex items-center justify-center gap-1.5",
                    level === 1
                      ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                      : level === 2
                      ? "bg-teal-600 hover:bg-teal-700 text-white"
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
          <div className="w-20 h-20 mx-auto mb-4 rounded-3xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30">
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
              <div className="text-2xl font-black text-indigo-600 dark:text-indigo-400">{score} / {totalQuestions}</div>
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
                className="flex-1 h-11 rounded-xl text-sm font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-md flex items-center justify-center gap-1.5"
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
        "w-full px-2 sm:px-4 py-1 animate-in fade-in duration-200 text-left",
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
            className="h-8 rounded-xl px-2.5 border border-slate-200/80 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium text-xs cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Szint választás
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={toggleFullscreen}
            className="h-8 rounded-xl px-2.5 border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-medium text-xs hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
            title={isFullscreen ? 'Kilépés a teljes képernyőből' : 'Teljes képernyős mód'}
          >
            {isFullscreen ? (
              <>
                <Minimize2 className="w-3.5 h-3.5 mr-1 text-indigo-600 dark:text-indigo-400" />
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
                "px-2.5 py-1 rounded-lg text-xs font-black transition-all cursor-pointer",
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
              <div className="flex items-center gap-1 font-black text-indigo-600 dark:text-indigo-400">
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
            <div className="flex items-center gap-1.5 bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 px-3 py-1 rounded-xl border border-amber-200 dark:border-amber-800 text-xs font-bold">
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
                  color={selectedLevel === 1 ? 'indigo' : selectedLevel === 2 ? 'teal' : 'purple'}
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
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                        {levelConfig.title}
                      </span>
                    </div>

                    <CardContent className="p-4 sm:p-5 text-center">
                      <p className="text-xs sm:text-sm font-bold text-slate-600 dark:text-slate-300 mb-2.5">
                        {currentQuestion.prompt}
                      </p>

                      <div className="inline-block px-6 py-2.5 bg-gradient-to-br from-indigo-50 to-blue-50/60 dark:from-slate-850 dark:to-slate-800 rounded-2xl border-2 border-indigo-200/80 dark:border-slate-700 shadow-inner">
                        <span className="text-2xl sm:text-3xl font-mono font-black tracking-wider text-slate-900 dark:text-indigo-300">
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
                        className="w-full h-11 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md flex items-center justify-center gap-1.5 animate-pulse cursor-pointer"
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
                            "w-full p-3.5 rounded-2xl border-2 text-left font-mono text-xs sm:text-sm font-bold transition-all flex items-center justify-between select-none shadow-xs group cursor-pointer",
                            !isAnswerChecked && [
                              "bg-white dark:bg-slate-900 border-slate-200/90 dark:border-slate-800",
                              "hover:border-indigo-400 dark:hover:border-indigo-500 hover:bg-indigo-50/40 dark:hover:bg-indigo-950/30",
                              "active:scale-[0.99]"
                            ],
                            isAnswerChecked && isCorrect && [
                              "bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-900 dark:text-emerald-100 ring-2 ring-emerald-500/20"
                            ],
                            isAnswerChecked && isSelected && !isCorrect && [
                              "bg-rose-50 dark:bg-rose-950/60 border-rose-500 text-rose-900 dark:text-rose-100"
                            ],
                            isAnswerChecked && !isSelected && !isCorrect && [
                              "opacity-40 bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-800 cursor-default"
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
                    <div className="p-2.5 bg-indigo-50/60 dark:bg-slate-850/80 rounded-xl border border-indigo-200/50 dark:border-slate-800 text-[11px] text-indigo-900 dark:text-indigo-300 flex items-center gap-1.5 mt-0.5">
                      <Sparkles className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                      <span>Tipp: Figyeld a maradékot, a kerekítési becslést és az ellenőrzést!</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : gameMode === 'matcher' ? (
            /* MATCHER MODE WORKSPACE */
            <DivisionMatcher
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
            <DivisionSorter
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
              <Layers className="w-3.5 h-3.5 text-indigo-500" />
              <span>Sablon / Játékmód</span>
            </div>

            <div className="flex flex-col gap-1.5">
              {/* Quiz Mode Button */}
              <button
                onClick={() => setGameMode('quiz')}
                className={cn(
                  "w-full p-2.5 rounded-xl text-left font-bold text-xs transition-all flex items-center gap-2.5 border-2 cursor-pointer",
                  gameMode === 'quiz'
                    ? "bg-indigo-50 dark:bg-indigo-950/50 border-indigo-400 text-indigo-900 dark:text-indigo-200 shadow-xs"
                    : "bg-slate-50/80 dark:bg-slate-800/60 border-transparent hover:border-slate-200 text-slate-600 dark:text-slate-400"
                )}
              >
                <div className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                  gameMode === 'quiz' ? "bg-indigo-600 text-white" : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
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
                  "w-full p-2.5 rounded-xl text-left font-bold text-xs transition-all flex items-center gap-2.5 border-2 cursor-pointer",
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
                  "w-full p-2.5 rounded-xl text-left font-bold text-xs transition-all flex items-center gap-2.5 border-2 cursor-pointer",
                  gameMode === 'sorter'
                    ? "bg-amber-50 dark:bg-amber-950/50 border-amber-400 text-amber-900 dark:text-amber-200 shadow-xs"
                    : "bg-slate-50/80 dark:bg-slate-800/60 border-transparent hover:border-slate-200 text-slate-600 dark:text-slate-400"
                )}
              >
                <div className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                  gameMode === 'sorter' ? "bg-amber-500 text-white" : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
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
                    "w-full px-3 py-1.5 rounded-xl text-xs font-bold transition-all text-left flex items-center justify-between cursor-pointer",
                    selectedLevel === lvl
                      ? "bg-slate-900 text-white dark:bg-indigo-600 dark:text-white"
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
              className="w-full h-9 rounded-xl border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold justify-start cursor-pointer"
            >
              {isFullscreen ? (
                <>
                  <Minimize2 className="w-3.5 h-3.5 mr-2 text-indigo-600" />
                  Kilépés a teljes képernyőből
                </>
              ) : (
                <>
                  <Maximize2 className="w-3.5 h-3.5 mr-2 text-indigo-600" />
                  Teljes képernyős mód
                </>
              )}
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowCheatSheet(!showCheatSheet)}
              className="w-full h-9 rounded-xl border-indigo-300 bg-indigo-50/50 text-indigo-800 dark:bg-indigo-950/40 dark:text-indigo-300 dark:border-indigo-800 hover:bg-indigo-100 text-xs font-bold justify-start cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5 mr-2 text-indigo-600" />
              Osztási segédlet
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleStartLevel(selectedLevel, gameMode)}
              className="w-full h-9 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-medium justify-start cursor-pointer"
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
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border-2 border-indigo-300 dark:border-indigo-900 shadow-2xl max-w-2xl w-full text-left">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-600" />
                Az osztás szabályai és összefoglaló
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
              {DIVISION_CHEAT_SHEET.map((item, idx) => (
                <div key={idx} className="bg-slate-50 dark:bg-slate-850 p-3 rounded-xl border border-slate-200/80 dark:border-slate-700">
                  <div className="text-xs font-black text-indigo-600 dark:text-indigo-400">{item.topic}</div>
                  <div className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200 mt-0.5">{item.formula}</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">{item.note}</div>
                </div>
              ))}
            </div>

            <div className="text-xs text-slate-600 dark:text-slate-400 bg-indigo-50/80 dark:bg-indigo-950/40 p-3 rounded-xl border border-indigo-200 dark:border-indigo-900/60 leading-relaxed mb-4 space-y-1">
              <p><strong>0 szabály:</strong> Nullával osztani TILOS és értelmetlen! <em>0 : a = 0</em>.</p>
              <p><strong>Maradék szabálya:</strong> A maradék mindig szigorúan kisebb az osztónál: <em>0 ≤ Maradék &lt; Osztó</em>.</p>
              <p><strong>Ellenőrzés:</strong> <em>Osztandó = Hányados · Osztó + Maradék</em>.</p>
              <p><strong>Kétjegyű írásbeli osztás:</strong> Balról kijelölünk (⌒), megbecsüljük a jegyet (B:), visszaszorzunk, kivonjuk a maradékot, majd lehozzuk (↓) a következő számjegyet.</p>
            </div>

            <Button
              onClick={() => setShowCheatSheet(false)}
              className="w-full h-10 rounded-xl font-bold bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              Értem, folytatom a játékot!
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DivisionQuiz;
