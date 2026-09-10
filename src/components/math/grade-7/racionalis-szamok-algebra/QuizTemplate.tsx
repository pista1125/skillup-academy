import React, { useState, useEffect, useRef, useMemo } from 'react';
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

export type DifficultyLevel = 1 | 2 | 3;
export type GameMode = 'quiz' | string;

export interface CheatSheetCard {
  id: string;
  title: string;
  icon?: React.ReactNode;
  color?: string;
  formula?: string;
  note?: string;
  content?: React.ReactNode;
}

export interface QuizQuestion {
  id: string;
  prompt?: string;
  question?: string;
  title?: string;
  text?: string;
  highlightValue?: string;
  questionTypeBadge?: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  breakdown?: { label: string; value: string }[];
  steps?: { label: string; value: string }[];
  hint?: string;
}

export interface LevelConfig {
  level: DifficultyLevel;
  title: string;
  subtitle: string;
  range: string;
  focus: string;
  color?: string;
  badgeBg?: string;
  badgeBorder?: string;
  badgeText?: string;
  accentGradient?: string;
  iconBg?: string;
  questions: QuizQuestion[];
}

export interface CheatSheetItem {
  topic: string;
  formula: string;
  note: string;
}

export interface CustomGameMode {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  icon?: React.ReactNode;
  badgeText?: string;
  onClick?: () => void;
  render?: (props: {
    level: DifficultyLevel;
    onNextLevel?: () => void;
    onOpenRules: () => void;
  }) => React.ReactNode;
}

export interface QuizTemplateProps {
  onBack?: () => void;
  emoji?: string;
  topicBadge?: string;
  badgeText?: string;
  title: string;
  subtitle?: string;
  description?: string;
  cheatSheetTitle?: string;
  cheatSheet?: CheatSheetItem[];
  cheatSheetCards?: CheatSheetCard[];
  levels?: LevelConfig[] | Record<DifficultyLevel, LevelConfig>;
  easyQuestions?: QuizQuestion[];
  mediumQuestions?: QuizQuestion[];
  hardQuestions?: QuizQuestion[];
  customGameModes?: CustomGameMode[];
  hintText?: string;
  themeColor?: 'orange' | 'blue' | 'emerald' | 'purple' | 'amber' | 'cyan' | 'indigo';
}

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function QuizTemplate({
  onBack = () => {},
  emoji = '🔢',
  topicBadge,
  badgeText,
  title,
  subtitle,
  description,
  cheatSheetTitle,
  cheatSheet,
  cheatSheetCards,
  levels,
  easyQuestions,
  mediumQuestions,
  hardQuestions,
  customGameModes,
  hintText,
  themeColor = 'purple'
}: QuizTemplateProps) {
  const normalizedLevels: Record<DifficultyLevel, LevelConfig> | null = useMemo(() => {
    if (!levels) return null;
    if (Array.isArray(levels)) {
      const map: Partial<Record<DifficultyLevel, LevelConfig>> = {};
      levels.forEach((cfg, idx) => {
        const lvl = (cfg.level || (idx + 1)) as DifficultyLevel;
        map[lvl] = {
          ...cfg,
          level: lvl,
          range: cfg.range || (lvl === 1 ? '1 - 10. feladat' : lvl === 2 ? '11 - 20. feladat' : '21 - 30. feladat'),
          focus: cfg.focus || (lvl === 1 ? 'Alapfogalmak' : lvl === 2 ? 'Gyakorlat & Alkalmazás' : 'Mesterfok & Logika')
        };
      });
      return map as Record<DifficultyLevel, LevelConfig>;
    }
    return levels;
  }, [levels]);

  const effectiveLevels: Record<DifficultyLevel, LevelConfig> = normalizedLevels || {
    1: {
      level: 1,
      title: '1. Szint: Alapok',
      subtitle: 'Alapfogalmak és egyszerűbb számítások',
      range: '1 - 10. feladat',
      focus: 'Alapfogalmak',
      questions: easyQuestions || [],
    },
    2: {
      level: 2,
      title: '2. Szint: Közepes',
      subtitle: 'Összefüggések és gyakorlati feladatok',
      range: '11 - 20. feladat',
      focus: 'Gyakorlat & Alkalmazás',
      questions: mediumQuestions || [],
    },
    3: {
      level: 3,
      title: '3. Szint: Haladó',
      subtitle: 'Összetett feladatok és logikai kihívások',
      range: '21 - 30. feladat',
      focus: 'Mesterfok & Logika',
      questions: hardQuestions || [],
    },
  };
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

  // Confetti on completion
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

    const levelQuestions = effectiveLevels[level]?.questions || [];
    const prepared = levelQuestions.map((q) => ({
      ...q,
      options: shuffleArray(q.options)
    }));
    setQuestions(prepared);
  };

  const handleOptionClick = (option: string) => {
    if (isAnswerChecked) return;
    setSelectedOption(option);
    setIsAnswerChecked(true);

    const currentQ = questions[currentIndex] || (selectedLevel ? effectiveLevels[selectedLevel]?.questions[currentIndex] : null);
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
    const total = questions.length || (selectedLevel ? effectiveLevels[selectedLevel]?.questions.length : 0);

    if (currentIndex < total - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerChecked(false);
    } else {
      setIsCompleted(true);
    }
  };

  // Keyboard shortcut listener (1, 2, 3, 4, Enter, Space)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameMode !== 'quiz' || isCompleted || !selectedLevel) return;

      if (!isAnswerChecked) {
        const keyMap: { [key: string]: number } = {
          '1': 0,
          '2': 1,
          '3': 2,
          '4': 3
        };
        if (e.key in keyMap) {
          const optionIdx = keyMap[e.key];
          const currentQ = questions[currentIndex] || (selectedLevel ? effectiveLevels[selectedLevel]?.questions[currentIndex] : null);
          if (currentQ && currentQ.options[optionIdx]) {
            handleOptionClick(currentQ.options[optionIdx]);
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
  }, [gameMode, isAnswerChecked, isCompleted, selectedLevel, currentIndex, questions]);

  const hasCheatSheet = (cheatSheet && cheatSheet.length > 0) || (cheatSheetCards && cheatSheetCards.length > 0);

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
        <div className="flex items-center justify-between gap-2 mb-1">
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

            {hasCheatSheet && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowCheatSheet(!showCheatSheet)}
                className="rounded-xl h-8 px-3 text-xs font-bold border-purple-300 bg-purple-50/50 text-purple-800 dark:bg-purple-950/40 dark:text-purple-300 dark:border-purple-800 hover:bg-purple-100"
              >
                <BookOpen className="w-3.5 h-3.5 mr-1.5 text-purple-600" />
                {cheatSheetTitle || "Segédlet / Tudástár"}
              </Button>
            )}
          </div>
        </div>

        {/* Hero Header */}
        <div className="text-center max-w-2xl mx-auto mb-3 sm:mb-4">
          <div className="text-[11px] font-black uppercase tracking-wider text-purple-600 dark:text-purple-400 mb-0.5">
            {topicBadge || badgeText || '7. Osztály • Matematika'}
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight flex items-center justify-center gap-2 mb-2">
            <span className="text-2xl">{emoji}</span>
            <span>{title}</span>
          </h1>

          {/* Quick Mode Switcher in selection */}
          {customGameModes && customGameModes.length > 0 && (
            <div className="inline-flex flex-wrap items-center justify-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl mt-1.5 border border-slate-200 dark:border-slate-700">
              <button
                onClick={() => setGameMode('quiz')}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all",
                  gameMode === 'quiz'
                    ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                )}
              >
                <FileQuestion className="w-3.5 h-3.5 text-purple-500" />
                Klasszikus Kvíz
              </button>
              {customGameModes.map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => {
                    if (mode.onClick) {
                      mode.onClick();
                    } else {
                      setGameMode(mode.id);
                    }
                  }}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all",
                    gameMode === mode.id
                      ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs"
                      : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                  )}
                >
                  {mode.icon || <LayoutGrid className="w-3.5 h-3.5 text-emerald-500" />}
                  {mode.title}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Cheat sheet popover/card */}
        {showCheatSheet && hasCheatSheet && (
          <div className="mb-4 p-4 sm:p-5 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-slate-900 dark:to-slate-850 rounded-2xl border-2 border-purple-200 dark:border-purple-900/60 shadow-md animate-in fade-in duration-200">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm sm:text-base font-black text-purple-900 dark:text-purple-200 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-purple-600" />
                {cheatSheetTitle || "Kvíz Segédlet & Tudástár"}
              </h3>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setShowCheatSheet(false)}
                className="text-purple-800 dark:text-purple-300 hover:bg-purple-200/50 rounded-lg h-7 px-2 text-xs"
              >
                Bezárás
              </Button>
            </div>
            {cheatSheet && cheatSheet.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
                {cheatSheet.map((item, idx) => (
                  <div key={idx} className="bg-white/95 dark:bg-slate-800/95 p-2.5 rounded-xl border border-purple-100 dark:border-slate-700 shadow-xs text-left">
                    <div className="text-xs font-black text-purple-600 dark:text-purple-400">{item.topic}</div>
                    <div className="text-xs font-mono font-bold text-slate-800 dark:text-slate-100 mt-0.5">{item.formula}</div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight mt-0.5">{item.note}</div>
                  </div>
                ))}
              </div>
            )}
            {cheatSheetCards && cheatSheetCards.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {cheatSheetCards.map((card, idx) => (
                  <div key={card.id || idx} className="bg-white/95 dark:bg-slate-800/95 p-3 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xs text-left">
                    <div className="flex items-center gap-2 mb-1.5 font-bold text-xs text-slate-900 dark:text-slate-100">
                      {card.icon}
                      <span>{card.title}</span>
                    </div>
                    {card.content ? (
                      <div>{card.content}</div>
                    ) : (
                      <>
                        {card.formula && <div className="text-xs font-mono font-bold text-slate-800 dark:text-slate-100 mt-0.5">{card.formula}</div>}
                        {card.note && <div className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight mt-0.5">{card.note}</div>}
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Difficulty Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {([1, 2, 3] as DifficultyLevel[]).map((level) => {
            const cfg = effectiveLevels[level];
            if (!cfg) return null;

            const badgeBg = cfg.badgeBg || (level === 1 ? 'bg-emerald-50 dark:bg-emerald-950/40' : level === 2 ? 'bg-amber-50 dark:bg-amber-950/40' : 'bg-purple-50 dark:bg-purple-950/40');
            const badgeBorder = cfg.badgeBorder || (level === 1 ? 'border-emerald-200 dark:border-emerald-800' : level === 2 ? 'border-amber-200 dark:border-amber-800' : 'border-purple-200 dark:border-purple-800');
            const badgeText = cfg.badgeText || (level === 1 ? 'text-emerald-700 dark:text-emerald-300' : level === 2 ? 'text-amber-700 dark:text-amber-300' : 'text-purple-700 dark:text-purple-300');
            const iconBg = cfg.iconBg || (level === 1 ? 'bg-emerald-600 text-white' : level === 2 ? 'bg-amber-600 text-white' : 'bg-purple-600 text-white');

            return (
              <div
                key={level}
                onClick={() => handleStartLevel(level, gameMode)}
                className="group relative bg-white dark:bg-slate-900 rounded-2xl p-5 border-2 border-slate-200/80 dark:border-slate-800 hover:border-purple-500 dark:hover:border-purple-500 shadow-sm hover:shadow-lg transition-all duration-200 cursor-pointer flex flex-col justify-between overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-purple-500/10 to-transparent rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform" />

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform shadow-inner font-black text-lg", iconBg)}>
                      {level}
                    </div>

                    <span className={cn("px-2.5 py-1 rounded-full text-[11px] font-black uppercase tracking-wider border", badgeBg, badgeBorder, badgeText)}>
                      {gameMode === 'quiz' ? `${cfg.questions.length || 10} Kérdés` : (customGameModes?.find(m => m.id === gameMode)?.badgeText || `${cfg.questions.length || 10} Feladat`)}
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-slate-900 dark:text-white mb-0.5 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
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
                      <span className="font-bold text-purple-600 dark:text-purple-400 text-right truncate max-w-[140px]" title={cfg.focus}>{cfg.focus}</span>
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
                  {gameMode === 'quiz' ? 'Kvíz Indítása' : `${customGameModes?.find(m => m.id === gameMode)?.title || 'Játék'} Indítása`}
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
  const levelConfig = (selectedLevel ? effectiveLevels[selectedLevel] : null) || effectiveLevels[1];
  const totalQuestions = questions.length || levelConfig?.questions?.length || 10;

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
          <div className="w-20 h-20 mx-auto mb-4 rounded-3xl bg-gradient-to-br from-amber-400 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-purple-500/30">
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
              <div className="text-2xl font-black text-purple-600 dark:text-purple-400">{score} / {totalQuestions}</div>
            </div>
            <div className="border-x border-slate-200 dark:border-slate-700">
              <div className="text-[11px] uppercase font-bold text-slate-400 mb-0.5">Eredmény</div>
              <div className="text-2xl font-black text-slate-800 dark:text-slate-100">{percentage}%</div>
            </div>
            <div>
              <div className="text-[11px] uppercase font-bold text-slate-400 mb-0.5">Legjobb széria</div>
              <div className="text-2xl font-black text-amber-500 flex items-center justify-center gap-1">
                <Zap className="w-4 h-4 fill-current" /> {bestStreak}
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2.5">
            {selectedLevel < 3 && (
              <Button
                onClick={() => handleStartLevel((selectedLevel + 1) as DifficultyLevel, 'quiz')}
                className="flex-1 h-11 rounded-xl text-sm font-bold bg-purple-600 hover:bg-purple-700 text-white shadow-md flex items-center justify-center gap-1.5"
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
  const currentQuestion = questions[currentIndex] || levelConfig?.questions[currentIndex];
  const activeCustomMode = customGameModes?.find(m => m.id === gameMode);

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

          {/* Fullscreen button */}
          <Button
            variant="outline"
            size="sm"
            onClick={toggleFullscreen}
            className="h-8 rounded-xl px-2.5 border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-medium text-xs hover:bg-slate-100 dark:hover:bg-slate-800"
            title={isFullscreen ? 'Kilépés a teljes képernyőből' : 'Teljes képernyős mód'}
          >
            {isFullscreen ? (
              <>
                <Minimize2 className="w-3.5 h-3.5 mr-1 text-purple-600 dark:text-purple-400" />
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
              <div className="flex items-center gap-1 font-black text-purple-600 dark:text-purple-400">
                <Trophy className="w-3.5 h-3.5" />
                <span>{score} pont</span>
              </div>
              {streak > 1 && (
                <>
                  <div className="w-px h-3 bg-slate-200 dark:bg-slate-700" />
                  <div className="flex items-center gap-1 font-black text-amber-600 dark:text-amber-400 animate-pulse">
                    <Zap className="w-3.5 h-3.5 fill-current" />
                    <span>{streak}x</span>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-1.5 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 px-3 py-1 rounded-xl border border-emerald-200 dark:border-emerald-800 text-xs font-bold">
              {activeCustomMode?.icon || <LayoutGrid className="w-3.5 h-3.5" />}
              <span>{activeCustomMode?.title || 'Játékmód'}</span>
            </div>
          )}
        </div>
      </div>

      {/* Main Container with Wordwall Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* LEFT / CENTER: Main Game Area (9 cols on large screen) */}
        <div className="lg:col-span-9 flex flex-col gap-3">
          {gameMode === 'quiz' && currentQuestion ? (
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
                <div className="flex flex-col gap-2.5">
                  <Card className="border-2 border-slate-200/90 dark:border-slate-800 rounded-2xl shadow-xs overflow-hidden">
                    <div className="px-3.5 py-2 bg-slate-50 dark:bg-slate-850 border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                        {currentIndex + 1}. Kérdés • {currentQuestion.questionTypeBadge || 'Kvízkérdés'}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                        {levelConfig.title}
                      </span>
                    </div>

                    <CardContent className="p-4 sm:p-5 text-center">
                      <p className="text-sm sm:text-base font-bold text-slate-800 dark:text-slate-100 mb-2.5 leading-relaxed">
                        {currentQuestion.prompt || currentQuestion.question || currentQuestion.title || currentQuestion.text}
                      </p>

                      {currentQuestion.highlightValue && (
                        <div className="inline-block px-6 py-2.5 bg-gradient-to-br from-purple-50 to-indigo-50/60 dark:from-slate-850 dark:to-slate-800 rounded-2xl border-2 border-purple-200/80 dark:border-slate-700 shadow-inner">
                          <span className="text-2xl sm:text-3xl font-mono font-black tracking-wider text-slate-900 dark:text-purple-300">
                            {currentQuestion.highlightValue}
                          </span>
                        </div>
                      )}
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

                            {((currentQuestion.breakdown && currentQuestion.breakdown.length > 0) || (currentQuestion.steps && currentQuestion.steps.length > 0)) && (
                              <div className="flex flex-wrap items-center gap-1.5 pt-1.5 border-t border-slate-200/60 dark:border-slate-700/60">
                                <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400">Levezetés:</span>
                                {(currentQuestion.breakdown || currentQuestion.steps || []).map((item, bIdx) => (
                                  <span
                                    key={bIdx}
                                    className="px-1.5 py-0.5 rounded-md bg-white/90 dark:bg-slate-800/90 text-[10px] font-bold font-mono text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
                                  >
                                    {item.label}: <span className="text-purple-600 dark:text-purple-400">{item.value}</span>
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <Button
                        onClick={handleNextQuestion}
                        className="w-full h-10 rounded-xl text-sm font-bold bg-slate-900 hover:bg-slate-800 text-white dark:bg-purple-600 dark:hover:bg-purple-700 shadow-sm transition-all flex items-center justify-center gap-1.5"
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
                      Válaszd ki a helyes eredményt:
                    </span>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500">
                      Gombok: [1, 2, 3, 4]
                    </span>
                  </div>

                  <div className="flex flex-col gap-2">
                    {currentQuestion.options.map((option, idx) => {
                      const isSelected = selectedOption === option;
                      const isCorrect = option === currentQuestion.correctAnswer;

                      let buttonStyle = "bg-white dark:bg-slate-900 border-2 border-slate-200/90 dark:border-slate-800 text-slate-800 dark:text-slate-100 hover:border-purple-500 hover:shadow-xs dark:hover:border-purple-500";

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
                            "relative min-h-13 sm:min-h-14 py-2 rounded-xl font-bold text-xs sm:text-sm transition-all duration-150 flex items-center justify-between px-4 text-left",
                            buttonStyle
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
                    <div className="p-2.5 bg-purple-50/60 dark:bg-slate-855/80 rounded-xl border border-purple-200/50 dark:border-slate-800 text-[11px] text-purple-900 dark:text-purple-300 flex items-center gap-1.5 mt-0.5">
                      <Sparkles className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                      <span>{currentQuestion.hint || hintText || "💡 Figyelj a helyes műveleti sorrendre és az előjelekre!"}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : activeCustomMode && activeCustomMode.render ? (
            /* CUSTOM MODE WORKSPACE */
            activeCustomMode.render({
              level: selectedLevel,
              onNextLevel:
                selectedLevel < 3
                  ? () => handleStartLevel((selectedLevel + 1) as DifficultyLevel, gameMode)
                  : undefined,
              onOpenRules: () => setShowCheatSheet(true)
            })
          ) : null}
        </div>

        {/* RIGHT: Wordwall-style Activity & Controls Sidebar (3 cols on large screen) */}
        <div className="lg:col-span-3 flex flex-col gap-3">
          {/* Wordwall Mode Card */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-3.5 border-2 border-slate-200/80 dark:border-slate-800 shadow-xs">
            <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2.5 px-1">
              <Layers className="w-3.5 h-3.5 text-purple-500" />
              <span>Sablon / Játékmód</span>
            </div>

            <div className="flex flex-col gap-1.5">
              {/* Quiz Mode Button */}
              <button
                onClick={() => setGameMode('quiz')}
                className={cn(
                  "w-full p-2.5 rounded-xl text-left font-bold text-xs transition-all flex items-center gap-2.5 border-2",
                  gameMode === 'quiz'
                    ? "bg-purple-50 dark:bg-purple-950/50 border-purple-400 text-purple-900 dark:text-purple-200 shadow-xs"
                    : "bg-slate-50/80 dark:bg-slate-800/60 border-transparent hover:border-slate-200 text-slate-600 dark:text-slate-400"
                )}
              >
                <div className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                  gameMode === 'quiz' ? "bg-purple-500 text-white" : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                )}>
                  <FileQuestion className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-black text-xs">Klasszikus Kvíz</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 font-normal">{levelConfig.questions.length} feladat, 4 opció</div>
                </div>
              </button>

              {/* Custom Game Modes */}
              {customGameModes?.map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => setGameMode(mode.id)}
                  className={cn(
                    "w-full p-2.5 rounded-xl text-left font-bold text-xs transition-all flex items-center gap-2.5 border-2",
                    gameMode === mode.id
                      ? "bg-emerald-50 dark:bg-emerald-950/50 border-emerald-400 text-emerald-900 dark:text-emerald-200 shadow-xs"
                      : "bg-slate-50/80 dark:bg-slate-800/60 border-transparent hover:border-slate-200 text-slate-600 dark:text-slate-400"
                  )}
                >
                  <div className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center shrink-0",
                    gameMode === mode.id ? "bg-emerald-500 text-white" : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                  )}>
                    {mode.icon || <LayoutGrid className="w-4 h-4" />}
                  </div>
                  <div>
                    <div className="font-black text-xs">{mode.title}</div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 font-normal">{mode.subtitle}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Quick Level Switcher in Sidebar */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-3.5 border-2 border-slate-200/80 dark:border-slate-800 shadow-xs">
            <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2 px-1">
              <Flame className="w-3.5 h-3.5 text-purple-500" />
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
                      ? "bg-slate-900 text-white dark:bg-purple-600 dark:text-white"
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
                  <Minimize2 className="w-3.5 h-3.5 mr-2 text-purple-600" />
                  Kilépés a teljes képernyőből
                </>
              ) : (
                <>
                  <Maximize2 className="w-3.5 h-3.5 mr-2 text-purple-600" />
                  Teljes képernyős mód
                </>
              )}
            </Button>

            {hasCheatSheet && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowCheatSheet(!showCheatSheet)}
                className="w-full h-9 rounded-xl border-purple-300 bg-purple-50/50 text-purple-800 dark:bg-purple-950/40 dark:text-purple-300 dark:border-purple-800 hover:bg-purple-100 text-xs font-bold justify-start"
              >
                <BookOpen className="w-3.5 h-3.5 mr-2 text-purple-600" />
                {cheatSheetTitle || "Segédlet & Szabályok"}
              </Button>
            )}

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
      {showCheatSheet && hasCheatSheet && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border-2 border-purple-300 dark:border-purple-900 shadow-2xl max-w-2xl w-full text-left max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-600" />
                {cheatSheetTitle || "Szabályok és összefoglaló"}
              </h3>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setShowCheatSheet(false)}
                className="text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 rounded-lg h-7 px-2 text-xs"
              >
                Bezárás
              </Button>
            </div>

            {cheatSheet && cheatSheet.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-4">
                {cheatSheet.map((item, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
                    <div className="text-xs font-bold text-purple-600 dark:text-purple-400">{item.topic}</div>
                    <div className="text-xs font-mono font-bold text-slate-900 dark:text-white">{item.formula}</div>
                    <div className="text-[11px] text-slate-600 dark:text-slate-300">{item.note}</div>
                  </div>
                ))}
              </div>
            )}

            {cheatSheetCards && cheatSheetCards.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-4">
                {cheatSheetCards.map((card, idx) => (
                  <div key={card.id || idx} className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
                    <div className="flex items-center gap-2 font-bold text-xs text-purple-600 dark:text-purple-400">
                      {card.icon}
                      <span>{card.title}</span>
                    </div>
                    {card.content ? (
                      <div>{card.content}</div>
                    ) : (
                      <>
                        {card.formula && <div className="text-xs font-mono font-bold text-slate-900 dark:text-white">{card.formula}</div>}
                        {card.note && <div className="text-[11px] text-slate-600 dark:text-slate-300">{card.note}</div>}
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}

            <Button
              onClick={() => setShowCheatSheet(false)}
              className="w-full h-10 rounded-xl font-bold bg-purple-600 hover:bg-purple-700 text-white"
            >
              Értem, bezárás
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
