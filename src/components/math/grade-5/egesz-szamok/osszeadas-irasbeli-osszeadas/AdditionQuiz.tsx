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
  Calculator
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { AdditionMatcher } from './AdditionMatcher';
import { AdditionSorter } from './AdditionSorter';

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

const ADDITION_CHEAT_SHEET = [
  { topic: 'Fogalmak', formula: 'tag + tag = összeg', note: 'Az összeadásban részt vevő számok a tagok, az eredmény az összeg.' },
  { topic: '0 tulajdonsága', formula: 'a + 0 = a', note: 'A nulla semleges elem az összeadásban (nem változtat az értéken).' },
  { topic: 'Felcserélhetőség', formula: 'a + b = b + a', note: 'A tagok sorrendje felcserélhető (pl. 28 + 56 = 56 + 28 = 84).' },
  { topic: 'Csoportosíthatóság', formula: '(a + b) + c = a + (b + c)', note: 'A tagok tetszőlegesen csoportosíthatók a kényelmes számoláshoz.' },
  { topic: 'Írásbeli szabály', formula: 'Jobbról balra', note: 'Egyes az egyes alá, tízes a tízes alá. Mindig az egyeseknél kezdjük!' },
  { topic: 'Átlépés / Maradék', formula: 'Leírom, maradt...', note: 'Ha az oszlop összege ≥ 10, az egyest leírjuk, a tízest átvisszük balra.' },
  { topic: 'Előzetes becslés', formula: 'B ≈ Ö', note: 'Művelet előtt kerekítünk a durva hibák elkerülésére.' }
];

const QUIZ_LEVELS: Record<DifficultyLevel, LevelConfig> = {
  1: {
    level: 1,
    title: '1. Könnyű szint',
    subtitle: 'Fejszámolás, tulajdonságok és egyszerű összeadás 1–1 000 között',
    range: '1 – 1 000',
    focus: 'Összeg és tagok, felcserélhetőség, egyszerű átlépés, kerekítéses becslés',
    color: 'blue',
    badgeBg: 'bg-blue-50 dark:bg-blue-950/40',
    badgeBorder: 'border-blue-200 dark:border-blue-800',
    badgeText: 'text-blue-700 dark:text-blue-300',
    accentGradient: 'from-blue-500 to-indigo-600',
    iconBg: 'bg-blue-500',
    questions: [
      {
        id: 'q1-1',
        prompt: 'Hogyan nevezzük az összeadás műveletében részt vevő számokat?',
        highlightValue: 'a + b = c',
        questionTypeBadge: 'Alapfogalmak',
        options: ['Összeadandók (vagy tagok)', 'Tényezők', 'Kisebbítendő és kivonandó', 'Osztandó és osztó'],
        correctAnswer: 'Összeadandók (vagy tagok)',
        explanation: 'Az összeadásban a művelet tagjait összeadandóknak nevezzük, az eredmény pedig az összeg.',
        breakdown: [
          { label: 'Tagok', value: 'Összeadandók' },
          { label: 'Eredmény', value: 'Összeg' }
        ]
      },
      {
        id: 'q1-2',
        prompt: 'Mennyi a 340 + 250 művelet összege?',
        highlightValue: '340 + 250 = ?',
        questionTypeBadge: 'Fejszámolás',
        options: ['590', '690', '580', '600'],
        correctAnswer: '590',
        explanation: '300 + 200 = 500, 40 + 50 = 90 ➔ 500 + 90 = 590.',
        breakdown: [
          { label: 'Százasok', value: '300 + 200 = 500' },
          { label: 'Tízesek', value: '40 + 50 = 90' },
          { label: 'Összeg', value: '590' }
        ]
      },
      {
        id: 'q1-3',
        prompt: 'Melyik matematikai tulajdonságot fejezi ki a 45 + 78 = 78 + 45 egyenlőség?',
        highlightValue: '45 + 78 = 78 + 45',
        questionTypeBadge: 'Tulajdonságok',
        options: ['Felcserélhetőség (kommutativitás)', 'Csoportosíthatóság (asszociativitás)', 'Kiemelés', 'Nulla semlegessége'],
        correctAnswer: 'Felcserélhetőség (kommutativitás)',
        explanation: 'A felcserélhetőség (kommutativitás) kimondja, hogy az összeadandók sorrendje felcserélhető, az összeg nem változik (a + b = b + a).',
        breakdown: [
          { label: 'Szabály', value: 'a + b = b + a' }
        ]
      },
      {
        id: 'q1-4',
        prompt: 'Melyik helyiértéknél kezdjük el az írásbeli összeadást?',
        highlightValue: 'Írásbeli irány',
        questionTypeBadge: 'Írásbeli szabály',
        options: ['A legkisebb helyiértéken (egyeseknél)', 'A legnagyobb helyiértéken (százasok/ezresek)', 'Tetszőleges helyen', 'A tízeseknél'],
        correctAnswer: 'A legkisebb helyiértéken (egyeseknél)',
        explanation: 'Az írásbeli összeadást mindig a legkisebb helyiértéknél, az egyeseknél kezdjük, és jobbról balra haladunk az esetleges átlépések (maradékok) miatt.',
        breakdown: [
          { label: 'Kezdőpont', value: 'Egyesek (jobb szél)' }
        ]
      },
      {
        id: 'q1-5',
        prompt: 'Mennyi a 476 + 258 művelet pontos összege?',
        highlightValue: '476 + 258 = ?',
        questionTypeBadge: 'Írásbeli összeadás',
        options: ['734', '724', '744', '634'],
        correctAnswer: '734',
        explanation: 'Egyesek: 6 + 8 = 14 (leírom a 4-et, maradt 1). Tízesek: 7 + 5 + 1 = 13 (leírom a 3-at, maradt 1). Százasok: 4 + 2 + 1 = 7 ➔ 734.',
        breakdown: [
          { label: 'Egyesek', value: '6 + 8 = 14 (4, m=1)' },
          { label: 'Tízesek', value: '7 + 5 + 1 = 13 (3, m=1)' },
          { label: 'Százasok', value: '4 + 2 + 1 = 7' },
          { label: 'Összeg', value: '734' }
        ]
      },
      {
        id: 'q1-6',
        prompt: 'Becsüld meg az összeget százasokra kerekítve: 385 + 415 ≈ ?',
        highlightValue: '385 + 415 ≈ ?',
        questionTypeBadge: 'Előzetes becslés',
        options: ['800 (400 + 400)', '700 (300 + 400)', '900 (400 + 500)', '850 (pontos becslés)'],
        correctAnswer: '800 (400 + 400)',
        explanation: '385 százasra kerekítve 400, a 415 kerekítve 400. Becsült összeg: 400 + 400 = 800 (a pontos érték is éppen 800).',
        breakdown: [
          { label: '385 ≈', value: '400' },
          { label: '415 ≈', value: '400' },
          { label: 'Becsült összeg', value: '800' }
        ]
      },
      {
        id: 'q1-7',
        prompt: 'Mennyi a (17 + 83) + 45 kifejezés értéke a legkényelmesebben kiszámolva?',
        highlightValue: '(17 + 83) + 45 = ?',
        questionTypeBadge: 'Csoportosíthatóság',
        options: ['145 (100 + 45)', '135', '155', '125'],
        correctAnswer: '145 (100 + 45)',
        explanation: '17 + 83 = 100 (kerek százas), ehhez 45-öt adva 100 + 45 = 145.',
        breakdown: [
          { label: '17 + 83', value: '100' },
          { label: '100 + 45', value: '145' }
        ]
      },
      {
        id: 'q1-8',
        prompt: 'Mit teszünk az írásbeli összeadásnál, ha az egyesek oszlopának összege 16?',
        highlightValue: 'Oszlopösszeg = 16',
        questionTypeBadge: 'Átlépési szabály',
        options: ['Leírjuk a 6-ot az egyesek alá, és 1-et átviszünk a tízesekhez', 'Leírjuk mind a 16-ot az egyesek alá', 'Leírjuk az 1-et, és a 6-ot átvisszük', 'Újra kell kezdeni a feladatot'],
        correctAnswer: 'Leírjuk a 6-ot az egyesek alá, és 1-et átviszünk a tízesekhez',
        explanation: '16 = 1 tízes + 6 egyes, ezért a 6-ost leírjuk az oszlop alá, az 1 tízest pedig hozzáadjuk a következő (tízesek) oszlophoz.',
        breakdown: [
          { label: 'Leírandó', value: '6' },
          { label: 'Maradék', value: '+1 (átlépés)' }
        ]
      },
      {
        id: 'q1-9',
        prompt: 'Mennyi a 654 + 0 művelet eredménye?',
        highlightValue: '654 + 0 = ?',
        questionTypeBadge: 'A 0 tulajdonsága',
        options: ['654', '0', '6540', '1'],
        correctAnswer: '654',
        explanation: 'A 0 az összeadásban semleges elem: bármely számhoz nullát adva a szám értéke nem változik (a + 0 = a).',
        breakdown: [
          { label: 'Szabály', value: 'a + 0 = a' }
        ]
      },
      {
        id: 'q1-10',
        prompt: 'Mennyi a 398 + 145 művelet összege kiegyenlítéssel fejben számolva?',
        highlightValue: '398 + 145 = ?',
        questionTypeBadge: 'Fejszámolás',
        options: ['543 (400 + 143)', '533', '553', '545'],
        correctAnswer: '543 (400 + 143)',
        explanation: '398 + 2 = 400, és 145 - 2 = 143 ➔ 400 + 143 = 543.',
        breakdown: [
          { label: 'Kiegyenlítés', value: '(398 + 2) + (145 - 2)' },
          { label: 'Összeg', value: '400 + 143 = 543' }
        ]
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Közepes szint',
    subtitle: 'Többjegyű írásbeli összeadás, több átlépés és hiányzó számjegyek',
    range: '1 000 – 100 000',
    focus: 'Többjegyű írásbeli összeadás, 3 tag összeadása, hiányzó jegyek pótlása, szöveges feladatok',
    color: 'indigo',
    badgeBg: 'bg-indigo-50 dark:bg-indigo-950/40',
    badgeBorder: 'border-indigo-200 dark:border-indigo-800',
    badgeText: 'text-indigo-700 dark:text-indigo-300',
    accentGradient: 'from-indigo-500 to-purple-600',
    iconBg: 'bg-indigo-500',
    questions: [
      {
        id: 'q2-1',
        prompt: 'Mennyi a 4 785 + 3 648 írásbeli összeadás pontos eredménye?',
        highlightValue: '4 785 + 3 648 = ?',
        questionTypeBadge: 'Írásbeli összeadás',
        options: ['8 433', '8 333', '8 423', '7 433'],
        correctAnswer: '8 433',
        explanation: '5+8=13 (3, m=1), 8+4+1=13 (3, m=1), 7+6+1=14 (4, m=1), 4+3+1=8 ➔ 8 433.',
        breakdown: [
          { label: 'Egyesek', value: '5 + 8 = 13 (3, m=1)' },
          { label: 'Tízesek', value: '8 + 4 + 1 = 13 (3, m=1)' },
          { label: 'Százasok', value: '7 + 6 + 1 = 14 (4, m=1)' },
          { label: 'Ezresek', value: '4 + 3 + 1 = 8' }
        ]
      },
      {
        id: 'q2-2',
        prompt: 'Mennyi a három tag összege: 1 250 + 3 750 + 4 600?',
        highlightValue: '1 250 + 3 750 + 4 600 = ?',
        questionTypeBadge: 'Három tag összeadása',
        options: ['9 600', '9 500', '8 600', '10 600'],
        correctAnswer: '9 600',
        explanation: '1 250 + 3 750 = 5 000 (kerek szám), és 5 000 + 4 600 = 9 600.',
        breakdown: [
          { label: '1. lépés', value: '1 250 + 3 750 = 5 000' },
          { label: '2. lépés', value: '5 000 + 4 600 = 9 600' }
        ]
      },
      {
        id: 'q2-3',
        prompt: 'Melyik számjegy hiányzik a műveletből? 3 _ 4 5 + 2 1 8 3 = 5 8 2 8',
        highlightValue: '3 [?] 4 5 + 2 1 8 3 = 5 8 2 8',
        questionTypeBadge: 'Hiányzó számjegy',
        options: ['6', '5', '7', '4'],
        correctAnswer: '6',
        explanation: 'Egyesek: 5 + 3 = 8. Tízesek: 4 + 8 = 12 (2, maradt 1). Százasok: [?] + 1 + 1 (maradék) = 8 ➔ [?] = 6. Ezresek: 3 + 2 = 5.',
        breakdown: [
          { label: 'Tízesek átlépése', value: 'Maradt 1' },
          { label: 'Százasok', value: '[?] + 1 + 1 = 8 ➔ [?] = 6' }
        ]
      },
      {
        id: 'q2-4',
        prompt: 'Mennyi a 38 450 + 14 780 művelet összege?',
        highlightValue: '38 450 + 14 780 = ?',
        questionTypeBadge: 'Nagyobb számok',
        options: ['53 230', '52 230', '53 130', '54 230'],
        correctAnswer: '53 230',
        explanation: '0+0=0, 5+8=13 (3, m=1), 4+7+1=12 (2, m=1), 8+4+1=13 (3, m=1), 3+1+1=5 ➔ 53 230.',
        breakdown: [
          { label: 'Összeg', value: '53 230' }
        ]
      },
      {
        id: 'q2-5',
        prompt: 'Egy raktárban 14 350 kg alma és 8 890 kg körte van. Hány kg gyümölcs van összesen a raktárban?',
        highlightValue: '14 350 + 8 890 = ?',
        questionTypeBadge: 'Szöveges feladat',
        options: ['23 240 kg', '22 240 kg', '23 140 kg', '24 240 kg'],
        correctAnswer: '23 240 kg',
        explanation: '14 350 + 8 890 = 23 240 kg.',
        breakdown: [
          { label: 'Összeadás', value: '14 350 + 8 890 = 23 240' }
        ]
      },
      {
        id: 'q2-6',
        prompt: 'Melyik becslés a legpontosabb a 19 820 + 31 190 összegre ezresekre kerekítve?',
        highlightValue: '19 820 + 31 190 ≈ ?',
        questionTypeBadge: 'Becslés',
        options: ['51 000 (20 000 + 31 000)', '50 000 (19 000 + 31 000)', '52 000 (20 000 + 32 000)', '49 000'],
        correctAnswer: '51 000 (20 000 + 31 000)',
        explanation: '19 820 ezresre kerekítve 20 000, 31 190 kerekítve 31 000 ➔ 20 000 + 31 000 = 51 000 (pontos összeg: 51 010).',
        breakdown: [
          { label: '19 820 ≈', value: '20 000' },
          { label: '31 190 ≈', value: '31 000' },
          { label: 'Becslés', value: '51 000' }
        ]
      },
      {
        id: 'q2-7',
        prompt: 'Mennyi a 9 999 + 1 művelet összege (9-es átcsapódás)?',
        highlightValue: '9 999 + 1 = ?',
        questionTypeBadge: 'Átcsapódás',
        options: ['10 000', '10 001', '9 990', '100 000'],
        correctAnswer: '10 000',
        explanation: 'Minden helyiértéken átlépés történik: 9+1=10, így 9 999 + 1 = 10 000.',
        breakdown: [
          { label: 'Láncolt átlépés', value: '9 999 + 1 = 10 000' }
        ]
      },
      {
        id: 'q2-8',
        prompt: 'Melyik számot kell a 4 560-hoz adni, hogy 10 000-et kapjunk?',
        highlightValue: '4 560 + [?] = 10 000',
        questionTypeBadge: 'Pótlás',
        options: ['5 440', '5 540', '6 440', '5 460'],
        correctAnswer: '5 440',
        explanation: '10 000 - 4 560 = 5 440. Ellenőrzés: 4 560 + 5 440 = 10 000.',
        breakdown: [
          { label: 'Számolás', value: '10 000 - 4 560 = 5 440' }
        ]
      },
      {
        id: 'q2-9',
        prompt: 'Mennyi a 25 600 + 18 400 + 12 500 összeg értéke?',
        highlightValue: '25 600 + 18 400 + 12 500 = ?',
        questionTypeBadge: 'Három tag',
        options: ['56 500', '55 500', '56 400', '57 500'],
        correctAnswer: '56 500',
        explanation: '25 600 + 18 400 = 44 000, és 44 000 + 12 500 = 56 500.',
        breakdown: [
          { label: '1. lépés', value: '25 600 + 18 400 = 44 000' },
          { label: '2. lépés', value: '44 000 + 12 500 = 56 500' }
        ]
      },
      {
        id: 'q2-10',
        prompt: 'Egy iskolában 3 év alatt a tanulók létszáma így alakult: 348 fő, 362 fő és 390 fő. Hány tanuló járt összesen az iskolába ezen 3 év alatt?',
        highlightValue: '348 + 362 + 390 = ?',
        questionTypeBadge: 'Szöveges feladat',
        options: ['1 100 fő', '1 090 fő', '1 110 fő', '1 200 fő'],
        correctAnswer: '1 100 fő',
        explanation: '348 + 362 = 710, és 710 + 390 = 1 100 fő.',
        breakdown: [
          { label: '348 + 362', value: '710' },
          { label: '710 + 390', value: '1 100' }
        ]
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Nehéz szint',
    subtitle: 'Nagy számok (100 000 – 10 000 000), szöveges feladványok és hibakeresés',
    range: '100 000 – 10 000 000',
    focus: 'Milliós nagyságrendű összeadás, több láncolt átlépés, összetett szöveges feladatok, hibakeresés',
    color: 'purple',
    badgeBg: 'bg-purple-50 dark:bg-purple-950/40',
    badgeBorder: 'border-purple-200 dark:border-purple-800',
    badgeText: 'text-purple-700 dark:text-purple-300',
    accentGradient: 'from-purple-500 to-rose-600',
    iconBg: 'bg-purple-500',
    questions: [
      {
        id: 'q3-1',
        prompt: 'Mennyi a 3 456 780 + 2 784 540 művelet összege?',
        highlightValue: '3 456 780 + 2 784 540 = ?',
        questionTypeBadge: 'Milliós összeadás',
        options: ['6 241 320', '6 141 320', '6 231 320', '5 241 320'],
        correctAnswer: '6 241 320',
        explanation: '0+0=0, 8+4=12 (2, m=1), 7+5+1=13 (3, m=1), 6+4+1=11 (1, m=1), 5+8+1=14 (4, m=1), 4+7+1=12 (2, m=1), 3+2+1=6 ➔ 6 241 320.',
        breakdown: [
          { label: 'Összeg', value: '6 241 320' }
        ]
      },
      {
        id: 'q3-2',
        prompt: 'Mennyi a 4 999 999 + 1 összege?',
        highlightValue: '4 999 999 + 1 = ?',
        questionTypeBadge: 'Milliós átcsapódás',
        options: ['5 000 000', '5 000 001', '4 999 990', '50 000 000'],
        correctAnswer: '5 000 000',
        explanation: 'Az összes 9-es számjegy 0-ra vált a láncolt átlépések miatt, a 4-esből pedig 5-ös lesz ➔ 5 000 000.',
        breakdown: [
          { label: 'Eredmény', value: '5 000 000' }
        ]
      },
      {
        id: 'q3-3',
        prompt: 'Egy város költségvetése három részből áll: 1 450 000 Ft felújítás, 2 890 000 Ft oktatás és 3 660 000 Ft egészségügy. Mennyi a teljes költségvetés?',
        highlightValue: '1 450 000 + 2 890 000 + 3 660 000 = ?',
        questionTypeBadge: 'Összetett szöveges',
        options: ['8 000 000 Ft', '7 900 000 Ft', '8 100 000 Ft', '7 800 000 Ft'],
        correctAnswer: '8 000 000 Ft',
        explanation: '1 450 000 + 2 890 000 = 4 340 000 Ft, és 4 340 000 + 3 660 000 = 8 000 000 Ft.',
        breakdown: [
          { label: '1. és 2. tétel', value: '4 340 000 Ft' },
          { label: 'Teljes összeg', value: '8 000 000 Ft' }
        ]
      },
      {
        id: 'q3-4',
        prompt: 'Melyik számjegyek hiányoznak? 4 _ 8 2 + 1 3 _ 9 = 5 7 5 1',
        highlightValue: '4 [A] 8 2 + 1 3 [B] 9 = 5 7 5 1',
        questionTypeBadge: 'Két hiányzó számjegy',
        options: ['A = 3, B = 6', 'A = 4, B = 6', 'A = 3, B = 7', 'A = 2, B = 6'],
        correctAnswer: 'A = 3, B = 6',
        explanation: 'Egyesek: 2 + 9 = 11 (1, m=1). Tízesek: 8 + B + 1 = 15 ➔ B = 6 (m=1). Százasok: A + 3 + 1 = 7 ➔ A = 3. Ezresek: 4 + 1 = 5.',
        breakdown: [
          { label: 'Tízesek', value: '8 + B + 1 = 15 ➔ B = 6' },
          { label: 'Százasok', value: 'A + 3 + 1 = 7 ➔ A = 3' }
        ]
      },
      {
        id: 'q3-5',
        prompt: 'Hol a hiba a következő írásbeli összeadásban? 348 + 275 = 513',
        highlightValue: '348 + 275 = 513 (?)',
        questionTypeBadge: 'Hibakeresés',
        options: ['Elfelejtették hozzáadni az egyeseknél keletkezett maradék 1-et a tízesekhez (a helyes összeg: 623)', 'Rosszul adták össze az egyeseket', 'Nincs benne hiba', 'A százasok összege hibás'],
        correctAnswer: 'Elfelejtették hozzáadni az egyeseknél keletkezett maradék 1-et a tízesekhez (a helyes összeg: 623)',
        explanation: '8 + 5 = 13 (3, maradt 1). 4 + 7 + 1 = 12 (2, maradt 1). 3 + 2 + 1 = 6 ➔ A helyes eredmény 623, a feladatban elfelejtették a maradékokat.',
        breakdown: [
          { label: 'Helyes számolás', value: '348 + 275 = 623' }
        ]
      },
      {
        id: 'q3-6',
        prompt: 'Két szám összege 450. Ha az egyik számot 35-tel megnöveljük, a másikat 15-tel csökkentjük, mennyi lesz az új összeg?',
        highlightValue: 'Összeg változása',
        questionTypeBadge: 'Logikai feladvány',
        options: ['470 (450 + 35 - 15)', '450', '430', '500'],
        correctAnswer: '470 (450 + 35 - 15)',
        explanation: 'Az összeg az egyik tag növelésével 35-tel nő, a másik csökkentésével 15-tel csökken: 450 + 35 - 15 = 470.',
        breakdown: [
          { label: 'Változás', value: '+35 - 15 = +20' },
          { label: 'Új összeg', value: '450 + 20 = 470' }
        ]
      },
      {
        id: 'q3-7',
        prompt: 'Mennyi a négy egymást követő természetes szám összege, ha a legkisebb szám a 99?',
        highlightValue: '99 + 100 + 101 + 102 = ?',
        questionTypeBadge: 'Sorozatok összege',
        options: ['402', '400', '404', '398'],
        correctAnswer: '402',
        explanation: '(99 + 101) + (100 + 102) = 200 + 202 = 402.',
        breakdown: [
          { label: 'Párosítás', value: '99 + 101 = 200, 100 + 102 = 202' },
          { label: 'Összeg', value: '402' }
        ]
      },
      {
        id: 'q3-8',
        prompt: 'Mennyi a 7 894 500 + 2 105 500 művelet összege?',
        highlightValue: '7 894 500 + 2 105 500 = ?',
        questionTypeBadge: 'Kerekítés és összeg',
        options: ['10 000 000', '9 990 000', '10 100 000', '9 000 000'],
        correctAnswer: '10 000 000',
        explanation: '7 894 500 + 2 105 500 = 10 000 000 (pontosan 10 millió).',
        breakdown: [
          { label: 'Összeg', value: '10 000 000' }
        ]
      },
      {
        id: 'q3-9',
        prompt: 'Ha a + b = 1 200 és c = 350, mennyi az (a + c) + b értéke?',
        highlightValue: '(a + c) + b = ?',
        questionTypeBadge: 'Algebrai gondolkodás',
        options: ['1 550', '1 200', '1 450', '850'],
        correctAnswer: '1 550',
        explanation: 'A felcserélhetőség és csoportosíthatóság miatt (a + c) + b = (a + b) + c = 1 200 + 350 = 1 550.',
        breakdown: [
          { label: '(a + b) + c', value: '1 200 + 350 = 1 550' }
        ]
      },
      {
        id: 'q3-10',
        prompt: 'Egy háromnapos jótékonysági futáson a résztvevők az 1. napon 148 500 métert, a 2. napon 201 500 métert, a 3. napon 150 000 métert tettek meg. Hány kilométert futottak összesen?',
        highlightValue: 'Összes táv (km)',
        questionTypeBadge: 'Mértékegység & összeg',
        options: ['500 km (500 000 m)', '50 km', '5 000 km', '450 km'],
        correctAnswer: '500 km (500 000 m)',
        explanation: '148 500 + 201 500 = 350 000 m. 350 000 + 150 000 = 500 000 m = 500 km.',
        breakdown: [
          { label: 'Méterben', value: '500 000 m' },
          { label: 'Kilométerben', value: '500 km' }
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

interface AdditionQuizProps {
  onBack: () => void;
}

export function AdditionQuiz({ onBack }: AdditionQuizProps) {
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

  // 1. Level Selection Screen
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

            <Button
              size="sm"
              variant="outline"
              onClick={() => setShowCheatSheet(!showCheatSheet)}
              className="h-8 rounded-xl px-2.5 border-blue-300 bg-blue-50/50 text-blue-800 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800 hover:bg-blue-100 text-xs font-bold"
            >
              <BookOpen className="w-3.5 h-3.5 mr-1 text-blue-600" />
              Szabályzat
            </Button>
          </div>
        </div>

        {/* Hero Header */}
        <div className="text-center max-w-2xl mx-auto mb-4 sm:mb-5">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight flex items-center justify-center gap-2 mb-1">
            <span className="text-2xl">➕</span>
            <span>Összeadás, írásbeli összeadás Kvíz</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Gyakorold a fejszámolást, a műveleti tulajdonságokat és a többjegyű írásbeli összeadást átlépésekkel!
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
              <FileQuestion className="w-3.5 h-3.5 text-blue-500" />
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
              <LayoutGrid className="w-3.5 h-3.5 text-emerald-500" />
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
                Összeadás szabályai és összefoglaló
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
              {ADDITION_CHEAT_SHEET.map((item, idx) => (
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
                      {gameMode === 'quiz' ? '10 Kérdés' : gameMode === 'matcher' ? '8 Pár' : '9-10 Elem (3 csoport)'}
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
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : level === 2
                      ? "bg-indigo-600 hover:bg-indigo-700 text-white"
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
          <div className="w-20 h-20 mx-auto mb-4 rounded-3xl bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
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
              <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 flex items-center justify-center gap-1">
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
                  color={selectedLevel === 1 ? 'blue' : selectedLevel === 2 ? 'indigo' : 'purple'}
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
                        className="w-full h-11 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md flex items-center justify-center gap-1.5 animate-pulse"
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
                              "hover:border-blue-400 dark:hover:border-blue-500 hover:bg-blue-50/40 dark:hover:bg-blue-950/30",
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
                    <div className="p-2.5 bg-blue-50/60 dark:bg-slate-850/80 rounded-xl border border-blue-200/50 dark:border-slate-800 text-[11px] text-blue-900 dark:text-blue-300 flex items-center gap-1.5 mt-0.5">
                      <Sparkles className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span>Tipp: Figyeld a helyiértékeket és az esetleges maradék átvitelét!</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : gameMode === 'matcher' ? (
            /* MATCHER MODE WORKSPACE */
            <AdditionMatcher
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
            <AdditionSorter
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
              Összeadási segédlet
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
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border-2 border-blue-300 dark:border-blue-900 shadow-2xl max-w-2xl w-full text-left">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-600" />
                Az összeadás szabályai és tulajdonságai
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
              {ADDITION_CHEAT_SHEET.map((item, idx) => (
                <div key={idx} className="bg-slate-50 dark:bg-slate-850 p-3 rounded-xl border border-slate-200/80 dark:border-slate-700">
                  <div className="text-xs font-black text-blue-600 dark:text-blue-400">{item.topic}</div>
                  <div className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200 mt-0.5">{item.formula}</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">{item.note}</div>
                </div>
              ))}
            </div>

            <div className="text-xs text-slate-600 dark:text-slate-400 bg-blue-50/80 dark:bg-blue-950/40 p-3 rounded-xl border border-blue-200 dark:border-blue-900/60 leading-relaxed mb-4 space-y-1">
              <p><strong>Felcserélhetőség:</strong> <em>a + b = b + a</em> (a sorrend tetszőleges).</p>
              <p><strong>Csoportosíthatóság:</strong> <em>(a + b) + c = a + (b + c)</em> (kerek számokra való kiegészítés).</p>
              <p><strong>Írásbeli összeadás:</strong> Jobbra igazítva egymás alá írjuk a helyiértékeket, jobbról balra haladunk, és az átlépést továbbvisszük a következő oszlophoz.</p>
            </div>

            <Button
              onClick={() => setShowCheatSheet(false)}
              className="w-full h-10 rounded-xl font-bold bg-blue-600 hover:bg-blue-700 text-white"
            >
              Értem, folytatom a játékot!
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdditionQuiz;
