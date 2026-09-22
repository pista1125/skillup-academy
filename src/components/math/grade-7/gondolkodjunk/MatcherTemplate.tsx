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
  grade = 7,
  chapterId = 'gondolkodjunk',
  topicId,
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
  themeColor = 'purple'
}: MatcherTemplateProps) {
  const { user, profile } = useAuth();
  const [activeLevel, setActiveLevel] = useState<DifficultyLevel>(level);
  const [cards, setCards] = useState<CardItem[]>([]);
  const [flippedCards, setFlippedCards] = useState<CardItem[]>([]);
  const [matchesCount, setMatchesCount] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

  useEffect(() => {
    setActiveLevel(level);
  }, [level]);

  const allLevels = levels || levelsConfig;

  // Initialize Cards based on active configuration
  const initGame = () => {
    let sourcePairs: MatcherPair[] = [];

    if (config?.pairs) {
      sourcePairs = config.pairs;
    } else if (allLevels && allLevels[activeLevel]?.pairs) {
      sourcePairs = allLevels[activeLevel].pairs;
    } else if (allLevels && Array.isArray(allLevels[activeLevel])) {
      sourcePairs = allLevels[activeLevel] as any;
    } else if (activeLevel === 1 && level1Pairs) {
      sourcePairs = level1Pairs;
    } else if (activeLevel === 2 && level2Pairs) {
      sourcePairs = level2Pairs;
    } else if (activeLevel === 3 && level3Pairs) {
      sourcePairs = level3Pairs;
    } else if (pairs) {
      sourcePairs = pairs;
    }

    const cardList: CardItem[] = [];
    sourcePairs.forEach((pair, idx) => {
      const pId = pair.id || `pair-${idx}`;
      cardList.push({
        id: `${pId}-prompt`,
        pairId: pId,
        content: pair.prompt ?? pair.left ?? pair.question ?? pair.term ?? pair.front,
        figure: pair.promptFigure ?? pair.leftFigure ?? pair.figure,
        type: 'prompt',
        isFlipped: false,
        isMatched: false
      });
      cardList.push({
        id: `${pId}-value`,
        pairId: pId,
        content: pair.value ?? pair.right ?? pair.answer ?? pair.definition ?? pair.back,
        figure: pair.valueFigure ?? pair.rightFigure,
        type: 'value',
        isFlipped: false,
        isMatched: false
      });
    });

    setCards(shuffleArray(cardList));
    setFlippedCards([]);
    setMatchesCount(0);
    setMistakes(0);
    setSeconds(0);
    setIsActive(true);
    setIsCompleted(false);
    setIsChecking(false);
  };

  useEffect(() => {
    initGame();
  }, [activeLevel, config, levels, levelsConfig, pairs, level1Pairs, level2Pairs, level3Pairs]);

  // Timer
  useEffect(() => {
    let interval: any = null;
    if (isActive && !isCompleted) {
      interval = setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, isCompleted]);

  const handleCardClick = (card: CardItem) => {
    if (isChecking || card.isMatched || card.isFlipped) return;

    const newFlipped = [...flippedCards, card];
    const updatedCards = cards.map((c) => (c.id === card.id ? { ...c, isFlipped: true } : c));
    setCards(updatedCards);
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setIsChecking(true);
      const [first, second] = newFlipped;

      if (first.pairId === second.pairId && first.type !== second.type) {
        // Matched!
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.id === first.id || c.id === second.id
                ? { ...c, isMatched: true, isFlipped: true }
                : c
            )
          );
          setFlippedCards([]);
          setIsChecking(false);
          const newMatches = matchesCount + 1;
          setMatchesCount(newMatches);

          const totalPairsCount = config?.pairs?.length || allLevels?.[activeLevel]?.pairs?.length || (cards.length / 2);
          if (newMatches === totalPairsCount) {
            handleGameWin();
          }
        }, 500);
      } else {
        // Mismatched!
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.id === first.id || c.id === second.id
                ? { ...c, isFlipped: false }
                : c
            )
          );
          setFlippedCards([]);
          setMistakes((m) => m + 1);
          setIsChecking(false);
        }, 1000);
      }
    }
  };

  const handleGameWin = () => {
    setIsActive(false);
    setIsCompleted(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });

    if (user) {
      const calcPercentage = Math.max(50, 100 - mistakes * 5);
      const currentPairsCount = config?.pairs?.length || allLevels?.[activeLevel]?.pairs?.length || 8;

      saveQuizProgress({
        userId: user.uid,
        studentName: profile?.full_name || user.displayName || 'Diák',
        studentEmail: profile?.email || user.email || '',
        userCode: profile?.user_code || '',
        grade: grade || 7,
        chapterId: chapterId || 'gondolkodjunk',
        topicId: topicId || (title || 'matcher').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        topicTitle: topicTitle || title,
        gameType: 'matcher',
        level: activeLevel || 1,
        percentage: calcPercentage,
        scorePoints: currentPairsCount,
        totalQuestions: currentPairsCount
      }).catch(err => console.error(err));
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

  const totalPairs = config?.pairs?.length || allLevels?.[activeLevel]?.pairs?.length || (cards.length / 2);
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
            <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
              <ArrowRightLeft className="w-5 h-5" />
            </div>
          )}
          <div>
            {badge && (
              <div className="text-[11px] font-bold text-purple-600 dark:text-purple-400">
                {badge}
              </div>
            )}
            <div className="text-sm font-black text-slate-800 dark:text-slate-200">
              <MathText>{displayTitle}</MathText> {allLevels ? `(${activeLevel}. szint)` : ''}
            </div>
            {displaySubtitle && (
              <div className="text-xs text-slate-500 dark:text-slate-400">
                <MathText>{displaySubtitle}</MathText>
              </div>
            )}
          </div>
        </div>

        {/* Stats & Actions */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 shadow-xs">
            <Clock className="w-3.5 h-3.5 text-blue-500" />
            <span>{formatTime(seconds)}</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 shadow-xs">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            <span>
              {matchesCount} / {totalPairs} pár
            </span>
          </div>

          {mistakes > 0 && (
            <div className="px-2.5 py-1.5 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-400 rounded-xl text-xs font-bold">
              {mistakes} hiba
            </div>
          )}

          <Button
            variant="outline"
            size="sm"
            onClick={initGame}
            className="rounded-xl h-8 px-2.5 text-xs font-bold gap-1 border-slate-200 dark:border-slate-700"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Újrakezdés
          </Button>

          {onOpenRules && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onOpenRules}
              className="rounded-xl h-8 px-2.5 text-xs font-bold gap-1 text-slate-700 dark:text-slate-300"
            >
              <BookOpen className="w-3.5 h-3.5" />
              Szabályzat
            </Button>
          )}

          {onSwitchToTheory && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onSwitchToTheory}
              className="rounded-xl h-8 px-2.5 text-xs font-bold gap-1 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-950/40"
            >
              <BookOpen className="w-3.5 h-3.5" />
              Tananyag
            </Button>
          )}
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
              'border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 hover:border-purple-400 shadow-2xs hover:shadow-xs';

            if (card.isMatched) {
              cardClass =
                'border-2 border-emerald-500/80 bg-emerald-50/60 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 opacity-60 pointer-events-none scale-95';
            } else if (card.isFlipped) {
              cardClass =
                'border-2 border-purple-500 bg-purple-50/50 dark:bg-purple-950/30 text-purple-950 dark:text-purple-100 ring-2 ring-purple-500/20';
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
                    <div className="max-h-full overflow-hidden flex items-center justify-center text-center">
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
          <div className="w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center mx-auto text-2xl shadow-inner">
            <Trophy className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              Gratulálunk! Sikeres párosítás! 🎉
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Minden párt megtaláltál <strong className="text-slate-700 dark:text-slate-200">{formatTime(seconds)}</strong> alatt, mindössze <strong className="text-slate-700 dark:text-slate-200">{mistakes}</strong> hibával.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
            {allLevels && activeLevel < 3 && (
              <Button
                onClick={handleNextLevel}
                className="h-10 px-5 rounded-xl font-bold text-sm bg-purple-600 hover:bg-purple-700 text-white flex items-center justify-center gap-1.5"
              >
                Következő szint ({activeLevel + 1}. szint)
                <ArrowRight className="w-4 h-4" />
              </Button>
            )}

            <Button
              variant="outline"
              onClick={initGame}
              className="h-10 px-5 rounded-xl font-bold text-sm border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center gap-1.5"
            >
              <RotateCcw className="w-4 h-4 mr-1 text-slate-500" />
              Újrapróbálom
            </Button>

            {onSwitchToQuiz && (
              <Button
                variant="outline"
                onClick={onSwitchToQuiz}
                className="h-10 px-5 rounded-xl font-bold text-sm border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Vissza a Kvízhez
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
