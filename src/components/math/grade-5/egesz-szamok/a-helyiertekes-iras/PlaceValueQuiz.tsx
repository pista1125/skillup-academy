import React, { useState, useEffect } from 'react';
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
  ArrowRightLeft,
  ChevronRight,
  Layers,
  LayoutGrid,
  FileQuestion,
  Flame,
  Binary
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { PlaceValueMatcher } from './PlaceValueMatcher';

export type DifficultyLevel = 1 | 2 | 3;
export type GameMode = 'quiz' | 'matcher';

interface QuizQuestion {
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

const QUIZ_LEVELS: Record<DifficultyLevel, LevelConfig> = {
  1: {
    level: 1,
    title: '1. Könnyű szint',
    subtitle: '3–4 jegyű számok (100–9 999)',
    range: '100 – 9 999',
    focus: 'E, T, Sz, E (alaki, helyi, valódi érték)',
    color: 'emerald',
    badgeBg: 'bg-emerald-50 dark:bg-emerald-950/40',
    badgeBorder: 'border-emerald-200 dark:border-emerald-800',
    badgeText: 'text-emerald-700 dark:text-emerald-300',
    accentGradient: 'from-emerald-500 to-teal-600',
    iconBg: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400',
    questions: [
      {
        id: 'l1-q1',
        prompt: 'Melyik számjegy áll a százasok helyiértékén a következő számban?',
        highlightValue: '4 523',
        questionTypeBadge: 'Helyiérték leolvasás',
        options: ['5', '4', '2', '3'],
        correctAnswer: '5',
        explanation: 'A 4 523 számban hátulról nézve: 3 az egyes, 2 a tízes, 5 a százas, 4 az ezres.',
        breakdown: [
          { label: 'Ezresek (E)', value: '4' },
          { label: 'Százasok (Sz)', value: '5' },
          { label: 'Tízesek (T)', value: '2' },
          { label: 'Egyesek (e)', value: '3' }
        ]
      },
      {
        id: 'l1-q2',
        prompt: 'Mennyi a kiemelt 7-es számjegy valódi értéke?',
        highlightValue: '7 842',
        questionTypeBadge: 'Valódi érték',
        options: ['7 000', '700', '70', '7'],
        correctAnswer: '7 000',
        explanation: 'A 7-es az ezresek helyiértékén áll, ezért a valódi értéke: 7 · 1000 = 7000.',
        breakdown: [
          { label: 'Alaki érték', value: '7' },
          { label: 'Helyiérték', value: '1000' },
          { label: 'Valódi érték', value: '7 000' }
        ]
      },
      {
        id: 'l1-q3',
        prompt: 'Melyik szám felel meg a következő helyiértékes összegnek?',
        highlightValue: '3E + 8Sz + 0T + 5e',
        questionTypeBadge: 'Összegalak ➔ Szám',
        options: ['3 805', '3 850', '3 085', '385'],
        correctAnswer: '3 805',
        explanation: '3000 + 800 + 0 + 5 = 3 805. A tízes helyiértéken 0 áll.',
        breakdown: [{ label: '3000 + 800 + 5', value: '3 805' }]
      },
      {
        id: 'l1-q4',
        prompt: 'Mi a különbség az alaki érték és a helyiérték között a kiemelt számjegyre?',
        highlightValue: '6 391 (számjegy: 3)',
        questionTypeBadge: 'Alaki és helyiérték',
        options: [
          'Alaki értéke 3, helyiértéke 100',
          'Alaki értéke 300, helyiértéke 3',
          'Alaki értéke 100, helyiértéke 300',
          'Alaki értéke 3, helyiértéke 10'
        ],
        correctAnswer: 'Alaki értéke 3, helyiértéke 100',
        explanation: 'Az alaki érték maga a számjegy (3), a helyiérték a helye a számban (százasok = 100), valódi értéke pedig 3 · 100 = 300.',
        breakdown: [
          { label: 'Alaki érték', value: '3' },
          { label: 'Helyiérték', value: '100 (százas)' },
          { label: 'Valódi érték', value: '300' }
        ]
      },
      {
        id: 'l1-q5',
        prompt: 'Melyik a helyes helyiértékes összegalakja a számnak?',
        highlightValue: '2 460',
        questionTypeBadge: 'Helyiértékes felbontás',
        options: [
          '2000 + 400 + 60',
          '200 + 40 + 6',
          '2000 + 40 + 6',
          '2000 + 400 + 6'
        ],
        correctAnswer: '2000 + 400 + 60',
        explanation: '2 460 = 2 · 1000 + 4 · 100 + 6 · 10 + 0 · 1 = 2000 + 400 + 60.',
        breakdown: [{ label: 'Összeg', value: '2000 + 400 + 60' }]
      },
      {
        id: 'l1-q6',
        prompt: 'Hány százasból áll a következő szám?',
        highlightValue: '1 500',
        questionTypeBadge: 'Helyiérték átváltás',
        options: ['15 darab százas', '5 darab százas', '150 darab százas', '1 darab százas'],
        correctAnswer: '15 darab százas',
        explanation: '1 500 = 15 · 100, tehát 15 darab százasból áll.',
        breakdown: [
          { label: '1 500 : 100', value: '15' },
          { label: 'Eredmény', value: '15 százas' }
        ]
      },
      {
        id: 'l1-q7',
        prompt: 'Melyik számjegynek a legkisebb a helyiértéke a számban?',
        highlightValue: '8 914',
        questionTypeBadge: 'Helyiérték sorrend',
        options: ['4 (egyesek)', '8 (ezresek)', '9 (százasok)', '1 (tízesek)'],
        correctAnswer: '4 (egyesek)',
        explanation: 'A legkisebb helyiérték az egyesek helye (1), amin a 4-es áll.',
        breakdown: [{ label: 'Legkisebb helyiérték', value: '1 (egyes)' }]
      },
      {
        id: 'l1-q8',
        prompt: 'Mennyi a tízesek helyén álló számjegy valódi értéke?',
        highlightValue: '5 082',
        questionTypeBadge: 'Valódi érték',
        options: ['80', '8', '800', '0'],
        correctAnswer: '80',
        explanation: 'A tízesek helyén a 8-as áll, így valódi értéke 8 · 10 = 80.',
        breakdown: [{ label: '8 · 10', value: '80' }]
      },
      {
        id: 'l1-q9',
        prompt: 'Melyik szám keletkezik, ha a 6 325-ben felcseréljük az ezresek és tízesek helyén álló számjegyet?',
        highlightValue: '6 325',
        questionTypeBadge: 'Számjegycsere',
        options: ['2 365', '3 625', '6 235', '5 326'],
        correctAnswer: '2 365',
        explanation: 'Az ezresek helyén a 6-os, a tízesekén a 2-es állt. Csere után: 2 365.',
        breakdown: [
          { label: 'Eredeti', value: '6 3 2 5' },
          { label: 'Csere (E ↔ T)', value: '2 3 6 5' }
        ]
      },
      {
        id: 'l1-q10',
        prompt: 'Melyik a legnagyobb 4-jegyű szám, amely a 2, 0, 8, 5 számjegyekből kirakható (minden jegy egyszer szerepel)?',
        highlightValue: 'Számjegyek: 2, 0, 8, 5',
        questionTypeBadge: 'Számképzés',
        options: ['8 520', '8 502', '8 250', '5 820'],
        correctAnswer: '8 520',
        explanation: 'A legnagyobb számhoz a legnagyobb számjegyet kell a legnagyobb helyiértékre tenni: 8 520.',
        breakdown: [
          { label: 'Csökkenő sorrend', value: '8 > 5 > 2 > 0' },
          { label: 'Legnagyobb szám', value: '8 520' }
        ]
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Közepes szint',
    subtitle: '5–6 jegyű számok (10 000–999 999)',
    range: '10 000 – 999 999',
    focus: 'Tízezresek (Té), százezresek (Sze), 0 helyiértékek',
    color: 'amber',
    badgeBg: 'bg-amber-50 dark:bg-amber-950/40',
    badgeBorder: 'border-amber-200 dark:border-amber-800',
    badgeText: 'text-amber-700 dark:text-amber-300',
    accentGradient: 'from-amber-500 to-orange-600',
    iconBg: 'bg-amber-100 text-amber-600 dark:bg-amber-900/50 dark:text-amber-400',
    questions: [
      {
        id: 'l2-q1',
        prompt: 'Melyik számjegy áll a tízezresek helyiértékén a számban?',
        highlightValue: '548 921',
        questionTypeBadge: 'Tízezres helyiérték',
        options: ['4', '5', '8', '9'],
        correctAnswer: '4',
        explanation: 'Hátulról: 1 (e), 2 (T), 9 (Sz), 8 (E), 4 (Té = tízezres), 5 (Sze = százezres).',
        breakdown: [
          { label: 'Százezres', value: '5' },
          { label: 'Tízezres', value: '4' },
          { label: 'Ezres', value: '8' }
        ]
      },
      {
        id: 'l2-q2',
        prompt: 'Mennyi a kiemelt 6-os számjegy valódi értéke?',
        highlightValue: '603 415',
        questionTypeBadge: 'Százezres valódi érték',
        options: ['600 000', '60 000', '6 000', '600'],
        correctAnswer: '600 000',
        explanation: 'A 6-os a százezresek helyén áll, így valódi értéke: 6 · 100 000 = 600 000.',
        breakdown: [
          { label: 'Alaki érték', value: '6' },
          { label: 'Helyiérték', value: '100 000' },
          { label: 'Valódi érték', value: '600 000' }
        ]
      },
      {
        id: 'l2-q3',
        prompt: 'Melyik szám hiányzik a helyiértékes összegből?',
        highlightValue: '700 000 + ? + 400 + 20 + 9 = 750 429',
        questionTypeBadge: 'Hiányos felbontás',
        options: ['50 000', '5 000', '500 000', '500'],
        correctAnswer: '50 000',
        explanation: 'A tízezresek helyén az 5-ös áll, melynek valódi értéke 50 000.',
        breakdown: [{ label: 'Hiányzó tag', value: '50 000' }]
      },
      {
        id: 'l2-q4',
        prompt: 'Melyik szám felel meg a következő leírásnak?',
        highlightValue: '4Sze + 0Té + 8E + 3Sz + 0T + 7e',
        questionTypeBadge: 'Helyiérték összerakás',
        options: ['408 307', '480 307', '48 307', '408 370'],
        correctAnswer: '408 307',
        explanation: '400 000 + 8000 + 300 + 7 = 408 307. A tízezres és tízes helyiértékeken 0 áll.',
        breakdown: [{ label: 'Szám', value: '408 307' }]
      },
      {
        id: 'l2-q5',
        prompt: 'Hány darab ezresből áll a következő szám?',
        highlightValue: '85 000',
        questionTypeBadge: 'Ezresek száma',
        options: ['85', '850', '8,5', '8 500'],
        correctAnswer: '85',
        explanation: '85 000 = 85 · 1000, azaz pontosan 85 darab ezres.',
        breakdown: [{ label: '85 000 : 1000', value: '85 ezres' }]
      },
      {
        id: 'l2-q6',
        prompt: 'Melyik állítás IGAZ a 304 050 számra?',
        highlightValue: '304 050',
        questionTypeBadge: 'Tulajdonság ellenőrzés',
        options: [
          'A tízezresek, százasok és egyesek helyén 0 áll.',
          'A százezresek helyén 4 áll.',
          'A tízesek helyén 0 áll.',
          'A valódi értéke kisebb, mint 30 000.'
        ],
        correctAnswer: 'A tízezresek, százasok és egyesek helyén 0 áll.',
        explanation: '3 (Sze), 0 (Té), 4 (E), 0 (Sz), 5 (T), 0 (e) -> A 0-k a tízezres, százas és egyes helyeken vannak.',
        breakdown: [{ label: 'Nullák helye', value: 'Té, Sz, e' }]
      },
      {
        id: 'l2-q7',
        prompt: 'Mennyivel nő a 42 300 értéke, ha az ezresek számjegyét 5-tel megnöveljük?',
        highlightValue: '42 300 (ezresek +5)',
        questionTypeBadge: 'Értékváltozás',
        options: ['5 000-rel', '500-zal', '50 000-rel', '5-tel'],
        correctAnswer: '5 000-rel',
        explanation: 'Az ezresek helyiértéke 1000. Ha a számjegyet 5-tel növeljük, az érték 5 · 1000 = 5000-rel nő (47 300 lesz).',
        breakdown: [{ label: '5 · 1000', value: '5 000' }]
      },
      {
        id: 'l2-q8',
        prompt: 'Melyik számjegy áll a százezresek helyén a 924 513-ban?',
        highlightValue: '924 513',
        questionTypeBadge: 'Helyiérték azonosítás',
        options: ['9', '2', '4', '5'],
        correctAnswer: '9',
        explanation: 'A 6-jegyű szám legelső (bal szélső) jegye a százezres, ami a 9-es.',
        breakdown: [{ label: 'Százezres jegy', value: '9' }]
      },
      {
        id: 'l2-q9',
        prompt: 'Melyik a helyes szorzatos felbontása a 640 050 számnak?',
        highlightValue: '640 050',
        questionTypeBadge: 'Szorzatos felbontás',
        options: [
          '6 · 100 000 + 4 · 10 000 + 5 · 10',
          '6 · 10 000 + 4 · 1 000 + 5 · 10',
          '6 · 100 000 + 4 · 1 000 + 5 · 1',
          '6 · 100 000 + 4 · 10 000 + 5 · 100'
        ],
        correctAnswer: '6 · 100 000 + 4 · 10 000 + 5 · 10',
        explanation: '6 · 100 000 = 600 000, 4 · 10 000 = 40 000, 5 · 10 = 50. Összegük: 640 050.',
        breakdown: [{ label: 'Szorzatösszeg', value: '600 000 + 40 000 + 50' }]
      },
      {
        id: 'l2-q10',
        prompt: 'Melyik a legkisebb 6-jegyű szám, amelyben minden számjegy különböző?',
        highlightValue: '6 különböző számjegy',
        questionTypeBadge: 'Számképzés',
        options: ['102 345', '123 456', '100 000', '102 340'],
        correctAnswer: '102 345',
        explanation: 'A legelső jegy nem lehet 0, így 1-gyel kezdünk, majd növekvő sorrendben a legkisebb még fel nem használt jegyek: 0, 2, 3, 4, 5 -> 102 345.',
        breakdown: [{ label: 'Legkisebb szám', value: '102 345' }]
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Nehéz szint',
    subtitle: 'Milliós nagyságrend (1 000 000-ig és felette)',
    range: '1 000 000+',
    focus: 'Milliók (M), összetett felbontás, helyiérték algebra',
    color: 'purple',
    badgeBg: 'bg-purple-50 dark:bg-purple-950/40',
    badgeBorder: 'border-purple-200 dark:border-purple-800',
    badgeText: 'text-purple-700 dark:text-purple-300',
    accentGradient: 'from-purple-600 to-indigo-600',
    iconBg: 'bg-purple-100 text-purple-600 dark:bg-purple-900/50 dark:text-purple-400',
    questions: [
      {
        id: 'l3-q1',
        prompt: 'Hány darab tízezres ad ki pontosan 1 milliót (1 000 000)?',
        highlightValue: '1 000 000 : 10 000 = ?',
        questionTypeBadge: 'Helyiérték arány',
        options: ['100 darab', '10 darab', '1 000 darab', '50 darab'],
        correctAnswer: '100 darab',
        explanation: '1 000 000 : 10 000 = 100. Száz darab tízezres ér 1 milliót.',
        breakdown: [{ label: '1 000 000 : 10 000', value: '100' }]
      },
      {
        id: 'l3-q2',
        prompt: 'Melyik szám felel meg a következő szorzatos alaknak?',
        highlightValue: '8 · 100 000 + 5 · 1 000 + 4 · 10',
        questionTypeBadge: 'Szorzatösszeg',
        options: ['805 040', '850 040', '805 400', '85 040'],
        correctAnswer: '805 040',
        explanation: '800 000 + 5 000 + 40 = 805 040.',
        breakdown: [
          { label: '8 · 100 000', value: '800 000' },
          { label: '5 · 1 000', value: '5 000' },
          { label: '4 · 10', value: '40' },
          { label: 'Összeg', value: '805 040' }
        ]
      },
      {
        id: 'l3-q3',
        prompt: 'Egy 6-jegyű számban a százezresek valódi értéke 400 000, a tízeseké 70, a többi helyiértéken 0 áll. Mi a szám?',
        highlightValue: '400 000 és 70',
        questionTypeBadge: 'Szöveges helyiérték',
        options: ['400 070', '40 070', '400 700', '4 000 070'],
        correctAnswer: '400 070',
        explanation: '400 000 + 70 = 400 070.',
        breakdown: [{ label: 'Szám', value: '400 070' }]
      },
      {
        id: 'l3-q4',
        prompt: 'Mennyivel nagyobb a 6-os valódi értéke az 5-ös valódi értékénél a számban?',
        highlightValue: '652 000',
        questionTypeBadge: 'Valódi értékek különbsége',
        options: ['550 000', '600 000', '50 000', '100 000'],
        correctAnswer: '550 000',
        explanation: 'A 6-os valódi értéke 600 000, az 5-ösé 50 000. Különbségük: 600 000 - 50 000 = 550 000.',
        breakdown: [
          { label: '6-os értéke', value: '600 000' },
          { label: '5-ös értéke', value: '50 000' },
          { label: 'Különbség', value: '550 000' }
        ]
      },
      {
        id: 'l3-q5',
        prompt: 'Melyik a legnagyobb 5-jegyű páros szám, amelyben a tízezresek helyén 7 áll, és minden jegye különböző?',
        highlightValue: 'Feltételek: 5-jegyű, páros, Té=7, különböző jegyek',
        questionTypeBadge: 'Összetett számképzés',
        options: ['79 864', '79 854', '79 862', '78 964'],
        correctAnswer: '79 864',
        explanation: 'Tízezres: 7. A lehető legnagyobb jegyek: 9, 8, 6, és a legvégére páros jegy kell, ami a még elérhető legnagyobb páros: 4 -> 79 864.',
        breakdown: [{ label: 'Keresett szám', value: '79 864' }]
      },
      {
        id: 'l3-q6',
        prompt: 'Hány darab tízesből áll a 34 000 szám?',
        highlightValue: '34 000 : 10 = ?',
        questionTypeBadge: 'Tízesek száma',
        options: ['3 400', '340', '34', '34 000'],
        correctAnswer: '3 400',
        explanation: '34 000 : 10 = 3 400. Tehát 3 400 darab tízesből áll.',
        breakdown: [{ label: '34 000 : 10', value: '3 400 tízes' }]
      },
      {
        id: 'l3-q7',
        prompt: 'Ha egy számot megszorzunk 100-zal, hogyan változik az egyes számjegyek helyiértéke?',
        highlightValue: 'Szorzás 100-zal',
        questionTypeBadge: 'Helyiérték eltolódás',
        options: [
          'Minden számjegy 2 hellyel balra tolódik (100-szoros helyiértékre).',
          'Minden számjegy 1 hellyel balra tolódik.',
          'Minden számjegy 2 hellyel jobbra tolódik.',
          'A helyiértékek nem változnak, csak a szám nő.'
        ],
        correctAnswer: 'Minden számjegy 2 hellyel balra tolódik (100-szoros helyiértékre).',
        explanation: '100-zal való szorzáskor a tízes rendszerben minden jegy két helyiértékkel balra vándorol (pl. az egyesből százas lesz).',
        breakdown: [{ label: 'Eltolódás', value: '2 hellyel balra' }]
      },
      {
        id: 'l3-q8',
        prompt: 'Melyik szám egyenlő a következő kifejezéssel: 9Sze + 99E + 9e?',
        highlightValue: '9Sze + 99E + 9e',
        questionTypeBadge: 'Összevont helyiérték',
        options: ['999 009', '909 909', '999 090', '990 009'],
        correctAnswer: '999 009',
        explanation: '900 000 + 99 000 + 9 = 999 009.',
        breakdown: [
          { label: '9 Sze', value: '900 000' },
          { label: '99 E', value: '99 000' },
          { label: '9 e', value: '9' },
          { label: 'Összeg', value: '999 009' }
        ]
      },
      {
        id: 'l3-q9',
        prompt: 'Hány olyan 4-jegyű szám létezik, amelynek az ezresek helyén 5 áll, és minden más helyiértéken 0?',
        highlightValue: 'Ezres = 5, többi = 0',
        questionTypeBadge: 'Kombinatorika / Helyiérték',
        options: ['Pontosan 1 (az 5000)', '10 darab', '100 darab', 'Végtelen sok'],
        correctAnswer: 'Pontosan 1 (az 5000)',
        explanation: 'Csak az 5 000 felel meg a leírásnak.',
        breakdown: [{ label: 'Megoldás', value: '5 000 (1 db)' }]
      },
      {
        id: 'l3-q10',
        prompt: 'Melyik szám a legnagyobb az alábbiak közül?',
        highlightValue: 'Összehasonlítás',
        options: [
          '5 · 100 000 + 9 · 10 000',
          '550 000',
          '580 000 + 9 000',
          '6 · 100 000 - 15 000'
        ],
        correctAnswer: '589 000 vs 590 000 -> 5 · 100 000 + 9 · 10 000 = 590 000',
        explanation: 'A: 590 000, B: 550 000, C: 589 000, D: 585 000. A legnagyobb az 590 000 (5 · 100 000 + 9 · 10 000).',
        breakdown: [
          { label: 'A', value: '590 000 (Legnagyobb)' },
          { label: 'B', value: '550 000' },
          { label: 'C', value: '589 000' },
          { label: 'D', value: '585 000' }
        ]
      }
    ]
  }
};

// Fix options in l3-q10 to make them match clean
QUIZ_LEVELS[3].questions[9].options = [
  '5 · 100 000 + 9 · 10 000',
  '550 000',
  '580 000 + 9 000',
  '6 · 100 000 - 15 000'
];
QUIZ_LEVELS[3].questions[9].correctAnswer = '5 · 100 000 + 9 · 10 000';

const PLACE_VALUE_CHEAT_SHEET = [
  { unit: 'e (egyes)', value: '1', note: '1. hely jobbról (10⁰)' },
  { unit: 'T (tízes)', value: '10', note: '2. hely jobbról (10¹)' },
  { unit: 'Sz (százas)', value: '100', note: '3. hely jobbról (10²)' },
  { unit: 'E (ezres)', value: '1 000', note: '4. hely jobbról (10³)' },
  { unit: 'Té (tízezres)', value: '10 000', note: '5. hely jobbról (10⁴)' },
  { unit: 'Sze (százezres)', value: '100 000', note: '6. hely jobbról (10⁵)' },
  { unit: 'M (milliós)', value: '1 000 000', note: '7. hely jobbról (10⁶)' }
];

interface PlaceValueQuizProps {
  onBack: () => void;
}

export function PlaceValueQuiz({ onBack }: PlaceValueQuizProps) {
  const [selectedLevel, setSelectedLevel] = useState<DifficultyLevel | null>(null);
  const [gameMode, setGameMode] = useState<GameMode>('quiz');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showCheatSheet, setShowCheatSheet] = useState(false);

  useEffect(() => {
    if (isCompleted) {
      const duration = 2.5 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };

      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) return clearInterval(interval);
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
  };

  const handleOptionClick = (option: string) => {
    if (isAnswerChecked) return;
    setSelectedOption(option);
    setIsAnswerChecked(true);

    const currentLevelConfig = selectedLevel ? QUIZ_LEVELS[selectedLevel] : null;
    if (!currentLevelConfig) return;

    const currentQ = currentLevelConfig.questions[currentIndex];
    const isCorrect = option === currentQ.correctAnswer;

    if (isCorrect) {
      const nextScore = score + 1;
      const nextStreak = streak + 1;
      setScore(nextScore);
      setStreak(nextStreak);
      if (nextStreak > bestStreak) setBestStreak(nextStreak);
    } else {
      setStreak(0);
    }
  };

  const handleNextQuestion = () => {
    if (!selectedLevel) return;
    const currentQuestions = QUIZ_LEVELS[selectedLevel].questions;

    if (currentIndex < currentQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerChecked(false);
    } else {
      setIsCompleted(true);
    }
  };

  useEffect(() => {
    if (!selectedLevel || isCompleted || gameMode !== 'quiz') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (['1', '2', '3', '4'].includes(e.key) && !isAnswerChecked) {
        const index = parseInt(e.key, 10) - 1;
        const currentQ = QUIZ_LEVELS[selectedLevel].questions[currentIndex];
        if (currentQ && currentQ.options[index]) {
          handleOptionClick(currentQ.options[index]);
        }
      } else if (e.key === 'Enter' && isAnswerChecked) {
        handleNextQuestion();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedLevel, currentIndex, isAnswerChecked, isCompleted, gameMode]);

  // 1. Level Selection Screen
  if (!selectedLevel) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-2 sm:py-3 animate-in fade-in slide-in-from-bottom-2 duration-300 text-left">
        <div className="flex items-center justify-between gap-3 mb-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="rounded-xl h-9 px-3 border border-slate-200/80 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-1.5" /> Vissza a témakörökhöz
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowCheatSheet(!showCheatSheet)}
            className="rounded-xl h-9 px-3 border-blue-300 bg-blue-50/60 text-blue-800 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800 hover:bg-blue-100 text-xs sm:text-sm font-bold"
          >
            <BookOpen className="w-3.5 h-3.5 mr-1.5 text-blue-600" />
            Helyiérték-táblázat segédlet
          </Button>
        </div>

        <div className="text-center max-w-2xl mx-auto mb-4 sm:mb-5">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight flex items-center justify-center gap-2 mb-1">
            <span className="text-2xl">🔢</span>
            <span>A Helyiértékes Írás Gyakorló</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Gyakorold az alaki, helyi- és valódi értékeket, valamint a helyiértékes felbontást kvízzel vagy kártyanyitogatóval!
          </p>

          <div className="inline-flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl mt-3 border border-slate-200 dark:border-slate-700">
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
              <LayoutGrid className="w-3.5 h-3.5 text-indigo-500" />
              Kártyás Párosító
            </button>
          </div>
        </div>

        {showCheatSheet && (
          <div className="mb-4 p-4 sm:p-5 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-slate-850 rounded-2xl border-2 border-blue-200 dark:border-blue-900/60 shadow-md animate-in fade-in duration-200">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm sm:text-base font-black text-blue-900 dark:text-blue-200 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-blue-600" />
                Helyiérték-rendszer és fogalmak
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
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
              {PLACE_VALUE_CHEAT_SHEET.map((item, idx) => (
                <div key={idx} className="bg-white/95 dark:bg-slate-800/95 p-2 rounded-xl border border-blue-100 dark:border-slate-700 shadow-xs text-left">
                  <div className="text-sm font-black text-blue-600 dark:text-blue-400">{item.unit}</div>
                  <div className="text-xs font-black text-slate-800 dark:text-slate-100">{item.value}</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight mt-0.5">{item.note}</div>
                </div>
              ))}
            </div>
            <div className="mt-3 p-2.5 bg-white/80 dark:bg-slate-800/80 rounded-xl border border-blue-100 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 flex flex-wrap gap-4">
              <div><strong>Alaki érték:</strong> a leírt számjegy maga (pl. 5)</div>
              <div><strong>Helyiérték:</strong> a hely, ahol áll (pl. 100)</div>
              <div><strong>Valódi érték:</strong> Alaki érték · Helyiérték (pl. 5 · 100 = 500)</div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {([1, 2, 3] as DifficultyLevel[]).map((level) => {
            const cfg = QUIZ_LEVELS[level];
            return (
              <div
                key={level}
                onClick={() => handleStartLevel(level)}
                className="group relative bg-white dark:bg-slate-900 rounded-2xl p-5 border-2 border-slate-200/80 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 shadow-sm hover:shadow-lg transition-all duration-200 cursor-pointer flex flex-col justify-between overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-blue-500/10 to-transparent rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform" />

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform shadow-inner", cfg.iconBg)}>
                      <span className="font-serif font-black text-lg">{level === 1 ? 'I' : level === 2 ? 'II' : 'III'}</span>
                    </div>

                    <span className={cn("px-2.5 py-1 rounded-full text-[11px] font-black uppercase tracking-wider border", cfg.badgeBg, cfg.badgeBorder, cfg.badgeText)}>
                      {gameMode === 'quiz' ? '10 Kérdés' : '10 Pár'}
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
                      <span className="font-mono text-[11px] font-bold text-blue-600 dark:text-blue-400">{cfg.focus}</span>
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
                  {gameMode === 'quiz' ? 'Kvíz Indítása' : 'Párosító Indítása'}
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  const levelConfig = QUIZ_LEVELS[selectedLevel];
  const currentQuestion = levelConfig.questions[currentIndex];

  // 2. Quiz Completed View
  if (isCompleted && gameMode === 'quiz') {
    const totalQuestions = levelConfig.questions.length;
    const percentage = Math.round((score / totalQuestions) * 100);
    const isPerfect = score === totalQuestions;
    const isGood = score >= 7;

    return (
      <div className="max-w-xl mx-auto p-4 sm:p-6 text-center animate-in zoom-in-95 duration-300">
        <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl shadow-xl border-2 border-slate-200 dark:border-slate-800 relative overflow-hidden">
          <div className="w-20 h-20 bg-gradient-to-tr from-blue-500 to-indigo-600 text-white rounded-3xl flex items-center justify-center mx-auto shadow-lg mb-4 ring-8 ring-blue-100 dark:ring-blue-950/60 animate-bounce">
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

  // 3. Active Workspace with Wordwall Sidebar
  return (
    <div className="w-full max-w-6xl mx-auto px-2 sm:px-4 py-1 animate-in fade-in duration-200 text-left">
      <div className="flex flex-wrap items-center justify-between gap-2.5 mb-2.5">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setSelectedLevel(null)}
          className="h-8 rounded-xl px-2.5 border border-slate-200/80 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium text-xs"
        >
          <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Szint választás
        </Button>

        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl border border-slate-200/60 dark:border-slate-700/60">
          {([1, 2, 3] as DifficultyLevel[]).map((lvl) => (
            <button
              key={lvl}
              onClick={() => handleStartLevel(lvl)}
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
          ) : (
            <div className="flex items-center gap-1.5 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 px-3 py-1 rounded-xl border border-indigo-200 dark:border-indigo-800 text-xs font-bold">
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Párosító Mód</span>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* Main Workspace (9 cols) */}
        <div className="lg:col-span-9 flex flex-col gap-3">
          {gameMode === 'quiz' ? (
            <div className="space-y-3">
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
                <div className="flex flex-col gap-3">
                  <Card className="rounded-2xl border-2 border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
                    <CardContent className="p-4 sm:p-5 text-center">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 mb-2 border border-blue-200 dark:border-blue-800">
                        <Binary className="w-3 h-3 text-blue-600" />
                        {currentQuestion.questionTypeBadge}
                      </div>

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

                {/* Right: 4 Options */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between px-1">
                    <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Válaszd ki a megoldást:
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
                            "relative min-h-[50px] sm:min-h-[56px] rounded-xl font-sans font-black text-sm sm:text-base transition-all duration-150 flex items-center justify-between px-4 text-left py-2",
                            buttonStyle
                          )}
                        >
                          <span className="flex items-center gap-2.5">
                            <span className="w-6 h-6 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-xs font-sans font-bold flex items-center justify-center shrink-0 border border-slate-200 dark:border-slate-700">
                              {idx + 1}
                            </span>
                            <span className="font-mono font-bold text-sm sm:text-base leading-snug">{option}</span>
                          </span>

                          {isAnswerChecked && isCorrect && (
                            <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 ml-2 animate-in zoom-in" />
                          )}
                          {isAnswerChecked && isSelected && !isCorrect && (
                            <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 ml-2 animate-in zoom-in" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {!isAnswerChecked && (
                    <div className="p-2.5 bg-blue-50/60 dark:bg-slate-850/80 rounded-xl border border-blue-200/50 dark:border-slate-800 text-[11px] text-blue-900 dark:text-blue-300 flex items-center gap-1.5 mt-0.5">
                      <Sparkles className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span>Figyeld a helyiérték-táblázat oszlopait és a számjegyek helyét!</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <PlaceValueMatcher
              level={selectedLevel}
              onNextLevel={
                selectedLevel < 3
                  ? () => handleStartLevel((selectedLevel + 1) as DifficultyLevel, 'matcher')
                  : undefined
              }
              onOpenRules={() => setShowCheatSheet(true)}
            />
          )}
        </div>

        {/* Wordwall Sidebar (3 cols) */}
        <div className="lg:col-span-3 flex flex-col gap-3">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-3.5 border-2 border-slate-200/80 dark:border-slate-800 shadow-xs">
            <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2.5 px-1">
              <Layers className="w-3.5 h-3.5 text-blue-500" />
              <span>Sablon / Játékmód</span>
            </div>

            <div className="flex flex-col gap-1.5">
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
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 font-normal">Többválasztós teszt</div>
                </div>
              </button>

              <button
                onClick={() => setGameMode('matcher')}
                className={cn(
                  "w-full p-2.5 rounded-xl text-left font-bold text-xs transition-all flex items-center gap-2.5 border-2",
                  gameMode === 'matcher'
                    ? "bg-indigo-50 dark:bg-indigo-950/50 border-indigo-400 text-indigo-900 dark:text-indigo-200 shadow-xs"
                    : "bg-slate-50/80 dark:bg-slate-800/60 border-transparent hover:border-slate-200 text-slate-600 dark:text-slate-400"
                )}
              >
                <div className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                  gameMode === 'matcher' ? "bg-indigo-500 text-white" : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                )}>
                  <LayoutGrid className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-black text-xs">Kártyanyitogatás</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 font-normal">Párosító memóriajáték</div>
                </div>
              </button>
            </div>
          </div>

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
                  <span>{lvl}. {lvl === 1 ? 'Könnyű (3–4 jegyű)' : lvl === 2 ? 'Közepes (5–6 jegyű)' : 'Nehéz (Milliós)'}</span>
                  {selectedLevel === lvl && <CheckCircle2 className="w-3.5 h-3.5" />}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl p-3.5 border-2 border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col gap-1.5">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowCheatSheet(!showCheatSheet)}
              className="w-full h-9 rounded-xl border-blue-300 bg-blue-50/50 text-blue-800 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800 hover:bg-blue-100 text-xs font-bold justify-start"
            >
              <BookOpen className="w-3.5 h-3.5 mr-2 text-blue-600" />
              Helyiérték segédlet
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

      {showCheatSheet && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border-2 border-blue-300 dark:border-blue-900 shadow-2xl max-w-2xl w-full text-left">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-600" />
                Helyiérték-táblázat és alapfogalmak
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

            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2.5 mb-4">
              {PLACE_VALUE_CHEAT_SHEET.map((item, idx) => (
                <div key={idx} className="bg-slate-50 dark:bg-slate-800/90 p-2.5 rounded-xl border border-slate-200/80 dark:border-slate-700">
                  <div className="text-sm font-black text-blue-600 dark:text-blue-400">{item.unit}</div>
                  <div className="text-xs font-black text-slate-800 dark:text-slate-100">{item.value}</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight mt-0.5">{item.note}</div>
                </div>
              ))}
            </div>

            <div className="text-xs text-slate-600 dark:text-slate-400 bg-blue-50/80 dark:bg-blue-950/40 p-3 rounded-xl border border-blue-200 dark:border-blue-900/60 leading-relaxed mb-4 space-y-1">
              <p><strong>Alaki érték:</strong> Amilyen számjegyet látsz (0, 1, 2, ..., 9).</p>
              <p><strong>Helyiérték:</strong> A hely, amit a számjegy elfoglal (egyes=1, tízes=10, százas=100, ezres=1000, tízezres=10 000, százezres=100 000, milliós=1 000 000).</p>
              <p><strong>Valódi érték:</strong> Alaki érték szorozva a helyiértékkel (pl. a 4-es a tízezres helyen: $4 \cdot 10\ 000 = 40\ 000$).</p>
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

export default PlaceValueQuiz;
