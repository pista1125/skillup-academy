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
import { OrderOfOperationsMatcher } from './OrderOfOperationsMatcher';
import { OrderOfOperationsSorter } from './OrderOfOperationsSorter';

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

const OPERATIONS_CHEAT_SHEET = [
  { topic: '1. Zárójelek elsőbbsége', formula: '( ) ➔ [ ] ➔ { }', note: 'Mindig a legbelső zárójeltől haladunk kifelé a számolásban.' },
  { topic: '2. Magasabb rendű műveletek', formula: 'Szorzás (·) és Osztás (:)', note: 'Megelőzik az összeadást és kivonást. Ha több van belőlük, balról jobbra haladunk!' },
  { topic: '3. Alacsonyabb rendű műveletek', formula: 'Összeadás (+) és Kivonás (-)', note: 'Utolsó lépésként végezzük el, balról jobbra a felírás sorrendjében.' },
  { topic: 'Kommutativitás (Felcserélhetőség)', formula: 'a + b = b + a | a · b = b · a', note: 'Összeadásnál és szorzásnál felcserélhetők a tagok, kivonásnál és osztásnál NEM!' },
  { topic: 'Asszociativitás (Csoportosíthatóság)', formula: '(a + b) + c = a + (b + c)', note: 'Azonos műveleteknél a tagok tetszés szerint csoportosíthatók a könnyebb számolásért.' },
  { topic: 'Disztributivitás (Széttagolhatóság)', formula: 'c · (a + b) = c · a + c · b', note: 'Zárójel felbontása tagonkénti szorzással vagy közös tényező kiemelésével.' },
  { topic: 'Kiemelés (Okos számolás)', formula: 'a · c + b · c = (a + b) · c', note: 'Például: 37 · 84 + 37 · 16 = 37 · (84 + 16) = 37 · 100 = 3700.' },
  { topic: 'Mínuszjel zárójel előtt', formula: 'a - (b + c) = a - b - c', note: 'Zárójel felbontásakor a benne lévő összes tag előjele az ellenkezőjére vált.' }
];

const QUIZ_LEVELS: Record<DifficultyLevel, LevelConfig> = {
  1: {
    level: 1,
    title: '1. Könnyű szint',
    subtitle: 'Alap műveleti sorrend, szorzás/osztás elsőbbsége és egyszerű zárójelek',
    range: 'Alapszintű kifejezések',
    focus: 'Hierarchia, szorzás megelőzi az összeadást, zárójel hatása, balról jobbra szabály',
    color: 'amber',
    badgeBg: 'bg-amber-50 dark:bg-amber-950/40',
    badgeBorder: 'border-amber-200 dark:border-amber-800',
    badgeText: 'text-amber-700 dark:text-amber-300',
    accentGradient: 'from-amber-500 to-orange-600',
    iconBg: 'bg-amber-500 text-white',
    questions: [
      {
        id: 'q1-1',
        prompt: 'Milyen sorrendben kell elvégezni a műveleteket egy kifejezésben?',
        highlightValue: 'Műveleti hierarchia',
        questionTypeBadge: 'Alapszabály',
        options: [
          '1. Zárójel, 2. Szorzás/Osztás, 3. Összeadás/Kivonás',
          'Mindig szigorúan balról jobbra haladunk',
          '1. Összeadás, 2. Kivonás, 3. Szorzás, 4. Osztás',
          '1. Szorzás, 2. Összeadás, 3. Zárójel'
        ],
        correctAnswer: '1. Zárójel, 2. Szorzás/Osztás, 3. Összeadás/Kivonás',
        explanation: 'A műveleti sorrend legfőbb szabálya: először a zárójeles kifejezést végezzük el, majd a magasabb rendű szorzást/osztást, végül az alacsonyabb rendű összeadást/kivonást.',
        breakdown: [
          { label: '1. szint', value: 'Zárójelek: ( ), [ ], { }' },
          { label: '2. szint', value: 'Szorzás és Osztás (balról jobbra)' },
          { label: '3. szint', value: 'Összeadás és Kivonás (balról jobbra)' }
        ]
      },
      {
        id: 'q1-2',
        prompt: 'Mennyi a kifejezés pontos értéke?',
        highlightValue: '18 + 2 · 6',
        questionTypeBadge: 'Szorzás elsőbbsége',
        options: ['30', '120', '26', '24'],
        correctAnswer: '30',
        explanation: 'A szorzást kell előbb elvégezni: 2 · 6 = 12, majd hozzáadjuk a 18-hoz: 18 + 12 = 30.',
        breakdown: [
          { label: '1. lépés (szorzás)', value: '2 · 6 = 12' },
          { label: '2. lépés (összeadás)', value: '18 + 12 = 30' }
        ]
      },
      {
        id: 'q1-3',
        prompt: 'Mennyi a kifejezés pontos értéke?',
        highlightValue: '(18 + 2) · 6',
        questionTypeBadge: 'Zárójel elsőbbsége',
        options: ['120', '30', '108', '96'],
        correctAnswer: '120',
        explanation: 'A zárójel megváltoztatja a sorrendet! Először 18 + 2 = 20, majd 20 · 6 = 120.',
        breakdown: [
          { label: '1. lépés (zárójel)', value: '18 + 2 = 20' },
          { label: '2. lépés (szorzás)', value: '20 · 6 = 120' }
        ]
      },
      {
        id: 'q1-4',
        prompt: 'Mennyi a kifejezés pontos értéke?',
        highlightValue: '40 - 10 : 2',
        questionTypeBadge: 'Osztás elsőbbsége',
        options: ['35', '15', '20', '25'],
        correctAnswer: '35',
        explanation: 'Az osztás megelőzi a kivonást: 10 : 2 = 5, majd 40 - 5 = 35.',
        breakdown: [
          { label: '1. lépés (osztás)', value: '10 : 2 = 5' },
          { label: '2. lépés (kivonás)', value: '40 - 5 = 35' }
        ]
      },
      {
        id: 'q1-5',
        prompt: 'Mennyi a kifejezés pontos értéke?',
        highlightValue: '(40 - 10) : 2',
        questionTypeBadge: 'Zárójel osztással',
        options: ['15', '35', '20', '10'],
        correctAnswer: '15',
        explanation: 'A zárójel miatt előbb a kivonást végezzük el: 40 - 10 = 30, majd 30 : 2 = 15.',
        breakdown: [
          { label: '1. lépés (zárójel)', value: '40 - 10 = 30' },
          { label: '2. lépés (osztás)', value: '30 : 2 = 15' }
        ]
      },
      {
        id: 'q1-6',
        prompt: 'Hogyan számoljuk ki az azonos rendű műveleteket tartalmazó kifejezést?',
        highlightValue: '25 - 10 + 5',
        questionTypeBadge: 'Balról jobbra szabály',
        options: ['20', '10', '30', '15'],
        correctAnswer: '20',
        explanation: 'Az összeadás és kivonás azonos rangú műveletek, ezért balról jobbra a felírás sorrendjében haladunk: 25 - 10 = 15, majd 15 + 5 = 20.',
        breakdown: [
          { label: '1. lépés (balról az első)', value: '25 - 10 = 15' },
          { label: '2. lépés (következő művelet)', value: '15 + 5 = 20' }
        ]
      },
      {
        id: 'q1-7',
        prompt: 'Mennyi a kifejezés helyes eredménye?',
        highlightValue: '60 : 3 · 2',
        questionTypeBadge: 'Szorzás és osztás sorrendje',
        options: ['40', '10', '20', '30'],
        correctAnswer: '40',
        explanation: 'Az osztás és szorzás azonos rangú, ezért balról jobbra haladunk! 60 : 3 = 20, majd 20 · 2 = 40. (Nem 60 : 6!)',
        breakdown: [
          { label: '1. lépés (balról osztás)', value: '60 : 3 = 20' },
          { label: '2. lépés (majd szorzás)', value: '20 · 2 = 40' }
        ]
      },
      {
        id: 'q1-8',
        prompt: 'Melyik műveletpárnál NEM cserélhető fel a tagok sorrendje (nem kommutatív)?',
        highlightValue: 'a ? b ≠ b ? a',
        questionTypeBadge: 'Műveleti tulajdonságok',
        options: [
          'Kivonás és Osztás',
          'Összeadás és Szorzás',
          'Csak az Összeadás',
          'Csak a Szorzás'
        ],
        correctAnswer: 'Kivonás és Osztás',
        explanation: 'Az összeadás (a+b=b+a) és a szorzás (a·b=b·a) felcserélhető, de a kivonás (5-2 ≠ 2-5) és az osztás (6:2 ≠ 2:6) sorrendje kötött!',
        breakdown: [
          { label: 'Kommutatív (+, ·)', value: '3 + 5 = 5 + 3 | 4 · 7 = 7 · 4' },
          { label: 'Nem kommutatív (-, :)', value: '10 - 4 ≠ 4 - 10 | 12 : 3 ≠ 3 : 12' }
        ]
      },
      {
        id: 'q1-9',
        prompt: 'Mennyi a kifejezés értéke?',
        highlightValue: '0 · (45 + 55)',
        questionTypeBadge: 'Nullával való szorzás',
        options: ['0', '100', '45', 'Értelmetlen'],
        correctAnswer: '0',
        explanation: 'Bármilyen számot vagy kifejezést nullával szorozva az eredmény mindig nulla.',
        breakdown: [
          { label: '1. lépés (zárójel)', value: '45 + 55 = 100' },
          { label: '2. lépés (szorzás 0-val)', value: '0 · 100 = 0' }
        ]
      },
      {
        id: 'q1-10',
        prompt: 'Mennyi a kifejezés értéke?',
        highlightValue: '15 + 5 · 0',
        questionTypeBadge: 'Műveleti sorrend nullával',
        options: ['15', '0', '20', '10'],
        correctAnswer: '15',
        explanation: 'A szorzást végezzük el legelőször: 5 · 0 = 0, majd 15 + 0 = 15.',
        breakdown: [
          { label: '1. lépés (szorzás)', value: '5 · 0 = 0' },
          { label: '2. lépés (összeadás)', value: '15 + 0 = 15' }
        ]
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Közepes szint',
    subtitle: 'Többtagú kifejezések, zárójelfelbontás, szögletes zárójel és csoportosítás',
    range: 'Középfokú műveletsorok',
    focus: 'Több művelet kombinálása, asszociativitás, disztributivitás, hiányzó zárójel pótlása',
    color: 'orange',
    badgeBg: 'bg-orange-50 dark:bg-orange-950/40',
    badgeBorder: 'border-orange-200 dark:border-orange-800',
    badgeText: 'text-orange-700 dark:text-orange-300',
    accentGradient: 'from-orange-500 to-amber-600',
    iconBg: 'bg-orange-600 text-white',
    questions: [
      {
        id: 'q2-1',
        prompt: 'Számold ki a kifejezés pontos értékét!',
        highlightValue: '50 - 3 · (12 - 4)',
        questionTypeBadge: 'Kombinált kifejezés',
        options: ['26', '376', '24', '32'],
        correctAnswer: '26',
        explanation: '1. Zárójel: 12 - 4 = 8. 2. Szorzás: 3 · 8 = 24. 3. Kivonás: 50 - 24 = 26.',
        breakdown: [
          { label: '1. lépés (zárójel)', value: '12 - 4 = 8' },
          { label: '2. lépés (szorzás)', value: '3 · 8 = 24' },
          { label: '3. lépés (kivonás)', value: '50 - 24 = 26' }
        ]
      },
      {
        id: 'q2-2',
        prompt: 'Számold ki a kifejezés értékét!',
        highlightValue: '100 : (4 + 6 · 1)',
        questionTypeBadge: 'Zárójelen belüli sorrend',
        options: ['10', '25', '16', '20'],
        correctAnswer: '10',
        explanation: 'A zárójelen belül is érvényes a műveleti sorrend! 6 · 1 = 6, 4 + 6 = 10, majd 100 : 10 = 10.',
        breakdown: [
          { label: '1. lépés (zárójelben szorzás)', value: '6 · 1 = 6' },
          { label: '2. lépés (zárójelben összeadás)', value: '4 + 6 = 10' },
          { label: '3. lépés (osztás)', value: '100 : 10 = 10' }
        ]
      },
      {
        id: 'q2-3',
        prompt: 'Mennyi a négy műveletet tartalmazó kifejezés értéke?',
        highlightValue: '24 + 36 : 6 - 2 · 5',
        questionTypeBadge: 'Több művelet láncolata',
        options: ['20', '40', '30', '15'],
        correctAnswer: '20',
        explanation: 'Előbb a magasabb rendűek: 36 : 6 = 6 és 2 · 5 = 10. A kifejezés: 24 + 6 - 10 = 30 - 10 = 20.',
        breakdown: [
          { label: '1. lépés (osztás)', value: '36 : 6 = 6' },
          { label: '2. lépés (szorzás)', value: '2 · 5 = 10' },
          { label: '3. lépés (balról jobbra)', value: '24 + 6 - 10 = 20' }
        ]
      },
      {
        id: 'q2-4',
        prompt: 'Számold ki a két zárójeles kifejezést!',
        highlightValue: '(45 - 5) : (2 + 3 · 2)',
        questionTypeBadge: 'Két zárójel hányadosa',
        options: ['5', '8', '4', '10'],
        correctAnswer: '5',
        explanation: 'Bal zárójel: 45 - 5 = 40. Jobb zárójel: 2 + 6 = 8. Végül: 40 : 8 = 5.',
        breakdown: [
          { label: '1. lépés (első zárójel)', value: '45 - 5 = 40' },
          { label: '2. lépés (második zárójel)', value: '2 + 6 = 8' },
          { label: '3. lépés (osztás)', value: '40 : 8 = 5' }
        ]
      },
      {
        id: 'q2-5',
        prompt: 'Melyik műveleti tulajdonság teszi lehetővé ezt az okos csoportosítást?',
        highlightValue: '(17 + 89) + 11 = 17 + (89 + 11) = 17 + 100 = 117',
        questionTypeBadge: 'Műveleti azonosság',
        options: [
          'Asszociativitás (csoportosíthatóság)',
          'Kommutativitás (felcserélhetőség)',
          'Disztributivitás (széttagolhatóság)',
          'Kiemelés'
        ],
        correctAnswer: 'Asszociativitás (csoportosíthatóság)',
        explanation: 'Az összeadás asszociatív, ami azt jelenti, hogy a zárójelezés tetszés szerint átcsoportosítható a számolás megkönnyítésére.',
        breakdown: [
          { label: 'Szabály', value: '(a + b) + c = a + (b + c)' },
          { label: 'Előny', value: '89 + 11 = 100 kerek számot ad' }
        ]
      },
      {
        id: 'q2-6',
        prompt: 'Hogyan bontható fel helyesen a zárójel a széttagolhatóság (disztributivitás) alapján?',
        highlightValue: '4 · (25 + 7)',
        questionTypeBadge: 'Zárójelfelbontás',
        options: [
          '4 · 25 + 4 · 7 = 100 + 28 = 128',
          '4 · 25 + 7 = 100 + 7 = 107',
          '4 + 25 · 4 + 7 = 131',
          '25 + 4 · 7 = 53'
        ],
        correctAnswer: '4 · 25 + 4 · 7 = 100 + 28 = 128',
        explanation: 'Ha egy összeget szorzunk számmal, a zárójel minden tagját meg kell szorozni a szorzóval: c · (a + b) = c · a + c · b.',
        breakdown: [
          { label: '1. rész', value: '4 · 25 = 100' },
          { label: '2. rész', value: '4 · 7 = 28' },
          { label: 'Összeg', value: '100 + 28 = 128' }
        ]
      },
      {
        id: 'q2-7',
        prompt: 'Mennyi a szögletes és kerek zárójelet is tartalmazó kifejezés értéke?',
        highlightValue: '80 - 2 · [15 + (18 - 13)]',
        questionTypeBadge: 'Többszintű zárójel',
        options: ['40', '60', '50', '30'],
        correctAnswer: '40',
        explanation: '1. Kerek zárójel: 18 - 13 = 5. 2. Szögletes zárójel: 15 + 5 = 20. 3. Szorzás: 2 · 20 = 40. 4. Kivonás: 80 - 40 = 40.',
        breakdown: [
          { label: '1. kerek zárójel ( )', value: '18 - 13 = 5' },
          { label: '2. szögletes zárójel [ ]', value: '15 + 5 = 20' },
          { label: '3. szorzás majd kivonás', value: '80 - 2 · 20 = 40' }
        ]
      },
      {
        id: 'q2-8',
        prompt: 'Számold ki az osztás-szorzás láncolatot balról jobbra haladva!',
        highlightValue: '72 : 8 · 3 : 9',
        questionTypeBadge: 'Láncolt műveletek',
        options: ['3', '1', '27', '9'],
        correctAnswer: '3',
        explanation: '72 : 8 = 9 ➔ 9 · 3 = 27 ➔ 27 : 9 = 3.',
        breakdown: [
          { label: '1. lépés', value: '72 : 8 = 9' },
          { label: '2. lépés', value: '9 · 3 = 27' },
          { label: '3. lépés', value: '27 : 9 = 3' }
        ]
      },
      {
        id: 'q2-9',
        prompt: 'Hová kell tenni a zárójelet, hogy az egyenlőség igaz legyen?',
        highlightValue: '5 + 3 · 4 = 32',
        questionTypeBadge: 'Zárójel pótlása',
        options: [
          '(5 + 3) · 4 = 32',
          '5 + (3 · 4) = 32',
          '(5 + 3 · 4) = 32',
          'Nem kell zárójel'
        ],
        correctAnswer: '(5 + 3) · 4 = 32',
        explanation: 'Zárójel nélkül 5 + 12 = 17 lenne. Ha (5 + 3)-at zárójelbe tesszük: 8 · 4 = 32.',
        breakdown: [
          { label: 'Zárójellel', value: '(5 + 3) · 4 = 8 · 4 = 32' },
          { label: 'Zárójel nélkül', value: '5 + 12 = 17' }
        ]
      },
      {
        id: 'q2-10',
        prompt: 'Mennyivel tér el egymástól a két kifejezés értéke?',
        highlightValue: 'A = 60 - (30 - 10)  és  B = 60 - 30 - 10',
        questionTypeBadge: 'Zárójel hatása',
        options: [
          'A különbség 20 (A = 40, B = 20)',
          'Nincs különbség, mindkettő 20',
          'A különbség 10 (A = 30, B = 20)',
          'A különbség 40 (A = 60, B = 20)'
        ],
        correctAnswer: 'A különbség 20 (A = 40, B = 20)',
        explanation: 'A: 60 - 20 = 40. B: 30 - 10 = 20. A kettő különbsége: 40 - 20 = 20.',
        breakdown: [
          { label: 'A értéke', value: '60 - (20) = 40' },
          { label: 'B értéke', value: '60 - 30 - 10 = 20' },
          { label: 'Különbségük', value: '40 - 20 = 20' }
        ]
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Nehéz szint',
    subtitle: 'Összetett kapcsos zárójelek, okos kiemelés, disztributivitás és szöveges feladatok',
    range: 'Haladó szintű kifejezések',
    focus: 'Kiemelés, többszintű zárójelek { [ ( ) ] }, trükkös felbontások és szöveges modellezés',
    color: 'amber',
    badgeBg: 'bg-amber-50 dark:bg-amber-950/40',
    badgeBorder: 'border-amber-200 dark:border-amber-800',
    badgeText: 'text-amber-700 dark:text-amber-300',
    accentGradient: 'from-amber-600 to-orange-700',
    iconBg: 'bg-amber-700 text-white',
    questions: [
      {
        id: 'q3-1',
        prompt: 'Számold ki a többszintű kifejezés értékét!',
        highlightValue: '120 - 2 · [40 - (15 - 3 · 2)]',
        questionTypeBadge: 'Összetett zárójel',
        options: ['58', '62', '48', '70'],
        correctAnswer: '58',
        explanation: '1. Kerek zárójelben: 15 - 6 = 9. 2. Szögletes zárójelben: 40 - 9 = 31. 3. Szorzás: 2 · 31 = 62. 4. Kivonás: 120 - 62 = 58.',
        breakdown: [
          { label: '1. kerek zárójel', value: '15 - 3 · 2 = 15 - 6 = 9' },
          { label: '2. szögletes zárójel', value: '40 - 9 = 31' },
          { label: '3. szorzás és kivonás', value: '120 - 2 · 31 = 120 - 62 = 58' }
        ]
      },
      {
        id: 'q3-2',
        prompt: 'Számold ki a kifejezést fejben a közös tényező okos kiemelésével!',
        highlightValue: '38 · 74 + 38 · 26',
        questionTypeBadge: 'Közös tényező kiemelése',
        options: ['3 800', '3 600', '4 000', '2 812'],
        correctAnswer: '3 800',
        explanation: 'Kiemeljük a 38-at: 38 · (74 + 26) = 38 · 100 = 3 800.',
        breakdown: [
          { label: 'Kiemelés', value: '38 · (74 + 26)' },
          { label: 'Zárójel értéke', value: '74 + 26 = 100' },
          { label: 'Szorzat', value: '38 · 100 = 3 800' }
        ]
      },
      {
        id: 'q3-3',
        prompt: 'Számold ki kiemeléssel a kifejezés értékét!',
        highlightValue: '54 · 135 - 54 · 35',
        questionTypeBadge: 'Kiemelés kivonással',
        options: ['5 400', '5 200', '5 000', '6 000'],
        correctAnswer: '5 400',
        explanation: '54 · (135 - 35) = 54 · 100 = 5 400.',
        breakdown: [
          { label: 'Kiemelés', value: '54 · (135 - 35)' },
          { label: 'Zárójel', value: '135 - 35 = 100' },
          { label: 'Eredmény', value: '54 · 100 = 5 400' }
        ]
      },
      {
        id: 'q3-4',
        prompt: 'Mennyi a törtes/osztásos kifejezés értéke?',
        highlightValue: '[150 - (4 · 25 - 10)] : (2 + 2 · 4)',
        questionTypeBadge: 'Összetett osztás',
        options: ['6', '10', '12', '5'],
        correctAnswer: '6',
        explanation: 'Osztandó: [150 - (100 - 10)] = 150 - 90 = 60. Osztó: 2 + 8 = 10. Hányados: 60 : 10 = 6.',
        breakdown: [
          { label: 'Osztandó', value: '[150 - 90] = 60' },
          { label: 'Osztó', value: '2 + 8 = 10' },
          { label: 'Hányados', value: '60 : 10 = 6' }
        ]
      },
      {
        id: 'q3-5',
        prompt: 'Hogyan érdemes kiszámolni ezt a szorzatot fejben a tényezők átrendezésével?',
        highlightValue: '25 · 37 · 4',
        questionTypeBadge: 'Tényezők átrendezése',
        options: [
          '(25 · 4) · 37 = 100 · 37 = 3 700',
          '(25 · 37) · 4 = 925 · 4 = 3 700',
          '25 · (37 · 4) = 25 · 148 = 3 700',
          'Csak írásban lehet kiszámolni'
        ],
        correctAnswer: '(25 · 4) · 37 = 100 · 37 = 3 700',
        explanation: 'A kommutativitás és asszociativitás miatt először 25 · 4 = 100-at képezünk, ami rendkívül gyorssá teszi a számolást.',
        breakdown: [
          { label: '1. lépés', value: '25 · 4 = 100' },
          { label: '2. lépés', value: '100 · 37 = 3 700' }
        ]
      },
      {
        id: 'q3-6',
        prompt: 'Melyik kifejezés egyenértékű a következők közül a 100 - (30 + 20) alakkal?',
        highlightValue: '100 - (30 + 20)',
        questionTypeBadge: 'Zárójel elhagyása',
        options: [
          '100 - 30 - 20',
          '100 - 30 + 20',
          '100 + 30 - 20',
          '100 + 30 + 20'
        ],
        correctAnswer: '100 - 30 - 20',
        explanation: 'Ha kivonunk egy összeget, az olyan, mintha a tagokat egyenként vonnánk ki: a - (b + c) = a - b - c.',
        breakdown: [
          { label: 'Bal oldal', value: '100 - 50 = 50' },
          { label: 'Jobb oldal', value: '100 - 30 - 20 = 50' }
        ]
      },
      {
        id: 'q3-7',
        prompt: 'Mennyi a kifejezés pontos értéke?',
        highlightValue: '200 - [18 + 2 · (25 - 3 · 5)]',
        questionTypeBadge: 'Többszörös műveletsor',
        options: ['162', '170', '154', '180'],
        correctAnswer: '162',
        explanation: '1. Kerek zárójel: 25 - 15 = 10. 2. Szorzás: 2 · 10 = 20. 3. Szögletes zárójel: 18 + 20 = 38. 4. Kivonás: 200 - 38 = 162.',
        breakdown: [
          { label: '1. kerek zárójel', value: '25 - 15 = 10' },
          { label: '2. szögletes zárójel', value: '18 + 2 · 10 = 38' },
          { label: '3. végeredmény', value: '200 - 38 = 162' }
        ]
      },
      {
        id: 'q3-8',
        prompt: 'Egy boltban 4 db 250 Ft-os füzetet és 3 db 120 Ft-os tollat veszünk. 2000 Ft-tal fizetünk. Melyik kifejezés adja meg a visszajáró pénzt?',
        highlightValue: 'Szöveges feladat modellje',
        questionTypeBadge: 'Szöveges kifejezés',
        options: [
          '2 000 - (4 · 250 + 3 · 120) = 640 Ft',
          '2 000 - 4 · 250 + 3 · 120 = 1 360 Ft',
          '(2 000 - 4 · 250) · 3 · 120',
          '2 000 : (4 · 250 + 3 · 120)'
        ],
        correctAnswer: '2 000 - (4 · 250 + 3 · 120) = 640 Ft',
        explanation: 'Összes költés: 4 · 250 + 3 · 120 = 1000 + 360 = 1360 Ft. Visszajáró: 2000 - 1360 = 640 Ft.',
        breakdown: [
          { label: 'Füzetek ára', value: '4 · 250 = 1 000 Ft' },
          { label: 'Tollak ára', value: '3 · 120 = 360 Ft' },
          { label: 'Visszajáró', value: '2 000 - 1 360 = 640 Ft' }
        ]
      },
      {
        id: 'q3-9',
        prompt: 'Hogyan számolhatjuk ki fejben a 99 · 46 szorzatot a disztributivitás segítségével?',
        highlightValue: '99 · 46 = ?',
        questionTypeBadge: 'Okos szorzás (100 - 1)',
        options: [
          '(100 - 1) · 46 = 4 600 - 46 = 4 554',
          '(90 + 9) · 46 = 4 140 + 414 = 4 554',
          '100 · 46 - 1 = 4 599',
          '99 · 50 - 4 = 4 946'
        ],
        correctAnswer: '(100 - 1) · 46 = 4 600 - 46 = 4 554',
        explanation: 'A 99-et felírjuk (100 - 1)-ként, így: 100 · 46 - 1 · 46 = 4600 - 46 = 4554.',
        breakdown: [
          { label: '1. lépés', value: '100 · 46 = 4 600' },
          { label: '2. lépés', value: '1 · 46 = 46' },
          { label: 'Különbség', value: '4 600 - 46 = 4 554' }
        ]
      },
      {
        id: 'q3-10',
        prompt: 'Mennyi a kifejezés pontos értéke?',
        highlightValue: '{50 + 2 · [30 - (10 + 4 · 3)]} : 4',
        questionTypeBadge: 'Kapcsos zárójel { }',
        options: ['16', '20', '12', '24'],
        correctAnswer: '16',
        explanation: '1. Kerek zárójel: 10 + 12 = 22. 2. Szögletes zárójel: 30 - 22 = 8. 3. Kapcsos zárójel: 50 + 2 · 8 = 50 + 16 = 64. 4. Osztás: 64 : 4 = 16.',
        breakdown: [
          { label: '1. kerek zárójel ( )', value: '10 + 12 = 22' },
          { label: '2. szögletes zárójel [ ]', value: '30 - 22 = 8' },
          { label: '3. kapcsos zárójel { }', value: '50 + 16 = 64' },
          { label: '4. osztás', value: '64 : 4 = 16' }
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

interface OrderOfOperationsQuizProps {
  onBack: () => void;
}

export function OrderOfOperationsQuiz({ onBack }: OrderOfOperationsQuizProps) {
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
                  <Minimize2 className="w-3.5 h-3.5 mr-1 text-amber-600 dark:text-amber-400" />
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
              className="h-8 rounded-xl px-2.5 border-amber-300 bg-amber-50/50 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800 hover:bg-amber-100 text-xs font-bold"
            >
              <BookOpen className="w-3.5 h-3.5 mr-1 text-amber-600" />
              Szabályzat
            </Button>
          </div>
        </div>

        {/* Hero Header */}
        <div className="text-center max-w-2xl mx-auto mb-4 sm:mb-5">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight flex items-center justify-center gap-2 mb-1">
            <span className="text-2xl">🔢</span>
            <span>Műveletek tulajdonságai és műveleti sorrend Kvíz</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Gyakorold a műveleti hierarchiát, a zárójelek felbontását, a kommutativitást és az okos kiemelést!
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
              <FileQuestion className="w-3.5 h-3.5 text-amber-500" />
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
              <ArrowRightLeft className="w-3.5 h-3.5 text-indigo-500" />
              Csoportosító (Húzd a helyére)
            </button>
          </div>
        </div>

        {/* Cheat sheet popover/card */}
        {showCheatSheet && (
          <div className="mb-4 p-4 sm:p-5 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-slate-900 dark:to-slate-850 rounded-2xl border-2 border-amber-200 dark:border-amber-900/60 shadow-md animate-in fade-in duration-200">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm sm:text-base font-black text-amber-900 dark:text-amber-200 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-600" />
                Műveleti sorrend szabályai és összefoglaló
              </h3>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setShowCheatSheet(false)}
                className="text-amber-800 dark:text-amber-300 hover:bg-amber-200/50 rounded-lg h-7 px-2 text-xs"
              >
                Bezárás
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
              {OPERATIONS_CHEAT_SHEET.map((item, idx) => (
                <div key={idx} className="bg-white/95 dark:bg-slate-800/95 p-2.5 rounded-xl border border-amber-100 dark:border-slate-700 shadow-xs text-left">
                  <div className="text-xs font-black text-amber-600 dark:text-amber-400">{item.topic}</div>
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
                className="group relative bg-white dark:bg-slate-900 rounded-2xl p-5 border-2 border-slate-200/80 dark:border-slate-800 hover:border-amber-500 dark:hover:border-amber-500 shadow-sm hover:shadow-lg transition-all duration-200 cursor-pointer flex flex-col justify-between overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-amber-500/10 to-transparent rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform" />

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform shadow-inner text-white font-black text-lg", cfg.iconBg)}>
                      {level}
                    </div>

                    <span className={cn("px-2.5 py-1 rounded-full text-[11px] font-black uppercase tracking-wider border", cfg.badgeBg, cfg.badgeBorder, cfg.badgeText)}>
                      {gameMode === 'quiz' ? '10 Kérdés' : gameMode === 'matcher' ? '8 Pár' : '10 Elem (3 csoport)'}
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-slate-900 dark:text-white mb-0.5 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
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
                      <span className="font-bold text-amber-600 dark:text-amber-400 text-right truncate max-w-[140px]" title={cfg.focus}>{cfg.focus}</span>
                    </div>
                  </div>
                </div>

                <Button
                  className={cn(
                    "w-full h-10 rounded-xl font-bold text-sm shadow-xs transition-all flex items-center justify-center gap-1.5",
                    level === 1
                      ? "bg-amber-600 hover:bg-amber-700 text-white"
                      : level === 2
                      ? "bg-orange-600 hover:bg-orange-700 text-white"
                      : "bg-amber-700 hover:bg-amber-800 text-white"
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
          <div className="w-20 h-20 mx-auto mb-4 rounded-3xl bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center text-white shadow-lg shadow-amber-500/30">
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
              <div className="text-2xl font-black text-amber-600 dark:text-amber-400">{score} / {totalQuestions}</div>
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
                className="flex-1 h-11 rounded-xl text-sm font-bold bg-amber-600 hover:bg-amber-700 text-white shadow-md flex items-center justify-center gap-1.5"
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
                <Minimize2 className="w-3.5 h-3.5 mr-1 text-amber-600 dark:text-amber-400" />
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
              <div className="flex items-center gap-1 font-black text-amber-600 dark:text-amber-400">
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
            <div className="flex items-center gap-1.5 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 px-3 py-1 rounded-xl border border-indigo-200 dark:border-indigo-800 text-xs font-bold">
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
                  color={selectedLevel === 1 ? 'amber' : selectedLevel === 2 ? 'orange' : 'indigo'}
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
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                        {levelConfig.title}
                      </span>
                    </div>

                    <CardContent className="p-4 sm:p-5 text-center">
                      <p className="text-xs sm:text-sm font-bold text-slate-600 dark:text-slate-300 mb-2.5">
                        {currentQuestion.prompt}
                      </p>

                      <div className="inline-block px-6 py-2.5 bg-gradient-to-br from-amber-50 to-orange-50/60 dark:from-slate-850 dark:to-slate-800 rounded-2xl border-2 border-amber-200/80 dark:border-slate-700 shadow-inner">
                        <span className="text-2xl sm:text-3xl font-mono font-black tracking-wider text-slate-900 dark:text-amber-300">
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
                                    <span className="text-slate-500 mr-1">{item.label}:</span>
                                    <span className="text-amber-700 dark:text-amber-300">{item.value}</span>
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <Button
                        onClick={handleNextQuestion}
                        className="w-full h-11 rounded-xl text-sm font-bold bg-amber-600 hover:bg-amber-700 text-white shadow-sm flex items-center justify-center gap-1.5"
                      >
                        {currentIndex < questions.length - 1 ? 'Következő Kérdés' : 'Eredmények Megtekintése'}
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </div>

                {/* Right: Options List */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between px-1 mb-1">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      Válassz egy választ:
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">
                      Billentyűk: [1] - [4]
                    </span>
                  </div>

                  {currentQuestion.options.map((option, idx) => {
                    const isSelected = selectedOption === option;
                    const isCorrect = option === currentQuestion.correctAnswer;

                    let btnStyle = "bg-white dark:bg-slate-900 border-slate-200/90 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:border-amber-400 dark:hover:border-amber-500 hover:bg-amber-50/30 dark:hover:bg-amber-950/20";

                    if (isAnswerChecked) {
                      if (isCorrect) {
                        btnStyle = "bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-900 dark:text-emerald-100 font-bold shadow-xs";
                      } else if (isSelected) {
                        btnStyle = "bg-rose-50 dark:bg-rose-950/60 border-rose-500 text-rose-900 dark:text-rose-100";
                      } else {
                        btnStyle = "bg-white/50 dark:bg-slate-900/50 border-slate-100 dark:border-slate-800 text-slate-400 opacity-60";
                      }
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => handleOptionSelect(option)}
                        disabled={isAnswerChecked}
                        className={cn(
                          "w-full p-3 sm:p-3.5 rounded-2xl border-2 text-left text-xs sm:text-sm font-medium transition-all duration-150 flex items-center justify-between group",
                          btnStyle
                        )}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className={cn(
                            "w-6 h-6 rounded-lg text-xs font-black flex items-center justify-center border",
                            isAnswerChecked && isCorrect
                              ? "bg-emerald-500 border-emerald-600 text-white"
                              : isAnswerChecked && isSelected
                              ? "bg-rose-500 border-rose-600 text-white"
                              : "bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 group-hover:bg-amber-100 dark:group-hover:bg-amber-950/60 group-hover:text-amber-800 dark:group-hover:text-amber-300"
                          )}>
                            {idx + 1}
                          </span>
                          <span className="font-medium">{option}</span>
                        </div>

                        {isAnswerChecked && isCorrect && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        )}
                        {isAnswerChecked && isSelected && !isCorrect && (
                          <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : gameMode === 'matcher' ? (
            /* MATCHER MODE WORKSPACE */
            <OrderOfOperationsMatcher
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
            <OrderOfOperationsSorter
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
              <Layers className="w-3.5 h-3.5 text-amber-500" />
              <span>Sablon / Játékmód</span>
            </div>

            <div className="flex flex-col gap-1.5">
              {/* Quiz Mode Button */}
              <button
                onClick={() => setGameMode('quiz')}
                className={cn(
                  "w-full p-2.5 rounded-xl text-left font-bold text-xs transition-all flex items-center gap-2.5 border-2",
                  gameMode === 'quiz'
                    ? "bg-amber-50 dark:bg-amber-950/50 border-amber-400 text-amber-900 dark:text-amber-200 shadow-xs"
                    : "bg-slate-50/80 dark:bg-slate-800/60 border-transparent hover:border-slate-200 text-slate-600 dark:text-slate-400"
                )}
              >
                <div className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                  gameMode === 'quiz' ? "bg-amber-500 text-white" : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
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
                    ? "bg-indigo-50 dark:bg-indigo-950/50 border-indigo-400 text-indigo-900 dark:text-indigo-200 shadow-xs"
                    : "bg-slate-50/80 dark:bg-slate-800/60 border-transparent hover:border-slate-200 text-slate-600 dark:text-slate-400"
                )}
              >
                <div className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                  gameMode === 'sorter' ? "bg-indigo-500 text-white" : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
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
                      ? "bg-slate-900 text-white dark:bg-amber-600 dark:text-white"
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
                  <Minimize2 className="w-3.5 h-3.5 mr-2 text-amber-600" />
                  Kilépés a teljes képernyőből
                </>
              ) : (
                <>
                  <Maximize2 className="w-3.5 h-3.5 mr-2 text-amber-600" />
                  Teljes képernyős mód
                </>
              )}
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowCheatSheet(!showCheatSheet)}
              className="w-full h-9 rounded-xl border-amber-300 bg-amber-50/50 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800 hover:bg-amber-100 text-xs font-bold justify-start"
            >
              <BookOpen className="w-3.5 h-3.5 mr-2 text-amber-600" />
              Műveleti segédlet
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
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border-2 border-amber-300 dark:border-amber-900 shadow-2xl max-w-2xl w-full text-left">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-600" />
                Műveleti sorrend és tulajdonságok
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
              {OPERATIONS_CHEAT_SHEET.map((item, idx) => (
                <div key={idx} className="bg-slate-50 dark:bg-slate-850 p-3 rounded-xl border border-slate-200/80 dark:border-slate-700">
                  <div className="text-xs font-black text-amber-600 dark:text-amber-400">{item.topic}</div>
                  <div className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200 mt-0.5">{item.formula}</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">{item.note}</div>
                </div>
              ))}
            </div>

            <div className="text-xs text-slate-600 dark:text-slate-400 bg-amber-50/80 dark:bg-amber-950/40 p-3 rounded-xl border border-amber-200 dark:border-amber-900/60 leading-relaxed mb-4 space-y-1">
              <p><strong>Sorrend:</strong> Mindig legbelső zárójel ➔ szorzás és osztás (balról jobbra) ➔ összeadás és kivonás (balról jobbra).</p>
              <p><strong>Kiemelés:</strong> <em>a · c + b · c = (a + b) · c</em>.</p>
              <p><strong>Disztributivitás:</strong> <em>c · (a + b) = c · a + c · b</em>.</p>
            </div>

            <Button
              onClick={() => setShowCheatSheet(false)}
              className="w-full h-10 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs"
            >
              Értem, visszatérek a gyakorláshoz
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
