import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Button } from '@/components/ui/button';
import {
  RotateCcw,
  Trophy,
  Sparkles,
  Clock,
  Zap,
  BookOpen,
  ArrowRight,
  CheckCircle2,
  LayoutGrid
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { DifficultyLevel } from './Chapter1SummaryQuiz';

interface CardItem {
  id: string;
  pairId: string;
  content: string;
  type: 'question' | 'answer';
  isFlipped: boolean;
  isMatched: boolean;
}

interface MatcherLevelConfig {
  pairs: { id: string; question: string; answer: string }[];
}

const MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    pairs: [
      { id: 'm1-1', question: 'Római V', answer: '5' },
      { id: 'm1-2', question: 'Római X', answer: '10' },
      { id: 'm1-3', question: 'Római L', answer: '50' },
      { id: 'm1-4', question: 'Római C', answer: '100' },
      { id: 'm1-5', question: 'Római D', answer: '500' },
      { id: 'm1-6', question: 'Római M', answer: '1000' },
      { id: 'm1-7', question: '-5 ellentettje', answer: '+5' },
      { id: 'm1-8', question: '|-12| abszolút érték', answer: '12' }
    ]
  },
  2: {
    pairs: [
      { id: 'm2-1', question: 'Római XLIX', answer: '49' },
      { id: 'm2-2', question: 'Római CMXCIX', answer: '999' },
      { id: 'm2-3', question: '101₂ kettesben', answer: '5 tízesben' },
      { id: 'm2-4', question: '475 kerekítve 100-ra', answer: '500' },
      { id: 'm2-5', question: '25 · 4', answer: '100' },
      { id: 'm2-6', question: '144 : 12', answer: '12' },
      { id: 'm2-7', question: '(-8) + (-7)', answer: '-15' },
      { id: 'm2-8', question: '(-5) - (-9)', answer: '+4' }
    ]
  },
  3: {
    pairs: [
      { id: 'm3-1', question: 'Római MMXXVI', answer: '2026' },
      { id: 'm3-2', question: '11010₂ kettesben', answer: '26 tízesben' },
      { id: 'm3-3', question: '9489 kerekítve 1000-re', answer: '9000' },
      { id: 'm3-4', question: '20 - 4 · (3 + 2)', answer: '0' },
      { id: 'm3-5', question: '[50 - (6 · 8)] · 10', answer: '20' },
      { id: 'm3-6', question: '|-18| + |-12|', answer: '30' },
      { id: 'm3-7', question: '(-25) - (+35)', answer: '-60' },
      { id: 'm3-8', question: '(-12) - (-20) + (-8)', answer: '0' }
    ]
  }
};

function shuffleCards(pairs: { id: string; question: string; answer: string }[]): CardItem[] {
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
      id: `${p.id}-a`,
      pairId: p.id,
      content: p.answer,
      type: 'answer',
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

interface Chapter1SummaryMatcherProps {
  level: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export function Chapter1SummaryMatcher({
  level,
  onNextLevel,
  onOpenRules
}: Chapter1SummaryMatcherProps) {
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
    let interval: any = null;
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
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 text-xs font-bold border border-amber-200 dark:border-amber-800">
            <Clock className="w-3.5 h-3.5 text-amber-600" />
            <span>{formatTime(timer)}</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold">
            <Zap className="w-3.5 h-3.5 text-indigo-500" />
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

      {/* Grid of Cards (16 cards, face-down by default) */}
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
                    ? "bg-amber-50 dark:bg-amber-950/60 border-amber-400 text-amber-900 dark:text-amber-200 shadow-md ring-2 ring-amber-400/30"
                    : "bg-indigo-50 dark:bg-indigo-950/60 border-indigo-400 text-indigo-900 dark:text-indigo-200 shadow-md ring-2 ring-indigo-400/30"
                  : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-amber-400 hover:shadow-md text-slate-400 dark:text-slate-600"
              )}
            >
              {isFlipped ? (
                <div className="animate-in zoom-in duration-150">
                  <div
                    className={cn(
                      "font-black leading-snug",
                      card.type === 'answer'
                        ? "text-base sm:text-lg font-mono text-indigo-600 dark:text-indigo-400"
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
                  <Sparkles className="w-5 h-5 text-amber-500" />
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
        <div className="p-6 bg-gradient-to-br from-amber-500 via-indigo-600 to-purple-600 rounded-3xl text-white shadow-xl animate-in zoom-in duration-300 text-center space-y-4">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto shadow-inner">
            <Trophy className="w-9 h-9 text-yellow-300 animate-bounce" />
          </div>

          <div>
            <h3 className="text-xl sm:text-2xl font-black">Gratulálunk! Minden párt megtaláltál! 🎉</h3>
            <p className="text-amber-100 text-xs sm:text-sm mt-1">
              Idő: <strong>{formatTime(timer)}</strong> • Lépések száma: <strong>{moves}</strong>
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            {level < 3 && onNextLevel && (
              <Button
                onClick={onNextLevel}
                className="h-10 px-5 rounded-xl font-bold bg-white text-indigo-900 hover:bg-slate-100 shadow-md flex items-center gap-1.5"
              >
                Következő szint ({level + 1}. szint)
                <ArrowRight className="w-4 h-4" />
              </Button>
            )}

            <Button
              variant="outline"
              onClick={handleRestart}
              className="h-10 px-4 rounded-xl font-bold bg-white/10 border-white/30 text-white hover:bg-white/20"
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

export default Chapter1SummaryMatcher;
