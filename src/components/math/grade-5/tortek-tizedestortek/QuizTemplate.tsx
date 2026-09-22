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
import { useAuth } from '@/contexts/AuthContext';
import { saveQuizProgress } from '@/services/quizProgressService';
import { useQuizProgress } from '@/hooks/useQuizProgress';
import { MathText } from '@/components/math/shared/MathText';

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

export interface Question {
  id: string | number;
  level?: DifficultyLevel;
  prompt?: string;
  question?: string;
  title?: string;
  text?: string;
  highlightValue?: string;
  questionTypeBadge?: string;
  options: string[];
  correctAnswer: string | number;
  explanation: string;
  breakdown?: { label?: string; value?: string }[] | string[];
  steps?: { label?: string; value?: string }[] | string[];
  hint?: string;
  formula?: string;
  [key: string]: any;
}

export type QuizQuestion = Question;

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

export type QuizLevelConfig = LevelConfig;

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
    onOpenRules?: () => void;
  }) => React.ReactNode;
}

export interface LevelHubItemConfig {
  title?: string;
  subtitle?: string;
  focus?: string;
  range?: string;
}

export interface LevelHubProps {
  level1?: LevelHubItemConfig;
  level2?: LevelHubItemConfig;
  level3?: LevelHubItemConfig;
  [key: string]: LevelHubItemConfig | undefined;
}

export interface QuizTemplateProps {
  onBack?: () => void;
  onSwitchToTheory?: () => void;
  grade?: number;
  chapterId?: string;
  topicId?: string;
  documentId?: string;
  pdfFilename?: string;
  emoji?: string;
  badge?: string;
  topicBadge?: string;
  badgeText?: string;
  badgeColor?: string;
  title: string;
  subtitle?: string;
  description?: string;
  cheatSheetTitle?: string;
  cheatSheet?: CheatSheetItem[];
  cheatSheetCards?: CheatSheetCard[];
  cheatSheets?: { title: string; items: string[] }[];
  cheatSheetContent?: React.ReactNode;
  levelHubProps?: LevelHubProps;
  questions?: QuizQuestion[] | Record<DifficultyLevel, Question[]>;
  levels?: LevelConfig[] | Record<DifficultyLevel, LevelConfig>;
  easyQuestions?: QuizQuestion[];
  mediumQuestions?: QuizQuestion[];
  hardQuestions?: QuizQuestion[];
  customGameModes?: CustomGameMode[];
  matcherComponent?: React.ReactNode;
  sorterComponent?: React.ReactNode;
  renderMatcher?: (props: {
    level: DifficultyLevel;
    onNextLevel?: () => void;
    onOpenRules?: () => void;
    onBack?: () => void;
    onSwitchToQuiz?: () => void;
    onSwitchToSorter?: () => void;
    onSwitchToTheory?: () => void;
  }) => React.ReactNode;
  renderSorter?: (props: {
    level: DifficultyLevel;
    onNextLevel?: () => void;
    onOpenRules?: () => void;
    onBack?: () => void;
    onSwitchToQuiz?: () => void;
    onSwitchToMatcher?: () => void;
    onSwitchToTheory?: () => void;
  }) => React.ReactNode;
  hintText?: string;
  themeColor?: 'amber' | 'blue' | 'emerald' | 'purple' | 'cyan' | 'indigo' | 'violet' | 'rose' | 'orange';
  topicTitle?: string;
  category?: string;
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

export function QuizTemplate({
  onBack = () => {},
  onSwitchToTheory,
  grade,
  chapterId,
  topicId,
  topicTitle,
  documentId,
  pdfFilename,
  emoji = '🎯',
  badge,
  topicBadge,
  badgeText,
  badgeColor,
  title,
  subtitle,
  description,
  cheatSheetTitle,
  cheatSheet,
  cheatSheetCards,
  cheatSheets,
  cheatSheetContent,
  levelHubProps,
  questions: rawQuestions,
  levels,
  easyQuestions,
  mediumQuestions,
  hardQuestions,
  customGameModes,
  matcherComponent,
  sorterComponent,
  renderMatcher,
  renderSorter,
  hintText,
  themeColor = 'amber'
}: QuizTemplateProps) {
  const { user, profile } = useAuth();
  const { getTopicProgress } = useQuizProgress();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const rawTitle = typeof title === 'string' ? title : 'Kvíz';
    document.title = `${rawTitle} | DiákZóna`;
  }, [title]);

  const computedTopicId = useMemo(() => {
    if (topicId) return topicId;
    if (documentId) return documentId;
    const t = (title || '').toLowerCase();
    if (t.includes('római') || t.includes('romai')) return 'g5-roman-numerals';
    if (t.includes('helyiérték') || t.includes('helyiertek')) return 'g5-place-value';
    if (t.includes('kiolvasás') || t.includes('kiolvasas') || t.includes('csoportosítás')) return 'g5-number-reading';
    if (t.includes('helyesírás') || t.includes('helyesiras')) return 'g5-number-spelling';
    if (t.includes('számrendszer') || t.includes('szamrendszer')) return 'g5-number-systems';
    if (t.includes('számegyenes') || t.includes('szamegyenes')) return 'g5-number-line';
    if (t.includes('kerekítés') || t.includes('kerekites') || t.includes('becslés') || t.includes('becsles')) return 'g5-rounding';
    if (t.includes('egész számok összeadása') || t.includes('egész számok műveletei')) return 'g5-integer-addition-subtraction';
    if (t.includes('összeadás') || t.includes('osszeadas')) return 'g5-addition';
    if (t.includes('kivonás') || t.includes('kivonas')) return 'g5-subtraction';
    if (t.includes('szorzás') || t.includes('szorzas')) return 'g5-multiplication';
    if (t.includes('osztás') || t.includes('osztas')) return 'g5-division';
    if (t.includes('műveleti sorrend') || t.includes('sorrend') || t.includes('zárójelek')) return 'g5-order-of-operations';
    if (t.includes('negatív') || t.includes('negativ')) return 'g5-negative-numbers';
    if (t.includes('ellentett') || t.includes('abszolút') || t.includes('abszolut')) return 'g5-opposite-absolute';
    if (t.includes('összefoglal') || t.includes('témazáró')) return 'g5-chapter1-summary';
    return t.replace(/[^a-z0-9]+/g, '-');
  }, [topicId, documentId, title]);

  const currentTopicProgress = getTopicProgress(computedTopicId);
  // 1. Normalize Levels & Questions
  const normalizedLevels: Record<DifficultyLevel, LevelConfig> | null = useMemo(() => {
    if (levels) {
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
    }

    if (rawQuestions) {
      const normalizeQ = (q: QuizQuestion): QuizQuestion => {
        let answerStr = '';
        if (typeof q.correctAnswer === 'number') {
          answerStr = q.options[q.correctAnswer] !== undefined ? q.options[q.correctAnswer] : String(q.correctAnswer);
        } else {
          answerStr = q.correctAnswer;
        }

        let normalizedBreakdown: { label: string; value: string }[] | undefined = undefined;
        if (q.breakdown) {
          if (Array.isArray(q.breakdown) && typeof q.breakdown[0] === 'string') {
            normalizedBreakdown = (q.breakdown as string[]).map((str, idx) => ({
              label: `${idx + 1}. lépés`,
              value: str
            }));
          } else {
            normalizedBreakdown = q.breakdown as { label: string; value: string }[];
          }
        }

        return {
          ...q,
          id: String(q.id),
          prompt: q.prompt || q.question || q.title || q.text || '',
          question: q.question || q.prompt || q.title || q.text || '',
          correctAnswer: answerStr,
          breakdown: normalizedBreakdown
        };
      };

      // Check if rawQuestions is Record<DifficultyLevel, Question[]>
      if (!Array.isArray(rawQuestions) && typeof rawQuestions === 'object') {
        const recordQ = rawQuestions as unknown as Record<DifficultyLevel, Question[]>;
        return {
          1: {
            level: 1,
            title: levelHubProps?.level1?.title || '1. Szint: Alapok',
            subtitle: levelHubProps?.level1?.subtitle || 'Alapfogalmak és egyszerűbb feladatok',
            range: levelHubProps?.level1?.range || '1 - 10. feladat',
            focus: levelHubProps?.level1?.focus || 'Alapfogalmak',
            questions: (recordQ[1] || []).map(normalizeQ)
          },
          2: {
            level: 2,
            title: levelHubProps?.level2?.title || '2. Szint: Közepes',
            subtitle: levelHubProps?.level2?.subtitle || 'Összefüggések és gyakorlati feladványok',
            range: levelHubProps?.level2?.range || '11 - 20. feladat',
            focus: levelHubProps?.level2?.focus || 'Gyakorlat & Alkalmazás',
            questions: (recordQ[2] || []).map(normalizeQ)
          },
          3: {
            level: 3,
            title: levelHubProps?.level3?.title || '3. Szint: Haladó',
            subtitle: levelHubProps?.level3?.subtitle || 'Összetett feladatok és logikai kihívások',
            range: levelHubProps?.level3?.range || '21 - 30. feladat',
            focus: levelHubProps?.level3?.focus || 'Mesterfok & Logika',
            questions: (recordQ[3] || []).map(normalizeQ)
          }
        };
      }

      if (Array.isArray(rawQuestions) && rawQuestions.length > 0) {
        const l1 = rawQuestions.filter(q => q.level === 1).map(normalizeQ);
        const l2 = rawQuestions.filter(q => q.level === 2).map(normalizeQ);
        const l3 = rawQuestions.filter(q => q.level === 3).map(normalizeQ);

        return {
          1: {
            level: 1,
            title: levelHubProps?.level1?.title || '1. Szint: Alapok',
            subtitle: levelHubProps?.level1?.subtitle || 'Alapfogalmak és egyszerűbb feladatok',
            range: levelHubProps?.level1?.range || '1 - 10. feladat',
            focus: levelHubProps?.level1?.focus || 'Alapfogalmak',
            questions: l1.length > 0 ? l1 : rawQuestions.slice(0, 10).map(normalizeQ)
          },
          2: {
            level: 2,
            title: levelHubProps?.level2?.title || '2. Szint: Közepes',
            subtitle: levelHubProps?.level2?.subtitle || 'Összefüggések és gyakorlati feladványok',
            range: levelHubProps?.level2?.range || '11 - 20. feladat',
            focus: levelHubProps?.level2?.focus || 'Gyakorlat & Alkalmazás',
            questions: l2.length > 0 ? l2 : rawQuestions.slice(10, 20).map(normalizeQ)
          },
          3: {
            level: 3,
            title: levelHubProps?.level3?.title || '3. Szint: Haladó',
            subtitle: levelHubProps?.level3?.subtitle || 'Összetett feladatok és logikai kihívások',
            range: levelHubProps?.level3?.range || '21 - 30. feladat',
            focus: levelHubProps?.level3?.focus || 'Mesterfok & Logika',
            questions: l3.length > 0 ? l3 : rawQuestions.slice(20, 30).map(normalizeQ)
          }
        };
      }
    }

    return null;
  }, [levels, rawQuestions, levelHubProps]);

  const effectiveLevels: Record<DifficultyLevel, LevelConfig> = normalizedLevels || {
    1: {
      level: 1,
      title: levelHubProps?.level1?.title || '1. Szint: Alapok',
      subtitle: levelHubProps?.level1?.subtitle || 'Alapfogalmak és egyszerűbb számítások',
      range: levelHubProps?.level1?.range || '1 - 10. feladat',
      focus: levelHubProps?.level1?.focus || 'Alapfogalmak',
      questions: (easyQuestions || []).map(q => ({
        ...q,
        id: String(q.id),
        correctAnswer: typeof q.correctAnswer === 'number' ? q.options[q.correctAnswer] : q.correctAnswer
      })),
    },
    2: {
      level: 2,
      title: levelHubProps?.level2?.title || '2. Szint: Közepes',
      subtitle: levelHubProps?.level2?.subtitle || 'Összefüggések és gyakorlati feladatok',
      range: levelHubProps?.level2?.range || '11 - 20. feladat',
      focus: levelHubProps?.level2?.focus || 'Gyakorlat & Alkalmazás',
      questions: (mediumQuestions || []).map(q => ({
        ...q,
        id: String(q.id),
        correctAnswer: typeof q.correctAnswer === 'number' ? q.options[q.correctAnswer] : q.correctAnswer
      })),
    },
    3: {
      level: 3,
      title: levelHubProps?.level3?.title || '3. Szint: Haladó',
      subtitle: levelHubProps?.level3?.subtitle || 'Összetett feladatok és logikai kihívások',
      range: levelHubProps?.level3?.range || '21 - 30. feladat',
      focus: levelHubProps?.level3?.focus || 'Mesterfok & Logika',
      questions: (hardQuestions || []).map(q => ({
        ...q,
        id: String(q.id),
        correctAnswer: typeof q.correctAnswer === 'number' ? q.options[q.correctAnswer] : q.correctAnswer
      })),
    },
  };

  // 2. Normalize Cheat Sheets
  const normalizedCheatCards: CheatSheetCard[] = useMemo(() => {
    const cards = [...(cheatSheetCards || [])];
    if (cheatSheets && cheatSheets.length > 0) {
      cheatSheets.forEach((cs, idx) => {
        cards.push({
          id: `cs-${idx}`,
          title: cs.title,
          content: (
            <ul className="text-xs space-y-1 text-slate-700 dark:text-slate-300">
              {cs.items.map((it, itIdx) => (
                <li key={itIdx} className="flex items-start gap-1.5">
                  <span className="text-amber-500 font-bold">•</span>
                  <span>{it}</span>
                </li>
              ))}
            </ul>
          )
        });
      });
    }
    return cards;
  }, [cheatSheetCards, cheatSheets]);

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

  // Auto-save quiz progress when completed
  useEffect(() => {
    if (isCompleted && user) {
      const activeLvlConfig = (selectedLevel ? normalizedLevels?.[selectedLevel] : null) || normalizedLevels?.[1];
      const totalQ = questions.length || activeLvlConfig?.questions?.length || 10;
      const percentage = Math.round((score / totalQ) * 100);

      saveQuizProgress({
        userId: user.uid,
        studentName: profile?.full_name || user.displayName || 'Diák',
        studentEmail: profile?.email || user.email || '',
        userCode: profile?.user_code || '',
        grade: grade || 5,
        chapterId: chapterId || 'egesz-szamok',
        topicId: computedTopicId,
        topicTitle: topicTitle || title,
        gameType: 'quiz',
        level: selectedLevel || 1,
        percentage,
        scorePoints: score,
        totalQuestions: totalQ,
        bestStreak
      });
    }
  }, [isCompleted, user, profile, score, bestStreak, selectedLevel, questions, normalizedLevels, grade, chapterId, computedTopicId, topicTitle, title]);

  // 3. Combine Game Modes
  const allGameModes: CustomGameMode[] = useMemo(() => {
    const modes = [...(customGameModes || [])];
    if ((matcherComponent || renderMatcher) && !modes.some(m => m.id === 'matcher')) {
      modes.push({
        id: 'matcher',
        title: 'Párosító játék',
        subtitle: 'Keresd meg az összetartozó párokat!',
        icon: <ArrowRightLeft className="w-4 h-4 text-indigo-500" />,
        badgeText: 'Párosítás',
        render: (props) => {
          const rawLvl = props?.level ?? selectedLevel ?? 1;
          const lvl: DifficultyLevel = (typeof rawLvl === 'number' ? rawLvl : 1) as DifficultyLevel;
          if (renderMatcher) {
            const params = {
              level: lvl,
              onNextLevel: props?.onNextLevel,
              onOpenRules: props?.onOpenRules,
              onBack: onBack,
              onSwitchToQuiz: () => setGameMode('quiz'),
              onSwitchToSorter: () => setGameMode('sorter'),
              onSwitchToTheory: onSwitchToTheory
            };
            // Call supporting single object prop
            return (renderMatcher as any)(params);
          }
          if (React.isValidElement(matcherComponent)) {
            return React.cloneElement(matcherComponent, {
              level: lvl,
              onNextLevel: props?.onNextLevel,
              onOpenRules: props?.onOpenRules,
              onBack: onBack,
              onSwitchToQuiz: () => setGameMode('quiz'),
              onSwitchToSorter: () => setGameMode('sorter'),
              onSwitchToTheory: onSwitchToTheory
            } as any);
          }
          return matcherComponent;
        }
      });
    }
    if ((sorterComponent || renderSorter) && !modes.some(m => m.id === 'sorter')) {
      modes.push({
        id: 'sorter',
        title: 'Csoportosító játék',
        subtitle: 'Válogasd szét a kategóriákba!',
        icon: <Layers className="w-4 h-4 text-emerald-500" />,
        badgeText: 'Kategorizálás',
        render: (props) => {
          const rawLvl = props?.level ?? selectedLevel ?? 1;
          const lvl: DifficultyLevel = (typeof rawLvl === 'number' ? rawLvl : 1) as DifficultyLevel;
          if (renderSorter) {
            const params = {
              level: lvl,
              onNextLevel: props?.onNextLevel,
              onOpenRules: props?.onOpenRules,
              onBack: onBack,
              onSwitchToQuiz: () => setGameMode('quiz'),
              onSwitchToMatcher: () => setGameMode('matcher'),
              onSwitchToTheory: onSwitchToTheory
            };
            return (renderSorter as any)(params);
          }
          if (React.isValidElement(sorterComponent)) {
            return React.cloneElement(sorterComponent, {
              level: lvl,
              onNextLevel: props?.onNextLevel,
              onOpenRules: props?.onOpenRules,
              onBack: onBack,
              onSwitchToQuiz: () => setGameMode('quiz'),
              onSwitchToMatcher: () => setGameMode('matcher'),
              onSwitchToTheory: onSwitchToTheory
            } as any);
          }
          return sorterComponent;
        }
      });
    }
    return modes;
  }, [customGameModes, matcherComponent, sorterComponent, renderMatcher, renderSorter, selectedLevel, onBack, onSwitchToTheory]);

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

  const hasCheatSheet = Boolean(
    (cheatSheet && cheatSheet.length > 0) ||
    (normalizedCheatCards && normalizedCheatCards.length > 0) ||
    cheatSheetContent
  );

  // 1. Initial Level Selection Screen
  // 1. Initial Level Selection Screen (Compact Single-Screen Layout)
  if (selectedLevel === null) {
    return (
      <div
        ref={containerRef}
        className={cn(
          "w-full max-w-5xl mx-auto px-2 sm:px-4 py-1 sm:py-2 animate-in fade-in duration-300 text-left",
          isFullscreen && "fixed inset-0 z-50 max-w-none w-screen h-screen bg-slate-100 dark:bg-slate-950 p-3 sm:p-4 overflow-y-auto"
        )}
      >
        {/* Top bar with back button, theory button, fullscreen and cheat sheet */}
        <div className="flex flex-wrap items-center justify-between gap-1.5 mb-1.5">
          <div className="flex items-center gap-1.5">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="rounded-xl h-7 px-2 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5 mr-1" />
              Vissza a témakörökhöz
            </Button>

            {onSwitchToTheory && (
              <Button
                variant="outline"
                size="sm"
                onClick={onSwitchToTheory}
                className="rounded-xl h-7 px-2 text-xs font-bold text-amber-700 bg-amber-50/50 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800 hover:bg-amber-100 cursor-pointer"
              >
                <BookOpen className="w-3 h-3 mr-1" />
                Tananyag
              </Button>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleFullscreen}
              className="rounded-xl h-7 px-2 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer"
              title={isFullscreen ? "Kilépés a teljes képernyőből" : "Teljes képernyő"}
            >
              {isFullscreen ? (
                <>
                  <Minimize2 className="w-3 h-3 mr-1" />
                  Ablak
                </>
              ) : (
                <>
                  <Maximize2 className="w-3 h-3 mr-1" />
                  Teljes képernyő
                </>
              )}
            </Button>

            {hasCheatSheet && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowCheatSheet(!showCheatSheet)}
                className="rounded-xl h-7 px-2.5 text-xs font-bold border-amber-300 bg-amber-50/50 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800 hover:bg-amber-100 cursor-pointer"
              >
                <Sparkles className="w-3 h-3 mr-1 text-amber-600" />
                {cheatSheetTitle || "Szabályok & Képletek"}
              </Button>
            )}
          </div>
        </div>

        {/* Hero Header */}
        <div className="text-center max-w-2xl mx-auto mb-2 sm:mb-2.5">
          <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider mb-1 border border-amber-200 dark:border-amber-800 bg-amber-100/80 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300">
            <span>{topicBadge || badgeText || '5. Osztály • Matematika'}</span>
            <span className="opacity-40">•</span>
            <span className="font-extrabold flex items-center gap-1 text-amber-700 dark:text-amber-300">
              <Sparkles className="w-3 h-3 text-amber-500" /> Gyakorló Kvíz
            </span>
          </div>
          <h1 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white tracking-tight flex items-center justify-center gap-1.5 mb-1">
            <span className="text-xl sm:text-2xl">{emoji}</span>
            <span>{title}</span>
          </h1>

          {/* Quick Mode Switcher in selection */}
          {allGameModes && allGameModes.length > 0 && (
            <div className="inline-flex flex-wrap items-center justify-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl mt-1 border border-slate-200 dark:border-slate-700 shadow-xs">
              <button
                onClick={() => setGameMode('quiz')}
                className={cn(
                  "flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer",
                  gameMode === 'quiz'
                    ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                )}
              >
                <FileQuestion className="w-3.5 h-3.5 text-amber-500" />
                Kvíz
              </button>
              {allGameModes.map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => {
                    if (mode.onClick) {
                      mode.onClick();
                    } else {
                      setGameMode(mode.id);
                      setSelectedLevel(1);
                    }
                  }}
                  className={cn(
                    "flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer",
                    gameMode === mode.id
                      ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs"
                      : "text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                  )}
                >
                  {mode.icon || (mode.id === 'matcher' ? <ArrowRightLeft className="w-3.5 h-3.5 text-indigo-500" /> : mode.id === 'sorter' ? <Layers className="w-3.5 h-3.5 text-emerald-500" /> : <LayoutGrid className="w-3.5 h-3.5 text-emerald-500" />)}
                  {mode.id === 'matcher' ? 'Párosító játék' : mode.id === 'sorter' ? 'Csoportosító játék' : mode.title}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Cheat sheet popover/card */}
        {showCheatSheet && hasCheatSheet && (
          <div className="mb-2.5 p-3 sm:p-4 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-slate-900 dark:to-slate-850 rounded-xl border-2 border-amber-200 dark:border-amber-900/60 shadow-md animate-in fade-in duration-200">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs sm:text-sm font-black text-amber-900 dark:text-amber-200 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                {cheatSheetTitle || "Kvíz Segédlet & Tudástár"}
              </h3>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setShowCheatSheet(false)}
                className="text-amber-800 dark:text-amber-300 hover:bg-amber-200/50 rounded-lg h-6 px-2 text-xs cursor-pointer"
              >
                Bezárás
              </Button>
            </div>
            {cheatSheetContent && (
              <div className="mb-2">
                {cheatSheetContent}
              </div>
            )}
            {cheatSheet && cheatSheet.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 mb-2">
                {cheatSheet.map((item, idx) => (
                  <div key={idx} className="bg-white/95 dark:bg-slate-800/95 p-2 rounded-lg border border-amber-100 dark:border-slate-700 shadow-xs text-left">
                    <div className="text-[11px] font-black text-amber-600 dark:text-amber-400">{item.topic}</div>
                    <div className="text-[11px] font-mono font-bold text-slate-800 dark:text-slate-100 mt-0.5">{item.formula}</div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight mt-0.5">{item.note}</div>
                  </div>
                ))}
              </div>
            )}
            {normalizedCheatCards && normalizedCheatCards.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                {normalizedCheatCards.map((card, idx) => (
                  <div key={card.id || idx} className="bg-white/95 dark:bg-slate-800/95 p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 shadow-xs text-left space-y-1">
                    <div className="flex items-center gap-1.5 font-bold text-xs text-slate-900 dark:text-slate-100">
                      {card.icon || <Sparkles className="w-3.5 h-3.5 text-amber-600" />}
                      <span>{card.title}</span>
                    </div>
                    {card.content ? (
                      <div>{card.content}</div>
                    ) : (
                      <>
                        {card.formula && <div className="text-[11px] font-mono font-bold text-slate-800 dark:text-slate-100 mt-0.5"><MathText>{card.formula}</MathText></div>}
                        {card.note && <div className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight mt-0.5"><MathText>{card.note}</MathText></div>}
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Difficulty Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 max-w-4xl mx-auto">
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
                className="group relative bg-white dark:bg-slate-900 rounded-xl p-3 sm:p-3.5 border-2 border-slate-200/80 dark:border-slate-800 hover:border-amber-500 dark:hover:border-amber-500 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-amber-500/10 to-transparent rounded-bl-full pointer-events-none group-hover:scale-110 transition-transform" />

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className={cn("w-7 h-7 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform shadow-inner font-black text-sm", iconBg)}>
                      {level}
                    </div>

                    <span className={cn("px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border", badgeBg, badgeBorder, badgeText)}>
                      {gameMode === 'quiz' ? `${cfg.questions.length || 10} Kérdés` : (allGameModes?.find(m => m.id === gameMode)?.badgeText || `${cfg.questions.length || 10} Feladat`)}
                    </span>
                  </div>

                  <h3 className="text-sm sm:text-base font-black text-slate-900 dark:text-white mb-0.5 leading-snug group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                    {cfg.title}
                  </h3>

                  <p className="text-[11px] leading-tight font-medium text-slate-500 dark:text-slate-400 mb-2 line-clamp-2 min-h-[26px]">
                    {cfg.subtitle}
                  </p>

                  <div className="space-y-1 pt-1.5 border-t border-slate-100 dark:border-slate-800 mb-2">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-slate-500 dark:text-slate-400">Tartomány:</span>
                      <span className="font-bold text-slate-800 dark:text-slate-200">{cfg.range}</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-slate-500 dark:text-slate-400">Fókusz:</span>
                      <span className="font-bold text-amber-600 dark:text-amber-400 text-right truncate max-w-[130px]" title={cfg.focus}><MathText size="sm">{cfg.focus}</MathText></span>
                    </div>
                  </div>

                  {/* Level Personal Best Score */}
                  <div className="mb-2.5">
                    {(() => {
                      const lvlScore = currentTopicProgress?.levelScores?.[level];
                      const hasLvlScore = lvlScore !== undefined;
                      const hasStartedTopic = currentTopicProgress?.hasStarted;

                      if (hasLvlScore) {
                        return (
                          <div className={cn(
                            "flex items-center justify-between px-2.5 py-1 rounded-lg border text-[11px] font-mono font-black",
                            lvlScore === 100
                              ? "bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300"
                              : lvlScore >= 70
                              ? "bg-amber-50 dark:bg-amber-950/60 border-amber-300 dark:border-amber-800 text-amber-700 dark:text-amber-300"
                              : "bg-rose-50 dark:bg-rose-950/60 border-rose-300 dark:border-rose-800 text-rose-700 dark:text-rose-300"
                          )}>
                            <span className="font-sans text-[10px] font-bold text-slate-500 dark:text-slate-400">Eredményed:</span>
                            <span className="flex items-center gap-1">
                              {lvlScore === 100 && <span>⭐</span>}
                              <span>{lvlScore}%</span>
                            </span>
                          </div>
                        );
                      }

                      if (hasStartedTopic) {
                        return (
                          <div className="flex items-center justify-between px-2.5 py-1 rounded-lg bg-rose-50/60 dark:bg-rose-950/30 border border-dashed border-rose-200 dark:border-rose-900/60 text-[11px] text-rose-600 dark:text-rose-400 font-bold">
                            <span className="text-[10px]">Státusz:</span>
                            <span className="flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                              Még hiányzik
                            </span>
                          </div>
                        );
                      }

                      return (
                        <div className="flex items-center justify-between px-2.5 py-1 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800 text-[11px] text-slate-400 dark:text-slate-500 font-medium">
                          <span className="text-[10px]">Státusz:</span>
                          <span>Még nincs kitöltve</span>
                        </div>
                      );
                    })()}
                  </div>
                </div>

                <Button
                  className={cn(
                    "w-full h-8 sm:h-8.5 rounded-lg font-bold text-xs shadow-xs transition-all flex items-center justify-center gap-1 cursor-pointer",
                    level === 1
                      ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                      : level === 2
                      ? "bg-amber-600 hover:bg-amber-700 text-white"
                      : "bg-purple-600 hover:bg-purple-700 text-white"
                  )}
                >
                  {gameMode === 'quiz' ? 'Kvíz Indítása' : `${allGameModes?.find(m => m.id === gameMode)?.title || 'Játék'} Indítása`}
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
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
          "w-full max-w-xl mx-auto px-2 sm:px-4 py-1 sm:py-2 animate-in zoom-in-95 duration-300 text-center flex items-center justify-center min-h-[calc(100vh-180px)] sm:min-h-0",
          isFullscreen && "fixed inset-0 z-50 max-w-none w-screen h-screen bg-slate-100 dark:bg-slate-950 p-4 sm:p-6 overflow-y-auto flex items-center justify-center"
        )}
      >
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 sm:p-6 border-2 border-slate-200/80 dark:border-slate-800 shadow-xl max-w-lg w-full mx-auto">
          {/* Trophy Badge */}
          <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-2 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center text-white shadow-md shadow-amber-500/20">
            <Trophy className="w-7 h-7 sm:w-8 sm:h-8" />
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mb-0.5">
            {isPerfect ? 'Tökéletes Eredmény! 🏆' : isGood ? 'Szép Munka! 🌟' : 'Gyakorolj még egy kicsit! 💪'}
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-2.5">
            Sikeresen befejezted a <span className="font-bold text-slate-800 dark:text-slate-200">{levelConfig.title}</span> feladatait!
          </p>

          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-2 bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 mb-2.5">
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-400 mb-0.5">Pontszám</div>
              <div className="text-lg sm:text-xl font-black text-amber-600 dark:text-amber-400 font-mono">{score} / {totalQuestions}</div>
            </div>
            <div className="border-x border-slate-200 dark:border-slate-700">
              <div className="text-[10px] uppercase font-bold text-slate-400 mb-0.5">Eredmény</div>
              <div className="text-lg sm:text-xl font-black text-slate-800 dark:text-slate-100 font-mono">{percentage}%</div>
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-400 mb-0.5">Legjobb széria</div>
              <div className="text-lg sm:text-xl font-black text-amber-500 flex items-center justify-center gap-1 font-mono">
                <Zap className="w-3.5 h-3.5 fill-current" /> {bestStreak}
              </div>
            </div>
          </div>

          {/* Profile Save Confirmation */}
          <div className="flex items-center justify-center gap-1.5 mb-2.5 py-1.5 px-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80 text-emerald-700 dark:text-emerald-300 text-[11px] sm:text-xs font-bold">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
            <span>
              {user ? 'Az eredményed sikeresen elmentve a profilodba! 🎉' : 'Jelentkezz be az eredményeid tárolásához!'}
            </span>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 mb-2">
            {selectedLevel < 3 && (
              <Button
                onClick={() => handleStartLevel((selectedLevel + 1) as DifficultyLevel, 'quiz')}
                className="flex-1 h-9 sm:h-10 rounded-xl text-xs sm:text-sm font-bold bg-amber-600 hover:bg-amber-700 text-white shadow-sm flex items-center justify-center gap-1.5"
              >
                Következő szint: {selectedLevel + 1}. szint
                <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
              </Button>
            )}

            <Button
              variant="outline"
              onClick={() => handleStartLevel(selectedLevel, 'quiz')}
              className="flex-1 h-9 sm:h-10 rounded-xl text-xs sm:text-sm font-bold border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <RotateCcw className="w-3.5 h-3.5 mr-1 text-slate-500" />
              Újrapróbálom
            </Button>
          </div>

          {/* Secondary Navigation Row: Szintek, Tananyag, Vissza a témakörökhöz */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedLevel(null)}
              className="h-7 sm:h-8 px-2.5 rounded-lg text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1"
            >
              <Layers className="w-3.5 h-3.5 text-slate-400" />
              <span>Szintek</span>
            </Button>

            {onSwitchToTheory && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onSwitchToTheory}
                className="h-7 sm:h-8 px-2.5 rounded-lg text-xs font-bold text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/40 flex items-center gap-1"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Vissza a tananyaghoz</span>
              </Button>
            )}

            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="h-7 sm:h-8 px-2.5 rounded-lg text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Vissza a témakörökhöz</span>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // 3. Active View with Right-side Wordwall Sidebar
  const currentQuestion = questions[currentIndex] || levelConfig?.questions[currentIndex];
  const activeCustomMode = allGameModes.find(m => m.id === gameMode);

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
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                        {levelConfig.title}
                      </span>
                    </div>

                    <CardContent className="p-4 sm:p-5 text-center">
                      <p className="text-sm sm:text-base font-bold text-slate-800 dark:text-slate-100 mb-2.5 leading-relaxed">
                        <MathText size="lg">{currentQuestion.prompt || currentQuestion.question || currentQuestion.title || currentQuestion.text}</MathText>
                      </p>

                      {currentQuestion.highlightValue && (
                        <div className="inline-block px-6 py-2.5 bg-gradient-to-br from-amber-50 to-orange-50/60 dark:from-slate-855 dark:to-slate-800 rounded-2xl border-2 border-amber-200/80 dark:border-slate-700 shadow-inner">
                          <span className="text-2xl sm:text-3xl font-mono font-black tracking-wider text-slate-900 dark:text-amber-300">
                            <MathText size="xl">{currentQuestion.highlightValue}</MathText>
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
                              <MathText>{currentQuestion.explanation}</MathText>
                            </p>

                            {((currentQuestion.breakdown && currentQuestion.breakdown.length > 0) || (currentQuestion.steps && currentQuestion.steps.length > 0)) && (
                              <div className="flex flex-wrap items-center gap-1.5 pt-1.5 border-t border-slate-200/60 dark:border-slate-700/60">
                                <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400">Levezetés:</span>
                                {(currentQuestion.breakdown || currentQuestion.steps || []).map((item, bIdx) => (
                                  <span
                                    key={bIdx}
                                    className="px-1.5 py-0.5 rounded-md bg-white/90 dark:bg-slate-800/90 text-[10px] font-bold font-mono text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
                                  >
                                    {(item as { label?: string; value?: string }).label || `${bIdx + 1}. lépés`}: <span className="text-amber-600 dark:text-amber-400"><MathText size="sm">{(item as { label?: string; value?: string }).value || String(item)}</MathText></span>
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Right: 4 Answer Options + Next Button */}
                <div className="flex flex-col gap-2.5">
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
                            "relative min-h-13 sm:min-h-14 py-2 rounded-xl font-bold text-xs sm:text-sm transition-all duration-150 flex items-center justify-between px-4 text-left cursor-pointer",
                            buttonStyle
                          )}
                        >
                          <span className="flex items-center gap-2.5">
                            <span className="w-6 h-6 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-xs font-sans font-bold flex items-center justify-center border border-slate-200 dark:border-slate-700 shrink-0">
                              {idx + 1}
                            </span>
                            <span className="font-bold leading-snug"><MathText size="md">{option}</MathText></span>
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

                  {/* Next Question / Finish Button on the Right */}
                  {isAnswerChecked && (
                    <div className="pt-1 animate-in fade-in slide-in-from-bottom-2 duration-200">
                      <Button
                        onClick={handleNextQuestion}
                        className="w-full h-11 sm:h-12 rounded-xl text-sm font-black bg-slate-900 hover:bg-slate-800 text-white dark:bg-amber-600 dark:hover:bg-amber-700 shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                      >
                        {currentIndex < levelConfig.questions.length - 1 ? (
                          <>
                            Következő Feladat
                            <ArrowRight className="w-4 h-4 ml-1" />
                            <span className="text-[10px] font-normal text-slate-300 dark:text-amber-100 ml-1.5 opacity-80">(Enter ↵)</span>
                          </>
                        ) : (
                          <>
                            Eredmények Megtekintése
                            <Trophy className="w-4 h-4 ml-1 text-yellow-400" />
                            <span className="text-[10px] font-normal text-slate-300 dark:text-amber-100 ml-1.5 opacity-80">(Enter ↵)</span>
                          </>
                        )}
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : activeCustomMode && activeCustomMode.render ? (
            /* CUSTOM MODE WORKSPACE */
            activeCustomMode.render({
              level: selectedLevel || 1,
              onNextLevel:
                selectedLevel && selectedLevel < 3
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
                  <div className="font-black text-xs">Kvíz</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 font-normal">{levelConfig.questions.length} feladat, 4 opció</div>
                </div>
              </button>

              {/* Custom Game Modes */}
              {allGameModes?.map((mode) => (
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
                    {mode.icon || (mode.id === 'matcher' ? <ArrowRightLeft className="w-4 h-4 text-indigo-500" /> : mode.id === 'sorter' ? <Layers className="w-4 h-4 text-emerald-500" /> : <LayoutGrid className="w-4 h-4" />)}
                  </div>
                  <div>
                    <div className="font-black text-xs">
                      {mode.id === 'matcher' ? 'Párosító játék' : mode.id === 'sorter' ? 'Csoportosító játék' : mode.title}
                    </div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 font-normal">{mode.subtitle || 'Interaktív feladat'}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Quick Level Switcher in Sidebar */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-3.5 border-2 border-slate-200/80 dark:border-slate-800 shadow-xs">
            <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2 px-1">
              <Flame className="w-3.5 h-3.5 text-amber-500" />
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

            {hasCheatSheet && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowCheatSheet(!showCheatSheet)}
                className="w-full h-9 rounded-xl border-amber-300 bg-amber-50/50 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800 hover:bg-amber-100 text-xs font-bold justify-start"
              >
                <BookOpen className="w-3.5 h-3.5 mr-2 text-amber-600" />
                {cheatSheetTitle || "Segédlet & Szabályok"}
              </Button>
            )}

            {onSwitchToTheory && (
              <Button
                variant="outline"
                size="sm"
                onClick={onSwitchToTheory}
                className="w-full h-9 rounded-xl border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold justify-start"
              >
                <BookOpen className="w-3.5 h-3.5 mr-2 text-slate-500" />
                Tananyag áttekintése
              </Button>
            )}

            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleStartLevel(selectedLevel || 1, gameMode)}
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
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border-2 border-amber-300 dark:border-amber-900 shadow-2xl max-w-2xl w-full text-left max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-600" />
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

            {cheatSheetContent && (
              <div className="mb-4">
                {cheatSheetContent}
              </div>
            )}

            {cheatSheet && cheatSheet.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-4">
                {cheatSheet.map((item, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
                    <div className="text-xs font-bold text-amber-600 dark:text-amber-400">{item.topic}</div>
                    <div className="text-xs font-mono font-bold text-slate-900 dark:text-white">{item.formula}</div>
                    <div className="text-[11px] text-slate-600 dark:text-slate-300">{item.note}</div>
                  </div>
                ))}
              </div>
            )}

            {normalizedCheatCards && normalizedCheatCards.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-4">
                {normalizedCheatCards.map((card, idx) => (
                  <div key={card.id || idx} className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
                    <div className="flex items-center gap-2 font-bold text-xs text-amber-600 dark:text-amber-400">
                      {card.icon || <Sparkles className="w-4 h-4" />}
                      <span>{card.title}</span>
                    </div>
                    {card.content ? (
                      <div>{card.content}</div>
                    ) : (
                      <>
                        {card.formula && <div className="text-xs font-mono font-bold text-slate-900 dark:text-white"><MathText>{card.formula}</MathText></div>}
                        {card.note && <div className="text-[11px] text-slate-600 dark:text-slate-300"><MathText>{card.note}</MathText></div>}
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}

            <Button
              onClick={() => setShowCheatSheet(false)}
              className="w-full h-10 rounded-xl font-bold bg-amber-600 hover:bg-amber-700 text-white"
            >
              Értem, bezárás
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default QuizTemplate;
