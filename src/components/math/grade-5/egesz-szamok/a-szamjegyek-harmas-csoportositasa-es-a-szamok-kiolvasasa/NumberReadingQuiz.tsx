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
  ChevronRight,
  Layers,
  LayoutGrid,
  FileQuestion,
  Flame,
  Volume2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { NumberReadingMatcher } from './NumberReadingMatcher';

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
    subtitle: '4–5 jegyű számok (1 000 – 99 999)',
    range: '1 000 – 99 999',
    focus: 'Hármas tagolás, egyesek és ezresek osztálya',
    color: 'indigo',
    badgeBg: 'bg-indigo-50 dark:bg-indigo-950/40',
    badgeBorder: 'border-indigo-200 dark:border-indigo-800',
    badgeText: 'text-indigo-700 dark:text-indigo-300',
    accentGradient: 'from-indigo-500 to-violet-600',
    iconBg: 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-400',
    questions: [
      {
        id: 'l1-q1',
        prompt: 'Melyik a helyesen hármas tagolással leírt alakja a 45200 számnak?',
        highlightValue: '45200',
        questionTypeBadge: 'Hármas csoportosítás',
        options: ['45 200', '4 52 00', '452 00', '4 5200'],
        correctAnswer: '45 200',
        explanation: 'A számjegyeket jobbról (hátulról) balra haladva hármas csoportokba (osztályokba) osztjuk, és szóközzel tagoljuk: 45 200.',
        breakdown: [
          { label: 'Ezresek osztálya', value: '45' },
          { label: 'Egyesek osztálya', value: '200' }
        ]
      },
      {
        id: 'l1-q2',
        prompt: 'Hogyan olvassuk ki helyesen a következő számot?',
        highlightValue: '12 350',
        questionTypeBadge: 'Szám kiolvasása',
        options: [
          'tizenkétezer-háromszázötven',
          'egyszázhuszonhárom ezer ötven',
          'tizenkétezer-harmincöt',
          'tizenkét-háromszázötven'
        ],
        correctAnswer: 'tizenkétezer-háromszázötven',
        explanation: '12 ezer + 350 -> tizenkétezer-háromszázötven.',
        breakdown: [
          { label: '12 (ezresek)', value: 'tizenkétezer' },
          { label: '350 (egyesek)', value: 'háromszázötven' }
        ]
      },
      {
        id: 'l1-q3',
        prompt: 'Melyik szám felel meg a kiolvasott szövegnek?',
        highlightValue: '„hetvenezer-nyolc”',
        questionTypeBadge: 'Szöveg ➔ Szám',
        options: ['70 008', '70 080', '7 008', '700 008'],
        correctAnswer: '70 008',
        explanation: 'Hetvenezer (70 000) meg nyolc (8) = 70 008. A százasok és tízesek helyén 0 áll.',
        breakdown: [{ label: '70 000 + 8', value: '70 008' }]
      },
      {
        id: 'l1-q4',
        prompt: 'Hány osztályba sorolható egy 5-jegyű szám (pl. 24 500)?',
        highlightValue: '24 500',
        questionTypeBadge: 'Osztályok száma',
        options: ['2 osztályba (egyesek és ezresek)', '1 osztályba', '3 osztályba', '5 osztályba'],
        correctAnswer: '2 osztályba (egyesek és ezresek)',
        explanation: 'Az 5-jegyű szám 2 csoportra oszlik: az utolsó 3 jegy az egyesek osztálya (500), az első 2 jegy az ezresek osztálya (24).',
        breakdown: [
          { label: 'Ezresek osztálya', value: '24' },
          { label: 'Egyesek osztálya', value: '500' }
        ]
      },
      {
        id: 'l1-q5',
        prompt: 'Hogyan olvassuk ki a következő számot?',
        highlightValue: '8 090',
        questionTypeBadge: 'Szám kiolvasása',
        options: [
          'nyolcezer-kilencven',
          'nyolcezer-kilencszáz',
          'nyolcvanezer-kilencven',
          'nyolcezer-kilenc'
        ],
        correctAnswer: 'nyolcezer-kilencven',
        explanation: '8 090 = 8 ezer + 90 = nyolcezer-kilencven (a százasok helyén 0 áll).',
        breakdown: [{ label: '8 000 + 90', value: 'nyolcezer-kilencven' }]
      },
      {
        id: 'l1-q6',
        prompt: 'Honnan kezdjük a számjegyek hármas csoportosítását?',
        highlightValue: 'Szabály',
        questionTypeBadge: 'Szabályismeret',
        options: [
          'Jobbról (hátulról) balra haladva',
          'Balról jobbra haladva',
          'Középről kifelé',
          'Tetszőleges irányból'
        ],
        correctAnswer: 'Jobbról (hátulról) balra haladva',
        explanation: 'A hármas csoportosítást mindig a legkisebb helyiértéktől (jobbról, az egyesektől) kezdjük balra haladva.',
        breakdown: [{ label: 'Irány', value: 'Jobbról balra (←)' }]
      },
      {
        id: 'l1-q7',
        prompt: 'Melyik szám felel meg a kiolvasásnak?',
        highlightValue: '„harmincötezer-négyszázhat”',
        questionTypeBadge: 'Szöveg ➔ Szám',
        options: ['35 406', '35 460', '350 406', '3 546'],
        correctAnswer: '35 406',
        explanation: '35 ezer = 35 000, négyszázhat = 406. Összesen: 35 406.',
        breakdown: [{ label: '35 000 + 406', value: '35 406' }]
      },
      {
        id: 'l1-q8',
        prompt: 'Melyik a helyes tagolása a 10050 számnak?',
        highlightValue: '10050',
        questionTypeBadge: 'Tagolás',
        options: ['10 050', '1 0050', '100 50', '1005 0'],
        correctAnswer: '10 050',
        explanation: 'Jobbról hármat leválasztva: 050, elöl marad: 10 -> 10 050.',
        breakdown: [{ label: 'Helyes alak', value: '10 050' }]
      },
      {
        id: 'l1-q9',
        prompt: 'Hogyan olvassuk ki a 99 999 számot?',
        highlightValue: '99 999',
        questionTypeBadge: 'Kiolvasás',
        options: [
          'kilencvenkilencezer-kilencszázkilencvenkilenc',
          'kilencszázkilencvenezer-kilencszázkilencven',
          'kilencvenezer-kilencszázkilencvenkilenc',
          'kilencvenkilencezer-kilencvenkilenc'
        ],
        correctAnswer: 'kilencvenkilencezer-kilencszázkilencvenkilenc',
        explanation: '99 ezer + 999 = kilencvenkilencezer-kilencszázkilencvenkilenc.',
        breakdown: [{ label: '99 ezer + 999', value: '99 999' }]
      },
      {
        id: 'l1-q10',
        prompt: 'Melyik szám az „ezer-egy”?',
        highlightValue: 'ezer-egy',
        questionTypeBadge: 'Szöveg ➔ Szám',
        options: ['1 001', '1 010', '1 100', '10 001'],
        correctAnswer: '1 001',
        explanation: '1000 + 1 = 1 001 (a százasok és tízesek helyén 0 van).',
        breakdown: [{ label: '1 000 + 1', value: '1 001' }]
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Közepes szint',
    subtitle: '6 jegyű számok (100 000 – 999 999)',
    range: '100 000 – 999 999',
    focus: 'Százezres nagyságrend, nullák a kiolvasásban',
    color: 'amber',
    badgeBg: 'bg-amber-50 dark:bg-amber-950/40',
    badgeBorder: 'border-amber-200 dark:border-amber-800',
    badgeText: 'text-amber-700 dark:text-amber-300',
    accentGradient: 'from-amber-500 to-orange-600',
    iconBg: 'bg-amber-100 text-amber-600 dark:bg-amber-900/50 dark:text-amber-400',
    questions: [
      {
        id: 'l2-q1',
        prompt: 'Hogyan tagoljuk helyesen a 704005 számot?',
        highlightValue: '704005',
        questionTypeBadge: '6-jegyű tagolás',
        options: ['704 005', '70 4005', '7040 05', '7 04 005'],
        correctAnswer: '704 005',
        explanation: 'Hátulról 3 jegy: 005, elöl 3 jegy: 704 -> 704 005.',
        breakdown: [
          { label: 'Ezresek osztálya', value: '704' },
          { label: 'Egyesek osztálya', value: '005' }
        ]
      },
      {
        id: 'l2-q2',
        prompt: 'Hogyan olvassuk ki a következő számot?',
        highlightValue: '350 400',
        questionTypeBadge: '6-jegyű kiolvasás',
        options: [
          'háromszázötvenezer-négyszáz',
          'harmincötezer-négyszáz',
          'háromszázötvenezer-negyven',
          'háromszázötven-négyszáz'
        ],
        correctAnswer: 'háromszázötvenezer-négyszáz',
        explanation: '350 ezer + 400 = háromszázötvenezer-négyszáz.',
        breakdown: [
          { label: '350 (ezresek)', value: 'háromszázötvenezer' },
          { label: '400 (egyesek)', value: 'négyszáz' }
        ]
      },
      {
        id: 'l2-q3',
        prompt: 'Melyik szám felel meg a leírásnak?',
        highlightValue: '„ötszázezer-ötven”',
        questionTypeBadge: 'Szöveg ➔ Szám',
        options: ['500 050', '500 500', '50 050', '505 000'],
        correctAnswer: '500 050',
        explanation: 'Ötszázezer (500 000) meg ötven (50) = 500 050.',
        breakdown: [{ label: '500 000 + 50', value: '500 050' }]
      },
      {
        id: 'l2-q4',
        prompt: 'Hány jegyű az „egyszázezer” szám?',
        highlightValue: '100 000',
        questionTypeBadge: 'Jegyek száma',
        options: ['6 jegyű', '5 jegyű', '7 jegyű', '4 jegyű'],
        correctAnswer: '6 jegyű',
        explanation: 'Az egyszázezer számmal leírva: 100 000, amely 1 darab egyesből és 5 darab nullából áll (összesen 6 jegyű).',
        breakdown: [{ label: 'Számjegyek száma', value: '6 jegy (100 000)' }]
      },
      {
        id: 'l2-q5',
        prompt: 'Hogyan olvassuk ki a 208 500 számot?',
        highlightValue: '208 500',
        questionTypeBadge: 'Kiolvasás',
        options: [
          'ktszáznyolcezer-ötszáz',
          'húszezer-nyolcszázötven',
          'ktszáznyolcvan-ötszáz',
          'ktszáznyolcezer-ötven'
        ],
        correctAnswer: 'ktszáznyolcezer-ötszáz',
        explanation: '208 ezer + 500 = ktszáznyolcezer-ötszáz.',
        breakdown: [{ label: '208 000 + 500', value: '208 500' }]
      },
      {
        id: 'l2-q6',
        prompt: 'Melyik szám a „négyszázezer-négy”?',
        highlightValue: 'négyszázezer-négy',
        questionTypeBadge: 'Szöveg ➔ Szám',
        options: ['400 004', '400 400', '404 000', '40 004'],
        correctAnswer: '400 004',
        explanation: '400 000 + 4 = 400 004.',
        breakdown: [{ label: '400 000 + 4', value: '400 004' }]
      },
      {
        id: 'l2-q7',
        prompt: 'Hány darab 3-as számcsoportba (osztályba) osztható egy 6-jegyű szám?',
        highlightValue: '6 számjegy',
        questionTypeBadge: 'Osztályok',
        options: ['Pontosan 2 osztályba (3 + 3 jegy)', '3 osztályba', '1 osztályba', '6 osztályba'],
        correctAnswer: 'Pontosan 2 osztályba (3 + 3 jegy)',
        explanation: '6 : 3 = 2, tehát egy 6-jegyű számban pontosan 2 teljes osztály van (egyesek osztálya és ezresek osztálya).',
        breakdown: [{ label: '6 jegy', value: '2 teljes osztály' }]
      },
      {
        id: 'l2-q8',
        prompt: 'Hogyan tagoljuk a 801010 számot?',
        highlightValue: '801010',
        questionTypeBadge: 'Tagolás',
        options: ['801 010', '80 1010', '8010 10', '8 010 10'],
        correctAnswer: '801 010',
        explanation: 'Hátulról: 010, elöl: 801 -> 801 010 (nyolcszázegyezer-tíz).',
        breakdown: [{ label: 'Tagolt szám', value: '801 010' }]
      },
      {
        id: 'l2-q9',
        prompt: 'Melyik szám a „kilencszázkilencvenezer”?',
        highlightValue: 'kilencszázkilencvenezer',
        questionTypeBadge: 'Szöveg ➔ Szám',
        options: ['990 000', '909 000', '999 000', '900 090'],
        correctAnswer: '990 000',
        explanation: '990 ezer = 990 000.',
        breakdown: [{ label: 'Szám', value: '990 000' }]
      },
      {
        id: 'l2-q10',
        prompt: 'Hogyan olvassuk ki a 625 300 számot?',
        highlightValue: '625 300',
        questionTypeBadge: 'Kiolvasás',
        options: [
          'hatszázhuszonötezer-háromszáz',
          'hatszázhúszezer-háromszázöt',
          'hatvankétezer-ötszázhárom',
          'hatszázhuszonöt-háromszáz'
        ],
        correctAnswer: 'hatszázhuszonötezer-háromszáz',
        explanation: '625 ezer + 300 = hatszázhuszonötezer-háromszáz.',
        breakdown: [{ label: '625 ezer + 300', value: '625 300' }]
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Nehéz szint',
    subtitle: 'Milliós nagyságrend (1 000 000 – 100 000 000)',
    range: '1 000 000+',
    focus: 'Milliók osztálya, 7–9 jegyű számok tagolása és kiolvasása',
    color: 'purple',
    badgeBg: 'bg-purple-50 dark:bg-purple-950/40',
    badgeBorder: 'border-purple-200 dark:border-purple-800',
    badgeText: 'text-purple-700 dark:text-purple-300',
    accentGradient: 'from-purple-600 to-indigo-600',
    iconBg: 'bg-purple-100 text-purple-600 dark:bg-purple-900/50 dark:text-purple-400',
    questions: [
      {
        id: 'l3-q1',
        prompt: 'Melyik a helyesen tagolt alakja az 1000000 (egymillió) számnak?',
        highlightValue: '1000000',
        questionTypeBadge: 'Milliós tagolás',
        options: ['1 000 000', '1000 000', '10 000 00', '100 0000'],
        correctAnswer: '1 000 000',
        explanation: 'Hátulról: 000 (egyesek osztálya), 000 (ezresek osztálya), 1 (milliók osztálya) -> 1 000 000 (3 csoport).',
        breakdown: [
          { label: 'Milliók', value: '1' },
          { label: 'Ezresek', value: '000' },
          { label: 'Egyesek', value: '000' }
        ]
      },
      {
        id: 'l3-q2',
        prompt: 'Hogyan olvassuk ki a 25 400 000 számot?',
        highlightValue: '25 400 000',
        questionTypeBadge: 'Milliós kiolvasás',
        options: [
          'huszonötmillió-négyszázezer',
          'kétmillió-ötszáznegyvenezer',
          'ktszázötvenmillió-négyszáz',
          'huszonötezer-négyszáz'
        ],
        correctAnswer: 'huszonötmillió-négyszázezer',
        explanation: '25 millió + 400 ezer + 0 = huszonötmillió-négyszázezer.',
        breakdown: [
          { label: 'Milliók osztálya', value: '25 millió' },
          { label: 'Ezresek osztálya', value: '400 ezer' }
        ]
      },
      {
        id: 'l3-q3',
        prompt: 'Melyik szám felel meg a kiolvasásnak?',
        highlightValue: '„hétmillió-háromszázezer-ötven”',
        questionTypeBadge: 'Szöveg ➔ Szám',
        options: ['7 300 050', '7 030 050', '7 300 500', '73 000 050'],
        correctAnswer: '7 300 050',
        explanation: '7 millió (7 000 000) + 300 ezer (300 000) + 50 = 7 300 050.',
        breakdown: [{ label: '7M + 300E + 50', value: '7 300 050' }]
      },
      {
        id: 'l3-q4',
        prompt: 'Hány osztályba tagolódik egy 8-jegyű szám (pl. 45 600 700)?',
        highlightValue: '45 600 700',
        questionTypeBadge: 'Osztályok azonosítása',
        options: [
          '3 osztályba (egyesek, ezresek, milliók)',
          '2 osztályba',
          '4 osztályba',
          '8 osztályba'
        ],
        correctAnswer: '3 osztályba (egyesek, ezresek, milliók)',
        explanation: '700 (egyesek), 600 (ezresek), 45 (milliók) -> 3 osztály.',
        breakdown: [
          { label: '1. osztály', value: 'Egyesek (700)' },
          { label: '2. osztály', value: 'Ezresek (600)' },
          { label: '3. osztály', value: 'Milliók (45)' }
        ]
      },
      {
        id: 'l3-q5',
        prompt: 'Hogyan olvassuk ki a 4 000 008 számot?',
        highlightValue: '4 000 008',
        questionTypeBadge: 'Kiolvasás',
        options: [
          'négymillió-nyolc',
          'négyszázezer-nyolc',
          'négymillió-nyolcvan',
          'negyvenmillió-nyolc'
        ],
        correctAnswer: 'négymillió-nyolc',
        explanation: '4 millió (4 000 000) + 8 = 4 000 008.',
        breakdown: [{ label: '4 000 000 + 8', value: 'négymillió-nyolc' }]
      },
      {
        id: 'l3-q6',
        prompt: 'Melyik szám a „százmillió”?',
        highlightValue: 'százmillió',
        questionTypeBadge: 'Szöveg ➔ Szám',
        options: ['100 000 000', '10 000 000', '1 000 000 000', '100 000'],
        correctAnswer: '100 000 000',
        explanation: 'Százmillió = 100 · 1 000 000 = 100 000 000 (9 jegyű szám: 1-es és 8 darab 0).',
        breakdown: [{ label: 'Szám', value: '100 000 000' }]
      },
      {
        id: 'l3-q7',
        prompt: 'Hogyan tagoljuk helyesen az 50000005 számot?',
        highlightValue: '50000005',
        questionTypeBadge: 'Tagolás',
        options: ['50 000 005', '500 000 05', '5 000 0005', '5000 0005'],
        correctAnswer: '50 000 005',
        explanation: 'Hátulról: 005, 000, 50 -> 50 000 005 (ötvenmillió-öt).',
        breakdown: [{ label: 'Tagolt szám', value: '50 000 005' }]
      },
      {
        id: 'l3-q8',
        prompt: 'Melyik számban van a legtöbb számjegy?',
        highlightValue: 'Összehasonlítás',
        questionTypeBadge: 'Jegyek száma',
        options: [
          'tízmillió-egyszáz (10 000 100)',
          'kilencszázkilencvenezer (990 000)',
          'egymillió-ötszázezer (1 500 000)',
          'ötszázezer (500 000)'
        ],
        correctAnswer: 'tízmillió-egyszáz (10 000 100)',
        explanation: '10 000 100 -> 8 számjegyű. (Az 1 500 000 7 jegyű, a 990 000 és 500 000 6 jegyű).',
        breakdown: [{ label: 'Legtöbb jegy', value: '10 000 100 (8 jegy)' }]
      },
      {
        id: 'l3-q9',
        prompt: 'Hogyan olvassuk ki a 12 050 300 számot?',
        highlightValue: '12 050 300',
        questionTypeBadge: 'Kiolvasás',
        options: [
          'tizenkétmillió-ötvenezer-háromszáz',
          'tizenkétezer-ötszáz-háromszáz',
          'egyszázhúszmillió-ötvenezer',
          'tizenkétmillió-ötszáz-háromszáz'
        ],
        correctAnswer: 'tizenkétmillió-ötvenezer-háromszáz',
        explanation: '12 millió + 50 ezer + 300 = tizenkétmillió-ötvenezer-háromszáz.',
        breakdown: [{ label: '12M + 50E + 300', value: '12 050 300' }]
      },
      {
        id: 'l3-q10',
        prompt: 'Melyik a legnagyobb 7-jegyű szám?',
        highlightValue: 'Legnagyobb 7-jegyű szám',
        questionTypeBadge: 'Számképzés',
        options: ['9 999 999', '1 000 000', '99 999 999', '9 000 000'],
        correctAnswer: '9 999 999',
        explanation: 'A legnagyobb 7-jegyű szám a csupa 9-esből álló 9 999 999 (kilencmillió-kilencszázkilencvenkilencezer-kilencszázkilencvenkilenc).',
        breakdown: [{ label: 'Legnagyobb 7 jegyű', value: '9 999 999' }]
      }
    ]
  }
};

const NUMBER_READING_CHEAT_SHEET = [
  { group: 'Egyesek osztálya', digits: '1–3. jegy jobbról', example: 'pl. ... 452', note: 'egyesek, tízesek, százasok' },
  { group: 'Ezresek osztálya', digits: '4–6. jegy jobbról', example: 'pl. ... 350 ...', note: 'ezresek, tízezresek, százezresek' },
  { group: 'Milliók osztálya', digits: '7–9. jegy jobbról', example: 'pl. 12 ... ...', note: 'milliók, tízmilliók, százmilliók' }
];

interface NumberReadingQuizProps {
  onBack: () => void;
}

export function NumberReadingQuiz({ onBack }: NumberReadingQuizProps) {
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
            className="rounded-xl h-9 px-3 border-indigo-300 bg-indigo-50/60 text-indigo-800 dark:bg-indigo-950/40 dark:text-indigo-300 dark:border-indigo-800 hover:bg-indigo-100 text-xs sm:text-sm font-bold"
          >
            <BookOpen className="w-3.5 h-3.5 mr-1.5 text-indigo-600" />
            Számok tagolása és osztályai
          </Button>
        </div>

        <div className="text-center max-w-2xl mx-auto mb-4 sm:mb-5">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight flex items-center justify-center gap-2 mb-1">
            <span className="text-2xl">🗣️</span>
            <span>Hármas Csoportosítás & Számok Kiolvasása</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Gyakorold a nagy számok hármas tagolását és helyes kiolvasását kvízzel vagy kártyanyitogató játékkal!
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
              <FileQuestion className="w-3.5 h-3.5 text-indigo-500" />
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
              <LayoutGrid className="w-3.5 h-3.5 text-teal-500" />
              Kártyás Párosító
            </button>
          </div>
        </div>

        {showCheatSheet && (
          <div className="mb-4 p-4 sm:p-5 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-slate-900 dark:to-slate-850 rounded-2xl border-2 border-indigo-200 dark:border-indigo-900/60 shadow-md animate-in fade-in duration-200">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm sm:text-base font-black text-indigo-900 dark:text-indigo-200 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                Hármas tagolás és a számok osztályai
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
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-3">
              {NUMBER_READING_CHEAT_SHEET.map((item, idx) => (
                <div key={idx} className="bg-white/95 dark:bg-slate-800/95 p-3 rounded-xl border border-indigo-100 dark:border-slate-700 shadow-xs text-left">
                  <div className="text-sm font-black text-indigo-600 dark:text-indigo-400">{item.group}</div>
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-0.5">{item.digits}</div>
                  <div className="text-[11px] font-mono text-amber-600 dark:text-amber-400">{item.example}</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">{item.note}</div>
                </div>
              ))}
            </div>
            <div className="p-2.5 bg-white/80 dark:bg-slate-800/80 rounded-xl border border-indigo-100 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 space-y-1">
              <div><strong>Alapszabály:</strong> A számokat jobbról balra haladva 3-as csoportokba (osztályokba) osztjuk, és szóközzel tagoljuk (pl. $12\ 450\ 678$).</div>
              <div><strong>Kiolvasás:</strong> Az osztályok nevét (millió, ezer) mondjuk ki az osztályban lévő szám után (pl. tizenkétmillió-négyszázötvenezer-hatszázhetvennyolc).</div>
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
                className="group relative bg-white dark:bg-slate-900 rounded-2xl p-5 border-2 border-slate-200/80 dark:border-slate-800 hover:border-indigo-500 dark:hover:border-indigo-500 shadow-sm hover:shadow-lg transition-all duration-200 cursor-pointer flex flex-col justify-between overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-indigo-500/10 to-transparent rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform" />

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform shadow-inner", cfg.iconBg)}>
                      <span className="font-serif font-black text-lg">{level === 1 ? 'I' : level === 2 ? 'II' : 'III'}</span>
                    </div>

                    <span className={cn("px-2.5 py-1 rounded-full text-[11px] font-black uppercase tracking-wider border", cfg.badgeBg, cfg.badgeBorder, cfg.badgeText)}>
                      {gameMode === 'quiz' ? '10 Kérdés' : '10 Pár'}
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
                      <span className="font-mono text-[11px] font-bold text-indigo-600 dark:text-indigo-400">{cfg.focus}</span>
                    </div>
                  </div>
                </div>

                <Button
                  className={cn(
                    "w-full h-10 rounded-xl font-bold text-sm shadow-xs transition-all flex items-center justify-center gap-1.5",
                    level === 1
                      ? "bg-indigo-600 hover:bg-indigo-700 text-white"
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
          <div className="w-20 h-20 bg-gradient-to-tr from-indigo-500 to-violet-600 text-white rounded-3xl flex items-center justify-center mx-auto shadow-lg mb-4 ring-8 ring-indigo-100 dark:ring-indigo-950/60 animate-bounce">
            <Trophy className="w-10 h-10" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mb-1">
            {isPerfect ? 'Kiváló Kiolvasás! 🏆' : isGood ? 'Ügyes Vagy! 🌟' : 'Gyakorolj még egy kicsit! 💪'}
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
          ) : (
            <div className="flex items-center gap-1.5 bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 px-3 py-1 rounded-xl border border-teal-200 dark:border-teal-800 text-xs font-bold">
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
                  color={selectedLevel === 1 ? 'indigo' : selectedLevel === 2 ? 'amber' : 'purple'}
                />
              </div>

              {/* 2-Column Responsive Workspace Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 items-start">
                {/* Left: Question Card + Explanation */}
                <div className="flex flex-col gap-3">
                  <Card className="rounded-2xl border-2 border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
                    <CardContent className="p-4 sm:p-5 text-center">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 mb-2 border border-indigo-200 dark:border-indigo-800">
                        <Volume2 className="w-3 h-3 text-indigo-600" />
                        {currentQuestion.questionTypeBadge}
                      </div>

                      <p className="text-xs sm:text-sm font-bold text-slate-600 dark:text-slate-300 mb-2.5">
                        {currentQuestion.prompt}
                      </p>

                      <div className="inline-block px-6 py-2.5 bg-gradient-to-br from-indigo-50 to-purple-50/60 dark:from-slate-850 dark:to-slate-800 rounded-2xl border-2 border-indigo-200/80 dark:border-slate-700 shadow-inner">
                        <span className="text-xl sm:text-2xl font-mono font-black tracking-wider text-slate-900 dark:text-indigo-300">
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
                                <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400">Elemzés:</span>
                                {currentQuestion.breakdown.map((item, bIdx) => (
                                  <span
                                    key={bIdx}
                                    className="px-1.5 py-0.5 rounded-md bg-white/90 dark:bg-slate-800/90 text-[10px] font-bold font-mono text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
                                  >
                                    {item.label}: <span className="text-indigo-600 dark:text-indigo-400">{item.value}</span>
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <Button
                        onClick={handleNextQuestion}
                        className="w-full h-10 rounded-xl text-sm font-bold bg-slate-900 hover:bg-slate-800 text-white dark:bg-indigo-600 dark:hover:bg-indigo-700 shadow-sm transition-all flex items-center justify-center gap-1.5"
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

                      let buttonStyle = "bg-white dark:bg-slate-900 border-2 border-slate-200/90 dark:border-slate-800 text-slate-800 dark:text-slate-100 hover:border-indigo-500 hover:shadow-xs dark:hover:border-indigo-500";

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
                            "relative min-h-[50px] sm:min-h-[56px] rounded-xl font-sans font-black text-xs sm:text-sm transition-all duration-150 flex items-center justify-between px-4 text-left py-2",
                            buttonStyle
                          )}
                        >
                          <span className="flex items-center gap-2.5">
                            <span className="w-6 h-6 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-xs font-sans font-bold flex items-center justify-center shrink-0 border border-slate-200 dark:border-slate-700">
                              {idx + 1}
                            </span>
                            <span className="font-sans font-bold text-xs sm:text-sm leading-snug">{option}</span>
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
                    <div className="p-2.5 bg-indigo-50/60 dark:bg-slate-850/80 rounded-xl border border-indigo-200/50 dark:border-slate-800 text-[11px] text-indigo-900 dark:text-indigo-300 flex items-center gap-1.5 mt-0.5">
                      <Sparkles className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                      <span>Figyeld a hármas csoportokat jobbról balra (egyesek, ezresek, milliók)!</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <NumberReadingMatcher
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
              <Layers className="w-3.5 h-3.5 text-indigo-500" />
              <span>Sablon / Játékmód</span>
            </div>

            <div className="flex flex-col gap-1.5">
              <button
                onClick={() => setGameMode('quiz')}
                className={cn(
                  "w-full p-2.5 rounded-xl text-left font-bold text-xs transition-all flex items-center gap-2.5 border-2",
                  gameMode === 'quiz'
                    ? "bg-indigo-50 dark:bg-indigo-950/50 border-indigo-400 text-indigo-900 dark:text-indigo-200 shadow-xs"
                    : "bg-slate-50/80 dark:bg-slate-800/60 border-transparent hover:border-slate-200 text-slate-600 dark:text-slate-400"
                )}
              >
                <div className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                  gameMode === 'quiz' ? "bg-indigo-500 text-white" : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
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
                    ? "bg-teal-50 dark:bg-teal-950/50 border-teal-400 text-teal-900 dark:text-teal-200 shadow-xs"
                    : "bg-slate-50/80 dark:bg-slate-800/60 border-transparent hover:border-slate-200 text-slate-600 dark:text-slate-400"
                )}
              >
                <div className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                  gameMode === 'matcher' ? "bg-teal-500 text-white" : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
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
                      ? "bg-slate-900 text-white dark:bg-indigo-600 dark:text-white"
                      : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400"
                  )}
                >
                  <span>{lvl}. {lvl === 1 ? 'Könnyű (4–5 jegyű)' : lvl === 2 ? 'Közepes (6 jegyű)' : 'Nehéz (Milliós)'}</span>
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
              className="w-full h-9 rounded-xl border-indigo-300 bg-indigo-50/50 text-indigo-800 dark:bg-indigo-950/40 dark:text-indigo-300 dark:border-indigo-800 hover:bg-indigo-100 text-xs font-bold justify-start"
            >
              <BookOpen className="w-3.5 h-3.5 mr-2 text-indigo-600" />
              Csoportosítási segédlet
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
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border-2 border-indigo-300 dark:border-indigo-900 shadow-2xl max-w-2xl w-full text-left">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-600" />
                A számok hármas tagolása és osztályai
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

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-4">
              {NUMBER_READING_CHEAT_SHEET.map((item, idx) => (
                <div key={idx} className="bg-slate-50 dark:bg-slate-800/90 p-3 rounded-xl border border-slate-200/80 dark:border-slate-700">
                  <div className="text-sm font-black text-indigo-600 dark:text-indigo-400">{item.group}</div>
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-0.5">{item.digits}</div>
                  <div className="text-[11px] font-mono text-amber-600 dark:text-amber-400">{item.example}</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">{item.note}</div>
                </div>
              ))}
            </div>

            <div className="text-xs text-slate-600 dark:text-slate-400 bg-indigo-50/80 dark:bg-indigo-950/40 p-3 rounded-xl border border-indigo-200 dark:border-indigo-900/60 leading-relaxed mb-4 space-y-1">
              <p><strong>Csoportosítás:</strong> A számokat jobbról (az egyesek felől) hármasával csoportosítjuk és szóközzel választjuk el: pl. <strong>12 450 678</strong>.</p>
              <p><strong>Kiolvasás:</strong> Balról jobbra haladva kiolvassuk az osztályban lévő számot, majd hozzámondjuk az osztály nevét: pl. <em>„tizenkétmillió-négyszázötvenezer-hatszázhetvennyolc”</em>.</p>
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

export default NumberReadingQuiz;
