import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  RotateCcw,
  Trophy,
  Sparkles,
  CheckCircle2,
  Clock,
  Zap,
  BookOpen,
  ArrowRight,
  Flame,
  Layers,
  Target
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { DifficultyLevel } from './RoundingQuiz';

interface CardItem {
  id: string;
  pairId: string;
  content: string;
  type: 'question' | 'rounded';
  isFlipped: boolean;
  isMatched: boolean;
}

interface MatcherLevelConfig {
  pairs: { id: string; question: string; rounded: string }[];
}

const MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    pairs: [
      { id: 'm1-1', question: '47 tízesekre', rounded: '50' },
      { id: 'm1-2', question: '132 tízesekre', rounded: '130' },
      { id: 'm1-3', question: '586 százasokra', rounded: '600' },
      { id: 'm1-4', question: '235 százasokra', rounded: '200' },
      { id: 'm1-5', question: '750 százasokra', rounded: '800' },
      { id: 'm1-6', question: '84 tízesekre', rounded: '80' },
      { id: 'm1-7', question: '419 százasokra', rounded: '400' },
      { id: 'm1-8', question: '695 tízesekre', rounded: '700' }
    ]
  },
  2: {
    pairs: [
      { id: 'm2-1', question: '4 376 százasokra', rounded: '4 400' },
      { id: 'm2-2', question: '18 492 ezresekre', rounded: '18 000' },
      { id: 'm2-3', question: '2 985 százasokra', rounded: '3 000' },
      { id: 'm2-4', question: '496 tízesekre', rounded: '500' },
      { id: 'm2-5', question: '74 500 tízezresekre', rounded: '70 000' },
      { id: 'm2-6', question: '38 720 tízezresekre', rounded: '40 000' },
      { id: 'm2-7', question: '12 500 ezresekre', rounded: '13 000' },
      { id: 'm2-8', question: '9 972 százasokra', rounded: '10 000' }
    ]
  },
  3: {
    pairs: [
      { id: 'm3-1', question: 'Legkisebb szám, ami tízesre 80', rounded: '75' },
      { id: 'm3-2', question: 'Legnagyobb szám, ami tízesre 80', rounded: '84' },
      { id: 'm3-3', question: 'Legkisebb szám, ami százasra 400', rounded: '350' },
      { id: 'm3-4', question: 'Legnagyobb szám, ami százasra 400', rounded: '449' },
      { id: 'm3-5', question: '349 800 százezresekre', rounded: '300 000' },
      { id: 'm3-6', question: '750 000 százezresekre', rounded: '800 000' },
      { id: 'm3-7', question: '49 · 31 becsült értéke (tízesre)', rounded: '1 500' },
      { id: 'm3-8', question: '792 : 39 becsült értéke (százas/tízes)', rounded: '20' }
    ]
  }
};

function shuffleCards(pairs: { id: string; question: string; rounded: string }[]): CardItem[] {
  const cards: CardItem[] = [];
  pairs.forEach((p) => {
    cards.push({
      id: `${p.id}-q`,
      pairId: p.id,
      content: p.question,
      type: 'question',
      isFlipped: false,
      isMatched: false
    });
    cards.push({
      id: `${p.id}-r`,
      pairId: p.id,
      content: p.rounded,
      type: 'rounded',
      isFlipped: false,
      isMatched: false
    });
  });

  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
  return cards;
}

interface RoundingMatcherProps {
  level: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export function RoundingMatcher({ level, onNextLevel, onOpenRules }: RoundingMatcherProps) {
  const [cards, setCards] = useState<CardItem[]>([]);
  const [flippedCards, setFlippedCards] = useState<CardItem[]>([]);
  const [matchedCount, setMatchedCount] = useState(0);
  const [moves, setMoves] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  // Initialize deck on level change
  useEffect(() => {
    const levelConfig = MATCHER_LEVELS[level];
    setCards(shuffleCards(levelConfig.pairs));
    setFlippedCards([]);
    setMatchedCount(0);
    setMoves(0);
    setTimer(0);
    setIsRunning(true);
    setIsCompleted(false);
  }, [level]);

  // Stopwatch timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && !isCompleted) {
      interval = setInterval(() => {
        setTimer((t) => t + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, isCompleted]);

  // Confetti on win
  useEffect(() => {
    if (isCompleted) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [isCompleted]);

  const handleCardClick = (clickedCard: CardItem) => {
    if (clickedCard.isFlipped || clickedCard.isMatched || flippedCards.length === 2) {
      return;
    }

    const newCards = cards.map((c) =>
      c.id === clickedCard.id ? { ...c, isFlipped: true } : c
    );
    setCards(newCards);

    const newFlipped = [...flippedCards, clickedCard];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((m) => m + 1);
      const [first, second] = newFlipped;

      if (first.pairId === second.pairId) {
        // MATCH!
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.pairId === first.pairId ? { ...c, isMatched: true } : c
            )
          );
          setFlippedCards([]);
          const nextMatched = matchedCount + 1;
          setMatchedCount(nextMatched);

          const totalPairs = MATCHER_LEVELS[level].pairs.length;
          if (nextMatched === totalPairs) {
            setIsCompleted(true);
            setIsRunning(false);
          }
        }, 400);
      } else {
        // NO MATCH -> Flip back
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.id === first.id || c.id === second.id ? { ...c, isFlipped: false } : c
            )
          );
          setFlippedCards([]);
        }, 900);
      }
    }
  };

  const handleRestart = () => {
    const levelConfig = MATCHER_LEVELS[level];
    setCards(shuffleCards(levelConfig.pairs));
    setFlippedCards([]);
    setMatchedCount(0);
    setMoves(0);
    setTimer(0);
    setIsRunning(true);
    setIsCompleted(false);
  };

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const totalPairs = MATCHER_LEVELS[level].pairs.length;

  return (
    <div className="space-y-4">
      {/* Top Status & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-white dark:bg-slate-900 rounded-2xl border-2 border-slate-200/80 dark:border-slate-800 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-teal-50 dark:bg-teal-950/50 text-teal-800 dark:text-teal-300 text-xs font-bold border border-teal-200 dark:border-teal-800">
            <Clock className="w-3.5 h-3.5 text-teal-600" />
            <span>{formatTime(timer)}</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold">
            <Zap className="w-3.5 h-3.5 text-amber-500" />
            <span>{moves} lépés</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 text-xs font-bold border border-emerald-200 dark:border-emerald-800">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>{matchedCount} / {totalPairs} pár</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {onOpenRules && (
            <Button
              variant="outline"
              size="sm"
              onClick={onOpenRules}
              className="rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400"
            >
              <BookOpen className="w-3.5 h-3.5 mr-1" />
              Szabályok
            </Button>
          )}

          <Button
            variant="ghost"
            size="sm"
            onClick={handleRestart}
            className="rounded-xl h-8 px-2.5 text-xs text-slate-600 dark:text-slate-400"
          >
            <RotateCcw className="w-3.5 h-3.5 mr-1" />
            Újra
          </Button>
        </div>
      </div>

      {/* Grid of Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
        {cards.map((card) => {
          const isFlipped = card.isFlipped || card.isMatched;

          return (
            <div
              key={card.id}
              onClick={() => handleCardClick(card)}
              className={cn(
                "h-24 sm:h-28 rounded-2xl p-3 border-2 transition-all duration-200 flex items-center justify-center text-center cursor-pointer select-none",
                card.isMatched
                  ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-400 text-emerald-900 dark:text-emerald-200 opacity-80"
                  : isFlipped
                  ? card.type === 'question'
                    ? "bg-teal-50 dark:bg-teal-950/60 border-teal-400 text-teal-900 dark:text-teal-200 shadow-md ring-2 ring-teal-400/30"
                    : "bg-emerald-50 dark:bg-emerald-950/60 border-emerald-400 text-emerald-900 dark:text-emerald-200 shadow-md ring-2 ring-emerald-400/30"
                  : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-teal-400 hover:shadow-md text-slate-400 dark:text-slate-600"
              )}
            >
              {isFlipped ? (
                <div className="animate-in zoom-in duration-150">
                  <div
                    className={cn(
                      "font-black",
                      card.type === 'rounded'
                        ? "text-lg sm:text-xl font-mono text-emerald-600 dark:text-emerald-400"
                        : "text-xs sm:text-sm text-slate-800 dark:text-slate-100"
                    )}
                  >
                    {card.content}
                  </div>
                  {card.isMatched && (
                    <div className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 mt-1 flex items-center justify-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Pár megtalálva!
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center gap-1 opacity-60">
                  <Sparkles className="w-5 h-5 text-teal-500" />
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Nyisd ki!
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Completion Modal / Banner */}
      {isCompleted && (
        <div className="p-6 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl text-white shadow-xl animate-in zoom-in duration-300 text-center space-y-4">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto shadow-inner">
            <Trophy className="w-9 h-9 text-yellow-300 animate-bounce" />
          </div>

          <div>
            <h3 className="text-xl sm:text-2xl font-black">Gratulálunk! Minden párt megtaláltál! 🎉</h3>
            <p className="text-teal-100 text-xs sm:text-sm mt-1">
              Idő: <strong>{formatTime(timer)}</strong> • Lépések száma: <strong>{moves}</strong>
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            {level < 3 && onNextLevel && (
              <Button
                onClick={onNextLevel}
                className="h-10 px-5 rounded-xl font-bold bg-white text-teal-800 hover:bg-teal-50 shadow-md flex items-center gap-1.5"
              >
                Következő szint ({level + 1}. szint)
                <ArrowRight className="w-4 h-4" />
              </Button>
            )}

            <Button
              variant="outline"
              onClick={handleRestart}
              className="h-10 px-4 rounded-xl font-bold bg-teal-700/50 border-white/30 text-white hover:bg-teal-700"
            >
              <RotateCcw className="w-4 h-4 mr-1.5" />
              Újrajátszás
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default RoundingMatcher;
