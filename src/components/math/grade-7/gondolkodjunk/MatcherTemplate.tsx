import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Button } from '@/components/ui/button';
import {
  RotateCcw,
  Trophy,
  CheckCircle2,
  Clock,
  BookOpen,
  ArrowRight,
  ArrowRightLeft,
  ArrowLeft,
  Sparkles
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { DifficultyLevel } from './QuizTemplate';
import { useAuth } from '@/contexts/AuthContext';
import { saveQuizProgress } from '@/services/quizProgressService';
import { saveMatcherScore } from '@/services/matcherLeaderboardService';
import { MatcherLeaderboardModal } from '@/components/math/shared/MatcherLeaderboardModal';
import { MathText } from '@/components/math/shared/MathText';

export interface MatcherPair {
  id: string | number;
  prompt?: React.ReactNode;
  value?: React.ReactNode;
  left?: React.ReactNode;
  right?: React.ReactNode;
  question?: React.ReactNode;
  answer?: React.ReactNode;
  term?: React.ReactNode;
  definition?: React.ReactNode;
  front?: React.ReactNode;
  back?: React.ReactNode;
  figure?: React.ReactNode;
  promptFigure?: React.ReactNode;
  valueFigure?: React.ReactNode;
  [key: string]: any;
}

export interface MatcherLevelConfig {
  level?: number;
  title?: string;
  subtitle?: string;
  description?: string;
  pairs: MatcherPair[];
  [key: string]: any;
}

export interface MatcherTemplateProps {
  level?: DifficultyLevel;
  currentLevel?: DifficultyLevel;
  title?: string;
  subtitle?: string;
  badge?: string;
  topicTitle?: string;
  levels?: Record<DifficultyLevel, MatcherLevelConfig>;
  levelsConfig?: Record<DifficultyLevel, MatcherLevelConfig>;
  config?: MatcherLevelConfig;
  pairs?: MatcherPair[];
  level1Pairs?: MatcherPair[];
  level2Pairs?: MatcherPair[];
  level3Pairs?: MatcherPair[];
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onBack?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToSorter?: () => void;
  onSwitchToTheory?: () => void;
  themeColor?: string;
  grade?: number;
  chapterId?: string;
  topicId?: string;
  [key: string]: any;
}

interface CardItem {
  id: string;
  pairId: string | number;
  content?: React.ReactNode;
  figure?: React.ReactNode;
  type: 'prompt' | 'value';
  isFlipped: boolean;
  isMatched: boolean;
}

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

interface ThemeConfig {
  topBarGradient: string;
  topBarBorder: string;
  iconBg: string;
  badgeText: string;
  cardBase: string;
  cardFlipped: string;
  figureBorder: string;
  accentBtn: string;
  ruleBtn: string;
  theoryBtn: string;
  winBg: string;
  winIcon: string;
}

const THEME_MAP: Record<string, ThemeConfig> = {
  amber: {
    topBarGradient: 'from-amber-50/80 via-white to-orange-50/80 dark:bg-slate-850',
    topBarBorder: 'border-amber-200/90 dark:border-amber-800/80',
    iconBg: 'bg-gradient-to-br from-amber-500 to-orange-600',
    badgeText: 'text-amber-700 dark:text-amber-300',
    cardBase: 'border-2 border-amber-200/90 dark:border-amber-800/80 bg-gradient-to-br from-white via-amber-50/30 to-orange-50/40 text-slate-900 dark:text-slate-100 hover:border-amber-500 dark:hover:border-amber-400 hover:shadow-md hover:from-amber-50/60 hover:to-orange-50/70 hover:-translate-y-0.5 active:translate-y-0',
    cardFlipped: 'border-2 border-amber-500 bg-gradient-to-br from-amber-100 via-yellow-50 to-orange-100 text-amber-950 dark:text-amber-50 ring-3 ring-amber-400/40 shadow-lg scale-[1.02]',
    figureBorder: 'border-amber-100/80 dark:border-amber-900/60',
    accentBtn: 'bg-amber-600 hover:bg-amber-700 text-white',
    ruleBtn: 'border-amber-200 text-amber-800 bg-amber-50/50 hover:bg-amber-100',
    theoryBtn: 'border-orange-200 text-orange-800 bg-orange-50/50 hover:bg-orange-100',
    winBg: 'from-amber-50/80 to-white dark:from-slate-850 dark:to-slate-900 border-amber-300 dark:border-amber-800/80',
    winIcon: 'from-amber-400 to-orange-600 shadow-amber-500/30',
  },
  purple: {
    topBarGradient: 'from-purple-50/80 via-white to-fuchsia-50/80 dark:bg-slate-850',
    topBarBorder: 'border-purple-200/90 dark:border-purple-800/80',
    iconBg: 'bg-gradient-to-br from-purple-500 to-fuchsia-600',
    badgeText: 'text-purple-700 dark:text-purple-300',
    cardBase: 'border-2 border-purple-200/90 dark:border-purple-800/80 bg-gradient-to-br from-white via-purple-50/30 to-fuchsia-50/40 text-slate-900 dark:text-slate-100 hover:border-purple-500 dark:hover:border-purple-400 hover:shadow-md hover:from-purple-50/60 hover:to-fuchsia-50/70 hover:-translate-y-0.5 active:translate-y-0',
    cardFlipped: 'border-2 border-purple-500 bg-gradient-to-br from-purple-100 via-pink-50 to-fuchsia-100 text-purple-950 dark:text-purple-50 ring-3 ring-purple-400/40 shadow-lg scale-[1.02]',
    figureBorder: 'border-purple-100/80 dark:border-purple-900/60',
    accentBtn: 'bg-purple-600 hover:bg-purple-700 text-white',
    ruleBtn: 'border-purple-200 text-purple-800 bg-purple-50/50 hover:bg-purple-100',
    theoryBtn: 'border-fuchsia-200 text-fuchsia-800 bg-fuchsia-50/50 hover:bg-fuchsia-100',
    winBg: 'from-purple-50/80 to-white dark:from-slate-850 dark:to-slate-900 border-purple-300 dark:border-purple-800/80',
    winIcon: 'from-amber-400 to-purple-600 shadow-purple-500/30',
  },
  violet: {
    topBarGradient: 'from-violet-50/80 via-white to-purple-50/80 dark:bg-slate-850',
    topBarBorder: 'border-violet-200/90 dark:border-violet-800/80',
    iconBg: 'bg-gradient-to-br from-violet-500 to-purple-600',
    badgeText: 'text-violet-700 dark:text-violet-300',
    cardBase: 'border-2 border-violet-200/90 dark:border-violet-800/80 bg-gradient-to-br from-white via-violet-50/30 to-purple-50/40 text-slate-900 dark:text-slate-100 hover:border-violet-500 dark:hover:border-violet-400 hover:shadow-md hover:from-violet-50/60 hover:to-purple-50/70 hover:-translate-y-0.5 active:translate-y-0',
    cardFlipped: 'border-2 border-violet-500 bg-gradient-to-br from-violet-100 via-fuchsia-50 to-purple-100 text-violet-950 dark:text-violet-50 ring-3 ring-violet-400/40 shadow-lg scale-[1.02]',
    figureBorder: 'border-violet-100/80 dark:border-violet-900/60',
    accentBtn: 'bg-violet-600 hover:bg-violet-700 text-white',
    ruleBtn: 'border-violet-200 text-violet-800 bg-violet-50/50 hover:bg-violet-100',
    theoryBtn: 'border-purple-200 text-purple-800 bg-purple-50/50 hover:bg-purple-100',
    winBg: 'from-violet-50/80 to-white dark:from-slate-850 dark:to-slate-900 border-violet-300 dark:border-violet-800/80',
    winIcon: 'from-amber-400 to-violet-600 shadow-violet-500/30',
  },
  indigo: {
    topBarGradient: 'from-indigo-50/80 via-white to-blue-50/80 dark:bg-slate-850',
    topBarBorder: 'border-indigo-200/90 dark:border-indigo-800/80',
    iconBg: 'bg-gradient-to-br from-indigo-500 to-blue-600',
    badgeText: 'text-indigo-700 dark:text-indigo-300',
    cardBase: 'border-2 border-indigo-200/90 dark:border-indigo-800/80 bg-gradient-to-br from-white via-indigo-50/30 to-blue-50/40 text-slate-900 dark:text-slate-100 hover:border-indigo-500 dark:hover:border-indigo-400 hover:shadow-md hover:from-indigo-50/60 hover:to-blue-50/70 hover:-translate-y-0.5 active:translate-y-0',
    cardFlipped: 'border-2 border-indigo-500 bg-gradient-to-br from-indigo-100 via-sky-50 to-blue-100 text-indigo-950 dark:text-indigo-50 ring-3 ring-indigo-400/40 shadow-lg scale-[1.02]',
    figureBorder: 'border-indigo-100/80 dark:border-indigo-900/60',
    accentBtn: 'bg-indigo-600 hover:bg-indigo-700 text-white',
    ruleBtn: 'border-indigo-200 text-indigo-800 bg-indigo-50/50 hover:bg-indigo-100',
    theoryBtn: 'border-blue-200 text-blue-800 bg-blue-50/50 hover:bg-blue-100',
    winBg: 'from-indigo-50/80 to-white dark:from-slate-850 dark:to-slate-900 border-indigo-300 dark:border-indigo-800/80',
    winIcon: 'from-amber-400 to-indigo-600 shadow-indigo-500/30',
  },
  blue: {
    topBarGradient: 'from-blue-50/80 via-white to-cyan-50/80 dark:bg-slate-850',
    topBarBorder: 'border-blue-200/90 dark:border-blue-800/80',
    iconBg: 'bg-gradient-to-br from-blue-500 to-cyan-600',
    badgeText: 'text-blue-700 dark:text-blue-300',
    cardBase: 'border-2 border-blue-200/90 dark:border-blue-800/80 bg-gradient-to-br from-white via-blue-50/30 to-cyan-50/40 text-slate-900 dark:text-slate-100 hover:border-blue-500 dark:hover:border-blue-400 hover:shadow-md hover:from-blue-50/60 hover:to-cyan-50/70 hover:-translate-y-0.5 active:translate-y-0',
    cardFlipped: 'border-2 border-blue-500 bg-gradient-to-br from-blue-100 via-sky-50 to-cyan-100 text-blue-950 dark:text-blue-50 ring-3 ring-blue-400/40 shadow-lg scale-[1.02]',
    figureBorder: 'border-blue-100/80 dark:border-blue-900/60',
    accentBtn: 'bg-blue-600 hover:bg-blue-700 text-white',
    ruleBtn: 'border-blue-200 text-blue-800 bg-blue-50/50 hover:bg-blue-100',
    theoryBtn: 'border-cyan-200 text-cyan-800 bg-cyan-50/50 hover:bg-cyan-100',
    winBg: 'from-blue-50/80 to-white dark:from-slate-850 dark:to-slate-900 border-blue-300 dark:border-blue-800/80',
    winIcon: 'from-amber-400 to-blue-600 shadow-blue-500/30',
  },
  cyan: {
    topBarGradient: 'from-cyan-50/80 via-white to-teal-50/80 dark:bg-slate-850',
    topBarBorder: 'border-cyan-200/90 dark:border-cyan-800/80',
    iconBg: 'bg-gradient-to-br from-cyan-500 to-teal-600',
    badgeText: 'text-cyan-700 dark:text-cyan-300',
    cardBase: 'border-2 border-cyan-200/90 dark:border-cyan-800/80 bg-gradient-to-br from-white via-cyan-50/30 to-teal-50/40 text-slate-900 dark:text-slate-100 hover:border-cyan-500 dark:hover:border-cyan-400 hover:shadow-md hover:from-cyan-50/60 hover:to-teal-50/70 hover:-translate-y-0.5 active:translate-y-0',
    cardFlipped: 'border-2 border-cyan-500 bg-gradient-to-br from-cyan-100 via-sky-50 to-teal-100 text-cyan-950 dark:text-cyan-50 ring-3 ring-cyan-400/40 shadow-lg scale-[1.02]',
    figureBorder: 'border-cyan-100/80 dark:border-cyan-900/60',
    accentBtn: 'bg-cyan-600 hover:bg-cyan-700 text-white',
    ruleBtn: 'border-cyan-200 text-cyan-800 bg-cyan-50/50 hover:bg-cyan-100',
    theoryBtn: 'border-teal-200 text-teal-800 bg-teal-50/50 hover:bg-teal-100',
    winBg: 'from-cyan-50/80 to-white dark:from-slate-850 dark:to-slate-900 border-cyan-300 dark:border-cyan-800/80',
    winIcon: 'from-amber-400 to-cyan-600 shadow-cyan-500/30',
  },
  teal: {
    topBarGradient: 'from-teal-50/80 via-white to-emerald-50/80 dark:bg-slate-850',
    topBarBorder: 'border-teal-200/90 dark:border-teal-800/80',
    iconBg: 'bg-gradient-to-br from-teal-500 to-emerald-600',
    badgeText: 'text-teal-700 dark:text-teal-300',
    cardBase: 'border-2 border-teal-200/90 dark:border-teal-800/80 bg-gradient-to-br from-white via-teal-50/30 to-emerald-50/40 text-slate-900 dark:text-slate-100 hover:border-teal-500 dark:hover:border-teal-400 hover:shadow-md hover:from-teal-50/60 hover:to-emerald-50/70 hover:-translate-y-0.5 active:translate-y-0',
    cardFlipped: 'border-2 border-teal-500 bg-gradient-to-br from-teal-100 via-cyan-50 to-emerald-100 text-teal-950 dark:text-teal-50 ring-3 ring-teal-400/40 shadow-lg scale-[1.02]',
    figureBorder: 'border-teal-100/80 dark:border-teal-900/60',
    accentBtn: 'bg-teal-600 hover:bg-teal-700 text-white',
    ruleBtn: 'border-teal-200 text-teal-800 bg-teal-50/50 hover:bg-teal-100',
    theoryBtn: 'border-emerald-200 text-emerald-800 bg-emerald-50/50 hover:bg-emerald-100',
    winBg: 'from-teal-50/80 to-white dark:from-slate-850 dark:to-slate-900 border-teal-300 dark:border-teal-800/80',
    winIcon: 'from-amber-400 to-teal-600 shadow-teal-500/30',
  },
  emerald: {
    topBarGradient: 'from-emerald-50/80 via-white to-teal-50/80 dark:bg-slate-850',
    topBarBorder: 'border-emerald-200/90 dark:border-emerald-800/80',
    iconBg: 'bg-gradient-to-br from-emerald-500 to-teal-600',
    badgeText: 'text-emerald-700 dark:text-emerald-300',
    cardBase: 'border-2 border-emerald-200/90 dark:border-emerald-800/80 bg-gradient-to-br from-white via-emerald-50/30 to-teal-50/40 text-slate-900 dark:text-slate-100 hover:border-emerald-500 dark:hover:border-emerald-400 hover:shadow-md hover:from-emerald-50/60 hover:to-teal-50/70 hover:-translate-y-0.5 active:translate-y-0',
    cardFlipped: 'border-2 border-emerald-500 bg-gradient-to-br from-emerald-100 via-green-50 to-teal-100 text-emerald-950 dark:text-emerald-50 ring-3 ring-emerald-400/40 shadow-lg scale-[1.02]',
    figureBorder: 'border-emerald-100/80 dark:border-emerald-900/60',
    accentBtn: 'bg-emerald-600 hover:bg-emerald-700 text-white',
    ruleBtn: 'border-emerald-200 text-emerald-800 bg-emerald-50/50 hover:bg-emerald-100',
    theoryBtn: 'border-teal-200 text-teal-800 bg-teal-50/50 hover:bg-teal-100',
    winBg: 'from-emerald-50/80 to-white dark:from-slate-850 dark:to-slate-900 border-emerald-300 dark:border-emerald-800/80',
    winIcon: 'from-amber-400 to-emerald-600 shadow-emerald-500/30',
  },
  pink: {
    topBarGradient: 'from-pink-50/80 via-white to-rose-50/80 dark:bg-slate-850',
    topBarBorder: 'border-pink-200/90 dark:border-pink-800/80',
    iconBg: 'bg-gradient-to-br from-pink-500 to-rose-600',
    badgeText: 'text-pink-700 dark:text-pink-300',
    cardBase: 'border-2 border-pink-200/90 dark:border-pink-800/80 bg-gradient-to-br from-white via-pink-50/30 to-rose-50/40 text-slate-900 dark:text-slate-100 hover:border-pink-500 dark:hover:border-pink-400 hover:shadow-md hover:from-pink-50/60 hover:to-rose-50/70 hover:-translate-y-0.5 active:translate-y-0',
    cardFlipped: 'border-2 border-pink-500 bg-gradient-to-br from-pink-100 via-fuchsia-50 to-rose-100 text-pink-950 dark:text-pink-50 ring-3 ring-pink-400/40 shadow-lg scale-[1.02]',
    figureBorder: 'border-pink-100/80 dark:border-pink-900/60',
    accentBtn: 'bg-pink-600 hover:bg-pink-700 text-white',
    ruleBtn: 'border-pink-200 text-pink-800 bg-pink-50/50 hover:bg-pink-100',
    theoryBtn: 'border-rose-200 text-rose-800 bg-rose-50/50 hover:bg-rose-100',
    winBg: 'from-pink-50/80 to-white dark:from-slate-850 dark:to-slate-900 border-pink-300 dark:border-pink-800/80',
    winIcon: 'from-amber-400 to-pink-600 shadow-pink-500/30',
  },
  rose: {
    topBarGradient: 'from-rose-50/80 via-white to-pink-50/80 dark:bg-slate-850',
    topBarBorder: 'border-rose-200/90 dark:border-rose-800/80',
    iconBg: 'bg-gradient-to-br from-rose-500 to-pink-600',
    badgeText: 'text-rose-700 dark:text-rose-300',
    cardBase: 'border-2 border-rose-200/90 dark:border-rose-800/80 bg-gradient-to-br from-white via-rose-50/30 to-pink-50/40 text-slate-900 dark:text-slate-100 hover:border-rose-500 dark:hover:border-rose-400 hover:shadow-md hover:from-rose-50/60 hover:to-pink-50/70 hover:-translate-y-0.5 active:translate-y-0',
    cardFlipped: 'border-2 border-rose-500 bg-gradient-to-br from-rose-100 via-red-50 to-pink-100 text-rose-950 dark:text-rose-50 ring-3 ring-rose-400/40 shadow-lg scale-[1.02]',
    figureBorder: 'border-rose-100/80 dark:border-rose-900/60',
    accentBtn: 'bg-rose-600 hover:bg-rose-700 text-white',
    ruleBtn: 'border-rose-200 text-rose-800 bg-rose-50/50 hover:bg-rose-100',
    theoryBtn: 'border-pink-200 text-pink-800 bg-pink-50/50 hover:bg-pink-100',
    winBg: 'from-rose-50/80 to-white dark:from-slate-850 dark:to-slate-900 border-rose-300 dark:border-rose-800/80',
    winIcon: 'from-amber-400 to-rose-600 shadow-rose-500/30',
  }
};

export function MatcherTemplate({
  level,
  currentLevel,
  title = 'Kártyás Párosító',
  subtitle = 'Kattints a kártyákra, és találd meg a feladvány-eredmény párokat!',
  badge,
  topicTitle,
  levels,
  levelsConfig,
  config,
  pairs,
  level1Pairs,
  level2Pairs,
  level3Pairs,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToQuiz,
  onSwitchToSorter,
  onSwitchToTheory,
  themeColor = 'amber',
  grade = 7,
  chapterId = 'gondolkodjunk',
  topicId
}: MatcherTemplateProps) {
  const { user, profile } = useAuth();
  const [cards, setCards] = useState<CardItem[]>([]);
  const [selectedCards, setSelectedCards] = useState<CardItem[]>([]);
  const [isChecking, setIsChecking] = useState(false);
  const [matchesCount, setMatchesCount] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [lastSavedScoreId, setLastSavedScoreId] = useState<string | undefined>(undefined);

  const allLevels = levels || levelsConfig;
  const rawLvl = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  const activeLevel: DifficultyLevel = (typeof rawLvl === 'number' ? rawLvl : 1) as DifficultyLevel;

  const theme = THEME_MAP[themeColor] || THEME_MAP.amber;

  // Normalize pairs from various prop formats
  const getLevelPairs = (): MatcherPair[] => {
    if (config?.pairs && config.pairs.length > 0) return config.pairs;
    if (allLevels && allLevels[activeLevel]?.pairs) return allLevels[activeLevel].pairs;
    if (activeLevel === 1 && level1Pairs && level1Pairs.length > 0) return level1Pairs;
    if (activeLevel === 2 && level2Pairs && level2Pairs.length > 0) return level2Pairs;
    if (activeLevel === 3 && level3Pairs && level3Pairs.length > 0) return level3Pairs;
    if (pairs && pairs.length > 0) return pairs;
    if (level1Pairs && level1Pairs.length > 0) return level1Pairs;
    return [];
  };

  // Initialize level cards
  const initGame = () => {
    const currentPairs: MatcherPair[] = getLevelPairs();
    const cardDeck: CardItem[] = [];

    currentPairs.forEach((pair) => {
      const promptContent = pair.prompt ?? pair.left ?? pair.question ?? pair.term ?? pair.front ?? '';
      const promptFig = pair.promptFigure ?? pair.figure;
      const valueContent = pair.value ?? pair.right ?? pair.answer ?? pair.definition ?? pair.back ?? '';
      const valFig = pair.valueFigure;

      cardDeck.push({
        id: `${pair.id}-p`,
        pairId: pair.id,
        content: promptContent,
        figure: promptFig,
        type: 'prompt',
        isFlipped: false,
        isMatched: false
      });
      cardDeck.push({
        id: `${pair.id}-v`,
        pairId: pair.id,
        content: valueContent,
        figure: valFig,
        type: 'value',
        isFlipped: false,
        isMatched: false
      });
    });

    setCards(shuffleArray(cardDeck));
    setSelectedCards([]);
    setIsChecking(false);
    setMatchesCount(0);
    setMistakes(0);
    setSeconds(0);
    setTimerActive(true);
    setIsCompleted(false);
  };

  useEffect(() => {
    initGame();
  }, [activeLevel, currentLevel, level, title, topicId]);

  // Timer tick
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (timerActive && !isCompleted) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerActive, isCompleted]);

  const handleCardClick = (clickedCard: CardItem) => {
    if (
      isChecking ||
      clickedCard.isFlipped ||
      clickedCard.isMatched ||
      selectedCards.length >= 2
    ) {
      return;
    }

    const updatedCards = cards.map((c) =>
      c.id === clickedCard.id ? { ...c, isFlipped: true } : c
    );
    setCards(updatedCards);

    const newSelected = [...selectedCards, clickedCard];
    setSelectedCards(newSelected);

    if (newSelected.length === 2) {
      setIsChecking(true);
      const [first, second] = newSelected;

      if (first.pairId === second.pairId && first.id !== second.id) {
        // MATCH!
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.pairId === first.pairId ? { ...c, isMatched: true } : c
            )
          );
          setSelectedCards([]);
          setIsChecking(false);
          setMatchesCount((prev) => {
            const updated = prev + 1;
            const currentPairs = getLevelPairs();
            if (updated === currentPairs.length) {
              handleWin();
            }
            return updated;
          });
        }, 400);
      } else {
        // MISMATCH
        setMistakes((prev) => prev + 1);
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.id === first.id || c.id === second.id
                ? { ...c, isFlipped: false }
                : c
            )
          );
          setSelectedCards([]);
          setIsChecking(false);
        }, 900);
      }
    }
  };

  const handleWin = () => {
    setTimerActive(false);
    setIsCompleted(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });

    const currentPairs = getLevelPairs();
    const currentPairsCount = currentPairs.length || 8;
    const computedTopicId = (topicId || badge || title || 'matcher').toLowerCase().replace(/[^a-z0-9-]+/g, '');
    const g = grade || 7;
    const ch = chapterId || 'gondolkodjunk';
    const displayTitle = topicTitle ? `${topicTitle} (Párosító)` : title;

    // 1. Mentés az időalapú rangsorba
    saveMatcherScore({
      userId: user?.uid || null,
      studentName: profile?.full_name || user?.displayName || 'Diák',
      userCode: profile?.user_code || undefined,
      grade: g,
      chapterId: ch,
      topicId: computedTopicId,
      topicTitle: topicTitle || title,
      level: activeLevel,
      timeSeconds: seconds,
      mistakes: mistakes,
      pairsCount: currentPairsCount
    }).then((res) => {
      if (res?.id) setLastSavedScoreId(res.id);
    }).catch((err) => console.error('Failed to save matcher score to leaderboard:', err));

    // 2. Mentés a diák profil haladásába
    if (user) {
      const calcPercentage = Math.max(50, 100 - (mistakes * 5));

      saveQuizProgress({
        userId: user.uid,
        studentName: profile?.full_name || user.displayName || 'Diák',
        studentEmail: profile?.email || user.email || '',
        userCode: profile?.user_code || '',
        grade: g,
        chapterId: ch,
        topicId: computedTopicId,
        topicTitle: topicTitle || title,
        quizId: `g${g}__${ch}__${computedTopicId}__matcher__lvl${activeLevel}`,
        gameType: 'matcher',
        level: activeLevel,
        title: displayTitle,
        percentage: calcPercentage,
        score: calcPercentage,
        scorePoints: currentPairsCount,
        totalQuestions: currentPairsCount,
        bestStreak: currentPairsCount,
        completed: true
      }).catch((err) => console.error('Failed to auto-save matcher progress:', err));
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const currentPairs = getLevelPairs();
  const totalPairs = currentPairs.length || 8;
  const currentConfig = allLevels?.[activeLevel] || config;
  const displayTitle = currentConfig?.title || title;
  const displaySubtitle = currentConfig?.description || currentConfig?.subtitle || subtitle;

  return (
    <div className="space-y-2.5 sm:space-y-3 animate-in fade-in duration-300 text-left">
      {/* Top Controls & Stats */}
      <div className={cn(
        "rounded-2xl p-2.5 sm:p-3 border-2 flex flex-wrap items-center justify-between gap-2.5 shadow-xs bg-gradient-to-r",
        theme.topBarGradient,
        theme.topBarBorder
      )}>
        <div className="flex items-center gap-2.5">
          {onBack ? (
            <Button
              variant="outline"
              size="sm"
              onClick={onBack}
              className={cn("rounded-xl h-8 px-2.5 text-xs font-bold gap-1", theme.ruleBtn)}
            >
              <ArrowLeft className="w-4 h-4 mr-0.5" />
              Vissza
            </Button>
          ) : (
            <div className={cn("w-8 h-8 rounded-xl text-white flex items-center justify-center font-bold shadow-xs", theme.iconBg)}>
              <ArrowRightLeft className="w-4 h-4" />
            </div>
          )}
          <div>
            {badge && (
              <div className={cn("text-[10px] font-black uppercase tracking-wider", theme.badgeText)}>
                {badge}
              </div>
            )}
            <div className="text-sm font-black text-slate-800 dark:text-slate-200">
              {typeof displayTitle === 'string' ? <MathText>{displayTitle}</MathText> : displayTitle} {allLevels ? `(${activeLevel}. szint)` : ''}
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
              {typeof displaySubtitle === 'string' ? <MathText>{displaySubtitle}</MathText> : displaySubtitle}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap">
          <div className="flex items-center gap-1.5 px-3 py-1 bg-white dark:bg-slate-900 rounded-xl border border-blue-200 dark:border-blue-800 text-xs font-bold text-blue-900 dark:text-blue-300 shadow-2xs">
            <Clock className="w-3.5 h-3.5 text-blue-500" />
            <span>{formatTime(seconds)}</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 bg-white dark:bg-slate-900 rounded-xl border border-emerald-200 dark:border-emerald-800 text-xs font-bold text-emerald-900 dark:text-emerald-300 shadow-2xs">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            <span>
              {matchesCount} / {totalPairs} pár
            </span>
          </div>

          {mistakes > 0 && (
            <div className="px-2.5 py-1 bg-rose-50 dark:bg-rose-950/40 border border-rose-300 dark:border-rose-800 text-rose-700 dark:text-rose-300 rounded-xl text-xs font-bold shadow-2xs">
              {mistakes} hiba
            </div>
          )}

          <Button
            variant="outline"
            size="sm"
            onClick={initGame}
            className="rounded-xl h-8 px-2.5 text-xs font-bold gap-1 border-slate-200 dark:border-slate-700 cursor-pointer hover:bg-slate-100"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-600" />
            Újra
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowLeaderboard(true)}
            className="rounded-xl h-8 px-2.5 text-xs font-bold gap-1 border-purple-300 dark:border-purple-700/60 bg-purple-50/60 dark:bg-purple-950/30 text-purple-700 dark:text-purple-300 hover:bg-purple-100 hover:border-purple-400 shadow-2xs cursor-pointer"
          >
            <Trophy className="w-3.5 h-3.5 text-purple-500" />
            Rangsor
          </Button>

          {onOpenRules && (
            <Button
              variant="outline"
              size="sm"
              onClick={onOpenRules}
              className={cn("rounded-xl h-8 px-2.5 text-xs font-bold gap-1 cursor-pointer", theme.ruleBtn)}
            >
              <BookOpen className="w-3.5 h-3.5" />
              Szabályzat
            </Button>
          )}

          {onSwitchToTheory && (
            <Button
              variant="outline"
              size="sm"
              onClick={onSwitchToTheory}
              className={cn("rounded-xl h-8 px-2.5 text-xs font-bold gap-1 cursor-pointer", theme.theoryBtn)}
            >
              <BookOpen className="w-3.5 h-3.5" />
              Tananyag
            </Button>
          )}
        </div>
      </div>

      {/* Cards Grid */}
      {!isCompleted ? (
        <div className={cn(
          "grid gap-2 sm:gap-2.5",
          cards.length <= 12
            ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
            : cards.length <= 16
            ? "grid-cols-2 sm:grid-cols-4 lg:grid-cols-4"
            : "grid-cols-2 sm:grid-cols-4 lg:grid-cols-5"
        )}>
          {cards.map((card) => {
            let cardClass = theme.cardBase;

            if (card.isMatched) {
              cardClass =
                'border-2 border-emerald-400/80 bg-gradient-to-br from-emerald-100/90 to-teal-100/90 dark:bg-emerald-950/60 text-emerald-950 dark:text-emerald-200 opacity-60 pointer-events-none scale-95 shadow-inner';
            } else if (card.isFlipped) {
              cardClass = theme.cardFlipped;
            }

            return (
              <button
                key={card.id}
                type="button"
                onClick={() => handleCardClick(card)}
                disabled={card.isMatched || isChecking}
                title={typeof card.content === 'string' ? card.content : undefined}
                className={cn(
                  'min-h-[64px] sm:min-h-[72px] lg:min-h-[76px] p-2 sm:p-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all duration-200 flex flex-col items-center justify-center text-center select-none shadow-xs relative border-2 cursor-pointer overflow-hidden',
                  cardClass
                )}
              >
                <div className="w-full h-full flex flex-col items-center justify-center relative p-0.5">
                  {card.figure ? (
                    <div className="flex flex-col items-center justify-center gap-1 w-full">
                      <div className={cn(
                        "max-h-7 sm:max-h-8 max-w-full flex items-center justify-center overflow-hidden [&>svg]:w-full [&>svg]:h-full p-0.5 rounded-md bg-white/90 dark:bg-slate-800/90 border shadow-2xs",
                        theme.figureBorder
                      )}>
                        {card.figure}
                      </div>
                      {card.content && (
                        <span className="leading-tight font-bold text-[11px] sm:text-xs break-words line-clamp-2 text-slate-800 dark:text-slate-100">
                          {typeof card.content === 'string' ? <MathText size="sm">{card.content}</MathText> : card.content}
                        </span>
                      )}
                    </div>
                  ) : (
                    <span className="leading-tight font-bold text-xs sm:text-[13px] break-words line-clamp-3 text-slate-800 dark:text-slate-100">
                      {typeof card.content === 'string' ? <MathText size="md">{card.content}</MathText> : card.content}
                    </span>
                  )}
                  {card.isMatched && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 absolute top-0.5 right-0.5" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      ) : (
        /* Completion Screen */
        <div className={cn(
          "bg-gradient-to-b border-2 rounded-3xl p-6 sm:p-8 text-center space-y-6 shadow-xl animate-in zoom-in-95 duration-300",
          theme.winBg
        )}>
          <div className={cn(
            "w-16 h-16 rounded-3xl text-white flex items-center justify-center mx-auto shadow-lg bg-gradient-to-br",
            theme.winIcon
          )}>
            <Trophy className="w-8 h-8" />
          </div>

          <div className="space-y-1.5">
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              Fantasztikus! Mind a {totalPairs} párt megtaláltad!
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Sikeresen teljesítetted a {activeLevel}. szint párosító feladatait!
            </p>
          </div>

          <div className="flex items-center justify-center gap-4 max-w-xs mx-auto">
            <div className="p-3 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 flex-1">
              <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Idő</div>
              <div className="text-lg font-black text-blue-600 dark:text-blue-400">
                {formatTime(seconds)}
              </div>
            </div>
            <div className="p-3 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 flex-1">
              <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Hibák</div>
              <div className={cn(
                "text-lg font-black",
                mistakes === 0 ? "text-emerald-600 dark:text-emerald-400" : "text-amber-600 dark:text-amber-400"
              )}>
                {mistakes}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Button
              onClick={initGame}
              variant="outline"
              className="rounded-xl h-10 px-4 font-bold border-slate-300 dark:border-slate-700 text-xs sm:text-sm cursor-pointer hover:bg-slate-100"
            >
              <RotateCcw className="w-4 h-4 mr-1.5" />
              Újra ezen a szinten
            </Button>

            <Button
              onClick={() => setShowLeaderboard(true)}
              variant="outline"
              className="rounded-xl h-10 px-4 font-bold border-purple-300 text-purple-700 bg-purple-50 hover:bg-purple-100 text-xs sm:text-sm cursor-pointer"
            >
              <Trophy className="w-4 h-4 mr-1.5 text-purple-500" />
              Ranglista Megtekintése
            </Button>

            {activeLevel < 3 && onNextLevel && (
              <Button
                onClick={onNextLevel}
                className={cn("rounded-xl h-10 px-5 font-bold shadow-md text-xs sm:text-sm cursor-pointer", theme.accentBtn)}
              >
                Következő Szint ({activeLevel + 1}. szint)
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            )}

            {onSwitchToTheory && (
              <Button
                variant="ghost"
                onClick={onSwitchToTheory}
                className={cn("rounded-xl h-10 px-4 font-bold text-xs sm:text-sm cursor-pointer", theme.badgeText)}
              >
                <BookOpen className="w-4 h-4 mr-1.5" />
                Vissza a tananyaghoz
              </Button>
            )}

            {onBack && (
              <Button
                variant="ghost"
                onClick={onBack}
                className="rounded-xl h-10 px-4 font-bold text-xs sm:text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4 mr-1.5" />
                Vissza a témakörökhöz
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Leaderboard Modal */}
      <MatcherLeaderboardModal
        isOpen={showLeaderboard}
        onClose={() => setShowLeaderboard(false)}
        topicId={(topicId || badge || title || 'matcher').toLowerCase().replace(/[^a-z0-9-]+/g, '')}
        topicTitle={topicTitle || title}
        currentLevel={activeLevel}
        grade={grade || 7}
        highlightScoreId={lastSavedScoreId}
      />
    </div>
  );
}

export default MatcherTemplate;
