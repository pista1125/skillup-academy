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
  themeColor = 'teal',
  grade = 7,
  chapterId = 'g7-geom-trans',
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
  }, [activeLevel, level, currentLevel, config, levels, levelsConfig]);

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
    const ch = chapterId || 'g7-geom-trans';
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
      <div className="bg-gradient-to-r from-teal-50/80 via-white to-emerald-50/80 dark:bg-slate-850 rounded-2xl p-2.5 sm:p-3 border-2 border-teal-200/90 dark:border-teal-800/80 flex flex-wrap items-center justify-between gap-2.5 shadow-xs">
        <div className="flex items-center gap-2.5">
          {onBack ? (
            <Button
              variant="outline"
              size="sm"
              onClick={onBack}
              className="rounded-xl h-8 px-2.5 text-xs font-bold gap-1 border-teal-200 dark:border-teal-800 hover:bg-teal-50"
            >
              <ArrowLeft className="w-4 h-4 mr-0.5 text-teal-600" />
              Vissza
            </Button>
          ) : (
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 text-white flex items-center justify-center font-bold shadow-xs">
              <ArrowRightLeft className="w-4 h-4" />
            </div>
          )}
          <div>
            {badge && (
              <div className="text-[10px] font-black uppercase tracking-wider text-teal-700 dark:text-teal-300">
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
              className="rounded-xl h-8 px-2.5 text-xs font-bold gap-1 border-teal-200 text-teal-800 bg-teal-50/50 hover:bg-teal-100 cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5 text-teal-600" />
              Szabályzat
            </Button>
          )}

          {onSwitchToTheory && (
            <Button
              variant="outline"
              size="sm"
              onClick={onSwitchToTheory}
              className="rounded-xl h-8 px-2.5 text-xs font-bold gap-1 border-violet-200 text-violet-800 bg-violet-50/50 hover:bg-violet-100 cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5 text-violet-600" />
              Tananyag
            </Button>
          )}
        </div>
      </div>

      {/* Cards Grid */}
      {!isCompleted ? (
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-2.5">
          {cards.map((card) => {
            let cardClass =
              'border-2 border-teal-200/90 dark:border-teal-800/80 bg-gradient-to-br from-white via-teal-50/30 to-emerald-50/40 text-slate-900 dark:text-slate-100 hover:border-teal-500 dark:hover:border-teal-400 hover:shadow-md hover:from-teal-50/60 hover:to-emerald-50/70 hover:-translate-y-0.5 active:translate-y-0';

            if (card.isMatched) {
              cardClass =
                'border-2 border-emerald-400/80 bg-gradient-to-br from-emerald-100/90 to-teal-100/90 dark:bg-emerald-950/60 text-emerald-950 dark:text-emerald-200 opacity-60 pointer-events-none scale-95 shadow-inner';
            } else if (card.isFlipped) {
              cardClass =
                'border-2 border-teal-500 bg-gradient-to-br from-teal-100 via-cyan-50 to-emerald-100 text-teal-950 dark:text-teal-50 ring-3 ring-teal-400/40 shadow-lg scale-[1.02]';
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
                      <div className="max-h-7 sm:max-h-8 max-w-full flex items-center justify-center overflow-hidden [&>svg]:w-full [&>svg]:h-full p-0.5 rounded-md bg-white/90 dark:bg-slate-800/90 border border-teal-100/80 dark:border-teal-900/60 shadow-2xs">
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
        <div className="bg-gradient-to-b from-teal-50/80 to-white dark:from-slate-850 dark:to-slate-900 border-2 border-teal-300 dark:border-teal-800/80 rounded-3xl p-6 sm:p-8 text-center space-y-6 shadow-xl animate-in zoom-in-95 duration-300">
          <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-amber-400 to-teal-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-teal-500/30">
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
              <div className="text-[11px] text-slate-500 dark:text-slate-400 font-bold uppercase">Időeredmény</div>
              <div className="text-lg font-black text-teal-600 dark:text-teal-400 font-mono">
                {formatTime(seconds)}
              </div>
            </div>

            <div className="p-3 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 flex-1">
              <div className="text-[11px] text-slate-500 dark:text-slate-400 font-bold uppercase">Hibák</div>
              <div className="text-lg font-black text-slate-800 dark:text-slate-200 font-mono">
                {mistakes} db
              </div>
            </div>
          </div>

          {/* Profile Save Confirmation */}
          <div className="flex items-center justify-center gap-2 max-w-sm mx-auto py-2 px-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80 text-emerald-700 dark:text-emerald-300 text-xs font-bold">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>
              {user ? 'Párosító eredményed elmentve a profilodba! 🎉' : 'Jelentkezz be a haladás mentéséhez!'}
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
            <Button
              onClick={() => setShowLeaderboard(true)}
              className="rounded-xl h-10 px-5 font-bold bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-md text-xs sm:text-sm gap-1.5 cursor-pointer"
            >
              <Trophy className="w-4 h-4 text-amber-100" />
              Rangsor Megtekintése
            </Button>

            <Button
              onClick={initGame}
              variant="outline"
              className="rounded-xl h-10 px-5 font-bold border-2 border-slate-300 dark:border-slate-700 text-xs sm:text-sm cursor-pointer"
            >
              <RotateCcw className="w-4 h-4 mr-1.5" />
              Párosítás Újra
            </Button>

            {activeLevel < 3 && onNextLevel && (
              <Button
                onClick={onNextLevel}
                className="rounded-xl h-10 px-5 font-bold bg-teal-600 hover:bg-teal-700 text-white shadow-md text-xs sm:text-sm cursor-pointer"
              >
                Következő Szint ({activeLevel + 1}. szint)
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            )}

            {onSwitchToTheory && (
              <Button
                variant="ghost"
                onClick={onSwitchToTheory}
                className="rounded-xl h-10 px-4 font-bold text-xs sm:text-sm text-teal-600 dark:text-teal-400 hover:bg-teal-50 dark:hover:bg-teal-950/40 cursor-pointer"
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
