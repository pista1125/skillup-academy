import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Button } from '@/components/ui/button';
import {
  RotateCcw,
  Trophy,
  CheckCircle2,
  XCircle,
  BookOpen,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Layers,
  Heart,
  Clock,
  Flame
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { DifficultyLevel } from './QuizTemplate';
import { useAuth } from '@/contexts/AuthContext';
import { saveQuizProgress } from '@/services/quizProgressService';
import { saveSorterScore, formatSorterTime } from '@/services/sorterLeaderboardService';
import { SorterLeaderboardModal } from '@/components/math/shared/SorterLeaderboardModal';
import { MathText } from '@/components/math/shared/MathText';

export interface SorterItem {
  id: string | number;
  label?: string;
  text?: string;
  content?: string;
  figure?: React.ReactNode;
  category?: string;
  categoryId?: string;
  correctCategoryId?: string;
  correctCategory?: string;
  targetCategoryId?: string;
  group?: string;
  groupId?: string;
  [key: string]: any;
}

export function getItemCategoryKey(item?: SorterItem | null): string {
  if (!item) return '';
  return String(
    item.correctCategoryId ||
    item.categoryId ||
    item.category ||
    item.correctCategory ||
    item.targetCategoryId ||
    item.groupId ||
    item.group ||
    ''
  ).trim();
}

export interface SorterCategory {
  id: string;
  name?: string;
  title?: string;
  description?: string;
  color?: string;
  badgeColor?: string;
  [key: string]: any;
}

export interface SorterLevelConfig {
  level?: number;
  title?: string;
  subtitle?: string;
  description?: string;
  categories: SorterCategory[];
  items: SorterItem[];
  [key: string]: any;
}

export interface SorterTemplateProps {
  level?: DifficultyLevel;
  currentLevel?: DifficultyLevel;
  grade?: number;
  chapterId?: string;
  topicId?: string;
  topicTitle?: string;
  title?: string;
  subtitle?: string;
  badge?: string;
  levels?: Record<DifficultyLevel, SorterLevelConfig>;
  levelsConfig?: Record<DifficultyLevel, SorterLevelConfig>;
  config?: SorterLevelConfig;
  categories?: SorterCategory[];
  items?: SorterItem[];
  level1Categories?: SorterCategory[];
  level1Items?: SorterItem[];
  level2Categories?: SorterCategory[];
  level2Items?: SorterItem[];
  level3Categories?: SorterCategory[];
  level3Items?: SorterItem[];
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onBack?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToMatcher?: () => void;
  onSwitchToTheory?: () => void;
  gameId?: string;
  themeColor?: string;
  [key: string]: any;
}

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Sound Synthesizer (Web Audio API)
function playSound(type: 'correct' | 'wrong' | 'win') {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();

    if (type === 'correct') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
      osc.frequency.exponentialRampToValueAtTime(659.25, ctx.currentTime + 0.12); // E5
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.25);
    } else if (type === 'wrong') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(220, ctx.currentTime); // A3
      osc.frequency.linearRampToValueAtTime(164.81, ctx.currentTime + 0.2); // E3
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.25);
    } else if (type === 'win') {
      const notes = [440, 554.37, 659.25, 880];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0.12, ctx.currentTime + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.08 + 0.3);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.08);
        osc.stop(ctx.currentTime + idx * 0.08 + 0.35);
      });
    }
  } catch (e) {
    // AudioContext not supported
  }
}

const THEME_STYLES: Record<string, {
  headerBg: string;
  headerBorder: string;
  iconBg: string;
  badgeBg: string;
  badgeText: string;
}> = {
  blue: {
    headerBg: 'from-blue-50/90 via-white to-indigo-50/90 dark:bg-slate-850',
    headerBorder: 'border-blue-200/90 dark:border-blue-800/80',
    iconBg: 'bg-gradient-to-br from-blue-500 to-indigo-600',
    badgeBg: 'bg-blue-100 dark:bg-blue-950/80 border-blue-300',
    badgeText: 'text-blue-700 dark:text-blue-300'
  },
  emerald: {
    headerBg: 'from-emerald-50/90 via-white to-teal-50/90 dark:bg-slate-850',
    headerBorder: 'border-emerald-200/90 dark:border-emerald-800/80',
    iconBg: 'bg-gradient-to-br from-emerald-500 to-teal-600',
    badgeBg: 'bg-emerald-100 dark:bg-emerald-950/80 border-emerald-300',
    badgeText: 'text-emerald-700 dark:text-emerald-300'
  },
  teal: {
    headerBg: 'from-teal-50/90 via-white to-cyan-50/90 dark:bg-slate-850',
    headerBorder: 'border-teal-200/90 dark:border-teal-800/80',
    iconBg: 'bg-gradient-to-br from-teal-500 to-emerald-600',
    badgeBg: 'bg-teal-100 dark:bg-teal-950/80 border-teal-300',
    badgeText: 'text-teal-700 dark:text-teal-300'
  },
  indigo: {
    headerBg: 'from-indigo-50/90 via-white to-purple-50/90 dark:bg-slate-850',
    headerBorder: 'border-indigo-200/90 dark:border-indigo-800/80',
    iconBg: 'bg-gradient-to-br from-indigo-500 to-purple-600',
    badgeBg: 'bg-indigo-100 dark:bg-indigo-950/80 border-indigo-300',
    badgeText: 'text-indigo-700 dark:text-indigo-300'
  },
  purple: {
    headerBg: 'from-purple-50/90 via-white to-indigo-50/90 dark:bg-slate-850',
    headerBorder: 'border-purple-200/90 dark:border-purple-800/80',
    iconBg: 'bg-gradient-to-br from-purple-500 to-indigo-600',
    badgeBg: 'bg-purple-100 dark:bg-purple-950/80 border-purple-300',
    badgeText: 'text-purple-700 dark:text-purple-300'
  },
  amber: {
    headerBg: 'from-amber-50/90 via-white to-orange-50/90 dark:bg-slate-850',
    headerBorder: 'border-amber-200/90 dark:border-amber-800/80',
    iconBg: 'bg-gradient-to-br from-amber-500 to-orange-600',
    badgeBg: 'bg-amber-100 dark:bg-amber-950/80 border-amber-300',
    badgeText: 'text-amber-700 dark:text-amber-300'
  }
};

export function SorterTemplate({
  level,
  currentLevel,
  title = 'Racionális Számok és Algebra – Csoportosító',
  subtitle = 'Válaszd ki a kártyát, majd kattints a megfelelő kategóriára!',
  badge,
  topicTitle,
  levels,
  levelsConfig,
  config,
  categories,
  items,
  level1Categories,
  level1Items,
  level2Categories,
  level2Items,
  level3Categories,
  level3Items,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToQuiz,
  onSwitchToMatcher,
  onSwitchToTheory,
  grade = 7,
  chapterId = 'racionalis-szamok-algebra',
  topicId = 'g7-rational-sorter',
  themeColor = 'blue'
}: SorterTemplateProps) {
  const { user, profile } = useAuth();

  const allLevels = levels || levelsConfig;
  const rawLvl = currentLevel ?? (typeof level === 'number' ? level : ((level as any)?.level ?? 1));
  const activeLevel: DifficultyLevel = (typeof rawLvl === 'number' ? rawLvl : 1) as DifficultyLevel;

  // Level config normalization
  const getLevelConfig = (): SorterLevelConfig => {
    if (config?.categories && config?.items) return config;
    if (allLevels && allLevels[activeLevel]) return allLevels[activeLevel];
    if (activeLevel === 1 && level1Categories && level1Items) {
      return { categories: level1Categories, items: level1Items };
    }
    if (activeLevel === 2 && level2Categories && level2Items) {
      return { categories: level2Categories, items: level2Items };
    }
    if (activeLevel === 3 && level3Categories && level3Items) {
      return { categories: level3Categories, items: level3Items };
    }
    if (categories && items) return { categories, items };
    if (level1Categories && level1Items) return { categories: level1Categories, items: level1Items };
    return { categories: [], items: [] };
  };

  const currentConfig = getLevelConfig();

  // Core Game State
  const [unassignedItems, setUnassignedItems] = useState<SorterItem[]>([]);
  const [categorizedItems, setCategorizedItems] = useState<Record<string, SorterItem[]>>({});
  const [selectedItem, setSelectedItem] = useState<SorterItem | null>(null);

  // Gamification: Hearts, Timer, Combo, Score, Stars
  const [hearts, setHearts] = useState<number>(3);
  const [mistakes, setMistakes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);
  const [timerActive, setTimerActive] = useState<boolean>(true);
  const [combo, setCombo] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [shakingItemId, setShakingItemId] = useState<string | number | null>(null);
  const [feedbackToast, setFeedbackToast] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  // Modals & Final Screens
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState<boolean>(false);
  const [lastSavedScoreId, setLastSavedScoreId] = useState<string | undefined>(undefined);
  const [earnedStars, setEarnedStars] = useState<number>(3);
  const [finalScore, setFinalScore] = useState<number>(0);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize game on level change
  const initGame = () => {
    const activeCfg = getLevelConfig();
    if (!activeCfg || !activeCfg.categories) return;

    const normalizedItems: SorterItem[] = (activeCfg.items || []).map((it) => {
      const catKey = getItemCategoryKey(it);
      return {
        ...it,
        id: it.id,
        label: it.label || it.content || it.text || '',
        category: catKey,
        categoryId: catKey,
        correctCategoryId: catKey,
        correctCategory: catKey
      };
    });

    setUnassignedItems(shuffleArray(normalizedItems));
    const initialBuckets: Record<string, SorterItem[]> = {};
    activeCfg.categories.forEach((cat) => {
      initialBuckets[cat.id] = [];
    });
    setCategorizedItems(initialBuckets);
    setSelectedItem(null);
    setHearts(3);
    setMistakes(0);
    setSeconds(0);
    setScore(0);
    setCombo(0);
    setTimerActive(true);
    setIsCompleted(false);
    setIsGameOver(false);
    setFeedbackToast(null);
  };

  useEffect(() => {
    initGame();
  }, [activeLevel, currentLevel, topicId, title]);

  // Stopwatch timer
  useEffect(() => {
    if (timerActive && !isCompleted && !isGameOver) {
      timerRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [timerActive, isCompleted, isGameOver]);

  // Instant Feedback Handler: Assign item to category
  const handleAssignToCategory = (targetCategoryId: string) => {
    if (!selectedItem || isCompleted || isGameOver) return;

    const item = selectedItem;
    const itemCatKey = getItemCategoryKey(item);
    const targetCatObj = currentConfig.categories.find((c) => c.id === targetCategoryId);

    const isCorrect =
      Boolean(itemCatKey) &&
      (itemCatKey === targetCategoryId ||
       (targetCatObj?.id && itemCatKey.toLowerCase() === targetCatObj.id.toLowerCase()) ||
       (targetCatObj?.name && itemCatKey.toLowerCase() === targetCatObj.name.toLowerCase()) ||
       (targetCatObj?.title && itemCatKey.toLowerCase() === targetCatObj.title.toLowerCase()));

    if (isCorrect) {
      // SUCCESS!
      playSound('correct');
      const nextCombo = combo + 1;
      setCombo(nextCombo);
      const pointsGained = 100 + nextCombo * 10;
      setScore((prev) => prev + pointsGained);

      // Move into category bucket
      setCategorizedItems((prev) => ({
        ...prev,
        [targetCategoryId]: [...(prev[targetCategoryId] || []), item]
      }));

      // Remove from unassigned
      const remainingUnassigned = unassignedItems.filter((it) => it.id !== item.id);
      setUnassignedItems(remainingUnassigned);
      setSelectedItem(null);

      setFeedbackToast({
        text: nextCombo > 1 ? `+${pointsGained} pont! 🔥 ${nextCombo}x Combo!` : `+${pointsGained} pont! Helyes! ✓`,
        type: 'success'
      });
      setTimeout(() => setFeedbackToast(null), 1200);

      // Check if this was the last item!
      if (remainingUnassigned.length === 0) {
        handleLevelComplete(score + pointsGained, hearts, seconds);
      }
    } else {
      // MISTAKE!
      playSound('wrong');
      setCombo(0);
      setMistakes((prev) => prev + 1);
      const newHearts = hearts - 1;
      setHearts(newHearts);

      setShakingItemId(item.id);
      setTimeout(() => setShakingItemId(null), 600);

      setFeedbackToast({
        text: 'Nem jó csoport! 💔 (-1 élet)',
        type: 'error'
      });
      setTimeout(() => setFeedbackToast(null), 1200);

      if (newHearts <= 0) {
        handleGameOver(score, seconds);
      }
    }
  };

  // Game Over Logic
  const handleGameOver = (accumulatedScore: number, timeSecs: number) => {
    setTimerActive(false);
    setIsGameOver(true);

    const totalCount = currentConfig.items?.length || 12;
    const currentSortedCount = totalCount - unassignedItems.length;
    const partialPct = Math.round((currentSortedCount / totalCount) * 100);

    const computedTopicId = (topicId || 'sorter').toLowerCase().replace(/[^a-z0-9-]+/g, '');
    const g = grade || 7;
    const ch = chapterId || 'racionalis-szamok-algebra';
    const displayTitle = topicTitle ? `${topicTitle} (Csoportosító)` : title;

    // 1. Mentés a Ranglistába (sorter_leaderboard)
    saveSorterScore({
      userId: user?.uid || null,
      studentName: profile?.full_name || user?.displayName || 'Diák',
      userCode: profile?.user_code || undefined,
      grade: g,
      chapterId: ch,
      topicId: computedTopicId,
      topicTitle: displayTitle,
      level: activeLevel,
      timeSeconds: timeSecs,
      mistakes: Math.max(mistakes + 1, 3),
      heartsRemaining: 0,
      stars: 0,
      score: accumulatedScore,
      itemsCount: totalCount,
      sortedItemsCount: currentSortedCount,
      isGameOver: true
    }).then((res) => {
      if (res?.id) setLastSavedScoreId(res.id);
    }).catch((err) => console.error('Failed to save game-over score to leaderboard:', err));

    // 2. Mentés a diák profiljába részeredményként
    if (user) {
      saveQuizProgress({
        userId: user.uid,
        studentName: profile?.full_name || user.displayName || 'Diák',
        studentEmail: profile?.email || user.email || '',
        userCode: profile?.user_code || '',
        grade: g,
        chapterId: ch,
        topicId: computedTopicId,
        topicTitle: displayTitle,
        quizId: `g${g}__${ch}__${computedTopicId}__sorter__lvl${activeLevel}`,
        gameType: 'sorter',
        level: activeLevel,
        title: displayTitle,
        percentage: partialPct,
        score: accumulatedScore,
        scorePoints: currentSortedCount,
        totalQuestions: totalCount,
        bestStreak: combo,
        completed: false
      }).catch((err) => console.error('Failed to save game-over progress to profile:', err));
    }
  };

  // Level Complete Logic
  const handleLevelComplete = (currentScore: number, remainingHearts: number, timeSecs: number) => {
    setTimerActive(false);
    setIsCompleted(true);
    playSound('win');

    confetti({
      particleCount: 90,
      spread: 75,
      origin: { y: 0.6 }
    });

    const stars = remainingHearts === 3 ? 3 : remainingHearts === 2 ? 2 : 1;
    setEarnedStars(stars);

    const heartBonus = remainingHearts * 400;
    const timeBonus = Math.max(0, 800 - timeSecs * 8);
    const totalLevelScore = currentScore + heartBonus + timeBonus;
    setFinalScore(totalLevelScore);

    const computedTopicId = (topicId || 'sorter').toLowerCase().replace(/[^a-z0-9-]+/g, '');
    const g = grade || 7;
    const ch = chapterId || 'racionalis-szamok-algebra';
    const displayTitle = topicTitle ? `${topicTitle} (Csoportosító)` : title;
    const totalItemsCount = currentConfig.items?.length || 12;

    // 1. Mentés a Ranglistába
    saveSorterScore({
      userId: user?.uid || null,
      studentName: profile?.full_name || user?.displayName || 'Diák',
      userCode: profile?.user_code || undefined,
      grade: g,
      chapterId: ch,
      topicId: computedTopicId,
      topicTitle: displayTitle,
      level: activeLevel,
      timeSeconds: timeSecs,
      mistakes: mistakes,
      heartsRemaining: remainingHearts,
      stars: stars,
      score: totalLevelScore,
      itemsCount: totalItemsCount,
      sortedItemsCount: totalItemsCount,
      isGameOver: false
    }).then((res) => {
      if (res?.id) setLastSavedScoreId(res.id);
    }).catch((err) => console.error('Failed to save sorter score:', err));

    // 2. Mentés a diák profiljába
    if (user) {
      saveQuizProgress({
        userId: user.uid,
        studentName: profile?.full_name || user.displayName || 'Diák',
        studentEmail: profile?.email || user.email || '',
        userCode: profile?.user_code || '',
        grade: g,
        chapterId: ch,
        topicId: computedTopicId,
        topicTitle: displayTitle,
        quizId: `g${g}__${ch}__${computedTopicId}__sorter__lvl${activeLevel}`,
        gameType: 'sorter',
        level: activeLevel,
        title: displayTitle,
        percentage: 100,
        score: totalLevelScore,
        scorePoints: totalItemsCount,
        totalQuestions: totalItemsCount,
        bestStreak: totalItemsCount,
        completed: true
      }).catch((err) => console.error('Failed to save sorter progress to profile:', err));
    }
  };

  if (!currentConfig || !currentConfig.categories || currentConfig.categories.length === 0) return null;

  const currentTitle = currentConfig?.title || title;
  const currentSubtitle = currentConfig?.description || currentConfig?.subtitle || subtitle;
  const totalItemsCount = (currentConfig.items || []).length || 12;
  const sortedCount = totalItemsCount - unassignedItems.length;

  const currentTheme = THEME_STYLES[themeColor] || THEME_STYLES.blue;

  const categoryThemes = [
    {
      border: 'border-blue-300 dark:border-blue-800',
      bg: 'bg-gradient-to-b from-blue-50/70 via-white to-blue-50/20 dark:from-blue-950/30 dark:via-slate-900 dark:to-slate-900',
      badge: 'bg-blue-600 text-white shadow-2xs',
      dropZone: 'bg-blue-50/70 dark:bg-blue-950/40 border-blue-200/80 dark:border-blue-900/60',
      btnActive: 'bg-blue-600 hover:bg-blue-700 text-white'
    },
    {
      border: 'border-emerald-300 dark:border-emerald-800',
      bg: 'bg-gradient-to-b from-emerald-50/70 via-white to-emerald-50/20 dark:from-emerald-950/30 dark:via-slate-900 dark:to-slate-900',
      badge: 'bg-emerald-600 text-white shadow-2xs',
      dropZone: 'bg-emerald-50/70 dark:bg-emerald-950/40 border-emerald-200/80 dark:border-emerald-900/60',
      btnActive: 'bg-emerald-600 hover:bg-emerald-700 text-white'
    },
    {
      border: 'border-purple-300 dark:border-purple-800',
      bg: 'bg-gradient-to-b from-purple-50/70 via-white to-purple-50/20 dark:from-purple-950/30 dark:via-slate-900 dark:to-slate-900',
      badge: 'bg-purple-600 text-white shadow-2xs',
      dropZone: 'bg-purple-50/70 dark:bg-purple-950/40 border-purple-200/80 dark:border-purple-900/60',
      btnActive: 'bg-purple-600 hover:bg-purple-700 text-white'
    },
    {
      border: 'border-amber-300 dark:border-amber-800',
      bg: 'bg-gradient-to-b from-amber-50/70 via-white to-amber-50/20 dark:from-amber-950/30 dark:via-slate-900 dark:to-slate-900',
      badge: 'bg-amber-600 text-white shadow-2xs',
      dropZone: 'bg-amber-50/70 dark:bg-amber-950/40 border-amber-200/80 dark:border-amber-900/60',
      btnActive: 'bg-amber-600 hover:bg-amber-700 text-white'
    },
    {
      border: 'border-teal-300 dark:border-teal-800',
      bg: 'bg-gradient-to-b from-teal-50/70 via-white to-teal-50/20 dark:from-teal-950/30 dark:via-slate-900 dark:to-slate-900',
      badge: 'bg-teal-600 text-white shadow-2xs',
      dropZone: 'bg-teal-50/70 dark:bg-teal-950/40 border-teal-200/80 dark:border-teal-900/60',
      btnActive: 'bg-teal-600 hover:bg-teal-700 text-white'
    }
  ];

  return (
    <div className="space-y-3 animate-in fade-in duration-300 text-left relative">
      {/* Top Header Bar */}
      <div className={cn(
        "rounded-2xl p-2.5 sm:p-3 border-2 flex flex-wrap items-center justify-between gap-2.5 shadow-xs bg-gradient-to-r",
        currentTheme.headerBg,
        currentTheme.headerBorder
      )}>
        <div className="flex items-center gap-2.5">
          {onBack ? (
            <Button
              variant="outline"
              size="sm"
              onClick={onBack}
              className="rounded-xl h-8 px-2.5 text-xs font-bold gap-1 border-slate-300 dark:border-slate-700 hover:bg-slate-100 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 mr-0.5 text-slate-700" />
              Vissza
            </Button>
          ) : (
            <div className={cn("w-8 h-8 rounded-xl text-white flex items-center justify-center font-bold shadow-xs", currentTheme.iconBg)}>
              <Layers className="w-4 h-4" />
            </div>
          )}

          <div>
            <div className="text-sm font-black text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
              <span>{typeof currentTitle === 'string' ? <MathText>{currentTitle}</MathText> : currentTitle}</span>
              <span className={cn("text-[11px] font-bold px-2 py-0.5 rounded-full border", currentTheme.badgeBg, currentTheme.badgeText)}>
                {activeLevel}. szint
              </span>
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
              {typeof currentSubtitle === 'string' ? <MathText>{currentSubtitle}</MathText> : currentSubtitle}
            </div>
          </div>
        </div>

        {/* Gamification Stats: Hearts, Timer, Score, Leaderboard */}
        <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap">
          {/* Hearts (3 Élet) */}
          <div className="flex items-center gap-1 bg-white dark:bg-slate-900 border border-rose-200 dark:border-rose-900/60 px-2.5 py-1 rounded-xl shadow-2xs">
            <span className="text-[10px] font-bold text-slate-400 uppercase mr-0.5">Élet:</span>
            {Array.from({ length: 3 }).map((_, i) => (
              <Heart
                key={i}
                className={cn(
                  "w-4 h-4 transition-all duration-300",
                  i < hearts
                    ? "fill-rose-500 text-rose-500 scale-100"
                    : "fill-slate-200 text-slate-300 dark:fill-slate-800 dark:text-slate-700 scale-90 opacity-40"
                )}
              />
            ))}
          </div>

          {/* Stopwatch */}
          <div className="flex items-center gap-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-2.5 py-1 rounded-xl text-xs font-mono font-bold text-slate-700 dark:text-slate-300 shadow-2xs">
            <Clock className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>{formatSorterTime(seconds)}</span>
          </div>

          {/* Realtime Score & Combo */}
          <div className="flex items-center gap-1.5 bg-gradient-to-r from-blue-100/70 to-indigo-100/70 dark:from-blue-950/50 dark:to-indigo-950/50 border border-blue-300/80 dark:border-blue-800 px-2.5 py-1 rounded-xl text-xs font-black text-blue-950 dark:text-blue-200 shadow-2xs">
            <span>{score} pt</span>
            {combo > 1 && (
              <span className="flex items-center gap-0.5 text-[10px] text-amber-600 dark:text-amber-400 animate-pulse">
                <Flame className="w-3 h-3 fill-amber-500 text-amber-500" />
                {combo}x
              </span>
            )}
          </div>

          {/* Leaderboard Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsLeaderboardOpen(true)}
            className="rounded-xl h-8 px-2.5 text-xs font-bold gap-1 border-amber-200 bg-amber-50/50 text-amber-800 dark:text-amber-300 hover:bg-amber-100 cursor-pointer shadow-2xs"
          >
            <Trophy className="w-3.5 h-3.5 text-amber-500" />
            <span className="hidden sm:inline">Ranglista</span>
          </Button>

          {/* Restart */}
          <Button
            variant="outline"
            size="sm"
            onClick={initGame}
            className="rounded-xl h-8 px-2.5 text-xs font-bold gap-1 border-slate-200 dark:border-slate-700 cursor-pointer hover:bg-slate-100"
            title="Szint újraindítása"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-600" />
          </Button>

          {onSwitchToTheory && (
            <Button
              variant="outline"
              size="sm"
              onClick={onSwitchToTheory}
              className="rounded-xl h-8 px-2.5 text-xs font-bold gap-1 border-blue-200 text-blue-800 bg-blue-50/50 hover:bg-blue-100 cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5 text-blue-600" />
              Tananyag
            </Button>
          )}
        </div>
      </div>

      {/* Floating Feedback Toast */}
      {feedbackToast && (
        <div
          className={cn(
            "fixed top-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-2xl font-black text-sm shadow-xl flex items-center gap-2 animate-in zoom-in-95 duration-200",
            feedbackToast.type === 'success'
              ? "bg-emerald-600 text-white shadow-emerald-500/30"
              : "bg-rose-600 text-white shadow-rose-500/30"
          )}
        >
          {feedbackToast.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4" />
          ) : (
            <XCircle className="w-4 h-4" />
          )}
          <span>{feedbackToast.text}</span>
        </div>
      )}

      {/* Progress Bar */}
      <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden border border-slate-200 dark:border-slate-700">
        <div
          className="bg-gradient-to-r from-blue-500 to-indigo-600 h-full transition-all duration-300 rounded-full"
          style={{ width: `${Math.round((sortedCount / totalItemsCount) * 100)}%` }}
        />
      </div>

      {/* Active Game Layout */}
      {!isCompleted && !isGameOver && (
        <>
          {/* Unassigned Items Pool */}
          {unassignedItems.length > 0 && (
            <div className="bg-gradient-to-b from-blue-50/40 via-white to-indigo-50/30 dark:bg-slate-900 rounded-2xl p-3 border-2 border-dashed border-blue-300 dark:border-blue-800 shadow-xs space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400 px-1">
                <span className="flex items-center gap-2">
                  <span className="text-blue-950 dark:text-blue-200 font-extrabold text-xs">
                    1. Kattints egy kártyára a kiválasztáshoz:
                  </span>
                  <span className="text-[10px] font-black text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-950/80 px-2 py-0.5 rounded-full border border-blue-300">
                    {unassignedItems.length} db maradt
                  </span>
                </span>
                {selectedItem ? (
                  <span className="text-blue-600 dark:text-blue-400 font-bold animate-pulse text-xs">
                    👉 2. Most kattints arra a csoportra, ahová tartozik!
                  </span>
                ) : (
                  <span className="text-[11px] text-slate-400">Vigyázz: hibás választásnál elveszítesz egy életet!</span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-2.5">
                {unassignedItems.map((item) => {
                  const isSelected = selectedItem?.id === item.id;
                  const isShaking = shakingItemId === item.id;
                  const labelText = item.label || item.content || item.text;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setSelectedItem(isSelected ? null : item)}
                      title={typeof labelText === 'string' ? labelText : undefined}
                      className={cn(
                        'p-2 rounded-xl text-left transition-all border-2 shadow-xs cursor-pointer flex items-center gap-2.5 min-h-[48px] select-none',
                        isShaking && 'animate-shake bg-rose-100 border-rose-500 text-rose-950',
                        isSelected
                          ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-blue-700 shadow-md scale-[1.02] ring-4 ring-blue-300 dark:ring-blue-800'
                          : 'bg-white dark:bg-slate-800 border-blue-200 dark:border-blue-800/80 text-slate-900 dark:text-slate-100 hover:border-blue-500 hover:bg-blue-50/50 hover:shadow-sm'
                      )}
                    >
                      {item.figure && (
                        <div className={cn(
                          'w-14 h-8 sm:w-16 sm:h-9 shrink-0 overflow-hidden flex items-center justify-center rounded-lg border transition-colors [&>svg]:w-full [&>svg]:h-full p-0.5 shadow-2xs',
                          isSelected
                            ? 'bg-white text-slate-900 border-blue-300 shadow-xs'
                            : 'bg-white dark:bg-slate-900/90 border-slate-200 dark:border-slate-750'
                        )}>
                          {item.figure}
                        </div>
                      )}
                      {labelText && (
                        <span className="font-bold text-xs sm:text-[13px] leading-snug line-clamp-2 flex-1">
                          {typeof labelText === 'string' ? <MathText size="sm">{labelText}</MathText> : labelText}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Category Drop Buckets */}
          <div className={cn(
            'grid gap-2.5 sm:gap-3',
            currentConfig.categories.length === 4
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
              : currentConfig.categories.length === 2
              ? 'grid-cols-1 sm:grid-cols-2'
              : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3'
          )}>
            {currentConfig.categories.map((cat, catIdx) => {
              const itemsInCat = categorizedItems[cat.id] || [];
              const catName = cat.name || cat.title || '';
              const theme = categoryThemes[catIdx % categoryThemes.length];

              return (
                <div
                  key={cat.id}
                  onClick={() => {
                    if (selectedItem) {
                      handleAssignToCategory(cat.id);
                    }
                  }}
                  className={cn(
                    'rounded-2xl p-3 border-2 transition-all flex flex-col justify-between min-h-[140px] select-none',
                    theme.border,
                    theme.bg,
                    selectedItem
                      ? 'cursor-pointer shadow-md ring-4 ring-blue-400/80 dark:ring-blue-750/80 scale-[1.01] hover:border-blue-600'
                      : 'shadow-xs'
                  )}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-1.5">
                      <span className={cn(
                        'px-2.5 py-0.5 rounded-lg text-[10px] sm:text-[11px] font-black uppercase tracking-wider border leading-tight',
                        cat.badgeColor || theme.badge
                      )}>
                        {typeof catName === 'string' ? <MathText size="sm">{catName}</MathText> : catName}
                      </span>
                      <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 shrink-0">
                        {itemsInCat.length} elem
                      </span>
                    </div>

                    {cat.description && (
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-1 font-medium">
                        {typeof cat.description === 'string' ? <MathText>{cat.description}</MathText> : cat.description}
                      </p>
                    )}

                    {/* Placed Items in Category */}
                    <div className={cn(
                      "flex flex-wrap gap-1.5 min-h-[55px] p-2 rounded-xl border transition-all",
                      theme.dropZone
                    )}>
                      {itemsInCat.length === 0 ? (
                        <div className="w-full flex items-center justify-center text-[11px] text-slate-400 font-medium py-3">
                          {selectedItem ? '👉 Kattints ide a besoroláshoz' : 'Üres csoport'}
                        </div>
                      ) : (
                        itemsInCat.map((item) => {
                          const itemText = item.label || item.content || item.text;
                          return (
                            <div
                              key={item.id}
                              className="px-2.5 py-1 rounded-lg text-xs font-bold border-2 bg-emerald-50 dark:bg-emerald-950/60 border-emerald-400 text-emerald-950 dark:text-emerald-200 flex items-center gap-1.5 shadow-2xs animate-in zoom-in-95 duration-150"
                            >
                              {item.figure && (
                                <div className="w-8 h-5 shrink-0 overflow-hidden flex items-center justify-center bg-white dark:bg-slate-900 rounded border border-emerald-200 [&>svg]:w-full [&>svg]:h-full p-0.5">
                                  {item.figure}
                                </div>
                              )}
                              <span className="line-clamp-1 max-w-[140px] sm:max-w-[170px]">
                                {typeof itemText === 'string' ? <MathText size="sm">{itemText}</MathText> : itemText}
                              </span>
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 ml-0.5" />
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>

                  {selectedItem && (
                    <div className="pt-2 text-center border-t border-blue-200/60 dark:border-blue-900/40">
                      <Button
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAssignToCategory(cat.id);
                        }}
                        className={cn(
                          "w-full rounded-xl h-7 text-[11px] font-black shadow-xs cursor-pointer",
                          theme.btnActive
                        )}
                      >
                        + Ide sorolom be
                      </Button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* GAME OVER SCREEN */}
      {isGameOver && (
        <div className="bg-gradient-to-b from-rose-50 via-white to-rose-50 dark:from-slate-900 dark:to-slate-850 border-2 border-rose-300 dark:border-rose-900 rounded-3xl p-6 sm:p-8 text-center space-y-5 shadow-xl animate-in zoom-in-95 duration-200">
          <div className="w-16 h-16 rounded-3xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto shadow-inner">
            <Heart className="w-8 h-8 fill-rose-500 text-rose-500 animate-pulse" />
          </div>

          <div className="space-y-1">
            <h3 className="text-xl sm:text-2xl font-black text-rose-950 dark:text-rose-200">
              Elfogyott mind a 3 életed!
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto">
              Semmi baj! A matematikai csoportosításban a hibákból tanulunk a legtöbbet. Nézd át a szabályokat és fuss neki újra!
            </p>
          </div>

          {/* Részeredmény és Jóváírt pontok kártya */}
          <div className="max-w-md mx-auto p-4 rounded-2xl bg-gradient-to-r from-amber-50 to-emerald-50 dark:from-amber-950/40 dark:to-emerald-950/40 border-2 border-emerald-300 dark:border-emerald-800 shadow-sm space-y-2 text-left">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-xs font-black text-emerald-800 dark:text-emerald-300">
                <Sparkles className="w-4 h-4 text-amber-500 fill-amber-500" />
                A befektetett munkád megmaradt!
              </span>
              <span className="text-xs font-black font-mono text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/60 px-2.5 py-0.5 rounded-full border border-emerald-300">
                +{score} pont mentve 🌟
              </span>
            </div>
            <p className="text-[11.5px] text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
              Sikeresen besoroltál <strong>{sortedCount} / {totalItemsCount} elemet ({Math.round((sortedCount / totalItemsCount) * 100)}%)</strong>. Az elért pontjaidat jóváírtuk a profilodban és a Ranglistára is felkerültél! Fuss neki újra a 100%-os szintteljesítésért!
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-w-md mx-auto">
            <div className="p-3 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
              <div className="text-[10px] font-bold text-slate-400 uppercase">Besorolt elemek</div>
              <div className="text-base sm:text-lg font-black text-slate-900 dark:text-white font-mono mt-0.5">
                {sortedCount} / {totalItemsCount}
              </div>
            </div>

            <div className="p-3 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
              <div className="text-[10px] font-bold text-slate-400 uppercase">Megszerzett pont</div>
              <div className="text-base sm:text-lg font-black text-blue-600 dark:text-blue-400 font-mono mt-0.5">
                {score} pt
              </div>
            </div>

            <div className="p-3 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 col-span-2 sm:col-span-1">
              <div className="text-[10px] font-bold text-slate-400 uppercase">Eltelt idő</div>
              <div className="text-base sm:text-lg font-black text-slate-900 dark:text-white font-mono mt-0.5">
                {formatSorterTime(seconds)}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Button
              onClick={initGame}
              className="rounded-xl px-5 h-10 font-black bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white shadow-md shadow-rose-500/25 text-xs sm:text-sm cursor-pointer"
            >
              <RotateCcw className="w-4 h-4 mr-1.5" />
              Újrapróbálkozás (3 új élet)
            </Button>

            <Button
              variant="outline"
              onClick={() => {
                if (onSwitchToTheory) onSwitchToTheory();
                else if (onOpenRules) onOpenRules();
                else if (onBack) onBack();
                else initGame();
              }}
              className="rounded-xl px-4 h-10 font-bold border-slate-300 dark:border-slate-700 text-xs sm:text-sm cursor-pointer hover:bg-slate-100"
            >
              <BookOpen className="w-4 h-4 mr-1.5 text-purple-600" />
              Szabályok átismétlése
            </Button>

            <Button
              variant="outline"
              onClick={() => setIsLeaderboardOpen(true)}
              className="rounded-xl px-4 h-10 font-bold border-amber-200 bg-amber-50/50 text-amber-800 dark:text-amber-300 text-xs sm:text-sm cursor-pointer hover:bg-amber-100"
            >
              <Trophy className="w-4 h-4 mr-1.5 text-amber-500" />
              Ranglista
            </Button>
          </div>
        </div>
      )}

      {/* LEVEL COMPLETE SCREEN */}
      {isCompleted && (
        <div className="bg-gradient-to-b from-blue-50 via-white to-indigo-50 dark:from-slate-900 dark:to-slate-850 border-2 border-blue-300 dark:border-blue-800 rounded-3xl p-6 sm:p-8 text-center space-y-5 shadow-xl animate-in zoom-in-95 duration-200">
          <div className="w-16 h-16 rounded-3xl bg-blue-100 text-blue-600 flex items-center justify-center mx-auto shadow-inner">
            <Trophy className="w-8 h-8 text-amber-500 animate-bounce" />
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-center gap-1.5 mb-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <span
                  key={i}
                  className={cn(
                    "text-2xl transition-all duration-300",
                    i < earnedStars ? "scale-110 drop-shadow-sm" : "opacity-30 grayscale"
                  )}
                >
                  ⭐
                </span>
              ))}
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-blue-950 dark:text-blue-200">
              Szint Sikeresen Teljesítve!
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto">
              Kiváló munka! Minden elemet pontosan a megfelelő kategóriába rendeztél.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-w-lg mx-auto">
            <div className="p-3 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
              <div className="text-[10px] font-bold text-slate-400 uppercase">Besorolt kártyák</div>
              <div className="text-base sm:text-lg font-black text-blue-600 dark:text-blue-400 font-mono mt-0.5">
                {totalItemsCount} / {totalItemsCount}
              </div>
            </div>

            <div className="p-3 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
              <div className="text-[10px] font-bold text-slate-400 uppercase">Idő</div>
              <div className="text-base sm:text-lg font-black text-slate-800 dark:text-slate-200 font-mono mt-0.5">
                {formatSorterTime(seconds)}
              </div>
            </div>

            <div className="p-3 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
              <div className="text-[10px] font-bold text-slate-400 uppercase">Megmaradt élet</div>
              <div className="flex items-center justify-center gap-0.5 mt-1">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Heart
                    key={i}
                    className={cn(
                      "w-4 h-4",
                      i < hearts ? "fill-rose-500 text-rose-500" : "fill-slate-200 text-slate-300 dark:fill-slate-700"
                    )}
                  />
                ))}
              </div>
            </div>

            <div className="p-3 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
              <div className="text-[10px] font-bold text-slate-400 uppercase">Összpontszám</div>
              <div className="text-base sm:text-lg font-black text-blue-600 dark:text-blue-400 font-mono mt-0.5">
                {finalScore} pt
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Button
              onClick={() => setIsLeaderboardOpen(true)}
              className="rounded-xl px-5 h-10 font-bold bg-amber-500 hover:bg-amber-600 text-white shadow-md shadow-amber-500/20 text-xs sm:text-sm cursor-pointer"
            >
              <Trophy className="w-4 h-4 mr-1.5" />
              Ranglista Megtekintése
            </Button>

            {onNextLevel && (
              <Button
                onClick={onNextLevel}
                className="rounded-xl px-5 h-10 font-black bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-md shadow-blue-500/25 text-xs sm:text-sm cursor-pointer"
              >
                Következő Szint
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            )}

            <Button
              onClick={initGame}
              variant="outline"
              className="rounded-xl px-4 h-10 font-bold border-slate-300 dark:border-slate-700 text-xs sm:text-sm cursor-pointer hover:bg-slate-100"
            >
              <RotateCcw className="w-4 h-4 mr-1.5 text-slate-600" />
              Újrajátszás
            </Button>
          </div>
        </div>
      )}

      {/* Sorter Leaderboard Dialog */}
      <SorterLeaderboardModal
        isOpen={isLeaderboardOpen}
        onClose={() => setIsLeaderboardOpen(false)}
        topicId={(topicId || 'sorter').toLowerCase().replace(/[^a-z0-9-]+/g, '')}
        topicTitle={topicTitle || title}
        currentLevel={activeLevel}
        grade={Number(grade) || 7}
        highlightScoreId={lastSavedScoreId}
      />
    </div>
  );
}

export default SorterTemplate;
