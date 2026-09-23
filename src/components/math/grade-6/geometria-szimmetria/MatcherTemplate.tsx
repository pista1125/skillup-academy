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
  leftFigure?: React.ReactNode;
  rightFigure?: React.ReactNode;
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
  grade?: number;
  chapterId?: string;
  topicId?: string;
  title?: string;
  subtitle?: string;
  badge?: string;
  levels?: Record<DifficultyLevel, MatcherLevelConfig>;
  levelsConfig?: Record<DifficultyLevel, MatcherLevelConfig>;
  config?: MatcherLevelConfig;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
  onBack?: () => void;
  onSwitchToQuiz?: () => void;
  onSwitchToSorter?: () => void;
  onSwitchToTheory?: () => void;
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

export function MatcherTemplate({
  level = 1,
  grade = 6,
  chapterId = 'g6-geometry',
  topicId,
  title = 'Kártyás Párosító',
  subtitle = 'Kattints a kártyákra, és találd meg a feladvány-eredmény párokat!',
  badge,
  levels,
  levelsConfig,
  config,
  onNextLevel,
  onOpenRules,
  onBack,
  onSwitchToQuiz,
  onSwitchToSorter,
  onSwitchToTheory,
  ...rest
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

  const safeLevel: DifficultyLevel = (typeof level === 'number' ? level : ((level as any)?.level ?? 1)) as DifficultyLevel;
  const [activeLevel, setActiveLevel] = useState<DifficultyLevel>(safeLevel || (config?.level as DifficultyLevel) || 1);

  useEffect(() => {
    if (level) {
      const sLevel = (typeof level === 'number' ? level : ((level as any)?.level ?? 1)) as DifficultyLevel;
      setActiveLevel(sLevel);
    }
  }, [level]);

  const allLevels = levels || levelsConfig;

  // Initialize level cards
  const initGame = () => {
    const currentPairs: MatcherPair[] = config?.pairs || allLevels?.[activeLevel]?.pairs || [];
    const cardDeck: CardItem[] = [];

    currentPairs.forEach((pair) => {
      const promptContent = pair.prompt ?? pair.left ?? pair.question ?? pair.term ?? pair.front ?? '';
      const promptFig = pair.promptFigure ?? pair.leftFigure ?? pair.figure ?? undefined;

      const valueContent = pair.value ?? pair.right ?? pair.answer ?? pair.definition ?? pair.back ?? '';
      const valueFig = pair.valueFigure ?? pair.rightFigure ?? undefined;

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
        figure: valueFig,
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
  }, [activeLevel, config, levels, levelsConfig]);

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
            const currentPairs = config?.pairs || allLevels?.[activeLevel]?.pairs || [];
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

    const currentPairsCount = config?.pairs?.length || allLevels?.[activeLevel]?.pairs?.length || 8;
    const computedTopicId = (topicId || badge || title || 'matcher').toLowerCase().replace(/[^a-z0-9-]+/g, '');
    const g = grade || 6;
    const ch = chapterId || 'g6-geometry';

    // 1. Mentés az időalapú rangsorba
    saveMatcherScore({
      userId: user?.uid || null,
      studentName: profile?.full_name || user?.displayName || 'Diák',
      userCode: profile?.user_code || undefined,
      grade: g,
      chapterId: ch,
      topicId: computedTopicId,
      topicTitle: title,
      level: activeLevel,
      timeSeconds: seconds,
      mistakes: mistakes,
      pairsCount: currentPairsCount
    }).then((res) => {
      if (res?.id) setLastSavedScoreId(res.id);
    }).catch((err) => console.error('Failed to save matcher score to leaderboard:', err));

    // 2. Mentés a diák profil haladásába
    if (user) {
      const calcPercentage = Math.max(50, 100 - mistakes * 5);

      saveQuizProgress({
        userId: user.uid,
        studentName: profile?.full_name || user.displayName || 'Diák',
        studentEmail: profile?.email || user.email || '',
        userCode: profile?.user_code || '',
        grade: g,
        chapterId: ch,
        topicId: computedTopicId,
        topicTitle: title,
        gameType: 'matcher',
        level: activeLevel || 1,
        percentage: calcPercentage,
        scorePoints: currentPairsCount,
        totalQuestions: currentPairsCount
      });
    }
  };

  const handleNextLevel = () => {
    if (allLevels && activeLevel < 3 && allLevels[(activeLevel + 1) as DifficultyLevel]) {
      setActiveLevel((prev) => (prev + 1) as DifficultyLevel);
    } else if (onNextLevel) {
      onNextLevel();
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const totalPairs = config?.pairs?.length || allLevels?.[activeLevel]?.pairs?.length || 0;
  const displayTitle = config?.title || allLevels?.[activeLevel]?.title || title;
  const displaySubtitle = config?.description || allLevels?.[activeLevel]?.description || subtitle;

  return (
    <div className="space-y-4 animate-in fade-in duration-300">
      {/* Top Controls & Stats */}
      <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-3 sm:p-4 border border-slate-200 dark:border-slate-700/80 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          {onBack ? (
            <Button
              variant="outline"
              size="sm"
              onClick={onBack}
              className="rounded-xl h-9 px-2.5 text-xs font-bold gap-1 border-slate-200 dark:border-slate-700"
            >
              <ArrowLeft className="w-4 h-4 mr-0.5" />
              Vissza
            </Button>
          ) : (
            <div className="w-10 h-10 rounded-xl bg-cyan-100 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-400 flex items-center justify-center font-bold">
              <ArrowRightLeft className="w-5 h-5" />
            </div>
          )}
          <div>
            {badge && (
              <div className="text-[11px] font-bold text-cyan-600 dark:text-cyan-400">
                {badge}
              </div>
            )}
            <div className="text-sm font-black text-slate-800 dark:text-slate-200">
              <MathText>{displayTitle}</MathText> {allLevels ? `(${activeLevel}. szint)` : ''}
            </div>
          </div>
        </div>

        {/* Action Tabs & Nav buttons */}
        <div className="flex items-center gap-2">
          {onSwitchToTheory && (
            <Button
              variant="outline"
              size="sm"
              onClick={onSwitchToTheory}
              className="rounded-xl h-8 px-2.5 text-xs font-bold border-cyan-300 text-cyan-700 dark:text-cyan-300 bg-cyan-50/50 dark:bg-cyan-950/30"
            >
              <BookOpen className="w-3.5 h-3.5 mr-1" />
              Tananyag
            </Button>
          )}

          {onSwitchToQuiz && (
            <Button
              variant="outline"
              size="sm"
              onClick={onSwitchToQuiz}
              className="rounded-xl h-8 px-2.5 text-xs font-bold border-slate-200 dark:border-slate-700"
            >
              Kvíz mód
            </Button>
          )}

          {onSwitchToSorter && (
            <Button
              variant="outline"
              size="sm"
              onClick={onSwitchToSorter}
              className="rounded-xl h-8 px-2.5 text-xs font-bold border-slate-200 dark:border-slate-700"
            >
              Csoportosító
            </Button>
          )}

          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowLeaderboard(true)}
            className="rounded-xl h-8 px-2.5 text-xs font-bold border-cyan-300 text-cyan-700 dark:text-cyan-300 bg-cyan-50/50 dark:bg-cyan-950/30 gap-1"
          >
            <Trophy className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
            Rangsor
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={initGame}
            className="rounded-xl h-8 px-2.5 text-xs font-bold border-slate-200 dark:border-slate-700"
            title="Újrakeverés"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>

      {/* Live Status Bar */}
      <div className="flex items-center justify-between px-2 text-xs font-bold text-slate-500 dark:text-slate-400">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            Párok: {matchesCount} / {totalPairs}
          </span>
          <span className="flex items-center gap-1 text-slate-400">
            Hibák: {mistakes}
          </span>
        </div>
        <div className="flex items-center gap-1 font-mono">
          <Clock className="w-3.5 h-3.5" />
          {formatTime(seconds)}
        </div>
      </div>

      {/* Main Card Grid */}
      {!isCompleted ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {cards.map((card) => {
            let cardClass =
              'border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 hover:border-cyan-400 shadow-2xs hover:shadow-xs';

            if (card.isMatched) {
              cardClass =
                'border-2 border-emerald-500/80 bg-emerald-50/60 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 opacity-60 pointer-events-none scale-95';
            } else if (card.isFlipped) {
              cardClass =
                'border-2 border-cyan-500 bg-cyan-50/50 dark:bg-cyan-950/30 text-cyan-950 dark:text-cyan-100 ring-2 ring-cyan-500/20';
            }

            return (
              <button
                key={card.id}
                type="button"
                onClick={() => handleCardClick(card)}
                disabled={card.isMatched || isChecking}
                className={cn(
                  'min-h-[105px] sm:min-h-[120px] rounded-2xl p-2 sm:p-2.5 flex flex-col items-center justify-center text-center text-xs sm:text-sm font-bold transition-all duration-200 select-none cursor-pointer',
                  cardClass
                )}
              >
                <div className="w-full h-full flex flex-col items-center justify-center gap-1.5 leading-snug">
                  {card.figure && (
                    <div className="w-full flex items-center justify-center shrink-0 pointer-events-none max-h-16">
                      {card.figure}
                    </div>
                  )}
                  {card.content ? (
                    <div className="max-h-full overflow-hidden flex items-center justify-center">
                      {typeof card.content === 'string' ? (
                        <MathText>{card.content}</MathText>
                      ) : (
                        card.content
                      )}
                    </div>
                  ) : null}
                </div>
              </button>
            );
          })}
        </div>
      ) : (
        /* Victory Modal Box */
        <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 text-center space-y-6 shadow-xl animate-in zoom-in-95">
          <div className="w-16 h-16 rounded-full bg-cyan-100 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-400 flex items-center justify-center mx-auto text-2xl shadow-inner">
            <Trophy className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              Gratulálunk! Sikeres párosítás!
            </h3>
            <p className="text-xs sm:text-sm text-slate-500">
              Idő: {formatTime(seconds)} • Hibák száma: {mistakes}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Button
              onClick={() => setShowLeaderboard(true)}
              className="rounded-xl h-10 px-5 font-bold bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-md text-xs sm:text-sm gap-1.5"
            >
              <Trophy className="w-4 h-4 text-amber-100" />
              Rangsor Megtekintése
            </Button>

            <Button
              variant="outline"
              onClick={initGame}
              className="rounded-xl h-10 px-4 font-bold"
            >
              <RotateCcw className="w-4 h-4 mr-1.5" />
              Újra ezen a szinten
            </Button>

            {((allLevels && activeLevel < 3 && allLevels[(activeLevel + 1) as DifficultyLevel]) || onNextLevel) && (
              <Button
                onClick={handleNextLevel}
                className="rounded-xl h-10 px-5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-bold"
              >
                Következő szint <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            )}

            {onSwitchToQuiz && (
              <Button
                variant="ghost"
                onClick={onSwitchToQuiz}
                className="rounded-xl h-10 px-4 font-medium"
              >
                Vissza a kvízhez
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
        topicTitle={title}
        currentLevel={activeLevel}
        grade={grade || 6}
        highlightScoreId={lastSavedScoreId}
      />
    </div>
  );
}
