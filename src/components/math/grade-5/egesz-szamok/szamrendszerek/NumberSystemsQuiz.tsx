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
  Binary,
  Cpu,
  Maximize2,
  Minimize2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { NumberSystemsMatcher } from './NumberSystemsMatcher';

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
    subtitle: 'Kettes számrendszer alapjai, átváltás 1–15 között',
    range: '1 – 15 (1 – 1111₂)',
    focus: 'Bináris számjegyek (0, 1), alapvető helyiértékek (1, 2, 4, 8)',
    color: 'cyan',
    badgeBg: 'bg-cyan-50 dark:bg-cyan-950/40',
    badgeBorder: 'border-cyan-200 dark:border-cyan-800',
    badgeText: 'text-cyan-700 dark:text-cyan-300',
    accentGradient: 'from-cyan-500 to-teal-600',
    iconBg: 'bg-cyan-500',
    questions: [
      {
        id: 'q1-1',
        prompt: 'Hányféle számjegyet használunk a kettes (bináris) számrendszerben?',
        highlightValue: 'Kettes alap',
        questionTypeBadge: 'Alapfogalom',
        options: ['2-félét (0 és 1)', '10-félét (0-tól 9-ig)', '1-félét (csak 1)', '3-félét (0, 1, 2)'],
        correctAnswer: '2-félét (0 és 1)',
        explanation: 'A kettes (bináris) számrendszer alapja 2, ezért csak kétféle számjegyet használunk: a 0-t és az 1-et.',
        breakdown: [
          { label: 'Alap', value: 'b = 2' },
          { label: 'Jegyek', value: '0, 1' }
        ]
      },
      {
        id: 'q1-2',
        prompt: 'Melyik decimális számnak felel meg a 101₂ bináris szám?',
        highlightValue: '101₂',
        questionTypeBadge: 'Bináris ➔ Decimális',
        options: ['5', '6', '3', '101'],
        correctAnswer: '5',
        explanation: '101₂ = 1 · 4 + 0 · 2 + 1 · 1 = 4 + 1 = 5.',
        breakdown: [
          { label: 'Helyiértékek', value: '4 + 0 + 1' },
          { label: 'Összeg', value: '5' }
        ]
      },
      {
        id: 'q1-3',
        prompt: 'Hogyan írjuk fel a 8-as decimális számot kettes számrendszerben?',
        highlightValue: '8',
        questionTypeBadge: 'Decimális ➔ Bináris',
        options: ['1000₂', '100₂', '111₂', '1001₂'],
        correctAnswer: '1000₂',
        explanation: 'A 8 a 2 harmadik hatványa (2³ = 8), ezért kettes számrendszerben 1000₂.',
        breakdown: [
          { label: '2³ értéke', value: '8' },
          { label: 'Bináris alak', value: '1000₂' }
        ]
      },
      {
        id: 'q1-4',
        prompt: 'Melyik decimális számnak felel meg a 110₂ bináris szám?',
        highlightValue: '110₂',
        questionTypeBadge: 'Bináris ➔ Decimális',
        options: ['6', '5', '4', '7'],
        correctAnswer: '6',
        explanation: '110₂ = 1 · 4 + 1 · 2 + 0 · 1 = 4 + 2 = 6.',
        breakdown: [
          { label: 'Helyiértékek', value: '4 + 2 + 0' },
          { label: 'Összeg', value: '6' }
        ]
      },
      {
        id: 'q1-5',
        prompt: 'Melyik decimális számnak felel meg a 1111₂ bináris szám?',
        highlightValue: '1111₂',
        questionTypeBadge: 'Bináris ➔ Decimális',
        options: ['15', '14', '16', '11'],
        correctAnswer: '15',
        explanation: '1111₂ = 1 · 8 + 1 · 4 + 1 · 2 + 1 · 1 = 8 + 4 + 2 + 1 = 15.',
        breakdown: [
          { label: 'Helyiértékek', value: '8 + 4 + 2 + 1' },
          { label: 'Összeg', value: '15' }
        ]
      },
      {
        id: 'q1-6',
        prompt: 'Hogyan írjuk fel a 3-as számot kettes számrendszerben?',
        highlightValue: '3',
        questionTypeBadge: 'Decimális ➔ Bináris',
        options: ['11₂', '10₂', '101₂', '111₂'],
        correctAnswer: '11₂',
        explanation: '3 = 2 + 1, ezért binárisan 11₂.',
        breakdown: [
          { label: 'Bontás', value: '2 + 1' },
          { label: 'Bináris alak', value: '11₂' }
        ]
      },
      {
        id: 'q1-7',
        prompt: 'Melyik decimális számnak felel meg a 1010₂ bináris szám?',
        highlightValue: '1010₂',
        questionTypeBadge: 'Bináris ➔ Decimális',
        options: ['10', '12', '8', '14'],
        correctAnswer: '10',
        explanation: '1010₂ = 1 · 8 + 0 · 4 + 1 · 2 + 0 · 1 = 8 + 2 = 10.',
        breakdown: [
          { label: 'Helyiértékek', value: '8 + 2' },
          { label: 'Összeg', value: '10' }
        ]
      },
      {
        id: 'q1-8',
        prompt: 'Hogyan nevezzük az informatikában az egyetlen 0 vagy 1 állapotot rögzítő legkisebb információegységet?',
        highlightValue: '0 vagy 1',
        questionTypeBadge: 'Informatikai alapfogalom',
        options: ['Bit (binary digit)', 'Bájt (byte)', 'Pixel', 'Megabájt'],
        correctAnswer: 'Bit (binary digit)',
        explanation: 'A bit a binary digit (bináris számjegy) rövidítése, a legkisebb digitális információegység.',
        breakdown: [
          { label: 'Kifejezés', value: 'Binary Digit' },
          { label: 'Rövidítés', value: 'Bit' }
        ]
      },
      {
        id: 'q1-9',
        prompt: 'Melyik decimális számnak felel meg a 1100₂ bináris szám?',
        highlightValue: '1100₂',
        questionTypeBadge: 'Bináris ➔ Decimális',
        options: ['12', '10', '14', '6'],
        correctAnswer: '12',
        explanation: '1100₂ = 1 · 8 + 1 · 4 + 0 · 2 + 0 · 1 = 8 + 4 = 12.',
        breakdown: [
          { label: 'Helyiértékek', value: '8 + 4' },
          { label: 'Összeg', value: '12' }
        ]
      },
      {
        id: 'q1-10',
        prompt: 'Mennyi a helyiértéke a 1000₂ számban az 1-esnek?',
        highlightValue: '1000₂',
        questionTypeBadge: 'Helyiérték értelmezés',
        options: ['8 (2³)', '4 (2²)', '16 (2⁴)', '1000'],
        correctAnswer: '8 (2³)',
        explanation: 'Jobbról a negyedik helyiérték a 2³ = 8.',
        breakdown: [
          { label: 'Pozíció', value: '4. hely' },
          { label: 'Helyiérték', value: '2³ = 8' }
        ]
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Közepes szint',
    subtitle: 'Számok 16–63 között, 2-hatványok és bájtok',
    range: '16 – 63 (10000₂ – 111111₂)',
    focus: '16, 32, 64 helyiértékek, kétirányú átváltás, bájtok fogalma',
    color: 'teal',
    badgeBg: 'bg-teal-50 dark:bg-teal-950/40',
    badgeBorder: 'border-teal-200 dark:border-teal-800',
    badgeText: 'text-teal-700 dark:text-teal-300',
    accentGradient: 'from-teal-500 to-cyan-600',
    iconBg: 'bg-teal-500',
    questions: [
      {
        id: 'q2-1',
        prompt: 'Mennyi a jobbról számított 5. helyiérték értéke a kettes számrendszerben?',
        highlightValue: '5. helyiérték',
        questionTypeBadge: 'Helyiérték számítás',
        options: ['16 (2⁴)', '32 (2⁵)', '10', '8 (2³)'],
        correctAnswer: '16 (2⁴)',
        explanation: 'A kettes számrendszer helyiértékei jobbról: 1 (2⁰), 2 (2¹), 4 (2²), 8 (2³), 16 (2⁴).',
        breakdown: [
          { label: '5. hely', value: '2⁴' },
          { label: 'Értéke', value: '16' }
        ]
      },
      {
        id: 'q2-2',
        prompt: 'Melyik decimális számnak felel meg a 10000₂ szám?',
        highlightValue: '10000₂',
        questionTypeBadge: 'Bináris ➔ Decimális',
        options: ['16', '32', '10', '20'],
        correctAnswer: '16',
        explanation: '10000₂ = 1 · 16 = 16.',
        breakdown: [
          { label: 'Helyiérték', value: '16' },
          { label: 'Összeg', value: '16' }
        ]
      },
      {
        id: 'q2-3',
        prompt: 'Melyik decimális számnak felel meg a 10101₂ bináris szám?',
        highlightValue: '10101₂',
        questionTypeBadge: 'Bináris ➔ Decimális',
        options: ['21', '19', '23', '25'],
        correctAnswer: '21',
        explanation: '10101₂ = 1 · 16 + 0 · 8 + 1 · 4 + 0 · 2 + 1 · 1 = 16 + 4 + 1 = 21.',
        breakdown: [
          { label: 'Helyiértékek', value: '16 + 4 + 1' },
          { label: 'Összeg', value: '21' }
        ]
      },
      {
        id: 'q2-4',
        prompt: 'Hogyan írjuk fel a 25-öt kettes számrendszerben?',
        highlightValue: '25',
        questionTypeBadge: 'Decimális ➔ Bináris',
        options: ['11001₂', '11010₂', '10101₂', '11101₂'],
        correctAnswer: '11001₂',
        explanation: '25 = 16 + 8 + 1 = 11001₂.',
        breakdown: [
          { label: 'Bontás', value: '16 + 8 + 1' },
          { label: 'Bináris alak', value: '11001₂' }
        ]
      },
      {
        id: 'q2-5',
        prompt: 'Melyik decimális számnak felel meg a 100000₂ bináris szám?',
        highlightValue: '100000₂',
        questionTypeBadge: 'Bináris ➔ Decimális',
        options: ['32', '64', '16', '50'],
        correctAnswer: '32',
        explanation: '100000₂ = 2⁵ = 32.',
        breakdown: [
          { label: '6. helyiérték', value: '2⁵ = 32' },
          { label: 'Összeg', value: '32' }
        ]
      },
      {
        id: 'q2-6',
        prompt: 'Melyik decimális számnak felel meg a 101010₂ bináris szám?',
        highlightValue: '101010₂',
        questionTypeBadge: 'Bináris ➔ Decimális',
        options: ['42', '40', '44', '38'],
        correctAnswer: '42',
        explanation: '101010₂ = 32 + 8 + 2 = 42.',
        breakdown: [
          { label: 'Helyiértékek', value: '32 + 8 + 2' },
          { label: 'Összeg', value: '42' }
        ]
      },
      {
        id: 'q2-7',
        prompt: 'Hogyan írjuk fel a 48-at kettes számrendszerben?',
        highlightValue: '48',
        questionTypeBadge: 'Decimális ➔ Bináris',
        options: ['110000₂', '101000₂', '111000₂', '100110₂'],
        correctAnswer: '110000₂',
        explanation: '48 = 32 + 16, ezért binárisan 110000₂.',
        breakdown: [
          { label: 'Bontás', value: '32 + 16' },
          { label: 'Bináris alak', value: '110000₂' }
        ]
      },
      {
        id: 'q2-8',
        prompt: 'Melyik decimális számnak felel meg a 111111₂ (hat darab egyes) bináris szám?',
        highlightValue: '111111₂',
        questionTypeBadge: 'Bináris ➔ Decimális',
        options: ['63', '64', '62', '31'],
        correctAnswer: '63',
        explanation: '111111₂ = 32 + 16 + 8 + 4 + 2 + 1 = 63 (egyébként 64 - 1 = 63).',
        breakdown: [
          { label: 'Helyiértékek', value: '32+16+8+4+2+1' },
          { label: 'Összeg', value: '63' }
        ]
      },
      {
        id: 'q2-9',
        prompt: 'Hány bit alkot 1 bájtot (byte-ot) az informatikában?',
        highlightValue: '1 Byte',
        questionTypeBadge: 'Informatikai mértékegység',
        options: ['8 bit', '4 bit', '16 bit', '10 bit'],
        correctAnswer: '8 bit',
        explanation: '1 bájt (byte) pontosan 8 bitből áll, amellyel 256 különböző érték (0–255) írható le.',
        breakdown: [
          { label: '1 Byte', value: '8 Bit' },
          { label: 'Értéktartomány', value: '0 – 255' }
        ]
      },
      {
        id: 'q2-10',
        prompt: 'Melyik decimális számnak felel meg a 11011₂ bináris szám?',
        highlightValue: '11011₂',
        questionTypeBadge: 'Bináris ➔ Decimális',
        options: ['27', '29', '25', '31'],
        correctAnswer: '27',
        explanation: '11011₂ = 16 + 8 + 0 + 2 + 1 = 27.',
        breakdown: [
          { label: 'Helyiértékek', value: '16 + 8 + 2 + 1' },
          { label: 'Összeg', value: '27' }
        ]
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Nehéz szint',
    subtitle: 'Nagyobb bináris számok (64–255) és 5-ös alapú rendszer',
    range: '64 – 255 (1 bájt) & 5-ös alap',
    focus: 'Bájt felső határa, 5-ös és 60-as számrendszer működése',
    color: 'indigo',
    badgeBg: 'bg-indigo-50 dark:bg-indigo-950/40',
    badgeBorder: 'border-indigo-200 dark:border-indigo-800',
    badgeText: 'text-indigo-700 dark:text-indigo-300',
    accentGradient: 'from-indigo-500 to-cyan-600',
    iconBg: 'bg-indigo-500',
    questions: [
      {
        id: 'q3-1',
        prompt: 'Melyik decimális számnak felel meg a 10000000₂ (1-es után hét darab 0) szám?',
        highlightValue: '10000000₂',
        questionTypeBadge: 'Bájt legfelső bitje',
        options: ['128 (2⁷)', '256 (2⁸)', '64 (2⁶)', '100'],
        correctAnswer: '128 (2⁷)',
        explanation: 'A 8. helyiérték értéke 2⁷ = 128.',
        breakdown: [
          { label: '8. helyiérték', value: '2⁷' },
          { label: 'Értéke', value: '128' }
        ]
      },
      {
        id: 'q3-2',
        prompt: 'Mennyi 1 bájt (8 bit) legnagyobb lehetséges értéke decimálisan (11111111₂)?',
        highlightValue: '11111111₂',
        questionTypeBadge: 'Bájt maximális értéke',
        options: ['255', '256', '128', '512'],
        correctAnswer: '255',
        explanation: '8 darab egyes összege: 128 + 64 + 32 + 16 + 8 + 4 + 2 + 1 = 255 (2⁸ - 1 = 255).',
        breakdown: [
          { label: '8 bit összege', value: '2⁸ - 1' },
          { label: 'Maximális érték', value: '255' }
        ]
      },
      {
        id: 'q3-3',
        prompt: 'Melyik decimális számnak felel meg a 1100100₂ bináris szám?',
        highlightValue: '1100100₂',
        questionTypeBadge: 'Bináris ➔ Decimális',
        options: ['100', '96', '104', '110'],
        correctAnswer: '100',
        explanation: '1100100₂ = 64 + 32 + 4 = 100.',
        breakdown: [
          { label: 'Helyiértékek', value: '64 + 32 + 4' },
          { label: 'Összeg', value: '100' }
        ]
      },
      {
        id: 'q3-4',
        prompt: 'Az 5-ös alapú számrendszerben milyen helyiértékek követik egymást jobbról balra haladva?',
        highlightValue: '5-ös alap (b = 5)',
        questionTypeBadge: '5-ös számrendszer',
        options: ['1, 5, 25, 125, ...', '1, 2, 4, 8, ...', '1, 10, 100, 1000, ...', '5, 10, 15, 20, ...'],
        correctAnswer: '1, 5, 25, 125, ...',
        explanation: 'Az 5-ös számrendszer helyiértékei az 5 hatványai: 5⁰ = 1, 5¹ = 5, 5² = 25, 5³ = 125.',
        breakdown: [
          { label: 'Hatványok', value: '5⁰, 5¹, 5², 5³' },
          { label: 'Helyiértékek', value: '1, 5, 25, 125' }
        ]
      },
      {
        id: 'q3-5',
        prompt: 'Melyik decimális számnak felel meg a 23₅ (ötös alapú) szám?',
        highlightValue: '23₅',
        questionTypeBadge: '5-ös alap ➔ Decimális',
        options: ['13', '23', '10', '15'],
        correctAnswer: '13',
        explanation: '23₅ = 2 · 5 + 3 · 1 = 10 + 3 = 13.',
        breakdown: [
          { label: 'Helyiértékek', value: '2 · 5 + 3 · 1' },
          { label: 'Összeg', value: '13' }
        ]
      },
      {
        id: 'q3-6',
        prompt: 'Melyik decimális számnak felel meg a 100₅ (ötös alapú) szám?',
        highlightValue: '100₅',
        questionTypeBadge: '5-ös alap ➔ Decimális',
        options: ['25', '100', '20', '125'],
        correctAnswer: '25',
        explanation: '100₅ = 1 · 5² + 0 · 5 + 0 · 1 = 25.',
        breakdown: [
          { label: '3. helyiérték', value: '5² = 25' },
          { label: 'Összeg', value: '25' }
        ]
      },
      {
        id: 'q3-7',
        prompt: 'Melyik decimális számnak felel meg a 44₅ (ötös alapú) szám?',
        highlightValue: '44₅',
        questionTypeBadge: '5-ös alap ➔ Decimális',
        options: ['24', '44', '20', '25'],
        correctAnswer: '24',
        explanation: '44₅ = 4 · 5 + 4 · 1 = 20 + 4 = 24.',
        breakdown: [
          { label: 'Helyiértékek', value: '4 · 5 + 4 · 1' },
          { label: 'Összeg', value: '24' }
        ]
      },
      {
        id: 'q3-8',
        prompt: 'Hány darab tárgyat jelent 1 nagytucat (grosz = 12 × 12)?',
        highlightValue: '1 grosz (12 tucat)',
        questionTypeBadge: '12-es számrendszer',
        options: ['144 darabot', '120 darabot', '100 darabot', '240 darabot'],
        correctAnswer: '144 darabot',
        explanation: '1 tucat = 12 db, 1 nagytucat (grosz) = 12 tucat = 12 · 12 = 144 db.',
        breakdown: [
          { label: '1 tucat', value: '12 db' },
          { label: '1 grosz', value: '144 db' }
        ]
      },
      {
        id: 'q3-9',
        prompt: 'Melyik ősi mezopotámiai számrendszeren alapul az időmérés (1 óra = 60 perc, 1 perc = 60 másodperc)?',
        highlightValue: 'Időmérés',
        questionTypeBadge: 'Történeti számrendszer',
        options: ['60-as (sexagesimális) rendszeren', '10-es rendszeren', '12-es rendszeren', '100-as rendszeren'],
        correctAnswer: '60-as (sexagesimális) rendszeren',
        explanation: 'Az időmérés és a szögmérés (kör 360°-os felosztása) az ókori babiloniak 60-as számrendszeréből maradt ránk.',
        breakdown: [
          { label: 'Alap', value: 'b = 60' },
          { label: 'Alkalmazás', value: 'Idő- és szögmérés' }
        ]
      },
      {
        id: 'q3-10',
        prompt: 'Melyik decimális számnak felel meg a 1010100₂ bináris szám?',
        highlightValue: '1010100₂',
        questionTypeBadge: 'Bináris ➔ Decimális',
        options: ['84', '80', '88', '74'],
        correctAnswer: '84',
        explanation: '1010100₂ = 64 + 16 + 4 = 84.',
        breakdown: [
          { label: 'Helyiértékek', value: '64 + 16 + 4' },
          { label: 'Összeg', value: '84' }
        ]
      }
    ]
  }
};

const NUMBER_SYSTEMS_CHEAT_SHEET = [
  { topic: 'Kettes helyiértékek', formula: '1, 2, 4, 8, 16, 32, 64, 128', note: 'Minden lépésben duplázódik' },
  { topic: '1 Bit', formula: '0 vagy 1', note: 'Elemi információegység' },
  { topic: '1 Bájt (Byte)', formula: '8 bit (0 – 255)', note: '2⁸ = 256 állapot' },
  { topic: 'Átváltás 2 ➔ 10', formula: 'Jegyek · Helyiértékek összege', note: 'Pl. 1101₂ = 8 + 4 + 1 = 13' },
  { topic: '5-ös számrendszer', formula: '1, 5, 25, 125...', note: 'Pl. 23₅ = 2·5 + 3 = 13' },
  { topic: '60-as rendszer', formula: '1 óra = 60 p, 1 p = 60 mp', note: 'Kör: 360°' }
];

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

interface NumberSystemsQuizProps {
  onBack: () => void;
}

export function NumberSystemsQuiz({ onBack }: NumberSystemsQuizProps) {
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

  // Trigger confetti on completion
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

  // Keyboard shortcut listener (1, 2, 3, 4)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameMode !== 'quiz' || isAnswerChecked || isCompleted || !selectedLevel) return;
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
              className="rounded-xl h-8 px-3 text-xs font-bold border-cyan-300 bg-cyan-50/50 text-cyan-800 dark:bg-cyan-950/40 dark:text-cyan-300 dark:border-cyan-800 hover:bg-cyan-100"
            >
              <BookOpen className="w-3.5 h-3.5 mr-1.5 text-cyan-600" />
              Számrendszerek segédlet
            </Button>
          </div>
        </div>

        {/* Hero Header */}
        <div className="text-center max-w-2xl mx-auto mb-4 sm:mb-5">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight flex items-center justify-center gap-2 mb-1">
            <span className="text-2xl">💻</span>
            <span>Számrendszerek Gyakorló</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Gyakorold a kettes (bináris) és tízes számrendszer közötti átváltást többválasztós kvízzel vagy kártyanyitogatós memóriajátékkal!
          </p>

          {/* Quick Mode Switcher in selection */}
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
              <FileQuestion className="w-3.5 h-3.5 text-cyan-500" />
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

        {/* Cheat sheet popover/card */}
        {showCheatSheet && (
          <div className="mb-4 p-4 sm:p-5 bg-gradient-to-br from-cyan-50 to-teal-50 dark:from-slate-900 dark:to-slate-850 rounded-2xl border-2 border-cyan-200 dark:border-cyan-900/60 shadow-md animate-in fade-in duration-200">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm sm:text-base font-black text-cyan-900 dark:text-cyan-200 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-cyan-600" />
                Számrendszerek áttekintése és szabályok
              </h3>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setShowCheatSheet(false)}
                className="text-cyan-800 dark:text-cyan-300 hover:bg-cyan-200/50 rounded-lg h-7 px-2 text-xs"
              >
                Bezárás
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
              {NUMBER_SYSTEMS_CHEAT_SHEET.map((item, idx) => (
                <div key={idx} className="bg-white/95 dark:bg-slate-800/95 p-2.5 rounded-xl border border-cyan-100 dark:border-slate-700 shadow-xs text-left">
                  <div className="text-xs font-black text-cyan-600 dark:text-cyan-400">{item.topic}</div>
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
                onClick={() => handleStartLevel(level)}
                className="group relative bg-white dark:bg-slate-900 rounded-2xl p-5 border-2 border-slate-200/80 dark:border-slate-800 hover:border-cyan-500 dark:hover:border-cyan-500 shadow-sm hover:shadow-lg transition-all duration-200 cursor-pointer flex flex-col justify-between overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-cyan-500/10 to-transparent rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform" />

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform shadow-inner text-white font-serif font-black text-lg", cfg.iconBg)}>
                      {level === 1 ? 'I' : level === 2 ? 'II' : 'III'}
                    </div>

                    <span className={cn("px-2.5 py-1 rounded-full text-[11px] font-black uppercase tracking-wider border", cfg.badgeBg, cfg.badgeBorder, cfg.badgeText)}>
                      {gameMode === 'quiz' ? '10 Kérdés' : '10 Pár'}
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-slate-900 dark:text-white mb-0.5 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
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
                      <span className="font-mono text-[11px] font-bold text-cyan-600 dark:text-cyan-400">{cfg.focus}</span>
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
  const currentQuestion = questions[currentIndex] || levelConfig.questions[currentIndex];

  // 2. Quiz Completed View (Only for Quiz Mode)
  if (isCompleted && gameMode === 'quiz') {
    const totalQuestions = levelConfig.questions.length;
    const percentage = Math.round((score / totalQuestions) * 100);
    const isPerfect = score === totalQuestions;
    const isGood = score >= 7;

    return (
      <div className="max-w-xl mx-auto p-4 sm:p-6 text-center animate-in zoom-in-95 duration-300">
        <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl shadow-xl border-2 border-slate-200 dark:border-slate-800 relative overflow-hidden">
          <div className="w-20 h-20 bg-gradient-to-tr from-cyan-500 to-teal-600 text-white rounded-3xl flex items-center justify-center mx-auto shadow-lg mb-4 ring-8 ring-cyan-100 dark:ring-cyan-950/60 animate-bounce">
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
              <div className="text-2xl font-black text-cyan-600 dark:text-cyan-400">{score} / {totalQuestions}</div>
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
                className="flex-1 h-11 rounded-xl text-sm font-bold bg-cyan-600 hover:bg-cyan-700 text-white shadow-md flex items-center justify-center gap-1.5"
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
  return (
    <div
      ref={containerRef}
      className={cn(
        "w-full max-w-6xl mx-auto px-2 sm:px-4 py-1 animate-in fade-in duration-200 text-left",
        isFullscreen && "fixed inset-0 z-50 max-w-none w-screen h-screen bg-slate-100 dark:bg-slate-950 p-4 sm:p-6 overflow-y-auto"
      )}
    >
      {/* Top Bar: Back button, Level selector pill, Mode switcher, Score */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-200/80 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSelectedLevel(null)}
            className="rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Szintek
          </Button>

          <div className="h-4 w-px bg-slate-200 dark:bg-slate-700" />

          {/* Quick level switcher pills */}
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

        {/* Mode / Score indicator + Fullscreen toggle */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={toggleFullscreen}
            className="rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border-slate-200 dark:border-slate-800"
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

          {gameMode === 'quiz' ? (
            <div className="flex items-center gap-2 bg-white dark:bg-slate-900 px-3 py-1 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-xs text-xs">
              <div className="flex items-center gap-1 font-black text-cyan-600 dark:text-cyan-400">
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
                <div className="flex flex-col gap-3">
                  <Card className="rounded-2xl border-2 border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
                    <CardContent className="p-4 sm:p-5 text-center">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider bg-cyan-50 dark:bg-cyan-950/50 text-cyan-700 dark:text-cyan-300 mb-2 border border-cyan-200 dark:border-cyan-800">
                        <Binary className="w-3 h-3 text-cyan-600" />
                        {currentQuestion.questionTypeBadge}
                      </div>

                      <p className="text-xs sm:text-sm font-bold text-slate-600 dark:text-slate-300 mb-2.5">
                        {currentQuestion.prompt}
                      </p>

                      <div className="inline-block px-6 py-2.5 bg-gradient-to-br from-cyan-50 to-teal-50/60 dark:from-slate-850 dark:to-slate-800 rounded-2xl border-2 border-cyan-200/80 dark:border-slate-700 shadow-inner">
                        <span className="text-2xl sm:text-3xl font-mono font-black tracking-wider text-slate-900 dark:text-cyan-300">
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
                                    {item.label}: <span className="text-cyan-600 dark:text-cyan-400">{item.value}</span>
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <Button
                        onClick={handleNextQuestion}
                        className="w-full h-10 rounded-xl text-sm font-bold bg-slate-900 hover:bg-slate-800 text-white dark:bg-cyan-600 dark:hover:bg-cyan-700 shadow-sm transition-all flex items-center justify-center gap-1.5"
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

                      let buttonStyle = "bg-white dark:bg-slate-900 border-2 border-slate-200/90 dark:border-slate-800 text-slate-800 dark:text-slate-100 hover:border-cyan-500 hover:shadow-xs dark:hover:border-cyan-500";

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
                            "relative h-13 sm:h-14 rounded-xl font-mono font-bold text-xs sm:text-sm transition-all duration-150 flex items-center justify-between px-4",
                            buttonStyle
                          )}
                        >
                          <span className="flex items-center gap-2.5">
                            <span className="w-6 h-6 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-xs font-sans font-bold flex items-center justify-center border border-slate-200 dark:border-slate-700 shrink-0">
                              {idx + 1}
                            </span>
                            <span className="font-bold">{option}</span>
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
                    <div className="p-2.5 bg-cyan-50/60 dark:bg-slate-850/80 rounded-xl border border-cyan-200/50 dark:border-slate-800 text-[11px] text-cyan-900 dark:text-cyan-300 flex items-center gap-1.5 mt-0.5">
                      <Sparkles className="w-3.5 h-3.5 text-cyan-600 shrink-0" />
                      <span>Használd a 2 hatványait: 1, 2, 4, 8, 16, 32, 64...</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            /* MATCHER MODE WORKSPACE */
            <NumberSystemsMatcher
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

        {/* RIGHT: Wordwall-style Activity & Controls Sidebar (3 cols on large screen) */}
        <div className="lg:col-span-3 flex flex-col gap-3">
          {/* Wordwall Mode Card */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-3.5 border-2 border-slate-200/80 dark:border-slate-800 shadow-xs">
            <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2.5 px-1">
              <Layers className="w-3.5 h-3.5 text-cyan-500" />
              <span>Sablon / Játékmód</span>
            </div>

            <div className="flex flex-col gap-1.5">
              {/* Quiz Mode Button */}
              <button
                onClick={() => setGameMode('quiz')}
                className={cn(
                  "w-full p-2.5 rounded-xl text-left font-bold text-xs transition-all flex items-center gap-2.5 border-2",
                  gameMode === 'quiz'
                    ? "bg-cyan-50 dark:bg-cyan-950/50 border-cyan-400 text-cyan-900 dark:text-cyan-200 shadow-xs"
                    : "bg-slate-50/80 dark:bg-slate-800/60 border-transparent hover:border-slate-200 text-slate-600 dark:text-slate-400"
                )}
              >
                <div className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                  gameMode === 'quiz' ? "bg-cyan-500 text-white" : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                )}>
                  <FileQuestion className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-black text-xs">Klasszikus Kvíz</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 font-normal">Többválasztós teszt</div>
                </div>
              </button>

              {/* Matcher Mode Button */}
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
                      ? "bg-slate-900 text-white dark:bg-cyan-600 dark:text-white"
                      : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400"
                  )}
                >
                  <span>{lvl}. {lvl === 1 ? 'Könnyű (1–15)' : lvl === 2 ? 'Közepes (16–63)' : 'Nehéz (64–255 & 5-ös)'}</span>
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
                  <Minimize2 className="w-3.5 h-3.5 mr-2 text-cyan-600" />
                  Kilépés a teljes képernyőből
                </>
              ) : (
                <>
                  <Maximize2 className="w-3.5 h-3.5 mr-2 text-cyan-600" />
                  Teljes képernyős mód
                </>
              )}
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowCheatSheet(!showCheatSheet)}
              className="w-full h-9 rounded-xl border-cyan-300 bg-cyan-50/50 text-cyan-800 dark:bg-cyan-950/40 dark:text-cyan-300 dark:border-cyan-800 hover:bg-cyan-100 text-xs font-bold justify-start"
            >
              <BookOpen className="w-3.5 h-3.5 mr-2 text-cyan-600" />
              Számrendszerek segédlet
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
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border-2 border-cyan-300 dark:border-cyan-900 shadow-2xl max-w-2xl w-full text-left">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-cyan-600" />
                Számrendszerek szabályai és helyiértékei
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

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 mb-4">
              {NUMBER_SYSTEMS_CHEAT_SHEET.map((item, idx) => (
                <div key={idx} className="bg-slate-50 dark:bg-slate-800/90 p-3 rounded-xl border border-slate-200/80 dark:border-slate-700">
                  <div className="text-xs font-black text-cyan-600 dark:text-cyan-400">{item.topic}</div>
                  <div className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200 mt-0.5">{item.formula}</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">{item.note}</div>
                </div>
              ))}
            </div>

            <div className="text-xs text-slate-600 dark:text-slate-400 bg-cyan-50/80 dark:bg-cyan-950/40 p-3 rounded-xl border border-cyan-200 dark:border-cyan-900/60 leading-relaxed mb-4 space-y-1">
              <p><strong>Bináris ➔ Decimális:</strong> Ahol 1-es áll, ott add hozzá a helyiértéket (1, 2, 4, 8, 16, 32, 64, 128).</p>
              <p><strong>Decimális ➔ Bináris:</strong> Vond ki a legnagyobb beleférő 2-hatványt, vagy oszd 2-vel folyamatosan és írd le a maradékokat alulról felfelé.</p>
              <p><strong>5-ös számrendszer:</strong> Helyiértékek: 1, 5, 25, 125... Számjegyek: 0, 1, 2, 3, 4.</p>
            </div>

            <Button
              onClick={() => setShowCheatSheet(false)}
              className="w-full h-10 rounded-xl font-bold bg-cyan-600 hover:bg-cyan-700 text-white"
            >
              Értem, folytatom a játékot!
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default NumberSystemsQuiz;
