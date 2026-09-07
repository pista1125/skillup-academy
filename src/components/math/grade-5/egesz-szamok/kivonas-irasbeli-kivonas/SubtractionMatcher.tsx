import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Button } from '@/components/ui/button';
import {
  RotateCcw,
  Trophy,
  CheckCircle2,
  Clock,
  BookOpen,
  ArrowRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { DifficultyLevel } from './SubtractionQuiz';

interface CardItem {
  id: string;
  pairId: string;
  content: string;
  type: 'question' | 'result';
  isFlipped: boolean;
  isMatched: boolean;
}

interface MatcherLevelConfig {
  pairs: { id: string; question: string; result: string }[];
}

const MATCHER_LEVELS: Record<DifficultyLevel, MatcherLevelConfig> = {
  1: {
    pairs: [
      { id: 'm1-1', question: '750 - 320', result: '430' },
      { id: 'm1-2', question: '600 - 240', result: '360' },
      { id: 'm1-3', question: '520 - 180', result: '340' },
      { id: 'm1-4', question: '900 - 450', result: '450' },
      { id: 'm1-5', question: '92 - 38', result: '54' },
      { id: 'm1-6', question: '830 - 270', result: '560' },
      { id: 'm1-7', question: '415 - 125', result: '290' },
      { id: 'm1-8', question: '1 000 - 365', result: '635' }
    ]
  },
  2: {
    pairs: [
      { id: 'm2-1', question: '8 433 - 3 648', result: '4 785' },
      { id: 'm2-2', question: '20 000 - 7 800', result: '12 200' },
      { id: 'm2-3', question: '5 432 - 1 876', result: '3 556' },
      { id: 'm2-4', question: '6 000 - 2 345', result: '3 655' },
      { id: 'm2-5', question: '10 000 - 4 321', result: '5 679' },
      { id: 'm2-6', question: '7 500 - 2 850', result: '4 650' },
      { id: 'm2-7', question: '9 123 - 4 567', result: '4 556' },
      { id: 'm2-8', question: '15 000 - 6 450', result: '8 550' }
    ]
  },
  3: {
    pairs: [
      { id: 'm3-1', question: '6 241 320 - 3 456 780', result: '2 784 540' },
      { id: 'm3-2', question: '5 000 000 - 1', result: '4 999 999' },
      { id: 'm3-3', question: '10 000 000 - 2 105 500', result: '7 894 500' },
      { id: 'm3-4', question: '8 000 000 - 4 340 000', result: '3 660 000' },
      { id: 'm3-5', question: '4 500 000 - 1 750 000', result: '2 750 000' },
      { id: 'm3-6', question: '7 800 000 - 3 950 000', result: '3 850 000' },
      { id: 'm3-7', question: '3 000 000 - 875 000', result: '2 125 000' },
      { id: 'm3-8', question: '9 500 000 - 4 650 000', result: '4 850 000' }
    ]
  }
};

function shuffleCards(pairs: { id: string; question: string; result: string }[]): CardItem[] {
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
      content: p.result,
      type: 'result',
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

interface SubtractionMatcherProps {
  level: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export function SubtractionMatcher({ level, onNextLevel, onOpenRules }: SubtractionMatcherProps) {
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

  // Timer tick
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && !isCompleted) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, isCompleted]);

  const handleCardClick = (card: CardItem) => {
    if (card.isFlipped || card.isMatched || flippedCards.length >= 2) return;

    const newCards = cards.map((c) => (c.id === card.id ? { ...c, isFlipped: true } : c));
    setCards(newCards);

    const newFlipped = [...flippedCards, card];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setMoves((prev) => prev + 1);
      const [first, second] = newFlipped;

      if (first.pairId === second.pairId && first.type !== second.type) {
        // MATCH!
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.pairId === first.pairId ? { ...c, isMatched: true, isFlipped: true } : c
            )
          );
          setFlippedCards([]);
          const nextMatched = matchedCount + 1;
          setMatchedCount(nextMatched);

          const totalPairs = MATCHER_LEVELS[level].pairs.length;
          if (nextMatched === totalPairs) {
            setIsCompleted(true);
            setIsRunning(false);
            confetti({
              particleCount: 100,
              spread: 70,
              origin: { y: 0.6 }
            });
          }
        }, 500);
      } else {
        // NO MATCH -> Flip back after delay
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) => (c.id === first.id || c.id === second.id ? { ...c, isFlipped: false } : c))
          );
          setFlippedCards([]);
        }, 1100);
      }
    }
  };

  const handleReset = () => {
    const levelConfig = MATCHER_LEVELS[level];
    setCards(shuffleCards(levelConfig.pairs));
    setFlippedCards([]);
    setMatchedCount(0);
    setMoves(0);
    setTimer(0);
    setIsRunning(true);
    setIsCompleted(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const totalPairs = MATCHER_LEVELS[level].pairs.length;

  return (
    <div className="space-y-4 animate-in fade-in duration-300">
      {/* Top Banner with Stats */}
      <div className="bg-gradient-to-r from-rose-900/90 via-pink-900/90 to-slate-900 text-white p-3.5 sm:p-4 rounded-2xl shadow-md border border-rose-800/60 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 bg-rose-950/70 border border-rose-700/60 px-3 py-1.5 rounded-xl text-xs font-mono font-black text-pink-300 shadow-inner">
            <Clock className="w-3.5 h-3.5 text-pink-400" />
            <span>{formatTime(timer)}</span>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-300">
            <span>Lépések:</span>
            <span className="font-mono text-white font-black">{moves}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="text-xs font-bold text-slate-300">
            Megtalálva: <span className="font-mono text-emerald-400 font-black">{matchedCount} / {totalPairs} pár</span>
          </div>

          {onOpenRules && (
            <Button
              size="sm"
              variant="ghost"
              onClick={onOpenRules}
              className="h-8 px-2.5 text-xs text-rose-200 hover:text-white hover:bg-rose-800/50 rounded-xl"
            >
              <BookOpen className="w-3.5 h-3.5 mr-1" />
              Szabályzat
            </Button>
          )}
        </div>
      </div>

      {/* Main Grid: 16 cards (4x4) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3.5">
        {cards.map((card) => {
          const isSelected = flippedCards.some((c) => c.id === card.id);

          return (
            <div
              key={card.id}
              onClick={() => handleCardClick(card)}
              className={cn(
                "relative aspect-4/3 rounded-2xl p-2 flex items-center justify-center text-center cursor-pointer transition-all duration-300 select-none shadow-sm font-mono font-black",
                card.isMatched
                  ? "bg-emerald-50 dark:bg-emerald-950/40 border-2 border-emerald-400 text-emerald-700 dark:text-emerald-300 scale-95 opacity-80"
                  : card.isFlipped || isSelected
                  ? card.type === 'question'
                    ? "bg-rose-50 dark:bg-rose-950/80 border-2 border-rose-400 text-rose-900 dark:text-rose-100 text-sm sm:text-base scale-100 shadow-md ring-2 ring-rose-400/40"
                    : "bg-pink-50 dark:bg-pink-950/80 border-2 border-pink-400 text-pink-900 dark:text-pink-100 text-base sm:text-lg scale-100 shadow-md ring-2 ring-pink-400/40"
                  : "bg-gradient-to-br from-slate-800 to-slate-900 hover:from-slate-750 hover:to-slate-850 text-white border-2 border-slate-700 hover:border-rose-400/80 hover:scale-[1.02]"
              )}
            >
              {card.isFlipped || card.isMatched ? (
                <div className="animate-in zoom-in-75 duration-150 flex flex-col items-center justify-center p-1">
                  <span className="text-xs sm:text-sm md:text-base leading-snug">
                    {card.content}
                  </span>
                  {card.isMatched && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-1" />
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center gap-1 opacity-60">
                  <span className="text-xl sm:text-2xl">➖</span>
                  <span className="text-[10px] font-sans font-bold text-slate-400 uppercase tracking-wider">SkillUp</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Completion Modal / Banner */}
      {isCompleted && (
        <div className="p-5 sm:p-6 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-slate-900 dark:to-slate-850 rounded-3xl border-2 border-emerald-300 dark:border-emerald-800 shadow-xl animate-in zoom-in-95 duration-200 text-center space-y-4">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/30">
            <Trophy className="w-8 h-8" />
          </div>

          <div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              Gratulálunk! Mind a {totalPairs} párt megtaláltad! 🏆
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
              Idő: <strong className="text-slate-800 dark:text-slate-200">{formatTime(timer)}</strong> • Lépések: <strong className="text-slate-800 dark:text-slate-200">{moves} lépés</strong>
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Button
              variant="outline"
              onClick={handleReset}
              className="rounded-xl h-10 px-4 text-xs font-bold border-slate-300 dark:border-slate-700"
            >
              <RotateCcw className="w-4 h-4 mr-1.5 text-slate-500" />
              Újrapróbálom
            </Button>

            {level < 3 && onNextLevel && (
              <Button
                onClick={onNextLevel}
                className="rounded-xl h-10 px-5 text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white shadow-md flex items-center gap-1.5"
              >
                Következő szint ({level + 1}. szint)
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default SubtractionMatcher;
