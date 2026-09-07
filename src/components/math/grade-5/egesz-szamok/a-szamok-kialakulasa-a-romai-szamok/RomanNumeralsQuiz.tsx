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
  HelpCircle,
  BookOpen,
  Award,
  Zap,
  ArrowRightLeft,
  Star,
  ChevronRight,
  Layers,
  LayoutGrid,
  FileQuestion,
  Shuffle,
  Gamepad2,
  Flame
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { RomanNumeralsMatcher } from './RomanNumeralsMatcher';

export type DifficultyLevel = 1 | 2 | 3;
export type GameMode = 'quiz' | 'matcher';

interface QuizQuestion {
  id: string;
  type: 'arabic-to-roman' | 'roman-to-arabic';
  prompt: string;
  highlightValue: string;
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
  symbols: string;
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
    subtitle: 'Alapok: 1–20 közötti számok',
    range: '1 – 20',
    symbols: 'I (1), V (5), X (10)',
    color: 'emerald',
    badgeBg: 'bg-emerald-50 dark:bg-emerald-950/40',
    badgeBorder: 'border-emerald-200 dark:border-emerald-800',
    badgeText: 'text-emerald-700 dark:text-emerald-300',
    accentGradient: 'from-emerald-500 to-teal-600',
    iconBg: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400',
    questions: [
      {
        id: 'l1-q1',
        type: 'arabic-to-roman',
        prompt: 'Melyik a helyes római szám alakja?',
        highlightValue: '5',
        options: ['V', 'IV', 'VI', 'X'],
        correctAnswer: 'V',
        explanation: 'Az 5-ös szám római számjegye a V.',
        breakdown: [{ label: '5', value: 'V' }]
      },
      {
        id: 'l1-q2',
        type: 'roman-to-arabic',
        prompt: 'Melyik arab számnak felel meg?',
        highlightValue: 'VIII',
        options: ['8', '7', '9', '13'],
        correctAnswer: '8',
        explanation: 'VIII = 5 (V) + 1 + 1 + 1 (III) = 8. (Összeadás elve)',
        breakdown: [
          { label: 'V', value: '5' },
          { label: 'III', value: '+ 3' },
          { label: 'Összesen', value: '8' }
        ]
      },
      {
        id: 'l1-q3',
        type: 'arabic-to-roman',
        prompt: 'Melyik a helyes római szám alakja?',
        highlightValue: '4',
        options: ['IV', 'IIII', 'VI', 'V'],
        correctAnswer: 'IV',
        explanation: 'A 4-et kivonással képezzük: IV = 5 - 1 = 4. Négy egyforma jel (IIII) soha nem állhat egymás mellett!',
        breakdown: [{ label: '5 - 1', value: 'IV = 4' }]
      },
      {
        id: 'l1-q4',
        type: 'roman-to-arabic',
        prompt: 'Melyik arab számnak felel meg?',
        highlightValue: 'IX',
        options: ['9', '11', '8', '19'],
        correctAnswer: '9',
        explanation: 'IX = 10 (X) - 1 (I) = 9. Ha a kisebb értékű I a nagyobb X előtt áll, kivonjuk annak értékét.',
        breakdown: [{ label: '10 - 1', value: 'IX = 9' }]
      },
      {
        id: 'l1-q5',
        type: 'arabic-to-roman',
        prompt: 'Melyik a helyes római szám alakja?',
        highlightValue: '12',
        options: ['XII', 'VII', 'XX', 'IIX'],
        correctAnswer: 'XII',
        explanation: '12 = 10 (X) + 2 (II) = XII.',
        breakdown: [
          { label: '10', value: 'X' },
          { label: '2', value: 'II' },
          { label: 'Összesen', value: 'XII' }
        ]
      },
      {
        id: 'l1-q6',
        type: 'roman-to-arabic',
        prompt: 'Melyik arab számnak felel meg?',
        highlightValue: 'XIV',
        options: ['14', '16', '15', '24'],
        correctAnswer: '14',
        explanation: 'XIV = 10 (X) + 4 (IV) = 14.',
        breakdown: [
          { label: 'X', value: '10' },
          { label: 'IV', value: '+ 4' },
          { label: 'Összesen', value: '14' }
        ]
      },
      {
        id: 'l1-q7',
        type: 'arabic-to-roman',
        prompt: 'Melyik a helyes római szám alakja?',
        highlightValue: '16',
        options: ['XVI', 'XIV', 'XIX', 'XVII'],
        correctAnswer: 'XVI',
        explanation: '16 = 10 (X) + 5 (V) + 1 (I) = XVI.',
        breakdown: [
          { label: '10', value: 'X' },
          { label: '5', value: 'V' },
          { label: '1', value: 'I' },
          { label: 'Összesen', value: 'XVI' }
        ]
      },
      {
        id: 'l1-q8',
        type: 'roman-to-arabic',
        prompt: 'Melyik arab számnak felel meg?',
        highlightValue: 'XIX',
        options: ['19', '21', '18', '99'],
        correctAnswer: '19',
        explanation: 'XIX = 10 (X) + 9 (IX) = 19.',
        breakdown: [
          { label: 'X', value: '10' },
          { label: 'IX', value: '+ 9' },
          { label: 'Összesen', value: '19' }
        ]
      },
      {
        id: 'l1-q9',
        type: 'arabic-to-roman',
        prompt: 'Melyik a helyes római szám alakja?',
        highlightValue: '20',
        options: ['XX', 'VV', 'X', 'XXI'],
        correctAnswer: 'XX',
        explanation: '20 = 10 (X) + 10 (X) = XX. A V betű sosem ismétlődik, ezért a VV hibás!',
        breakdown: [{ label: '10 + 10', value: 'XX = 20' }]
      },
      {
        id: 'l1-q10',
        type: 'roman-to-arabic',
        prompt: 'Melyik arab számnak felel meg?',
        highlightValue: 'XVIII',
        options: ['18', '17', '19', '16'],
        correctAnswer: '18',
        explanation: 'XVIII = 10 (X) + 5 (V) + 3 (III) = 18.',
        breakdown: [
          { label: 'X', value: '10' },
          { label: 'V', value: '+ 5' },
          { label: 'III', value: '+ 3' },
          { label: 'Összesen', value: '18' }
        ]
      }
    ]
  },
  2: {
    level: 2,
    title: '2. Közepes szint',
    subtitle: 'Számok 20–50-ig, új alapjel: L (50)',
    range: '20 – 50',
    symbols: 'X (10), XL (40), L (50)',
    color: 'amber',
    badgeBg: 'bg-amber-50 dark:bg-amber-950/40',
    badgeBorder: 'border-amber-200 dark:border-amber-800',
    badgeText: 'text-amber-700 dark:text-amber-300',
    accentGradient: 'from-amber-500 to-orange-600',
    iconBg: 'bg-amber-100 text-amber-600 dark:bg-amber-900/50 dark:text-amber-400',
    questions: [
      {
        id: 'l2-q1',
        type: 'arabic-to-roman',
        prompt: 'Melyik a helyes római szám alakja?',
        highlightValue: '24',
        options: ['XXIV', 'XXVI', 'XXIIII', 'XIV'],
        correctAnswer: 'XXIV',
        explanation: '24 = 20 (XX) + 4 (IV) = XXIV.',
        breakdown: [
          { label: '20', value: 'XX' },
          { label: '4', value: 'IV' },
          { label: 'Összesen', value: 'XXIV' }
        ]
      },
      {
        id: 'l2-q2',
        type: 'roman-to-arabic',
        prompt: 'Melyik arab számnak felel meg?',
        highlightValue: 'XXIX',
        options: ['29', '31', '28', '39'],
        correctAnswer: '29',
        explanation: 'XXIX = 20 (XX) + 9 (IX) = 29.',
        breakdown: [
          { label: 'XX', value: '20' },
          { label: 'IX', value: '+ 9' },
          { label: 'Összesen', value: '29' }
        ]
      },
      {
        id: 'l2-q3',
        type: 'arabic-to-roman',
        prompt: 'Melyik a helyes római szám alakja?',
        highlightValue: '33',
        options: ['XXXIII', 'XXIII', 'XLIII', 'XXXXIII'],
        correctAnswer: 'XXXIII',
        explanation: '33 = 30 (XXX) + 3 (III) = XXXIII. A maximális 3 darab X és 3 darab I egymás mellett megengedett.',
        breakdown: [
          { label: '30', value: 'XXX' },
          { label: '3', value: 'III' },
          { label: 'Összesen', value: 'XXXIII' }
        ]
      },
      {
        id: 'l2-q4',
        type: 'roman-to-arabic',
        prompt: 'Melyik arab számnak felel meg?',
        highlightValue: 'XXXVIII',
        options: ['38', '37', '48', '33'],
        correctAnswer: '38',
        explanation: 'XXXVIII = 30 (XXX) + 5 (V) + 3 (III) = 38.',
        breakdown: [
          { label: 'XXX', value: '30' },
          { label: 'V', value: '+ 5' },
          { label: 'III', value: '+ 3' },
          { label: 'Összesen', value: '38' }
        ]
      },
      {
        id: 'l2-q5',
        type: 'arabic-to-roman',
        prompt: 'Melyik a helyes római szám alakja?',
        highlightValue: '40',
        options: ['XL', 'XXXX', 'LX', 'L'],
        correctAnswer: 'XL',
        explanation: '40 = 50 - 10 = XL (kivonás elve: az 50 (L) előtt áll a 10 (X)). Négy X (XXXX) nem állhat egymás után!',
        breakdown: [{ label: '50 - 10', value: 'XL = 40' }]
      },
      {
        id: 'l2-q6',
        type: 'roman-to-arabic',
        prompt: 'Melyik arab számnak felel meg?',
        highlightValue: 'XLV',
        options: ['45', '55', '65', '35'],
        correctAnswer: '45',
        explanation: 'XLV = 40 (XL) + 5 (V) = 45.',
        breakdown: [
          { label: 'XL', value: '40' },
          { label: 'V', value: '+ 5' },
          { label: 'Összesen', value: '45' }
        ]
      },
      {
        id: 'l2-q7',
        type: 'arabic-to-roman',
        prompt: 'Melyik a helyes római szám alakja?',
        highlightValue: '44',
        options: ['XLIV', 'XLVI', 'XXXXIV', 'LIV'],
        correctAnswer: 'XLIV',
        explanation: '44 = 40 (XL) + 4 (IV) = XLIV. Kétszeres kivonási elv érvényesül (a tízeseknél és egyeseknél is).',
        breakdown: [
          { label: '40', value: 'XL' },
          { label: '4', value: 'IV' },
          { label: 'Összesen', value: 'XLIV' }
        ]
      },
      {
        id: 'l2-q8',
        type: 'roman-to-arabic',
        prompt: 'Melyik arab számnak felel meg?',
        highlightValue: 'XLIX',
        options: ['49', '59', '48', '51'],
        correctAnswer: '49',
        explanation: 'XLIX = 40 (XL) + 9 (IX) = 49. (Nem írható IL formában, mert a számokat helyiértékek szerint kell felbontani: 40 + 9).',
        breakdown: [
          { label: 'XL', value: '40' },
          { label: 'IX', value: '+ 9' },
          { label: 'Összesen', value: '49' }
        ]
      },
      {
        id: 'l2-q9',
        type: 'arabic-to-roman',
        prompt: 'Melyik a helyes római szám alakja?',
        highlightValue: '50',
        options: ['L', 'C', 'XXXXX', 'D'],
        correctAnswer: 'L',
        explanation: 'Az 50 római számjele az L.',
        breakdown: [{ label: '50', value: 'L' }]
      },
      {
        id: 'l2-q10',
        type: 'roman-to-arabic',
        prompt: 'Melyik arab számnak felel meg?',
        highlightValue: 'XLVII',
        options: ['47', '57', '37', '46'],
        correctAnswer: '47',
        explanation: 'XLVII = 40 (XL) + 7 (VII) = 47.',
        breakdown: [
          { label: 'XL', value: '40' },
          { label: 'VII', value: '+ 7' },
          { label: 'Összesen', value: '47' }
        ]
      }
    ]
  },
  3: {
    level: 3,
    title: '3. Nehéz szint',
    subtitle: 'Számok 50–100-ig, új alapjel: C (100)',
    range: '50 – 100',
    symbols: 'L (50), XC (90), C (100)',
    color: 'purple',
    badgeBg: 'bg-purple-50 dark:bg-purple-950/40',
    badgeBorder: 'border-purple-200 dark:border-purple-800',
    badgeText: 'text-purple-700 dark:text-purple-300',
    accentGradient: 'from-purple-600 to-indigo-600',
    iconBg: 'bg-purple-100 text-purple-600 dark:bg-purple-900/50 dark:text-purple-400',
    questions: [
      {
        id: 'l3-q1',
        type: 'arabic-to-roman',
        prompt: 'Melyik a helyes római szám alakja?',
        highlightValue: '58',
        options: ['LVIII', 'XLVIII', 'LVII', 'LXVIII'],
        correctAnswer: 'LVIII',
        explanation: '58 = 50 (L) + 8 (VIII) = LVIII.',
        breakdown: [
          { label: '50', value: 'L' },
          { label: '8', value: 'VIII' },
          { label: 'Összesen', value: 'LVIII' }
        ]
      },
      {
        id: 'l3-q2',
        type: 'roman-to-arabic',
        prompt: 'Melyik arab számnak felel meg?',
        highlightValue: 'LXIV',
        options: ['64', '66', '54', '74'],
        correctAnswer: '64',
        explanation: 'LXIV = 60 (LX) + 4 (IV) = 64.',
        breakdown: [
          { label: 'LX', value: '60' },
          { label: 'IV', value: '+ 4' },
          { label: 'Összesen', value: '64' }
        ]
      },
      {
        id: 'l3-q3',
        type: 'arabic-to-roman',
        prompt: 'Melyik a helyes római szám alakja?',
        highlightValue: '73',
        options: ['LXXIII', 'LXIII', 'LXXXIII', 'LXXIV'],
        correctAnswer: 'LXXIII',
        explanation: '73 = 70 (LXX) + 3 (III) = LXXIII.',
        breakdown: [
          { label: '70', value: 'LXX' },
          { label: '3', value: 'III' },
          { label: 'Összesen', value: 'LXXIII' }
        ]
      },
      {
        id: 'l3-q4',
        type: 'roman-to-arabic',
        prompt: 'Melyik arab számnak felel meg?',
        highlightValue: 'LXXVI',
        options: ['76', '74', '66', '86'],
        correctAnswer: '76',
        explanation: 'LXXVI = 70 (LXX) + 6 (VI) = 76.',
        breakdown: [
          { label: 'LXX', value: '70' },
          { label: 'VI', value: '+ 6' },
          { label: 'Összesen', value: '76' }
        ]
      },
      {
        id: 'l3-q5',
        type: 'arabic-to-roman',
        prompt: 'Melyik a helyes római szám alakja?',
        highlightValue: '84',
        options: ['LXXXIV', 'LXXXVI', 'XCIV', 'LXXIV'],
        correctAnswer: 'LXXXIV',
        explanation: '84 = 80 (LXXX) + 4 (IV) = LXXXIV.',
        breakdown: [
          { label: '80', value: 'LXXX' },
          { label: '4', value: 'IV' },
          { label: 'Összesen', value: 'LXXXIV' }
        ]
      },
      {
        id: 'l3-q6',
        type: 'roman-to-arabic',
        prompt: 'Melyik arab számnak felel meg?',
        highlightValue: 'LXXXIX',
        options: ['89', '99', '79', '88'],
        correctAnswer: '89',
        explanation: 'LXXXIX = 80 (LXXX) + 9 (IX) = 89.',
        breakdown: [
          { label: 'LXXX', value: '80' },
          { label: 'IX', value: '+ 9' },
          { label: 'Összesen', value: '89' }
        ]
      },
      {
        id: 'l3-q7',
        type: 'arabic-to-roman',
        prompt: 'Melyik a helyes római szám alakja?',
        highlightValue: '90',
        options: ['XC', 'LXXXX', 'CX', 'IC'],
        correctAnswer: 'XC',
        explanation: '90 = 100 - 10 = XC (kivonás elve: 100 (C) előtt a 10 (X)). Négy darab X egymás mellett tilos!',
        breakdown: [{ label: '100 - 10', value: 'XC = 90' }]
      },
      {
        id: 'l3-q8',
        type: 'roman-to-arabic',
        prompt: 'Melyik arab számnak felel meg?',
        highlightValue: 'XCIV',
        options: ['94', '96', '104', '84'],
        correctAnswer: '94',
        explanation: 'XCIV = 90 (XC) + 4 (IV) = 94.',
        breakdown: [
          { label: 'XC', value: '90' },
          { label: 'IV', value: '+ 4' },
          { label: 'Összesen', value: '94' }
        ]
      },
      {
        id: 'l3-q9',
        type: 'arabic-to-roman',
        prompt: 'Melyik a helyes római szám alakja?',
        highlightValue: '99',
        options: ['XCIX', 'IC', 'LXXXXIX', 'CXI'],
        correctAnswer: 'XCIX',
        explanation: '99 = 90 + 9 = XC + IX = XCIX. (Figyelem: az IC alak szabálytalan, mert a római számírásban helyiértékek szerint bontjuk a számokat: 90 = XC, 9 = IX!).',
        breakdown: [
          { label: '90', value: 'XC' },
          { label: '9', value: 'IX' },
          { label: 'Összesen', value: 'XCIX' }
        ]
      },
      {
        id: 'l3-q10',
        type: 'roman-to-arabic',
        prompt: 'Melyik arab számnak felel meg?',
        highlightValue: 'C',
        options: ['100', '50', '500', '1000'],
        correctAnswer: '100',
        explanation: 'A 100 római számjele a C (a latin "centum" = száz szóból ered).',
        breakdown: [{ label: '100', value: 'C' }]
      }
    ]
  }
};

const ROMAN_SYMBOLS_CHEAT_SHEET = [
  { roman: 'I', arabic: '1', note: 'Alapjel (max. 3x ismételhető)' },
  { roman: 'V', arabic: '5', note: 'Segédjel (nem ismételhető)' },
  { roman: 'X', arabic: '10', note: 'Alapjel (max. 3x ismételhető)' },
  { roman: 'L', arabic: '50', note: 'Segédjel (nem ismételhető)' },
  { roman: 'C', arabic: '100', note: 'Alapjel (latin: centum)' },
  { roman: 'IV', arabic: '4', note: 'Kivonás: 5 - 1' },
  { roman: 'IX', arabic: '9', note: 'Kivonás: 10 - 1' },
  { roman: 'XL', arabic: '40', note: 'Kivonás: 50 - 10' },
  { roman: 'XC', arabic: '90', note: 'Kivonás: 100 - 10' }
];

interface RomanNumeralsQuizProps {
  onBack: () => void;
}

export function RomanNumeralsQuiz({ onBack }: RomanNumeralsQuizProps) {
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
      if (nextStreak > bestStreak) {
        setBestStreak(nextStreak);
      }
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

  // Keyboard navigation support for options 1-4
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

  // 1. Difficulty Level Selection Screen
  if (!selectedLevel) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-2 sm:py-3 animate-in fade-in slide-in-from-bottom-2 duration-300 text-left">
        {/* Top bar with back and cheat sheet buttons */}
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
            className="rounded-xl h-9 px-3 border-amber-300 bg-amber-50/60 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800 hover:bg-amber-100 text-xs sm:text-sm font-bold"
          >
            <BookOpen className="w-3.5 h-3.5 mr-1.5 text-amber-600" />
            Római számok szabályai
          </Button>
        </div>

        {/* Hero Header */}
        <div className="text-center max-w-2xl mx-auto mb-4 sm:mb-5">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight flex items-center justify-center gap-2 mb-1">
            <span className="text-2xl">🏛️</span>
            <span>Római Számok Gyakorló</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Gyakorold a római számírást 1-től 100-ig többválasztós kvízzel vagy kártyanyitogatós párosító játékkal!
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
              <LayoutGrid className="w-3.5 h-3.5 text-indigo-500" />
              Kártyás Párosító
            </button>
          </div>
        </div>

        {/* Cheat sheet popover/card */}
        {showCheatSheet && (
          <div className="mb-4 p-4 sm:p-5 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-slate-900 dark:to-slate-850 rounded-2xl border-2 border-amber-200 dark:border-amber-900/60 shadow-md animate-in fade-in duration-200">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm sm:text-base font-black text-amber-900 dark:text-amber-200 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-600" />
                Római számjegyek és szabályok (1–100)
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
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
              {ROMAN_SYMBOLS_CHEAT_SHEET.map((item, idx) => (
                <div key={idx} className="bg-white/95 dark:bg-slate-800/95 p-2.5 rounded-xl border border-amber-100 dark:border-slate-700 shadow-xs text-left">
                  <div className="text-lg font-serif font-black text-amber-600 dark:text-amber-400">{item.roman}</div>
                  <div className="text-sm font-black text-slate-800 dark:text-slate-100">= {item.arabic}</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">{item.note}</div>
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
                className="group relative bg-white dark:bg-slate-900 rounded-2xl p-5 border-2 border-slate-200/80 dark:border-slate-800 hover:border-amber-500 dark:hover:border-amber-500 shadow-sm hover:shadow-lg transition-all duration-200 cursor-pointer flex flex-col justify-between overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-amber-500/10 to-transparent rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform" />

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform shadow-inner", cfg.iconBg)}>
                      <span className="font-serif font-black text-lg">{level === 1 ? 'I' : level === 2 ? 'II' : 'III'}</span>
                    </div>

                    <span className={cn("px-2.5 py-1 rounded-full text-[11px] font-black uppercase tracking-wider border", cfg.badgeBg, cfg.badgeBorder, cfg.badgeText)}>
                      {gameMode === 'quiz' ? '10 Kérdés' : '10 Pár'}
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
                      <span className="text-slate-500 dark:text-slate-400">Főbb jelek:</span>
                      <span className="font-mono font-bold text-amber-600 dark:text-amber-400">{cfg.symbols}</span>
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

  // 2. Quiz Completed View (Only for Quiz Mode)
  if (isCompleted && gameMode === 'quiz') {
    const totalQuestions = levelConfig.questions.length;
    const percentage = Math.round((score / totalQuestions) * 100);
    const isPerfect = score === totalQuestions;
    const isGood = score >= 7;

    return (
      <div className="max-w-xl mx-auto p-4 sm:p-6 text-center animate-in zoom-in-95 duration-300">
        <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl shadow-xl border-2 border-slate-200 dark:border-slate-800 relative overflow-hidden">
          <div className="w-20 h-20 bg-gradient-to-tr from-amber-400 to-yellow-500 text-white rounded-3xl flex items-center justify-center mx-auto shadow-lg mb-4 ring-8 ring-amber-100 dark:ring-amber-950/60 animate-bounce">
            <Trophy className="w-10 h-10" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mb-1">
            {isPerfect ? 'Tökéletes Kvíz! 🏆' : isGood ? 'Szép Munka! 🌟' : 'Gyakorolj még egy kicsit! 💪'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-5">
            Sikeresen befejezted a <span className="font-bold text-slate-800 dark:text-slate-200">{levelConfig.title}</span> kvízét!
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
  return (
    <div className="w-full max-w-6xl mx-auto px-2 sm:px-4 py-1 animate-in fade-in duration-200 text-left">
      {/* Top Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 mb-2.5">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setSelectedLevel(null)}
          className="h-8 rounded-xl px-2.5 border border-slate-200/80 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium text-xs"
        >
          <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Szint választás
        </Button>

        {/* Level pills in header */}
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
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 mb-2 border border-slate-200 dark:border-slate-700">
                        <ArrowRightLeft className="w-3 h-3 text-amber-600" />
                        {currentQuestion.type === 'arabic-to-roman'
                          ? 'Arab szám ➔ Római szám'
                          : 'Római szám ➔ Arab szám'}
                      </div>

                      <p className="text-xs sm:text-sm font-bold text-slate-600 dark:text-slate-300 mb-2.5">
                        {currentQuestion.prompt}
                      </p>

                      <div className="inline-block px-7 py-2.5 bg-gradient-to-br from-amber-50 to-orange-50/60 dark:from-slate-850 dark:to-slate-800 rounded-2xl border-2 border-amber-200/80 dark:border-slate-700 shadow-inner">
                        <span className="text-3xl sm:text-4xl font-serif font-black tracking-wider text-slate-900 dark:text-amber-400">
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
                                    {item.label}: <span className="text-amber-600 dark:text-amber-400">{item.value}</span>
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <Button
                        onClick={handleNextQuestion}
                        className="w-full h-10 rounded-xl text-sm font-bold bg-slate-900 hover:bg-slate-800 text-white dark:bg-amber-600 dark:hover:bg-amber-700 shadow-sm transition-all flex items-center justify-center gap-1.5"
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

                      let buttonStyle = "bg-white dark:bg-slate-900 border-2 border-slate-200/90 dark:border-slate-800 text-slate-800 dark:text-slate-100 hover:border-amber-500 hover:shadow-xs dark:hover:border-amber-500";

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
                            "relative h-13 sm:h-14 rounded-xl font-serif font-black text-lg sm:text-xl transition-all duration-150 flex items-center justify-between px-4",
                            buttonStyle
                          )}
                        >
                          <span className="flex items-center gap-2.5">
                            <span className="w-6 h-6 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-xs font-sans font-bold flex items-center justify-center border border-slate-200 dark:border-slate-700">
                              {idx + 1}
                            </span>
                            <span>{option}</span>
                          </span>

                          {isAnswerChecked && isCorrect && (
                            <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 animate-in zoom-in" />
                          )}
                          {isAnswerChecked && isSelected && !isCorrect && (
                            <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 animate-in zoom-in" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {!isAnswerChecked && (
                    <div className="p-2.5 bg-amber-50/60 dark:bg-slate-850/80 rounded-xl border border-amber-200/50 dark:border-slate-800 text-[11px] text-amber-900 dark:text-amber-300 flex items-center gap-1.5 mt-0.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span>Használd az összeadási és kivonási szabályokat!</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            /* MATCHER MODE WORKSPACE */
            <RomanNumeralsMatcher
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
                      ? "bg-slate-900 text-white dark:bg-amber-600 dark:text-white"
                      : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400"
                  )}
                >
                  <span>{lvl}. {lvl === 1 ? 'Könnyű (1–20)' : lvl === 2 ? 'Közepes (20–50)' : 'Nehéz (50–100)'}</span>
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
              onClick={() => setShowCheatSheet(!showCheatSheet)}
              className="w-full h-9 rounded-xl border-amber-300 bg-amber-50/50 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800 hover:bg-amber-100 text-xs font-bold justify-start"
            >
              <BookOpen className="w-3.5 h-3.5 mr-2 text-amber-600" />
              Római szabályok segédlet
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

      {/* Rules Modal Overlay if triggered from sidebar */}
      {showCheatSheet && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border-2 border-amber-300 dark:border-amber-900 shadow-2xl max-w-2xl w-full text-left">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-600" />
                Római számjegyek és szabályok áttekintése (1–100)
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

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5 mb-4">
              {ROMAN_SYMBOLS_CHEAT_SHEET.map((item, idx) => (
                <div key={idx} className="bg-slate-50 dark:bg-slate-800/90 p-2.5 rounded-xl border border-slate-200/80 dark:border-slate-700">
                  <div className="text-lg font-serif font-black text-amber-600 dark:text-amber-400">{item.roman}</div>
                  <div className="text-sm font-black text-slate-800 dark:text-slate-100">= {item.arabic}</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight mt-0.5">{item.note}</div>
                </div>
              ))}
            </div>

            <div className="text-xs text-slate-600 dark:text-slate-400 bg-amber-50/80 dark:bg-amber-950/40 p-3 rounded-xl border border-amber-200 dark:border-amber-900/60 leading-relaxed mb-4">
              <p className="font-bold text-amber-900 dark:text-amber-200 mb-1">Főbb elvek:</p>
              <ul className="list-disc list-inside space-y-0.5">
                <li><strong>Összeadás elve:</strong> Ha a kisebb jel a nagyobb után áll: pl. VI = 5 + 1 = 6, XV = 10 + 5 = 15.</li>
                <li><strong>Kivonás elve:</strong> Ha a kisebb jel a nagyobb előtt áll: pl. IV = 4, IX = 9, XL = 40, XC = 90.</li>
                <li><strong>Ismétlési korlát:</strong> I, X, C legfeljebb 3-szor ismételhető egymás mellett. V, L nem ismételhető!</li>
              </ul>
            </div>

            <Button
              onClick={() => setShowCheatSheet(false)}
              className="w-full h-10 rounded-xl font-bold bg-amber-600 hover:bg-amber-700 text-white"
            >
              Értem, folytatom a játékot!
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default RomanNumeralsQuiz;
