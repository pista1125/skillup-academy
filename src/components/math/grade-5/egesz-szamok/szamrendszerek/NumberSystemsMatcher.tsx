import React, { useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { Button } from '@/components/ui/button';
import {
  RotateCcw,
  Trophy,
  Sparkles,
  CheckCircle2,
  Timer,
  Zap,
  ArrowRight,
  Star,
  Binary
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { DifficultyLevel } from './NumberSystemsQuiz';

interface MatchCard {
  uid: string;
  pairId: number;
  type: 'binary' | 'decimal';
  content: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export interface PairItem {
  id: number;
  binary: string;
  decimal: string;
  rule?: string;
}

export const LEVEL_PAIRS: Record<DifficultyLevel, PairItem[]> = {
  1: [
    { id: 1, binary: '101₂', decimal: '5', rule: '4 + 1 = 5' },
    { id: 2, binary: '1000₂', decimal: '8', rule: '2³ = 8' },
    { id: 3, binary: '1111₂', decimal: '15', rule: '8 + 4 + 2 + 1 = 15' },
    { id: 4, binary: '110₂', decimal: '6', rule: '4 + 2 = 6' },
    { id: 5, binary: '1010₂', decimal: '10', rule: '8 + 2 = 10' },
    { id: 6, binary: '11₂', decimal: '3', rule: '2 + 1 = 3' },
    { id: 7, binary: '1100₂', decimal: '12', rule: '8 + 4 = 12' },
    { id: 8, binary: '111₂', decimal: '7', rule: '4 + 2 + 1 = 7' },
    { id: 9, binary: '1001₂', decimal: '9', rule: '8 + 1 = 9' },
    { id: 10, binary: '1110₂', decimal: '14', rule: '8 + 4 + 2 = 14' }
  ],
  2: [
    { id: 1, binary: '10000₂', decimal: '16', rule: '2⁴ = 16' },
    { id: 2, binary: '10101₂', decimal: '21', rule: '16 + 4 + 1 = 21' },
    { id: 3, binary: '11011₂', decimal: '27', rule: '16 + 8 + 2 + 1 = 27' },
    { id: 4, binary: '100000₂', decimal: '32', rule: '2⁵ = 32' },
    { id: 5, binary: '100101₂', decimal: '37', rule: '32 + 4 + 1 = 37' },
    { id: 6, binary: '101010₂', decimal: '42', rule: '32 + 8 + 2 = 42' },
    { id: 7, binary: '110000₂', decimal: '48', rule: '32 + 16 = 48' },
    { id: 8, binary: '110011₂', decimal: '51', rule: '32 + 16 + 2 + 1 = 51' },
    { id: 9, binary: '111000₂', decimal: '56', rule: '32 + 16 + 8 = 56' },
    { id: 10, binary: '111111₂', decimal: '63', rule: '32 + 16 + 8 + 4 + 2 + 1 = 63' }
  ],
  3: [
    { id: 1, binary: '1000000₂', decimal: '64', rule: '2⁶ = 64' },
    { id: 2, binary: '1010100₂', decimal: '84', rule: '64 + 16 + 4 = 84' },
    { id: 3, binary: '1100100₂', decimal: '100', rule: '64 + 32 + 4 = 100' },
    { id: 4, binary: '10000000₂', decimal: '128', rule: '2⁷ = 128 (1 bájt felső bitje)' },
    { id: 5, binary: '11111111₂', decimal: '255', rule: '1 bájt maximum értéke' },
    { id: 6, binary: '23₅', decimal: '13', rule: '2 · 5 + 3 = 13 (5-ös alap)' },
    { id: 7, binary: '44₅', decimal: '24', rule: '4 · 5 + 4 = 24 (5-ös alap)' },
    { id: 8, binary: '100₅', decimal: '25', rule: '5² = 25 (5-ös alap)' },
    { id: 9, binary: '120₅', decimal: '35', rule: '25 + 2 · 5 = 35 (5-ös alap)' },
    { id: 10, binary: '200₅', decimal: '50', rule: '2 · 25 = 50 (5-ös alap)' }
  ]
};

interface NumberSystemsMatcherProps {
  level: DifficultyLevel;
  onNextLevel?: () => void;
  onRestartLevel?: () => void;
  onOpenRules?: () => void;
}

export function NumberSystemsMatcher({
  level,
  onNextLevel,
  onRestartLevel,
  onOpenRules
}: NumberSystemsMatcherProps) {
  const [cards, setCards] = useState<MatchCard[]>([]);
  const [selectedCards, setSelectedCards] = useState<MatchCard[]>([]);
  const [matchedPairsCount, setMatchedPairsCount] = useState<number>(0);
  const [moves, setMoves] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);
  const [isGameActive, setIsGameActive] = useState<boolean>(true);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [lastMatchRule, setLastMatchRule] = useState<string | null>(null);

  // Initialize Game with 10 pairs (20 cards)
  const initGame = useCallback(() => {
    const pairData = LEVEL_PAIRS[level] || LEVEL_PAIRS[1];
    const generatedCards: MatchCard[] = [];

    pairData.forEach((item) => {
      // Binary Card
      generatedCards.push({
        uid: `bin-${item.id}-${Math.random()}`,
        pairId: item.id,
        type: 'binary',
        content: item.binary,
        isFlipped: false,
        isMatched: false
      });
      // Decimal Card
      generatedCards.push({
        uid: `dec-${item.id}-${Math.random()}`,
        pairId: item.id,
        type: 'decimal',
        content: item.decimal,
        isFlipped: false,
        isMatched: false
      });
    });

    // Shuffle cards (Fisher-Yates)
    for (let i = generatedCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [generatedCards[i], generatedCards[j]] = [generatedCards[j], generatedCards[i]];
    }

    setCards(generatedCards);
    setSelectedCards([]);
    setMatchedPairsCount(0);
    setMoves(0);
    setSeconds(0);
    setIsGameActive(true);
    setIsCompleted(false);
    setLastMatchRule(null);
  }, [level]);

  useEffect(() => {
    initGame();
  }, [initGame]);

  // Timer
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isGameActive && !isCompleted) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isGameActive, isCompleted]);

  // Handle Card Click
  const handleCardClick = (card: MatchCard) => {
    if (!isGameActive || card.isFlipped || card.isMatched || selectedCards.length >= 2) {
      return;
    }

    // Flip the clicked card
    const updatedCards = cards.map((c) =>
      c.uid === card.uid ? { ...c, isFlipped: true } : c
    );
    setCards(updatedCards);

    const newSelected = [...selectedCards, card];
    setSelectedCards(newSelected);

    if (newSelected.length === 2) {
      setMoves((prev) => prev + 1);
      const [first, second] = newSelected;

      // Check for match: same pairId and different types
      if (first.pairId === second.pairId && first.type !== second.type) {
        // Find matched pair rule
        const matchedPair = LEVEL_PAIRS[level].find((p) => p.id === first.pairId);
        if (matchedPair?.rule) {
          setLastMatchRule(`${matchedPair.binary} = ${matchedPair.decimal} (${matchedPair.rule})`);
        }

        setTimeout(() => {
          setCards((prevCards) =>
            prevCards.map((c) =>
              c.pairId === first.pairId ? { ...c, isMatched: true, isFlipped: true } : c
            )
          );
          setSelectedCards([]);
          setMatchedPairsCount((prev) => {
            const nextCount = prev + 1;
            if (nextCount === LEVEL_PAIRS[level].length) {
              setIsCompleted(true);
              setIsGameActive(false);
              confetti({
                particleCount: 120,
                spread: 70,
                origin: { y: 0.6 }
              });
            }
            return nextCount;
          });
        }, 400);
      } else {
        // Not a match, flip back
        setTimeout(() => {
          setCards((prevCards) =>
            prevCards.map((c) =>
              c.uid === first.uid || c.uid === second.uid
                ? { ...c, isFlipped: false }
                : c
            )
          );
          setSelectedCards([]);
        }, 1000);
      }
    }
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const rem = secs % 60;
    return `${mins}:${rem < 10 ? '0' : ''}${rem}`;
  };

  return (
    <div className="space-y-4 text-left">
      {/* Top Game Status Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 bg-slate-50 dark:bg-slate-800/80 rounded-2xl border-2 border-slate-200/80 dark:border-slate-700 shadow-xs">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-200">
            <Timer className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
            <span>{formatTime(seconds)}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-200">
            <Zap className="w-4 h-4 text-amber-500" />
            <span>{moves} lépés</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-black text-cyan-600 dark:text-cyan-400">
            <CheckCircle2 className="w-4 h-4" />
            <span>{matchedPairsCount} / {LEVEL_PAIRS[level].length} pár</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {onOpenRules && (
            <Button
              variant="outline"
              size="sm"
              onClick={onOpenRules}
              className="h-8 px-2.5 rounded-xl text-xs font-bold border-cyan-300 bg-cyan-50/50 text-cyan-800 dark:bg-cyan-950/40 dark:text-cyan-300 dark:border-cyan-800"
            >
              Segédlet
            </Button>
          )}

          <Button
            variant="ghost"
            size="sm"
            onClick={initGame}
            className="h-8 px-2.5 rounded-xl text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
          >
            <RotateCcw className="w-3.5 h-3.5 mr-1" /> Újrakeverés
          </Button>
        </div>
      </div>

      {/* Last Match Feedback Pill */}
      {lastMatchRule && !isCompleted && (
        <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800/80 rounded-xl text-xs text-emerald-800 dark:text-emerald-200 flex items-center gap-2 animate-in fade-in duration-200 font-medium">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
          <span>Találat: <strong>{lastMatchRule}</strong></span>
        </div>
      )}

      {/* 20 Cards Memory Grid (4 cols mobile, 5 cols desktop) */}
      {!isCompleted ? (
        <div className="grid grid-cols-4 sm:grid-cols-5 gap-2.5 sm:gap-3">
          {cards.map((card) => {
            const isFlipped = card.isFlipped || card.isMatched;
            return (
              <button
                key={card.uid}
                type="button"
                onClick={() => handleCardClick(card)}
                disabled={card.isMatched || selectedCards.length >= 2}
                className={cn(
                  'relative h-20 sm:h-24 p-2 rounded-2xl border-2 transition-all duration-300 transform select-none flex items-center justify-center text-center shadow-xs',
                  card.isMatched
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 opacity-90 scale-95'
                    : isFlipped
                    ? 'bg-white dark:bg-slate-800 border-cyan-400 dark:border-cyan-500 shadow-md scale-100'
                    : 'bg-gradient-to-br from-cyan-500 to-teal-600 dark:from-cyan-700 dark:to-teal-800 border-cyan-400/50 hover:brightness-105 active:scale-95 cursor-pointer'
                )}
              >
                {isFlipped ? (
                  <div className="space-y-0.5 animate-in zoom-in-95 duration-200">
                    <span
                      className={cn(
                        'block font-black leading-tight',
                        card.type === 'binary'
                          ? 'font-mono text-base sm:text-lg text-cyan-700 dark:text-cyan-300'
                          : 'font-mono text-lg sm:text-xl text-slate-800 dark:text-slate-100 px-1'
                      )}
                    >
                      {card.content}
                    </span>
                    {card.isMatched && (
                      <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold block font-sans">
                        ✓ Pár
                      </span>
                    )}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center text-white/80">
                    <Binary className="w-5 h-5 mb-0.5 opacity-60" />
                    <span className="text-[10px] font-bold uppercase tracking-wider opacity-80 font-sans">
                      Nyiss ki
                    </span>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      ) : (
        /* Completed Screen */
        <div className="p-6 sm:p-8 bg-white dark:bg-slate-900 rounded-3xl border-2 border-emerald-300 dark:border-emerald-800 text-center space-y-4 shadow-sm animate-in zoom-in-95 duration-300">
          <div className="w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-xs">
            <Trophy className="w-7 h-7" />
          </div>

          <div className="space-y-1">
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              Gratulálok! Mind a 10 párt megtaláltad!
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Idő: <strong className="text-slate-900 dark:text-white">{formatTime(seconds)}</strong> • Lépések száma: <strong className="text-slate-900 dark:text-white">{moves}</strong>
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Button
              variant="outline"
              onClick={initGame}
              className="rounded-xl font-bold text-xs sm:text-sm border-slate-200 dark:border-slate-700"
            >
              <RotateCcw className="w-4 h-4 mr-1.5" /> Újra ezen a szinten
            </Button>

            {level < 3 && onNextLevel && (
              <Button
                onClick={onNextLevel}
                className="rounded-xl font-bold text-xs sm:text-sm bg-cyan-600 hover:bg-cyan-700 text-white shadow-sm"
              >
                <span>Következő szint ({level + 1}. szint)</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default NumberSystemsMatcher;
