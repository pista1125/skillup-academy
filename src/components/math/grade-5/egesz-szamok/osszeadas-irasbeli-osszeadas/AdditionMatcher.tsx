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
import { DifficultyLevel } from './AdditionQuiz';

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
      { id: 'm1-1', question: '340 + 250', result: '590' },
      { id: 'm1-2', question: '470 + 130', result: '600' },
      { id: 'm1-3', question: '128 + 352', result: '480' },
      { id: 'm1-4', question: '615 + 285', result: '900' },
      { id: 'm1-5', question: '54 + 38', result: '92' },
      { id: 'm1-6', question: '390 + 410', result: '800' },
      { id: 'm1-7', question: '246 + 134', result: '380' },
      { id: 'm1-8', question: '725 + 175', result: '900' }
    ]
  },
  2: {
    pairs: [
      { id: 'm2-1', question: '4 785 + 3 648', result: '8 433' },
      { id: 'm2-2', question: '12 500 + 7 800', result: '20 300' },
      { id: 'm2-3', question: '3 450 + 6 550', result: '10 000' },
      { id: 'm2-4', question: '18 420 + 5 380', result: '23 800' },
      { id: 'm2-5', question: '9 900 + 1 100', result: '11 000' },
      { id: 'm2-6', question: '34 200 + 15 800', result: '50 000' },
      { id: 'm2-7', question: '6 750 + 2 250', result: '9 000' },
      { id: 'm2-8', question: '42 300 + 8 700', result: '51 000' }
    ]
  },
  3: {
    pairs: [
      { id: 'm3-1', question: '145 000 + 255 000', result: '400 000' },
      { id: 'm3-2', question: '780 000 + 220 000', result: '1 000 000' },
      { id: 'm3-3', question: '1 250 000 + 750 000', result: '2 000 000' },
      { id: 'm3-4', question: '499 999 + 1', result: '500 000' },
      { id: 'm3-5', question: '3 400 000 + 1 600 000', result: '5 000 000' },
      { id: 'm3-6', question: '890 000 + 110 000', result: '1 000 000' },
      { id: 'm3-7', question: '2 750 000 + 250 000', result: '3 000 000' },
      { id: 'm3-8', question: '4 850 000 + 150 000', result: '5 000 000' }
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

interface AdditionMatcherProps {
  level: DifficultyLevel;
  onNextLevel?: () => void;
  onOpenRules?: () => void;
}

export function AdditionMatcher({ level, onNextLevel, onOpenRules }: AdditionMatcherProps) {
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
      <div className="bg-gradient-to-r from-blue-900/90 via-indigo-900/90 to-slate-900 text-white p-3.5 sm:p-4 rounded-2xl shadow-md border border-blue-800/60 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 bg-blue-950/70 border border-blue-700/60 px-3 py-1.5 rounded-xl text-xs font-mono font-black text-cyan-300 shadow-inner">
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
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
              className="h-8 px-2.5 text-xs text-blue-200 hover:text-white hover:bg-blue-800/50 rounded-xl"
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
                    ? "bg-blue-50 dark:bg-blue-950/80 border-2 border-blue-400 text-blue-900 dark:text-blue-100 text-sm sm:text-base scale-100 shadow-md ring-2 ring-blue-400/40"
                    : "bg-indigo-50 dark:bg-indigo-950/80 border-2 border-indigo-400 text-indigo-900 dark:text-indigo-100 text-base sm:text-lg scale-100 shadow-md ring-2 ring-indigo-400/40"
                  : "bg-gradient-to-br from-slate-800 to-slate-900 hover:from-slate-750 hover:to-slate-850 text-white border-2 border-slate-700 hover:border-blue-400/80 hover:scale-[1.02]"
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
                  <span className="text-xl sm:text-2xl">➕</span>
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
                className="rounded-xl h-10 px-5 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md flex items-center gap-1.5"
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
